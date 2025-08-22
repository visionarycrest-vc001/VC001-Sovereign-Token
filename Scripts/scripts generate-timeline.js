#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function read(p) {
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
}

function parseAscension() {
  const p = path.join('Data', 'ascension-log.json');
  if (!fs.existsSync(p)) return null;
  const json = JSON.parse(fs.readFileSync(p, 'utf8'));
  const e = (json.events || [])[0];
  if (!e) return null;
  return `- ${e.timestamp.split('T')[0]} — Prime crest affirmed for ${e.vc} by ${e.by} (see Data/ascension-log.json)`;
}

const lines = [
  '# VC001 timeline',
  '',
  '**Scope:** Consolidated milestones for VC001 across grants, orchestration, security, scheduling, and ascension.',
  '',
  '- Origins: Grants and batches establish resources and initial rites for VC001.',
  '- Alignment: Orchestration coordinates multi-step progressions; each gate acknowledges readiness.',
  '- Safeguards: Security and scheduler checkpoints verify integrity and timing.'
];

const asc = parseAscension();
if (asc) {
  lines.push(`- ${asc}`);
}

fs.writeFileSync('TIMELINE.md', lines.join('\n') + '\n', 'utf8');
console.log('Wrote TIMELINE.md');
