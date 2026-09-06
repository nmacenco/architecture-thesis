# Feature: landing-page section modules

> Status: Plan 2 in progress; `hero` and `concept` extracted · Last updated: 2026-09-06

## Purpose and source of truth

This registry tracks the twelve known landing-page modules in their editorial
order. `content/landing-page.json` owns identity, order, visibility, navigation,
translation-key references, asset slots, and unresolved decisions. Visible copy
and accessible labels remain in `messages/es.json` and `messages/en.json`.

The route is being migrated from its legacy inline composition in
`src/app/[locale]/page.tsx`. Implemented modules consume the manifest and the new
`landing.*` namespaces through a typed accessor and a known-ID registry; the
remaining inline sections continue to use the legacy catalog namespaces until
their own extraction. Manifest values never select arbitrary imports.

## Shared module contract

Every module uses semantic single-column source order, then enhances the layout
for tablet and desktop. It must remain readable at 320 CSS pixels, reserve stable
space for media, preserve content without hover or animation, and expose keyboard
and touch alternatives for controls. Reduced motion removes smooth scrolling,
pinning, scrub-only disclosure, and continuous transforms while keeping the final
reading state.

Pending and unavailable assets render identifiable placeholders and retain their
manifest slot, translated alt-key behavior, credit state, and provisional ratio.
Only approved project-relative paths render as final media. The shared baseline
checks are manifest integrity and catalog parity in
`src/content/landing-page.test.ts` and `src/i18n/catalogs.test.ts`; each extracted
module adds focused tests in proportion to its data or interaction behavior.

## Module registry

### 1. `hero`

- **Purpose and position:** Opening identity before `concept`. Implemented in
  `src/components/landing/hero-section.tsx` and selected by the typed registry in
  `src/components/landing/section-registry.ts`; module-local presentation uses
  colocated Tailwind utilities.
- **Contract:** Receives the resolved manifest section and next enabled anchor;
  reads `landing.hero` through every manifest `textKeys` reference, navigation
  metadata, and the required `hero-primary` render. Hero/credits decisions cover
  official title, authors, institution/degree, and year.
- **Media:** Meaningful primary render; provisional placeholder ratio is `4:5`
  mobile and viewport-covering landscape desktop. The current pending asset uses
  its translated alt-key description and a stable full-viewport placeholder;
  credit is pending. Only an `approved` asset with a project-relative source
  renders through `next/image` with priority. The pending state selects the
  complete `hero` placeholder variant instead of layering position/background
  overrides on the shared default.
- **Composition:** Semantic source order is eyebrow, page title, subtitle, body,
  project metadata, media, and next-section cue. The 320-pixel/mobile layout uses
  a minimum `4:5`-compatible frame with protected copy space; tablet/desktop
  overlays the same source-order copy on viewport-covering media.
- **Behavior and semantics:** Labelled section and page `h1`, semantic metadata
  list, meaningful media alternative, and translated link to the next enabled
  manifest anchor. There is no module animation or pointer-only behavior;
  reduced motion changes nothing and the full reading remains available without
  JavaScript.
- **States, dependencies, tests, status:** Enabled and navigation-excluded as
  declared; required asset remains pending. Disabled returns no module; pending
  and candidate media use a placeholder, unavailable/malformed approved media
  use an unavailable placeholder, and approved sourced media renders as an
  image. Uses `src/content/landing-page.ts` and the Tailwind-styled shared media
  placeholder.
  Implemented; accessor/order and media-state branches have focused tests.
  Browser viewport review remains required before publication. Official title,
  authors, institution/degree, and year remain unresolved editorial decisions,
  so the module visibly labels its editorial details as pending confirmation.

### 2. `concept`

- **Purpose and position:** Establish the thesis idea between `hero` and `site`.
  Implemented in `src/components/landing/concept-section.tsx` and selected by
  the typed registry in `src/components/landing/section-registry.ts`.
