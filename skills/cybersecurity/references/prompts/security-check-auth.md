# Security Check — Chapter 3: Authentication & Payments

> **When to use:** After adding authentication and/or payment integration.
> Open a NEW conversation with the AI (zero context) and paste the prompt below.

---

## Mini-Audit

```
Check the authentication and payment security in my project.
For each point, tell me PASS or FAIL with the exact file and line.
If you find a FAIL, fix the problem immediately.

- [ ] RLS is enabled on EVERY database table (none excluded)
- [ ] Every table with RLS has at least one active policy
      (RLS enabled WITHOUT policies = all queries return empty)
- [ ] INSERT and UPDATE policies have WITH CHECK clauses
- [ ] Policies use auth.uid() for identity,
      NOT auth.jwt()->'user_metadata'
- [ ] Middleware exists and runs on all protected routes
- [ ] Routes are protected by default
      (allowlist of public pages, NOT blocklist of protected pages)
- [ ] The server uses getUser() to verify identity,
      NOT getSession()
- [ ] Session tokens are in httpOnly cookies,
      NOT in localStorage or sessionStorage
- [ ] EVERY API route verifies authentication
      before processing the request
- [ ] The authentication callback handles errors
      and does not expose tokens in URLs or logs
- [ ] CORS is configured: only the app's domain can call the APIs
      (no Access-Control-Allow-Origin: *)
- [ ] Secret Stripe keys (sk_) DO NOT appear in client-side code
- [ ] The Stripe webhook validates the signature before processing events
- [ ] The checkout flow uses Stripe Checkout or Payment Intents
      (never collect card data directly)
```
