# Contribuire a Wizard-AI

Grazie per voler contribuire a Wizard-AI! Questo documento spiega come aggiungere nuove skill, wrapper CLI, e migliorare l'ecosistema.

> 🇬🇧 [Read this document in English](CONTRIBUTING.md)

---

## 📋 Struttura del Progetto

```
wizard-ai/
├── bin/          # Script wrapper CLI installati in ~/.local/bin/
├── skills/       # Definizioni SKILL.md per gli agenti AI
├── docs/         # Guide e documentazione di riferimento
├── setup.sh      # Script di installazione automatico
└── README.md     # Documentazione principale
```

---

## 🔧 Aggiungere una Nuova Skill

### 1. Crea il wrapper CLI in `bin/`

```bash
# Esempio: bin/ai-nuovostrumento
#!/usr/bin/env bash
# ai-nuovostrumento — Descrizione breve
# Source: https://github.com/autore/repo

set -euo pipefail

# Verifica prerequisiti
if ! command -v nuovostrumento &>/dev/null; then
  echo "❌ nuovostrumento non trovato."
  echo "   Installa: uv tool install nuovostrumento"
  exit 1
fi

exec nuovostrumento "$@"
```

### 2. Crea il file `skills/nome-skill/SKILL.md`

La skill DEVE avere il frontmatter YAML:

```markdown
---
name: nome-skill
description: "Descrizione concisa che spiega QUANDO usare questa skill"
---

# /nome-skill

Descrizione dettagliata...

## Usage
...

## Examples
...
```

**Regole importanti per le skill:**
- ❌ **NON inserire percorsi assoluti** — usa `$WIZARD_AI_DIR`, `$HOME`, `~`
- ❌ **NON includere chiavi API o segreti** di nessun tipo
- ✅ Descrivi sia il comando base che il wrapper `ai-*`
- ✅ Includi esempi pratici

### 3. Aggiorna `setup.sh`

Aggiungi l'installazione nel blocco appropriato:

```bash
# Per tool Python:
uv tool install nomepacchetto

# Per repository GitHub:
if [ ! -d "$HOME/.ai-skills/nome-repo" ]; then
  git clone --quiet https://github.com/autore/repo "$HOME/.ai-skills/nome-repo"
fi
```

### 4. Aggiorna `bin/ai-help`

Aggiungi una riga nella sezione appropriata del menu di aiuto.

### 5. Sincronizza

```bash
ai-sync-skills
```

---

## 📝 Stile del Codice

- Script bash: usa `set -euo pipefail` all'inizio
- Messaggi di errore: scrivi su `stderr` (`>&2`)
- Icone: ✅ successo, ❌ errore, ⚠️ warning, 🔄 operazione in corso
- Commenti: descrivi il "perché", non il "cosa"

---

## 🐛 Segnalare Bug

Apri una Issue su GitHub con:
1. Output del comando che ha fallito
2. Output di `ai-help` (per vedere cosa è installato)
3. Sistema operativo e architettura (`uname -a`)

---

## 🚀 Pull Request e Strategia di Branching

Questo progetto utilizza la skill globale `auto-branch` per gestire una logica di sviluppo basata su staging. Tutte le nuove funzionalità e correzioni devono passare per il branch `staging` prima di arrivare sul `main`.

1. Effettua un Fork del repository
2. Spostati sul branch staging: `git checkout staging`
3. Crea un branch feature: `ai-branch feature "nome-skill"` (oppure `git checkout -b feature/nome-skill`)
4. Apporta le tue modifiche
5. Testa con `bash -n setup.sh` (syntax check)
6. Verifica: `grep -r "/home/" skills/ bin/` non deve restituire risultati
7. Apri una PR indirizzata al branch `staging` (NON `main`)

Una volta che la funzionalità è testata in `staging`, i manutentori procederanno al rilascio sul `main`.

---

## ⚖️ Licenza

Contribuendo, accetti che il tuo codice sia rilasciato sotto la [AGPLv3 License](LICENSE). Mantieni in ogni caso il copyright originale del codice che hai scritto.
