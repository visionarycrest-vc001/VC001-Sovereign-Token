/**
 * 🪙 Glyph Minting Manager
 * 
 * Ceremonial script for minting VC001 glyphs from approved grants
 * Handles blockchain interaction and metadata generation
 * 
 * @file packages/scripts/mint-glyph.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Generate dimensional glyph attributes based on grant data
 * @param {object} grant - Grant application
 * @param {object} submission - Grant submission
 * @returns {object} Dimensional attributes
 */
function generateDimensionalAttributes(grant, submission) {
  const geometries = ['tetrahedron', 'cube', 'octahedron', 'dodecahedron', 'icosahedron'];
  const sectorColors = {
    FDA: ['#FF4444', '#FF8888', '#FFCCCC'], // Red spectrum for health
    EDA: ['#44FF44', '#88FF88', '#CCFFCC'], // Green spectrum for environment  
    SAM: ['#4444FF', '#8888FF', '#CCCCFF']  // Blue spectrum for strategy
  };
  
  // Use grant ID and submission score to deterministically generate attributes
  const seed = parseInt(grant.id.split('-')[1]) + Math.floor(submission.review_summary.average_score);
  const rng = () => (seed * 9301 + 49297) % 233280 / 233280;
  
  return {
    geometry: geometries[Math.floor(rng() * geometries.length)],
    resonance: Math.round((submission.review_summary.average_score / 100) * 100) / 100,
    phase: Math.floor(rng() * 360),
    color_spectrum: sectorColors[grant.sector] || sectorColors.SAM,
    energy_level: Math.ceil(submission.review_summary.average_score / 10)
  };
}

/**
 * Generate glyph metadata for IPFS
 * @param {object} grant - Grant application
 * @param {object} submission - Grant submission  
 * @param {string} glyphId - Generated glyph ID
 * @returns {object} Glyph metadata
 */
function generateGlyphMetadata(grant, submission, glyphId) {
  const attributes = generateDimensionalAttributes(grant, submission);
  
  return {
    name: `VisionaryCrest Glyph #${glyphId}`,
    description: `Sovereign glyph representing approved grant ${grant.title} in the ${grant.sector} sector`,
    image: `ipfs://QmGlyphImage${glyphId}`, // Placeholder IPFS hash
    animation_url: `ipfs://QmGlyphAnimation${glyphId}`, // Placeholder for 4D/5D animation
    
    attributes: [
      { trait_type: "Sector", value: grant.sector },
      { trait_type: "Grant Amount", value: grant.amount },
      { trait_type: "Review Score", value: submission.review_summary.average_score },
      { trait_type: "Geometry", value: attributes.geometry },
      { trait_type: "Resonance", value: attributes.resonance },
      { trait_type: "Phase", value: attributes.phase },
      { trait_type: "Energy Level", value: attributes.energy_level },
      { trait_type: "L-Token Allocation", value: submission.recommendation.estimated_ltokens }
    ],
    
    properties: {
      glyph_id: glyphId,
      grant_id: grant.id,
      submission_id: submission.submission_id,
      mint_timestamp: new Date().toISOString(),
      dimensional_attributes: attributes,
      sector_classification: grant.sector,
      approval_lineage: submission.ceremonial_data.lineage
    }
  };
}

/**
 * Create glyph record for data storage
 * @param {object} grant - Grant application
 * @param {object} submission - Grant submission
 * @param {string} recipient - Wallet address
 * @param {number} tokenId - Blockchain token ID
 * @returns {object} Glyph record
 */
function createGlyphRecord(grant, submission, recipient, tokenId) {
  const glyphId = `VC001-${grant.sector}-${tokenId.toString().padStart(8, '0')}`;
  const metadata = generateGlyphMetadata(grant, submission, glyphId);
  
  return {
    id: glyphId,
    grant_id: grant.id,
    sector: grant.sector,
    token_id: tokenId,
    owner: recipient,
    mint_timestamp: new Date().toISOString(),
    metadata_uri: `ipfs://QmMetadata${glyphId}`, // Placeholder IPFS hash
    
    dimensional_attributes: metadata.properties.dimensional_attributes,
    
    ceremonial_data: {
      inscribed_by: 'Glyph Minting Manager',
      invocation: generateMintingInvocation(grant.sector, submission.review_summary.average_score),
      lineage: [submission.ceremonial_data.lineage, `Glyph-${Date.now()}`],
      blessing: `May this glyph embody the sovereign purpose of ${grant.title}`
    },
    
    operational_data: {
      burn_status: false,
      burn_reason: null,
      ltoken_allocation: submission.recommendation.estimated_ltokens,
      transfer_count: 0,
      last_activity: new Date().toISOString()
    },
    
    verification: {
      checksum: generateChecksum(glyphId, tokenId, grant.id),
      signature: generateSignature(glyphId, recipient),
      proof_uri: `ipfs://QmProof${glyphId}`
    }
  };
}

/**
 * Generate minting invocation
 * @param {string} sector - Grant sector
 * @param {number} score - Review score
 * @returns {string} Ceremonial invocation
 */
function generateMintingInvocation(sector, score) {
  const invocations = {
    FDA: `By the sacred geometry of healing, scored ${score.toFixed(1)}, let this glyph manifest wellness and protection`,
    EDA: `Through nature's eternal wisdom, scored ${score.toFixed(1)}, let this glyph bloom with environmental harmony`,
    SAM: `With sovereign authority and purpose, scored ${score.toFixed(1)}, let this glyph embody strategic excellence`
  };
  
  return invocations[sector] || `With divine purpose, scored ${score.toFixed(1)}, let this glyph shine with sovereign light`;
}

