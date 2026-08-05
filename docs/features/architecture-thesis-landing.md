# Feature: architecture thesis editorial landing page

> Status: shipped · Last updated: 2026-08-05

## Purpose

Present an architecture thesis as a bilingual visual narrative. The scroll is the primary interface: each stage pairs concise copy with a visual scene, and transitions preserve visual continuity instead of behaving as disconnected slides. It includes hero, concept, context, references, process, program, proposal, materiality, model, reflection, and credits. It does not include a CMS, database, authentication, final PDF, interactive mobile menu, external map provider, or 3D runtime.

## Architecture and flow

`/` redirects to the default locale. `src/app/[locale]/page.tsx` renders the landing page; `next-intl` loads `messages/es.json` or `messages/en.json`. The selector preserves the route when changing locale. Client-only scene components use GSAP and Lenis for scroll motion, SVG paths for plan drawing, and Framer Motion for isolated micro-interactions. Final renders and plans replace the local visual stand-ins from `public/`.

The context scene uses a local SVG map. The process scene reveals a plan as the reader scrolls. The proposal remains visible on desktop while its plan/render comparator can be controlled with pointer or keyboard input. All scenes retain a readable static state when reduced motion is requested.

## i18n and accessibility

All visible content and accessible labels come from message catalogs. `es` and `en` are supported; Spanish is the public fallback. Final images require descriptive alt text. SVG scenes have text alternatives; the comparison control has a translated instruction and native range-input keyboard support.

## Tests

- Routing: supported locales, default locale, and mandatory prefix.
- Catalogs: matching translation keys in both languages.
- Delivery validation: lint, typecheck, test, coverage, and build.
- Manual interaction review: keyboard comparison control, reduced-motion fallback, and desktop/mobile scene behavior.

## TODOs

- Replace placeholders with final renders, plans, diagrams, photographs, and PDF.
- Define mobile navigation when needed.
