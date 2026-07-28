#!/usr/bin/env node
import { execSync } from 'child_process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOME = os.homedir();
const isNonInteractive = process.argv.includes('--yes') || process.argv.includes('-y') || process.argv.includes('--all') || !process.stdin.isTTY;

const PURPLE = '\x1b[35m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const NC = '\x1b[0m';

console.log(`\n  ${PURPLE}┌  🚀  ${BOLD}Wizard-AI / Pi - Setup Proxy Cockpit e Selezione Modello${NC}`);
console.log(`  ${PURPLE}└────────────────────────────────────────────────────────────────────────${NC}\n`);

// 1. Resolve proxy script or command
function runProxyCommand(cmd) {
  const possibleBins = [
    'wz-ai-proxy',
    'wz-ai proxy',
    'ai-proxy',
    `node "${path.join(HOME, '.wizard-ai', 'scripts', 'wz-ai-proxy.js')}"`,
    `node "${path.join(process.cwd(), 'scripts', 'wz-ai-proxy.js')}"`
  ];

  for (const bin of possibleBins) {
    try {
      execSync(`${bin} ${cmd}`, { stdio: 'inherit' });
      return true;
    } catch (e) {
      // Try next fallback bin
    }
  }
  return false;
}

try {
  console.log("🔄 Configurazione Proxy Rotator...");
  const ok = runProxyCommand('auto-setup');
  if (!ok) {
    runProxyCommand('provision');
    runProxyCommand('pi-config');
    runProxyCommand('enable');
  }
} catch (error) {
  if (error.message && error.message.includes('EACCES')) {
    console.log("\n❌ ERRORE DI PERMESSI (EACCES) RILEVATO!");
    console.log("Il proxy deve installare componenti globali.");
    console.log("👉 PER FAVORE, ESEGUI QUESTO COMANDO MANUALMENTE DAL TUO TERMINALE:");
    console.log("    sudo wz-ai-proxy auto-setup\n");
  } else {
    console.warn("\n⚠️ Attenzione: setup proxy automatico fallito. Proseguo con la verifica dei modelli.\n");
  }
}

// 2. Resolve cockpit-reader.mjs dynamically across multiple paths
function findCockpitReader() {
  const candidatePaths = [
    path.join(__dirname, '..', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(__dirname, 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.gemini', 'config', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.claude', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.config', 'amp', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.agents', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.pi', 'agent', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
    path.join(HOME, '.pi', 'skills', 'cockpit-bridge', 'scripts', 'cockpit-reader.mjs'),
  ];

  return candidatePaths.find(p => fs.existsSync(p)) || null;
}

console.log("📡 Lettura dei modelli disponibili dal tuo piano Cockpit...\n");

try {
  const cockpitReaderPath = findCockpitReader();
  if (!cockpitReaderPath) {
    console.log("⚠️ Informazione: cockpit-reader.mjs non trovato nei percorsi standard.");
    console.log("  Per installare tutte le skill: wizard-ai sync-skills");
    process.exit(0);
  }

  const output = execSync(`node "${cockpitReaderPath}" status`, { encoding: 'utf-8' });
  const data = JSON.parse(output);
  const models = data.models || [];

  if (models.length === 0) {
    console.log("ℹ️ Nessun modello trovato nell'abbonamento Cockpit Tools.");
    process.exit(0);
  }

  console.log("Modelli disponibili:");
  models.forEach((m, i) => {
    const pct = m.percentage ?? 100;
    let icon = '🟢';
    if (pct < 10) icon = '🔴';
    else if (pct < 50) icon = '🟡';
    console.log(`[${i + 1}] ${icon} ${m.display_name || m.name} (${m.name}) - Quota: ${pct}%`);
  });

  if (isNonInteractive) {
    console.log("\n⚡ Modalità non-interattiva: Mantenuto modello predefinito Pi.");
    process.exit(0);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question(`\n👉 Digita il numero del modello che Pi deve utilizzare di default (1-${models.length}): `, (answer) => {
    const index = parseInt(answer) - 1;
    if (index >= 0 && index < models.length) {
      const selectedModel = models[index].name;
      console.log(`\n🎯 Hai scelto: ${selectedModel}\n`);

      const settingsPath = path.join(HOME, '.pi', 'agent', 'settings.json');
      if (fs.existsSync(settingsPath)) {
        try {
          const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
          settings.defaultModel = selectedModel;
          fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
          console.log(`✅ [1/2] Modello globale aggiornato in settings.json (${selectedModel})`);
        } catch (e) {
          console.warn(`⚠️ Modifica settings.json fallita: ${e.message}`);
        }
      }

      const accountsPath = path.join(HOME, '.pi', 'account-switcher', 'accounts.json');
      if (fs.existsSync(accountsPath)) {
        try {
          const accConfig = JSON.parse(fs.readFileSync(accountsPath, 'utf8'));
          let updatedCount = 0;
          if (accConfig.accounts && Array.isArray(accConfig.accounts)) {
            accConfig.accounts.forEach(acc => {
              if (acc.id && acc.id.startsWith('cockpit-')) {
                acc.model = selectedModel;
                updatedCount++;
              }
            });
          }
          fs.writeFileSync(accountsPath, JSON.stringify(accConfig, null, 2));
          console.log(`✅ [2/2] Aggiornati ${updatedCount} account nel proxy per forzare l'uso di ${selectedModel}`);
        } catch (e) {
          console.warn(`⚠️ Modifica accounts.json fallita: ${e.message}`);
        }
      }

      console.log("\n✨ Setup Cockpit Proxy completato con successo!");
    } else {
      console.log("ℹ️ Nessuna scelta effettuata. Mantenuto modello predefinito.");
    }
    rl.close();
  });

} catch (error) {
  console.error("Errore durante la configurazione:", error.message);
}
