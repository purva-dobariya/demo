import { test, expect } from '@playwright/test';
import { pages, representatives } from '../pages.mjs';

/* Layer 3 -- layout invariants.
 *
 * These are the assertions that would have caught the two bugs that prompted the
 * suite, written to catch the CLASS rather than the instance. Each one names the
 * bug it generalises, because an assertion whose purpose is forgotten is the first
 * one someone deletes when it goes red.
 */

const KEY_VIEWPORT = { width: 1440, height: 900 };

/* ---------------------------------------------------------------------------
 * 1. Declared aspect-ratio must be the rendered aspect-ratio.
 *
 * .net-poster declared `aspect-ratio: 4/5` and rendered 3:4 for its entire life.
 * It is a column flex item, so its automatic `min-height: auto` floor resolves to
 * the loaded image's own intrinsic height -- which beat the declared ratio the
 * moment the JPEG decoded. Nothing errored; the section just silently grew ~27px
 * under the reader on every load.
 *
 * Measured AFTER load on purpose: before decode the ratio is correct, so a check
 * that ran too early would have passed while the bug was live.
 * ------------------------------------------------------------------------- */
for (const page_ of representatives) {
  test(`aspect-ratio holds after load :: ${page_.rel}`, async ({ page }) => {
    await page.setViewportSize(KEY_VIEWPORT);
    await page.goto(page_.url, { waitUntil: 'load' });
    await page.waitForTimeout(600);

    const violations = await page.evaluate(async () => {
      /* Let images settle first -- the override only appears once intrinsic
       * dimensions exist, so checking too early passes while the bug is live.
       *
       * Bounded, because 111 of the site's 152 <img> tags carry no `loading`
       * attribute and those that do are lazy: an image below the fold never
       * starts loading, so its onload never fires and an unbounded Promise.all
       * waits forever. Ask for eager loading, then give up after 3s and assess
       * whatever did decode. */
      const settle = (img) =>
        img.complete
          ? Promise.resolve()
          : Promise.race([
              new Promise((r) => { img.onload = img.onerror = r; }),
              new Promise((r) => setTimeout(r, 3000)),
            ]);
      const imgs = [...document.images];
      imgs.forEach((i) => { if (i.loading === 'lazy') i.loading = 'eager'; });
      await Promise.all(imgs.map(settle));

      const out = [];
      for (const el of document.querySelectorAll('*')) {
        const cs = getComputedStyle(el);
        const declared = cs.aspectRatio;
        if (!declared || declared === 'auto') continue;
        const m = declared.match(/^\s*(\d*\.?\d+)\s*\/\s*(\d*\.?\d+)\s*$/);
        if (!m) continue;
        const want = Number(m[1]) / Number(m[2]);
        const r = el.getBoundingClientRect();
        if (r.width < 8 || r.height < 8) continue;
        const got = r.width / r.height;
        // 2% tolerance: sub-pixel rounding and borders, not a silent override.
        if (Math.abs(got - want) / want > 0.02) {
          out.push(
            `${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string'
              ? '.' + el.className.trim().split(/\s+/)[0] : ''}` +
            ` declares ${declared} (${want.toFixed(3)}) but renders ` +
            `${r.width.toFixed(1)}x${r.height.toFixed(1)} (${got.toFixed(3)})`,
          );
        }
      }
      return [...new Set(out)];
    });

    expect(violations, `\n  ${violations.join('\n  ')}\n`).toEqual([]);
  });
}

/* ---------------------------------------------------------------------------
 * 2. The scrubbed deck must track the scroll exactly.
 *
 * fx.css grouped .dpi-card with three static hover cards and gave all four
 * `transition: transform .3s`. DPISection.jsx rewrites that transform on every
 * scroll event, so each write restarted a 300ms eased tween toward a target that
 * had already moved: the card lagged the scroll, and because all nine cards share
 * `grid-area: 1/1` the outgoing card was still on the pile when the next arrived.
 * That is what "they club into each other" was.
 *
 * Asserting the rendered transform equals the scroll-derived target catches any
 * recurrence directly, whatever causes it.
 * ------------------------------------------------------------------------- */
