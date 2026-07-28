# stitch-design-generator (by AbsoluteAnchor)

Source: https://github.com/AbsoluteAnchor/stitch-design-generator

[Stitch Design Generator](https://apify.com/juzken/stitch-design-generator?fpr=data)

# Google Stitch AI — Design Generator

Generate production-ready UI designs from a text prompt using **Google Stitch AI**. Describe your interface in plain English and get back a complete design project — ready to view, edit, and export directly in Stitch.

---

## What it does

1. Takes your text prompt and optional brand settings as input
2. Creates a new project in Google Stitch
3. Generates a full UI design (takes ~1–2 minutes)
4. Returns a direct link to your Stitch project

Open the link to instantly view your design in the Stitch editor, where you can refine it, export to HTML/CSS, or hand it off to your team.

---

## Output

```
{
  "projectId": "1244005432617396166",
  "stitchProjectUrl": "https://stitch.withgoogle.com/projects/1244005432617396166",
  "prompt": "A SaaS dashboard with sidebar navigation and KPI cards",
  "platform": "web"
}
```

The `stitchProjectUrl` opens your design in the Stitch editor.

---

## Input

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `stitchAccessToken` | string | Yes | Your API key from the Stitch AI settings |
| `prompt` | string | Yes | Describe the UI you want — be specific about layout, content, and purpose |
| `platform` | `web` | `mobile` | `unspecified` | No | Target device. Defaults to `web` |
| `brandName` | string | No | Your product or company name |
| `brandStyle` | string | No | Visual style, e.g. `clean modern minimal` or `bold colorful playful` |
| `brandColors` | string | No | Comma-separated hex colors, e.g. `#0052CC,#00B8D9` |
| `modelId` | `GEMINI_3_1_PRO` | `GEMINI_3_FLASH` | No | Model to use. `GEMINI_3_1_PRO` gives higher quality, `GEMINI_3_FLASH` is faster. Defaults to `GEMINI_3_1_PRO` |

### Getting your Stitch API Key

1. Go to [stitch.withgoogle.com](https://stitch.withgoogle.com)
2. Open Settings → API Keys
3. Create a new key and paste it into the **Stitch API Key** field

---

## Prompt tips

The more specific your prompt, the better the result:

**Basic:**

> A dashboard for a SaaS app

**Better:**

> A SaaS analytics dashboard with a left sidebar showing navigation links, four KPI cards at the top (revenue, active users, churn rate, MRR), a line chart showing monthly revenue trends, and a recent activity feed on the right

**With brand context:**

> Use Brand Name: `Acme`, Brand Style: `clean professional minimal`, Brand Colors: `#1E3A5F,#4A90D9`

---

## How long does it take?

Generation typically takes **1–2 minutes**. The Actor waits for Stitch to finish, then returns the project URL. You'll see a progress log in the Apify console while it runs.

---

## Built with

- [Google Stitch AI](https://stitch.withgoogle.com) — AI-powered UI design generation
- [Apify SDK](https://docs.apify.com/sdk/js/) — Actor runtime