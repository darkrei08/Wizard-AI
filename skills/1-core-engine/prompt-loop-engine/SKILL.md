---
name: prompt-loop-engine
description: "MASTER ORCHESTRATOR — Pipeline Loop Engineering deterministico che si attiva PRIMA e DOPO OGNI prompt utente, INCLUSO QUALSIASI TESTO IN LINGUAGGIO NATURALE. Triggera automaticamente i 5 Loop numerati (01-05) e attiva i tool semantici (serena, graphify, turbovec, claude-mem). Non richiede slash commands."
---

# Prompt Loop Engine — The Master Pipeline

Questa è la **skill suprema** dell'ecosistema Wizard-AI. Ogni singola interazione con l'utente DEVE passare attraverso questo loop. Non esistono eccezioni.

<MANDATORY>
Questa skill è il PRIMO file che l'agente deve processare. Ogni altra skill è subordinata a questa pipeline.
Se sei un subagent, salta la pipeline PRE/POST ma rispetta le skill di dominio.

### 🚨 REGOLE DI AUTOFORZATURA KERNEL (ZERO-STOP & SELF-QUESTIONING & COT TRANSPARENCY LOG)
1. **IL LOOP NON DEVE MAI FINIRE SE NON COMPLETI TUTTO (NEVER-STOP MANDATE)**:
   L'agente LLM HA IL DIVIETO ASSOLUTO di terminare il proprio turno di risposta o di chiedere all'utente "Vuoi procedere?" prima che l'intero ciclo `01 → 02 → 03 → 04 → 05` sia giunto a risoluzione completa e verificata. Una volta che un loop (es. `01. loop-1-plan`) completa il suo output (`.spec.md`), l'agente DEVE INNESCARE AUTOMATICAMENTE E IMMEDIATAMENTE IL LOOP SUCCESSIVO (`02. loop-2-develop` → `03. loop-3-debug` → `05. loop-5-release`) all'interno dello stesso flusso di lavoro o turno, passando il testimone senza interruzioni.
2. **AUTOFORZATURA AL DIALOGO INTERNO E SCELTA STRADA (SELF-QUESTIONING PROTOCOL)**:
   Prima di ogni azione o scrittura codice, l'agente DEVE obbligatoriamente porsi la seguente domanda e stamparla in output per garantire il massimo rigore architettonico:
   ```
   🔄 [AUTONOMOUS LOOP ENGINE] Loop Attivo: 0X. loop-X-...
   🧠 [SELF-QUESTION] "Quale strada di sviluppo o tool semantico (serena, graphify, turbovec, claude-mem) devo adottare ora per risolvere questo step e qual è la condizione esatta di completamento per passare al loop successivo?"
   ```
3. **MANDATORY COT STEP TRAVERSAL LOG & TOKEN SAVINGS GAUGE (`show-active-skill`)**:
   Per rendere evidente all'utente l'efficacia del risparmio token e la profondità del ragionamento (come fanno *Gemini CLI*, *Antigravity CLI* o i modelli di frontiera e reasoning), l'agente HA L'OBBLIGO INVARIABILE di mostrare all'inizio e alla fine di ogni risposta l'intestazione di trasparenza (`show-active-skill`). In essa deve mostrare la catena di step in attraversamento:
   `CoT Step Traversal: [Step 1: Plan/Route] ➔ [Step 2: Context Pruning (lean-ctx/ktx)] ➔ [Step 3: Action/Code] ➔ [Step 4: Token Squeeze (sqz/caveman)] ➔ [Step 5: Memory Handoff]`
   e quantificare l'efficacia del risparmio token nel blocco `⚡ Token & Context Optimization Gauge` (es. `lean-ctx/ktx: -60-90% visibilità file prunata`, `caveman: -75% output token reduction`, `sqz: log compressi`).
</MANDATORY>

---

## 🧠 Architettura: Mixture of Experts (MoE) Routing

Il loop utilizza un sistema di routing ispirato al Mixture of Experts dei moderni LLM. Ogni prompt utente viene analizzato da una **gating function** che calcola un punteggio di rilevanza per ogni skill/workflow e determina quali step del pipeline attivare.

### Gating Function (Classificazione Intent)

