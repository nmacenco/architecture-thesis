# Landing Page Plan 4 — Spanish Content Integration

> Status: blocked by Plans 1–3 · Last updated: 2026-09-06

## Objective

Replace the generic thesis narrative with the approved Centro de Artes Escenicas Tomba content and make the Spanish landing page render from the content manifest and Spanish locale catalog.

## Deliverables

- Landing-page composition driven by `content/landing-page.json` where structural repetition benefits from it.
- Approved Spanish copy rendered from `messages/es.json`.
- Enabled, disabled, and deferred sections handled deliberately.
- “Habitar Tomba” rendered as the narrative bridge between programme and proposal, using human-centered route labels rather than academic subject-analysis copy.
- Approved asset slots wired to project-relative paths; unresolved slots remain explicit placeholders.
- Updated feature and design documentation for any composition or accessibility change.
- Spanish responsive and reduced-motion review.

## Work sequence

1. Add a typed content-manifest loader.
2. Map manifest sections to the existing landing-page compositions.
3. Replace generic Spanish copy with the approved catalog entries.
4. Implement the “Habitar Tomba” route sequence and its public, artist/student, and service layers with an accessible static reading.
5. Integrate available assets without hiding unresolved slots.
6. Adapt components only where the real content requires it.
7. Verify section anchors, keyboard behavior, reduced motion, and responsive layouts.
8. Run the project validation suite.

## Out of scope

- English editorial translation.
- Final image optimization pass.
- New CMS, API, database, authentication, or remote storage.
- New 3D technology.

## Exit criteria

- `/es` presents the approved Tomba narrative rather than generic thesis copy.
- Section order and visibility match the manifest.
- The transition from programme through “Habitar Tomba” to proposal reads as one spatial journey.
- Every visible Spanish string comes from `messages/es.json`.
- Missing visuals remain clearly identified as pending.
- Lint, typecheck, tests, coverage, and production build pass.

## Risks

- Real copy length may require layout changes on small screens.
- Conditional sections can create broken navigation anchors if not tested.
- Loading all candidate assets instead of the approved baseline can damage performance.

## Expected files

- `content/landing-page.json`
- `messages/es.json`
- `src/app/[locale]/page.tsx`
- Relevant files in `src/components/`
- Relevant tests and canonical documentation
- Applicable changelog entry
