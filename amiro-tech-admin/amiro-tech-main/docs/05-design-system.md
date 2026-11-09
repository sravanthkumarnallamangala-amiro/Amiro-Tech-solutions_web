# Amiro Tech Solutions — Design System Specification

## 1. Design System Purpose

The Amiro Tech design system exists to create a single, consistent foundation for all future interface work. It will ensure that the website remains premium, coherent, and scalable as new pages, sections, and components are added.

This system is necessary because:

- The brand needs a consistent visual language across marketing and product experiences
- Repeated UI patterns should not be redefined in different places
- The team can ship faster without introducing visual inconsistency
- The product can grow without requiring a redesign of the entire interface

The design system should prevent duplicate work by defining:

- Shared visual rules
- Reusable structure for layout and spacing
- A clear token set for colors, typography, motion, and layout
- Reusable patterns for common UI surfaces such as cards, buttons, forms, and section containers

This document is the source of truth for later implementation in CSS, reusable components, and page layouts.

---

## 2. Design Tokens

Design tokens are the foundational values that will later be implemented in CSS variables.

### 2.1 Color Tokens

- color.bg.base
- color.bg.elevated
- color.bg.muted
- color.text.primary
- color.text.secondary
- color.text.muted
- color.border.subtle
- color.border.strong
- color.accent.gold
- color.accent.cyan
- color.accent.gold.hover
- color.accent.cyan.hover
- color.surface.card
- color.surface.section

### 2.2 Typography Tokens

- font.family.sans
- font.family.mono
- font.size.100
- font.size.200
- font.size.300
- font.size.400
- font.size.500
- font.size.600
- font.size.700
- font.size.800
- font.size.900
- font.weight.regular
- font.weight.medium
- font.weight.semibold
- font.weight.bold
- lineheight.body
- lineheight.heading
- lineheight.tight
- letterspacing.tight
- letterspacing.normal

### 2.3 Spacing Tokens

- space.1
- space.2
- space.3
- space.4
- space.5
- space.6
- space.8
- space.10
- space.12
- space.16
- space.20
- space.24
- space.32
- space.40
- space.48
- space.64
- space.80
- space.96

### 2.4 Radius Tokens

- radius.sm
- radius.md
- radius.lg
- radius.xl
- radius.full

### 2.5 Shadow Tokens

- shadow.sm
- shadow.md
- shadow.lg
- shadow.focus

### 2.6 Border Tokens

- border.width.sm
- border.width.md
- border.width.focus

### 2.7 Z-Index Tokens

- z.base
- z.dropdown
- z.sticky
- z.overlay
- z.modal
- z.toast

### 2.8 Motion Tokens

- motion.duration.fast
- motion.duration.normal
- motion.duration.slow
- motion.easing.standard
- motion.easing.emphasized

### 2.9 Breakpoint Tokens

- breakpoint.sm
- breakpoint.md
- breakpoint.lg
- breakpoint.xl
- breakpoint.2xl

---

## 3. Color System

The color system should be grounded in the brand’s logo identity and remain premium, restrained, and business-focused.

### 3.1 Core Colors

| Name | Suggested Hex | Usage | Do | Don’t |
|---|---|---|---|---|
| Rich Black | #0B0B0B | Headlines, strong contrast, deep surfaces, key visual anchors | Use for primary text and strong brand moments | Do not use as the dominant background across large sections |
| Charcoal | #1F2124 | Body text, secondary surfaces, muted structural elements | Use for high-readability text and supporting surfaces | Do not use for primary CTA emphasis |
| White | #FFFFFF | Main background, high-contrast surfaces, content separation | Use for clean page backgrounds and content surfaces | Do not use as the only surface if contrast feels flat |
| Warm Gold | #C79A3B | Signature accent, primary CTA emphasis, premium highlights | Use sparingly for focus and brand recognition | Do not use as a full background color for large areas |
| Soft Gray | #ECECEC | Subtle surfaces, borders, muted containers, supporting structure | Use for neutral emphasis and boundaries | Do not use for primary text |
| Soft Cyan | #8FC9D8 | AI-related accents only | Use in AI-specific features, capability markers, and intelligent-system contexts | Do not use broadly across the site outside AI-related moments |

### 3.2 Color Usage Guidance

- Rich Black should be used for premium anchors, headings, and dense content moments.
- Charcoal should carry body copy and mid-level hierarchy.
- White should remain the primary visual base for clarity and calmness.
- Warm Gold should act as a signature accent, not a constant visual flood.
- Soft Gray should support subtle structure and content grouping.
- Soft Cyan should remain rare and purposeful, reserved for AI and intelligent-system storytelling.

