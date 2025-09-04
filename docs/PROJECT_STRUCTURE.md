VC001-Sovereign-Token Sacred Autonomous Tree

├─ apps/
│  ├─ landing/                  # Static landing site (public, ceremonial)
│  │  ├─ index.html
│  │  ├─ styles.css
│  │  └─ viewer.js
│  ├─ watcher/                  # Live dashboard/watcher UI
│  │  ├─ dashboard.html
│  │  ├─ watcher.css
│  │  └─ watcher.js
│  └─ console/                  # Next.js admin/subscriber UI
│     ├─ pages/
│     ├─ components/
│     └─ lib/
├─ contracts/
│  ├─ VisionaryCrest001.sol     # ERC-721 Glyph contract (NFT, grants)
│  ├─ LToken.sol                # ERC-20 L-token contract (linked to glyphs)
│  └─ ceremonial_stub.sol       # Ceremonial starter stub (template)
├─ data/
│  ├─ grants/                   # Grant intake & status JSON
│  ├─ glyphs/                   # NFT metadata JSON (IPFS pointers)
│  ├─ ledger/                   # Issuance, burn, audit records
│  ├─ glyph-metadata/           # Metadata for minted NFTs
│  ├─ watcher-metrics.json      # Metrics for watcher dashboard
│  ├─ ascension-log.json        # Ritual log (ceremonial)
│  ├─ recalibration-queue.json  # For glyph recalibration
│  ├─ vc_ledger.json            # General ledger
│  ├─ vcxxxx_glyphset.json      # Glyphset (batch mint)
│  └─ schemas/                  # JSON Schemas for all above
│     ├─ grant.schema.json
│     ├─ glyph.schema.json
│     ├─ ledger.schema.json
│     ├─ ltoken.schema.json
│     ├─ approval.schema.json
│     ├─ ascension-log.schema.json
│     ├─ recalibration-queue.schema.json
│     ├─ glyph-metadata.schema.json
│     └─ ceremonial_schema.json
├─ docs/
│  ├─ ASCENSION_GUIDE.md        # Ceremonial onboarding
│  ├─ Glyph_Recalibration_Rituals.md
│  ├─ VC_GlyphCodex.md
│  ├─ VCXXXX_Protocol.md
│  ├─ Watcher_Protocol.md
│  ├─ status-dashboard.html     # Live mission control
│  ├─ GOVERNANCE.md
│  ├─ PROJECT_STRUCTURE.md      # This file
│  ├─ lineage/                  # Lineage scrolls
│  │  ├─ VC001_CrestLineage.md
│  │  ├─ VC001_Invocation.md
│  │  ├─ VC002_CrestLineage.md
│  │  ├─ VC002_Invocation.md
│  │  ├─ VC003_CrestLineage.md
│  │  └─ VC003_Invocation.md
│  └─ logs/                     # Ritual & batch logs
│     ├─ VC_AutonomyLog.md
│     ├─ VC_BatchLog.md
│     ├─ VC_BurnLog.md
│     ├─ VC_GrantLog.md
│     ├─ VC_OrchestrationLog.md
│     ├─ VC_PricingLog.md
│     ├─ VC_RetryLog.md
│     ├─ VC_RetryLog_raw.md
│     ├─ VC_SchedulerLog.md
│     ├─ VC_SecurityLog.md
│     └─ VC_WrapLog.md
├─ messages/                    # GSL message bus/envelopes (.glyph files)
│  ├─ intake/
│  ├─ review/
│  ├─ approved/
│  ├─ minted/
│  ├─ billing/
│  └─ burns/
│  └─ ceremonial_message.json
├─ packages/
│  ├─ core/                     # Shared, reusable runtime logic
│  │  ├─ autonomy.js
│  │  ├─ orchestrator.js
│  │  ├─ scheduler.js
│  │  ├─ grant-tracker.js
│  │  ├─ dashboardHooks.js
│  │  ├─ nft-pricing.js
│  │  ├─ burn-logic.js
│  │  ├─ index.js
│  │  └─ package.json
│  └─ scripts/                  # Node/CLI automation
│     ├─ generate-glyph-asset.js
│     ├─ pin-to-ipfs.js
│     ├─ mint-glyph.js
│     ├─ mint-ltoken.js
│     ├─ billing.js
│     ├─ burn-manager.js
│     ├─ draft-proposal.js
│     ├─ review-score.js
│     ├─ ledger-hash.js
│     ├─ gsl-sign.js
│     ├─ gsl-verify.js
│     ├─ intake-grants.js
│     ├─ submit-grant.js
│     ├─ update-dashboard.js
│     ├─ signal-activate.js
│     ├─ scroll-inscribe.js
│     ├─ sovereign-batch.js     # Renamed
│     └─ package.json
├─ public/
│  ├─ assets/
│  │  ├─ glyph-assets/
│  │  ├─ landing-icons/
│  │  ├─ template-icons/
│  │  ├─ ledger-icons/
│  │  └─ Solar-Powered Crest 3.png
│  └─ placeholder/
├─ scripts/
│  ├─ build.sh
│  ├─ deploy.sh
│  ├─ deploy-contracts.js
│  ├─ generate-timeline.js
│  ├─ Dashboard-deploy.js
│  ├─ mintGlyph.js
│  ├─ mintLToken.js
│  ├─ burnNFT.js
│  ├─ updateMetadata.js
│  ├─ processGrants.js
│  └─ wrapStackTraces.sh
├─ src/                        # Multi-language prototypes
│  ├─ cpp/placeholder.cpp
│  ├─ python/sovereign-placeholder.py
│  └─ rust/placeholder.rs
├─ templates/
│  └─ nft-metadata.template.json
├─ .github/
│  ├─ CODEOWNERS
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ bug.md
│  │  ├─ feature.md
│  │  └─ ceremonial_stub.md
│  ├─ PULL_REQUEST_TEMPLATE.md
│  ├─ tools/
│  │  ├─ validate-json.js
│  │  └─ gsl-lint.js
│  └─ workflows/
│     ├─ codeql.yml
│     ├─ deploy-pages.yml
│     ├─ json-validate.yml
│     ├─ metrics-cron.yml
│     ├─ signature-check.yml
│     ├─ setup-node.yml
│     ├─ grant-intake.yml
│     ├─ grant-draft.yml
│     ├─ grant-review.yml
│     ├─ grant-submit.yml
│     ├─ decision-monitor.yml
│     ├─ glyph-mint.yml
│     ├─ ltoken-mint.yml
│     ├─ billing.yml
│     ├─ burn-manager.yml
│     ├─ dashboard-update.yml
│     ├─ ai-fix.yml
│     ├─ auto-fix.yml
│     ├─ auto-merge-ai-fix.yml
│     ├─ predictive-alert.yml
│     ├─ grant-approval.yml
│     ├─ nft-metadata-update.yml
│     └─ ledger-hash.yml
├─ .editorconfig
├─ .gitattributes
├─ .gitignore
├─ .pre-commit-config.yaml      # (or Husky configs)
├─ package.json                 # root, with workspaces
├─ package-lock.json
├─ README.md                    # repo overview
├─ SECURITY.md
├─ CHANGELOG.md
├─ TIMELINE.md
└─ LICENSE
