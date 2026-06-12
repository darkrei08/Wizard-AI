# Prompt Sicurezza — Capitolo 3: Autenticazione e Pagamenti

> **Quando usarlo:** dopo aver aggiunto autenticazione e/o integrazione pagamenti.
> Apri una NUOVA conversazione con l'AI (zero context) e incolla il prompt sotto.

---

## Mini-Audit

```
Controlla la sicurezza dell'autenticazione e dei pagamenti nel mio progetto.
Per ogni punto, dimmi PASS o FAIL con il file e la riga esatta.
Se trovi un FAIL, fixa il problema immediatamente.

- [ ] RLS è abilitato su OGNI tabella del database (nessuna esclusa)
- [ ] Ogni tabella con RLS ha almeno una policy attiva
      (RLS abilitato SENZA policy = tutte le query tornano vuote)
- [ ] Le policy INSERT e UPDATE hanno clausole WITH CHECK
- [ ] Le policy usano auth.uid() per l'identità,
      NON auth.jwt()->'user_metadata'
- [ ] Il middleware esiste e gira su tutte le route protette
- [ ] Le route sono protette di default
      (allowlist di pagine pubbliche, NON blocklist di pagine protette)
- [ ] Il server usa getUser() per verificare l'identità,
      NON getSession()
- [ ] I token di sessione sono in cookie httpOnly,
      NON in localStorage o sessionStorage
- [ ] OGNI API route verifica l'autenticazione
      prima di processare la richiesta
- [ ] Il callback di autenticazione gestisce gli errori
      e non espone token negli URL o nei log
- [ ] CORS è configurato: solo il dominio dell'app può chiamare le API
      (niente Access-Control-Allow-Origin: *)
- [ ] Le chiavi Stripe segrete (sk_) NON appaiono nel codice lato client
- [ ] Il webhook Stripe valida la firma prima di processare gli eventi
- [ ] Il flusso di checkout usa Stripe Checkout o Payment Intents
      (mai raccogliere dati della carta direttamente)
```
