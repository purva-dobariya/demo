# ONDC Category Pages — Google Flow Image Generation Manifest

One consolidated list of every photo still needed across the 8 sector pages + About Us. The HTML on every page has already been wired to expect the exact filenames below — generate each image in Google Flow, download it, rename it exactly as shown, and drop it into the matching `assets/…` subfolder of the project. No code changes are needed after that; the pages will pick the photos up automatically.

**91 images below still need to be generated.** A number of other slots on these pages already had real photos in place — the hero photos on DigiDukaan, Food & Beverages, Hyperlocal Logistics, Impact Retail, Public Transport, Shared Mobility, Tourism and About Us, plus a few library photos reused on DigiDukaan, Hyperlocal Logistics, Impact Retail and Shared Mobility — and those needed no action at all. D2C Retail's hero was the one exception still pointing at a blank placeholder in code; rather than generating a new photo for it, it's now wired to reuse an already-existing unused photo (`assets/hero/d2c-brands.jpg`), so it isn't in the list below either.

## How to use this doc with Google Flow

1. Copy one blockquoted prompt at a time into Flow.
2. Set the aspect ratio to the closest available preset (see mapping below) — Flow's UI typically only offers a handful of fixed presets (16:9, 9:16, 1:1, and sometimes 4:3/3:4), not every exact ratio this site uses.
3. Download the result. If the preset wasn't an exact match, crop to the "Target ratio" given for that image before saving.
4. Save the file using the **exact filename** given under "Save as" — folders and names are case-sensitive and must match precisely.
5. Drop it into the matching subfolder under `assets/` in the project.

### Ratio → Flow preset cheat-sheet

| Site's target ratio | Used for | Closest Flow preset | Crop after? |
|---|---|---|---|
| 4:5 portrait | "Structural Reality" section photo | 3:4 portrait | Yes — trim a little off the top or bottom to land on 4:5 |
| 3:4 portrait | "Key Challenges" sticky panel photo | 3:4 portrait | No — exact match |
| 16:9 landscape | "How it Works" step cards | 16:9 landscape | No — exact match |
| 16:10 landscape | "Why Join ONDC" / audience & ecosystem rows | 16:9 landscape | Yes — trim a thin strip off one long edge to land on 16:10 |

All prompts already specify "no text overlay, no logos, no watermark" — reject any Flow output that ignores this and regenerate.

---

## D2C Retail — 9 images

*Hero already fixed in code to reuse `assets/hero/d2c-brands.jpg` — no generation needed.*

### 1. Structural Reality portrait
- Save as: `assets/reality/d2c-retail.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian D2C brand founder, early-to-mid 30s, in a small sunlit home-based packing workshop, taping shut a cardboard shipping carton at a cluttered worktable scattered with bubble wrap, unbranded product bottles, and a laptop showing a blurred sales/ad-spend graph in the background; plain plastered wall, one window casting soft natural side light, exposed brick accent, stack of spare boxes visible; genuine, unposed, absorbed expression, not looking at camera; portrait orientation with generous empty space and soft shadow in the lower third of frame; true-to-life warm color grading, no blue tint, shallow depth of field, 50mm, photojournalistic, high detail, no text overlay, no logos.

### 2. Key Challenges panel
- Save as: `assets/challenges/d2c-retail.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Overhead documentary photograph of a small Indian D2C brand's cluttered dispatch table, shot from directly above: several different unbranded courier shipping bags and blank waybills fanned across a wooden table, a handwritten ledger with a calculator showing scribbled numbers, a smartphone displaying blurred generic shopping-app icons, and a half-packed cardboard box in one corner, with a founder's hands entering from the edge of frame sorting through labels; single-source directional lighting creating real shadows between objects, moody but natural color, no blue tint; dense, lived-in clutter filling the 3:4 frame edge-to-edge; portrait orientation, photojournalistic, 35mm, high detail, no text overlay, no logos, no brand names visible.

### 3. How it Works — Access to Multiple Commerce Apps
- Save as: `assets/how-it-works/d2c-retail-01-commerce-apps.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian small-business founder's hands holding a smartphone displaying a blurred, generic storefront-style shopping app interface, with a second tablet or phone visible softly out of focus in the background showing a different generic app layout, set in a small sunlit workshop with soft-focus cardboard boxes and shelving behind; shallow depth of field, 85mm portrait lens feel, warm natural indoor light, true-to-life color with no blue tint; landscape 16:9 composition with clean, slightly darker negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible app logos or brand names, no AI artifacts.

### 4. How it Works — Connected Logistics Support
- Save as: `assets/how-it-works/d2c-retail-02-logistics.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian delivery rider in a plain unbranded helmet and jacket loading a stack of unmarked parcels onto the rear rack of a delivery scooter at a small regional courier sorting yard, with several other two-wheelers parked nearby each loaded with parcel bags, suggesting multiple logistics providers serving one brand's shipments; shot at a three-quarter angle, medium-wide 35mm lens, bright natural outdoor daylight with warm late-morning tone, true-to-life unfiltered color with no blue tint; slight motion energy in the rider's posture; clean open space in the top-left corner of frame; photojournalistic, high detail, no text overlay, no visible courier logos or liveries.

### 5. How it Works — Better Profitability
- Save as: `assets/how-it-works/d2c-retail-03-profitability.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of an Indian D2C brand founder, late 20s to 40s, seated at a small desk beside their packing table, reviewing a handwritten ledger and a calculator with a laptop nearby showing a blurred upward-trending graph, a few boxed finished products stacked within view; three-quarter over-the-shoulder angle, 50mm lens, moderate depth of field; quiet, private expression of relief and pride, not looking at camera; warm soft daylight from an off-frame window, true-to-life natural color with no blue tint, plain uncluttered wall in the top-left of frame; photojournalistic, high detail, no text overlay, no legible numbers or brand names, no AI artifacts.

### 6. How it Works — Growth and Onboarding Support
- Save as: `assets/how-it-works/d2c-retail-04-onboarding.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of two Indian adults — a D2C brand founder and an onboarding support partner — seated together at a small table in a modest workshop space, heads leaning in toward a laptop showing a blurred product-catalogue grid, with product samples and packaging visible nearby; genuine collaborative body language, one gesturing toward the screen, natural focused expressions with a slight warm smile; medium two-shot, eye-level, 40mm lens, soft even natural window light, true-to-life color with no blue tint, simple uncluttered space in the top-left of frame; photojournalistic, high detail, no text overlay, no legible branding, no AI artifacts.

### 7. Why Join — For D2C Brands
- Save as: `assets/audience/d2c-retail-d2c-brands.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Warm lifestyle-documentary photograph of a small Indian D2C brand's finished product line — unbranded skincare bottles and minimally packaged goods with kraft-paper labels — arranged on a simple wooden shelf, with a founder's hand entering from one side to adjust a bottle into place; medium-close shot, 70mm equivalent lens, shallow depth of field with two or three products in crisp focus and the rest softly receding; soft warm natural side light bringing out label texture without glare; true-to-life color rendering, no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible logos or brand names, no AI artifacts.

### 8. Why Join — For Customers
- Save as: `assets/audience/d2c-retail-customers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Candid lifestyle photograph of a young Indian adult in their late 20s, seated on a sofa in an ordinary, lived-in home, genuinely delighted while lifting a small unbranded product out of a just-opened parcel, a smartphone and a cup of chai visible nearby on a side table, a houseplant and everyday furniture in soft focus behind; medium shot, 40mm lens, natural candid framing with the person looking at the product rather than the camera; warm soft afternoon window light, true-to-life color with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no visible logos or brand names, no AI artifacts.

### 9. Why Join — For Tech Partners
- Save as: `assets/audience/d2c-retail-tech-partners.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Candid documentary photograph of a small Indian tech startup team of three, mixed genders, late 20s to 30s, gathered around a laptop in a modest, plant-filled office with a whiteboard sketch of an abstract system diagram visible behind them; one person points at the laptop screen showing a blurred generic dashboard interface while the others lean in, genuinely engaged mid-conversation, natural unposed expressions not looking at camera; medium-wide group shot, 35mm lens, bright even natural daylight mixed with practical interior lighting, true-to-life color with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible logos, code, or brand names, no AI artifacts.

---

## DigiDukaan — 10 images

*Hero (`assets/hero/digidukaan.jpg`) and the Structural Reality photo (`assets/library/pharmacy.jpg`) already real — no generation needed.*

### 1. Key Challenges panel
- Save as: `assets/challenges/digidukaan.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photojournalism, 35mm lens, shallow depth of field: a close, top-down-angle shot of an Indian kirana general store counter, hands of a shopkeeper in his 40s-50s writing in a worn spiral-bound order register, surrounded by loose paper delivery chits from different distributors, an old calculator, and two different mobile phones lying on the counter — one held to his ear. Background shelving stacked with generic unbranded packaged goods (biscuits, soap, detergent pouches, snack packets) softly out of focus, small brass weighing scale visible. Warm mixed tungsten and daylight lighting spilling in from an unseen doorway, natural warm color grading, no blue tint. Mood: harried, fragmented, authentically busy small-business procurement — not posed, not glossy stock photography. High detail, no text overlay, no visible logos.

