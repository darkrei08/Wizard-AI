# Wiki delle Risorse e Skill Installate in Wizard-AI

> 🇬🇧 [Read this Wiki in English](WIKI.md)

Questa è la wiki centrale che traccia tutti i tool core di Wizard-AI, le skill degli agenti AI installate e le tecnologie di riferimento esterne. 
**Prima di richiedere l'integrazione di una nuova skill**, controlla questa lista per verificare se un tool simile è già installato o tracciato.

---

## 🧙‍♂️ 1. Strumenti CLI Core di Wizard-AI

Questi sono i wrapper principali da riga di comando installati globalmente sul tuo sistema tramite Wizard-AI.

- **`ai-help`**: Hub centrale e directory dei comandi.
- **`ai-graph`**: Costruisce grafi di conoscenza dal codice (via Graphify).
- **`ai-compress`**: Comprime prompt e contesto fino a 20x (via LLMLingua).
- **`ai-rerank`**: Riordina i passaggi per pertinenza (via FlashRank).
- **`ai-squeeze`**: Comprime output terminale / JSON / log (via Sqz).
- **`ai-convert`**: Converte qualsiasi file in Markdown pulito (via MarkItDown).
- **`ai-mem`**: Salva e ricerca memoria semantica persistente (via claude-mem).
- **`ai-usage`**: Traccia il consumo dei token Gemini (via GeminiUsage).
- **`ai-sync-skills`**: Sincronizzatore per propagare le skill agli altri agenti.
- **`book-to-skill`**: Converte libri e PDF in skill per l'AI.
- **`litellm`**: Gateway unificato per le API degli LLM.

---

## 🔌 2. Skill degli Agenti Installate

L'ecosistema vanta **33 skill e framework custom** esclusivi di Wizard-AI, oltre ai plugin di base forniti dagli agenti (es. Antigravity, Claude Code).
Di seguito la categorizzazione rigorosa dell'arsenale a tua disposizione:

### 🔮 Le 33 Skill Custom (Wizard-AI Core)

#### 1. System Core & Routing (Fondamenta)
- **`wizard-ai-hub`**: Scoperta e dashboard delle skill.
- **`auto-router`**: Mappatura intelligente degli intenti colloquiali dell'utente verso le skill tecniche.
- **`wizard-ai-installer`**: Installer autonomo per nuove skill esterne.
- **`show-active-skill`**: Costringe l'AI a dichiarare quali tool e wrapper sta usando.
- **`os-detect`**: Rilevatore di sistema operativo (Linux, macOS, Windows) pre-installazione.

#### 2. Context & Token Optimization (Risparmio Risorse)
- **`caveman`**: Plugin/skill che comprime l'output dell'AI del 75% mantenendo l'accuratezza.
- **`llmlingua` / `ai-compress`**: Compressione ultra-spinta dei contesti massivi.
- **`sqz` / `ai-squeeze`**: Compressione output del terminale, payload e JSON.
- **`flashrank` / `ai-rerank`**: Riordinamento chirurgico dei contesti documentali (RAG).
- **`lean-ctx`**: Controllo e isolamento intelligente del contesto AI.
- **`auto-optimize`**: Orchestratore che applica automaticamente i compressori in base alla necessità.

#### 3. Intelligenza Semantica e Memoria (Knowledge)
- **`graphify` / `ai-graph`**: Costruttore dinamico di knowledge graph.
- **`auto-graphify`**: Trigger automatico per aggiornare la mappa.
- **`claude-mem` / `ai-mem`**: Memoria persistente e semantica cross-sessione.
- **`wiki-brain-skill`**: Integrazione della base di conoscenza in stile Obsidian.
- **`serena`**: Ricerca semantica profonda e LSP all'interno del codice.

#### 4. Data & Document Processing (Ingestion)
- **`markitdown` / `ai-convert`**: Estrazione markdown pulita da file Office, PDF, immagini.
- **`book-to-skill`**: Converte interi manuali o libri PDF in framework assimilabili dagli agenti.

