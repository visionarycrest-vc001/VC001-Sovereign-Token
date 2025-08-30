# 🔮 Glyph Recalibration Rituals

Glyphs must be recalibrated when:

- Their animation desynchronizes
- Their usage context expands
- Their mnemonic clarity fades

## 🛠️ Ritual Protocol

1. Identify glyph in `vcxxxx_glyphset.json`
2. Submit recalibration request to `recalibration-queue.json`
3. Council vote triggers glyph pulse
4. Archive recalibration in `lineage/`

## 🧙 Example

```json
{
  "id": "glyph-crest-lock",
  "reason": "used in badge minting + council overlay",
  "scheduledFor": "2025-09-01T00:00:00Z"
}
