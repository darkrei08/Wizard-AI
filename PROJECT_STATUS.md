# 🧙‍♂️ Wizard-AI — Project Status & Tracker

Questo documento funge da memoria contestuale per tracciare lo stato di avanzamento del progetto, le architetture scelte e i bug aperti. Gli AI agent possono leggerlo per ottenere il contesto sul lavoro in corso.

## 🎯 Obiettivo Principale
Wizard-AI punta a essere l'ecosistema locale definitivo per integrare, gestire e monetizzare workflow e skill per AI agent (Claude, Gemini, Cursor) in modo unificato, tramite un hub web locale e una potente CLI bash/Python.

## 🟢 Stato Attuale: Alpha Avanzata (v0.5.0)
Il sistema è funzionante e le API interne comunicano correttamente con i binari CLI e la GUI web. L'architettura è stabile. Le 155 skill degli AI agent sono state recentemente ristrutturate in percorsi gerarchici (core, frontend, backend, devops, data-science, memory-knowledge, workflows) e governate da meta-workflow come `workflow-production-cycle`.

### Componenti Principali Implementati
- **Hub Web (GUI)**:
  - Home: Statistiche di sistema e link rapidi.
  - Dashboard: Widget di `ai-quota` (Cockpit Tools) con integrazione del database locale. Statistiche e chart mockup sulle revenues. Gestione stato "not_configured" funzionante.
  - Marketplace: Tab switcher tra le skill "Installate" in locale e le "Trending su skills.sh" (tramite scraping API).
  - Design System Premium: Totalmente aggiornato con Glassmorphism, Google Fonts (Inter), animazioni globali CSS e mobile-first responsive.
- **Hub Server API** (`hub/api/server.py`):
  - Server HTTP Python semplice con serving statico.
  - Endpoint `/api/quota`: esegue `ai-quota` (timeout di 5 secondi applicato).
  - Endpoint `/api/skills-trending`: effettua uno scraping server-side con memory-cache (TTL 5 minuti) verso `skills.sh`.
- **Ecosistema CLI e Wrapper**:
  - Script globale `setup.sh` solido, supporta `uv` (per le repo Python) e clona selettivamente le dipendenze.
  - Binari locali in `bin/`:
    - `ai-quota`: Riscritto. Dialoga col database di Cockpit Tools (`~/.local/share/cockpit-tools/accounts.json`).
    - `ai-help`: Centralino di comandi, costantemente aggiornato.
    - Strumenti di sviluppo integrati: `ai-design`, `ai-taste`, `ai-lean`, `ai-scaffold`, `ai-goodcode`.

## 🐞 Known Bugs & Aree di Miglioramento
*Al momento non sono stati riscontrati bug bloccanti. Il sistema è stabile e la gerarchia dei workflow è operativa.*

## 📝 Memoria & Skill
I seguenti strumenti sono consigliati come "long-term memory" per gli AI agent che opereranno su questa repository:
- `ai-mem` (claude-mem) per salvare stralci di contesto testuale che sopravvivono tra chat diverse.
- Questo file `PROJECT_STATUS.md` e `CHANGELOG.md` fungono da ground-truth sullo stato del codice.
