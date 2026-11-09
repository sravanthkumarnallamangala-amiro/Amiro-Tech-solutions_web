import { type FormEvent, useEffect, useMemo, useState } from 'react'

import { Button, Card, Container, Icon, Section, SectionHeader } from '../components/common'
import { office } from '../routes/office'

const requirementTypes = [
  'Custom Software',
  'AI Solution',
  'Voice AI',
  'Document AI & IDP',
  'AI Agent',
  'Automation',
  'Product Demo',
  'Product Waitlist',
  'Early Access',
  'Consultation',
  'Cloud & Platform Engineering',
  'SaaS Platform',
  'Dashboard & Reporting',
  'System Integration',
  'Website',
  'Other',
]

const productInterests = [
  'Not Applicable',
  'IMS for NDT Labs',
  'HR Management System',
  'Voice AI Agent',
  'Business Operations Platform',
  'Other',
]

const quickInquiryTypes = ['Custom Software', 'AI Solution', 'Voice AI', 'Product Demo', 'Automation']

const contactAssurances = [
  { icon: 'clock' as const, title: 'Clear next steps', detail: 'Know what happens after you reach out.' },
  { icon: 'users' as const, title: 'Expert consultation', detail: 'Talk through your goals with our team.' },
  { icon: 'sparkle' as const, title: 'Tailored solutions', detail: 'Recommendations shaped around your needs.' },
  { icon: 'shield' as const, title: 'Trusted partnership', detail: 'A practical partner from idea to delivery.' },
]

const faqs = [
  {
    answer: 'Most projects begin with a focused discovery conversation and a clear next-step plan.',
    question: 'How does a project usually start?',
  },
  {
    answer: 'Yes. We can work from an existing workflow, spreadsheet, tool, or business challenge.',
    question: 'Can you help define the requirements?',
  },
  {
    answer: 'Yes. We build practical AI, Voice AI, automation, and software systems around real operations.',
    question: 'Do you build AI and automation systems?',
  },
  {
    answer: 'Yes. We work with clients in India and internationally, both remotely and in person.',
    question: 'Do you work with clients outside India?',
  },
  {
    answer: 'Please do not send passwords, payment details or confidential data through this form. If your project involves sensitive material, mention it and we will agree a secure way to share it.',
    question: 'What should I avoid sharing in the form?',
  },
]

