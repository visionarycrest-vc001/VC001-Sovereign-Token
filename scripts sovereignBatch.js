// scripts/sovereignBatch.js
const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..');
const files = fs.readdirSync(registryPath).filter(f => f.startsWith('vc') && f.endsWith('.json'));

files.forEach(file => {
  const tokenData = JSON.parse(fs.readFileSync(path.join(registryPath, file), 'utf8'));
  const { token, lineage, dashboard_url, signal_status } = tokenData;

  console.log(`🔗 Activating ${token}`);
  console.log(`📜 Scrolls: ${lineage.scroll_pair.join(', ')}`);
  console.log(`📊 Dashboard: ${dashboard_url}`);
  console.log(`🟢 Signal Status: ${signal_status}`);

  // Simulate inscription and activation
  console.log(`✅ ${token} activated and inscribed by ${lineage.inscribed_by}\n`);
});
