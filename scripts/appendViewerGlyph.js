const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, 'VC_ViewerRegistry.md');

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

  // Check for duplicate glyph (first column after "|")
  const duplicate = content
    .split('\n')
    .some(line => line.startsWith('|') && line.includes(`| ${glyph} `));

  if (duplicate) {
    console.log('🛑 Glyph already exists in registry. No update made.');
    process.exit(0);
  }

  // Ensure there is a trailing newline before appending
  const updatedContent = content.endsWith('\n') ? content + row + '\n' : content + '\n' + row + '\n';
  fs.writeFileSync(registryPath, updatedContent);

  console.log('✅ Viewer registry updated with new glyph.');
} catch (err) {
  console.error('Error accessing registry file:', err.message);
  process.exit(1);
}
