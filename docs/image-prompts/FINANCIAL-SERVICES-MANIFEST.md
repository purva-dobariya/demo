# ONDC Financial Services Pages — Image Generation Manifest

Covers the three new category pages: **Credit**, **Investments** and **Insurance**.

**27 images below need to be generated** (9 per page). Each of those 27 slots currently renders `assets/placeholder.svg`, so the pages look complete but visually blank in the photo areas. Every placeholder `<img>` already carries a `data-target-src` attribute naming the exact file it is waiting for — generate the image, save it under that exact path, then run the one-line swap in "Wiring the images in" below.

The three hero backgrounds already have real photos in place (`assets/hero/credit.jpg`, `assets/hero/investments.jpg`, `assets/hero/insurance.jpg`) and need no generation.

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
| 16:10 landscape | "Why Join ONDC" audience rows | 16:9 landscape | Yes — trim a thin strip off one long edge to land on 16:10 |

All prompts already specify "no text overlay, no logos, no watermark" — reject any Flow output that ignores this and regenerate. Financial-services imagery is especially prone to picking up bank logos, legible currency notes, card faces and policy documents — check each output for these and regenerate rather than retouching.

### Wiring the images in

Once the files are saved in the right folders, point the pages at them by swapping each placeholder `src` for its `data-target-src`. From the project root:

```bash
node -e "const fs=require('fs');for(const f of ['Credit.html','Investments.html','Insurance.html']){fs.writeFileSync(f,fs.readFileSync(f,'utf8').replace(/src=\"assets\/placeholder\.svg\" data-target-src=\"([^\"]+)\"/g,'src=\"\$1\"'),'utf8')}"
```

Run it only after all 27 files exist — it swaps every slot on all three pages at once. To do a page at a time, drop the other filenames from the array.

---

## Credit — 9 images

Generate one image per prompt below. After each download, rename the file to the exact name given under "Save as" and place it in that path's subfolder under `assets/` (i.e. `assets/reality/`, `assets/challenges/`, `assets/how-it-works/` or `assets/audience/`) — these 9 files all belong to the Credit page only.

### 1. Structural Reality portrait
- Rename the download to: `assets/reality/credit.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian small shopkeeper in their 30s or 40s standing behind the counter of a modest neighbourhood store, holding a worn paper notebook of handwritten credit entries and looking down at it with a quietly worried, thoughtful expression, not looking at camera; shelves of unbranded packaged goods softly out of focus behind, a small calculator and a smartphone face-down on the counter; single window casting soft directional daylight from the left, plain plastered wall; portrait orientation with generous empty space and soft shadow in the lower third of frame; true-to-life warm colour grading, no blue tint, shallow depth of field, 50mm, photojournalistic, high detail, no text overlay, no legible handwriting, no logos, no visible currency notes.

### 2. Key Challenges panel
- Rename the download to: `assets/challenges/credit.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Overhead documentary photograph shot from directly above a wooden table covered with the paperwork of an Indian loan application: several stacked blank multi-page forms, a plain manila folder, photocopies of unreadable documents, a pen, a calculator, and a smartphone showing a blurred generic form interface, with an applicant's hands entering from the edge of frame shuffling through the pile; dense, lived-in clutter filling the 3:4 frame edge-to-edge; single-source directional lighting creating real shadows between the papers, moody but natural colour, no blue tint; portrait orientation, photojournalistic, 35mm, high detail, no text overlay, no legible document text, no logos, no bank names, no currency notes.

### 3. How it Works — Open Lending Infrastructure
- Rename the download to: `assets/how-it-works/credit-01-open-lending-infrastructure.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of two Indian fintech engineers in a plain modern office working side by side at a desk with two laptops open, one gesturing toward a screen showing a blurred, unreadable system-architecture diagram, the other typing; simple functional workspace with a whiteboard bearing indistinct erased marks in the soft-focus background; medium two-shot, eye-level, 40mm lens, soft even natural window light, true-to-life colour with no blue tint; landscape 16:9 composition with clean, slightly darker negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible code or diagrams, no logos, no AI artifacts.

### 4. How it Works — Access to Multiple Lenders
- Rename the download to: `assets/how-it-works/credit-02-multiple-lenders.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian adult's hands holding a smartphone displaying a blurred, generic list-style interface with several near-identical unreadable card rows, suggesting a choice between multiple options, set at a small table in an ordinary home or shop interior with a notebook and a cup of chai softly out of focus nearby; shallow depth of field, 85mm portrait lens feel, warm natural indoor light, true-to-life colour with no blue tint; landscape 16:9 composition with clean negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible app content, no logos or brand names, no AI artifacts.

