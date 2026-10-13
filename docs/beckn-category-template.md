# Beckn category page template

How to build (or rebuild) an ONDC **category** page in the Beckn canvas aesthetic.

> **Building any other kind of page?** Read
> [`beckn-aesthetic-guide.md`](./beckn-aesthetic-guide.md) instead. The six-beat
> order below is an argument for joining a network, not a general page layout —
> applying it to a directory, a library, a form or a policy page produces a page
> that is structurally dishonest about its own content and visually identical to
> its neighbours.

Every category page is the same six sections in the same order, wrapped in the
shared site chrome. Nothing is per-page except content: `beckn.css` and
`beckn.js` carry no sector-specific knowledge, so a new page is authored in
markup alone.

Reference implementation: `pages/d2c-retail.html`.

---

## 1. File skeleton

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><Sector>, ONDC</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../src/styles/category-chrome.css">
  <link rel="stylesheet" href="../src/styles/fx.css">
  <link rel="stylesheet" href="../src/styles/scale.css">
  <link rel="stylesheet" href="../src/styles/type-boost.css">
  <link rel="stylesheet" href="../src/styles/beckn.css">
  <!-- fx.js drives the shared navbar's "ONDC Participants" dropdown. -->
  <script src="../src/scripts/fx.js" defer></script>
  <script src="../src/scripts/beckn.js" defer></script>
</head>

<body>
  <div class="scroll-progress"><span id="progBar"></span></div>
  <nav class="navbar">…</nav>          <!-- copied verbatim from the old page -->

  <main class="bk">
    …the six sections…
  </main>

  <nav class="more-sectors">…</nav>    <!-- copied verbatim from the old page -->
  <footer>…</footer>                   <!-- identical on every category page -->

  <script>…scroll progress…</script>
  <script src="../src/scripts/signup.js"></script>
</body>
</html>
```

**Load order is load-bearing.** `category-chrome.css` must come *before* `fx.css`
— fx.css layers the floating pill navbar, the sector rail and the Space Grotesk
`@font-face` declarations on top, and has to win.

**Keep both `scale.css` and `type-boost.css`.** scale.css applies a site-wide
0.85 `zoom`; type-boost.css cancels it for category pages. Drop the second and
desktop type shrinks 15%.

**Copy the chrome from the page you are replacing,** not from another sector:
each page's navbar CTA label, its signup role key, and which pill its sector
rail omits are all page-specific.

---

## 2. Section order

| # | Section | Class | Was |
|---|---|---|---|
| 1 | Hero | `.bk-hero` or `.bk-hero-rail` | `.hero` |
| 2 | By the numbers | `.bk-panel.bk-numbers` | `.latest` stat carousel |
| 3 | Participants | `.bk-rail` *(logo sectors only)* | `.logo-strip` ticker |
| 4 | Reality | `.bk-panel.bk-reality` | `.reality` + key challenges |
| 5 | Mechanism | `.bk-mech` | `.how-works` numbered steps |
| 6 | Join | `.bk-panel.bk-join` | `.why` audience stack + `.cta-section` |

---

## 3. Hero — pick a variant

**The rule:** count the partner logos available for the sector.

| Logos | Hero | Participants section |
|---|---|---|
| 4 or more | `.bk-hero` — diagonal image stream | yes, `.bk-rail` with logo cards |
| 0 | `.bk-hero-rail` — copy left, two photo marquees right | no |

A sector with only 4–5 logos still uses the diagonal hero, but pads its rail
columns with `.bk-card-photo` cards (see §5) — a column of fewer than five cards
shows a visible gap at the marquee seam.

### 3a. `.bk-hero` — diagonal stream

Seven `.bk-hero-card` divs, each a `background-image`. The track is cloned by JS,
so author one copy only.

```html
<section class="bk-hero">
  <div class="bk-hero-band" aria-hidden="true">
    <div class="bk-hero-band-rot">
      <div class="bk-hero-track" data-bk-loop>
        <div class="bk-hero-card" style="background-image:url('../public/assets/how-it-works/<slug>-01-….jpg')"></div>
        <!-- ×7 total: mix how-it-works, audience, reality and challenges images -->
      </div>
    </div>
  </div>
  <div class="bk-hero-veil" aria-hidden="true"></div>

  <div class="bk-hero-body">
    <h1 data-bk-intro>Headline with an <em>emphasised phrase</em></h1>
    <p class="bk-hero-sub" data-bk-intro>Standfirst.</p>
  </div>

  <div class="bk-hero-actions" data-bk-intro>
    <button type="button" class="bk-btn bk-btn-solid" onclick="ONDCSignup.open('<role>')">Primary CTA</button>
    <a href="#bk-mech" class="bk-btn bk-btn-ghost">How it works</a>
  </div>

  <div class="bk-hero-keys" data-bk-intro>
    <a href="#bk-mech" class="bk-ul">Step one title</a><span class="bk-sep">•</span>
    <!-- one link per mechanism step -->
  </div>
