# Tu primera feature, de principio a fin

Esta guía te lleva por tu **primera feature completa** usando una entidad de ejemplo
genérica: `note`. `note` es solo un marcador de posición — sustitúyelo por la primera
entidad real de tu proyecto (`item`, `task`, lo que sea). El objetivo no es la entidad,
sino **recorrer el flujo completo una vez** para interiorizar el ritmo de trabajo: spec →
modelo → validación → API → UI → tests → docs → done gates.

Antes de empezar, deberías tener el repo ya montado siguiendo
[`01-project-setup.md`](./01-project-setup.md) (scaffold, Drizzle, i18n, Vitest, tooling)
y conocer el sistema de documentación de [`02-docs-structure.md`](./02-docs-structure.md).
El contrato operativo completo vive en [`AGENTS.template.md`](./AGENTS.template.md);
aquí lo ponemos en práctica.

---

## 1. Definition of Ready

No escribas código hasta que estos cuatro puntos estén claros. Si alguno está borroso,
páralo y resuélvelo primero.

- **Objetivo testeable.** Una frase que se pueda verificar. _"Un usuario autenticado
  puede crear una `note` con `title` (obligatorio) y `body` (opcional), y listar las
  suyas paginadas."_ Si no puedes escribir el test que lo prueba, el objetivo no está
  listo.
- **Scope.** Qué entra y qué NO. Entra: tabla `note`, validación, `POST`/`GET`
  `/api/v1/notes`, página de listado server-rendered. No entra: edición inline,
  adjuntos, compartir, búsqueda full-text. Lo que no entra se anota como TODO en el doc
  de la feature.
- **Archivos afectados.** Enuméralos antes de tocar nada:
  - `docs/features/note.md`
  - `src/db/schema/note.ts` + `src/db/schema/index.ts`
  - `drizzle/<unix>_*.sql` (generado)
  - `src/lib/validators.ts`
  - `src/app/api/v1/notes/route.ts`
  - `src/app/notes/page.tsx`
  - `messages/<locale>.json` (todos los locales)
  - `__tests__/unit/note-schema.test.ts` + `__tests__/unit/notes-route.test.ts`
  - docs de cierre: `data-model.md`, `changelog/<año>/<fecha>.md`
- **Riesgos visibles.** Anota lo que puede salir mal: ¿la migración choca con otra en
  vuelo? (haz `git fetch origin main && git rebase origin/main` antes de generar). ¿El
  FK a `users` necesita índice? (sí). ¿La PATCH puede pisar columnas no enviadas? (usa
  `partialWithoutDefaults`, nunca `.partial()`).

> **Definition of Ready en una línea:** objetivo que se puede testear, scope con bordes,
> lista de archivos, riesgos anotados. Si los cuatro están, empieza.

---

## 2. El mensaje de inicio

Toda respuesta de una tarea abre con este bloque (ver
[`AGENTS.template.md`](./AGENTS.template.md), §Startup ritual). Rellenado para esta
feature:

```
📄 Context: new — primera feature `note`, no existía nada de esta entidad
📕 Skills: react-next-best-practices — la feature toca Server Component + data fetching
📚 Docs consulted: docs/architecture/data-model.md, docs/architecture/testing.md — para
   seguir las convenciones de schema y el patrón de mock de DB
📝 Docs planned: docs/features/note.md (nueva), docs/architecture/data-model.md (tabla
   `note`), docs/changelog/<año>/<fecha>.md (entrada) — doc-sync obligatorio
```

Reglas del bloque:
- **Context**: `same` | `changed` | `new`. Aquí `new` porque la entidad no existía.
- **Skills**: como mucho 1 primaria (+1 secundaria si la tarea cruza dos dominios). Si
  ninguna aplica, `none — <por qué>`.
- **Docs consulted / planned**: rutas reales o `none — <por qué>`. "Planned" es tu
  compromiso de doc-sync; si lo escribes, lo cumples al cerrar.

---

## 3. Walkthrough: primera feature (`note`)

