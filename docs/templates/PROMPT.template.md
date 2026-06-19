# 🚀 MEGA-PROMPT: Fullstack [Project Name] — Next.js + Node.js

> **Execution mode:** Plan Mode with Claude Opus 4.8
> **Methodology:** SDD (Spec-Driven Development) + TDD (Test-Driven Development)
> **Architectural principles:** SOLID, Clean Architecture, DRY, KISS, YAGNI
> **Minimum mandatory coverage:** ≥ 85% on EVERY test layer, NO EXCEPTIONS

---

## 0. GLOBAL OPERATING RULES (NON-NEGOTIABLE)

### 0.1 Agent behavior

- **Before writing ANY code**, produce a detailed plan covering all phases.
- **NEVER skip tests.** Every feature is born from the test first (Red → Green → Refactor).
- **NEVER hardcode secrets.** Every secret goes in `.env` (with `.env.example` versioned).
- **Every feature is developed on a dedicated Git Flow branch** (`feature/`, `release/`, `hotfix/`).
- **After every completed feature:** run linting + formatting + typecheck + tests + verify coverage ≥ 85%.
- **ALWAYS update** `CHANGELOG.md`, `README.md`, `MEMORY.md` after each completed phase.
- **Install skills EXCLUSIVELY from `skills.sh`** via `npx skills-cli install <skill>` or the equivalent command shown on the skills.sh portal. Search with `npx skills-cli search <keyword>` when unsure of the exact name.
- **Every commit follows Conventional Commits:** `feat:`, `fix:`, `test:`, `chore:`, `docs:`, `refactor:`, `ci:`, `perf:`.
- **Spec-Driven Development:** for every feature, write the full specification (types, interfaces, API contracts, validation schemas) BEFORE writing any tests or implementation.
- **Incremental semantic versioning:** you own the release cadence. Start at `0.1.0`, bump minor per feature batch, patch for fixes. Release `1.0.0` only when every checklist item in §11 is green.
- **API versioning:** start at `v1`. Never introduce breaking changes within a version. When a breaking change is needed, bump to `v2` and keep `v1` alive with a deprecation header.

