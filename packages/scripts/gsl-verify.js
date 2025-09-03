/**
 * ✅ GSL Message Verification Utility
 * 
 * Ceremonial script for verifying GSL (Grant Sovereign Language) message signatures
 * Validates message authenticity and integrity
 * 
 * @file packages/scripts/gsl-verify.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const crypto = require('crypto');
const fs = require('fs');

/**
 * Verify GSL message signature
 * @param {object} signedMessage - Message with GSL signature
 * @returns {object} Verification result
 */
function verifyGSLMessage(signedMessage) {
  if (!signedMessage.gsl_signature) {
    return { valid: false, error: 'No GSL signature found' };
  }
  
  const { gsl_signature, ...originalMessage } = signedMessage;
  const { hash, signature, authority, timestamp } = gsl_signature;
  
  // Recreate hash
  const expectedHash = crypto.createHash('sha256')
    .update(JSON.stringify(originalMessage) + timestamp + authority)
    .digest('hex');
  
  // Recreate signature
  const expectedSignature = crypto.createHash('sha256')
    .update(`GSL-${expectedHash}-${authority}`)
    .digest('hex');
  
  const hashValid = hash === expectedHash;
  const signatureValid = signature === expectedSignature;
  
  return {
    valid: hashValid && signatureValid,
    hash_valid: hashValid,
    signature_valid: signatureValid,
    authority: authority,
    timestamp: timestamp,
    age_hours: Math.round((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60))
  };
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('✅ GSL Message Verifier');
    console.log('Usage: node gsl-verify.js <signed-message-file.json>');
    process.exit(1);
  }
  
  const messageFile = args[0];
  
  if (!fs.existsSync(messageFile)) {
    console.error(`❌ Message file not found: ${messageFile}`);
    process.exit(1);
  }
  
  try {
    const signedMessage = JSON.parse(fs.readFileSync(messageFile, 'utf8'));
    const verification = verifyGSLMessage(signedMessage);
    
    if (verification.valid) {
      console.log('✅ Message signature is valid');
      console.log(`🔐 Authority: ${verification.authority}`);
      console.log(`⏰ Age: ${verification.age_hours} hours`);
    } else {
      console.log('❌ Message signature is invalid');
      console.log(`🔍 Hash valid: ${verification.hash_valid}`);
      console.log(`🔐 Signature valid: ${verification.signature_valid}`);
    }
    
  } catch (error) {
    console.error('❌ Error verifying message:', error.message);
    process.exit(1);
  }
}

module.exports = { verifyGSLMessage };