> Recuerda: `note` es una entidad de ejemplo. Donde leas `note`, piensa en tu primera
> entidad real. Todo lo demás (estructura, helpers, patrones de test) se mantiene igual.

### Paso 1 — Spec: `docs/features/note.md`

Antes del código, escribe la spec partiendo del feature skeleton de
[`02-docs-structure.md`](./02-docs-structure.md) (§Plantillas). Regla dura del sistema de
docs: **si no hay `docs/features/<feature>.md`, la feature no existe.**

```markdown
# Feature: note

## Scope
Un usuario autenticado crea y lista `note`s propias. Cada `note` tiene `title`
(obligatorio) y `body` (opcional).
- In: crear (`POST`), listar paginado (`GET`), soft delete.
- Out (TODO): editar, compartir, búsqueda full-text, adjuntos.

## Flow
1. UI server-rendered en `/notes` lista las `note`s del owner (paginadas).
2. `POST /api/v1/notes` crea una `note` validada en el edge con Zod.

## API
| Método | Ruta            | Auth | Body                 | Respuesta      |
| ------ | --------------- | ---- | -------------------- | -------------- |
| GET    | /api/v1/notes   | sí   | —                    | 200 + lista    |
| POST   | /api/v1/notes   | sí   | { title, body? }     | 201 + note     |

## Data model
Tabla `note`: ver `docs/architecture/data-model.md`. FK `owner_id → users.id`
ON DELETE CASCADE.

## i18n keys
`notes.title`, `notes.empty`, `notes.createCta`. Definidas en todos los locales.

## Tests
`__tests__/unit/note-schema.test.ts` (validación), `__tests__/unit/notes-route.test.ts` (auth 401,
validación 400, mapeo de errores de dominio).

## TODO
- [ ] Edición de `note`.
- [ ] Búsqueda.
```

**Evidencia:** el archivo existe y describe scope, flujo, API, modelo, i18n y tests.

### Paso 2 — Modelo: `src/db/schema/note.ts`

> El walkthrough asume que ya existe `src/db/schema/users.ts` (lo scaffolda
> [`01-project-setup.md`](./01-project-setup.md), §DB client + schema), porque `owner_id`
> apunta a `users.id`. Si tu proyecto aún no lo tiene, créalo primero.

Schema-first. Define la tabla y reexpórtala desde el índice. Convenciones (de
[`AGENTS.template.md`](./AGENTS.template.md), §DB canon): `id` como `text` (UUID),
timestamps `withTimezone`, soft delete `deleted_at`, `owner_id` FK con `ON DELETE`
explícito, índice en toda columna FK / de filtrado.

```ts
// src/db/schema/note.ts
import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { users } from "./users";

export const note = pgTable(
  "note",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    ownerId: text("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    body: text("body"),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
      .notNull()
      .defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true, mode: "date" }),
  },
  (t) => [
    index("note_owner_id_idx").on(t.ownerId),
    index("note_created_at_idx").on(t.createdAt),
  ],
);
```

```ts
// src/db/schema/index.ts
export * from "./users";
export * from "./note";
```

Genera y aplica la migración (scripts de [`01-project-setup.md`](./01-project-setup.md),
§Scripts). **Siempre rebasa antes de generar**, para que la migración nazca encima del
último schema:

```bash
git fetch origin main && git rebase origin/main
<pm> run db:generate    # drizzle-kit generate → drizzle/<unix>_*.sql
<pm> run db:migrate     # aplica contra el session pooler (puerto 5432)
```

Abre el SQL generado y verifícalo (índices presentes, `ON DELETE CASCADE` en el FK). La
migración es **inmutable** una vez aplicada: si algo está mal, escribe una nueva, nunca
edites la existente.

**Doc-sync inmediato:** añade la tabla `note` a `docs/architecture/data-model.md`
(columnas, tipos, FK, índices, política de soft delete). Cambio de DB ⇒ se actualiza el
data-model.

