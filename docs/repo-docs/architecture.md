# Wizard-AI Repository Architecture Standards

To maintain a clean and sustainable ecosystem for future AI agents, frameworks, and developers, this repository enforces strict architectural boundaries. **All new installations, skills, and tools must adhere to these rules.**

---

## Directory Specifications

### 1. `.agents/`
**Purpose:** Stores all IDE-specific configurations and autonomous agent workflows.
- **Rule:** AI IDE folders (`.claude/`, `.cursor/`, `.windsurf/`, `.pi/`) MUST be placed here. They must **never** pollute the root directory.
- **Rule:** Agent workflow scripts (`workflows/`, `agent/`) must reside here.
- *Note:* If an IDE automatically generates a folder at the root, you must configure a post-sync script or manually move it here.

### 2. `docs/`
**Purpose:** The central knowledge base.
- **Rule:** Contains wikis (`WIKI.md`), repository documentation (`repo-docs/`), and graph analyzer outputs (`graphify-out/`).

### 3. `packages/`
**Purpose:** Standalone projects, npm modules, frameworks, and external tools.
- **Rule:** Any new framework (e.g. `pi-cockpit-proxy-setup`, React apps, Node scripts that aren't single-file CLI tools) MUST be installed as a subdirectory inside `packages/`.
- **Rule:** Do not initialize generic `package.json` projects at the root.

### 4. `.cache/`
**Purpose:** Temporary files, raw data dumps, and cloned repositories.
- **Rule:** Any git repository cloned for referencing or processing MUST go into `.cache/.local-clones/`.
- **Rule:** Any raw markdown, JSON data, or temporary states must go into `.cache/`.

### 5. `skills/`
**Purpose:** The Wizard-AI Agentic Skills Definitions.
- **Rule:** This directory is strictly reserved for `SKILL.md` definitions and their immediately related scripts/assets.

### 6. `bin/` and `scripts/`
**Purpose:** Core system executables and utilities.
- **Rule:** Global CLI wrappers go into `bin/`.
- **Rule:** Automation python/js scripts go into `scripts/`.

### 7. Root Directory `/`
**Purpose:** High-level project entry point.
- **Rule:** MUST remain pristine. Only global config files (`package.json`, `setup.sh`, `AGENTS.md`, `README.md`) and the directories explicitly listed above are allowed here.

---

## Framework Integration Policy

When an AI agent or a user installs a new framework (e.g., Astro, Next.js, or an MCP server):
1. Create a new folder inside `packages/`.
2. Run the initialization script from within that folder.
3. Update `AGENTS.md` and `WIKI.md` to link to the new tool inside `packages/`.
