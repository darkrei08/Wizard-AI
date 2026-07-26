# Wiki: Wizard-AI Resources & Skills

> 🇮🇹 [Leggi Italiano](WIKI.it.md)

Central wiki. Tracks core tools, agent skills, external tech.
Check before adding new skills.

> 🤖 **LLM Reference:** See [MODELS_REFERENCE.md](MODELS_REFERENCE.md) for models and Cockpit Tools config.

## 1. 5 Sequenced Workflows (Loop Engineering)
Deterministic pipeline (`0-loop-engine`). Master Orchestrator. 5 Sequenced Loops (`01 → 05`).

1. **`01. loop-1-plan`**: Plan & Spec (`brainstorming` → `grill` → `task.md`).
2. **`02. loop-2-develop`**: Develop & TDD (Branch → Red-Green-Refactor → Subagents).
3. **`03. loop-3-debug`**: Debug & Verify (Bug diagnosis → Code review).
4. **`04. loop-4-refactor`**: Refactor & Optimize (Clean Code → Token Opt).
5. **`05. loop-5-release`**: Release & Learn (Merge → SemVer → Handoff → `MEMORY.md`).

> **`loop-install-bind` Rule:** New `wizard-ai-installer` skills automatically bind to target loop.

### 🚨 Kernel Autoforzatura: Never-Stop & Self-Questioning (Rule 0)
Ensures total autonomy. No user prompts needed.
1. **Never-Stop**: Once loop 01/02 triggers, AI must not stop. Chains `01 → 05` until tests pass and `MEMORY.md` saves.
2. **Self-Questioning Protocol**: Before acting, AI declares:
   ```
   🔄 [AUTONOMOUS LOOP ENGINE] Active Loop: 0X. loop-X-...
   🧠 [SELF-QUESTION] "Which tool (serena, graphify, turbovec, claude-mem) do I use? What is the completion condition for the next loop?"
   ```

## 2. Core CLI Tools
Global CLI wrappers.

- `ai-help`: Command hub.
- `ai-graph`: Create knowledge graph (Graphify).
- `ai-compress`: Compress context 20x (LLMLingua).
- `ai-rerank`: Re-rank passages (FlashRank).
- `ai-squeeze`: Compress CLI/JSON (Sqz).
- `ai-convert`: Convert files to Markdown (MarkItDown).
- `ai-mem`: Persistent semantic memory (claude-mem).
- `ai-usage`: Track Gemini tokens (GeminiUsage).
- `ai-sync-skills`: Synchronize skills.
- `book-to-skill`: Convert PDF to skills.
- `litellm`: LLM API Gateway.

## 3. Agent Skills (150+ Custom)
Exclusive Wizard-AI ecosystem.

### 1. System Core & Routing
- `0-loop-engine`: 11-step PRE/POST pipeline Master Orchestrator.
- `2-wizard-hub`: Skill dashboard.
- `1-auto-router`: Intent-to-skill mapping.
- `wizard-ai-installer`: Install external skills.
- `show-active-skill`: Declares used tools.
- `os-detect`: Pre-installation OS detector.

### 2. Context & Token Optimization
- `0-master-brain`: Master Optimizer.
- `caveman`: Compresses AI output (75%).
- `llmlingua`/`ai-compress`: Massive context compression.
- `headroom`: Proxy compression (95%).
- `sqz`/`ai-squeeze`: Compress terminal/payload.
- `flashrank`/`ai-rerank`: RAG optimization.

### 3. Semantic & Memory
- `graphify`/`ai-graph`: Knowledge graph.
- `auto-graphify`: Trigger graph update.
- `claude-mem`/`ai-mem`: Cross-session memory.
- `storybloq`: CLI session manager.
- `mp-handoff`: Compact conversation log.
- `wiki-brain-skill`: Obsidian-style wiki.
- `serena`: Code LSP search.

### 4. Data Processing
- `markitdown`/`ai-convert`: MD extraction (Office/PDF/Img).
- `book-to-skill`: PDF → Agent Framework.

### 5. Software Engineering & CI/CD
- `workflow-production-cycle`: Git Flow + TDD Master Workflow.
- `engineering-excellence`: Framework-agnostic SDD/TDD standard (architecture, security, a11y, i18n, SEO).
- `wizard-ai-orchestration`: Unified subagent orchestration (replaces shadow-clone, swarm-manager, goodcode-orchestrator, cavecrew).
- `auto-branch`: Branch management.
- `auto-release`: Semantic versioning (semver).
- `auto-trigger-release`: Auto-publish post task.
- `auto-npm-publish`: NPM sync/publish.
- `auto-debug`: Pre-merge auto-correction.
- `cybersecurity`: Anthropic security guidelines.
- `spec-kit`: Specification-Driven Development (SDD).
- `strix`: Autonomous penetration testing.
- `system-prompts-leaks`: Leaked system prompts corpus (ChatGPT/Claude/Gemini/Grok) — reference for prompt-injection defense and system prompt design.

