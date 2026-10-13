# Get Involved — Row 1: Investor Relations

## Location on page
- Page: About Us (`About Us.html`)
- Section: "Get Involved" → "A place for every participant in Bharat's digital commerce story" (`.why`), zigzag row 1 of 4
- CSS target: `.aud-media img` (first row)
- Order: 13th image placeholder on this page

## Role in the page
This is the first of four institutional zigzag rows (Investor Relations, Board of Directors, Rewards & Recognition, Careers), each pairing an image with a badge label and a benefit list. Investor Relations sits beside copy about the FY25-26 Impact Report, quarterly network updates, audited financial statements, and network performance metrics. Unlike the commerce-sector imagery elsewhere on the page, this and the next two rows are explicitly institutional/corporate — they need to read as credible public-interest-technology-organisation photography, not generic Western boardroom stock or slick fintech-startup gloss.

## Display context
- Shape: 16:10 (overridden from the base 4:3 by a page-specific CSS rule)
- Recommended output size: ~1600x1000px
- Presentation: Full image visible at full opacity (no darkening gradient on `.aud-media` itself), with a small uppercase pill-shaped badge ("Investor Relations") positioned top-left over a semi-transparent black, blurred backdrop (`rgba(0,0,0,.52)` + backdrop-blur). Keep the top-left ~20% of frame relatively simple in tone so the badge text stays legible; the rest of the frame can carry full detail and color. Image scales 1.04x on hover of the whole row.

## Subject & scene
A small, focused meeting in a modern but unpretentious Indian office meeting room: two or three professionals — a mix of ages from early-30s to mid-50s — seated around a table reviewing a printed report (styled generically as a bound document with a plain cover, no legible ONDC or third-party branding) alongside a laptop displaying a simple, generic bar/line chart (blurred or abstracted, not legible data). One person points to a figure in the printed report while another takes notes. The room should feel like a real working office — visible whiteboard, plants, a window with soft city light — not a polished, sterile boardroom set.

## Composition & framing
Medium-wide shot at seated eye level, standard-lens perspective, moderate depth of field with the table, report, and laptop in sharp focus and the room context softly resolved behind. Landscape 16:10 crop, the group positioned in the lower two-thirds/center of frame, leaving the top-left corner comparatively simple and slightly muted for the badge overlay.

## People
Three Indian professionals: one woman in her late 30s in smart-casual business attire (a blazer over a kurta or a simple button-down), one man in his 50s in a collared shirt, greying hair, senior-presence but approachable, and one younger analyst in their late 20s taking notes on a laptop. Natural, engaged body language — pointing at a page, leaning in to look at a chart — rather than posed group-photo smiling at camera.

## Lighting & color
Soft, even daylight from an office window mixed with warm interior lighting, true-to-life color rendering of skin tones, wood/laminate table surfaces, and paper — no blue color grading baked in; the page's brand-blue accents are applied separately via CSS badge and icon elements.

## Mood
Credible, transparent, quietly rigorous

## Must avoid
Any real, legible company names, financial figures, logos, or ONDC branding on the report or laptop screen; generic Western glass-tower boardroom stock-photo aesthetic; overly slick "fintech unicorn" styling (neon accents, dramatic backlighting); staged handshake or thumbs-up clichés; HDR oversaturation; AI artifacts in hands, faces, or document/screen content.

## Suggested filename
`assets/about/investor-relations.jpg`

## Suggested alt text
"Three colleagues review a printed report and a laptop chart together in a modern office meeting room"

## Ready-to-use generation prompt
> Documentary photograph of three Indian professionals — a woman in her late 30s in smart-casual attire, a greying man in his 50s in a collared shirt, and a younger analyst taking notes on a laptop — seated around a table in an unpretentious modern office meeting room, reviewing a plain bound report and a laptop showing a blurred generic bar chart, a whiteboard and plants visible behind them, soft window daylight mixed with warm interior light; true-to-life color with no blue tint, moderate depth of field with the group and documents in sharp focus; landscape 16:10 composition, group positioned in the lower two-thirds with a simpler, muted top-left corner; photojournalistic, 35mm, high detail, candid unposed engagement, no visible logos or legible data, no text overlay, no AI artifacts.
