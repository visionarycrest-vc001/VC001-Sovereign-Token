/**
 * 🔍 GSL Message Linter
 * 
 * Linting tool for GSL (Grant Sovereign Language) messages
 * Validates message structure, format, and ceremonial compliance
 * 
 * @file .github/tools/gsl-lint.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * GSL message validation rules
 */
const GSL_RULES = {
  required_fields: ['timestamp', 'action'],
  allowed_actions: [
    'intake_received', 'draft_created', 'review_completed', 'submission_completed',
    'glyph_minted', 'ltoken_minted', 'glyph_burned', 'ltoken_burned',
    'billing_generated', 'payment_processed'
  ],
  timestamp_format: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/,
  id_patterns: {
    grant_id: /^GRANT-\d{6}$/,
    proposal_id: /^PROP-\d{6}$/,
    glyph_id: /^VC001-[A-Z]{3}-\d{8}$/,
    transaction_id: /^LTK-[0-9A-F]{16}$/
  }
};

/**
 * Validate GSL message structure
 * @param {object} message - GSL message to validate
 * @returns {object} Validation result
 */
function validateGSLMessage(message) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  GSL_RULES.required_fields.forEach(field => {
    if (!message[field]) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate timestamp format
  if (message.timestamp && !GSL_RULES.timestamp_format.test(message.timestamp)) {
    errors.push('Invalid timestamp format. Expected ISO 8601 format.');
  }
  
  // Validate action
  if (message.action && !GSL_RULES.allowed_actions.includes(message.action)) {
    errors.push(`Invalid action: ${message.action}. Allowed: ${GSL_RULES.allowed_actions.join(', ')}`);
  }
  
  // Validate ID patterns
  Object.entries(GSL_RULES.id_patterns).forEach(([field, pattern]) => {
    if (message[field] && !pattern.test(message[field])) {
      errors.push(`Invalid ${field} format: ${message[field]}`);
    }
  });
  
  // Check ceremonial compliance
  if (message.action === 'glyph_minted' && !message.ceremonial_data) {
    warnings.push('Glyph minting messages should include ceremonial_data');
  }
  
  // Check signature presence for critical actions
  const criticalActions = ['glyph_minted', 'ltoken_minted', 'submission_completed'];
  if (criticalActions.includes(message.action) && !message.gsl_signature) {
    warnings.push('Critical actions should include GSL signature');
  }
  
  // Validate timestamp age (not too old)
  if (message.timestamp) {
    const messageTime = new Date(message.timestamp);
    const now = new Date();
    const ageHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (ageHours > 24) {
      warnings.push(`Message timestamp is ${Math.round(ageHours)} hours old`);
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
    score: Math.max(0, 100 - errors.length * 20 - warnings.length * 5)
  };
}

/**
 * Lint GSL messages in directory
 * @param {string} messagesDir - Directory containing GSL messages
 * @returns {object} Linting results
 */
function lintGSLMessages(messagesDir) {
  const results = {
    total_files: 0,
    valid_files: 0,
    invalid_files: 0,
    total_errors: 0,
    total_warnings: 0,
    files: []
  };
  
  function lintDirectory(dir) {
    if (!fs.existsSync(dir)) {
      return;
    }
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        lintDirectory(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.json')) {
        results.total_files++;
        
        try {
          const message = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
          const validation = validateGSLMessage(message);
          
          const fileResult = {
            file: path.relative(messagesDir, fullPath),
            valid: validation.valid,
            errors: validation.errors,
            warnings: validation.warnings,
            score: validation.score
          };
          
          results.files.push(fileResult);
          results.total_errors += validation.errors.length;
          results.total_warnings += validation.warnings.length;
          
          if (validation.valid) {
            results.valid_files++;
          } else {
            results.invalid_files++;
          }
          
        } catch (error) {
          results.invalid_files++;
          results.files.push({
            file: path.relative(messagesDir, fullPath),
            valid: false,
            errors: [`JSON parse error: ${error.message}`],
            warnings: [],
            score: 0
          });
        }
      }
    });
  }
  
  lintDirectory(messagesDir);
  return results;
}

