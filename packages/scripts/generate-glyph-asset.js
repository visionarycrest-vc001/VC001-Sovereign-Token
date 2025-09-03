#!/usr/bin/env node

/*
🎨 generate-glyph-asset.js — Ceremonial Glyph Generator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Purpose: Generate visual glyph assets for ceremonial NFT tokens
Inscribed By: VC001 Sovereign System
Timestamp: 2025-09-03
Lineage: Anchored to VisionaryCrest001 contract

Sacred Operations:
- Generate dimensional glyph symbols (4D/5D logic)
- Create SVG assets with ceremonial styling
- Output PNG renders for IPFS/OpenSea compatibility
- Embed metadata anchoring and steward signatures

Invocation: node packages/scripts/generate-glyph-asset.js --token-id 001 --sector FDA --glyph "⟊⟟⧫⟜"

Witnessed by: Syntec Glyph Protocol
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/

const fs = require('fs');
const path = require('path');

// Ceremonial Constants
const SECTOR_COLORS = {
  FDA: '#d4af37', // Sacred Gold
  EDA: '#1e3a8a', // Ceremonial Blue  
  SAM: '#7c3aed'  // Sovereign Purple
};

const GLYPH_DIMENSIONS = {
  width: 512,
  height: 512,
  centerX: 256,
  centerY: 256
};

/**
 * Generate ceremonial SVG for dimensional glyph
 * @param {string} glyphSymbol - Unicode dimensional glyph
 * @param {string} sector - FDA/EDA/SAM classification
 * @param {number} tokenId - Token identifier
 * @returns {string} SVG markup
 */
function generateGlyphSVG(glyphSymbol, sector, tokenId) {
  const color = SECTOR_COLORS[sector] || SECTOR_COLORS.FDA;
  
  return `
<svg width="${GLYPH_DIMENSIONS.width}" height="${GLYPH_DIMENSIONS.height}" 
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="sacred-gradient" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </radialGradient>
    <filter id="ceremonial-glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge> 
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Sacred Background -->
  <rect width="100%" height="100%" fill="url(#sacred-gradient)"/>
  
  <!-- Ceremonial Border -->
  <rect x="20" y="20" width="472" height="472" 
        fill="none" stroke="${color}" stroke-width="4" opacity="0.6"/>
  
  <!-- Dimensional Glyph -->
  <text x="${GLYPH_DIMENSIONS.centerX}" y="${GLYPH_DIMENSIONS.centerY}" 
        font-family="serif" font-size="120" fill="${color}" 
        text-anchor="middle" dominant-baseline="central"
        filter="url(#ceremonial-glow)">${glyphSymbol}</text>
  
  <!-- Token Identifier -->
  <text x="40" y="40" font-family="monospace" font-size="14" fill="${color}" opacity="0.8">
    VC${tokenId.toString().padStart(3, '0')}
  </text>
  
  <!-- Sector Classification -->
  <text x="472" y="472" font-family="monospace" font-size="14" fill="${color}" opacity="0.8" text-anchor="end">
    ${sector}
  </text>
  
  <!-- Ceremonial Timestamp -->
  <text x="${GLYPH_DIMENSIONS.centerX}" y="480" 
        font-family="monospace" font-size="10" fill="${color}" opacity="0.6" text-anchor="middle">
    ${new Date().toISOString()}
  </text>
</svg>`.trim();
}

/**
 * Save glyph asset to ceremonial directory
 * @param {string} svgContent - Generated SVG markup
 * @param {number} tokenId - Token identifier
 * @param {string} outputDir - Output directory path
 */
function saveGlyphAsset(svgContent, tokenId, outputDir = './data/glyphs') {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const filename = `vc${tokenId.toString().padStart(3, '0')}-glyph.svg`;
  const filepath = path.join(outputDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`🎨 Glyph asset generated: ${filepath}`);
  
  return filepath;
}

/**
 * Main ceremonial glyph generation
 */
function main() {
  const args = process.argv.slice(2);
  const tokenId = args.find(arg => arg.includes('--token-id'))?.split('=')[1] || '001';
  const sector = args.find(arg => arg.includes('--sector'))?.split('=')[1] || 'FDA';
  const glyph = args.find(arg => arg.includes('--glyph'))?.split('=')[1] || '⟊⟟⧫⟜';
  
  console.log('🎨 Initiating ceremonial glyph generation...');
  console.log(`📋 Token ID: ${tokenId}`);
  console.log(`🏛️ Sector: ${sector}`);
  console.log(`🔮 Glyph: ${glyph}`);
  
  const svgContent = generateGlyphSVG(glyph, sector, parseInt(tokenId));
  const filepath = saveGlyphAsset(svgContent, parseInt(tokenId));
  
  console.log('✅ Ceremonial glyph generation complete');
  console.log(`🧭 Asset witnessed by: Syntec Glyph Protocol`);
  
  return filepath;
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  generateGlyphSVG,
  saveGlyphAsset,
  SECTOR_COLORS,
  GLYPH_DIMENSIONS
};

/*
🧭 Ceremonial Declaration:
This script embodies the sacred art of glyph generation,
creating dimensional assets for eternal blockchain anchoring.

Witnessed by: Syntec Glyph Protocol
*/