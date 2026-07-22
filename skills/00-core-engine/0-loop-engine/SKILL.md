---
name: 0-loop-engine
description: "MASTER ORCHESTRATOR — Pipeline Loop Engineering deterministico che si attiva PRIMA e DOPO OGNI prompt utente, INCLUSO QUALSIASI TESTO IN LINGUAGGIO NATURALE. Triggera automaticamente i 5 Loop numerati (01-05) e attiva i tool semantici (serena, graphify, turbovec, claude-mem). Non richiede slash commands."
---# Prompt Loop Engine — The Master Pipeline

This is the **supreme skill** of the Wizard-AI ecosystem. Every single user interaction MUST go through this loop. There are no exceptions.

<MANDATORY>
This skill is the FIRST file the agent must process. Every other skill is subordinate to this pipeline.
If you are a subagent, skip the PRE/POST pipeline but respect the domain skills.

### 🚨 SELF-FORCEING KERNEL RULES (ZERO-STOP & SELF-QUESTIONING & COT TRANSPARENCY LOG)
1. **THE LOOP MUST NEVER END IF YOU DON'T COMPLETE EVERYTHING (NEVER-STOP MANDATE)**:
   The LLM agent IS ABSOLUTELY PROHIBITED from ending his response turn or asking the user "Do you want to proceed?" before the whole cycle`01 → 02 → 03 → 04 → 05`has reached a complete and verified resolution. Once a loop (e.g.`01. loop-1-plan`) completes its output (`.spec.md`), the agent MUST AUTOMATICALLY AND IMMEDIATELY TRIGGER THE NEXT LOOP (`02. loop-2-develop`→`03. loop-3-debug`→`05. loop-5-release`) within the same workflow or shift, passing the baton seamlessly.
2. **SELF-FORCEMENT TO INTERNAL DIALOGUE AND CHOICE OF PATH (SELF-QUESTIONING PROTOCOL)**:
   Before any action or code writing, the agent MUST ask himself the following question and print it in output to ensure maximum architectural rigor:```
   🔄 [AUTONOMOUS LOOP ENGINE] Loop Attivo: 0X. loop-X-...
   🧠 [SELF-QUESTION] "Quale strada di sviluppo o tool semantico (serena, graphify, turbovec, claude-mem) devo adottare ora per risolvere questo step e qual è la condizione esatta di completamento per passare al loop successivo?"
   ```3. **MANDATORY COT STEP TRAVERSAL LOG & TOKEN SAVINGS GAUGE (`show-active-skill`)**:
   To make the effectiveness of the token saving and the depth of the reasoning clear to the user (as the *Gemini CLI*, *Antigravity CLI* or the frontier and reasoning models do), the agent HAS THE INVARIABLE OBLIGATION to show the transparency header at the beginning and at the end of each response (`show-active-skill`). In it it must show the chain of steps being crossed:`CoT Step Traversal: [Step 1: Plan/Route] ➔ [Step 2: Context Pruning (lean-ctx/ktx)] ➔ [Step 3: Action/Code] ➔ [Step 4: Token Squeeze (sqz/caveman)] ➔ [Step 5: Memory Handoff]`and quantify the effectiveness of token saving in the block`⚡ Token & Context Optimization Gauge`(es.`lean-ctx/ktx: -60-90% visibilità file prunata`,`caveman: -75% output token reduction`,`sqz: log compressi`).
</MANDATORY>

---

## 🧠 Architecture: Mixture of Experts (MoE) Routing

The loop uses a routing system inspired by the Mixture of Experts of modern LLMs. Each user prompt is analyzed by a **gating function** which calculates a relevance score for each skill/workflow and determines which pipeline steps to activate.

### Gating Function (Intent Classification)```
Per ogni prompt P dell'utente:

1. TOKENIZE: Estrai keyword K = {k₁, k₂, ..., kₙ} dal prompt
2. MATCH: Per ogni skill Sᵢ, calcola:
   relevance(Sᵢ, P) = Σⱼ (weight(kⱼ) × affinity(kⱼ, Sᵢ))
