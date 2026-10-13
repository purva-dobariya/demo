# ONDC Website — UI/UX Audit & Corrections Pathway

**Date:** 2026-08-20 · **Branch:** `dev-feature` · **Scope:** `index.html`, `pages/*.html` (44), `src/`

This audit was run alongside a fix pass. Every finding is tagged **Fixed** (corrected in this
pass, verified in a headless browser at 1440px and 390px) or **Pathway** (documented with a
recommended route, not yet done). The Pathway items are the ones that need a decision or a
build-step change, not just an edit.

---

## Audit Health Score

| # | Dimension | Score | Key finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 3/4 | Primary CTA rendered invisible text (blue on blue); rail arrows had no end-state |
| 2 | Performance | 2/4 | Homepage transpiles 8 JSX files in the browser via Babel Standalone on every load |
| 3 | Theming | 3/4 | 22 separate `:root` blocks define `--blue`; only one of them wins |
| 4 | Responsive | 3/4 | Mobile nav links collapsed into squashed stacked columns |
| 5 | Implementation Integrity | 2/4 | 18 category pages are copy-paste forks; 4 independent slider implementations |
| **Total** | | **13/20** | **Acceptable — significant architectural work remaining** |

### Implementation Integrity verdict: **FAIL (improving)**

The visual system is coherent *by intent* but not *by construction*. One restrained editorial
system is clearly intended — and the shared `fx.css` finish layer proves the team knows how to
express it. But it is enforced by a stylesheet that happens to load last rather than by
structure. Underneath it sit 18 forked page copies, 43 duplicated navbars, 4 rail
implementations, and 3 stacked type-scale layers that partially cancel each other. The fixes
below removed the visible symptoms; the fork architecture is what keeps regenerating them.

---

## Executive summary

- **Issues found:** 24 (1 P0, 8 P1, 8 P2, 7 P3)
- **Fixed this pass:** 13 · **Pathway:** 9 · **Reviewed & kept as-is:** 2

**Top issues**

1. **[P1, Fixed]** The "Buy on ONDC" CTA had invisible text — `a, a:link` (specificity 0,1,1)
   outranked `.btn-primary` (0,1,0), so every link styled as a primary button rendered blue on
   blue. It was live on the homepage.
2. **[P1, Fixed]** The flagged section: subtext sat in a second grid column beside the heading
   rather than under it, and the rail arrows sat in a detached row above-left of the cards.
3. **[P1, Fixed]** Mobile navigation links wrapped into squashed multi-line columns instead of
   the intended single scrollable strip.
4. **[P0, Pathway]** The homepage ships React + Babel Standalone and compiles JSX in the
   browser on every visit.
5. **[P1, Pathway]** 18 category pages are independent forks carrying ~2,000-line inline
   stylesheets, so every site-wide change is an 18-file edit.

---

## Findings

### P0 — Blocking

**1. Homepage compiles JSX in the browser on every page load** · *Performance* · `index.html:28`
Babel Standalone (~3 MB) downloads and transpiles 8 JSX files client-side before anything
renders. Nothing appears until that finishes; the render is invisible to crawlers and slow on
low-end devices — the exact devices ONDC's audience uses.
*Partially fixed:* React and ReactDOM now load the **production** builds (with freshly computed
SRI hashes), removing dev-mode warnings and roughly halving that payload.
**Pathway:** add a prebuild step (`esbuild src/components/*.jsx --bundle --minify --outfile=public/app.js`),
drop the three unpkg script tags, and ship one `<script src="public/app.js">`. Output stays fully
static, so `vercel.json` is unchanged. ~30 minutes; removes the largest render blocker on the site.

### P1 — Major

**2. Primary CTA text invisible on link-styled buttons** · *Accessibility (WCAG 1.4.3)* · `src/styles/styles.css:11`
**Fixed.** `a, a:link { color: var(--blue) }` beat `.btn-primary { color:#fff }` on specificity.
The first door card's CTA ("Buy on ONDC") is an `<a>` (the others are `<button>`), so only it was
affected — contrast ratio was effectively 1:1. Variant colours are now restated at anchor
specificity next to the `.btn` rules.

