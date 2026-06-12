# 🧙‍♂️ Wizard-AI

> Un ecosistema completo di wrapper CLI per l'AI, strumenti di ottimizzazione dei token e skill per agenti — utilizzabile a livello globale da **qualsiasi agente AI** (Antigravity, Claude Code, Gemini CLI, GitHub Copilot, Amp, ecc.) e direttamente dal tuo terminale.

> 🇬🇧 [Read this README in English](README.md)

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](LICENSE)
[![Platform: Linux](https://img.shields.io/badge/Platform-Linux-blue.svg)]()
[![Shell: Bash](https://img.shields.io/badge/Shell-Bash-green.svg)]()
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

## 🚀 Avvio Rapido (3 Passaggi)

Per essere completamente autonomo, segui questi passaggi per installare e iniziare a usare l'ecosistema:

### 1️⃣ Clona il Repository
Clona il repository sul tuo computer locale:
```bash
git clone https://github.com/darkrei08/Wizard-AI.git ~/wizard-ai
cd ~/wizard-ai
```

### 2️⃣ Esegui l'Installatore
Esegui lo script principale di setup. È progettato per essere interamente non-interattivo e configura tutto automaticamente:
```bash
chmod +x setup.sh
./setup.sh
```

### 3️⃣ Verifica l'Installazione
Ricarica la shell per caricare le nuove variabili d'ambiente, poi avvia il menu di aiuto:
```bash
source ~/.bashrc   # o source ~/.zshrc
ai-help
```
Dovresti vedere una dashboard pulita che mostra lo stato di tutti gli strumenti.

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
| `ai-help` | Hub | Mostra tutti gli strumenti con esempi d'uso |
| `ai-graph [path]` | Graphify | Costruisce un grafo di conoscenza del codice |
| `ai-compress --file f.txt` | LLMLingua | Comprime prompt/contesti fino a 20x |
| `ai-rerank --query "X"` | FlashRank | Riordina i passaggi RAG per pertinenza |
| `ai-squeeze` | Sqz | Comprime output terminale / JSON / log |
| `ai-convert doc.pdf` | MarkItDown | Converte qualsiasi file in Markdown pulito |
| `ai-mem store "testo"` | claude-mem | Salva una memoria semantica persistente |
| `ai-usage` | GeminiUsage | Traccia l'uso e i costi dei token |
| `ai-sync-skills` | Sync | Propaga le skill a tutti gli agenti |
| `book-to-skill doc.pdf` | book-to-skill| Converte interi libri in skill pronte |
| `litellm --port 4000` | LiteLLM | Avvia il gateway API per 100+ LLM |

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
├── skills/                 # File SKILL.md per gli agenti AI
├── docs/                   # Guide e documentazione
│   ├── WIKI.it.md          # 📚 Wiki centrale di tutte le skill e risorse
│   └── security-prompts/   # Prompt di audit sicurezza per codice AI
├── local/                  # Cartella ignorata (configurazione e cloni esterni)
├── setup.sh                # Installatore automatico
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
Questo consente agli script e alle skill di fare riferimento a file interni in modo dinamico e portabile.

---

## 💎 Visione Futura e Programma Creatori (Monetizzazione)

### 🎯 Il Problema Che Stiamo Risolvendo

Oggi il mercato dell'AI è capovolto: **gli utenti finali e le piccole aziende pagano cifre spropositate ai grandi fornitori centralizzati** (OpenAI, Anthropic, Google) per strumenti generici, chiusi e con **gravi problemi di sicurezza**:

| ❌ Modello Attuale (Centralizzato) | ✅ Modello Wizard-AI (Locale + Open) |
|---|---|
| Il tuo codice sorgente viene inviato a server remoti | **I tuoi dati restano sulla tua macchina** |
| Zero controllo su come i dati vengono usati/archiviati | **Pieno controllo, zero dipendenza da terzi** |
| Abbonamenti costosi per strumenti generici | **Strumenti specializzati, gratuiti per sempre** |
| Lock-in: sei legato a un singolo provider | **Agnostico: funziona con qualsiasi agente AI** |
| Le skill della community arricchiscono solo il provider | **I creatori partecipano ai profitti** |

> **La nostra missione: capovolgere questo modello. Vogliamo che siano le grandi corporation a pagare noi per usare le nostre skill specializzate e sicure — non il contrario.**

### 🏢 Versione Enterprise / API Aziendale (Roadmap)

Stiamo costruendo una versione **Premium cloud-hosted** pensata esclusivamente per le grandi aziende:

- 🔐 **Deployment blindato**: istanze private, audit trail completo, compliance enterprise
- 🛡️ **Zero data leakage**: a differenza dei provider centrali, i dati aziendali non lasciano mai il perimetro autorizzato
- ⚡ **Skill curate e certificate**: accesso a un hub di strumenti validati dalla community, testati e mantenuti
- 📊 **Dashboard di governance**: monitoraggio centralizzato di tutti gli agenti AI in azienda
- 🔧 **Supporto dedicato e SLA**: assistenza prioritaria e garanzie di uptime

Le aziende pagheranno un canone per accedere a questo ecosistema — **gli utenti individuali e la versione open-source resteranno sempre gratuiti**.

### 🤑 Programma Creatori — Revenue Share (Robin Hood delle AI)

Ecco la parte più rivoluzionaria: **i profitti non resteranno solo al progetto**. Grazie alla nostra infrastruttura legale (AGPLv3 + [CLA](CLA.it.md)), abbiamo costruito un sistema di redistribuzione:

| Come Funziona | Dettaglio |
|---|---|
| 🛠️ **Crea una skill o un tool** | Sviluppa qualcosa di eccezionale e invia una Pull Request |
| ✅ **Viene accettata e integrata** | Il tuo contributo entra nell'ecosistema ufficiale |
| 📈 **Viene usata dalle aziende** | Tracciamo l'utilizzo delle skill nei contratti Enterprise |
| 💰 **Ricevi la tua fetta** | I ricavi (contratti aziendali + donazioni) vengono redistribuiti ai creatori in proporzione all'utilizzo e al valore della loro skill |

> 🧠 **Perché è diverso dal contribuire a un progetto open-source qualsiasi?**
>
> In quasi tutti gli ecosistemi open-source, il tuo lavoro gratuito arricchisce aziende che non ti daranno mai nulla in cambio. Qui è diverso: **ogni riga di codice che contribuisci oggi costruisce il tuo diritto a un revenue share domani**. Mantieni il copyright del tuo lavoro, e quando le corporation pagheranno per il nostro ecosistema, tu riceverai la tua parte.

### 📣 Chiamata agli Sviluppatori

Sei uno sviluppatore con un'idea geniale per uno strumento AI? **Questo è il momento giusto per unirti a noi:**

1. 🍴 Fai un fork di questo repo
2. 🔧 Crea la tua skill seguendo la [guida](CONTRIBUTING.it.md)
3. 📬 Apri una Pull Request
4. 🎉 Entra nel Programma Creatori e preparati a raccogliere i frutti

**Non regalare il tuo talento a ecosistemi chiusi. Costruisci qui, dove il tuo lavoro conta — e dove verrai ricompensato.**

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
