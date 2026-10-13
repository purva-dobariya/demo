# How-It-Works Card 1 — Multiple Logistics Partners

## Location on page
- Page: Hyperlocal Logistics (`Hyperlocal Logistics.html`)
- Section: "How Logistics Works on ONDC" — Card 01 "Multiple Logistics Partners"
- CSS target: `.how-card-media img` (1st of 4 cards in the horizontal-scroll track)
- Order: 2nd unresolved `assets/placeholder.svg` reference in the file

## Role in the page
This is the top media strip of the first step-card in a horizontal "How it works" sequence explaining ODP (Open Delivery Protocol). The card's copy reads "Access multiple logistics providers through a single integration," with bullets emphasizing that one integration connects to multiple partners, easier expansion, and reduced operational complexity. The image is the visual shorthand for "one seller, plugged into many delivery options" — the very first idea a reader needs to grasp before the next three cards (routing, interoperability, scale) build on it.

## Display context
- Shape: Landscape, aspect-ratio 16:9
- Recommended output size: ~1600x900px
- Presentation: Sits inside a white rounded card (this section's background was overridden from dark navy to a light cream tone, so the surrounding card is a clean white panel, not a dark glass card) on a soft off-white section background. The image itself renders at 82% opacity with a subtle zoom-on-hover effect, letterboxed on rgba-black if the aspect doesn't fill exactly. A large "01" numeral overlays the top-left corner in white with a drop-shadow — keep the top-left corner of the frame relatively uncluttered (sky, wall, or simple background) so that numeral stays legible.

## Subject & scene
A small neighbourhood shop or dark-store dispatch counter — the kind of shopfront a kirana store, local pharmacy, or small D2C brand would use for hyperlocal fulfilment — at the moment of handoff. The shop owner or store staff (standing just inside a counter piled with sealed cardboard parcels, ready-to-ship polybags, and a handheld barcode scanner or tablet) is handing packages out to two or three different delivery riders standing just outside, each wearing a distinct plain helmet color and a different (entirely generic, invented) delivery-uniform color — no real courier branding — visually representing multiple independent logistics partners all connecting to this one shop. Delivery bikes/scooters with cargo boxes are parked just behind the riders.

## Composition & framing
Shot from slightly outside the shop looking in through the counter opening, medium-wide lens, so both the shopkeeper and the row of waiting riders are visible in one frame — the counter itself acts as a natural dividing line between "one seller" (left/inside) and "many delivery partners" (right/outside). Keep the top-left corner simple (a plain awning edge, signage backdrop, or open sky) to leave room for the card's white "01" numeral. Eye-level, mid-depth of field so the shopkeeper and nearest rider are both reasonably sharp.

## People
The shopkeeper: a man or woman in their 30s-50s, wearing a simple collared shirt or kurta, sleeves rolled up, handing over a taped cardboard parcel with a small handheld scanner clipped to their belt or resting on the counter. The riders: two or three delivery riders of varying ages (20s-40s), diverse in gender, each wearing a half-face or full helmet (helmet visor up, faces visible and neutral/focused rather than smiling at camera), plain generic jackets in different solid colors, receiving or already holding a parcel — captured mid-handoff, not posed in a row looking at the lens.

## Lighting & color
Bright midday or early-afternoon natural daylight, the kind that floods an open shopfront in an Indian market street — true color, slightly warm but not orange-graded, with visible daylight falloff into the shop's interior shadow. Do not pre-tint blue; the site applies its own brand-color treatment via CSS afterward, so the base photo must stay naturally colored.

## Mood
Efficient, connected, everyday-real, quietly busy

## Must avoid
Real courier-company logos, liveries, or uniform colors (no Swiggy orange, Zomato red, Amazon smile, Dunzo, Porter, Delhivery, etc. — invent neutral colors instead); riders lined up and smiling directly at camera like a stock ad; a corporate distribution-center setting (this is a small shopfront, not a warehouse); over-sharp HDR; AI artifacts in hands/helmets/parcel stacking; non-Indian street signage or architecture.

## Suggested filename
`assets/how-it-works/logistics-multiple-partners.jpg`

## Suggested alt text
"A shopkeeper handing parcels to several delivery riders in different uniforms outside a small shopfront"

## Ready-to-use generation prompt
> Documentary photograph, landscape 16:9, of a small Indian neighbourhood shop's dispatch counter mid-handoff: a shopkeeper in a rolled-sleeve shirt, a handheld barcode scanner nearby, passing a taped cardboard parcel out to a row of two or three delivery riders standing just outside, each wearing a different plain helmet color and a distinct generic (non-branded) jacket color, delivery scooters with cargo boxes parked behind them, market-street daylight flooding through the shop opening; shot from slightly outside looking in, medium-wide lens, eye level, simple uncluttered backdrop in the top-left corner; true natural midday color, no blue tint; candid mid-handoff moment, not posed; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.
