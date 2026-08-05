# Configuration and environment

This version requires no environment variables. The site uses only local content and does not consume external services.

Install dependencies with `pnpm install`; `pnpm-lock.yaml` is the only permitted lockfile. `pnpm-workspace.yaml` records the native dependency builds approved by pnpm.

When external services are introduced, add `.env.example`, never commit actual secrets, and document every variable here.
