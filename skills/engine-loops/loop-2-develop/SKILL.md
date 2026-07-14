---
name: loop-2-develop
description: "02. LOOP 2: DEVELOP & TDD — Ciclo (02/05) per sviluppo guidato dai test (TDD), branch e subagent. TRIGGER AUTOMATICO su testo naturale che chieda: sviluppa, implementa, scrivi codice, aggiungi feature, crea componente, tdd, o test-first."
---

# ⚡ 02. Loop 2: Develop & TDD (Isolate, Implement & Subagents)

Questo è il **secondo loop sequenziale (02/05)** del Master Production System di Wizard-AI. Il suo scopo categoriale è **Isolamento Workspace, Test-Driven Development (TDD), Esecuzione Modulare, Delega a Subagent e Sicurezza**. Subentra al `01. loop-1-plan` una volta che le specifiche e il piano d'azione (`task.md`) sono stati confermati.

```
    ┌────────────────────────────────────────────────────────┐
    │ 🎯 01. loop-1-plan (Specifiche .spec.md & task.md)     │
    └────────────────────────────────────────────────────────┘
              │
              ▼ (Piano e checklist approvati)
    ┌────────────────────────────────────────────────────────┐
    │ ⚡ 02. loop-2-develop (Branch → TDD → Implement → Sec) │  ◄── (Sei Qui - Step 02)
    └────────────────────────────────────────────────────────┘
              │
              ├──────────────────────────────────┐
              ▼ (Test verdi & 0 vulnerabilità)   │ (Se fallimenti, test rossi o bug)
    ┌─────────────────────────────────────────┐  ▼
    │ 🔍 03. loop-3-debug (Review & Gates)    │ ┌─────────────────────────────────────────┐
    └─────────────────────────────────────────┘ │ 🐛 03. loop-3-debug (Diagnosi & Fix)    │
                                                └─────────────────────────────────────────┘
```

---

## 📂 Categorizzazione delle Skills, Progetti e Framework del Loop 2

Tutte le seguenti skills appartengono alla categoria di **Sviluppo, TDD ed Esecuzione Sicura** e devono essere richiamate o concatenate secondo la logica illustrata:

### 1. Categoria: Git Flow & Workspace Isolation (Protezione del Ramo)
Queste skill garantiscono che nessuna modifica produttiva avvenga su rami instabili o condivisi senza isolamento:
- **`auto-branch` (`ai-branch`)**: *Quando usarla:* All'avvio immediato del loop per ogni nuovo task. *Cosa fa:* Crea un branch isolato (`feature/nome-ticket` o `fix/nome-ticket`) applicando convenzioni di naming e tracciamento.
- **`using-git-worktrees`**: *Quando usarla:* Quando si eseguono modifiche architetturali pesanti o esecuzioni parallele in subagent che necessitano di filesystem separati per non causare conflitti di blocco file.
- **`mp-git-guardrails`**: *Quando usarla:* Sempre attiva in background. *Cosa fa:* Intercetta e blocca comandi Git distruttivi (`--force`, `reset --hard`, rebase su branch condivisi).
- **`mp-resolving-merge-conflicts`**: *Quando usarla:* Quando un `git pull` o un rebase locale genera conflitti. *Cosa fa:* Protocollo di isolamento e merge manuale assistito per non perdere modifiche di dominio.

