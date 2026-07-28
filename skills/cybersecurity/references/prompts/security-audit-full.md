# Complete Security Audit Prompt
## Paste into a NEW conversation (zero context) for the final pre-launch review

This prompt combines all the mini-checks from the individual chapters
into a professional audit framework.

---

## HOW TO USE

1. Open a NEW conversation with the AI (important: zero context for impartiality)
2. Copy everything below the line "=== START PROMPT ==="
3. Paste it into the conversation
4. The AI will analyze all the code and give a verdict for each point
5. Fix CRITICAL and HIGH findings immediately
6. Fix MEDIUM findings under 10 minutes each
7. Document LOW findings for later

---

=== START PROMPT (COPY EVERYTHING FROM HERE DOWN) ===

<role>
You are a senior application security engineer specializing in AI-generated
codebases. You have deep expertise in the OWASP Top 10, the CWE database,
and vulnerability patterns specifically introduced by LLM code generation
(hallucinated packages, missing server-side validation, open default database
policies, hardcoded secrets, inconsistent authentication middleware).

You are conducting a comprehensive security audit of a web application
built with "vibe coding". "Vibe coding" means this application was built
primarily using AI assistants like Claude, Gemini, Cursor, Copilot, or
similar tools. These tools produce functional code quickly but regularly
introduce security flaws that a human developer would notice immediately.

Your job is to find EVERY flaw.
</role>

<methodology>
Work on the codebase in two passes:

PASS 1 — DISCOVERY
Read the entire codebase before making any observations.
Build a mental model of the architecture: framework, database,
authentication provider, API layer, deployment configuration.
Identify every entry point (pages, API routes, server actions,
webhooks, cron jobs). Map the data flow from user input to database
and back.

PASS 2 — SYSTEMATIC AUDIT
Work through each section of the checklist. For each point,
do one of three things:
  PASS    — The codebase handles this correctly. Cite file/line.
  FAIL    — A vulnerability exists. Document it completely.
  PARTIAL — Partial coverage but with gaps. Explain what's missing.
  N/A     — Not applicable to this codebase. Briefly explain why.

Do not skip points. Do not group multiple points together.
Each individual checklist point receives its own explicit verdict.
</methodology>

<output_format>
For each FAIL, use this exact structure:

+----------------------------------------------------------+
| FINDING #[number]                                         |
+----------+-----------------------------------------------+
| Severity | CRITICAL / HIGH / MEDIUM / LOW                |
| Category | e.g. Exposed Secrets, Missing RLS, etc.       |
| Location | path/file.ts:line_number                      |
| CWE      | CWE-XXX (Name)                                |
+----------+-----------------------------------------------+
| What's wrong:                                             |
| [Description in plain language]                           |
|                                                           |
| Why it matters:                                           |
| [What an attacker could do with this]                     |
|                                                           |
| The vulnerable code:                                      |
| ```                                                       |
| [exact code snippet]                                      |
| ```                                                       |
|                                                           |
| The fix:                                                  |
| ```                                                       |
| [corrected snippet, ready to copy/paste]                  |
| ```                                                       |
|                                                           |
| Estimated fix time: ~[X] minutes                          |
+----------------------------------------------------------+
</output_format>

<audit_checklist>

## Section 1: Environment Variables & Secret Management

- [ ] 1.1 — Hardcoded secrets: Search for API keys, tokens, passwords,
      connection strings and webhook URLs embedded directly in code.
      Patterns to search for:
        sk_live_, sk_test_, sk-, pk_live_,
        Bearer, eyJ (JWT base64 prefix),
        ghp_, gho_, github_pat_,
        xoxb-, xoxp- (Slack tokens),
        AKIA (AWS keys),
        any 32+ character alphanumeric string in quotes

- [ ] 1.2 — .gitignore coverage: Verify .env, .env.local,
      .env.production and .env*.local are all in .gitignore.
      Check git history for any .env files committed in the past.

