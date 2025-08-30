const fs = require('fs');
const path = require('path');

const registryPath = path.resolve('VC_ViewerRegistry.md');

// CLI arguments
const [glyph, name, purpose, location] = process.argv.slice(2);

if (!glyph || !name || !purpose || !location) {
  console.error('Usage: node appendViewerGlyph.js <glyph> <name> <purpose> <location>');
  process.exit(1);
}

// Format row with padded columns
const pad = (str, len) => str.padEnd(len, ' ');
const row = `| ${pad(glyph, 5)} | ${pad(name, 22)} | ${pad(purpose, 34)} | ${pad(location, 28)} |`;

// Read existing registry
let content;
try {
  content = fs.readFileSync(registryPath, 'utf8');
} catch (err) {
  console.error(`Could not read ${registryPath}:`, err.message);
  process.exit(1);
}

// Check for duplicate (ignore whitespace padding in columns)
const rowNoPad = `| ${glyph.trim()} | ${name.trim()} | ${purpose.trim()} | ${location.trim()} |`;
const isDuplicate = content.split('\n').some(line => {
  const parts = line.split('|').map(s => s.trim());
  return (
    parts.length === 5 &&
    parts[1] === glyph.trim() &&
    parts[2] === name.trim() &&
    parts[3] === purpose.trim() &&
    parts[4] === location.trim()
  );
});

if (isDuplicate) {
  console.log('🛑 Glyph already exists in registry. No update made.');
  process.exit(0);
}

// Append new row
const updatedContent = content.trim() + '\n' + row + '\n';
fs.writeFileSync(registryPath, updatedContent);

console.log('✅ Viewer registry updated with new glyph.');