</section>
```

### 3b. `.bk-hero-rail` — copy left, marquees right

For sectors with no partner logos. Same content elements, different frame; the
right column reuses the participant rail machinery with photo cards.

```html
<section class="bk-hero-rail">
  <div class="bk-hero-body">
    <h1 data-bk-intro>…</h1>
    <p class="bk-hero-sub" data-bk-intro>…</p>
    <div class="bk-hero-actions" data-bk-intro>…two buttons…</div>
    <div class="bk-hero-keys" data-bk-intro>…step links…</div>
  </div>

  <div class="bk-rail-cols" aria-hidden="true">
    <div class="bk-rail-up" data-bk-loop>
      <div class="bk-card bk-card-photo" style="height:300px;background-image:url('…')"></div>
      <!-- 5–6 cards, heights varied 270–320px -->
    </div>
    <div class="bk-rail-dn" data-bk-loop>
      <!-- 5–6 more -->
    </div>
  </div>
</section>
```

---

## 4. By the numbers

Six stats read cleanest (two full rows of three); nine also works — the border
logic is count-agnostic. Any count is safe, but multiples of three avoid a
ragged final row.

```html
<section class="bk-panel bk-numbers" id="bk-numbers" aria-labelledby="bk-numbers-h">
  <div class="bk-numbers-head bk-rv">
    <h2 id="bk-numbers-h"><Sector> on ONDC, <em>by the numbers</em></h2>
    <div class="bk-note"></div>
  </div>

  <div class="bk-statgrid bk-rv bk-rv-d1">
    <div class="bk-stat">
      <div class="bk-stat-fill" aria-hidden="true"></div>
      <div class="bk-stat-dots" aria-hidden="true"></div><!-- FIRST CELL ONLY -->
      <div class="bk-stat-num"><b><span data-bk-count="150">150</span>+</b><i> cities</i></div>
      <p class="bk-stat-desc">Supporting sentence.</p>
    </div>
    …
  </div>
</section>
```

- **Numeric stat:** wrap the integer in `<span data-bk-count="N">N</span>`. It
  counts up once, the first time the grid scrolls into view. Only whole numbers —
  `data-bk-count` cannot animate `5–10%` or `₹1.16B`.
- **Word or compound stat:** drop `data-bk-count` and use the small size —
  `<b class="bk-sm">Shared</b><i class="bk-gap">infrastructure</i>`. `bk-gap`
  widens the space before the label, which reads better after a word than after
  a numeral.
- `.bk-stat-dots` goes on the first cell only; it is the texture accent, not a
  per-cell decoration.

---

## 5. Participants rail *(logo sectors only)*

```html
<section class="bk-rail" aria-labelledby="bk-rail-h">
  <div>
    <h2 class="bk-h2 bk-rv" id="bk-rail-h">Active across <em>…</em></h2>
    <p class="bk-rail-copy bk-rv bk-rv-d1">Names the live participants.</p>
    <a class="bk-btn bk-btn-ghost bk-rv bk-rv-d2" href="network-participants.html"
       style="margin-top:34px">View all participants</a>
  </div>

  <div class="bk-rail-cols bk-rv bk-rv-d1" aria-hidden="true">
    <div class="bk-rail-up" data-bk-loop>
      <div class="bk-card" style="height:310px">
        <div class="bk-card-kind">Buyer app</div>
        <div class="bk-card-logo" style="background-image:url('…')"></div>
        <div>
          <div class="bk-card-name">Name</div>
          <div class="bk-card-line">One-line description</div>
        </div>
      </div>
      <!-- 5–6 cards per column, heights varied 285–310px -->
    </div>
    <div class="bk-rail-dn" data-bk-loop>…</div>
  </div>