#### 5. Ingegneria del Software & CI/CD (Workflow)
- **`auto-workflow`**: Applicazione rigorosa del Git Flow (isolamento, test, merge).
- **`auto-branch`**: Gestione autonoma e convenzioni ferree sui branch.
- **`auto-release` / `ai-release`**: Rilascio di versioni semantiche (semver) e changelog.
- **`auto-trigger-release`**: Trigger automatico di pubblicazione a fine task.
- **`auto-npm-publish`**: Gestione, configurazione e sync automatizzato su NPM.
- **`auto-debug`**: Analizzatore di codice ed auto-correzione prima di procedere al merge.
- **`spec-kit`**: Toolkit per lo sviluppo orientato alle specifiche (TDD/SDD).

#### 6. Frontend, UI/UX e Design (Design System)
- **`taste-skill`**: Framework "anti-slop" per forzare layout e spaziature di altissima gamma.
- **`awesome-design`**: Iniezione di stili e linguaggi brand-specifici (Vercel, Cursor, Claude).

#### 7. Scaffolding & Templates (Avvio Progetti)
- **`scaffold` / `ai-scaffold`**: Generatore istantaneo di progetti Prod-Ready (es. Express+TS, Nuxt v4).

#### 8. LLM Orchestration & Prompting (Controllo AI)
- **`litellm`**: Proxy API Gateway locale per testare e ruotare oltre 100+ modelli.
- **`auto-prompt`**: Middleware che intercetta i prompt disordinati e li struttura in XML perfetti.
- **`gemini-usage`**: Monitor e tracciatore live dei costi e budget API.
- **`ecc`**: (Enhanced Claude Code) Framework per orchestrare sub-agenti specializzati.
- **`rtk`**: Toolkit AI nativo per estensioni.

---

### 🌐 Plugin degli Agenti di Base (Built-in)
- **a11y-debugging**: Debugging dell'accessibilità web (ARAI, focus, contrasto) tramite Chrome DevTools.
- **chrome-devtools**: Automazione del browser e debugging, ispezione della rete e performance.
- **chrome-extensions**: Creazione e debugging di estensioni per Google Chrome (Manifest V3).
- **debug-optimize-lcp**: Ottimizzazione del Largest Contentful Paint (LCP) e dei Core Web Vitals.
- **memory-leak-debugging**: Diagnostica dei memory leak per applicazioni JavaScript/Node.js.
- **modern-web-guidance**: Ricerca di best practice per lo sviluppo web moderno (UI, performance, API web).
- **troubleshooting**: Risoluzione di problemi di connessione del browser.

### 🔥 Firebase Plugin
- **firebase-ai-logic-basics**: Integrazione dell'AI Logic (Gemini API) di Firebase in app web.
- **firebase-app-hosting-basics**: Deploy di app web (Next.js/Angular) con Firebase App Hosting.
- **firebase-auth-basics**: Setup di Firebase Authentication (gestione utenti e accessi).
- **firebase-basics**: Configurazione di base di progetti Firebase tramite CLI.
- **firebase-crashlytics**: Implementazione e analisi dei crash tramite Firebase Crashlytics.
- **firebase-data-connect**: Creazione di backend Firebase basati su PostgreSQL.
- **firebase-firestore**: Configurazione, query e gestione di database Cloud Firestore.
- **firebase-hosting-basics**: Deploy su Firebase Hosting classico (per siti statici/SPA).
- **firebase-remote-config-basics**: Gestione di feature flag e configurazione da remoto.
- **firebase-security-rules-auditor**: Controllo e validazione della sicurezza per le regole di Firestore.
- **xcode-project-setup**: Setup sicuro per progetti iOS/Xcode (integrazione dipendenze come Firebase).

### 📱 Sviluppo Mobile (Android Plugin)
- **android-cli**: Automazione di task Android (creazione progetti, gestione SDK, diagnostica).

