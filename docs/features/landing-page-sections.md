# Feature: landing-page section modules

> Status: Plan 2 in progress; first four modules extracted · Last updated: 2026-09-06

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
  and `references`. Implemented in `src/components/landing/site-section.tsx`,
  selected by the typed registry, and composed with the localized abstract
  `src/components/site-map.tsx` placeholder.
- **Contract:** Receives the resolved `site` manifest section and reads all
  `landing.site` text keys, its navigation-included `site` anchor, the five
  declared asset slots, and the section's unresolved-decision state.
  `historical-and-area-claims` remains unresolved, and the facts are explicitly
  labelled as awaiting editorial confirmation rather than verified.
- **Media:** Regional map and location plan use provisional `4:3` ratios;
  aerial, historical, and current views use `3:2`, at all sizes. All are
  meaningful and none receives loading priority. The pending regional map uses
  a visibly pending local SVG abstraction with its manifest alternative; other
  pending assets use the shared placeholder. Approved project-relative sources
  render through `next/image`. Credits remain pending.
- **Composition:** Semantic source order is heading, body, conditions, regional
  map, location plan, facts, and photographs. The 320-pixel/mobile layout is a
  single column. Tablet and desktop enhance the same order with twelve-column
  text, context-media, fact, and photography grids.
- **Behavior and semantics:** Labelled section with an `h2`, semantic condition
  list, figures, and `dl` facts whose `dt` precedes `dd` in source order. There
  are no controls or pointer-only behavior. The SVG lines may use the existing
  scroll reveal, remain fully drawn without JavaScript, and remain static when
  reduced motion bypasses the shared scroll runtime.
- **States, dependencies, tests, status:** Enabled and navigation-included as
  declared; all five current asset records remain pending. Missing required
  slots retain unavailable placeholder space, while an absent optional aerial
  is omitted without a gap. Empty or malformed condition/fact collections
  create no empty list or definition-list landmarks. Uses the typed manifest
  accessor, media-state resolver, media placeholder, SiteMap, and stable asset
  IDs. Implemented with focused collection, optional/required-media, manifest,
  unresolved-decision, and catalog-parity tests. Browser review at 320-pixel
  mobile and desktop widths remains pending because this environment has no
  browser runner; English content collections remain reserved pending editorial
  translation.

### 4. `references`

- **Purpose and position:** Present precedents between `site` and `process`.
  Implemented in `src/components/landing/references-section.tsx` and selected by
  the typed registry.
- **Contract:** Receives the resolved `references` manifest section and reads
  every `landing.references` text key, the navigation-excluded `references`
  anchor, three required reference photographs, and the section's unresolved
  decision state. Catalog items are positionally associated with the fixed
  manifest order, while the manifest asset IDs provide stable card identities.
  `reference-credits` remains unresolved.
- **Media:** Each required photograph uses a provisional `4:3` ratio at all
  widths, a translated manifest alternative, and no loading priority. Pending
  and candidate assets remain placeholders; missing, unavailable, and malformed
  approved sources use unavailable placeholders; only approved project-relative
  sources render through `next/image`. Sources, rights, and credits remain
  pending and visibly carry the shared editorial-review state.
- **Composition:** Semantic source order is heading, body, pending-review status,
  then the precedent list. Each item orders image, place, name, and lesson.
  Mobile uses one column, tablet two, and desktop three without changing DOM or
  editorial order. All long localized values use resilient wrapping.
- **Behavior and semantics:** Labelled section with an `h2`, a semantic list,
  and one labelled article per manifest asset identity. Cards with approved
  catalog content use their `h3` as the accessible name; reserved empty entries
  fall back to the translated media description. There are no controls, hover
  dependencies, or links because no destinations are approved. Reduced motion
  leaves all content available, and JavaScript is not required.
- **States, dependencies, tests, status:** Enabled but excluded from navigation,
  as declared; all three assets remain pending. Empty or malformed catalog items
  do not shift later item-to-asset associations, and required media slots remain
  visible even when English editorial items are empty. Uses the typed manifest
  accessor, shared media state and placeholder, and fixed asset IDs. Implemented
  with focused association, empty/malformed-data, media-state, manifest,
  unresolved-decision, and catalog-parity tests. Browser review at 320-pixel
  mobile and desktop widths remains pending because this environment has no
  browser runner; English copy, precedent metadata, destinations, sources,
  rights, and credits remain pending editorial approval.

### 5. `process`

- **Purpose and position:** Explain design reasoning between `references` and
  `programme`. Implemented in
  `src/components/landing/process-section.tsx` and selected by the typed
  registry.
- **Contract:** Receives the resolved `process` manifest section and reads every
  `landing.process` text key, the navigation-included `process` anchor, and the
  five required diagrams. Stage labels are positionally associated with the
  fixed manifest order while asset IDs provide stable identities. There is no
  section-specific unresolved decision.
- **Media:** The history, diagnosis, heritage-value, intervention, and arc
  diagrams are meaningful. Each uses a provisional `4:3` mobile/tablet ratio
  and `16:9` desktop ratio, its translated manifest alternative, and no loading
  priority. Pending and candidate records remain placeholders; missing,
  unavailable, and malformed approved records use unavailable placeholders;
  only approved project-relative sources render through `next/image`. All five
  sources and credits remain pending.
- **Composition:** Semantic source order is heading, body, five ordered stages
  with their diagrams, then the ordered arc-principle list. The 320-pixel/mobile
  layout is one column. Tablet and desktop enhance the same stage order into a
  staggered two-column sequence, while principles become three columns without
  reordering content.
- **Behavior and semantics:** Labelled section with an `h2`, an ordered process
  list, meaningful figures, stage headings when localized labels exist, and an
  ordered principle list. There are no controls, hover dependencies, or
  module-local animation. Reduced motion leaves the complete reading unchanged,
  and JavaScript is not required.
- **States, dependencies, tests, status:** Enabled and navigation-included as
  declared; all five assets remain pending. Empty or malformed stage collections
  retain every required diagram without empty headings; empty or malformed
  principles create no empty list. Missing required slots retain unavailable
  placeholder space. Uses the typed manifest accessor, shared media-state
  resolver and placeholder, plus stable process asset IDs. Implemented with
  focused stage association, empty/malformed collection, manifest,
  no-unresolved-decision, and shared media-state coverage. Static tests and type
  checking pass; browser review at 320-pixel mobile and desktop widths remains
  pending because this environment has no browser runner, as does independent
  visual confirmation of the reduced-motion rendering. English copy, stages,
  principles, diagram descriptions, sources, and credits remain reserved or
  pending editorial completion.

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
