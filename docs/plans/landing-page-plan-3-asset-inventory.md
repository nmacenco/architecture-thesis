# Landing Page Plan 3 — Asset Inventory and Selection

> Status: blocked by Plan 1; may run alongside Plan 2 · Last updated: 2026-09-06

## Objective

Identify the available thesis visuals, select a publication baseline, and map real source files to the asset slots established in `content/landing-page.json`.

## Deliverables

- Inventory of renders, plans, diagrams, photographs, model images, and the final thesis PDF.
- Publication baseline capped at 18 essential visual assets unless an explicit exception is documented.
- Candidate and approved status for each manifest asset.
- Project-relative destination, descriptive Spanish alt text, credit, and rights note for every approved asset.
- Decision for missing assets: replace, defer, derive from an existing drawing, or remove the visual slot.
- A base plan suitable for the “Habitar Tomba” layered circulation narrative, with legible public, artist/student, and service routes.
- Updated master matrix and manifest.

## Work sequence

1. Collect source files without renaming or converting them.
2. Match candidates to the manifest asset IDs.
3. Select the minimum visual sequence needed to explain the project.
4. Review quality, dimensions, legibility, rights, and credits.
5. Choose one primary asset and limited supporting assets per section.
6. Confirm that the journey diagram can explain the sequence from the city and public space to the silos, Nave Teatro, hall, and halls without duplicating the programme diagram.
7. Record approved destination paths and alt text.
8. Confirm whether model photography and the final PDF are publishable.

## Out of scope

- Image conversion and optimization.
- JSX integration.
- English alt-text translation.
- New 3D runtime or external media service.

## Exit criteria

- Every enabled section has enough approved or explicitly deferred visual material.
- The baseline contains no more than 18 essential assets unless the matrix explains why.
- Every approved asset has a source file, destination path, alt text, credit, and publication-rights status.
- No `Pending` asset is mistaken for publication-ready material.

## Risks

- Large drawing files may be unsuitable for web delivery without a separate export.
- Third-party reference images may require attribution or replacement.
- Too many similar renders can weaken the narrative and inflate page weight.

## Expected files

- `content/landing-page.json`
- `docs/plans/landing-page-content-matrix.md`
- Applicable changelog entry
