# Workflow: Multi-Agent Parallel Execution (Shadow Clone Jutsu)

## The Loop Lens
Questo workflow formalizza l'esecuzione parallela ("Shadow Clone Jutsu") per abbattere i tempi di risoluzione quando si affrontano task indipendenti (es. bug isolati, audit multipli, setup distribuiti). Invece di eseguire task in sequenza sprecando contesto e tempo, si istanziano sub-agenti isolati e focalizzati in contemporanea.

## Vocabulary
- **Shadow Clone Jutsu**: L'atto di lanciare chiamate concorrenti a sub-agenti o tool nello stesso singolo turno di risposta dell'agente orchestratore.
- **Problem Domain**: Un'unità di lavoro isolata che non condivide stato con altre (es. un singolo file di test, un singolo script di setup).
- **Orchestrator**: L'agente principale (tu) che mantiene il contesto di alto livello, divide il problema in domini e raccoglie i risultati (Integration).

## Workflow Spec (The Execution Pattern)

### 1. Trigger
**Evento Manuale / Diagnostico**: Quando l'orchestrazione principale (Loop 3 - Debug o Loop 2 - Develop) si scontra con 2 o più task *indipendenti*.
*Esempio*: 3 file di test falliscono per motivi diversi, oppure ci sono 3 moduli distinti da aggiornare.

### 2. Push Right & Preparation
Prima di attivare i sub-agenti, l'Orchestrator deve:
1. Verificare l'assenza di dipendenze sequenziali (se l'Agente A fallisce, l'Agente B può comunque avere successo?).
2. Preparare un **Task Scope** granitico per ogni sub-agente (no vaghezze, no refactoring libero).

### 3. Execution (The Jutsu)
Emettere le chiamate ai sub-agenti *nella stessa risposta* (o in task asincroni concorrenti) per forzare il parallelismo:
```text
Subagent A (Scope: Setup.sh Audit) -> "Controlla le installazioni di setup.sh rispetto a WIKI.md"
Subagent B (Scope: Proxy Setup) -> "Risolvi i permessi globali di pi-cockpit-setup"
Subagent C (Scope: Graphify) -> "Aggiorna i nodi del knowledge graph"
```

### 4. Checkpoint (Briefing & Integration)
- **Nessun Checkpoint Intermedio**: I sub-agenti lavorano in autonomia (Push Right).
- **Brief Finale all'Utente**: L'Orchestrator attende il ritorno di tutti i cloni, unisce i risultati, verifica l'assenza di conflitti e presenta un sommario unificato ("Brief") all'utente. Solo a questo punto l'utente è chiamato a decidere o approvare.

---
*Definition of Done*: Tutti i cloni sono rientrati, le loro modifiche sono state integrate e il test di integrazione passa. Nessuna eccezione asincrona lasciata pendente.
