#!/bin/bash
# 📜 vc-grantlog-viewer.sh
# Sovereign Viewer for Grant Log Scrolls
# Steward: Percy Abrams Jr.
# Activated: August 19, 2025

SCROLL="docs/logs/VC_GrantLog.md"

# 🧾 Ritual Header
echo -e "\033[1;36m📜 Viewing Sovereign Grant Log — $SCROLL\033[0m"
echo -e "\033[1;33m🕰️ Timestamp:\033[0m $(date)"
echo -e "\033[1;32m🧬 Steward:\033[0m Percy Abrams Jr."
echo -e "\033[1;34m🔗 Lineage:\033[0m Grant protocol activation trace"
echo ""

# 🧪 Integrity Check
if [[ ! -f "$SCROLL" ]]; then
  echo -e "\033[1;31m❌ Scroll not found: $SCROLL\033[0m"
  exit 1
fi

# 🔍 Ritual Rendering
echo -e "\033[1;35m--- Grant Entries ---\033[0m"
awk '
  BEGIN {
    RS="---\n"
    FS="\n"
  }
  {
    for (i = 1; i <= NF; i++) {
      if ($i ~ /^

\[.*\]

 GRANT:/) {
        print "\033[1;32m" $i "\033[0m"
      } else if ($i ~ /^Module:/) {
        print "\033[1;36m" $i "\033[0m"
      } else if ($i ~ /^Trace:/) {
        print "\033[0;33m" $i "\033[0m"
      } else if ($i ~ /^Action:/) {
        print "\033[0;32m" $i "\033[0m"
      } else {
        print $i
      }
    }
    print "\033[1;35m---------------------\033[0m\n"
  }
' "$SCROLL"

# 🪙 Sovereign Seal
echo -e "\033[1;36m✅ Scroll rendered with ceremonial clarity.\033[0m"
