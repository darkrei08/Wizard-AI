# Wiki: Risorse e Skill Wizard-AI

> 🇬🇧 [Read English](WIKI.md)

Wiki centrale. Traccia tool core Wizard-AI, skill agenti, tecnologie esterne.
Controlla prima di aggiungere nuove skill.

## 1. 5 Workflow Sequenziali (Loop Engineering)
Pipeline deterministica (`0-loop-engine`). Sviluppo/refactoring segue 5 Loop (`01 → 05`).

1. **`01. loop-1-plan`**: Pianificazione & Spec (`brainstorming` → `grill` → `task.md`).
2. **`02. loop-2-develop`**: Sviluppo & TDD (Branch → Red-Green-Refactor → Subagent).
3. **`03. loop-3-debug`**: Debug & Verifica (Diagnosi bug → Code review).
4. **`04. loop-4-refactor`**: Refactoring & Ottimizzazione (Clean Code → Token Opt).
5. **`05. loop-5-release`**: Rilascio & Memoria (Merge → SemVer → Handoff → `MEMORY.md`).

> **Regola `loop-install-bind`:** Nuove skill `wizard-ai-installer` si agganciano automaticamente al Loop Target appropriato.

### 🚨 Autoforzatura Kernel: Never-Stop & Self-Questioning (Regola 0)
Garantisce autonomia totale. Nessun prompt utente aggiuntivo.
1. **Never-Stop**: Innescato loop 01 o 02, agente non si ferma. Prosegue `01 → 05` finché test verdi e `MEMORY.md` salvata.
2. **Protocollo Self-Questioning**: Prima di agire, agente dichiara:
   ```
   🔄 [AUTONOMOUS LOOP ENGINE] Loop Attivo: 0X. loop-X-...
   🧠 [SELF-QUESTION] "Quale strada sviluppo/tool semantico (serena, graphify, turbovec, claude-mem) devo usare ora? Qual è condizione esatta per passare al loop successivo?"
   ```

## 2. Strumenti CLI Core
Wrapper CLI globali.

- `ai-help`: Hub comandi.
- `ai-graph`: Crea knowledge graph (Graphify).
- `ai-compress`: Comprime contesto 20x (LLMLingua).
- `ai-rerank`: Riordina passaggi RAG (FlashRank).
- `ai-squeeze`: Comprime output CLI/JSON (Sqz).
- `ai-convert`: Converte file in Markdown (MarkItDown).
- `ai-mem`: Salva memoria semantica persistente (claude-mem).
- `ai-usage`: Traccia uso token Gemini (GeminiUsage).
- `ai-sync-skills`: Sincronizza skill.
- `book-to-skill`: Converte PDF in skill.
- `litellm`: Gateway API LLM.

## 3. Skill Agenti (48 Custom)
Ecosistema esclusivo Wizard-AI.

### 1. System Core & Routing
- `0-loop-engine`: Orchestratore Master pipeline PRE/POST a 11 step.
- `2-wizard-hub`: Dashboard skill.
- `1-auto-router`: Mappatura intenti utente → skill.
- `wizard-ai-installer`: Installa skill esterne.
- `show-active-skill`: Dichiara tool in uso.
- `os-detect`: Rileva OS pre-installazione.

### 2. Context & Token Optimization
- `0-master-brain`: Ottimizzatore Master.
- `caveman`: Comprime output AI (75%).
- `llmlingua`/`ai-compress`: Compressione contesti massivi.
- `headroom`: Proxy compressione (95%).
- `sqz`/`ai-squeeze`: Comprime terminale/payload.
- `flashrank`/`ai-rerank`: Ottimizzazione RAG.
- `lean-ctx`: Isolamento contesto AI.
- `0-master-brain`: Fonde auto-optimize, llmlingua, lean-ctx, sqz, ponytail, caveman, headroom.

