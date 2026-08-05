# Sistema de documentación: `docs/`

> Pilar 2 del blueprint. Define cómo se estructura, se nombra y se mantiene la documentación de un proyecto nuevo. Para ver estos pasos aplicados en el flujo real de una feature, ve a `04-first-steps.md` §Walkthrough. El contrato operativo que obliga a mantener esto vivo está en `AGENTS.template.md` §Documentation sync.

---

## 1. Filosofía

La documentación no es un extra: es parte del entregable. Estas reglas son el núcleo del sistema.

- **`docs/` es la fuente canónica.** Cuando alguien (humano o agente) necesita entender una parte del sistema, mira `docs/`, no el historial de Slack ni la memoria de quien lo escribió.
- **"Sin `docs/features/<feature>.md`, la feature no existe."** Es una regla literal, no retórica. Una feature sin su documento no está terminada y no debería mergearse. El documento es parte de la Definition of Done, igual que los tests.
- **El código es la verdad; las docs lo siguen.** Las docs describen lo que el código *hace*, no lo que *querríamos* que hiciera. Si código y doc divergen, gana el código y la doc se corrige de inmediato. Por eso las docs se actualizan en el **mismo PR** que el cambio, nunca "después".
- **Idioma de las docs = `<team-language>`.** La prosa de `docs/**`, los ADRs, el changelog y `AGENTS.md` se escriben en el idioma del equipo. Todo lo que sea código sigue en inglés sin excepción: identificadores, rutas, nombres de tablas/columnas, claves de i18n, comandos, códigos de error. (Ver la separación estricta en `AGENTS.template.md` §Language policy.)

La consecuencia práctica: documentar es barato si se hace continuo y caro si se acumula. El sistema está diseñado para que cada cambio arrastre su porción de doc.

---

## 2. Árbol de `docs/`

```text
docs/
├── README.md                  # Índice maestro: mapa de toda la documentación
├── architecture/              # Cómo está construido el sistema (larga vida)
│   ├── overview.md            #   - visión global, módulos, límites
│   ├── data-model.md          #   - tablas, relaciones, convenciones de esquema
│   ├── config-env.md          #   - variables de entorno, conexiones, secretos
│   ├── security-permissions.md#   - auth, roles, reglas de acceso
│   ├── testing.md             #   - estrategia de tests, mínimos, qué no se testea
│   └── <pattern>-pattern.md   #   - docs de patrones reutilizables (p. ej. listing-pattern.md)
├── features/                  # Una feature = un archivo (scope, flujo, API, datos, i18n, tests)
│   └── <feature>.md
├── decisions/                 # ADRs: decisiones con contexto y consecuencias
│   ├── TEMPLATE.md
│   └── YYYY-MM-DD-short-title.md
├── changelog/                 # Registro diario de cambios entregables
│   ├── TEMPLATE.md
│   └── YYYY/
│       └── YYYY-MM-DD.md
├── design/                    # Sistema de diseño y reglas de interacción
│   ├── README.md
│   ├── ui.md                  #   - tokens (color, espaciado, tipografía, radios)
│   ├── components.md          #   - inventario y anatomía de componentes
│   └── ux.md                  #   - reglas de interacción (toasts, estados, motion)
└── plans/                     # Roadmap y planificación de hitos
    └── <milestone>.md
```

---

## 3. Carpeta por carpeta

### `architecture/` — cómo está construido el sistema

Documentos de **larga vida** que describen la estructura estable del sistema. No cambian con cada feature; cambian cuando cambia una decisión de arquitectura. Son el primer sitio donde mira alguien que entra al proyecto.

Archivos base (créalos al hacer scaffold, ver `01-project-setup.md`):

| Archivo | Contenido |
| --- | --- |
| `overview.md` | Visión global: módulos, límites entre capas, cómo fluye una request de punta a punta. |
| `data-model.md` | Tablas, relaciones, convenciones de esquema (tipos, soft delete, `owner_id`, timestamps). **Se actualiza en todo cambio de DB.** |
| `config-env.md` | Variables de entorno, las dos cadenas de conexión (pooled 6543 / session 5432), qué es secreto y qué no. |
| `security-permissions.md` | Modelo de auth, roles, reglas de acceso, dónde vive el gate (`withAuth`). |
| `testing.md` | Estrategia de tests, mínimos de cobertura, edges con 100%, qué se testea y qué deliberadamente no. |

**Pattern docs.** Cuando un patrón se repite en varias features (paginación de listados, manejo de formularios, un wrapper de fetch), extrae un `<pattern>-pattern.md` y enlázalo desde las features que lo usan. Naming: `<nombre-descriptivo>-pattern.md` en kebab-case.