### 2. Categoria: TDD & Core Code Generation (Implementazione Guidata da Specifiche)
Queste skill trasformano le specifiche (`.spec.md`) e i task in codice funzionante con test al 100%:
- **`mp-tdd`**: *Quando usarla:* Obbligatoria per ogni singola funzione o classe. *Cosa fa:* Scrittura del test rosso che esprime il contratto di specifica, implementazione minima verde e refactoring pulito.
- **`test-driven-development`**: *Quando usarla:* Come regola procedurale per bloccare la scrittura di codice non coperto da test.
- **`mp-implement`**: *Quando usarla:* Per scrivere il codice produttivo effettivo guidato dal file `.spec.md` o da `task.md`.
- **`mp-prototype`**: *Quando usarla:* Per creare prototipi rapidi di interfacce o algoritmi complessi (`UI.md`, `LOGIC.md`) per convalidarli prima della scrittura dei test esaustivi.
- **`mp-wayfinder`**: *Quando usarla:* Per navigare codebase di grandi dimensioni e identificare esattamente in quali file esistenti inserire il nuovo codice senza duplicare logica.
- **`vscode-jest-runner` & CLI Wrapper (`wizard-ai test` / Vitest)**: *Quando usarla:* Durante il TDD e l'esecuzione interattiva o in CLI dei test (`vitest run` / `bun test`). *Cosa fa:* Permette all'agente e allo sviluppatore di eseguire e fare il debug del singolo test (`test()` o `describe()`) da IDE o tramite wrapper `wizard-ai test`.
- **`vscode-webnative` & WNFS Inspection (`wizard-ai webnative-inspect`)**: *Quando usarla:* Nello sviluppo di moduli distribuiti, storage decentralizzato WNFS o web capabilities per le app e la knowledge base.

### 3. Categoria: Subagent Orchestration & Security Gate
Queste skill gestiscono la scalabilità orizzontale e la sicurezza del codice scritto:
- **`subagent-driven-development`**: *Quando usarla:* Per spezzettare task complessi (> 100 righe di codice o multi-modulo) in sub-agenti paralleli e indipendenti, assegnando a ciascuno un sottoinsieme di `task.md`.
- **`dispatching-parallel-agents`**: *Quando usarla:* Per eseguire in parallelo task senza stato condiviso (es. scrivere test per 4 componenti separati contemporaneamente).
- **`cybersecurity`**: *Quando usarla:* Durante la scrittura di qualsiasi endpoint API, query DB o form input. *Cosa fa:* Applica i 754 controlli OWASP/NIST per prevenire injection (SQLi, XSS, CSRF) e segreti hardcoded.
- **`strix`**: *Quando usarla:* Subito dopo aver reso verdi i test. *Cosa fa:* Esegue un penetration test autonomo sul codice per scovare vulnerabilità logiche o di autenticazione.
- **`goodcode`**: *Quando usarla:* Per task classificati come `HEAVY` che richiedono verifiche incrociate e adversarial review durante l'implementazione.
- **`workflow-dev-integrations`**: *Quando usarla:* Per integrare webhook, API esterne, database o MCP servers (`mcp-builder`).

### 4. Categoria: Domain Runtime & UI Aesthetics (Framework Specifici)
Queste skill forniscono le best practice di linguaggio e di design UI:
- **Runtime Backend/Mobile:** `python`, `nodejs` (`engines.node: ">=22.0.0"` e Docker `node:22-alpine` per build container stabili e senza `ENOENT`), `bun` (solo come package installer veloce nel multi-stage build, mai come bundler nativo in contesti Rollup/Vite per CI/CD), `deno`, `php` (`laravel`), `flutter`, `android-studio`, `go-whatsapp`.
- **UI & Web Moderni:** `react`, `vue`, `angular`, `svelte`, `next`, `astro`, `nuxt` (`npx nuxt build` / `npm run build` su runtime Node 22 + QEMU setup in CI per multi-arch).
- **Taste & Aesthetics:** `frontend-design`, `taste-skill` (`ai-taste`), `awesome-design`, `theme-factory`: Imponi un design anti-slop, palette HSL curate, tipografia eccellente e micro-animazioni.

---

## 🔗 Concatenazione e Skill Chaining Tree (Loop 2)

Il seguente albero mostra la sequenza deterministica di esecuzione del Loop 2 e come gestire i fallimenti o le deviazioni di sicurezza:

