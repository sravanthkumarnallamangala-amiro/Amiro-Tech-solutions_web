import { useCallback, useEffect, useState } from 'react'
import '../styles/admin.css'
import { api, ApiError, type AdminUser } from './api'
import { AdminsPage } from './AdminsPage'
import { DashboardPage } from './DashboardPage'
import { JobsPage } from './JobsPage'
import { LoginPage } from './LoginPage'
import { ToastProvider } from './ui'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: '▦', title: 'Dashboard' },
  { to: '/admin/jobs', label: 'Jobs', icon: '✦', title: 'Job postings' },
  { to: '/admin/admins', label: 'Administrators', icon: '◉', title: 'Administrators' },
]

const clean = () => window.location.pathname.replace(/\/+$/, '') || '/admin'

export default function AdminApp() {
  const [path, setPath] = useState(clean)
  const [me, setMe] = useState<AdminUser | null | undefined>(undefined)
  const [problem, setProblem] = useState('')
  const [menu, setMenu] = useState(false)

  const navigate = useCallback((to: string) => {
    window.history.pushState({}, '', to)
    setPath(to.split('?')[0].replace(/\/+$/, '') || '/admin')
    setMenu(false)
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const onPop = () => setPath(clean())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    let live = true
    api<{ admin: AdminUser }>('me').then(
      (data) => { if (live) setMe(data.admin) },
      (reason: ApiError) => { if (live) { setMe(null); if (reason.status !== 401) setProblem(reason.message) } },
    )
    return () => { live = false }
  }, [])

  async function logout() {
    await api('logout', { method: 'POST' }).catch(() => {})
    setMe(null)
    navigate('/admin/login')
  }

  if (me === undefined) return <p className="adm-boot" role="status">Loading…</p>

  if (!me) {
    if (path !== '/admin/login') queueMicrotask(() => navigate('/admin/login'))
    return <ToastProvider><LoginPage onLoggedIn={(admin) => { setMe(admin); navigate('/admin') }} />{problem && <p className="adm-alert adm-alert--float" role="alert">{problem}</p>}</ToastProvider>
  }

  const current = nav.find((item) => item.to === path) ?? nav[0]
  if (path === '/admin/login') queueMicrotask(() => navigate('/admin'))

  return (
    <ToastProvider>
      <div className="adm-shell">
        <a className="adm-skip" href="#adm-main">Skip to content</a>
        <aside className={`adm-side${menu ? ' is-open' : ''}`}>
          <a className="adm-side__brand" href="/"><img alt="Amiro Tech Solutions" height="44" src="/amiro-logo.svg" width="153" /></a>
          <nav aria-label="Admin">
            {nav.map((item) => (
              <a aria-current={item.to === current.to ? 'page' : undefined} href={item.to} key={item.to} onClick={(event) => { event.preventDefault(); navigate(item.to) }}>
                <span aria-hidden="true">{item.icon}</span>{item.label}
              </a>
            ))}
          </nav>
          <div className="adm-side__foot" aria-label="Public pages">
            <p className="adm-side__foot-title">Public pages</p>
            <a href="/" rel="noopener noreferrer" target="_blank">
              <span>View website</span><span aria-hidden="true">↗</span>
            </a>
            <a href="/careers" rel="noopener noreferrer" target="_blank">
              <span>View careers</span><span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
        {menu && <button aria-label="Close menu" className="adm-scrim" onClick={() => setMenu(false)} type="button" />}
        <div className="adm-main">
          <header className="adm-top">
            <button aria-expanded={menu} aria-label="Open menu" className="adm-icon-btn adm-burger" onClick={() => setMenu(!menu)} type="button">☰</button>
            <h1>{current.title}</h1>
            <div className="adm-user">
              <span><strong>{me.name}</strong><small>{me.email}</small></span>
              <button className="adm-btn adm-btn--sm" onClick={logout} type="button">Sign out</button>
            </div>
          </header>
          <main id="adm-main">
            {current.to === '/admin' && <DashboardPage navigate={navigate} />}
            {current.to === '/admin/jobs' && <JobsPage />}
            {current.to === '/admin/admins' && <AdminsPage me={me} />}
          </main>
        </div>
      </div>
    </ToastProvider>
  )
}
