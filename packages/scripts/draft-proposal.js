#!/usr/bin/env node

/*
📝 draft-proposal.js — Ceremonial Proposal Generator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Generate AI-assisted grant proposals using Syntec Glyph Writer bot
Inscribed By: VC001 Sovereign System
Timestamp: 2025-09-03
Lineage: Anchored to ceremonial proposal generation

Sacred Operations:
- Generate grant proposal templates
- Apply AI-assisted content enhancement
- Validate proposal against sector requirements
- Format for submission workflow

Invocation: node packages/scripts/draft-proposal.js --sector FDA --topic "Rural health AI diagnostics" --amount 75000

Witnessed by: Syntec Proposal Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const fs = require('fs');
const path = require('path');

// Ceremonial Constants
const SECTOR_TEMPLATES = {
  FDA: {
    focus_areas: ['Healthcare Innovation', 'Medical Devices', 'Drug Development', 'Digital Health'],
    requirements: ['Clinical Validation', 'Regulatory Compliance', 'Patient Safety', 'Evidence-Based Results'],
    budget_range: [25000, 250000],
    duration_months: [6, 24]
  },
  EDA: {
    focus_areas: ['Economic Development', 'Small Business Support', 'Innovation Ecosystems', 'Workforce Development'],
    requirements: ['Economic Impact', 'Job Creation', 'Community Benefit', 'Sustainability Plan'],
    budget_range: [10000, 150000],
    duration_months: [3, 18]
  },
  SAM: {
    focus_areas: ['Defense Technology', 'Cybersecurity', 'Advanced Manufacturing', 'Research & Development'],
    requirements: ['Security Clearance', 'Technical Innovation', 'National Interest', 'Delivery Timeline'],
    budget_range: [50000, 500000],
    duration_months: [12, 36]
  }
};

const PROPOSAL_SECTIONS = [
  'executive_summary',
  'problem_statement',
  'solution_approach',
  'technical_methodology',
  'budget_breakdown',
  'timeline_milestones',
  'expected_outcomes',
  'risk_assessment',
  'team_qualifications',
  'ceremonial_compliance'
];

/**
 * Validate proposal parameters
 * @param {Object} params - Proposal parameters
 * @returns {boolean} Validation result
 */
function validateProposalParams(params) {
  const { sector, topic, amount, duration } = params;
  
  if (!sector || !SECTOR_TEMPLATES[sector]) {
    throw new Error(`Invalid sector. Must be one of: ${Object.keys(SECTOR_TEMPLATES).join(', ')}`);
  }
  
  if (!topic || topic.length < 10) {
    throw new Error('Topic must be at least 10 characters');
  }
  
  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error('Amount must be a positive number');
  }
  
  const template = SECTOR_TEMPLATES[sector];
  if (amount < template.budget_range[0] || amount > template.budget_range[1]) {
    throw new Error(`Amount must be between $${template.budget_range[0]} and $${template.budget_range[1]} for ${sector} sector`);
  }
  
  if (duration && (duration < template.duration_months[0] || duration > template.duration_months[1])) {
    throw new Error(`Duration must be between ${template.duration_months[0]} and ${template.duration_months[1]} months for ${sector} sector`);
  }
  
  return true;
}

/**
 * Generate AI-assisted content for proposal section
 * @param {string} section - Proposal section name
 * @param {Object} params - Proposal parameters
 * @returns {string} Generated content
 */
