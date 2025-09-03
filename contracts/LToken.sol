// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * 🪙 LToken - ERC-20 Token Linked to Glyphs
 * 
 * Ceremonial utility token that represents operational value
 * Linked to VisionaryCrest001 glyphs for grant ecosystem functionality
 * 
 * @title LToken
 * @author Visionary Inc.
 * @version 1.0.0
 */
contract LToken is ERC20, Ownable, Pausable {
    
    // 🔗 Glyph Contract Interface
    interface IVisionaryCrest001 {
        function ownerOf(uint256 tokenId) external view returns (address);
        function getGlyph(uint256 tokenId) external view returns (
            string memory sector,
            uint256 grantId,
            string memory metadata,
            uint256 timestamp,
            bool burned
        );
    }
    
    // 📊 State Variables
    IVisionaryCrest001 public glyphContract;
    mapping(uint256 => uint256) public glyphToLTokens;  // Glyph ID -> L-Token amount
    mapping(address => bool) public authorizedMinters;
    
    uint256 public constant MAX_SUPPLY = 1000000 * 10**18; // 1M L-Tokens
    uint256 public totalMinted;
    
    // 🎭 Events
    event LTokensMinted(address indexed to, uint256 amount, uint256 indexed glyphId);
    event LTokensBurned(address indexed from, uint256 amount, string reason);
    event GlyphLinked(uint256 indexed glyphId, uint256 lTokenAmount);
    event MinterAuthorized(address indexed minter, bool authorized);
    
    /**
     * Constructor - Initialize L-Token contract
     * @param _glyphContract Address of VisionaryCrest001 contract
     */
    constructor(address _glyphContract) ERC20("LToken", "LTK") {
        glyphContract = IVisionaryCrest001(_glyphContract);
        authorizedMinters[msg.sender] = true;
    }
    
    /**
     * 🪙 Mint L-Tokens linked to approved glyph
     * @param to Recipient address
     * @param amount Amount of L-Tokens to mint
     * @param glyphId Associated glyph token ID
     */
    function mintForGlyph(
        address to,
        uint256 amount,
        uint256 glyphId
    ) external onlyAuthorizedMinter whenNotPaused {
        require(totalMinted + amount <= MAX_SUPPLY, "Exceeds max supply");
        require(glyphContract.ownerOf(glyphId) == to, "Not glyph owner");
        
        // Verify glyph is not burned
        (, , , , bool burned) = glyphContract.getGlyph(glyphId);
        require(!burned, "Cannot mint for burned glyph");
        
        glyphToLTokens[glyphId] += amount;
        totalMinted += amount;
        
        _mint(to, amount);
        
        emit LTokensMinted(to, amount, glyphId);
        emit GlyphLinked(glyphId, glyphToLTokens[glyphId]);
    }
    
    /**
     * 🔥 Ceremonial burn with reason
     * @param amount Amount to burn
     * @param reason Burn justification
     */
    function ceremonialBurn(uint256 amount, string memory reason) 
        external 
    {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        totalMinted -= amount;
        
        emit LTokensBurned(msg.sender, amount, reason);
    }
    
    /**
     * 🎯 Authorize/deauthorize minter
     * @param minter Address to update
     * @param authorized Authorization status
     */
    function setMinterAuthorization(address minter, bool authorized) 
        external 
        onlyOwner 
    {
        authorizedMinters[minter] = authorized;
        emit MinterAuthorized(minter, authorized);
    }
    
    /**
     * 🔗 Update glyph contract address
     * @param _glyphContract New glyph contract address
     */
    function setGlyphContract(address _glyphContract) 
        external 
        onlyOwner 
    {
        glyphContract = IVisionaryCrest001(_glyphContract);
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
     * 🔍 Get L-Token balance for specific glyph
     * @param glyphId Glyph token ID
     * @return L-Token amount linked to glyph
     */
    function getLTokensForGlyph(uint256 glyphId) 
        external 
        view 
        returns (uint256) 
    {
        return glyphToLTokens[glyphId];
    }
    
    /**
     * 📊 Get contract statistics
     * @return Total minted, max supply, remaining supply
     */
    function getStats() 
        external 
        view 
        returns (uint256, uint256, uint256) 
    {
        return (totalMinted, MAX_SUPPLY, MAX_SUPPLY - totalMinted);
    }
    
    // 🛡️ Modifier for authorized minters only
    modifier onlyAuthorizedMinter() {
        require(authorizedMinters[msg.sender], "Not authorized minter");
        _;
    }
    
    /**
     * Override transfer to add pause functionality
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }
}