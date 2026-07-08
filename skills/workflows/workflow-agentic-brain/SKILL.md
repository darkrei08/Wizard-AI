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
- **Prompt/Codice esteso:** Usa `headroom compress` o `ai-compress` (riduce token fino a 20x).
- **Log, JSON, CLI Output:** Usa `ai-squeeze` per rimuovere sintassi inutile e spazi vuoti.

### Fase 4: Context Guarding & Isolation (`lean-ctx`, `caveman`)
- **Memoria persistente:** Usa `ai-lean-ctx` per isolare il contesto che serve solo nel momento corrente.
- **Output AI:** Assicurati che il plugin `caveman` sia attivo per ridurre la verbosità della tua stessa risposta (75% meno token in output, 100% accuratezza tecnica).

## ═══════════ META-SKILL EXPANSION ═══════════

Se l'utente richiede di integrare un nuovo strumento esterno o creare una nuova skill:

### Evaluator & Installer (`wizard-ai-installer`)
1. Leggi la repo target.
2. Compara con gli strumenti attuali in `docs/WIKI.md`.
3. Usa `wizard-ai-installer` per installare e configurare autonomamente il nuovo tool nell'ecosistema Wizard-AI.
4. Aggiorna la WIKI.

### Skill Creator (`skill-creator`)
Se manca una competenza specifica per un task in esecuzione:
1. Usa `skill-creator` per redigere un nuovo file `SKILL.md`.
2. Segui gli standard Wizard-AI (YAML frontmatter con name e description).
3. Salvalo nella categoria corretta sotto `skills/`.

## Self-Improvement Constraint (Extracted Rule)
> "Il codice/contesto che sto per iniettare è strettamente necessario? Ho applicato la 'ponytail ladder' (YAGNI, nativo, stdlib) per ridurre l'over-engineering alla fonte?"
