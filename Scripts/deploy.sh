Action: Simple static deploy hook (e.g., GitHub Pages or S3).

cat > scripts/deploy.sh << 'EOF'
#!/usr/bin/env bash
set -euo pipefail

./scripts/build.sh

# Placeholder deployment; replace with your target
if [ "${DEPLOY_TARGET:-local}" = "gh-pages" ]; then
  echo "🚀 Deploying to gh-pages"
  git subtree push --prefix dist origin gh-pages
else
  echo "📦 Dist ready at ./dist (set DEPLOY_TARGET=gh-pages for subtree push)"
fi
EOF

chmod +x scripts/deploy.sh
