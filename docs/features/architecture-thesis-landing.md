# Feature: architecture thesis editorial landing page

> Status: shipped · Last updated: 2026-08-04

## Purpose

Present an architecture thesis as a bilingual visual narrative. It includes hero, concept, context, references, process, program, proposal, materiality, model, reflection, and credits. It does not include a CMS, database, authentication, final PDF, or interactive mobile menu.

## Architecture and flow

`/` redirects to the default locale. `src/app/[locale]/page.tsx` renders the landing page; `next-intl` loads `messages/es.json` or `messages/en.json`. The selector preserves the route when changing locale. Real renders and plans will replace placeholders from `public/`.

## i18n and accessibility

All visible content and accessible labels come from message catalogs. `es` and `en` are supported; Spanish is the public fallback. Final images require descriptive alt text.

## Tests

- Routing: supported locales, default locale, and mandatory prefix.
- Catalogs: matching translation keys in both languages.
- Delivery validation: lint, typecheck, test, coverage, and build.

## TODOs

- Replace placeholders with final renders, plans, diagrams, photographs, and PDF.
- Define mobile navigation when needed.
