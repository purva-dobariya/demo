#!/usr/bin/env node
/* Lists every participant row that renders a monogram instead of a real logo.
 *
 *   node scripts/audit-missing-logos.js            # markdown report to stdout
 *
 * A row shows a monogram when np-logo-map.json has no entry for its exact
 * `Brand Name` (build-np-logo-map.js only emits entries whose file resolves on
 * disk, so "absent from the map" and "no logo on the page" are the same thing).
 *
 * Second pass answers the follow-up question: for each gap, is there an image
 * ANYWHERE under public/assets whose filename plausibly belongs to that brand?
 * Matching is name-key or domain based, same keying as build-np-logo-map.js, and
 * is a suggestion for a human to confirm -- not something to auto-apply. */
'use strict';

const fs = require('fs');
const path = require('path');
const { nameKey, domainOf } = require('./lib/brand-match');
const npCsv = require('../src/scripts/participant-csv.js');

const ROOT = path.resolve(__dirname, '..');
const CSV_DIR = path.join(ROOT, 'public', 'assets', 'ondc-participants');
const MAP = path.join(ROOT, 'public', 'assets', 'data', 'np-logo-map.json');

/* Only trees that actually hold brand marks. Scanning all of public/assets
 * turns up editorial photography (library/rider.jpg) and matches it to a
 * company called "Shiv Shakti Enterprise". The last entry is the drop folder on
 * the grievance-count-json worktree, where logos were collected off-branch. */
const LOGO_ROOTS = [
  'public/assets/legacy/np_logos',
  'public/assets/legacy/buyer-apps',
  'public/assets/buyer-apps',
  'public/assets/logos',
  'public/assets/logos_d2c',
  'public/assets/logos_investments',
  'public/assets/logos_mobility',
  'public/assets/logos_tourism',
  'assets/logos-20260819T113424Z-1-001',
  '.claude/worktrees/grievance-count-json/public/assets/logos/logos_ondc-participants',
];

const SOURCES = [
  ['Network Participants — Key', 'Key_network_participants.csv'],
  ['Network Participants — Integrated', 'integrated_network_particpants.csv'],
  ['Ecosystem Participants', 'ecosystem_participants.csv'],
];

const IMG = /\.(png|jpe?g|svg|webp|gif|avif)$/i;

/* Every image under public/assets, keyed by a normalised stem so a brand name
 * can be looked up without walking the tree per brand. */
const byStem = new Map();
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) { walk(p); continue; }
    if (!IMG.test(entry.name)) continue;
    const stem = entry.name.replace(IMG, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '');
    if (!stem) continue;
    const rel = '/' + path.relative(ROOT, p).split(path.sep).join('/');
    if (!byStem.has(stem)) byStem.set(stem, []);
    byStem.get(stem).push(rel);
  }
}(ASSETS));

const stems = [...byStem.keys()];

/* Candidate files for a brand: exact stem hit first, then a contains-match in
 * either direction, guarded by length so "es" does not match everything. */
function candidates(brand, link) {
  const key = nameKey(brand).replace(/ /g, '');
  const dom = domainOf(link).split('.')[0].replace(/[^a-z0-9]/g, '');
  const out = new Set();
  for (const probe of [key, dom]) {
    if (probe.length < 4) continue;
    if (byStem.has(probe)) byStem.get(probe).forEach((f) => out.add(f));
    for (const s of stems) {
      if (s.length < 4) continue;
      if (s.startsWith(probe) || probe.startsWith(s)) byStem.get(s).forEach((f) => out.add(f));
    }
  }
  return [...out];
}

const logoMap = JSON.parse(fs.readFileSync(MAP, 'utf8'));
const mapped = new Set(logoMap.map((e) => e.brand));

const lines = [];
let grandTotal = 0;
let grandMissing = 0;

for (const [label, file] of SOURCES) {
  const { rows } = npCsv.toObjects(npCsv.parse(fs.readFileSync(path.join(CSV_DIR, file), 'utf8')));
  const missing = rows
    .map((r) => ({ brand: r['Brand Name'], link: r.Link || r['Link'] || '' }))
    .filter((r) => r.brand && !mapped.has(r.brand))
    .sort((a, b) => a.brand.localeCompare(b.brand, 'en', { sensitivity: 'base' }));

  grandTotal += rows.length;
  grandMissing += missing.length;

  lines.push(`\n## ${label} — ${missing.length} of ${rows.length} rows have no logo\n`);
  lines.push('| # | Brand Name | Candidate file already in repo |');
  lines.push('|---|---|---|');
  missing.forEach((r, i) => {
    const hits = candidates(r.brand, r.link);
    lines.push(`| ${i + 1} | ${r.brand} | ${hits.length ? hits.join('<br>') : '—'} |`);
  });
}

lines.unshift(`# Participant rows rendering a monogram\n\n${grandMissing} of ${grandTotal} rows across the three directories.`);
process.stdout.write(lines.join('\n') + '\n');
