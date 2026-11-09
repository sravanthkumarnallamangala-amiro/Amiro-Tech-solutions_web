# Amiro Tech Solutions - UI Component Library Specification

## 1. Purpose

This document defines the reusable UI component inventory for Amiro Tech Solutions before implementation. It is a planning and architecture artifact only. It does not define React code, CSS, or page layouts.

The component library should ensure:

- No duplicate components
- High reuse across current and future pages
- Consistent implementation decisions
- Scalable content and page architecture
- Clear ownership between foundation, content, marketing, navigation, forms, and layout patterns

Every component should support the brand direction established in the previous documents: calm, premium, business-focused, technically credible, and enterprise-ready.

---

## 2. Component Architecture Principles

### 2.1 Reuse Before Creation

New components should be created only when an existing component cannot reasonably express the required content, behavior, or semantic role.

For example:

- A Service Card and Technology Card should both build from the base Card pattern.
- A CTA Button should build from the Button pattern.
- A Hero should compose typography, buttons, optional visual content, and section structure.
- A Timeline should compose Process Step items rather than define one-off step markup.

### 2.2 Content Separated From Presentation

Components should receive structured content rather than hardcoded copy. Text, links, service data, case studies, navigation items, process steps, and form options should be managed through content/data models.

### 2.3 Composition Over Duplication

Large sections should be composed from smaller reusable components.

Example:

Page

↓

Page Layout

↓

Section

↓

Section Header

↓

Grid

↓

Service Card

↓

Button

### 2.4 Controlled Variants

Each component should expose a limited set of variants. Variants should represent real content or interaction needs, not visual preference alone.

### 2.5 Accessibility As A Baseline

Every interactive component must support keyboard access, visible focus states, semantic roles, readable labels, and sufficient contrast. Motion must respect reduced-motion preferences.

---

## 3. Foundation Components

Foundation components define structure, spacing, rhythm, and reusable layout behavior. They should be visually quiet and should not contain business-specific copy.

### 3.1 Container

- Purpose: Constrain page content to consistent readable widths.
- Variants: Default, narrow, wide, full.
- Sizes: Narrow for editorial text, default for most sections, wide for grids and hero content, full for background-level wrappers.
- States: None.
- Responsive behavior: Uses full available width on small screens with safe horizontal spacing; caps width on larger screens.
- Accessibility: Must not alter semantic meaning; should preserve logical reading order.
- Animation behavior: None.
- Data requirements: None.

### 3.2 Section

- Purpose: Define a major content region with vertical rhythm and optional background tone.
- Variants: Default, muted, elevated, featured, compact.
- Sizes: Compact, standard, spacious.
- States: None.
- Responsive behavior: Reduces vertical spacing on mobile while preserving clear separation.
- Accessibility: Should map to a meaningful page section when appropriate and support heading association.
- Animation behavior: Optional subtle reveal on entry; disabled or simplified for reduced motion.
- Data requirements: Section id, optional aria label, optional background intent.

### 3.3 Stack

- Purpose: Arrange children vertically with consistent spacing.
- Variants: Tight, standard, relaxed, split.
- Sizes: Small, medium, large spacing.
- States: None.
- Responsive behavior: Spacing may reduce on smaller screens.
- Accessibility: No special role unless the content requires one.
- Animation behavior: None.
- Data requirements: Spacing intent only.

### 3.4 Grid

- Purpose: Arrange repeated content such as cards, features, technologies, and statistics.
- Variants: Auto-fit, two-column, three-column, four-column, asymmetric.
- Sizes: Compact, standard, spacious gaps.
- States: None.
- Responsive behavior: Collapses predictably from multi-column desktop grids to one-column mobile grids.
- Accessibility: Reading order must remain logical when columns collapse.
- Animation behavior: Optional staggered reveal for repeated items; must remain subtle.
- Data requirements: Item collection, column intent, gap intent.

### 3.5 Divider

- Purpose: Separate related content groups without visual heaviness.
- Variants: Horizontal, vertical, inset, full-width.
- Sizes: Hairline, standard.
- States: None.
- Responsive behavior: Vertical dividers should become horizontal or disappear when stacked.
- Accessibility: Decorative dividers should be ignored by assistive technology.
- Animation behavior: None.
- Data requirements: Decorative or semantic separation intent.

### 3.6 Spacer

- Purpose: Provide controlled empty space when component-level spacing is insufficient.
- Variants: Block, inline.
- Sizes: Uses design-system spacing scale.
- States: None.
- Responsive behavior: Can map to smaller spacing values on mobile.
- Accessibility: No semantic role.
- Animation behavior: None.
- Data requirements: Spacing size.

### 3.7 Aspect Ratio

- Purpose: Preserve fixed media or visual proportions.
- Variants: Square, video, wide, portrait, custom.
- Sizes: Based on container width.
- States: Loading, loaded, fallback.
- Responsive behavior: Maintains ratio across screen sizes.
- Accessibility: Media inside the ratio container must carry proper alt text, labels, or captions.
- Animation behavior: Optional image fade-in after load.
- Data requirements: Ratio value, media source, alt text when image-based.

