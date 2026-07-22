#!/usr/bin/env node
/**
 * wizard-installer.js — Interactive Terminal Skill & Framework Installer for Wizard-AI
 *
 * Inspired by caveman / npm interactive installer patterns.
 * Supports:
 * - Interactive TTY mode (ANSI colors, Category / Skill checkboxes)
 * - Mass selection ([1] All Skills, [2] By Category, [3] Individual Custom)
 * - Non-interactive mode (--all, --yes, -y) for automated agent execution
 */

"use strict";

const { spawnSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

const isWin = process.platform === "win32";
const args = process.argv.slice(2);
const isNonInteractive = args.includes("--all") || args.includes("--yes") || args.includes("-y") || !process.stdin.isTTY;

// ANSI Colors
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const MAGENTA = "\x1b[35m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";

// ── Load categories from centralized registry (single source of truth) ──────
const REGISTRY_PATH = path.join(__dirname, "repo-registry.json");
if (!fs.existsSync(REGISTRY_PATH)) {
  console.error(`${RED}[ERROR] Missing repo-registry.json at ${REGISTRY_PATH}${RESET}`);
  process.exit(1);
}
const REGISTRY = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));

// Transform registry format to internal CATEGORIES format
const CATEGORIES = {};
for (const [catKey, catData] of Object.entries(REGISTRY.categories)) {
  const repos = {};
  for (const repo of catData.repos) {
    repos[repo.name] = { url: repo.url, type: catData.badge, desc: repo.desc };
  }
  CATEGORIES[catKey] = {
    name: `${catData.name} ${catData.badge}`,
    description: catData.description,
    repos,
  };
}


function printBanner() {
  console.log(`\n${CYAN}============================================================${RESET}`);
  console.log(`${BOLD}${CYAN}   🧙‍♂️  Wizard-AI Interactive Skill & Framework Installer${RESET}`);
  console.log(`${CYAN}============================================================${RESET}\n`);
}

