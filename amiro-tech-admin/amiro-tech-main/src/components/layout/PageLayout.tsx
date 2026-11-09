import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ChatAssistant } from '../chat/ChatAssistant'
import { ProductDemoModal } from '../contact/ProductDemoModal'
import { Footer } from './Footer'
import { Navbar } from './Navbar'
import { useMotion } from './useMotion'

type PageLayoutProps = {
  activePath?: string
  children?: ReactNode
  className?: string
}

export function PageLayout({ activePath = '/', children, className }: PageLayoutProps) {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const closeDemo = useCallback(() => setIsDemoOpen(false), [])

  useEffect(() => {
    const handleDemoLink = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      if (!(event.target instanceof Element)) return

      const link = event.target.closest<HTMLAnchorElement>('a[href]')
      if (!link || link.target === '_blank') return

      const destination = new URL(link.href, window.location.href)
      if (
        destination.origin !== window.location.origin ||
        destination.pathname !== '/contact' ||
        destination.searchParams.get('type') !== 'product-demo' ||
        destination.searchParams.get('product') !== 'ims'
      ) return

      event.preventDefault()
      setIsDemoOpen(true)
    }

    document.addEventListener('click', handleDemoLink, true)
    return () => document.removeEventListener('click', handleDemoLink, true)
  }, [])

  useMotion()
  return (
    <div className={['app-shell', className].filter(Boolean).join(' ')}>
      <Navbar activePath={activePath} />
      <main className="app-shell__main" id="main-content">
        {children}
      </main>
      <Footer />
      <ChatAssistant />
      {isDemoOpen && <ProductDemoModal onClose={closeDemo} />}
    </div>
  )
}
