/* Peptide Atlas — shared behaviour: theme, tooltip, formatting, register filters, local nav. */
(function () {
  'use strict';
  const A = (window.Atlas = window.Atlas || {});

  // ---------- theme ----------
  const root = document.documentElement;
  const stored = (() => { try { return localStorage.getItem('atlas-theme'); } catch (e) { return null; } })();
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);
  A.isDark = () => {
    const t = root.getAttribute('data-theme');
    if (t) return t === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  A.cssVar = (name) => getComputedStyle(root).getPropertyValue(name).trim();
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const next = A.isDark() ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('atlas-theme', next); } catch (e) { /* private mode */ }
        btn.setAttribute('aria-label', A.t(next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'));
        window.dispatchEvent(new CustomEvent('atlas:theme'));
      });
    }
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => window.dispatchEvent(new CustomEvent('atlas:theme')));
    }
  });

  // ---------- language ----------
  A.lang = window.ATLAS_LANG || 'en';
  A.zh = A.lang === 'zh';
  /** Translate an English UI string (dictionary injected by the page); %d / %s are filled in order. */
  A.t = (s, ...args) => {
    let out = (window.ATLAS_T && window.ATLAS_T[s]) || s;
    args.forEach((a) => { out = out.replace(/%[ds]/, String(a)); });
    return out;
  };

  // ---------- formatting ----------
  A.fmt = (n, dec = 1) => {
    if (n === null || n === undefined || isNaN(n)) return '–';
    const a = Math.abs(n);
    const trim = (s) => s.replace(/\.0+([^\d.]+)$/, '$1').replace(/(\.\d*?)0+([^\d.]+)$/, '$1$2');
    if (A.zh) {
      if (a >= 1e8) return trim((n / 1e8).toFixed(dec) + '亿');
      if (a >= 1e4) return trim((n / 1e4).toFixed(dec) + '万');
      return Math.round(n).toLocaleString('en-US');
    }
    if (a >= 1e9) return trim((n / 1e9).toFixed(dec) + 'B');
    if (a >= 1e6) return trim((n / 1e6).toFixed(dec) + 'M');
    if (a >= 1e4) return trim((n / 1e3).toFixed(dec) + 'K');
    return Math.round(n).toLocaleString('en-US');
  };
  A.full = (n) => (n === null || n === undefined ? '–' : Math.round(n).toLocaleString('en-US'));
  A.pct = (x) => (x === null || x === undefined ? '–' : (x > 0 ? '+' : '') + Math.round(x * 100) + '%');
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  A.monthLabel = (key) => { const [y, m] = key.split('-'); return A.zh ? y + '年' + (+m) + '月' : MONTHS[+m - 1] + ' ' + y; };

  // ---------- DOM helper (text only, never innerHTML with data) ----------
  A.el = (tag, attrs, ...kids) => {
    const e = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k === 'style') e.setAttribute('style', attrs[k]);
      else if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    }
    for (const kid of kids) if (kid !== null && kid !== undefined) e.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    return e;
  };

  // ---------- tooltip ----------
  let tipEl = null;
  A.tip = {
    show(content, x, y) {
      if (!tipEl) { tipEl = A.el('div', { class: 'tt', role: 'tooltip' }); document.body.append(tipEl); }
      tipEl.replaceChildren(content);
      tipEl.classList.add('on');
      A.tip.move(x, y);
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
  /** Tooltip body: a header line and rows of [value, name, colour]. */
  A.tipBody = (head, rows) => {
    const box = A.el('div');
    if (head) box.append(A.el('div', { class: 'tt-head', text: head }));
    for (const r of rows) {
      const row = A.el('div', { class: 'tt-row' });
      if (r.color) row.append(A.el('span', { class: 'tt-key', style: 'background:' + r.color }));
      row.append(A.el('b', { text: r.value }));
      if (r.name) row.append(A.el('span', { class: 'tt-name', text: r.name }));
      box.append(row);
    }
    return box;
  };

  // ---------- bead tooltips (SVG <title> is the fallback) ----------
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('svg.beads.interactive, svg.wheel').forEach((svg) => {
      svg.querySelectorAll('.bd').forEach((g) => {
        const t = g.querySelector('title');
        if (!t) return;
        const text = t.textContent;
        g.dataset.tip = text;
        t.remove();
        g.addEventListener('pointerenter', (e) => {
          const [head, ...rest] = text.split(' — ');
          A.tip.show(A.tipBody(null, [{ value: head, name: rest.join(' — ') }]), e.clientX, e.clientY);
          g.classList.add('is-hot');
          svg.dispatchEvent(new CustomEvent('bead:hover', { detail: { c: +g.dataset.c, i: +g.dataset.i } }));
        });
        g.addEventListener('pointermove', (e) => A.tip.move(e.clientX, e.clientY));
        g.addEventListener('pointerleave', () => {
          A.tip.hide();
          g.classList.remove('is-hot');
          svg.dispatchEvent(new CustomEvent('bead:leave'));
        });
        g.addEventListener('click', () => svg.dispatchEvent(new CustomEvent('bead:click', { detail: { c: +g.dataset.c, i: +g.dataset.i } })));
      });
    });
  });

  // ---------- register filters (home) ----------
  document.addEventListener('DOMContentLoaded', () => {
    const reg = document.querySelector('.register');
    if (!reg) return;
    const rows = Array.from(reg.querySelectorAll('.reg-row'));
    const groups = Array.from(reg.querySelectorAll('.reg-group'));
    const q = document.getElementById('reg-search');
    const status = document.getElementById('reg-status');
    const sort = document.getElementById('reg-sort');
    const chips = Array.from(document.querySelectorAll('.chips [data-cat]'));
    const count = document.getElementById('reg-count');
    const empty = document.getElementById('reg-empty');
    let cat = 'all';
    const params = new URLSearchParams(location.search);
    if (params.get('q') && q) q.value = params.get('q');
    if (params.get('status') && status) status.value = params.get('status');
    if (params.get('sort') && sort) sort.value = params.get('sort');
    if (params.get('cat')) cat = params.get('cat');

    const apply = () => {
      const needle = (q && q.value || '').trim().toLowerCase();
      const st = status ? status.value : 'all';
      let shown = 0;
      rows.forEach((r) => {
        const ok = (cat === 'all' || r.dataset.cat === cat) && (st === 'all' || r.dataset.status === st) &&
          (!needle || r.dataset.search.includes(needle));
        r.hidden = !ok;
        if (ok) shown++;
      });
      const mode = sort ? sort.value : 'group';
      const flat = reg.querySelector('.reg-flat');
      if (mode === 'group') {
        flat.hidden = true;
        groups.forEach((g) => {
          const list = g.querySelector('.reg-list');
          rows.filter((r) => r.dataset.cat === g.dataset.cat).sort((a, b) => (+a.dataset.year - +b.dataset.year) || a.dataset.name.localeCompare(b.dataset.name)).forEach((r) => list.append(r));
          g.hidden = !rows.some((r) => r.dataset.cat === g.dataset.cat && !r.hidden);
        });
      } else {
        groups.forEach((g) => (g.hidden = true));
        flat.hidden = false;
        const key = { year: (r) => +r.dataset.year, attention: (r) => -(+r.dataset.views), length: (r) => -(+r.dataset.len), name: (r) => r.dataset.name, trials: (r) => -(+r.dataset.trials) }[mode];
        const list = flat.querySelector('.reg-list');
        rows.slice().sort((a, b) => { const x = key(a), y = key(b); return typeof x === 'string' ? x.localeCompare(y) : x - y; }).forEach((r) => list.append(r));
      }
      if (count) count.textContent = A.t(shown === 1 ? '%d peptide' : '%d peptides', shown);
      if (empty) empty.hidden = shown > 0;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.cat === cat)));
      const u = new URLSearchParams();
      if (params.get('lang')) u.set('lang', params.get('lang'));
      if (needle) u.set('q', needle);
      if (cat !== 'all') u.set('cat', cat);
      if (st !== 'all') u.set('status', st);
      if (mode !== 'group') u.set('sort', mode);
      history.replaceState(null, '', u.toString() ? '?' + u : location.pathname);
    };
    chips.forEach((c) => c.addEventListener('click', () => { cat = c.dataset.cat; apply(); }));
    [q, status, sort].forEach((x) => x && x.addEventListener('input', apply));
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement === document.body && q) { e.preventDefault(); q.focus(); }
    });
    apply();
  });

  // ---------- local section nav (detail pages) ----------
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.localnav');
    if (!nav || !('IntersectionObserver' in window)) return;
    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          links.forEach((l) => l.classList.remove('active'));
          const a = map.get(en.target.id);
          if (a) { a.classList.add('active'); a.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    map.forEach((a, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  });

  /** Read a JSON blob embedded in <script type="application/json" id=...>. */
  A.data = (id) => {
    const s = document.getElementById(id);
    if (!s) return null;
    try { return JSON.parse(s.textContent); } catch (e) { return null; }
  };
})();
