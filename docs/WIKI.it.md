# Wiki: Risorse e Skill Wizard-AI

> 🇬🇧 [Read English](WIKI.md)

Wiki centrale. Traccia tool core Wizard-AI, skill agenti, tecnologie esterne.
Controlla prima di aggiungere nuove skill.

## 1. 5 Workflow Sequenziali (Loop Engineering)
Pipeline deterministica (`prompt-loop-engine`). Sviluppo/refactoring segue 5 Loop (`01 → 05`).

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
- `wizard-ai-hub`: Dashboard skill.
- `auto-router`: Mappatura intenti utente → skill.
- `wizard-ai-installer`: Installa skill esterne.
- `show-active-skill`: Dichiara tool in uso.
- `os-detect`: Rileva OS pre-installazione.

### 2. Context & Token Optimization
- `caveman`: Comprime output AI (75%).
- `llmlingua`/`ai-compress`: Compressione contesti massivi.
- `headroom`: Proxy compressione (95%).
- `sqz`/`ai-squeeze`: Comprime terminale/payload.
- `flashrank`/`ai-rerank`: Ottimizzazione RAG.
- `lean-ctx`: Isolamento contesto AI.
- `auto-optimize`: Orchestratore compressori.

### 3. Semantica & Memoria
- `graphify`/`ai-graph`: Knowledge graph.
- `auto-graphify`: Trigger update grafo.
- `claude-mem`/`ai-mem`: Memoria cross-sessione.
- `storybloq`: Gestore sessioni CLI.
- `handoff`: Compatta log conversazione.
- `wiki-brain-skill`: Wiki Obsidian.
- `serena`: Ricerca LSP codice.

### 4. Data Processing
- `markitdown`/`ai-convert`: Estrazione MD (Office/PDF/Img).
- `book-to-skill`: PDF → Framework agenti.

### 5. Ingegneria Software & CI/CD
- `auto-workflow`: Git Flow + Superpowers.
- `superpowers`: 11 skill Subagent-Driven Development.
- `auto-branch`: Gestione branch.
- `auto-release`: Versioni semantiche (semver).
- `auto-trigger-release`: Pubblicazione auto fine task.
- `auto-npm-publish`: Sync/pubblicazione NPM.
- `auto-debug`: Auto-correzione pre-merge.
- `cybersecurity`: Linee guida sicurezza Anthropic.
- `spec-kit`: Sviluppo orientato specifiche (SDD).
- `strix`: Penetration testing autonomo.

### 6. Frontend, UI/UX, Design
- `taste-skill`: Layout anti-slop alta gamma.
- `design-hallmark-frontend`: Audit/estrazione design system.
- `awesome-design`: Stili brand (Vercel, Cursor, ecc.).
- `infographic`: Grafici dichiarativi.
- `design-md-spec`: Formato `DESIGN.md`.
- `stitch-*`: Suite estrazione progetti Google Stitch. Genera design, React, React Native, mockup.

### 7. Scaffolding
- `scaffold`/`ai-scaffold`: Progetti Prod-Ready (Express+TS, Nuxt).

### 8. Orchestrazione & Prompting
- `litellm`: Proxy gateway (100+ modelli).
- `auto-prompt`: Riscrive prompt in XML.
- `gemini-usage`: Monitor token.
- `ecc`: Orchestratore sub-agenti.
- `rtk` (`ai-rtk`): Rust Token Killer (output CLI compresso 60-90%).
- `goodcode`: Audit multi-agente.
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
- **Refactoring**: `graphify` → `serena` → `auto-workflow` + `caveman`.
- **A/B Test Prompt**: `auto-prompt` → `ai-compare` → `ai-mem`.