### 3.8 Wrapper

- Purpose: Group related elements for layout or semantic structure without creating a new visual component.
- Variants: Generic, semantic, interactive boundary.
- Sizes: None.
- States: None unless used as an interaction boundary.
- Responsive behavior: Inherits child behavior.
- Accessibility: Should not add unnecessary roles.
- Animation behavior: None by default.
- Data requirements: Optional semantic label or relationship id.

---

## 4. Typography Components

Typography components should enforce hierarchy, readability, and tone. They should not create new spacing systems independently.

### 4.1 Heading

- Purpose: Render page, section, and subsection titles with consistent hierarchy.
- Variants: Display, page, section, subsection, card.
- Sizes: h1, h2, h3, h4-equivalent visual scales.
- States: None.
- Responsive behavior: Scales down on smaller screens while preserving hierarchy and readable line lengths.
- Accessibility: Must use correct semantic heading level independent of visual size.
- Animation behavior: Optional reveal when part of hero or section entry.
- Data requirements: Text, semantic level, visual variant, optional emphasis phrase.

### 4.2 Text

- Purpose: Render body copy and explanatory content.
- Variants: Body, lead, muted, strong, intro.
- Sizes: Small, base, large.
- States: None.
- Responsive behavior: Maintains comfortable line length; avoids overly wide paragraphs.
- Accessibility: Must meet contrast requirements.
- Animation behavior: Optional reveal as part of parent section.
- Data requirements: Text content, optional tone.

### 4.3 Caption

- Purpose: Render metadata, helper copy, footnotes, and small supporting text.
- Variants: Default, muted, metadata, helper.
- Sizes: Small only.
- States: Default, disabled context, error context, success context.
- Responsive behavior: Wraps cleanly and remains readable.
- Accessibility: Must be associated with related controls or content when used as helper text.
- Animation behavior: None except form validation changes.
- Data requirements: Text, optional association id.

### 4.4 Label

- Purpose: Identify controls, categories, or compact interface elements.
- Variants: Form label, eyebrow, metadata label, field group label.
- Sizes: Small, base.
- States: Default, required, disabled, error.
- Responsive behavior: Wraps when needed without breaking form layout.
- Accessibility: Form labels must be programmatically associated with fields.
- Animation behavior: None.
- Data requirements: Text, required flag, target control id when form-related.

### 4.5 Quote

- Purpose: Present testimonial excerpts, leadership statements, or editorial proof.
- Variants: Testimonial, editorial, pull quote.
- Sizes: Compact, standard, featured.
- States: None.
- Responsive behavior: Featured quotes reduce scale and stack attribution on mobile.
- Accessibility: Should use appropriate quotation semantics where possible.
- Animation behavior: Optional subtle reveal.
- Data requirements: Quote text, attribution, role/company, optional source.

### 4.6 Highlight

- Purpose: Emphasize a phrase, metric, keyword, or short value statement.
- Variants: Gold accent, cyan AI accent, neutral emphasis.
- Sizes: Inline, block, metric.
- States: None.
- Responsive behavior: Inline highlights wrap naturally; block highlights maintain readable width.
- Accessibility: Meaning must not rely on color alone.
- Animation behavior: Optional reveal or count-up only for metrics; respect reduced motion.
- Data requirements: Text/value, emphasis intent, optional context label.

### 4.7 Code

- Purpose: Render technical terms, API-like identifiers, or short code-related labels when needed.
- Variants: Inline, block, technical tag.
- Sizes: Small, base.
- States: None.
- Responsive behavior: Long values wrap or scroll only when appropriate.
- Accessibility: Must preserve readable contrast and not be used for decorative emphasis.
- Animation behavior: None.
- Data requirements: Code text, optional language label for block usage.

---

## 5. Navigation Components

Navigation components should be simple, predictable, and business-oriented. They should prioritize orientation and conversion without becoming visually loud.

### 5.1 Navbar

- Purpose: Provide persistent access to primary pages and the main conversion action.
- Variants: Default, sticky, transparent-over-hero, compact.
- Sizes: Desktop, tablet, mobile.
- States: Default, scrolled, menu open, active page.
- Responsive behavior: Desktop shows primary links and CTA; mobile collapses into Mobile Menu.
- Accessibility: Must use navigation semantics, clear link names, keyboard-accessible controls, and visible focus states.
- Animation behavior: Subtle transition on scroll or menu state; no distracting movement.
- Data requirements: Logo, navigation items, active route, primary CTA.

### 5.2 Nav Link

- Purpose: Represent a single navigation destination.
- Variants: Primary, secondary, footer, dropdown item, mobile item.
- Sizes: Compact, standard.
- States: Default, hover, focus, active, disabled.
- Responsive behavior: Adapts spacing and touch target size on mobile.
- Accessibility: Active state should be programmatically clear when possible.
- Animation behavior: Subtle color or underline transition.
- Data requirements: Label, href, active state, optional description.

### 5.3 Dropdown

