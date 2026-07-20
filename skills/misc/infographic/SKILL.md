---
name: infographic
description: AI-powered declarative infographic and chart generation
---

# Infographic Creator

The Infographic framework (`antvis/Infographic`) is a declarative visualization engine that generates scalable, themed infographics.

## Repository & Sub-Skills
The system is installed at `~/.ai-skills/Infographic`. It contains 5 sub-skills in its `skills/` directory that you can use to compose full infographics:

1. `infographic-creator`: Orchestrates full infographic generation.
2. `infographic-item-creator`: Creates individual data items/components (charts, icons, text blocks).
3. `infographic-structure-creator`: Defines the layout and structure grid.
4. `infographic-syntax-creator`: Generates the underlying JSON syntax configuration.
5. `infographic-template-updater`: Modifies and manages existing templates (~200 built-in).

## How to Use
When a user asks to generate a visual infographic, chart, or data representation:
1. Review the data available.
2. Formulate an infographic layout (`infographic-structure-creator`).
3. Define the items (`infographic-item-creator`).
4. Generate the final declarative syntax, which the framework renders to SVG/Canvas.

## Output Format
The Infographic engine uses a JSON-based schema to define visual mappings.

## Related Tools
- `canvas-design`
- `awesome-design`
- `theme-factory`
