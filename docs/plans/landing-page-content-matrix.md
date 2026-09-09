# Landing Page Content Matrix — Centro de Artes Escenicas Tomba

> Status: master inventory · Last updated: 2026-09-08

## Purpose and workflow

This is the editorial working matrix for the landing page. It consolidates the Spanish source copy supplied by the architecture team and identifies every visual required for the final experience. It is not a runtime content source: approved visible copy must be translated and moved into `messages/es.json` and `messages/en.json` before publication.

The first architecture-team delivery is inventoried under `public/images/` and
`public/videos/`. Strong filename and visual matches are recorded as
`Candidate`; they continue to render as placeholders. `Approved` remains
reserved for section-level review of composition, legibility, optimization,
rights, alt text, and credit. The candidate pool is not the final publication
baseline and must be narrowed before release.

Plan 1 has materialized this structure in `content/landing-page.json` and placed the Spanish editorial working copy under the `landing` namespace in `messages/es.json`. The manifest remains in `editorial-review` until the open decisions below are confirmed or explicitly deferred. Matching English keys are reserved but are not approved translations.

The final thesis presentation is a source of evidence and topics, but its academic index is not the landing-page information architecture. The web experience must reorganize that material as a concise spatial journey. It should prioritize what a visitor, artist, student, or neighbor experiences over reproducing the sequence of presentation chapters.

This matrix is the master inventory, not a single implementation plan. Delivery is divided into six bounded plans, plus a separate project-skill plan:

1. [Plan 1 — Spanish editorial foundation and content manifest](landing-page-plan-1-editorial-manifest.md)
2. [Plan 2 — Section module system](landing-page-plan-2-section-modules.md)
3. [Plan 3 — Asset inventory and selection](landing-page-plan-3-asset-inventory.md), which may run alongside Plan 2 after Plan 1.
4. [Plan 4 — Spanish content integration](landing-page-plan-4-spanish-integration.md)
5. [Plan 5 — English editorial localization](landing-page-plan-5-english-localization.md)
6. [Plan 6 — Final assets and publication readiness](landing-page-plan-6-publication.md)

The reusable module workflow is specified independently in [Project Skill Plan — Build Landing Section](landing-page-skill-build-section.md). Creating the skill is not part of Plan 2.

Each plan must satisfy its exit criteria before the next one starts. Decisions and asset statuses discovered during execution must also be reflected in this matrix.

## Content matrix

