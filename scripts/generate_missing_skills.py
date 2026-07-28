import os
import sys


def main():
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    external_repos_dir = os.path.join(repo_dir, "docs", "external-repos")
    skills_dir = os.path.join(repo_dir, "skills")

    if not os.path.exists(external_repos_dir):
        print("docs/external-repos directory not found.")
        sys.exit(1)

    os.makedirs(skills_dir, exist_ok=True)

    # Get existing skills (lowercase for case-insensitive match)
    existing_skills = [
        d.lower()
        for d in os.listdir(skills_dir)
        if os.path.isdir(os.path.join(skills_dir, d))
    ]

    # Manual mappings for known repos that have different skill names
    # e.g., 'cpython': 'python', 'mongo': 'mongodb'
    known_mappings = {
        "cpython": "python",
        "mongo": "mongodb",
        "mysql-server": "mysql",
        "core": "vue",
        "next.js": "nextjs",
        "ionic-framework": "ionic",
    }

    count = 0
    for repo in os.listdir(external_repos_dir):
        repo_path = os.path.join(external_repos_dir, repo)
        if not os.path.isdir(repo_path):
            continue

        skill_name = known_mappings.get(repo.lower(), repo.lower())

        # Check if skill exists
        if skill_name in existing_skills:
            print(f"[{repo}] Skill '{skill_name}' already exists. Skipping.")
            continue

        # Check if there is a README
        readme_path = os.path.join(repo_path, "README.md")
        if not os.path.exists(readme_path):
            print(f"[{repo}] No README found. Skipping.")
            continue

        print(f"[{repo}] Generating missing skill '{skill_name}'...")

        new_skill_dir = os.path.join(skills_dir, skill_name)
        os.makedirs(new_skill_dir, exist_ok=True)
        new_skill_md_path = os.path.join(new_skill_dir, "SKILL.md")

        with open(readme_path, "r", encoding="utf-8") as f:
            readme_content = f.read()

        # Generate HOOK / trigger logic
        skill_content = f"""---
name: {skill_name}
description: "Reference documentation and knowledge base for {repo}. Automatically generated from external repository README."
---

# {repo} Knowledge Base

> **TRIGGER HOOK**: Read this file BEFORE answering or planning if the user prompt mentions `{repo}`, `{skill_name}`, or if you are tasked to work with this technology. This acts as your native integration knowledge base.

## Repository Information
The following is the official documentation for {repo}, downloaded from its GitHub repository to serve as your primary source of truth.

---

{readme_content}
"""
        with open(new_skill_md_path, "w", encoding="utf-8") as f:
            f.write(skill_content)

        count += 1
        existing_skills.append(skill_name)

    print(f"\nDone. Created {count} new AI skills with trigger hooks.")


if __name__ == "__main__":
    main()
