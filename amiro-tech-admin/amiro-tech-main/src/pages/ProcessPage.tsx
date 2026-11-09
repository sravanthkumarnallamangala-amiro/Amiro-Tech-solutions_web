import { Button, Container, CtaBand, Icon, Section, SectionHeader } from '../components/common'
import { deliverySteps, governance } from '../data/site'
import { TouchpointFlow } from '../components/process/TouchpointFlow'
import { ProcessHeroVisual, ProcessWorkflow } from '../components/graphics/SiteGraphics'

export function ProcessPage() {
  return (
    <>
      <section className="page-hero process-hero">
        <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
        <Container>
          <div className="process-hero__inner">
            <div className="process-hero__copy">
              <nav aria-label="Breadcrumb" className="crumbs">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Process</span>
              </nav>
              <p className="eyebrow hero__fade">Delivery process</p>
              <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>
                A clear, reviewable <em>delivery model.</em>
              </h1>
              <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
                We guide projects from discovery to launch and ongoing improvement with defined stages, agreed outputs and regular checkpoints.
              </p>
              <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>
                <Button href="/contact?type=consultation" size="lg">Start with discovery <Icon name="arrow" /></Button>
                <Button href="/services" size="lg" variant="secondary">View services</Button>
              </div>
            </div>
            <div className="process-hero__visual hero__fade" style={{ ['--d' as string]: '220ms' }}>
              <ProcessHeroVisual steps={deliverySteps} />
            </div>
          </div>
          <ProcessWorkflow />
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="Stages & outputs"
            title="What happens at each stage — and what you receive."
            description="Each stage reduces uncertainty and ends with agreed outputs before the next begins."
          />
          <ol className="steps-v" style={{ marginTop: 48 }}>
            {deliverySteps.map((s, i) => (
              <li className="steps-v__item" key={s.title}>
                <div className="steps-v__lead">
                  <div className="steps-v__badge-row">
                    <span className="steps-v__badge">Stage 0{i + 1}</span>
                    <span className="steps-v__indicator" />
                  </div>
                  <h3 className="steps-v__title">{s.title}</h3>
                  <p className="steps-v__summary">{s.summary}</p>
                </div>
                <div className="steps-v__content">
                  <p className="steps-v__detail">{s.detail}</p>
                  <div className="steps-v__outputs">
                    <span className="steps-v__outputs-label">Key Deliverables</span>
                    <div className="tags">
                      {s.outputs.map((o) => (
                        <span className="tag tag--output" key={o}>
                          <Icon name="check" /> {o}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="dark">
        <Container>
          <SectionHeader eyebrow="Engagement standards" title="Controls built into every engagement." />
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

      <Section tone="soft">
        <Container>
          <SectionHeader eyebrow="Collaboration" title="How you stay involved." description="Clients stay close to the work through structured touchpoints." />
          <TouchpointFlow />
        </Container>
      </Section>

      <CtaBand title="Ready to start with discovery?" />
    </>
  )
}
