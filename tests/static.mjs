#!/usr/bin/env node
/* Layer 1 -- static integrity. No browser, runs in seconds.
 *
 * This is a GUARD, not a finder. At the time it was written the surface was
 * already clean: 2,079 local references across 47 pages, zero missing, zero case
 * mismatches, zero duplicate ids, zero dangling anchors. The point is that it
 * stays that way, because deploy is `git reset --hard` onto an EC2 box with
 * nothing in between -- a broken path is a broken production page immediately.
 *
 *   node tests/static.mjs          fail on errors, print warnings
 *   node tests/static.mjs --strict treat warnings as failures too
 */

import fs from 'node:fs';
import path from 'node:path';
import * as cheerio from 'cheerio';
import { ROOT, pages, allFiles, cssFiles, jsFiles } from './pages.mjs';

const STRICT = process.argv.includes('--strict');
const errors = [];
const warnings = [];
const notes = [];

const fail = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

/* ---------- case-sensitive existence -------------------------------------
 * Dev is Windows, production is Linux. fs.existsSync() is case-insensitive on
 * Windows, so a path that differs only in case passes locally and 404s in
 * production -- a bug class that is literally invisible on the machine where the
 * code is written. Compare against the real directory listing instead. */
const dirCache = new Map();
function listDir(dir) {
  if (!dirCache.has(dir)) {
    try { dirCache.set(dir, new Set(fs.readdirSync(dir))); }
    catch { dirCache.set(dir, null); }
  }
  return dirCache.get(dir);
}

function existsCaseSensitive(absPath) {
  const relative = path.relative(ROOT, absPath);
  if (relative.startsWith('..')) return { ok: false, reason: 'outside repo' };
  let current = ROOT;
  for (const segment of relative.split(path.sep)) {
    if (!segment || segment === '.') continue;
    const entries = listDir(current);
    if (!entries) return { ok: false, reason: 'missing' };
    if (!entries.has(segment)) {
      // Distinguish "wrong case" from "not there at all" -- very different fixes.
      const lower = segment.toLowerCase();
      const near = [...entries].find((e) => e.toLowerCase() === lower);
      return near
        ? { ok: false, reason: `case mismatch, disk has "${near}"` }
        : { ok: false, reason: 'missing' };
    }
    current = path.join(current, segment);
  }
  return { ok: true };
}

