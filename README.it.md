# 🧙‍♂️ Wizard-AI

> Un ecosistema completo di wrapper CLI per l'AI, strumenti di ottimizzazione dei token e skill per agenti — utilizzabile a livello globale da **qualsiasi agente AI** (Antigravity, Claude Code, Gemini CLI, GitHub Copilot, Amp, ecc.) e direttamente dal tuo terminale.

> 🇬🇧 [Read this README in English](README.md)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Platform: Linux | macOS | Windows](https://img.shields.io/badge/Platform-Linux%20%7C%20macOS%20%7C%20Windows-blue.svg)]()
[![Shell: Bash | PowerShell](https://img.shields.io/badge/Shell-Bash%20%7C%20PowerShell-green.svg)]()
[![Requires: uv](https://img.shields.io/badge/Requires-uv-orange.svg)](https://docs.astral.sh/uv/)

---

## ✨ Cos'è questo progetto?

Wizard-AI è un setup **con un solo comando** che fornisce a tutti gli agenti AI sulla tua macchina l'accesso allo stesso set di strumenti di produttività:

- 🗜️ **Compressione dei token** — riduci il contesto del prompt fino a 20x
- 🌐 **Grafi di conoscenza** — mappa qualsiasi codebase in un grafo interrogabile
- 🧠 **Memoria persistente** — memoria semantica che sopravvive alle sessioni AI
- 📄 **Conversione di documenti** — PDF, DOCX, XLSX → Markdown pulito
- 🔍 **Reranking intelligente** — filtra i passaggi RAG in base alla pertinenza
- 📈 **Monitoraggio dei consumi** — traccia l'uso dei token e i costi
- 🔗 **LLM Gateway** — un'unica API per oltre 100 provider tramite LiteLLM

Tutti gli strumenti vengono installati una sola volta e resi **disponibili a ogni agente AI** attraverso un sistema di skill condiviso.

---

## 🚀 Avvio Rapido

### ⚡ Opzione A — Un solo comando via npm (consigliata)

Se hai [Node.js](https://nodejs.org) (≥ 14) e `git` installati, funziona allo stesso modo su Linux, macOS e Windows:

```bash
npx @darkrei08/wizard-ai-cli
# o 'npx @darkrei08/wizard-ai-cli --verbose' per visualizzare log dettagliati
```

Il launcher clona il repository in `~/.wizard-ai` ed esegue automaticamente l'installatore della tua piattaforma (`setup.sh` o `setup.ps1`). Rieseguendo il comando, un'installazione esistente viene aggiornata. Puoi anche installarlo come comando globale:

```bash
npm install -g @darkrei08/wizard-ai-cli
wizard-ai
```

### 🔧 Opzione B — Installazione manuale (3 passaggi)

Per essere completamente autonomo, segui questi passaggi per installare e iniziare a usare l'ecosistema:

#### 1️⃣ Clona il Repository
Clona il repository sul tuo computer locale:
```bash
git clone https://github.com/darkrei08/Wizard-AI.git ~/wizard-ai
cd ~/wizard-ai
```

#### 2️⃣ Esegui l'Installatore
Esegui lo script principale di setup. È progettato per essere interamente non-interattivo e configura tutto automaticamente:

**Linux / macOS:**
```bash
chmod +x setup.sh
sudo ./setup.sh
# o 'sudo ./setup.sh --verbose' per visualizzare log dettagliati
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File setup.ps1
# o aggiungi -VerboseMode per visualizzare log dettagliati
```

#### 3️⃣ Verifica l'Installazione
Ricarica la tua shell per caricare le nuove variabili d'ambiente, quindi avvia il menu di aiuto:
```bash
source ~/.bashrc   # oppure source ~/.zshrc — su Windows apri un nuovo terminale
ai-help
```
Dovresti vedere la lista dei comandi.

#### 4️⃣ Avvia la Dashboard Locale (Hub)
L'ecosistema include una bellissima interfaccia grafica (Hub) per esplorare le skill e visualizzare le statistiche (incluso il tracciamento di Cockpit Tools).
Puoi aprirla dal terminale con il wrapper integrato, che avvierà un server locale e aprirà automaticamente il browser:
```bash
ai-hub
```
*Alternativa manuale per avviare il server*:
```bash
python3 $WIZARD_AI_DIR/hub/api/server.py --port 9742
# Apri http://localhost:9742 nel tuo browser
```

### 🐳 Opzione C — Esecuzione via Docker (per la Web GUI)
Se preferisci mantenere l'ambiente web isolato, puoi eseguire la Dashboard tramite Docker. Il container monterà automaticamente i volumi del tuo sistema host in modo da leggere la telemetria corretta:

```bash
docker compose up -d
```
L'interfaccia sarà disponibile all'indirizzo `http://localhost:9742`.

---

## ⚙️ Cosa viene installato?

Dietro le quinte, `setup.sh` gestisce tutto per te:

1. **Registra `$WIZARD_AI_DIR`**: Salva il percorso in `~/.config/wizard-ai/env` e lo inserisce nel caricamento automatico della shell (`~/.bashrc`, `~/.zshrc`).
2. **Prepara l'ambiente Python**: Installa `uv` e crea un ambiente virtuale leggero (`~/.ai-skills/venv`).
3. **Clona le dipendenze**: Scarica i repository necessari sotto `~/.ai-skills/`.
4. **Installa Tool CLI Globali**: Configura gli eseguibili nativi (`graphify`, `litellm`, `markitdown`, `sqz`, `serena`) globalmente via `uv tool`.
5. **Crea Wrapper Personalizzati**: Copia gli script da `bin/` a `~/.local/bin/`.
6. **Configura le Skill**: Copia le skill in `~/.gemini/config/skills/` e le propaga agli altri agenti.

---

## 🛠️ Comandi Disponibili

Dopo l'installazione, questi comandi saranno disponibili nel tuo terminale:

| Comando | Strumento | Descrizione |
|---|---|---|
| `ai-hub` | GUI Locale | Apre la dashboard e il marketplace nel browser |
| `ai-help` | Hub | Mostra la lista degli strumenti con esempi di utilizzo |
| `ai-update` | Updater | Aggiorna manualmente Wizard-AI e le skill clonate |
| `ai-graph [percorso]` | Graphify | Costruisce un knowledge graph da codice o documentazione |
| `ai-compress --file f.txt`| LLMLingua | Comprime prompt o contesto fino a 20x |
| `ai-rerank --query "X"` | FlashRank | Riordina componenti o paragrafi (RAG) per pertinenza |
| `ai-squeeze` | Sqz | Comprime l'output del terminale / JSON / log |
| `ai-convert file.pdf` | MarkItDown | Converte qualsiasi file in un pulito Markdown |
| `ai-mem store "testo"` | claude-mem | Memorizza un'informazione in modo semantico persistente |
| `ai-usage` | GeminiUsage | Traccia i consumi dei token e il budget Gemini |
| `ai-sync-skills` | Sync | Propaga le skill aggiornate a tutti gli agenti |
| `book-to-skill doc.pdf` | book-to-skill| Trasforma libri o manuali in skill per agenti AI |
| `litellm --port 4000` | LiteLLM | Gateway API unificato per oltre 100+ LLM |

---

## 🧠 Come Funzionano le Skill

Le skill sono file `SKILL.md` che spiegano agli agenti AI **quando e come** utilizzare ciascuno strumento. Ciascun agente legge la propria cartella:

| Agente | Directory delle Skill |
|---|---|
| Antigravity (Gemini CLI) | `~/.gemini/config/skills/` |
| Claude Code | `~/.claude/skills/` |
| Amp | `~/.config/amp/skills/` |

**`setup.sh` installa le skill una sola volta**. Eseguire `ai-sync-skills` le copia automaticamente in tutte le altre cartelle degli agenti.

### Sincronizzazione Skill Personalizzate

Ogni volta che scrivi o modifichi una skill, esegui:
```bash
ai-sync-skills
```
Questo script eseguirà il backup nel tuo repository locale sotto `skills/` e propagherà le modifiche agli altri agenti.

---

## 📁 Struttura del Progetto

```
wizard-ai/
├── bin/                    # Script wrapper CLI → copiati in ~/.local/bin/
│   └── windows/            # Port PowerShell dei wrapper (Windows)
├── skills/                 # File SKILL.md per gli agenti AI
├── docs/                   # Guide e documentazione
│   ├── WIKI.it.md          # 📚 Wiki centrale di tutte le skill e risorse
│   └── security-prompts/   # Prompt di audit sicurezza per codice AI
├── local/                  # Cartella ignorata (configurazione e cloni esterni)
├── setup.sh                # Installatore automatico (Linux / macOS)
├── setup.ps1               # Installatore automatico (Windows)
├── cli.js                  # Launcher npm (npx wizard-ai-cli)
├── package.json            # Manifest del pacchetto npm (wizard-ai-cli)
├── CONTRIBUTING.md         # Come aggiungere nuove skill
├── LICENSE                 # Licenza AGPLv3
└── README.md               # Questo file
```

---

## 🔒 Prompt di Audit di Sicurezza

Questo repository include una suite professionale di prompt per l'audit di sicurezza progettati specificamente per le **applicazioni generate tramite AI** (vibe coding).

Li puoi trovare nella cartella [`docs/security-prompts/`](docs/security-prompts/). Coprono:
- Segreti e Variabili d'Ambiente
- Sicurezza del Database (RLS, SQLi)
- Autenticazione e Pagamenti
- Vulnerabilità Frontend
- **Framework di Audit Finale Completo**

Usali con una sessione AI "zero-context" per individuare vulnerabilità prima del deploy in produzione.

---

## 🔧 La Variabile `$WIZARD_AI_DIR`

Dopo aver eseguito `setup.sh`, la tua shell disporrà della variabile `$WIZARD_AI_DIR` impostata sul percorso assoluto in cui si trova il repository:

```bash
echo $WIZARD_AI_DIR
# → /home/utente/wizard-ai
```

Su Windows viene salvata come **variabile d'ambiente utente**:
```powershell
echo $env:WIZARD_AI_DIR
# → C:\Users\utente\wizard-ai
```
Questo consente agli script e alle skill di fare riferimento a file interni in modo dinamico e portabile.

---

## 🤝 Contribuire

Vedi [CONTRIBUTING.it.md](CONTRIBUTING.it.md) per le istruzioni su come aggiungere skill, wrapper e miglioramenti.

---

## 🙏 Crediti

Wizard-AI integra questi eccellenti progetti open-source:

- [Graphify](https://github.com/safishamsi/graphify)
- [LLMLingua](https://github.com/microsoft/LLMLingua)
- [FlashRank](https://github.com/PrithivirajDamodaran/FlashRank)
- [MarkItDown](https://github.com/microsoft/markitdown)
- [Sqz](https://github.com/ojuschugh1/sqz)
- [claude-mem](https://github.com/thedotmack/claude-mem)
- [GeminiUsage](https://github.com/rmedranollamas/geminiusage)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Serena](https://github.com/oraios/serena)
- [ECC](https://github.com/affaan-m/ECC)
- [book-to-skill](https://github.com/virgiliojr94/book-to-skill)

---

## ⚖️ Licenza

Rilasciato sotto licenza [AGPLv3](LICENSE) — libero utilizzo, modifica e condivisione.
