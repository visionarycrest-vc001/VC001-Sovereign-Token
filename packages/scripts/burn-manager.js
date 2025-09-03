/**
 * 🔥 Burn Manager 
 * 
 * Ceremonial script for burning glyphs and L-Tokens
 * Handles lifecycle management and ceremonial destruction
 * 
 * @file packages/scripts/burn-manager.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Burn glyph with ceremonial reason
 * @param {string} glyphId - Glyph identifier
 * @param {string} reason - Burn reason
 * @param {string} authority - Burning authority
 * @returns {object} Burn result
 */
function burnGlyph(glyphId, reason, authority = 'System') {
  try {
    console.log(`🔥 Burning glyph ${glyphId}...`);
    
    const glyphFile = path.join(__dirname, '../../data/glyphs', `${glyphId}.json`);
    if (!fs.existsSync(glyphFile)) {
      throw new Error(`Glyph not found: ${glyphId}`);
    }
    
    const glyph = JSON.parse(fs.readFileSync(glyphFile, 'utf8'));
    
    if (glyph.operational_data.burn_status) {
      throw new Error('Glyph already burned');
    }
    
    // Update glyph burn status
    glyph.operational_data.burn_status = true;
    glyph.operational_data.burn_reason = reason;
    glyph.operational_data.burn_date = new Date().toISOString();
    glyph.operational_data.burn_authority = authority;
    glyph.operational_data.last_activity = new Date().toISOString();
    
    fs.writeFileSync(glyphFile, JSON.stringify(glyph, null, 2));
    
    // Create burn message
    const burnMessage = {
      timestamp: new Date().toISOString(),
      glyph_id: glyphId,
      action: 'glyph_burned',
      reason: reason,
      authority: authority,
      sector: glyph.sector
    };
    
    const messageFile = path.join(__dirname, '../../messages/burns', `${glyphId}.json`);
    fs.writeFileSync(messageFile, JSON.stringify(burnMessage, null, 2));
    
    console.log(`✅ Glyph ${glyphId} burned successfully`);
    console.log(`🔥 Reason: ${reason}`);
    
    return { success: true, glyphId, reason };
    
  } catch (error) {
    console.error('❌ Error burning glyph:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Burn L-Tokens ceremonially
 * @param {string} fromAddress - Address burning tokens
 * @param {number} amount - Amount to burn
 * @param {string} reason - Burn reason
 * @returns {object} Burn result
 */
function burnLToken(fromAddress, amount, reason) {
  try {
    console.log(`🔥 Burning ${amount} L-Tokens from ${fromAddress}...`);
    
    const burnRecord = {
      burn_id: `BURN-${Date.now().toString(16).toUpperCase()}`,
      type: 'burn',
      amount: amount.toString(),
      from_address: fromAddress,
      timestamp: new Date().toISOString(),
      reason: reason,
      transaction_hash: `0x${require('crypto').randomBytes(32).toString('hex')}`,
      
      ceremonial_data: {
        invocation: `By sacred flame, ${amount} L-Tokens returned to the void`,
        witness: 'Burn Manager',
        blessing: 'May this sacrifice nurture future growth'
      }
    };
    
    const burnFile = path.join(__dirname, '../../data/ledger', `${burnRecord.burn_id}.json`);
    fs.writeFileSync(burnFile, JSON.stringify(burnRecord, null, 2));
    
    const messageFile = path.join(__dirname, '../../messages/burns', `${burnRecord.burn_id}.json`);
    fs.writeFileSync(messageFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      burn_id: burnRecord.burn_id,
      action: 'ltoken_burned',
      amount: amount,
      reason: reason
    }, null, 2));
    
    console.log(`✅ L-Tokens burned successfully`);
    console.log(`💰 Amount: ${amount} LTK`);
    
    return { success: true, burnId: burnRecord.burn_id, amount };
    
  } catch (error) {
    console.error('❌ Error burning L-Tokens:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('🔥 VC001 Burn Manager');
    console.log('Usage: node burn-manager.js glyph <glyph-id> <reason>');
    console.log('       node burn-manager.js ltoken <address> <amount> <reason>');
    process.exit(1);
  }
  
  const type = args[0];
  
  if (type === 'glyph') {
    burnGlyph(args[1], args[2] || 'Administrative burn');
  } else if (type === 'ltoken') {
    burnLToken(args[1], parseFloat(args[2]), args[3] || 'Ceremonial burn');
  } else {
    console.error('❌ Invalid burn type. Use "glyph" or "ltoken"');
    process.exit(1);
  }
}

module.exports = { burnGlyph, burnLToken };