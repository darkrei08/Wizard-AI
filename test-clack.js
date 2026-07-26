const { intro, select, multiselect, outro } = require('@clack/prompts');
async function run() {
  intro('Wizard-AI Installer');
  const mode = await select({
    message: 'Select installation mode:',
    options: [
      { value: 'all', label: '🚀 Install Everything (Recommended)' },
      { value: 'category', label: '📦 Select by Category' },
      { value: 'individual', label: '🔧 Cherry-Pick Individual Skills' },
      { value: 'skip', label: '⏭️  Skip (install only core tools)' }
    ]
  });
  console.log(mode);
}
run();
