# Production D2C section integration plan

## Outcome

Upgrade only the production D2C “One integration. Many storefronts. Better economics.” section into the approved horizontal Network Filmstrip format, while retaining the production page's ONDC visual language, page structure, navigation, footer, signup flow, and surrounding sections.

Implementation status: completed on 2026-08-21.

The production integration is now isolated to `#how-it-works` and its dedicated assets:

- `src/styles/d2c-filmstrip.css`
- `src/scripts/d2c-filmstrip.js`
- the scoped filmstrip markup in `pages/d2c-retail.html`

The archived experimental page remains unchanged in `d2c-test`.

## Source of truth

- Interaction and composition reference: `reference/approved-network-filmstrip.png`
- Working interaction reference: `index.html`, especially `.mechanism`
- Desktop and mobile archive checks: `screenshots/archive-desktop.png` and `screenshots/archive-mobile.png`
- Production baseline: the checked-in `HEAD` version of `pages/d2c-retail.html`
- Production shared finish layer: `src/styles/fx.css`, `src/styles/scale.css`, and `src/scripts/fx.js`
- Production photography: `public/assets/how-it-works/d2c-retail-01-commerce-apps.jpg` through `d2c-retail-04-onboarding.jpg`

## Baseline audit

The production page already has the right information architecture: four horizontally scrollable benefit cards, arrow controls, position dots, touch scrolling, snap points, and keyboard arrow support. Its primary weakness is presentation. Four isolated card tiles make the journey feel like a generic carousel rather than one connected network story. The content and production assets are usable, but the section lacks a strong visual route, an obvious next-panel cue, a chapter counter, and a composed relationship between copy and photography.

The production aesthetic is defined by:

- Space Grotesk headings over an Inter/system fallback stack
- ONDC navy `#061b2b`, blue `#1769a7`, cyan `#20b8ec`, off-white `#fcfdfd`, and pale blue-grey surfaces
- restrained 10–14px radii, crisp borders, light shadows, and editorial spacing
- a dark structural-reality section immediately before this section and a light “Why join” section immediately after it
- a desktop `body` zoom of `0.85` at 1024px and above, which must be included in geometry testing

## Recommended design direction: ONDC Connected Gallery

Keep the approved filmstrip's large split-panel format and connected route, but translate its black/coral experimental treatment into the production system.

- Use a pale `--cream-2` section so the transition out of the dark reality section remains clean and the following light section still feels continuous.
- Set the heading in a two-column editorial row: a compact uppercase label plus a 12–15ch title on the left, and the existing explanatory paragraph on the right.
- Make each chapter a wide split panel, not a small card: concise benefit copy on the left and production photography on the right. Desktop panels should occupy about 78–82% of the usable viewport, capped near the production `--max-w`; mobile panels should occupy about 88vw.
- Preserve a visible slice of the next chapter at every non-final position. The rail itself becomes the discovery cue; no wheel hijacking, vertical pinning, or forced scroll conversion.
- Run a thin ONDC-blue network line through the chapter panels, with a cyan node and two-digit chapter marker at each stop. This is the connective motif carried over from the approved comp.
- Use production blue/navy/cream surfaces across the four chapters with restrained variation. Avoid importing the prototype's coral block or black-heavy palette into production.
- Retain the four current production photographs and art-direct their crops. Use the archived generated PNGs only if a production image cannot support the required crop; do not mix image treatments casually.
- Use the shared production control language: 46–48px square-with-soft-radius arrows, cyan focus rings, a `01 / 04` counter, and a thin four-stop progress rail. Controls sit directly below the filmstrip and remain visually attached to it.

## Detailed section anatomy

1. **Section header**
   - Eyebrow: `HOW THE NETWORK WORKS`
   - Heading: `One integration. Many storefronts. Better economics.`
   - Body copy: keep the current production sentence unchanged unless copy review explicitly changes it.
   - Alignment: match the production `.container` left edge; allow the track to extend to the viewport edge after that anchor.

2. **Chapter rail**
   - Native horizontal scrolling with `scroll-snap-type: x mandatory` and `scroll-snap-stop: always`.
   - First-panel start aligns to the container; trailing padding exposes the next panel and gives the final panel a clean resting position.
   - Gap target: 16–20px desktop, 12px mobile.
   - Panel target: 720–780px tall desktop only if the actual content needs it; prefer roughly 520–600px after production zoom. Mobile uses intrinsic height with a minimum around 620px, not a fixed viewport-height panel.
   - Outer shape: production-compatible 14px radius and 1px border. The image may use one distinctive internal arc or corner cut as the filmstrip signature.

