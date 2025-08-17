const fs = require('fs');

const tokenFile = 'vc003.json';
const tokenData = JSON.parse(fs.readFileSync(tokenFile));

console.log(`🚀 Deploying VC003 metrics to dashboard...`);
console.log(`📊 Legacy Score: ${tokenData.legacy_score}`);
console.log(`👥 Steward Count: ${tokenData.steward_count}`);
console.log(`🔗 Dashboard URL: ${tokenData.dashboard_url}`);
console.log(`✅ Signal Status: ${tokenData.signal_status}`);
