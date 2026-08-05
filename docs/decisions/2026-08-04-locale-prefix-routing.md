# Locale prefix routing

- **Date:** 2026-08-04
- **Status:** accepted

## Context

The reference blueprint uses a cookie without a locale in the URL. The thesis must be shareable and presentable in Spanish and English with unambiguous URLs.

## Decision

Use `next-intl` with mandatory `/es` and `/en` prefixes; the root route redirects to Spanish.

## Alternatives considered

- **Cookie with a single URL** — rejected because a shared URL would not preserve language.

## Consequences

Routes are explicit and shareable. Every new public route must exist under the `[locale]` segment.
