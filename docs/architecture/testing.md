# Testing

The project is validated with ESLint, strict TypeScript, Vitest, and the Next.js production build. `vitest.config.mts` runs tests in Node and generates V8 coverage.

Pure routing and content logic covers its relevant branches, including supported locales and catalog integrity. Modules that depend on the Next.js runtime are verified through build and integration when they acquire custom logic. Purely editorial components are reviewed through build, responsive behavior, and basic accessibility. When a security boundary exists (API, auth, or data access), its helpers must have a 100% coverage threshold.

The landing-page manifest tests enforce section order and uniqueness, asset identity and status rules, resolvable locale keys, navigation-anchor uniqueness, and valid unresolved-decision references. Catalog parity remains mandatory while English landing copy is marked as pending editorial translation.

GitHub Actions runs the `CI` workflow for pull requests targeting `main` and pushes to `main`. Its `Quality gates` job installs the frozen pnpm lockfile and runs lint, strict type checking, tests, coverage, and the production build. Concurrent runs for the same pull request or branch cancel older in-progress runs.

CI is a quality gate only. Vercel's native Git integration remains responsible for preview and production deployments, and its deployment status remains a separate required check.
