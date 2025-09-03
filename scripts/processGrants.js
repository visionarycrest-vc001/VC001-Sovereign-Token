/*
🌿 Grant Processing Script — VC001 Sovereign Protocol
=====================================================

**Function**: Processes grant applications, approvals, and dashboard synchronization
**Invocation**: `node scripts/processGrants.js [action] [grantId]`
**Inscribed By**: Percy Abrams Jr.
**Timestamp**: 2025-09-03T05:10 UTC
**Lineage**: Anchored to sovereign grant allocation protocol

🧭 *"Let every grant be processed with wisdom, allocated with purpose, and tracked with transparency."*
*/

const fs = require("fs");
const path = require("path");

// Grant processing actions
const GRANT_ACTIONS = {
  intake: "Process new grant application",
  approve: "Approve grant and allocate tokens",
  reject: "Reject grant application",
  review: "Add review to grant application",
  "sync-dashboard": "Synchronize grant data with dashboard",
  status: "Check grant status",
};

// Grant statuses
const GRANT_STATUS = {
  pending: "Pending Review",
  approved: "Approved & Allocated",
  rejected: "Rejected",
  completed: "Grant Completed",
  expired: "Grant Expired",
};

// Grant sectors aligned with contract
const GRANT_SECTORS = {
  FDA: 1, // Food & Drug Administration
  EDA: 2, // Environmental Development Agency
  SAM: 3, // Sustainable Agriculture & Medicine
};

/**
 * Validate grant processing parameters
 * @param {string} action - Action to perform
 * @param {string} grantId - Grant ID (optional for some actions)
 */
function validateGrantParams(action, grantId) {
  if (!GRANT_ACTIONS[action]) {
    throw new Error(
      `Invalid action. Valid actions: ${Object.keys(GRANT_ACTIONS).join(", ")}`
    );
  }

  if (["approve", "reject", "review", "status"].includes(action) && !grantId) {
    throw new Error(`Grant ID is required for action: ${action}`);
  }

  return true;
}

/**
 * Generate grant metadata
 * @param {string} grantId - Grant ID
 * @param {object} grantData - Grant application data
 */
function generateGrantMetadata(grantId, grantData = {}) {
  const timestamp = new Date().toISOString();

  const metadata = {
    grant_id: grantId,
    title: grantData.title || `Grant Application #${grantId}`,
    description: grantData.description || "Sovereign grant application",
    applicant: grantData.applicant || "Unknown",
    sector: grantData.sector || "FDA",
    sector_code: GRANT_SECTORS[grantData.sector] || GRANT_SECTORS.FDA,
    requested_amount: grantData.amount || 0,
    status: grantData.status || GRANT_STATUS.pending,
    application_date: grantData.application_date || timestamp,
    last_updated: timestamp,
    steward_notes: [],
    ceremonial_blessing: "🌿 May this grant serve the sovereign purpose",
    lineage_anchor: "VC001 Grant Protocol",
  };

  return metadata;
}

/**
 * Process grant intake
 * @param {string} grantId - Grant ID
 * @param {object} applicationData - Application data
 */
async function processGrantIntake(grantId = null, applicationData = {}) {
  console.log(`🌿 Processing grant intake...`);

  // Generate grant ID if not provided
  if (!grantId) {
    grantId = `GRANT-${Date.now()}`;
  }

  console.log(`   Grant ID: ${grantId}`);

  // Setup paths
  const grantsDir = path.join(__dirname, "..", "data", "grants");
  const intakeLogFile = path.join(grantsDir, "intake-log.md");
  const grantFile = path.join(grantsDir, `${grantId}.json`);

  // Ensure directory exists
  if (!fs.existsSync(grantsDir)) {
    fs.mkdirSync(grantsDir, { recursive: true });
  }

  // Generate grant metadata
  const grantMetadata = generateGrantMetadata(grantId, applicationData);

  // Write grant file
  fs.writeFileSync(grantFile, JSON.stringify(grantMetadata, null, 2));

  // Log intake
  const intakeEntry = `### Grant Intake - ${new Date().toISOString()}
- **Grant ID**: ${grantId}
- **Applicant**: ${grantMetadata.applicant}
- **Sector**: ${grantMetadata.sector}
- **Requested Amount**: ${grantMetadata.requested_amount} LTOKEN
- **Status**: ${grantMetadata.status}
- **File**: ${path.basename(grantFile)}

---

`;

  fs.appendFileSync(intakeLogFile, intakeEntry);

  console.log(`✅ Grant intake processed successfully!`);
  console.log(`   Grant file: ${grantFile}`);

  return {
    grantId,
    metadata: grantMetadata,
    grantFile,
  };
}

