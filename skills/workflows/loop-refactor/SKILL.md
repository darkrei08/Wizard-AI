---
name: loop-refactor
description: "🏗️ REFACTOR LOOP — Ciclo iterativo per miglioramento architettura, performance e qualità del codice. Concatena: improve-architecture → codebase-design → domain-modeling → plan → implement → verify → review → loop. Richiamabile con /loop-refactor o keyword: refactor, migliora, architettura, ottimizza, clean up."
---

# 🏗️ Loop-Refactor — Refactoring & Architecture Loop

> **Il ciclo deterministico per migliorare architettura, performance e qualità del codice.**
> Ogni iterazione migliora il codebase senza introdurre regressioni.

<MANDATORY>
Questo workflow si attiva per qualsiasi task di miglioramento che NON aggiunge nuove feature.
Il refactoring è una operazione di PRESERVAZIONE del comportamento con miglioramento della struttura.
</MANDATORY>

---

## Trigger Keywords
`refactor`, `migliora`, `architettura`, `ottimizza codice`, `clean up`, `pulisci`, `riorganizza`, `technical debt`, `/loop-refactor`

---

## 🏗️ Il Loop (8 Step Iterativi)

```
┌─→ [1] ANALYZE    — mp-improve-codebase-architecture
│   [2] DESIGN     — mp-codebase-design
│   [3] MODEL      — mp-domain-modeling
│   [4] PLAN       — writing-plans
│   [5] EXECUTE    — mp-implement
│   [6] VERIFY     — verification-before-completion (test regressione)
│   [7] REVIEW     — requesting-code-review
└─← [8] ITERATE    — Se review ha issue → torna a step 4
    [✓] IMPROVED   — merge + auto-release minor
```

---

### Step 1: ANALYZE — Analisi Architetturale
**Skill:** `mp-improve-codebase-architecture`

1. **Mappa lo stato attuale:**
   - Dipendenze tra moduli
   - Code smells evidenti
   - Duplicazione
   - Complessità ciclomatica (dove visibile)
2. **Identifica i problemi** in ordine di impatto:
   - P0: Bloccanti (circular deps, dead code critico)
   - P1: Performance (bottleneck, query N+1)
   - P2: Manutenibilità (code duplication, naming)
   - P3: Cosmetici (formatting, comments)
3. Se disponibile: usa `ai-graph` per analisi knowledge graph

**Exit Criteria:** Lista problemi ordinata per priorità con impatto stimato.

### Step 2: DESIGN — Pattern e Soluzioni
**Skill:** `mp-codebase-design`

1. Per ogni problema identificato, proponi un design pattern:
   - Stato attuale → Stato desiderato
   - Trade-off della soluzione
   - Rischi di regressione
2. **Principi guida:**
   - Single Responsibility
   - Dependency Inversion
   - Composition over Inheritance
   - YAGNI (ponytail ladder)

**Exit Criteria:** Design approvato con pattern specifici per ogni problema.

### Step 3: MODEL — Modello di Dominio
**Skill:** `mp-domain-modeling`

1. Aggiorna il modello di dominio se necessario
2. Verifica che il `CONTEXT.md` rifletta i nuovi concetti
3. Rinomina entità/funzioni per allineamento al linguaggio condiviso

**Exit Criteria:** CONTEXT.md aggiornato, naming consistente.

### Step 4: PLAN — Piano di Refactoring
**Skill:** `writing-plans`

1. **Ordine critico:** modifica SEMPRE in ordine di dipendenza:
   - Prima i moduli foglia (nessuna dipendenza interna)
   - Poi risali verso il core
2. Ogni step del piano deve essere **atomico e testabile**
3. Ogni step deve preservare il comportamento esistente

**Exit Criteria:** Piano con step atomici, ognuno con verifica.

### Step 5: EXECUTE — Refactoring
**Skill:** `mp-implement`

1. Esegui UN step alla volta
2. Dopo ogni step: **esegui tutti i test**
3. Se un test fallisce: **rollback immediato** e analizza
4. Commit atomico per ogni step completato con successo

**Exit Criteria:** Tutti gli step eseguiti, test verdi ad ogni step.

### Step 6: VERIFY — Test di Regressione
**Skill:** `verification-before-completion`

1. Esegui la suite COMPLETA di test
2. Confronta le performance (se rilevante)
3. Verifica che il build production funzioni
4. Se il refactoring ha toccato API pubbliche: verifica backward compatibility

**Exit Criteria:** ✅ Zero regressioni, ✅ Performance ≥ prima.

### Step 7: REVIEW — Quality Check
**Skill:** `requesting-code-review`, `mp-code-review`

1. Genera il diff completo
2. Verifica:
   - Il refactoring è puro (nessun cambio di comportamento)
   - I pattern applicati sono consistenti
   - Il codice è più leggibile di prima
3. Se ci sono issue → documenta e torna a Step 4

**Exit Criteria:** Review superata.

### Step 8: ITERATE — Loop di Iterazione

**Condizioni di loop-back:**
- ❌ Test di regressione falliti → **rollback** + torna a **Step 5**
- ❌ Review ha issue → torna a **Step 4** per aggiornare piano
- ❌ Nuovi problemi scoperti → aggiungi a Step 1 e ri-prioritizza
- ✅ Tutto OK → procedi a IMPROVED

### ✅ IMPROVED — Refactoring Completato

1. **Merge** al branch di staging
2. Se l'improvement è significativo: `loop-release minor`
3. Genera un report HTML con `mp-improve-codebase-architecture` (se disponibile)
4. Aggiorna `MEMORY.md`

---

## Self-Check

> ☐ Il refactoring ha preservato il comportamento (zero feature nuove)?
> ☐ Ho eseguito i test dopo OGNI step atomico?
> ☐ Ho applicato il principio YAGNI (non ho over-engineered)?
> ☐ Il codice è effettivamente più leggibile/manutenibile di prima?
