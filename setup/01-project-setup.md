# `setup/01-project-setup.md` — Scaffold paso a paso

Esta guía te lleva desde una carpeta vacía hasta una app que **arranca, typechequea, pasa el lint y tiene tests verdes**. Cada paso trae los comandos exactos y el contenido exacto de cada archivo. Está pensada para copiar y pegar.

> **Cómo usar esta guía.** Sigue los pasos en orden. Donde fijamos una herramienta concreta (Supabase, Drizzle, next-intl, el gestor de paquetes) hay una nota de "swap" al final con qué podrías sustituir. La entidad de ejemplo es `note` (una nota genérica) — es **solo un ejemplo** para el walkthrough; en tu proyecto la reemplazas por tus entidades reales.

Documentos hermanos:
- `02-docs-structure.md` — el sistema de `docs/` y sus plantillas.
- `03-skills-and-tooling.md` — skills del agente y tooling local.
- `04-first-steps.md` — Definition of Ready y la primera feature end-to-end con `note`.
- `AGENTS.template.md` — el contrato operativo que copias al repo nuevo.

---

## Prerequisitos

| Requisito | Versión / nota |
|---|---|
| **Node.js** | LTS vigente (≥ 20). `node -v` para verificar. |
| **Gestor de paquetes** | Canónico de referencia: **bun** (`bun -v`). Equivalente válido: npm (incluido con Node), pnpm o yarn. |
| **git** | Cualquier versión reciente. `git -v`. |
| **Cuenta de Supabase** | Un proyecto Postgres creado en [supabase.com](https://supabase.com). Necesitarás las connection strings del paso 4. |

Instalar bun (si eliges el canónico de referencia):

```bash
curl -fsSL https://bun.sh/install | bash
```

> **Regla del gestor canónico.** Elige **uno** y úsalo en todo el repo: un único lockfile commiteado, un único `<pm> run <script>`. Mezclar gestores produce lockfiles divergentes y builds no reproducibles. En esta guía mostramos los comandos en bun con su equivalente npm; traduce al tuyo.

---

## Step 1 — `create-next-app`

Crea el proyecto con TypeScript, App Router, Tailwind, ESLint, carpeta `src/` y alias `@/`.

```bash
bunx create-next-app@latest <project>
# npm:  npx create-next-app@latest <project>
```

Respuestas al asistente interactivo:

| Pregunta | Respuesta |
|---|---|
| Would you like to use **TypeScript**? | **Yes** |
| Would you like to use **ESLint**? | **Yes** |
| Would you like to use **Tailwind CSS**? | **Yes** |
| Would you like your code inside a **`src/` directory**? | **Yes** |
| Would you like to use **App Router**? | **Yes** |
| Would you like to use **Turbopack**? | **Yes** |
| Would you like to customize the **import alias** (`@/*`)? | **No** (deja el default `@/*`) |

Entra en la carpeta e inicializa git si no lo hizo el scaffold:

```bash
cd <project>
git init && git add -A && git commit -m "chore: scaffold next-app"
```

---

## Step 2 — Elegir gestor de paquetes

Ya decidiste el canónico en *Prerequisitos*. Materialízalo ahora:

- **bun**: el scaffold deja `bun.lock`. Borra cualquier `package-lock.json`/`pnpm-lock.yaml` que se haya colado.
- **npm**: conserva `package-lock.json`, borra los demás.

```bash
# bun
rm -f package-lock.json pnpm-lock.yaml yarn.lock
bun install
```

A partir de aquí, **todos los scripts** se ejecutan con tu gestor: `bun run <script>` (o `npm run <script>`).

---

## Step 3 — Dependencias core

```bash
# Runtime
bun add drizzle-orm postgres zod next-intl

# Dev
bun add -d drizzle-kit vitest @vitest/coverage-v8 dotenv
```

Equivalente npm:

```bash
npm i drizzle-orm postgres zod next-intl
npm i -D drizzle-kit vitest @vitest/coverage-v8 dotenv
```

| Paquete | Rol |
|---|---|
| `drizzle-orm` | ORM / query builder tipado. |
| `postgres` | Driver postgres.js (la conexión real). |
| `drizzle-kit` (dev) | Generador de migraciones, studio. |
| `zod` | Validación en el edge (importado como `zod/v4`). |
| `next-intl` | i18n sin locale en la URL. |
| `vitest` + `@vitest/coverage-v8` (dev) | Tests en `environment: "node"` + cobertura. |
| `dotenv` (dev) | Carga `.env.local` en scripts fuera de Next (migraciones, seed). |

---

## Step 4 — Supabase + variables de entorno

### 4.1 Crear el proyecto y obtener las connection strings

En el dashboard de Supabase: **Project → Connect → ORMs / Connection string**. Necesitas **DOS** URLs distintas porque cumplen funciones distintas:

| Uso | Puerto | Por qué |
|---|---|---|
| **Runtime de la app** (pooled, transaction pooler) | **6543** | El transaction pooler escala muchas conexiones cortas. Requiere `prepare: false` (no soporta prepared statements). |
| **Migraciones / drizzle-kit / seed** (session pooler) | **5432** | El session pooler mantiene la sesión y soporta el *advisory lock* del migrador. Las prepared statements funcionan. |

> **Gotcha IPv6 — evita la conexión directa.** La URL directa `db.<PROJECT_REF>.supabase.co` es **IPv6-only** y en muchas redes/CI sobre IPv4 **no resuelve** (`ENETUNREACH` / `ENOTFOUND`). Usa siempre las dos URLs *pooler* de arriba. Si ves errores de resolución, casi seguro estás usando la directa.

### 4.2 `.env.example` (committed) y `.env.local` (gitignored)

`.env.local` lleva los valores reales y **está en `.gitignore`** (create-next-app ya lo ignora). Commitea solo la plantilla `.env.example`:

```bash
# .env.example — committed template. Copy to .env.local and fill real values.

# Pooled transaction-pooler URL (port 6543). App runtime.
# NOTE: postgres.js must run with prepare:false against this URL.
DATABASE_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:6543/postgres"

# Session pooler URL (port 5432). Migrations / drizzle-kit / seed.
SUPABASE_DB_URL="postgresql://postgres.<PROJECT_REF>:<PASSWORD>@aws-0-<REGION>.pooler.supabase.com:5432/postgres"

# Supabase public client (only if you use the JS client / Storage / Auth).
NEXT_PUBLIC_SUPABASE_URL="https://<PROJECT_REF>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<anon-public-key>"

# Auth/session signing secret. Generate with: openssl rand -base64 32
AUTH_SECRET="<generate-with-openssl-rand-base64-32>"
```

Crea tu copia local y rellénala:

```bash
cp .env.example .env.local
# edita .env.local con los valores reales del dashboard
```

> Confirma que `.env.local` está ignorado: `git check-ignore .env.local` debe imprimir la ruta.

---

## Step 5 — `drizzle.config.ts`

Archivo completo en la raíz. Lee la **URL de sesión** (puerto 5432) porque drizzle-kit necesita el advisory lock.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  migrations: {
    // unix-epoch prefix: evita colisiones de nombre cuando varias personas
    // ramifican en paralelo (vs el secuencial 0001_/0002_).
    prefix: "unix",
  },
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL!,
  },
});
```

---

## Step 6 — DB client + barrel + regla de frontera

### 6.1 `src/db/client.ts`

`postgres.js` contra la **URL pooled** (6543) con `prepare: false`. Este es **el único** módulo (junto a `scripts/db-*.ts`) que instancia `postgres()`.

```ts
// src/db/client.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

