---
name: os-detect
description: >
  MASTER PRE-INSTALL SKILL. Call this BEFORE installing ANY software, package,
  CLI tool, Python library, Node module, Rust crate, or system dependency.
  Provides cross-platform OS detection and a unified installation interface
  (ai-os) that works on Arch, Ubuntu, Fedora, macOS, WSL, Windows and more.
  This skill is a mandatory gate — no installation happens without it.
---

# os-detect — Master Pre-Install Hook (Global)

> **This is a mandatory pre-installation gate for the entire Wizard-AI ecosystem.**
> Any skill, script, or agent that needs to install ANYTHING must route through
> `ai-os` before calling any package manager directly.

## When to Use This Skill

Use `os-detect` / `ai-os` in **ALL** of the following cases:

| Scenario | Correct action |
|---|---|
| Install a system package (git, curl, jq, gh…) | `ai-os install <pkg>` |
| Install a Python package/tool | `ai-os python <pkg>` |
| Install a Node.js package | `ai-os node <pkg>` |
| Install a Rust crate | `ai-os cargo <pkg>` |
| Install a Go binary | `ai-os go <pkg>` |
| Install via uv tool | `ai-os uv <pkg>` |
| Check if tool is present, install if missing | `ai-os ensure <tool>` |
| Know which package manager to use | `ai-os pm` |
| Get full OS environment report | `ai-os info` |
| Run any pre-install environment check | `ai-os pre-check` |

## CRITICAL Rules for ALL AI Agents

> [!IMPORTANT]
> **NEVER write a raw install command directly.**
> Always use `ai-os` as the abstraction layer.

```
❌ WRONG:  sudo apt install gh
❌ WRONG:  sudo pacman -S github-cli
❌ WRONG:  brew install gh
❌ WRONG:  pip install ruff
❌ WRONG:  npm install -g <pkg>

✅ CORRECT: ai-os install gh
✅ CORRECT: ai-os python ruff
✅ CORRECT: ai-os node <pkg>
✅ CORRECT: ai-os ensure gh
```

> [!NOTE]
> `ai-os` detects the OS automatically and maps tool names to the correct
> package name for each platform (e.g. `github-cli` on Arch, `gh` on apt/dnf).

## Full Command Reference

```bash
# ── OS Information ──────────────────────────────────────────────────────────
ai-os info              # Full report: OS, distro, PM, tool status, JSON
ai-os type              # → linux | macos | wsl | windows
ai-os pm                # → pacman | apt | dnf | brew | winget | apk | zypper
ai-os distro            # → arch | ubuntu | debian | fedora | macos | alpine …
ai-os pre-check         # Run full pre-install environment validation

# ── System Packages ─────────────────────────────────────────────────────────
ai-os install <pkg>     # Install using the OS package manager (pacman/apt/dnf…)
ai-os ensure <pkg>      # Install only if missing (idempotent — safe to call always)
ai-os check <tool>      # Exit 0 if installed, exit 1 if missing (for scripting)
ai-os remove <pkg>      # Uninstall using the OS package manager

# ── Language Ecosystems ─────────────────────────────────────────────────────
ai-os python <pkg>      # Python: uv tool install (preferred) or pip install
ai-os pip <pkg>         # Python: pip install in current venv
ai-os uv <pkg>          # Python: uv tool install globally
ai-os node <pkg>        # Node.js: npm install -g (or pnpm/yarn if available)
ai-os cargo <pkg>       # Rust: cargo install
ai-os go <pkg>          # Go: go install <pkg>@latest

# ── GitHub CLI Setup ────────────────────────────────────────────────────────
ai-os install gh        # Install gh with correct PM for this OS
ai-os gh-setup          # Install gh + run gh auth login (full setup)

# ── Batch Operations ────────────────────────────────────────────────────────
ai-os ensure git gh jq curl   # Ensure multiple tools at once
```

## Supported Platforms

| OS | Distro / Variant | Package Manager | Auto-detected via |
|---|---|---|---|
| Linux | Arch / CachyOS / Manjaro / Garuda | `pacman` + AUR | `ID_LIKE=arch` |
| Linux | Ubuntu / Debian / Mint / Pop!_OS | `apt` | `ID=ubuntu` or `ID=debian` |
| Linux | Fedora / RHEL / Rocky / Alma | `dnf` | `ID=fedora` |
| Linux | openSUSE / SLED | `zypper` | `ID=opensuse` |
| Linux | Alpine | `apk` | `ID=alpine` |
| macOS | All (Intel + Apple Silicon) | `brew` | `uname -s = Darwin` |
| Windows WSL | Ubuntu/Debian via WSL | `apt` | `/proc/version` contains `microsoft` |
| Windows | Native PowerShell | `winget` / `choco` | `$OS=Windows_NT` |

## Package Name Mapping

`ai-os` resolves tool names to the correct package name per platform:

| Tool | pacman | apt | dnf | brew | winget |
|---|---|---|---|---|---|
| `gh` | `github-cli` | `gh` | `gh` | `gh` | `GitHub.cli` |
| `jq` | `jq` | `jq` | `jq` | `jq` | `jqlang.jq` |
| `curl` | `curl` | `curl` | `curl` | `curl` | `cURL.cURL` |
| `git` | `git` | `git` | `git` | `git` | `Git.Git` |
| `node` | `nodejs` | `nodejs` | `nodejs` | `node` | `OpenJS.NodeJS` |
| `python3` | `python` | `python3` | `python3` | `python@3` | `Python.Python.3` |
| `ruff` | via `uv` | via `uv` | via `uv` | `ruff` | via `uv` |

## Integration Pattern for Scripts

Any Wizard-AI script that needs to install something must include this pattern
at the top, **before any installation logic**:

```bash
#!/usr/bin/env bash
# ... script header ...

# ── Locate ai-os (mandatory pre-install hook) ──────────────────────────────
AI_OS_CMD=""
if   command -v ai-os              &>/dev/null; then AI_OS_CMD="ai-os"
elif [ -x "$HOME/.local/bin/ai-os" ];           then AI_OS_CMD="$HOME/.local/bin/ai-os"
elif [ -x "$HOME/.wizard-ai/bin/ai-os" ];       then AI_OS_CMD="$HOME/.wizard-ai/bin/ai-os"
else
  echo "⚠️  ai-os not found. Install it: cp ~/.wizard-ai/bin/ai-os ~/.local/bin/"
  # Fallback: do NOT hardcode apt/pacman/brew here — fail gracefully
  exit 1
fi

# Then use it:
"$AI_OS_CMD" ensure gh      # system package
"$AI_OS_CMD" python ruff    # python tool
"$AI_OS_CMD" node prettier  # node package
```

## Integration with wizard-ai-installer

The `wizard-ai-installer` Step 1 MUST call `ai-os` instead of using
`uv tool install` or `npm install -g` directly:

```bash
# Step 1 (Python tool):  ai-os uv <package>
# Step 1 (Node tool):    ai-os node <package>
# Step 1 (System tool):  ai-os install <package>
# Step 1 (GitHub repo):  git clone ... (no change needed)
```

## post-install hooks

After installing, `ai-os` automatically runs post-install hints:
- `gh` → reminds to run `gh auth login`
- `brew` → reminds to add brew to PATH
- `node/npm` → checks if pnpm/yarn is preferred
