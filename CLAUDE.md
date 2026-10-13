# CLAUDE.md

Instructions for any AI coding assistant (Claude Code, Codex, or similar) working in this repository. Read this before making or proposing changes.

## Project snapshot

ONDC marketing website. Static HTML/CSS/JS — no backend, no build step for most pages, no bundler. Files are served as-is; deploy is a `git reset --hard` on the target server. See [README.md](README.md) for the full architecture, layout table, and common-task recipes — this file only covers rules an assistant must follow and a quick orientation map.

## Branch policy — read this first

**Never push directly to `main` or `release`, under any circumstances, even if explicitly asked to in a single instruction.** Per [.github/workflows/deploy.yml](.github/workflows/deploy.yml), a push to either branch triggers an immediate, automatic production deploy: GitHub Actions assumes an AWS role, runs `git fetch` + `git reset --hard` on the live EC2 instance, and the change is live on `ondc.org` within moments. There is no review gate, no staging step, and no build to catch a mistake — "what you commit is byte-for-byte what ships" (README.md). A direct push to either branch is a production deploy, not a save point.

**What to do instead:**
- Do all work on a descriptively-named feature branch (e.g. `dev-feature`, `rfp-corrigendum-fix`, `payment_assurance-page`) — never on `main` or `release` directly.
- Open a pull request into `main` (or `release`) and let a human merge it. Do not merge the PR yourself unless a human explicitly instructs it in that specific instance.
- If a user asks you to "push to main," "deploy this," or "merge to release," stop and confirm — do not treat it as routine. Push to the current feature branch and point them to opening a PR instead, unless they've been explicit that they want a direct push to a protected branch.
- `git push --force` to `main` or `release` is never acceptable from an assistant, full stop.

This file is an instruction, not a technical control — it shapes a compliant assistant's behavior but cannot stop a human (or a misconfigured tool) from pushing directly. Pair it with real GitHub branch protection rules (Settings → Branches → require PRs, restrict direct pushes) for actual enforcement.

## Quick orientation

```
index.html            Homepage — loads public/app.js (prebuilt React bundle)
pages/*.html           48 standalone pages, each self-contained (navbar/footer duplicated, not shared)
src/components/*.jsx   Homepage React source — compiled via `npm run build:home` into public/app.js
src/scripts/           Vanilla JS shared across pages: fx.js, resources.js, analytics.js, signup.js, ...
src/styles/            Shared CSS (legal.css = base for non-homepage pages, styles.css = homepage-only)
public/data/           resources.json — content behind the Resources hub. pages/rfp.html fetches its
                        content live from a Google Sheet instead (see README.md).
public/assets/         Images, logos, PDFs, grouped by page/section
deploy/nginx/          Server caching config, applied by hand on the box — not the live routing config
.github/workflows/     deploy.yml — the only deploy path; see Branch policy above
```

Most content edits on this site are JSON-file edits (`public/data/resources.json`, `public/assets/data/buyer-apps.json`), not code changes — check there first before assuming a task needs an HTML/JS change. The RFP/RFQ table is the exception: it's edited via a Google Sheet, not a repo file — see README.md's "Common tasks" section for the exact recipe per content type.

## Working conventions

- This is a 48-page, no-shared-template site: a change meant to apply everywhere (navbar, footer, a shared script tag) touches every page file — use a scripted sweep with a verification step, not manual per-file edits. README.md documents the exact pattern.
- No CI and no build step exists to catch mistakes before they ship — verify changes locally (`npm run dev`) before considering a task done, per README.md's "Verify before you push" section.
- Only commit or push when explicitly asked. Never assume a change should be committed just because it was made.
