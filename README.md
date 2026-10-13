# ONDC Website

Marketing site for ONDC (Open Network for Digital Commerce). Static HTML/CSS/JS — no build step,
no bundler, no framework install. Files are served as-is; deploy is a `git pull` on the server.

**What that means for you:** what you commit is byte-for-byte what ships. There is no compile step
to catch a typo, so the verification recipes below are the safety net.

---

## Quick start

```bash
npm install          # only pulls axios/cheerio (unused at runtime) — safe to skip
npm run dev          # npx serve -l 8000 .  → http://localhost:8000
```

Then open:

| Page | URL |
|---|---|
| Homepage | http://localhost:8000/ |
| Any other page | http://localhost:8000/pages/about-us |
| A JSON feed | http://localhost:8000/public/data/resources.json |

Any static server works, but **the repo root must be the server root** — every path in the HTML is
relative (`../src/styles/legal.css`), so serving `pages/` directly gives you an unstyled page.

`serve` reads from disk on every request, so edits are live on refresh — no restart needed. It does
send `ETag`/`Last-Modified`, so hard-refresh (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>) if a CSS
change doesn't show.

---

## Layout

```
index.html            Homepage — loads public/app.js, the prebuilt React 18.3.1 bundle
pages/*.html          44 standalone pages (20 carry a page-specific inline <style>)
src/components/*.jsx  Homepage components — source of public/app.js (`npm run build:home`)
src/scripts/          fx.js (reveal/scroll), hero-map.js, resources.js, signup.js
src/styles/           Shared CSS (see the table below)
public/data/          resources.json (rfp.html fetches its data live from a Google Sheet instead)
public/assets/data/   buyer-apps.json, network-participants-*.json, ecosystem-*.json
public/assets/        Images and logos, grouped by page/section
public/assets/newsletters/  Published PDFs
public/fonts/         Self-hosted woff2 (Inter + Space Grotesk; no Google Fonts requests)
deploy/nginx/         Server caching/compression config — applied by hand, see its README
docs/                 Design system export, copy decks, image prompts — reference, not shipped
.github/workflows/    deploy.yml
```

### Two rendering models coexist on purpose

**Homepage (`index.html`)** is React, compiled **once** into `public/app.js` by
`npm run build:home` ([`scripts/build-home.mjs`](scripts/build-home.mjs)), which concatenates the
components in this exact order and bundles React/ReactDOM in front of them:

```
Primitives → Hero → Navbar → HeroCarousel → MetricsBar → DPISection → SocialProof → App
```

