# Plan — Replicate resources.ondc.org inside the ONDC site theme

## Context

`resources.ondc.org` is ONDC's knowledge base, hosted on a third-party HelpDocs platform. It carries the network's real reference material — network policy, advisories, compliance handbook, brand assets, developer guides, investor filings, domain resources — but it lives on a separate domain with a dated, off-brand UI (Bootstrap + jQuery tree sidebar, no search, no responsive care).

Our site currently has a **"Resources" nav link on all 25 pages that points at `index.html#stories`** — a homepage anchor, not a destination. `src/components/SocialProof.jsx` even carries a comment noting its story/newsroom links have no live targets yet. The Resources destination was deliberately deferred; this plan builds it.

Outcome: every page of resources.ondc.org reproduced 1:1 as a page on our site, in our theme, with a materially better information layer than the original — persistent section tree, breadcrumbs, sticky TOC, and a global search the original does not have.

**Decisions already made (user-confirmed):** 1:1 page replication · documents link to their live URLs (no PDFs copied into the repo) · document lists are JSON-driven · content is fully scraped from the live site.

---

## Architecture

**Shell = the "clean family" page pattern**, copied from `pages/rfp.html` (verified at `pages/rfp.html:1-60`): Inter from Google Fonts, `../src/styles/legal.css` + `fx.css` + `scale.css`, `.scroll-progress` div, copy-pasted navbar + footer, inline progress/reveal script, `../src/scripts/signup.js` at the end. No build step exists and none is added — `npx serve -l 8000 .`.

**All content comes from one JSON file.** `public/data/resources.json` holds the section tree and every document/link. `src/scripts/resources.js` renders the sidebar tree, breadcrumbs, hub cards, document lists and search from it. Consequence: each of the 17 section pages is a ~130-line shell whose only unique parts are the hero copy and a `data-category` attribute. Prose bodies (policy intros, financial-services explainers) stay as hardcoded HTML inside the page, using the existing `.doc-body` template from `pages/privacy-policy.html`.

Rejected: hardcoding document lists (300+ links across 17 pages, unmaintainable, no global search); per-section JSON files (one file is small enough and search needs it whole); a single SPA with client-side routing (loses per-page URLs and the 1:1 mapping the user asked for).

**Reuse, do not rewrite** — from `src/styles/legal.css`: tokens (`--blue #1C75BB`, `--cyan #00AEEF`, `--blue-tint #E5F0FF`, `--cream-2 #F5F7FA`, `--border #E5E7EB`, `--ink #1A1A2E`, `--radius 10px`, `--radius-lg 16px`, `--max-w 1216px`), `.container`, `.lbl`, `.btn-primary|light|ghost|outline|quiet`, `.reveal` + `.d1-.d4`, `.hero.hero-compact` + `.hero-tag`/`.hero-h1`/`.hero-sub`, `.doc-grid`/`.doc-toc`/`.doc-body`/`.doc-note`, `.rfp-search`/`.rfp-empty`, `.cta-section`, navbar/footer classes. From `pages/rfp.html:267+`: the fetch → `esc()` → string-template → empty-state → `.catch` rendering pattern, and the `textContent.includes(q)` client-side filter.

---

## New files

### Pages — 18, mapping 1:1 to the original

| Original URL | New file | Notes |
|---|---|---|
| `/home` | `pages/resources.html` | Hub: hero, global search, 13 category cards |
| `/governance-and-policies` | `pages/resources-governance.html` | Parent; links its 6 children |
| `/ondc-network-policy` | `pages/resources-network-policy.html` | |
| `/advisories1` | `pages/resources-advisories.html` | Dated list, newest first |
| `/compliance-handbook` | `pages/resources-compliance-handbook.html` | |
| `/guidance` | `pages/resources-guidance.html` | Parent of Guidance on Tax |
| `/guidanceontax` | `pages/resources-guidance-tax.html` | |
| `/disclosures` | `pages/resources-disclosures.html` | |
| `/publications` | `pages/resources-publications.html` | |
| `/marketing-and-communication-resources` | `pages/resources-marketing.html` | Logos (ZIP), brand PDFs, flyers ×11 langs, handbooks ×12 langs |
| `/tech-resources` | `pages/resources-tech.html` | Dev guide + white-label buyer/seller/logistics apps |
| `/ondc-academy` | `pages/resources-academy.html` | Video cards (YouTube), ondc.academy links |
| `/financial-services` | `pages/resources-financial-services.html` | Largest: credit/insurance/investments sub-groups |
| `/investor-corner` | `pages/resources-investor-corner.html` | AGM/EGM, newsletters, returns, shareholding |
| `/mobility` | `pages/resources-mobility.html` | |
| `/services` | `pages/resources-services.html` | |
| `/network-participant-agreement` | `pages/resources-np-agreement.html` | |
| `/ondc-policies` | `pages/resources-policies.html` | |

