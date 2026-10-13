/* Shared loader for the participant / ecosystem directory tables.
 *
 * These tables are driven straight from the CSVs the participants team
 * maintains under public/assets/ondc-participants/. There is no build step on
 * purpose: the monthly refresh is "drop in the replacement CSV and commit", so
 * a conversion nobody remembers to re-run cannot silently stale the page.
 *
 * Row 0 of every one of those files is an instruction banner for whoever edits
 * the sheet ("Add in alphabetical order by brand name"), NOT data. The real
 * header is row 1. */
(function () {
  'use strict';

  var BOM = '﻿';

  /* RFC4180 enough for this data: quoted fields carry commas AND newlines (the
   * Contact column is a three-line blob), and "" is a literal quote. */
  function parse(text) {
    var out = [], row = [], field = '', quoted = false;
    var src = String(text || '');
    if (src.charAt(0) === BOM) src = src.slice(1);
    for (var i = 0; i < src.length; i++) {
      var c = src[i];
      if (quoted) {
        if (c !== '"') { field += c; continue; }
        if (src[i + 1] === '"') { field += '"'; i++; continue; }
        quoted = false;
      } else if (c === '"') {
        quoted = true;
      } else if (c === ',') {
        row.push(field); field = '';
      } else if (c === '\n') {
        row.push(field); out.push(row); row = []; field = '';
      } else if (c !== '\r') {
        field += c;
      }
    }
    if (field || row.length) { row.push(field); out.push(row); }
    return out;
  }

  /* Header cells carry stray trailing spaces in the ecosystem file ("Brand Logo "),
   * so trim them here and let the rest of the code key off the exact printed name. */
  function toObjects(grid) {
    if (grid.length < 2) return { headers: [], rows: [] };
    var headers = grid[1].map(function (h) { return String(h).trim(); });
    var rows = [];
    for (var i = 2; i < grid.length; i++) {
      var cells = grid[i];
      if (!cells.some(function (c) { return String(c).trim(); })) continue;   // blank filler row
      var obj = {};
      headers.forEach(function (h, j) {
        obj[h] = String(cells[j] == null ? '' : cells[j]).trim();
      });
      rows.push(obj);
    }
    return { headers: headers, rows: rows };
  }

  async function load(url) {
    var res = await fetch(url);
    if (!res.ok) throw new Error(url + ': bad status ' + res.status);
    return toObjects(parse(await res.text()));
  }

  /* "Buyer NP,Seller NP" and "Bus, Cabs/Auto" are one cell, not one value. */
  function splitList(value) {
    return String(value || '').split(',')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);
  }

  /* Contact is a single blob:
   *   Business SPOC: <name>\nEmail ID: <email>\nPhone Number: <phone>
   * It stays one column per the directory spec, but each line is rendered
   * separately so the email and phone can still be actioned. */
  function contactLines(blob) {
    return String(blob || '').split(/\r?\n/)
      .map(function (l) { return l.trim(); })
      .filter(Boolean)
      .map(function (line) {
        var m = line.match(/^([^:]+):\s*(.*)$/);
        var label = m ? m[1].trim() : '';
        var value = m ? m[2].trim() : line;
        var scheme = '';
        if (/email/i.test(label) && value.indexOf('@') > 0) scheme = 'mailto:';
        else if (/phone|contact\s*(no|number)/i.test(label) && /\d/.test(value)) scheme = 'tel:';
        return {
          label: label,
          value: value,
          href: scheme ? scheme + value.replace(/\s+/g, '') : '',
        };
      });
  }

  /* Links are recorded inconsistently -- "https://1rsmeal.com/" sits next to
   * bare "nammayatri.in" and "Avysh.com". A bare domain with no scheme would
   * resolve relative to this page, so it has to be given one. */
  function linkHref(raw) {
    var v = String(raw || '').trim();
    if (!v) return '';
    if (/^(https?:|mailto:)/i.test(v)) return v;
    return 'https://' + v.replace(/^\/+/, '');
  }

  /* ── the official taxonomy ───────────────────────────────────────────
   *
   * Transcribed from public/assets/data/filters-ondc-participants-sheet.csv
   * (Category / Sub Category), in sheet order. Cleanups applied while
   * transcribing, all of them sheet typos rather than judgement calls:
   *   - "Accomodation" and "health Insurance" spelled and cased properly
   *   - the sheet's Experiences row is one comma-joined cell carrying
   *     duplicates (Dining / Restaurants / restaurants) and a stray Metro;
   *     folded to one Restaurants, and Metro left where it belongs, under
   *     Unreserved Ticket Booking
   *   - Logistics and Accommodation Booking are each given a single child of
   *     the same name: the sheet has no finer split for either, and the CSVs
   *     write the bare category, so category and sub-category are one word
   *
   * OTHER carries the labels the three participant CSVs use that the sheet has
   * no row for. Anything absent from LABEL_MAP lands there too, so a category
   * introduced by next month's CSV stays visible and filterable without a code
   * change. */
  var OTHER_SECTOR = 'Other';

  var TAXONOMY = [
    { name: 'Retail', children: ['Grocery', 'Food & Beverage', 'Fashion',
      'Beauty & Personal Care', 'Electronics', 'Appliances', 'Home & Decor',
      'Health & Wellness', 'Autoparts & Components', 'Hardware and Industrial',
      'Building & Construction Supplies', 'Chemicals', 'eB2B', 'Inventory Less',
      'Gift card'] },
    { name: 'Credit', children: ['Business loan', 'Personal Loan', 'Credit Cards',
      'Gold Loan'] },
    { name: 'Insurance', children: ['Health Insurance', 'Marine Insurance',
      'Motor Insurance', 'Micro Transit Insurance'] },
    { name: 'Unreserved Ticket Booking', children: ['Cabs/Auto', 'Metro', 'Bus'] },
    { name: 'Reserved Ticket Booking', children: ['Flights'] },
    { name: 'Accommodation Booking', children: ['Accommodation Booking'] },
    { name: 'Experiences', children: ['Culture & Heritage', 'Specialty Events',
      'Sporting & Outdoor', 'Concert', 'Food & Dining', 'Comedy', 'Dance',
      'Literary Events', 'Museum', 'Restaurants', 'Tours & Sightseeing'] },
    { name: 'Investments', children: ['Mutual Funds'] },
    { name: 'Logistics', children: ['Logistics'] },
    { name: OTHER_SECTOR, children: ['Agriculture', 'Equipment Hiring',
      'Work Opportunities (ONEST)', 'Learning Experiences (ONEST)',
      'Infra Services', 'Appliance Repair Services', 'Personal Care Services'] },
  ];

  /* What the CSVs write -> what the sheet calls it. The value may be a
   * sub-category ("F&B" -> "Food & Beverage") or a whole category
   * ("Retail (B2C)" -> "Retail"), because the ecosystem file records domains
   * where the network files record granular categories. */
  var LABEL_MAP = {
    /* network files */
    'F&B': 'Food & Beverage',
    'Food & Beverages': 'Food & Beverage',
    'BPC': 'Beauty & Personal Care',
    'Home & Kitchen': 'Home & Decor',
    'Mutual Fund': 'Mutual Funds',
    'Retail B2B': 'eB2B',
    'Gift Card': 'Gift card',
    'Auto Components & Accessories': 'Autoparts & Components',
    'Speciality Events': 'Specialty Events',
    'Sporting Events': 'Sporting & Outdoor',
    /* FinAGG lends working capital to MSMEs, so its "Credit Line" is the
     * sheet's Business loan rather than a consumer credit line. */
    'Credit Line': 'Business loan',
    /* ecosystem file */
    'Retail (B2C)': 'Retail',
    'Retail (B2B)': 'eB2B',
    'Logistics (B2C)': 'Logistics',
    'Investment': 'Investments',
    'Ride Hailing': 'Cabs/Auto',
  };

  /* Not domains, so they never become a filter option. "Others" is a filler
   * cell; RSP and IGM are TSP service qualifiers that the Role column already
   * states on the very same rows. All three still print in the table cell. */
  var IGNORED = { 'Others': 1, 'RSP (Only for TSP)': 1, 'IGM (Only for TSP)': 1 };

  function canonCategory(value) {
    var v = String(value || '').trim();
    return Object.prototype.hasOwnProperty.call(LABEL_MAP, v) ? LABEL_MAP[v] : v;
  }

  function isIgnored(value) {
    return Object.prototype.hasOwnProperty.call(IGNORED, String(value || '').trim());
  }

  var PARENT_OF = {};
  var IS_PARENT = {};
  TAXONOMY.forEach(function (node) {
    IS_PARENT[node.name] = true;
    node.children.forEach(function (child) { PARENT_OF[child] = node.name; });
  });

  /* Takes either spelling: a raw CSV label or an already-canonical one. */
  function sectorOf(category) {
    var c = canonCategory(category);
    if (IS_PARENT[c]) return c;
    return Object.prototype.hasOwnProperty.call(PARENT_OF, c) ? PARENT_OF[c] : OTHER_SECTOR;
  }

  /* Rows per category, for the count printed beside every option. A row counts
   * once per parent even when it carries four of that parent's children, which
   * is what makes the parent figures add up the way a reader expects. */
  function countCategories(rows, field) {
    var parents = {}, children = {};
    rows.forEach(function (row) {
      var seenParent = {}, seenChild = {};
      splitList(row[field]).forEach(function (raw) {
        if (isIgnored(raw)) return;
        var cat = canonCategory(raw);
        var parent = sectorOf(cat);
        if (!seenParent[parent]) {
          seenParent[parent] = 1;
          parents[parent] = (parents[parent] || 0) + 1;
        }
        /* A bare domain has no child to count -- unless it is its own child
         * (Logistics, Accommodation Booking), where the one sub-category is
         * the category and has to carry the same figure. */
        if (IS_PARENT[cat] && PARENT_OF[cat] !== cat) return;
        if (seenChild[cat]) return;          // several CSV rows repeat a category
        seenChild[cat] = 1;
        children[cat] = (children[cat] || 0) + 1;
      });
    });
    return { parents: parents, children: children };
  }

  function countValues(rows, field) {
    var out = {};
    rows.forEach(function (row) {
      var seen = {};
      splitList(row[field]).forEach(function (v) {
        if (seen[v]) return;
        seen[v] = 1;
        out[v] = (out[v] || 0) + 1;
      });
    });
    return out;
  }

  function collectValues(rows, field) {
    return Object.keys(countValues(rows, field)).sort();
  }

  /* ── sidebar markup ──────────────────────────────────────────────────
   *
   * Both directories render the same Role list and the same category tree, so
   * the markup lives here rather than being copy-pasted into two inline
   * <script> blocks that would drift apart. */

  function esc(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* opts: { cls, value, label, count, checked, parent }. Only options a list
   * actually has rows for reach here: the pages filter the taxonomy down to
   * what their own CSV carries before rendering, because an option that
   * cannot be ticked is a question the reader should never have been asked. */
  function option(opts) {
    return '<label class="bk-np-chk">' +
      '<input type="checkbox" class="' + opts.cls + '" value="' + esc(opts.value) + '"' +
      (opts.parent ? ' data-parent="' + esc(opts.parent) + '"' : '') +
      (opts.checked ? ' checked' : '') + '>' +
      '<span class="bk-np-chk-label">' + esc(opts.label == null ? opts.value : opts.label) + '</span>' +
      '<span class="bk-np-chk-count">' + (opts.count || 0) + '</span></label>';
  }

  /* A category row carries TWO controls, deliberately not one: the checkbox
   * selects the whole category, and the rest of the row is a button that
   * expands it. Folding both into a <summary> (the obvious shorter version)
   * makes a single click on the checkbox both tick the box and collapse the
   * branch, and gives the keyboard two behaviours on one Space press. Two
   * controls cost a few more lines and behave correctly.
   *
   * nodes: [{ name, count, checked, open, children: [ ...option opts... ] }] */
  function treeNode(node) {
    var open = !!node.open;
    var id = 'npKids-' + String(node.name).replace(/[^A-Za-z0-9]+/g, '-');
    var label = '<span class="bk-np-chk-label">' + esc(node.name) + '</span>' +
      '<span class="bk-np-chk-count">' + (node.count || 0) + '</span>';

    /* A category whose sub-categories this list has none of gets no chevron:
     * an expander onto an empty box is a promise the branch cannot keep. The
     * ecosystem CSV records bare domains, so most of its categories land here.
     * With nothing to expand, the words become the checkbox's own label
     * instead — the row keeps one control, and it is the right one. */
    var head = node.children.length
      ? '<button type="button" class="bk-np-cat-toggle" aria-expanded="' + open + '"' +
        ' aria-controls="' + id + '">' + label +
          '<svg class="bk-np-cat-chev" width="9" height="6" viewBox="0 0 8 5" fill="none" ' +
          'stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" ' +
          'aria-hidden="true"><path d="M1 1l3 3 3-3"></path></svg>' +
        '</button>'
      : '<label class="bk-np-cat-toggle is-leaf" for="' + id + '-box">' + label + '</label>';

    return '<div class="bk-np-cat' + (open ? ' is-open' : '') + '" data-cat="' + esc(node.name) + '">' +
      '<div class="bk-np-cat-row">' +
        '<input type="checkbox" class="npCat" id="' + id + '-box" value="' + esc(node.name) + '"' +
        (node.checked ? ' checked' : '') +
        ' aria-label="' + esc(node.name) + '">' +
        head +
      '</div>' +
      (node.children.length
        ? '<div class="bk-np-cat-kids" id="' + id + '"' + (open ? '' : ' hidden') + '>' +
            node.children.map(option).join('') + '</div>'
        : '') +
      '</div>';
  }

  function tree(nodes) {
    return nodes.map(treeNode).join('');
  }

  /* A flat checkbox list, for Role. */
  function list(options) {
    return options.map(option).join('');
  }

  /* items: [{ group, value, label }] -- group is the checkbox class, so the
   * page can find and untick the input a chip stands for. */
  function chips(items) {
    if (!items.length) return '';
    return items.map(function (it) {
      return '<button type="button" class="bk-np-chip" data-group="' + esc(it.group) +
        '" data-value="' + esc(it.value) + '">' + esc(it.label || it.value) +
        '<span aria-hidden="true">✕</span>' +
        '<span class="bk-sr-only"> — remove this filter</span></button>';
    }).join('') + '<button type="button" class="bk-np-chip-clear" data-clear="all">Clear all</button>';
  }

  /* ── role keys ───────────────────────────────────────────────────────
   *
   * Every ecosystem row spells "Technology Service Provider (TSP)-Seller" out
   * in full, two or three times, inside a column barely wider than the phrase
   * itself -- which is what made those rows eight lines tall. The table prints
   * the key; the expansion travels with it in the abbr title, and the role
   * filter above the table carries key and words together, so the page always
   * says what a key means before a reader meets one.
   *
   * `pill` is what the filter shows, `full` what the tooltip says. An
   * unmapped role (next month's CSV may carry one) falls through as its own
   * text rather than vanishing. */
  var ROLE_KEYS = {
    'Buyer NP': { key: 'BNP', pill: 'Buyer NP', full: 'Buyer Network Participant' },
    'Seller NP': { key: 'SNP', pill: 'Seller NP', full: 'Seller Network Participant' },
    'Technology Service Provider (TSP)-Buyer': {
      key: 'TSP-B', pill: 'Buyer side',
      full: 'Technology Service Provider, buyer side',
    },
    'Technology Service Provider (TSP)-Seller': {
      key: 'TSP-S', pill: 'Seller side',
      full: 'Technology Service Provider, seller side',
    },
    'Technology Service Provider (TSP)-RSF': {
      key: 'TSP-RSF', pill: 'Reconciliation & Settlement',
      full: 'Technology Service Provider, Reconciliation and Settlement Framework',
    },
    'Technology Service Provider (TSP)-IGM': {
      key: 'TSP-IGM', pill: 'Issue & Grievance Management',
      full: 'Technology Service Provider, Issue and Grievance Management',
    },
  };

  function roleKey(value) {
    var v = String(value || '').trim();
    if (Object.prototype.hasOwnProperty.call(ROLE_KEYS, v)) return ROLE_KEYS[v];
    return { key: v, pill: v, full: v };
  }

  /* One cell's worth of role keys. An abbr only where there is something to
   * expand: an unmapped role would otherwise claim a tooltip that repeats it. */
  function roleKeys(value) {
    var keys = splitList(value).map(roleKey);
    if (!keys.length) return none();
    return keys.map(function (k) {
      return k.key === k.full
        ? '<span class="bk-np-key">' + esc(k.key) + '</span>'
        : '<abbr class="bk-np-key" title="' + esc(k.full) + '">' + esc(k.key) + '</abbr>';
    }).join(' ');
  }

  function none() {
    return '<span class="bk-np-none" aria-hidden="true">—</span>' +
      '<span class="bk-sr-only">Not recorded</span>';
  }

  /* ── category chips ──────────────────────────────────────────────────
   *
   * Categories are the row's actual content, so they keep their real names and
   * are never abbreviated. Three sit on one line at every width the ledger
   * uses; a participant live on seven of them hides the tail behind a +N
   * rather than pushing every row in the table to four lines.
   *
   * "RSP (Only for TSP)" and "IGM (Only for TSP)" drop out here: they are TSP
   * service qualifiers that the Role key on the same row already states. They
   * stay in the CSV export, which is the sheet verbatim. */
  function categoryChips(value, max) {
    var cap = max == null ? 3 : max;
    var labels = [], seen = {};
    splitList(value).forEach(function (raw) {
      if (isIgnored(raw)) return;
      var c = canonCategory(raw);
      if (seen[c]) return;
      seen[c] = 1;
      labels.push(c);
    });
    if (!labels.length) return none();

    function chip(l) { return '<span class="bk-np-cat-chip">' + esc(l) + '</span>'; }
    var head = labels.slice(0, cap).map(chip).join(' ');
    if (labels.length <= cap) return head;

    return head +
      '<span class="bk-np-cat-rest" hidden>' + labels.slice(cap).map(chip).join(' ') + '</span>' +
      '<button type="button" class="bk-np-more" aria-expanded="false">' +
      '<span class="bk-np-more-in">+' + (labels.length - cap) + '</span>' +
      '<span class="bk-np-more-out">Fewer</span>' +
      '<span class="bk-sr-only"> categories</span></button>';
  }

  /* ── contact ─────────────────────────────────────────────────────────
   *
   * The source blob is three labelled lines (SPOC, email, phone) and the
   * website arrives in a column of its own carrying a raw address. Printed
   * verbatim the four of them spent half the table's width on label text and
   * URLs, so the row keeps the person's name and turns the rest into actions.
   * Each action carries the brand in screen-reader-only text: a page of links
   * all reading "Email" is useless to anyone listening to the list. */
  function contactCompact(blob, link, brand) {
    var parts = [], name = '';
    contactLines(blob).forEach(function (l) {
      var action = '';
      if (/email/i.test(l.label) && l.href) action = 'Email';
      /* A phone column carrying "0" is a placeholder, not a number: it would
       * otherwise ship a tel: link that dials nothing. */
      else if (/phone|contacts*(no|number)/i.test(l.label) && l.href &&
        String(l.value).replace(/D/g, '').length >= 6) action = 'Call';
      if (action) {
        parts.push('<a class="bk-ul" href="' + esc(l.href) + '">' + action +
          '<span class="bk-sr-only"> ' + esc(brand) + '</span></a>');
      } else if (!name && !l.href && l.value) {
        name = l.value;
      }
    });

    var href = linkHref(link);
    if (href) {
      parts.push('<a class="bk-ul" href="' + esc(href) + '" target="_blank" rel="noopener">Website' +
        '<span class="bk-sr-only"> for ' + esc(brand) + ', opens in a new tab</span></a>');
    }
    if (!parts.length && !name) return none();

    /* Two lines, always the same two: the person on top, the actions under
     * them. Run as one inline string they broke wherever the SPOC's name
     * happened to end, so no two rows in a column of them agreed on where
     * line two started. */
    var sep = ' <span class="bk-np-sep" aria-hidden="true">·</span> ';
    return (name ? '<span class="bk-np-contact-line bk-np-spoc">' + esc(name) + '</span>' : '') +
      (parts.length ? '<span class="bk-np-contact-line">' + parts.join(sep) + '</span>' : '');
  }

  var api = {
    parse: parse,
    toObjects: toObjects,
    load: load,
    splitList: splitList,
    contactLines: contactLines,
    linkHref: linkHref,
    TAXONOMY: TAXONOMY,
    LABEL_MAP: LABEL_MAP,
    OTHER_SECTOR: OTHER_SECTOR,
    canonCategory: canonCategory,
    isIgnored: isIgnored,
    sectorOf: sectorOf,
    countCategories: countCategories,
    countValues: countValues,
    collectValues: collectValues,
    esc: esc,
    option: option,
    list: list,
    tree: tree,
    chips: chips,
    ROLE_KEYS: ROLE_KEYS,
    roleKey: roleKey,
    roleKeys: roleKeys,
    none: none,
    categoryChips: categoryChips,
    contactCompact: contactCompact,
  };

  /* Browser gets a global; scripts/build-np-logo-map.js requires this same file,
   * so the CSV is parsed by one implementation rather than two that can drift. */
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window !== 'undefined') window.npCsv = api;
}());
