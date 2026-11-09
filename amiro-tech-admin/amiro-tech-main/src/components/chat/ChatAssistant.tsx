import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react'
import { localAnswer, suggestedQuestions } from '../../data/company-knowledge.js'
import { Icon } from '../common'

type Message = { id: number; role: 'user' | 'assistant'; content: string; followUps?: string[] }

const aiEnabled = import.meta.env.VITE_CHAT_AI === 'true'
type AiStatus = 'checking' | 'available' | 'unavailable'
const greeting: Message = {
  id: 0,
  role: 'assistant',
  content: 'Hi, I’m **Amiro Assistant**. Ask me anything about our services, products, delivery process, careers or how to reach us.',
  followUps: suggestedQuestions,
}

/** Renders the small subset of markdown the assistant uses: paragraphs, bullets, **bold**, *italic*, [links](url). */
function renderInline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g
  let last = 0
  let i = 0
  for (const match of text.matchAll(pattern)) {
    const token = match[0]
    if (match.index > last) out.push(text.slice(last, match.index))
    if (token.startsWith('**')) out.push(<strong key={`${key}-${i++}`}>{token.slice(2, -2)}</strong>)
    else if (token.startsWith('*')) out.push(<em key={`${key}-${i++}`}>{token.slice(1, -1)}</em>)
    else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)\s]+)\)/) ?? []
      const safe = href?.startsWith('/') || href?.startsWith('https://') || href?.startsWith('mailto:')
      out.push(
        safe ? (
          <a href={href} key={`${key}-${i++}`} {...(href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
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

function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/)
  return (
    <>
      {blocks.map((block, b) => {
        const lines = block.split('\n')
        const isList = lines.every((l) => /^(•|-|\d+\.)\s/.test(l.trim()))
        if (isList) {
          const ordered = /^\d+\./.test(lines[0].trim())
          const items = lines.map((l, j) => <li key={j}>{renderInline(l.trim().replace(/^(•|-|\d+\.)\s/, ''), `${b}-${j}`)}</li>)
          return ordered ? <ol key={b}>{items}</ol> : <ul key={b}>{items}</ul>
        }
        return <p key={b}>{renderInline(block, String(b))}</p>
      })}
    </>
  )
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([greeting])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [aiStatus, setAiStatus] = useState<AiStatus>(aiEnabled ? 'checking' : 'unavailable')
  const nextId = useRef(1)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!aiEnabled) return
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

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  async function ask(question: string) {
    const text = question.trim().slice(0, 1000)
    if (!text || busy) return
    const userMessage: Message = { id: nextId.current++, role: 'user', content: text }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setBusy(true)

    let reply: Message | null = null
    if (aiEnabled) {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history.filter((m) => m.id !== 0).map(({ role, content }) => ({ role, content })) }),
          signal: AbortSignal.timeout(125000),
        })
        const result = await response.json()
        if (response.ok && result.ok && typeof result.reply === 'string') {
          reply = { id: nextId.current++, role: 'assistant', content: result.reply }
          setAiStatus('available')
        } else {
          setAiStatus('unavailable')
        }
      } catch {
        setAiStatus('unavailable')
      }
    } else {
      await new Promise((resolve) => setTimeout(resolve, 650))
    }
    if (!reply) {
      const local = localAnswer(text)
      reply = { id: nextId.current++, role: 'assistant', content: local.answer, followUps: local.followUps }
    }
    setMessages((current) => [...current, reply])
    setBusy(false)
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    void ask(input)
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')

  return (
    <div className={['chat', open ? 'chat--open' : ''].filter(Boolean).join(' ')}>
      <section aria-label="Amiro Assistant chat" aria-hidden={!open} className="chat__panel" id="amiro-chat" role="dialog" {...(!open ? { inert: true } : {})}>
        <header className="chat__head">
          <span className="chat__avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 3 21 19H3L12 3Z" /><path d="m12 9 3.5 6h-7L12 9Z" /></svg>
          </span>
          <div>
            <p className="chat__title">Amiro Assistant</p>
            <p className="chat__status">
              <i aria-hidden="true" />
              {aiStatus === 'available'
                ? 'Local AI text · online'
                : aiStatus === 'checking'
                  ? 'Connecting to local AI…'
                  : 'Instant answers · online'}
            </p>
          </div>
          <button aria-label="Close chat" className="chat__close" onClick={() => { setOpen(false); launcherRef.current?.focus() }} type="button">
            <Icon name="close" />
          </button>
        </header>

        <div aria-live="polite" className="chat__log" ref={listRef}>
          {messages.map((m) => (
            <div className={`chat__msg chat__msg--${m.role}`} key={m.id}>
              <div className="chat__bubble">
                <RichText text={m.content} />
              </div>
            </div>
          ))}
          {busy ? (
            <div className="chat__msg chat__msg--assistant" aria-label="Assistant is typing">
              <div className="chat__bubble chat__typing"><i /><i /><i /></div>
            </div>
          ) : null}
          {!busy && lastAssistant?.followUps?.length && messages.at(-1)?.id === lastAssistant.id ? (
            <div className="chat__suggest">
              {lastAssistant.followUps.map((q) => (
                <button key={q} onClick={() => void ask(q)} type="button">{q}</button>
              ))}
            </div>
          ) : null}
        </div>

        <form className="chat__form" onSubmit={onSubmit}>
          <label className="sr-only" htmlFor="chat-input">Your question</label>
          <textarea
            id="chat-input"
            maxLength={1000}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                void ask(input)
              }
            }}
            placeholder="Ask about Amiro Tech…"
            ref={inputRef}
            rows={1}
            value={input}
          />
          <button aria-label="Send" className="chat__send" disabled={!input.trim() || busy} type="submit">
            <Icon name="arrow" />
          </button>
        </form>
        <p className="chat__note">
          Automated answers may be incomplete. Please don’t share confidential information. Need a person? <a href="/contact">Contact us</a>.
        </p>
      </section>

      <button
        aria-controls="amiro-chat"
        aria-expanded={open}
        aria-label={open ? 'Close Amiro Assistant' : 'Chat with Amiro Assistant'}
        className="chat__launcher"
        onClick={() => setOpen((o) => !o)}
        ref={launcherRef}
        type="button"
      >
        <span className="chat__launcher-icon" aria-hidden="true">
          {open ? (
            <Icon name="close" />
          ) : (
            <svg className="icon" viewBox="0 0 24 24">
              <path
                d="M20.5 12a8.5 8.5 0 0 1-12.3 7.6L3.5 21l1.5-4.8A8.5 8.5 0 1 1 20.5 12Z"
                fill="currentColor"
                fillOpacity="0.22"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
              <circle cx="8.5" cy="12" r="1.1" fill="currentColor" />
              <circle cx="12" cy="12" r="1.1" fill="currentColor" />
              <circle cx="15.5" cy="12" r="1.1" fill="currentColor" />
            </svg>
          )}
        </span>
        <span className="chat__launcher-label">{open ? 'Close' : 'Ask Amiro AI'}</span>
      </button>
    </div>
  )
}
