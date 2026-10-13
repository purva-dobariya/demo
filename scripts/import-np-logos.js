#!/usr/bin/env node
/* Mirrors the brand-logo folders out of the legacy ONDC site repo
 * (ONDC-Organization/website-ondc.org) into public/assets/legacy/.
 *
 *   node scripts/import-np-logos.js <path-to-legacy-repo-clone> [--dry-run]
 *
 * The folder structure is preserved rather than flattened on purpose: 24
 * filenames exist in more than one legacy folder with GENUINELY DIFFERENT
 * contents (np_logos/tan.png is 1.6MB, ondc-buyer-apps/images/tan.png is 2.5KB).
 * Merging them would silently serve the wrong logo for those brands.
 *
 * After copying it reports which filenames the participant data references but
 * the legacy repo cannot supply — those are participants onboarded after that
 * repo's last commit, whose logos only ONDC can provide. */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public', 'assets', 'data');
const DEST_ROOT = path.join(ROOT, 'public', 'assets', 'legacy');
const LEGACY_PREFIX = 'content/themes/liebling/assets';

/* legacy folder -> local folder. The local names match the path segments used
 * in buyer-apps.json and in logo-fallback.js. */
const SOURCES = [
  { from: 'theme/images/np_logos', to: 'np_logos' },
  { from: 'ondc-buyer-apps/images', to: 'buyer-apps' },
  { from: 'theme/images/complaints', to: 'complaints' },
];

const SKIP_FILES = new Set(['.ds_store', 'thumbs.db']);

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const repo = args.find((a) => !a.startsWith('--'));

if (!repo) {
  console.error('usage: node scripts/import-np-logos.js <legacy-repo-clone> [--dry-run]');
  process.exit(2);
}

/* ---------- copy ---------- */

const copied = {};       // local folder -> Set of filenames now present
for (const { from, to } of SOURCES) {
  const srcDir = path.join(repo, LEGACY_PREFIX, from);
  const destDir = path.join(DEST_ROOT, to);
  copied[to] = new Set();
  if (!fs.existsSync(srcDir)) {
    console.log(`  MISSING SOURCE  ${from}  — did the sparse-checkout include it?`);
    continue;
  }
  if (!dryRun) fs.mkdirSync(destDir, { recursive: true });
  let n = 0;
  for (const name of fs.readdirSync(srcDir)) {
    if (SKIP_FILES.has(name.toLowerCase())) continue;
    const src = path.join(srcDir, name);
    if (!fs.statSync(src).isFile()) continue;
    if (!dryRun) fs.copyFileSync(src, path.join(destDir, name));
    copied[to].add(name);
    n += 1;
  }
  console.log(`  ${dryRun ? 'would copy' : 'copied'} ${String(n).padStart(4)}  ${from}  ->  public/assets/legacy/${to}/`);
}

/* ---------- coverage against what the data asks for ---------- */

/* Table pages resolve a bare `brand_logo` against np_logos only; buyer-apps.json
 * carries its own folder in the path, so it is checked against that folder. */
function referenced() {
  const want = new Map(); // "folder/name" -> Set of data files
  const add = (folder, name, file) => {
    const key = folder + '/' + name;
    if (!want.has(key)) want.set(key, new Set());
    want.get(key).add(file);
  };
  for (const file of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'))) {
    let rows;
    try {
      rows = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
    } catch { continue; }
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (!row || typeof row !== 'object') continue;
      for (const field of ['brand_logo', 'logo']) {
        const value = String(row[field] || '').trim();
        if (!value) continue;
        const local = value.match(/\/public\/assets\/legacy\/([^/]+)\/(.+)$/);
        if (local) add(local[1], decodeURIComponent(local[2]), file);
        else if (!value.includes('/') && !/^https?:/i.test(value)) add('np_logos', value, file);
      }
    }
  }
  return want;
}

const want = referenced();
const missing = [];
for (const [key, sources] of want) {
  const [folder, name] = [key.slice(0, key.indexOf('/')), key.slice(key.indexOf('/') + 1)];
  const have = copied[folder];
  // Case-insensitive: the legacy tree mixes `.PNG` with `.png`.
  const present = have && [...have].some((f) => f.toLowerCase() === name.toLowerCase());
  if (!present) missing.push([key, [...sources]]);
}

console.log(`\nreferenced by data: ${want.size}   available: ${want.size - missing.length}   missing: ${missing.length}`);
for (const [key, sources] of missing.sort()) {
  console.log(`  ${key}  <- ${sources.join(', ')}`);
}
if (missing.length) {
  console.log('\nThese are not in the legacy repo on any branch — participants onboarded');
  console.log('after its last commit. Only ONDC can supply them; until then they render');
  console.log('as an initials monogram (src/scripts/logo-fallback.js).');
}
