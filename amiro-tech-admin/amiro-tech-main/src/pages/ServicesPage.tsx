import { Button, Card, Container, CtaBand, Icon, Section, SectionHeader, type IconName } from '../components/common'
import { ServicesOrbitVisual } from '../components/graphics/SiteGraphics'
import { serviceGroups } from '../data/services'
import { caseStudy } from '../data/site'

const practiceIcons: IconName[] = ['code', 'sparkle', 'flow']

function serviceAnchorId(title: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return `service-${slug}`
}

export function ServicesPage() {
  return (
    <>
      <section className="page-hero services-hero">
        <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
        <Container>
          <div className="services-hero__inner">
            <div className="services-hero__copy">
              <nav aria-label="Breadcrumb" className="crumbs">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Services</span>
              </nav>
              <p className="eyebrow hero__fade">Services</p>
              <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>
                Software, AI and automation services for <em>real operations.</em>
              </h1>
              <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
                We design, build and support custom applications, AI and Voice AI systems, automation and integrations — each one shaped around a specific business problem.
              </p>
              <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>
                <Button href="/contact?type=consultation" size="lg">Book a consultation <Icon name="arrow" /></Button>
                <Button href="/process" size="lg" variant="secondary">How we deliver <Icon name="arrow" /></Button>
              </div>
            </div>
            <div className="services-hero__visual hero__fade" style={{ ['--d' as string]: '220ms' }}>
              <ServicesOrbitVisual />
            </div>
          </div>
        </Container>
      </section>

      <Section className="services-practices">
        <Container>
          {serviceGroups.map((group, gi) => (
            <div className="service-group" id={group.id} key={group.id}>
              <div className="service-group__intro">
                <p className="eyebrow">Practice 0{gi + 1}</p>
                <h2><Icon name={practiceIcons[gi]} />{group.title}</h2>
                <p>{group.description}</p>
              </div>
              <div className="service-row">
                {group.services.map((service) => (
                  <Card className="service-card" id={serviceAnchorId(service.title)} key={service.title}>
                    <div className="service-card__head">
                      <span className="service-card__icon"><Icon name={practiceIcons[gi]} /></span>
                      <h3>{service.title}</h3>
                      <a className="text-link" href={service.href}>{service.cta} <Icon name="arrow" /></a>
                    </div>
                    <dl className="service-card__pso">
                      <div><dt>The challenge</dt><dd>{service.problem}</dd></div>
                      <div><dt>What we build</dt><dd>{service.solution}</dd></div>
                      <div><dt>The result</dt><dd>{service.outcome}</dd></div>
                    </dl>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="section-head-row">
            <SectionHeader
              eyebrow="Delivery in action"
              title="Building Smarter Laboratory Systems."
              // description={`How we partnered with ${caseStudy.client} to deliver an end-to-end custom platform (React · FastAPI · PostgreSQL) tailored to complex laboratory workflows.`}
            />
            <a className="text-link" href="/contact?type=custom-software">Start a project <Icon name="arrow" /></a>
          </div>

          <dl className="kv kv--gold-labels" style={{ marginTop: 32 }}>
            {caseStudy.meta.map((m) => (
              <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
            ))}
          </dl>

          <div className="psr" style={{ marginTop: 32 }}>
            <Card>
              <span className="psr__label">01 · The challenge</span>
              <h3>Scattered records</h3>
              <p>{caseStudy.problem}</p>
            </Card>
            <Card>
              <span className="psr__label">02 · What we built</span>
              <h3>One traceable platform</h3>
              <p>{caseStudy.solution}</p>
            </Card>
            <Card>
              <span className="psr__label">03 · The result</span>
              <h3>Audit-ready by default</h3>
              <p>{caseStudy.outcome}</p>
            </Card>
          </div>

          <div className="grid grid--2" style={{ marginTop: 32 }}>
            <Card padding="spacious">
              <p className="eyebrow">Engineering principles applied</p>
              <ul className="check-list" style={{ marginTop: 20 }}>
                {caseStudy.lessons.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </Card>
            <Card padding="spacious">
              <p className="eyebrow">Measured operational outcomes</p>
              <ul className="check-list" style={{ marginTop: 20 }}>
                {caseStudy.outcomes.map((o) => <li key={o}>{o}</li>)}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaBand title="Not sure which service fits?" description="Describe the problem in your own words. We will map it to the right approach and suggest a sensible first step." />
    </>
  )
}
