#!/bin/bash

# Path to your registry file
REGISTRY="VC_ViewerRegistry.md"

# Extract header and separator lines
HEADER=$(grep '^|' "$REGISTRY" | head -n 2)
# Extract everything before the table
PRE_TABLE=$(awk '!/^|/' "$REGISTRY")

# Extract and sort the table body (skip header/separator)
TABLE_BODY=$(grep '^|' "$REGISTRY" | tail -n +3 | sort -t'|' -k3,3)

# Overwrite the file: pre-table, header, sorted table, blank line
{
  echo "$PRE_TABLE"
  echo "$HEADER"
  echo "$TABLE_BODY"
  echo
} > "$REGISTRY"

echo "✅ Sorted $REGISTRY by name (second column)."
