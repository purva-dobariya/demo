/* One-shot sweep: add the Payment Assurance Program link to the "Help &
 * Support" footer column, on every static page and on the React footer the
 * homepage renders.
 *
 * README.md:104-110 — 44 files carry the same footer block, so this is a
 * script rather than 44 hand-edits, and it asserts what it matched: a page
 * that does not contain the anchor line is reported, never silently skipped.
 * Idempotent — running it twice adds nothing the second time.
 *
 *   node scripts/add-payment-assurance-footer-link.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');

const NEW_LINK = 'payment-assurance-program.html';

// The link goes immediately after Complaint, matching the order the page's own
// footer already ships.
const HTML_ANCHOR = '<a class="footer-link" href="complaint.html">Complaint</a>';
const HTML_INSERT = '\n          <a class="footer-link" href="payment-assurance-program.html">Payment Assurance Program</a>';

const JSX_ANCHOR = '{ label: "Complaint", href: "pages/complaint.html" },';
const JSX_INSERT = '\n      { label: "Payment Assurance Program", href: "pages/payment-assurance-program.html" },';

// careers-test.html is the test harness's own page and ships a deliberately
// reduced footer (no Complaint, no RFP, no legal links). It is excluded rather
// than reported, so a real missing anchor elsewhere still fails loudly.
const SKIP = new Set(['pages/careers-test.html', 'pages/payment-assurance-program.html']);

const report = { changed: [], already: [], skipped: [], missing: [] };

function apply(rel, anchor, insert) {
  const file = path.join(ROOT, rel);
  const src = fs.readFileSync(file, 'utf8');

  if (SKIP.has(rel)) {
    report.skipped.push(rel);
    return;
  }
  if (src.includes(NEW_LINK)) {
    report.already.push(rel);
    return;
  }

  const hits = src.split(anchor).length - 1;
  if (hits !== 1) {
    report.missing.push(rel + ' (anchor found ' + hits + ' times, expected 1)');
    return;
  }

  if (!DRY) fs.writeFileSync(file, src.replace(anchor, anchor + insert));
  report.changed.push(rel);
}

for (const name of fs.readdirSync(path.join(ROOT, 'pages')).sort()) {
  if (name.endsWith('.html')) apply(path.posix.join('pages', name), HTML_ANCHOR, HTML_INSERT);
}
apply('src/components/SocialProof.jsx', JSX_ANCHOR, JSX_INSERT);

console.log((DRY ? '[dry run] ' : '') + 'changed  : ' + report.changed.length);
console.log('skipped  : ' + report.skipped.length + (report.skipped.length ? ' (' + report.skipped.join(', ') + ')' : ''));
console.log('unchanged: ' + report.already.length + (report.already.length ? ' (' + report.already.join(', ') + ')' : ''));
if (report.missing.length) {
  console.error('\nNO ANCHOR — these files were not swept:');
  report.missing.forEach((m) => console.error('  ' + m));
  process.exitCode = 1;
}
