# Wiki: Wizard-AI Resources & Skills

> 🇮🇹 [Leggi Italiano](WIKI.it.md)

Central wiki. Tracks core tools, agent skills, external tech.
Check before adding new skills.

> 🤖 **LLM Reference:** See [MODELS_REFERENCE.md](MODELS_REFERENCE.md) for models and Cockpit Tools config.

## 1. 5 Sequenced Workflows (Loop Engineering)
Deterministic pipeline (`prompt-loop-engine`). Master Orchestrator. 5 Sequenced Loops (`01 → 05`).

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
- `prompt-loop-engine`: 11-step PRE/POST pipeline Master Orchestrator.
- `wizard-ai-hub`: Skill dashboard.
- `auto-router`: Intent-to-skill mapping.
- `wizard-ai-installer`: Install external skills.
- `show-active-skill`: Declares used tools.
- `os-detect`: Pre-installation OS detector.

### 2. Context & Token Optimization
- `workflow-agentic-brain`: Master Optimizer.
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
- `handoff`: Compact conversation log.
- `wiki-brain-skill`: Obsidian-style wiki.
- `serena`: Code LSP search.

### 4. Data Processing
- `markitdown`/`ai-convert`: MD extraction (Office/PDF/Img).
- `book-to-skill`: PDF → Agent Framework.

### 5. Software Engineering & CI/CD
- `workflow-production-cycle`: Git Flow + TDD Master Workflow.
- `superpowers`: 11 Subagent-Driven Development skills.
- `auto-branch`: Branch management.
- `auto-release`: Semantic versioning (semver).
- `auto-trigger-release`: Auto-publish post task.
- `auto-npm-publish`: NPM sync/publish.
- `auto-debug`: Pre-merge auto-correction.
- `cybersecurity`: Anthropic security guidelines.
- `spec-kit`: Specification-Driven Development (SDD).
- `strix`: Autonomous penetration testing.

### 6. Frontend, UI/UX, Design
- `taste-skill`: Premium anti-slop layouts.
- `design-hallmark-frontend`: Audit/extract design system.
- `awesome-design`: Brand styles (Vercel, Cursor, etc.).
- `infographic`: Declarative charts.
- `design-md-spec`: `DESIGN.md` format.
- `stitch-*`: Google Stitch integration suite. Generates design, React, React Native, mockups.

### 7. Scaffolding
- `scaffold`/`ai-scaffold`: Prod-Ready templates (Express+TS, Nuxt).

### 8. Orchestration & Prompting
- `litellm`: Proxy gateway (100+ models).
- `auto-prompt`: Rewrites prompt to XML.
- `gemini-usage`: Token monitor.
- `ecc`: Sub-agent orchestrator.
- `rtk` (`ai-rtk`): Rust Token Killer (CLI output compression 60-90%).
- `goodcode`: Multi-agent audit.
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
- **Refactoring**: `graphify` → `serena` → `auto-workflow` + `caveman`.
- **A/B Test Prompts**: `auto-prompt` → `ai-compare` → `ai-mem`.
