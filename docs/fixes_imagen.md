# Remaining Placeholder Images — Findings & Generation Prompts

## What was checked

The 6 screenshots supplied showed the literal blue "Placeholder" graphic (or, for two of them, a browser broken-image icon) still rendering on live pages. Each was traced to its exact spot in the codebase below.

## Findings

### Still showing the literal "Placeholder" graphic (real bug — needs new images)

All four of these `<img>` tags point at files inside `assets/library/`. Every file in that folder (`workshop.jpg`, `pharmacy.jpg`, `sewing.jpg`, `rider.jpg`, `group1.jpg`, `group2.jpg`, `ondc.jpg`, `launch.jpg`, `portrait.jpg`) is the **exact same 13,882-byte stock placeholder** (blue gradient, word "Placeholder" in light-grey text) — none of them are real photos, despite `image-prompts/GOOGLE-FLOW-MANIFEST.md` incorrectly noting several of these as "already real." That manifest note is stale and should not be trusted for these files.

1. **D2C Retail.html**, line 1030 — "Why Join ONDC" row, badge "For Emerging Businesses" / title "For Emerging and Regional Businesses"
   `<img src="assets/library/workshop.jpg" alt="Emerging businesses">`

2. **DigiDukaan.html**, line 790 — "The Structural Reality" section (headline: *"India's kiranas power everyday commerce, but procurement remains fragmented and manual."*)
   `<img src="assets/library/pharmacy.jpg" alt="Kirana shopkeeper">`

3. **Impact Retail.html**, line 790 — "The Structural Reality" section (headline: *"Millions of farmers, artisans and small producers remain outside digital commerce."*)
   `<img src="assets/library/sewing.jpg" alt="Rural artisan at work">`

4. **Shared Mobility.html**, line 946 — "Why Join ONDC" row, badge/title "For Drivers & Fleet Owners"
   `<img src="assets/library/rider.jpg" alt="For Drivers & Fleet Owners">`

**Two more instances of this exact same bug exist on pages that weren't screenshotted, but share the same broken source files — flagging them so the fix is complete instead of half-done:**

