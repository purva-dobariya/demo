import { test, expect } from '@playwright/test';
import { pages, representatives } from '../pages.mjs';
import { KEY_VIEWPORTS, edgeViewports } from '../viewports.mjs';
import knownIssues from '../known-issues.json' with { type: 'json' };

// Resolved once at module load, not per test: it reads every stylesheet off disk.
const EDGES = edgeViewports();

/* Layer 2 -- runtime smoke.
 *
 * Split deliberately, after measuring:
 *
 *   every page   x  6 key viewports     -- console/network health + overflow
 *   8 reps       x 48 breakpoint edges  -- the exhaustive width sweep
 *
 * The first draft ran all 47 pages through all 48 viewports. That is 2,256
 * measurements, it took 24 minutes, and 20 tests hit the timeout mid-sweep on the
 * category pages -- one of which carries 35 MB of images. Nobody runs a 24-minute
 * check on every PR, so it would have been switched off inside a week. Both halves
 * together are ~630 measurements and still cover every declared breakpoint.
 */

const isLocal = (url) => url.startsWith('http://localhost:8000');

/* The browser requests /favicon.ico on its own; the site declares no icon on any
 * of its 46 pages and ships no favicon file, so every single page load 404s here.
 * That is a real gap, but it belongs in one static finding, not as 47 identical
 * runtime failures that train everyone to ignore this suite. static.mjs reports it. */
const isFaviconNoise = (url) => /\/favicon\.(ico|png|svg)$/i.test(url);

/* External requests are not this suite's business. The registry feeds at
 * www.ondc.org are documented as dead (scripts/refresh-participant-data.js:10-13)
 * and unpkg is a third party -- letting either red the build would make the suite
 * untrustworthy and it would get ignored. Local 404s are hard failures. */
/* A console error about a third-party URL is still a third-party problem. CORS
 * rejections are the awkward case: Chrome reports them with the PAGE as the
 * location and the blocked origin only inside the message text, so filtering by
 * location alone lets the dead www.ondc.org registry feeds fail every run. If a
 * message names URLs and none of them are ours, it is not ours. */
function isExternalOnly(text, location) {
  const urls = (String(text).match(/https?:\/\/[^\s'")]+/g) || [])
    /* A CORS message names BOTH the blocked target and our own origin:
     *   Access to fetch at 'https://www.ondc.org/...' from origin 'http://localhost:8000'
     * The origin is bare (no path), and it is the subject of the sentence only
     * grammatically -- the failing resource is the other one. Dropping the bare
     * origin is what lets these classify as third-party, which is what they are. */
    .filter((u) => u.replace(/\/$/, '') !== 'http://localhost:8000');
  if (urls.length) return urls.every((u) => !isLocal(u));
  return Boolean(location) && !isLocal(location);
}

function watch(page, sink) {
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    /* Chrome's message for a failed subresource is the bare string "Failed to load
     * resource: ... 404" with no URL. Location gives the URL back; without it the
     * failure tells you nothing and somebody has to reproduce it by hand. */
    const where = msg.location()?.url;
    if (where && isFaviconNoise(where)) return;
    const entry = where ? `${msg.text()}  [${where}]` : msg.text();
    if (isExternalOnly(msg.text(), where)) { sink.external.push(entry); return; }
    sink.consoleErrors.push(entry);
  });
  page.on('pageerror', (err) => sink.consoleErrors.push(`uncaught: ${err.message}`));
  page.on('requestfailed', (req) => {
    if (isFaviconNoise(req.url())) return;
    const entry = `${req.url()} (${req.failure()?.errorText ?? 'failed'})`;
    (isLocal(req.url()) ? sink.local : sink.external).push(entry);
  });
  page.on('response', (res) => {
    if (res.status() < 400 || isFaviconNoise(res.url())) return;
    const entry = `${res.url()} -> ${res.status()}`;
    (isLocal(res.url()) ? sink.local : sink.external).push(entry);
  });
}

/* Heavy category pages can take a while to fully load 35 MB of images. Waiting for
 * `load` and failing on timeout would punish the page weight twice; the weight is
 * measured properly in the perf layer. Here we settle what we can and move on. */
async function open(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load', { timeout: 20_000 }).catch(() => {});
}

async function measureOverflow(page, viewports) {
  const found = [];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.waitForTimeout(40);
    const result = await page.evaluate(() => {
      const de = document.documentElement;
      const over = de.scrollWidth - de.clientWidth;
      if (over <= 1) return { over: 0, culprit: null };
      /* Naming the widest offending element is the difference between a useful
       * failure and one somebody has to bisect by hand. Only walked when there is
       * actually an overflow, so it costs nothing on a healthy page. */
      let culprit = null;
      let worst = 0;
      for (const el of document.body.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        const spill = r.right - de.clientWidth;
        if (spill > worst) {
          worst = spill;
          const cls = typeof el.className === 'string' && el.className.trim()
            ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
            : '';
          culprit = `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls}`;
        }
      }
      return { over, culprit };
    });
    if (result.over > 1) {
      found.push(`${vp.width}x${vp.height}: +${result.over}px (${result.culprit ?? 'unknown'})`);
    }
  }
  return found;
}

