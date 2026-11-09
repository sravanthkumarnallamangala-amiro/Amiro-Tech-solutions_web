import { useEffect } from 'react'

const REVEAL_SELECTOR = [
  '.section-header',
  '.section-head-row > .text-link',
  '.card',
  '.case',
  '.step',
  '.steps-v__item',
  '.gov__item',
  '.tech__cell',
  '.fact',
  '.kv',
  '.cta-band',
  '.faq details',
  '.service-group__intro',
  '.lead',
  '.ui-caption',
].join(',')

/** Safety net: anything still hidden after this long is shown, whatever happens. */
const FAILSAFE_MS = 4000

/**
 * Progressive-enhancement motion:
 *  - reveals content as it scrolls into view (only elements below the fold, so nothing flashes),
 *  - cursor-following spotlight on interactive cards,
 *  - compact navbar once the page scrolls.
 *
 * Content is never left hidden: the effect is idempotent (safe under React StrictMode, which runs
 * effects twice in development), cleanup restores everything to visible, and a failsafe timer shows
 * any element that was not revealed. Disabled for prefers-reduced-motion.
 */
export function useMotion() {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hiddenByUs = new Set<HTMLElement>()
    const observers: IntersectionObserver[] = []
    const show = (el: Element) => el.setAttribute('data-reveal', 'shown')

    // Navbar state
    const header = document.querySelector<HTMLElement>('.navbar')
    const onScroll = () => header?.setAttribute('data-scrolled', String(window.scrollY > 12))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // Card spotlight
    const onPointer = (event: PointerEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const card = target.closest<HTMLElement>('.card--interactive, .case, .gov__item, .tech__cell')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }
    if (!reduce) document.addEventListener('pointermove', onPointer, { passive: true })

    let failsafe: number | undefined
    if (!reduce && 'IntersectionObserver' in window) {
      const reveal = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            show(entry.target)
            reveal.unobserve(entry.target)
          }
        },
        { rootMargin: '0px 0px -5% 0px', threshold: 0 },
      )
      observers.push(reveal)

      const fold = window.innerHeight
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR).forEach((el) => {
        if (el.getAttribute('data-reveal') === 'shown' || el.closest('.chat')) return
        if (el.getBoundingClientRect().top < fold) {
          el.removeAttribute('data-reveal') // already on screen: never hide it
          return
        }
        const siblings = el.parentElement ? Array.from(el.parentElement.children) : []
        el.style.setProperty('--reveal-delay', `${Math.min(Math.max(siblings.indexOf(el), 0), 6) * 70}ms`)
        el.setAttribute('data-reveal', 'hidden')
        hiddenByUs.add(el)
        reveal.observe(el)
      })

      // Steps connector line draws when the row appears
      document.querySelectorAll<HTMLElement>('.steps').forEach((el) => {
        if (el.getBoundingClientRect().top < fold) {
          el.setAttribute('data-drawn', 'true')
          return
        }
        const draw = new IntersectionObserver(([entry]) => {
          if (entry?.isIntersecting) {
            el.setAttribute('data-drawn', 'true')
            draw.disconnect()
          }
        })
        observers.push(draw)
        draw.observe(el)
      })

      root.setAttribute('data-motion', 'on')

      // Failsafe: reveal anything the observer missed (e.g. very tall pages, print, odd browsers)
      failsafe = window.setTimeout(() => {
        hiddenByUs.forEach((el) => {
          const rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight * 1.5) show(el)
        })
      }, FAILSAFE_MS)
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointermove', onPointer)
      window.clearTimeout(failsafe)
      observers.forEach((o) => o.disconnect())
      // Never leave content hidden after cleanup (StrictMode re-runs, route changes, HMR).
      hiddenByUs.forEach((el) => {
        if (el.getAttribute('data-reveal') === 'hidden') el.removeAttribute('data-reveal')
      })
      root.removeAttribute('data-motion')
    }
  }, [])
}
