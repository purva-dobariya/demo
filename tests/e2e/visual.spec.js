import { test, expect } from '@playwright/test';

/* Layer 4 -- appearance lock.
 *
 * The performance pass (image recompression, self-hosted fonts, bundled homepage)
 * must not change how any page looks. These full-page screenshots were recorded
 * BEFORE that pass and every later change is diffed against them. The tolerance
 * admits JPEG/WebP recompression noise and nothing else: a moved element, a
 * different weight, a missing image all exceed 0.2% of pixels.
 *
 * Re-record only when a page is deliberately redesigned:
 *   npx playwright test tests/e2e/visual.spec.js --update-snapshots
 */

const PAGES = [
  '/',
  '/pages/impact-retail.html',
  '/pages/d2c-retail.html',
  '/pages/about-us.html',
  '/pages/careers.html',
  '/pages/resources.html',
  '/pages/network-participants.html',
  '/pages/privacy-policy.html',
];

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'iphone-390', width: 390, height: 844 },
];

/* Reveal-on-scroll (fx.js / beckn.js) leaves below-fold sections at opacity 0
 * until they enter the viewport. Walk the page once so every section has
 * revealed and every lazy image has been requested, then return to the top. */
async function settle(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(500);
}

for (const url of PAGES) {
  for (const vp of VIEWPORTS) {
    const slug = url === '/' ? 'home' : url.replace(/^\/pages\//, '').replace(/\.html$/, '');
    test(`looks unchanged :: ${slug} @ ${vp.name}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: 'load' });
      await settle(page);
      await expect(page).toHaveScreenshot(`${slug}-${vp.name}.png`, {
        fullPage: true,
        animations: 'disabled',
        caret: 'hide',
        maxDiffPixelRatio: 0.002,
        /* Canvases (hero mesh, network field) are decorative and animate on
         * their own clock; they are not what this suite guards. */
        mask: [page.locator('canvas')],
        timeout: 45_000,
      });
    });
  }
}
