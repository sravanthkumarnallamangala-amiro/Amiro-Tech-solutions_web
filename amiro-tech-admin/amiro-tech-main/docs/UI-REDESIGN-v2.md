# Amiro Tech — UI Redesign v2.2 (Audit-ready, dark theme, motion + AI chat)

> **v2.2 fixes (3 Nov 2026):**
> 1. *Blank content in `npm run dev`* — the scroll-reveal effect hid sections and, because React StrictMode runs effects twice in development, never showed them again. Rewritten (`useMotion.ts`): safe to run twice, cleanup always restores visibility, plus a 4-second failsafe.
> 2. *About / Careers not clickable on shorter screens* — the invisible chat wrapper overlapped the navbar. The wrapper now ignores clicks; only the button and the open panel are interactive.
> 3. *Black screen when the zip was extracted over the old project* — old `components/visuals/index.ts` shadowed the new file. Graphics moved to `components/graphics/SiteGraphics.tsx`, so leftover files can no longer clash.
> Verified on dev server, production build and "extracted over old folder", at 1920×1080, 1366×640, 1280×600 and 390×844, on all 9 pages.
>
> **v2.1 update:** Restored the original Amiro dark background (`#0B0B0D`, gold `#E7A300`/`#F4B400`, cyan `#3BC9DB`), added a motion layer and the **Amiro Assistant** AI chat. See sections 7–8.

**Date:** 3 November 2026  
**Scope:** All public pages (Home, Services, Products, Case Study, Process, About, Careers, Contact, Legal ×3, 404)  
**Preview images:** `design-preview/` (desktop 1440px and mobile 390px, full page)

---

## 1. Review findings (v1)

| # | Finding | Risk for audit / clients | Fixed in v2 |
|---|---------|--------------------------|-------------|
| 1 | Unverifiable marketing figures: "50+ Projects", "10X Productivity", "24/7 AI", "98% inventory accuracy", "Response within 24 Hours", invented dashboard numbers (2,847 items, 95% accuracy) | **High** — claims that can't be supported by evidence | Removed. All claims are now qualitative or factual. Mock UI is labelled "Illustrative interface — no client data shown." |
| 2 | Case Study and Process pages were not in the main navigation | Medium — key proof pages hard to find | Added to primary nav and footer |
| 3 | Home page ~8,300px (desktop) / ~17,900px (mobile), three overlapping "process/workflow" sections | Medium — diluted message | Reduced to 8 focused sections, each with one job |
| 4 | Inconsistent section widths, heading sizes, card styles, and glow effects page to page | Medium — looks unfinished | One design system, one container width, one type scale |
| 5 | 7 stylesheets / ~14,600 lines of layered overrides (371 KB CSS) | Medium — hard to maintain | 1 stylesheet, ~600 lines (≈34 KB CSS, ‑91%) |
| 6 | Fonts loaded from system only; no explicit typography | Low | Self-hosted Inter, Manrope, JetBrains Mono (no third‑party font requests — consistent with the Cookie policy) |
| 7 | Legal pages publicly show "Draft · Pending approval" | **High** — visible to clients and auditors | Kept (truthful). **Action for owner:** obtain legal sign-off, then set `policyStatus = ''` in `src/pages/LegalPages.tsx` |
| 8 | Mobile hero showed two duplicate pagination rows; contact info appeared above the form | Low | Fixed; form appears first on mobile |
| 9 | No skip-to-content link | Low (accessibility) | Skip link added |

## 2. Information architecture & user flow

```
Primary nav:  Services · Products · Case Study · Process · About · Careers · [Contact us]

Home ─┬─ Services ──────────────┐
      ├─ Case study (proof) ────┤
      ├─ Process (how we work) ─┼──▶ Contact (enquiry form → recommended next step → email)
      ├─ Products ──────────────┤
      └─ CTA band ──────────────┘
Every page ends with the same CTA band → Contact
```

**Home page story (top → bottom):**
1. Hero — who we are, what we do, one primary action (Book a consultation)
2. Company facts — registered entity, HQ, engagement model, product status
3. Three practices — Product & Platform Engineering · Intelligence & Automation · Integration & Insight
4. Featured case study — Scientech Services (qualitative outcomes)
5. Delivery process — 5 stages
6. Engagement standards — documented scope, scheduled reviews, testing before release, clear handover
7. Products — 1 available, 3 in development
8. Technology → CTA

**Inner pages** share one template: breadcrumb → eyebrow → H1 → lead → actions → optional fact panel.

## 3. Design system

