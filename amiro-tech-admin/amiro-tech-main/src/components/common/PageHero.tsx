import type { ReactNode } from 'react'
import { Container } from './Container'

type PageHeroProps = {
  actions?: ReactNode
  aside?: ReactNode
  children?: ReactNode
  crumb: string
  eyebrow: string
  lead: string
  title: string
}

/** Consistent hero for every inner page: breadcrumb → eyebrow → H1 → lead → actions, optional fact panel. */
export function PageHero({ actions, aside, children, crumb, eyebrow, lead, title }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
      <Container>
        <div className={['page-hero__inner', aside ? '' : 'page-hero__inner--single'].filter(Boolean).join(' ')}>
          <div>
            <nav aria-label="Breadcrumb" className="crumbs">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{crumb}</span>
            </nav>
            <p className="eyebrow hero__fade">{eyebrow}</p>
            <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>{title}</h1>
            <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>{lead}</p>
            {actions ? <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>{actions}</div> : null}
            {children}
          </div>
          {aside ? <aside className="page-hero__aside hero__fade" style={{ ['--d' as string]: '300ms' }}>{aside}</aside> : null}
        </div>
      </Container>
    </section>
  )
}
