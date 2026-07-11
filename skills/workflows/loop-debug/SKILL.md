---
name: loop-debug
description: "🐛 DEBUG LOOP — Ciclo diagnostico iterativo per risolvere bug complessi. Concatena: diagnosing-bugs → systematic-debugging → auto-debug → tdd → verify → loop. Richiamabile con /loop-debug o keyword: debug, bug, errore, crash, non funziona."
---

# 🐛 Loop-Debug — Debug Loop

> **Il ciclo deterministico per diagnosticare e risolvere bug in modo iterativo.**
> Ogni iterazione restringe lo spazio del problema fino alla root cause.

<MANDATORY>
Questo workflow si attiva per qualsiasi segnalazione di bug, errore, crash, o comportamento inatteso.
NON provare a fixare il bug al primo tentativo. Segui il ciclo di diagnosi.
</MANDATORY>

---

## Trigger Keywords
`debug`, `bug`, `errore`, `crash`, `non funziona`, `broken`, `fix`, `issue`, `/loop-debug`

---

## 🐛 Il Loop (6 Step Iterativi)

```
┌─→ [1] DIAGNOSE  — mp-diagnosing-bugs
│   [2] ISOLATE   — systematic-debugging
│   [3] FIX       — auto-debug / implementazione fix
│   [4] TEST      — mp-tdd / test-driven-development
│   [5] VERIFY    — verification-before-completion
└─← [6] ITERATE   — Se test ancora falliti → torna a step 1
    [✓] RESOLVED  — auto-release patch
```

---

### Step 1: DIAGNOSE — Diagnosi Root Cause
**Skill:** `mp-diagnosing-bugs`

1. **Raccogli evidenze** (NON assumere nulla):
   - Log di errore esatti
   - Stack trace completo
   - Ambiente (OS, versioni, config)
   - Passi per riprodurre
2. **Forma ipotesi** ordinate per probabilità:
   - Ipotesi A (più probabile): ...
   - Ipotesi B: ...
   - Ipotesi C (meno probabile): ...
3. **Identifica il blast radius** — quali parti del sistema sono coinvolte?

**Exit Criteria:** Almeno 2 ipotesi concrete con evidenze a supporto.

### Step 2: ISOLATE — Isolamento e Riproduzione
**Skill:** `systematic-debugging`

1. **Riproduci il bug** in modo deterministico
2. **Isola la causa**:
   - Usa binary search nel codice (commenta metà, testa)
   - Aggiungi logging temporaneo nei punti critici
   - Verifica le ipotesi del Step 1
3. **Documenta** la root cause trovata

**Exit Criteria:** Root cause identificata e confermata con evidenza.

### Step 3: FIX — Correzione
**Skill:** `auto-debug`, `mp-implement`

1. **Scrivi il fix minimale** che risolve la root cause
2. **NON refactorare** durante il fix (separazione di concerns)
3. Se `auto-debug` è disponibile:
   - Esegui lint automatico
   - Applica auto-fix del linter
   - Formatta il codice

**Exit Criteria:** Fix applicato, codice compila/linta senza errori.

### Step 4: TEST — Scrivi Test di Regressione
**Skill:** `mp-tdd`, `test-driven-development`

1. **Scrivi un test** che riproduce il bug PRIMA del fix (deve fallire senza fix)
2. **Verifica** che il test passa CON il fix
3. **Aggiungi edge cases** correlati

**Exit Criteria:** Test di regressione scritto e passante.

### Step 5: VERIFY — Verifica Completa
**Skill:** `verification-before-completion`

1. Esegui TUTTA la suite di test (non solo il test nuovo)
2. Verifica che non ci siano regressioni
3. Verifica build production

**Exit Criteria:** ✅ Suite completa verde, ✅ Nessuna regressione.

### Step 6: ITERATE — Loop di Iterazione

**Condizioni di loop-back:**
- ❌ Test ancora falliti → torna a **Step 1** con nuove evidenze (i test stessi sono evidenza)
- ❌ Nuovi bug introdotti dal fix → torna a **Step 2** per isolamento
- ❌ Root cause diversa da ipotesi → torna a **Step 1** con ipotesi aggiornate
- ✅ Tutto OK → procedi a RESOLVED

**Max iterations:** 5 (dopo 5, chiedi aiuto all'utente o escalate)

### ✅ RESOLVED — Bug Risolto

1. **Commit** con messaggio: `fix(<scope>): <descrizione breve>`
2. Se il bug era in produzione: `loop-release` con patch automatico
3. Aggiorna `MEMORY.md` con il summary del debugging
4. Se il bug era ricorrente: crea una rule nel `AGENTS.md` per prevenirlo

---

## Anti-Pattern da Evitare

> ❌ **Shotgun debugging** — cambiare cose a caso sperando che funzioni
> ❌ **Fix without test** — fixare senza test di regressione
> ❌ **Refactor during fix** — mescolare fix e refactoring
> ❌ **Assume without evidence** — "credo che il problema sia..."

## Self-Check

> ☐ Ho riprodotto il bug PRIMA di provare a fixarlo?
> ☐ Ho scritto un test che fallisce senza il fix?
> ☐ Il fix è minimale (non include refactoring)?
> ☐ Ho verificato con evidenze reali (run, log, output)?
