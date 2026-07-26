#!/usr/bin/env node

/**
 * Wizard-AI Wiki & Knowledge Graph Web GUI Launcher
 * Launches interactive D3.js / Mermaid graph visualizer and opens in browser.
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

const CWD = process.cwd();
const GRAPH_DIR = path.join(CWD, 'graphify-out');
const GRAPH_FILE = path.join(GRAPH_DIR, 'graph.json');
const HTML_FILE = path.join(GRAPH_DIR, 'GRAPH_TREE.html');

function openBrowser(url) {
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  try {
    execSync(`${start} "${url}"`, { stdio: 'ignore' });
  } catch (e) {
    console.log(`🔗 Open in browser: ${url}`);
  }
}

function ensureGraphTree() {
  if (!fs.existsSync(GRAPH_FILE)) {
    console.log('🔄 Indexing codebase graph with Graphify...');
    try {
      execSync('graphify . --code-only', { stdio: 'inherit' });
    } catch (e) {
      console.log('⚠️ Graphify indexing skipped or failed.');
    }
  }

  console.log('📊 Generating D3.js interactive graph tree...');
  try {
    execSync('graphify tree', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️ Could not generate D3 graph tree.');
  }
}

function startWebServer(port = 8080) {
  if (!fs.existsSync(HTML_FILE)) {
    ensureGraphTree();
  }

  const server = http.createServer((req, res) => {
    let filePath = path.join(GRAPH_DIR, req.url === '/' ? 'GRAPH_TREE.html' : req.url);
    if (!fs.existsSync(filePath)) {
      filePath = HTML_FILE;
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(`Error loading ${req.url}`);
      } else {
        const ext = path.extname(filePath);
        const contentType = ext === '.html' ? 'text/html' : ext === '.json' ? 'application/json' : 'text/plain';
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  });

  server.listen(port, '127.0.0.1', () => {
    const url = `http://127.0.0.1:${port}`;
    console.log(`\n======================================================`);
    console.log(`🌐 Wizard-AI Wiki & Knowledge Graph Web Server`);
    console.log(`======================================================`);
    console.log(`✅ Running at: ${url}`);
    console.log(`Press Ctrl+C to stop.\n`);
    openBrowser(url);
  });
}

function showStatus() {
  console.log('\n======================================================');
  console.log('🧠 Wizard-AI Knowledge Graph & Memory Status');
  console.log('======================================================\n');
  if (fs.existsSync(GRAPH_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(GRAPH_FILE, 'utf8'));
      console.log(`  Project Nodes : ${data.nodes ? data.nodes.length : 0}`);
      console.log(`  Graph Edges   : ${data.links ? data.links.length : 0}`);
      console.log(`  Graph Path    : ${GRAPH_FILE}`);
    } catch (e) {}
  } else {
    console.log('  ⚠️ No graph found in graphify-out/. Run "wz-ai wiki update" to build.');
  }
  console.log('');
}

const args = process.argv.slice(2);
const command = args[0] || 'server';

switch (command) {
  case 'server':
  case 'ui':
  case 'start':
    startWebServer(parseInt(args[1] || '8080', 10));
    break;
  case 'status':
    showStatus();
    break;
  case 'update':
  case 'build':
    ensureGraphTree();
    console.log('✅ Knowledge graph updated.');
    break;
  default:
    console.log('Usage: wz-ai wiki [server|ui|status|update]');
    break;
}