There are no imports — each component attaches to the shared top-level scope, so **that order is
load-bearing** and `App.jsx` must stay last. Adding a component means adding it to `ORDER` in
`scripts/build-home.mjs`. **After any edit under `src/components/`, run `npm run build:home` and
commit `public/app.js`** — the browser never sees the `.jsx` files. (Until 2026-09 the page shipped
Babel Standalone and compiled them on every visit; that was the site's largest render blocker.)

**Every other page** is standalone HTML. Editing one cannot break another. The trade-off: navbar and
footer markup is duplicated across 43 files, so any global change is a scripted sweep, not one edit.

### Which stylesheet a page uses

| File | Loaded by | Purpose |
|---|---|---|
| `styles.css` + `hero.css` | `index.html` only | Homepage tokens and hero |
| `legal.css` | 24 pages | Tokens, navbar, footer, buttons, tables — the shared base for non-homepage pages |
| `resources.css` | 18 pages | Loaded **after** `legal.css`; consumes its tokens, adds no globals |
| `scale.css` | 44 pages | Responsive scale |
| `fx.css` + `fx.js` | 43 pages | Scroll reveal effects |
| `type-boost.css` | 19 pages | Typography overrides |
| `signup.js` | 42 pages | `ONDCSignup.open()` → opens https://portal.ondc.org/ in a new tab |

> **Gotcha:** design tokens are declared **twice** — `:root` in `styles.css` (homepage) and `:root`
> in `legal.css` (everything else). They mostly agree, but not entirely. Changing a brand colour
> means editing both.

---

## Common tasks

### Edit copy or layout on one page

Open `pages/<page>.html` and edit. Each page carries its own `<style>` block, so page-specific CSS
lives in the file. Only put a rule in `src/styles/legal.css` if more than one page needs it.

### Add a new page

1. Copy the closest existing page — it gives you a correct navbar, footer and `<head>`:
   ```bash
   cp pages/contact-us.html pages/my-new-page.html
   ```
2. Update `<title>`, the `@dsCard` comment on line 2, the hero, and the body content.
3. Mark the current nav item: `<a href="my-new-page.html" class="nav-link active">`.
4. Add the link to the footer and navbar **on every other page** — see the sweep recipe below.
5. Verify: `curl -sL -o /dev/null -w "%{http_code}\n" http://localhost:8000/pages/my-new-page`

### Change the navbar or footer everywhere

43 files carry the same block. Do not hand-edit them. Write a marker-anchored script that asserts
what it found, so a silent partial match can't slip through:

```js
// sweep.js — a throwaway; write it outside the repo, or delete it before committing
// (.gitignore only covers node_modules and .claude/worktrees).
const fs = require('fs'), path = require('path');
const files = [...fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => path.join('pages', f)), 'index.html'];
let n = 0;
for (const f of files) {
  // latin1 in/out so any existing mojibake round-trips byte-for-byte
  const before = fs.readFileSync(f).toString('latin1');
  const after = before.replace('<a href="old.html" class="nav-link">Old</a>',
                               '<a href="new.html" class="nav-link">New</a>');
  if (after !== before) { fs.writeFileSync(f, Buffer.from(after, 'latin1')); n++; }
}
console.log(`changed ${n} files`);   // sanity-check this against the count you expected
```

Then confirm zero stragglers before committing:

```bash
grep -rn "Old" --include=*.html . | grep -v node_modules | grep -v .claude
git diff --stat        # each page should be a 1–2 line diff, never a full-file rewrite
```

A full-file diff means you broke line endings — the repo is CRLF; read and write `latin1`, split and
join on `\n`, and `\r` stays attached to each line.

### Add or update a resource document

Edit `public/data/resources.json` — **never** the HTML. `src/scripts/resources.js` renders it.

```jsonc
// resources.json → { "categories": [ ... ] }, 19 categories
{
  "id": "governance",                       // matches <body data-res-page="governance">
  "title": "Governance and Policy",
  "page": "resources-governance.html",
  "icon": "shield", "blurb": "...", "parent": null, "hub": false,
  "sections": [{
    "title": "Board policies",
    "note": "optional",
    "items": [{ "title": "...", "type": "file-text", "href": "...", "note": "..." }]
  }]
}
```

The page opts into rendering via `data-res-*` attributes — the full contract is the comment block at
the top of [`src/scripts/resources.js`](src/scripts/resources.js). All JSON fields pass through
`esc()` before `innerHTML`, so copy may contain `&`, `<`, `>` safely.

### Update the RFP/RFQ table

There's no JSON file for this one — `pages/rfp.html` fetches a public Google Sheet directly in the
browser (via its `gviz/tq?tqx=out:json` endpoint). The spreadsheet ID lives in
[`src/scripts/sheets-config.js`](src/scripts/sheets-config.js) (`window.ONDCSheets.rfp`), not
hardcoded in the page — that file is the one place to look if the sheet ID ever needs to change, and
where a future page's sheet ID gets added if another content type moves to this same pattern. To
publish a content change, edit the sheet itself; the live page picks it up on next load, no deploy
needed.

The sheet is **long-format — one row per document**, not one row per RFP:

| Column | Meaning |
| --- | --- |
| `rfp_no` | RFP/RFQ number. Rows sharing an `rfp_no` are grouped into a single ledger entry. |
| `name` | RFP/RFQ title, shown once per entry. |
| `last_date` | Deadline, `dd.mm.yyyy`. Treated as end-of-day; determines the Open/Closed tab. |
| `doc_type` | Link label shown on the page, e.g. `RFP Document`, `Corrigendum 1`, `Pre-bid`. Free text — no fixed list to update in code. |
| `doc_url` | The document's URL. |
| `uploaded_at` | Informational only; not currently rendered. |

To add a document to an existing RFP, add a new row with the same `rfp_no` and a new `doc_type`.
Document link order on the page follows the sheet's row order.

The sheet must stay shared as **Anyone with the link → Viewer** — the fetch is anonymous, with no
API key. If the fetch fails for any reason (sheet made private, network issue, Google outage), the
ledger falls back to its existing "No records found" empty state; there is no local snapshot.

### Update network-participant or ecosystem tables

Replace the matching CSV in `public/assets/ondc-participants/` and commit it. There is no build
step -- `pages/network-participants.html` and `pages/ecosystem-participants.html` fetch and parse
these files in the browser via [`src/scripts/participant-csv.js`](src/scripts/participant-csv.js).

| File | Feeds | Ordering |
| --- | --- | --- |
| `Key_network_participants.csv` | Key Network Participants tab | **row order is the ranking** (order volume, last 3 months) -- do not sort it |
| `integrated_network_particpants.csv` | Integrated Network Participants tab | alphabetical, applied at render |
| `ecosystem_participants.csv` | Ecosystem Participants page | alphabetical, applied at render |

Three things about the format that are easy to get wrong:

- **Row 0 is the instruction banner, not the header.** The parser skips it; keep it there.
- **`Comments` is never published.** It holds internal notes, so the page renders every other
  column and drops that one. Every column heading on the page is the CSV heading verbatim.
- **`Brand Logo` is ignored.** Those cells are empty; logos are joined by brand name from
  `public/assets/data/np-logo-map.json`. After a CSV lands with new brands, refresh it:

```bash
node scripts/build-np-logo-map.js            # dry run -- prints the match rate per file
node scripts/build-np-logo-map.js --apply    # write public/assets/data/np-logo-map.json
```

A brand absent from the map renders an initials monogram and issues no request, so a stale map
costs a logo, never a 404. The nine legacy `public/assets/data/ecosystem-*.json` and
`network-participants-*.json` snapshots are no longer read by any page; they survive only as
donors for the logo join above.

### Update the Buyer App complaints directory

Edit `public/assets/data/buyer-apps.json` (143 entries). It feeds the searchable table on
`pages/complaint.html`.

```jsonc
{ "name": "DigiHaat", "org": "Nirmit Bharat",
  "logo": "https://...", "priority": "1",          // "1" = the 10K+ orders badge, sorted first
  "website": "https://nirmitbharat.org/", "websiteText": "nirmitbharat.org",
  "supportEmail": "...", "supportPhone": "...", "supportLink": "...", "groEmail": "..." }
```

Every field is optional except `name` and `org`. Each card expands to a labelled list -- Website
Link, Customer Support Email Id, Customer Support Link, Customer Support Phone Number and
Grievance Redressal Officer(GRO) Email. A field that is missing, or whose URL is not `http(s):`,
`mailto:` or `tel:`, is left out of the list entirely rather than shown empty. `websiteText` supplies
the text for the website row and falls back to `website`.

Validate before committing — a trailing comma silently blanks the whole directory:

```bash
node -e "const d=require('./public/assets/data/buyer-apps.json'); console.log(d.length, 'entries OK')"
```

### Update the complaint statistics

The snapshot is inline in `pages/complaint.html`: `GRIEVANCE_AS_OF`, `GRIEVANCE_STATS_BY_YEAR`,
`GRIEVANCE_STATS`, `GRIEVANCE_STATUS_NOTES`. Edit the arrays. If a real endpoint ever exists, swap
`renderStats()` for a `fetch()` — the array shape already mirrors the reference API's `count.json`.

### Publish a newsletter

1. Drop the PDF in `public/assets/newsletters/` using a lowercase-hyphenated name.
2. Update the two cards and the hero buttons in `pages/about-us.html`.
3. Sweep the footer link across all 44 pages **and** `src/components/SocialProof.jsx` — the homepage
   footer is React, so a `pages/*.html`-only sweep will miss it.

### Change design tokens

`:root` in `src/styles/legal.css` (all non-homepage pages) **and** `:root` in
`src/styles/styles.css` (homepage). Keep them in sync.

`legal.css` also defines `--measure` (the shared text column width) and `--max-w` (container width).

---

## Verify before you push

There is no CI test and no build, so check the rendered result, not just the diff.

**1. Every page still returns 200 and the change landed everywhere:**

```bash
npm run dev &
for f in index.html pages/*.html; do
  url="http://localhost:8000/${f%.html}"
  code=$(curl -sL -o /dev/null -w "%{http_code}" "$url")
  [ "$code" = "200" ] || echo "FAIL $f -> $code"
done
echo "checked $(ls pages/*.html | wc -l) pages + homepage"
```

**2. No horizontal overflow at mobile width** — the most common regression, and invisible in a
desktop browser. Headless Chrome, no dependencies to install:

```bash
# --screenshot needs an absolute path; a bare filename silently writes nowhere useful on Windows.
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=6000 \
  --window-size=1440,4000 --screenshot="$PWD/shot.png" \
  "http://localhost:8000/pages/complaint"
```

> Headless Chrome clamps the window to ~500px minimum, so `--window-size=390,...` gives you a
> **cropped 512px render, not a mobile layout** — the crop looks like an overflow bug that isn't
> there. For a true mobile viewport you need `Emulation.setDeviceMetricsOverride` over the DevTools
> protocol.

**3. Check what you're committing:**

```bash
git status                    # after any broad `git add`
git diff --stat               # sweeps should be 1–2 lines per page
```

---

## Deploy

Push to `main`. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) then:

