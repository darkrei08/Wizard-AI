---
name: python
description: "Python development skill. Emphasize type hinting and virtual environments."
---

# Python Development

> **TRIGGER HOOK**: Read this BEFORE answering if user mentions `python`, `pip`, `uv`, `venv`, `pyproject.toml`, or tasks involving `.py` files.

## Core Standards

- Python >= 3.11
- Type hints mandatory (`def fn(x: int) -> str`)
- `uv` for package management (faster than pip)
- Virtual environments: `uv venv` + `uv pip install`
- `pyproject.toml` over `setup.py`
- `ruff` for linting + formatting

## Project Structure

```
project/
├── src/
│   └── mypackage/
│       ├── __init__.py
│       └── main.py
├── tests/
├── pyproject.toml
└── .python-version
```

## pyproject.toml Minimal

```toml
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"

[project]
name = "mypackage"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = []

[tool.ruff]
line-length = 88
target-version = "py311"
```

## Anti-patterns

- No bare `except:` — always `except SpecificError`
- No mutable default args: `def fn(x: list = None)` not `def fn(x: list = [])`
- No `os.system()` — use `subprocess.run()`
- No `print()` in libraries — use `logging`
