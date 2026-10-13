# D2C Retail — design and build specification

## Approved direction

The page is an independent visual world called **Open Network Editorial**, combining Beckn’s cinematic whitespace and network pathways with Networks for Humanity’s disciplined typography, framed arguments, and civic-system clarity. The approved composition is **Seller-to-Network Ribbon**: a seller begins the story at the left, while a continuous electric-blue route moves through products, buyer apps, logistics, economics, and growth support. It is a journey, not a collection of cards.

Approved references:

- `docs/d2c-design-screenshots/01-open-network-editorial-direction.png`
- `docs/d2c-design-screenshots/02-approved-seller-to-network-ribbon.png`

Seed key: `206845a4`.

## Product job

The primary audience is an Indian D2C brand or seller evaluating whether ONDC can create a lower-cost, more resilient route to customers. Within seconds they should understand that one connection can open access to multiple commerce apps, logistics providers, and growth support. The primary action is **List your brand**. The closing action is **Choose your role**.

## Page architecture

1. **Hero — the open route.** A quiet editorial header, a large two-line promise, seller/product imagery, two actions, and the continuous network ribbon. The first viewport must contain the full thesis and the start of the mechanism.
2. **Immediate journey fold.** A compact four-cell continuation of the hero: commerce apps, connected logistics, better profitability, and onboarding support. This preserves the approved comp’s first-read rhythm before the long-form evidence begins.
3. **Network indicators.** Six supplied data points shown as a horizontal ledger rather than metric cards. Their existing wording is preserved; source provenance must be verified before publication.
4. **Active across buyer apps and brands.** A typographic participant rail preserving the supplied names without borrowing the incumbent logo-strip composition.
5. **Structural reality.** A high-contrast ink chapter with the existing argument, documentary seller image, pull quote, and five challenges arranged along a fractured path.
6. **How the network opens up.** Four large editorial chapters connected by the same route: commerce apps, logistics, profitability, and onboarding support. All supplied descriptions and benefits remain intact.
7. **Role chooser.** A coral closing field with one decisive control: **Choose your role**. It reveals Sell, Shop, and Build / Enable. Build / Enable expands to buyer, seller, gateway, technology, logistics, and network-participation destinations.
8. **Footer.** Reinvented as a compact institutional index while preserving ONDC identity, legal links, documents, participant links, and sector navigation.

The entire “Built for every participant in the commerce ecosystem” section is intentionally removed.

## Visual system

- Canvas: warm near-white `#F9F9F6`.
- Ink: `#050605`.
- Network blue: `#0155FD`.
- Signal coral: `#FE7056`.
- Support cyan: `#8EE6F2`.
- Hairline: ink at 18% opacity.
- Display type: the variable-width grotesk **Archivo**, with **Bodoni Moda Italic** used sparingly for the human/editorial word in the hero. Body: **Manrope**. System fallbacks are used only while fonts load.
- Display headings are broad, tightly tracked, and capped at `clamp(3rem, 7vw, 6rem)`. Body copy remains within 65–72 characters.
- Corners are restrained: 14px for substantive surfaces, pills only for small controls.
- Photography is documentary and grounded: Indian founders, products, packing, and fulfilment. Images use derived soft-edge cutouts or simple rectangular apertures; no ornamental geometric masks.
- No gradients, glass effects, floating icon cards, decorative labels above headings, or generic section-number ornament.

## Layout details

The desktop grid uses 12 columns inside a 1440px maximum canvas, with fluid side padding between 24px and 72px. The hero uses an asymmetric 7/5 split. Section spacing ranges from 112px to 176px. Text groups stay tight while narrative chapters have generous separation.

The route is code-native SVG geometry because it is the page’s functional metaphor. Photography remains raster. On desktop the route travels horizontally and branches into the four outcomes. Below 820px it becomes a vertical spine, with each outcome attached in reading order. The route never competes with text contrast.

## Interaction and motion

The authored moment is the route drawing forward as the reader scrolls from the hero into the mechanism. It begins visible, then gains color, line length, junction pulses, and subtle aperture lift. Other entrances are limited to small clip and blur resolves. Reduced-motion users receive the fully resolved composition.

The role chooser is inline, not modal. Keyboard focus is clearly drawn in blue; Escape closes the open chooser; outside click closes it. The mobile navigation uses an accessible disclosure button. Buttons include hover, focus, active, and disabled/loading-ready styles.

## Responsive behavior

- 1180px+: full horizontal journey and multi-column editorial layouts.
- 820–1179px: reduced hero overlap, two-column ledgers, four mechanism chapters in a 2×2 field.
- Below 820px: vertical route, single-column reality/challenge flow, horizontally scrollable participant names, stacked role choices, and a compact navigation drawer.
- At 390px, headline copy must not exceed five lines and no content may overflow the viewport.

## Content and evidence policy

All existing D2C claims and copy are preserved except the explicitly removed participant section. The six numerical claims currently have no provenance in the repository. They may remain during development, but publishing should be blocked until each has a named source and date. No new customer, growth, pricing, or performance claim may be invented.

## Asset inventory

Newly authored assets only; incumbent D2C visual assets are not design references.

- Seller packing a D2C order — hero and reality chapter.
- Product cluster — hero route node.
- Multi-app commerce moment — route/mechanism.
- Connected parcel handoff — logistics chapter.
- Founder growth/onboarding moment — final mechanism chapter.
- ONDC identity mark is retained as product identity, not as a visual reference.

## Implementation plan

1. Build semantic markup in `pages/d2c-retail.html` with the design contract first in `<body>`.
2. Isolate the visual system in `src/styles/d2c-retail-v2.css`; do not inherit the incumbent D2C styles.
3. Implement route motion, navigation, ledgers, and role chooser in `src/scripts/d2c-retail-v2.js` while retaining `src/scripts/signup.js` for the seller flow.
4. Store fresh raster assets under `public/assets/d2c-retail-v2/` with embedded prompt provenance.
5. Verify at desktop and mobile widths, then run the Impeccable detector, finish review, and provenance scan.

## Implementation record

The isolated build ships in `pages/d2c-retail.html`, `src/styles/d2c-retail-v2.css`, and `src/scripts/d2c-retail-v2.js`. Ten newly authored raster assets live in `public/assets/d2c-retail-v2/`; five are documentary source images and five are alpha-matted ribbon cutouts. The final reference captures are `docs/d2c-design-screenshots/03-desktop-build.png` and `docs/d2c-design-screenshots/04-mobile-build.png`.

Final checks: responsive Playwright QA passed at 1440×1000 and 390×844; Impeccable static detection reports zero findings (with its HTML parser in degraded mode); asset provenance reports 22 rasters and zero missing prompts across generated assets and comps; the independent finish verdict is `ship` with no visible regressions.