// prepare:false is REQUIRED for the Supabase transaction pooler (6543).
const client = postgres(connectionString, { prepare: false });

export const db = drizzle(client, { schema });
```

### 6.2 `src/db/schema/index.ts` (barrel)

```ts
// src/db/schema/index.ts
export * from "./users";
export * from "./note";
```

### 6.3 Regla de frontera (DB boundary)

> **Solo `src/db/**` y `scripts/db-*.ts` pueden instanciar `postgres()`.** Todo el resto importa el cliente ya construido:
> ```ts
> import { db } from "@/db/client";
> ```
> Nunca abras una conexión nueva en una ruta, componente o lib. Esto mantiene un único pool y un único punto de configuración.

---

## Step 7 — Primera tabla de ejemplo (`note`) + tabla `users`

La entidad `note` es **solo un ejemplo**. Junto a ella creamos una tabla mínima `users`: es el destino del FK `owner_id` y el origen del `id` que devuelve el stub de auth (Step 9). Sin ella, el primer FK del walkthrough no compilaría.

### 7.1 `src/db/schema/users.ts`

```ts
// src/db/schema/users.ts
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(), // UUID as text
  email: text("email").notNull().unique(),
  role: text("role", { enum: ["admin", "member"] })
    .notNull()
    .default("member"),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .notNull()
    .defaultNow(),
});
```

### 7.2 `src/db/schema/note.ts`

Convenciones canónicas reflejadas aquí: `id` text (UUID), `owner_id` FK **con `ON DELETE` explícito**, timestamps `withTimezone`, soft delete `deleted_at NULL`, e índices en las columnas que se filtran/ordenan.

```ts
// src/db/schema/note.ts
import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const note = pgTable(
  "note",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    body: text("body").notNull().default(""),
    // Every FK declares an explicit ON DELETE (canon).
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    // Soft delete: default queries filter `deleted_at IS NULL`.
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "date" }),
  },
  (t) => [
    index("note_owner_id_idx").on(t.ownerId),
    index("note_created_at_idx").on(t.createdAt),
  ],
);
```

### 7.3 Scripts de DB en `package.json`

Añade en `"scripts"`:

```jsonc
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:migrate": "bun run scripts/db-migrate.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

> Con npm: `"db:migrate": "tsx scripts/db-migrate.ts"` (instala `tsx` como dev) o ejecútalo con tu runner de TS. bun ejecuta TypeScript directamente.

### 7.4 `scripts/db-migrate.ts` (mínimo)

Migrador autónomo contra la **URL de sesión** (5432). Es uno de los `scripts/db-*.ts` autorizados a abrir su propia conexión.

```ts
// scripts/db-migrate.ts
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const url = process.env.SUPABASE_DB_URL;
if (!url) throw new Error("SUPABASE_DB_URL is not set");

// max:1 — the migrator needs a single dedicated session for its advisory lock.
const sql = postgres(url, { max: 1 });

async function main() {
  await migrate(drizzle(sql), { migrationsFolder: "./drizzle" });
  await sql.end();
  console.log("migrations applied");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

### 7.5 Generar y aplicar la migración

> **Antes de generar:** `git fetch origin main && git rebase origin/main`. Así la migración nace sobre el esquema más reciente y evitas colisiones. **Las migraciones son inmutables una vez aplicadas**: nunca edites ni reordenes; para revertir, escribe una migración NUEVA.

```bash
bun run db:generate   # crea drizzle/<unix>_<slug>.sql + snapshot
bun run db:migrate    # aplica contra la URL de sesión
```

Para SQL custom (triggers, PL/pgSQL como el de `updated_at`):

```bash
bunx drizzle-kit generate --custom --name=note_updated_at_trigger
```

---

## Step 8 — i18n con next-intl (sin routing)

El locale se elige por **cookie**, no por la URL. Las traducciones que falten caen al `<default-locale>`.

### 8.1 `messages/<default-locale>.json` y otros locales

```json
// messages/<default-locale>.json   (ej. messages/es.json)
{
  "common": {
    "appName": "<project>",
    "save": "Guardar",
    "cancel": "Cancelar"
  },
  "note": {
    "title": "Notas",
    "empty": "Aún no hay notas"
  }
}
```

```json
// messages/en.json   (otro locale; las claves que falten caen al default)
{
  "common": {
    "appName": "<project>",
    "save": "Save",
    "cancel": "Cancel"
  },
  "note": {
    "title": "Notes",
    "empty": "No notes yet"
  }
}
```

### 8.2 `src/lib/i18n/config.ts`

```ts
// src/lib/i18n/config.ts
export const LOCALES = ["es", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es"; // <default-locale>

// Cookie name pattern: <APP>_LOCALE
export const LOCALE_COOKIE = "APP_LOCALE";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}
```

### 8.3 `src/i18n/request.ts`

Lee la cookie, carga los mensajes del locale y hace *merge* sobre los del default para el fallback.

```ts
// src/i18n/request.ts
import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { DEFAULT_LOCALE, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(raw) ? raw : DEFAULT_LOCALE;

  const defaultMessages = (await import(`../../messages/${DEFAULT_LOCALE}.json`)).default;
  const localeMessages =
    locale === DEFAULT_LOCALE
      ? defaultMessages
      : (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    // Missing keys in `locale` fall back to the default locale's messages.
    messages: { ...defaultMessages, ...localeMessages },
  };
});
```

### 8.4 `next.config.ts` con `withNextIntl(...)`

```ts
// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

### 8.5 Provider en el root `layout.tsx`

```tsx
// src/app/layout.tsx
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

> **Uso.** Server Components: `const t = await getTranslations("note")`. Client Components (`"use client"`): `const t = useTranslations("note")`. Nunca un literal visible en JSX — todo string de usuario pasa por una clave de `messages/`.

---

## Step 9 — Zod validators + api-helpers + patch helper

Tres módulos en `src/lib/`. Aquí van snippets ilustrativos suficientes para copiar; la implementación completa de cada feature la verás en `04-first-steps.md`.

### 9.1 `src/lib/validators.ts` (Zod en el edge)

```ts
// src/lib/validators.ts
import { z } from "zod/v4";

// Create schema for the example entity `note`.
export const createNoteSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().max(10_000).default(""),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
```

> Valida **en el borde** (rutas API / server actions). No revalides contratos internos ya validados.

### 9.2 `src/lib/patch.ts` (`partialWithoutDefaults`)

En Zod v4, `.partial()` **sigue inyectando** el `.default()` del create para las claves ausentes, así que un PATCH parcial pisaría columnas no enviadas (p. ej. `body -> ""`). Este helper elimina esos defaults antes de hacer parcial.

```ts
// src/lib/patch.ts
import { z } from "zod/v4";

/**
 * Build a PATCH schema from a create schema WITHOUT carrying over `.default()`s.
 * Plain `.partial()` would re-inject create defaults for absent keys and clobber
 * unsent columns. Use this for every update/PATCH schema.
 */
