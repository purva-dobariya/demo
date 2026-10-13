# Logo manifest — Public Transport (`pages/public-transport.html`)

Drop the files below into this folder. The ticker markup on `public-transport.html`
already references these exact paths, so the strip renders as soon as the files land.

**Spec:** PNG or SVG · transparent or white background · at least 120px tall ·
all-lowercase hyphenated filename · **no spaces in filenames**.

| Filename | Brand | `alt` text used in markup |
|---|---|---|
| `uber.png` | Uber | Uber |
| `rapido.png` | Rapido | Rapido |
| `paytm.png` | Paytm | Paytm |
| `ixigo.png` | ixigo | ixigo |
| `namma-yatri.png` | Namma Yatri | Namma Yatri |
| `redbus.png` | redBus | redBus |
| `oneticket.png` | OneTicket | OneTicket |
| `chartr.png` | Chartr | Chartr |
| `magicpin.png` | magicpin | magicpin |
| `navi-upi.png` | Navi UPI | Navi UPI |

`oneticket.png` is intentionally duplicated in `../logos_tourism/` so each page is
self-contained. Update both copies if the logo changes.

If you supply a `.svg` or `.webp` instead of `.png`, update the `src` in
`pages/public-transport.html` to match — the extension is not inferred.
