# Landing section implementation and review checklist

Use this checklist after resolving exactly one section from
`content/landing-page.json`. Apply every shared check and the checks for the
target's module type. Record anything not exercised instead of implying it
passed.

## 1. Contract and evidence

- [ ] Confirm intent: create, update, or explicit audit.
- [ ] Confirm the exact section ID, index, previous/next section, `enabled`
  value, navigation inclusion and anchor, translation namespace, text keys,
  asset slots, and related unresolved decisions.
- [ ] Read both locale namespaces. Treat reserved English content as pending,
  not approved translation.
- [ ] Locate the target implementation, shared primitives, callers, neighboring
  composition, styles, and focused tests using graph evidence when available.
- [ ] Check graph coverage for operated-on code paths; directly inspect excluded
  sources and any missed ranges.
- [ ] Note user-owned changes and avoid overwriting unrelated work.

Stop for an unknown or ambiguous ID, contradictory manifest identity, or an
editorial decision required to define scope. Do not stop merely because an asset
is pending and a placeholder can preserve its role.

## 2. Composition before code

- [ ] Define a semantic single-column source order that works without CSS
  enhancement.
- [ ] Define mobile, tablet, and desktop arrangements without changing content
  meaning or order.
- [ ] Give each media slot an intentional mobile and desktop ratio; document
  whether the ratio is provisional pending the real asset.
- [ ] Decide which media is meaningful or decorative. Meaningful media uses the
  manifest alt key; decorative media is hidden from assistive technology.
- [ ] Keep only justified above-the-fold media eligible for loading priority.
- [ ] Identify pending, unavailable, optional, empty-list, and malformed/error
  states relevant to the module.

## 3. Implementation

- [ ] Use a Server Component unless hooks, events, animation, or browser APIs
  require a narrow client boundary.
- [ ] Use Tailwind utilities for module-local composition and styling; reserve
  global CSS for tokens, document defaults, shared motion/keyframes, or a
  selector that utilities cannot express clearly.
- [ ] Use a typed, known-ID registry; never resolve arbitrary code paths from
  manifest strings.
- [ ] Reuse current section/media/interaction primitives before creating a new
  shared abstraction.
- [ ] Keep code identifiers and translation keys in English and visible copy or
  accessible labels in both catalogs.
- [ ] Preserve disabled state, optional assets, navigation behavior, and pending
  status unless the request explicitly and validly changes them.
- [ ] Reserve stable media space and render an identifiable pending/unavailable
  state without presenting it as final work.
- [ ] Use stable domain keys for list content rather than array positions when a
  stable manifest or catalog identity exists.

## 4. Responsive and accessibility review

- [ ] At 320 CSS pixels, no section or child introduces horizontal page overflow.
- [ ] At narrow and standard mobile widths, headings, facts, captions, credits,
  and translated labels wrap without clipping or overlap.
- [ ] At tablet and desktop widths, layout enhancement preserves semantic order.
- [ ] Touch targets and spacing are usable without pointer precision.
- [ ] All controls have translated names, visible focus, keyboard operation, and
  an equivalent touch path; hover is never the sole disclosure mechanism.
- [ ] Reduced motion is tested independently of viewport width and renders the
  complete final reading state without smooth scrolling, pinning, or scrub-only
  disclosure.
- [ ] Missing or slow images retain readable content and stable layout.
- [ ] Heading hierarchy, landmarks, figures, captions, lists, and definition
  lists match the content semantics.

## 5. Module-type additions

### Static editorial

- [ ] Review full source order and both locale shapes.
- [ ] Run typecheck and relevant content/component tests.
- [ ] Review one mobile and one desktop layout at minimum.

### Data-driven list or facts

- [ ] Exercise populated, empty, and optional data states.
- [ ] Confirm stable keys and resilient wrapping for longer translated values.

### Interactive

- [ ] Exercise pointer, touch, and keyboard paths.
- [ ] Verify focus state, accessible instructions, initial value, boundaries,
  cleanup, and behavior without JavaScript enhancement where applicable.
- [ ] Verify reduced motion separately on mobile and desktop.

### Asset-heavy

- [ ] Verify source dimensions when files exist, responsive sizing, ratios,
  loading priority, alt behavior, credits, and missing-image state.
- [ ] Confirm pending files are not represented as approved assets.

### Navigation-affecting

- [ ] Verify anchors are unique and derive only from enabled/included sections.
- [ ] Verify disabling the section leaves no broken desktop or mobile navigation,
  numbering, spacing, or scroll target.

## 6. Documentation and completion

- [ ] Update the target entry in `docs/features/landing-page-sections.md` with
  purpose, position, component path, namespace, manifest fields, assets/ratios,
  responsive composition, interactions, input modes, reduced motion, semantics,
  states, dependencies, tests, status, and unresolved decisions.
- [ ] Update the reusable component inventory or UX rules when those contracts
  changed.
- [ ] Add the dated changelog entry; link any new feature document.
- [ ] Run focused checks. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`,
  `pnpm test:coverage`, and `pnpm build` when shared infrastructure has broad
  impact or this completes a release batch.
- [ ] Report visual/interaction checks precisely. Do not call the module visually
  complete based only on static validation.
