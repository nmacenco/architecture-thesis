# Landing Page Plan 1 — Spanish Editorial Foundation and Content Manifest

> Status: in progress — implementation complete, stakeholder review pending · Last updated: 2026-09-06

## Objective

Define and approve the Spanish editorial structure for Centro de Artes Escenicas Tomba, and represent that structure in a local JSON manifest that becomes the single source of truth for section order, translation namespaces, visibility, and visual slots.

This plan does not integrate content into the rendered landing page and does not require final visual files.

The final thesis presentation supplies evidence and subject matter, but the landing page must not mirror its academic chapter order. The approved structure must turn that material into a spatial, human-centered narrative with “Habitar Tomba” as the bridge between programme and architectural proposal.

## Execution status

- [x] Fixed the twelve-section baseline and order.
- [x] Mapped presentation topics into a web-specific narrative.
- [x] Created `content/landing-page.json` with section, navigation, text-key, asset, and decision metadata.
- [x] Added the Spanish editorial working copy and reserved matching English keys.
- [x] Added manifest and catalog consistency tests.
- [x] Disabled the physical-model section until photography is confirmed.
- [ ] Approve the Spanish editorial working copy.
- [ ] Resolve or explicitly defer the decisions recorded in the manifest.

Plan 2 may use the implemented manifest contract for module preparation, but no unresolved value should be presented as verified or publication-ready.

## Deliverables

- Approved list and order of landing-page sections.
- Explicit mapping from presentation topics to landing-page sections so that no academic chapter is duplicated without adding web-specific value.
- Approved Spanish title, eyebrow, body, quote, facts, and credit copy for each retained section.
- Verified numerical, historical, institutional, and authorship claims.
- `content/landing-page.json` with section metadata and asset slots.
- Translation keys reserved in `messages/es.json` for every approved visible string.
- A consistency test covering unique section IDs, known translation keys, valid asset statuses, and unique asset IDs.
- Updated content matrix with every retained, deferred, or removed section identified.

## Content manifest boundary

The manifest is a static editorial index, not a database service and not a replacement for `next-intl` catalogs. It contains structure and references; visible copy remains in the locale catalogs.

Expected shape:

```json
{
  "sections": [
    {
      "id": "hero",
      "translationKey": "landing.hero",
      "enabled": true,
      "assets": [
        {
          "id": "hero-primary",
          "src": null,
          "type": "render",
          "altKey": "landing.hero.assets.primary.alt",
          "credit": null,
          "status": "pending"
        }
      ]
    }
  ]
}
```

Allowed initial asset statuses are `pending`, `candidate`, `approved`, and `unavailable`. An asset may keep `src: null` until Plan 3 selects a real file. Optional sections use `enabled: false`; they are not silently deleted from the editorial record.

Section numbers are presentation metadata derived from the enabled manifest order. They are not embedded in translated eyebrow copy, so disabling an optional section cannot leave a visible numbering gap.

## Baseline section architecture

The initial manifest must use this order:

1. `hero` — project introduction.
2. `concept` — memory and contemporary intervention.
3. `site` — context, history, location, and existing condition.
4. `references` — selected precedents and their specific lessons.
5. `process` — research, heritage diagnosis, and design transformation.
6. `programme` — uses, areas, capacities, and spatial organization.
7. `experience` — “Habitar Tomba”: users and spatial journeys.
8. `proposal` — the architectural sequence and principal spaces.
9. `materiality` — structure, envelope, sustainability, and acoustics.
10. `physical-model` — optional and disabled until publishable photography is confirmed.
11. `reflection` — final position and closing image.
12. `credits` — authorship, institution, tutor, contact, and PDF.

“General project confirmation” from the material request feeds `hero`, metadata, and `credits`; it is not a standalone page section. “File delivery” is an asset handoff protocol and must not appear as page content.

## Work sequence

1. Review the source copy against the final thesis material.
2. Map the presentation index and supplied material request to the baseline web narrative without reproducing the presentation structure.
3. Decide which sections are essential, optional, deferred, or removed.
4. Confirm the “Habitar Tomba” user groups and city-to-halls journey.
5. Confirm the physical-model section, tutor, public contact, and PDF availability.
6. Approve concise Spanish copy section by section.
7. Define stable English JSON IDs and translation keys.
8. Create the manifest and Spanish catalog entries.
9. Add consistency tests and synchronize the master matrix.

## Out of scope

- English translation.
- Image optimization or file selection.
- Component redesign.
- Runtime rendering from the manifest.
- PDF integration and publication QA.

## Exit criteria

- No approved Spanish string remains only in a planning document.
- Every enabled section has a unique ID and valid translation namespace.
- Every planned visual has a unique asset ID, type, status, and alt-text key.
- All factual claims are verified or explicitly marked as unresolved.
- The physical-model, credits, contact, and PDF decisions are recorded.
- “Habitar Tomba” has approved user groups, route stages, copy, and a visual slot for layered circulation.
- The final structure is demonstrably distinct from the thesis presentation index rather than a chapter-for-chapter transcription.
- Manifest and Spanish catalog consistency tests pass.

## Risks

- Unverified thesis claims can block copy approval.
- Creating translation keys before the section list is stable would cause avoidable rework.
- Storing full copy in both the manifest and locale catalogs would create competing sources of truth.

## Expected files

- `content/landing-page.json`
- `messages/es.json`
- `src/i18n/catalogs.test.ts` or a focused content-manifest test
- `docs/plans/landing-page-content-matrix.md`
- `docs/features/architecture-thesis-landing.md`
- Applicable changelog entry
