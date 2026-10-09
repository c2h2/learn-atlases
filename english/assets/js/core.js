/* English Atlas (engine shared with Maths Atlas) — shared behaviour: theme, translation, DOM helpers, tooltip, reading progress, TeX. */
(function () {
  'use strict';
  const MA = (window.MA = window.MA || {});

  // ---------- theme ----------
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem('maths-theme'); } catch (e) { return null; } })();
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
  MA.isDark = () => {
    const t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  };
  MA.cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = MA.isDark() ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('maths-theme', next); } catch (e) { /* private mode */ }
        window.dispatchEvent(new CustomEvent('ma:theme'));
      });
    }
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => window.dispatchEvent(new CustomEvent('ma:theme')));
    }
  });

  // ---------- language ----------
  MA.lang = window.MA_LANG || 'en';
  MA.zh = MA.lang === 'zh';
  /** Translate an English UI string (dictionary injected by the page); %d / %s are filled in order.
   *  'Next@@step' is the key 'Next' in a second sense: it shows as "Next" untranslated but has its own translation. */
  MA.t = (s, ...args) => {
    let out = (window.MA_T && window.MA_T[s]) || s;
    const ctx = out.indexOf('@@');
    if (ctx > 0) out = out.slice(0, ctx);
    args.forEach((a) => { out = out.replace(/%[ds]/, String(a)); });
    return out;
  };

  /** Glue for sentences assembled in code: MA.sep joins two sentences (a space in English, nothing after a
   *  Chinese full stop) and MA.p('.') / MA.p(', ') / MA.p('; ') / MA.p(': ') give the punctuation of the page language. */
  MA.sep = MA.zh ? '' : ' ';
  MA.p = (s) => (MA.zh ? ({ '.': '。', ', ': '，', '; ': '；', ': ': '：' })[s] || s : s);

  // ---------- DOM helper (text only, never innerHTML with data) ----------
  MA.el = (tag, attrs, ...kids) => {
    const svgTags = MA.el.svg;
    const e = svgTags.has(tag) ? document.createElementNS('http://www.w3.org/2000/svg', tag) : document.createElement(tag);
    if (attrs) for (const k in attrs) {
      const v = attrs[k];
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') e.setAttribute('class', v);
      else if (k === 'text') e.textContent = v;
      else if (k === 'style' && typeof v === 'object') Object.assign(e.style, v);
      else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids) if (kid !== null && kid !== undefined && kid !== false) e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    return e;
  };
  MA.el.svg = new Set(['svg', 'g', 'path', 'line', 'circle', 'rect', 'polyline', 'polygon', 'text', 'tspan', 'defs', 'marker', 'clipPath', 'foreignObject', 'title', 'ellipse', 'pattern', 'linearGradient', 'stop', 'use']);

  // ---------- number formatting ----------
  /** Format a number for display: up to `sig` significant digits, no trailing zeros, minus sign. */
  MA.fmt = (v, sig = 4) => {
    if (v === null || v === undefined || Number.isNaN(v)) return '–';
    if (!Number.isFinite(v)) return v > 0 ? '∞' : '−∞';
    if (v === 0) return '0';
    const a = Math.abs(v);
    let s;
    if (a >= 1e6 || a < 1e-4) s = v.toExponential(Math.max(0, sig - 1)).replace(/\.?0+e/, 'e');
    else s = String(+v.toPrecision(sig));
    return s.replace(/^-/, '−');
  };
  MA.fixed = (v, d = 3) => (Number.isFinite(v) ? v.toFixed(d).replace(/^-/, '−') : MA.fmt(v));

  // ---------- tooltip ----------
  let tipEl = null;
  MA.tip = {
    show(content, x, y) {
      if (!tipEl) { tipEl = MA.el('div', { class: 'tt', role: 'tooltip' }); document.body.append(tipEl); }
      tipEl.replaceChildren(content.nodeType ? content : document.createTextNode(String(content)));
      tipEl.classList.add('on');
      MA.tip.move(x, y);
    },
    move(x, y) {
      if (!tipEl) return;
      const w = tipEl.offsetWidth, h = tipEl.offsetHeight;
      let left = x + 14, top = y + 14;
      if (left + w > window.innerWidth - 8) left = x - w - 14;
      if (top + h > window.innerHeight - 8) top = y - h - 14;
      tipEl.style.left = Math.max(8, left) + 'px';
      tipEl.style.top = Math.max(8, top) + 'px';
    },
    hide() { if (tipEl) tipEl.classList.remove('on'); },
  };

  /** Read a JSON blob embedded in <script type="application/json" id=...>. */
  MA.data = (id) => {
    const s = document.getElementById(id);
    if (!s) return null;
    try { return JSON.parse(s.textContent); } catch (e) { return null; }
  };

  // ---------- TeX ----------
  /** Typeset TeX into an element with KaTeX when it is loaded; plain text otherwise. */
  MA.tex = (el, tex, display) => {
    if (window.katex) {
      if (!MA.macros) MA.macros = MA.data('ma-macros') || {};
      try { window.katex.render(String(tex), el, { displayMode: !!display, throwOnError: false, macros: Object.assign({}, MA.macros) }); return el; } catch (e) { /* fall through */ }
    }
    el.textContent = String(tex);
    return el;
  };
  /** A <span> with typeset TeX. */
  MA.texEl = (tex, display) => MA.tex(MA.el('span', { class: 'tex' }), tex, display);
  /** Formulas the build did not pre-render are typeset in the browser. */
  MA.typesetFallback = () => {
    document.querySelectorAll('.math-tex').forEach((el) => {
      const tex = el.textContent;
      const d = el.dataset.display === '1';
      MA.tex(el, tex, d);
      el.classList.remove('math-tex');
    });
  };

  // ---------- reading progress (this browser only) ----------
  const PKEY = 'english-progress';
  MA.progress = {
    all() { try { return JSON.parse(localStorage.getItem(PKEY) || '{}') || {}; } catch (e) { return {}; } },
    has(key) { return !!MA.progress.all()[key]; },
    set(key, on) {
      const p = MA.progress.all();
      if (on) p[key] = Date.now(); else delete p[key];
      try { localStorage.setItem(PKEY, JSON.stringify(p)); } catch (e) { /* storage blocked */ }
      document.dispatchEvent(new CustomEvent('ma:progress'));
    },
  };
  const markChains = () => {
    const p = MA.progress.all();
    document.querySelectorAll('[data-key]').forEach((el) => el.classList.toggle('is-done', !!p[el.dataset.key]));
    document.querySelectorAll('[data-progress]').forEach((el) => {
      const keys = el.dataset.progress.split(' ').filter(Boolean);
      const done = keys.filter((k) => p[k]).length;
      const bar = el.querySelector('i');
      if (bar) bar.style.width = keys.length ? (100 * done / keys.length) + '%' : '0';
      const lbl = el.parentElement && el.parentElement.querySelector('[data-progress-label]');
      if (lbl) lbl.textContent = done ? MA.t('%d of %d read', done, keys.length) : '';
    });
  };
  document.addEventListener('DOMContentLoaded', markChains);
  // course page: "Start the course" becomes "Continue: chapter n" at the first unread chapter
  document.addEventListener('DOMContentLoaded', () => {
    const go = document.querySelector('.course-go[data-chapters]');
    if (!go) return;
    let list = [];
    try { list = JSON.parse(go.dataset.chapters); } catch (e) { return; }
    const p = MA.progress.all();
    if (!list.some((c) => p[c.k])) return;
    const next = list.find((c) => !p[c.k]);
    if (!next) return;
    go.href = next.u;
    go.textContent = go.dataset.continue.replace('%d', next.n) + ' →';
    go.title = next.t;
  });
  document.addEventListener('ma:progress', markChains);

  // ---------- generic filter list (home, theorem index, practice) ----------
  /**
   * Rows carry data-search (lower-case text) and data-* facets; controls carry data-filter="facet"
   * (a <select>, or chips with data-value) and an input[data-filter=q]. Empty groups are hidden.
   */
  MA.filterList = (rootEl, opts = {}) => {
    const rows = Array.from(rootEl.querySelectorAll(opts.rows || '[data-search]'));
    const groups = Array.from(rootEl.querySelectorAll(opts.groups || '[data-group]'));
    const controls = Array.from(document.querySelectorAll('[data-filter]'));
    const count = document.querySelector(opts.count || '[data-count]');
    const empty = document.querySelector(opts.empty || '[data-empty]');
    const state = {};
    const params = new URLSearchParams(location.search);
    controls.forEach((c) => {
      const f = c.dataset.filter;
      const v = params.get(f);
      if (c.matches('input,select')) { if (v !== null) c.value = v; state[f] = c.value; }
      else if (c.dataset.value !== undefined && c.getAttribute('aria-pressed') === 'true' && state[f] === undefined) state[f] = c.dataset.value;
      if (v !== null && !c.matches('input,select')) state[f] = v;
    });
    const apply = () => {
      const q = (state.q || '').trim().toLowerCase();
      let shown = 0;
      rows.forEach((r) => {
        let ok = !q || r.dataset.search.includes(q);
        for (const f in state) {
          if (f === 'q' || !ok) continue;
          const want = state[f];
          if (want && want !== 'all') ok = (r.dataset[f] || '').split(' ').includes(want);
        }
        r.hidden = !ok;
        if (ok) shown++;
      });
      groups.forEach((g) => { g.hidden = !g.querySelector('[data-search]:not([hidden])'); });
      if (count) count.textContent = opts.countLabel ? opts.countLabel(shown) : String(shown);
      if (empty) empty.hidden = shown > 0;
      controls.forEach((c) => { if (!c.matches('input,select')) c.setAttribute('aria-pressed', String((state[c.dataset.filter] || 'all') === c.dataset.value)); });
      const u = new URLSearchParams();
      if (params.get('lang')) u.set('lang', params.get('lang'));
      for (const f in state) if (state[f] && state[f] !== 'all') u.set(f, state[f]);
      history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
    };
    controls.forEach((c) => {
      const f = c.dataset.filter;
      if (c.matches('input,select')) c.addEventListener('input', () => { state[f] = c.value; apply(); });
      else c.addEventListener('click', () => { state[f] = c.dataset.value; apply(); });
    });
    document.addEventListener('keydown', (e) => {
      const q = document.querySelector('input[data-filter=q]');
      if (e.key === '/' && q && document.activeElement === document.body) { e.preventDefault(); q.focus(); }
    });
    apply();
  };
})();
