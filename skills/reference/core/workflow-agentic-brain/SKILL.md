---
name: workflow-agentic-brain
description: "MASTER OPTIMIZER — Orchestrates Agentic AI, Meta-Skills, and Context Optimization. Fuses auto-optimize, llmlingua, lean-ctx, flashrank, sqz, ponytail, and caveman. Use when context is large, costs are high, or meta-agent tasks are requested."
---

# Master Optimizer & Agentic Brain Workflow (Unified)

> **Fonde:** `auto-optimize` + `workflow-agentic-brain`

Questo workflow orchesta la gestione del cervello dell'agente: memoria, ottimizzazione token, compressione contesto, e creazione di nuove skill. È il workflow target per i task di tipo "Meta" ed è richiamato automaticamente nello **Step 4** (Context Optimization) del `prompt-loop-engine` per task HEAVY.

## ═══════════ PIPELINE DI OTTIMIZZAZIONE ═══════════

Quando il contesto supera i limiti o l'utente richiede un'ottimizzazione, applica queste 4 fasi in ordine:

### Fase 1: Ingestion & Conversion (`markitdown`, `ai-convert`)
Se il task coinvolge file binari o complessi (PDF, DOCX, XLSX, PPTX, immagini, audio):
- Usa `ai-convert <file>` per trasformare tutto in Markdown pulito.
- Evita di leggere file grezzi.

### Fase 2: RAG / Filtering (`flashrank`, `ai-rerank`)
Se il contesto è frammentato su decine di documenti o il retrieval è ampio:
- Usa `ai-rerank` per filtrare e classificare i passaggi per pertinenza rispetto al prompt.
- Conserva solo i top K risultati rilevanti.

### Fase 3: Token Compression (`llmlingua`, `sqz`, `headroom`)
Per testi voluminosi:
- **Prompt/Codice esteso:** Usa `ai-headroom compress` o `ai-compress` (riduce token fino a 20x).
  - CLI: `ai-compress --file <file> --ratio 0.5 --verbose`
  - CLI: `cat <file> | ai-headroom compress --ratio 0.4`
- **Log, JSON, CLI Output:** Usa `ai-squeeze` per rimuovere sintassi inutile e spazi vuoti.
  - CLI: `command | ai-squeeze`

### Fase 4: Context Guarding & Isolation (`lean-ctx`, `caveman`)
- **Memoria persistente:** Usa `ai-lean` (`ai-lean-ctx`) per isolare il contesto che serve solo nel momento corrente.
  - CLI: `ai-lean read <file> map` / `ai-lean read <file> signatures` / `ai-lean status`
- **Output AI:** Assicurati che il plugin `caveman` sia attivo per ridurre la verbosità della tua stessa risposta (75% meno token in output, 100% accuratezza tecnica).
  - CLI: `ai-caveman` (mostra le regole di compressione da iniettare)

### Fase 5: CLI Output Interception (`rtk`, `ai-rtk`)
- **Rust Token Killer**: Intercetta e comprimi automaticamente l'output dei comandi shell (git, npm, ls, grep, kubectl) del 60-90%. Binario Rust singolo, zero deps, <10ms.
  - CLI: `ai-rtk wrap <command>` (comprimi un singolo comando)
  - CLI: `ai-rtk init --global` (installa hook globali per tutti i comandi)
  - Pipeline: `ai-rtk wrap git log -100 | ai-squeeze` (cascata RTK + sqz)

### Fase 6: AST Pruning & Sharded Subagent Context (`pi.dev / Rust-Cline Wrappers`)
- **Tree-sitter AST Pruning (`pi.dev` / Rust Wrappers)**: Invece di iniettare interi file (>500 righe) nel contesto, estrai solo le **firme di metodi, classi, interfacce e tipi (AST signatures)** quando esplori o pianifichi (`Lean Context Intelligence`).
- **Sharded Subagent Execution (`pi-subagents`)**: Per task multi-file ad alto peso (`HEAVY`), delegare a subagent in parallelo (`subagent` / `dispatching-parallel-agents`). Ogni subagent opera in un processo isolato con una finestra di contesto potata, azzerando il rischio di context window overflow nel loop principale.
- **Minimalist Native Execution**: Sfrutta la velocità del wrapper rust/cli `pi.dev` per azzerare il bloat di runtime e velocizzare le risposte.

## ═══════════ META-SKILL EXPANSION & ONLINE HUNT (`skills.sh`) ═══════════

Se l'utente o il loop richiedono una nuova competenza o strumento semantico non presente in locale:

### Autonomous Online Skill Hunt (`skills.sh` + `wizard-ai-installer`)
1. **Consulta `https://www.skills.sh/` (The Open Agent Skills Ecosystem)** o effettua un `search_web` per trovare skill certificate (es. `find-skills`, `frontend-design`, `impeccable`, `grill-me`, `superpowers`).
2. **Verifica reputazione e sicurezza:** Controlla installazioni stagionali, manutenzione recente e trust comunitario.
3. **Installazione Autonoma:** Usa `wizard-ai-installer` (`ai-install <repo/url>`) oppure il comando di installazione standard per legarla al loop corrente (`loop-install-bind`).
4. **Aggiorna la WIKI:** Documenta la nuova skill in `docs/WIKI.md`.

## ═══════════ QUICK REFERENCE: CLI COMMANDS ═══════════

| Phase | Tool | CLI Command |
|-------|------|-------------|
| 1. Ingestion | markitdown | `ai-convert <file>` |
| 2. Filtering | flashrank | `ai-rerank -q "<query>" -p <file> -k 5` |
| 3a. Compression | llmlingua | `ai-compress --file <f> --ratio 0.5` |
| 3b. Compression | sqz | `command \| ai-squeeze` |
| 3c. Compression | headroom | `cat <f> \| ai-headroom compress` |
| 4a. Guarding | lean-ctx | `ai-lean read <f> map` |
| 4b. Output | caveman | `ai-caveman` |
| 5. CLI Output | rtk | `ai-rtk wrap <command>` |
| Orchestrator | ai-optimize | `ai-optimize status` / `ai-optimize pipeline <f>` |

### Skill Creator (`skill-creator`)
Se manca una competenza specifica per un task in esecuzione:
1. Usa `skill-creator` per redigere un nuovo file `SKILL.md`.
2. Segui gli standard Wizard-AI (YAML frontmatter con name e description).
3. Salvalo nella categoria corretta sotto `skills/`.

## Self-Improvement Constraint (Extracted Rule)
> "Il codice/contesto che sto per iniettare è strettamente necessario? Ho applicato la 'ponytail ladder' (YAGNI, nativo, stdlib) per ridurre l'over-engineering alla fonte?"
