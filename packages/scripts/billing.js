/**
 * 💳 Billing Manager
 * 
 * Ceremonial script for managing grant billing and payment processing
 * Handles disbursements, invoicing, and financial tracking
 * 
 * @file packages/scripts/billing.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Generate billing record for approved grant
 * @param {string} submissionId - Submission identifier
 * @returns {object} Billing result
 */
function generateBilling(submissionId) {
  try {
    console.log(`💳 Generating billing for submission ${submissionId}...`);
    
    const submissionFile = path.join(__dirname, '../../data/grants/submissions', `${submissionId}.json`);
    if (!fs.existsSync(submissionFile)) {
      throw new Error(`Submission not found: ${submissionId}`);
    }
    
    const submission = JSON.parse(fs.readFileSync(submissionFile, 'utf8'));
    const grantFile = path.join(__dirname, '../../data/grants', `${submission.grant_id}.json`);
    const grant = JSON.parse(fs.readFileSync(grantFile, 'utf8'));
    
    const billing = {
      billing_id: `BILL-${Date.now().toString().slice(-8)}`,
      grant_id: grant.id,
      submission_id: submissionId,
      created_date: new Date().toISOString(),
      
      amount_details: {
        approved_amount: submission.funding_details?.approved_amount || grant.amount,
        ltoken_value: submission.recommendation.estimated_ltokens,
        processing_fee: Math.floor(grant.amount * 0.03), // 3% processing fee
        total_due: grant.amount + Math.floor(grant.amount * 0.03)
      },
      
      disbursement_schedule: submission.funding_details?.disbursement_schedule || [
        { amount: grant.amount * 0.5, date: new Date().toISOString(), milestone: 'Initial disbursement' },
        { amount: grant.amount * 0.5, date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(), milestone: 'Final disbursement' }
      ],
      
      status: 'pending_payment'
    };
    
    const billingFile = path.join(__dirname, '../../data/grants/billing', `${billing.billing_id}.json`);
    const billingDir = path.dirname(billingFile);
    if (!fs.existsSync(billingDir)) {
      fs.mkdirSync(billingDir, { recursive: true });
    }
    
    fs.writeFileSync(billingFile, JSON.stringify(billing, null, 2));
    
    const messageFile = path.join(__dirname, '../../messages/billing', `${billing.billing_id}.json`);
    fs.writeFileSync(messageFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      billing_id: billing.billing_id,
      grant_id: grant.id,
      action: 'billing_generated',
      amount: billing.amount_details.total_due
    }, null, 2));
    
    console.log(`✅ Billing ${billing.billing_id} generated`);
    console.log(`💰 Total Due: $${billing.amount_details.total_due.toLocaleString()}`);
    
    return { success: true, billingId: billing.billing_id, totalDue: billing.amount_details.total_due };
    
  } catch (error) {
    console.error('❌ Error generating billing:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('💳 VC001 Billing Manager');
    console.log('Usage: node billing.js <submission-id>');
    process.exit(1);
  }
  
  generateBilling(args[0]);
}

module.exports = { generateBilling };