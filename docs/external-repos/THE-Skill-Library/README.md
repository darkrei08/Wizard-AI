# THE-Skill-Library (by god6661401-a11y)

Source: https://github.com/god6661401-a11y/THE-Skill-Library

# 🚀 Skill Library

<p align="center">
  <img src="https://img.shields.io/badge/skills-1000+-4F46E5?style=for-the-badge" alt="1000+ Skills"/>
  <img src="https://img.shields.io/badge/automation-400+-4F46E5?style=for-the-badge" alt="400+ Automation"/>
  <img src="https://img.shields.io/badge/license-MIT-4F46E5?style=for-the-badge" alt="MIT License"/>
</p>

<p align="center">
  <b>A comprehensive collection of pre-built skills for Claude, ChatGPT, and AI coding assistants</b><br/>
  Boost productivity, automate workflows, and extend AI capabilities across 1000+ integrations.
</p>

---

## 📋 Overview

This repository contains a curated collection of **1000+ skills** that enhance AI assistants with specialized capabilities. Skills provide domain-specific knowledge, workflow automation, and tool integrations.

### 🎯 What's Included

| Category | Count | Description |
|----------|-------|-------------|
| **Automation** | 400+ | CRM, marketing, sales, productivity tools via Composio |
| **Development** | 50+ | Coding workflows, TDD, debugging, MCP servers |
| **Design & UI/UX** | 30+ | Frontend design, animations, brand guidelines |
| **Productivity** | 40+ | Time tracking, invoicing, organization |
| **Document Processing** | 15+ | PDF, DOCX, XLSX, PPTX handling |
| **Communication** | 60+ | Email, Slack, Discord, messaging |
| **Data & Analytics** | 80+ | SEO tools, data analysis, web scraping |
| **Media** | 25+ | Image, video, audio processing |
| **Utilities** | 100+ | General-purpose tools and helpers |

---

## 🗂️ Repository Structure

```
skill-library/
├── README.md                    # This file
├── LICENSE                      # MIT License
├── skills/
│   ├── composio-skills/        # 400+ automation skills (CRM, marketing, etc.)
│   ├── development/             # Dev workflows (TDD, debugging, MCP)
│   ├── design/                 # UI/UX, frontend, animations
│   ├── productivity/            # Time tracking, invoicing
│   ├── document-processing/     # PDF, DOCX, XLSX tools
│   ├── communication/          # Email, chat, messaging
│   ├── data-analysis/          # Analytics, SEO, scraping
│   ├── media/                  # Image, video, audio
│   ├── utilities/              # General-purpose tools
│   └── superpowers/            # Advanced workflow automation
└── docs/
    ├── CONTRIBUTING.md          # Contribution guidelines
    ├── SKILL_CREATION.md        # How to create skills
    ├── USAGE.md                 # Usage instructions
    └── SKILL_INDEX.md          # Complete A-Z index
```

---

## 🚀 Featured Skill Categories

### 🤖 Automation (400+ Skills)

Connect to **1000+ services** via Composio integration:

<details>
<summary><b>📊 CRM & Sales (50+ skills)</b></summary>

- **Attio** - CRM operations, contact management
- **Apollo** - Lead generation, contact enrichment
- **Ashby** - Recruiting workflow automation
- **Capsule CRM** - Contact & pipeline management
- **Kommo** - CRM automation, lead tracking
- **Lever** - ATS recruiting workflows
- **Pipedrive** - Sales pipeline automation
- **Salesforce** - CRM, marketing, service cloud
- **Zoho** - Books, CRM, Inventory, Desk

