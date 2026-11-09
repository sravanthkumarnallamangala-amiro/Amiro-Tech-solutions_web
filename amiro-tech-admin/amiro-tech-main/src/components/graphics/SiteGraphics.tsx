import { Fragment, useEffect, useState } from 'react';
import { Icon, type IconName } from '../common';

const architectureLayers: { title: string; description: string; items: { icon: IconName; label: string; detail: string }[] }[] = [
  {
    title: 'Business Channels',
    description: 'How customers use the solution',
    items: [
      { icon: 'monitor', label: 'Digital Platforms', detail: 'Access via browser' },
      { icon: 'phone', label: 'Mobility Solutions', detail: 'On the go' },
      { icon: 'cloud', label: 'Cloud Enablement', detail: 'Scalable & flexible' },
      { icon: 'sparkle', label: 'AI Automation', detail: 'Smarter workflows' },
    ],
  },
  {
    title: 'Technology Foundation',
    description: 'The building blocks',
    items: [
      { icon: 'database', label: 'Data Intelligence', detail: 'Store & manage data' },
      { icon: 'cloud', label: 'Cloud Infrastructure', detail: 'Reliable & scalable' },
      { icon: 'shield', label: 'Cybersecurity', detail: 'Protect & monitor' },
      { icon: 'plug', label: 'Integrations', detail: 'Connect effortlessly' },
    ],
  },
  {
    title: 'Delivery Foundation',
    description: 'How we build and maintain it',
    items: [
      { icon: 'layers', label: 'Smart Solutions', detail: 'Grow without limits' },
      { icon: 'flow', label: 'AI Engineering', detail: 'Build faster, better' },
      { icon: 'chart', label: 'Cloud Modernization', detail: 'Innovate continuously' },
    ],
  },
]

/** Layered view of how Amiro designs, builds, and delivers connected business software. */
export function ArchitectureVisual() {
  return (
    <figure className="home-architecture" aria-label="Software architecture: business channels connect to the Amiro Tech Core, supported by technology and delivery foundations">
      <div className="home-architecture__glow" aria-hidden="true" />
      <div className="home-architecture__model">
        <section className="home-architecture__layer home-architecture__layer--channels" aria-labelledby="architecture-channels">
          <h2 className="home-architecture__layer-heading" id="architecture-channels">
            <strong>Business <em>Channels</em></strong><span>How customers use the solution</span>
          </h2>
          <ul className="home-architecture__items">
            {architectureLayers[0].items.map((item) => (
              <li key={item.label}>
                <Icon name={item.icon} />
                <span><strong>{item.label}</strong><small>{item.detail}</small></span>
              </li>
            ))}
          </ul>
        </section>
        <span className="home-architecture__connector" aria-hidden="true" />
        <section className="home-architecture__core" aria-label="Amiro Tech Core, the central intelligence layer">
          <span className="home-architecture__core-icon"><Icon name="layers" /></span>
          <span className="home-architecture__core-copy">
            <strong>Amiro Tech <em>Core</em></strong>
            <small>Connects applications, workflows, APIs and AI</small>
          </span>
        </section>
        <span className="home-architecture__connector" aria-hidden="true" />
        {architectureLayers.slice(1).map((layer, index) => (
          <Fragment key={layer.title}>
            <section className={`home-architecture__layer home-architecture__layer--${index === 0 ? 'technology' : 'delivery'}`} aria-labelledby={`architecture-${index === 0 ? 'technology' : 'delivery'}`}>
              <h2 className="home-architecture__layer-heading" id={`architecture-${index === 0 ? 'technology' : 'delivery'}`}>
                <strong>{layer.title.split(' ')[0]} <em>{layer.title.split(' ').slice(1).join(' ')}</em></strong><span>{layer.description}</span>
              </h2>
              <ul className="home-architecture__items">
                {layer.items.map((item) => (
                  <li key={item.label}>
                    <Icon name={item.icon} />
                    <span><strong>{item.label}</strong><small>{item.detail}</small></span>
                  </li>
                ))}
              </ul>
            </section>
            {index === 0 && <span className="home-architecture__connector" aria-hidden="true" />}
          </Fragment>
        ))}
      </div>
    </figure>
  )
}

