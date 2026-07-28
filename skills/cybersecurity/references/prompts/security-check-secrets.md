# Security Check — Chapter 1: Secrets & API Keys

> **When to use:** After initial project setup.
> Open a NEW conversation with the AI (zero context) and paste the prompt below.

---

## Mini-Audit

```
Check my project code for these security issues.
For each point, tell me PASS (✅) or FAIL (❌) with the exact file and line.
If you find a FAIL, fix the problem immediately.

- [ ] No API keys written directly in the code
      (search for: sk_, pk_, Bearer, eyJ, ghp_, xoxb-, AKIA,
      long alphanumeric strings in quotes)
- [ ] All keys are in .env and referenced as environment variables
- [ ] The .env file is listed in .gitignore
- [ ] Secret keys DO NOT use public prefixes
      (NEXT_PUBLIC_, VITE_, REACT_APP_)
- [ ] No console.log that prints keys, tokens, or secrets
- [ ] All external API calls go through the server's API routes,
      NEVER directly from browser code
- [ ] Form input is validated both in the browser and on the server
```