**Cuándo crear un archivo aquí:** cuando documentas algo estructural que sobrevive a las features individuales. Si es específico de una feature, va en `features/`.

### `features/` — una feature, un archivo

El corazón del sistema. Cada feature entregable tiene exactamente un archivo `docs/features/<feature>.md` en kebab-case (`note-management.md`, `item-search.md`). Recuerda: **sin este archivo, la feature no existe.**

**Cuándo crear/actualizar:** al construir una feature nueva o cambiar su comportamiento, su API o su modelo de datos. Se hace en el mismo PR.

Copia este esqueleto al crear una feature (ejemplo con la entidad genérica `note`, solo de muestra):

```markdown
# Feature: <feature-name>

> Estado: draft | shipped · Última actualización: YYYY-MM-DD

## Scope / Purpose
Qué resuelve esta feature y para quién. Qué entra y qué NO entra (no-goals explícitos).

## Architecture / Flow
Cómo fluye de punta a punta: UI → ruta API → core → DB.
Archivos clave (rutas absolutas o desde la raíz del repo):
- `src/app/<feature>/page.tsx` — entrada UI
- `src/app/api/<entity>/route.ts` — handler REST
- `src/core/<entity>/*.ts` — lógica de negocio
- `src/db/schema/<entity>.ts` — esquema

## API
| Método | Ruta | Auth | Body / Query | Respuesta |
| --- | --- | --- | --- | --- |
| GET | `/api/<entity>` | sí | `?page&limit` | `200` lista paginada |
| POST | `/api/<entity>` | sí | `create<Entity>Schema` | `201` creado |
| PATCH | `/api/<entity>/:id` | sí | `partialWithoutDefaults(...)` | `200` actualizado |
| DELETE | `/api/<entity>/:id` | sí | — | `204` sin contenido |

Errores posibles: `VALIDATION_ERROR`, `UNAUTHORIZED`, `NOT_FOUND`, `DUPLICATE`.

## Data Model
Tablas y columnas que toca. Enlaza a `docs/architecture/data-model.md` para el detalle.
- `<entity>` — columnas, FKs (`owner_id` → `users.id`, `ON DELETE ...`), índices.

## i18n
Claves añadidas en `messages/<locale>.json` (namespace de la feature):
- `<entity>.title`, `<entity>.empty`, `<entity>.created`, ...

## Tests
Qué cubre y dónde (ver convención de carpetas en §testing):
- `__tests__/unit/<entity>-validators.test.ts` — esquemas Zod (válido + inválido).
- `__tests__/unit/<entity>-route.test.ts` — auth gate (401), validación (400), mapeo de errores (404/409).

## TODOs
- [ ] Pendientes conocidos, deuda técnica, siguientes pasos.
```

### `decisions/` — ADRs (Architecture Decision Records)

Un ADR por decisión con peso: una elección técnica, un trade-off, algo que en seis meses alguien preguntará "¿por qué se hizo así?". No documentes cada decisión trivial; documenta las que tienen alternativas reales y consecuencias.

**Naming:** `YYYY-MM-DD-short-title.md` en kebab-case (`2026-01-15-money-as-double-precision.md`). El prefijo de fecha ordena cronológicamente.

**Status:** `proposed` (en discusión) → `accepted` (vigente) → `superseded` (reemplazado; enlaza al ADR que lo sustituye). Un ADR nunca se borra ni se reescribe: si la decisión cambia, se crea uno nuevo y el viejo pasa a `superseded`.

Plantilla (`docs/decisions/TEMPLATE.md`):

```markdown
# <Título corto y descriptivo de la decisión>

- **Date:** YYYY-MM-DD
- **Status:** proposed | accepted | superseded by [ADR-XXXX](YYYY-MM-DD-...md)

## Context
Qué problema o fuerza motiva esta decisión. Restricciones, requisitos, situación actual.

## Decision
Lo que se decide hacer, en presente y afirmativo ("Usamos X para Y").

## Alternatives considered
- **Opción A** — por qué se descartó.
- **Opción B** — por qué se descartó.

## Consequences
Qué mejora y qué empeora. Coste asumido, deuda, cosas a vigilar a futuro.
```

### `changelog/` — registro diario

Un archivo por día con cambios entregables, agrupados por tipo. Da una vista cronológica de "qué cambió y cuándo" sin escarbar en git.

**Naming:** `changelog/YYYY/YYYY-MM-DD.md` (subcarpeta por año). Un día = un archivo; varias entradas se acumulan en el mismo archivo.

**Cuándo escribir:** todo cambio entregable (shippable) deja una entrada. Si no merece una línea de changelog, probablemente no merece un PR.

Plantilla (`docs/changelog/TEMPLATE.md`):

```markdown
# YYYY-MM-DD

## Added
- Funcionalidad nueva visible para el usuario o el desarrollador.

## Changed
- Cambios en comportamiento existente.

## Fixed
- Bugs corregidos (enlaza al test rojo que lo demostró si aplica).

## Removed
- Funcionalidad o código eliminado.

## Docs
- Documentos creados o actualizados en este cambio.
```

### `design/` — sistema de diseño

Reglas visuales y de interacción. Se actualiza cuando cambia el sistema de diseño, no en cada pantalla.

| Archivo | Contenido |
| --- | --- |
| `README.md` | Índice del sistema de diseño y cómo usarlo. |
| `ui.md` | **Tokens**: paleta de color, escala de espaciado, tipografía, radios, sombras, breakpoints. |
| `components.md` | **Inventario y anatomía**: átomos y composiciones existentes, sus props, cuándo usar cada uno. |
| `ux.md` | **Reglas de interacción**: toasts, estados de formulario, comportamiento responsive, accesibilidad, motion, dark mode. |

**Regla de oro:** antes de crear un componente nuevo, revisa `components.md` y reutiliza. Si cambias el sistema (token nuevo, átomo nuevo, regla de interacción nueva), actualiza el doc correspondiente en el mismo PR.

### `plans/` — roadmap y planificación

Planificación de hitos y roadmap: qué se quiere construir y en qué orden. A diferencia de `features/` (que describe lo que **ya existe**), `plans/` mira hacia adelante.

**Naming:** un archivo por hito o eje de planificación (`milestone-1.md`, `roadmap.md`) en kebab-case. Cuando un ítem del plan se construye, su detalle se mueve a `features/` y el plan marca el ítem como hecho.

---

## 4. `docs/README.md` como índice

`docs/README.md` es el **mapa** de toda la documentación: el punto de entrada desde el que se navega al resto. Su regla es simple: **cuando añades un documento, lo enlazas aquí en el mismo PR.** Un doc que no está en el índice es un doc que nadie encontrará.

Ejemplo de índice:

```markdown
# Documentación de <project>

Fuente canónica del proyecto. Si algo no está aquí, no existe.

## Architecture
- [Overview](architecture/overview.md) — visión global y módulos
- [Data model](architecture/data-model.md) — tablas y convenciones de esquema
- [Config & env](architecture/config-env.md) — variables y conexiones
- [Security & permissions](architecture/security-permissions.md) — auth y roles
- [Testing](architecture/testing.md) — estrategia y mínimos de cobertura

## Features
- [<feature>](features/<feature>.md) — descripción en una línea

## Decisions (ADRs)
- [2026-01-15 Money as double precision](decisions/2026-01-15-money-as-double-precision.md) — accepted

## Design
- [UI tokens](design/ui.md) · [Components](design/components.md) · [UX rules](design/ux.md)

## Plans
- [Milestone 1](plans/milestone-1.md) — alcance del primer hito

## Changelog
- [2026](changelog/2026/) — registro diario por año
```

---

## 5. Reglas de doc-sync

Cada tipo de cambio arrastra su documentación. Esta tabla es el contrato; está reflejada también en `AGENTS.template.md` §Documentation sync.

| Tipo de cambio | Doc(s) a actualizar |
| --- | --- |
| Funcional / de API (endpoint, comportamiento, contrato) | `docs/features/<feature>.md` |
| De base de datos (tabla, columna, índice, FK, migración) | `docs/architecture/data-model.md` (+ la feature afectada) |
| De UX / diseño (token, componente, regla de interacción) | `docs/design/ui.md` · `components.md` · `ux.md` (el que aplique) |
| Una decisión o trade-off con alternativas reales | nuevo ADR en `docs/decisions/` |
| De configuración / entorno (nueva env var, conexión) | `docs/architecture/config-env.md` |
| **Cualquier cambio entregable** | una entrada en `docs/changelog/YYYY/YYYY-MM-DD.md` |
| Un documento nuevo de cualquier tipo | enlazarlo en `docs/README.md` |

Regla transversal: **si el PR cambia comportamiento y no toca docs, está incompleto.** El reviewer bloquea un PR sin su doc, igual que bloquea uno sin tests.

---

## 6. Referencias cruzadas

- **Estos pasos en un flujo real** → `04-first-steps.md` §Walkthrough: crea el `docs/features/note.md`, su entrada de changelog y (si aplica) un ADR mientras construye la primera feature de ejemplo.
- **El contrato que obliga a esto** → `AGENTS.template.md` §Documentation sync: las reglas de doc-sync como parte del protocolo de cierre de cada tarea.
- **Dónde se crean los archivos base** → `01-project-setup.md`: el scaffold inicial deja `docs/` con su estructura y los documentos de `architecture/` semilla.