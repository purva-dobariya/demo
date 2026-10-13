# Legacy ondc.org assets and feeds

## What broke

This repo is a plain static site deployed at `www.ondc.org`, replacing the CMS
that used to serve that domain. Several pages still referenced that CMS's
directory tree at its own domain, which no longer exists:

| Legacy path | What it held | Status |
|---|---|---|
| `/assets/theme/images/np_logos/` | participant + TSP brand logos | **404** |
| `/assets/ondc-buyer-apps/images/` | buyer-app logos | **404** |
| `/assets/theme/images/complaints/` | a few buyer-app logos | **404** |
| `/content/files/theme/json/` | 12 registry data feeds | **200, serving this site's `index.html`** |

Result: roughly 800 broken-image icons across `network-participants.html`,
`ecosystem-participants.html` and `complaint.html`.

## Resolved: the images

The assets were recovered from the old site's repo,
`ONDC-Organization/website-ondc.org` (branch `ondc-dev`), and now live under
`public/assets/legacy/` — see the README there, in particular the warning about
not flattening the three folders.

**834 of 855 references resolve (97.5%).** Two data corrections were needed:
`khaugully.png` → `.jpg` (the file the repo actually has), and a gap-filling pass
described below.

## Resolved: logos the data already had, on another row

Participants take more than one role and the registry repeats the company once
per role, often with the logo on only some of those rows — Protean eGov appeared
three times under TSP with the logo on one row. `scripts/fill-logo-gaps.js`
fills those in:

- **49 blank rows** filled from the same company’s other role.
- **3 of the original 23 missing files** were duplicates under another filename,
  each corroborated by a shared website domain:
  `dittomart-logo.png` → `ditto-mart-logo.png` (dittomart.in),
  `mysellercentral-logo.png` → `mysellercentral.png` (mysellercentral.com,
  filed under “KNS Commerce India”), `aarambh-logo.png` → `aarambh_logo.png`
  (scaleknot.com).

The script matches on company name with **legal suffixes stripped only** — an
earlier version also stripped “Technologies”/“Solutions” and merged genuinely
different companies. It skips any group offering more than one candidate logo
(5 remain, e.g. Uber, Lekhha) and never uses `ondc.png` as a donor, since that is
a placeholder in the legacy data and would show ONDC’s own mark as a
participant’s brand. Re-run it after any data refresh; it is idempotent.

### The 20 that remain outstanding

Not present in that repo on **any** branch (`master`, `prod`, `staging`,
`testing` all carry the same 679 files):

`ODOP-Mart-MP`, `a1travels-logo`, `acepartners-logo`,
`amc-logo`, `amealio-logo`, `bachat-logo`, `boni-logo`, `bringg-logo`,
`countinfinity-logo`, `dspfin-logo`, `flexiesuite`,
`flipit-money-logo`, `immersivetrails-logo`, `islamicly-logo`,
`openidea-logo`, `promexawealth-logo`,
`smoothmoney-logo`, `taptap-logo`, `veeveebusservice-logo`, `zylo-club-logo`.

The reason is established: that repo's `livenetwork_v91.json` has 640 rows, our
snapshot has 666. These are participants onboarded *after* the repo's last
commit (2026-08-04) — Volt Money and Promexa Wealth among them.
Their logos went to the live CMS and were never committed, so **only ONDC can
supply these 20 files**. Drop them into `public/assets/legacy/np_logos/` and
they render immediately; no code change needed.

Until then they show an initials monogram rather than a broken image
(`src/scripts/logo-fallback.js`).

## Still outstanding: the data feeds

All 12 remote JSON endpoints return this site's own `index.html`. The pages fall
back to the snapshots in `public/assets/data/`, and the table caption says so.

Those snapshots were compared against the legacy repo's copies: every one is
equal to or fresher than the repo's, so there is nothing to recover — what is
needed is a live URL. Check current status with:

    node scripts/refresh-participant-data.js --check

Last run: 0 alive, 12 dead. Once the platform team supplies the new location:

    node scripts/refresh-participant-data.js --base <new-url>

and update `STAGE_SOURCES` / `ROLE_DEFS` in the two participant pages.
