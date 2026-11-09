# Responsive audit — 5 September 2026

Audited all seven registered routes: Home, Services, Products, About, Contact, Process, and Case Studies. There are no separately registered individual product/service routes.

## Changes

- Added `src/styles/responsive.css`, loaded after the existing stylesheet. Most changes apply below 768px, with tablet layout fixes through 1024px.
- Reflowed mobile architecture, product ecosystem, inquiry, and dashboard previews into readable rows. Fixed the Contact response-card overlap.
- Improved mobile typography, stacked actions, safe email wrapping, input sizing, footer links, card grids, and preview labels.
- Added mobile menu Escape handling with focus restoration, outside-pointer dismissal, link dismissal, and automatic closing at desktop width.
- Simplified decorative mobile particles and honored reduced motion.
- Corrected existing intrinsic text overflow on desktop: Process/Case Studies hero wrapping, Process card word wrapping, and Services final CTA wrapping. Desktop font sizes and brand tokens were retained.

## Verification

Used local Chrome through temporary Playwright tooling; no runtime or project dependency was added.

Tested every route at 320, 360, 375, 390, 412, 430, 480, 768, 820, 1024, 1280, 1366, 1440, 1600, and 1920px (105 combinations). The final matrix returned no document horizontal overflow or overflow in the checked headings, paragraphs, buttons, links, and form controls. Additional narrow-screen checks covered visual labels; capability-list pseudo-element separators intentionally extend into their inter-item gaps.

Captured full-page mobile/desktop screenshots and section screenshots. Compared desktop heading font sizes, line heights, and geometry with the responsive stylesheet enabled and disabled. Geometry changes were associated with the documented overflow repairs and static reduced-motion states.

Interaction checks passed: mobile menu open/close, five links, Escape/focus restoration, outside dismissal, portrait/landscape/portrait resizing, Contact requirement selection, invalid and valid form states, 16px input font, reduced-motion static state, and scrolling all seven routes. No inquiry was submitted.

Production build and whitespace checks passed. Verification used browser viewport emulation, not physical iOS/Android devices; device-specific Safari behavior and production network performance were not measured.
