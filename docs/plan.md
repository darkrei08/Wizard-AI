# Loop 1: Plan & Spec

## 1. CLI Unification
- Modify `cli.js` to natively route subcommands:
  - `proxy` -> `scripts/ai-proxy.js`
  - `test`, `webnative` -> `scripts/wizard-test.js`
  - `setup`, `update` -> internal setup scripts
- Ensure `package.json` bins are cleaned up if necessary, but keep `wizard-ai` as the main entry point.

## 2. README Compartmentalization
- Split `README.md` into smaller command-specific documents in a `docs/commands/` folder (e.g., `proxy.md`, `test.md`, `optimize.md`, etc.).
- Update `README.md` to link to these localized docs.
- Do the same for localized READMEs if appropriate, or just keep them pointing to the main one.

## 3. Skills Migration
- Track the new `skills/misc/` directory structure in `git`.

## 4. Loop Execution
- Develop & TDD: Implement the `cli.js` routing and document splitting.
- Debug & Verify: Test the `wizard-ai proxy` command through `cli.js`.
- Refactor: Clean up unused code in `cli.js`.
- Release: Commit and push to `main`.