### 3.3 Background Hierarchy

- Base background: White
- Elevated surface: Soft Gray or near-white neutral
- Section surface: White with subtle separation
- Featured emphasis: Warm Gold sparingly applied

### 3.4 Surface Hierarchy

- Surface 1: Main page background
- Surface 2: Cards and panels
- Surface 3: Interactive states and elevated content

### 3.5 Border Strategy

- Borders should be subtle and low-contrast
- Use borders to define structure, not to create visual dominance

### 3.6 Hover and Interactive States

- Hover should stay refined and readable
- Focus states must be clearly visible
- Active and selected states should feel deliberate and high-contrast

---

## 4. Typography System

The typography system should feel executive, clear, modern, and dependable.

### 4.1 Font Recommendations

- Primary font: A modern sans-serif with strong neutrality and premium readability
- Secondary font: Only if required for rare editorial or supporting use
- Monospace font: Only for code-related or technical accent contexts

### 4.2 Type Scale

#### Headings
- h1: Large display heading for hero and key page banners
- h2: Section heading
- h3: Subsection heading
- h4: Supporting heading

#### Body
- Body Large: Intro and featured text
- Body Base: Main body copy
- Body Small: Supporting copy, captions, metadata

#### Labels and Buttons
- Label: Short form labels and form field labels
- Button: Compact, confident, clear action text
- Caption: Fine print, metadata, footnotes

### 4.3 Suggested Scale

- 48–64 px for hero headings
- 32–40 px for section headings
- 24–30 px for subsection headings
- 18–20 px for large body text
- 16–18 px for body text
- 14 px for labels and captions

### 4.4 Line Heights

- Headings: 1.1–1.2
- Body: 1.5–1.7
- Compact labels: 1.3–1.4

### 4.5 Font Weights

- Regular: body copy
- Medium: labels and supporting emphasis
- Semibold: section headings and buttons
- Bold: hero emphasis and strong callouts

### 4.6 Responsive Scaling

- Desktop: full scale
- Tablet: slightly reduced scale for balance
- Mobile: tighter scale with shorter line lengths and simplified hierarchy

### 4.7 Reading Width

- Maximum comfortable reading width should be preserved for long-form sections
- Avoid overly wide text blocks for readability

---

## 5. Layout System

The layout system should create calm structure and premium pacing.

### 5.1 Container Sizes

- Max content width for main layout: wide and spacious
- Section width: generous but controlled
- Narrow content block: for storytelling and explanatory copy

### 5.2 Grid Rules

- Use a consistent grid for section structure
- Align cards, text blocks, and editorial components to the same rhythm
- Avoid arbitrary layout shifts between sections

### 5.3 Section Spacing

- Section spacing should be generous and deliberate
- Large vertical spacing should be used between core narrative blocks

### 5.4 Card Spacing

- Cards should have consistent internal padding
- Cards should be spaced evenly in grids and stacks

### 5.5 Maximum Text Width

- Body text should remain within a comfortable reading width to avoid fatigue

### 5.6 Responsive Behavior

- Desktop: content should feel expansive and calm
- Tablet: content should compress without losing clarity
- Mobile: sections should stack cleanly and remain highly scannable

### 5.7 Alignment Rules

- Align content to a consistent vertical rhythm
- Keep major sections structured and predictable
- Avoid visual clutter in dense content areas

---

## 6. Component Design Rules

These rules define the appearance and behavior expectations for all major components.

### 6.1 Button

- Primary buttons should feel confident and premium
- Secondary buttons should feel understated and supportive
- Buttons should have clearly defined hover, focus, active, and disabled states
- Avoid overly rounded or playful button shapes

### 6.2 Card

- Cards should feel like polished, calm surfaces
- Use clear internal spacing and structured content hierarchy
- Cards should support content without feeling visually heavy

### 6.3 Badge

- Badges should be compact and easy to scan
- Use them for status, categories, or small labels
- Keep them subtle and consistent

### 6.4 Section

- Sections should have clear spacing and visual separation
- Each section should have a strong purpose and hierarchy
- Avoid cluttered multi-purpose blocks

### 6.5 Section Header

- Section headers should be concise and direct
- Headings should be outcome-led and easy to scan
- Supporting text should be short and purposeful

### 6.6 Navbar

- The navbar should feel calm, structured, and premium
- Navigation should remain simple and predictable
- The primary CTA should be visually clear but not dominant

### 6.7 Footer

