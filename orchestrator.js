// orchestrator.js
// 🧬 Sovereign Orchestrator — Coordinates module execution and lineage inscription

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const modules = [
  'nft-pricing.js',
  'burn-logic.js',
  'grant-tracker.js',
  'sovereignBatch.js',
  'scroll-inscribe.js'
];

const logPath = path.join(__dirname, 'VC_OrchestrationLog.md');
const timestamp = new Date().toISOString();

function inscribeLog(entry) {
  const logEntry = `\n## ${timestamp}\n${entry}\n`;
  fs.appendFileSync(logPath, logEntry);
}

function runModule(module) {
  exec(`node ${module}`, (err, stdout, stderr) => {
    if (err) {
      inscribeLog(`❌ ${module} failed\nError: ${stderr}`);
    } else {
      inscribeLog(`✅ ${module} executed\nOutput:\n${stdout}`);
    }
  });
}

modules.forEach(runModule);
