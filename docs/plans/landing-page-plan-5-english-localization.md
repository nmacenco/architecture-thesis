# Landing Page Plan 5 — English Editorial Localization

> Status: blocked by Plan 4 · Last updated: 2026-09-06

## Objective

Produce an editorial English version of the approved Spanish experience while preserving factual meaning, architectural terminology, accessibility, and the shared section structure.

## Deliverables

- English editorial translation for every visible and accessible Spanish key.
- English alt text and interaction instructions.
- Consistent architectural names, measurements, credits, and institutional terminology.
- Catalog parity tests for `messages/es.json` and `messages/en.json`.
- Manual review of `/en` for layout expansion and navigation behavior.

## Work sequence

1. Establish a short terminology list for project-specific names.
2. Translate meaning and tone rather than sentence structure.
3. Translate accessible labels and image descriptions.
4. Verify names, numbers, units, and credits against the Spanish source.
5. Run catalog consistency tests.
6. Review responsive layouts in both locales.

## Out of scope

- Changing the approved section structure.
- Adding new visual assets.
- Final PDF publication.
- Introducing locale-specific page compositions.

## Exit criteria

- `/es` and `/en` expose matching content keys and section structure.
- English copy reads naturally and preserves the approved meaning.
- No user-facing Spanish literal appears on `/en`.
- Catalog, lint, typecheck, test, coverage, and build checks pass.

## Risks

- Literal translation can flatten the architectural narrative.
- Copy expansion can cause overflow in headings, facts, or controls.
- Proper names can become inconsistent without a terminology list.

## Expected files

- `messages/en.json`
- `src/i18n/catalogs.test.ts`
- Relevant feature and localization documentation
- Applicable changelog entry