```
Per ogni prompt P dell'utente:

1. TOKENIZE: Estrai keyword K = {k₁, k₂, ..., kₙ} dal prompt
2. MATCH: Per ogni skill Sᵢ, calcola:
   relevance(Sᵢ, P) = Σⱼ (weight(kⱼ) × affinity(kⱼ, Sᵢ))
3. CLASSIFY WEIGHT:
   task_weight = f(max_relevance, keyword_density, context_size)
4. ROUTE: Seleziona il workflow Wₖ con score più alto
5. GATE: Attiva gli step del pipeline secondo il task_weight
```

### Task Weight Classification

| Weight | Criterio | Step Attivi | Esempio |
|--------|----------|-------------|---------|
| **LIGHT** (≤0.3) | Domanda diretta, fix singolo, spiegazione | PRE: 1,3,5,6 → EXEC → POST: 10,11 | "Cos'è X?", "fix this typo" |
| **MEDIUM** (0.3-0.7) | Feature piccola, review, refactoring parziale | PRE: 1,2,3,5,6 → EXEC → POST: 7,10,11 | "Aggiungi unit test", "refactora questa funzione" |
| **HEAVY** (>0.7) | Feature complessa, architettura, release, nuovo progetto | PRE: tutti → EXEC → POST: tutti | "Crea un backend completo", "rilascia la versione" |

### Formula di Classificazione del Peso

```
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
```

**Keyword di complessità alta** (incrementano peso):
`architettura, refactoring, migrazione, progetto, release, deploy, security audit, database schema, API design, pipeline, microservizi, monolite, full-stack`

**Keyword di complessità bassa** (riducono peso):
`spiega, cos'è, mostra, dimmi, fix, typo, commento, allinea, formatta`

---

## 🔄 Pipeline Completo: PRE → EXEC → POST

### ═══════════════ PRE-PROMPT PIPELINE ═══════════════

#### Step 1: Context Restore & Task Recovery Hub 🔄 (ALWAYS — tutte le weight)
**Skill:** `session-manager` (modalità RESTORE + `Task Recovery Hub` + `Brain-to-Skill / Graph Map`)

- Leggi `MEMORY.md` (`Diario di Bordo Personale`) e inietta il contesto della sessione precedente.
- **Task Recovery Hub & Summarizer**: Leggi attentamente la sezione **Summarizer / Task Perse o Sospese (`[⏳ TASK SOSPESA DA RIPRENDERE]`)**. Se ci sono task interrotte da sessioni precedenti o da step falliti, re-inizializzale immediatamente come priorità del loop corrente senza perdere contesto.
- **Brain-to-Skill & Graph Check**: Verifica lo stato del grafo semantico (`graphify` / `ai-graph`) e delle skill (`book-to-skill`). Se necessario, carica la mappa aggiornata del progetto per garantire piena cognizione architettonica all'avvio.
- Se la finestra di contesto è già ampia (>60%), attiva automaticamente Step 4.

**Self-Check Questions:**
> ☐ Ho letto MEMORY.md e la sezione Summarizer del Diario?
> ☐ Ho recuperato e messo in coda le task perse/sospese (`Task Recovery Hub`)?
> ☐ Ho verificato e allineato la mappa del grafo e le skill di progetto (`Brain-to-Skill`)?
> ☐ Ho contesto sufficiente per capire le decisioni e le strade scartate in passato?

---

#### Step 2: Prompt Engineering 📝 (MEDIUM + HEAVY)
**Skill:** `auto-prompt`

- Se il prompt è vago, ambiguo o complesso → ristruttura in formato XML deterministico
<truncated... let's keep lines identical up to step 10>
---

#### Step 10: Session Save & Brain-to-Skill / Graph Sync 💾 (ALWAYS)
**Skill:** `session-manager` (modalità SAVE + `Graph/Skill Sync`)

- Comprimi e riassumi lo stato corrente.
- Scrivi su `MEMORY.md`:
  - Cosa è stato fatto
  - Bug/domande aperti
  - Prossimi step
  - Decisioni di design
