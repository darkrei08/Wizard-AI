import os
import re
import sys
import urllib.request
from urllib.error import URLError, HTTPError
import ssl


def main():
    repo_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    wiki_path = os.path.join(repo_dir, "docs", "WIKI.md")
    out_dir = os.path.join(repo_dir, "docs", "external-repos")

    if not os.path.exists(wiki_path):
        print(f"Error: Could not find WIKI.md at {wiki_path}")
        sys.exit(1)

    with open(wiki_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Regex to find GitHub repo links: https://github.com/owner/repo
    # It stops at quotes, spaces, or closing parenthesis/brackets
    pattern = r"https://github\.com/([a-zA-Z0-9_.-]+)/([a-zA-Z0-9_.-]+)"
    matches = re.findall(pattern, content)

    # Unique repos
    repos = list(set(matches))
    print(f"Found {len(repos)} unique GitHub repositories in WIKI.md.")

    os.makedirs(out_dir, exist_ok=True)

    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    success_count = 0

    for owner, repo in repos:
        # Some links might end with .git, let's clean it up
        repo_clean = repo.replace(".git", "")
        # Let's avoid internal Github links to issues/pulls if accidentally matched
        if repo_clean in ["issues", "pull", "releases"]:
            continue

        repo_out_dir = os.path.join(out_dir, repo_clean)
        os.makedirs(repo_out_dir, exist_ok=True)
        readme_out_path = os.path.join(repo_out_dir, "README.md")

        if os.path.exists(readme_out_path):
            print(f"[{repo_clean}] README already exists, skipping.")
            success_count += 1
            continue

        branches = ["main", "master"]
        downloaded = False

        print(f"[{repo_clean}] Fetching README from {owner}/{repo_clean}...")
        for branch in branches:
            raw_url = f"https://raw.githubusercontent.com/{owner}/{repo_clean}/{branch}/README.md"
            try:
                req = urllib.request.Request(
                    raw_url, headers={"User-Agent": "Mozilla/5.0"}
                )
                with urllib.request.urlopen(req, context=ctx) as response:
                    readme_content = response.read().decode("utf-8")
                    with open(readme_out_path, "w", encoding="utf-8") as rf:
                        rf.write(f"# {repo_clean} (by {owner})\n\n")
                        rf.write(f"Source: https://github.com/{owner}/{repo_clean}\n\n")
                        rf.write(readme_content)
                    downloaded = True
                    success_count += 1
                    break
            except HTTPError as e:
                # 404 is expected if branch is wrong
                if e.code != 404:
                    print(f"  -> HTTP Error {e.code} on branch {branch}")
            except URLError as e:
                print(f"  -> URL Error: {e.reason}")
            except Exception as e:
                print(f"  -> Error: {e}")

        if not downloaded:
            print(f"[{repo_clean}] Failed to find README.md in {branches}.")

    print(
        f"\nDone! Downloaded/Verified READMEs for {success_count}/{len(repos)} repositories."
    )


if __name__ == "__main__":
    main()
