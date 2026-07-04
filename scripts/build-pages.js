// Build the static GitHub Pages bundle into ./dist.
// The site is the static apps: apps/landing at the root, apps/watcher under /watcher.
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(path.join(root, 'apps', 'landing'), dist, { recursive: true });
fs.cpSync(path.join(root, 'apps', 'watcher'), path.join(dist, 'watcher'), { recursive: true });

console.log('✅ Pages built to ./dist (landing + watcher)');