### 2. How it Works — Unified Ordering
- Save as: `assets/how-it-works/digidukaan-01-unified-ordering.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photography, 35mm, natural light: a kirana shop owner in his mid-30s to mid-40s, wearing a simple collared shirt, standing at his store counter holding a smartphone with both hands, absorbed in browsing a simple generic ordering-app interface (product thumbnails, cart icon, plain list rows, no real branding). Three-quarter angle, medium shot, top-left of frame kept visually calm and uncluttered. Background shows softly out-of-focus shop shelving stocked with generic unbranded packaged goods, a basic card-swipe POS terminal on the counter, a closed paper ledger set aside. Warm mixed daylight and tube-light interior lighting, true-to-life natural color grading, no blue tint. Mood: focused, practical, authentic small-business digital adoption — photojournalistic, not posed, high detail, no text overlay, no visible logos.

### 3. How it Works — Industry Partners
- Save as: `assets/how-it-works/digidukaan-02-industry-partners.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photography, 35mm, natural light: a distributor's field sales representative, Indian male in his late 20s-40s, wearing a plain unbranded collared shirt, standing inside a small open-sided distribution godown, holding a rugged smartphone or handheld device and checking it while gesturing toward stacked cardboard cartons of generic packaged goods on wooden pallets nearby. A loading tempo van with open rear doors and visible crates partially in frame. Medium-wide three-quarter angle, top-left of frame kept visually simple. Warm natural daylight spilling through an open loading bay, true unfiltered color grading, no blue tint. Mood: operational, capable, real logistics work in progress — photojournalistic, not posed, high detail, no text overlay, no visible logos or brand names.

### 4. How it Works — Smarter Replenishment Cycles
- Save as: `assets/how-it-works/digidukaan-03-replenishment.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photography, 35mm, natural daylight: at the open doorway of a small Indian kirana shop, a delivery rider in his 20s-30s wearing a plain unbranded t-shirt hands a single modest cardboard box directly to the shopkeeper, an Indian man in his 40s-50s standing in the doorway reaching to accept it. A motorcycle with a delivery box mounted behind is partially visible at the frame edge. Shop shelving with moderate, not-overstocked inventory softly visible behind. Eye-level medium shot, top-left of frame kept visually simple. Warm natural daylight, true unfiltered color grading, no blue tint. Mood: brisk, everyday, frictionless daily restocking — photojournalistic, unposed, high detail, no text overlay, no visible logos or brand names.

### 5. How it Works — Real-Time Visibility
- Save as: `assets/how-it-works/digidukaan-04-realtime-visibility.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photography, 35mm, natural light: an Indian distribution/brand operations professional in their 30s-40s, smart-casual shirt, sitting at a modest desk in a small distribution office, looking intently at a laptop screen showing soft-focus generic line and bar charts representing retail demand trends. A notepad, phone, and a couple of unbranded product sample boxes on the desk; stacked cartons faintly visible through a doorway behind. Over-the-shoulder or three-quarter medium shot, top-left of frame kept visually simple. Warm natural window light mixed with ambient desk lighting, true unfiltered color grading, no blue tint. Mood: analytical, calm, focused on real data — photojournalistic, unposed, high detail, no text overlay, no visible logos or readable software branding.

### 6. How it Works — Distributor Networks
- Save as: `assets/how-it-works/digidukaan-05-distributor-networks.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photography, 35mm, natural light: inside an open-sided wholesale distributor's godown, two to three Indian warehouse loaders in plain work clothes stack cardboard cartons of generic packaged goods onto a small delivery tempo truck, mid-action. To the side, a distributor supervisor in his 40s-50s wearing a plain collared shirt glances at a phone or tablet in one hand while overseeing the loading. Stacked pallets and a hand-truck trolley visible. Medium-wide establishing shot, eye-level, top-left of frame kept visually simple. Strong natural daylight flooding in from a large loading-bay opening, true unfiltered warm color grading, no blue tint. Mood: grounded, continuous, real physical distribution work — photojournalistic, unposed, high detail, no text overlay, no visible logos or brand names.

### 7. Why Join — For Kiranas
- Save as: `assets/audience/digidukaan-kiranas.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photography, 35mm, natural light: inside a well-stocked, tidy Indian kirana shop, the shop owner, a man in his 40s-50s wearing a simple collared shirt, hands an item to a customer at the counter in a relaxed, genuine exchange, both caught mid-interaction rather than posed. Shelves behind are neatly organized with generic unbranded packaged goods in healthy stock levels. Warm natural daylight spills in from the open shop front, mixed with interior lighting. Medium eye-level shot, top-left of frame kept visually calm. True unfiltered warm color grading, no blue tint. Mood: warm, unhurried, human connection at the heart of everyday commerce — photojournalistic, unposed, high detail, no text overlay, no visible logos.

### 8. Why Join — For Brands
- Save as: `assets/audience/digidukaan-brands.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photography, 35mm, natural light: inside a kirana shop, a brand field representative in their late 20s-40s, wearing a collared shirt or polo, holds a tablet showing a generic new-product screen and gestures to explain it to the kirana shop owner, a man in his 40s-50s in everyday shop attire, who leans in with genuine interest. A couple of generic unbranded sample product boxes sit on the counter between them. Softly out-of-focus shop shelving behind. Medium two-shot, natural mid-conversation body language, top-left of frame kept visually calm. Warm natural daylight mixed with interior shop lighting, true unfiltered color grading, no blue tint. Mood: collaborative, professional-but-warm, relationship-building — photojournalistic, unposed, high detail, no text overlay, no visible logos or brand names.

### 9. Why Join — For Distributors
- Save as: `assets/audience/digidukaan-distributors.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photography, 35mm, natural light: inside a small-to-mid-size Indian wholesale distribution warehouse, a distributor or warehouse manager in their 30s-50s, wearing a plain collared shirt with sleeves rolled up, holds a tablet or handheld scanner and checks it against neatly organized rows of stacked cardboard cartons of generic packaged goods on wooden pallets. A hand-truck trolley visible nearby. Medium-wide rule-of-thirds composition with cartons extending into the background for scale, top-left of frame kept visually calm. Natural daylight from an open loading-bay opening mixed with warehouse fluorescent lighting, true unfiltered color grading, no blue tint. Mood: organized, capable, quietly efficient inventory work — photojournalistic, unposed, high detail, no text overlay, no visible logos or brand names.

### 10. Why Join — For the Retail Ecosystem
- Save as: `assets/audience/digidukaan-retail-ecosystem.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary street photography, 35mm, natural light: a small loaded delivery tempo (three-wheeler mini-truck) piled with secured cardboard cartons and crates makes its way down a busy Indian general-trade market street lined with kirana shops and small storefronts, awnings and mixed signage without readable brand names, a driver in everyday work clothes at the wheel, a couple of candid background figures and shopkeepers going about their day. Wide establishing shot, camera along the street at a slight angle, vehicle in foreground/midground with the street receding into the background for depth, top-left of frame kept visually calm. Warm late-morning or golden-hour natural light, true unfiltered color grading, no blue tint. Mood: alive, in-motion, the everyday pulse of general-trade commerce — photojournalistic, unposed, high detail, no text overlay, no visible logos or brand names.

---

## Food and Beverages — 12 images

*Hero (`assets/hero/food-beverages.jpg`) already real — no generation needed.*

### 1. Structural Reality portrait
- Save as: `assets/reality/food-and-beverages.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Documentary photograph of a small independent Indian restaurant's working kitchen during dinner-rush prep, shot at chest height down a narrow stainless-steel prep line: a cook in his late 30s, wearing a genuinely worn apron over a plain t-shirt, sleeves rolled up, mid-action stirring a wok over an open gas flame, steam rising, spice tins and steel dabbas on a shelf behind him, a paper order ticket clipped nearby, blank unbranded insulated delivery bags stacked near the pass; warm amber practical kitchen lighting mixed with orange flame glow, shallow depth of field with the cook in sharp focus and background softly blurred; composition weighted toward the upper two-thirds of frame with the lower third left simple for a caption overlay; true natural color, no blue tint; photojournalistic, 35mm, high detail, no text overlay, no logos, no posed smiling.

