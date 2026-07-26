const readline = require('readline');

function renderMenu(title, options, cursorIndex, selectedIndices, isMulti, headerAscii) {
  process.stdout.write('\x1Bc'); // clear screen
  
  if (headerAscii) {
    console.log(headerAscii + '\n');
  }
  
  if (title) {
    console.log(title + '\n');
  }
  
  options.forEach((opt, idx) => {
    const isHovered = idx === cursorIndex;
    const isSelected = selectedIndices.has(idx);
    
    let prefix = '  ';
    if (isHovered) {
      prefix = '▸ ';
    }
    
    let marker = '';
    if (isMulti) {
      marker = isSelected ? '[x] ' : '[ ] ';
    }
    
    if (isHovered) {
      console.log(`\x1b[35m${prefix}${marker}${opt.label}\x1b[0m`); // Magenta
    } else {
      console.log(`${prefix}${marker}${opt.label}`);
    }
  });
  
  console.log('\nj/k: navigate • enter: select • q: quit');
}

async function runSelect(title, options, isMulti = false, headerAscii = '') {
  return new Promise((resolve) => {
    let cursorIndex = 0;
    const selectedIndices = new Set();
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) process.stdin.setRawMode(true);
    
    const cleanup = (result) => {
      if (process.stdin.isTTY) process.stdin.setRawMode(false);
      rl.close();
      console.clear();
      resolve(result);
    };

    renderMenu(title, options, cursorIndex, selectedIndices, isMulti, headerAscii);

    const onKeypress = (str, key) => {
      if (key.name === 'q' || (key.ctrl && key.name === 'c')) {
        process.stdin.removeListener('keypress', onKeypress);
        cleanup(null);
        return;
      }
      
      if (key.name === 'up' || key.name === 'k') {
        cursorIndex = (cursorIndex > 0) ? cursorIndex - 1 : options.length - 1;
      } else if (key.name === 'down' || key.name === 'j') {
        cursorIndex = (cursorIndex < options.length - 1) ? cursorIndex + 1 : 0;
      } else if (key.name === 'space' && isMulti) {
        if (selectedIndices.has(cursorIndex)) {
          selectedIndices.delete(cursorIndex);
        } else {
          selectedIndices.add(cursorIndex);
        }
      } else if (key.name === 'return') {
        process.stdin.removeListener('keypress', onKeypress);
        if (isMulti) {
          const res = Array.from(selectedIndices).map(i => options[i].value);
          cleanup(res);
        } else {
          cleanup(options[cursorIndex].value);
        }
        return;
      }
      
      renderMenu(title, options, cursorIndex, selectedIndices, isMulti, headerAscii);
    };
    
    process.stdin.on('keypress', onKeypress);
  });
}

module.exports = { runSelect };