### 🧬 Scienze e Ricerca Biomedica (Science Plugin)
- **alphafold-database-fetch-and-analyze**: Analisi di strutture proteiche previste da AlphaFold tramite ID UniProt.
- **alphagenome-single-variant-analysis**: Analisi di varianti genetiche ed espressione genica (AlphaGenome).
- **chembl-database**: Ricerca nel database ChEMBL (molecole bioattive, target, farmaci).
- **clinical-trials-database**: Ricerca su ClinicalTrials.gov per studi clinici.
- **clinvar-database**: Analisi clinica e patogenicità di varianti genomiche umane.
- **dbsnp-database**: Ricerca e mappatura di varianti genetiche brevi (SNP) su NCBI.
- **embl-ebi-ols**: Ricerca nel sistema di ontologie biomediche (OLS) dell'EMBL-EBI.
- **encode-ccres-database**: Ricerca su elementi regolatori cis del genoma (ENCODE).
- **ensembl-database**: Mappatura di ID, estrazione di sequenze genomiche ed effetti delle varianti.
- **foldseek-structural-search**: Ricerca strutturale in 3D di proteine rispetto ai vari database.
- **gnomad-database**: Interrogazione sulle frequenze alleliche e varianti da gnomAD.
- **gtex-database**: Estrazione di dati di espressione RNA sui tessuti umani da GTEx.
- **human-protein-atlas-database**: Localizzazione ed espressione delle proteine (HPA).
- **interpro-database**: Identificazione di domini, famiglie e siti proteici.
- **jaspar-database**: Interrogazione dei profili di legame dei fattori di trascrizione (TF).
- **literature-search-arxiv**: Ricerca di articoli scientifici e paper su arXiv.
- **literature-search-biorxiv**: Ricerca e download di preprint da bioRxiv/medRxiv.
- **literature-search-europepmc**: Ricerca in Europe PMC per la letteratura biomedica.
- **literature-search-openalex**: Interrogazione del database scolastico OpenAlex.
- **ncbi-sequence-fetch**: Estrazione di sequenze proteiche e nucleotidiche dai database NCBI.
- **openfda-database**: Ricerca di dati su farmaci, dispositivi e richiami (API openFDA).
- **opentargets-database**: Identificazione di target terapeutici da Open Targets.
- **pdb-database**: Ricerca e download di strutture biomolecolari 3D (Protein Data Bank).
- **protein-sequence-msa**: Allineamento di sequenze multiple (MSA) tramite Clustal Omega.
- **protein-sequence-similarity-search**: Ricerca di omologie per sequenze proteiche (MMseqs2/BLAST).
- **pubchem-database**: Ricerca di dati per la cheminformatica e composti molecolari su PubChem.
- **pubmed-database**: Ricerca e download di paper medici e trial clinici da PubMed.
- **pymol**: Analisi, visualizzazione e rendering in 3D per le strutture proteiche.
- **quickgo-database**: Mappatura tra geni e processi biologici tramite QuickGO/ECO.
- **reactome-database**: Analisi dei pathway e associazioni sul database Reactome.
- **string-database**: Analisi sulle interazioni proteina-proteina (PPI) da STRING.
- **ucsc-conservation-and-tfbs**: Ricerca per l'evoluzione e conservazione genomica (UCSC).
- **unibind-database**: Interrogazione dei siti di legame (TF-DNA) validati su UniBind.
- **uniprot-database**: Ricerca di metadati proteici, tassonomia e funzioni in UniProt.

### 🛠️ Utility e Competenze Core
- **google-antigravity-sdk**: Progettazione e implementazione di agenti basati su SDK Antigravity (AGY).
- **session-context-compressor**: Sintesi e compressione del contesto di sessione per agevolare il ripristino futuro.
- **workflow-skill-creator**: Trasformazione di un workflow complesso dell'utente in una nuova skill riutilizzabile.
- **science-skills-common**: Core logico condiviso (HTTP client e rate limiter) per le API scientifiche.
- **uv**: Utility per l'installazione e verifica del gestore di pacchetti Python `uv`.
- **wizard-ai-installer**: Meta-skill per installare, integrare e configurare autonomamente nuove skill e repository in Wizard-AI.

---

## 📚 3. Risorse Esterne e Tecnologie

Lista di riferimento di tool, repository e framework rilevanti per l'AI e lo sviluppo.

