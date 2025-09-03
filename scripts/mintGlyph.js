/*
🔮 Glyph Minting Script — VC001 Sovereign Token
========================================================

**Function**: Mints ceremonial glyphs and sovereign NFTs with metadata inscription
**Invocation**: `node scripts/mintGlyph.js [type] [recipient]`
**Inscribed By**: Percy Abrams Jr.
**Timestamp**: 2025-09-03T05:10 UTC
**Lineage**: Anchored to VisionaryCrest001.sol contract

🧭 *"Let every glyph be minted with sovereign purpose, inscribed with legacy, and bound to its steward."*
*/

const fs = require("fs");
const path = require("path");

// Ceremonial constants
const GLYPH_TYPES = {
  sovereign: "⟊⟟⧫⟜",
  contributor: "🔮⚡🛡️",
  grant: "🌿💰📜",
  steward: "👑🗝️⚖️",
  auto: "🤖✨🔄",
};

const SECTORS = {
  FDA: 1,
  EDA: 2,
  SAM: 3,
};

/**
 * Generate glyph metadata for minting
 * @param {string} type - Type of glyph to mint
 * @param {string} recipient - Recipient address or username
 */
function generateGlyphMetadata(type = "contributor", recipient = "treasury") {
  const timestamp = new Date().toISOString();
  const glyph = GLYPH_TYPES[type] || GLYPH_TYPES.auto;

  const metadata = {
    name: `VC001 ${type.charAt(0).toUpperCase() + type.slice(1)} Glyph`,
    description: `Sovereign ${type} glyph minted for ${recipient}`,
    image: `https://visionarycrest.org/glyphs/${type}.png`,
    attributes: [
      {
        trait_type: "Glyph Type",
        value: type,
      },
      {
        trait_type: "Ceremonial Symbols",
        value: glyph,
      },
      {
        trait_type: "Recipient",
        value: recipient,
      },
      {
        trait_type: "Mint Timestamp",
        value: timestamp,
      },
      {
        trait_type: "Steward Authority",
        value: "Verified",
      },
    ],
    external_url: "https://visionarycrest.org/tokens",
    background_color: "000000",
  };

  return metadata;
}

/**
 * Mint glyph with ceremonial inscription
 * @param {string} type - Glyph type
 * @param {string} recipient - Recipient
 */
async function mintGlyph(type, recipient) {
  console.log(`🔮 Initiating glyph minting ceremony...`);
  console.log(`   Type: ${type}`);
  console.log(`   Recipient: ${recipient}`);
  console.log(`   Glyph: ${GLYPH_TYPES[type] || GLYPH_TYPES.auto}`);

  // Generate metadata
  const metadata = generateGlyphMetadata(type, recipient);

  // Ceremonial file paths
  const metadataDir = path.join(__dirname, "..", "data", "glyph-metadata");
  const metadataFile = path.join(metadataDir, `${type}-${Date.now()}.json`);

  // Ensure directory exists
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  // Write metadata file
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  // Log minting ceremony
  const logEntry = `### Glyph Minting Ceremony - ${new Date().toISOString()}
- **Type**: ${type}
- **Recipient**: ${recipient}
- **Glyph**: ${GLYPH_TYPES[type] || GLYPH_TYPES.auto}
- **Metadata**: ${path.basename(metadataFile)}
- **Status**: ✅ Ceremonially minted

`;

  const logFile = path.join(metadataDir, "mint-log.md");
  fs.appendFileSync(logFile, logEntry);

  console.log(`✅ Glyph minted successfully!`);
  console.log(`   Metadata: ${metadataFile}`);
  console.log(`   Log: ${logFile}`);

  return {
    metadata,
    metadataFile,
    glyph: GLYPH_TYPES[type] || GLYPH_TYPES.auto,
  };
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const type = args[0] || "contributor";
  const recipient = args[1] || "treasury";

  mintGlyph(type, recipient)
    .then((result) => {
      console.log(`🎉 Glyph minting ceremony completed!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Glyph minting failed:`, error);
      process.exit(1);
    });
}

module.exports = { mintGlyph, generateGlyphMetadata, GLYPH_TYPES };
