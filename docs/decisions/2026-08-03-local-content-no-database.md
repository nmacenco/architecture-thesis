# Local content without a database

- **Date:** 2026-08-03
- **Status:** accepted

## Context

The first version is a visual and narrative landing page with no current need for users, remote editing, or persistence.

## Decision

Use local translation catalogs and local assets as the content source. Do not install Supabase, Postgres, Drizzle, auth, or APIs.

## Consequences

The initial delivery has less infrastructure and is easy to version. When administrable content is needed, introduce a repository boundary before adopting Supabase and Drizzle.