[View all CRM skills →](skills/composio-skills/*crm*)
</details>

<details>
<summary><b>📧 Marketing & Email (80+ skills)</b></summary>

- **ActiveCampaign** - Email marketing automation
- **Campaign Monitor** - Email campaigns
- **Customer.io** - Customer engagement
- **HubSpot** - Inbound marketing
- **Klaviyo** - E-commerce marketing
- **Lemlist** - Cold email outreach
- **Mailchimp** - Email marketing
- **Omnisend** - E-commerce automation

[View all marketing skills →](skills/composio-skills/*mail* | *marketing*)
</details>

<details>
<summary><b>📊 Productivity & Project Management (60+ skills)</b></summary>

- **Asana** - Project management
- **ClickUp** - Task management
- **Jira** - Issue tracking
- **Monday.com** - Work management
- **Notion** - Workspace collaboration
- **Trello** - Kanban boards

[View all productivity skills →](skills/composio-skills/*asana* | *monday* | *notion*)
</details>

<details>
<summary><b>📢 Communication (70+ skills)</b></summary>

- **Discord** - Bot automation
- **Slack** - Workspace automation
- **Microsoft Teams** - Team collaboration
- **Telegram** - Messaging bot
- **Twilio** - SMS automation

[View all communication skills →](skills/composio-skills/*slack* | *discord* | *teams*)
</details>

### 💻 Development Skills

| Skill | Description |
|-------|-------------|
| `test-driven-development` | Enforce TDD workflow before any implementation |
| `systematic-debugging` | Structured debugging approach for any bug |
| `mcp-builder` | Create MCP servers for tool integrations |
| `skill-creator` | Guide for creating new skills |
| `receiving-code-review` | Handle code review feedback properly |
| `executing-plans` | Structured plan execution |
| `writing-plans` | Multi-step task planning |
| `dispatching-parallel-agents` | Run independent tasks in parallel |
| `using-git-worktrees` | Isolate feature work with git worktrees |

[View all development skills →](skills/development/)

### 🎨 Design & UI/UX

| Skill | Description |
|-------|-------------|
| `frontend-design` | Production-grade frontend interfaces |
| `frontend-design-enhanced` | Enhanced UI with aesthetic anchors |
| `impeccable-frontend-design` | High-quality, distinctive interfaces |
| `ui-ux-pro-max` | Comprehensive UI/UX (50+ styles, 161 palettes) |
| `effective-ui-design` | Professional UI guidelines (WCAG 2.1 AA) |
| `shadcn-ui` | shadcn/ui component integration |
| `gsap-*` | GSAP animation suite (8 specialized skills) |
| `brand-guidelines` | Anthropic brand colors & typography |
| `distinctive-frontend` | Avoid generic AI aesthetics |

[View all design skills →](skills/design/)

### 📄 Document Processing

| Skill | Description |
|-------|-------------|
| `pdf` | Comprehensive PDF manipulation toolkit |
| `docx` | Word document creation & editing |
| `pptx` | PowerPoint presentation tools |
| `xlsx` | Excel spreadsheet processing |

[View all document skills →](skills/document-processing/)

---

## 🚀 Quick Start

### Using Skills with Claude

1. **Browse skills** in the `skills/` directory
2. **Copy the skill** you want to use
3. **Paste into your project** at `.agents/skills/`
4. **Invoke the skill** in your conversation

```bash
# Example: Using the brainstorming skill
/skill brainstorming
```

### Installing All Skills

```bash
# Clone this repository
git clone https://github.com/yourusername/skill-library.git
cd skill-library

# Copy skills to your agents directory
cp -r skills/* ~/.agents/skills/
```

### Using with Composio

Many automation skills require [Composio](https://composio.dev) for integration:

```bash
# Install Composio plugin
/plugin install composio-toolrouter

# Run setup
/composio-toolrouter:setup
```

---

## 📊 Featured Automation Skills

### 🎯 Lead Generation & Sales

| Skill | Platform | Description |
|-------|----------|-------------|
| `apollo-automation` | Apollo.io | Lead generation, contact enrichment |
| `lemlist-automation` | Lemlist | Multi-channel outreach campaigns |
| `instantly-automation` | Instantly | Cold email automation |
| `hunter-automation` | Hunter.io | Email verification & intelligence |
| `reply-io-automation` | Reply.io | Sales engagement platform |

### 📈 SEO & Marketing

| Skill | Platform | Description |
|-------|----------|-------------|
| `ahrefs-automation` | Ahrefs | SEO research, backlink analysis |
| `semrush-automation` | SEMrush | Keyword research, rank tracking |
| `google-search-console-automation` | Google | Search performance monitoring |
| `similarweb-automation` | SimilarWeb | Digital market intelligence |

### 📊 Finance & Accounting

| Skill | Platform | Description |
|-------|----------|-------------|
| `quickbooks-automation` | QuickBooks | Online accounting automation |
| `xero-automation` | Xero | Cloud-based bookkeeping |
| `stripe-automation` | Stripe | Payment processing |
| `freshbooks-automation` | FreshBooks | Invoicing & time tracking |

[View all 400+ automation skills →](skills/composio-skills/)

---

## 📄 Documentation

| Document | Description |
|----------|-------------|
| [Usage Guide](docs/USAGE.md) | How to use skills effectively |
| [Skill Creation](docs/SKILL_CREATION.md) | Create your own skills |
| [Contributing](docs/CONTRIBUTING.md) | Contribution guidelines |
| [Skill Index](docs/SKILL_INDEX.md) | Complete A-Z index |

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

### How to Add a Skill

1. Fork the repository
2. Create your skill in the appropriate category
3. Follow the [Skill Creation Guide](docs/SKILL_CREATION.md)
4. Submit a pull request

```bash
# Create a new skill
cp template-skill/SKILL.md skills/category/your-skill-name/SKILL.md
# Edit the skill content
# Submit PR
```

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Composio](https://composio.dev) for automation integrations
- [Anthropic](https://anthropic.com) for Claude skills framework
- All contributors who have helped build this library

---

## 📧 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/god6661401-a11y/THE-Skill-Library/issues)
- **Discussions**: [GitHub Discussions](https://github.com/god6661401-a11y/THE-Skill-Library/discussions)

---

<p align="center">
  <b>⭐ Star this repo if you find it useful!</b>
</p>

<p align="center">
  <i>Building the future of AI-assisted development, one skill at a time.</i>
</p>
