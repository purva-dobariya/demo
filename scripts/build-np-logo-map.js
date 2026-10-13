#!/usr/bin/env node
/* Joins brand logos onto the participant CSVs.
 *
 *   node scripts/build-np-logo-map.js            # dry run, prints what it would write
 *   node scripts/build-np-logo-map.js --apply    # write public/assets/data/np-logo-map.json
 *
 * The `Brand Logo` column in public/assets/ondc-participants/*.csv is empty in
 * every row -- the team maintains those sheets by hand and there is nowhere to
 * paste an image. The logos themselves already exist: 675 files under
 * public/assets/legacy/np_logos/, referenced by name from the legacy registry
 * snapshots in public/assets/data/. This script joins the two by brand name and
 * writes the result out so the browser does not have to load a 314 KB snapshot
 * just to find a filename.
 *
 * The map is keyed by the EXACT `Brand Name` string from the CSV, not by a
 * normalised key. All the fuzzy matching happens here, in Node, once; the page
 * does a plain object lookup. That is deliberate -- a normaliser implemented
 * twice is a normaliser that drifts, and the failure mode is showing one
 * company's logo next to another company's name.
 *
 * Only entries whose file actually resolves on disk are emitted. A brand with
 * no logo is simply absent from the map, and logo-fallback.js renders its
 * initials monogram with NO failed request -- which is the fix
 * tests/known-issues.json prescribes for the 404s the old JSON path produced.
 *
 * Re-run it whenever a CSV lands with brands that were not in the last one. */
'use strict';

const fs = require('fs');
const path = require('path');

const { nameKey, domainOf, PLACEHOLDER_DONORS } = require('./lib/brand-match');
const npCsv = require('../src/scripts/participant-csv.js');

const ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(ROOT, 'public', 'assets', 'data');
const CSV_DIR = path.join(ROOT, 'public', 'assets', 'ondc-participants');
const LEGACY_DIR = path.join(ROOT, 'public', 'assets', 'legacy');
const OUT = path.join(DATA_DIR, 'np-logo-map.json');

const apply = process.argv.includes('--apply');

/* ---------- what is actually on disk ---------- */

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

function targetOf(value) {
  const m = String(value).match(/^\/public\/assets\/legacy\/([^/]+)\/(.+)$/);
  const folder = m ? m[1] : 'np_logos';
  const name = decodeURIComponent(m ? m[2] : value);
  return folder + '/' + name.toLowerCase();
}

/* ---------- donors: every snapshot row that carries a usable logo ---------- */

const nameOf = (row) => row.sellername || row.nametsp || row.tsp_name || row.name || '';
const logoField = (row) => ('brand_logo' in row ? 'brand_logo' : ('logo' in row ? 'logo' : null));

const donors = new Map();   // nameKey -> [{ logo, domain, file }]

/* Preference when one brand has several logo files. The participant registry is
 * the population these CSVs describe, so its filename wins over a buyer-app or
 * complaints-page variant of the same mark. */
const FILE_RANK = { 'network-participants-live.json': 0, 'network-participants-advance.json': 1 };
const FOLDER_RANK = { np_logos: 0 };

function rank(d) {
  const folder = targetOf(d.logo).split('/')[0];
  return [
    FILE_RANK[d.file] === undefined ? 2 : FILE_RANK[d.file],
    FOLDER_RANK[folder] === undefined ? 1 : 0,
    d.logo.length,
    d.logo,
  ];
}

function better(a, b) {
  const ra = rank(a), rb = rank(b);
  for (let i = 0; i < ra.length; i++) {
    if (ra[i] < rb[i]) return true;
    if (ra[i] > rb[i]) return false;
  }
  return false;
}

for (const file of fs.readdirSync(DATA_DIR).filter((f) => f.endsWith('.json'))) {
  if (file === path.basename(OUT)) continue;                 // never feed on our own output
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'));
  } catch (err) {
    console.warn(`  ! skipping unparseable ${file}: ${err.message}`);
    continue;
  }
  if (!Array.isArray(parsed)) continue;
  for (const row of parsed) {
    if (!row || typeof row !== 'object') continue;
    const field = logoField(row);
    if (!field) continue;
    const logo = String(row[field] || '').trim();
    if (!logo || !resolves(logo)) continue;
    if (PLACEHOLDER_DONORS.has(logo.split('/').pop().toLowerCase())) continue;
    const key = nameKey(nameOf(row));
    if (!key) continue;
    if (!donors.has(key)) donors.set(key, []);
    donors.get(key).push({ logo, domain: domainOf(row.website), file });
  }
}

