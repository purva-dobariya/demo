import { test, expect } from '@playwright/test';
import { pages } from '../pages.mjs';

/* Layer 5 -- page-weight budget.
 *
 * Measured on 2026-09-07 before the performance pass: the homepage transferred
 * 13.7 MB and pages/impact-retail.html 34.2 MB. The budgets below are what the
 * pass targets; a page that regresses past them fails here, which is the only
 * thing that stops a 6 MB stock photo from landing in a 320 px card again.
 *
 * Only same-origin bytes count. Third-party fonts/CDNs are measured elsewhere
 * and were removed by the same pass.
 */

const MB = 1024 * 1024;
const BUDGET = {
  homepage: 2.5 * MB,
  category: 3 * MB,
  'careers-test': 3 * MB,
  'about-us': 3 * MB,
  default: 1.5 * MB,
};

for (const page_ of pages) {
  test(`weight within budget :: ${page_.rel}`, async ({ page }) => {
    const budget = BUDGET[page_.profile] ?? BUDGET.default;
    let bytes = 0;
    const heavy = [];
    page.on('response', async (res) => {
      if (!res.url().startsWith('http://localhost:8000')) return;
      const len = Number(res.headers()['content-length']) || 0;
      bytes += len;
      if (len > 300 * 1024) heavy.push(`${(len / 1024) | 0} KB ${new URL(res.url()).pathname}`);
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(page_.url, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => {});
    expect(bytes, `transferred ${(bytes / MB).toFixed(2)} MB; heavy: ${heavy.join(', ') || 'none'}`)
      .toBeLessThanOrEqual(budget);
  });
}
