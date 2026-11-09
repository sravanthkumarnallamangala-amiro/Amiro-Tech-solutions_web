import { office } from '../../routes/office'
import { Container } from '../common'

const groups = [
  {
    label: 'Services',
    links: [
      { href: '/services#product-platform-engineering', label: 'Software Engineering' },
      { href: '/services#service-generative-ai-knowledge-systems', label: 'AI & Machine Learning' },
      { href: '/services#service-business-process-automation', label: 'Business Automation' },
      { href: '/services#integration-insight', label: 'Integration & Reporting' },
    ],
  },
  {
    label: 'EXPLORE',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/about', label: 'About' },
      { href: '/process', label: 'Process' },
      { href: '/careers', label: 'Careers' },
    ],
  },
  {
    label: 'Contact',
    links: [
      { href: 'mailto:info@amirotechsolutions.com', label: 'info@amirotechsolutions.com' },
      { href: '/contact?type=consultation', label: 'Book a consultation' },
      { href: '/contact?type=product-demo', label: 'Request a demo' },
      { href: office.mapUrl, label: 'Visit company', external: true },
    ],
  },
]

const social = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/amirotechsolutions',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="4.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10v7m0-10v.01M11.5 17v-4a2.5 2.5 0 0 1 5 0v4m-5 0v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="7" r="1.1" fill="currentColor" />
      </>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/amirotechsolutions',
    icon: (
      <>
        <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" fillOpacity="0.3" />
        <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
      </>
    ),
  },
]

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer__top">
          <div className="footer__identity">
            <a href="/" aria-label="Amiro Tech Solutions — home">
              <img className="footer__logo" src="/amiro-logo.svg" alt="Amiro Tech Solutions" width="236" height="68" />
            </a>
            <address>
              Amiro Tech Solutions Pvt Ltd, Brigade Tech Park, Whitefield Road, Bengaluru, Karnataka, India
            </address>
            <div className="footer__social">
              {social.map((item) => (
                <a aria-label={item.label} href={item.href} key={item.label} rel="noopener noreferrer" target="_blank">
                  <svg aria-hidden="true" viewBox="0 0 24 24">{item.icon}</svg>
                </a>
              ))}
            </div>
          </div>
          {groups.map((group) => (
            <nav aria-label={`Footer ${group.label.toLowerCase()}`} key={group.label}>
              <p className="footer__title">{group.label}</p>
              <div className="footer__links">
                {group.links.map((link) => (
                  <a
                    href={link.href}
                    key={link.label}
                    {...('external' in link && link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {office.companyName}. All rights reserved.</p>
          <nav aria-label="Legal" className="footer__legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-and-conditions">Terms &amp; Conditions</a>
            <a href="/cookie-policy">Cookies &amp; External Services</a>
            <a href="/admin/login" rel="nofollow">Admin Login</a>
          </nav>
        </div>
      </Container>
    </footer>
  )
}
