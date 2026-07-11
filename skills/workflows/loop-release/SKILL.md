---
name: loop-release
description: "🚀 RELEASE LOOP — Ciclo completo di rilascio: test → review → merge → tag → publish. Concatena: verify → code-review → finishing-branch → auto-release → npm-publish → graphify. Richiamabile con /loop-release o keyword: release, pubblica, rilascia, deploy, versione."
---

# 🚀 Loop-Release — Release & Delivery Loop

> **Il ciclo deterministico per rilasciare software testato e verificato.**
> Nessuna release senza test verdi e review completata.

<MANDATORY>
Questo workflow è il SOLO modo per rilasciare una versione.
NON eseguire mai `git tag`, `npm publish`, o `ai-release` fuori da questo loop.
</MANDATORY>

---

## Trigger Keywords
`release`, `pubblica`, `rilascia`, `deploy`, `versione`, `tag`, `bump version`, `/loop-release`

---

## 🚀 Il Loop (7 Step)

```
┌─→ [1] VERIFY    — verification-before-completion
│   [2] REVIEW    — requesting-code-review
│   [3] MERGE     — finishing-a-development-branch
│   [4] RELEASE   — auto-release (semver + changelog + tag)
│   [5] PUBLISH   — auto-npm-publish (se applicabile)
│   [6] INDEX     — auto-graphify (aggiorna knowledge graph)
└─← [7] RECOVER   — Se build/test falliscono → loop-debug → ritorna
    [✓] SHIPPED   — session-manager save
```

---

### Step 1: VERIFY — Pre-Release Verification
**Skill:** `verification-before-completion`

1. Esegui TUTTI i test
2. Esegui lint e format check
3. Verifica build production: `npm run build` o equivalente
4. Controlla che non ci siano TODO critici nel codice
5. Verifica che `CHANGELOG.md` sia aggiornato

**Exit Criteria:** ✅ Test verdi, ✅ Build OK, ✅ Changelog pronto.

### Step 2: REVIEW — Final Review
**Skill:** `requesting-code-review`, `mp-code-review`

1. Genera diff summary dall'ultimo release
2. Review automatica:
   - Breaking changes? → bump MAJOR
   - Nuove feature? → bump MINOR
   - Solo fix? → bump PATCH
3. Se ci sono issue critiche → STOP e torna a `loop-debug` o `loop-refactor`

**Exit Criteria:** Semver level determinato, nessuna issue critica.

### Step 3: MERGE — Strategia di Merge
**Skill:** `finishing-a-development-branch`

1. Presenta opzioni all'utente:
   - **Fast-forward merge** (se branch è lineare)
   - **Merge commit** (se branch ha divergenze)
   - **Squash merge** (per branch con tanti commit piccoli)
2. Esegui il merge
3. Verifica che main/staging sia integro dopo il merge

**Exit Criteria:** Branch integrato, main/staging pulito.

### Step 4: RELEASE — Semantic Versioning
**Skill:** `auto-release`

1. Bump version secondo il livello determinato (patch/minor/major)
2. Aggiorna:
   - `package.json` → nuova versione
   - `CHANGELOG.md` → entry con data e dettagli
3. Crea git tag: `vX.Y.Z`
4. Push tag e commit

**Comando:** `ai-release <patch|minor|major>`

**Exit Criteria:** Tag creato, push completato.

### Step 5: PUBLISH — Package Publishing
**Skill:** `auto-npm-publish`

1. Se il progetto ha un `package.json` con `publishConfig`:
   - Esegui `npm publish`
   - Verifica pubblicazione su npm
2. Se non è un pacchetto npm: skip

**Exit Criteria:** Pacchetto pubblicato (o step skippato).

### Step 6: INDEX — Knowledge Graph Update
**Skill:** `auto-graphify`

1. Aggiorna il knowledge graph del progetto
2. Esegui `ai-graph .` per rigenerare le connessioni
3. Questo migliora le query future sul codebase

**Exit Criteria:** Graph aggiornato.

### Step 7: RECOVER — Recovery Loop

**Se qualcosa fallisce durante il release:**
- ❌ Test falliti al Step 1 → `loop-debug` automatico, poi ritorna a Step 1
- ❌ Build fallita → fix immediato, poi ritorna a Step 1
- ❌ Merge conflicts → `mp-resolving-merge-conflicts`, poi ritorna a Step 3
- ❌ npm publish fallita → verifica credenziali, retry
- ✅ Tutto OK → procedi a SHIPPED

### ✅ SHIPPED — Release Completata

1. **Save session state:** `ai-session-save`
2. **Aggiorna MEMORY.md** con version snapshot
3. **Notifica** (se configurato): summary del release
4. Output finale: versione, changelog entry, link npm

---

## Self-Check

> ☐ Tutti i test sono passati PRIMA del tag?
> ☐ Il CHANGELOG è stato aggiornato con i dettagli?
> ☐ Il semver level è corretto (non ho fatto MAJOR per un fix)?
> ☐ Ho verificato che il pacchetto pubblicato sia corretto?