/**
 * Generate linting report
 * @param {object} results - Linting results
 * @returns {string} Formatted report
 */
function generateReport(results) {
  let report = '🔍 GSL Message Linting Report\\n';
  report += '================================\\n\\n';
  
  report += `📊 Summary:\\n`;
  report += `  Total Files: ${results.total_files}\\n`;
  report += `  Valid Files: ${results.valid_files}\\n`;
  report += `  Invalid Files: ${results.invalid_files}\\n`;
  report += `  Total Errors: ${results.total_errors}\\n`;
  report += `  Total Warnings: ${results.total_warnings}\\n\\n`;
  
  if (results.invalid_files > 0) {
    report += `❌ Invalid Files:\\n`;
    results.files
      .filter(f => !f.valid)
      .forEach(file => {
        report += `  📄 ${file.file} (Score: ${file.score}/100)\\n`;
        file.errors.forEach(error => {
          report += `    ❌ ${error}\\n`;
        });
        file.warnings.forEach(warning => {
          report += `    ⚠️  ${warning}\\n`;
        });
        report += '\\n';
      });
  }
  
  if (results.total_warnings > 0) {
    report += `⚠️  Files with Warnings:\\n`;
    results.files
      .filter(f => f.valid && f.warnings.length > 0)
      .forEach(file => {
        report += `  📄 ${file.file} (Score: ${file.score}/100)\\n`;
        file.warnings.forEach(warning => {
          report += `    ⚠️  ${warning}\\n`;
        });
        report += '\\n';
      });
  }
  
  const overallScore = results.total_files > 0 
    ? Math.round(results.files.reduce((sum, f) => sum + f.score, 0) / results.total_files)
    : 100;
  
  report += `🎯 Overall Score: ${overallScore}/100\\n`;
  
  if (overallScore >= 90) {
    report += '✅ Excellent GSL message quality!\\n';
  } else if (overallScore >= 75) {
    report += '👍 Good GSL message quality with minor issues\\n';
  } else if (overallScore >= 60) {
    report += '⚠️  GSL message quality needs improvement\\n';
  } else {
    report += '❌ Poor GSL message quality - significant issues found\\n';
  }
  
  return report;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🔍 GSL Message Linter');
    console.log('Usage: node gsl-lint.js <messages-directory>');
    console.log('       node gsl-lint.js --file <message-file.json>');
    process.exit(1);
  }
  
  if (args[0] === '--file') {
    const messageFile = args[1];
    if (!fs.existsSync(messageFile)) {
      console.error(`❌ Message file not found: ${messageFile}`);
      process.exit(1);
    }
    
    try {
      const message = JSON.parse(fs.readFileSync(messageFile, 'utf8'));
      const validation = validateGSLMessage(message);
      
      console.log(`🔍 Linting ${messageFile}...`);
      console.log(`Score: ${validation.score}/100`);
      
      if (validation.errors.length > 0) {
        console.log('❌ Errors:');
        validation.errors.forEach(error => console.log(`  - ${error}`));
      }
      
      if (validation.warnings.length > 0) {
        console.log('⚠️  Warnings:');
        validation.warnings.forEach(warning => console.log(`  - ${warning}`));
      }
      
      if (validation.valid) {
        console.log('✅ Message is valid');
      } else {
        console.log('❌ Message is invalid');
        process.exit(1);
      }
      
    } catch (error) {
      console.error('❌ Error reading message file:', error.message);
      process.exit(1);
    }
  } else {
    const messagesDir = args[0];
    if (!fs.existsSync(messagesDir)) {
      console.error(`❌ Messages directory not found: ${messagesDir}`);
      process.exit(1);
    }
    
    console.log(`🔍 Linting GSL messages in ${messagesDir}...`);
    const results = lintGSLMessages(messagesDir);
    const report = generateReport(results);
    
    console.log(report);
    
    if (results.invalid_files > 0) {
      process.exit(1);
    }
  }
}

module.exports = {
  validateGSLMessage,
  lintGSLMessages,
  generateReport,
  GSL_RULES
};