### 2. Key Challenges panel
- Save as: `assets/challenges/food-and-beverages.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Tight documentary photograph of a restaurant delivery handoff at a small Indian eatery's takeaway counter: a counter staffer in a plain apron sealing an unbranded insulated delivery bag with tape, several mismatched takeaway bags and paper boxes stacked beside a delivery rider's helmet, a gloved hand reaching in from the side to collect an order; shot at counter height, 50mm equivalent, shallow depth of field with the kitchen doorway softly blurred behind; warm early-evening practical light, true natural color, no blue tint; vertical 3:4 composition with visual interest distributed through the full frame; photojournalistic, high detail, no text overlay, no visible logos or brand names, no posed hand-model look.

### 3. How it Works — Lower Commissions
- Save as: `assets/how-it-works/food-and-beverages-01-lower-commissions.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary-style photograph of a small Indian restaurant owner in their late 30s, wearing an apron loosened around the neck, seated at a cramped back-office desk reviewing a handwritten accounts ledger next to a basic calculator and a cooling cup of chai, a faint relieved half-smile on their face as they study the numbers; shot at 50mm, eye-level, warm soft interior lamp light, true natural color with no blue tint; calm, uncluttered negative space in the upper-left of frame; a shelf with menu cards and a wall calendar softly visible in the background; photojournalistic, high detail, 16:9 composition, no text overlay, no visible logos, no posed corporate-stock-photo smile.

### 4. How it Works — Multiple Demand Channels
- Save as: `assets/how-it-works/food-and-beverages-02-multiple-apps.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a small Indian restaurant's packing counter: a staffer in a plain apron in their late 20s folding shut a delivery box while glancing toward a small stand holding two or three smartphones propped side by side, each screen showing a deliberately blurred, generic order-notification interface with no legible logos, a printed paper order slip nearby; shot at counter height, 40mm equivalent, angled slightly down onto the phones and packing station; bright practical kitchen lighting mixing warm tube light with daylight from a side door, true natural color, no blue tint; simple uncluttered background in the upper-left of frame; photojournalistic, high detail, 16:9 composition, no text overlay, no visible app logos or brand names.

### 5. How it Works — Interoperable Delivery
- Save as: `assets/how-it-works/food-and-beverages-03-integrated-logistics.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a food delivery rider in his early 20s, wearing a plain unbranded helmet and light jacket, parked on an electric scooter just outside a small Indian restaurant's entrance at golden hour, receiving an unbranded insulated delivery bag handed out through the doorway by a restaurant staffer's arm, rider glancing at a phone mounted on the handlebar with a generic blurred screen before pulling away; shot from street level slightly below eye height, 35mm equivalent, warm early-evening natural light with shopfront lights beginning to glow, true natural color, no blue tint; modest commercial street backdrop with shop shutters softly visible; photojournalistic, high detail, 16:9 composition, no text overlay, no visible brand logos, sense of motion and urgency.

### 6. How it Works — Better Prices for Customers
- Save as: `assets/how-it-works/food-and-beverages-04-customer-pricing.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a young Indian customer in her early 20s, wearing a casual t-shirt, seated at a modest home dining table opening a delivered food order — lifting the lid off a paper container with a genuinely pleased, understated expression — a phone with a generic blurred receipt screen resting nearby, a steel water bottle and everyday home clutter softly visible on the table; shot at 50mm, eye level, soft natural daylight from a nearby window, warm true-to-life color with no blue tint; ordinary middle-class Indian home setting, not a showroom apartment; calm uncluttered space in the upper-left of frame; photojournalistic, high detail, 16:9 composition, no text overlay, no visible app branding, no exaggerated staged joy.

### 7. How it Works — Interoperable Network
- Save as: `assets/how-it-works/food-and-beverages-05-interoperable-network.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Wide documentary photograph of a small Indian food market lane at dusk, shopfront lights just switching on, lined with modest dhaba-style eateries and a cloud-kitchen-style unit with generic unbranded awnings and signage; two or three delivery riders in unbranded helmets and jackets are visible at different points along the lane — one collecting an order at a doorway, one parking a scooter, one riding away — with shopkeepers glimpsed in doorways in the middle distance; shot at 28mm equivalent from a slightly elevated street vantage, warm dusk light mixing with practical shopfront glow, true natural color, no blue tint; deep sense of depth and simultaneity conveying a connected network in motion; photojournalistic, high detail, 16:9 composition, no text overlay, no visible brand logos.

### 8. How it Works — Operational Quality
- Save as: `assets/how-it-works/food-and-beverages-06-operational-quality.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a food delivery rider in his mid-20s, wearing plain unbranded delivery gear with his helmet tucked under one arm, handing an intact, unbranded food delivery bag to a customer standing at their apartment doorway at early evening, both mid-handoff with a small natural nod and smile of appreciation, doorbell panel and house number softly visible for context; shot at 40mm equivalent, doorstep height, warm early-evening light with a porch light beginning to glow, true natural color, no blue tint; calm uncluttered space in the upper-left of frame for a numeral overlay; photojournalistic, high detail, 16:9 composition, no text overlay, no visible brand logos, unposed candid interaction.

### 9. Why Join — For Restaurants
- Save as: `assets/audience/food-and-beverages-restaurants.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary-style portrait of a small Indian restaurant owner in his mid-40s, wearing a chef's apron worn open over a plain shirt, standing with arms loosely crossed near the entrance of his own modest restaurant, a menu board and a few softly-focused set tables visible behind him, a small grounded, genuine expression of quiet pride, gaze level and unposed rather than staring into the camera; shot at 40mm equivalent, eye level, warm late-afternoon light mixing natural window light with the restaurant's own warm interior lighting, true natural color with no blue tint; uncluttered space in the upper-left of frame; photojournalistic, 35mm, high detail, 16:10 composition, no text overlay, no visible brand names or logos, dignity-of-labour framing.

### 10. Why Join — For Independent & Regional Food Brands
- Save as: `assets/audience/food-and-beverages-regional-brands.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian woman entrepreneur in her 40s, wearing an apron over a cotton saree, standing at a modest home-kitchen production table packing small-batch pickle into glass jars, a small weighing scale and a stack of empty jars nearby, simply labelled packaging with no legible brand name visible, focused and purposeful expression as she works; shot at 40mm equivalent, eye level, bright natural daylight streaming through a kitchen window, true natural color with no blue tint; uncluttered space in the upper-left of the frame; photojournalistic, high detail, 16:10 composition, no text overlay, no visible brand names or logos, authentic small-batch production feel rather than industrial factory.

### 11. Why Join — For Customers
- Save as: `assets/audience/food-and-beverages-customers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small group of three Indian friends in their mid-20s, casually dressed, sitting around a modest home dining table sharing a spread of home-delivered food from several different unbranded containers and tiffins — a curry, some snacks, a regional sweet — laughing and reaching for food mid-conversation, candid and unposed; shot at 35mm equivalent, eye level, warm cozy evening indoor lighting from a table lamp and ceiling light, true natural color with no blue tint; ordinary lived-in Indian home setting, not a showroom; uncluttered space in the upper-left of frame; photojournalistic, high detail, 16:10 composition, no text overlay, no visible brand logos, genuine candid joy rather than staged smiling.

### 12. Why Join — For Technology & Ecosystem Participants
- Save as: `assets/audience/food-and-beverages-tech-participants.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small team of two Indian software developers, a man and a woman in their late 20s wearing casual t-shirts, collaborating at a compact desk in a modest co-working space, one pointing at a laptop screen showing a generic blurred dashboard interface with no legible branding, the other gesturing toward a nearby whiteboard sketched with abstract boxes and arrows suggesting a logistics or order-flow diagram; shot at 40mm equivalent, eye level, bright clean daylight from a nearby window, true natural color with no blue tint; genuine candid collaborative body language, not posed for camera; uncluttered space in the upper-left of frame; photojournalistic, high detail, 16:10 composition, no text overlay, no visible logos or legible UI, modest real startup feel rather than glossy tech campus.

---

## Hyperlocal Logistics — 9 images

*Hero (`assets/hero/logistics.jpg`) and the Structural Reality photo (`assets/library/rider.jpg`) already real — no generation needed.*

### 1. Key Challenges panel
- Save as: `assets/challenges/hyperlocal-logistics.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photograph, portrait orientation, of a modest regional delivery-fleet yard in a mid-sized Indian city at dusk, rows of parked delivery scooters with cargo boxes and one loader three-wheeler receding into depth, several vehicles idle with tarps half-draped and a light dust film suggesting underuse, a corrugated-tin boundary wall, stacked empty delivery crates, a faded hand-painted signboard with an invented (non-brand) transport company name, a single sodium yard lamp just beginning to glow against fading golden-hour light; optionally a tired-looking fleet operator in his 40s-50s in a plain shirt holding a ledger, standing to one side surveying the yard; true natural color, no blue tint, moderate depth of field, weathered and real, not a corporate stock photo; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 2. How it Works — Multiple Logistics Partners
- Save as: `assets/how-it-works/hyperlocal-logistics-01-multiple-partners.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph, landscape 16:9, of a small Indian neighbourhood shop's dispatch counter mid-handoff: a shopkeeper in a rolled-sleeve shirt, a handheld barcode scanner nearby, passing a taped cardboard parcel out to a row of two or three delivery riders standing just outside, each wearing a different plain helmet color and a distinct generic (non-branded) jacket color, delivery scooters with cargo boxes parked behind them, market-street daylight flooding through the shop opening; shot from slightly outside looking in, medium-wide lens, eye level, simple uncluttered backdrop in the top-left corner; true natural midday color, no blue tint; candid mid-handoff moment, not posed; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 3. How it Works — Dynamic Routing & Allocation
- Save as: `assets/how-it-works/hyperlocal-logistics-02-dynamic-routing.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph, landscape 16:9, of a small hyperlocal dispatch desk inside a local fulfilment hub in India: a focused coordinator in a plain polo shirt, seated, one hand on a laptop trackpad, glancing at a second small monitor showing an abstract live map with multiple pin markers and route lines, a printed dispatch sheet with handwritten notes beside the keyboard, a phone lighting up with a notification just within reach; over-the-shoulder three-quarter angle, screens in sharp focus, simple plain backdrop in the top-left corner; warm ambient office light mixed with cool screen glow, true natural color, no blue tint; candid concentration, not posed; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no real map branding, no logos.

