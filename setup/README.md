# Blueprint de proyecto

Un **blueprint reutilizable** para arrancar proyectos sobre el stack Next.js + Supabase + Drizzle con disciplina de documentación y un contrato operativo claro para agentes IA y humanos. No es una plantilla de código que copias y rellenas: es el **conjunto de decisiones, convenciones y procesos** que hacen que un repo nuevo nazca con la misma calidad de ingeniería que el proyecto de referencia, sin heredar su dominio.

> **Stack-pinned, domain-agnostic.** El blueprint fija un stack concreto (Next.js App Router, Postgres vía Supabase, Drizzle, Zod, next-intl, Vitest) pero **es agnóstico al dominio**: no asume qué construyes. Donde una capa es intercambiable, lo señalamos con una nota de *swap*.

---

## Para quién es

- Un **desarrollador** que arranca un repo nuevo y quiere empezar con tooling, tests y docs ya enmarcados en vez de improvisar.
- Un **agente de IA** (p. ej. un coding agent) que va a operar en ese repo y necesita un contrato explícito de cómo trabajar, qué documentar y qué validar antes de dar algo por hecho.

Ambos leen los mismos archivos. La prosa va en `<team-language>`; el código, las rutas y los identificadores van en inglés.

---

## Los 3 pilares

| Pilar | Qué es | Dónde |
|---|---|---|
| **1. Scaffold del stack** | Cómo levantar el proyecto paso a paso: deps, Supabase + env, Drizzle, primera migración, i18n, Zod, Vitest, tooling. | [`01-project-setup.md`](./01-project-setup.md) |
| **2. Sistema de documentación** | El árbol de `docs/`, qué va en cada subcarpeta, plantillas y reglas de doc-sync (código manda, docs siguen). | [`02-docs-structure.md`](./02-docs-structure.md) |
| **3. Contrato operativo** | El `AGENTS.md` que define el protocolo de ejecución, las reglas duras y los done-gates para cualquiera (humano o IA) que toque el repo. | [`AGENTS.template.md`](./AGENTS.template.md) |

---

## Mapa de archivos

| Archivo | Propósito |
|---|---|
| [`README.md`](./README.md) | Este índice: qué es el blueprint, para quién, los 3 pilares, mapa de archivos, quickstart de 10 pasos y cómo adaptarlo a otro stack. |
| [`01-project-setup.md`](./01-project-setup.md) | Scaffold paso a paso: prerequisitos → `create-next-app` → deps → Supabase + env → config de Drizzle → db client + schema (incl. `users.ts`) → primera migración → i18n → Zod + api-helpers → Vitest → tooling → árbol final → verificación → swap notes. |
| [`02-docs-structure.md`](./02-docs-structure.md) | El sistema de documentación: filosofía, árbol de `docs/`, qué va en cada subcarpeta, plantillas embebidas (feature skeleton, ADR, changelog), reglas de doc-sync y `docs/README.md` como índice. |
| [`03-skills-and-tooling.md`](./03-skills-and-tooling.md) | Qué son las skills, set básico + instalación + tabla de routing, memoria/MCP opcional, tooling local (eslint/tsconfig/vitest/commits) y la relación CLAUDE.md ↔ AGENTS.md. |
| [`04-first-steps.md`](./04-first-steps.md) | Definition of Ready y walkthrough de la primera feature end-to-end con una entidad de ejemplo genérica (`note`), checklist del primer commit, pitfalls comunes y las plantillas de mensaje start/close en acción. |
| [`AGENTS.template.md`](./AGENTS.template.md) | El `AGENTS.md` agnóstico y operativo, listo para copiar, con placeholders que el lector adapta a su proyecto. |

---

## Quickstart (10 pasos)

Checklist condensada desde una carpeta vacía hasta la primera feature en producción. Cada paso enlaza al doc detallado.

