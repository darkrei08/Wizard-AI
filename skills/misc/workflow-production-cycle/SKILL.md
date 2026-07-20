---
name: workflow-production-cycle
description: "MASTER PRODUCTION WORKFLOW — Ciclo end-to-end di produzione software. Fonde auto-workflow (Git Flow + Superpowers) con workflow-production-cycle (catena skill completa). Obbligatorio per OGNI task di sviluppo: dalla pianificazione al rilascio, con TDD, subagent, debugging, e release automatica."
---

# 🏭 Master Production Workflow (Unified)

> **Fonde:** `auto-workflow` + `workflow-production-cycle` + regole chiave di `enterprise-development-protocol`

Questo è il **workflow supremo** per lo sviluppo software. Unifica il Git Flow rigido di `auto-workflow`, la catena di skill di `workflow-production-cycle`, e le regole di qualità production-ready di `enterprise-development-protocol`.

<MANDATORY>
Ogni task di sviluppo (feature, bugfix, refactoring, release) DEVE seguire questa sequenza. Non esistono scorciatoie.
</MANDATORY>

---

## ═══════════ FASE 1: BRAINSTORM & PLANNING ═══════════
**Skills:** `brainstorming`, `writing-plans`, `enterprise-development-protocol`

### 1.1 Esplorazione & Design
- Esplora il contesto del progetto (file, docs, commit recenti)
- Se il task è creativo (feature, componente, funzionalità): **usa `brainstorming`**
  - Chiedi domande ONE AT A TIME
  - Proponi 2-3 approcci con trade-off
  - Presenta il design per sezioni, ottieni approvazione
  - Scrivi spec in `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`
- Se il task è diretto (fix, refactoring): vai diretto al planning

### 1.2 Implementation Plan
- Usa `writing-plans` per creare un piano dettagliato
- Ogni task deve avere:
  - File path esatti
  - Aspettative di codice complete
  - Step di verifica
  - Tempo stimato (2-5 minuti per task)
- Se il progetto è nuovo: invoca `master-project-bootstrap` per scaffolding architetturale

### 1.3 Routing Framework
- Usa `auto-router` per determinare quali skill di dominio servono (React, Python, MongoDB, etc.)
- Se il contesto è enorme: applica `auto-optimize` per compressione

**Enterprise Gate (se task_weight == HEAVY):**
- Esegui Gap Analysis completa (✓ completato, ✗ incompleto, ∅ mancante, ↺ refactoring)
- Crea Dependency Mapping (circular deps, unused code, dead code)
- Classificazione formale problemi (ID, Categoria, Priorità P0-P3, Impatto, Complessità, Rischio)

### Self-Check
> ☐ Ho esplorato alternative prima di scegliere un approccio?
> ☐ Il piano è abbastanza dettagliato per un subagent?
> ☐ Ho applicato YAGNI? (ponytail ladder: deve esistere? → stdlib? → nativo?)

---

## ═══════════ FASE 2: ISOLAMENTO ═══════════
**Skills:** `auto-branch`, `using-git-worktrees`

### 2.1 Creazione Branch
- Verifica di essere su `staging` (MAI lavorare su `main`)
- Crea branch isolato: `wz-ai-branch feature "nome-feature"`
- Tutti i commit, test, e modifiche avvengono QUI

### 2.2 Workspace
- Se il task è complesso e richiede isolamento filesystem: usa git worktrees
- Se sono necessari file template: usa `scaffold` / `wz-ai-scaffold`

### Self-Check
> ☐ Sono su un branch isolato, NON su main o staging?
> ☐ Ho un nome di branch che segue le convenzioni?

---

## ═══════════ FASE 3: ESECUZIONE & TDD ═══════════
**Skills:** `subagent-driven-development`, `test-driven-development`, `cybersecurity`, `goodcode`, `spec-kit`

### 3.1 Test-Driven Development (OBBLIGATORIO)
Per ogni unità di lavoro, segui il ciclo:
1. **RED**: Scrivi un test che FALLISCE
2. **GREEN**: Scrivi il codice MINIMO per farlo passare
3. **REFACTOR**: Pulisci il codice mantenendo il test verde
4. **COMMIT**: Commit atomico con messaggio convenzionale

### 3.2 Subagent Delegation
- Per task complessi, dispatcha subagent specializzati:
  - Prompt iper-specifico con file path, skill da caricare, criteri di successo
  - Se task indipendenti → spawn paralleli
  - Se task sequenziali → attendi completamento in ordine
