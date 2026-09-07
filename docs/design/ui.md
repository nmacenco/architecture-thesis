# Visual system

The tone is editorial and appropriate for an architecture studio: expressive serif type for headlines, technical sans serif for metadata, abundant negative space, and a terracotta palette.

The landing is a continuous visual narrative, not a vertical deck of autonomous
slides. Shared tokens and primitives provide coherence, but sections must not
repeat a complete heading-copy-media shell by default. Composition should derive
from each section's evidence and narrative role, varying scale, density,
alignment, media relationship, negative space, and transition rhythm when the
content supports it. Repetition is valid only when it intentionally establishes
comparison or cadence; novelty without an editorial reason is equally invalid.

The color system uses semantic CSS custom properties. Light mode pairs `--bg-main` (`#FAF7F5`) and `--bg-surface` (`#FFFFFF`) with `--text-primary` (`#2C130B`) and `--text-secondary` (`#6E4334`). Brand accents are `--color-primary-base` (`#CF6D55`), `--color-primary-hover` (`#A94F39`), `--color-secondary-base` (`#A5573C`), and `--color-terracotta-dark` (`#532316`). Dark mode is activated with `[data-theme="dark"]` and overrides the background, border, and text tokens.

Motion is a content device, not decoration. Use a short reveal (`power2.out`), progress-linked SVG strokes, and a single desktop-only pinned proposal scene. Typography may establish the pace between scenes. Prefer opacity and transform changes; do not use continuous decorative parallax. Reduced-motion mode renders the final visual state without scroll-driven animation.

Images structure the reading experience. Until final assets exist, use identifiable placeholders that must be replaced by renders, plans, diagrams, or photographs while preserving their proportions and alt text.
