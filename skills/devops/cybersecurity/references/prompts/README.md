# Security Audit Prompts for AI-Generated Code

> 🇮🇹 [Leggi questa guida in Italiano](README.it.md)

This directory contains ready-to-use security audit prompts designed for **"vibe coded"** applications — projects built primarily using AI assistants (Claude, Gemini, Cursor, Copilot, etc.).

These prompts are based on the OWASP Top 10 and CWE database, adapted specifically for the vulnerability patterns commonly introduced by AI code generation.

## 📋 How to Use

1. Open a **NEW conversation** with your AI (zero context is important for impartiality)
2. Copy the entire content of the desired prompt file
3. Paste it into the conversation
4. The AI will analyze your codebase and provide a verdict for each checkpoint

## 📁 Available Prompts

| File | Scope | When to Use |
|---|---|---|
| [security-check-secrets.md](security-check-secrets.md) | API keys, env vars, secrets exposure | After initial project setup |
| [security-check-database.md](security-check-database.md) | SQL injection, RLS, service keys | After database integration |
| [security-check-auth.md](security-check-auth.md) | Auth, sessions, CORS, payments | After adding auth/payments |
| [security-check-frontend.md](security-check-frontend.md) | XSS, uploads, error leaks, source maps | Before production deploy |
| [security-audit-full.md](security-audit-full.md) | **Complete audit** (all checks combined) | Final pre-launch review |

## 🎯 Severity Priority

Fix findings in this order:
1. **CRITICAL** — Stop everything and fix immediately
2. **HIGH** — Fix before any deployment
3. **MEDIUM** — Fix within the same sprint (under 10 minutes each)
4. **LOW** — Document for later improvement
