# 📡 Watcher Protocol

Defines the metrics heartbeat and sovereign monitoring logic.

## 🔹 Metrics Tracked

- Active contributors
- Funding velocity
- Badge mint rate
- Last heartbeat timestamp

## 🔹 Source

All metrics stored in `watcher-metrics.json` and validated via `watcher-metrics.schema.json`.

## 🔹 Rituals

- Metrics recalibration → `recalibration-queue.json`
- Badge mint triggers → `ascension-log.json`
- Scroll archive → `lineage/`

## 🧙 Steward Reminder

Watcher must pulse every 24h. Drift triggers recalibration.
