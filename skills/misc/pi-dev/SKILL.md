---
name: pi-dev
description: "pi.dev development tools."
---

# pi-dev & Rust/Cline Wrapper Skill (`Context Optimization & Sharded Execution`)

This skill integrates `pi.dev` development tools and high-performance **Rust/Cline Wrapper features** for extreme token savings, AST-level context pruning, and subagent sharding.

## Description
`pi.dev` (`pi`) and its Rust-based Cline wrappers provide minimalist, lightning-fast coding agent execution with native shell, tree-sitter AST analysis, and sharded context isolation.

## Advanced Context & Token Optimization Capabilities (`Rust / Cline Wrappers`)
When managing large codebases or heavy prompts (`task_weight == HEAVY`), apply these `pi.dev` / Rust wrapper patterns:
1. **AST Signature Extraction (`Tree-sitter Pruning`)**: Before injecting code into context, use `pi` AST tools or `grep_search`/tree-sitter wrappers to extract **only class/function signatures and types**, stripping out heavy implementation bodies when navigating or planning (`Lean Context Intelligence`).
2. **Sharded Subagent Execution (`pi-subagents`)**: For multi-file refactoring or deep reviews, dispatch tasks to isolated subagents (`subagent` / `dispatching-parallel-agents`). Each subagent operates inside a clean, pruned context window (`Sub-process Context Isolation`), preventing context window overflow and token drift.
3. **Hybrid Context Pipeline (`pi.dev + sqz + lean-ctx`)**: Pipe CLI and compiler outputs directly through `sqz` before feeding them to the model, or use `wz-ai-lean-ctx` to drop stale conversation history while preserving core `MEMORY.md` state.

## Integration & Best Practices
- Always prefer `pi.dev` / native Rust wrappers over heavy Node/Python runtimes when speed and memory efficiency are paramount.
- Verify AST definitions before mutating code structures (`04. loop-4-refactor`).
- For missing capabilities, query `https://www.skills.sh/` (`npx skills add <owner/repo>`) to install certified extensions.