export function partialWithoutDefaults<T extends z.ZodObject<any>>(schema: T) {
  const shape = schema.shape;
  const stripped: Record<string, z.ZodTypeAny> = {};
  for (const key of Object.keys(shape)) {
    let field = shape[key] as z.ZodTypeAny;
    // Unwrap ZodDefault so absent keys stay absent.
    if (field instanceof z.ZodDefault) field = field.def.innerType;
    stripped[key] = field.optional();
  }
  return z.object(stripped);
}

// Usage:
// export const updateNoteSchema = partialWithoutDefaults(createNoteSchema);
```

### 9.3 `src/lib/auth.ts` (stub de sesión) + `src/lib/api-helpers.ts`

El **stub de sesión** vive en su propio módulo `src/lib/auth.ts`, con firma estable `getSession(): Promise<Session | null>` y forma `{ user: { id, role } }`. Tenerlo aparte permite importarlo como `@/lib/auth` desde rutas, Server Components y tests (así lo hace `04-first-steps.md`); ahí se conecta luego con `AUTH_SECRET`.

```ts
// src/lib/auth.ts
export type Session = { user: { id: string; role: string } };

export async function getSession(): Promise<Session | null> {
  // TODO (04-first-steps.md): verify the signed cookie with AUTH_SECRET.
  // Returning a fixed stub keeps the walkthrough runnable.
  return { user: { id: "00000000-0000-0000-0000-000000000000", role: "member" } };
}
```

Los `api-helpers` consumen ese `getSession`. La taxonomía de errores es canónica — no inventes códigos sin actualizar esta tabla y los helpers.

| code | HTTP | Uso |
|---|---|---|
| `VALIDATION_ERROR` | 400 | Body/params inválidos (Zod). |
| `UNAUTHORIZED` | 401 | Sin sesión. |
| `FORBIDDEN` | 403 | Con sesión pero sin permiso. |
| `NOT_FOUND` | 404 | Recurso inexistente. |
| `DUPLICATE` | 409 | Unique violation de Postgres (`23505`). |
| `DB_ERROR` | 500 | Error de base de datos. |
| `SERVER_ERROR` | 500 | Cualquier otro fallo no controlado. |

```ts
// src/lib/api-helpers.ts
import { NextResponse } from "next/server";
import { getSession, type Session } from "./auth";

