/**
 * 📊 Dashboard Update Manager
 * 
 * Ceremonial script for updating the status dashboard
 * Aggregates metrics and generates dashboard content
 * 
 * @file packages/scripts/update-dashboard.js
 * @author Visionary Inc.
 * @version 1.0.0
 */

const fs = require('fs');
const path = require('path');

/**
 * Collect system metrics
 * @returns {object} System metrics
 */
function collectMetrics() {
  const grantsDir = path.join(__dirname, '../../data/grants');
  const glyphsDir = path.join(__dirname, '../../data/glyphs');
  const ledgerDir = path.join(__dirname, '../../data/ledger');
  
  const metrics = {
    grants: { total: 0, pending: 0, approved: 0, minted: 0 },
    glyphs: { total: 0, active: 0, burned: 0 },
    ltokens: { transactions: 0, total_minted: 0, total_burned: 0 },
    sectors: { FDA: 0, EDA: 0, SAM: 0 },
    last_updated: new Date().toISOString()
  };
  
  // Count grants
  if (fs.existsSync(grantsDir)) {
    const grantFiles = fs.readdirSync(grantsDir).filter(f => f.endsWith('.json'));
    metrics.grants.total = grantFiles.length;
    
    grantFiles.forEach(file => {
      const grant = JSON.parse(fs.readFileSync(path.join(grantsDir, file), 'utf8'));
      metrics.grants[grant.status] = (metrics.grants[grant.status] || 0) + 1;
      metrics.sectors[grant.sector] = (metrics.sectors[grant.sector] || 0) + 1;
    });
  }
  
  // Count glyphs
  if (fs.existsSync(glyphsDir)) {
    const glyphFiles = fs.readdirSync(glyphsDir).filter(f => f.endsWith('.json'));
    metrics.glyphs.total = glyphFiles.length;
    
    glyphFiles.forEach(file => {
      const glyph = JSON.parse(fs.readFileSync(path.join(glyphsDir, file), 'utf8'));
      if (glyph.operational_data.burn_status) {
        metrics.glyphs.burned++;
      } else {
        metrics.glyphs.active++;
      }
    });
  }
  
  // Count L-Token transactions
  if (fs.existsSync(ledgerDir)) {
    const ledgerFiles = fs.readdirSync(ledgerDir).filter(f => f.endsWith('.json'));
    metrics.ltokens.transactions = ledgerFiles.length;
    
    ledgerFiles.forEach(file => {
      const transaction = JSON.parse(fs.readFileSync(path.join(ledgerDir, file), 'utf8'));
      const amount = parseFloat(transaction.amount || 0);
      
      if (transaction.type === 'mint') {
        metrics.ltokens.total_minted += amount;
      } else if (transaction.type === 'burn') {
        metrics.ltokens.total_burned += amount;
      }
    });
  }
  
  return metrics;
}

/**
 * Generate dashboard HTML
 * @param {object} metrics - System metrics
 * @returns {string} Dashboard HTML content
 */
function generateDashboardHTML(metrics) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🏛️ VC001 Sovereign Status Dashboard</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .metrics-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .metric-card { background: rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; backdrop-filter: blur(10px); }
        .metric-title { font-size: 1.2em; font-weight: bold; margin-bottom: 15px; display: flex; align-items: center; }
        .metric-value { font-size: 2em; font-weight: bold; margin: 10px 0; }
        .metric-detail { font-size: 0.9em; opacity: 0.9; margin: 5px 0; }
        .progress-bar { background: rgba(255, 255, 255, 0.2); height: 8px; border-radius: 4px; overflow: hidden; margin: 10px 0; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); transition: width 0.3s ease; }
        .footer { text-align: center; margin-top: 40px; opacity: 0.8; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏛️ VC001 Sovereign Status Dashboard</h1>
            <p>Real-time monitoring of grant processing and token ecosystem</p>
            <p><small>Last updated: ${new Date(metrics.last_updated).toLocaleString()}</small></p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">📋 Grant Applications</div>
                <div class="metric-value">${metrics.grants.total}</div>
                <div class="metric-detail">✅ Approved: ${metrics.grants.approved || 0}</div>
                <div class="metric-detail">⏳ Pending: ${metrics.grants.pending || 0}</div>
                <div class="metric-detail">🪙 Minted: ${metrics.grants.minted || 0}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${metrics.grants.total > 0 ? (metrics.grants.approved || 0) / metrics.grants.total * 100 : 0}%"></div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">🎭 Sovereign Glyphs</div>
                <div class="metric-value">${metrics.glyphs.total}</div>
                <div class="metric-detail">🟢 Active: ${metrics.glyphs.active}</div>
                <div class="metric-detail">🔥 Burned: ${metrics.glyphs.burned}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${metrics.glyphs.total > 0 ? metrics.glyphs.active / metrics.glyphs.total * 100 : 0}%"></div>
                </div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">💰 L-Token Economy</div>
                <div class="metric-value">${(metrics.ltokens.total_minted - metrics.ltokens.total_burned).toLocaleString()}</div>
                <div class="metric-detail">📈 Total Minted: ${metrics.ltokens.total_minted.toLocaleString()}</div>
                <div class="metric-detail">📉 Total Burned: ${metrics.ltokens.total_burned.toLocaleString()}</div>
                <div class="metric-detail">🔄 Transactions: ${metrics.ltokens.transactions}</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">🎯 Sector Distribution</div>
                <div class="metric-detail">🏥 FDA (Health): ${metrics.sectors.FDA || 0}</div>
                <div class="metric-detail">🌱 EDA (Environment): ${metrics.sectors.EDA || 0}</div>
                <div class="metric-detail">⚡ SAM (Strategy): ${metrics.sectors.SAM || 0}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${metrics.grants.total > 0 ? Math.max(metrics.sectors.FDA || 0, metrics.sectors.EDA || 0, metrics.sectors.SAM || 0) / metrics.grants.total * 100 : 0}%"></div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p>🧭 Inscribed by the Sovereign Archive • VC001 System</p>
            <p><small>Auto-updated every hour by the Dashboard Manager</small></p>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Update status dashboard
 * @returns {object} Update result
 */
function updateDashboard() {
  try {
    console.log('📊 Updating status dashboard...');
    
    const metrics = collectMetrics();
    const dashboardHTML = generateDashboardHTML(metrics);
    
    const dashboardFile = path.join(__dirname, '../../docs/status-dashboard.html');
    const docsDir = path.dirname(dashboardFile);
    
    if (!fs.existsSync(docsDir)) {
      fs.mkdirSync(docsDir, { recursive: true });
    }
    
    fs.writeFileSync(dashboardFile, dashboardHTML);
    
    console.log('✅ Dashboard updated successfully');
    console.log(`📋 Total Grants: ${metrics.grants.total}`);
    console.log(`🎭 Total Glyphs: ${metrics.glyphs.total}`);
    console.log(`💰 L-Token Supply: ${(metrics.ltokens.total_minted - metrics.ltokens.total_burned).toLocaleString()}`);
    console.log(`📁 Saved to: ${dashboardFile}`);
    
    return { success: true, metrics, filepath: dashboardFile };
    
  } catch (error) {
    console.error('❌ Error updating dashboard:', error.message);
    return { success: false, error: error.message };
  }
}

// CLI interface
if (require.main === module) {
  updateDashboard();
}

module.exports = { updateDashboard, collectMetrics, generateDashboardHTML };