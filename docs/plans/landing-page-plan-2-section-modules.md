# Landing Page Plan 2 — Section Module System

> Status: in progress — first four modules implemented · Last updated: 2026-09-06

## Objective

Build the twelve approved landing-page sections as maintainable modules driven by `content/landing-page.json` and locale keys. Each module must be structurally complete with explicit visual placeholders so that approved copy and final assets can be incorporated without redesigning the page.

Mobile is a primary delivery target. A module is not complete when only its desktop composition works.

## Dependencies

- Plan 1 has fixed the section IDs, order, visibility rules, Spanish content keys, and expected asset slots.
- `docs/design/ui.md`, `docs/design/components.md`, and `docs/design/ux.md` remain the canonical visual and interaction constraints.
- The project-specific `$build-landing-section` skill may be used once implemented through [the dedicated skill plan](landing-page-skill-build-section.md), but creating that skill is not part of this plan.

## Deliverables

- Shared section primitives for headings, editorial copy, media placeholders, credits, and pending states where reuse is justified.
- A typed section registry that maps known manifest IDs to components without accepting arbitrary component names from JSON.
- Modules for `hero`, `concept`, `site`, `references`, `process`, `programme`, `experience`, `proposal`, `materiality`, `physical-model`, `reflection`, and `credits`.
- Intentional handling of enabled, disabled, and asset-pending states.
- Functional section anchors and navigation derived from enabled content.
- A functional mobile navigation or removal of any control that suggests unavailable mobile navigation.
- `docs/features/landing-page-sections.md` as the canonical module registry.
- Focused tests for pure manifest, registry, ordering, and visibility behavior.

## Module construction order

1. Shared primitives and typed section registry.
2. `hero` and `concept`.
3. `site` and `references`.
4. `process` and `programme`.
5. `experience` — “Habitar Tomba”.
6. `proposal`.
7. `materiality` and optional `physical-model`.
8. `reflection` and `credits`.
9. Cross-section navigation, transitions, responsive review, and cleanup.

Current progress: the shared typed manifest accessor, known-ID section registry,
Tailwind-styled media-placeholder primitive, and shared media-state resolver are
established. `hero`, `concept`, `site`, and `references` are extracted,
Tailwind-styled Server Components, completing the second and third construction
groups. The remaining sections stay in the legacy inline route until their own
bounded module work is completed.

Each module is completed and documented before starting the next group. Shared abstractions should be extracted only after a real repeated pattern is visible.

## Module contract

Each module must:

- Receive structure and asset metadata from the manifest.
- Read visible and accessible copy from `next-intl` catalogs.
- Render a meaningful state when assets are pending or unavailable.
- Avoid user-facing literals in JSX or TSX.
- Use a Server Component unless interaction or browser APIs require a small client boundary.
- Preserve semantic source order independently of the visual desktop layout.
- Document its purpose, inputs, assets, states, interaction, responsive behavior, accessibility, and known gaps.

The manifest chooses among known section IDs and variants; it must not dynamically import arbitrary code paths.

## Styling convention

Extracted modules use Tailwind utilities for module-local layout, spacing,
typography, responsive states, focus treatment, and visual styling. Global CSS
remains the home for design tokens, document defaults, shared motion/keyframes,
and selectors that utilities cannot express clearly. Legacy section selectors
are migrated when their owning module is extracted; Plan 2 does not require an
unrelated whole-page CSS rewrite.

## Mobile-first acceptance requirements

Every module must be reviewed at narrow mobile, standard mobile, tablet, and desktop widths. At minimum:

- No horizontal page overflow at 320 CSS pixels.
- Heading, copy, facts, captions, and credits remain readable without clipping or overlap.
- Visual order preserves the intended narrative when multi-column layouts collapse.
- Media containers reserve stable space and use an intentional mobile aspect ratio.
- Touch controls have adequate target size and spacing.
- Pointer-only interactions have touch and keyboard equivalents.
- Desktop pinning, hover effects, or large scroll distances degrade to a complete linear mobile reading.
- Reduced-motion mode works on mobile and desktop.
- Decorative media is distinguished from meaningful media; meaningful media has translated alternatives.
- Only justified above-the-fold media receives loading priority.
- The section remains usable with slow or missing images.

Mobile review must happen during each module implementation, not as deferred publication cleanup.

## Documentation contract

`docs/features/landing-page-sections.md` contains one entry per module with:

- Section ID and component path.
- Narrative purpose and neighboring sections.
- Manifest fields and translation namespace.
- Required and optional assets, including expected aspect ratios.
- Desktop, tablet, and mobile composition.
- Interaction and reduced-motion behavior.
- Accessibility semantics and keyboard/touch behavior.
- Enabled, disabled, pending, and unavailable states.
- Shared dependencies, test coverage, status, and unresolved decisions.

Complex modules may receive a dedicated feature document only when the registry entry is no longer sufficient. Any new document must be linked from `docs/README.md`.

## Verification per module

- Confirm the manifest ID, catalog namespace, and asset IDs.
- Run relevant focused tests and TypeScript checking.
- Review narrow mobile and desktop layouts.
- Review keyboard and touch behavior for interactive modules.
- Review reduced motion where animation exists.
- Update the module registry and component inventory.

After all modules are assembled, run the complete ship-check command set.

## Out of scope

- Selecting or optimizing final thesis assets.
- Final editorial corrections after stakeholder review.
- English editorial translation.
- CMS, API, database, authentication, remote storage, or a new 3D runtime.
- Image-specific art direction that cannot be decided before the real file exists.

## Exit criteria

- All enabled manifest sections render through documented modules in the approved order.
- Every section has a usable mobile and desktop composition.
- Final assets can replace placeholders through manifest changes without structural rewrites.
- Optional sections can be disabled without broken navigation, numbering, or spacing.
- “Habitar Tomba” provides a readable linear mobile journey and an enhanced desktop presentation without losing content parity.
- No misleading or non-functional mobile control remains.
- The module registry is complete and current.
- Lint, typecheck, tests, coverage, and production build pass.

## Risks

- Designing around generic placeholders can hide constraints of unusually wide plans or tall renders.
- Premature shared abstractions can make visually distinct sections feel repetitive.
- Desktop scroll effects can create excessive mobile height or inaccessible reading order.
- Module-level completion without cross-section review can produce inconsistent rhythm and duplicated content.

## Expected files

- `content/landing-page.json`
- `src/app/[locale]/page.tsx`
- Relevant files under `src/components/`
- `messages/es.json`
- Relevant tests
- `docs/features/landing-page-sections.md`
- `docs/design/components.md`
- `docs/design/ux.md`
- Applicable changelog entries
