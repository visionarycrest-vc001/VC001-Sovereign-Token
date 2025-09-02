const fs = require("fs");
const ascensionLog = require("../data/ascension-log.json");

console.log("📜 Generating contributor timeline...");

// Handle both single object and array formats
const entries = Array.isArray(ascensionLog) ? ascensionLog : [ascensionLog];

const timeline = entries.map(entry => ({
  contributor: entry.contributor,
  badge: entry.badge,
  timestamp: entry.timestamp,
  proposal: entry.proposalId,
}));

fs.writeFileSync("./docs/logs/vc-timeline.json", JSON.stringify(timeline, null, 2));
console.log("✅ Timeline written to vc-timeline.json");
