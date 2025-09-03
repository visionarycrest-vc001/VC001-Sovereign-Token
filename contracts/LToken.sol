// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title LToken - Sovereign Utility Token
 * @dev ERC-20 token for grant operations and ceremonial transactions
 * 
 * Inscribed By: VC001 Sovereign System
 * Timestamp: 2025-09-03
 * Lineage: Companion to VisionaryCrest001 glyph protocol
 * 
 * Sacred Purpose: Enable grant disbursement and ceremonial exchanges
 * Ceremonial Features: Mint/burn controls, steward governance, audit trails
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract LToken is ERC20, Ownable, Pausable {
    
    // Ceremonial Constants
    uint8 private constant DECIMALS = 18;
    uint256 private constant MAX_SUPPLY = 1000000000 * 10**DECIMALS; // 1B tokens
    
    // Grant Operations
    struct Grant {
        address recipient;
        uint256 amount;
        string purpose;
        uint256 timestamp;
        bool disbursed;
    }
    
    // Sacred Registry
    mapping(uint256 => Grant) public grantRegistry;
    mapping(address => bool) public stewards;
    mapping(address => bool) public burnAuthority;
    
    uint256 private _grantCounter;
    uint256 public totalBurned;
    
    // Ceremonial Events
    event GrantCreated(uint256 indexed grantId, address indexed recipient, uint256 amount, string purpose);
    event GrantDisbursed(uint256 indexed grantId, address indexed recipient, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount, string reason);
    event StewardDesignated(address indexed steward, bool status);
    event BurnAuthorityGranted(address indexed authority, bool status);
    
    // Ceremonial Modifiers
    modifier onlySteward() {
        require(stewards[msg.sender] || msg.sender == owner(), "Not authorized steward");
        _;
    }
    
    modifier onlyBurnAuthority() {
        require(burnAuthority[msg.sender] || stewards[msg.sender] || msg.sender == owner(), "Not authorized for burns");
        _;
    }
    
    constructor() ERC20("Legacy Token", "LTOKEN") {
        stewards[msg.sender] = true;
        burnAuthority[msg.sender] = true;
    }
    
    /**
     * @dev Create ceremonial grant for future disbursement
     */
    function createGrant(
        address recipient,
        uint256 amount,
        string memory purpose
    ) public onlySteward returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Invalid amount");
        
        uint256 grantId = _grantCounter++;
        
        grantRegistry[grantId] = Grant({
            recipient: recipient,
            amount: amount,
            purpose: purpose,
            timestamp: block.timestamp,
            disbursed: false
        });
        
        emit GrantCreated(grantId, recipient, amount, purpose);
        return grantId;
    }
    
    /**
     * @dev Disburse grant tokens with ceremonial mint
     */
    function disburseGrant(uint256 grantId) public onlySteward {
        Grant storage grant = grantRegistry[grantId];
        require(grant.recipient != address(0), "Grant does not exist");
        require(!grant.disbursed, "Grant already disbursed");
        require(totalSupply() + grant.amount <= MAX_SUPPLY, "Exceeds max supply");
        
        grant.disbursed = true;
        _mint(grant.recipient, grant.amount);
        
        emit GrantDisbursed(grantId, grant.recipient, grant.amount);
    }
    
    /**
     * @dev Ceremonial burn with audit trail
     */
    function ceremonialBurn(uint256 amount, string memory reason) public onlyBurnAuthority {
        require(amount > 0, "Invalid burn amount");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        _burn(msg.sender, amount);
        totalBurned += amount;
        
        emit TokensBurned(msg.sender, amount, reason);
    }
    
    /**
     * @dev Emergency burn from any address (steward only)
     */
    function emergencyBurn(address from, uint256 amount, string memory reason) public onlySteward {
        require(amount > 0, "Invalid burn amount");
        require(balanceOf(from) >= amount, "Insufficient balance");
        
        _burn(from, amount);
        totalBurned += amount;
        
        emit TokensBurned(from, amount, reason);
    }
    
    /**
     * @dev Designate steward authority
     */
    function designateSteward(address steward, bool status) public onlyOwner {
        stewards[steward] = status;
        emit StewardDesignated(steward, status);
    }
    
    /**
     * @dev Grant burn authority
     */
    function grantBurnAuthority(address authority, bool status) public onlyOwner {
        burnAuthority[authority] = status;
        emit BurnAuthorityGranted(authority, status);
    }
    
    /**
     * @dev Pause contract in emergency
     */
    function pause() public onlySteward {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() public onlySteward {
        _unpause();
    }
    
    /**
     * @dev Override to include pause functionality
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override {
        super._beforeTokenTransfer(from, to, amount);
    }
    
    /**
     * @dev Get grant details
     */
    function getGrant(uint256 grantId) public view returns (Grant memory) {
        return grantRegistry[grantId];
    }
    
    /**
     * @dev Get total grants created
     */
    function getTotalGrants() public view returns (uint256) {
        return _grantCounter;
    }
    
    /**
     * @dev Get circulating supply (total - burned)
     */
    function circulatingSupply() public view returns (uint256) {
        return totalSupply();
    }
}

/*
🧭 Ceremonial Declaration:
This token serves as the sacred utility layer for VC001 grant operations,
enabling ceremonial exchanges and steward governance across the sovereign ecosystem.

Witnessed by: Syntec Sovereign System
*/