/**
 * Generate verification checksum
 * @param {string} glyphId - Glyph identifier
 * @param {number} tokenId - Token ID
 * @param {string} grantId - Grant ID
 * @returns {string} Checksum
 */
function generateChecksum(glyphId, tokenId, grantId) {
  return crypto.createHash('sha256')
    .update(`${glyphId}-${tokenId}-${grantId}`)
    .digest('hex')
    .slice(0, 16);
}

/**
 * Generate cryptographic signature
 * @param {string} glyphId - Glyph identifier
 * @param {string} recipient - Recipient address
 * @returns {string} Signature
 */
function generateSignature(glyphId, recipient) {
  return crypto.createHash('sha256')
    .update(`${glyphId}-${recipient}-${Date.now()}`)
    .digest('hex');
}

/**
 * Simulate blockchain minting (in production, this would interact with smart contract)
 * @param {object} glyph - Glyph record
 * @returns {object} Minting result
 */
function simulateBlockchainMint(glyph) {
  // Simulate transaction processing
  const txHash = crypto.randomBytes(32).toString('hex');
  const blockNumber = Math.floor(Math.random() * 1000000) + 15000000;
  const gasUsed = Math.floor(Math.random() * 50000) + 100000;
  
  return {
    success: true,
    transaction_hash: `0x${txHash}`,
    block_number: blockNumber,
    gas_used: gasUsed,
    token_id: glyph.token_id,
    contract_address: '0x742d35cc6cf6c00532853c5b2b5e9c6e7b8f1234', // Placeholder
    minted_at: new Date().toISOString()
  };
}

/**
 * Process glyph minting for approved submission
 * @param {string} submissionId - Submission identifier
 * @param {string} recipient - Recipient wallet address
 * @returns {object} Minting result
 */
function mintGlyph(submissionId, recipient) {
  try {
    console.log(`🪙 Minting glyph for submission ${submissionId}...`);
    
    // Load submission
    const submissionFile = path.join(__dirname, '../../data/grants/submissions', `${submissionId}.json`);
    if (!fs.existsSync(submissionFile)) {
      throw new Error(`Submission not found: ${submissionId}`);
    }
    const submission = JSON.parse(fs.readFileSync(submissionFile, 'utf8'));
    
    // Load grant
    const grantFile = path.join(__dirname, '../../data/grants', `${submission.grant_id}.json`);
    const grant = JSON.parse(fs.readFileSync(grantFile, 'utf8'));
    
    // Validate submission is approved
    if (!['immediate_approval', 'conditional_approval'].includes(submission.recommendation.action)) {
      throw new Error(`Submission not approved: ${submission.recommendation.action}`);
    }
    
    // Generate token ID (in production, this would come from smart contract)
    const tokenId = Date.now() % 1000000;
    
    // Create glyph record
    const glyph = createGlyphRecord(grant, submission, recipient, tokenId);
    
    // Simulate blockchain minting
    const mintResult = simulateBlockchainMint(glyph);
    if (!mintResult.success) {
      throw new Error('Blockchain minting failed');
    }
    
    // Save glyph record
    const glyphsDir = path.join(__dirname, '../../data/glyphs');
    if (!fs.existsSync(glyphsDir)) {
      fs.mkdirSync(glyphsDir, { recursive: true });
    }
    
    const glyphFile = path.join(glyphsDir, `${glyph.id}.json`);
    glyph.blockchain_data = mintResult;
    fs.writeFileSync(glyphFile, JSON.stringify(glyph, null, 2));
    
    // Update grant status
    grant.status = 'minted';
    grant.glyph_id = glyph.id;
    grant.token_id = tokenId;
    grant.minted_date = glyph.mint_timestamp;
    fs.writeFileSync(grantFile, JSON.stringify(grant, null, 2));
    
    // Create minting message
    const message = {
      timestamp: new Date().toISOString(),
      glyph_id: glyph.id,
      grant_id: grant.id,
      submission_id: submissionId,
      action: 'glyph_minted',
      recipient: recipient,
      token_id: tokenId,
      transaction_hash: mintResult.transaction_hash,
      ltoken_allocation: glyph.operational_data.ltoken_allocation
    };
    
    const messageFile = path.join(__dirname, '../../messages/minted', `${glyph.id}.json`);
    fs.writeFileSync(messageFile, JSON.stringify(message, null, 2));
    
    console.log(`✅ Glyph ${glyph.id} minted successfully`);
    console.log(`🪙 Token ID: ${tokenId}`);
    console.log(`📜 Transaction: ${mintResult.transaction_hash}`);
    console.log(`💰 L-Token Allocation: ${glyph.operational_data.ltoken_allocation}`);
    console.log(`📁 Saved to: ${glyphFile}`);
    
    return {
      success: true,
      glyphId: glyph.id,
      tokenId: tokenId,
      transactionHash: mintResult.transaction_hash,
      ltokenAllocation: glyph.operational_data.ltoken_allocation,
      filepath: glyphFile
    };
    
  } catch (error) {
    console.error('❌ Error minting glyph:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('🪙 VC001 Glyph Minting Manager');
    console.log('Usage: node mint-glyph.js <submission-id> <recipient-address>');
    console.log('Example: node mint-glyph.js SUB-123456 0x742d35cc6cf6c00532853c5b2b5e9c6e7b8f1234');
    process.exit(1);
  }
  
  const submissionId = args[0];
  const recipient = args[1];
  
  // Basic address validation
  if (!recipient.startsWith('0x') || recipient.length !== 42) {
    console.error('❌ Invalid recipient address format');
    process.exit(1);
  }
  
  mintGlyph(submissionId, recipient);
}

module.exports = {
  mintGlyph,
  createGlyphRecord,
  generateGlyphMetadata,
  generateDimensionalAttributes
};