test('building-blocks deck tracks scroll with no tween lag', async ({ page }) => {
  await page.setViewportSize(KEY_VIEWPORT);
  await page.goto('/', { waitUntil: 'load' });
  await expect.poll(() => page.locator('.dpi-card').count(), { timeout: 20_000 })
    .toBeGreaterThan(0);

  // A transform transition on the JS-owned element is the root cause; assert its
  // absence directly as well as by behaviour.
  const transitionProp = await page
    .locator('.dpi-card')
    .first()
    .evaluate((el) => getComputedStyle(el).transitionProperty);
  expect(
    transitionProp,
    'a transform transition on .dpi-card fights the per-frame scrub (see fx.css deck layer)',
  ).not.toContain('transform');

  const problems = [];
  for (const p of [0.15, 0.35, 0.55, 0.75, 0.95]) {
    const result = await page.evaluate(async (progress) => {
      const sec = document.querySelector('#infrastructure');
      const cards = [...document.querySelectorAll('.dpi-card')];
      const N = cards.length;
      const travel = sec.offsetHeight - window.innerHeight;
      window.scrollTo(0, sec.getBoundingClientRect().top + window.scrollY + progress * travel);
      // Two frames: one for the scroll event, one for the rAF-batched paint.
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

      const vw = window.innerWidth / 100;
      const actualP = Math.max(0, Math.min(1, -sec.getBoundingClientRect().top / travel));
      const d = actualP * (N - 1);
      let maxErr = 0;
      let inMotion = 0;
      cards.forEach((c, i) => {
        const x = new DOMMatrixReadOnly(getComputedStyle(c).transform).m41 / vw;
        const t = i === 0 ? 1 : Math.max(0, Math.min(1, d - (i - 1)));
        maxErr = Math.max(maxErr, Math.abs(x - (1 - t) * 106));
        if (x > 0.5 && x < 105.5) inMotion++;
      });
      return { maxErr, inMotion };
    }, p);

    // 1vw of slack absorbs sub-pixel rounding; a live 300ms tween mid-scrub is
    // tens of vw off, so this is not a close call.
    if (result.maxErr > 1) problems.push(`p=${p}: transform is ${result.maxErr.toFixed(2)}vw off target`);
    if (result.inMotion > 1) problems.push(`p=${p}: ${result.inMotion} cards mid-flight at once (cards overlapping)`);
  }

  expect(problems, `\n  ${problems.join('\n  ')}\n`).toEqual([]);
});

/* ---------------------------------------------------------------------------
 * 3. Cards in one grid row share a baseline.
 *
 * The board page's ten cards had their rule and their name at five different
 * heights across a single row, because `margin-top: auto` bottom-aligned bodies
 * whose capacity labels wrapped to one or two lines. Invisible while the cards
 * were split across four small groups; obvious the moment they shared one grid.
 * ------------------------------------------------------------------------- */
test('board cards align on one baseline per row', async ({ page }) => {
  await page.setViewportSize(KEY_VIEWPORT);
  await page.goto('/pages/about-us.html', { waitUntil: 'load' });
  await page.evaluate(() =>
    document.querySelectorAll('.bk-rv').forEach((e) => e.classList.add('bk-in')));
  await page.waitForTimeout(400);

  const rows = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('.bk-person')];
    if (!cards.length) return null;
    const byRow = new Map();
    for (const c of cards) {
      const top = Math.round(c.getBoundingClientRect().top);
      if (!byRow.has(top)) byRow.set(top, []);
      byRow.get(top).push({
        body: Math.round(c.querySelector('.bk-person-body').getBoundingClientRect().top),
        name: Math.round(c.querySelector('.bk-person-name').getBoundingClientRect().top),
      });
    }
    return [...byRow.entries()].map(([top, items]) => ({
      top,
      bodies: [...new Set(items.map((i) => i.body))],
      names: [...new Set(items.map((i) => i.name))],
    }));
  });

  expect(rows, 'no .bk-person cards found -- selector drifted?').not.toBeNull();
  const bad = rows
    .filter((r) => r.bodies.length > 1 || r.names.length > 1)
    .map((r) => `row at y=${r.top}: ${r.bodies.length} rule heights, ${r.names.length} name baselines`);
  expect(bad, `\n  ${bad.join('\n  ')}\n`).toEqual([]);
});

/* ---------------------------------------------------------------------------
 * 4. Site chrome is identical across page profiles.
 *
 * about-us.html is the one category-styled page that does NOT load
 * category-chrome.css -- it carries a 171-line inline copy that omits all 17
 * nav and footer-bottom rules, so its navbar resolves through a different cascade
 * than every other page. Nothing about that is visible until it drifts.
 * ------------------------------------------------------------------------- */
test('navbar geometry is consistent across pages', async ({ page }) => {
  const sample = pages.filter((p) => p.rel.startsWith('pages/')).slice(0, 12);
  const shapes = [];
  for (const p of sample) {
    await page.setViewportSize(KEY_VIEWPORT);
    await page.goto(p.url, { waitUntil: 'domcontentloaded' });
    const shape = await page.evaluate(() => {
      const nav = document.querySelector('.navbar');
      if (!nav) return null;
      const r = nav.getBoundingClientRect();
      return { h: Math.round(r.height), top: Math.round(r.top) };
    });
    if (shape) shapes.push({ page: p.rel, ...shape });
  }

  const heights = [...new Set(shapes.map((s) => s.h))];
  expect(
    heights.length,
    `navbar height differs across pages: ${shapes.map((s) => `${s.page}=${s.h}px`).join(', ')}`,
  ).toBe(1);
});
