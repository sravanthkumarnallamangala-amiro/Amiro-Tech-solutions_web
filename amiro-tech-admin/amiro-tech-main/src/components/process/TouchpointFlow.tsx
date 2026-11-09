import { useState, useEffect } from 'react'
import { Icon, type IconName } from '../common'

interface TouchpointItem {
  step: string
  title: string
  subtitle: string
  text: string
  tag: string
  icon: IconName
  kind: 'audio' | 'flowchart' | 'terminal' | 'telemetry'
}

const touchpoints: TouchpointItem[] = [
  {
    step: '01',
    title: 'Discovery call',
    subtitle: 'Alignment & Goals',
    text: 'A focused conversation to understand the problem, constraints and business objectives.',
    tag: 'Stage 01',
    icon: 'phone',
    kind: 'audio',
  },
  {
    step: '02',
    title: 'Workflow mapping',
    subtitle: 'Process Blueprint',
    text: 'We map the current process directly with the stakeholders and operators who run it daily.',
    tag: 'Stage 02',
    icon: 'flow',
    kind: 'flowchart',
  },
  {
    step: '03',
    title: 'Build reviews',
    subtitle: 'Sprint Demos',
    text: 'Scheduled demos of working software to review milestones, gather feedback and re-prioritise.',
    tag: 'Stage 03',
    icon: 'review',
    kind: 'terminal',
  },
  {
    step: '04',
    title: 'Launch support',
    subtitle: 'Deployment & Training',
    text: 'Seamless deployment, operational training, and proactive support as your team adopts the system.',
    tag: 'Stage 04',
    icon: 'rocket',
    kind: 'telemetry',
  },
]

export function TouchpointFlow() {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % touchpoints.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isPaused])

  const renderGraphic = (kind: TouchpointItem['kind'], isActive: boolean) => {
    switch (kind) {
      case 'audio':
        return (
          <div className={`touchpoint-graphic touchpoint-graphic--audio ${isActive ? 'is-live' : ''}`} aria-hidden="true">
            <span className="eq-bar eq-bar--1" />
            <span className="eq-bar eq-bar--2" />
            <span className="eq-bar eq-bar--3" />
            <span className="eq-bar eq-bar--4" />
            <span className="eq-bar eq-bar--5" />
          </div>
        )
      case 'flowchart':
        return (
          <div className={`touchpoint-graphic touchpoint-graphic--flow ${isActive ? 'is-live' : ''}`} aria-hidden="true">
            <svg viewBox="0 0 54 22" className="flow-circuit-svg">
              <circle cx="6" cy="11" r="3.5" className="circuit-node" />
              <path d="M9.5 11 H23.5 M30.5 11 H44.5" className="circuit-wire" />
              <circle cx="27" cy="11" r="3.5" className="circuit-node" />
              <circle cx="48" cy="11" r="3.5" className="circuit-node" />
              <circle cx="6" cy="11" r="2" className="circuit-pulse" />
            </svg>
          </div>
        )
      case 'terminal':
        return (
          <div className={`touchpoint-graphic touchpoint-graphic--terminal ${isActive ? 'is-live' : ''}`} aria-hidden="true">
            <span className="terminal-glyph">&gt;</span>
            <span className="terminal-text">sprint.demo()</span>
            <span className="terminal-cursor" />
          </div>
        )
      case 'telemetry':
        return (
          <div className={`touchpoint-graphic touchpoint-graphic--telemetry ${isActive ? 'is-live' : ''}`} aria-hidden="true">
            <div className="telemetry-radar">
              <span className="telemetry-ring" />
              <span className="telemetry-sweep" />
              <span className="telemetry-beacon" />
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className="touchpoint-flow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Top connected stage navigation rail */}
      <div className="touchpoint-rail" role="tablist" aria-label="Collaboration touchpoint stages">
        <div className="touchpoint-rail__track" aria-hidden="true">
          <div
            className="touchpoint-rail__fill"
            style={{ width: `${((active + 1) / touchpoints.length) * 100}%` }}
          />
        </div>
        {touchpoints.map((item, i) => (
          <button
            key={item.step}
            role="tab"
            aria-selected={active === i}
            className={`touchpoint-pill ${active === i ? 'is-active' : ''}`}
            onClick={() => {
              setActive(i)
              setIsPaused(true)
            }}
          >
            <span className="touchpoint-pill__dot" />
            <span className="touchpoint-pill__index">{item.step}</span>
            <span className="touchpoint-pill__label">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Grid of interactive touchpoint cards */}
      <div className="touchpoint-grid">
        {touchpoints.map((item, i) => {
          const isActive = active === i
          return (
            <div
              key={item.step}
              className={`touchpoint-card ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                setActive(i)
                setIsPaused(true)
              }}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(i)
                  setIsPaused(true)
                }
              }}
              role="button"
              aria-pressed={isActive}
            >
              {/* Top metadata row with graphic badge */}
              <div className="touchpoint-card__top">
                <div className="touchpoint-card__badge-row">
                  <span className="touchpoint-card__badge">{item.tag}</span>
                  {isActive ? (
                    <span className="touchpoint-card__live-pill">
                      <span className="touchpoint-card__live-ping" />
                      Live Touchpoint
                    </span>
                  ) : (
                    <span className="touchpoint-card__subtitle">{item.subtitle}</span>
                  )}
                </div>
                <div className="touchpoint-card__graphic-slot">
                  {renderGraphic(item.kind, isActive)}
                </div>
              </div>

              {/* Icon, watermarked index and ambient aura */}
              <div className="touchpoint-card__icon-row">
                <div className="touchpoint-card__icon-box">
                  <div className="touchpoint-card__icon-halo" aria-hidden="true" />
                  <Icon name={item.icon} className="touchpoint-card__icon" />
                </div>
                <span className="touchpoint-card__watermark" aria-hidden="true">
                  {item.step}
                </span>
              </div>

              {/* Text content */}
              <h3 className="touchpoint-card__title">{item.title}</h3>
              <p className="touchpoint-card__desc">{item.text}</p>

              {/* Active countdown / progress runner */}
              <div className="touchpoint-card__rail" aria-hidden="true">
                <div
                  className={`touchpoint-card__bar ${isActive && !isPaused ? 'is-running' : ''}`}
                  key={`${item.step}-${isActive ? 'active' : 'inactive'}`}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