/**
 * Approve grant and allocate tokens
 * @param {string} grantId - Grant ID to approve
 * @param {string} steward - Approving steward
 */
async function approveGrant(grantId, steward = "system") {
  console.log(`✅ Processing grant approval...`);
  console.log(`   Grant ID: ${grantId}`);
  console.log(`   Approving Steward: ${steward}`);

  // Setup paths
  const grantsDir = path.join(__dirname, "..", "data", "grants");
  const grantFile = path.join(grantsDir, `${grantId}.json`);
  const approvalLogFile = path.join(grantsDir, "approved-log.md");

  // Load grant metadata
  if (!fs.existsSync(grantFile)) {
    throw new Error(`Grant file not found: ${grantId}`);
  }

  let grantMetadata;
  try {
    grantMetadata = JSON.parse(fs.readFileSync(grantFile, "utf8"));
  } catch (error) {
    throw new Error(`Could not parse grant file: ${grantId}`);
  }

  // Update grant status
  grantMetadata.status = GRANT_STATUS.approved;
  grantMetadata.approved_by = steward;
  grantMetadata.approval_date = new Date().toISOString();
  grantMetadata.last_updated = new Date().toISOString();

  // Add steward note
  grantMetadata.steward_notes.push({
    steward: steward,
    action: "approval",
    note: `Grant approved and tokens allocated`,
    timestamp: new Date().toISOString(),
  });

  // Write updated grant file
  fs.writeFileSync(grantFile, JSON.stringify(grantMetadata, null, 2));

  // Log approval
  const approvalEntry = `### Grant Approval - ${new Date().toISOString()}
- **Grant ID**: ${grantId}
- **Applicant**: ${grantMetadata.applicant}
- **Approved Amount**: ${grantMetadata.requested_amount} LTOKEN
- **Approved By**: ${steward}
- **Sector**: ${grantMetadata.sector}
- **Status**: ✅ ${grantMetadata.status}

---

`;

  fs.appendFileSync(approvalLogFile, approvalEntry);

  // Update grant statistics
  updateGrantStatistics(
    "approved",
    grantMetadata.sector,
    grantMetadata.requested_amount
  );

  console.log(`✅ Grant approved successfully!`);
  console.log(`   Amount: ${grantMetadata.requested_amount} LTOKEN`);
  console.log(`   Sector: ${grantMetadata.sector}`);

  return {
    grantId,
    metadata: grantMetadata,
    approved: true,
  };
}

/**
 * Synchronize grant data with dashboard
 */