- MAI fidarsi dell'output del subagent senza verifica

### 3.3 Secure by Design
- Consulta la skill `cybersecurity` per pattern OWASP/NIST
- Previeni injection, XSS, SSRF, auth bypass durante l'implementazione
- Per audit approfonditi: usa `strix` (penetration testing automatizzato)

### 3.4 Orchestrazione Esaustiva (task HEAVY)
- Per task sostanziali: esegui `goodcode` / `wz-ai-goodcode`
  - Pool di subagent a-priori briefed con ruoli specialist
  - Verifica adversarial incrociata
  - Dedup/score/synthesize dei risultati

### 3.5 Spec Validation
- Valida continuamente l'implementazione contro la spec usando `spec-kit`
- Ogni deviazione dalla spec deve essere giustificata e approvata

### Self-Check
> ☐ Ho seguito RED→GREEN→REFACTOR per ogni unità?
> ☐ Ho considerato la sicurezza del codice?
> ☐ Il codice rispetta la spec originale?
> ☐ Non ho lasciato placeholder, TODO, stub, o codice incompleto?

---

## ═══════════ FASE 4: REVIEW & QUALITY GATES ═══════════
**Skills:** `requesting-code-review`, `systematic-debugging`, `goodcode`, `auto-debug`

### 4.1 Systematic Debug
- Esegui test suite completa
- Se fallimenti: usa `systematic-debugging`
  - Riproduci il bug
  - Identifica root cause
  - Fix minimale
  - Verifica che il fix non introduce regressioni

### 4.2 Code Review
- Self-review del codice contro il piano originale
- Classifica issue per severità: Critical (bloccante), Warning, Info
- Critical issues DEVONO essere risolte prima di procedere

### 4.3 Adversarial Verification (task HEAVY)
- Usa `goodcode` per verifica adversarial
- Controlla: bug, performance regressions, security issues

### 4.4 Merge to Staging
- Esegui: `printf "y\ny\n" | wz-ai-branch merge`
- Questo triggera automaticamente `wz-ai-debug`
- Se `wz-ai-debug` riporta errori → FIX con `systematic-debugging` prima di procedere

### Self-Check
> ☐ Tutti i test passano (EVIDENZA, non opinione)?
> ☐ Ho letto l'output completo del linter?
> ☐ Nessun critical issue aperto?
> ☐ wz-ai-debug è passato senza errori?

---

## ═══════════ FASE 5: MERGE TO MAIN ═══════════

### 5.1 Switch to Main
```bash
git checkout main
git pull origin main
```

### 5.2 Merge (no-ff per preservare history)
```bash
git merge --no-ff staging -m "chore: release staging to main"
git push origin main
```

### Self-Check
> ☐ Ho pullato l'ultima versione di main?
> ☐ Il merge è stato no-ff?
> ☐ Non ci sono conflitti irrisolti?

---

## ═══════════ FASE 6: RELEASE & CLEANUP ═══════════
**Skills:** `auto-release`, `auto-trigger-release`, `finishing-a-development-branch`

### 6.1 Release
- Determina il bump type:
  - `patch`: bugfix, minor improvements
  - `minor`: nuove feature backward-compatible
  - `major`: breaking changes
- Esegui: `wz-ai-release [patch|minor|major]`
- Questo crea tag, changelog, e GitHub release

### 6.2 Cleanup
- Verifica il worktree e pulisci branch stale
- Chiedi all'utente se vuole verificare la release pubblicata

### 6.3 Memory & Knowledge Persistence
- Aggiorna `MEMORY.md` con riassunto delle modifiche
- **ANONIMIZZA** percorsi locali (usa `~/.ai-skills` non path assoluti)
- Commit: `git add MEMORY.md && git commit -m "docs: Update MEMORY.md" && git push`
- Se struttura cambiata: esegui `wz-ai-graph .` in background

### Self-Check
> ☐ Il bump semantico è corretto?
> ☐ Il changelog è stato generato?
> ☐ MEMORY.md è stato aggiornato e committato?
> ☐ I percorsi sono anonimizzati?

---

## ⚠️ Regole Ferree (Unificate)

