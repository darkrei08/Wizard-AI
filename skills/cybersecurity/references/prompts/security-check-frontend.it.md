# Prompt Sicurezza — Capitolo 4: Frontend e Produzione

> **Quando usarlo:** prima del deploy in produzione.
> Apri una NUOVA conversazione con l'AI (zero context) e incolla il prompt sotto.

---

## Mini-Audit

```
Controlla questi aspetti di sicurezza frontend nel mio progetto.
Per ogni punto, dimmi PASS o FAIL con il file e la riga esatta.
Se trovi un FAIL, fixa il problema immediatamente.

- [ ] Se l'app accetta upload di file: tipo e dimensione
      sono validati sul SERVER, non solo nel browser
- [ ] Nessun contenuto generato dall'utente viene renderizzato
      senza sanitizzazione (cerca: dangerouslySetInnerHTML, v-html,
      innerHTML, template literals che rendono contenuto utente)
- [ ] Le risposte di errore NON mostrano stack trace,
      path di file interni, o nomi di variabili d'ambiente
- [ ] I source map NON sono abilitati in produzione
      (permetterebbero a chiunque di vedere il codice sorgente)
```
