#!/usr/bin/env node
/* Self-check for the browser-side logo helper. Runs the real file against a
 * stub `document`/`window`, so the escaping and monogram rules are exercised
 * without a browser.  node scripts/test-logo-fallback.js  */
'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const src = fs.readFileSync(path.resolve(__dirname, '..', 'src', 'scripts', 'logo-fallback.js'), 'utf8');
const sandbox = { document: { addEventListener() {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(src, sandbox);
const { src: logoSrc, img, initials, monogram, base } = sandbox.window.npLogo;

// Bare filenames resolve against the local directory, not the dead legacy host.
assert.strictEqual(logoSrc('dspfin-logo.png'), base + 'dspfin-logo.png');
assert.ok(!logoSrc('dspfin-logo.png').includes('ondc.org'));
// Names with spaces or & must survive as a usable URL.
assert.strictEqual(logoSrc('A B&C.png'), base + 'A%20B%26C.png');
// An absolute URL in the data is passed through untouched.
assert.strictEqual(logoSrc('https://example.com/x.png'), 'https://example.com/x.png');
// A root-relative path names its own legacy folder and must pass through
// untouched — the same filename is a different image in a different folder.
assert.strictEqual(logoSrc('/public/assets/legacy/buyer-apps/tan.png'), '/public/assets/legacy/buyer-apps/tan.png');
assert.strictEqual(logoSrc(''), '');
assert.strictEqual(logoSrc(null), '');

assert.strictEqual(initials('Volt Money'), 'VM');
assert.strictEqual(initials('MySellerCentral'), 'MY');
// Legal suffixes are dropped so the mark reflects the trading name.
assert.strictEqual(initials('Ecosyz core solutions pvt ltd'), 'ES');
assert.strictEqual(initials('EHTICLY SUSTAINABLE FINNOVATORS MFD PRIVATE LIMITED'), 'EM');
assert.strictEqual(initials('Pvt Ltd'), 'PV');
assert.strictEqual(initials(''), 'NP');

// No logo at all still produces a mark rather than nothing.
assert.ok(monogram('Volt Money').includes('>VM<'));
assert.ok(img('', 'Volt Money').includes('bk-np-monogram'));

// The rendered tag carries what the error handler needs to build the monogram.
const tag = img('x.png', 'Volt Money', { alt: '' });
assert.ok(tag.includes('data-np-logo'));
assert.ok(tag.includes('data-np-name="Volt Money"'));
assert.ok(tag.includes('alt=""'));

// Hostile data must not break out of the attribute.
const nasty = img('x.png', '"><script>alert(1)</script>');
assert.ok(!nasty.includes('<script>'));
assert.ok(nasty.includes('&quot;&gt;&lt;script&gt;'));

console.log('logo-fallback: all checks passed');
