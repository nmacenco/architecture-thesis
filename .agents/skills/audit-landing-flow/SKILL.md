---
name: audit-landing-flow
description: Audit two or more adjacent tesis-ro landing-page sections, or the complete implemented landing, for narrative continuity, content-derived compositional variety, responsive rhythm, and disconnected-slide patterns. Use after a section batch or milestone; do not use to implement a single module, choose editorial structure, invent copy, approve assets, or silently fix findings.
---

# Audit Landing Flow

Review the landing as a continuous web narrative rather than as isolated section
deliverables. This skill is an integration audit and is read-only unless the user
separately authorizes fixes. Route single-section implementation or remediation
back through `build-landing-section` one manifest ID at a time.

## Resolve the audit scope

1. Require either a contiguous manifest range of at least two sections or an
   explicit request to audit all implemented sections.
2. Resolve selectors to exact manifest IDs and preserve manifest order. State
   the resolved first and last IDs before continuing.
3. Include immediate enabled boundary neighbors when available so the first and
   last transitions can be judged. Treat them as audit context, not additional
   implementation scope.
4. Stop for unknown, ambiguous, non-contiguous, or reversed selectors. Do not
   silently include disabled or unimplemented sections in the rendered sequence.

## Load project truth

Read the nearest `AGENTS.md`, then:

- `content/landing-page.json`, including order, visibility, navigation, assets,
  and unresolved decisions across the audited range;
- `docs/features/architecture-thesis-landing.md` and
  `docs/features/landing-page-sections.md`;
- `docs/design/ui.md`, `docs/design/components.md`, and `docs/design/ux.md`;
- both locale namespaces for the audited sections; and
- the route composition, section registry, shared layout/media/motion primitives,
  audited components, their boundary neighbors, styles, and focused tests.

Use Codebase Memory first for code structure when available, check coverage for
every cited code path, and read exact source for excluded or missed ranges. Read
documentation, manifests, catalogs, styles, and other non-code sources directly.

Before auditing, read [references/flow-checklist.md](references/flow-checklist.md)
and apply every relevant check.

## Audit the continuous experience

Build a compact visual-grammar inventory for each audited section: narrative
job, dominant evidence, entry and exit relationship, content width, heading
position, media geometry and scale, density, negative space, background boundary,
vertical rhythm, interaction, and motion role.

Judge repetition by purpose, not by raw similarity. Shared tokens and primitives
should make the page coherent; repeated complete shells, uniform viewport panels,
mechanical alternation, interchangeable grids, and hard visual resets make it
behave like disconnected slides. Conversely, novelty without a content-derived
reason is not a successful correction.

Apply the interchangeability check across neighbors: when copy and assets could
move between sections without substantial layout reconsideration, record a
finding unless the repetition clearly supports comparison, cadence, or another
documented narrative purpose. Check that motion enhances an already meaningful
static sequence instead of concealing generic composition.

Review available mobile and desktop renderings as continuous scroll sequences,
including reduced motion when relevant. If browser or screenshot evidence is
unavailable, perform the source-level audit and mark visual conclusions as
unverified rather than inferring completion.

## Report and hand off

Make no repository changes unless the user separately authorizes them. Report:

1. findings ordered by severity with file and line evidence;
2. the audited manifest range and boundary context;
3. a section-by-section visual-grammar summary;
4. repeated patterns and whether each is justified or slide-like;
5. broken or successful transitions;
6. mobile, desktop, and reduced-motion evidence actually reviewed; and
7. a remediation sequence grouped into shared-flow corrections and exact
   section IDs to revisit with `build-landing-section`.

Do not redefine manifest order, invent factual copy, approve assets, or claim
visual completion from static checks alone. Finish with the repository's required
close-message format.
