---
name: session-manager
description: "SESSION MANAGER — Dual mode skill (Step 1 PRE e Step 10 POST). Ripristina il contesto all'inizio e salva lo stato persistente alla fine. Utilizza MEMORY.md e wz-ai-session-save."
---

# Session Manager & Persistent Memory (Step 1 & Step 10)

This skill provides a native, infallible mechanism for AI agents to persist state across terminal sessions. In the new Loop Engineering pipeline, this skill operates in two distinct modes.

## Mode 1: RESTORE (PRE-PROMPT - Step 1)

**When:** AUTOMATICALLY before addressing any new user prompt.

1. **Read Memory**: Silently read `MEMORY.md` (or `CLAUDE.md`) in the project root.
2. **Context Injection**: Use this information to understand what the user was working on, open questions, and the last known state.
3. **Graphify Check**: Se esiste la cartella `graphify-out/`, ricorda che puoi navigare semanticamente il codice.
4. **Transition**: Procedi allo Step 2 (auto-prompt) o Step 3 (auto-router) del Loop Engine senza annunciare la lettura della memoria, a meno che non sia strettamente necessario per la risposta.

## Mode 2: SAVE (POST-PROMPT - Step 10)

**When:** AUTOMATICALLY at the end of *every prompt response* or *task completion*. Do NOT wait for the user to ask.

1. **Compress & Summarize the State**: Genera un riassunto ultra-conciso:
   - Cosa è stato completato
   - Bug irrisolti o open questions
   - Prossimi step (TODO)
   - Decisioni architetturali prese

2. **Invoke the Wrappers**: Esegui **ENTRAMBI** i comandi seguenti (anche in background):
   
   ```bash
   # Snapshot per Storybloq
   wz-ai-storybloq snapshot
   
   # Scrittura fisica su MEMORY.md
   wz-ai-session-save "YOUR_SUMMARY_HERE"
   ```
   *(Oppure via pipe: `echo "SUMMARY" | wz-ai-session-save`)*

3. **Anonimizzazione**: Anonimizza SEMPRE i percorsi locali prima di salvare (es. usa `~/.ai-skills` invece di `C:\Users\...`) per prevenire leak di dati personali.

4. **Confirmation**: Aggiorna lo stato `Session Saved: ✅` nel footer di `show-active-skill` (Step 11).

## Maintenance & Housekeeping
If you notice `MEMORY.md` is getting excessively long (dozens of entries), proactively compress all past entries into a single "Current Project State" document and overwrite the file to keep context lean.

## Self-Improvement Constraint (Extracted Rule)
> "Sto terminando il mio turno. Ho salvato lo stato in memoria? Se chiudo il terminale ora, l'AI alla prossima apertura saprà esattamente dove riprendere?"
