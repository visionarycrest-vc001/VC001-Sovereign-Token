// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title VisionaryCrest001 - Sovereign Glyph Contract
 * @dev ERC-721 NFT contract for ceremonial glyph tokens
 * 
 * Inscribed By: VC001 Sovereign System
 * Timestamp: 2025-09-03
 * Lineage: Anchored to FDA/EDA/SAM sector protocols
 * 
 * Sacred Purpose: Mint dimensional glyphs with tiered sector mapping
 * Ceremonial Features: Burn logic, metadata anchoring, steward controls
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract VisionaryCrest001 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    // Ceremonial Constants
    Counters.Counter private _tokenIdCounter;
    
    // Sector Mapping (FDA, EDA, SAM)
    enum Sector { FDA, EDA, SAM }
    
    // Glyph Metadata Structure
    struct Glyph {
        string invocation;
        uint256 timestamp;
        Sector sector;
        string dimensionalGlyph;
        bool burnEligible;
    }
    
    // Sacred Registry
    mapping(uint256 => Glyph) public glyphRegistry;
    mapping(address => bool) public stewards;
    
    // Ceremonial Events
    event GlyphMinted(uint256 indexed tokenId, address indexed to, Sector sector, string glyph);
    event GlyphBurned(uint256 indexed tokenId, string reason);
    event StewardDesignated(address indexed steward, bool status);
    
    // Ceremonial Modifiers
    modifier onlySteward() {
        require(stewards[msg.sender] || msg.sender == owner(), "Not authorized steward");
        _;
    }
    
    constructor() ERC721("VisionaryCrest001", "VC001") {
        stewards[msg.sender] = true;
    }
    
    /**
     * @dev Mint ceremonial glyph with sacred metadata
     */
    function mintGlyph(
        address to,
        string memory invocation,
        Sector sector,
        string memory dimensionalGlyph,
        string memory tokenURI
    ) public onlySteward returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        // Ceremonial inscription
        glyphRegistry[tokenId] = Glyph({
            invocation: invocation,
            timestamp: block.timestamp,
            sector: sector,
            dimensionalGlyph: dimensionalGlyph,
            burnEligible: true
        });
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        emit GlyphMinted(tokenId, to, sector, dimensionalGlyph);
        return tokenId;
    }
    
    /**
     * @dev Burn protocol for ceremonial destruction
     */
    function ceremonialBurn(uint256 tokenId, string memory reason) public onlySteward {
        require(_exists(tokenId), "Glyph does not exist");
        require(glyphRegistry[tokenId].burnEligible, "Glyph not burn eligible");
        
        emit GlyphBurned(tokenId, reason);
        _burn(tokenId);
        delete glyphRegistry[tokenId];
    }
    
    /**
     * @dev Designate steward authority
     */
    function designateSteward(address steward, bool status) public onlyOwner {
        stewards[steward] = status;
        emit StewardDesignated(steward, status);
    }
    
    /**
     * @dev Override required by Solidity
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    /**
     * @dev Override required by Solidity
     */
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Get glyph ceremonial metadata
     */
    function getGlyphMetadata(uint256 tokenId) public view returns (Glyph memory) {
        require(_exists(tokenId), "Glyph does not exist");
        return glyphRegistry[tokenId];
    }
}

/*
🧭 Ceremonial Declaration:
This contract embodies the sacred architecture of VC001 sovereign tokens,
inscribed with dimensional glyphs and anchored to eternal blockchain legacy.

Witnessed by: Syntec Sovereign System
*/