### 6. Frontend, UI/UX, Design
- `taste-skill`: Premium anti-slop layouts.
- `hallmark`: Audit/extract design system.
- `awesome-design`: Brand styles (Vercel, Cursor, etc.).
- `infographic`: Declarative charts.
- `design-md-spec`: `DESIGN.md` format.
- `kinetics-ui`: Spring-physics micro-interactions (ckissi/kinetics).
- `mengto-skills`: MengTo UI/UX design workflow pack (70+).
- `stitch-*`: Google Stitch integration suite. Generates design, React, React Native, mockups.

### 7. Scaffolding
- `scaffold`/`ai-scaffold`: Prod-Ready templates (Express+TS, Nuxt).

### 8. Orchestration & Prompting
- `litellm`: Proxy gateway (100+ models).
- `auto-prompt`: Rewrites prompt to XML.
- `gemini-usage`: Token monitor.
- `ecc`: Sub-agent orchestrator.
- `rtk` (`ai-rtk`): Rust Token Killer (CLI output compression 60-90%).
- `5-goodcode-orchestrator`: Multi-agent audit (or `wizard-ai-orchestration` for unified dispatch).
- `ai-loop-sentinel`: 5 Loop interceptor.
- `ai-skill-doctor`: Skill auto-healing daemon.

## 4. Built-in & External Tech
Implemented as Native AI Skills in `skills/`.
Examples:
- **Identity**: OpenHuman, QwenPaw, Mem0, Syke.
- **Efficiency**: FlashRank, MarkItDown, Serena, Spec-Kit.
- **Audio/Video**: Voicebox, OmniVoice-Studio, Hyperframes.
- **Web Frameworks**: Next.js, Vue, React, Nuxt, Astro.
- **DB/Backend**: PocketBase, TrailBase, Kafka, Zvec.
- **Mobile**: Flutter, React Native, Firebase.

## 5. Skill Chaining (Examples)
Automated skill chaining. Zero wasted tokens.
- **New Backend**: `scaffold` → `taste-skill` → `auto-debug` → `auto-release`.
- **Refactoring**: `graphify` → `serena` → `workflow-production-cycle` + `caveman`.
- **A/B Test Prompts**: `auto-prompt` → `ai-compare` → `ai-mem`.



## 🛠️ Cockpit Tools & Proxy Rotator Quick Commands

```bash
# Menu Interattivo (Account + Modelli LLM):
wz-ai cockpit

# Cambio Account Diretto:
wz-ai cockpit switch <email|numero>

# Cambio Modello Predefinito:
wz-ai cockpit model <nome-modello>

# Auto-Rotazione Account su Quota Più Alta:
wz-ai cockpit auto-rotate

# Stato Quote e Account:
wz-ai cockpit status
```


---

## 📚 Included Skills & Repositories Registry

All tools and skills managed by Wizard-AI are open source. Here is the complete list of managed repositories:

### 🤖 Autonomous Agent Frameworks & Runtimes