async function syncGrantDashboard() {
  console.log(`📊 Synchronizing grant data with dashboard...`);

  const grantsDir = path.join(__dirname, "..", "data", "grants");
  const dashboardFile = path.join(
    __dirname,
    "..",
    "data",
    "grant-dashboard.json"
  );

  // Get all grant files
  const grantFiles = fs
    .readdirSync(grantsDir)
    .filter((file) => file.endsWith(".json") && file.startsWith("GRANT-"));

  const dashboardData = {
    total_grants: grantFiles.length,
    grants_by_status: {},
    grants_by_sector: {},
    total_allocated: 0,
    last_updated: new Date().toISOString(),
    grants: [],
  };

  // Process each grant
  for (const file of grantFiles) {
    try {
      const grantData = JSON.parse(
        fs.readFileSync(path.join(grantsDir, file), "utf8")
      );

      // Count by status
      dashboardData.grants_by_status[grantData.status] =
        (dashboardData.grants_by_status[grantData.status] || 0) + 1;

      // Count by sector
      dashboardData.grants_by_sector[grantData.sector] =
        (dashboardData.grants_by_sector[grantData.sector] || 0) + 1;

      // Sum allocated amounts for approved grants
      if (grantData.status === GRANT_STATUS.approved) {
        dashboardData.total_allocated += grantData.requested_amount || 0;
      }

      // Add grant summary
      dashboardData.grants.push({
        grant_id: grantData.grant_id,
        title: grantData.title,
        applicant: grantData.applicant,
        sector: grantData.sector,
        amount: grantData.requested_amount,
        status: grantData.status,
        application_date: grantData.application_date,
      });
    } catch (error) {
      console.warn(`Could not process grant file: ${file}`);
    }
  }

  // Write dashboard data
  fs.writeFileSync(dashboardFile, JSON.stringify(dashboardData, null, 2));

  console.log(`✅ Dashboard synchronized!`);
  console.log(`   Total grants: ${dashboardData.total_grants}`);
  console.log(`   Total allocated: ${dashboardData.total_allocated} LTOKEN`);

  return dashboardData;
}

/**
 * Update grant statistics
 * @param {string} action - Action performed
 * @param {string} sector - Grant sector
 * @param {number} amount - Token amount
 */
function updateGrantStatistics(action, sector, amount = 0) {
  const statsFile = path.join(__dirname, "..", "data", "grant-statistics.json");
  let stats = {
    total_processed: 0,
    total_approved: 0,
    total_rejected: 0,
    total_allocated: 0,
    sectors: {},
    last_updated: null,
  };

  // Load existing stats
  if (fs.existsSync(statsFile)) {
    try {
      stats = JSON.parse(fs.readFileSync(statsFile, "utf8"));
    } catch (error) {
      console.warn("Could not parse grant statistics, creating new file");
    }
  }

  // Update statistics
  stats.total_processed += 1;
  if (action === "approved") {
    stats.total_approved += 1;
    stats.total_allocated += amount;
  } else if (action === "rejected") {
    stats.total_rejected += 1;
  }

  // Update sector stats
  if (!stats.sectors[sector]) {
    stats.sectors[sector] = { count: 0, allocated: 0 };
  }
  stats.sectors[sector].count += 1;
  if (action === "approved") {
    stats.sectors[sector].allocated += amount;
  }

  stats.last_updated = new Date().toISOString();

  // Write updated stats
  fs.writeFileSync(statsFile, JSON.stringify(stats, null, 2));

  console.log(`📊 Grant statistics updated: ${action} for ${sector} sector`);
}

/**
 * Main grant processing function
 * @param {string} action - Action to perform
 * @param {string} grantId - Grant ID (optional)
 */
async function processGrants(action, grantId = null) {
  console.log(`🌿 Initiating grant processing protocol...`);
  console.log(`   Action: ${GRANT_ACTIONS[action]}`);

  // Validate parameters
  validateGrantParams(action, grantId);

  let result;

  switch (action) {
    case "intake":
      result = await processGrantIntake(grantId);
      break;
    case "approve":
      result = await approveGrant(grantId);
      break;
    case "sync-dashboard":
      result = await syncGrantDashboard();
      break;
    default:
      throw new Error(`Action not implemented: ${action}`);
  }

  console.log(`✅ Grant processing completed successfully!`);

  return result;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  const action = args[0] || "intake";
  const grantId = args[1];

  processGrants(action, grantId)
    .then((result) => {
      console.log(`🎉 Grant processing ceremony completed!`);
      process.exit(0);
    })
    .catch((error) => {
      console.error(`❌ Grant processing failed:`, error.message);
      process.exit(1);
    });
}

module.exports = {
  processGrants,
  processGrantIntake,
  approveGrant,
  syncGrantDashboard,
  GRANT_ACTIONS,
  GRANT_STATUS,
  GRANT_SECTORS,
};
