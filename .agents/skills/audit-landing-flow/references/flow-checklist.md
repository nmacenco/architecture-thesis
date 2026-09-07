# Landing flow audit checklist

Use this checklist for a contiguous range of at least two implemented sections or
for the complete implemented landing. Record every unreviewed state explicitly.

## 1. Scope and evidence

- [ ] Resolve the exact first and last manifest IDs, included implemented
  sections, disabled/unimplemented gaps, and immediate enabled boundary context.
- [ ] Read the canonical continuous-narrative, visual-system, UX, module, manifest,
  and locale contracts.
- [ ] Inspect route composition, registry, audited components, shared primitives,
  motion, styles, and relevant tests with graph coverage and exact-source fallback.
- [ ] Note user-owned changes and keep the audit read-only unless fixes are
  separately authorized.

## 2. Visual-grammar inventory

For every section record:

- [ ] narrative job and dominant visual evidence;
- [ ] entry relationship and exit handoff;
- [ ] heading position, copy width, media geometry and scale;
- [ ] density, negative space, background treatment, and vertical rhythm; and
- [ ] interaction and motion role, including the complete static state.

## 3. Continuity and anti-slide review

- [ ] The sequence reads as one spatial journey rather than autonomous viewport
  panels joined vertically.
- [ ] Adjacent sections do not repeatedly reset to the same eyebrow, heading,
  copy, and media shell without narrative justification.
- [ ] Full-height framing, centered compositions, card grids, hard background
  cuts, and left/right alternation are used deliberately rather than mechanically.
- [ ] Scale, density, alignment, media relationships, and whitespace create a
  legible rhythm with meaningful contrast and moments of continuity.
- [ ] Visual anchors, overlaps, alignment, pacing, or media relationships provide
  an intelligible handoff across section boundaries where the content supports it.
- [ ] Repetition that supports comparison or cadence is distinguished from
  interchangeable templating.
- [ ] Apply the interchangeability check to every adjacent pair. Record pairs
  whose content could be swapped without substantial composition changes.
- [ ] Motion explains content or transition and does not disguise a generic
  static layout. Reduced motion retains the complete narrative.
- [ ] Compositional variety remains content-derived; it does not reorder meaning,
  impair reading, or add arbitrary decoration.

## 4. Responsive and accessible flow

- [ ] Review continuous scrolling at 320 CSS pixels and at one representative
  desktop width; add tablet when a transition changes materially there.
- [ ] Mobile preserves the narrative handoffs without desktop-only pinning,
  overlaps, hover, precise pointer input, or long scrub distances.
- [ ] Heading hierarchy, landmarks, focus order, controls, figures, captions,
  alternatives, and translated labels remain coherent across boundaries.
- [ ] Reduced motion is reviewed independently from viewport width.
- [ ] Pending, unavailable, slow, or missing media preserves rhythm and does not
  turn the sequence into indistinguishable placeholder cards.

## 5. Report

- [ ] List findings by severity with exact evidence and affected manifest IDs.
- [ ] Separate shared-flow problems from section-local problems.
- [ ] Identify successful transitions and justified repetition, not only defects.
- [ ] State which viewport, interaction, and motion states were actually reviewed.
- [ ] Recommend a remediation order and route each section-local implementation
  through `build-landing-section`.
