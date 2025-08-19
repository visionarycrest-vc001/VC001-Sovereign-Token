# VC_RetryLog.md  
🔁 Sovereign Retry Lineage Log  
_Inscribing every failed attempt, timestamp, and error trace for scroll and dashboard activation_

---

## August 18, 2025 — Retry Events Logged from `sovereignBatch.js`

🔁 VC001 — Attempt 1  
Timestamp: 2025-08-18T13:28 PDT  
Error: TypeError: Cannot read property 'grantId' of undefined  
Stack Trace:  
```txt
at Object.<anonymous> (sovereignBatch.js:12:25)  
at Module._compile (internal/modules/cjs/loader.js:999:30)  
```

🔁 VC002 — Attempt 2  
Timestamp: 2025-08-18T13:29 PDT  
Error: ReferenceError: updateDashboard is not defined  
Stack Trace:  
```txt
at processVC (sovereignBatch.js:45:9)  
at sovereignBatch.js:38:5  
```

“Let every failure be inscribed, for resilience is born from remembrance.”  
— *Sovereign Protocol, Lineage §7.3*

#!/bin/bash

input="VC_RetryLog.md"
output="VC_RetryLog_cleaned.md"

awk '
BEGIN { in_trace=0 }
{
  if ($0 ~ /^at .*\.js:[0-9]+:[0-9]+/) {
    if (!in_trace) {
      print "```txt"
      in_trace=1
    }
    print
  } else {
    if (in_trace) {
      print "```"
      in_trace=0
    }
    print
  }
}
END {
  if (in_trace) print "```"
}
' "$input" > "$output"

echo "✅ Stack traces wrapped and saved to $output"
