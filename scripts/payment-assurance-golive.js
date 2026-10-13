/* Publish the Payment Assurance Program page.
 *
 * The finished page is built, reviewed and committed, but not approved to
 * publish. Until it is, `pages/payment-assurance-program.html` holds the URL
 * with a Coming Soon page — the URL has to keep working, because 45 page
 * footers plus the React homepage footer link to it — and the real page waits
 * beside it as `-approved.html`.
 *
 * Both files live in `pages/`, so every `../src/styles/…` path in them is
 * already correct and nothing needs rewriting on the way in or out. Going live
 * is therefore a rename, and this script is that rename plus the assertions
 * that stop it happening to the wrong files.
 *
 * The holding page is parked rather than deleted, so the swap is reversible:
 * run this again to put it back.
 *
 *   node scripts/payment-assurance-golive.js --dry     see what would happen
 *   node scripts/payment-assurance-golive.js           do it
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');

const LIVE = 'pages/payment-assurance-program.html';
const APPROVED = 'pages/payment-assurance-program-approved.html';
const HOLDING = 'pages/payment-assurance-program-holding.html';

// Fingerprints, so a mis-set filename cannot quietly publish the wrong thing.
const IS_HOLDING = 'bk-soon-word';
const IS_PROGRAMME = 'BNPs holding the Badge';

const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

function fail(msg) {
  console.error('\nAborted: ' + msg);
  process.exit(1);
}

const liveIsHolding = exists(LIVE) && read(LIVE).includes(IS_HOLDING);
const liveIsProgramme = exists(LIVE) && read(LIVE).includes(IS_PROGRAMME);

if (liveIsProgramme) {
  console.log('The Programme page is already live at ' + LIVE + '. Nothing to do.');
  process.exit(0);
}

if (!liveIsHolding) fail(LIVE + ' is neither the holding page nor the Programme page.');
if (!exists(APPROVED)) fail(APPROVED + ' is missing — there is nothing to publish.');
if (!read(APPROVED).includes(IS_PROGRAMME)) {
  fail(APPROVED + ' does not contain the register markup; it is not the Programme page.');
}
if (exists(HOLDING)) fail(HOLDING + ' already exists — resolve that by hand first.');

console.log((DRY ? '[dry run] ' : '') + 'Publishing the Payment Assurance Program:');
console.log('  ' + LIVE + '  ->  ' + HOLDING + '   (holding page parked)');
console.log('  ' + APPROVED + '  ->  ' + LIVE + '   (Programme goes live)');

if (DRY) {
  console.log('\nNothing was changed. Re-run without --dry to publish.');
  process.exit(0);
}

fs.renameSync(path.join(ROOT, LIVE), path.join(ROOT, HOLDING));
fs.renameSync(path.join(ROOT, APPROVED), path.join(ROOT, LIVE));

// Assert the result rather than trusting the rename.
if (!read(LIVE).includes(IS_PROGRAMME)) fail('post-check: ' + LIVE + ' is not the Programme page.');
if (!read(HOLDING).includes(IS_HOLDING)) fail('post-check: ' + HOLDING + ' is not the holding page.');
if (exists(APPROVED)) fail('post-check: ' + APPROVED + ' still exists.');

console.log('\nDone. Remaining steps:');
console.log('  1. Drop the `noindex` meta and the STAGED comment from ' + LIVE + '.');
console.log('  2. Paste the live published export into the two register tbodys,');
console.log('     and set each register head\'s tally, label and date.');
console.log('  3. node tests/static.mjs && npx playwright test tests/e2e/');
