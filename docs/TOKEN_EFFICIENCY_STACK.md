# 🗜️ Wizard-AI — Token Efficiency & Context Compression Stack

Wizard-AI implements a **4-Layer Context Compression Stack** designed to reduce LLM input/output token usage by 60%–90% while retaining 100% technical accuracy.

---

## ⚡ The 4-Layer Efficiency Stack

| Layer | Tool | Purpose | Token Savings |
|-------|------|---------|---------------|
| **1. CLI Proxy** | `RTK` (Rust Token Killer) | Proxy wrapper around verbose CLI output (`git`, `ls`, `grep`, `npm`) | 60% – 90% |
| **2. Context Pruning** | `sqz` / `headroom` / `LLMLingua` | Prunes irrelevant code, boilerplate, and long stack traces | 50% – 75% |
| **3. Structured Formats** | `TOON` & `LEA` | `@toon-format/toon` JSON compression & Lossless Evidence Aliases | 40% – 75% |
| **4. Communication Mode** | `caveman` | Ultra-compressed technical responses (~75% reduction in conversational fluff) | ~65% |

---

## 📦 TOON & LEA Structured Context Formats

Wizard-AI provides built-in utilities in `scripts/wz-ai-context-formats.js`:

```javascript
const { toTOON, encodeLEA, compressContext } = require('./scripts/wz-ai-context-formats.js');

// 1. Convert JSON objects to TOON tabular format
const toonString = toTOON('skills', skillsArray);

// 2. Encode sources into LEA (Lossless Evidence Aliases) format
const leaContext = encodeLEA({
  sources: { S1: 'MEMORY.md', S2: 'PROJECT_STATUS.md' },
  evidence: [ { id: 'E1', source: 'S1', content: '...' } ],
  instruction: 'Analyze project state'
});
```

---

## 🗣️ Caveman Communication Mode

Enforces concise, direct technical communication:

```bash
# Enable caveman mode intensity levels:
/caveman lite | full | ultra
```

- **Pattern**: `[thing] [action] [reason]. [next step].`
- **Preserved**: All code blocks, git diffs, technical terms, error tracebacks.
- **Dropped**: Filler words, polite fluff, repetitive explanations.

---

## 🔗 Related Documentation
- [Cockpit Tools Proxy Guide](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/COCKPIT_PROXY_GUIDE.md)
- [Pi Agent Workflows](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/PI_AGENT_WORKFLOWS.md)
- [Skills Taxonomy](file:///mnt/NVMe2/00--Repo/wizard-ai/docs/SKILLS_TAXONOMY.md)
