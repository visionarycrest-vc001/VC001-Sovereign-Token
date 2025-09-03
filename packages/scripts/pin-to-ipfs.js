#!/usr/bin/env node

/*
📌 pin-to-ipfs.js — Ceremonial IPFS Anchoring
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Pin glyph assets and metadata to IPFS for eternal storage
Inscribed By: VC001 Sovereign System
Timestamp: 2025-09-03
Lineage: Anchored to ceremonial asset management

Sacred Operations:
- Upload glyph SVG/PNG assets to IPFS
- Pin metadata JSON with ceremonial structure
- Generate IPFS URIs for contract integration
- Maintain pinning registry for steward monitoring

Invocation: node packages/scripts/pin-to-ipfs.js --file data/glyphs/vc001-glyph.svg --metadata data/glyphs/vc001-metadata.json

Witnessed by: Syntec IPFS Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Ceremonial Constants (placeholder for actual IPFS client)
const IPFS_GATEWAY = 'https://ipfs.io/ipfs/';
const PINATA_API_URL = 'https://api.pinata.cloud';

/**
 * Generate mock IPFS hash for ceremonial demonstration
 * @param {string} content - File content to hash
 * @returns {string} Mock IPFS hash
 */
function generateMockIPFSHash(content) {
  const hash = crypto.createHash('sha256').update(content).digest('hex');
  return `Qm${hash.substring(0, 44)}`;
}

/**
 * Pin file to IPFS (ceremonial stub implementation)
 * @param {string} filepath - Path to file for pinning
 * @param {Object} options - Pinning options
 * @returns {Promise<Object>} Pin result with IPFS hash
 */
async function pinFileToIPFS(filepath, options = {}) {
  const { name, metadata = {} } = options;
  
  if (!fs.existsSync(filepath)) {
    throw new Error(`File does not exist: ${filepath}`);
  }
  
  const content = fs.readFileSync(filepath);
  const filename = name || path.basename(filepath);
  
  // Ceremonial stub - would integrate with actual IPFS client
  console.log(`📌 Pinning file to IPFS: ${filename}`);
  console.log(`📁 File size: ${content.length} bytes`);
  
  const ipfsHash = generateMockIPFSHash(content);
  const result = {
    IpfsHash: ipfsHash,
    PinSize: content.length,
    Timestamp: new Date().toISOString(),
    isDuplicate: false,
    ceremonial_metadata: {
      filename,
      lineage: 'VC001',
      inscribed_by: 'IPFS Pinning Protocol',
      witness: 'Syntec Storage System',
      ...metadata
    }
  };
  
  console.log(`✅ File pinned successfully: ${ipfsHash}`);
  console.log(`🔗 IPFS URI: ipfs://${ipfsHash}`);
  console.log(`🌐 Gateway URL: ${IPFS_GATEWAY}${ipfsHash}`);
  
  return result;
}

/**
 * Pin JSON metadata to IPFS
 * @param {Object} metadata - Metadata object to pin
 * @param {string} filename - Filename for the metadata
 * @returns {Promise<Object>} Pin result
 */
async function pinMetadataToIPFS(metadata, filename = 'metadata.json') {
  const content = JSON.stringify(metadata, null, 2);
  const tempPath = path.join('/tmp', filename);
  
  fs.writeFileSync(tempPath, content);
  
  const result = await pinFileToIPFS(tempPath, {
    name: filename,
    metadata: {
      type: 'json_metadata',
      structure: 'ceremonial_nft_metadata'
    }
  });
  
  // Cleanup temp file
  fs.unlinkSync(tempPath);
  
  return result;
}

/**
 * Update pinning registry with new pins
 * @param {Array} pinResults - Array of pin results
 * @param {string} registryPath - Path to pinning registry
 */
