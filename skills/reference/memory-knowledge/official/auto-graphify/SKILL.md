---
name: auto-graphify
description: "Automatically trigger the Graphify project generation at the end of a prompt or at an appropriate time to update and improve search connections."
---

# Auto Graphify

This skill is a behavioral hook for AI agents. Use this skill **whenever you finish implementing a major feature, adding new files, or making structural changes to the codebase.**

## Automated Hook

You should consider this skill as an internal rule:
- **IF** task == complete AND (files_added == true OR codebase_structure_changed == true OR user_requested_graph == true)
- **THEN** run `ai-graph .` or `graphify .` in the background.

## Example Usage

```bash
# Generate the project graph
ai-graph .
```
