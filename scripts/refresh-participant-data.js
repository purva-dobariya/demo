#!/usr/bin/env node
/* Regenerates the bundled participant snapshots in public/assets/data/ from the
 * upstream ONDC registry feeds.
 *
 *   node scripts/refresh-participant-data.js            # use the configured feeds
 *   node scripts/refresh-participant-data.js --check    # report reachability only
 *   node scripts/refresh-participant-data.js --base https://new-host/path/
 *
 * Every feed below currently answers 200 with this site's own index.html,
 * because the legacy CMS that published them was replaced at that domain. Until
 * the platform team supplies the new location, --check is the useful mode: it
 * proves which feeds are alive. Pass --base to point every feed at a new host
 * without editing this file. */
'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_BASE = 'https://www.ondc.org/content/files/theme/json/';

/* upstream filename -> snapshot under public/assets/data/ */
const FEEDS = {
  'livenetwork_v91.json': 'network-participants-live.json',
  'advancestage_v90.json': 'network-participants-advance.json',
  'initiatedintegration_v90.json': 'network-participants-initiated.json',
  'tsp_v90.json': 'ecosystem-tsp.json',
  'rsp_v90.json': 'ecosystem-rsf.json',
  'osp_v90.json': 'ecosystem-odr.json',
  'ase.json': 'ecosystem-enablers.json',
  'ssp.json': 'ecosystem-settlement.json',
  'nap_v2.json': 'ecosystem-npaccount.json',
  'e_gift_v16.json': 'ecosystem-egift.json',
  'empanelled_certification_agencies.json': 'ecosystem-certagencies.json',
  'empanelled_credentials_service_providers.json': 'ecosystem-credservice.json',
};

const DATA_DIR = path.resolve(__dirname, '..', 'public', 'assets', 'data');

const args = process.argv.slice(2);
const checkOnly = args.includes('--check');
const baseIndex = args.indexOf('--base');
const base = baseIndex === -1 ? DEFAULT_BASE : args[baseIndex + 1];

if (baseIndex !== -1 && !base) {
  console.error('--base needs a URL');
  process.exit(2);
}

async function fetchFeed(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get('content-type') || '';
  // A 200 carrying HTML means the path is now served by the static site itself.
  if (!/json/i.test(type)) throw new Error(`served ${type || 'no content-type'}, not JSON`);
  const rows = await res.json();
  if (!Array.isArray(rows)) throw new Error('payload is not an array');
  return rows;
}

(async () => {
  let alive = 0;
  const dead = [];
  for (const [remote, snapshot] of Object.entries(FEEDS)) {
    const url = base + remote;
    try {
      const rows = await fetchFeed(url);
      alive += 1;
      if (checkOnly) {
        console.log(`  ok    ${remote}  (${rows.length} rows)`);
      } else {
        fs.writeFileSync(path.join(DATA_DIR, snapshot), JSON.stringify(rows));
        console.log(`  wrote ${snapshot}  (${rows.length} rows)`);
      }
    } catch (err) {
      dead.push([remote, err.message]);
      console.log(`  DEAD  ${remote}  — ${err.message}`);
    }
  }
  console.log(`\nbase: ${base}\nalive: ${alive}   dead: ${dead.length}`);
  if (dead.length) {
    console.log('\nDead feeds need a replacement URL from the ONDC platform team;');
    console.log('re-run with --base <new-url> once it is known.');
  }
  process.exit(dead.length ? 1 : 0);
})();
