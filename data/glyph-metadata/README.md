# 🔮 Glyph Metadata Registry

This directory contains JSON metadata files for NFT glyphs minted through the VC001 Sovereign Protocol.

## 📁 File Structure

- `token-*.json` - Individual NFT metadata files
- `glyph-registry.md` - Ceremonial glyph minting log
- `mint-log.md` - Glyph minting ceremony log
- `update-log.md` - Metadata update ceremony log

## 🛡️ NFT Metadata Schema

Each NFT follows the ERC-721 metadata standard with ceremonial enhancements:

```json
{
  "name": "VC001 Sovereign Token #123",
  "description": "Sovereign token representing lineage and purpose within the VC001 ecosystem",
  "image": "https://visionarycrest.org/tokens/123.png",
  "external_url": "https://visionarycrest.org/tokens/123",
  "background_color": "000000",
  "animation_url": null,
  "attributes": [
    {
      "trait_type": "Token ID",
      "value": "123"
    },
    {
      "trait_type": "Glyph Type",
      "value": "sovereign"
    },
    {
      "trait_type": "Ceremonial Symbols",
      "value": "⟊⟟⧫⟜"
    },
    {
      "trait_type": "Grant Sector",
      "value": "FDA"
    },
    {
      "trait_type": "Steward Authority",
      "value": "Verified"
    }
  ]
}
```

## 🔮 Glyph Types

- **sovereign**: ⟊⟟⧫⟜ - Sovereign governance tokens
- **contributor**: 🔮⚡🛡️ - Contributor recognition tokens
- **grant**: 🌿💰📜 - Grant allocation tokens
- **steward**: 👑🗝️⚖️ - Steward authority tokens
- **auto**: 🤖✨🔄 - Automated system tokens

## 🧬 Ceremonial Commands

- `node scripts/mintGlyph.js <type> <recipient>` - Mint new glyph
- `node scripts/updateMetadata.js <tokenId> <updateType>` - Update metadata
- `node scripts/updateMetadata.js all metadata` - Batch update all tokens

## 🎨 IPFS Integration

Metadata files are designed for IPFS storage with ceremonial hash preservation:
- Images stored at: `ipfs://QmHash/image.png`
- Metadata stored at: `ipfs://QmHash/metadata.json`
- Animation files at: `ipfs://QmHash/animation.mp4`

---

*Inscribed by: Percy Abrams Jr.*  
*Lineage: Anchored to VisionaryCrest001.sol contract*  
*Timestamp: 2025-09-03T05:10:00Z*