- Purpose: Group related navigation links when future content grows beyond the MVP navigation.
- Variants: Simple menu, mega menu, service menu.
- Sizes: Compact, standard.
- States: Closed, open, hover, focus, active item.
- Responsive behavior: Converts to an accordion-style group inside mobile navigation.
- Accessibility: Must support keyboard open, close, arrow navigation where appropriate, escape behavior, and focus management.
- Animation behavior: Short fade/slide; disabled for reduced motion.
- Data requirements: Trigger label, grouped items, optional descriptions.

### 5.4 Mobile Menu

- Purpose: Provide complete navigation on small screens.
- Variants: Drawer, full-screen panel, compact panel.
- Sizes: Mobile, tablet.
- States: Closed, opening, open, closing.
- Responsive behavior: Replaces desktop navigation below the defined breakpoint.
- Accessibility: Must trap focus while open, restore focus on close, support escape close, and expose a clear menu button label.
- Animation behavior: Calm panel transition; reduced motion should remove slide effects.
- Data requirements: Navigation items, CTA, legal or secondary links if needed.

### 5.5 Breadcrumb

- Purpose: Show page location for deeper future structures such as blog, resources, industries, or case study detail pages.
- Variants: Standard, compact.
- Sizes: Small only.
- States: Default, current page.
- Responsive behavior: May collapse middle items on small screens.
- Accessibility: Must use breadcrumb navigation semantics and mark the current page.
- Animation behavior: None.
- Data requirements: Ordered page hierarchy with labels and hrefs.

### 5.6 Footer Navigation

- Purpose: Provide secondary orientation, legal closure, and trust-building links.
- Variants: Simple, grouped, expanded.
- Sizes: Desktop grid, mobile stack.
- States: Default, hover, focus, active where relevant.
- Responsive behavior: Groups stack on mobile with clear spacing.
- Accessibility: Must use clear headings for link groups and keyboard-accessible links.
- Animation behavior: Subtle link state transitions only.
- Data requirements: Link groups, company summary, contact links, legal links, social links if available.

---

## 6. Action Components

Action components should clearly communicate what happens next. The system should avoid having separate action components for every page-specific CTA.

### 6.1 Button

- Purpose: Trigger a primary or secondary action.
- Variants: Primary, secondary, tertiary, ghost, danger for admin or future portal contexts.
- Sizes: Small, medium, large.
- States: Default, hover, focus, active, disabled, loading.
- Responsive behavior: Maintains comfortable touch target size; may become full-width in narrow form or CTA contexts.
- Accessibility: Must use button semantics for actions, visible focus, disabled state communication, and loading label behavior.
- Animation behavior: Subtle color, border, or elevation transition.
- Data requirements: Label, action, variant, size, disabled/loading flags, optional icon.

### 6.2 Icon Button

- Purpose: Trigger compact actions where the icon is the primary affordance.
- Variants: Plain, bordered, filled, destructive, navigation control.
- Sizes: Small, medium, large.
- States: Default, hover, focus, active, disabled, loading.
- Responsive behavior: Touch target remains large enough even if icon is visually compact.
- Accessibility: Requires accessible label; icon alone is never sufficient.
- Animation behavior: Subtle state transition only.
- Data requirements: Icon, accessible label, action, variant, state.

### 6.3 CTA Button

- Purpose: Represent high-value conversion actions such as booking a consultation or contacting the team.
- Variants: Primary conversion, secondary conversion, inline CTA.
- Sizes: Medium, large.
- States: Default, hover, focus, active, disabled, loading.
- Responsive behavior: Can become full-width in mobile hero, banner, or form contexts.
- Accessibility: Must clearly describe the destination or action.
- Animation behavior: Slight emphasis on hover; no pulsing or attention-grabbing loops.
- Data requirements: Label, href or action, conversion intent, optional analytics id.

### 6.4 Link

- Purpose: Navigate to another location or resource.
- Variants: Inline, standalone, subtle, external, text CTA.
- Sizes: Inherits text size or uses compact standalone style.
- States: Default, hover, focus, active, visited where useful, disabled when non-interactive.
- Responsive behavior: Wraps cleanly and preserves target size when standalone.
- Accessibility: Must be distinguishable from surrounding text and communicate external behavior when applicable.
- Animation behavior: Subtle underline or color transition.
- Data requirements: Label, href, external flag, optional aria label.

### 6.5 Tag

- Purpose: Represent categories, service areas, filters, or keywords.
- Variants: Neutral, gold accent, cyan AI accent, removable, selectable.
- Sizes: Small, medium.
- States: Default, hover for interactive tags, selected, disabled.
- Responsive behavior: Wraps in rows or scrolls only where intentionally designed.
- Accessibility: Selectable tags must communicate selected state.
- Animation behavior: Subtle state transition.
- Data requirements: Label, value, selected flag, optional remove action.

### 6.6 Badge

- Purpose: Communicate compact status, category, or metadata.
- Variants: Neutral, success, warning, accent, AI accent, outline.
- Sizes: Small, medium.
- States: Default only unless used as selectable, in which case use Tag instead.
- Responsive behavior: Wraps without crowding.
- Accessibility: Must not rely on color alone for meaning.
- Animation behavior: None.
- Data requirements: Label, tone, optional icon.

