---
name: loop-4-refactor
description: "04. LOOP 4: REFACTOR & OPTIMIZE — Ciclo sequenziale e numerato (04/05) per il refactoring architetturale, Domain-Driven Design, pulizia del debito tecnico e compressione ottimizzata del contesto/token LLM."
---

# 🏗️ 04. Loop 4: Refactor & Optimize (Architecture, Clean & Token Savings)

Questo è il **quarto loop sequenziale (04/05)** del Master Production System di Wizard-AI. Il suo scopo categoriale è **Refactoring Architetturale, Riduzione del Debito Tecnico, Clean Code e Ottimizzazione del Contesto/Token LLM**. Subentra al `03. loop-3-debug` quando la code review evidenzia accoppiamento eccessivo o colli di bottiglia, oppure si attiva quando il consumo di token/memoria della sessione deve essere drasticamente ridotto.

```
    ┌────────────────────────────────────────────────────────┐
    │ 🔍 03. loop-3-debug (Review ha mostrato debito arch.)  │
    └────────────────────────────────────────────────────────┘
              │
              ▼ (Analisi semantica e mappa dipendenze)
    ┌────────────────────────────────────────────────────────┐
    │ 🏗️ 04. loop-4-refactor (Serena → Refactor → Squeeze)   │  ◄── (Sei Qui - Step 04)
    └────────────────────────────────────────────────────────┘
              │
              ├──────────────────────────────────┐
              ▼ (Architettura pulita & Test OK)  │ (Se regressioni o perdita qualità)
    ┌─────────────────────────────────────────┐  ▼
    │ 🚀 05. loop-5-release (Merge & Deploy)  │ ┌─────────────────────────────────────────┐
    └─────────────────────────────────────────┘ │ 🎯 01. loop-1-plan (Nuovo piano di ref) │
                                                └─────────────────────────────────────────┘
```

---

## 📂 Categorizzazione delle Skills, Progetti e Framework del Loop 4

Tutte le seguenti skills appartengono alla categoria di **Ristrutturazione del Codice e Risparmio Computazionale** e devono essere richiamate o concatenate secondo la logica illustrata:

### 1. Categoria: Architectural Refactoring & Clean Code (Pulizia Strutturale)
Queste skill riorganizzano il codice per renderlo modulare, coeso e disaccoppiato senza alterarne il comportamento esterno:
- **`mp-improve-codebase-architecture`**: *Quando usarla:* All'avvio di un refactoring di modulo o servizio. *Cosa fa:* Analizza le dipendenze interne, separa le responsabilità (SRP) e riduce l'accoppiamento verso un'architettura a strati pulita.
- **`serena`**: *Quando usarla:* Obbligatoria prima di rinominare simboli o spostare file su larga scala. *Cosa fa:* Esegue ricerca semantica profonda e navigazione symbol/LSP per mappare esattamente dove una funzione o classe viene richiamata in tutta la codebase.
- **`ponytail` (`ai-ponytail`)**: *Quando usarla:* Quando il codice mostra segnali di over-engineering, design pattern speculativi o gerarchie di classi inutilmente complesse. *Cosa fa:* Applica la mentalità del "senior dev pigro", eliminando astrazioni premature (`YAGNI`) e riducendo le righe di codice.
- **`mp-migrate-to-shoehorn`**: *Quando usarla:* Per migrazioni graduali di architettura (es. passaggio a un nuovo pattern o framework) in modo incrementale senza interrompere il servizio in produzione.
- **`mp-domain-modeling`**: *Quando usarla:* Per disaccoppiare la logica di business dalla persistenza o dalla UI ridefinendo le entità del dominio.

### 2. Categoria: Token & Context Optimization (Risparmio Risorse LLM)
Queste skill controllano e comprimono i payload inviati e ricevuti dal modello per evitare di intasare la context window:
- **`workflow-agentic-brain` (`ai-optimize`)**: *Quando usarla:* Come Master Optimizer quando la sessione supera il 60% della context window o quando si debbono elaborare file enormi. *Cosa fa:* Orchestra dinamicamente le skill di compressione sottostanti.
- **`caveman` (`ai-caveman`)**: *Quando usarla:* Quando l'agente deve generare lunghe analisi o log. *Cosa fa:* Riduce del ~75% i token in uscita dall'agente rimuovendo parole di riempimento pur mantenendo assoluta accuratezza sintattica e tecnica.
- **`sqz` (`ai-squeeze`)**: *Quando usarla:* Prima di passare all'LLM l'output di comandi del terminale prolissi, build log giganti o file JSON di grandi dimensioni. *Cosa fa:* Comprime e riassume il payload mantenendo solo gli errori o i dati strutturali salienti.
- **`llmlingua` (`ai-compress`)**: *Quando usarla:* Per comprimere prompt storici o documenti RAG estesi fino a 20x.
- **`lean-ctx` (`ai-lean`)**: *Quando usarla:* Per governare l'intelligenza di visibilità del contesto, potando file già letti e non più rilevanti.
- **`headroom`**: *Quando usarla:* Per gestire il proxying e la compressione del contesto riducendo la latenza delle chiamate API.
- **`flashrank` (`ai-rerank`)**: *Quando usarla:* Durante la ricerca di documenti o frammenti di codice per ri-ordinare e mettere i frammenti più rilevanti nei primissimi token del prompt.

