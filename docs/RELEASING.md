# Releasing `wizard-ai-cli`

NPM package [`wizard-ai-cli`](https://www.npmjs.com/package/wizard-ai-cli).
Launcher for `npx wizard-ai-cli`.
Automated via [`.github/workflows/npm-publish.yml`](../.github/workflows/npm-publish.yml).
Trigger: GitHub Release.

## One-Time Setup
1. Create [npmjs.com](https://www.npmjs.com/signup) account.
2. Get read/write collaborator access (or ownership) to `wizard-ai-cli`.
3. Generate **Automation** token: npm → Access Tokens → Generate → Classic → Automation. (Bypasses 2FA for CI).
4. Add GitHub Secret: Settings → Secrets/Variables → Actions → New. Name: `NPM_TOKEN`. Paste token.

## Cut a Release
1. Bump version in [`package.json`](../package.json) (semver). Commit/push to `main`.
2. GitHub: Releases → Draft new release → Create tag (e.g. `v0.1.1`) → Publish.
3. `Publish to npm` workflow runs automatically.

## Notes
- Package contains launcher only (`cli.js`, `package.json`, README). No release needed unless launcher/metadata changes.
- Workflow uses `--provenance` (signed build attestation). Requires `id-token: write`.
