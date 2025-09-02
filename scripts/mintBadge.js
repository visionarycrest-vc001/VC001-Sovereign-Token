const fs = require('fs');
const badgePath = 'VC002_TokenHarness.js';
const contributor = process.env.USER || process.env.USERNAME || 'unknown';
const ritualId = `precommit-${Date.now()}`;

const mintBadge = require('../VC002_TokenHarness.js');
const badge = mintBadge(contributor, ritualId);

fs.appendFileSync(badgePath, `\n// ${JSON.stringify(badge)}\n`);
console.log(`🏅 Badge minted`);
