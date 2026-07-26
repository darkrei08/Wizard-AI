const fs = require('fs');
const path = require('path');
const { runSelect } = require('./tui.js');

const outFile = process.argv[2];
const registryPath = path.join(__dirname, 'repo-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

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
    'Wizard-AI Core Installer\n\nMenu',
    [
      { value: 'all', label: 'Install Everything (Recommended)' },
      { value: 'category', label: 'Select by Category' },
      { value: 'individual', label: 'Cherry-Pick Individual Skills' },
      { value: 'skip', label: 'Skip (install only core tools)' }
    ],
    false,
    WIZARD_ASCII
  );

  if (!mode) process.exit(1);

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
      label: `${cv.name} (${cv.repos.length} repos)`
    }));

    const selectedCats = await runSelect(
      'Select categories to install:',
      catOptions,
      true,
      WIZARD_ASCII
    );

    if (!selectedCats) process.exit(1);

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
          label: rp.name
        });
      });
    }

    const selectedSkills = await runSelect(
      'Select individual skills to install:',
      skillOptions,
      true,
      WIZARD_ASCII
    );

    if (!selectedSkills) process.exit(1);

    for (const val of selectedSkills) {
      const [ck, repoName] = val.split('|');
      const cv = registry.categories[ck];
      const rp = cv.repos.find(r => r.name === repoName);
      if (rp) {
        selectedLines.push([ck, cv.name, cv.badge, rp.name, rp.url, rp.desc].join('|'));
      }
    }
  } else if (mode === 'skip') {
    console.log('\n\x1b[33m⏭️  Skipping skill installation.\x1b[0m');
    if (outFile) fs.writeFileSync(outFile, '');
    process.exit(0);
  }

  if (selectedLines.length > 0) {
    console.log(`\n\x1b[32mProceeding with installation of ${selectedLines.length} repositories...\x1b[0m`);
    if (outFile) {
      fs.writeFileSync(outFile, selectedLines.join('\n') + '\n');
    }
  } else {
    console.log('\n\x1b[33mNo repositories selected.\x1b[0m');
    if (outFile) fs.writeFileSync(outFile, '');
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
