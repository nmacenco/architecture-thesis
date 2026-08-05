# SVG-first immersive narrative

- **Date:** 2026-08-05
- **Status:** accepted

## Context

The thesis landing must become a progressive scroll narrative. No optimized digital model, final render set, or external map requirement currently exists.

## Decision

Use GSAP and Lenis for the scroll narrative, SVG paths for animated plans, and a local SVG for site context. Use Framer Motion only for isolated micro-interactions. Provide static reduced-motion behavior. Do not add Mapbox, React Three Fiber, drei, or `model-viewer` in this phase.

## Consequences

The experience remains self-contained, presentable without credentials, and usable on constrained devices. When an optimized `.glb` or `.gltf` model is available, evaluate React Three Fiber as the sole 3D runtime in a new ADR.
