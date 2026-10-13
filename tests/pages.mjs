/* Shared page inventory.
 *
 * Every other test imports from here so the page list is discovered once, from
 * disk, rather than hardcoded in five places and drifting. `vercel.json` sets
 * `outputDirectory: "."`, so anything not excluded below genuinely ships.
 */

import fs from 'node:fs';
import path from 'node:path';

/* Resolved by walking up to the package.json rather than from import.meta.url.
 * Playwright transpiles spec files to CJS, where import.meta is a syntax error,
 * and adding "type": "module" to package.json would break the repo's four
 * CommonJS scripts/*.js. Walking up also means it does not matter which
 * directory the runner was invoked from. */
function findRoot(start) {
  let dir = start;
  for (;;) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    const parent = path.dirname(dir);
    if (parent === dir) throw new Error('repo root (package.json) not found');
    dir = parent;
  }
}

export const ROOT = findRoot(process.cwd());

/* Agent scratch trees and design dumps. These are checked in (154 files under
 * .github/skills alone) but are not the site. */
const SKIP_ANYWHERE = new Set([
  'node_modules', '.git', '.claude', '.agent', '.agents', '.codex', '.cursor',
  '.gemini', '.github', '.impeccable',
  /* Playwright's own output. Traces contain copies of the site's CSS, so without
   * this the breakpoint matrix was derived partly from trace artifacts -- which
   * are then deleted mid-run, so a test failed with ENOENT reading its own
   * scaffolding. The suite must not observe itself. */
  'test-results', 'playwright-report', 'blob-report',
]);

/* Root-relative, NOT by basename: `scripts` here means the repo's Node tooling at
 * ./scripts, and matching on the name alone silently swallowed src/scripts too --
 * twelve of the site's own browser scripts vanished from the inventory. */
const SKIP_AT_ROOT = new Set(['docs', 'tests', 'scripts']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_ANYWHERE.has(entry.name)) continue;
      if (dir === ROOT && SKIP_AT_ROOT.has(entry.name)) continue;
      walk(full, out);
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

export const allFiles = walk(ROOT);

const rel = (p) => path.relative(ROOT, p).split(path.sep).join('/');

/* Classify by which stylesheets a page pulls in. The eight profiles are a real
 * property of this codebase, not a convenience: a category page loads 206 KB of
 * CSS and a resources leaf loads 145 KB from a disjoint set, so a bug in one
 * profile says nothing about the others. Perf and visual runs sample per profile
 * instead of paying for all 47 pages. */
function profileOf(html) {
  const has = (f) => html.includes(f);
  if (has('src/styles/hero.css')) return 'homepage';
  if (has('careers-test/careers-test.css')) return 'careers-test';
  if (has('src/styles/beckn.css') && has('src/styles/legal.css')) return 'contact-us';
  if (has('src/styles/beckn.css') && has('src/styles/resources.css')) return 'resources-hub';
  if (has('src/styles/beckn.css') && !has('src/styles/category-chrome.css')) return 'about-us';
  if (has('src/styles/beckn.css')) return 'category';
  if (has('src/styles/resources.css')) return 'resources-leaf';
  return 'standalone';
}

/* `serve` (what `npm run dev` runs) strips the .html extension with a 301, and for
 * an index.html it strips again down to the bare directory name:
 *
 *   /d2c-test/index.html -> /d2c-test/index -> /d2c-test
 *
 * At `/d2c-test` the browser treats the last segment as a FILE, so every relative
 * path in that page reparents to the site root and 14 assets 404. Requesting the
 * directory with its trailing slash lands on the page in one hop with the base URL
 * the markup expects.
 *
 * Worth knowing beyond the harness: that page only renders correctly on a server
 * that preserves the trailing slash. It is a real latent fragility, recorded in
 * TEST-BASELINE.md rather than papered over here. */
function urlFor(relPath) {
  if (relPath === 'index.html') return '/';
  if (relPath.endsWith('/index.html')) return '/' + relPath.slice(0, -'index.html'.length);
  return '/' + relPath;
}

export const pages = allFiles
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const source = fs.readFileSync(f, 'utf8');
    return {
      file: f,
      rel: rel(f),
      url: urlFor(rel(f)),
      profile: profileOf(source),
      source,
    };
  })
  .sort((a, b) => a.rel.localeCompare(b.rel));

/* One representative page per profile, for the runs too expensive to do 47 times.
 * Picks the largest page in each profile: the heaviest page is the one whose
 * budget actually matters, and it exercises the most markup. */
export const representatives = Object.values(
  pages.reduce((acc, p) => {
    const cur = acc[p.profile];
    if (!cur || p.source.length > cur.source.length) acc[p.profile] = p;
    return acc;
  }, {}),
).sort((a, b) => a.profile.localeCompare(b.profile));

export const cssFiles = allFiles.filter((f) => f.endsWith('.css')).map(rel);
export const jsFiles = allFiles
  .filter((f) => f.endsWith('.js') || f.endsWith('.jsx'))
  .map(rel);

export const profiles = [...new Set(pages.map((p) => p.profile))].sort();
