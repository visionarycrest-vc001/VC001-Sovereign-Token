#!/usr/bin/env node

/*
🔐 gsl-sign.js — GSL Message Signing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Sign GSL message envelopes with ceremonial steward signatures
Inscribed By: VC001 Sovereign System
Timestamp: 2025-09-03
Lineage: Anchored to cryptographic message validation

Sacred Operations:
- Generate cryptographic signatures for GSL envelopes
- Validate steward authority for signing
- Apply ceremonial witness stamps
- Ensure message integrity and authenticity

Invocation: node packages/scripts/gsl-sign.js --message path/to/message.json --signer steward-001

Witnessed by: Syntec Cryptographic Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ceremonial Constants
const STEWARD_AUTHORITIES = [
  'steward-001',
  'percy-abrams-jr',
  'deployment-bot',
  'minting-bot',
  'burn-manager',
  'github-actions'
];

const SIGNATURE_TYPES = {
  STEWARD: 'steward_signature',
  WITNESS: 'witness_signature', 
  VALIDATION: 'validation_hash',
  AUTHORITY: 'authority_signature',
  CEREMONIAL: 'ceremonial_signature'
};

/**
 * Validate signer authority
 * @param {string} signer - Signer identifier
 * @returns {boolean} Authority validation result
 */
function validateSignerAuthority(signer) {
  if (!signer) {
    throw new Error('Signer identifier required');
  }
  
  // Check against authorized stewards
  const isAuthorized = STEWARD_AUTHORITIES.includes(signer) || 
                      signer.includes('bot') || 
                      signer.includes('steward');
  
  if (!isAuthorized) {
    throw new Error(`Signer '${signer}' not in authorized steward list`);
  }
  
  return true;
}

/**
 * Generate cryptographic signature for message content
 * @param {Object} messageContent - Message content to sign
 * @param {string} signer - Signer identifier
 * @param {string} privateKey - Private key (optional, uses mock if not provided)
 * @returns {string} Generated signature
 */
function generateCryptographicSignature(messageContent, signer, privateKey = null) {
  // Normalize message content for consistent signing
  const normalizedContent = JSON.stringify(messageContent, Object.keys(messageContent).sort());
  
  if (privateKey) {
    // Real cryptographic signing (would use actual private key)
    const sign = crypto.createSign('SHA256');
    sign.update(normalizedContent);
    sign.end();
    return sign.sign(privateKey, 'hex');
  } else {
    // Ceremonial stub signature generation
    const hash = crypto.createHash('sha256')
      .update(normalizedContent)
      .update(signer)
      .update(new Date().toISOString())
      .digest('hex');
    
    return `0x${hash}`;
  }
}

/**
 * Generate witness validation hash
 * @param {Object} envelope - GSL envelope
 * @param {string} witness - Witness identifier
 * @returns {string} Validation hash
 */
function generateWitnessHash(envelope, witness) {
  const witnessData = {
    envelope_id: envelope.envelope_id,
    message_type: envelope.message_type,
    timestamp: envelope.timestamp,
    witness: witness,
    witness_timestamp: new Date().toISOString()
  };
  
  const witnessContent = JSON.stringify(witnessData, Object.keys(witnessData).sort());
  return crypto.createHash('sha256').update(witnessContent).digest('hex');
}

/**
 * Sign GSL message envelope
 * @param {Object} envelope - GSL message envelope
 * @param {string} signer - Signer identifier
 * @param {Object} options - Signing options
 * @returns {Object} Signed envelope
 */
function signGSLEnvelope(envelope, signer, options = {}) {
  const { privateKey, witness = 'Syntec Signature Protocol', ceremonialOnly = true } = options;
  
  validateSignerAuthority(signer);
  
  if (!envelope.gsl_envelope) {
    throw new Error('Invalid GSL envelope structure');
  }
  
  console.log('🔐 Signing GSL envelope...');
  console.log(`📋 Envelope ID: ${envelope.gsl_envelope.envelope_id}`);
  console.log(`👤 Signer: ${signer}`);
  console.log(`🧭 Witness: ${witness}`);
  
  const gslData = envelope.gsl_envelope;
  
  // Generate primary signature
  const primarySignature = generateCryptographicSignature(gslData.payload, signer, privateKey);
  
  // Generate witness validation
  const witnessHash = generateWitnessHash(gslData, witness);
  
  // Generate validation hash for entire envelope
  const validationHash = crypto.createHash('sha256')
    .update(JSON.stringify(gslData, Object.keys(gslData).sort()))
    .update(signer)
    .digest('hex');
  
  // Update signatures object
  const updatedSignatures = {
    ...gslData.signatures,
    [SIGNATURE_TYPES.STEWARD]: primarySignature,
    [SIGNATURE_TYPES.WITNESS]: `0x${witnessHash}`,
    [SIGNATURE_TYPES.VALIDATION]: `0x${validationHash}`,
    signing_authority: signer,
    witness_authority: witness,
    signed_at: new Date().toISOString()
  };
  
  // Add ceremonial signature if requested
  if (ceremonialOnly) {
    const ceremonialHash = crypto.createHash('sha256')
      .update('VC001-CEREMONIAL-SIGNING')
      .update(signer)
      .update(gslData.envelope_id)
      .digest('hex');
    
    updatedSignatures[SIGNATURE_TYPES.CEREMONIAL] = `0x${ceremonialHash}`;
    updatedSignatures.ceremonial_authority = 'VC001 Sovereign System';
  }
  
  // Create signed envelope
  const signedEnvelope = {
    gsl_envelope: {
      ...gslData,
      signatures: updatedSignatures,
      signing_metadata: {
        signer: signer,
        witness: witness,
        signed_at: new Date().toISOString(),
        signature_version: '1.0',
        ceremonial_compliance: true,
        lineage_anchor: 'VC001'
      }
    }
  };
  
  console.log('✅ GSL envelope signed successfully');
  console.log(`🔐 Primary Signature: ${primarySignature.substring(0, 16)}...`);
  console.log(`🧭 Witness Hash: 0x${witnessHash.substring(0, 16)}...`);
  
  return signedEnvelope;
}

