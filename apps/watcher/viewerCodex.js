document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://raw.githubusercontent.com/visionarycrest-vc001/VC001-Sovereign-Token/main/VC_LegacyCodex.md"
  )
    .then(res => res.text())
    .then(data => {
      const codex = document.getElementById("codex");
      codex.innerHTML = marked.parse(data); // Requires marked.js for Markdown rendering
    });
});
