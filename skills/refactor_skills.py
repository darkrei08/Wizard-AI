import os
import shutil
from pathlib import Path

base_dir = Path(__file__).parent.resolve()

categories = {
    "00-core-engine": [
        "0-loop-engine", "0-master-brain", "1-auto-router", "2-wizard-hub", 
        "3-shadow-clone-parallelism", "4-swarm-manager", "5-goodcode-orchestrator",
        "loop-1-plan", "loop-2-develop", "loop-3-debug", "loop-4-refactor", "loop-5-release",
        "session-manager", "auto-trigger-release", "show-active-skill", "using-superpowers",
        "wizard-ai-core", "wizard-ai-installer"
    ],
    "memory-and-context": [
        "codebase-memory-mcp", "engram", "sqz", "lean-ctx", "caveman", "llmlingua", 
        "markitdown", "turbovec", "zvec", "flashrank", "headroom", "wiki-brain-skill",
        "rtk", "mem0", "personal-graph"
    ],
    "workflows-and-orchestration": [
        "workflow-agent-management", "workflow-dev-integrations", "workflow-doc-processing",
        "workflow-frontend-design", "workflow-production-cycle", "workflow-seo-research",
        "pi-extensible-workflows", "dispatching-parallel-agents", "executing-plans",
        "finishing-a-development-branch", "writing-plans", "test-driven-development",
        "mp-tdd", "systematic-debugging", "verification-before-completion", "receiving-code-review",
        "requesting-code-review", "resolving-merge-conflicts", "mp-code-review", "mp-diagnosing-bugs",
        "mp-domain-modeling", "mp-implement", "mp-research", "mp-triage", "mp-prototype", "mp-scaffold-exercises",
        "mp-to-spec", "mp-to-tickets", "mp-wayfinder", "mp-grill-me", "mp-grilling", "mp-grill-with-docs", "mp-teach", "mp-handoff", "mp-loop-me"
    ],
    "frontend-and-ui": [
        "frontend-design", "kinetics-ui", "mengto-skills", "awesome-design", "theme-factory",
        "aionui", "phantom-ui", "taste-skill", "canvas-design", "infographic", "micio86-portfolio",
        "portfolio", "web-artifacts-builder", "vuetify", "brand-guidelines"
    ],
    "stitch-design": [
        "stitch-code-to-design", "stitch-design-md", "stitch-enhance-prompt", 
        "stitch-extract-design-md", "stitch-extract-static-html", "stitch-generate-design",
        "stitch-loop", "stitch-manage-design-system", "stitch-react-components",
        "stitch-react-native", "stitch-remotion", "stitch-shadcn-ui", "stitch-taste-design",
        "stitch-upload-to-stitch", "design-md-spec"
    ],
    "frameworks-and-stacks": [
        "framework-qwik", "framework-nuxt4", "framework-astro5", "astro", "react", "vue",
        "nodejs", "python", "laravel", "flutter", "android-studio", "angular", "bun",
        "deno", "gatsby", "ionic", "quickjs", "react-native", "svelte", "wordpress",
        "express-typescript-starter"
    ],
    "devops-and-tools": [
        "auto-branch", "auto-release", "os-detect", "webapp-testing", "auto-npm-publish",
        "auto-debug", "cybersecurity", "strix", "setup-pre-commit", "mp-setup-pre-commit",
        "git-guardrails-claude-code", "mp-git-guardrails", "pagespeed", "auto-graphify", "graphify",
        "serena", "cli-anything", "cli-printing-press", "mermaid-cli", "scaffold", "trailbase"
    ],
    "backend-and-infra": [
        "mongodb", "mysql", "kafka", "firebase", "pocketbase", "lambda", "airflow",
        "n8n", "zapier", "go-whatsapp", "openwa", "wuzapi"
    ],
    "meta-skills": [
        "skill-creator", "mcp-builder", "book-to-skill", "awesome-skills", "antigravity-awesome-skills",
        "ecc", "gentle-ai", "claude-api", "litellm", "gemini-usage", "geminiusage",
        "pi-dev", "cockpit-bridge", "cockpit-tools", "kit", "syke", "qwenpaw", "openhuman", "omnivoice-studio", "supertonic", "voicebox",
        "mp-ask-matt", "mp-writing-great-skills", "mp-setup-matt-pocock-skills"
    ],
    "docs-and-coauthoring": [
        "doc-coauthoring", "docx", "pdf", "pptx", "xlsx", "claude-blog", "claude-seo", "internal-comms",
        "algorithmic-art", "easy-vibe", "last30days", "slack-gif-creator", "hyperframes", "aisuite"
    ],
    "architecture-and-design": [
        "system-design-101", "brain-tech-stack", "devboards-architecture", "engineering-excellence",
        "enterprise-development-protocol", "mp-codebase-design", "mp-improve-codebase-architecture",
        "spec-kit", "ponytail", "brainstorming", "impeccable"
    ]
}

skill_to_cat = {}
for cat, skills in categories.items():
    for s in skills:
        skill_to_cat[s] = cat

deprecated = ["claude-mem"]

skill_mds = list(base_dir.rglob("SKILL.md"))
skill_dirs = {}

for md in skill_mds:
    d = md.parent
    name = d.name
    if name in deprecated:
        print(f"Deleting deprecated skill: {d}")
        shutil.rmtree(d, ignore_errors=True)
        continue
    
    size = md.stat().st_size
    if name not in skill_dirs or size > skill_dirs[name]['size']:
        skill_dirs[name] = {'path': d, 'size': size}

for cat in categories.keys():
    (base_dir / cat).mkdir(exist_ok=True, parents=True)
(base_dir / "misc").mkdir(exist_ok=True, parents=True)

moved_count = 0
for name, info in skill_dirs.items():
    src = info['path']
    cat = skill_to_cat.get(name, "misc")
    dest = base_dir / cat / name
    
    if src.absolute() == dest.absolute():
        continue
        
    print(f"Moving {name} to {cat}/")
    if dest.exists():
        shutil.rmtree(dest, ignore_errors=True)
    
    shutil.move(str(src), str(dest))
    moved_count += 1

print(f"Refactoring complete. Moved {moved_count} skills.")

# Clean up any leftover directories from duplicates or empties
for root, dirs, files in os.walk(base_dir, topdown=False):
    for d in dirs:
        dir_path = Path(root) / d
        try:
            if not any(dir_path.iterdir()):
                print(f"Removing empty directory: {dir_path}")
                dir_path.rmdir()
        except Exception as e:
            pass
