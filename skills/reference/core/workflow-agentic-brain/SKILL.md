---
name: workflow-agentic-brain
description: "MASTER OPTIMIZER — Orchestrates Agentic AI, Meta-Skills, and Context Optimization. Fuses auto-optimize, llmlingua, lean-ctx (ktx), flashrank, sqz, ponytail, caveman, headroom, and handoff. Use when context is large, costs are high, or meta-agent tasks are requested."
---

# Master Optimizer & Agentic Brain Workflow (Unified)

> **Fonde:** `auto-optimize` + `workflow-agentic-brain` + `caveman` + `ponytail` + `sqz` + `lean-ctx` (`ktx`) + `headroom` + `mp-handoff` (`handoff`)

Questo workflow orchestra la gestione del cervello dell'agente: memoria, ottimizzazione token, compressione contesto, transizione sessione (handoff) e creazione di nuove skill. È il workflow target per i task di tipo "Meta" ed è richiamato automaticamente nello **Step 4** (Context Optimization) e nello **Step 5** (Release/Handoff) del `prompt-loop-engine` per task HEAVY.

## ═══════════ PIPELINE DI OTTIMIZZAZIONE E CONTROLLO TOKEN ═══════════

Quando il contesto supera i limiti o l'utente richiede un'ottimizzazione, applica queste 6 fasi obbligatorie in ordine:

### Fase 1: Ingestion & Conversion (`markitdown`, `ai-convert`)
Se il task coinvolge file binari o complessi (PDF, DOCX, XLSX, PPTX, immagini, audio):
- Usa `ai-convert <file>` per trasformare tutto in Markdown pulito.
- Evita di leggere file grezzi.

### Fase 2: RAG / Filtering (`flashrank`, `ai-rerank`)
Se il contesto è frammentato su decine di documenti o il retrieval è ampio:
- Usa `ai-rerank` per filtrare e classificare i passaggi per pertinenza rispetto al prompt.
- Conserva solo i top K risultati rilevanti.

### Fase 3: Token & Output Compression (`llmlingua`, `sqz`, `headroom`, `caveman`)
Per testi voluminosi, log di build o chiamate di rete:
- **Prompt/Codice esteso & Latenza:** Usa `headroom` / `ai-headroom` o `ai-compress` per comprimere la richiesta prima di inviarla (riduzione token fino a 20x e proxying API ottimizzato).
- **Log, JSON, CLI Output:** Usa sempre `ai-squeeze` / `sqz` per rimuovere sintassi inutile, righe di debug prolisse e spazi vuoti prima di passarla al modello.
- **Risposta dell'Agente (`caveman` mode):** Assicurati che il plugin `caveman` sia attivo per ridurre del ~75% i token in uscita nella risposta dell'agente pur mantenendo 100% di accuratezza tecnica e sintattica.

### Fase 4: Context Guarding & Pruning (`lean-ctx` / `ktx`)
- **Pruning Dinamico (`lean-ctx` / `ktx`):** Attiva `lean-ctx` (`ktx`) per potare automaticamente i file di codice già ispezionati che non sono più al centro dell'attenzione o della modifica immediata. Riduci il rumore di contesto da 60% a 90%.
- **Anti-Overengineering (`ponytail` mode):** Applica la mentalità del senior dev (`ponytail`), rimuovendo astrazioni speculative, gerarchie eccessive e codice YAGNI. Il miglior codice è quello che non devi scrivere o mantenere.

### Fase 5: AST Pruning & Sharded Subagent Context (`pi.dev / Rust-Cline Wrappers`)
- **Tree-sitter AST Pruning (`pi.dev` / Rust Wrappers)**: Invece di iniettare interi file (>500 righe) nel contesto, estrai solo le **firme di metodi, classi, interfacce e tipi (AST signatures)** quando esplori o pianifichi (`Lean Context Intelligence`).
- **Sharded Subagent Execution (`pi-subagents`)**: Per task multi-file ad alto peso (`HEAVY`), delegare a subagent in parallelo (`subagent` / `dispatching-parallel-agents`). Ogni subagent opera in un processo isolato con una finestra di contesto potata, azzerando il rischio di context window overflow nel loop principale.

### Fase 6: Session Transition & Handoff (`mp-handoff` / `handoff` + `session-manager`)
- Prima di chiudere la sessione o delegare a un nuovo turno/agente, esegui **`mp-handoff` (`handoff`)** per produrre il riassunto strutturato di transizione e **`session-manager` (`ai-session-save`)** per salvare l'istantanea persistente su `MEMORY.md`.

## ═══════════ META-SKILL EXPANSION & ONLINE HUNT (`skills.sh`) ═══════════

Se l'utente o il loop richiedono una nuova competenza o strumento semantico non presente in locale:

### Autonomous Online Skill Hunt (`skills.sh` + `wizard-ai-installer`)
1. **Consulta `https://www.skills.sh/` (The Open Agent Skills Ecosystem)** o effettua un `search_web` per trovare skill certificate.
2. **Verifica reputazione e sicurezza:** Controlla installazioni stagionali, manutenzione recente e trust comunitario.
3. **Installazione Autonoma:** Usa `wizard-ai-installer` (`ai-skill-install <repo/url>`).
4. **Aggiorna la WIKI:** Documenta la nuova skill in `docs/WIKI.md`.

## Self-Improvement Constraint (Extracted Rule)
> "Il codice/contesto che sto per iniettare è strettamente necessario? Ho applicato `lean-ctx` (`ktx`), `sqz`, `caveman` e la 'ponytail ladder' (YAGNI, nativo, stdlib) per azzerare lo spreco di token e il debito tecnico alla fonte?"
