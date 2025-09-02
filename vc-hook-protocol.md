# 🧙 VC Hook Protocol — Sovereign Git Rituals

This scroll documents the ceremonial use of Git hooks within the VC001 Sovereign Token archive. Each hook is inscribed to activate lineage updates, badge minting, and viewer registry synchronization.

---

## 🔮 Pre-Commit Hook Ritual

**Location:** `.git/hooks/pre-commit`  
**Purpose:** Auto-inscribes codex entries, mints contributor badges, and updates viewer registry.

### 🔧 Invocation Flow

```bash
#!/bin/bash

echo "🔮 Pre-commit ritual activated..."

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT" || exit 1

node scripts/append-codex-entry.js
node scripts/mint-badge.js
node scripts/append-viewer-glyph.js "🧭" "Ritual Navigator" "Pre-commit badge + codex sync" ".git/hooks/pre-commit"

echo "✅ Ritual complete. Codex, badge, and registry updated."
