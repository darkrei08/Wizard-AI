# Riduzione dei Token con Graphify — Guida Completa al Setup

> 🇬🇧 [Read this guide in English](token-reduction-graphify.md)

La maggior parte delle persone spreca token rileggendo gli stessi file ad ogni sessione. Esiste una soluzione — e richiede 2 minuti per configurarla.

Andrej Karpathy — colui che ha coniato il termine "vibe coding" — ha evidenziato un problema che ogni utente di Claude Code conosce: ogni volta che inizi una nuova sessione, la tua AI deve rileggere l'intero progetto da zero. Sono migliaia di token sprecati prima ancora di porre la prima domanda.

Qualcuno ha costruito la soluzione in 48 ore. Si chiama **Graphify** — una skill open-source per Claude Code che legge i tuoi file una sola volta, costruisce un grafo di conoscenza, e poi ti permette di interrogare l'intero progetto in linguaggio naturale senza rileggere un singolo file.

- La riduzione di token riportata è di **71,5x** rispetto alla lettura diretta dei file
- Funziona con codice (13 linguaggi), PDF, immagini e markdown
- Gira interamente in locale — nessun database, nessun cloud, nessuna API key

GitHub: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

---

## Step 1: Installa Graphify

Apri il terminale e incolla questo comando:

```bash
pip install graphifyy && graphify install
```

Fatto. Succedono due cose: il pacchetto Python si installa e Graphify si registra come skill di Claude Code. Richiede circa 30 secondi.

---

## Step 2: Costruisci il Grafo di Conoscenza

All'interno di Claude Code, naviga nella tua cartella `~/.claude` e avvia la skill Graphify:

Questo scansiona ogni file nella tua cartella di configurazione Claude — il tuo CLAUDE.md, le skill, i file di memoria, tutto — e costruisce un grafo di conoscenza persistente. La prima esecuzione richiede un po' di tempo a seconda di quanti file hai. Dopo di che, è incrementale.

Una volta completato, la tua AI può interrogare l'intera struttura del tuo setup in linguaggio naturale senza rileggere un singolo file.

---

## Step 3: Aggiungi la Regola nel CLAUDE.md

Questo è il passaggio che la maggior parte delle persone salta — ed è quello che effettivamente risparmia i token. Aggiungi questo al tuo file `~/.claude/CLAUDE.md`:

```markdown
## Context Navigation
Quando devi comprendere il codebase, i docs o qualsiasi file in questo progetto:
1. Interroga SEMPRE il grafo di conoscenza prima: `/graphify query "la tua domanda"`
2. Leggi i file grezzi solo se dico esplicitamente "leggi il file" o "guarda il file raw"
3. Usa `graphify-out/wiki/index.md` come punto di ingresso per navigare la struttura
```

Questo dice a Claude di controllare il grafo di conoscenza PRIMA invece di rileggere i file grezzi ogni volta. È da qui che viene il risparmio di 71,5x sui token.

---

## Opzionale: Visualizzazione 3D in Obsidian

Questo è opzionale ma onestamente ne vale la pena — puoi visualizzare l'intero grafo di conoscenza in 3D ed è spettacolare.

