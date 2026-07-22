#!/usr/bin/env node
// wizard-ai — npm launcher for the Wizard-AI environment.
//
// `npx wizard-ai-cli` (or a global `wizard-ai`) clones the repository into a
// stable location and runs the platform setup script from there. The clone
// must NOT live inside the npx cache: setup.sh/setup.ps1 register
// WIZARD_AI_DIR pointing at the script's own directory, and skills/wrappers
// reference that path forever after.

"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");

const REPO_URL = "https://github.com/darkrei08/Wizard-AI.git";
const isWin = process.platform === "win32";

function fail(msg) {
  console.error("\n[wizard-ai] " + msg);
  process.exit(1);
}

function run(cmd, args, opts) {
  const defaultOpts = { stdio: "inherit", shell: false };
  const res = spawnSync(cmd, args, Object.assign(defaultOpts, opts));
  if (res.error) fail(`Failed to run ${cmd}: ${res.error.message}`);
  return res.status;
}

const subcmd = process.argv[2];

// 1. Handle --help and --version
if (subcmd === "--help" || subcmd === "-h") {
  const ver = require("./package.json").version;
  console.log(`wizard-ai v${ver}`);
  console.log("Usage: npx @darkrei08/wizard-ai-cli [command]\n");
  console.log("Commands:");
  console.log("  (default/skills) Launch interactive skills & framework manager");
  console.log("  setup            Clone & run full platform environment installer");
  console.log("  add <url>        Install skill(s) from a GitHub repo URL");
  console.log("  install          Install skills by category from registry");
  console.log("  remove           Remove installed skills");
  console.log("  test             Run wizard-test suite");
  console.log("  proxy            Start wz-ai-proxy");
  console.log("\nURL Install Flags:");
  console.log("  --skill <name>   Install only the named skill from the repo");
  console.log("  --all-agents     Install to all known agent paths without prompting");
  console.log("\nExamples:");
  console.log("  npx wizard-ai add https://github.com/org/repo");
  console.log("  npx wizard-ai add https://github.com/org/repo --skill find-skills");
  console.log("  npx wizard-ai add https://github.com/org/repo --skill caveman --all-agents");
  console.log("\nFlags:");
  console.log("  --sudo           Escalate setup.sh to sudo (if needed)");
  console.log("  --verbose        Verbose output");
  process.exit(0);
}
if (subcmd === "--version" || subcmd === "-v" || subcmd === "-V") {
  console.log(require("./package.json").version);
  process.exit(0);
}

if (subcmd === "proxy") {
  const proxyScript = path.join(__dirname, "scripts", "wz-ai-proxy.js");
  if (fs.existsSync(proxyScript)) {
    const status = run("node", [proxyScript, ...process.argv.slice(3)]);
    process.exit(status === null ? 1 : status);
  }
}

if (!subcmd || subcmd === "skills" || subcmd === "install" || subcmd === "add" || subcmd === "remove" || subcmd === "delete") {
  const installerScript = path.join(__dirname, "scripts", "wizard-installer.js");
  if (fs.existsSync(installerScript)) {
    // Pass all args including URL and --skill flag when doing URL-based install
    const installerArgs = !subcmd ? process.argv.slice(2) : process.argv.slice(2);
    const status = run("node", [installerScript, ...installerArgs]);
    process.exit(status === null ? 1 : status);
  }
}

if (subcmd === "test" || subcmd === "webnative-inspect" || subcmd === "webnative") {
  const testScript = path.join(__dirname, "scripts", "wizard-test.js");
  if (fs.existsSync(testScript)) {
    const status = run("node", [testScript, ...process.argv.slice(subcmd === "test" ? 3 : 2)]);
    process.exit(status === null ? 1 : status);
  }
}

// 1. Make sure git is available — both setup scripts require it anyway.
const gitCheck = spawnSync("git", ["--version"], { stdio: "ignore" });
if (gitCheck.error || gitCheck.status !== 0) {
  fail(
    "git not found on PATH. Install it first:\n" +
      (isWin
        ? "  https://git-scm.com/download/win"
        : "  https://git-scm.com/downloads")
  );
}

// 2. Resolve the install directory: an existing WIZARD_AI_DIR wins,
//    otherwise default to ~/.wizard-ai.
const envDir = process.env.WIZARD_AI_DIR ? process.env.WIZARD_AI_DIR.trim() : "";
// Basic path validation to prevent path traversal
if (envDir && (envDir.includes("..") || envDir.includes("|") || envDir.includes("&"))) {
  fail("Invalid WIZARD_AI_DIR environment variable.");
}
const installDir = envDir || path.join(os.homedir(), ".wizard-ai");

if (fs.existsSync(path.join(installDir, ".git"))) {
  console.log(`[wizard-ai] Existing install found at ${installDir} — updating...`);
  const status = run("git", ["pull", "--ff-only"], { cwd: installDir });
  if (status !== 0) {
    console.warn(
      "[wizard-ai] git pull failed (local changes?). Continuing with the current checkout."
    );
  }
} else if (fs.existsSync(installDir)) {
  fail(
    `${installDir} exists but is not a git checkout of Wizard-AI.\n` +
      "Move it away, or set WIZARD_AI_DIR to your existing clone."
  );
} else {
  console.log(`[wizard-ai] Cloning Wizard-AI into ${installDir}...`);
  const status = run("git", ["clone", "--depth", "1", REPO_URL, installDir]);
  if (status !== 0) fail("git clone failed.");
}

// 3. Run the platform setup script from the stable clone.
const args = process.argv.slice(2);
const isVerbose = args.includes("--verbose") || args.includes("-v");

console.log("\n🚀 Running platform installer...");
let status;
if (isWin) {
  const psArgs = [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    path.join(installDir, "setup.ps1"),
  ];
  if (isVerbose) psArgs.push("-VerboseMode");
  status = run("powershell", psArgs);
} else {
  const shArgs = ["bash", path.join(installDir, "setup.sh")];
  if (isVerbose) shArgs.push("--verbose");

  // Run setup.sh directly — ~/.wizard-ai is user-space, no root needed.
  // Use --sudo flag only when explicitly requested (e.g. global npm/cargo installs).
  const wantSudo = args.includes("--sudo");
  if (wantSudo && process.getuid && process.getuid() !== 0) {
    status = run("sudo", shArgs);
  } else {
    status = run(shArgs[0], shArgs.slice(1));
  }
}

process.exit(status === null ? 1 : status);
