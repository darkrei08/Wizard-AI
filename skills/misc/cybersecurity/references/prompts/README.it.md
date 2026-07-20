# Prompt di Audit di Sicurezza per Codice Generato da AI

> 🇬🇧 [Read this guide in English](README.md)

Questa directory contiene prompt di audit di sicurezza pronti all'uso, progettati per applicazioni **"vibe coded"** — progetti costruiti principalmente utilizzando assistenti AI (Claude, Gemini, Cursor, Copilot, ecc.).

Questi prompt sono basati sulla OWASP Top 10 e sul database CWE, adattati specificamente ai pattern di vulnerabilità comunemente introdotti dalla generazione di codice con AI.

## 📋 Come Usarli

1. Apri una **NUOVA conversazione** con la tua AI (zero context è importante per l'imparzialità)
2. Copia l'intero contenuto del file prompt desiderato
3. Incollalo nella conversazione
4. L'AI analizzerà il tuo codebase e darà un verdetto per ogni punto di controllo

## 📁 Prompt Disponibili

| File | Ambito | Quando Usarlo |
|---|---|---|
| [security-check-secrets.it.md](security-check-secrets.it.md) | API key, variabili d'ambiente, segreti esposti | Dopo il setup iniziale del progetto |
| [security-check-database.it.md](security-check-database.it.md) | SQL injection, RLS, chiavi di servizio | Dopo l'integrazione del database |
| [security-check-auth.it.md](security-check-auth.it.md) | Auth, sessioni, CORS, pagamenti | Dopo aver aggiunto auth/pagamenti |
| [security-check-frontend.it.md](security-check-frontend.it.md) | XSS, upload, leak errori, source map | Prima del deploy in produzione |
| [security-audit-full.it.md](security-audit-full.it.md) | **Audit completo** (tutti i controlli combinati) | Revisione finale pre-lancio |

## 🎯 Priorità per Gravità

Correggi i finding in questo ordine:
1. **CRITICO** — Ferma tutto e correggi immediatamente
2. **ALTO** — Correggi prima di qualsiasi deploy
3. **MEDIO** — Correggi entro lo stesso sprint (sotto i 10 minuti ciascuno)
4. **BASSO** — Documenta per miglioramenti futuri
