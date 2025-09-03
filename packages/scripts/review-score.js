/**
 * 🎯 Grant Review Scorer
 * 
 * Ceremonial script for evaluating and scoring grant proposals
 * Implements sovereign scoring criteria across multiple dimensions
 * 
 * @file packages/scripts/review-score.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Scoring criteria and weights by sector
 */
const SCORING_CRITERIA = {
  FDA: {
    technical_merit: 0.25,
    feasibility: 0.20,
    safety: 0.25,
    regulatory_compliance: 0.20,
    innovation: 0.10
  },
  EDA: {
    environmental_impact: 0.30,
    sustainability: 0.25,
    community_benefit: 0.20,
    feasibility: 0.15,
    innovation: 0.10
  },
  SAM: {
    strategic_alignment: 0.30,
    operational_feasibility: 0.25,
    impact_potential: 0.20,
    resource_efficiency: 0.15,
    scalability: 0.10
  }
};

/**
 * Review scoring framework
 */
const SCORE_RANGES = {
  excellent: { min: 90, max: 100, description: "Exceptional quality, exceeds all expectations" },
  good: { min: 75, max: 89, description: "High quality, meets most requirements well" },
  satisfactory: { min: 60, max: 74, description: "Adequate quality, meets basic requirements" },
  needs_improvement: { min: 40, max: 59, description: "Below standards, requires significant revision" },
  poor: { min: 0, max: 39, description: "Inadequate, major deficiencies identified" }
};

/**
 * Calculate weighted score for proposal
 * @param {object} scores - Individual criterion scores
 * @param {string} sector - Grant sector (FDA/EDA/SAM)
 * @returns {number} Weighted total score
 */