- **Brain-to-Skill & Graph Sync**: Prima della chiusura, esegui o verifica l'aggiornamento del grafo di progetto (`ai-graph update`) e la sincronizzazione delle skill/knowledge base (`book-to-skill` / wiki), per preservare il quadro strutturale nelle future o successive sessioni.
- Esegui `ai-session-save` e `ai-storybloq snapshot`
- **ANONIMIZZA** percorsi locali prima di salvare

**Self-Check Questions:**
> ☐ Il riassunto è conciso ma completo?
> ☐ Ho aggiornato il grafo (`ai-graph`) e la memoria di progetto per la successiva sessione?
> ☐ Ho anonimizzato i percorsi?
> ☐ I prossimi step sono chiari per la sessione successiva?
- Inietta `<fixed_skills>` (skill obbligatorie) e `<dynamic_skills>` (skill suggerite)
- Usa modelli economici (Flash/Haiku) per la riscrittura

**Self-Check Questions:**
> ☐ Il prompt è chiaro e strutturato?
> ☐ Ho identificato tutti i vincoli impliciti?
> ☐ Le skill necessarie sono state taggate nel prompt strutturato?

---

#### Step 3: Intent Routing & MoE Classification 🎯 (ALWAYS)
**Skill:** `auto-router` (versione MoE estesa)

- Calcola `relevance_score` per ogni workflow usando la gating function
- Determina `task_weight` **Matrice di Routing Estesa (v2 — Loop-First):**

#### Routing Primario: 5 Loop-Engineering Workflows

| Intent / Keyword Triggers | Loop Target | Weight Default |
|--------------------------|-------------|----------------|
| sviluppa, implementa, crea, build, feature, costruisci | `loop-develop` | HEAVY |
| debug, bug, errore, crash, non funziona, fix, broken | `loop-debug` | MEDIUM→HEAVY |
| refactor, migliora, architettura, pulisci, ottimizza, tech debt | `loop-refactor` | HEAVY |
| release, rilascia, pubblica, deploy, versione, tag, bump | `loop-release` | HEAVY |
| impara, spiega, insegna, documenta, wiki, studia, cos'è | `loop-learn` | LIGHT→MEDIUM |

#### Routing Secondario: Workflow di Dominio

| Intent / Keyword Triggers | Workflow Target | Weight Default |
|--------------------------|-----------------|----------------|
| UI, design, layout, CSS, componente, pagina | `workflow-frontend-design` | MEDIUM |
| PDF, Word, Excel, documento, estrai, converti | `workflow-doc-processing` | LIGHT→MEDIUM |
| SEO, blog, articolo, keyword, ranking | `workflow-seo-research` | MEDIUM |
| API, integrazione, MCP, deploy, CI/CD | `workflow-dev-integrations` | MEDIUM→HEAVY |
| subagent, delega, parallelo, orchestra | `workflow-agent-management` | HEAVY |
| ottimizza token, comprimi, memoria, skill | `workflow-agentic-brain` | MEDIUM |

#### Trigger Diretti mattpocock Skills

| Trigger | Skill |
|---------|-------|
| `/grill-me`, intervistami | `mp-grill-me` |
| `/grill-with-docs`, linguaggio condiviso | `mp-grill-with-docs` |
| `/triage`, prioritizza | `mp-triage` |
| `/to-spec`, specifica | `mp-to-spec` |
| `/prototype`, prototipa | `mp-prototype` |
| `/wayfinder`, dove metto | `mp-wayfinder` |
| `/teach`, insegna | `mp-teach` |
| `/handoff`, passaggio | `mp-handoff` |

**Self-Check Questions:**
> ☐ Ho classificato correttamente il peso del task?
> ☐ Ho routato verso un LOOP (prioritario) o un workflow di dominio?
> ☐ Ci sono loop/workflow secondari da concatenare?

---

#### Step 4: Universal Context Pruning & Token Optimization 🗜️ (ALWAYS per Pruning AST / HEAVY per re-ranking profondo)
**Skill:** `workflow-agentic-brain` (`auto-optimize` + `pi-dev` Rust/Cline Wrapper features)

