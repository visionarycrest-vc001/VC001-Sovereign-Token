const fs = require('fs');
const path = require('path');
const { inscribeScroll } = require('./scrollInscription');
const { updateDashboard } = require('./dashboardHooks');

const logPath = './VC_BatchLog.md';

const vcFiles = fs.readdirSync(path.join(__dirname, '../'))
  .filter(f => /^vc\d{3}\.json$/.test(f));

vcFiles.forEach(file => {
  const vcData = require(path.join(__dirname, '../', file));

  // Scroll Inscription
  try {
    require('./scrollInscription')(vcData);
  } catch (err) {
    console.log(`⚠️ scrollInscription failed for ${file}:`, err.message);
  }

  // Dashboard Activation
  try {
    require('./dashboardHooks')(vcData);
  } catch (err) {
    console.log(`⚠️ dashboardHooks failed for ${file}:`, err.message);
  }

  // Invocation Scroll
  const tokenId = vcData.grantId || file.replace('.json', '').toUpperCase();
  const invocationPath = path.join(__dirname, '../', `${tokenId}_Invocation.md`);

  if (fs.existsSync(invocationPath)) {
    const invocation = fs.readFileSync(invocationPath, 'utf8');
    console.log(`\n🛡️ ${tokenId} Invocation Scroll:\n${invocation}`);
  } else {
    console.log(`⚠️ No invocation scroll found for ${tokenId}`);
  }

  // Steward Onboarding
  const cohortScript = path.join(__dirname, `onboard${tokenId}A.js`);
  if (fs.existsSync(cohortScript)) {
    try {
      const stewardBatch = require(`./onboard${tokenId}A`);
      stewardBatch.activateCohort(`${tokenId}-A`);
    } catch (err) {
      console.log(`⚠️ Steward onboarding failed for ${tokenId}-A:`, err.message);
    }
  } else {
    console.log(`🕊️ No steward onboarding script found for ${tokenId}-A`);
  }

  console.log(`✅ Sovereign flow completed for ${tokenId}\n`);
});

async function processVC(vcId) {
  let attempts = 0;
  let success = false;

  while (attempts < 3 && !success) {
    try {
      attempts++;
      console.log(`🔁 Attempt ${attempts} — Inscribing ${vcId}`);
      await inscribeScroll(vcId);
      await updateDashboard(vcId);
      logSuccess(vcId, attempts);
      success = true;
    } catch (err) {
      console.error(`❌ Attempt ${attempts} failed for ${vcId}:`, err);
      if (attempts === 3) logFailure(vcId, attempts, err);
    }
  }
}

function logSuccess(vcId, attempts) {
  const entry = `### ✅ ${vcId} — Scroll inscribed and dashboard updated after ${attempts} attempt(s)\n`;
  fs.appendFileSync(logPath, entry);
}

function logFailure(vcId, attempts, err) {
  const entry = `### ❌ ${vcId} — Failed after ${attempts} attempts\nError: ${err.message}\n`;
  fs.appendFileSync(logPath, entry);
}

