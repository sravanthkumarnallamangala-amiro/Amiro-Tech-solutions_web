import { Button } from './Button'
import { Container } from './Container'
import { Icon } from './Icon'

type CtaBandProps = {
  description?: string
  primary?: { href: string; label: string }
  secondary?: { href: string; label: string }
  title?: string
}

export function CtaBand({
  description = 'Share the workflow, system, or product idea you are working on. We will review it and recommend a practical next step.',
  primary = { href: '/contact?type=consultation', label: 'Book a consultation' },
  secondary = { href: '/services', label: 'Explore services' },
  title = 'Let’s discuss what you need to build.',
}: CtaBandProps) {
  return (
    <section className="section section--compact">
      <Container>
        <div className="cta-band">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <p className="eyebrow">Next step</p>
            <h2 style={{ marginTop: 14 }}>{title}</h2>
            <p>{description}</p>
          </div>
          <div className="cta-band__side">
            <div className="actions">
              <Button href={primary.href} size="lg">
                {primary.label} <Icon name="arrow" />
              </Button>
              <Button href={secondary.href} size="lg" variant="secondary">
                {secondary.label}
              </Button>
            </div>
            <div className="cta-band__contact">
              <span>Prefer email?</span>
              <a href="mailto:info@amirotechsolutions.com">info@amirotechsolutions.com</a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