// --- Response envelope helpers.
export function apiSuccess<T>(data: T) {
  return NextResponse.json({ ok: true, data }, { status: 200 });
}
export function apiCreated<T>(data: T) {
  return NextResponse.json({ ok: true, data }, { status: 201 });
}
export function apiNoContent() {
  return new NextResponse(null, { status: 204 });
}
export function apiError(code: string, message: string, status: number) {
  return NextResponse.json({ ok: false, error: { code, message } }, { status });
}
export function apiValidationError(issues: unknown) {
  return NextResponse.json(
    { ok: false, error: { code: "VALIDATION_ERROR", message: "Invalid input", issues } },
    { status: 400 },
  );
}

// --- Auth gate: wraps a handler that needs a session.
export function withAuth<Args extends unknown[]>(
  handler: (session: Session, ...args: Args) => Promise<Response>,
) {
  return async (...args: Args): Promise<Response> => {
    const session = await getSession();
    if (!session) return apiError("UNAUTHORIZED", "Authentication required", 401);
    return handler(session, ...args);
  };
}

// --- Pagination: page/limit/offset, hardened against NaN/floats.
export function parsePagination(url: URL) {
  const rawPage = Number(url.searchParams.get("page"));
  const rawLimit = Number(url.searchParams.get("limit"));
  const page = Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1;
  const limit =
    Number.isFinite(rawLimit) && rawLimit >= 1 ? Math.min(Math.floor(rawLimit), 100) : 25;
  return { page, limit, offset: (page - 1) * limit };
}
```

### 9.4 `src/lib/db-error.ts` (mapper de errores de dominio)

Traduce errores crudos de Postgres a respuestas de la taxonomía. Es **security-edge**: cubierto al 100% (Step 10).

```ts
// src/lib/db-error.ts
import { apiError } from "./api-helpers";

