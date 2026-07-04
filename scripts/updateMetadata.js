/*
🧬 Metadata Update Script — VC001 Sovereign Protocol
====================================================

**Function**: Updates NFT metadata with ceremonial precision and lineage preservation
**Invocation**: `node scripts/updateMetadata.js [tokenId] [updateType]`
**Inscribed By**: Percy Abrams Jr.
**Timestamp**: 2025-09-03T05:10 UTC
**Lineage**: Anchored to VisionaryCrest001.sol metadata system

🧭 *"Let every metadata update preserve lineage, enhance purpose, and maintain sovereign integrity."*
*/

const fs = require("fs");
const path = require("path");

// Update types
const UPDATE_TYPES = {
  metadata: "Full metadata refresh",
  image: "Image URI update",
  attributes: "Attribute enhancement",
  description: "Description revision",
  glyph: "Glyph symbol update",
  all: "Complete metadata overhaul",
};

// Ceremonial attributes for tokens
const CEREMONIAL_ATTRIBUTES = {
  steward_blessing: ["Blessed", "Sanctified", "Honored", "Revered"],
  lineage_status: ["Ancient", "Established", "Emerging", "Nascent"],
  sovereign_tier: ["Sovereign", "Noble", "Citizen", "Initiate"],
  ceremonial_power: ["Maximum", "High", "Moderate", "Developing"],
};

/**
 * Validate update parameters
 * @param {string} tokenId - Token ID to update
 * @param {string} updateType - Type of update
 */
function validateUpdateParams(tokenId, updateType) {
  if (!tokenId) {
    throw new Error('Token ID is required (use "all" for batch update)');
  }

  if (tokenId !== "all" && isNaN(parseInt(tokenId))) {
    throw new Error('Token ID must be a valid number or "all"');
  }

  if (!UPDATE_TYPES[updateType]) {
    throw new Error(
      `Invalid update type. Valid types: ${Object.keys(UPDATE_TYPES).join(", ")}`
    );
  }

  return true;
}

/**
 * Generate enhanced metadata for token
 * @param {string} tokenId - Token ID
 * @param {object} existingMetadata - Existing metadata
 * @param {string} updateType - Update type
 */
function generateEnhancedMetadata(
  tokenId,
  existingMetadata = {},
  updateType = "metadata"
) {
  const timestamp = new Date().toISOString();

  // Base metadata structure
  const metadata = {
    name: existingMetadata.name || `VC001 Sovereign Token #${tokenId}`,
    description:
      existingMetadata.description ||
      `Sovereign token representing lineage and purpose within the VC001 ecosystem.`,
    image:
      existingMetadata.image ||
      `https://visionarycrest.org/tokens/${tokenId}.png`,
    external_url:
      existingMetadata.external_url ||
      `https://visionarycrest.org/tokens/${tokenId}`,
    background_color: existingMetadata.background_color || "000000",
    animation_url: existingMetadata.animation_url || null,
    attributes: [],
    ...existingMetadata,
  };

  // Enhance attributes based on update type
  const attributes = [
    {
      trait_type: "Token ID",
      value: tokenId,
    },
    {
      trait_type: "Last Updated",
      value: timestamp,
    },
    {
      trait_type: "Update Type",
      value: UPDATE_TYPES[updateType],
    },
    {
      trait_type: "Metadata Version",
      value: "2.0",
    },
    {
      trait_type: "Steward Blessing",
      value: getRandomCeremonialAttribute("steward_blessing"),
    },
    {
      trait_type: "Lineage Status",
      value: getRandomCeremonialAttribute("lineage_status"),
    },
    {
      trait_type: "Sovereign Tier",
      value: getRandomCeremonialAttribute("sovereign_tier"),
    },
    {
      trait_type: "Ceremonial Power",
      value: getRandomCeremonialAttribute("ceremonial_power"),
    },
  ];

  // Preserve existing attributes and add new ones
  if (existingMetadata.attributes) {
    const existingTraits = existingMetadata.attributes.map(
      (attr) => attr.trait_type
    );
    attributes.forEach((newAttr) => {
      if (!existingTraits.includes(newAttr.trait_type)) {
        metadata.attributes.push(newAttr);
      }
    });
  } else {
    metadata.attributes = attributes;
  }

  return metadata;
}

/**
 * Get random ceremonial attribute
 * @param {string} category - Attribute category
 */
function getRandomCeremonialAttribute(category) {
  const options = CEREMONIAL_ATTRIBUTES[category] || ["Standard"];
  return options[Math.floor(Math.random() * options.length)];
}

/**
 * Update metadata for single token or batch
 * @param {string} tokenId - Token ID or "all"
 * @param {string} updateType - Type of update
 */