Pipeline universale di ottimizzazione contesto per TUTTI I COMANDI e TUTTI I LOOP. **La gestione del contesto si basa su due pilastri:**
1. **Limite Deterministico del 50%:** Per prevenire il "Lost in the middle" o "Context Rot", la soglia del 50% è il trigger deterministico assoluto per fermare l'inclusione di file crudi.
2. **Dynamic Context Pruning (DyCP) & Semantic Sieving:** Quando la finestra di contesto si avvicina al 50%, il sistema SMETTE di fare "append" del contesto crudo. Inizia a valutare l'informazione tramite filtri di importanza semantica: scarta i log vecchi, mantiene solo le regole strutturali, usa le memorie a breve/lungo termine e comprime i dati con logiche come `LLMLingua` o `sqz`.

Inoltre, i **Sistemi RAG si attivano automaticamente** tramite text analysis: parole trigger come "cerca", "memoria", "documentazione", o l'intento di recuperare vecchi file innescano istantaneamente `ai-llmwiki` o `graphify` prima ancora di saturare il contesto.

Fasi operative:
1. **Tree-sitter AST Pruning (`pi.dev / Rust-Cline Wrapper`)**: Prima di iniettare file sorgente o schemi complessi nel contesto, estrai **solo le firme (signatures, interfacce, tipi, header SEO o metadata design)**. Rimuovi i body delle funzioni non oggetto di modifica immediata (`Lean Context Intelligence`).
2. **Sharded Subagent Execution (`pi-subagents`)**: Per refactoring multi-modulo o audit esaustivi, dividi il lavoro in subagent isolati in parallelo (`dispatching-parallel-agents` / `goodcode`). Ogni subagent lavora in una finestra di contesto potata separata (`Sub-process Context Isolation`).
3. **Ingestion & Conversion**: Se ci sono file binari o documenti articolati → `markitdown` / `ai-convert`.
4. **Filtering & Squeezing**: Se l'output CLI o il contesto supera la soglia ottima → `sqz` / `flashrank` per re-ranking e rimozione rumore.
5. **Compression & Guarding**: Se il contesto residuo resta pesante → `llmlingua` / `headroom` e preserva le decisioni chiave in `ai-lean-ctx` / `MEMORY.md`.

**Self-Check Questions:**
> ☐ Ho applicato il Pruning AST (`pi.dev` wrapper) per caricare solo le firme/header necessari anziché l'intero file?
> ☐ Ho delegato task parallele a subagent shardati (`Sub-process Context Isolation`) per evitare saturazione token?
> ☐ La finestra di contesto attiva non supera mai la soglia massima del 50% ed è priva di rumore verboso?

---

#### Step 5: Skill Discovery & Loading 🔍 (ALWAYS)
**Skill:** `using-superpowers` (focalizzata solo su discovery)

- Per ogni task classificato, cerca skill pertinenti con soglia ≥1%
- Ordina: Process skills PRIMA (brainstorming, debugging), Implementation skills DOPO
- Carica le skill nel contesto dell'agente (incluse mp-* se pertinenti)
- Se la skill ha una checklist, crea un todo per ogni item

**Self-Check Questions:**
> ☐ Ho controllato se esistono skill rilevanti anche solo all'1%?
> ☐ Ho incluso skill mp-* (mattpocock) pertinenti?
> ☐ Ho caricato le process skill prima delle implementation skill?
> ☐ Ho creato todo items per le checklist delle skill?

---

#### Step 6: Transparency Announcement 📢 (ALWAYS)
**Skill:** `show-active-skill`