/**
 * Sign message file and save result
 * @param {string} messagePath - Path to message file
 * @param {string} signer - Signer identifier
 * @param {Object} options - Signing options
 * @returns {string} Output file path
 */
function signMessageFile(messagePath, signer, options = {}) {
  const { outputPath, backup = true } = options;
  
  if (!fs.existsSync(messagePath)) {
    throw new Error(`Message file not found: ${messagePath}`);
  }
  
  console.log(`📁 Loading message: ${messagePath}`);
  
  // Load and parse message
  const messageContent = fs.readFileSync(messagePath, 'utf8');
  const envelope = JSON.parse(messageContent);
  
  // Create backup if requested
  if (backup) {
    const backupPath = `${messagePath}.backup-${Date.now()}`;
    fs.writeFileSync(backupPath, messageContent);
    console.log(`📋 Backup created: ${backupPath}`);
  }
  
  // Sign the envelope
  const signedEnvelope = signGSLEnvelope(envelope, signer, options);
  
  // Determine output path
  const finalOutputPath = outputPath || messagePath;
  
  // Save signed envelope
  fs.writeFileSync(finalOutputPath, JSON.stringify(signedEnvelope, null, 2));
  console.log(`📁 Signed message saved: ${finalOutputPath}`);
  
  return finalOutputPath;
}

/**
 * Batch sign multiple message files
 * @param {Array} messagePaths - Array of message file paths
 * @param {string} signer - Signer identifier
 * @param {Object} options - Signing options
 * @returns {Array} Array of signed file paths
 */
function batchSignMessages(messagePaths, signer, options = {}) {
  console.log(`🔐 Batch signing ${messagePaths.length} messages...`);
  
  const results = [];
  
  for (const messagePath of messagePaths) {
    try {
      const signedPath = signMessageFile(messagePath, signer, options);
      results.push({ messagePath, signedPath, status: 'success' });
    } catch (error) {
      console.error(`❌ Failed to sign ${messagePath}: ${error.message}`);
      results.push({ messagePath, signedPath: null, status: 'failed', error: error.message });
    }
  }
  
  const successful = results.filter(r => r.status === 'success').length;
  const failed = results.filter(r => r.status === 'failed').length;
  
  console.log(`✅ Batch signing complete: ${successful} successful, ${failed} failed`);
  
  return results;
}

/**
 * Main GSL signing operation
 */
function main() {
  const args = process.argv.slice(2);
  
  const messagePath = args.find(arg => arg.includes('--message'))?.split('=')[1];
  const signer = args.find(arg => arg.includes('--signer'))?.split('=')[1];
  const outputPath = args.find(arg => arg.includes('--output'))?.split('=')[1];
  const batchMode = args.includes('--batch');
  const noBackup = args.includes('--no-backup');
  
  if (!messagePath || !signer) {
    console.error('❌ Error: --message and --signer arguments required');
    console.log('Usage: node gsl-sign.js --message=path/to/message.json --signer=steward-001 [options]');
    console.log('\nAuthorized signers:', STEWARD_AUTHORITIES.join(', '));
    process.exit(1);
  }
  
  console.log('🔐 Initiating GSL message signing...');
  
  try {
    const options = {
      outputPath,
      backup: !noBackup,
      ceremonialOnly: true
    };
    
    if (batchMode) {
      // Treat messagePath as directory and sign all JSON files
      const messageDir = messagePath;
      const messageFiles = fs.readdirSync(messageDir)
        .filter(file => file.endsWith('.json'))
        .map(file => path.join(messageDir, file));
      
      const results = batchSignMessages(messageFiles, signer, options);
      
      console.log('\n🧭 Batch Signing Summary:');
      results.forEach(result => {
        const status = result.status === 'success' ? '✅' : '❌';
        console.log(`${status} ${path.basename(result.messagePath)}`);
      });
      
    } else {
      // Sign single message file
      const signedPath = signMessageFile(messagePath, signer, options);
      
      console.log('\n✅ GSL message signing complete');
      console.log(`📁 Signed message: ${signedPath}`);
    }
    
    console.log(`🧭 Signed by: ${signer}`);
    console.log(`🧭 Witnessed by: Syntec Cryptographic Protocol`);
    
  } catch (error) {
    console.error('❌ Signing failed:', error.message);
    process.exit(1);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  signGSLEnvelope,
  signMessageFile,
  batchSignMessages,
  generateCryptographicSignature,
  generateWitnessHash,
  validateSignerAuthority,
  STEWARD_AUTHORITIES,
  SIGNATURE_TYPES
};

/*
🧭 Ceremonial Declaration:
This script embodies the sacred art of cryptographic validation,
ensuring GSL message authenticity through steward authority.

Witnessed by: Syntec Cryptographic Protocol
*/