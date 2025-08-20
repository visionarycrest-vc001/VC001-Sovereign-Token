#!/bin/bash

input="VC_RetryLog.md"
output="VC_RetryLog_cleaned.md"

awk '
BEGIN { in_trace=0 }
/^Error:/ {
  print ""; print $0
  next
}
/^[ \t]*at .*\.js:[0-9]+:[0-9]+/ {
  if (!in_trace) {
    print "```txt"
    in_trace=1
  }
  print
  next
}
{
  if (in_trace && $0 !~ /^[ \t]*at .*\.js:[0-9]+:[0-9]+/) {
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

Error: ReferenceError: updateDashboard is not defined  
    at processVC (sovereignBatch.js:45:9)  
        at sovereignBatch.js:38:5  
        at internal/modules/run_main.js:12:3