/* Known, accepted, pre-existing defects. Gating CI on a suite that is red from
 * birth just teaches everyone to ignore it, so the day-one findings are recorded
 * in tests/known-issues.json with a reason and a fix, and everything NOT listed
 * still fails. Delete an entry there and this guards it again. */
function isKnown(pageRel, entry) {
  return (knownIssues.localRequestFailures || []).some(
    (k) => k.pages.includes(pageRel) && entry.includes(k.match),
  );
}

function report(sink, overflows, pageRel) {
  const problems = [];
  const unexpectedLocal = sink.local.filter((e) => !isKnown(pageRel, e));
  const knownLocal = sink.local.filter((e) => isKnown(pageRel, e));
  const unexpectedConsole = sink.consoleErrors.filter((e) => !isKnown(pageRel, e));

  if (knownLocal.length) {
    test.info().annotations.push({
      type: 'known-issue',
      description: `${knownLocal.length} accepted pre-existing failure(s); see tests/known-issues.json`,
    });
  }
  if (unexpectedConsole.length) problems.push(`console errors:\n    ${unexpectedConsole.join('\n    ')}`);
  if (unexpectedLocal.length) problems.push(`local request failures:\n    ${unexpectedLocal.join('\n    ')}`);
  if (overflows.length) problems.push(`horizontal overflow at ${overflows.length} viewport(s):\n    ${overflows.join('\n    ')}`);
  return problems;
}

/* ---- every page, the viewports that matter most -------------------------- */
for (const page_ of pages) {
  test(`${page_.rel} [${page_.profile}]`, async ({ page }) => {
    const sink = { consoleErrors: [], local: [], external: [] };
    watch(page, sink);

    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page, page_.url);

    /* The homepage is a Babel-in-browser SPA: #root is empty in source and every
     * pixel depends on react + react-dom + @babel/standalone arriving from unpkg
     * and then transpiling 94 KB of JSX. If that chain breaks the page is blank
     * and nothing else errors, so this is the canary. */
    if (page_.profile === 'homepage') {
      await expect
        .poll(() => page.locator('#root > *').count(), { timeout: 20_000 })
        .toBeGreaterThan(0);
    }
    await page.waitForTimeout(300);

    const overflows = await measureOverflow(page, KEY_VIEWPORTS);
    if (sink.external.length) {
      test.info().annotations.push({
        type: 'external-requests-failed',
        description: [...new Set(sink.external)].join(', '),
      });
    }
    const problems = report(sink, overflows, page_.rel);
    expect(problems.join('\n  '), `\n  ${problems.join('\n  ')}\n`).toBe('');
  });
}

/* ---- representatives, every declared breakpoint edge ---------------------
 * Both bugs that prompted this suite lived at widths nobody had looked at, so the
 * exhaustive sweep is the point of the layer -- just paid for once per profile
 * rather than once per page. */
for (const page_ of representatives) {
  test(`breakpoint sweep :: ${page_.rel} [${page_.profile}]`, async ({ page }) => {
    test.setTimeout(120_000);
    const sink = { consoleErrors: [], local: [], external: [] };
    watch(page, sink);

    await page.setViewportSize({ width: 1440, height: 900 });
    await open(page, page_.url);
    if (page_.profile === 'homepage') {
      await expect
        .poll(() => page.locator('#root > *').count(), { timeout: 20_000 })
        .toBeGreaterThan(0);
    }
    await page.waitForTimeout(300);

    const overflows = await measureOverflow(page, EDGES);
    expect(
      overflows,
      `\n  horizontal overflow at ${overflows.length} viewport(s):\n    ${overflows.join('\n    ')}\n`,
    ).toEqual([]);
  });
}

/* The two participant directories are rendered from CSVs fetched at runtime.
 * A CSV that fetches but parses to nothing is COMPLETELY silent: the table
 * renders "No participants match these filters.", no request fails and nothing
 * throws, so every other check here stays green while the page ships empty.
 * tests/static.mjs:181 guards that failure mode for the JSON snapshots; this is
 * the CSV equivalent. */
for (const [rel, atLeast] of [['pages/network-participants.html', 20], ['pages/ecosystem-participants.html', 20]]) {
  test(`${rel} renders rows from its CSV`, async ({ page }) => {
    await open(page, '/' + rel);
    await expect
      .poll(() => page.locator('#npTableBody tr').count(), { timeout: 15_000 })
      .toBeGreaterThanOrEqual(atLeast);
    await expect(page.locator('#npTableBody .np-empty')).toHaveCount(0);
  });
}
