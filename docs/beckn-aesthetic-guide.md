# Extending the Beckn aesthetic to a new page

Instructions for an agent asked to redesign an ONDC page so that it belongs to
the same visual world as the ten category pages — **without** reproducing their
structure.

The category pages share a section order because they tell the same story ten
times over. Almost no other page in this repo tells that story. If you reach for
`docs/beckn-category-template.md` and fill it in, you will produce a page that is
structurally dishonest about its own content and visually indistinguishable from
its neighbours. That is the failure mode this document exists to prevent.

Read `docs/beckn-category-template.md` when you are building a *category* page.
Read this one for anything else.

---

## 1. The idea you have to hold

> **The aesthetic lives in the rules, not in the arrangement.**

Two pages can share zero section types and still obviously belong to the same
family, provided they obey the same typographic, chromatic and motion rules.
Conversely, two pages with identical section order and different content read as
one page photocopied — which is worse than an inconsistent site, because it tells
the reader the page was not thought about.

So your job splits cleanly in two:

| | |
|---|---|
| **Invariants** — copy these exactly | They are what makes the page recognisably ONDC |
| **Variables** — these must differ | They are what makes the page worth reading |

Get the invariants wrong and the page looks like a different site. Get the
variables wrong and the page looks like a duplicate. You need both.

---

## 2. Ground yourself first

Before designing anything, in this order:

1. **`DESIGN.md`** — the authoritative token set and the named rules. The prose
   sections ("Named Rules", "Do's and Don'ts") matter more than the YAML.
2. **`src/styles/beckn.css`** — the component kit. Read it end to end; it is
   ~840 lines and you need the whole vocabulary in your head.
3. **`src/scripts/beckn.js`** — the four behaviours and the attribute contract
   (`data-bk-loop`, `data-bk-intro`, `data-bk-count`, `data-bk-scrub`, `.bk-rv`).
4. **`pages/d2c-retail.html`** — one worked example, to see how the kit assembles.
5. **`src/styles/category-chrome.css`** — the navbar/footer frame. You inherit
   this untouched; it is not yours to restyle.
6. **The page you are redesigning** — its full current content, and any
   canonical copy for it in `docs/content/`.

Do not skip 6. Everything below depends on knowing what the page actually says.

---

## 3. The invariants — copy these exactly

These are non-negotiable. Every one of them carries a reason; if you understand
the reason you will apply them correctly in situations this document does not
anticipate.

**Typography — one family, tight, with reversed emphasis.**
Space Grotesk only, at 400/600/700. Display sizes carry roughly `-.035em`
tracking, because the face sets loose at scale and reads like a slide deck
without it. Emphasis inside a heading is expressed by dropping to weight 400
inside an `<em>` — *lighter*, not bolder. The eye lands on the light phrase
because everything around it is heavy. This single inversion is the most
recognisable thing about the system; get it backwards and the page instantly
reads as generic marketing.

**Colour — one blue, one ground, nothing else.**
`#2151F5` carries every instance of connection, progress, emphasis and
interaction. There is no second accent. If a design needs a second accent colour
to separate two things, the hierarchy has failed and the fix is structural. The
canvas is `#f7f8f8` and **always** carries its 32px dot grid — the dots are what
make white panels read as floating rather than as flat sections.

**No icons. Ever.**
No glyph sets, no illustrations, no badges. A concept that needs an icon to be
understood needs better words. This is also what stops the pages looking like
every other infrastructure site.

**Motion is ambient, and it never bounces.**
Things loop, fill, and take colour continuously rather than popping on trigger.
All entrances use `cubic-bezier(.16, 1, .3, 1)` — fast attack, long settle, no
overshoot. Under `prefers-reduced-motion: reduce`, everything stops and all
content renders in its final state.

**Never animate layout properties.** Width, height, padding and margin are off
limits; use `transform` and `opacity`. There is prior art in the kit for both
common cases: `.bk-stat-fill` scales instead of growing its height, and
`.bk-barrier` translates its children instead of shifting its own padding.

**Imagery is never static in a rectangle.** It moves in a marquee, or it sits
behind the radial veil, or it is masked. The veil is worth studying: imagery is
dissolved into the paper colour, never dimmed with black. Copying that instinct —
*fade to canvas, never to shadow* — will keep new image treatments in family.

**Asymmetry is structural.** Grids are `1fr / 1.25fr`, `1.1fr / 1fr`, indents at
14%. Nothing is centred except a hero and a closing call to action. Symmetry is
the default look of a template; asymmetry is what signals a designed page.

