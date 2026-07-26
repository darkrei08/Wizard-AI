I'll start by checking the knowledge graph for relevant symbols, then read the candidate files.

**Tool: bash**

Input:
```json
{"command":"powershell -Command \"Select-String -Path 'graphify-out/graph.json' -Pattern 'cli.js|bin/wz-ai|bin/wizard-ai|\\\"index.js\\\"' | Select-Object -First 20\"","description":"Search graph.json for relevant file references"}
```
