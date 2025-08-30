/**
 * Append a viewer glyph to VC_ViewerRegistry.md.
 * Usage: node appendViewerGlyph.js <glyph> <name> <purpose> <location>
 * - Safely appends to registry table in repo root.
 * - Checks for duplicate glyph/name (case-insensitive).
 * - Maintains markdown table formatting.
 */

const fs = require('fs');
const path = require('path');

// Always resolve to repo root
const registryPath = path.resolve(process.cwd(), 'VC_ViewerRegistry.md');

// CLI arguments
const [glyph, name, purpose, location] = process.argv.slice(2).map(arg => arg && arg.trim());

if (!glyph || !name || !purpose || !location) {
  console.error('Usage: node appendViewerGlyph.js <glyph> <name> <purpose> <location>');
  process.exit(1);
}

// Format row with padded columns
const pad = (str, len) => str.padEnd(len, ' ');
const row = `| ${pad(glyph, 5)} | ${pad(name, 22)} | ${pad(purpose, 34)} | ${pad(location, 28)} |`;

try {
  // Read existing registry
  const content = fs.readFileSync(registryPath, 'utf8');

  // Split into lines and find end of table
  const lines = content.split('\n');
  const tableRows = lines.filter(line => line.startsWith('|'));
  const lowerGlyph = glyph.toLowerCase();
  const lowerName = name.toLowerCase();
  const duplicate = tableRows.some(line => {
    const parts = line.split('|').map(s => s.trim());
    return (
      (parts[1] && parts[1].toLowerCase() === lowerGlyph) ||
      (parts[2] && parts[2].toLowerCase() === lowerName)
    );
  });

  if (duplicate) {
    console.log('🛑 Glyph or name already exists in registry. No update made.');
    process.exit(0);
  }

  // Find last table row to append after
  let insertIdx = lines.length;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (lines[i].startsWith('|')) {
      insertIdx = i + 1;
      break;
    }
  }

  // Insert new row after last table row
  lines.splice(insertIdx, 0, row);

  // Write updated content
  fs.writeFileSync(registryPath, lines.join('\n'));

  console.log('✅ Viewer registry updated with new glyph.');
} catch (err) {
  console.error('Error accessing registry file:', err.message);
  process.exit(1);
}
