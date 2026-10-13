# Logo manifest — Investments (`pages/investments.html`)

Two separate tickers on that page read from this folder: one for distributors,
one for AMCs. Drop the files below in and both strips render.

**Spec:** PNG or SVG · transparent or white background · at least 120px tall ·
all-lowercase hyphenated filename · **no spaces in filenames**.

## Distributors — strip labelled "Distributors live on the network"

| Filename | Brand |
|---|---|
| `zeny.png` | Zeny |
| `enrich-money.png` | Enrich Money |
| `pyllar.png` | Pyllar |
| `appreciate.png` | Appreciate |
| `mitr-sewa.png` | Mitr Sewa |
| `blinkmoney.png` | Blinkmoney |
| `elefin-money.png` | Elefin Money |

## AMCs — strip labelled "AMCs live on the network"

| Filename | Brand |
|---|---|
| `edelweiss.png` | Edelweiss |
| `hdfc.png` | HDFC |
| `icici-prudential.png` | ICICI Prudential |
| `motilal-oswal.png` | Motilal Oswal |
| `nippon-life.png` | Nippon Life |
| `kotak-mahindra.png` | Kotak Mahindra |
| `sbi-mutual-fund.png` | SBI Mutual Fund |
| `uti.png` | UTI |
| `hsbc.png` | HSBC |

Both strips end with a text-only "among others" chip — 81 distributors and 29 AMCs are
live on the network, so the named logos are a selection, not the full list.

If you supply a `.svg` or `.webp` instead of `.png`, update the `src` in
`pages/investments.html` to match — the extension is not inferred.