### 4. How it Works — Interoperable Network
- Save as: `assets/how-it-works/hyperlocal-logistics-03-interoperable-network.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary street photograph, landscape 16:9, of two Indian delivery riders from clearly different fleets (distinguished only by different plain helmet colors and different generic cargo-box styles, no real brand liveries) mid-handoff of a taped parcel outside a small urban dark-store or market lane, one rider just arrived on his scooter, the other about to continue the final leg, a handheld scanner briefly visible confirming the digital handoff; side-on three-quarter angle, parcel centered as the visual anchor, simple uncluttered backdrop in the top-left corner, late-morning natural daylight with real urban shadow and a touch of street haze, true natural color, no blue tint; candid working moment, not a posed handshake; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 5. How it Works — Execution at Scale (FIFO)
- Save as: `assets/how-it-works/hyperlocal-logistics-04-execution-fifo.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph, landscape 16:9, of a busy Indian hyperlocal fulfilment hub pickup counter at peak hour: sealed parcels arranged in clear sequential order along a shelf, a staff member in a plain apron checking a parcel against a handheld scanner and handing it to the next rider, two or three delivery riders queued single-file just behind (each in a different plain helmet/jacket color, no real brand liveries), one already reaching for his parcel; framed so the line of parcels and the queue of riders both read clearly, calm simple backdrop in the top-left corner, bright practical interior lighting from overhead LED strips with a shaft of natural daylight from a loading-bay door, true natural color, no blue tint; fast-paced but orderly, candid mid-action, not posed; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 6. Why Join — For Brands & Enterprises
- Save as: `assets/audience/hyperlocal-logistics-brands-enterprises.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph, landscape 16:10, of a mid-size Indian D2C brand's open-air loading dock: an operations manager in a collared shirt and hi-vis vest holding a tablet, checking off a loading manifest while two loaders place plain unbranded cardboard cartons onto two or three different delivery vehicles (a cargo three-wheeler and a small delivery van) parked side by side, all being loaded simultaneously; wide three-quarter angle from a slightly elevated position, simple uncluttered backdrop in the top-left corner, soft midday daylight, true natural color, no blue tint; organized and capable but grounded, not a fully-automated mega-warehouse; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 7. Why Join — For Logistics Operators
- Save as: `assets/audience/hyperlocal-logistics-logistics-operators.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph, landscape 16:10, of a busy regional delivery-fleet depot in India in the morning: a fleet operator in his 40s-50s, plain work shirt, standing near the yard entrance checking a phone showing a stream of incoming order requests with a satisfied, engaged expression, while two or three riders in the background mount their delivery scooters and a cargo three-wheeler, helmets on, one vehicle already pulling out of frame with a hint of motion; medium-wide shot, operator positioned to one side, simple open backdrop in the top-left corner, warm low morning daylight, true natural color, no blue tint; energized and busy, a clear contrast to an idle yard; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 8. Why Join — For Regional Delivery Operators
- Save as: `assets/audience/hyperlocal-logistics-regional-operators.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph, landscape 16:10, of a delivery rider in his 20s-30s, plain half-face helmet and generic non-branded jacket, seated on a scooter with a cargo box on a narrow commercial street in a smaller Indian tier-2 town, closely-set shopfronts and overhead wires in soft background focus, glancing at a phone mounted on the handlebar showing an order notification, road stretching ahead suggesting onward travel; eye-level medium shot, simple sky or facade in the top-left corner for a badge overlay, warm dusty natural daylight typical of a smaller town, true color, no blue tint; ambitious and forward-looking, candid not posed; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

### 9. Why Join — For Technology & Orchestration Players
- Save as: `assets/audience/hyperlocal-logistics-tech-partners.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph, landscape 16:10, of a modest Indian logistics-tech startup workspace: one engineer in a plain t-shirt seated at a laptop with genuine focus, a second engineer standing at a nearby whiteboard covered in abstract hand-drawn routing-system diagrams (boxes and arrows, no legible text), a monitor showing a stylised abstract network graph or map with colored route lines and pins representing live delivery allocation logic (generic UI, no real app branding); medium shot across the desk, screen and whiteboard both clearly visible, simple plain wall or window in the top-left corner, bright even daytime office light mixing daylight and ceiling light, true natural color, no blue tint, cool screen glow accent; real working moment, not a posed team photo; documentary photography, 35mm, natural light, photojournalistic, high detail, no text overlay, no logos.

---

## Impact Retail — 8 images

*Hero (`assets/hero/impact-retail.jpg`), the Structural Reality photo (`assets/library/sewing.jpg`), how-card "Seller Enablement Support" (`assets/library/workshop.jpg`), and the "For Farmers, Artisans & SHGs" row (`assets/library/group1.jpg`) already real — no generation needed.*

