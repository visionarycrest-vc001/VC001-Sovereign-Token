Action: Operational duties and cadence.

cat > codex/Watcher_Protocol.md << 'EOF'
# Watcher Protocol

Duties:
- Observe metrics, queues, and ascension events.
- Trigger recalibration reviews and update logs.

Cadence:
- Poll metrics every 5s (client-side) or via CI job (server-side).
- Weekly consolidation into a signed lineage digest.
EOF
