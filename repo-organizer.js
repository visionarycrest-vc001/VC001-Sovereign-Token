const fs = require('fs');
const path = require('path');

// Helper to create directories
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

// Helper to move files
function moveFile(src, dest) {
  ensureDir(path.dirname(dest));
  if (fs.existsSync(src)) {
    fs.renameSync(src, dest);
    console.log(`Moved ${src} → ${dest}`);
  } else {
    console.warn(`Source file not found: ${src}`);
  }
}

// Helper to create files with content
function createFile(file, content) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, content);
  console.log(`Created file: ${file}`);
}

// Helper to delete a file
function deleteFile(file) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted file: ${file}`);
  }
}

// Example usage (expand for your structure!)
// Apps structure
ensureDir('apps/landing');
ensureDir('apps/watcher');
ensureDir('apps/console/pages');
ensureDir('apps/console/components');
ensureDir('apps/console/lib');

// Contracts
ensureDir('contracts');

// Data folders
ensureDir('data/grants');
ensureDir('data/glyphs');
ensureDir('data/ledger');
ensureDir('data/glyph-metadata');
ensureDir('data/schemas');

// Docs structure
ensureDir('docs/lineage');
ensureDir('docs/logs');

// Messages bus
ensureDir('messages/intake');
ensureDir('messages/review');
ensureDir('messages/approved');
ensureDir('messages/minted');
ensureDir('messages/billing');
ensureDir('messages/burns');

// Packages
ensureDir('packages/core');
ensureDir('packages/scripts');

// Public assets
ensureDir('public/assets/glyph-assets');
ensureDir('public/assets/landing-icons');
ensureDir('public/assets/template-icons');
ensureDir('public/assets/ledger-icons');
ensureDir('public/placeholder');

// Scripts, src, templates
ensureDir('scripts');
ensureDir('src/cpp');
ensureDir('src/python');
ensureDir('src/rust');
ensureDir('templates');

// .github tools/templates/workflows
ensureDir('.github/ISSUE_TEMPLATE');
ensureDir('.github/tools');
ensureDir('.github/workflows');

// Root files
const rootFiles = [
  '.editorconfig', '.gitattributes', '.gitignore', '.pre-commit-config.yaml',
  'package.json', 'package-lock.json', 'README.md', 'SECURITY.md', 'CHANGELOG.md', 'TIMELINE.md', 'LICENSE'
];
rootFiles.forEach(f => {
  if (!fs.existsSync(f)) createFile(f, `# ${f}\nThis is a placeholder for ${f}.`);
});

// Expand this script with moveFile(), createFile(), deleteFile() for your actual files!
// You can also update file contents here.

console.log("Repo structure update complete.");
