# 03 · Skills y tooling

Guía del tercer pilar del blueprint: las **skills** que un agente IA carga por tarea y el **tooling local** que mantiene la disciplina de ingeniería (lint, tipos, tests con gate de cobertura, commits y ramas).

> Hermanos relacionados: el scaffold del stack vive en `01-project-setup.md` (§Vitest, §Tooling); el sistema de docs en `02-docs-structure.md`; el primer flujo end-to-end y los mensajes start/close en acción, en `04-first-steps.md`. El contrato operativo completo está en `AGENTS.template.md`.

---

## 1. Qué son las skills

Una **skill** es un módulo de instrucciones reutilizable que un agente IA (p. ej. un asistente de código) **carga bajo demanda para una tarea concreta**. No es código del proyecto, no se importa, no se compila y no aparece en el bundle: es contexto especializado que el agente lee para resolver mejor cierto tipo de trabajo.

Ideas clave para mantenerlas agnósticas:

- **Son instrucciones, no dependencias.** Viven fuera del repo de producto (instaladas a nivel global del agente) y describen *cómo abordar* un problema —patrones, checklists, errores típicos— no *qué* construir en tu dominio.
- **Se cargan por tarea, no siempre.** El agente activa la skill relevante al empezar un paso y la descarta cuando cambia de dominio. No es un linter que corre en CI; es conocimiento que el agente consulta.
- **No conocen tu dominio.** Una skill de rendimiento web no sabe nada de tus entidades; razona sobre renders, caché y Core Web Vitals. Esa neutralidad es lo que las hace reutilizables entre proyectos.
- **Complementan, no sustituyen, a `AGENTS.md`.** `AGENTS.md` es la ley del repo (alcance, rutas, reglas duras). Las skills aportan profundidad técnica en un área puntual. Si hay conflicto, manda `AGENTS.md`.

> Swap note: "skill" es el término del agente de referencia. Otros agentes las llaman *modes*, *rules packs* o *custom instructions*. El concepto —cargar un módulo de instrucciones por tarea— es portable; cambia el comando de instalación, no la idea.

---

## 2. Set básico recomendado

Mantén los nombres **categóricos**, no atados a un repo concreto: elige una skill que cubra cada categoría con tu agente.

| Categoría de skill | Para qué sirve | Cuándo usarla |
| --- | --- | --- |
| **React/Next.js best-practices** | Patrones de componentes, Server vs Client Components, data fetching, límites de `"use client"`. | Al escribir o refactorizar componentes y la capa de datos. |
| **Next.js performance / Core Web Vitals** | Rendering, streaming/Suspense, caché (`revalidateTag`, `unstable_cache`), `next/image` y `next/font`, tamaño de bundle. | Al optimizar LCP/INP/CLS o cuando una vista renderiza lento o envía demasiado JS. |
| **UI/UX polish** | Jerarquía visual, estados (loading/empty/error), accesibilidad, motion, consistencia con el design system. | En trabajo de diseño/interfaz y al pulir pantallas antes de cerrar una feature. |
| **Codebase mapping** | Traza dónde vive cada cosa, qué llama a qué, alcance real de un cambio, con citas `file:line`. | Al entrar en un área desconocida o antes de un refactor que cruza módulos. |
| **Architectural plan-review** | Presiona un plan escrito: data flow, failure modes, rollback, matriz de tests, edge cases. | Después de tener un plan y **antes** de implementar algo no trivial. |
| **Post-change React audit** | Revisa cambios de React recién hechos: hooks mal usados, dependencias, re-renders, fugas. | Justo después de tocar React, al cerrar feature o tras corregir un bug. |

Regla de oro: instala **una** skill por categoría. Tener tres skills de "React best-practices" solo añade ruido y solapa instrucciones.

---

## 3. Instalación

Patrón canónico de instalación **global** (la skill queda disponible para el agente en nuevas sesiones):

```bash
npx skills add <repo-or-url> --skill <name> --global --agent claude-code --yes
```

Desglose de flags:

- `<repo-or-url>` — el repositorio o URL que contiene la skill.
- `--skill <name>` — el nombre de la skill dentro de ese repo.
- `--global` — la instala a nivel del agente, no del proyecto (no ensucia tu repo de producto).
- `--agent claude-code` — el agente destino (ajusta si usas otro).
- `--yes` — acepta los prompts sin interacción.

