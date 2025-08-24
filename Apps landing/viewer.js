Read-only fetch from data/*.json and render lists.

  cat > apps/landing/viewer.js << 'EOF'
async function loadJSON(path) {
  const res = await fetch(`../../data/${path}`);
  if (!res.ok) throw new Error(`Failed to load ${path}`);
  return res.json();
}

function el(tag, attrs={}, ...children) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k,v]) => node.setAttribute(k, v));
  for (const child of children) node.append(child);
  return node;
}

async function renderVCLedger() {
  const ledger = await loadJSON('vc_ledger.json');
  const ul = document.getElementById('vc-list');
  ledger.tokens.forEach(t => {
    const li = el('li', {}, `${t.id} — ${t.title} (${t.status})`);
    ul.appendChild(li);
  });
}

async function renderAscensions() {
  const log = await loadJSON('ascension-log.json');
  const ul = document.getElementById('ascension-events');
  log.events.slice(0, 10).forEach(e => {
    const li = el('li', {}, `${e.timestamp} • ${e.vc} • ${e.action} • ${e.note || ''}`);
    ul.appendChild(li);
  });
}

(async () => {
  try {
    await renderVCLedger();
    await renderAscensions();
  } catch (err) {
    console.error('Viewer failure:', err);
  }
})();
EOF
