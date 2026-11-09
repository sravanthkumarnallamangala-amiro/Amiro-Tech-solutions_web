import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { isCompanyRelated, localAnswer, relatedQuestions } from '../../data/company-knowledge.js'
import { serviceGroups } from '../../data/services'
import { products } from '../../data/site'
import { Icon } from '../common'

type Message = {
  id: number
  role: 'user' | 'assistant'
  content: string
  followUps?: string[]
}

type AiStatus = 'checking' | 'available' | 'unavailable'

const initialMessages: Message[] = [
  {
    id: 0,
    role: 'assistant',
    content:
      'I’m your Amiro product and service guide. Ask about features, availability, integrations, or which service may fit your workflow. I can also point you to a useful next step.',
  },
]

const productQuestions = [
  'What does the NDT inventory system include?',
  'Which products are available now?',
  'How can I request a product demo?',
  'Which service can automate a business workflow?',
]

const productAliases: Record<string, string[]> = {
  ims: ['inventory management system', 'ndt inventory', 'ndt lab', 'inventory system', 'calibration tracking'],
  hr: ['hr management system', 'hrms', 'employee records', 'attendance management', 'leave management'],
  'voice-ai': ['voice ai agent platform', 'voice ai platform', 'ai receptionist', 'phone agent'],
  'business-ops': ['business operations platform', 'operations platform', 'crm platform', 'one workspace'],
}

const searchStopWords = new Set([
  'about', 'and', 'are', 'can', 'does', 'for', 'from', 'help', 'how', 'into', 'need',
  'our', 'please', 'service', 'services', 'that', 'the', 'their', 'them', 'this', 'what',
  'when', 'which', 'with', 'would', 'you', 'your',
])

function normaliseSearch(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function termsMatch(left: string, right: string) {
  return left === right || left === `${right}s` || `${left}s` === right ||
    (left.endsWith('s') && left.slice(0, -1) === right) ||
    (right.endsWith('s') && right.slice(0, -1) === left)
}

function answerFromCatalog(question: string) {
  if (!isCompanyRelated(question)) return localAnswer(question)
  const query = normaliseSearch(question)
  const productIntent = /\b(product|products|platform|catalog|catalogue|waitlist|early access|available|availability|feature|features|demo)\b/.test(query)
  const matchedProducts = products.filter((product) => {
    const aliases = [product.title, product.id, ...productAliases[product.id]]
    return aliases.some((alias) => query.includes(normaliseSearch(alias)))
  })

  if (matchedProducts.length && (productIntent || !/\b(service|services|build|develop)\b/.test(query))) {
    const product = matchedProducts[0]
    return {
      answer: `**${product.title}** · ${product.status === 'Available' ? '**Available now**' : '**In development**'}\n\n${product.description}\n\n**Key features:** ${product.features.join(', ')}.\n\n[${product.cta}](${product.href})`,
      followUps: [
        `What does ${product.title} include?`,
        product.status === 'Available' ? 'How can I request a product demo?' : 'Which products are available now?',
      ],
    }
  }

  if (
    /\b(all products|product list|products available|which products|available products|product catalog|product catalogue)\b/.test(query)
  ) {
    return {
      answer: `${products.map((product) => `**${product.title}** · ${product.status === 'Available' ? 'Available now' : 'In development'} — ${product.description} [${product.cta}](${product.href}).`).join('\n\n')}\n\nAvailability reflects the current product catalog.`,
      followUps: ['What does the NDT inventory system include?', 'Which service can support my workflow?'],
    }
  }

  const terms = [...new Set(query.split(' ').filter((term) => term.length > 2 && !searchStopWords.has(term)))]
  const serviceMatches = serviceGroups.flatMap((group) =>
    group.services.map((service) => {
      const titleTerms = normaliseSearch(service.title).split(' ')
      const problemTerms = normaliseSearch(service.problem).split(' ')
      const solutionTerms = normaliseSearch(service.solution).split(' ')
      const groupTerms = normaliseSearch(`${group.title} ${group.description}`).split(' ')
      const countMatches = (candidates: string[]) =>
        terms.filter((term) => candidates.some((candidate) => termsMatch(term, candidate))).length
      const titleMatches = countMatches(titleTerms)
      const problemMatches = countMatches(problemTerms)
      const solutionMatches = countMatches(solutionTerms)
      const groupMatches = countMatches(groupTerms)
      const titlePhrase = query.includes(normaliseSearch(service.title))
      const score =
        (titlePhrase ? 8 : 0) +
        titleMatches * 2.5 +
        problemMatches * 2 +
        solutionMatches +
        groupMatches * 0.5
      return { group, service, score }
    }),
  )
    .filter((match) => match.score >= 3)
    .sort((a, b) => b.score - a.score)

  if (serviceMatches.length) {
    const match = serviceMatches[0]
    return {
      answer: `**${match.service.title}**\n\n**How it helps:** ${match.service.solution}\n\n**The challenge it addresses:** ${match.service.problem}\n\n[${match.service.cta}](${match.service.href}) · [Explore ${match.group.title}](/services#${match.group.id})`,
      followUps: [
        'What services do you offer?',
        'What information should I prepare before a consultation?',
      ],
    }
  }

  if (/\b(product|products|platform|catalog|catalogue|available|availability|demo)\b/.test(query)) {
    return {
      answer: `${products.map((product) => `**${product.title}** · ${product.status === 'Available' ? 'Available now' : 'In development'}`).join('\n')}\n\nThe NDT Inventory Management System is available now. The other listed products are in development. [Explore products](/products) or [request an IMS demo](/contact?type=product-demo&product=ims).`,
      followUps: ['What does the NDT inventory system include?', 'Tell me about the HR Management System.'],
    }
  }

  return localAnswer(question)
}

function renderInline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let i = 0
  for (const match of text.matchAll(pattern)) {
    const token = match[0]
    if (match.index > last) out.push(text.slice(last, match.index))
    if (token.startsWith('**'))
      out.push(<strong key={`${key}-${i++}`}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('*')) out.push(<em key={`${key}-${i++}`}>{token.slice(1, -1)}</em>)
    else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)\s]+)\)/) ?? []
      const safe =
        href?.startsWith('/') || href?.startsWith('https://') || href?.startsWith('mailto:')
      out.push(
        safe ? (
          <a
            href={href}
            key={`${key}-${i++}`}
            {...(href.startsWith('https://')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {label}
          </a>
        ) : (
          label
        ),
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

function ChatContent({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/)
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => /^(•|-|\d+\.)\s/.test(l.trim()))
        if (isList) {
          const ordered = /^\d+\./.test(lines[0].trim())
          const items = lines.map((l, j) => (
            <li key={j}>{renderInline(l.trim().replace(/^(•|-|\d+\.)\s/, ''), `${b}-${j}`)}</li>
          ))
          return ordered ? <ol key={b}>{items}</ol> : <ul key={b}>{items}</ul>
        }
        return <p key={b}>{renderInline(block, String(b))}</p>
      })}
    </>
  )
}

