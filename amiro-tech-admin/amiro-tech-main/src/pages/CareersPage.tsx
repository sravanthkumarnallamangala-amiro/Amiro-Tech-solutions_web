import { useEffect, useState } from 'react'
import { Button, Card, Container, Icon, Section, type IconName } from '../components/common'
import { CareersHeroVisual } from '../components/graphics/SiteGraphics'

type Role = { id: string; title: string; discipline: string; vacancies: number; experience: string; skills: string[]; description: string; responsibilities: string[]; requirements: string[]; location?: string; workMode?: string }

function getRoleIcon(role: Role): IconName {
  if (role.discipline.toLowerCase().includes('quality')) return 'review'
  if (role.skills.some(skill => /ai|machine learning/i.test(skill))) return 'sparkle'
  if (role.discipline.toLowerCase().includes('cloud')) return 'cloud'
  return 'code'
}

const fallbackRoles: Role[] = [
  {
    id: 'python-developer', title: 'Python Developer', discipline: 'Backend engineering',
    vacancies: 2, experience: 'Up to 2 years',
    skills: ['Python', 'FastAPI', 'Azure'],
    description: 'Build the APIs and cloud services that power practical business software.',
    responsibilities: ['Develop and maintain REST APIs with Python and FastAPI.', 'Connect application services with databases and external APIs.', 'Support deployment, troubleshooting, and application monitoring on Azure.', 'Write maintainable code, add tests, and participate in code reviews.'],
    requirements: ['Up to 2 years of development experience.', 'Working knowledge of Python, FastAPI, and REST API fundamentals.', 'Familiarity with Microsoft Azure and cloud application deployment.', 'Understanding of databases, Git, debugging, and basic testing.'],
  },
  {
    id: 'full-stack-developer', title: 'Full Stack Developer', discipline: 'Product engineering',
    vacancies: 2, experience: 'Up to 2 years',
    skills: ['React', 'Python', 'FastAPI', 'Azure'],
    description: 'Connect thoughtful React interfaces with dependable Python services, from browser to cloud.',
    responsibilities: ['Build responsive, accessible interfaces using React.', 'Develop Python and FastAPI services and connect them to the frontend.', 'Work with databases, API integrations, and Azure deployments.', 'Test and troubleshoot features across the application stack.'],
    requirements: ['Up to 2 years of development experience.', 'Working knowledge of React, JavaScript, HTML, and CSS.', 'Experience building APIs with Python and FastAPI.', 'Familiarity with Azure, databases, Git, and responsive web development.'],
  },
  {
    id: 'software-tester', title: 'Software Tester / QA', discipline: 'Quality assurance',
    vacancies: 1, experience: '',
    skills: ['Manual Testing', 'API Testing', 'Regression Testing'],
    description: 'Help deliver dependable software by testing web applications, validating APIs, and identifying issues before release.',
    responsibilities: ['Create and execute test cases for web applications and APIs.', 'Document defects with clear reproduction steps and verify fixes.', 'Perform functional and regression testing across releases.', 'Collaborate with developers to improve product quality.'],
    requirements: ['Understanding of software testing fundamentals and test case design.', 'Familiarity with testing web interfaces and REST APIs.', 'Attention to detail and clear communication when reporting defects.'],
  },
]


function applicationLink(title: string) {
  return `mailto:info@amirotechsolutions.com?subject=${encodeURIComponent(`Career application — ${title}`)}&body=${encodeURIComponent(`Hello Amiro Tech team,\n\nI would like to apply for the ${title} role.\n\nName:\nExperience:\nCurrent location:\nNotice period / availability:\nPortfolio or project links (optional):\n\nI have attached my resume.\n\nThank you.`)}`
}

function webmailLink(title: string, provider: 'gmail' | 'outlook') {
  const draft = new URL(applicationLink(title))
  const subject = draft.searchParams.get('subject') ?? ''
  const body = draft.searchParams.get('body') ?? ''
  if (provider === 'gmail') {
    return `https://mail.google.com/mail/?${new URLSearchParams({ view: 'cm', fs: '1', to: 'info@amirotechsolutions.com', su: subject, body })}`
  }
  return `https://outlook.live.com/mail/0/deeplink/compose?${new URLSearchParams({ to: 'info@amirotechsolutions.com', subject, body })}`
}

