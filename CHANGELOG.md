# Changelog

Tutte le modifiche rilevanti per il progetto Wizard-AI saranno documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e questo progetto aderisce al [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

## [Unreleased]

### Added
- **Skill Ecosystem Expansion**: Integrazione completa nello script `setup.sh` di 5 nuovi repository chiave:
  - `awesome-design-md` (Design systems UI framework)
  - `taste-skill` (Anti-slop frontend tools)
  - `lean-ctx` (Context compression via Rust/NPM binary)
  - `nuxt` (Vue full-stack template)
  - `express-typescript-starter` (Node.js API template)
- **Nuovi Wrapper CLI**: Introdotti in `bin/` i comandi `ai-design`, `ai-taste`, `ai-lean`, e `ai-scaffold` completi di manuali di utilizzo.
- **Documentazione Skills**: Aggiunti 4 file `SKILL.md` nella directory `skills/` per abilitare l'utilizzo autonomo da parte degli agenti AI.
- **Skills.sh Integration**: Nuovo endpoint `/api/skills-trending` in `hub/api/server.py` che esegue lo scraping lato server (con fallback e cache di 5 minuti) della pagina trending di skills.sh.
- **Dashboard UI**: Componente "Cockpit Tools Status" sulla Dashboard ora gestisce elegantemente lo stato `not_configured`.
- **Marketplace UI**: Introdotto un Tab Switcher in Marketplace per passare dalla visualizzazione delle skill "Installate" alla classifica delle "Trending su skills.sh".

### Changed
- **Hub Design System Overhaul**: 
  - Passaggio a un design system Premium con **Glassmorphism** (`backdrop-filter`, `rgba` backgrounds).
  - Implementazione del font **Inter** di Google Fonts.
  - Sostituzione dei colori standard con gradienti dinamici e accenti indaco/viola.
  - Aggiunte animazioni globali (fadeIn, slideUp, pulseGlow, shimmer) per un'esperienza più fluida.
- **Responsive Layout**: Resa la sidebar completamente responsive (mobile-first) con hamburger button.
- **Hub API (`server.py`)**: Aggiunto un timeout di 5 secondi alla chiamata di sistema `subprocess.run` per `/api/quota` per prevenire blocchi server in caso di stallo di `ai-quota`.
- **ai-quota CLI**: Riscritto interamente per leggere direttamente il database reale `accounts.json` di Cockpit Tools, rimuovendo il mock precedente. Restituisce ora `status: not_configured` in assenza di credenziali valide.

### Fixed
- Risolto un bug nel markup HTML di `app.js` relativo alla corretta chiusura dei div nel componente Marketplace.
