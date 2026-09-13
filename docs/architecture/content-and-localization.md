# Content and localization

Public routes are `/es` and `/en`; Spanish is the default locale. `next-intl` handles routing and translations. Every visible key must exist in both files under `messages/`.

Current content is local: short copy, cards, context facts, credits, and labels live in the translation catalogs. Final images will be placed in `public/` and replace the landing-page placeholders.

`content/landing-page.json` defines the planned section structure and references catalog keys; it must not duplicate localized copy. Its Spanish `landing` namespace is an editorial working copy until stakeholder approval. Matching English keys currently reserve catalog shape for later editorial translation and must not be treated as publication-ready content.

The manifest records assets as `pending`, `candidate`, `approved`, or `unavailable`. Pending and unavailable assets have no source path. Only approved project-relative paths may be rendered as final media. A bounded module may expose a project-relative candidate as an editorial preview when the composition requires review, but it must keep the candidate status and show a persistent translated pending treatment. A grouped treatment is valid only when every preview remains unambiguously associated with it visually and accessibly; candidate media is not publication-ready.

If the project later requires remote editing, users, or persistence, first define a repository interface. Supabase and Drizzle can then be introduced behind that boundary without coupling the UI to database queries.
