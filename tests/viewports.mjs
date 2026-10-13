/* The viewport matrix.
 *
 * Both bugs that prompted this suite lived at widths nobody had ever looked at:
 * a card deck that clubbed on a 16:10 laptop, and a poster row that peaked in
 * size at 1240-1280px because --max-w is fixed while --px keeps shrinking. There
 * is no media query anywhere in this codebase above 1200px, and exactly one
 * height-keyed query in the whole repo.
 *
 * So the matrix is derived from the stylesheets rather than hand-picked: every
 * declared breakpoint is probed on both sides. Add a breakpoint to the CSS and it
 * gets covered automatically; nobody has to remember to update a list here.
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT, cssFiles } from './pages.mjs';

/* Pull every `(min-width: Npx)` / `(max-width: Npx)` out of the shipped CSS. */
export function declaredBreakpoints() {
  const widths = new Set();
  for (const relPath of cssFiles) {
    const css = fs.readFileSync(path.join(ROOT, relPath), 'utf8');
    for (const m of css.matchAll(/\((?:min|max)-width:\s*(\d+)px\)/g)) {
      widths.add(Number(m[1]));
    }
  }
  return [...widths].sort((a, b) => a - b);
}

/* A `max-width: 900px` rule flips between 900 and 901; a `min-width: 901px` rule
 * flips between 900 and 901 too. Probing bp and bp+1 covers both directions
 * without needing to know which kind declared it. */
export function edgeViewports(height = 900) {
  const out = [];
  for (const bp of declaredBreakpoints()) {
    out.push({ name: `bp${bp}`, width: bp, height });
    out.push({ name: `bp${bp}+1`, width: bp + 1, height });
  }
  return out;
}

/* Fixed sizes that matter regardless of what the CSS declares. */
export const KEY_VIEWPORTS = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  // The reported bugs. 16:10 laptops sit above every declared breakpoint, in the
  // band the stylesheets never address.
  { name: 'macbook-air-1440', width: 1440, height: 900 },
  { name: 'laptop-1280x800', width: 1280, height: 800 },
  // Exercises fx.css's `max-height: 720px` -- the only height query in the repo.
  { name: 'short-1440x700', width: 1440, height: 700 },
  { name: 'tablet-820', width: 820, height: 1180 },
  { name: 'iphone-390', width: 390, height: 844 },
];

/* Visual regression pays per screenshot, so it uses a deliberately small set. */
export const VISUAL_VIEWPORTS = KEY_VIEWPORTS.filter((v) =>
  ['desktop-1920', 'macbook-air-1440', 'tablet-820', 'iphone-390'].includes(v.name),
);

/* Smoke runs the union: every declared edge plus the fixed sizes. */
export function smokeViewports() {
  const seen = new Map();
  for (const v of [...KEY_VIEWPORTS, ...edgeViewports()]) {
    const key = `${v.width}x${v.height}`;
    if (!seen.has(key)) seen.set(key, v);
  }
  return [...seen.values()];
}
