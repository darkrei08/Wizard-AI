---
name: design-md-spec
description: Design specification and CLI rules for the DESIGN.md format. Use to validate, format, export, and diff design system files.
---

# DESIGN.md Format Specification & CLI Skill

This skill teaches you how to read, write, lint, diff, and export `DESIGN.md` files according to the official specification.

## Overview
A `DESIGN.md` file serves as a single, portable, machine-and-human-readable source of truth for a design system. It consists of:
1. **YAML Frontmatter**: Machine-readable design tokens (delimited by `---`).
2. **Markdown Body**: Human-readable design logic and rationale structured under `##` headings.

A detailed copy of the specification is available locally in the resources subfolder:
- [spec.md](file://resources/spec.md)

---

## Token Schema (YAML Frontmatter)
The frontmatter must contain standard design tokens structured under these root keys:
- `name`: The name of the design system.
- `version`: (Optional) Current format version (typically `"alpha"`).
- `colors`: Map of CSS colors (e.g. Hex, named, rgb, oklch).
- `typography`: Map of text styles (containing `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, etc.).
- `rounded`: Map of border-radius scales (e.g. `sm`, `md`, `lg`, `xl`, `full`).
- `spacing`: Map of layout spacing/sizing dimensions or numbers.
- `components`: Map of component-level design values mapping properties to references or literal values.

### Reference Syntax
Cross-references use the `{path.to.token}` syntax (e.g. `backgroundColor: "{colors.primary}"`).

Example:
```yaml
---
name: Heritage
colors:
  primary: "#1A1C1E"
  secondary: "#6C7278"
  tertiary: "#B8422E"
  neutral: "#F7F5F2"
rounded:
  sm: 4px
  md: 8px
components:
  button-primary:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
---
```

---

## Canonical Sections (Markdown Body)
The body must use `##` (H2) headings. The sequences of sections must appear in this order if present:
1. `## Overview` (or `## Brand & Style`)
2. `## Colors`
3. `## Typography`
4. `## Layout` (or `## Layout & Spacing`)
5. `## Elevation & Depth` (or `## Elevation`)
6. `## Shapes`
7. `## Components`
8. `## Do's and Don'ts`

---

## CLI Reference
You can invoke the CLI wrapper `wz-ai-designmd` (or the direct `designmd`/`design.md` binaries) to lint, diff, and export design systems.

### 1. Linting DESIGN.md
Validates the structure, token references, and checks color contrast ratios:
```bash
wz-ai-designmd lint DESIGN.md
# or: npx @google/design.md lint DESIGN.md
```

### 2. Differing DESIGN.md
Compares two design system versions to find additions, modifications, or regressions:
```bash
wz-ai-designmd diff DESIGN.md DESIGN-v2.md
```

### 3. Exporting Tokens
Converts `DESIGN.md` tokens into other code configurations:
- **Tailwind v3 Config (JSON)**:
  ```bash
  wz-ai-designmd export --format json-tailwind DESIGN.md > tailwind.theme.json
  ```
- **Tailwind v4 Theme (CSS)**:
  ```bash
  wz-ai-designmd export --format css-tailwind DESIGN.md > theme.css
  ```
- **W3C DTCG Format (JSON)**:
  ```bash
  wz-ai-designmd export --format dtcg DESIGN.md > tokens.json
  ```

---

## Validation & Linting Rules
When linting, the CLI checks the following:
* **`broken-ref`** (Error): Checks for unresolvable token references.
* **`missing-primary`** (Warning): Verifies if a `primary` color token exists.
* **`contrast-ratio`** (Warning): Verifies if component `backgroundColor` and `textColor` contrast meets WCAG AA (4.5:1).
* **`orphaned-tokens`** (Warning): Warns if color tokens are defined but not used by any component.
* **`section-order`** (Warning): Checks if markdown sections are out of canonical order.
* **`unknown-key`** (Warning): Flags typos in root YAML keys.
