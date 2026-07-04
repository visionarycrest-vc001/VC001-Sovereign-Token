/*
🔥 NFT Burn Script — VC001 Ceremonial Retirement
=================================================

**Function**: Ceremonially burns NFTs with lineage inscription and steward authority
**Invocation**: `node scripts/burnNFT.js [tokenId] [reason]`
**Inscribed By**: Percy Abrams Jr.
**Timestamp**: 2025-09-03T05:10 UTC
**Lineage**: Anchored to VisionaryCrest001.sol burn mechanics

🧭 *"Let every token be retired with ceremony, inscribed with purpose, and honored in lineage."*
*/

const fs = require("fs");
const path = require("path");

// Ceremonial burn reasons
const BURN_REASONS = {
  retirement: "Ceremonial retirement - token completed its purpose",
  upgrade: "Token upgraded to higher tier",
  consolidation: "Consolidated into sovereign collection",
  steward_request: "Steward-requested ceremonial burning",
  protocol_migration: "Protocol migration burn",
  ceremonial: "Ceremonial tribute burn",
};

/**
 * Validate burn parameters
 * @param {string} tokenId - Token ID to burn
 * @param {string} reason - Burn reason
 */
function validateBurnParams(tokenId, reason) {
  if (!tokenId || tokenId === "") {
    throw new Error("Token ID is required");
  }

  if (isNaN(parseInt(tokenId))) {
    throw new Error("Token ID must be a valid number");
  }

  if (!reason) {
    throw new Error("Burn reason is required");
  }

  return true;
}

/**
 * Generate burn ceremony metadata
 * @param {string} tokenId - Token ID
 * @param {string} reason - Burn reason
 * @param {string} steward - Burning steward
 */
function generateBurnMetadata(tokenId, reason, steward = "system") {
  const timestamp = new Date().toISOString();

  const metadata = {
    ceremony_type: "Token Burn",
    token_id: parseInt(tokenId),
    burn_reason: reason,
    ceremonial_reason: BURN_REASONS[reason] || reason,
    burning_steward: steward,
    timestamp: timestamp,
    block_timestamp: Math.floor(Date.now() / 1000),
    ceremonial_status: "Retired",
    lineage_inscription: `Token ${tokenId} ceremonially retired`,
    final_blessing: "⚱️ May this token rest in digital peace",
  };

  return metadata;
}

/**
 * Ceremonially burn NFT with full inscription
 * @param {string} tokenId - Token ID to burn
 * @param {string} reason - Reason for burning
 * @param {string} steward - Burning steward
 */
async function burnNFT(tokenId, reason = "ceremonial", steward = "system") {
  console.log(`🔥 Initiating token burn ceremony...`);
  console.log(`   Token ID: ${tokenId}`);
  console.log(`   Reason: ${BURN_REASONS[reason] || reason}`);
  console.log(`   Steward: ${steward}`);

  // Validate parameters
  validateBurnParams(tokenId, reason);

  // Generate burn metadata
  const metadata = generateBurnMetadata(tokenId, reason, steward);

  // Ceremonial file paths
  const dataDir = path.join(__dirname, "..", "data");
  const burnRegistryFile = path.join(dataDir, "burn-registry.md");
  const burnMetadataFile = path.join(
    dataDir,
    `burn-${tokenId}-${Date.now()}.json`
  );

  // Ensure directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write burn metadata
  fs.writeFileSync(burnMetadataFile, JSON.stringify(metadata, null, 2));

  // Inscribe burn ceremony to registry
  const ceremonyEntry = `### Token Burn Ceremony - ${new Date().toISOString()}
- **Token ID**: ${tokenId}
- **Burn Reason**: ${BURN_REASONS[reason] || reason}
- **Burning Steward**: ${steward}
- **Ceremonial Status**: ⚱️ Retired
- **Metadata**: ${path.basename(burnMetadataFile)}
- **Final Blessing**: May this token rest in digital peace

---

`;

  fs.appendFileSync(burnRegistryFile, ceremonyEntry);

  // Update burn statistics
  updateBurnStatistics(tokenId, reason);

  // Inscribe to lineage scrolls
  inscribeBurnLineage(tokenId, reason, steward);

  console.log(`✅ Token burn ceremony completed!`);
  console.log(`   Burn registry: ${burnRegistryFile}`);
  console.log(`   Metadata: ${burnMetadataFile}`);
  console.log(`   Status: ⚱️ Ceremonially retired`);

  return {
    metadata,
    burnMetadataFile,
    tokenId,
    reason,
  };
}