### 5. How it Works — Support for Diverse Credit Products
- Rename the download to: `assets/how-it-works/credit-03-diverse-credit-products.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of a mixed group of three Indian adults of different ages and occupations — a woman in a simple sari, a young man in a shop apron, and a middle-aged man in a plain shirt — waiting on a bench in a modest, brightly lit service office interior, each absorbed in their own moment, one glancing at a phone, none looking at camera; suggests different people seeking different kinds of financial help; wide-ish 35mm lens, natural daylight from a large window off-frame, plain painted wall behind, true-to-life colour with no blue tint; landscape 16:9 composition with uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no signage, no logos, no AI artifacts.

### 6. How it Works — Faster Digital Credit Journeys
- Rename the download to: `assets/how-it-works/credit-04-faster-digital-journeys.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of a young Indian adult seated at a small table in an ordinary home, holding a smartphone up at eye level with a relieved, faintly smiling expression as they complete something on screen, a closed notebook and pen pushed aside on the table beside them; over-the-shoulder three-quarter angle, 50mm lens, moderate depth of field; warm soft afternoon window light, true-to-life natural colour with no blue tint, plain uncluttered wall in the top-left of frame; photojournalistic, high detail, no text overlay, no legible screen content, no logos, no AI artifacts.

### 7. Why Join — For Borrowers
- Rename the download to: `assets/audience/credit-borrowers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Warm lifestyle-documentary photograph of an Indian small-business owner in their 30s standing in the doorway of their modest shop, arms relaxed, wearing an unforced everyday smile, looking slightly off-camera; the shop interior with unbranded stock softly out of focus behind them; medium shot, 50mm equivalent lens, shallow depth of field; soft warm natural daylight on the face, true-to-life colour rendering with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no signage, no legible logos or brand names, no AI artifacts.

### 8. Why Join — For Lenders
- Rename the download to: `assets/audience/credit-lenders.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small team of three Indian financial-services professionals in plain business-casual clothing standing around a desk in a modern, uncluttered office, mid-discussion over a laptop showing a blurred unreadable dashboard, natural engaged body language, none posing for camera; medium-wide shot, 35mm lens, bright soft daylight from a large window, neutral grey and white interior with true-to-life colour and no blue tint; landscape composition with clean, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no logos or company names, no AI artifacts.

### 9. Why Join — For Consumer Apps & Platforms
- Rename the download to: `assets/audience/credit-consumer-apps.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of two Indian product and engineering colleagues in a plain modern workspace, seated together reviewing a smartphone held between them showing a blurred generic app interface, a laptop with an indistinct wireframe open on the desk beside them, sticky notes with unreadable marks on a nearby board; medium two-shot, eye-level, 40mm lens, soft even natural light, true-to-life colour with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen or note content, no logos, no AI artifacts.

---

## Investments — 9 images

Generate one image per prompt below. After each download, rename the file to the exact name given under "Save as" and place it in that path's subfolder under `assets/` (i.e. `assets/reality/`, `assets/challenges/`, `assets/how-it-works/` or `assets/audience/`) — these 9 files all belong to the Investments page only.

### 1. Structural Reality portrait
- Rename the download to: `assets/reality/investments.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian gig-economy worker in their late 20s — plain unbranded delivery jacket, helmet resting on the seat beside them — sitting on a parked scooter at the roadside during a break, counting a small handful of coins in their palm with a thoughtful, faraway expression, not looking at camera; ordinary Indian street softly out of focus behind, warm late-afternoon side light; portrait orientation with generous empty space and soft shadow in the lower third of frame; true-to-life warm colour grading, no blue tint, shallow depth of field, 50mm, photojournalistic, high detail, no text overlay, no legible currency, no logos, no brand liveries.

### 2. Key Challenges panel
- Rename the download to: `assets/challenges/investments.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Overhead documentary photograph shot from directly above a modest household table, showing the everyday arithmetic of a small income: a worn savings passbook, a handwritten household ledger with indistinct entries, a small stack of coins and a folded cloth purse, a calculator, and a smartphone showing a blurred generic finance-app screen, with a person's hands entering from the edge of frame; dense but ordinary, lived-in composition filling the 3:4 frame edge-to-edge; single-source directional lighting creating real shadows between objects, moody but natural colour, no blue tint; portrait orientation, photojournalistic, 35mm, high detail, no text overlay, no legible handwriting or numbers, no logos, no legible currency notes.

### 3. How it Works — ₹100 7-Day Daily SIPs
- Rename the download to: `assets/how-it-works/investments-01-daily-sips.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian adult's hands dropping a single small coin into a simple ceramic savings jar on a plain wooden table, a smartphone lying face-up beside it showing a blurred, unreadable interface; the gesture reads as a tiny, repeated, everyday act rather than a grand one; shallow depth of field, 85mm portrait lens feel, warm natural indoor light with a soft highlight on the coin, true-to-life colour with no blue tint; landscape 16:9 composition with clean negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no logos, no AI artifacts.