function generateSectionContent(section, params) {
  const { sector, topic, amount, duration } = params;
  const template = SECTOR_TEMPLATES[sector];
  
  // Ceremonial stub - would integrate with actual AI service
  switch (section) {
    case 'executive_summary':
      return `This proposal presents an innovative ${sector} initiative focused on ${topic.toLowerCase()}. Our approach leverages cutting-edge technology to address critical challenges in the ${sector.toLowerCase()} sector, with an anticipated budget of $${amount.toLocaleString()} over ${duration || template.duration_months[0]} months. The project aligns with ${template.focus_areas[0]} priorities and demonstrates significant potential for ${template.requirements[0].toLowerCase()}.`;
      
    case 'problem_statement':
      return `Current challenges in ${topic.toLowerCase()} within the ${sector} sector include limited access, outdated methodologies, and insufficient technological integration. This proposal addresses these gaps through innovative solutions that meet ${template.requirements.join(', ').toLowerCase()} standards.`;
      
    case 'solution_approach':
      return `Our solution employs a multi-phase approach combining advanced technology, stakeholder engagement, and evidence-based methodologies. The approach is designed to meet ${sector} sector requirements for ${template.requirements[0].toLowerCase()} while ensuring sustainable impact.`;
      
    case 'technical_methodology':
      return `The technical framework incorporates proven methodologies adapted for ${topic.toLowerCase()}. Our approach ensures compliance with ${sector} standards and leverages industry best practices for optimal outcomes.`;
      
    case 'budget_breakdown':
      const personnel = Math.round(amount * 0.4);
      const equipment = Math.round(amount * 0.3);
      const materials = Math.round(amount * 0.2);
      const overhead = amount - personnel - equipment - materials;
      return `Personnel (40%): $${personnel.toLocaleString()}\nEquipment (30%): $${equipment.toLocaleString()}\nMaterials (20%): $${materials.toLocaleString()}\nOverhead (10%): $${overhead.toLocaleString()}\nTotal: $${amount.toLocaleString()}`;
      
    case 'timeline_milestones':
      const months = duration || template.duration_months[0];
      const quarterLength = Math.ceil(months / 4);
      return `Q1 (Months 1-${quarterLength}): Project initiation and setup\nQ2 (Months ${quarterLength + 1}-${quarterLength * 2}): Development and implementation\nQ3 (Months ${quarterLength * 2 + 1}-${quarterLength * 3}): Testing and validation\nQ4 (Months ${quarterLength * 3 + 1}-${months}): Deployment and evaluation`;
      
    case 'expected_outcomes':
      return `Expected outcomes include significant advancement in ${topic.toLowerCase()}, measurable impact on ${template.focus_areas[0].toLowerCase()}, and demonstrable progress toward ${template.requirements[0].toLowerCase()}. Success metrics will be established to ensure accountability and impact measurement.`;
      
    case 'risk_assessment':
      return `Key risks include technical challenges, regulatory compliance issues, and timeline constraints. Mitigation strategies have been developed for each risk category, with contingency plans for critical path items.`;
      
    case 'team_qualifications':
      return `Our team brings extensive experience in ${topic.toLowerCase()} and ${sector} sector operations. Team members possess relevant certifications, demonstrated track records, and the technical expertise required for successful project execution.`;
      
    case 'ceremonial_compliance':
      return `This proposal adheres to VC001 ceremonial protocols and maintains compliance with sovereign token governance. All activities will be conducted with appropriate steward oversight and witnessed validation according to established procedures.`;
      
    default:
      return `[AI-generated content for ${section} - Topic: ${topic}, Sector: ${sector}]`;
  }
}

/**
 * Generate complete proposal document
 * @param {Object} params - Proposal parameters
 * @returns {Object} Generated proposal
 */
function generateProposal(params) {
  const { sector, topic, amount, duration, applicant } = params;
  
  validateProposalParams(params);
  
  console.log('📝 Generating ceremonial proposal...');
  console.log(`🏛️ Sector: ${sector}`);
  console.log(`📋 Topic: ${topic}`);
  console.log(`💰 Amount: $${amount.toLocaleString()}`);
  
  const template = SECTOR_TEMPLATES[sector];
  const proposalDuration = duration || template.duration_months[0];
  
  const proposal = {
    metadata: {
      title: `${sector} Grant Proposal: ${topic}`,
      sector: sector,
      requested_amount: amount,
      duration_months: proposalDuration,
      generated_at: new Date().toISOString(),
      version: '1.0',
      status: 'draft'
    },
    applicant: {
      name: applicant?.name || 'AI-Generated Proposal',
      organization: applicant?.organization || 'Ceremonial Organization',
      contact: applicant?.contact || 'ai-generated@example.org',
      wallet_address: applicant?.wallet_address || '0x0000000000000000000000000000000000000000'
    },
    content: {},
    ceremonial_metadata: {
      lineage: 'VC001',
      inscribed_by: 'Syntec Glyph Writer Bot',
      witness: 'AI Proposal Generation System',
      ai_generated: true,
      sector_template: sector,
      focus_areas: template.focus_areas,
      requirements: template.requirements
    }
  };
  
  // Generate content for each section
  for (const section of PROPOSAL_SECTIONS) {
    console.log(`✨ Generating ${section}...`);
    proposal.content[section] = generateSectionContent(section, params);
  }
  
  console.log('✅ Proposal generation complete');
  return proposal;
}

