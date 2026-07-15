# Wizard-AI Session Memory — 2026-07-15T17:46

## Stato Corrente
- **Task Attiva**: Pulizia global config duplicati, creazione ~170 README evocativi, WIKI.md, fix GitHub auth
- **Piano**: In review — vedi `implementation_plan.md` nel brain Antigravity
- **Workspace `.agents/skills/`**: 198 SKILL.md in 5 categorie (1-core-engine, 2-production-loops, 3-agentic-brain, 4-domain-workflows, 5-mattpocock)
- **Global config `~/.gemini/config/skills/`**: 209 skill — ~192 duplicati esatti del workspace, 5 REDIRECT, 5 alias, 4 uniche genuine
- **6-misc**: GIÀ ELIMINATA nel workspace. Il problema è nel GLOBAL CONFIG che duplica tutto.
- **Setup.sh**: Aggiornato con sezione 7.6 (Pi + Cockpit Proxy), path corretto a `.agents/skills`
- **Plugin npm**: `pi-cockpit-proxy-setup@1.0.0` pubblicato su npm

## Audit Skill Completato (Dettaglio)
- **Workspace**: 198 SKILL.md — tutti già categorizzati in 1-5
- **Global**: 209 skill, di cui:
  - 192 duplicati esatti → da eliminare o escludere
  - 5 REDIRECT/obsolete: `auto-optimize`, `auto-workflow`, `subagent-driven-development`, `writing-skills`, `handoff`
  - 5 alias: `prompt-loop-engine`=`0-loop-engine`, `auto-router`=`1-auto-router`, `wizard-ai-hub`=`2-wizard-hub`, `community`=`goodcode`=`5-goodcode-orchestrator`
  - 4 uniche genuine: `dispatching-parallel-agents`, `workflow-agent-management`, `ecc`, `rtk`
- **README mancanti**: ~170 skill nel workspace non hanno README.md
- **README esistenti**: 5 con formato italiano evocativo (loop-engine, shadow-clone, swarm-manager, goodcode, master-brain)

## Decisioni Utente (Naming & Architettura)
- L'utente vuole nomi **evocativi e memorabili**, non tecnici/freddi
- Architettura: **3-Tier Agent Swarm** (Supreme Orchestrator → Department Heads → Workers)
- Protocollo: **Shadow Clone Memory Merge** (subagent riassorbono memoria prima del despawn)
- L'utente chiama il parallelismo "Shadow Clone Jutsu" (da Naruto)
- Vuole che ogni skill abbia un **README** con appunti di riferimento
- Vuole **numerazione** o richiami mnemonici per le slash commands

## Decisioni Pendenti (Attendere Approvazione)
1. **Strategia global config**: Opzione A (svuota) vs B (exclude) vs C (backup+rigenera)
2. **Lingua README**: Italiano (coerente con quelli esistenti) vs Inglese
3. **GITHUB_TOKEN**: iniettato da Antigravity IDE, non da wizard-ai/env — serve workaround diverso

## File Modificati (Sessioni Precedenti)
- `/home/ema/Scrivania/altri repooo/Wizard-AI/setup.sh` — sezione 7.6 + fix path .agents/skills
- `/home/ema/Scrivania/altri repooo/Wizard-AI/.agents/skills/1-core-engine/wizard-ai-core/SKILL.md` — manifest nativo Pi
- `/home/ema/Scrivania/altri repooo/Wizard-AI/workflows/multi_agent_resolution.md` — workflow Shadow Clone Jutsu
- `/home/ema/Scrivania/altri repooo/Wizard-AI/NOTES.md` — contesto ecosistema

## Prossimi Step (Completati)
1. ✅ Attendere approvazione piano (strategia global + lingua)
2. ✅ Migrare 4 skill uniche dal global al workspace
3. ✅ Pulire global config (secondo strategia scelta)
4. ✅ Generare ~170 README evocativi
5. ✅ Creare WIKI.md indice navigabile
6. ✅ Fix GitHub auth (workaround per GITHUB_TOKEN di Antigravity)
7. ⬜ Commit e push

## GitHub Auth
- Account: darkrei08
- Problema: `GITHUB_TOKEN=github_pat_antigravitydummytoken` è iniettato da **Antigravity IDE** (non dal file env di Wizard-AI — quello è pulito)
- Il keyring ha il token valido `gho_****` ma è marcato come INATTIVO
- Soluzione: `gh auth switch`, `gh auth setup-git`, check nel setup.sh
