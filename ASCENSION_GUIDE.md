# Ascension guide

**Purpose:** Explain crest tiers, validation, and event recording.

## Roles
- **VC entity:** The subject of ascension (e.g., VC001).
- **Watcher:** Final arbiter acknowledging state changes.
- **Gatekeepers:** Security and scheduler components that enforce checks.

## Event model
- **Event fields:** timestamp (ISO 8601), vc (ID), action (approved/denied), by (role), note (free text).
- **Source of truth:** Data/ascension-log.json.

## Lifecycle
1. Grants/batches seed capability.
2. Orchestration aligns subsystems.
3. Gatekeepers verify conditions and windows.
4. Watcher affirms or denies crest status.
5. Lineage docs record the crest tier and link to the event.

## Validation
- Ascension events must validate against Data/schemas/ascension-log.schema.json.