- [ ] 1.3 — Public prefixes: Verify that server-only secrets
      DO NOT use public framework prefixes (NEXT_PUBLIC_,
      VITE_, REACT_APP_). Keys that must NEVER be public:
        - Database service role keys
        - Stripe secret keys
        - OpenAI / Anthropic API keys
        - SMTP credentials
        - Any key that grants write/admin access

- [ ] 1.4 — Console/error leaks: Search for console.log, console.error
      and error handling components that could print
      environment variables or secrets to the browser.

- [ ] 1.5 — Production source maps: Verify that source maps
      are disabled in production. Source maps allow
      anyone to reconstruct the original source code.

- [ ] 1.6 — Startup validation: Verify the app fails
      immediately if required environment variables are missing.

## Section 2: Database Security

- [ ] 2.1 — RLS enabled: Verify Row Level Security is
      enabled on EVERY table in the public schema.

- [ ] 2.2 — RLS policies exist: A table with RLS enabled
      but WITHOUT policies silently returns empty results.
      Verify every table with RLS has at least SELECT and INSERT policies.

- [ ] 2.3 — WITH CHECK clauses: Verify that all INSERT and UPDATE
      policies include WITH CHECK. Without WITH CHECK on INSERT,
      a user can insert rows with any user_id.

- [ ] 2.4 — Identity source in policies: RLS policies must
      use auth.uid() for identity, NOT auth.jwt()->'user_metadata'.
      User metadata can be modified by users.

- [ ] 2.5 — service_role isolation: The service_role key
      bypasses all RLS. Verify it is NEVER used in
      client-side code.

- [ ] 2.6 — Storage bucket policies: If using database storage,
      verify buckets have RLS policies.

- [ ] 2.7 — SQL injection: Search for raw SQL queries using
      string concatenation or template literals instead
      of parameterized queries.

- [ ] 2.8 — SECURITY DEFINER functions: Search for database functions
      marked SECURITY DEFINER that run with the creator's
      privileges, not the calling user's.

## Section 3: Authentication & Session Management

- [ ] 3.1 — Auth middleware exists: Verify authentication
      middleware exists and runs on protected routes.

- [ ] 3.2 — Default-deny routing: Verify middleware
      protects routes by default (allowlist of public routes)
      instead of by exception (blocklist of protected routes).

- [ ] 3.3 — getUser() vs getSession(): Verify server-side
      operations use getUser() (which validates the JWT with the server)
      instead of getSession() (which only reads the local JWT).

- [ ] 3.4 — Auth callback handler: Verify the auth callback
      handles errors and does not expose tokens in URLs or logs.

- [ ] 3.5 — Session storage: Verify tokens are in
      httpOnly cookies, NOT in localStorage or sessionStorage.

- [ ] 3.6 — Protected API routes: Verify EVERY API route
      that handles user data checks authentication.

- [ ] 3.7 — OAuth security: If implemented, verify callback URLs,
      state parameters for CSRF, secure token handling.

## Section 4: Server-Side Validation

- [ ] 4.1 — Schema validation: Verify all API routes
      and server actions validate input with a validation library
      (Zod, Yup, etc.) SERVER-SIDE. Frontend validation is UX,
      not security.

- [ ] 4.2 — Identity from session: Verify user identity
      for write operations ALWAYS comes from the session/JWT,
      NEVER from the request body ({ userId: "..." }).

- [ ] 4.3 — Input sanitization: Verify user-generated content
      rendered in HTML is sanitized (XSS).
      Search for: dangerouslySetInnerHTML, v-html, [innerHTML],
      template literals rendering user content.

- [ ] 4.4 — HTTP methods: Verify state-changing operations
      use POST/PUT/PATCH/DELETE, not GET.

- [ ] 4.5 — Error information leaks: Verify error responses
      don't expose internal details (stack traces,
      SQL errors, file paths, environment variable names).

- [ ] 4.6 — Webhook signature verification: If the app receives
      webhooks, verify it validates the signature before processing.

## Section 5: Payments (Stripe)

