// 🛡️ CI Guardrail: Filename Validator for Sovereign Archive

const fs = require('fs');
const path = require('path');

const forbiddenChars = [':', '/', '\\', '*', '?', '"', '<', '>', '|'];
const allowedPattern = /^[a-z0-9\-_.]+$/; // kebab-case, snake_case, dots

// Directories and files to exclude from checking
const excludePaths = [
  '.git',
  'node_modules',
  '.npm',
  '.cache',
  'dist',
  'build',
  'coverage'
];

// Standard files that are allowed to have uppercase letters
const allowedUppercaseFiles = [
  'README.md',
  'LICENSE',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'TIMELINE.md',
  'GOVERNANCE.md',
  'CODEOWNERS',
  'Dockerfile',
  'Makefile',
  'ISSUE_TEMPLATE',
  'PULL_REQUEST_TEMPLATE.md'
];

// Special patterns for project-specific naming conventions
const allowedPatterns = [
  /^VC\d{3}-[a-zA-Z]+\.md$/, // VC001-Something.md pattern for lineage files
  /^VC\d{3}_[a-zA-Z]+\.md$/, // VC001_Something.md pattern for legacy files
  /^onboardVC\d{3}[A-Z]\.js$/, // onboardVC003A.js pattern
  /^VC_[A-Za-z]+\.md$/, // VC_LogName.md pattern for log files
  /^VC_[A-Za-z]+_[a-zA-Z]+\.(md|sh)$/ // VC_LogName_viewer.sh pattern
];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip excluded paths
    if (excludePaths.includes(entry.name)) {
      continue;
    }

    if (forbiddenChars.some(char => entry.name.includes(char))) {
      console.error(`❌ Invalid path detected: "${fullPath}"`);
      console.error(`🛡️ Ritual Block: Forbidden character found. Use kebab-case.`);
      process.exit(1);
    }

    // Allow standard uppercase files
    if (!allowedPattern.test(entry.name) && 
        !allowedUppercaseFiles.includes(entry.name) &&
        !allowedPatterns.some(pattern => pattern.test(entry.name))) {
      console.error(`⚠️ Non-standard name: "${fullPath}"`);
      console.error(`🔍 Suggestion: Rename to kebab-case or snake_case.`);
      process.exit(1);
    }

    if (entry.isDirectory()) scanDir(fullPath);
  }
}

scanDir('.');
console.log('✅ Path check passed: All filenames are sovereign-compliant.');
