// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title LToken
 * @dev Sovereign L-Token (Lineage Token) for VC001 ecosystem
 * 
 * 🪙 Ceremonial Features:
 * - Lineage-backed utility token
 * - Steward authority minting
 * - Grant protocol integration
 * - Ceremonial burn mechanics
 * - Dashboard metrics tracking
 * 
 * Inscribed by: Percy Abrams Jr.
 * Lineage: Anchored to VC001 Sovereign Token Protocol
 * Timestamp: 2025-09-03T05:10:00Z
 */
contract LToken is ERC20, ERC20Burnable, Ownable, Pausable {
    
    // Ceremonial constants
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10**18; // 1M tokens
    uint256 public constant STEWARD_MINT_LIMIT = 10_000 * 10**18; // Daily limit per steward
    
    // Steward management
    mapping(address => bool) public authorizedStewards;
    mapping(address => uint256) public lastMintTimestamp;
    mapping(address => uint256) public dailyMintedAmount;
    
    // Grant protocol integration
    mapping(address => uint256) public grantAllocations;
    mapping(address => bool) public grantRecipients;
    
    // Ceremonial metrics
    uint256 public totalBurned;
    uint256 public ceremonialEvents;
    
    // Events
    event StewardMint(address indexed steward, address indexed recipient, uint256 amount);
    event GrantAllocation(address indexed recipient, uint256 amount);
    event CeremonialBurn(address indexed account, uint256 amount, string reason);
    event StewardAuthorized(address indexed steward);
    event StewardRevoked(address indexed steward);
    
    constructor() ERC20("Lineage Token", "LTOKEN") {
        // Authorize contract deployer as first steward
        authorizedStewards[msg.sender] = true;
        
        // Initial mint to treasury (10% of max supply)
        _mint(msg.sender, 100_000 * 10**18);
    }
    
    /**
     * @dev Mint L-tokens with steward authority
     * @param to Recipient address
     * @param amount Amount to mint
     */
    function stewardMint(address to, uint256 amount) public onlyAuthorizedSteward whenNotPaused {
        require(totalSupply() + amount <= MAX_SUPPLY, "Would exceed max supply");
        
        // Check daily limits
        if (block.timestamp >= lastMintTimestamp[msg.sender] + 1 days) {
            dailyMintedAmount[msg.sender] = 0;
            lastMintTimestamp[msg.sender] = block.timestamp;
        }
        
        require(dailyMintedAmount[msg.sender] + amount <= STEWARD_MINT_LIMIT, "Daily mint limit exceeded");
        
        dailyMintedAmount[msg.sender] += amount;
        _mint(to, amount);
        
        emit StewardMint(msg.sender, to, amount);
    }
    
    /**
     * @dev Allocate tokens for grant recipients
     * @param recipient Grant recipient address
     * @param amount Amount to allocate
     */
    function allocateGrant(address recipient, uint256 amount) public onlyAuthorizedSteward {
        require(balanceOf(address(this)) >= amount, "Insufficient contract balance");
        
        grantAllocations[recipient] += amount;
        grantRecipients[recipient] = true;
        
        _transfer(address(this), recipient, amount);
        
        emit GrantAllocation(recipient, amount);
    }
    
    /**
     * @dev Ceremonial burn with reason inscription
     * @param amount Amount to burn
     * @param reason Ceremonial burn reason
     */
    function ceremonialBurn(uint256 amount, string memory reason) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        totalBurned += amount;
        ceremonialEvents++;
        
        emit CeremonialBurn(msg.sender, amount, reason);
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
     * @dev Revoke steward authority
     * @param steward Address to revoke
     */
    function revokeSteward(address steward) public onlyOwner {
        authorizedStewards[steward] = false;
        emit StewardRevoked(steward);
    }
    
    /**
     * @dev Get circulating supply (total supply minus burned)
     */
    function circulatingSupply() public view returns (uint256) {
        return totalSupply();
    }
    
    /**
     * @dev Get steward daily mint allowance remaining
     * @param steward Steward address
     */
    function getStewardMintAllowance(address steward) public view returns (uint256) {
        if (block.timestamp >= lastMintTimestamp[steward] + 1 days) {
            return STEWARD_MINT_LIMIT;
        }
        return STEWARD_MINT_LIMIT - dailyMintedAmount[steward];
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
    
    /**
     * @dev Emergency token recovery
     * @param token Token address to recover
     * @param amount Amount to recover
     */
    function recoverToken(address token, uint256 amount) public onlyOwner {
        require(token != address(this), "Cannot recover own token");
        IERC20(token).transfer(owner(), amount);
    }
    
    // Modifiers
    modifier onlyAuthorizedSteward() {
        require(authorizedStewards[msg.sender] || msg.sender == owner(), "Not authorized steward");
        _;
    }
    
    // Override required by Solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}