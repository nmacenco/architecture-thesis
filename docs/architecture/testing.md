# Testing

The project is validated with ESLint, strict TypeScript, Vitest, and the Next.js production build. `vitest.config.mts` runs tests in Node and generates V8 coverage.

Pure routing and content logic covers its relevant branches, including supported locales and catalog integrity. Modules that depend on the Next.js runtime are verified through build and integration when they acquire custom logic. Purely editorial components are reviewed through build, responsive behavior, and basic accessibility. When a security boundary exists (API, auth, or data access), its helpers must have a 100% coverage threshold.

The landing-page manifest tests enforce section order and uniqueness, asset identity and status rules, resolvable locale keys, navigation-anchor uniqueness, and valid unresolved-decision references. Catalog parity remains mandatory while English landing copy is marked as pending editorial translation.
