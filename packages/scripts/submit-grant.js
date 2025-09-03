/**
 * 🚀 Grant Submission Manager
 * 
 * Ceremonial script for final grant submission and approval processing
 * Handles the transition from proposal to approved grant status
 * 
 * @file packages/scripts/submit-grant.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Validate grant is ready for submission
 * @param {object} grant - Grant application
 * @param {object} proposal - Grant proposal  
 * @param {array} reviews - Review reports
 * @returns {object} Validation result
 */
function validateForSubmission(grant, proposal, reviews) {
  const errors = [];
  
  // Check grant status
  if (!['pending', 'under_review'].includes(grant.status)) {
    errors.push(`Invalid grant status: ${grant.status}`);
  }
  
  // Check proposal completeness
  if (!proposal || proposal.status !== 'reviewed') {
    errors.push('Proposal must be in reviewed status');
  }
  
  // Check reviews
  if (!reviews || reviews.length === 0) {
    errors.push('At least one review required');
  }
  
  const approvedReviews = reviews.filter(r => r.recommendation.decision === 'approved');
  if (approvedReviews.length === 0) {
    errors.push('No approved reviews found');
  }
  
  // Check average score
  const avgScore = reviews.reduce((sum, r) => sum + r.scoring.total_score, 0) / reviews.length;
  if (avgScore < 70) {
    errors.push(`Average review score too low: ${avgScore}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    averageScore: avgScore,
    approvedReviews: approvedReviews.length
  };
}

/**
 * Create submission package
 * @param {object} grant - Grant application
 * @param {object} proposal - Grant proposal
 * @param {array} reviews - Review reports
 * @returns {object} Submission package
 */
function createSubmissionPackage(grant, proposal, reviews) {
  console.log(`🚀 Creating submission package for ${grant.id}...`);
  
  const avgScore = reviews.reduce((sum, r) => sum + r.scoring.total_score, 0) / reviews.length;
  const approvedReviews = reviews.filter(r => r.recommendation.decision === 'approved');
  
  const submission = {
    submission_id: `SUB-${grant.id.split('-')[1]}`,
    grant_id: grant.id,
    proposal_id: proposal.proposal_id,
    submitted_date: new Date().toISOString(),
    status: 'submitted',
    
    application_summary: {
      title: grant.title,
      sector: grant.sector,
      requested_amount: grant.amount,
      applicant: grant.applicant
    },
    
    review_summary: {
      total_reviews: reviews.length,
      approved_reviews: approvedReviews.length,
      average_score: Math.round(avgScore * 100) / 100,
      consensus: approvedReviews.length / reviews.length,
      highest_score: Math.max(...reviews.map(r => r.scoring.total_score)),
      lowest_score: Math.min(...reviews.map(r => r.scoring.total_score))
    },
    
    recommendation: {
      action: determineRecommendedAction(avgScore, approvedReviews.length, reviews.length),
      priority: determinePriority(avgScore, grant.sector),
      conditions: extractConditions(reviews),
      estimated_ltokens: calculateLTokenAllocation(grant.amount, grant.sector, avgScore)
    },
    
    supporting_documents: {
      original_application: `grants/${grant.id}.json`,
      proposal: `grants/proposals/${proposal.proposal_id}.json`,
      reviews: reviews.map(r => `grants/reviews/${r.review_id}.json`)
    },
    
    ceremonial_data: {
      submitted_by: 'Grant Submission Manager',
      lineage: `${grant.sector}-Submission-${Date.now()}`,
      invocation: generateSubmissionInvocation(grant.sector, avgScore)
    }
  };
  
  return submission;
}

/**
 * Determine recommended action based on reviews
 * @param {number} avgScore - Average review score
 * @param {number} approvedCount - Number of approved reviews
 * @param {number} totalReviews - Total number of reviews
 * @returns {string} Recommended action
 */
function determineRecommendedAction(avgScore, approvedCount, totalReviews) {
  const approvalRate = approvedCount / totalReviews;
  
  if (avgScore >= 85 && approvalRate >= 0.8) {
    return 'immediate_approval';
  } else if (avgScore >= 75 && approvalRate >= 0.6) {
    return 'conditional_approval';
  } else if (avgScore >= 60) {
    return 'revision_required';
  } else {
    return 'rejection_recommended';
  }
}

/**
 * Determine priority level
 * @param {number} avgScore - Average score
 * @param {string} sector - Grant sector
 * @returns {string} Priority level
 */
function determinePriority(avgScore, sector) {
  const sectorPriorities = { FDA: 1.2, EDA: 1.1, SAM: 1.0 };
  const adjustedScore = avgScore * (sectorPriorities[sector] || 1.0);
  
  if (adjustedScore >= 90) return 'critical';
  if (adjustedScore >= 80) return 'high';
  if (adjustedScore >= 70) return 'medium';
  return 'low';
}

/**
 * Extract conditions from reviews
 * @param {array} reviews - Review reports
 * @returns {array} Combined conditions
 */
function extractConditions(reviews) {
  const allConditions = [];
  
  reviews.forEach(review => {
    if (review.recommendation.conditions) {
      allConditions.push(...review.recommendation.conditions);
    }
  });
  
  // Remove duplicates
  return [...new Set(allConditions)];
}

/**
 * Calculate L-Token allocation
 * @param {number} amount - Grant amount
 * @param {string} sector - Grant sector
 * @param {number} score - Average score
 * @returns {number} L-Token allocation
 */
function calculateLTokenAllocation(amount, sector, score) {
  const baseMultipliers = { FDA: 1.5, EDA: 1.2, SAM: 1.0 };
  const scoreMultiplier = score / 100;
  
  return Math.floor(amount * baseMultipliers[sector] * scoreMultiplier);
}

/**
 * Generate submission invocation
 * @param {string} sector - Grant sector
 * @param {number} score - Average score
 * @returns {string} Ceremonial invocation
 */
function generateSubmissionInvocation(sector, score) {
  const invocations = {
    FDA: `By the covenant of health and healing, scored at ${score.toFixed(1)}, may this submission advance the wellbeing of all`,
    EDA: `In harmony with natural wisdom, scored at ${score.toFixed(1)}, may this submission honor our environmental stewardship`,
    SAM: `With strategic purpose and sovereign authority, scored at ${score.toFixed(1)}, may this submission serve our collective mission`
  };
  
  return invocations[sector] || `With sovereign purpose, scored at ${score.toFixed(1)}, may this submission be blessed with clarity`;
}

/**
 * Process grant submission
 * @param {string} grantId - Grant identifier
 * @returns {object} Processing result
 */
function processSubmission(grantId) {
  try {
    console.log(`🚀 Processing submission for grant ${grantId}...`);
    
    // Load grant application
    const grantFile = path.join(__dirname, '../../data/grants', `${grantId}.json`);
    if (!fs.existsSync(grantFile)) {
      throw new Error(`Grant not found: ${grantId}`);
    }
    const grant = JSON.parse(fs.readFileSync(grantFile, 'utf8'));
    
    // Load proposal
    const proposalFile = path.join(__dirname, '../../data/grants/proposals', `PROP-${grantId.split('-')[1]}.json`);
    if (!fs.existsSync(proposalFile)) {
      throw new Error(`Proposal not found for grant ${grantId}`);
    }
    const proposal = JSON.parse(fs.readFileSync(proposalFile, 'utf8'));
    
    // Load reviews
    const reviewsDir = path.join(__dirname, '../../data/grants/reviews');
    const reviewFiles = fs.readdirSync(reviewsDir)
      .filter(f => f.endsWith('.json'))
      .map(f => path.join(reviewsDir, f))
      .filter(f => {
        const review = JSON.parse(fs.readFileSync(f, 'utf8'));
        return review.grant_id === grantId;
      });
    
    const reviews = reviewFiles.map(f => JSON.parse(fs.readFileSync(f, 'utf8')));
    
    // Validate for submission
    const validation = validateForSubmission(grant, proposal, reviews);
    if (!validation.isValid) {
      console.error('❌ Submission validation failed:', validation.errors);
      return { success: false, errors: validation.errors };
    }
    
    // Create submission package
    const submission = createSubmissionPackage(grant, proposal, reviews);
    
    // Save submission
    const submissionsDir = path.join(__dirname, '../../data/grants/submissions');
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }
    
    const submissionFile = path.join(submissionsDir, `${submission.submission_id}.json`);
    fs.writeFileSync(submissionFile, JSON.stringify(submission, null, 2));
    
    // Update grant status
    grant.status = 'submitted';
    grant.submission_id = submission.submission_id;
    grant.submitted_date = submission.submitted_date;
    fs.writeFileSync(grantFile, JSON.stringify(grant, null, 2));
    
    // Create submission message
    const message = {
      timestamp: new Date().toISOString(),
      submission_id: submission.submission_id,
      grant_id: grantId,
      action: 'submission_completed',
      recommendation: submission.recommendation.action,
      priority: submission.recommendation.priority,
      average_score: submission.review_summary.average_score
    };
    
    const messageFile = path.join(__dirname, '../../messages/approved', `${submission.submission_id}.json`);
    fs.writeFileSync(messageFile, JSON.stringify(message, null, 2));
    
    console.log(`✅ Submission ${submission.submission_id} processed successfully`);
    console.log(`📊 Average Score: ${submission.review_summary.average_score}`);
    console.log(`🎯 Recommendation: ${submission.recommendation.action}`);
    console.log(`💰 L-Token Allocation: ${submission.recommendation.estimated_ltokens}`);
    
    return {
      success: true,
      submissionId: submission.submission_id,
      recommendation: submission.recommendation.action,
      ltokens: submission.recommendation.estimated_ltokens,
      filepath: submissionFile
    };
    
  } catch (error) {
    console.error('❌ Error processing submission:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🚀 VC001 Grant Submission Manager');
    console.log('Usage: node submit-grant.js <grant-id>');
    console.log('Example: node submit-grant.js GRANT-123456');
    process.exit(1);
  }
  
  const grantId = args[0];
  processSubmission(grantId);
}

module.exports = {
  processSubmission,
  createSubmissionPackage,
  validateForSubmission,
  calculateLTokenAllocation
};