// Hides the "ONDC Participants" nav dropdown and footer column across the static pages.
// The blocks are commented out, not deleted — the pages themselves stay live at their URLs.
// Re-run after adding a page. `node scripts/hide-participants-links.js --show` puts them back.
const fs = require("fs");
const path = require("path");

const NAV = /[ \t]*<details class="nav-drop">[\s\S]*?<\/details>\r?\n/;
const FOOTER = /[ \t]*<div>\s*<div class="footer-col-head">ONDC Participants<\/div>[\s\S]*?<\/div>\r?\n/;
// careers-test.html ships its footer minified onto one line, so it needs an inline wrap.
const FOOTER_INLINE = /<div><div class="footer-col-head">ONDC Participants<\/div>(?:<a [^>]*>[^<]*<\/a>)*<\/div>/;
const MARK = "<!-- hidden: ONDC Participants";

const show = process.argv.includes("--show");
const dir = path.join(__dirname, "..", "pages");
let changed = 0;
const skipped = [];

// Drops the wrapper comments we inserted, keeping the markup between them.
function unhide(html) {
  const eol = html.includes("\r\n") ? "\r\n" : "\n";
  const out = [];
  let open = 0;
  for (const line of html.split(/\r?\n/)) {
    if (line.trim() === MARK) { open++; continue; }
    if (open > 0 && line.trim() === "-->") { open--; continue; }
    out.push(line.includes(MARK) ? line.split(MARK + " ").join("").split(" -->").join("") : line);
  }
  return out.join(eol);
}

for (const f of fs.readdirSync(dir).filter(f => f.endsWith(".html"))) {
  const p = path.join(dir, f);
  const before = fs.readFileSync(p, "utf8");
  const eol = before.includes("\r\n") ? "\r\n" : "\n";
  let html = unhide(before); // unhide first, so re-runs stay idempotent
  if (!show) {
    for (const re of [NAV, FOOTER]) {
      const which = re === NAV ? "nav" : "footer";
      const m = html.match(re);
      if (!m && re === FOOTER) {
        const inline = html.match(FOOTER_INLINE);
        if (inline) { html = html.replace(FOOTER_INLINE, MARK + " " + inline[0] + " -->"); continue; }
      }
      if (!m) { skipped.push(f + ": no " + which + " block"); continue; }
      if (!m[0].includes("ONDC Participants") || m[0].includes("--")) {
        skipped.push(f + ": unexpected " + which + " block content"); continue;
      }
      html = html.replace(re, MARK + eol + m[0] + "-->" + eol);
    }
  }
  if (html !== before) { fs.writeFileSync(p, html); changed++; }
}

console.log((show ? "restored" : "hidden") + " in " + changed + " pages");
if (skipped.length) console.log("skipped:\n  " + skipped.join("\n  "));