function calculateWeightedScore(scores, sector) {
  const weights = SCORING_CRITERIA[sector];
  if (!weights) {
    throw new Error(`Unsupported sector: ${sector}`);
  }
  
  let totalScore = 0;
  let totalWeight = 0;
  
  for (const [criterion, weight] of Object.entries(weights)) {
    if (scores[criterion] !== undefined) {
      totalScore += scores[criterion] * weight;
      totalWeight += weight;
    }
  }
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

/**
 * Generate review comments based on scores
 * @param {object} scores - Individual criterion scores
 * @param {string} sector - Grant sector
 * @returns {array} Array of review comments
 */
function generateReviewComments(scores, sector) {
  const comments = [];
  const criteria = SCORING_CRITERIA[sector];
  
  for (const [criterion, weight] of Object.entries(criteria)) {
    const score = scores[criterion];
    if (score !== undefined) {
      const level = getScoreLevel(score);
      comments.push({
        criterion,
        score,
        weight: weight * 100,
        level: level.description,
        feedback: generateCriterionFeedback(criterion, score, sector)
      });
    }
  }
  
  return comments;
}

/**
 * Get score level description
 * @param {number} score - Numeric score
 * @returns {object} Score level object
 */
function getScoreLevel(score) {
  for (const [level, range] of Object.entries(SCORE_RANGES)) {
    if (score >= range.min && score <= range.max) {
      return { level, ...range };
    }
  }
  return SCORE_RANGES.poor;
}

/**
 * Generate specific feedback for criterion
 * @param {string} criterion - Scoring criterion
 * @param {number} score - Score for criterion
 * @param {string} sector - Grant sector
 * @returns {string} Feedback text
 */
function generateCriterionFeedback(criterion, score, sector) {
  const level = getScoreLevel(score);
  
  const feedbackTemplates = {
    excellent: [
      `Outstanding ${criterion} demonstrates exceptional quality`,
      `Exemplary approach to ${criterion} exceeds sector standards`,
      `Remarkable ${criterion} showcases innovative thinking`
    ],
    good: [
      `Strong ${criterion} meets high standards`,
      `Well-developed ${criterion} shows solid understanding`,
      `Good ${criterion} demonstrates competent approach`
    ],
    satisfactory: [
      `Adequate ${criterion} meets basic requirements`,
      `Acceptable ${criterion} with room for improvement`,
      `Standard ${criterion} approach`
    ],
    needs_improvement: [
      `${criterion} requires significant enhancement`,
      `Weak ${criterion} needs substantial revision`,
      `Inadequate ${criterion} fails to meet standards`
    ],
    poor: [
      `${criterion} is severely lacking`,
      `Major deficiencies in ${criterion}`,
      `Unacceptable ${criterion} quality`
    ]
  };
  
  const templates = feedbackTemplates[level.level] || feedbackTemplates.poor;
  return templates[Math.floor(Math.random() * templates.length)];
}

/**
 * Create comprehensive review report
 * @param {object} proposal - Proposal object
 * @param {object} scores - Criterion scores
 * @param {object} reviewer - Reviewer information
 * @returns {object} Complete review report
 */
function createReviewReport(proposal, scores, reviewer) {
  const totalScore = calculateWeightedScore(scores, proposal.sector);
  const comments = generateReviewComments(scores, proposal.sector);
  const recommendation = getRecommendation(totalScore);
  
  const review = {
    review_id: `REV-${Date.now().toString().slice(-8)}`,
    proposal_id: proposal.proposal_id,
    grant_id: proposal.grant_id,
    reviewer: {
      id: reviewer.id,
      name: reviewer.name,
      role: reviewer.role,
      expertise: reviewer.expertise || []
    },
    review_date: new Date().toISOString(),
    
    scoring: {
      total_score: Math.round(totalScore * 100) / 100,
      individual_scores: scores,
      comments: comments,
      sector_weights: SCORING_CRITERIA[proposal.sector]
    },
    
    recommendation: {
      decision: recommendation.decision,
      confidence: recommendation.confidence,
      priority: recommendation.priority,
      conditions: recommendation.conditions
    },
    
    detailed_feedback: {
      strengths: generateStrengths(scores),
      weaknesses: generateWeaknesses(scores),
      suggestions: generateSuggestions(scores, proposal.sector)
    },
    
    ceremonial_data: {
      reviewed_by: reviewer.name,
      lineage: `${proposal.sector}-Review-${Date.now()}`,
      seal: `${reviewer.role}-${Date.now().toString().slice(-6)}`
    }
  };
  
  return review;
}

/**
 * Get recommendation based on total score
 * @param {number} totalScore - Total weighted score
 * @returns {object} Recommendation object
 */
function getRecommendation(totalScore) {
  if (totalScore >= 85) {
    return {
      decision: 'approved',
      confidence: 'high',
      priority: 'high',
      conditions: []
    };
  } else if (totalScore >= 70) {
    return {
      decision: 'approved',
      confidence: 'medium',
      priority: 'medium',
      conditions: ['Address minor concerns before final approval']
    };
  } else if (totalScore >= 55) {
    return {
      decision: 'revision_required',
      confidence: 'medium',
      priority: 'low',
      conditions: ['Significant improvements needed', 'Resubmit after addressing major issues']
    };
  } else {
    return {
      decision: 'rejected',
      confidence: 'high',
      priority: 'low',
      conditions: ['Fundamental issues identified', 'Consider substantial redesign']
    };
  }
}

/**
 * Generate strengths list from scores
 * @param {object} scores - Criterion scores
 * @returns {array} List of strengths
 */
function generateStrengths(scores) {
  return Object.entries(scores)
    .filter(([_, score]) => score >= 75)
    .map(([criterion, score]) => `Strong ${criterion} (${score}/100)`);
}

/**
 * Generate weaknesses list from scores
 * @param {object} scores - Criterion scores
 * @returns {array} List of weaknesses
 */
function generateWeaknesses(scores) {
  return Object.entries(scores)
    .filter(([_, score]) => score < 60)
    .map(([criterion, score]) => `Weak ${criterion} (${score}/100)`);
}

/**
 * Generate improvement suggestions
 * @param {object} scores - Criterion scores
 * @param {string} sector - Grant sector
 * @returns {array} List of suggestions
 */
function generateSuggestions(scores, sector) {
  const suggestions = [];
  
  Object.entries(scores).forEach(([criterion, score]) => {
    if (score < 70) {
      suggestions.push(`Enhance ${criterion} to meet ${sector} sector standards`);
    }
  });
  
  return suggestions;
}

/**
 * Save review to file system
 * @param {object} review - Review report object
 * @returns {string} File path where review was saved
 */
function saveReview(review) {
  const reviewsDir = path.join(__dirname, '../../data/grants/reviews');
  if (!fs.existsSync(reviewsDir)) {
    fs.mkdirSync(reviewsDir, { recursive: true });
  }
  
  const filename = `${review.review_id}.json`;
  const filepath = path.join(reviewsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(review, null, 2));
  
  // Create review message
  const reviewMessage = {
    timestamp: new Date().toISOString(),
    review_id: review.review_id,
    proposal_id: review.proposal_id,
    action: 'review_completed',
    decision: review.recommendation.decision,
    total_score: review.scoring.total_score
  };
  
  const messageFile = path.join(__dirname, '../../messages/review', `${review.review_id}.json`);
  fs.writeFileSync(messageFile, JSON.stringify(reviewMessage, null, 2));
  
  return filepath;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('🎯 VC001 Review Scorer');
    console.log('Usage: node review-score.js <proposal-file.json> <reviewer-config.json>');
    console.log('       node review-score.js --proposal-id PROP-123456 --reviewer reviewer.json');
    process.exit(1);
  }
  
  try {
    let proposalFile, reviewerFile;
    
    if (args[0] === '--proposal-id') {
      const proposalId = args[1];
      proposalFile = path.join(__dirname, '../../data/grants/proposals', `${proposalId}.json`);
      reviewerFile = args[3];
    } else {
      proposalFile = args[0];
      reviewerFile = args[1];
    }
    
    if (!fs.existsSync(proposalFile)) {
      throw new Error(`Proposal file not found: ${proposalFile}`);
    }
    
    if (!fs.existsSync(reviewerFile)) {
      throw new Error(`Reviewer config not found: ${reviewerFile}`);
    }
    
    const proposal = JSON.parse(fs.readFileSync(proposalFile, 'utf8'));
    const reviewerConfig = JSON.parse(fs.readFileSync(reviewerFile, 'utf8'));
    
    // For demo purposes, generate random scores
    // In production, these would come from actual review process
    const criteria = Object.keys(SCORING_CRITERIA[proposal.sector]);
    const scores = {};
    criteria.forEach(criterion => {
      scores[criterion] = Math.floor(Math.random() * 40) + 60; // 60-100 range
    });
    
    const review = createReviewReport(proposal, scores, reviewerConfig);
    const filepath = saveReview(review);
    
    console.log(`✅ Review ${review.review_id} completed`);
    console.log(`📊 Total Score: ${review.scoring.total_score}/100`);
    console.log(`🎯 Recommendation: ${review.recommendation.decision}`);
    console.log(`📁 Saved to: ${filepath}`);
    
  } catch (error) {
    console.error('❌ Error during review:', error.message);
    process.exit(1);
  }
}

module.exports = {
  calculateWeightedScore,
  createReviewReport,
  saveReview,
  generateReviewComments,
  SCORING_CRITERIA,
  SCORE_RANGES
};