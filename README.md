VC001-Sovereign-Token
Ceremonial and operational package for Visionary Crest VC001

🛡️ Sovereign Scrolls
VC001_CrestLineage.md: Symbolic and technical lineage scroll
VC001_Invocation.md: Ceremonial invocation
SECURITY.md: CodeQL scan and steward protocols
🔄 Closed‑Loop Autonomous Ecosystem
Below is the full lifecycle of our self‑maintaining, self‑healing, and self‑governing repository — with live status for each automation phase.

Phase Workflow Status
📁 Structure CodeQL ![CodeQL](https://github.com/<OWNER>/<REPO>/actions/workflows/codeql.yml/badge.svg)
🧰 Guardrails Validate JSON ![Validate JSON](https://github.com/<OWNER>/<REPO>/actions/workflows/json-validate.yml/badge.svg)
🧪 Guardrails Run Tests ![Run Tests](https://github.com/<OWNER>/<REPO>/actions/workflows/test.yml/badge.svg)
🧹 Self‑Healing Auto‑Fix ![Auto-Fix](https://github.com/<OWNER>/<REPO>/actions/workflows/auto-fix.yml/badge.svg)
♻️ Self‑Healing Metrics Cron ![Metrics Cron](https://github.com/<OWNER>/<REPO>/actions/workflows/metrics-cron.yml/badge.svg)
🏛 Governance Governance Review ![Governance Review](https://github.com/<OWNER>/<REPO>/actions/workflows/governance-review.yml/badge.svg)
🧠 Intelligence Predictive Alert ![Predictive Alert](https://github.com/<OWNER>/<REPO>/actions/workflows/predictive-alert.yml/badge.svg)
💡 Intelligence AI Fix ![AI Fix](https://github.com/<OWNER>/<REPO>/actions/workflows/ai-fix.yml/badge.svg)
🤖 Self‑Repair Auto‑Merge AI Fix ![Auto-Merge AI Fix](https://github.com/<OWNER>/<REPO>/actions/workflows/auto-merge-ai-fix.yml/badge.svg)
Replace <OWNER> and <REPO> with your GitHub username/org and repository name for live badges.

📁 Project Structure & Setup
This repository uses a modular, ceremonial, and operational file structure. All contributors should follow these guidelines for onboarding, contributions, and reviews.

Directory & File Checklist
Apps
apps/console/ — Web UI for subscribers & admin
Smart Contracts
contracts/VisionaryCrest001.sol — ERC-721 Glyph contract
contracts/LToken.sol — ERC-20 L-token contract
Data Structure
data/grants/ — Intake & status JSON
data/glyphs/ — NFT metadata JSON
data/ledger/ — Issuance, burn, audit records
data/schemas/ — JSON Schemas for validation
Documentation
docs/status-dashboard.html — Live mission control
docs/GOVERNANCE.md — Governance documentation
Messages System
messages/intake/
messages/review/
messages/approved/
messages/minted/
messages/billing/
messages/burns/
(GSL bot-to-bot envelopes)
Package Scripts
packages/core/ — Shared logic
packages/scripts/generate-glyph-asset.js
packages/scripts/pin-to-ipfs.js
packages/scripts/mint-glyph.js
packages/scripts/mint-ltoken.js
packages/scripts/billing.js
packages/scripts/burn-manager.js
packages/scripts/draft-proposal.js
packages/scripts/review-score.js
packages/scripts/ledger-hash.js
packages/scripts/gsl-sign.js
packages/scripts/gsl-verify.js
Deployment Scripts
scripts/deploy-contracts.js
GitHub Tools
.github/tools/gsl-lint.js
.github/tools/validate-json.js
GitHub Workflows
.github/workflows/grant-intake.yml
.github/workflows/grant-draft.yml
.github/workflows/grant-review.yml
.github/workflows/grant-submit.yml
.github/workflows/decision-monitor.yml
.github/workflows/glyph-mint.yml
.github/workflows/ltoken-mint.yml
.github/workflows/billing.yml
.github/workflows/burn-manager.yml
.github/workflows/ledger-hash.yml
.github/workflows/dashboard-update.yml
.github/workflows/auto-fix.yml
.github/workflows/ai-fix.yml
.github/workflows/auto-merge-ai-fix.yml
.github/workflows/predictive-alert.yml
Root Files
package.json — Ensure proper configuration
README.md — Keep up to date
Testing & Validation
Fix linting issues
Test file structure
Validate all stub files follow ceremonial format
🪬 Lifecycle Automation Phases

<details> <summary>📁 Phase 1: Structure</summary>
Normalize folder names (kebab‑case, no spaces)
Organize into apps/, packages/, data/, docs/, public/, scripts/, src/
Consolidate docs & assets
Add base workflows: CodeQL, CI
</details> <details> <summary>🧰 Phase 2: Guardrails</summary>
.editorconfig, .gitattributes, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md
JSON schema validation in CI & pre‑commit
Automated tests & linting
npm workspaces for shared code
Onboarding docs
</details> <details> <summary>🧹 Phase 3: Self‑Healing</summary>
Auto‑fix lint/format in CI
Dependabot for dependencies
Auto‑regenerate metrics/docs
Auto‑merge safe PRs
Failure alerts → auto‑issue
</details> <details> <summary>🏛 Phase 4: Governance</summary>
CODEOWNERS + branch protection
Governance model doc
Proposal & voting workflow
Monthly governance review
Transparent decision‑making
</details> <details> <summary>🧠 Phase 5: Intelligence</summary>
Predictive failure analysis
AI fix suggestions
Proactive performance tuning
AI‑assisted documentation
</details> <details> <summary>♻️ Phase 5.5: Continuous Self‑Repair</summary>
Multi‑pass AI fixes until green
Auto‑edit failing files
Auto‑merge successful AI PRs
Main branch healed without human intervention
</details>
Contribution Guidance
Starter Stubs:
All new files and folders must include ceremonial/operational starter stubs, following repository conventions:

Scripts/contracts: Add comment blocks at the top with purpose, usage, and parameters.
Docs/Markdowns: Start with a clear heading and brief description.
Schemas/metadata: Use template JSON structure (see /data/schemas/ for examples). See templates directory for examples.
Checklist Maintenance:
Update this checklist whenever the project structure changes. Contributors are encouraged to propose updates in their PRs; maintainers should review and approve changes after major merges.

Visibility:
Reference this checklist in onboarding materials (README.md), contributor guides (CONTRIBUTING.md), and PR templates. Ensure links are present and instructions are clear for new contributors.

How to use:

Keep this README.md up to date alongside the repo’s structure and automation.
For onboarding, reference this doc in internal guides and contribution documentation.

## 📁 Project Structure & Setup

See [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) for the full directory and workflow checklist.
