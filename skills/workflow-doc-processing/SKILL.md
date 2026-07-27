---
name: workflow-doc-processing
description: "Meta-skill orchestrating data ingestion and document parsing. Chains pdf, docx, pptx, xlsx, doc-coauthoring with markitdown for RAG pipelines or knowledge extraction."
---

# Document Processing Workflow (Meta-Skill)

This meta-skill orchestrates the reading, parsing, and co-authoring of complex enterprise documents. Use this workflow whenever the user provides `.pdf`, `.docx`, `.pptx`, `.xlsx`, or asks to extract knowledge from files.

## Core Workflow Chain

1. **File Type Detection & Specialized Parsing (`pdf`, `docx`, `pptx`, `xlsx`)**
   Use Anthropic's specialized skills for the respective document types to understand the document's native structure (e.g., slides, sheets, pages).

2. **Universal Markdown Conversion (`markitdown`)**
   For generic RAG pipelines or if a file is not natively supported, use `markitdown` (from Wizard-AI) to convert the file into a clean Markdown representation that minimizes token usage.

3. **Knowledge Extraction & Book Analysis (`book-to-skill`)**
   If the document is a book, manual, or long-form PDF, pipe the converted markdown into `book-to-skill` to extract frameworks, mental models, and structured data.

4. **Iterative Writing (`doc-coauthoring`)**
   If the user asks to modify or write a new document based on the extracted data, use the `doc-coauthoring` skill to write professional, structured prose iteratively.

5. **Publishing (`blume`)**
   If the produced markdown/MDX must ship as a browsable documentation site (nav, local search, i18n, OpenAPI reference, `llms.txt` + MCP server for agents), hand it to `blume` — `blume init` once, then `blume dev` / `blume build`. `blume` is the publish stage only: it never writes content (that is `doc-coauthoring`) and never parses binaries (that is steps 1-2).

## Execution Rules

- Never attempt to read binary documents directly. Always use the appropriate parser skill from this workflow.
- Prioritize high-fidelity parsing (specialized skills) for complex layouts, and `markitdown` for fast, text-heavy extraction.
- Run `blume validate` before publishing — `blume build` alone does not check links.
