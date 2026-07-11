---
name: auto-workflow
description: "REDIRECT WRAPPER — Il vecchio comando /auto-workflow reindirizza ora al nuovo sistema sequenziale di Loop-Engineering (01. loop-1-plan → 02. loop-2-develop → 03. loop-3-debug → 04. loop-4-refactor → 05. loop-5-release)."
---

# 🔄 auto-workflow → Redirect al Sistema dei 5 Loop Sequenziali

> **Nota di Compatibilità (v0.43.1+):** Il workflow monolitico `auto-workflow` è stato sostituito e suddiviso nei **5 Sequenced Loop-Engineering Workflows** (`01 → 05`).
> Questo file funge da **redirect pulito** per garantire che comandi storici o abitudini degli utenti continuino a funzionare perfettamente senza interrompere l'esperienza d'uso.

---

## 🗺️ Mappatura Automatica di Reindirizzamento

Quando un utente o un agente invoca `/auto-workflow` o `ai-workflow`, l'agente esegue il seguente smistamento verso i nuovi loop numerati:

1. **Se il task deve ancora essere analizzato o pianificato:**
   👉 Reindirizzamento automatico a **`01. loop-1-plan`** (Allineamento, Grilling, Specifiche e Architettura).

2. **Se esiste già un piano (`task.md`) e si deve scrivere codice:**
   👉 Reindirizzamento automatico a **`02. loop-2-develop`** (Branch isolato, TDD, Implementazione e Subagent).

3. **Se il task riguarda la correzione di un bug o la verifica di test falliti:**
   👉 Reindirizzamento automatico a **`03. loop-3-debug`** (Diagnosi in 4 fasi, Quality Gates e Code Review).

4. **Se il task riguarda il refactoring architetturale o la pulizia del debito tecnico:**
   👉 Reindirizzamento automatico a **`04. loop-4-refactor`** (Serena, Clean Code e Risparmio Token).

5. **Se il task è in fase di chiusura, merge o rilascio di versione:**
   👉 Reindirizzamento automatico a **`05. loop-5-release`** (Merge su main, SemVer Release, Handoff e Memoria `MEMORY.md`).

---

## ⚡ Esecuzione Istantanea (Fallback)

Se l'utente invoca `/auto-workflow` senza argomenti o con una richiesta di sviluppo generica, l'agente deve rispondere avviando immediatamente lo Step 01:
```bash
# Avvio automatico della sequenza
ai-loop 1   # oppure: /loop-1-plan
```
E seguire il ciclo in ordine numerato da 01 a 05 fino al completamento.
