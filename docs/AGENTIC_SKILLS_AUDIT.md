# Audit: Agentic Guidance / Orchestration Skills

> Generato 2026-07-26. Scope: skill il cui scopo è orchestrare, instradare, gestire subagent, o definire processi di sviluppo — non skill di dominio (react, python, ecc).

## Cosa è reale vs cosa è prosa

- **Motore reale**: `workflows/*.js` (repo, usa primitive `agent()/parallel()/phase()/checkpoint()`) + `.pi/pi-extensible-workflows/roles/*.md` + `settings.json`. Gira SOLO sotto host pi.dev con l'estensione `pi-extensible-workflows` installata. Sotto Claude Code (o altri host) questi `.js` sono testo inerte finché non c'è un tool `workflow` disponibile.
- **~85% delle skill di orchestrazione è prosa pura**: nessun hook, gate CI o script blocca davvero la non conformità. Il linguaggio `<MANDATORY>`/"NEVER-STOP" è solo enfasi testuale, non enforcement.
- Wrapper reali che fanno davvero qualcosa: `wz-ai-*` (branch, release, graph, session-save, ecc), `auto-prompt` (wrappa `llm` CLI), `skill-creator` (script `.py` reali).
- Script "advisory" che stampano ma non eseguono: `wz-ai-loop-sentinel` (regex→suggerisce loop, non instrada nulla), `wz-ai-goodcode` (echo, zero logica).

## Categorie

| Categoria | Skill |
|---|---|
| (a) Master Orchestrator | `0-loop-engine`, `0-master-brain`, `workflow-production-cycle`, `master-project-bootstrap`, `gentle-ai`, `wizard-ai-core` |
| (b) Router | `1-auto-router` (+ `wz-ai-loop-sentinel` bash, scollegato) |
| (c) Subagent dispatch | `3-shadow-clone-parallelism`, `4-swarm-manager`, `5-goodcode-orchestrator`, `cavecrew`, `subagent-driven-development`, `orchestration`(Orca), `orca-cli`, `pi-extensible-workflows` |
| (d) Standard di processo (SDD/TDD/gate) | `engineering-excellence`, `enterprise-development-protocol`, `test-driven-development`, `mp-tdd`, `systematic-debugging`, `diagnosing-bugs`/`mp-diagnosing-bugs`, `verification-before-completion`, `brainstorming`, `writing-plans`, `executing-plans`, `receiving-code-review`, `mp-code-review`, `finishing-a-development-branch`, `using-git-worktrees`, `loop-1-plan`…`loop-5-release` |
| (e) Sessione/memoria | `session-manager`, `handoff`/`mp-handoff` |
| (f) Skill discovery | `using-superpowers`, `show-active-skill`, `2-wizard-hub`, `skill-creator` |
| (g) Git lifecycle | `auto-branch`, `auto-release`, `auto-trigger-release`, `finishing-a-development-branch` |
| (h) Altro | `auto-graphify`, `auto-prompt`, `loopy`, `mp-loop-me`, `mp-triage`, `mp-wayfinder`, `grilling` family, `wizard-ai-installer`, `workflow-*-research/design/processing/integrations`, `writing-skills` |

## Sovrapposizioni trovate

1. **Collisione autorità "supreme skill" (4 vie)**: `0-loop-engine`, `workflow-production-cycle`, `master-project-bootstrap`, `gentle-ai` si autodichiarano tutte "obbligatorie/supreme" senza regola di precedenza esplicita tra loro. `workflow-production-cycle` re-deriva sostanzialmente la stessa pipeline a 5 fasi di `0-loop-engine` + i gate di `enterprise-development-protocol`.
2. **`wizard-ai-core`** è un indice sottile (28 righe) che duplica `2-wizard-hub` (stessa CLI `wz-ai`, stesso scopo discovery).
3. **Router scollegato dal suo enforcement**: `1-auto-router` (prosa) e `wz-ai-loop-sentinel` (bash) classificano entrambi intent→loop con logica indipendente, nessuno dei due è autoritativo sull'altro.
4. **Subagent dispatch, 6+ skill senza regola di selezione**: `3-shadow-clone-parallelism` vs `4-swarm-manager` vs `subagent-driven-development` vs `5-goodcode-orchestrator` descrivono lo stesso meccanismo base (subagent isolati, contesto shardato) differendo solo in cerimonia. Nessuna dice "usa questa invece di quella". `pi-extensible-workflows` (l'unico con motore reale) non referenzia nessuna delle altre quattro.
5. **`test-driven-development` vs `mp-tdd`**: stesso trigger, stessa autorità sul ciclo RED-GREEN-REFACTOR, nessun cross-reference.
6. **Sessione/memoria, 3 vie**: `session-manager`, `handoff`/`mp-handoff`, e `0-master-brain` (che dichiara di "fondere" `mp-handoff` in sé) rivendicano tutte la gestione dello stato di fine sessione.
7. **Riferimenti morti**: `using-superpowers` e `show-active-skill` puntavano a `prompt-loop-engine` (skill rinominata `0-loop-engine`, file vecchio cancellato) — **fixato in questa sessione**.
8. **Doppioni file byte-identici o quasi**, stesso contenuto sotto due nomi/directory diversi (probabile causa: doppio canale di installazione, short-name + prefisso autore `mp-`):
   - `handoff` / `mp-handoff`
   - `grilling` / `mp-grilling` (+ wrapper sottili `mp-grill-me`, `mp-grill-with-docs`)
   - `diagnosing-bugs` / `mp-diagnosing-bugs`

## Cosa già scopato correttamente (non toccare)

- `engineering-excellence` vs `enterprise-development-protocol`: si disambiguano a vicenda nel proprio frontmatter (per-task vs audit whole-project), esempio di scoping corretto.
- `orchestration` (Orca) vs `orca-cli`: si disambiguano esplicitamente ("usa X invece di Y") nella propria description.

## Fix applicati in questa sessione

- `cli.js`: self-heal automatico (backup + reclone) invece di fail hard quando `~/.wizard-ai` esiste senza `.git`.
- `0-loop-engine` + `1-auto-router`: aggiunta chiamata esplicita al tool `workflow` (pi-extensible-workflows) verso `workflows/<loop>.js` quando disponibile, con fallback a esecuzione prosa quando non disponibile (es. Claude Code).
- `using-superpowers`, `show-active-skill`: rimosso riferimento morto a `prompt-loop-engine` → `0-loop-engine`/`1-auto-router`.
- `workflow-frontend-design`: wired `kinetics-ui` e `mengto-skills` nella chain reale (erano solo citati).
- `enterprise-development-protocol` + `loop-4-refactor`: scope esplicito per evitare doppio trigger con `engineering-excellence`.

## Proposta non ancora eseguita (richiede conferma utente)

Creare skill master `wizard-ai-orchestration` (nuovo repo GitHub personale) che consolida SOLO la categoria (c) Subagent dispatch in un'unica skill parametrica (livello di rigore: light/swarm/exhaustive/adversarial invece di 4 skill separate), e deprecare/rimuovere i doppioni byte-identici in (h). Non eseguito: creare repo esterno è azione visibile/esterna, richiede ok esplicito.
