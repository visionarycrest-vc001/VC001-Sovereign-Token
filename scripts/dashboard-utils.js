// dashboard-utils.js
const fs = require("fs");

function fetchMetrics(metricsPath) {
  return JSON.parse(fs.readFileSync(metricsPath, "utf8"));
}

function pushToDashboard(token, metrics) {
  console.log(`📊 Pushing metrics for ${token} to dashboard...`);
  console.log(`📈 Metrics: ${JSON.stringify(metrics, null, 2)}`);
  return Promise.resolve();
}

module.exports = { fetchMetrics, pushToDashboard };