---
name: loopy
description: A library of practical AI-agent loops and an installable skill for finding, adapting, and designing repeatable agent workflows. Replaces mp-loop-me.
disable-model-invocation: true
argument-hint: "Discover, Find, Doctor, Adapt, Craft, Run, Debrief, Save, Publish loops"
---

# Loopy - Loop Library and Workflow Manager

Loopy gives the agent direct access to the ideas in the [Loop Library](https://signals.forwardfuture.com/loop-library/). You can use it to find, adapt, design, and run repeatable agent workflows.

## Use Loopy

Invoke Loopy when you need to automate a recurring task, create a workflow, or troubleshoot an existing one. It can take nine paths:

| Path | What it does | Example request |
| --- | --- | --- |
| **Discover** | Inspects an authorized codebase, coding-thread history, or both for repeated work, then turns the strongest qualified candidate into a bounded loop. | `Analyze this repository and my coding threads for work we have done more than once. Turn the best candidate into a loop.` |
| **Find** | Searches the live catalog and recommends up to three published loops. It does not run them. | `Find a published loop for keeping our documentation current.` |
| **Loop Doctor** | Audits a loop you paste or name, explains material weaknesses, and repairs only those problems. | `Audit this loop and repair only material problems: [paste loop]` |
| **Adapt** | Tailors a useful loop to your real tools, limits, schedule, and definition of success. | `Adapt the Overnight Docs Sweep to this repository and our existing checks.` |
| **Craft** | Interviews you one question at a time about the outcome, definition of success, scope, checks, and stopping point, then creates a bounded loop when the catalog has no good fit. (Replaces mp-loop-me) | `Interview me and help me craft a loop for turning customer feedback into verified fixes.` |
| **Run** | Executes an identified loop in bounded passes, applies its acceptance check, and returns an evidence-backed receipt. | `Run the Overnight Docs Sweep in this repository.` |
| **Debrief** | Analyzes one or more completed run receipts and recommends the smallest justified improvement. | `Debrief this run receipt and tell me whether the loop needs to change.` |
| **Save** | Saves a loop you want to keep into the project's `LOOPS.md`, then reuses saved project loops when they fit a later request. | `Save this loop to the project so we can reuse it.` |
| **Publish** | Checks quality and catalog overlap, prepares an exact publication preview, and submits only after explicit approval. | `Prepare this loop for publication in Loop Library.` |

## The loop lens

A **loop** is a recurring pattern in the user's life or codebase. A loop gives the agent a way to learn from the result and take the next useful step.
A good loop answers four simple questions:
- What is the agent trying to accomplish?
- How will it know whether the latest attempt worked?
- What should it do with what it learned?
- When should it finish or ask for help?

## The workspace

- `LOOPS.md` — Saves your local adapted or crafted loops.
- `workflows/*.md` — one spec per workflow if explicitly used by the project.