/**
 * Map a thrown DB/domain error to a canonical API response.
 * Postgres unique violation (23505) -> DUPLICATE/409. Anything else -> DB_ERROR/500.
 * Never leak stack traces to the client.
 */
export function mapDbError(err: unknown): Response {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as { code?: string }).code;
    if (code === "23505") {
      return apiError("DUPLICATE", "Resource already exists", 409);
    }
  }
  return apiError("DB_ERROR", "Database error", 500);
}
```

---

## Step 10 — Vitest

### 10.1 `vitest.config.ts`

`environment: "node"` (sin jsdom, sin Testing Library). Cobertura al **100%** ceñida a los archivos *security-edge*: si baja, el build rompe.

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()], // resolves the @/ alias in tests
  test: {
    environment: "node",
    include: ["__tests__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/api-helpers.ts",
        "src/lib/db-error.ts",
        "src/lib/patch.ts",
      ],
      thresholds: {
        // Security-edge files must stay fully covered.
        "src/lib/api-helpers.ts": { statements: 100, branches: 100, functions: 100, lines: 100 },
        "src/lib/db-error.ts": { statements: 100, branches: 100, functions: 100, lines: 100 },
        "src/lib/patch.ts": { statements: 100, branches: 100, functions: 100, lines: 100 },
      },
    },
  },
});
```

