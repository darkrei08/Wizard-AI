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
  const res = spawnSync(cmd, args, Object.assign({ stdio: "inherit" }, opts));
  if (res.error) fail(`Failed to run ${cmd}: ${res.error.message}`);
  return res.status;
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
const installDir =
  process.env.WIZARD_AI_DIR || path.join(os.homedir(), ".wizard-ai");

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
let status;
if (isWin) {
  status = run("powershell", [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-File",
    path.join(installDir, "setup.ps1"),
  ]);
} else {
  status = run("bash", [path.join(installDir, "setup.sh")]);
}

process.exit(status === null ? 1 : status);
