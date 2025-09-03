// VC002_TokenHarness.js
module.exports = function mintBadge(contributor, ritualId) {
  return {
    badgeId: `VC002-${ritualId}`,
    steward: contributor,
    mintedAt: new Date().toISOString(),
    glyph: "🪙",
    metadata: {
      ritual: `Codex Update ${ritualId}`,
      archive: "VC001-Sovereign-Token",
    },
  };
};

// {"badgeId":"VC002-precommit-1756873129721","steward":"runner","mintedAt":"2025-09-03T04:18:49.722Z","glyph":"🪙","metadata":{"ritual":"Codex Update precommit-1756873129721","archive":"VC001-Sovereign-Token"}}
