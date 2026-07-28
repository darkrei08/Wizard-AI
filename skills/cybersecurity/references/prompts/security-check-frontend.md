# Security Check — Chapter 4: Frontend & Production

> **When to use:** Before deploying to production.
> Open a NEW conversation with the AI (zero context) and paste the prompt below.

---

## Mini-Audit

```
Check these frontend security aspects in my project.
For each point, tell me PASS or FAIL with the exact file and line.
If you find a FAIL, fix the problem immediately.

- [ ] If the app accepts file uploads: type and size
      are validated on the SERVER, not just in the browser
- [ ] No user-generated content is rendered
      without sanitization (search for: dangerouslySetInnerHTML, v-html,
      innerHTML, template literals that render user content)
- [ ] Error responses DO NOT show stack traces,
      internal file paths, or environment variable names
- [ ] Source maps are NOT enabled in production
      (they would allow anyone to see the source code)
```
