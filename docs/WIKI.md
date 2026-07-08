# Wizard-AI Resources & Installed Skills Wiki

> 🇮🇹 [Leggi questa Wiki in Italiano](WIKI.it.md)

This is the central wiki tracking all core Wizard-AI tools, installed AI agent skills, and external reference technologies. 
**Before requesting a new skill integration**, check this list to verify if a similar tool is already installed or tracked.

---

## 🧙‍♂️ 1. Wizard-AI Core CLI Tools

These are the primary command-line wrappers installed globally on your system by Wizard-AI.

- **`ai-help`**: Central hub / command directory.
- **`ai-graph`**: Build knowledge graphs from code/docs (via Graphify).
- **`ai-compress`**: Compress prompts/context up to 20x (via LLMLingua).
- **`ai-rerank`**: Re-rank passages by relevance (via FlashRank).
- **`ai-squeeze`**: Compress CLI output / JSON / logs (via Sqz).
- **`ai-convert`**: Convert any file to clean Markdown (via MarkItDown).
- **`ai-mem`**: Store and search persistent semantic memory (via claude-mem).
- **`ai-usage`**: Track Gemini token consumption (via GeminiUsage).
- **`ai-sync-skills`**: Skill synchronizer to propagate skills across agents.
- **`book-to-skill`**: Convert books/docs into AI skills.
- **`litellm`**: Unified LLM API gateway.

---

## 🔌 2. Installed Agent Skills

The ecosystem features **over 150 custom skills and frameworks** exclusive to Wizard-AI, in addition to the base plugins provided by agents (e.g. Antigravity, Claude Code).
Below is the rigorous categorization of the arsenal at your disposal, which has been physically restructured into distinct directories (`core`, `frontend`, `backend`, `devops`, `workflows`, etc.) for maximum efficiency:

### 🔮 The 150+ Custom Skills (Wizard-AI Core)

#### 1. System Core & Routing (Foundations)
- **`wizard-ai-hub`**: Skill discovery and dashboard.
- **`auto-router`**: Intelligent mapping of user colloquial intents to technical skills.
- **`wizard-ai-installer`**: Autonomous installer for new external skills.
- **`show-active-skill`**: Forces the AI to declare which tools and wrappers it is using.
- **`os-detect`**: Operating system detector (Linux, macOS, Windows) pre-installation.

#### 2. Context & Token Optimization (Resource Saving)
- **`caveman`**: Plugin/skill that compresses AI output by 75% maintaining accuracy.
- **`llmlingua` / `ai-compress`**: Ultra-high compression of massive contexts.
- **`headroom`**: Advanced context compression and API proxy layer (up to 95% reduction).
- **`sqz` / `ai-squeeze`**: Compression of terminal output, payloads, and JSON.
- **`flashrank` / `ai-rerank`**: Surgical re-ranking of document contexts (RAG).
- **`lean-ctx`**: Intelligent AI context isolation and control.
- **`auto-optimize`**: Orchestrator that automatically applies compressors based on need.

#### 3. Semantic Intelligence & Memory (Knowledge)
- **`graphify` / `ai-graph`**: Dynamic knowledge graph builder.
- **`auto-graphify`**: Automatic trigger to update the map.
- **`claude-mem` / `ai-mem`**: Persistent and semantic cross-session memory.
- **`storybloq` / `ai-storybloq`**: CLI session manager (snapshots, tickets, state memory).
- **`handoff` / `ai-handoff`**: Conversation log compactor for agent-to-agent handoffs.
- **`wiki-brain-skill`**: Obsidian-style knowledge base integration.
- **`serena`**: Deep semantic search and LSP inside the code.

#### 4. Data & Document Processing (Ingestion)
- **`markitdown` / `ai-convert`**: Clean markdown extraction from Office files, PDF, images.
- **`book-to-skill`**: Converts entire PDF manuals or books into agent-assimilable frameworks.

