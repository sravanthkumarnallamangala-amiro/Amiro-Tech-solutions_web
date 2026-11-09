import { useEffect, useRef, useState } from 'react'
import { Button, Container, Icon } from '../common'

type NavItem = { href: string; label: string }

const primaryNav: NavItem[] = [
  { href: '/services', label: 'Services' },
  { href: '/products', label: 'Products' },
  { href: '/process', label: 'Process' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
]

export function Navbar({ activePath = '/' }: { activePath?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false)
    }
    const desktop = window.matchMedia('(min-width: 1081px)')
    const closeOnDesktop = () => {
      if (desktop.matches) setIsMenuOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    document.addEventListener('pointerdown', closeOutside)
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      document.removeEventListener('keydown', closeOnEscape)
      document.removeEventListener('pointerdown', closeOutside)
      desktop.removeEventListener('change', closeOnDesktop)
    }
  }, [isMenuOpen])

  return (
    <header className="navbar" ref={headerRef}>
      <Container>
        <nav aria-label="Primary" className="navbar__inner">
          <a className="navbar__brand" href="/" aria-label="Amiro Tech Solutions — home">
            <img className="navbar__logo" src="/amiro-logo.svg" alt="Amiro Tech Solutions" width="230" height="66" />
          </a>
          <div className="navbar__links">
            {primaryNav.map((item) => (
              <a aria-current={activePath === item.href ? 'page' : undefined} className="navbar__link" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <Button className="navbar__cta" href="/contact" size="sm">
            Contact us
          </Button>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="navbar__menu-button"
            onClick={() => setIsMenuOpen((open) => !open)}
            ref={toggleRef}
            type="button"
          >
            <Icon name={isMenuOpen ? 'close' : 'menu'} />
            Menu
          </button>
        </nav>
        <div className={['navbar__mobile', isMenuOpen ? 'navbar__mobile--open' : ''].filter(Boolean).join(' ')} id="mobile-navigation">
          {[{ href: '/', label: 'Home' }, ...primaryNav].map((item) => (
            <a
              aria-current={activePath === item.href ? 'page' : undefined}
              className="navbar__mobile-link"
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button href="/contact" size="lg">
            Contact us
          </Button>
        </div>
      </Container>
    </header>
  )
}
