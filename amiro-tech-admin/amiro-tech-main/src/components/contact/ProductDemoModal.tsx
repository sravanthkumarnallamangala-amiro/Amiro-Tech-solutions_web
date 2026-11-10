import { type FormEvent, useEffect, useRef, useState } from 'react'
import { Icon } from '../common'

type ProductDemoModalProps = {
  onClose: () => void
}

const industries = ['Manufacturing', 'Engineering', 'NDT / Inspection', 'Healthcare', 'Technology', 'Other']
const imsDemoUrl = import.meta.env.VITE_IMS_DEMO_URL || 'http://localhost:8000/?demo=1'

export function ProductDemoModal({ onClose }: ProductDemoModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [delivery, setDelivery] = useState<'idle' | 'sending' | 'error'>('idle')
  const directSubmission = import.meta.env.VITE_CONTACT_DIRECT === 'true'

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)',
      )]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus()
    }
  }, [onClose])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (delivery === 'sending') return

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim()
    const company = String(formData.get('company') ?? '').trim()
    const address = String(formData.get('address') ?? '').trim()
    const phone = String(formData.get('phone') ?? '').trim()
    const industry = String(formData.get('industry') ?? '').trim()
    const requirements = String(formData.get('requirements') ?? '').trim()

    const openDemoPortal = () => {
      const destination = new URL(imsDemoUrl, window.location.href)
      destination.searchParams.set('demo', '1')
      if (name) destination.searchParams.set('name', name)
      if (email) destination.searchParams.set('email', email)
      if (company) destination.searchParams.set('company', company)
      if (address) destination.searchParams.set('address', address)
      if (phone) destination.searchParams.set('phone', phone)
      if (industry) destination.searchParams.set('industry', industry)
      if (requirements) destination.searchParams.set('requirements', requirements)

      try {
        localStorage.setItem('amiro_demo_client_details', JSON.stringify({
          name, email, company, address, phone, industry, requirements
        }))
      } catch (_) {}

      window.location.assign(destination.toString())
    }

    const details = [
      `Location address: ${address || 'Not provided'}`,
      `Industry: ${industry || 'Not specified'}`,
      '',
      'Project requirements:',
      requirements || 'Not provided',
    ].join('\n')
    const inquiry = {
      name,
      email,
      company,
      phone,
      requirementType: 'Product Demo',
      productInterest: 'IMS for NDT Labs',
      message: details,
      website: String(formData.get('website') ?? ''),
    }

    if (directSubmission) {
      setDelivery('sending')
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiry),
          signal: AbortSignal.timeout(20000),
        })
        const result = await response.json()
        if (!response.ok || result.accepted !== true) throw new Error('Demo request was not accepted')
        openDemoPortal()
      } catch {
        setDelivery('error')
        dialogRef.current?.querySelector<HTMLElement>('[role="alert"]')?.focus()
      }
      return
    }

    openDemoPortal()
  }

  return (
    <div
      className="ims-demo-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        aria-labelledby="ims-demo-title"
        aria-modal="true"
        className="ims-demo-dialog"
        ref={dialogRef}
        role="dialog"
        tabIndex={-1}
      >
        <aside className="ims-demo-aside">
          <div className="ims-demo-art" aria-hidden="true">
            <span className="ims-demo-art__orbit" />
            <span className="ims-demo-art__tile ims-demo-art__tile--chart"><Icon name="chart" /></span>
            <span className="ims-demo-art__tile ims-demo-art__tile--users"><Icon name="users" /></span>
            <span className="ims-demo-art__tile ims-demo-art__tile--flow"><Icon name="flow" /></span>
            <span className="ims-demo-art__laptop"><Icon name="database" /><strong>IMS</strong></span>
          </div>
          <h2 id="ims-demo-title">Request Your <em>IMS Demo</em></h2>
          <p>Share your details and discover how Amiro Tech can streamline your business with intelligent solutions.</p>
          <ul>
            <li><Icon name="check" /> Personalized Demo</li>
            <li><Icon name="check" /> Tailored Solutions</li>
            <li><Icon name="check" /> Expert Guidance</li>
          </ul>
        </aside>

        <section className="ims-demo-form-panel" aria-label="Client details form">
          <button aria-label="Close demo request" className="ims-demo-close" onClick={onClose} ref={closeRef} type="button">
            <Icon name="close" />
          </button>
          <header className="ims-demo-heading">
            <Icon name="users" />
            <div>
              <h3>Client <em>Details</em></h3>
              <p>Please provide your information to access the IMS demo.</p>
            </div>
          </header>
          <form className="ims-demo-form" onSubmit={handleSubmit}>
            <div aria-hidden="true" className="ims-demo-honeypot">
              <label>Leave empty<input autoComplete="off" name="website" tabIndex={-1} /></label>
            </div>
            <label className="ims-demo-field">
              <Icon name="users" />
              <span className="sr-only">Client name *</span>
              <input autoComplete="name" name="name" placeholder="Client Name *" required />
            </label>
            <label className="ims-demo-field">
              <Icon name="mail" />
              <span className="sr-only">Client email *</span>
              <input autoComplete="email" name="email" placeholder="Client Email *" required type="email" />
            </label>
            <label className="ims-demo-field">
              <Icon name="briefcase" />
              <span className="sr-only">Company name *</span>
              <input autoComplete="organization" name="company" placeholder="Company Name *" required />
            </label>
            <label className="ims-demo-field">
              <Icon name="pin" />
              <span className="sr-only">Location address (optional)</span>
              <input autoComplete="street-address" name="address" placeholder="Location Address (Optional)" />
            </label>
            <label className="ims-demo-field">
              <Icon name="phone" />
              <span className="sr-only">Contact number *</span>
              <input autoComplete="tel" name="phone" placeholder="Contact Number *" required type="tel" />
            </label>
            <label className="ims-demo-field">
              <Icon name="briefcase" />
              <span className="sr-only">Industry *</span>
              <select aria-label="Industry" defaultValue="" name="industry" required>
                <option disabled value="">Industry</option>
                {industries.map((industry) => <option key={industry}>{industry}</option>)}
              </select>
            </label>
            <label className="ims-demo-field ims-demo-field--textarea">
              <Icon name="doc" />
              <span className="sr-only">Project requirements (optional)</span>
              <textarea name="requirements" placeholder="Project Requirements (Optional)&#10;Tell us about your IMS requirements..." rows={3} />
            </label>
            {delivery === 'error' && (
              <p className="ims-demo-error" role="alert" tabIndex={-1}>We couldn’t submit the request. Please try again or email us at info@amirotechsolutions.com.</p>
            )}
            <button className="ims-demo-submit" disabled={delivery === 'sending'} type="submit">
              {delivery === 'sending' ? 'Sending…' : 'Open IMS Demo'} <Icon name="arrow" />
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}
