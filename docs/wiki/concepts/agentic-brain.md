# Agentic Brain & Token Reduction

La cartella `3-agentic-brain` racchiude le skill di **Ottimizzazione del Contesto e Prevenzione delle Allucinazioni**. Queste skill vengono triggerate forzatamente in tutti i Loop (inclusi sviluppo e planning) per mantenere il contesto dell'agente sempre sotto controllo, specialmente con basi di codice di grandi dimensioni o log infiniti.

## 1. workflow-agentic-brain
È il "Master Optimizer". Si occupa di orchestrare tutte le skill di compressione sottostanti. Se la finestra di contesto supera la soglia di guardia, o se ci si accinge a far elaborare output giganteschi, questa meta-skill entra in azione prelevando gli strumenti ottimali.

## 2. lean-ctx (ktx)
Intelligenza di potatura del contesto (Lean Context Intelligence). Invece di conservare in memoria tutti i file aperti, rimuove selettivamente dal contesto l'AST o i file che non sono più rilevanti per il compito istantaneo. Questo riduce il rumore fino al 60-90% eliminando la dispersione e migliorando l'accuratezza.

## 3. sqz
Skill specializzata nella compressione brutale di log. Interviene durante l'esecuzione dei test (es. TDD falliti) o durante il dump di file JSON enormi. Pulisce spazi vuoti, righe inutili e lascia solo il messaggio rilevante, evitando che i token dell'LLM vadano in overflow.

## 4. caveman
Modalità output a basso consumo token. Impone all'agente di produrre una risposta ultra-sintetica (~75% di riduzione dei token in uscita) eliminando del tutto le spiegazioni colloquiali pur preservando la sintassi e l'accuratezza tecnica. Ideale durante lunghi cicli di debug LLM iterativi in background.

## 5. ponytail
Implementa il mindset dello sviluppatore "pigro e saggio". Contrasta l'over-engineering (YAGNI), imponendo all'agente di interrogarsi criticamente se una determinata astrazione, feature o pattern architettonico sia davvero necessario prima di scriverne il codice.

## Integrazione nei Loops
Queste skill sono state recentemente iniettate con vincoli _mandatory_ all'interno di:
- **loop-1-plan**: Per sintetizzare e gestire le indicizzazioni RAG su documentazione massiva.
- **loop-2-develop**: Per comprimere gli output dei test runners durante i cicli TDD (Red-Green-Refactor).
- **loop-3-debug**: Per snellire i log degli stack trace e impedire lunghe spiegazioni non necessarie.
- **loop-4-refactor**: Per mappare solo l'essenziale dell'AST prima di ristrutturare massivamente la codebase.