| Section | Eyebrow / title | Draft Spanish copy | Visual narrative |
| --- | --- | --- | --- |
| Hero | **Centro de Artes Escenicas Tomba**<br>Refuncionalizacion de la Ex Bodega Tomba | Una intervencion patrimonial que recupera uno de los conjuntos industriales mas emblematicos de Mendoza para transformarlo en un espacio dedicado a la cultura, la creacion y la comunidad. | A single full-screen image introduces the project before the reader starts the journey. |
| Concept | **Construir sobre la memoria** | La propuesta parte de una idea clara: el patrimonio no debe permanecer inmovil, sino adaptarse a las necesidades de cada epoca sin perder su identidad. En lugar de reconstruir la antigua bodega, el proyecto preserva sus elementos mas valiosos y los complementa mediante una arquitectura contemporanea que dialoga con la preexistencia. El resultado es un edificio donde pasado y presente conviven, permitiendo que la historia continue escribiendose. | Use a conceptual collage and a clear old/new relationship diagram. Quote: “No restauramos unicamente un edificio; recuperamos un lugar para la cultura y la comunidad.” |
| Context and site | **Un patrimonio con potencial para transformar la ciudad** | La Ex Bodega Tomba se ubica en Godoy Cruz, Mendoza, y forma parte del Camino del Vino junto con las bodegas Arizu y Escorihuela. Su ubicacion estrategica y su valor historico la convierten en el lugar ideal para un nuevo equipamiento cultural capaz de revitalizar el sector y fortalecer el vinculo entre patrimonio y comunidad. El proyecto responde, ademas, a la necesidad de ampliar la infraestructura para las artes escenicas en el Area Metropolitana de Mendoza. | Reveal the local SVG map, then contrast historical and current conditions. Highlight: 21,850 m² site area; 6,545 m² current covered area; 500–600 people estimated capacity; founded in 1885; heritage designation in 2009. |
| References | **Aprender del patrimonio para proyectar el futuro** | El proyecto toma como referencia intervenciones que demuestran que es posible incorporar nuevos usos en edificios historicos sin perder su identidad. Los criterios de intervencion priorizan la autenticidad del conjunto, la diferenciacion entre lo nuevo y lo existente y la reversibilidad de las nuevas incorporaciones. | Three cards: Ex-Molino Marconetti (container/content), Centro de Artes Agueda (public plaza and hall), and Teatro Municipal General San Martin (multiple theatre typologies connected by a hall). |
| Design process | **Del analisis a la propuesta** | El proyecto surge de relevamientos, estudios patrimoniales, analisis urbanos y entrevistas. Estas instancias permitieron definir que elementos conservar, cuales transformar y como incorporar nuevos espacios sin alterar la identidad del conjunto. La reinterpretacion del arco existente se convierte en el principal recurso compositivo de la nueva intervencion. | Scroll-drawn plans and diagrams show historic research, diagnosis, heritage valuation, and the arc transformation. |
| Programme | **Un nuevo centro cultural para Mendoza** | El programa reutiliza las distintas naves existentes e incorpora nuevos espacios para la produccion artistica, la formacion y el encuentro ciudadano. El conjunto integra salas teatrales, museo, espacios de ensayo, talleres, restaurante, areas administrativas y espacios publicos que articulan todo el proyecto. Cada edificio mantiene su identidad y participa de un recorrido continuo para artistas, estudiantes, vecinos y visitantes. | Pair the programme diagram with the masterplan and differentiated public/artist circulation. Total programme: 6,935 m² interior and 10,853 m² exterior. |
| Users and journeys | **Habitar Tomba** | El proyecto se comprende a traves de quienes lo recorren. Visitantes, artistas, estudiantes, trabajadores y vecinos ingresan desde la ciudad y encuentran distintas formas de atravesar el espacio publico, los silos, la Nave Teatro, el hall y las salas. Sus recorridos se diferencian cuando la actividad lo requiere y vuelven a encontrarse en los espacios colectivos. | Transform the academic “subject analysis” into a human spatial journey. Follow the sequence city → public space → heritage access → silos → Nave Teatro → hall → halls, with layered routes for public, artists/students, and service staff. |
| Proposal | **Una arquitectura que dialoga con el patrimonio** | La intervencion conserva las fachadas historicas de la bodega y separa deliberadamente los nuevos volumenes de los muros existentes, generando un vacio que distingue ambas etapas constructivas. El corazon del proyecto es la Nave Teatro, con una Sala Italiana, una Sala Circular y una Sala Experimental. Los espacios publicos, el paseo cultural y la recuperacion de los silos amplian el uso del conjunto mas alla de los espectaculos. | The primary long-form scene. Follow the real visitor route: public space, silos, Nave Teatro, hall, then the three halls. Use a plan/render comparison and selected drawings. |
| Materiality | **La tecnologia al servicio del patrimonio** | La propuesta incorpora una estructura metalica independiente que preserva la lectura historica de las fachadas existentes. El arco original se reinterpreta en la estructura, la cubierta y la proteccion solar. Paneles solares, sistema VRV y materiales de alto rendimiento mejoran el comportamiento energetico del edificio. | Focus on the independent metal structure, brick restoration, parasols, roof, energy strategy, and acoustic materiality of each hall. |
| Physical model | **Comprender el proyecto a traves de la representacion** | La maqueta permitio verificar las relaciones espaciales entre las naves, comprender la escala del conjunto y analizar el dialogo entre la arquitectura historica y las nuevas incorporaciones. Se convirtio en una herramienta de desarrollo y comunicacion del proyecto. | Include only if final model photography exists. Otherwise replace this scene with additional proposal imagery. |
| Reflection | **Recuperar el patrimonio es construir futuro** | La Ex Bodega Tomba representa mucho mas que un edificio industrial: es parte de la identidad de Mendoza. El proyecto propone devolverle un rol activo mediante un programa que promueve cultura, memoria colectiva y encuentro comunitario. Conservar no significa detener el tiempo, sino permitir que la historia continue evolucionando. | A quiet final scene using a panoramic, night, or inhabited render. Quote: “Cuando el patrimonio vuelve a ser habitado, la memoria deja de pertenecer al pasado y comienza a formar parte del futuro.” |
| Credits | **Centro de Artes Escenicas Tomba** | Autoras: Valentina Lopez Dupertuis, Rocio Macenco y Valentina Najul.<br>Facultad de Arquitectura, Universidad Nacional de Cuyo.<br>Trabajo final de grado — Arquitectura, 2026. | Include tutor, final PDF, and approved public contact details once supplied. |

