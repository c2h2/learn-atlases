/* LLM Atlas (engine shared with Maths Atlas) — interactive figures: discrete mathematics, number theory, algebra and topology.
   graph, truthtable, venn, sieve, modular, euclid, permutation, cayley, pascal, cantor, mapping, relation, metricballs.
   Conventions: see tools/WIDGET_GUIDE.md. Extra CSS is injected once (classes prefixed w-dm-). */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;
  const T = (s, ...a) => MA.t(s, ...a);

  // ================================================================== shared helpers
  const CSS = `
.w-dm-box svg { user-select: none; -webkit-user-select: none; }
.w-dm-t { font-family: var(--font); font-size: 13px; fill: var(--ink); }
.w-dm-halo { paint-order: stroke; stroke: var(--plot-bg); stroke-width: 3.5px; stroke-linejoin: round; }
.w-dm-panel { padding: 10px 16px 12px; border-top: 1px solid var(--rule); font-size: .85rem; color: var(--ink-2); overflow-x: auto; }
.w-dm-panel:empty { display: none; }
.w-dm-panel > * + * { margin-top: 8px; }
.w-dm-row { display: flex; flex-wrap: wrap; gap: 4px 6px; align-items: center; }
.w-dm-row > .k { color: var(--ink-3); margin-right: 4px; }
.w-dm-chip { display: inline-block; min-width: 1.7em; padding: 1px 7px; border-radius: 999px; border: 1px solid var(--rule-2); background: var(--paper); font-family: var(--mono); font-size: .78rem; line-height: 1.5; text-align: center; color: var(--ink); white-space: nowrap; }
.w-dm-chip.on { background: var(--accent-wash); border-color: var(--accent); }
.w-dm-chip.dim { color: var(--ink-3); }
.w-dm-sw { display: inline-block; width: 11px; height: 11px; border-radius: 3px; vertical-align: -1px; margin-right: 5px; }
.w-dm-tab { border-collapse: collapse; font-size: .8125rem; font-variant-numeric: tabular-nums; }
.w-dm-tab th, .w-dm-tab td { padding: 3px 9px; border-bottom: 1px solid var(--rule); text-align: center; white-space: nowrap; }
.w-dm-tab th { color: var(--ink-3); font-weight: 600; border-bottom: 1px solid var(--ink-3); }
.w-dm-tab td { font-family: var(--mono); color: var(--ink); }
.w-dm-tab td.l, .w-dm-tab th.l { text-align: left; }
.w-dm-tab td.new { background: var(--accent-wash); }
.w-dm-tab td.set { font-weight: 700; color: var(--accent); }
.w-dm-tab td.dim { color: var(--ink-3); }
.w-dm-tab td.good { color: var(--good); }
.w-dm-tab td.bad { color: var(--bad); }
.w-dm-tab tr.hot td { background: var(--accent-wash); }
.w-dm-tab tr.off td { color: var(--ink-3); }
.w-dm-player { display: inline-flex; flex-wrap: wrap; align-items: center; gap: 6px; }
.w-dm-player .w-btn { min-width: 34px; justify-content: center; }
.w-btn:disabled { opacity: .4; cursor: default; }
.w-dm-count { font-family: var(--mono); font-size: .78rem; color: var(--ink-3); min-width: 8ch; }
.w-dm-msg { line-height: 1.5; }
.w-dm-ok { color: var(--good); font-weight: 600; }
.w-dm-no { color: var(--bad); font-weight: 600; }
.w-dm-hint { font-size: .78rem; color: var(--ink-3); }
/* graph */
.w-dm-e { fill: none; stroke: var(--ink-3); stroke-width: 2; stroke-linecap: round; }
.w-dm-ah { fill: var(--ink-3); }
.w-dm-edge.tree .w-dm-e { stroke: var(--series-1); stroke-width: 4.5; }
.w-dm-edge.tree .w-dm-ah { fill: var(--series-1); }
.w-dm-edge.tent .w-dm-e { stroke: var(--series-1); stroke-width: 3; stroke-dasharray: 7 5; }
.w-dm-edge.tent .w-dm-ah { fill: var(--series-1); }
.w-dm-edge.cand .w-dm-e { stroke: var(--series-2); stroke-width: 3; stroke-dasharray: 2 5; }
.w-dm-edge.cand .w-dm-ah { fill: var(--series-2); }
.w-dm-edge.rej .w-dm-e { stroke: var(--bad); stroke-width: 2.4; stroke-dasharray: 4 5; }
.w-dm-edge.rej .w-dm-ah { fill: var(--bad); }
.w-dm-edge.rej { opacity: .7; }
.w-dm-edge.faded { opacity: .2; }
.w-dm-edge.cur { opacity: 1; }
.w-dm-edge.cur .w-dm-e { stroke: var(--accent); stroke-width: 5; stroke-dasharray: none; }
.w-dm-edge.cur .w-dm-ah { fill: var(--accent); }
.w-dm-edge.path .w-dm-e { stroke: var(--accent); stroke-width: 6; stroke-dasharray: none; }
.w-dm-edge.path .w-dm-ah { fill: var(--accent); }
.w-dm-node { cursor: grab; outline: none; }
.w-dm-node:active { cursor: grabbing; }
.w-dm-nc { fill: var(--plot-bg); stroke: var(--ink-2); stroke-width: 2; }
.w-dm-node:focus-visible .w-dm-nc { stroke: var(--accent); stroke-width: 3.5; }
.w-dm-nt { font: 600 13px var(--font); fill: var(--ink); text-anchor: middle; dominant-baseline: central; pointer-events: none; }
.w-dm-nn { font: 600 11px var(--font); fill: var(--ink-2); paint-order: stroke; stroke: var(--plot-bg); stroke-width: 3.5px; stroke-linejoin: round; pointer-events: none; }
.w-dm-ring { fill: none; stroke: var(--accent); stroke-width: 3; pointer-events: none; }
.w-dm-node.done .w-dm-nc { fill: color-mix(in srgb, var(--series-1) 30%, var(--plot-bg)); stroke: var(--series-1); }
.w-dm-node.front .w-dm-nc { fill: color-mix(in srgb, var(--series-2) 24%, var(--plot-bg)); stroke: var(--series-2); }
.w-dm-node.bad .w-dm-nc { fill: color-mix(in srgb, var(--bad) 18%, var(--plot-bg)); stroke: var(--bad); stroke-width: 2.6; }
.w-dm-node.dim { opacity: .38; }
.w-dm-node.path .w-dm-nc { stroke: var(--accent); stroke-width: 3; }
.w-dm-wl { font: 600 12px var(--font); fill: var(--ink-2); text-anchor: middle; dominant-baseline: central; paint-order: stroke; stroke: var(--plot-bg); stroke-width: 4px; stroke-linejoin: round; pointer-events: none; }
.w-dm-en { font: 700 11px var(--font); fill: var(--accent); text-anchor: middle; dominant-baseline: central; paint-order: stroke; stroke: var(--plot-bg); stroke-width: 4px; stroke-linejoin: round; pointer-events: none; }
/* truth tables */
.w-dm-ttwrap { overflow: auto; max-height: 470px; padding: 4px 16px 12px; }
.w-dm-tt { border-collapse: collapse; margin: 6px auto 0; font-size: .875rem; }
.w-dm-tt th { padding: 7px 11px 6px; border-bottom: 1.5px solid var(--ink-3); font-weight: 400; color: var(--ink); white-space: nowrap; position: sticky; top: 0; background: var(--sheet); z-index: 1; }
.w-dm-tt td { padding: 3px 11px; text-align: center; font-family: var(--mono); border-bottom: 1px solid var(--rule); cursor: default; }
.w-dm-tt td.t { color: var(--ink); font-weight: 600; }
.w-dm-tt td.f { color: var(--ink-3); }
.w-dm-tt .var { background: color-mix(in srgb, var(--ink) 4%, transparent); }
.w-dm-tt .sep { border-left: 1.5px solid var(--ink-3); }
.w-dm-tt th.main, .w-dm-tt td.main { background: var(--accent-wash); }
.w-dm-tt th.main2, .w-dm-tt td.main2 { background: color-mix(in srgb, var(--series-2) 14%, var(--sheet)); }
.w-dm-tt tr.diff td { background: var(--bad-wash); }
.w-dm-tt td.ok { color: var(--good); }
.w-dm-tt td.no { color: var(--bad); font-weight: 700; }
.w-dm-tt td.src { box-shadow: inset 0 0 0 2px var(--accent); }
.w-dm-tt td.hov { box-shadow: inset 0 0 0 2px var(--ink); }
.w-dm-nf { overflow-x: auto; padding: 2px 0; }
/* venn */
.w-dm-vfill { fill: var(--series-1); fill-opacity: 0; transition: fill-opacity .12s; }
.w-dm-vreg { outline: none; }
.w-dm-vreg.on .w-dm-vfill { fill-opacity: .4; }
.w-dm-vreg.hov .w-dm-vfill { fill-opacity: .14; fill: var(--accent); }
.w-dm-vreg.on.hov .w-dm-vfill { fill-opacity: .55; fill: var(--series-1); }
.w-dm-vreg:focus-visible .w-dm-vfill { fill-opacity: .3; fill: var(--accent); }
/* euclid */
.w-dm-sq.hot rect { stroke: var(--accent) !important; stroke-width: 2.5 !important; }
.w-dm-nf .k { color: var(--ink-3); }
`;
  function style() {
    if (document.getElementById('w-dm-style')) return;
    document.head.append(el('style', { id: 'w-dm-style', text: CSS }));
  }

  /** Wrap an event handler so that it never throws; errors go to report(msg) when given. */
  function safe(fn, report) {
    return function (...a) {
      try { return fn.apply(this, a); } catch (e) { console.warn('[discrete]', e); if (report) report(e.message || String(e)); return undefined; }
    };
  }

  /** Integers with a real minus sign (BigInt too); other numbers through MA.fmt. */
  function num(v, sig = 6) {
    if (typeof v === 'bigint') return (v < 0n ? '−' : '') + (v < 0n ? -v : v).toString();
    if (Number.isInteger(v) && Math.abs(v) < 1e21) return (v < 0 ? '−' : '') + String(Math.abs(v));
    return MA.fmt(v, sig);
  }
  const mod = (a, n) => ((a % n) + n) % n;
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
  const lcm = (a, b) => (a && b ? Math.abs(a / gcd(a, b) * b) : 0);

  // categorical colours from the theme: six series-like hues, then mixes around a hue ring
  const HUES = ['var(--series-1)', 'var(--series-2)', 'var(--series-3)', 'var(--series-4)', 'var(--a-safety)', 'var(--a-systems)'];
  const RING = ['var(--series-1)', 'var(--series-3)', 'var(--a-systems)', 'var(--series-2)', 'var(--a-safety)', 'var(--series-4)'];
  /** Colour at position t in [0, 1) on a hue ring built from theme colours. */
  function ring(t) {
    t = ((t % 1) + 1) % 1;
    const x = t * RING.length, a = Math.floor(x), f = x - a;
    const A = RING[a % RING.length], B = RING[(a + 1) % RING.length];
    if (f < 0.03) return A;
    if (f > 0.97) return B;
    return 'color-mix(in oklab, ' + A + ' ' + Math.round((1 - f) * 100) + '%, ' + B + ')';
  }
  /** Categorical colour i out of k classes. */
  function cat(i, k) {
    if (!k || k <= HUES.length) return HUES[((i % HUES.length) + HUES.length) % HUES.length];
    return ring(i / k);
  }
  /** A colour mixed into the plot background (readable under ink text in both themes). */
  const tint = (c, pct) => 'color-mix(in srgb, ' + c + ' ' + pct + '%, var(--plot-bg))';

  /** Resolve a CSS colour (variables, color-mix) to an rgb() string for canvas drawing. */
  function resolver(host) {
    const probe = el('span', { style: 'display:none' });
    host.append(probe);
    const cache = new Map();
    const f = (css) => {
      if (cache.has(css)) return cache.get(css);
      probe.style.color = '';
      probe.style.color = css;
      const v = getComputedStyle(probe).color || '#888';
      cache.set(css, v);
      return v;
    };
    f.reset = () => cache.clear();
    return f;
  }

  /** An SVG drawing area in viewBox units (not a coordinate plot). */
  function svgBox(parent, w, h, o = {}) {
    const wrap = el('div', { class: 'w-plot w-dm-box' });
    const svg = el('svg', { viewBox: '0 0 ' + w + ' ' + h, role: o.role || 'img', 'aria-label': o.label || T('Interactive diagram'), preserveAspectRatio: 'xMidYMid meet' });
    svg.style.background = 'var(--plot-bg)';
    if (!o.drag) svg.style.touchAction = 'manipulation';
    wrap.append(svg);
    parent.append(wrap);
    const b = { wrap, svg, w, h };
    b.pt = (evt) => {
      const m = svg.getScreenCTM();
      if (!m) return [NaN, NaN];
      const p = svg.createSVGPoint();
      p.x = evt.clientX; p.y = evt.clientY;
      const q = p.matrixTransform(m.inverse());
      return [q.x, q.y];
    };
    b.size = (nw, nh) => { b.w = nw; b.h = nh; svg.setAttribute('viewBox', '0 0 ' + nw + ' ' + nh); };
    return b;
  }
  /** A viewBox width: the wide value, or a narrower one on small screens so that text stays legible. */
  function viewWidth(stage, wide, narrow) {
    const w = stage.clientWidth || (stage.parentElement && stage.parentElement.clientWidth) || 0;
    return w && w < 520 ? narrow : wide;
  }
  /** Any SVG element (MA.el only knows a fixed list of SVG tags; <mask> is not among them). */
  function svgNode(tag, attrs, ...kids) {
    const e = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs || {}) if (attrs[k] !== null && attrs[k] !== undefined) e.setAttribute(k, attrs[k]);
    kids.forEach((c) => c && e.append(c));
    return e;
  }
  /** SVG text centred at (x, y). */
  function stext(x, y, s, o = {}) {
    return el('text', { x, y, class: o.cls || 'w-dm-t', 'text-anchor': o.anchor || 'middle', 'dominant-baseline': o.base || 'central', style: o.style || null, text: s });
  }

  /** Small HTML builders for panels. */
  function chip(text, cls) { return el('span', { class: 'w-dm-chip' + (cls ? ' ' + cls : ''), text }); }
  function chipRow(label, items, hot) {
    const row = el('div', { class: 'w-dm-row' }, el('span', { class: 'k', text: label }));
    if (!items.length) row.append(el('span', { class: 'w-dm-hint', text: T('(empty)') }));
    items.forEach((it, i) => row.append(chip(String(it), hot && hot(i, it) ? 'on' : '')));
    return row;
  }
  /** Table from header cells and rows; a cell is a string, a node, or {t, cls, tex}. */
  function table(head, rows, o = {}) {
    const t = el('table', { class: 'w-dm-tab' + (o.cls ? ' ' + o.cls : '') });
    const cell = (tag, c) => {
      const td = el(tag);
      if (c === null || c === undefined) return td;
      if (c.nodeType) td.append(c);
      else if (typeof c === 'object') {
        if (c.cls) td.className = c.cls;
        if (c.tex !== undefined) td.append(MA.texEl(c.tex)); else td.textContent = c.t === undefined ? '' : String(c.t);
        if (c.title) td.title = c.title;
      } else td.textContent = String(c);
      return td;
    };
    if (head) t.append(el('thead', null, el('tr', null, ...head.map((h) => cell('th', h)))));
    const tb = el('tbody');
    rows.forEach((r) => {
      const tr = el('tr', { class: r.cls || null });
      (r.cells || r).forEach((c) => tr.append(cell('td', c)));
      tb.append(tr);
    });
    t.append(tb);
    return t;
  }

  /**
   * Step-through controls: reset, back, play/pause, forward and a step counter.
   * o.count() = number of frames, o.show(k) draws frame k, o.delay = seconds per step while playing.
   */
  function player(bar, o) {
    let k = 0, acc = 0;
    const box = el('div', { class: 'w-dm-player', role: 'group', 'aria-label': T('Step through') });
    const mk = (label, aria, fn, primary) => {
      const b = el('button', { type: 'button', class: 'w-btn' + (primary ? ' primary' : ''), 'aria-label': aria, title: aria, text: label });
      b.addEventListener('click', safe(fn));
      box.append(b);
      return b;
    };
    const PLAY = '▶︎ ' + T('Play'), PAUSE = '❚❚ ' + T('Pause');
    const bReset = mk('↺', T('Back to the start'), () => { stop(); go(0); });
    const bBack = mk('‹', T('Previous step'), () => { stop(); go(k - 1); });
    const bPlay = mk(PLAY, T('Play'), () => { if (anim.running) stop(); else { if (k >= o.count() - 1) go(0); acc = 0; anim.play(); bPlay.textContent = PAUSE; } }, true);
    const bStep = mk('›', T('Next step'), () => { stop(); go(k + 1); });
    const cnt = el('span', { class: 'w-dm-count', 'aria-live': 'off' });
    box.append(cnt);
    bar.append(box);
    const anim = MA.anim((dt) => {
      acc += dt;
      const delay = typeof o.delay === 'function' ? o.delay(k) : (o.delay || 1);
      if (acc < delay) return true;
      acc = 0;
      if (k >= o.count() - 1) { bPlay.textContent = PLAY; return false; }
      try { go(k + 1); } catch (e) { console.warn(e); bPlay.textContent = PLAY; return false; }
      if (k >= o.count() - 1) { bPlay.textContent = PLAY; return false; }
      return true;
    });
    function stop() { anim.stop(); bPlay.textContent = PLAY; }
    function go(j) {
      const n = Math.max(1, o.count());
      k = Math.max(0, Math.min(n - 1, j));
      cnt.textContent = o.label ? o.label(k, n) : T('step %d / %d', k, n - 1);
      bBack.disabled = bReset.disabled = k === 0;
      bStep.disabled = k >= n - 1;
      o.show(k);
    }
    return { go, stop, el: box, get k() { return k; }, end() { stop(); go(o.count() - 1); }, get playing() { return anim.running; } };
  }

  /** Points on a circle (centre cx, cy, radius r), first at the top, clockwise. */
  function circlePts(n, cx, cy, r, start = -Math.PI / 2) {
    return Array.from({ length: n }, (_, i) => [cx + r * Math.cos(start + 2 * Math.PI * i / n), cy + r * Math.sin(start + 2 * Math.PI * i / n)]);
  }
  /** Path data for an arrowhead with its tip at (x, y) pointing along (ux, uy). */
  function arrowHead(x, y, ux, uy, len = 11, wid = 8) {
    const L = Math.hypot(ux, uy) || 1;
    ux /= L; uy /= L;
    const bx = x - ux * len, by = y - uy * len;
    return 'M' + x.toFixed(1) + ',' + y.toFixed(1) + 'L' + (bx - uy * wid / 2).toFixed(1) + ',' + (by + ux * wid / 2).toFixed(1) +
      'L' + (bx + uy * wid / 2).toFixed(1) + ',' + (by - ux * wid / 2).toFixed(1) + 'Z';
  }

  // ------------------------------------------------------------------ layout of small graphs
  /**
   * Stress-majorisation layout (graph distances as target lengths). pairs: [[u, v]], fixed: [[x, y] | null].
   * Tries a circle and a classical-MDS start and keeps the lower-stress result. Returns [[x, y]] (y down).
   */
  function stressLayout(n, pairs, fixed) {
    if (n === 0) return [];
    if (n === 1) return [fixed[0] ? fixed[0].slice() : [0, 0]];
    const adj = Array.from({ length: n }, () => new Set());
    pairs.forEach(([u, v]) => { if (u !== v) { adj[u].add(v); adj[v].add(u); } });
    const D = [];
    let maxd = 1;
    for (let s = 0; s < n; s++) {
      const d = new Array(n).fill(Infinity);
      d[s] = 0;
      const q = [s];
      for (let h = 0; h < q.length; h++) for (const v of adj[q[h]]) if (d[v] === Infinity) { d[v] = d[q[h]] + 1; q.push(v); if (d[v] > maxd) maxd = d[v]; }
      D.push(d);
    }
    const far = Math.min(maxd + 1, Math.max(2, Math.ceil(Math.sqrt(n)) + 1));
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (D[i][j] === Infinity) D[i][j] = far;
    const isFixed = fixed.map(Boolean);
    const anyFixed = isFixed.some(Boolean);
    let unit = 1;
    if (anyFixed) {
      const rs = [];
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (isFixed[i] && isFixed[j]) rs.push(Math.hypot(fixed[i][0] - fixed[j][0], fixed[i][1] - fixed[j][1]) / D[i][j]);
      rs.sort((a, b) => a - b);
      if (rs.length && rs[rs.length >> 1] > 0) unit = rs[rs.length >> 1];
    }
    const run = (X, Y) => {
      for (let it = 0; it < 300; it++) {
        for (let i = 0; i < n; i++) {
          if (isFixed[i]) continue;
          let sx = 0, sy = 0, sw = 0;
          for (let j = 0; j < n; j++) {
            if (j === i) continue;
            const dij = D[i][j] * unit, w = 1 / (dij * dij);
            let dx = X[i] - X[j], dy = Y[i] - Y[j];
            let dist = Math.hypot(dx, dy);
            if (dist < 1e-9) { dx = 1e-3 * (1 + ((i * 7 + j * 3) % 5)); dy = 1e-3 * (((i * 3 + j * 5) % 7) - 3); dist = Math.hypot(dx, dy); }
            sx += w * (X[j] + dij * dx / dist);
            sy += w * (Y[j] + dij * dy / dist);
            sw += w;
          }
          X[i] = sx / sw; Y[i] = sy / sw;
        }
      }
      let st = 0;
      for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) { const dij = D[i][j] * unit; const e = Math.hypot(X[i] - X[j], Y[i] - Y[j]) - dij; st += e * e / (dij * dij); }
      return { X, Y, st };
    };
    const starts = [];
    const r0 = unit / (2 * Math.sin(Math.PI / Math.max(3, n)));
    if (anyFixed) {
      let cx = 0, cy = 0, k = 0;
      fixed.forEach((p) => { if (p) { cx += p[0]; cy += p[1]; k++; } });
      cx /= k; cy /= k;
      const X = [], Y = [];
      for (let i = 0; i < n; i++) {
        if (fixed[i]) { X.push(fixed[i][0]); Y.push(fixed[i][1]); continue; }
        const a = 2 * Math.PI * i / n;
        X.push(cx + r0 * Math.cos(a)); Y.push(cy + r0 * Math.sin(a));
      }
      starts.push([X, Y]);
    } else {
      starts.push([Array.from({ length: n }, (_, i) => r0 * Math.cos(-Math.PI / 2 + 2 * Math.PI * i / n)), Array.from({ length: n }, (_, i) => r0 * Math.sin(-Math.PI / 2 + 2 * Math.PI * i / n))]);
      if (n >= 3) starts.push(mds2(D, n));
    }
    let best = null;
    starts.forEach(([X, Y]) => { const r = run(X.slice(), Y.slice()); if (!best || r.st < best.st - 1e-9) best = r; });
    let pts = best.X.map((x, i) => [x, best.Y[i]]);
    if (!anyFixed) pts = principal(pts);
    return pts;
  }
  /** Classical multidimensional scaling to 2D (power iteration on the double-centred matrix). */
  function mds2(D, n) {
    const S = D.map((r) => r.map((d) => d * d));
    const rm = S.map((r) => r.reduce((a, b) => a + b, 0) / n);
    const tm = rm.reduce((a, b) => a + b, 0) / n;
    const B = S.map((r, i) => r.map((s, j) => -0.5 * (s - rm[i] - rm[j] + tm)));
    let shift = 0;
    B.forEach((r) => { shift = Math.max(shift, r.reduce((a, b) => a + Math.abs(b), 0)); });
    const vecs = [], vals = [];
    for (let k = 0; k < 2; k++) {
      let v = Array.from({ length: n }, (_, i) => Math.sin(1.3 * i + 0.7 + 2.1 * k) + 0.05 * i);
      let lam = 0;
      for (let it = 0; it < 300; it++) {
        let w = B.map((r, i) => r.reduce((a, b, j) => a + b * v[j], 0) + shift * v[i]);
        for (let p = 0; p < k; p++) { const dot = w.reduce((a, b, i) => a + b * vecs[p][i], 0); w = w.map((x, i) => x - dot * vecs[p][i]); }
        const nrm = Math.sqrt(w.reduce((a, b) => a + b * b, 0)) || 1;
        lam = nrm - shift;
        v = w.map((x) => x / nrm);
      }
      vecs.push(v); vals.push(lam);
    }
    return [vecs[0].map((x) => x * Math.sqrt(Math.max(vals[0], 1e-6))), vecs[1].map((x) => x * Math.sqrt(Math.max(vals[1], 1e-6)))];
  }
  /** Rotate a point set so that its main axis is horizontal. */
  function principal(pts) {
    const n = pts.length;
    const mx = pts.reduce((a, p) => a + p[0], 0) / n, my = pts.reduce((a, p) => a + p[1], 0) / n;
    let cxx = 0, cyy = 0, cxy = 0;
    pts.forEach(([x, y]) => { cxx += (x - mx) ** 2; cyy += (y - my) ** 2; cxy += (x - mx) * (y - my); });
    const th = 0.5 * Math.atan2(2 * cxy, cxx - cyy);
    const c = Math.cos(-th), s = Math.sin(-th);
    return pts.map(([x, y]) => [(x - mx) * c - (y - my) * s, (x - mx) * s + (y - my) * c]);
  }
  /** Scale and centre points into [l, r] x [t, b] keeping the aspect ratio; maxScale caps the zoom. */
  function fitBox(pts, l, t, r, b, maxScale = Infinity) {
    if (!pts.length) return [];
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    pts.forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
    const bw = x1 - x0, bh = y1 - y0;
    let s = Math.min(bw > 1e-9 ? (r - l) / bw : Infinity, bh > 1e-9 ? (b - t) / bh : Infinity, maxScale);
    if (!Number.isFinite(s)) s = 1;
    const ox = (l + r) / 2 - (x0 + x1) / 2 * s, oy = (t + b) / 2 - (y0 + y1) / 2 * s;
    return pts.map(([x, y]) => [ox + x * s, oy + y * s]);
  }

  // ================================================================== graph
  const GALG = [['none', 'Explore'], ['bfs', 'Breadth-first search'], ['dfs', 'Depth-first search'], ['dijkstra', 'Dijkstra (shortest paths)'],
    ['prim', 'Prim (spanning tree)'], ['kruskal', 'Kruskal (spanning tree)'], ['topo', 'Topological sort'], ['euler', 'Euler circuit'], ['colour', 'Greedy colouring']];
  const GALIAS = { color: 'colour', colouring: 'colour', coloring: 'colour', greedy: 'colour', topological: 'topo', toposort: 'topo', eulerian: 'euler', hierholzer: 'euler', mst: 'kruskal', explore: 'none', '': 'none' };
  const EDGE_OPS = ['<->', '->', '<-', '--', '↔', '→', '←', '—', '–', '-', '>', '<'];

  function parseGraph(cfg) {
    let specs = C.list(cfg.nodes);
    if (specs.length === 1 && !specs[0].includes('@') && specs[0].includes(',')) specs = specs[0].split(',').map((s) => s.trim()).filter(Boolean);
    if (!specs.length) throw new Error(T('graph: list the vertices in “nodes”, e.g. A; B; C'));
    const nodes = [], idx = new Map();
    for (const s of specs) {
      let name = s, pos = null;
      const at = s.indexOf('@');
      if (at >= 0) {
        name = s.slice(0, at).trim();
        const xy = s.slice(at + 1).replace(/[()]/g, '').split(',');
        if (xy.length !== 2) throw new Error(T('vertex “%s”: write a position as A@x,y', s));
        pos = xy.map((q) => C.num(q));
      }
      if (!name) throw new Error(T('empty vertex name in “%s”', s));
      if (name.includes(':')) throw new Error(T('vertex names cannot contain “:” (%s)', name));
      if (idx.has(name)) throw new Error(T('vertex “%s” is listed twice', name));
      idx.set(name, nodes.length);
      nodes.push({ name, pos });
    }
    if (nodes.length > 60) throw new Error(T('graph: at most 60 vertices'));
    const edges = [];
    const raw = C.has(cfg.edges) ? String(cfg.edges).split(/[;,]/).map((q) => q.trim()).filter(Boolean) : [];
    for (const s of raw) {
      let body = s, w = null;
      const ci = s.lastIndexOf(':');
      if (ci >= 0) {
        body = s.slice(0, ci).trim();
        try { w = C.num(s.slice(ci + 1)); } catch (e) { throw new Error(T('edge “%s”: the weight must be a number', s)); }
      }
      let hit = null;
      for (let i = 1; i < body.length && !hit; i++) {
        for (const op of EDGE_OPS) {
          if (!body.startsWith(op, i)) continue;
          const a = body.slice(0, i).trim(), b = body.slice(i + op.length).trim();
          if (idx.has(a) && idx.has(b)) { hit = { a, b, op }; break; }
        }
      }
      if (!hit) {
        const m = /^(.*?)\s*(<->|->|<-|--|↔|→|←|—|–|-|>|<)\s*(.*)$/.exec(body);
        if (!m || !m[1].trim() || !m[3].trim()) throw new Error(T('edge “%s”: write A-B, A>B (directed) or A-B:3 (weighted)', s));
        const unknown = [m[1].trim(), m[3].trim()].filter((q) => !idx.has(q));
        throw new Error(T('edge “%s”: unknown vertex %s — add it to nodes', s, unknown.join(', ')));
      }
      const u = idx.get(hit.a), v = idx.get(hit.b), op = hit.op;
      if (op === '<->' || op === '↔') { edges.push({ u, v, w, dir: true }, { u: v, v: u, w, dir: true }); }
      else if (op === '->' || op === '>' || op === '→') edges.push({ u, v, w, dir: true });
      else if (op === '<-' || op === '<' || op === '←') edges.push({ u: v, v: u, w, dir: true });
      else edges.push({ u, v, w, dir: false });
    }
    if (edges.length > 300) throw new Error(T('graph: at most 300 edges'));
    return finishGraph(nodes, edges, idx);
  }
  /** Adjacency lists and helpers for nodes [{name, pos}] and edges [{u, v, w, dir}]. */
  function finishGraph(nodes, edges, idx) {
    edges.forEach((e, i) => { e.id = i; if (e.w === undefined) e.w = null; });
    const G = { nodes, edges, idx: idx || new Map(nodes.map((nd, i) => [nd.name, i])), weighted: edges.some((e) => e.w !== null), directed: edges.some((e) => e.dir) };
    G.mixed = G.directed && edges.some((e) => !e.dir);
    G.out = nodes.map(() => []);
    G.und = nodes.map(() => []);
    edges.forEach((e) => {
      G.out[e.u].push({ v: e.v, e: e.id });
      if (!e.dir && e.u !== e.v) G.out[e.v].push({ v: e.u, e: e.id });
      G.und[e.u].push({ v: e.v, e: e.id });
      if (e.u !== e.v) G.und[e.v].push({ v: e.u, e: e.id });
    });
    const byV = (p, q) => p.v - q.v || p.e - q.e;
    G.out.forEach((l) => l.sort(byV));
    G.und.forEach((l) => l.sort(byV));
    G.name = (i) => nodes[i].name;
    G.wt = (e) => (G.edges[e].w === null ? 1 : G.edges[e].w);
    G.elab = (e) => { const q = G.edges[e]; return G.name(q.u) + (q.dir ? '→' : '–') + G.name(q.v); };
    return G;
  }

  /** Records algorithm frames: persistent states plus transient highlights cleared after each snapshot. */
  function recorder(G) {
    const n = G.nodes.length, m = G.edges.length;
    const S = { node: new Array(n).fill(''), note: new Array(n).fill(''), ncol: new Array(n).fill(null), edge: new Array(m).fill(''), enote: new Array(m).fill(''), ecol: new Array(m).fill(null) };
    const tmp = { ring: new Set(), cur: new Set(), cand: new Set() };
    const frames = [];
    return {
      S, tmp, frames,
      snap(msg, panel) {
        const edge = S.edge.slice();
        tmp.cand.forEach((e) => { if (!edge[e] || edge[e] === 'faded') edge[e] = 'cand'; });
        tmp.cur.forEach((e) => { edge[e] = (edge[e] ? edge[e] + ' ' : '') + 'cur'; });
        frames.push({ node: S.node.slice(), note: S.note.slice(), ncol: S.ncol.slice(), edge, enote: S.enote.slice(), ecol: S.ecol.slice(), ring: new Set(tmp.ring), msg, panel });
        tmp.ring.clear(); tmp.cur.clear(); tmp.cand.clear();
      },
    };
  }
  const nameList = (G, ids) => ids.map((i) => G.name(i)).join(', ');
  /** Connected components of the underlying undirected graph (only vertices with edges if onlyEdges). */
  function components(G) {
    const n = G.nodes.length, comp = new Array(n).fill(-1);
    let k = 0;
    for (let s = 0; s < n; s++) {
      if (comp[s] >= 0) continue;
      comp[s] = k;
      const q = [s];
      for (let h = 0; h < q.length; h++) for (const { v } of G.und[q[h]]) if (comp[v] < 0) { comp[v] = k; q.push(v); }
      k++;
    }
    return { comp, count: k };
  }

  function algBFS(G, s) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const seen = new Array(n).fill(false), level = new Array(n).fill(-1), parE = new Array(n).fill(-1);
    const q = [s], order = [];
    seen[s] = true; level[s] = 0; S.node[s] = 'front'; S.note[s] = 'd=0';
    const panel = (ord, qu) => () => [chipRow(T('Visited (in order):'), ord.map((i) => G.name(i))), chipRow(T('Queue:'), qu.map((i) => G.name(i)), (i) => i === 0)];
    R.snap(T('Start at %s: mark it and put it in the queue. Labels show d = distance from %s in edges.', G.name(s), G.name(s)), panel(order.slice(), q.slice()));
    while (q.length) {
      const u = q.shift();
      order.push(u);
      S.node[u] = 'done';
      R.tmp.ring.add(u);
      const found = [];
      for (const { v, e } of G.out[u]) {
        if (seen[v]) continue;
        seen[v] = true; level[v] = level[u] + 1; parE[v] = e; q.push(v);
        S.node[v] = 'front'; S.edge[e] = 'tree'; S.note[v] = 'd=' + level[v];
        R.tmp.cur.add(e);
        found.push(v);
      }
      R.snap(found.length ? T('Take %s from the front of the queue; discover %s and add to the back.', G.name(u), nameList(G, found))
        : T('Take %s from the front of the queue; it has no undiscovered neighbours.', G.name(u)), panel(order.slice(), q.slice()));
    }
    const miss = G.nodes.map((_, i) => i).filter((i) => !seen[i]);
    miss.forEach((i) => { S.node[i] = 'dim'; });
    G.edges.forEach((e, id) => { if (!S.edge[id]) S.edge[id] = 'faded'; });
    R.snap(T('Done. Visiting order: %s. The blue edges form the BFS tree; its paths are shortest paths (fewest edges).', nameList(G, order)) +
      (miss.length ? MA.sep + T('Not reachable from %s: %s.', G.name(s), nameList(G, miss)) : '') + MA.sep + T('Click a vertex to see its path.'), panel(order.slice(), []));
    return { frames: R.frames, pathTo: treePath(G, parE, s, null) };
  }

  function algDFS(G, s) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const disc = new Array(n).fill(0), fin = new Array(n).fill(0), parE = new Array(n).fill(-1);
    let time = 0;
    const order = [];
    const stack = [{ u: s, i: 0 }];
    disc[s] = ++time; order.push(s);
    S.node[s] = 'front'; S.note[s] = disc[s] + '/–';
    const panel = (ord, st) => () => [chipRow(T('Discovered (in order):'), ord.map((i) => G.name(i))), chipRow(T('Stack (bottom → top):'), st.map((i) => G.name(i)), (i) => i === st.length - 1)];
    const stk = () => stack.map((f) => f.u);
    R.tmp.ring.add(s);
    R.snap(T('Start at %s. Labels show discovery / finishing times.', G.name(s)), panel(order.slice(), stk()));
    while (stack.length) {
      const top = stack[stack.length - 1], u = top.u, nb = G.out[u];
      while (top.i < nb.length && disc[nb[top.i].v]) top.i++;
      if (top.i < nb.length) {
        const { v, e } = nb[top.i++];
        disc[v] = ++time; parE[v] = e; order.push(v);
        S.edge[e] = 'tree'; S.node[v] = 'front'; S.note[v] = disc[v] + '/–';
        R.tmp.cur.add(e); R.tmp.ring.add(v);
        stack.push({ v, u: v, i: 0 });
        R.snap(T('Go deeper: %s → %s (the first undiscovered neighbour of %s).', G.name(u), G.name(v), G.name(u)), panel(order.slice(), stk()));
      } else {
        stack.pop();
        fin[u] = ++time;
        S.node[u] = 'done'; S.note[u] = disc[u] + '/' + fin[u];
        R.tmp.ring.add(u);
        const back = stack.length ? stack[stack.length - 1].u : -1;
        R.snap(back >= 0 ? T('%s has no undiscovered neighbours: finish it and backtrack to %s.', G.name(u), G.name(back))
          : T('%s is finished and the stack is empty.', G.name(u)), panel(order.slice(), stk()));
      }
    }
    const miss = G.nodes.map((_, i) => i).filter((i) => !disc[i]);
    miss.forEach((i) => { S.node[i] = 'dim'; });
    G.edges.forEach((e, id) => { if (!S.edge[id]) S.edge[id] = 'faded'; });
    R.snap(T('Done. Discovery order: %s; the blue edges form the DFS tree.', nameList(G, order)) + (miss.length ? MA.sep + T('Not reachable from %s: %s.', G.name(s), nameList(G, miss)) : ''), panel(order.slice(), []));
    return { frames: R.frames, pathTo: treePath(G, parE, s, null) };
  }

  /** Path from s to v along parent edges; returns {edges, nodes, text} or null. */
  function treePath(G, parE, s, dist) {
    return (v) => {
      if (v === s) return { edges: [], nodes: [s], text: T('%s is the start vertex.', G.name(s)) };
      if (parE[v] < 0) return { edges: [], nodes: [v], text: T('%s is not reachable from %s.', G.name(v), G.name(s)) };
      const es = [], ns = [v];
      let x = v, guard = 0;
      while (x !== s && parE[x] >= 0 && guard++ < 1000) {
        const e = G.edges[parE[x]];
        es.push(parE[x]);
        x = e.u === x && !e.dir ? e.v : e.u;
        if (e.dir) x = e.u;
        ns.push(x);
      }
      ns.reverse(); es.reverse();
      const len = dist ? dist[v] : es.length;
      return { edges: es, nodes: ns, text: T('Path %s, length %s.', ns.map((i) => G.name(i)).join(' → '), num(len)) };
    };
  }

  function algDijkstra(G, s) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const neg = G.edges.find((e) => G.wt(e.id) < 0);
    if (neg) { R.snap(T('Dijkstra’s algorithm needs non-negative weights, but %s has weight %s.', G.elab(neg.id), num(neg.w)), null); return { frames: R.frames }; }
    const d = new Array(n).fill(Infinity), prev = new Array(n).fill(-1), parE = new Array(n).fill(-1), done = new Array(n).fill(false);
    d[s] = 0;
    const rows = [];
    const fd = (x) => (x === Infinity ? '∞' : num(x));
    const cells = (now, changed) => G.nodes.map((_, v) => {
      if (done[v] && v !== now) return { t: '', cls: 'dim' };
      const t = fd(d[v]) + (prev[v] >= 0 ? ' (' + G.name(prev[v]) + ')' : '');
      return { t: v === now ? t + ' ✓' : t, cls: v === now ? 'set' : changed.has(v) ? 'new' : '' };
    });
    const notes = () => G.nodes.forEach((_, v) => { S.note[v] = 'd=' + fd(d[v]); });
    const panel = (rs) => () => {
      const t = table([T('settled'), ...G.nodes.map((nd) => nd.name)], rs.map((r) => ({ cells: [{ t: r.label, cls: 'l' }, ...r.cells] })));
      return [t, el('div', { class: 'w-dm-hint', text: T('Each row: tentative distance (previous vertex) after settling; ✓ = final.') })];
    };
    notes();
    S.node[s] = 'front';
    rows.push({ label: '–', cells: cells(-1, new Set([s])) });
    R.snap(T('Start: d(%s) = 0 and every other tentative distance is ∞.', G.name(s)), panel(rows.slice()));
    for (let it = 0; it < n; it++) {
      let u = -1;
      for (let v = 0; v < n; v++) if (!done[v] && d[v] < Infinity && (u < 0 || d[v] < d[u])) u = v;
      if (u < 0) break;
      done[u] = true;
      S.node[u] = 'done';
      R.tmp.ring.add(u);
      if (parE[u] >= 0) S.edge[parE[u]] = 'tree';
      const changed = new Set(), parts = [];
      for (const { v, e } of G.out[u]) {
        if (done[v] || v === u) continue;
        const nd = d[u] + G.wt(e);
        R.tmp.cur.add(e);
        if (nd < d[v]) {
          if (parE[v] >= 0) S.edge[parE[v]] = '';
          const old = d[v];
          d[v] = nd; prev[v] = u; parE[v] = e; changed.add(v);
          S.edge[e] = 'tent'; S.node[v] = 'front';
          parts.push(T('%s: %s + %s = %s < %s, update', G.name(v), num(d[u]), num(G.wt(e)), num(nd), fd(old)));
        } else {
          parts.push(T('%s: %s + %s = %s ≥ %s, keep', G.name(v), num(d[u]), num(G.wt(e)), num(nd), fd(d[v])));
        }
      }
      notes();
      rows.push({ label: G.name(u), cells: cells(u, changed) });
      R.snap(T('Settle %s: it has the smallest tentative distance, %s.', G.name(u), num(d[u])) + MA.sep + (parts.length ? T('Relax its edges — %s.', parts.join(MA.p('; '))) : T('No unsettled neighbours.')), panel(rows.slice()));
    }
    const miss = G.nodes.map((_, i) => i).filter((i) => !done[i]);
    miss.forEach((i) => { S.node[i] = 'dim'; });
    G.edges.forEach((e, id) => { if (S.edge[id] !== 'tree') S.edge[id] = 'faded'; });
    R.snap(T('Done: every reachable vertex is settled. The blue edges form a shortest-path tree. Click a vertex to see its shortest path.') +
      (miss.length ? MA.sep + T('Not reachable: %s.', nameList(G, miss)) : ''), panel(rows.slice()));
    return { frames: R.frames, pathTo: treePath(G, parE, s, d) };
  }

  function mstNote(G) { return G.directed ? ' ' + T('(Edge directions are ignored: spanning trees are for undirected graphs.)') : ''; }

  function algPrim(G, s) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const inT = new Array(n).fill(false);
    inT[s] = true; S.node[s] = 'done';
    let total = 0;
    const chosen = [];
    const panel = (ch, tot) => () => [chipRow(T('Tree edges:'), ch.map((e) => G.elab(e) + ' (' + num(G.wt(e)) + ')')), el('div', null, T('Total weight: '), el('b', { text: num(tot) }))];
    R.tmp.ring.add(s);
    R.snap(T('Start the tree at %s. At each step add the cheapest edge with exactly one end in the tree.', G.name(s)) + mstNote(G), panel([], 0));
    for (let k = 1; k < n; k++) {
      let best = -1;
      G.edges.forEach((e) => {
        if (e.u === e.v || inT[e.u] === inT[e.v]) return;
        R.tmp.cand.add(e.id);
        if (best < 0 || G.wt(e.id) < G.wt(best)) best = e.id;
      });
      if (best < 0) break;
      const e = G.edges[best], v = inT[e.u] ? e.v : e.u;
      inT[v] = true; S.node[v] = 'done'; S.edge[best] = 'tree';
      total += G.wt(best);
      chosen.push(best);
      R.tmp.cur.add(best); R.tmp.ring.add(v);
      R.snap(T('Cheapest edge leaving the tree (dotted = candidates): %s, weight %s. Add it and %s.', G.elab(best), num(G.wt(best)), G.name(v)), panel(chosen.slice(), total));
    }
    const miss = G.nodes.map((_, i) => i).filter((i) => !inT[i]);
    miss.forEach((i) => { S.node[i] = 'dim'; });
    G.edges.forEach((e, id) => { if (S.edge[id] !== 'tree') S.edge[id] = 'faded'; });
    R.snap(miss.length ? T('No edge leaves the tree: the graph is not connected, so %s cannot be reached. This is a minimum spanning tree of the component of %s (weight %s).', nameList(G, miss), G.name(s), num(total))
      : T('All %d vertices are in the tree: a minimum spanning tree with %d edges and total weight %s.', n, chosen.length, num(total)), panel(chosen.slice(), total));
    return { frames: R.frames };
  }

  function algKruskal(G) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const par = G.nodes.map((_, i) => i);
    const find = (x) => { while (par[x] !== x) { par[x] = par[par[x]]; x = par[x]; } return x; };
    const sorted = G.edges.map((e) => e.id).sort((a, b) => G.wt(a) - G.wt(b) || a - b);
    const status = new Map();
    let total = 0, taken = 0;
    const colourComps = () => {
      const roots = new Map();
      G.nodes.forEach((_, v) => { const r = find(v); if (!roots.has(r)) roots.set(r, roots.size); });
      const k = roots.size;
      G.nodes.forEach((_, v) => { S.ncol[v] = k === n ? null : roots.get(find(v)); });
      // colour only vertices in trees with at least one edge
      const size = new Map();
      G.nodes.forEach((_, v) => size.set(find(v), (size.get(find(v)) || 0) + 1));
      const big = [...new Set(G.nodes.map((_, v) => find(v)))].filter((r) => size.get(r) > 1);
      const idxOf = new Map(big.map((r, i) => [r, i]));
      G.nodes.forEach((_, v) => { const r = find(v); S.ncol[v] = idxOf.has(r) ? idxOf.get(r) : null; });
      status.forEach((st, e) => { if (st === 'take') S.ecol[e] = cat(idxOf.get(find(G.edges[e].u)) || 0); });
    };
    const panel = (st, tot, cur) => () => [table([T('edge'), T('weight'), ''], sorted.map((e) => ({
      cls: e === cur ? 'hot' : st.get(e) === 'skip' || st.get(e) === 'unused' ? 'off' : '',
      cells: [{ t: G.elab(e), cls: 'l' }, num(G.wt(e)), st.get(e) === 'take' ? { t: '✓ ' + T('add'), cls: 'good' } : st.get(e) === 'skip' ? { t: '✗ ' + T('cycle'), cls: 'bad' } : st.get(e) === 'unused' ? T('not needed') : ''],
    }))), el('div', null, T('Total weight: '), el('b', { text: num(tot) }))];
    R.snap(T('Sort the edges by weight. Every vertex starts as its own tree; take edges in order, skipping any that would close a cycle.') + mstNote(G), panel(new Map(status), 0, -1));
    for (const e of sorted) {
      if (taken === n - 1) break;
      const q = G.edges[e];
      const ru = find(q.u), rv = find(q.v);
      R.tmp.cur.add(e);
      if (ru !== rv) {
        par[ru] = rv; status.set(e, 'take'); S.edge[e] = 'tree'; total += G.wt(e); taken++;
        colourComps();
        R.tmp.ring.add(q.u); R.tmp.ring.add(q.v);
        R.snap(T('%s (weight %s) joins two different trees: add it.', G.elab(e), num(G.wt(e))), panel(new Map(status), total, e));
      } else {
        status.set(e, 'skip'); S.edge[e] = 'rej';
        R.snap(q.u === q.v ? T('%s is a loop: skip it.', G.elab(e)) : T('%s would close a cycle (%s and %s are already in the same tree): skip it.', G.elab(e), G.name(q.u), G.name(q.v)), panel(new Map(status), total, e));
      }
    }
    sorted.forEach((e) => { if (!status.has(e)) { status.set(e, 'unused'); S.edge[e] = 'faded'; } });
    G.edges.forEach((e, id) => { if (S.edge[id] === 'rej') S.edge[id] = 'faded'; });
    const comps = new Set(G.nodes.map((_, v) => find(v))).size;
    R.snap(comps === 1 ? T('Done: %d edges join all %d vertices. Minimum spanning tree weight: %s.', taken, n, num(total))
      : T('The graph has %d components, so this is a minimum spanning forest (weight %s).', comps, num(total)), panel(new Map(status), total, -1));
    return { frames: R.frames };
  }

  function algTopo(G) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    if (G.edges.some((e) => !e.dir)) {
      R.snap(T('A topological order needs a directed graph: write every edge as A>B.'), null);
      return { frames: R.frames };
    }
    const indeg = new Array(n).fill(0);
    G.edges.forEach((e) => { indeg[e.v]++; });
    const removed = new Array(n).fill(false);
    let ready = G.nodes.map((_, i) => i).filter((i) => indeg[i] === 0);
    const order = [];
    G.nodes.forEach((_, i) => { S.note[i] = T('in %d', indeg[i]); if (!indeg[i]) S.node[i] = 'front'; });
    const panel = (ord, rd) => () => [chipRow(T('Order so far:'), ord.map((i) => G.name(i))), chipRow(T('Ready (in-degree 0):'), rd.map((i) => G.name(i)), (i) => i === 0)];
    R.snap(T('Count incoming edges. Vertices with in-degree 0 can go first: %s.', ready.length ? nameList(G, ready) : T('none')), panel([], ready.slice()));
    while (ready.length) {
      const u = ready.shift();
      removed[u] = true; order.push(u);
      S.node[u] = 'done'; S.note[u] = '#' + order.length;
      R.tmp.ring.add(u);
      const fresh = [];
      G.edges.forEach((e) => {
        if (e.u !== u) return;
        S.edge[e.id] = 'faded';
        if (removed[e.v]) return;
        indeg[e.v]--;
        S.note[e.v] = T('in %d', indeg[e.v]);
        if (indeg[e.v] === 0) { fresh.push(e.v); S.node[e.v] = 'front'; }
      });
      ready = ready.concat(fresh).sort((a, b) => a - b);
      R.snap(T('Output %s and delete its outgoing edges.', G.name(u)) + (fresh.length ? ' ' + T('Now in-degree 0: %s.', nameList(G, fresh)) : ''), panel(order.slice(), ready.slice()));
    }
    if (order.length < n) {
      // every remaining vertex has an incoming edge from a remaining vertex: walk backwards to find a cycle
      const rest = G.nodes.map((_, i) => i).filter((i) => !removed[i]);
      const seenAt = new Map();
      let x = rest[0];
      const walk = [];
      while (!seenAt.has(x)) {
        seenAt.set(x, walk.length);
        const e = G.edges.find((q) => q.v === x && !removed[q.u]);
        walk.push(e.id);
        x = e.u;
      }
      const cyc = walk.slice(seenAt.get(x)).reverse();
      cyc.forEach((e) => { S.edge[e] = 'rej'; R.tmp.cur.add(e); });
      rest.forEach((i) => { S.node[i] = 'bad'; });
      const verts = cyc.map((e) => G.name(G.edges[e].u));
      R.snap(T('Stuck: every remaining vertex has an incoming edge. The graph contains the cycle %s, so no topological order exists.', verts.concat(verts[0]).join(' → ')), panel(order.slice(), []));
    } else {
      R.snap(T('Done. Topological order: %s — every edge points forwards in this list.', nameList(G, order)), panel(order.slice(), []));
    }
    return { frames: R.frames };
  }

  function algEuler(G, s0) {
    const R = recorder(G), S = R.S, n = G.nodes.length, m = G.edges.length;
    if (!m) { R.snap(T('The graph has no edges.'), null); return { frames: R.frames }; }
    if (G.mixed) { R.snap(T('Make every edge directed or every edge undirected to look for an Euler circuit.'), null); return { frames: R.frames }; }
    const dir = G.directed;
    const outd = new Array(n).fill(0), ind = new Array(n).fill(0), deg = new Array(n).fill(0);
    G.edges.forEach((e) => { outd[e.u]++; ind[e.v]++; deg[e.u]++; deg[e.v]++; });
    const { comp } = components(G);
    const withEdges = G.nodes.map((_, i) => i).filter((i) => deg[i] > 0);
    const comps = new Set(withEdges.map((i) => comp[i]));
    G.nodes.forEach((_, i) => { S.note[i] = dir ? T('in %d out %d', ind[i], outd[i]) : T('deg %d', deg[i]); });
    if (comps.size > 1) {
      R.snap(T('The edges lie in %d separate components, so no walk can use them all: no Euler circuit or trail.', comps.size), null);
      return { frames: R.frames };
    }
    let start = deg[s0] > 0 ? s0 : withEdges[0], end = start, circuit = true;
    let why = '';
    if (!dir) {
      const odd = G.nodes.map((_, i) => i).filter((i) => deg[i] % 2);
      if (odd.length === 0) why = T('Every vertex has even degree and the edges are connected, so an Euler circuit exists.');
      else if (odd.length === 2) {
        circuit = false;
        start = odd.includes(s0) ? s0 : odd[0]; end = odd[0] === start ? odd[1] : odd[0];
        odd.forEach((i) => { S.node[i] = 'bad'; });
        why = T('No Euler circuit: %s and %s have odd degree. With exactly two odd vertices there is an Euler trail from one to the other.', G.name(odd[0]), G.name(odd[1]));
      } else {
        odd.forEach((i) => { S.node[i] = 'bad'; });
        R.snap(T('No Euler circuit or trail: %d vertices have odd degree (%s). A circuit needs all degrees even, a trail at most two odd.', odd.length, nameList(G, odd)), null);
        return { frames: R.frames };
      }
    } else {
      const plus = [], minus = [], bad = [];
      G.nodes.forEach((_, i) => { const d = outd[i] - ind[i]; if (d === 1) plus.push(i); else if (d === -1) minus.push(i); else if (d) bad.push(i); });
      if (!plus.length && !minus.length && !bad.length) why = T('Every vertex has in-degree = out-degree and the edges are connected, so an Euler circuit exists.');
      else if (plus.length === 1 && minus.length === 1 && !bad.length) {
        circuit = false; start = plus[0]; end = minus[0];
        S.node[start] = 'bad'; S.node[end] = 'bad';
        why = T('No Euler circuit: out-degree ≠ in-degree at %s and %s. There is an Euler trail from %s to %s.', G.name(start), G.name(end), G.name(start), G.name(end));
      } else {
        plus.concat(minus, bad).forEach((i) => { S.node[i] = 'bad'; });
        R.snap(T('No Euler circuit or trail: in-degree and out-degree differ too much at %s.', nameList(G, plus.concat(minus, bad).sort((a, b) => a - b))), null);
        return { frames: R.frames };
      }
    }
    const used = new Array(m).fill(false);
    const adj = G.nodes.map((_, i) => (dir ? G.out[i] : G.und[i]));
    const nextEdge = (v) => { for (const { v: w, e } of adj[v]) if (!used[e]) return { w, e }; return null; };
    let circ = [start], cedges = [];
    const panel = (c, sub) => () => [chipRow(circuit ? T('Circuit:') : T('Trail:'), c.map((i) => G.name(i))), sub ? chipRow(T('Detour:'), sub.map((i) => G.name(i))) : null].filter(Boolean);
    const numberEdges = () => { cedges.forEach((e, i) => { S.enote[e] = String(i + 1); }); };
    S.node[start] = S.node[start] || 'front';
    R.tmp.ring.add(start);
    R.snap(why + ' ' + T('Hierholzer: walk from %s along unused edges until stuck.', G.name(start)), panel(circ.slice(), null));
    let tour = 0;
    const walkFrom = (v0, isFirst) => {
      const seq = [v0], es = [];
      let v = v0;
      for (;;) {
        const nx = nextEdge(v);
        if (!nx) break;
        used[nx.e] = true; es.push(nx.e);
        S.edge[nx.e] = 'tree'; S.ecol[nx.e] = cat(tour);
        v = nx.w; seq.push(v);
        R.tmp.cur.add(nx.e); R.tmp.ring.add(v);
        R.snap(T('%s → %s', G.name(seq[seq.length - 2]), G.name(v)), panel(isFirst ? seq.slice() : circ.slice(), isFirst ? null : seq.slice()));
      }
      return { seq, es };
    };
    const first = walkFrom(start, true);
    circ = first.seq; cedges = first.es;
    numberEdges();
    R.tmp.ring.add(circ[circ.length - 1]);
    R.snap(circuit ? T('Back at %s with no unused edge left here: a closed walk.', G.name(start)) : T('Stuck at %s: the walk from %s ends there.', G.name(end), G.name(start)), panel(circ.slice(), null));
    let guard = 0;
    while (cedges.length < m && guard++ < m + 5) {
      const pos = circ.findIndex((v) => nextEdge(v));
      if (pos < 0) break;
      const v = circ[pos];
      tour++;
      R.tmp.ring.add(v);
      R.snap(T('%s still has unused edges: start a detour there.', G.name(v)), panel(circ.slice(), [v]));
      const sub = walkFrom(v, false);
      circ = circ.slice(0, pos).concat(sub.seq, circ.slice(pos + 1));
      cedges = cedges.slice(0, pos).concat(sub.es, cedges.slice(pos));
      numberEdges();
      R.snap(T('The detour returns to %s: splice it into the walk.', G.name(v)), panel(circ.slice(), null));
    }
    R.snap((circuit ? T('Euler circuit using all %d edges once (numbers give the order):', m) : T('Euler trail using all %d edges once (numbers give the order):', m)) + ' ' + circ.map((i) => G.name(i)).join(' → '), panel(circ.slice(), null));
    return { frames: R.frames };
  }

  /** Exact chromatic number by backtracking (small graphs), or null if too slow. */
  function chromatic(G, upper) {
    const n = G.nodes.length;
    const nb = G.nodes.map((_, i) => [...new Set(G.und[i].map((q) => q.v).filter((v) => v !== i))]);
    const order = G.nodes.map((_, i) => i).sort((a, b) => nb[b].length - nb[a].length || a - b);
    let budget = 400000;
    const col = new Array(n).fill(-1);
    const tryK = (k) => {
      const rec = (p, maxUsed) => {
        if (--budget < 0) throw new Error('budget');
        if (p === n) return true;
        const v = order[p];
        for (let c = 0; c < Math.min(k, maxUsed + 2); c++) {
          if (nb[v].some((w) => col[w] === c)) continue;
          col[v] = c;
          if (rec(p + 1, Math.max(maxUsed, c))) return true;
          col[v] = -1;
        }
        return false;
      };
      col.fill(-1);
      return rec(0, -1);
    };
    try {
      for (let k = 1; k <= upper; k++) if (tryK(k)) return k;
      return upper;
    } catch (e) { return null; }
  }

  function algColour(G, how) {
    const R = recorder(G), S = R.S, n = G.nodes.length;
    const loop = G.edges.find((e) => e.u === e.v);
    if (loop) { R.snap(T('%s has a loop, so no proper colouring exists (a vertex would need a colour different from its own).', G.name(loop.u)), null); return { frames: R.frames }; }
    const nb = G.nodes.map((_, i) => [...new Set(G.und[i].map((q) => q.v))]);
    const order = G.nodes.map((_, i) => i);
    if (how === 'degree') order.sort((a, b) => nb[b].length - nb[a].length || a - b);
    const col = new Array(n).fill(-1);
    let k = 0;
    const panel = () => {
      const classes = [];
      col.forEach((c, v) => { if (c >= 0) (classes[c] = classes[c] || []).push(v); });
      return () => classes.map((cl, c) => {
        const row = el('div', { class: 'w-dm-row' }, el('span', { class: 'k' }, el('span', { class: 'w-dm-sw', style: 'background:' + cat(c, Math.max(k, 6)) }), T('Colour %d:', c + 1)));
        cl.forEach((v) => row.append(chip(G.name(v))));
        return row;
      });
    };
    R.snap(T('Colour the vertices in the order %s, giving each the smallest colour not used by its neighbours.', nameList(G, order)) + (G.directed ? ' ' + T('(Edge directions are ignored.)') : ''), panel());
    for (const v of order) {
      const usedC = [...new Set(nb[v].map((w) => col[w]).filter((c) => c >= 0))].sort((a, b) => a - b);
      let c = 0;
      while (usedC.includes(c)) c++;
      col[v] = c; k = Math.max(k, c + 1);
      S.ncol[v] = c; S.note[v] = String(c + 1);
      R.tmp.ring.add(v);
      G.und[v].forEach(({ e }) => R.tmp.cur.add(e));
      R.snap(usedC.length ? T('%s: its neighbours already use colour %s, so it gets colour %d.', G.name(v), usedC.map((q) => q + 1).join(', '), c + 1)
        : T('%s: no neighbour is coloured yet, so it gets colour %d.', G.name(v), c + 1), panel());
    }
    const chi = chromatic(G, k);
    let tail = '';
    if (chi === k) tail = T('This is optimal: the chromatic number is %d.', chi);
    else if (chi !== null) tail = T('Not optimal: the chromatic number is %d — another order does better.', chi);
    R.snap(T('Greedy colouring uses %d colours.', k) + ' ' + tail, panel());
    // ncol palette size for drawing
    R.frames.forEach((f) => { f.ncolK = Math.max(k, 6); });
    return { frames: R.frames };
  }

  /** The drawing: draggable vertices, straight or curved edges, arrowheads, weights and notes. */
  function graphView(stage, G, o) {
    const W = viewWidth(stage, 640, 440);
    const n = G.nodes.length;
    // vertices are circles (short names) or stadiums: half-width HW[i], half-height HH
    const HH = 15, HW = G.nodes.map((nd) => Math.max(HH, nd.name.length * 3.9 + 9));
    const maxR = Math.max(...HW);
    /** Distance from a vertex centre to its outline in direction (ux, uy). */
    const bnd = (i, ux, uy) => {
      const L = Math.hypot(ux, uy) || 1, h = HW[i] - HH;
      ux /= L; uy /= L;
      if (h <= 0.01) return HH;
      if (Math.abs(uy) > 1e-9) { const t = HH / Math.abs(uy); if (Math.abs(t * ux) <= h) return t; }
      const uc = Math.abs(ux) * h;
      return uc + Math.sqrt(Math.max(0, uc * uc - h * h + HH * HH));
    };
    // positions: the author's (y up), else a stress layout mirrored so that the first vertex is on the left
    const given = G.nodes.map((nd) => (nd.pos ? [nd.pos[0], -nd.pos[1]] : null));
    const allGiven = given.every(Boolean);
    let pts = allGiven ? given : stressLayout(n, G.edges.map((e) => [e.u, e.v]), given);
    if (!given.some(Boolean) && n > 1) {
      const mx = pts.reduce((a, p) => a + p[0], 0) / n;
      if (pts[0][0] > mx + 1e-6) pts = pts.map(([x, y]) => [2 * mx - x, y]);
    }
    // height from the layout's aspect ratio (240–440 units)
    const padX = maxR + 14, padT = HH + 26, padB = HH + 14;
    let bw = 0, bh = 0;
    if (pts.length) {
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      bw = Math.max(...xs) - Math.min(...xs); bh = Math.max(...ys) - Math.min(...ys);
    }
    const cap = allGiven ? Infinity : 125;
    const Hmax = n > 14 ? 440 : 380;
    let sc = Math.min(bw > 1e-9 ? (W - 2 * padX) / bw : Infinity, bh > 1e-9 ? (Hmax - padT - padB) / bh : Infinity, cap);
    if (!Number.isFinite(sc)) sc = 1;
    const H = o.height || Math.round(Math.max(220, Math.min(Hmax, bh * sc + padT + padB + 10)));
    const box = svgBox(stage, W, H, { label: o.label, drag: true });
    const gE = el('g'), gL = el('g'), gN = el('g');
    box.svg.append(gE, gL, gN);
    const P = fitBox(pts, padX, padT, W - padX, H - padB, cap);
    // edge offsets for parallel / opposite edges
    const groups = new Map();
    G.edges.forEach((e) => { if (e.u === e.v) return; const k = Math.min(e.u, e.v) + ',' + Math.max(e.u, e.v); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(e.id); });
    const off = new Array(G.edges.length).fill(0);
    groups.forEach((ids) => ids.forEach((id, j) => { const e = G.edges[id]; let q = j - (ids.length - 1) / 2; if (e.u > e.v) q = -q; off[id] = q; }));
    const loopCount = new Map();
    const loopIdx = G.edges.map((e) => { if (e.u !== e.v) return 0; const c = loopCount.get(e.u) || 0; loopCount.set(e.u, c + 1); return c; });
    const E = G.edges.map((e) => {
      const g = el('g', { class: 'w-dm-edge' });
      const path = el('path', { class: 'w-dm-e' });
      g.append(path);
      const head = e.dir ? el('path', { class: 'w-dm-ah' }) : null;
      if (head) g.append(head);
      gE.append(g);
      const wl = G.weighted && e.w !== null ? el('text', { class: 'w-dm-wl', text: num(e.w) }) : null;
      if (wl) gL.append(wl);
      const note = el('text', { class: 'w-dm-en' });
      gL.append(note);
      return { g, path, head, wl, note, mid: [0, 0], nrm: [0, 1] };
    });
    const N = G.nodes.map((nd, i) => {
      const g = el('g', { class: 'w-dm-node', tabindex: 0, role: 'button', 'aria-label': T('Vertex %s', nd.name) });
      const rg = el('rect', { class: 'w-dm-ring', x: -HW[i] - 5, y: -HH - 5, width: 2 * HW[i] + 10, height: 2 * HH + 10, rx: HH + 5 });
      const c = el('rect', { class: 'w-dm-nc', x: -HW[i], y: -HH, width: 2 * HW[i], height: 2 * HH, rx: HH });
      const t = el('text', { class: 'w-dm-nt', text: nd.name });
      const note = el('text', { class: 'w-dm-nn' });
      g.append(rg, c, t, note);
      gN.append(g);
      return { g, rg, c, t, note };
    });
    const f1 = (v) => v.toFixed(1);
    function geom() {
      N.forEach((q, i) => q.g.setAttribute('transform', 'translate(' + f1(P[i][0]) + ',' + f1(P[i][1]) + ')'));
      G.edges.forEach((e, id) => {
        const q = E[id];
        const [x1, y1] = P[e.u], [x2, y2] = P[e.v];
        if (e.u === e.v) {
          const r = HH, k = loopIdx[id], ang = -Math.PI / 2 + k * 1.2, s = 2.7 + 0.5 * k;
          const pa = (a, d) => [x1 + d * Math.cos(a), y1 + d * Math.sin(a)];
          const A = pa(ang - 0.45, r), B = pa(ang + 0.45, r + (e.dir ? 1 : 0)), C1 = pa(ang - 0.75, r * s), C2 = pa(ang + 0.75, r * s);
          q.path.setAttribute('d', 'M' + f1(A[0]) + ',' + f1(A[1]) + 'C' + f1(C1[0]) + ',' + f1(C1[1]) + ' ' + f1(C2[0]) + ',' + f1(C2[1]) + ' ' + f1(B[0]) + ',' + f1(B[1]));
          if (q.head) q.head.setAttribute('d', arrowHead(B[0], B[1], B[0] - C2[0], B[1] - C2[1], 10, 7.5));
          q.mid = pa(ang, r * (s - 0.55));
          q.nrm = [Math.cos(ang), Math.sin(ang)];
        } else {
          const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy) || 1;
          const nx = -dy / L, ny = dx / L;
          const bend = off[id] * Math.min(56, L * 0.45);
          const cx = (x1 + x2) / 2 + nx * bend, cy = (y1 + y2) / 2 + ny * bend;
          const u0 = [cx - x1, cy - y1], u1 = [cx - x2, cy - y2];
          const l0 = Math.hypot(...u0) || 1, l1 = Math.hypot(...u1) || 1;
          const r0 = bnd(e.u, u0[0], u0[1]), r1 = bnd(e.v, u1[0], u1[1]) + 1.5;
          const sx = x1 + u0[0] / l0 * r0, sy = y1 + u0[1] / l0 * r0;
          let ex = x2 + u1[0] / l1 * r1, ey = y2 + u1[1] / l1 * r1;
          if (q.head) {
            const ux = -u1[0] / l1, uy = -u1[1] / l1;
            q.head.setAttribute('d', arrowHead(ex, ey, ux, uy));
            ex -= ux * 8; ey -= uy * 8;
          }
          q.path.setAttribute('d', bend ? 'M' + f1(sx) + ',' + f1(sy) + 'Q' + f1(cx) + ',' + f1(cy) + ' ' + f1(ex) + ',' + f1(ey) : 'M' + f1(sx) + ',' + f1(sy) + 'L' + f1(ex) + ',' + f1(ey));
          q.mid = [0.25 * x1 + 0.5 * cx + 0.25 * x2, 0.25 * y1 + 0.5 * cy + 0.25 * y2];
          q.nrm = bend < 0 ? [-nx, -ny] : [nx, ny];
        }
        // weight beside the edge (above it, or right of a vertical edge); order notes on the other side
        let [wx, wy] = q.nrm;
        if (e.u !== e.v && !off[id] && (wy > 0.2 || (Math.abs(wy) <= 0.2 && wx < 0))) { wx = -wx; wy = -wy; }
        const dw = e.u === e.v ? 0 : 9;
        if (q.wl) { q.wl.setAttribute('x', f1(q.mid[0] + wx * dw)); q.wl.setAttribute('y', f1(q.mid[1] + wy * dw)); }
        const dn = q.wl ? -10 : 0;
        q.note.setAttribute('x', f1(q.mid[0] + wx * dn));
        q.note.setAttribute('y', f1(q.mid[1] + wy * dn));
      });
      placeNotes();
    }
    /** Vertex notes go in the direction farthest from the incident edges that stays inside the drawing. */
    const CAND = [-90, -55, -125, -20, -160, 20, 160, 55, 125, 90].map((a) => a * Math.PI / 180);
    function placeNotes() {
      N.forEach((q, i) => {
        const txt = q.note.textContent || '';
        if (!txt) return;
        const tw = txt.length * 6.3 + 2;
        const angs = G.und[i].filter((t) => t.v !== i).map((t) => Math.atan2(P[t.v][1] - P[i][1], P[t.v][0] - P[i][0]));
        if (G.edges.some((e) => e.u === i && e.v === i)) angs.push(-Math.PI / 2);
        let best = null;
        CAND.forEach((a, j) => {
          let dmin = Math.PI;
          angs.forEach((b) => { let d = Math.abs(a - b) % (2 * Math.PI); if (d > Math.PI) d = 2 * Math.PI - d; dmin = Math.min(dmin, d); });
          const cx = Math.cos(a), cy = Math.sin(a), r = bnd(i, cx, cy) + 10;
          const x = P[i][0] + cx * r, y = P[i][1] + cy * r + 4 + cy * 2;
          const anchor = cx > 0.35 ? 'start' : cx < -0.35 ? 'end' : 'middle';
          const xl = anchor === 'start' ? x : anchor === 'end' ? x - tw : x - tw / 2;
          const inside = xl >= 2 && xl + tw <= W - 2 && y - 10 >= 0 && y + 2 <= H;
          const score = dmin - j * 0.02 - (inside ? 0 : 10);
          if (!best || score > best.score + 1e-9) best = { score, x: cx * r, y: cy * r + 4 + cy * 2, anchor };
        });
        q.note.setAttribute('x', f1(best.x));
        q.note.setAttribute('y', f1(best.y));
        q.note.setAttribute('text-anchor', best.anchor);
      });
    }
    let frame = null, extra = null;
    function paint(fr, ex) {
      frame = fr; extra = ex || null;
      const pe = extra ? new Set(extra.edges) : null, pn = extra ? new Set(extra.nodes) : null;
      N.forEach((q, i) => {
        let cls = 'w-dm-node';
        const st = fr ? fr.node[i] : '';
        if (st) cls += ' ' + st;
        if (pn && pn.has(i)) cls += ' path';
        q.g.setAttribute('class', cls);
        const col = fr ? fr.ncol[i] : null;
        if (col !== null && col !== undefined) { const c = fr.ncolCss ? fr.ncolCss(col) : cat(col, fr.ncolK || 6); q.c.style.fill = tint(c, 40); q.c.style.stroke = c; q.c.style.strokeWidth = '2.6'; }
        else { q.c.style.fill = ''; q.c.style.stroke = ''; q.c.style.strokeWidth = ''; }
        q.rg.style.display = fr && fr.ring.has(i) ? '' : 'none';
        q.note.textContent = fr ? fr.note[i] : (o.nodeNote ? o.nodeNote(i) : '');
      });
      placeNotes();
      G.edges.forEach((e, id) => {
        const q = E[id];
        let cls = 'w-dm-edge';
        if (fr && fr.edge[id]) cls += ' ' + fr.edge[id];
        if (pe) cls += pe.has(id) ? ' path' : ' faded';
        q.g.setAttribute('class', cls);
        const col = fr ? fr.ecol[id] : null;
        const isCur = fr && / cur$|^cur$/.test(fr.edge[id] || '');
        q.path.style.stroke = col && !isCur && !pe ? col : '';
        if (q.head) q.head.style.fill = col && !isCur && !pe ? col : '';
        q.note.textContent = fr ? fr.enote[id] : '';
      });
    }
    // dragging, clicking and hovering vertices
    let drag = null;
    N.forEach((q, i) => {
      q.g.addEventListener('pointerdown', safe((ev) => {
        if (ev.button !== undefined && ev.button !== 0) return;
        const [x, y] = box.pt(ev);
        drag = { i, dx: P[i][0] - x, dy: P[i][1] - y, x0: ev.clientX, y0: ev.clientY, moved: false, id: ev.pointerId };
        try { q.g.setPointerCapture(ev.pointerId); } catch (e) { /* not capturable */ }
        ev.preventDefault();
      }));
      q.g.addEventListener('pointermove', safe((ev) => {
        if (!drag || drag.i !== i) {
          if (o.tip) MA.tip.show(o.tip(i), ev.clientX, ev.clientY);
          return;
        }
        if (Math.hypot(ev.clientX - drag.x0, ev.clientY - drag.y0) > 3) drag.moved = true;
        if (!drag.moved) return;
        MA.tip.hide();
        const [x, y] = box.pt(ev);
        P[i] = [Math.max(HW[i] + 2, Math.min(W - HW[i] - 2, x + drag.dx)), Math.max(HH + 2, Math.min(H - HH - 2, y + drag.dy))];
        geom();
      }));
      const end = safe(() => {
        if (!drag || drag.i !== i) return;
        const clicked = !drag.moved;
        drag = null;
        if (clicked && o.onClick) o.onClick(i);
      });
      q.g.addEventListener('pointerup', end);
      q.g.addEventListener('pointercancel', () => { drag = null; });
      q.g.addEventListener('pointerleave', () => MA.tip.hide());
      q.g.addEventListener('keydown', safe((ev) => {
        const d = { ArrowLeft: [-8, 0], ArrowRight: [8, 0], ArrowUp: [0, -8], ArrowDown: [0, 8] }[ev.key];
        if (d) {
          ev.preventDefault();
          P[i] = [Math.max(HW[i] + 2, Math.min(W - HW[i] - 2, P[i][0] + d[0])), Math.max(HH + 2, Math.min(H - HH - 2, P[i][1] + d[1]))];
          geom();
        } else if ((ev.key === 'Enter' || ev.key === ' ') && o.onClick) { ev.preventDefault(); o.onClick(i); }
      }));
    });
    geom();
    paint(null);
    return { paint, box, get frame() { return frame; }, get extra() { return extra; } };
  }

  MA.widget('graph', (stage, cfg) => {
    style();
    const G = parseGraph(cfg);
    const n = G.nodes.length;
    let alg = C.str(cfg.algorithm, 'none').toLowerCase();
    if (GALIAS[alg] !== undefined) alg = GALIAS[alg];
    if (!GALG.some((a) => a[0] === alg)) throw new Error(T('graph: unknown algorithm “%s”', cfg.algorithm));
    let start = 0;
    if (C.has(cfg.start)) {
      const s = C.str(cfg.start);
      if (!G.idx.has(s)) throw new Error(T('graph: start vertex “%s” is not in nodes', s));
      start = G.idx.get(s);
    }
    let order = 'list';
    MA.ui.title(stage, cfg.title);
    let result = null;
    const info = { set: () => {} };
    const pureDir = G.directed && !G.mixed;
    const degInfo = () => {
      const outd = new Array(n).fill(0), ind = new Array(n).fill(0), deg = new Array(n).fill(0);
      G.edges.forEach((e) => { if (e.dir) { outd[e.u]++; ind[e.v]++; } deg[e.u]++; deg[e.v]++; });
      return { outd, ind, deg };
    };
    const tip = (i) => {
      const { outd, ind, deg } = degInfo();
      const nbs = [...new Set(G.und[i].map((q) => q.v))].map((v) => G.name(v));
      const head = pureDir ? T('%s: in-degree %d, out-degree %d', G.name(i), ind[i], outd[i]) : T('%s: degree %d', G.name(i), deg[i]);
      return head + (nbs.length ? ' · ' + T('neighbours %s', nbs.join(', ')) : '');
    };
    const view = graphView(stage, G, { label: T('Graph with %d vertices and %d edges', n, G.edges.length), tip, onClick: (i) => clickVertex(i) });
    const bar = MA.ui.bar(stage);
    const msg = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    stage.append(panel);
    const report = (m) => msg.set(el('span', { class: 'w-err', text: m }));
    const needsStart = () => ['bfs', 'dfs', 'dijkstra', 'prim', 'euler'].includes(alg);
    MA.ui.select(bar, { label: T('Algorithm'), value: alg, options: GALG.map(([k, t]) => [k, T(t)]), onChange: safe((v) => { alg = v; rebuild(); }, report) });
    const sStart = MA.ui.select(bar, { label: T('Start'), value: String(start), options: G.nodes.map((nd, i) => [String(i), nd.name]), onChange: safe((v) => { start = +v; rebuild(); }, report) });
    const sOrder = MA.ui.seg(bar, { label: T('Order'), value: order, options: [['list', T('as listed')], ['degree', T('by degree')]], onChange: safe((v) => { order = v; rebuild(); }, report) });
    const pl = player(bar, { count: () => (result ? result.frames.length : 1), show: (k) => showFrame(k), delay: 1.1 });
    function showFrame(k) {
      if (!result) return;
      const fr = result.frames[k];
      view.paint(fr);
      msg.set(el('span', { class: 'w-dm-msg', text: fr.msg }));
      panel.replaceChildren(...(fr.panel ? [].concat(fr.panel()) : []));
    }
    function explore(sel) {
      const { outd, ind, deg } = degInfo();
      const { count } = components(G);
      const parts = [MA.ui.kv(T('vertices'), String(n)), MA.ui.kv(T('edges'), String(G.edges.length))];
      if (pureDir) parts.push(MA.ui.kv(T('in/out-degrees'), G.nodes.map((nd, i) => nd.name + ' ' + ind[i] + '/' + outd[i]).join(' · ')));
      else {
        parts.push(MA.ui.kv(T('degrees'), G.nodes.map((nd, i) => nd.name + ' ' + deg[i]).join(' · ')));
        parts.push(MA.ui.kv(T('sum of degrees'), T('%d = 2 × %d edges', deg.reduce((a, b) => a + b, 0), G.edges.length)));
      }
      parts.push(MA.ui.kv(T('components'), String(count)));
      msg.set(...parts);
      if (sel === undefined) { view.paint(null); panel.replaceChildren(el('div', { class: 'w-dm-hint', text: T('Drag vertices to rearrange; click a vertex to see its neighbours.') })); return; }
      const fr = recorder(G);
      const nbE = G.und[sel].map((q) => q.e), nbV = [...new Set(G.und[sel].map((q) => q.v))];
      nbV.forEach((v) => { fr.S.node[v] = 'front'; });
      fr.S.node[sel] = 'done';
      nbE.forEach((e) => fr.tmp.cur.add(e));
      fr.tmp.ring.add(sel);
      fr.snap('', null);
      view.paint(fr.frames[0]);
      panel.replaceChildren(el('div', { class: 'w-dm-msg', text: tip(sel) }));
    }
    function clickVertex(i) {
      if (alg === 'none') { explore(i); return; }
      if (!result || !result.pathTo) return;
      if (pl.k !== result.frames.length - 1) pl.end();
      const p = result.pathTo(i);
      view.paint(result.frames[result.frames.length - 1], p);
      msg.set(el('span', { class: 'w-dm-msg', text: p.text }));
    }
    function rebuild() {
      sStart.el.style.display = needsStart() ? '' : 'none';
      sOrder.el.style.display = alg === 'colour' ? '' : 'none';
      pl.stop();
      if (alg === 'none') {
        result = null;
        pl.el.style.display = 'none';
        explore();
        return;
      }
      pl.el.style.display = '';
      result = alg === 'bfs' ? algBFS(G, start) : alg === 'dfs' ? algDFS(G, start) : alg === 'dijkstra' ? algDijkstra(G, start)
        : alg === 'prim' ? algPrim(G, start) : alg === 'kruskal' ? algKruskal(G) : alg === 'topo' ? algTopo(G)
          : alg === 'euler' ? algEuler(G, start) : algColour(G, order);
      pl.el.style.display = result.frames.length > 1 ? '' : 'none';
      pl.go(0);
    }
    void info;
    rebuild();
  });

  // ================================================================== truthtable
  // Precedence (tightest first): ¬, ∧ (↑), ⊕, ∨ (↓), →, ↔.  → groups to the right, the others to the left.
  const LSYMS = [['<->', 'iff'], ['<=>', 'iff'], ['->', 'imp'], ['=>', 'imp'], ['&&', 'and'], ['||', 'or'], ['/\\', 'and'], ['\\/', 'or'],
    ['↔', 'iff'], ['⇔', 'iff'], ['≡', 'iff'], ['→', 'imp'], ['⇒', 'imp'], ['⊃', 'imp'], ['∧', 'and'], ['&', 'and'], ['·', 'and'], ['*', 'and'], ['^', 'and'],
    ['∨', 'or'], ['|', 'or'], ['+', 'or'], ['⊕', 'xor'], ['⊻', 'xor'], ['↑', 'nand'], ['↓', 'nor'], ['¬', 'not'], ['~', 'not'], ['∼', 'not'], ['!', 'not'], ['-', 'not'],
    ['⊤', 'T'], ['⊥', 'F'], ['(', '('], [')', ')'], ['[', '('], [']', ')']].sort((a, b) => b[0].length - a[0].length);
  const LTEXCMD = { neg: 'not', lnot: 'not', land: 'and', wedge: 'and', lor: 'or', vee: 'or', oplus: 'xor', to: 'imp', rightarrow: 'imp', implies: 'imp', Rightarrow: 'imp',
    leftrightarrow: 'iff', iff: 'iff', Leftrightarrow: 'iff', equiv: 'iff', top: 'T', bot: 'F', uparrow: 'nand', downarrow: 'nor', left: '', right: '' };
  const LWORDS = { not: 'not', and: 'and', or: 'or', xor: 'xor', implies: 'imp', iff: 'iff', nand: 'nand', nor: 'nor', true: 'T', false: 'F' };
  const LOPTEX = { and: '\\land', or: '\\lor', xor: '\\oplus', imp: '\\to', iff: '\\leftrightarrow', nand: '\\uparrow', nor: '\\downarrow' };
  const LOPTXT = { and: '∧', or: '∨', xor: '⊕', imp: '→', iff: '↔', nand: '↑', nor: '↓' };

  function parseLogic(src) {
    const s = String(src);
    const toks = [];
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      const sym = LSYMS.find(([q]) => s.startsWith(q, i));
      if (sym) { toks.push({ k: sym[1], pos: i, src: sym[0] }); i += sym[0].length; continue; }
      if (c === '\\') {
        const m = /^\\([A-Za-z]+)/.exec(s.slice(i));
        if (m && LTEXCMD[m[1]] !== undefined) { if (LTEXCMD[m[1]]) toks.push({ k: LTEXCMD[m[1]], pos: i, src: m[0] }); i += m[0].length; continue; }
        throw new Error(T('unknown command %s', m ? m[0] : '\\'));
      }
      const w = /^[\p{L}][\p{L}\p{N}_]*/u.exec(s.slice(i));
      if (w) {
        const lw = w[0].toLowerCase();
        if (LWORDS[lw]) toks.push({ k: LWORDS[lw], pos: i, src: w[0] }); else toks.push({ k: 'var', v: w[0], pos: i, src: w[0] });
        i += w[0].length;
        continue;
      }
      if (c === '0' || c === '1') { toks.push({ k: c === '1' ? 'T' : 'F', pos: i, src: c }); i++; continue; }
      throw new Error(T('unexpected “%s” at position %d', c, i + 1));
    }
    if (!toks.length) throw new Error(T('empty formula'));
    let p = 0;
    const peek = () => toks[p];
    const is = (...ks) => p < toks.length && ks.includes(toks[p].k);
    const bad = (t) => new Error(t ? T('unexpected “%s” at position %d', t.src, t.pos + 1) : T('the formula ends too early'));
    function iff() { let a = imp(); while (is('iff')) { p++; a = { op: 'iff', a, b: imp() }; } return a; }
    function imp() { const a = or(); if (is('imp')) { p++; return { op: 'imp', a, b: imp() }; } return a; }
    function or() { let a = xor(); while (is('or', 'nor')) { const k = toks[p++].k; a = { op: k, a, b: xor() }; } return a; }
    function xor() { let a = and(); while (is('xor')) { p++; a = { op: 'xor', a, b: and() }; } return a; }
    function and() { let a = not(); while (is('and', 'nand')) { const k = toks[p++].k; a = { op: k, a, b: not() }; } return a; }
    function not() { if (is('not')) { p++; return { op: 'not', a: not() }; } return atom(); }
    function atom() {
      const t = toks[p++];
      if (!t) throw bad(null);
      if (t.k === 'var') return { op: 'var', name: t.v };
      if (t.k === 'T' || t.k === 'F') return { op: 'const', v: t.k === 'T' };
      if (t.k === '(') {
        const e = iff();
        const c = toks[p++];
        if (!c || c.k !== ')') throw new Error(c ? T('expected “)” at position %d', c.pos + 1) : T('missing “)”'));
        return e;
      }
      throw bad(t);
    }
    const ast = iff();
    if (p < toks.length) {
      const t = peek();
      if (t.k === 'var' || t.k === '(' || t.k === 'not' || t.k === 'T' || t.k === 'F') throw new Error(T('missing operator before “%s” (position %d)', t.src, t.pos + 1));
      throw bad(t);
    }
    return ast;
  }
  const lkey = (n) => (n.op === 'var' ? 'v:' + n.name : n.op === 'const' ? (n.v ? '⊤' : '⊥') : n.op + '(' + lkey(n.a) + (n.b ? ',' + lkey(n.b) : '') + ')');
  function lvarTeX(name) {
    const m = /^([A-Za-z])_?(\d+)$/.exec(name);
    if (m) return m[1] + '_{' + m[2] + '}';
    if (/^[A-Za-z]$/.test(name)) return name;
    if (/^[A-Za-z]+$/.test(name)) return '\\mathit{' + name + '}';
    if (/^[A-Za-z]+_[A-Za-z0-9]+$/.test(name)) { const [a, b] = name.split('_'); return (a.length > 1 ? '\\mathit{' + a + '}' : a) + '_{' + b + '}'; }
    return '\\text{' + name.replace(/[\\{}$&#^_%~]/g, '') + '}';
  }
  /** TeX with explicit brackets around every compound operand (except left-nested ∧, ∨, ⊕, ↔ chains). */
  function ltex(n) {
    if (n.op === 'var') return lvarTeX(n.name);
    if (n.op === 'const') return n.v ? '\\top' : '\\bot';
    const simple = (c) => c.op === 'var' || c.op === 'const' || c.op === 'not';
    if (n.op === 'not') return '\\neg ' + (simple(n.a) ? ltex(n.a) : '(' + ltex(n.a) + ')');
    const L = simple(n.a) || (n.a.op === n.op && ['and', 'or', 'xor', 'iff'].includes(n.op)) ? ltex(n.a) : '(' + ltex(n.a) + ')';
    const R = simple(n.b) ? ltex(n.b) : '(' + ltex(n.b) + ')';
    return L + ' ' + LOPTEX[n.op] + ' ' + R;
  }
  function ltxt(n) {
    if (n.op === 'var') return n.name;
    if (n.op === 'const') return n.v ? '⊤' : '⊥';
    const simple = (c) => c.op === 'var' || c.op === 'const' || c.op === 'not';
    if (n.op === 'not') return '¬' + (simple(n.a) ? ltxt(n.a) : '(' + ltxt(n.a) + ')');
    const L = simple(n.a) || (n.a.op === n.op && ['and', 'or', 'xor', 'iff'].includes(n.op)) ? ltxt(n.a) : '(' + ltxt(n.a) + ')';
    const R = simple(n.b) ? ltxt(n.b) : '(' + ltxt(n.b) + ')';
    return L + ' ' + LOPTXT[n.op] + ' ' + R;
  }
  function lapply(op, a, b) {
    switch (op) {
      case 'not': return !a;
      case 'and': return a && b;
      case 'or': return a || b;
      case 'xor': return a !== b;
      case 'imp': return !a || b;
      case 'iff': return a === b;
      case 'nand': return !(a && b);
      case 'nor': return !(a || b);
      default: return false;
    }
  }
  function leval(n, env) {
    if (n.op === 'var') return env[n.name];
    if (n.op === 'const') return n.v;
    if (n.op === 'not') return !leval(n.a, env);
    return lapply(n.op, leval(n.a, env), leval(n.b, env));
  }
  function lvars(n, set) { if (n.op === 'var') set.add(n.name); if (n.a) lvars(n.a, set); if (n.b) lvars(n.b, set); return set; }

  MA.widget('truthtable', (stage, cfg) => {
    style();
    if (!C.has(cfg.formula)) throw new Error(T('truthtable needs a formula, e.g. p -> q'));
    let srcA = C.str(cfg.formula), srcB = C.str(cfg.compare);
    let A = parseLogic(srcA);
    let B = srcB ? parseLogic(srcB) : null;
    let tf = true, showNF = false;
    MA.ui.title(stage, cfg.title);
    const wrap = el('div', { class: 'w-dm-ttwrap' });
    stage.append(wrap);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const nf = el('div', { class: 'w-dm-panel' });
    stage.append(nf);
    const V = (b) => (tf ? (b ? 'T' : 'F') : (b ? '1' : '0'));
    MA.ui.text(bar, { label: '\\varphi', value: srcA, width: 210, onChange: (v) => {
      try { const a = parseLogic(v); A = a; srcA = v; draw(); return null; } catch (e) { return e.message; }
    } });
    MA.ui.text(bar, { label: '\\psi', value: srcB, width: 210, onChange: (v) => {
      if (!v.trim()) { B = null; srcB = ''; draw(); return null; }
      try { const b = parseLogic(v); B = b; srcB = v; draw(); return null; } catch (e) { return e.message; }
    } });
    MA.ui.seg(bar, { options: [['tf', 'T / F'], ['10', '1 / 0']], value: 'tf', onChange: safe((v) => { tf = v === 'tf'; draw(); }) });
    MA.ui.toggle(bar, { label: T('Normal forms'), value: false, onChange: safe((v) => { showNF = v; draw(); }) });
    bar.append(el('div', { class: 'w-dm-hint', style: 'flex-basis:100%', text: T('Type ¬ ∧ ∨ ⊕ → ↔ or ~ & | xor -> <->. Binding: ¬ tightest, then ∧, ⊕, ∨, →, ↔; → groups to the right.') }));

    function draw() {
      const vars = [...lvars(A, lvars(B || { op: 'const' }, new Set()))].sort((x, y) => x.localeCompare(y, undefined, { numeric: true }));
      const k = vars.length;
      if (k > 16) throw new Error(T('at most 16 variables'));
      const roots = B ? [A, B] : [A];
      // columns: variables, then sub-formulas in the order they are completed (children before parents)
      const subs = [], seen = new Map();
      const visit = (n, root) => {
        if (n.op === 'var') return;
        if (n.op === 'const' && !root) return;
        if (n.a) visit(n.a, false);
        if (n.b) visit(n.b, false);
        const key = lkey(n);
        if (!seen.has(key)) { seen.set(key, subs.length); subs.push(n); }
      };
      roots.forEach((r) => visit(r, true));
      const cols = vars.map((v) => ({ node: { op: 'var', name: v }, key: 'v:' + v, isVar: true })).concat(subs.map((n) => ({ node: n, key: lkey(n), isVar: false })));
      const colOf = new Map(cols.map((c, j) => [c.key, j]));
      const mainA = colOf.get(lkey(A)), mainB = B ? colOf.get(lkey(B)) : -1;
      const rows = 1 << k;
      const envOf = (r) => { const env = {}; vars.forEach((v, j) => { env[v] = !((r >> (k - 1 - j)) & 1); }); return env; };
      // verdicts over all rows
      let trueA = 0, trueB = 0, diff = 0, aImpB = true, bImpA = true;
      const diffRows = [];
      for (let r = 0; r < rows; r++) {
        const env = envOf(r);
        const a = leval(A, env), b = B ? leval(B, env) : false;
        if (a) trueA++;
        if (B) { if (b) trueB++; if (a !== b) { diff++; if (diffRows.length < 3) diffRows.push(env); } if (a && !b) aImpB = false; if (b && !a) bImpA = false; }
      }
      // table (up to 7 variables = 128 rows)
      wrap.replaceChildren();
      if (k <= 7) {
        const t = el('table', { class: 'w-dm-tt' });
        const hr = el('tr');
        cols.forEach((c, j) => hr.append(el('th', { class: (c.isVar ? 'var' : '') + (j === vars.length ? ' sep' : '') + (j === mainA ? ' main' : j === mainB ? ' main2' : ''), scope: 'col' }, MA.texEl(ltex(c.node)))));
        if (B) hr.append(el('th', { class: 'sep', scope: 'col' }, MA.texEl('\\varphi \\equiv \\psi\\,?')));
        t.append(el('thead', null, hr));
        const tb = el('tbody');
        for (let r = 0; r < rows; r++) {
          const env = envOf(r);
          const memo = new Map();
          const val = (n) => { const key = lkey(n); if (!memo.has(key)) memo.set(key, leval(n, env)); return memo.get(key); };
          const a = val(A), b = B ? val(B) : null;
          const tr = el('tr', { class: B && a !== b ? 'diff' : null });
          cols.forEach((c, j) => {
            const v = val(c.node);
            const td = el('td', { class: (v ? 't' : 'f') + (c.isVar ? ' var' : '') + (j === vars.length ? ' sep' : '') + (j === mainA ? ' main' : j === mainB ? ' main2' : ''), text: V(v) });
            td.dataset.col = j;
            tr.append(td);
          });
          if (B) tr.append(el('td', { class: 'sep ' + (a === b ? 'ok' : 'no'), text: a === b ? '✓' : '✗' }));
          tb.append(tr);
        }
        t.append(tb);
        // hover: explain a cell from the cells it depends on
        t.addEventListener('pointerover', safe((ev) => {
          const td = ev.target.closest && ev.target.closest('td');
          t.querySelectorAll('.src,.hov').forEach((x) => x.classList.remove('src', 'hov'));
          if (!td || td.dataset.col === undefined) { MA.tip.hide(); return; }
          const c = cols[+td.dataset.col];
          if (c.isVar) { MA.tip.hide(); return; }
          const tr = td.parentElement;
          const cell = (n) => tr.children[colOf.get(lkey(n))];
          const n = c.node;
          td.classList.add('hov');
          let txt;
          if (n.op === 'const') txt = ltxt(n);
          else if (n.op === 'not') { const ca = cell(n.a); if (ca) ca.classList.add('src'); txt = '¬' + (ca ? ca.textContent : '?') + ' = ' + td.textContent; }
          else {
            const ca = cell(n.a), cb = cell(n.b);
            if (ca) ca.classList.add('src');
            if (cb) cb.classList.add('src');
            txt = (ca ? ca.textContent : '?') + ' ' + LOPTXT[n.op] + ' ' + (cb ? cb.textContent : '?') + ' = ' + td.textContent;
          }
          MA.tip.show(ltxt(n) + ':  ' + txt, ev.clientX, ev.clientY);
        }));
        t.addEventListener('pointermove', (ev) => MA.tip.move(ev.clientX, ev.clientY));
        t.addEventListener('pointerleave', () => { MA.tip.hide(); t.querySelectorAll('.src,.hov').forEach((x) => x.classList.remove('src', 'hov')); });
        wrap.append(t);
      } else {
        wrap.append(el('div', { class: 'widget-msg', text: T('%d variables give %d rows — too many to list, but the verdicts below are exact.', k, rows) }));
      }
      // verdicts
      const verdict = (cnt, sym) => {
        if (cnt === rows) return [el('span', { class: 'w-dm-ok', text: T('Tautology') }), ' ', T('(%s is true in every row)', sym)];
        if (cnt === 0) return [el('span', { class: 'w-dm-no', text: T('Contradiction') }), ' ', T('(%s is false in every row)', sym)];
        return [el('b', { text: T('Contingent') }), ' ', T('(true in %d of %d rows: satisfiable, not a tautology)', cnt, rows)];
      };
      const line = (sym, tex, cnt) => el('span', null, MA.texEl(sym + ' = ' + tex), ':  ', ...verdict(cnt, sym === '\\varphi' ? 'φ' : 'ψ'));
      const parts = [line('\\varphi', ltex(A), trueA)];
      if (B) {
        parts.push(line('\\psi', ltex(B), trueB));
        if (!diff) parts.push(el('span', null, el('span', { class: 'w-dm-ok', text: T('Equivalent') }), ' ', MA.texEl('\\varphi \\equiv \\psi'), ' ', T('— same value in every row')));
        else {
          const ex = diffRows[0];
          const exs = vars.map((v) => v + ' = ' + V(ex[v])).join(', ');
          parts.push(el('span', null, el('span', { class: 'w-dm-no', text: T('Not equivalent') }), ' ', T('— they differ in %d of %d rows, e.g. %s', diff, rows, exs || '–')));
          if (aImpB) parts.push(el('span', null, T('but'), ' ', MA.texEl('\\varphi \\models \\psi'), ' ', T('(ψ is true whenever φ is)')));
          else if (bImpA) parts.push(el('span', null, T('but'), ' ', MA.texEl('\\psi \\models \\varphi'), ' ', T('(φ is true whenever ψ is)')));
        }
      }
      info.set(...parts);
      info.el.style.flexDirection = 'column';
      info.el.style.gap = '4px';
      // normal forms read off the table
      nf.replaceChildren();
      if (showNF) {
        if (rows > 32) nf.append(el('div', { class: 'w-dm-hint', text: T('Normal forms are shown for up to 5 variables.') }));
        else {
          const lit = (v, val) => (val ? lvarTeX(v) : '\\neg ' + lvarTeX(v));
          const dn = [], cn = [];
          for (let r = 0; r < rows; r++) {
            const env = envOf(r);
            if (leval(A, env)) dn.push(k > 1 ? '(' + vars.map((v) => lit(v, env[v])).join(' \\land ') + ')' : lit(vars[0], env[vars[0]]));
            else cn.push(k > 1 ? '(' + vars.map((v) => lit(v, !env[v])).join(' \\lor ') + ')' : lit(vars[0], !env[vars[0]]));
          }
          const show = (label, tex, note) => el('div', { class: 'w-dm-nf' }, el('span', { class: 'k', text: label }), ' ', MA.texEl(tex), note ? el('span', { class: 'w-dm-hint', text: '  ' + note }) : null);
          if (!k) nf.append(el('div', { class: 'w-dm-hint', text: T('No variables: the formula is constant.') }));
          else {
            nf.append(show(T('Disjunctive normal form (one term per true row):'), dn.length ? dn.join(' \\lor ') : '\\bot', dn.length ? '' : T('no true rows')));
            nf.append(show(T('Conjunctive normal form (one clause per false row):'), cn.length ? cn.join(' \\land ') : '\\top', cn.length ? '' : T('no false rows')));
          }
        }
      }
    }
    draw();
  });

  // ================================================================== venn
  // Set expressions: complement (A', ~A, A^c) binds tightest, then ∩, then ∪ \ Δ (left to right).
  const VSYMS = [['\\setminus', 'minus'], ['\\cap', 'cap'], ['\\cup', 'cup'], ['\\triangle', 'sym'], ['\\Delta', 'sym'], ['\\ominus', 'sym'], ['\\emptyset', 'E'],
    ['\\varnothing', 'E'], ['\\complement', 'pre'], ['^{c}', 'post'], ['^{C}', 'post'], ['^c', 'post'], ['^C', 'post'], ["'", 'post'], ['′', 'post'], ['ᶜ', 'post'],
    ['∩', 'cap'], ['&', 'cap'], ['*', 'cap'], ['∧', 'cap'], ['∪', 'cup'], ['|', 'cup'], ['+', 'cup'], ['∨', 'cup'], ['\\', 'minus'], ['∖', 'minus'], ['−', 'minus'],
    ['-', 'minus'], ['Δ', 'sym'], ['△', 'sym'], ['⊕', 'sym'], ['~', 'pre'], ['¬', 'pre'], ['!', 'pre'], ['∅', 'E'], ['Ø', 'E'], ['{}', 'E'], ['(', '('], [')', ')'], ['[', '('], [']', ')']]
    .sort((a, b) => b[0].length - a[0].length);
  const VWORDS = { and: 'cap', intersect: 'cap', or: 'cup', union: 'cup', minus: 'minus', without: 'minus', xor: 'sym', not: 'pre', complement: 'pre', empty: 'E', universe: 'U' };
  function parseSetExpr(src, names) {
    const s = String(src);
    const toks = [];
    const odd = names.map((nm, i) => [nm, i]).filter(([nm]) => !/^[\p{L}\p{N}_]+$/u.test(nm)).sort((a, b) => b[0].length - a[0].length);
    let i = 0;
    while (i < s.length) {
      if (/\s/.test(s[i])) { i++; continue; }
      const o = odd.find(([nm]) => s.startsWith(nm, i));
      if (o) { toks.push({ k: 'set', i: o[1], pos: i, src: o[0] }); i += o[0].length; continue; }
      const w = /^[\p{L}\p{N}_]+/u.exec(s.slice(i));
      if (w) {
        const word = w[0];
        let j = names.indexOf(word);
        if (j < 0) j = names.findIndex((nm) => nm.toLowerCase() === word.toLowerCase());
        if (j >= 0) toks.push({ k: 'set', i: j, pos: i, src: word });
        else if (word === 'U') toks.push({ k: 'U', pos: i, src: word });
        else if (VWORDS[word.toLowerCase()]) toks.push({ k: VWORDS[word.toLowerCase()], pos: i, src: word });
        else throw new Error(T('unknown set “%s” (sets: %s)', word, names.join(', ')));
        i += word.length;
        continue;
      }
      const sy = VSYMS.find(([q]) => s.startsWith(q, i));
      if (sy) { toks.push({ k: sy[1], pos: i, src: sy[0] }); i += sy[0].length; continue; }
      throw new Error(T('unexpected “%s” at position %d', s[i], i + 1));
    }
    if (!toks.length) throw new Error(T('empty expression'));
    let p = 0;
    const is = (...ks) => p < toks.length && ks.includes(toks[p].k);
    function expr() { let a = term(); while (is('cup', 'minus', 'sym')) { const k = toks[p++].k; a = { op: k, a, b: term() }; } return a; }
    function term() { let a = factor(); while (is('cap')) { p++; a = { op: 'cap', a, b: factor() }; } return a; }
    function factor() {
      if (is('pre')) { p++; return { op: 'not', a: factor() }; }
      let a = primary();
      while (is('post')) { p++; a = { op: 'not', a }; }
      return a;
    }
    function primary() {
      const t = toks[p++];
      if (!t) throw new Error(T('the expression ends too early'));
      if (t.k === 'set') return { op: 'set', i: t.i };
      if (t.k === 'U') return { op: 'U' };
      if (t.k === 'E') return { op: 'E' };
      if (t.k === '(') {
        const e = expr();
        const c = toks[p++];
        if (!c || c.k !== ')') throw new Error(T('missing “)”'));
        return e;
      }
      throw new Error(T('unexpected “%s” at position %d', t.src, t.pos + 1));
    }
    const ast = expr();
    if (p < toks.length) { const t = toks[p]; throw new Error(t.k === 'set' || t.k === '(' ? T('missing operator before “%s”', t.src) : T('unexpected “%s” at position %d', t.src, t.pos + 1)); }
    return ast;
  }
  /** Bitmask of regions (bit m = region whose membership pattern is m) covered by a set expression. */
  function setValue(n, k) {
    const all = (1 << (1 << k)) - 1;
    switch (n.op) {
      case 'set': { let v = 0; for (let m = 0; m < (1 << k); m++) if ((m >> n.i) & 1) v |= 1 << m; return v; }
      case 'U': return all;
      case 'E': return 0;
      case 'not': return all & ~setValue(n.a, k);
      case 'cap': return setValue(n.a, k) & setValue(n.b, k);
      case 'cup': return setValue(n.a, k) | setValue(n.b, k);
      case 'minus': return setValue(n.a, k) & ~setValue(n.b, k);
      case 'sym': return setValue(n.a, k) ^ setValue(n.b, k);
      default: return 0;
    }
  }
  const setNameTeX = (nm) => (/^[A-Za-z]$/.test(nm) ? nm : /^[A-Za-z]_?\d+$/.test(nm) ? nm.replace(/^([A-Za-z])_?(\d+)$/, '$1_{$2}') : '\\text{' + nm.replace(/[\\{}$&#^_%~]/g, '') + '}');
  function setTeX(n, names) {
    const SOP = { cap: '\\cap', cup: '\\cup', minus: '\\setminus', sym: '\\mathbin{\\triangle}' };
    const atom = (c) => c.op === 'set' || c.op === 'U' || c.op === 'E' || c.op === 'not';
    switch (n.op) {
      case 'set': return setNameTeX(names[n.i]);
      case 'U': return 'U';
      case 'E': return '\\varnothing';
      case 'not': return (n.a.op === 'set' || n.a.op === 'U' || n.a.op === 'E' ? setTeX(n.a, names) : '(' + setTeX(n.a, names) + ')') + "'";
      default: {
        const L = atom(n.a) || (n.a.op === n.op && n.op !== 'minus') ? setTeX(n.a, names) : '(' + setTeX(n.a, names) + ')';
        const R = atom(n.b) ? setTeX(n.b, names) : '(' + setTeX(n.b, names) + ')';
        return L + ' ' + SOP[n.op] + ' ' + R;
      }
    }
  }
  /** A short expression (TeX) for a union of regions: minimal sums of products, factored, or a complement. */
  function regionsTeX(mask, k, names) {
    const N = 1 << k, all = (1 << N) - 1;
    if (mask === 0) return '\\varnothing';
    if (mask === all) return 'U';
    const nm = names.map(setNameTeX);
    const sop = (on) => {
      const cubes = [];
      for (let care = 0; care < N; care++) for (let val = 0; val < N; val++) {
        if (val & ~care) continue;
        let cov = 0, ok = true;
        for (let m = 0; m < N; m++) if ((m & care) === val) { if (!((on >> m) & 1)) { ok = false; break; } cov |= 1 << m; }
        if (ok) cubes.push({ val, care, cov, lits: popcount(care) });
      }
      const primes = cubes.filter((c) => !cubes.some((d) => d !== c && (c.cov & d.cov) === c.cov && d.cov !== c.cov));
      let best = null;
      for (let s = 1; s < (1 << primes.length); s++) {
        let cov = 0, cost = 0;
        const ch = [];
        primes.forEach((c, i) => { if ((s >> i) & 1) { cov |= c.cov; cost += 10 + c.lits; ch.push(c); } });
        if ((cov & on) === on && (!best || cost < best.cost)) best = { cost, ch };
      }
      return best;
    };
    const join = (xs, op) => xs.join(' ' + op + ' ');
    const termTeX = (c, single) => {
      const pos = [], neg = [];
      for (let i = 0; i < k; i++) if ((c.care >> i) & 1) ((c.val >> i) & 1 ? pos : neg).push(nm[i]);
      let t;
      if (!pos.length && !neg.length) t = 'U';
      else if (!neg.length) t = join(pos, '\\cap');
      else if (!pos.length) t = neg.length === 1 ? neg[0] + "'" : '(' + join(neg, '\\cup') + ")'";
      else t = (pos.length === 1 ? pos[0] : '(' + join(pos, '\\cap') + ')') + ' \\setminus ' + (neg.length === 1 ? neg[0] : '(' + join(neg, '\\cup') + ')');
      const compound = pos.length + neg.length > 1 && !(neg.length > 1 && !pos.length);
      return single || !compound ? t : '(' + t + ')';
    };
    const render = (res) => {
      const ch = res.ch;
      if (ch.length === 1) return { tex: termTeX(ch[0], true), cost: res.cost };
      // factor a set common to every term: A ∩ (B ∪ C)
      let common = ch.reduce((a, c) => a & (c.care & c.val), N - 1);
      if (common && ch.every((c) => popcount(c.care) > popcount(common))) {
        const rest = ch.map((c) => ({ care: c.care & ~common, val: c.val & ~common }));
        const cs = [];
        for (let i = 0; i < k; i++) if ((common >> i) & 1) cs.push(nm[i]);
        return { tex: join(cs, '\\cap') + ' \\cap (' + join(rest.map((c) => termTeX(c, false)), '\\cup') + ')', cost: res.cost - 1 };
      }
      return { tex: join(ch.map((c) => termTeX(c, false)), '\\cup'), cost: res.cost };
    };
    const direct = render(sop(mask));
    const offRes = sop(all & ~mask);
    if (offRes && offRes.ch.length === 1) {
      const c = offRes.ch[0];
      if (popcount(c.care) > 1) {
        const pos = [], neg = [];
        for (let i = 0; i < k; i++) if ((c.care >> i) & 1) ((c.val >> i) & 1 ? pos : neg).push(nm[i]);
        if (!neg.length && offRes.cost + 2 < direct.cost) return '(' + join(pos, '\\cap') + ")'";
      }
    }
    return direct.tex;
  }
  function popcount(x) { let c = 0; while (x) { x &= x - 1; c++; } return c; }

  MA.widget('venn', (stage, cfg) => {
    style();
    const k = C.int(cfg.sets, 3);
    if (k < 1 || k > 3) throw new Error(T('venn: sets must be 1, 2 or 3'));
    const lab = C.list(cfg.labels);
    const names = Array.from({ length: k }, (_, i) => lab[i] || 'ABC'[i]);
    if (new Set(names).size < k) throw new Error(T('venn: the set labels must be different'));
    const defExpr = k === 3 ? names[0] + ' & (' + names[1] + ' | ' + names[2] + ')' : k === 2 ? names[0] + ' & ' + names[1] : names[0] + "'";
    let src = C.str(cfg.expr, defExpr);
    let ast = parseSetExpr(src, names);
    let target = setValue(ast, k);
    let shade = target;
    const N = 1 << k, ALL = (1 << N) - 1;
    MA.ui.title(stage, cfg.title);
    const W = viewWidth(stage, 640, 440), H = W > 500 ? 360 : 340;
    const box = svgBox(stage, W, H, { label: T('Venn diagram') });
    const uid = 'v' + Math.random().toString(36).slice(2, 8);
    // geometry: three circles span 2.93 r vertically and 3.07 r across; two circles 3.12 r across
    const r = k === 3 ? Math.min(104, (H - 44) / 2.93, (W - 44) / 3.07) : k === 2 ? Math.min(118, (W - 48) / 3.12, (H - 48) / 2) : Math.min(118, (H - 60) / 2);
    const cx = W / 2, cy = H / 2 - (k === 3 ? 0.155 * r : 0);
    let C0;
    if (k === 3) { const rho = r * 0.62; C0 = [[-150, rho], [-30, rho], [90, rho]].map(([a, d]) => [cx + d * Math.cos(a * Math.PI / 180), cy + d * Math.sin(a * Math.PI / 180)]); }
    else if (k === 2) C0 = [[cx - r * 0.56, cy], [cx + r * 0.56, cy]];
    else C0 = [[cx, cy]];
    const U = { x: 12, y: 12, w: W - 24, h: H - 24 };
    const defs = el('defs');
    box.svg.append(defs);
    C0.forEach(([x, y], i) => {
      defs.append(el('clipPath', { id: uid + 'c' + i }, el('circle', { cx: x, cy: y, r })));
      defs.append(svgNode('mask', { id: uid + 'm' + i, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: W, height: H },
        el('rect', { x: 0, y: 0, width: W, height: H, fill: 'white' }), el('circle', { cx: x, cy: y, r, fill: 'black' })));
    });
    box.svg.append(el('rect', { x: U.x, y: U.y, width: U.w, height: U.h, rx: 10, style: 'fill:none;stroke:var(--ink-3);stroke-width:1.5' }));
    const gReg = el('g'), gTop = el('g');
    box.svg.append(gReg, gTop);
    const regionName = (m) => {
      const parts = names.map((nm, i) => ((m >> i) & 1 ? nm : nm + '′'));
      return parts.join(' ∩ ');
    };
    const regs = [];
    for (let m = 0; m < N; m++) {
      let node = el('rect', { x: U.x, y: U.y, width: U.w, height: U.h, rx: 10, class: 'w-dm-vfill' });
      for (let i = 0; i < k; i++) node = el('g', (m >> i) & 1 ? { 'clip-path': 'url(#' + uid + 'c' + i + ')' } : { mask: 'url(#' + uid + 'm' + i + ')' }, node);
      const g = el('g', { class: 'w-dm-vreg', tabindex: 0, role: 'button', 'aria-label': T('Region %s', regionName(m)) }, node);
      g.addEventListener('keydown', safe((ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); toggle(m); } }));
      g.addEventListener('focus', () => hover(m));
      g.addEventListener('blur', () => hover(-1));
      gReg.append(g);
      regs.push(g);
    }
    C0.forEach(([x, y]) => gTop.append(el('circle', { cx: x, cy: y, r, style: 'fill:none;stroke:var(--ink-2);stroke-width:2;pointer-events:none' })));
    // set labels outside the circles, away from the centre of the diagram
    const LDIR = k === 3 ? [-135, -45, 40] : k === 2 ? [-135, -45] : [-135];
    C0.forEach(([x, y], i) => {
      const a = LDIR[i] * Math.PI / 180, dx = Math.cos(a), dy = Math.sin(a);
      const lx = x + dx * (r + 6), ly = y + dy * (r + 6);
      const anchor = dx < -0.3 ? 'end' : dx > 0.3 ? 'start' : 'middle';
      const fo = el('foreignObject', { x: anchor === 'end' ? lx - 140 : anchor === 'start' ? lx : lx - 70, y: ly - 14, width: 140, height: 28, style: 'overflow:visible;pointer-events:none' });
      const d = el('div', { style: { display: 'flex', justifyContent: anchor === 'end' ? 'flex-end' : anchor === 'start' ? 'flex-start' : 'center', alignItems: 'center', height: '28px', color: 'var(--ink)', fontSize: '17px', whiteSpace: 'nowrap' } });
      MA.tex(d, setNameTeX(names[i]));
      fo.append(d);
      gTop.append(fo);
    });
    gTop.append(stext(U.x + 14, U.y + 16, 'U', { style: 'font-style:italic;font-size:16px;fill:var(--ink-2);font-family:KaTeX_Math,serif' }));
    const regionAt = (x, y) => {
      if (x < U.x || x > U.x + U.w || y < U.y || y > U.y + U.h) return -1;
      let m = 0;
      C0.forEach(([a, b], i) => { if (Math.hypot(x - a, y - b) <= r) m |= 1 << i; });
      return m;
    };
    let hov = -1;
    function hover(m) { hov = m; regs.forEach((g, j) => g.classList.toggle('hov', j === m)); }
    box.svg.addEventListener('pointermove', safe((ev) => {
      const [x, y] = box.pt(ev);
      const m = regionAt(x, y);
      if (m !== hov) hover(m);
      if (m >= 0) MA.tip.show(regionName(m) + ((shade >> m) & 1 ? '  ✓' : ''), ev.clientX, ev.clientY); else MA.tip.hide();
    }));
    box.svg.addEventListener('pointerleave', () => { hover(-1); MA.tip.hide(); });
    box.svg.addEventListener('click', safe((ev) => { const [x, y] = box.pt(ev); const m = regionAt(x, y); if (m >= 0) toggle(m); }));
    box.svg.style.cursor = 'pointer';
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    MA.ui.text(bar, { label: T('Set'), value: src, width: 210, onChange: (v) => {
      try { ast = parseSetExpr(v, names); src = v; target = setValue(ast, k); shade = target; draw(); return null; } catch (e) { return e.message; }
    } });
    MA.ui.button(bar, { label: T('Reset'), onClick: safe(() => { shade = target; draw(); }) });
    MA.ui.button(bar, { label: T('Complement'), onClick: safe(() => { shade = ALL & ~shade; draw(); }) });
    MA.ui.button(bar, { label: T('Clear'), onClick: safe(() => { shade = 0; draw(); }) });
    function toggle(m) { shade ^= 1 << m; draw(); }
    function draw() {
      regs.forEach((g, m) => g.classList.toggle('on', !!((shade >> m) & 1)));
      const cnt = popcount(shade);
      const same = shade === target;
      const parts = [el('span', null, el('span', { class: 'k', text: T('Expression') + ' ' }), MA.texEl(setTeX(ast, names)))];
      parts.push(el('span', null, el('span', { class: 'k', text: T('Shaded') + ' ' }), MA.texEl(regionsTeX(shade, k, names)), ' ', el('span', { class: 'w-dm-hint', text: T('(%d of %d regions)', cnt, N) })));
      parts.push(same ? el('span', { class: 'w-dm-ok', text: T('matches the expression') }) : el('span', { class: 'w-dm-no', text: T('differs from the expression') }));
      info.set(...parts);
    }
    draw();
    info.el.after(el('div', { class: 'w-dm-panel' }, el('span', { class: 'w-dm-hint', text: T('Click regions to shade or unshade them; the shortest matching expression is shown. Type ∪ ∩ \\ ′ Δ or | & - \' xor.') })));
  });

  // ================================================================== sieve
  /** Smallest prime factor table up to n (spf[k] = k for primes). */
  function spfTable(n) {
    const spf = new Int32Array(n + 1);
    for (let i = 2; i <= n; i++) {
      if (spf[i]) continue;
      for (let j = i; j <= n; j += i) if (!spf[j]) spf[j] = i;
    }
    return spf;
  }
  /** "84 = 2² · 3 · 7" with superscript exponents. */
  const SUP = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function factorString(v, spf) {
    if (v < 2) return String(v);
    const parts = [];
    let x = v;
    while (x > 1) {
      const p = spf ? spf[x] : smallestFactor(x);
      let e = 0;
      while (x % p === 0) { x /= p; e++; }
      parts.push(p + (e > 1 ? String(e).split('').map((d) => SUP[d]).join('') : ''));
    }
    return parts.join(' · ');
  }
  function smallestFactor(x) { if (x % 2 === 0) return 2; for (let d = 3; d * d <= x; d += 2) if (x % d === 0) return d; return x; }
  /** Offset logarithmic integral Li(x) = ∫_2^x dt / ln t (series for li). */
  function Li(x) {
    if (x <= 2) return 0;
    const li = (y) => {
      const L = Math.log(y);
      let s = 0.5772156649015329 + Math.log(L), term = 1;
      for (let k = 1; k < 200; k++) { term *= L / k; const add = term / k; s += add; if (add < 1e-16 * s) break; }
      return s;
    };
    return li(x) - 1.045163780117493;
  }
  /** Colour for the i-th sieving prime. */
  const primeColour = (i) => cat(i, i < 6 ? 6 : 12);

  function sieveGrid(stage, cfg, n0) {
    let n = Math.max(10, Math.min(1000, n0));
    let cols = n <= 150 ? 10 : n <= 400 ? 20 : 30;
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 300, { label: T('Sieve of Eratosthenes') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    stage.append(panel);
    let events = [], spf = null, sievers = [], cells = [], pos = 0;
    function plan() {
      spf = spfTable(n);
      events = [];
      sievers = [];
      for (let p = 2; p * p <= n; p++) {
        if (spf[p] !== p) continue;
        sievers.push(p);
        events.push({ p, m: 0 });
        for (let m = p * p; m <= n; m += p) events.push({ p, m });
      }
      events.push({ p: 0, m: 0, end: true });
    }
    function layout() {
      const rows = Math.ceil(n / cols);
      const pad = 10, cw = (W - 2 * pad) / cols, ch = Math.min(cw, n > 400 ? 22 : 34);
      const H = Math.round(rows * ch + 2 * pad);
      box.size(W, H);
      box.svg.replaceChildren();
      const fs = Math.max(6, Math.min(13, ch * 0.46, cw / (String(n).length * 0.66 + 0.6)));
      cells = [null];
      for (let v = 1; v <= n; v++) {
        const r = Math.floor((v - 1) / cols), c = (v - 1) % cols;
        const x = pad + c * cw, y = pad + r * ch;
        const g = el('g');
        const rect = el('rect', { x: x + 1, y: y + 1, width: cw - 2, height: ch - 2, rx: 3 });
        const strike = el('line', { x1: x + 4, y1: y + ch - 4, x2: x + cw - 4, y2: y + 4, style: 'stroke-width:1.6;stroke-linecap:round', display: 'none' });
        const t = stext(x + cw / 2, y + ch / 2 + 0.5, String(v), { style: 'font-size:' + fs.toFixed(1) + 'px' });
        g.append(rect, t, strike);
        box.svg.append(g);
        cells.push({ rect, t, strike });
      }
    }
    /** Draw the state after events[0..e] (e = -1: nothing done yet). */
    function show(e) {
      pos = Math.max(-1, Math.min(events.length - 1, e));
      const by = new Int32Array(n + 1);           // prime index that first crossed v (+1), 0 = not crossed
      const announced = new Map();                  // sieving prime -> colour index
      let cur = null, done = false;
      for (let i = 0; i <= pos; i++) {
        const ev = events[i];
        if (ev.end) { done = true; continue; }
        if (!announced.has(ev.p)) announced.set(ev.p, announced.size);
        if (ev.m && !by[ev.m]) by[ev.m] = announced.get(ev.p) + 1;
        cur = ev;
      }
      if (done) cur = null;
      for (let v = 1; v <= n; v++) {
        const c = cells[v];
        let fill = 'var(--plot-bg)', stroke = 'var(--rule)', tc = 'var(--ink)', fw = '500', strike = null, sw = 1;
        if (v === 1) { tc = 'var(--ink-3)'; fill = tint('var(--ink-3)', 10); }
        else if (announced.has(v)) { const col = primeColour(announced.get(v)); fill = tint(col, 55); stroke = col; fw = '700'; sw = 1.5; }
        else if (by[v]) { const col = primeColour(by[v] - 1); fill = tint(col, 16); tc = 'var(--ink-3)'; strike = col; }
        else if (done) { fill = 'var(--accent-wash)'; stroke = 'var(--accent)'; fw = '700'; sw = 1.5; }
        if (cur && v === cur.m) { stroke = 'var(--ink)'; sw = 2.5; }
        if (cur && v === cur.p && !cur.m) { stroke = 'var(--ink)'; sw = 2.5; }
        c.rect.setAttribute('style', 'fill:' + fill + ';stroke:' + stroke + ';stroke-width:' + sw);
        c.t.style.fill = tc;
        c.t.style.fontWeight = fw;
        if (strike) { c.strike.removeAttribute('display'); c.strike.style.stroke = strike; } else c.strike.setAttribute('display', 'none');
      }
      // messages
      const primes = [];
      for (let v = 2; v <= n; v++) if (announced.has(v) || (done && !by[v])) primes.push(v);
      let msg;
      if (pos < 0) msg = T('Write the numbers 2 to %d. The first unmarked number, 2, is prime.', n);
      else if (done) msg = T('Every composite number up to %d has a prime factor at most √%d ≈ %s, so all of them are crossed out: the %d unmarked numbers left are exactly the primes.', n, n, MA.fmt(Math.sqrt(n), 3), primes.length);
      else if (!cur.m) msg = T('%d is not crossed out, so it is prime. Cross out its multiples, starting at %d² = %d (smaller multiples are already crossed).', cur.p, cur.p, cur.p * cur.p);
      else msg = T('Cross out %d = %d × %d', cur.m, cur.p, cur.m / cur.p) + (by[cur.m] - 1 !== announced.get(cur.p) ? MA.sep + T('(already crossed out by %d)', sievers[by[cur.m] - 1]) : '') + MA.p('.');
      info.set(el('span', { class: 'w-dm-msg', text: msg }));
      panel.replaceChildren(chipRow(done ? T('π(%d) = %d primes:', n, primes.length) : T('Primes so far:'), primes.length > 80 ? primes.slice(0, 80).concat('…') : primes, (i, p) => announced.has(p)));
      bStep.disabled = bEnd.disabled = done;
      bReset.disabled = pos < 0;
    }
    // controls
    const delay = () => Math.max(0.012, Math.min(0.35, 18 / events.length));
    let acc = 0;
    const anim = MA.anim((dt) => {
      acc += dt;
      const d = delay();
      let moved = false;
      while (acc >= d) {
        acc -= d;
        if (pos >= events.length - 1) { setPlay(false); return false; }
        const nx = events[pos + 1];
        // pause briefly when a new prime is announced
        if (!nx.m && !nx.end) acc -= 0.5;
        pos++;
        moved = true;
      }
      if (moved) show(pos);
      if (pos >= events.length - 1) { setPlay(false); return false; }
      return true;
    });
    const box2 = el('div', { class: 'w-dm-player' });
    const mk = (label, aria, fn, primary) => { const b = el('button', { type: 'button', class: 'w-btn' + (primary ? ' primary' : ''), 'aria-label': aria, title: aria, text: label }); b.addEventListener('click', safe(fn)); box2.append(b); return b; };
    const PLAY = '▶︎ ' + T('Play'), PAUSE = '❚❚ ' + T('Pause');
    const bReset = mk('↺', T('Back to the start'), () => { anim.stop(); setPlay(false); show(-1); });
    const bPlay = mk(PLAY, T('Play'), () => { if (anim.running) { anim.stop(); setPlay(false); } else { if (pos >= events.length - 1) show(-1); acc = 0; anim.play(); setPlay(true); } }, true);
    const bStep = mk(T('Next prime') + ' ›', T('Next prime'), () => {
      anim.stop(); setPlay(false);
      let j = pos + 1;
      while (j < events.length - 1 && events[j + 1] && events[j + 1].m) j++;
      show(j);
    });
    const bEnd = mk(T('Finish'), T('Finish'), () => { anim.stop(); setPlay(false); show(events.length - 1); });
    function setPlay(on) { bPlay.textContent = on ? PAUSE : PLAY; }
    MA.ui.slider(bar, { label: 'n', min: 10, max: 1000, step: 1, value: n, fmt: (v) => String(v), onInput: safe((v) => { anim.stop(); setPlay(false); n = v; plan(); layout(); show(-1); }) });
    MA.ui.select(bar, { label: T('Columns'), value: String(cols), options: [6, 10, 12, 20, 30].map((c) => [String(c), String(c)]), onChange: safe((v) => { cols = +v; layout(); show(pos); }) });
    bar.append(box2);
    // hover: factorisation
    box.svg.addEventListener('pointermove', safe((ev) => {
      const tgt = ev.target.closest && ev.target.closest('g');
      const v = cells.findIndex((c) => c && tgt && c.rect.parentNode === tgt);
      if (v < 1) { MA.tip.hide(); return; }
      MA.tip.show(v === 1 ? T('1 is neither prime nor composite') : spf[v] === v ? T('%d is prime', v) : v + ' = ' + factorString(v, spf), ev.clientX, ev.clientY);
    }));
    box.svg.addEventListener('pointerleave', () => MA.tip.hide());
    plan();
    layout();
    show(-1);
  }

  function ulamSpiral(stage, cfg, n0) {
    let side = Math.max(5, Math.min(401, Math.ceil(Math.sqrt(Math.max(25, n0)))));
    if (side % 2 === 0) side++;
    const wrap = el('div', { class: 'w-plot', style: 'max-width:560px;margin:0 auto' });
    const canvas = el('canvas', { role: 'img', 'aria-label': T('Ulam spiral') });
    wrap.append(canvas);
    stage.append(wrap);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const col = resolver(stage);
    let spf = null, X = null, Y = null, showNums = true;
    function build() {
      const N = side * side;
      spf = spfTable(N);
      X = new Int16Array(N + 1); Y = new Int16Array(N + 1);
      // 1 in the centre; then right, up, left, left, down, down, right x3, up x3, ...
      let x = 0, y = 0, k = 1, len = 1, d = 0;
      const DX = [1, 0, -1, 0], DY = [0, -1, 0, 1];
      X[1] = 0; Y[1] = 0;
      while (k < N) {
        for (let rep = 0; rep < 2 && k < N; rep++) {
          for (let s = 0; s < len && k < N; s++) { x += DX[d]; y += DY[d]; k++; X[k] = x; Y[k] = y; }
          d = (d + 1) % 4;
        }
        len++;
      }
    }
    function draw() {
      const css = Math.min(560, wrap.clientWidth || 560);
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(css * dpr); canvas.height = Math.round(css * dpr);
      const ctx = canvas.getContext('2d');
      const S = canvas.width, cell = S / side, half = (side - 1) / 2;
      ctx.fillStyle = col('var(--plot-bg)');
      ctx.fillRect(0, 0, S, S);
      const N = side * side;
      const px = (k) => (X[k] + half) * cell, py = (k) => (Y[k] + half) * cell;
      const big = side <= 21 && showNums;
      if (big) {
        ctx.strokeStyle = col('var(--grid)'); ctx.lineWidth = Math.max(1, dpr);
        for (let k = 1; k <= N; k++) ctx.strokeRect(px(k) + 0.5, py(k) + 0.5, cell - 1, cell - 1);
        // the spiral path
        ctx.strokeStyle = col(tint('var(--ink-3)', 60)); ctx.lineWidth = 1.2 * dpr;
        ctx.beginPath();
        for (let k = 1; k <= N; k++) { const a = px(k) + cell / 2, b = py(k) + cell / 2; if (k === 1) ctx.moveTo(a, b); else ctx.lineTo(a, b); }
        ctx.stroke();
      }
      const pc = col('var(--accent)'), pf = col(tint('var(--accent)', 30));
      for (let k = 2; k <= N; k++) {
        if (spf[k] !== k) continue;
        if (big) { ctx.fillStyle = pf; ctx.fillRect(px(k) + 1.5 * dpr, py(k) + 1.5 * dpr, cell - 3 * dpr, cell - 3 * dpr); }
        else { ctx.fillStyle = pc; const s = Math.max(1, cell * (side > 120 ? 1 : 0.8)); ctx.fillRect(px(k) + (cell - s) / 2, py(k) + (cell - s) / 2, s, s); }
      }
      if (big) {
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        const fs = Math.min(13 * dpr, cell * (N >= 100 ? 0.36 : 0.45));
        for (let k = 1; k <= N; k++) {
          const prime = spf[k] === k && k > 1;
          ctx.font = (prime ? '700 ' : '400 ') + fs + 'px ' + (MA.cssVar('--font') || 'sans-serif');
          ctx.fillStyle = col(prime ? 'var(--ink)' : 'var(--ink-3)');
          ctx.fillText(String(k), px(k) + cell / 2, py(k) + cell / 2 + 0.5);
        }
      } else {
        // mark the centre
        ctx.strokeStyle = col('var(--series-2)'); ctx.lineWidth = 1.5 * dpr;
        ctx.strokeRect(px(1) - cell, py(1) - cell, cell * 3, cell * 3);
      }
      let cnt = 0;
      for (let k = 2; k <= N; k++) if (spf[k] === k) cnt++;
      info.set(MA.ui.kv(T('numbers'), '1 – ' + num(N)), MA.ui.kv(T('primes'), num(cnt)), el('span', { class: 'w-dm-hint', text: T('Primes cluster on diagonal lines: values of quadratics such as 4k² + 2k + 1 lie on diagonals.') }));
    }
    canvas.addEventListener('pointermove', safe((ev) => {
      const r = canvas.getBoundingClientRect();
      const half = (side - 1) / 2;
      const gx = Math.floor((ev.clientX - r.left) / r.width * side) - half, gy = Math.floor((ev.clientY - r.top) / r.height * side) - half;
      // number at grid position (gx, gy) of the spiral
      const k = spiralNumber(gx, gy);
      if (k < 1 || k > side * side) { MA.tip.hide(); return; }
      MA.tip.show(k === 1 ? '1' : spf[k] === k ? T('%d is prime', k) : k + ' = ' + factorString(k, spf), ev.clientX, ev.clientY);
    }));
    canvas.addEventListener('pointerleave', () => MA.tip.hide());
    MA.ui.slider(bar, { label: T('side'), min: 5, max: 401, step: 2, value: side, fmt: (v) => v + ' × ' + v, onInput: safe((v) => { side = v; build(); draw(); }) });
    MA.ui.toggle(bar, { label: T('Numbers'), value: true, onChange: safe((v) => { showNums = v; draw(); }) });
    window.addEventListener('ma:theme', safe(() => { col.reset(); draw(); }));
    build();
    draw();
  }
  /** The number at grid cell (x, y) of an Ulam spiral with 1 at (0, 0) (y downwards; 2 is to the right of 1). */
  function spiralNumber(x, y) {
    const k = Math.max(Math.abs(x), Math.abs(y));
    if (k === 0) return 1;
    const m = (2 * k + 1) * (2 * k + 1);              // bottom-right corner (k, k)
    if (y === k) return m - (k - x);                   // bottom row, going left from the corner
    if (x === -k) return m - 2 * k - (k - y);          // left column, going up
    if (y === -k) return m - 4 * k - (x + k);          // top row, going right
    return m - 6 * k - (y + k);                        // right column, going down
  }

  function primeCount(stage, cfg, n0) {
    let lg = Math.log10(Math.max(20, Math.min(1e7, n0)));
    let view = 'count';
    let sieve = null, sieveN = 0;
    const ensure = (N) => {
      if (sieve && sieveN >= N) return;
      sieveN = Math.max(N, Math.min(1e7, Math.ceil(N * 1.0001)));
      sieve = new Uint8Array(sieveN + 1);
      sieve[0] = sieve[1] = 1;
      for (let i = 2; i * i <= sieveN; i++) if (!sieve[i]) for (let j = i * i; j <= sieveN; j += i) sieve[j] = 1;
    };
    const legHost = el('div');
    stage.append(legHost);
    const legend = () => {
      legHost.replaceChildren();
      MA.ui.legend(legHost, view === 'count'
        ? [{ label: '\\pi(x)', color: 'var(--series-1)' }, { label: 'x/\\ln x', color: 'var(--series-2)' }, { label: '\\operatorname{Li}(x)', color: 'var(--series-3)' }]
        : [{ label: '\\pi(x) \\big/ \\tfrac{x}{\\ln x}', color: 'var(--series-2)' }, { label: '\\pi(x) \\big/ \\operatorname{Li}(x)', color: 'var(--series-3)' }]);
    };
    const P = new MA.Plot(stage, { x: [0, 100], y: [0, 30], height: 380, label: T('Prime counting function') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = P.readout();
    let samples = [];
    function compute() {
      const N = Math.round(Math.pow(10, lg));
      ensure(N);
      // π at sample points (exact steps when N is small)
      samples = [];
      const steps = N <= 3000 ? N : 2000;
      let cnt = 0, next = 0, x = 0;
      for (let i = 0; i <= steps; i++) {
        const target = Math.round(N * i / steps);
        while (x < target) { x++; if (!sieve[x]) cnt++; }
        samples.push([target, cnt]);
        next = target;
      }
      void next;
      return N;
    }
    const piAt = (x) => {
      if (!samples.length) return 0;
      // binary search the last sample with s[0] <= x
      let lo = 0, hi = samples.length - 1;
      while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (samples[mid][0] <= x) lo = mid; else hi = mid - 1; }
      return samples[lo][1];
    };
    function draw() {
      const N = compute();
      const piN = piAt(N);
      P.clear();
      if (view === 'count') {
        P.setView([0, N], [0, Math.max(4, piN * 1.18)]);
        const pts = [];
        samples.forEach(([x, c], i) => { if (i) pts.push([x, samples[i - 1][1]]); pts.push([x, c]); });
        P.fn((x) => (x > 1.2 ? x / Math.log(x) : NaN), { color: 'var(--series-2)', width: 2 });
        P.fn((x) => (x >= 2 ? Li(x) : NaN), { color: 'var(--series-3)', width: 2, dash: '7 4' });
        P.path(pts, { color: 'var(--series-1)', width: 2.4 });
      } else {
        P.setView([0, N], [0.8, 1.6]);
        P.hline(1, { color: 'var(--ink-3)' });
        const rA = [], rB = [];
        samples.forEach(([x, c]) => { if (x >= 10 && c) { rA.push([x, c * Math.log(x) / x]); rB.push([x, c / Li(x)]); } });
        P.path(rA, { color: 'var(--series-2)', width: 2.2 });
        P.path(rB, { color: 'var(--series-3)', width: 2.2 });
        P.text(N * 0.98, 1.55, T('both ratios tend to 1 (prime number theorem)'), { anchor: 'end', color: 'var(--ink-2)' });
      }
      legend();
      report(N);
    }
    function report(x) {
      x = Math.max(2, Math.round(x));
      const pi = piAt(x), a = x / Math.log(x), b = Li(x);
      info.set(MA.ui.kv('x =', num(x)), MA.ui.kv('\\pi(x) =', num(pi)), MA.ui.kv('x/\\ln x =', MA.fmt(a, 6) + '  (' + T('ratio %s', MA.fmt(pi / a, 4)) + ')'),
        MA.ui.kv('\\operatorname{Li}(x) =', MA.fmt(b, 6) + '  (' + T('ratio %s', MA.fmt(pi / b, 5)) + ')'));
    }
    MA.ui.slider(bar, { label: T('x up to'), min: 1.3, max: 7, step: 0.05, value: lg, fmt: (v) => num(Math.round(Math.pow(10, v))), onInput: safe((v) => { lg = v; draw(); }) });
    MA.ui.seg(bar, { options: [['count', T('Counts')], ['ratio', T('Ratios')]], value: view, onChange: safe((v) => { view = v; draw(); }) });
    P.onHover(safe((x) => {
      if (x === null || !(x >= 2)) { read(null); return; }
      const pi = piAt(x);
      read('x = ' + num(Math.round(x)) + '   π(x) = ' + num(pi) + '   x/ln x = ' + MA.fmt(x / Math.log(x), 5) + '   Li(x) = ' + MA.fmt(Li(x), 5));
    }));
    draw();
  }

  MA.widget('sieve', (stage, cfg) => {
    style();
    const mode = C.str(cfg.mode, 'sieve').toLowerCase();
    const n = C.int(cfg.n, mode === 'ulam' ? 441 : mode === 'count' ? 1000 : 120);
    if (!(n >= 2)) throw new Error(T('sieve: n must be at least 2'));
    MA.ui.title(stage, cfg.title);
    if (mode === 'sieve' || mode === 'eratosthenes') sieveGrid(stage, cfg, n);
    else if (mode === 'ulam' || mode === 'spiral') ulamSpiral(stage, cfg, n);
    else if (mode === 'count' || mode === 'pnt') primeCount(stage, cfg, n);
    else throw new Error(T('sieve: mode must be sieve, ulam or count'));
  });

  // ================================================================== modular
  /** Extended Euclid: returns [g, s, t] with s·a + t·b = g = gcd(a, b) (a, b ≥ 0). */
  function egcd(a, b) {
    let [r0, r1, s0, s1, t0, t1] = [a, b, 1, 0, 0, 1];
    while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; [t0, t1] = [t1, t0 - q * t1]; }
    return [r0, s0, t0];
  }
  const invMod = (a, n) => { const [g, s] = egcd(mod(a, n), n); return g === 1 ? mod(s, n) : null; };
  const phi = (n) => { let r = n, m = n; for (let p = 2; p * p <= m; p++) if (m % p === 0) { while (m % p === 0) m /= p; r -= r / p; } if (m > 1) r -= r / m; return r; };
  function powMod(a, k, n) { let r = 1 % n, b = mod(a, n); while (k > 0) { if (k & 1) r = (r * b) % n; b = (b * b) % n; k = Math.floor(k / 2); } return r; }
  function ordMod(a, n) { if (gcd(a, n) !== 1) return 0; let x = mod(a, n), k = 1; while (x !== 1 % n) { x = (x * a) % n; k++; if (k > n) return 0; } return k; }
  const MODES = { clock: 'clock', add: 'add', addition: 'add', multiply: 'multiply', multiplication: 'multiply', mult: 'multiply', times: 'multiply', powers: 'powers', power: 'powers', inverses: 'inverses', inverse: 'inverses' };

  MA.widget('modular', (stage, cfg) => {
    style();
    let mode = MODES[C.str(cfg.mode, 'multiply').toLowerCase()];
    if (!mode) throw new Error(T('modular: mode must be clock, add, multiply, powers or inverses'));
    let n = C.int(cfg.n, 12);
    if (n < 2 || n > 60) throw new Error(T('modular: n must be between 2 and 60'));
    let a = mod(C.int(cfg.a, 3), n);
    let b = Math.max(1, n - a + 2);
    let clockOp = 'add', unitsOnly = false;
    MA.ui.title(stage, cfg.title);
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 400, { label: T('Modular arithmetic') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    stage.append(panel);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    const maxN = () => (mode === 'clock' || mode === 'inverses' ? 60 : 40);
    const sMode = MA.ui.select(bar, { label: T('Show'), value: mode, options: [['clock', T('Clock')], ['add', T('Addition table')], ['multiply', T('Multiplication table')], ['powers', T('Powers')], ['inverses', T('Inverses')]],
      onChange: safe((v) => { mode = v; if (n > maxN()) { n = maxN(); sN.set(n); } a = Math.min(a, n - 1); sync(); draw(); }, report) });
    const sN = MA.ui.slider(bar, { label: 'n', min: 2, max: 36, step: 1, value: n, fmt: (v) => String(v), onInput: safe((v) => { n = v; a = Math.min(a, n - 1); b = Math.min(b, 2 * n); sync(); draw(); }, report) });
    const sA = MA.ui.slider(bar, { label: 'a', min: 0, max: n - 1, step: 1, value: a, fmt: (v) => String(v), onInput: safe((v) => { a = v; draw(); }, report) });
    const sB = MA.ui.slider(bar, { label: 'b', min: 0, max: 2 * n, step: 1, value: b, fmt: (v) => String(v), onInput: safe((v) => { b = v; draw(); }, report) });
    const sOp = MA.ui.seg(bar, { options: [['add', 'a + b'], ['orbit', T('multiples of a')]], value: clockOp, onChange: safe((v) => { clockOp = v; sync(); draw(); }, report) });
    const tUnits = MA.ui.toggle(bar, { label: T('Units only'), value: unitsOnly, onChange: safe((v) => { unitsOnly = v; draw(); }, report) });
    function sync() {
      sN.input.max = maxN();
      if (n > maxN()) n = maxN();
      sN.set(n);
      sA.input.min = mode === 'powers' || mode === 'inverses' ? 1 : 0;
      sA.input.max = n - 1;
      if (a < +sA.input.min) a = +sA.input.min;
      sA.set(a);
      sB.input.max = 2 * n;
      if (b > 2 * n) b = 2 * n;
      sB.set(b);
      sB.el.style.display = mode === 'clock' && clockOp === 'add' ? '' : 'none';
      sOp.el.style.display = mode === 'clock' ? '' : 'none';
      tUnits.el.style.display = mode === 'multiply' || mode === 'powers' ? '' : 'none';
    }
    void sMode;
    const valColour = (v) => (v === 0 ? 'var(--plot-bg)' : tint(ring((v - 1) / Math.max(1, n - 1) * 0.92), 42));
    // ---------------------------------------------------------------- clock and inverse circle
    function circleBase(H) {
      box.size(W, H);
      box.svg.replaceChildren();
      const R = Math.min(W, H) / 2 - 42, cx = W / 2, cy = H / 2;
      const ang = (k) => -Math.PI / 2 + 2 * Math.PI * k / n;
      const pt = (k, r = R) => [cx + r * Math.cos(ang(k)), cy + r * Math.sin(ang(k))];
      box.svg.append(el('circle', { cx, cy, r: R, style: 'fill:none;stroke:var(--rule-2);stroke-width:1.5' }));
      const fs = n > 40 ? 9.5 : n > 24 ? 11 : 13;
      const dots = [];
      for (let k = 0; k < n; k++) {
        const [x, y] = pt(k);
        const d = el('circle', { cx: x, cy: y, r: n > 40 ? 3 : 4.5, style: 'fill:var(--plot-bg);stroke:var(--ink-2);stroke-width:1.5' });
        box.svg.append(d);
        dots.push(d);
        const [lx, ly] = pt(k, R + (n > 40 ? 15 : 19));
        box.svg.append(stext(lx, ly, String(k), { style: 'font-size:' + fs + 'px;fill:var(--ink-2)' }));
      }
      return { R, cx, cy, ang, pt, dots };
    }
    /** Arc along the circle from step k0 through dk steps (clockwise), at radius r(t) (t = fraction of the arc). */
    function arcPath(g, k0, dk, rf) {
      const steps = Math.max(8, Math.ceil(Math.abs(dk) * 64 / n));
      let d = '';
      for (let i = 0; i <= steps; i++) {
        const t = i / steps, th = g.ang(k0 + dk * t), r = rf(t);
        d += (i ? 'L' : 'M') + (g.cx + r * Math.cos(th)).toFixed(1) + ',' + (g.cy + r * Math.sin(th)).toFixed(1);
      }
      return d;
    }
    function drawClock() {
      const H = W > 500 ? 400 : 380;
      const g = circleBase(H);
      if (clockOp === 'add') {
        const s = a + b, r = mod(s, n);
        const r1 = g.R - 16;
        if (a > 0) {
          box.svg.append(el('path', { d: arcPath(g, 0, a, () => r1), style: 'fill:none;stroke:var(--series-1);stroke-width:5;stroke-linecap:round;opacity:.9' }));
          const [mx, my] = g.pt(a / 2, r1 - 16);
          box.svg.append(stext(mx, my, '+' + a, { cls: 'w-dm-t w-dm-halo', style: 'font-size:12px;font-weight:700;fill:var(--series-1)' }));
        }
        if (b > 0) {
          const revs = b / n;
          const rf = (t) => g.R - 32 - 16 * revs * t;
          const d = arcPath(g, a, b, rf);
          box.svg.append(el('path', { d, style: 'fill:none;stroke:var(--series-2);stroke-width:5;stroke-linecap:round;opacity:.9' }));
          const th = g.ang(a + b), r2 = rf(1), ex = g.cx + r2 * Math.cos(th), ey = g.cy + r2 * Math.sin(th);
          box.svg.append(el('path', { d: arrowHead(ex + 4 * -Math.sin(th), ey + 4 * Math.cos(th), -Math.sin(th), Math.cos(th), 12, 10), style: 'fill:var(--series-2)' }));
          const [mx, my] = g.pt(a + b / 2, rf(0.5) - 16);
          box.svg.append(stext(mx, my, '+' + b, { cls: 'w-dm-t w-dm-halo', style: 'font-size:12px;font-weight:700;fill:var(--series-2)' }));
        }
        g.dots[0].style.cssText = 'fill:var(--ink-2);stroke:var(--ink-2)';
        g.dots[r].style.cssText = 'fill:var(--accent);stroke:var(--accent);';
        g.dots[r].setAttribute('r', 7);
        box.svg.append(stext(g.cx, g.cy - 8, '(' + a + ' + ' + b + ') mod ' + n, { style: 'font-size:14px;fill:var(--ink-2)' }));
        box.svg.append(stext(g.cx, g.cy + 16, '= ' + r, { style: 'font-size:22px;font-weight:700;fill:var(--accent)' }));
        const q = Math.floor(s / n);
        info.set(el('span', null, MA.texEl(a + ' + ' + b + ' = ' + s + (q ? ' = ' + q + '\\cdot' + n + ' + ' + r : '') + ', \\quad ' + a + ' + ' + b + ' \\equiv ' + r + ' \\pmod{' + n + '}')),
          el('span', { class: 'w-dm-hint', text: q === 1 ? T('The sum passes 0 once, so subtract n = %d.', n) : q > 1 ? T('The sum passes 0 %d times, so subtract %d · %d.', q, q, n) : T('No wrap-around: the sum is already less than n.') }));
        panel.replaceChildren();
      } else {
        const d = gcd(a, n), ord = n / d;
        const orbit = [];
        for (let k = 0; k < ord; k++) orbit.push((k * a) % n);
        if (a !== 0) {
          for (let k = 0; k < ord; k++) {
            const p0 = g.pt(orbit[k], g.R - 6), p1 = g.pt(orbit[(k + 1) % ord], g.R - 6);
            const dx = p1[0] - p0[0], dy = p1[1] - p0[1], L = Math.hypot(dx, dy) || 1;
            const e = [p1[0] - dx / L * 8, p1[1] - dy / L * 8];
            box.svg.append(el('line', { x1: p0[0], y1: p0[1], x2: e[0] - dx / L * 6, y2: e[1] - dy / L * 6, style: 'stroke:var(--series-1);stroke-width:2.2;opacity:.85' }));
            box.svg.append(el('path', { d: arrowHead(e[0], e[1], dx, dy, 10, 8), style: 'fill:var(--series-1)' }));
          }
        }
        orbit.forEach((v) => { g.dots[v].style.cssText = 'fill:var(--accent);stroke:var(--accent)'; g.dots[v].setAttribute('r', n > 40 ? 4 : 6); });
        box.svg.append(stext(g.cx, g.cy, '⟨' + a + '⟩', { style: 'font-size:22px;font-weight:700;fill:var(--accent)' }));
        info.set(el('span', null, MA.texEl('\\langle ' + a + '\\rangle = \\{' + orbit.slice().sort((x, y) => x - y).join(', ') + '\\}')),
          el('span', { class: 'w-dm-hint', text: orbit.concat(0).join(' → ') }),
          el('span', null, T('Adding %d returns to 0 after %d steps: n / gcd(a, n) = %d / %d = %d.', a, ord, n, d, ord)),
          d === 1 ? el('span', { class: 'w-dm-ok', text: T('gcd = 1, so the multiples of a reach every residue.') }) : el('span', { class: 'w-dm-hint', text: T('gcd = %d > 1: only multiples of %d are reached.', d, d) }));
        panel.replaceChildren();
      }
    }
    function drawInverses() {
      const H = W > 500 ? 400 : 380;
      const g = circleBase(H);
      const pairs = [];
      for (let x = 1; x < n; x++) {
        const y = invMod(x, n);
        if (y === null) { g.dots[x].style.cssText = 'fill:var(--plot-bg);stroke:var(--ink-3);stroke-dasharray:2 2'; continue; }
        if (y === x) { g.dots[x].style.cssText = 'fill:var(--series-2);stroke:var(--series-2)'; continue; }
        if (x < y) pairs.push([x, y]);
        g.dots[x].style.cssText = 'fill:var(--series-1);stroke:var(--series-1)';
      }
      g.dots[0].style.cssText = 'fill:var(--plot-bg);stroke:var(--ink-3);stroke-dasharray:2 2';
      pairs.forEach(([x, y]) => {
        const p0 = g.pt(x, g.R - 5), p1 = g.pt(y, g.R - 5);
        const hot = x === a || y === a;
        box.svg.insertBefore(el('line', { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], style: 'stroke:' + (hot ? 'var(--accent)' : 'var(--series-1)') + ';stroke-width:' + (hot ? 3.5 : 1.6) + ';opacity:' + (hot ? 1 : 0.55) }), box.svg.firstChild.nextSibling);
      });
      const ai = invMod(a, n);
      g.dots[a].setAttribute('r', 7.5);
      g.dots[a].style.stroke = 'var(--accent)';
      g.dots[a].style.strokeWidth = '3';
      const [gg, s, t] = egcd(a, n);
      const units = [];
      for (let x = 1; x < n; x++) if (gcd(x, n) === 1) units.push(x);
      const selfInv = units.filter((x) => (x * x) % n === 1 % n);
      const parts = [];
      if (ai === null) parts.push(el('span', null, MA.texEl('\\gcd(' + a + ', ' + n + ') = ' + gg + ' \\ne 1'), ' ', T('so %d has no inverse mod %d (%d · x is always a multiple of %d).', a, n, a, gg)));
      else {
        parts.push(el('span', null, T('Extended Euclid:'), ' ', MA.texEl(fmtBezout(s, a, t, n, 1)), ' ', T('so'), ' ', MA.texEl(a + '^{-1} \\equiv ' + mod(s, n) + ' \\pmod{' + n + '}')));
        parts.push(el('span', null, T('Check:'), ' ', MA.texEl(a + ' \\cdot ' + ai + ' = ' + (a * ai) + ' \\equiv 1')));
      }
      info.set(...parts);
      const rows = [el('div', { class: 'w-dm-row' }, el('span', { class: 'k', text: T('Inverse pairs:') }), ...pairs.map(([x, y]) => chip(x + ' ↔ ' + y, x === a || y === a ? 'on' : '')))];
      rows.push(el('div', { class: 'w-dm-row' }, el('span', { class: 'k', text: T('Self-inverse (x² ≡ 1):') }), ...selfInv.map((x) => chip(String(x), x === a ? 'on' : ''))));
      const nonunits = [];
      for (let x = 0; x < n; x++) if (gcd(x, n) !== 1) nonunits.push(x);
      if (nonunits.length) rows.push(el('div', { class: 'w-dm-row' }, el('span', { class: 'k', text: T('No inverse (gcd > 1):') }), ...nonunits.map((x) => chip(String(x), 'dim'))));
      if (isPrime(n) && n > 2) rows.push(el('div', { class: 'w-dm-hint', text: T('n is prime: every non-zero residue has an inverse, and only 1 and n − 1 are their own inverses. Pairing the rest gives Wilson’s theorem (n − 1)! ≡ −1.') }));
      panel.replaceChildren(...rows);
    }
    // ---------------------------------------------------------------- tables
    /** Grid of cells: rows and cols are lists of residues; f(r, c) gives the value. */
    function grid(rowsV, colsV, f, o) {
      const nr = rowsV.length, nc = colsV.length + (o.extra ? 1 : 0);
      const pad = 8, hs = Math.max(26, Math.min(40, (W - 2 * pad) / (nc + 1)));
      const cs = Math.min(40, (W - 2 * pad - hs - (o.extra ? 14 : 0)) / nc);
      const ch = Math.min(cs, 32);
      const H = Math.round(pad * 2 + ch * nr + hs * 0.8);
      box.size(W, H);
      box.svg.replaceChildren();
      const x0 = pad + hs + Math.max(0, (W - 2 * pad - hs - cs * nc) / 2), y0 = pad + hs * 0.8;
      const fs = Math.min(13, cs * 0.42, ch * 0.55);
      const showText = cs >= 13;
      // headers
      box.svg.append(stext(x0 - hs / 2, y0 - hs * 0.4, o.corner, { style: 'font-size:13px;font-weight:700;fill:var(--ink-2)' }));
      colsV.forEach((c, j) => box.svg.append(stext(x0 + j * cs + cs / 2, y0 - hs * 0.4, o.colLabel ? o.colLabel(c) : String(c), { style: 'font-size:' + Math.min(12.5, fs + 1) + 'px;font-weight:600;fill:' + (o.headColour ? o.headColour(c, true) : 'var(--ink-2)') })));
      if (o.extra) box.svg.append(stext(x0 + colsV.length * cs + cs / 2 + 12, y0 - hs * 0.4, o.extra.label, { style: 'font-size:12px;font-weight:700;fill:var(--ink-2)' }));
      box.svg.append(el('line', { x1: x0, y1: y0 - 2, x2: x0 + cs * colsV.length, y2: y0 - 2, style: 'stroke:var(--ink-3);stroke-width:1.2' }));
      box.svg.append(el('line', { x1: x0 - 2, y1: y0, x2: x0 - 2, y2: y0 + ch * nr, style: 'stroke:var(--ink-3);stroke-width:1.2' }));
      const cellEls = [];
      rowsV.forEach((r, i) => {
        const y = y0 + i * ch;
        const hot = o.hotRow === r;
        if (hot) box.svg.append(el('rect', { x: x0 - hs, y: y, width: hs - 4, height: ch, rx: 4, style: 'fill:var(--accent-wash)' }));
        box.svg.append(stext(x0 - hs / 2 - 2, y + ch / 2, String(r), { style: 'font-size:' + Math.min(12.5, fs + 1) + 'px;font-weight:' + (hot ? 800 : 600) + ';fill:' + (o.headColour ? o.headColour(r, false) : 'var(--ink-2)') }));
        colsV.forEach((c, j) => {
          const v = f(r, c);
          const x = x0 + j * cs;
          const st = o.cellStyle(v, r, c);
          const rect = el('rect', { x: x + 0.5, y: y + 0.5, width: cs - 1, height: ch - 1, rx: 2, style: st.rect });
          box.svg.append(rect);
          if (showText) box.svg.append(stext(x + cs / 2, y + ch / 2 + 0.5, String(v), { style: 'font-size:' + fs.toFixed(1) + 'px;pointer-events:none;' + (st.text || '') }));
          rect.dataset.r = r; rect.dataset.c = c; rect.dataset.v = v;
          cellEls.push(rect);
        });
        if (o.extra) box.svg.append(stext(x0 + colsV.length * cs + cs / 2 + 12, y + ch / 2, o.extra.value(r), { style: 'font-size:' + Math.min(12.5, fs + 1) + 'px;font-weight:700;fill:' + (o.extra.colour ? o.extra.colour(r) : 'var(--ink)') }));
        if (hot) box.svg.append(el('rect', { x: x0, y: y + 0.5, width: cs * colsV.length, height: ch - 1, style: 'fill:none;stroke:var(--accent);stroke-width:2.2' }));
      });
      box.svg.onpointermove = safe((ev) => {
        const t = ev.target;
        if (!t || t.dataset === undefined || t.dataset.r === undefined) { MA.tip.hide(); return; }
        MA.tip.show(o.tip(+t.dataset.r, +t.dataset.c, +t.dataset.v), ev.clientX, ev.clientY);
      });
      box.svg.onpointerleave = () => MA.tip.hide();
    }
    const resid = (lo) => Array.from({ length: n - lo }, (_, i) => i + lo);
    function drawAdd() {
      const vals = resid(0);
      grid(vals, vals, (r, c) => (r + c) % n, {
        corner: '+', hotRow: a,
        cellStyle: (v) => ({ rect: 'fill:' + valColour(v) + ';stroke:var(--plot-bg)', text: v === 0 ? 'fill:var(--ink-3)' : 'fill:var(--ink)' }),
        tip: (r, c, v) => r + ' + ' + c + ' = ' + (r + c) + ' ≡ ' + v + ' (mod ' + n + ')',
      });
      const neg = mod(-a, n);
      info.set(el('span', null, T('Row %d:', a), ' ', MA.texEl(a + ' + x')), el('span', null, T('additive inverse'), ' ', MA.texEl('-' + a + ' \\equiv ' + neg + ' \\pmod{' + n + '}'), ' ', T('(the 0 in row %d is in column %d)', a, neg)));
      panel.replaceChildren(el('div', { class: 'w-dm-hint', text: T('Every row and every column contains each residue exactly once (a Latin square); each row is the first row shifted.') }));
    }
    function drawMultiply() {
      const vals = unitsOnly ? resid(1).filter((x) => gcd(x, n) === 1) : resid(0);
      if (!vals.length) { box.size(W, 60); box.svg.replaceChildren(); return; }
      grid(vals, vals, (r, c) => (r * c) % n, {
        corner: '×', hotRow: vals.includes(a) ? a : -1,
        headColour: (x) => (gcd(x, n) === 1 ? 'var(--accent)' : 'var(--ink-3)'),
        cellStyle: (v) => ({ rect: 'fill:' + valColour(v) + ';stroke:' + (v === 1 % n ? 'var(--ink)' : 'var(--plot-bg)') + ';stroke-width:' + (v === 1 % n ? 1.6 : 1), text: v === 0 ? 'fill:var(--ink-3)' : v === 1 % n ? 'fill:var(--ink);font-weight:800' : 'fill:var(--ink)' }),
        tip: (r, c, v) => r + ' · ' + c + ' = ' + (r * c) + ' ≡ ' + v + ' (mod ' + n + ')' + (v === 1 % n ? '  — ' + T('inverses') : v === 0 && r && c ? '  — ' + T('zero divisors') : ''),
      });
      const units = resid(1).filter((x) => gcd(x, n) === 1);
      const g = gcd(a, n);
      const parts = [MA.ui.kv(T('units (gcd(x, n) = 1, coloured headers)'), String(units.length) + ' = φ(' + n + ')')];
      if (g === 1) parts.push(el('span', null, T('Row %d is a permutation of the residues; its 1 is in column', a), ' ', MA.texEl(a + '^{-1} \\equiv ' + invMod(a, n))));
      else {
        const zd = resid(1).find((x) => (a * x) % n === 0);
        parts.push(el('span', null, T('%d is not a unit (gcd(%d, %d) = %d): row %d never contains 1', a, a, n, g, a) + (zd && a ? MA.p(', ') + T('and %d · %d ≡ 0 (zero divisor)', a, zd) : '') + MA.p('.')));
      }
      info.set(...parts);
      panel.replaceChildren(el('div', { class: 'w-dm-hint', text: unitsOnly ? T('The units form a group under multiplication: each row and column is a permutation (a Latin square).') : T('Outlined cells contain 1: their row and column are inverses. Rows of non-units repeat values and hit 0.') }));
    }
    function drawPowers() {
      const ph = phi(n);
      const rowsV = resid(1).filter((x) => !unitsOnly || gcd(x, n) === 1);
      const K = Math.max(2, Math.min(n - 1, 30, Math.max(ph, 12)));
      const colsV = Array.from({ length: K }, (_, i) => i + 1);
      const ords = new Map(rowsV.map((x) => [x, ordMod(x, n)]));
      const prim = rowsV.filter((x) => ords.get(x) === ph && gcd(x, n) === 1);
      grid(rowsV, colsV, (r, k) => powMod(r, k, n), {
        corner: 'a\\k', hotRow: rowsV.includes(a) ? a : -1,
        colLabel: (k) => String(k),
        headColour: (x, isCol) => (isCol ? (x === ph ? 'var(--accent)' : 'var(--ink-2)') : prim.includes(x) ? 'var(--accent)' : gcd(x, n) === 1 ? 'var(--ink)' : 'var(--ink-3)'),
        cellStyle: (v) => ({ rect: 'fill:' + valColour(v) + ';stroke:' + (v === 1 % n ? 'var(--ink)' : 'var(--plot-bg)') + ';stroke-width:' + (v === 1 % n ? 1.6 : 1), text: v === 1 % n ? 'fill:var(--ink);font-weight:800' : 'fill:var(--ink)' }),
        tip: (r, k, v) => r + '^' + k + ' ≡ ' + v + ' (mod ' + n + ')',
        extra: { label: T('ord'), value: (r) => (ords.get(r) ? String(ords.get(r)) : '–'), colour: (r) => (prim.includes(r) ? 'var(--accent)' : 'var(--ink-2)') },
      });
      const parts = [MA.ui.kv('φ(' + n + ') =', String(ph))];
      if (prim.length) parts.push(el('span', null, T('Primitive roots (order φ(n)):'), ' ', el('b', { text: prim.join(', ') }), ' ', el('span', { class: 'w-dm-hint', text: T('— there are φ(φ(n)) = %d', phi(ph)) })));
      else parts.push(el('span', null, el('span', { class: 'w-dm-no', text: T('No primitive root') }), ' ', T('mod %d: the largest order is %d < φ(n), so the units are not cyclic.', n, Math.max(...[...ords.values()]))));
      const oa = ordMod(a, n);
      if (a >= 1) parts.push(el('span', null, oa ? T('ord(%d) = %d, which divides φ(n) = %d.', a, oa, ph) : T('%d is not a unit, so no power of it is 1.', a)));
      info.set(...parts);
      panel.replaceChildren(el('div', { class: 'w-dm-hint', text: T('Outlined cells are 1. Euler: a^φ(n) ≡ 1 for every unit a — see column φ(n) = %d. Powers repeat with period ord(a).', ph) }));
    }
    function draw() {
      MA.tip.hide();
      if (mode === 'clock') drawClock();
      else if (mode === 'inverses') drawInverses();
      else if (mode === 'add') drawAdd();
      else if (mode === 'multiply') drawMultiply();
      else drawPowers();
    }
    sync();
    draw();
  });
  function isPrime(n) { if (n < 2) return false; for (let d = 2; d * d <= n; d++) if (n % d === 0) return false; return true; }
  /** TeX for s·a + t·b = g with signs tidied. */
  function fmtBezout(s, a, t, b, g) {
    const term = (c, x) => (c < 0 ? '(' + c + ')' : String(c)) + ' \\cdot ' + x;
    return term(s, a) + ' + ' + term(t, b) + ' = ' + g;
  }

  // ================================================================== euclid
  /** Parse "2 mod 3", "x ≡ 2 (mod 3)", "2 (mod 3)" into [a, m]. */
  function parseCongruence(s) {
    const t = String(s).replace(/\\pmod|\\bmod|\\mod/g, 'mod').replace(/[{}]/g, ' ').trim();
    const m = /^(?:x\s*(?:≡|==|=|\\equiv)\s*)?([−-]?\d+)\s*\(?\s*(?:mod|%)\s*(\d+)\s*\)?$/i.exec(t);
    if (!m) throw new Error(T('write each congruence as “a mod m”, e.g. 2 mod 3 — got “%s”', s));
    const a = parseInt(m[1].replace('−', '-'), 10), M = parseInt(m[2], 10);
    if (!(M >= 1)) throw new Error(T('the modulus must be at least 1 (in “%s”)', s));
    if (M > 1e6) throw new Error(T('moduli up to 1,000,000 please (in “%s”)', s));
    return [a, M];
  }

  MA.widget('euclid', (stage, cfg) => {
    style();
    let mode = C.str(cfg.mode, 'extended').toLowerCase();
    if (mode === 'ext' || mode === 'bezout') mode = 'extended';
    if (!['gcd', 'extended', 'crt'].includes(mode)) throw new Error(T('euclid: mode must be gcd, extended or crt'));
    MA.ui.title(stage, cfg.title);
    if (mode === 'crt') { crtWidget(stage, cfg); return; }
    const LIM = 1e15;
    let A = C.int(cfg.a, 252), B = C.int(cfg.b, 198);
    const check = (x) => { if (!Number.isSafeInteger(x) || Math.abs(x) > LIM) throw new Error(T('use integers up to 10^15 in size')); return x; };
    check(A); check(B);
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 200, { label: T('Euclid’s algorithm as squares tiling a rectangle') });
    const tableHost = el('div', { class: 'w-dm-panel', style: 'padding-top:6px' });
    const bar = MA.ui.bar(stage);
    stage.insertBefore(tableHost, bar);
    const info = MA.ui.info(stage);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    let steps = [], hot = -1;
    function compute() {
      const a = Math.abs(A), b = Math.abs(B);
      // rows: r, q, s, t   (r_{i+1} = r_{i-1} - q_i r_i)
      const R = [a, b], S = [1, 0], Tt = [0, 1], Q = [null];
      while (R[R.length - 1] !== 0) {
        const i = R.length - 1;
        const q = Math.floor(R[i - 1] / R[i]);
        Q[i] = q;
        R.push(R[i - 1] - q * R[i]); S.push(S[i - 1] - q * S[i]); Tt.push(Tt[i - 1] - q * Tt[i]);
        if (R.length > 200) break;
      }
      steps = { R, S, T: Tt, Q, a, b, n: R.length - 2 };
    }
    // ---- the rectangle of squares
    function drawRect(upto) {
      const { a, b, Q, R } = steps;
      box.svg.replaceChildren();
      if (!a || !b) { box.size(W, 60); box.svg.append(stext(W / 2, 30, T('One number is 0: gcd(a, 0) = |a|, nothing to tile.'), { style: 'fill:var(--ink-3)' })); return; }
      const big = Math.max(a, b), small = Math.min(a, b);
      const pad = 14, maxH = 260;
      let sc = (W - 2 * pad) / big;
      if (small * sc > maxH) sc = maxH / small;
      const w = big * sc, h = small * sc;
      if (h < 3) { box.size(W, 60); box.svg.append(stext(W / 2, 30, T('The rectangle %s × %s is too thin to draw.', num(big), num(small)), { style: 'fill:var(--ink-3)' })); return; }
      const H = Math.round(h + 2 * pad + 4);
      box.size(W, H);
      const ox = (W - w) / 2, oy = pad;
      box.svg.append(el('rect', { x: ox, y: oy, width: w, height: h, style: 'fill:none;stroke:var(--ink-2);stroke-width:1.5' }));
      let x = 0, y = 0, cw = big, chh = small;
      for (let i = 1; i <= steps.n && i <= upto; i++) {
        const s = R[i], q = Q[i];
        const col = cat(i - 1, Math.max(6, steps.n));
        const horiz = cw >= chh;
        const g = el('g', { class: 'w-dm-sq' + (hot === i ? ' hot' : '') });
        const px = (v) => ox + v * sc, py = (v) => oy + v * sc;
        if (q <= 240 && s * sc >= 0.6) {
          for (let k = 0; k < q; k++) {
            const sx = horiz ? x + k * s : x, sy = horiz ? y : y + k * s;
            g.append(el('rect', { x: px(sx), y: py(sy), width: s * sc, height: s * sc, style: 'fill:' + tint(col, 45) + ';stroke:' + col + ';stroke-width:' + (s * sc > 6 ? 1.4 : 0.6) }));
          }
        } else {
          g.append(el('rect', { x: px(x), y: py(y), width: (horiz ? q * s : s) * sc, height: (horiz ? s : q * s) * sc, style: 'fill:' + tint(col, 45) + ';stroke:' + col + ';stroke-width:1' }));
        }
        const lab = q > 1 ? q + ' × ' + num(s) + '²' : num(s) + '²', fsz = Math.min(14, s * sc / 4 + 6);
        if (s * sc >= 22 && s * sc >= lab.length * fsz * 0.62 + 6) {
          g.append(stext(px(x + s / 2), py(y + s / 2), lab, { cls: 'w-dm-t w-dm-halo', style: 'font-size:' + fsz.toFixed(1) + 'px;font-weight:700' }));
        }
        box.svg.append(g);
        if (horiz) { x += q * s; cw -= q * s; } else { y += q * s; chh -= q * s; }
      }
      if (upto < steps.n && cw > 0 && chh > 0) {
        box.svg.append(el('rect', { x: ox + x * sc, y: oy + y * sc, width: cw * sc, height: chh * sc, style: 'fill:none;stroke:var(--accent);stroke-width:2;stroke-dasharray:5 4' }));
        if (cw * sc > 50 && chh * sc > 18) box.svg.append(stext(ox + (x + cw / 2) * sc, oy + (y + chh / 2) * sc, num(Math.max(cw, chh)) + ' × ' + num(Math.min(cw, chh)), { cls: 'w-dm-t w-dm-halo', style: 'font-size:13px;fill:var(--accent);font-weight:700' }));
      }
    }
    // ---- the table
    function drawTable(upto) {
      const { R, S, T: Tt, Q, n } = steps;
      const sa = A < 0 ? -1 : 1, sb = B < 0 ? -1 : 1;
      let t;
      if (mode === 'gcd') {
        const rows = [];
        for (let i = 1; i <= n && i <= upto; i++) rows.push({ cls: hot === i ? 'hot' : '', cells: [String(i), { t: num(R[i - 1]) + ' = ' + num(Q[i]) + ' × ' + num(R[i]) + ' + ' + num(R[i + 1]), cls: 'l' }, num(Q[i]), { t: num(R[i + 1]), cls: R[i + 1] === 0 ? 'dim' : i === n - 1 ? 'set' : '' }] });
        t = table([T('step'), { t: T('division'), cls: 'l' }, T('quotient'), T('remainder')], rows);
      } else {
        const rows = [];
        for (let i = 0; i <= Math.min(n + 1, upto + 1); i++) {
          const last = R[i] !== 0 && (i === n || R[i + 1] === 0) && upto >= n;
          rows.push({ cls: hot === i ? 'hot' : '', cells: [String(i), { t: num(R[i]), cls: last ? 'set' : R[i] === 0 ? 'dim' : '' }, i >= 1 && i <= n && Q[i] !== undefined && i < upto + 1 && R[i] !== 0 ? num(Q[i]) : '', num(sa * S[i]), num(sb * Tt[i]),
            { t: '(' + num(sa * S[i]) + ')·' + (A < 0 ? '(' + num(A) + ')' : num(A)) + ' + (' + num(sb * Tt[i]) + ')·' + (B < 0 ? '(' + num(B) + ')' : num(B)) + ' = ' + num(R[i]), cls: 'l dim' }] });
        }
        t = table(['i', { tex: 'r_i' }, { tex: 'q_i' }, { tex: 's_i' }, { tex: 't_i' }, { t: T('check'), cls: 'l' }], rows);
      }
      t.addEventListener('pointerover', safe((ev) => {
        const tr = ev.target.closest && ev.target.closest('tbody tr');
        if (!tr) return;
        const i = Array.from(tr.parentNode.children).indexOf(tr) + (mode === 'gcd' ? 1 : 0);
        if (i !== hot) { hot = i; drawRect(pl.k); highlightRows(t); }
      }));
      t.addEventListener('pointerleave', () => { hot = -1; drawRect(pl.k); highlightRows(t); });
      tableHost.replaceChildren(t);
    }
    function highlightRows(t) {
      Array.from(t.tBodies[0].rows).forEach((tr, j) => tr.classList.toggle('hot', j + (mode === 'gcd' ? 1 : 0) === hot));
    }
    function show(k) {
      drawRect(k);
      drawTable(k);
      const { R, S, T: Tt, n } = steps;
      const g = R[n];
      const sa = A < 0 ? -1 : 1, sb = B < 0 ? -1 : 1;
      if (A === 0 && B === 0) { info.set(T('gcd(0, 0) is 0 by convention: every integer divides 0.')); return; }
      if (k === 0 && n > 0) {
        info.set(el('span', null, T('Start with a %s × %s rectangle. Each step cuts off as many squares as fit, the side being the shorter edge.', num(R[0]), num(R[1]))));
        return;
      }
      if (k < n) {
        const i = k;
        info.set(el('span', null, i === 1 ? T('Divide the larger number by the smaller:') : T('Divide the last divisor by the last remainder:'), ' ', MA.texEl(num(R[i - 1]) + ' = ' + steps.Q[i] + ' \\cdot ' + num(R[i]) + ' + ' + num(R[i + 1]))),
          el('span', { class: 'w-dm-hint', text: T('gcd(%s, %s) = gcd(%s, %s): a common divisor of two of these numbers divides the third.', num(R[i - 1]), num(R[i]), num(R[i]), num(R[i + 1])) }));
        return;
      }
      const parts = [el('span', null, MA.texEl('\\gcd(' + num(A).replace('−', '-') + ', ' + num(B).replace('−', '-') + ') = ' + g), ' ', el('span', { class: 'w-dm-hint', text: T('(the last non-zero remainder; the side of the smallest square)') }))];
      if (mode === 'extended') {
        const s = sa * S[n], t = sb * Tt[n];
        parts.push(el('span', null, T('Bézout:'), ' ', MA.texEl(g + ' = ' + (s < 0 ? '(' + s + ')' : s) + ' \\cdot ' + (A < 0 ? '(' + A + ')' : A) + ' + ' + (t < 0 ? '(' + t + ')' : t) + ' \\cdot ' + (B < 0 ? '(' + B + ')' : B))));
      }
      if (A && B) parts.push(MA.ui.kv('lcm =', num(Math.abs(A / g * B))));
      info.set(...parts);
    }
    MA.ui.text(bar, { label: 'a', value: String(A), width: 110, onChange: (v) => { try { A = check(C.int(v)); compute(); pl.end(); return null; } catch (e) { return e.message; } } });
    MA.ui.text(bar, { label: 'b', value: String(B), width: 110, onChange: (v) => { try { B = check(C.int(v)); compute(); pl.end(); return null; } catch (e) { return e.message; } } });
    const pl = player(bar, { count: () => steps.n + 1, show: safe(show, report), delay: 1.3 });
    compute();
    pl.end();
  });

  function crtWidget(stage, cfg) {
    let items = C.list(cfg.system);
    if (!items.length) items = ['2 mod 3', '3 mod 5', '2 mod 7'];
    let sys = items.map(parseCongruence);
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 200, { label: T('Congruences and their common solutions') });
    const tableHost = el('div', { class: 'w-dm-panel', style: 'padding-top:6px' });
    stage.append(tableHost);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    let plan = [];
    function solve() {
      // combine one congruence at a time: x ≡ c (mod M)
      plan = [];
      let c = mod(sys[0][0], sys[0][1]), M = sys[0][1];
      plan.push({ c, M, tex: ['x \\equiv ' + c + ' \\pmod{' + M + '}'], ok: true });
      for (let i = 1; i < sys.length; i++) {
        const [ai, mi] = sys[i];
        const g = gcd(M, mi);
        const rhs = mod(ai - c, mi);
        const kk = (c0) => (c0 === 1 ? 'k' : c0 + 'k');
        const tex = ['x = ' + c + ' + ' + M + 'k', c + ' + ' + M + 'k \\equiv ' + mod(ai, mi) + ' \\pmod{' + mi + '} \\;\\Rightarrow\\; ' + kk(mod(M, mi)) + ' \\equiv ' + rhs + ' \\pmod{' + mi + '}'];
        if (rhs % g !== 0) {
          tex.push('\\gcd(' + M + ', ' + mi + ') = ' + g + ' \\nmid ' + rhs);
          plan.push({ c, M, tex, ok: false, why: T('No solution: gcd(%d, %d) = %d does not divide %d, so the congruences contradict each other.', M, mi, g, rhs) });
          return;
        }
        const m2 = mi / g;
        const inv = invMod((M / g) % m2, m2);
        const k0 = m2 === 1 ? 0 : mod((rhs / g) * inv, m2);
        if (g > 1) tex.push('\\text{' + T('divide by') + ' } ' + g + ':\\; ' + kk(mod(M / g, m2)) + ' \\equiv ' + mod(rhs / g, m2) + ' \\pmod{' + m2 + '}');
        if (m2 > 1) tex.push('k \\equiv ' + k0 + ' \\pmod{' + m2 + '}' + (mod(M / g, m2) !== 1 ? '\\quad (' + mod(M / g, m2) + '^{-1} \\equiv ' + inv + ')' : ''));
        const nc = c + M * k0, nM = M / g * mi;
        tex.push('x = ' + c + ' + ' + M + '\\cdot ' + k0 + ' = ' + nc + ', \\quad x \\equiv ' + mod(nc, nM) + ' \\pmod{' + nM + '}');
        c = mod(nc, nM); M = nM;
        if (!Number.isSafeInteger(M) || M > 1e13) { plan.push({ c, M, tex, ok: false, why: T('The combined modulus is too large to show.') }); return; }
        plan.push({ c, M, tex, ok: true });
      }
    }
    function drawLanes(k) {
      const shown = sys.slice(0, k + 1);
      const last = plan[Math.min(k, plan.length - 1)];
      const total = plan[plan.length - 1].ok ? plan[plan.length - 1].M : sys.reduce((acc, [, m]) => lcm(acc, m), 1);
      const L = Math.max(2, Math.min(total, W > 500 ? 210 : 120));
      const left = W > 500 ? 128 : 96, pad = 12, laneH = 26;
      const H = pad * 2 + laneH * (shown.length + 1) + 24;
      box.size(W, H);
      box.svg.replaceChildren();
      const cw = (W - left - pad) / L;
      const X = (x) => left + (x + 0.5) * cw;
      const sols = [];
      if (last.ok) for (let x = last.c; x < L; x += last.M) sols.push(x);
      sols.forEach((x) => box.svg.append(el('rect', { x: X(x) - Math.max(cw, 6) / 2, y: pad - 4, width: Math.max(cw, 6), height: laneH * (shown.length + 1) + 6, rx: 3, style: 'fill:var(--accent-wash);stroke:var(--accent);stroke-width:1' })));
      shown.forEach(([a, m], i) => {
        const y = pad + i * laneH + laneH / 2;
        box.svg.append(stext(left - 10, y, '≡ ' + mod(a, m) + ' (mod ' + m + ')', { anchor: 'end', style: 'font-size:12.5px;fill:' + cat(i) }));
        box.svg.append(el('line', { x1: left, y1: y, x2: W - pad, y2: y, style: 'stroke:var(--grid);stroke-width:1' }));
        for (let x = mod(a, m); x < L; x += m) box.svg.append(el('circle', { cx: X(x), cy: y, r: Math.min(4.2, Math.max(1.6, cw * 0.42)), style: 'fill:' + cat(i) }));
      });
      const yA = pad + shown.length * laneH + laneH / 2;
      box.svg.append(stext(left - 10, yA, last.ok ? T('all %d', shown.length) : T('none'), { anchor: 'end', style: 'font-size:12.5px;font-weight:700;fill:var(--accent)' }));
      sols.forEach((x) => box.svg.append(el('circle', { cx: X(x), cy: yA, r: Math.min(5, Math.max(2.4, cw * 0.5)), style: 'fill:var(--accent)' })));
      // axis
      const yT = H - pad - 4;
      const step = MA.niceStep(L / 8);
      for (let x = 0; x < L; x += step) box.svg.append(stext(X(x), yT, String(x), { style: 'font-size:10.5px;fill:var(--ink-3)' }));
      if (total > L) box.svg.append(stext(W - pad, yT, '… ' + T('(showing 0–%d)', L - 1), { anchor: 'end', style: 'font-size:10.5px;fill:var(--ink-3)' }));
    }
    function show(k) {
      const step = plan[Math.min(k, plan.length - 1)];
      drawLanes(Math.min(k, sys.length - 1));
      const rows = [];
      for (let i = 0; i <= Math.min(k, plan.length - 1); i++) rows.push(el('div', { class: 'w-dm-nf' + (i === k ? '' : ' w-dm-hint') }, ...plan[i].tex.map((tx, j) => el('div', null, j === 0 && i ? el('span', { class: 'k', text: T('Add x ≡ %d (mod %d):', mod(sys[i][0], sys[i][1]), sys[i][1]) + ' ' }) : null, MA.texEl(tx)))));
      // the classical formula when the moduli are pairwise coprime and everything is shown
      const coprime = sys.every(([, m], i) => sys.every(([, m2], j) => j <= i || gcd(m, m2) === 1));
      if (k >= sys.length - 1 && coprime && plan[plan.length - 1].ok && sys.length > 1) {
        const M = sys.reduce((a, [, m]) => a * m, 1);
        let sum = 0;
        const trs = sys.map(([a, m]) => {
          const Mi = M / m, yi = invMod(Mi % m, m) || 0;
          const term = mod(a, m) * Mi * yi;
          sum += term;
          return [String(mod(a, m)), String(m), String(Mi), String(yi), num(term)];
        });
        rows.push(el('div', null, el('span', { class: 'k', text: T('Formula: with M = %d, Mᵢ = M/mᵢ and yᵢ = Mᵢ⁻¹ mod mᵢ, x ≡ Σ aᵢMᵢyᵢ.', M) })));
        rows.push(table([{ tex: 'a_i' }, { tex: 'm_i' }, { tex: 'M_i' }, { tex: 'y_i' }, { tex: 'a_iM_iy_i' }], trs.map((r) => r)));
        rows.push(el('div', null, MA.texEl('\\textstyle\\sum = ' + sum + ' \\equiv ' + mod(sum, M) + ' \\pmod{' + M + '}')));
      }
      tableHost.replaceChildren(...rows);
      if (!step.ok) { info.set(el('span', { class: 'w-dm-no', text: step.why })); return; }
      if (k >= sys.length - 1) info.set(el('span', null, T('Solution:'), ' ', MA.texEl('x \\equiv ' + step.c + ' \\pmod{' + step.M + '}')), el('span', null, T('i.e. x = %d + %dt; the shaded columns satisfy every congruence.', step.c, step.M)));
      else info.set(el('span', null, T('So far:'), ' ', MA.texEl('x \\equiv ' + step.c + ' \\pmod{' + step.M + '}')), el('span', { class: 'w-dm-hint', text: T('Shaded columns satisfy the congruences combined so far.') }));
    }
    MA.ui.text(bar, { label: T('System'), value: items.join('; '), width: 230, onChange: (v) => {
      try {
        const its = String(v).split(/[;,]/).map((q) => q.trim()).filter(Boolean);
        if (!its.length) throw new Error(T('enter congruences such as 2 mod 3; 3 mod 5'));
        if (its.length > 8) throw new Error(T('at most 8 congruences'));
        sys = its.map(parseCongruence); items = its; solve(); pl.end(); return null;
      } catch (e) { return e.message; }
    } });
    const pl = player(bar, { count: () => Math.max(1, plan.length), show: safe(show, report), delay: 1.6 });
    if (sys.length > 8) throw new Error(T('at most 8 congruences'));
    solve();
    pl.end();
  }

  // ================================================================== permutation
  /**
   * Parse a permutation: one-line "2 3 1 5 4" or cycles "(1 2 3)(4 5)" (a product of cycles is composed
   * right to left). Returns {map(n) -> Int32Array (1-based), max}.
   */
  function parsePerm(src) {
    const s = String(src).trim();
    const toInt = (q) => {
      if (!/^\d+$/.test(q)) throw new Error(T('“%s” is not a positive integer', q));
      const v = parseInt(q, 10);
      if (v < 1) throw new Error(T('entries start at 1 (got %s)', q));
      if (v > 40) throw new Error(T('entries up to 40 please'));
      return v;
    };
    if (!s || /^(e|id|identity|\(\s*\)|ε|ι)$/i.test(s)) return { max: 0, map: (n) => Int32Array.from({ length: n + 1 }, (_, i) => i) };
    if (s.includes('(')) {
      const rest = s.replace(/\(([^()]*)\)/g, '').replace(/[\s∘·*]/g, '');
      if (rest) throw new Error(T('unexpected “%s” in cycle notation', rest));
      const cycles = [...s.matchAll(/\(([^()]*)\)/g)].map((m) => {
        const body = m[1].trim();
        const parts = body.includes(',') || /\s/.test(body) ? body.split(/[\s,]+/).filter(Boolean) : body.split('');
        const c = parts.map(toInt);
        if (new Set(c).size !== c.length) throw new Error(T('the cycle (%s) repeats an entry', body));
        return c;
      });
      const max = Math.max(0, ...cycles.flat());
      return {
        max,
        map: (n) => {
          const out = new Int32Array(n + 1);
          for (let x = 1; x <= n; x++) {
            let y = x;
            for (let j = cycles.length - 1; j >= 0; j--) { const c = cycles[j], p = c.indexOf(y); if (p >= 0) y = c[(p + 1) % c.length]; }
            out[x] = y;
          }
          return out;
        },
      };
    }
    const vals = s.replace(/[[\]]/g, '').split(/[\s,]+/).filter(Boolean).map(toInt);
    const len = vals.length;
    const seen = new Set();
    vals.forEach((v) => {
      if (v > len) throw new Error(T('one-line notation lists σ(1), …, σ(n): %d is larger than n = %d', v, len));
      if (seen.has(v)) throw new Error(T('%d appears twice, so this is not a permutation', v));
      seen.add(v);
    });
    return { max: len, oneLine: true, map: (n) => { const out = Int32Array.from({ length: n + 1 }, (_, i) => i); vals.forEach((v, i) => { out[i + 1] = v; }); return out; } };
  }
  /** Cycles of a permutation (array of arrays, fixed points included as 1-cycles). */
  function permCycles(p, n) {
    const seen = new Uint8Array(n + 1), out = [];
    for (let i = 1; i <= n; i++) {
      if (seen[i]) continue;
      const c = [];
      for (let x = i; !seen[x]; x = p[x]) { seen[x] = 1; c.push(x); }
      out.push(c);
    }
    return out;
  }
  const cycleTeX = (cyc) => { const nt = cyc.filter((c) => c.length > 1); return nt.length ? nt.map((c) => '(' + c.join('\\,') + ')').join('') : '\\mathrm{id}'; };
  const cycleTxt = (cyc) => { const nt = cyc.filter((c) => c.length > 1); return nt.length ? nt.map((c) => '(' + c.join(' ') + ')').join('') : 'id'; };
  function permCompose(p, q, n) { const r = new Int32Array(n + 1); for (let i = 1; i <= n; i++) r[i] = p[q[i]]; return r; }   // p∘q: q first
  function permInverse(p, n) { const r = new Int32Array(n + 1); for (let i = 1; i <= n; i++) r[p[i]] = i; return r; }
  function permPower(p, k, n) { let r = Int32Array.from({ length: n + 1 }, (_, i) => i); for (let j = 0; j < k; j++) r = permCompose(p, r, n); return r; }

  MA.widget('permutation', (stage, cfg) => {
    style();
    if (!C.has(cfg.perm)) throw new Error(T('permutation needs perm, e.g. (1 2 3)(4 5) or 2 3 1 5 4'));
    let P1 = parsePerm(cfg.perm), P2 = C.has(cfg.second) ? parsePerm(cfg.second) : null;
    const nGiven = C.has(cfg.n) ? C.int(cfg.n) : null;
    if (nGiven !== null && (nGiven < 1 || nGiven > 30)) throw new Error(T('permutation: n must be between 1 and 30'));
    let n = 1;
    const degree = () => {
      const m = Math.max(P1.max, P2 ? P2.max : 0, 1);
      if (nGiven !== null && nGiven < m) throw new Error(T('n = %d is smaller than the largest entry %d', nGiven, m));
      if (P1.oneLine && nGiven === null && P2 && P2.max > P1.max) return m;
      return Math.min(30, nGiven !== null ? nGiven : m);
    };
    n = degree();
    let view = 's', k = 2;
    MA.ui.title(stage, cfg.title);
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 300, { label: T('Permutation arrow diagram and cycles') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    let hov = -1;
    const VIEWS = () => (P2 ? [['s', 'σ'], ['t', 'τ'], ['st', 'σ∘τ'], ['ts', 'τ∘σ'], ['inv', 'σ⁻¹'], ['pow', 'σᵏ']] : [['s', 'σ'], ['inv', 'σ⁻¹'], ['pow', 'σᵏ']]);
    const segHost = el('div', { style: 'display:contents' });
    bar.append(segHost);
    let seg = null;
    const sK = MA.ui.slider(bar, { label: 'k', min: 0, max: 12, step: 1, value: k, fmt: (v) => String(v), onInput: safe((v) => { k = v; draw(); }, report) });
    function buildSeg() {
      segHost.replaceChildren();
      if (!VIEWS().some((v) => v[0] === view)) view = 's';
      seg = MA.ui.seg(segHost, { options: VIEWS(), value: view, onChange: safe((v) => { view = v; draw(); }, report) });
    }
    MA.ui.text(bar, { label: '\\sigma', value: C.str(cfg.perm), width: 150, onChange: (v) => {
      try { const p = parsePerm(v); const old = P1; P1 = p; try { n = degree(); } catch (e) { P1 = old; throw e; } draw(); return null; } catch (e) { return e.message; }
    } });
    MA.ui.text(bar, { label: '\\tau', value: C.str(cfg.second), width: 120, onChange: (v) => {
      try { const p = v.trim() ? parsePerm(v) : null; const old = P2; P2 = p; try { n = degree(); } catch (e) { P2 = old; throw e; } buildSeg(); draw(); return null; } catch (e) { return e.message; }
    } });
    buildSeg();
    let geo = null;
    box.svg.addEventListener('pointermove', safe((ev) => {
      if (!geo) return;
      const [x, y] = box.pt(ev);
      let h = -1;
      if (Math.abs(y - geo.y0) <= geo.rr + 6) for (let i = 1; i <= n; i++) if (Math.abs(x - geo.xs(i)) <= geo.rr + 4) h = i;
      if (h !== hov) { hov = h; draw(); }
    }));
    box.svg.addEventListener('pointerleave', safe(() => { if (hov !== -1) { hov = -1; draw(); } }));
    const pal = (cyc) => { const m = new Map(); let j = 0; cyc.forEach((c) => { if (c.length > 1) { const col = cat(j++, 6); c.forEach((x) => m.set(x, col)); } }); return m; };
    function draw() {
      MA.tip.hide();
      const s = P1.map(n), t = P2 ? P2.map(n) : null;
      let shown, rows, label;
      if (view === 't' && t) { shown = t; rows = [t]; label = '\\tau'; }
      else if (view === 'st' && t) { shown = permCompose(s, t, n); rows = [t, s]; label = '\\sigma\\circ\\tau'; }
      else if (view === 'ts' && t) { shown = permCompose(t, s, n); rows = [s, t]; label = '\\tau\\circ\\sigma'; }
      else if (view === 'inv') { shown = permInverse(s, n); rows = [shown]; label = '\\sigma^{-1}'; }
      else if (view === 'pow') { shown = permPower(s, k, n); rows = [shown]; label = '\\sigma^{' + k + '}'; }
      else { shown = s; rows = [s]; label = '\\sigma'; }
      const cyc = permCycles(shown, n);
      const col = pal(cyc);
      const ordOf = (c) => c.reduce((acc, x) => lcm(acc, x.length), 1);
      const ord = ordOf(cyc);
      sK.el.style.display = view === 'pow' ? '' : 'none';
      const ordS = ordOf(permCycles(s, n));
      sK.input.max = Math.max(2, Math.min(60, 2 * ordS));
      if (k > +sK.input.max) { k = +sK.input.max; sK.set(k); }
      // ---- layout: arrow rows on top, cycle diagram below
      const pad = 22, rr = n > 20 ? 9 : n > 12 ? 11 : 13;
      const gapY = rows.length > 1 ? 74 : 92;
      const rowY = Array.from({ length: rows.length + 1 }, (_, j) => pad + rr + j * gapY);
      const xs = (i) => (n === 1 ? W / 2 : pad + 30 + (i - 1) * (W - 2 * pad - 60) / (n - 1));
      // cycle diagram packing
      const cycles = cyc;
      const items = cycles.map((c) => { const rad = c.length === 1 ? 0 : Math.max(22, c.length * (rr * 2 + 6) / (2 * Math.PI)); return { c, rad, w: 2 * rad + 2 * rr + 18 }; });
      const lines = [];
      let line = [], lw = 0;
      items.forEach((it) => { if (lw + it.w > W - 2 * pad && line.length) { lines.push(line); line = []; lw = 0; } line.push(it); lw += it.w; });
      if (line.length) lines.push(line);
      const top2 = rowY[rows.length] + rr + 36;
      let y = top2;
      const lineY = lines.map((ln) => { const h = 2 * Math.max(...ln.map((it) => it.rad)) + 2 * rr + 22; const cy = y + h / 2; y += h; return cy; });
      const H = Math.round(y + 6);
      box.size(W, H);
      box.svg.replaceChildren();
      const gA = el('g'), gN = el('g');
      box.svg.append(gA, gN);
      // the arrow rows: element i travels row by row
      const pathOf = (i) => { const ps = [i]; let x = i; rows.forEach((r) => { x = r[x]; ps.push(x); }); return ps; };
      for (let i = 1; i <= n; i++) {
        const ps = pathOf(i);
        const c = col.get(i) || 'var(--ink-3)';
        const fixed = shown[i] === i;
        for (let j = 0; j < rows.length; j++) {
          const x1 = xs(ps[j]), y1 = rowY[j] + rr + 2, x2 = xs(ps[j + 1]), y2 = rowY[j + 1] - rr - 3;
          const dx = x2 - x1, dy = y2 - y1;
          const op = hov < 0 || hov === i ? 1 : 0.15;
          gA.append(el('line', { x1, y1, x2: x2 - dx / Math.hypot(dx, dy) * 7, y2: y2 - dy / Math.hypot(dx, dy) * 7, style: 'stroke:' + c + ';stroke-width:' + (fixed ? 1.4 : 2.2) + ';opacity:' + op + (fixed ? ';stroke-dasharray:3 3' : '') }));
          gA.append(el('path', { d: arrowHead(x2, y2, dx, dy, 9, 7), style: 'fill:' + c + ';opacity:' + op }));
        }
      }
      rowY.forEach((yy, j) => {
        for (let i = 1; i <= n; i++) {
          const g = el('g', { class: 'w-dm-pnode', style: 'cursor:pointer' });
          g.append(el('circle', { cx: xs(i), cy: yy, r: rr, style: 'fill:var(--plot-bg);stroke:' + (j === 0 && hov === i ? 'var(--accent)' : 'var(--ink-2)') + ';stroke-width:' + (j === 0 && hov === i ? 2.6 : 1.5) }));
          g.append(stext(xs(i), yy + 0.5, String(i), { style: 'font-size:' + (rr > 11 ? 12.5 : 10.5) + 'px;font-weight:600;pointer-events:none' }));
          gN.append(g);
        }
      });
      // row labels (which map acts between rows)
      const names = view === 'st' ? ['\\tau', '\\sigma'] : view === 'ts' ? ['\\sigma', '\\tau'] : [label];
      names.forEach((nm, j) => {
        const fo = el('foreignObject', { x: 0, y: (rowY[j] + rowY[j + 1]) / 2 - 14, width: pad + 22, height: 28, style: 'overflow:visible' });
        const d = el('div', { style: { color: 'var(--ink-2)', fontSize: '15px', textAlign: 'right', lineHeight: '28px' } });
        MA.tex(d, nm);
        fo.append(d);
        box.svg.append(fo);
      });
      // cycle diagram
      box.svg.append(el('line', { x1: pad, y1: top2 - 18, x2: W - pad, y2: top2 - 18, style: 'stroke:var(--rule);stroke-width:1' }));
      const plain = label.replace(/\\circ/g, '∘').replace(/\\sigma/g, 'σ').replace(/\\tau/g, 'τ').replace(/\^\{-1\}/, '⁻¹').replace(/\^\{(\d+)\}/, (m0, d) => d.split('').map((q) => SUP[q]).join(''));
      box.svg.append(stext(pad, top2 - 6, T('cycles of %s', plain), { anchor: 'start', style: 'font-size:11.5px;fill:var(--ink-3)' }));
      geo = { y0: rowY[0], rr, xs };
      lines.forEach((ln, li) => {
        const tot = ln.reduce((a, it) => a + it.w, 0);
        let x = (W - tot) / 2;
        ln.forEach((it) => {
          const cx = x + it.w / 2, cy = lineY[li];
          x += it.w;
          const L = it.c.length;
          const c = col.get(it.c[0]) || 'var(--ink-3)';
          const pts = it.c.map((_, j) => [cx + it.rad * Math.cos(-Math.PI / 2 + 2 * Math.PI * j / L), cy + it.rad * Math.sin(-Math.PI / 2 + 2 * Math.PI * j / L)]);
          const dim = hov >= 0 && !it.c.includes(hov) ? 0.25 : 1;
          if (L === 1) {
            gA.append(el('path', { d: 'M' + (cx - 6) + ',' + (cy - rr + 1) + 'C' + (cx - 14) + ',' + (cy - rr - 18) + ' ' + (cx + 14) + ',' + (cy - rr - 18) + ' ' + (cx + 6) + ',' + (cy - rr + 1), style: 'fill:none;stroke:var(--ink-3);stroke-width:1.3;opacity:' + dim }));
          } else {
            for (let j = 0; j < L; j++) {
              const [x1, y1] = pts[j], [x2, y2] = pts[(j + 1) % L];
              const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
              let ox = mx - cx, oy = my - cy;
              const ol = Math.hypot(ox, oy) || 1;
              const bow = L === 2 ? 16 : it.rad * 0.25;
              if (L === 2) { ox = (j === 0 ? 1 : -1); oy = 0; } else { ox /= ol; oy /= ol; }
              const qx = mx + ox * bow, qy = my + oy * bow;
              const a0 = Math.atan2(qy - y1, qx - x1), a1 = Math.atan2(y2 - qy, x2 - qx);
              const sx = x1 + Math.cos(a0) * (rr + 1), sy = y1 + Math.sin(a0) * (rr + 1);
              const ex = x2 - Math.cos(a1) * (rr + 2), ey = y2 - Math.sin(a1) * (rr + 2);
              gA.append(el('path', { d: 'M' + sx.toFixed(1) + ',' + sy.toFixed(1) + 'Q' + qx.toFixed(1) + ',' + qy.toFixed(1) + ' ' + (ex - Math.cos(a1) * 6).toFixed(1) + ',' + (ey - Math.sin(a1) * 6).toFixed(1), style: 'fill:none;stroke:' + c + ';stroke-width:2;opacity:' + dim }));
              gA.append(el('path', { d: arrowHead(ex, ey, Math.cos(a1), Math.sin(a1), 8.5, 7), style: 'fill:' + c + ';opacity:' + dim }));
            }
          }
          it.c.forEach((v, j) => {
            const [px, py] = L === 1 ? [cx, cy] : pts[j];
            gN.append(el('circle', { cx: px, cy: py, r: rr, style: 'fill:' + (L > 1 ? tint(c, 22) : 'var(--plot-bg)') + ';stroke:' + (L > 1 ? c : 'var(--ink-3)') + ';stroke-width:1.6;opacity:' + dim }));
            gN.append(stext(px, py + 0.5, String(v), { style: 'font-size:' + (rr > 11 ? 12.5 : 10.5) + 'px;font-weight:600;opacity:' + dim }));
          });
        });
      });
      // ---- read-outs
      const nt = cyc.filter((c) => c.length > 1);
      const trans = nt.reduce((a, c) => a + c.length - 1, 0);
      let inv = 0;
      for (let i = 1; i <= n; i++) for (let j = i + 1; j <= n; j++) if (shown[i] > shown[j]) inv++;
      const sign = trans % 2 ? -1 : 1;
      const twoLine = '\\begin{pmatrix}' + Array.from({ length: n }, (_, i) => i + 1).join(' & ') + '\\\\ ' + Array.from({ length: n }, (_, i) => shown[i + 1]).join(' & ') + '\\end{pmatrix}';
      const parts = [el('span', null, MA.texEl(label + ' = ' + cycleTeX(cyc) + (n <= 12 ? ' = ' + twoLine : '')))];
      if (view === 'st' || view === 'ts') parts.push(el('span', { class: 'w-dm-hint', text: T('Composition is read right to left: (σ∘τ)(i) = σ(τ(i)), so the right-hand permutation acts first (top arrows).') }));
      parts.push(MA.ui.kv(T('order'), nt.length > 1 ? 'lcm(' + nt.map((c) => c.length).join(', ') + ') = ' + ord : String(ord)));
      parts.push(el('span', null, el('span', { class: 'k', text: T('sign') + ' ' }), MA.texEl((nt.length ? '(-1)^{' + nt.map((c) => '(' + c.length + '-1)').join('+') + '}' : '(-1)^0') + ' = ' + (sign < 0 ? '-1' : '+1')), ' ',
        el('b', { text: sign < 0 ? T('odd') : T('even') }), ' ', el('span', { class: 'w-dm-hint', text: T('(%d transpositions; %d inversions, same parity)', trans, inv) })));
      if (view === 'st' || view === 'ts') {
        const a = permCompose(s, t, n), b = permCompose(t, s, n);
        const same = a.every((v, i) => v === b[i]);
        parts.push(same ? el('span', { class: 'w-dm-ok', text: T('σ and τ commute: σ∘τ = τ∘σ') }) : el('span', null, el('span', { class: 'w-dm-no', text: T('Order matters:') }), ' ', MA.texEl('\\sigma\\circ\\tau = ' + cycleTeX(permCycles(a, n)) + ' \\ne ' + cycleTeX(permCycles(b, n)) + ' = \\tau\\circ\\sigma')));
      }
      if (view === 'pow') parts.push(el('span', { class: 'w-dm-hint', text: k % ordS === 0 ? T('k is a multiple of ord(σ) = %d, so σᵏ is the identity.', ordS) : T('σᵏ depends only on k mod ord(σ) = %d.', ordS) }));
      if (hov > 0) parts.push(el('span', { class: 'w-dm-hint', text: T('%d → %s', hov, pathOf(hov).slice(1).join(' → ')) }));
      info.set(...parts);
    }
    draw();
  });

  // ================================================================== cayley
  const SUPD = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };
  const supStr = (k) => String(k).split('').map((d) => (d === '-' ? '⁻' : SUP[d] || d)).join('');
  /** A finite group from a list of elements {key, name, tex} and a product on elements returning a key. */
  function groupFrom(name, tex, els, prod) {
    const N = els.length;
    const idx = new Map(els.map((e, i) => [e.key, i]));
    const mul = new Int16Array(N * N);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const k = idx.get(prod(els[i], els[j]));
      if (k === undefined) throw new Error('group table is not closed');
      mul[i * N + j] = k;
    }
    let id = 0;
    for (let i = 0; i < N; i++) { let ok = true; for (let j = 0; j < N && ok; j++) ok = mul[i * N + j] === j; if (ok) { id = i; break; } }
    const inv = new Int16Array(N), ord = new Int16Array(N);
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) if (mul[i * N + j] === id) { inv[i] = j; break; }
      let x = i, k = 1;
      while (x !== id && k <= N) { x = mul[x * N + i]; k++; }
      ord[i] = k;
    }
    const G = { name, tex, els, N, mul, id, inv, ord, idx };
    G.m = (a, b) => mul[a * N + b];
    G.pow = (g, e) => { let r = id; const b = e < 0 ? inv[g] : g; for (let k = 0; k < Math.abs(e) % Math.max(1, ord[g] || N); k++) r = G.m(r, b); return r; };
    G.index = (key) => { const i = idx.get(key); if (i === undefined) throw new Error('not an element'); return i; };
    return G;
  }
  function makeZ(n) {
    const els = Array.from({ length: n }, (_, k) => ({ key: k, name: String(k), tex: String(k) }));
    const G = groupFrom('ℤ' + n, '\\mathbb{Z}_{' + n + '}', els, (a, b) => (a.key + b.key) % n);
    G.op = '+';
    G.parse = (s) => { const t = s.replace(/\s/g, '').replace(/−/g, '-'); if (!/^[+-]?\d+$/.test(t)) throw new Error(T('elements of ℤ%d are integers 0 … %d', n, n - 1)); return G.index(mod(parseInt(t, 10), n)); };
    G.defGens = n > 1 ? [G.index(1)] : [];
    return G;
  }
  function makeU(n) {
    const units = [];
    for (let k = 1; k < n; k++) if (gcd(k, n) === 1) units.push(k);
    if (n === 2) units.splice(0, units.length, 1);
    const els = units.map((k) => ({ key: k, name: String(k), tex: String(k) }));
    const G = groupFrom('U(' + n + ')', 'U(' + n + ')', els, (a, b) => (a.key * b.key) % n);
    G.op = '·';
    G.parse = (s) => {
      const t = s.replace(/\s/g, '').replace(/−/g, '-');
      if (!/^[+-]?\d+$/.test(t)) throw new Error(T('elements of U(%d) are the units mod %d', n, n));
      const v = mod(parseInt(t, 10), n);
      if (gcd(v, n) !== 1) throw new Error(T('%d is not a unit mod %d', v, n));
      return G.index(n === 2 ? 1 : v);
    };
    G.defGens = minimalGens(G);
    return G;
  }
  function makeD(n) {
    const els = [];
    const nm = (k, f) => (k === 0 ? (f ? 's' : 'e') : (k === 1 ? 'r' : 'r' + supStr(k)) + (f ? 's' : ''));
    const tx = (k, f) => (k === 0 ? (f ? 's' : 'e') : (k === 1 ? 'r' : 'r^{' + k + '}') + (f ? 's' : ''));
    for (let f = 0; f < 2; f++) for (let k = 0; k < n; k++) els.push({ key: 2 * k + f, k, f, name: nm(k, f), tex: tx(k, f) });
    const G = groupFrom('D' + n, 'D_{' + n + '}', els, (a, b) => 2 * mod(a.k + (a.f ? -b.k : b.k), n) + (a.f ^ b.f));
    G.op = '·';
    const R = G.index(n > 1 ? 2 : 0), S = G.index(1);
    G.parse = wordParser(G, { r: R, s: S, e: G.id, 1: G.id }, T('write elements of D%d as words in r and s, e.g. r^2 s', n));
    G.defGens = n > 1 ? [R, S] : [S];
    G.rot = R; G.ref = S;
    return G;
  }
  /** Parse words like "r^2 s", "sr", "r^-1", "r²s" (product left to right). */
  function wordParser(G, letters, help) {
    return (s) => {
      const t = s.replace(/[\s·*]/g, '');
      if (!t) throw new Error(help);
      let i = 0, acc = G.id;
      while (i < t.length) {
        const c = t[i];
        if (letters[c] === undefined) throw new Error(help);
        i++;
        let e = 1, m;
        const rest = t.slice(i);
        if ((m = /^\^\{?([−-]?\d+)\}?/.exec(rest))) { e = parseInt(m[1].replace('−', '-'), 10); i += m[0].length; }
        else if ((m = /^⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/.exec(rest))) { e = parseInt(m[0].split('').map((q) => SUPD[q]).join(''), 10); i += m[0].length; }
        else if (c !== '1' && (m = /^\d+/.exec(rest))) { e = parseInt(m[0], 10); i += m[0].length; }
        acc = G.m(acc, G.pow(letters[c], e));
      }
      return acc;
    };
  }
  function permsOf(n) {
    const out = [];
    const a = Array.from({ length: n }, (_, i) => i + 1);
    const rec = (k) => { if (k === n) { out.push(a.slice()); return; } for (let i = k; i < n; i++) { [a[k], a[i]] = [a[i], a[k]]; rec(k + 1); [a[k], a[i]] = [a[i], a[k]]; } };
    rec(0);
    return out;
  }
  function makeS(n, alt) {
    let ps = permsOf(n).map((v) => { const p = Int32Array.from([0].concat(v)); return { p, cyc: permCycles(p, n) }; });
    if (alt) ps = ps.filter((q) => q.cyc.reduce((acc, c) => acc + c.length - 1, 0) % 2 === 0);
    const typeKey = (q) => { const nt = q.cyc.filter((c) => c.length > 1); return [nt.reduce((a, c) => a + c.length, 0), nt.map((c) => c.length).sort((x, y) => y - x).join('.')]; };
    ps.sort((x, y) => { const a = typeKey(x), b = typeKey(y); return a[0] - b[0] || (a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0) || (x.p.join() < y.p.join() ? -1 : 1); });
    const els = ps.map((q) => {
      const nt = q.cyc.filter((c) => c.length > 1);
      return { key: Array.from(q.p).slice(1).join(','), p: q.p, name: nt.length ? nt.map((c) => '(' + c.join(n > 9 ? ' ' : '') + ')').join('') : 'e', tex: nt.length ? nt.map((c) => '(' + c.join('\\,') + ')').join('') : 'e' };
    });
    const G = groupFrom((alt ? 'A' : 'S') + n, (alt ? 'A_{' : 'S_{') + n + '}', els, (a, b) => { const r = []; for (let i = 1; i <= n; i++) r.push(a.p[b.p[i]]); return r.join(','); });
    G.op = '∘';
    G.parse = (s) => {
      const P = parsePerm(s);
      if (P.max > n) throw new Error(T('entries of S%d are 1 … %d', n, n));
      const p = P.map(n);
      const key = Array.from(p).slice(1).join(',');
      if (!G.idx.has(key)) throw new Error(T('%s is an odd permutation, not in A%d', s, n));
      return G.idx.get(key);
    };
    const cand = alt ? (n >= 3 ? ['(1 2 3)', n % 2 ? '(' + Array.from({ length: n }, (_, i) => i + 1).join(' ') + ')' : '(' + Array.from({ length: n - 1 }, (_, i) => i + 2).join(' ') + ')'] : [])
      : (n >= 2 ? ['(1 2)', '(' + Array.from({ length: n }, (_, i) => i + 1).join(' ') + ')'] : []);
    G.defGens = [...new Set(cand.map((c) => { try { return G.parse(c); } catch (e) { return G.id; } }))].filter((g) => g !== G.id);
    if (subgroup(G, G.defGens).length !== G.N) G.defGens = minimalGens(G);
    return G;
  }
  function makeQ8() {
    const U = ['1', 'i', 'j', 'k'];
    // unit products [sign, unit]
    const QT = [[[0, 0], [0, 1], [0, 2], [0, 3]], [[0, 1], [1, 0], [0, 3], [1, 2]], [[0, 2], [1, 3], [1, 0], [0, 1]], [[0, 3], [0, 2], [1, 1], [1, 0]]];
    const els = [];
    for (let u = 0; u < 4; u++) for (let sg = 0; sg < 2; sg++) els.push({ key: sg * 4 + u, sg, u, name: (sg ? '−' : '') + U[u], tex: (sg ? '-' : '') + U[u] });
    const G = groupFrom('Q8', 'Q_8', els, (a, b) => { const [s2, u] = QT[a.u][b.u]; return ((a.sg ^ b.sg ^ s2) * 4) + u; });
    G.op = '·';
    G.parse = (s) => {
      let t = s.replace(/\s/g, '');
      let sg = 0;
      while (/^[+−-]/.test(t)) { if (t[0] !== '+') sg ^= 1; t = t.slice(1); }
      if (!/^[1ijk]+$/.test(t)) throw new Error(T('elements of Q8 are ±1, ±i, ±j, ±k'));
      let acc = G.index(sg * 4);
      for (const c of t) acc = G.m(acc, G.index(U.indexOf(c)));
      return acc;
    };
    G.defGens = [G.index(1), G.index(2)];
    return G;
  }
  function makeV4() {
    const els = ['e', 'a', 'b', 'c'].map((nm, k) => ({ key: k, name: nm, tex: nm }));
    const G = groupFrom('V4', 'V_4', els, (a, b) => a.key ^ b.key);
    G.op = '·';
    G.parse = wordParser(G, { e: 0, a: 1, b: 2, c: 3, 1: 0 }, T('elements of V4 are e, a, b, c'));
    G.defGens = [1, 2];
    return G;
  }
  /** Subgroup generated by element indices (sorted by position in the group). */
  function subgroup(G, gens) {
    const inH = new Uint8Array(G.N);
    inH[G.id] = 1;
    const q = [G.id];
    for (let h = 0; h < q.length; h++) for (const g of gens) { const x = G.m(q[h], g); if (!inH[x]) { inH[x] = 1; q.push(x); } }
    return Array.from({ length: G.N }, (_, i) => i).filter((i) => inH[i]);
  }
  /** Small generating set: greedily add an element of largest order not yet generated. */
  function minimalGens(G) {
    const gens = [];
    let H = subgroup(G, gens);
    const byOrd = Array.from({ length: G.N }, (_, i) => i).sort((a, b) => G.ord[b] - G.ord[a] || a - b);
    while (H.length < G.N) {
      const g = byOrd.find((x) => !H.includes(x));
      gens.push(g);
      H = subgroup(G, gens);
    }
    return gens;
  }
  function buildGroup(kind, n) {
    switch (kind) {
      case 'Z': if (n < 1 || n > 30) throw new Error(T('ℤn: n from 1 to 30')); return makeZ(n);
      case 'U': if (n < 2 || n > 99 || phi(n) > 40) throw new Error(T('U(n): n from 2 to 99 with at most 40 units')); return makeU(n);
      case 'D': if (n < 1 || n > 16) throw new Error(T('Dn: n from 1 to 16')); return makeD(n);
      case 'S': if (n < 1 || n > 5) throw new Error(T('Sn: n from 1 to 5')); return makeS(n, false);
      case 'A': if (n < 1 || n > 5) throw new Error(T('An: n from 1 to 5')); return makeS(n, true);
      case 'Q8': return makeQ8();
      case 'V4': return makeV4();
      default: throw new Error(T('cayley: group must be Z, U, D, S, A, Q8 or V4'));
    }
  }
  const GKIND = { z: 'Z', zn: 'Z', u: 'U', un: 'U', d: 'D', dn: 'D', dihedral: 'D', s: 'S', sn: 'S', symmetric: 'S', a: 'A', an: 'A', alternating: 'A', q8: 'Q8', q: 'Q8', quaternion: 'Q8', v4: 'V4', v: 'V4', klein: 'V4' };

  MA.widget('cayley', (stage, cfg) => {
    style();
    let kind = GKIND[C.str(cfg.group, 'D').toLowerCase()];
    if (!kind) throw new Error(T('cayley: group must be Z, U, D, S, A, Q8 or V4'));
    let n = C.int(cfg.n, kind === 'S' || kind === 'A' ? 3 : 4);
    if (!C.has(cfg.n) && (kind === 'S' || kind === 'A')) n = kind === 'S' ? 3 : 4;
    let G = buildGroup(kind, n);
    let mode = C.str(cfg.mode, 'table').toLowerCase() === 'graph' ? 'graph' : 'table';
    let hlSrc = C.list(cfg.highlight).join('; ');
    let genSrc = C.list(cfg.generators).join('; ');
    const parseList = (src) => String(src).split(/[;,](?![^()]*\))/).map((q) => q.trim()).filter(Boolean).map((q) => { try { return G.parse(q); } catch (e) { throw new Error(T('“%s”: %s', q, e.message)); } });
    let hl = parseList(hlSrc), gens = genSrc ? parseList(genSrc) : G.defGens.slice();
    let byCosets = true;
    MA.ui.title(stage, cfg.title);
    const host = el('div');
    stage.append(host);
    const legendHost = el('div');
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    stage.append(panel);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    const W = viewWidth(stage, 640, 440);
    const sKind = MA.ui.select(bar, { label: T('Group'), value: kind, options: [['Z', 'ℤₙ'], ['U', 'U(n)'], ['D', 'Dₙ'], ['S', 'Sₙ'], ['A', 'Aₙ'], ['Q8', 'Q₈'], ['V4', 'V₄']], onChange: safe((v) => {
      kind = v;
      const lim = { Z: [1, 30], U: [2, 60], D: [1, 16], S: [1, 5], A: [1, 5] }[kind];
      if (lim) { n = Math.max(lim[0], Math.min(lim[1], kind === 'S' || kind === 'A' ? Math.min(n, 4) : n)); sN.input.min = lim[0]; sN.input.max = lim[1]; sN.set(n); }
      regroup();
    }, report) });
    const sN = MA.ui.slider(bar, { label: 'n', min: 1, max: 30, step: 1, value: n, fmt: (v) => String(v), onInput: safe((v) => { n = v; regroup(); }, report) });
    MA.ui.seg(bar, { options: [['table', T('Table')], ['graph', T('Graph')]], value: mode, onChange: safe((v) => { mode = v; draw(); }, report) });
    const tH = MA.ui.text(bar2, { label: T('Subgroup ⟨…⟩'), value: hlSrc, width: 130, onChange: (v) => { try { hl = parseList(v); hlSrc = v; draw(); return null; } catch (e) { return e.message; } } });
    const tG = MA.ui.text(bar2, { label: T('Generators'), value: genSrc || G.defGens.map((g) => G.els[g].name).join('; '), width: 130, onChange: (v) => { try { gens = v.trim() ? parseList(v) : G.defGens.slice(); genSrc = v; draw(); return null; } catch (e) { return e.message; } } });
    const tCos = MA.ui.toggle(bar2, { label: T('Sort by cosets'), value: byCosets, onChange: safe((v) => { byCosets = v; draw(); }, report) });
    function syncN() {
      const lim = { Z: [1, 30], U: [2, 60], D: [1, 16], S: [1, 5], A: [1, 5] }[kind];
      sN.el.style.display = lim ? '' : 'none';
      if (lim) { sN.input.min = lim[0]; sN.input.max = lim[1]; sN.set(n); }
    }
    function regroup() {
      let g2;
      try { g2 = buildGroup(kind, n); } catch (e) { report(e.message); return; }
      G = g2;
      // keep the typed subgroup / generators if they still make sense
      try { hl = parseList(hlSrc); } catch (e) { hl = []; hlSrc = ''; tH.input.value = ''; }
      try { gens = genSrc ? parseList(genSrc) : G.defGens.slice(); } catch (e) { gens = G.defGens.slice(); genSrc = ''; }
      if (!genSrc) tG.input.value = G.defGens.map((g) => G.els[g].name).join('; ');
      syncN();
      draw();
    }
    void sKind;
    function cosetData() {
      const H = subgroup(G, hl);
      const cos = new Int16Array(G.N).fill(-1), reps = [], lists = [];
      for (let g = 0; g < G.N; g++) {
        if (cos[g] >= 0) continue;
        const c = reps.length;
        reps.push(g);
        lists.push(H.map((h) => G.m(g, h)));
        lists[c].forEach((x) => { cos[x] = c; });
      }
      let normal = true, witness = -1;
      for (let g = 0; g < G.N && normal; g++) {
        const L = new Set(H.map((h) => G.m(g, h))), Rr = H.map((h) => G.m(h, g));
        if (!Rr.every((x) => L.has(x))) { normal = false; witness = g; }
      }
      return { H, cos, reps, lists, normal, witness };
    }
    const setTeX = (ids) => '\\{' + ids.map((i) => G.els[i].tex).join(', ') + '\\}';
    function describe(cd) {
      const parts = [];
      const nm = (i) => G.els[i].tex;
      parts.push(el('span', null, MA.texEl(G.tex), ' ', T('has order %d.', G.N), ' ', el('span', { class: 'w-dm-hint', text: G.op === '∘' ? T('Entry in row a, column b is a ∘ b (apply b first).') : G.op === '+' ? T('Entry in row a, column b is a + b.') : T('Entry in row a, column b is a · b.') })));
      if (hl.length) {
        const { H, reps, lists, normal, witness } = cd;
        parts.push(el('span', null, MA.texEl('H = \\langle ' + hl.map(nm).join(', ') + '\\rangle = ' + (H.length <= 12 ? setTeX(H) : '\\{\\ldots\\}')), ' ', T('has order %d and index %d (Lagrange: %d = %d × %d).', H.length, reps.length, G.N, H.length, reps.length)));
        if (reps.length <= 8 && G.N <= 24) parts.push(el('span', null, T('Left cosets:'), ' ', MA.texEl(lists.map((l, c) => (reps[c] === G.id ? 'H' : nm(reps[c]) + 'H') + (H.length <= 4 ? ' = ' + setTeX(l) : '')).join(',\\; '))));
        if (normal) parts.push(el('span', null, el('span', { class: 'w-dm-ok', text: T('H is normal') }), ' ', mode === 'table' ? T('(gH = Hg for every g): the coloured blocks of the table form the table of G/H.') : T('(gH = Hg for every g), so the cosets form the quotient group G/H.')));
        else {
          const g = witness, L = H.map((h) => G.m(g, h)), Rr = H.map((h) => G.m(h, g));
          parts.push(el('span', null, el('span', { class: 'w-dm-no', text: T('H is not normal:') }), ' ', MA.texEl(nm(g) + 'H = ' + setTeX(L) + ' \\ne ' + setTeX(Rr) + ' = H' + nm(g)), ' ', T('— so the blocks are not uniform.')));
        }
      } else parts.push(el('span', { class: 'w-dm-hint', text: T('Type generators of a subgroup (e.g. %s) to colour its cosets.', G.defGens.length ? G.els[G.defGens[0]].name : 'e') }));
      return parts;
    }
    function draw() {
      MA.tip.hide();
      tCos.el.style.display = mode === 'table' && hl.length ? '' : 'none';
      tG.el.style.display = mode === 'graph' ? '' : 'none';
      const cd = cosetData();
      host.replaceChildren();
      legendHost.replaceChildren();
      if (mode === 'table') drawTable(cd); else drawGraph(cd);
      info.set(...describe(cd));
    }
    function drawTable(cd) {
      const N = G.N;
      let order = Array.from({ length: N }, (_, i) => i);
      if (hl.length && byCosets) order = cd.lists.flat();
      const colourOf = (x) => (hl.length ? (cd.cos[x] === 0 ? 'var(--accent)' : cat(cd.cos[x] - 1, Math.max(6, cd.reps.length - 1))) : cat(x, N));
      const maxName = Math.max(...G.els.map((e) => e.name.length));
      const pad = 8;
      const hw = N > 40 ? 8 : Math.min(110, Math.max(28, maxName * 7.2 + 12));
      const cs = Math.max(4, Math.min(42, (W - 2 * pad - hw) / N));
      const fs = Math.min(13, cs * 0.5, (cs - 3) / (maxName * 0.6));
      const showText = fs >= 7.5;
      const rotate = !showText || maxName * 7 > cs;
      const hh = N > 40 ? 22 : rotate ? Math.min(110, maxName * 6.6 + 12) : 26;
      const H = Math.round(pad * 2 + hh + cs * N);
      const x0 = pad + hw + Math.max(0, (W - 2 * pad - hw - cs * N) / 2), y0 = pad + hh;
      const hfs = Math.min(12, Math.max(7, cs * 0.8));
      if (N <= 40) {
        const box = svgBox(host, W, H, { label: T('Cayley table of %s', G.name) });
        const svg = box.svg;
        const inH = new Set(cd.H);
        order.forEach((g, j) => {
          const x = x0 + j * cs + cs / 2;
          const hot = hl.length && inH.has(g);
          svg.append(rotate ? el('text', { x, y: y0 - 6, transform: 'rotate(-90 ' + x + ' ' + (y0 - 6) + ')', 'dominant-baseline': 'central', class: 'w-dm-t', style: 'font-size:' + hfs + 'px;font-weight:' + (hot ? 800 : 600) + ';fill:' + (hot ? 'var(--accent)' : 'var(--ink-2)'), text: G.els[g].name })
            : stext(x, y0 - 12, G.els[g].name, { style: 'font-size:' + hfs + 'px;font-weight:' + (hot ? 800 : 600) + ';fill:' + (hot ? 'var(--accent)' : 'var(--ink-2)') }));
          svg.append(stext(x0 - 8, y0 + j * cs + cs / 2, G.els[g].name, { anchor: 'end', style: 'font-size:' + hfs + 'px;font-weight:' + (hot ? 800 : 600) + ';fill:' + (hot ? 'var(--accent)' : 'var(--ink-2)') }));
        });
        svg.append(stext(x0 - 8, y0 - 12, G.op, { anchor: 'end', style: 'font-size:14px;font-weight:700;fill:var(--ink-2)' }));
        order.forEach((a, i) => order.forEach((b, j) => {
          const p = G.m(a, b), col = colourOf(p);
          const r = el('rect', { x: x0 + j * cs + 0.5, y: y0 + i * cs + 0.5, width: cs - 1, height: cs - 1, rx: Math.min(3, cs / 6), style: 'fill:' + tint(col, p === G.id && !hl.length ? 60 : 38) + ';stroke:' + (p === G.id ? 'var(--ink)' : 'none') + ';stroke-width:1.2' });
          r.dataset.a = a; r.dataset.b = b;
          svg.append(r);
          if (showText) svg.append(stext(x0 + j * cs + cs / 2, y0 + i * cs + cs / 2 + 0.5, G.els[p].name, { style: 'pointer-events:none;font-size:' + fs.toFixed(1) + 'px;font-weight:' + (p === G.id ? 800 : 500) }));
        }));
        // outline the coset blocks when sorted
        if (hl.length && byCosets) {
          const k = cd.H.length;
          for (let c = 0; c <= cd.reps.length; c++) {
            svg.append(el('line', { x1: x0, y1: y0 + c * k * cs, x2: x0 + N * cs, y2: y0 + c * k * cs, style: 'stroke:var(--ink-2);stroke-width:' + (c % cd.reps.length ? 1.6 : 1) }));
            svg.append(el('line', { x1: x0 + c * k * cs, y1: y0, x2: x0 + c * k * cs, y2: y0 + N * cs, style: 'stroke:var(--ink-2);stroke-width:' + (c % cd.reps.length ? 1.6 : 1) }));
          }
        }
        svg.addEventListener('pointermove', safe((ev) => {
          const t = ev.target;
          if (!t.dataset || t.dataset.a === undefined) { MA.tip.hide(); return; }
          const a = +t.dataset.a, b = +t.dataset.b, p = G.m(a, b);
          MA.tip.show(G.els[a].name + ' ' + G.op + ' ' + G.els[b].name + ' = ' + G.els[p].name + (hl.length ? '  (' + (cd.cos[p] === 0 ? 'H' : G.els[cd.reps[cd.cos[p]]].name + 'H') + ')' : ''), ev.clientX, ev.clientY);
        }));
        svg.addEventListener('pointerleave', () => MA.tip.hide());
      } else {
        // large groups: colour only, on a canvas
        const wrap = el('div', { class: 'w-plot' });
        const cv = el('canvas', { role: 'img', 'aria-label': T('Cayley table of %s', G.name) });
        wrap.append(cv);
        host.append(wrap);
        const col = resolver(host);
        const paint = () => {
          const css = wrap.clientWidth || W, dpr = window.devicePixelRatio || 1, sc = css / W;
          cv.width = Math.round(css * dpr); cv.height = Math.round(H * sc * dpr);
          cv.style.height = (H * sc) + 'px';
          const ctx = cv.getContext('2d');
          ctx.scale(sc * dpr, sc * dpr);
          ctx.fillStyle = col('var(--plot-bg)'); ctx.fillRect(0, 0, W, H);
          const cache = new Map();
          order.forEach((a, i) => order.forEach((b, j) => {
            const p = G.m(a, b), c = colourOf(p);
            if (!cache.has(c)) cache.set(c, col(tint(c, 55)));
            ctx.fillStyle = p === G.id ? col('var(--ink)') : cache.get(c);
            ctx.fillRect(x0 + j * cs, y0 + i * cs, cs - (cs > 3 ? 0.5 : 0), cs - (cs > 3 ? 0.5 : 0));
          }));
          ctx.fillStyle = col('var(--ink-3)');
          ctx.font = '11px ' + (MA.cssVar('--font') || 'sans-serif');
          ctx.fillText(T('%d × %d products; hover for details', N, N), x0, y0 - 10);
        };
        paint();
        cv.addEventListener('pointermove', safe((ev) => {
          const r = cv.getBoundingClientRect(), sc = r.width / W;
          const j = Math.floor(((ev.clientX - r.left) / sc - x0) / cs), i = Math.floor(((ev.clientY - r.top) / sc - y0) / cs);
          if (i < 0 || j < 0 || i >= N || j >= N) { MA.tip.hide(); return; }
          const a = order[i], b = order[j], p = G.m(a, b);
          MA.tip.show(G.els[a].name + ' ' + G.op + ' ' + G.els[b].name + ' = ' + G.els[p].name, ev.clientX, ev.clientY);
        }));
        cv.addEventListener('pointerleave', () => MA.tip.hide());
        const onTheme = safe(() => { if (!cv.isConnected) { window.removeEventListener('ma:theme', onTheme); return; } col.reset(); paint(); });
        window.addEventListener('ma:theme', onTheme);
      }
      panel.replaceChildren(el('div', { class: 'w-dm-hint', text: hl.length ? T('Colours show which left coset of H each product lies in (H itself in purple); the identity is outlined.') : T('Each element has its own colour: every row and column contains each element exactly once (a Latin square).') }));
    }
    function drawGraph(cd) {
      const N = G.N;
      if (N > 48) { host.append(el('div', { class: 'widget-msg', text: T('Cayley graphs are drawn for groups of order at most 48.') })); panel.replaceChildren(); return; }
      const gl = [...new Set(gens)].filter((g) => g !== G.id);
      if (!gl.length) { host.append(el('div', { class: 'widget-msg', text: T('Choose at least one generator other than the identity.') })); panel.replaceChildren(); return; }
      const nodes = G.els.map((e) => ({ name: e.name, pos: null }));
      const edges = [], ecol = [];
      gl.forEach((x, j) => {
        const inv = G.ord[x] === 2;
        for (let g = 0; g < N; g++) {
          const h = G.m(g, x);
          if (inv && h < g) continue;
          edges.push({ u: g, v: h, w: null, dir: !inv });
          ecol.push(cat(j));
        }
      });
      // layout: cosets of <a> for the generator a of largest order, as one or two concentric circles
      const a = gl.slice().sort((p, q) => G.ord[q] - G.ord[p])[0];
      const A = subgroup(G, [a]);
      const m = A.length, k = N / m;
      if (k <= 2 && m >= 3) {
        const other = gl.find((x) => !A.includes(x));
        const pos = new Array(N);
        for (let t = 0; t < m; t++) {
          const g = G.pow(a, t), ang = Math.PI / 2 - 2 * Math.PI * t / m;
          pos[g] = [Math.cos(ang), Math.sin(ang)];
          if (k === 2) { const h = G.m(g, other !== undefined ? other : G.els.findIndex((_, i) => !A.includes(i))); pos[h] = [0.5 * Math.cos(ang), 0.5 * Math.sin(ang)]; }
        }
        if (pos.every(Boolean)) pos.forEach((p, i) => { nodes[i].pos = p; });
      }
      const GG = finishGraph(nodes, edges);
      const view = graphView(host, GG, { label: T('Cayley graph of %s', G.name), height: nodes[0].pos ? (W > 500 ? 400 : 360) : undefined });
      const R = recorder(GG);
      edges.forEach((e, i) => { R.S.ecol[i] = ecol[i]; R.S.edge[i] = 'tree'; });
      if (hl.length) G.els.forEach((_, i) => { R.S.ncol[i] = cd.cos[i]; });
      R.snap('', null);
      R.frames[0].ncolCss = (c) => (c === 0 ? 'var(--accent)' : cat(c - 1, Math.max(6, cd.reps.length - 1)));
      view.paint(R.frames[0]);
      MA.ui.legend(legendHost, gl.map((x, j) => ({ label: G.els[x].tex + '\\;\\;(\\text{' + T('order') + ' ' + G.ord[x] + '})', color: cat(j) })));
      host.prepend(legendHost);
      const S = subgroup(G, gl);
      panel.replaceChildren(
        el('div', { class: 'w-dm-hint', text: T('An arrow g → gx for each element g and generator x (right multiplication); a generator of order 2 gives plain edges.') }),
        S.length === N ? el('div', { class: 'w-dm-ok', text: T('These elements generate the whole group, so the graph is connected.') })
          : el('div', null, el('span', { class: 'w-dm-no', text: T('They generate a subgroup of order %d only:', S.length) }), ' ', T('the graph splits into %d components, the left cosets of that subgroup.', N / S.length)),
        ...(hl.length ? [el('div', { class: 'w-dm-hint', text: T('Vertex colours show the left cosets of H (H itself in purple).') })] : []));
    }
    syncN();
    draw();
  });

  // ================================================================== pascal
  MA.widget('pascal', (stage, cfg) => {
    style();
    let R = C.int(cfg.rows, 16), m = C.int(cfg.mod, 2);
    if (R < 1 || R > 128) throw new Error(T('pascal: rows must be between 1 and 128'));
    if (m < 2 || m > 16) throw new Error(T('pascal: mod must be between 2 and 16'));
    MA.ui.title(stage, cfg.title);
    const W = viewWidth(stage, 640, 440);
    const host = el('div');
    stage.append(host);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (msg) => info.set(el('span', { class: 'w-err', text: msg }));
    let rowsB = [];   // exact values (BigInt) row by row
    function compute() {
      rowsB = [[1n]];
      for (let n = 1; n < R; n++) {
        const prev = rowsB[n - 1], row = [1n];
        for (let k = 1; k < n; k++) row.push(prev[k - 1] + prev[k]);
        row.push(1n);
        rowsB.push(row);
      }
    }
    const resCol = (r) => (r === 0 ? null : cat(r - 1, Math.max(6, m - 1)));
    let geo = null, hot = null;
    function draw() {
      MA.tip.hide();
      host.replaceChildren();
      const pad = 10;
      const cw = Math.min(46, (W - 2 * pad) / R), ch = cw * 0.9;
      const H = Math.round(R * ch + 2 * pad);
      const mid = rowsB[R - 1][(R - 1) >> 1];
      const fs = Math.min(12.5, cw * 0.36);
      const showNum = R <= 40 && cw >= mid.toString().length * fs * 0.62 + 5;
      const X = (n, k) => W / 2 + (k - n / 2) * cw, Y = (n) => pad + n * ch + ch / 2;
      geo = { cw, ch, X, Y, pad, H };
      if (R <= 40) {
        const box = svgBox(host, W, H, { label: T('Pascal’s triangle mod %d', m) });
        for (let n = 0; n < R; n++) for (let k = 0; k <= n; k++) {
          const v = rowsB[n][k], r = Number(v % BigInt(m)), c = resCol(r);
          const parent = hot && hot[0] === n + 1 && (k === hot[1] - 1 || k === hot[1]) && hot[0] >= 1;
          const isHot = hot && hot[0] === n && hot[1] === k;
          const g = el('g');
          g.append(el('rect', { x: X(n, k) - cw / 2 + 0.6, y: Y(n) - ch / 2 + 0.6, width: cw - 1.2, height: ch - 1.2, rx: Math.min(6, cw / 4),
            style: 'fill:' + (c ? tint(c, 55) : 'var(--plot-bg)') + ';stroke:' + (isHot ? 'var(--ink)' : parent ? 'var(--accent)' : c || 'var(--rule-2)') + ';stroke-width:' + (isHot || parent ? 2.4 : 1) }));
          if (showNum) g.append(stext(X(n, k), Y(n) + 0.5, v.toString(), { style: 'font-size:' + fs.toFixed(1) + 'px;pointer-events:none;fill:' + (c ? 'var(--ink)' : 'var(--ink-3)') }));
          g.dataset.n = n; g.dataset.k = k;
          box.svg.append(g);
        }
        box.svg.addEventListener('pointermove', safe((ev) => { const t = ev.target.closest && ev.target.closest('g'); if (!t || t.dataset.n === undefined) { setHot(null, ev); return; } setHot([+t.dataset.n, +t.dataset.k], ev); }));
        box.svg.addEventListener('pointerleave', () => setHot(null));
      } else {
        const wrap = el('div', { class: 'w-plot' });
        const cv = el('canvas', { role: 'img', 'aria-label': T('Pascal’s triangle mod %d', m) });
        wrap.append(cv);
        host.append(wrap);
        const col = resolver(host);
        const paint = () => {
          const css = wrap.clientWidth || W, dpr = window.devicePixelRatio || 1, sc = css / W;
          cv.width = Math.round(css * dpr); cv.height = Math.round(H * sc * dpr);
          cv.style.height = (H * sc) + 'px';
          const ctx = cv.getContext('2d');
          ctx.scale(sc * dpr, sc * dpr);
          ctx.fillStyle = col('var(--plot-bg)'); ctx.fillRect(0, 0, W, H);
          const cache = new Map();
          for (let n = 0; n < R; n++) for (let k = 0; k <= n; k++) {
            const r = Number(rowsB[n][k] % BigInt(m)), c = resCol(r);
            if (!c) continue;
            if (!cache.has(c)) cache.set(c, col(c));
            ctx.fillStyle = cache.get(c);
            ctx.fillRect(X(n, k) - cw / 2 + 0.15, Y(n) - ch / 2 + 0.15, cw - 0.3, ch - 0.3);
          }
          if (hot) { ctx.strokeStyle = col('var(--ink)'); ctx.lineWidth = 1.5; ctx.strokeRect(X(hot[0], hot[1]) - cw / 2 - 1, Y(hot[0]) - ch / 2 - 1, cw + 2, ch + 2); }
        };
        paint();
        geo.paint = paint;
        cv.addEventListener('pointermove', safe((ev) => {
          const r = cv.getBoundingClientRect(), sc = r.width / W;
          const x = (ev.clientX - r.left) / sc, y = (ev.clientY - r.top) / sc;
          const n = Math.floor((y - pad) / ch);
          if (n < 0 || n >= R) { setHot(null, ev); return; }
          const k = Math.round((x - W / 2) / cw + n / 2);
          if (k < 0 || k > n) { setHot(null, ev); return; }
          setHot([n, k], ev);
        }));
        cv.addEventListener('pointerleave', () => setHot(null));
        const onTheme = safe(() => { if (!cv.isConnected) { window.removeEventListener('ma:theme', onTheme); return; } col.reset(); paint(); });
        window.addEventListener('ma:theme', onTheme);
      }
      describe();
    }
    function setHot(h, ev) {
      const same = (h === null && hot === null) || (h && hot && h[0] === hot[0] && h[1] === hot[1]);
      if (!same) {
        hot = h;
        if (R <= 40) { const keep = hot; draw(); hot = keep; } else if (geo.paint) geo.paint();
        describe();
      }
      if (hot && ev) MA.tip.show(tipText(hot[0], hot[1]), ev.clientX, ev.clientY); else MA.tip.hide();
    }
    const binTeX = (n, k) => '\\tbinom{' + n + '}{' + k + '}';
    function tipText(n, k) {
      const v = rowsB[n][k];
      return 'C(' + n + ', ' + k + ') = ' + v.toString() + '  ≡ ' + (v % BigInt(m)).toString() + ' (mod ' + m + ')';
    }
    function describe() {
      const parts = [];
      if (hot) {
        const [n, k] = hot, v = rowsB[n][k];
        let rule;
        if (k === 0 || k === n) rule = binTeX(n, k) + ' = 1';
        else rule = binTeX(n, k) + ' = ' + binTeX(n - 1, k - 1) + ' + ' + binTeX(n - 1, k) + ' = ' + rowsB[n - 1][k - 1] + ' + ' + rowsB[n - 1][k] + ' = ' + v.toString();
        parts.push(el('span', null, MA.texEl(rule.length > 160 ? binTeX(n, k) + ' = ' + v.toString() : rule)));
        parts.push(el('span', null, MA.texEl('\\equiv ' + (v % BigInt(m)).toString() + ' \\pmod{' + m + '}')));
        if (isPrime(m) && n > 0) {
          const dig = (x) => { const d = []; do { d.push(x % m); x = Math.floor(x / m); } while (x > 0); return d; };
          const dn = dig(n), dk = dig(k);
          while (dk.length < dn.length) dk.push(0);
          const terms = dn.map((a, i) => binTeX(a, dk[i])).reverse();
          const small = (a, b) => { if (b > a) return 0; let r = 1; for (let j = 1; j <= b; j++) r = r * (a - b + j) / j; return Math.round(r); };
          const prod = dn.reduce((acc, a, i) => (acc * (small(a, dk[i]) % m)) % m, 1);
          parts.push(el('span', null, T('Lucas:'), ' ', MA.texEl(n + ' = (' + dn.slice().reverse().join('') + ')_{' + m + '},\\ ' + k + ' = (' + dk.slice().reverse().join('') + ')_{' + m + '}\\ \\Rightarrow\\ ' + terms.join('') + ' \\equiv ' + prod)));
        }
      } else {
        const last = R - 1;
        let nz = 0;
        rowsB[last].forEach((v) => { if (v % BigInt(m)) nz++; });
        parts.push(el('span', null, T('Entries'), ' ', MA.texEl('\\tbinom{n}{k}'), ' ', T('coloured by their remainder mod %d (blank: divisible by %d).', m, m)));
        if (m === 2) parts.push(el('span', null, T('Row %d has %d odd entries = 2 to the number of 1s in %d in binary (%s).', last, nz, last, last.toString(2))));
        else parts.push(el('span', null, T('Row %d: %d of %d entries are not divisible by %d.', last, nz, last + 1, m)));
        parts.push(el('span', { class: 'w-dm-hint', text: T('Hover an entry: its two parents are outlined (Pascal’s rule).') }));
      }
      info.set(...parts);
    }
    MA.ui.slider(bar, { label: T('rows'), min: 1, max: 128, step: 1, value: R, fmt: (v) => String(v), onInput: safe((v) => { R = v; hot = null; compute(); draw(); }, report) });
    MA.ui.slider(bar, { label: 'mod', min: 2, max: 12, step: 1, value: Math.min(12, m), fmt: (v) => String(v), onInput: safe((v) => { m = v; hot = null; draw(); }, report) });
    compute();
    draw();
  });

  // ================================================================== cantor
  /** Position of (m, n) (0-based, m = column, n = row) in the zig-zag or diagonal order of ℕ × ℕ. */
  function pairIndex(m, n, zig) {
    const d = m + n, base = d * (d + 1) / 2;
    if (!zig) return base + n;
    return base + (d % 2 ? n : m);
  }
  function pairAt(i, zig) {
    let d = Math.floor((Math.sqrt(8 * i + 1) - 1) / 2);
    while ((d + 1) * (d + 2) / 2 <= i) d++;
    while (d * (d + 1) / 2 > i) d--;
    const j = i - d * (d + 1) / 2;
    if (!zig) return [d - j, j];
    return d % 2 ? [d - j, j] : [j, d - j];
  }

  MA.widget('cantor', (stage, cfg) => {
    style();
    const mode = C.str(cfg.mode, 'diagonal').toLowerCase();
    if (!['pairing', 'rationals', 'diagonal'].includes(mode)) throw new Error(T('cantor: mode must be pairing, rationals or diagonal'));
    let size = C.int(cfg.size, 8);
    if (size < 2 || size > 16) throw new Error(T('cantor: size must be between 2 and 16'));
    MA.ui.title(stage, cfg.title);
    if (mode === 'diagonal') { diagonalArgument(stage, size); return; }
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 300, { label: mode === 'pairing' ? T('Enumerating pairs of natural numbers') : T('Enumerating the positive rationals') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    stage.append(panel);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    let zig = true;
    const rat = mode === 'rationals';
    const T0 = () => size * (size + 1) / 2;   // cells on the first `size` diagonals
    // order: list of cells [m, n] (0-based) on the complete diagonals
    const cells = () => Array.from({ length: T0() }, (_, i) => pairAt(i, zig));
    const label = (m, n) => (rat ? (m + 1) + '/' + (n + 1) : '(' + m + ',' + n + ')');
    const reduced = (m, n) => !rat || gcd(m + 1, n + 1) === 1;
    function show(k) {
      const order = cells();
      const pad = 12, lab = 30;
      const cs = Math.min(64, (W - 2 * pad - lab) / size);
      const H = Math.round(pad * 2 + lab + cs * size);
      box.size(W, H);
      box.svg.replaceChildren();
      const x0 = pad + lab + (W - 2 * pad - lab - cs * size) / 2, y0 = pad + lab;
      const cx = (m) => x0 + m * cs + cs / 2, cy = (n) => y0 + n * cs + cs / 2;
      // axes labels
      for (let i = 0; i < size; i++) {
        box.svg.append(stext(cx(i), y0 - 12, rat ? 'p=' + (i + 1) : 'm=' + i, { style: 'font-size:' + Math.min(11.5, cs * 0.3) + 'px;fill:var(--ink-3)' }));
        box.svg.append(stext(x0 - 8, cy(i), rat ? 'q=' + (i + 1) : 'n=' + i, { anchor: 'end', style: 'font-size:' + Math.min(11.5, cs * 0.3) + 'px;fill:var(--ink-3)' }));
      }
      const gC = el('g'), gP = el('g', { style: 'pointer-events:none' }), gT = el('g', { style: 'pointer-events:none' });
      box.svg.append(gC, gP, gT);
      const pos = new Map();
      let count = 0;
      const list = [];
      order.forEach(([m, n], i) => { if (i < k) { const ok = reduced(m, n); if (ok) { count++; list.push(rat && n === 0 ? String(m + 1) : label(m, n)); } pos.set(m + ',' + n, { i, num: ok ? count : 0 }); } });
      const fs = Math.min(13, cs * 0.26);
      for (let m = 0; m < size; m++) for (let n = 0; n < size; n++) {
        const st = pos.get(m + ',' + n);
        const cur = st && st.i === k - 1;
        const dup = rat && !reduced(m, n);
        const fill = cur ? 'var(--accent-wash)' : st ? (dup ? tint('var(--ink-3)', 10) : tint('var(--series-1)', 18)) : 'var(--plot-bg)';
        const r = el('rect', { x: x0 + m * cs + 1, y: y0 + n * cs + 1, width: cs - 2, height: cs - 2, rx: 4, style: 'fill:' + fill + ';stroke:' + (cur ? 'var(--accent)' : 'var(--rule)') + ';stroke-width:' + (cur ? 2.4 : 1) });
        r.dataset.m = m; r.dataset.n = n;
        gC.append(r);
        gT.append(stext(cx(m), cy(n) - (st ? fs * 0.55 : 0), label(m, n), { cls: 'w-dm-t w-dm-halo', style: 'font-size:' + fs.toFixed(1) + 'px;fill:' + (dup ? 'var(--ink-3)' : 'var(--ink-2)') + (dup && st ? ';text-decoration:line-through' : '') }));
        if (st) gT.append(stext(cx(m), cy(n) + fs * 0.75, dup ? '–' : String(st.num - (rat ? 0 : 1)), { cls: 'w-dm-t w-dm-halo', style: 'font-size:' + (fs * 1.05).toFixed(1) + 'px;font-weight:800;fill:' + (dup ? 'var(--ink-3)' : 'var(--accent)') }));
      }
      // the path through the visited cells
      if (k > 1) {
        let d = '', jumps = '';
        for (let i = 1; i < k; i++) {
          const [m0, n0] = order[i - 1], [m1, n1] = order[i];
          const seg = 'M' + cx(m0).toFixed(1) + ',' + cy(n0).toFixed(1) + 'L' + cx(m1).toFixed(1) + ',' + cy(n1).toFixed(1);
          if (Math.abs(m1 - m0) + Math.abs(n1 - n0) > 2) jumps += seg; else d += seg;
        }
        gP.append(el('path', { d, style: 'fill:none;stroke:var(--series-2);stroke-width:2.2;opacity:.75;stroke-linecap:round' }));
        if (jumps) gP.append(el('path', { d: jumps, style: 'fill:none;stroke:var(--series-2);stroke-width:1.2;opacity:.45;stroke-dasharray:4 4' }));
        const [ma, na] = order[k - 2], [mb, nb] = order[k - 1];
        const ex = cx(mb), ey = cy(nb), dx = ex - cx(ma), dy = ey - cy(na), L = Math.hypot(dx, dy) || 1;
        gP.append(el('path', { d: arrowHead(ex - dx / L * cs * 0.36, ey - dy / L * cs * 0.36, dx, dy, 10, 8), style: 'fill:var(--series-2)' }));
      }
      // messages
      const cur = k > 0 ? order[k - 1] : null;
      let msg;
      if (!cur) msg = rat ? T('Write every fraction p/q in a grid: row q, column p.') : T('Arrange all pairs (m, n) in a grid.');
      else if (rat) {
        const [m, n] = cur;
        msg = reduced(m, n) ? T('%s is new: it is number %d in the list.', label(m, n), count)
          : T('%s = %s has already been listed, so skip it.', label(m, n), ((m + 1) / gcd(m + 1, n + 1)) + '/' + ((n + 1) / gcd(m + 1, n + 1)));
      } else msg = T('Step %d: the pair %s.', k - 1, label(cur[0], cur[1]));
      const parts = [el('span', { class: 'w-dm-msg', text: msg })];
      if (!rat) parts.push(el('span', null, MA.texEl(zig ? '\\pi(m,n) = \\tfrac{d(d+1)}{2} + \\begin{cases} m & d \\text{ even} \\\\ n & d \\text{ odd}\\end{cases},\\; d = m+n' : '\\pi(m,n) = \\tfrac{(m+n)(m+n+1)}{2} + n')));
      info.set(...parts);
      if (rat) panel.replaceChildren(chipRow(T('The list so far:'), list.slice(-40), (i) => i === list.length - 1), el('div', { class: 'w-dm-hint', text: T('Every positive rational p/q sits in row q, column p, so the zig-zag reaches it after finitely many steps; skipping repeats makes the list a bijection ℕ → ℚ⁺.') }));
      else panel.replaceChildren(el('div', { class: 'w-dm-hint', text: T('Every pair lies on a finite diagonal m + n = d, so it receives a number after finitely many steps: ℕ × ℕ is countable. Hover a cell to see its number.') }));
    }
    box.svg.addEventListener('pointermove', safe((ev) => {
      const t = ev.target;
      if (!t.dataset || t.dataset.m === undefined) { MA.tip.hide(); return; }
      const m = +t.dataset.m, n = +t.dataset.n, i = pairIndex(m, n, zig);
      if (rat) {
        const g = gcd(m + 1, n + 1);
        let pos = 0;
        for (let j = 0; j <= i; j++) { const [a, b] = pairAt(j, zig); if (gcd(a + 1, b + 1) === 1) pos++; }
        MA.tip.show(g === 1 ? T('%s is number %d in the list', label(m, n), pos) : T('%s = %s (skipped)', label(m, n), ((m + 1) / g) + '/' + ((n + 1) / g)), ev.clientX, ev.clientY);
      } else MA.tip.show(label(m, n) + ' ↦ ' + i, ev.clientX, ev.clientY);
    }));
    box.svg.addEventListener('pointerleave', () => MA.tip.hide());
    MA.ui.seg(bar, { options: [['zig', T('zig-zag')], ['diag', T('diagonals')]], value: 'zig', onChange: safe((v) => { zig = v === 'zig'; pl.end(); }, report) });
    MA.ui.slider(bar, { label: T('size'), min: 3, max: 12, step: 1, value: Math.min(12, size), fmt: (v) => String(v), onInput: safe((v) => { size = v; pl.end(); }, report) });
    const pl = player(bar, { count: () => T0() + 1, show: safe(show, report), delay: 0.6 });
    pl.end();
  });

  function diagonalArgument(stage, size0) {
    let rows = Math.min(12, size0);
    const W = viewWidth(stage, 640, 440);
    const box = svgBox(stage, W, 300, { label: T('Cantor’s diagonal argument') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const report = (m) => info.set(el('span', { class: 'w-err', text: m }));
    let seed = 7;
    let S = [];
    const fresh = () => { const rnd = MA.num.rng(seed); S = Array.from({ length: rows }, () => Array.from({ length: rows }, () => (rnd() < 0.5 ? 0 : 1))); };
    fresh();
    let step = rows;
    function show(k) {
      step = k;
      const n = S.length;
      const pad = 12, labW = 40;
      const cs = Math.min(36, (W - 2 * pad - labW - 30) / (n + 1));
      const H = Math.round(pad * 2 + cs * (n + 2.4));
      box.size(W, H);
      box.svg.replaceChildren();
      const x0 = pad + labW + (W - 2 * pad - labW - cs * (n + 1)) / 2, y0 = pad;
      const fs = Math.min(15, cs * 0.5);
      const d = S.map((r, i) => 1 - r[i]);
      for (let i = 0; i < n; i++) {
        const y = y0 + i * cs;
        box.svg.append(stext(x0 - 10, y + cs / 2, 's' + subStr(i + 1), { anchor: 'end', style: 'font-size:' + fs + 'px;font-style:italic;fill:var(--ink-2)' }));
        for (let j = 0; j < n; j++) {
          const diag = i === j, done = diag && i < k, cur = diag && i === k - 1;
          const g = el('g', { style: 'cursor:pointer' });
          g.append(el('rect', { x: x0 + j * cs + 1, y: y + 1, width: cs - 2, height: cs - 2, rx: 3, style: 'fill:' + (diag ? (done ? tint('var(--series-2)', 35) : tint('var(--series-2)', 14)) : 'var(--plot-bg)') + ';stroke:' + (cur ? 'var(--series-2)' : 'var(--rule)') + ';stroke-width:' + (cur ? 2.5 : 1) }));
          g.append(stext(x0 + j * cs + cs / 2, y + cs / 2 + 0.5, String(S[i][j]), { style: 'pointer-events:none;font-family:var(--mono);font-size:' + fs + 'px;font-weight:' + (diag ? 800 : 400) + ';fill:' + (diag ? 'var(--ink)' : 'var(--ink-2)') }));
          g.addEventListener('click', safe(() => { S[i][j] ^= 1; show(step); }));
          box.svg.append(g);
        }
        box.svg.append(stext(x0 + n * cs + 10, y + cs / 2, '…', { anchor: 'start', style: 'font-size:' + fs + 'px;fill:var(--ink-3)' }));
      }
      box.svg.append(stext(x0 + n * cs / 2, y0 + n * cs + cs * 0.25, '⋮', { style: 'font-size:' + fs + 'px;fill:var(--ink-3)' }));
      // the new sequence d
      const yd = y0 + n * cs + cs * 0.9;
      box.svg.append(stext(x0 - 10, yd + cs / 2, 'd', { anchor: 'end', style: 'font-size:' + fs + 'px;font-style:italic;font-weight:700;fill:var(--accent)' }));
      for (let j = 0; j < n; j++) {
        const shown = j < k;
        box.svg.append(el('rect', { x: x0 + j * cs + 1, y: yd + 1, width: cs - 2, height: cs - 2, rx: 3, style: 'fill:' + (shown ? 'var(--accent-wash)' : 'var(--plot-bg)') + ';stroke:var(--accent);stroke-width:' + (j === k - 1 ? 2.5 : 1.2) }));
        if (shown) box.svg.append(stext(x0 + j * cs + cs / 2, yd + cs / 2 + 0.5, String(d[j]), { style: 'font-family:var(--mono);font-size:' + fs + 'px;font-weight:800;fill:var(--accent)' }));
      }
      box.svg.append(stext(x0 + n * cs + 10, yd + cs / 2, '…', { anchor: 'start', style: 'font-size:' + fs + 'px;fill:var(--ink-3)' }));
      if (k > 0) {
        const i = k - 1;
        const x = x0 + i * cs + cs / 2;
        box.svg.append(el('line', { x1: x, y1: y0 + i * cs + cs - 2, x2: x, y2: yd - 4, style: 'stroke:var(--accent);stroke-width:1.5;stroke-dasharray:3 3' }));
        box.svg.append(el('path', { d: arrowHead(x, yd + 1, 0, 1, 8, 7), style: 'fill:var(--accent)' }));
      }
      const parts = [];
      if (k === 0) parts.push(el('span', { class: 'w-dm-msg', text: T('Suppose s₁, s₂, s₃, … lists every infinite 0–1 sequence. Build d by changing the diagonal digits.') }));
      else if (k < n) parts.push(el('span', { class: 'w-dm-msg', text: T('Digit %d of s%s is %d, so digit %d of d is %d: d ≠ s%s.', k, subStr(k), S[k - 1][k - 1], k, d[k - 1], subStr(k)) }));
      else {
        parts.push(el('span', null, MA.texEl('d = ' + d.join('') + '\\ldots'), ' ', T('differs from every'), ' ', MA.texEl('s_k'), ' ', T('in digit k, so d is not in the list.')));
        parts.push(el('span', { class: 'w-dm-hint', text: T('No list can contain every sequence: the set of 0–1 sequences (equivalently P(ℕ), or the reals in [0, 1] in binary) is uncountable.') }));
      }
      parts.push(el('span', { class: 'w-dm-hint', text: T('Click digits to change the list; d always escapes.') }));
      info.set(...parts);
    }
    const pl = player(bar, { count: () => S.length + 1, show: safe(show, report), delay: 0.9 });
    MA.ui.button(bar, { label: T('New list'), onClick: safe(() => { seed++; fresh(); pl.end(); }, report) });
    MA.ui.button(bar, { label: T('Add d to the list'), onClick: safe(() => {
      if (S.length >= 14) { report(T('The list is long enough — d always escapes!')); return; }
      const d = S.map((r, i) => 1 - r[i]);
      const rnd = MA.num.rng(seed * 31 + S.length);
      S.forEach((r) => r.push(rnd() < 0.5 ? 0 : 1));
      d.push(rnd() < 0.5 ? 0 : 1);
      S.unshift(d);
      pl.end();
    }, report) });
    pl.end();
  }
  const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
  const subStr = (k) => String(k).split('').map((q) => SUB[q]).join('');

  // ================================================================== mapping, relation, metricballs: shared helpers
  const CSS2 = `
.w-dm-panel > [hidden] + * { margin-top: 0; }
.w-dm-blob { fill: color-mix(in srgb, var(--ink) 3%, var(--plot-bg)); stroke: var(--rule-2); stroke-width: 1.2; }
.w-dm-mn { cursor: pointer; outline: none; }
.w-dm-mn .bx { stroke-width: 2; }
.w-dm-mn.miss .bx { stroke-dasharray: 4 3; }
.w-dm-mn .rg { fill: none; stroke: var(--accent); stroke-width: 2.6; display: none; pointer-events: none; }
.w-dm-mn:focus-visible .rg, .w-dm-mn.sel .rg, .w-dm-mn.cand .rg, .w-dm-mn.bad .rg { display: inline; }
.w-dm-mn.cand .rg { stroke-dasharray: 4 3; stroke-width: 2; }
.w-dm-mn.bad .rg { stroke: var(--bad); }
.w-dm-mn.dim, .w-dm-ma.dim { opacity: .2; }
.w-dm-mn .lb { font-family: var(--font); font-weight: 600; fill: var(--ink); text-anchor: middle; dominant-baseline: central; pointer-events: none; }
.w-dm-ma .v { fill: none; stroke-width: 2.2; stroke-linecap: round; }
.w-dm-ma .hit { fill: none; stroke: transparent; stroke-width: 16; pointer-events: stroke; }
.w-dm-ma.ed .hit { cursor: grab; }
.w-dm-ma.hl .v { stroke-width: 3.6; }
.w-dm-bdg circle { stroke-width: 1.5; }
.w-dm-bdg text { font: 700 10px var(--font); text-anchor: middle; dominant-baseline: central; }
.w-dm-fibs { display: flex; flex-wrap: wrap; gap: 6px 8px; align-items: center; }
.w-dm-fibs > .k { color: var(--ink-3); margin-right: 2px; }
.w-dm-fib { display: inline-flex; align-items: center; gap: 6px; padding: 1px 9px 1px 7px; border-radius: 999px; border: 1px solid var(--rule-2); background: var(--paper); color: var(--ink); }
.w-dm-fib.on { border-color: var(--accent); background: var(--accent-wash); }
.w-dm-fib .w-dm-sw, .w-dm-cls .w-dm-sw { margin-right: 0; }
.w-dm-status { color: var(--accent-ink); font-weight: 600; }
.w-dm-v { display: flex; flex-direction: column; gap: 3px; min-width: 0; }
.w-dm-list { display: flex; flex-wrap: wrap; gap: 2px 16px; align-items: baseline; }
.w-dm-tab.w-dm-chain { margin: 2px 0 4px; align-self: flex-start; }
/* relation */
.w-dm-rel { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 4px 28px; padding: 10px 16px 8px; }
.w-dm-relg { flex: 1 1 250px; max-width: 330px; min-width: 0; }
.w-dm-relm { flex: 0 1 auto; max-width: 100%; overflow-x: auto; padding: 4px 2px; }
.w-dm-mat { border-collapse: separate; border-spacing: 3px; margin: 0 auto; }
.w-dm-mat th { font-weight: 600; font-size: .875rem; color: var(--ink-2); padding: 0 4px; text-align: center; white-space: nowrap; }
.w-dm-mat th.hot { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.w-dm-mat th.q { color: var(--ink-3); font-weight: 400; }
.w-dm-mat td { padding: 0; text-align: center; }
.w-dm-cell { width: var(--cs, 34px); height: var(--cs, 34px); display: block; padding: 0; border: 1px solid var(--rule-2); border-radius: 6px; background: var(--plot-bg); font: 500 .85rem var(--mono); color: var(--ink-3); cursor: pointer; }
.w-dm-cell.diag { background: color-mix(in srgb, var(--ink) 6%, var(--plot-bg)); }
.w-dm-cell.on { background: color-mix(in srgb, var(--series-1) 24%, var(--plot-bg)); border-color: var(--series-1); color: var(--ink); font-weight: 700; }
.w-dm-cell.add { border: 1.5px dashed var(--series-2); color: var(--series-2); font-weight: 700; }
.w-dm-cell.hot { box-shadow: 0 0 0 2px var(--accent); }
.w-dm-cell.ce { box-shadow: 0 0 0 2.5px var(--bad); }
.w-dm-cell.ghost { box-shadow: 0 0 0 2.5px var(--bad); border-style: dashed; }
.w-dm-cell:focus-visible { outline: 2.5px solid var(--accent); outline-offset: 2px; }
.w-dm-cell.ro { cursor: default; }
.w-dm-mk { font: 700 .85rem var(--font); color: var(--ink-3); }
.w-dm-mk.yes { color: var(--good); }
.w-dm-mk.no { color: var(--bad); }
.w-dm-matcap { text-align: center; margin-top: 4px; }
.w-dm-prop { border-radius: 6px; padding: 1px 6px; margin: 0 -6px; outline: none; }
.w-dm-prop.ce { cursor: pointer; }
.w-dm-prop.ce:hover, .w-dm-prop.ce:focus-visible, .w-dm-prop.on { background: var(--bad-wash); }
.w-dm-cls { display: inline-flex; align-items: center; gap: 5px; padding: 1px 8px 1px 6px; border-radius: 999px; border: 1px solid var(--rule-2); background: var(--paper); }
`;
  function style2() {
    style();
    if (document.getElementById('w-dm-style-2')) return;
    document.head.append(el('style', { id: 'w-dm-style-2', text: CSS2 }));
  }
  const fx = (v) => v.toFixed(1);
  const isTeX = (s) => /[\\^_{}]/.test(String(s));
  /** An element name as TeX: TeX as written, numbers and single letters in math italics, anything else as upright text. */
  function elTeX(s) {
    s = String(s);
    if (isTeX(s)) return s;
    if (/^[−-]?\d+(\.\d+)?$/.test(s)) return s.replace('−', '-');
    if (/^[A-Za-z]'*$/.test(s)) return s;
    return '\\text{' + s.replace(/[\\{}$&#^_%~]/g, '') + '}';
  }
  /** An element name as a node: typeset when it is TeX. */
  const nameNode = (s) => (isTeX(s) ? MA.texEl(s) : document.createTextNode(String(s)));
  /** A translated template whose %s / %d are filled with nodes or strings, in order. */
  function tmpl(t, ...parts) {
    const out = el('span');
    t.split(/%[sd]/).forEach((piece, i) => {
      if (i) { const q = parts[i - 1]; out.append(q === undefined ? '' : q.nodeType ? q : String(q)); }
      if (piece) out.append(piece);
    });
    return out;
  }
  /** A finite set of names as TeX. */
  const listTeX = (names) => (names.length ? '\\{' + names.map(elTeX).join(', ') + '\\}' : '\\varnothing');
  /** Approximate width (px) of a name at font size fs. */
  function labelWidth(s, fs) {
    s = String(s);
    if (isTeX(s)) return s.replace(/\\[A-Za-z]+/g, 'M').replace(/[{}^_\\]/g, '').length * fs * 0.62 + 6;
    return s.length * fs * 0.62;
  }
  /** TeX typeset in an SVG (foreignObject) centred at (x, y); o: w, h, size, color, anchor. */
  function foTeX(x, y, tex, o = {}) {
    const w = o.w || 120, h = o.h || 28;
    const fo = el('foreignObject', { x: fx(x - (o.anchor === 'start' ? 0 : o.anchor === 'end' ? w : w / 2)), y: fx(y - h / 2), width: fx(w), height: fx(h), style: 'overflow:visible;pointer-events:none' });
    const d = el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: o.anchor === 'start' ? 'flex-start' : o.anchor === 'end' ? 'flex-end' : 'center',
      height: h + 'px', color: o.color || 'var(--ink)', fontSize: (o.size || 14) + 'px', whiteSpace: 'nowrap', lineHeight: '1' } });
    MA.tex(d, tex);
    fo.append(d);
    return fo;
  }
  /** Distance from the centre of a stadium (half-width hw, half-height hh) to its outline in direction (ux, uy). */
  function stadiumR(hw, hh, ux, uy) {
    const L = Math.hypot(ux, uy) || 1, h = hw - hh;
    ux /= L; uy /= L;
    if (h <= 0.01) return hh;
    if (Math.abs(uy) > 1e-9) { const t = hh / Math.abs(uy); if (Math.abs(t * ux) <= h) return t; }
    const uc = Math.abs(ux) * h;
    return uc + Math.sqrt(Math.max(0, uc * uc - h * h + hh * hh));
  }
  /** Straight arrow from node a to node b ({x, y, hw}, half-height hh); toPoint: b is a bare point. Returns {line, head} path data or null. */
  function nodeArrow(a, b, hh, toPoint) {
    const dx = b.x - a.x, dy = b.y - a.y, L = Math.hypot(dx, dy);
    if (!(L > 1)) return null;
    const ux = dx / L, uy = dy / L;
    const r0 = stadiumR(a.hw, hh, ux, uy) + 1, r1 = toPoint ? 0 : stadiumR(b.hw, hh, ux, uy) + 2;
    if (L < r0 + r1 + 10) return null;
    const sx = a.x + ux * r0, sy = a.y + uy * r0, tx = b.x - ux * r1, ty = b.y - uy * r1;
    return { line: 'M' + fx(sx) + ',' + fx(sy) + 'L' + fx(tx - ux * 8) + ',' + fx(ty - uy * 8), head: arrowHead(tx, ty, ux, uy, 11, 8) };
  }

  // ================================================================== mapping
  const MAP_OPS = ['|->', '↦', '->', '→', '>'];
  const MAP_MAX = 16;
  /** A list of distinct names ("a; b; c"). */
  function parseElems(v, key, max) {
    const xs = C.list(v);
    const seen = new Set();
    for (const x of xs) {
      if (seen.has(x)) throw new Error(T('%s: “%s” is listed twice', key, x));
      seen.add(x);
    }
    if (xs.length > max) throw new Error(T('%s: at most %d elements', key, max));
    return xs;
  }
  /** Arrows "x>y; …" from X to Y: the index in Y of the image of each element of X (exactly one arrow each). */
  function parseArrows(v, X, Y, key) {
    const ix = new Map(X.map((x, i) => [x, i])), iy = new Map(Y.map((y, j) => [y, j]));
    const m = new Array(X.length).fill(-1);
    for (const s of C.list(v)) {
      let hit = null;
      for (const op of MAP_OPS) {
        for (let p = s.indexOf(op); p >= 0 && !hit; p = s.indexOf(op, p + 1)) {
          const a = s.slice(0, p).trim(), b = s.slice(p + op.length).trim();
          if (ix.has(a) && iy.has(b)) hit = [ix.get(a), iy.get(b)];
        }
        if (hit) break;
      }
      if (!hit) {
        const mm = /^(.*?)\s*(\|->|↦|->|→|>)\s*(.*)$/.exec(s);
        if (!mm || !mm[1].trim() || !mm[3].trim()) throw new Error(T('%s: write each arrow as x>y (got “%s”)', key, s));
        if (!ix.has(mm[1].trim())) throw new Error(T('%s: “%s” is not in the domain (%s)', key, mm[1].trim(), X.join(', ')));
        throw new Error(T('%s: “%s” is not in the codomain (%s)', key, mm[3].trim(), Y.join(', ')));
      }
      const [i, j] = hit;
      if (m[i] >= 0) {
        throw new Error(m[i] === j ? T('%s: the arrow %s > %s is listed twice', key, X[i], Y[j])
          : T('%s: %s has two arrows (to %s and to %s), but a function sends each element to exactly one value', key, X[i], Y[m[i]], Y[j]));
      }
      m[i] = j;
    }
    const miss = X.filter((_, i) => m[i] < 0);
    if (miss.length) throw new Error(T('%s: no arrow leaves %s — a function needs one arrow from every element of its domain', key, miss.join(', ')));
    return m;
  }
  /** Preimages of the points of Y under m, the first point hit twice (or −1) and the points missed. */
  function analyseMap(m, ny) {
    const fib = Array.from({ length: ny }, () => []);
    m.forEach((j, i) => fib[j].push(i));
    const missed = [];
    fib.forEach((l, j) => { if (!l.length) missed.push(j); });
    const multi = fib.findIndex((l) => l.length > 1);
    return { fib, multi, missed, inj: multi < 0, surj: !missed.length };
  }

  MA.widget('mapping', (stage, cfg) => {
    style2();
    const A = parseElems(cfg.domain, 'domain', MAP_MAX), B = parseElems(cfg.codomain, 'codomain', MAP_MAX);
    if (!A.length) throw new Error(T('mapping: list the elements of the domain, e.g. domain: 1; 2; 3'));
    if (!B.length) throw new Error(T('mapping: list the elements of the codomain, e.g. codomain: a; b; c'));
    if (!C.has(cfg.map)) throw new Error(T('mapping: give one arrow from each element of the domain, e.g. map: 1>a; 2>b; 3>a'));
    const sets = [A, B];
    const maps = [parseArrows(cfg.map, A, B, 'map')];
    if (C.has(cfg.then) || C.has(cfg.target)) {
      if (!C.has(cfg.target)) throw new Error(T('mapping: “then” needs “target”, the set that g maps into'));
      if (!C.has(cfg.then)) throw new Error(T('mapping: “target” needs “then”, the arrows of g, e.g. then: a>x; b>y'));
      const Z = parseElems(cfg.target, 'target', MAP_MAX);
      maps.push(parseArrows(cfg.then, B, Z, 'then'));
      sets.push(Z);
    }
    const chain = sets.length === 3;
    const editable = C.bool(cfg.editable, true);
    const orig = maps.map((m) => m.slice());
    let view = 'map', sel = null, hov = null, pin = null, press = null, L = null, fibChips = [];
    MA.ui.title(stage, cfg.title);
    const sw = stage.clientWidth || 640;
    const W = sw < 520 ? Math.max(340, Math.min(440, Math.round(sw * 1.2))) : 640;
    const box = svgBox(stage, W, 300, { role: 'group', drag: editable,
      label: editable ? T('Arrow diagram of a function. Tab to an element and press the up or down arrow key to move its arrow.') : T('Arrow diagram of a function') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    info.el.style.flexDirection = 'column';
    info.el.style.gap = '3px';
    const panel = el('div', { class: 'w-dm-panel' });
    const statusEl = el('div', { class: 'w-dm-msg', hidden: true });
    const fibEl = el('div', { class: 'w-dm-fibs' });
    const hintEl = el('div', { class: 'w-dm-hint' });
    panel.append(statusEl, fibEl, hintEl);
    stage.append(panel);
    const report = (m) => { statusEl.hidden = false; statusEl.replaceChildren(el('span', { class: 'w-err', text: m })); };

    const gfMap = () => maps[0].map((j) => maps[1][j]);
    /** What is drawn: the columns, the maps between consecutive columns and their names. */
    function current() {
      if (view === 'comp') return { sets: [sets[0], sets[2]], names: ['A', 'C'], maps: [gfMap()], fn: ['g\\circ f'], edit: false, rev: false };
      return { sets, names: chain ? ['A', 'B', 'C'] : ['A', 'B'], maps, fn: chain ? ['f', 'g'] : ['f'], edit: editable && view === 'map', rev: view === 'inv' };
    }
    const app = (fn, x) => (fn.length > 1 ? '(' + fn + ')' : fn) + '(' + x + ')';
    const finv = (fn) => (fn.length > 1 ? '(' + fn + ')' : fn) + '^{-1}';

    function build() {
      const V = current();
      const K = V.sets.length;
      const maxN = Math.max(...V.sets.map((s) => s.length));
      const gap = maxN <= 6 ? 46 : Math.max(26, Math.min(46, 340 / maxN));
      const HH = Math.max(10, Math.min(15, gap * 0.32));
      const fs = HH >= 12 ? 13 : 11.5;
      const HW = V.sets.map((s) => s.map((x) => Math.max(HH, labelWidth(x, fs) / 2 + 7)));
      const bw = HW.map((h) => Math.max(...h) + 14);
      const m = 12;
      let xs;
      if (K === 2) { const D = Math.max(120, Math.min(W - 2 * m - bw[0] - bw[1], 330)); xs = [W / 2 - D / 2, W / 2 + D / 2]; }
      else { const D = Math.max(90, Math.min((W - 2 * m - bw[0] - bw[2]) / 2, 230)); xs = [W / 2 - D, W / 2, W / 2 + D]; }
      const top = 46, padIn = 10;
      const H = Math.round(top + maxN * gap + 2 * padIn + 10);
      box.size(W, H);
      const svg = box.svg;
      svg.replaceChildren();
      const gB = el('g'), gH = el('g'), gA = el('g'), gN = el('g'), gG = el('g', { style: 'pointer-events:none' });
      svg.append(gB, gH, gA, gN, gG);
      const offs = V.sets.map((s) => (maxN - s.length) * gap / 2);
      V.sets.forEach((s, k) => {
        const y0 = top + offs[k], h = s.length * gap + 2 * padIn;
        gB.append(el('rect', { class: 'w-dm-blob', x: fx(xs[k] - bw[k]), y: fx(y0), width: fx(2 * bw[k]), height: fx(h), rx: fx(Math.min(26, bw[k], h / 2)) }));
        gH.append(foTeX(xs[k], 25, V.names[k], { size: 18, color: 'var(--ink-2)', w: 40, h: 30 }));
      });
      // "A --f--> B" above the columns
      for (let k = 0; k < K - 1; k++) {
        const x1 = xs[k] + 18, x2 = xs[k + 1] - 18, y = 25, dir = V.rev ? -1 : 1;
        const sx = V.rev ? x2 : x1, ex = V.rev ? x1 : x2;
        gH.append(el('line', { x1: fx(sx), y1: y, x2: fx(ex - dir * 7), y2: y, style: 'stroke:var(--ink-3);stroke-width:1.3' }));
        gH.append(el('path', { d: arrowHead(ex, y, dir, 0, 9, 7), style: 'fill:var(--ink-3)' }));
        gH.append(foTeX((x1 + x2) / 2, 12, V.rev ? finv(V.fn[k]) : V.fn[k], { size: 15, color: 'var(--ink-2)', w: 90, h: 20 }));
      }
      const nodes = V.sets.map((s, k) => s.map((x, i) => {
        const cx = xs[k], cy = top + offs[k] + padIn + (i + 0.5) * gap, hw = HW[k][i];
        const g = el('g', { class: 'w-dm-mn', tabindex: 0, role: 'button', transform: 'translate(' + fx(cx) + ',' + fx(cy) + ')' });
        g.dataset.c = k;
        g.dataset.i = i;
        const rg = el('rect', { class: 'rg', x: fx(-hw - 4.5), y: fx(-HH - 4.5), width: fx(2 * hw + 9), height: fx(2 * HH + 9), rx: fx(HH + 4.5) });
        const bx = el('rect', { class: 'bx', x: fx(-hw), y: fx(-HH), width: fx(2 * hw), height: fx(2 * HH), rx: fx(HH) });
        // a taller target for fingers: the whole row, but not wider than the element (arrowheads stay grabbable)
        g.append(el('rect', { x: fx(-hw), y: fx(-gap / 2), width: fx(2 * hw), height: fx(gap), style: 'fill:transparent;stroke:none' }));
        g.append(rg, bx, isTeX(x) ? foTeX(0, 0, x, { size: fs + 1, w: 2 * hw + 24, h: 2 * HH + 4 }) : el('text', { class: 'lb', x: 0, y: 0.5, style: 'font-size:' + fs + 'px', text: x }));
        let badge = null;
        if (k > 0) {
          badge = el('g', { class: 'w-dm-bdg', transform: 'translate(' + fx(hw - 1) + ',' + fx(-HH + 1) + ')' }, el('circle', { r: 7.5 }), el('text', { x: 0, y: 0.5 }));
          g.append(badge);
        }
        gN.append(g);
        return { g, bx, rg, badge, x: cx, y: cy, hw };
      }));
      L = { V, K, xs, gap, HH, nodes, gA, gG };
      describe();
      paint();
    }

    /** Nodes linked to node f by arrows: its images and all its preimages (keys "column:index"). */
    function reach(V, f) {
      const S = new Set([f.c + ':' + f.i]);
      let j = f.i;
      for (let k = f.c; k < V.maps.length; k++) { j = V.maps[k][j]; S.add((k + 1) + ':' + j); }
      let cur = new Set([f.i]);
      for (let k = f.c - 1; k >= 0; k--) {
        const nx = new Set();
        V.maps[k].forEach((jj, i) => { if (cur.has(jj)) nx.add(i); });
        nx.forEach((i) => S.add(k + ':' + i));
        cur = nx;
      }
      return S;
    }
    /** A read-out for the element under the pointer (or focused): its image and its preimage. */
    function focusTeX(V, f) {
      const { c, i } = f, K = V.sets.length;
      const nm = (k, j) => elTeX(V.sets[k][j]);
      const parts = [];
      if (c > 0) {
        const pre = V.sets[c - 1].filter((_, a) => V.maps[c - 1][a] === i);
        parts.push(finv(V.fn[c - 1]) + '(\\{' + nm(c, i) + '\\}) = ' + listTeX(pre));
        if (c === 2) parts.push(finv('g\\circ f') + '(\\{' + nm(c, i) + '\\}) = ' + listTeX(V.sets[0].filter((_, a) => V.maps[1][V.maps[0][a]] === i)));
      }
      if (c < K - 1) {
        if (K === 3 && c === 0) { const b = V.maps[0][i]; parts.push('g(f(' + nm(0, i) + ')) = g(' + nm(1, b) + ') = ' + nm(2, V.maps[1][b])); }
        else parts.push(app(V.fn[c], nm(c, i)) + ' = ' + nm(c + 1, V.maps[c][i]));
      }
      return MA.texEl(parts.join(',\\qquad '));
    }

    function paint() {
      if (!L) return;
      const { V, K, nodes } = L;
      // colours: each point of the last column has its own; every other point takes the colour of its image
      const col = V.sets.map((s) => new Array(s.length));
      const nl = V.sets[K - 1].length;
      for (let i = 0; i < nl; i++) col[K - 1][i] = cat(i, nl);
      for (let k = K - 2; k >= 0; k--) V.maps[k].forEach((j, i) => { col[k][i] = col[k + 1][j]; });
      const cnt = V.sets.map((s) => new Array(s.length).fill(0));
      V.maps.forEach((mm, k) => mm.forEach((j) => { cnt[k + 1][j]++; }));
      const dragging = !!(press && press.drag);
      const focusN = dragging || sel ? null : hov || pin;
      const hl = focusN ? reach(V, focusN) : null;
      nodes.forEach((cn, k) => cn.forEach((q, i) => {
        const miss = k > 0 && cnt[k][i] === 0;
        let cls = 'w-dm-mn';
        if (miss) cls += ' miss';
        if (hl && !hl.has(k + ':' + i)) cls += ' dim';
        if ((sel && sel.k === k && sel.i === i) || (dragging && ((press.c === k && press.i === i) || (press.c + 1 === k && press.cand === i)))) cls += ' sel';
        else if (sel && k === sel.k + 1) cls += ' cand';
        else if (V.rev && k === 1 && cnt[1][i] !== 1) cls += ' bad';
        q.g.setAttribute('class', cls);
        const c = col[k][i];
        q.bx.style.fill = miss ? 'var(--plot-bg)' : tint(c, k === K - 1 ? 32 : 20);
        q.bx.style.stroke = miss ? 'var(--ink-3)' : c;
        if (q.badge) {
          const n0 = cnt[k][i];
          q.badge.style.display = n0 === 1 ? 'none' : '';
          q.badge.firstChild.setAttribute('style', n0 ? 'fill:var(--ink-2);stroke:var(--plot-bg)' : 'fill:var(--plot-bg);stroke:var(--bad)');
          q.badge.lastChild.textContent = String(n0);
          q.badge.lastChild.style.fill = n0 ? 'var(--plot-bg)' : 'var(--bad)';
        }
        const say = [];
        if (k > 0) say.push(T('preimage %s', '{' + V.sets[k - 1].filter((_, a) => V.maps[k - 1][a] === i).join(', ') + '}'));
        if (k < K - 1) say.push(T('sent to %s', V.sets[k + 1][V.maps[k][i]]));
        q.g.setAttribute('aria-label', V.sets[k][i] + ': ' + say.join(', '));
      }));
      L.gA.replaceChildren();
      V.maps.forEach((mm, k) => mm.forEach((j, i) => {
        const a = nodes[k][i], b = nodes[k + 1][j];
        let cls = 'w-dm-ma' + (V.edit ? ' ed' : '');
        if (dragging && press.c === k && press.i === i) cls += ' dim';
        else if (hl) cls += hl.has(k + ':' + i) && hl.has((k + 1) + ':' + j) ? ' hl' : ' dim';
        const ar = V.rev ? nodeArrow(b, a, L.HH) : nodeArrow(a, b, L.HH);
        if (!ar) return;
        const c = col[k + 1][j];
        const g = el('g', { class: cls });
        g.dataset.k = k;
        g.dataset.i = i;
        g.append(el('path', { class: 'hit', d: ar.line }), el('path', { class: 'v', d: ar.line, style: 'stroke:' + c }), el('path', { d: ar.head, style: 'fill:' + c }));
        L.gA.append(g);
      }));
      L.gG.replaceChildren();
      if (dragging) {
        const a = nodes[press.c][press.i];
        const ar = press.cand >= 0 ? nodeArrow(a, nodes[press.c + 1][press.cand], L.HH) : nodeArrow(a, { x: press.px, y: press.py, hw: 0 }, L.HH, true);
        if (ar) L.gG.append(el('path', { d: ar.line, style: 'fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round' + (press.cand >= 0 ? '' : ';stroke-dasharray:6 5') }), el('path', { d: ar.head, style: 'fill:var(--accent)' }));
      }
      statusEl.replaceChildren();
      if (dragging) statusEl.append(el('span', { class: 'w-dm-status', text: T('Drop the arrow on its new image.') }));
      else if (sel) { const st = tmpl(T('Now click the new image of %s (Esc cancels).'), nameNode(V.sets[sel.k][sel.i])); st.className = 'w-dm-status'; statusEl.append(st); }
      else if (focusN) statusEl.append(focusTeX(V, focusN));
      statusEl.hidden = !statusEl.firstChild;
      fibChips.forEach((ch, j) => ch.classList.toggle('on', !!hl && hl.has((K - 1) + ':' + j)));
    }

    const vline = (ok, word, hint, node) => el('span', null, el('span', { class: ok ? 'w-dm-ok' : 'w-dm-no', text: (ok ? '✓ ' : '✗ ') + word }),
      hint ? ' ' : null, hint ? el('span', { class: 'w-dm-hint', text: hint }) : null, node ? ' ' : null, node || null);
    /** Injective / surjective / bijective, each with its reason. */
    function verdictLines(m, X, Y, fn, Xn, Yn, counting) {
      const an = analyseMap(m, Y.length);
      const out = [];
      out.push(an.inj ? vline(true, T('injective'), T('— no two arrows end at the same point'))
        : vline(false, T('not injective:'), null, MA.texEl(an.fib[an.multi].map((i) => app(fn, elTeX(X[i]))).join(' = ') + ' = ' + elTeX(Y[an.multi]))));
      out.push(an.surj ? vline(true, T('surjective'), T('— every element of %s is hit', Yn))
        : vline(false, T('not surjective:'), null, MA.texEl(an.missed.map((j) => elTeX(Y[j])).join(', ') + ' \\notin ' + app(fn, Xn) + ' = ' + listTeX(Y.filter((_, j) => an.fib[j].length)))));
      out.push(an.inj && an.surj ? vline(true, T('bijective'), null, el('span', null, T('— it has an inverse'), ' ', MA.texEl(finv(fn) + '\\colon ' + Yn + '\\to ' + Xn)))
        : vline(false, T('not bijective'), null, null));
      const sizes = an.fib.map((l) => l.length);
      if (sizes[0] >= 2 && sizes.every((q) => q === sizes[0])) out.push(el('span', { class: 'w-dm-hint', text: T('Every point of %s has a preimage of %d elements, so |%s| = %d = %d × %d.', Yn, sizes[0], Xn, X.length, sizes[0], Y.length) }));
      if (counting) {
        const a = X.length, b = Y.length;
        out.push(el('span', { class: 'w-dm-hint', text: a > b ? T('|%s| = %d > %d = |%s|: two of the arrows must end at the same point (pigeonhole principle), so no function %s → %s is injective.', Xn, a, b, Yn, Xn, Yn)
          : a < b ? T('|%s| = %d < %d = |%s|: %d arrows cannot reach %d points, so no function %s → %s is surjective.', Xn, a, b, Yn, a, b, Xn, Yn)
            : T('|%s| = |%s| = %d: a function %s → %s is injective exactly when it is surjective.', Xn, Yn, a, Xn, Yn) }));
      }
      return out;
    }
    function inverseLines() {
      const an = analyseMap(maps[0], B.length);
      if (an.inj && an.surj) {
        const inv = new Array(B.length);
        maps[0].forEach((j, i) => { inv[j] = i; });
        return [
          vline(true, T('the reversed arrows form a function'), null, MA.texEl('f^{-1}\\colon B\\to A')),
          el('span', { class: 'w-dm-list' }, ...B.map((b, j) => MA.texEl('f^{-1}(' + elTeX(b) + ') = ' + elTeX(A[inv[j]])))),
          el('span', { class: 'w-dm-hint', text: T('Going there and back changes nothing: f⁻¹(f(a)) = a for every a in A, and f(f⁻¹(b)) = b for every b in B.') }),
        ];
      }
      const out = [vline(false, T('the reversed arrows do not form a function from B to A:'), null, null)];
      an.fib.forEach((l, j) => {
        if (l.length > 1) out.push(el('span', null, '• ', MA.texEl(elTeX(B[j])), ' ', T('would have %d images:', l.length), ' ', MA.texEl(l.map((i) => elTeX(A[i])).join(',\\ '))));
      });
      if (!an.surj) out.push(el('span', null, '• ', MA.texEl(an.missed.map((j) => elTeX(B[j])).join(', ')), ' ', T('would have no image')));
      out.push(el('span', { class: 'w-dm-hint', text: T('Reversing the arrows gives a function exactly when f is bijective: injective means that no point of B has two arrows, surjective that none has no arrow.') }));
      return out;
    }
    function chainLines() {
      const [X, Y, Z] = sets;
      const rows = [[maps[0], Y, 'f\\colon A\\to B'], [maps[1], Z, 'g\\colon B\\to C'], [gfMap(), Z, 'g\\circ f\\colon A\\to C']];
      const an = rows.map((r) => analyseMap(r[0], r[1].length));
      const mk = (ok) => (ok ? { t: '✓', cls: 'good' } : { t: '✗', cls: 'bad' });
      const out = [table(['', T('injective'), T('surjective'), T('bijective')], rows.map((r, k) => [{ tex: r[2] }, mk(an[k].inj), mk(an[k].surj), mk(an[k].inj && an[k].surj)]), { cls: 'w-dm-chain' })];
      if (an[2].inj && !an[1].inj) out.push(el('span', null, T('Here g∘f is injective although g is not — but f has to be injective.')));
      if (an[2].surj && !an[0].surj) out.push(el('span', null, T('Here g∘f is surjective although f is not — but g has to be surjective.')));
      out.push(el('span', { class: 'w-dm-hint', text: T('If g∘f is injective then so is f; if g∘f is surjective then so is g. Composites of injections are injective, and composites of surjections are surjective.') }));
      void X;
      return out;
    }
    function describe() {
      const V = L.V, K = L.K;
      if (view === 'inv') info.set(...inverseLines());
      else if (chain && view === 'map') info.set(...chainLines());
      else info.set(...verdictLines(V.maps[0], V.sets[0], V.sets[1], V.fn[0], V.names[0], V.names[1], view === 'map' && editable));
      // preimages of the points of the last column: the non-empty ones partition the first column
      const first = V.sets[0], last = V.sets[K - 1];
      let tot = first.map((_, i) => i);
      V.maps.forEach((mm) => { tot = tot.map((j) => mm[j]); });
      const fnAll = K === 3 ? 'g\\circ f' : V.fn[0];
      fibEl.replaceChildren(el('span', { class: 'k', text: T('Preimages of the points of %s (the non-empty ones partition %s):', V.names[K - 1], V.names[0]) }));
      fibChips = last.map((y, j) => {
        const ch = el('span', { class: 'w-dm-fib' }, el('span', { class: 'w-dm-sw', style: 'background:' + cat(j, last.length) }),
          MA.texEl(finv(fnAll) + '(\\{' + elTeX(y) + '\\}) = ' + listTeX(first.filter((_, i) => tot[i] === j))));
        ch.addEventListener('pointerenter', safe(() => { if (!press) { hov = { c: K - 1, i: j }; paint(); } }));
        ch.addEventListener('pointerleave', safe(() => { if (!press) { hov = null; paint(); } }));
        fibEl.append(ch);
        return ch;
      });
      hintEl.textContent = V.edit ? (K === 3 ? T('Drag an arrow to a new image, or click an element and then its new image. Keyboard: Tab to an element, then press ↑ or ↓.')
        : T('Drag an arrow to another element of B, or click an element of A and then its new image. Keyboard: Tab to an element of A, then press ↑ or ↓.'))
        : editable ? T('Point at (or tap) an element to see its image and its preimage. Switch back to edit the arrows.')
          : T('Point at (or tap) an element to see its image and its preimage.');
      if (btnInv) { const an = analyseMap(maps[0], B.length); btnInv.el.textContent = an.inj && an.surj ? T('Show the inverse') : T('Reverse the arrows'); }
    }

    function assign(k, i, j) {
      maps[k][i] = j;
      sel = null;
      describe();
      paint();
    }
    /** A click (or Enter) on node (c, i). */
    function activate(c, i) {
      const V = L.V;
      if (sel && V.edit && c === sel.k + 1) { assign(sel.k, sel.i, i); return; }
      if (V.edit && c < L.K - 1) { sel = sel && sel.k === c && sel.i === i ? null : { k: c, i }; pin = null; paint(); return; }
      sel = null;
      pin = pin && pin.c === c && pin.i === i ? null : { c, i };
      paint();
    }
    function dragTo(x, y) {
      const k = press.c, tg = L.nodes[k + 1];
      let best = -1, bd = Infinity;
      tg.forEach((q, j) => { const d = Math.hypot(x - q.x, y - q.y); if (d < bd) { bd = d; best = j; } });
      const near = bd < Math.max(36, L.gap * 0.9) || (x > (L.xs[k] + L.xs[k + 1]) / 2 && Math.abs(y - tg[best].y) < L.gap * 0.6 + 6);
      press.cand = near ? best : -1;
      press.px = x;
      press.py = y;
      paint();
    }
    const svg = box.svg;
    const hitOf = (ev) => {
      const t = ev.target && ev.target.closest ? ev.target.closest('[data-c],[data-k]') : null;
      if (!t) return null;
      return t.dataset.k !== undefined ? { c: +t.dataset.k, i: +t.dataset.i, arrow: true } : { c: +t.dataset.c, i: +t.dataset.i, arrow: false };
    };
    svg.addEventListener('pointerdown', safe((ev) => {
      if (ev.button !== undefined && ev.button !== 0) return;
      const h = hitOf(ev);
      if (!h) { if (sel || pin) { sel = null; pin = null; paint(); } return; }
      const canDrag = L.V.edit && h.c < L.K - 1;
      press = { c: h.c, i: h.i, x0: ev.clientX, y0: ev.clientY, drag: false, cand: -1, canDrag };
      if (canDrag) { try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* not capturable */ } }
      ev.preventDefault();
    }, report));
    svg.addEventListener('pointermove', safe((ev) => {
      if (press) {
        if (!press.canDrag) return;
        if (!press.drag && Math.hypot(ev.clientX - press.x0, ev.clientY - press.y0) > 5) { press.drag = true; sel = null; pin = null; }
        if (press.drag) { const [x, y] = box.pt(ev); dragTo(x, y); }
        return;
      }
      const h = hitOf(ev);
      const nh = h ? { c: h.c, i: h.i } : null;
      if ((nh === null) !== (hov === null) || (nh && (nh.c !== hov.c || nh.i !== hov.i))) { hov = nh; paint(); }
    }, report));
    svg.addEventListener('pointerup', safe(() => {
      if (!press) return;
      const p = press;
      press = null;
      if (p.drag) { if (p.cand >= 0) assign(p.c, p.i, p.cand); else paint(); return; }
      activate(p.c, p.i);
    }, report));
    svg.addEventListener('pointercancel', safe(() => { if (press) { press = null; paint(); } }, report));
    svg.addEventListener('lostpointercapture', safe(() => { if (press && press.drag) { press = null; paint(); } }, report));
    svg.addEventListener('pointerleave', safe(() => {
      if (press && !press.canDrag) press = null;
      if (!press && hov) { hov = null; paint(); }
    }, report));
    svg.addEventListener('focusin', safe((ev) => {
      const t = ev.target.closest && ev.target.closest('[data-c]');
      if (t) { hov = { c: +t.dataset.c, i: +t.dataset.i }; paint(); }
    }, report));
    svg.addEventListener('focusout', safe(() => { if (hov) { hov = null; paint(); } }, report));
    svg.addEventListener('keydown', safe((ev) => {
      const t = ev.target.closest && ev.target.closest('[data-c]');
      if (!t) return;
      const c = +t.dataset.c, i = +t.dataset.i, V = L.V;
      if (ev.key === 'Escape') { if (sel || pin) { sel = null; pin = null; paint(); } return; }
      if ((ev.key === 'ArrowUp' || ev.key === 'ArrowDown') && V.edit && c < L.K - 1) {
        ev.preventDefault();
        const n = V.sets[c + 1].length;
        assign(c, i, (V.maps[c][i] + (ev.key === 'ArrowDown' ? 1 : n - 1)) % n);
        hov = { c, i };
        paint();
        return;
      }
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); activate(c, i); }
    }, report));

    let btnInv = null, segV = null;
    if (!chain) btnInv = MA.ui.toggle(bar, { label: T('Reverse the arrows'), value: false, onChange: safe((v) => { view = v ? 'inv' : 'map'; sel = pin = hov = null; build(); }, report) });
    else segV = MA.ui.seg(bar, { options: [['map', 'f,\\ g'], ['comp', 'g\\circ f']], value: 'map', onChange: safe((v) => { view = v; sel = pin = hov = null; build(); }, report) });
    if (editable) {
      MA.ui.button(bar, { label: T('Reset'), onClick: safe(() => {
        orig.forEach((o, k) => o.forEach((j, i) => { maps[k][i] = j; }));
        sel = pin = hov = null;
        if (view !== 'map') { view = 'map'; if (btnInv) btnInv.set(false); if (segV) segV.set('map'); build(); } else { describe(); paint(); }
      }, report) });
    }
    build();
  });

  // ================================================================== relation
  const REL_MAX = 12;
  const REL_OPS = [',', '->', '→', '>'];
  /** Pairs "a,b; b,c" of elements of S as a 0–1 matrix (rows: first element). */
  function parsePairs(v, S) {
    const idx = new Map(S.map((x, i) => [x, i]));
    const n = S.length;
    const R = Array.from({ length: n }, () => new Uint8Array(n));
    for (const s of C.list(v)) {
      const body = s.replace(/^[([]\s*/, '').replace(/\s*[)\]]$/, '').trim();
      let hit = null;
      for (const op of REL_OPS) {
        for (let p = body.indexOf(op); p >= 0 && !hit; p = body.indexOf(op, p + 1)) {
          const a = body.slice(0, p).trim(), b = body.slice(p + op.length).trim();
          if (idx.has(a) && idx.has(b)) hit = [idx.get(a), idx.get(b)];
        }
        if (hit) break;
      }
      if (!hit) {
        const m = /^(.*?)\s*(,|->|→|>)\s*(.*)$/.exec(body);
        if (!m || !m[1].trim() || !m[3].trim()) throw new Error(T('pairs: write each pair as a,b (got “%s”)', s));
        const bad = idx.has(m[1].trim()) ? m[3].trim() : m[1].trim();
        throw new Error(T('pairs: “%s” in (%s) is not in the set (%s)', bad, body, S.join(', ')));
      }
      R[hit[0]][hit[1]] = 1;
    }
    return R;
  }
  /** The first counterexample to each property, or null when the property holds. */
  function relCheck(R, n) {
    let refl = null, sym = null, anti = null, trans = null;
    for (let a = 0; a < n && !refl; a++) if (!R[a][a]) refl = [a];
    for (let a = 0; a < n && !sym; a++) for (let b = 0; b < n && !sym; b++) if (R[a][b] && !R[b][a]) sym = [a, b];
    for (let a = 0; a < n && !anti; a++) for (let b = 0; b < n && !anti; b++) if (a !== b && R[a][b] && R[b][a]) anti = [a, b];
    for (let a = 0; a < n && !trans; a++) {
      for (let b = 0; b < n && !trans; b++) {
        if (!R[a][b]) continue;
        for (let c = 0; c < n && !trans; c++) if (R[b][c] && !R[a][c]) trans = [a, b, c];
      }
    }
    return { refl, sym, anti, trans };
  }
  /** Transitive closure (Warshall). */
  function relClosure(R, n) {
    const Q = R.map((r) => Uint8Array.from(r));
    for (let k = 0; k < n; k++) for (let i = 0; i < n; i++) if (Q[i][k]) for (let j = 0; j < n; j++) if (Q[k][j]) Q[i][j] = 1;
    return Q;
  }
  /** Classes of an equivalence relation: class index of each element and the lists. */
  function relClasses(R, n) {
    const of = new Array(n).fill(-1), lists = [];
    for (let a = 0; a < n; a++) {
      if (of[a] >= 0) continue;
      const l = [];
      for (let b = 0; b < n; b++) if (R[a][b]) { of[b] = lists.length; l.push(b); }
      lists.push(l);
    }
    return { of, lists, k: lists.length };
  }

  MA.widget('relation', (stage, cfg) => {
    style2();
    const S = parseElems(cfg.set, 'set', REL_MAX);
    if (!S.length) throw new Error(T('relation: list the elements of the set, e.g. set: 1; 2; 3'));
    const n = S.length;
    const R = parsePairs(cfg.pairs, S);
    const R0 = R.map((r) => Uint8Array.from(r));
    const view = C.str(cfg.view, 'all').toLowerCase();
    if (!['all', 'properties', 'quantifiers'].includes(view)) throw new Error(T('relation: view must be all, properties or quantifiers'));
    const showP = view !== 'quantifiers', showQ = view !== 'properties';
    const editable = C.bool(cfg.editable, true);
    const name = C.str(cfg.name, 'R');
    const nm = isTeX(name) || /^[A-Za-z]$/.test(name) ? name : '\\mathrm{' + name.replace(/[\\{}$&#^_%~]/g, '') + '}';
    const pt = (a, b) => '(' + elTeX(S[a]) + ',' + elTeX(S[b]) + ')';
    let showCl = false, ceHov = null, cePin = null, hovC = null, hovV = null, pinV = null, propEls = {};
    MA.ui.title(stage, cfg.title);
    const row = el('div', { class: 'w-dm-rel' });
    stage.append(row);
    const gHost = el('div', { class: 'w-dm-relg' }), mHost = el('div', { class: 'w-dm-relm' });
    row.append(gHost, mHost);

    // ---- the directed graph: vertices on a circle
    const GW = 300, GC = GW / 2, GH = n <= 2 ? 170 : GW, GCY = GH / 2;
    const NR = n > 8 ? 13 : 15, fsN = n > 8 ? 11.5 : 13;
    const HWn = S.map((x) => Math.max(NR, labelWidth(x, fsN) / 2 + 6));
    const RG = n === 1 ? 0 : n === 2 ? 72 : Math.max(60, 100 - (Math.max(...HWn) - NR));
    const NP = (n === 2 ? [[GC - RG, GCY], [GC + RG, GCY]] : n === 1 ? [[GC, GCY + 12]] : circlePts(n, GC, GCY, RG)).map(([x, y], i) => ({ x, y, hw: HWn[i] }));
    const box = svgBox(gHost, GW, GH, { label: T('Directed graph of the relation') });
    const gE = el('g'), gO = el('g'), gN = el('g');
    box.svg.append(gE, gO, gN);
    const VN = S.map((x, i) => {
      const hw = HWn[i];
      const g = el('g', { transform: 'translate(' + fx(NP[i].x) + ',' + fx(NP[i].y) + ')' });
      const rg = el('rect', { x: fx(-hw - 4.5), y: fx(-NR - 4.5), width: fx(2 * hw + 9), height: fx(2 * NR + 9), rx: fx(NR + 4.5), style: 'fill:none;stroke:var(--accent);stroke-width:2.6;display:none' });
      const bx = el('rect', { x: fx(-hw), y: -NR, width: fx(2 * hw), height: 2 * NR, rx: NR, style: 'stroke-width:2' });
      g.append(rg, bx, isTeX(x) ? foTeX(0, 0, x, { size: fsN + 1, w: 2 * hw + 24, h: 2 * NR + 4 }) : el('text', { class: 'w-dm-nt', x: 0, y: 0.5, style: 'font-size:' + fsN + 'px', text: x }));
      gN.append(g);
      return { rg, bx };
    });
    const outward = (i) => (n === 1 ? -Math.PI / 2 : Math.atan2(NP[i].y - GCY, NP[i].x - GC));
    function loopGeo(i) {
      const q = NP[i], ang = outward(i);
      const pa = (a, d) => [q.x + d * Math.cos(a), q.y + d * Math.sin(a)];
      const rr = (a) => stadiumR(q.hw, NR, Math.cos(a), Math.sin(a));
      const A = pa(ang - 0.5, rr(ang - 0.5)), Bp = pa(ang + 0.5, rr(ang + 0.5) + 1);
      const s = NR * 3.4 + (q.hw - NR);
      const C1 = pa(ang - 0.95, s), C2 = pa(ang + 0.95, s);
      return { d: 'M' + fx(A[0]) + ',' + fx(A[1]) + 'C' + fx(C1[0]) + ',' + fx(C1[1]) + ' ' + fx(C2[0]) + ',' + fx(C2[1]) + ' ' + fx(Bp[0]) + ',' + fx(Bp[1]),
        heads: [arrowHead(Bp[0], Bp[1], Bp[0] - C2[0], Bp[1] - C2[1], 9, 7)] };
    }
    function lineGeo(a, b, both) {
      const p = NP[a], q = NP[b];
      const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L;
      const r0 = stadiumR(p.hw, NR, ux, uy) + 1.5, r1 = stadiumR(q.hw, NR, ux, uy) + 1.5;
      const sx = p.x + ux * r0, sy = p.y + uy * r0, tx = q.x - ux * r1, ty = q.y - uy * r1;
      const heads = [arrowHead(tx, ty, ux, uy, 10, 7.5)];
      if (both) heads.push(arrowHead(sx, sy, -ux, -uy, 10, 7.5));
      return { d: 'M' + fx(sx + (both ? ux * 7 : 0)) + ',' + fx(sy + (both ? uy * 7 : 0)) + 'L' + fx(tx - ux * 7) + ',' + fx(ty - uy * 7), heads };
    }
    function curveGeo(a, b, bend) {
      const p = NP[a], q = NP[b];
      const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy) || 1;
      const cx = (p.x + q.x) / 2 - dy / L * bend, cy = (p.y + q.y) / 2 + dx / L * bend;
      const u0 = [cx - p.x, cy - p.y], u1 = [cx - q.x, cy - q.y];
      const l0 = Math.hypot(u0[0], u0[1]) || 1, l1 = Math.hypot(u1[0], u1[1]) || 1;
      const r0 = stadiumR(p.hw, NR, u0[0], u0[1]) + 1.5, r1 = stadiumR(q.hw, NR, u1[0], u1[1]) + 1.5;
      const sx = p.x + u0[0] / l0 * r0, sy = p.y + u0[1] / l0 * r0, tx = q.x + u1[0] / l1 * r1, ty = q.y + u1[1] / l1 * r1;
      const ux = -u1[0] / l1, uy = -u1[1] / l1;
      return { d: 'M' + fx(sx) + ',' + fx(sy) + 'Q' + fx(cx) + ',' + fx(cy) + ' ' + fx(tx - ux * 7) + ',' + fx(ty - uy * 7), heads: [arrowHead(tx, ty, ux, uy, 10, 7.5)] };
    }
    function drawGeo(layer, g, color, o = {}) {
      const op = o.op !== undefined && o.op < 1 ? ';opacity:' + o.op : '';
      layer.append(el('path', { d: g.d, style: 'fill:none;stroke:' + color + ';stroke-width:' + (o.w || 1.8) + ';stroke-linecap:round' + (o.dash ? ';stroke-dasharray:' + o.dash : '') + op }));
      g.heads.forEach((h) => layer.append(el('path', { d: h, style: 'fill:' + color + op })));
    }

    // ---- the 0–1 matrix (row x, column y), with ∃ / ∀ margins
    const cs = n <= 6 ? 34 : n <= 9 ? 30 : 27;
    const tbl = el('table', { class: 'w-dm-mat', style: '--cs:' + cs + 'px' });
    const lab = (x) => (isTeX(x) ? MA.texEl(x) : document.createTextNode(x));
    const hr = el('tr', null, el('th', { class: 'q' }, MA.texEl(nm)));
    const colHead = S.map((y) => { const th = el('th', { scope: 'col' }, lab(y)); hr.append(th); return th; });
    if (showQ) hr.append(el('th', { class: 'q', title: T('Does the row contain a 1?') }, MA.texEl('\\exists y')));
    tbl.append(el('thead', null, hr));
    const tb = el('tbody');
    const rowHead = [], rowMark = [], cells = [];
    S.forEach((x, a) => {
      const tr = el('tr');
      const th = el('th', { scope: 'row' }, lab(x));
      rowHead.push(th);
      tr.append(th);
      cells.push(S.map((_, b) => {
        const btn = el('button', { type: 'button', class: 'w-dm-cell', tabindex: a === 0 && b === 0 ? 0 : -1 });
        btn.addEventListener('click', safe(() => toggle(a, b), report));
        btn.addEventListener('pointerenter', safe(() => { hovC = [a, b]; paint(); }, report));
        btn.addEventListener('pointerleave', safe(() => { hovC = null; paint(); }, report));
        btn.addEventListener('focus', safe(() => { cells.forEach((r) => r.forEach((c) => { c.tabIndex = -1; })); btn.tabIndex = 0; hovC = [a, b]; paint(); }, report));
        btn.addEventListener('blur', safe(() => { hovC = null; paint(); }, report));
        btn.addEventListener('keydown', safe((ev) => {
          const d = { ArrowLeft: [0, -1], ArrowRight: [0, 1], ArrowUp: [-1, 0], ArrowDown: [1, 0] }[ev.key];
          if (!d) return;
          ev.preventDefault();
          cells[Math.max(0, Math.min(n - 1, a + d[0]))][Math.max(0, Math.min(n - 1, b + d[1]))].focus();
        }, report));
        tr.append(el('td', null, btn));
        return btn;
      }));
      if (showQ) { const td = el('td', { class: 'w-dm-mk' }); rowMark.push(td); tr.append(td); }
      tb.append(tr);
    });
    let colMark = [];
    if (showQ) {
      const tr = el('tr', null, el('th', { class: 'q', title: T('Is the column full?') }, MA.texEl('\\forall x')));
      colMark = S.map(() => { const td = el('td', { class: 'w-dm-mk' }); tr.append(td); return td; });
      tr.append(el('td'));
      tb.append(tr);
    }
    tbl.append(tb);
    mHost.append(tbl, el('div', { class: 'w-dm-hint w-dm-matcap' }, T('row x, column y: 1 when'), ' ', MA.texEl('(x,y)\\in ' + nm)));

    const bar = showP || editable ? MA.ui.bar(stage) : null;
    const info = MA.ui.info(stage);
    const panel = el('div', { class: 'w-dm-panel' });
    const stEl = el('div', { class: 'w-dm-msg', hidden: true }), clEl = el('div', { class: 'w-dm-row', hidden: true }), hintEl = el('div', { class: 'w-dm-hint' });
    panel.append(stEl, clEl, hintEl);
    stage.append(panel);
    function report(m) { stEl.hidden = false; stEl.replaceChildren(el('span', { class: 'w-err', text: m })); }
    hintEl.textContent = (editable ? T('Click entries of the matrix (or use the arrow keys and Enter) to add or remove pairs.') + MA.sep : '') + (showP ? T('Point at a failed property to see its counterexample.') : '');
    if (!hintEl.textContent) hintEl.hidden = true;

    function toggle(a, b) {
      if (!editable) return;
      R[a][b] ^= 1;
      describe();
      paint();
    }

    function paint() {
      const pr = relCheck(R, n);
      const cl = !pr.refl && !pr.sym && !pr.trans ? relClasses(R, n) : null;
      const Q = showCl ? relClosure(R, n) : null;
      // pairs to highlight: a counterexample (pointed at or pinned) …
      const kind = ceHov || cePin, ce = kind ? pr[kind] : null;
      const pres = new Set(), miss = new Set();
      if (ce) {
        if (kind === 'refl') miss.add(ce[0] + ',' + ce[0]);
        else if (kind === 'sym') { pres.add(ce[0] + ',' + ce[1]); miss.add(ce[1] + ',' + ce[0]); }
        else if (kind === 'anti') { pres.add(ce[0] + ',' + ce[1]); pres.add(ce[1] + ',' + ce[0]); }
        else { pres.add(ce[0] + ',' + ce[1]); pres.add(ce[1] + ',' + ce[2]); miss.add(ce[0] + ',' + ce[2]); }
      }
      // … or the matrix entry under the pointer; the vertex under the pointer (or tapped)
      const hc = ce ? null : hovC;
      const hv = hovV !== null ? hovV : pinV;
      VN.forEach((q, i) => {
        const col = cl ? cat(cl.of[i], cl.k) : null;
        q.bx.style.fill = col ? tint(col, 35) : 'var(--plot-bg)';
        q.bx.style.stroke = col || 'var(--ink-2)';
        const bad = !!(ce && ce.includes(i));
        q.rg.style.display = bad || hv === i || (hc && (hc[0] === i || hc[1] === i)) ? '' : 'none';
        q.rg.style.stroke = bad ? 'var(--bad)' : 'var(--accent)';
      });
      gE.replaceChildren();
      gO.replaceChildren();
      const dim = !!(ce || hc);
      const opOf = (a, b) => (hv !== null && !dim ? (a === hv || b === hv ? 1 : 0.25) : dim ? 0.3 : 1);
      for (let a = 0; a < n; a++) {
        for (let b = a; b < n; b++) {
          if (a === b) {
            if (R[a][a]) drawGeo(gE, loopGeo(a), 'var(--ink-2)', { op: opOf(a, a) });
            else if (Q && Q[a][a]) drawGeo(gE, loopGeo(a), 'var(--series-2)', { dash: '5 4', op: opOf(a, a) });
            continue;
          }
          const ab = R[a][b], ba = R[b][a];
          if (ab && ba) drawGeo(gE, lineGeo(a, b, true), 'var(--ink-2)', { op: opOf(a, b), w: 2.4 });
          else if (ab) drawGeo(gE, lineGeo(a, b), 'var(--ink-2)', { op: opOf(a, b) });
          else if (ba) drawGeo(gE, lineGeo(b, a), 'var(--ink-2)', { op: opOf(a, b) });
          if (Q && !ab && Q[a][b]) drawGeo(gE, curveGeo(a, b, 16), 'var(--series-2)', { dash: '5 4', op: opOf(a, b) });
          if (Q && !ba && Q[b][a]) drawGeo(gE, curveGeo(b, a, 16), 'var(--series-2)', { dash: '5 4', op: opOf(a, b) });
        }
      }
      const over = (a, b, color, ghost) => drawGeo(gO, a === b ? loopGeo(a) : ghost ? curveGeo(a, b, 20) : lineGeo(a, b), color, { w: ghost ? 2.2 : 3.2, dash: ghost ? '5 4' : null });
      pres.forEach((k) => { const [a, b] = k.split(',').map(Number); over(a, b, 'var(--bad)', false); });
      miss.forEach((k) => { const [a, b] = k.split(',').map(Number); over(a, b, 'var(--bad)', true); });
      if (hc) over(hc[0], hc[1], 'var(--accent)', !R[hc[0]][hc[1]]);
      // the matrix
      let count = 0;
      for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
          const btn = cells[a][b], on = !!R[a][b], add = !on && !!(Q && Q[a][b]), key = a + ',' + b;
          if (on) count++;
          let c = 'w-dm-cell' + (a === b ? ' diag' : '') + (on ? ' on' : add ? ' add' : '');
          if (pres.has(key)) c += ' ce';
          else if (miss.has(key)) c += ' ghost';
          else if (hc && hc[0] === a && hc[1] === b) c += ' hot';
          if (!editable) c += ' ro';
          btn.className = c;
          btn.textContent = on || add ? '1' : '0';
          btn.setAttribute('aria-pressed', String(on));
          btn.setAttribute('aria-label', '(' + S[a] + ', ' + S[b] + ') ' + (on ? '∈' : '∉') + ' ' + name);
        }
      }
      rowHead.forEach((th, a) => { th.classList.toggle('hot', !!(hc && hc[0] === a) || hv === a); th.style.color = cl ? cat(cl.of[a], cl.k) : ''; });
      colHead.forEach((th, b) => { th.classList.toggle('hot', !!(hc && hc[1] === b) || hv === b); th.style.color = cl ? cat(cl.of[b], cl.k) : ''; });
      rowMark.forEach((td, a) => { const ok = R[a].some((v) => v); td.className = 'w-dm-mk ' + (ok ? 'yes' : 'no'); td.textContent = ok ? '✓' : '✗'; });
      colMark.forEach((td, b) => { let full = true; for (let a = 0; a < n; a++) if (!R[a][b]) full = false; td.className = 'w-dm-mk' + (full ? ' yes' : ''); td.textContent = full ? '✓' : '–'; });
      box.svg.setAttribute('aria-label', T('Directed graph of the relation: %d pairs', count));
      Object.keys(propEls).forEach((k) => propEls[k].classList.toggle('on', cePin === k));
      // status: the vertex or matrix entry under the pointer
      stEl.replaceChildren();
      if (hv !== null && !hc) {
        const img = S.filter((_, b) => R[hv][b]);
        stEl.append(MA.texEl(cl ? '[' + elTeX(S[hv]) + '] = ' + listTeX(img) : '\\{y : (' + elTeX(S[hv]) + ',y)\\in ' + nm + '\\} = ' + listTeX(img)));
      } else if (hc) {
        stEl.append(MA.texEl(pt(hc[0], hc[1]) + (R[hc[0]][hc[1]] ? ' \\in ' : ' \\notin ') + nm), ' ', el('span', { class: 'w-dm-hint', text: !editable ? '' : R[hc[0]][hc[1]] ? T('— click to remove it') : T('— click to add it') }));
      }
      stEl.hidden = !stEl.firstChild;
      panel.hidden = stEl.hidden && clEl.hidden && hintEl.hidden;
    }

    function propLine(kind, c) {
      const ok = !c;
      const words = { refl: [T('reflexive'), T('not reflexive:')], sym: [T('symmetric'), T('not symmetric:')], anti: [T('antisymmetric'), T('not antisymmetric:')], trans: [T('transitive'), T('not transitive:')] };
      const hints = { refl: T('— every element is related to itself: the diagonal is full'), sym: T('— every arrow has its reverse: the matrix is symmetric'),
        anti: T('— no two different elements are related both ways'), trans: T('— every path x → y → z has the shortcut x → z') };
      const s = el('div', { class: 'w-dm-prop' + (ok ? '' : ' ce') }, el('span', { class: ok ? 'w-dm-ok' : 'w-dm-no', text: (ok ? '✓ ' : '✗ ') + words[kind][ok ? 0 : 1] }), ' ');
      if (ok) { s.append(el('span', { class: 'w-dm-hint', text: hints[kind] })); return s; }
      const inR = (ps) => MA.texEl(ps.map(([a, b]) => pt(a, b)).join(', ') + ' \\in ' + nm);
      const notR = (a, b) => MA.texEl(pt(a, b) + ' \\notin ' + nm);
      if (kind === 'refl') s.append(notR(c[0], c[0]));
      else if (kind === 'sym') s.append(inR([[c[0], c[1]]]), ' ', T('but'), ' ', notR(c[1], c[0]));
      else if (kind === 'anti') s.append(inR([[c[0], c[1]], [c[1], c[0]]]), ' ', T('but'), ' ', MA.texEl(elTeX(S[c[0]]) + ' \\ne ' + elTeX(S[c[1]])));
      else s.append(inR([[c[0], c[1]], [c[1], c[2]]]), ' ', T('but'), ' ', notR(c[0], c[2]));
      s.tabIndex = 0;
      s.setAttribute('role', 'button');
      s.title = T('Show this counterexample in the graph and the matrix');
      s.addEventListener('pointerenter', safe(() => { ceHov = kind; paint(); }, report));
      s.addEventListener('pointerleave', safe(() => { ceHov = null; paint(); }, report));
      s.addEventListener('focus', safe(() => { ceHov = kind; paint(); }, report));
      s.addEventListener('blur', safe(() => { ceHov = null; paint(); }, report));
      const pinIt = safe(() => { cePin = cePin === kind ? null : kind; paint(); }, report);
      s.addEventListener('click', pinIt);
      s.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); pinIt(); } });
      return s;
    }
    function describe() {
      ceHov = null;
      const pr = relCheck(R, n);
      if (cePin && !pr[cePin]) cePin = null;
      const parts = [];
      propEls = {};
      if (showP) {
        const blk = el('div', { class: 'w-dm-v' });
        ['refl', 'sym', 'anti', 'trans'].forEach((k) => { propEls[k] = propLine(k, pr[k]); blk.append(propEls[k]); });
        if (!pr.refl && !pr.sym && !pr.trans) {
          const cl = relClasses(R, n);
          const line = el('div', { class: 'w-dm-row' }, el('span', { class: 'w-dm-ok', text: '✓ ' + T('equivalence relation') }), el('span', { class: 'w-dm-hint', text: cl.k === 1 ? T('— a single class:') : T('— %d classes:', cl.k) }));
          cl.lists.forEach((l, c) => line.append(el('span', { class: 'w-dm-cls' }, el('span', { class: 'w-dm-sw', style: 'background:' + cat(c, cl.k) }), MA.texEl(listTeX(l.map((i) => S[i]))))));
          blk.append(line);
        }
        if (!pr.refl && !pr.anti && !pr.trans) {
          let total = true;
          for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b && !R[a][b] && !R[b][a]) total = false;
          blk.append(el('div', null, el('span', { class: 'w-dm-ok', text: '✓ ' + (total ? T('total order') : T('partial order')) }), ' ',
            el('span', { class: 'w-dm-hint', text: total ? T('— reflexive, antisymmetric and transitive, and any two elements are comparable') : T('— reflexive, antisymmetric and transitive') })));
        }
        parts.push(blk);
      }
      if (showQ) {
        let badRow = -1, fullCol = -1;
        for (let a = 0; a < n && badRow < 0; a++) if (!R[a].some((v) => v)) badRow = a;
        for (let b = 0; b < n && fullCol < 0; b++) { let full = true; for (let a = 0; a < n; a++) if (!R[a][b]) full = false; if (full) fullCol = b; }
        const q = (tex, val, why) => { why.className = 'w-dm-hint'; return el('div', null, MA.texEl(tex), ' ', el('span', { class: val ? 'w-dm-ok' : 'w-dm-no', text: val ? T('is true') : T('is false') }), ' ', why); };
        parts.push(el('div', { class: 'w-dm-v' },
          q('\\forall x\\;\\exists y\\;\\; ' + nm + '(x,y)', badRow < 0, badRow < 0 ? tmpl(T('— every row contains a 1')) : tmpl(T('— row %s contains no 1'), nameNode(S[badRow]))),
          q('\\exists y\\;\\forall x\\;\\; ' + nm + '(x,y)', fullCol >= 0, fullCol >= 0 ? tmpl(T('— column %s is full'), nameNode(S[fullCol])) : tmpl(T('— no column is full')))));
      }
      info.set(...parts);
      // the transitive closure
      clEl.replaceChildren();
      clEl.hidden = !showCl;
      if (showCl) {
        const Q = relClosure(R, n), added = [];
        for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (Q[a][b] && !R[a][b]) added.push([a, b]);
        if (added.length) {
          clEl.append(el('span', null, T('The transitive closure adds'), ' ', MA.texEl(added.slice(0, 30).map(([a, b]) => pt(a, b)).join(',\\ ') + (added.length > 30 ? ',\\ \\ldots' : '')), ' ', T('(dashed).')));
          if (editable) {
            const btn = el('button', { type: 'button', class: 'w-btn', text: T('Add them') });
            btn.addEventListener('click', safe(() => { added.forEach(([a, b]) => { R[a][b] = 1; }); describe(); paint(); }, report));
            clEl.append(btn);
          }
        } else clEl.append(tmpl(T('%s is already transitive, so it is its own transitive closure.'), MA.texEl(nm)));
      }
    }

    box.svg.addEventListener('pointermove', safe((ev) => {
      const [x, y] = box.pt(ev);
      let h = null;
      NP.forEach((q, i) => { if (Math.abs(x - q.x) <= q.hw + 3 && Math.abs(y - q.y) <= NR + 3) h = i; });
      if (h !== hovV) { hovV = h; paint(); }
    }, report));
    box.svg.addEventListener('pointerleave', safe(() => { if (hovV !== null) { hovV = null; paint(); } }, report));
    box.svg.addEventListener('click', safe((ev) => {
      const [x, y] = box.pt(ev);
      const h = NP.findIndex((q) => Math.abs(x - q.x) <= q.hw + 3 && Math.abs(y - q.y) <= NR + 3);
      pinV = h < 0 || h === pinV ? null : h;
      paint();
    }, report));
    if (showP) MA.ui.toggle(bar, { label: T('Transitive closure'), value: false, onChange: safe((v) => { showCl = v; describe(); paint(); }, report) });
    if (editable) {
      MA.ui.button(bar, { label: T('Reset'), onClick: safe(() => { R0.forEach((r, a) => r.forEach((v, b) => { R[a][b] = v; })); cePin = null; describe(); paint(); }, report) });
    }
    describe();
    paint();
  });

  // ================================================================== metricballs
  const MB_ALIAS = { taxicab: 1, manhattan: 1, l1: 1, euclidean: 2, euclid: 2, l2: 2, max: Infinity, maximum: Infinity, chebyshev: Infinity, sup: Infinity, supremum: Infinity,
    inf: Infinity, infinity: Infinity, '∞': Infinity, oo: Infinity, '\\infty': Infinity, linf: Infinity, 'l∞': Infinity };
  const MB_PMIN = 0.2;
  /** A metric on the plane: a p-norm ({kind: 'p', p}), the discrete metric or the French railway metric. */
  function parseMetric(s) {
    const k = String(s).trim().toLowerCase().replace(/\s+/g, '');
    if (k === 'discrete' || k === 'disc') return { kind: 'disc' };
    if (k === 'rail' || k === 'railway' || k === 'sncf') return { kind: 'rail' };
    const q = k.replace(/^(?:d|l|ℓ|p)(?:_|=)?\{?(.+?)\}?$/, '$1');
    let p = null;
    for (const t of [k, q]) {
      if (Object.prototype.hasOwnProperty.call(MB_ALIAS, t)) { p = MB_ALIAS[t]; break; }
      try { p = C.num(t); break; } catch (e) { /* try the next spelling */ }
    }
    if (p === null || Number.isNaN(p)) throw new Error(T('metricballs: unknown metric “%s” — use a number p, inf, discrete or rail', s));
    if (!(p >= MB_PMIN)) throw new Error(T('metricballs: p must be at least %s (got %s)', String(MB_PMIN), String(s)));
    return { kind: 'p', p };
  }
  /** ‖(x, y)‖_p, computed without overflow. */
  function pnorm(p, x, y) {
    const ax = Math.abs(x), ay = Math.abs(y), m = Math.max(ax, ay);
    if (!(m > 0)) return 0;
    if (p === Infinity) return m;
    return m * Math.pow(Math.pow(ax / m, p) + Math.pow(ay / m, p), 1 / p);
  }
  /** Boundary of the p-ball of radius r about (cx, cy) as a closed polygon. */
  function ballPts(p, cx, cy, r) {
    if (p === 1) return [[cx + r, cy], [cx, cy + r], [cx - r, cy], [cx, cy - r]];
    if (p === Infinity) return [[cx + r, cy + r], [cx - r, cy + r], [cx - r, cy - r], [cx + r, cy - r]];
    const N = 720, out = [];
    for (let k = 0; k < N; k++) {
      const t = 2 * Math.PI * k / N, u = Math.cos(t), v = Math.sin(t), nrm = pnorm(p, u, v);
      out.push([cx + r * u / nrm, cy + r * v / nrm]);
    }
    return out;
  }
  /** Distance from a to b in metric m. */
  function metricDist(m, ax, ay, bx, by) {
    if (m.kind === 'disc') return ax === bx && ay === by ? 0 : 1;
    if (m.kind === 'rail') {
      const na = Math.hypot(ax, ay), nb = Math.hypot(bx, by);
      return Math.abs(ax * by - ay * bx) <= 1e-9 * Math.max(1, na * nb) ? Math.hypot(ax - bx, ay - by) : na + nb;
    }
    return pnorm(m.p, bx - ax, by - ay);
  }
  const pTeX = (p) => (p === Infinity ? '\\infty' : String(p));
  const pTxt = (p) => (p === Infinity ? '∞' : MA.fmt(p, 4));
  const tnum = (v, sig = 3) => MA.fmt(v, sig).replace('−', '-');
  /** p rounded to a readable value (integers snap). */
  function roundP(p) {
    if (!Number.isFinite(p)) return Infinity;
    const r = Math.round(p);
    if (Math.abs(p - r) < 0.012 * Math.max(1, p)) return r;
    return p >= 10 ? r : p >= 3 ? Math.round(p * 10) / 10 : Math.round(p * 100) / 100;
  }
  /** TeX of the formula for d_p on the plane. */
  function pFormula(p) {
    const d = 'd_{' + pTeX(p) + '}(x,y) = ';
    if (p === 1) return d + '|x_1-y_1| + |x_2-y_2|';
    if (p === 2) return d + '\\sqrt{(x_1-y_1)^2 + (x_2-y_2)^2}';
    if (p === Infinity) return d + '\\max\\bigl(|x_1-y_1|,\\, |x_2-y_2|\\bigr)';
    return d + '\\bigl(|x_1-y_1|^{' + pTeX(p) + '} + |x_2-y_2|^{' + pTeX(p) + '}\\bigr)^{1/' + pTeX(p) + '}';
  }
  /** 2^e as TeX (2, √2, or a number). */
  const pow2TeX = (e) => (Math.abs(e - 1) < 1e-9 ? '2' : Math.abs(e - 0.5) < 1e-9 ? '\\sqrt2' : Math.abs(e - 2) < 1e-9 ? '4' : tnum(Math.pow(2, e), 4));

  MA.widget('metricballs', (stage, cfg) => {
    style2();
    const list = C.has(cfg.metrics) ? C.list(cfg.metrics) : ['1', '2', 'inf'];
    if (list.length > 6) throw new Error(T('metricballs: at most 6 metrics'));
    const mets = [];
    list.forEach((s) => { const m = parseMetric(s); if (!mets.some((q) => q.kind === m.kind && q.p === m.p)) mets.push(m); });
    let p0m;
    try { p0m = parseMetric(C.str(cfg.p, '2')); } catch (e) { p0m = null; }
    if (!p0m || p0m.kind !== 'p') throw new Error(T('metricballs: p must be a number at least 0.2, or inf (got %s)', C.str(cfg.p)));
    const r0 = C.num(cfg.radius, 1);
    if (!(r0 > 0) || !Number.isFinite(r0)) throw new Error(T('metricballs: the radius must be a positive number'));
    const pLow = Math.min(0.5, p0m.p, ...mets.filter((m) => m.kind === 'p').map((m) => m.p));
    const qMax = 1 / pLow;
    // slider position t in [0, 1] <-> p: 1/p falls linearly from 1/pLow to 1 on [0, 0.2], and from 1 to 0 on [0.2, 1]
    const pOf = (t) => { const q = t <= 0.2 ? 1 + (qMax - 1) * (0.2 - t) / 0.2 : (1 - t) / 0.8; return q <= 1e-6 ? Infinity : roundP(1 / q); };
    const tOf = (p) => { const q = 1 / p; return q >= 1 ? 0.2 - 0.2 * (q - 1) / (qMax - 1) : 1 - 0.8 * q; };
    let p = p0m.p, cx = 0, cy = 0, r = r0, showCopy = true;
    const PAL = ['var(--series-1)', 'var(--series-3)', 'var(--series-2)', 'var(--a-safety)', 'var(--a-systems)', 'var(--series-4)'];
    const colOf = (k) => PAL[k % PAL.length];
    const mName = (m) => (m.kind === 'disc' ? 'd_{\\text{disc}}' : m.kind === 'rail' ? 'd_{\\text{rail}}' : 'd_{' + pTeX(m.p) + '}');
    const SUBS = { 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
    const mTxt = (m) => (m.kind === 'disc' ? 'd_disc' : m.kind === 'rail' ? 'd_rail' : m.p === Infinity ? 'd∞' : SUBS[m.p] ? 'd' + SUBS[m.p] : 'd(' + MA.fmt(m.p, 4) + ')');
    MA.ui.title(stage, cfg.title);
    const legHost = el('div');
    stage.append(legHost);
    const narrow = (stage.clientWidth || 640) < 520;
    const span = 1.75 * r0;
    const P = new MA.Plot(stage, { x: [-span, span], y: [-span, span], equal: true, width: narrow ? 360 : 640, height: narrow ? 340 : 400,
      label: T('Balls with the same centre and radius in several metrics on the plane') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    info.el.style.flexDirection = 'column';
    info.el.style.gap = '4px';
    const lnMetric = el('div'), lnChain = el('div', { class: 'w-dm-v' }), lnNote = el('div'), lnExtra = el('div', { class: 'w-dm-v' });
    const ballTeX = el('span'), kvC = el('b'), kvR = el('b'), kvA = el('b');
    const lnBall = el('div', { class: 'w-dm-list' }, ballTeX, el('span', null, el('span', { class: 'k', text: 'c = ' }), kvC), el('span', null, el('span', { class: 'k', text: 'r = ' }), kvR),
      el('span', null, el('span', { class: 'k', text: T('area') + ' ' }), kvA));
    info.el.append(lnMetric, lnBall, lnChain, lnNote, lnExtra);
    const report = (m) => { lnNote.dataset.key = ''; lnNote.replaceChildren(el('span', { class: 'w-err', text: m })); };
    const rmin = r0 * 0.05, rmax = r0 * 1.6;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const snap = (v) => Math.round(v / (r0 / 100)) * (r0 / 100);
    const hC = P.handle(cx, cy, { label: T('Centre c of the balls'), step: r0 / 20,
      constrain: (x, y) => [snap(clamp(x, P.x0, P.x1)), snap(clamp(y, P.y0, P.y1))],
      onDrag: safe((x, y) => { cx = x; cy = y; hR.set(cx + r, cy); draw(); }, report) });
    const hR = P.handle(cx + r, cy, { label: T('Radius r'), r: 6, step: r0 / 50,
      constrain: (x) => [cx + clamp(snap(x - cx), rmin, rmax), cy],
      onDrag: safe((x) => { r = x - cx; sR.set(r); draw(); }, report) });
    const sP = MA.ui.slider(bar, { label: 'p', tex: true, min: 0, max: 1, step: 0.001, value: tOf(p), fmt: (t) => pTxt(pOf(t)), onInput: safe((t) => { p = pOf(t); draw(); }, report) });
    const sR = MA.ui.slider(bar, { label: 'r', tex: true, min: rmin, max: rmax, step: r0 / 100, value: r, fmt: (v) => MA.fmt(v, 3), onInput: safe((v) => { r = v; hR.set(cx + r, cy); draw(); }, report) });
    const tCopy = MA.ui.toggle(bar, { label: T('Scaled copy'), value: showCopy, onChange: safe((v) => { showCopy = v; draw(); }, report) });
    MA.ui.button(bar, { label: T('Reset'), onClick: safe(() => { p = p0m.p; cx = 0; cy = 0; r = r0; sP.set(tOf(p)); sR.set(r); hC.set(0, 0); hR.set(r, 0); draw(); }, report) });

    /** The p-norm balls drawn (listed ones and the slider's), sorted by p. */
    function pList() {
      const ps = mets.filter((m) => m.kind === 'p').map((m) => m.p);
      if (!ps.includes(p)) ps.push(p);
      return ps.sort((a, b) => a - b);
    }
    const colourOfP = (q) => { const k = mets.findIndex((m) => m.kind === 'p' && m.p === q); return k >= 0 ? colOf(k) : 'var(--accent)'; };
    function drawBall(q, color, o = {}) {
      const pts = ballPts(q, cx, cy, o.r === undefined ? r : o.r);
      if (o.fo) P.poly(pts, { fill: color, fillOpacity: o.fo });
      P.path(pts.concat([pts[0]]), { color, width: o.w || 2, dash: o.dash, layer: o.layer || 'curves' });
    }
    /** A Euclidean disc with its own centre (the railway metric's ball around the origin). */
    function drawBall2(color, x0, y0, rad) {
      const pts = ballPts(2, x0, y0, rad);
      P.poly(pts, { fill: color, fillOpacity: 0.06 });
      P.path(pts.concat([pts[0]]), { color, width: 2 });
    }
    let legKey = '';
    function legend() {
      const items = mets.map((m, k) => ({ label: mName(m), color: colOf(k) }));
      items.push({ label: 'd_p,\\ p = ' + pTeX(p), color: 'var(--accent)' });
      const key = items.map((i) => i.label).join('|');
      if (key === legKey) return;
      legKey = key;
      legHost.replaceChildren();
      MA.ui.legend(legHost, items);
    }
    function draw() {
      P.clear();
      const ps = pList();
      // listed metrics: the largest balls first so that the smaller fills lie on top
      mets.map((m, k) => ({ m, k })).sort((a, b) => (b.m.kind === 'p' ? b.m.p : 0) - (a.m.kind === 'p' ? a.m.p : 0)).forEach(({ m, k }) => {
        const col = colOf(k);
        if (m.kind === 'p') drawBall(m.p, col);
        else if (m.kind === 'disc') {
          // B(c, r) = {c}: a ring around the centre handle
          if (r <= 1) P.layers.marks.append(el('circle', { cx: P.X(cx), cy: P.Y(cy), r: 12.5, style: 'fill:none;stroke:' + col + ';stroke-width:2.6' }));
          else P.rect(P.x0 - 1, P.y0 - 1, P.x1 - P.x0 + 2, P.y1 - P.y0 + 2, { color: col, fillOpacity: 0.06, width: 0 });
        } else {
          const nc = Math.hypot(cx, cy);
          if (nc < 1e-9) drawBall(2, col, { fo: 0.06 });
          else {
            if (r > nc) drawBall2(col, 0, 0, r - nc);
            const ux = cx / nc, uy = cy / nc;
            P.line(cx - r * ux, cy - r * uy, cx + r * ux, cy + r * uy, { color: col, width: 4, layer: 'curves' });
          }
        }
      });
      // the slider's ball; a listed ball it coincides with is redrawn dashed on top, so that both stay visible
      drawBall(p, 'var(--accent)', { w: 2.6, fo: 0.08, layer: 'top' });
      const same = mets.findIndex((m) => m.kind === 'p' && m.p === p);
      if (same >= 0) drawBall(p, colOf(same), { w: 2.6, dash: '7 7', layer: 'top' });
      // the largest ball shrunk to fit inside the smallest
      if (showCopy && ps.length > 1) {
        const lo = ps[0], hi = ps[ps.length - 1];
        drawBall(hi, colourOfP(hi), { r: r / Math.pow(2, 1 / lo - 1 / hi), w: 1.8, dash: true, layer: 'top' });
      }
      // p < 1: the chord between two boundary points leaves the "ball"
      if (p < 1) {
        P.line(cx + r, cy, cx, cy + r, { color: 'var(--bad)', width: 1.8, dash: '5 4', layer: 'top' });
        P.dot(cx + r / 2, cy + r / 2, { r: 4.5, color: 'var(--bad)', layer: 'top' });
      }
      P.line(cx, cy, cx + r, cy, { color: 'var(--ink-2)', width: 1.4, dash: '4 3', layer: 'top' });
      P.text(cx + r * 0.75, cy, 'r', { dy: -6, anchor: 'middle', color: 'var(--ink-2)', layer: 'top' });
      P.text(cx, cy, 'c', { dx: -11, dy: -10, anchor: 'end', color: 'var(--ink)', layer: 'top' });
      hC.redraw();
      hR.redraw();
      legend();
      describe(ps);
    }
    /** Re-render a TeX line only when its source changed. */
    function texLine(node, key, build) {
      if (node.dataset.key === key) return;
      node.dataset.key = key;
      node.replaceChildren(...build());
    }
    function describe(ps) {
      const pt = pTeX(p);
      texLine(lnMetric, 'm' + p, () => [el('span', { class: 'k', text: T('Metric') + '  ' }), MA.texEl(pFormula(p))]);
      const G = MA.expr && MA.expr.gamma;
      const area = p === Infinity ? 4 * r * r : G ? 4 * r * r * Math.pow(G(1 + 1 / p), 2) / G(1 + 2 / p) : NaN;
      texLine(ballTeX, 'b' + p, () => [MA.texEl('B_{' + pt + '}(c, r) = \\{x : d_{' + pt + '}(c, x) < r\\}')]);
      kvC.textContent = '(' + MA.fmt(cx, 3) + ', ' + MA.fmt(cy, 3) + ')';
      kvR.textContent = MA.fmt(r, 3);
      kvA.textContent = MA.fmt(area, 4);
      kvA.parentNode.hidden = !Number.isFinite(area);
      texLine(lnChain, 'c' + ps.join(',') + '|' + showCopy, () => {
        if (ps.length < 2) return [];
        const lo = ps[0], hi = ps[ps.length - 1], k = pow2TeX(1 / lo - 1 / hi);
        const ds = ps.slice().reverse().map((q) => 'd_{' + pTeX(q) + '}');
        const bs = ps.map((q) => 'B_{' + pTeX(q) + '}(c,r)');
        const shrunk = 'B_{' + pTeX(hi) + '}\\bigl(c, r/' + k + '\\bigr)';
        return [
          el('div', null, el('span', { class: 'k', text: T('Inequalities') + '  ' }), MA.texEl(ds.join(' \\le ') + ' \\le ' + k + '\\,' + ds[0])),
          el('div', null, el('span', { class: 'k', text: T('so the balls are nested') + '  ' }), MA.texEl(shrunk + ' \\subseteq ' + bs.join(' \\subseteq '))),
          el('div', { class: 'w-dm-hint', text: showCopy ? T('The dashed ball is the largest ball of one metric shrunk to fit inside the smallest: every ball contains a ball of each other metric with the same centre, so all these metrics have the same open sets.')
            : T('Every ball contains a ball of each other metric with the same centre, so all these metrics have the same open sets.') }),
        ];
      });
      texLine(lnNote, 'n' + p, () => (p >= 1 ? [el('span', { class: 'w-dm-ok', text: '✓ ' + T('convex') }), ' ', el('span', { class: 'w-dm-hint', text: T('— for p ≥ 1 every ball is convex, which is exactly the triangle inequality (Minkowski’s inequality): the formula is a metric.') })]
        : [el('span', { class: 'w-dm-no', text: '✗ ' + T('not convex:') }), ' ', T('for p < 1 the formula is not a metric — the dashed chord leaves the ball, and the triangle inequality fails:'), ' ',
          MA.texEl('d_{' + pt + '}\\bigl((0,0),(1,1)\\bigr) = ' + tnum(Math.pow(2, 1 / p), 4) + ' > 2 = d_{' + pt + '}\\bigl((0,0),(1,0)\\bigr) + d_{' + pt + '}\\bigl((1,0),(1,1)\\bigr)')]));
      texLine(lnExtra, 'x' + (r <= 1), () => {
        const out = [];
        mets.forEach((m) => {
          if (m.kind === 'p' && m.p < 1) out.push(el('div', null, el('span', { class: 'w-dm-no', text: '✗ ' }), MA.texEl(mName(m)), ' ', el('span', { class: 'w-dm-hint', text: T('is not a metric: for p < 1 the triangle inequality fails and the ball is not convex.') })));
          if (m.kind === 'disc') out.push(el('div', null, MA.texEl(mName(m) + '(x,y) = 1'), ' ', T('for x ≠ y:'), ' ', MA.texEl(r <= 1 ? 'B(c,r) = \\{c\\}' : 'B(c,r) = \\mathbb{R}^2'), ' ',
            el('span', { class: 'w-dm-hint', text: T('— no ball of a p-metric fits inside {c}, so the discrete metric has more open sets.') })));
          if (m.kind === 'rail') out.push(el('div', null, MA.texEl(mName(m)), ' ', el('span', { class: 'w-dm-hint', text: T('(French railway metric): the straight-line distance if x and y lie on one line through the origin, otherwise |x| + |y| — every journey goes through the origin.') })));
        });
        return out;
      });
    }
    P.onHover(safe((x, y) => {
      if (x === null || !Number.isFinite(x)) { read(null); return; }
      const parts = ['x = (' + MA.fmt(x, 3) + ', ' + MA.fmt(y, 3) + ')'];
      mets.forEach((m) => parts.push(mTxt(m) + '(c, x) = ' + MA.fmt(metricDist(m, cx, cy, x, y), 3)));
      if (!mets.some((m) => m.kind === 'p' && m.p === p)) parts.push('dₚ(c, x) = ' + MA.fmt(pnorm(p, x - cx, y - cy), 3));
      read(parts.join('  ·  '));
    }, report));
    void tCopy;
    draw();
  });
})();
