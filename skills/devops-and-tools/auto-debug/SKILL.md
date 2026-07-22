---
name: auto-debug
description: "Spec-kit for automated debug, quality control, linting, and auto-correction for Python projects. Use when debugging errors, running quality gates before a merge/release, or when the user wants automated code correction. Integrates with ruff, pytest, and the project's SQLite debug logger."
---

# auto-debug — Spec-Kit for Debug & Auto-Correction

Use this skill whenever:
- An error or exception is reported
- Before merging a branch to main
- Before creating a release tag
- When the user asks to "debug", "fix", or "check" the code
- Running CI-style quality gates locally

## The Debug Spec-Kit (Quality Gates)

Run all gates with:
```bash
wz-ai debug check           # full spec-kit (lint + format + type + tests)
wz-ai debug check --fix     # same + auto-correct fixable issues
wz-ai debug check --fast    # lint only (fastest)
```

## Gate 1 — Lint (ruff)

```bash
# Check for lint errors
python -m ruff check .

# Auto-fix what ruff can fix automatically
python -m ruff check . --fix

# Show detailed error explanations
python -m ruff check . --show-source
```

Common ruff rules for this project:
- `E` — pycodestyle errors
- `F` — pyflakes (undefined names, unused imports)
- `W` — warnings
- `I` — isort (import sorting)
- `B` — bugbear (common bugs)

## Gate 2 — Format (ruff format)

```bash
# Check formatting (no changes)
python -m ruff format --check .

# Auto-format all files
python -m ruff format .
```

## Gate 3 — Type Check (optional, pyright/mypy)

```bash
# If pyright is available
python -m pyright . 2>/dev/null || echo "pyright not installed, skipping"

# If mypy is available
python -m mypy . --ignore-missing-imports 2>/dev/null || echo "mypy not installed, skipping"
```

## Gate 4 — Tests (pytest)

```bash
# Run all tests, stop at first failure
python -m pytest -x -v

# Run with coverage
python -m pytest --cov=. --cov-report=term-missing

# Run only fast tests (skip slow/integration)
python -m pytest -m "not slow" -x
```

## Gate 5 — Security Check (`cybersecurity`)

```bash
# Check for known vulnerabilities in dependencies
pip-audit 2>/dev/null || echo "pip-audit not installed, skipping"

# Check for hardcoded secrets
grep -rn "password\|secret\|api_key\|token" --include="*.py" . | grep -v ".git\|test\|#"
```
*Note: Consult the Anthropic Cybersecurity Skills library (`~/.wizard-ai/cybersecurity-skills/skills/`) to perform framework-aligned code reviews (e.g. checking for OWASP Top 10).*

## Project-Specific Debug: SQLite Logger

This project has a built-in SQLite debug logging system. Use it to inspect runtime errors:

```bash
# View the debug database directly
python -c "
import sqlite3, json
con = sqlite3.connect('app_debug.sqlite')
cur = con.execute('SELECT timestamp, level, message, traceback FROM logs ORDER BY timestamp DESC LIMIT 20')
for row in cur:
    print(f'[{row[0]}] {row[1]}: {row[2]}')
    if row[3]: print(f'  TRACE: {row[3][:200]}')
"

# Or use the built-in viewer
python db_viewers.py
```

## Automated Error Analysis

When an error occurs, follow this exact sequence:

### Step 1: Capture the Error
```bash
# Run with error capture
python gui.py 2>&1 | tee /tmp/debug_output.txt

# Or check the SQLite logger
python -c "import sqlite3; [print(r) for r in sqlite3.connect('app_debug.sqlite').execute('SELECT * FROM logs WHERE level=\"ERROR\" ORDER BY timestamp DESC LIMIT 10')]"
```

### Step 2: Compress & Analyze (token-efficient)
```bash
# Use sqz to compress verbose tracebacks before analysis
cat /tmp/debug_output.txt | wz-ai squeeze
```

### Step 3: Identify Fix Pattern

| Error Type | Typical Cause | Auto-Fix |
|---|---|---|
| `NameError: name 'X' not defined` | Missing import or typo | Add import, check spelling |
| `TclError: unknown option` | tkinter/ttk API mismatch | Use ttk-compatible arguments |
| `AttributeError: 'NoneType'` | Uninitialized object | Add null check or defer init |
| `ImportError / ModuleNotFoundError` | Missing dependency | `uv add <package>` |
| `sqlite3.OperationalError` | Wrong table/column name | Inspect schema with `db_viewers.py` |
| `DeprecationWarning` | Old API usage | Update to current API |

### Step 4: Apply Fix & Verify
```bash
# After fixing, always re-run the spec-kit
wz-ai debug check

# If all gates pass, commit the fix
git add -p   # review each change
git commit -m "fix: <describe what was fixed>"
```

## Full Auto-Correction Pipeline

```bash
# Run this one-liner to lint + fix + format + report:
python -m ruff check . --fix && \
python -m ruff format . && \
python -m ruff check . && \
echo "✅ All checks passed — ready to commit"
```

## GitHub Actions CI (optional spec)

Add this to `.github/workflows/ci.yml` to run gates on every push:

```yaml
name: CI Quality Gates
on: [push, pull_request]
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: "3.11" }
      - run: pip install ruff pytest
      - run: ruff check .
      - run: ruff format --check .
      - run: pytest -x -v || echo "No tests yet"
```

## Rules for AI Agents

- NEVER skip Gate 1 (linting) before a commit.
- ALWAYS run `wz-ai debug check --fix` after a series of edits to auto-correct style issues.
- Use `wz-ai squeeze` to compress large tracebacks before putting them in context.
- Use `python db_viewers.py` to inspect the project's built-in SQLite debug log.
- If tests fail with cryptic errors, check the SQLite logger first.
- After auto-correcting, always run a dry-run to confirm (`ruff check .` with no `--fix`).
- For Tkinter/Tcl errors: always prefer `ttk` over `tk` widgets and avoid deprecated constructor kwargs.
