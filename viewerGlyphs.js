document.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://raw.githubusercontent.com/visionarycrest-vc001/VC001-Sovereign-Token/main/glyph-log.md"
  )
    .then(res => res.text())
    .then(data => {
      const glyphs = document.getElementById("glyphs");
      glyphs.innerHTML = `<pre>${data}</pre>`;
    });
});
