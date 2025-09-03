// orchestrator.js
// 🧬 Sovereign Orchestrator — Coordinates module execution and lineage inscription

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const modules = [
  "nft-pricing.js",
  "burn-logic.js",
  "grant-tracker.js",
  "sovereignBatch.js",
  "scroll-inscribe.js",
];

const logPath = path.join(__dirname, "VC_OrchestrationLog.md");
const timestamp = new Date().toISOString();

function inscribeLog(entry) {
  const logEntry = `\n## ${timestamp}\n${entry}\n`;
  fs.appendFileSync(logPath, logEntry);
}

function runModule(module, attempt = 1) {
  exec(`node ${module}`, (err, stdout, stderr) => {
    if (err) {
      inscribeLog(`❌ ${module} failed on attempt ${attempt}\nError: ${stderr}`);
      if (attempt < 3) {
        setTimeout(() => runModule(module, attempt + 1), 3000); // Retry after 3 seconds
      } else {
        inscribeLog(`⚠️ ${module} failed after 3 attempts — fallback protocol triggered`);
      }
    } else {
      inscribeLog(`✅ ${module} executed on attempt ${attempt}\nOutput:\n${stdout}`);
    }
  });
}


modules.forEach(runModule);
