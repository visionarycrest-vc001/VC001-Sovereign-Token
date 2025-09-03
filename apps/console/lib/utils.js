/**
 * 🔧 Utility Functions for VC001 Console
 * 
 * Common operations for grant processing and token management
 * 
 * @file lib/utils.js
 * @author Visionary Inc.
 */

/**
 * Format timestamp for display in the console
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted date string
 */
export function formatTimestamp(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * Generate glyph ID based on grant parameters
 * @param {object} grant - Grant object
 * @returns {string} Unique glyph identifier
 */
export function generateGlyphId(grant) {
  const { sector, id, timestamp } = grant;
  const hash = btoa(`${sector}-${id}-${timestamp}`).slice(0, 8);
  return `VC001-${sector.toUpperCase()}-${hash}`;
}

/**
 * Validate grant application data
 * @param {object} grantData - Grant application data
 * @returns {object} Validation result with errors array
 */
export function validateGrant(grantData) {
  const errors = [];
  
  if (!grantData.title || grantData.title.length < 5) {
    errors.push('Title must be at least 5 characters');
  }
  
  if (!grantData.sector || !['FDA', 'EDA', 'SAM'].includes(grantData.sector)) {
    errors.push('Sector must be FDA, EDA, or SAM');
  }
  
  if (!grantData.amount || grantData.amount <= 0) {
    errors.push('Amount must be positive');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Calculate L-token requirements based on grant tier
 * @param {string} sector - Grant sector (FDA/EDA/SAM)
 * @param {number} amount - Grant amount
 * @returns {number} Required L-tokens
 */
export function calculateLTokens(sector, amount) {
  const multipliers = {
    'FDA': 1.5,
    'EDA': 1.2,
    'SAM': 1.0
  };
  
  return Math.floor(amount * (multipliers[sector] || 1.0));
}