Hub cards also link out to **DigiReady** and **ONDC Web Portal** (external, as on the original) — cards, not pages.

### Supporting files

- `src/styles/resources.css` — all new component CSS, linked **after** `legal.css` on the 18 pages. Nothing inlined per page (the 19 "heavy family" pages each carry ~2000 lines of duplicated inline CSS; that debt is not repeated here).
- `src/scripts/resources.js` — single script: fetch + `esc()` + `renderSidebar()` + `renderBreadcrumbs()` + `renderHub()` + `renderDocLists()` + `initSearch()`. Reads `data-*` attributes off the page to know what to render.
- `public/data/resources.json` — the whole content tree.
- `scripts/scrape-resources.mjs` (dev-only, not shipped) — scraper that produces `resources.json`. `axios` + `cheerio` are already in `package.json` for exactly this.

---

## Data schema — `public/data/resources.json`

```json
{
  "categories": [
    {
      "id": "marketing",
      "title": "Marketing Resources",
      "page": "resources-marketing.html",
      "source": "/marketing-and-communication-resources",
      "icon": "megaphone",
      "blurb": "Logos, brand guidelines and onboarding collateral.",
      "parent": null,
      "sections": [
        {
          "id": "flyers",
          "title": "Seller Onboarding Flyers",
          "note": "Available in 11 languages",
          "items": [
            {
              "title": "Seller Onboarding Flyer",
              "type": "pdf",
              "href": "https://<live-cloudfront-url>",
              "lang": "Hindi",
              "note": "",
              "updated": "2024-02"
            }
          ]
        }
      ]
    }
  ]
}
```

- `type`: `pdf | zip | link | video | page` → drives the row icon and chip.
- `parent`: the 6 governance children carry `"parent": "governance"`; drives the sidebar tree and breadcrumbs.
- `type: "page"` items make prose articles searchable (`{"title":"Guidance on Tax","type":"page","href":"resources-guidance-tax.html"}`).
- Search index = flatten of all items + category titles/blurbs, built at load. No second index file.
- Every field is passed through `esc()` before `innerHTML`.

---

## Components (in `resources.css` / `resources.js`)

**Section tree sidebar** `.res-nav` — the original's key navigation, rebuilt: sticky column (240px) on ≥1024px, collapses into a `<details>` disclosure above content on mobile. Parents expand to show children; current page gets `aria-current="page"` + `--blue` left rule. Rendered from JSON, so it is identical on all 17 section pages and updates in one place.

**Resource card (hub)** `.res-grid` / `.res-card` — CSS grid `repeat(auto-fill, minmax(280px,1fr))`, gap 20px. 44px icon tile (`--blue-tint` fill, inline stroke SVG in `--blue`), title 600 `--ink`, 2-line blurb, item count in `.lbl`, arrow that translates 4px on hover. Border `--border`, `--radius-lg`; hover lifts 2px + `--shadow-md` + border `--blue`; `:focus-visible` ring `--cyan`.

**Doc row** `.res-doclist` / `.res-row` — section `h2` with `.lbl` eyebrow + optional note, then rows: type icon, title, chips (`.res-chip` for language / type / updated), trailing download-or-external SVG. Row hover `--cream-2`. All external `target="_blank" rel="noopener"`.

**Global search (hub)** `.res-search` — hero-scale input styled on `.rfp-search`, plus `Ctrl/⌘+K` focus shortcut. Debounced 150ms, substring match over title + language + section + category, renders top 30 results as rows with a category chip. Empty state reuses `.rfp-empty`. **The original has no search at all** — this is the single biggest UX gain.

**Per-page filter** — same input, hides non-matching `.res-row`s and any section left empty. Same logic as `rfp.html`'s filter, factored into `resources.js`.

**Breadcrumbs** `.crumbs` — under the navbar: `Resources / Governance and Policy / Advisories`. Built from `parent`.

**Sticky TOC** — reuse `.doc-grid` + `.doc-toc` unchanged on any page with 3+ sections.

**Video card** `.res-video` (Academy) — `https://img.youtube.com/vi/<id>/hqdefault.jpg` thumbnail, play overlay, title, language chip; reuses `.res-grid`.

---

## Page layout spec

Every page: `rfp.html` boilerplate → hero → breadcrumbs → `.res-shell` (sidebar + main) → CTA section → footer. Nav "Resources" link carries `active`.

