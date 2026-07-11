---
name: prompt-loop-engine
description: "MASTER ORCHESTRATOR — Pipeline Loop Engineering deterministico che si attiva PRIMA e DOPO ogni prompt utente. Implementa routing MoE (Mixture of Experts), weight gates statistici, e vincoli di auto-miglioramento estratti da tutte le skill comportamentali. Questo è il SINGOLO PUNTO DI INGRESSO per ogni interazione AI."
---

# Prompt Loop Engine — The Master Pipeline

Questa è la **skill suprema** dell'ecosistema Wizard-AI. Ogni singola interazione con l'utente DEVE passare attraverso questo loop. Non esistono eccezioni.

<MANDATORY>
Questa skill è il PRIMO file che l'agente deve processare. Ogni altra skill è subordinata a questa pipeline.
Se sei un subagent, salta la pipeline PRE/POST ma rispetta le skill di dominio.
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

#### Step 1: Context Restore 🔄 (ALWAYS — tutte le weight)
**Skill:** `session-manager` (modalità RESTORE)

- Leggi `MEMORY.md` e inietta il contesto della sessione precedente
- Se esiste `graphify-out/`, carica il knowledge graph per navigazione semantica
- Se la finestra di contesto è già ampia (>60%), attiva automaticamente Step 4

**Self-Check Questions:**
> ☐ Ho letto MEMORY.md?
> ☐ Ho contesto sufficiente per capire cosa l'utente stava facendo?
> ☐ Ci sono task incompleti dalla sessione precedente?

---

#### Step 2: Prompt Engineering 📝 (MEDIUM + HEAVY)
**Skill:** `auto-prompt`

- Se il prompt è vago, ambiguo o complesso → ristruttura in formato XML deterministico
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

#### Step 4: Context Optimization 🗜️ (HEAVY only)
**Skill:** `auto-optimize` (Master Optimizer — fuso con chain di `workflow-agentic-brain`)

Pipeline di ottimizzazione in 4 fasi:
1. **Ingestion**: Se ci sono file non-text → `markitdown`
2. **Filtering**: Se contesto > 50K token → `flashrank` per re-ranking
3. **Compression**: Se contesto > 100K token → `llmlingua` / `headroom`
4. **Context Guard**: Persisti chunk importanti con `lean-ctx` / `claude-mem`

**Self-Check Questions:**
> ☐ La finestra di contesto è sotto il 70%?
> ☐ Ho rimosso il contesto irrilevante?
> ☐ I documenti importanti sono stati preservati in memoria?

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
> 🪄 **Wizard-AI Loop Engine:**
> - **Pipeline Weight:** `[LIGHT|MEDIUM|HEAVY]`
> - **Active Loop:** `[loop-develop|loop-debug|loop-refactor|loop-release|loop-learn|direct]`
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
Prima di scrivere codice, SEMPRE:
1. Verifica se `brainstorming` / `mp-grill-with-docs` è applicabile (design prima di implementazione)
2. Verifica se `ponytail` / YAGNI riduce lo scope
3. Verifica se esiste codice simile nel progetto (non duplicare)

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
> 🪄 **Wizard-AI Loop Recap:**
> - **Skills Used:** `[skill₁ (purpose), skill₂ (purpose), ...]`
> - **Pipeline Weight:** `LIGHT|MEDIUM|HEAVY`
> - **Loop Executed:** `[loop-develop|loop-debug|loop-refactor|loop-release|loop-learn|none]`
> - **Verification Status:** `✅ Passed | ⚠️ Partial | ❌ Failed`
> - **Session Saved:** `✅ | ❌`
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

---

## ⚠️ Regole Ferree

1. **MAI saltare Step 1, 3, 5, 6, 10, 11** — sono il nucleo minimo per QUALSIASI interazione
2. **MAI scrivere codice senza aver completato la PRE pipeline** — routing e discovery PRIMA
3. **MAI dichiarare completamento senza Step 7** (per task MEDIUM/HEAVY)
4. **MAI concludere senza Step 10** — la sessione DEVE essere salvata
5. **Il loop è DETERMINISTICO** — non è opzionale, non è "se me lo ricordo"
6. **Se dubiti sul peso, arrotonda per ECCESSO** — meglio troppi step che troppo pochi
7. **Le Self-Check Questions sono OBBLIGATORIE** — non sono suggerimenti, sono vincoli
