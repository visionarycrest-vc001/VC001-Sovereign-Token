Action: Poll metrics and queue for internal visibility.

  cat > apps/watcher/watcher.js << 'EOF'
async function getJSON(path) {
  const res = await fetch(`../../data/${path}?ts=${Date.now()}`);
  if (!res.ok) throw new Error(`Fetch failed: ${path}`);
  return res.json();
}

async function paintMetrics() {
  const data = await getJSON('watcher-metrics.json');
  document.getElementById('metrics').textContent = JSON.stringify(data, null, 2);
}

async function paintQueue() {
  const q = await getJSON('recalibration-queue.json');
  const ul = document.getElementById('queue');
  ul.innerHTML = '';
  q.items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.glyph} • reason=${item.reason} • priority=${item.priority}`;
    ul.appendChild(li);
  });
}

async function tick() {
  try {
    await Promise.all([paintMetrics(), paintQueue()]);
  } catch (e) {
    console.error('Watcher tick error', e);
  }
}

tick();
setInterval(tick, 5000);
EOF
