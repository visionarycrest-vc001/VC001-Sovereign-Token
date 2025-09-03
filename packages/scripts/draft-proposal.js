/**
 * 📝 Grant Proposal Drafter
 * 
 * Ceremonial script for creating structured grant proposals
 * Generates proposals based on application data and sector requirements
 * 
 * @file packages/scripts/draft-proposal.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Sector-specific proposal templates
 */
const SECTOR_TEMPLATES = {
  FDA: {
    sections: ['Executive Summary', 'Technical Approach', 'Regulatory Compliance', 'Timeline', 'Budget'],
    requirements: ['FDA submission guidelines', 'Safety protocols', 'Clinical trial data'],
    multiplier: 1.5
  },
  EDA: {
    sections: ['Project Overview', 'Environmental Impact', 'Sustainability Plan', 'Community Benefits', 'Budget'],
    requirements: ['Environmental assessments', 'Impact studies', 'Compliance certificates'],
    multiplier: 1.2
  },
  SAM: {
    sections: ['Mission Statement', 'Strategic Alignment', 'Operational Plan', 'Metrics', 'Budget'],
    requirements: ['Strategic documentation', 'Performance indicators', 'Governance structure'],
    multiplier: 1.0
  }
};

/**
 * Generate proposal template based on grant application
 * @param {object} grant - Grant application data
 * @returns {object} Structured proposal template
 */
function generateProposal(grant) {
  console.log(`📝 Drafting proposal for grant ${grant.id}...`);
  
  const template = SECTOR_TEMPLATES[grant.sector];
  if (!template) {
    throw new Error(`Unsupported sector: ${grant.sector}`);
  }
  
  const proposal = {
    proposal_id: `PROP-${grant.id.split('-')[1]}`,
    grant_id: grant.id,
    sector: grant.sector,
    created_date: new Date().toISOString(),
    status: 'draft',
    template_version: '1.0',
    
    metadata: {
      title: grant.title,
      applicant: grant.applicant,
      requested_amount: grant.amount,
      calculated_ltokens: Math.floor(grant.amount * template.multiplier),
      estimated_duration: '12 months'
    },
    
    sections: template.sections.map(section => ({
      title: section,
      content: generateSectionContent(section, grant),
      status: 'draft',
      word_count: 0
    })),
    
    requirements: template.requirements.map(req => ({
      requirement: req,
      status: 'pending',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: ''
    })),
    
    ceremonial_data: {
      inscribed_by: 'Proposal Generator',
      lineage: `${grant.sector}-Proposal-${Date.now()}`,
      invocation: generateInvocation(grant.sector)
    }
  };
  
  return proposal;
}

/**
 * Generate section content based on type and grant data
 * @param {string} sectionTitle - Section title
 * @param {object} grant - Grant data
 * @returns {string} Section content template
 */
function generateSectionContent(sectionTitle, grant) {
  const templates = {
    'Executive Summary': `
# Executive Summary

## Project Overview
${grant.title}

## Objective
[Describe the primary objectives and goals of this ${grant.sector} initiative]

## Impact
[Detail the expected impact and benefits]

## Investment
Requesting $${grant.amount.toLocaleString()} for [duration] to achieve [specific outcomes]
`,
    
    'Technical Approach': `
# Technical Approach

## Methodology
[Describe the technical methodology and approach]

## Implementation Plan
[Detail implementation phases and milestones]

## Risk Mitigation
[Identify potential risks and mitigation strategies]
`,
    
    'Budget': `
# Budget Breakdown

## Total Request: $${grant.amount.toLocaleString()}

### Personnel (40%)
- Project Lead: $[amount]
- Research Staff: $[amount]
- Administrative: $[amount]

### Equipment (30%)
- [Equipment category]: $[amount]
- [Equipment category]: $[amount]

### Operations (20%)
- [Operational expense]: $[amount]
- [Operational expense]: $[amount]

### Contingency (10%)
- Risk buffer: $[amount]
`
  };
  
  return templates[sectionTitle] || `
# ${sectionTitle}

[This section needs to be completed with relevant information for the ${grant.sector} sector]

## Key Points
- [Point 1]
- [Point 2]
- [Point 3]

## Details
[Provide detailed information relevant to ${sectionTitle}]
`;
}

/**
 * Generate ceremonial invocation for sector
 * @param {string} sector - Grant sector
 * @returns {string} Ceremonial invocation
 */
function generateInvocation(sector) {
  const invocations = {
    FDA: "By the authority of health and safety, may this proposal serve the wellbeing of all",
    EDA: "In harmony with nature's wisdom, may this proposal honor our environmental stewardship",
    SAM: "With strategic vision and sovereign purpose, may this proposal advance our collective mission"
  };
  
  return invocations[sector] || "May this proposal be inscribed with clarity and purpose";
}

/**
 * Save proposal to file system
 * @param {object} proposal - Proposal object
 * @returns {string} File path where proposal was saved
 */
function saveProposal(proposal) {
  const proposalsDir = path.join(__dirname, '../../data/grants/proposals');
  if (!fs.existsSync(proposalsDir)) {
    fs.mkdirSync(proposalsDir, { recursive: true });
  }
  
  const filename = `${proposal.proposal_id}.json`;
  const filepath = path.join(proposalsDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(proposal, null, 2));
  
  // Create review message
  const reviewMessage = {
    timestamp: new Date().toISOString(),
    proposal_id: proposal.proposal_id,
    grant_id: proposal.grant_id,
    action: 'draft_created',
    sector: proposal.sector,
    status: 'ready_for_review'
  };
  
  const messageFile = path.join(__dirname, '../../messages/review', `${proposal.proposal_id}.json`);
  fs.writeFileSync(messageFile, JSON.stringify(reviewMessage, null, 2));
  
  return filepath;
}

/**
 * Process grant application into proposal
 * @param {string} grantFile - Path to grant application file
 * @returns {object} Processing result
 */
function draftProposalFromGrant(grantFile) {
  try {
    if (!fs.existsSync(grantFile)) {
      throw new Error(`Grant file not found: ${grantFile}`);
    }
    
    const grant = JSON.parse(fs.readFileSync(grantFile, 'utf8'));
    const proposal = generateProposal(grant);
    const filepath = saveProposal(proposal);
    
    console.log(`✅ Proposal ${proposal.proposal_id} created successfully`);
    console.log(`📁 Saved to: ${filepath}`);
    console.log(`📊 Sections: ${proposal.sections.length}`);
    console.log(`💰 L-Token allocation: ${proposal.metadata.calculated_ltokens}`);
    
    return {
      success: true,
      proposalId: proposal.proposal_id,
      filepath,
      ltokens: proposal.metadata.calculated_ltokens
    };
    
  } catch (error) {
    console.error('❌ Error drafting proposal:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📝 VC001 Proposal Drafter');
    console.log('Usage: node draft-proposal.js <grant-file.json>');
    console.log('       node draft-proposal.js --grant-id GRANT-123456');
    process.exit(1);
  }
  
  if (args[0] === '--grant-id') {
    const grantId = args[1];
    const grantFile = path.join(__dirname, '../../data/grants', `${grantId}.json`);
    draftProposalFromGrant(grantFile);
  } else {
    draftProposalFromGrant(args[0]);
  }
}

module.exports = {
  generateProposal,
  saveProposal,
  draftProposalFromGrant,
  generateSectionContent,
  SECTOR_TEMPLATES
};