1. Assumes `arn:aws:iam::996939280476:role/github-actions-assume-role-ondc-organization` via OIDC
   (region `ap-south-1`)
2. Runs an SSM `AWS-RunShellScript` on instance `i-0eeaf7958c6ccd684`
3. On the box: `git fetch origin main && git reset --hard origin/main` into `/var/www/app`, then
   `chown -R www-data:www-data`

**Consequences worth knowing:**

- `git reset --hard` — anything edited directly on the server is destroyed on the next deploy.
- No build artifact. A broken commit is a broken production site; there is no bundler to fail first.
- Only `main` deploys. Feature branches are safe to push.

`vercel.json` (`{"outputDirectory": "."}`) exists for Vercel preview deploys.

---

## Performance rules

The load-time pass of 2026-09-07 took the homepage from 13.7 MB to under 2 MB and the heaviest
category page from 34 MB to under 2 MB without changing a pixel. Three habits keep it that way:

### Adding images

Run `npm run optimize:images` after dropping any image into `public/assets/` or
`assets/category_pages_stock_images/`. It caps photos at 2× their largest display size (1400 px for
category stock cards, 2400 px elsewhere), re-encodes JPEGs at q82, turns PNG photographs into WebP
(rewriting every reference for you), and leaves logos, SVGs and anything under 100 KB alone. It is
idempotent — re-running it on optimised files is a no-op — so run it freely. `npm run test:perf`
enforces a per-page byte budget (homepage 2.5 MB, category pages 3 MB, others 1.5 MB).

### Changing how a page looks

`npm run test:visual` diffs full-page screenshots of 8 representative pages at 1440 px and 390 px
against `tests/e2e/visual.spec.js-snapshots/`. It exists so refactors and asset swaps can prove they
changed nothing. When a page is *deliberately* redesigned, re-record with
`npx playwright test tests/e2e/visual.spec.js --update-snapshots` and commit the new PNGs.

### Replacing an image in place

Once `deploy/nginx/` is applied, images are cached for a year **by file name**. Give a replacement
a new name and update the reference; overwriting the same name will not reach returning visitors.
CSS/JS revalidate daily and HTML every 5 minutes, so those may be edited in place.

## Notes and known rough edges

- `axios` and `cheerio` are in `package.json` but nothing at runtime imports them — leftovers from
  content scraping. Safe to remove if you also drop the scraping scripts.
- Several pages carry copy-pasted CSS blocks (carousel, cards) whose consuming markup has since been
  removed. Dead, harmless, and deliberately left duplicated so the 44 page shells stay identical.
- Files contain some mojibake in comments from an earlier encoding round-trip. Read and write
  `latin1` in any script that touches them, or you will corrupt it further.
