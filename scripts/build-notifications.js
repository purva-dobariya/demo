/* Regenerates the "notifications" category in public/data/resources.json from the
   S3 link sheet exported to public/assets/S3-bucket-file-links(Sheet1).csv.

     node scripts/build-notifications.js [--dry]

   Column A of the sheet is NOT a usable filename — on five rows it holds spaces
   where the real S3 key holds '+'. The href always comes from column B verbatim.  */

const fs = require('path') && require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const CSV = path.join(ROOT, 'public/assets/S3-bucket-file-links(Sheet1).csv');
const JSON_PATH = path.join(ROOT, 'public/data/resources.json');
const DRY = process.argv.includes('--dry');

const ACRONYMS = {
  ondc: 'ONDC', rsf: 'RSF', np: 'NP', nps: 'NPs', fs: 'FS', igm: 'IGM',
  api: 'API', kybc: 'KYBC', msn: 'MSN', bis: 'BIS', cug: 'CUG'
};
const MONTHS = {
  jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
  may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, sept: 9,
  september: 9, oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12
};

const TRAILING = new Set(['from', 'on', 'of', 'for', 'dated', 'till', 'the']);

const MONTH_RE = Object.keys(MONTHS).sort((a, b) => b.length - a.length).join('|');
const pad = n => String(n).padStart(2, '0');
const year = y => (String(y).length === 2 ? 2000 + Number(y) : Number(y));

/* Date formats actually present in the sheet, most specific first. */
const DATE_PATTERNS = [
  // 08July2023 / 06June23 / 23_Jan_2026 / 1_april_2025 / 01-may-2024
  [new RegExp('([0-9]{1,2})[_ -]?(' + MONTH_RE + ')[_ -]?([0-9]{2,4})', 'i'), (d, m, y) => [d, m, y]],
  // March_31_2026
  [new RegExp('(' + MONTH_RE + ')[_ -]([0-9]{1,2})[_ -]([0-9]{4})', 'i'), (m, d, y) => [d, m, y]],
  // April_2026 / july_25  -> first of the month
  [new RegExp('(' + MONTH_RE + ')[_ -]([0-9]{2,4})', 'i'), (m, y) => [1, m, y]]
];

function parseDate(name) {
  for (const [re, order] of DATE_PATTERNS) {
    const m = name.match(re);
    if (!m) continue;
    const [d, mon, y] = order(...m.slice(1));
    const mm = MONTHS[String(mon).toLowerCase()];
    const yyyy = year(y);
    if (!mm || yyyy < 2020 || yyyy > 2100) continue;
    return { updated: `${pad(d)}/${pad(mm)}/${yyyy}`, sort: yyyy * 10000 + mm * 100 + Number(d), match: m[0] };
  }
  return null;
}

function titleFor(name) {
  return name
    .replace(/\.pdf$/i, '')
    .replace(/\+/g, ' ')
    .replace(/%20/g, ' ')
    .split(/[_\-\s]+/)
    .filter(Boolean)
    .reduce((out, w) => {
      if (w.toLowerCase() === 's' && out.length) { out[out.length - 1] += "'s"; return out; }
      return out.concat(ACRONYMS[w.toLowerCase()] || w[0].toUpperCase() + w.slice(1));
    }, [])
    .filter((w, i, a) => !(i === a.length - 1 && TRAILING.has(w.toLowerCase())))
    .join(' ');
}

/* ---------- read the sheet ---------- */
const rows = fs.readFileSync(CSV, 'utf8').split(/\r?\n/).slice(1)
  .map(line => line.split(',').map(c => c.trim()))
  .filter(cells => cells[1] && /^https?:\/\//.test(cells[1]));

const items = rows.map(cells => {
  const href = cells[1];
  const base = decodeURIComponent(href.split('/').pop());
  const date = parseDate(base);
  const item = { title: titleFor(date ? base.replace(date.match, ' ') : base), type: 'pdf', href };
  if (date) item.updated = date.updated;
  return { item, sort: date ? date.sort : null };
});

/* dated newest-first, undated appended alphabetically */
items.sort((a, b) => {
  if (a.sort && b.sort) return b.sort - a.sort;
  if (a.sort) return -1;
  if (b.sort) return 1;
  return a.item.title.localeCompare(b.item.title);
});

const CATEGORY = {
  id: 'notifications',
  title: 'Notifications',
  page: 'resources-notifications.html',
  source: '/notifications',
  icon: 'bell',
  blurb: 'Notifications issued to ONDC network participants, newest first.',
  parent: 'governance',
  hub: false,
  sections: [{ title: 'Notifications', items: items.map(x => x.item) }]
};

/* ---------- report ---------- */
console.log(`${items.length} notifications from ${path.basename(CSV)}\n`);
items.forEach(({ item }) => console.log(`  ${item.updated || '    —     '}  ${item.title}`));
const undated = items.filter(x => !x.sort);
if (undated.length) {
  console.log(`\n${undated.length} without a date in the filename — add "updated" by hand if known:`);
  undated.forEach(({ item }) => console.log(`  ${item.href.split('/').pop()}`));
}

if (DRY) { console.log('\n--dry: resources.json not written'); process.exit(0); }

/* ---------- write ---------- */
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));
const at = data.categories.findIndex(c => c.id === 'notifications');
if (at !== -1) data.categories[at] = CATEGORY;
else {
  const after = data.categories.findIndex(c => c.id === 'advisories');
  data.categories.splice(after === -1 ? data.categories.length : after + 1, 0, CATEGORY);
}

/* retire the link to the old WordPress notifications page */
const gov = data.categories.find(c => c.id === 'governance');
(gov ? gov.sections : []).forEach(s => (s.items || []).forEach(it => {
  if (/ondc\.org\/notifications/.test(it.href || '')) {
    it.type = 'page';
    it.href = 'resources-notifications.html';
    console.log('\nRepointed governance "Notifications" link to the new page');
  }
}));

fs.writeFileSync(JSON_PATH, JSON.stringify(data, null, 2) + '\n');
console.log(`Wrote ${path.relative(ROOT, JSON_PATH)}`);
