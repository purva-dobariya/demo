#!/usr/bin/env node
/* Fills in brand logos that the data already has, just on a different row.
 *
 *   node scripts/fill-logo-gaps.js            # dry run, prints what it would do
 *   node scripts/fill-logo-gaps.js --apply    # write the changes
 *
 * Participants take more than one role, and the registry repeats the company
 * once per role. Protean eGov appears four times in ecosystem-tsp.json: two
 * rows carry proteantech.png, two are blank. The logo was never missing — it is
 * just absent on that row. Same story for logos filed under a slightly
 * different filename (aarambh-logo.png vs aarambh_logo.png).
 *
 * Matching strips LEGAL SUFFIXES ONLY. An earlier version also stripped words
 * like "Technologies" and "Solutions" and merged genuinely different companies,
 * so that is deliberately not done. Where a website is present it is used to
 * corroborate. A group offering more than one candidate logo is skipped rather
 * than guessed at. */
'use strict';

const fs = require('fs');
const path = require('path');
const { nameKey, domainOf, PLACEHOLDER_DONORS } = require('./lib/brand-match');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public', 'assets', 'data');
const LEGACY_DIR = path.join(ROOT, 'public', 'assets', 'legacy');
const apply = process.argv.includes('--apply');

/* Corroborated by a shared website domain on both rows — see docs/legacy-ondc-assets.md. */
const REPOINTS = {
  'dittomart-logo.png': 'ditto-mart-logo.png',        // dittomart.in
  'mysellercentral-logo.png': 'mysellercentral.png',  // mysellercentral.com
  'aarambh-logo.png': 'aarambh_logo.png',             // scaleknot.com
};

/* ---------- helpers ---------- */

const disk = {};
for (const entry of fs.readdirSync(LEGACY_DIR)) {
  const p = path.join(LEGACY_DIR, entry);
  if (fs.statSync(p).isDirectory()) {
    disk[entry] = new Set(fs.readdirSync(p).map((f) => f.toLowerCase()));
  }
}

/* A bare filename lives in np_logos; a rooted path names its own folder. */
function resolves(value) {
  const v = String(value || '').trim();
  if (!v) return false;
  const m = v.match(/^\/public\/assets\/legacy\/([^/]+)\/(.+)$/);
  const folder = m ? m[1] : 'np_logos';
  const name = decodeURIComponent(m ? m[2] : v);
  return Boolean(disk[folder] && disk[folder].has(name.toLowerCase()));
}

const nameOf = (row) => row.sellername || row.nametsp || row.tsp_name || row.name || '';
const logoField = (row) => ('brand_logo' in row ? 'brand_logo' : ('logo' in row ? 'logo' : null));

/* ---------- load ---------- */

const files = {};   // filename -> parsed rows
const rows = [];    // flat index over every row that could carry a logo

for (const file of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'))) {
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch (err) {
    console.warn(`  ! skipping unparseable ${file}: ${err.message}`);
    continue;
  }
  if (!Array.isArray(parsed)) continue;
  files[file] = parsed;
  for (const row of parsed) {
    if (!row || typeof row !== 'object') continue;
    const field = logoField(row);
    if (!field) continue;   // this table has no logo column at all
    const value = String(row[field] || '').trim();
    rows.push({ file, row, field, name: nameOf(row), domain: domainOf(row.website), value, ok: resolves(value) });
  }
}

/* ---------- group and decide ---------- */

const byName = new Map();
for (const r of rows) {
  const k = nameKey(r.name);
  if (!k) continue;
  if (!byName.has(k)) byName.set(k, []);
  byName.get(k).push(r);
}

/* Two rows can name the same file in different notations — a bare
 * `bizom.png` and a rooted `/public/assets/legacy/np_logos/bizom.png` are one
 * image, not a conflict. Compare resolved targets, not raw strings. */
function targetOf(value) {
  const m = String(value).match(/^\/public\/assets\/legacy\/([^/]+)\/(.+)$/);
  const folder = m ? m[1] : 'np_logos';
  const name = decodeURIComponent(m ? m[2] : value);
  return folder + '/' + name.toLowerCase();
}

function donorFor(r) {
  const group = (byName.get(nameKey(r.name)) || []).filter((o) => o.ok);
  if (!group.length) return { logo: null };
  // Prefer a row confirmed by the same website domain.
  const sameDomain = r.domain ? group.filter((o) => o.domain === r.domain) : [];
  const pool = sameDomain.length ? sameDomain : group;
  const targets = [...new Set(pool.map((o) => targetOf(o.value)))];
  if (targets.length > 1) {
    return { logo: null, ambiguous: [...new Set(pool.map((o) => o.value))], via: pool[0].name };
  }
  // One image; write it in the notation this row's own file uses.
  const candidates = pool.filter((o) => targetOf(o.value) === targets[0]);
  const sameShape = candidates.find((o) => o.file === r.file)
    || candidates.find((o) => (o.value.charAt(0) === '/') === (r.field === 'logo'))
    || candidates[0];
  const logo = sameShape.value;
  if (PLACEHOLDER_DONORS.has(logo.split('/').pop().toLowerCase())) {
    return { logo: null, placeholder: logo };
  }
  return { logo, via: sameShape.name, confirmed: Boolean(sameDomain.length) };
}

const fills = [], skippedPlaceholder = [], ambiguous = [];

for (const r of rows) {
  if (r.ok || r.value) continue;          // already fine, or points at a named file
  const d = donorFor(r);
  if (d.placeholder) { skippedPlaceholder.push([r, d.placeholder]); continue; }
  if (d.ambiguous) { ambiguous.push([r, d.ambiguous]); continue; }
  if (!d.logo) continue;
  fills.push([r, d]);
}

const repoints = rows.filter((r) => r.value && !r.ok && REPOINTS[r.value]);

/* ---------- report / write ---------- */

const short = (s, n) => String(s).slice(0, n).padEnd(n);

console.log(`${apply ? 'APPLYING' : 'DRY RUN — pass --apply to write'}\n`);
console.log(`blank logos filled from another role: ${fills.length}`);
for (const [r, d] of fills) {
  console.log(`   ${short(r.file.replace('.json', ''), 26)} ${short(r.name, 42)} <- ${short(d.logo.split('/').pop(), 26)}${d.confirmed ? ' [domain-confirmed]' : ''}`);
}

console.log(`\nmissing files repointed to a duplicate: ${repoints.length}`);
for (const r of repoints) {
  console.log(`   ${short(r.file.replace('.json', ''), 26)} ${short(r.name, 42)} ${r.value} -> ${REPOINTS[r.value]}`);
}

if (skippedPlaceholder.length) {
  console.log(`\nskipped — only donor is a placeholder: ${skippedPlaceholder.length}`);
  for (const [r, logo] of skippedPlaceholder) console.log(`   ${short(r.name, 42)} (would have used ${logo})`);
}
if (ambiguous.length) {
  console.log(`\nskipped — more than one candidate logo: ${ambiguous.length}`);
  for (const [r, cands] of ambiguous) console.log(`   ${short(r.name, 42)} ${cands.join(' | ')}`);
}

if (!apply) {
  console.log('\nNothing written.');
  process.exit(0);
}

for (const [r, d] of fills) r.row[r.field] = d.logo;
for (const r of repoints) r.row[r.field] = REPOINTS[r.value];

const touched = new Set([...fills.map(([r]) => r.file), ...repoints.map((r) => r.file)]);
for (const file of touched) {
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(files[file]));
  console.log(`  wrote ${file}`);
}
console.log(`\n${fills.length + repoints.length} rows updated across ${touched.size} files.`);
