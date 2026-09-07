# Project Skill Plan — Audit Landing Flow

> Status: completed · Last updated: 2026-09-07

## Objective

Create a repository-local `audit-landing-flow` skill that reviews two or more
adjacent implemented sections, or the complete implemented landing, as one
continuous web narrative. It detects accumulated slide-like repetition that a
single-module workflow cannot assess reliably.

## Scope

The skill audits manifest order, boundary context, visual grammar, responsive
rhythm, transitions, motion, reduced motion, and accessibility across section
boundaries. It reads code and available rendered evidence, reports findings by
severity, and remains read-only unless fixes receive separate authorization.

It does not choose a new editorial structure, invent copy, approve assets, or
modify several modules implicitly. Section-local remediation is handed back to
`build-landing-section` using exact manifest IDs.

## Audit contract

- Input is a contiguous range of at least two manifest IDs or all implemented
  sections.
- Immediate enabled boundary neighbors are inspection context, not expanded
  implementation scope.
- Every section receives a visual-grammar inventory covering narrative job,
  dominant evidence, entry/exit, layout, media, rhythm, interaction, and motion.
- Every adjacent pair receives an interchangeability and transition review.
- Mobile, desktop, and reduced-motion conclusions distinguish rendered evidence
  from source-only inspection.
- Findings separate shared-flow corrections from section-local remediation.

## Relationship with the build skill

`build-landing-section` prevents generic composition while implementing one
module. `audit-landing-flow` runs after a coherent section batch or milestone to
detect repetition and broken transitions across the accumulated experience. It
does not replace the build skill or need to run after every individual section.

## Exit criteria

- The skill has a discriminating description and explicit multi-section scope.
- The checklist operationalizes continuous narrative, justified repetition,
  content-derived variety, responsive flow, and accessibility.
- The audit defaults to read-only and routes exact module fixes through
  `build-landing-section`.
- The skill package validator passes.

## Files

- `.agents/skills/audit-landing-flow/SKILL.md`
- `.agents/skills/audit-landing-flow/agents/openai.yaml`
- `.agents/skills/audit-landing-flow/references/flow-checklist.md`
- `docs/design/ui.md`
- `docs/design/ux.md`
- `docs/changelog/2026/2026-09-07.md`