- The footer should feel grounded and professional
- It should close the experience with clarity and trust
- Navigation and legal links should remain easy to scan

### 6.8 Input

- Inputs should feel precise and trustworthy
- They should communicate state clearly
- They should support usability without decorative emphasis

### 6.9 Textarea

- Textareas should be easy to read and easy to complete
- They should feel aligned with the rest of the form system

### 6.10 Select

- Select controls should feel consistent with the rest of the form system
- They should communicate choice clearly

### 6.11 CTA Block

- CTA blocks should feel decisive and premium
- They should be visually clean and easy to act on
- They should not feel overly promotional or loud

### 6.12 Timeline

- Timelines should feel orderly, precise, and credible
- They should help communicate a process or journey without visual noise

### 6.13 Workflow Node

- Workflow nodes should feel structured and system-oriented
- The visual language should communicate progression and relationship clearly

### 6.14 Case Study Card

- Case study cards should emphasize outcomes and business context
- They should feel editorial and credible rather than promotional

### 6.15 Technology Card

- Technology cards should feel intelligent and competent
- They should support capability storytelling without becoming overly technical or playful

### 6.16 Service Card

- Service cards should make the business problem and solution easy to understand
- They should feel clear, structured, and premium

---

## 7. Interaction States

Every interactive element should have a clearly defined and consistent state system.

### 7.1 Default
- Neutral, readable, clearly visible

### 7.2 Hover
- Slight elevation or contrast change that feels deliberate and refined

### 7.3 Focus
- Strong visible focus ring that preserves accessibility and clarity

### 7.4 Active
- Clear pressed or selected state with consistent feedback

### 7.5 Disabled
- Reduced contrast and clear non-interactive appearance

### 7.6 Loading
- Calm loading feedback with no visual disruption

### 7.7 Error
- Clear error styling that communicates the issue without panic

### 7.8 Success
- Clear success indication that confirms completion or submission

---

## 8. Motion Tokens

Motion should support the experience subtly and purposefully.

### 8.1 Duration

- Fast: short transitions for hover and small feedback states
- Normal: standard component transitions
- Slow: section reveals and larger transitions

### 8.2 Easing

- Standard ease for general motion
- Emphasized ease for key interactions and reveal moments

### 8.3 Hover Motion

- Subtle movement or surface change
- Should not feel flashy or distracting

### 8.4 Scroll Reveal

- Gentle reveal for content entering the viewport
- Should preserve clarity and avoid excessive motion

### 8.5 Hero Motion

- Minimal but polished motion for hero transitions or reveal moments
- Should enhance confidence and premium feel

### 8.6 Reduced Motion Behavior

- Respect reduced-motion preferences
- Simplify or remove non-essential animations

---

## 9. Accessibility Rules

Accessibility is a core part of the brand’s credibility and usability.

### 9.1 Contrast Requirements

- Text should meet strong contrast thresholds
- Interactive elements should remain legible in all states

### 9.2 Focus Ring Behavior

- Focus rings must be visible and consistent
- Focus should never be hidden or overly subtle

### 9.3 Keyboard Navigation

- All interactive elements should be reachable and usable by keyboard
- Navigation order should be logical and predictable

### 9.4 Touch Target Size

- Interactive targets should be large enough for comfortable use on touch devices

### 9.5 Reduced Motion

- Motion should be minimized or removed where users prefer reduced motion

### 9.6 Semantic HTML Expectations

- Use semantic structure for sections, navigation, headings, forms, and buttons
- Visual design should support, not replace, semantic structure

---

## 10. Implementation Guidance

This design system should later be mapped into the implementation layers of the project.

### 10.1 Mapping to src/styles/index.css

The tokens defined here should later be implemented as CSS variables in the global stylesheet, with a clear structure for:

- Color tokens
- Type tokens
- Spacing tokens
- Radius tokens
- Shadow tokens
- Motion tokens
- Breakpoint tokens

### 10.2 Mapping to Reusable Components

The design system should later guide the creation of reusable components such as:

- Buttons
- Cards
- Section containers
- CTA blocks
- Forms
- Timelines
- Service and technology cards

### 10.3 Mapping to Data-Driven Page Sections

Page sections should later be composed from structured content and reusable design system patterns. This ensures the site remains consistent even as content evolves.

### 10.4 Implementation Principle

The system should be implemented as a shared foundation rather than as one-off styles inside individual pages.

---

## Summary

This design system will provide the foundation for a consistent, premium, enterprise-ready interface for Amiro Tech Solutions. It is intended to be used as the single source of truth for future visual implementation, component development, and page composition.
