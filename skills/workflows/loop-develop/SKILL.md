---
name: loop-develop
description: "🔄 DEVELOPMENT LOOP — Ciclo iterativo per sviluppo feature, dalla specifica al codice funzionante. Concatena: grill-with-docs → to-spec → writing-plans → implement → verify → code-review → loop. Richiamabile con /loop-develop o keyword: sviluppa, implementa, crea feature, build."
---

# 🔄 Loop-Develop — Development Loop

> **Il ciclo deterministico per sviluppare feature in modo iterativo.**
> Ogni iterazione produce codice testato, verificato, e pronto per review.

<MANDATORY>
Questo workflow è il PUNTO DI INGRESSO per qualsiasi task di sviluppo.
Se l'utente chiede di "sviluppare", "implementare", "creare", "costruire" qualcosa → questo loop si attiva.
</MANDATORY>

---

## Trigger Keywords
`sviluppa`, `implementa`, `crea feature`, `build`, `costruisci`, `aggiungi funzionalità`, `/loop-develop`

## Prerequisiti
- Repository inizializzato con `git`
- Branch di lavoro creato (se non esiste, creane uno con `ai-branch`)

---

## 🔄 Il Loop (7 Step Iterativi)

```
┌─→ [1] ALIGN    — grill-with-docs / mp-grill-with-docs
│   [2] SPECIFY  — mp-to-spec / spec-kit
│   [3] PLAN     — writing-plans
│   [4] EXECUTE  — mp-implement / subagent-driven-development
│   [5] VERIFY   — verification-before-completion
│   [6] REVIEW   — mp-code-review / requesting-code-review
└─← [7] ITERATE  — Se test/review falliscono → torna allo step appropriato
    [✓] COMPLETE — finishing-a-development-branch
```

---

### Step 1: ALIGN — Allineamento Requisiti
**Skill:** `mp-grill-with-docs`, `brainstorming`

1. Esplora il contesto del progetto (codebase, docs, CONTEXT.md)
2. Conduci una sessione di grilling con l'utente:
   - Chiedi domande ONE AT A TIME
   - Proponi 2-3 approcci con trade-off chiari
   - Documenta le decisioni
3. Se esiste un `CONTEXT.md`, usa il linguaggio condiviso
4. Se non esiste, creane uno con `mp-domain-modeling`

**Exit Criteria:** L'utente ha confermato i requisiti e l'approccio scelto.

### Step 2: SPECIFY — Specifica Tecnica
**Skill:** `mp-to-spec`, `spec-kit`

1. Trasforma i requisiti in una specifica tecnica formale
2. Includi:
   - Interfacce/tipi previsti
   - Casi limite (edge cases)
   - Criteri di accettazione
3. Salva la spec in `docs/superpowers/specs/YYYY-MM-DD-<topic>.md`

**Exit Criteria:** Specifica approvata dall'utente o auto-validata.

### Step 3: PLAN — Piano di Implementazione
**Skill:** `writing-plans`

1. Crea un piano dettagliato con:
   - File path esatti da creare/modificare
   - Ordine di esecuzione
   - Step di verifica per ogni modifica
2. Se task_weight == HEAVY:
   - Usa `dispatching-parallel-agents` per parallelizzare
   - Applica `ponytail` per ridurre la complessità (YAGNI ladder)

**Exit Criteria:** Piano con step verificabili e stimati.

### Step 4: EXECUTE — Implementazione
**Skill:** `mp-implement`, `subagent-driven-development`

1. Esegui il piano step-by-step
2. Per ogni modifica:
   - Applica il principio TDD (`mp-tdd`): scrivi test PRIMA del codice
   - Commit atomici con messaggi chiari
3. Se il task è HEAVY:
   - Usa subagent per task paralleli indipendenti
   - Ogni subagent riceve context minimale (lean-ctx)

**Exit Criteria:** Tutto il codice è scritto e i test unitari passano.

### Step 5: VERIFY — Verifica
**Skill:** `verification-before-completion`

1. Esegui TUTTI i test (unit, integration, e2e se disponibili)
2. Esegui lint/format
3. Verifica build production
4. Controlla che non ci siano regressioni

**Exit Criteria:** ✅ Test verdi, ✅ Lint pulito, ✅ Build OK.

### Step 6: REVIEW — Code Review
**Skill:** `mp-code-review`, `requesting-code-review`

1. Genera un diff summary delle modifiche
2. Verifica:
   - Naming consistente con CONTEXT.md
   - Pattern architetturali rispettati
   - Nessun codice morto o duplicato
   - Performance accettabile
3. Se ci sono issue → documenta e torna a Step 4

**Exit Criteria:** Review superata senza issue critiche.

### Step 7: ITERATE — Loop di Iterazione

**Condizioni di loop-back:**
- ❌ Test falliti → torna a **Step 4** con il feedback dei test
- ❌ Review con issue → torna a **Step 3** per aggiornare il piano
- ❌ Requisiti cambiati → torna a **Step 1** per ri-allineamento
- ✅ Tutto OK → procedi a COMPLETE

**Max iterations:** 5 (dopo 5 iterazioni, chiedi conferma all'utente)

### ✅ COMPLETE — Completamento
**Skill:** `finishing-a-development-branch`

1. Opzioni:
   - **Merge diretto** a staging/main
   - **Pull Request** con descrizione auto-generata
   - **Handoff** a un altro agente/sessione (`mp-handoff`)
2. Aggiorna `MEMORY.md` con il summary del lavoro
3. Se configurato: esegui `loop-release` automaticamente

---

## Self-Check (Validazione Interna)

> ☐ Ho usato il linguaggio condiviso (CONTEXT.md)?
> ☐ Ho scritto i test PRIMA del codice?
> ☐ Ho verificato con evidenze reali (non ho assunto che funziona)?
> ☐ Ho applicato YAGNI? (ponytail: deve esistere? → stdlib? → nativo?)
> ☐ Le iterazioni sono state produttive (non circolari)?
