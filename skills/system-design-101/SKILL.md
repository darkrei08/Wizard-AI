---
name: system-design-101
description: "Reference skill for system design architecture based on ByteByteGoHq/system-design-101. Use in Loop 1 (Plan & Spec) for clarifying architectural patterns, API design, caching, and database decisions."
---

# /system-design-101

System-Design-101 provides architectural knowledge and visual models for building complex systems.

## When to use:
- In `01. loop-1-plan` when defining the architecture of a new system.
- When the user asks "how should we design this scaleable system?"
- During `brainstorming` and `mp-domain-modeling`.

## Core Principles:
- **Communication:** Choose the right protocol (REST, GraphQL, gRPC, WebSockets) based on latency and payload constraints.
- **Databases:** Use the right DB for the job (SQL vs NoSQL, Timeseries, Graph). Understand replication, partitioning, and consistency models.
- **Caching:** Implement proper cache invalidation strategies (LRU, LFU) and caching layers (Redis, Memcached) to reduce DB load.
- **Microservices vs Monolith:** Default to modular monoliths unless scale explicitly demands microservices (e.g. separate independent scaling vectors).
- **Security:** Always incorporate rate limiting, authentication gateways, and zero-trust concepts into the plan.

## Integration:
Whenever the `master-project-bootstrap` or `loop-1-plan` is invoked, query this skill's principles to validate the proposed architecture against industry standards.