### 1. Key Challenges panel
- Save as: `assets/challenges/impact-retail.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photograph of a rural Indian artisan, woman in her 50s in a plain cotton saree with pallu tucked back for work, sitting cross-legged on a mat inside a modest mud-plastered village home, hand-tying a bundle of block-printed cloth wrapped in old newspaper and jute twine because no proper packaging is available; beside her a basic keypad phone and a handwritten order ledger, a small stack of unbranded handmade pottery and baskets nearby; through an open doorway behind her, an empty unpaved village lane visible in soft focus, suggesting isolation from delivery routes; single warm window-light source, late-morning natural light with real shadow falloff, true-to-life warm color grading, no blue tint; portrait orientation, medium shot from slightly low eye level, quietly concentrated expression, not looking at camera; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 2. How it Works — Digital Market Access
- Save as: `assets/how-it-works/impact-retail-01-market-access.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of an Indian grassroots producer, late 30s, in a plain cotton kurta, crouched at a small open-air roadside stall with goods spread on a cloth in front of them — baskets of turmeric and spices, jars of honey, and folded handloom textiles — holding up a smartphone to photograph one of the products, the screen showing a soft blurred generic product-listing interface with no legible text or logos; tarpaulin awning overhead, a bicycle and other soft-focused stall-holders in the background, ordinary small-town Indian market setting; bright natural midday daylight with real cast shadows, true warm color grading, no blue tint; landscape orientation, medium-wide shot at eye level, clean uncluttered top third of frame, candid unposed expression of quiet focus; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 3. How it Works — Shared Warehousing & Fulfilment
- Save as: `assets/how-it-works/impact-retail-02-warehousing-fulfilment.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph inside a functional mid-size postal and logistics sorting depot: rows of metal shelving stacked with plain brown cardboard parcels and canvas mail sacks, a worker in a plain khaki work uniform (no visible logos or insignia) hand-sorting and scanning a parcel with a handheld barcode scanner at a wide worktable, concentration on the task, not looking at camera; in the background, a second worker hefts a sack toward an open roller-shutter loading door where daylight and a parked delivery van are visible; scuffed concrete floor, stacked empty cartons in a corner, genuine working-warehouse wear and clutter, not a pristine corporate facility; practical mixed lighting — overhead fluorescent tubes plus natural daylight spilling through the open door; true-to-life color grading, kraft-brown and khaki tones, no blue tint; landscape orientation, wide establishing shot, moderate depth of field, clean uncluttered top-left corner of frame; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 4. How it Works — Aggregator-Led Scaling
- Save as: `assets/how-it-works/impact-retail-03-aggregator-scaling.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a community onboarding gathering in an Indian village courtyard under the shade of a large tree: a field coordinator carrying a clipboard and tablet sits with a mixed group of six farmers and self-help-group members — men and women, ages 20s to 60s, in everyday cotton sarees and work shirts — gathered in a loose semi-circle on plastic chairs and a woven charpai, some holding sacks of grain or baskets of produce, others looking together at a tablet screen with no legible text; genuine conversation, natural gestures, no one posing for the camera; warm late-morning daylight with dappled shade from the tree, real natural shadows, true warm color grading, no blue tint; landscape orientation, wide elevated three-quarter angle capturing the whole group, moderate depth of field, clean simple sky/foliage in the top of frame; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 5. How it Works — Better Discovery for Local Products
- Save as: `assets/how-it-works/impact-retail-04-product-discovery.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> High-angle flat-lay documentary-style photograph of a naturalistic spread of authentic regional Indian goods on a rustic wooden table draped with a worn cotton cloth: small jute sacks and brass bowls of turmeric and red chilli powder, a woven bamboo basket of millet snacks, a stack of neatly folded hand-block-printed textiles, a piece of hand-thrown terracotta craftware, and kraft-paper parcels tied with jute twine bearing illegible handwritten tags; a single adult hand entering from one side adjusting one of the items, sleeve of plain everyday clothing visible, no face; warm soft natural light falling diagonally across the spread from a window or doorway, rich true-to-life color grading celebrating turmeric yellow, chilli red, undyed cotton and terracotta tones, no blue tint; landscape orientation, close 45-degree flat-lay framing, shallow depth of field revealing tactile texture, simple uncluttered top of frame; photojournalistic, 35mm macro feel, high detail, no text overlay, no logos, no watermark.

### 6. Why Join — For Institutions & Aggregators
- Save as: `assets/audience/impact-retail-institutions-aggregators.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph inside a modest district-level field office in India: a wall map of a district dotted with pins, stacks of paper case files on a plain desk, a field coordinator in a simple collared shirt entering data into a laptop from a paper form held by a visiting farmer seated across the desk, a second SHG member waiting nearby with a folder of documents; genuine mid-conversation body language, no one looking at camera; functional, slightly worn office furniture, natural daylight from a window, soft and even, true-to-life color grading, no blue tint; landscape orientation, medium three-quarter shot across the desk, moderate depth of field, calm uncluttered top-left corner of frame; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 7. Why Join — For Buyers
- Save as: `assets/audience/impact-retail-buyers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an ordinary Indian person at home, casual homewear, seated at a warm lived-in kitchen or living-room table, having just opened a delivery parcel and unpacking regional goods onto the table — a small jar of raw honey, a folded piece of hand-block-printed fabric, and a small terracotta craft item — opened kraft-paper packaging beside them and a smartphone resting nearby with its screen blurred and illegible; genuine soft expression of quiet delight while touching the fabric, not looking at camera, not posed; warm soft natural window light, late-afternoon domestic quality, true-to-life color grading with warm wood and natural skin tones, no blue tint; landscape orientation, medium eye-level shot across the table, shallow depth of field, plain softly blurred background in the upper frame; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

### 8. Why Join — For Fulfilment & Ecosystem Partners
- Save as: `assets/audience/impact-retail-fulfilment-partners.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph at a small regional logistics dispatch yard in India, semi-urban district-town setting: two workers in plain unbranded work vests load sealed cardboard parcels and crates onto the open back of a delivery van, one lifting a box from a hand-trolley, the other arranging parcels inside the van, genuine physical coordination and effort, not looking at camera; a stack of remaining parcels waits on a pallet nearby, a modest compound wall and a two-wheeler visible in the background, dusty sun-baked ground; bright outdoor daylight, late-morning quality, real hard-edged natural shadows, true-to-life sun-baked color grading with dusty tones and kraft-brown parcels, no blue tint; landscape orientation, medium-wide eye-level shot, mid-action framing, moderate depth of field, simple uncluttered sky/wall in the top of frame; photojournalistic, 35mm, high detail, no text overlay, no logos, no watermark.

---

## Public Transport — 9 images

*Hero (`assets/hero/public-transport.jpg`) already real — no generation needed.*

### 1. Structural Reality portrait
- Save as: `assets/reality/public-transport.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Documentary photograph of a densely crowded Indian metro platform during evening rush hour, six to ten commuters of mixed age and gender in ordinary work clothing — office-goers with laptop bags, a woman in a saree, a man in a factory uniform, a student with a backpack — standing shoulder to shoulder waiting to board a train, one checking a paper ticket stub, others glancing at phones, nobody looking at the camera; shot from a slightly elevated three-quarter angle with a compressed 80mm-equivalent perspective, crowd filling the upper two-thirds of a portrait frame, lower third easing into soft out-of-focus platform flooring and shadow; cool fluorescent platform lighting mixed with warm ambient spill, true-to-life color, no blue tint; photojournalistic, candid, high detail, no text overlay, no legible signage or logos, no AI artifacts.

### 2. Key Challenges panel
- Save as: `assets/challenges/public-transport.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photograph at an Indian state bus depot ticket window: a middle-aged male clerk in a plain khaki uniform hands a strip of paper tickets through a worn counter window to a woman commuter in a kurta reaching in with cash, two more commuters queued behind her, one glancing at her phone impatiently; worn paint, a hand-written fare chart taped beside the window, a ceiling fan overhead, dusty depot clutter; portrait 3:4 framing shot from just behind the queue looking toward the window, counter and hands in sharp focus, queue softly receding behind; practical daylight mixed with warm incandescent glow, true-to-life muted color, no blue tint; candid, unposed, photojournalistic, high detail, no text overlay, no visible corporation names or logos, no AI artifacts.

### 3. How it Works — Integrated Metro Access
- Save as: `assets/how-it-works/public-transport-01-metro-access.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of a young Indian professional in smart-casual office wear tapping a smartphone against the contactless reader of an automatic fare gate at a modern metro station, gate panel open, mid-stride, natural unposed expression, not looking at camera; stainless-steel turnstile array and bright architectural concourse lighting in the background, one or two other commuters passing through adjacent gates softly out of focus; landscape 16:9 framing, subject right-of-center with open, slightly darker concourse space in the top-left corner; bright cool-neutral LED lighting with a touch of ambient warmth, true-to-life color, no blue tint; photojournalistic, high detail, no text overlay, no visible operator logos or signage, no AI artifacts.

### 4. How it Works — Single Integration, Many Apps
- Save as: `assets/how-it-works/public-transport-02-many-apps.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian commuter's hands holding a smartphone at a city bus stop, screen showing a generic blurred booking/messaging-style interface with no legible logos or text, thumb mid-scroll; a city bus or auto-rickshaw waiting softly out of focus in the background street scene; shallow depth of field, 85mm portrait-lens feel, phone sharp in the center of a landscape 16:9 frame with plain, slightly darker negative space in the top-left corner; soft natural outdoor daylight, true-to-life color, no blue tint; photojournalistic, high detail, no text overlay, no real app logos or brand names, no AI artifacts.

### 5. How it Works — Multi-Modal Journey Enablement
- Save as: `assets/how-it-works/public-transport-03-multimodal-journey.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian commuter, a working professional in everyday city clothing, stepping out of an auto-rickshaw and striding toward the entrance of a city metro station or bus stop, bag in hand, mid-transition between the two modes of transport, not looking at camera; the rickshaw driver partially visible in the background going about his business, generic unbranded station facade or bus in frame; medium-wide landscape 16:9 shot with the commuter positioned center-right and simpler background (sky, facade) opening up the top-left corner; bright natural daylight on an ordinary Indian city street, true-to-life color, no blue tint; photojournalistic, candid, high detail, no text overlay, no visible brand names or logos, no AI artifacts.

### 6. How it Works — Operational Efficiency for Authorities
- Save as: `assets/how-it-works/public-transport-04-operational-efficiency.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian transit authority operations staff member in their 40s, wearing a plain collared shirt with an ID lanyard, seated at a desk in a real, slightly utilitarian control-room office, reviewing a computer screen showing blurred dashboard-style charts and numbers suggesting ridership and settlement data, a second monitor or wall display with a generic stylized transit map softly visible behind; three-quarter angle from behind and to the side, operator positioned right-of-center in a landscape 16:9 frame with darker, simpler background in the top-left corner; even cool fluorescent office lighting mixed with soft monitor glow, true-to-life color, not deliberately blue-tinted; photojournalistic, high detail, no text overlay, no real logos or legible UI, no AI artifacts.

