# Hero Background

## Location on page
- Page: D2C Retail (`D2C Retail.html`)
- Section: Hero — "Providing a low-cost and sustainable e-commerce channel for brands"
- CSS target: `.hero-bg`
- Order: 1st image placeholder on this page (defined in the shared `<style>` block, line 119; no per-page override exists, so this default `assets/placeholder.svg` reference is what actually renders behind the hero)

## Role in the page
This is the very first visual a visitor sees — a full-bleed atmospheric backdrop sitting behind the hero headline "Providing a low-cost and sustainable e-commerce channel for brands" and the subhead about lower commissions, wider digital visibility, and connected logistics for D2C brands. It never needs to be read as a literal photograph; it is texture and mood-setting, establishing "commerce in motion" before the reader even reaches the stat strip. Because it sits at low opacity under a heavy directional dark veil, its job is to add warmth, depth and a sense of real physical commerce (boxes, product, motion) without competing with the white headline text.

## Display context
- Shape: Wide, roughly 16:9 to 21:9 (ultra-wide letterbox reads best against the hero's short height)
- Recommended output size: ~2400x1150px (or larger, cropped from a bigger wide capture)
- Presentation: Rendered at only 28% opacity, then covered by two more layers: a diagonal (108deg) dark gradient going from 82% opaque near-black on the left, down to 32% opaque on the right, plus a radial dark vignette centered at roughly 16% from the left edge. Practically: the LEFT third of the frame will be almost fully swallowed into near-black — that is where the headline text sits, so nothing important should be there. The RIGHT half is the most visible part of the image (still only at ~28% base opacity, so it reads as a soft, hazy background wash, not a crisp photo).

## Subject & scene
A wide interior shot of a small but bustling D2C fulfilment operation — think a compact urban warehouse or brand's own packing floor in India, photographed from a slightly elevated or wide angle so the eye reads shapes and rows rather than individual detail. Rows of open cardboard shipping cartons on a long metal packing table, product boxes with plain kraft-brown D2C-style packaging (no visible brand logos), rolls of packing tape, stacks of pre-printed (blank/blurred) shipping labels, and a warehouse rack of stock in the background fading into soft focus. Optionally include a blurred figure (a packer's arm and torso, motion-blurred) reaching for a box on the right-hand side of the frame, suggesting activity without needing facial clarity.

## Composition & framing
Wide-angle lens (24-35mm equivalent), shot slightly from above or at chest height looking down a row of packing tables, creating strong horizontal/diagonal lines (shelving edges, table edges, stacked boxes) that read as bold graphic shapes at a glance. Keep the left third of the frame relatively simple/darker in tone naturally (deep shelving, shadow) since it will be swallowed by the dark gradient anyway; concentrate the more visually interesting elements — color, texture, activity — in the right half and center. Shallow-to-moderate depth of field is fine; a little softness helps it recede into "texture" rather than a sharp documentary shot.

## People
Optional and secondary only — if included, show only a partial, motion-blurred figure (forearm and hand reaching for a box, or a torso turned away from camera) of a warehouse packer in a plain t-shirt or apron. No identifiable face is needed or wanted here since the image will read at a glance as atmosphere, not portraiture.

## Lighting & color
Natural, warm daylight spilling in from an unseen side window or skylight, mixing with cool fluorescent warehouse light — a believable mixed-source Indian small-business interior, not a moody cinematic set. Keep the base photograph in true, natural color (warm kraft-box browns, grey metal shelving, muted whites) — do NOT pre-tint the image blue or navy; the site's CSS gradient overlay will add the brand-blue/navy veil on top afterward.

## Mood
Busy, purposeful, quietly optimistic, in-motion

## Must avoid
Glossy Amazon-fulfillment-center stock photography look; robotic/automated warehouse imagery (this is a small D2C brand, not a mega-warehouse); visible brand names, logos, or courier-company markings on any box or label; any legible text or shipping labels with real addresses; over-sharp HDR processing; obvious AI artifacts (warped hands, impossible shelving geometry); Western warehouse settings or non-Indian signage; empty, sterile-looking space — it should feel lived-in and active.

## Suggested filename
`assets/hero/d2c-retail-warehouse.jpg`

## Suggested alt text
"Wide shot of a small D2C brand's packing floor, stacked shipping cartons and packing tape on a long metal table"

## Ready-to-use generation prompt
> Wide-angle documentary photograph of a small Indian D2C brand's packing and fulfilment floor, shot slightly from above down a long metal packing table lined with open kraft-brown cardboard shipping cartons, rolls of packing tape, and stacks of blank shipping labels, with warehouse shelving stocked with plain unbranded product boxes fading into soft focus in the background; a motion-blurred forearm reaches for a box on the right side of frame, suggesting mid-task activity; warm daylight from an unseen side window mixes with cool overhead fluorescent light for a believable mixed-source interior; natural true-to-life color, no blue tinting; strong diagonal composition with bold shapes and negative space on the left; documentary photography, 35mm, photojournalistic, high detail, no text overlay, no logos.

