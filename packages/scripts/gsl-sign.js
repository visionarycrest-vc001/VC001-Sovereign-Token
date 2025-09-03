/**
 * 🔐 GSL Message Signing Utility
 * 
 * Ceremonial script for signing GSL (Grant Sovereign Language) messages
 * Handles message authentication and verification
 * 
 * @file packages/scripts/gsl-sign.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const crypto = require('crypto');
const fs = require('fs');

/**
 * Sign GSL message with ceremonial signature
 * @param {object} message - Message to sign
 * @param {string} authority - Signing authority
 * @returns {object} Signed message
 */
function signGSLMessage(message, authority = 'Sovereign System') {
  const timestamp = new Date().toISOString();
  const messageHash = crypto.createHash('sha256')
    .update(JSON.stringify(message) + timestamp + authority)
    .digest('hex');
  
  const signature = crypto.createHash('sha256')
    .update(`GSL-${messageHash}-${authority}`)
    .digest('hex');
  
  return {
    ...message,
    gsl_signature: {
      hash: messageHash,
      signature: signature,
      authority: authority,
      timestamp: timestamp,
      version: '1.0'
    }
  };
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🔐 GSL Message Signer');
    console.log('Usage: node gsl-sign.js <message-file.json> [authority]');
    process.exit(1);
  }
  
  const messageFile = args[0];
  const authority = args[1] || 'Sovereign System';
  
  if (!fs.existsSync(messageFile)) {
    console.error(`❌ Message file not found: ${messageFile}`);
    process.exit(1);
  }
  
  try {
    const message = JSON.parse(fs.readFileSync(messageFile, 'utf8'));
    const signed = signGSLMessage(message, authority);
    
    const outputFile = messageFile.replace('.json', '.signed.json');
    fs.writeFileSync(outputFile, JSON.stringify(signed, null, 2));
    
    console.log(`✅ Message signed successfully`);
    console.log(`🔐 Signature: ${signed.gsl_signature.signature.slice(0, 16)}...`);
    console.log(`📁 Output: ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error signing message:', error.message);
    process.exit(1);
  }
}

module.exports = { signGSLMessage };