// @ts-check
import { defineConfig, devices } from '@playwright/test';

/* The site is static and every path in the HTML is relative to the REPO ROOT
 * (README.md:26-27) -- serving pages/ directly yields an unstyled page. So the
 * webServer serves ".", exactly like `npm run dev`.
 *
 * `channel: 'chrome'` uses the Chrome already installed on the machine instead of
 * downloading Chromium. That keeps the devDependency footprint to one package,
 * and it means the tests run against the same engine the team debugs in.
 */
export default defineConfig({
  testDir: './tests/e2e',
  // Layout and perf assertions read real geometry; parallel workers in one browser
  // are fine, but retries would mask genuine flake in a scroll-driven page.
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: process.env.CI ? [['github'], ['list']] : [['list']],
  // 75s, not the 45s default: pages/impact-retail.html carries 35 MB of images and
  // legitimately takes a while to settle. The weight itself is a finding, measured
  // in the perf layer -- it should not also surface here as a bogus timeout.
  timeout: 75_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL: 'http://localhost:8000',
    channel: 'chrome',
    // Screenshots and traces only on failure -- .git is already 447 MB.
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
  },

  projects: [
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],

  webServer: {
    command: 'npx serve -l 8000 .',
    url: 'http://localhost:8000/index.html',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
