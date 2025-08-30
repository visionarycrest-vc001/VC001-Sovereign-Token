#!/bin/bash
echo "🚀 Deploying VisionaryCrest‑001..."

# Run build first
bash scripts/build.sh

# Push to deployment branch
git checkout deploy
git merge main
git add dist/
git commit -m "🚀 Ritual Deploy: Pushed latest build artifacts"
git push origin deploy

echo "🌐 Deployment branch updated. Ready for hosting."
