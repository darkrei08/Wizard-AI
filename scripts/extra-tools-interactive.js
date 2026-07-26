const { intro, select, multiselect, outro, isCancel, note } = require('@clack/prompts');
const pc = require('picocolors');
const fs = require('fs');

const outFile = process.argv[2];

const EXTRA_TOOLS = [
  { value: 'ecc', label: 'ECC Universal (Agent Framework)', hint: 'npm install -g ecc-universal' },
  { value: 'codebase-mcp', label: 'Codebase Memory MCP', hint: 'AST-based structural code intelligence' },
  { value: 'gentle-ai', label: 'Gentle AI', hint: 'Ecosystem, Frameworks, Workflows' },
  { value: 'understand-anything', label: 'Understand Anything', hint: 'Codebase understanding tool' },
  { value: 'rtk', label: 'RTK (Rust Token Killer)', hint: 'Context squeezer' },
  { value: 'headroom', label: 'Headroom AI', hint: 'Context proxy' },
  { value: 'turbovec', label: 'TurboVec', hint: 'Vector DB' },
  { value: 'raganything', label: 'RAG Anything', hint: 'RAG system' },
  { value: 'engram', label: 'Engram', hint: 'Agent memory' }
];

async function main() {
  intro(pc.inverse(' 🛠️  Wizard-AI Extra Tools Installer '));

  const mode = await select({
    message: 'Install additional AI tools & MCP servers?',
    options: [
      { value: 'select', label: '📦 Select tools to install' },
      { value: 'all', label: '🚀 Install All' },
      { value: 'skip', label: '⏭️  Skip', hint: 'do not install extra tools' }
    ]
  });

  if (isCancel(mode)) process.exit(1);

  let selected = [];
  if (mode === 'all') {
    selected = EXTRA_TOOLS.map(t => t.value);
  } else if (mode === 'select') {
    const res = await multiselect({
      message: 'Select tools to install:',
      options: EXTRA_TOOLS,
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