const isExternal = (u) =>
  /^(https?:|mailto:|tel:|data:|javascript:|#|\/\/)/i.test(u.trim());

/* ---------- 1. every local reference resolves ---------------------------- */
let refCount = 0;
for (const page of pages) {
  const $ = cheerio.load(page.source);
  const refs = [];
  $('[src], [href], [poster]').each((_, el) => {
    for (const attr of ['src', 'href', 'poster']) {
      const v = $(el).attr(attr);
      if (v) refs.push(v);
    }
  });
  // CSS url() inside inline <style> blocks, which several pages carry.
  for (const m of page.source.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) refs.push(m[2]);

  for (const raw of refs) {
    if (!raw || isExternal(raw)) continue;
    const clean = decodeURIComponent(raw.split('#')[0].split('?')[0]).trim();
    if (!clean) continue;
    refCount++;
    const base = path.dirname(page.file);
    const abs = clean.startsWith('/')
      ? path.join(ROOT, clean.slice(1))
      : path.resolve(base, clean);
    const res = existsCaseSensitive(abs);
    if (!res.ok) fail(page.rel, `broken reference "${raw}" (${res.reason})`);
  }
}
notes.push(`resolved ${refCount} local references across ${pages.length} pages`);

/* ---------- 2. load-order invariants ------------------------------------
 * Both of these are documented as load-bearing and enforced by nothing. */
for (const page of pages) {
  const $ = cheerio.load(page.source);

  const sheets = $('link[rel="stylesheet"]')
    .map((_, el) => $(el).attr('href') || '')
    .get()
    .filter((h) => !isExternal(h));
  const mobileIdx = sheets.findIndex((h) => h.endsWith('mobile.css'));
  if (mobileIdx !== -1 && mobileIdx !== sheets.length - 1) {
    fail(page.rel, `mobile.css must load last (index.html:36-38); it is ${mobileIdx + 1} of ${sheets.length}`);
  }

  // The 8 JSX files attach to global scope with no imports, so App.jsx must be
  // last or it renders against components that do not exist yet (README.md:54-63).
  const babel = $('script[type="text/babel"]')
    .map((_, el) => $(el).attr('src') || '')
    .get();
  if (babel.length) {
    const appIdx = babel.findIndex((s) => s.endsWith('App.jsx'));
    if (appIdx !== -1 && appIdx !== babel.length - 1) {
      fail(page.rel, `App.jsx must be the last text/babel script; it is ${appIdx + 1} of ${babel.length}`);
    }
  }
}

/* ---------- 3. duplicate ids and dangling same-page anchors -------------- */
for (const page of pages) {
  const $ = cheerio.load(page.source);
  const ids = new Set();
  $('[id]').each((_, el) => {
    const id = $(el).attr('id');
    if (ids.has(id)) fail(page.rel, `duplicate id "${id}"`);
    ids.add(id);
  });

  $('a[href^="#"]').each((_, el) => {
    const href = $(el).attr('href');
    if (!href || href === '#') return;
    const target = decodeURIComponent(href.slice(1));
    // The homepage is React-rendered, so its anchors legitimately do not exist
    // in source. Cross-page anchors are checked in the browser layer instead.
    if (page.profile === 'homepage') return;
    if (!ids.has(target)) fail(page.rel, `anchor "#${target}" has no matching id`);
  });

  for (const attr of ['aria-controls', 'aria-labelledby', 'aria-describedby']) {
    $(`[${attr}]`).each((_, el) => {
      for (const target of ($(el).attr(attr) || '').split(/\s+/).filter(Boolean)) {
        if (!ids.has(target)) fail(page.rel, `${attr}="${target}" has no matching id`);
      }
    });
  }
}

/* ---------- 4. CSS structural sanity ------------------------------------
 * A stray sed broke beckn.css during a fix session and only a hand-run brace
 * count caught it. There is no build step to notice, so this is the substitute. */
for (const relPath of cssFiles) {
  const css = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  const open = (css.match(/\{/g) || []).length;
  const close = (css.match(/\}/g) || []).length;
  if (open !== close) fail(relPath, `unbalanced braces: ${open} "{" vs ${close} "}"`);

  const cOpen = (css.match(/\/\*/g) || []).length;
  const cClose = (css.match(/\*\//g) || []).length;
  if (cOpen !== cClose) fail(relPath, `unbalanced comments: ${cOpen} "/*" vs ${cClose} "*/"`);
}

/* ---------- 5. JSON data integrity --------------------------------------
 * README.md:196-200: a trailing comma silently blanks the whole buyer-apps
 * directory. The page still renders, just empty -- nothing errors. */
let logoRefsChecked = 0;
const missingLogos = new Set();
const jsonFiles = allFiles.filter(
  (f) => f.endsWith('.json') && !f.includes('package') && !f.includes(`${path.sep}tests${path.sep}`),
);
for (const file of jsonFiles) {
  const relPath = path.relative(ROOT, file).split(path.sep).join('/');
  let parsed;
  try {
    parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    fail(relPath, `invalid JSON: ${e.message}`);
    continue;
  }
  if (Array.isArray(parsed) && parsed.length === 0) {
    warn(relPath, 'parses as an empty array -- the silent-blanking failure mode');
  }

  /* Logo paths inside the participant snapshots are injected into the DOM at
   * runtime by logo-fallback.js, so a missing file never appears in any HTML and
   * the reference scan above cannot see it. It degrades to an initials monogram
   * rather than a broken-image icon, which is precisely why nobody noticed:
   * the page looks fine and simply shows the wrong thing.
   *
   * Resolution mirrors logo-fallback.js:34-40 exactly -- absolute or remote is
   * passed through, a bare filename resolves under np_logos. */
  if (Array.isArray(parsed)) {
    const missing = new Set();
    let checked = 0;
    for (const row of parsed) {
      if (!row || typeof row !== 'object') continue;
      for (const key of ['logo', 'brand_logo']) {
        const value = row[key];
        if (typeof value !== 'string' || !value.trim()) continue;
        const file = value.trim();
        if (/^https?:\/\//i.test(file)) continue;
        checked++;
        const abs = file.startsWith('/')
          ? path.join(ROOT, file.slice(1))
          : path.join(ROOT, 'public/assets/legacy/np_logos', file);
        if (!existsCaseSensitive(abs).ok) missing.add(file);
      }
    }
    logoRefsChecked += checked;
    if (missing.size) {
      warn(relPath, `${missing.size} logo file(s) referenced but not on disk -- these silently fall back to an initials monogram: ${[...missing].slice(0, 6).join(', ')}${missing.size > 6 ? ', ...' : ''}`);
      for (const m of missing) missingLogos.add(m);
    }
  }
}
notes.push(`validated ${jsonFiles.length} JSON files`);
notes.push(`resolved ${logoRefsChecked} data-driven logo paths, ${missingLogos.size} missing`);

/* ---------- 6. per-page meta and image alt ------------------------------ */
for (const page of pages) {
  const $ = cheerio.load(page.source);
  if (!$('html').attr('lang')) warn(page.rel, 'no lang attribute on <html>');
  if (!$('title').length || !$('title').text().trim()) warn(page.rel, 'no <title>');
  if (!$('meta[name="viewport"]').length) fail(page.rel, 'no viewport meta');
  if (!$('meta[name="description"]').attr('content')) warn(page.rel, 'no meta description');

  let missingAlt = 0;
  $('img').each((_, el) => {
    if ($(el).attr('alt') === undefined) missingAlt++;
  });
  if (missingAlt) warn(page.rel, `${missingAlt} <img> without alt`);
}

/* Every page 404s on /favicon.ico because the browser asks for one unprompted and
 * the site ships none. Counted once here rather than 47 times in the browser run. */
const noIcon = pages.filter(
  (p) => !/rel=["'](?:shortcut )?icon["']|apple-touch-icon/i.test(p.source),
);
if (noIcon.length) {
  warn('favicon', `${noIcon.length} of ${pages.length} pages declare no icon; no favicon file exists, so every load 404s`);
}

/* ---------- 7. orphans and duplicates -----------------------------------
 * Reported, never failed: ~205 MB of the shipped payload is currently
 * unreachable and deleting it is the owner's call, not this script's. What this
 * does enforce is that the number stops growing. */
const referenced = new Set();
for (const page of pages) {
  for (const m of page.source.matchAll(/(?:src|href)=["']([^"']+)["']/g)) referenced.add(m[1]);
  for (const m of page.source.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) referenced.add(m[2]);
}
for (const relPath of cssFiles) {
  const css = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
  for (const m of css.matchAll(/url\((['"]?)([^'")]+)\1\)/g)) referenced.add(m[2]);
}
const refBasenames = new Set([...referenced].map((r) => path.basename(r.split('?')[0])));

const orphanAssets = [];
for (const relPath of [...cssFiles, ...jsFiles]) {
  if (!refBasenames.has(path.basename(relPath))) orphanAssets.push(relPath);
}
if (orphanAssets.length) {
  warn('orphans', `${orphanAssets.length} CSS/JS files referenced by no page: ${orphanAssets.join(', ')}`);
}

/* ---------- report ------------------------------------------------------- */
console.log('\nstatic integrity\n' + '='.repeat(60));
for (const n of notes) console.log(`  .. ${n}`);

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length})`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (errors.length) {
  console.log(`\nFAILURES (${errors.length})`);
  for (const e of errors) console.log(`  X ${e}`);
}

const failed = errors.length > 0 || (STRICT && warnings.length > 0);
console.log(
  `\n${failed ? 'FAIL' : 'PASS'} -- ${errors.length} error(s), ${warnings.length} warning(s)\n`,
);
process.exit(failed ? 1 : 0);