### 7. Why Join — For Authorities
- Save as: `assets/audience/public-transport-authorities.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian metro station manager, a composed man or woman in their 40s wearing a collared uniform shirt with an ID lanyard, standing on a bright, modern metro platform, glancing down the platform or checking a handheld radio as a train arrives in the background, generic unbranded signage visible; medium shot at eye level, subject left-of-center in a landscape 16:10 frame with the platform and train softly receding behind, top-left corner kept simple and slightly darker; bright clean daylight or architectural LED lighting, true-to-life neutral-cool color, no blue tint; photojournalistic, high detail, no text overlay, no real operator names or logos, no AI artifacts.

### 8. Why Join — For Consumer Apps
- Save as: `assets/audience/public-transport-consumer-apps.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a young Indian product designer, casual smart clothing, at a modest desk in a modern but unglamorous startup office, working at a laptop showing a blurred generic map and route-planning interface with no legible logos or text, a printed wireframe sketch of a combined bus-metro-cab journey nearby, coffee cup and sticky notes on the desk, city street faintly visible through a window behind; medium shot at desk height with both the person and the blurred screen visible, subject centered in a landscape 16:10 frame with simpler, slightly darker space in the top-left corner; soft window daylight mixed with warm screen glow, true-to-life color, no blue tint; photojournalistic, candid, high detail, no text overlay, no real app logos or brand names, no AI artifacts.

### 9. Why Join — For Commuters
- Save as: `assets/audience/public-transport-commuters.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a young Indian commuter, a college student or young professional in everyday city clothing, walking naturally through a bright, sunlit metro station concourse or toward a waiting city bus, smartphone held loosely showing a blurred, generic digital ticket/QR screen, relaxed unhurried body language, not looking at camera; some open depth and daylight visible behind them rather than a crowded frame; medium-wide eye-level shot, subject left-of-center in a landscape 16:10 frame with simpler, slightly darker space in the top-left corner; bright warm natural daylight, true-to-life color, no blue tint; photojournalistic, candid, high detail, no text overlay, no real operator or app logos, no AI artifacts.

---

## Shared Mobility — 9 images

*Hero (`assets/hero/shared-mobility.jpg`) and the "For Drivers & Fleet Owners" photo (`assets/library/rider.jpg`) already real — no generation needed.*

### 1. Structural Reality portrait
- Save as: `assets/reality/shared-mobility.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian ride-hailing driver, late 30s to late 40s, in a plain checked shirt, sitting in the driver's seat of a worn hatchback at a roadside taxi stand during a lull between trips, glancing at a handheld phone while a second phone mounted on the dashboard shows a blurred, generic fare/map screen; worn seat cover, small rear-view mirror charm, folded gamcha on the dash, water bottle in the door pocket; soft natural daylight through the windshield, real shadows, true-to-life warm-neutral color, no blue tint; portrait orientation, subject in the upper two-thirds of frame with simple, uncluttered space in the lower third; shallow depth of field, 50mm, photojournalistic, high detail, no text overlay, no logos, no brand names visible.

### 2. Key Challenges panel
- Save as: `assets/challenges/shared-mobility.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Over-the-shoulder documentary photograph looking across an Indian ride-hailing driver's dashboard and front seat during a break: two or three phones in different mount brackets each showing a blurred, generic ride-hailing map or fare screen, a handwritten notebook open on the passenger seat with scrawled trip tallies, loose coins and small currency notes in the cup-holder, a worn fare-meter bracket at the frame's edge, and a driver's hand entering from one side resting near the wheel; window-filtered daylight mixed with cool phone-screen glow, real shadows between the clutter, natural true color with no blue tint; steep three-quarter high angle filling the 3:4 frame edge-to-edge with dense, lived-in detail; moody, lower-key exposure, photojournalistic, 35mm, high detail, no text overlay, no logos, no brand names visible.

### 3. How it Works — Open Mobility Infrastructure
- Save as: `assets/how-it-works/shared-mobility-01-open-infrastructure.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian commuter standing at a city roadside in the early evening, looking down at a smartphone displaying a blurred, generic ride-booking map with a route line and pickup pin, while in the softly blurred background an auto-rickshaw, a sedan taxi, and a bike-taxi rider wait or pass by, none carrying visible brand markings; warm golden low-angle light giving gentle rim-light on the vehicles and a natural glow on the phone screen; medium shot, subject right-of-center, simple uncluttered space in the top-left corner; true-to-life warm color grading, no blue tint; landscape 16:9 composition, photojournalistic, 35mm, high detail, no text overlay, no legible app logos or brand names, no AI artifacts.

### 4. How it Works — Subscription Models
- Save as: `assets/how-it-works/shared-mobility-02-subscription-models.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian ride-hailing driver, 30s to 50s, seated in his parked auto-rickshaw or sedan taxi during a break, holding a smartphone showing a blurred, generic flat-fee subscription screen, with a small paper notebook open on his knee showing pencil-tallied numbers and a few folded currency notes tucked in its spine; calm, quietly relieved expression, not looking at camera; soft natural daylight filtering through the open vehicle door, warm worn-upholstery tones, true-to-life color with no blue tint; medium-close 50mm-equivalent shot, diagonal composition, simple uncluttered space in the top-left corner; landscape 16:9, photojournalistic, high detail, no text overlay, no logos or legible brand names, no AI artifacts.

### 5. How it Works — Cooperative Networks
- Save as: `assets/how-it-works/shared-mobility-03-cooperative-networks.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of three or four Indian auto-rickshaw and taxi drivers gathered at a modest, informal cooperative taxi stand, mid-conversation while one holds a clipboard or register book and the others lean in pointing and nodding, their parked autos and a sedan visible softly behind them, a laminated signboard with generic, non-legible wording visible in soft focus; natural midday daylight with soft shadows from a tin awning, warm true-to-life color with no blue tint; medium-wide group shot at eye level, candid clustering rather than a posed row, simple uncluttered space in the top-left corner; landscape 16:9, photojournalistic, high detail, no text overlay, no legible brand names or logos, no AI artifacts.

### 6. How it Works — Distributed Demand
- Save as: `assets/how-it-works/shared-mobility-04-demand-distribution.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Wide documentary photograph of a busy Indian city street or taxi stand with a loosely spread row of auto-rickshaws, sedan taxis, and a bike-taxi rider, several drivers checking phones mounted on handlebars or dashboards, one vehicle pulling away with a passenger and another arriving, suggesting continuous, well-distributed activity rather than an idle queue; bright, slightly hazy midday city light with real cast shadows from nearby buildings, true-to-life sun-faded color with no blue tint; wide, slightly elevated three-quarter angle, vehicles spread across the width of frame, simple uncluttered space in the top-left corner; landscape 16:9, photojournalistic, 35mm, high detail, no text overlay, no legible logos, license plates, or brand names, no AI artifacts.

### 7. Why Join — For Platforms & Operators
- Save as: `assets/audience/shared-mobility-platforms-operators.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian mobility fleet coordinator, 30s to 40s, in a simple collared shirt, working at a desk in a compact, practical dispatch office: a laptop or monitor showing a blurred, generic vehicle-tracking map, a printed city map with marked routes pinned to the wall, a phone in hand for coordinating drivers, and a whiteboard with illegible handwritten notes nearby; lean, functional small-business space with a ceiling fan and exposed conduit, not a glossy startup office; practical mixed indoor lighting from an overhead tube light and a window, true-to-life color with no blue tint; medium eye-level shot, subject off-center with the wall map filling the remaining space, simple calm area in the top-left corner; landscape 16:10, photojournalistic, high detail, no text overlay, no legible logos or software branding, no AI artifacts.

### 8. Why Join — For Regional Networks
- Save as: `assets/audience/shared-mobility-regional-networks.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian regional transport union coordinator, 40s to 50s, in simple everyday office wear, seated at a wooden desk in a modest small-town office transcribing entries from a large paper register book onto a basic tablet showing a blurred, generic digital roster screen, a wall calendar visible nearby and a glimpse of a quieter small-town street with a few parked autos through an open door or window; natural window daylight mixed with a bare overhead bulb, worn wood-desk browns and faded paper tones, true-to-life color with no blue tint; medium eye-level shot bridging the paper register and the screen in one glance, subject off-center, simple calm space in the top-left corner; landscape 16:10, photojournalistic, high detail, no text overlay, no legible branding, no AI artifacts.

### 9. Why Join — For Technology Enablers
- Save as: `assets/audience/shared-mobility-tech-enablers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of one or two Indian software developers, 20s to 30s, in casual everyday work clothing, working at laptops in a modest, unglamorous mobility-tech startup office, one laptop screen showing a blurred, generic map interface with route lines and dispatch markers, a whiteboard behind them sketched with rough, illegible boxes-and-arrows dispatch-flow diagrams, a steel chai tumbler and tangled charging cables on the desk, small potted plant nearby; natural window daylight mixed with cool laptop-screen glow, true-to-life color with no blue tint; medium eye-level shot with the whiteboard diagram softly legible-as-shapes behind the subject, simple calm space in the top-left corner; landscape 16:10, photojournalistic, high detail, no text overlay, no legible logos or software branding, no AI artifacts.

---

## Tourism — 10 images

*Hero (`assets/hero/tourism.jpg`) already real — no generation needed.*

