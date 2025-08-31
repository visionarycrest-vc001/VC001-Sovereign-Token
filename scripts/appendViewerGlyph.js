/**
 * VC001 Sovereign Token - Viewer Glyph Registry Script
 * 
 * PURPOSE:
 * Safely appends new viewer glyphs to the VC_ViewerRegistry.md file in the repository root.
 * Maintains markdown table formatting integrity and prevents duplicate entries.
 * 
 * USAGE:
 * node scripts/appendViewerGlyph.js <glyph> <name> <purpose> <location>
 * 
 * PARAMETERS:
 * - glyph: Unicode glyph/emoji representing the viewer (e.g., 🧭)
 * - name: Human-readable name for the viewer (e.g., "Ritual Navigator")
 * - purpose: Description of the viewer's functionality
 * - location: File path or location where the viewer is activated
 * 
 * FEATURES:
 * - Works from anywhere in the repository by finding git root
 * - Checks for duplicate glyph/name entries (case-insensitive)
 * - Inserts new rows after the last table row, preserving structure
 * - Robust error handling for file operations and permissions
 * - Maintains consistent column padding for markdown readability
 * 
 * EXAMPLE:
 * node scripts/appendViewerGlyph.js "🧭" "Ritual Navigator" "CI badge and codex sync" "badge-mint.yml"
 * 
 * AUTHOR: Enhanced for VC001 Sovereign Token repository structure
 */

const fs = require('fs');
const path = require('path');

/**
 * Find the repository root by looking for .git directory
 * @returns {string} Path to repository root
 */
function findRepoRoot() {
  let currentDir = process.cwd();
  
  while (currentDir !== path.dirname(currentDir)) {
    if (fs.existsSync(path.join(currentDir, '.git'))) {
      return currentDir;
    }
    currentDir = path.dirname(currentDir);
  }
  
  // Fallback to current working directory if .git not found
  return process.cwd();
}

// Resolve registry path relative to repository root
const repoRoot = findRepoRoot();
const registryPath = path.join(repoRoot, 'VC_ViewerRegistry.md');

// Parse and validate CLI arguments
const args = process.argv.slice(2);
const [glyph, name, purpose, location] = args.map(arg => arg && arg.trim());

if (args.length !== 4 || !glyph || !name || !purpose || !location) {
  console.error('❌ ERROR: Invalid arguments provided');
  console.error('');
  console.error('USAGE:');
  console.error('  node scripts/appendViewerGlyph.js <glyph> <name> <purpose> <location>');
  console.error('');
  console.error('PARAMETERS:');
  console.error('  glyph    - Unicode glyph/emoji (e.g., 🧭)');
  console.error('  name     - Human-readable name (e.g., "Ritual Navigator")');
  console.error('  purpose  - Description of functionality');
  console.error('  location - File path or activation location');
  console.error('');
  console.error('EXAMPLE:');
  console.error('  node scripts/appendViewerGlyph.js "🧭" "Ritual Navigator" "CI badge and codex sync" "badge-mint.yml"');
  process.exit(1);
}

// Validate input lengths to ensure table formatting
if (glyph.length > 5) {
  console.error('❌ ERROR: Glyph should be 5 characters or less for table formatting');
  process.exit(1);
}
if (name.length > 22) {
  console.error('❌ ERROR: Name should be 22 characters or less for table formatting');
  process.exit(1);
}
if (purpose.length > 34) {
  console.error('❌ ERROR: Purpose should be 34 characters or less for table formatting');
  process.exit(1);
}
if (location.length > 28) {
  console.error('❌ ERROR: Location should be 28 characters or less for table formatting');
  process.exit(1);
}

// Format row with padded columns for consistent table layout
const pad = (str, len) => str.padEnd(len, ' ');
const row = `| ${pad(glyph, 5)} | ${pad(name, 22)} | ${pad(purpose, 34)} | ${pad(location, 28)} |`;