1. **MAI saltare alla codifica.** Sempre Brainstorm & Planning prima.
2. **MAI committare direttamente su `main` o `staging`.** Passa SEMPRE da branch isolato.
3. **MAI mergiare su `main` senza passare da `staging`.**
4. **MAI dichiarare completamento senza EVIDENZA.** (Step 4 verification gate)
5. **MAI lasciare codice incompleto.** Nessun TODO, placeholder, stub, `throw new Error("Not implemented")`.
6. **MAI fidarti dell'output di un subagent.** Verifica indipendentemente.
7. **SEMPRE esegui `wz-ai-release`** quando il ciclo raggiunge `main`.
8. **SEMPRE salva la sessione** (MEMORY.md) prima di concludere. Non aspettare che l'utente lo chieda.
9. **Il task è INCOMPLETO** finché la Fase 6 non è completata con successo.
10. **VINCOLO DI PROGETTAZIONE E BUILD (CI/CD SAFE):** OGNI progetto o repository deve disporre di `engines.node: ">=22.0.0"`, container basati su `node:22-alpine` (con copia selettiva o npx nativo per evitare race condition Rollup/Bun ENOENT), e workflow di build CI/CD multi-architettura dotati di step `docker/setup-qemu-action@v3` prima del buildx per evitare fallimenti e hang sulle action di qualsiasi repo provider.
11. **VINCOLO DI STANDARDIZZAZIONE REPOSITORY & BRANCH CANONICO (`spec-kit` / Git Best Practices):** Il ramo principale, canonico e di destinazione di ogni repository o progetto DEVE essere esclusivamente **`main`** (mai `master`). Se un repository ereditato o clonato presenta ancora il ramo `master` locale o remoto, l'agente ha l'obbligo di rinominarlo/migrarlo in `main` (`git checkout -B main origin/main`, aggiornamento del default branch su GitHub tramite `gh repo edit --default-branch main` ed eliminazione di `master`). Ogni pull request, feature branch (`auto-branch`) e ciclo di rilascio (`loop-5-release`) deve convergere e finalizzarsi unicamente in `main`.

---

## 🛡️ Protocollo Anti-Fallimento CI/CD & Multi-Arch Build (Mandatory Gate)

Per eliminare all'origine errori di compilazione in CI/CD e incompatibilità nei container (`#35 ENOENT`, Rollup race conditions, deprecazioni di runtime), ogni loop di progettazione (`Loop 1 Plan` → `Loop 2 Develop` → `Loop 5 Release`) impone i seguenti **4 Pilastri Tecnici**:

1. **Engine LTS Moderno (`>=22.0.0`)**: In `package.json`, va esplicitato `engines: { "node": ">=22.0.0" }`. Tutti i workflow di CI (`GitHub Actions`, `GitLab CI`, `Bitbucket Pipelines`) devono impostare `node-version: 22` o superiore, dismettendo le versioni Node <= 20 deprecate o obsolete.
2. **Container Multi-Stage Ibride (`node:22-alpine` + `bun`)**: Nei `Dockerfile`, utilizzare `FROM node:22-alpine AS builder` e `AS runner`. Per garantire installazioni rapide (`bun install`), copiare il binario `bun` da `oven/bun:1-alpine` (`COPY --from=oven/bun:1-alpine /usr/local/bin/bun /usr/local/bin/bun`), ma eseguire la compilazione finale (`RUN npx nuxt build` / `npm run build`) su runtime Node per evitare errori di filesystem I/O o `ENOENT` del bundler Rollup/Vite in ambiente Bun mono-processo.
3. **Inizializzazione QEMU per Multi-Architecture**: In tutti i workflow di pubblicazione Docker (`.github/workflows/docker-publish.yml`), prima di invocare `docker/setup-buildx-action@v3`, va OBBLIGATORIAMENTE inserito lo step `docker/setup-qemu-action@v3` per supportare la cross-compilazione sicura (`amd64`/`arm64`) senza crash del kernel runner.
4. **Zero Magic/Local Paths per Allegati e Assets**: Tutte le API di invio o build che referenziano file locali o upload (`/api/media/...`) devono risolvere l'URL canonico o assoluto prima della trasmissione a engine o container esterni.

---

## 🔗 Catena Completa di Skill

```
brainstorming → writing-plans → auto-branch → test-driven-development
     ↓                                              ↓
enterprise-dev-protocol (HEAVY)           subagent-driven-development
     ↓                                              ↓
auto-router → [domain skills]            cybersecurity + goodcode
                                                     ↓
                                          systematic-debugging
                                                     ↓
                                          requesting-code-review
                                                     ↓
                                          wz-ai-branch merge → wz-ai-debug
                                                     ↓
                                          git merge main → wz-ai-release
                                                     ↓
                                          session-manager → auto-graphify
```
