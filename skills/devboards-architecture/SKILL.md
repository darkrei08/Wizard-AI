---
name: devboards-architecture
description: Multi-app Monorepo Architecture Skill based on DevBoards.io structure. Enforces independent sub-directories under apps/ with their own git history, backend (Bun/Elysia), frontend (Qwik/Nuxt), dashboard (Vue), and python scrapers. Uses MongoDB Replica Sets and Redis Stack.
---

# 🏗️ DevBoards Architecture (Multi-App Wrapper)

This skill enforces a **wrapper repository** orchestration pattern. Instead of a tight monorepo (like Turborepo), each sub-directory under `apps/` is an independent repository with its own git history, dependencies, and deploy pipeline.

## Repository Structure

```
apps/
├── backend/        # ElysiaJS REST API (Bun runtime)
├── frontend/       # SSR public web app (Qwik or Nuxt)
├── dashboard/      # Admin SPA (Vue 3)
├── job_scraper/    # Data ingestion pipeline (Python)
├── news_scraper/   # News scraper + AI translation (Python)
└── devops/         # Docker Compose, GitHub Actions, Nginx config
```

## Prerequisites

- [Bun](https://bun.sh/) v1.2+ (backend, frontend, dashboard)
- Python 3.11+ with pip (scrapers)
- MongoDB 7 with replica set (`--replSet rs0`)
- Redis Stack Server

## Execution Environment

Applications are designed to be run in parallel during development using wrapper scripts:
- `./start_dev.sh` to start all apps.
- `./run_linters.sh` and `./run_tests.sh` to trigger CI processes across sub-repos.

## Engineering Excellence Link

This architecture strongly couples with **Engineering Excellence**. Each sub-application must follow TDD, clean code, and provide extensive documentation.

## Deployment

Deployment is tag-based via GitHub Actions defined in `apps/devops/workflows/`.
- Push `stage-*` tag → deploy to staging
- Push `prod-*` tag → deploy to production