Apri la risposta con:
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Engine & Diario di Bordo:**
> - **Pipeline Weight:** `[LIGHT|MEDIUM|HEAVY]`
> - **Active Loop & Tags:** `[0X. loop-X-...] [🏷️ TAG-CATEGORIA]`
> - **Progress Bar:** `[▓▓▓▓░░░░░░] X% Completato (Loop X/5)`
> - **Active Skills:** `[skill₁, skill₂, ...]`
> - **CLI/Wrapper:** `[comandi previsti]`
```

---

### ═══════════════ EXECUTION PIPELINE ═══════════════

L'esecuzione è delegata al **loop o workflow** selezionato nello Step 3. Ogni loop ha la propria catena iterativa interna.

**Loop-Engineering Execution:**
Se un loop è stato selezionato, l'esecuzione segue il ciclo iterativo definito nella SKILL.md del loop:
- `loop-develop`: ALIGN → SPECIFY → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE
- `loop-debug`: DIAGNOSE → ISOLATE → FIX → TEST → VERIFY → ITERATE
- `loop-refactor`: ANALYZE → DESIGN → MODEL → PLAN → EXECUTE → VERIFY → REVIEW → ITERATE
- `loop-release`: VERIFY → REVIEW → MERGE → RELEASE → PUBLISH → INDEX → RECOVER
- `loop-learn`: RESEARCH → TEACH → VERIFY → FORMALIZE → PERSIST → SAVE → ITERATE

**Regola d'oro dell'esecuzione:**
Prima di scrivere codice o affrontare design complessi, SEMPRE:
1. Verifica se `brainstorming` / `mp-grill-with-docs` è applicabile (design prima di implementazione).
2. Verifica se `ponytail` / YAGNI riduce lo scope.
3. Verifica se esiste codice simile nel progetto (non duplicare).

**Vincolo Strutturale: "Kubernetes of Agents" (Orchestrazione Subagent)**
L'agente principale agisce come Master Orchestrator. Per task multi-dominio o con complessità estesa nel breve/lungo periodo, la delega a **subagent specializzati** avviene a **discrezione del modello**:
- **Spawn Mirato:** Se il task coinvolge UI, Database e Sicurezza, il Master DEVE attivare agenti verticali (es. Frontend Specialist, Backend Specialist) delegando a ciascuno un `task.md` isolato (`subagent-driven-development`).
- **Vice-Director Agent:** Per orchestrazioni enormi, l'agente può invocare un secondo "Master Agent" (Vice-Direttore) per gestire l'intero swarm e dividere il carico di supervisione.
- **Observability:** Per monitorare lo sciame agentico in esecuzione in background (graficamente o su CLI) e verificare la quota token consumata, si integrano nativamente metriche OpenTelemetry o tool dedicati (come *Tokscale* per la CLI o *Langfuse/AgentOps* per l'UI).

**Vincoli Enterprise** (attivati automaticamente se `task_weight == HEAVY`):
- Importa le regole chiave da `enterprise-development-protocol`:
  - Ciclo obbligatorio: Analisi → Gap Analysis → Planning → Implementation → Refactoring → Debug → Self Review → Documentation
  - Classificazione formale dei problemi (ID, Categoria, Priorità, Impatto)
  - Nessun placeholder, TODO, o codice incompleto accettato
  - Rispetto del Design System
  - Update di `DEVELOPMENT_STATUS.md` e `TASK_BOARD.md`

---

### ═══════════════ POST-PROMPT PIPELINE ═══════════════

#### Step 7: Verification Gate ✅ (MEDIUM + HEAVY)
**Skill:** `verification-before-completion`

- **Iron Law**: Nessuna dichiarazione di completamento senza evidenza fresca
- Esegui il comando di verifica appropriato:
  - Code → `run tests` + `linter`
  - Build → `build command` + exit code
  - Bug fix → test del sintomo originale
- Se la verifica fallisce → loop back all'EXECUTION (il loop itera automaticamente)

**Self-Check Questions:**
> ☐ Ho eseguito TUTTI i comandi di verifica rilevanti?
> ☐ Ho letto l'output COMPLETO e verificato exit code?
> ☐ L'evidenza CONFERMA la mia dichiarazione?
> ☐ Sto usando parole come "dovrebbe", "probabilmente"? → STOP, verifica!

#### Step 8: Knowledge Update 🧠 (HEAVY only, o se struttura cambiata)
**Skill:** `auto-graphify`

- **IF** `files_added == true` OR `codebase_structure_changed == true`:
  - Run `ai-graph .` in background per aggiornare il knowledge graph
- **IF** decisioni architetturali prese:
  - Persisti in `claude-mem` con `ai-mem store`

**Self-Check Questions:**
> ☐ Ho aggiunto nuovi file o cambiato la struttura?
> ☐ Il knowledge graph è aggiornato?
> ☐ Le decisioni architetturali sono persistite?

---

#### Step 9: Release Check 🚀 (HEAVY only, se branch su main)
**Skill:** `auto-trigger-release` → `loop-release`

- **IF** task == complete AND branch == main AND tests_pass:
  - Proponi `loop-release` automatico
  - Determina bump type: patch (fix), minor (feature), major (breaking)
- **ELSE**: Skip silenziosamente

**Self-Check Questions:**
> ☐ Il task è veramente completo (Step 7 passato)?
> ☐ Siamo su main o staging?
> ☐ Il bump semantico è corretto?

---

#### Step 10: Session Save 💾 (ALWAYS)
**Skill:** `session-manager` (modalità SAVE)

- Comprimi e riassumi lo stato corrente
- Scrivi su `MEMORY.md`:
  - Cosa è stato fatto
  - Bug/domande aperti
  - Prossimi step
  - Decisioni di design
- Esegui `ai-session-save` e `ai-storybloq snapshot`
- **ANONIMIZZA** percorsi locali prima di salvare

**Self-Check Questions:**
> ☐ Il riassunto è conciso ma completo?
> ☐ Ho anonimizzato i percorsi?
> ☐ I prossimi step sono chiari per la sessione successiva?

---

#### Step 11: Transparency Recap 📊 (ALWAYS)
**Skill:** `show-active-skill` (modalità RECAP)

Chiudi la risposta con:
```markdown
> [!NOTE]
> 🪄 **Wizard-AI Loop Recap & Diario Avanzamento:**
> - **Skills Used:** `[skill₁ (purpose), skill₂ (purpose), ...]`
> - **Pipeline Weight:** `LIGHT|MEDIUM|HEAVY`
> - **Loop Executed & Tag:** `[0X. loop-X-...] [🏷️ TAG]`
> - **Progress Bar Final:** `[▓▓▓▓▓▓▓▓▓▓] 100% Completato` (o `X%` se in transizione verso il loop successivo)
> - **Diario Umanizzato:** `[Breve racconto di cosa è stato risolto ed eventuali strade scartate / Lavori persi: ❌ ...]`
> - **Verification Status:** `✅ Passed | ⚠️ Partial | ❌ Failed`
> - **Session Saved (`MEMORY.md`):** `✅ | ❌`
```

---

## 🎯 Vincoli di Auto-Miglioramento (Estratti dalle Skill)

Queste sono **domande vincolanti** che l'agente DEVE porsi durante ogni interazione. Sono estratte dalle regole più critiche di ogni skill comportamentale e fungono da guardrail permanenti.

### Dal `verification-before-completion`:
> "Sto per dichiarare successo. Ho EVIDENZA FRESCA che lo conferma, o sto solo essendo ottimista?"

### Dal `brainstorming` / `mp-grill-with-docs`:
> "Sto per scrivere codice. Ho PRIMA esplorato il contesto, proposto alternative, e ottenuto approvazione?"

### Dal `ponytail` / YAGNI:
> "Questo codice DEVE esistere? La standard library può farlo? Una feature nativa può gestirlo?"

### Dal `systematic-debugging` / `mp-diagnosing-bugs`:
> "Sto per proporre un fix. Ho PRIMA riprodotto il bug, identificato la root cause, e verificato che il fix non introduce regressioni?"

### Dal `test-driven-development` / `mp-tdd`:
> "Sto scrivendo codice. Ho PRIMA scritto un test che fallisce? (RED → GREEN → REFACTOR)"

### Dal `enterprise-development-protocol`:
> "Sto lasciando placeholder, TODO, stub, o codice incompleto? Se sì, NON ho finito."

### Dal `using-superpowers`:
> "C'è anche solo l'1% di probabilità che una skill si applichi a questo task? Se sì, DEVO invocarla."

### Dall' `auto-router`:
> "L'utente ha chiesto X. So ESATTAMENTE quale loop/skill/wrapper usare, o sto improvvisando?"

### Dal `cybersecurity`:
> "Il codice che sto scrivendo è sicuro? Ho considerato injection, XSS, SSRF, auth bypass?"

### Dal `goodcode`:
> "Il task è abbastanza complesso da giustificare orchestrazione multi-agente? Sto tagliando angoli?"

---

## 🔑 Keyword Trigger Map

Keyword specifiche nel prompt dell'utente che triggerano automaticamente loop, workflow o skill:

### 🔄 Trigger dei Loop-Engineering (PRIORITÀ MASSIMA)
| Keyword/Frase | Loop Triggerato |
|---------------|----------------|
| "sviluppa", "implementa", "crea feature", "build", "costruisci", "/loop-develop" | `loop-develop` (HEAVY) |
| "debug", "bug", "errore", "crash", "non funziona", "fix", "/loop-debug" | `loop-debug` (MEDIUM→HEAVY) |
| "refactor", "migliora", "architettura", "ottimizza codice", "pulisci", "/loop-refactor" | `loop-refactor` (HEAVY) |
| "release", "rilascia", "pubblica", "deploy", "versione", "/loop-release" | `loop-release` (HEAVY) |
| "impara", "spiega", "insegna", "documenta", "wiki", "cos'è", "/loop-learn" | `loop-learn` (LIGHT→MEDIUM) |

### Trigger di Workflow di Dominio (Secondari)
| Keyword/Frase | Workflow Triggerato |
|---------------|---------------------|
| "crea progetto", "inizializza", "bootstrap", "scaffold" | `loop-develop` + `master-project-bootstrap` (HEAVY) |
| "design", "UI premium", "landing page", "dashboard" | `workflow-frontend-design` (MEDIUM) |
| "analizza PDF", "converti documento", "estrai testo" | `workflow-doc-processing` (LIGHT→MEDIUM) |
| "SEO", "posizionamento", "blog strategy" | `workflow-seo-research` (MEDIUM) |
| "crea API", "MCP server", "integrazione" | `workflow-dev-integrations` (MEDIUM→HEAVY) |
| "orchestra subagent", "delega", "parallelo" | `workflow-agent-management` (HEAVY) |
| "ottimizza token", "comprimi contesto", "crea skill" | `workflow-agentic-brain` (MEDIUM) |

### Trigger mattpocock Skills (Diretto — bypass loop)
| Keyword/Frase | Skill Triggerata |
|---------------|------------------|
| "/grill-me", "intervistami", "allineamento" | `mp-grill-me` |
| "/grill-with-docs", "linguaggio condiviso" | `mp-grill-with-docs` |
| "/triage", "prioritizza issue" | `mp-triage` |
| "/to-spec", "specifica tecnica" | `mp-to-spec` |
| "/to-tickets", "crea ticket" | `mp-to-tickets` |
| "/prototype", "prototipa" | `mp-prototype` |
| "/wayfinder", "dove metto" | `mp-wayfinder` |
| "/teach", "insegna concetto" | `mp-teach` |
| "/handoff", "passaggio consegne" | `mp-handoff` |
| "/code-review", "review codice" | `mp-code-review` |
| "/diagnosing-bugs", "diagnosi" | `mp-diagnosing-bugs` |

### Trigger di Skill di Dominio
| Keyword/Frase | Skill Triggerata |
|---------------|------------------|
| "sicurezza", "OWASP", "audit security" | `cybersecurity` + `strix` |
| "grafo", "mappa codebase" | `graphify` |
| "ricorda", "salva", "memorizza contesto" | `claude-mem` + `session-manager` |
| "comprimi", "troppi token" | `auto-optimize` chain |
| "React", "Vue", "Angular", "Svelte", "Nuxt" | Skill frontend corrispondente |
| "Python", "Node", "Laravel", "Firebase" | Skill backend corrispondente |
| "cerca", "memoria", "documentazione", "contesto", "wiki", "ricorda come" | RAG Auto-Activation (`ai-llmwiki`, `graphify`) |

---

## ⚠️ Regole Ferree

1. **MAI saltare Step 1, 3, 5, 6, 10, 11** — sono il nucleo minimo per QUALSIASI interazione
2. **MAI scrivere codice senza aver completato la PRE pipeline** — routing e discovery PRIMA
3. **MAI dichiarare completamento senza Step 7** (per task MEDIUM/HEAVY)
4. **MAI concludere senza Step 10** — la sessione DEVE essere salvata
5. **Il loop è DETERMINISTICO** — non è opzionale, non è "se me lo ricordo"
6. **Se dubiti sul peso, arrotonda per ECCESSO** — meglio troppi step che troppo pochi
7. **Le Self-Check Questions sono OBBLIGATORIE** — non sono suggerimenti, sono vincoli
