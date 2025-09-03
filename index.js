const stewardBatch = require("./onboardVC003A");

stewardBatch.activateCohort("VC003-A");
// scripts/index.js

const fs = require("fs");
const path = require("path");

// Load VC003 Invocation Scroll
const invocationPath = path.join(__dirname, "../VC003_Invocation.md");
const invocation = fs.readFileSync(invocationPath, "utf8");

// Load VC003 Governance JSON
const vc003 = require("../vc003.json");

// Activate Scroll Inscription
require("./scrollInscription")(vc003);

// Trigger Dashboard Hooks
require("./dashboardHooks")(vc003);

// Activate Steward Cohort VC003-A
const stewardBatch = require("./onboardVC003A");
stewardBatch.activateCohort("VC003-A");

// Ceremonial Output
console.log("🛡️ VC003 Sovereign Invocation Activated:\n");
console.log(invocation);
console.log("\n📊 Dashboard, Scroll, and Steward Cohort Logic Executed.");
