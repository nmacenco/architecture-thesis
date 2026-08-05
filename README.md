# tesis-ro

Bilingual editorial landing page for presenting an architecture thesis as a visual narrative.

## Development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The root route redirects to `/es`; the English version is available at `/en`.

## Content and visual material

- Spanish and English copy live in `messages/es.json` and `messages/en.json`.
- The main composition is in `src/app/[locale]/page.tsx`.
- Current image blocks are explicit placeholders. Replace them progressively with renders, plans, diagrams, and model photographs in `public/`, preserving alt text and proportions.

## Verification

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm test:coverage
pnpm build
```

See [`docs/README.md`](docs/README.md) for architecture and design decisions. `setup/` remains as the original blueprint reference until further notice.
