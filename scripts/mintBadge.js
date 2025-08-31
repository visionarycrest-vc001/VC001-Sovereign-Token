const fs = require('fs');
const badgePath = 'VC002_TokenHarness.js';
const contributor = process.env.USER || 'unknown';
const ritualId = `precommit-${Date.now()}`;

const badge = {
  badgeId: `VC002-${ritualId}`,
  steward: contributor,
  mintedAt: new Date().toISOString(),
  glyph: '🪙',
  metadata: {
    ritual: 'Pre-commit Codex Sync',
    archive: 'VC001-Sovereign-Token'
  }
};

fs.appendFileSync(badgePath, `\n// ${JSON.stringify(badge)}\n`);
console.log(`🏅 Badge minted for ${contributor}`);