5. **Impact Retail.html**, line 879 — "How it Works" card 2, "Seller Enablement Support"
   `<img src="assets/library/workshop.jpg" alt="Seller Enablement Support">` (same broken file as #1, different page/context — cannot reuse one photo for both)

6. **Impact Retail.html**, line 947 — "Why Join ONDC" row, badge/title "For Farmers, Artisans & SHGs"
   `<img src="assets/library/group1.jpg" alt="For Farmers, Artisans & SHGs">`

7. **Hyperlocal Logistics.html**, line 790 — "The Structural Reality" section (headline: *"Logistics in India operates through a distributed and fragmented ecosystem."*)
   `<img src="assets/library/rider.jpg" alt="Warehouse loading dock">` (same broken file as #4, different page/context)

### Already fixed locally, just not deployed yet (no new image needed)

The other two screenshots (Credit page and Investments page, both the "Structural Reality" photo and the "Key Challenges" panel photo) are **not actually blank in the codebase anymore** — real photographs already exist locally at `assets/reality/credit.jpg`, `assets/challenges/credit.jpg`, `assets/reality/investments.jpg`, and `assets/challenges/investments.jpg`, and the HTML already points at them correctly. They still appear as broken/placeholder on the live site only because these image files are new, untracked local files (`git status` shows them as `??`) that haven't been committed and deployed yet. **No generation work is needed for Credit or Investments — just commit and deploy the existing files.**

---

## Instructions for generating the replacement images

Follow this exactly, one image at a time:

1. Take one prompt from the "Prompts" section below.
2. Generate **exactly one image** from it — do not generate multiple variations and pick one; use the single output as-is (regenerate only if it clearly violates the "Must avoid" list for that prompt).
3. Once generated, rename the downloaded file to the exact **"Save initially as"** filename given for that image.
4. Put every renamed file into one single folder at the project root called `fixed_images/` (create it if it doesn't exist). Do not scatter them into the `assets/` subfolders yet — all 7 go into this one flat folder first.
5. After all 7 images are generated and sitting in `fixed_images/`, move each one into its real destination path (given under "Final destination") inside `assets/`, and update the matching `<img src="...">` in the HTML file named for each entry to point at that new path.

Each `fixed_images/` filename already encodes its final destination folder so nothing gets mixed up when moving them later.

---

## Prompts

### 1. D2C Retail — "For Emerging and Regional Businesses"
- Save initially as: `fixed_images/audience-d2c-retail-emerging-businesses.jpg`
- Final destination: `assets/audience/d2c-retail-emerging-businesses.jpg` (update `D2C Retail.html` line 1030)
- Target ratio: Landscape 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small regional Indian manufacturing workshop in a tier-2 town, mid-30s owner standing beside a simple production table stacked with finished unbranded goods (folded textiles or boxed handicrafts) ready for dispatch, one hand resting on a stack of plain shipping cartons labelled only with a handwritten destination city name, a small handheld weighing scale and a roll of packing tape nearby; corrugated-sheet workshop walls, a single overhead tube light supplemented by daylight from an open shutter door, two idle sewing machines or workbenches visible in the soft-focus background suggesting a growing but still-small operation; three-quarter medium shot, eye level, 35mm lens, warm true-to-life color grading, no blue tint; landscape 16:10 composition with a calm, uncluttered top-left corner (a badge overlay will sit there); genuine focused expression, not smiling at camera, not posed; photojournalistic, high detail, no text overlay, no legible signage, no logos or brand names, no AI artifacts.

### 2. DigiDukaan — "The Structural Reality" (kirana shopkeeper)
- Save initially as: `fixed_images/reality-digidukaan.jpg`
- Final destination: `assets/reality/digidukaan.jpg` (update `DigiDukaan.html` line 790)
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian kirana shopkeeper, man in his 40s-50s wearing a plain collared shirt, standing behind his store counter simultaneously juggling three fragmented procurement channels at once: one hand holding a phone to his ear mid-call, the other hand holding a second phone showing a blurred generic messaging app, while a torn paper delivery chit and a worn spiral-bound order register lie open on the counter in front of him with a pen resting on top; shelves behind him densely stacked with generic unbranded packaged goods (biscuits, soap bars, snack packets), a small brass weighing scale and an old calculator visible on the counter edge; slightly harried, overwhelmed expression, not looking at camera; warm mixed tungsten-and-daylight lighting spilling in from an unseen shop entrance, true-to-life warm color grading, no blue tint; portrait orientation, medium shot from a slightly elevated angle, generous empty space and soft shadow in the lower third of frame for a caption overlay; photojournalistic, 35mm, high detail, no text overlay, no legible handwriting, no logos or brand names, no AI artifacts.

### 3. Impact Retail — "The Structural Reality" (rural artisan)
- Save initially as: `fixed_images/reality-impact-retail.jpg`
- Final destination: `assets/reality/impact-retail.jpg` (update `Impact Retail.html` line 790)
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of a rural Indian woman artisan in her 40s-50s, wearing a plain cotton saree with the pallu tucked back for work, sitting cross-legged on a floor mat inside a modest mud-plastered village home, hand-stitching or hand-block-printing a piece of cloth stretched across her lap, a small pile of finished handloom textiles wrapped in newspaper and jute twine beside her because no proper packaging exists; a basic keypad mobile phone and a handwritten paper order ledger resting on the floor nearby; through an open doorway behind her, an empty unpaved village lane stretches into soft focus, visually reinforcing distance from urban supply chains and delivery routes; single warm window-light source, late-morning natural light with real shadow falloff, true-to-life warm color grading, no blue tint; portrait orientation, medium shot from a slightly low eye level, quietly concentrated expression, not looking at camera; generous empty space and soft shadow in the lower third of frame for a caption overlay; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark, no AI artifacts.

### 4. Shared Mobility — "For Drivers & Fleet Owners"
- Save initially as: `fixed_images/audience-shared-mobility-drivers-fleet-owners.jpg`
- Final destination: `assets/audience/shared-mobility-drivers-fleet-owners.jpg` (update `Shared Mobility.html` line 946)
- Target ratio: Landscape 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian auto-rickshaw driver, man in his 30s-40s wearing a plain half-sleeve shirt, standing beside his parked rickshaw at the roadside during a break, looking at a smartphone in his hand showing a blurred generic multi-app home-screen grid (implying access to several ride/fleet platforms at once) with a relaxed, quietly satisfied expression, not looking at camera; the rickshaw's meter and interior softly visible behind him, an ordinary Indian city street with other parked two- and three-wheelers softly out of focus in the background; medium shot, three-quarter angle, eye level, 40mm lens, warm late-afternoon natural daylight, true-to-life color grading, no blue tint; landscape 16:10 composition with a calm, uncluttered top-left corner (a badge overlay will sit there); photojournalistic, high detail, no text overlay, no legible app logos or vehicle branding, no number plates legible, no AI artifacts.

### 5. Impact Retail — "How it Works: Seller Enablement Support"
- Save initially as: `fixed_images/how-it-works-impact-retail-seller-enablement-support.jpg`
- Final destination: `assets/how-it-works/impact-retail-05-seller-enablement-support.jpg` (update `Impact Retail.html` line 879)
- Target ratio: Landscape 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of two Indian adults — a field enablement coordinator in a plain collared shirt, late 20s-40s, and a rural artisan or small producer in everyday work clothes — sitting side by side at a simple wooden table inside a modest community or self-help-group workshop room, the coordinator pointing with a pen at a printed packaging template and a paper pricing worksheet spread on the table, the producer leaning in and nodding with genuine engagement; a few sample product packets (unbranded, kraft-paper wrapped) and a roll of plain labels sit nearby; warm natural daylight from a side window, plain plastered wall behind, true-to-life color grading, no blue tint; medium two-shot, eye level, 40mm lens, calm uncluttered top-left corner of frame; photojournalistic, high detail, no text overlay, no legible template text, no logos or brand names, no AI artifacts.

### 6. Impact Retail — "For Farmers, Artisans & SHGs"
- Save initially as: `fixed_images/audience-impact-retail-farmers-artisans-shgs.jpg`
- Final destination: `assets/audience/impact-retail-farmers-artisans-shgs.jpg` (update `Impact Retail.html` line 947)
- Target ratio: Landscape 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small mixed group of three Indian rural producers — a woman self-help-group member in a cotton saree, a male farmer in his 50s, and a younger artisan in his 20s — standing together outside a modest village community building, one of them holding up a finished handicraft item (a woven basket or block-printed textile) while a second points at a smartphone screen showing a blurred generic product-listing interface, all three genuinely engaged and smiling naturally at each other rather than at the camera; simple rural backdrop with a mud-brick wall and a hint of green fields softly out of focus; warm late-morning natural daylight, true-to-life color grading, no blue tint; medium-wide group shot, eye level, 35mm lens, calm uncluttered top-left corner of frame; photojournalistic, high detail, no text overlay, no logos or brand names, no AI artifacts.

### 7. Hyperlocal Logistics — "The Structural Reality" (fragmented logistics)
- Save initially as: `fixed_images/reality-hyperlocal-logistics.jpg`
- Final destination: `assets/reality/hyperlocal-logistics.jpg` (update `Hyperlocal Logistics.html` line 790)
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Documentary photograph of a small Indian logistics fleet operator, man in his 40s-50s wearing a plain work shirt, standing in a modest vehicle yard at dusk holding a paper ledger and a phone, surveying a scattered mix of delivery vehicles — two motorcycles with cargo boxes from visibly different, unbranded liveries, and one idle cargo three-wheeler — parked at irregular angles with no clear organizing system, a faded hand-painted signboard with an invented non-brand transport name on a corrugated-tin boundary wall behind him; his expression is thoughtful and slightly strained, conveying the effort of coordinating disconnected supply across a fragmented network, not looking at camera; warm fading golden-hour light mixed with one sodium yard lamp just switching on, true-to-life color grading, no blue tint; portrait orientation, medium shot from a slightly elevated angle, generous empty space and soft shadow in the lower third of frame for a caption overlay; photojournalistic, 35mm, high detail, no text overlay, no logos or brand liveries, no AI artifacts.
