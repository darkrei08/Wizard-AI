
## [Session State Snapshot] - 2026-06-19 17:45:33
v0.27.2: Integrato ai-storybloq per Windows e imposta esecuzione obbligatoria a fine prompt per session manager

## [Session State Snapshot] - 2026-06-19 18:08:00
v0.27.3: Mappato l'intero repository con graphify (generato graph.json e 131 community) e fixati i link rotti per il clone di graphify in setup.ps1 e setup.sh. Aggiunta cartella graphify-out/ in Git.

## [Session State Snapshot] - 2026-06-19 18:13:00
v0.27.4: Ottimizzazione drastica dei file setup.ps1 e setup.sh. Rimossi i cicli di clonazione massiva dei repository (React, Angular, Kafka, ecc.) che risultavano controproducenti per l'agente. Lo script ora si limita a installare i tool software necessari in base alla piattaforma (uv tools, claude-mem da github, ecc.), alleggerendo enormemente il processo di setup iniziale.

## [Session State Snapshot] - 2026-06-19 18:15:00
v0.27.5: Disinstallazione completa dell'ambiente locale di Wizard-AI. Rimossa fisicamente la directory `~/.ai-skills` e disinstallati tutti i tool globali installati via `uv tool` (graphify, litellm, markitdown, serena, sqz). Il sistema è ora pulito e pronto per una reinstallazione da zero con i nuovi script ottimizzati.

## [Session State Snapshot] - 2026-06-19 18:17:00
v0.27.6: Correzione di sicurezza sulla privacy. Anonimizzati i percorsi locali nel file MEMORY.md per evitare leak di username. Aggiornata la skill `auto-workflow` imponendo l'anonimizzazione rigorosa (es. `~/.ai-skills`) come regola obbligatoria durante ogni Session Save.

## [Session State Snapshot] - 2026-06-26 17:05:27
Integrated 14 stitch-* skills and design-md-spec skill. Created ai-designmd CLI wrapper using npx -y @google/design.md. Updated setup.sh with clones, NPM installs, and contributor credentials prompting. Updated ai-update, ai-help, and Wikis. Released version v0.32.0 on GitHub and published package to NPM.