**3. Section subtext detached from its heading** · *Implementation Integrity* · `src/styles/styles.css:1085`
**Fixed.** `.section-header` was overridden into a 2-column grid (`1.15fr / .85fr`,
`align-items:end`), pushing the supporting sentence into a far-right column baseline-aligned with
a 68px heading — it read as an unrelated caption. Now a single stacked column with an 18px gap
and a 56ch measure. Applied to the shared class, so Testimonials and News inherit the fix rather
than gaining a fourth header variant.

**4. Rail arrows detached from the rail they control** · *UX* · `src/components/App.jsx:94`
**Fixed.** Both arrows sat in a small left-aligned row *above* the cards, with nothing tying them
to the track. They now flank the rail, vertically centred on the card's photo band so they never
cover body copy, and are `disabled` at each end (the `progress` state already existed and was
unused for this). The News rail got the same treatment plus the `atStart` state it was missing.

**5. Mobile navigation wrapped into squashed columns** · *Responsive* · `src/styles/fx.css:452`
**Fixed.** `fx.css` intends a horizontally scrollable nav strip on ≤900px, but `.nav-link` had
neither `flex-shrink: 0` nor `white-space: nowrap`, so items shrank and wrapped their labels into
stacked columns with the last item clipped. Added both plus `flex-wrap: nowrap`. Affects every
page that loads `fx.css` (43 of 44).

**6. Headings synthetically bolded** · *Typography* · `src/styles/fx.css:161`
**Fixed.** 101 declarations ask for `font-weight: 800`, but Space Grotesk ships only 400/600/700,
so browsers smeared the 700 glyphs into a fake 800. The 700 face is now declared as a
`font-weight: 700 900` range, mapping those 101 uses onto real glyphs. One-line fix, zero page edits.

**7. Section heading scale inconsistent between sibling sections** · *Typography* · `src/styles/styles.css:413`
**Fixed.** `.dpi-h2` rendered at 36px/700 while its sibling section headings rendered at 68px/600
— a 1.9× gap and a weight mismatch in the same scroll, because an earlier "finish pass" updated
some headings and missed this one. Now shares the section-heading voice (weight 600,
`-.035em` tracking, 1.06 leading) at a ceiling one step lower, appropriate to its narrower dark-band header.

**8. Two different brand blues rendered on the same page** · *Theming* · 40 files
**Fixed.** The live token is `--blue: #1769a7` (from `fx.css`, which loads last), but 330
hard-coded literals of the superseded `#1C75BB` / `rgba(28,117,187,…)` remained. At low alpha the
difference was invisible; at the 20 occurrences using alpha `.9` it was plainly the wrong blue.
All 330 replaced by script across `pages/`, `src/styles/`, `src/components/`. The ONDC **logo**
blue (`#1C75BC`, `--ondc-blue`) was deliberately left alone — that is a brand asset colour, not a UI token.

**9. Category pages loaded fonts without metric-matched fallbacks** · *Performance/Typography* · `src/styles/hero.css:82`
**Fixed.** The Arial-adjusted `@font-face` fallback existed only in `hero.css`, which only
`index.html` loads, so all 43 content pages shifted layout when Space Grotesk swapped in. Moved to
`fx.css` and wired into the shared heading stack. Also removed the byte-identical duplicate Space
Grotesk declarations from `hero.css` and added the missing 700-weight preload.

### P2 — Minor

**10. 18 category pages are copy-paste forks** · *Implementation Integrity* · **Pathway**
Each carries a 1,800–3,200-line inline `<style>` and its own navbar and footer copy. The first
~470 lines are identical across all 18 (same rules at the same line numbers). Any global change
is an 18-file edit, which is why drift keeps reappearing.
**Pathway:** the `resources-*` group (17 pages, one shared 199-line template driven by
`resources.js`) already proves the pattern works here. Extract `<head>`, navbar, and footer into
partials with a ~30-line Node build script or 11ty. This is the prerequisite that turns every
future site-wide fix into a one-file edit — do it before the type-scale collapse below.

**11. Four independent rail implementations** · *Implementation Integrity* · **Partly fixed**
`.doors-track`, `.dpi-track`, `.news-rail`, and the content pages' `.htrack` are near-identical
(flex + `overflow-x:auto` + `scroll-snap-type: x mandatory`) but diverge on container edge,
gutters, card sizing, and arrow styling — and had three different arrow shapes (40px circle,
44px circle, 42px circle).
**Fixed:** one arrow spec now (46×46, 12px radius, shared hover and disabled states) across
`.doors-arrow`, `.dpi-arrow`, and `.arr-btn`.
**Pathway:** consolidate the four tracks into one rail pattern once the template extraction lands.

