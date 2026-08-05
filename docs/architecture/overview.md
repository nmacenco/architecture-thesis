# Overview

`tesis-ro` is a bilingual editorial landing page for presenting an architecture thesis visually. It prioritizes renders, plans, diagrams, and photographs over dense text.

The root route redirects to the default locale (`/es`). `/es` and `/en` share the same composition and load copy from `messages/<locale>.json`. The landing includes hero, concept, site, references, process, program, proposal, materiality, model, reflection, and credits.

Components live in `src/components/`; routes live in `src/app/[locale]/`. The app has no database or endpoints in this phase. `AGENTS.md` is the operating contract; `CLAUDE.md` is an entry-point pointer for agents that auto-load it.
