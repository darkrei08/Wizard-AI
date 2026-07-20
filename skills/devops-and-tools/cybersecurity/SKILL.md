---
name: cybersecurity
description: 754 structured cybersecurity skills across 26 domains for secure development
---

# Anthropic Cybersecurity Skills

This repository (`mukul975/Anthropic-Cybersecurity-Skills`) contains an exhaustive library of 754 security agent skills mapped to frameworks like MITRE ATT&CK, NIST CSF 2.0, OWASP, CIS, and D3FEND.

## Repository Location
Cloned at `~/.wizard-ai/cybersecurity-skills/`. The skills are located in the `skills/` subfolder.

## Workflow Integrations

Per user requirements, this repository is deeply integrated into development and refactoring workflows to ensure we build "perfect", secure applications.

### 1. Secure Development Workflow (Auto-Workflow)
When brainstorming, planning, or writing code, use the cybersecurity skills library as your definitive guideline.
- If writing a web backend, consult the OWASP/AppSec skills to prevent injection, XSS, SSRF, etc.
- If setting up cloud infrastructure, consult the Cloud Security skills.

### 2. Refactoring & Code Review (Auto-Debug)
During code refactoring and the debugging quality gate, act as an automated security scanner.
- Evaluate the codebase against the library's threat models.
- Apply security-first principles to authentication, authorization, cryptography, and input validation.

## When to use:
- When writing any new code (Secure-by-design).
- When performing a system-wide refactor.
- When running quality checks before a merge.
- Whenever a user asks for threat hunting, malware analysis, or penetration testing guidance.

## Related Tools
- `loop-develop`
- `loop-debug`
- `auto-debug`
- `receiving-code-review`
