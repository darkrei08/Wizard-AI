---
name: workflow-dev-integrations
description: "Meta-skill orchestrating DevOps, APIs, and External Integrations. Chains mcp-builder, claude-api, internal-comms, webapp-testing, loop-develop, and loop-release."
---

# Dev Integrations & DevOps Workflow (Meta-Skill)

This meta-skill orchestrates building APIs, integrating with external systems, testing, and shipping code. Use this whenever the user asks to build an integration (Slack, API), create an MCP server, or automate a release pipeline.

## Core Workflow Chain

1. **Build & Integrate (`mcp-builder` & `claude-api`)**
   Use `mcp-builder` to scaffold Model Context Protocol servers to expose local tools. Use `claude-api` to integrate Anthropic's capabilities directly into scripts or codebases.

2. **Testing (`webapp-testing`)**
   Before merging or shipping, use `webapp-testing` to ensure the newly built integration or web app is fully functional. 

3. **External Comms (`internal-comms` & `slack-gif-creator`)**
   Use these skills to generate automated update messages, changelogs for Slack, or fun GIFs for team channels upon successful builds.

4. **Ship It (`loop-develop`, `loop-release`, `auto-npm-publish`)**
   Enforce the Wizard-AI Git flow (`loop-develop`): 
   - Isolate in a branch (`wz-ai branch`).
   - Run tests (`mp-tdd`).
   - Merge to main (`loop-release`).
   - Use `loop-release` (`wz-ai release`) to tag semver and `auto-npm-publish` to deploy the package automatically.

## Execution Rules

- Never bypass the testing phase for API integrations.
- Always follow semantic versioning rules outlined in `auto-release` when concluding a development integration task.