3. CLASSIFY WEIGHT:
   task_weight = f(max_relevance, keyword_density, context_size)
4. ROUTE: Seleziona il workflow Wₖ con score più alto
5. GATE: Attiva gli step del pipeline secondo il task_weight
```### Task Weight Classification

| Weight | Criterion | Active Steps | Example |
|--------|----------|-------------|---------|
| **LIGHT** (≤0.3) | Direct question, single fix, explanation | PRE: 1,3,5,6 → EXEC → POST: 10,11 | "What is X?", "fix this typo" |
| **MEDIUM** (0.3-0.7) | Small feature, review, partial refactoring | PRE: 1,2,3,5,6 → EXEC → POST: 7,10,11 | "Add unit test", "refactor this function" |
| **HEAVY** (>0.7) | Complex feature, architecture, release, new project | PRE: all → EXEC → POST: all | "Build a full backend", "release version" |

### Weight Classification Formula```
task_weight = sigmoid(
  α × keyword_complexity_score +
  β × file_count_estimate +
  γ × context_window_usage +
  δ × has_multi_step_intent
)

dove:
  α = 0.35 (peso delle keyword di complessità)
  β = 0.25 (stima file coinvolti)
  γ = 0.15 (occupazione finestra di contesto)
  δ = 0.25 (indicatore di intent multi-step)
```**High complexity keywords** (increases weight):`architettura, refactoring, migrazione, progetto, release, deploy, security audit, database schema, API design, pipeline, microservizi, monolite, full-stack`**Low complexity keywords** (reduce weight):`spiega, cos'è, mostra, dimmi, fix, typo, commento, allinea, formatta`---

## 🔄 Pipeline Completo: PRE → EXEC → POST

### ═══════════════ PRE-PROMPT PIPELINE ═══════════════

#### Step 1: Context Restore & Task Recovery Hub 🔄 (ALWAYS — tutte le weight)
**Skill:**`session-manager`(RESTORE + mode`Task Recovery Hub`+`Brain-to-Skill / Graph Map`)

- Laws`MEMORY.md`(`Diario di Bordo Personale`) and injects the context of the previous session.
- **Task Recovery Hub & Summarizer**: Carefully read the **Summarizer / Lost or Suspended Tasks section (`[⏳ TASK SOSPESA DA RIPRENDERE]`)**. If there are tasks interrupted by previous sessions or failed steps, immediately reinitialize them as the priority of the current loop without losing context.
- **Brain-to-Skill & Graph Check**: Check the state of the semantic graph (`graphify`/`wz-ai-graph`) and skills (`book-to-skill`). If necessary, upload the updated project map to ensure full architectural awareness at startup.
- If the context window is already large (>60%), automatically activate Step 4.

**Self-Check Questions:**
> ☐ Have I read MEMORY.md and the Summarizer section of the Journal?
> ☐ I recovered and queued the lost/suspended tasks (`Task Recovery Hub`)?
> ☐ I have verified and aligned the graph map and the project skills (`Brain-to-Skill`)?
> ☐ Do I have enough context to understand decisions and paths discarded in the past?

---

#### Step 2: Prompt Engineering 📝 (MEDIUM + HEAVY)
**Skills:**`auto-prompt`- If the prompt is vague, ambiguous or complex → restructure in deterministic XML format
<truncated... let's keep lines identical up to step 10>
---

#### Step 10: Session Save & Brain-to-Skill / Graph Sync 💾 (ALWAYS)
**Skills:**`session-manager`(SAVE + mode`Graph/Skill Sync`)

- Compress and summarize the current state.
- Write on`MEMORY.md`:
  - What was done
  - Open bugs/questions
  - Next steps
  - Design decisions
- **Brain-to-Skill & Graph Sync**: Before closing, perform or verify the project graph update (`wz-ai-graph update`) and the synchronization of the skill/knowledge base (`book-to-skill`/ wiki), to preserve the structural framework in future or subsequent sessions.
- Run`wz-ai-session-save`e`wz-ai-storybloq snapshot`- **ANONYMIZE** local routes before saving

