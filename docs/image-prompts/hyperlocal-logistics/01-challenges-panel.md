# Challenges Panel

## Location on page
- Page: Hyperlocal Logistics (`Hyperlocal Logistics.html`)
- Section: "The Structural Reality" — "Key challenges" (sticky panel beside the challenges list)
- CSS target: `.challenges-img-panel img`
- Order: 1st unresolved `assets/placeholder.svg` reference in the file (the earlier `.hero-bg` and `.reality-img` slots on this page already have real photos assigned — `assets/hero/logistics.jpg` and `assets/library/rider.jpg` — so this is the first slot that still needs an image)

## Role in the page
This is a tall, sticky image that stays pinned in the viewport as the reader scrolls down a vertical list of five "Key challenges" cards: limited integrations and fragmented partner contracts, underutilised regional fleets, inconsistent service levels, high last-mile cost pressures, and limited growth for regional operators. Unlike the `.reality-img` slot higher up (which has a caption baked into a bottom gradient), this panel carries no caption — it must communicate "fragmented, underused, structurally strained logistics capacity" purely through the scene itself, since it will be looked at for an extended scroll duration next to five different challenge headlines.

## Display context
- Shape: Portrait, aspect-ratio 3:4
- Recommended output size: ~1500x2000px
- Presentation: Sits in a dark, atmospheric section (deep navy gradient background with soft cyan/blue radial glows). The image itself renders at 85% opacity with no additional gradient or caption overlay — the whole frame stays visible edge-to-edge, so composition needs to hold interest throughout, not just at the top. Rounded corners (16px) and a heavy drop shadow separate it from the dark backdrop.

## Subject & scene
A small regional logistics/fleet yard in a mid-sized Indian city at dusk or early evening — the kind of modest, semi-open depot a local fleet operator or small transport contractor would run, not a corporate logistics center. Rows of parked delivery vehicles: a mix of delivery two-wheelers (scooters/motorcycles with cargo boxes) and one or two loader three-wheelers (auto cargo/tempo), several of them clearly idle — tarps half-thrown over some, kickstands down, a light layer of dust on the seats — visually suggesting underutilised capacity. A chain-link or corrugated-tin boundary fence, a single bare bulb or sodium lamp starting to glow as daylight fades, a stack of empty delivery crates against a wall, a faded hand-painted signboard for the transport company (generic invented name, not a real courier brand). The scene should read as real, slightly weathered infrastructure — India's actual last-mile backbone, not a stock "logistics hub."

## Composition & framing
Portrait orientation, shot at eye level or slightly low angle looking down a row of parked vehicles receding into the frame, using the converging lines of the vehicle row and yard wall to create depth. Place the most idle/dusty vehicles in the mid-ground so they read clearly at a glance; keep the top quarter of the frame open sky or muted wall for breathing room, and avoid critical detail crammed into the extreme edges since the panel is viewed at a fixed aspect ratio across many screen sizes. Moderate depth of field — front vehicle in slightly softer focus, mid-ground sharper — gives it a documentary rather than catalog feel.

## People
Optional: a single fleet operator or dispatch clerk, a man in his 40s-50s wearing a plain half-sleeve shirt and trousers, sandals, standing near the vehicles with a clipboard or an old ledger register in hand, looking out over the yard with a tired, thoughtful expression — not posed for camera, captured mid-thought as if doing an evening stock-check. If included, position him to one side (not centered) so the vehicles remain the visual anchor.

## Lighting & color
Golden-hour or blue-hour transitional light — warm low sun raking across the yard from one side, mixing with the cooler ambient light of dusk; a single sodium/tungsten yard lamp beginning to glow adds a warm accent point. True, natural color grading: dusty ochre ground, faded vehicle paint, muted signage colors. Do not pre-tint the image blue or navy — the section's dark gradient and radial glows are applied afterward in CSS on top of the photo.

## Mood
Weathered, fragmented, quietly strained, real

## Must avoid
Slick corporate logistics-center stock photography; brand-new or showroom-clean vehicles; any visible real courier/delivery-company logos or liveries (Delhivery, Dunzo, Swiggy, Zomato, Amazon, etc.); legible license plates or real addresses on signage; Western-style warehouse or depot architecture; over-staged "before" photography that looks cartoonishly bleak; HDR over-processing; AI artifacts in vehicle wheels/mirrors/proportions.

## Suggested filename
`assets/library/hyperlocal-fleet-yard.jpg`

## Suggested alt text
"A regional fleet yard at dusk with idle delivery two-wheelers and a loader three-wheeler parked in rows"

## Ready-to-use generation prompt
> Documentary photograph, portrait orientation, of a modest regional delivery-fleet yard in a mid-sized Indian city at dusk, rows of parked delivery scooters with cargo boxes and one loader three-wheeler receding into depth, several vehicles idle with tarps half-draped and a light dust film suggesting underuse, a corrugated-tin boundary wall, stacked empty delivery crates, a faded hand-painted signboard with an invented (non-brand) transport company name, a single sodium yard lamp just beginning to glow against fading golden-hour light; optionally a tired-looking fleet operator in his 40s-50s in a plain shirt holding a ledger, standing to one side surveying the yard; true natural color, no blue tint, moderate depth of field, weathered and real, not a corporate stock photo; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.
