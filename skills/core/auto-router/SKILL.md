---
name: auto-router
description: "MASTER ROUTER — Core systemic skill (MoE). Map user requests to the correct Wizard-AI loop-engineering workflow (loop-develop, loop-debug, loop-refactor, loop-release, loop-learn) or domain workflow with Task Weight Classification. ALWAYS trigger implicitly before starting any task."
---

# Auto-Router & MoE Classification (Master Router)

Human users don't always remember the exact name of a skill, workflow, or CLI wrapper. As an AI Agent operating within the Wizard-AI ecosystem, it is **YOUR responsibility** to automatically infer the correct loop/skill, classify the complexity of the task, and route it to the proper execution pipeline.

<MANDATORY>
This skill acts as Step 3 in the `prompt-loop-engine` PRE-PROMPT Pipeline.
NEVER ask the user which skill to use. Infer it silently and calculate the task weight.
</MANDATORY>

## 1. Task Weight Classification (MoE Gating)

Before executing a task, calculate its weight based on intent, context size, and keywords:

- **LIGHT Weight (Score ≤ 0.3)**
  - *Keywords:* `spiega, cos'è, mostra, dimmi, fix, typo, commento, allinea, formatta`
  - *Action:* Execute directly. Skip heavy pre/post processing (no optimize, no graphify).
- **MEDIUM Weight (Score 0.3 - 0.7)**
  - *Keywords:* `UI, design, layout, SEO, blog, documento, converti, test, implementa, debug, bug, errore`
  - *Action:* Route to specific loop or domain workflow.
- **HEAVY Weight (Score > 0.7)**
  - *Keywords:* `architettura, refactoring, migrazione, progetto, release, deploy, security audit, feature complessa`
  - *Action:* Route to loop-engineering workflow. Execute FULL iterative loop.

## 2. Primary Routing: 5 Sequenced Loop-Engineering Workflows (01 → 05)

These are the **primary numbered entry points** for any development task. Route here FIRST following the exact lifecycle progression from 01 to 05.

| Progress / User Intent | Numbered Loop Workflow | Aliases | Default Weight | Trigger Keywords |
|---|---|---|---|---|
| **01. Pianificazione & Specifiche** — allineare, sgarbugliare, specifiche, architettura | `loop-1-plan` | `/loop-1`, `/loop-plan`, `/align` | MEDIUM→HEAVY | `pianifica, analizza requisiti, allinea, specifica, design, architettura, prima di iniziare` |
| **02. Sviluppo & TDD** — feature, funzionalità, componente, implementazione, branch isolato | `loop-2-develop` | `/loop-2`, `/loop-develop`, `/tdd` | HEAVY | `sviluppa, implementa, crea, costruisci, build, aggiungi, feature, tdd` |
| **03. Debug & Verifica** — risoluzione bug, regressioni, code review, quality gates | `loop-3-debug` | `/loop-3`, `/loop-debug`, `/verify` | MEDIUM→HEAVY | `debug, bug, errore, crash, non funziona, broken, fix, issue, review, verifica` |
| **04. Refactoring & Ottimizzazione** — pulizia architettura, tech debt, compressione token | `loop-4-refactor` | `/loop-4`, `/loop-refactor`, `/optimize` | HEAVY | `refactor, migliora, architettura, ottimizza, clean up, riorganizza, tech debt, token` |
| **05. Rilascio & Apprendimento** — merge su main, semver release, npm publish, handoff, memoria | `loop-5-release` | `/loop-5`, `/loop-release`, `/learn` | HEAVY | `release, pubblica, rilascia, deploy, versione, tag, bump, impara, documenta, wiki, mem` |

## 3. Secondary Routing: Domain Workflows

If the request doesn't fit a loop-engineering workflow, route to a domain-specific workflow:

| User Intent / Vague Request | Domain Workflow | Default Weight | Action |
|---|---|---|---|
| "UI looks bad", "Improve design", "Make it premium" | `workflow-frontend-design` | MEDIUM | Apply `taste-skill` + `theme-factory` |
| "Extract text", "Read PDF/Word", "Analyze document" | `workflow-doc-processing` | LIGHT→MEDIUM | Use `ai-convert` or doc skills |
| "SEO audit", "Write blog post", "Analyze niche" | `workflow-seo-research` | MEDIUM | Use `claude-seo` & `claude-blog` |
| "Too long", "Reduce tokens", "Compress context" | `workflow-agentic-brain` | MEDIUM | Use `ai-compress` or `ai-squeeze` |
| "Map codebase", "Architecture diagram" | `graphify` / `ai-graph` | MEDIUM | Run `ai-graph .` |
| "Security audit", "Check vulnerabilities" | `cybersecurity` / `strix` | HEAVY | Penetration testing |
| "Save this", "Remember for later" | `session-manager` / `claude-mem` | LIGHT | `ai-session-save` or `ai-mem store` |
| "Start a new project", "Initialize", "Bootstrap" | `loop-1-plan` + `master-project-bootstrap` | HEAVY | `ai-scaffold` first, then `loop-1-plan` → `loop-2-develop` |

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
- If the request doesn't match perfectly, run `ai-help` to list all available tools and capabilities.
- If the user explicitly names a loop (e.g., `/loop-3-debug` or `/loop-3`), bypass routing and execute directly.

## Self-Improvement Constraint (Extracted Rule)
> "L'utente ha chiesto X. So ESATTAMENTE quale loop/skill/wrapper usare, o sto improvvisando? Ho calcolato il Task Weight correttamente? Ho routato verso un LOOP o verso una skill diretta?"
