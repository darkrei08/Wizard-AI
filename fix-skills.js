const fs = require('fs');
const path = require('path');

const SKILLS_DIR = path.join(__dirname, 'skills');

// Categories to remove and flatten
const CATEGORIES = [
  'architecture-and-design', 'backend-and-infra', 'devops-and-tools',
  'docs-and-coauthoring', 'frameworks-and-stacks', 'frontend',
  'frontend-and-ui', 'memory-and-context', 'memory-knowledge',
  'meta-skills', 'misc', 'stitch-design', 'workflows-and-orchestration'
];

function flattenSkills() {
  for (const category of CATEGORIES) {
    const catPath = path.join(SKILLS_DIR, category);
    if (!fs.existsSync(catPath)) continue;

    const skillsInCat = fs.readdirSync(catPath);
    for (const skill of skillsInCat) {
      const skillPath = path.join(catPath, skill);
      if (!fs.statSync(skillPath).isDirectory()) continue;

      const skillMdPath = path.join(skillPath, 'SKILL.md');
      const rootSkillPath = path.join(SKILLS_DIR, skill);
      const rootSkillMdPath = path.join(rootSkillPath, 'SKILL.md');

      let catSize = 0;
      let rootSize = 0;

      if (fs.existsSync(skillMdPath)) {
        catSize = fs.statSync(skillMdPath).size;
      }
      if (fs.existsSync(rootSkillMdPath)) {
        rootSize = fs.statSync(rootSkillMdPath).size;
      }

      if (catSize > 0) {
        if (!fs.existsSync(rootSkillPath)) {
          fs.mkdirSync(rootSkillPath, { recursive: true });
        }
        
        // If the category version is larger (or the root doesn't exist), move it to root
        if (catSize > rootSize) {
          console.log(`Overwriting ${skill} from ${category} (cat: ${catSize} bytes, root: ${rootSize} bytes)`);
          
          // Copy all files from cat to root
          const files = fs.readdirSync(skillPath);
          for (const f of files) {
             fs.cpSync(path.join(skillPath, f), path.join(rootSkillPath, f), { recursive: true });
          }
        } else {
          console.log(`Keeping root version of ${skill} (cat: ${catSize} bytes, root: ${rootSize} bytes)`);
        }
      }

      // Delete the category skill folder
      fs.rmSync(skillPath, { recursive: true, force: true });
    }
    
    // Delete the empty category folder
    fs.rmSync(catPath, { recursive: true, force: true });
    console.log(`Removed category folder: ${category}`);
  }
}

function removeEmptySkills() {
  const dirs = fs.readdirSync(SKILLS_DIR);
  for (const dir of dirs) {
    const dirPath = path.join(SKILLS_DIR, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      const skillMd = path.join(dirPath, 'SKILL.md');
      if (!fs.existsSync(skillMd)) {
        console.log(`Removing empty skill folder: ${dir}`);
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    }
  }
}

console.log('Flattening skills...');
flattenSkills();
console.log('Removing empty skill folders...');
removeEmptySkills();
console.log('Done.');