- **[earendil-pi](https://github.com/earendil-works/pi.git)**: Pi Agent Framework
- **[ecc](https://github.com/affaan-m/ECC.git)**: Enhanced Claude Code
- **[caveman](https://github.com/JuliusBrussee/caveman.git)**: Caveman behavioral compression
- **[goodcode](https://github.com/SpinaBuilds/goodcode.git)**: Multi-agent orchestration
- **[openhuman](https://github.com/tinyhumansai/openhuman.git)**: OpenHuman agent harness
- **[qwenpaw](https://github.com/agentscope-ai/QwenPaw.git)**: QwenPaw agent scope
- **[syke](https://github.com/saxenauts/syke.git)**: Syke autonomous agent
- **[mem0](https://github.com/mem0ai/mem0.git)**: Mem0 persistent memory
- **[personal-graph](https://github.com/Technoculture/personal-graph.git)**: Personal knowledge graph
- **[pi-config](https://github.com/vekexasia/pi-config.git)**: Vekexasia pi agent configuration
- **[pi-cockpit-tools](https://github.com/darkrei08/Wizard-AI.git)**: Cockpit Tools multi-account & rotator extension for Pi

### ⚡ CLI Tools & Context Squeezers

- **[sqz](https://github.com/ojuschugh1/sqz.git)**: Token compression CLI
- **[llmlingua](https://github.com/microsoft/LLMLingua.git)**: Prompt compression (Microsoft)
- **[flashrank](https://github.com/PrithivirajDamodaran/FlashRank.git)**: Document re-ranking
- **[serena](https://github.com/oraios/serena.git)**: Semantic code intelligence
- **[graphify](https://github.com/safishamsi/graphify.git)**: Knowledge graph builder
- **[claude-mem](https://github.com/thedotmack/claude-mem.git)**: Persistent LLM memory
- **[geminiusage](https://github.com/rmedranollamas/geminiusage.git)**: Gemini token tracker
- **[litellm](https://github.com/BerriAI/litellm.git)**: Universal LLM proxy
- **[markitdown](https://github.com/microsoft/markitdown.git)**: File-to-Markdown converter
- **[mermaid-cli](https://github.com/mermaid-js/mermaid-cli.git)**: Mermaid diagram CLI
- **[spec-kit](https://github.com/github/spec-kit.git)**: Spec-driven development
- **[cli-anything](https://github.com/HKUDS/CLI-Anything.git)**: Multi-modal CLI
- **[cli-printing-press](https://github.com/mvanhorn/cli-printing-press.git)**: CLI printing press
- **[repodocs](https://github.com/aryrabelo/repodocs.git)**: Source-cited AI wiki generator
- **[pi-cockpit-proxy-setup](https://github.com/darkrei08/Wizard-AI.git)**: Interactive installer for Pi & Cockpit Tools proxy

### 🧩 Native LLM Prompt Skills & Packs

- **[antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills.git)**: Antigravity skill pack
- **[awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills.git)**: Community skill collection
- **[cybersecurity-skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills.git)**: 754 cybersecurity skills
- **[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks.git)**: Leaked system prompts corpus (ChatGPT, Claude, Gemini, Grok) for prompt security research
- **[engineering-excellence](https://github.com/micio86dev/Engineering-Excellence.git)**: Framework-agnostic SDD/TDD engineering standard
- **[stitch-skills](https://github.com/google-labs-code/stitch-skills.git)**: Google Stitch design skills
- **[design.md](https://github.com/google-labs-code/design.md.git)**: Design system spec
- **[book-to-skill](https://github.com/virgiliojr94/book-to-skill.git)**: Book-to-skill converter
- **[wiki-brain-skill](https://github.com/tenfoldmarc/wiki-brain-skill.git)**: Wiki knowledge base
- **[impeccable](https://github.com/pbakaus/impeccable.git)**: Impeccable standards
- **[last30days-skill](https://github.com/mvanhorn/last30days-skill.git)**: Last 30 days research
- **[claude-blog](https://github.com/AgriciDaniel/claude-blog.git)**: AI blog writing
- **[claude-seo](https://github.com/AgriciDaniel/claude-seo.git)**: SEO analysis plugin

### 🧠 Memory, Context & Knowledge Graph

- **[engram](https://github.com/Gentleman-Programming/engram.git)**: SQLite-backed agent memory
- **[turbovec](https://github.com/RyanCodrai/turbovec.git)**: TurboVec vector DB
- **[zvec](https://github.com/alibaba/zvec.git)**: ZVec vector DB
- **[headroom](https://github.com/chopratejas/headroom.git)**: Headroom context proxy

### 🎨 Frontend Frameworks & UI Toolkits

- **[aionui](https://github.com/iOfficeAI/AionUi.git)**: AionUI desktop harness
- **[phantom-ui](https://github.com/Aejkatappaja/phantom-ui.git)**: Phantom UI components
- **[mengto-skills](https://github.com/MengTo/Skills.git)**: MengTo UI/UX design skills
- **[infographic](https://github.com/antvis/Infographic.git)**: Infographic generator
- **[kinetics-ui](https://github.com/ckissi/kinetics.git)**: Spring-physics micro-interactions
- **[easy-vibe](https://github.com/datawhalechina/easy-vibe.git)**: Easy Vibe multi-modal

### 🖥️ Graphical Apps, Desktop & Media Services

- **[voicebox](https://github.com/jamiepine/voicebox.git)**: Voicebox audio processor
- **[omnivoice-studio](https://github.com/debpalash/OmniVoice-Studio.git)**: OmniVoice Studio
- **[supertonic](https://github.com/supertone-inc/supertonic.git)**: Supertonic audio tools
- **[hyperframes](https://github.com/heygen-com/hyperframes.git)**: HeyGen video generation
- **[wslens](https://github.com/vekexasia/wslens.git)**: WSLens GUI backend
- **[pocketbase](https://github.com/pocketbase/pocketbase.git)**: PocketBase realtime DB
- **[trailbase](https://github.com/trailbaseio/trailbase.git)**: TrailBase realtime DB
- **[go-whatsapp](https://github.com/aldinokemal/go-whatsapp-web-multidevice.git)**: WhatsApp REST bridge
- **[wuzapi](https://github.com/asternic/wuzapi.git)**: WuzAPI WhatsApp REST
- **[openwa](https://github.com/rmyndharis/OpenWA.git)**: OpenWA WebSocket engine
- **[cockpit-tools](https://github.com/jlcodes99/cockpit-tools.git)**: Cockpit local proxy

### 🏗️ Starter Templates & Benchmarks

- **[express-typescript-starter](https://github.com/ToniR7/express-typescript-starter.git)**: Express+TS starter
- **[aisuite](https://github.com/andrewyng/aisuite.git)**: AI benchmark framework