1. Scarica [Obsidian](https://obsidian.md) se non lo hai già. Apri la cartella del tuo progetto come vault.

2. Installa il plugin 3D Graph:
   - Vai in Impostazioni → Plugin della Comunità → Disattiva la Modalità Restrittiva
   - Clicca "Sfoglia" e cerca **BRAT** — installalo e attivalo
   - Apri la palette comandi (Cmd+P) e lancia "BRAT: Add a beta plugin"
   - Incolla il repo del 3D Graph di Aryan Gupta (versione 2.4.1)
   - Attiva il plugin nella lista dei Plugin della Comunità

3. Apri il grafo 3D dalla palette comandi: "3D Graph: Open 3D Graph View"

### Impostazioni Visive Consigliate

Le impostazioni predefinite sono noiose. Ecco cosa modificare:

- Imposta la dimensione base dei nodi a **6-8** (il default è troppo piccolo)
- Attiva **"Scala per connessioni"** così i concetti principali appaiono più grandi
- **Colori dei Gruppi** (Graphify raggruppa i tuoi file in comunità):
  - Gruppo 0 (Core/Ingresso): Blu elettrico — `#3B82F6`
  - Gruppo 1 (Logica/Servizi): Verde smeraldo — `#10B981`
  - Gruppo 2 (Dati/Modelli): Arancione ambra — `#F59E0B`
  - Gruppo 3 (Config/Utility): Rosa acceso — `#EC4899`
  - Gruppo 4 (Docs/Test): Viola — `#8B5CF6`
  - Gruppo 5+: Cicla tra ciano `#06B6D4`, rosso `#EF4444`, lime `#84CC16`

- Imposta l'opacità dei collegamenti a **0.15-0.2**
- Imposta lo spessore dei collegamenti a **1-2**
- Attiva bloom/glow se supportato
- Imposta lo sfondo su **scuro/nero** per il miglior contrasto
- Aumenta leggermente la forza di repulsione per far espandere i cluster

> **Suggerimento:** Non sai quali gruppi corrispondono a cosa nel tuo progetto? Incolla questo prompt in Claude Code:
> ```
> Leggi graphify-out/GRAPH_REPORT.md e lista ogni numero di comunità/gruppo
> con una breve descrizione dei file e concetti contenuti.
> Per ogni gruppo, suggerisci un colore esadecimale che ne rappresenti visivamente lo scopo.
> Formatta il tutto come una tabella che posso usare per configurare i colori del plugin 3D Graph in Obsidian.
> ```

---

## Perché è Importante

Ecco la matematica a cui la maggior parte delle persone non pensa. Un progetto con 30-40 file può costare **15.000-20.000 token** solo per ristabilire il contesto all'inizio di ogni sessione. Se fai 20 sessioni a settimana, sono 300.000-400.000 token che non producono assolutamente nulla.

Con Graphify, quel costo lo paghi **una sola volta**. Il grafo persiste tra le sessioni. Ogni sessione futura inizia con la tua AI che conosce già la struttura del tuo progetto.

Vantaggi chiave:
- **Costo di costruzione una tantum** vs. rilettura ad ogni sessione
- Il grafo si **aggiorna incrementalmente** quando i file cambiano
- Puoi interrogare le **relazioni tra concetti**, non solo cercare parole chiave
- Ha **git hooks** che ricostruiscono il grafo automaticamente ad ogni commit

> 💡 **Installa Graphify una volta, risparmia token per sempre.** I 2 minuti necessari per configurarlo si ripagano nella prima sessione.

---

## L'Alternativa Automatizzata: /wiki-brain

Vuoi la versione chiavi in mano? La skill `/wiki-brain` esegue tutti e 3 i passaggi sopra automaticamente:

- Ti guida nell'installazione di Obsidian (o usa il vault esistente)
- Installa automaticamente Graphify
- Crea la struttura delle cartelle wiki (`raw/` per le sorgenti, `wiki/` per le pagine mantenute da Claude, `log.md` per la timeline)
- Mostra un'anteprima del blocco Context Navigation prima di aggiungerlo al CLAUDE.md
- Installa un hook SessionEnd che ricostruisce il grafo solo quando i file sono cambiati
- Aggiunge il comando `/wiki-brain lint` per il controllo di salute della wiki
- Aggiunge `/recall` — mostra le ultime 5 attività

Basato sul pattern LLM Wiki di Andrej Karpathy — ogni conversazione alimenta un wiki personale cumulativo che puoi sfogliare in Obsidian.

Apri Claude Code e digita `/wiki-brain`. Pone 4 semplici domande e gestisce tutto il resto. Il setup richiede circa 5 minuti.