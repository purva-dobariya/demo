# Logo manifest — Tourism (`pages/tourism.html`)

Drop the files below into this folder. The ticker markup on `tourism.html`
already references these exact paths, so the strip renders as soon as the files land.

**Spec:** PNG or SVG · transparent or white background · at least 120px tall ·
all-lowercase hyphenated filename · **no spaces in filenames**.

| Filename | Brand | `alt` text used in markup |
|---|---|---|
| `highway-delite.png` | Highway Delite | Highway Delite |
| `whatsapp.png` | WhatsApp | WhatsApp |
| `dmrc-sarthi.png` | DMRC Sarthi | DMRC Sarthi |
| `bino.png` | Bino | Bino |
| `oneticket.png` | OneTicket | OneTicket |

`oneticket.png` is intentionally duplicated in `../logos_mobility/` so each page is
self-contained. Update both copies if the logo changes.

If you supply a `.svg` or `.webp` instead of `.png`, update the `src` in
`pages/tourism.html` to match — the extension is not inferred.
