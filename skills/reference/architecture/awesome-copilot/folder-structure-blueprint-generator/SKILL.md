---
name: folder-structure-blueprint-generator
description: "Folder Structure Blueprint Generator. Auto-detects tech stacks and generates architectural blueprints to enforce clean project layouts."
---

# Folder Structure Blueprint Generator

Use this skill when a project folder structure is messy, or when bootstrapping a new feature/module to ensure it follows the optimal blueprint for the detected tech stack.

## Capabilities
- **Stack Detection**: Analyzes `package.json`, `pyproject.toml`, etc., to identify the framework (Node, React, Python, etc.).
- **Blueprint Generation**: Creates a `structure-blueprint.md` defining where controllers, models, views, scripts, and tests must reside.
- **Migration Enforcement**: Instructs agents to move misplaced files (e.g., scripts in the root) into their blueprint-designated folders.

## Execution
1. Detect stack.
2. Output a tree-like markdown structure.
3. Validate current workspace against the tree.
4. Relocate files that violate the blueprint.