const fs = require("fs");
const ascensionData = require("../data/ascension-log.json");

console.log("📜 Generating contributor timeline...");

// Handle both object and array formats
const ascensionLog = Array.isArray(ascensionData) ? ascensionData : [ascensionData];

const timeline = ascensionLog.map(entry => ({
  contributor: entry.contributor,
  badge: entry.badge,
  timestamp: entry.timestamp,
  proposal: entry.proposalId,
}));

fs.writeFileSync("./docs/logs/VC_Timeline.json", JSON.stringify(timeline, null, 2));
console.log("✅ Timeline written to VC_Timeline.json");