### 4. How it Works — Access to Multiple Asset Management Companies
- Rename the download to: `assets/how-it-works/investments-02-multiple-amcs.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian adult seated at a small table holding a smartphone that displays a blurred, generic scrollable list of near-identical unreadable option cards, suggesting choice among many providers, with a notebook and pen resting nearby; over-the-shoulder three-quarter angle, 50mm lens, shallow depth of field, warm natural indoor daylight, true-to-life colour with no blue tint; landscape 16:9 composition with uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible app content, no fund or company names, no logos, no AI artifacts.

### 5. How it Works — Distribution Through Multiple Network Participants
- Rename the download to: `assets/how-it-works/investments-03-network-distribution.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of a small independent Indian financial distributor — a woman in her 30s in plain business-casual clothing — seated across a modest desk from a client in an ordinary neighbourhood office, turning a laptop toward them to explain something on a blurred unreadable screen, both leaning in with natural engaged expressions; medium two-shot, eye-level, 40mm lens, soft daylight from a side window, plain painted wall behind, true-to-life colour with no blue tint; landscape 16:9 composition with clean space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no signage or logos, no AI artifacts.

### 6. How it Works — Financial Inclusion Through Digital Participation
- Rename the download to: `assets/how-it-works/investments-04-financial-inclusion.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of two Indian auto-rickshaw and delivery drivers in plain unbranded work clothes standing beside their parked vehicles at a roadside tea stall, one showing the other something on a smartphone with a blurred generic interface, both with relaxed, genuinely interested expressions, neither looking at camera; medium-wide shot, 35mm lens, bright warm natural daylight, ordinary Indian street softly out of focus behind, true-to-life colour with no blue tint; landscape 16:9 composition with open space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no logos or vehicle branding, no AI artifacts.

### 7. Why Join — For Investors
- Rename the download to: `assets/audience/investments-investors.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Warm lifestyle-documentary photograph of a young Indian adult in their mid-20s sitting on the front step of an ordinary home, smartphone resting in one hand, wearing a quiet, contented, hopeful expression as they look off into the middle distance; everyday domestic surroundings softly out of focus behind; medium shot, 50mm lens, shallow depth of field, soft warm golden-hour light on the face, true-to-life colour with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no logos or brand names, no AI artifacts.

### 8. Why Join — For Distributors & Platforms
- Rename the download to: `assets/audience/investments-distributors.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of a small independent Indian distributor team of two working in a modest neighbourhood office — one at a desk on a laptop showing a blurred unreadable screen, the other standing and speaking on a phone while glancing at a printed sheet with indistinct rows; plain, functional interior with a filing shelf and a small window; medium-wide shot, 35mm lens, soft natural daylight, true-to-life colour with no blue tint; landscape composition with clean, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible documents or screens, no signage or logos, no AI artifacts.

### 9. Why Join — For Asset Management Companies
- Rename the download to: `assets/audience/investments-amcs.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of three Indian investment-management professionals in plain business attire standing in conversation beside a large window in a modern, uncluttered office, one holding a tablet showing a blurred unreadable chart, natural unposed body language and neutral engaged expressions; medium-wide shot, 35mm lens, bright soft daylight, neutral grey and white interior, true-to-life colour with no blue tint; landscape composition with clean, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen content, no logos or company names, no AI artifacts.

---

## Insurance — 9 images

Generate one image per prompt below. After each download, rename the file to the exact name given under "Save as" and place it in that path's subfolder under `assets/` (i.e. `assets/reality/`, `assets/challenges/`, `assets/how-it-works/` or `assets/audience/`) — these 9 files all belong to the Insurance page only.

### 1. Structural Reality portrait
- Rename the download to: `assets/reality/insurance.jpg`
- Target ratio: Portrait 4:5 (~1600×2000px)
- Prompt:
> Candid documentary photograph of an Indian delivery rider in their 20s in a plain unbranded jacket, standing beside a parked two-wheeler loaded with unmarked parcel bags on an ordinary street, looking down at a scuffed and dented parcel in their hands with a resigned, worried expression, not looking at camera; overcast diffused daylight, damp road surface, ordinary streetscape softly out of focus behind; portrait orientation with generous empty space and soft shadow in the lower third of frame; true-to-life colour grading, no blue tint, shallow depth of field, 50mm, photojournalistic, high detail, no text overlay, no logos, no courier liveries.