1. **Prerequisitos + scaffold.** Instala el package manager canónico, crea el proyecto con `create-next-app` (TypeScript + Tailwind + App Router) y fija el alias `@/`. → [`01-project-setup.md`](./01-project-setup.md)
2. **Dependencias.** Añade `postgres`, `drizzle-orm` + `drizzle-kit`, `zod`, `next-intl`, `vitest` + `@vitest/coverage-v8` y la librería de iconos. → [`01-project-setup.md`](./01-project-setup.md)
3. **Supabase + env.** Crea el proyecto en Supabase, copia las **dos** connection strings (pooler 6543 con `prepare:false` para runtime; session 5432 para migraciones) a `.env.local`; commitea `.env.example`. Evita la conexión directa `db.<PROJECT_REF>.supabase.co` (IPv6-only). → [`01-project-setup.md`](./01-project-setup.md)
4. **Drizzle + db client.** Configura `drizzle.config.ts` (`dialect: "postgresql"`, `migrations.prefix: "unix"`), crea el cliente `db` boundaried en `src/db/client.ts` y el stub de sesión `{ user: { id, role } }`. → [`01-project-setup.md`](./01-project-setup.md)
5. **Schema + primera migración.** Define `src/db/schema/users.ts` (target de `owner_id`) + tu primera tabla, re-exporta desde `index.ts`, genera con el script `db:generate` y aplica. → [`01-project-setup.md`](./01-project-setup.md)
6. **i18n + edge.** Configura `next-intl` (locale por cookie `<APP>_LOCALE`, sin locale en URL, fallback a `<default-locale>`), Zod en el borde y los `api-helpers` (envelope + taxonomía de errores). → [`01-project-setup.md`](./01-project-setup.md)
7. **Tests + tooling.** Configura Vitest (`environment: "node"`), los thresholds de cobertura sobre el security-edge (`src/lib/patch.ts`, el error mapper, `api-helpers`), eslint, tsconfig strict y commits convencionales. → [`01-project-setup.md`](./01-project-setup.md) · [`03-skills-and-tooling.md`](./03-skills-and-tooling.md)
8. **Docs + AGENTS.** Levanta el árbol de `docs/` con sus plantillas, copia `AGENTS.template.md` como `AGENTS.md` y deja `CLAUDE.md` como puntero fino a él. → [`02-docs-structure.md`](./02-docs-structure.md) · [`03-skills-and-tooling.md`](./03-skills-and-tooling.md)
9. **Primera feature end-to-end.** Sigue el walkthrough con la entidad de ejemplo `note` (solo un ejemplo): schema → migración → Zod → ruta REST con `withAuth` → tests → doc de feature. → [`04-first-steps.md`](./04-first-steps.md)
10. **Cierre.** Pasa los done-gates (lint + typecheck + tests verdes, migración reflejada en `data-model.md`, doc de feature creada) y haz el primer commit convencional. → [`04-first-steps.md`](./04-first-steps.md)

---

## Cómo adaptarlo a otro stack

El blueprint fija un stack, pero cada capa de infraestructura es intercambiable. Lo que **no** cambia es la disciplina.

### Capas intercambiables (swap notes)

| Capa | Por defecto | Swaps válidos | Nota |
|---|---|---|---|
| **Base de datos** | Supabase (Postgres gestionado) | Cualquier Postgres (Neon, RDS, self-hosted) | La historia de las dos connection strings asume el pooler de Supabase; con otro Postgres ajusta pooling/SSL pero mantén pooled-runtime vs session-migrations. |
| **ORM** | Drizzle + `drizzle-kit` | Prisma | Cambian los comandos de migración y el schema-first; la regla de migraciones inmutables y `rebase antes de generar` se mantiene. |
| **i18n** | `next-intl` (cookie, sin locale en URL) | Cualquier lib de i18n | Mantén: contenido de usuario solo vía i18n, claves en inglés, fallback al `<default-locale>`. |
| **Package manager** | `bun` | `npm` / `pnpm` / `yarn` | Elige **uno** canónico y commitea solo su lockfile; los comandos van como `<pm> run <script>`. |
| **Iconos** | `lucide-react` | Cualquier set de iconos | Una sola librería, nunca mezcladas en un mismo archivo. |

### Lo invariante (no se toca)

- **La disciplina de docs**: "no `docs/features/<feature>.md` ⇒ la feature no existe". Código manda, docs siguen.
- **El contrato `AGENTS.md`**: protocolo de ejecución, reglas duras, plantillas de mensaje start/close.
- **Los done-gates**: lint + typecheck + tests verdes, cobertura 100% en el security-edge, migración aplicada y reflejada en `data-model.md`, doc de feature creada/actualizada.
- **La política de lenguaje**: código en inglés, contenido de usuario vía i18n, docs internos en `<team-language>`.
- **La frontera de validación**: Zod en el borde (rutas / server actions), nunca re-validar contratos internos.

> Framework (Next.js) y lenguaje (TypeScript `strict`) se consideran el núcleo del blueprint, no una capa intercambiable: si los cambias, esto deja de ser este blueprint.

---

## Convenciones del blueprint

- Los **placeholders** van entre ángulos: `<project>`, `<Entity>` / `<entity>`, `<feature>`, `<team-language>`, `<PROJECT_REF>`, `<REGION>`, `<APP>`, `<default-locale>`, `<pm>`. Sustitúyelos por los valores reales de tu proyecto al adoptar el blueprint.
- El **código, las rutas, los identificadores, los comandos y los nombres de variables de entorno** van siempre en inglés / tal cual. Solo la **prosa** va en `<team-language>`.
- La entidad `note` que aparece en el walkthrough es **solo un ejemplo** genérico (podría ser `item` o `task`); no forma parte del stack ni asume nada sobre tu dominio.
- Cada doc abre con su propósito y enlaza a sus hermanos por nombre de archivo, para que puedas navegar el blueprint sin este índice delante.