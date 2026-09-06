# UX rules

- Reading follows the thesis narrative order and navigation uses clear anchors.
- The language selector preserves the current view and communicates the active language through `aria-pressed`.
- Placeholders state that the final asset is pending and must not be confused with finished material.
- The hero remains a complete static reading at 320 CSS pixels and larger:
  eyebrow, title, subtitle, body, project metadata, meaningful media state, and
  next-section cue remain available without animation or JavaScript. Its scroll
  cue follows the next enabled manifest section rather than a hardcoded target;
  its responsive and focus states are colocated as Tailwind utilities.
- The concept section preserves heading, body, quote, keywords, and meaningful
  media in that source order. It is a single column on mobile and becomes an
  offset editorial grid at larger widths without reordering content. Empty
  reserved English keywords do not create an empty landmark, missing required
  media keeps stable unavailable space, and an absent optional photograph leaves
  no layout gap.
- The site section preserves narrative, conditions, context drawings, pending
  facts, and photographs in semantic source order. Mobile is linear; larger
  grids do not reorder content. Unverified dates, areas, and capacities carry an
  explicit editorial-review label, the pending map abstraction remains visibly
  provisional, and empty reserved English collections do not create empty
  landmarks.
- The references section preserves introduction, pending-review status, and
  precedent cards in source order. Cards move from one to two to three columns
  without reordering. Empty or malformed reserved catalog entries retain their
  required media identity, do not shift later precedents, and never expose a
  link affordance until a destination is approved.
- Navigation, links, and controls must work with a keyboard and have translated accessible labels.
- On small screens, the composition becomes a single column and primary navigation is hidden until a functional mobile menu exists.
- Scroll scenes may reveal, draw, or persist an element only when that motion explains the thesis narrative. The proposal pin is desktop-only.
- `prefers-reduced-motion` removes smooth scrolling, pinning, scrub animation, and continuous transforms while retaining the complete visual reading.
- The image comparison is a native range input: it works with pointer and keyboard controls and has a translated accessible instruction.
