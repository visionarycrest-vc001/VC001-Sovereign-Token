// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title VisionaryCrest001
 * @dev Sovereign NFT contract for VC001 Visionary Crest ecosystem
 * 
 * 🛡️ Ceremonial Features:
 * - Sovereign token minting with glyph metadata
 * - Tiered sector mapping (FDA, EDA, SAM)
 * - Burn ceremony for token retirement
 * - Grant lineage tracking
 * - Steward authority management
 * 
 * Inscribed by: Percy Abrams Jr.
 * Lineage: Anchored to VC001 Sovereign Token Protocol
 * Timestamp: 2025-09-03T05:10:00Z
 */
contract VisionaryCrest001 is ERC721, ERC721Burnable, Ownable, Pausable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Ceremonial constants
    uint256 public constant MAX_SUPPLY = 999;
    uint256 public constant SECTOR_FDA = 1;
    uint256 public constant SECTOR_EDA = 2;
    uint256 public constant SECTOR_SAM = 3;
    
    // Token metadata structure
    struct TokenMetadata {
        string glyph;           // Sovereign glyph (e.g., "⟊⟟⧫⟜")
        uint256 sector;         // Grant sector (FDA/EDA/SAM)
        string invocation;      // Grant invocation text
        uint256 timestamp;      // Minting timestamp
        address steward;        // Token steward/guardian
        bool isRetired;         // Ceremonial retirement status
    }
    
    // Mappings
    mapping(uint256 => TokenMetadata) public tokenMetadata;
    mapping(address => bool) public authorizedStewards;
    mapping(uint256 => string) private _tokenURIs;
    
    // Events
    event SovereignMinted(uint256 indexed tokenId, address indexed steward, string glyph);
    event CeremonialBurn(uint256 indexed tokenId, string reason);
    event StewardAuthorized(address indexed steward);
    event MetadataUpdated(uint256 indexed tokenId);
    
    constructor() ERC721("VisionaryCrest001", "VC001") {
        // Authorize contract deployer as first steward
        authorizedStewards[msg.sender] = true;
    }
    
    /**
     * @dev Mint sovereign token with ceremonial metadata
     * @param to Token recipient address
     * @param glyph Sovereign glyph string
     * @param sector Grant sector (1=FDA, 2=EDA, 3=SAM)
     * @param invocation Grant invocation text
     */
    function mintSovereign(
        address to,
        string memory glyph,
        uint256 sector,
        string memory invocation
    ) public onlyAuthorizedSteward whenNotPaused {
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Max supply reached");
        require(sector >= 1 && sector <= 3, "Invalid sector");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        
        tokenMetadata[tokenId] = TokenMetadata({
            glyph: glyph,
            sector: sector,
            invocation: invocation,
            timestamp: block.timestamp,
            steward: msg.sender,
            isRetired: false
        });
        
        emit SovereignMinted(tokenId, msg.sender, glyph);
    }
    
    /**
     * @dev Ceremonial burn with reason inscription
     * @param tokenId Token to burn
     * @param reason Ceremonial burn reason
     */
    function ceremonialBurn(uint256 tokenId, string memory reason) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Not authorized to burn");
        
        tokenMetadata[tokenId].isRetired = true;
        _burn(tokenId);
        
        emit CeremonialBurn(tokenId, reason);
    }
    
    /**
     * @dev Authorize new steward
     * @param steward Address to authorize
     */
    function authorizeSteward(address steward) public onlyOwner {
        authorizedStewards[steward] = true;
        emit StewardAuthorized(steward);
    }
    
    /**
     * @dev Update token metadata URI
     * @param tokenId Token to update
     * @param uri New metadata URI
     */
    function updateTokenURI(uint256 tokenId, string memory uri) public onlyAuthorizedSteward {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = uri;
        emit MetadataUpdated(tokenId);
    }
    
    /**
     * @dev Get token URI with metadata
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    /**
     * @dev Get current token supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
    
    /**
     * @dev Emergency pause mechanism
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    // Modifiers
    modifier onlyAuthorizedSteward() {
        require(authorizedStewards[msg.sender] || msg.sender == owner(), "Not authorized steward");
        _;
    }
    
    // Override required by Solidity
    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }
}