/**
 * Update burn statistics
 * @param {string} tokenId - Burned token ID
 * @param {string} reason - Burn reason
 */
function updateBurnStatistics(tokenId, reason) {
  const statsFile = path.join(__dirname, "..", "data", "burn-statistics.json");
  let stats = {
    total_burned: 0,
    burn_reasons: {},
    last_burn: null,
    burned_tokens: [],
  };

  // Load existing stats
  if (fs.existsSync(statsFile)) {
    try {
      stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));
    } catch (error) {
      console.warn("Could not parse burn statistics, creating new file");
    }
  }

  // Update statistics
  stats.total_burned += 1;
  stats.burn_reasons[reason] = (stats.burn_reasons[reason] || 0) + 1;
  stats.last_burn = new Date().toISOString();
  stats.burned_tokens.push({
    token_id: parseInt(tokenId),
    reason: reason,
    timestamp: new Date().toISOString(),
  });

  // Write updated stats
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

  console.log(`📊 Burn statistics updated:`);
  console.log(`   Total burned: ${stats.total_burned}`);
  console.log(`   Reason: ${reason} (${stats.burn_reasons[reason]} total)`);
}

/**
 * Inscribe burn to lineage scrolls
 * @param {string} tokenId - Token ID
 * @param {string} reason - Burn reason
 * @param {string} steward - Steward
 */
function inscribeBurnLineage(tokenId, reason, steward) {
  const lineageDir = path.join(__dirname, "..", "docs", "lineage");
  const burnLineageFile = path.join(lineageDir, "Burn_Lineage.md");

  // Ensure lineage directory exists
  if (!fs.existsSync(lineageDir)) {
    fs.mkdirSync(lineageDir, { recursive: true });
  }

  // Create burn lineage file if it doesn't exist
  if (!fs.existsSync(burnLineageFile)) {
    const header = `# 🔥 Burn Lineage Scroll

This scroll inscribes the ceremonial retirement of sovereign tokens, preserving their legacy and purpose in the eternal lineage.

---

`;
    fs.writeFileSync(burnLineageFile, header);
  }

  // Inscribe burn entry
  const lineageEntry = `## Token ${tokenId} Burn Ceremony
- **Date**: ${new Date().toISOString()}
- **Token ID**: ${tokenId}
- **Reason**: ${BURN_REASONS[reason] || reason}
- **Steward**: ${steward}
- **Legacy**: Token completed its sovereign purpose
- **Status**: ⚱️ Ceremonially retired and honored

`;

  fs.appendFileSync(burnLineageFile, lineageEntry);

  console.log(`📜 Burn inscribed to lineage: ${burnLineageFile}`);
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const tokenId = args[0];
  const reason = args[1] || "ceremonial";
  const steward = args[2] || "system";

  if (!tokenId) {
    console.error("❌ Token ID is required");
    console.log("Usage: node scripts/burnNFT.js <tokenId> [reason] [steward]");
    process.exit(1);
  }

  burnNFT(tokenId, reason, steward)
    .then((result) => {
      console.log(`🎉 Token burn ceremony completed with honor!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Token burn ceremony failed:`, error.message);
      process.exit(1);
    });
}

module.exports = {
  burnNFT,
  generateBurnMetadata,
  validateBurnParams,
  BURN_REASONS,
};
