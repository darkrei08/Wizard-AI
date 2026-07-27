export default async function({ parallel, agent, checkpoint }, args) {
  const { packages = [] } = args;

  if (packages.length === 0) {
    throw new Error("No packages specified for mass installation. Provide { packages: [...] } in args.");
  }

  await checkpoint("init", "Start Engineering Excellence Mass Installation Workflow");

  // Loop 1: Plan & Spec
  const plan = await agent(`
    Analyze the requested packages: ${JSON.stringify(packages)}.
    Generate a mass installation plan complying with Engineering Excellence.
    Check for overlaps, determine installation method (npm, uv, git), and define smoke test commands.
    Return a structured JSON plan with an array of tasks.
  `, { role: "master-develop" });

  await checkpoint("plan", "Installation plan generated", plan);

  // Loop 2 & 3: Develop (Install) & Quality Gates (Parallel Fan-Out)
  const installationResults = await parallel(
    packages.map(pkg => ({
      name: `install-${pkg}`,
      run: async () => {
        return await agent(`
          Install the package/skill: ${pkg}.
          Follow Engineering Excellence and wizard-ai-installer rules:
          1. Safe dynamic versioning (no hardcoded versions).
          2. Smoke test via CLI (e.g. --version or --help).
          3. If test fails, rollback.
          Return status: Success/Rollback, and test output.
        `, { role: "worker-generic" });
      }
    }))
  );

  await checkpoint("install", "Parallel installation & verification complete", installationResults);

  // Loop 4 & 5: Refactor (Registry Update) & Release
  const registryUpdate = await agent(`
    Review installation results: ${JSON.stringify(installationResults)}.
    For successful installations:
    1. Categorize and update WIKI.md / setup.sh / wz-ai help.
    2. Write a short engineering report for MEMORY.md summarizing the mass install (what, why, where).
    3. Instruct the execution of 'wz-ai sync-skills' to release.
  `, { role: "master-develop" });

  await checkpoint("release", "Registry updated and session report generated", registryUpdate);

  return registryUpdate;
}