export function CompanyAiChatBox() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [aiStatus, setAiStatus] = useState<AiStatus>('checking')
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    const controller = new AbortController()
    void fetch('/api/chat', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('AI status check failed')
        const result: unknown = await response.json()
        if (
          typeof result !== 'object' ||
          result === null ||
          !('aiAvailable' in result) ||
          typeof result.aiAvailable !== 'boolean'
        ) {
          throw new Error('AI status response was invalid')
        }
        setAiStatus(result.aiAvailable ? 'available' : 'unavailable')
      })
      .catch(() => {
        if (!controller.signal.aborted) setAiStatus('unavailable')
      })

    return () => controller.abort()
  }, [])

  async function handleSend(query: string) {
    const text = query.trim().slice(0, 1000)
    if (!text || busy) return

    const userMsg: Message = { id: nextId.current++, role: 'user', content: text }
    const history = [...messages, userMsg]
    setMessages(history)
    setInput('')
    setBusy(true)

    let reply: Message | null = null
    if (aiStatus === 'available') {
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: history
              .filter((m) => m.id !== 0)
              .map(({ role, content }) => ({ role, content })),
          }),
          signal: AbortSignal.timeout(125000),
        })
        const result: unknown = await res.json()
        if (
          res.ok &&
          typeof result === 'object' &&
          result !== null &&
          'ok' in result &&
          result.ok === true &&
          'reply' in result &&
          typeof result.reply === 'string'
        ) {
          reply = {
            id: nextId.current++,
            role: 'assistant',
            content: result.reply,
            followUps: relatedQuestions(text),
          }
        } else {
          setAiStatus('unavailable')
        }
      } catch {
        setAiStatus('unavailable')
      }
    }

    if (!reply) {
      const local = answerFromCatalog(text)
      reply = {
        id: nextId.current++,
        role: 'assistant',
        content: local.answer,
        followUps: local.followUps,
      }
    }

    setMessages((prev) => [...prev, reply])
    setBusy(false)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    void handleSend(input)
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
  const searchSuggestions = input.trim() ? relatedQuestions(input) : []
  const visibleQuestions = searchSuggestions.length ? searchSuggestions : productQuestions
  const searchTerm = input.trim().toLowerCase()
  const searchWords = searchTerm
    .split(/\W+/)
    .filter(
      (word) =>
        word.length > 3 &&
        !['about', 'which', 'does', 'your', 'with', 'from', 'that'].includes(word),
    )
  const matchingProducts = searchWords.length
    ? products.filter((product) =>
        searchWords.some((word) =>
          [product.title, product.category, product.description, ...product.features]
            .join(' ')
            .toLowerCase()
            .includes(word),
        ),
      )
    : products
  const visibleProducts = matchingProducts.length ? matchingProducts : products

  function showProductBrief(product: (typeof products)[number]) {
    void handleSend(
      `Give me a concise overview of ${product.title}, including its availability, key features, and the best next step.`,
    )
  }

  return (
    <div className="ai-chatbox" aria-label="Amiro product assistant">
      <div className="ai-chatbox__header">
        <div className="ai-chatbox__header-info">
          <span className="ai-chatbox__avatar" aria-hidden="true">
            <Icon name="sparkle" />
          </span>
          <div>
            <h3 className="ai-chatbox__title">Product &amp; Service Assistant</h3>
            <p className="ai-chatbox__status">
              <span className="ai-chatbox__beacon" />
              <span>
                {aiStatus === 'available'
                  ? 'Local AI text · ready'
                  : aiStatus === 'checking'
                    ? 'Connecting to local AI…'
                    : 'Amiro knowledge guide · ready'}
              </span>
            </p>
          </div>
        </div>
        <div className="ai-chatbox__header-badge">
          <span>PRODUCT SUPPORT</span>
        </div>
      </div>

      <div className="ai-chatbox__discovery" aria-label="Suggested product questions">
        <div className="ai-chatbox__discovery-heading">
          <span className="ai-chatbox__suggest-label">
            {searchTerm ? 'Products matching your search' : 'Explore products'}
          </span>
          <span className="ai-chatbox__discovery-note">Select one for a concise overview</span>
        </div>
        <div className="ai-chatbox__product-list">
          {visibleProducts.map((product) => (
            <button
              aria-label={`View brief for ${product.title}`}
              className="ai-chatbox__product"
              disabled={busy}
              key={product.id}
              onClick={() => showProductBrief(product)}
              type="button"
            >
              <strong>{product.title}</strong>
              <span className="ai-chatbox__product-action">
                View overview <Icon name="arrow" />
              </span>
            </button>
          ))}
        </div>
        <span className="ai-chatbox__suggest-label">
          {searchTerm ? 'Related questions' : 'Popular questions'}
        </span>
        {visibleQuestions.length > 0 && (
          <div className="ai-chatbox__prompt-list" aria-live="polite">
            {visibleQuestions.map((question) => (
              <button
                className="ai-chatbox__suggest-btn"
                disabled={busy}
                key={question}
                onClick={() => void handleSend(question)}
                type="button"
              >
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        className="ai-chatbox__stream"
        ref={listRef}
        aria-live="polite"
        aria-label="Conversation"
      >
        {messages.map((m) => (
          <div key={m.id} className={`ai-chatbox__message ai-chatbox__message--${m.role}`}>
            <div className="ai-chatbox__bubble">
              {m.role === 'assistant' && (
                <span className="ai-chatbox__speaker">Amiro Assistant</span>
              )}
              <ChatContent text={m.content} />
            </div>
          </div>
        ))}

        {busy && (
          <div className="ai-chatbox__message ai-chatbox__message--assistant">
            <div className="ai-chatbox__bubble ai-chatbox__typing">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {!busy && lastAssistant?.followUps?.length && messages.at(-1)?.id === lastAssistant.id && (
          <div className="ai-chatbox__suggestions">
            <span className="ai-chatbox__suggest-label">Suggested questions:</span>
            <div className="ai-chatbox__suggest-list">
              {lastAssistant.followUps.map((q) => (
                <button
                  type="button"
                  key={q}
                  className="ai-chatbox__suggest-btn"
                  onClick={() => void handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <form className="ai-chatbox__form" onSubmit={onSubmit}>
        <input
          aria-label="Ask about Amiro products, features, or availability"
          type="text"
          className="ai-chatbox__input"
          placeholder="Ask about a product, feature, or your workflow..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
        <button
          type="submit"
          className="ai-chatbox__submit"
          disabled={!input.trim() || busy}
          aria-label="Send question"
        >
          <Icon name="arrow" />
        </button>
      </form>
      <div className="ai-chatbox__footer">
        <span>
          Need more detail for your business? Email <strong>info@amirotechsolutions.com</strong> or{' '}
          <a href="/contact">contact our team</a>.
        </span>
      </div>
    </div>
  )
}