</section>
```

The columns are `aria-hidden` — they are decorative, and the participant names
are already in the prose on the left.

**Thin logo sets:** interleave `.bk-card.bk-card-photo` cards (§3b) between the
logo cards until each column has at least five.

---

## 6. Reality

```html
<section class="bk-panel bk-reality" id="bk-reality" aria-labelledby="bk-reality-h">
  <div class="bk-reality-grid">
    <div class="bk-reality-lead bk-rv">
      <h2 class="bk-h2" id="bk-reality-h">The tension, <em>stated plainly.</em></h2>
      <p>The elaboration. Renders in network blue.</p>
    </div>

    <div class="bk-rv bk-rv-d1">
      <div class="bk-eyebrow">Five barriers keep the route fragmented</div>
      <div class="bk-barriers">
        <div class="bk-barrier">
          <div class="bk-barrier-n">01</div>
          <div class="bk-barrier-t">Barrier title</div>
        </div>
        …
      </div>
    </div>
  </div>
</section>
```

The left column is sticky on desktop. For a sector whose barriers split into
labelled groups (credit separates borrower barriers from lender barriers), stack
a second `.bk-eyebrow` + `.bk-barriers` pair in the right column and continue the
numbering.

---

## 7. Mechanism

The old how-it-works H2 is already a three-phrase line — split it across the
three beats.

```html
<section class="bk-mech" id="bk-mech" aria-label="How <sector> works on ONDC">
  <div class="bk-rv">
    <div class="bk-mech-beat" data-bk-scrub>One network.</div>
    <div class="bk-mech-beat" data-bk-scrub>Many fleets.</div>
    <div class="bk-mech-beat" data-bk-scrub>Better fulfilment.</div>
  </div>

  <div class="bk-spine">
    <div class="bk-spine-track" aria-hidden="true"></div>
    <div class="bk-spine-fill" id="bk-spine-fill" aria-hidden="true"></div>

    <div class="bk-step bk-rv">
      <div class="bk-step-node" aria-hidden="true"></div>
      <div class="bk-step-ghost" aria-hidden="true">01</div>
      <div class="bk-orb bk-orb-a" aria-hidden="true"></div><!-- steps 1 and 3 only -->
      <div class="bk-step-body">
        <div class="bk-step-title" data-bk-scrub>Plain <em>emphasis</em></div>
        <div class="bk-step-desc" data-bk-scrub>Point one
          <span class="bk-dot">·</span> point two
          <span class="bk-dot">·</span> point three
        </div>
      </div>
    </div>

    <div class="bk-step bk-rv">
      …
      <div class="bk-step-body bk-indent">…</div><!-- even steps indent -->
    </div>
  </div>
</section>
```

- `id="bk-mech"` and `id="bk-spine-fill"` are **required** — the script queries
  them by id.
- Alternate `.bk-indent` on even-numbered steps.
- `.bk-orb-a` on step 1, `.bk-orb-b` on step 3; leave the others bare or the
  section gets noisy. Orbs are hidden below 1000px.
- Any step count from 4 to 6 works; the spine measures itself.

---

## 8. Join

One tab per audience. All panels are authored in the markup — the script only
toggles `hidden`, so without JavaScript every panel simply shows.

```html
<section class="bk-panel bk-join" id="bk-join" aria-labelledby="bk-join-h">
  <div class="bk-rv">
    <h2 class="bk-h2" id="bk-join-h">Join the <em>…</em> network</h2>

    <div class="bk-tabs" role="tablist" aria-label="Choose your role">
      <button type="button" class="bk-tab" role="tab" aria-selected="true"  aria-controls="bk-role-0">First</button>
      <button type="button" class="bk-tab" role="tab" aria-selected="false" aria-controls="bk-role-1">Second</button>
    </div>

    <div class="bk-role" id="bk-role-0" role="tabpanel">
      <div class="bk-role-title">Panel heading</div>
      <p class="bk-role-desc">One or two sentences.</p>
      <button type="button" class="bk-btn bk-btn-solid" onclick="ONDCSignup.open('<role>')">Primary CTA</button>
    </div>

    <div class="bk-role" id="bk-role-1" role="tabpanel" hidden>
      …
      <a class="bk-btn bk-btn-solid" href="buyer-network-participants.html">Secondary CTA</a>
    </div>
  </div>