> Instala el resolver del alias: `bun add -d vite-tsconfig-paths` (npm: `npm i -D vite-tsconfig-paths`).

### 10.2 Convención de carpeta de tests

Una sola forma en todo el repo: los tests bajo `__tests__/unit/` y los helpers compartidos bajo `__tests__/helpers/` —
- `__tests__/unit/<name>.test.ts` para funciones puras (`src/lib/*`): validators, patch helper, parsers, formatters y esquemas Zod.
- `__tests__/unit/<name>-route.test.ts` para handlers de rutas REST (auth gate 401, validación 400, mapeo de errores 404/409).
- `__tests__/helpers/` para utilidades de test (p. ej. `buildSession`, `jsonRequest`, `readApi`); no son `*.test.ts`, así que Vitest no las recoge.

El `include: ["__tests__/**/*.test.ts"]` los recoge. (`02-docs-structure.md` y `04-first-steps.md` usan esta misma forma.)

### 10.3 Test de ejemplo

```ts
// __tests__/unit/patch.test.ts
import { describe, expect, it } from "vitest";
import { z } from "zod/v4";
import { partialWithoutDefaults } from "@/lib/patch";

const createSchema = z.object({
  title: z.string().min(1),
  body: z.string().default(""),
});

describe("partialWithoutDefaults", () => {
  it("omits absent keys instead of injecting create defaults", () => {
    const update = partialWithoutDefaults(createSchema);
    const parsed = update.parse({ title: "x" });
    // `body` must NOT be present (no clobbering an unsent column).
    expect(parsed).toEqual({ title: "x" });
    expect("body" in parsed).toBe(false);
  });

  it("still validates provided fields", () => {
    const update = partialWithoutDefaults(createSchema);
    expect(() => update.parse({ title: "" })).toThrow();
  });
});
```

---

## Step 11 — Tooling (tsconfig, eslint, scripts)

### 11.1 `tsconfig.json` (strict + `@/` paths)

create-next-app ya deja una base buena; confirma `strict: true` y el alias:

```jsonc
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
    // ...el resto generado por create-next-app
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 11.2 ESLint

Conserva el `eslint.config.mjs` (flat config) que genera create-next-app con `next/core-web-vitals`. No hace falta tocarlo para arrancar.

### 11.3 Scripts de `package.json`

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:coverage": "vitest run --coverage",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "bun run scripts/db-migrate.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

| Script | Qué hace |
|---|---|
| `dev` | Servidor de desarrollo (HMR). |
| `build` | Build de producción. |
| `start` | Sirve el build. |
| `lint` | ESLint (next/core-web-vitals). |
| `typecheck` | `tsc --noEmit` — tipos sin emitir. |
| `test` | Vitest una pasada. |
| `test:coverage` | Tests + cobertura (umbrales security-edge). |
| `db:generate` | Genera migración + snapshot. |
| `db:migrate` | Aplica migraciones (URL de sesión). |
| `db:studio` | Drizzle Studio (inspección visual). |

---

## Árbol de carpetas final

```
<project>/
├─ .env.example
├─ .env.local                 # gitignored
├─ drizzle.config.ts
├─ next.config.ts
├─ package.json
├─ tsconfig.json
├─ vitest.config.ts
├─ eslint.config.mjs
├─ drizzle/                   # generated migrations + snapshots
│  └─ <unix>_<slug>.sql
├─ messages/
│  ├─ es.json                 # <default-locale>
│  └─ en.json
├─ scripts/
│  └─ db-migrate.ts
├─ __tests__/
│  ├─ unit/                   # pure fns, Zod schemas, route handlers
│  │  └─ patch.test.ts
│  └─ helpers/                # buildSession, jsonRequest, readApi…
└─ src/
   ├─ app/
   │  ├─ layout.tsx
   │  ├─ page.tsx
   │  └─ globals.css
   ├─ db/
   │  ├─ client.ts
   │  └─ schema/
   │     ├─ index.ts
   │     ├─ users.ts
   │     └─ note.ts
   ├─ i18n/
   │  └─ request.ts
   └─ lib/
      ├─ i18n/
      │  └─ config.ts
      ├─ api-helpers.ts
      ├─ auth.ts
      ├─ db-error.ts
      ├─ patch.ts
      └─ validators.ts
