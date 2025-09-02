const fs = require("fs");
const codexPath = "vc-legacy-codex.md";
const newEntry = `- \`${new Date().toISOString().split("T")[0]}\` — Ritual #043: Viewer dashboard wired`;

fs.appendFileSync(codexPath, `\n${newEntry}\n`);
console.log("Codex updated with new ritual.");
