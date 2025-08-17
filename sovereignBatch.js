const fs = require('fs');
const path = require('path');

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
