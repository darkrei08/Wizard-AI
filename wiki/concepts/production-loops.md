# Production Loops (01-05)

La cartella `2-production-loops` definisce il ciclo di vita del software all'interno del sistema Wizard-AI. Ogni loop si innesca in sequenza secondo una rigida pipeline. L'agente non deve interrompere l'esecuzione e il passaggio del testimone (_Autonomous Baton-Passing_) fino a quando il ciclo non si conclude su `loop-5-release`.

## loop-1-plan
- **Fase:** Plan & Spec. 
- **Scopo:** Analisi dei requisiti, allineamento (`grill-me`), e formalizzazione tecnica nel documento `.spec.md`. Non viene toccato o scritto alcun codice produttivo in questo stadio. Imposta lo scheletro di `task.md`.

## loop-2-develop
- **Fase:** Sviluppo Isolato (TDD)
- **Scopo:** Partendo da `task.md`, crea branch isolati, implementa i test (RED) e poi la logica minima per farli passare (GREEN). Può orchestrare sub-agenti in parallelo su task complessi e introduce costantemente la sanitizzazione della sicurezza (`cybersecurity`).

## loop-3-debug
- **Fase:** Diagnosi e Verifica (Quality Gates)
- **Scopo:** Indaga bug scientificamente formulando ipotesi empiriche. Passa al setaccio il codice verificando che i tool di linting e le suite di test siano rigorosamente superati.

## loop-4-refactor
- **Fase:** Refactoring Architetturale
- **Scopo:** Interviene se la code review suggerisce che è stato introdotto debito tecnico. Minimizza accoppiamenti e ristruttura in modo DRY e modulare il sistema prima che avvenga il deploy definitivo.

## loop-5-release
- **Fase:** Release e Persistenza
- **Scopo:** Fase finale. Genera il bump semantico di versione (SemVer), rilascia o esegue la merge su main e salva irrevocabilmente il contesto su `MEMORY.md`, permettendo all'agente di imparare dalla sessione e riavviare un nuovo task con maggiore consapevolezza.