// Main execution with comprehensive error handling
async function appendViewerGlyph() {
  try {
    console.log(`🔍 Searching for registry at: ${registryPath}`);
    
    // Check if registry file exists
    if (!fs.existsSync(registryPath)) {
      console.error('❌ ERROR: Registry file not found');
      console.error(`   Expected location: ${registryPath}`);
      console.error('   Please ensure you are running this script from the VC001 repository');
      console.error('   and that VC_ViewerRegistry.md exists in the repository root.');
      process.exit(1);
    }

    // Check file permissions
    try {
      fs.accessSync(registryPath, fs.constants.R_OK | fs.constants.W_OK);
    } catch (permErr) {
      console.error('❌ ERROR: Permission denied');
      console.error(`   Cannot read/write to: ${registryPath}`);
      console.error('   Please check file permissions and try again.');
      process.exit(1);
    }

    // Read existing registry content
    let content;
    try {
      content = fs.readFileSync(registryPath, 'utf8');
    } catch (readErr) {
      console.error('❌ ERROR: Failed to read registry file');
      console.error(`   File: ${registryPath}`);
      console.error(`   Error: ${readErr.message}`);
      process.exit(1);
    }

    // Validate that the file contains a markdown table
    if (!content.includes('| Glyph |') || !content.includes('|-------|')) {
      console.error('❌ ERROR: Registry file does not contain expected markdown table structure');
      console.error('   Expected headers: | Glyph | Name | Purpose | Activated In |');
      console.error('   Please verify the VC_ViewerRegistry.md file format.');
      process.exit(1);
    }

    // Split into lines and find table rows
    const lines = content.split('\n');
    const tableRows = lines.filter(line => line.trim().startsWith('|') && !line.includes('---'));
    
    if (tableRows.length < 2) {
      console.error('❌ ERROR: No valid table rows found in registry');
      console.error('   The registry must contain at least a header row and separator.');
      process.exit(1);
    }

    // Check for duplicates (case-insensitive comparison)
    const lowerGlyph = glyph.toLowerCase().trim();
    const lowerName = name.toLowerCase().trim();
    
    const duplicate = tableRows.some(line => {
      const parts = line.split('|').map(s => s.trim());
      if (parts.length < 4) {return false;}
      
      const rowGlyph = parts[1] ? parts[1].toLowerCase().trim() : '';
      const rowName = parts[2] ? parts[2].toLowerCase().trim() : '';
      
      return (rowGlyph === lowerGlyph) || (rowName === lowerName);
    });

    if (duplicate) {
      console.log('🛑 DUPLICATE DETECTED: Glyph or name already exists in registry');
      console.log(`   Glyph: "${glyph}"`);
      console.log(`   Name: "${name}"`);
      console.log('   No update made to preserve registry integrity.');
      process.exit(0);
    }

    // Find the last table row to insert after (skip header and separator)
    let insertIdx = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
      const trimmedLine = lines[i].trim();
      if (trimmedLine.startsWith('|') && !trimmedLine.includes('---')) {
        insertIdx = i + 1;
        break;
      }
    }

    // Insert new row after last table row
    lines.splice(insertIdx, 0, row);

    // Write updated content back to file
    try {
      fs.writeFileSync(registryPath, lines.join('\n'), 'utf8');
    } catch (writeErr) {
      console.error('❌ ERROR: Failed to write to registry file');
      console.error(`   File: ${registryPath}`);
      console.error(`   Error: ${writeErr.message}`);
      console.error('   Changes were not saved.');
      process.exit(1);
    }

    // Success message
    console.log('✅ SUCCESS: Viewer registry updated successfully');
    console.log(`   Added glyph: ${glyph} - ${name}`);
    console.log(`   Purpose: ${purpose}`);
    console.log(`   Location: ${location}`);
    console.log(`   Registry: ${registryPath}`);
    
  } catch (err) {
    console.error('❌ UNEXPECTED ERROR occurred:');
    console.error(`   ${err.message}`);
    if (err.stack) {
      console.error('   Stack trace:');
      console.error(`   ${err.stack}`);
    }
    process.exit(1);
  }
}

// Execute the main function
appendViewerGlyph();
