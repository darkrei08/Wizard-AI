# Guida: Aggiungere Skill a Wizard-AI

Come creare, integrare, sincronizzare Skill in Wizard-AI.

## 1. Cos'è una Skill?
Cartella in `skills/`. Estende capacità agenti (Antigravity, Claude Code).
Requisiti: file `SKILL.md` con frontmatter YAML (nome, descrizione).

## 2. Creare e Sincronizzare

### A. Crea cartella
```bash
cd "$WIZARD_AI_DIR"
mkdir -p skills/mia-nuova-skill
```

### B. Definisci SKILL.md
```markdown
---
name: mia-nuova-skill
description: "Scopo della skill."
---
# Mia Nuova Skill
Regole, contesti, comandi.
## Regole
- Regola 1
```
> [!IMPORTANT]
> **Portabilità:** MAI usare percorsi assoluti fissi. Usa variabili: `$WIZARD_AI_DIR` o `$HOME`.

### C. Sincronizza
```bash
ai-sync-skills
```
Azione:
1. Copia in `~/.gemini/config/skills/mia-nuova-skill/`.
2. Sincronizza con altri agenti.
3. Backup bidirezionale (se modifichi in `~/.gemini`, sincronizza verso repo).

## 3. Script CLI Personalizzati
Se skill usa comando custom (`ai-mia-utility`):
1. Crea script in `bin/ai-mia-utility`.
2. Usa percorsi dinamici (`$WIZARD_AI_DIR`).
3. Aggiorna `setup.sh` (se servono dipendenze).
4. Esegui `./setup.sh` per installare in `~/.local/bin/`.

## 4. Best Practices SKILL.md
- **Precisione Frontmatter**: `description` auto-esplicativo.
- **Alert**: Usa alert GitHub (`> [!NOTE]`).
- **NO Placeholder**: Fornisci comandi reali.
