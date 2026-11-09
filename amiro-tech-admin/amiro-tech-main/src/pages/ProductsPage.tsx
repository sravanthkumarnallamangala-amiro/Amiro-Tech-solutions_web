import { Button, Card, Container, CtaBand, Icon, Section, SectionHeader } from '../components/common'
import { CompanyAiChatBox } from '../components/chat/CompanyAiChatBox'
import { InventoryMock, ProductEcosystemVisual, ProductTileVisual } from '../components/graphics/SiteGraphics'
import { caseStudy, products } from '../data/site'

export function ProductsPage() {
  const productHighlights = [
    { icon: 'database' as const, label: 'Inventory & calibration' },
    { icon: 'shield' as const, label: 'Compliance visibility' },
    { icon: 'doc' as const, label: 'Audit-ready records' },
    { icon: 'flow' as const, label: 'Workflow-focused software' },
  ]
  return (
    <>
      <section className="page-hero products-hero">
        <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
        <Container>
          <div className="products-hero__inner">
            <div className="products-hero__copy">
              <nav aria-label="Breadcrumb" className="crumbs">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Products</span>
              </nav>
              <p className="products-hero__badge hero__fade"><Icon name="layers" /> Purpose-built business software</p>
              <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>
                Smart products for a <em>smarter tomorrow.</em>
              </h1>
              <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
                Focused software to simplify everyday work, improve operational visibility and help growing teams manage essential workflows.
              </p>
              <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>
                <Button href="#product-line" size="lg">Explore products <Icon name="arrow" /></Button>
                <Button href="/contact?type=product-demo&product=ims" size="lg" variant="secondary">Request an IMS demo</Button>
              </div>
            </div>
            <div className="products-hero__visual hero__fade" style={{ ['--d' as string]: '220ms' }}>
              <ProductEcosystemVisual />
            </div>
          </div>
          <ul className="products-hero__highlights" aria-label="Product capabilities">
            {productHighlights.map((item) => (
              <li key={item.label}><Icon name={item.icon} /><span>{item.label}</span></li>
            ))}
          </ul>
        </Container>
      </section>

      <Section id="product-line" className="product-line">
        <Container>
          <div className="section-head-row">
            <SectionHeader eyebrow="Product line" title="Practical systems, not bloated platforms." />
            <a className="text-link product-line__explore" href="/contact?type=product-demo">Explore our product offerings <Icon name="arrow" /></a>
          </div>
          <div className="grid grid--4 product-line__grid">
            {products.map((p, i) => (
              <Card id={p.id} interactive key={p.id} className="product-card">
                <div className="product">
                  <ProductTileVisual id={p.id} icon={p.icon} />
                  <span className="product__cat">0{i + 1} · {p.category}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <ul className="check-list" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    {p.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="product__foot">
                    <Button href={p.href} variant="primary">
                      {p.cta} <Icon name="arrow" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: 48 }}>
            <CompanyAiChatBox />
          </div>
        </Container>
      </Section>

      {/* Featured implementation / In the field */}
      <Section tone="soft">
        <Container>
          <div className="split split--even">
            <div style={{ display: 'grid', gap: 24 }}>
              <SectionHeader
                eyebrow={`In the field · ${caseStudy.client}`}
                title="Proven in NDT laboratory operations."
                description={caseStudy.summary}
              />
              <dl className="kv product-case-meta" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {caseStudy.meta.map((m) => (
                  <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
                ))}
              </dl>
              <div style={{ display: 'grid', gap: 12 }}>
                <p className="eyebrow" style={{ margin: 0 }}>Operational impact</p>
                <ul className="check-list">
                  {caseStudy.outcomes.map((o) => <li key={o}>{o}</li>)}
                </ul>
              </div>
              <div className="actions" style={{ marginTop: 8 }}>
                <Button href="/contact?type=product-demo&product=ims" size="lg">
                  Request an IMS demo <Icon name="arrow" />
                </Button>
                <Button href="/contact?type=custom-software" size="lg" variant="secondary">
                  Discuss custom needs
                </Button>
              </div>
            </div>
            <InventoryMock connectTrend />
          </div>

          <div className="grid grid--2" style={{ marginTop: 48 }}>
            <Card padding="spacious">
              <p className="eyebrow">Operational insights</p>
              <ul className="check-list" style={{ marginTop: 20 }}>
                {caseStudy.lessons.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </Card>
            <Card padding="spacious">
              <p className="eyebrow">Platform roadmap & enhancements</p>
              <ul className="check-list" style={{ marginTop: 20 }}>
                {caseStudy.roadmap.map((l) => <li key={l}>{l}</li>)}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaBand
        title="Need a product demo or a custom solution?"
        description="Start with a focused conversation about your workflow or product requirement."
        primary={{ href: '/contact?type=product-demo', label: 'Request a demo' }}
        secondary={{ href: '/contact?type=custom-software', label: 'Discuss custom software' }}
      />
    </>
  )
}
