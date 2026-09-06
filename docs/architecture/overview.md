# Overview

`tesis-ro` is a bilingual editorial landing page for presenting an architecture thesis visually. It prioritizes renders, plans, diagrams, and photographs over dense text.

The root route redirects to the default locale (`/es`). `/es` and `/en` share the same composition and load copy from `messages/<locale>.json`. The planned landing includes hero, concept, site, references, process, programme, the human-centered “Habitar Tomba” experience, proposal, materiality, optional physical model, reflection, and credits.

`content/landing-page.json` is the static editorial manifest for section order, visibility, navigation metadata, translation-key references, visual slots, and unresolved decisions. It does not contain localized visible copy and is not a remote data layer.

Components live in `src/components/`; routes live in `src/app/[locale]/`. The app has no database or endpoints in this phase. `AGENTS.md` is the operating contract; `CLAUDE.md` is an entry-point pointer for agents that auto-load it.

The localized page remains server-rendered. Scroll animation, SVG drawing, and pointer interaction are isolated in client components so that the narrative still renders meaningfully without JavaScript or when motion is reduced.
