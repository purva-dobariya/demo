/* One-shot sweep: expose the existing ONDC Participants dropdown immediately
 * after Complaints and move the two participant links into Help & Support on
 * every production static page.
 *
 * The static pages carry repeated navbar and footer markup. This script makes
 * the bulk change with explicit match-count checks so a variant cannot be
 * silently skipped. It is idempotent and supports a read-only dry run:
 *
 *   node scripts/add-ondc-participants-navigation.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');
const SKIP = new Set(['careers-test.html']);

const report = { changed: [], already: [], skipped: [], missing: [] };

function count(source, value) {
  return source.split(value).length - 1;
}

function applyPage(name) {
  const rel = path.posix.join('pages', name);
  const file = path.join(ROOT, 'pages', name);
  let source = fs.readFileSync(file, 'utf8');
  const newline = source.includes('\r\n') ? '\r\n' : '\n';

  if (SKIP.has(name)) {
    report.skipped.push(rel);
    return;
  }

  const navIsPlaced = /<a href="complaint\.html" class="nav-link(?: active)?">Complaints<\/a>\s*<details class="nav-drop">/.test(source);
  const footerIsPlaced = /<a class="footer-link" href="complaint\.html">Complaint<\/a>\s*<a class="footer-link" href="network-participants\.html">Network Participants<\/a>\s*<a class="footer-link" href="ecosystem-participants\.html">Ecosystem Participants<\/a>/.test(source);
  const alreadyDone =
    !source.includes('<!-- hidden: ONDC Participants') &&
    navIsPlaced &&
    footerIsPlaced &&
    count(source, 'href="network-participants.html">Network Participants</a>') === 2 &&
    count(source, 'href="ecosystem-participants.html">Ecosystem Participants</a>') === 2;
  if (alreadyDone) {
    report.already.push(rel);
    return;
  }

  const hiddenBlocks = source.match(/<!-- hidden: ONDC Participants\r?\n([\s\S]*?)\r?\n\s*-->/g) || [];
  if (hiddenBlocks.length !== 2) {
    report.missing.push(rel + ' (hidden blocks found ' + hiddenBlocks.length + ', expected 2)');
    return;
  }

  const navBlock = hiddenBlocks.find((block) => block.includes('<details class="nav-drop">'));
  const footerBlock = hiddenBlocks.find((block) => block.includes('<div class="footer-col-head">ONDC Participants</div>'));
  if (!navBlock || !footerBlock) {
    report.missing.push(rel + ' (could not identify navbar and footer blocks)');
    return;
  }

  const complaintNavMatches = source.match(/<a href="complaint\.html" class="nav-link(?: active)?">Complaints<\/a>/g) || [];
  const complaintFooter = '<a class="footer-link" href="complaint.html">Complaint</a>';
  if (complaintNavMatches.length !== 1 || count(source, complaintFooter) !== 1) {
    report.missing.push(
      rel + ' (navbar complaint anchors ' + complaintNavMatches.length +
      ', footer complaint anchors ' + count(source, complaintFooter) + '; expected 1 each)'
    );
    return;
  }
  const complaintNav = complaintNavMatches[0];

  const navMarkup = navBlock
    .replace(/^<!-- hidden: ONDC Participants\r?\n/, '')
    .replace(/\r?\n\s*-->$/, '');

  source = source.replace(navBlock, '');
  source = source.replace(complaintNav, complaintNav + newline + navMarkup);
  source = source.replace(footerBlock, '');
  source = source.replace(
    complaintFooter,
    complaintFooter +
      newline + '          <a class="footer-link" href="network-participants.html">Network Participants</a>' +
      newline + '          <a class="footer-link" href="ecosystem-participants.html">Ecosystem Participants</a>'
  );

  if (!DRY) fs.writeFileSync(file, source);
  report.changed.push(rel);
}

for (const name of fs.readdirSync(path.join(ROOT, 'pages')).sort()) {
  if (name.endsWith('.html')) applyPage(name);
}

console.log((DRY ? '[dry run] ' : '') + 'changed  : ' + report.changed.length);
console.log('skipped  : ' + report.skipped.length + (report.skipped.length ? ' (' + report.skipped.join(', ') + ')' : ''));
console.log('unchanged: ' + report.already.length + (report.already.length ? ' (' + report.already.join(', ') + ')' : ''));
if (report.missing.length) {
  console.error('\nNO MATCH — these files were not swept:');
  report.missing.forEach((message) => console.error('  ' + message));
  process.exitCode = 1;
}
