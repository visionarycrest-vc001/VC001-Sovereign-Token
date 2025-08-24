![CI](https://github.com/visionarycrest-vc001/VC001-Sovereign-Token/actions/workflows/sovereign-validate.yml/badge.svg)
![Signed Commits](https://github.com/visionarycrest-vc001/VC001-Sovereign-Token/actions/workflows/verify-signatures.yml/badge.svg)
![Metrics Heartbeat](https://github.com/visionarycrest-vc001/VC001-Sovereign-Token/actions/workflows/metrics-cron.yml/badge.svg)
![Pages Deploy](https://github.com/visionarycrest-vc001/VC001-Sovereign-Token/actions/workflows/deploy-pages.yml/badge.svg)

<sub>**CI**: schema validation • **Signed Commits**: governance intact • **Metrics**: watcher alive • **Deploy**: pages up to date</sub>

# VC001-Sovereign-Token
Ceremonial and operational package for Visionary Crest VC001
## 🛡️ Sovereign Scrolls

- [VC001_CrestLineage.md](VC001_CrestLineage.md): Symbolic and technical lineage scroll  
- [VC001_Invocation.md](VC001_Invocation.md): Ceremonial invocation  
- [SECURITY.md](SECURITY.md): CodeQL scan and steward protocols  

Action: Top-level orientation and quickstart.

cat > README.md << 'EOF'
# Sovereign Archive

A ceremonial, static-first archive: landing (public), watcher (internal), data (truth), and codex (meaning).

## Quickstart
- npm not required; serve apps/* as static.
- Edit data/*.json; landing and watcher reflect updates.
- ./scripts/build.sh then ./scripts/deploy.sh to publish.

## Folders
- apps/landing — public viewer of ledger and ascensions
- apps/watcher — internal dashboard for metrics and queues
- data — vc ledger, glyph overflow, metrics, ascension, recalibration
- codex — protocols, rituals, and glyph meanings
- public/assets — images, glyphs, icons
- templates — nft metadata template
- scripts — build and deploy
EOF

git checkout -b docs/status-badges
# Edit README.md and insert the above block at line 1
git add README.md
git commit -m "🏷️ Docs: add CI, signed commit, heartbeat, and deploy badges with legend"
git checkout main
git merge --no-ff docs/status-badges -m "🏷️ Merge status badges into main"
git push
## VC001: The Sovereign Ascent

> “In the ledger’s quiet lines, destinies are written.”

**Foundation stones:** From its earliest grant and batch entries, VC001 emerged as a sovereign identity in waiting. Early allocations and rites formed the roots of its lineage.

**Orchestrated rise:** Orchestration logs show sequenced actions: systems aligned, signals exchanged, each step dependent on the last—a symphony of subsystems.

**Guardians & timelocks:** Security and scheduler checkpoints stood vigilant, ensuring ascension could not be rushed; readiness was measured in proof and patience.

**Watcher’s decree — 2025‑08‑21:** Prime crest affirmed for VC001. This wasn’t cosmetic; it marked elevation into the crest’s topmost tier.

- **Timeline:** See TIMELINE.md for a narrative of events.
- **Guide:** See ASCENSION_GUIDE.md for crest roles, lifecycle, and validation rules.
