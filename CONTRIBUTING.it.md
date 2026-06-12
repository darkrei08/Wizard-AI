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

## 🚀 Pull Request

1. Fork del repository
2. Crea un branch: `git checkout -b feat/nome-skill`
3. Apporta le modifiche
4. Testa con `bash -n setup.sh` (syntax check)
5. Verifica: `grep -r "/home/" skills/ bin/` non deve restituire risultati
6. Apri la PR con descrizione chiara

---

## ⚖️ Licenza

Contribuendo, accetti che il tuo codice sia rilasciato sotto la [AGPLv3 License](LICENSE). Inoltre, inviando una Pull Request, concedi al creatore del progetto (tramite Contributor License Agreement - CLA) il diritto di utilizzare, modificare, sub-licenziare e distribuire commercialmente le tue modifiche in futuro, pur mantenendo tu il copyright originale del codice che hai scritto.