```mermaid
graph TD
    Start([Da 01. loop-1-plan / task.md]) --> Branch[auto-branch / crea branch isolato]
    Branch --> Guard[mp-git-guardrails / attiva protezioni]
    Guard --> ReadSpec[mp-implement / leggi .spec.md e task.md]
    
    ReadSpec --> SubCheck{Task > 100 righe o Multi-modulo?}
    SubCheck -- Sì --> Subagents[subagent-driven-development / parallel fan-out]
    SubCheck -- No --> TDD_Red[mp-tdd / Scrivi Test Rosso CHE FALLISCE]
    
    Subagents --> TDD_Red
    TDD_Red --> TDD_Green[mp-implement / Scrivi Codice Minimo Verde]
    TDD_Green --> RunTests{Esegui Suite Test}
    
    RunTests -- Fallimento (Rosso) --> TDD_Green
    RunTests -- Successo (Verde) --> SecAudit[cybersecurity / strix scan]
    
    SecAudit --> SecPass{Vulnerabilità o Injection trovate?}
    SecPass -- Sì (Fix Immediato) --> TDD_Green
    SecPass -- No (Codice Sicuro) --> RefactorCheck[Refactor leggero DRY / TDD Refactor]
    
    RefactorCheck --> AllDone{Tutti i check [x] in task.md completati?}
    AllDone -- No --> ReadSpec
    AllDone -- Sì --> Handoff([Transizione a 03. loop-3-debug])
```

---

## 📝 Istruzioni Operative Passo-Passo (Esecuzione Loop 2)

### Step 2.1: Creazione del Branch Isolato (`auto-branch`)
- **VIETATO lavorare direttamente su `main` o `staging`.**
- Esegui il comando di branching associato al ticket o al piano:
  ```bash
  ai-branch feature "nome-del-task"
  ```
- Se la codebase richiede modifiche distruttive in parallelo, attiva `using-git-worktrees`.

### Step 2.2: Esecuzione TDD e Implementazione (`mp-tdd` + `mp-implement`)
Per ogni singolo task in `task.md` (`[/]`):
1. **RED**: Usa `mp-tdd` per creare il file di test (es. `component.spec.ts` o `test_module.py`) basato sui contratti del file `.spec.md`. Eseguilo ed accertati che fallisca.
2. **GREEN**: Usa `mp-implement` per scrivere **soltanto** il codice di produzione necessario a far passare quel test. Evita speculazioni o codice inutile (`YAGNI`).
3. **REFACTOR**: Ottimizza il codice appena scritto, mantienilo pulito ed esegui nuovamente i test per confermare che siano al 100% verdi.
4. **CHECKPOINT**: Aggiorna `task.md` segnando `[x]`.

### Step 2.3: Subagent Delegation per Task Complessi (`subagent-driven-development`)
- Se il ticket richiede lavoro contemporaneo su frontend e backend o tocca file disaccoppiati, dividi il lavoro usando `subagent-driven-development`:
  - Lancia subagent isolati con un prompt chiaro ed esplicito.
  - Verifica sempre gli output dei subagent eseguendo la suite di test centralizzata prima del commit.

### Step 2.4: Gate di Sicurezza (`cybersecurity` + `strix`)
- Esegui una rapida analisi statica e di sicurezza prima di chiudere lo step:
  - Verifica assenza di segreti hardcoded (token, password, chiavi API).
  - Verifica sanitizzazione degli input SQL e delle risposte HTML (XSS/CSRF).
  - Se `strix` o `cybersecurity` sollevano alert di livello MEDIO/ALTO, il codice non può procedere: torna allo Step 2.2 e correggi la vulnerabilità all'interno del ciclo TDD.

### Step 2.5: Never-Stop Autonomous Handoff verso Loop 3 (`ZERO-STOP MANDATE`)
Una volta che i test TDD sono verdi (`Red-Green-Refactor` completato), **NON FERMARTI E NON CHIEDERE ALL'UTENTE DI TESTARE O VERIFICARE**.
Applica la regola del dialogo interno:
`🧠 [SELF-QUESTION] "Codice e test sono pronti. Quale suite di diagnosi e verifica rigorosa (`diagnosing-bugs` + `ai-debug`) devo avviare ora nel Loop 3?"`
> **Azione Immediata e Unconditional:** Stampa il banner `🔄 [AUTONOMOUS BATON-PASSING] 02. loop-2-develop completato -> Auto-Triggering 03. loop-3-debug` ed entra immediatamente nell'esecuzione dei verification gates e code review!
