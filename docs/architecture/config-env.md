# Configuration and environment

This version requires no environment variables. The site uses only local content and does not consume external services. Scroll animation uses GSAP, Lenis, and Framer Motion entirely in the browser; the site map is a local SVG rather than a Mapbox integration.

Install dependencies with `pnpm install`; `pnpm-lock.yaml` is the only permitted lockfile. `pnpm-workspace.yaml` records the native dependency builds approved by pnpm.

Node.js 24 is the supported project runtime and is declared through `engines.node` in `package.json`, aligning local development, GitHub Actions, and Vercel's default runtime. GitHub Actions uses `pnpm/setup`, which reads the exact pnpm version from the `packageManager` field, installs Node.js 24, and caches the pnpm store. CI then installs with `pnpm install --frozen-lockfile`. The workflow requires no environment variables or repository secrets.

Husky is a development dependency. The `prepare` package script installs the repository hooks during dependency installation, and `.husky/pre-commit` defines the local quality gates. It requires no environment variables or secrets.

Vercel's native Git integration owns preview and production deployments. GitHub Actions does not deploy the application or require Vercel tokens.

When external services are introduced, add `.env.example`, never commit actual secrets, and document every variable here.
