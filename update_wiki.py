import re
import sys

def update_file(filename, is_it=False):
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        return

    # Add the new skills
    if is_it:
        skills_str = """
- **react-best-practices**: Ottimizzazione delle prestazioni per React e Next.js (Vercel Engineering)
- **anthropic-frontend-design**: Linee guida per il design frontend di Anthropic
- **dammyjay93-interface-design**: Concetti di interface design
- **awesome-changelog-generator**: Generazione automatizzata di changelog
- **addy-frontend-ui**: Creazione di interfacce utente accessibili, responsive e di alta qualità
- **addy-api-interface**: Linee guida per la progettazione di API e interfacce stabili
- **loopkit-spec-first**: Scrittura delle specifiche dell'obiettivo su disco prima dell'azione
- **loopkit-adversarial-verify**: Revisione avversaria delle modifiche al codice rispetto alle specifiche
"""
        marker = "### 1. System Core & Routing"
        if "react-best-practices" not in content and marker in content:
            content = content.replace(marker, "### Native LLM Prompt Skills & Packs\n" + skills_str.strip() + "\n\n" + marker)
    else:
        skills_str = """
- **[react-best-practices](skills/react-best-practices)**: React and Next.js performance optimization guidelines from Vercel Engineering
- **[anthropic-frontend-design](skills/anthropic-frontend-design)**: Anthropic frontend design guidelines
- **[dammyjay93-interface-design](skills/dammyjay93-interface-design)**: Interface design concepts
- **[awesome-changelog-generator](skills/awesome-changelog-generator)**: Automated changelog generation
- **[addy-frontend-ui](skills/addy-frontend-ui)**: Builds production-quality, accessible, responsive user-facing UIs
- **[addy-api-interface](skills/addy-api-interface)**: Guides stable API and interface design
- **[loopkit-spec-first](skills/loopkit-spec-first)**: Write the goal spec on disk before the agent acts
- **[loopkit-adversarial-verify](skills/loopkit-adversarial-verify)**: Review a diff against the goal spec assuming the code is broken
"""
        
        # We want to append to the list before Memory
        if "react-best-practices" not in content:
            content = re.sub(r'(### 🧠 Memory, Context & Knowledge Graph)', skills_str.lstrip() + r'\n\1', content)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_file('docs/WIKI.md', is_it=False)
update_file('docs/WIKI.it.md', is_it=True)
