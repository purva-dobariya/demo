# CHANGES-PLAN — eight site changes in four conflict-free tasks

Standalone execution plan. Each task owns a **disjoint set of files** — never edit a file
outside your task's ownership list. That is what makes the final merges conflict-free.

Site facts an executor needs:
- Static site, no build step. `npm run dev` = `npx serve -l 8000 .`. Homepage is `index.html`
  (React UMD + Babel; components in `src/components/*.jsx`). Every other page in `pages/*.html`
  is self-contained HTML with its own inline `<style>`.
- Buyer-app logos are staged at `public/assets/buyer-apps/{shopping, mobility-travel, financial-services}/`
  (6 + 19 + 7 files). Reference from `pages/*.html` as `../public/assets/buyer-apps/...`.

## Global rules (apply inside every task's owned files)

### R1 — K/M/B number notation
Convert every displayed number that uses Indian denominations or comma-grouping ≥ 10,000:

| From | To |
|---|---|
| `2.5L+` | `250K+` |
| `~9L` | `~900K` |
| `9 lakh+` | `900K+` |
| `10 lakh+` | `1M+` |
| `1 lakh` / `₹1 lakh` | `100K` / `₹100K` |
| `5 lakh` | `500K` |
| `3.75 lakh` | `375K` |
| `3 lakh` | `300K` |
| `10 lakh` | `1M` |
| `192 crore` | `1.92B` |
| `375 crore` | `3.75B` |
| `₹375 Cr` | `₹3.75B` |
| `₹300 Cr+` | `₹3B+` |
| `₹116 Cr` | `₹1.16B` |
| `500 million` | `500M` |
| `98,000+` | `98K+` |
| `12,000+` | `12K+` |
| `50,000+` | `50K+` |
| `80,000+` | `80K+` |
| `300,000+` | `300K+` |
| `~15,000` | `~15K` |
| `58,000+` | `58K+` |
| `10,000+` | `10K+` |
| `75k+` | `75K+` (capitalize) |

Do NOT touch: percentages, counts under 10,000 (`1,500 FPOs`, `400+`, `₹100 SIPs`), or `500` orders/minute.

### R2 — Back to home lands on the hero slider
Every page has exactly one `<a href="../index.html" class="nav-back">`. Change the href to
`../index.html#site-top` (the slider wrapper id on the homepage). Touch nothing else in the anchor.

### R3 — Remove eyebrow labels
Delete the small blue uppercase label DIVs that sit directly above `<h2>` headings:
- In `pages/*.html`: every `<div class="lbl">…</div>` (also `class="lbl centered"`, `class="lbl on-dark centered"`).
  Delete the whole div line. Leave the `.lbl` CSS in the `<style>` block alone.
- In `pages/careers.html` only: the inline-styled equivalents —
  `<div style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; …"><span style="width: 22px; height: 1.5px; …"></span>TEXT</div>`
  (6 occurrences on the minified lines). Delete each whole div.
- In `src/components`: every `<EyebrowLabel>…</EyebrowLabel>` line (5 sites), then the now-unused
  `EyebrowLabel` function and its export in `Primitives.jsx`.

### R4 — Impact Retail → Amazing India (display text only)
The file stays `pages/impact-retail.html`; all asset paths keep `impact-retail` names. Change only
visible text. NOTE: in 16 pages the footer pill wraps across lines as `Impact\n          Retail` —
a single-line grep misses it; search for `Impact` near `impact-retail.html` hrefs.

### Logo-strip pattern (used by Task B and D)
Copy the marquee from `pages/d2c-retail.html` (search `<!-- LOGO TICKER -->`, a `<div class="logo-strip">`
block). Mechanics that must be preserved:
- The chip list inside `.ticker-inner` is duplicated exactly once (CSS animates `translateX(-50%)`;
  unequal halves break the loop).
- Every chip: `<div class="logo-chip"><img src="…" alt="…" onerror="this.closest('.logo-chip').remove()"></div>`.
- The strip sits between the `.latest` section's `</section>` and the next `<section>`; it is NOT
  inside a container.
- All category pages already have the `.logo-strip` / `.logo-chip` / `.ticker-*` CSS inlined — add
  markup only, never CSS.

---

## Task A — `components` (owns `src/components/*.jsx`, `src/styles/styles.css`, nothing else)