**Evidencia:** `drizzle/<unix>_*.sql` versionado, migración aplicada local, `data-model.md`
con la tabla.

### Paso 3 — Validators: `src/lib/validators.ts`

Validación con Zod (v4, importado como `zod/v4`) en el **edge**. El schema de update se
deriva con `partialWithoutDefaults`, **nunca** con `.partial()` (ver Pitfalls).

```ts
// src/lib/validators.ts
import { z } from "zod/v4";
import { partialWithoutDefaults } from "./patch";

export const createNoteSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().max(10_000).optional(),
});

export const updateNoteSchema = partialWithoutDefaults(createNoteSchema);

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
```

`partialWithoutDefaults` vive en `src/lib/patch.ts` (lo crea
[`01-project-setup.md`](./01-project-setup.md), §Zod + api-helpers; es security-edge con
cobertura 100% obligatoria).

**Evidencia:** `createNoteSchema` valida un body correcto y rechaza `title` vacío;
`updateNoteSchema` acepta `{}` sin inyectar defaults.

### Paso 4 — API route: `src/app/api/v1/notes/route.ts`

La ruta usa `withAuth` (lee la sesión), el envelope de respuesta (`apiCreated`,
`apiSuccess`, `apiValidationError`, …), `parsePagination` y la taxonomía de errores
canónica. Handler real, compacto:

```ts
// src/app/api/v1/notes/route.ts
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { note } from "@/db/schema";
import { createNoteSchema } from "@/lib/validators";
import {
  withAuth,
  apiSuccess,
  apiCreated,
  apiValidationError,
  parsePagination,
} from "@/lib/api-helpers";
import { mapDbError } from "@/lib/db-error";

export const GET = withAuth(async (session, req) => {
  const { limit, offset } = parsePagination(new URL(req.url));
  const rows = await db
    .select()
    .from(note)
    .where(and(eq(note.ownerId, session.user.id), isNull(note.deletedAt)))
    .limit(limit)
    .offset(offset);
  return apiSuccess(rows);
});

export const POST = withAuth(async (session, req) => {
  const parsed = createNoteSchema.safeParse(await req.json());
  if (!parsed.success) return apiValidationError(parsed.error);

  try {
    const [created] = await db
      .insert(note)
      .values({ ...parsed.data, ownerId: session.user.id })
      .returning();
    return apiCreated(created);
  } catch (err) {
    return mapDbError(err); // 23505 → DUPLICATE/409, resto → DB_ERROR/500
  }
});
```

Notas:
- `withAuth` inyecta `session` con forma `{ user: { id, role } }` (ver
  [`AGENTS.template.md`](./AGENTS.template.md), §Auth). Si no hay sesión, responde
  `UNAUTHORIZED/401` antes de entrar al handler.
- La validación ocurre **solo en el edge**; el core confía en el contrato ya validado.
- `mapDbError` es el mapper de errores de dominio canónico (`src/lib/db-error.ts`):
  traduce el `23505` de Postgres a `DUPLICATE/409` y cualquier otro fallo de DB a
  `DB_ERROR/500`, sin filtrar stack traces.

**Evidencia:** el handler responde `201` con la `note` creada, `400` con body inválido,
`401` sin sesión.

### Paso 5 — UI: Server Component + i18n

Página server-rendered (Server Component por defecto; `"use client"` solo si hubiera
interacción). **Ninguna cadena visible literal en el JSX**: todo pasa por `next-intl`.

```tsx
// src/app/notes/page.tsx
import { getTranslations } from "next-intl/server";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/db/client";
import { note } from "@/db/schema";
import { getSession } from "@/lib/auth";

export default async function NotesPage() {
  const t = await getTranslations("notes");
  const session = await getSession();
  const rows = await db
    .select()
    .from(note)
    .where(and(eq(note.ownerId, session.user.id), isNull(note.deletedAt)));

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-xl font-semibold">{t("title")}</h1>
      {rows.length === 0 ? (
        <p className="text-muted-foreground">{t("empty")}</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {rows.map((n) => (
            <li key={n.id} className="rounded-md border p-3">
              {n.title}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
```

