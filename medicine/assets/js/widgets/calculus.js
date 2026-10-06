/* Medicine Atlas (engine shared with Maths Atlas) — interactive figures: single-variable calculus.
   Reference implementations: plot, riemann, taylor (see tools/WIDGET_GUIDE.md).
   Also: parametric, limit (ε–δ), secant, sequence, newton (root finding), cobweb, unitcircle, curvature. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  /** Shared: parameter sliders from cfg.sliders; returns {specs, values, names}. */
  function sliderSetup(cfg) {
    const specs = C.sliders(cfg.sliders);
    const values = {};
    specs.forEach((s) => { values[s.name] = s.value; });
    return { specs, values, names: specs.map((s) => s.name) };
  }

  // ------------------------------------------------------------------ plot
  MA.widget('plot', (stage, cfg) => {
    const sl = sliderSetup(cfg);
    const vars = ['x'].concat(sl.names);
    const fns = C.list(cfg.f).map((src) => C.expr(src, vars));
    if (!fns.length) throw new Error('plot needs f');
    const xr = C.range(cfg.x, [-5, 5]);
    const scope = Object.assign({}, sl.values);
    const evalAt = (k) => (x) => { scope.x = x; return fns[k].f(scope); };
    const yr = C.range(cfg.y, null) || MA.autoRange(fns.map((_, k) => evalAt(k)), xr[0], xr[1]);
    const labels = C.list(cfg.labels);
    MA.ui.title(stage, cfg.title);
    if (labels.length) MA.ui.legend(stage, labels.map((l, k) => ({ label: l, color: C.color(k) })));
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: C.bool(cfg.equal), piTicks: C.bool(cfg.piticks) });
    const shade = C.range(cfg.shade, null);
    const between = C.bool(cfg.between);
    const points = C.points(cfg.points);
    const hl = C.list(cfg.hlines).map((v) => C.num(v));
    const vl = C.list(cfg.vlines).map((v) => C.num(v));
    const hasTangent = C.has(cfg.tangent);
    let tx = hasTangent ? C.num(cfg.tangent) : 0;
    let infoBox = null;
    let handle = null;
    const read = P.readout();

    function draw() {
      P.clear();
      hl.forEach((v) => P.hline(v));
      vl.forEach((v) => P.vline(v));
      if (shade) {
        if (between && fns.length > 1) P.area(evalAt(0), shade[0], shade[1], { g: evalAt(1) });
        else P.area(evalAt(0), shade[0], shade[1]);
      }
      fns.forEach((_, k) => P.fn(evalAt(k), { color: C.color(k) }));
      points.forEach((p) => P.dot(p[0], p[1], { color: 'var(--ink)' }));
      if (hasTangent) {
        const f = evalAt(0);
        const y0 = f(tx);
        const m = MA.num.deriv(f, tx);
        P.slopeLine(tx, y0, m, { color: 'var(--series-2)', width: 1.8 });
        if (handle) handle.set(tx, y0); else handle = P.handle(tx, y0, { label: MA.t('Point of tangency'), constrain: (x) => [x, f(x)], onDrag: (x) => { tx = x; draw(); } });
        infoBox.set(MA.ui.kv('x_0 =', MA.fmt(tx)), MA.ui.kv('f(x_0) =', MA.fmt(y0)), MA.ui.kv("f'(x_0) =", MA.fmt(m)));
      }
    }
    if (sl.specs.length) {
      const bar = MA.ui.bar(stage);
      MA.ui.sliders(bar, sl.specs, (v) => { Object.assign(scope, v); draw(); });
    }
    if (hasTangent) infoBox = MA.ui.info(stage);
    P.onHover((x) => {
      if (x === null) { read(null); return; }
      const ys = fns.map((_, k) => evalAt(k)(x));
      read('x = ' + MA.fmt(x, 3) + '   ' + ys.map((y, k) => (fns.length > 1 ? 'f' + (k + 1) : 'f') + '(x) = ' + MA.fmt(y, 4)).join('   '));
    });
    draw();
  });

  // ------------------------------------------------------------------ riemann
  const RMETHODS = { left: 'Left', right: 'Right', mid: 'Midpoint', trap: 'Trapezoid', simpson: 'Simpson', upper: 'Upper', lower: 'Lower' };
  MA.widget('riemann', (stage, cfg) => {
    const f0 = C.expr(cfg.f, ['x']).f;
    const f = (x) => f0({ x });
    const a = C.num(cfg.a, 0), b = C.num(cfg.b, 1);
    let n = Math.max(1, C.int(cfg.n, 6));
    let method = C.str(cfg.method, 'left');
    const pad = (b - a) * 0.12;
    const xr = C.range(cfg.x, [a - pad, b + pad]);
    const yr0 = MA.autoRange(f, xr[0], xr[1]);
    const yr = C.range(cfg.y, [Math.min(0, yr0[0]), Math.max(0, yr0[1])]);
    MA.ui.title(stage, cfg.title);
    const P = new MA.Plot(stage, { x: xr, y: yr });
    const exact = MA.num.integrate(f, a, b);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = P.readout();

    function sum() {
      const h = (b - a) / n;
      let s = 0;
      if (method === 'simpson') {
        const m = n % 2 === 0 ? n : n + 1;
        const hh = (b - a) / m;
        for (let i = 0; i <= m; i++) s += (i === 0 || i === m ? 1 : i % 2 ? 4 : 2) * f(a + i * hh);
        return s * hh / 3;
      }
      for (let i = 0; i < n; i++) {
        const x0 = a + i * h, x1 = x0 + h;
        if (method === 'left') s += f(x0);
        else if (method === 'right') s += f(x1);
        else if (method === 'mid') s += f((x0 + x1) / 2);
        else if (method === 'trap') s += (f(x0) + f(x1)) / 2;
        else s += extreme(x0, x1, method === 'upper');
      }
      return s * h;
    }
    function extreme(x0, x1, upper) {
      let best = upper ? -Infinity : Infinity;
      for (let k = 0; k <= 24; k++) { const y = f(x0 + (x1 - x0) * k / 24); best = upper ? Math.max(best, y) : Math.min(best, y); }
      return best;
    }
    function draw() {
      P.clear();
      const h = (b - a) / n;
      const pos = 'var(--series-1)', neg = 'var(--series-2)';
      if (method === 'simpson') {
        const m = n % 2 === 0 ? n : n + 1;
        const hh = (b - a) / m;
        for (let i = 0; i < m; i += 2) {
          const x0 = a + i * hh, x1 = x0 + hh, x2 = x1 + hh;
          const y0 = f(x0), y1 = f(x1), y2 = f(x2);
          // parabola through the three points (Lagrange form)
          const q = (x) => y0 * (x - x1) * (x - x2) / ((x0 - x1) * (x0 - x2)) + y1 * (x - x0) * (x - x2) / ((x1 - x0) * (x1 - x2)) + y2 * (x - x0) * (x - x1) / ((x2 - x0) * (x2 - x1));
          P.area(q, x0, x2, { color: pos, opacity: 0.18, samples: 40 });
          P.fn(q, { domain: [x0, x2], color: pos, width: 1.2, samples: 40 });
          [x0, x1, x2].forEach((x) => P.dot(x, f(x), { r: 3, color: pos }));
        }
      } else {
        for (let i = 0; i < n; i++) {
          const x0 = a + i * h, x1 = x0 + h;
          if (method === 'trap') {
            const y0 = f(x0), y1 = f(x1);
            P.poly([[x0, 0], [x0, y0], [x1, y1], [x1, 0]], { fill: (y0 + y1) >= 0 ? pos : neg, fillOpacity: 0.18, stroke: (y0 + y1) >= 0 ? pos : neg });
            continue;
          }
          const y = method === 'left' ? f(x0) : method === 'right' ? f(x1) : method === 'mid' ? f((x0 + x1) / 2) : extreme(x0, x1, method === 'upper');
          P.rect(x0, 0, h, y, { color: y >= 0 ? pos : neg, fillOpacity: 0.18 });
          const sx = method === 'left' ? x0 : method === 'right' ? x1 : method === 'mid' ? (x0 + x1) / 2 : null;
          if (sx !== null && n <= 60) P.dot(sx, y, { r: 2.8, color: y >= 0 ? pos : neg });
        }
      }
      P.fn(f, { color: 'var(--ink)', width: 2 });
      P.line(a, yr[0] - 1e3, a, yr[1] + 1e3, { color: 'var(--ink-3)', width: 1, dash: '3 3' });
      P.line(b, yr[0] - 1e3, b, yr[1] + 1e3, { color: 'var(--ink-3)', width: 1, dash: '3 3' });
      const s = sum();
      const err = s - exact;
      const nn = method === 'simpson' && n % 2 ? n + 1 : n;
      info.set(MA.ui.kv(MA.t('Sum with n = %d', nn), MA.fmt(s, 7)), MA.ui.kv(MA.t('Integral'), MA.fmt(exact, 7)), MA.ui.kv(MA.t('Error'), MA.fmt(err, 3)));
    }
    MA.ui.slider(bar, { label: 'n', min: 1, max: 100, step: 1, value: n, fmt: (v) => String(v), onInput: (v) => { n = v; draw(); } });
    MA.ui.select(bar, { label: MA.t('Method'), value: method, options: Object.keys(RMETHODS).map((k) => [k, MA.t(RMETHODS[k])]), onChange: (v) => { method = v; draw(); } });
    P.onHover((x) => read(x === null ? null : 'x = ' + MA.fmt(x, 3) + '   f(x) = ' + MA.fmt(f(x), 4)));
    draw();
  });

  // ------------------------------------------------------------------ taylor
  MA.widget('taylor', (stage, cfg) => {
    const ast = MA.expr.parse(String(cfg.f), { vars: ['x'] });
    const f0 = MA.expr.compile(ast);
    const f = (x) => f0({ x });
    const series = MA.expr.taylor(ast, 'x');
    let a = C.num(cfg.a, 0);
    let n = Math.max(0, C.int(cfg.n, 3));
    const maxN = Math.max(1, Math.min(40, C.int(cfg.max, 20)));
    const xr = C.range(cfg.x, [-6, 6]);
    const yr = C.range(cfg.y, null) || MA.autoRange(f, xr[0], xr[1]);
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: 'f(x)', color: 'var(--ink)' }, { label: 'T_n(x)', color: 'var(--series-1)' }]);
    const P = new MA.Plot(stage, { x: xr, y: yr, piTicks: C.bool(cfg.piticks) });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const read = P.readout();
    let coef = [];
    let handle = null;
    function poly(x) {
      let s = 0;
      const t = x - a;
      for (let k = n; k >= 0; k--) s = s * t + coef[k];
      return s;
    }
    function texPoly() {
      const parts = [];
      const shift = Math.abs(a) < 1e-12 ? 'x' : '(x ' + (a > 0 ? '-' : '+') + ' ' + MA.fmt(Math.abs(a), 4).replace('−', '') + ')';
      for (let k = 0; k <= n && parts.length < 7; k++) {
        const c = coef[k];
        if (Math.abs(c) < 1e-12) continue;
        const r = rational(c);
        const mag = r ? r : MA.fmt(Math.abs(c), 4).replace('−', '');
        const pw = k === 0 ? '' : k === 1 ? shift : shift + '^{' + k + '}';
        const coefTex = k > 0 && (mag === '1') ? '' : mag;
        parts.push({ s: c < 0 ? '-' : '+', t: coefTex + pw || '1' });
      }
      if (!parts.length) return 'T_{' + n + '}(x) = 0';
      let out = 'T_{' + n + '}(x) = ' + (parts[0].s === '-' ? '-' : '') + parts[0].t;
      for (let i = 1; i < parts.length; i++) out += ' ' + parts[i].s + ' ' + parts[i].t;
      if (parts.length === 7) out += ' + \\cdots';
      return out;
    }
    /** Small exact fraction for a coefficient (k!, 2^k and small denominators), else null. */
    function rational(c) {
      const v = Math.abs(c);
      const cands = [];
      for (let d = 1; d <= 64; d++) cands.push(d);
      for (let k = 2, fct = 2; k <= 12; k++, fct *= k) cands.push(fct, 1 << Math.min(k + 2, 20));
      for (const d of cands) {
        const num = Math.round(v * d);
        if (num > 0 && num < 1e6 && Math.abs(v - num / d) < 1e-10 * Math.max(1, v)) return d === 1 ? String(num) : '\\tfrac{' + num + '}{' + d + '}';
      }
      return null;
    }
    function compute() {
      try { coef = Array.from(series({}, a, Math.max(n, 1))); } catch (e) { coef = new Array(n + 1).fill(NaN); }
    }
    function draw() {
      compute();
      P.clear();
      P.area(f, xr[0], xr[1], { g: poly, color: 'var(--series-2)', opacity: 0.1 });
      P.fn(f, { color: 'var(--ink)', width: 2 });
      P.fn(poly, { color: 'var(--series-1)', width: 2.4 });
      P.vline(a, { color: 'var(--ink-3)' });
      const fa = f(a);
      if (handle) handle.set(a, fa); else handle = P.handle(a, fa, { label: MA.t('Centre of the expansion'), constrain: (x) => [x, f(x)], onDrag: (x) => { a = x; draw(); } });
      const errAt = (x) => Math.abs(f(x) - poly(x));
      const probe = a + (xr[1] - xr[0]) * 0.15;
      info.set({ tex: texPoly() }, MA.ui.kv(MA.t('Error at x = %s', MA.fmt(probe, 3)), MA.fmt(errAt(probe), 3)));
    }
    const sN = MA.ui.slider(bar, { label: MA.t('degree n'), min: 0, max: maxN, step: 1, value: n, fmt: (v) => String(v), onInput: (v) => { n = v; draw(); } });
    MA.ui.button(bar, { label: MA.t('Reset centre'), onClick: () => { a = C.num(cfg.a, 0); draw(); } });
    P.onHover((x) => read(x === null ? null : 'x = ' + MA.fmt(x, 3) + '   f = ' + MA.fmt(f(x), 5) + '   T = ' + MA.fmt(poly(x), 5)));
    draw();
    void sN;
  });

  // ================================================================== shared helpers (figures below)
  const TAU = 2 * Math.PI;
  const fin = Number.isFinite;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  /** Name with a numeric subscript: sub('x', 3) -> "x₃". */
  const sub = (s, k) => s + String(k).replace(/\d/g, (d) => SUBS[+d]);
  const SUP = { '-': '⁻', '+': '', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** MA.fmt with ×10ⁿ instead of e-notation (real minus signs throughout). */
  const nf = (v, sig = 4) => MA.fmt(v, sig).replace(/e([+-]?\d+)$/, (m, e) => '×10' + e.replace(/[-+\d]/g, (c) => SUP[c]));
  /** Slider step: a round number near (max − min)/1000 so that round values lie on the grid. */
  const stepFor = (lo, hi) => MA.niceStep((hi - lo) / 1000);

  /** One <style> element for the classes used by this file (w-calc-*). */
  function css() {
    if (document.getElementById('w-calc-css')) return;
    const s = el('style', { id: 'w-calc-css' });
    s.textContent = [
      '.w-calc-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}',
      '.w-calc-pair>*+*{border-left:1px solid var(--rule)}',
      '@media (max-width:700px){.w-calc-pair{grid-template-columns:minmax(0,1fr)}.w-calc-pair>*+*{border-left:0;border-top:1px solid var(--rule)}}',
      '.w-calc-cap{padding:8px 16px 0;font-size:.78rem;font-weight:650;color:var(--ink-3);letter-spacing:.02em}',
      '.w-calc-bif{background:var(--plot-bg);border-top:1px solid var(--rule)}',
      '.w-calc-bif>.w-plot{position:absolute;inset:0}',
      '.w-calc-bif svg{cursor:crosshair}',
      '.w-calc-table td b{color:var(--good);font-weight:700}',
      '.w-calc-table th .katex{font-size:1em}',
      '.w-calc-table th{position:sticky;top:0;background:var(--sheet);z-index:1}',
      '.w-calc-table td.l,.w-calc-table th.l{text-align:left}',
      '.w-calc-good{color:var(--good);font-weight:600}',
      '.w-calc-bad{color:var(--bad);font-weight:600}',
      '.w-calc-note{color:var(--ink-3)}',
      '.w-calc-hide{display:none!important}',
    ].join('\n');
    document.head.append(s);
  }

  // MA.expr.taylor differentiates these exactly; anything else (if, min, max, sum, gamma …) falls back to differences.
  const TAYLOR_FNS = new Set(['exp', 'ln', 'log', 'log10', 'log2', 'sin', 'cos', 'tan', 'sec', 'csc', 'cot', 'sinh', 'cosh', 'tanh',
    'sqrt', 'cbrt', 'atan', 'asin', 'acos', 'asinh', 'atanh', 'abs']);
  const STEP_FNS = new Set(['sign', 'floor', 'ceil', 'round', 'heaviside']);
  function taylorSafe(ast, v) {
    const dep = (n) => MA.expr.varsOf(n).has(v);
    const ok = (n) => {
      if (!dep(n)) return true;
      switch (n.t) {
        case 'var': case 'cmp': return true;
        case 'neg': return ok(n.a);
        case 'bin': return ok(n.a) && ok(n.b);
        case 'call':
          if (STEP_FNS.has(n.f)) return true;
          if (n.f === 'pow') return !dep(n.args[1]) && ok(n.args[0]);
          if (n.args.length > 1) return n.f === 'log' && !dep(n.args[1]) && ok(n.args[0]);
          return TAYLOR_FNS.has(n.f) && ok(n.args[0]);
        default: return false;
      }
    };
    try { return ok(ast); } catch (e) { return false; }
  }
  /** (scope, x) -> [f, f', f''] for an expression in v: exact Taylor arithmetic when possible, else finite differences. */
  function derivs(ex, v) {
    const T = taylorSafe(ex.ast, v) ? MA.expr.taylor(ex.ast, v) : null;
    const s = {};
    const at = (x) => { s[v] = x; try { return ex.f(s); } catch (e) { return NaN; } };
    return (scope, x) => {
      if (T) {
        try {
          const c = T(scope, x, 2);
          if (fin(c[0]) && fin(c[1]) && fin(c[2])) return [c[0], c[1], 2 * c[2]];
        } catch (e) { /* fall back to differences */ }
      }
      Object.assign(s, scope);
      const h = 1e-3 * Math.max(1, Math.abs(x));
      const f0 = at(x), p1 = at(x + h), m1 = at(x - h), p2 = at(x + 2 * h), m2 = at(x - 2 * h);
      return [f0, (m2 - 8 * m1 + 8 * p1 - p2) / (12 * h), (16 * (p1 + m1) - 30 * f0 - p2 - m2) / (12 * h * h)];
    };
  }
  /** x -> value of a compiled expression in variable v (other variables from scope); NaN instead of exceptions. */
  function fn1(ex, v, scope) {
    const s = scope || {};
    return (x) => { s[v] = x; try { return ex.f(s); } catch (e) { return NaN; } };
  }
  /** [lo, hi] of the finite values, ignoring a fraction q of outliers at each end. */
  function spread(vals, q = 0.01) {
    const v = vals.filter(fin).sort((p, r) => p - r);
    if (!v.length) return null;
    return [v[Math.floor((v.length - 1) * q)], v[Math.ceil((v.length - 1) * (1 - q))]];
  }
  /** Pad a range by a fraction of its width; widen degenerate ranges. */
  function pad(r, frac = 0.08) {
    let [a, b] = r;
    if (!(b - a > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)))) { const c = (a + b) / 2, w = Math.max(Math.abs(c) * 0.2, 1) / 2; a = c - w; b = c + w; }
    const p = (b - a) * frac;
    return [a - p, b + p];
  }
  /** viewBox height that gives roughly equal scales on both axes (clamped). */
  const eqHeight = (xr, yr, W = 640, lo = 280, hi = 470) => Math.round(clamp((W - 48) * (yr[1] - yr[0]) / (xr[1] - xr[0]) + 34, lo, hi));
  /** Largest number of the form 1, 2, 5 × 10^k not above v. */
  function niceBelow(v) {
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    const m = v / p;
    return (m >= 5 ? 5 : m >= 2 ? 2 : 1) * p;
  }
  /** A number for TeX (×10^k instead of e-notation). */
  function texNum(v, sig = 4) {
    const s = MA.fmt(v, sig).replace('−', '-').replace('∞', '\\infty');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(s);
    return m ? m[1] + '\\times 10^{' + (+m[2]) + '}' : s;
  }
  /** "x - a" in TeX with the sign of a folded in. */
  const texShift = (v, a) => (Math.abs(a) < 1e-15 ? v : v + (a > 0 ? ' - ' : ' + ') + texNum(Math.abs(a)));
  /** Copy of an AST with variable `from` renamed (for labels such as r(θ)). */
  function renameVar(n, from, to) {
    if (!n || typeof n !== 'object') return n;
    if (n.t === 'var' && n.name === from) return { t: 'var', name: to };
    const out = Object.assign({}, n);
    if (n.a) out.a = renameVar(n.a, from, to);
    if (n.b) out.b = renameVar(n.b, from, to);
    if (n.args) out.args = n.args.map((q) => renameVar(q, from, to));
    return out;
  }
  const texOf = (ast) => { try { return MA.expr.toTeX(ast); } catch (e) { return '?'; } };

  /** Slider on a logarithmic scale; reports values rounded to `sig` significant digits. */
  function logSlider(bar, o) {
    const v0 = Math.log10(o.value), step = (Math.log10(o.max) - Math.log10(o.min)) / 400;
    const lo = v0 - Math.ceil((v0 - Math.log10(o.min)) / step - 1e-9) * step, hi = lo + Math.ceil((Math.log10(o.max) - lo) / step - 1e-9) * step;
    const round = (v) => +Math.pow(10, v).toPrecision(o.sig || 2);
    const s = MA.ui.slider(bar, { label: o.label, tex: o.tex, min: lo, max: hi, step, value: v0,
      fmt: (v) => nf(round(v), 3), onInput: (v) => o.onInput(round(v)) });
    return { el: s.el, set: (v) => s.set(Math.log10(v)), get: () => round(s.get()) };
  }
  /** Play / Pause button driving an animation; step(dt) returns false when finished. */
  function playButton(bar, step, onStart, label) {
    const idle = label || MA.t('Play');
    let btn = null;
    const an = MA.anim((dt) => {
      let go = false;
      try { go = step(dt) !== false; } catch (e) { go = false; }
      if (!go) btn.textContent = idle;
      return go;
    });
    btn = MA.ui.button(bar, { label: idle, onClick: () => {
      if (an.running) { an.stop(); btn.textContent = idle; return; }
      if (onStart) onStart();
      btn.textContent = MA.t('Pause');
      an.play();
    } });
    return { el: btn, stop() { an.stop(); btn.textContent = idle; }, get running() { return an.running; } };
  }
  /** Arrow keys on a handle step a parameter (instead of moving the point freely). */
  function keyParam(h, onStep) {
    h.el.addEventListener('keydown', (e) => {
      const d = { ArrowLeft: -1, ArrowDown: -1, ArrowRight: 1, ArrowUp: 1 }[e.key];
      if (!d) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      try { onStep(d * (e.shiftKey ? 10 : 1)); } catch (err) { /* ignore */ }
    }, true);
  }
  /**
   * Parameter of the sampled curve point nearest to the pointer (screen distance), preferring the branch closest
   * in parameter to tPrev where the curve crosses itself; refined by golden-section search on pos(t).
   */
  function nearestParam(P, pts, ts, x, y, tPrev, pos) {
    const px = P.X(x), py = P.Y(y);
    const d = pts.map((p) => (p ? Math.hypot(P.X(p[0]) - px, P.Y(p[1]) - py) : Infinity));
    const best = Math.min(...d);
    if (!fin(best)) return tPrev;
    let i0 = 0, bt = Infinity;
    d.forEach((v, i) => { if (v <= best + 6 && Math.abs(ts[i] - tPrev) < bt) { bt = Math.abs(ts[i] - tPrev); i0 = i; } });
    let lo = ts[Math.max(0, i0 - 1)], hi = ts[Math.min(ts.length - 1, i0 + 1)];
    const dist = (t) => { const q = pos(t); return fin(q[0]) && fin(q[1]) ? Math.hypot(P.X(q[0]) - px, P.Y(q[1]) - py) : Infinity; };
    const gr = (Math.sqrt(5) - 1) / 2;
    let c = hi - gr * (hi - lo), e = lo + gr * (hi - lo), fc = dist(c), fe = dist(e);
    for (let k = 0; k < 32; k++) {
      if (fc < fe) { hi = e; e = c; fe = fc; c = hi - gr * (hi - lo); fc = dist(c); } else { lo = c; c = e; fc = fe; e = lo + gr * (hi - lo); fe = dist(e); }
    }
    return (lo + hi) / 2;
  }
  /** Concentric circles and rays in the grid layer of a plot (for polar curves). */
  function polarGrid(P) {
    const g = el('g', { class: 'grid', 'clip-path': 'url(#' + P.uid + '-clip)' });
    const R = Math.max(Math.hypot(P.x0, P.y0), Math.hypot(P.x0, P.y1), Math.hypot(P.x1, P.y0), Math.hypot(P.x1, P.y1));
    const step = MA.niceStep(R / 5);
    for (let r = step; r <= R + 1e-9; r += step) g.append(el('ellipse', { cx: P.X(0), cy: P.Y(0), rx: r * P.sx, ry: r * P.sy, style: 'fill:none;stroke:var(--grid);stroke-width:1' }));
    for (let k = 0; k < 12; k++) {
      const a = k * Math.PI / 6;
      g.append(el('line', { x1: P.X(0), y1: P.Y(0), x2: P.X(2 * R * Math.cos(a)), y2: P.Y(2 * R * Math.sin(a)) }));
    }
    P.layers.grid.append(g);
  }

  /**
   * Points of y = f(x) across the view (P.sample) with genuine jumps broken: where neighbouring samples differ a lot,
   * bisection decides between a jump (break the line) and a steep but continuous stretch (keep it).
   */
  function graphPts(P, f, o = {}) {
    const pts = P.sample(f, o), span = P.y1 - P.y0, out = [];
    for (const p of pts) {
      const q = out.length ? out[out.length - 1] : null;
      if (p && q && Math.abs(p[1] - q[1]) > 0.03 * span) {
        let lo = q[0], hi = p[0], ylo = f(lo), yhi = f(hi);
        for (let k = 0; k < 50 && hi - lo > 1e-13 * Math.max(1, Math.abs(lo)); k++) {
          const m = (lo + hi) / 2, ym = f(m);
          if (!fin(ym)) { ylo = NaN; break; }
          if (Math.abs(ym - ylo) > Math.abs(yhi - ym)) { hi = m; yhi = ym; } else { lo = m; ylo = ym; }
        }
        if (!(Math.abs(yhi - ylo) <= 0.01 * span)) out.push(null);
      }
      out.push(p);
    }
    return out;
  }
  /** Graph of f with jumps shown as jumps. */
  const graph = (P, f, o) => P.path(graphPts(P, f, o), o);

  // ------------------------------------------------------------------ parametric
  MA.widget('parametric', (stage, cfg) => {
    css();
    const sl = sliderSetup(cfg);
    const vars = ['t'].concat(sl.names);
    const polar = C.has(cfg.r);
    if (!polar && !(C.has(cfg.fx) && C.has(cfg.fy))) throw new Error(MA.t('Give fx and fy, or r for a polar curve.'));
    const er = polar ? C.expr(cfg.r, vars) : null;
    const ex = polar ? null : C.expr(cfg.fx, vars);
    const ey = polar ? null : C.expr(cfg.fy, vars);
    const [t0, t1] = C.range(cfg.t, [0, TAU]);
    const trace = C.bool(cfg.trace, true);
    const equal = C.bool(cfg.equal, true);
    const scope = Object.assign({}, sl.values);
    const dR = polar ? derivs(er, 't') : null, dX = polar ? null : derivs(ex, 't'), dY = polar ? null : derivs(ey, 't');
    const ev = (e, t) => { scope.t = t; try { return e.f(scope); } catch (err) { return NaN; } };
    const pos = (t) => { if (polar) { const r = ev(er, t); return [r * Math.cos(t), r * Math.sin(t)]; } return [ev(ex, t), ev(ey, t)]; };
    /** position and velocity (exact derivatives where possible) */
    const kin = (t) => {
      if (polar) {
        const [r, r1] = dR(scope, t), c = Math.cos(t), s = Math.sin(t);
        return { x: r * c, y: r * s, vx: r1 * c - r * s, vy: r1 * s + r * c, r };
      }
      const a = dX(scope, t), b = dY(scope, t);
      return { x: a[0], y: b[0], vx: a[1], vy: b[1] };
    };
    const NS = 1000, dt = (t1 - t0) / NS;
    let ts = [], pts = [], len = [], area = [], vmax = 0;
    function sample() {
      ts = []; pts = []; len = [0]; area = [0];
      const sps = [];
      let ps = NaN, pr2 = NaN;
      for (let i = 0; i <= NS; i++) {
        const t = t0 + i * dt, q = kin(t);
        const sp = Math.hypot(q.vx, q.vy), r2 = polar ? q.r * q.r : 0;
        ts.push(t);
        pts.push(fin(q.x) && fin(q.y) ? [q.x, q.y] : null);
        sps.push(sp);
        if (i) { len.push(len[i - 1] + (sp + ps) / 2 * dt); area.push(area[i - 1] + (r2 + pr2) / 4 * dt); }
        ps = sp; pr2 = r2;
      }
      vmax = (spread(sps, 0.1) || [0, 0])[1];   // a robust maximum (ignores spikes near singular points)
    }
    /** Fitted range: all values, unless a few outliers (asymptotes) would squash the picture. */
    const fitRange = (v) => {
      const full = spread(v, 0), trim = spread(v, 0.02);
      if (!full) return [-1, 1];
      return full[1] - full[0] <= 1.6 * (trim[1] - trim[0]) ? full : trim;
    };
    const cum = (arr, t) => { const u = clamp((t - t0) / dt, 0, NS), i = Math.min(NS - 1, Math.floor(u)); return arr[i] + (arr[i + 1] - arr[i]) * (u - i); };
    sample();
    let xr = C.range(cfg.x, null), yr = C.range(cfg.y, null);
    if (!xr || !yr) {
      const xs = [], ys = [];
      pts.forEach((p) => { if (p) { xs.push(p[0]); ys.push(p[1]); } });
      if (polar) { xs.push(0); ys.push(0); }
      xr = xr || pad(fitRange(xs), 0.1);
      yr = yr || pad(fitRange(ys), 0.1);
    }
    const span0 = Math.min(xr[1] - xr[0], yr[1] - yr[0]);
    const kv = vmax > 0 && 0.4 * span0 / vmax < 1 ? niceBelow(0.4 * span0 / vmax) : 1;
    MA.ui.title(stage, cfg.title);
    const curveTeX = polar ? 'r = ' + texOf(renameVar(er.ast, 't', 'theta'))
      : '(x, y) = \\left(' + texOf(ex.ast) + ',\\ ' + texOf(ey.ast) + '\\right)';
    const leg = [{ label: curveTeX, color: 'var(--series-1)' }];
    if (trace) leg.push({ label: kv === 1 ? MA.t('velocity') : MA.t('velocity (×%s)', nf(kv)), color: 'var(--series-2)' });
    MA.ui.legend(stage, leg);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal, height: equal ? eqHeight(xr, yr) : 400, grid: !polar,
      label: polar ? MA.t('Polar curve') : MA.t('Parametric curve') });
    if (polar) polarGrid(P);
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    let t = t0 + (t1 - t0) / 6;
    let tS = null, handle = null, info = null;
    if (trace) {
      tS = MA.ui.slider(bar, { label: polar ? '\\theta' : 't', tex: true, min: t0, max: t1, step: stepFor(t0, t1), value: t, fmt: (v) => nf(v, 3), onInput: (v) => { t = v; draw(); } });
      playButton(bar, (d) => { t = Math.min(t1, t + d * (t1 - t0) / 7); tS.set(t); draw(); return t < t1; }, () => { if (t >= t1 - 1e-9) t = t0; });
    }
    sl.specs.forEach((s) => MA.ui.slider(bar, { label: s.name, min: s.min, max: s.max, step: s.step, value: s.value, onInput: (v) => { scope[s.name] = v; sample(); draw(); } }));
    if (!bar.children.length) bar.remove();
    if (trace) info = MA.ui.info(stage);

    function draw() {
      P.clear();
      P.path(pts, { color: 'var(--series-1)', width: trace ? 1.6 : 2.4, opacity: trace ? 0.35 : 1 });
      if (!trace) return;
      const q = kin(t);
      const ok = fin(q.x) && fin(q.y);
      const done = pts.slice(0, Math.floor((t - t0) / dt + 1e-9) + 1);
      done.push(ok ? [q.x, q.y] : null);
      if (polar) {
        P.poly([[0, 0]].concat(done.filter(Boolean)), { fill: 'var(--series-1)', fillOpacity: 0.12 });
        if (ok) P.line(0, 0, q.x, q.y, { color: 'var(--ink-3)', width: 1.3 });
        const rho = 0.07 * Math.min(P.x1 - P.x0, P.y1 - P.y0);
        const th = ((t % TAU) + TAU) % TAU;
        const arc = [];
        for (let i = 0; i <= 48; i++) { const u = th * i / 48; arc.push([rho * Math.cos(u), rho * Math.sin(u)]); }
        P.path(arc, { color: 'var(--ink-2)', width: 1.3 });
        P.text(1.6 * rho * Math.cos(th / 2), 1.6 * rho * Math.sin(th / 2), 'θ', { anchor: 'middle', dy: 4, color: 'var(--ink-2)' });
      }
      P.path(done, { color: 'var(--series-1)', width: 2.8 });
      const sp = Math.hypot(q.vx, q.vy);
      if (ok && fin(sp) && sp > 0) P.arrow(q.x, q.y, q.x + kv * q.vx, q.y + kv * q.vy, { color: 'var(--series-2)', width: 2.4 });
      if (!handle) {
        handle = P.handle(q.x, q.y, { label: MA.t('Moving point'), onDrag: (x, y) => { t = nearestParam(P, pts, ts, x, y, t, pos); tS.set(t); draw(); } });
        keyParam(handle, (d) => { t = clamp(t + d * (t1 - t0) / 200, t0, t1); tS.set(t); draw(); });
      }
      handle.el.style.display = ok ? '' : 'none';
      if (ok) handle.set(q.x, q.y);
      const parts = [MA.ui.kv(polar ? '\\theta =' : 't =', nf(t, 4), true)];
      if (polar) parts.push(MA.ui.kv('r =', nf(Math.abs(q.r) < 1e-12 * (P.x1 - P.x0) ? 0 : q.r, 4), true));
      const tidy = (v) => (Math.abs(v) < 1e-12 * Math.max(1, Math.abs(q.x), Math.abs(q.y), P.x1 - P.x0) ? 0 : v);
      parts.push(MA.ui.kv('(x, y) =', ok ? '(' + nf(tidy(q.x), 4) + ', ' + nf(tidy(q.y), 4) + ')' : '–', true));
      parts.push(MA.ui.kv(MA.t('speed'), nf(sp, 4)));
      parts.push(MA.ui.kv(MA.t('slope dy/dx'), Math.abs(q.vx) <= 1e-12 * Math.max(1, sp) ? '∞' : Math.abs(q.vy) <= 1e-12 * Math.max(1, sp) ? '0' : nf(q.vy / q.vx, 4)));
      parts.push(MA.ui.kv(MA.t('arc length since start'), nf(cum(len, t), 4)));
      if (polar) parts.push(MA.ui.kv(MA.t('area swept'), nf(cum(area, t), 4)));
      info.set(...parts);
    }
    P.onHover((x, y) => read(x === null ? null : 'x = ' + nf(x, 3) + '   y = ' + nf(y, 3)));
    draw();
  });

  // ------------------------------------------------------------------ limit (ε–δ)
  /** One-sided limit of f at a (side s = ±1) from values at a + s·h, h → 0; NaN when the values do not settle. */
  function oneSided(f, a, s, W) {
    const vals = [];
    for (let k = 1; k <= 12; k++) vals.push(f(a + s * W * Math.pow(10, -k)));
    if (vals.filter(fin).length < 4) return NaN;
    const tail = vals.slice(-4);
    if (tail.every((v) => fin(v) && Math.abs(v) > 1e7) && Math.abs(tail[3]) > Math.abs(tail[0])) return Math.sign(tail[3]) * Infinity;
    /** the most stable value of a sequence (smallest change between neighbours) and that change */
    const stable = (q) => {
      let best = NaN, bd = Infinity;
      for (let i = 1; i < q.length; i++) {
        if (!fin(q[i]) || !fin(q[i - 1])) continue;
        const d = Math.abs(q[i] - q[i - 1]);
        if (d < bd) { bd = d; best = q[i]; }
      }
      return [best, bd];
    };
    // Aitken Δ² extrapolation through consecutive triples (exact for errors ∝ h^α), else the raw values
    const ait = [];
    for (let k = 0; k + 2 < vals.length; k++) {
      const d1 = vals[k + 1] - vals[k], d2 = vals[k + 2] - vals[k + 1], den = d2 - d1;
      ait.push(den !== 0 && fin(den) ? vals[k + 2] - d2 * d2 / den : vals[k + 2]);
    }
    const last = vals[vals.length - 1];
    for (const [best, bd] of [stable(ait), stable(vals)]) {
      const scale = Math.max(1, Math.abs(best));
      if (bd < 1e-6 * scale && Math.abs(last - best) < 1e-2 * scale) return best;
    }
    return NaN;
  }
  /** Snap a numerically estimated value to a simple fraction when it is one to ~7 digits. */
  function snap(v) {
    if (!fin(v)) return v;
    for (let d = 1; d <= 12; d++) {
      const n = Math.round(v * d);
      if (Math.abs(v * d - n) < 2e-7 * d * Math.max(1, Math.abs(v))) return n / d;
    }
    return v;
  }

  MA.widget('limit', (stage, cfg) => {
    css();
    if (!C.has(cfg.f)) throw new Error(MA.t('The ε–δ figure needs f.'));
    if (!C.has(cfg.a)) throw new Error(MA.t('The ε–δ figure needs a.'));
    const ex = C.expr(cfg.f, ['x']);
    const f = fn1(ex, 'x');
    const a = C.num(cfg.a);
    const hole = C.bool(cfg.hole, false);
    const xr0 = C.range(cfg.x, [a - 2, a + 2]);
    const W = xr0[1] - xr0[0];
    // distances from a at which f is examined: geometric (dense near a) plus linear
    const grid = [];
    const dmin = W * 1e-10, PER = 100;
    for (let i = 0; i <= 12 * PER; i++) grid.push(dmin * Math.pow(10, i / PER));
    for (let i = 1; i <= 3000; i++) grid.push(W * i / 2000);
    grid.sort((p, q) => p - q);
    const sides = [-1, 1].map((s) => {
      const vals = grid.map((d) => f(a + s * d));
      let defined = false;
      for (let i = 0; i < grid.length && grid[i] <= W * 1e-4; i++) if (!Number.isNaN(vals[i])) { defined = true; break; }
      return { s, vals, defined, lim: oneSided(f, a, s, W) };
    });
    if (!sides[0].defined && !sides[1].defined) throw new Error(MA.t('f is not defined near x = a.'));
    const [Sm, Sp] = sides;
    let L, noLimit = false;
    if (C.has(cfg.L)) L = C.num(cfg.L);
    else {
      const lm = Sm.defined ? Sm.lim : NaN, lp = Sp.defined ? Sp.lim : NaN;
      if (Sm.defined && Sp.defined) {
        if (fin(lm) && fin(lp) && Math.abs(lm - lp) <= 1e-5 * Math.max(1, Math.abs(lm))) L = snap((lm + lp) / 2);
        else { noLimit = true; L = fin(lp) ? snap(lp) : fin(lm) ? snap(lm) : NaN; }
      } else L = snap(Sp.defined ? lp : lm);
      if (!fin(L)) { noLimit = true; L = 0; }
    }
    const fa = f(a);
    let eps = C.num(cfg.epsilon, 0.5);
    if (!(eps > 0)) throw new Error(MA.t('epsilon must be positive'));
    const fit = MA.autoRange(f, xr0[0], xr0[1]);
    const yr0 = C.range(cfg.y, null) || [Math.min(fit[0], L - 1.4 * eps), Math.max(fit[1], L + 1.4 * eps)];

    /** smallest d > 0 with |f(a + s d) − L| ≥ ε (values outside the domain are skipped) */
    function firstBad(sd) {
      const bad = (y) => !Number.isNaN(y) && !(Math.abs(y - L) < eps);
      const at = (d) => f(a + sd.s * d);
      const v = sd.vals;
      let i = 0;
      while (i < grid.length && !bad(v[i])) i++;
      if (i === grid.length) return { d: Infinity, x: null };
      if (i === 0) return { d: 0, x: a + sd.s * grid[0] };
      let lo = grid[i - 1], hi = grid[i];
      // bad points the grid missed below hi (oscillation): quasi-random probes, log-uniform down to 1e-9·hi
      for (let rep = 0; rep < 4; rep++) {
        const bottom = Math.max(hi * 1e-9, dmin * 1e-3);
        const probes = [];
        for (let j = 1; j <= 1500; j++) { const d = bottom * Math.pow(hi / bottom, (j * 0.6180339887498949) % 1); probes.push([d, bad(at(d))]); }
        const found = Math.min(...probes.filter((q) => q[1]).map((q) => q[0]));
        if (!fin(found)) break;
        hi = found;
        lo = Math.max(0, ...probes.filter((q) => !q[1] && q[0] < found).map((q) => q[0]));
        if (hi <= dmin) return { d: 0, x: a + sd.s * hi };
      }
      if (lo >= hi || bad(at(lo))) lo = 0;
      for (let k = 0; k < 64 && hi - lo > 4e-16 * Math.max(Math.abs(a), hi); k++) {
        const m = 0.5 * (lo + hi);
        if (bad(at(m))) hi = m; else lo = m;
      }
      return { d: hi <= dmin ? 0 : hi, x: a + sd.s * hi };
    }
    function bestDelta() {
      const res = sides.map((sd) => (sd.defined ? firstBad(sd) : null));
      const ds = res.filter(Boolean).map((r) => r.d);
      return { d: Math.min(...ds), res };
    }

    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: 'y = ' + texOf(ex.ast), color: 'var(--ink)' }, { label: MA.t('ε-band around L'), color: 'var(--series-2)', swatch: true },
      { label: MA.t('δ-interval around a'), color: 'var(--series-1)', swatch: true }]);
    const P = new MA.Plot(stage, { x: xr0, y: yr0, label: MA.t('Epsilon–delta definition of a limit') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    let mode = 'auto', zoom = false, dUser = NaN;
    const epsMax = Math.max(eps * 2, (yr0[1] - yr0[0]) / 2);
    logSlider(bar, { label: '\\varepsilon', tex: true, min: Math.min(eps, epsMax) / 1000, max: epsMax, value: eps, onInput: (v) => { eps = v; draw(); } });
    MA.ui.seg(bar, { options: [['auto', MA.t('Largest δ')], ['manual', MA.t('Choose δ')]], value: mode, onChange: (v) => {
      mode = v;
      if (mode === 'manual' && !fin(dUser)) { const d = bestDelta().d; dUser = fin(d) && d > 0 ? Math.min(W / 2, +(1.6 * d).toPrecision(2)) : W / 10; dS.set(dUser); }
      dS.el.classList.toggle('w-calc-hide', mode !== 'manual');
      draw();
    } });
    const dS = logSlider(bar, { label: '\\delta', tex: true, min: W * 1e-5, max: W * 0.75, value: W / 10, onInput: (v) => { dUser = v; draw(); } });
    dS.el.classList.add('w-calc-hide');
    MA.ui.toggle(bar, { label: MA.t('Zoom in'), value: false, onChange: (v) => { zoom = v; if (!zoom) P.setView(xr0, yr0); draw(); } });
    const info = MA.ui.info(stage);
    const verdict = MA.ui.info(stage);

    function draw() {
      const best = bestDelta();
      const dstar = best.d;
      const dShow = mode === 'manual' ? dUser : dstar;
      if (zoom) {
        const hx = fin(dShow) && dShow > 0 ? 2.6 * dShow : W / 20;
        P.setView([a - hx, a + hx], [L - 2.6 * eps, L + 2.6 * eps]);
      }
      P.clear();
      const vx = P.x1 - P.x0, vy = P.y1 - P.y0;
      P.rect(P.x0 - vx, L - eps, 3 * vx, 2 * eps, { fill: 'var(--series-2)', fillOpacity: 0.14, stroke: 'none' });
      P.hline(L + eps, { color: 'var(--series-2)', dash: '5 4', width: 1.3 });
      P.hline(L - eps, { color: 'var(--series-2)', dash: '5 4', width: 1.3 });
      P.hline(L, { color: 'var(--ink-3)', dash: '2 4', width: 1 });
      const dd = fin(dShow) ? dShow : 2 * vx;
      if (dd > 0) {
        P.rect(a - dd, P.y0 - vy, 2 * dd, 3 * vy, { fill: 'var(--series-1)', fillOpacity: 0.12, stroke: 'none' });
        if (fin(dShow)) { P.vline(a - dd, { color: 'var(--series-1)', dash: '5 4', width: 1.3 }); P.vline(a + dd, { color: 'var(--series-1)', dash: '5 4', width: 1.3 }); }
      }
      P.vline(a, { color: 'var(--ink-3)', dash: '2 4', width: 1 });
      graph(P, f, { color: 'var(--ink)', width: 2 });
      // the graph over the δ-interval: inside the band (good) or not (bad)
      if (dd > 0) {
        const lo = Math.max(P.x0, a - dd), hi = Math.min(P.x1, a + dd);
        const n = 600, ins = [], outs = [];
        let prev = null;
        for (let i = 0; i <= n; i++) {
          const x = lo + (hi - lo) * i / n, y = f(x);
          if (!fin(y) || Math.abs(x - a) < 1e-14 * Math.max(1, Math.abs(a))) { ins.push(null); outs.push(null); prev = null; continue; }
          const inside = Math.abs(y - L) < eps;
          const pt = [x, clamp(y, P.y0 - vy, P.y1 + vy)];
          if (prev && prev.inside !== inside) { (inside ? ins : outs).push(prev.pt); }
          (inside ? ins : outs).push(pt); (inside ? outs : ins).push(null);
          prev = { inside, pt };
        }
        P.path(ins, { color: mode === 'manual' ? 'var(--good)' : 'var(--series-1)', width: 3.4 });
        if (mode === 'manual') P.path(outs, { color: 'var(--bad)', width: 3.4 });
      }
      // the value at a: a hole, or the actual value if it differs from L
      const undefinedAtA = hole || !fin(fa);
      if (!undefinedAtA && Math.abs(fa - L) > 1e-12 * Math.max(1, Math.abs(L))) { P.dot(a, L, { hollow: true, color: 'var(--ink)' }); P.dot(a, fa, { color: 'var(--ink)' }); }
      else if (undefinedAtA) P.dot(a, L, { hollow: true, color: 'var(--ink)' });
      // where the graph first leaves the band
      best.res.forEach((r) => {
        if (!r || !fin(r.d) || r.d <= 0 || r.d > dstar * (1 + 1e-9)) return;
        const y = f(r.x);
        if (fin(y)) P.dot(r.x, clamp(y, P.y0, P.y1), { color: 'var(--bad)', r: 4.5 });
      });
      // labels
      P.text(P.x1, L + eps, 'L + ε', { anchor: 'end', dx: -6, dy: -5, color: 'var(--series-2)' });
      P.text(P.x1, L - eps, 'L − ε', { anchor: 'end', dx: -6, dy: 14, color: 'var(--series-2)' });
      if (fin(dShow) && dShow > 0 && 2 * dShow * P.sx > 70) {
        P.text(a - dShow, P.y1, 'a − δ', { anchor: 'end', dx: -5, dy: 15, color: 'var(--series-1)' });
        P.text(a + dShow, P.y1, 'a + δ', { anchor: 'start', dx: 5, dy: 15, color: 'var(--series-1)' });
      }
      // read-outs
      const one = Sm.defined && Sp.defined && fin(best.res[0].d) && fin(best.res[1].d) && Math.abs(best.res[0].d - best.res[1].d) > 1e-9 * Math.max(best.res[0].d, best.res[1].d);
      const parts = [MA.ui.kv('\\varepsilon =', nf(eps, 3), true), noLimit && !C.has(cfg.L) ? MA.ui.kv(MA.t('trial value L'), nf(L, 6)) : MA.ui.kv('L =', nf(L, 6), true),
        MA.ui.kv(MA.t('largest δ'), dstar === Infinity ? MA.t('any δ') : dstar > 0 ? nf(dstar, 4) : '0')];
      if (one) parts.push(MA.ui.kv(MA.t('left / right'), nf(best.res[0].d, 3) + ' / ' + nf(best.res[1].d, 3)));
      if (dstar > 0 && fin(dstar)) parts.push(MA.ui.kv('\\delta / \\varepsilon =', nf(dstar / eps, 3), true));
      info.set(...parts);
      const xa = texShift('x', a), fl = texShift('f(x)', L);
      const v = [];
      if (mode === 'manual') {
        if (dUser <= dstar) v.push(el('span', { class: 'w-calc-good', text: MA.t('This δ works.') + ' ' }), { tex: '0<\\lvert ' + xa + '\\rvert<' + texNum(dUser, 3) + '\\implies\\lvert ' + fl + '\\rvert<' + texNum(eps, 3) });
        else {
          const r = best.res.filter((q) => q && q.d === dstar)[0];
          v.push(el('span', { class: 'w-calc-bad', text: MA.t('This δ is too large:') + ' ' }), MA.t('at x = %s the graph is outside the band.', nf(r ? r.x : NaN, 4)));
        }
      } else if (dstar === 0) {
        v.push(el('span', { class: 'w-calc-bad', text: MA.t('No δ > 0 works:') + ' ' }), MA.t('f(x) leaves the band at points arbitrarily close to a.'));
      } else if (dstar === Infinity) {
        v.push(el('span', { class: 'w-calc-good', text: MA.t('Every δ works:') + ' ' }), MA.t('the whole graph lies inside the band.'));
      } else {
        v.push({ tex: '0<\\lvert ' + xa + '\\rvert<' + texNum(dstar, 3) + '\\implies\\lvert ' + fl + '\\rvert<' + texNum(eps, 3) });
      }
      if (!Sm.defined) v.push(el('span', { class: 'w-calc-note', text: MA.t('f is only defined to the right of a: this is the right-hand limit.') }));
      if (!Sp.defined) v.push(el('span', { class: 'w-calc-note', text: MA.t('f is only defined to the left of a: this is the left-hand limit.') }));
      if (noLimit && !C.has(cfg.L)) {
        const lm = Sm.lim, lp = Sp.lim;
        v.push(el('span', { class: 'w-calc-note', text: fin(lm) && fin(lp) ? MA.t('The one-sided limits differ (%s and %s): the limit does not exist.', nf(lm, 4), nf(lp, 4)) : MA.t('f has no finite limit at a.') }));
      }
      verdict.set(...v);
    }
    P.onHover((x) => {
      if (x === null) { read(null); return; }
      const y = f(x);
      read('x = ' + nf(x, 4) + '   f(x) = ' + nf(y, 5) + '   |f(x) − L| = ' + nf(Math.abs(y - L), 3));
    });
    draw();
  });

  // ------------------------------------------------------------------ secant
  MA.widget('secant', (stage, cfg) => {
    css();
    const ex = C.expr(cfg.f, ['x']);
    const f = fn1(ex, 'x');
    const D = derivs(ex, 'x');
    let x0 = C.num(cfg.x0, 1), h = C.num(cfg.h, 1);
    const h0 = h;
    const sp = Math.max(1.5, Math.abs(h) * 0.8);
    const xr = C.range(cfg.x, [Math.min(x0, x0 + h) - sp, Math.max(x0, x0 + h) + sp]);
    const W = xr[1] - xr[0];
    const yr = C.range(cfg.y, null) || MA.autoRange(f, xr[0], xr[1]);
    const hstep = stepFor(0, 2 * Math.max(Math.abs(h), W / 2));
    const hmax = Math.ceil(Math.max(Math.abs(h), W / 2) / hstep) * hstep;
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: 'y = ' + texOf(ex.ast), color: 'var(--ink)' }, { label: MA.t('secant'), color: 'var(--series-2)' }, { label: MA.t('tangent at x₀'), color: 'var(--series-1)' }]);
    const P = new MA.Plot(stage, { x: xr, y: yr, label: MA.t('Secant line approaching the tangent') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const hS = MA.ui.slider(bar, { label: 'h', tex: true, min: -hmax, max: hmax, step: hstep, value: h, fmt: (v) => nf(v, 3), onInput: (v) => { h = v; draw(); } });
    playButton(bar, (d) => {
      h *= Math.exp(-1.1 * d);
      const stop = Math.abs(h) < W * 2e-4;
      hS.set(h); draw();
      return !stop;
    }, () => { if (Math.abs(h) < W * 2e-4) h = h0; }, MA.t('Let h → 0'));
    const info = MA.ui.info(stage);
    const tbox = el('div', { class: 'w-scroll' });
    stage.append(tbox);
    let hP = null, hQ = null;
    /** One-sided slopes at x: a kink (they differ) or a vertical tangent (they blow up) means f'(x) does not exist. */
    function kink(x) {
      const f0 = f(x), s = Math.max(1, Math.abs(x)), q = (h) => (f(x + h) - f0) / h;
      const r1 = q(1e-7 * s), l1 = q(-1e-7 * s), r2 = q(1e-4 * s), l2 = q(-1e-4 * s);
      if (![r1, l1, r2, l2].every(fin)) return { bad: true };
      const tol = (u, v) => 1e-3 * Math.max(1, Math.abs(u), Math.abs(v));
      if (Math.abs(r1 - l1) > tol(r1, l1) && Math.abs(r2 - l2) > tol(r2, l2)) return { bad: true, left: l1, right: r1 };
      if (Math.abs(r1) > 1e3 && Math.abs(r1) > 8 * Math.abs(r2)) return { bad: true, vertical: true };
      return null;
    }
    function draw() {
      P.clear();
      const f0 = f(x0), d = D({}, x0), kk = kink(x0), m1 = kk ? NaN : d[1];
      const x1 = x0 + h, f1 = f(x1);
      const q = (f1 - f0) / h;
      graph(P, f, { color: 'var(--ink)', width: 2 });
      if (fin(m1) && fin(f0)) P.slopeLine(x0, f0, m1, { color: 'var(--series-1)', width: 1.8, dash: '7 5' });
      if (h !== 0 && fin(q)) {
        P.slopeLine(x0, f0, q, { color: 'var(--series-2)', width: 2.2 });
        P.line(x0, f0, x1, f0, { color: 'var(--ink-3)', width: 1.3, dash: '3 3' });
        P.line(x1, f0, x1, f1, { color: 'var(--ink-3)', width: 1.3, dash: '3 3' });
        if (Math.abs(h) * P.sx > 26) P.text((x0 + x1) / 2, f0, 'h', { anchor: 'middle', dy: f1 > f0 ? 15 : -7, color: 'var(--ink-2)' });
        if (Math.abs(f1 - f0) * P.sy > 22) P.text(x1, (f0 + f1) / 2, 'Δy', { anchor: h > 0 ? 'start' : 'end', dx: h > 0 ? 7 : -7, dy: 4, color: 'var(--ink-2)' });
      }
      if (!hP) {
        hP = P.handle(x0, f0, { label: MA.t('Point (x₀, f(x₀))'), constrain: (x) => [x, f(x)], onDrag: (x) => { x0 = x; draw(); } });
        hQ = P.handle(x1, f1, { label: MA.t('Point (x₀ + h, f(x₀ + h))'), color: 'var(--series-2)', constrain: (x) => [x, f(x)], onDrag: (x) => { h = clamp(x - x0, -hmax, hmax); hS.set(h); draw(); } });
      }
      hP.set(x0, f0); hQ.set(x1, f1);
      info.set(MA.ui.kv('x_0 =', nf(x0, 4), true), MA.ui.kv('h =', nf(h, 4), true),
        MA.ui.kv('\\dfrac{f(x_0+h)-f(x_0)}{h} =', h === 0 ? MA.t('undefined (0/0)') : nf(q, 6), true),
        kk ? el('span', { class: 'w-calc-bad', text: kk.vertical ? MA.t('f′(x₀) does not exist: the tangent is vertical.') : fin(kk.left) ? MA.t('f′(x₀) does not exist: the one-sided slopes are %s and %s.', nf(kk.left, 4), nf(kk.right, 4)) : MA.t('f′(x₀) does not exist.') })
          : MA.ui.kv("f'(x_0) =", nf(m1, 6), true), kk ? null : MA.ui.kv(MA.t('difference'), h === 0 ? '–' : nf(q - m1, 3)));
      // difference quotients for h = 10^-k
      const tb = el('table', { class: 'w-table w-calc-table', style: 'width:auto;min-width:min(100%,480px)' });
      const hd = el('tr');
      ['h', '\\frac{f(x_0+h)-f(x_0)}{h}', "\\text{quotient} - f'(x_0)"].forEach((s, i) => hd.append(el('th', { class: i ? '' : 'l' }, MA.texEl(s))));
      tb.append(hd);
      const sg = h < 0 ? -1 : 1;
      const near = Math.abs(h) > 0 ? Math.round(-Math.log10(Math.abs(h))) : 99;
      for (let k = 0; k <= 7; k++) {
        const hh = sg * Math.pow(10, -k), qq = (f(x0 + hh) - f0) / hh;
        tb.append(el('tr', { class: k === near ? 'hot' : '' }, el('td', { class: 'l', text: nf(hh, 2) }), el('td', { text: nf(qq, 10) }), el('td', { text: fin(m1) ? nf(qq - m1, 3) : '–' })));
      }
      tbox.replaceChildren(tb);
    }
    P.onHover((x) => read(x === null ? null : 'x = ' + nf(x, 3) + '   f(x) = ' + nf(f(x), 4)));
    draw();
  });

  // ------------------------------------------------------------------ sequence
  MA.widget('sequence', (stage, cfg) => {
    css();
    if (!C.has(cfg.a)) throw new Error(MA.t('The sequence figure needs a (a formula in n).'));
    const sl = sliderSetup(cfg);
    const ex = C.expr(cfg.a, ['n'].concat(sl.names));
    const scope = Object.assign({}, sl.values);
    const mode = C.str(cfg.mode, 'terms');
    if (!['terms', 'sums', 'both'].includes(mode)) throw new Error(MA.t('mode must be terms, sums or both'));
    const start = C.int(cfg.start, 1);
    let N = C.int(cfg.N, 30);
    if (!(N > start)) throw new Error(MA.t('N must be larger than start'));
    N = Math.min(N, start + 5000);
    const showA = mode !== 'sums', showS = mode !== 'terms';
    const track = showS ? 'S' : 'A';          // the sequence the limit (and ε-band) refers to
    const hasLim = C.has(cfg.limit), hasEps = C.has(cfg.epsilon);
    let lim = hasLim ? C.num(cfg.limit) : NaN;
    let eps = hasEps ? C.num(cfg.epsilon) : NaN;
    if (hasEps && !(eps > 0)) throw new Error(MA.t('epsilon must be positive'));
    const NCHECK = 20000;
    let A = [], S = [], M = start;
    function compute() {
      const want = hasLim || hasEps ? Math.max(N, start + NCHECK) : N;
      A = []; S = [];
      let s = 0;
      const tStart = performance.now();
      for (let n = start; n <= want; n++) {
        scope.n = n;
        let v;
        try { v = ex.f(scope); } catch (e) { v = NaN; }
        A.push(v); s += v; S.push(s);
        if (n > N && (n & 127) === 0 && performance.now() - tStart > 40) break;   // expensive formulas: check fewer terms
      }
      M = start + A.length - 1;
      if (hasEps && !hasLim) {
        // estimate the limit by Aitken extrapolation through the terms at M/4, M/2, M
        const X = track === 'S' ? S : A;
        const i3 = X.length - 1, i2 = Math.floor(i3 / 2), i1 = Math.floor(i3 / 4);
        const d1 = X[i2] - X[i1], d2 = X[i3] - X[i2];
        let L = Math.abs(d2 - d1) > 1e-300 ? X[i3] - d2 * d2 / (d2 - d1) : X[i3];
        if (!fin(L) || Math.abs(L - X[i3]) > 10 * Math.abs(d2) + 1e-12) L = X[i3];
        lim = Math.abs(d2) < 1e-2 * Math.max(1, Math.abs(X[i3])) ? snap(L) : NaN;
      }
    }
    compute();
    function findN() {
      const X = track === 'S' ? S : A;
      for (let i = X.length - 1; i >= 0; i--) if (!(Math.abs(X[i] - lim) < eps)) return i === X.length - 1 ? null : start + i + 1;
      return start;
    }
    function ranges() {
      const w = N - start;
      const xr = [start - 0.6 - 0.02 * w, N + 0.6 + 0.02 * w];
      if (C.has(cfg.y)) return [xr, C.range(cfg.y)];
      const vals = [];
      for (let i = 0; i <= w; i++) { if (showA) vals.push(A[i]); if (showS) vals.push(S[i]); }
      let r = spread(vals, vals.length > 80 ? 0.01 : 0) || [-1, 1];
      if (fin(lim)) { const e = fin(eps) ? eps : 0; r = [Math.min(r[0], lim - e), Math.max(r[1], lim + e)]; }
      if (r[0] > 0 && r[0] < 0.6 * r[1]) r[0] = 0;
      if (r[1] < 0 && r[1] > 0.6 * r[0]) r[1] = 0;
      return [xr, pad(r, 0.08)];
    }
    MA.ui.title(stage, cfg.title);
    const leg = [];
    if (showA) leg.push({ label: 'a_n = ' + texOf(ex.ast), color: 'var(--series-1)' });
    if (showS) leg.push({ label: 'S_n = \\sum_{k=' + start + '}^{n} a_k', color: 'var(--series-2)' });
    if (hasEps) leg.push({ label: MA.t('ε-band around L'), color: 'var(--series-3)', swatch: true });
    MA.ui.legend(stage, leg);
    const [xr0, yr0] = ranges();
    const P = new MA.Plot(stage, { x: xr0, y: yr0, label: MA.t('Terms of a sequence'), xLabel: 'n' });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    sl.specs.forEach((s) => MA.ui.slider(bar, { label: s.name, min: s.min, max: s.max, step: s.step, value: s.value, onInput: (v) => { scope[s.name] = v; compute(); const [x, y] = ranges(); P.setView(x, y); draw(); } }));
    if (hasEps) logSlider(bar, { label: '\\varepsilon', tex: true, min: eps / 1000, max: Math.max(eps * 4, (yr0[1] - yr0[0]) / 2), value: eps, onInput: (v) => { eps = v; draw(); } });
    const nMax = Math.max(N, start + clamp(4 * (N - start), 100, 1000));
    MA.ui.slider(bar, { label: MA.t('last n'), min: start + 2, max: nMax, step: 1, value: N, fmt: String, onInput: (v) => {
      N = v;
      if (N > M) compute();
      const [x, y] = ranges(); P.setView(x, y); draw();
    } });
    const info = MA.ui.info(stage);
    const bandInfo = hasEps ? MA.ui.info(stage) : null;

    function draw() {
      P.clear();
      const band = fin(lim) && fin(eps);
      const Nn = band ? findN() : null;
      const vx = P.x1 - P.x0;
      if (band) {
        P.rect(P.x0 - vx, lim - eps, 3 * vx, 2 * eps, { fill: 'var(--series-3)', fillOpacity: 0.12, stroke: 'none' });
        P.hline(lim + eps, { color: 'var(--series-3)', dash: '5 4', width: 1.2 });
        P.hline(lim - eps, { color: 'var(--series-3)', dash: '5 4', width: 1.2 });
        if (Nn !== null && Nn <= N) {
          P.rect(Nn - 0.5, lim - eps, P.x1 - Nn + vx, 2 * eps, { fill: 'var(--series-3)', fillOpacity: 0.16, stroke: 'none' });
          P.vline(Nn - 0.5, { color: 'var(--series-3)', dash: false, width: 1.6 });
          P.text(Nn - 0.5, P.y1, 'N = ' + Nn, { dx: 5, dy: 14, color: 'var(--series-3)' });
        }
      }
      if (fin(lim)) {
        P.hline(lim, { color: 'var(--ink-2)', dash: '6 4', width: 1.2 });
        P.text(P.x1, lim, (hasLim ? 'L = ' : 'L ≈ ') + nf(lim, 5), { anchor: 'end', dx: -6, dy: -6, color: 'var(--ink-2)' });
      }
      const w = N - start;
      const r = w > 160 ? 1.8 : w > 70 ? 2.4 : 3.4;
      const out = (v) => band && !(Math.abs(v - lim) < eps);
      if (showA) {
        const stems = w <= 150 && P.y0 <= 0 && P.y1 >= 0;
        for (let i = 0; i <= w; i++) {
          const v = A[i];
          if (!fin(v)) continue;
          if (stems) P.line(start + i, 0, start + i, v, { color: 'var(--series-1)', width: 1, opacity: 0.4 });
          P.dot(start + i, v, { r, color: 'var(--series-1)', hollow: track === 'A' && out(v) });
        }
      }
      if (showS) {
        P.path(S.slice(0, w + 1).map((v, i) => [start + i, v]), { color: 'var(--series-2)', width: 1.2, opacity: 0.55 });
        for (let i = 0; i <= w; i++) if (fin(S[i])) P.dot(start + i, S[i], { r, color: 'var(--series-2)', hollow: track === 'S' && out(S[i]) });
      }
      const parts = [];
      if (showA) parts.push(MA.ui.kv('a_{' + N + '} =', nf(A[w], 6), true));
      if (showS) parts.push(MA.ui.kv('S_{' + N + '} =', nf(S[w], 8), true));
      if (fin(lim)) parts.push(MA.ui.kv('\\lvert ' + (track === 'S' ? 'S' : 'a') + '_{' + N + '} - L\\rvert =', nf(Math.abs((track === 'S' ? S : A)[w] - lim), 3), true));
      info.set(...parts);
      if (bandInfo) {
        const X = track === 'S' ? 'S_n' : 'a_n';
        if (!band) bandInfo.set(el('span', { class: 'w-calc-note', text: MA.t('No limit detected, so there is no ε-band.') }));
        else if (Nn === null) bandInfo.set(el('span', { class: 'w-calc-bad', text: MA.t('No N found: the terms are still outside the band at n = %d.', M) }));
        else {
          bandInfo.set({ tex: '\\lvert ' + X + ' - L\\rvert < ' + texNum(eps, 3) }, MA.t('for every n ≥ %d', Nn),
            el('span', { class: 'w-calc-note', text: Nn > N ? MA.t('(N lies beyond the plotted terms; checked up to n = %d)', M) : MA.t('(checked up to n = %d; hollow points lie outside the band)', M) }));
        }
      }
    }
    P.onHover((x) => {
      if (x === null) { read(null); return; }
      const n = clamp(Math.round(x), start, N), i = n - start;
      read('n = ' + n + (showA ? '   a = ' + nf(A[i], 6) : '') + (showS ? '   S = ' + nf(S[i], 7) : ''));
    });
    draw();
  });

  // ------------------------------------------------------------------ newton (root finding)
  const ROOT = { newton: 'Newton', secant: 'Secant', bisection: 'Bisection', fixed: 'Fixed point' };
  /** v with `sig` significant digits, keeping trailing zeros (for digit-by-digit comparison). */
  function sigStr(v, sig) {
    if (!fin(v)) return nf(v);
    const a = Math.abs(v);
    const s = a !== 0 && (a < 1e-4 || a >= 1e7) ? v.toExponential(sig - 1) : v.toPrecision(sig);
    return s.replace(/^-/, '−');
  }
  /** x_k with the leading digits that agree with the limit in bold. */
  function digitsEl(v, ref, sig) {
    const s = sigStr(v, sig);
    if (ref === null || !fin(v)) return document.createTextNode(s);
    const r = sigStr(ref, sig);
    const [sm, se] = s.split('e'), [rm, re] = r.split('e');
    let k = 0;
    if (se === re) while (k < sm.length && sm[k] === rm[k]) k++;
    if (!/\d/.test(sm.slice(0, k))) k = 0;
    const span = el('span');
    if (k) span.append(el('b', { text: s.slice(0, k) }));
    span.append(s.slice(k));
    return span;
  }

  MA.widget('newton', (stage, cfg) => {
    css();
    if (!C.has(cfg.f)) throw new Error(MA.t('The root-finding figure needs f.'));
    const ef = C.expr(cfg.f, ['x']);
    const f = fn1(ef, 'x');
    const dF = derivs(ef, 'x');
    const df = (x) => dF({}, x)[1];
    let method = C.str(cfg.method, 'newton');
    if (!ROOT[method]) throw new Error(MA.t('method must be one of: %s', Object.keys(ROOT).join(', ')));
    let x0 = C.num(cfg.x0, 1);
    let x1 = C.has(cfg.x1) ? C.num(cfg.x1) : null;      // null: a default is chosen for the method
    const eg = C.has(cfg.g) ? C.expr(cfg.g, ['x']) : null;
    let chord = df(x0);
    if (!fin(chord) || Math.abs(chord) < 1e-12) chord = 1;
    const g = eg ? fn1(eg, 'x') : (x) => x - f(x) / chord;
    const dG = eg ? derivs(eg, 'x') : null;
    const dg = (x) => (eg ? dG({}, x)[1] : 1 - df(x) / chord);
    const gTeX = eg ? texOf(eg.ast) : 'x ' + (chord < 0 ? '+' : '-') + ' \\frac{f(x)}{' + texNum(Math.abs(chord), 4) + '}';
    const steps = clamp(C.int(cfg.steps, 6), 1, 60);
    const KMAX = Math.max(steps, 12);
    let k = steps;
    const userX = C.range(cfg.x, null), userY = C.range(cfg.y, null);

    function x1For(m) {
      if (x1 !== null) return x1;
      if (m === 'secant') { const s = f(x0) / df(x0); return fin(s) && s !== 0 ? x0 - clamp(0.5 * s, -1, 1) : x0 + 0.5; }
      const f0 = f(x0);
      for (const d of [0.25, 0.5, 1, 2, 4, 8, 16]) for (const s of [1, -1]) { const y = f(x0 + s * d); if (fin(y) && fin(f0) && y * f0 <= 0) return x0 + s * d; }
      return x0 + 1;
    }
    let x1v = x1For(method);

    /** Iterate the method n steps from the current start; rows {x, fx, (d | a, b)} and a stop note. */
    function run(m, n) {
      const rows = [];
      let note = null;
      const wild = (v) => !fin(v) || Math.abs(v) > 1e15;
      if (m === 'bisection') {
        let a = Math.min(x0, x1v), b = Math.max(x0, x1v), fa = f(a), fb = f(b);
        if (!(fa * fb <= 0)) return { rows, note: MA.t('f(a) and f(b) must have opposite signs: move the end points.'), fail: true };
        for (let j = 0; j <= n; j++) {
          const m2 = 0.5 * (a + b), fm = f(m2);
          rows.push({ x: m2, fx: fm, a, b });
          if (fm === 0 || !fin(fm)) { if (!fin(fm)) note = MA.t('f is undefined at a midpoint.'); break; }
          if (fa * fm < 0) { b = m2; fb = fm; } else { a = m2; fa = fm; }
        }
        return { rows, note };
      }
      if (m === 'secant') {
        let xa = x0, xb = x1v, fa = f(xa), fb = f(xb);
        rows.push({ x: xa, fx: fa }, { x: xb, fx: fb });
        for (let j = 0; j < n; j++) {
          if (!fin(fb) || fb === 0) break;
          if (fb === fa) { if (Math.abs(xb - xa) > 1e-10 * Math.max(1, Math.abs(xb))) note = MA.t('Two equal function values: the secant is horizontal.'); break; }
          const xc = xb - fb * (xb - xa) / (fb - fa);
          if (wild(xc)) { note = MA.t('The iterates run away.'); break; }
          xa = xb; fa = fb; xb = xc; fb = f(xb);
          rows.push({ x: xb, fx: fb });
        }
        return { rows, note };
      }
      if (m === 'fixed') {
        let x = x0;
        rows.push({ x, fx: f(x) });
        for (let j = 0; j < n; j++) {
          const xn = g(x);
          if (wild(xn)) { note = MA.t('The iterates run away.'); break; }
          x = xn;
          rows.push({ x, fx: f(x) });
        }
        return { rows, note };
      }
      let x = x0;
      for (let j = 0; ; j++) {
        const fx = f(x), d = df(x);
        rows.push({ x, fx, d });
        if (j >= n || fx === 0) break;
        if (!fin(fx)) { note = MA.t('f is undefined at an iterate.'); break; }
        if (!fin(d) || d === 0) { note = MA.t('f′(x) = 0 at an iterate: the tangent is horizontal.'); break; }
        const xn = x - fx / d;
        if (wild(xn)) { note = MA.t('The iterates run away.'); break; }
        x = xn;
      }
      return { rows, note };
    }
    /** The limit of the iteration (run much longer, then polished), or null. */
    function reference(m) {
      const r = run(m, m === 'fixed' ? 5000 : m === 'bisection' ? 90 : 300);
      const n = r.rows.length;
      if (n < 2) return null;
      let xs = r.rows[n - 1].x;
      const prev = r.rows[n - 2].x;
      if (!fin(xs)) return null;
      const settled = Math.abs(xs - prev) <= 1e-11 * Math.max(1, Math.abs(xs)) || r.rows[n - 1].fx === 0 || m === 'bisection';
      if (!settled) return null;
      const h = m === 'fixed' ? (x) => g(x) - x : f;
      for (let i = 0; i < 4; i++) {
        const y = h(xs), d = m === 'fixed' ? dg(xs) - 1 : df(xs);
        if (!(fin(y) && fin(d) && d !== 0)) break;
        const xn = xs - y / d;
        if (!fin(xn) || Math.abs(xn - xs) > 1e-7 * Math.max(1, Math.abs(xs))) break;
        xs = xn;
      }
      return Math.abs(xs) < 1e-12 * Math.max(1, Math.abs(x0)) ? 0 : xs;
    }
    let rec = null, ref = null;
    function recompute() { rec = run(method, KMAX); ref = reference(method); }
    recompute();

    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    stage.append(legBox);
    function legend() {
      legBox.replaceChildren();
      const items = method === 'fixed'
        ? [{ label: 'y = g(x) = ' + gTeX, color: 'var(--series-1)' }, { label: 'y = x', color: 'var(--ink-3)' }, { label: MA.t('iterates'), color: 'var(--series-2)' }]
        : [{ label: 'y = ' + texOf(ef.ast), color: 'var(--ink)' }, { label: method === 'bisection' ? MA.t('brackets [a, b]') : method === 'newton' ? MA.t('tangent lines') : MA.t('secant lines'), color: method === 'bisection' ? 'var(--series-1)' : 'var(--series-2)' }];
      MA.ui.legend(legBox, items);
    }
    legend();
    const P = new MA.Plot(stage, { x: [-5, 5], y: [-3, 3], label: MA.t('Root-finding iterations') });
    const read = P.readout();
    function fitView() {
      const xs = [x0];
      if (method === 'secant' || method === 'bisection') xs.push(x1v);
      if (ref !== null) xs.push(ref);
      const scale = Math.max(1, Math.abs(x0 - (ref === null ? x0 : ref)));
      rec.rows.slice(0, 4).forEach((r) => { if (fin(r.x) && Math.abs(r.x - x0) < 20 * scale) xs.push(r.x); });
      const lo = Math.min(...xs), hi = Math.max(...xs), span = Math.max(hi - lo, 1);
      const xr = userX || [lo - 0.35 * span, hi + 0.35 * span];
      let yr = userY;
      if (!yr) {
        if (method === 'fixed') yr = xr.slice();
        else { const r = MA.autoRange(f, xr[0], xr[1]); const s = r[1] - r[0]; yr = [Math.min(r[0], -0.08 * s), Math.max(r[1], 0.08 * s)]; }
      }
      P.setView(xr, yr);
    }
    fitView();
    const bar = MA.ui.bar(stage);
    MA.ui.select(bar, { label: MA.t('Method'), value: method, options: Object.keys(ROOT).map((m) => [m, MA.t(ROOT[m])]), onChange: (v) => {
      method = v; x1v = x1For(method); recompute(); fitView(); legend(); draw();
    } });
    const kS = MA.ui.slider(bar, { label: MA.t('steps'), min: 0, max: KMAX, step: 1, value: k, fmt: String, onInput: (v) => { k = v; draw(); } });
    MA.ui.button(bar, { label: MA.t('Next step'), onClick: () => { k = k >= KMAX ? 0 : k + 1; kS.set(k); draw(); } });
    const info = MA.ui.info(stage);
    const tbox = el('div', { class: 'w-scroll' });
    stage.append(tbox);
    let h0 = null, h1 = null;

    function draw() {
      P.clear();
      const R = rec.rows;
      const shown = Math.min(R.length, method === 'secant' ? k + 2 : k + 1);
      const op = (j, last) => (j === last ? 1 : 0.42);
      const vy = P.y1 - P.y0;
      const placed = [];
      const lab = (x, text, color, below) => {
        const px = P.X(x);
        if (px < P.pl || px > P.W - P.pr || placed.some((q) => Math.abs(q - px) < 18)) return;
        placed.push(px);
        P.text(x, 0, text, { anchor: 'middle', dy: below ? 17 : -9, color, layer: 'top' });
      };
      if (method === 'fixed') {
        const big = 10 * (P.x1 - P.x0 + vy);
        P.line(P.x0 - big, P.x0 - big, P.x1 + big, P.x1 + big, { color: 'var(--ink-3)', width: 1.3 });
        graph(P, g, { color: 'var(--series-1)', width: 2.2 });
        if (ref !== null) P.dot(ref, ref, { r: 5, hollow: true, color: 'var(--good)' });
        for (let j = 0; j + 1 < shown; j++) {
          const xa = R[j].x, xb = R[j + 1].x, o = op(j, shown - 2);
          P.line(xa, xa, xa, xb, { color: 'var(--series-2)', width: 1.8, opacity: o });
          P.line(xa, xb, xb, xb, { color: 'var(--series-2)', width: 1.8, opacity: o });
        }
        for (let j = shown - 1; j >= 0; j--) {
          const cur = j === shown - 1;
          if (fin(R[j].x)) P.dot(R[j].x, R[j].x, { r: cur ? 4.5 : 3, color: cur ? 'var(--accent)' : 'var(--ink-2)' });
        }
      } else {
        if (method === 'bisection' && shown) {
          const c = R[shown - 1];
          P.rect(c.a, P.y0 - vy, c.b - c.a, 3 * vy, { fill: 'var(--series-1)', fillOpacity: 0.09, stroke: 'none' });
        }
        graph(P, f, { color: 'var(--ink)', width: 2 });
        if (ref !== null) P.dot(ref, 0, { r: 5.5, hollow: true, color: 'var(--good)' });
        if (method === 'newton') {
          for (let j = 0; j + 1 < shown; j++) {
            const r = R[j], xn = R[j + 1].x, o = op(j, shown - 2), e = 0.12 * (xn - r.x);
            P.line(r.x, 0, r.x, r.fx, { color: 'var(--ink-3)', width: 1.1, dash: '3 3', opacity: o });
            P.line(r.x - e, r.fx - e * r.d, xn + e, -e * r.d, { color: 'var(--series-2)', width: 2, opacity: o });
            P.dot(r.x, r.fx, { r: 3.4, color: 'var(--series-2)' }).style.opacity = o;
          }
        } else if (method === 'secant') {
          for (let j = 1; j + 1 < shown; j++) {
            const p = R[j - 1], q = R[j], xn = R[j + 1].x, o = op(j, shown - 2);
            const lo = Math.min(p.x, q.x, xn), hi = Math.max(p.x, q.x, xn), m = (q.fx - p.fx) / (q.x - p.x), e = 0.1 * (hi - lo);
            P.line(lo - e, q.fx + m * (lo - e - q.x), hi + e, q.fx + m * (hi + e - q.x), { color: 'var(--series-2)', width: 2, opacity: o });
            [p, q].forEach((r) => {
              P.line(r.x, 0, r.x, r.fx, { color: 'var(--ink-3)', width: 1.1, dash: '3 3', opacity: o });
              P.dot(r.x, r.fx, { r: 3.4, color: 'var(--series-2)' }).style.opacity = o;
            });
          }
        } else if (shown) {
          // bisection: a ladder of the brackets (newest lowest) and the signs at the current ends
          const gap = Math.min(9, 0.4 * (P.H - P.pt - P.pb) / shown), tick = 3.5 / P.sy;
          for (let j = 0; j < shown; j++) {
            const r = R[j], y = P.inv(0, P.pt + 9 + j * gap)[1], cur = j === shown - 1, o = cur ? 1 : 0.45;
            P.line(r.a, y, r.b, y, { color: 'var(--series-1)', width: cur ? 3 : 2, opacity: o });
            P.line(r.a, y - tick, r.a, y + tick, { color: 'var(--series-1)', width: 1.5, opacity: o });
            P.line(r.b, y - tick, r.b, y + tick, { color: 'var(--series-1)', width: 1.5, opacity: o });
            P.dot(r.x, y, { r: cur ? 3.4 : 2.2, color: 'var(--series-2)' }).style.opacity = o;
          }
          const c = R[shown - 1];
          [c.a, c.b].forEach((x) => {
            const y = f(x);
            if (!fin(y) || y === 0) return;
            P.dot(x, y, { r: 3.6, color: y > 0 ? 'var(--series-1)' : 'var(--series-2)' });
            P.text(x, y, y > 0 ? '+' : '−', { anchor: 'middle', dy: y > 0 ? -9 : 18, color: y > 0 ? 'var(--series-1)' : 'var(--series-2)' });
          });
          if (fin(c.fx)) { P.line(c.x, 0, c.x, c.fx, { color: 'var(--ink-3)', width: 1.1, dash: '3 3' }); P.dot(c.x, c.fx, { r: 3.4, color: 'var(--series-2)' }); }
          P.dot(c.x, 0, { r: 4.5, color: 'var(--accent)' });
          lab(c.x, sub('m', shown - 1), 'var(--accent)', c.fx > 0);
        }
        if (method !== 'bisection') {
          for (let j = shown - 1; j >= 0; j--) {
            const r = R[j], cur = j === shown - 1;
            if (!fin(r.x)) continue;
            P.dot(r.x, 0, { r: cur ? 4.5 : 3, color: cur ? 'var(--accent)' : 'var(--ink-2)' });
            lab(r.x, sub('x', j), cur ? 'var(--accent)' : 'var(--ink-2)', r.fx > 0);
          }
        }
      }
      // handles for the starting point(s)
      if (!h0) {
        h0 = P.handle(x0, 0, { label: MA.t('Starting point'), constrain: (x) => [x, method === 'fixed' ? x : 0], onDrag: (x) => { x0 = x; if (x1 === null) x1v = x1For(method); recompute(); draw(); } });
        h1 = P.handle(x1v, 0, { label: MA.t('Second starting point'), color: 'var(--series-2)', constrain: (x) => [x, 0], onDrag: (x) => { x1 = x1v = x; recompute(); draw(); } });
      }
      h0.set(x0, 0);
      h1.set(x1v, 0);
      h1.el.style.display = method === 'secant' || method === 'bisection' ? '' : 'none';
      table(R.slice(0, shown));
      infoRow(R, shown);
    }
    function table(rows) {
      const isB = method === 'bisection';
      const floor = ref === null ? 0 : 1e-13 * Math.max(1, Math.abs(ref));
      const e = rows.map((r) => (ref === null ? NaN : Math.abs(r.x - ref)));
      const t = el('table', { class: 'w-table w-calc-table' });
      const heads = isB ? ['k', 'a_k', 'b_k', 'm_k', 'f(m_k)', '\\lvert m_k - x^*\\rvert', '\\tfrac12(b_k - a_k)']
        : ['k', 'x_k', 'f(x_k)', '\\lvert x_k - x^*\\rvert', 'e_k / e_{k-1}', MA.t('order')];
      t.append(el('tr', null, ...heads.map((h, i) => el('th', { class: i < 2 ? 'l' : '' }, /[\\_^{]/.test(h) ? MA.texEl(h) : h))));
      rows.forEach((r, j) => {
        const cells = [el('td', { class: 'l', text: String(j) })];
        const ok = (q) => fin(q) && q > floor;
        if (isB) {
          cells.push(el('td', { class: 'l', text: sigStr(r.a, 10) }), el('td', { text: sigStr(r.b, 10) }), el('td', null, digitsEl(r.x, ref, 10)),
            el('td', { text: nf(r.fx, 3) }), el('td', { text: fin(e[j]) ? nf(e[j], 3) : '–' }), el('td', { text: nf((r.b - r.a) / 2, 3) }));
        } else {
          const ratio = j > 0 && ok(e[j]) && ok(e[j - 1]) ? e[j] / e[j - 1] : NaN;
          const p = j > 1 && ok(e[j]) && ok(e[j - 1]) && ok(e[j - 2]) && e[j - 1] !== e[j - 2] ? Math.log(e[j] / e[j - 1]) / Math.log(e[j - 1] / e[j - 2]) : NaN;
          cells.push(el('td', { class: 'l' }, digitsEl(r.x, ref, 12)), el('td', { text: nf(r.fx, 3) }),
            el('td', { text: fin(e[j]) ? nf(e[j], 3) : '–' }), el('td', { text: fin(ratio) ? nf(ratio, 3) : '' }), el('td', { text: fin(p) ? nf(p, 3) : '' }));
        }
        t.append(el('tr', { class: j === rows.length - 1 ? 'hot' : '' }, ...cells));
      });
      tbox.replaceChildren(rows.length ? t : '');
      tbox.scrollTop = tbox.scrollHeight;
    }
    function infoRow(R, shown) {
      const parts = [];
      if (rec.fail) { info.set(el('span', { class: 'w-calc-bad', text: rec.note })); return; }
      if (ref !== null) parts.push(MA.ui.kv(MA.t('limit'), sigStr(ref, 12)));
      else {
        // a cycle? (x_k = x_{k−p} at the end of a long run)
        const long = run(method, 200).rows.map((q) => q.x), n = long.length;
        let per = 0;
        for (let p = 2; p <= 6 && !per && n > 3 * p; p++) {
          let ok = true;
          for (let j = n - 2 * p; j < n; j++) if (!(Math.abs(long[j] - long[j - p]) <= 1e-9 * Math.max(1, Math.abs(long[j])))) { ok = false; break; }
          if (ok) per = p;
        }
        parts.push(el('span', { class: 'w-calc-bad', text: per ? MA.t('The iterates fall into a cycle of period %d and never converge.', per) : MA.t('The iteration does not settle down from this start.') }));
      }
      if (ref !== null) {
        if (method === 'newton') {
          const d = df(ref);
          parts.push(MA.ui.kv("f'(x^*) =", nf(d, 4), true));
          parts.push(el('span', { class: 'w-calc-note', text: Math.abs(d) > 1e-6 ? MA.t('Simple root: quadratic convergence, the correct digits roughly double each step.') : MA.t('Multiple root (f′ = 0 there): Newton converges only linearly.') }));
        } else if (method === 'secant') {
          parts.push(el('span', { class: 'w-calc-note', text: MA.t('Secant method: order (1 + √5)/2 ≈ 1.618 at a simple root.') }));
        } else if (method === 'bisection') {
          const c = R[shown - 1];
          parts.push(MA.ui.kv(MA.t('error bound'), nf((c.b - c.a) / 2, 3)));
          parts.push(el('span', { class: 'w-calc-note', text: MA.t('The bracket halves at every step: linear convergence with ratio 1/2.') }));
        } else {
          const d = dg(ref);
          parts.push(MA.ui.kv("g'(x^*) =", nf(d, 4), true));
          parts.push(el('span', { class: 'w-calc-note', text: Math.abs(d) < 1e-8 ? MA.t('g′(x*) = 0: faster than linear convergence.') : Math.abs(d) < 1 ? MA.t('Linear convergence: each step multiplies the error by about |g′(x*)|.') : MA.t('|g′(x*)| > 1: the fixed point repels nearby iterates.') }));
        }
      }
      if (rec.note) parts.push(el('span', { class: 'w-calc-bad', text: rec.note }));
      info.set(...parts);
    }
    P.onHover((x) => read(x === null ? null : 'x = ' + nf(x, 4) + (method === 'fixed' ? '   g(x) = ' + nf(g(x), 5) : '   f(x) = ' + nf(f(x), 5))));
    draw();
  });

  // ------------------------------------------------------------------ cobweb
  MA.widget('cobweb', (stage, cfg) => {
    css();
    if (!C.has(cfg.g)) throw new Error(MA.t('The cobweb figure needs g.'));
    const sl = sliderSetup(cfg);
    const eg = C.expr(cfg.g, ['x'].concat(sl.names));
    const scope = Object.assign({}, sl.values);
    const g = fn1(eg, 'x', scope);
    const dG = derivs(eg, 'x');
    let x0 = C.num(cfg.x0, 0.2);
    let steps = clamp(C.int(cfg.steps, 30), 1, 500);
    const xr = C.range(cfg.x, [0, 1]);
    const yr = C.range(cfg.y, null) || xr.slice();
    const bifName = C.str(cfg.bifurcation, '');
    const bif = bifName ? sl.specs.find((s) => s.name === bifName) : null;
    if (bifName && !bif) throw new Error(MA.t('bifurcation must name one of the sliders (%s)', sl.names.join(', ') || '–'));
    const vx = xr[1] - xr[0], vy = yr[1] - yr[0];
    const xv = [xr[0] - 0.03 * vx, xr[1] + 0.03 * vx], yv = [yr[0] - 0.03 * vy, yr[1] + 0.03 * vy];
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: 'y = g(x) = ' + texOf(eg.ast), color: 'var(--series-1)' }, { label: 'y = x', color: 'var(--ink-3)' },
      { label: MA.t('orbit'), color: 'var(--series-2)' }, { label: MA.t('stable / unstable fixed point'), color: 'var(--good)', swatch: true }]);
    const pair = el('div', { class: 'w-calc-pair' });
    stage.append(pair);
    const left = el('div'), right = el('div');
    pair.append(left, right);
    left.append(el('div', { class: 'w-calc-cap', text: MA.t('Cobweb') }));
    right.append(el('div', { class: 'w-calc-cap', text: MA.t('Orbit against n') }));
    const P = new MA.Plot(left, { x: xv, y: yv, width: 420, height: 400, label: MA.t('Cobweb diagram') });
    const Q = new MA.Plot(right, { x: [-0.5, steps + 0.5], y: yv, width: 420, height: 400, label: MA.t('Orbit against n'), xLabel: 'n' });
    const read = P.readout(), readQ = Q.readout();
    const bar = MA.ui.bar(stage);
    const ctl = {};
    sl.specs.forEach((s) => {
      ctl[s.name] = MA.ui.slider(bar, { label: s.name, min: s.min, max: s.max, step: s.step, value: s.value, onInput: (v) => { scope[s.name] = v; draw(); if (B) { if (s === bif) B.mark(); else B.render(); } } });
    });
    MA.ui.slider(bar, { label: MA.t('steps'), min: 1, max: Math.max(steps, 200), step: 1, value: steps, fmt: String, onInput: (v) => { steps = v; Q.setView([-0.5, steps + 0.5], yv); draw(); } });
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let handle = null;

    function orbit() {
      const xs = [x0];
      for (let i = 0; i < steps; i++) {
        const v = g(xs[i]);
        xs.push(v);
        if (!fin(v) || Math.abs(v) > 1e9) break;
      }
      return xs;
    }
    /** Long-run behaviour: fixed point, k-cycle, chaos or divergence. */
    function attractor() {
      let x = x0;
      for (let i = 0; i < 3000; i++) { x = g(x); if (!fin(x) || Math.abs(x) > 1e12) return { diverge: true }; }
      const tail = [x];
      for (let i = 0; i < 160; i++) { x = g(x); tail.push(x); }
      const tol = 1e-7 * Math.max(vx, 1e-12);
      for (let p = 1; p <= 64; p++) {
        let ok = true;
        for (let i = 0; i + p < tail.length; i++) if (Math.abs(tail[i + p] - tail[i]) > tol) { ok = false; break; }
        if (ok) return { period: p, pts: tail.slice(0, p).sort((u, w) => u - w) };
      }
      return { period: 0 };
    }
    function draw() {
      P.clear(); Q.clear();
      const big = 10 * (vx + vy);
      P.line(xv[0] - big, xv[0] - big, xv[1] + big, xv[1] + big, { color: 'var(--ink-3)', width: 1.3 });
      graph(P, g, { color: 'var(--series-1)', width: 2.2 });
      // fixed points and their stability
      const fps = MA.num.roots((x) => g(x) - x, xr[0], xr[1], 800).map((x) => {
        for (let i = 0; i < 3; i++) { const d = dG(scope, x), xn = x - (d[0] - x) / (d[1] - 1); if (fin(xn) && Math.abs(xn - x) < 1e-6 * vx) x = xn; }
        if (Math.abs(x) < 1e-12 * vx) x = 0;
        return { x, d: dG(scope, x)[1] };
      });
      const xs = orbit();
      const base = yv[0] <= 0 && yv[1] >= 0 ? 0 : yr[0];
      const n = xs.length - 1;
      const corners = [[xs[0], base]];
      for (let i = 0; i < n; i++) { corners.push([xs[i], xs[i + 1]]); corners.push([xs[i + 1], xs[i + 1]]); }
      for (let i = 0; i + 1 < corners.length; i++) {
        const age = (corners.length - 2 - i) / Math.max(1, corners.length - 2);
        P.line(corners[i][0], corners[i][1], corners[i + 1][0], corners[i + 1][1], { color: 'var(--series-2)', width: 1.6, opacity: 1 - 0.6 * Math.pow(age, 0.7) });
      }
      if (n >= 0 && fin(xs[n])) P.dot(xs[n], xs[n], { r: 3.6, color: 'var(--series-2)' });
      fps.forEach((p) => {
        const stable = Math.abs(p.d) < 1;
        P.dot(p.x, p.x, { r: 5, hollow: !stable, color: stable ? 'var(--good)' : 'var(--bad)' });
        Q.hline(p.x, { color: stable ? 'var(--good)' : 'var(--bad)', width: 1, dash: '4 4' });
      });
      if (!handle) handle = P.handle(x0, base, { label: MA.t('Starting value x₀'), constrain: (x) => [clamp(x, xr[0], xr[1]), base], onDrag: (x) => { x0 = x; draw(); } });
      handle.set(x0, base);
      // orbit against n
      const pts = xs.map((v, i) => [i, v]);
      Q.path(pts, { color: 'var(--series-2)', width: 1.3, opacity: 0.7 });
      const r = steps > 120 ? 1.8 : steps > 60 ? 2.4 : 3;
      pts.forEach((p) => { if (fin(p[1])) Q.dot(p[0], p[1], { r, color: 'var(--series-2)' }); });
      // read-outs
      const parts = [MA.ui.kv('x_0 =', nf(x0, 4), true), MA.ui.kv('x_{' + n + '} =', nf(xs[n], 6), true)];
      fps.slice(0, 4).forEach((p) => parts.push(el('span', null, MA.texEl('x^* = ' + texNum(p.x, 4) + ',\\ g\'(x^*) = ' + texNum(p.d, 3)), ' ',
        el('span', { class: Math.abs(p.d) < 1 ? 'w-calc-good' : 'w-calc-bad', text: Math.abs(p.d) < 1 ? MA.t('stable') : MA.t('unstable') }))));
      if (!fps.length) parts.push(el('span', { class: 'w-calc-note', text: MA.t('No fixed point in this window.') }));
      info.set(...parts);
      const at = attractor();
      if (at.diverge) info2.set(el('span', { class: 'w-calc-bad', text: MA.t('The orbit runs off to infinity.') }));
      else if (at.period === 1) info2.set(MA.t('Long run: the orbit converges to the fixed point %s.', nf(at.pts[0], 6)));
      else if (at.period > 1) info2.set(MA.t('Long run: the orbit settles on a cycle of period %d:', at.period), ' ' + at.pts.slice(0, 8).map((v) => nf(v, 4)).join(', ') + (at.period > 8 ? ', …' : ''));
      else info2.set(MA.t('Long run: no cycle of period ≤ 64 — chaotic (or very slowly converging).'));
      if (B) B.mark();
    }
    P.onHover((x) => read(x === null ? null : 'x = ' + nf(x, 4) + '   g(x) = ' + nf(g(x), 5)));
    Q.onHover((x) => {
      if (x === null) { readQ(null); return; }
      const xs = orbit(), i = clamp(Math.round(x), 0, xs.length - 1);
      readQ('n = ' + i + '   x = ' + nf(xs[i], 6));
    });

    // ---- bifurcation diagram over the range of one slider (canvas, rendered in slices)
    let B = null;
    if (bif) {
      const BW = 640, BH = 260;
      const box = el('div', { class: 'w-plot w-calc-bif' });
      const cv = el('canvas', { width: BW * 2, height: BH * 2, role: 'img', 'aria-label': MA.t('Bifurcation diagram') });
      box.append(el('div', { class: 'w-calc-cap', style: 'position:absolute;left:0;top:0;z-index:1;pointer-events:none', text: MA.t('Bifurcation diagram: long-run values of x for each %s', bif.name) }), cv);
      stage.insertBefore(box, bar);
      const BP = new MA.Plot(box, { x: [bif.min, bif.max], y: yv, width: BW, height: BH, grid: false, pad: [26, 12, 24, 36], label: MA.t('Bifurcation diagram'), xLabel: bif.name });
      BP.svg.style.background = 'transparent';
      const readB = BP.readout();
      const CW = cv.width, CH = cv.height, sx = CW / BW, sy = CH / BH;
      const ctx = cv.getContext('2d');
      let counts = new Uint16Array(CW * CH), job = 0, img = null;
      const ink = () => {
        const c = MA.cssVar('--ink') || '#000';
        let m = /^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i.exec(c);
        if (m) return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
        m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c);
        return m ? [+m[1], +m[2], +m[3]] : [128, 128, 128];
      };
      let rgb = ink();
      const paint = (c0, c1) => {
        if (!img) img = ctx.createImageData(CW, CH);
        const d = img.data;
        for (let y = 0; y < CH; y++) for (let x = c0; x < c1; x++) {
          const n = counts[y * CW + x], o = 4 * (y * CW + x);
          d[o] = rgb[0]; d[o + 1] = rgb[1]; d[o + 2] = rgb[2];
          d[o + 3] = n ? Math.min(255, 60 + 195 * (1 - Math.exp(-n / 5))) : 0;
        }
        ctx.putImageData(img, 0, 0, c0, 0, c1 - c0, CH);
      };
      const render = () => {
        if (job) cancelAnimationFrame(job);
        counts = new Uint16Array(CW * CH);
        img = null;
        ctx.clearRect(0, 0, CW, CH);
        const L = Math.ceil(BP.pl * sx), R = Math.floor((BW - BP.pr) * sx), T = BP.pt * sy, Bt = (BH - BP.pb) * sy;
        const s2 = Object.assign({}, scope);
        let col = L;
        const slice = () => {
          const t0 = performance.now();
          const c0 = col;
          while (col < R && performance.now() - t0 < 14) {
            s2[bif.name] = BP.inv((col + 0.5) / sx, 0)[0];
            let x = x0;
            for (let i = 0; i < 400 && fin(x); i++) { s2.x = x; try { x = eg.f(s2); } catch (e) { x = NaN; } if (Math.abs(x) > 1e9) x = NaN; }
            for (let i = 0; i < 300 && fin(x); i++) {
              s2.x = x;
              try { x = eg.f(s2); } catch (e) { x = NaN; }
              const py = BP.Y(x) * sy;
              if (py >= T && py < Bt) { const idx = (py | 0) * CW + col; if (counts[idx] < 65535) counts[idx]++; }
            }
            col++;
          }
          paint(c0, col);
          job = col < R ? requestAnimationFrame(slice) : 0;
        };
        job = requestAnimationFrame(slice);
      };
      const mark = () => {
        BP.clear();
        BP.vline(scope[bif.name], { color: 'var(--accent)', width: 1.6, dash: false });
        BP.text(scope[bif.name], BP.y1, bif.name + ' = ' + nf(scope[bif.name], 4), { anchor: scope[bif.name] > (bif.min + bif.max) / 2 ? 'end' : 'start', dx: scope[bif.name] > (bif.min + bif.max) / 2 ? -6 : 6, dy: 12, color: 'var(--accent)' });
      };
      const setP = (v) => {
        if (!fin(v)) return;
        v = clamp(Math.round((v - bif.min) / bif.step) * bif.step + bif.min, bif.min, bif.max);
        v = +v.toPrecision(12);
        scope[bif.name] = v;
        ctl[bif.name].set(v);
        draw();
      };
      let dragging = false;
      BP.svg.addEventListener('pointerdown', (e) => { dragging = true; try { BP.svg.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ } setP(BP.eventXY(e)[0]); });
      BP.svg.addEventListener('pointermove', (e) => { const [p] = BP.eventXY(e); if (dragging) setP(p); readB(fin(p) ? bif.name + ' = ' + nf(p, 4) : null); });
      const end = () => { dragging = false; };
      BP.svg.addEventListener('pointerup', end);
      BP.svg.addEventListener('pointercancel', end);
      BP.svg.addEventListener('pointerleave', () => readB(null));
      window.addEventListener('ma:theme', () => { rgb = ink(); if (img) paint(0, CW); });
      B = { render, mark };
      render();
    }
    draw();
  });

  // ------------------------------------------------------------------ unitcircle
  const SIN12 = ['0', '\\tfrac{\\sqrt6-\\sqrt2}{4}', '\\tfrac12', '\\tfrac{\\sqrt2}{2}', '\\tfrac{\\sqrt3}{2}', '\\tfrac{\\sqrt6+\\sqrt2}{4}', '1'];
  const TAN12 = ['0', '2-\\sqrt3', '\\tfrac{\\sqrt3}{3}', '1', '\\sqrt3', '2+\\sqrt3', null, '-2-\\sqrt3', '-\\sqrt3', '-1', '-\\tfrac{\\sqrt3}{3}', '\\sqrt3-2'];
  /** Exact sin(kπ/12) in TeX. */
  function exactSin(k) {
    k = ((k % 24) + 24) % 24;
    const neg = k > 12;
    if (neg) k -= 12;
    const v = SIN12[k > 6 ? 12 - k : k];
    return v === '0' ? '0' : (neg ? '-' : '') + v;
  }
  const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
  /** kπ/den in lowest terms as TeX. */
  function piTeX(k, den) {
    if (k === 0) return '0';
    const g = gcd(k, den), n = k / g, d = den / g;
    const num = (n === 1 ? '' : n) + '\\pi';
    return d === 1 ? num : '\\tfrac{' + num + '}{' + d + '}';
  }

  MA.widget('unitcircle', (stage, cfg) => {
    css();
    let th = C.num(cfg.angle, Math.PI / 6);
    th = ((th % TAU) + TAU) % TAU;
    let show = C.str(cfg.show, 'all');
    if (!['sin', 'cos', 'tan', 'all'].includes(show)) throw new Error(MA.t('show must be sin, cos, tan or all'));
    const cx = -1.75;                  // centre of the circle; the graphs start at x = 0 with the same unit length
    const has = (s) => show === s || show === 'all';
    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    const holder = el('div');
    stage.append(legBox, holder);
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    let P = null, handle = null, read = null;
    function build() {
      const ym = has('tan') ? 2.5 : 1.3;
      const xr = [cx - 1.3, TAU + 0.42], yr = [-ym, ym];
      const H = Math.round((640 - 24) * (2 * ym) / (xr[1] - xr[0]) + 20);
      P = new MA.Plot(null, { x: xr, y: yr, equal: true, grid: false, axes: false, ticks: false, height: H, pad: [10, 12, 10, 12],
        label: MA.t('Unit circle and the graphs of sine, cosine and tangent') });
      holder.replaceChildren(P.wrap);
      read = P.readout();
      handle = P.handle(cx + Math.cos(th), Math.sin(th), { label: MA.t('Point on the unit circle'), onDrag: (x, y) => setAngle(Math.atan2(y, x - cx), 1.5) });
      keyParam(handle, (d) => setAngle(th + d * Math.PI / 180, 0));
      P.onHover((x, y) => {
        if (x === null || x < -0.05) { read(null); return; }
        read('x = ' + nf(x, 3) + (has('sin') ? '   sin x = ' + nf(Math.sin(x), 3) : '') + (has('cos') ? '   cos x = ' + nf(Math.cos(x), 3) : '') + (has('tan') ? '   tan x = ' + nf(Math.tan(x), 3) : ''));
      });
      const items = [];
      if (has('sin')) items.push({ label: '\\sin\\theta', color: 'var(--series-2)' });
      if (has('cos')) items.push({ label: '\\cos\\theta', color: 'var(--series-1)' });
      if (has('tan')) items.push({ label: '\\tan\\theta', color: 'var(--series-3)' });
      items.push({ label: MA.t('arc of length θ'), color: 'var(--accent)' });
      legBox.replaceChildren();
      MA.ui.legend(legBox, items);
    }
    /** Set θ (mod 2π, 2π allowed at the end); snap to multiples of 15° within `snapDeg` degrees. */
    function setAngle(v, snapDeg) {
      if (!fin(v)) return;
      if (v !== TAU) v = ((v % TAU) + TAU) % TAU;
      const k = Math.round(v / (Math.PI / 12));
      if (Math.abs(v - k * Math.PI / 12) < Math.max(1e-9, (snapDeg || 0) * Math.PI / 180)) v = k * Math.PI / 12;
      th = v;
      aS.set(th * 180 / Math.PI);
      draw();
    }
    const aS = MA.ui.slider(bar, { label: '\\theta', tex: true, min: 0, max: 360, step: 1, value: th * 180 / Math.PI, fmt: (v) => Math.round(v) + '°', onInput: (v) => setAngle(v * Math.PI / 180, 0) });
    playButton(bar, (d) => { th = Math.min(TAU, th + d * TAU / 9); aS.set(th * 180 / Math.PI); draw(); return th < TAU; }, () => { if (th >= TAU - 1e-9) th = 0; });
    MA.ui.seg(bar, { options: [['all', MA.t('all')], ['sin', 'sin'], ['cos', 'cos'], ['tan', 'tan']], value: show, onChange: (v) => { show = v; build(); draw(); } });

    function draw() {
      P.clear();
      const c = Math.cos(th), s = Math.sin(th), t = s / c, ym = P.y1;
      const axis = { color: 'var(--axis)', width: 1.2 };
      // axes of the circle and of the graphs
      P.line(cx - 1.25, 0, cx + 1.25, 0, axis);
      P.line(cx, -1.25, cx, 1.25, axis);
      P.line(0, 0, TAU + 0.3, 0, axis);
      P.line(0, -ym, 0, ym, axis);
      [-1, 1].forEach((v) => {
        P.line(0, v, TAU, v, { color: 'var(--grid)', width: 1 });
        P.text(0, v, v > 0 ? '1' : '−1', { anchor: 'end', dx: -5, dy: 4, color: 'var(--ink-3)', size: 11 });
      });
      ['π/2', 'π', '3π/2', '2π'].forEach((lbl, i) => {
        const x = (i + 1) * Math.PI / 2;
        P.line(x, -0.06, x, 0.06, axis);
        P.text(x, 0, lbl, { anchor: 'middle', dy: 17, color: 'var(--ink-3)', size: 11 });
      });
      P.circle(cx, 0, 1, { color: 'var(--ink-2)', width: 1.5 });
      // the angle as an arc of the circle and as the same length on the θ-axis
      const arc = [];
      for (let i = 0; i <= 90; i++) { const u = th * i / 90; arc.push([cx + Math.cos(u), Math.sin(u)]); }
      P.path(arc, { color: 'var(--accent)', width: 4, opacity: 0.55 });
      P.line(0, 0, th, 0, { color: 'var(--accent)', width: 4, opacity: 0.55 });
      const wedge = [];
      for (let i = 0; i <= 40; i++) { const u = th * i / 40; wedge.push([cx + 0.28 * Math.cos(u), 0.28 * Math.sin(u)]); }
      P.path(wedge, { color: 'var(--ink-2)', width: 1.2 });
      if (th > 0.3) P.text(cx + 0.45 * Math.cos(th / 2), 0.45 * Math.sin(th / 2), 'θ', { anchor: 'middle', dy: 4, color: 'var(--ink-2)' });
      // the graphs
      if (has('cos')) P.fn(Math.cos, { domain: [0, TAU], color: 'var(--series-1)', width: 2 });
      if (has('sin')) P.fn(Math.sin, { domain: [0, TAU], color: 'var(--series-2)', width: 2 });
      if (has('tan')) {
        [Math.PI / 2, 1.5 * Math.PI].forEach((x) => P.line(x, -ym, x, ym, { color: 'var(--ink-3)', width: 1, dash: '3 4' }));
        P.fn(Math.tan, { domain: [0, TAU], color: 'var(--series-3)', width: 2 });
        P.line(cx + 1, -ym, cx + 1, ym, { color: 'var(--ink-3)', width: 1, dash: '3 4' });
      }
      // radius and the three segments on the circle
      P.line(cx, 0, cx + c, s, { color: 'var(--ink)', width: 1.8 });
      const tanOk = has('tan') && Math.abs(c) > 1e-9 && Math.abs(t) < ym;
      if (tanOk) {
        P.line(cx + c, s, cx + 1, t, { color: 'var(--series-3)', width: 1.2, dash: '4 3' });
        P.line(cx + 1, 0, cx + 1, t, { color: 'var(--series-3)', width: 3.4 });
      }
      if (has('cos')) P.line(cx, 0, cx + c, 0, { color: 'var(--series-1)', width: 3.4 });
      if (has('sin')) P.line(cx + c, 0, cx + c, s, { color: 'var(--series-2)', width: 3.4 });
      // the current angle on the graphs, linked to the circle by horizontal lines
      P.line(th, -ym, th, ym, { color: 'var(--ink-3)', width: 1, dash: '3 3' });
      if (has('sin')) { P.line(cx + c, s, th, s, { color: 'var(--series-2)', width: 1.1, dash: '4 3', opacity: 0.8 }); P.dot(th, s, { color: 'var(--series-2)' }); }
      if (has('cos')) P.dot(th, c, { color: 'var(--series-1)' });
      if (tanOk) { P.line(cx + 1, t, th, t, { color: 'var(--series-3)', width: 1.1, dash: '4 3', opacity: 0.8 }); P.dot(th, t, { color: 'var(--series-3)' }); }
      handle.set(cx + c, s);
      // values, exact for multiples of 15°
      const k = Math.round(th / (Math.PI / 12)), exact = Math.abs(th - k * Math.PI / 12) < 1e-9;
      const approx = (tex, v) => (/sqrt/.test(tex) ? tex + ' \\approx ' + texNum(v, 4) : tex);
      const deg = th * 180 / Math.PI;
      const parts = [{ tex: '\\theta = ' + (exact ? piTeX(k, 12) + (k ? '\\approx ' + texNum(th, 4) : '') : texNum(th, 4)) + '\\ (' + nf(deg, 4) + '^\\circ)' }];
      if (has('sin')) parts.push({ tex: '\\sin\\theta ' + (exact ? '= ' + approx(exactSin(k), s) : '\\approx ' + texNum(s, 4)) });
      if (has('cos')) parts.push({ tex: '\\cos\\theta ' + (exact ? '= ' + approx(exactSin(k + 6), c) : '\\approx ' + texNum(c, 4)) });
      if (has('tan')) {
        const tk = TAN12[((k % 12) + 12) % 12];
        if (exact && tk === null) parts.push(el('span', null, MA.texEl('\\tan\\theta'), ' ' + MA.t('is undefined (cos θ = 0)')));
        else parts.push({ tex: '\\tan\\theta ' + (exact ? '= ' + approx(tk, t) : '\\approx ' + texNum(t, 4)) });
      }
      info.set(...parts);
    }
    build();
    draw();
  });

  // ------------------------------------------------------------------ curvature
  MA.widget('curvature', (stage, cfg) => {
    css();
    const graph = C.has(cfg.f);
    if (!graph && !(C.has(cfg.fx) && C.has(cfg.fy))) throw new Error(MA.t('Give f, or fx and fy for a parametric curve.'));
    const ef = graph ? C.expr(cfg.f, ['x']) : null;
    const ex = graph ? null : C.expr(cfg.fx, ['t']);
    const ey = graph ? null : C.expr(cfg.fy, ['t']);
    const dF = graph ? derivs(ef, 'x') : null, dX = graph ? null : derivs(ex, 't'), dY = graph ? null : derivs(ey, 't');
    const fx = graph ? null : fn1(ex, 't'), fy = graph ? null : fn1(ey, 't'), ff = graph ? fn1(ef, 'x') : null;
    const pr = graph ? C.range(cfg.x, [-3, 3]) : C.range(cfg.t, [0, TAU]);
    let u = clamp(C.num(cfg.at, 0), pr[0], pr[1]);
    const pos = (v) => (graph ? [v, ff(v)] : [fx(v), fy(v)]);
    /** point, velocity, signed curvature, unit normal and centre of curvature at parameter v */
    function geo(v) {
      let x, y, vx, vy, ax, ay;
      if (graph) { const d = dF({}, v); x = v; y = d[0]; vx = 1; vy = d[1]; ax = 0; ay = d[2]; } else {
        const a = dX({}, v), b = dY({}, v);
        x = a[0]; y = b[0]; vx = a[1]; vy = b[1]; ax = a[2]; ay = b[2];
      }
      const sp = Math.hypot(vx, vy);
      const k = (vx * ay - vy * ax) / (sp * sp * sp);
      const nx = -vy / sp, ny = vx / sp;
      return { x, y, vx, vy, ax, ay, sp, k, nx, ny, cx: x + nx / k, cy: y + ny / k };
    }
    const NS = 700;
    const ts = [], pts = [], kpts = [], cen = [];
    for (let i = 0; i <= NS; i++) {
      const v = pr[0] + (pr[1] - pr[0]) * i / NS, q = geo(v);
      ts.push(v);
      pts.push(fin(q.x) && fin(q.y) ? [q.x, q.y] : null);
      kpts.push(fin(q.k) ? [v, q.k] : null);
      cen.push(fin(q.cx) && fin(q.cy) && Math.abs(q.k) > 1e-6 ? [q.cx, q.cy] : null);
    }
    let xr = C.range(cfg.x, null), yr = C.range(cfg.y, null);
    const xs = pts.filter(Boolean).map((p) => p[0]), ys = pts.filter(Boolean).map((p) => p[1]);
    if (graph) {
      xr = xr || pr.slice();
      if (!yr) {
        yr = pad(spread(ys, 0.005) || [-1, 1], 0.12);
        const maxSpan = (470 - 34) / (640 - 48) * (xr[1] - xr[0]);
        if (yr[1] - yr[0] > maxSpan) {
          const y0 = geo(u).y, c = clamp(fin(y0) ? y0 : (yr[0] + yr[1]) / 2, yr[0] + maxSpan / 2, yr[1] - maxSpan / 2);
          yr = [c - maxSpan / 2, c + maxSpan / 2];
        }
      }
    } else {
      xr = xr || pad(spread(xs, 0.002) || [-1, 1], 0.12);
      yr = yr || pad(spread(ys, 0.002) || [-1, 1], 0.12);
    }
    const kr0 = spread(kpts.filter(Boolean).map((p) => p[1]), 0.02) || [-1, 1];
    const kr = pad([Math.min(0, kr0[0]), Math.max(0, kr0[1])], 0.12);
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: graph ? 'y = ' + texOf(ef.ast) : '(x, y) = \\left(' + texOf(ex.ast) + ',\\ ' + texOf(ey.ast) + '\\right)', color: 'var(--ink)' },
      { label: MA.t('osculating circle'), color: 'var(--series-2)' }, { label: MA.t('tangent line'), color: 'var(--ink-3)' }]);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, height: eqHeight(xr, yr), label: MA.t('Curve with its osculating circle') });
    const read = P.readout();
    stage.append(el('div', { class: 'w-calc-cap', text: graph ? MA.t('Signed curvature κ along the curve (against x)') : MA.t('Signed curvature κ along the curve (against t)') }));
    const K = new MA.Plot(stage, { x: pr, y: kr, height: 150, label: MA.t('Curvature along the curve'), xLabel: graph ? 'x' : 't' });
    const readK = K.readout();
    const bar = MA.ui.bar(stage);
    let evo = false;
    const uS = MA.ui.slider(bar, { label: graph ? 'x' : 't', tex: true, min: pr[0], max: pr[1], step: stepFor(pr[0], pr[1]), value: u, fmt: (v) => nf(v, 3), onInput: (v) => { u = v; draw(); } });
    playButton(bar, (d) => { u = Math.min(pr[1], u + d * (pr[1] - pr[0]) / 8); uS.set(u); draw(); return u < pr[1]; }, () => { if (u >= pr[1] - 1e-9) u = pr[0]; });
    MA.ui.toggle(bar, { label: MA.t('Evolute'), value: false, onChange: (v) => { evo = v; draw(); } });
    const info = MA.ui.info(stage);
    let handle = null;
    const span = Math.max(P.x1 - P.x0, P.y1 - P.y0);

    function draw() {
      P.clear(); K.clear();
      if (evo) P.path(cen, { color: 'var(--series-4)', width: 1.5, dash: '5 4' });
      P.path(pts, { color: 'var(--ink)', width: 2.2 });
      const q = geo(u);
      const ok = fin(q.x) && fin(q.y);
      const R = 1 / Math.abs(q.k);
      if (ok && q.sp > 0 && fin(q.sp)) {
        const tx = q.vx / q.sp, ty = q.vy / q.sp, L = 3 * span;
        P.line(q.x - L * tx, q.y - L * ty, q.x + L * tx, q.y + L * ty, { color: 'var(--ink-3)', width: 1.3, dash: '6 4' });
        if (fin(R) && R < 200 * span) {
          P.circle(q.cx, q.cy, R, { color: 'var(--series-2)', width: 2.2, fill: 'var(--series-2)', fillOpacity: 0.06 });
          P.line(q.x, q.y, q.cx, q.cy, { color: 'var(--series-2)', width: 1.3, dash: '4 3' });
          P.dot(q.cx, q.cy, { r: 4, color: 'var(--series-2)' });
        }
      }
      if (!handle) {
        handle = P.handle(q.x, q.y, { label: MA.t('Point on the curve'), onDrag: (x, y) => {
          u = graph ? clamp(x, pr[0], pr[1]) : nearestParam(P, pts, ts, x, y, u, pos);
          uS.set(u); draw();
        } });
        keyParam(handle, (d) => { u = clamp(u + d * (pr[1] - pr[0]) / 200, pr[0], pr[1]); uS.set(u); draw(); });
      }
      handle.el.style.display = ok ? '' : 'none';
      if (ok) handle.set(q.x, q.y);
      // curvature along the curve
      K.path(kpts, { color: 'var(--series-2)', width: 2 });
      K.vline(u, { color: 'var(--accent)', width: 1.2, dash: '3 3' });
      if (fin(q.k)) K.dot(u, clamp(q.k, K.y0, K.y1), { r: 4, color: 'var(--accent)' });
      const parts = [];
      parts.push(MA.ui.kv('\\kappa =', nf(q.k, 4), true));
      parts.push(MA.ui.kv(MA.t('radius') + ' 1/|κ|', fin(R) && R < 1e12 ? nf(R, 4) : '∞'));
      if (fin(R) && R < 1e12) parts.push(MA.ui.kv(MA.t('centre'), '(' + nf(q.cx, 4) + ', ' + nf(q.cy, 4) + ')'));
      else parts.push(el('span', { class: 'w-calc-note', text: MA.t('κ = 0: the osculating circle degenerates into the tangent line.') }));
      if (graph) parts.push(MA.ui.kv("f'(x) =", nf(q.vy, 4), true), MA.ui.kv("f''(x) =", nf(q.ay, 4), true));
      else parts.push(MA.ui.kv(MA.t('speed'), nf(q.sp, 4)));
      info.set(...parts);
    }
    const formula = MA.ui.info(stage);
    formula.set(graph ? { tex: "\\kappa = \\dfrac{f''(x)}{\\bigl(1+f'(x)^2\\bigr)^{3/2}}" } : { tex: "\\kappa = \\dfrac{x'y''-y'x''}{\\bigl(x'^2+y'^2\\bigr)^{3/2}}" },
      el('span', { class: 'w-calc-note', text: MA.t('κ > 0: the curve turns left (counter-clockwise); the circle has radius 1/|κ| and touches the curve to second order.') }));
    P.onHover((x, y) => read(x === null ? null : 'x = ' + nf(x, 3) + '   y = ' + nf(y, 3)));
    K.onHover((x) => { if (x === null) { readK(null); return; } const q = geo(clamp(x, pr[0], pr[1])); readK((graph ? 'x' : 't') + ' = ' + nf(x, 3) + '   κ = ' + nf(q.k, 4)); });
    K.onClick((x) => { if (!fin(x)) return; u = clamp(x, pr[0], pr[1]); uS.set(u); draw(); });
    draw();
  });
})();
