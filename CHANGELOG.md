# Changelog

Tutte le modifiche rilevanti per il progetto Wizard-AI saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Fixed

## [v0.5.0] - 2026-06-13

### Added
- **DevOps Skill Integration**: Integrate 4 nuove skill globali per ottimizzare lo sviluppo e il rilascio:
  - `auto-branch`: Gestione automatizzata del ciclo di vita dei branch Git (creazione, nomenclatura, merge e pulizia).
  - `auto-debug`: Toolkit per il controllo qualità automatizzato, linting, formattazione e test (Ruff, Pytest).
  - `auto-release`: Automazione del versionamento semantico e rilascio su GitHub.
  - `os-detect`: Gestore di pacchetti universale cross-platform per hook di pre-installazione.
- **CLI DevOps Wrappers**: Aggiunti in `bin/` i corrispettivi wrapper CLI:
  - `ai-branch`, `ai-debug`, `ai-release`, `ai-os` con relativi permessi di esecuzione.
- **Unified Helper (`ai-help`)**: Unificato lo script globale di help in `bin/ai-help` per presentare sia la nuova sezione DevOps che gli strumenti di design e lean esistenti.
- **Skill Ecosystem Expansion**: Integrate nel repository le skill per:
  - `awesome-design`: Assistente per framework grafici e UI design.
  - `taste-skill`: Strumenti di sviluppo frontend e pattern anti-slop.
  - `lean-ctx`: Compressione di contesti tramite binari NPM/Rust.
  - `scaffold`: Assistente per il bootstrapping rapido dei progetti.
- **Material UI Redesign**: Rinnovata l'interfaccia dell'Hub locale per allinearsi con i design system Google Material e Apple. Introdotta sidebar responsive (hamburger menu), Glassmorphism avanzato ed effetti di micro-animazione.
- **Docker Support**: Creati `Dockerfile` e `docker-compose.yml` per l'Hub Web e il server API, con relativo file `.dockerignore`.
- **Cockpit Tools Enhancements**: `ai-quota` reso interamente cross-platform e basato su hook in Python per una migliore cattura ed elaborazione degli errori. Aggiunto supporto a docker mounts e al formato pacchetto AUR reale.
- **Skills.sh Integration**: Endpoint `/api/skills-trending` per caricare le skill trending direttamente tramite scraping caching server-side (TTL 5 min) con fallback resiliente.

### Changed
- **Hub Architecture**: Ottimizzato il caricamento dell'endpoint `/api/quota` inserendo un timeout di 5 secondi per prevenire il congelamento del web server in caso di stallo di Cockpit Tools.
- **Database Metriche**: Integrazione a livello di dashboard dei dati dinamici provenienti dal database SQLite locale `telemetry.db` per tracciare i token risparmiati.

### Fixed
- **Hub UI Bugfix**: Corretti tag div mal chiusi in `app.js` all'interno del componente Marketplace.

## [v0.4.0] - 2026-06-13

### Added
- **Global Telemetry Hooks**: Creata l'utility `log_event.py`. Iniettato un hook automatico di background in tutti i wrapper CLI `bin/ai-*` (es. `ai-taste`, `ai-compress`, `ai-graph`) per far affluire i dati di utilizzo direttamente nel database SQLite e aggiornare il grafico web in tempo reale.
- **Spec-Kit Integration**: Aggiunta l'installazione nativa per il toolkit SDD `spec-kit` di GitHub. Creata la directory skill relativa e il comando shell `ai-spec`.
- **Knowledge Graph Update**: Forzato l'aggiornamento del Grafo semantico per far digerire l'ingresso di `spec-kit` all'intero ecosistema.

## [v0.3.0] - 2026-06-12

### Added
- **Database Metriche (SQLite)**: Implementato il tracking delle Revenue stimate e dei token risparmiati tramite il database locale `telemetry.db` in `hub/api/db.py`.
- **API Stats Endpoint**: Aggiunto l'endpoint `/api/stats` nel Web Server che aggrega i dati del database per gli ultimi 6 mesi.
- **Frontend Dinamico**: Il grafico Chart.js e i contatori della dashboard e della home page (`app.js`, `dashboard.js`) non usano più dati mockati, ma attingono dinamicamente al database.

## [v0.2.1] - 2026-06-12

### Added
- **Pre-flight Checks**: Aggiunti controlli di sicurezza in `setup.sh` per Node.js/NPM prima dell'installazione di `lean-ctx`, con fallback e guide visive per l'installazione tramite Cargo o manuale.
- **Scraper Resiliente**: Riscritto l'algoritmo in `hub/api/server.py` per l'endpoint `/api/skills-trending`. Ora usa Regular Expressions robuste anziché classi posizionali rigide. Include anche un Fallback Dataset interno esteso nel caso skills.sh vada offline.