### Agenti, Memoria e Profilo Personale (Digital Identity)
- [OpenHuman](https://github.com/tinyhumansai/openhuman) - Piattaforma per dati personali, Obsidian integration e desktop AI harness.
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw) - Assistente AI personale multi-canale ed estendibile installabile localmente.
- [syke](https://github.com/saxenauts/syke) - Agente di memoria a lungo termine cross-harness basato sul modello Persona.
- [Mem0](https://github.com/mem0ai/mem0) - Layer di memoria a lungo termine intelligente e personalizzato per agenti e assistenti AI.
- [personal-graph](https://github.com/Technoculture/personal-graph) - Grafi di conoscenza personali leggeri per LLM (Python).
- [Graphify](https://github.com/safishamsi/graphify) - Trasformazione di input, codice e note in knowledge graph per LLM.
- [LLMWIKI](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) - Il gist di Karpathy sull'uso di LLM per basi di conoscenza personali (Obsidian).
- [Esempio portfolio e tecnologie usate](https://github.com/micio86dev/portfolio) - Seed identitario per l'addestramento o il recupero dei dati dell'utente.

### Developer Tools, Ottimizzazione e Token Efficiency
- [GeminiUsage](https://github.com/rmedranollamas/geminiusage) - Tool CLI per tracciare token e contesto utilizzati su terminale.
- [LiteLLM](https://github.com/BerriAI/litellm) - AI Gateway e SDK unificato per interfacciarsi con 100+ provider LLM con tracking di token/costi.
- [LLMLingua](https://github.com/microsoft/LLMLingua) - Libreria di compressione dei prompt per ridurre i token fino a 20x mantenendo le performance dell'LLM.
- [FlashRank](https://github.com/PrithivirajDamodaran/FlashRank) - Reranker ultra-veloce e leggero ottimizzato per CPU per limitare il contesto e i token nei sistemi RAG.
- [sqz](https://github.com/ojuschugh1/sqz) - Tool di compressione del contesto per output CLI, JSON e log per sessioni agentiche token-efficienti.
- [MarkItDown](https://github.com/microsoft/markitdown) - Utility e libreria Python per convertire svariati formati in Markdown per LLM e RAG.
- [Claude-Mem](https://github.com/thedotmack/claude-mem) - Sistema di memoria persistente a lungo termine e indicizzazione semantica per LLM.
- [wiki-brain-skill](https://github.com/tenfoldmarc/wiki-brain-skill) - Skill per Claude Code che implementa il pattern LLM Wiki di Karpathy, automatizzando l'ingestione, l'indicizzazione e il logging in Obsidian con Graphify.
- [ECC](https://github.com/affaan-m/ECC) - Framework di ottimizzazione per agenti AI (comandi, skill, hook e configurazioni MCP).
- [Serena](https://github.com/oraios/serena) - Toolkit per agenti di programmazione e server MCP per la ricerca/modifica semantica del codice basata su LSP.
- [Spec-Kit](https://github.com/github/spec-kit) - Toolkit per lo sviluppo guidato dalle specifiche (SDD) tramite agenti AI.
- [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills/releases/tag/v11.2.0) - Collezione di skill pronti all'uso per agenti AI.
- [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) - Raccolta di best practice e skill di sistema per agenti.
- [CLI-Anything](https://github.com/HKUDS/CLI-Anything) - Framework per esporre software e applicazioni come CLI per agenti AI.
- [CLI-Printing-Press](https://github.com/mvanhorn/cli-printing-press) - Sviluppo di interfacce compatte agent-native per ridurre i token.
- [Book-to-Skill](https://github.com/virgiliojr94/book-to-skill/tree/master) - Conversione di documenti e libri in skill AI.
- [Impeccable](https://github.com/pbakaus/impeccable) - Test UI/UX ad alta fedeltà e regressione visiva per agenti.

### Audio, Video ed Emozioni (Multimodale)
- [Voicebox](https://github.com/jamiepine/voicebox) - Elaborazione e sintesi vocale multi-engine (locale).
- [Easy-Vibe](https://github.com/datawhalechina/easy-vibe) - Miglioramento ed elaborazione video/immagini tramite AI (vibe coding curriculum).
- [OmniVoice-Studio](https://github.com/debpalash/OmniVoice-Studio) - Produzione vocale professionale e voice cloning offline.
- [Supertonic](https://github.com/supertone-inc/supertonic) - Processing ed enhancement audio on-device.
- [Hyperframes](https://github.com/heygen-com/hyperframes) - Rendering UI, gestione frame e generazione video via HTML.

### Linguaggi e Runtime
- [Python](https://github.com/python/cpython)
- [Node.js](https://nodejs.org/)
- [Bun](https://github.com/oven-sh/bun)
- [Deno](https://github.com/denoland/deno)
- [QuickJS](https://github.com/quickjs-ng/quickjs)

### Framework Frontend e UI
- [Next.js](https://github.com/vercel/next.js)
- [Vue.js](https://github.com/vuejs/core)
- [React](https://github.com/facebook/react)
- [SvelteKit](https://github.com/sveltejs/kit)
- [Gatsby](https://github.com/gatsbyjs/gatsby)
- [Angular](https://github.com/angular/angular)
- [Vuetify](https://github.com/vuetifyjs/vuetify)
- [Svelte](https://github.com/sveltejs/svelte)
- [Nuxt](https://github.com/nuxt/nuxt)
- [Astro](https://astro.build/)
- [AionUi](https://github.com/iOfficeAI/AionUi/tree/main) - Libreria di componenti UI.
- [phantom-ui](https://github.com/Aejkatappaja/phantom-ui) - Libreria per skeleton loader indipendenti dal framework (Web Components).
- [PageSpeed Insights](https://pagespeed.web.dev/?hl=it) - Analisi delle performance web.

### Framework Backend, CMS e Database
- [Laravel](https://github.com/laravel/laravel)
- [WordPress](https://github.com/WordPress/WordPress)
- [MySQL](https://github.com/mysql/mysql-server)
- [MongoDB](https://github.com/mongodb/mongo)
- [Kafka](https://github.com/apache/kafka)
- [PocketBase](https://github.com/pocketbase/pocketbase) - Backend leggero in singolo eseguibile con database realtime, auth e storage.
- [TrailBase](https://github.com/trailbaseio/trailbase) - Server backend e database realtime scritto in Rust con SQLite.
- [Pi.dev](https://pi.dev) - Piattaforma di sviluppo e integrazione serverless.

### API e Integrazioni Messaging (WhatsApp)
- [go-whatsapp-web-multidevice](https://github.com/aldinokemal/go-whatsapp-web-multidevice) - Bridge WhatsApp multi-device.
- [Wuzapi](https://github.com/asternic/wuzapi) - API REST basata su whatsmeow per l'interazione con WhatsApp.

### Sviluppo Mobile
- [Flutter](https://github.com/flutter/flutter)
- [React Native](https://github.com/facebook/react-native)
- [Ionic](https://github.com/ionic-team/ionic-framework)
- [Android Studio](https://developer.android.com/studio)
- [Firebase](https://firebase.google.com/)

### Automazioni ed Orchestrazione
- [Zapier](https://zapier.com/)
- [n8n](https://github.com/n8n-io/n8n)
- [Airflow](https://github.com/apache/airflow)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- **caveman**: Una skill/plugin che fa sì che un agente AI produca meno token (riduzione di circa il 75%) mantenendo la piena accuratezza tecnica.
- **auto-npm-publish**: Una skill per aiutare a configurare token NPM, GitHub Secrets, mantenere sincronizzato il package.json e controllare eventuali deprecazioni o warning delle GitHub Actions.

## 🔗 4. Ecosistema Wizard-AI: Concatenazione delle Skill (Skill Chaining)

Per far comprendere l'enorme vastità dei progetti, repository e framework integrati all'interno di Wizard-AI, è fondamentale capire **a cosa serve ciascun pezzo** e **come combinarli (concatenarli)** in workflow automatizzati potenti.

Gli agenti AI operano al meglio quando applicano il concetto di "Skill Chaining", ovvero l'uso consecutivo di più strumenti per raggiungere un obiettivo complesso a costo zero di token o tempo.

### Panoramica dei Progetti e Framework Inclusi

1. **Framework di Bootstrap e Avvio (Template Prod-Ready)**
   - **[`express-typescript-starter`](https://github.com/ToniR7/express-typescript-starter)**: Fornisce un backend Node.js robusto con TypeScript, Zod, JWT, Helmet. Usato dalla skill `ai-scaffold express`.
   - **[`nuxt` (v4)](https://github.com/nuxt/nuxt)**: Framework Vue.js full-stack. Usato dalla skill `ai-scaffold nuxt`.
   *➡ A cosa servono? Evitano di sprecare token per chiedere all'AI di farsi scrivere la struttura del progetto, la sicurezza o l'infrastruttura di base da zero.*

2. **Strumenti di Efficienza del Contesto (Token Reduction)**
   - **[`LLMLingua`](https://github.com/microsoft/LLMLingua) (`ai-compress`)**: Riduce il prompt o contesto iniziale fino a 20x.
   - **[`Sqz`](https://github.com/yasker/sqz) (`ai-squeeze`)**: Comprime log del terminale, payload JSON, e grossi file.
   - **[`FlashRank`](https://github.com/PrithivirajDamodaran/FlashRank) (`ai-rerank`)**: Rimuove i paragrafi inutili da grandi documentazioni (RAG).
   - **[`caveman`](../skills/caveman/SKILL.md) (`ai-caveman`)**: Intercetta l'output dell'AI e ne comprime la prolissità del 75%.
   *➡ A cosa servono? Riducono massivamente i costi delle API e rendono l'AI più rapida ed efficiente.*

3. **Intelligenza Semantica e Analisi**
   - **[`Graphify`](https://github.com/AykutSarac/graphify) (`ai-graph`)**: Crea un grafo della conoscenza per esplorare la codebase.
   - **[`Serena`](https://github.com/nathanrooy/serena) (`ai-serena`)**: Esplora e analizza semanticamente il codice sorgente (ricerca LSP).
   - **[`claude-mem`](https://github.com/piero-io/claude-mem) (`ai-mem`)**: Persiste le memorie a lungo termine tra le varie conversazioni AI.
   *➡ A cosa servono? Evitano le "allucinazioni" perché l'AI usa mappe concettuali invece di file grezzi.*

4. **Operatività Avanzata, Testing e Pubblicazione**
   - **[`aisuite`](https://github.com/andrewyng/aisuite) (`ai-compare`)**: Libreria Python unificata (inclusa nel venv). Usata per il Prompt Testing e A/B Benchmark di modelli multipli contemporaneamente.
   - **[`auto-workflow`](../skills/auto-workflow/SKILL.md) / [`auto-release`](../skills/auto-release/SKILL.md)**: Applicano regole formali di Git Flow (isolamento, test, merge, tagging).

---

### Esempi Pratici di "Skill Chaining" (Come concatenare le skill)

**Scenario 1: Nuovo Backend Robusto e Testato**
1. **`scaffold`**: Avvii un'API ("inizializza il progetto"). Wizard-AI clona l' `express-typescript-starter`.
2. **`taste-skill`**: Dai istruzioni su come strutturare l'estetica se aggiungi un frontend.
3. **`auto-debug`**: Chiedi di scrivere la logica. L'AI itera finché il codice non passa i controlli.
4. **`auto-release`**: Quando finito, dici "pubblica la prima versione" e viene generato il tag semantico su Git.

**Scenario 2: Refactoring di un Monolite**
1. **`graphify`**: Chiedi di "analizzare l'architettura" (`ai-graph`). L'AI comprende la gerarchia completa.
2. **`serena`**: Chiedi di trovare "tutti gli usi di questa vecchia API".
3. **`auto-workflow`**: Isoli in un branch il refactoring, mentre **`caveman`** gestisce l'output sintetico senza chiacchiere.

**Scenario 3: A/B Testing dei Prompt (Novità)**
1. Sviluppi un prompt articolato aiutato da **`auto-prompt`**.
2. Usi **`ai-compare`** (basato su `aisuite`) per lanciarlo su GPT-4, Claude 3.5 e Gemini contemporaneamente, vedendo fianco a fianco chi performa meglio.
3. Lo salvi nella memoria semantica con **`ai-mem`** per usarlo in futuro.

> Con Wizard-AI, tu (o il tuo agente AI) siete in grado di padroneggiare tutte le fasi ingegneristiche in maniera concatenata. Questo permette lo scaling estremo dello sviluppo "vibe coding".
