---
name: openwa
description: "rmyndharis/OpenWA Node.js Baileys WhatsApp API wrapper."
---

# openwa Skill

This is an AI skill wrapper for **OpenWA** ([rmyndharis/OpenWA](https://github.com/rmyndharis/OpenWA)), the Node.js / Baileys multi-device WhatsApp engine.

## Overview
OpenWA provides a clean HTTP REST API (`/api/sessions/:id/...`) and WebSocket interface over WhatsApp using the modern Baileys library (`@whiskeysockets/baileys`). It operates cleanly inside Docker (`ghcr.io/rmyndharis/openwa:latest` or `docker.io/rmyndharis/openwa:latest`).

## Key Capabilities & Usage in WaForge
In **WaForge v2.15.0+**, OpenWA acts as a primary or fallback engine alongside `WuzAPI` and `GoWA` inside the **Multi-Engine Hybrid Load Balancer (`lib/whatsapp-engine.ts`)**.

### REST API Endpoints
- **Get Session / QR**: `GET /api/sessions/:id/status` / `GET /api/sessions/:id/qr`
- **Start Session**: `POST /api/sessions/:id/start`
- **Send Text Message**: `POST /api/sessions/:id/send-message`
  ```json
  {
    "phone": "393331234567",
    "message": "Hello from OpenWA!"
  }
  ```
- **Send Media**: `POST /api/sessions/:id/send-file`
  ```json
  {
    "phone": "393331234567",
    "fileUrl": "https://example.com/document.pdf",
    "caption": "Document attached"
  }
  ```
- **Check Phone Existence**: `POST /api/sessions/:id/check-phone`
- **Disconnect / Logout**: `POST /api/sessions/:id/logout`

## Hybrid Architecture Integration
When configured inside high-throughput WhatsApp outreach applications (such as WaForge):
1. **Load Balancing**: Distribute outbound Spintax / anti-ban messages evenly across multiple active numbers running across WuzAPI, GoWA, and OpenWA.
2. **Failover & Recovery**: If a WebSocket drops on one engine, OpenWA or one of its companion engines automatically accepts the retry payload without throwing 500 errors to the client queue.
