# Feature: architecture thesis editorial landing page

> Status: shipped foundation; Tomba content in editorial review · Last updated: 2026-09-06

## Purpose

Present an architecture thesis as a bilingual visual narrative. The scroll is the primary interface: each stage pairs concise copy with a visual scene, and transitions preserve visual continuity instead of behaving as disconnected slides. The planned Tomba narrative includes hero, concept, context, references, process, programme, “Habitar Tomba” users and journeys, proposal, materiality, optional physical model, reflection, and credits. It does not include a CMS, database, authentication, final PDF, interactive mobile menu, external map provider, or 3D runtime.

## Architecture and flow

`/` redirects to the default locale. `src/app/[locale]/page.tsx` renders the landing page; `next-intl` loads `messages/es.json` or `messages/en.json`. The selector preserves the route when changing locale. Client-only scene components use GSAP and Lenis for scroll motion, SVG paths for plan drawing, and Framer Motion for isolated micro-interactions. Final renders and plans replace the local visual stand-ins from `public/`.

`content/landing-page.json` defines the Tomba composition's ordered section IDs, visibility, navigation metadata, translation references, asset slots, localization status, and unresolved decisions. Plan 2 integration has started: the extracted `hero` consumes its manifest contract and `landing.hero` catalog namespace through a typed accessor and known-ID registry. Remaining sections stay inline until their bounded module migrations.

The context scene uses a local SVG map. The process scene reveals a plan as the reader scrolls. The proposal remains visible on desktop while its plan/render comparator can be controlled with pointer or keyboard input. All scenes retain a readable static state when reduced motion is requested.

## i18n and accessibility

All visible content and accessible labels come from message catalogs. `es` and `en` are supported; Spanish is the public fallback. Final images require descriptive alt text. SVG scenes have text alternatives; the comparison control has a translated instruction and native range-input keyboard support.

## Tests

- Routing: supported locales, default locale, and mandatory prefix.
- Catalogs: matching translation keys in both languages.
- Delivery validation: lint, typecheck, test, coverage, and build.
- Manual interaction review: keyboard comparison control, reduced-motion fallback, and desktop/mobile scene behavior.

## TODOs

- Approve the Spanish `landing` editorial namespace and resolve or defer the manifest decisions.
- Replace the reserved English `landing` values with an editorial translation.
- Integrate the manifest through the section-module plan.
- Replace placeholders with final renders, plans, diagrams, photographs, and PDF.
- Define mobile navigation when needed.