const serviceOrbitNodes: { icon: IconName; label: string; detail: string; className: string }[] = [
  { icon: 'code', label: 'Software Engineering', detail: 'Scalable solutions', className: 'services-orbit__node--software' },
  { icon: 'sparkle', label: 'AI & Intelligence', detail: 'Smarter decisions', className: 'services-orbit__node--ai' },
  { icon: 'flow', label: 'Process Automation', detail: 'Greater efficiency', className: 'services-orbit__node--automation' },
  { icon: 'plug', label: 'Connected Ecosystems', detail: 'Seamless integrations', className: 'services-orbit__node--integrations' },
  { icon: 'cloud', label: 'Cloud Solutions', detail: 'Built for scale', className: 'services-orbit__node--cloud' },
]

export function ServicesOrbitVisual() {
  return (
    <figure className="services-orbit" aria-label="Amiro services: software engineering, AI and intelligence, process automation, connected ecosystems, and cloud solutions">
      <svg className="services-orbit__connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50 C40 38 31 35.7 22.2 35.7" />
        <path d="M50 50 C50 38 50 29 50 21.3" />
        <path d="M50 50 C60 38 69 35.7 77.8 35.7" />
        <path d="M50 50 C41 63 33 78.7 26.3 78.7" />
        <path d="M50 50 C59 63 67 78.7 73.7 78.7" />
      </svg>
      <div className="services-orbit__rings" aria-hidden="true"><i /><i /><i /><span /></div>
      <div className="services-orbit__core" aria-hidden="true">
        <span className="services-orbit__core-top">
          <Icon name="cloud" />
        </span>
        <span className="services-orbit__core-base" />
      </div>
      {serviceOrbitNodes.map((node) => (
        <div className={`services-orbit__node ${node.className}`} key={node.label}>
          <Icon name={node.icon} />
          <strong className="services-orbit__node-label">{node.label}</strong>
          <span className="services-orbit__node-detail">{node.detail}</span>
        </div>
      ))}
    </figure>
  )
}

export function ProductEcosystemVisual() {
  return (
    <figure className="product-ecosystem" aria-label="Interactive NDT inventory dashboard with inventory, calibration, compliance, audit and reporting views">
      <div className="product-ecosystem__glow" aria-hidden="true" />
      <div className="product-ecosystem__laptop">
        <div className="product-ecosystem__screen">
          <span className="product-ecosystem__webcam" aria-hidden="true" />
          <InventoryMock connectTrend />
        </div>
      </div>
      <div className="product-ecosystem__callout product-ecosystem__callout--left">
        <Icon name="database" /><span><small>Manage</small><strong>Inventory &amp; calibration</strong></span>
      </div>
      <div className="product-ecosystem__callout product-ecosystem__callout--right">
        <Icon name="shield" /><span><small>Reliable</small><strong>Compliance &amp; audit trail</strong></span>
      </div>
    </figure>
  )
}

export function ProductTileVisual({ id, icon }: { id: string; icon: IconName }) {
  return (
    <div className={`product-tile-visual product-tile-visual--${id}`} aria-hidden="true">
      <span className="product-tile-visual__glow" />
      <span className="product-tile-visual__icon"><Icon name={icon} /></span>
      <span className={`product-tile-visual__panel product-tile-visual__panel--${id}`}>
        {id === 'ims' && (
          <>
            <i /><i /><i />
            <span className="product-tile-visual__bars"><b /><b /><b /><b /><b /></span>
          </>
        )}
        {id === 'hr' && (
          <span className="product-tile-visual__roster">
            <i /><i /><i /><i />
          </span>
        )}
        {id === 'voice-ai' && (
          <span className="product-tile-visual__wave">
            <b /><b /><b /><b /><b /><b /><b /><b /><b />
          </span>
        )}
        {id === 'business-ops' && (
          <span className="product-tile-visual__workflow">
            <i /><i /><i /><i /><i />
          </span>
        )}
      </span>
      <span className="product-tile-visual__spark"><Icon name="sparkle" /></span>
    </div>
  )
}

