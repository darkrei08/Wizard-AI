# Releasing `wizard-ai-cli` to npm

The npm package [`wizard-ai-cli`](https://www.npmjs.com/package/wizard-ai-cli)
is the launcher that powers `npx wizard-ai-cli`. Publishing is automated by
[`.github/workflows/npm-publish.yml`](../.github/workflows/npm-publish.yml):
**when a GitHub Release is published, the workflow runs `npm publish`.**

## One-time setup (repo owner)

1. Create a free account on [npmjs.com](https://www.npmjs.com/signup).
2. Ask the current package owner to add you as a **collaborator** with
   read/write on `wizard-ai-cli` (Package settings → Collaborators), or have
   ownership transferred.
3. Generate an **automation** access token:
   npm → Access Tokens → *Generate New Token* → **Classic → Automation**.
   (Automation tokens bypass 2FA, which is required for CI publishing — a
   normal granular token without the *bypass 2FA* option fails with `EOTP`.)
4. In this GitHub repo: Settings → Secrets and variables → Actions →
   *New repository secret*, name it **`NPM_TOKEN`**, paste the token.

That's it — the secret only needs to be set once.

## Cutting a release

1. Bump the version in [`package.json`](../package.json) following semver
   (e.g. `0.1.0` → `0.1.1`). Commit and push to `main`.
2. On GitHub: Releases → *Draft a new release* → create a tag like `v0.1.1`,
   write the notes, **Publish release**.
3. The `Publish to npm` workflow runs automatically and pushes the new version.
   Watch it under the **Actions** tab.

You can also trigger it manually from the Actions tab (*Run workflow*) if a
release is already published but the run needs re-doing.

## Notes

- The package ships only the launcher (`cli.js` + `package.json` + READMEs);
  everything else is fetched from the repo at install time, so a release is
  only needed when `cli.js` or the package metadata changes.
- `--provenance` attaches a signed build attestation linking the published
  package to this workflow run (requires the `id-token: write` permission,
  already set in the workflow). Drop the flag if it ever blocks a publish.
