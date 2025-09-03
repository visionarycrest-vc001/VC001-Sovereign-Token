// dashboard-deploy.js
// Unified VC003 dashboard deployment — lineage + signal activation

const fs = require("fs");
const { activateSignals } = require("../packages/scripts/signal-activate.js");
const { fetchMetrics, pushToDashboard } = require("./dashboard-utils.js");

const VC003 = {
  token: "VC003",
  protocol: "DOE 🜃",
  sector: "Climate Resilience",
  glyph: "⧉⚘⟒⟊",
  cohort: "VC003-A",
  metricsPath: "./vc003.json",
};

async function deployVC003Dashboard() {
  console.log(`🚀 Activating dashboard for ${VC003.token}...`);

  // Lineage logging (from reset branch)
  const rawData = JSON.parse(fs.readFileSync(VC003.metricsPath));
  console.log(`📊 Legacy Score: ${rawData.legacy_score}`);
  console.log(`👥 Steward Count: ${rawData.steward_count}`);
  console.log(`🔗 Dashboard URL: ${rawData.dashboard_url}`);
  console.log(`✅ Signal Status: ${rawData.signal_status}`);

  // Sovereign signal activation (from main branch)
  const metrics = await fetchMetrics(VC003.metricsPath);
  await activateSignals(metrics);
  await pushToDashboard(VC003.token, metrics);

  console.log("✅ VC003 metrics deployed and visible on sovereign dashboard.");
}

deployVC003Dashboard();
