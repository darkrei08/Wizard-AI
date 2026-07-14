#!/usr/bin/env node
/**
 * wizard-test / ai-test — Unified CLI Wrapper for Antigravity IDE & Terminal Testing
 *
 * Integrates:
 * 1. vscode-jest-runner & Vitest / Bun test support across any workspace (waforge, Wizard-AI, etc.)
 * 2. vscode-webnative & WNFS (Web Native File System) capability checks
 */

"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0] || "run";

function runCmd(cmd, cmdArgs, opts = {}) {
  const res = spawnSync(cmd, cmdArgs, Object.assign({ stdio: "inherit", shell: true }, opts));
  return res.status || 0;
}

function checkWebNativeCapabilities() {
  console.log("\n🌐 [wizard-test] Checking WebNative / WNFS & IDE Capabilities (vscode-webnative)...");
  const pkgPath = path.join(process.cwd(), "package.json");
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
      const deps = Object.assign({}, pkg.dependencies, pkg.devDependencies);
      const hasWebNative = deps.webnative || deps["@webnative/wnfs"] || deps["vscode-webnative"];
      if (hasWebNative) {
        console.log("✅ WebNative / WNFS dependencies detected in current workspace package.json.");
      } else {
        console.log("ℹ️ No direct WebNative deps in package.json. Workspace ready for WNFS distributed filesystem inspection.");
      }
    } catch (e) {
      console.warn("⚠️ Could not parse package.json for WebNative inspection.");
    }
  } else {
    console.log("ℹ️ Current working directory is not a package.json root. WebNative WNFS inspection ready.");
  }
}

if (command === "webnative-inspect" || command === "webnative") {
  checkWebNativeCapabilities();
  process.exit(0);
}

// Check what test runners are available or requested
console.log("\n🧪 [wizard-test] Running unified test runner (Vitest / Bun / Jest Runner IDE Compatible)...");

const passArgs = command === "run" ? args.slice(1) : args;

const pkgPath = path.join(process.cwd(), "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
  if (pkg.scripts && pkg.scripts.test) {
    console.log(`📦 Executing workspace script: npm test ${passArgs.join(" ")}`);
    const status = runCmd("npm", ["test", ...passArgs]);
    process.exit(status);
  }
}

// Fallback checking for vitest or bun test directly
if (fs.existsSync(path.join(process.cwd(), "node_modules", ".bin", "vitest")) || fs.existsSync(path.join(process.cwd(), "vitest.config.ts")) || fs.existsSync(path.join(process.cwd(), "vitest.config.js"))) {
  console.log("⚡ Executing local Vitest runner...");
  const status = runCmd("npx", ["vitest", "run", ...passArgs]);
  process.exit(status);
} else {
  console.log("⚡ Executing Bun / Node test fallback...");
  const status = runCmd("npx", ["vitest", "run", ...passArgs]);
  process.exit(status);
}
