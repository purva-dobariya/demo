# About Us page — image generation prompts

## Correction

My first pass here checked only whether the referenced files *existed* on disk and got fooled: `assets/library/launch.jpg`, `assets/library/ondc.jpg` and `assets/library/group2.jpg` all exist, but all three are literally the same blue "Placeholder" graphic saved under a real-sounding `.jpg` name, not actual photography. You can see this live on the page — hero background, "The Structural Reality" panel, and the "Driving Digital Inclusion" photo all render the placeholder card. Confirmed by opening each file directly. Below are the 3 real prompts, in the same format as `image-prompts/GOOGLE-FLOW-MANIFEST.md`.

## The 3 images still needed

For all three, **no code change is required** — the HTML already references these exact paths, they just currently hold placeholder content. Generate the image, then save/rename the download to the exact path below, overwriting the existing placeholder file in place.

### 1. Hero background
- Save as (overwrite in place): `assets/library/launch.jpg`
- Target ratio: wide 21:9 to 16:9 (~2400×1200px or larger)
- Display context: renders as a full-bleed background behind the hero headline at only **28% opacity**, under a heavy dark gradient veil (`.hero-bg` → `opacity: .28`, plus a near-black diagonal gradient on top). At that opacity, only bold color blocks and shapes read at all — fine detail and faces are pointless here.
- Prompt:
> Elevated dusk aerial photograph looking out over a dense, sprawling Indian commercial city district — thousands of small shopfronts, market stalls and low rooftops stretching toward the horizon, a tangle of overhead power lines and mobile-network tower antennas silhouetted against a deep indigo evening sky, scattered warm shop and street lights just beginning to switch on in a scattered pattern across the grid, evoking countless small nodes lighting up on one connected network; wide-angle establishing shot, camera positioned high on a rooftop or drone at a slight downward angle, deep atmospheric haze adding depth; true-to-life dusk color grading with no artificial blue tint (the site applies its own blue overlay on top), bold graphic shapes and strong light/dark contrast so the image still reads at low opacity; documentary photography, high detail, no text overlay, no logos, no legible signage, no AI artifacts.

### 2. "The Structural Reality" portrait
- Save as (overwrite in place): `assets/library/ondc.jpg`
- Target ratio: portrait 4:5 (~1600×2000px)
- Display context: sits in a dark section, opacity **.84**, with a gradient fading to near-black over the **bottom third** of the frame where a two-line caption ("Built on open-network principles, ONDC is creating interoperable digital rails for commerce.") is overlaid — keep the bottom third visually simple (ground/street level, not a face or key detail) so the caption stays legible.
- Prompt:
> Documentary photograph shot from an elevated vantage point (a balcony or upper-floor window) looking down a single bustling Indian bazaar street at dusk, composed to hold several different kinds of commerce participants in one frame at once: a kirana shopkeeper at his open storefront, a fruit-cart vendor arranging produce, a delivery rider on a scooter glancing at a phone mounted on the handlebar, a woman carrying a woven basket of goods, and a couple of commuters waiting near a modest bus stop — all sharing the same physical street, nobody posing for camera; shop signage lights just beginning to glow warm against the fading blue dusk sky; portrait orientation, moderate depth of field with the street receding into soft focus, the lower third of the frame kept visually calm (paving, shadow, feet) to leave room for a caption; true-to-life warm-to-cool dusk color grading, no blue tint added beyond what the natural dusk light provides; photojournalistic, 35mm, high detail, no text overlay, no legible signage or logos, no AI artifacts.

### 3. "Driving Digital Inclusion" photo
- Save as (overwrite in place): `assets/library/group2.jpg`
- Target ratio: roughly 6:5 to 4:3 (~1400×1200px) — it fills a full-height grid cell (min-height 460px) on the left half of a two-column section, `object-fit: cover`, in full natural color (cream/white section, only a faint left-edge vignette, not a dark overlay)
- Display context: sits directly beside the headline "Opportunity for every business, regardless of geography, scale or technical capability" — needs to visually carry that specific idea (reach beyond big cities, not just metro commerce).
- Prompt:
> Documentary photograph of a small shopkeeper in her 40s, plain cotton kurta, standing at the counter of a modest general store in a smaller Indian town (visibly not a metro — a narrower street, simpler signage, a hand-painted shop board softly out of focus), holding a basic smartphone with both hands and looking down at it with a focused, quietly hopeful expression as she completes a transaction, a small card-swipe or QR-code stand visible on the counter beside her; shelves of unbranded packaged goods behind her, ordinary small-town daylight spilling through the shop's open front; medium shot, eye level, 40mm equivalent lens, true-to-life warm natural color with no blue tint, right-of-frame composition leaving calmer space on the left edge for a subtle vignette; photojournalistic, high detail, no text overlay, no visible logos or brand names, no AI artifacts.