---

## 7. Surface Components

Surface components hold content. They should be composed from the foundation, typography, and action components rather than creating one-off visual systems.

### 7.1 Card

- Purpose: Base reusable surface for grouped content.
- Variants: Default, interactive, featured, compact, media, bordered.
- Sizes: Compact, standard, spacious.
- States: Default, hover, focus-within, active, selected, disabled.
- Responsive behavior: Adapts internal spacing and stacks content on mobile.
- Accessibility: If clickable, the interactive target must be clear and keyboard-accessible.
- Animation behavior: Subtle elevation, border, or surface transition.
- Data requirements: Title, description, optional icon/media, optional actions, optional metadata.

### 7.2 Feature Card

- Purpose: Present a benefit, differentiator, principle, or capability.
- Variants: Icon-led, text-led, metric-led, featured.
- Sizes: Compact, standard.
- States: Default, hover if interactive, focus if link-based.
- Responsive behavior: Stacks in grids; icon and text remain aligned on mobile.
- Accessibility: Icon must be decorative or labeled appropriately.
- Animation behavior: Optional reveal as part of grid.
- Data requirements: Title, description, optional icon, optional link.

### 7.3 Service Card

- Purpose: Present a service area using business-oriented framing.
- Variants: Overview, detail, group summary, related service.
- Sizes: Compact, standard, expanded.
- States: Default, hover, focus, active/selected if used in filtering.
- Responsive behavior: Becomes full-width on mobile; detail variant may stack problem, solution, and outcome.
- Accessibility: CTA and card link behavior must not conflict.
- Animation behavior: Subtle hover and optional reveal.
- Data requirements: Service name, business problem, solution, outcome, category, CTA, optional icon.

### 7.4 Technology Card

- Purpose: Present technical capability areas without overwhelming non-technical buyers.
- Variants: Capability, platform, AI-specific, integration, tool category.
- Sizes: Compact, standard.
- States: Default, hover, focus if linked.
- Responsive behavior: Grid collapses cleanly; technical labels wrap without overflow.
- Accessibility: Technical acronyms should be understandable from surrounding context.
- Animation behavior: Subtle reveal or hover transition.
- Data requirements: Capability name, summary, category, optional icon, optional related services.

### 7.5 Case Study Card

- Purpose: Present proof of business impact in a scannable, editorial format.
- Variants: Preview, featured, compact, detailed.
- Sizes: Compact, standard, featured.
- States: Default, hover, focus, active if selected.
- Responsive behavior: Featured cards stack media, summary, and metrics on mobile.
- Accessibility: Entire card link behavior must be keyboard-accessible and clearly labeled.
- Animation behavior: Subtle hover and optional reveal.
- Data requirements: Title, client context, challenge, solution, outcome, metrics, category, CTA.

### 7.6 Statistic Card

- Purpose: Present metrics, proof points, or business outcomes.
- Variants: Single metric, grouped metric, proof stat, KPI.
- Sizes: Compact, standard, featured.
- States: Default.
- Responsive behavior: Metrics stack on mobile; labels remain close to values.
- Accessibility: Metrics must include context, not just numbers.
- Animation behavior: Optional count-up only when meaningful and disabled for reduced motion.
- Data requirements: Value, label, supporting context, optional source.

### 7.7 Glass Card

- Purpose: Provide a premium elevated surface for select hero or featured contexts.
- Variants: Light glass, dark glass, subtle glass.
- Sizes: Standard, featured.
- States: Default, hover if interactive.
- Responsive behavior: Must preserve readability on all backgrounds; may degrade to solid surface on mobile.
- Accessibility: Contrast must be validated against background content.
- Animation behavior: Minimal; avoid shimmer or decorative effects.
- Data requirements: Same as base Card plus background context.

### 7.8 Panel

- Purpose: Hold denser content such as forms, filters, process details, or portal modules.
- Variants: Default, form, sidebar, filter, information, confirmation.
- Sizes: Compact, standard, spacious.
- States: Default, loading, error, success where relevant.
- Responsive behavior: Panels stack or become full-width on mobile.
- Accessibility: Panel headings should identify purpose; status panels should announce important changes.
- Animation behavior: Optional entry transition for overlays or drawers.
- Data requirements: Heading, content blocks, optional actions, optional status.

---

## 8. Data Components

Data components present structured information, relationships, sequences, or comparisons. They should be driven by arrays or typed content models.

### 8.1 Timeline

- Purpose: Show chronological or process-based progression.
- Variants: Vertical, horizontal, compact, featured.
- Sizes: Compact, standard.
- States: Default, active step, completed step if interactive.
- Responsive behavior: Horizontal timelines become vertical on mobile.
- Accessibility: Order must be semantic and readable without visual lines.
- Animation behavior: Optional sequential reveal; reduced motion disables progression effects.
- Data requirements: Ordered steps with title, description, optional timeframe, optional status.