const processStageIcons: IconName[] = ['review', 'code', 'shield', 'users']
const workflowMilestones: { icon: IconName; title: string; detail: string }[] = [
  { icon: 'sparkle', title: 'Discover', detail: 'Explore & Plan' },
  { icon: 'monitor', title: 'Design', detail: 'Architect & Plan' },
  { icon: 'code', title: 'Build', detail: 'Develop & Test' },
  { icon: 'rocket', title: 'Deploy', detail: 'Launch & Support' },
  { icon: 'chart', title: 'Grow', detail: 'Improve & Scale' },
]

export function ProcessHeroVisual({ steps }: { steps: { title: string; summary: string }[] }) {
  return (
    <div className="process-hero-visual">
      <div className="process-hero-visual__stack" aria-hidden="true" />
      <ol className="process-hero-visual__stages" aria-label="Delivery stages">
        {steps.map((step, index) => (
          <li className="process-hero-stage" key={step.title}>
            <span className="process-hero-stage__icon"><Icon name={processStageIcons[index]} /></span>
            <span className="process-hero-stage__copy">
              <span className="process-hero-stage__title">{step.title}</span>
              <span className="process-hero-stage__summary">{step.summary}</span>
            </span>
            <span className="process-hero-stage__number">0{index + 1}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ProcessWorkflow() {
  return (
    <div className="process-workflow">
      <div className="process-workflow__intro">
        <p className="eyebrow">Our delivery workflow</p>
        <h2>From idea to impact —<br />with confidence.</h2>
      </div>
      <ol className="process-workflow__steps">
        {workflowMilestones.map((milestone, index) => (
          <Fragment key={milestone.title}>
            <li className="process-workflow__step">
              <span className="process-workflow__icon"><Icon name={milestone.icon} /></span>
              <strong>{milestone.title}</strong>
              <small>{milestone.detail}</small>
            </li>
            {index < workflowMilestones.length - 1 && <span className="process-workflow__arrow" aria-hidden="true">→</span>}
          </Fragment>
        ))}
      </ol>
    </div>
  )
}

const aboutValues: { icon: IconName; title: string; detail: string }[] = [
  { icon: 'sparkle', title: 'Innovation at Core', detail: 'Practical ideas, thoughtfully applied.' },
  { icon: 'users', title: 'Client-Centric Approach', detail: 'Built around the people who use it.' },
  { icon: 'shield', title: 'Trusted & Secure Solutions', detail: 'Dependable foundations for real work.' },
  { icon: 'chart', title: 'Continuous Improvement', detail: 'Better systems as your needs grow.' },
]

export function AboutHeroVisual({ company, address, focus }: { company: string; address: string; focus: string }) {
  return (
    <figure className="about-hero-visual">
      <div className="about-hero-visual__building">
        <img src="/images/about/office-building.jpg" alt="Glass-fronted modern office building" />
        <div className="about-hero-visual__building-shade" />
      </div>
      <div className="about-hero-visual__info">
        <div className="about-hero-visual__item">
          <span className="about-hero-visual__icon"><Icon name="briefcase" /></span>
          <span><small>Company</small><strong>{company}</strong></span>
        </div>
        <div className="about-hero-visual__item">
          <span className="about-hero-visual__icon"><Icon name="pin" /></span>
          <span><small>Company</small><strong>{address}</strong></span>
        </div>
        <div className="about-hero-visual__item">
          <span className="about-hero-visual__icon"><Icon name="flow" /></span>
          <span><small>Focus</small><strong>{focus}</strong></span>
        </div>
      </div>
    </figure>
  )
}

export function AboutValuesStrip() {
  return (
    <div className="about-values">
      <div className="about-values__intro">
        <p className="eyebrow">What drives us</p>
        <h2>Building intelligent<br />solutions together.</h2>
        <p>Innovation, collaboration and measurable impact.</p>
      </div>
      <ul className="about-values__list">
        {aboutValues.map((value) => (
          <li className="about-values__item" key={value.title}>
            <span className="about-values__icon"><Icon name={value.icon} /></span>
            <strong>{value.title}</strong>
            <small>{value.detail}</small>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function CareersHeroVisual() {
  return (
    <figure className="careers-hero-visual">
      <img src="/images/careers/team-collaboration.png" alt="Colleagues collaborating in a modern office" />
    </figure>
  )
}

type InventorySection = 'overview' | 'calibration' | 'compliance' | 'audit' | 'reports'
type InventoryRange = '6 months' | '12 months'
type DashboardMetric = { label: string; value: string; icon: IconName; tone?: 'success' | 'warning' }
type DashboardRow = { values: string[]; statusIndex?: number; statusTone?: 'ok' | 'due' | 'review' }

const inventorySections: { id: InventorySection; label: string; icon: IconName; title: string; detail: string }[] = [
  { id: 'overview', label: 'Overview', icon: 'chart', title: 'Equipment overview', detail: 'A clear view of inventory and upcoming work.' },
  { id: 'calibration', label: 'Calibration', icon: 'review', title: 'Calibration schedule', detail: 'Review upcoming calibration activity and due dates.' },
  { id: 'compliance', label: 'Compliance', icon: 'shield', title: 'Compliance overview', detail: 'Monitor records, certificates and open actions.' },
  { id: 'audit', label: 'Audit log', icon: 'doc', title: 'Recent activity', detail: 'Review a traceable history of equipment updates.' },
  { id: 'reports', label: 'Reports', icon: 'chart', title: 'Inventory reports', detail: 'Review sample inventory and calibration trends.' },
]

const inventoryChartData: Record<InventoryRange, { months: string[]; counts: number[] }> = {
  '6 months': { months: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], counts: [8, 12, 9, 15, 11, 18] },
  '12 months': { months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], counts: [6, 9, 7, 11, 8, 13, 8, 12, 9, 15, 11, 18] },
}

const inventoryCategories = [
  { label: 'UT equipment', count: 82 },
  { label: 'Thickness gauges', count: 61 },
  { label: 'Probe sets', count: 57 },
  { label: 'Other equipment', count: 48 },
]

const dashboardMetrics: Record<InventorySection, DashboardMetric[]> = {
  overview: [
    { label: 'Total equipment', value: '248', icon: 'layers' },
    { label: 'Due this month', value: '32', icon: 'clock', tone: 'warning' },
    { label: 'Records in order', value: '98%', icon: 'check', tone: 'success' },
  ],
  calibration: [
    { label: 'Due this month', value: '32', icon: 'clock', tone: 'warning' },
    { label: 'Overdue', value: '4', icon: 'review', tone: 'warning' },
    { label: 'Completed this month', value: '18', icon: 'check', tone: 'success' },
  ],
  compliance: [
    { label: 'Records reviewed', value: '248', icon: 'doc' },
    { label: 'Actions to review', value: '5', icon: 'clock', tone: 'warning' },
    { label: 'Documentation on file', value: '98%', icon: 'check', tone: 'success' },
  ],
  audit: [
    { label: 'Logged this month', value: '86', icon: 'doc' },
    { label: 'Equipment updates', value: '24', icon: 'layers' },
    { label: 'Open reviews', value: '3', icon: 'clock', tone: 'warning' },
  ],
  reports: [
    { label: 'Equipment categories', value: '4', icon: 'layers' },
    { label: 'Items represented', value: '248', icon: 'chart' },
    { label: 'Period selected', value: '6 months', icon: 'clock' },
  ],
}

const dashboardTables: Record<InventorySection, { heading: string; columns: string[]; rows: DashboardRow[] }> = {
  overview: {
    heading: 'Recently updated equipment',
    columns: ['Equipment', 'Status', 'Next calibration', 'Asset ID'],
    rows: [
      { values: ['UT Flaw Detector', 'Calibrated', '15 Dec', 'EQ-014'], statusIndex: 1, statusTone: 'ok' },
      { values: ['Thickness Gauge', 'Due soon', '20 Dec', 'EQ-027'], statusIndex: 1, statusTone: 'due' },
      { values: ['Probe Set A', 'Calibrated', '10 Jan', 'EQ-036'], statusIndex: 1, statusTone: 'ok' },
      { values: ['Magnetic Yoke', 'Calibrated', '18 Jan', 'EQ-042'], statusIndex: 1, statusTone: 'ok' },
    ],
  },
  calibration: {
    heading: 'Upcoming calibration',
    columns: ['Equipment', 'Priority', 'Due date', 'Assigned to'],
    rows: [
      { values: ['Thickness Gauge', 'Due soon', '20 Dec', 'Metrology'], statusIndex: 1, statusTone: 'due' },
      { values: ['UT Flaw Detector', 'Scheduled', '22 Dec', 'Quality team'], statusIndex: 1, statusTone: 'ok' },
      { values: ['Probe Set B', 'Overdue', '02 Dec', 'Operations'], statusIndex: 1, statusTone: 'due' },
      { values: ['Magnetic Yoke', 'Scheduled', '18 Jan', 'Quality team'], statusIndex: 1, statusTone: 'ok' },
    ],
  },
  compliance: {
    heading: 'Documentation checklist',
    columns: ['Requirement', 'Status', 'Last reviewed', 'Record'],
    rows: [
      { values: ['Calibration certificates', 'In order', '04 Nov', 'DOC-108'], statusIndex: 1, statusTone: 'ok' },
      { values: ['Equipment register', 'In order', '02 Nov', 'DOC-104'], statusIndex: 1, statusTone: 'ok' },
      { values: ['Inspection records', 'Review needed', '28 Oct', 'DOC-097'], statusIndex: 1, statusTone: 'review' },
      { values: ['Corrective actions', 'Review needed', '26 Oct', 'DOC-091'], statusIndex: 1, statusTone: 'review' },
    ],
  },
  audit: {
    heading: 'Activity history',
    columns: ['Time', 'Activity', 'Equipment', 'Updated by'],
    rows: [
      { values: ['10:42 AM', 'Calibration record updated', 'UT Flaw Detector', 'Quality team'] },
      { values: ['09:18 AM', 'Equipment assigned', 'Thickness Gauge', 'Operations'] },
      { values: ['Yesterday', 'Certificate attached', 'Probe Set A', 'Quality team'] },
      { values: ['04 Nov', 'Inspection completed', 'Magnetic Yoke', 'Lab technician'] },
    ],
  },
  reports: {
    heading: 'Category summary',
    columns: ['Category', 'Equipment count', 'Share of sample', 'Trend'],
    rows: [
      { values: ['UT equipment', '82', '33%', 'Stable'] },
      { values: ['Thickness gauges', '61', '25%', 'Stable'] },
      { values: ['Probe sets', '57', '23%', 'Growing'] },
      { values: ['Other equipment', '48', '19%', 'Stable'] },
    ],
  },
}

const complianceChecks = [
  { label: 'Calibration certificates on file', value: 98 },
  { label: 'Equipment records reviewed', value: 94 },
  { label: 'Inspection documents current', value: 91 },
  { label: 'Corrective actions closed', value: 86 },
]

/** Interactive illustrative product interface. All displayed values are sample data. */
export function InventoryMock({ connectTrend = false }: { connectTrend?: boolean }) {
  const [activeSection, setActiveSection] = useState<InventorySection>('overview')
  const [range, setRange] = useState<InventoryRange>('6 months')
  const section = inventorySections.find((item) => item.id === activeSection) ?? inventorySections[0]
  const chart = inventoryChartData[range]
  const maxCount = Math.max(...chart.counts)
  const table = dashboardTables[activeSection]
  const metrics = dashboardMetrics[activeSection]

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const interval = window.setInterval(() => {
      setActiveSection((current) => {
        const currentIndex = inventorySections.findIndex((item) => item.id === current)
        return inventorySections[(currentIndex + 1) % inventorySections.length].id
      })
    }, 5000)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <figure
      className="inventory-preview"
      aria-label="Interactive illustrative NDT inventory dashboard; views rotate automatically every five seconds."
    >
      <div className="inventory-preview__window">
        <div className="inventory-preview__tabs" role="group" aria-label="Dashboard sections">
          <button
            aria-pressed={activeSection !== 'compliance'}
            className={`inventory-preview__tab${activeSection !== 'compliance' ? ' inventory-preview__tab--active' : ''}`}
            onClick={() => setActiveSection('overview')}
            type="button"
          >
            <Icon name="database" /> Inventory
          </button>
          <button
            aria-pressed={activeSection === 'compliance'}
            className={`inventory-preview__tab${activeSection === 'compliance' ? ' inventory-preview__tab--active' : ''}`}
            onClick={() => setActiveSection('compliance')}
            type="button"
          >
            <Icon name="shield" /> Compliance
          </button>
        </div>
        <div className="inventory-preview__workspace">
          <nav className="inventory-preview__sidebar" aria-label="Inventory dashboard navigation">
            {inventorySections.filter((item) => item.id !== 'compliance').map((item) => (
              <button
                aria-current={activeSection === item.id ? 'page' : undefined}
                className={`inventory-preview__nav-item${activeSection === item.id ? ' inventory-preview__nav-item--active' : ''}`}
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                type="button"
              >
                <Icon name={item.icon} /> {item.label}
              </button>
            ))}
          </nav>
          <div className="inventory-preview__main">
            <div className="inventory-preview__heading">
              <span className="inventory-preview__heading-icon"><Icon name={section.icon} /></span>
              <div><h3>{section.title}</h3><p>{section.detail}</p></div>
              <span className="inventory-preview__sample-badge">Sample data</span>
            </div>
            <div className="inventory-preview__kpis">
              {metrics.map((metric) => (
                <div
                  className={`inventory-preview__kpi${metric.tone === 'success' ? ' inventory-preview__kpi--success' : ''}${metric.tone === 'warning' ? ' inventory-preview__kpi--warning' : ''}`}
                  key={metric.label}
                >
                  <Icon name={metric.icon} /><span>{metric.label}</span><strong>{metric.value}</strong>
                </div>
              ))}
            </div>
            {(activeSection === 'overview' || activeSection === 'reports' || activeSection === 'calibration') && (
              <div className={`inventory-preview__charts${activeSection === 'calibration' ? ' inventory-preview__charts--single' : ''}`}>
                {(activeSection === 'overview' || activeSection === 'reports') && (
                  <section className="inventory-preview__chart-card" aria-label="Equipment by category bar chart">
                    <div className="inventory-preview__chart-heading">
                      <div>
                        <h4>{activeSection === 'reports' ? 'Equipment distribution' : 'Equipment by category'}</h4>
                        <p>{activeSection === 'reports' ? 'Share of sample inventory' : 'Registered items'}</p>
                      </div>
                      <Icon name="chart" />
                    </div>
                    <div className="inventory-preview__category-bars">
                      {inventoryCategories.map((item) => (
                        <div className="inventory-preview__category-row" key={item.label}>
                          <span>{item.label}</span>
                          <div className="inventory-preview__bar-track" role="img" aria-label={`${item.label}: ${item.count} sample items`}>
                            <i style={{ width: `${(item.count / 100) * 100}%` }} />
                          </div>
                          <strong>{item.count}</strong>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
                <section className="inventory-preview__chart-card" aria-label={`Calibration due bar chart for ${range}`}>
                  <div className="inventory-preview__chart-heading">
                    <div>
                      <h4>{activeSection === 'calibration' ? 'Scheduled calibrations' : 'Calibration due'}</h4>
                      <p>{activeSection === 'calibration' ? 'Plan upcoming work by month' : 'Scheduled items by month'}</p>
                    </div>
                    <select
                      aria-label="Calibration chart date range"
                      className="inventory-preview__range"
                      onChange={(event) => setRange(event.target.value as InventoryRange)}
                      value={range}
                    >
                      <option>6 months</option>
                      <option>12 months</option>
                    </select>
                  </div>
                  <div
                    className={`inventory-preview__month-chart${connectTrend ? ' inventory-preview__month-chart--connected' : ''}`}
                    role="img"
                    aria-label={`${range} calibration schedule: ${chart.counts.join(', ')} sample items${connectTrend ? ', with a connected trend line' : ''}`}
                    style={{ gridTemplateColumns: `repeat(${chart.months.length}, minmax(0, 1fr))` }}
                  >
                    {connectTrend && (
                      <svg className="inventory-preview__month-trend" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        <polyline
                          points={chart.counts
                            .map((count, index) => `${((index + 0.5) / chart.counts.length) * 100},${100 - (count / maxCount) * 100}`)
                            .join(' ')}
                        />
                        {chart.counts.map((count, index) => (
                          <circle
                            cx={((index + 0.5) / chart.counts.length) * 100}
                            cy={100 - (count / maxCount) * 100}
                            key={`${chart.months[index]}-trend-point`}
                            r="1.5"
                          />
                        ))}
                      </svg>
                    )}
                    {chart.months.map((month, index) => (
                      <div className="inventory-preview__month-column" key={month}>
                        <span className="inventory-preview__month-value">{chart.counts[index]}</span>
                        <i style={{ height: `${Math.max((chart.counts[index] / maxCount) * 100, 8)}%` }} />
                        <span className="inventory-preview__month-label">{month}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
            {activeSection === 'compliance' && (
              <section className="inventory-preview__compliance" aria-label="Compliance document status">
                <div className="inventory-preview__chart-heading">
                  <div><h4>Documentation health</h4><p>Illustrative status by record type</p></div>
                  <Icon name="shield" />
                </div>
                {complianceChecks.map((check) => (
                  <div className="inventory-preview__compliance-row" key={check.label}>
                    <span>{check.label}</span>
                    <div className="inventory-preview__bar-track" role="img" aria-label={`${check.label}: ${check.value}% sample status`}>
                      <i style={{ width: `${check.value}%` }} />
                    </div>
                    <strong>{check.value}%</strong>
                  </div>
                ))}
              </section>
            )}
            {activeSection === 'audit' && (
              <section className="inventory-preview__activity-summary" aria-label="Audit trail information">
                <Icon name="shield" />
                <p>Changes are shown with a timestamp, affected equipment and responsible team member in a traceable activity history.</p>
              </section>
            )}
            <div className="inventory-preview__table">
              <div className="inventory-preview__table-title">{table.heading}</div>
              <div className="inventory-preview__row inventory-preview__row--head">
                {table.columns.map((column) => <span key={column}>{column}</span>)}
              </div>
              {table.rows.map((row) => (
                <div className="inventory-preview__row" key={row.values.join('-')}>
                  {row.values.map((value, index) => (
                    <span key={`${index}-${value}`}>
                      {index === row.statusIndex ? (
                        <b className={`inventory-preview__status inventory-preview__status--${row.statusTone ?? 'ok'}`}>{value}</b>
                      ) : value}
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="inventory-preview__note"><Icon name="shield" /> Illustrative dashboard — figures are sample data, not client records.</div>
          </div>
        </div>
      </div>
    </figure>
  )
}