- **Contract:** Receives the resolved `concept` manifest section and reads
  `landing.concept` through every manifest `textKeys` reference. It preserves
  the navigation-included `concept` anchor, required `concept-collage` and
  `concept-diagram`, optional `concept-existing`, and the absence of a
  section-specific unresolved decision.
- **Media:** All three slots are meaningful. Provisional ratios are collage
  `4:5`, diagram `4:3`, and existing photo `3:2` at all sizes; none receives
  loading priority. Pending slots render the shared
  placeholder with their translated alternatives and stable space. Approved
  project-relative sources render through `next/image`; unavailable, missing
  required, and malformed approved sources use the unavailable state. Credits
  remain pending. An absent optional existing photograph contributes no gap.
- **Composition:** Semantic source order is heading, body, quote, keywords, and
  media. The 320-pixel/mobile layout is one column. Tablet and desktop divide
  text across a twelve-column grid, then keep collage first while offsetting the
  diagram and optional photograph without changing reading order.
- **Behavior and semantics:** Labelled section with an `h2`, blockquote,
  semantic keyword list, and figures for meaningful media. There are no module
  controls or pointer-only behavior. Reduced motion does not remove content,
  and the complete source-order reading works without JavaScript; the existing
  shared scroll reveal may enhance entry only.
- **States, dependencies, tests, status:** Enabled and navigation-included as
  declared; all current asset records remain pending. Empty or malformed
  keyword collections render no empty list; missing required slots retain an
  unavailable placeholder; an absent optional photograph is omitted. Uses the
  typed manifest accessor, shared media placeholder, shared media-state
  resolver, and stable asset IDs. Implemented with focused data, asset-state,
  manifest, and catalog-parity tests. Browser review at 320-pixel mobile and
  desktop widths remains pending because this environment has no browser
  runner; English copy and keywords remain reserved pending editorial
  translation.

### 3. `site`

- **Purpose and position:** Explain urban and heritage context between `concept`
  and `references`. Currently inline in `src/app/[locale]/page.tsx` with
  `src/components/site-map.tsx`; extraction pending.
- **Contract:** `landing.site`; all `textKeys`; five manifest asset slots.
  `historical-and-area-claims` remains unresolved.
- **Media:** Map/location plan provisional `4:3`; aerial/historical/current
  images `3:2`. A local accessible SVG may stand in for the map; credits pending.
- **Composition:** Mobile orders narrative, conditions, map/plan, facts, and
  photographs; tablet/desktop may pair text, map, and facts in a grid.
- **Behavior and semantics:** Static figure with translated description,
  semantic lists and `dl` facts. Reduced motion shows the complete map.
- **States, dependencies, tests, status:** Enabled; required and optional assets
  pending. Uses SiteMap/media/fact primitives. Planned migration; test empty facts,
  stable keys, pending claims, missing images, and long translated values.

### 4. `references`

- **Purpose and position:** Present precedents between `site` and `process`.
  Currently inline in `src/app/[locale]/page.tsx`; extraction pending.
- **Contract:** `landing.references`; all `textKeys`; three required reference
  photographs. `reference-credits` remains unresolved.
- **Media:** Each card uses a provisional `4:3` image ratio with translated alt
  text; sources, rights, links, and credits remain pending.
- **Composition:** Mobile keeps introduction then a one-column card list;
  tablet/desktop may use two/three columns without reordering the precedents.
- **Behavior and semantics:** Articles in a semantic list. Do not imply a link
  until a destination is approved; hover cannot be the only affordance.
- **States, dependencies, tests, status:** Enabled but excluded from navigation;
  assets pending. Uses reference-card/media primitives. Planned migration; test
  empty items, stable keys, absent destinations, and card wrapping.

### 5. `process`

- **Purpose and position:** Explain design reasoning between `references` and
  `programme`. Currently inline with `src/components/plan-reveal.tsx`; extraction
  pending.
- **Contract:** `landing.process`; all `textKeys`; five required diagrams; no
  section-specific unresolved decision.
