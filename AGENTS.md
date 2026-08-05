# tesis-ro — Agent Guidelines

**Overview**: `tesis-ro` is a bilingual editorial landing page that communicates an architecture thesis through renders, plans, diagrams, and concise narrative. Stack: Next.js (App Router) + React + TypeScript `strict` + Tailwind CSS + `next-intl` + Vitest (`node`). Canonical package manager: `pnpm`.

This file is the repository's operating contract.

## Task Classification & Required Context

Classify every request before starting:

- **Tier 1 — functional, architecture, content, i18n, accessibility, UX, or documented behavior.** Read `docs/architecture/overview.md`, `content-and-localization.md`, `data-model.md`, `config-env.md`, `security-permissions.md`, `testing.md`, the affected feature, and `docs/design/{ui,components,ux}.md` for UI work.
- **Tier 2 — local visual change.** Read the affected file and the applicable design document.
- Reclassify as Tier 1 when content, localization, accessibility, or architecture is affected.

## Startup / Close Message Format

At the start of a task, communicate:

```text
📄 Context: same|changed|new
📕 Skills: <skill|none> — why
📚 Docs consulted: <paths|none> — why
📝 Docs planned: <paths|none> — why
```

At the end of a task, communicate:

```text
✅ Context status: completed|changed
📝 Docs updated: <paths|none> — why/why none
🧪 Checks run: <commands|none> — why
```

## Structure

```text
src/
  app/[locale]/          # localized App Router routes; Server Components by default
  components/            # reusable components and landing-page compositions
  i18n/                  # next-intl routing, navigation, and request configuration
  proxy.ts                # localization middleware
messages/                 # es/en catalogs: current source of visible content
public/                   # public renders, plans, diagrams, photographs, and PDF
docs/                     # canonical architecture, design, feature, and decision docs
```

## Core Conventions

- Use Server Components by default; use `"use client"` only for client interaction or hooks.
- Use the `@/` alias for `src/`; use kebab-case file names and PascalCase component names.
- Use one icon library per file (`lucide-react` in the current codebase).
- Do not use inline CSS; use Tailwind or global design-system rules.
- Never hardcode secrets or expose sensitive values through `NEXT_PUBLIC_*` variables.
- Use English branch names and conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).

## Language Policy

- Code, routes, files, identifiers, comments, tests, and JSON keys must be in English, without accents or `ñ`.
- All visible content and translatable accessible labels belong in `messages/es.json` and `messages/en.json`; user-facing literals are forbidden in JSX/TSX.
- Spanish is the default locale. Public URLs use `/es` and `/en`; do not change this prefix strategy without an ADR.
- **All project documentation is written in English**: `README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/**`, ADRs, plans, and changelog entries. `setup/` is an external reference blueprint and remains in its original language unless explicitly requested otherwise.

## Content, Data, and Security

- The app is public and static: it has no auth, REST API, database, migrations, Supabase, Drizzle, or required environment variables.
- Current content resides in local catalogs. Before introducing remote editing or persistence, define a repository interface and record an ADR; UI must not couple to a data provider.
- If an API or data boundary is introduced, validate with Zod at the edge, protect secrets, and add security tests before exposing it.

## Testing Minimums

- Vitest uses `environment: "node"`.
- Every pure routing, content, or localization utility covers its relevant branches; i18n changes test both locales and catalog consistency.
- A production bug ships with a regression test. Do not merge `.skip`.
- Until API/auth/data exist, there is no security edge to cover. When one is introduced, its helpers need 100% coverage and thresholds in `vitest.config.mts`.

## Documentation Sync

`docs/` is canonical. Without `docs/features/<feature>.md`, a feature does not exist.

| Change | Required documentation |
|---|---|
| Functional behavior, content, or i18n | `docs/features/<feature>.md` |
| Design, components, or accessibility | `docs/design/{ui,components,ux}.md` |
| Decision with meaningful alternatives | ADR in `docs/decisions/` |
| Configuration or dependencies | `docs/architecture/config-env.md` |
| Data or future persistence | `docs/architecture/data-model.md` |
| Every shippable change | `docs/changelog/YYYY/YYYY-MM-DD.md` |

Link every new document from `docs/README.md`.

## Done Gates

- **Definition of Ready**: explicit testable objective, clear scope, affected files, and visible risks.
- **Ship check**: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm test:coverage`, and `pnpm build` pass; documentation and changelog are synchronized.

## Commands

```bash
pnpm dev
pnpm build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
```

## Skills and Memory

- Use at most one primary skill per step; prioritize architectural review for structural changes and UI/UX skills for visual work.
- When persistent memory is available, retrieve decisions before non-trivial work and store only durable technical knowledge. Never store secrets, tokens, cookies, or personal data.
