import { Button, Card, Container, CtaBand, Icon, Section, SectionHeader, type IconName } from '../components/common';
import { AboutHeroVisual, AboutValuesStrip } from '../components/graphics/SiteGraphics';
import { office } from '../routes/office';

const principles: { icon: IconName; title: string; text: string }[] = [
  { icon: 'briefcase', title: 'Business first', text: 'We start with the process, users, constraints and goals before choosing tools or writing code.' },
  { icon: 'layers', title: 'Built to fit', text: 'Every system is designed around your workflows and roles — not forced into a generic template.' },
  { icon: 'sparkle', title: 'Practical AI', text: 'We apply AI and Voice AI where it creates clear value, with human handoff where it matters.' },
  { icon: 'monitor', title: 'Clear interfaces', text: 'Simple, modern interfaces that teams can adopt quickly with minimal training.' },
  { icon: 'cloud', title: 'Scalable architecture', text: 'Foundations designed for growth, integration and reliability from day one.' },
  { icon: 'users', title: 'Long-term partnership', text: 'We support and improve systems well beyond the first release.' },
]

export function AboutPage() {
  return (
    <>
      <section className="page-hero about-hero">
        <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
        <Container>
          <div className="about-hero__inner">
            <div className="about-hero__copy">
              <nav aria-label="Breadcrumb" className="crumbs">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">About</span>
              </nav>
              <p className="eyebrow hero__fade">About Amiro Tech</p>
              <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>
                A practical technology partner for digital <em>operations.</em>
              </h1>
              <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
                We help businesses replace disconnected, manual processes with dependable software, practical AI and automation — designed around the way their teams actually work.
              </p>
              <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>
                <Button href="/contact?type=consultation" size="lg">Discuss your goals <Icon name="arrow" /></Button>
                <Button href="/process" size="lg" variant="secondary">Our process</Button>
              </div>
            </div>
            <div className="about-hero__visual hero__fade" style={{ ['--d' as string]: '220ms' }}>
              <AboutHeroVisual
                company={office.companyName}
                address="Bengaluru"
                focus="Next-Gen Platforms • Intelligent Systems • Innovation"
              />
            </div>
          </div>
          <AboutValuesStrip />
        </Container>
      </section>

      <Section>
        <Container>
          <div className="about-intro">
            <div className="about-intro__lead-col">
              <p className="eyebrow">WHY WE ARE</p>
              <h2 className="about-intro__title">
                <span className="text-highlight">Why Amiro</span>
              </h2>
            </div>
            <div className="about-intro__text-col">
              <p>
                Amiro Tech is a technology-driven company focused on delivering innovative software solutions, intelligent AI applications, and digital transformation services. We help businesses simplify complex processes, improve operational efficiency, and achieve their goals through scalable, reliable, and future-ready technology.
              </p>
              <p>
                Our expertise spans <strong>custom software development, web and application development, AI and machine learning solutions, business process automation, and digital platform engineering</strong>. We combine modern technologies, strategic thinking, and user-focused design to build solutions that address real-world business challenges.
              </p>
              <p>
                From understanding business requirements and designing solutions to development, deployment, and continuous improvement, we focus on delivering quality, innovation, and measurable business value at every stage.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="soft">
        <Container>
          <SectionHeader eyebrow="How we work" title="Principles that guide every engagement." />
          <div className="grid grid--3" style={{ marginTop: 48 }}>
            {principles.map((p) => (
              <Card key={p.title}>
                <div style={{ display: 'grid', gap: 14 }}>
                  <span className="icon-tile"><Icon name={p.icon} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="split split--even">
            <SectionHeader
              eyebrow="Visit us"
              title="Our office"
              description="We work with clients in India and internationally, in person and remotely."
            />
            <Card padding="spacious">
              <div style={{ display: 'grid', gap: 14 }}>
                <span className="icon-tile"><Icon name="pin" /></span>
                <address style={{ fontStyle: 'normal', color: 'var(--text-2)' }}>
                  <strong style={{ color: 'var(--text)' }}>{office.companyName}</strong>
                  <br />Whitefield Road, Brigade Tech Park
                  <br />{office.city}, {office.region} {office.postalCode}, {office.country}
                </address>
                <a className="text-link" href={office.mapUrl} rel="noopener noreferrer" target="_blank">Open in Google Maps <Icon name="external" /></a>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  )
}