#### 5. Software Engineering & CI/CD (Workflow)
- **`auto-workflow`**: Rigorous application of Git Flow merged with the Superpowers methodology (isolation, TDD, testing, merging).
- **`superpowers`**: Package of 11 advanced skills for Subagent-Driven Development (e.g. `brainstorming`, `writing-plans`, `subagent-driven-development`, `test-driven-development`, `systematic-debugging`). Includes the `ai-superpowers` CLI wrapper.
- **`auto-branch`**: Autonomous management and strict branch conventions.
- **`auto-release` / `ai-release`**: Semantic versioning release (semver) and changelog.
- **`auto-trigger-release`**: Automatic publishing trigger at the end of a task.
- **`auto-npm-publish`**: NPM automated configuration, sync and management.
- **`auto-debug`**: Code analyzer and auto-correction before proceeding to merge.
- **`cybersecurity`**: Enforcement of secure-by-design guidelines using Anthropic's 762+ security skills.
- **`spec-kit`**: Toolkit for specification-driven development (TDD/SDD).
- **`strix`**: Autonomous AI hackers that find and fix your app's vulnerabilities.

#### 6. Frontend, UI/UX & Design (Design System)
- **`taste-skill`**: "Anti-slop" framework to force ultra-premium layouts and spacing.
- **`awesome-design`**: Injection of brand-specific styles and languages (Vercel, Cursor, Claude).
- **`infographic`**: AI-powered declarative infographic and chart generator.
- **`design-md-spec`**: Format specification and validation tool for the `DESIGN.md` standard.
- **`stitch-code-to-design`**: Chained migration of frontend codebases to Stitch projects.
- **`stitch-extract-design-md`**: Extract `DESIGN.md` design system directly from frontend source files.
- **`stitch-extract-static-html`**: Take static HTML snapshots of running local web applications.
- **`stitch-generate-design`**: Generate new screens or design variations from text/images in Stitch.
- **`stitch-manage-design-system`**: Upload `DESIGN.md` systems and themes to Stitch projects.
- **`stitch-upload-to-stitch`**: Upload local HTML, images, and mockups to Stitch.
- **`stitch-react-components`**: Convert Stitch designs to modular, validated React/TypeScript components.
- **`stitch-react-native`**: Compile Stitch HTML/CSS mockups into styled React Native components.
- **`stitch-remotion`**: Generate walkthrough video animations of Stitch screens using Remotion.
- **`stitch-shadcn-ui`**: Expert integration and scaffolding of components using shadcn/ui.
- **`stitch-design-md`**: Analyze Stitch projects and write comprehensive `DESIGN.md` specifications.
- **`stitch-enhance-prompt`**: Transform vague UI descriptions into Stitch-optimized prompts.
- **`stitch-loop`**: Chained design-to-code iterative web page building loops.
- **`stitch-taste-design`**: Generate design systems enforcing premium aesthetic spacing and colors.

#### 7. Scaffolding & Templates (Project Start)
- **`scaffold` / `ai-scaffold`**: Instant generator of Prod-Ready projects (e.g. Express+TS, Nuxt v4).

#### 8. LLM Orchestration & Prompting (AI Control)
- **`litellm`**: Local Proxy API Gateway to test and rotate over 100+ models.
- **`auto-prompt`**: Middleware intercepting messy prompts and structuring them in perfect XML.
- **`gemini-usage`**: Live monitor and tracker of API costs and budgets.
- **`ecc`**: (Enhanced Claude Code) Framework to orchestrate specialized sub-agents.
- **`rtk`**: Native AI toolkit for extensions.
- **`goodcode`**: Host-agnostic exhaustive multi-agent orchestration for audits, reviews, research, and deep code production.

---

### 🌐 Base Agent Plugins (Built-in)
- **a11y-debugging**: Web accessibility debugging (ARAI, focus, contrast) via Chrome DevTools.
- **chrome-devtools**: Browser automation, debugging, network inspection, and performance analysis.
- **chrome-extensions**: Building and debugging extensions for Google Chrome (Manifest V3).
- **debug-optimize-lcp**: Optimizing Largest Contentful Paint (LCP) and Core Web Vitals.
- **memory-leak-debugging**: Memory leak diagnostics for JavaScript/Node.js applications.
- **modern-web-guidance**: Search for modern web development best practices (UI, performance, APIs).
- **troubleshooting**: Troubleshooting browser connection issues.