function promptQuestion(rl, query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function runInstallation(selectedCategoryKeys) {
  const wizardHome = process.env.WIZARD_AI_DIR || path.join(require("os").homedir(), ".wizard-ai");
  const geminiSkills = path.join(require("os").homedir(), ".gemini", "config", "skills");

  fs.mkdirSync(wizardHome, { recursive: true });
  fs.mkdirSync(geminiSkills, { recursive: true });

  console.log(`\n🚀 ${BOLD}Starting installation for selected categories...${RESET}\n`);

  const isVerbose = args.includes("--verbose") || args.includes("-v");
  const buildStdio = isVerbose ? "inherit" : "ignore";

  if (!isVerbose) {
    console.log(`${CYAN}💡 [Tip] Pass --verbose or -v to watch full line-by-line build & download logs.${RESET}\n`);
  }

  for (const catKey of selectedCategoryKeys) {
    const cat = CATEGORIES[catKey];
    if (!cat) continue;
    console.log(`${MAGENTA}📦 Installing Category: ${cat.name}${RESET}`);

    // Install repos
    for (const [repoName, repoData] of Object.entries(cat.repos || {})) {
      const repoUrl = typeof repoData === "string" ? repoData : repoData.url;
      const itemType = typeof repoData === "object" && repoData.type ? ` ${CYAN}${repoData.type}${RESET}` : "";
      const destDir = path.join(wizardHome, repoName);
      if (!fs.existsSync(destDir)) {
        console.log(`  ${YELLOW}Cloning ${repoName}${itemType}...${RESET}`);
        spawnSync("git", ["clone", "--depth", "1", repoUrl, destDir], { stdio: buildStdio });
        console.log(`  ${GREEN}✓ ${repoName}${itemType} cloned.${RESET}`);
      } else {
        console.log(`  ${GREEN}✓ ${repoName}${itemType} is already present.${RESET}`);
      }

      // Execute build/install script per OS guideline
      if (fs.existsSync(path.join(destDir, "bin", "install.js"))) {
        console.log(`  ${CYAN}  ↳ Executing bin/install.js installer...${RESET}`);
        spawnSync("node", [path.join(destDir, "bin", "install.js"), "--all", "--non-interactive"], { stdio: buildStdio });
      } else if (fs.existsSync(path.join(destDir, "install.sh")) && !isWin) {
        console.log(`  ${CYAN}  ↳ Running install.sh...${RESET}`);
        spawnSync("bash", [path.join(destDir, "install.sh")], { stdio: buildStdio });
      } else if (fs.existsSync(path.join(destDir, "install.ps1")) && isWin) {
        console.log(`  ${CYAN}  ↳ Running install.ps1...${RESET}`);
        spawnSync("powershell", ["-ExecutionPolicy", "Bypass", "-File", path.join(destDir, "install.ps1")], { stdio: buildStdio });
      } else if (fs.existsSync(path.join(destDir, "package.json"))) {
        console.log(`  ${CYAN}  ↳ Running npm install for ${repoName}...${RESET}`);
        spawnSync("npm", ["install", "--prefix", destDir, "--no-audit", "--no-fund"], { stdio: buildStdio });
      }
    }
  }

  // Trigger skill synchronization to all targets (.gemini, .claude, .amp, .agents, .cursor, .windsurf, .opencode, .pi)
  console.log(`\n${CYAN}🔄 Syncing all skills to all agent targets...${RESET}`);
  const syncScript = isWin ? path.join(wizardHome, "bin", "windows", "wz-ai-sync-skills.ps1") : path.join(wizardHome, "bin", "wz-ai-sync-skills");
  if (fs.existsSync(syncScript)) {
    if (isWin) {
      spawnSync("powershell", ["-ExecutionPolicy", "Bypass", "-File", syncScript], { stdio: "inherit" });
    } else {
      spawnSync("bash", [syncScript], { stdio: "inherit" });
    }
  } else {
    // Fallback sync using local repo script
    const localSync = isWin ? path.join(__dirname, "..", "bin", "windows", "wz-ai-sync-skills.ps1") : path.join(__dirname, "..", "bin", "wz-ai-sync-skills");
    if (fs.existsSync(localSync)) {
      if (isWin) {
        spawnSync("powershell", ["-ExecutionPolicy", "Bypass", "-File", localSync], { stdio: "inherit" });
      } else {
        spawnSync("bash", [localSync], { stdio: "inherit" });
      }
    }
  }

  console.log(`\n${GREEN}${BOLD}🎉 Installation and skill synchronization completed!${RESET}\n`);
}

async function main() {
  printBanner();

  if (isNonInteractive) {
    console.log(`${YELLOW}Running in non-interactive / automated mode (--all). Installing all categories...${RESET}`);
    await runInstallation(Object.keys(CATEGORIES));
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Please select installation mode:`);
  console.log(`  ${BOLD}[1] Massive Install — All Skills & Frameworks (Recommended)${RESET}`);
  console.log(`  ${BOLD}[2] Category Selection — Select specific skill categories${RESET}`);
  console.log(`  ${BOLD}[3] Exit${RESET}\n`);

  const mode = (await promptQuestion(rl, "> ")).trim();

  if (mode === "1" || mode === "") {
    rl.close();
    await runInstallation(Object.keys(CATEGORIES));
  } else if (mode === "2") {
    console.log(`\nAvailable Categories (Macro Domains & Software Natures):`);
    const catKeys = Object.keys(CATEGORIES);
    catKeys.forEach((key, idx) => {
      console.log(`  ${BOLD}[${idx + 1}] ${CATEGORIES[key].name}${RESET}`);
      if (CATEGORIES[key].description) {
        console.log(`      ${DIM}${CATEGORIES[key].description}${RESET}`);
      }
    });
    console.log(`\nEnter numbers separated by commas (e.g. 1, 2, 4) or 'all':`);
    const answer = (await promptQuestion(rl, "> ")).trim();
    rl.close();

    let selectedKeys = [];
    if (answer.toLowerCase() === "all" || answer === "") {
      selectedKeys = catKeys;
    } else {
      const indices = answer.split(",").map((s) => parseInt(s.trim(), 10) - 1);
      selectedKeys = indices.filter((i) => i >= 0 && i < catKeys.length).map((i) => catKeys[i]);
    }

    if (selectedKeys.length === 0) {
      console.log(`${RED}No valid categories selected. Exiting.${RESET}`);
      return;
    }

    await runInstallation(selectedKeys);
  } else {
    rl.close();
    console.log("Exiting installer.");
  }
}

main().catch((err) => {
  console.error(`${RED}Installer error: ${err.message}${RESET}`);
  process.exit(1);
});