- **`resources.html` (hub)** — no sidebar. Hero: tag "Resources", h1 `Deep dive into the <span>ONDC Network</span> and Protocol`, sub "Discover all that you need to understand the whats, whys and hows of the open network." Then global search, then `.res-grid` of 13 cards with `.reveal d1-d4` stagger, then CTA.
- **Governance parent** — prose intro + a child-card grid for its 6 children (matches the original's 8-block layout), plus any direct documents.
- **Document-list pages** (advisories, disclosures, investor-corner, marketing, publications, mobility, services, policies, NP agreement) — hero → breadcrumbs → sidebar + [filter input, TOC if 3+ sections, doc lists]. Investor Corner gets a `.doc-note`: "Some documents are password-protected; shareholders receive credentials by email."
- **Prose-heavy pages** (network-policy, compliance-handbook, guidance, guidance-tax) — `.doc-body` article text with sticky `.doc-toc`, doc list appended below.
- **`resources-tech.html`** — per-app blocks (Buyer / Seller / Logistics): staging URL, preprod URL, GitHub repo, user manual as typed rows.
- **`resources-financial-services.html`** — TOC: Getting Started / NP Agreement e-sign / Credit / Insurance / Investments / Support. Credit products (gold, personal, GST invoice, purchase finance, working capital) as `h3` sub-groups with BRD + user flow + API spec rows. Prose cross-links our existing `credit.html`, `insurance.html`, `investments.html`.
- **`resources-academy.html`** — intro + `.res-video` grid (English/Hindi/Kannada) + `.btn-outline` to ondc.academy.

---

## Content scrape (Phase 2 — the bulk of the work)

The 18 top-level slugs are confirmed. Two gotchas found during research:

1. **`sitemap.xml` is broken** (returns one malformed URL) — useless for enumeration.
2. **Some child/article content loads via XHR, not in the initial HTML** (`/publications` and `/guidance` children are injected by jQuery). Nav links and most topic pages *are* server-rendered.

Enumeration strategy: crawl the 18 known slugs with `axios` + `cheerio`, and cross-check completeness against the site's own search API — `GET /search/crawl_search/?keyword=<term>` with `X-Requested-With: XMLHttpRequest` returns JSON containing article URLs (verified: `keyword=policy` → 14 results). Sweep a term list, dedupe URLs, and flag any URL not already covered. For the two XHR-loaded pages, fall back to the Chrome MCP browser tools to read the rendered DOM.

Per document capture: title, live `href` (keep the CloudFront/S3 URL exactly as-is), type, language, section grouping and order (preserve the original's grouping), and any date. Do **not** download files.

---

## Nav / footer rewiring

1. **25 files** (`index.html` + 24 `pages/*.html`): change the Resources nav link `href="../index.html#stories"` → `href="resources.html"` (root page: `pages/resources.html`). Mechanical, one line per file — see `pages/rfp.html:36` for the exact line.
2. **`src/components/Navbar.jsx`**: `Resources` href `#stories` → `pages/resources.html`.
3. **Footer, all 25 + 18 new files**: add `<a class="footer-link" href="resources.html">Resources</a>` to the *Help & Support* column.
4. **`src/components/SocialProof.jsx`**: point the deliberately-deferred story/newsroom links at the relevant new pages (publications, academy).

---

## Phases

1. **Foundations** — `resources.css`, `resources.js`, `resources.json` stubbed with 2 categories, and `pages/resources.html`. Verify hub renders, search filters, sidebar builds.
2. **Scrape** — `scripts/scrape-resources.mjs`, run per category so pages can ship incrementally. Populate `resources.json` fully.
3. **Section pages** — one template, 17 copies. Order by content weight: marketing → investor-corner → financial-services → governance (+6 children) → tech → publications → academy → mobility → services → np-agreement → policies.
4. **Wiring** — nav/footer pass across 25 files + `Navbar.jsx` + `SocialProof.jsx`.
5. **Polish** — reveal stagger, `:focus-visible` states, mobile pass at 375px, `<title>` + meta descriptions per page.

---

## Verification

- `npx serve -l 8000 .`, open `/pages/resources.html`: 13 cards render from JSON with correct item counts; global search returns cross-category hits; `Ctrl+K` focuses it; tab order and focus rings work.
- Each of the 17 section pages: hero, breadcrumbs, sidebar (current item marked), TOC and doc lists render; filter hides/shows rows; empty state appears for a nonsense query; browser console clean.
- `node -e "JSON.parse(require('fs').readFileSync('public/data/resources.json'))"` parses; spot-check that no field contains raw HTML.
- URL health: script over every `href` in `resources.json` asserting HTTP 200/302 — must pass for at least the 30 most prominent documents before ship.
- Cross-check against the live site: for 5 sampled sections, the document count and order match the original.
- `grep -r 'index.html#stories' pages/ index.html src/` returns nothing; `grep -L resources.css pages/resources*.html` returns nothing.
- Mobile 375px: hub cards single-column, sidebar collapses to a disclosure, doc rows wrap, search usable. Navbar/footer render identically to `pages/contact-us.html`.

---

## Scope note

18 pages + 3 supporting files is a large but mechanical build — the shell is one template and the content is one JSON file, so the per-page cost after Phase 1 is small. The genuine effort concentrates in **Phase 2 (scrape)**, where accuracy of ~300 document titles and URLs decides whether the replication is faithful.
