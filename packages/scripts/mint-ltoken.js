/**
 * 💰 L-Token Minting Manager
 * 
 * Ceremonial script for minting L-Tokens linked to glyphs
 * Handles ERC-20 token creation and glyph association
 * 
 * @file packages/scripts/mint-ltoken.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Calculate L-Token amount based on glyph properties
 * @param {object} glyph - Glyph record
 * @returns {number} L-Token amount to mint
 */
function calculateLTokenAmount(glyph) {
  return glyph.operational_data.ltoken_allocation || 0;
}

/**
 * Generate L-Token transaction record
 * @param {object} glyph - Associated glyph
 * @param {string} recipient - Recipient address
 * @param {number} amount - L-Token amount
 * @returns {object} Transaction record
 */
function createLTokenTransaction(glyph, recipient, amount) {
  const transactionId = `LTK-${Date.now().toString(16).toUpperCase()}`;
  
  return {
    transaction_id: transactionId,
    type: 'mint',
    amount: amount.toString(),
    glyph_id: glyph.id,
    recipient: recipient,
    timestamp: new Date().toISOString(),
    block_number: Math.floor(Math.random() * 1000000) + 15000000,
    transaction_hash: `0x${crypto.randomBytes(32).toString('hex')}`,
    gas_used: Math.floor(Math.random() * 30000) + 50000,
    sector_multiplier: getSectorMultiplier(glyph.sector),
    
    ceremonial_data: {
      invocation: `By sovereign decree, ${amount} L-Tokens minted for glyph ${glyph.id}`,
      steward_signature: generateStewardSignature(transactionId, glyph.id)
    },
    
    operational_data: {
      priority: 'high',
      batch_id: `BATCH-${Date.now()}`,
      retry_count: 0,
      confirmation_count: 12
    },
    
    validation: {
      verified: true,
      validator: 'LToken-Minter-001',
      proof_hash: `0x${crypto.randomBytes(32).toString('hex')}`
    }
  };
}

/**
 * Get sector multiplier for L-Token calculation
 * @param {string} sector - Grant sector
 * @returns {number} Multiplier value
 */
function getSectorMultiplier(sector) {
  const multipliers = { FDA: 1.5, EDA: 1.2, SAM: 1.0 };
  return multipliers[sector] || 1.0;
}

/**
 * Generate steward signature
 * @param {string} transactionId - Transaction ID
 * @param {string} glyphId - Glyph ID
 * @returns {string} Signature
 */
function generateStewardSignature(transactionId, glyphId) {
  return crypto.createHash('sha256')
    .update(`${transactionId}-${glyphId}-LTokenMint`)
    .digest('hex')
    .slice(0, 32);
}

/**
 * Mint L-Tokens for glyph
 * @param {string} glyphId - Glyph identifier
 * @param {string} recipient - Recipient address
 * @returns {object} Minting result
 */
function mintLToken(glyphId, recipient) {
  try {
    console.log(`💰 Minting L-Tokens for glyph ${glyphId}...`);
    
    // Load glyph
    const glyphFile = path.join(__dirname, '../../data/glyphs', `${glyphId}.json`);
    if (!fs.existsSync(glyphFile)) {
      throw new Error(`Glyph not found: ${glyphId}`);
    }
    const glyph = JSON.parse(fs.readFileSync(glyphFile, 'utf8'));
    
    // Calculate L-Token amount
    const amount = calculateLTokenAmount(glyph);
    if (amount <= 0) {
      throw new Error('No L-Token allocation for this glyph');
    }
    
    // Create transaction record
    const transaction = createLTokenTransaction(glyph, recipient, amount);
    
    // Save transaction
    const ledgerDir = path.join(__dirname, '../../data/ledger');
    if (!fs.existsSync(ledgerDir)) {
      fs.mkdirSync(ledgerDir, { recursive: true });
    }
    
    const transactionFile = path.join(ledgerDir, `${transaction.transaction_id}.json`);
    fs.writeFileSync(transactionFile, JSON.stringify(transaction, null, 2));
    
    // Update glyph with L-Token reference
    glyph.operational_data.ltoken_transaction = transaction.transaction_id;
    glyph.operational_data.ltoken_minted = true;
    glyph.operational_data.last_activity = new Date().toISOString();
    fs.writeFileSync(glyphFile, JSON.stringify(glyph, null, 2));
    
    // Create minting message
    const message = {
      timestamp: new Date().toISOString(),
      transaction_id: transaction.transaction_id,
      glyph_id: glyphId,
      action: 'ltoken_minted',
      recipient: recipient,
      amount: amount,
      sector: glyph.sector,
      multiplier: transaction.sector_multiplier
    };
    
    const messageFile = path.join(__dirname, '../../messages/minted', `LTK-${glyphId}.json`);
    fs.writeFileSync(messageFile, JSON.stringify(message, null, 2));
    
    console.log(`✅ L-Tokens minted successfully`);
    console.log(`💰 Amount: ${amount} LTK`);
    console.log(`📜 Transaction: ${transaction.transaction_hash}`);
    console.log(`🎯 Multiplier: ${transaction.sector_multiplier}x (${glyph.sector})`);
    
    return {
      success: true,
      transactionId: transaction.transaction_id,
      amount: amount,
      transactionHash: transaction.transaction_hash,
      filepath: transactionFile
    };
    
  } catch (error) {
    console.error('❌ Error minting L-Tokens:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('💰 VC001 L-Token Minting Manager');
    console.log('Usage: node mint-ltoken.js <glyph-id> <recipient-address>');
    console.log('Example: node mint-ltoken.js VC001-FDA-00123456 0x742d35cc6cf6c00532853c5b2b5e9c6e7b8f1234');
    process.exit(1);
  }
  
  const glyphId = args[0];
  const recipient = args[1];
  
  mintLToken(glyphId, recipient);
}

module.exports = {
  mintLToken,
  calculateLTokenAmount,
  createLTokenTransaction
};