3. **Chapter content**
   - `01 — Access to Multiple Commerce Apps`
   - `02 — Connected Logistics Support`
   - `03 — Better Profitability`
   - `04 — Growth and Onboarding Support`
   - Keep the existing descriptions and three supporting bullets per chapter.
   - Keep line lengths near 34–42 characters for titles and 52–64 characters for body copy.
   - Use one simple inline SVG icon per chapter, inheriting current color; do not introduce a new icon library.

4. **Network route**
   - A 2px blue line spans every panel and visually continues across the gaps.
   - The active chapter node fills cyan; inactive nodes use the pale surface with a blue border.
   - Route decoration is `aria-hidden`; the semantic order remains heading, description, and list.
   - The line must not cross body copy at mobile widths; move it to the copy/image boundary in the stacked layout.

5. **Navigation and feedback**
   - Previous/next buttons move exactly one chapter.
   - Progress stops are real buttons with descriptive labels and `aria-current` on the active stop.
   - Counter uses tabular numerals and updates on manual scroll, touch swipe, drag, keyboard, or button navigation.
   - A visually hidden polite live region announces `Chapter n of 4: title`.
   - Disable the previous button at chapter one and next at chapter four.

## Responsive behavior

- **Desktop, 1280px and above:** split copy/image panels; one main chapter plus a deliberate 90–140px preview of the next; controls centered beneath the rail.
- **Tablet, 760–1279px:** retain split panels while the image gets slightly more width; panel width about 86vw; keep the next-panel preview.
- **Mobile, below 760px:** stack copy above image, keep the horizontal rail, use 88vw panels and 12vw trailing space, and keep touch targets at least 44px.
- **Narrow mobile, below 480px:** reduce heading scale and panel padding without reducing body text below a readable size. Do not collapse the chapters into a vertical list.
- Test immediately below and above 1024px because `scale.css` changes `body` zoom there.

## Implementation sequence

1. Restore or rebase `pages/d2c-retail.html` against its checked-in production baseline before editing. The working copy currently contains the full-page prototype; do not merge that page wholesale into production.
2. Replace only the existing `<section class="how-works" id="how-it-works">…</section>` markup. Preserve the section ID so the hero's “How it works” action continues to work.
3. Add section-scoped classes such as `.d2c-filmstrip__*`. Avoid changing shared `.htrack`, `.arr-btn`, `.dots`, or generic card selectors unless a shared-site change is explicitly intended.
4. Put the new section rules in a dedicated production stylesheet or in a clearly isolated D2C section block, loaded after `fx.css` so the intended local rules are deterministic. Remove the superseded `.how-works` override block rather than stacking more `!important` rules on it.
5. Adapt the proven controller in `d2c-test/script.js` for the production selectors. Keep native scrolling and requestAnimationFrame-throttled active-state calculation; retain Home/End and Left/Right keyboard support.
6. Confirm that `src/scripts/fx.js` does not re-parent or duplicate the new controls. The new progress group should not use the generic `.dots`/`.carousel-nav` hooks unless it intentionally opts into that behavior.
7. Keep the existing production JPEG asset paths and declared width/height or aspect-ratio placeholders to prevent layout shift.
8. Run focused interaction and responsive QA, then visually compare the section against both the production page and the approved archive.

## Acceptance criteria

- The production page outside `#how-it-works` is visually and functionally unchanged.
- The section reads as part of the current ONDC site: Space Grotesk hierarchy, blue/cyan accents, pale surfaces, restrained radii, and production photography.
- Four chapters are accessible by touch, mouse/trackpad horizontal scroll, buttons, progress stops, and keyboard.
- A portion of the next chapter is visible on desktop, tablet, and mobile except at the final chapter.
- The page has no horizontal document overflow at 1440, 1280, 1024, 768, 390, and 320px viewports.
- There is no vertical pinning, scroll trapping, wheel hijacking, or dependency on animation for understanding.
- Reduced-motion mode removes smooth scrolling and image movement while preserving navigation and state.
- Focus is visible, controls meet 44px targets, active state is announced, and decorative route elements are ignored by assistive technology.
- No 404s, console errors, duplicate IDs, or regressions to the signup modal and hero anchor.
- The section remains understandable with JavaScript disabled: the horizontal rail still scrolls natively and all chapter content remains present.

## Explicit non-goals for this pass

- Redesigning the rest of the production D2C page
- Replacing global navigation, footer, signup behavior, or page-wide tokens
- Importing the entire experimental `d2c-test` stylesheet or script into production
- Introducing pinned-scroll storytelling, autoplay, GSAP, or a carousel dependency
- Rewriting approved benefit copy without a separate content decision
