# Data model

The current phase has no persistent data model. The public landing page consumes local translation catalogs and assets in `public/`.

If the project introduces remote editing, users, or persistent content, define a repository interface first. Only then evaluate Supabase (Postgres) with Drizzle and document schema, migrations, relationships, and access policy in this file.
