---
name: build-landing-section
description: Build, update, or explicitly audit one tesis-ro landing-page section selected by its manifest ID. Use for section-module work governed by content/landing-page.json; do not use to choose the editorial structure, invent factual copy, approve assets, or implement multiple release-plan sections at once.
---

# Build Landing Section

Work on exactly one known section while preserving the manifest, localization,
responsive, accessibility, documentation, and verification contracts.

## Resolve the request

1. Require one section selector and infer `create` or `update` from the current
   code. Use `audit` only when the request explicitly asks for review.
2. Resolve an exact manifest `id` first. A case-insensitive exact match of a
   manifest `name` may be used only when it identifies one section; state the
   resolved ID before continuing. Do not guess from partial or fuzzy names.
3. Stop and request correction when the selector is absent, unknown, ambiguous,
   or resolves to more than one section.
4. Keep the request scoped to that module. Do not absorb neighboring-module or
   release-batch work unless it is a necessary shared dependency and remains
   within the user's authorization.

## Load project truth

Read the nearest `AGENTS.md`, then:

- `content/landing-page.json`, including the target entry, immediate neighbors,
  asset slots, visibility, navigation, and related unresolved decisions;
- the target namespaces in `messages/es.json` and `messages/en.json`;
- `docs/features/landing-page-sections.md` when present;
- `docs/design/ui.md`, `docs/design/components.md`, and `docs/design/ux.md`;
- the target component or current inline section, relevant shared primitives,
  neighboring sections, styles, and focused tests.

When Codebase Memory is available and this repository is indexed, use its graph
first for code structure, callers, callees, and reusable components. Check index
coverage for every operated-on code path and read exact source wherever coverage
is missing or the file type is excluded. Read documentation, catalogs, manifests,
styles, and other non-code sources directly.

Before implementation or audit, read
[references/module-checklist.md](references/module-checklist.md) and apply the
parts relevant to the module type.

## Decide whether work can proceed

- Treat pending or unavailable imagery as a supported placeholder state, not a
  blocker. Preserve the manifest asset identity, intended media role, translated
  alt-key behavior, credit status, and an intentional responsive ratio.
- Do not invent thesis facts, approved copy, credits, destinations, asset rights,
  or editorial decisions. If one is necessary to define the section identity or
  changes its scope, stop and report the manifest decision that must be resolved.
- Do not silently enable a disabled section, remove a pending asset, alter section
  order, or change navigation inclusion.
- For an audit, make no repository changes unless the user separately authorizes
  fixes. Report findings with file and line evidence, highest severity first.

## Implement the module

Establish semantic source order and the 320 CSS-pixel composition before desktop
enhancement. Build the smallest complete module using Server Components by
default; isolate browser APIs, hooks, and interaction in the narrowest client
boundary. Reuse established primitives before extracting a new abstraction.

Use Tailwind utilities as the default for module-local layout, spacing,
typography, responsive behavior, focus states, and visual styling. Keep
`globals.css` for design tokens, document-level defaults, shared motion or
keyframes, and selectors that Tailwind cannot express clearly. Do not add a
section-specific global class when colocated utilities communicate the same
contract, and migrate legacy section CSS when extracting that section rather
than rewriting unrelated modules.

Use only manifest-defined structure and assets. Read every visible string and
accessible label from the catalogs, preserving parity in Spanish and English.
Render pending, unavailable, optional, empty, and error states that apply to the
section. Never dynamically import an arbitrary component name from JSON.

Mobile is a completion gate. Preserve meaningful content without hover, precise
pointer input, JavaScript enhancement, or animation. Avoid desktop pinning and
long scrub distances on mobile. Interactive controls need touch and keyboard
operation, suitable target spacing, cleanup, and an independently verified
reduced-motion state.

## Synchronize and verify

For every implementation or meaningful update:

- maintain the module entry in `docs/features/landing-page-sections.md`;
- update `docs/design/components.md` for reusable-component changes and
  `docs/design/ux.md` for interaction or responsive-behavior changes;
- add the required dated changelog entry and link any new document from
  `docs/README.md`.

Run focused tests plus type checking, then the checks required by the checklist
for the module type. Run the complete repository ship-check suite when shared
infrastructure has broad impact or the invocation completes a release batch.
Static checks do not establish visual completion: distinguish reviewed viewport
and interaction states from unreviewed ones.

Finish with the repository's required close-message format and include the
resolved ID, intent, changed files, decisions preserved, pending placeholders,
mobile/desktop/reduced-motion review status, checks run, and remaining blockers.
