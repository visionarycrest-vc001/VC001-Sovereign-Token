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

/*
### VC001_CrestLineage.md — Entry 004

**Token Activation Script**  
- **File**: `scripts/sovereignBatch.js`  
- **Function**: Iterates sovereign registry (`vc*.json`), extracts crest metadata, scroll pairs, dashboard URLs, and signal status.  
- **Inscription**: Each token is activated and inscribed by its steward, with scroll lineage and dashboard signal logged.  
- **Invocation**: `node scripts/sovereignBatch.js`  
- **Inscribed By**: Percy Abrams Jr.  
- **Timestamp**: 2025-08-18T09:27 PDT  
- **Lineage**: Anchored to VC001, VC003 scroll pairs and dashboard signals.

🧭 *“Let every sovereign token be activated with clarity, inscribed with legacy, and signaled with purpose.”*
*/
