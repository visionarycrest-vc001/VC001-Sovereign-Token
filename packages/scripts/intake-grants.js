/**
 * 🏛️ Grant Intake Processor
 * 
 * Ceremonial script for processing incoming grant applications
 * Validates, sanitizes, and routes applications through the sovereign pipeline
 * 
 * @file packages/scripts/intake-grants.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Generate unique grant ID
 * @returns {string} Grant identifier in format GRANT-XXXXXX
 */
function generateGrantId() {
  const timestamp = Date.now().toString().slice(-6);
  return `GRANT-${timestamp}`;
}

/**
 * Validate grant application against schema
 * @param {object} application - Grant application data
 * @returns {object} Validation result
 */
function validateApplication(application) {
  const errors = [];
  
  // Required fields validation
  if (!application.title || application.title.length < 5) {
    errors.push('Title must be at least 5 characters');
  }
  
  if (!application.sector || !['FDA', 'EDA', 'SAM'].includes(application.sector)) {
    errors.push('Sector must be FDA, EDA, or SAM');
  }
  
  if (!application.amount || application.amount < 1000) {
    errors.push('Amount must be at least $1,000');
  }
  
  if (!application.applicant?.email?.includes('@')) {
    errors.push('Valid email address required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Process incoming grant application
 * @param {object} rawApplication - Raw application data
 * @returns {object} Processing result
 */
function processApplication(rawApplication) {
  console.log('🏛️ Processing grant application...');
  
  // Validate application
  const validation = validateApplication(rawApplication);
  if (!validation.isValid) {
    console.error('❌ Application validation failed:', validation.errors);
    return { success: false, errors: validation.errors };
  }
  
  // Generate grant ID and structure
  const grantId = generateGrantId();
  const application = {
    id: grantId,
    ...rawApplication,
    submitted_date: new Date().toISOString(),
    status: 'pending',
    review_notes: []
  };
  
  try {
    // Save to grants directory
    const grantsDir = path.join(__dirname, '../../data/grants');
    if (!fs.existsSync(grantsDir)) {
      fs.mkdirSync(grantsDir, { recursive: true });
    }
    
    const filename = `${grantId}.json`;
    const filepath = path.join(grantsDir, filename);
    fs.writeFileSync(filepath, JSON.stringify(application, null, 2));
    
    // Create intake message
    const intakeMessage = {
      timestamp: new Date().toISOString(),
      grant_id: grantId,
      action: 'intake_received',
      details: {
        sector: application.sector,
        amount: application.amount,
        applicant: application.applicant.name
      }
    };
    
    const messageFile = path.join(__dirname, '../../messages/intake', `${grantId}.json`);
    fs.writeFileSync(messageFile, JSON.stringify(intakeMessage, null, 2));
    
    console.log(`✅ Application ${grantId} processed successfully`);
    console.log(`📁 Saved to: ${filepath}`);
    console.log(`📨 Intake message created`);
    
    return { 
      success: true, 
      grantId, 
      filepath,
      status: 'pending'
    };
    
  } catch (error) {
    console.error('❌ Error processing application:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Batch process multiple applications
 * @param {array} applications - Array of application objects
 * @returns {object} Batch processing results
 */
function batchProcessApplications(applications) {
  console.log(`🔄 Processing ${applications.length} applications...`);
  
  const results = {
    processed: 0,
    failed: 0,
    grantIds: []
  };
  
  applications.forEach((app, index) => {
    console.log(`\n📋 Processing application ${index + 1}/${applications.length}`);
    const result = processApplication(app);
    
    if (result.success) {
      results.processed++;
      results.grantIds.push(result.grantId);
    } else {
      results.failed++;
    }
  });
  
  console.log(`\n🎯 Batch complete: ${results.processed} processed, ${results.failed} failed`);
  return results;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🏛️ VC001 Grant Intake Processor');
    console.log('Usage: node intake-grants.js <application.json>');
    console.log('       node intake-grants.js --batch <applications.json>');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const isBatch = args.includes('--batch');
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ File not found: ${inputFile}`);
    process.exit(1);
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
    
    if (isBatch) {
      batchProcessApplications(data);
    } else {
      processApplication(data);
    }
    
  } catch (error) {
    console.error('❌ Error reading application file:', error.message);
    process.exit(1);
  }
}

module.exports = {
  processApplication,
  batchProcessApplications,
  validateApplication,
  generateGrantId
};