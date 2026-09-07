# Components

- **Site header**: anchor navigation, monogram, and language selector.
- **Editorial section**: narrative block with label, headline, and concise copy.
- **Media placeholder** (`src/components/landing/media-placeholder.tsx`):
  identifiable visual reservation shared by extracted and legacy sections. It
  accepts an optional translated description so meaningful pending media exposes
  its manifest alt-key behavior without presenting the placeholder as final
  work. Its reusable presentation uses complete, statically detectable Tailwind
  variants so position and background utilities cannot conflict through cascade
  order.
- **Hero section** (`src/components/landing/hero-section.tsx`): Server Component
  for the manifest `hero` ID. It renders the full localized opening identity,
  pending/unavailable/approved primary-media states, and the next enabled anchor.
  Responsive composition, typography, focus, and media presentation use Tailwind
  utilities rather than section-specific global selectors.
- **Concept section** (`src/components/landing/concept-section.tsx`): static
  Server Component for the manifest `concept` ID. It renders the complete
  localized narrative, semantic quote and keyword list, plus required and
  optional meaningful-media states. Its mobile-first palimpsest makes the
  collage dominant, crosses its edge with the diagram, and retains the optional
  existing photograph as a smaller memory fragment; this is a module-specific
  composition, not a reusable section shell.
- **Site section** (`src/components/landing/site-section.tsx`): manifest-driven
  Server Component for urban context, conditions, pending facts, map/plan slots,
  and optional/required photography. It uses semantic lists and definition data
  in a mobile-first grid while preserving unverified claims visibly as pending.
- **References section**
  (`src/components/landing/references-section.tsx`): manifest-driven Server
  Component for the precedent introduction and card list. Cards retain stable
  manifest asset identities, meaningful media states, optional reserved catalog
  content, and no link affordance until destinations are approved.
- **Process section** (`src/components/landing/process-section.tsx`):
  manifest-driven Server Component for the five design stages and the arc
  principles. It associates each ordered stage with a stable required diagram
  identity, preserves empty reserved locale collections, and presents every
  pending diagram in a mobile-first editorial sequence.
- **Landing media-state resolver**
  (`src/components/landing/media-state.ts`): shared pure guard used by extracted
  modules. Only approved project-relative sources are final media; candidate
  and pending records remain placeholders, while absent, unavailable, and
  malformed approved records resolve to the unavailable state.
- **Landing section registry** (`src/components/landing/section-registry.ts`):
  compile-time known-ID map. It currently exposes the implemented `hero`,
  `concept`, `site`, `references`, and `process`; later modules are added
  explicitly and JSON values never become import paths.
- **Reference card**: non-interactive precedent article with meaningful media,
  place, title, and lesson. It deliberately exposes no link indicator or hover
  affordance while destinations and image rights remain unresolved.
- **Language switcher**: client control that preserves the route while switching between `/es` and `/en`.
- **Scroll narrative**: client boundary that coordinates Lenis and GSAP ScrollTrigger, and tears both down on unmount.
- **Plan reveal**: accessible inline SVG whose meaningful paths draw with scroll and are fully visible without motion.
- **Site map** (`src/components/site-map.tsx`): local accessible SVG abstraction
  for the pending regional-map slot. Its translated alternative and visible
  pending caption come from the owning module; it does not use a remote mapping
  service or represent an approved final asset.
- **Image comparison**: pointer- and keyboard-operable plan/atmosphere comparison with translated labels and instruction.

Reuse these compositions before introducing variants. Every new component updates this inventory.