### 8.2 Workflow

- Purpose: Show how work moves through stages, teams, systems, or decisions.
- Variants: Linear, branching, grouped, client journey.
- Sizes: Standard, dense.
- States: Default, active node, expanded detail.
- Responsive behavior: Complex workflows simplify into stacked steps on mobile.
- Accessibility: Must not rely only on connectors or arrows; text order should communicate flow.
- Animation behavior: Optional line or node reveal; keep subtle.
- Data requirements: Nodes, relationships, step order, labels, optional details.

### 8.3 Process Step

- Purpose: Represent one phase in a timeline, workflow, or process list.
- Variants: Numbered, icon-led, status-led, detail-rich.
- Sizes: Compact, standard.
- States: Default, active, completed, expanded.
- Responsive behavior: Number/icon aligns above or beside text depending on available width.
- Accessibility: Step order and status must be text-readable.
- Animation behavior: Optional reveal as part of parent.
- Data requirements: Step number, title, description, status, optional deliverables.

### 8.4 Feature List

- Purpose: Present benefits, principles, capabilities, or delivery standards.
- Variants: Bullet, check, icon, two-column, grouped.
- Sizes: Compact, standard.
- States: Default.
- Responsive behavior: Multi-column lists collapse to one column on mobile.
- Accessibility: Use list semantics where appropriate.
- Animation behavior: Optional subtle reveal.
- Data requirements: List items, optional group labels, optional icons.

### 8.5 Icon List

- Purpose: Present short scannable items with visual anchors.
- Variants: Check icons, service icons, capability icons, status icons.
- Sizes: Compact, standard.
- States: Default.
- Responsive behavior: Icons and text remain aligned; long labels wrap cleanly.
- Accessibility: Icons decorative unless they add unique meaning.
- Animation behavior: None or parent reveal only.
- Data requirements: Items with label, optional description, optional icon.

### 8.6 Technology Grid

- Purpose: Present technical capability categories or tool areas.
- Variants: Capability grid, category grid, AI-focused grid, integration grid.
- Sizes: Compact, standard.
- States: Default, hover if cards are linked, selected if filterable.
- Responsive behavior: Collapses from multi-column to single-column; dense tags may wrap.
- Accessibility: Category labels and descriptions must be understandable without visual grouping alone.
- Animation behavior: Optional staggered reveal.
- Data requirements: Technology categories, descriptions, tags, related service ids.

### 8.7 Comparison Block

- Purpose: Compare approaches, before/after states, service options, or business outcomes.
- Variants: Two-column comparison, before/after, checklist comparison, feature matrix.
- Sizes: Compact, standard, detailed.
- States: Default.
- Responsive behavior: Columns stack on mobile with clear labels repeated where needed.
- Accessibility: Comparisons must preserve meaning when read linearly.
- Animation behavior: Optional reveal only.
- Data requirements: Comparison headings, rows/items, labels, optional recommendation.

---

## 9. Form Components

Form components should support a structured intake experience that feels precise, calm, and trustworthy.

### 9.1 Input

- Purpose: Capture short text, email, phone, company, or similar values.
- Variants: Text, email, phone, URL, search.
- Sizes: Small, medium, large.
- States: Default, hover, focus, filled, disabled, error, success, loading if validated asynchronously.
- Responsive behavior: Full-width in forms on mobile.
- Accessibility: Requires associated label, helper text support, autocomplete where appropriate, and clear error messaging.
- Animation behavior: Subtle focus and validation transitions.
- Data requirements: Name, label, value, placeholder, helper text, required flag, validation rules, error message.

### 9.2 Textarea

- Purpose: Capture longer project context or business challenges.
- Variants: Standard, compact, expanded.
- Sizes: Small, medium, large height.
- States: Default, hover, focus, filled, disabled, error, success.
- Responsive behavior: Full-width on mobile; height should remain usable for longer entries.
- Accessibility: Requires associated label and clear helper/error text.
- Animation behavior: Subtle focus and validation transitions.
- Data requirements: Name, label, value, placeholder, helper text, required flag, validation rules, error message.

### 9.3 Select

- Purpose: Capture one choice from a controlled option set.
- Variants: Native select, custom select, searchable select for future portal contexts.
- Sizes: Small, medium, large.
- States: Default, hover, focus, open, selected, disabled, error, success.
- Responsive behavior: Uses mobile-friendly selection behavior; option labels wrap or truncate safely.
- Accessibility: Must support keyboard interaction, clear label, and announced selected value.
- Animation behavior: Short menu transition if custom.
- Data requirements: Name, label, options, selected value, placeholder, required flag, error message.

### 9.4 Checkbox

- Purpose: Capture multiple selections or consent.
- Variants: Single, group, card checkbox.
- Sizes: Standard, large touch target.
- States: Unchecked, checked, indeterminate, hover, focus, disabled, error.
- Responsive behavior: Group options stack cleanly on mobile.
- Accessibility: Requires associated label; groups need fieldset-style grouping and legend equivalent.
- Animation behavior: Subtle check transition.
- Data requirements: Name, label, value, checked state, group label, required flag, error message.