async function updateMetadata(tokenId, updateType = "metadata") {
  console.log(`🧬 Initiating metadata update ritual...`);
  console.log(`   Token ID: ${tokenId}`);
  console.log(`   Update Type: ${UPDATE_TYPES[updateType]}`);

  // Validate parameters
  validateUpdateParams(tokenId, updateType);

  // Setup paths
  const metadataDir = path.join(__dirname, "..", "data", "glyph-metadata");
  const updateLogFile = path.join(metadataDir, "update-log.md");

  // Ensure directory exists
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  let updatedTokens = [];

  if (tokenId === "all") {
    // Batch update all existing metadata files
    updatedTokens = await batchUpdateMetadata(metadataDir, updateType);
  } else {
    // Update single token
    const result = await updateSingleToken(tokenId, metadataDir, updateType);
    updatedTokens.push(result);
  }

  // Log update ceremony
  const logEntry = `### Metadata Update Ceremony - ${new Date().toISOString()}
- **Update Type**: ${UPDATE_TYPES[updateType]}
- **Tokens Updated**: ${updatedTokens.length}
- **Token IDs**: ${updatedTokens.map((t) => t.tokenId).join(", ")}
- **Status**: ✅ Ceremonially updated

#### Updated Files:
${updatedTokens.map((t) => `- ${t.filename}`).join("\n")}

---

`;

  fs.appendFileSync(updateLogFile, logEntry);

  console.log(`✅ Metadata update ceremony completed!`);
  console.log(`   Tokens updated: ${updatedTokens.length}`);
  console.log(`   Update log: ${updateLogFile}`);

  return {
    updatedTokens,
    updateType,
    logFile: updateLogFile,
  };
}

/**
 * Update metadata for single token
 * @param {string} tokenId - Token ID
 * @param {string} metadataDir - Metadata directory
 * @param {string} updateType - Update type
 */
async function updateSingleToken(tokenId, metadataDir, updateType) {
  const metadataFile = path.join(metadataDir, `token-${tokenId}.json`);
  let existingMetadata = {};

  // Load existing metadata if available
  if (fs.existsSync(metadataFile)) {
    try {
      existingMetadata = JSON.parse(fs.readFileSync(metadataFile, "utf8"));
    } catch (error) {
      console.warn(`Could not parse existing metadata for token ${tokenId}`);
    }
  }

  // Generate enhanced metadata
  const enhancedMetadata = generateEnhancedMetadata(
    tokenId,
    existingMetadata,
    updateType
  );

  // Write updated metadata
  fs.writeFileSync(metadataFile, JSON.stringify(enhancedMetadata, null, 2));

  console.log(`🔄 Updated token ${tokenId} metadata`);

  return {
    tokenId,
    filename: path.basename(metadataFile),
    metadata: enhancedMetadata,
  };
}

/**
 * Batch update all metadata files
 * @param {string} metadataDir - Metadata directory
 * @param {string} updateType - Update type
 */
async function batchUpdateMetadata(metadataDir, updateType) {
  const metadataFiles = fs
    .readdirSync(metadataDir)
    .filter((file) => file.startsWith("token-") && file.endsWith(".json"));

  const updatedTokens = [];

  for (const file of metadataFiles) {
    const tokenId = file.replace("token-", "").replace(".json", "");
    const result = await updateSingleToken(tokenId, metadataDir, updateType);
    updatedTokens.push(result);
  }

  console.log(`🔄 Batch updated ${updatedTokens.length} tokens`);

  return updatedTokens;
}

/**
 * Generate sample metadata for demonstration
 * @param {string} tokenId - Token ID
 */
function generateSampleMetadata(tokenId) {
  const sampleMetadata = {
    name: `VC001 Sovereign Token #${tokenId}`,
    description:
      "A sovereign token representing lineage and governance within the VC001 ecosystem.",
    image: `https://visionarycrest.org/tokens/${tokenId}.png`,
    attributes: [
      { trait_type: "Token Type", value: "Sovereign" },
      { trait_type: "Grant Sector", value: "FDA" },
      { trait_type: "Glyph", value: "⟊⟟⧫⟜" },
    ],
  };

  return generateEnhancedMetadata(tokenId, sampleMetadata, "metadata");
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const tokenId = args[0] || "all";
  const updateType = args[1] || "metadata";

  // Special command to generate sample metadata
  if (tokenId === "sample") {
    const sampleId = args[1] || "1";
    const sample = generateSampleMetadata(sampleId);
    console.log(JSON.stringify(sample, null, 2));
    process.exit(0);
  }

  updateMetadata(tokenId, updateType)
    .then((result) => {
      console.log(`🎉 Metadata update ceremony completed with precision!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Metadata update ceremony failed:`, error.message);
      process.exit(1);
    });
}

module.exports = {
  updateMetadata,
  generateEnhancedMetadata,
  validateUpdateParams,
  UPDATE_TYPES,
  generateSampleMetadata,
};
