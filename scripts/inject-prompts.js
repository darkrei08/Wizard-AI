const fs = require('fs');
const path = require('path');
const dir = 'workflows';
fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace only the standard prompt( calls to inject the mandatory instruction
  content = content.replace(/prompt\(['"`]/g, match => match + '[MANDATORY: Adhere to GEMINI.md global rules and utilize appropriate master skills (e.g. engineering-excellence, loop skills)] ');
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
