---
name: 1-auto-router
description: "MASTER ROUTER — Core systemic skill (MoE). Si attiva AUTOMATICAMENTE SU QUALSIASI TESTO LIBERO o LINGUAGGIO NATURALE. Mappa le richieste utente verso i 5 Loop (01. loop-1-plan -> 05. loop-5-release) e innesca i tool semantici (serena, graphify, turbovec, claude-mem). Non richiede slash commands."
---

# Auto-Router & MoE Classification (Master Router)

Human users don't always remember the exact name of a skill, workflow, or CLI wrapper. As an AI Agent operating within the Wizard-AI ecosystem, it is **YOUR responsibility** to automatically infer the correct loop/skill, classify the complexity of the task, and route it to the proper execution pipeline.

<MANDATORY>
This skill acts as Step 3 in the `prompt-loop-engine` PRE-PROMPT Pipeline.
NEVER ask the user which skill to use. Infer it silently and calculate the task weight.

### 🚨 NEVER-STOP BATON-PASSING TRAJECTORY
When routing a task to `01. loop-1-plan` or `02. loop-2-develop`, you MUST NOT STOP when the single loop finishes! You are strictly mandated to chain through `01 → 02 → 03 → 04 → 05` autonomously until complete verification and delivery (`05. loop-5-release`).
Before any step, execute the mandatory Self-Questioning (`Autoforzatura al Dialogo Interno`):
`🧠 [SELF-QUESTION] "Quale strada di sviluppo o tool semantico devo usare ora per risolvere questo step col massimo rigore e qual è la condizione esatta per passare al loop successivo?"`
</MANDATORY>

## 1. Semantic Intent Routing & Task Weight (MoE Gating v2)

Before executing a task, DO NOT just match keywords. You must act as the **Semantic Orchestrator (Centralinista)**:

1. **Query the Brain (`brain-tech-stack`)**: Evaluate the user's intent to discover the optimal tech stack. What are the advantages of the required frameworks? (e.g. Astro for SEO, Qwik for resumability, Go for concurrency).
2. **Dynamic Skill Injection (The Architectural Trinity)**: For HEAVY/Full-Stack tasks, automatically assemble a prompt XML that forces the injection of:
   - *Foundation*: `engineering-excellence` & `devboards-architecture` (Clean architecture, SOLID, TDD).
   - *Backend*: Backend constraints (`mongodb`, `strix` for security).
   - *Frontend*: Design constraints (`frontend-design`, `stitch-taste-design`).
3. **Weight Classification**:
   - **LIGHT Weight (Score ≤ 0.3)**: Execute directly. Keywords: `spiega, fix, typo, commento`.
   - **MEDIUM Weight (Score 0.3 - 0.7)**: Route to specific loop. Keywords: `UI, SEO, blog, test, implementa, debug`.
   - **HEAVY Weight (Score > 0.7)**: Route to loop-engineering workflow with Multi-Agent Handoff. Keywords: `architettura, refactoring, migrazione, progetto full-stack, release`.

## 1.b Multi-Agent Handoff (Swarm Strategy)
If the task is HEAVY (e.g., "Build a full-stack web app"), do NOT execute everything in one context. Use `4-swarm-manager` and `dispatching-parallel-agents`:
- **Sub-Agent 1 (Master API)**: Injected with backend rules + `engineering-excellence`. Builds the API.
- **Sub-Agent 2 (Master UI)**: Injected with `stitch-taste-design`. Builds the frontend consuming the API.
- **Sub-Agent 3 (Security Auditor)**: Injected with `cybersecurity`. Audits both.

## 2. Primary Routing: 5 Sequenced Loop-Engineering Workflows (01 → 05)

These are the **primary numbered entry points** for any development task. Route here FIRST following the exact lifecycle progression from 01 to 05.

| Progress / User Intent | Numbered Loop Workflow | Aliases | Default Weight | Trigger Keywords |
|---|---|---|---|---|
| **01. Pianificazione & Specifiche** — allineare, sgarbugliare, specifiche, architettura | `loop-1-plan` | `/loop-1`, `/loop-plan`, `/align` | MEDIUM→HEAVY | `pianifica, analizza requisiti, allinea, specifica, design, architettura, prima di iniziare` |
| **02. Sviluppo & TDD** — feature, funzionalità, componente, implementazione, branch isolato | `loop-2-develop` | `/loop-2`, `/loop-develop`, `/tdd` | HEAVY | `sviluppa, implementa, crea, costruisci, build, aggiungi, feature, tdd` |
| **03. Debug & Verifica** — risoluzione bug, regressioni, code review, quality gates | `loop-3-debug` | `/loop-3`, `/loop-debug`, `/verify` | MEDIUM→HEAVY | `debug, bug, errore, crash, non funziona, broken, fix, issue, review, verifica` |
| **04. Refactoring & Ottimizzazione** — pulizia architettura, tech debt, compressione token | `loop-4-refactor` | `/loop-4`, `/loop-refactor`, `/optimize` | HEAVY | `refactor, migliora, architettura, ottimizza, clean up, riorganizza, tech debt, token` |
| **05. Rilascio & Apprendimento** — merge su main, semver release, npm publish, handoff, memoria | `loop-5-release` | `/loop-5`, `/loop-release`, `/learn` | HEAVY | `release, pubblica, rilascia, deploy, versione, tag, bump, impara, documenta, wiki, mem` |

## 3. Secondary Routing: Domain Workflows & Creative/Analytical Loop Expansion

