# Core Engine

Il Core Engine di Wizard-AI è il nucleo operativo che regola il funzionamento e l'orchestrazione delle interazioni dell'utente. Contiene le skill essenziali e sistematiche che intervengono prima (PRE) e dopo (POST) qualsiasi sviluppo effettivo.

## 1. prompt-loop-engine
La Master Skill suprema. Implementa il Pipeline Loop Engineering deterministico. Si attiva prima e dopo ogni prompt utente, forzando un loop _zero-stop_ che impone all'agente di attraversare sistematicamente la catena di task senza interrompersi in modo immaturo.

## 2. auto-router
Il Master Router MoE (Mixture of Experts). Analizza ogni richiesta naturale, ne calcola la complessità (LIGHT, MEDIUM, HEAVY) basandosi sulla densità delle keyword, e la incanala verso uno dei 5 Loop numerati (da 01 a 05) o verso workflow di dominio specifici.

## 3. wizard-ai-hub e wizard-ai-installer
Hub per le capacità meta dell'agente. Permettono all'agente di scoprire le skill disponibili o di installarne autonomamente di nuove estraendole da repository esterni tramite protocolli di `search_web`.

## 4. session-manager e show-active-skill
Skill incaricate di mantenere il contesto a lungo termine, salvare su `MEMORY.md` lo stato alla chiusura di un loop, e fornire trasparenza in tempo reale mostrando all'utente la gerarchia di esecuzione del loop attuale (CoT Step Traversal).
