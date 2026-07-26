const fs = require('fs');
const { runSelect } = require('./tui.js');

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

const WIZARD_ASCII = `\x1b[35m
        ____ 
      .'* *.'
   __/_*_*(_
  / _______ \\
 _\\_)/___\\(_/_ 
/ _((\\- -/))_ \\
\\ \\())(-)(()/ /
 ' \\(((()))/ '
/ ' \\)).))/ ' \\
\\__\\_\\.../_/__/
\x1b[0m`;

async function main() {
  const mode = await runSelect(
    'Wizard-AI Extra Tools Installer\n\nMenu',
    [
      { value: 'select', label: 'Select tools to install (Multi-select)' },
      { value: 'all', label: 'Install All' },
      { value: 'skip', label: 'Skip (do not install extra tools)' }
    ],
    false,
    WIZARD_ASCII
  );

  if (!mode) process.exit(1);

  let selected = [];
  if (mode === 'all') {
    selected = EXTRA_TOOLS.map(t => t.value);
  } else if (mode === 'select') {
    const res = await runSelect(
      'Select tools to install:',
      EXTRA_TOOLS,
      true,
      WIZARD_ASCII
    );
    if (!res) process.exit(1);
    selected = res;
  } else {
    console.log('\n\x1b[33m⏭️  Skipping extra tools.\x1b[0m');
    if (outFile) fs.writeFileSync(outFile, '');
    process.exit(0);
  }

  if (selected.length > 0) {
    console.log(`\n\x1b[32mProceeding with installation of ${selected.length} tools...\x1b[0m`);
    if (outFile) {
      fs.writeFileSync(outFile, selected.join('\n') + '\n');
    }
  } else {
    console.log('\n\x1b[33mNo tools selected.\x1b[0m');
    if (outFile) fs.writeFileSync(outFile, '');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