</section>
```

`aria-controls` must match the panel `id`. Mark exactly one tab
`aria-selected="true"` and leave that panel un-`hidden`; the script honours
whichever tab the markup selected.

Three or four tabs both work. CTA targets: the signup modal for "join" actions,
`buyer-network-participants.html` for shopper audiences,
`technology-service-provider.html` for builder audiences,
`network-participants.html` for "see who is live".

---

## 9. Attribute reference

| Hook | Where | Effect |
|---|---|---|
| `data-bk-loop` | marquee track | JS duplicates the children so the −50% CSS loop is seamless. Author one copy. |
| `data-bk-intro` | hero children | Staggered intro animation on load, in DOM order. |
| `data-bk-count="N"` | a `<span>` inside `.bk-stat-num` | Counts 0→N once when the grid reveals. Whole numbers only. |
| `data-bk-scrub` | text block inside `#bk-mech` | Words start grey and take their colour as the block scrolls through. |
| `.bk-rv` | any block | Fade-and-rise on reveal. `.bk-rv-d1` / `.bk-rv-d2` stagger it. |
| `id="bk-mech"` | mechanism section | Required — spine and scrub are scoped to it. |
| `id="bk-spine-fill"` | the fill line | Required — the descending blue line. |
| `id="progBar"` | in `.scroll-progress` | Read by the inline scroll-progress script. |

All motion is suppressed under `prefers-reduced-motion: reduce`; content stays
fully visible.

---

## 10. Asset conventions

```
public/assets/hero/<slug>.jpg                     one, sector wide
public/assets/reality/<slug>.jpg                  one
public/assets/challenges/<slug>.jpg               one
public/assets/how-it-works/<slug>-0N-<name>.jpg   4–6
public/assets/audience/<slug>-<audience>.jpg      3–4
```

**Watch the hero filename drift** — three sectors do not follow the slug:

| Page | `hero/` filename |
|---|---|
| d2c-retail | `d2c-brands.jpg` |
| food-and-beverages | `food-beverages.jpg` |
| hyperlocal-logistics | `logistics.jpg` |

Every other directory uses the full page slug. Check the file exists before
referencing it; a 404 leaves a flat grey card in the marquee.

Logo directories:

| Sectors | Path |
|---|---|
| d2c-retail | `public/assets/logos_d2c/` |
| logistics, public transport, shared mobility, tourism | `public/assets/buyer-apps/mobility-travel/` |
| credit, investments | `public/assets/buyer-apps/financial-services/` |
| impact retail | `public/assets/logos/essentials/` |

Filenames with spaces need URL encoding (`Digihaat%20logo.jpeg`).

---

## 11. Tokens

Set in `.bk`; use the variables rather than the literals.

| Token | Value | Use |
|---|---|---|
| `--bk-ink` | `#1b1b1b` | body text, solid buttons |
| `--bk-ink-deep` | `#191919` | headlines |
| `--bk-blue` | `#2151F5` | accent, links, active spine |
| `--bk-canvas` | `#f7f8f8` | page ground (dotted) |
| `--bk-muted` | `#55595e` | secondary copy |
| `--bk-line` | `#e6e7e9` | rules and grid borders |
| `--bk-ease` | `cubic-bezier(.2,0,.2,1)` | short UI transitions |
| `--bk-ease-out` | `cubic-bezier(.16,1,.3,1)` | entrances and reveals |

Radii: 16px cards, 22px hero cards, 28px panels, 999px pills.
Type: Space Grotesk 400/600/700, self-hosted via `fx.css`. Weight 500 falls back
to 400 by design — no fourth weight is fetched.

**No overshoot easing.** Entrances decelerate; they do not bounce past their
resting position.

---

## 12. Per-page checklist

- [ ] Head links in order: category-chrome → fx → scale → type-boost → beckn
- [ ] `fx.js` and `beckn.js` deferred; `signup.js` last
- [ ] Navbar, sector rail and footer copied from the page being replaced
- [ ] Sector rail omits this page's own pill
- [ ] Hero variant matches the logo rule (§3)
- [ ] Every referenced image exists — check the Network panel for 404s
- [ ] `data-bk-count` only on whole numbers
- [ ] `.bk-stat-dots` on the first cell only
- [ ] Marquee columns hold at least five cards
- [ ] `id="bk-mech"` and `id="bk-spine-fill"` present
- [ ] `.bk-indent` alternates; orbs on steps 1 and 3
- [ ] One tab `aria-selected="true"`, its panel not `hidden`, `aria-controls` matched
- [ ] Renders at 1280 / 1000 / 700 / 375px with no horizontal scroll
- [ ] Reduced-motion: everything visible, nothing moving