### 3. Semantica & Memoria
- `graphify`/`ai-graph`: Knowledge graph.
- `auto-graphify`: Trigger update grafo.
- `claude-mem`/`ai-mem`: Memoria cross-sessione.
- `storybloq`: Gestore sessioni CLI.
- `mp-handoff`: Compatta log conversazione.
- `wiki-brain-skill`: Wiki Obsidian.
- `serena`: Ricerca LSP codice.

### 4. Data Processing
- `markitdown`/`ai-convert`: Estrazione MD (Office/PDF/Img).
- `book-to-skill`: PDF → Framework agenti.

### 5. Ingegneria Software & CI/CD
- `workflow-production-cycle`: Workflow Master Git Flow + TDD.
- `engineering-excellence`: Standard SDD/TDD agnostico dal framework (architettura, sicurezza, a11y, i18n, SEO).
- `wizard-ai-orchestration`: Orchestrazione subagent unificata (sostituisce shadow-clone, swarm-manager, goodcode-orchestrator, cavecrew).
- `auto-branch`: Gestione branch.
- `auto-release`: Versioni semantiche (semver).
- `auto-trigger-release`: Pubblicazione auto fine task.
- `auto-npm-publish`: Sync/pubblicazione NPM.
- `auto-debug`: Auto-correzione pre-merge.
- `cybersecurity`: Linee guida sicurezza Anthropic.
- `spec-kit`: Sviluppo orientato specifiche (SDD).
- `strix`: Penetration testing autonomo.
- `system-prompts-leaks`: Corpus system prompt trapelati (ChatGPT/Claude/Gemini/Grok) — riferimento per difesa prompt-injection e design system prompt.

### 6. Frontend, UI/UX, Design
- `taste-skill`: Layout anti-slop alta gamma.
- `hallmark`: Audit/estrazione design system.
- `awesome-design`: Stili brand (Vercel, Cursor, ecc.).
- `infographic`: Grafici dichiarativi.
- `design-md-spec`: Formato `DESIGN.md`.
- `kinetics-ui`: Micro-interazioni spring-physics (ckissi/kinetics).
- `mengto-skills`: Pacchetto workflow design UI/UX MengTo (70+).
- `stitch-*`: Suite estrazione progetti Google Stitch. Genera design, React, React Native, mockup.

### 7. Scaffolding
- `scaffold`/`ai-scaffold`: Progetti Prod-Ready (Express+TS, Nuxt).

### 8. Orchestrazione & Prompting
- `litellm`: Proxy gateway (100+ modelli).
- `auto-prompt`: Riscrive prompt in XML.
- `gemini-usage`: Monitor token.
- `ecc`: Orchestratore sub-agenti.
- `rtk` (`ai-rtk`): Rust Token Killer (output CLI compresso 60-90%).
- `5-goodcode-orchestrator`: Audit multi-agente (o `wizard-ai-orchestration` per dispatch unificato).
- `ai-loop-sentinel`: Rilevatore 5 Loop.
- `ai-skill-doctor`: Demone auto-riparazione skill.

## 4. Risorse Esterne & Tecnologie
Tecnologie implementate come Skill AI native in `skills/`.
Esempi:
- **Identità**: OpenHuman, QwenPaw, Mem0, Syke.
- **Efficienza**: FlashRank, MarkItDown, Serena, Spec-Kit.
- **Audio/Video**: Voicebox, OmniVoice-Studio, Hyperframes.
- **Framework Web**: Next.js, Vue, React, Nuxt, Astro.
- **DB/Backend**: PocketBase, TrailBase, Kafka, Zvec.
- **Mobile**: Flutter, React Native, Firebase.

## 5. Skill Chaining (Esempi)
Concatenazione skill automatizzata. Zero token sprecati.
- **Nuovo Backend**: `scaffold` → `taste-skill` → `auto-debug` → `auto-release`.
- **Refactoring**: `graphify` → `serena` → `workflow-production-cycle` + `caveman`.
- **A/B Test Prompt**: `auto-prompt` → `ai-compare` → `ai-mem`.



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

