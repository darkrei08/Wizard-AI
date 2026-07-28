# Security Check — Chapter 2: Database

> **When to use:** After database integration.
> Open a NEW conversation with the AI (zero context) and paste the prompt below.

---

## Mini-Audit

```
Check the database security in my project.
For each point, tell me PASS or FAIL with the exact file and line.
If you find a FAIL, fix the problem immediately.

- [ ] The service_role / admin key NEVER appears
      in client-side code (components, pages)
- [ ] No SQL queries use string concatenation or template literals
      (SQL injection risk). All queries are parameterized.
```