**Self-Check Questions:**
> ☐ Is the summary concise but complete?
> ☐ I updated the graph (`wz-ai-graph`) and the project memory for the next session?
> ☐ Have I anonymized the routes?
> ☐ Are the next steps clear for the next session?
- Inject`<fixed_skills>`(mandatory skills) e`<dynamic_skills>`(suggested skills)
- Use economical templates (Flash/Haiku) for rewriting

**Self-Check Questions:**
> ☐ Is the prompt clear and structured?
> ☐ Have I identified all implicit constraints?
> ☐ Have the necessary skills been tagged in the structured prompt?

---

#### Step 3: Semantic Intent Routing & MoE Classification 🎯 (ALWAYS)
**Skills:**`auto-router`(MoE v2 version)

- **Action 1: Query The Brain (`brain-tech-stack`)**: Before routing, semantically evaluate the benefits of the necessary frameworks for the user intent.
- **Action 2: Dynamic Skill Injection**: Compose the Architectural Trinity (Basic Rules + Backend + Frontend) if the project is HEAVY.
- **Action 3: Task Weight**: Calculate the`task_weight`(LIGHT, MEDIUM, HEAVY) e decidi se delegare a subagents (`4-swarm-manager`).
- Determine`task_weight`and apply the **Extended Routing Matrix (v2 — Loop-First):**

#### Primary Routing: 5 Loop-Engineering Workflows

| Intent / Keyword Triggers | Loop Target | Weight Default |
|--------------------------|----------|----------------|
| develop, implement, create, build, feature, build |`loop-develop`| HEAVY |
| debug, bug, errore, crash, non funziona, fix, broken |`loop-debug`| MEDIUM→HEAVY |
| refactor, improve, architecture, clean, optimize, tech debt |`loop-refactor`| HEAVY |
| release, release, publish, deploy, version, tag, bump |`loop-release`| HEAVY |
| learn, explain, teach, document, wiki, study, what is it |`loop-learn`| LIGHT→MEDIUM |

#### Routing Secondario: Workflow di Dominio

| Intent / Keyword Triggers | Workflow Target | Weight Default |
|--------------------------|-----------------|----------------|
| UI, design, layout, CSS, componente, pagina |`workflow-frontend-design`| MEDIUM |
| PDF, Word, Excel, document, extract, convert |`workflow-doc-processing`| LIGHT→MEDIUM |
| SEO, blog, articolo, keyword, ranking |`workflow-seo-research`| MEDIUM |
| API, integration, MCP, deployment, CI/CD |`workflow-dev-integrations`| MEDIUM→HEAVY |
| subagent, delegation, parallel, orchestra |`workflow-agent-management`| HEAVY |
| optimize token, compress, memory, skill |`workflow-agentic-brain`| MEDIUM |

#### Trigger Diretti mattpocock Skills

| Trigger | Skill |
|---------|-------|
|`/grill-me`, interview me |`mp-grill-me`|
|`/grill-with-docs`, shared language |`mp-grill-with-docs`|
|`/triage`, prioritize |`mp-triage`|
|`/to-spec`, specify |`mp-to-spec`|
|`/prototype`, prototype |`mp-prototype`|
|`/wayfinder`, where do I put |`mp-wayfinder`|
|`/teach`, teaches |`mp-teach`|
|`/handoff`, passage |`mp-handoff`|

**Self-Check Questions:**
> ☐ Did I correctly classify the task weight?
> ☐ Have I routed to a LOOP (priority) or domain workflow?
> ☐ Are there secondary loops/workflows to concatenate?

---

#### Step 4: Universal Context Pruning & Token Optimization 🗜️ (ALWAYS for Pruning AST / HEAVY for deep re-ranking)
**Skills:**`workflow-agentic-brain`(`auto-optimize`+`pi-dev`Rust/Cline Wrapper features)

Universal context optimization pipeline for ALL COMMANDS and ALL LOOPS. **Context management is based on two pillars:**
1. **50% Deterministic Limit:** To prevent "Lost in the middle" or "Context Rot", the 50% threshold is the absolute deterministic trigger to stop the inclusion of raw files.
2. **Dynamic Context Pruning (DyCP) & Semantic Sieving:** When the context window approaches 50%, the system STOPS appending raw context. Start evaluating the information through filters of semantic importance: discard old logs, keep only the structural rules, use short/long term memories and compress the data with logic such as`LLMLingua`o`sqz`.

