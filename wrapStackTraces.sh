#!/bin/bash

input="VC_RetryLog.md"
output="VC_RetryLog_cleaned.md"

awk '
BEGIN { in_trace=0; in_error=0 }
/^Error:/ {
  print ""; print $0
  in_error=1
  next
}
/^at[ \t]+.*\.js:[0-9]+:[0-9]+/ {
  if (!in_trace) {
    print "```txt"
    in_trace=1
  }
  print
  next
}
/^[ \t]+at .*\.js:[0-9]+:[0-9]+/ {
  if (!in_trace) {
    print "```txt"
    in_trace=1
  }
  print
  next
}
{
  if (in_trace && $0 !~ /^at[ \t]+.*\.js:[0-9]+:[0-9]+/ && $0 !~ /^[ \t]+at .*\.js:[0-9]+:[0-9]+/) {
    print "```"
    in_trace=0
  }
  print
}
END {
  if (in_trace) print "```"
}
' "$input" > "$output"

echo "✅ Nested traces and multi-line errors wrapped in $output"