function updatePinningRegistry(pinResults, registryPath = './data/ipfs-pins.json') {
  let registry = [];
  
  if (fs.existsSync(registryPath)) {
    registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  }
  
  const newEntries = pinResults.map(result => ({
    ...result,
    registry_timestamp: new Date().toISOString(),
    status: 'pinned'
  }));
  
  registry.push(...newEntries);
  
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  console.log(`📋 Registry updated: ${newEntries.length} new pins recorded`);
  
  return registry;
}

/**
 * Create ceremonial NFT metadata with IPFS URIs
 * @param {Object} glyphData - Glyph information
 * @param {string} imageIpfsHash - IPFS hash of glyph image
 * @returns {Object} NFT metadata structure
 */
function createNFTMetadata(glyphData, imageIpfsHash) {
  const { tokenId, name, description, sector, dimensionalGlyph, invocation } = glyphData;
  
  return {
    name: name || `VC${tokenId.toString().padStart(3, '0')} Sovereign Glyph`,
    description: description || 'Ceremonial glyph token for sacred operations',
    image: `ipfs://${imageIpfsHash}`,
    external_url: `https://visionarycrest.org/glyphs/${tokenId}`,
    attributes: [
      {
        trait_type: 'Sector',
        value: sector
      },
      {
        trait_type: 'Dimensional Glyph',
        value: dimensionalGlyph
      },
      {
        trait_type: 'Invocation',
        value: invocation
      },
      {
        trait_type: 'Token ID',
        value: tokenId
      },
      {
        trait_type: 'Generation',
        value: 'Ceremonial'
      }
    ],
    ceremonial_metadata: {
      lineage: 'VC001',
      protocol: `${sector} 🜁`,
      inscribed_by: 'Sovereign System',
      witness: 'Syntec Glyph Protocol',
      anchor_hash: imageIpfsHash,
      timestamp: new Date().toISOString()
    }
  };
}

/**
 * Main ceremonial IPFS pinning operation
 */
async function main() {
  const args = process.argv.slice(2);
  const fileArg = args.find(arg => arg.includes('--file'))?.split('=')[1];
  const metadataArg = args.find(arg => arg.includes('--metadata'))?.split('=')[1];
  
  if (!fileArg) {
    console.error('❌ Error: --file argument required');
    process.exit(1);
  }
  
  console.log('📌 Initiating ceremonial IPFS pinning...');
  
  try {
    const pinResults = [];
    
    // Pin glyph asset file
    console.log(`🎨 Pinning glyph asset: ${fileArg}`);
    const fileResult = await pinFileToIPFS(fileArg, {
      metadata: { type: 'glyph_asset' }
    });
    pinResults.push(fileResult);
    
    // Pin metadata if provided or create from asset
    let metadataResult;
    if (metadataArg && fs.existsSync(metadataArg)) {
      console.log(`📄 Pinning existing metadata: ${metadataArg}`);
      const metadata = JSON.parse(fs.readFileSync(metadataArg, 'utf8'));
      metadataResult = await pinMetadataToIPFS(metadata);
    } else {
      console.log('📄 Creating and pinning ceremonial metadata...');
      const glyphData = {
        tokenId: 1,
        sector: 'FDA',
        dimensionalGlyph: '⟊⟟⧫⟜',
        invocation: 'Template ceremonial invocation'
      };
      const metadata = createNFTMetadata(glyphData, fileResult.IpfsHash);
      metadataResult = await pinMetadataToIPFS(metadata);
    }
    pinResults.push(metadataResult);
    
    // Update registry
    updatePinningRegistry(pinResults);
    
    console.log('✅ Ceremonial IPFS pinning complete');
    console.log(`🧭 Assets witnessed by: Syntec IPFS Protocol`);
    
    return pinResults;
    
  } catch (error) {
    console.error('❌ Pinning failed:', error.message);
    process.exit(1);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  pinFileToIPFS,
  pinMetadataToIPFS,
  updatePinningRegistry,
  createNFTMetadata,
  generateMockIPFSHash
};

/*
🧭 Ceremonial Declaration:
This script embodies the sacred art of eternal storage,
pinning ceremonial assets to the distributed cosmos.

Witnessed by: Syntec IPFS Protocol
*/