- **Media:** Timeline/diagnosis/value/intervention/arc diagrams use provisional
  `4:3` mobile and `16:9` desktop frames with translated descriptions.
- **Composition:** Mobile follows body, steps, principles, diagrams; larger
  layouts may align steps horizontally only when labels remain readable.
- **Behavior and semantics:** Ordered process and principle list; SVG paths may
  draw on scroll. Keyboard access is not required for decorative drawing, and
  reduced motion displays all meaningful paths immediately.
- **States, dependencies, tests, status:** Enabled; assets pending. Uses PlanReveal
  and scroll narrative. Planned migration; verify empty collections, SVG text
  alternative, no mobile scrub dependency, and final reduced-motion state.

### 6. `programme`

- **Purpose and position:** Describe uses and quantities between `process` and
  `experience`. Currently inline in `src/app/[locale]/page.tsx`; extraction
  pending.
- **Contract:** `landing.programme`; all `textKeys`; required masterplan and
  axonometry. `historical-and-area-claims` remains unresolved.
- **Media:** Masterplan provisional `4:3` mobile/`16:10` desktop; axonometry
  `4:3`, retaining translated alternatives and pending credits.
- **Composition:** Mobile orders premise, buildings, facts, then drawings;
  tablet/desktop may pair text with diagrams and distribute fact groups.
- **Behavior and semantics:** Semantic lists and `dl` facts; static in reduced
  motion. Any diagram labels must remain legible without hover.
- **States, dependencies, tests, status:** Enabled but excluded from navigation;
  assets pending. Uses editorial/list/fact/media primitives. Planned migration;
  test empty groups, stable keys, optional values, claims, and wrapping.

### 7. `experience`

- **Purpose and position:** Human-centered “Habitar Tomba” journey between
  `programme` and `proposal`. It is not present in the current route; component
  path is pending Plan 2.
- **Contract:** `landing.experience`; all `textKeys`; required
  `journey-circulation` diagram. `experience-narrative` remains unresolved.
- **Media:** Journey diagram provisional `4:5` mobile and `16:9` desktop with a
  translated alternative; credit pending.
- **Composition:** Mobile reads user groups then the city-to-halls route as a
  linear sequence. Desktop may enhance the same order spatially without hiding
  any route step.
- **Behavior and semantics:** Ordered journey and semantic user-group list. If
  steps become interactive, every step needs keyboard/touch access and a static
  reduced-motion presentation.
- **States, dependencies, tests, status:** Enabled and navigation-included;
  required asset pending. Planned, not implemented. Test empty data, stable keys,
  anchor inclusion, all input modes, 320-pixel route labels, and reduced motion.

### 8. `proposal`

- **Purpose and position:** Present the architectural intervention between
  `experience` and `materiality`. Currently inline with
  `src/components/image-comparison.tsx`; extraction pending.
- **Contract:** `landing.proposal`; all `textKeys`; nine required and one optional
  asset slot. `experience-narrative` also affects its approved route.
- **Media:** Renders provisional `4:5` mobile/`16:10` desktop; plans, sections,
  and elevations `4:3` mobile/`16:9` desktop. Alternatives and credits are pending.
- **Composition:** Mobile is a complete linear route with gallery and comparison;
  desktop may use the single approved pinned scene and varied gallery scale.
- **Behavior and semantics:** Native-range comparison supports pointer, touch,
  and keyboard with translated instruction. Mobile and reduced motion disable
  pinning/scrub while retaining both comparison labels and all content.
- **States, dependencies, tests, status:** Enabled; assets pending. Uses media,
  scroll narrative, and ImageComparison. Planned migration; test range bounds,
  focus, touch/keyboard use, cleanup, optional elevation, missing images, and
  desktop/mobile reduced motion.

### 9. `materiality`

- **Purpose and position:** Explain construction and environmental systems
  between `proposal` and `physical-model`. Currently inline in
  `src/app/[locale]/page.tsx`; extraction pending.
