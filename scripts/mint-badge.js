const fs = require('fs');
const badgePath = 'vc002-token-harness.js';
const contributor = process.env.USER || process.env.USERNAME || 'unknown';
const ritualId = `precommit-${Date.now()}`;

const mintBadge = require('../vc002-token-harness.js');
const badge = mintBadge(contributor, ritualId);

fs.appendFileSync(badgePath, `\n// ${JSON.stringify(badge)}\n`);
console.log(`🏅 Badge minted for ${contributor}`);