**Hairlines, not boxes.** Structure is drawn with 1px rules at `#e6e7e9`. Cards
have almost no border and a very soft shadow. Nothing is enclosed in a heavy
container.

---

## 4. The variables — these must differ

If you carry any of these over unchanged from a category page, you have
photocopied.

**Section count and order.** The category six-beat sequence — promise, proof,
participants, reality, mechanism, invitation — is a *narrative argument for
joining a network*. It is not a page layout. A directory page, a careers page and
a policy index have entirely different arguments and therefore entirely different
shapes.

**Which motion vocabulary appears.** The kit has four distinct behaviours:
looping marquees, a scroll-driven spine, per-word colour scrub, and count-up
figures. A category page uses all four because it has to carry a long argument.
Most pages should use **one or two**. Using all four everywhere is exactly what
makes a site feel like a template.

**The hero composition.** There are already two hero variants and you may need a
third. What the hero must do is establish the page's subject at display size with
one emphasised phrase; how it does that is open.

**Panel rhythm.** Category pages alternate canvas → panel → canvas → panel. A
page dominated by a long list might invert that entirely and sit almost wholly on
one surface. The alternation is a tool, not a law.

**Grid ratios and indent amounts.** Stay asymmetric, but do not reuse the same
fractions.

---

## 5. The method — derive structure from content

Work in this order. The order matters: it is what stops you reaching for the
template.

**Step 1 — Read the page's real content and write its argument in one sentence.**
Not its sections; its *argument*. "This page proves ONDC is credible and
accountable." "This page helps someone find the right document fast." "This page
convinces an engineer that integration is tractable."

**Step 2 — Name the page's natural shape.** Content has a shape independent of
any design system. Common ones in this repo:

| Shape | Looks like | Pages |
|---|---|---|
| Argument | ordered claims building to a decision | category pages |
| Directory | many peer items, needs finding | network-participants, ecosystem-participants |
| Library | grouped documents, needs scanning | resources* (20 pages) |
| Institutional narrative | history, people, accountability | about-us |
| Invitation | culture, then a list of openings | careers |
| Procedure | ordered steps a person performs | how-to-shop, gateway |
| Transaction | a form to complete | contact-us, complaint, rfp |
| Reference | long authoritative prose | privacy, cookie, terms |

A shape is not a template — it is a constraint on what layouts can possibly be
honest.

**Step 3 — Choose the one moment this page will be remembered for.** Every page
should have exactly one distinctive move, built from the shared vocabulary but
specific to this page. This is the single most important step for avoiding
photocopy feel, and it is where you should spend your design thinking.

Examples of what that could be, none of which exist in the category pages:

- A directory where the hairline rules *are* the layout — no cards at all, just
  ruled rows that tint on hover, with the count of participants counting up once
  in the header.
- A library where each collection is a canvas-coloured block on white, inverting
  the usual panel relationship, so the page reads as an index rather than a pitch.
- An institutional page where a single vertical hairline runs the full document
  and dates hang off it — the spine idea, repurposed as a timeline, with no nodes
  and no ghost numerals.
- A procedure page where the step number is the entire left column at
  `numeral-ghost` size and the instruction sits in the gutter beside it.
- A form page where the ruled rows of the reality list become the form rows, so
  filling it in feels like reading rather than like data entry.

Note what these have in common: each takes **one existing idea from the kit and
re-purposes it**, rather than inventing a foreign one or reusing it verbatim.

**Step 4 — Select from the kit, then adapt, then invent — in that order.**
Climb this ladder and stop at the first rung that works:

1. **Reuse a component as-is** where the content genuinely matches its purpose
   (`.bk-btn`, `.bk-eyebrow`, `.bk-rv` reveals — these should be reused nearly
   always).
2. **Reuse the mechanism with different presentation** — the marquee machinery
   with different card contents, the spine with different markers.
3. **Invent a new component in the same language** only when the content has a
   shape the kit cannot express. Then follow §6.

**Step 5 — Sanity-check the fresh/tied balance.** Ask both questions and require
both answers:

- *Would a reader who just left a category page recognise this as the same site?*
  (If no: you broke an invariant.)
- *Would they notice they are now on a different kind of page?*
  (If no: you photocopied.)

---

## 6. Inventing a new component

When you do add one, it must speak the language rather than merely avoid clashing
with it. Concretely:

- Name it `.bk-*` and scope it under `.bk`, in `beckn.css`. Do not start a
  parallel stylesheet.
