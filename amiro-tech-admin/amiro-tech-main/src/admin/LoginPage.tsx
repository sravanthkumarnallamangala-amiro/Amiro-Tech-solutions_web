import { useState, type FormEvent } from 'react'
import { api, ApiError, type AdminUser } from './api'

export function LoginPage({ onLoggedIn }: { onLoggedIn: (admin: AdminUser) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [unconfigured, setUnconfigured] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const { admin } = await api<{ admin: AdminUser }>('login', { method: 'POST', body: { email, password } })
      onLoggedIn(admin)
    } catch (reason) {
      const failure = reason as ApiError
      setError(failure.message)
      if (failure.configured === false) setUnconfigured(true)
      setPassword('')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login__panel">
        <a className="adm-login__brand" href="/"><img alt="Amiro Tech Solutions" height="51" src="/amiro-logo.svg" width="176" /></a>
        <p className="adm-eyebrow">Administrator access</p>
        <h1>Sign in to the admin console</h1>
        <p className="adm-muted">Manage job openings and administrators for amirotechsolutions.com.</p>
        <form className="adm-form" onSubmit={submit}>
          <label className="adm-field">Email
            <input autoComplete="username" autoFocus inputMode="email" onChange={(event) => setEmail(event.target.value)} required type="email" value={email} />
          </label>
          <label className="adm-field">Password
            <span className="adm-password">
              <input autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} required type={show ? 'text' : 'password'} value={password} />
              <button aria-label={show ? 'Hide password' : 'Show password'} aria-pressed={show} onClick={() => setShow(!show)} type="button">{show ? 'Hide' : 'Show'}</button>
            </span>
          </label>
          {error && <p className="adm-alert" role="alert">{error}</p>}
          <button className="adm-btn adm-btn--primary adm-btn--block" disabled={busy || unconfigured} type="submit">{busy ? 'Signing in…' : 'Sign in'}</button>
        </form>
        {import.meta.env.DEV && <p className="adm-hint">Development only — default login: <code>admin@amirotech.local</code> / <code>Admin@12345</code>. Set <code>ADMIN_EMAIL</code> and <code>ADMIN_PASSWORD</code> in <code>.env.local</code> to change it.</p>}
        <a className="adm-back" href="/">← Back to website</a>
      </div>
      <aside className="adm-login__aside" aria-hidden="true">
        <div>
          <p className="adm-eyebrow">Amiro Admin</p>
          <h2>Run hiring and operations from one place.</h2>
          <ul>
            <li>Post a job — it appears on the Careers page instantly</li>
            <li>Add teammates as administrators</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}
