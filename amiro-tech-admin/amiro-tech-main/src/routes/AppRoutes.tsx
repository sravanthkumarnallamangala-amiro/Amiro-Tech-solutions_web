import { lazy, Suspense, useEffect, useMemo } from 'react'
import { PageLayout } from '../components/layout'
import { PrivacyPolicyPage, TermsPage, CookiePolicyPage } from '../pages/LegalPages'
import {
  AboutPage,
  CareersPage,
  ContactPage,
  HomePage,
  ProcessPage,
  ProductsPage,
  ServicesPage,
} from '../pages'

import { pageSeo, siteUrl } from './seo'

const AdminApp = lazy(() => import('../admin/AdminApp'))

const routes = [
  { path: '/privacy-policy', Component: PrivacyPolicyPage },
  { path: '/terms-and-conditions', Component: TermsPage },
  { path: '/cookie-policy', Component: CookiePolicyPage },
  { path: '/careers', Component: CareersPage },
  { path: '/', Component: HomePage },
  { path: '/services', Component: ServicesPage },
  { path: '/products', Component: ProductsPage },
  { path: '/about', Component: AboutPage },
  { path: '/process', Component: ProcessPage },
  { path: '/contact', Component: ContactPage },
]

function setMeta(selector: string, attribute: 'content' | 'href', value: string) {
  const element = document.head.querySelector(selector)

  if (element) {
    element.setAttribute(attribute, value)
  }
}

function AdminRoute() {
  useEffect(() => {
    document.title = 'Admin | Amiro Tech Solutions'
    setMeta('meta[name="robots"]', 'content', 'noindex, nofollow')
  }, [])
  return <Suspense fallback={<p className="adm-boot" role="status">Loading…</p>}><AdminApp /></Suspense>
}

export function AppRoutes({ pathname }: { pathname?: string }) {
  const path = (pathname ?? window.location.pathname).replace(/\/+$/, '') || '/'
  if (path === '/admin' || path.startsWith('/admin/')) return <AdminRoute />
  return <SiteRoutes path={path} />
}

function SiteRoutes({ path }: { path: string }) {
  const matched = routes.find((item) => item.path === path)
  const route = useMemo(() => pageSeo.find(item => item.path === path) ?? { path, title: 'Page Not Found | Amiro Tech Solutions', description: 'The requested page could not be found.' }, [path])
  const Page = matched?.Component

  useEffect(() => {
    const canonical = `${siteUrl}${route.path}`

    document.title = route.title
    setMeta('meta[name="robots"]', 'content', matched ? 'index, follow' : 'noindex, follow')
    setMeta('meta[name="description"]', 'content', route.description)
    setMeta('meta[property="og:title"]', 'content', route.title)
    setMeta('meta[property="og:description"]', 'content', route.description)
    setMeta('meta[property="og:url"]', 'content', canonical)
    setMeta('meta[name="twitter:title"]', 'content', route.title)
    setMeta('meta[name="twitter:description"]', 'content', route.description)
    setMeta('link[rel="canonical"]', 'href', canonical)
  }, [route, matched])

  return (
    <PageLayout activePath={route.path}>
      {Page ? <Page /> : <section className="container not-found"><p className="eyebrow">Error 404</p><h1>Page not found</h1><p className="muted">This page may have moved or no longer exists.</p><a className="button" href="/">Return to home</a></section>}
    </PageLayout>
  )
}
