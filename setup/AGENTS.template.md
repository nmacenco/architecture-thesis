# <project> — Agent Guidelines

> Plantilla operativa lista para copiar a la raíz de tu repo como `AGENTS.md`.
> Sustituye los `<placeholders>` por los valores reales de tu proyecto y borra esta línea.

**Overview**: `<project>` es `<una frase de dominio — rellénala tú>`. Stack:
Next.js (App Router) + React + TypeScript `strict` + Tailwind CSS + Postgres (Supabase)
con `postgres` (postgres.js) + Drizzle ORM, validación con Zod, i18n con `next-intl`,
tests con Vitest (`node`). Gestor de paquetes canónico: `<pm>` (p. ej. `bun`).

Este archivo es el **contrato operativo**. Si respondes sin seguir el protocolo de abajo,
estás incumpliendo las reglas del repo.

---

## Task Classification & Required Context

Clasifica CADA petición antes de empezar y lee solo lo necesario:

**Tier 1 — Cambio funcional / arquitectura / datos / seguridad / UX / comportamiento documentado.**
Lee primero los docs canónicos relevantes:
- `docs/architecture/overview.md`, `docs/architecture/data-model.md`,
  `docs/architecture/config-env.md`, `docs/architecture/security-permissions.md`,
  `docs/architecture/testing.md`.
- `docs/features/<feature>.md` de la feature afectada (si no existe, la feature no existe).
- Para UX/UI: `docs/design/ui.md`, `docs/design/components.md`, `docs/design/ux.md`.

**Tier 2 — Cambio visual local sin impacto funcional/datos** (texto, espaciado, color de
un componente ya documentado). Lectura mínima: el archivo afectado y, si tocas tokens o el
inventario, `docs/design/ui.md` / `docs/design/components.md`.

**Re-clasifica** si a mitad de implementación aparece impacto en datos, API, seguridad o
comportamiento: sube a Tier 1 y lee los docs antes de continuar.

---

## Startup / Close Message Format

**Al inicio de cada respuesta de tarea** (una línea por marcador):

```
📄 Context: same|changed|new
📕 Skills: <skill|none> — why
📚 Docs consulted: <paths|none> — why
📝 Docs planned: <paths|none> — why
```

**Al cierre de cada respuesta de tarea**:

```
✅ Context status: completed|changed
📝 Docs updated: <paths|none> — why/why none
🧪 Checks run: <commands|none> — why
```

---

## Structure

```
src/
  app/                  # rutas (App Router); Server Components por defecto
    api/v1/             # route handlers REST versionados
  components/
    ui/                 # átomos/primitivas reutilizables
    <feature>/          # composiciones por feature
  db/
    client.ts           # exporta `db` (única instancia de postgres())
    schema/
      users.ts          # tabla `users` (objetivo de owner_id)
      <entity>.ts       # una tabla por archivo de feature
      index.ts          # re-exporta todo el schema
  hooks/                # hooks de cliente ("use client")
  lib/
    api-helpers.ts      # envelope, withAuth, parsePagination, taxonomía de errores
    patch.ts            # partialWithoutDefaults (security edge, 100% coverage)
    auth.ts             # stub de sesión: getSession()
    validators.ts       # esquemas Zod por entidad
    # + parsers/formatters puros
  types/                # tipos compartidos
drizzle/                # migraciones generadas (inmutables)
scripts/                # db-migrate.ts, seed.ts, db-reset.ts (pueden instanciar postgres())
__tests__/              # tests Vitest (node)
  unit/                 # funciones puras, schemas Zod, route handlers
  helpers/              # utilidades de test (buildSession, jsonRequest…)
docs/                   # fuente canónica de documentación
messages/               # <locale>.json para next-intl
```

---

## Core Conventions

- **Server Components por defecto**; `"use client"` SOLO cuando haya interacción o hooks
  de cliente (estado, efectos, eventos).
- Alias de import `@/` (apunta a `src/`).
- Archivos en **kebab-case**; componentes en **PascalCase**.
- **Código en inglés** siempre; strings visibles SOLO vía i18n (nunca literales en JSX/TSX).
- Importa `db` desde `@/db/client`. **Nunca** instancies `postgres()` fuera de `src/db/**`
  (ni `scripts/db-*.ts` aparte de los autorizados).
