# Components

- **Site header**: anchor navigation, monogram, and language selector.
- **Editorial section**: narrative block with label, headline, and concise copy.
- **Media placeholder** (`src/components/landing/media-placeholder.tsx`):
  identifiable visual reservation shared by extracted and legacy sections. It
  accepts an optional translated description so meaningful pending media exposes
  its manifest alt-key behavior without presenting the placeholder as final work.
- **Hero section** (`src/components/landing/hero-section.tsx`): Server Component
  for the manifest `hero` ID. It renders the full localized opening identity,
  pending/unavailable/approved primary-media states, and the next enabled anchor.
- **Landing section registry** (`src/components/landing/section-registry.ts`):
  compile-time known-ID map. It currently exposes only the implemented `hero`;
  later modules are added explicitly and JSON values never become import paths.
- **Reference card**: precedent with image, category, title, and link indicator.
- **Language switcher**: client control that preserves the route while switching between `/es` and `/en`.
- **Scroll narrative**: client boundary that coordinates Lenis and GSAP ScrollTrigger, and tears both down on unmount.
- **Plan reveal**: accessible inline SVG whose meaningful paths draw with scroll and are fully visible without motion.
- **Site map**: local accessible SVG diagram for context and project placement; it does not use a remote mapping service.
- **Image comparison**: pointer- and keyboard-operable plan/atmosphere comparison with translated labels and instruction.

Reuse these compositions before introducing variants. Every new component updates this inventory.
