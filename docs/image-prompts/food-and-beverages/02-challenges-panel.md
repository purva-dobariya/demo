# Challenges Sticky Panel

## Location on page
- Page: Food and Beverages (`Food and Beverages.html`)
- Section: "The Structural Reality" → "Key challenges" (`.challenges-wrap`)
- CSS target: `.challenges-img-panel img`
- Order: 2nd placeholder image on this page

## Role in the page
This is a tall, sticky-positioned image that stays pinned alongside the vertical list of five challenge cards ("High platform commissions," "Limited pricing flexibility," "Dependence on a few platforms," "Fragmented delivery operations," "Rising customer acquisition costs") as the reader scrolls down through them. Its alt text is simply "Challenges." Because it stays visible for the entire scroll through that list, it functions as a persistent visual companion to the whole cluster of problems — it should read as one strong, evocative image summarizing the squeeze restaurants feel from commissions, fragmented logistics, and competitive pressure, rather than illustrating any single bullet literally.

## Display context
- Shape: Portrait, aspect-ratio 3:4
- Recommended output size: ~1500x2000px
- Presentation: Rendered at 85% opacity in a dark, rounded panel with no caption overlay and no bottom gradient (unlike the reality-img slot) — the full frame stays visible, so composition can use the whole height evenly. On narrower viewports this becomes a static 16:9 strip instead of sticky-portrait, so keep the most important content vertically centered rather than pushed to one extreme edge.

## Subject & scene
A close, tightly-framed shot of a restaurant delivery handoff moment at a small eatery's takeaway counter or back door — a stack of sealed, unbranded insulated delivery bags and paper takeaway boxes piled on a counter, a delivery partner's helmet resting nearby, and a restaurant staff member's hands sealing or tagging an order with tape just as a delivery rider's hand reaches in to collect it. This should feel like the literal physical friction point referenced by "fragmented delivery operations" and "dependence on a few platforms" — multiple takeaway bags of different sizes stacked haphazardly hint at juggling several delivery partners at once.

## Composition & framing
Tight, medium-close crop (50-85mm equivalent feel), shot at counter height so hands, bags, and the helmet dominate the frame with the background (kitchen doorway, street glimpse) softly out of focus behind. Vertical composition works naturally here: stack the visual interest — helmet near top, hands and bags in the middle, counter edge at the bottom — so the whole 3:4 frame has something worth looking at since no gradient will obscure any part of it.

## People
Two partial figures, both Indian: a restaurant counter staffer, mid-20s to 30s, wearing a plain apron, hands actively sealing a takeaway bag with tape or a sticker; and a delivery rider's arm/gloved hand entering frame from the side reaching for a bag, wearing a plain (unbranded) delivery jacket sleeve. Neither face needs to be fully visible — hands-and-gesture storytelling is preferred here to keep the focus on the handoff itself.

## Lighting & color
Available light from a shop doorway or counter lamp, warm-neutral tone, believable early-evening dinner-rush light. Natural, true color — no blue or teal pre-tinting; this panel sits on a dark navy background via CSS but the photograph itself should stay naturally lit and color-true.

## Mood
Hurried, transactional, a little chaotic, real

## Must avoid
Visible logos on delivery bags, helmets, or jackets (no real food-delivery-app branding); overly posed "hand model" stock photography; sterile studio lighting; motion blur so extreme that the handoff reads as abstract; AI artifacts on hands/fingers; Western-style delivery gear; empty or overly tidy counters that undercut the "juggling multiple partners" idea.

## Suggested filename
`assets/challenges/food-beverages-handoff.jpg`

## Suggested alt text
"Stacked unbranded delivery bags and a rider's hand collecting an order at a small restaurant's takeaway counter"

## Ready-to-use generation prompt
> Tight documentary photograph of a restaurant delivery handoff at a small Indian eatery's takeaway counter: a counter staffer in a plain apron sealing an unbranded insulated delivery bag with tape, several mismatched takeaway bags and paper boxes stacked beside a delivery rider's helmet, a gloved hand reaching in from the side to collect an order; shot at counter height, 50mm equivalent, shallow depth of field with the kitchen doorway softly blurred behind; warm early-evening practical light, true natural color, no blue tint; vertical 3:4 composition with visual interest distributed through the full frame; photojournalistic, high detail, no text overlay, no visible logos or brand names, no posed hand-model look.
