---
name: loop-learn
description: "🧠 LEARNING LOOP — Ciclo di apprendimento persistente. Concatena: research → teach → grill-me → domain-modeling → wiki-brain → session-manager. Richiamabile con /loop-learn o keyword: impara, spiega, insegna, documenta, wiki, studia."
---

# 🧠 Loop-Learn — Learning & Knowledge Loop

> **Il ciclo deterministico per acquisire, formalizzare e persistere conoscenza.**
> Ogni iterazione trasforma informazioni grezze in conoscenza strutturata e riutilizzabile.

<MANDATORY>
Questo workflow si attiva quando l'utente vuole CAPIRE qualcosa, non COSTRUIRE qualcosa.
Se la richiesta è esplorativa, educativa, o documentale → questo loop è il punto di ingresso.
</MANDATORY>

---

## Trigger Keywords
`impara`, `spiega`, `insegna`, `documenta`, `wiki`, `studia`, `ricerca`, `come funziona`, `cos'è`, `/loop-learn`

---

## 🧠 Il Loop (7 Step Iterativi)

```
┌─→ [1] RESEARCH   — mp-research
│   [2] TEACH      — mp-teach
│   [3] VERIFY     — mp-grill-me (verifica comprensione)
│   [4] FORMALIZE  — mp-domain-modeling
│   [5] PERSIST    — wiki-brain / graphify
│   [6] SAVE       — session-manager
└─← [7] ITERATE    — Se utente ha altre domande → torna a step 1
    [✓] LEARNED    — CONTEXT.md aggiornato
```

---

### Step 1: RESEARCH — Raccolta Informazioni
**Skill:** `mp-research`

1. **Identifica le fonti:**
   - Codebase locale (grep, file analysis)
   - Documentazione esistente (README, docs/, wiki)
   - Knowledge graph (se `graphify-out/` esiste)
   - Web (se necessario: documentazione ufficiale, paper)
2. **Organizza i risultati:**
   - Fatti verificati
   - Ipotesi da confermare
   - Lacune informative (cosa non sappiamo ancora)

**Exit Criteria:** Informazioni sufficienti per spiegare il topic.

### Step 2: TEACH — Spiegazione Strutturata
**Skill:** `mp-teach`

1. **Spiega il concetto** in modo chiaro e stratificato:
   - **TL;DR** (1 riga)
   - **Spiegazione semplice** (per non-tecnici)
   - **Spiegazione tecnica** (dettagliata)
   - **Esempio pratico** (codice o analogia)
2. Se richiesto, crea risorse strutturate:
   - `GLOSSARY.md` — termini chiave
   - `RESOURCES.md` — link e riferimenti
   - `LEARNING-RECORD.md` — log dell'apprendimento

**Exit Criteria:** L'utente ha ricevuto una spiegazione chiara e multi-livello.

### Step 3: VERIFY — Verifica Comprensione
**Skill:** `mp-grill-me`

1. **Fai domande all'utente** per verificare la comprensione:
   - "Puoi riformulare X con parole tue?"
   - "Quali sono i trade-off di Y?"
   - "Come applicheresti Z al tuo progetto?"
2. Se l'utente non ha capito → torna a Step 2 con spiegazione diversa
3. Se l'utente ha capito → procedi

**Exit Criteria:** Comprensione confermata.

### Step 4: FORMALIZE — Formalizzazione Conoscenza
**Skill:** `mp-domain-modeling`

1. **Formalizza la conoscenza** in formato strutturato:
   - Aggiungi al `CONTEXT.md` i nuovi termini/concetti
   - Crea ADR (Architecture Decision Records) se applicabile
   - Aggiorna il glossario del progetto
2. La conoscenza deve essere **riutilizzabile** nelle sessioni future

**Exit Criteria:** Conoscenza formalizzata in documenti del progetto.

### Step 5: PERSIST — Persistenza nel Knowledge Graph
**Skill:** `wiki-brain`, `graphify`, `auto-graphify`

1. **Persisti la conoscenza:**
   - Se `wiki-brain` è configurato: aggiungi alla wiki personale
   - Se `graphify` è disponibile: aggiorna il knowledge graph
   - Se `claude-mem` è configurato: salva come memoria semantica
2. La conoscenza deve sopravvivere tra sessioni

**Exit Criteria:** Conoscenza persistita in almeno un sistema.

### Step 6: SAVE — Salvataggio Stato
**Skill:** `session-manager`

1. Salva lo stato della sessione corrente
2. Aggiorna `MEMORY.md` con il topic studiato
3. Registra il percorso di apprendimento

**Exit Criteria:** Stato salvato.

### Step 7: ITERATE — Continua ad Imparare

**Condizioni di loop-back:**
- 🔄 Utente ha altre domande → torna a **Step 1**
- 🔄 Topic correlato emerge → torna a **Step 1** con nuovo focus
- 🔄 Comprensione insufficiente → torna a **Step 2** con approccio diverso
- ✅ Apprendimento completo → procedi a LEARNED

### ✅ LEARNED — Apprendimento Completato

1. **Output finale:**
   - Summary di cosa è stato imparato
   - Link ai documenti aggiornati (CONTEXT.md, GLOSSARY.md, etc.)
   - Suggerimenti per approfondimenti futuri
2. Se il learning era propedeutico a un task:
   - Suggerisci `loop-develop` o `loop-refactor` come next step

---

## Self-Check

> ☐ Ho usato fonti verificate (non ho inventato informazioni)?
> ☐ La spiegazione è stratificata (semplice → tecnica)?
> ☐ La conoscenza è stata persistita (non si perde alla fine della sessione)?
> ☐ Il CONTEXT.md è stato aggiornato con i nuovi concetti?