1. **HeroCarousel.jsx**
   - Pills (bottom of file, `.sector-pill` buttons calling `pause(i)`): replace the `<button>` with
     `<a className={same classes} href={s.href}>{s.pill}</a>` so a pill click navigates straight to
     the sector page (Insurance's href is already `pages/coming-soon.html#insurance`). Remove the
     now-unused `pause` and `scrollHeroIntoView` functions and the `flash` state if nothing else uses them.
   - Slide 3: `sector: "Impact Retail · Amazing India"` → `"Amazing India"`, `pill: "Impact Retail"` → `"Amazing India"`.
   - Apply R1 to slide stats: `75k+`→`75K+`, `98,000+`→`98K+`, `12,000+`→`12K+`, `50,000+`→`50K+`,
     `80,000+`→`80K+`, `300,000+`→`300K+`, `9 lakh+`→`900K+`, `~15,000`→`~15K`, `₹375 Cr`→`₹3.75B`,
     `avg below ₹1 lakh`→`avg below ₹100K`, `58,000+`→`58K+`.
2. **App.jsx**
   - Shoppers door (first `AUDIENCE_DOORS` entry): delete the `chips: [...]` line and its comment;
     change `cta: null` to `cta: { label: "Buy on ONDC", href: "pages/how-to-shop.html" }`.
   - CTA render (`{d.cta && (...)}`): support href CTAs — if `d.cta.href` render
     `<a className="btn btn-primary" style={{ marginTop: "auto", alignSelf: "flex-start" }} href={d.cta.href}>{d.cta.label}</a>`,
     else keep the existing `onSignUp(d.cta.role)` button.
   - `2.5L+` → `250K+`. Remove the `<EyebrowLabel>` line in `FindYourPlace`.
3. **MetricsBar.jsx** — `2.5L+` → `250K+`; remove the `<EyebrowLabel>` line.
4. **SocialProof.jsx**
   - Delete the entire Government Voice plate: the `{/* Government validation … */}` comment plus the
     `<div className="gov-voice">…</div>` block (quote, Piyush Goyal, ministry). Also update the file
     header comment that references the government plate. Keep `.net-wire` / `.net-grid` untouched.
   - `10,000+`→`10K+`, `3 lakh`→`300K`, `500 million`→`500M`. Remove both `<EyebrowLabel>` lines.
5. **DPISection.jsx** — remove the `<EyebrowLabel className="dpi-label">` line.
6. **Primitives.jsx** — delete the `EyebrowLabel` function and remove it from the `Object.assign(window, …)` export.
7. **styles.css** — delete the `.gov-voice`, `.gov-voice-media`, `.gov-voice-body` rules (and their comment).

## Task B — `category-pages` (owns EXACTLY these 10 files)
`pages/d2c-retail.html, digidukaan.html, impact-retail.html, food-and-beverages.html,
hyperlocal-logistics.html, public-transport.html, shared-mobility.html, tourism.html,
credit.html, investments.html`

Apply R1 + R2 + R3 + R4 to all ten, plus logo strips:

1. **d2c-retail.html** — in the existing LOGO TICKER: remove the `NAFED.png`, `India_Post.png`,
   `Ekgaon.jpg` chips (each appears twice — once per loop half; remove both). Add chips for
   `../public/assets/buyer-apps/shopping/Mystore.png`, `Snapdeal.png`, `Bajaj-Markets.png`
   (to both halves, keeping the halves identical). Add the `onerror` self-heal to every chip.
2. **digidukaan.html, impact-retail.html, food-and-beverages.html** — insert a NEW strip (pattern above)
   using all 6 `buyer-apps/shopping/` logos. Strip label: keep D2C's wording style, e.g.
   "Active across buyer apps on the network".
3. **hyperlocal-logistics.html, shared-mobility.html** — NEW strip from `buyer-apps/mobility-travel/`
   transit subset: Bharat-Taxi, Chalo, Chartr, Namma-Yatri, One-Delhi, OneTicket, Rapido, Tummoc,
   Uber, Yatri-Sathi. Label e.g. "Live across mobility apps".
   **public-transport.html** — it already renders a strip pointing at empty `logos_mobility/`;
   re-point its chips at the same transit subset above plus Delhi-Metro-Sarthi.
4. **tourism.html** — existing strip points at empty `logos_tourism/`; re-point at the travel subset:
   EaseMyTrip, ixigo, redBus, Highway-Delite, Paytm, magicpin (all in `buyer-apps/mobility-travel/`).
5. **credit.html** — NEW strip from all 7 `buyer-apps/financial-services/` logos.
   **investments.html** — TWO existing strips point at empty `logos_investments/`; re-point both at
   the 7 financial-services logos (they can share the same set).
6. R1 spots: `~9L` (shared-mobility), `10 lakh+` and `₹116 Cr` (investments), `₹300 Cr+` (credit).
7. R4 spots: impact-retail.html `<title>Impact Retail· ONDC Network</title>` →
   `<title>Amazing India · ONDC Network</title>`; its `@dsCard` comment name; the "How Impact Retail
   Works on ONDC" lbl is deleted by R3 — the sibling h2 stays; and the wrapped footer "Impact Retail"
   pills in the 9 owned pages that have them → "Amazing India".

## Task C — `other-pages` (owns every `pages/*.html` NOT listed in Task B, and NOT `how-to-shop.html`)
about-us, complaint, contact-us, careers, coming-soon, gateway, ecosystem-participants,
network-participants, buyer-network-participants, seller-network-participants,
technology-service-provider, rfp, all resources-*.html, resources.html, cookie-policy,
privacy-policy, terms-and-conditions.

1. R2 on every owned page (one `nav-back` each).
2. R3 on every owned page (~26 `.lbl` divs + careers.html's 6 inline ones).
3. R1 in about-us.html: `1 lakh`→`100K`, `5 lakh`→`500K`, `3.75 lakh`→`375K`,
   `192 crore`→`1.92B`, `375 crore`→`3.75B`, `10 lakh`→`1M` (timeline copy, ~lines 3573–3707).
4. R4: coming-soon.html's `<a class="pill" href="impact-retail.html">Impact Retail</a>` and the
   wrapped footer "Impact Retail" pills in the 7 owned pages that have them → "Amazing India".

## Task D — `how-to-shop` (creates ONE new file: `pages/how-to-shop.html`, edits nothing else)

Build the "Buy on ONDC" destination — an in-theme version of https://www.ondc.org/ondc-buyer-apps/:
1. Start from `pages/tourism.html` as the chrome template: copy its `<head>` boilerplate approach,
   navbar (8 links + nav-back + nav-cta) and footer, hero structure and fonts/colors. nav-back href
   is `../index.html#site-top`.
2. Sections:
   - Hero: headline about shopping on ONDC through any buyer app, short sub.
   - "How shopping works": 4 steps — pick a category → choose a buyer app → browse & order →
     get confirmation & delivery updates.
   - Buyer-app directory: three groups — **Shopping** (6 logos), **Mobility, Travel & Tourism**
     (19 logos), **Financial Services** (7 logos) — every file in
     `../public/assets/buyer-apps/<group>/`. Render as a static grid of white logo cards
     (reuse the `.logo-chip` card look: white bg, 1px border, radius 10, logo `object-fit: contain`),
     with the app name under each logo (derive from filename: strip extension, `-`/`_` → space).
     Every img gets the `onerror` chip-remove attribute. No filters or sorting.
   - Small closing CTA linking `../index.html#find-your-place`.
3. Keep it self-contained (inline `<style>` like every other page), light theme, same fonts.

## Merge choreography (run after all four tasks commit)

1. All four branches fork from the SAME `dev-feature` tip (after the asset-staging commit).
2. Merge into `dev-feature` in order **D → A → B → C**, checking `git merge-tree --write-tree dev-feature <branch>`
   before each. Ownership is disjoint, so every merge must auto-merge; a conflict means a task
   edited outside its ownership — fix in that branch before merging.
3. Post-merge checks:
   - `grep -rn "lakh\|crore\|Cr+\|₹375 Cr\|2.5L\|~9L" pages src --include=*.html --include=*.jsx` → no hits
   - `grep -c 'class="lbl' pages/*.html` → 0 everywhere
   - `grep -rn "Impact Retail" pages src` → 0 (multi-line wrapped pills included)
   - `grep -c 'nav-back' pages/*.html` unchanged; all hrefs carry `#site-top`
4. Delete the four worktrees and branches.
5. Verify on http://localhost:8000 (serve is already running): pills navigate, strips animate,
   how-to-shop renders 32 logos, no eyebrows, no Government Voice, K/M numbers.
