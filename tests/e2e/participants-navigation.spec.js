import { test, expect } from '@playwright/test';

// These checks exercise first-interaction timing. Keep them serial so several
// image-heavy ONDC pages do not compete for the same browser event loop and
// turn a one-frame assertion into a machine-load race.
test.describe.configure({ mode: 'serial' });

const expectedNavOrder = [
  'Home',
  'About',
  'Roles You Can Play',
  'How To Join',
  'Resources',
  'Complaints',
  'ONDC Participants',
  'RFPs/RFQs',
  'Contact',
  'Careers',
];

async function expectParticipantsChrome(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const nav = page.locator('.navbar .nav-links');
  const navOrder = await nav.locator(':scope > *').evaluateAll((items) => items.map((item) => {
    const label = item.matches('details') ? item.querySelector('summary') : item;
    return label.textContent.replace(/\s+/g, ' ').trim();
  }));
  expect(navOrder).toEqual(expectedNavOrder);

  const dropdown = nav.locator('.nav-drop');
  await expect(dropdown.locator('summary')).toHaveText(/ONDC Participants/);
  await expect(dropdown.locator('a')).toHaveText([
    'Network Participants',
    'Ecosystem Participants',
  ]);

  const help = page.locator('.footer-col-head', { hasText: 'Help & Support' }).locator('..');
  await expect(help.locator('a[href$="network-participants.html"]')).toHaveText('Network Participants');
  await expect(help.locator('a[href$="ecosystem-participants.html"]')).toHaveText('Ecosystem Participants');
}

test('participant destinations are exposed in the homepage chrome', async ({ page }) => {
  await expectParticipantsChrome(page, '/');
});

test('homepage dropdown is wired before its first use', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const dropdown = page.locator('.nav-drop');
  await expect(dropdown).toHaveAttribute('data-nav-drop-wired', '1');
  await dropdown.locator('summary').click();
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');
  await expect(dropdown.locator('.nav-drop-menu')).toBeVisible();
});

test('participant destinations are exposed in static-page chrome', async ({ page }) => {
  await expectParticipantsChrome(page, '/pages/about-us.html');
});

test('first desktop opening cannot paint before the menu is positioned', async ({ page }) => {
  await page.goto('/pages/complaint.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.nav-drop')).toHaveAttribute('data-nav-drop-wired', '1');

  const firstOpenFrame = await page.evaluate(() => new Promise((resolve) => {
    const dropdown = document.querySelector('.nav-drop');
    const summary = dropdown.querySelector('summary');
    const menu = dropdown.querySelector('.nav-drop-menu');
    const observer = new MutationObserver(() => {
      if (!dropdown.open) return;
      observer.disconnect();
      const style = getComputedStyle(menu);
      resolve({
        positioned: dropdown.hasAttribute('data-nav-drop-positioned'),
        visibility: style.visibility,
        opacity: style.opacity,
        pointerEvents: style.pointerEvents,
        inlineLeft: menu.style.left,
        inlineTop: menu.style.top,
      });
    });
    observer.observe(dropdown, { attributes: true, attributeFilter: ['open'] });
    summary.click();
  }));

  expect(firstOpenFrame).toEqual({
    positioned: false,
    visibility: 'hidden',
    opacity: '0',
    pointerEvents: 'none',
    inlineLeft: '',
    inlineTop: '',
  });

  const dropdown = page.locator('.nav-drop');
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');
  await expect(dropdown.locator('.nav-drop-menu')).toBeVisible();

  const alignment = await dropdown.evaluate((element) => {
    const trigger = element.querySelector('summary').getBoundingClientRect();
    const menu = element.querySelector('.nav-drop-menu').getBoundingClientRect();
    return {
      topDelta: Math.abs(menu.top - trigger.bottom - 6),
      leftDelta: Math.abs(menu.left - trigger.left),
    };
  });
  expect(alignment.topDelta).toBeLessThanOrEqual(1);
  expect(alignment.leftDelta).toBeLessThanOrEqual(1);

  await page.keyboard.press('Escape');
  await expect(dropdown).not.toHaveAttribute('data-nav-drop-positioned', '');
  await dropdown.locator('summary').click();
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');
  await expect(dropdown.locator('.nav-drop-menu')).toBeVisible();
});

test('static-page navbar keeps its primary CTA without a back-to-home control', async ({ page }) => {
  await page.goto('/pages/about-us.html', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.navbar .nav-back')).toHaveCount(0);
  await expect(page.locator('.navbar .nav-cta')).toBeVisible();
});

test('participant dropdown supports keyboard and outside-click dismissal', async ({ page }) => {
  await page.goto('/pages/complaint.html', { waitUntil: 'domcontentloaded' });

  const dropdown = page.locator('.nav-drop');
  const summary = dropdown.locator('summary');
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(dropdown).toHaveAttribute('open', '');

  await page.keyboard.press('Escape');
  await expect(dropdown).not.toHaveAttribute('open', '');

  await summary.click();
  await expect(dropdown).toHaveAttribute('open', '');
  await page.locator('main').click({ position: { x: 12, y: 12 } });
  await expect(dropdown).not.toHaveAttribute('open', '');
});

for (const path of ['/pages/network-participants.html', '/pages/ecosystem-participants.html']) {
  test(`${path} marks ONDC Participants active`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await expect(page.locator('.nav-drop > summary')).toHaveClass(/\bactive\b/);
  });
}

test('participant dropdown expands inside the mobile navigation drawer', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/pages/about-us.html', { waitUntil: 'domcontentloaded' });

  const burger = page.locator('.nav-burger');
  await expect(burger).toBeVisible();
  await burger.click();
  await page.locator('.nav-drop > summary').click();

  await expect(page.locator('.nav-drop-menu a')).toHaveText([
    'Network Participants',
    'Ecosystem Participants',
  ]);
  await expect(page.locator('.nav-drop-menu a').first()).toBeVisible();
});

test('crossing the mobile breakpoint clears stale dropdown positioning', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/pages/complaint.html', { waitUntil: 'domcontentloaded' });

  const dropdown = page.locator('.nav-drop');
  await dropdown.locator('summary').click();
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(dropdown).not.toHaveAttribute('open', '');
  await expect(dropdown).not.toHaveAttribute('data-nav-drop-positioned', '');
  await expect(page.locator('.nav-burger')).toBeVisible();

  await page.setViewportSize({ width: 1280, height: 800 });
  await dropdown.locator('summary').click();
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');
  await expect(dropdown.locator('.nav-drop-menu')).toBeVisible();
});

test('reduced motion reveals the positioned menu without a visible transition', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/pages/complaint.html', { waitUntil: 'domcontentloaded' });

  const dropdown = page.locator('.nav-drop');
  await dropdown.locator('summary').click();
  await expect(dropdown).toHaveAttribute('data-nav-drop-positioned', '');
  await expect(dropdown.locator('.nav-drop-menu')).toBeVisible();

  const durations = await dropdown.locator('.nav-drop-menu').evaluate((menu) =>
    getComputedStyle(menu).transitionDuration.split(',').map((value) => parseFloat(value)),
  );
  expect(Math.max(...durations)).toBeLessThanOrEqual(0.001);
});