## Asset matrix

| Asset ID | Section | Required asset | Project URL | Status | Alt text / credit |
| --- | --- | --- | --- | --- | --- |
| hero-primary | Hero | Exterior Nave Teatro from Rivadavia or general axonometry | `/images/hero/RENDER GENERAL EXTERIOR.svg` | Candidate | Catalog alt draft; credit pending |
| concept-collage | Concept | Conceptual collage | `/images/concept/COLLAGE CONCEP.svg` | Candidate | Catalog alt draft; credit pending |
| concept-diagram | Concept | Heritage plus contemporary architecture diagram | `/images/concept/DIAGRAMA DE USO TESIS.svg` | Candidate | Catalog alt draft; credit pending |
| concept-existing | Concept | Existing winery photograph | `/images/concept/FOTOGRAFIA BODEGA EXISTENTE.svg` | Candidate | Catalog alt draft; credit pending |
| site-regional-map | Context and site | Mendoza and Camino del Vino map | `/images/site/MAPA REG MENDOZA GC.svg` | Candidate | Catalog alt draft; credit pending |
| site-location-plan | Context and site | Detailed location/site plan | `/images/site/PLANO DETALLADO UBICACION.svg` | Candidate | Catalog alt draft; credit pending |
| site-aerial | Context and site | Aerial view or context volumetry | `/images/site/AXONOMETRIA- FOTOGRAFIA AEREA DEL ESTADO ACTUAL DE LA BODEGA.svg` | Candidate | Catalog alt draft; credit pending |
| site-historical | Context and site | Historical winery photographs | `/images/site/FOTO ANTIGUA 1Vista fachada de esquina Rivadavia y San Martín.svg` | Candidate | Catalog alt draft; source and credit pending |
| site-current | Context and site | Current-condition photographs | `/images/site/VISTA ACTUAL 1.svg` | Candidate | Catalog alt draft; credit pending |
| reference-marconetti | References | Ex-Molino Marconetti image and credit | `/images/references/Molino Marconetti.jpg` | Candidate | Catalog alt draft; source, rights, and credit pending |
| reference-agueda | References | Centro de Artes Agueda image and credit | `/images/references/CENTRO DE ARTES AGUEDA.jpg` | Candidate | Catalog alt draft; source, rights, and credit pending |
| reference-san-martin | References | Teatro Municipal General San Martin image and credit | `/images/references/TEATRO SAN MARTIN_.jpg` | Candidate | Catalog alt draft; source, rights, and credit pending |
| process-history | Design process | Historical timeline or research diagram | `/images/process/HISTORIA 7.svg` | Candidate | Catalog alt draft; credit pending |
| process-diagnosis | Design process | Existing-condition diagnosis | `/images/process/COCLUSION PATOLOGIAS GENERALES DEBIDO AL RELEVAMIENTO DEL ESTADO ACTUAL DEL EDIFICIO.svg` | Candidate | Catalog alt draft; credit pending |
| process-heritage-value | Design process | Heritage-value traffic-light diagram | `/images/process/DIAGRAMA VALORACION.svg` | Candidate | Catalog alt draft; credit pending |
| process-intervention | Design process | Preserve/intervene/demolish diagram | `/images/process/DIAGRAMA CONSERVACION.svg` | Candidate | Catalog alt draft; credit pending |
| process-arc | Design process | Arc reinterpretation diagram | `/images/proposal/arc-reinterpretation/GRAFICO REINT ARCO COMO ESTRUCTURA.svg` | Candidate | Catalog alt draft; credit pending |
| programme-masterplan | Programme | Masterplan / general plan | `/images/programme/MASTER PLAN - PLANIMETRIA GENERAL.svg` | Candidate | Catalog alt draft; optimization and credit pending |
| programme-axonometry | Programme | General programme axonometry | `/images/programme/AXONOMETRIA PROGRAMICA.svg` | Candidate | Catalog alt draft; credit pending |
| journey-circulation | Users and journeys | Layered public, artist/student, and service circulation diagram | Pending | Pending | Pending |
| proposal-public-space | Proposal | Public-space render | `/images/proposal/render estacion patrimonial.svg` | Candidate | Catalog alt draft; credit pending |
| proposal-silos | Proposal | Recovered silos render or diagram | `/images/proposal/DIAGRAMA PLANTA SILOS DETALLRE.svg` | Candidate | Catalog alt draft; optimization and credit pending |
| proposal-theatre-exterior | Proposal | Nave Teatro exterior render | `/images/proposal/RENDER ENTRADA NAVE TEATRO.svg` | Candidate | Catalog alt draft; credit pending |
| proposal-hall | Proposal | Central hall interior render | `/images/proposal/RENDER HALL PRINCIPAL PLANTA BAJA.svg` | Candidate | Catalog alt draft; optimization and credit pending |
| proposal-italian-hall | Proposal | Sala Italiana render | `/images/proposal/halls/italian-hall/RENDER SALA IT INT.svg` | Candidate | Catalog alt draft; credit pending |
| proposal-circular-hall | Proposal | Sala Circular render | `/images/proposal/halls/circular-hall/RENDER SALA CIRC.svg` | Candidate | Catalog alt draft; credit pending |
| proposal-experimental-hall | Proposal | Sala Experimental render | `/images/proposal/halls/experimental-hall/RENDER INT SALA EXP.svg` | Candidate | Catalog alt draft; optimization and credit pending |
| proposal-plans | Proposal | Ground floor and basement plans | Pending | Pending | Pending |
| proposal-sections | Proposal | Transverse and longitudinal sections | Pending | Pending | Pending |
| proposal-elevations | Proposal | West, south, and east elevations | Pending | Pending | Pending |
| material-structure | Materiality | Structural system / arc detail | `/images/materiality/AXONOMETRIA ESTRUCTURAL.svg` | Candidate | Catalog alt draft; optimization and credit pending |
| material-envelope | Materiality | Brick, metalwork, parasol, and roof details | `/images/materiality/DETALLE ESCANTILLON.svg` | Candidate | Catalog alt draft; credit pending |
| material-sustainability | Materiality | Solar and VRV strategy diagram | Pending | Pending | Pending |
| material-acoustics | Materiality | Acoustic detail for each hall | Pending | Pending | Pending |
| model-general | Physical model | General model photographs | Pending | Pending | Pending |
| model-detail | Physical model | Detail and aerial model photographs | Pending | Pending | Pending |
| reflection-final | Reflection | Panoramic, night, or inhabited final render | `/images/proposal/RENDER ENTRADA NAVE TEATRO NOCHE.svg` | Candidate | Catalog alt draft; credit pending |

The delivered video at `/videos/VIDEO FINAL TESIS- CAET.mp4` remains outside the
manifest until its narrative role, controls, transcript or alternative, loading
strategy, and publication approval are defined.

## Open content decisions

- Confirm that “Habitar Tomba” is the final published title and validate the named user groups and route sequence.
- Confirm whether a physical model and publication-ready photographs exist. If not, remove the physical-model scene and extend the proposal sequence.
- Confirm the tutor name, approved public contacts, and final PDF availability.
- Verify all numerical and historical claims against the final thesis material before publication.
- Approve the final Spanish copy, then provide an English editorial translation rather than a literal one.