- [ ] 5.1 — Client-side Stripe keys: Verify Stripe secret keys
      (sk_live_, sk_test_) DO NOT appear in client-side code.
      Only the public key (pk_) can be used in the browser.

- [ ] 5.2 — Webhook signature validation: Verify the Stripe webhook
      validates the signature (stripe-signature header) before processing
      any event. Without validation, anyone can send fake events
      to your endpoint.

- [ ] 5.3 — Secure checkout: Verify the payment flow
      uses Stripe Checkout or Payment Intents. The app must NEVER
      collect credit card data directly.

- [ ] 5.4 — Subscription state handling: Verify subscription status
      is verified server-side before granting access to premium features.

## Section 6: Dependency & Package Security

- [ ] 6.1 — Audit results: Run the package manager's audit command
      and report vulnerabilities by severity.

- [ ] 6.2 — Hallucinated packages: Search for installed packages with
      few downloads, recent publish dates, or names that don't
      match well-known packages.

- [ ] 6.3 — Lockfile committed: Verify the lockfile is
      committed to the repository.

- [ ] 6.4 — Outdated packages: Search for packages with known CVEs.

- [ ] 6.5 — Unused dependencies: Search for packages in package.json
      that aren't imported anywhere in the code.

## Section 7: Rate Limiting

- [ ] 7.1 — Expensive operations: Identify all API routes
      that call paid external APIs and verify they have rate limiting.

- [ ] 7.2 — Auth endpoints: Verify login, signup, password reset
      have rate limiting against brute force attacks.

- [ ] 7.3 — Implementation: If rate limiting exists, verify
      it's server-side with a reliable backing store (Redis, Upstash),
      not in-memory that resets on deploy.

## Section 8: CORS Configuration

- [ ] 8.1 — API route CORS: Verify CORS headers restrict
      access to the app's domain. Search for Access-Control-Allow-Origin: *

- [ ] 8.2 — Credentials mode: Verify Access-Control-Allow-
      Credentials is true only with specific origins, not wildcard.

## Section 9: File Upload Security (if applicable)

- [ ] 9.1 — Server-side validation: If the app handles uploads,
      verify type and size are validated on the server.

- [ ] 9.2 — Storage permissions: Verify uploaded files
      have appropriate access controls.

- [ ] 9.3 — Execution prevention: Verify uploaded files
      cannot be executed on the server.

</audit_checklist>

<final_report>
After completing all points, compile a report with this structure:

## 1. Overall Security Assessment

Rate the codebase:
  CRITICAL — Data exposed or active auth bypass. Stop everything and fix now.
  NEEDS IMPROVEMENT — Significant gaps that would be exploitable.
  ACCEPTABLE — Minor issues, no immediate data exposure risk.
  SOLID — Well protected with only informational observations.

Include a summary paragraph explaining the rating.

## 2. Critical and High Findings

List all CRITICAL and HIGH findings for immediate visibility.
These are the "stop everything and fix now" items.

## 3. Quick Wins

List fixes that take less than 10 minutes but significantly
improve security.

## 4. Prioritized Remediation Plan

Numbered list of ALL findings ordered by:
  1st — Severity (critical before high before medium before low)
  2nd — Effort (quick fixes before complex refactoring)

For each item, include estimated fix time.

## 5. What's Already Done Right

List security measures implemented correctly.
This tells the developer what NOT to accidentally break.

## 6. Checklist Summary

Compact output of every point and its verdict:
  1.1 PASS  1.2 PASS  1.3 FAIL  1.4 PASS  1.5 PARTIAL  1.6 N/A ...
</final_report>

<instructions>
Start the audit now.

Read the entire codebase before producing any findings.
Understand the architecture first. Then work through each checklist
point one by one.

Be thorough but practical. Prioritize real, exploitable vulnerabilities
over theoretical concerns.

Do not group multiple points in a single response.
Each point receives its own explicit verdict.

If you are uncertain about a finding, mark it as PARTIAL
and explain what would need to be verified.
</instructions>

=== END PROMPT ===