export function ContactPage() {
  const [requirementType, setRequirementType] = useState('')
  const [productInterest, setProductInterest] = useState('Not Applicable')
  const [emailDraftOpened, setEmailDraftOpened] = useState(false)
  const [delivery, setDelivery] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const directSubmission = import.meta.env.VITE_CONTACT_DIRECT === 'true'

  useEffect(() => {
    const query = new URLSearchParams(window.location.search)
    const products: Record<string, string> = { ims: 'IMS for NDT Labs', hr: 'HR Management System', 'voice-ai': 'Voice AI Agent', 'business-ops': 'Business Operations Platform' }
    const intents: Record<string, string> = { 'product-demo': 'Product Demo', waitlist: 'Product Waitlist', 'early-access': 'Early Access', consultation: 'Consultation', 'product-enquiry': 'Other', 'ai-solution': 'AI Solution', 'voice-ai': 'Voice AI', 'document-ai': 'Document AI & IDP', 'ai-agent': 'AI Agent' }
    const service = query.get('service') ?? ''
    // Static HTML has no query string; apply browser-only defaults after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRequirementType(requirementTypes.includes(service) ? service : intents[query.get('type') ?? ''] ?? '')
    setProductInterest(products[query.get('product') ?? ''] ?? 'Not Applicable')
  }, [])

  const nextStepRecommendation = useMemo(() => {
    if (['Product Waitlist', 'Early Access'].includes(requirementType)) {
      return 'Send an interest request to our team. We will confirm availability and next steps; this does not automatically enroll you in a mailing list.'
    }
    if (productInterest === 'Other') {
      return 'Tell us which product or capability you have in mind in the project details below.'
    }
    if (requirementType === 'Product Demo') {
      return 'We will prepare a focused product demo conversation around your selected product.'
    }

    if (['AI Solution', 'Voice AI', 'Document AI & IDP', 'AI Agent'].includes(requirementType)) {
      return 'We will map the AI use case, data flow, human handoff, and safest first implementation.'
    }

    if (['Automation', 'System Integration', 'Dashboard & Reporting'].includes(requirementType)) {
      return 'We will review the current workflow, tools, data sources, and automation opportunities.'
    }

    if (requirementType === 'Custom Software' || requirementType === 'SaaS Platform') {
      return 'We will clarify users, workflows, scope, architecture, and the best build path.'
    }

    return 'Choose a quick inquiry type or describe your requirement, and we will recommend the clearest next step.'
  }, [productInterest, requirementType])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (delivery === 'sending') return

    const formData = new FormData(event.currentTarget)
    const inquiry = {
      company: String(formData.get('company') ?? ''),
      email: String(formData.get('email') ?? ''),
      message: String(formData.get('message') ?? ''),
      name: String(formData.get('name') ?? ''),
      phone: String(formData.get('phone') ?? ''),
      productInterest: String(formData.get('productInterest') ?? ''),
      requirementType: String(formData.get('requirementType') ?? ''),
      website: String(formData.get('website') ?? ''),
    }

    if (directSubmission) {
      setDelivery('sending')
      try {
        const response = await fetch('/api/contact', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiry), signal: AbortSignal.timeout(20000),
        })
        const result = await response.json()
        if (!response.ok || result.accepted !== true) throw new Error('Submission not accepted')
        setDelivery('sent')
      } catch {
        setDelivery('error')
      }
      return
    }

    const body = [
      `Name: ${inquiry.name}`,
      `Company: ${inquiry.company}`,
      `Email: ${inquiry.email}`,
      `Phone: ${inquiry.phone}`,
      `Requirement Type: ${inquiry.requirementType}`,
      `Product Interest: ${inquiry.productInterest}`,
      '',
      'Message:',
      inquiry.message,
    ].join('\n')

    setEmailDraftOpened(true)
    window.location.href = `mailto:info@amirotechsolutions.com?subject=${encodeURIComponent(
      'New Website Inquiry',
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <section className="page-hero contact-hero" id="contact-form">
        <div className="contact-hero__map" aria-hidden="true" />
        <Container>
          <div className="contact-hero__inner">
            <div className="contact-hero__copy">
              <nav aria-label="Breadcrumb" className="crumbs">
                <a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">Contact</span>
              </nav>
              <p className="eyebrow hero__fade">Contact</p>
              <h1 className="hero__fade" style={{ ['--d' as string]: '100ms' }}>Tell us what you need to <em>build.</em></h1>
              <p className="page-hero__lead hero__fade" style={{ ['--d' as string]: '220ms' }}>
                Share your business challenge, software requirement, AI initiative or the product you would like to explore. We will recommend a clear next step.
              </p>
              <div className="contact-details">
                <a className="contact-detail" href="mailto:info@amirotechsolutions.com">
                  <span className="contact-detail__icon"><Icon name="mail" /></span>
                  <span><small>Email</small><strong>info@amirotechsolutions.com</strong></span>
                </a>
                <a className="contact-detail" href={office.mapUrl} target="_blank" rel="noopener noreferrer" id="office-location">
                  <span className="contact-detail__icon"><Icon name="pin" /></span>
                  <span><small>Our office</small><strong>{office.city}, {office.country}</strong></span>
                </a>
                <div className="contact-detail">
                  <span className="contact-detail__icon"><Icon name="globe" /></span>
                  <span><small>Coverage</small><strong>India &amp; international</strong></span>
                </div>
              </div>
              <p className="contact-hero__address">
                <strong>{office.companyName}</strong><br />
                {office.name}, {office.street}, {office.city}, {office.region} – {office.postalCode}, {office.country}
                {' · '}<a href={office.mapUrl} target="_blank" rel="noopener noreferrer">View on Google Maps <Icon name="external" /></a>
              </p>
            </div>

            <Card className="contact-form-panel" padding="spacious">
              <form className="form" onSubmit={handleSubmit}>
                <div hidden aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="form__head">
                  <span className="contact-form-panel__icon"><Icon name="mail" /></span>
                  <div><h2>Get in Touch</h2>
                  <p>A few details are enough to start. Fields marked * are required.</p>
                  </div>
                </div>
                <div className="field" role="group" aria-label="Quick inquiry choices">
                  <span>What is it about?</span>
                  <div className="chips">
                    {quickInquiryTypes.map((type) => (
                      <button aria-pressed={requirementType === type} className="chip" key={type} onClick={() => setRequirementType(type)} type="button">
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form__grid">
                  <label className="field">Name *<input autoComplete="name" name="name" placeholder="Your name" required type="text" /></label>
                  <label className="field"><span>Company <small>(optional)</small></span><input autoComplete="organization" name="company" placeholder="Company name" type="text" /></label>
                  <label className="field">Work email *<input autoComplete="email" name="email" placeholder="you@company.com" required type="email" /></label>
                  <label className="field"><span>Phone <small>(optional)</small></span><input autoComplete="tel" name="phone" placeholder="Phone number" type="tel" /></label>
                  <label className="field">
                    How can we help? *
                    <select name="requirementType" onChange={(event) => setRequirementType(event.target.value)} required value={requirementType}>
                      <option disabled value="">Select a requirement</option>
                      {requirementTypes.map((type) => <option key={type}>{type}</option>)}
                    </select>
                  </label>
                  <label className="field">
                    <span>Product interest <small>(optional)</small></span>
                    <select name="productInterest" onChange={(event) => setProductInterest(event.target.value)} value={productInterest}>
                      {productInterests.map((product) => <option key={product}>{product}</option>)}
                    </select>
                  </label>
                </div>
                <label className="field">
                  Project details *
                  <textarea name="message" placeholder="Describe the business challenge, current workflow, timeline or product interest." required rows={6} />
                </label>
                <div className="form__insight" aria-live="polite">
                  <Icon name="info" />
                  <p><b>Recommended next step</b>{nextStepRecommendation}</p>
                </div>
                <div className="actions">
                  <Button size="lg" type="submit" disabled={delivery === 'sending' || delivery === 'sent'}>
                    {delivery === 'sending' ? 'Sending…' : delivery === 'sent' ? 'Request submitted' : directSubmission ? 'Send enquiry' : 'Prepare email enquiry'}
                    {delivery === 'idle' ? <Icon name="arrow" /> : null}
                  </Button>
                  <a className="text-link" href="mailto:info@amirotechsolutions.com">Or email us directly</a>
                </div>
                <p className="form__note" role="status">
                  {directSubmission
                    ? delivery === 'sent' ? 'Your enquiry was accepted for email delivery. Our team will review your request.' : delivery === 'error' ? 'We could not confirm submission. Your details are still here. Please email us directly if you need help.' : 'Your enquiry will be emailed to our team when you select Send enquiry.'
                    : emailDraftOpened
                    ? 'Your email app should open with your enquiry. Please send the email there to complete your request. If nothing opens, email info@amirotechsolutions.com directly; your details remain in this form.'
                    : 'This opens a pre-filled draft in your email app. Review and send it to complete your enquiry — nothing is sent automatically.'}
                </p>
                <details className="form__privacy" id="enquiry-privacy">
                  <summary>How your enquiry details are used</summary>
                  <p>This form prepares or sends your contact details and message to Amiro Tech Solutions Pvt Ltd to respond to your enquiry. Direct submissions pass through our email delivery provider. Please do not include passwords, payment information, or confidential project data. For questions about your information, contact <a href="mailto:info@amirotechsolutions.com">info@amirotechsolutions.com</a>.</p>
                  <p>Read our <a href="/privacy-policy">Privacy Policy</a> and <a href="/terms-and-conditions">website terms</a>.</p>
                </details>
              </form>
            </Card>
          </div>
          <ul className="contact-assurances" aria-label="What you can expect">
            {contactAssurances.map((item) => (
              <li className="contact-assurances__item" key={item.title}>
                <Icon name={item.icon} />
                <span><strong>{item.title}</strong><small>{item.detail}</small></span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="split">
            <SectionHeader eyebrow="FAQ" title="Common questions." />
            <div className="faq">
              {faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
