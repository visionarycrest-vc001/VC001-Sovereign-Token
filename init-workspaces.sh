#!/bin/bash

echo "📦 Initializing workspace package.json files..."

# Define base version and author
VERSION="1.0.0"
AUTHOR="Visionary Inc."

# Loop through each subfolder in packages/
for dir in packages/*/; do
  name=$(basename "$dir")
  pkg="$dir/package.json"

  if [ ! -f "$pkg" ]; then
    echo "🧙 Creating package.json for $name..."

    cat > "$pkg" <<EOF
{
  "name": "@vc001/$name",
  "version": "$VERSION",
  "main": "index.js",
  "description": "$name module for VisionaryCrest‑001",
  "scripts": {
    "build": "echo '🔨 Building $name...'",
    "test": "echo '🧪 Testing $name...'"
  },
  "author": "$AUTHOR",
  "license": "MIT",
  "dependencies": {}
}
EOF

    echo "✅ $pkg created."
  else
    echo "⚠️ $pkg already exists — skipping."
  fi
done

echo "🎉 All workspace modules are now scaffolded."
