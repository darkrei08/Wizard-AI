const fs = require('fs');
const { intro, select, multiselect, outro, isCancel, note } = require('@clack/prompts');
const pc = require('picocolors');

const outFile = process.argv[2];

const EXTRA_TOOLS = [
  { value: 'ecc', label: 'ECC Universal (Agent Framework)' },
  { value: 'codebase-mcp', label: 'Codebase Memory MCP' },
  { value: 'gentle-ai', label: 'Gentle AI (Ecosystem)' },
  { value: 'understand-anything', label: 'Understand Anything' },
  { value: 'rtk', label: 'RTK (Rust Token Killer)' },
  { value: 'headroom', label: 'Headroom AI' },
  { value: 'turbovec', label: 'TurboVec' },
  { value: 'raganything', label: 'RAG Anything' },
  { value: 'engram', label: 'Engram' }
];

const GENTLE_ROSE_ASCII = `\x1b[38;5;189m               ⢀⡴⢪⠔⣉⠔⠋               \x1b[0m
\x1b[38;5;189m                 ⠐⠈                        \x1b[0m
\x1b[35m Wizard-AI: Ecosystem, Frameworks, Workflows \x1b[0m`;

async function main() {
  console.clear();
  console.log(GENTLE_ROSE_ASCII + '\n');
  
  intro(pc.inverse(' 🛠️  Wizard-AI Extra Tools Installer '));

  const mode = await select({
    message: 'Menu',
    options: [
      { value: 'select', label: '▸ Select tools to install (Multi-select)' },
      { value: 'all', label: '▸ Install All' },
      { value: 'skip', label: '▸ Skip (do not install extra tools)' }
    ]
  });

  if (isCancel(mode)) process.exit(1);

  let selected = [];
  if (mode === 'all') {
    selected = EXTRA_TOOLS.map(t => t.value);
  } else if (mode === 'select') {
    const res = await multiselect({
      message: 'Select tools to install:',
      options: EXTRA_TOOLS.map(t => ({ value: t.value, label: '▸ ' + t.label })),
      required: false
    });
    if (isCancel(res)) process.exit(1);
    selected = res;
  } else {
    outro(pc.yellow('⏭️  Skipping extra tools.'));
    if (outFile) fs.writeFileSync(outFile, '');
    process.exit(0);
  }

  if (selected.length > 0) {
    note(`Selected ${selected.length} tools for installation.`, 'Selection Complete');
    outro(pc.green('Proceeding with installation...'));
    if (outFile) {
      fs.writeFileSync(outFile, selected.join('\n') + '\n');
    }
  } else {
    outro(pc.yellow('No tools selected.'));
    if (outFile) fs.writeFileSync(outFile, '');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
