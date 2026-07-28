# design-skill-pipeline (by tpj-collective)

Source: https://github.com/tpj-collective/design-skill-pipeline

# Design Skill Pipeline

Four Claude Code skills that chain together into one frontend design + verification workflow. Each lives here as a git submodule pointing at my own fork, so they stay independently updatable while living in one organized place.

## The four skills

| Order | Skill | Role | Source |
|---|---|---|---|
| 01 | [SkillUI](01-skillui) | **Extract** — reverse-engineers an existing website/repo's design system (colors, type, spacing, components) into a `.skill` file | fork of [amaancoderx/npxskillui](https://github.com/amaancoderx/npxskillui) |
| 02 | [UI/UX Pro Max](02-ui-ux-pro-max) | **Generate** — if you're not cloning a reference design, this reasoning-engine skill generates a tailored design system (palette, fonts, layout rules) from a plain-language project description | fork of [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) |
| 03 | [Impeccable](03-impeccable) | **Critique/Polish** — audits whatever Claude just built against 45 anti-pattern rules (generic fonts, purple gradients, cookie-cutter layouts) and pushes it toward a more distinctive result | fork of [pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| 04 | [Playwright CLI](04-playwright-cli) | **Verify** — drives a real browser (click, type, screenshot, network mocking) via token-efficient CLI commands so Claude Code can actually test the interface it just built/polished, not just assume it renders correctly | fork of [microsoft/playwright-cli](https://github.com/microsoft/playwright-cli) |

## How they compose

1. **Start with 01 (SkillUI) OR 02 (UI/UX Pro Max)** — not both. Use SkillUI when you have a reference site/repo whose look you want to match. Use UI/UX Pro Max when you're starting from a blank page and want the reasoning engine to propose a system.
2. Build the interface with Claude Code, using whichever design system step 1 produced.
3. **Run 03 (Impeccable)** — audit/critique/polish the output to catch generic "AI-slop" patterns before shipping.
4. **Finish with 04 (Playwright CLI)** — open the built UI in a real browser, click through it, screenshot it, catch runtime/console errors — confirms the polished design actually works, not just looks right in the diff.

## Setup

```bash
git clone --recurse-submodules https://github.com/tpj-collective/design-skill-pipeline.git
```

If already cloned without `--recurse-submodules`:

```bash
git submodule update --init --recursive
```

Each subfolder still has its own install instructions (npm/npx) — see its README.
