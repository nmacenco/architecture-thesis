# Data model

The current phase has no persistent data model. The public landing page consumes local translation catalogs and assets in `public/`.

The repository includes `content/landing-page.json`, a versioned static editorial manifest rather than a database. It records ordered sections, visibility and navigation metadata, translation-key references, asset slots, localization status, and unresolved editorial decisions. Localized visible copy remains in `messages/`; the manifest must not become a competing copy source.

If the project introduces remote editing, users, or persistent content, define a repository interface first. Only then evaluate Supabase (Postgres) with Drizzle and document schema, migrations, relationships, and access policy in this file.
