# Prompt Sicurezza — Capitolo 1: Segreti e API

> **Quando usarlo:** dopo il setup iniziale del progetto.
> Apri una NUOVA conversazione con l'AI (zero context) e incolla il prompt sotto.

---

## Mini-Audit

```
Controlla il codice del mio progetto per questi problemi di sicurezza.
Per ogni punto, dimmi PASS (✅) o FAIL (❌) con il file e la riga esatta.
Se trovi un FAIL, risolvi il problema immediatamente.

- [ ] Nessuna API key scritta direttamente nel codice
      (cerca: sk_, pk_, Bearer, eyJ, ghp_, xoxb-, AKIA,
      stringhe alfanumeriche lunghe tra virgolette)
- [ ] Tutte le chiavi sono in .env e referenziate come variabili d'ambiente
- [ ] Il file .env è elencato nel .gitignore
- [ ] Le chiavi segrete NON usano prefissi pubblici
      (NEXT_PUBLIC_, VITE_, REACT_APP_)
- [ ] Nessun console.log che stampa chiavi, token o segreti
- [ ] Tutte le chiamate ad API esterne passano dalle API routes del server,
      MAI direttamente dal codice del browser
- [ ] L'input dei form è validato sia nel browser che sul server
```
