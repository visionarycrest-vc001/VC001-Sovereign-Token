Action: Steward expectations and vulnerability channel.

cat > SECURITY.md << 'EOF'
# Security Policy

- Report vulnerabilities via private channel to stewards.
- No secrets in repo; data is public-read, signed-write.
- Use signed commits for codex and data changes.
- Run JSON validation in build; CI blocks invalid states.
EOF