### 9.5 Radio

- Purpose: Capture one choice from a visible option group.
- Variants: Standard, card radio, segmented radio.
- Sizes: Standard, large touch target.
- States: Unselected, selected, hover, focus, disabled, error.
- Responsive behavior: Groups stack or wrap on smaller screens.
- Accessibility: Requires grouped labeling and keyboard navigation between options.
- Animation behavior: Subtle selection transition.
- Data requirements: Name, group label, options, selected value, required flag, error message.

### 9.6 Toggle

- Purpose: Capture a binary preference or setting, especially in future product or portal contexts.
- Variants: Standard, labeled, compact.
- Sizes: Small, medium.
- States: Off, on, hover, focus, disabled.
- Responsive behavior: Label and control remain aligned; touch target remains comfortable.
- Accessibility: Must communicate checked state and purpose.
- Animation behavior: Short thumb transition; reduced motion should simplify.
- Data requirements: Name, label, checked state, helper text.

### 9.7 Form Group

- Purpose: Group related fields and supporting text into a logical unit.
- Variants: Single field, field pair, fieldset, inline group, stacked group.
- Sizes: Compact, standard, spacious.
- States: Default, error, success, disabled.
- Responsive behavior: Multi-column groups stack on mobile.
- Accessibility: Groups require clear labels and error association where applicable.
- Animation behavior: None except validation state updates.
- Data requirements: Group label, fields, helper text, error summary if needed.

### 9.8 Error Message

- Purpose: Explain validation errors clearly and calmly.
- Variants: Field-level, group-level, form-level.
- Sizes: Small, standard.
- States: Visible, hidden.
- Responsive behavior: Wraps close to the related control.
- Accessibility: Must be associated with the relevant field and announced when appropriate.
- Animation behavior: Simple appear/disappear; avoid disruptive movement.
- Data requirements: Error text, related field id, severity.

### 9.9 Success Message

- Purpose: Confirm completion, submission, or successful validation.
- Variants: Field-level, form-level, confirmation panel.
- Sizes: Small, standard, featured confirmation.
- States: Visible, hidden.
- Responsive behavior: Stacks above or below related content depending on context.
- Accessibility: Important success states should be announced politely.
- Animation behavior: Subtle reveal.
- Data requirements: Success text, related action, optional next step.

---

## 10. Marketing Components

Marketing components are reusable content sections or section-level modules. They should compose foundation, typography, action, surface, and data components.

### 10.1 Hero

- Purpose: Establish page purpose, positioning, and primary next step.
- Variants: Home hero, page hero, split hero, centered hero, proof-led hero.
- Sizes: Standard, spacious, compact for detail pages.
- States: Default, loading media if visual is present.
- Responsive behavior: Stacks on mobile; CTAs remain visible and easy to tap.
- Accessibility: Must include a clear h1, descriptive supporting text, and meaningful CTA labels.
- Animation behavior: Subtle text and visual reveal; no distracting looping motion.
- Data requirements: Eyebrow optional, headline, subheadline, primary CTA, secondary CTA, proof points, optional visual.

### 10.2 Hero Visual

- Purpose: Provide a visual representation of software, AI systems, workflow, or business transformation.
- Variants: Abstract system visual, product mockup, workflow visual, metric visual, media image.
- Sizes: Compact, standard, feature.
- States: Loading, loaded, fallback.
- Responsive behavior: Moves below text or becomes simplified on mobile.
- Accessibility: Decorative visuals should be hidden from assistive technology; informative visuals need alt text or captions.
- Animation behavior: Minimal layered reveal or subtle ambient motion; reduced motion disables ambient effects.
- Data requirements: Visual type, media source or structured visual data, alt text when informative.

### 10.3 Value Strip

- Purpose: Reinforce key capabilities or trust points in a compact horizontal or grid format.
- Variants: Badge row, icon row, stat strip, service strip.
- Sizes: Compact, standard.
- States: Default.
- Responsive behavior: Wraps into grid or stack on mobile.
- Accessibility: Must be readable in linear order.
- Animation behavior: Optional reveal only.
- Data requirements: Items with label, optional icon, optional link.

### 10.4 CTA Banner

- Purpose: Convert interest into action at high-intent moments.
- Variants: Final CTA, inline CTA, split CTA, compact CTA.
- Sizes: Compact, standard, spacious.
- States: Default, loading action if form or booking action is triggered.
- Responsive behavior: Text and actions stack on mobile; primary CTA remains prominent.
- Accessibility: Clear heading, descriptive text, and action labels.
- Animation behavior: Subtle reveal; no pulsing CTA effects.
- Data requirements: Heading, supporting text, primary CTA, optional secondary CTA, trust note.

### 10.5 Section Header

- Purpose: Introduce a section with clear hierarchy and optional CTA.
- Variants: Default, centered, split with action, eyebrow-led, compact.
- Sizes: Compact, standard, spacious.
- States: None.
- Responsive behavior: Split headers stack on mobile.
- Accessibility: Uses correct heading level and descriptive copy.
- Animation behavior: Optional reveal as part of section.
- Data requirements: Eyebrow optional, heading, description, optional action.

