# Project Loops

Questi loop sono stati generati e salvati tramite la skill **Loopy** per l'esecuzione autonoma e ripetibile di task nel progetto Wizard-AI.

## 🔄 Autonomous Maintenance & Refactor Loop
**Use when:** Il progetto accumula debito tecnico minore, dipendenze da aggiornare o necessita di una passata strutturale seguendo i principi di `04. loop-4-refactor`.

**Prompt:**
```text
Analizza la codebase di Wizard-AI, cerca snippet duplicati, dipendenze CLI non allineate (in package.json o script bash) e ottimizza le dimensioni del contesto. Rimuovi YAGNI tramite la skill `ponytail`. Al termine, esegui la suite di test e salva un resoconto nel log. Ripeti l'azione per ogni macro-modulo in `skills/` e `bin/` finché non trovi più debito tecnico da consolidare.
```

**Verify:**
L'architettura è più coesa (minori linee di codice), nessun test fallisce, e non è stata rimossa alcuna funzionalità in produzione.

**Steps:**
1. **Discover:** Trova file duplicati o script Bash disallineati in `bin/`.
2. **Refactor:** Consolida il codice rimuovendo astrazioni premature.
3. **Verify:** Lancia l'intera suite di diagnostica o `auto-debug`.
4. **Stop:** Ferma il loop quando 2 moduli consecutivi non mostrano miglioramenti o il linter è al 100% verde.

---
