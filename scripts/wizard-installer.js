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

const CATEGORIES = {
  "agent-frameworks": {
    name: "🤖 Autonomous Agent Frameworks & Runtimes [AGENT FRAMEWORK]",
    description: "Standalone multi-agent harnesses, execution engines, and orchestrators",
    repos: {
      "earendil-pi": { url: "https://github.com/earendil-works/pi.git", type: "[AGENT FRAMEWORK]" },
      "ECC": { url: "https://github.com/affaan-m/ECC.git", type: "[AGENT FRAMEWORK]" },
      "caveman": { url: "https://github.com/JuliusBrussee/caveman.git", type: "[AGENT FRAMEWORK]" },
      "goodcode": { url: "https://github.com/SpinaBuilds/goodcode.git", type: "[AGENT FRAMEWORK]" },
      "openhuman": { url: "https://github.com/tinyhumansai/openhuman.git", type: "[AGENT FRAMEWORK]" },
      "QwenPaw": { url: "https://github.com/agentscope-ai/QwenPaw.git", type: "[AGENT FRAMEWORK]" },
      "syke": { url: "https://github.com/saxenauts/syke.git", type: "[AGENT FRAMEWORK]" },
      "mem0": { url: "https://github.com/mem0ai/mem0.git", type: "[AGENT FRAMEWORK]" },
      "personal-graph": { url: "https://github.com/Technoculture/personal-graph.git", type: "[AGENT FRAMEWORK]" },
    }
  },
  "cli-tools": {
    name: "⚡ CLI Tools & Context Squeezers [CLI TOOL]",
    description: "Binary command-line utilities, LSP servers, and token context squeezers",
    repos: {
      "sqz": { url: "https://github.com/ojuschugh1/sqz.git", type: "[CLI TOOL]" },
      "LLMLingua": { url: "https://github.com/microsoft/LLMLingua.git", type: "[CLI TOOL]" },
      "FlashRank": { url: "https://github.com/PrithivirajDamodaran/FlashRank.git", type: "[CLI TOOL]" },
      "serena": { url: "https://github.com/oraios/serena.git", type: "[CLI TOOL]" },
      "graphify": { url: "https://github.com/safishamsi/graphify.git", type: "[CLI TOOL]" },
      "claude-mem": { url: "https://github.com/thedotmack/claude-mem.git", type: "[CLI TOOL]" },
      "geminiusage": { url: "https://github.com/rmedranollamas/geminiusage.git", type: "[CLI TOOL]" },
      "litellm": { url: "https://github.com/BerriAI/litellm.git", type: "[CLI TOOL]" },
      "markitdown": { url: "https://github.com/microsoft/markitdown.git", type: "[CLI TOOL]" },
      "mermaid-cli": { url: "https://github.com/mermaid-js/mermaid-cli.git", type: "[CLI TOOL]" },
      "spec-kit": { url: "https://github.com/github/spec-kit.git", type: "[CLI TOOL]" },
      "cli-anything": { url: "https://github.com/HKUDS/CLI-Anything.git", type: "[CLI TOOL]" },
      "cli-printing-press": { url: "https://github.com/mvanhorn/cli-printing-press.git", type: "[CLI TOOL]" },
    }
  },
  "native-skills": {
    name: "🧩 Native LLM Prompt Skills & Packs [NATIVE SKILL]",
    description: "Agent directives, rulebooks, and specialized skill packs",
    repos: {
      "antigravity-awesome-skills": { url: "https://github.com/sickn33/antigravity-awesome-skills.git", type: "[NATIVE SKILL]" },
      "awesome-agent-skills": { url: "https://github.com/VoltAgent/awesome-agent-skills.git", type: "[NATIVE SKILL]" },
      "cybersecurity-skills": { url: "https://github.com/mukul975/Anthropic-Cybersecurity-Skills.git", type: "[NATIVE SKILL]" },
      "stitch-skills": { url: "https://github.com/google-labs-code/stitch-skills.git", type: "[NATIVE SKILL]" },
      "design.md": { url: "https://github.com/google-labs-code/design.md.git", type: "[NATIVE SKILL]" },
      "book-to-skill": { url: "https://github.com/virgiliojr94/book-to-skill.git", type: "[NATIVE SKILL]" },
      "wiki-brain-skill": { url: "https://github.com/tenfoldmarc/wiki-brain-skill.git", type: "[NATIVE SKILL]" },
      "impeccable": { url: "https://github.com/pbakaus/impeccable.git", type: "[NATIVE SKILL]" },
      "last30days-skill": { url: "https://github.com/mvanhorn/last30days-skill.git", type: "[NATIVE SKILL]" },
      "claude-blog": { url: "https://github.com/AgriciDaniel/claude-blog.git", type: "[NATIVE SKILL]" },
      "claude-seo": { url: "https://github.com/AgriciDaniel/claude-seo.git", type: "[NATIVE SKILL]" },
    }
  },
  "graphical-and-services": {
    name: "🖥️ Graphical Apps, Desktop & Media Services [DESKTOP / SERVICE]",
    description: "Desktop UI harnesses, audio/video studios, realtime DBs, and API bridges",
    repos: {
      "aionui": { url: "https://github.com/iOfficeAI/AionUi.git", type: "[DESKTOP / APP]" },
      "phantom-ui": { url: "https://github.com/Aejkatappaja/phantom-ui.git", type: "[DESKTOP / APP]" },
      "voicebox": { url: "https://github.com/jamiepine/voicebox.git", type: "[DESKTOP / SERVICE]" },
      "omnivoice-studio": { url: "https://github.com/debpalash/OmniVoice-Studio.git", type: "[DESKTOP / SERVICE]" },
      "supertonic": { url: "https://github.com/supertone-inc/supertonic.git", type: "[MEDIA SERVICE]" },
      "hyperframes": { url: "https://github.com/heygen-com/hyperframes.git", type: "[MEDIA SERVICE]" },
      "wslens": { url: "https://github.com/vekexasia/wslens.git", type: "[GUI BACKEND]" },
      "pocketbase": { url: "https://github.com/pocketbase/pocketbase.git", type: "[REALTIME DB]" },
      "trailbase": { url: "https://github.com/trailbaseio/trailbase.git", type: "[REALTIME DB]" },
      "zvec": { url: "https://github.com/alibaba/zvec.git", type: "[VECTOR DB]" },
      "turbovec": { url: "https://github.com/RyanCodrai/turbovec.git", type: "[VECTOR DB]" },
      "go-whatsapp": { url: "https://github.com/aldinokemal/go-whatsapp-web-multidevice.git", type: "[REST BRIDGE]" },
      "wuzapi": { url: "https://github.com/asternic/wuzapi.git", type: "[REST API]" },
      "openwa": { url: "https://github.com/rmyndharis/OpenWA.git", type: "[WEBSOCKET ENGINE]" },
      "cockpit-tools": { url: "https://github.com/jlcodes99/cockpit-tools.git", type: "[LOCAL PROXY]" },
    }
  },
  "starter-templates": {
    name: "🏗️ Starter Templates & Benchmarks [STARTER TEMPLATE]",
    description: "Production API starters, scaffolding, and A/B test benchmarking libraries",
    repos: {
      "express-typescript-starter": { url: "https://github.com/ToniR7/express-typescript-starter.git", type: "[STARTER TEMPLATE]" },
      "aisuite": { url: "https://github.com/andrewyng/aisuite.git", type: "[BENCHMARK FRAMEWORK]" },
    }
  }
};

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
        spawnSync("git", ["clone", "--depth", "1", repoUrl, destDir], { stdio: "ignore" });
        console.log(`  ${GREEN}✓ ${repoName}${itemType} cloned.${RESET}`);
      } else {
        console.log(`  ${GREEN}✓ ${repoName}${itemType} is already present.${RESET}`);
      }

      // Execute build/install script per OS guideline
      if (fs.existsSync(path.join(destDir, "bin", "install.js"))) {
        spawnSync("node", [path.join(destDir, "bin", "install.js"), "--all", "--non-interactive"], { stdio: "ignore" });
      } else if (fs.existsSync(path.join(destDir, "install.sh")) && !isWin) {
        spawnSync("bash", [path.join(destDir, "install.sh")], { stdio: "ignore" });
      } else if (fs.existsSync(path.join(destDir, "install.ps1")) && isWin) {
        spawnSync("powershell", ["-ExecutionPolicy", "Bypass", "-File", path.join(destDir, "install.ps1")], { stdio: "ignore" });
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