**12. Three stacked, mutually-cancelling type-scale layers** · *Typography* · **Pathway — deliberately deferred**
`scale.css` applies `body { zoom: .85 }`; `type-boost.css` then undoes *only* the zoom; each of the
18 category pages then re-declares every heading size with `!important` in a block titled
`FONT -2px REDUCTION` (35–60 `!important` per page). The composed result is the accepted current
rendering, so collapsing it is by definition a zero-visual-change refactor — with real regression
risk across 18 files.
**Pathway:** pilot on one page (`tourism.html`): compute effective sizes, delete all three layers,
screenshot-diff against the current render, then template the result across the forks.
Deferred here because it is high-risk, zero-visible-gain work that should ride on finding #10.

**12b. Reading-progress bar animates `width` on every scroll event** · *Performance* · **Pathway**
`pages/*.html` (42 files) run `bar.style.width = pct + '%'` inside a scroll listener, against CSS
that also declares `transition: width .1s linear` (`legal.css:233` plus 18 inline copies). Writing
a layout property every frame forces reflow on each scroll tick, on every content page.
**The correct pattern already exists in this repo:** `.doors-progress-bar` uses
`transform: scaleX()` with `transform-origin: left`, which is compositor-only.
**Pathway:** set the span to `width: 100%; transform: scaleX(0); transform-origin: left;
transition: transform .1s linear` and change the JS to `bar.style.transform = 'scaleX(' + p + ')'`.
Must be applied **atomically per file** — changing the CSS without the matching JS leaves the bar
permanently at zero. Held back from this pass for exactly that reason: 42 JS copies and 19 CSS
copies with a silent-breakage failure mode deserve their own verified pass.

**13. `careers.html` is orphaned from every shared mechanism** · *Implementation Integrity* · **Pathway**
No navbar, no footer, no `fx.css`, no `styles.css` — its own inline reset. Every "site-wide" claim
in this document excludes it, including all typography and token fixes above. It was verified as
unbroken but it receives no improvements.
**Pathway:** adopt it into the shared nav/footer/`fx.css` when templates land.

**14. Dead CSS shipped to every visitor** · *Performance* · **Fixed**
Removed the 55-line SECTOR GRID block (`.sectors`, `.sector-card`, 12 `.acc-*` accent classes),
`.infra-grid`, `.infra-icon`, and `.section-label` — all verified at zero markup references across
JSX and HTML. `.section-label` was fully styled and then killed by a later `display: none`.

### P3 — Polish

**15. 22 `:root` blocks define `--blue`** · *Theming* · **Pathway.** Four divergent palettes
(`styles.css`, `fx.css`, `legal.css`, `hero.css`) plus 18 inline copies. Only `fx.css` wins, by
load order. Now that the literals agree, these are inert — but they actively mislead anyone
reading a page's own stylesheet. Delete once templates land.

**16. Header logo differs between homepage and content pages** · *Consistency* · **Reported, not changed.**
52px on the React navbar (`Navbar.jsx:24`) vs 48px on content pages (`fx.css:257`). Deliberately
left alone: commit `9b0b4cf` intentionally enlarged the homepage logo from 40→52 very recently,
so unifying downward would undo current intent. **Pick one value** — this needs a design call, not a patch.

**17. `alt` text drift on the logo** · *Accessibility* · **Fixed.** `about-us.html` used
`"ONDC, Open Network for Digital Commerce"` where the other 42 pages use an em dash.

**18. Redundant literals over tokens** · *Theming* · **Fixed.** `.door-card` set
`border-radius: var(--radius-lg)` and then re-hardcoded the same `14px`, plus a raw `#dbe4e9`
duplicating `var(--border)`.

**20. Typeface choice — Inter + Space Grotesk** · *Typography* · **Reviewed, confirmed, kept.**
The design detector flags both faces as over-represented in contemporary (and AI-generated) UIs.
Raised with the site owner, who confirmed ONDC keeps its existing typefaces. The judgment holds:
Space Grotesk is already self-hosted as the display face across all 44 pages, and every typography
defect found in this audit was **usage** (findings 6, 7, 9) rather than pairing. Changing a display
face on a national-infrastructure site is a brand decision, not a cleanup. Recorded as a scoped
detector exception in `.impeccable/config.json` so it stops re-surfacing.