Additionally, **RAG Systems are automatically activated** via text analysis: trigger words such as "search", "memory", "documentation", or the intent to recover old files trigger instantly`wz-ai-llmwiki`o`graphify`before even saturating the context.

Operational phases:
1. **Tree-sitter AST Pruning (`pi.dev / Rust-Cline Wrapper`)**: Before injecting source files or complex schemas into the context, extract **only the signatures (signatures, interfaces, types, SEO headers or metadata designs)**. Remove function bodies not subject to immediate modification (`Lean Context Intelligence`).
2. **Sharded Subagent Execution (`pi-subagents`)**: For multi-module refactorings or exhaustive audits, divide the work into isolated subagents in parallel (`dispatching-parallel-agents`/`goodcode`). Each subagent works in a separate pruned context window (`Sub-process Context Isolation`).
3. **Ingestion & Conversion**: If there are binary files or articulated documents →`markitdown`/`wz-ai-convert`.
4. **Filtering & Squeezing**: If the CLI output or context exceeds the optimal threshold →`sqz`/`flashrank`for re-ranking and noise removal.
5. **Compression & Guarding**: If the residual context remains heavy →`llmlingua`/`headroom`and preserve key decisions in`wz-ai-lean-ctx`/`MEMORY.md`.

**Self-Check Questions:**
> ☐ I applied Pruning AST (`pi.dev`wrapper) to load only the necessary signatures/headers instead of the entire file?
> ☐ I delegated parallel tasks to sharded subagents (`Sub-process Context Isolation`) to avoid token saturation?
> ☐ Does the active context window never exceed the maximum threshold of 50% and is it free of verbose noise?

---

#### Step 5: Skill Discovery & Loading 🔍 (ALWAYS)
**Skills:**`using-superpowers`(focused on discovery only)

- For each classified task, search for relevant skills with threshold ≥1%
- Sort: Process skills FIRST (brainstorming, debugging), Implementation skills AFTER
- Load skills in agent context (including mp-* if relevant)
- If the skill has a checklist, create a todo for each item

**Self-Check Questions:**
> ☐ Have I checked whether there are skills that are even just 1% relevant?
> ☐ Have I included relevant mp-* (mattpocock) skills?
> ☐ Did I load the process skills before the implementation skills?
> ☐ Have I created todo items for skill checklists?

---

#### Step 6: Transparency Announcement 📢 (ALWAYS)
**Skills:**`show-active-skill`Open the answer with:```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine & Diario di Bordo:**
> - **Pipeline Weight:** `[LIGHT|MEDIUM|HEAVY]`
> - **Active Loop & Tags:** `[0X. loop-X-...] [🏷️ TAG-CATEGORIA]`
> - **Progress Bar:** `[▓▓▓▓░░░░░░] X% Complete (Loop X/5)`
> - **Active Skills:** `[skill₁, skill₂, ...]`
> - **CLI/Wrapper:** `[expected commands]`
```---

### ═══════════════ EXECUTION PIPELINE ═══════════════

Execution is delegated to the **loop or workflow** selected in Step 3. Each loop has its own internal iterative chain.

**Loop-Engineering Execution:**
If a loop has been selected, execution follows the iterative cycle defined in the loop's SKILL.md:
-`loop-develop`: ALIGN → SPECIFY → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE
-`loop-debug`: DIAGNOSE → ISOLATE → FIX → TEST → VERIFY → ITERATE
-`loop-refactor`: ANALYZE → DESIGN → MODEL → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE
-`loop-release`: VERIFY → REVIEW → MERGE → RELEASE → PUBLISH → INDEX → RECOVER
-`loop-learn`: RESEARCH → TEACH → VERIFY → FORMALIZE → PERSIST → SAVE → ITERATE

