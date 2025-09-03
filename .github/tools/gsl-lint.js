#!/usr/bin/env node

/*
🔍 gsl-lint.js — GSL Message Validation
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Validate GSL (Glyph Signaling Language) message envelopes
Inscribed By: VC001 Sovereign System
Timestamp: 2025-09-03
Lineage: Anchored to ceremonial message validation

Sacred Operations:
- Validate GSL envelope structure
- Check ceremonial metadata compliance
- Verify signature requirements
- Ensure message type conformity

Invocation: node .github/tools/gsl-lint.js [directory-path]

Witnessed by: Syntec Validation Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const fs = require('fs');
const path = require('path');

// Ceremonial Constants
const GSL_MESSAGE_TYPES = [
  'grant_intake',
  'grant_review', 
  'grant_approved',
  'tokens_minted',
  'billing_processed',
  'ceremonial_burn'
];

const PRIORITY_LEVELS = ['low', 'normal', 'high', 'urgent', 'critical'];

const REQUIRED_ENVELOPE_FIELDS = [
  'envelope_id',
  'message_type',
  'timestamp',
  'sender',
  'recipient',
  'priority',
  'payload',
  'ceremonial_metadata',
  'signatures'
];

const REQUIRED_CEREMONIAL_FIELDS = [
  'lineage',
  'inscribed_by',
  'witness'
];

const REQUIRED_SIGNATURE_FIELDS = [
  'validation_hash'
];

/**
 * Validate GSL envelope structure
 * @param {Object} envelope - GSL message envelope
 * @param {string} filename - Source filename for error reporting
 * @returns {Array} Array of validation errors
 */
function validateGSLEnvelope(envelope, filename) {
  const errors = [];
  
  // Check if envelope has gsl_envelope wrapper
  if (!envelope.gsl_envelope) {
    errors.push(`${filename}: Missing 'gsl_envelope' wrapper`);
    return errors;
  }
  
  const gslData = envelope.gsl_envelope;
  
  // Validate required top-level fields
  for (const field of REQUIRED_ENVELOPE_FIELDS) {
    if (!gslData[field]) {
      errors.push(`${filename}: Missing required field '${field}'`);
    }
  }
  
  // Validate message type
  if (gslData.message_type && !GSL_MESSAGE_TYPES.includes(gslData.message_type)) {
    errors.push(`${filename}: Invalid message_type '${gslData.message_type}'. Must be one of: ${GSL_MESSAGE_TYPES.join(', ')}`);
  }
  
  // Validate priority
  if (gslData.priority && !PRIORITY_LEVELS.includes(gslData.priority)) {
    errors.push(`${filename}: Invalid priority '${gslData.priority}'. Must be one of: ${PRIORITY_LEVELS.join(', ')}`);
  }
  
  // Validate timestamp format
  if (gslData.timestamp) {
    const timestampRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
    if (!timestampRegex.test(gslData.timestamp)) {
      errors.push(`${filename}: Invalid timestamp format. Must be ISO 8601 format`);
    }
  }
  
  // Validate envelope ID format
  if (gslData.envelope_id) {
    const idRegex = /^[a-z0-9\-]+$/;
    if (!idRegex.test(gslData.envelope_id)) {
      errors.push(`${filename}: Invalid envelope_id format. Must contain only lowercase letters, numbers, and hyphens`);
    }
  }
  
  // Validate ceremonial metadata
  if (gslData.ceremonial_metadata) {
    for (const field of REQUIRED_CEREMONIAL_FIELDS) {
      if (!gslData.ceremonial_metadata[field]) {
        errors.push(`${filename}: Missing ceremonial_metadata field '${field}'`);
      }
    }
    
    // Validate lineage format
    if (gslData.ceremonial_metadata.lineage && !gslData.ceremonial_metadata.lineage.startsWith('VC')) {
      errors.push(`${filename}: Invalid lineage format. Must start with 'VC'`);
    }
  }
  
  // Validate signatures
  if (gslData.signatures) {
    for (const field of REQUIRED_SIGNATURE_FIELDS) {
      if (!gslData.signatures[field]) {
        errors.push(`${filename}: Missing signatures field '${field}'`);
      }
    }
    
    // Validate signature format (should be hex)
    for (const [key, value] of Object.entries(gslData.signatures)) {
      if (value && typeof value === 'string' && value.startsWith('0x') && value.length < 10) {
        errors.push(`${filename}: Signature '${key}' appears to be a placeholder. Should be a valid signature`);
      }
    }
  }
  
  // Validate payload exists and is non-empty
  if (gslData.payload && Object.keys(gslData.payload).length === 0) {
    errors.push(`${filename}: Payload cannot be empty`);
  }
  
  return errors;
}

/**
 * Validate message type specific requirements
 * @param {Object} envelope - GSL message envelope
 * @param {string} filename - Source filename
 * @returns {Array} Array of validation errors
 */
