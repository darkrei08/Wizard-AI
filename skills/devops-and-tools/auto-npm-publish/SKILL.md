---
name: auto-npm-publish
description: "A skill to help users configure NPM tokens, GitHub Secrets, sync package.json versions for automated publishing, and proactively check for GitHub action deprecations and dependency suggestions."
---

# /auto-npm-publish

When the user asks to configure npm publishing, GitHub secrets, or verify workflow deprecations (e.g. Node 20 to Node 24), use this skill.

## 1. Configure NPM Token and GitHub Secrets

If the user needs to publish to npm via GitHub Actions, guide them or automate the token configuration:

1. Instruct the user to generate an Automation Token on npmjs.com:
   - Go to https://www.npmjs.com/settings/tokens
   - Click "Generate New Token" -> "Automation"
   - Copy the token.

2. Once the user provides the token, use the GitHub CLI to set it as a secret:
   ```bash
   gh secret set NPM_TOKEN --body "<the-token>"
   ```

## 2. Sync package.json Version e Rilascio

Il modo più robusto per garantire la corretta sincronizzazione e pubblicazione è usare lo script integrato (se presente):

```bash
# Esegue il bump della versione in package.json, il push, crea la release GH e pubblica su NPM
npm run release
```

Se si vuole procedere manualmente:
```bash
# Esempio: Sync manuale della versione in package.json
NEW_VERSION="0.6.2" # Senza la 'v'
sed -i "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" package.json
git add package.json
```

## 3. Monitor GitHub Action Deprecations

Always check `.github/workflows/` for outdated actions or node environments. For example, if a workflow uses `actions/setup-node@v4` with Node 20, proactively bump it to Node 22 (LTS) or 24 to avoid GitHub warnings.

```bash
# Check workflows for outdated node versions
grep -n "node-version:" .github/workflows/*.yml
```

If an outdated version is found, use file editing tools to update it to `22` or `24`.

## 4. Check Dependabot Suggestions

Check if there are any active dependabot alerts or PRs that need to be addressed before publishing:
```bash
gh pr list --label dependencies
```

## Commands
- `wz-ai-npm-setup`: Starts an interactive setup for NPM tokens and workflow checks.