### 0.2 Binding technology stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Runtime | **Node.js 24** | `.nvmrc` pinned, enforced in CI |
| Frontend | **Next.js 15+ (App Router)** | TypeScript strict, React 19, Server Components |
| Backend | **Node.js + Express** | TypeScript strict, layered Clean Architecture |
| ORM | **Drizzle ORM** | Type-safe queries, versioned migrations |
| Database | **SQLite** (via better-sqlite3 + Drizzle) | Normalized schema ≥ 3NF |
| Auth | **Custom email/password** | bcrypt hashing, httpOnly secure cookies, JWT |
| Validation | **Zod** | Both client and server, shared schemas where possible |
| Testing | **Vitest** (unit/integration) + **Playwright** (e2e) | Coverage ≥ 85% |
| a11y testing | **axe-core** + **Playwright a11y** | W3C WCAG 2.2 AA minimum |
| i18n Frontend | **next-intl** | IT, EN, ES — locale-based routing |
| i18n Backend | **i18next** | Localized API responses and error messages |
| Logging | **Pino** | Structured JSON logs, correlation IDs per request |
| Containerization | **Docker + Docker Compose** | Multi-stage builds, dev + prod profiles |
| CI/CD | **GitHub Actions** | Lint → Test → Build → Coverage gate → Deploy |
| Deployment | **Vercel** (frontend) + **Vercel** (backend as serverless or standalone) | Auto-deploy from branches |
| Linting | **ESLint 9+ (flat config)** | Strict rules, no-any, exhaustive-deps |
| Formatting | **Prettier** | Configured, integrated with ESLint |
| Git | **Git Flow** | main, develop, feature/*, release/*, hotfix/* |
| Monorepo | **npm workspaces** | Root package.json orchestrates both workspaces |
| Repos | **GitHub (public)** via `gh` CLI | Separate repos for frontend and backend as git submodules |

---

## 1. PHASE 0 — BOOTSTRAP & INFRASTRUCTURE

### 1.1 GitHub repositories setup

Create THREE public GitHub repos using `gh` CLI:

```bash
# 1. Parent monorepo
gh repo create [project-name] --public --description "Fullstack [Project Name] — Next.js 15 + Node.js + SQLite" --clone
cd [project-name]

# 2. Backend repo
gh repo create [project-name]-backend --public --description "[Project Name] Backend — Node.js + Express + Drizzle + SQLite"

# 3. Frontend repo
gh repo create [project-name]-frontend --public --description "[Project Name] Frontend — Next.js 15 + React 19 + next-intl"

# 4. Add as git submodules in the parent repo
git submodule add $(gh repo view [project-name]-backend --json url -q .url) backend
git submodule add $(gh repo view [project-name]-frontend --json url -q .url) frontend

# 5. Initialize Git Flow on ALL THREE repos
cd backend && git flow init -d && cd ..
cd frontend && git flow init -d && cd ..
git flow init -d
```

### 1.2 Node.js version pinning

```bash
# Create .nvmrc in root, backend/, and frontend/
echo "24" > .nvmrc
echo "24" > backend/.nvmrc
echo "24" > frontend/.nvmrc
```

### 1.3 Monorepo root setup

```json
// Root package.json
{
  "name": "[project-name]",
  "private": true,
  "workspaces": ["frontend", "backend"],
  "scripts": {
    "dev": "npm run dev --workspaces --if-present",
    "build": "npm run build --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "format": "npm run format --workspaces --if-present",
    "format:check": "npm run format:check --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "test": "npm run test --workspaces --if-present",
    "test:coverage": "npm run test:coverage --workspaces --if-present",
    "test:e2e": "npm run test:e2e --workspace=frontend",
    "quality": "npm run quality --workspaces --if-present",
    "docker:dev": "docker compose up --build",
    "docker:prod": "docker compose -f docker-compose.prod.yml up --build -d"
  },
  "engines": {
    "node": ">=24.0.0"
  }
}
```

### 1.4 Directory structure

> The `frontend/` and `backend/` directories are git submodules, each their own repo.

```
[project-name]/                        # Parent monorepo repo
├── frontend/                    # Submodule → [project-name]-frontend repo
│   ├── src/
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── error.tsx            # Granular error boundary
│   │   │   │   ├── loading.tsx          # Streaming SSR skeleton
│   │   │   │   ├── not-found.tsx
│   │   │   │   ├── [entities]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── [id]/
│   │   │   │   │       ├── page.tsx
│   │   │   │   │       ├── error.tsx
│   │   │   │   │       └── loading.tsx
│   │   │   │   ├── auth/
│   │   │   │   │   ├── login/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── register/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── error.tsx
│   │   │   │   └── dashboard/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── error.tsx
│   │   │   │       └── loading.tsx
│   │   │   ├── api/                     # Route handlers (BFF proxy if needed)
│   │   │   ├── layout.tsx               # Root layout (redirect to default locale)
│   │   │   └── global-error.tsx         # Top-level error boundary
│   │   ├── components/
│   │   │   ├── ui/                      # Atomic components (Button, Input, Badge, Dialog...)
│   │   │   ├── features/               # Domain components (TodoCard, TodoForm, AuthForm...)
│   │   │   ├── layout/                  # Header, Footer, Sidebar, SkipLink, Navigation
│   │   │   └── a11y/                    # A11y-specific: LiveRegion, FocusTrap, VisuallyHidden
│   │   ├── hooks/
│   │   │   ├── use-[entities].ts
│   │   │   ├── use-auth.ts
│   │   │   ├── use-debounce.ts
│   │   │   └── use-media-query.ts
│   │   ├── lib/
│   │   │   ├── api-client.ts            # Fetch wrapper with auth cookie forwarding
│   │   │   ├── validators.ts            # Shared Zod schemas (client-side)
│   │   │   └── utils.ts
│   │   ├── services/
│   │   │   ├── [entity].service.ts
│   │   │   ├── auth.service.ts
│   │   │   └── [related-entity-1].service.ts
│   │   ├── types/
│   │   │   ├── [entity].types.ts
│   │   │   ├── auth.types.ts
│   │   │   └── api.types.ts
│   │   ├── i18n/
│   │   │   ├── messages/
│   │   │   │   ├── it.json
│   │   │   │   ├── en.json
│   │   │   │   └── es.json
│   │   │   ├── request.ts
│   │   │   └── routing.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   └── middleware.ts                # Locale detection + auth guard
│   ├── public/
│   │   ├── robots.txt
│   │   ├── llms.txt
│   │   ├── llms-full.txt
│   │   └── icons/
│   ├── tests/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── playwright.config.ts
│   ├── vitest.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── prettier.config.mjs
│   ├── postcss.config.mjs
│   ├── tailwind.config.ts              # If using Tailwind
│   ├── Dockerfile
│   ├── vercel.json
│   ├── .nvmrc
│   ├── .env.example
│   ├── .env.local                       # (gitignored)
│   └── package.json
│
├── backend/                             # Submodule → [project-name]-backend repo
│   ├── src/
│   │   ├── index.ts                     # Entry point, bootstrap server
│   │   ├── app.ts                       # Express app factory
│   │   ├── config/
│   │   │   ├── env.ts                   # Zod-validated env parsing
│   │   │   ├── database.ts              # SQLite connection config
│   │   │   ├── logger.ts                # Pino setup with correlation IDs
│   │   │   └── i18n.ts                  # i18next setup
│   │   ├── routes/
│   │   │   ├── index.ts                 # Route aggregator with version prefix
│   │   │   ├── [entity].routes.ts
│   │   │   ├── [related-entity-1].routes.ts
│   │   │   ├── [related-entity-2].routes.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── health.routes.ts
│   │   ├── controllers/
│   │   │   ├── [entity].controller.ts
│   │   │   ├── [related-entity-1].controller.ts
│   │   │   ├── [related-entity-2].controller.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── health.controller.ts
│   │   ├── services/
│   │   │   ├── [entity].service.ts
│   │   │   ├── [related-entity-1].service.ts
│   │   │   ├── [related-entity-2].service.ts
│   │   │   └── auth.service.ts
│   │   ├── repositories/
│   │   │   ├── [entity].repository.ts
│   │   │   ├── [related-entity-1].repository.ts
│   │   │   ├── [related-entity-2].repository.ts
│   │   │   └── user.repository.ts
│   │   ├── middlewares/
│   │   │   ├── error-handler.ts         # Global error handler with i18n
│   │   │   ├── validate.ts              # Zod request validation middleware
│   │   │   ├── authenticate.ts          # JWT cookie verification
│   │   │   ├── rate-limiter.ts          # Per-route rate limiting
│   │   │   ├── cors.ts
│   │   │   ├── helmet.ts
│   │   │   ├── request-logger.ts        # Pino HTTP request logging
│   │   │   ├── correlation-id.ts        # X-Correlation-ID generation/propagation
│   │   │   └── locale.ts               # Accept-Language → i18next
│   │   ├── db/
│   │   │   ├── schema.ts               # Drizzle schema definitions (all tables)
│   │   │   ├── migrations/             # Drizzle-generated migrations
│   │   │   ├── seed.ts                 # Seeder with multilingual demo data
│   │   │   └── index.ts                # DB singleton export
│   │   ├── validators/
│   │   │   ├── [entity].validator.ts
│   │   │   ├── [related-entity-1].validator.ts
│   │   │   ├── [related-entity-2].validator.ts
│   │   │   └── auth.validator.ts
│   │   ├── types/
│   │   │   ├── [entity].types.ts
│   │   │   ├── auth.types.ts
│   │   │   ├── api.types.ts             # Standard ApiResponse<T>, PaginatedResponse<T>
│   │   │   └── error.types.ts           # AppError class, error codes enum
│   │   ├── utils/
│   │   │   ├── api-response.ts          # Standard JSON response wrapper
│   │   │   ├── pagination.ts
│   │   │   ├── slug.ts
│   │   │   ├── hash.ts                  # bcrypt password hashing
│   │   │   └── jwt.ts                   # JWT sign/verify with cookie helpers
│   │   └── locales/
│   │       ├── it.json
│   │       ├── en.json
│   │       └── es.json
│   ├── tests/
│   │   ├── unit/                        # Service/Repository isolated (mocked DB)
│   │   ├── api/                         # Supertest endpoint tests
│   │   ├── integration/                 # Real DB + service + controller
│   │   └── helpers/
│   │       ├── setup.ts                 # Test DB setup/teardown
│   │       ├── factories.ts             # Test data factories
│   │       └── auth.ts                  # Auth helper for authenticated requests
│   ├── drizzle.config.ts
│   ├── vitest.config.ts
│   ├── tsconfig.json
│   ├── eslint.config.mjs
│   ├── prettier.config.mjs
│   ├── Dockerfile
│   ├── vercel.json
│   ├── .nvmrc
│   ├── .env.example
│   ├── .env                             # (gitignored)
│   └── package.json
│
├── docker-compose.yml                   # dev profile
├── docker-compose.prod.yml              # production profile
├── .github/
│   └── workflows/
│       ├── ci.yml                       # PR: lint + test + coverage gate + a11y
│       ├── cd-staging.yml               # Merge develop → deploy Vercel preview
│       └── cd-production.yml            # Merge main → deploy Vercel production
├── .gitmodules
├── .nvmrc
├── .editorconfig
├── .gitignore
├── package.json                         # Root workspace orchestrator
├── CLAUDE.md
├── MEMORY.md
├── CHANGELOG.md
└── README.md
```

### 1.5 CLAUDE.md — CREATE THIS AS THE VERY FIRST FILE

Generate `CLAUDE.md` in the monorepo root autonomously. It MUST contain at minimum these sections (adapt content to the project):

1. **Project** — name, one-line description, repo links
2. **Stack** — full list with pinned versions
3. **Architecture** — frontend (App Router, Server Components, next-intl), backend (Clean Architecture: Route → Controller → Service → Repository), DB (SQLite via Drizzle, ≥3NF), Auth (email/password, httpOnly JWT cookies)
4. **Development rules** — all 11 rules from §0.1, formatted as a numbered checklist
5. **Commands** — every npm script for both workspaces and root
6. **Directory structure** — current tree
7. **DB schema** — current tables with columns and relationships
8. **API endpoints** — current list with methods, paths, auth requirements
9. **Naming conventions:**
   - Files: `kebab-case`
   - React components: `PascalCase`
   - Variables/functions: `camelCase`
   - Constants: `UPPER_SNAKE_CASE`
   - DB columns: `snake_case`
   - API endpoints: `kebab-case`, plural nouns (`/api/v1/[entities]`)
   - CSS classes: `kebab-case` (or Tailwind utilities)
10. **Workflow for a new feature** — step-by-step from `git flow feature start` to `git flow feature finish`
11. **Accessibility requirements** — WCAG 2.2 AA checklist summary
12. **Versioning policy** — semver rules, API version strategy

### 1.6 Install skills (ONLY from skills.sh)

```bash
# Install ALL required skills from the skills.sh portal
# First search for available skills, then install each one:
npx skills-cli search nextjs
npx skills-cli search nodejs
npx skills-cli search typescript
npx skills-cli search testing
npx skills-cli search docker
npx skills-cli search playwright
npx skills-cli search eslint
npx skills-cli search drizzle
npx skills-cli search github-actions
npx skills-cli search react
npx skills-cli search accessibility
npx skills-cli search tailwind
npx skills-cli search vercel
npx skills-cli search pino
npx skills-cli search zod

# Install each found skill. Example:
npx skills-cli install <exact-skill-name>

# If the CLI name differs on skills.sh, use whatever the portal provides.
# The key constraint: NEVER install skills from any other source.
```

### 1.7 Install and configure MCP servers

```bash
# Install MCP servers needed for development assistance
# Configure in .claude/mcp.json or the global Claude Code config:

{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-filesystem", "./"]
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-sqlite", "./backend/data/[entity].db"]
    }
  }
}
```

---

## 2. PHASE 1 — DATABASE SCHEMA (Spec First)

### 2.1 Normalized SQLite schema (≥ 3NF)

Design and implement with Drizzle ORM. Below is the conceptual schema — translate it faithfully into Drizzle TypeScript schema definitions in `backend/src/db/schema.ts`.

```sql
-- =============================================
-- USERS (authentication)
-- =============================================
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    display_name TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1,      -- account activated by default
    last_login_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    deleted_at TEXT                              -- soft delete
);

-- =============================================
-- CATEGORIES
-- =============================================
CREATE TABLE [related-entities-1] (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    color TEXT NOT NULL DEFAULT '#6B7280',
    icon TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    deleted_at TEXT,                             -- soft delete
    UNIQUE(user_id, slug)
);

-- =============================================
-- TODOS
-- =============================================
CREATE TABLE [entities] (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK(status IN ('pending', 'in_progress', 'completed', 'archived')),
    priority TEXT NOT NULL DEFAULT 'medium'
        CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
    [related-entity-1]_id INTEGER REFERENCES [related-entities-1](id) ON DELETE SET NULL,
    due_date TEXT,
    completed_at TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_pinned INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now')),
    deleted_at TEXT                              -- soft delete
);

-- =============================================
-- TAGS
-- =============================================
CREATE TABLE [related-entities-2] (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, slug)
);

-- =============================================
-- [ENTITY] ↔ TAG (many-to-many junction)
-- =============================================
CREATE TABLE todo_tags (
    todo_id INTEGER NOT NULL REFERENCES [entities](id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES [related-entities-2](id) ON DELETE CASCADE,
    PRIMARY KEY (todo_id, tag_id)
);

-- =============================================
-- REFRESH TOKENS (for token rotation)
-- =============================================
CREATE TABLE refresh_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token_hash TEXT NOT NULL UNIQUE,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    revoked_at TEXT
);

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);
CREATE INDEX idx_todos_user_id ON [entities](user_id);
CREATE INDEX idx_todos_status ON [entities](status);
CREATE INDEX idx_todos_priority ON [entities](priority);
CREATE INDEX idx_todos_[related-entity-1]_id ON [entities]([related-entity-1]_id);
CREATE INDEX idx_todos_due_date ON [entities](due_date);
CREATE INDEX idx_todos_created_at ON [entities](created_at);
CREATE INDEX idx_todos_deleted_at ON [entities](deleted_at);
CREATE INDEX idx_[related-entities-1]_user_id ON [related-entities-1](user_id);
CREATE INDEX idx_[related-entities-1]_deleted_at ON [related-entities-1](deleted_at);
CREATE INDEX idx_tags_user_id ON [related-entities-2](user_id);
CREATE INDEX idx_todo_tags_tag_id ON todo_tags(tag_id);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
```

**Soft delete policy:**
- `users` → soft delete (preserve data integrity, cascade concerns)
- `[related-entities-1]` → soft delete ([entities] may reference them)
- `[entities]` → soft delete (user may want to recover)
- `[related-entities-2]` → hard delete (lightweight, no cascading risk)
- `todo_tags` → hard delete (junction table, follows CASCADE)
- `refresh_tokens` → hard delete (security: purge expired tokens)

### 2.2 Drizzle migrations

- Configure `drizzle.config.ts` targeting SQLite
- Generate the initial migration: `npx drizzle-kit generate`
- Apply: `npx drizzle-kit migrate`
- Create `seed.ts` with demo data in all 3 languages (IT/EN/ES), including a demo user (`demo@[entity].app` / `Demo1234!`)

---

## 3. PHASE 2 — BACKEND API (TDD)

### 3.1 TypeScript strict configuration

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "exactOptionalPropertyTypes": true,
    "target": "ES2024",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### 3.2 ESLint 9 flat config + Prettier

ESLint flat config with:
- `@typescript-eslint/strict-type-checked`
- `@typescript-eslint/stylistic-type-checked`
- Rule `no-explicit-any: error`
- Rule `no-unused-vars: error`
- Prettier integration via `eslint-config-prettier`

Prettier config (shared between both workspaces via root or duplicated):
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 3.3 Environment validation with Zod

```typescript
// backend/src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3001),
  DATABASE_URL: z.string().default('./data/[entity].db'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  RATE_LIMIT_MAX: z.coerce.number().default(100),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(60000),
  API_VERSION: z.string().default('v1'),
  DEFAULT_LOCALE: z.enum(['it', 'en', 'es']).default('en'),

  // Auth
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  JWT_ACCESS_EXPIRES_IN: z.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: z.string().default('7d'),
  COOKIE_DOMAIN: z.string().default('localhost'),
  COOKIE_SECURE: z.coerce.boolean().default(false),
});

export const env = envSchema.parse(process.env);
export type Env = z.infer<typeof envSchema>;
```

### 3.4 Pino structured logging

```typescript
// backend/src/config/logger.ts
import pino from 'pino';
import { env } from './env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  transport: env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  formatters: {
    level: (label) => ({ level: label }),
  },
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err,
  },
});

// Correlation ID middleware assigns logger child per request:
// req.log = logger.child({ correlationId: req.id });
```

### 3.5 Authentication system

**Registration flow:**
1. User submits email + password + display_name
2. Server validates with Zod (email format, password strength ≥ 8 chars, 1 upper, 1 lower, 1 digit)
3. Hash password with bcrypt (salt rounds: 12)
4. Create user with `is_active = 1` (activated by default, no email verification)
5. Return success (user must then login)

**Login flow:**
1. User submits email + password
2. Server verifies credentials against DB
3. On success: generate JWT access token (15min) + refresh token (7d)
4. Set both as **httpOnly, Secure, SameSite=Lax** cookies
5. Store refresh_token hash in DB
6. Return user profile (no tokens in response body)

**Token refresh flow:**
1. Access token expired → client gets 401
2. Client hits `POST /api/v1/auth/refresh` (cookie sent automatically)
3. Server validates refresh token against DB
4. Rotate: revoke old refresh token, issue new pair
5. Set new cookies

**Logout flow:**
1. Revoke refresh token in DB
2. Clear both cookies

### 3.6 API endpoints — RESTful

Base path: `/api/v1`

**Auth:**
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | No | Register new user |
| POST | `/auth/login` | No | Login, set cookies |
| POST | `/auth/refresh` | Cookie | Rotate tokens |
| POST | `/auth/logout` | Cookie | Revoke tokens, clear cookies |
| GET | `/auth/me` | Yes | Get current user profile |
| PATCH | `/auth/me` | Yes | Update profile (display_name) |
| DELETE | `/auth/me` | Yes | Soft-delete account |

**[Entities] (all require auth):**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/[entities]` | List [entities] (filters, pagination, sort) |
| GET | `/[entities]/:id` | Single [entity] with [related-entity-1] and [related-entities-2] |
| POST | `/[entities]` | Create new [entity] |
| PATCH | `/[entities]/:id` | Partial update |
| DELETE | `/[entities]/:id` | Soft delete |
| PATCH | `/[entities]/:id/status` | Change status |
| PATCH | `/[entities]/:id/pin` | Toggle pin |
| POST | `/[entities]/:id/[related-entities-2]` | Add [related-entity-2] to [entity] |
| DELETE | `/[entities]/:id/[related-entities-2]/:tagId` | Remove [related-entity-2] from [entity] |
| PATCH | `/[entities]/:id/restore` | Restore soft-deleted [entity] |
| POST | `/[entities]/bulk/status` | Bulk status update |
| DELETE | `/[entities]/bulk` | Bulk soft delete |

**[Related Entities 1] (all require auth):**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/[related-entities-1]` | List user's [related-entities-1] |
| GET | `/[related-entities-1]/:id` | Single [related-entity-1] with [entity] count |
| POST | `/[related-entities-1]` | Create [related-entity-1] |
| PATCH | `/[related-entities-1]/:id` | Update [related-entity-1] |
| DELETE | `/[related-entities-1]/:id` | Soft delete (check references) |

**[Related Entities 2] (all require auth):**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/[related-entities-2]` | List user's [related-entities-2] with usage count |
| POST | `/[related-entities-2]` | Create [related-entity-2] |
| DELETE | `/[related-entities-2]/:id` | Hard delete [related-entity-2] |

**Utility:**
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/health` | No | Health check |
| GET | `/stats` | Yes | Dashboard stats (counts by status, priority, overdue, completed today) |

### 3.7 Standard API response format

```typescript
// EVERY API response MUST follow this format — NO EXCEPTIONS

interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: PaginationMeta;
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;          // e.g. 'VALIDATION_ERROR', 'NOT_FOUND', 'UNAUTHORIZED'
    message: string;       // Localized via i18next based on Accept-Language
    details?: unknown;     // Zod validation errors, field-level errors, etc.
  };
}

type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
```

### 3.8 Query parameters for GET /[entities]

```
?status=pending,completed        # multi-value filter
?priority=high,urgent            # multi-value filter
?[related-entity-1]_id=1                   # filter by [related-entity-1]
?tag=work,personal               # filter by [related-entity-2] slug
?search=keyword                  # full-text on title + description
?due_before=2026-12-31           # due date before
?due_after=2026-01-01            # due date after
?is_pinned=true                  # pinned only
?include_deleted=false           # include soft-deleted (default false)
?sort=due_date                   # sort by: created_at, updated_at, due_date, priority, sort_order
?order=asc                       # direction: asc | desc
?page=1                          # pagination
?limit=20                        # items per page (max 100, default 20)
```

### 3.9 Rate limiting strategy

| Scope | Limit | Window |
|-------|-------|--------|
| Global (per IP) | 100 requests | 1 minute |
| Auth endpoints (per IP) | 10 requests | 1 minute |
| Bulk operations (per user) | 5 requests | 1 minute |
| Registration (per IP) | 3 requests | 15 minutes |

### 3.10 Server-side validation with Zod

Every endpoint gets a Zod schema that validates:
- **Body** — all required fields, types, constraints (string length, enum values, etc.)
- **Params** — ID must be a positive integer
- **Query** — pagination bounds (limit 1-100), valid enum values for status/priority/sort

Validation middleware returns structured errors:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      { "field": "title", "message": "Title is required", "code": "too_small" },
      { "field": "priority", "message": "Invalid priority value", "code": "invalid_enum_value" }
    ]
  }
}
```

### 3.11 TDD development order for backend

For EVERY endpoint, follow this exact sequence:

1. **Write the Zod validators** (request params/body/query + response shape)
2. **Write the TypeScript types/interfaces** derived from the Zod schemas
3. **Write UNIT tests** for the service layer (mock repository) → RED
4. **Write API tests** with Supertest (mock service or in-memory DB) → RED
5. **Implement** Repository → Service → Controller → Route → GREEN
6. **Write INTEGRATION tests** with real SQLite in-memory DB → GREEN
7. **Refactor** + verify coverage ≥ 85%
8. **Run** `npm run quality` (lint + format:check + typecheck + test:coverage)
9. **Commit** with Conventional Commits message

---

## 4. PHASE 3 — FRONTEND (TDD + Spec-Driven)

### 4.1 TypeScript strict configuration (frontend)

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "forceConsistentCasingInFileNames": true,
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 4.2 i18n with next-intl

- Supported locales: `it`, `en`, `es` (default: `it`)
- Routing: `/it/[entities]`, `/en/[entities]`, `/es/[entities]`
- Middleware for locale detection: Accept-Language header → cookie → default
- Separate message files per locale in `src/i18n/messages/`
- Server Components: use `getTranslations()`
- Client Components: use `useTranslations()`
- ALL user-facing strings must be externalized — zero hardcoded text

### 4.3 Client-side validation

Mirror the backend Zod schemas on the client. Use `React Hook Form` + `@hookform/resolvers/zod` for form validation. Validation rules must match the server exactly (reuse shared types if possible via a shared package or copy).

**Every form must:**
- Validate on blur and on submit
- Show inline field-level errors immediately below the input
- Show errors in the current locale
- Disable submit button when form is invalid or submitting
- Show loading state during submission
- Handle and display server-side validation errors (map `details[]` to fields)

### 4.4 Accessibility — W3C WCAG 2.2 AA compliance (MANDATORY)

This is NOT optional. Every component, page, and interaction MUST be fully accessible.

**Structural requirements:**
- Skip-to-content link as the very first focusable element
- Proper heading hierarchy: one `<h1>` per page, no skipped levels
- Landmark regions: `<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>` with `aria-label` where multiple of the same type exist
- Language attribute on `<html lang="...">` matching the current locale
- Page `<title>` unique and descriptive per route

**Interactive elements:**
- Every `<button>` and `<a>` has accessible name (text content or `aria-label`)
- Every `<input>`, `<select>`, `<textarea>` has a visible `<label>` linked via `htmlFor`/`id`
- Error messages linked to inputs via `aria-describedby`
- `aria-invalid="true"` on inputs with validation errors
- `aria-required="true"` on required fields
- Custom components (dropdowns, dialogs, tabs) follow WAI-ARIA Authoring Practices
- Focus management: after dialog open → focus first focusable; after close → return focus to trigger
- Focus trap inside modal dialogs
- `role="status"` or `aria-live="polite"` for async status messages (toast notifications, loading states)
- `aria-live="assertive"` for critical errors only

**Keyboard navigation:**
- Every interactive element reachable via Tab
- Tab order follows logical reading order (no positive `tabindex`)
- Escape closes modals/dropdowns
- Enter/Space activates buttons and links
- Arrow keys navigate within composite widgets (tabs, menus, radio groups)
- No keyboard traps — user can always Tab out of any component (except intentional modal focus traps that have an Escape exit)
- Visible focus indicator on EVERY focusable element (minimum 2px outline, 3:1 contrast ratio against adjacent colors)

**Visual requirements:**
- Color contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text (WCAG AA)
- Information never conveyed by color alone (status: use icon + text + color)
- Minimum touch target size: 44×44px on mobile
- Text resizable to 200% without loss of content or functionality
- Prefers-reduced-motion: disable/reduce animations when set
- Prefers-color-scheme: respect system theme preference
- No content that flashes more than 3 times per second

**Forms:**
- Error summary at top of form after submission attempt, with links to each field
- Inline errors below each invalid field
- Success confirmation announced to screen readers via live region
- Form progress saved if multi-step (not applicable here, but design for it)

**Testing a11y:**
- `@axe-core/playwright` in every E2E test
- `vitest-axe` for component unit tests
- Every page must pass `axe.run()` with zero violations
- Manual keyboard navigation tests in Playwright (Tab, Enter, Escape flows)

### 4.5 UI/UX design standards

**Design system foundations:**
- Consistent spacing scale (4px base: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64)
- Typography scale with clear hierarchy (use `next/font` with Inter or system font stack)
- Color palette: primary, secondary, success, warning, error, neutral — each with 50-950 shade scale
- Border radius tokens: sm (4px), md (8px), lg (12px), xl (16px), full (9999px)
- Shadow tokens: sm, md, lg, xl
- Transition tokens: fast (150ms), normal (200ms), slow (300ms)

**Interaction patterns:**
- Optimistic updates for status changes and pin toggles (revert on error)
- Loading skeletons (not spinners) for page-level loading
- Inline loading indicators for button actions
- Confirmation dialog for destructive actions (delete, bulk delete)
- Toast notifications for success/error feedback (auto-dismiss success after 5s, persist errors)
- Empty states with illustration and helpful CTA
- Drag-and-drop for manual sort ordering (keyboard accessible: move up/down with shortcuts)

**Responsive design:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly targets on mobile (min 44×44px)
- Collapsible sidebar on mobile
- Stack filters vertically on mobile, horizontal on desktop

**Dark mode:**
- System preference detection + manual toggle
- Persisted in cookie (accessible server-side for SSR)
- Smooth transition between themes (150ms on background-color, color)
- Separate color tokens for light/dark

### 4.6 Granular error recovery

**Error boundaries per route segment:**
- `app/[locale]/error.tsx` — catches errors in the locale layout
- `app/[locale]/[entities]/error.tsx` — catches errors in the [entities] section
- `app/[locale]/[entities]/[id]/error.tsx` — catches errors in [entity] detail
- `app/[locale]/auth/error.tsx` — catches errors in auth pages
- `app/global-error.tsx` — last-resort catch-all

**Each error boundary must:**
- Show a user-friendly, localized error message
- Offer a "Try again" button that calls `reset()`
- Log the error to console (and optionally to a monitoring service)
- NOT expose stack traces or technical details to the user
- Have accessible error announcement via `role="alert"`

**Network error handling in API client:**
- Timeout after 10 seconds
- Retry on 5xx errors (max 3 retries with exponential backoff)
- Show user-friendly message for network errors
- Queue failed mutations for retry when online (if applicable)

### 4.7 Pages and features

**Homepage (`/[locale]`):**
- Hero with app overview and value proposition
- Quick stats (total [entities], completed today, overdue)
- CTA to go to [entities] or register
- Fully static / ISR

**Auth pages:**
- `/[locale]/auth/login` — email + password, "Remember me" toggle, link to register
- `/[locale]/auth/register` — email + password + confirm password + display name

**Dashboard (`/[locale]/dashboard`):**
- Overview stats with visual charts (bar chart for status distribution, pie for [related-entities-1])
- Recent activity feed
- Quick-add [entity] form

**[Entity] list (`/[locale]/[entities]`):**
- Filterable, sortable, searchable [entity] list
- View toggle: card grid / compact list
- Filters: status, priority, [related-entity-1], [related-entity-2], search, date range
- Active filter chips with clear-all
- Filters persisted in URL searchParams
- Bulk select with shift+click, select all
- Bulk actions bar (appears on selection): complete, delete, change [related-entity-1]
- Pagination controls (page size selector: 10/20/50)
- Drag-and-drop sort within view
- Empty state with illustration

**[Entity] detail (`/[locale]/[entities]/[id]`):**
- Full [entity] view with all fields
- Inline editing (click to edit title/description)
- [Related Entity 2] management (add/remove with autocomplete)
- [Related Entity 1] selector
- Priority and status controls
- Breadcrumb navigation
- Back button

**Components (build all of these):**
- `SkipLink` — skip-to-content
- `Button` — variants: primary, secondary, outline, ghost, destructive; sizes: sm, md, lg; loading state
- `Input` — with label, helper text, error state, `aria-describedby`
- `Textarea` — same as Input
- `Select` — custom accessible select with keyboard navigation
- `Checkbox` — custom styled, accessible
- `Badge` — status/priority/[related-entity-1] badges with icon + text
- `Dialog` — modal with focus trap, Escape to close, focus return
- `ConfirmDialog` — extends Dialog for destructive action confirmation
- `Toast` / `Toaster` — notification system with `aria-live`
- `Pagination` — page controls with aria-labels
- `SearchBar` — with debounce (300ms) and clear button
- `TodoCard` — card with status badge, priority indicator, [related-entity-1] chip, actions menu
- `TodoForm` — create/edit form with full validation
- `TodoFilters` — filter bar with active chips
- `TodoList` — list container with selection state
- `[Related Entity 1]Select` — select/create [related-entity-1] inline
- `TagInput` — [related-entity-2] input with autocomplete dropdown
- `StatusBadge` — colored badge with icon per status
- `PriorityIndicator` — visual priority indicator
- `ThemeToggle` — dark/light with system option, accessible
- `LocaleSwitcher` — language selector, accessible
- `UserMenu` — avatar/dropdown with profile and logout
- `Skeleton` — loading skeleton variants for each content type
- `EmptyState` — illustration + message + CTA
- `ErrorState` — error display + retry button
- `LiveRegion` — `aria-live` announcer for async updates
- `FocusTrap` — utility for dialog focus management
- `VisuallyHidden` — screen-reader-only text utility

### 4.8 TDD development order for frontend

For EVERY component and page:

1. **Define types** (props, state, API response types)
2. **Write Vitest tests** with React Testing Library (+ `vitest-axe` for a11y) → RED
3. **Implement** the component → GREEN
4. **Write integration tests** for multi-component flows → GREEN
5. **Refactor** + verify coverage ≥ 85%
6. **Run** `npm run quality`
7. **Commit**

---

## 5. PHASE 4 — E2E TESTS WITH PLAYWRIGHT

### 5.1 Playwright configuration

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    process.env.CI ? ['github'] : ['list'],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    locale: 'it-IT',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: [
    {
      command: 'cd ../backend && npm run dev',
      port: 3001,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'npm run dev',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
```

### 5.2 Mandatory E2E test scenarios

Every E2E test must include an `axe-core` accessibility check on every page visited.

**Auth flows:**
1. Register → auto-login → see dashboard
2. Login → see dashboard → logout → redirect to login
3. Login with wrong credentials → see error message
4. Register with existing email → see error
5. Access protected page without auth → redirect to login
6. Token refresh → transparent to user (session persists)

**[Entity] CRUD:**
7. Create [entity] (all fields) → appears in list
8. View [entity] detail → all fields displayed correctly
9. Edit [entity] inline → changes saved, toast shown
10. Complete [entity] → status badge updates, completion timestamp
11. Archive [entity] → disappears from default view
12. Soft-delete [entity] → disappears from list, recoverable
13. Restore deleted [entity] → appears back in list

**Filters and search:**
14. Filter by status → list updates
15. Filter by priority → list updates
16. Filter by [related-entity-1] → list updates
17. Combined filters → correct results
18. Search by keyword → results matching title/description
19. Clear all filters → full list restored
20. Filters reflected in URL → shareable filtered view

**Bulk operations:**
21. Select multiple → bulk action bar appears
22. Bulk complete → all selected marked complete
23. Bulk delete → confirmation dialog → all removed
24. Select all → actions apply to all

**[Related Entities 1] and [related-entities-2]:**
25. Create [related-entity-1] → appears in filter and [entity] form
26. Assign [related-entity-1] to [entity] → filter works
27. Delete [related-entity-1] → [entities] lose [related-entity-1] reference
28. Add [related-entity-2] to [entity] → [related-entity-2] appears on card
29. Remove [related-entity-2] → [related-entity-2] removed from card
30. [Related Entity 2] autocomplete → suggests existing [related-entities-2]

**Pagination:**
31. Navigate pages → correct items shown
32. Change page size → list updates
33. Filters + pagination → consistent results

**i18n:**
34. Switch to English → all UI text translates
35. Switch to Spanish → all UI text translates
36. Language persists across navigation
37. API error messages in selected locale

**Responsive:**
38. Mobile layout (Pixel 5) → sidebar collapsed, stacked layout
39. Desktop layout → sidebar visible, grid layout

**Dark mode:**
40. Toggle dark mode → theme applies immediately
41. Theme persists across page refresh
42. System preference respected on first visit

**Accessibility (run on EVERY page):**
43. `axe.run()` returns zero violations on every page
44. Full keyboard navigation: Tab through all interactive elements
45. Screen reader: all content has semantic structure
46. Focus management: dialog open → focus trapped; close → focus returns
47. Skip-to-content link works

**Error handling:**
48. Backend down → user-friendly error with retry
49. Network timeout → retry with feedback
50. Invalid form submission → inline errors shown
51. 404 page → localized not-found with navigation

---

## 6. PHASE 5 — DOCKER & CI/CD

### 6.1 Docker — Backend (multi-stage)

```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/src/db/migrations ./src/db/migrations
RUN npm ci --omit=dev
RUN mkdir -p data && chown appuser:appgroup data
USER appuser
EXPOSE 3001
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3001/api/v1/health || exit 1
CMD ["node", "dist/index.js"]
```

### 6.2 Docker — Frontend (multi-stage)

```dockerfile
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN npm run build

FROM node:24-alpine AS production
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
USER appuser
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/ || exit 1
CMD ["node", "server.js"]
```

### 6.3 Docker Compose

```yaml
# docker-compose.yml — development
services:
  backend:
    build:
      context: ./backend
      target: builder
    ports:
      - "3001:3001"
    volumes:
      - ./backend/src:/app/src
      - backend-data:/app/data
    env_file:
      - ./backend/.env
    environment:
      - NODE_ENV=development
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      target: builder
    ports:
      - "3000:3000"
    volumes:
      - ./frontend/src:/app/src
    env_file:
      - ./frontend/.env.local
    environment:
      - NODE_ENV=development
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  backend-data:

# Also create docker-compose.prod.yml:
# - target: production (no volume mounts)
# - Active healthchecks
# - Resource limits (memory, CPU)
# - Logging driver configuration
# - Restart: always
```

### 6.4 GitHub Actions CI/CD

**ci.yml — Runs on every PR to develop and main:**

```yaml
name: CI Pipeline

on:
  pull_request:
    branches: [develop, main]
  push:
    branches: [develop]

env:
  NODE_VERSION: '24'

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        workspace: [frontend, backend]
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: '${{ matrix.workspace }}/package-lock.json'
      - run: cd ${{ matrix.workspace }} && npm ci
      - run: cd ${{ matrix.workspace }} && npm run lint
      - run: cd ${{ matrix.workspace }} && npm run format:check
      - run: cd ${{ matrix.workspace }} && npx tsc --noEmit

  test-backend:
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    env:
      JWT_ACCESS_SECRET: ci-test-access-secret-minimum-32-chars
      JWT_REFRESH_SECRET: ci-test-refresh-secret-minimum-32-chars
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'backend/package-lock.json'
      - run: cd backend && npm ci
      - run: cd backend && npm run test:coverage
      - name: Coverage gate (≥ 85%)
        run: |
          cd backend
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Backend coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 85" | bc -l) )); then
            echo "❌ Backend coverage $COVERAGE% is below 85%"
            exit 1
          fi
          echo "✅ Backend coverage $COVERAGE% meets threshold"
      - uses: actions/upload-artifact@v4
        with:
          name: backend-coverage
          path: backend/coverage/

  test-frontend:
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
          cache-dependency-path: 'frontend/package-lock.json'
      - run: cd frontend && npm ci
      - run: cd frontend && npm run test:coverage
      - name: Coverage gate (≥ 85%)
        run: |
          cd frontend
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          echo "Frontend coverage: $COVERAGE%"
          if (( $(echo "$COVERAGE < 85" | bc -l) )); then
            echo "❌ Frontend coverage $COVERAGE% is below 85%"
            exit 1
          fi
          echo "✅ Frontend coverage $COVERAGE% meets threshold"
      - uses: actions/upload-artifact@v4
        with:
          name: frontend-coverage
          path: frontend/coverage/

  test-e2e:
    runs-on: ubuntu-latest
    needs: [test-backend, test-frontend]
    env:
      JWT_ACCESS_SECRET: ci-test-access-secret-minimum-32-chars
      JWT_REFRESH_SECRET: ci-test-refresh-secret-minimum-32-chars
      DATABASE_URL: ./data/test-e2e.db
      NEXT_PUBLIC_API_URL: http://localhost:3001/api/v1
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - run: cd backend && npm ci
      - run: cd frontend && npm ci
      - run: cd frontend && npx playwright install --with-deps
      - run: cd frontend && npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: frontend/playwright-report/

  a11y-audit:
    runs-on: ubuntu-latest
    needs: [test-backend, test-frontend]
    env:
      JWT_ACCESS_SECRET: ci-test-access-secret-minimum-32-chars
      JWT_REFRESH_SECRET: ci-test-refresh-secret-minimum-32-chars
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
      - run: cd backend && npm ci && npm run build
      - run: cd frontend && npm ci && npm run build
      - name: Run Lighthouse a11y audit
        uses: treosh/lighthouse-ci-action@v12
        with:
          urls: |
            http://localhost:3000/it
            http://localhost:3000/it/[entities]
            http://localhost:3000/it/auth/login
          configPath: '.lighthouserc.json'
          uploadArtifacts: true

  docker-build:
    runs-on: ubuntu-latest
    needs: [test-e2e, a11y-audit]
    strategy:
      matrix:
        service: [frontend, backend]
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - run: docker build -t [entity]-${{ matrix.service }}:ci ./${{ matrix.service }}
```

**cd-production.yml — Vercel deploy on merge to main:**

```yaml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_BACKEND_PROJECT_ID }}
          working-directory: ./backend
          vercel-args: '--prod'

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: deploy-backend
    steps:
      - uses: actions/checkout@v4
        with:
          submodules: recursive
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_FRONTEND_PROJECT_ID }}
          working-directory: ./frontend
          vercel-args: '--prod'
```

Create also `cd-staging.yml` for deploy on push to `develop` (same but without `--prod`).

### 6.5 Vercel configuration

```json
// backend/vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" }
  ]
}

// frontend/vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

Configure Vercel environment variables via dashboard or CLI for:
- All `.env.example` variables
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_BACKEND_PROJECT_ID`, `VERCEL_FRONTEND_PROJECT_ID` as GitHub repository secrets

---

## 7. PHASE 6 — SEO, AEO & PERFORMANCE

### 7.1 Technical SEO

- **Dynamic metadata** for every page via `generateMetadata()` in Next.js
- **OpenGraph + Twitter Cards** for every page (title, description, image, type, locale)
- **Canonical URLs** with `hreflang` alternates for all locale variants
- **robots.txt** — allow public pages, disallow `/api/`
- **Dynamic XML sitemap** via `next-sitemap` or App Router sitemap route:
  - All localized pages (`/it/`, `/en/`, `/es/`)
  - lastmod, changefreq, priority per page
- **Structured Data (JSON-LD):**
  - `WebApplication` on homepage
  - `BreadcrumbList` on every internal page
  - `WebPage` with `inLanguage` per locale
  - `ItemList` on the [entity] list page (if public)
- **Core Web Vitals optimization:**
  - Server Components by default (minimize client JS)
  - `loading.tsx` with skeleton for streaming SSR
  - `next/image` for all images
  - `next/font` for optimized font loading
  - `dynamic()` for lazy loading heavy components
  - Bundle analysis with `@next/bundle-analyzer`

### 7.2 AEO (Agentic Engine Optimization)

- **`public/llms.txt`:**
  ```
  # [Project Name]
  > A multilingual task management application with full accessibility support.

  ## Features
  - Create, organize, and track [entities] with [related-entities-1] and [related-entities-2]
  - Priority levels (low, medium, high, urgent) and due dates
  - Available in Italian, English, and Spanish
  - Fully accessible (WCAG 2.2 AA compliant)
  - Dark mode support

  ## API
  - REST API at /api/v1
  - OpenAPI documentation at /api/v1/docs
  - Authentication via httpOnly cookies
  ```

- **`public/llms-full.txt`** — full API documentation with all endpoints, request/response formats
- **Extended Schema.org markup** for machine readability
- **OpenAPI/Swagger spec** for the backend at `/api/v1/docs`:
  - Generate from Zod validators using `@asteasolutions/zod-to-openapi`
  - Serve with Swagger UI or Scalar
- **`X-Robots-Tag`** headers on API responses

### 7.3 Performance targets

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | 100 |
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |

---

## 8. PHASE 7 — FINALIZATION

### 8.1 npm scripts (both workspaces)

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "start": "...",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:unit": "vitest run tests/unit",
    "test:api": "vitest run tests/api",
    "test:integration": "vitest run tests/integration",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:a11y": "playwright test --grep @a11y",
    "quality": "npm run lint && npm run format:check && npm run typecheck && npm run test:coverage",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:seed": "tsx src/db/seed.ts",
    "db:studio": "drizzle-kit studio"
  }
}
```

### 8.2 .env.example (backend)

```env
# Server
NODE_ENV=development
PORT=3001
API_VERSION=v1

# Database
DATABASE_URL=./data/[entity].db

# CORS
CORS_ORIGIN=http://localhost:3000

# Logging
LOG_LEVEL=debug

# Rate Limiting
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=60000

# i18n
DEFAULT_LOCALE=en

# Auth — GENERATE SECURE VALUES, NEVER USE DEFAULTS IN PRODUCTION
JWT_ACCESS_SECRET=change-me-to-a-random-64-char-string-in-production-now
JWT_REFRESH_SECRET=change-me-to-another-random-64-char-string-in-production
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false
```

### 8.3 .env.example (frontend)

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=it
```

### 8.4 README.md

Generate a comprehensive README with:
- Badges (CI status, coverage, license, Node version, accessibility)
- Project description and screenshot/GIF demo placeholder
- Features list
- Quick start (local dev, Docker, production)
- Architecture diagram (text or Mermaid)
- Technology stack table
- API documentation link
- Directory structure
- Available commands
- Accessibility statement
- i18n support details
- Contributing guidelines
- License (MIT)

### 8.5 CHANGELOG.md

Initialize with Keep a Changelog format:
```markdown
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial project scaffold
```

### 8.6 MEMORY.md

Create and keep updated with:
- Current project state (which phase is complete)
- Architectural decisions and rationale
- Known issues
- Remaining technical TODOs
- Last completed phase
- Next phase to execute
- Current version number
- API version history

---

## 9. EXECUTION ORDER

> ⚠️ Follow this order EXACTLY. Do NOT skip phases. Do NOT proceed to the next phase until the current one is fully complete with all tests passing and coverage ≥ 85%.

```
PHASE 0 → Bootstrap & Infrastructure
  ├── 0.1  Create CLAUDE.md (FIRST file, before anything else)
  ├── 0.2  Create GitHub repos with gh CLI (3 repos)
  ├── 0.3  Set up git submodules
  ├── 0.4  Git Flow init on all repos
  ├── 0.5  .nvmrc (Node 24) in all locations
  ├── 0.6  Root package.json with workspaces
  ├── 0.7  Install skills from skills.sh
  ├── 0.8  Configure MCP servers
  ├── 0.9  Backend setup: package.json, tsconfig.json (strict), eslint.config.mjs, prettier.config.mjs
  ├── 0.10 Frontend setup: create-next-app (App Router), tsconfig.json (strict), eslint, prettier
  ├── 0.11 .env.example files + .gitignore + .editorconfig
  ├── 0.12 README.md + CHANGELOG.md + MEMORY.md (initial versions)
  ├── 0.13 Docker files (Dockerfile both + docker-compose.yml + docker-compose.prod.yml)
  └── 0.14 Commit: "chore: initial project scaffold" → push all 3 repos

PHASE 1 → Database Schema (v0.1.0)
  ├── git flow feature start database-schema (in backend repo)
  ├── 1.1 Drizzle config + full schema (all tables from §2.1)
  ├── 1.2 Generate and apply migrations
  ├── 1.3 Multilingual seeder (IT/EN/ES demo data + demo user)
  ├── 1.4 Schema tests (constraints, relationships, soft delete behavior)
  ├── 1.5 npm run quality → verify everything passes
  ├── 1.6 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish database-schema

PHASE 2 → Backend Auth (v0.2.0)
  ├── git flow feature start auth
  ├── 2.1 Pino logger + correlation ID middleware
  ├── 2.2 Env validation (Zod)
  ├── 2.3 App factory + global middlewares (cors, helmet, rate limiter, error handler, i18n)
  ├── 2.4 Health endpoint + tests
  ├── 2.5 Auth system: register + login + refresh + logout + me (TDD per §3.11)
  ├── 2.6 Authenticate middleware (JWT cookie verification)
  ├── 2.7 All auth tests: unit + api + integration
  ├── 2.8 npm run quality → coverage ≥ 85%
  ├── 2.9 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish auth

PHASE 3 → Backend CRUD API (v0.3.0)
  ├── git flow feature start backend-crud
  ├── 3.1 [Related Entities 1] CRUD + tests (unit → api → integration)
  ├── 3.2 [Related Entities 2] CRUD + tests
  ├── 3.3 [Entities] CRUD + tests
  ├── 3.4 Filters, pagination, search + tests
  ├── 3.5 Bulk operations + tests
  ├── 3.6 Pin / status change / restore + tests
  ├── 3.7 Stats endpoint + tests
  ├── 3.8 i18n for all error messages + tests
  ├── 3.9 OpenAPI spec generation from Zod schemas
  ├── 3.10 npm run quality → coverage ≥ 85%
  ├── 3.11 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish backend-crud

PHASE 4 → Frontend Foundation (v0.4.0)
  ├── git flow feature start frontend-foundation (in frontend repo)
  ├── 4.1 i18n setup (next-intl, 3 locales, middleware)
  ├── 4.2 Theme system (dark/light/system, cookie persistence)
  ├── 4.3 Layout: root + locale layout + SkipLink + Header + Footer + Navigation
  ├── 4.4 All atomic UI components + tests (Button, Input, Badge, Dialog, Toast, etc.)
  ├── 4.5 a11y utility components (LiveRegion, FocusTrap, VisuallyHidden)
  ├── 4.6 API client with auth cookie forwarding
  ├── 4.7 Error boundaries (global + per-section)
  ├── 4.8 npm run quality → coverage ≥ 85%
  ├── 4.9 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish frontend-foundation

PHASE 5 → Frontend Auth Pages (v0.5.0)
  ├── git flow feature start frontend-auth
  ├── 5.1 Auth service + hooks (useAuth)
  ├── 5.2 Login page + form validation + tests
  ├── 5.3 Register page + form validation + tests
  ├── 5.4 Auth middleware (redirect unauthenticated)
  ├── 5.5 UserMenu component + tests
  ├── 5.6 npm run quality → coverage ≥ 85%
  ├── 5.7 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish frontend-auth

PHASE 6 → Frontend [Entity] Features (v0.6.0)
  ├── git flow feature start frontend-[entities]
  ├── 6.1 [Entity] service + hooks (useTodos)
  ├── 6.2 TodoCard + TodoList + tests
  ├── 6.3 TodoForm (create/edit) + validation + tests
  ├── 6.4 TodoFilters + SearchBar + tests
  ├── 6.5 Pagination + tests
  ├── 6.6 [Entity] list page (full feature) + tests
  ├── 6.7 [Entity] detail page + inline editing + tests
  ├── 6.8 Bulk operations UI + tests
  ├── 6.9 [Related Entity 1] management + tests
  ├── 6.10 [Related Entity 2] management + autocomplete + tests
  ├── 6.11 Drag-and-drop sort + keyboard sort + tests
  ├── 6.12 Dashboard page + stats + tests
  ├── 6.13 Homepage + tests
  ├── 6.14 npm run quality → coverage ≥ 85%
  ├── 6.15 Update CHANGELOG.md, MEMORY.md
  └── git flow feature finish frontend-[entities]

PHASE 7 → E2E Tests (v0.7.0)
  ├── git flow feature start e2e-tests
  ├── 7.1 Playwright setup + test helpers + auth helpers
  ├── 7.2 Auth flow tests (scenarios 1-6)
  ├── 7.3 [Entity] CRUD tests (scenarios 7-13)
  ├── 7.4 Filter and search tests (scenarios 14-20)
  ├── 7.5 Bulk operation tests (scenarios 21-24)
  ├── 7.6 [Related Entity 1] and [related-entity-2] tests (scenarios 25-30)
  ├── 7.7 Pagination tests (scenarios 31-33)
  ├── 7.8 i18n tests (scenarios 34-37)
  ├── 7.9 Responsive tests (scenarios 38-39)
  ├── 7.10 Dark mode tests (scenarios 40-42)
  ├── 7.11 Accessibility tests with axe-core (scenarios 43-47)
  ├── 7.12 Error handling tests (scenarios 48-51)
  ├── 7.13 Cross-browser verification (Chromium, Firefox, WebKit, mobile)
  └── git flow feature finish e2e-tests

PHASE 8 → SEO & AEO (v0.8.0)
  ├── git flow feature start seo-aeo
  ├── 8.1 Dynamic metadata + OpenGraph for all pages
  ├── 8.2 Structured Data JSON-LD (WebApplication, BreadcrumbList, WebPage)
  ├── 8.3 Sitemap generation + robots.txt
  ├── 8.4 llms.txt + llms-full.txt
  ├── 8.5 OpenAPI docs endpoint with Swagger UI / Scalar
  ├── 8.6 Performance audit → Lighthouse ≥ 90 perf, 100 a11y
  ├── 8.7 Bundle analysis + optimization
  └── git flow feature finish seo-aeo

PHASE 9 → CI/CD & Docker (v0.9.0)
  ├── git flow feature start cicd
  ├── 9.1 GitHub Actions: ci.yml (lint, test, coverage gate, a11y audit)
  ├── 9.2 GitHub Actions: cd-staging.yml (Vercel preview on develop push)
  ├── 9.3 GitHub Actions: cd-production.yml (Vercel prod on main push)
  ├── 9.4 Lighthouse CI config (.lighthouserc.json)
  ├── 9.5 Verify Docker dev build works
  ├── 9.6 Verify Docker prod build works
  ├── 9.7 Configure Vercel projects (backend + frontend)
  └── git flow feature finish cicd

PHASE 10 → Release 1.0.0
  ├── git flow release start 1.0.0
  ├── 10.1 Run FULL checklist from §11
  ├── 10.2 Final README.md with all sections complete
  ├── 10.3 Final CHANGELOG.md with all versions
  ├── 10.4 Final MEMORY.md
  ├── 10.5 Final CLAUDE.md
  ├── 10.6 [Related Entity 2] v1.0.0
  └── git flow release finish 1.0.0
```

---

## 10. .env FILES — SECURITY RULES

1. **NEVER** commit `.env` or `.env.local` files — only `.env.example`
2. `.gitignore` must include: `.env`, `.env.local`, `.env.production`, `.env*.local`
3. In CI, secrets go in GitHub repository secrets, referenced via `${{ secrets.NAME }}`
4. In Vercel, secrets go in project environment variables (per environment)
5. Generate JWT secrets with: `openssl rand -base64 64`
6. The `COOKIE_SECURE` flag must be `true` in production
7. `CORS_ORIGIN` must be the exact production frontend URL in production
8. Run `grep -r "password\|secret\|token\|key" --include="*.ts" --include="*.tsx" src/` before every release to check for hardcoded secrets

---

## 11. FINAL CHECKLIST — EVERY ITEM MUST BE GREEN BEFORE v1.0.0

### Code quality
- [ ] TypeScript strict: zero errors from `tsc --noEmit` in both workspaces
- [ ] ESLint: zero errors and zero warnings in both workspaces
- [ ] Prettier: zero diffs in both workspaces (`format:check` passes)
- [ ] No `any` types anywhere in the codebase
- [ ] No `@ts-ignore` or `@ts-expect-error` anywhere

### Testing
- [ ] Backend unit tests: ≥ 85% line coverage
- [ ] Backend API tests (Supertest): all green
- [ ] Backend integration tests: all green
- [ ] Frontend unit tests: ≥ 85% line coverage
- [ ] Frontend integration tests: all green
- [ ] E2E Playwright tests: all 51 scenarios green
- [ ] E2E cross-browser: Chromium + Firefox + WebKit + Mobile Chrome + Mobile Safari
- [ ] axe-core: zero a11y violations on every page

### Accessibility (W3C WCAG 2.2 AA)
- [ ] Skip-to-content link present and functional
- [ ] Proper heading hierarchy on every page
- [ ] All landmark regions labeled
- [ ] Every interactive element keyboard-accessible
- [ ] Tab order logical on every page
- [ ] Focus visible on every focusable element
- [ ] Focus trap in dialogs with Escape exit
- [ ] Color contrast ≥ 4.5:1 (normal text) / ≥ 3:1 (large text)
- [ ] No information conveyed by color alone
- [ ] Touch targets ≥ 44×44px on mobile
- [ ] Forms: inline errors + error summary + aria-describedby + aria-invalid
- [ ] Live regions for async updates
- [ ] Prefers-reduced-motion respected
- [ ] Text resizable to 200% without breakage
- [ ] Lighthouse Accessibility score: 100

### Infrastructure
- [ ] Docker build: both images build without errors
- [ ] `docker compose up` (dev) works
- [ ] `docker compose -f docker-compose.prod.yml up` (prod) works
- [ ] Health check: `/api/v1/health` returns 200
- [ ] GitHub Actions CI: all jobs green
- [ ] Vercel deploys successfully (both projects)

### Features
- [ ] Auth: register, login, refresh, logout, profile all working
- [ ] CRUD: create, read, update, soft-delete, restore all working
- [ ] Filters: status, priority, [related-entity-1], [related-entity-2], search, date range
- [ ] Bulk operations: complete, delete
- [ ] Pagination: page navigation, page size change
- [ ] [Related Entities 1]: CRUD + assignment to [entities]
- [ ] [Related Entities 2]: CRUD + assignment to [entities] + autocomplete
- [ ] Pin: toggle pin, pinned items appear first

### i18n
- [ ] All 3 locales working: IT, EN, ES
- [ ] Locale routing: `/it/`, `/en/`, `/es/`
- [ ] Locale detection from Accept-Language header
- [ ] Locale persistence in cookie
- [ ] All UI strings externalized (zero hardcoded text)
- [ ] API error messages localized
- [ ] Locale switcher functional

### SEO & AEO
- [ ] Meta [related-entities-2] (title, description) on every page
- [ ] OpenGraph + Twitter Card [related-entities-2] on every page
- [ ] Canonical URLs with hreflang alternates
- [ ] Structured Data (JSON-LD) on applicable pages
- [ ] Sitemap XML generated and accessible
- [ ] robots.txt present and correct
- [ ] llms.txt present
- [ ] llms-full.txt present
- [ ] OpenAPI docs endpoint accessible
- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse SEO: 100

### Security
- [ ] NO secrets hardcoded in code
- [ ] `.env.example` files present and complete in both workspaces
- [ ] Cookies: httpOnly, Secure (in prod), SameSite=Lax
- [ ] Passwords hashed with bcrypt (12 rounds)
- [ ] Rate limiting active on all endpoints
- [ ] Helmet security headers active
- [ ] CORS restricted to specific origin
- [ ] Input validation (Zod) on every endpoint
- [ ] SQL injection prevented by ORM (Drizzle parameterized queries)

### Documentation
- [ ] CLAUDE.md: complete and current
- [ ] README.md: complete with all sections
- [ ] CHANGELOG.md: all versions documented
- [ ] MEMORY.md: current state documented
- [ ] Git Flow: main and develop branches aligned with release 1.0.0
- [ ] All commits follow Conventional Commits
- [ ] .nvmrc present in root, frontend, and backend (Node 24)