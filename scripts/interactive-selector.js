const { intro, select, multiselect, outro, isCancel, note } = require('@clack/prompts');
const pc = require('picocolors');
const fs = require('fs');
const path = require('path');

const outFile = process.argv[2];
const registryPath = path.join(__dirname, 'repo-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

async function main() {
  intro(pc.inverse(' 🪄 Wizard-AI Interactive Installer '));

  const mode = await select({
    message: 'Select installation mode:',
    options: [
      { value: 'all', label: '🚀 Install Everything', hint: 'Recommended' },
      { value: 'category', label: '📦 Select by Category', hint: 'Agent Frameworks, CLI Tools, Prompt Skills, etc.' },
      { value: 'individual', label: '🔧 Cherry-Pick Individual Skills' },
      { value: 'skip', label: '⏭️  Skip', hint: 'install only core tools' }
    ]
  });

  if (isCancel(mode)) process.exit(1);

  let selectedLines = [];

  const addRepos = (repos, catKey, catName, badge) => {
    repos.forEach(rp => {
      selectedLines.push([catKey, catName, badge, rp.name, rp.url, rp.desc].join('|'));
    });
  };

  if (mode === 'all') {
    for (const [ck, cv] of Object.entries(registry.categories)) {
      addRepos(cv.repos, ck, cv.name, cv.badge);
    }
  } else if (mode === 'category') {
    const catOptions = Object.entries(registry.categories).map(([ck, cv]) => ({
      value: ck,
      label: `${cv.name} (${cv.repos.length} repos) ${cv.badge}`,
      hint: cv.description
    }));

    const selectedCats = await multiselect({
      message: 'Select categories to install:',
      options: catOptions,
      required: false
    });

    if (isCancel(selectedCats)) process.exit(1);

    for (const ck of selectedCats) {
      const cv = registry.categories[ck];
      addRepos(cv.repos, ck, cv.name, cv.badge);
    }
  } else if (mode === 'individual') {
    const skillOptions = [];
    for (const [ck, cv] of Object.entries(registry.categories)) {
      cv.repos.forEach(rp => {
        skillOptions.push({
          value: `${ck}|${rp.name}`,
          label: rp.name,
          hint: rp.desc
        });
      });
    }

    const selectedSkills = await multiselect({
      message: 'Select individual skills to install:',
      options: skillOptions,
      required: false
    });

    if (isCancel(selectedSkills)) process.exit(1);

    for (const val of selectedSkills) {
      const [ck, repoName] = val.split('|');
      const cv = registry.categories[ck];
      const rp = cv.repos.find(r => r.name === repoName);
      if (rp) {
        selectedLines.push([ck, cv.name, cv.badge, rp.name, rp.url, rp.desc].join('|'));
      }
    }
  } else if (mode === 'skip') {
    outro(pc.yellow('⏭️  Skipping skill & framework installation. Only core tools will be installed.'));
    if (outFile) fs.writeFileSync(outFile, '');
    process.exit(0);
  }

  if (selectedLines.length > 0) {
    note(`Selected ${selectedLines.length} repositories for installation.`, 'Selection Complete');
    outro(pc.green('Proceeding with installation...'));
    if (outFile) {
      fs.writeFileSync(outFile, selectedLines.join('\n') + '\n');
    }
  } else {
    outro(pc.yellow('No repositories selected.'));
    if (outFile) fs.writeFileSync(outFile, '');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
