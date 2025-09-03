// grant-tracker.js
// Monitors grant disbursement status and updates dashboard signals

const fs = require("fs");
const VC_TOKENS = require("./vc001.json"); // Extend to vc999.json dynamically

// Simulated grant ledger (replace with API or database call)
const GRANT_LEDGER = {
  VC001: { status: "completed", amount: 50000 },
  VC002: { status: "pending", amount: 25000 },
  VC003: { status: "overdue", amount: 0 },
};

function trackGrants() {
  const updates = [];

  for (const vc of Object.keys(VC_TOKENS)) {
    const grant = GRANT_LEDGER[vc];
    if (!grant) {
      continue;
    }

    updates.push({
      token: vc,
      status: grant.status,
      amount: grant.amount,
      timestamp: new Date().toISOString(),
    });

    console.log(`📡 ${vc} grant status: ${grant.status} (${grant.amount})`);
  }

  fs.writeFileSync("VC_GrantStatus.md", formatGrantLog(updates));
  console.log("✅ Grant tracker updated and inscribed.");
}

function formatGrantLog(logs) {
  let output = "# 📡 Sovereign Grant Status Log\n\n";
  output += "| Token | Status | Amount | Timestamp |\n";
  output += "|-------|--------|--------|-----------|\n";
  for (const entry of logs) {
    output += `| ${entry.token} | ${entry.status} | ${entry.amount} | ${entry.timestamp} |\n`;
  }
  return output;
}

trackGrants();