export function CareersPage() {
  // Built-in roles render first (and in the prerendered HTML); live roles posted by admins replace them once loaded.
  const [roles, setRoles] = useState<Role[]>(fallbackRoles)
  useEffect(() => {
    let live = true
    fetch('/api/jobs', { cache: 'no-cache' }).then(response => (response.ok ? response.json() : null)).then((data: { configured?: boolean; jobs?: Role[] } | null) => {
      if (live && data?.configured && Array.isArray(data.jobs)) setRoles(data.jobs)
    }).catch(() => {})
    return () => { live = false }
  }, [])
  const totalVacancies = roles.reduce((total, role) => total + role.vacancies, 0)
  const teams = [...new Set(roles.map(role => role.discipline))]
  const skills = [...new Set(roles.flatMap(role => role.skills))]
  const [search, setSearch] = useState('')
  const [team, setTeam] = useState('')
  const [technology, setTechnology] = useState('')
  const [applyingFor, setApplyingFor] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState('')
  async function copyApplication(title: string) {
    try {
      await navigator.clipboard.writeText(`To: info@amirotechsolutions.com\nSubject: Career application — ${title}\n\nPlease attach your resume and include your experience, current location, and availability.`)
      setCopyStatus('Copied. Paste these details into your email service, attach your resume, and send your application.')
    } catch {
      setCopyStatus('Copy is unavailable in this browser. Select and copy the email address and subject shown above.')
    }
  }
  const filteredRoles = roles.filter(role =>
    (!team || role.discipline === team) && (!technology || role.skills.includes(technology)) &&
    `${role.title} ${role.description} ${role.skills.join(' ')} ${role.location ?? 'Bengaluru'} ${role.workMode ?? 'Hybrid'}`.toLowerCase().includes(search.trim().toLowerCase()),
  )
  const hasFilters = Boolean(search || team || technology)
  const matchingVacancies = filteredRoles.reduce((total, role) => total + role.vacancies, 0)
  function resetFilters() { setSearch(''); setTeam(''); setTechnology('') }
  return <>
    <section className="page-hero careers-hero">
      <div className="orbs orbs--soft" aria-hidden="true"><i /><i /><i /></div>
      <Container>
        <div className="careers-hero__inner">
          <div className="careers-hero__copy">
            <nav aria-label="Breadcrumb" className="crumbs">
              <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Careers</span>
            </nav>
            <p className="eyebrow hero__fade">Careers</p>
            <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>
              Build useful software.<br /><em>Grow with us.</em>
            </h1>
            <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
              Bring your curiosity and engineering skills to software, AI and cloud solutions built around real business needs.
            </p>
            <div className="actions hero__fade" style={{ ['--d' as string]: '340ms' }}>
              <Button href="#open-roles" size="lg">View open roles <Icon name="arrow" /></Button>
            </div>
          </div>
          <div className="careers-hero__visual hero__fade" style={{ ['--d' as string]: '220ms' }}>
            <CareersHeroVisual />
          </div>
        </div>
      </Container>
    </section>

    <Section id="open-roles" aria-labelledby="roles-heading" className="careers-roles">
      <Container>
        <div className="section-head-row careers-roles__heading" style={{ marginBottom: 32 }}>
          <div className="section-header">
            <p className="eyebrow">Open roles</p>
            <h2 className="section-header__title" id="roles-heading">Explore our<br />current openings.</h2>
            <p>Find the right opportunity to make an impact.</p>
            <a className="careers-roles__all" href="#open-roles">View all roles <Icon name="arrow" /></a>
          </div>
          <p className="muted">{totalVacancies} {totalVacancies === 1 ? 'vacancy' : 'vacancies'} across {roles.length} {roles.length === 1 ? 'role' : 'roles'}.</p>
        </div>
        <div className="filters" role="search" aria-label="Find a career opportunity">
          <label className="field">Search<input type="search" placeholder="Job title or keyword" value={search} onChange={event => setSearch(event.target.value)} /></label>
          <label className="field">Team<select value={team} onChange={event => setTeam(event.target.value)}><option value="">All teams</option>{teams.map(item => <option key={item}>{item}</option>)}</select></label>
          <label className="field">Skills<select value={technology} onChange={event => setTechnology(event.target.value)}><option value="">All skills</option>{skills.map(skill => <option key={skill}>{skill}</option>)}</select></label>
        </div>
        <div className="results"><p role="status">{matchingVacancies} {matchingVacancies === 1 ? 'vacancy' : 'vacancies'} across {filteredRoles.length} {filteredRoles.length === 1 ? 'role' : 'roles'}{hasFilters ? ' matching your search' : ''}</p>{hasFilters && <button type="button" onClick={resetFilters}>Clear filters</button>}</div>
        <div className="jobs">{filteredRoles.map(role => <Card className="job" id={role.id} key={role.id}>
          <div className="job__heading">
            <span className="job__icon"><Icon name={getRoleIcon(role)} /></span>
            <span className="job__team">{role.discipline}</span>
            <h3>{role.title}</h3>
          </div>
          <p className="job__description">{role.description}</p>
          <ul className="job__meta" aria-label="Role information">
            <li><Icon name="briefcase" />{role.workMode ?? 'Hybrid'}</li>
            {role.experience && <li><Icon name="clock" />{role.experience}</li>}
            <li><Icon name="users" />{role.vacancies} {role.vacancies === 1 ? 'vacancy' : 'vacancies'}</li>
          </ul>
          <div className="tags" aria-label="Technology stack">{role.skills.map(skill => <span className="tag" key={skill}>{skill}</span>)}</div>
          <Button className="job__apply" type="button" variant={applyingFor === role.id ? 'secondary' : 'primary'} aria-expanded={applyingFor === role.id} aria-controls={`${role.id}-application`} onClick={() => { setApplyingFor(applyingFor === role.id ? null : role.id); setCopyStatus('') }}>{applyingFor === role.id ? 'Close application' : 'Apply now'} <Icon name="arrow" /><span className="sr-only"> — {role.title}</span></Button>
          {applyingFor === role.id && <section className="apply-panel" id={`${role.id}-application`} aria-label={`Apply for ${role.title}`}>
            <h4>Apply for {role.title}</h4>
            <p>Send your resume with your experience, current location and availability.</p>
            <dl><dt>Email</dt><dd>info@amirotechsolutions.com</dd><dt>Subject</dt><dd>Career application — {role.title}</dd></dl>
            <div className="actions">
              <Button href={webmailLink(role.title, 'gmail')} size="sm" variant="secondary" target="_blank" rel="noopener noreferrer">Open Gmail <Icon name="external" /></Button>
              <Button href={webmailLink(role.title, 'outlook')} size="sm" variant="secondary" target="_blank" rel="noopener noreferrer">Open Outlook <Icon name="external" /></Button>
              <Button href={applicationLink(role.title)} size="sm" variant="secondary">Email app</Button>
              <Button size="sm" variant="ghost" onClick={() => copyApplication(role.title)}>Copy details</Button>
            </div>
            <p>Attach your resume, review and send. No application is sent automatically. You may need to sign in to your email service.</p>
            {copyStatus && <p role="status">{copyStatus}</p>}
            <p>See our <a href="/privacy-policy">Privacy Policy</a> for how application data is handled.</p>
          </section>}
          <details><summary>Role details</summary><div><div><h4>What you’ll work on</h4><ul className="check-list">{role.responsibilities.map(item => <li key={item}>{item}</li>)}</ul></div><div><h4>What you’ll bring</h4><ul className="check-list">{role.requirements.map(item => <li key={item}>{item}</li>)}</ul></div></div></details>
        </Card>)}</div>
        {filteredRoles.length === 0 && (roles.length === 0
          ? <div className="empty"><h3>No open roles right now</h3><p className="muted">We are not hiring at the moment. Write to info@amirotechsolutions.com and we will keep your details in mind.</p></div>
          : <div className="empty"><h3>No matching roles</h3><p className="muted">Try another keyword or clear your filters.</p><Button type="button" variant="secondary" onClick={resetFilters}>View all roles</Button></div>)}
      </Container>
    </Section>
  </>
}
