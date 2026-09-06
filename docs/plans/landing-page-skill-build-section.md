# Project Skill Plan — Build Landing Section

> Status: completed · Last updated: 2026-09-06

## Objective

Create a project-specific `build-landing-section` skill that can implement, update, or audit one known landing-page module from its manifest ID while consistently applying the repository's content, localization, documentation, accessibility, responsive, and verification rules.

Example invocation:

```text
$build-landing-section experience
```

The skill supports the module workflow; it does not decide the editorial structure, invent missing copy, approve assets, or replace the numbered delivery plans.

## Proposed location and structure

Keep the skill versioned with the project so its behavior evolves with the landing page:

```text
.agents/skills/build-landing-section/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    └── module-checklist.md
```

Do not add scripts unless repeated deterministic validation cannot be expressed reliably through existing project tests. Do not duplicate `AGENTS.md` or canonical design documentation inside the skill.

## Invocation contract

Required input:

- One section ID present in `content/landing-page.json`.

Supported intent:

- Create a missing module.
- Update an existing module.
- Audit a module when the request explicitly asks for review rather than implementation.

The skill must reject or request correction for unknown or ambiguous IDs. It may resolve common display names to IDs only when the mapping is unique and documented.

## Required context loading

Before changing a module, the skill must read:

- The nearest `AGENTS.md`.
- `content/landing-page.json` and the target section entry.
- The relevant Spanish and English catalog namespaces.
- `docs/features/landing-page-sections.md` when it exists.
- `docs/design/ui.md`, `docs/design/components.md`, and `docs/design/ux.md`.
- The target component, shared primitives, neighboring sections, and relevant tests.

It should use the codebase graph first for structural discovery when this repository is indexed, then verify operated-on paths and fall back to exact source reads where coverage is unavailable.

## Skill workflow

1. Validate the requested section ID and determine whether the task is create, update, or audit.
2. Read the manifest contract, content keys, asset slots, section status, and neighboring modules.
3. Inspect reusable components before introducing new abstractions.
4. Identify unresolved editorial decisions; use placeholders for missing assets, but do not invent factual copy or credits.
5. Define the semantic source order and mobile composition before adding desktop enhancement.
6. Implement the smallest complete module and isolate client code to interactive boundaries.
7. Verify all content, asset, optional, and error states relevant to the section.
8. Review mobile, tablet, desktop, keyboard, touch, and reduced-motion behavior in proportion to the module.
9. Update the module registry, component inventory, design/UX documentation when behavior changed, and the changelog.
10. Run focused checks, then report files, decisions, remaining placeholders, and validation results.

## Mandatory mobile behavior

The skill must treat mobile as an equal implementation target:

- Start from a semantic single-column source order.
- Verify no horizontal overflow at 320 CSS pixels.
- Define intentional mobile media ratios rather than inheriting desktop heights blindly.
- Avoid desktop pinning and long scrub distances on mobile unless the interaction remains readable and performant.
- Provide touch and keyboard alternatives for interactive controls.
- Keep control targets and spacing suitable for touch.
- Preserve all meaningful content when hover, pointer precision, or animation is unavailable.
- Verify reduced motion independently from viewport width.
- Check heading wrapping, facts, captions, credits, and translated labels at mobile widths.
- Never mark a module complete with mobile behavior deferred to a later plan.

## Documentation behavior

For every implementation or meaningful update, the skill must maintain the module entry in `docs/features/landing-page-sections.md`. The entry records:

- Purpose, position, and component path.
- Translation namespace and manifest fields.
- Assets, expected ratios, credits, and alt-text behavior.
- Mobile, tablet, and desktop composition.
- Interactions, touch/keyboard behavior, and reduced motion.
- Section states, shared dependencies, tests, status, and unresolved decisions.

The skill updates `docs/design/components.md` when it creates or changes a reusable component, and `docs/design/ux.md` when interaction or responsive behavior changes. It creates a dedicated feature document only for a module whose complexity cannot be maintained clearly in the shared registry.

## Guardrails and stopping conditions

- Do not hardcode visible copy or accessible labels in JSX/TSX.
- Do not introduce a CMS, remote data source, new animation stack, or 3D runtime.
- Do not create a client component solely for layout or static content.
- Do not silently enable an optional section or remove a pending asset.
- Do not overwrite unrelated or user-owned changes.
- Do not claim visual completion when only static checks were run.
- Missing final imagery is not a blocker when the manifest defines a placeholder state.
- Missing section identity, contradictory manifest data, or an editorial choice that changes scope is a blocker and must be reported.

## Verification matrix

The skill chooses checks proportionate to the module, with these minimums:

| Module type | Required verification |
| --- | --- |
| Static editorial | Typecheck, relevant tests, mobile/desktop layout review |
| Data-driven list or facts | Above plus empty/optional-state and stable-key review |
| Interactive | Above plus keyboard, touch, cleanup, and reduced-motion review |
| Asset-heavy | Above plus dimensions, aspect ratio, loading, alt text, and missing-image state |
| Navigation-affecting | Above plus enabled/disabled anchors and mobile navigation review |

The full ship-check suite is required when the invocation completes the last module in a release batch or changes shared infrastructure with broad impact.

## Skill implementation tasks

1. Create the repository-local skill with `skill-creator` tooling.
2. Keep `SKILL.md` focused on routing, workflow, guardrails, and required project sources.
3. Put the detailed implementation and review checklist in `references/module-checklist.md`.
4. Add concise UI metadata consistent with the invocation contract.
5. Validate the package with the skill validation script.
6. Dry-run the skill against three representative cases without duplicating production work:
   - A static module such as `concept`.
   - An interactive module such as `experience`.
   - The optional disabled `physical-model` module.
7. Refine only issues demonstrated by those dry runs.

## Exit criteria

- `$build-landing-section <section-id>` has an unambiguous documented contract.
- The skill reads project sources rather than embedding stale copies of their rules.
- Mobile requirements are mandatory in the workflow, checklist, documentation, and completion report.
- Unknown sections and genuine editorial blockers stop safely.
- Placeholder assets do not prevent structural module work.
- Documentation and changelog synchronization are part of every implementation/update invocation.
- Skill package validation passes.
- Representative dry runs confirm static, interactive, optional, desktop, and mobile paths.

## Expected files

- `.agents/skills/build-landing-section/SKILL.md`
- `.agents/skills/build-landing-section/agents/openai.yaml`
- `.agents/skills/build-landing-section/references/module-checklist.md`
- `docs/features/landing-page-sections.md`
- Applicable changelog entry

## Implementation record

- Created the repository-local `build-landing-section` skill with focused entry
  instructions, UI metadata, and a detailed module checklist.
- Added the canonical twelve-module registry with responsive, accessibility,
  state, asset, localization, test, and unresolved-decision contracts.
- Validated the package with the skill-creator validator.
- Dry-ran `concept` as static editorial content, `experience` as an interactive
  candidate, and disabled `physical-model` without changing production modules.
  The runs confirmed pending assets remain non-blocking, interaction adds
  keyboard/touch/reduced-motion gates, and disabled sections are not enabled or
  added to navigation implicitly.