### 1. Structural Reality portrait
- Save as: `assets/reality/tourism.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Documentary photograph at Hampi, Karnataka, India, early morning soft light. A local heritage guide in his mid-40s, wearing a simple cotton kurta, gestures toward carved stone relief on an ancient temple wall amid weathered granite boulder ruins and a partially visible carved gopuram. Two young Indian travellers in casual travel clothing listen attentively nearby, one holding a phone lowered at their side, not taking a photo. Dusty stone steps and dry scrub grass surround them; no modern signage, ticket booths, or QR codes visible. Shot on a 35mm lens, slightly low angle, shallow depth of field with guide and visitors sharp against a softly blurred ruin backdrop, natural warm morning color, true-to-life tones of sandstone and ochre, photojournalistic and unposed, portrait orientation 4:5, high detail, no text overlay, no watermark.

### 2. Key Challenges panel
- Save as: `assets/challenges/tourism.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photograph of a desert safari camel operator in Jaisalmer, Rajasthan, India, late afternoon golden light. A man in his mid-50s with a weathered sun-lined face and thick moustache, wearing a bright saffron-orange turban and plain off-white kurta-pyjama, stands beside his camel next to a hand-painted wooden signboard reading "Sunset Desert Safari," holding a worn paper ledger and loose ticket stubs instead of any phone or device. In the soft-focus background, a scatter of other small independent operators with their own camels and mismatched hand-lettered signs suggest fragmented, disconnected tourism supply. Shot at eye level, three-quarter angle, natural warm desert light with visible sand and scrub texture, true-to-life sandy and saffron tones, photojournalistic and unposed, portrait orientation 3:4, high detail, no text overlay, no watermark, no digital devices visible.

### 3. How it Works — Digitised Access to Monuments
- Save as: `assets/how-it-works/tourism-01-digitised-access.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph at the entrance of an ASI-protected monument resembling Qutub Minar, Delhi, India, midday soft light. An Indian woman in her early-to-mid 30s, hair tied back, wearing a plain windcheater with an ID lanyard over a salwar kameez, scans a visitor's phone QR-code ticket on a handheld device at a small kiosk positioned against the red sandstone gateway. A young male visitor in casual travel clothes holds up his phone screen toward her; two more visitors wait in a loose queue behind, unposed. The real red sandstone minaret and archway rise softly focused in the background. Shot at chest height, medium-wide documentary framing, natural warm midday light, true-to-life sandstone and ochre tones, photojournalistic, candid, no exaggerated smiles, widescreen 16:9, high detail, no text overlay, no logos, no watermark.

### 4. How it Works — Single Integration for Bookings
- Save as: `assets/how-it-works/tourism-02-single-integration.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph at the ghats of Varanasi, India, early morning with soft mist rising off the Ganges and warm low golden sunlight. A boatman in his 40s, sun-weathered, wearing a simple cotton vest and dhoti, steadies his wooden rowboat against worn stone steps while a young traveller in practical travel clothing and a light shawl shows him her phone screen to confirm a boat-ride booking before stepping aboard. Layered stone ghats, a few other moored wooden boats, and the misty river recede softly into the background. Shot from slightly above eye level, medium-wide documentary framing, warm natural tones, true-to-life color with no blue tint, photojournalistic and candid, atmospheric but grounded, widescreen 16:9, high detail, no text overlay, no app logos, no watermark.

### 5. How it Works — Seamless Discovery of Experiences
- Save as: `assets/how-it-works/tourism-03-seamless-discovery.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph outside Amber Fort, Jaipur, Rajasthan, India, late afternoon warm golden light on honey-colored sandstone ramparts and honeycomb facade. A young Indian male traveller in his late 20s, wearing a breathable travel shirt with a daypack slung on one shoulder and sunglasses pushed up on his head, stands scrolling through a simple list of nearby experiences on his phone, genuinely absorbed rather than posing. The hill-fort silhouette rises softly focused behind him, with one or two other travellers faintly visible in the middle distance also checking their phones or maps. Shot at near-eye-level, medium framing, traveller positioned right of center, natural warm late-day light, true-to-life sandstone and sky tones, photojournalistic and candid, widescreen 16:9, high detail, no text overlay, no app logos, no watermark.

### 6. How it Works — Digital Growth for Local Operators
- Save as: `assets/how-it-works/tourism-04-digital-growth.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph on the deck of a traditional wooden kettuvallam houseboat moored at a palm-lined backwater jetty near Alappuzha, Kerala, India, soft humid mid-morning light. An Indian woman in her late 30s to early 40s, wearing a simple cotton saree with sleeves rolled up, hair tied back, stands confidently checking a tablet showing a booking calendar with several upcoming reservations. Behind her, the boat's curved thatched bamboo-and-coir roof frames the top of the shot, and a young crew member in a plain t-shirt coils a mooring rope in the softly blurred background, with the calm green backwater channel and coconut palms beyond. Shot at deck height, medium-wide framing, subject center-right, true-to-life lush green and warm tones, photojournalistic and candid, quietly confident mood, widescreen 16:9, high detail, no text overlay, no logos, no watermark.

### 7. Why Join — For Cultural Institutions
- Save as: `assets/audience/tourism-cultural-institutions.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph inside a National Museum gallery hall in India, high ceilings, glass display cases, warm spotlighting on artefacts against cooler ambient hall light. An Indian woman curator in her early 30s, hair tied back, wearing a simple kurta with an ID lanyard, holds a tablet angled toward a glass case containing an ancient bronze sculpture, focused on cataloguing the piece. Other display cases and interpretive plaques recede softly down the gallery corridor behind her. Shot at eye height, medium framing, curator and case in the right two-thirds of the frame, true-to-life warm bronze and neutral museum tones, photojournalistic and candid, professional and purposeful mood, landscape 16:10, high detail, no text overlay, no signage, no watermark.

### 8. Why Join — For Experience Providers
- Save as: `assets/audience/tourism-experience-providers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph in a narrow lane of Jodhpur's old blue city, Rajasthan, India, midday light softened by shade with occasional sun shafts on indigo-washed walls. An Indian heritage guide in his mid-30s, short trimmed beard, wearing a simple collared shirt, gestures upward toward an ornately carved wooden jharokha balcony on an old haveli, while a small group of four travellers of mixed ages, dressed for a warm walking day, follow his gaze and listen attentively, a couple holding phones down at their sides. Weathered blue-washed walls, stepped stone lane, and strings of drying marigolds add authentic texture. Shot at eye level, medium-wide framing from slightly behind the group, guide center-right, true-to-life indigo and terracotta tones, photojournalistic and candid, warm engaging mood, landscape 16:10, high detail, no text overlay, no branding, no watermark.

### 9. Why Join — For Travel Apps
- Save as: `assets/audience/tourism-travel-apps.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph in a modest travel-tech startup office in an Indian city, soft natural window light, exposed brick or simple whiteboard wall, a potted plant, and a corkboard behind the desk pinned with a printed India tourist map and a few destination photographs. An Indian woman in her late 20s, wearing a smart-casual kurta, leans in pointing at a laptop screen showing a simple unbranded map-and-itinerary interface, while a male colleague in his early 30s in a casual button-down shirt listens and rests a hand on the trackpad, both genuinely mid-conversation. Shot at seated eye level, three-quarter angle, medium framing, true-to-life warm daylight tones, photojournalistic and candid, focused collaborative mood, landscape 16:10, high detail, no text overlay, no logos, no watermark.

### 10. Why Join — For Travellers
- Save as: `assets/audience/tourism-travellers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph in a sunlit courtyard of a heritage haveli homestay in Udaipur, Rajasthan, India, bright warm late-morning light with strong directional shadows on carved sandstone. Two young Indian women in their mid-20s, dressed in comfortable loose cotton kurtas, one with a light dupatta, stand candidly together — one holding up her phone with a pleased expression checking a booking confirmation, the other glancing past her toward an ornate carved stone jharokha window with a soft-focus glimpse of Lake Pichola and hills beyond. Small daypacks rest beside them, a potted bougainvillea adds warm pink color in the courtyard corner. Shot at eye level, medium framing, subjects left-of-center, true-to-life warm sandstone and sky tones, photojournalistic and candid, genuinely joyful unposed mood, landscape 16:10, high detail, no text overlay, no app branding, no watermark.

---

## About Us — 15 images

*Hero (`assets/library/launch.jpg`), the Structural Reality photo (`assets/library/ondc.jpg`), and the "Careers @ ONDC" photo (`assets/library/portrait.jpg`) already real — no generation needed.*