---

## 🔗 Concatenazione e Skill Chaining Tree (Loop 4)

Il seguente albero mostra la sequenza deterministica di esecuzione del Loop 4 e il controllo anti-regressione:

```mermaid
graph TD
    Start([Da 03. loop-3-debug o Contesto Saturo]) --> CheckType{Tipo di Intervento?}
    
    CheckType -- Ottimizzazione Token / Contesto --> Brain[workflow-agentic-brain / Master Optimizer]
    Brain --> Squeeze[sqz / Comprimi Log e JSON estesi]
    Squeeze --> Lean[lean-ctx / Pota file inattivi dal contesto]
    Lean --> Caveman[caveman / Attiva output compresso -75%]
    Caveman --> OptDone([Contesto Ottimizzato e Leggero])
    
    CheckType -- Refactoring Architetturale --> Serena[serena / Mappa chiamate e simboli LSP]
    Serena --> DomainMod[mp-domain-modeling / Verifica coerenza CONTEXT.md]
    DomainMod --> PlanRef[writing-plans / Scrivi Piano di Refactoring Esplicito]
    
    PlanRef --> Ponytail[ponytail / Rimuovi YAGNI e over-engineering]
    Ponytail --> Arch[mp-improve-codebase-architecture / Applica refactoring modulare]
    
    Arch --> RunRegTest{Esegui Suite di Regressione / auto-debug}
    RunRegTest -- Fallimento (Regressione Introdotta) --> RevertOrFix[Ripristina o Correggi immediatamente il Refactoring]
    RevertOrFix --> Arch
    
    RunRegTest -- Successo (100% Verde & 0 Errori) --> FinalRev[mp-code-review / Verifica Qualità Architettura]
    
    FinalRev --> RevCheck{Qualità Migliorata senza debito?}
    RevCheck -- No (Debito residuo o peggioramento) --> PlanRef
    RevCheck -- Sì --> Handoff([Transizione a 05. loop-5-release])
```

---

## 📝 Istruzioni Operative Passo-Passo (Esecuzione Loop 4)

### Step 4.1: Analisi Preliminare e Mappatura Semantica (`serena`)
- **VIETATO toccare il codice per un refactoring strutturale "alla cieca".**
- Esegui `serena` per esplorare l'albero delle dipendenze del modulo target. Identifica chi chiama la classe/funzione e dove si trovano i colli di bottiglia architetturali.

### Step 4.2: Redazione del Piano di Refactoring Esplicito (`writing-plans` + `ponytail`)
- Scrivi in `task.md` il piano esplicito di refactoring:
  - Specifica quali interfacce verranno disaccoppiate e quali file monstre verranno divisi.
  - Applica `ponytail` per marcare per l'eliminazione qualsiasi classe o metodo speculativo che non è usato dall'applicazione corrente.

### Step 4.3: Esecuzione del Refactoring Protetto da Test (`mp-improve-codebase-architecture`)
- **Regola di Ferro del Refactoring:** Assicurati che i test siano verdi *prima* di iniziare ogni singola modifica atomica.
- Sposta i metodi o dividi le classi un passo alla volta.
- Dopo ogni modifica, esegui la suite di test rapida (`pytest` / `npm test`). Se un test si rompe, fermati e correggilo prima di procedere.

### Step 4.4: Verifica di Regressione e Gate Architetturale (`auto-debug` + `mp-code-review`)
- Esegui l'intera suite di regressione e di linting con `auto-debug`.
- Esegui `mp-code-review` sul diff del refactoring.
  - Se la review mostra che il refactoring ha complicato la leggibilità o introdotto dipendenze occulte, la pull request viene bloccata e il loop torna allo Step 4.2.
  - Se il diff mostra una riduzione netta delle righe di codice, coesione elevata e test verdi al 100%, il refactoring è approvato.

### Step 4.5: Ottimizzazione Contesto e Passaggio di Consegne
- Se la sessione ha accumulato molti log durante i test, usa `sqz` per pulire la memoria e `lean-ctx` per potare i buffer vecchi.
- Aggiorna `MEMORY.md` registrando il refactoring architetturale effettuato.
- Passa al loop conclusivo di rilascio:
  > **Azione:** Refactoring completato e verificato senza regressioni. Transizione immediata al **`05. loop-5-release`**.
