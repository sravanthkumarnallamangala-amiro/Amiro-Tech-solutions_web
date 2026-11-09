import React from 'react'
import { Button, Card, Container, CtaBand, Icon, Section, SectionHeader, type IconName } from '../components/common'
import { ArchitectureVisual, InventoryMock } from '../components/graphics/SiteGraphics'
import { serviceGroups } from '../data/services'
import { caseStudy, deliverySteps, governance, products } from '../data/site'

const practiceIcons: IconName[] = ['code', 'sparkle', 'plug']
const capabilities = ['Custom Software', 'Enterprise Web Apps', 'SaaS Platforms', 'Generative AI', 'Voice AI Agents', 'Document Intelligence (IDP)', 'Workflow Automation', 'API Integrations', 'Dashboards & Reporting', 'Cloud Engineering']

export function HomePage() {
  const flowStepsRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const flowSteps = flowStepsRef.current
    if (!flowSteps) return

    const alignMarkersAndTracks = () => {
      const steps = [...flowSteps.querySelectorAll<HTMLElement>('.flow-step')]
      const markerPositions = steps.map((step) => {
        const target = step.querySelector<HTMLElement>('.flow-step__target-letter')
          ?? step.querySelector<HTMLElement>('.flow-step__title-text')
        const targetBox = target?.getBoundingClientRect()
        const stepBox = step.getBoundingClientRect()
        const center = targetBox ? targetBox.left + targetBox.width / 2 : stepBox.left + 18
        return { center, stepLeft: stepBox.left }
      })

      steps.forEach((step, index) => {
        const markerOffset = markerPositions[index].center - markerPositions[index].stepLeft - 18
        step.style.setProperty('--flow-marker-offset', `${markerOffset}px`)
        step.style.setProperty('--flow-marker-center', `${markerPositions[index].center - markerPositions[index].stepLeft}px`)
        if (index < steps.length - 1) {
          step.style.setProperty('--flow-track-length', `${markerPositions[index + 1].center - markerPositions[index].center}px`)
        }
      })
    }

    alignMarkersAndTracks()
    const resizeObserver = new ResizeObserver(alignMarkersAndTracks)
    resizeObserver.observe(flowSteps)
    flowSteps.querySelectorAll('.flow-step__title-text, .flow-step__target-letter').forEach((target) => resizeObserver.observe(target))
    let active = true
    document.fonts.ready.then(() => {
      if (active) alignMarkersAndTracks()
    })

    return () => {
      active = false
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <>
      {/* 1 — Hero: who we are, what we do, one primary action */}
      <section className="hero">
        <div className="orbs" aria-hidden="true"><i /><i /><i /></div>
        <Container>
          <div className="hero__inner">
            <div>
              <p className="eyebrow">Solution architecture</p>
              <h1 className="hero__title" style={{ marginTop: 20 }}>
                <span className="hero__line" style={{ ['--d' as string]: '0ms' }}>Software and AI,</span>{' '}
                <span className="hero__line" style={{ ['--d' as string]: '120ms' }}>engineered around</span>{' '}
                <span className="hero__line" style={{ ['--d' as string]: '240ms' }}><em>how your business runs.</em></span>
              </h1>
              <p className="hero__lead hero__fade" style={{ ['--d' as string]: '360ms' }}>
                Amiro Tech Solutions designs and builds custom applications, AI assistants, Voice AI agents and
                workflow automation for growing businesses — from discovery to long-term support.
              </p>
              <div className="actions hero__fade" style={{ ['--d' as string]: '480ms' }}>
                <Button className="button--shine" href="/contact?type=consultation" size="lg">
                  Book a consultation <Icon name="arrow" />
                </Button>
                <Button href="/services" size="lg" variant="secondary">
                  Explore services
                </Button>
              </div>
            </div>
            <div className="hero__fade" style={{ ['--d' as string]: '300ms' }}><ArchitectureVisual /></div>
          </div>
          <ul className="home-hero-proof" aria-label="Amiro capabilities">
            <li><Icon name="sparkle" /><span><strong>AI solutions</strong><small>Practical intelligence</small></span></li>
            <li><Icon name="code" /><span><strong>Custom development</strong><small>Built around your process</small></span></li>
            <li><Icon name="shield" /><span><strong>Enterprise security</strong><small>Designed in from the start</small></span></li>
            <li><Icon name="flow" /><span><strong>Workflow automation</strong><small>Connected operations</small></span></li>
          </ul>
        </Container>
      </section>

      {/* Capabilities ticker */}
      <div className="ticker" aria-label="Capabilities">
        <div className="ticker__track">
          {[0, 1].map((copy) => (
            <ul aria-hidden={copy === 1} key={copy}>
              {capabilities.map((c) => <li key={c}><Icon name="sparkle" />{c}</li>)}
            </ul>
          ))}
        </div>
      </div>

      {/* 3 — Services: three practices */}
      <Section>
        <Container>
          <div className="section-head-row">
            <SectionHeader
              eyebrow="What we do"
              title="Three practices, one delivery team."
              description="We combine product engineering, applied AI and systems integration so solutions work together instead of adding another disconnected tool."
            />
            <a className="text-link" href="/services">All services <Icon name="arrow" /></a>
          </div>
          <div className="grid grid--3">
            {serviceGroups.map((group, i) => (
              <Card interactive key={group.id}>
                <div className="practice">
                  <div className="practice__head">
                    <span className="icon-tile"><Icon name={practiceIcons[i]} /></span>
                    <span className="practice__num">0{i + 1}</span>
                  </div>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.services.map((service) => (
                      <li key={service.title}>
                        <a className="practice__link" href={`/services#${group.id}`}>
                          <span>{service.title}</span>
                          <Icon name="arrow" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* 4 — Proof: featured work */}
      <Section tone="dark" className="featured-work">
        <div className="featured-work__glow" aria-hidden="true" />
        <Container>
          <article className="case-feature">
            <div className="case-feature__body">
              <p className="eyebrow">Featured · AI · Automation</p>
              <h2>{caseStudy.title}</h2>
              <p className="case-feature__summary">{caseStudy.summary}</p>
              <dl className="case-feature__meta">
                {caseStudy.meta.slice(0, 3).map((m) => (
                  <div key={m.label}><dt>{m.label === 'Our role' ? 'Delivery role' : m.label}</dt><dd>{m.value}</dd></div>
                ))}
              </dl>
              <ul className="case-feature__outcomes">
                {caseStudy.outcomes.map((outcome) => (
                  <li key={outcome}><Icon name="check" />{outcome}</li>
                ))}
              </ul>
              <div className="actions case-feature__actions">
                <Button href="/products#ims" size="lg">View product <Icon name="arrow" /></Button>
                <Button href="/services#product-platform-engineering" size="lg" variant="secondary">Custom engineering <Icon name="arrow" /></Button>
              </div>
            </div>
            <div className="case-feature__visual"><InventoryMock /></div>
          </article>
        </Container>
      </Section>

      {/* 5 — Delivery process + governance */}
      <Section>
        <Container>
          <div className="section-head-row">
            <SectionHeader
              eyebrow="How we deliver"
              title="A structured process with clear checkpoints."
              description="Every engagement follows clear, reviewable stages, so scope, progress and quality stay visible to you."
            />
            <a className="text-link" href="/process">Delivery process <Icon name="arrow" /></a>
          </div>
          <div className="flow-steps" ref={flowStepsRef} style={{ marginTop: 56 }}>
            {deliverySteps.map((step, i) => (
              <div className="flow-step" key={step.title} style={{ '--fi': i } as React.CSSProperties}>
                <div className="flow-step__rail">
                  <div className="flow-step__beacon" aria-hidden="true">
                    <span className="flow-step__beacon-dot" />
                  </div>
                  {i < deliverySteps.length - 1 && (
                    <div className="flow-step__track">
                      <span className="flow-step__particle" />
                    </div>
                  )}
                </div>
                <h3 className="flow-step__title">
                  <span className="flow-step__title-text">
                    {i === 0 ? (
                      <>
                        <span className="flow-step__target-letter">{step.title[0]}</span>
                        {step.title.slice(1)}
                      </>
                    ) : i === deliverySteps.length - 1 ? (
                      <>
                        {step.title.slice(0, -1)}
                        <span className="flow-step__target-letter">{step.title.slice(-1)}</span>
                      </>
                    ) : step.title}
                  </span>
                </h3>
                <p className="flow-step__desc">{step.summary}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SectionHeader
            eyebrow="Engagement standards"
            title="What you can expect on every project."
            description="Practical controls that make delivery predictable and easy to review."
          />
          <div className="gov" style={{ marginTop: 48 }}>
            {governance.map((g) => (
              <div className="gov__item" key={g.title}>
                <span className="icon-tile"><Icon name={g.icon} /></span>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 6 — Products */}
      <Section>
        <Container>
          <div className="section-head-row">
            <SectionHeader
              eyebrow="Products"
              title="Software products for everyday operations."
              description="Alongside client projects, we build focused products for teams that need practical tools without enterprise complexity."
            />
            <a className="text-link" href="/products">All products <Icon name="arrow" /></a>
          </div>
          <div className="grid grid--4">
            {products.map((p) => (
              <Card interactive key={p.id}>
                <div className="product">
                  <div className="product__top">
                    <span className="icon-tile"><Icon name={p.icon} /></span>
                  </div>
                  <span className="product__cat">{p.category}</span>
                  <h3>{p.title}</h3>
                  <div className="product__foot" style={{ marginTop: 'auto' }}>
                    <a className="text-link" href={p.href}>{p.cta} <Icon name="arrow" /></a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Conversion */}
      <CtaBand />
    </>
  )
}
