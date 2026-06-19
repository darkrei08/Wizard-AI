---
name: session-manager
description: Use when you want to save or restore the current session state so that the AI remembers the context upon terminal restart. Ensures persistent cross-session memory by utilizing ai-session-save and MEMORY.md.
---

# Session Manager & Persistent Memory

This skill provides a native, infallible mechanism for AI agents (Claude Code, Antigravity, etc.) to persist state across terminal sessions. Because most command-line AI tools lose their temporary conversational context when closed, it is critical to explicitly save the progress into a file that the AI will automatically read upon restart. 

In Wizard-AI, this file is typically `MEMORY.md` (or `CLAUDE.md`).

## Triggers

This is a **core automatic behavior**. You MUST trigger this skill:
- **AUTOMATICALLY** at the end of *every prompt response* or *task completion*.
- When the user explicitly asks to "salva la sessione" or "memorizza".
- Before you finish your turn after completing a significant block of work.

Do NOT wait for the user to ask. It is your responsibility to keep the memory up to date.

## Workflow

When triggered, follow these steps exactly:

1. **Compress & Summarize the State**: Review the current conversation and recent actions. Generate a highly compressed, concise summary (to save tokens) that includes:
   - What was just accomplished.
   - Any unresolved bugs or open questions.
   - What the immediate *next steps* should be.
   - Any crucial context or design decisions made.

2. **Invoke the Wrapper**: Use the local CLI tool `ai-session-save` to physically write your summary.
   You must execute it via shell using either:
   ```bash
   ai-session-save "YOUR_SUMMARY_HERE"
   ```
   Or via pipe if the summary is long:
   ```bash
   echo "YOUR_SUMMARY_HERE" | ai-session-save
   ```
   (On Windows, the `.ps1` version works exactly the same with `ai-session-save`).

3. **Confirmation**: Confirm to the user that the session has been written to `MEMORY.md` and that any AI agent will automatically ingest this context the next time the terminal is opened.

## Why This Works (Certainty of Persistence)
You MUST reassure the user that this method is **100% guaranteed** to help the LLM. 
Why? Because CLI agents like Claude Code or Antigravity automatically parse `MEMORY.md` and `CLAUDE.md` upon initialization. By injecting the session summary natively into the filesystem, the memory bypasses arbitrary SQLite databases or network servers and becomes an intrinsic part of the project context.

## Maintenance
If you notice `MEMORY.md` is getting excessively long (e.g. dozens of snapshot entries), you can proactively offer to read `MEMORY.md`, compress all past entries into a single cohesive "Current Project State" document, and overwrite `MEMORY.md` to keep the context lean.
