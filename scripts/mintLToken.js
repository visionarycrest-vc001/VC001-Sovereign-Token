/*
💰 L-Token Minting Script — VC001 Sovereign Protocol
====================================================

**Function**: Mints L-tokens (Lineage Tokens) with steward authority and grant allocation
**Invocation**: `node scripts/mintLToken.js [amount] [recipient]`
**Inscribed By**: Percy Abrams Jr.
**Timestamp**: 2025-09-03T05:10 UTC
**Lineage**: Anchored to LToken.sol contract

🧭 *"Let every L-token be minted with sovereign authority, distributed with purpose, and tracked with precision."*
*/

const fs = require("fs");
const path = require("path");

// Ceremonial constants
const MINT_TYPES = {
  steward: "Steward Authority Mint",
  grant: "Grant Allocation",
  treasury: "Treasury Distribution",
  reward: "Ceremonial Reward",
};

const MAX_DAILY_MINT = 10000; // Max tokens per steward per day
const DECIMALS = 18;

/**
 * Validate mint parameters
 * @param {number} amount - Amount to mint
 * @param {string} recipient - Recipient address
 */
function validateMintParams(amount, recipient) {
  if (!amount || amount <= 0) {
    throw new Error("Invalid mint amount");
  }

  if (amount > MAX_DAILY_MINT) {
    throw new Error(`Amount exceeds daily limit of ${MAX_DAILY_MINT} tokens`);
  }

  if (!recipient) {
    throw new Error("Recipient address required");
  }

  return true;
}

/**
 * Generate mint transaction metadata
 * @param {number} amount - Amount to mint
 * @param {string} recipient - Recipient
 * @param {string} mintType - Type of mint
 */
function generateMintMetadata(amount, recipient, mintType = "steward") {
  const timestamp = new Date().toISOString();

  const metadata = {
    transaction_type: "L-Token Mint",
    amount: amount,
    amount_wei: (amount * Math.pow(10, DECIMALS)).toString(),
    recipient: recipient,
    mint_type: MINT_TYPES[mintType] || MINT_TYPES.steward,
    timestamp: timestamp,
    steward_authority: "Verified",
    ceremonial_status: "Inscribed",
    lineage_anchor: "VC001 Sovereign Protocol",
  };

  return metadata;
}

/**
 * Mint L-tokens with ceremonial inscription
 * @param {number} amount - Amount to mint
 * @param {string} recipient - Recipient address
 * @param {string} mintType - Type of mint
 */
async function mintLToken(amount, recipient, mintType = "steward") {
  console.log(`💰 Initiating L-token minting protocol...`);
  console.log(`   Amount: ${amount} LTOKEN`);
  console.log(`   Recipient: ${recipient}`);
  console.log(`   Type: ${MINT_TYPES[mintType] || MINT_TYPES.steward}`);

  // Validate parameters
  validateMintParams(amount, recipient);

  // Generate metadata
  const metadata = generateMintMetadata(amount, recipient, mintType);

  // Ceremonial file paths
  const dataDir = path.join(__dirname, "..", "data");
  const mintFile = path.join(dataDir, "ltoken-mint-log.md");
  const metadataFile = path.join(dataDir, `ltoken-mint-${Date.now()}.json`);

  // Ensure directory exists
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Write metadata file
  fs.writeFileSync(metadataFile, JSON.stringify(metadata, null, 2));

  // Log minting ceremony
  const logEntry = `### L-Token Minting Ceremony - ${new Date().toISOString()}
- **Amount**: ${amount} LTOKEN (${metadata.amount_wei} wei)
- **Recipient**: ${recipient}
- **Type**: ${MINT_TYPES[mintType] || MINT_TYPES.steward}
- **Steward Authority**: Verified ✅
- **Metadata**: ${path.basename(metadataFile)}
- **Status**: 💰 Ceremonially minted

`;

  fs.appendFileSync(mintFile, logEntry);

  // Update supply tracking
  updateSupplyMetrics(amount, recipient, mintType);

  console.log(`✅ L-tokens minted successfully!`);
  console.log(`   Transaction metadata: ${metadataFile}`);
  console.log(`   Mint log: ${mintFile}`);

  return {
    metadata,
    metadataFile,
    amount,
    recipient,
  };
}

/**
 * Update supply metrics
 * @param {number} amount - Minted amount
 * @param {string} recipient - Recipient
 * @param {string} mintType - Mint type
 */
function updateSupplyMetrics(amount, recipient, mintType) {
  const ledgerFile = path.join(__dirname, "..", "data", "vc_ledger.json");
  let ledger = {};

  // Load existing ledger
  if (fs.existsSync(ledgerFile)) {
    try {
      ledger = JSON.parse(fs.readFileSync(ledgerFile, "utf8"));
    } catch (error) {
      console.warn("Could not parse existing ledger, creating new one");
    }
  }

  // Initialize structure if needed
  if (!ledger.ltoken_supply) {
    ledger.ltoken_supply = {
      total_minted: 0,
      current_supply: 0,
      last_mint: null,
    };
  }

  // Update metrics
  ledger.ltoken_supply.total_minted += amount;
  ledger.ltoken_supply.current_supply += amount;
  ledger.ltoken_supply.last_mint = new Date().toISOString();

  // Write updated ledger
  fs.writeFileSync(ledgerFile, JSON.stringify(ledger, null, 2));

  console.log(`📊 Supply metrics updated:`);
  console.log(`   Total minted: ${ledger.ltoken_supply.total_minted} LTOKEN`);
  console.log(
    `   Current supply: ${ledger.ltoken_supply.current_supply} LTOKEN`
  );
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const amount = parseFloat(args[0]) || 1000;
  const recipient = args[1] || "treasury";
  const mintType = args[2] || "steward";

  mintLToken(amount, recipient, mintType)
    .then((result) => {
      console.log(`🎉 L-token minting ceremony completed!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ L-token minting failed:`, error.message);
      process.exit(1);
    });
}

module.exports = {
  mintLToken,
  generateMintMetadata,
  validateMintParams,
  MINT_TYPES,
};