- **Contract:** `landing.materiality`; all `textKeys`; three required and one
  optional acoustics diagram; no unresolved decision.
- **Media:** Structure, envelope, sustainability, and acoustics diagrams use
  provisional `4:3` ratios at all sizes with translated alternatives.
- **Composition:** Mobile orders systems, acoustics, then diagrams; larger widths
  may compare related details side by side without shrinking technical labels.
- **Behavior and semantics:** Semantic system/acoustic lists and figures; any
  reveal enhancement resolves to the complete static state for reduced motion.
- **States, dependencies, tests, status:** Enabled but excluded from navigation;
  assets pending. Uses editorial/list/media primitives. Planned migration; test
  empty groups, optional acoustics asset, stable keys, and diagram readability.

### 10. `physical-model`

- **Purpose and position:** Optional representation between `materiality` and
  `reflection`. A model block is currently inline in
  `src/app/[locale]/page.tsx`, but it does not honor the manifest's disabled
  state; extraction pending.
- **Contract:** `landing.physicalModel`; all `textKeys`; required `model-general`
  and optional `model-detail`. The `physical-model` decision remains unresolved.
- **Media:** Both photographs use provisional `4:3` frames and translated
  alternatives; publication rights and credits are pending.
- **Composition:** When enabled, mobile orders narrative then photographs;
  tablet/desktop may pair general and detail views. When disabled it contributes
  no visual gap or navigation target.
- **Behavior and semantics:** Static figures; reduced motion changes nothing.
  The skill must never enable this module implicitly.
- **States, dependencies, tests, status:** Disabled; all assets pending. Planned
  registry migration and legacy mismatch. Test disabled output, navigation and
  numbering continuity, optional detail absence, and future enabled behavior.

### 11. `reflection`

- **Purpose and position:** Conclude the editorial narrative between the optional
  model and `credits`. Currently inline in `src/app/[locale]/page.tsx`;
  extraction pending.
- **Contract:** `landing.reflection`; all `textKeys`; required `reflection-final`;
  no unresolved decision.
- **Media:** Final render provisional `4:5` mobile and `16:10` desktop with
  translated alternative and pending credit.
- **Composition:** Mobile orders heading, body, quote, and image; desktop may use
  a large closing image/quote composition without altering source order.
- **Behavior and semantics:** Editorial heading and blockquote; optional reveal
  becomes fully visible with reduced motion.
- **States, dependencies, tests, status:** Enabled but excluded from navigation;
  required asset pending. Uses editorial/media primitives. Planned migration;
  verify missing media, quote semantics, wrapping, and static motion fallback.

### 12. `credits`

- **Purpose and position:** Close the page after `reflection` with attribution
  and approved actions. Currently rendered as the footer in
  `src/app/[locale]/page.tsx`; extraction pending.
- **Contract:** `landing.credits`; all `textKeys`; no media slots. Official title,
  authors, institution/degree, year, tutor, contact, and PDF remain governed by
  unresolved decisions.
- **Media:** None. Do not create asset slots outside the manifest.
- **Composition:** Mobile stacks credits and actions with touch-safe spacing;
  tablet/desktop may use columns. Long names and translated labels must wrap.
- **Behavior and semantics:** Page footer, translated labels, labelled back-to-top
  link. PDF/contact remain visibly unavailable until destinations are approved;
  no placeholder destination may be presented as real.
- **States, dependencies, tests, status:** Enabled and navigation-included.
  Planned migration; verify missing destinations, disabled action semantics,
  keyboard focus, anchor behavior, and unresolved-value presentation.

## Maintenance

Use `$build-landing-section <section-id>` for one-module implementation, update,
or explicit audit. Each completed invocation updates its module profile, the
component and UX docs when their contracts change, focused tests, and the dated
changelog. Complex modules receive a dedicated feature document only when this
registry can no longer communicate their maintained contract clearly.