**Golden Rule of Execution:**
Before writing code or tackling complex designs, ALWAYS:
1. Check if`brainstorming`/`mp-grill-with-docs`is applicable (design before implementation).
2. Check if`ponytail`/ YAGNI reduces scope.
3. Check if there is similar code in the project (do not duplicate).

**Structural Constraint: "3-Tier Agent Swarm" & Project Architecture (Claude Code Native)**
The Master Agent (You) acts solely as **Supreme Orchestrator (Tier 1)**. Project and swarm management is based on a rigorous and hierarchical file architecture:
- **File Structure (Claude Code Native):** Strictly follow project constraints:`CLAUDE.md`it is consultative (advisory); the`hooks/`(es.`PostToolUse.sh`,`PreCompact.sh`) are deterministic and fire on every trigger; the`skills/`they are loaded on-demand on semantic match; MCP servers (in`mcp.json`) are path-scoped and strictly permissions-based.
- **Spawn of Department Heads (Tier 2):** For each main task, invoke a specialized Master Agent (e.g. *Master UI*). Use dedicated sub-folders or temporary sub-contexts.
- **Tri-Skill Combo on Workers (Tier 3):** Each Department Head receives a`task.md`isolated and orchestrates workers (Tier 3) using`subagent-driven-development`,`dispatching-parallel-agents`, o`goodcode`depending on the dependency and criticality of the task.
- **Framework & Local Observability:** Favor established frameworks for orchestration (such as **CrewAI**, **LangGraph** or **AutoGen**) and use observability tools (such as **Tokscale** on CLI or **AgentOps/Langfuse** on UI). *Golden rule:* These software **must be installed locally** in the system (respecting the OS architecture) via`wizard-ai-installer`and configured to be controlled both by the user via UI/CLI and directly by the LLM via API/Tools.

**Protocol: "Shadow Clone Memory Merge" & Hive Mind**
- **Reabsorption and Compression:** When a lower level subagent (Worker or Department Head) finishes its cycle, it MUST perform a "Shadow Clone Memory Merge" before despawning. The Master reabsorbs the workarounds and bug-fixes discovered by the clone via`mp-handoff`or semantic shared file.
- **Post-Merge Optimization:** Immediately after reabsorption, the raw memory *must* be reorganized and refined (using`sqz`,`llmlingua`or synthetic abstractions) so as not to aggravate the context window (token limit) of the initial loading of the next session. No clone brings with it dumps or verbose logs.
- **Active Learning (The Brain):** Constantly train the swarm by having it learn from authoritative sources. Actively explore external architectural documentation and guides (e.g.`https://www.anthropic.com/learn`), clone the salient pages in pure Markdown format, and edit them in the local Wizard-AI wiki (`wz-ai-llmwiki`or knowledge graph). This is the lifeblood that makes the swarm an autonomous Hive Mind.

**Enterprise constraints** (automatically activated if`task_weight == HEAVY`):
- Import key rules from`enterprise-development-protocol`:
  - Mandatory cycle: Analysis → Gap Analysis → Planning → Implementation → Refactoring → Debug → Self Review → Documentation
  - Formal classification of problems (ID, Category, Priority, Impact)
  - No placeholder, TODO, or incomplete code accepted
  - Respect for the Design System
  - Update of`DEVELOPMENT_STATUS.md`e`TASK_BOARD.md`---

### ═══════════════ POST-PROMPT PIPELINE ═══════════════

#### Step 7: Verification Gate ✅ (MEDIUM + HEAVY)
**Skill:**`verification-before-completion`- **Iron Law**: No declaration of completion without fresh evidence
- Run the appropriate verification command:
  - Queues →`run tests`+`linter`- Build →`build command`+ exit code
  - Bug fix → original symptom test
- If the verification fails → loop back to EXECUTION (the loop iterates automatically)

**Self-Check Questions:**
> ☐ Have I run ALL relevant test commands?
> ☐ Have I read the FULL output and verified exit code?
> ☐ Does the evidence CONFIRM my statement?
> ☐ Am I using words like "should", "probably"? → STOP, check!