### 🔥 Firebase Plugin
- **firebase-ai-logic-basics**: Integration of Firebase AI Logic (Gemini API) in web apps.
- **firebase-app-hosting-basics**: Deploying web apps (Next.js/Angular) using Firebase App Hosting.
- **firebase-auth-basics**: Configuring Firebase Authentication (user and access management).
- **firebase-basics**: Basic configuration of Firebase projects via CLI.
- **firebase-crashlytics**: Implementation and analysis of crashes via Firebase Crashlytics.
- **firebase-data-connect**: Building Firebase backends based on PostgreSQL.
- **firebase-firestore**: Cloud Firestore database configuration, queries, and management.
- **firebase-hosting-basics**: Deploying to classic Firebase Hosting (static sites/SPAs).
- **firebase-remote-config-basics**: Managing remote configurations and feature flags.
- **firebase-security-rules-auditor**: Security rules auditing and validation for Firestore.
- **xcode-project-setup**: Secure setup for iOS/Xcode projects (integrating dependencies like Firebase).

### 📱 Mobile Development (Android Plugin)
- **android-cli**: Automation of Android tasks (project creation, SDK management, diagnostics).

### 🧬 Biological & Science Research (Science Plugin)
- **alphafold-database-fetch-and-analyze**: Analyzing protein structures predicted by AlphaFold using UniProt ID.
- **alphagenome-single-variant-analysis**: Genetic variant and gene expression analysis (AlphaGenome).
- **chembl-database**: Searching the ChEMBL database (bioactive molecules, targets, drugs).
- **clinical-trials-database**: Searching ClinicalTrials.gov for clinical trials.
- **clinvar-database**: Clinical and pathogenicity analysis of human genomic variants.
- **dbsnp-database**: Searching and mapping short genetic variants (SNPs) on NCBI.
- **embl-ebi-ols**: Searching the EMBL-EBI Ontology Lookup Service (OLS).
- **encode-ccres-database**: Searching ENCODE cis-regulatory elements of the genome.
- **ensembl-database**: Mapping IDs, extracting genomic sequences, and variant effect predictions.
- **foldseek-structural-search**: 3D structural search for proteins against databases.
- **gnomad-database**: Querying allele frequencies and variants from gnomAD.
- **gtex-database**: Extracting tissue-specific RNA expression data from GTEx.
- **human-protein-atlas-database**: Protein localization and tissue expression (HPA).
- **interpro-database**: Identifying protein domains, families, and sites.
- **jaspar-database**: Querying transcription factor binding profiles (TF).
- **literature-search-arxiv**: Searching scientific papers and preprints on arXiv.
- **literature-search-biorxiv**: Searching and downloading preprints from bioRxiv/medRxiv.
- **literature-search-europepmc**: Searching Europe PMC for biomedical literature.
- **literature-search-openalex**: Querying the OpenAlex scholarly database.
- **ncbi-sequence-fetch**: Fetching protein and nucleotide sequences from NCBI databases.
- **openfda-database**: Searching drugs, devices, and recall data (openFDA API).
- **opentargets-database**: Identifying therapeutic targets from Open Targets.
- **pdb-database**: Searching and downloading 3D biomolecular structures (Protein Data Bank).
- **protein-sequence-msa**: Multiple sequence alignment (MSA) using Clustal Omega.
- **protein-sequence-similarity-search**: Homology search for protein sequences (MMseqs2/BLAST).
- **pubchem-database**: Searching chemical compound data on PubChem.
- **pubmed-database**: Searching and downloading medical papers and clinical trials from PubMed.
- **pymol**: 3D visual rendering and analysis of protein structures.
- **quickgo-database**: Mapping genes to biological processes using QuickGO/ECO.
- **reactome-database**: Pathway analysis and associations on the Reactome database.
- **string-database**: Protein-protein interaction network analysis (PPI) from STRING.
- **ucsc-conservation-and-tfbs**: Search genomic conservation and evolution (UCSC).
- **unibind-database**: Querying transcription factor binding sites (TF-DNA) from UniBind.
- **uniprot-database**: Searching protein metadata, taxonomy, and functions in UniProt.

