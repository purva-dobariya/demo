# Logo audit — every page

Checked all 12 pages (8 sector pages, About Us, Credit, Investments, Insurance) for every place a logo is rendered — the site's own ONDC mark, and any third-party partner/institution logo strip. Method: grepped each HTML file for `logo-strip`, `logo-chip`, `chip-mark`, `nav-logo`, `footer-logo`, then confirmed which referenced image files actually exist on disk under `assets/`.

## 1. ONDC's own logo — covered, no action

Every page (all 12) uses `assets/ondc-logo.svg` in the navbar and footer. File exists. Nothing to do.

## 2. D2C Retail.html — covered, no action

Has a logo ticker ("Active across buyer apps and brands") with 6 real partner logo images, all already present as files:

| Brand | File |
|---|---|
| Bajaj Finserv | `assets/logos_d2c/Bajaj_Finserv_Logo.svg.png` |
| HamaraMall | `assets/logos_d2c/HamaraMall.png` |
| Portronics | `assets/logos_d2c/Portonics.jpg` |
| Renée | `assets/logos_d2c/Renee.jpeg` |
| Zilibuy | `assets/logos_d2c/Zilibuy.png` |
| DigiHaat | `assets/logos_d2c/Digihaat logo.jpeg` |

Nothing missing here.

## 3. About Us.html — resolved

Had a logo ticker ("Trusted across India's commerce ecosystem") rendering all 8 brands as placeholder colored-circle initials. Fixed:

| Brand | Logo file |
|---|---|
| Bajaj Finserv | `assets/logos_d2c/Bajaj_Finserv_Logo.svg.png` |
| Hamaramall | `assets/logos_d2c/HamaraMall.png` |
| Portronics | `assets/logos_d2c/Portonics.jpg` |
| Renee | `assets/logos_d2c/Renee.jpeg` |
| One India Mall | `assets/logos_d2c/One_India_Mall.png` |
| NAFED | `assets/logos_d2c/NAFED.png` |
| Ekgaon | `assets/logos_d2c/Ekgaon.jpg` |
| India Post | `assets/logos_d2c/India_Post.png` |

The 4 real logos that were missing (One India Mall, NAFED, Ekgaon, India Post) were supplied and dropped into `assets/logos_d2c/`; the `About Us.html` ticker markup and `.logo-chip` CSS were updated to render all 8 as real `<img>` logos, matching how D2C Retail.html already does it. Nothing outstanding.

Also on this page: the "Investor Relations" section already uses one real composite image (`assets/investors/investor-logos-grid.png`) with the founder/investor logos baked in — that one's covered, no action needed. The Board of Directors carousel uses 10 real named photos, not logos — also covered.

## 4. All other pages — no logos in use

DigiDukaan, Food and Beverages, Hyperlocal Logistics, Impact Retail, Public Transport, Shared Mobility, Tourism, Credit, Investments, Insurance: the logo-strip CSS is defined in every one of these files but **no `<div class="logo-strip">` is actually placed in the page** — there's no logo ticker rendered at all on these pages currently. Nothing to source.

---

## Status: all done

All 8 logos on About Us.html are now real images, wired into the page. Nothing left to source or wire on any page's logo strip.