### Gotcha: repos con estructura de plugin

Si la skill vive **anidada bajo una estructura de plugin** (`plugins/<x>/skills/<name>/`), el `--skill <name>` "a secas" puede **no resolver**, porque el resolver no encuentra la skill en la raíz esperada. En ese caso, pasa la **URL directa del árbol** a la carpeta de la skill:

```bash
# Forma normal (raíz del repo)
npx skills add <repo-or-url> --skill <name> --global --agent claude-code --yes

# Forma para repos plugin-structured (URL directa al árbol de la skill)
npx skills add https://github.com/<owner>/<repo>/tree/main/plugins/<x>/skills/<name> \
  --global --agent claude-code --yes
```

### Importante: cuándo entra en vigor

> Las skills globales **se cargan en sesiones NUEVAS**, no en la sesión actual. Tras instalar una, **abre una sesión nueva** del agente para que la tenga disponible. No esperes que aparezca a mitad de la conversación en curso.

Verifica tras reabrir: la skill debería figurar en la lista de skills disponibles del agente.

---

## 4. Routing

Qué skill activar según el tipo de tarea:

| Tipo de tarea | Skill primaria | ¿Secundaria? |
| --- | --- | --- |
| Entrar en código/área desconocida, planear refactor | Codebase mapping | — |
| Revisar un plan antes de implementar | Architectural plan-review | — |
| Escribir/refactorizar componentes y data fetching | React/Next.js best-practices | UI/UX polish si toca diseño |
| Optimizar rendimiento, caché, bundle, render | Next.js performance / Core Web Vitals | React/Next.js best-practices si reestructuras componentes |
| Trabajo de diseño/interfaz | UI/UX polish | React/Next.js best-practices si implementas a la vez |
| Cerrar feature React / tras corregir bug | Post-change React audit | — |

### Regla de cardinalidad

> **Máximo 1 skill primaria por paso** (+1 secundaria **solo** si la tarea cruza dos dominios, p. ej. implementar UI nueva *y* su rendimiento). Más de dos skills a la vez se contradicen entre sí y diluyen el foco.

### Orden de prioridad cuando varias podrían aplicar

Resuelve el empate en este orden:

1. **Seguridad / datos primero** — si el cambio toca validación, contratos de datos, permisos o el borde de seguridad, esa preocupación manda (revisa también el §borde de seguridad en `AGENTS.template.md` y la matriz de tests de `01-project-setup.md`).
2. **Runtime / arquitectura segundo** — failure modes, data flow, boundaries y plan-review antes de escribir código.
3. **Rendering / UX tercero** — performance, pulido visual y accesibilidad, una vez la base es sólida.

Es decir: nunca pulas la UI de un endpoint cuya validación de datos aún no está cerrada.

---

## 5. Memoria persistente / MCP (opcional)

Una capa de **memoria persistente** (vía un servidor MCP u otro mecanismo del agente) permite recordar contexto entre sesiones. Úsala para:

- **Recordar decisiones previas** — por qué se eligió X sobre Y, trade-offs, convenciones del repo.
- **Guardar bugfixes y patrones reutilizables** — el síntoma, la causa raíz y la corrección, para no repetir el diagnóstico.
- **Recuperar contexto al arrancar** — qué se hizo en la última sesión sobre cierta área.

Buen flujo: al empezar trabajo no trivial, consulta la memoria del área; tras un bugfix, decisión o descubrimiento, guarda una entrada corta y buscable. Antes de cerrar la sesión, guarda un resumen.

> **Regla dura — NUNCA guardes en memoria:** secrets, tokens, valores de variables de entorno (`.env*`), cookies de sesión ni **PII** (datos personales). La memoria es para conocimiento de ingeniería del repo, no para datos sensibles. Si dudas si algo es sensible, no lo guardes.

Swap note: si tu agente no tiene memoria persistente, el sustituto es disciplina de docs —ADRs en `docs/decisions/` y entradas de `docs/changelog/`— que cumplen el mismo fin de forma versionada (ver `02-docs-structure.md`).