/* ---------- fallback indexes ----------
 *
 * Name matching misses two shapes that are still unambiguous:
 *
 *   1. The registry files a company under its legal name and the CSV under its
 *      product name -- "Ojay Tech Private Limited" against a row named Scooton
 *      -- but both give scooton.app as the website. An exact domain match is the
 *      same company by definition, so it is a stronger signal than the name.
 *   2. The image is on disk but no registry row references it at all (396 of the
 *      664 files are unreferenced), so there is no donor row to match against --
 *      only a filename that happens to be the brand or its domain, such as
 *      dtdc.png for DTDC Express Limited.
 *
 * Both demand an EXACT, unique match. Substring matching was tried and is not
 * safe: it maps every company with "Network" or "Works" in its name onto
 * work_logo.png. */

const byDomain = new Map();   // website domain -> Set<logo>
for (const list of donors.values()) {
  for (const d of list) {
    if (!d.domain) continue;
    if (!byDomain.has(d.domain)) byDomain.set(d.domain, new Set());
    byDomain.get(d.domain).add(d.logo);
  }
}

const norm = (v) => String(v || '').toLowerCase().replace(/[^a-z0-9]/g, '');

/* Drops the extension and a trailing "-logo"/"_logo", so dtdc.png and
 * caply-logo.png both reduce to the bare brand token. */
function stemOf(filename) {
  return norm(filename.replace(/\.[a-z0-9]+$/i, '').replace(/[-_]?logo$/i, ''));
}

const byStem = new Map();     // filename stem -> Set<logo reference>
/* Read the directory again rather than reusing `disk`: that index is lowercased
 * for case-insensitive existence checks, and writing a lowercased name into the
 * map would 404 on the Linux box this deploys to for any file with a capital in
 * it. The stem is lowercased; the filename it points at must not be. */
for (const folder of Object.keys(disk)) {
  for (const name of fs.readdirSync(path.join(LEGACY_DIR, folder))) {
    if (/\.zip$/i.test(name)) continue;
    const stem = stemOf(name);
    if (stem.length < 4) continue;                 // too short to be distinctive
    if (!byStem.has(stem)) byStem.set(stem, new Set());
    byStem.get(stem).add(folder === 'np_logos' ? name : '/public/assets/legacy/' + folder + '/' + name);
  }
}

/* The domain minus its public suffix: scooton.app -> scooton. */
function domainStem(domain) {
  return norm(String(domain || '').replace(/\.[a-z]{2,}(\.[a-z]{2})?$/i, ''));
}

/* Resolves to a single logo, or null. Never guesses between candidates.
 *
 * Candidates are compared by RESOLVED TARGET, not by raw string: buyer-apps.json
 * writes /public/assets/legacy/np_logos/nammayatri.png where the registry writes
 * a bare nammayatri.png, and those are one image, not a conflict. Comparing raw
 * strings made every such brand look ambiguous and dropped it. */
function onlyOne(set) {
  if (!set || !set.size) return null;
  const values = [...set];
  const targets = new Set(values.map(targetOf));
  return targets.size === 1 ? values[0] : null;
}

/* ---------- join the CSVs ---------- */

const CSV_FILES = [
  ['Key_network_participants.csv', 'Key'],
  ['integrated_network_particpants.csv', 'Integrated'],
  ['ecosystem_participants.csv', 'Ecosystem'],
];

const map = new Map();      // exact Brand Name -> logo
const stats = [];
const matched = { name: 0, domain: 0, stem: 0 };
const unmatched = [];       // brands with no logo anywhere -- these are the ask
let ambiguous = 0;