function validateMessageTypeRequirements(envelope, filename) {
  const errors = [];
  const gslData = envelope.gsl_envelope;
  
  if (!gslData.message_type || !gslData.payload) {
    return errors; // Already caught by basic validation
  }
  
  switch (gslData.message_type) {
    case 'grant_intake':
      if (!gslData.payload.grant_application) {
        errors.push(`${filename}: grant_intake messages must have 'grant_application' in payload`);
      }
      break;
      
    case 'grant_review':
      if (!gslData.payload.review_results) {
        errors.push(`${filename}: grant_review messages must have 'review_results' in payload`);
      }
      break;
      
    case 'grant_approved':
      if (!gslData.payload.approval_authorization) {
        errors.push(`${filename}: grant_approved messages must have 'approval_authorization' in payload`);
      }
      break;
      
    case 'tokens_minted':
      if (!gslData.payload.minting_confirmation) {
        errors.push(`${filename}: tokens_minted messages must have 'minting_confirmation' in payload`);
      }
      break;
      
    case 'billing_processed':
      if (!gslData.payload.billing_record) {
        errors.push(`${filename}: billing_processed messages must have 'billing_record' in payload`);
      }
      break;
      
    case 'ceremonial_burn':
      if (!gslData.payload.burn_authorization) {
        errors.push(`${filename}: ceremonial_burn messages must have 'burn_authorization' in payload`);
      }
      break;
  }
  
  return errors;
}

/**
 * Scan directory for GSL message files
 * @param {string} dirPath - Directory to scan
 * @returns {Array} Array of GSL file paths
 */
function findGSLFiles(dirPath) {
  const gslFiles = [];
  
  if (!fs.existsSync(dirPath)) {
    return gslFiles;
  }
  
  function scanDirectory(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const itemPath = path.join(currentPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (item.endsWith('.json') && !item.startsWith('.')) {
        gslFiles.push(itemPath);
      }
    }
  }
  
  scanDirectory(dirPath);
  return gslFiles;
}

/**
 * Lint a single GSL file
 * @param {string} filepath - Path to GSL file
 * @returns {Array} Array of validation errors
 */
function lintGSLFile(filepath) {
  const errors = [];
  const filename = path.basename(filepath);
  
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const data = JSON.parse(content);
    
    // Check if it's a GSL envelope (has gsl_envelope field)
    if (!data.gsl_envelope) {
      // Skip non-GSL files
      return errors;
    }
    
    // Validate envelope structure
    const structureErrors = validateGSLEnvelope(data, filename);
    errors.push(...structureErrors);
    
    // Validate message type requirements
    const typeErrors = validateMessageTypeRequirements(data, filename);
    errors.push(...typeErrors);
    
  } catch (parseError) {
    errors.push(`${filename}: JSON parse error - ${parseError.message}`);
  }
  
  return errors;
}

/**
 * Main GSL linting operation
 */
function main() {
  const args = process.argv.slice(2);
  const targetPath = args[0] || './messages';
  
  console.log('🔍 Initiating GSL message validation...');
  console.log(`📁 Scanning directory: ${targetPath}`);
  
  const gslFiles = findGSLFiles(targetPath);
  console.log(`📋 Found ${gslFiles.length} potential GSL files`);
  
  let totalErrors = 0;
  let validatedFiles = 0;
  
  for (const filepath of gslFiles) {
    const errors = lintGSLFile(filepath);
    
    if (errors.length > 0) {
      console.log(`\n❌ ${path.relative('.', filepath)}:`);
      for (const error of errors) {
        console.log(`   ${error}`);
      }
      totalErrors += errors.length;
    } else {
      // Only count files that actually contained GSL envelopes
      const content = fs.readFileSync(filepath, 'utf8');
      try {
        const data = JSON.parse(content);
        if (data.gsl_envelope) {
          validatedFiles++;
          console.log(`✅ ${path.relative('.', filepath)}: Valid GSL envelope`);
        }
      } catch (e) {
        // Already handled in lintGSLFile
      }
    }
  }
  
  console.log('\n🧭 GSL Validation Summary:');
  console.log(`📋 Files validated: ${validatedFiles}`);
  console.log(`❌ Total errors: ${totalErrors}`);
  
  if (totalErrors > 0) {
    console.log('\n💡 Common fixes:');
    console.log('   - Ensure all required fields are present');
    console.log('   - Check timestamp format (ISO 8601)');
    console.log('   - Verify signature fields are not placeholders');
    console.log('   - Validate ceremonial metadata completeness');
    console.log('\n🧭 Witnessed by: Syntec Validation Protocol');
    process.exit(1);
  } else {
    console.log('✅ All GSL envelopes pass ceremonial validation');
    console.log('🧭 Witnessed by: Syntec Validation Protocol');
    process.exit(0);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  validateGSLEnvelope,
  validateMessageTypeRequirements,
  findGSLFiles,
  lintGSLFile,
  GSL_MESSAGE_TYPES,
  PRIORITY_LEVELS,
  REQUIRED_ENVELOPE_FIELDS
};

/*
🧭 Ceremonial Declaration:
This tool embodies the sacred art of message validation,
ensuring GSL envelopes maintain ceremonial compliance and operational integrity.

Witnessed by: Syntec Validation Protocol
*/