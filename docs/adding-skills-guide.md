# 🧙‍♂️ Guida: Come Aggiungere Nuove Skill a Wizard-AI

Questa guida spiega come creare, integrare e sincronizzare nuove **Skill** personalizzate all'interno dell'ecosistema **Wizard-AI**.

---

## 💡 Che cos'è una Skill?

Una Skill è una cartella contenente istruzioni, script ed esempi che estendono le capacità degli agenti AI (come Antigravity, Claude Code, Amp, ecc.). 
Ogni skill deve trovarsi in una sottocartella all'interno della directory `skills/` e contenere almeno un file `SKILL.md` con il frontmatter YAML per definirne il nome e la descrizione.

---

## 🛠️ Procedura per Creare e Sincronizzare una Skill

### 1. Crea la struttura della Skill nel Repository
All'interno della cartella principale di Wizard-AI, crea una nuova directory per la tua skill sotto `skills/`:

```bash
cd "$WIZARD_AI_DIR"
mkdir -p skills/mia-nuova-skill
```

### 2. Definisci il file `SKILL.md`
Crea il file `skills/mia-nuova-skill/SKILL.md` e definisci il frontmatter YAML all'inizio del file. Questo metadato permette agli agenti AI di indicizzare la skill:

```markdown
---
name: mia-nuova-skill
description: "Descrizione dettagliata dello scopo della skill, utile all'agente per capire quando usarla."
---

# Mia Nuova Skill

Qui inserisci le regole, i contesti, i comandi terminali o le API che l'agente deve usare.

## 📋 Regole di Utilizzo
- Regola 1
- Regola 2
```

> [!IMPORTANT]
> **Regola Fondamentale per la Portabilità:**
> Non inserire mai percorsi assoluti fissi (es. `/home/username/` o `/mnt/...`) nei file delle skill. Usa sempre variabili d'ambiente dinamiche come `$WIZARD_AI_DIR` per fare riferimento alla directory del repository, oppure `$HOME` per la cartella utente.

### 3. Sincronizza la Skill nel tuo ambiente locale
Una volta creata o modificata la skill, esegui lo script di sincronizzazione per propagarla a tutti gli agenti installati sul tuo sistema:

```bash
ai-sync-skills
```

Questo comando:
1. Copierà la skill in `~/.gemini/config/skills/mia-nuova-skill/` (percorso standard usato da Antigravity).
2. Sincronizzerà la skill con i percorsi di configurazione degli altri agenti supportati (Claude Code, Amp, ecc.).
3. Se modifichi una skill direttamente nell'ambiente dell'agente (es. sotto `~/.gemini/config/skills/`), `ai-sync-skills` eseguirà un backup bidirezionale ri-sincronizzando i cambiamenti nel repository locale.

---

## 📦 Integrazione di Script e CLI Personalizzate

Se la tua skill richiede l'esecuzione di un comando personalizzato (es. `ai-mia-utility`), segui questi passi:

1. **Crea lo script** in `bin/ai-mia-utility`.
2. **Usa percorsi dinamici** nello script (es. `SKILL_DIR="$HOME/.ai-skills/mia-nuova-skill"` o carica `$WIZARD_AI_DIR`).
3. **Aggiorna setup.sh** se lo script richiede dipendenze Python speciali o cloni di altri repository git.
4. **Esegui `./setup.sh`** per reinstallare e configurare i permessi corretti per i nuovi eseguibili in `~/.local/bin/`.

---

## 🎯 Best Practices per la Scrittura di SKILL.md

1. **Precisione del Frontmatter**: Il campo `description` nel frontmatter deve essere auto-esplicativo in modo che l'agente AI lo selezioni correttamente in base alla richiesta dell'utente.
2. **Utilizzo di Alert**: Usa i tag di alert GitHub (`> [!NOTE]`, `> [!IMPORTANT]`, `> [!WARNING]`) per evidenziare requisiti critici.
3. **Nessun Placeholder**: Fornisci comandi ed esempi reali che l'utente può eseguire direttamente.
