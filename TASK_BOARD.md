# Task Board: Issue con pi dev e cockpit tools

## Descrizione
`pi dev` non legge ed esegue i prompt in quanto non legge correttamente `cockpit tools`. Il bridge o l'estrazione delle credenziali non sta passando il contesto/prompt corretto al motore di execution.

## Obiettivi
1. Analizzare il bridge tra `pi dev` e `cockpit-tools` per identificare dove si perde il prompt.
2. Usare parallel subagents per analizzare la configurazione e il routing delle API/WebSocket.
3. Scrivere test (02. loop-2-develop).
4. Correggere il problema.
5. Verificare e chiudere la issue.

## Status
- [x] Issue aperta (01. loop-1-plan)
- [x] Analisi in parallelo via subagents (02. loop-2-develop)
- [x] Identificazione root cause (03. loop-3-debug)
- [x] Implementazione fix (configurazione proxy e auth)
- [x] Verifiche e Chiusura (loop-5-release)