Añade las claves a **todos** los locales (las que falten caen al `<default-locale>`, pero
se definen en todos igualmente):

```json
// messages/<default-locale>.json
{
  "notes": {
    "title": "Notes",
    "empty": "No notes yet.",
    "createCta": "New note"
  }
}
```

```json
// messages/<other-locale>.json
{
  "notes": {
    "title": "Notas",
    "empty": "Aún no hay notas.",
    "createCta": "Nueva nota"
  }
}
```

Las **keys** de i18n están en inglés (son identificadores de código); los **valores** son
contenido de usuario y van traducidos. Un literal visible en el JSX bloquea el PR.

**Evidencia:** `/notes` renderiza el título y el estado vacío desde i18n; no hay strings
hardcodeados.

### Paso 6 — Tests: solo se mockean los bordes

Dos archivos: el schema (función pura) y la ruta (handler con DB y sesión mockeadas).
Mockea **solo los bordes** (red, fs, Postgres, sesión) — nunca el core.

**Idea red → green.** Empieza por el test que falla. Para el schema, escribe primero la
aserción de que `title` vacío se rechaza; corre `<pm> run test` y mírala en **rojo**;
luego implementa/ajusta `createNoteSchema` hasta verla en **verde**. El test rojo y el fix
viajan en el mismo PR.

```ts
// __tests__/unit/note-schema.test.ts
import { describe, it, expect } from "vitest";
import { createNoteSchema, updateNoteSchema } from "@/lib/validators";

describe("createNoteSchema", () => {
  it("accepts a valid note", () => {
    const r = createNoteSchema.safeParse({ title: "Hi", body: "x" });
    expect(r.success).toBe(true);
  });

  it("rejects an empty title", () => {
    const r = createNoteSchema.safeParse({ title: "" });
    expect(r.success).toBe(false);
  });
});

describe("updateNoteSchema", () => {
  it("accepts an empty patch without injecting defaults", () => {
    const r = updateNoteSchema.safeParse({});
    expect(r.success).toBe(true);
    expect(r.data).toEqual({}); // no se inyecta body/title
  });
});
```

Para la ruta, el patrón canónico es un **Proxy encadenable** que sustituye al cliente
Drizzle: cada test fija el resultado del `SELECT`/`INSERT` y el retorno de la sesión. El
core real corre contra esa DB mockeada.

```ts
// __tests__/unit/notes-route.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";

// --- mock edges ---
let dbResult: unknown[] = [];
let sessionValue: { user: { id: string; role: string } } | null = null;

// Proxy encadenable: .select().from().where().limit().offset() → dbResult
const chain = new Proxy(() => {}, {
  get: () => chain,
  apply: () => chain,
});
// el await final del builder resuelve a dbResult
(chain as unknown as { then: unknown }).then = (resolve: (v: unknown) => void) =>
  resolve(dbResult);

vi.mock("@/db/client", () => ({ db: chain }));
vi.mock("@/lib/auth", () => ({
  getSession: () => sessionValue,
}));

beforeEach(() => {
  dbResult = [];
  sessionValue = { user: { id: "u1", role: "member" } };
});

async function readApi(res: Response) {
  return { status: res.status, json: await res.json() };
}

function buildSession(over?: Partial<{ id: string; role: string }>) {
  return { user: { id: "u1", role: "member", ...over } };
}

describe("GET /api/v1/notes", () => {
  it("401 without session", async () => {
    sessionValue = null;
    const { GET } = await import("@/app/api/v1/notes/route");
    const res = await GET(new Request("http://x/api/v1/notes"));
    const { status, json } = await readApi(res);
    expect(status).toBe(401);
    expect(json.error.code).toBe("UNAUTHORIZED");
  });

  it("200 with owner notes", async () => {
    sessionValue = buildSession();
    dbResult = [{ id: "n1", title: "Hi", ownerId: "u1" }];
    const { GET } = await import("@/app/api/v1/notes/route");
    const res = await GET(new Request("http://x/api/v1/notes"));
    const { status, json } = await readApi(res);
    expect(status).toBe(200);
    expect(json.data).toHaveLength(1);
  });
});

describe("POST /api/v1/notes", () => {
  it("400 on invalid body", async () => {
    const { POST } = await import("@/app/api/v1/notes/route");
    const res = await POST(
      new Request("http://x/api/v1/notes", {
        method: "POST",
        body: JSON.stringify({ title: "" }),
      }),
    );
    const { status, json } = await readApi(res);
    expect(status).toBe(400);
    expect(json.error.code).toBe("VALIDATION_ERROR");
  });
});
```

