// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * 🏛️ VisionaryCrest001 - ERC-721 Glyph for Approved Grants
 * 
 * Ceremonial NFT contract representing sovereign grant approvals
 * Each token embodies a dimensional glyph tied to grant sectors (FDA, EDA, SAM)
 * 
 * @title VisionaryCrest001
 * @author Visionary Inc.
 * @version 1.0.0
 */
contract VisionaryCrest001 is ERC721, Ownable, Pausable {
    
    // 🔮 Glyph Structure
    struct Glyph {
        string sector;           // FDA, EDA, SAM
        uint256 grantId;         // Original grant identifier
        string metadata;         // IPFS hash for glyph metadata
        uint256 timestamp;       // Mint timestamp
        bool burned;             // Burn status for token lifecycle
    }
    
    // 📊 State Variables
    uint256 private _tokenIdCounter;
    mapping(uint256 => Glyph) public glyphs;
    mapping(string => bool) public sectorApproved;
    mapping(uint256 => uint256) public grantToToken;
    
    // 🎭 Events
    event GlyphMinted(uint256 indexed tokenId, string sector, uint256 grantId);
    event GlyphBurned(uint256 indexed tokenId, string reason);
    event SectorStatusChanged(string sector, bool approved);
    
    /**
     * Constructor - Initialize the ceremonial contract
     */
    constructor() ERC721("VisionaryCrest001", "VC001") {
        // Initialize approved sectors
        sectorApproved["FDA"] = true;
        sectorApproved["EDA"] = true; 
        sectorApproved["SAM"] = true;
    }
    
    /**
     * 🪙 Mint new glyph for approved grant
     * @param to Recipient address
     * @param sector Grant sector (FDA/EDA/SAM)
     * @param grantId Original grant identifier
     * @param metadataUri IPFS metadata URI
     */
    function mintGlyph(
        address to,
        string memory sector,
        uint256 grantId,
        string memory metadataUri
    ) external onlyOwner whenNotPaused {
        require(sectorApproved[sector], "Sector not approved");
        require(grantToToken[grantId] == 0, "Grant already minted");
        
        uint256 tokenId = _tokenIdCounter++;
        
        glyphs[tokenId] = Glyph({
            sector: sector,
            grantId: grantId,
            metadata: metadataUri,
            timestamp: block.timestamp,
            burned: false
        });
        
        grantToToken[grantId] = tokenId;
        
        _safeMint(to, tokenId);
        emit GlyphMinted(tokenId, sector, grantId);
    }
    
    /**
     * 🔥 Burn glyph with ceremonial reason
     * @param tokenId Token to burn
     * @param reason Burn justification
     */
    function burnGlyph(uint256 tokenId, string memory reason) 
        external 
        onlyOwner 
    {
        require(_exists(tokenId), "Token does not exist");
        require(!glyphs[tokenId].burned, "Token already burned");
        
        glyphs[tokenId].burned = true;
        _burn(tokenId);
        
        emit GlyphBurned(tokenId, reason);
    }
    
    /**
     * 🎯 Update sector approval status
     * @param sector Sector to update
     * @param approved New approval status
     */
    function setSectorApproval(string memory sector, bool approved) 
        external 
        onlyOwner 
    {
        sectorApproved[sector] = approved;
        emit SectorStatusChanged(sector, approved);
    }
    
    /**
     * ⏸️ Emergency pause functionality
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * 📋 Get glyph details
     * @param tokenId Token identifier
     * @return Glyph struct data
     */
    function getGlyph(uint256 tokenId) 
        external 
        view 
        returns (Glyph memory) 
    {
        require(_exists(tokenId), "Token does not exist");
        return glyphs[tokenId];
    }
    
    /**
     * 🔍 Check if grant has been minted
     * @param grantId Grant identifier
     * @return Token ID (0 if not minted)
     */
    function getTokenByGrant(uint256 grantId) 
        external 
        view 
        returns (uint256) 
    {
        return grantToToken[grantId];
    }
}