```

---

## Verificación

Ejecuta y confirma que cada uno pasa:

```bash
bun run typecheck     # tsc --noEmit → sin errores
bun run lint          # ESLint → sin errores
bun run test          # Vitest → tests verdes
bun run test:coverage # cobertura 100% en los archivos security-edge
bun run db:studio     # abre Drizzle Studio y muestra users + note
bun run dev           # http://localhost:3000 levanta sin errores
```

Qué debe verse al éxito:

| Comando | Éxito |
|---|---|
| `typecheck` | "no errors" (exit 0). |
| `lint` | sin warnings/errores. |
| `test` | suite verde (incluye `patch.test.ts`). |
| `test:coverage` | 100% en `api-helpers.ts`, `db-error.ts`, `patch.ts`; build no rompe. |
| `db:studio` | tablas `users` y `note` visibles con sus columnas. |
| `dev` | la home carga; cambiar la cookie `APP_LOCALE` cambia el idioma. |

> Si `db:migrate`/`db:studio` fallan con error de red, revisa que estás usando la URL **de sesión** (5432) y **no** la directa `db.<PROJECT_REF>.supabase.co` (gotcha IPv6 del Step 4).

---

## Swap notes

- **Supabase → otro Postgres.** Cualquier Postgres sirve (Neon, RDS, Postgres local). Mantén el modelo de **dos URLs** si tu proveedor distingue pooled vs. directa (Neon también tiene pooler). Si solo hay una URL, úsala en `DATABASE_URL` y `SUPABASE_DB_URL` y quita `prepare:false` solo si tu pooler soporta prepared statements. Las vars `NEXT_PUBLIC_SUPABASE_*` solo aplican si usas el cliente JS de Supabase.
- **Drizzle → Prisma.** Alternativa de ORM válida. Cambiarían `drizzle.config.ts` → `schema.prisma`, los scripts `db:*` → `prisma generate|migrate`, y `src/db/client.ts` → un `PrismaClient` singleton. La **regla de frontera** (un solo módulo instancia el cliente) y la de **migraciones inmutables** se mantienen.
- **next-intl → otra i18n.** Si usas `next-i18next`/`react-i18next` u otra, conserva el principio: **locale por cookie (sin locale en URL)**, `<default-locale>` como fallback, y **cero literales** en JSX. Cambia `src/i18n/request.ts` y el provider por el equivalente de tu librería.
- **Gestor de paquetes.** bun es el canónico de referencia por velocidad y por ejecutar TS directamente (`db:migrate`). Con npm/pnpm/yarn: un único lockfile commiteado, y para `db:migrate` usa `tsx`/`ts-node` en vez de la ejecución directa de bun. Traduce `bun add` → `npm i` / `pnpm add` / `yarn add` y `bun run` → `<pm> run`.