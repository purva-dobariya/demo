/* Brand-name matching shared by fill-logo-gaps.js and build-np-logo-map.js.
 *
 * Matching strips LEGAL SUFFIXES ONLY. An earlier version also stripped words
 * like "Technologies" and "Solutions" and merged genuinely different companies,
 * so that is deliberately not done. Where a website is present it is used to
 * corroborate.
 *
 * Both callers must key names identically -- a logo joined under one rule and
 * looked up under another silently shows the wrong brand -- which is why this
 * lives in one file rather than being copied. */
'use strict';

const LEGAL = /\b(private|pvt|limited|ltd|llp|inc|incorporated|corp|corporation|company|co|plc)\b/g;

function nameKey(name) {
  return String(name || '')
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, ' ')
    .replace(LEGAL, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/* Accepts a bare URL or the HTML <a> blob the legacy participant JSON stores. */
function domainOf(website) {
  const text = String(website || '').replace(/<[^>]*>/g, ' ');
  const m = text.match(/(?:https?:\/\/)?(?:www\.)?([a-z0-9][a-z0-9.-]*\.[a-z]{2,})/i);
  return m ? m[1].toLowerCase().replace(/^www\./, '') : '';
}

/* The legacy data uses ONDC's own mark as a placeholder for participants that
 * never supplied one. Copying it onto another row would present ONDC's logo as
 * that company's brand. */
const PLACEHOLDER_DONORS = new Set(['ondc.png']);

module.exports = { LEGAL, nameKey, domainOf, PLACEHOLDER_DONORS };
