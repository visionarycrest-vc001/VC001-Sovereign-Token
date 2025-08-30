const fs = require('fs');
const registryPath = 'VC_ViewerRegistry.md';
const newGlyph = '| 🧭 | Ritual Navigator | CI badge and codex sync | `badge-mint.yml` |\n';

fs.appendFileSync(registryPath, newGlyph);
console.log("Viewer registry updated with new glyph.");
