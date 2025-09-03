// 🛡️ CI Guardrail: Filename Validator for Sovereign Archive

const fs = require("fs");
const path = require("path");

const forbiddenChars = [":", "/", "\\", "*", "?", "\"", "<", ">", "|"];
const allowedPattern = /^[a-zA-Z0-9\-_.]+$/; // kebab-case, snake_case, dots, and common file conventions

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    // Skip common directories that may have unusual file names
    if (entry.isDirectory() && (entry.name === ".git" || entry.name === "node_modules" || entry.name === ".github")) {
      continue;
    }

    if (forbiddenChars.some(char => entry.name.includes(char))) {
      console.error(`❌ Invalid path detected: "${fullPath}"`);
      console.error("🛡️ Ritual Block: Forbidden character found. Use kebab-case.");
      process.exit(1);
    }

    if (!allowedPattern.test(entry.name)) {
      console.error(`⚠️ Non-standard name: "${fullPath}"`);
      console.error("🔍 Suggestion: Rename to kebab-case or snake_case.");
      process.exit(1);
    }

    if (entry.isDirectory()) {scanDir(fullPath);}
  }
}

scanDir(".");
console.log("✅ Path check passed: All filenames are sovereign-compliant.");