for (const [file, label] of CSV_FILES) {
  const abs = path.join(CSV_DIR, file);
  if (!fs.existsSync(abs)) {
    console.error(`  ! missing ${file} -- expected under public/assets/ondc-participants/`);
    process.exitCode = 1;
    continue;
  }
  const { rows } = npCsv.toObjects(npCsv.parse(fs.readFileSync(abs, 'utf8')));
  let hit = 0;
  let rank = 0;
  for (const row of rows) {
    const brand = row['Brand Name'];
    if (!brand) continue;
    rank++;                 // Key file order IS the order-volume ranking
    if (map.has(brand)) { hit++; continue; }               // same brand, second role row
    if (unmatched.some((u) => u.brand === brand)) continue;
    const domain = domainOf(row.Link);
    const group = donors.get(nameKey(brand)) || [];

    if (group.length) {
      /* Corroborate by website where both sides have one -- two companies can
       * share a normalised name, and their domains will not. */
      const sameDomain = domain ? group.filter((g) => g.domain === domain) : [];
      const pool = sameDomain.length ? sameDomain : group;

      /* Several files for one brand is normal -- scaleknot.png and
       * aarambh_logo.png are both Aarambh.tech. What is NOT safe is two donors
       * whose websites disagree: that is two companies colliding on a normalised
       * name, and picking either one puts the wrong mark against the wrong
       * brand. */
      const domains = [...new Set(pool.map((g) => g.domain).filter(Boolean))];
      if (domains.length > 1) { ambiguous++; continue; }

      map.set(brand, pool.reduce((best, g) => (better(g, best) ? g : best)).logo);
      matched.name++;
      hit++;
      continue;
    }

    /* No donor under this name -- fall back to the two exact-match indexes. */
    const viaDomain = domain ? onlyOne(byDomain.get(domain)) : null;
    if (viaDomain) {
      map.set(brand, viaDomain);
      matched.domain++;
      hit++;
      continue;
    }

    const dStem = domainStem(domain);
    const viaStem = onlyOne(byStem.get(norm(brand))) ||
      (dStem.length > 3 ? onlyOne(byStem.get(dStem)) : null);
    if (viaStem) {
      map.set(brand, viaStem);
      matched.stem++;
      hit++;
      continue;
    }

    unmatched.push({ brand, list: label, rank: label === 'Key' ? rank : null, link: row.Link });
  }
  stats.push({ file, rows: rows.length, hit });
}

/* ---------- report and write ---------- */

const out = [...map.entries()]
  .map(([brand, brand_logo]) => ({ brand, brand_logo }))
  .sort((a, b) => a.brand.localeCompare(b.brand));

for (const s of stats) {
  const pct = s.rows ? Math.round((s.hit / s.rows) * 100) : 0;
  console.log(`${s.file.padEnd(36)} ${String(s.hit).padStart(3)}/${String(s.rows).padEnd(3)} rows matched (${pct}%)`);
}
console.log(`\n${out.length} distinct brands mapped to a logo present on disk.`);
console.log(`  by registered name ${matched.name}, by website domain ${matched.domain}, by filename ${matched.stem}`);
console.log(`${unmatched.length} brands have no logo anywhere -- run with --missing to list them.`);

if (process.argv.includes('--missing')) {
  /* The list to send to whoever collects brand assets. Key NP order is the
   * order-volume ranking, so those are the ones worth chasing first. */
  const groups = [
    ['Key Network Participants -- highest order volume, chase these first', unmatched.filter((u) => u.list === 'Key')],
    ['Integrated Network Participants', unmatched.filter((u) => u.list === 'Integrated')],
    ['Ecosystem Participants', unmatched.filter((u) => u.list === 'Ecosystem')],
  ];
  for (const [heading, list] of groups) {
    if (!list.length) continue;
    console.log(`\n${heading} (${list.length})`);
    for (const u of list) {
      const rank = u.rank ? `#${String(u.rank).padStart(3)}  ` : '      ';
      console.log(`  ${rank}${u.brand.padEnd(52)}${u.link || '(no website on record)'}`);
    }
  }
}
if (ambiguous) console.log(`${ambiguous} skipped -- donors disagreed on website, not guessed.`);

if (!apply) {
  console.log(`\nDry run. Re-run with --apply to write ${path.relative(ROOT, OUT)}.`);
} else {
  fs.writeFileSync(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log(`\nWrote ${path.relative(ROOT, OUT)}.`);
}