| Token | Value |
|-------|-------|
| Brand gold | `#F4B400` / `#E7A300` (original) |
| Accent cyan | `#3BC9DB` (original) |
| Background | `#0B0B0D` (original) · soft sections `#0E1014` · footer `#070708` |
| Text / muted | `#F8F8F8` / `#8E9097` |
| Lines | `rgba(255,255,255,.08)` / `.16` |
| Display font | Manrope 700 |
| Body font | Inter 400–600 |
| Labels | JetBrains Mono, uppercase, 11–12px |
| Container | 1200px + 24px gutters (16px mobile) |
| Section spacing | 104 / 88 / 64px (desktop / tablet / mobile) |
| Radius | 6 / 10 / 16px |

Components: Button (primary/secondary/ghost × sm/md/lg), Card, Tag, Badge, PageHero, SectionHeader, CtaBand, Steps, Icon set (inline SVG), form fields.

## 4. Unchanged (by design)

- Contact form logic (mailto draft / direct `/api/contact` via Resend), honeypot, query-string pre-selection
- Careers filters and apply flow (Gmail / Outlook / copy details)
- Legal text, SEO metadata, structured data, sitemap, robots, prerendering
- `api/contact.js`

## 5. Checks run

- `tsc -b` — pass
- `eslint .` — 0 errors, 0 warnings
- `vite build` + prerender — 11 pages + 404
- `npm run test:seo` — pass (unique titles, canonical URLs, one H1 per page, schema, sitemap)

## 6. Owner actions before the audit

1. **Legal sign-off** on Privacy, Terms and Cookie pages → remove "Draft · Pending approval".
2. **Client permission** to name Scientech Services publicly (case study), ideally in writing.
3. If you want to show metrics (e.g. accuracy %, project count), keep the evidence on file first, then add them to `src/data/site.ts`.
4. Confirm product statuses ("Available" / "In development") are current.


## 7. Motion layer (v2.1)

All animation respects the visitor's **reduced-motion** setting (it switches off completely) and never hides content that is already on screen, so nothing flashes on load.

| Where | Animation |
|-------|-----------|
| Hero | Headline lines fade up in sequence; gold gradient shimmer on the key phrase; slow-drifting gold/cyan light orbs; animated grid |
| Architecture diagram | A gold data "beam" travels through the layers; nodes light up in sequence; live status pulse |
| Capabilities ticker | Continuous scrolling strip of services (pauses on hover) |
| Scroll | Sections, cards and steps reveal with a staggered fade-up as they enter the screen |
| Process steps | Connector line draws across; the first step pulses |
| Cards | Cursor-following gold spotlight, lift on hover, icon tilt |
| Buttons | Light sweep on the main CTA; arrow nudge on hover |
| Navbar | Deepens and gains shadow after scrolling |

Code: `src/components/layout/useMotion.ts` and the "Motion layer" section of `src/styles/site.css`.  
Demo video: `design-preview/amiro-ui-animation-demo.mp4`.

## 8. Amiro Assistant (AI chat)

A floating **"Ask Amiro AI"** button on every page opens a chat panel. Visitors can ask about services, products, process, technology, pricing approach, careers, office location and contact details. Answers include links to the right page.

**Answer modes**

| Mode | When | How it answers |
|------|------|----------------|
| Live AI | When `ANTHROPIC_API_KEY` is configured | Sends the conversation to `/api/chat`, which generates a tailored response grounded in the approved company facts |
| Catalog fallback | If AI is not configured or unavailable | Shows an explicit notice and provides the closest matching answer from the approved local knowledge base |

**Enable live AI**

For local development, add the key to your ignored `.env.local` file:
```
ANTHROPIC_API_KEY=<your key from console.anthropic.com>
CHAT_MODEL=claude-haiku-5-5
```

For deployment, set `ANTHROPIC_API_KEY` in Vercel → Project → Settings → Environment Variables, then redeploy. `CHAT_MODEL` is optional and defaults to `claude-haiku-5-5`. Never use a `VITE_` prefix for the API key; it must remain server-side. Add a rate-limit rule for `/api/chat` in Vercel (same as `/api/contact`).

The chat checks `/api/chat` to show whether live AI is connected. Local development origins on ports 5173 are allowed outside production.

**Updating what the assistant knows:** edit `src/data/company-knowledge.js`. The same file feeds both modes, so answers stay consistent.

**Safeguards:** the AI is instructed to answer only from the approved facts, never invent numbers, prices, clients or certifications, and to redirect to `info@amirotechsolutions.com` when unsure. Requests are limited to 12 messages × 1,000 characters, accepted only from the company's domains, and the panel tells visitors not to share confidential information. No chat history is stored by the website.

**Audit note:** add a line to the Privacy Policy about the chat assistant (and the AI provider, if AI mode is enabled) before go-live.
