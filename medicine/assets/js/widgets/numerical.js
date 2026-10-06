/* Medicine Atlas (engine shared with Maths Atlas) — interactive figures: numerical analysis.
   interpolation (Runge, Chebyshev, splines), quadrature (log–log convergence), floatline (toy floating point),
   iterative (Jacobi, Gauss–Seidel, SOR on a 2×2 system). See tools/WIDGET_GUIDE.md. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;
  const fin = Number.isFinite;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  /** One <style> element for the classes used by this file (w-num-*). */
  function css() {
    if (document.getElementById('w-num-css')) return;
    const s = el('style', { id: 'w-num-css' });
    s.textContent = [
      '.w-num-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);border-top:1px solid var(--rule)}',
      '.w-num-pair>*+*{border-left:1px solid var(--rule)}',
      '.w-num-pair.wide{grid-template-columns:minmax(0,1.25fr) minmax(0,1fr)}',
      '@media (max-width:700px){.w-num-pair,.w-num-pair.wide{grid-template-columns:minmax(0,1fr)}.w-num-pair>*+*{border-left:0;border-top:1px solid var(--rule)}}',
      '.w-num-cap{padding:8px 16px 0;font-size:.78rem;font-weight:650;color:var(--ink-3);letter-spacing:.02em}',
      '.w-num-table{margin:6px 0 4px}',
      '.w-num-table td.l,.w-num-table th.l{text-align:left;font-family:var(--font)}',
      '.w-num-table .sw{display:inline-block;width:12px;height:3px;border-radius:2px;margin-right:7px;vertical-align:middle;background:var(--c)}',
      '.w-num-table tr.off td{opacity:.45}',
      '.w-num-table td{white-space:nowrap}',
      '.w-num-good{color:var(--good);font-weight:600}',
      '.w-num-bad{color:var(--bad);font-weight:600}',
      '.w-num-note{color:var(--ink-3)}',
      '.w-num-hide{display:none!important}',
    ].join('\n');
    document.head.append(s);
  }

  // ------------------------------------------------------------------ shared helpers
  const SUP = { '-': '⁻', '−': '⁻', '+': '', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const sup = (s) => String(s).replace(/[-−+\d]/g, (c) => SUP[c]);
  /** MA.fmt with ×10ⁿ instead of e-notation. */
  const nf = (v, sig = 4) => MA.fmt(v, sig).replace(/e([+-]?\d+)$/, (m, e) => '×10' + sup(e));
  /** A number for TeX. */
  function texNum(v, sig = 4) {
    const s = MA.fmt(v, sig).replace('−', '-').replace('∞', '\\infty');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(s);
    return m ? m[1] + '\\times 10^{' + (+m[2]) + '}' : s;
  }
  const texShift = (v, a) => (Math.abs(a) < 1e-15 ? v : v + (a > 0 ? ' - ' : ' + ') + texNum(Math.abs(a)));
  const texOf = (ast) => { try { return MA.expr.toTeX(ast); } catch (e) { return '?'; } };
  function fn1(ex, v) {
    const s = {};
    return (x) => { s[v] = x; try { return ex.f(s); } catch (e) { return NaN; } };
  }
  function spread(vals, q = 0.01) {
    const v = vals.filter(fin).sort((p, r) => p - r);
    if (!v.length) return null;
    return [v[Math.floor((v.length - 1) * q)], v[Math.ceil((v.length - 1) * (1 - q))]];
  }
  function pad(r, frac = 0.08) {
    let [a, b] = r;
    if (!(b - a > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)))) { const c = (a + b) / 2, w = Math.max(Math.abs(c) * 0.2, 1) / 2; a = c - w; b = c + w; }
    const p = (b - a) * frac;
    return [a - p, b + p];
  }
  const pow10Label = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + sup(k));
  /**
   * Grid lines and tick labels for a plot whose data coordinates are log10 values on the axes marked in o
   * ({xlog, ylog, xLabel, yLabel}); linear axes get ordinary ticks. Draws into the grid and axes layers.
   */
  function logFrame(P, o) {
    const g = P.layers.grid, ax = P.layers.axes;
    g.replaceChildren(); ax.replaceChildren();
    const L = P.pl, R = P.W - P.pr, T = P.pt, B = P.H - P.pb;
    const major = el('g', { class: 'grid' }), minor = el('g', { class: 'grid', style: 'opacity:.5' }), tk = el('g', { class: 'tick' });
    const lin = (lo, hi, n) => MA.ticks(lo, hi, n).values;
    const fmt = (v) => MA.fmt(+v.toPrecision(10), 6);
    // x
    if (o.xlog) {
      const every = P.x1 - P.x0 > 12 ? 2 : 1;
      for (let k = Math.floor(P.x0); k <= Math.ceil(P.x1); k++) {
        if (k >= P.x0 && k <= P.x1) {
          major.append(el('line', { x1: P.X(k), x2: P.X(k), y1: T, y2: B }));
          if (k % every === 0) tk.append(el('text', { x: P.X(k), y: B + 15, 'text-anchor': 'middle', text: pow10Label(k) }));
        }
        if (P.x1 - P.x0 <= 7) for (let m = 2; m <= 9; m++) { const v = k + Math.log10(m); if (v > P.x0 && v < P.x1) minor.append(el('line', { x1: P.X(v), x2: P.X(v), y1: T, y2: B })); }
      }
    } else {
      lin(P.x0, P.x1, Math.max(4, Math.round(P.W / 80))).forEach((v) => {
        major.append(el('line', { x1: P.X(v), x2: P.X(v), y1: T, y2: B }));
        if (P.X(v) > L + 4 && P.X(v) < R - 4) tk.append(el('text', { x: P.X(v), y: B + 15, 'text-anchor': 'middle', text: fmt(v) }));
      });
    }
    // y
    if (o.ylog) {
      const span = P.y1 - P.y0, every = span > 24 ? 4 : span > 12 ? 2 : 1;
      for (let k = Math.floor(P.y0); k <= Math.ceil(P.y1); k++) {
        if (k >= P.y0 && k <= P.y1) {
          major.append(el('line', { x1: L, x2: R, y1: P.Y(k), y2: P.Y(k) }));
          if (k % every === 0 && P.Y(k) > T + 4) tk.append(el('text', { x: L - 6, y: P.Y(k) + 4, 'text-anchor': 'end', text: pow10Label(k) }));
        }
        if (span <= 7) for (let m = 2; m <= 9; m++) { const v = k + Math.log10(m); if (v > P.y0 && v < P.y1) minor.append(el('line', { x1: L, x2: R, y1: P.Y(v), y2: P.Y(v) })); }
      }
    } else {
      lin(P.y0, P.y1, Math.max(3, Math.round(P.H / 60))).forEach((v) => {
        major.append(el('line', { x1: L, x2: R, y1: P.Y(v), y2: P.Y(v) }));
        if (P.Y(v) > T + 4 && P.Y(v) < B - 4) tk.append(el('text', { x: L - 6, y: P.Y(v) + 4, 'text-anchor': 'end', text: fmt(v) }));
      });
    }
    g.append(minor, major);
    ax.append(el('g', { class: 'axis' }, el('line', { x1: L, x2: R, y1: B, y2: B }), el('line', { x1: L, x2: L, y1: T, y2: B })), tk);
    if (o.xLabel) ax.append(o.outside ? el('text', { class: 'lbl', x: (L + R) / 2, y: B + 31, 'text-anchor': 'middle', style: 'fill:var(--ink-2)', text: o.xLabel })
      : el('text', { class: 'lbl', x: R - 4, y: B - 8, 'text-anchor': 'end', style: 'fill:var(--ink-2)', text: o.xLabel }));
    if (o.yLabel) ax.append(o.outside ? el('text', { class: 'lbl', x: L - 6, y: T - 8, style: 'fill:var(--ink-2)', text: o.yLabel })
      : el('text', { class: 'lbl', x: L + 8, y: T + 14, style: 'fill:var(--ink-2)', text: o.yLabel }));
  }
  /** A small dot without the halo ring of P.dot (so it does not cut thin lines). */
  function pt(P, x, y, r, color) {
    const e = P.dot(x, y, { r, color });
    e.style.stroke = 'none';
    return e;
  }
  /** Text input like MA.ui.text; onChange(value) returns an error message or null. */
  function textInput(bar, o) {
    const wrap = el('label', { class: 'w-ctl' });
    const input = el('input', { type: 'text', value: o.value || '', spellcheck: 'false', autocomplete: 'off' });
    if (o.width) input.style.width = o.width + 'px';
    const msg = el('span', { class: 'w-num-bad', style: 'font-size:.8125rem;font-weight:400' });
    const run = () => { let m = null; try { m = o.onChange(input.value); } catch (e) { m = e.message; } input.classList.toggle('bad', !!m); msg.textContent = m || ''; };
    input.addEventListener('change', run);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
    const nm = el('span', { class: 'nm' });
    if (/[\\^_{}]/.test(o.label)) MA.tex(nm, o.label, false); else nm.textContent = o.label;
    wrap.append(nm, input);
    bar.append(wrap, msg);
    return { el: wrap, input };
  }

  // ================================================================== interpolation
  function equiNodes(a, b, n) { const xs = []; for (let j = 0; j < n; j++) xs.push(n === 1 ? (a + b) / 2 : a + (b - a) * j / (n - 1)); return xs; }
  /** Chebyshev points (roots of T_n) mapped to [a, b], ascending. */
  function chebNodes(a, b, n) { const xs = []; for (let j = n - 1; j >= 0; j--) xs.push((a + b) / 2 + (b - a) / 2 * Math.cos((2 * j + 1) * Math.PI / (2 * n))); return xs; }
  /** Barycentric weights (scaled to avoid overflow). */
  function baryWeights(xs) {
    const n = xs.length, lo = Math.min(...xs), hi = Math.max(...xs), c = 4 / ((hi - lo) || 1);
    const w = new Float64Array(n);
    for (let j = 0; j < n; j++) { let p = 1; for (let k = 0; k < n; k++) if (k !== j) p *= c * (xs[j] - xs[k]); w[j] = 1 / p; }
    return w;
  }
  function baryEval(xs, ys, w, x) {
    let num = 0, den = 0;
    for (let j = 0; j < xs.length; j++) {
      const d = x - xs[j];
      if (d === 0) return ys[j];
      const t = w[j] / d;
      num += t * ys[j]; den += t;
    }
    return num / den;
  }
  /** Second derivatives of the natural cubic spline through (xs, ys) (xs ascending). */
  function splineM(xs, ys) {
    const n = xs.length, M = new Float64Array(n);
    if (n < 3) return M;
    const a = [], b = [], c = [], d = [];
    for (let i = 1; i < n - 1; i++) {
      const h0 = xs[i] - xs[i - 1], h1 = xs[i + 1] - xs[i];
      a.push(h0); b.push(2 * (h0 + h1)); c.push(h1);
      d.push(6 * ((ys[i + 1] - ys[i]) / h1 - (ys[i] - ys[i - 1]) / h0));
    }
    const m = b.length;
    for (let i = 1; i < m; i++) { const w = a[i] / b[i - 1]; b[i] -= w * c[i - 1]; d[i] -= w * d[i - 1]; }
    const s = new Float64Array(m);
    s[m - 1] = d[m - 1] / b[m - 1];
    for (let i = m - 2; i >= 0; i--) s[i] = (d[i] - c[i] * s[i + 1]) / b[i];
    for (let i = 0; i < m; i++) M[i + 1] = s[i];
    return M;
  }
  function segment(xs, x) {
    let lo = 0, hi = xs.length - 1;
    if (x <= xs[0]) return 0;
    if (x >= xs[hi]) return hi - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (xs[m] <= x) lo = m; else hi = m; }
    return lo;
  }
  /** The interpolant through (xs, ys) (xs ascending and distinct) for the given method. */
  function interpolant(xs, ys, method) {
    if (xs.length === 1) return () => ys[0];
    if (method === 'linear') return (x) => { const i = segment(xs, x), t = (x - xs[i]) / (xs[i + 1] - xs[i]); return ys[i] + t * (ys[i + 1] - ys[i]); };
    if (method === 'spline') {
      const M = splineM(xs, ys);
      return (x) => {
        const i = segment(xs, x), h = xs[i + 1] - xs[i], A = (xs[i + 1] - x) / h, B = (x - xs[i]) / h;
        return A * ys[i] + B * ys[i + 1] + ((A * A * A - A) * M[i] + (B * B * B - B) * M[i + 1]) * h * h / 6;
      };
    }
    const w = baryWeights(xs);
    return (x) => baryEval(xs, ys, w, x);
  }
  /** Newton's divided-difference form of the interpolating polynomial (TeX). */
  function newtonTeX(xs, ys) {
    const n = xs.length, c = ys.slice();
    for (let j = 1; j < n; j++) for (let i = n - 1; i >= j; i--) c[i] = (c[i] - c[i - 1]) / (xs[i] - xs[i - j]);
    let s = 'p(x) = ' + texNum(c[0], 4), prod = '';
    for (let j = 1; j < n; j++) {
      prod += '(' + texShift('x', xs[j - 1]) + ')';
      if (Math.abs(c[j]) < 1e-12) continue;
      s += (c[j] < 0 ? ' - ' : ' + ') + texNum(Math.abs(c[j]), 4) + prod;
    }
    return s;
  }
  const IMETHODS = { lagrange: 'Polynomial', spline: 'Natural cubic spline', linear: 'Piecewise linear' };
  const NMAX = 40;

  MA.widget('interpolation', (stage, cfg) => {
    css();
    const usePts = C.has(cfg.points);
    if (!usePts && !C.has(cfg.f)) throw new Error(MA.t('Give f (the function to interpolate) or points.'));
    const ef = usePts ? null : C.expr(cfg.f, ['x']);
    const f = ef ? fn1(ef, 'x') : null;
    let n = clamp(C.int(cfg.n, 7), 2, NMAX);
    let nodes = C.str(cfg.nodes, 'equispaced');
    if (!['equispaced', 'chebyshev'].includes(nodes)) throw new Error(MA.t('nodes must be equispaced or chebyshev'));
    let method = C.str(cfg.method, 'lagrange');
    if (!IMETHODS[method]) throw new Error(MA.t('method must be lagrange, spline or linear'));
    const pts0 = usePts ? C.points(cfg.points).map((p) => [p[0], p[1]]) : null;
    if (usePts && pts0.length < 2) throw new Error(MA.t('Give at least two points.'));
    if (usePts && pts0.some((p) => p.length < 2 || !fin(p[0]) || !fin(p[1]))) throw new Error(MA.t('points must look like "x,y; x,y"'));
    let pts = usePts ? pts0.map((p) => p.slice()) : null;
    let xr, yr, a, b;
    if (usePts) {
      const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
      xr = C.range(cfg.x, null) || pad([Math.min(...xs), Math.max(...xs)], 0.15);
      yr = C.range(cfg.y, null) || pad([Math.min(...ys), Math.max(...ys)], 0.45);
      [a, b] = xr;
    } else {
      [a, b] = C.range(cfg.x, [-1, 1]);
      const w = b - a;
      xr = [a - 0.03 * w, b + 0.03 * w];
      const r = MA.autoRange(f, a, b);
      const h = r[1] - r[0];
      yr = C.range(cfg.y, null) || [r[0] - 0.15 * h, r[1] + 0.15 * h];
    }
    let basis = false;
    const sampleX = []; for (let i = 0; i <= 800; i++) sampleX.push(a + (b - a) * i / 800);
    const sampleF = f ? sampleX.map(f) : null;

    function data() {
      if (usePts) {
        const s = pts.slice().sort((p, q) => p[0] - q[0]);
        return { xs: s.map((p) => p[0]), ys: s.map((p) => p[1]) };
      }
      const xs = nodes === 'chebyshev' ? chebNodes(a, b, n) : equiNodes(a, b, n);
      return { xs, ys: xs.map(f) };
    }
    const conv = {};
    function convergence(m) {
      if (conv[m]) return conv[m];
      const out = { equispaced: [], chebyshev: [] };
      for (let k = 2; k <= NMAX; k++) {
        for (const kind of ['equispaced', 'chebyshev']) {
          const xs = kind === 'chebyshev' ? chebNodes(a, b, k) : equiNodes(a, b, k);
          const p = interpolant(xs, xs.map(f), m);
          let e = 0;
          for (let i = 0; i < sampleX.length; i += 2) { const d = Math.abs(sampleF[i] - p(sampleX[i])); e = fin(d) ? Math.max(e, d) : Infinity; }
          out[kind].push([k, fin(e) ? Math.log10(Math.max(e, 1e-17)) : NaN]);
        }
      }
      return (conv[m] = out);
    }

    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    stage.append(legBox);
    const P = new MA.Plot(stage, { x: xr, y: yr, height: 340, label: MA.t('Interpolation of data points') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    let nS = null, nodeSeg = null;
    if (!usePts) {
      nS = MA.ui.slider(bar, { label: MA.t('nodes n'), min: 2, max: NMAX, step: 1, value: n, fmt: String, onInput: (v) => { n = v; draw(); } });
      nodeSeg = MA.ui.seg(bar, { options: [['equispaced', MA.t('Equispaced')], ['chebyshev', MA.t('Chebyshev')]], value: nodes, onChange: (v) => { nodes = v; draw(); } });
    }
    MA.ui.select(bar, { label: MA.t('Method'), value: method, options: Object.keys(IMETHODS).map((k) => [k, MA.t(IMETHODS[k])]), onChange: (v) => { method = v; draw(); } });
    const basisT = MA.ui.toggle(bar, { label: MA.t('Lagrange basis'), value: false, onChange: (v) => { basis = v; draw(); } });
    if (usePts) {
      MA.ui.button(bar, { label: MA.t('Remove last point'), onClick: () => { if (pts.length > 2) { pts.pop(); rebuild(); draw(); } } });
      MA.ui.button(bar, { label: MA.t('Reset'), onClick: () => { pts = pts0.map((p) => p.slice()); rebuild(); draw(); } });
    }
    const info = MA.ui.info(stage);
    let E = null, K = null, readE = null, readK = null;
    if (!usePts) {
      const pair = el('div', { class: 'w-num-pair' });
      stage.append(pair);
      const l = el('div'), r = el('div');
      pair.append(l, r);
      l.append(el('div', { class: 'w-num-cap', text: MA.t('Error f(x) − p(x)') }));
      r.append(el('div', { class: 'w-num-cap', text: MA.t('Largest error against the number of nodes') }));
      E = new MA.Plot(l, { x: xr, y: [-1, 1], width: 420, height: 250, label: MA.t('Interpolation error') });
      K = new MA.Plot(r, { x: [1, NMAX + 1], y: [-16, 2], width: 420, height: 250, grid: false, axes: false, pad: [10, 12, 24, 44], label: MA.t('Largest error against the number of nodes') });
      readE = E.readout(); readK = K.readout();
    }
    // draggable data points
    let handles = [];
    function rebuild() {
      handles.forEach((h) => h.el.remove());
      handles = pts.map((p, i) => P.handle(p[0], p[1], { label: MA.t('Data point %d', i + 1), onDrag: (x, y) => { pts[i] = [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)]; handles[i].set(pts[i][0], pts[i][1]); draw(); } }));
    }
    if (usePts) {
      rebuild();
      P.onClick((x, y) => { if (!fin(x) || pts.length >= 16) return; pts.push([x, y]); rebuild(); draw(); });
    }

    function legend() {
      const items = [];
      if (f) items.push({ label: 'f(x) = ' + texOf(ef.ast), color: 'var(--ink)' });
      items.push({ label: method === 'lagrange' ? MA.t('interpolating polynomial p') : method === 'spline' ? MA.t('natural cubic spline') : MA.t('piecewise linear interpolant'), color: 'var(--series-1)' });
      items.push({ label: usePts ? MA.t('data points (drag; click to add)') : MA.t('nodes'), color: usePts ? 'var(--accent)' : 'var(--series-1)', swatch: true });
      legBox.replaceChildren();
      MA.ui.legend(legBox, items);
    }
    function draw() {
      legend();
      basisT.el.classList.toggle('w-num-hide', method !== 'lagrange');
      const { xs, ys } = data();
      const dup = xs.some((v, i) => i && Math.abs(v - xs[i - 1]) < 1e-12 * Math.max(1, Math.abs(v)));
      P.clear();
      if (dup) {
        if (f) P.fn(f, { color: 'var(--ink)', width: 2 });
        info.set(el('span', { class: 'w-num-bad', text: MA.t('Two data points have the same x: no interpolant through both.') }));
        return;
      }
      const p = interpolant(xs, ys, method);
      if (basis && method === 'lagrange' && xs.length <= 20) {
        const w = baryWeights(xs);
        xs.forEach((xj, j) => {
          const e = xs.map((_, k) => (k === j ? 1 : 0));
          P.fn((x) => baryEval(xs, e, w, x), { color: MA.cfg.color(j), width: 1.2, opacity: 0.55, domain: [P.x0, P.x1] });
        });
      }
      if (f) {
        P.area(f, a, b, { g: (x) => clamp(p(x), P.y0 - 10 * (P.y1 - P.y0), P.y1 + 10 * (P.y1 - P.y0)), color: 'var(--series-2)', opacity: 0.13, samples: 500 });
        P.fn(f, { color: 'var(--ink)', width: 2 });
      }
      P.fn(p, { color: 'var(--series-1)', width: 2.4, samples: 900 });
      if (!usePts) xs.forEach((x, i) => P.dot(x, ys[i], { r: 4, color: 'var(--series-1)' }));
      else handles.forEach((h, i) => h.set(pts[i][0], pts[i][1]));
      // read-outs
      const parts = [];
      if (f) {
        let e = 0, at = a;
        for (let i = 0; i < sampleX.length; i++) { const d = Math.abs(sampleF[i] - p(sampleX[i])); if (!(d <= e)) { e = d; at = sampleX[i]; } }
        parts.push(MA.ui.kv(MA.t('largest error'), nf(e, 3)), MA.ui.kv(MA.t('at x ='), nf(at, 3)));
      }
      parts.push(MA.ui.kv(MA.t('nodes'), String(xs.length) + (method === 'lagrange' ? ' · ' + MA.t('degree %d', xs.length - 1) : '')));
      if (method === 'lagrange') {
        const w = baryWeights(xs);
        let lam = 0;
        for (let i = 0; i <= 400; i++) {
          const x = xs[0] + (xs[xs.length - 1] - xs[0]) * i / 400;
          let num = 0, den = 0, hit = false;
          for (let j = 0; j < xs.length; j++) { const d = x - xs[j]; if (d === 0) { hit = true; break; } num += Math.abs(w[j] / d); den += w[j] / d; }
          lam = Math.max(lam, hit ? 1 : num / Math.abs(den));
        }
        parts.push(MA.ui.kv(MA.t('Lebesgue constant'), nf(lam, 3)));
        if (usePts && xs.length <= 6) parts.push({ tex: newtonTeX(xs, ys) });
      }
      info.set(...parts);
      if (!E) return;
      // error curve
      const err = (x) => f(x) - p(x);
      const es = sampleX.map(err).filter(fin);
      const m = Math.max(1e-16, ...es.map(Math.abs));
      E.setView(xr, [-1.15 * m, 1.15 * m]);
      E.clear();
      E.area(err, a, b, { color: 'var(--series-2)', opacity: 0.15, samples: 500 });
      E.fn(err, { color: 'var(--series-2)', width: 1.8, samples: 800 });
      xs.forEach((x) => E.dot(x, 0, { r: 3, color: 'var(--series-1)' }));
      // largest error against n for both node families
      const cv = convergence(method);
      const vals = cv.equispaced.concat(cv.chebyshev).map((q) => q[1]).filter(fin);
      const lo = Math.max(-17, Math.floor(Math.min(...vals) - 0.3)), hi = Math.min(17, Math.ceil(Math.max(...vals) + 0.3));
      K.setView([1, NMAX + 1], [lo, Math.max(hi, lo + 2)]);
      logFrame(K, { ylog: true, xLabel: 'n' });
      K.clear();
      const fam = [['equispaced', 'var(--series-4)', MA.t('equispaced')], ['chebyshev', 'var(--series-3)', MA.t('Chebyshev')]];
      const labs = [];
      fam.forEach(([kind, col, lbl]) => {
        const q = cv[kind].map(([k, v]) => [k, clamp(v, K.y0 - 1, K.y1 + 1)]);
        K.path(q, { color: col, width: kind === nodes ? 2.2 : 1.5, opacity: kind === nodes ? 1 : 0.7 });
        const cur = q[n - 2];
        if (kind === nodes && fin(cur[1])) K.dot(cur[0], cur[1], { r: 4.5, color: col });
        const at = q[Math.min(q.length - 1, 26)];
        if (fin(at[1])) labs.push({ x: at[0], py: K.Y(clamp(at[1], K.y0, K.y1)) - 9, lbl, col });
      });
      if (labs.length === 2 && Math.abs(labs[0].py - labs[1].py) < 14) { const lo = labs[0].py < labs[1].py ? 0 : 1; labs[lo].py -= 7; labs[1 - lo].py += 7 + 14; }
      labs.forEach((q) => K.layers.labels.append(el('text', { class: 'lbl', x: K.X(q.x), y: clamp(q.py, K.pt + 10, K.H - K.pb - 4), 'text-anchor': 'middle', style: 'fill:' + q.col, text: q.lbl })));
      K.vline(n, { color: 'var(--accent)', width: 1.2, dash: '3 3' });
    }
    P.onHover((x) => {
      if (x === null) { read(null); return; }
      const { xs, ys } = data();
      const p = interpolant(xs, ys, method);
      read('x = ' + nf(x, 3) + (f ? '   f = ' + nf(f(x), 4) : '') + '   p = ' + nf(p(x), 4));
    });
    if (E) {
      E.onHover((x) => { if (x === null) { readE(null); return; } const { xs, ys } = data(); readE('x = ' + nf(x, 3) + '   f − p = ' + nf(f(x) - interpolant(xs, ys, method)(x), 3)); });
      K.onHover((x) => {
        if (x === null) { readK(null); return; }
        const k = clamp(Math.round(x), 2, NMAX), cv = convergence(method);
        readK('n = ' + k + '   ' + MA.t('equispaced') + ' ' + nf(Math.pow(10, cv.equispaced[k - 2][1]), 2) + '   ' + MA.t('Chebyshev') + ' ' + nf(Math.pow(10, cv.chebyshev[k - 2][1]), 2));
      });
      K.onClick((x) => { if (!fin(x)) return; n = clamp(Math.round(x), 2, NMAX); nS.set(n); draw(); });
    }
    void nodeSeg;
    draw();
  });

  // ================================================================== quadrature
  const GL = {
    2: [[-0.5773502691896257, 1], [0.5773502691896257, 1]],
    3: [[-0.7745966692414834, 5 / 9], [0, 8 / 9], [0.7745966692414834, 5 / 9]],
    4: [[-0.8611363115940526, 0.3478548451374538], [-0.3399810435848563, 0.6521451548625461], [0.3399810435848563, 0.6521451548625461], [0.8611363115940526, 0.3478548451374538]],
  };
  const RULES = {
    left: { name: 'Left endpoint', short: 'Left', p: 1 }, right: { name: 'Right endpoint', short: 'Right', p: 1 },
    mid: { name: 'Midpoint', short: 'Midpoint', p: 2 }, trap: { name: 'Trapezoid', short: 'Trapezoid', p: 2 }, simpson: { name: 'Simpson', short: 'Simpson', p: 4, even: true },
    gauss: { name: 'Gauss–Legendre (2 points)', short: 'Gauss, 2 pts', p: 4, g: 2 }, gauss3: { name: 'Gauss–Legendre (3 points)', short: 'Gauss, 3 pts', p: 6, g: 3 },
    gauss4: { name: 'Gauss–Legendre (4 points)', short: 'Gauss, 4 pts', p: 8, g: 4 },
  };
  const RALIAS = { midpoint: 'mid', trapezoid: 'trap', trapezoidal: 'trap', simpsons: 'simpson', gauss2: 'gauss', 'gauss-legendre': 'gauss', gl: 'gauss', gl2: 'gauss', gl3: 'gauss3', gl4: 'gauss4' };
  /** Composite rule with n subintervals (n even for Simpson; Gauss rules use their points in each subinterval). */
  function rule(key, f, a, b, n) {
    const h = (b - a) / n;
    let s = 0;
    switch (key) {
      case 'left': for (let i = 0; i < n; i++) s += f(a + i * h); return s * h;
      case 'right': for (let i = 1; i <= n; i++) s += f(a + i * h); return s * h;
      case 'mid': for (let i = 0; i < n; i++) s += f(a + (i + 0.5) * h); return s * h;
      case 'trap': s = (f(a) + f(b)) / 2; for (let i = 1; i < n; i++) s += f(a + i * h); return s * h;
      case 'simpson': s = f(a) + f(b); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * f(a + i * h); return s * h / 3;
      default: {
        const g = GL[RULES[key].g];
        for (let i = 0; i < n; i++) { const c = a + (i + 0.5) * h; for (const [t, w] of g) s += w * f(c + t * h / 2); }
        return s * h / 2;
      }
    }
  }
  // Gauss–Kronrod 7–15 nodes and weights (QUADPACK)
  const XGK = [0.991455371120812639, 0.949107912342758525, 0.864864423359769073, 0.741531185599394440, 0.586087235467691130, 0.405845151377397167, 0.207784955007898468, 0];
  const WGK = [0.022935322010529225, 0.063092092629978553, 0.104790010322250184, 0.140653259715525919, 0.169004726639267903, 0.190350578064785410, 0.204432940075298892, 0.209482141084727828];
  const WG = [0.129484966168869693, 0.279705391489276668, 0.381830050505118945, 0.417959183673469388];
  function gk15(f, a, b) {
    const c = (a + b) / 2, h = (b - a) / 2, fc = f(c);
    let k = fc * WGK[7], g = fc * WG[3], abs = Math.abs(fc) * WGK[7];
    for (let j = 0; j < 7; j++) {
      const x = h * XGK[j], f1 = f(c - x), f2 = f(c + x);
      k += WGK[j] * (f1 + f2);
      abs += WGK[j] * (Math.abs(f1) + Math.abs(f2));
      if (j % 2 === 1) g += WG[(j - 1) / 2] * (f1 + f2);
    }
    return { v: k * h, e: Math.abs((k - g) * h), abs: abs * Math.abs(h) };
  }
  /** Reference value of ∫_a^b f by globally adaptive Gauss–Kronrod (also ∫|f| for the rounding level). */
  function reference(f, a, b) {
    const first = gk15(f, a, b);
    const list = [{ a, b, v: first.v, e: first.e, abs: first.abs }];
    let total = first.v, err = first.e;
    for (let it = 0; it < 3000 && fin(total) && err > 2e-16 * Math.abs(total); it++) {
      let im = 0;
      for (let i = 1; i < list.length; i++) if (list[i].e > list[im].e) im = i;
      const s = list[im], m = (s.a + s.b) / 2;
      if (!(m > s.a && m < s.b)) break;
      const L = gk15(f, s.a, m), R = gk15(f, m, s.b);
      list.splice(im, 1, { a: s.a, b: m, v: L.v, e: L.e, abs: L.abs }, { a: m, b: s.b, v: R.v, e: R.e, abs: R.abs });
      total = 0; err = 0;
      for (const q of list) { total += q.v; err += q.e; }
    }
    let abs = 0;
    for (const q of list) abs += q.abs;
    return { v: total, e: err, abs };
  }
  const QN = [1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096];

  MA.widget('quadrature', (stage, cfg) => {
    css();
    if (!C.has(cfg.f)) throw new Error(MA.t('The quadrature figure needs f.'));
    const ef = C.expr(cfg.f, ['x']);
    const f = fn1(ef, 'x');
    const a = C.num(cfg.a, 0), b = C.num(cfg.b, 1);
    if (!(b > a)) throw new Error(MA.t('Need a < b.'));
    const keys = C.list(C.str(cfg.methods, 'mid; trap; simpson; gauss')).map((k) => RALIAS[k.toLowerCase()] || k.toLowerCase());
    keys.forEach((k) => { if (!RULES[k]) throw new Error(MA.t('Unknown rule "%s" (use %s)', k, Object.keys(RULES).join(', '))); });
    if (!keys.length) throw new Error(MA.t('methods is empty'));
    const ref = reference(f, a, b);
    if (!fin(ref.v)) throw new Error(MA.t('f cannot be integrated on [a, b] (it is undefined or infinite somewhere).'));
    const I = ref.v;
    const noise = Math.max(1e-13 * ref.abs, 1e-300);
    const color = (i) => 'var(--series-' + ((i % 4) + 1) + ')';
    const series = keys.map((key, i) => {
      const R = RULES[key];
      const pts = QN.filter((n) => !R.even || n % 2 === 0).map((n) => { const q = rule(key, f, a, b, n); return { n, q, e: Math.abs(q - I) }; });
      // fit log e = c − p log n over the last (up to) 6 points before the error reaches rounding level
      let s = -1, e = -1;
      for (let j = 0; j < pts.length; j++) {
        const ok = fin(pts[j].e) && pts[j].e > noise * Math.sqrt(pts[j].n);
        if (ok) { if (s < 0) s = j; e = j; } else if (s >= 0) break;
      }
      let fit = null;
      if (s >= 0 && e - s >= 2) {
        const w = pts.slice(Math.max(s, e - 5), e + 1);
        const X = w.map((q) => Math.log10(q.n)), Y = w.map((q) => Math.log10(q.e));
        const mx = X.reduce((u, v) => u + v, 0) / X.length, my = Y.reduce((u, v) => u + v, 0) / Y.length;
        let sxy = 0, sxx = 0;
        X.forEach((x, j) => { sxy += (x - mx) * (Y[j] - my); sxx += (x - mx) * (x - mx); });
        const slope = sxy / sxx;
        fit = { p: -slope, c: my - slope * mx, x0: X[0], x1: X[X.length - 1] };
      }
      const exact = pts.every((q) => fin(q.e) && q.e <= noise * Math.sqrt(q.n));
      return { key, R, pts, fit, exact, color: color(i), anyBad: pts.some((q) => !fin(q.q)) };
    });

    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, series.map((s) => ({ label: MA.t(s.R.name) + (s.exact ? ' · ' + MA.t('exact') : s.fit ? ' · p ≈ ' + s.fit.p.toFixed(2) : ''), color: s.color })));
    const P = new MA.Plot(stage, { x: [-0.12, Math.log10(4096) + 0.12], y: [-16, 0], height: 340, grid: false, axes: false, pad: [26, 16, 40, 50], label: MA.t('Error against n on log–log axes') });
    const read = P.readout();
    // y-range from the data
    const ys = [];
    series.forEach((s) => s.pts.forEach((q) => { if (fin(q.e) && q.e > 0) ys.push(Math.log10(q.e)); }));
    const ylo = ys.length ? Math.max(-17, Math.floor(Math.min(...ys) - 0.2)) : -16, yhi = ys.length ? Math.ceil(Math.max(...ys) + 0.2) : 0;
    P.setView([-0.12, Math.log10(4096) + 0.12], [ylo, Math.max(yhi, ylo + 2)]);
    logFrame(P, { xlog: true, ylog: true, outside: true, xLabel: MA.t('n (number of subintervals)'), yLabel: MA.t('|error|') });
    const bar = MA.ui.bar(stage);
    let nSel = 8, show = keys[0];
    const nS = MA.ui.slider(bar, { label: 'n', tex: true, min: 1, max: 64, step: 1, value: nSel, fmt: String, onInput: (v) => { nSel = v; draw(); } });
    MA.ui.select(bar, { label: MA.t('Picture'), value: show, options: keys.map((k) => [k, MA.t(RULES[k].name)]), onChange: (v) => { show = v; draw(); } });
    const info = MA.ui.info(stage);
    const pair = el('div', { class: 'w-num-pair wide' });
    stage.append(pair);
    const l = el('div'), r = el('div', { style: 'padding:6px 12px 8px;overflow-x:auto' });
    pair.append(l, r);
    const capL = el('div', { class: 'w-num-cap' });
    l.append(capL);
    const pad_ = (b - a) * 0.06;
    const fr = MA.autoRange(f, a, b);
    const Q = new MA.Plot(l, { x: [a - pad_, b + pad_], y: [Math.min(0, fr[0]), Math.max(0, fr[1])], width: 460, height: 280, label: MA.t('The rule applied to f') });

    function nFor(key, n) { return RULES[key].even && n % 2 ? n + 1 : n; }
    function draw() {
      P.clear();
      series.forEach((s) => {
        const pts = s.pts.map((q) => (fin(q.e) && q.e > 0 ? [Math.log10(q.n), Math.log10(q.e)] : null));
        P.path(pts, { color: s.color, width: 1.8, opacity: 0.85 });
        s.pts.forEach((q) => {
          if (!(fin(q.e) && q.e > 0)) return;
          const lowAcc = q.e <= noise * Math.sqrt(q.n);
          P.dot(Math.log10(q.n), Math.log10(q.e), { r: 3, color: s.color, hollow: lowAcc });
        });
        if (s.fit) {
          const ext = 0.3;
          P.line(s.fit.x0 - ext, s.fit.c - s.fit.p * (s.fit.x0 - ext), s.fit.x1 + ext, s.fit.c - s.fit.p * (s.fit.x1 + ext), { color: s.color, width: 1.3, dash: '5 4', opacity: 0.9 });
        }
      });
      P.vline(Math.log10(nSel), { color: 'var(--accent)', width: 1.2, dash: '3 3' });
      series.forEach((s) => {
        const n = nFor(s.key, nSel), e = Math.abs(rule(s.key, f, a, b, n) - I);
        if (fin(e) && e > 0) P.dot(Math.log10(n), clamp(Math.log10(e), P.y0, P.y1), { r: 5, color: s.color });
      });
      info.set(MA.ui.kv('\\int_{' + texNum(a) + '}^{' + texNum(b) + '} ' + texOf(ef.ast) + '\\,dx \\approx', MA.fmt(I, 15), true),
        el('span', { class: 'w-num-note' }, MA.t('Dashed lines: least-squares fits'), ' ', MA.texEl('\\lvert e_n\\rvert \\approx C\\,n^{-p}'), ' ', MA.t('on the asymptotic range; hollow points are at rounding level.')));
      // the chosen rule at the chosen n
      const key = show, n = nFor(key, nSel), h = (b - a) / n;
      capL.textContent = MA.t('%s with n = %d', MA.t(RULES[key].name), n);
      Q.clear();
      const col = series.find((s) => s.key === key).color;
      if (key === 'simpson') {
        for (let i = 0; i < n; i += 2) {
          const x0 = a + i * h, x1 = x0 + h, x2 = x1 + h, y0 = f(x0), y1 = f(x1), y2 = f(x2);
          const q = (x) => y0 * (x - x1) * (x - x2) / (2 * h * h) - y1 * (x - x0) * (x - x2) / (h * h) + y2 * (x - x0) * (x - x1) / (2 * h * h);
          Q.area(q, x0, x2, { color: col, opacity: 0.2, samples: 30 });
          Q.fn(q, { domain: [x0, x2], color: col, width: 1.3, samples: 30 });
        }
      } else if (key === 'trap') {
        for (let i = 0; i < n; i++) { const x0 = a + i * h, x1 = x0 + h; Q.poly([[x0, 0], [x0, f(x0)], [x1, f(x1)], [x1, 0]], { fill: col, fillOpacity: 0.2, stroke: col, width: 1 }); }
      } else if (RULES[key].g) {
        const g = GL[RULES[key].g];
        for (let i = 0; i < n; i++) {
          let x = a + i * h;
          g.forEach(([t, w]) => { const xn = a + (i + 0.5) * h + t * h / 2, y = f(xn), wd = w * h / 2; Q.rect(x, 0, wd, y, { color: col, fillOpacity: 0.2, width: 1 }); if (n <= 24) Q.dot(xn, y, { r: 2.6, color: col }); x += wd; });
        }
      } else {
        for (let i = 0; i < n; i++) {
          const x0 = a + i * h, xs = key === 'left' ? x0 : key === 'right' ? x0 + h : x0 + h / 2, y = f(xs);
          Q.rect(x0, 0, h, y, { color: col, fillOpacity: 0.2, width: 1 });
          if (n <= 32) Q.dot(xs, y, { r: 2.6, color: col });
        }
      }
      Q.fn(f, { color: 'var(--ink)', width: 2 });
      // table at the chosen n
      const t = el('table', { class: 'w-table w-num-table' });
      t.append(el('tr', null, el('th', { class: 'l', text: MA.t('rule') }), el('th', { text: MA.t('error, n = %d', nSel) }), el('th', { text: MA.t('order (theory)') })));
      series.forEach((s) => {
        const nn = nFor(s.key, nSel), e = Math.abs(rule(s.key, f, a, b, nn) - I);
        const fitTxt = s.exact ? MA.t('exact') : s.fit ? s.fit.p.toFixed(2) : '–';
        t.append(el('tr', { class: s.key === show ? 'hot' : '' }, el('td', { class: 'l', style: 'white-space:nowrap' }, el('span', { class: 'sw', style: '--c:' + s.color }), MA.t(s.R.short)),
          el('td', { text: (fin(e) ? nf(e, 3) : '∞') + (nn !== nSel ? ' (n = ' + nn + ')' : '') }), el('td', { text: fitTxt + ' (' + s.R.p + ')' })));
      });
      r.replaceChildren(t);
      const notes = [];
      series.forEach((s) => {
        if (s.anyBad) notes.push(MA.t('%s needs f at points where it is undefined.', MA.t(s.R.name)));
        else if (s.fit && s.fit.p > s.R.p + 1.2) notes.push(MA.t('%s converges faster than its order: f is periodic or very smooth here.', MA.t(s.R.name)));
        else if (s.fit && s.fit.p < s.R.p - 0.6) notes.push(MA.t('%s converges slower than its order: f is not smooth enough.', MA.t(s.R.name)));
      });
      if (notes.length) r.append(el('div', { class: 'w-num-note', style: 'font-size:.8125rem;margin-top:6px', text: notes.join(' ') }));
    }
    P.onHover((x, y) => {
      if (x === null) { read(null); return; }
      const n = Math.pow(10, x);
      read('n ≈ ' + MA.fmt(n, 3) + '   |error| ≈ ' + nf(Math.pow(10, y), 2));
    });
    P.onClick((x) => { if (!fin(x)) return; nSel = clamp(Math.round(Math.pow(10, x)), 1, 64); nS.set(nSel); draw(); });
    draw();
  });

  // ================================================================== floatline
  MA.widget('floatline', (stage, cfg) => {
    css();
    let p = clamp(C.int(cfg.p, 3), 1, 10);
    let emin = C.int(cfg.emin, -2), emax = C.int(cfg.emax, 2);
    if (emin > emax) throw new Error(MA.t('emin must not exceed emax'));
    if (emax - emin > 24) throw new Error(MA.t('Use at most 25 exponents (emax − emin ≤ 24).'));
    let x = Math.abs(C.num(cfg.value, 1.3));
    let subOn = true, logScale = false;
    let F = [];
    function system() {
      F = [{ v: 0, M: 0, e: emin, sub: true }];
      const P2 = Math.pow(2, p - 1);
      if (subOn) for (let m = 1; m < P2; m++) F.push({ v: m / P2 * Math.pow(2, emin), M: m, e: emin, sub: true });
      for (let e = emin; e <= emax; e++) for (let m = 0; m < P2; m++) F.push({ v: (1 + m / P2) * Math.pow(2, e), M: P2 + m, e, sub: false });
    }
    const maxF = () => F[F.length - 1].v;
    const ulpAt = (q) => Math.pow(2, (q.sub ? emin : q.e) - p + 1);
    /** Round to nearest, ties to even; overflow when x ≥ max + ulp/2. */
    function round(v) {
      const max = maxF();
      if (v >= max + ulpAt(F[F.length - 1]) / 2) return { inf: true, lo: F[F.length - 1], hi: null };
      if (v >= max) return { f: F[F.length - 1], lo: F[F.length - 1], hi: null };
      let lo = 0, hi = F.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (F[m].v <= v) lo = m; else hi = m; }
      const A = F[lo], B = F[hi];
      if (v === A.v) return { f: A, lo: A, hi: B, exact: true };
      const dA = v - A.v, dB = B.v - v;
      return { f: dA < dB ? A : dB < dA ? B : (A.M % 2 === 0 ? A : B), lo: A, hi: B, tie: dA === dB };
    }
    /** Binary digits of a positive v as (1.b₁b₂…)₂ × 2^e (k fraction bits). */
    function binary(v, k) {
      if (v === 0) return { s: '0', e: 0, more: false };
      let e = Math.floor(Math.log2(v));
      let m = v / Math.pow(2, e);
      if (m >= 2) { m /= 2; e++; } else if (m < 1) { m *= 2; e--; }
      let s = '1.';
      m -= 1;
      for (let i = 0; i < k; i++) { m *= 2; if (m >= 1) { s += '1'; m -= 1; } else s += '0'; }
      return { s, e, more: m > 0 };
    }
    const bitsOf = (q) => {
      if (q.v === 0) return '0';
      const b = q.M.toString(2).padStart(p, '0');
      return q.sub ? '0.' + b.slice(1) : b[0] + (p > 1 ? '.' + b.slice(1) : '');
    };
    const pow2Label = (e) => (e >= 0 ? String(Math.pow(2, e)) : e >= -6 ? '1/' + Math.pow(2, -e) : '2' + sup(e));
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: MA.t('normal numbers'), color: 'var(--series-1)' }, { label: MA.t('subnormal numbers'), color: 'var(--series-2)' },
      { label: MA.t('x and its rounding interval'), color: 'var(--accent)' }, { label: 'fl(x)', color: 'var(--good)' }]);
    const P = new MA.Plot(stage, { x: [0, 8], y: [-0.62, 1.22], height: 200, grid: false, axes: false, pad: [8, 18, 4, 18], label: MA.t('Floating-point numbers on the number line') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const pos = (v) => (logScale ? Math.log2(v) : v);
    const val = (u) => (logScale ? Math.pow(2, u) : u);
    function view() {
      const max = maxF(), minPos = F.length > 1 ? F[1].v : 1;
      if (logScale) P.setView([Math.log2(minPos) - 0.7, Math.log2(max) + 1.2], [-0.62, 1.22]);
      else { const R = max + 2.5 * ulpAt(F[F.length - 1]); P.setView([-0.035 * R, R], [-0.62, 1.22]); }
    }
    let handle = null;
    MA.ui.slider(bar, { label: MA.t('precision p'), min: 1, max: 8, step: 1, value: p, fmt: String, onInput: (v) => { p = v; system(); view(); draw(); } });
    const eminS = MA.ui.slider(bar, { label: 'e_{\\min}', tex: true, min: Math.min(-8, emin), max: Math.max(0, emax), step: 1, value: emin, fmt: (v) => MA.fmt(v), onInput: (v) => { emin = v; if (emin > emax) { emax = emin; emaxS.set(emax); } system(); view(); draw(); } });
    const emaxS = MA.ui.slider(bar, { label: 'e_{\\max}', tex: true, min: Math.min(0, emin), max: Math.max(8, emax), step: 1, value: emax, fmt: (v) => MA.fmt(v), onInput: (v) => { emax = v; if (emax < emin) { emin = emax; eminS.set(emin); } system(); view(); draw(); } });
    MA.ui.toggle(bar, { label: MA.t('Subnormals'), value: true, onChange: (v) => { subOn = v; system(); view(); draw(); } });
    MA.ui.toggle(bar, { label: MA.t('Log scale'), value: false, onChange: (v) => { logScale = v; view(); draw(); } });
    textInput(bar, { label: 'x =', value: MA.fmt(x, 6).replace('−', '-'), width: 120, onChange: (s) => {
      let v;
      try { v = MA.expr.value(String(s)); } catch (e) { return e.message; }
      if (!fin(v)) return MA.t('not a number');
      x = Math.abs(v); draw(); return null;
    } });
    const info = MA.ui.info(stage);
    const sysInfo = MA.ui.info(stage);

    function draw() {
      P.clear();
      const max = maxF(), P2 = Math.pow(2, p - 1);
      const X0 = P.x0, X1 = P.x1;
      // binades [2^e, 2^(e+1)) in alternating shades; the subnormal range
      for (let e = emin; e <= emax; e++) {
        if ((e - emin) % 2) continue;
        const lo = pos(Math.pow(2, e)), hi = pos(Math.min(Math.pow(2, e + 1), max));
        P.rect(lo, -0.02, hi - lo, 1.0, { fill: 'var(--series-1)', fillOpacity: 0.06, stroke: 'none' });
      }
      if (subOn && p > 1) {
        const lo = logScale ? X0 : 0;
        P.rect(lo, -0.02, pos(Math.pow(2, emin)) - lo, 1.0, { fill: 'var(--series-2)', fillOpacity: 0.07, stroke: 'none' });
      }
      const thr = max + ulpAt(F[F.length - 1]) / 2;
      P.rect(pos(thr), -0.3, X1 - pos(thr) + 10, 1.4, { fill: 'var(--bad)', fillOpacity: 0.07, stroke: 'none' });
      P.text(X1, 1.0, MA.t('overflow'), { anchor: 'end', dx: -4, dy: -4, color: 'var(--bad)', size: 11 });
      P.line(logScale ? X0 : 0, 0, X1, 0, { color: 'var(--ink-3)', width: 1.2 });
      // every number of the system
      F.forEach((q) => {
        if (logScale && q.v === 0) return;
        const top = q.v === 0 ? 0.7 : !q.sub && q.M === P2 ? 0.62 : 0.36;
        P.line(pos(q.v), 0, pos(q.v), top, { color: q.v === 0 ? 'var(--ink)' : q.sub ? 'var(--series-2)' : 'var(--series-1)', width: 1.6 });
      });
      // labels at the powers of two (thinned when crowded)
      let last = -1e9;
      const labs = [];
      if (!logScale) labs.push([0, '0']);
      for (let e = emin; e <= emax; e++) labs.push([Math.pow(2, e), pow2Label(e)]);
      labs.forEach(([v, s]) => {
        const px = P.X(pos(v));
        if (px - last < 26) return;
        last = px;
        P.text(pos(v), 0, s, { anchor: 'middle', dy: 16, color: 'var(--ink-2)', size: 11 });
      });
      P.text(pos(max), 0, MA.fmt(max, 6), { anchor: 'middle', dy: 31, color: 'var(--series-1)', size: 11 });
      // the value x, its neighbours and fl(x)
      const rx = round(x);
      if (rx.hi && !rx.inf) {
        const a = rx.f === rx.lo ? (rx.lo.v + (F[F.indexOf(rx.lo) - 1] || rx.lo).v) / 2 : (rx.lo.v + rx.hi.v) / 2;
        const b = rx.f === rx.lo ? (rx.lo.v + rx.hi.v) / 2 : (rx.hi.v + ((F[F.indexOf(rx.hi) + 1] || { v: thr }).v)) / 2;
        if (!(logScale && a <= 0)) P.rect(pos(a), 0, pos(b) - pos(a), 0.92, { fill: 'var(--accent)', fillOpacity: 0.13, stroke: 'none' });
      }
      const xp = x > 0 || !logScale ? pos(Math.max(x, logScale ? 1e-300 : 0)) : X0;
      P.line(xp, 0, xp, 1.0, { color: 'var(--accent)', width: 1.8 });
      if (!rx.inf) {
        const fp = pos(rx.f.v);
        if (!(logScale && rx.f.v === 0)) {
          P.dot(fp, 0, { r: 5.5, hollow: true, color: 'var(--good)' });
          if (Math.abs(P.X(fp) - P.X(xp)) > 6) P.arrow(xp, 0.8, fp, 0.8, { color: 'var(--good)', width: 1.6 });
        }
      }
      if (!handle) {
        handle = P.handle(xp, 1.0, { label: MA.t('The real number x'), constrain: (u) => [clamp(u, logScale ? P.x0 : 0, P.x1), 1.0], onDrag: (u) => { x = Math.max(0, val(u)); draw(); } });
      }
      handle.set(xp, 1.0);
      // read-outs
      const bx = binary(x, 14);
      const parts = [];
      parts.push({ tex: 'x = ' + texNum(x, 6) + (x > 0 ? ' = (' + bx.s + (bx.more ? '\\ldots' : '') + ')_2 \\times 2^{' + bx.e + '}' : '') });
      if (rx.inf) parts.push(el('span', { class: 'w-num-bad', text: MA.t('fl(x) = ∞: overflow (x is beyond the largest number + half a gap).') }));
      else {
        const q = rx.f, e = q.sub ? emin : q.e;
        parts.push({ tex: '\\mathrm{fl}(x) = (' + bitsOf(q) + ')_2 \\times 2^{' + e + '} = ' + texNum(q.v, 8) });
        const ae = Math.abs(x - q.v), re = x > 0 ? ae / x : 0;
        parts.push(MA.ui.kv(MA.t('absolute error'), nf(ae, 3)), MA.ui.kv(MA.t('relative error'), nf(re, 3) + (re <= Math.pow(2, -p) * (1 + 1e-12) ? ' ≤ u' : ' > u (' + MA.t('underflow') + ')')));
        parts.push(MA.ui.kv(MA.t('gap here'), nf(ulpAt(q), 4)));
        if (rx.tie) parts.push(el('span', { class: 'w-num-note', text: MA.t('A tie: rounded to the neighbour with an even last bit.') }));
      }
      info.set(...parts);
      const cnt = F.length;
      sysInfo.set(MA.ui.kv(MA.t('numbers ≥ 0'), String(cnt)), MA.ui.kv('\\varepsilon_{\\text{mach}} = 2^{1-p} =', nf(Math.pow(2, 1 - p), 4), true),
        MA.ui.kv('u = 2^{-p} =', nf(Math.pow(2, -p), 4), true), MA.ui.kv(MA.t('largest'), nf(max, 6)), MA.ui.kv(MA.t('smallest normal'), nf(Math.pow(2, emin), 4)),
        subOn && p > 1 ? MA.ui.kv(MA.t('smallest subnormal'), nf(Math.pow(2, emin - p + 1), 4)) : null);
    }
    P.onHover((u) => {
      if (u === null) { read(null); return; }
      const v = val(u);
      if (!(v >= 0)) { read(null); return; }
      const r = round(v);
      read('x = ' + nf(v, 5) + '   fl(x) = ' + (r.inf ? '∞' : nf(r.f.v, 6)));
    });
    P.onClick((u) => { if (!fin(u)) return; const v = val(u); if (v >= 0) { x = v; draw(); } });
    system();
    view();
    draw();
  });

  // ================================================================== iterative
  const IT = { jacobi: 'Jacobi', 'gauss-seidel': 'Gauss–Seidel', sor: 'SOR' };
  const ITALIAS = { gs: 'gauss-seidel', gaussseidel: 'gauss-seidel', 'gauss seidel': 'gauss-seidel', 'gauss_seidel': 'gauss-seidel', jac: 'jacobi' };
  /** Spectral radius of a 2×2 matrix [[p, q], [r, s]]. */
  function rho2(p, q, r, s) {
    const tr = p + s, det = p * s - q * r, disc = tr * tr - 4 * det;
    if (disc >= 0) { const d = Math.sqrt(disc); return Math.max(Math.abs((tr + d) / 2), Math.abs((tr - d) / 2)); }
    return Math.sqrt(Math.abs(det));
  }
  MA.widget('iterative', (stage, cfg) => {
    css();
    const parseA = (s) => {
      const rows = C.list(s).map((row) => row.split(',').map((v) => C.num(v)));
      if (rows.length !== 2 || rows.some((row) => row.length !== 2)) throw new Error(MA.t('matrix must be 2×2, like "4,1; 2,3"'));
      return rows;
    };
    const parsePair = (s, what) => {
      const q = C.points(s);
      if (q.length !== 1 || q[0].length !== 2) throw new Error(MA.t('%s must be one pair "u,v"', what));
      return q[0];
    };
    let A = parseA(C.str(cfg.matrix, '4,1; 2,3'));
    let bv = parsePair(C.str(cfg.b, '1,2'), 'b');
    let start = parsePair(C.str(cfg.start, '0,0'), 'start');
    let method = C.str(cfg.method, 'jacobi').toLowerCase();
    method = ITALIAS[method] || method;
    if (!IT[method]) throw new Error(MA.t('method must be jacobi, gauss-seidel or sor'));
    let omega = C.num(cfg.omega, 1.2);
    if (!(omega > 0 && omega < 2)) throw new Error(MA.t('omega must lie between 0 and 2'));
    let K = 8;
    const KMAX = 60;

    let sol = null, problem = null;
    function setup() {
      const [[a, b], [c, d]] = A;
      const det = a * d - b * c;
      problem = null;
      if (a === 0 || d === 0) problem = MA.t('The diagonal entries a₁₁ and a₂₂ must be nonzero.');
      else if (Math.abs(det) < 1e-14 * (Math.abs(a * d) + Math.abs(b * c))) problem = MA.t('The matrix is singular: the two lines are parallel.');
      sol = Math.abs(det) > 0 ? [(bv[0] * d - b * bv[1]) / det, (a * bv[1] - c * bv[0]) / det] : [NaN, NaN];
    }
    /** One sweep of method m; also returns the intermediate corner for the picture. */
    function sweep(m, x, w) {
      const [[a, b], [c, d]] = A;
      const [p, q] = x;
      if (m === 'jacobi') return { x: [(bv[0] - b * q) / a, (bv[1] - c * p) / d], h: [(bv[0] - b * q) / a, q], v: [p, (bv[1] - c * p) / d] };
      const om = m === 'sor' ? w : 1;
      const p1 = (1 - om) * p + om * (bv[0] - b * q) / a;
      const q1 = (1 - om) * q + om * (bv[1] - c * p1) / d;
      return { x: [p1, q1], corner: [p1, q] };
    }
    function iterates(m, n) {
      const out = [{ x: start.slice() }];
      for (let k = 0; k < n; k++) {
        const s = sweep(m, out[k].x, omega);
        if (!fin(s.x[0]) || !fin(s.x[1]) || Math.abs(s.x[0]) + Math.abs(s.x[1]) > 1e150) break;
        out[k].step = s;
        out.push({ x: s.x });
      }
      return out;
    }
    const resid = (x) => Math.hypot(bv[0] - A[0][0] * x[0] - A[0][1] * x[1], bv[1] - A[1][0] * x[0] - A[1][1] * x[1]);
    /** Iteration matrix T (x ↦ T x + c) of a method and its spectral radius. */
    function rho(m, w) {
      const [[a, b], [c, d]] = A;
      if (m === 'jacobi') return rho2(0, -b / a, -c / d, 0);
      const om = m === 'sor' ? w : 1;
      // T = (D + ωL)⁻¹((1 − ω)D − ωU)
      const t11 = 1 - om, t12 = -om * b / a;
      const t21 = -om * c / d * t11, t22 = (1 - om) + om * om * b * c / (a * d);
      return rho2(t11, t12, t21, t22);
    }
    function bestOmega() {
      let best = 1, br = Infinity;
      for (let i = 1; i < 400; i++) { const w = i / 200, r = rho('sor', w); if (r < br) { br = r; best = w; } }
      let lo = Math.max(0.005, best - 0.005), hi = Math.min(1.995, best + 0.005);
      for (let k = 0; k < 40; k++) { const m1 = lo + (hi - lo) / 3, m2 = hi - (hi - lo) / 3; if (rho('sor', m1) < rho('sor', m2)) hi = m2; else lo = m1; }
      return (lo + hi) / 2;
    }
    setup();

    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    stage.append(legBox);
    const pairBox = el('div', { class: 'w-num-pair', style: 'border-top:0' });
    stage.append(pairBox);
    const left = el('div'), right = el('div');
    pairBox.append(left, right);
    left.append(el('div', { class: 'w-num-cap', text: MA.t('Iterates in the (x₁, x₂)-plane') }));
    right.append(el('div', { class: 'w-num-cap', text: MA.t('Relative residual ‖b − Ax⁽ᵏ⁾‖ / ‖b‖') }));
    const P = new MA.Plot(left, { x: [-1, 1], y: [-1, 1], equal: true, width: 420, height: 400, label: MA.t('Iterates of the linear solver in the plane') });
    const R = new MA.Plot(right, { x: [0, 30], y: [-16, 1], width: 420, height: 400, grid: false, axes: false, pad: [10, 12, 24, 44], label: MA.t('Residual history') });
    const read = P.readout(), readR = R.readout();
    const bar = MA.ui.bar(stage);
    MA.ui.seg(bar, { options: Object.keys(IT).map((k) => [k, IT[k]]), value: method, onChange: (v) => { method = v; wS.el.classList.toggle('w-num-hide', method !== 'sor'); draw(); } });
    const wS = MA.ui.slider(bar, { label: '\\omega', tex: true, min: 0.05, max: 1.95, step: 0.01, value: omega, fmt: (v) => v.toFixed(2), onInput: (v) => { omega = v; draw(); } });
    wS.el.classList.toggle('w-num-hide', method !== 'sor');
    MA.ui.slider(bar, { label: MA.t('steps'), min: 0, max: 30, step: 1, value: K, fmt: String, onInput: (v) => { K = v; draw(); } });
    textInput(bar, { label: 'A =', value: A.map((r) => r.join(',')).join('; '), width: 110, onChange: (s) => {
      try { A = parseA(s); } catch (e) { return e.message; }
      setup(); fit(); draw(); return null;
    } });
    textInput(bar, { label: 'b =', value: bv.join(','), width: 70, onChange: (s) => {
      try { bv = parsePair(s, 'b'); } catch (e) { return e.message; }
      setup(); fit(); draw(); return null;
    } });
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let handle = null;

    function fit() {
      if (!fin(sol[0]) || !fin(sol[1])) { P.setView([-5, 5], [-5, 5]); return; }
      const its = iterates(method, 3).map((q) => q.x);
      let r = Math.max(0.5, Math.hypot(start[0] - sol[0], start[1] - sol[1]));
      its.forEach((x) => { const d = Math.hypot(x[0] - sol[0], x[1] - sol[1]); if (d < 4 * r) r = Math.max(r, d); });
      r *= 1.25;
      P.setView([sol[0] - r, sol[0] + r], [sol[1] - r, sol[1] + r]);
    }
    const lineTeX = (row, rhs) => {
      const [u, v] = row;
      const term = (c, name, first) => {
        if (c === 0) return '';
        const s = c < 0 ? '-' : first ? '' : '+';
        const m = Math.abs(c) === 1 ? '' : texNum(Math.abs(c), 4);
        return s + m + name;
      };
      const lhs = (term(u, 'x_1', true) + term(v, 'x_2', u === 0)) || '0';
      return lhs + ' = ' + texNum(rhs, 4);
    };
    function lineThrough(row, rhs, o) {
      const [u, v] = row, big = 10 * (P.x1 - P.x0 + P.y1 - P.y0);
      if (Math.abs(v) > 1e-12 * Math.abs(u)) P.line(P.x0 - big, (rhs - u * (P.x0 - big)) / v, P.x1 + big, (rhs - u * (P.x1 + big)) / v, o);
      else if (u !== 0) P.line(rhs / u, P.y0 - big, rhs / u, P.y1 + big, o);
    }
    function draw() {
      legBox.replaceChildren();
      MA.ui.legend(legBox, [{ label: lineTeX(A[0], bv[0]), color: 'var(--series-1)' }, { label: lineTeX(A[1], bv[1]), color: 'var(--series-2)' },
        { label: MA.t('iterates x⁽ᵏ⁾'), color: 'var(--series-4)' }, { label: MA.t('solution'), color: 'var(--good)', swatch: true }]);
      P.clear(); R.clear();
      lineThrough(A[0], bv[0], { color: 'var(--series-1)', width: 2 });
      lineThrough(A[1], bv[1], { color: 'var(--series-2)', width: 2 });
      if (problem) {
        info.set(el('span', { class: 'w-num-bad', text: problem }));
        info2.set();
        logFrame(R, { ylog: true, xLabel: 'k' });
        return;
      }
      P.dot(sol[0], sol[1], { r: 6, hollow: true, color: 'var(--good)' });
      const its = iterates(method, K);
      for (let k = 0; k + 1 < its.length; k++) {
        const s = its[k].step, o = k === its.length - 2 ? 1 : 0.55;
        const x = its[k].x;
        if (method === 'jacobi') {
          P.line(x[0], x[1], s.h[0], s.h[1], { color: 'var(--series-1)', width: 1.1, dash: '3 3', opacity: o });
          P.line(x[0], x[1], s.v[0], s.v[1], { color: 'var(--series-2)', width: 1.1, dash: '3 3', opacity: o });
          P.line(x[0], x[1], s.x[0], s.x[1], { color: 'var(--series-4)', width: 2, opacity: o });
        } else {
          P.line(x[0], x[1], s.corner[0], s.corner[1], { color: 'var(--series-4)', width: 2, opacity: o });
          P.line(s.corner[0], s.corner[1], s.x[0], s.x[1], { color: 'var(--series-4)', width: 2, opacity: o });
        }
      }
      its.forEach((q, k) => { if (k) P.dot(q.x[0], q.x[1], { r: k === its.length - 1 ? 4.5 : 3, color: 'var(--series-4)' }); });
      if (!handle) handle = P.handle(start[0], start[1], { label: MA.t('Starting vector x⁽⁰⁾'), onDrag: (x, y) => { start = [x, y]; draw(); } });
      handle.set(start[0], start[1]);
      // residual history for the three methods
      const nb = Math.hypot(bv[0], bv[1]) || 1;
      const hist = {};
      Object.keys(IT).forEach((m) => { hist[m] = iterates(m, KMAX).map((q) => Math.log10(Math.max(resid(q.x) / nb, 1e-17))); });
      const all = [].concat(...Object.values(hist)).filter(fin);
      const ylo = Math.max(-17, Math.floor(Math.min(...all)) - 0.3), yhi = Math.min(16, Math.ceil(Math.max(...all)) + 0.3);
      R.setView([-0.5, 30.5], [ylo, Math.max(yhi, ylo + 2)]);
      logFrame(R, { ylog: true, xLabel: 'k' });
      Object.keys(IT).forEach((m) => {
        const pts = hist[m].slice(0, 31).map((v, k) => [k, clamp(v, R.y0 - 1, R.y1 + 1)]);
        const cur = m === method;
        R.path(pts, { color: cur ? 'var(--series-4)' : 'var(--ink-3)', width: cur ? 2.2 : 1.2, dash: cur ? false : '4 3' });
        if (cur) pts.forEach(([k, v]) => { if (k === K) R.dot(k, v, { r: 4.5, color: 'var(--series-4)' }); else pt(R, k, v, 2.6, 'var(--series-4)'); });
        const lastIn = pts.filter(([, v]) => v >= R.y0 && v <= R.y1).pop();
        if (lastIn && !cur) R.text(lastIn[0], lastIn[1], IT[m], { anchor: 'end', dx: -4, dy: -6, color: 'var(--ink-3)', size: 11 });
      });
      R.vline(K, { color: 'var(--accent)', width: 1.2, dash: '3 3' });
      const rr = rho(method, omega), h0 = hist[method][0];
      if (rr > 0 && fin(h0)) {
        R.line(0, h0, 30, h0 + 30 * Math.log10(rr), { color: 'var(--series-4)', width: 1, dash: '2 4', opacity: 0.8 });
        const kk = clamp((R.y0 + 0.6 - h0) / Math.log10(Math.min(rr, 0.999999)), 3, 26);
        if (rr < 1) R.text(kk, h0 + kk * Math.log10(rr), 'ρᵏ', { dx: 8, dy: 2, color: 'var(--series-4)', size: 12 });
      }
      // read-outs
      const r = rho(method, omega), x = its[its.length - 1].x;
      const dd = Math.abs(A[0][0]) > Math.abs(A[0][1]) && Math.abs(A[1][1]) > Math.abs(A[1][0]);
      info.set(MA.ui.kv('x^* =', '(' + nf(sol[0], 5) + ', ' + nf(sol[1], 5) + ')', true), MA.ui.kv('x^{(' + (its.length - 1) + ')} =', '(' + nf(x[0], 5) + ', ' + nf(x[1], 5) + ')', true),
        MA.ui.kv(MA.t('error'), nf(Math.hypot(x[0] - sol[0], x[1] - sol[1]), 3)), MA.ui.kv(MA.t('spectral radius ρ(T)'), nf(r, 4)));
      const msgs = [];
      msgs.push(el('span', { class: r < 1 ? 'w-num-good' : 'w-num-bad', text: r < 1 ? MA.t('ρ < 1: converges; the error shrinks by about ρ per step.') : MA.t('ρ ≥ 1: the iteration does not converge.') }));
      msgs.push(el('span', { class: 'w-num-note', text: dd ? MA.t('A is strictly diagonally dominant.') : MA.t('A is not diagonally dominant.') }));
      if (method === 'sor') { const w = bestOmega(); msgs.push(el('span', { class: 'w-num-note', text: MA.t('Best ω ≈ %s (ρ ≈ %s).', w.toFixed(3), nf(rho('sor', w), 3)) })); }
      if (method !== 'jacobi') msgs.push(el('span', { class: 'w-num-note', text: MA.t('ρ(Jacobi) = %s, ρ(Gauss–Seidel) = %s', nf(rho('jacobi'), 3), nf(rho('gauss-seidel'), 3)) }));
      info2.set(...msgs);
    }
    P.onHover((x, y) => read(x === null ? null : 'x₁ = ' + nf(x, 4) + '   x₂ = ' + nf(y, 4)));
    R.onHover((x, y) => readR(x === null ? null : 'k = ' + clamp(Math.round(x), 0, 30) + '   ' + MA.t('residual') + ' ≈ ' + nf(Math.pow(10, y), 2)));
    fit();
    draw();
  });
})();
