# Landing Page Plan 6 — Final Assets and Publication Readiness

> Status: blocked by Plan 5 · Last updated: 2026-09-06

## Objective

Prepare the bilingual landing page for publication by optimizing approved assets, integrating the final PDF and contact details, and completing accessibility, responsive, performance, and delivery validation.

## Deliverables

- Optimized final images, plans, diagrams, and photographs under `public/images/`.
- Final PDF under an explicit public path when approved.
- Real tutor, credit, and public contact details.
- Responsive, keyboard, reduced-motion, and screen-reader review.
- Image sizing, loading priority, and page-weight review.
- Completed ship checks and updated canonical documentation.

## Work sequence

1. Export and optimize approved assets at appropriate dimensions and formats.
2. Place files at the manifest destination paths.
3. Replace all publication-blocking placeholders.
4. Add the approved PDF, tutor, credits, and contact destination.
5. Review both locales on desktop and mobile.
6. Verify keyboard interaction, focus visibility, reduced motion, and text alternatives.
7. Run lint, typecheck, tests, coverage, and production build.
8. Resolve or document every remaining deferred item.

## Out of scope

- CMS, database, authentication, or remote asset management.
- New page families not required by the approved content.
- 3D runtime unless separately approved through an ADR after an optimized model is supplied.

## Exit criteria

- No publication-blocking placeholder or generic thesis text remains.
- Every rendered image has approved alt text and credit metadata where required.
- PDF and contact actions have explicit approved destinations or are intentionally removed.
- Both locales pass manual responsive and accessibility review.
- The complete ship-check command set passes.
- Documentation, content matrix, feature status, milestones, and changelog reflect the released state.

## Risks

- Unoptimized plans and renders can dominate loading time.
- A public contact address must be explicitly approved before release.
- Late content changes can invalidate translations and visual sequencing.

## Expected files

- `content/landing-page.json`
- `public/images/**`
- Approved public PDF path
- `messages/es.json`
- `messages/en.json`
- Relevant application, test, and documentation files
- Applicable changelog entry
