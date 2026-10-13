/* Shrink the site's raster images to what the pages can actually display.
 *
 * Measured 2026-09-07: public/assets carried 170 MB of images and a single
 * category page transferred 34 MB, mostly 4,000-6,000 px stock photos painted
 * into 320 px cards. This script is the fix, and it is the rule for every image
 * added later (README: "Adding images").
 *
 * Policy -- "visually identical", agreed with the site owner:
 *   - never upscale, never crop, aspect ratio preserved
 *   - longest side capped at 2x the largest size the image is displayed at:
 *       category stock cards (assets/category_pages_stock_images)  1400 px
 *       everything else (heroes, how-it-works, portraits, footer)  2400 px
 *   - JPEG re-encoded at q82 progressive (mozjpeg)
 *   - PNG photographs (> 100 KB) become WebP q85, alpha preserved; every
 *     reference in HTML/CSS/JSX is rewritten to the new extension
 *   - logos, SVGs, files under 100 KB, legacy/, newsletters/, data/: untouched
 *   - a re-encode is only kept when it saves >= 15 %, so re-running the script
 *     on already-optimised files is a no-op (no generation loss)
 *
 * Usage:  node scripts/optimize-images.mjs [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');
const MIN_BYTES = 100 * 1024;
const KEEP_IF_SAVES = 0.15;

const SCAN = ['public/assets', 'assets/category_pages_stock_images', 'assets/footer-image.png', 'd2c-test/assets'];
const SKIP_DIR = /[\\/](legacy|newsletters|data|fonts)([\\/]|$)/;
/* Logos and the favicon keep their format: a favicon <link> must stay PNG. */
const LOGO_DIR = /[\\/](logos[^\\/]*|buyer-apps|ondc-participants|the_network)[\\/]|ondc_top_logo_transparent|favicon/;
const REF_FILES = [
  'index.html',
  ...fs.readdirSync(path.join(ROOT, 'pages')).map((f) => 'pages/' + f),
  ...fs.readdirSync(path.join(ROOT, 'src/styles')).map((f) => 'src/styles/' + f),
  ...fs.readdirSync(path.join(ROOT, 'src/scripts')).map((f) => 'src/scripts/' + f),
  ...fs.readdirSync(path.join(ROOT, 'src/components')).map((f) => 'src/components/' + f),
  'd2c-test/index.html', 'd2c-test/styles.css', 'd2c-test/script.js',
].filter((f) => /\.(html|css|js|jsx)$/.test(f));

function walk(p, out) {
  if (!fs.existsSync(p)) return out;
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    if (SKIP_DIR.test(p + path.sep)) return out;
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), out);
  } else if (/\.(png|jpe?g|webp|avif)$/i.test(p)) out.push(p);
  return out;
}

const maxSide = (file) => (file.includes('category_pages_stock_images') ? 1400 : 2400);

async function optimise(file) {
  const rel = path.relative(ROOT, file).split(path.sep).join('/');
  const before = fs.statSync(file).size;
  if (before < MIN_BYTES || LOGO_DIR.test(file)) return null;
  /* Read into memory first: on Windows libvips keeps the source handle open
   * long enough that writing back to the same path fails with EUNKNOWN. */
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();
  const cap = maxSide(file);
  const needsResize = Math.max(meta.width, meta.height) > cap;
  const ext = path.extname(file).toLowerCase();
  const toWebp = ext === '.png' || ext === '.avif';

  let img = sharp(input);
  if (needsResize) img = img.resize({ width: cap, height: cap, fit: 'inside', withoutEnlargement: true });
  if (toWebp || ext === '.webp') img = img.webp({ quality: 85, effort: 5 });
  else img = img.jpeg({ quality: 82, progressive: true, mozjpeg: true });

  const buf = await img.toBuffer();
  const after = buf.length;
  if (!needsResize && after > before * (1 - KEEP_IF_SAVES)) return { rel, before, after: before, skipped: true };

  const outFile = toWebp ? file.replace(/\.(png|avif)$/i, '.webp') : file;
  if (!DRY) {
    fs.writeFileSync(outFile, buf);
    if (outFile !== file) fs.unlinkSync(file);
  }
  const renamed = outFile !== file ? path.relative(ROOT, outFile).split(path.sep).join('/') : null;
  return { rel, before, after, renamed };
}

function rewriteRefs(renames) {
  if (!renames.length) return 0;
  let hits = 0;
  /* References use ../public/assets/x, /public/assets/x or public/assets/x,
   * sometimes with spaces URL-encoded. Match on the path below the top folder
   * so all three prefixes and both encodings are covered. */
  const tail = (s) => s.replace(/^(public|d2c-test)\//, '');
  for (const rf of REF_FILES) {
    const p = path.join(ROOT, rf);
    let src = fs.readFileSync(p, 'utf8');
    const orig = src;
    for (const { from, to } of renames) {
      for (const [a, b] of [[tail(from), tail(to)], [encodeURI(tail(from)), encodeURI(tail(to))]]) {
        if (a !== b && src.includes(a)) { src = src.split(a).join(b); hits++; }
      }
    }
    if (src !== orig && !DRY) fs.writeFileSync(p, src);
  }
  return hits;
}

const files = SCAN.flatMap((s) => walk(path.join(ROOT, s), []));
let totalBefore = 0, totalAfter = 0;
const renames = [];
for (const f of files) {
  const r = await optimise(f);
  if (!r) continue;
  totalBefore += r.before; totalAfter += r.after;
  if (r.renamed) renames.push({ from: r.rel, to: r.renamed });
  if (!r.skipped) console.log(`${(r.before / 1024) | 0}K -> ${(r.after / 1024) | 0}K  ${r.rel}${r.renamed ? '  => .webp' : ''}`);
}
const refs = rewriteRefs(renames);
console.log(`\n${DRY ? '[dry run] ' : ''}${(totalBefore / 1048576).toFixed(1)} MB -> ${(totalAfter / 1048576).toFixed(1)} MB across ${files.length} files; ${renames.length} converted to WebP, ${refs} references rewritten`);
