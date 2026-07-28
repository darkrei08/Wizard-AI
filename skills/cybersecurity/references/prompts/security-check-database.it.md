# Prompt Sicurezza — Capitolo 2: Database

> **Quando usarlo:** dopo l'integrazione del database.
> Apri una NUOVA conversazione con l'AI (zero context) e incolla il prompt sotto.

---

## Mini-Audit

```
Controlla la sicurezza del database nel mio progetto.
Per ogni punto, dimmi PASS o FAIL con il file e la riga esatta.
Se trovi un FAIL, fixa il problema immediatamente.

- [ ] La chiave service_role / admin NON appare MAI
      nel codice lato client (componenti, pagine)
- [ ] Nessuna query SQL usa concatenazione di stringhe o template literals
      (rischio SQL injection). Tutte le query sono parametrizzate.
```