### 10.6 Testimonial

- Purpose: Present client or stakeholder proof in a credible way.
- Variants: Quote card, featured quote, compact testimonial, carousel item for future use.
- Sizes: Compact, standard, featured.
- States: Default, active if used in carousel.
- Responsive behavior: Attribution stacks on mobile.
- Accessibility: Carousel usage must provide controls, labels, and pause behavior if auto-advancing is ever introduced.
- Animation behavior: Static by default; subtle reveal only.
- Data requirements: Quote, name, role, organization, optional image, optional related case study.

### 10.7 FAQ

- Purpose: Answer common objections or practical questions.
- Variants: Accordion, static list, grouped FAQ.
- Sizes: Compact, standard.
- States: Collapsed, expanded, hover, focus.
- Responsive behavior: Full-width stacked items on mobile.
- Accessibility: Accordion controls must expose expanded state and support keyboard use.
- Animation behavior: Short expand/collapse; reduced motion removes animated height changes.
- Data requirements: Question, answer, category, optional link.

### 10.8 Logo Cloud

- Purpose: Present client, partner, platform, or technology logos as credibility signals.
- Variants: Client logos, partner logos, technology logos.
- Sizes: Compact, standard.
- States: Default, hover if linked.
- Responsive behavior: Wraps into a simple grid; logos remain legible.
- Accessibility: Logo images need useful alt text unless decorative.
- Animation behavior: Static by default; no auto-scrolling logo marquees.
- Data requirements: Logo name, image source, alt text, optional href.

---

## 11. Layout Components

Layout components define reusable arrangements used by pages and sections. They should not contain page-specific copy.

### 11.1 Page Layout

- Purpose: Provide the top-level structure for a page.
- Variants: Marketing page, content page, contact page, future portal page.
- Sizes: Full page.
- States: Loading, ready, error for future dynamic contexts.
- Responsive behavior: Maintains global navigation, main content, and footer order.
- Accessibility: Must provide skip link support, main region, and logical landmark structure.
- Animation behavior: Optional page-level reveal should be minimal.
- Data requirements: Page metadata, sections, active route.

### 11.2 Section Layout

- Purpose: Arrange section header, content body, and optional action consistently.
- Variants: Header above content, split header, sidebar header, centered content.
- Sizes: Compact, standard, spacious.
- States: None.
- Responsive behavior: Split arrangements stack on mobile.
- Accessibility: Section heading must label the section.
- Animation behavior: Optional reveal through parent Section.
- Data requirements: Header content, body content, optional action, layout variant.

### 11.3 Sidebar

- Purpose: Support secondary navigation, filters, summaries, or contextual actions.
- Variants: Navigation sidebar, filter sidebar, content sidebar, sticky sidebar.
- Sizes: Compact, standard.
- States: Default, collapsed, active item, sticky.
- Responsive behavior: Moves above content, collapses, or becomes drawer on mobile depending on context.
- Accessibility: Must maintain logical reading order and clear labels.
- Animation behavior: Drawer or collapse transitions only when needed.
- Data requirements: Sidebar title, items, active state, optional actions.

### 11.4 Two Column Layout

- Purpose: Arrange complementary content side by side.
- Variants: Equal columns, text/media, content/sidebar, form/info.
- Sizes: Standard, wide.
- States: None.
- Responsive behavior: Stacks vertically on mobile with primary content first.
- Accessibility: Reading order must match priority.
- Animation behavior: Optional section reveal.
- Data requirements: Primary content, secondary content, column ratio intent.

### 11.5 Content Block

- Purpose: Present narrative content with optional supporting elements.
- Variants: Narrative, feature, proof, info, editorial.
- Sizes: Narrow, standard, wide.
- States: None.
- Responsive behavior: Maintains comfortable reading width.
- Accessibility: Uses proper heading and paragraph structure.
- Animation behavior: Optional reveal.
- Data requirements: Heading optional, body copy, optional media, optional action.

### 11.6 Sticky CTA

- Purpose: Keep a conversion path available in high-intent or long-form contexts.
- Variants: Desktop sidebar CTA, mobile bottom CTA, inline sticky panel.
- Sizes: Compact, standard.
- States: Hidden, visible, active, dismissed if dismissible.
- Responsive behavior: Mobile version must not block essential content or form fields.
- Accessibility: Must be reachable by keyboard and dismissible if it overlays content.
- Animation behavior: Subtle entrance; respect reduced motion.
- Data requirements: CTA label, href/action, visibility rule, optional dismiss state.

---

## 12. Component Relationships

### 12.1 Page Composition

Page

↓

Page Layout

↓

Navbar

↓

Main Content

↓

Section

↓

Section Layout

↓

Section Header

↓

Content Components

↓

Footer Navigation

### 12.2 Hero Composition

Hero

↓

Section

↓

Container

↓

Two Column Layout or centered Section Layout

↓

Heading + Text + CTA Button

