# Challenges Panel — Fragmented Kirana Procurement

## Location on page
- Page: DigiDukaan (`DigiDukaan.html`)
- Section: "The Structural Reality" → "Key challenges" (`.challenges-wrap`)
- CSS target: `.challenges-img-panel img`
- Order: 1st image placeholder on this page (2nd overall image slot in the Reality section — the `.reality-img` slot above it is already filled with `assets/library/pharmacy.jpg`)

## Role in the page
This sticky portrait image sits beside a vertical list of five "Key challenges" cards: retailer app fatigue, time-consuming procurement, working-capital lock-up, limited scheme visibility, and distributors operating manually. As the reader scrolls down the challenge list, this single image stays pinned in view the entire time, so it has to function as a visual anchor for the whole cluster of pain points — a single frozen moment that reads as "manual, fragmented, paper-and-phone-based procurement" without needing to illustrate any one bullet literally. It follows directly after the `reality-img` (a kirana shopkeeper portrait), so it should feel like a different, complementary moment in the same world — not a repeat of that shot.

## Display context
- Shape: Portrait, aspect-ratio 3:4
- Recommended output size: 1500x2000px
- Presentation: Sticky panel in a dark navy section (`background: linear-gradient(170deg,#0a1a35,#0d2040,#081424)`). Image opacity is set to .85 (slightly desaturated/dimmed against the dark background), with no gradient caption overlay on this particular slot (unlike `.reality-img`), so the full frame stays visible — but it still sits in a very dark-themed section, so avoid pure-white blown highlights that would look jarring against the surrounding navy. Rounded 16px corners, large soft drop shadow.

## Subject & scene
A close, tactile shot of manual B2B procurement chaos at a small Indian kirana (general store) counter. Concretely: a shopkeeper's hands and torso (not full face necessarily, can be partial/three-quarter) surrounded by the actual tools of fragmented ordering — a well-worn spiral-bound order register with handwritten entries in Hindi/English mixed script, a stack of loose paper "chits" and delivery challans from different distributors, a battered calculator, and two or three different mobile phones/feature phones lying on the counter (representing the "five or more channels" the copy describes — sales rep visits, WhatsApp, phone calls, separate brand apps). Behind/around the counter: metal shelving stacked with a visible mix of packaged FMCG goods (biscuits, soap bars, snack packets, detergent pouches) in a slightly crowded, lived-in general store — jars of loose goods, hanging sachets on strings, a small brass weighing scale. This is a real, slightly cluttered small shop, not a styled set.

## Composition & framing
Tight-to-medium shot, roughly waist-up or a top-down/45-degree angle looking down at the counter so the register, chits, phones and calculator are all legible in the frame. Shallow depth of field (something like f/2.8 look) with the shelving behind thrown slightly soft so the counter clutter reads as the hero subject. Leave a bit of negative space in the upper third (where shelving recedes into soft focus) since there's no caption box on this slot, but keep the composition tight so it survives being cropped by the 3:4 panel at different screen widths — center the key objects (register, phones, hands) in the middle 60% of the frame.

## People
A kirana shopkeeper, Indian, appears to be in their 40s-50s, wearing a simple collared shirt or kurta, sleeves rolled up, visible partially — hands writing in the register or holding a phone to the ear with the other hand pinning down paper chits. Weathered, working hands. Expression (if face is in frame) should read mildly harried/focused, not posed or smiling at camera — caught mid-task.

## Lighting & color
Daytime, mixed light: warm tungsten/fluorescent tube-light ambience typical of an Indian general store interior, with a wedge of natural daylight spilling in from an unseen doorway or window camera-left, creating gentle highlight on the counter surface. True-to-life, slightly warm color temperature (do not pre-tint blue or teal — the CSS applies its own dark overlay on top of this photo afterward). Color palette naturally dominated by cardboard browns, faded shelf-label colors, and skin tones.

## Mood
Fragmented, harried, authentic, unglamorous busyness

## Must avoid
No posed "shopkeeper smiling at camera" stock-photo look; no clean/staged minimalist counter — it must look genuinely cluttered and lived-in; no visible real brand logos or trademarked packaging design (use generic/unbranded-looking packaging); no baked-in text, graphics, or watermarks; no HDR over-processing or oversaturated colors; no AI-artifact hands (correct finger count, natural hand poses); do not repeat the exact framing of a shopkeeper-portrait-in-doorway shot (that motif belongs to the `reality-img` slot already filled elsewhere).

## Suggested filename
`assets/digidukaan/challenges-panel.jpg`

## Suggested alt text
"A kirana shopkeeper's counter cluttered with a handwritten order register, paper delivery chits and multiple phones, showing the manual, fragmented way general trade procurement works today"

## Ready-to-use generation prompt
> Documentary photojournalism, 35mm lens, shallow depth of field: a close, top-down-angle shot of an Indian kirana general store counter, hands of a shopkeeper in his 40s-50s writing in a worn spiral-bound order register, surrounded by loose paper delivery chits from different distributors, an old calculator, and two different mobile phones lying on the counter — one held to his ear. Background shelving stacked with generic unbranded packaged goods (biscuits, soap, detergent pouches, snack packets) softly out of focus, small brass weighing scale visible. Warm mixed tungsten and daylight lighting spilling in from an unseen doorway, natural warm color grading, no blue tint. Mood: harried, fragmented, authentically busy small-business procurement — not posed, not glossy stock photography. High detail, no text overlay, no visible logos.
