/* Renders the Resources knowledge base from public/data/resources.json.
   Page contract (attributes discovered at load, all optional):
     <body data-res-page="<category id>">  current page (sidebar mark + crumbs)
     [data-res-nav]                        sidebar section tree
     [data-res-crumbs]                     breadcrumb trail
     [data-res-hub]                        hub category card grid
     [data-res-doclist][data-category][data-sections]   document sections
     [data-res-videos][data-category]      video card grid (video items)
     [data-res-filter] / [data-res-filter-count] / [data-res-filter-empty]
     [data-res-search] (input inside) + [data-res-results]
   All JSON fields pass through esc() before innerHTML. */
(function () {
  'use strict';

  var DATA_URL = '../public/data/resources.json';
  var HUB_PAGE = 'resources.html';

  var esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  var slug = function (s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  };

  /* ---------- inline stroke icons (feather-style, 24x24) ---------- */
  var svg = function (paths, size) {
    return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>';
  };

  var ICONS = {
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
    'archive': '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
    'play': '<circle cx="12" cy="12" r="10"/><path d="M10 8l6 4-6 4z"/>',
    'external': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
    'arrow': '<path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'bell': '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
    'check-square': '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    'compass': '<circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
    'percent': '<path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>',
    'eye': '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
    'book-open': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'volume': '<path d="M11 5L6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    'code': '<path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/>',
    'award': '<circle cx="12" cy="8" r="6"/><path d="M15.5 13l1.5 9-5-3-5 3 1.5-9"/>',
    'dollar': '<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'trending-up': '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    'navigation': '<path d="M3 11l19-9-9 19-2-8z"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    'pen': '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    'book': '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    'check-circle': '<circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>',
    'monitor': '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>',
    'home': '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
  };

  var TYPE_META = {
    pdf: { icon: 'file-text', chip: 'PDF', go: 'download' },
    zip: { icon: 'archive', chip: 'ZIP', go: 'download' },
    doc: { icon: 'file-text', chip: 'DOC', go: 'download' },
    xlsx: { icon: 'grid', chip: 'XLSX', go: 'download' },
    video: { icon: 'play', chip: 'Video', go: 'external' },
    link: { icon: 'external', chip: 'Link', go: 'external' },
    page: { icon: 'book-open', chip: '', go: 'arrow' }
  };

  var catIcon = function (cat) {
    return ICONS[cat.icon] ? cat.icon : 'book-open';
  };

  /* ---------- shared row template ---------- */
  var rowHTML = function (item, opts) {
    opts = opts || {};
    var t = TYPE_META[item.type] || TYPE_META.link;
    var internal = item.type === 'page';
    var chips = '';
    if (opts.catChip) chips += '<span class="res-chip is-cat">' + esc(opts.catChip) + '</span>';
    if (item.lang) chips += '<span class="res-chip is-lang">' + esc(item.lang) + '</span>';
    if (t.chip && !internal) chips += '<span class="res-chip">' + t.chip + '</span>';
    if (item.updated) chips += '<span class="res-chip">' + esc(item.updated) + '</span>';
    var meta = '';
    if (chips || item.note) {
      meta = '<span class="res-row-meta">' + chips
        + (item.note ? '<span class="res-row-note">' + esc(item.note) + '</span>' : '')
        + '</span>';
    }
    var body = (opts.minimal ? '' : '<span class="res-row-ico">' + svg(ICONS[t.icon], 18) + '</span>')
      + '<span class="res-row-body"><span class="res-row-title">' + esc(item.title) + '</span>' + meta + '</span>';
    if (!item.href) {
      // "Coming soon" entries ship without a link
      return '<span class="res-row is-static">' + body + '</span>';
    }
    return '<a class="res-row" href="' + esc(item.href) + '"'
      + (internal ? '' : ' target="_blank" rel="noopener"')
      + '>' + body
      + (opts.minimal ? '<span class="res-row-go">Open</span>' : '<span class="res-row-go">' + svg(ICONS[t.go], 16) + '</span>') + '</a>';
  };

  var proseHTML = function (text) {
    if (!text) return '';
    return String(text).split(/\n\n+/).map(function (p) {
      p = p.trim();
      // the source flattens numbered procedures into one run-on paragraph;
      // give each step its own line once there are enough of them to be a list
      var steps = p.split(/\s+(?=\d{1,2}\.\s+[A-Z])/);
      if (steps.length >= 3) {
        return '<ol class="res-steps">' + steps.map(function (s) {
          return '<li>' + esc(s.replace(/^\d{1,2}\.\s+/, '').trim()) + '</li>';
        }).join('') + '</ol>';
      }
      return '<p>' + esc(p) + '</p>';
    }).join('');
  };

  /* ---------- init ---------- */
  fetch(DATA_URL)
    .then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
    .then(function (data) { render(data.categories || []); })
    .catch(function (err) {
      console.error('Error loading resources data:', err);
      document.querySelectorAll('[data-res-doclist], [data-res-hub], [data-res-videos]').forEach(function (el) {
        el.innerHTML = '<div class="res-empty">Could not load resources. Please refresh the page.</div>';
      });
    });

  function render(cats) {
    var byId = {};
    cats.forEach(function (c) { byId[c.id] = c; });

    var childrenOf = function (id) {
      return cats.filter(function (c) { return c.parent === id; });
    };

    var itemCount = function (cat) {
      var n = (cat.sections || []).reduce(function (m, s) { return m + s.items.length; }, 0);
      childrenOf(cat.id).forEach(function (c) { n += itemCount(c); });
      return n;
    };

    var pageId = document.body.getAttribute('data-res-page') || '';
    var current = byId[pageId] || null;
    var isHub = pageId === 'hub';

    /* sidebar ships open (desktop shows it flat); collapse the mobile disclosure */
    if (window.matchMedia('(max-width: 1000px)').matches) {
      document.querySelectorAll('details.res-nav-details').forEach(function (d) { d.open = false; });
    }

    /* ----- sidebar tree ----- */
    document.querySelectorAll('[data-res-nav]').forEach(function (el) {
      var link = function (cat) {
        var active = cat.id === pageId;
        var html = '<li><a href="' + esc(cat.page) + '"' + (active ? ' aria-current="page"' : '') + '>'
          + esc(cat.title) + '</a>';
        if (active && (cat.sections || []).length > 2) {
          html += '<ul class="res-nav-toc">' + cat.sections.map(function (s) {
            return '<li><a href="#sec-' + slug(s.title) + '">' + esc(s.title) + '</a></li>';
          }).join('') + '</ul>';
        }
        var kids = childrenOf(cat.id);
        if (kids.length) html += '<ul>' + kids.map(link).join('') + '</ul>';
        return html + '</li>';
      };
      var roots = cats.filter(function (c) { return !c.parent && !c.external; });
      el.innerHTML = '<div class="res-nav-head">Knowledge Base</div><ul>'
        + '<li><a href="' + HUB_PAGE + '"' + (pageId === 'hub' ? ' aria-current="page"' : '') + '>Resources Home</a></li>'
        + roots.map(link).join('') + '</ul>';
    });

    /* ----- breadcrumbs ----- */
    document.querySelectorAll('[data-res-crumbs]').forEach(function (el) {
      var trail = [];
      var c = current;
      while (c) { trail.unshift(c); c = byId[c.parent]; }
      var html = '<a href="' + HUB_PAGE + '">Resources</a>';
      trail.forEach(function (t, i) {
        html += '<span class="sep">/</span>';
        html += (i === trail.length - 1)
          ? '<span aria-current="page">' + esc(t.title) + '</span>'
          : '<a href="' + esc(t.page) + '">' + esc(t.title) + '</a>';
      });
      el.innerHTML = html;
    });

    /* ----- hub cards ----- */
    document.querySelectorAll('[data-res-hub]').forEach(function (el) {
      var cards = cats.filter(function (c) { return c.hub; });
      el.innerHTML = cards.map(function (c, i) {
        var ext = !!c.external;
        var count = ext ? 'External' : itemCount(c) + ' resources';
        if (isHub) {
          return '<a class="bk-library-entry reveal d' + Math.min((i % 4) + 1, 4) + '" href="' + esc(c.page) + '"'
            + (ext ? ' target="_blank" rel="noopener"' : '') + '>'
            + '<span><h3>' + esc(c.title) + '</h3><p>' + esc(c.blurb) + '</p></span>'
            + '<span class="bk-library-entry-count">' + count + '</span>'
            + '<span class="bk-library-entry-go">Open</span>'
            + '</a>';
        }
        return '<a class="res-card reveal d' + Math.min((i % 4) + 1, 4) + '" href="' + esc(c.page) + '"'
          + (ext ? ' target="_blank" rel="noopener"' : '') + '>'
          + '<span class="res-card-ico">' + svg(ICONS[catIcon(c)], 22) + '</span>'
          + '<h3>' + esc(c.title) + '</h3>'
          + '<p>' + esc(c.blurb) + '</p>'
          + '<span class="res-card-foot"><span class="res-card-count">' + count + '</span>'
          + '<span class="res-card-arrow">' + svg(ICONS[ext ? 'external' : 'arrow'], 16) + '</span></span>'
          + '</a>';
      }).join('');
      // freshly injected reveals need observing
      observeReveals(el);
    });

    /* ----- child-category cards (parent pages) ----- */
    document.querySelectorAll('[data-res-children]').forEach(function (el) {
      var id = el.getAttribute('data-res-children');
      var kids = childrenOf(id);
      el.innerHTML = kids.map(function (c) {
        return '<a class="res-card" href="' + esc(c.page) + '">'
          + '<span class="res-card-ico">' + svg(ICONS[catIcon(c)], 22) + '</span>'
          + '<h3>' + esc(c.title) + '</h3>'
          + '<p>' + esc(c.blurb) + '</p>'
          + '<span class="res-card-foot"><span class="res-card-count">' + itemCount(c) + ' resources</span>'
          + '<span class="res-card-arrow">' + svg(ICONS.arrow, 16) + '</span></span>'
          + '</a>';
      }).join('');
    });

    /* ----- document lists ----- */
    document.querySelectorAll('[data-res-doclist]').forEach(function (el) {
      var cat = byId[el.getAttribute('data-category')];
      if (!cat) return;
      var only = (el.getAttribute('data-sections') || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var sections = (cat.sections || []).filter(function (s) {
        return !only.length || only.indexOf(slug(s.title)) !== -1;
      });
      el.innerHTML = sections.map(function (s) {
        return '<div class="res-sec" id="sec-' + slug(s.title) + '">'
          + '<div class="res-sec-head"><span class="lbl">' + esc(cat.title) + '</span><h2>' + esc(s.title) + '</h2>'
          + (s.note ? '<div class="res-sec-note">' + esc(s.note) + '</div>' : '')
          + '</div>'
          + (s.prose ? '<div class="res-sec-prose">' + proseHTML(s.prose) + '</div>' : '')
          + (s.items.length ? '<div class="res-doclist">' + s.items.map(function (it) { return rowHTML(it); }).join('') + '</div>' : '')
          + '</div>';
      }).join('');
    });

    /* ----- video grids ----- */
    document.querySelectorAll('[data-res-videos]').forEach(function (el) {
      var cat = byId[el.getAttribute('data-category')];
      if (!cat) return;
      var vids = [];
      (cat.sections || []).forEach(function (s) {
        s.items.forEach(function (it) { if (it.type === 'video') vids.push(it); });
      });
      var ytId = function (u) {
        var m = String(u).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/live\/)([\w-]{6,})/);
        return m ? m[1] : '';
      };
      el.innerHTML = vids.map(function (v) {
        var id = ytId(v.href);
        return '<a class="res-video" href="' + esc(v.href) + '" target="_blank" rel="noopener">'
          + '<span class="res-video-thumb">'
          // some source videos are access-restricted upstream and serve no
          // thumbnail; drop the broken image and let the plate show through
          + (id ? '<img src="https://img.youtube.com/vi/' + esc(id) + '/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">' : '')
          + '<span class="res-video-play"><span>' + svg('<path d="M8 5l11 7-11 7z"/>', 20) + '</span></span>'
          + '</span>'
          + '<span class="res-video-body"><h3>' + esc(v.title) + '</h3>'
          + (v.lang ? '<span class="res-chip is-lang">' + esc(v.lang) + '</span>' : '')
          + '</span></a>';
      }).join('');
    });

    /* ----- per-page filter ----- */
    var filterInput = document.querySelector('[data-res-filter]');
    if (filterInput) {
      var countEl = document.querySelector('[data-res-filter-count]');
      var emptyEl = document.querySelector('[data-res-filter-empty]');
      var applyFilter = function () {
        var q = filterInput.value.trim().toLowerCase();
        var shown = 0;
        document.querySelectorAll('.res-sec').forEach(function (sec) {
          var vis = 0;
          // a query naming the section (e.g. "static terms") keeps all its rows,
          // since row titles are often just the participant name
          var head = sec.querySelector('.res-sec-head');
          var secHit = !!q && !!head && head.textContent.toLowerCase().indexOf(q) !== -1;
          sec.querySelectorAll('.res-row').forEach(function (row) {
            var on = !q || secHit || row.textContent.toLowerCase().indexOf(q) !== -1;
            row.style.display = on ? '' : 'none';
            if (on) vis++;
          });
          // prose-only sections stay visible unless a query is active
          var rows = sec.querySelectorAll('.res-row').length;
          sec.style.display = (rows === 0 ? (q ? 'none' : '') : (vis ? '' : 'none'));
          shown += vis;
        });
        if (countEl) countEl.textContent = q ? shown + ' matching resource' + (shown === 1 ? '' : 's') : '';
        if (emptyEl) emptyEl.hidden = !(q && shown === 0);
      };
      filterInput.addEventListener('input', applyFilter);
    }

    /* ----- global search (hub) ----- */
    var searchWrap = document.querySelector('[data-res-search]');
    var resultsEl = document.querySelector('[data-res-results]');
    if (searchWrap && resultsEl) {
      var input = searchWrap.querySelector('input');
      var index = [];
      cats.forEach(function (c) {
        if (!c.external) {
          index.push({
            title: c.title, type: 'page', href: c.page, catTitle: 'Section',
            hay: (c.title + ' ' + (c.blurb || '')).toLowerCase()
          });
        }
        (c.sections || []).forEach(function (s) {
          s.items.forEach(function (it) {
            index.push({
              title: it.title, type: it.type, href: it.href, lang: it.lang,
              note: it.note, updated: it.updated, catTitle: c.title,
              hay: (it.title + ' ' + (it.lang || '') + ' ' + (it.note || '') + ' ' + s.title + ' ' + c.title).toLowerCase()
            });
          });
        });
      });

      var timer = null;
      var runSearch = function () {
        var q = input.value.trim().toLowerCase();
        if (!q) { resultsEl.hidden = true; resultsEl.innerHTML = ''; return; }
        var hits = index.filter(function (e) { return e.hay.indexOf(q) !== -1; });
        hits.sort(function (a, b) {
          var at = a.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
          var bt = b.title.toLowerCase().indexOf(q) !== -1 ? 0 : 1;
          return at - bt;
        });
        var top = hits.slice(0, 30);
        resultsEl.innerHTML = '<div class="res-results-head">'
          + (hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + (hits.length > 30 ? ' — showing first 30' : '') : 'No results')
          + '</div>'
          + (top.length
            ? top.map(function (e) { return rowHTML(e, { catChip: e.catTitle, minimal: isHub }); }).join('')
            : '<div class="res-empty">Nothing found for &ldquo;' + esc(input.value.trim()) + '&rdquo;. Try a different term.</div>');
        resultsEl.hidden = false;
      };
      input.addEventListener('input', function () {
        clearTimeout(timer);
        timer = setTimeout(runSearch, 120);
      });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { input.value = ''; runSearch(); input.blur(); }
      });
      document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          input.focus();
        }
      });
    }
  }

  /* late-injected .reveal nodes need their own observer pass */
  function observeReveals(root) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
    root.querySelectorAll('.reveal:not(.in)').forEach(function (el) { io.observe(el); });
  }
})();