### 🛠️ Utilities and Core Competencies
- **google-antigravity-sdk**: Design and implementation of agents based on the Antigravity SDK (AGY).
- **session-context-compressor**: Synthesis and compression of session contexts to facilitate future resumption.
- **workflow-skill-creator**: Transforming complex user workflows into reusable skills.
- **science-skills-common**: Shared logical core (HTTP client & rate limiter) for scientific APIs.
- **uv**: Utility for installation and verification of the Python package manager `uv`.
- **wizard-ai-installer**: Meta-skill to autonomously install, integrate, and configure new skills, tools, and repositories into the Wizard-AI ecosystem.

---

## 📚 3. External Resources & Technologies

> **🚀 UPDATE v0.19.0**: All technologies, languages, automations, and frameworks listed in this section have been formally implemented as **Native AI Skills**! You can find their agent directives under the `skills/` directory (e.g. `skills/react`, `skills/kafka`, `skills/pocketbase`).

Reference list of tools, repositories, and frameworks relevant to AI and development.

### Agents, Memory & Personal Profile (Digital Identity)
- [OpenHuman](https://github.com/tinyhumansai/openhuman) - Personal data platform, Obsidian integration, and desktop AI harness.
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw) - Personal multi-channel and extendable AI assistant for local deployment.
- [syke](https://github.com/saxenauts/syke) - Long-term memory agent based on the Persona model.
- [Mem0](https://github.com/mem0ai/mem0) - Smart, personalized long-term memory layer for AI agents and assistants.
- [personal-graph](https://github.com/Technoculture/personal-graph) - Lightweight personal knowledge graphs for LLMs (Python).
- [Graphify](https://github.com/safishamsi/graphify) - Transforming inputs, code, and notes into knowledge graphs for LLMs.
- [LLMWIKI](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) - Karpathy's gist on using LLMs for compounding personal wikis (Obsidian).
- [Portfolio & Tech Example](https://github.com/micio86dev/portfolio) - Identity seed for LLM training or user context retrieval.

### Developer Tools, Optimization & Token Efficiency
- [GeminiUsage](https://github.com/rmedranollamas/geminiusage) - CLI tool to track token and context consumption in terminal sessions.
- [LiteLLM](https://github.com/BerriAI/litellm) - AI Gateway and unified SDK interfacing with 100+ LLM providers with cost tracking.
- [LLMLingua](https://github.com/microsoft/LLMLingua) - Prompt compression library to reduce tokens by up to 20x with minimal performance loss.
- [FlashRank](https://github.com/PrithivirajDamodaran/FlashRank) - Ultra-fast, CPU-optimized reranker for RAG context optimization.
- [sqz](https://github.com/ojuschugh1/sqz) - CLI output, JSON, and log context compressor for token-efficient agent sessions.
- [MarkItDown](https://github.com/microsoft/markitdown) - Python utility/library to convert various formats to Markdown for LLMs and RAG.
- [Mermaid CLI](https://github.com/mermaid-js/mermaid-cli) - Command-line tool to generate images and vector graphics from Mermaid markdown files.
- [Claude-Mem](https://github.com/thedotmack/claude-mem) - Long-term persistent memory and semantic indexing system for LLMs.
- [wiki-brain-skill](https://github.com/tenfoldmarc/wiki-brain-skill) - Claude Code skill implementing Karpathy's LLM Wiki pattern using Graphify.
- [ECC](https://github.com/affaan-m/ECC) - Optimization framework for AI agents (commands, skills, hooks, and MCP).
- [Serena](https://github.com/oraios/serena) - LSP-based semantic code search and MCP server for programming agents.
- [Spec-Kit](https://github.com/github/spec-kit) - Specification-driven development (SDD) toolkit for AI agents.
- [Antigravity Awesome Skills](https://github.com/sickn33/antigravity-awesome-skills/releases/tag/v11.2.0) - Ready-to-use skill collection for AI agents.
- [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) - System-level best practices and skill collection.
- [CLI-Anything](https://github.com/HKUDS/CLI-Anything) - Framework to expose arbitrary software as a CLI for AI agents.
- [CLI-Printing-Press](https://github.com/mvanhorn/cli-printing-press) - Compact agent-native interfaces to minimize token footprint.
- [Book-to-Skill](https://github.com/virgiliojr94/book-to-skill/tree/master) - Convert documents and books into AI skills.
- [Impeccable](https://github.com/pbakaus/impeccable) - High-fidelity UI/UX testing and visual regression for agents.
- [Cockpit Tools](https://github.com/jlcodes99/cockpit-tools) - Local proxy that bypasses free API limits (e.g. Gemini Free) by channeling massive requests (like ai-graph semantic extraction) through the monthly IDE subscription. Native cross-platform integration.

### Audio, Video & Emotion (Multimodal)
- [Voicebox](https://github.com/jamiepine/voicebox) - Multi-engine offline speech processing and synthesis.
- [Easy-Vibe](https://github.com/datawhalechina/easy-vibe) - AI-powered video and image enhancement (vibe coding curriculum).
- [OmniVoice-Studio](https://github.com/debpalash/OmniVoice-Studio) - Professional voice cloning and production (offline).
- [Supertonic](https://github.com/supertone-inc/supertonic) - On-device audio processing and enhancement.
- [Hyperframes](https://github.com/heygen-com/hyperframes) - HTML-based UI rendering, frame management, and video generation.

### Languages & Runtimes
- [Python](https://github.com/python/cpython)
- [Node.js](https://nodejs.org/)
- [Bun](https://github.com/oven-sh/bun)
- [Deno](https://github.com/denoland/deno)
- [QuickJS](https://github.com/quickjs-ng/quickjs)

### Frontend Frameworks & UI
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
- [AionUi](https://github.com/iOfficeAI/AionUi/tree/main) - UI component library.
- [phantom-ui](https://github.com/Aejkatappaja/phantom-ui) - Framework-agnostic skeleton loader (Web Components).
- [PageSpeed Insights](https://pagespeed.web.dev/) - Web performance analysis tool.

### Backend Frameworks, CMS & Databases
- [Laravel](https://github.com/laravel/laravel)
- [WordPress](https://github.com/WordPress/WordPress)
- [MySQL](https://github.com/mysql/mysql-server)
- [MongoDB](https://github.com/mongodb/mongo)
- [Kafka](https://github.com/apache/kafka)
- [PocketBase](https://github.com/pocketbase/pocketbase) - Single file backend with realtime DB, auth, and storage.
- [TrailBase](https://github.com/trailbaseio/trailbase) - Rust-based realtime server and DB using SQLite.
- [Pi.dev](https://pi.dev) - Serverless integration and development platform.
- [Zvec](https://github.com/alibaba/zvec) - The "SQLite" alternative for vector databases. In-process DB optimized for local RAG.
- [TurboVec](https://github.com/RyanCodrai/turbovec) - Implementation of Google TurboQuant. High performance vector quantization and indexing (up to 16x compression).

### APIs & Messaging (WhatsApp Integration)
- [go-whatsapp-web-multidevice](https://github.com/aldinokemal/go-whatsapp-web-multidevice) - Multi-device WhatsApp bridge.
- [Wuzapi](https://github.com/asternic/wuzapi) - REST API based on whatsmeow for WhatsApp interaction.

### Mobile Development
- [Flutter](https://github.com/flutter/flutter)
- [React Native](https://github.com/facebook/react-native)
- [Ionic](https://github.com/ionic-team/ionic-framework)
- [Android Studio](https://developer.android.com/studio)
- [Firebase](https://firebase.google.com/)

### Automation & Orchestration
- [Zapier](https://zapier.com/)
- [n8n](https://github.com/n8n-io/n8n)
- [Airflow](https://github.com/apache/airflow)
- [AWS Lambda](https://aws.amazon.com/lambda/)
- **caveman**: A skill/plugin that makes an AI agent output fewer tokens (~75% reduction) while keeping full technical accuracy.
- **auto-npm-publish**: A skill to help users configure NPM tokens, GitHub Secrets, sync package.json versions, and proactively check for GitHub action deprecations.

## 🔗 4. Wizard-AI Ecosystem: Skill Chaining

To understand the immense scale of the integrated projects, repositories, and frameworks inside Wizard-AI, it's critical to know **what each piece does** and **how to combine (chain) them** into powerful automated workflows.

AI agents operate at their best when applying "Skill Chaining", i.e., the consecutive use of multiple tools to achieve a complex goal with zero extra token cost or time.

### Overview of Included Projects & Frameworks

1. **Bootstrap & Starter Frameworks (Prod-Ready Templates)**
   - **[`express-typescript-starter`](https://github.com/ToniR7/express-typescript-starter)**: Provides a robust Node.js backend with TypeScript, Zod, JWT, Helmet. Used by the `ai-scaffold express` skill.
   - **[`nuxt` (v4)](https://github.com/nuxt/nuxt)**: Full-stack Vue.js framework. Used by the `ai-scaffold nuxt` skill.
   *➡ What are they for? They prevent wasting tokens asking the AI to write boilerplate project structure, security, or core infrastructure from scratch.*

2. **Context Efficiency Tools (Token Reduction)**
   - **[`LLMLingua`](https://github.com/microsoft/LLMLingua) (`ai-compress`)**: Reduces initial prompt or context by up to 20x.
   - **[`Sqz`](https://github.com/yasker/sqz) (`ai-squeeze`)**: Compresses terminal logs, JSON payloads, and large files.
   - **[`FlashRank`](https://github.com/PrithivirajDamodaran/FlashRank) (`ai-rerank`)**: Removes useless paragraphs from large documentations (RAG).
   - **[`caveman`](../skills/caveman/SKILL.md) (`ai-caveman`)**: Intercepts AI output and compresses verbosity by 75%.
   *➡ What are they for? They massively reduce API costs and make the AI faster and more efficient.*

3. **Semantic Intelligence & Analysis**
   - **[`Graphify`](https://github.com/AykutSarac/graphify) (`ai-graph`)**: Creates a knowledge graph to explore the codebase.
   - **[`Serena`](https://github.com/nathanrooy/serena) (`ai-serena`)**: Explores and semantically analyzes source code (LSP search).
   - **[`claude-mem`](https://github.com/piero-io/claude-mem) (`ai-mem`)**: Persists long-term memories across different AI conversations.
   *➡ What are they for? They prevent "hallucinations" because the AI uses conceptual maps instead of raw files.*

4. **Advanced Operations, Testing & Publishing**
   - **[`aisuite`](https://github.com/andrewyng/aisuite) (`ai-compare`)**: Unified Python library (included in venv). Used for Prompt Testing and A/B Benchmarking of multiple models simultaneously.
   - **[`auto-workflow`](../skills/auto-workflow/SKILL.md) / [`auto-release`](../skills/auto-release/SKILL.md)**: Enforce formal Git Flow rules (isolation, testing, merging, tagging).

---

### Practical Examples of "Skill Chaining"

**Scenario 1: Robust and Tested New Backend**
1. **`scaffold`**: You start an API ("initialize project"). Wizard-AI clones the `express-typescript-starter`.
2. **`taste-skill`**: You give UI structuring instructions if you add a frontend.
3. **`auto-debug`**: You ask it to write logic. The AI iterates until the code passes checks.
4. **`auto-release`**: When done, you say "publish version 1.0" and a semantic Git tag is generated.

**Scenario 2: Refactoring a Monolith**
1. **`graphify`**: Ask to "analyze architecture" (`ai-graph`). The AI understands the full hierarchy.
2. **`serena`**: Ask to find "all usages of this old API".
3. **`auto-workflow`**: Isolate the refactor in a branch, while **`caveman`** manages concise output without chatter.

**Scenario 3: Prompt A/B Testing (New)**
1. You develop a complex prompt aided by **`auto-prompt`**.
2. You use **`ai-compare`** (powered by `aisuite`) to run it on GPT-4, Claude 3.5, and Gemini simultaneously, seeing side-by-side who performs best.
3. You save the best prompt in semantic memory with **`ai-mem`** for future use.

> With Wizard-AI, you (or your AI agent) can master all engineering phases in a chained manner. This enables extreme scaling of "vibe coding" development.
- **claude-blog**: AI Blog Writing & SEO Optimization Skill for Claude Code.
- **claude-seo**: SEO Analysis plugin for Claude Code.
- **workflow-seo-research**: Meta-skill per analisi SEO e Inbound Marketing.
