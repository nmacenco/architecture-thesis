# Content and localization

Public routes are `/es` and `/en`; Spanish is the default locale. `next-intl` handles routing and translations. Every visible key must exist in both files under `messages/`.

Current content is local: short copy, cards, context facts, credits, and labels live in the translation catalogs. Final images will be placed in `public/` and replace the landing-page placeholders.

If the project later requires remote editing, users, or persistence, first define a repository interface. Supabase and Drizzle can then be introduced behind that boundary without coupling the UI to database queries.
