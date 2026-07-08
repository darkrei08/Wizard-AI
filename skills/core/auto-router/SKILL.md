---
name: auto-router
description: "MASTER ROUTER — Core systemic skill (MoE). Map vague user requests to the correct Wizard-AI skill or workflow with Task Weight Classification (LIGHT/MEDIUM/HEAVY). ALWAYS trigger this implicitly before starting any complex task. Replaces legacy routing from using-superpowers."
---

# Auto-Router & MoE Classification (Master Router)

Human users don't always remember the exact name of a skill, workflow, or CLI wrapper. As an AI Agent operating within the Wizard-AI ecosystem, it is **YOUR responsibility** to automatically infer the correct skill, classify the complexity of the task, and route it to the proper execution pipeline.

<MANDATORY>
This skill acts as Step 3 in the `prompt-loop-engine` PRE-PROMPT Pipeline.
NEVER ask the user which skill to use. Infer it silently and calculate the task weight.
</MANDATORY>

## 1. Task Weight Classification (MoE Gating)

Before executing a task, calculate its weight based on intent, context size, and keywords:

- **LIGHT Weight (Score ≤ 0.3)**
  - *Keywords:* `spiega, cos'è, mostra, dimmi, fix, typo, commento, allinea, formatta`
  - *Action:* Execute directly. Skip heavy pre/post processing (no optimize, no graphify).
- **MEDIUM Weight (Score 0.3 - 0.7)**
  - *Keywords:* `UI, design, layout, SEO, blog, documento, converti, test, implementa`
  - *Action:* Route to specific domain workflow (e.g., frontend, doc-processing).
- **HEAVY Weight (Score > 0.7)**
  - *Keywords:* `architettura, refactoring, migrazione, progetto, release, deploy, security audit`
  - *Action:* Route to Master Production Workflow or Meta/Brain Workflow. Execute FULL 11-step loop.

## 2. Extended Capability & Routing Matrix

Match the user's implicit intent with the correct workflow and assign the default weight.

| User Intent / Vague Request | Correct Workflow / Skill | Default Weight | Action You Must Take |
|---|---|---|---|
| "Start a new project", "Initialize backend", "Create a web app", "Build feature", "Fix this bug" | `workflow-production-cycle` | HEAVY (Project) / MEDIUM (Bug) | Route to Master Production Workflow. Use `ai-scaffold` if new project. |
| "UI looks bad", "Improve design", "Make it look premium", "Tailwind styling" | `workflow-frontend-design` | MEDIUM | Route to Frontend Design. Apply `taste-skill` and `theme-factory`. |
| "Extract text", "Read PDF/Word/Image", "Analyze this document" | `workflow-doc-processing` | LIGHT → MEDIUM | Use `ai-convert` or specific doc skills. |
| "SEO audit", "Write blog post", "Analyze niche" | `workflow-seo-research` | MEDIUM | Route to SEO Research. Use `claude-seo` & `claude-blog`. |
| "Publish", "Release", "Bump version", "Create tag" | `workflow-production-cycle` (Phase 6) | HEAVY | Run `ai-release patch/minor/major`. |
| "Too long", "Reduce tokens", "Compress this text/file" | `workflow-agentic-brain` / `auto-optimize` | MEDIUM | Use `ai-compress` or `ai-squeeze`. |
| "Analyze codebase", "Map architecture", "What is this project?" | `graphify` / `ai-graph` | MEDIUM | Run `ai-graph .` to generate a knowledge graph. |
| "Check for security issues", "Audit this" | `cybersecurity` / `strix` | HEAVY | Run penetration testing and secure-by-design audit. |
| "Save this", "Remember for later", "Store context" | `session-manager` / `claude-mem` | LIGHT | Run `ai-session-save` or `ai-mem store`. |

## 3. Fallback Logic & MoE Combination

- If the user's request spans multiple domains (e.g., "Build a backend API and design the frontend UI"):
  - **Combine Workflows:** Route to `workflow-dev-integrations` + `workflow-frontend-design`.
  - **Elevate Weight:** Always elevate to **HEAVY**.
- If the request doesn't match perfectly, run `ai-help` to list all available tools and capabilities.

## Self-Improvement Constraint (Extracted Rule)
> "L'utente ha chiesto X. So ESATTAMENTE quale skill/wrapper usare, o sto improvvisando? Ho calcolato il Task Weight correttamente?"