If the request spans specific creative, analytical, or specialized domains beyond core code development, route to the exact domain workflow.
**Nota Bene (`Loop Expansion`)**: I loop e l'ottimizzazione contesto (`pi.dev / Rust-Cline Wrapper AST Pruning`) non appartengono solo al bugfix o allo sviluppo codice, ma si applicano integralmente al rafforzamento SEO, alle ricerche, a `mermaid-cli`, alle immagini e al design!

| User Intent / Specialized Domain | Domain Workflow / Loop | Universal AST & Sharded Context (`pi.dev / Rust Wrapper`) | Categorized Skills Activated |
|---|---|---|---|
| **SEO, Search & Inbound Marketing** ("SEO audit", "Analisi nicchia", "Blog SEO") | `workflow-seo-research` | Estrai solo meta-tags, header H1-H6 e sitemap via AST per non intasare i token | `claude-seo`, `claude-blog`, `last30days`, `firecrawl` |
| **Generazione Immagini, Arte & Infografiche** ("Crea poster", "Infografica", "Chart", "Art") | `canvas-design` / `infographic` | Estrai solo JSON schema e strutture layout prima di generare l'asset visivo | `algorithmic-art`, `canvas-design`, `infographic`, `theme-factory` |
| **Diagrammi, Mermaid CLI & Grafo Architettura** ("Diagramma flusso", "Map codebase", "Mermaid") | `mermaid-cli` + `graphify` | Pruning AST di classi e relazioni dipendenza per generare il codice `mermaid` esatto | `mermaid-cli`, `graphify`, `wz-ai graph` |
| **Frontend Design, UI/UX Taste & Impeccable Polish** ("UI looks bad", "Make it premium", "Stitch") | `workflow-frontend-design` | Estrai design tokens (`DESIGN.md`), CSS variabili ed esporta componenti isolati | `taste-skill`, `awesome-design`, `impeccable` (`polish`, `audit`), `stitch-taste-design` |
| **Video, Walkthrough & Motion Graphics** ("Genera video", "Walkthrough animato") | `hyperframes` / `stitch-remotion` | Estrai timesteps e keyframes strutturali | `hyperframes`, `stitch-remotion`, `voicebox` |
| **Document Parsing & Extraction** ("Extract text", "Read PDF/Word", "Analyze doc") | `workflow-doc-processing` | Converti in Markdown pulito (`wz-ai convert`) ed estrai solo indici/sommario | `markitdown`, `pdf`, `docx`, `xlsx`, `pptx` |
| **Universal Context Compression & AST Pruning** ("Too long", "Reduce tokens", "Compress") | `workflow-agentic-brain` | Esegui Pruning AST (`pi.dev` wrapper) e delegazione a subagent shardati (`pi-subagents`) | `wz-ai compress`, `wz-ai squeeze`, `lean-ctx`, `caveman` |
| **Security Audit & Pentesting** ("Security check", "Vulnerabilities") | `cybersecurity` / `strix` | Fan-out di subagent in parallelo su singoli moduli architetturali | `strix`, `cybersecurity`, `goodcode` |
| **Start a New Project / Bootstrap** ("Initialize", "Scaffold", "Nuovo progetto") | `loop-1-plan` + `master-project-bootstrap` | Pipeline sequenziale completa 01→05 con isolamento branch e TDD | `scaffold`, `master-project-bootstrap` |

## 4. mattpocock Skills — Direct Routing

These skills from `mattpocock/skills` are available with `mp-` prefix and can be triggered directly:

| Trigger | Skill | Purpose |
|---|---|---|
| `/grill-me`, `intervista`, `allineamento` | `mp-grill-me` | Sessione di allineamento rapida |
| `/grill-with-docs`, `linguaggio condiviso` | `mp-grill-with-docs` | Grilling con CONTEXT.md + ADR |
| `/triage`, `prioritizza issue` | `mp-triage` | Triage e classificazione ticket |
| `/to-spec`, `specifica` | `mp-to-spec` | Genera specifica tecnica formale |
| `/to-tickets`, `crea ticket` | `mp-to-tickets` | Decomposizione in ticket |
| `/prototype`, `prototipa` | `mp-prototype` | Prototipo rapido (UI o logica) |
| `/wayfinder`, `dove metto` | `mp-wayfinder` | Navigazione codebase |
| `/teach`, `insegna concetto` | `mp-teach` | Spiegazione strutturata |
| `/handoff`, `passaggio consegne` | `mp-handoff` | Handoff tra agenti/sessioni |
| `/code-review`, `review codice` | `mp-code-review` | Review automatica |
| `/diagnosing-bugs`, `diagnosi bug` | `mp-diagnosing-bugs` | Diagnosi root-cause strutturata |

## 5. Fallback Logic & MoE Combination

- If the user's request spans multiple domains (e.g., "Build a backend API and design the frontend UI"):
  - **Combine Loops:** Route to `loop-2-develop` + `workflow-frontend-design`.
  - **Elevate Weight:** Always elevate to **HEAVY**.
- If the request doesn't match perfectly, run `wz-ai help` to list all available tools and capabilities.
- If the user explicitly names a loop (e.g., `/loop-3-debug` or `/loop-3`), bypass routing and execute directly.

## Self-Improvement Constraint (Extracted Rule)
> "L'utente ha chiesto X. So ESATTAMENTE quale loop/skill/wrapper usare, o sto improvvisando? Ho calcolato il Task Weight correttamente? Ho routato verso un LOOP o verso una skill diretta?"