### 2. Key Challenges panel
- Rename the download to: `assets/challenges/insurance.jpg`
- Target ratio: Portrait 3:4 (~1500×2000px)
- Prompt:
> Overhead documentary photograph shot from directly above the concrete floor of a small Indian goods loading area, showing a crushed and torn cardboard carton with its unbranded contents spilling partly out, a strip of broken packing tape, a clipboard with an indistinct handwritten manifest, and a worker's hands entering from the edge of frame lifting a flap to inspect the damage; dense, lived-in composition filling the 3:4 frame edge-to-edge; single-source directional lighting creating real shadows, moody but natural colour, no blue tint; portrait orientation, photojournalistic, 35mm, high detail, no text overlay, no legible writing, no logos or brand names.

### 3. How it Works — Sachet Insurance Products
- Rename the download to: `assets/how-it-works/insurance-01-sachet-insurance.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Close-up documentary photograph of an Indian small shopkeeper's hands holding a smartphone at the counter of their modest store, screen showing a blurred, simple, generic two-button interface, a row of small unbranded sachet-style packets hanging softly out of focus in the background to echo the idea of small affordable units; shallow depth of field, 85mm portrait lens feel, warm natural indoor light, true-to-life colour with no blue tint; landscape 16:9 composition with clean negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen or packet content, no logos or brand names, no AI artifacts.

### 4. How it Works — Logistics Risk Protection
- Rename the download to: `assets/how-it-works/insurance-02-logistics-risk-protection.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of an Indian logistics worker in plain unbranded workwear carefully strapping and securing a stack of unmarked cartons in the open rear of a small goods vehicle at a modest sorting yard, hands mid-action on the strap, other parcels stacked nearby; three-quarter angle, medium-wide 35mm lens, bright natural late-morning daylight with warm tone, true-to-life unfiltered colour with no blue tint; landscape 16:9 composition with clean open space in the top-left corner; photojournalistic, high detail, no text overlay, no visible logos, liveries or number plates, no AI artifacts.

### 5. How it Works — Open Insurance Distribution
- Rename the download to: `assets/how-it-works/insurance-03-open-distribution.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Documentary photograph of two Indian insurance and technology professionals in plain business-casual clothing working together at a desk in a modern uncluttered office, one pointing at a laptop screen showing a blurred unreadable connection diagram, the other taking notes on a pad with indistinct handwriting; medium two-shot, eye-level, 40mm lens, soft even natural window light, neutral interior, true-to-life colour with no blue tint; landscape 16:9 composition with clean, slightly darker negative space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen or note content, no logos, no AI artifacts.

### 6. How it Works — Expanding Financial Security
- Rename the download to: `assets/how-it-works/insurance-04-financial-security.jpg`
- Target ratio: 16:9 (~1600×900px)
- Prompt:
> Candid documentary photograph of an Indian shopkeeper couple in their 30s or 40s standing together behind the counter of their small neighbourhood store during a calm moment, one resting a hand lightly on the other's shoulder, both with settled, quietly confident expressions looking out into the shop rather than at camera; shelves of unbranded stock softly out of focus behind; medium shot, 50mm lens, warm soft daylight from the shop entrance, true-to-life colour with no blue tint; landscape 16:9 composition with uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no signage or logos, no AI artifacts.

### 7. Why Join — For Merchants & Gig Workers
- Rename the download to: `assets/audience/insurance-merchants-gig-workers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Warm lifestyle-documentary photograph of two Indian working adults side by side outside a small neighbourhood shop — a shopkeeper in a plain apron and a delivery rider in an unbranded jacket holding a helmet — sharing an easy, unforced moment of conversation, both with natural relaxed smiles, neither posing for camera; medium shot, 50mm lens, shallow depth of field, soft warm natural daylight, ordinary street softly out of focus behind; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no signage, no logos or brand liveries, no AI artifacts.

### 8. Why Join — For Insurers
- Rename the download to: `assets/audience/insurance-insurers.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of three Indian insurance professionals in plain business attire in a modern, uncluttered meeting space, standing around a table mid-discussion with a laptop and a plain printed sheet with indistinct rows between them, natural unposed body language and neutral engaged expressions; medium-wide shot, 35mm lens, bright soft daylight from a large window, neutral grey and white interior, true-to-life colour with no blue tint; landscape composition with clean, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible documents or screens, no logos or company names, no AI artifacts.

### 9. Why Join — For Platforms & Ecosystem Participants
- Rename the download to: `assets/audience/insurance-platforms.jpg`
- Target ratio: 16:10 (~1600×1000px)
- Prompt:
> Documentary photograph of two Indian product colleagues in a plain modern workspace reviewing a smartphone held between them showing a blurred generic checkout-style interface, a laptop with an indistinct wireframe open on the desk beside them and a board of unreadable sticky notes behind; medium two-shot, eye-level, 40mm lens, soft even natural light, true-to-life colour with no blue tint; landscape composition with simple, uncluttered space in the top-left corner; photojournalistic, high detail, no text overlay, no legible screen or note content, no logos, no AI artifacts.
