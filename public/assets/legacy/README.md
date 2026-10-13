# Legacy brand-logo assets

Mirrored from `ONDC-Organization/website-ondc.org` (branch `ondc-dev`), which
holds the previous CMS's asset tree:

| Here | Came from |
|---|---|
| `np_logos/` | `content/themes/liebling/assets/theme/images/np_logos/` |
| `buyer-apps/` | `content/themes/liebling/assets/ondc-buyer-apps/images/` |
| `complaints/` | `content/themes/liebling/assets/theme/images/complaints/` |

**Do not flatten these into one folder.** 24 filenames appear in more than one
of them with genuinely different contents — `np_logos/tan.png` is 1.6 MB while
`buyer-apps/tan.png` is 2.5 KB. Merging them serves the wrong brand's logo.

`brand_logo` in the participant/ecosystem JSON is a bare filename and always
resolves against `np_logos/`. `buyer-apps.json` stores a full root-relative path
because its rows draw from all three folders.

Refresh with:

    node scripts/import-np-logos.js <path-to-website-ondc.org-clone>
