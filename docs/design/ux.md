# UX rules

- Reading follows the thesis narrative order and navigation uses clear anchors.
- The language selector preserves the current view and communicates the active language through `aria-pressed`.
- Placeholders state that the final asset is pending and must not be confused with finished material.
- The hero remains a complete static reading at 320 CSS pixels and larger:
  eyebrow, title, subtitle, body, project metadata, meaningful media state, and
  next-section cue remain available without animation or JavaScript. Its scroll
  cue follows the next enabled manifest section rather than a hardcoded target.
- Navigation, links, and controls must work with a keyboard and have translated accessible labels.
- On small screens, the composition becomes a single column and primary navigation is hidden until a functional mobile menu exists.
- Scroll scenes may reveal, draw, or persist an element only when that motion explains the thesis narrative. The proposal pin is desktop-only.
- `prefers-reduced-motion` removes smooth scrolling, pinning, scrub animation, and continuous transforms while retaining the complete visual reading.
- The image comparison is a native range input: it works with pointer and keyboard controls and has a translated accessible instruction.
