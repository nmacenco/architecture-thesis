# UX rules

- Reading follows the thesis narrative order and navigation uses clear anchors.
- Section modules form one continuous scroll experience rather than isolated
  viewport slides. Every module defines an entry from the previous enabled
  section and a handoff to the next one; visual review includes those neighbors.
- Reuse shared behavior, tokens, and primitives without treating another
  section's full composition as a template. Repeated shells, uniform panels,
  interchangeable grids, and hard resets require a narrative justification.
- Compositional contrast must follow content and preserve semantic order,
  readability, accessibility, and the complete reduced-motion state.
- The language selector preserves the current view and communicates the active language through `aria-pressed`.
- Placeholders state that the final asset is pending and must not be confused with finished material.
- The hero remains a complete static reading at 320 CSS pixels and larger:
  eyebrow, title, subtitle, body, project metadata, meaningful media state, and
  next-section cue remain available without animation or JavaScript. Mobile uses
  a protected single reading column; desktop separates the supporting narrative
  and metadata across an asymmetric cover without reordering either. Its scroll
  cue follows the next enabled manifest section rather than a hardcoded target;
  its responsive and focus states are colocated as Tailwind utilities. A strong
  vertical mobile scrim and combined vertical/directional desktop scrims protect
  white text from the approved render's sky, foliage, and facade detail. Small
  text retains high opacity; text shadow may reinforce but never replace the
  contrast layers.
- The concept section preserves heading, body, quote, keywords, and meaningful
  media in that source order. Mobile text remains linear before a full-bleed
  collage; supporting evidence steps inward and may overlap the collage edge
  without hiding either media alternative or requiring interaction. Larger
  widths expand the same palimpsest without reordering content. Empty reserved
  English keywords do not create an empty landmark, missing required media keeps
  stable unavailable space, and an absent optional photograph leaves no layout
  gap. This hierarchy bridges the hero's immersive cover and the site's measured
  grids rather than resetting into another autonomous panel.
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
- The process section preserves heading, body, five ordered design stages, and
  arc principles in source order. Its pending diagrams remain meaningful,
  translated 4:3 frames on mobile and become 16:9 in a staggered two-column
  desktop sequence. Empty or malformed reserved collections keep every required
  diagram identity without creating empty text landmarks. The module has no
  input or motion dependency, so the complete reading is unchanged with reduced
  motion or without JavaScript.
- Navigation, links, and controls must work with a keyboard and have translated accessible labels.
- On small screens, the composition becomes a single column and primary navigation is hidden until a functional mobile menu exists.
- Scroll scenes may reveal, draw, or persist an element only when that motion explains the thesis narrative. The proposal pin is desktop-only.
- `prefers-reduced-motion` removes smooth scrolling, pinning, scrub animation, and continuous transforms while retaining the complete visual reading.
- The image comparison is a native range input: it works with pointer and keyboard controls and has a translated accessible instruction.
- The footer presents its bilingual rights notice as readable text between the
  attribution grid and actions. It must wrap at 320 CSS pixels and must not imply
  ownership of photographs or other images whose rights remain unconfirmed.
