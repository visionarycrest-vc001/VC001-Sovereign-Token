Action: Validate JSON and prepare a dist folder.

cat > scripts/build.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail

echo "🔧 Build: validating JSON schemas and preparing dist/"
mkdir -p dist

# Basic JSON validation if jq is present
for f in data/*.json; do
  if command -v jq >/dev/null 2>&1; then
    jq . "$f" >/dev/null || (echo "Invalid JSON: $f" && exit 1)
    echo "✅ Valid JSON: $f"
  else
    echo "ℹ️ jq not installed; skipping JSON validation for $f"
  fi
done

# Copy apps and data to dist (static site style)
rsync -a apps dist/
rsync -a data dist/
rsync -a public dist/
rsync -a codex dist/
rsync -a templates dist/
echo "🎉 Build complete: dist/ ready"
EOF

chmod +x scripts/build.sh
