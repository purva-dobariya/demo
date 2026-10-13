/* One-shot sweep: remove the redundant "Back to home" link from the navbar
 * on every static page while leaving each page's primary CTA intact.
 *
 * Idempotent, with a read-only dry-run mode:
 *
 *   node scripts/remove-back-to-home-navigation.js [--dry]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');
const report = { changed: [], already: [], missing: [] };

for (const name of fs.readdirSync(path.join(ROOT, 'pages')).sort()) {
  if (!name.endsWith('.html')) continue;

  const rel = path.posix.join('pages', name);
  const file = path.join(ROOT, 'pages', name);
  const source = fs.readFileSync(file, 'utf8');
  const links = source.match(/<a href="\.\.\/index\.html#site-top" class="nav-back">[\s\S]*?<\/a>/g) || [];

  if (links.length === 0 && !source.includes('class="nav-back"')) {
    report.already.push(rel);
    continue;
  }
  if (links.length !== 1) {
    report.missing.push(rel + ' (matching nav-back links found ' + links.length + ', expected 1)');
    continue;
  }

  const escaped = links[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const withIndentAndLine = new RegExp('[ \\t]*' + escaped + '\\r?\\n?');
  const updated = source.replace(withIndentAndLine, '');
  if (!DRY) fs.writeFileSync(file, updated);
  report.changed.push(rel);
}

console.log((DRY ? '[dry run] ' : '') + 'changed  : ' + report.changed.length);
console.log('unchanged: ' + report.already.length + (report.already.length ? ' (' + report.already.join(', ') + ')' : ''));
if (report.missing.length) {
  console.error('\nNO MATCH — these files were not swept:');
  report.missing.forEach((message) => console.error('  ' + message));
  process.exitCode = 1;
}