**21. Left accent rule on legal callout boxes** · *Visual* · **Left standing — judgment call.**
`.doc-note` (`legal.css:779`) uses `border-left: 3px solid var(--cyan)`. The detector reads a thick
one-sided border as a generated-UI tell; in a dense legal document this is also the standard
admonition/callout convention. Pre-existing design, not authored in this pass, and defensible either
way — flagged for a design decision rather than changed unilaterally.

**19. Inter font axes** · *Performance* · **Investigated, no action.** Trimming the italic
500/700 axes was considered and rejected: Google Fonts serves one variable file per `ital` value,
so trimming weights saves no requests, and italic 500 is genuinely used by `.reality-pull` on 17
pages. Dropping it would have introduced synthetic italics for zero gain.

---

## Patterns & systemic issues

1. **Cascade-by-accident is the design system.** `fx.css` loads last everywhere, so it wins — and
   the whole finish layer depends on that ordering rather than on structure. It works, but any
   change to load order silently restyles the site. This is the root cause behind findings 8 and 15.
2. **Layering instead of editing.** The recurring pattern is a new override layer added on top of
   the old one (the "finish pass" over the base sheet, `type-boost.css` over `scale.css` over the
   per-page `!important` blocks). Each layer is individually reasonable; stacked, they make the
   effective value of any property unpredictable — and they are why finding 7 was missed.
3. **Copy-paste as the distribution mechanism.** 43 navbar copies, 43 footer copies, 18 forked
   stylesheets. Every drift finding traces back to this.

## What's working well

- The `fx.css` finish layer is a genuinely good, restrained editorial system — it is the reason
  the site reads as coherent despite the structure underneath.
- `:focus-visible` styling is defined globally (`fx.css`) — better than most sites of this size.
- `prefers-reduced-motion` is handled thoughtfully: animations are disabled with intentional
  static end-states, not a blanket `0.01ms` kill.
- The `resources-*` group is a correct shared template — proof the pattern is achievable here.
- Rails use native scroll-snap rather than a JS carousel library.
- No horizontal overflow at 390px on any page family tested.

---

## Corrections pathway

Ordered so each step unlocks the next.

| # | Step | Effort | Unlocks |
|---|------|--------|---------|
| 1 | **Precompile JSX** — esbuild prebuild, drop Babel Standalone | ~30 min | Removes the P0 render blocker |
| 2 | **Extract shared partials** — `<head>`, navbar, footer out of the 18 forks | ~1 day | Makes every later step a one-file edit |
| 3 | **Collapse the type-scale layers** — pilot on `tourism.html`, then template | ~half day | Removes ~900 `!important`; heading sizes become predictable |
| 4 | **Delete the 3 dead `:root` palettes**, keep `fx.css` as the single source | ~1 hr | Stylesheets stop lying about the palette |
| 5 | **Consolidate the 4 rails** into one pattern | ~half day | One place to fix rail behaviour |
| 6 | **Adopt `careers.html`** into the shared system | ~1 hr | "Site-wide" finally means 44/44 |

Steps 1 and 2 are independent and can run in parallel. Steps 3–6 all assume 2 is done.

---

## Verification performed

Static server (`npx serve`) on `:8000`, headless Chrome via puppeteer-core, at 1440×1050 and
390×844:

- **Pages sampled (one per template family):** `index.html`, `pages/tourism.html` (category fork),
  `pages/resources-policies.html` (shared template), `pages/privacy-policy.html` (legal),
  `pages/careers.html` (orphan).
- **Results:** all render, **0 JS errors**, **0px horizontal overflow** on every page at both widths.
- **Functional:** rail arrows scroll one card per click, disable correctly at both ends, and clear
  all body copy; mobile nav is a single scrollable line; the "Buy on ONDC" label is legible.
- **Greps:** `#1C75BB` → 0 remaining · `rgba(28,117,187` → 0 remaining · `react.development` → 0 ·
  Space Grotesk `@font-face` declared in exactly one file.

**Re-run this audit after the pathway steps to see the score move.** Findings 10, 12, and 13 are
what hold the Implementation Integrity score at 2/4.
