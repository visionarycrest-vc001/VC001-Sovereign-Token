#!/bin/bash
echo "🔨 Building VisionaryCrest‑001..."

# Clean previous builds
rm -rf dist/
mkdir dist

# Compile assets
npm run build

# Move compiled files to dist
cp -r public/ dist/public/
cp -r packages/ dist/packages/
cp index.js dist/

echo "✅ Build complete. Artifacts stored in ./dist"
