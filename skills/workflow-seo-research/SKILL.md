---
name: workflow-seo-research
description: "Meta-skill per l'analisi SEO e Inbound Marketing automatizzata. Orchestra claude-seo per audit di mercato e claude-blog per generare i cluster semantici di posizionamento."
---

# /workflow-seo-research

Questa meta-skill definisce la procedura operativa standard (SOP) per eseguire un'analisi SEO e di mercato automatizzata usando l'ecosistema Wizard-AI.

## Obiettivo
Quando l'utente richiede di analizzare una nicchia di mercato, migliorare la referenzazione di un progetto o creare una strategia di contenuto, segui esattamente questi step orchestrando gli agenti specializzati.

## Workflow

### 1. Market & Competitor Analysis
Usa le abilità di `claude-seo` per analizzare le entità e i competitor.
- Se l'utente fornisce URL di competitor, esegui `/seo audit <url>` per estrarre la loro architettura e i gap.
- Analizza la GEO (Generative Engine Optimization) del progetto attuale (se esiste) usando `/seo geo <url>`.

### 2. Semantic Topic Clustering (Hub and Spoke)
Usa le abilità di `claude-blog` per definire l'architettura dei contenuti.
- Esegui `/blog strategy <niche>` o `/blog cluster plan <seed>` per generare una mappa di articoli interconnessi progettata per dominare le SERP e le AI Overview.

### 3. Content Generation & Schema
- Usa `/blog write <topic>` per avviare l'agente che genera gli articoli con un contratto di qualità 5-gate.
- Assicurati che ogni articolo generato abbia il JSON-LD aggiornato.

### 4. Continuous Drift Monitoring
- Suggerisci all'utente di implementare snapshot regolari usando `/seo drift baseline <url>`.

## Vincoli
- Non scrivere codice o articoli a mano. Delega sempre a `claude-blog` e `claude-seo`.
- Verifica che `WIZARD_AI_DIR` sia configurato prima di avviare il workflow.