### 1. Key Challenges panel
- Save as: `assets/about/challenges-panel.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Documentary photograph of an Indian kirana shopkeeper, a man in his late 40s in a worn collared shirt, standing behind his counter checking a basic smartphone with a blurred generic order screen next to a handwritten ledger, densely packed shelves of everyday household goods behind him; through the open shopfront in the background, a delivery rider on a motorbike with an insulated delivery box passes softly out of focus along the bazaar lane; warm late-afternoon natural light mixed with a single interior bulb, real uneven shadows, true-to-life color with no blue tint; vertical 3:4 composition, medium shot at eye level, shallow depth of field separating shopkeeper from street; photojournalistic, 35mm, high detail, no text overlay, no visible logos or brand names, no AI artifacts.

### 2. Focus Areas — Retail
- Save as: `assets/about/focus-retail.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian kirana shop owner, mid-30s, standing at his counter using a handheld tablet to check a fulfilment order, densely packed shelves of packaged household goods behind him and a few sealed parcels on the counter ready for pickup; warm daylight from a shopfront window, true-to-life color with no blue tint, moderate depth of field with the shopkeeper in sharp focus; landscape 16:9 composition, subject positioned right-of-center with calm, uncluttered negative space in the upper-left corner; photojournalistic, 35mm, high detail, candid unposed expression, no text overlay, no visible brand logos, no AI artifacts.

### 3. Focus Areas — Logistics
- Save as: `assets/about/focus-logistics.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian delivery rider, mid-20s, wearing a plain half-helmet and unbranded jacket, standing beside his motorbike loaded with an insulated delivery box while checking a route on a phone mounted on the handlebar; a second rider softly out of focus in the background loads parcels onto another bike, suggesting a small fleet dispatch point at a street corner or market edge; early-morning golden natural light, true-to-life color with no blue tint, real environmental context not a studio backdrop; landscape 16:9 composition, subject right-of-center with calm negative space in the upper-left corner; photojournalistic, 35mm, high detail, candid unposed, no visible logos or livery, no text overlay, no AI artifacts.

### 4. Focus Areas — Mobility, Travel & Experiences
- Save as: `assets/about/focus-mobility-travel.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian auto-rickshaw driver, mid-30s, seated in his vehicle glancing at a smartphone mounted on the dashboard showing a blurred generic navigation screen, shot through the open side of the vehicle at eye level with a real city street and a softly out-of-focus bus stop visible behind him; bright soft midday natural light, true-to-life color with no blue tint, moderate depth of field keeping the driver sharp and the street context gently blurred; landscape 16:9 composition, driver centered with calm negative space in the upper-left corner; photojournalistic, 35mm, high detail, candid unposed, no visible app logos or transit branding, no text overlay, no AI artifacts.

### 5. Focus Areas — Financial Services
- Save as: `assets/about/focus-financial-services.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian woman small-business owner, mid-40s, in everyday work attire, seated at a modest desk reviewing a blurred generic approval screen on a tablet, with a banking correspondent softly out of focus across from her holding a printed form, in an unpretentious small-business interior lit by soft warm window light; true-to-life color with no blue tint, moderate depth of field keeping the primary subject sharp; landscape 16:9 composition, subject positioned right-of-center with calm negative space in the upper-left corner; photojournalistic, 35mm, high detail, candid unposed, no visible institutional logos, no text overlay, no AI artifacts.

### 6. Our Ecosystem — Buyer Applications
- Save as: `assets/about/ecosystem-buyer-apps.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a young Indian woman, mid-20s, in casual home clothing, seated comfortably on a sofa near a window, browsing a smartphone showing a blurred generic product-grid shopping app; soft natural daylight, true-to-life warm color with no blue tint, shallow depth of field with the phone and face in sharp focus and the home interior softly resolved behind; landscape 16:10 composition, subject in the upper two-thirds of frame with a calmer, simpler lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible app logos or brand names, no text overlay, no AI artifacts.

### 7. Our Ecosystem — Seller Applications
- Save as: `assets/about/ecosystem-seller-apps.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian woman entrepreneur, late-20s, in a simple apron over a kurta, standing at a small workshop counter photographing a handcrafted product with a smartphone propped on a stand, neatly arranged product samples and packaging nearby; bright even natural window light, true-to-life color with no blue tint, standard depth of field with the seller and product in sharp focus; landscape 16:10 composition, subject in the upper-mid frame with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible marketplace logos, no text overlay, no AI artifacts.

### 8. Our Ecosystem — Logistics Partners
- Save as: `assets/about/ecosystem-logistics-partners.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian logistics worker, mid-20s, wearing a plain unbranded hi-vis vest, scanning a parcel label with a handheld scanner at a modest sorting table, crates and stacked boxes of varying sizes around him bound for different routes; even practical daylight, true-to-life color with no blue tint, standard depth of field with hands and parcel in sharp focus; landscape 16:10 composition, subject centered with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible courier logos, no text overlay, no AI artifacts.

### 9. Our Ecosystem — Payment Providers
- Save as: `assets/about/ecosystem-payment-providers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph at a small Indian shop counter: a customer holds up a smartphone to scan a static QR code payment sticker near the till, while the shopkeeper, mid-40s in simple work attire, waits with familiar routine body language; warm interior shop lighting mixed with daylight from a nearby doorway, true-to-life color with no blue tint, moderate depth of field keeping the payment moment sharp; landscape 16:10 composition, subject centered with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible payment-app or bank logos, no text overlay, no AI artifacts.

### 10. Our Ecosystem — Technology Service Providers
- Save as: `assets/about/ecosystem-technology-providers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small team of Indian software engineers, mixed genders, mid-20s to late-30s, in casual office wear, gathered around a laptop showing a blurred generic architecture diagram, one pointing at the screen while another takes notes, a whiteboard with rough illegible system sketches behind them in an unpretentious modern Indian tech office; bright even daylight from large windows, true-to-life color with no blue tint, standard depth of field with the group in sharp focus; landscape 16:10 composition, group positioned center-right with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no legible logos or diagram text, no text overlay, no AI artifacts.

### 11. Our Ecosystem — Enterprise Participants
- Save as: `assets/about/ecosystem-enterprise-participants.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of the interior of a mid-size Indian organized warehouse, rows of steel shelving stacked with uniform unbranded cartons receding down a wide aisle, a worker in a plain hi-vis vest checking a handheld scanner against the stacked goods; practical mixed overhead and daylight warehouse lighting, true-to-life neutral color with no blue tint, moderate depth of field with the worker in sharp focus and the aisle softly resolved into the distance; landscape 16:10 composition, worker positioned right-of-center with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible company branding, no text overlay, no AI artifacts.

### 12. Our Ecosystem — MSMEs & Local Businesses
- Save as: `assets/about/ecosystem-msmes-local-businesses.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian small-scale producer, a woman in her 40s in a simple work apron, packing handcrafted jars into a box at her home workshop, spools of thread and finished packaged products stacked nearby ready for dispatch; warm natural window light, true-to-life color with no blue tint, standard depth of field with hands and work in sharp focus, workshop softly resolved behind; landscape 16:10 composition, subject positioned center-left with a calmer, slightly darker lower-left zone; photojournalistic, 35mm, high detail, candid unposed, no visible brand names, no text overlay, no AI artifacts.

### 13. Get Involved — Investor Relations
- Save as: `assets/about/investor-relations.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of three Indian professionals — a woman in her late 30s in smart-casual attire, a greying man in his 50s in a collared shirt, and a younger analyst taking notes on a laptop — seated around a table in an unpretentious modern office meeting room, reviewing a plain bound report and a laptop showing a blurred generic bar chart, a whiteboard and plants visible behind them, soft window daylight mixed with warm interior light; true-to-life color with no blue tint, moderate depth of field with the group and documents in sharp focus; landscape 16:10 composition, group positioned in the lower two-thirds with a simpler, muted top-left corner; photojournalistic, 35mm, high detail, candid unposed engagement, no visible logos or legible data, no text overlay, no AI artifacts.

### 14. Get Involved — Board of Directors
- Save as: `assets/about/board-of-directors.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of five to six Indian professionals, mixed genders and ages from mid-30s to mid-60s, some in formal dark suits and others in business-casual blazers, seated around a substantial conference table in a modern institutional boardroom with large windows, mid-discussion with papers, a laptop, and water glasses on the table, natural gesturing and listening body language; soft even daylight mixed with warm interior lighting, true-to-life color with no blue tint, moderate depth of field keeping the group clearly resolved; landscape 16:10 composition, group spread center-to-right with a calmer top-left corner; photojournalistic, 35mm, high detail, candid unposed, no government emblems or insignia, no text overlay, no AI artifacts.

### 15. Get Involved — Rewards & Recognition
- Save as: `assets/about/rewards-recognition.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of an Indian professional, mid-40s, in formal business attire, receiving a plain unbranded glass award plaque on stage at a policy/industry forum, shaking hands with a presenter in similarly formal attire, a softly blurred audience visible below the stage and a simple podium backdrop free of logos or event branding; warm balanced stage lighting, true-to-life color with no theatrical colored gels or blue tint, moderate depth of field with the two figures and award in sharp focus; landscape 16:10 composition, moment positioned center-right with a calmer, darker top-left corner; photojournalistic, 35mm, high detail, candid genuine expression, no visible logos or branding, no text overlay, no AI artifacts.
