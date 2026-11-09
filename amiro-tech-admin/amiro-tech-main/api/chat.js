import process from 'node:process'
import { buildSystemPrompt, isCompanyRelated } from '../src/data/company-knowledge.js'

// Text chat endpoint for the website assistant.
// Set CHAT_PROVIDER=ollama with OLLAMA_URL and OLLAMA_MODEL for local text generation,
// or CHAT_PROVIDER=anthropic with ANTHROPIC_API_KEY and optional CHAT_MODEL.
// Configure a platform rate-limit rule for /api/chat before enabling publicly.
const origins = ['https://www.amirotechsolutions.com', 'https://amirotechsolutions.com']
const MAX_MESSAGES = 12
const MAX_CHARS = 1000
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:1.5b'
const chatProvider = process.env.CHAT_PROVIDER || 'anthropic'

async function ollamaIsAvailable() {
  try {
    const response = await fetch(`${OLLAMA_URL}/api/tags`, {
      signal: AbortSignal.timeout(2500),
    })
    if (!response.ok) return false
    const result = await response.json()
    return Array.isArray(result?.models) && result.models.some((installed) => installed?.name === OLLAMA_MODEL)
  } catch {
    return false
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  const developmentOrigins =
    process.env.NODE_ENV === 'production' ? [] : ['http://localhost:5173', 'http://127.0.0.1:5173']
  const allowed = [
    ...origins,
    ...developmentOrigins,
    ...(process.env.CHAT_EXTRA_ORIGINS ?? '')
      .split(',')
      .map((o) => o.trim())
      .filter(Boolean),
  ]
  const origin = req.headers.origin
  if ((origin && !allowed.includes(origin)) || (!origin && req.method !== 'GET'))
    return res.status(403).json({ ok: false })
  if (req.method === 'GET') {
    const aiAvailable =
      chatProvider === 'ollama'
        ? await ollamaIsAvailable()
        : chatProvider === 'anthropic' && Boolean(process.env.ANTHROPIC_API_KEY)
    return res.status(200).json({ ok: true, aiAvailable })
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ ok: false })
  }
  if (!req.headers['content-type']?.startsWith('application/json'))
    return res.status(415).json({ ok: false })
  if (chatProvider !== 'ollama' && chatProvider !== 'anthropic')
    return res.status(503).json({ ok: false, error: 'invalid_chat_provider' })
  if (chatProvider === 'anthropic' && !process.env.ANTHROPIC_API_KEY)
    return res.status(503).json({ ok: false, error: 'ai_not_configured' })

  let data
  try {
    data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ ok: false })
  }
  const messages = Array.isArray(data?.messages) ? data.messages.slice(-MAX_MESSAGES) : null
  if (!messages?.length) return res.status(400).json({ ok: false })
  for (const m of messages) {
    if (
      !m ||
      (m.role !== 'user' && m.role !== 'assistant') ||
      typeof m.content !== 'string' ||
      !m.content.trim() ||
      m.content.length > MAX_CHARS
    ) {
      return res.status(400).json({ ok: false })
    }
  }
  // Conversation must start with a user turn.
  while (messages.length && messages[0].role !== 'user') messages.shift()
  if (!messages.length || messages.at(-1).role !== 'user')
    return res.status(400).json({ ok: false })
  if (!isCompanyRelated(messages.at(-1).content)) {
    return res.status(200).json({
      ok: true,
      reply:
        'I can help with Amiro Tech’s services, products, delivery process, careers or contact details. For other questions, please contact our team at info@amirotechsolutions.com or use the form at /contact.',
    })
  }

  try {
    if (chatProvider === 'ollama') {
      const response = await fetch(`${OLLAMA_URL}/api/chat`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          messages: [
            {
              role: 'system',
              content: `${buildSystemPrompt()}\n\nFor each reply, answer only the latest question in at most 70 words. Do not repeat points or add unrelated details. Use a short paragraph unless a list is requested.`,
            },
            ...messages.map(({ role, content }) => ({ role, content: content.trim() })),
          ],
          stream: false,
          options: { temperature: 0.2, num_predict: 140 },
        }),
        signal: AbortSignal.timeout(120000),
      })
      const result = await response.json()
      const reply = typeof result?.message?.content === 'string' ? result.message.content.trim() : ''
      if (!response.ok || !reply)
        return res.status(502).json({ ok: false, error: 'ollama_unavailable' })
      return res.status(200).json({ ok: true, reply })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.CHAT_MODEL || 'claude-haiku-5-5',
        max_tokens: 500,
        system: buildSystemPrompt(),
        messages: messages.map(({ role, content }) => ({ role, content: content.trim() })),
      }),
      signal: AbortSignal.timeout(20000),
    })
    const result = await response.json()
    const reply = Array.isArray(result?.content)
      ? result.content
          .filter((b) => b.type === 'text')
          .map((b) => b.text)
          .join('\n')
          .trim()
      : ''
    if (!response.ok || !reply) return res.status(502).json({ ok: false, error: 'ai_unavailable' })
    return res.status(200).json({ ok: true, reply })
  } catch {
    return res.status(502).json({ ok: false, error: 'ai_unavailable' })
  }
}