#### Step 8: Knowledge Update 🧠 (HEAVY only, or if structure changed)
**Skills:**`auto-graphify`- **IF**`files_added == true`OR`codebase_structure_changed == true`:
  - Run`wz-ai-graph .`in the background to update the knowledge graph
- **IF** architectural decisions made:
  - Persist in`claude-mem`con`wz-ai-mem store`**Self-Check Questions:**
> ☐ Have I added new files or changed the structure?
> ☐ Is the knowledge graph updated?
> ☐ Have the architectural decisions persisted?

---

#### Step 9: Release Check 🚀 (HEAVY only, if branch on main)
**Skills:**`auto-trigger-release`→`loop-release`- **IF** task == complete AND branch == main AND tests_pass:
  - Proponi`loop-release`automatic
  - Determine bump type: patch (fix), minor (feature), major (breaking)
- **ELSE**: Skip silently

**Self-Check Questions:**
> ☐ Is the task truly complete (Step 7 passed)?
> ☐ Are we on main or staging?
> ☐ Is the semantic bump correct?

---

#### Step 10: Session Save 💾 (ALWAYS)
**Skills:**`session-manager`(SAVE mode)

- Compress and summarize the current state
- Write on`MEMORY.md`:
  - What was done
  - Open bugs/questions
  - Next steps
  - Design decisions
- Run`wz-ai-session-save`e`wz-ai-storybloq snapshot`- **ANONYMIZE** local routes before saving

**Self-Check Questions:**
> ☐ Is the summary concise but complete?
> ☐ Have I anonymized the routes?
> ☐ Are the next steps clear for the next session?

---

#### Step 11: Transparency Recap 📊 (ALWAYS)
**Skills:**`show-active-skill`(RECAP mode)

Close the answer with:```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Recap & Diario Avanzamento:**
> - **Skills Used:** `[skill₁ (purpose), skill₂ (purpose), ...]`
> - **Pipeline Weight:** `LIGHT|MEDIUM|HEAVY`
> - **Loop Executed & Tag:** `[0X. loop-X-...] [🏷️ TAG]`
> - **Progress Bar Final:** `[▓▓▓▓▓▓▓▓▓▓] 100% Complete` (o `X%` se in transizione verso il loop successivo)
> - **Diario Umanizzato:** `[Brief story of what was resolved and any discarded roads / Lost work: ❌ ...]`
> - **Verification Status:** `✅ Passed | ⚠️ Partial | ❌ Failed`
> - **Session Saved (`MEMORY.md`):** `✅ | ❌`
```---

## 🎯 Self-Improvement Constraints (Excerpts from Skills)

These are **binding questions** that the agent MUST ask themselves during every interaction. They are extracted from the most critical rules of each behavioral skill and act as permanent guardrails.

### From the`verification-before-completion`:
> “I'm about to declare success. Do I have FRESH EVIDENCE to back it up, or am I just being optimistic?”

### From the`brainstorming`/`mp-grill-with-docs`:
> "I'm about to write code. Have I FIRST explored the context, proposed alternatives, and gotten approval?"

### From the`ponytail`/ YAGNI:
> "This code MUST exist? Can the standard library do it? Can a native feature handle it?"

### From the`systematic-debugging`/`mp-diagnosing-bugs`:
> "I am about to propose a fix. Have I FIRST reproduced the bug, identified the root cause, and verified that the fix does not introduce regressions?"

### From the`test-driven-development`/`mp-tdd`:
> "I'm writing code. Did I FIRST write a test that fails? (RED → GREEN → REFACTOR)"

### From`enterprise-development-protocol`:
> "Am I leaving placeholder, TODO, stub, or code incomplete? If so, I am NOT done."

### From the`using-superpowers`:
> "Is there even a 1% chance that a skill applies to this task? If so, I MUST invoke it."

### From`auto-router`:
> "User asked for X. Do I know EXACTLY which loop/skill/wrapper to use, or am I improvising?"

### From the`cybersecurity`:
> "Is the code I'm writing safe? Have I considered injection, XSS, SSRF, auth bypass?"

### From the`goodcode`:
> "Is the task complex enough to justify multi-agent orchestration? Am I cutting corners?"

