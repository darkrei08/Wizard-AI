---
name: wslens
description: Integrazione con WSLens per gestire finestre Windows da WSL e automatizzare UI
---

# wslens

`wslens` is a skill that allows scripts and AI agents to list, capture, move, resize, focus, close, click, drag, and type into Windows top-level windows. It runs from WSL or directly on Windows.

## Use Cases for Agents
- Inspecting the UI of a Windows application spawned from the WSL side.
- Capturing screenshots (`wslens capture`) of specific apps (e.g. `wslens capture title:Notepad -o shot.png`).
- Resizing, focusing, and closing applications to close the feedback loop for agentic development.

## Setup
The `wslens` core is automatically installed via `setup.ps1` and initialized at system startup.

## Using via `wz-ai`
You can run all wslens commands through the centralized Wizard-AI CLI:

```powershell
wz-ai wslens list
wz-ai wslens capture title:Notepad -o shot.png
```

This seamlessly bridges the gap between AI code generation and visual verification of native Windows applications.
