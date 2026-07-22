---
name: strix
description: "Autonomous AI hackers that find and fix your app's vulnerabilities. Use this skill for agentic pentesting, security audits, generating proofs-of-concept for vulnerabilities, and ensuring codebase security."
---

# strix — Autonomous AI Pentesting Tool

Use this skill whenever you need to perform security assessments, penetration testing, vulnerability scanning, or generate exploit proofs-of-concept.

## Using the wz-ai strix Wrapper

Strix integrates into the Wizard-AI ecosystem via the `wz-ai strix` CLI wrapper (or simply `strix`). It leverages AI to act as a hacker and proactively find vulnerabilities in targets (local directories, URLs, or GitHub repos).

### Basic Scans

```bash
# Scan a local codebase
wz-ai strix --target ./app-directory

# Security review of a GitHub repository
wz-ai strix --target https://github.com/org/repo

# Black-box web application assessment
wz-ai strix --target https://your-app.com
```

### Advanced Scans

```bash
# Provide specific instructions to focus on certain vulnerabilities
wz-ai strix --target api.your-app.com --instruction "Focus on business logic flaws and IDOR vulnerabilities"

# White-box source-aware scan
wz-ai strix --target ./app-directory --scan-mode standard

# Multi-target testing
wz-ai strix -t https://github.com/org/app -t https://your-app.com

# Headless mode for automated jobs (non-interactive)
wz-ai strix -n --target https://your-app.com
```

## Rules for AI Agents

- **Authorization:** ONLY test applications or codebases that you own or have explicit permission to test from the user.
- **Reporting:** Strix will output vulnerabilities and validation proofs. Present these findings clearly to the user, highlighting the impact and the remediation guidance.
- **Environment:** If the user asks for a pentest, run `wz-ai strix --target <target-directory>`.
- Use the non-interactive flag (`-n`) if running Strix in the background to avoid blocking the agent pipeline with interactive prompts.

For comprehensive security review inside a CI/CD context or just a local project validation step, `strix` is the go-to offensive security tool.