Cobertura mínima de la ruta (de [`AGENTS.template.md`](./AGENTS.template.md), §Testing):
auth gate (401), validación de body (400), mapeo de error de dominio (404/409/403). El
schema cubre cada rama relevante (válido + inválido).

**Evidencia:** `<pm> run test` en verde; los casos 401/400 y válido/inválido pasan con
aserciones con significado (no rellenos).

### Paso 7 — Doc-sync

Cierra el círculo de documentación (reglas en
[`02-docs-structure.md`](./02-docs-structure.md), §Doc-sync):

- **`docs/features/note.md`** — ya creada en el Paso 1; repásala para que el API real
  coincida con lo documentado (rutas, body, respuestas).
- **`docs/architecture/data-model.md`** — ya actualizada en el Paso 2 con la tabla `note`.
- **`docs/changelog/<año>/<fecha>.md`** — añade una entrada (partiendo del TEMPLATE de
  changelog):

```markdown
## Added
- Feature `note`: crear y listar notas propias paginadas (`/api/v1/notes`, `/notes`).
  Tabla `note` con soft delete y FK `owner_id → users.id`. Docs: `docs/features/note.md`.
```

- **ADR** — solo si tomaste una decisión real con trade-offs (p. ej. "guardamos `body`
  como `text` plano en vez de estructura rica porque M1 no lo necesita"). Si la hubo,
  crea `docs/decisions/<fecha>-note-body-plain-text.md` desde `TEMPLATE.md`. Si no hubo
  decisión, no inventes un ADR.

Regla dura: **funcional/API ⇒ feature doc; DB ⇒ data-model; UX ⇒ design docs; decisión ⇒
ADR; todo cambio shippable ⇒ changelog.** Sin doc, la feature está bloqueada.

### Paso 8 — Done gates

No está hecho hasta que el trío esté en verde (Ship check de
[`AGENTS.template.md`](./AGENTS.template.md), §Done gates):

```bash
<pm> run lint
<pm> run typecheck
<pm> run test
```

Más: migración aplicada local y reflejada en `data-model.md`, feature doc creada,
aserciones con significado. Si algo está rojo, no se cierra.

---

## 4. El mensaje de cierre

Toda respuesta de tarea cierra con este bloque (ver
[`AGENTS.template.md`](./AGENTS.template.md), §Close ritual). Rellenado:

```
✅ Context status: completed — feature `note` end-to-end (schema, API, UI, tests)
📝 Docs updated: docs/features/note.md (nueva), docs/architecture/data-model.md (tabla
   `note`), docs/changelog/<año>/<fecha>.md (entrada) — doc-sync de feature + DB + ship
🧪 Checks run: <pm> run lint && <pm> run typecheck && <pm> run test — todo verde; cubre
   auth 401, validación 400, válido/inválido del schema
```

Reglas:
- **Context status**: `completed` | `changed`.
- **Docs updated**: rutas reales o `none — <por qué none>`. Tiene que cuadrar con lo que
  prometiste en "Docs planned" al abrir.
- **Checks run**: los comandos reales que corriste, o `none — <por qué>`.

---

## 5. Checklist del primer commit

- [ ] `docs/features/note.md` existe (sin doc, la feature no existe).
- [ ] `src/db/schema/note.ts` + reexport en `index.ts`; FK con `ON DELETE`; índices en FK
      y columnas de filtrado.
- [ ] Migración generada **tras** `git rebase origin/main` y aplicada local; SQL revisado.
- [ ] `createNoteSchema` + `updateNoteSchema` (vía `partialWithoutDefaults`).
- [ ] Ruta con `withAuth` + envelope + taxonomía de errores; validación en el edge.
- [ ] UI Server Component; **cero** literales visibles; keys en **todos** los locales.
- [ ] Tests: schema (válido/inválido) + ruta (401/400/mapeo); solo bordes mockeados; rojo
      → verde.
- [ ] Doc-sync: `data-model.md`, changelog, ADR si hubo decisión.
- [ ] `lint && typecheck && test` en verde.
- [ ] Commit convencional en inglés: `feat(note): create + list notes with pagination`.
- [ ] Rama `feature/note` (nunca commits directos a `main`).

---

## 6. Pitfalls comunes

| Pitfall | Síntoma | Fix |
| --- | --- | --- |
| **String visible hardcodeado** en JSX | `<h1>Notas</h1>` literal; PR bloqueado | Mueve el texto a `messages/<locale>.json` y usa `t("notes.title")`. Keys en inglés, valores traducidos en todos los locales. |
| **`.partial()` inyecta defaults** | Una PATCH pisa columnas no enviadas (p. ej. `body → ""`, un array → `[]`) | Deriva el update con `partialWithoutDefaults(createXSchema)` de `src/lib/patch.ts`, nunca `.partial()`. En Zod v4 `.partial()` reinyecta los `.default()` del create para las keys ausentes. |
| **Editar una migración ya aplicada** | Drift entre el historial y la DB de otros; el migrator falla | Las migraciones son inmutables. Para corregir, escribe una **nueva** migración. Nunca edites/reordenes una aplicada. |
| **FK sin índice** | Listados y joins lentos a medida que crece la tabla | Indexa toda columna FK y toda columna usada en `WHERE`/`ORDER BY` (`index("note_owner_id_idx").on(t.ownerId)`). |
| **Olvidar el doc** | No hay `docs/features/<feature>.md` ⇒ la feature "no existe" y el PR está bloqueado | Crea/actualiza la feature doc **antes** de cerrar; aplica el doc-sync (feature/data-model/changelog/ADR). |
| **`postgres()` fuera de `src/db`** | Conexiones sueltas, sin pooling, fuera del boundary | Solo `src/db/**` (y `scripts/db-*.ts`) instancian `postgres()`. Todos importan `db` desde `@/db/client`. |
| **Inventar códigos de error** | El cliente recibe un code fuera de la taxonomía | Usa solo los 7 códigos canónicos (`VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `DUPLICATE`, `DB_ERROR`, `SERVER_ERROR`). Para añadir uno, actualiza la tabla **y** los helpers. |
| **Mockear el core para testear la ruta** | Test verde que no prueba nada real (filler) | Mockea solo los bordes (Postgres vía Proxy encadenable, sesión). El core de negocio corre de verdad contra la DB mockeada. |
| **Conexión directa en migraciones** | `db.<PROJECT_REF>.supabase.co` no resuelve (IPv6-only) | Usa el session pooler (puerto 5432) para migraciones y el transaction pooler (6543, `prepare:false`) en runtime. Evita la conexión directa. |

---

Con esto tienes el ciclo completo interiorizado: **spec → modelo → validación → API → UI →
tests → docs → done gates**, abriendo con el mensaje de inicio y cerrando con el de cierre.
Repite este ritmo para cada feature. Para profundizar: scaffold en
[`01-project-setup.md`](./01-project-setup.md), sistema de docs en
[`02-docs-structure.md`](./02-docs-structure.md), skills y tooling en
[`03-skills-and-tooling.md`](./03-skills-and-tooling.md), y el contrato completo en
[`AGENTS.template.md`](./AGENTS.template.md).