/**
 * Save proposal to file
 * @param {Object} proposal - Generated proposal
 * @param {string} outputDir - Output directory
 * @returns {string} File path
 */
function saveProposal(proposal, outputDir = './drafts') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const sanitizedTitle = proposal.metadata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  
  const filename = `${sanitizedTitle}-${Date.now()}.json`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, JSON.stringify(proposal, null, 2));
  console.log(`📁 Proposal saved: ${filepath}`);
  
  return filepath;
}

/**
 * Generate markdown version for review
 * @param {Object} proposal - Generated proposal
 * @param {string} outputDir - Output directory
 * @returns {string} Markdown file path
 */
function generateMarkdownVersion(proposal, outputDir = './drafts') {
  const { metadata, applicant, content, ceremonial_metadata } = proposal;
  
  let markdown = `# ${metadata.title}\n\n`;
  markdown += `**Sector**: ${metadata.sector}  \n`;
  markdown += `**Requested Amount**: $${metadata.requested_amount.toLocaleString()}  \n`;
  markdown += `**Duration**: ${metadata.duration_months} months  \n`;
  markdown += `**Generated**: ${metadata.generated_at}  \n\n`;
  
  markdown += `## Applicant Information\n\n`;
  markdown += `- **Name**: ${applicant.name}\n`;
  markdown += `- **Organization**: ${applicant.organization}\n`;
  markdown += `- **Contact**: ${applicant.contact}\n`;
  markdown += `- **Wallet**: \`${applicant.wallet_address}\`\n\n`;
  
  for (const [section, sectionContent] of Object.entries(content)) {
    const title = section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    markdown += `## ${title}\n\n${sectionContent}\n\n`;
  }
  
  markdown += `---\n\n`;
  markdown += `**🧭 Ceremonial Declaration**: This proposal was generated by the Syntec Glyph Writer Bot according to ${metadata.sector} sector protocols and VC001 sovereign standards.\n\n`;
  markdown += `**Witnessed by**: ${ceremonial_metadata.witness}`;
  
  const sanitizedTitle = metadata.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');
  
  const filename = `${sanitizedTitle}-${Date.now()}.md`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, markdown);
  console.log(`📄 Markdown version saved: ${filepath}`);
  
  return filepath;
}

/**
 * Main ceremonial proposal generation
 */
function main() {
  const args = process.argv.slice(2);
  
  const sector = args.find(arg => arg.includes('--sector'))?.split('=')[1];
  const topic = args.find(arg => arg.includes('--topic'))?.split('=')[1];
  const amount = parseInt(args.find(arg => arg.includes('--amount'))?.split('=')[1]);
  const duration = args.find(arg => arg.includes('--duration'))?.split('=')[1];
  const outputDir = args.find(arg => arg.includes('--output'))?.split('=')[1] || './drafts';
  
  if (!sector || !topic || !amount) {
    console.error('❌ Error: --sector, --topic, and --amount arguments required');
    console.log('Usage: node draft-proposal.js --sector=FDA --topic="Healthcare innovation" --amount=50000 [options]');
    console.log('\nAvailable sectors: FDA, EDA, SAM');
    process.exit(1);
  }
  
  console.log('📝 Initiating ceremonial proposal generation...');
  
  try {
    const params = { 
      sector, 
      topic, 
      amount, 
      duration: duration ? parseInt(duration) : null 
    };
    
    const proposal = generateProposal(params);
    const jsonPath = saveProposal(proposal, outputDir);
    const markdownPath = generateMarkdownVersion(proposal, outputDir);
    
    console.log('\n✅ Ceremonial proposal generation complete');
    console.log(`📁 JSON: ${jsonPath}`);
    console.log(`📄 Markdown: ${markdownPath}`);
    console.log(`🧭 Generated by: Syntec Glyph Writer Bot`);
    
    return { proposal, jsonPath, markdownPath };
    
  } catch (error) {
    console.error('❌ Proposal generation failed:', error.message);
    process.exit(1);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateProposal,
  saveProposal,
  generateMarkdownVersion,
  validateProposalParams,
  generateSectionContent,
  SECTOR_TEMPLATES,
  PROPOSAL_SECTIONS
};

/*
🧭 Ceremonial Declaration:
This script embodies the sacred art of proposal creation,
channeling AI assistance for ceremonial grant generation.

Witnessed by: Syntec Proposal Protocol
*/