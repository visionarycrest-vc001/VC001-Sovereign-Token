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
