#!/bin/bash
echo "🧙 Wrapping stack traces with ceremonial context..."

find . -type f -name "*.log" | while read -r file; do
  echo "📄 Processing $file..."
  sed -i '1s/^/🔮 Ceremonial Trace Start 🔮\n/' "$file"
  echo "🔚 Ceremonial Trace End 🔚" >> "$file"
done

echo "✅ All stack traces wrapped."