---

## 🔑 Keyword Trigger Map

Specific keywords in the user prompt that automatically trigger loops, workflows or skills:

### 🔄 Loop-Engineering Triggers (HIGHEST PRIORITY)
| Keyword/Phrase | Triggered Loop |
|---------------|----------------|
| "develop", "implement", "create feature", "build", "construct", "/loop-develop" |`loop-develop`(HEAVY) |
| "debug", "bug", "errore", "crash", "non funziona", "fix", "/loop-debug" |`loop-debug`(MEDIUM→HEAVY) |
| "refactor", "improve", "architecture", "optimize code", "clean", "/loop-refactor" |`loop-refactor`(HEAVY) |
| "release", "release", "publish", "deploy", "version", "/loop-release" |`loop-release`(HEAVY) |
| "learn", "explain", "teach", "document", "wiki", "what is", "/loop-learn" |`loop-learn`(LIGHT→MEDIUM) |

### Domain Workflow Triggers (Secondaries)
| Keyword/Phrase | Triggered Workflow |
|---------------|------------------------|
| "create project", "initialize", "bootstrap", "scaffold" |`loop-develop`+`master-project-bootstrap`(HEAVY) |
| "design", "UI premium", "landing page", "dashboard" |`workflow-frontend-design`(MEDIUM) |
| "analyze PDF", "convert document", "extract text" |`workflow-doc-processing`(LIGHT→MEDIUM) |
| "SEO", "positioning", "blog strategy" |`workflow-seo-research`(MEDIUM) |
| "create API", "MCP server", "integration" |`workflow-dev-integrations`(MEDIUM→HEAVY) |
| "subagent orchestra", "delegation", "parallel" |`workflow-agent-management`(HEAVY) |
| "optimize token", "compress context", "create skill" |`workflow-agentic-brain`(MEDIUM) |

### Trigger mattpocock Skills (Direct — bypass loop)
| Keyword/Phrase | Skill Triggered |
|---------------|-----------------|
| "/grill-me", "interview me", "alignment" |`mp-grill-me`|
| "/grill-with-docs", "shared language" |`mp-grill-with-docs`|
| "/triage", "prioritizza issue" |`mp-triage`|
| "/to-spec", "technical specification" |`mp-to-spec`|
| "/to-tickets", "crea ticket" |`mp-to-tickets`|
| "/prototype", "prototype" |`mp-prototype`|
| "/wayfinder", "where do I put" |`mp-wayfinder`|
| "/teach", "teach concept" |`mp-teach`|
| "/handoff", "handoff" |`mp-handoff`|
| "/code-review", "review codice" |`mp-code-review`|
| "/diagnosing-bugs", "diagnosi" |`mp-diagnosing-bugs`|

### Mastery Skill Trigger
| Keyword/Phrase | Skill Triggered |
|---------------|-----------------|
| "security", "OWASP", "audit security" |`cybersecurity`+`strix`|
| "graph", "codebase map" |`graphify`|
| "remember", "save", "store context" |`claude-mem`+`session-manager`|
| "compress", "too many tokens" |`auto-optimize`chain |
| "React", "Vue", "Angular", "Svelte", "Nuxt" | Corresponding frontend skill |
| "Python", "Node", "Laravel", "Firebase" | Corresponding backend skill |
| "search", "memory", "documentation", "context", "wiki", "remember how" | RAG Auto-Activation (`wz-ai-llmwiki`,`graphify`) |

---

## ⚠️ Strict rules

1. **NEVER skip Steps 1, 3, 5, 6, 10, 11** — they are the minimum core for ANY interaction
2. **NEVER write code without completing the PRE pipeline** — routing and discovery FIRST
3. **NEVER declare completion without Step 7** (for MEDIUM/HEAVY tasks)
4. **NEVER finish without Step 10** — the session MUST be saved
5. **The loop is DETERMINISTIC** — it's not optional, it's not "if I remember"
6. **If you are unsure about the weight, round up** — too many steps are better than too few
7. **Self-Check Questions are MANDATORY** — they are not suggestions, they are constraints