↓

Hero Visual

### 12.3 Services Composition

Services Overview

↓

Section

↓

Section Header

↓

Grid

↓

Service Card

↓

Badge or Tag + Heading + Text + Link or Button

### 12.4 Process Composition

Process Section

↓

Section

↓

Section Header

↓

Timeline or Workflow

↓

Process Step

↓

Heading + Text + optional Feature List

### 12.5 Case Study Composition

Case Study Grid

↓

Section

↓

Section Header

↓

Grid

↓

Case Study Card

↓

Badge + Heading + Text + Statistic Card + Link

### 12.6 Contact Composition

Contact Page

↓

Page Layout

↓

Hero

↓

Contact Options using Card

↓

Panel

↓

Form Group

↓

Input / Select / Textarea / Checkbox

↓

Error Message or Success Message

### 12.7 CTA Composition

CTA Banner

↓

Section

↓

Container

↓

Section Header or Content Block

↓

CTA Button + secondary Link

---

## 13. Variant Governance

### 13.1 Allowed Variant Sources

Variants may be created for:

- Semantic purpose
- Content density
- Interaction behavior
- Page context
- Accessibility requirement
- Future product or portal need

Variants should not be created only to satisfy one isolated visual preference.

### 13.2 Component Naming Rules

Use names based on function, not visual styling.

Preferred:

- Service Card
- Technology Card
- CTA Banner
- Section Header
- Feature List

Avoid:

- Gold Card
- Fancy Box
- Big CTA
- Homepage Card
- Blue Section

### 13.3 Duplication Rules

Before creating a component, check whether it can be expressed as:

- A variant of an existing component
- A composition of smaller components
- A data variation of an existing pattern
- A layout variant rather than a new content component

---

## 14. Future Components

These components are not required for the initial MVP but should be planned for future scalability.

### 14.1 Products

- Product Card: Summary of a productized offer or platform.
- Product Feature Matrix: Compare product capabilities by plan, tier, or use case.
- Product Detail Hero: Product-specific hero with proof, CTA, and visual.
- Use Case Block: Connects product capability to business scenario.
- Integration List: Shows systems or platforms a product connects with.

### 14.2 Pricing

- Pricing Card: Plan, price, audience, included features, and CTA.
- Pricing Toggle: Switch between billing terms or engagement models.
- Feature Comparison Table: Compare plans or service tiers.
- Estimate CTA: Guide visitors toward custom pricing discussions.
- Pricing FAQ: Address budget, scope, billing, and engagement questions.

### 14.3 Customer Portal

- App Shell: Authenticated layout with navigation and workspace structure.
- Dashboard Card: Summarizes active work, metrics, or project state.
- Status Badge: Communicates project, ticket, or workflow status.
- Notification Item: Shows updates and action-required messages.
- Data Table: Supports structured records, sorting, filtering, and pagination.
- Empty State: Guides users when no records or projects exist yet.

### 14.4 Blog

- Article Card: Preview title, excerpt, category, author, and date.
- Featured Article: Larger editorial preview for key content.
- Author Bio: Author identity, role, and expertise.
- Category Filter: Filter or navigate by content topic.
- Article Header: Title, metadata, excerpt, and share actions.
- Table of Contents: Supports long-form reading.

### 14.5 Resources

- Resource Card: Download, guide, whitepaper, checklist, or webinar preview.
- Resource Filter Bar: Filter by topic, type, or audience.
- Gated Resource Form: Capture lead information before download.
- Download CTA: Clear action for resource access.
- Related Resources: Recommend similar content.

### 14.6 Dashboard

- Metric Tile: Key business or operational metric.
- Chart Panel: Structured data visualization container.
- Activity Feed: Timeline of recent updates.
- Task List: Actionable items with status.
- Filter Toolbar: Search, filters, sort, and view controls.
- Detail Drawer: Contextual record details without leaving the dashboard.

---

## 15. Initial MVP Component Set

The first implementation phase should prioritize these components:

- Container
- Section
- Stack
- Grid
- Heading
- Text
- Label
- Navbar
- Nav Link
- Mobile Menu
- Footer Navigation
- Button
- CTA Button
- Link
- Badge
- Card
- Service Card
- Technology Card
- Case Study Card
- Statistic Card
- Panel
- Timeline
- Process Step
- Feature List
- Icon List
- Input
- Textarea
- Select
- Checkbox
- Form Group
- Error Message
- Success Message
- Hero
- Hero Visual
- Value Strip
- CTA Banner
- Section Header
- FAQ
- Page Layout
- Section Layout
- Two Column Layout
- Content Block

Components outside this list should be deferred unless a page requirement proves they are necessary.

---

## 16. Final Review

This component library should act as the bridge between strategy and implementation. The system is intentionally modular: foundation components create structure, typography components create hierarchy, action components create interaction, surface components hold content, data components explain relationships, form components collect intent, marketing components drive conversion, and layout components compose pages.

The result should be a reusable, scalable component architecture that supports Amiro Tech Solutions as a premium software and AI partner without creating unnecessary one-off components.
