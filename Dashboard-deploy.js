// dashboard-deploy.js
// Deploy VC003 metrics to sovereign dashboard

import { activateSignals } from './signal-activate.js';
import { fetchMetrics, pushToDashboard } from './dashboard-utils.js';

const VC003 = {
  token: 'VC003',
  protocol: 'DOE 🜃',
  sector: 'Climate Resilience',
  glyph: '⧉⚘⟒⟊',
  cohort: 'VC003-A',
  metricsPath: './vc003.json',
};

async function deployVC003Dashboard() {
  console.log(`🚀 Activating dashboard for ${VC003.token}...`);

  const metrics = await fetchMetrics(VC003.metricsPath);
  await activateSignals(metrics);
  await pushToDashboard(VC003.token, metrics);

  console.log(`✅ VC003 metrics deployed and visible on sovereign dashboard.`);
}

deployVC003Dashboard();
