// scheduler.js
// Orchestrates autonomous execution of sovereign modules

const cron = require("node-cron");
const { exec } = require("child_process");
const fs = require("fs");

const MODULES = [
  "nft-pricing.js",
  "burn-logic.js",
  "grant-tracker.js",
  "sovereignBatch.js",
  "scroll-inscribe.js",
];

function runModule(module) {
  exec(`node ${module}`, (err, stdout, stderr) => {
    const timestamp = new Date().toISOString();
    const logEntry = `## ${timestamp}\n**Module:** ${module}\n**Output:**\n${stdout || stderr}\n\n`;
    fs.appendFileSync("docs/logs/vc-autonomy-log.md", logEntry);
    console.log(`⏱️ ${module} executed.`);
  });
}

// Run every hour
cron.schedule("0 * * * *", () => {
  console.log("🔁 Autonomous cycle started.");
  MODULES.forEach(runModule);
});
