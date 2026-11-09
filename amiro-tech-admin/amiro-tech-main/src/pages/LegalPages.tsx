import type { ReactNode } from 'react'
import { Container, PageHero, Section } from '../components/common'
import { office } from '../routes/office'

type PolicySection = { title: string; content: ReactNode }
const email = <a href="mailto:info@amirotechsolutions.com">info@amirotechsolutions.com</a>

// Set to '' once the policies have been approved by legal counsel.
const policyStatus = 'Draft · Pending approval'

function PolicyPage({ title, introduction, sections }: { title: string; introduction: string; sections: PolicySection[] }) {
  return <>
    <PageHero crumb={title} eyebrow="Legal & privacy" title={title} lead={introduction}>
      <p className="status-note"><time dateTime="2026-10-07">Last updated 7 October 2026</time>{policyStatus ? <span>· {policyStatus}</span> : null}</p>
    </PageHero>
    <Section>
      <Container>
        <div className="policy">
          <nav aria-label="On this page"><p>On this page</p>{sections.map((section, index) => <a key={section.title} href={`#policy-${index + 1}`}>{section.title}</a>)}<a href="#policy-contact">Contact us</a></nav>
          <div className="policy__body">
            {sections.map((section, index) => <section key={section.title} id={`policy-${index + 1}`}><h2>{String(index + 1).padStart(2, '0')}. {section.title}</h2>{section.content}</section>)}
            <section id="policy-contact"><h2>Contact us</h2><p>Questions about this notice? Contact our team at {email}.</p><address>{office.companyName}<br />{office.name}<br />{office.street}<br />{office.city}, {office.region} {office.postalCode}, {office.country}</address></section>
            <nav className="policy-related" aria-label="Related policies"><a className="tag" href="/privacy-policy">Privacy Policy</a><a className="tag" href="/terms-and-conditions">Terms &amp; Conditions</a><a className="tag" href="/cookie-policy">Cookies &amp; External Services</a></nav>
          </div>
        </div>
      </Container>
    </Section>
  </>
}

export function PrivacyPolicyPage() {
  return <PolicyPage title="Privacy Policy" introduction="How information is handled when you contact Amiro Tech or apply for a role through this website." sections={[
    { title: 'Who we are and what this notice covers', content: <p>Amiro Tech Solutions Pvt Ltd (“Amiro Tech”, “we”, or “us”) operates this website. This notice explains information handling for website enquiries and career applications. Client projects and software products may be covered by separate privacy notices and agreements.</p> },
    { title: 'Information you share with us', content: <><ul><li><strong>Business enquiries:</strong> name, email address, optional company and phone number, service or product interests, and your message.</li><li><strong>Career applications:</strong> the resume, experience, location, availability, and project links you choose to send.</li></ul><p>Please do not include passwords, payment details, identity documents, or confidential client information.</p></> },
    { title: 'How submissions work', content: <p>When the contact form prepares an email draft, you must send it through your email service. If direct submission is enabled, the form sends the entered details to our server and then through Resend to our company inbox. Career applications open your chosen email service; clicking Apply or copying details does not submit an application or upload a resume.</p> },
    { title: 'Use of information', content: <p>Information provided in an enquiry is used to understand and respond to that request and discuss relevant services or products. Application information is used to consider the role you applied for and communicate about recruitment. A product-interest request does not automatically subscribe you to a marketing mailing list.</p> },
    { title: 'Service providers and international processing', content: <p>Hosting and email providers process information necessary to deliver their services. Following a webmail, social media, or map link brings you to a separate service governed by its own privacy notice. Depending on the provider, information may be processed outside India. Contact us with questions about the providers involved in your enquiry or application.</p> },
    { title: 'Keeping your information', content: <p>Enquiries and applications sent by email are held in email systems, including any relevant provider records or backups. Closing this website does not delete a message you have sent. To ask how long a particular record is held, or to request its deletion, contact us using the details below.</p> },
    { title: 'Sharing information safely', content: <p>Share only information relevant to your enquiry or application. If a project involves confidential or sensitive material, contact the team to agree an appropriate way to share it before sending. No method of online transmission or storage can be guaranteed completely secure.</p> },
    { title: 'Requests and concerns', content: <p>Contact {email} to ask about your information, request correction or deletion, withdraw a request, or raise a privacy concern. Include enough context to identify your enquiry without sending sensitive documents. Verification may be needed, and applicable legal or contractual obligations may affect what can be deleted. This notice does not limit rights available under applicable law.</p> },
    { title: 'Changes to this notice', content: <p>Review this page for updates when the website’s features or data-handling practices change. See also our <a href="/cookie-policy">Cookies & External Services</a> notice.</p> },
  ]} />
}

