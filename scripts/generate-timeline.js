const fs = require('fs');
const ascensionLog = require('../data/ascension-log.json');

console.log('📜 Generating contributor timeline...');

const timeline = ascensionLog.map(entry => ({
  contributor: entry.contributor,
  badge: entry.badge,
  timestamp: entry.timestamp,
  proposal: entry.proposalId
}));

fs.writeFileSync('./docs/logs/VC_Timeline.json', JSON.stringify(timeline, null, 2));
console.log('✅ Timeline written to VC_Timeline.json');
