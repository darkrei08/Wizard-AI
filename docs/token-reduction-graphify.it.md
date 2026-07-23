# Riduzione Token: Graphify Setup

> 🇬🇧 [Read English](token-reduction-graphify.md)

Problema: AI rilegge file ogni sessione. Spreca token.
Soluzione: Graphify. Legge file una volta. Crea knowledge graph. Interroga in linguaggio naturale.

- Riduzione token: 71,5x.
- Supporta: 13 linguaggi, PDF, immagini, markdown.
- Esecuzione: Locale. Nessun DB, cloud, API key.
- GitHub: [github.com/safishamsi/graphify](https://github.com/safishamsi/graphify)

## 1. Installa Graphify
```bash
pip install graphifyy && graphify install
```
Tempo: 30 secondi. Registra skill in Claude Code.

## 2. Crea Knowledge Graph
Avvia Graphify in `~/.claude`.
Azione: Scansiona file. Crea grafo persistente. Aggiornamenti futuri incrementali.

## 3. Aggiungi Regola CLAUDE.md (CRITICO)
Risparmia token. Aggiungi in `~/.claude/CLAUDE.md`:

```markdown
## Context Navigation
Regole navigazione progetto:
1. Interroga PRIMA knowledge graph: `/graphify query "domanda"`
2. Leggi file grezzi SOLO se utente chiede "leggi file".
3. Usa `graphify-out/wiki/index.md` per navigare.
```

## Opzionale: Visualizza 3D (Obsidian)
Vedi grafo in 3D.
1. Installa [Obsidian](https://obsidian.md). Apri cartella progetto come vault.
2. Installa plugin 3D Graph (tramite BRAT):
   - Impostazioni → Plugin Comunità → Disattiva Modalità Restrittiva.
   - Installa BRAT. Lancia "BRAT: Add a beta plugin".
   - Incolla repo Aryan Gupta 3D Graph (v2.4.1). Attiva.
3. Apri grafo: "3D Graph: Open 3D Graph View".

### Impostazioni 3D
Migliora visibilità:
- Dimensione nodi: 6-8.
- Scala per connessioni: ON.
- Colori Gruppi (Graphify):
  - 0 (Core/Ingresso): Blu (`#3B82F6`)
  - 1 (Logica/Servizi): Verde (`#10B981`)
  - 2 (Dati/Modelli): Arancio (`#F59E0B`)
  - 3 (Config/Utility): Rosa (`#EC4899`)
  - 4 (Docs/Test): Viola (`#8B5CF6`)
  - 5+: Ciano, Rosso, Lime.
- Opacità link: 0.15-0.2.
- Spessore link: 1-2.
- Bloom/glow: ON.
- Sfondo: Scuro.
- Repulsione: Aumenta.

## Perché Importante
Costo 30-40 file: 15k-20k token/sessione.
Graphify: Paghi costo una volta. Grafo persiste.
Vantaggi:
- Costo una tantum.
- Aggiornamenti incrementali.
- Relazioni concettuali.
- Git hooks auto-ricostruzione.

## Automazione: /wiki-brain
Skill autonoma. Setup automatico 5 minuti. Esegui: `/wiki-brain`.
- Installa Obsidian/Graphify.
- Crea wiki (`raw/`, `wiki/`, `log.md`).
- Aggiunge regola CLAUDE.md.
- Aggiunge hook SessionEnd (ricostruisce grafo su mod file).
- Aggiunge comandi `/wiki-brain lint`, `/recall`.