export function TermsPage() {
  return <PolicyPage title="Terms & Conditions" introduction="Website-use terms for Amiro Tech Solutions Pvt Ltd. Commercial engagements are governed by a separate agreement." sections={[
    { title: 'About these terms', content: <p>This website is operated by Amiro Tech Solutions Pvt Ltd and provides information about our company, services, products, and vacancies. These terms relate to use of the website. They do not replace a signed services agreement, employment agreement, or software licence, and do not exclude mandatory rights under applicable law.</p> },
    { title: 'Responsible use', content: <p>Use the site lawfully. Do not attempt unauthorised access, disrupt services, upload malicious material, impersonate another person, or submit information you do not have permission to share.</p> },
    { title: 'Content and intellectual property', content: <p>Website content, branding, and software may be protected by intellectual-property rights held by Amiro Tech or their respective owners. Viewing the site does not transfer those rights or grant a licence to reuse company branding, resell content, or present it as your own. Contact us to request permission.</p> },
    { title: 'Enquiries, demos, and availability', content: <p>An enquiry, demo request, waitlist request, or early-access request is not a purchase or a guarantee of availability. Product features, timelines, and service scope require confirmation. Pricing, deliverables, payment, cancellation, and refund provisions must be set out in the applicable proposal or agreement before work begins.</p> },
    { title: 'Career applications', content: <p>Submitting an application does not guarantee an interview or employment. Provide accurate information and share only material you are authorised to disclose. Vacancies and hiring requirements may change; employment terms are confirmed separately.</p> },
    { title: 'External services', content: <p>Links to email, maps, and social platforms are provided for convenience. Their availability and terms are controlled by the respective providers. Review their terms before using those services.</p> },
    { title: 'Information and availability', content: <p>Website information may contain errors or become outdated, and uninterrupted availability is not guaranteed. Confirm material details with the team before relying on them for a business decision. Nothing on this page excludes obligations or liability that cannot lawfully be excluded.</p> },
    { title: 'Privacy and questions', content: <p>Read our <a href="/privacy-policy">Privacy Policy</a> for information about enquiries and applications. Contact {email} about website issues or these terms. Project-specific disputes and obligations are addressed under the relevant agreement and applicable law.</p> },
  ]} />
}

export function CookiePolicyPage() {
  return <PolicyPage title="Cookies & External Services" introduction="A practical explanation of browser storage and links to third-party services." sections={[
    { title: 'Understanding cookies and browser storage', content: <p>Cookies are small pieces of information a service stores in your browser. Other browser storage can retain preferences or page data. External services may use these technologies independently of this website.</p> },
    { title: 'Website features', content: <p>The website’s enquiry forms and career filters do not use advertising or analytics cookies. Their selections are held temporarily while you use the page, rather than saved as form details in browser local storage. Hosting and external services may handle technical information separately, as described below.</p> },
    { title: 'Hosting and technical information', content: <p>The services delivering and protecting the website may process technical request information, including IP addresses and browser details. This is separate from the information you choose to enter in an enquiry or email. Contact us with questions about technical information associated with your visit.</p> },
    { title: 'External providers', content: <p>Opening Gmail, Outlook, Google Maps, LinkedIn, or Instagram takes you to another service. Those providers may use their own cookies or account information. Their policies govern activity on their sites; opening an application draft may pass the selected role and draft text to your email provider.</p> },
    { title: 'Your choices', content: <p>You can review, block, or remove site data through your browser settings, and choose whether to open external links. Blocking storage may affect the functionality of external services. For questions about personal information, see our <a href="/privacy-policy">Privacy Policy</a>.</p> },
  ]} />
}
