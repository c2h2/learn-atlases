/* Maths Atlas — interactive figures: linear algebra.
   transform2d (linear maps of the plane), svd (rotate–stretch–rotate), projection (projection and
   Gram–Schmidt), rowreduce (Gauss–Jordan elimination with exact fractions).
   Keys and defaults: data/widgets.json. Conventions: tools/WIDGET_GUIDE.md. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  // ------------------------------------------------------------------ styles (rowreduce table, small extras)
  const STYLE = `
.w-la-rr { display: grid; grid-template-columns: minmax(0, 1fr) minmax(170px, 230px); }
.w-la-rr.solo { grid-template-columns: minmax(0, 1fr); }
.w-la-main { padding: 12px 16px 12px; min-width: 0; }
.w-la-head { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 12px; font-size: 0.8125rem; color: var(--ink-3); }
.w-la-head b { color: var(--ink); font-weight: 600; }
.w-la-scroll { overflow-x: auto; padding: 10px 2px 8px; outline: none; display: flex; }
.w-la-scroll:focus-visible { box-shadow: 0 0 0 2px var(--accent); border-radius: 8px; }
.w-la-mx { display: inline-grid; align-items: center; margin: 0 auto; row-gap: 2px; }
.w-la-mx .c { position: relative; z-index: 1; padding: 7px 11px; text-align: center; min-width: 2.4em; font-size: 1.06rem; font-variant-numeric: tabular-nums; }
.w-la-mx .c .katex { font-size: 1em; }
.w-la-mx .c.piv::before { content: ''; position: absolute; inset: 1px 3px; border: 2px solid var(--accent); border-radius: 9px; z-index: -1; opacity: 0.55; }
.w-la-mx .c.piv.cur::before { opacity: 1; background: var(--accent-wash); }
.w-la-mx .c.chg { animation: w-la-flash 0.9s ease-out; border-radius: 6px; }
@keyframes w-la-flash { from { background: var(--warm-wash); } to { background: transparent; } }
.w-la-mx .h { font-size: 0.75rem; color: var(--ink-3); text-align: center; padding-bottom: 2px; }
.w-la-mx .rl { font-size: 0.82rem; color: var(--ink-3); padding-right: 8px; text-align: right; }
.w-la-mx .bk { align-self: stretch; width: 7px; border: 2px solid var(--ink); }
.w-la-mx .bk.l { border-right: 0; } .w-la-mx .bk.r { border-left: 0; }
.w-la-mx .bar { align-self: stretch; justify-self: center; width: 0; border-left: 1.5px solid var(--ink-2); margin: 3px 0; position: relative; z-index: 2; }
.w-la-mx .rowbg { align-self: stretch; border-radius: 7px; z-index: 0; }
.w-la-mx .rowbg.tgt { background: var(--warm-wash); }
.w-la-mx .rowbg.src { box-shadow: inset 0 0 0 1.5px var(--rule-2); }
.w-la-mx .on { padding-left: 12px; font-size: 0.85rem; color: var(--accent-ink); white-space: nowrap; min-width: 6.5em; }
.w-la-op { min-height: 3.1em; padding: 8px 12px; border-radius: 8px; background: var(--paper); border: 1px solid var(--rule); font-size: 0.875rem; color: var(--ink-2); display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 12px; }
.w-la-op .katex { font-size: 1.08em; color: var(--ink); }
.w-la-op .ph { color: var(--accent-ink); width: 100%; font-style: italic; }
.w-la-log { border-left: 1px solid var(--rule); padding: 10px 12px; font-size: 0.8125rem; max-height: 380px; overflow: auto; min-width: 0; }
.w-la-log .lh { font-size: 0.75rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-3); margin: 2px 0 6px; }
.w-la-log ol { margin: 0; padding: 0 0 0 1.9em; }
.w-la-log li { padding: 2px 6px; border-radius: 6px; cursor: pointer; color: var(--ink-2); }
.w-la-log li:hover { background: var(--hover); }
.w-la-log li.cur { background: var(--accent-wash); color: var(--ink); }
.w-la-log li.fut { opacity: 0.5; }
.w-la-log li.sep { list-style: none; cursor: default; margin: 4px 0 4px -1.9em; padding: 2px 0; font-size: 0.72rem; color: var(--ink-3); border-top: 1px dashed var(--rule-2); background: none; }
.w-la-note { color: var(--ink-3); }
.w-la-bar .w-btn:disabled { opacity: 0.4; cursor: default; }
.w-la-bar .w-btn:disabled:hover { background: var(--paper); color: var(--ink-2); }
.w-la-halo foreignObject .katex { text-shadow: 0 0 2px var(--plot-bg), 0 0 2px var(--plot-bg), 0 0 4px var(--plot-bg), 0 0 6px var(--plot-bg); }
.w-la-warn { color: var(--bad); }
@media (max-width: 760px) { .w-la-rr { grid-template-columns: minmax(0, 1fr); } .w-la-log { border-left: 0; border-top: 1px solid var(--rule); max-height: 200px; } }
`;
  if (!document.getElementById('w-la-style')) document.head.append(el('style', { id: 'w-la-style', text: STYLE }));

  // ------------------------------------------------------------------ small helpers
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fmt = (v, s = 3) => MA.fmt(Math.abs(v) < 1e-10 ? 0 : v, s);
  /** A number for TeX (ASCII minus, e-notation as ×10^k). */
  function tn(v, s = 3) {
    let t = fmt(v, s);
    if (t === '–') return '?';
    t = t.replace(/−/g, '-').replace('∞', '\\infty');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(t);
    if (m) t = m[1] + '\\times 10^{' + (+m[2]) + '}';
    return t;
  }
  const pmat = (rows, s) => '\\begin{pmatrix}' + rows.map((r) => r.map((v) => tn(v, s)).join(' & ')).join(' \\\\ ') + '\\end{pmatrix}';
  const tvec = (v, s) => '(' + v.map((q) => tn(q, s)).join(',\\ ') + ')';
  const mul = (M, v) => [M[0][0] * v[0] + M[0][1] * v[1], M[1][0] * v[0] + M[1][1] * v[1]];
  const mm = (A, B) => [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
    [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
  const det2 = (M) => M[0][0] * M[1][1] - M[0][1] * M[1][0];
  const rot = (a) => [[Math.cos(a), -Math.sin(a)], [Math.sin(a), Math.cos(a)]];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
  const norm = (a) => Math.hypot(a[0], a[1]);
  const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t < 0.5 ? 2 * t * t : 1 - 2 * (1 - t) * (1 - t));
  const deg = (a) => a * 180 / Math.PI;
  /** Show or hide a control; the `hidden` attribute loses against the stylesheet's display:flex. */
  const showEl = (node, on) => { node.style.display = on ? '' : 'none'; };
  /** Wrap an event handler so that it never throws. */
  const safe = (fn) => function (...args) { try { return fn.apply(this, args); } catch (e) { console.warn('[linalg]', e); return undefined; } };
  /** Animation step wrapper: an exception stops the loop instead of repeating every frame. */
  const safeStep = (fn) => (dt) => { try { return fn(dt); } catch (e) { console.warn('[linalg]', e); return false; } };

  /** "a,b; c,d" -> [[a,b],[c,d]] with constant expressions allowed. */
  function parseMatrix(src, what) {
    const rows = C.list(src).map((r) => r.replace(/^\[|\]$/g, '').split(',').map((q) => {
      if (!C.has(q)) throw new Error(what + ': ' + MA.t('empty matrix entry in “%s”', src));
      return C.num(q);
    }));
    if (!rows.length) throw new Error(what + ': ' + MA.t('a matrix is needed, e.g. “2,1; 1,2”'));
    if (rows.some((r) => r.length !== rows[0].length)) throw new Error(what + ': ' + MA.t('matrix rows must have the same length (“a,b; c,d”)'));
    return rows;
  }
  function matrix2(src, def, what) {
    const M = parseMatrix(C.has(src) ? src : def, what);
    if (M.length !== 2 || M[0].length !== 2) throw new Error(what + ': ' + MA.t('needs a 2×2 matrix “a,b; c,d”'));
    return M;
  }
  function vec2(src, def, what) {
    const p = C.points(C.has(src) ? src : def)[0];
    if (!p || p.length !== 2) throw new Error(what + ': ' + MA.t('a vector is written “x,y”'));
    return p.slice();
  }

  /** Persistent TeX labels on a plot: created once, then only moved (cheap during animation and dragging). */
  function texLabels(P) {
    P.wrap.classList.add('w-la-halo');
    const map = new Map();
    let used = new Set();
    return {
      begin() { used = new Set(); },
      put(key, x, y, tex, o = {}) {
        if (!Number.isFinite(x) || !Number.isFinite(y)) return;
        const w = o.w || 140, h = o.h || 28;
        let L = map.get(key);
        if (!L || L.tex !== tex || L.color !== o.color) {
          if (L) L.fo.remove();
          L = { fo: P.tex(x, y, tex, Object.assign({}, o, { w, h })), tex, color: o.color };
          map.set(key, L);
        }
        const ax = o.anchor === 'middle' ? w / 2 : o.anchor === 'end' ? w : 0;
        L.fo.setAttribute('x', (P.X(x) + (o.dx || 0) - ax).toFixed(1));
        L.fo.setAttribute('y', (P.Y(y) + (o.dy || 0) - h / 2).toFixed(1));
        L.fo.style.display = '';
        used.add(key);
      },
      end() { map.forEach((L, k) => { if (!used.has(k)) L.fo.style.display = 'none'; }); },
    };
  }
  /** Label offset (px) pointing outward from the origin through a tip, for labels at arrow heads. */
  function outward(P, x, y, px = 16) {
    const dx = P.X(x) - P.X(0), dy = P.Y(y) - P.Y(0);
    const L = Math.hypot(dx, dy);
    if (L < 1e-6) return { dx: px * 0.7, dy: -px * 0.7 };
    return { dx: dx / L * px, dy: dy / L * px };
  }
  /** Arrow from a to b with a fixed-size head (SVG markers scale with the stroke and swamp short vectors). */
  function arrow(P, a, b, o = {}) {
    const lim = 1e5;
    const x1 = clamp(P.X(a[0]), -lim, lim), y1 = clamp(P.Y(a[1]), -lim, lim), x2 = clamp(P.X(b[0]), -lim, lim), y2 = clamp(P.Y(b[1]), -lim, lim);
    const L = Math.hypot(x2 - x1, y2 - y1);
    const c = o.color || 'var(--series-1)';
    if (!(L > 2)) { if (o.dotIfZero && Number.isFinite(x1)) P.dot(a[0], a[1], { r: 3.5, color: c }); return null; }
    const w = o.width || 2;
    const hl = Math.min(L * 0.5, 8 + 1.6 * w), hw = hl * 0.72;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const bx = x2 - ux * hl * 0.9, by = y2 - uy * hl * 0.9;
    const g = el('g', { style: o.opacity !== undefined ? 'opacity:' + o.opacity : null });
    g.append(el('line', { x1: x1.toFixed(2), y1: y1.toFixed(2), x2: bx.toFixed(2), y2: by.toFixed(2),
      style: 'stroke:' + c + ';stroke-width:' + w + ';stroke-linecap:' + (o.dash ? 'butt' : 'round') + (o.dash ? ';stroke-dasharray:' + (o.dash === true ? '6 5' : o.dash) : '') }));
    const hx = x2 - ux * hl, hy = y2 - uy * hl;
    g.append(el('path', { d: 'M' + x2.toFixed(2) + ',' + y2.toFixed(2) + 'L' + (hx - uy * hw / 2).toFixed(2) + ',' + (hy + ux * hw / 2).toFixed(2) +
      'L' + (hx + uy * hw / 2).toFixed(2) + ',' + (hy - ux * hw / 2).toFixed(2) + 'Z', style: 'fill:' + c + ';stroke:' + c + ';stroke-width:1;stroke-linejoin:round' }));
    P.layers[o.layer || 'marks'].append(g);
    return g;
  }
  /** Line through the origin in direction d, spanning the view. */
  function spanLine(P, d, o) {
    const L = norm(d);
    if (L < 1e-12) return;
    const s = 3 * Math.hypot(P.x1 - P.x0, P.y1 - P.y0) / L;
    P.line(-s * d[0], -s * d[1], s * d[0], s * d[1], o);
  }
  /** Start an animation when the figure first becomes half visible (skipped for reduced motion). */
  function whenVisible(node, cb) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver((ents) => { if (ents.some((e) => e.isIntersecting)) { io.disconnect(); cb(); } }, { threshold: 0.45 });
    io.observe(node);
  }
  /** Sliders for the four entries of a 2×2 matrix; onChange(A) on input. */
  function entrySliders(bar, A, onChange) {
    const m0 = Math.max(...A.flat().map(Math.abs));
    const m = Math.max(3, Math.ceil(m0 * 1.5));
    const step = m > 6 ? 0.2 : 0.1;
    const out = [];
    [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([i, j]) => {
      out.push(MA.ui.slider(bar, { label: 'a_{' + (i + 1) + (j + 1) + '}', min: -m, max: m, step, value: A[i][j], fmt: (v) => fmt(v, 3),
        onInput: safe((v) => { A[i][j] = v; onChange(A); }) }));
    });
    return { set(M) { out[0].set(M[0][0]); out[1].set(M[0][1]); out[2].set(M[1][0]); out[3].set(M[1][1]); } };
  }

  /** Eigen-structure of a real 2×2 matrix. */
  function eig2(M) {
    const [[a, b], [c, d]] = M;
    const sc = Math.max(1e-300, Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d));
    const tr = a + d, dt = a * d - b * c;
    const disc = tr * tr - 4 * dt;
    const eps = 1e-10 * sc * sc;
    const vecFor = (l) => {
      const r1 = [a - l, b], r2 = [c, d - l];
      const r = norm(r1) >= norm(r2) ? r1 : r2;
      if (norm(r) < 1e-12 * sc) return [1, 0];
      let v = [-r[1], r[0]];
      const L = norm(v);
      v = [v[0] / L, v[1] / L];
      if (v[0] < -1e-12 || (Math.abs(v[0]) <= 1e-12 && v[1] < 0)) v = [-v[0], -v[1]];
      return v;
    };
    if (disc < -eps) return { type: 'complex', re: tr / 2, im: Math.sqrt(-disc) / 2 };
    if (Math.abs(disc) <= eps) {
      const l = tr / 2;
      if (Math.abs(b) <= 1e-10 * sc && Math.abs(c) <= 1e-10 * sc && Math.abs(a - d) <= 1e-10 * sc) return { type: 'scalar', ls: [l] };
      return { type: 'defective', ls: [l], vs: [vecFor(l)] };
    }
    const s = Math.sqrt(disc);
    const l1 = (tr + s) / 2, l2 = (tr - s) / 2;
    return { type: 'real', ls: [l1, l2], vs: [vecFor(l1), vecFor(l2)] };
  }
  /** A direction written with its largest component 1 (e.g. (1, 0.5)) — easier to read than a unit vector. */
  function niceDir(v) {
    const m = Math.abs(v[0]) >= Math.abs(v[1]) ? v[0] : v[1];
    return [v[0] / m, v[1] / m];
  }

  // ------------------------------------------------------------------ transform2d
  MA.widget('transform2d', (stage, cfg) => {
    const A0 = matrix2(cfg.matrix, '1,1; 0,1', 'transform2d');
    const editable = C.bool(cfg.editable, true);
    let eigenOn = C.bool(cfg.eigen, false);
    const canAnimate = C.bool(cfg.animate, true);
    const R = clamp(C.num(cfg.range, 4), 1, 100);
    const vecs = C.points(cfg.vector).map((p) => {
      if (p.length !== 2) throw new Error('transform2d: ' + MA.t('a vector is written “x,y”'));
      return p.slice();
    });
    const A = A0.map((r) => r.slice());
    let t = 1; // animation parameter: M(t) = (1 − s) I + s A with s = ease(t)
    let touched = false;

    MA.ui.title(stage, cfg.title);
    const leg = [{ label: 'A\\mathbf e_1', color: 'var(--series-3)' }, { label: 'A\\mathbf e_2', color: 'var(--series-2)' },
      { label: MA.t('image of the unit square'), color: 'var(--series-1)', swatch: true }];
    if (vecs.length) leg.push({ label: 'A\\mathbf v', color: 'var(--accent)' });
    MA.ui.legend(stage, leg);
    const P = new MA.Plot(stage, { x: [-R, R], y: [-R, R], equal: true, grid: false, height: 440, label: MA.t('The plane, its grid and the unit square transformed by a 2×2 matrix') });
    const labels = texLabels(P);
    const gstep = R <= 8 ? 1 : MA.niceStep(R / 5);
    const view = () => ({ c: [(P.x0 + P.x1) / 2, (P.y0 + P.y1) / 2], diag: Math.hypot(P.x1 - P.x0, P.y1 - P.y0),
      corners: [[P.x0, P.y0], [P.x1, P.y0], [P.x0, P.y1], [P.x1, P.y1]] });

    /** Images of the grid lines x = k·step (direction a2) or y = k·step (direction a1). */
    function family(dir, off, opts) {
      const V = view();
      const ln = norm(dir);
      if (ln < 1e-9) return { lines: [], axis: null };
      const d = [dir[0] / ln, dir[1] / ln], n = [-d[1], d[0]];
      const stepN = dot(off, n) * gstep;
      const pr = V.corners.map((c) => dot(c, n));
      const lo = Math.min(...pr), hi = Math.max(...pr);
      let k0 = 0, k1 = 0;
      if (Math.abs(stepN) > 1e-9 * V.diag) { const ka = lo / stepN, kb = hi / stepN; k0 = Math.ceil(Math.min(ka, kb)); k1 = Math.floor(Math.max(ka, kb)); }
      const every = Math.max(1, Math.ceil((k1 - k0) / 300));
      const seg = (k) => {
        const b = [k * gstep * off[0], k * gstep * off[1]];
        const along = dot([V.c[0] - b[0], V.c[1] - b[1]], d);
        const m = [b[0] + along * d[0], b[1] + along * d[1]];
        return [[m[0] - V.diag * d[0], m[1] - V.diag * d[1]], [m[0] + V.diag * d[0], m[1] + V.diag * d[1]]];
      };
      const lines = [];
      for (let k = k0; k <= k1; k++) {
        if (k === 0 || (k % every)) continue;
        const s = seg(k); lines.push(s[0], s[1], null);
      }
      return { lines, axis: k0 <= 0 && k1 >= 0 ? seg(0) : null, opts };
    }

    function current() {
      const s = ease(t);
      return [[1 + s * (A[0][0] - 1), s * A[0][1]], [s * A[1][0], 1 + s * (A[1][1] - 1)]];
    }

    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let tSlider = null;

    function draw() {
      const M = current();
      const s = ease(t);
      const a1 = [M[0][0], M[1][0]], a2 = [M[0][1], M[1][1]];
      const d = det2(M);
      P.clear('fill', 'curves', 'marks');
      labels.begin();
      // original grid (reference) and its image
      const I = [[1, 0], [0, 1]];
      const g0 = [family([0, 1], [1, 0]), family([1, 0], [0, 1])];
      P.path(g0[0].lines.concat(g0[1].lines), { color: 'var(--grid)', width: 1, layer: 'fill' });
      void I;
      const fam = [family(a2, a1), family(a1, a2)];
      P.path(fam[0].lines.concat(fam[1].lines), { color: 'var(--series-1)', width: 1, opacity: 0.38 });
      fam.forEach((f) => { if (f.axis) P.path(f.axis, { color: 'var(--series-1)', width: 1.7, opacity: 0.75 }); });
      // unit square and its image (signed area = det)
      const sqCol = d < -1e-12 ? 'var(--bad)' : 'var(--series-1)';
      P.poly([[0, 0], [1, 0], [1, 1], [0, 1]], { fill: 'none', fillOpacity: 0, stroke: 'var(--ink-3)', width: 1.2, dash: true });
      P.poly([[0, 0], a1, [a1[0] + a2[0], a1[1] + a2[1]], a2], { fill: sqCol, fillOpacity: 0.2, stroke: sqCol, width: 1.6 });
      // orientation: image of a small counter-clockwise arc from e1 towards e2
      const pxA = Math.abs(d) * P.sx * P.sy;
      if (pxA > 900 && norm(a1) * P.sx > 26 && norm(a2) * P.sx > 26) {
        const arc = [];
        for (let i = 0; i <= 24; i++) { const ph = 0.3 + (Math.PI / 2 - 0.6) * i / 24; arc.push(mul(M, [0.38 * Math.cos(ph), 0.38 * Math.sin(ph)])); }
        P.path(arc, { color: sqCol, width: 1.6, arrow: true, layer: 'marks' });
      }
      const cen = [(a1[0] + a2[0]) / 2, (a1[1] + a2[1]) / 2];
      if (pxA > 1600) P.text(cen[0], cen[1], 'det = ' + fmt(d, 3), { layer: 'marks', anchor: 'middle', dy: 4, color: d < -1e-12 ? 'var(--bad)' : 'var(--ink-2)', size: 11 });
      // eigen-directions of the target A; along them M(t) acts as multiplication by (1 − s) + sλ
      const E = eig2(A);
      if (eigenOn && (E.type === 'real' || E.type === 'defective')) {
        E.vs.forEach((v, k) => {
          spanLine(P, v, { color: 'var(--series-4)', width: 1.3, dash: '7 5', opacity: 0.85 });
          const lt = 1 - s + s * E.ls[k];
          arrow(P, [0, 0], v, { color: 'var(--ink-3)', width: 1.4, dash: '3 3' });
          arrow(P, [0, 0], [lt * v[0], lt * v[1]], { color: 'var(--series-4)', width: 2.8, dotIfZero: true });
          const tip = Math.abs(lt) > 0.25 ? [lt * v[0], lt * v[1]] : v;
          const off = outward(P, tip[0] * (lt < 0 ? 1 : 1), tip[1], 22);
          const sub = E.vs.length > 1 ? '_' + (k + 1) : '';
          labels.put('eig' + k, tip[0], tip[1], '\\lambda' + sub + ' = ' + tn(lt, 3), { color: 'var(--series-4)', anchor: 'middle', dx: off.dx, dy: off.dy, size: 13 });
        });
      }
      // basis images
      arrow(P, [0, 0], a1, { color: 'var(--series-3)', width: 2.8 });
      arrow(P, [0, 0], a2, { color: 'var(--series-2)', width: 2.8 });
      let o = outward(P, a1[0], a1[1]);
      labels.put('e1', a1[0], a1[1], 'A\\mathbf e_1', { color: 'var(--series-3)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
      o = outward(P, a2[0], a2[1]);
      labels.put('e2', a2[0], a2[1], 'A\\mathbf e_2', { color: 'var(--series-2)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
      // draggable vectors
      vecs.forEach((v, k) => {
        const Av = mul(M, v);
        arrow(P, [0, 0], v, { color: 'var(--ink-3)', width: 1.6, dash: '5 4' });
        arrow(P, [0, 0], Av, { color: 'var(--accent)', width: 3 });
        const sub = vecs.length > 1 ? '_' + (k + 1) : '';
        o = outward(P, v[0], v[1], 20);
        labels.put('v' + k, v[0], v[1], '\\mathbf v' + sub, { color: 'var(--ink-2)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
        o = outward(P, Av[0], Av[1], 20);
        labels.put('Av' + k, Av[0], Av[1], 'A\\mathbf v' + sub, { color: 'var(--accent)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
      });
      labels.end();
      describe(M, d, s, E);
    }

    function describe(M, d, s, E) {
      const name = t < 1 ? 'M_t' : 'A';
      const parts = [{ tex: name + ' = ' + pmat(M, 3) }];
      parts.push(MA.ui.kv('\\det ' + name + ' =', fmt(d, 4)));
      const ad = Math.abs(d);
      let meaning;
      if (ad < 1e-10) meaning = Math.max(...M.flat().map(Math.abs)) < 1e-10 ? MA.t('everything collapses to the origin') : MA.t('det = 0: the plane is squashed onto a line');
      else if (d > 0) meaning = MA.t('areas ×%s, orientation preserved', fmt(ad, 3));
      else meaning = MA.t('areas ×%s, orientation reversed', fmt(ad, 3));
      parts.push(el('span', { class: d < -1e-10 ? 'w-la-warn' : 'w-la-note', text: meaning }));
      if (t < 1) parts.push(MA.ui.kv('t =', t.toFixed(2)));
      info.set(...parts);
      const p2 = [];
      if (eigenOn) {
        const lam = (l) => 1 - s + s * l;
        if (E.type === 'real') {
          E.ls.forEach((l, k) => p2.push({ tex: '\\lambda_' + (k + 1) + ' = ' + tn(lam(l), 4) + ',\\ \\mathbf v_' + (k + 1) + ' = ' + tvec(niceDir(E.vs[k]), 3) }));
        } else if (E.type === 'defective') {
          p2.push({ tex: '\\lambda = ' + tn(lam(E.ls[0]), 4) + '\\ (\\text{' + MA.t('repeated') + '})' });
          p2.push(el('span', { class: 'w-la-note', text: MA.t('only one eigen-direction:') }), { tex: 'A \\text{ ' + MA.t('is not diagonalisable') + '},\\ \\mathbf v = ' + tvec(niceDir(E.vs[0]), 3) });
        } else if (E.type === 'scalar') {
          p2.push({ tex: 'A = ' + tn(E.ls[0], 4) + 'I' }, el('span', { class: 'w-la-note', text: MA.t('every nonzero vector is an eigenvector') }));
        } else {
          const re = 1 - s + s * E.re, im = s * E.im;
          p2.push({ tex: '\\lambda = ' + tn(re, 4) + ' \\pm ' + tn(im, 4) + 'i' }, el('span', { class: 'w-la-note', text: MA.t('complex eigenvalues: no real eigenvector — every direction is rotated') }));
        }
      }
      vecs.forEach((v, k) => {
        const Av = mul(M, v);
        const sub = vecs.length > 1 ? '_' + (k + 1) : '';
        p2.push({ tex: '\\mathbf v' + sub + ' = ' + tvec(v, 3) + ',\\ A\\mathbf v' + sub + ' = ' + tvec(Av, 3) });
        const cr = v[0] * Av[1] - v[1] * Av[0];
        if (norm(v) > 1e-9 && norm(Av) > 1e-9 && Math.abs(cr) < 1e-3 * norm(v) * norm(Av)) {
          p2.push(el('span', { class: 'w-la-note', text: MA.t('v is an eigenvector: Av = %s v', fmt(dot(v, Av) / dot(v, v), 3)) }));
        }
      });
      info2.set(...p2);
      showEl(info2.el, p2.length > 0);
    }

    const anim = MA.anim(safeStep((dt) => {
      t = Math.min(1, t + dt / 1.8);
      if (tSlider) tSlider.set(t);
      draw();
      return t < 1;
    }));
    if (canAnimate) {
      MA.ui.button(bar, { label: MA.t('Play from identity'), primary: true, onClick: safe(() => { touched = true; anim.stop(); t = 0; anim.play(); }) });
      tSlider = MA.ui.slider(bar, { label: 't', min: 0, max: 1, step: 0.01, value: t, fmt: (v) => v.toFixed(2), onInput: safe((v) => { touched = true; anim.stop(); t = v; draw(); }) });
    }
    MA.ui.toggle(bar, { label: MA.t('Eigenvectors'), value: eigenOn, onChange: safe((v) => { eigenOn = v; draw(); }) });
    let ent = null;
    if (editable) {
      const bar2 = MA.ui.bar(stage);
      stage.insertBefore(bar2, info.el);
      ent = entrySliders(bar2, A, () => { touched = true; anim.stop(); t = 1; if (tSlider) tSlider.set(1); draw(); });
      MA.ui.button(bar2, { label: MA.t('Reset'), onClick: safe(() => { anim.stop(); A0.forEach((r, i) => r.forEach((v, j) => { A[i][j] = v; })); ent.set(A); t = 1; if (tSlider) tSlider.set(1); draw(); }) });
    }
    // draggable vectors
    vecs.forEach((v) => {
      P.handle(v[0], v[1], { label: MA.t('Vector v'), color: 'var(--accent)',
        constrain: (x, y) => [Math.round(clamp(x, P.x0, P.x1) * 10) / 10, Math.round(clamp(y, P.y0, P.y1) * 10) / 10],
        onDrag: safe((x, y) => { v[0] = x; v[1] = y; draw(); }) });
    });
    if (canAnimate && !anim.reduce) {
      t = 0;
      if (tSlider) tSlider.set(0);
      whenVisible(P.wrap, () => { if (!touched) anim.play(); });
    }
    draw();
  });

  // ------------------------------------------------------------------ svd
  /** SVD of a 2×2 matrix with V a rotation (angle in (−π/2, π/2]); U is a rotation or (det A < 0) a reflection. */
  function svd2(A) {
    const [[a, b], [c, d]] = A;
    const p = a * a + c * c, q = a * b + c * d, r = b * b + d * d;
    const th = 0.5 * Math.atan2(2 * q, p - r);
    const mid = (p + r) / 2, rad = Math.hypot((p - r) / 2, q);
    const s1 = Math.sqrt(Math.max(0, mid + rad));
    const dt = det2(A);
    const s2 = s1 > 1e-300 ? Math.abs(dt) / s1 : 0;
    const v1 = [Math.cos(th), Math.sin(th)], v2 = [-Math.sin(th), Math.cos(th)];
    const tiny = 1e-12 * Math.max(1, s1);
    const Av1 = mul(A, v1), Av2 = mul(A, v2);
    const u1 = s1 > tiny ? [Av1[0] / s1, Av1[1] / s1] : [1, 0];
    let u2 = s2 > tiny ? [Av2[0] / s2, Av2[1] / s2] : [-u1[1], u1[0]];
    // re-orthogonalise (rounding) while keeping the orientation
    const sgn = (u1[0] * u2[1] - u1[1] * u2[0]) < 0 ? -1 : 1;
    u2 = [-sgn * u1[1], sgn * u1[0]];
    return { s1, s2, th, v1, v2, u1, u2, det: dt,
      U: [[u1[0], u2[0]], [u1[1], u2[1]]], Vt: [[v1[0], v1[1]], [v2[0], v2[1]]], refl: sgn < 0 };
  }
  /** A path from I (s = 0) to the orthogonal matrix Q (s = 1): a rotation, or a reflection as a fold through the mirror line. */
  function orthoPath(Q, s) {
    const beta = Math.atan2(Q[1][0], Q[0][0]);
    if (det2(Q) > 0) return rot(beta * s);
    const g = beta / 2;
    return mm(rot(g), mm([[1, 0], [0, 1 - 2 * s]], rot(-g)));
  }

  MA.widget('svd', (stage, cfg) => {
    const A0 = matrix2(cfg.matrix, '3,0; 4,5', 'svd');
    const editable = C.bool(cfg.editable, true);
    const A = A0.map((r) => r.slice());
    let S = svd2(A);
    let T = 0, target = 0, pause = 0, playAll = false, touched = false;

    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: MA.t('image of the unit circle'), color: 'var(--series-1)', swatch: true },
      { label: '\\mathbf v_1 \\to \\sigma_1\\mathbf u_1', color: 'var(--series-2)' }, { label: '\\mathbf v_2 \\to \\sigma_2\\mathbf u_2', color: 'var(--series-3)' },
      { label: MA.t('final image Ax'), color: 'var(--ink-3)' }]);
    const viewR = () => { const r = Math.max(1.6, 1.18 * Math.max(1, S.s1)); return Math.ceil(r * 2) / 2; };
    let R = viewR();
    const P = new MA.Plot(stage, { x: [-R, R], y: [-R, R], equal: true, height: 440, label: MA.t('The unit circle under V transpose, then Sigma, then U') });
    const labels = texLabels(P);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let seg = null;

    const Sig = (q) => [[1 + q * (S.s1 - 1), 0], [0, 1 + q * (S.s2 - 1)]];
    function partial(T) {
      const k = Math.min(2, Math.floor(T + 1e-9));
      const s = ease(T - k);
      if (k === 0) return orthoPath(S.Vt, s);
      if (k === 1) return mm(Sig(s), S.Vt);
      return mm(orthoPath(S.U, s), mm(Sig(1), S.Vt));
    }
    const circle = (M, n = 180) => { const pts = []; for (let i = 0; i <= n; i++) { const a = 2 * Math.PI * i / n; pts.push(mul(M, [Math.cos(a), Math.sin(a)])); } return pts; };

    function draw() {
      const M = partial(T);
      P.clear('fill', 'curves', 'marks');
      labels.begin();
      P.path(circle([[1, 0], [0, 1]]), { color: 'var(--ink-3)', width: 1.2, dash: '4 4' });
      if (T < 2.999) P.path(circle(A), { color: 'var(--ink-3)', width: 1.4, dash: '2 4', opacity: 0.9 });
      const img = circle(M);
      P.poly(img, { fill: 'var(--series-1)', fillOpacity: 0.14 });
      P.path(img, { color: 'var(--series-1)', width: 2.2 });
      // where the singular directions are right now
      const w1 = mul(M, S.v1), w2 = mul(M, S.v2);
      const at = Math.abs(T - Math.round(T)) < 0.004 ? Math.round(T) : -1;
      if (at === 3) {
        spanLine(P, S.u1, { color: 'var(--series-2)', width: 1, dash: '6 5', opacity: 0.6 });
        spanLine(P, S.u2, { color: 'var(--series-3)', width: 1, dash: '6 5', opacity: 0.6 });
      } else if (at === 0) {
        spanLine(P, S.v1, { color: 'var(--series-2)', width: 1, dash: '6 5', opacity: 0.6 });
        spanLine(P, S.v2, { color: 'var(--series-3)', width: 1, dash: '6 5', opacity: 0.6 });
      }
      arrow(P, [0, 0], w1, { color: 'var(--series-2)', width: 2.8, dotIfZero: true });
      arrow(P, [0, 0], w2, { color: 'var(--series-3)', width: 2.8, dotIfZero: true });
      if (at >= 0) {
        const names = [['\\mathbf v_1', '\\mathbf v_2'], ['\\mathbf e_1', '\\mathbf e_2'], ['\\sigma_1\\mathbf e_1', '\\sigma_2\\mathbf e_2'], ['\\sigma_1\\mathbf u_1', '\\sigma_2\\mathbf u_2']][at];
        let o = outward(P, w1[0], w1[1], 22);
        labels.put('w1', w1[0], w1[1], names[0], { color: 'var(--series-2)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
        o = outward(P, w2[0], w2[1], 22);
        labels.put('w2', w2[0], w2[1], names[1], { color: 'var(--series-3)', anchor: 'middle', dx: o.dx, dy: o.dy, size: 14 });
      }
      labels.end();
      describe(at);
    }

    function describe(at) {
      const Sg = [[S.s1, 0], [0, S.s2]];
      info.set({ tex: '\\underbrace{' + pmat(A, 3) + '}_{A} = \\underbrace{' + pmat(S.U, 3) + '}_{U}\\,\\underbrace{' + pmat(Sg, 4) + '}_{\\Sigma}\\,\\underbrace{' + pmat(S.Vt, 3) + '}_{V^{\\mathsf T}}' });
      const k = at >= 0 ? at : Math.min(2, Math.floor(T)) + 1;
      const thV = deg(-S.th);
      const bU = deg(Math.atan2(S.U[1][0], S.U[0][0]));
      let txt;
      if (k === 0) txt = MA.t('The unit circle with the right singular vectors v₁, v₂ (orthonormal).');
      else if (k === 1) txt = MA.t('Step 1: Vᵀ rotates by %s°, taking v₁ to e₁ and v₂ to e₂.', fmt(thV, 3));
      else if (k === 2) txt = MA.t('Step 2: Σ stretches by σ₁ = %s along the x-axis and σ₂ = %s along the y-axis: the circle becomes an ellipse.', fmt(S.s1, 4), fmt(S.s2, 4));
      else if (S.refl) txt = MA.t('Step 3: U reflects in the line at %s° (det A < 0), taking e₁ to u₁ and e₂ to u₂. Result: Av₁ = σ₁u₁, Av₂ = σ₂u₂.', fmt(bU / 2, 3));
      else txt = MA.t('Step 3: U rotates by %s°, taking e₁ to u₁ and e₂ to u₂. Result: Av₁ = σ₁u₁, Av₂ = σ₂u₂.', fmt(bU, 3));
      const parts = [el('span', { text: txt })];
      parts.push(MA.ui.kv('\\sigma_1 =', fmt(S.s1, 4)), MA.ui.kv('\\sigma_2 =', fmt(S.s2, 4)), MA.ui.kv('\\sigma_1\\sigma_2 = |\\det A| =', fmt(S.s1 * S.s2, 4)));
      if (S.s2 < 1e-9 * Math.max(1, S.s1)) parts.push(el('span', { class: 'w-la-warn', text: S.s1 < 1e-12 ? MA.t('A = 0') : MA.t('σ₂ = 0: A is singular (rank 1) and flattens the circle to a segment') }));
      else parts.push(MA.ui.kv(MA.t('condition number σ₁/σ₂ ='), fmt(S.s1 / S.s2, 4)));
      info2.set(...parts);
    }

    const anim = MA.anim(safeStep((dt) => {
      if (pause > 0) { pause -= dt; return true; }
      const dir = Math.sign(target - T);
      if (!dir) return false;
      let nT = T + dir * dt / 1.25;
      const nextInt = dir > 0 ? Math.floor(T + 1e-9) + 1 : Math.ceil(T - 1e-9) - 1;
      if ((dir > 0 && nT >= nextInt) || (dir < 0 && nT <= nextInt)) { nT = nextInt; if (playAll && nT !== target) pause = 0.7; }
      if ((dir > 0 && nT >= target) || (dir < 0 && nT <= target)) nT = target;
      T = nT;
      if (Math.abs(T - Math.round(T)) < 1e-9 && seg) seg.set(Math.round(T));
      draw();
      return T !== target || pause > 0;
    }));
    const go = (k, all) => { touched = true; target = k; playAll = !!all; pause = 0; anim.play(); };
    seg = MA.ui.seg(bar, { options: [[0, '\\mathbf x'], [1, 'V^{\\mathsf T}\\mathbf x'], [2, '\\Sigma V^{\\mathsf T}\\mathbf x'], [3, 'U\\Sigma V^{\\mathsf T}\\mathbf x']],
      value: 0, onChange: safe((k) => go(k, false)) });
    MA.ui.button(bar, { label: MA.t('Play'), primary: true, onClick: safe(() => { anim.stop(); if (T >= 3 - 1e-9) T = 0; go(3, true); }) });
    if (editable) {
      const bar2 = MA.ui.bar(stage);
      stage.insertBefore(bar2, info.el);
      entrySliders(bar2, A, () => {
        touched = true;
        S = svd2(A);
        const r = viewR();
        if (r > R || r < R * 0.6) { R = r; P.setView([-R, R], [-R, R]); }
        draw();
      });
    }
    if (anim.reduce) { T = target = 3; seg.set(3); }
    else whenVisible(P.wrap, () => { if (!touched) go(3, true); });
    draw();
  });

  // ------------------------------------------------------------------ projection
  MA.widget('projection', (stage, cfg) => {
    const u = vec2(cfg.u, '3,1', 'projection: u'), v = vec2(cfg.v, '1,2', 'projection: v');
    let mode = C.str(cfg.mode, 'projection');
    if (mode !== 'projection' && mode !== 'gram-schmidt') throw new Error('projection: ' + MA.t('mode must be projection or gram-schmidt'));
    let gsStep = 3;
    const m = Math.max(3, Math.ceil(1.3 * Math.max(...u.concat(v).map(Math.abs))));
    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    stage.append(legBox);
    const P = new MA.Plot(stage, { x: [-m, m], y: [-m, m], equal: true, height: 420, label: MA.t('Two draggable vectors, a projection and an orthonormal basis') });
    const labels = texLabels(P);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let stepSeg = null;

    function rightAngle(at, d1, d2, color) {
      const s = 11 / P.sx;
      const a = [at[0] + s * d1[0], at[1] + s * d1[1]], b = [a[0] + s * d2[0], a[1] + s * d2[1]], c = [at[0] + s * d2[0], at[1] + s * d2[1]];
      P.path([a, b, c], { color, width: 1.3 });
    }
    const unit = (a) => { const L = norm(a); return L > 1e-12 ? [a[0] / L, a[1] / L] : null; };
    const lab = (key, p, tex, color, px = 20) => { const o = outward(P, p[0], p[1], px); labels.put(key, p[0], p[1], tex, { color, anchor: 'middle', dx: o.dx, dy: o.dy, size: 14, w: 220 }); };
    /** Label beside the middle of a vector, on its left (side = 1) or right (side = −1) in screen terms. */
    const sideLab = (key, p, tex, color, side) => {
      const o = outward(P, p[0], p[1], 15);
      labels.put(key, p[0] * 0.55, p[1] * 0.55, tex, { color, anchor: 'middle', dx: side * o.dy, dy: -side * o.dx, size: 14, w: 120 });
    };

    function legend() {
      legBox.replaceChildren();
      const items = mode === 'projection'
        ? [{ label: '\\mathbf u', color: 'var(--series-1)' }, { label: '\\mathbf v', color: 'var(--series-2)' }, { label: '\\operatorname{proj}_{\\mathbf u}\\mathbf v', color: 'var(--series-3)' }, { label: '\\mathbf v-\\operatorname{proj}_{\\mathbf u}\\mathbf v', color: 'var(--series-4)' }]
        : [{ label: '\\mathbf u, \\mathbf v', color: 'var(--ink-3)' }, { label: '\\mathbf e_1', color: 'var(--series-1)' }, { label: '\\mathbf w_2', color: 'var(--series-4)' }, { label: '\\mathbf e_2', color: 'var(--series-3)' }];
      MA.ui.legend(legBox, items);
    }

    function draw() {
      P.clear('fill', 'curves', 'marks');
      labels.begin();
      const uu = dot(u, u), uv = dot(u, v);
      const eu = unit(u);
      if (eu) spanLine(P, u, { color: 'var(--ink-3)', width: 1.1, dash: '6 5', opacity: 0.8 });
      if (mode === 'projection') {
        arrow(P, [0, 0], u, { color: 'var(--series-1)', width: 2.8 });
        arrow(P, [0, 0], v, { color: 'var(--series-2)', width: 2.8 });
        lab('u', u, '\\mathbf u', 'var(--series-1)');
        lab('v', v, '\\mathbf v', 'var(--series-2)');
        if (!eu) { labels.end(); info.set(el('span', { class: 'w-la-warn', text: MA.t('u = 0: there is no line to project onto.') })); info2.set(); return; }
        const c = uv / uu, p = [c * u[0], c * u[1]];
        const w = [v[0] - p[0], v[1] - p[1]];
        P.line(p[0], p[1], v[0], v[1], { color: 'var(--series-4)', width: 2.2, dash: '6 4' });
        arrow(P, [0, 0], p, { color: 'var(--series-3)', width: 3.4, dotIfZero: true });
        const ew = unit(w);
        if (ew && norm(w) * P.sx > 18 && norm(p) * P.sx > 14) rightAngle(p, [-Math.sign(c || 1) * eu[0], -Math.sign(c || 1) * eu[1]], ew, 'var(--ink-2)');
        const pm = [p[0] / 2, p[1] / 2];
        const nrm = [-eu[1], eu[0]];
        const side = dot(v, nrm) > 0 ? -1 : 1;
        labels.put('p', pm[0], pm[1], '\\operatorname{proj}_{\\mathbf u}\\mathbf v', { color: 'var(--series-3)', anchor: 'middle', dx: side * nrm[0] * 22, dy: -side * nrm[1] * 22, size: 13, w: 160 });
        const wm = [(p[0] + v[0]) / 2, (p[1] + v[1]) / 2];
        if (ew) labels.put('w', wm[0], wm[1], '\\mathbf v-\\operatorname{proj}_{\\mathbf u}\\mathbf v', { color: 'var(--series-4)', anchor: dot(eu, [1, 0]) * side > 0 ? 'start' : 'end', dx: eu[0] * 12, dy: -eu[1] * 12, size: 13, w: 200 });
        labels.end();
        const th = Math.acos(clamp(uv / Math.sqrt(uu * dot(v, v) || 1), -1, 1));
        info.set({ tex: '\\operatorname{proj}_{\\mathbf u}\\mathbf v = \\frac{\\mathbf u\\cdot\\mathbf v}{\\mathbf u\\cdot\\mathbf u}\\,\\mathbf u = \\frac{' + tn(uv, 4) + '}{' + tn(uu, 4) + '}\\,\\mathbf u = ' + tvec(p, 3) });
        const parts = [MA.ui.kv('\\lVert\\mathbf v-\\operatorname{proj}_{\\mathbf u}\\mathbf v\\rVert =', fmt(norm(w), 4)), el('span', { class: 'w-la-note', text: MA.t('(distance from v to the line through u)') })];
        if (norm(v) > 1e-12) parts.push(MA.ui.kv(MA.t('angle'), fmt(deg(th), 4) + '°'));
        parts.push(MA.ui.kv('(\\mathbf v-\\operatorname{proj}_{\\mathbf u}\\mathbf v)\\cdot\\mathbf u =', fmt(dot(w, u), 3)));
        info2.set(...parts);
        return;
      }
      // Gram–Schmidt
      P.circle(0, 0, 1, { color: 'var(--ink-3)', width: 1, dash: '3 4' });
      arrow(P, [0, 0], u, { color: 'var(--ink-3)', width: 1.8 });
      arrow(P, [0, 0], v, { color: 'var(--ink-3)', width: 1.8 });
      lab('u', u, '\\mathbf u', 'var(--ink-2)');
      lab('v', v, '\\mathbf v', 'var(--ink-2)');
      if (!eu) { labels.end(); info.set(el('span', { class: 'w-la-warn', text: MA.t('u = 0 cannot be normalised: Gram–Schmidt needs independent vectors.') })); info2.set(); return; }
      arrow(P, [0, 0], eu, { color: 'var(--series-1)', width: 3.4 });
      const ccw = eu[0] * v[1] - eu[1] * v[0] >= 0 ? 1 : -1;
      sideLab('e1', eu, '\\mathbf e_1', 'var(--series-1)', -ccw);
      const parts = [{ tex: '\\mathbf e_1 = \\frac{\\mathbf u}{\\lVert\\mathbf u\\rVert} = ' + tvec(eu, 3) }];
      const ve = dot(v, eu);
      const p = [ve * eu[0], ve * eu[1]];
      const w = [v[0] - p[0], v[1] - p[1]];
      const ew = unit(w);
      const dependent = !ew || norm(w) < 1e-9 * Math.max(1, norm(v));
      if (gsStep >= 2) {
        arrow(P, [0, 0], p, { color: 'var(--ink-3)', width: 1.4, dash: '5 4' });
        P.line(p[0], p[1], v[0], v[1], { color: 'var(--series-4)', width: 1.6, dash: '5 4' });
        if (!dependent) {
          arrow(P, [0, 0], w, { color: 'var(--series-4)', width: 2.8 });
          lab('w2', w, '\\mathbf w_2', 'var(--series-4)');
        }
        parts.push({ tex: '\\mathbf w_2 = \\mathbf v - (\\mathbf v\\cdot\\mathbf e_1)\\,\\mathbf e_1 = ' + tvec(w, 3) });
      }
      if (gsStep >= 3 && !dependent) {
        arrow(P, [0, 0], ew, { color: 'var(--series-3)', width: 3.4 });
        sideLab('e2', ew, '\\mathbf e_2', 'var(--series-3)', ccw);
        rightAngle([0, 0], eu, ew, 'var(--ink-2)');
        parts.push({ tex: '\\mathbf e_2 = \\frac{\\mathbf w_2}{\\lVert\\mathbf w_2\\rVert} = ' + tvec(ew, 3) });
      }
      labels.end();
      info.set(...parts);
      if (dependent && gsStep >= 2) info2.set(el('span', { class: 'w-la-warn', text: MA.t('v is a multiple of u: w₂ = 0, so u and v are dependent and span only a line.') }));
      else if (gsStep >= 3) info2.set({ tex: '\\mathbf e_1\\cdot\\mathbf e_2 = ' + tn(dot(eu, ew), 3) + ',\\quad \\lVert\\mathbf e_1\\rVert = \\lVert\\mathbf e_2\\rVert = 1' }, el('span', { class: 'w-la-note', text: MA.t('— an orthonormal basis with the same span as u, v') }));
      else info2.set(el('span', { class: 'w-la-note', text: gsStep === 1 ? MA.t('Step 1: normalise u.') : MA.t('Step 2: remove from v its component along e₁; what is left is orthogonal to e₁.') }));
    }

    MA.ui.seg(bar, { options: [['projection', MA.t('Projection')], ['gram-schmidt', MA.t('Gram–Schmidt')]], value: mode,
      onChange: safe((k) => { mode = k; showEl(stepSeg.el, mode === 'gram-schmidt'); legend(); draw(); }) });
    stepSeg = MA.ui.seg(bar, { label: MA.t('Step@@number'), options: [[1, '1'], [2, '2'], [3, '3']], value: gsStep, onChange: safe((k) => { gsStep = k; draw(); }) });
    showEl(stepSeg.el, mode === 'gram-schmidt');
    const snap = (x, y) => [Math.round(clamp(x, P.x0, P.x1) * 10) / 10, Math.round(clamp(y, P.y0, P.y1) * 10) / 10];
    P.handle(u[0], u[1], { label: MA.t('Vector u'), color: 'var(--series-1)', constrain: snap, onDrag: safe((x, y) => { u[0] = x; u[1] = y; draw(); }) });
    P.handle(v[0], v[1], { label: MA.t('Vector v'), color: 'var(--series-2)', constrain: snap, onDrag: safe((x, y) => { v[0] = x; v[1] = y; draw(); }) });
    legend();
    draw();
  });

  // ------------------------------------------------------------------ rowreduce: exact rational arithmetic
  const babs = (a) => (a < 0n ? -a : a);
  const bgcd = (a, b) => { a = babs(a); b = babs(b); while (b) { const r = a % b; a = b; b = r; } return a; };
  class Frac {
    constructor(n, d = 1n) {
      if (d === 0n) throw new Error(MA.t('division by zero'));
      if (d < 0n) { n = -n; d = -d; }
      const g = bgcd(n, d) || 1n;
      this.n = n / g; this.d = d / g;
    }
    static int(k) { return new Frac(BigInt(k), 1n); }
    /** Exact value of a JavaScript number written in decimal (0.1 -> 1/10). */
    static fromNumber(v) {
      if (!Number.isFinite(v)) throw new Error('not finite');
      if (Number.isInteger(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER) return Frac.int(v);
      const m = /^(-?)(\d+)(?:\.(\d+))?(?:e([+-]?\d+))?$/.exec(String(v));
      if (!m) throw new Error('bad number');
      const frac = m[3] || '';
      let n = BigInt(m[2] + frac), d = 10n ** BigInt(frac.length);
      const e = m[4] ? parseInt(m[4], 10) : 0;
      if (e > 0) n *= 10n ** BigInt(e); else if (e < 0) d *= 10n ** BigInt(-e);
      return new Frac(m[1] ? -n : n, d);
    }
    add(o) { return new Frac(this.n * o.d + o.n * this.d, this.d * o.d); }
    sub(o) { return new Frac(this.n * o.d - o.n * this.d, this.d * o.d); }
    mul(o) { return new Frac(this.n * o.n, this.d * o.d); }
    div(o) { return new Frac(this.n * o.d, this.d * o.n); }
    neg() { return new Frac(-this.n, this.d); }
    abs() { return new Frac(babs(this.n), this.d); }
    isZero() { return this.n === 0n; }
    isOne() { return this.n === 1n && this.d === 1n; }
    sign() { return this.n > 0n ? 1 : this.n < 0n ? -1 : 0; }
    eq(o) { return this.n === o.n && this.d === o.d; }
    tex() { const a = babs(this.n); return (this.n < 0n ? '-' : '') + (this.d === 1n ? String(a) : '\\frac{' + a + '}{' + this.d + '}'); }
    /** Coefficient in front of a row name: 1 -> '', 2 -> '2', 1/2 -> '\tfrac12'. */
    coefTeX() { const a = babs(this.n); if (a === 1n && this.d === 1n) return ''; return this.d === 1n ? String(a) : '\\tfrac{' + a + '}{' + this.d + '}'; }
    size() { return String(babs(this.n)).length + String(this.d).length; }
  }
  const NOT_RATIONAL = 'not rational';
  /** Evaluate a matrix entry exactly ("3", "-1/2", "0.25", "2^3", "(1+2)/7"). */
  function exactEntry(src) {
    const s = String(src).trim();
    if (!s) throw new Error(MA.t('empty matrix entry'));
    let ast;
    try { ast = MA.expr.parse(s, { vars: [] }); } catch (e) { throw new Error('“' + s + '”: ' + e.message); }
    const ev = (n) => {
      switch (n.t) {
        case 'num': return Frac.fromNumber(n.v);
        case 'neg': return ev(n.a).neg();
        case 'bin': {
          const a = ev(n.a), b = ev(n.b);
          if (n.op === '+') return a.add(b);
          if (n.op === '-') return a.sub(b);
          if (n.op === '*') return a.mul(b);
          if (n.op === '/') { if (b.isZero()) throw new Error(MA.t('division by zero in “%s”', s)); return a.div(b); }
          if (n.op === '^') {
            if (b.d !== 1n || babs(b.n) > 64n) throw new Error(NOT_RATIONAL);
            let r = Frac.int(1);
            for (let k = 0n; k < babs(b.n); k++) r = r.mul(a);
            return b.n < 0n ? Frac.int(1).div(r) : r;
          }
          break;
        }
      }
      throw new Error(NOT_RATIONAL);
    };
    try { return ev(ast); } catch (e) {
      if (e.message === NOT_RATIONAL) throw new Error(MA.t('row reduction uses exact fractions: “%s” is not a rational number', s));
      throw e;
    }
  }
  const opTeX = (st) => {
    const R = (i) => 'R_{' + (i + 1) + '}';
    if (st.type === 'swap') return R(st.i) + ' \\leftrightarrow ' + R(st.j);
    if (st.type === 'scale') return R(st.i) + ' \\to ' + (st.k.sign() < 0 ? '-' : '') + st.k.coefTeX() + R(st.i);
    return R(st.i) + ' \\to ' + R(st.i) + (st.k.sign() < 0 ? ' - ' : ' + ') + st.k.coefTeX() + R(st.j);
  };
  const noteTeX = (st, row) => {
    const R = (i) => 'R_{' + (i + 1) + '}';
    if (st.type === 'swap') return '\\leftarrow ' + R(row === st.i ? st.j : st.i);
    if (st.type === 'scale') return '\\leftarrow ' + (st.k.sign() < 0 ? '-' : '') + st.k.coefTeX() + R(st.i);
    return '\\leftarrow ' + R(st.i) + (st.k.sign() < 0 ? ' - ' : ' + ') + st.k.coefTeX() + R(st.j);
  };

  /** Gaussian elimination to echelon form (forward phase), then to reduced form (backward phase). */
  function reduce(M0) {
    const m = M0.length, n = M0[0].length;
    const M = M0.map((r) => r.slice());
    const steps = [{ M: M.map((r) => r.slice()), piv: [], cur: null, phase: 'start' }];
    const pivots = [];
    const push = (o) => steps.push(Object.assign({ M: M.map((r) => r.slice()), piv: pivots.map((p) => p.slice()) }, o));
    let r = 0;
    for (let c = 0; c < n && r < m; c++) {
      let p = -1;
      if (!M[r][c].isZero()) p = r;
      else {
        for (let i = r + 1; i < m; i++) if (!M[i][c].isZero() && (p < 0 || (M[i][c].abs().isOne() && !M[p][c].abs().isOne()))) p = i;
      }
      if (p < 0) continue;
      if (p !== r) { [M[r], M[p]] = [M[p], M[r]]; push({ type: 'swap', i: r, j: p, cur: [r, c], phase: 'forward', why: 'swap' }); }
      pivots.push([r, c]);
      for (let i = r + 1; i < m; i++) {
        if (M[i][c].isZero()) continue;
        const k = M[i][c].div(M[r][c]);
        M[i] = M[i].map((x, j) => x.sub(k.mul(M[r][j])));
        push({ type: 'add', i, j: r, k: k.neg(), cur: [r, c], phase: 'forward', why: 'below' });
      }
      r++;
    }
    const nForward = steps.length - 1;
    if (nForward > 0) steps[nForward].piv = pivots.map((p) => p.slice());
    for (let q = pivots.length - 1; q >= 0; q--) {
      const [pr, pc] = pivots[q];
      if (!M[pr][pc].isOne()) {
        const k = Frac.int(1).div(M[pr][pc]);
        M[pr] = M[pr].map((x) => x.mul(k));
        push({ type: 'scale', i: pr, k, cur: [pr, pc], phase: 'backward', why: 'scale' });
      }
      for (let i = pr - 1; i >= 0; i--) {
        if (M[i][pc].isZero()) continue;
        const k = M[i][pc];
        M[i] = M[i].map((x, j) => x.sub(k.mul(M[pr][j])));
        push({ type: 'add', i, j: pr, k: k.neg(), cur: [pr, pc], phase: 'backward', why: 'above' });
      }
    }
    return { steps, pivots, nForward, R: M };
  }

  /** The solution set read off the reduced matrix, as a list of info parts. */
  function solutionParts(R, pivots, aug) {
    const m = R.length, n = R[0].length;
    const nv = aug ? n - 1 : n;
    const pc = pivots.map((p) => p[1]);
    const rank = pivots.filter((p) => p[1] < nv).length;
    const xs = (j) => 'x_{' + (j + 1) + '}';
    const col = (v) => '\\begin{pmatrix}' + v.map((q) => q.tex()).join('\\\\') + '\\end{pmatrix}';
    const parts = [MA.ui.kv(MA.t('rank'), String(rank))];
    if (aug && pc.includes(n - 1)) {
      const row = pivots.find((p) => p[1] === n - 1)[0];
      parts.push(el('span', { class: 'w-la-warn', text: MA.t('No solution: row %d reads', row + 1) }), { tex: '0 = 1' }, el('span', { class: 'w-la-warn', text: MA.t('so the system is inconsistent.') }));
      return parts;
    }
    const free = [];
    for (let j = 0; j < nv; j++) if (!pc.includes(j)) free.push(j);
    const zero = Frac.int(0), one = Frac.int(1);
    if (!free.length) {
      if (aug) {
        const val = [];
        pivots.forEach(([i, j]) => { val[j] = R[i][n - 1]; });
        parts.push(el('span', { text: MA.t('Unique solution:') }), { tex: Array.from({ length: nv }, (_, j) => xs(j) + ' = ' + val[j].tex()).join(',\\quad ') });
      } else {
        parts.push(el('span', { text: MA.t('Only the trivial solution of Ax = 0: the columns are linearly independent') + (m === n ? MA.t(', and A is invertible.') : MA.p('.')) }));
      }
      return parts;
    }
    const p = Array.from({ length: nv }, () => zero);
    const vs = free.map(() => Array.from({ length: nv }, () => zero));
    pivots.forEach(([i, j]) => {
      if (aug) p[j] = R[i][n - 1];
      free.forEach((f, q) => { vs[q][j] = R[i][f].neg(); });
    });
    free.forEach((f, q) => { vs[q][f] = one; });
    const hasP = aug && p.some((q) => !q.isZero());
    const tex = '\\mathbf x = ' + (hasP ? col(p) + ' + ' : '') + free.map((f, q) => xs(f) + col(vs[q])).join(' + ');
    const fv = free.map((f) => 'x' + String(f + 1).replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d])).join(', ');
    if (aug) parts.push(el('span', { text: MA.t('Infinitely many solutions; free: %s.', fv) }));
    else parts.push(el('span', { text: MA.t('Ax = 0: null space of dimension %d; free: %s.', free.length, fv) }));
    parts.push({ tex });
    return parts;
  }

  MA.widget('rowreduce', (stage, cfg) => {
    if (!C.has(cfg.matrix)) throw new Error('rowreduce: ' + MA.t('a matrix is needed, e.g. “1,2,3; 4,5,6”'));
    const rows = C.list(cfg.matrix).map((r) => r.replace(/^\[|\]$/g, '').split(','));
    if (rows.some((r) => r.length !== rows[0].length)) throw new Error('rowreduce: ' + MA.t('matrix rows must have the same length (“a,b; c,d”)'));
    const m = rows.length, n = rows[0].length;
    if (m > 6 || n > 8) throw new Error('rowreduce: ' + MA.t('at most 6 rows and 8 columns (got %d×%d)', m, n));
    const M0 = rows.map((r) => r.map(exactEntry));
    const aug = C.bool(cfg.augmented, true) && n >= 2;
    const red = reduce(M0);
    const steps = red.steps, N = steps.length - 1;
    if (N) steps[0].cur = steps[1].cur;
    else steps[0].piv = red.pivots.map((q) => q.slice());
    let k = 0;

    MA.ui.title(stage, cfg.title);
    const root = el('div', { class: 'w-la-rr' + (N ? '' : ' solo') });
    const main = el('div', { class: 'w-la-main' });
    const head = el('div', { class: 'w-la-head' });
    const scroller = el('div', { class: 'w-la-scroll', tabindex: 0, role: 'group', 'aria-label': MA.t('Matrix after the current row operation; left and right arrow keys step through the reduction') });
    const grid = el('div', { class: 'w-la-mx' });
    scroller.append(grid);
    const opBox = el('div', { class: 'w-la-op', 'aria-live': 'polite' });
    main.append(head, scroller, opBox);
    root.append(main);
    const logBox = el('div', { class: 'w-la-log' });
    const ol = el('ol');
    if (N) {
      logBox.append(el('div', { class: 'lh', text: MA.t('Row operations') }), ol);
      root.append(logBox);
    }
    stage.append(root);
    const bar = MA.ui.bar(stage);
    bar.classList.add('w-la-bar');
    const info = MA.ui.info(stage);

    // operation log (built once)
    const items = [];
    steps.forEach((st, i) => {
      if (!i) return;
      if (i === red.nForward + 1 && red.nForward > 0) ol.append(el('li', { class: 'sep', text: MA.t('echelon form reached') }));
      const li = el('li', { title: MA.t('Go to step %d', i), value: i });
      li.append(MA.texEl(opTeX(st)));
      li.addEventListener('click', safe(() => { stop(); show(i); }));
      ol.append(li);
      items[i] = li;
    });

    // grid columns: row label | [ | entries … (bar) last | ] | note
    const colOf = (j) => 3 + j + (aug && j === n - 1 ? 1 : 0);
    const rbCol = 3 + n + (aug ? 1 : 0);
    const tmpl = ['auto', '8px'];
    for (let j = 0; j < n; j++) { if (aug && j === n - 1) tmpl.push('12px'); tmpl.push('auto'); }
    tmpl.push('8px', 'auto');
    grid.style.gridTemplateColumns = tmpl.join(' ');
    const place = (node, row, col, span) => { node.style.gridRow = span ? row + ' / span ' + span : String(row); node.style.gridColumn = String(col); grid.append(node); return node; };

    function renderGrid(st, prev) {
      grid.replaceChildren();
      for (let j = 0; j < n; j++) place(MA.tex(el('div', { class: 'h' }), aug && j === n - 1 ? 'b' : 'x_{' + (j + 1) + '}'), 1, colOf(j));
      place(el('div', { class: 'bk l' }), 2, 2, m);
      place(el('div', { class: 'bk r' }), 2, rbCol, m);
      if (aug) place(el('div', { class: 'bar' }), 2, colOf(n - 1) - 1, m);
      const tgt = new Set(), src = new Set();
      if (st.type === 'swap') { tgt.add(st.i); tgt.add(st.j); } else if (st.type) { tgt.add(st.i); if (st.type === 'add') src.add(st.j); }
      const isPiv = (i, j) => st.piv.some((p) => p[0] === i && p[1] === j);
      for (let i = 0; i < m; i++) {
        const gr = i + 2;
        if (tgt.has(i) || src.has(i)) {
          const bg = el('div', { class: 'rowbg ' + (tgt.has(i) ? 'tgt' : 'src') });
          bg.style.gridRow = String(gr); bg.style.gridColumn = '3 / ' + rbCol; grid.append(bg);
        }
        place(MA.tex(el('div', { class: 'rl' }), 'R_{' + (i + 1) + '}'), gr, 1);
        for (let j = 0; j < n; j++) {
          const cur = st.cur && st.cur[0] === i && st.cur[1] === j;
          const cls = 'c' + (isPiv(i, j) || cur ? ' piv' : '') + (cur ? ' cur' : '') + (prev && !prev.M[i][j].eq(st.M[i][j]) ? ' chg' : '');
          place(MA.tex(el('div', { class: cls }), st.M[i][j].tex()), gr, colOf(j));
        }
        const note = el('div', { class: 'on' });
        if (tgt.has(i)) MA.tex(note, noteTeX(st, i));
        place(note, gr, rbCol + 1);
      }
    }

    const WHY = {
      swap: 'Swap rows so that the pivot position holds a nonzero entry.',
      below: 'Subtract a multiple of the pivot row to create a zero below the pivot.',
      scale: 'Scale the row so that the pivot becomes 1.',
      above: 'Subtract a multiple of the pivot row to create a zero above the pivot.',
    };
    let btn = {};
    function show(i) {
      k = clamp(i, 0, N);
      const st = steps[k];
      renderGrid(st, k ? steps[k - 1] : null);
      head.replaceChildren(el('span', {}, el('b', { text: k ? MA.t('Step %d of %d', k, N) : MA.t('Original matrix') })),
        el('span', { text: k === N ? MA.t('reduced row echelon form') : k && st.phase === 'forward' ? MA.t('forward phase → echelon form') : k ? MA.t('backward phase → reduced form') : (aug ? MA.t('augmented matrix [A | b]') : '') }));
      opBox.replaceChildren();
      if (k) {
        opBox.append(MA.texEl(opTeX(st)), el('span', { text: MA.t(WHY[st.why]) }));
        if (k === red.nForward && red.nForward < N) opBox.append(el('span', { class: 'ph', text: MA.t('Echelon form reached: every pivot has zeros below it. Now work upwards.') }));
        if (k === N) opBox.append(el('span', { class: 'ph', text: MA.t('Done: each pivot is 1 and is the only nonzero entry in its column.') }));
      } else {
        opBox.append(el('span', { text: N ? MA.t('Press Next to apply the first elementary row operation. The circled entry is the first pivot position.') : MA.t('This matrix is already in reduced row echelon form.') }));
      }
      items.forEach((li, j) => { if (li) { li.classList.toggle('cur', j === k); li.classList.toggle('fut', j > k); } });
      if (items[k] && ol.parentElement) {
        const top = items[k].offsetTop - logBox.offsetTop, h = logBox.clientHeight;
        if (top < logBox.scrollTop || top > logBox.scrollTop + h - 30) logBox.scrollTop = Math.max(0, top - h / 2);
      }
      if (k === N) info.set(...solutionParts(red.R, red.pivots, aug));
      else info.set(el('span', { class: 'w-la-note', text: MA.t('The solution set appears when the reduced row echelon form is reached.') }));
      if (btn.back) { btn.start.disabled = btn.back.disabled = k === 0; btn.next.disabled = btn.end.disabled = k === N; }
    }

    let acc = 0;
    const anim = MA.anim(safeStep((dt) => {
      acc += dt;
      if (acc < 1.15) return true;
      acc = 0;
      show(k + 1);
      if (k >= N) { setPlay(false); return false; }
      return true;
    }));
    const setPlay = (on) => { btn.play.textContent = on ? MA.t('Pause') : MA.t('Play'); btn.play.setAttribute('aria-pressed', String(on)); };
    const stop = () => { anim.stop(); setPlay(false); };
    btn.start = MA.ui.button(bar, { label: '« ' + MA.t('Start'), onClick: safe(() => { stop(); show(0); }) });
    btn.back = MA.ui.button(bar, { label: '◀ ' + MA.t('Back'), onClick: safe(() => { stop(); show(k - 1); }) });
    btn.play = MA.ui.button(bar, { label: MA.t('Play'), primary: true, onClick: safe(() => {
      if (anim.running) { stop(); return; }
      if (k >= N) show(0);
      acc = 0.6; setPlay(true); anim.play();
    }) });
    btn.next = MA.ui.button(bar, { label: MA.t('Next@@step') + ' ▶', onClick: safe(() => { stop(); show(k + 1); }) });
    btn.end = MA.ui.button(bar, { label: MA.t('End') + ' »', onClick: safe(() => { stop(); show(N); }) });
    if (!N) Object.values(btn).forEach((b) => { b.disabled = true; });
    scroller.addEventListener('keydown', safe((e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stop(); show(k + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); stop(); show(k - 1); }
      else if (e.key === 'Home') { e.preventDefault(); stop(); show(0); }
      else if (e.key === 'End') { e.preventDefault(); stop(); show(N); }
    }));
    show(0);
  });
})();
