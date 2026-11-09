import { office } from './office'

export const siteUrl = 'https://www.amirotechsolutions.com'
export const pageSeo = [
  { path: '/privacy-policy', title: 'Privacy Policy | Amiro Tech Solutions', description: 'Information about enquiries, career applications, and data handling at Amiro Tech Solutions.' },
  { path: '/terms-and-conditions', title: 'Terms & Conditions | Amiro Tech Solutions', description: 'Website-use terms, service enquiries, career applications and external links at Amiro Tech Solutions.' },
  { path: '/cookie-policy', title: 'Cookies & External Services | Amiro Tech Solutions', description: 'Browser storage and external service information for the Amiro Tech Solutions website.' },
  { path: '/careers', title: 'Careers | Developer & QA Jobs | Amiro Tech Solutions', description: 'Explore 5 hybrid vacancies in Bengaluru at Amiro Tech Solutions: 2 Python Developers, 2 Full Stack Developers and 1 Software Tester / QA.' },
  { path: '/', title: 'Amiro Tech Solutions | Software Development & AI Services', description: 'Amiro Tech Solutions is a Bangalore-based software and AI company building custom applications, Voice AI, automation and cloud platforms for businesses worldwide.' },
  { path: '/services', title: 'Software, AI & Cloud Services | Amiro Tech Solutions', description: 'Explore custom software development, enterprise AI, Voice AI, workflow automation, cloud engineering and system integrations from Amiro Tech Solutions.' },
  { path: '/products', title: 'Business Software Products | Amiro Tech Solutions', description: 'Explore Amiro Tech Solutions products for inventory and compliance management, plus upcoming HR, Voice AI and business operations platforms.' },
  { path: '/about', title: 'About Amiro Tech Solutions | Software & AI Company', description: 'Meet Amiro Tech Solutions, a Bangalore-based technology partner helping businesses build practical software, AI and automation systems.' },
  { path: '/process', title: 'Our Software & AI Delivery Process | Amiro Tech Solutions', description: 'Discover how Amiro Tech Solutions takes software and AI projects from business discovery and architecture through development, deployment and ongoing support.' },
  { path: '/contact', title: 'Contact Amiro Tech Solutions | Discuss Your Project', description: 'Contact Amiro Tech Solutions at info@amirotechsolutions.com to discuss software development, AI, Voice AI, automation or a product demo.' },
]
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: office.companyName, legalName: office.companyName, alternateName: ['Amiro Tech Solutions', 'Amiro Tech'], url: `${siteUrl}/`, logo: `${siteUrl}/amiro-logo.svg`, email: 'info@amirotechsolutions.com', address: { '@type': 'PostalAddress', streetAddress: `${office.name}, ${office.street}`, addressLocality: office.city, addressRegion: office.region, postalCode: office.postalCode, addressCountry: 'IN' }, sameAs: ['https://www.linkedin.com/company/amirotechsolutions', 'https://www.instagram.com/amirotechsolutions'] },
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Amiro Tech Solutions', alternateName: ['Amiro Tech', 'amirotechsolutions.com'], url: `${siteUrl}/`, publisher: { '@id': `${siteUrl}/#organization` } },
  ],
}