- **Zod en el edge** (route handlers / server actions); no revalides contratos internos.
- **Una sola librería de iconos** por archivo (p. ej. `lucide-react`); no la mezcles.
- Sin CSS inline: Tailwind + helper `cn()` para componer clases.
- **Nunca** hardcodees secretos; ninguno en variables `NEXT_PUBLIC_*`.
- Ramas y commits en inglés: `feature/`, `fix/`, `chore/`; commits convencionales
  (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`).

---

## Language Policy

Separación estricta **código vs contenido**:

- **Código en inglés, sin excepción**: identificadores, archivos/carpetas/rutas, tests,
  tablas/columnas/constraints/migraciones, claves JSON (incl. claves de mensajes),
  comentarios, logs, commits, ramas, códigos de error de API, `data-ui`/`data-testid`,
  query-strings y claves de `localStorage`. **Sin acentos ni `ñ`** en identificadores.
- **Contenido visible SOLO vía i18n**: cada string va por `next-intl`, con claves en
  `messages/<locale>.json`. Locale por defecto `<default-locale>`; si falta una traducción,
  cae al por defecto. Un PR con un literal visible queda **bloqueado**.
- **Docs internos en `<team-language>`** (`docs/**`, `AGENTS.md`, ADRs, changelog, PRs).
  Seed/fixtures pueden ir en cualquier idioma (simulan datos de usuario); los
  identificadores del script siguen en inglés.
- **Cómo arreglar una violación**: extrae el literal a `messages/<default-locale>.json`
  con una clave en inglés y referénciala con `getTranslations()` (server) o
  `useTranslations()` (client).

---

## API Conventions

- Mutaciones envueltas en `withAuth(handler)` (lee la sesión).
- Helpers de envelope de respuesta: `apiSuccess`, `apiCreated`, `apiNoContent`,
  `apiError`, `apiValidationError`.
- Paginación con `parsePagination(url)` (`page`/`limit`/`offset`; limit por defecto 25,
  máx 100; endurecido contra `NaN`/floats).
- Esquemas de PATCH/update derivados con `partialWithoutDefaults(createXSchema)`
  (de `@/lib/patch`), **NO** con `.partial()`: en Zod v4, `.partial()` aún inyecta los
  `.default()` del create para claves ausentes, así que un update parcial pisaría columnas
  no enviadas (p. ej. `price -> 0`, `tags -> []`). El helper elimina esos defaults.

**Error taxonomy** (no inventes códigos sin actualizar esta tabla y los helpers; nunca
filtres stack traces al cliente):

| Code             | HTTP | Uso                                              |
|------------------|------|--------------------------------------------------|
| VALIDATION_ERROR | 400  | Body/params inválidos (Zod)                      |
| UNAUTHORIZED     | 401  | Sin sesión                                       |
| FORBIDDEN        | 403  | Con sesión, sin permiso                          |
| NOT_FOUND        | 404  | Recurso inexistente                              |
| DUPLICATE        | 409  | Violación de unique de Postgres (`23505`)        |
| DB_ERROR         | 500  | Error de base de datos                           |
| SERVER_ERROR     | 500  | Error inesperado                                 |

---

## Postgres / Drizzle Conventions

- **Dos connection strings** en `.env.local` (gitignored; `.env.example` es la plantilla):
  - **Pooled** (transaction pooler, puerto **6543**, `prepare: false`) para el runtime app.
  - **Session pooler** (puerto **5432**) para migraciones / `drizzle-kit` / seed (soporta el
    advisory lock del migrator).
  - Evita la conexión **directa** (`db.<PROJECT_REF>.supabase.co`): es IPv6-only y suele no
    resolver en IPv4.
- **Tipos canónicos**: timestamps `timestamp({ withTimezone: true, mode: "date" })`; dinero
  como `doublePrecision` (no `numeric`); enums como `text({ enum: [...] })` (sin `pgEnum`);
  ids como `text` (UUID).
- **Soft delete** con `deleted_at TIMESTAMP NULL` (las queries por defecto filtran
  `deleted_at IS NULL`; el hard delete requiere confirmación explícita del usuario).
  `owner_id` FK → `users.id` en los registros (la tabla `users` vive en
  `src/db/schema/users.ts`); `created_at`/`updated_at` por defaults + trigger de UPDATE.
- **Schema-first**: tabla en `src/db/schema/<entity>.ts`, re-exportada desde
  `src/db/schema/index.ts`. Genera migración con `<pm> run db:generate`. SQL custom
  (triggers, PL/pgSQL) con `drizzle-kit generate --custom --name=<n>`.
- Prefijo de migración **unix** (epoch) en `drizzle.config.ts` (`migrations.prefix: "unix"`):
  evita colisiones cuando varios ramifican en paralelo.
- **Migraciones inmutables** una vez aplicadas: nunca edites/reordenes; para revertir,
  escribe una migración NUEVA.
- **`git fetch origin main && git rebase origin/main` ANTES de generar**, para que la
  migración nazca sobre el último schema.
- Toda FK declara un `ON DELETE` explícito. Indexa cualquier columna usada en
  `WHERE`/`ORDER BY`/como FK. Búsqueda case-insensitive con `ilike()`. Escrituras
  multi-tabla dentro de `db.transaction(...)`.
- **Operaciones destructivas** (`DROP`/`TRUNCATE`/`ALTER..DROP`/cambios de `ON DELETE`)
  requieren confirmación explícita del usuario; el reset (`DROP SCHEMA public CASCADE`) es
  solo para desarrollo.

---

## Auth (prototype)

- Existe un **stub de sesión** en `@/lib/auth` con firma estable
  `getSession(): Promise<Session | null>`, donde `Session = { user: { id, role } }`. En el
  prototipo devuelve un usuario fijo de desarrollo (o `null` para simular sin sesión).
- `withAuth(handler)` lee `getSession()`, devuelve **401 UNAUTHORIZED** si no hay sesión y,
  si la hay, invoca `handler(session, req)` — por eso los handlers leen `session.user.id`
  (p. ej. como `owner_id`).
- En Server Components usa `getSession()` directamente; **nunca** expongas secretos ni datos
  de sesión al cliente; nada de tokens en `NEXT_PUBLIC_*`.
- Cuando se implemente auth real, mantén la **misma firma** de `getSession()`/`Session`
  para no tocar los call sites, documenta el flujo en
  `docs/architecture/security-permissions.md` y crea/actualiza un ADR en `docs/decisions/`.

---

## Testing Minimums

- Vitest con `environment: "node"` (sin jsdom, sin RTL). Coverage con `@vitest/coverage-v8`.
- **Obligatorio**:
  - Funciones puras de `src/lib/*` (parsers/validators/formatters): cubre cada rama relevante.
  - Esquemas Zod: al menos un caso válido + uno inválido por regla crítica.
  - **Edge de seguridad** (`src/lib/api-helpers.ts`, el mapper de errores de dominio, el
    helper de patch `src/lib/patch.ts`): **100%** vía thresholds de Vitest — perderlo rompe
    el build.
  - Route handlers nuevos/cambiados: como mínimo puerta de auth (401), validación de body
    (400) y mapeo de errores de dominio (404/409/403).
- **Mockea SOLO los edges** (red, fs, Postgres, sesión); **nunca** la lógica de negocio.
  Patrón: un `Proxy` encadenable hace de cliente Drizzle; cada test fija el resultado del
  `SELECT` y el retorno de sesión. El core real corre contra esa DB mockeada.
- **Bug productivo => test RED primero**; el test rojo y el fix viajan en el mismo PR. Sin
  `.skip` para silenciar flakies (un `.skip` mergeado bloquea la release).
- **NO se testea** (deliberado): componentes React, Server Components que solo leen+renderan,
  alias de tipos/re-exports, wrappers triviales de `db.select`.

---

## Documentation sync

`docs/` es la fuente canónica. **Regla: sin `docs/features/<feature>.md`, la feature no existe.**

| Tipo de cambio          | Doc a actualizar                          |
|-------------------------|-------------------------------------------|
| Funcional / API         | `docs/features/<feature>.md`              |
| Base de datos / schema  | `docs/architecture/data-model.md`         |
| UX / UI                 | `docs/design/{ui,components,ux}.md`       |
| Decisión / trade-off    | nuevo ADR en `docs/decisions/`            |
| Config / env            | `docs/architecture/config-env.md`         |
| Cualquier cambio shippable | entrada en `docs/changelog/YYYY/YYYY-MM-DD.md` |

`docs/README.md` es el índice y se mantiene al día.

---

## Done gates

- **Definition of Ready**: objetivo testeable explícito, scope claro, archivos afectados
  identificados, riesgos visibles.
- **Ship check**: lint + typecheck + tests en verde; aserciones significativas; migración
  aplicada localmente y reflejada en `data-model.md`; doc de feature creado/actualizado
  (sin doc = bloqueado).

---

## Commands

> Sustituye `<pm>` por tu gestor canónico (`bun`, `npm`, `pnpm`, `yarn`).
> Swap note: con `npm`/`yarn` los scripts se invocan igual (`<pm> run <script>`); `bun` y
> `pnpm` aceptan también el atajo `<pm> <script>`.

```bash
<pm> run dev             # servidor de desarrollo
<pm> run build           # build de producción
<pm> run lint            # ESLint
<pm> run typecheck       # tsc --noEmit
<pm> run test            # Vitest (node), una pasada
<pm> run test:coverage   # tests + coverage (thresholds)
<pm> run db:generate     # genera migración desde el schema
<pm> run db:migrate      # aplica migraciones (session pooler)
<pm> run db:studio       # Drizzle Studio
```

---

## Skills

- Como máximo **1 skill primaria por paso** (+1 secundaria solo si la tarea cruza dos
  dominios).
- Orden de prioridad sugerido:
  1. Mapeo de codebase al entrar a un área desconocida o antes de un refactor amplio.
  2. Revisión de plan arquitectónico antes de trabajo grande.
  3. Best-practices de React/Next.js para componentes y data fetching.
  4. Performance / Core Web Vitals para rendering y caching.
  5. Pulido UI/UX para trabajo de diseño.
- **Instalación** (una vez; cargan en sesiones NUEVAS):
  `npx skills add <repo-or-url> --skill <name> --global --agent claude-code --yes`.
  Gotcha: en repos "plugin-structured" (`plugins/<x>/skills/<name>/`) el `--skill <name>`
  puede no resolver; pasa la URL directa del árbol.

---

## Memory (optional)

Si hay un servidor de memoria/MCP disponible:

- **Recuerda antes** de trabajo no trivial (recupera decisiones y contexto previos).
- **Guarda** decisiones, bugfixes y patrones reutilizables (entradas cortas, buscables,
  específicas del repo).
- **Nunca** guardes secretos, tokens, valores crudos de env, cookies ni PII.
- Antes de cerrar la sesión, escribe un resumen de sesión.
