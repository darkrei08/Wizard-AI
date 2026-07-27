const fs = require('fs');
const path = require('path');

const skillsDir = '/home/ema/.gemini/config/skills/';

function determineMetadata(skillName, content) {
    let category = "Core System";
    let loops = "[01. loop-1-plan, 02. loop-2-develop, 03. loop-3-debug, 04. loop-4-refactor, 05. loop-5-release]";
    let workflows = "[workflow-agent-management, workflow-agentic-brain]";

    const nameLower = skillName.toLowerCase();
    const contentLower = content.toLowerCase();

    // Frontend
    if (nameLower.match(/react|vue|angular|svelte|frontend|ui|tailwind|css|html|design|nuxt|next|astro|gatsby/)) {
        category = "Frontend UI/UX";
        loops = "[02. loop-2-develop, 03. loop-3-debug]";
        workflows = "[workflow-frontend-design]";
    } 
    // Backend
    else if (nameLower.match(/node|express|laravel|django|python|backend|api|database|mongo|sql|firebase|kafka/)) {
        category = "Backend & Database";
        loops = "[02. loop-2-develop, 03. loop-3-debug, 04. loop-4-refactor]";
        workflows = "[workflow-dev-integrations]";
    }
    // DevOps & CI/CD
    else if (nameLower.match(/docker|aws|lambda|deploy|release|github|git|branch/)) {
        category = "DevOps & Release";
        loops = "[05. loop-5-release]";
        workflows = "[workflow-production-cycle]";
    }
    // Documentation & Planning
    else if (nameLower.match(/doc|wiki|pdf|word|plan|research|seo|blog/)) {
        category = "Knowledge & Planning";
        loops = "[01. loop-1-plan, 05. loop-5-release]";
        workflows = "[workflow-doc-processing, workflow-seo-research]";
    }
    // Tools & CLI
    else if (nameLower.match(/cli|lint|test|debug|sqz|lean-ctx/)) {
        category = "Tooling & Optimization";
        loops = "[03. loop-3-debug, 04. loop-4-refactor]";
        workflows = "[workflow-agentic-brain]";
    }

    // Agentic / Master
    if (nameLower.match(/loop|router|workflow|master|wizard/)) {
        category = "Master Orchestration";
        loops = "[ALL LOOPS]";
        workflows = "[ALL WORKFLOWS]";
    }

    return `
## 🔗 Skill Metadata & Semantic Routing

- **Category:** \`${category}\`
- **Called by Loops:** \`${loops}\`
- **Associated Workflows:** \`${workflows}\`
- **Semantic Frameworks Integration:** \`[serena, turboquant/turbovec, claude-mem, graphify]\`

> *This metadata ensures rapid semantic indexing and agentic traversal, allowing the LLM to instantly map relationships across the MoE architecture.*

---
`;
}

function processSkills() {
    const folders = fs.readdirSync(skillsDir);
    let count = 0;
    
    for (const folder of folders) {
        const skillPath = path.join(skillsDir, folder, 'SKILL.md');
        if (fs.existsSync(skillPath)) {
            let content = fs.readFileSync(skillPath, 'utf8');
            
            if (!content.includes('## 🔗 Skill Metadata')) {
                const metadataBlock = determineMetadata(folder, content);
                
                // Inject right after the YAML frontmatter
                const parts = content.split('---');
                if (parts.length >= 3) {
                    const frontmatter = parts.slice(0, 3).join('---');
                    const rest = parts.slice(3).join('---');
                    
                    const newContent = `${frontmatter}\n${metadataBlock}${rest}`;
                    fs.writeFileSync(skillPath, newContent, 'utf8');
                    count++;
                } else {
                    // No frontmatter, just append to top
                    const newContent = `${metadataBlock}\n${content}`;
                    fs.writeFileSync(skillPath, newContent, 'utf8');
                    count++;
                }
            }
        }
    }
    console.log(`Updated ${count} skills with metadata blocks.`);
}

processSkills();