---

## 6. Tooling del proyecto

El tooling local es lo que hace cumplir la disciplina aunque el agente o la persona olvide una regla. Cada pieza, con su porqué:

- **ESLint** — captura errores y antipatrones en cada cambio; falla el build ante violaciones. *Por qué*: la consistencia no puede depender de revisión manual.
- **TypeScript `strict: true`** — `strict` activado, sin `any` implícito ni nulabilidad silenciosa. *Por qué*: el sistema de tipos atrapa contratos rotos antes de runtime.
- **Vitest + gate de cobertura** — tests con `environment: "node"` (sin jsdom/RTL) y **umbral de cobertura al 100% en el borde de seguridad** (`api-helpers`, el mapper de errores de dominio `api-errors`, el helper de patch `patch`). *Por qué*: perder cobertura en el borde rompe el build a propósito; es la línea que protege contratos de datos y auth. El resto de mínimos de testing están en `01-project-setup.md` (§Vitest) y `AGENTS.template.md`.
- **Conventional commits** — mensajes en inglés con prefijo de tipo (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`). *Por qué*: historial parseable y changelog derivable.
- **Branch naming** — ramas `feature/`, `fix/`, `chore/`. *Por qué*: el prefijo comunica intención de un vistazo y casa con el flujo de PRs.
- **Post-change React audit (opcional)** — una pasada estilo "react-doctor" tras tocar React, configurada para correr en local o como skill. *Por qué*: detecta hooks mal usados y re-renders antes de que lleguen a review.

Ejemplo de los scripts canónicos en `package.json` (ajusta el gestor; aquí `bun`):

```json
{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

Ejemplo del gate de cobertura en `vitest.config.ts` (solo el borde de seguridad al 100%):

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    coverage: {
      provider: "v8",
      include: ["src/lib/api-helpers.ts", "src/lib/api-errors.ts", "src/lib/patch.ts"],
      thresholds: {
        // El borde de seguridad: si baja del 100%, el build falla.
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
});
```

> Comandos de verificación (la "ship check"): `lint` + `typecheck` + `test` en verde antes de cerrar. Detalle completo en `01-project-setup.md` (§Verificación) y en las Done Gates de `AGENTS.template.md`.

---

## 7. CLAUDE.md vs AGENTS.md

Son dos archivos con roles distintos, y la separación es deliberada:

- **`AGENTS.md`** — el **contrato operativo completo**: clasificación de tareas, rutas source-of-truth, reglas duras (DB, seguridad, UI, doc-sync), plantillas de mensaje start/close y done gates. Es largo a propósito. Plantilla lista para copiar: `AGENTS.template.md`.
- **`CLAUDE.md`** — un **puntero fino**. Su único trabajo es decir "lee y cumple `AGENTS.md` antes de responder" y, para tareas de UI, apuntar a las pocas docs de diseño. No duplica reglas; redirige.

¿Por qué separarlos? Porque algunos agentes auto-cargan `CLAUDE.md` pero no `AGENTS.md`. El puntero garantiza que el contrato real siempre se lea, sin mantener dos copias de las reglas (lo que llevaría a que diverjan).

### Ejemplo mínimo de `CLAUDE.md`

```markdown
# <project> — Agent Instructions

## MANDATORY: Read and follow AGENTS.md EVERY session

**BEFORE any response**, read and comply with `AGENTS.md`. This is not optional.
AGENTS.md is the repo operating contract: execution protocol, response templates,
hard rules (scope, routing, DB, security, UI, doc-sync) and done gates.

If you respond without following that protocol, you are violating project rules.

If the task touches UI, also read:
- `docs/design/README.md`
- `docs/design/ui.md`         # tokens
- `docs/design/components.md` # inventory / anatomy
- `docs/design/ux.md`         # interaction rules

If a persistent-memory / MCP server is available:
- Start non-trivial work by checking recent context.
- Save durable knowledge (bugfix, decision, pattern) after the fact.
- NEVER store secrets, tokens, env values, cookies or PII in memory.
```

> Mantén `CLAUDE.md` así de delgado. Toda regla nueva va a `AGENTS.template.md` (y de ahí al `AGENTS.md` de tu proyecto), nunca al puntero.