- Use the existing custom properties (`--bk-ink`, `--bk-blue`, `--bk-line`,
  `--bk-ease`, `--bk-ease-out`). Never introduce a new literal colour without
  adding it to `DESIGN.md` in the same change.
- Take its type size from the declared ramp in `DESIGN.md`. If you genuinely need
  a new step, add it there — and check first whether an existing step is within a
  pixel or two, because that is drift rather than a new role.
- Match the existing radius set: 16 / 22 / 28 / 999.
- If it moves, it uses `--bk-ease-out` and it is disabled under reduced motion.
- If it is decorative, mark it `aria-hidden="true"` — the marquees and orbs all
  are, because their content is already stated in prose nearby.
- Write it to work at any item count. The category statistics grid was originally
  hard-coded to six cells and had to be repaired when a nine-cell page arrived;
  do not repeat that.

Then update `DESIGN.md` in the same change. A component that exists in CSS but
not in the design system is drift by definition, and the repo has a detector that
will say so.

---

## 7. What you inherit and must not touch

- **The chrome.** Navbar, sector rail, footer come from
  `src/styles/category-chrome.css` and each page's existing markup. Copy the
  navbar and sector rail *from the page you are replacing*, because the CTA
  label, the signup role key and which pill is omitted are all page-specific.
- **Load order.** `category-chrome.css` → `fx.css` → `scale.css` →
  `type-boost.css` → `beckn.css`. `fx.css` must come after the chrome file, and
  `type-boost.css` must be present or desktop type shrinks 15%.
- **`fx.js`** — it drives the navbar dropdown. Dropping it silently breaks
  navigation on every page.
- **The boundary itself.** The site chrome is Inter on navy; the body is Space
  Grotesk on the dotted canvas. That seam is deliberate. Do not "harmonise" them.

---

## 8. Anti-patterns

Each of these has a specific tell, so you can catch yourself.

- **The six-beat reflex.** You wrote a stats grid because the template has one,
  not because the page has six meaningful figures. *Tell:* you had to invent
  numbers, or a "stat" is really a sentence.
- **Marquee everywhere.** Motion applied because it is available. *Tell:* the
  marquee content is unrelated to the section it decorates.
- **Emphasis inflation.** Multiple `<em>` phrases per heading. *Tell:* nothing
  stands out because everything does. One per heading.
- **The centred page.** Everything symmetric. *Tell:* it looks like a landing
  page builder. Only the hero and the final CTA centre.
- **Icon smuggling.** Arrows, chevrons and bullet glyphs creeping in as "not
  really icons". The `·` separator in step copy is the only mark in the system.
- **A second accent.** Usually arrives as a "success" green or a "warning" amber.
  Solve it with hierarchy or with the ink/muted pair instead.
- **Bolded emphasis.** The exact inverse of the system's core typographic move,
  and the fastest way to make the page look like it was made elsewhere.
- **Stat-grid abuse.** Turning any list of facts into large numerals. Figures
  earn display size; sentences do not.

---

## 9. Verify before you claim it works

Serve with `npm run dev` and check in a browser — structural correctness is not
the same as it rendering right.

- No 404s in the Network panel. Watch the `hero/` filenames: three sectors do not
  follow their page slug (`d2c-brands`, `food-beverages`, `logistics`).
- No horizontal overflow at any scroll position, at 1280 / 1000 / 700 / 375px.
- Every interactive element has visible text at 4.5:1 contrast against its
  **actual rendered** background. Compute this; do not eyeball it. A specificity
  bug once made sixteen buttons across ten pages render ink-on-ink while the
  markup looked perfectly correct.
- Anything scroll-driven actually tracks scroll, and any count-up reaches its
  target — request-animation-frame work stalls when a tab is not painting, so
  measure after a real scroll rather than after a scripted jump.
- Reduced motion: everything visible, nothing moving.
- Run the design detector on every file you touched:
  `node .claude/skills/impeccable/scripts/detect.mjs <file>`. Zero findings is
  achievable and is the standard the category pages meet. If a finding is
  genuinely intentional, resolve it by *documenting the value in `DESIGN.md`* —
  not by adding an ignore.

---

## 10. The shortest version

Keep the type, the single blue, the dotted ground, the reversed emphasis, the
hairlines, the no-icon rule and the no-bounce rule. Change the structure, the
rhythm, the motion vocabulary and the one thing the page is remembered for.

Derive the structure from what the page actually says. If you find yourself
filling in a section because the template has one, stop and re-read the content.