---

## Everything else on the page — already covered, no action needed

I checked every other image slot on `About Us.html` section by section (What is ONDC, key-challenges panel, ecosystem cards ×7, investor relations, board of directors, our journey/timeline, rewards & recognition, careers) against the actual files on disk, and this time opened the images themselves (not just checked they exist) to confirm they're real photography, not placeholder graphics under a real name:

| Section | img src | On disk? |
|---|---|---|
| Hero background | `assets/library/launch.jpg` | ✅ |
| "What is ONDC" | `assets/library/ondc.jpg` | ✅ |
| Structural reality photo | *(reality-img — see note below)* | ✅ |
| Key Challenges panel | `assets/about/challenges-panel.jpg` | ✅ |
| Ecosystem — Buyer applications | `assets/about/ecosystem-buyer-apps.jpg` | ✅ |
| Ecosystem — Seller applications | `assets/about/ecosystem-seller-apps.jpg` | ✅ |
| Ecosystem — Logistics partners | `assets/about/ecosystem-logistics-partners.jpg` | ✅ |
| Ecosystem — Payment providers | `assets/about/ecosystem-payment-providers.jpg` | ✅ |
| Ecosystem — Technology providers | `assets/about/ecosystem-technology-providers.jpg` | ✅ |
| Ecosystem — Enterprise participants | `assets/about/ecosystem-enterprise-participants.jpg` | ✅ |
| Ecosystem — MSMEs & local businesses | `assets/about/ecosystem-msmes-local-businesses.jpg` | ✅ |
| Digital inclusion | `assets/library/group2.jpg` | ✅ |
| Investor relations | `assets/investors/investor-logos-grid.png` | ✅ |
| Board of directors (×10 photos) | `assets/about us page assets/*.png` | ✅ |
| Awards / recognition (×7 photos) | `assets/about us page assets/*.jpg` | ✅ |
| Careers | `assets/about us page assets/join-work-with.png` | ✅ |

The one `assets/placeholder.svg` reference still in the file's `<style>` block is a dead default on the `.hero-bg` CSS rule — the actual hero element overrides it with an inline `style="background-image: url('assets/library/launch.jpg')"`, so it never renders. Nothing to do there either.

**No AI-image-generation prompts are needed for this page right now.** Writing prompts for slots that already have real, wired-in photography would just create rework for whoever picks this file up next.

## Note — images on this page that could never be AI-generated in the first place

Listed for completeness, since these are the only "can't just generate this" cases on the page, and they're already handled with real assets:

1. **The 10 Board of Directors photos** (`Rakesh-Dosi.png`, `kv_sheetal.png`, `hitesh_sachdev_v1.png`, `shaji_k_v.png`, `sundararaman_ramamurthy.png`, `adil-zainlbhai.png`, `anjali-bansal.png`, `ritesh-tiwari.png`, `sunil_singhi.png`, `vibhor_jain.png`) — these are named real people. They need actual photographs of those specific individuals, not AI generations. Already in place.
2. **The 7 award/recognition photos** (Global Fintech Awards, Indian Business Leader Awards, Global IP Convention, India Digital Awards, Republic Business Emerging Tech Awards, National Award for e-Governance, e4m Pitch Top 50) — these document specific real events/trophies ONDC actually won. Already in place.
3. **The investor/founding-member logo grid** and **the logo-ticker brands referenced on this page** (Bajaj Finserv, Hamaramall, One India Mall, Portronics, Renee, NAFED, Ekgaon, India Post) — real trademarked organizations' logos, not AI-generatable. The investor grid is already a real composite image. The logo-ticker gap (4 of 8 brand logos still missing, and all 8 still rendered as placeholder text-initials instead of images) is tracked separately in `assets/logos_requirement.md` — that's the one genuinely open item connected to this page.
