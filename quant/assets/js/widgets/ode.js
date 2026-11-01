/* Maths Atlas — interactive figures: ordinary differential equations.
     slopefield  direction field of y' = f(x, y); click for solution curves (Euler / RK4 with step h)
     phaseplane  phase portraits: field, nullclines, equilibria (Newton + Jacobian), trajectories;
                 linear systems x' = Ax with eigenvalues, eigenvectors and the trace–determinant plane
     odesolver   Euler, Heun, RK4 … against the exact solution; global error against h (orders 1, 2, 4)
     oscillator  m x'' + c x' + k x = F₀ cos ωt: animated spring, x(t), damping regime, resonance curve
   See tools/WIDGET_GUIDE.md. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  // ================================================================== shared helpers
  (function injectStyle() {
    if (document.getElementById('w-ode-style')) return;
    const s = document.createElement('style');
    s.id = 'w-ode-style';
    s.textContent = [
      '.w-ode-field{fill:none;stroke:var(--ink-3);stroke-width:1.25;stroke-linecap:round}',
      '.w-ode-fhead{fill:var(--ink-3);stroke:none}',
      '.w-ode-hint{color:var(--ink-3);font-size:.8125rem}',
      '.w-ode-split{display:grid;grid-template-columns:minmax(0,1.2fr) minmax(0,1fr);border-top:1px solid var(--rule)}',
      '.w-ode-split>.w-ode-col{min-width:0}',
      '.w-ode-split>.w-ode-col+.w-ode-col{border-left:1px solid var(--rule)}',
      '.w-ode-split .w-controls{border-top:0}',
      '.w-ode-split .w-controls.w-ode-bar2{padding-top:0}',
      '.w-ode-split .w-ctl.slider{flex:1 1 170px}',
      '@media (max-width:640px){.w-ode-split{grid-template-columns:minmax(0,1fr)}.w-ode-split>.w-ode-col+.w-ode-col{border-left:0;border-top:1px solid var(--rule)}}',
      '.w-ode-table{padding:6px 16px 10px;border-top:1px solid var(--rule);overflow-x:auto}',
      '.w-ode-table .w-table td:first-child,.w-ode-table .w-table th:first-child{text-align:left;font-family:var(--font)}',
      '.w-ode-sw{display:inline-block;width:14px;height:3px;border-radius:2px;background:var(--c);vertical-align:middle;margin-right:7px}',
      '.w-ode-eq{display:inline-flex;align-items:baseline;gap:6px}',
      '.w-ode-eq i{font-style:normal;color:var(--ink);font-size:.95em}',
      '.w-ode-mass{fill:var(--series-1);stroke:var(--ink);stroke-width:1.2}',
      '.w-ode-spring{fill:none;stroke:var(--ink-2);stroke-width:1.7;stroke-linejoin:round;stroke-linecap:round}',
      '.w-ode-ceil{fill:var(--ink-3);opacity:.4}',
      '.w-ode-big{font-weight:650;color:var(--ink)}',
      '.w-ode-warn{color:var(--bad);font-size:.8125rem}',
    ].join('\n');
    document.head.append(s);
  })();

  function sliderSetup(cfg) {
    const specs = C.sliders(cfg.sliders);
    const values = {};
    specs.forEach((s) => { values[s.name] = s.value; });
    return { specs, values, names: specs.map((s) => s.name) };
  }
  /** Wrap an event handler so that nothing escapes it (errors are logged, optionally reported). */
  function safe(fn, report) {
    return function () {
      try { return fn.apply(this, arguments); } catch (e) {
        console.error(e);
        if (report) { try { report(e); } catch (e2) { /* ignore */ } }
        return undefined;
      }
    };
  }
  /** Coalesce bursts of input events into one redraw per animation frame. */
  function perFrame(fn) {
    let queued = false;
    return () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; fn(); });
    };
  }
  /** Fill a legend box (same markup as MA.ui.legend, but can be refreshed). */
  function setLegend(box, items) {
    box.replaceChildren();
    items.forEach((it) => {
      const k = el('span', { class: 'k' }, el('span', { class: it.swatch ? 'sw' : 'ln', style: '--c:' + it.color + (it.dash ? ';background:repeating-linear-gradient(90deg,var(--c) 0 4px,transparent 4px 7px)' : '') }));
      k.append(/[\\^_{}]/.test(it.label) ? MA.texEl(it.label) : el('span', { text: it.label }));
      box.append(k);
    });
  }
  /** View-box width: narrower on phones so that labels stay legible. */
  const vbW = (stage) => ((stage.clientWidth || 640) < 520 ? 480 : 640);
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  /** Constrain function keeping a handle inside the plot window. */
  const inView = (P) => (x, y) => [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)];
  /** Remove a draggable handle from a plot. */
  function dropHandle(P, h) {
    if (!h) return;
    h.el.remove();
    const i = (P.handles || []).indexOf(h);
    if (i >= 0) P.handles.splice(i, 1);
  }
  /** "x,y; x,y" with a readable error. */
  function pointsOf(v, what) {
    const pts = C.points(v);
    pts.forEach((p) => { if (p.length < 2) throw new Error(MA.t('%s must look like "x,y; x,y"', what || 'points')); });
    return pts;
  }
  /** SVG path data of a filled arrowhead with its tip at (px, py) pointing along angle a (view-box units). */
  function headPath(px, py, a, len, wid) {
    len = len || 8; wid = wid || 3.6;
    const c = Math.cos(a), s = Math.sin(a), bx = px - len * c, by = py - len * s;
    return 'M' + px.toFixed(1) + ',' + py.toFixed(1) + 'L' + (bx - wid * s).toFixed(1) + ',' + (by + wid * c).toFixed(1) +
      'L' + (bx + wid * s).toFixed(1) + ',' + (by - wid * c).toFixed(1) + 'Z';
  }
  /** Number for TeX (ASCII minus, powers of ten). */
  function texNum(v, sig) {
    const s = MA.fmt(v, sig || 4);
    if (s === '∞') return '\\infty';
    if (s === '−∞') return '-\\infty';
    if (s === '–') return '\\text{–}';
    const t = s.replace(/−/g, '-');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(t);
    return m ? m[1] + '\\times 10^{' + (+m[2]) + '}' : t;
  }
  /** a ± bi as TeX. */
  function texComplexPair(re, im, sig) {
    return (Math.abs(re) < 1e-12 ? '' : texNum(re, sig) + ' ') + '\\pm ' + texNum(Math.abs(im), sig) + 'i';
  }
  /** Pause an animation while its figure is scrolled out of view; resume when it returns. */
  function pauseOffscreen(stage, anim, onPause) {
    if (!('IntersectionObserver' in window)) return;
    let resume = false;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting && anim.running) { resume = true; anim.stop(); if (onPause) onPause(true); }
      else if (en.isIntersecting && resume) { resume = false; anim.play(); if (onPause) onPause(false); }
    }));
    io.observe(stage);
  }

  /**
   * Zero set of fn on the plot window by marching squares: segments as [p, q, null, …] for MA.Plot.path.
   * Sign changes caused by poles (|fn| grows at the crossing) are discarded.
   */
  function zeroSet(P, fn, nx, ny) {
    const X0 = P.x0, Y0 = P.y0, dx = (P.x1 - P.x0) / nx, dy = (P.y1 - P.y0) / ny, w = nx + 1;
    const V = new Float64Array((nx + 1) * (ny + 1));
    for (let j = 0; j <= ny; j++) {
      for (let i = 0; i <= nx; i++) {
        let v;
        try { v = fn(X0 + i * dx, Y0 + j * dy); } catch (e) { v = NaN; }
        V[j * w + i] = v;
      }
    }
    const out = [];
    const lerp = (x1, y1, v1, x2, y2, v2) => { const t = v1 / (v1 - v2); return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]; };
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const a = V[j * w + i], b = V[j * w + i + 1], c = V[(j + 1) * w + i + 1], d = V[(j + 1) * w + i];
        if (!(Number.isFinite(a) && Number.isFinite(b) && Number.isFinite(c) && Number.isFinite(d))) continue;
        const sa = a > 0, sb = b > 0, sc = c > 0, sd = d > 0;
        if (sa === sb && sb === sc && sc === sd) continue;
        const x = X0 + i * dx, y = Y0 + j * dy;
        const E = {};
        let n = 0;
        if (sa !== sb) { E.B = lerp(x, y, a, x + dx, y, b); n++; }
        if (sb !== sc) { E.R = lerp(x + dx, y, b, x + dx, y + dy, c); n++; }
        if (sd !== sc) { E.T = lerp(x, y + dy, d, x + dx, y + dy, c); n++; }
        if (sa !== sd) { E.L = lerp(x, y, a, x, y + dy, d); n++; }
        const big = Math.max(Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d));
        const seg = (p, q) => {
          let m;
          try { m = fn((p[0] + q[0]) / 2, (p[1] + q[1]) / 2); } catch (e) { m = NaN; }
          if (Number.isFinite(m) && Math.abs(m) <= big) out.push(p, q, null);
        };
        if (n === 2) { const k = Object.keys(E); seg(E[k[0]], E[k[1]]); }
        else if (n === 4) {
          const ctr = (a + b + c + d) / 4 > 0;
          if (ctr === sa) { seg(E.B, E.R); seg(E.T, E.L); } else { seg(E.B, E.L); seg(E.T, E.R); }
        }
      }
    }
    return out;
  }

  /** Linear type of an equilibrium from its Jacobian [a, b, c, d]. */
  function classify(J, nonlinear) {
    const [a, b, c, d] = J;
    const T = a + d, D = a * d - b * c, disc = T * T - 4 * D;
    const s = Math.abs(a) + Math.abs(b) + Math.abs(c) + Math.abs(d) || 1;
    const e1 = 1e-7 * s, e2 = 1e-9 * s * s;
    const r = { T, D, disc };
    if (disc >= 0) { const q = Math.sqrt(disc); r.ev = [[(T + q) / 2, 0], [(T - q) / 2, 0]]; }
    else { const q = Math.sqrt(-disc) / 2; r.ev = [[T / 2, q], [T / 2, -q]]; }
    const st = T < 0 ? MA.t('stable') : MA.t('unstable');
    if (Math.abs(D) <= e2) { r.kind = 'zero'; r.stab = 0; r.name = nonlinear ? MA.t('non-hyperbolic (det J = 0)') : MA.t('non-isolated equilibria (det A = 0)'); }
    else if (D < 0) { r.kind = 'saddle'; r.stab = 1; r.name = MA.t('saddle'); }
    else if (Math.abs(disc) <= e2 * 10) {
      r.stab = T < 0 ? -1 : 1;
      r.kind = Math.abs(b) + Math.abs(c) <= e1 ? 'star' : 'degenerate';
      r.name = r.kind === 'star' ? MA.t('%s star node', st) : MA.t('%s degenerate node', st);
    } else if (disc > 0) { r.kind = 'node'; r.stab = T < 0 ? -1 : 1; r.name = MA.t('%s node', st); }
    else if (Math.abs(T) <= e1) { r.kind = 'centre'; r.stab = 0; r.name = nonlinear ? MA.t('centre (linearisation)') : MA.t('centre'); }
    else { r.kind = 'spiral'; r.stab = T < 0 ? -1 : 1; r.name = MA.t('%s spiral', st); }
    return r;
  }
  /** Marker for an equilibrium (stable: filled, unstable: open, saddle: diamond, centre: ring with dot). */
  function eqMarker(P, x, y, cls) {
    const px = P.X(x), py = P.Y(y), g = P.layers.top;
    if (cls.kind === 'saddle') {
      g.append(el('path', { d: `M${px},${py - 6.5}L${px + 6.5},${py}L${px},${py + 6.5}L${px - 6.5},${py}Z`, style: 'fill:var(--plot-bg);stroke:var(--ink);stroke-width:1.8' }));
    } else if (cls.kind === 'centre') {
      g.append(el('circle', { cx: px, cy: py, r: 5.5, style: 'fill:var(--plot-bg);stroke:var(--ink);stroke-width:1.8' }));
      g.append(el('circle', { cx: px, cy: py, r: 1.8, style: 'fill:var(--ink)' }));
    } else if (cls.stab < 0) {
      g.append(el('circle', { cx: px, cy: py, r: 5.5, style: 'fill:var(--ink);stroke:var(--plot-bg);stroke-width:1.5' }));
    } else if (cls.kind === 'zero') {
      g.append(el('circle', { cx: px, cy: py, r: 4.5, style: 'fill:var(--ink-3);stroke:var(--plot-bg);stroke-width:1.5' }));
    } else {
      g.append(el('circle', { cx: px, cy: py, r: 5.5, style: 'fill:var(--plot-bg);stroke:var(--ink);stroke-width:1.8' }));
    }
  }
  const GLYPH = { saddle: '◇', centre: '◉', zero: '•' };
  const glyph = (cls) => GLYPH[cls.kind] || (cls.stab < 0 ? '●' : '○');

  // ================================================================== slopefield
  MA.widget('slopefield', (stage, cfg) => {
    if (!C.has(cfg.f)) throw new Error(MA.t('slopefield needs f, the right-hand side of y′ = f(x, y)'));
    const sl = sliderSetup(cfg);
    const F = C.expr(cfg.f, ['x', 'y'].concat(sl.names));
    const scope = Object.assign({}, sl.values);
    const f = (x, y) => { scope.x = x; scope.y = y; return F.f(scope); };
    const xr = C.range(cfg.x, [-4, 4]), yr = C.range(cfg.y, [-3, 3]);
    let method = C.str(cfg.method, 'rk4').toLowerCase();
    if (!['rk4', 'euler', 'both'].includes(method)) throw new Error(MA.t('method must be rk4, euler or both'));
    let h = C.num(cfg.h, 0.1);
    if (!(h > 0)) throw new Error(MA.t('h must be positive'));
    const start = pointsOf(cfg.points);

    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const P = new MA.Plot(stage, { x: xr, y: yr, width: vbW(stage), height: 400, xLabel: 'x', yLabel: 'y', label: MA.t('Slope field with solution curves') });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const COL = { rk4: 'var(--series-1)', euler: 'var(--series-2)' };
    const NAME = { rk4: 'RK4', euler: MA.t('Euler') };
    const curves = [];
    let active = null;

    const STEP = {
      euler: (x, y, s) => y + s * f(x, y),
      rk4: (x, y, s) => {
        const k1 = f(x, y), k2 = f(x + s / 2, y + s / 2 * k1), k3 = f(x + s / 2, y + s / 2 * k2), k4 = f(x + s, y + s * k3);
        return y + s / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
      },
    };
    /** Numerical solution through (x0, y0), backwards and forwards to the edges of the window. */
    function solve(x0, y0, meth) {
      const span = P.y1 - P.y0, lo = P.y0 - 2 * span, hi = P.y1 + 2 * span;
      const run = (dir) => {
        const out = [];
        const end = dir > 0 ? P.x1 : P.x0;
        if ((end - x0) * dir <= 0) return out;
        let x = x0, y = y0;
        const nMax = Math.min(20000, Math.ceil(Math.abs(end - x0) / h) + 2);
        for (let i = 0; i < nMax; i++) {
          let s = dir * h;
          if ((x + s - end) * dir > 0) s = end - x;
          if (Math.abs(s) < 1e-12 * (P.x1 - P.x0)) break;
          let yn;
          try { yn = STEP[meth](x, y, s); } catch (e) { yn = NaN; }
          if (!Number.isFinite(yn)) break;
          x += s; y = yn;
          out.push([x, y]);
          if (y < lo || y > hi) break;
        }
        return out;
      };
      return { back: run(-1), fwd: run(1) };
    }

    function drawField() {
      P.clear('fill');
      const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
      const nx = Math.max(12, Math.round(pw / 25)), gap = pw / nx, ny = Math.max(6, Math.round(ph / gap));
      const gx = (P.x1 - P.x0) / nx, gy = (P.y1 - P.y0) / ny, half = Math.min(gap, ph / ny) * 0.36;
      let d = '';
      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const x = P.x0 + (i + 0.5) * gx, y = P.y0 + (j + 0.5) * gy;
          let m;
          try { m = f(x, y); } catch (e) { m = NaN; }
          if (Number.isNaN(m)) continue;
          let dx = P.sx, dy = -m * P.sy;
          if (!Number.isFinite(dy)) { dx = 0; dy = 1; }
          const len = Math.hypot(dx, dy);
          if (!(len > 0)) continue;
          dx *= half / len; dy *= half / len;
          const cx = P.X(x), cy = P.Y(y);
          d += 'M' + (cx - dx).toFixed(1) + ',' + (cy - dy).toFixed(1) + 'L' + (cx + dx).toFixed(1) + ',' + (cy + dy).toFixed(1);
        }
      }
      P.layers.fill.append(el('path', { d, class: 'w-ode-field' }));
    }

    function drawCurves() {
      P.clear('curves', 'marks');
      const meths = method === 'both' ? ['euler', 'rk4'] : [method];
      const dots = h * P.sx >= 12;
      curves.forEach((c) => {
        c.sol = {};
        meths.forEach((m) => {
          const s = solve(c.x, c.y, m);
          c.sol[m] = s;
          const pts = s.back.slice().reverse().concat([[c.x, c.y]], s.fwd);
          P.path(pts, { color: COL[m], width: method === 'both' && m === 'euler' ? 1.9 : 2.3 });
          if (dots) pts.forEach((p) => { if (p[1] >= P.y0 && p[1] <= P.y1) P.dot(p[0], p[1], { r: 2.7, color: COL[m] }); });
        });
      });
      showLegend();
      showInfo();
    }

    function showLegend() {
      const items = [{ label: MA.t('slope field'), color: 'var(--ink-3)' }];
      (method === 'both' ? ['rk4', 'euler'] : [method]).forEach((m) => items.push({ label: NAME[m] + ', h = ' + MA.fmt(h, 2), color: COL[m] }));
      setLegend(legend, items);
    }

    function showInfo() {
      const parts = [{ tex: "y' = " + MA.expr.toTeX(F.ast) }];
      if (method === 'both' && active && active.sol && active.sol.rk4 && active.sol.euler) {
        const a = active.sol.rk4.fwd, b = active.sol.euler.fwd;
        const n = Math.min(a.length, b.length);
        if (n > 0) parts.push(MA.ui.kv(MA.t('Euler − RK4 at x = %s', MA.fmt(a[n - 1][0], 3)), MA.fmt(b[n - 1][1] - a[n - 1][1], 3)));
      }
      parts.push(el('span', { class: 'w-ode-hint', text: curves.length ? MA.t('Click to add a solution; drag a dot to move its starting point.') : MA.t('Click anywhere to draw the solution through that point.') }));
      info.set(...parts);
    }

    function addCurve(x, y) {
      const c = { x, y };
      c.h = P.handle(x, y, { r: 5.5, label: MA.t('Starting point of a solution curve'), constrain: inView(P),
        onDrag: safe((nx, ny) => { c.x = nx; c.y = ny; active = c; drawCurves(); }) });
      curves.push(c);
      active = c;
      while (curves.length > 24) dropHandle(P, curves.shift().h);
    }
    function reset(points) {
      curves.splice(0).forEach((c) => dropHandle(P, c.h));
      active = null;
      points.forEach((p) => addCurve(p[0], p[1]));
    }

    MA.ui.seg(bar, { label: MA.t('Method'), value: method, options: [['rk4', 'RK4'], ['euler', MA.t('Euler')], ['both', MA.t('Both')]],
      onChange: safe((v) => { method = v; drawCurves(); }) });
    const hMin = Math.min(0.01, h), hMax = Math.max(1, h);
    const toPos = (v) => 1000 * Math.log(v / hMin) / Math.log(hMax / hMin);
    const fromPos = (q) => +(hMin * Math.pow(hMax / hMin, q / 1000)).toPrecision(2);
    MA.ui.slider(bar, { label: MA.t('step h'), min: 0, max: 1000, step: 1, value: toPos(h), fmt: (q) => MA.fmt(fromPos(q), 2),
      onInput: safe((q) => { h = fromPos(q); drawCurves(); }) });
    if (sl.specs.length) {
      const again = perFrame(safe(() => { drawField(); drawCurves(); }));
      MA.ui.sliders(bar, sl.specs, (v) => { Object.assign(scope, v); again(); });
    }
    MA.ui.button(bar, { label: MA.t('Clear'), onClick: safe(() => { reset([]); drawCurves(); }) });
    if (start.length) MA.ui.button(bar, { label: MA.t('Reset'), onClick: safe(() => { reset(start); drawCurves(); }) });

    P.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      let m;
      try { m = f(x, y); } catch (e) { m = NaN; }
      read('x = ' + MA.fmt(x, 3) + '   y = ' + MA.fmt(y, 3) + '   y′ = ' + MA.fmt(m, 3));
    }));
    P.onClick(safe((x, y) => {
      if (!(x >= P.x0 && x <= P.x1 && y >= P.y0 && y <= P.y1)) return;
      addCurve(x, y);
      drawCurves();
    }));

    reset(start);
    drawField();
    drawCurves();
  });

  // ================================================================== phaseplane
  MA.widget('phaseplane', (stage, cfg) => {
    const linear = C.has(cfg.matrix);
    const sl = linear ? { specs: [], values: {}, names: [] } : sliderSetup(cfg);
    const scope = Object.assign({}, sl.values);
    let A = null, F = null, G = null;
    if (linear) {
      A = C.list(cfg.matrix).map((r) => r.split(',').map((q) => C.num(q)));
      if (A.length !== 2 || A[0].length !== 2 || A[1].length !== 2) throw new Error(MA.t('matrix must be 2×2, e.g. "0, 1; -2, -3"'));
    } else {
      if (!C.has(cfg.f) || !C.has(cfg.g)) throw new Error(MA.t('phaseplane needs f and g (x′ = f, y′ = g), or a matrix'));
      F = C.expr(cfg.f, ['x', 'y'].concat(sl.names));
      G = C.expr(cfg.g, ['x', 'y'].concat(sl.names));
    }
    const field = linear
      ? (x, y) => [A[0][0] * x + A[0][1] * y, A[1][0] * x + A[1][1] * y]
      : (x, y) => { scope.x = x; scope.y = y; return [F.f(scope), G.f(scope)]; };
    const xr = C.range(cfg.x, [-3, 3]), yr = C.range(cfg.y, [-3, 3]);
    const showNull = C.bool(cfg.nullclines, true);
    const start = pointsOf(cfg.points);

    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: linear, width: vbW(stage), height: 420, xLabel: 'x', yLabel: 'y', label: MA.t('Phase portrait') });
    const read = P.readout();
    let bar, bar2, info, TD = null;
    if (linear) {
      const split = el('div', { class: 'w-ode-split' });
      const left = el('div', { class: 'w-ode-col' }), right = el('div', { class: 'w-ode-col' });
      split.append(left, right);
      stage.append(split);
      bar = MA.ui.bar(left);
      bar2 = MA.ui.bar(left);
      bar2.classList.add('w-ode-bar2');
      info = MA.ui.info(left);
      const T0 = A[0][0] + A[1][1], D0 = A[0][0] * A[1][1] - A[0][1] * A[1][0];
      const tm = Math.max(4, Math.ceil(Math.abs(T0) * 1.4));
      TD = new MA.Plot(right, { width: 300, height: 290, x: [-tm, tm], y: [-Math.max(2.5, Math.ceil(-D0 * 1.4)), Math.max(5, Math.ceil(D0 * 1.4))],
        xLabel: 'T', yLabel: 'D', pad: [12, 10, 24, 28], label: MA.t('Trace–determinant plane') });
    } else {
      bar = MA.ui.bar(stage);
      info = MA.ui.info(stage);
    }

    const orbits = [];
    let fieldScale = 1;
    let eqs = [];

    // ---- field arrows (normalised; opacity by speed tercile)
    function drawField() {
      const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
      const nx = Math.max(10, Math.round(pw / 29)), gap = pw / nx, ny = Math.max(6, Math.round(ph / gap));
      const gx = (P.x1 - P.x0) / nx, gy = (P.y1 - P.y0) / ny, L = Math.min(gap, ph / ny) * 0.62;
      const cells = [];
      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const x = P.x0 + (i + 0.5) * gx, y = P.y0 + (j + 0.5) * gy;
          let v;
          try { v = field(x, y); } catch (e) { continue; }
          const px = v[0] * P.sx, py = -v[1] * P.sy, m = Math.hypot(px, py);
          if (Number.isFinite(m)) cells.push([P.X(x), P.Y(y), px, py, m, Math.hypot(v[0], v[1])]);
        }
      }
      const mags = cells.map((c) => c[4]).sort((p, q) => p - q);
      const q1 = mags[Math.floor(mags.length / 3)] || 0, q2 = mags[Math.floor(2 * mags.length / 3)] || 0;
      const raw = cells.map((c) => c[5]).sort((p, q) => p - q);
      fieldScale = raw.length ? Math.max(1e-12, raw[Math.floor(raw.length / 2)]) : 1;
      const d = ['', '', ''], hd = ['', '', ''];
      cells.forEach(([cx, cy, px, py, m]) => {
        if (!(m > 1e-12)) return;
        const ux = px / m, uy = py / m, k = m <= q1 ? 0 : m <= q2 ? 1 : 2;
        const tx = cx + ux * L / 2, ty = cy + uy * L / 2;
        d[k] += 'M' + (cx - ux * L / 2).toFixed(1) + ',' + (cy - uy * L / 2).toFixed(1) + 'L' + (tx - ux * 3).toFixed(1) + ',' + (ty - uy * 3).toFixed(1);
        hd[k] += headPath(tx, ty, Math.atan2(uy, ux), 5.5, 2.7);
      });
      const op = [0.38, 0.62, 0.9];
      for (let k = 0; k < 3; k++) {
        P.layers.fill.append(el('path', { d: d[k], class: 'w-ode-field', style: 'opacity:' + op[k] }));
        P.layers.fill.append(el('path', { d: hd[k], class: 'w-ode-fhead', style: 'opacity:' + op[k] }));
      }
    }

    // ---- nullclines
    function drawNullclines() {
      const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
      const nx = 140, ny = Math.max(40, Math.round(nx * ph / pw));
      const fx = (x, y) => field(x, y)[0], fy = (x, y) => field(x, y)[1];
      P.path(zeroSet(P, fx, nx, ny), { color: 'var(--series-2)', width: 2, opacity: 0.85 });
      P.path(zeroSet(P, fy, nx, ny), { color: 'var(--series-3)', width: 2, opacity: 0.85 });
    }

    // ---- trajectories: RK4 in time with a step that keeps ~2.5 px of arc per step
    function orbitPoints(x0, y0, maxSteps, maxPx, stopNear) {
      const sx = P.sx, sy = P.sy, wx = P.x1 - P.x0, wy = P.y1 - P.y0;
      maxPx = maxPx || Infinity;
      // automatic trajectories stop ~12 px from an attracting (forwards) or repelling (backwards) equilibrium
      const near = (z, dir) => stopNear && eqs.some((e) => e.cls.stab === -dir && e.cls.kind !== 'saddle' && Math.hypot((z[0] - e.x) * sx, (z[1] - e.y) * sy) < 12);
      const bx0 = P.x0 - 0.3 * wx, bx1 = P.x1 + 0.3 * wx, by0 = P.y0 - 0.3 * wy, by1 = P.y1 + 0.3 * wy;
      const fz = (t, z) => field(z[0], z[1]);
      let closed = false;
      const run = (dir) => {
        const out = [];
        if (closed) return out;
        let z = [x0, y0], travelled = 0;
        for (let i = 0; i < (maxSteps || 3000); i++) {
          let v;
          try { v = field(z[0], z[1]); } catch (e) { break; }
          const sp = Math.hypot(v[0] * sx, v[1] * sy);
          if (!Number.isFinite(sp) || sp < 1e-12) break;
          const dt = dir * Math.min(0.1, 2.5 / sp);
          let zn;
          try { zn = MA.num.rk4(fz, 0, z, dt); } catch (e) { break; }
          if (!Number.isFinite(zn[0]) || !Number.isFinite(zn[1])) break;
          const stepPx = Math.hypot((zn[0] - z[0]) * sx, (zn[1] - z[1]) * sy);
          z = zn;
          out.push(z);
          travelled += stepPx;
          if (z[0] < bx0 || z[0] > bx1 || z[1] < by0 || z[1] > by1) break;
          if (i > 40 && stepPx < 0.01) break; // settled at an equilibrium
          if (travelled > maxPx || near(z, dir)) break;
          if (travelled > 60 && Math.hypot((z[0] - x0) * sx, (z[1] - y0) * sy) < 1.2) { out.push([x0, y0]); closed = true; break; } // closed orbit
        }
        return out;
      };
      const fwd = run(1), back = run(-1);
      return back.reverse().concat([[x0, y0]], fwd);
    }
    function drawOrbit(o) {
      const span = P.W - P.pl - P.pr + P.H - P.pt - P.pb;
      if (!o.pts) o.pts = orbitPoints(o.x, o.y, o.auto ? 2000 : 3000, o.sep ? 4 * span : o.auto ? 2 * span : Infinity, o.auto);
      const pts = o.pts;
      const color = o.sep ? 'var(--ink)' : 'var(--series-1)';
      P.path(pts, { color, width: o.sep ? 1.9 : o.auto ? 1.5 : 2, opacity: o.auto && !o.sep ? 0.8 : 1 });
      let acc = 0, next = o.sep ? 70 : 55, hd = '';
      const L = P.pl, R = P.W - P.pr, T = P.pt, B = P.H - P.pb;
      for (let i = 1; i < pts.length && next < 4000; i++) {
        const ax = P.X(pts[i - 1][0]), ay = P.Y(pts[i - 1][1]), bx = P.X(pts[i][0]), by = P.Y(pts[i][1]);
        const segL = Math.hypot(bx - ax, by - ay);
        if (!(segL > 0)) continue;
        while (acc + segL >= next) {
          const t = (next - acc) / segL, px = ax + t * (bx - ax), py = ay + t * (by - ay);
          if (px > L + 4 && px < R - 4 && py > T + 4 && py < B - 4) hd += headPath(px, py, Math.atan2(by - ay, bx - ax), 8, 3.6);
          next += 150;
        }
        acc += segL;
      }
      if (hd) P.layers.marks.append(el('path', { d: hd, style: 'fill:' + color + ';stroke:none' + (o.auto && !o.sep ? ';opacity:.8' : '') }));
    }
    /**
     * Trajectories shown when the author gives no starting points: the separatrices of every saddle
     * (started a hair away along its eigenvectors) and a coarse grid of seeds (a ring of seeds for x' = Ax).
     */
    let autoOn = !start.length;
    let autoOrbits = [];
    function makeAuto() {
      autoOrbits = [];
      if (!autoOn) return;
      const wx = P.x1 - P.x0, wy = P.y1 - P.y0, dlt = 2e-3 * Math.max(wx, wy);
      if (!linear) {
        eqs.filter((e) => e.cls.kind === 'saddle').forEach((e) => {
          const J = e.J;
          e.cls.ev.forEach(([lam]) => {
            const r1 = Math.hypot(J[0] - lam, J[1]), r2 = Math.hypot(J[2], J[3] - lam);
            const v = r1 >= r2 ? [J[1], lam - J[0]] : [lam - J[3], J[2]];
            const n = Math.hypot(v[0], v[1]);
            if (!(n > 0)) return;
            [1, -1].forEach((sg) => autoOrbits.push({ x: e.x + sg * dlt * v[0] / n, y: e.y + sg * dlt * v[1] / n, auto: true, sep: true }));
          });
        });
        for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) autoOrbits.push({ x: P.x0 + (i + 0.5) / 4 * wx, y: P.y0 + (j + 0.5) / 3 * wy, auto: true });
      } else {
        // eight seeds on different rays and at different radii (so closed orbits do not coincide)
        const R = 0.9 * Math.min(P.x1, -P.x0, P.y1, -P.y0);
        if (R > 0) for (let k = 0; k < 8; k++) { const a = (k + 0.5) * Math.PI / 4, r = R * (0.22 + 0.78 * ((k * 3) % 8) / 7); autoOrbits.push({ x: r * Math.cos(a), y: r * Math.sin(a), auto: true }); }
      }
    }
    function addOrbit(x, y) {
      const o = { x, y };
      o.h = P.handle(x, y, { r: 5, label: MA.t('Starting point of a trajectory'), constrain: inView(P),
        onDrag: safe((nx, ny) => { o.x = nx; o.y = ny; o.pts = null; redrawOrbits(); }) });
      orbits.push(o);
      while (orbits.length > 30) dropHandle(P, orbits.shift().h);
    }
    function resetOrbits(points) {
      orbits.splice(0).forEach((o) => dropHandle(P, o.h));
      points.forEach((p) => addOrbit(p[0], p[1]));
    }

    // ---- equilibria: Newton's method on (f, g) from a grid of seeds
    function jac(x, y) {
      const hx = 1e-6 * Math.max(1, Math.abs(x)), hy = 1e-6 * Math.max(1, Math.abs(y));
      const a = field(x + hx, y), b = field(x - hx, y), c = field(x, y + hy), d = field(x, y - hy);
      return [(a[0] - b[0]) / (2 * hx), (c[0] - d[0]) / (2 * hy), (a[1] - b[1]) / (2 * hx), (c[1] - d[1]) / (2 * hy)];
    }
    function findEquilibria() {
      const wx = P.x1 - P.x0, wy = P.y1 - P.y0, tol = 1e-10 * Math.max(wx, wy);
      const out = [];
      const NX = 13, NY = 9;
      for (let i = 0; i < NX; i++) {
        for (let j = 0; j < NY; j++) {
          let x = P.x0 + (i + 0.5) / NX * wx, y = P.y0 + (j + 0.5) / NY * wy, ok = false;
          for (let it = 0; it < 60; it++) {
            const v = field(x, y);
            if (!Number.isFinite(v[0]) || !Number.isFinite(v[1])) break;
            const J = jac(x, y), det = J[0] * J[3] - J[1] * J[2];
            if (!Number.isFinite(det) || Math.abs(det) < 1e-300) break;
            let dx = (J[3] * v[0] - J[1] * v[1]) / det, dy = (-J[2] * v[0] + J[0] * v[1]) / det;
            const n = Math.hypot(dx, dy), lim = 0.25 * Math.max(wx, wy);
            if (n > lim) { dx *= lim / n; dy *= lim / n; }
            x -= dx; y -= dy;
            if (n < tol) { ok = true; break; }
          }
          if (!ok) continue;
          if (x < P.x0 - 1e-9 * wx || x > P.x1 + 1e-9 * wx || y < P.y0 - 1e-9 * wy || y > P.y1 + 1e-9 * wy) continue;
          const v = field(x, y);
          if (!(Math.hypot(v[0], v[1]) <= 1e-7 * Math.max(1, fieldScale))) continue;
          if (out.some((e) => Math.hypot((e.x - x) / wx, (e.y - y) / wy) < 1e-5)) continue;
          out.push({ x: Math.abs(x) < 1e-9 * wx ? 0 : x, y: Math.abs(y) < 1e-9 * wy ? 0 : y });
          if (out.length >= 40) return out;
        }
      }
      return out;
    }

    // ---- linear systems: eigen-data and the trace–determinant plane
    function eigvec(lam) {
      const [[a, b], [c, d]] = A;
      const r1 = Math.hypot(a - lam, b), r2 = Math.hypot(c, d - lam);
      let v = r1 >= r2 ? [b, lam - a] : [lam - d, c];
      const n = Math.hypot(v[0], v[1]);
      if (!(n > 1e-12)) return null;
      v = Math.abs(v[0]) > 1e-9 * n ? [1, v[1] / v[0]] : [0, 1];
      return v;
    }
    function drawEigenlines(cls) {
      if (cls.disc < -1e-12 || cls.kind === 'star') return [];
      const lams = cls.disc > 1e-12 ? [cls.ev[0][0], cls.ev[1][0]] : [cls.ev[0][0]];
      const R = 4 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
      const vs = [];
      lams.forEach((lam, k) => {
        const v = eigvec(lam);
        if (!v) return;
        const n = Math.hypot(v[0], v[1]);
        const zero = Math.abs(lam) <= 1e-9 * (Math.abs(cls.T) + 1);
        P.line(-R * v[0] / n, -R * v[1] / n, R * v[0] / n, R * v[1] / n, zero
          ? { color: 'var(--ink)', width: 3, opacity: 0.55, layer: 'curves' }
          : { color: 'var(--series-4)', width: 1.8, dash: '7 5', layer: 'curves' });
        // label on the line, 80% of the way from the origin to the edge of the window
        const ux = v[0] / n, uy = v[1] / n;
        const reach = Math.min(ux > 1e-12 ? P.x1 / ux : ux < -1e-12 ? P.x0 / ux : Infinity, uy > 1e-12 ? P.y1 / uy : uy < -1e-12 ? P.y0 / uy : Infinity);
        const lx = 0.8 * reach * ux, ly = 0.8 * reach * uy;
        if (Number.isFinite(lx) && lx > P.x0 && lx < P.x1 && ly > P.y0 && ly < P.y1 && !zero) P.tex(lx, ly, '\\lambda_{' + (k + 1) + '}', { dx: 6, dy: -12, size: 13, color: 'var(--series-4)', w: 40, h: 22 });
        vs.push(v);
      });
      return vs;
    }
    function drawTD(cls) {
      TD.clear();
      const tm = TD.x1, top = TD.y1, bot = TD.y0;
      const para = (a, b) => { const out = []; for (let i = 0; i <= 64; i++) { const t = a + (b - a) * i / 64; out.push([t, Math.min(t * t / 4, top + 1)]); } return out; };
      const regions = {
        saddle: [[-tm - 1, 0], [tm + 1, 0], [tm + 1, bot - 1], [-tm - 1, bot - 1]],
        sn: [[-tm - 1, 0]].concat(para(-tm - 1, 0)),
        un: para(0, tm + 1).concat([[tm + 1, 0]]),
        ss: [[0, top + 1], [-tm - 1, top + 1]].concat(para(-tm - 1, 0)),
        us: para(0, tm + 1).concat([[tm + 1, top + 1], [0, top + 1]]),
      };
      const key = cls.kind === 'saddle' ? 'saddle' : cls.kind === 'spiral' ? (cls.T < 0 ? 'ss' : 'us') : (cls.kind === 'node' || cls.kind === 'degenerate' || cls.kind === 'star') ? (cls.T < 0 ? 'sn' : 'un') : null;
      if (key) TD.poly(regions[key], { fill: 'var(--accent)', fillOpacity: 0.13 });
      TD.fn((t) => t * t / 4, { color: 'var(--ink-2)', width: 1.6, dash: '6 4' });
      TD.line(0, 0, 0, top + 1, { color: cls.kind === 'centre' ? 'var(--accent)' : 'var(--ink-2)', width: cls.kind === 'centre' ? 3.2 : 2.2, layer: 'curves' });
      const lab = (x, y, s, anchor) => TD.text(x, y, s, { anchor: anchor || 'middle', size: 12, color: 'var(--ink-2)' });
      lab(-tm * 0.5, top * 0.8, MA.t('stable spiral'));
      lab(tm * 0.5, top * 0.8, MA.t('unstable spiral'));
      const ny = Math.min(top * 0.45, (0.85 * tm) * (0.85 * tm) / 4 * 0.4);
      lab(-tm * 0.97, ny, MA.t('stable node'), 'start');
      lab(tm * 0.97, ny, MA.t('unstable node'), 'end');
      lab(0, bot * 0.5, MA.t('saddle'));
      lab(tm * 0.05, top * 0.62, MA.t('centre'), 'start');
      const px = clamp(cls.T, TD.x0, TD.x1), py = clamp(cls.D, TD.y0, TD.y1);
      TD.dot(px, py, { r: 6, color: 'var(--accent)', hollow: px !== cls.T || py !== cls.D });
    }
    function linearInfo(cls) {
      const [[a, b], [c, d]] = A;
      const parts = [{ tex: 'A = \\begin{pmatrix}' + texNum(a, 3) + ' & ' + texNum(b, 3) + '\\\\ ' + texNum(c, 3) + ' & ' + texNum(d, 3) + '\\end{pmatrix}' }];
      if (cls.disc > 1e-12) {
        parts.push({ tex: '\\lambda_1 = ' + texNum(cls.ev[0][0]) + ',\\ \\lambda_2 = ' + texNum(cls.ev[1][0]) });
        const v1 = eigvec(cls.ev[0][0]), v2 = eigvec(cls.ev[1][0]);
        if (v1 && v2) parts.push({ tex: '\\mathbf v_1 = (' + texNum(v1[0], 3) + ',\\,' + texNum(v1[1], 3) + '),\\ \\mathbf v_2 = (' + texNum(v2[0], 3) + ',\\,' + texNum(v2[1], 3) + ')' });
      } else if (cls.disc < -1e-12) {
        parts.push({ tex: '\\lambda = ' + texComplexPair(cls.ev[0][0], cls.ev[0][1]) });
      } else {
        parts.push({ tex: '\\lambda_1 = \\lambda_2 = ' + texNum(cls.T / 2) });
        const v = eigvec(cls.T / 2);
        if (cls.kind !== 'star' && v) parts.push({ tex: '\\mathbf v = (' + texNum(v[0], 3) + ',\\,' + texNum(v[1], 3) + ')' });
      }
      parts.push({ tex: 'T = ' + texNum(cls.T) + ',\\ D = ' + texNum(cls.D) + ',\\ T^2 - 4D = ' + texNum(cls.disc) });
      let name = cls.name;
      if (cls.kind === 'spiral' || cls.kind === 'centre') name += ' · ' + (c > 0 ? MA.t('anticlockwise') : MA.t('clockwise'));
      parts.push(MA.ui.kv(MA.t('Origin:'), name));
      info.set(...parts);
    }
    function nonlinearInfo() {
      const parts = [];
      if (!eqs.length) parts.push(el('span', { class: 'w-ode-hint', text: MA.t('No equilibria in this window.') }));
      eqs.slice(0, 6).forEach((e) => {
        const c = e.cls;
        const ev = c.disc < 0 ? texComplexPair(c.ev[0][0], c.ev[0][1], 3) : texNum(c.ev[0][0], 3) + ',\\ ' + texNum(c.ev[1][0], 3);
        const s = el('span', { class: 'w-ode-eq' }, el('i', { text: glyph(c) }), el('b', { text: '(' + MA.fmt(e.x, 3) + ', ' + MA.fmt(e.y, 3) + ')' }), el('span', { text: c.name }));
        s.append(MA.texEl('\\lambda = ' + ev));
        parts.push(s);
      });
      if (eqs.length > 6) parts.push(el('span', { class: 'w-ode-hint', text: MA.t('and %d more', eqs.length - 6) }));
      parts.push(el('span', { class: 'w-ode-hint', text: MA.t('Click to add a trajectory; drag its dot.') }));
      info.set(...parts);
    }

    function showLegend() {
      const items = [{ label: MA.t('trajectories'), color: 'var(--series-1)' }];
      if (autoOrbits.some((o) => o.sep)) items.push({ label: MA.t('separatrices'), color: 'var(--ink)' });
      if (showNull) items.push({ label: "{x}' = 0", color: 'var(--series-2)' }, { label: "{y}' = 0", color: 'var(--series-3)' });
      if (linear) items.push({ label: MA.t('eigenvectors'), color: 'var(--series-4)', dash: true });
      setLegend(legend, items);
    }

    function drawOrbits() {
      P.clear('curves', 'marks');
      if (showNull) drawNullclines();
      if (linear) drawEigenlines(linCls);
      autoOrbits.forEach(drawOrbit);
      orbits.forEach(drawOrbit);
    }
    function drawEqMarks() {
      P.clear('top');
      eqs.forEach((e) => eqMarker(P, e.x, e.y, e.cls));
      if (eqs.length > 6) return;
      eqs.forEach((e) => {
        const right = P.X(e.x) > P.W - P.pr - 120;
        P.text(e.x, e.y, e.cls.name, { dx: right ? -9 : 9, dy: -9, anchor: right ? 'end' : 'start', size: 11, color: 'var(--ink-2)', layer: 'top' });
      });
    }
    let linCls = null;
    function drawAll() {
      P.clear();
      if (linear) linCls = classify([A[0][0], A[0][1], A[1][0], A[1][1]], false);
      drawField();
      if (linear) eqs = linCls.kind === 'zero' ? [] : [{ x: 0, y: 0, cls: linCls }];
      else {
        eqs = findEquilibria();
        eqs.forEach((e) => { e.J = jac(e.x, e.y); e.cls = classify(e.J, true); });
      }
      orbits.forEach((o) => { o.pts = null; });
      makeAuto();
      drawOrbits();
      drawEqMarks();
      if (linear) {
        if (linCls.kind === 'zero' && !eigvec(0)) P.layers.top.append(el('text', { class: 'lbl', x: P.X((P.x0 + P.x1) / 2), y: P.pt + 18, 'text-anchor': 'middle', text: MA.t('every point is an equilibrium') }));
        drawTD(linCls);
        linearInfo(linCls);
      } else nonlinearInfo();
      showLegend();
    }
    const redrawOrbits = perFrame(safe(() => { drawOrbits(); drawEqMarks(); }));
    const redrawAll = perFrame(safe(drawAll));

    if (linear) {
      const lim = Math.max(4, Math.ceil(2 * Math.max(...A.flat().map(Math.abs))));
      const step = A.flat().every((v) => Math.abs(v * 20 - Math.round(v * 20)) < 1e-9) ? 0.05 : A.flat().every((v) => Math.abs(v * 100 - Math.round(v * 100)) < 1e-9) ? 0.01 : 'any';
      [[0, 0, 'a_{11}'], [0, 1, 'a_{12}'], [1, 0, 'a_{21}'], [1, 1, 'a_{22}']].forEach(([i, j, lab]) => {
        MA.ui.slider(bar, { label: lab, min: -lim, max: lim, step, value: A[i][j], fmt: (v) => MA.fmt(v, 3), onInput: (v) => { A[i][j] = v; redrawAll(); } });
      });
    } else if (sl.specs.length) {
      MA.ui.sliders(bar, sl.specs, (v) => { Object.assign(scope, v); redrawAll(); });
    }
    MA.ui.button(bar2 || bar, { label: MA.t('Clear'), onClick: safe(() => { resetOrbits([]); autoOn = false; makeAuto(); showLegend(); redrawOrbits(); }) });
    MA.ui.button(bar2 || bar, { label: MA.t('Reset'), onClick: safe(() => { resetOrbits(start); autoOn = !start.length; makeAuto(); showLegend(); redrawOrbits(); }) });

    P.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      const v = field(x, y);
      read('x = ' + MA.fmt(x, 3) + '   y = ' + MA.fmt(y, 3) + '   x′ = ' + MA.fmt(v[0], 3) + '   y′ = ' + MA.fmt(v[1], 3));
    }));
    P.onClick(safe((x, y) => {
      if (!(x >= P.x0 && x <= P.x1 && y >= P.y0 && y <= P.y1)) return;
      addOrbit(x, y);
      redrawOrbits();
    }));

    resetOrbits(start);
    drawAll();
  });

  // ================================================================== odesolver
  const ODE_METHODS = {
    euler: { name: 'Euler', order: 1, color: 'var(--series-2)', step: (f, t, y, h) => y + h * f(t, y) },
    heun: { name: 'Heun', order: 2, color: 'var(--series-3)', step: (f, t, y, h) => { const k1 = f(t, y), k2 = f(t + h, y + h * k1); return y + h / 2 * (k1 + k2); } },
    midpoint: { name: 'Midpoint', order: 2, color: 'var(--series-4)', step: (f, t, y, h) => y + h * f(t + h / 2, y + h / 2 * f(t, y)) },
    rk3: { name: 'RK3', order: 3, color: 'var(--ink-3)', step: (f, t, y, h) => { const k1 = f(t, y), k2 = f(t + h / 2, y + h / 2 * k1), k3 = f(t + h, y - h * k1 + 2 * h * k2); return y + h / 6 * (k1 + 4 * k2 + k3); } },
    rk4: { name: 'RK4', order: 4, color: 'var(--series-1)', step: (f, t, y, h) => { const k1 = f(t, y), k2 = f(t + h / 2, y + h / 2 * k1), k3 = f(t + h / 2, y + h / 2 * k2), k4 = f(t + h, y + h * k3); return y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4); } },
  };
  const ODE_ALIAS = { euler: 'euler', forwardeuler: 'euler', explicit: 'euler', heun: 'heun', improvedeuler: 'heun', trapezoid: 'heun', rk2: 'heun',
    midpoint: 'midpoint', modifiedeuler: 'midpoint', rk3: 'rk3', kutta: 'rk3', rk4: 'rk4', rungekutta: 'rk4', classical: 'rk4' };
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  const pow10 = (k) => (k === 0 ? '1' : k === 1 ? '10' : '10' + String(k).split('').map((ch) => SUP[ch] || ch).join(''));
  /** Decade grid and labels for a plot whose coordinates are log10 values (built with grid/axes off). */
  function logFrame(P) {
    const g = P.layers.grid;
    g.replaceChildren();
    const L = P.pl, R = P.W - P.pr, T = P.pt, B = P.H - P.pb;
    const grid = el('g', { class: 'grid' }), ax = el('g', { class: 'axis' }), tk = el('g', { class: 'tick' });
    const xs = [], ys = [];
    for (let k = Math.ceil(P.x0 - 1e-9); k <= P.x1 + 1e-9; k++) xs.push(k);
    for (let k = Math.ceil(P.y0 - 1e-9); k <= P.y1 + 1e-9; k++) ys.push(k);
    const xe = xs.length > 9 ? 2 : 1, ye = ys.length > 7 ? Math.ceil(ys.length / 7) : 1;
    xs.forEach((k) => {
      grid.append(el('line', { x1: P.X(k), x2: P.X(k), y1: T, y2: B }));
      if (k % xe === 0) tk.append(el('text', { x: P.X(k), y: B + 15, 'text-anchor': 'middle', text: pow10(k) }));
    });
    ys.forEach((k) => {
      grid.append(el('line', { x1: L, x2: R, y1: P.Y(k), y2: P.Y(k) }));
      if (k % ye === 0) tk.append(el('text', { x: L - 6, y: P.Y(k) + 4, 'text-anchor': 'end', text: pow10(k) }));
    });
    ax.append(el('line', { x1: L, x2: R, y1: B, y2: B }), el('line', { x1: L, x2: L, y1: T, y2: B }));
    if (P.o.xLabel) ax.append(el('text', { class: 'lbl', x: R - 4, y: B - 8, 'text-anchor': 'end', style: 'fill:var(--ink-2)', text: P.o.xLabel }));
    if (P.o.yLabel) ax.append(el('text', { class: 'lbl', x: L + 8, y: T + 14, style: 'fill:var(--ink-2)', text: P.o.yLabel }));
    g.append(grid, ax, tk);
  }

  MA.widget('odesolver', (stage, cfg) => {
    if (!C.has(cfg.f)) throw new Error(MA.t('odesolver needs f, the right-hand side of y′ = f(t, y)'));
    const Fx = C.expr(cfg.f, ['t', 'y']);
    const sc = {};
    const f = (t, y) => { sc.t = t; sc.y = y; return Fx.f(sc); };
    const y0 = C.num(cfg.y0, 1);
    const [t0, T] = C.range(cfg.t, [0, 2]);
    const Ex = C.has(cfg.exact) ? C.expr(cfg.exact, ['t']) : null;
    const exact = Ex ? (t) => Ex.f({ t }) : null;
    let h = C.num(cfg.h, 0.25);
    if (!(h > 0)) throw new Error(MA.t('h must be positive'));
    const L = T - t0;
    h = Math.min(h, L);
    const names = C.has(cfg.methods) ? C.list(cfg.methods) : ['euler', 'heun', 'rk4'];
    const keys = [];
    names.forEach((n) => {
      const k = ODE_ALIAS[n.toLowerCase().replace(/[\s_\-–]/g, '')];
      if (!k) throw new Error(MA.t('unknown method "%s" (use euler, heun, midpoint, rk3, rk4)', n));
      if (!keys.includes(k)) keys.push(k);
    });
    if (!keys.length) throw new Error(MA.t('methods is empty'));

    /** March from t0 to T with step h (the last step is shortened to land on T). */
    function solve(key, hh) {
      const st = ODE_METHODS[key].step;
      const n = Math.max(1, Math.ceil(L / hh - 1e-9));
      const ts = [t0], ys = [y0];
      let t = t0, y = y0;
      for (let i = 0; i < n; i++) {
        const s = i === n - 1 ? T - t : hh;
        try { y = st(f, t, y, s); } catch (e) { y = NaN; }
        t = i === n - 1 ? T : t + s;
        ts.push(t); ys.push(y);
        if (!Number.isFinite(y)) break;
      }
      return { ts, ys, n };
    }
    // reference: the exact solution, or RK4 with a very small step
    let refPts = null, yT, refNote = '', blowAt = null;
    if (exact) {
      yT = exact(T);
      const e0 = exact(t0);
      if (Number.isFinite(e0) && Math.abs(e0 - y0) > 1e-6 * Math.max(1, Math.abs(y0))) refNote = MA.t('Note: the exact solution gives y(%s) = %s, not y₀ = %s.', MA.fmt(t0), MA.fmt(e0), MA.fmt(y0));
      // a non-finite value, or a sign change between two huge neighbours, means that the solution blows up
      const N = 2000, ys = [];
      for (let i = 0; i <= N; i++) ys.push(exact(t0 + L * i / N));
      const mags = ys.filter(Number.isFinite).map(Math.abs).sort((p, q) => p - q);
      const med = mags.length ? mags[mags.length >> 1] : 0;
      for (let i = 0; i <= N && blowAt === null; i++) {
        if (!Number.isFinite(ys[i])) blowAt = t0 + L * i / N;
        else if (i && Math.sign(ys[i]) !== Math.sign(ys[i - 1]) && Math.min(Math.abs(ys[i]), Math.abs(ys[i - 1])) > 50 * med + 1e-9) blowAt = t0 + L * (i - 0.5) / N;
      }
    } else {
      const r1 = solve('rk4', L / 4096), r2 = solve('rk4', L / 2048);
      refPts = r1.ts.map((t, i) => [t, r1.ys[i]]).filter((_, i) => i % 8 === 0 || i === r1.ts.length - 1);
      yT = r1.ys[r1.ys.length - 1];
      if (!Number.isFinite(yT) || r1.ts[r1.ts.length - 1] !== T) blowAt = r1.ts[Math.max(0, r1.ts.length - 2)];
      else if (!(Math.abs(yT - r2.ys[r2.ys.length - 1]) <= 1e-9 * Math.max(1, Math.abs(yT)))) refNote = MA.t('The reference solution (RK4, 4096 steps) may be inaccurate here.');
    }
    const singular = blowAt !== null;
    if (singular) refNote = MA.t('The solution blows up near t ≈ %s, so errors at t = %s mean nothing here: shorten the interval.', MA.fmt(blowAt, 3), MA.fmt(T));

    // errors at T for h = L / 2^k
    const errs = {};
    const hs = [];
    for (let k = 0; k <= 12; k++) hs.push(L / Math.pow(2, k));
    keys.forEach((key) => {
      errs[key] = singular ? hs.map(() => NaN) : hs.map((hh) => { const s = solve(key, hh); const y = s.ys[s.ys.length - 1]; return s.ts[s.ts.length - 1] === T ? Math.abs(y - yT) : NaN; });
    });
    const floor = 1e-13 * Math.max(1, Math.abs(yT) || 1);
    /**
     * Observed order: local slopes log2(e(h) / e(h/2)) for successive halvings above the round-off floor; the
     * estimate uses the two smallest such h (the asymptotic regime), or only the last when they disagree.
     */
    function observedOrder(key) {
      const e = errs[key], sl = [];
      for (let i = 0; i + 1 < hs.length; i++) {
        if (e[i] > floor * 100 && e[i + 1] > floor * 100 && Number.isFinite(e[i]) && Number.isFinite(e[i + 1])) sl.push(Math.log2(e[i] / e[i + 1]));
      }
      if (!sl.length) return NaN;
      const a = sl[sl.length - 1], b = sl[sl.length - 2];
      return b !== undefined && Math.abs(a - b) < 0.3 ? (a + b) / 2 : a;
    }

    // ---- layout
    MA.ui.title(stage, cfg.title);
    const legendItems = [{ label: exact ? MA.t('exact solution') : MA.t('reference (RK4, tiny step)'), color: 'var(--ink)' }]
      .concat(keys.map((k) => ({ label: MA.t(ODE_METHODS[k].name), color: ODE_METHODS[k].color })));
    MA.ui.legend(stage, legendItems);
    const W = vbW(stage);
    let [lo, hi] = exact ? MA.autoRange(exact, t0, T, 800) : (() => {
      const ys = refPts.map((p) => p[1]).filter(Number.isFinite).sort((p, q) => p - q);
      if (!ys.length) return [NaN, NaN];
      return singular ? [ys[Math.floor(ys.length * 0.02)], ys[Math.ceil(ys.length * 0.9) - 1]] : [ys[0], ys[ys.length - 1]];
    })();
    if (!Number.isFinite(lo) || !Number.isFinite(hi)) throw new Error(MA.t('the solution is not finite on this interval'));
    if (!singular) {
      keys.forEach((k) => { const s = solve(k, h); s.ys.forEach((y) => { if (Number.isFinite(y) && y > lo - (hi - lo + 1) && y < hi + (hi - lo + 1)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } }); });
    }
    if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.1;
    const P = new MA.Plot(stage, { width: W, height: 300, x: [t0 - L * 0.02, T + L * 0.02], y: [lo - pad, hi + pad], xLabel: 't', yLabel: 'y', label: MA.t('Numerical solutions and the exact solution') });
    const read = P.readout();
    const minH = Math.log10(hs[hs.length - 1]), maxH = Math.log10(hs[0]);
    let eLo = Infinity, eHi = -Infinity;
    keys.forEach((k) => errs[k].forEach((e) => { if (e > floor && Number.isFinite(e)) { eLo = Math.min(eLo, Math.log10(e)); eHi = Math.max(eHi, Math.log10(e)); } }));
    if (!Number.isFinite(eLo)) { eLo = -12; eHi = 0; }
    const E = new MA.Plot(stage, { width: W, height: 250, x: [minH - 0.15, maxH + 0.15], y: [Math.floor(eLo - 0.3), Math.ceil(eHi + 0.3)], grid: false, axes: false,
      xLabel: MA.t('step h'), yLabel: MA.t('global error at t = %s', MA.fmt(T)), pad: [12, 14, 24, 44], label: MA.t('Global error against step size, log–log') });
    logFrame(E);
    if (singular) E.wrap.style.display = 'none';
    const bar = MA.ui.bar(stage);
    const tableBox = el('div', { class: 'w-ode-table' });
    stage.append(tableBox);
    const info = MA.ui.info(stage);

    function drawErrors() {
      E.clear();
      keys.forEach((k) => {
        const M = ODE_METHODS[k];
        const pts = hs.map((hh, i) => (errs[k][i] > floor && Number.isFinite(errs[k][i]) ? [Math.log10(hh), Math.log10(errs[k][i])] : null));
        // reference slope through a mid-range point, half a decade below the data
        const mid = pts.filter(Boolean);
        if (mid.length >= 3) {
          const p = mid[Math.min(mid.length - 1, 4)];
          const off = -0.6, x1 = E.x0, x2 = E.x1, ref = (x) => p[1] + off + M.order * (x - p[0]);
          E.line(x1, ref(x1), x2, ref(x2), { color: M.color, width: 1.2, dash: '2 4', opacity: 0.9, layer: 'fill' });
          // label at the first place (from the left) where the reference line is comfortably inside the window
          const lx = Math.max(E.x0 + 0.12, E.y0 + 0.5 < ref(E.x0 + 0.12) ? E.x0 + 0.12 : (E.y0 + 0.5 - p[1] - off) / M.order + p[0]);
          if (ref(lx) > E.y0 && ref(lx) < E.y1 - 0.3 && lx < E.x1 - 0.5) E.text(lx, ref(lx), '∝ h' + (M.order > 1 ? SUP[M.order] : ''), { dx: 4, dy: 14, size: 11, color: M.color });
        }
        E.path(pts, { color: M.color, width: 2 });
        pts.forEach((q) => { if (q) E.dot(q[0], q[1], { r: 2.6, color: M.color }); });
      });
    }
    const fin = (p) => Number.isFinite(p[0]) && Number.isFinite(p[1]);
    function draw() {
      P.clear();
      if (exact) P.fn(exact, { domain: [t0, T], color: 'var(--ink)', width: 2.2 });
      else P.path(refPts, { color: 'var(--ink)', width: 2.2 });
      if (singular) P.vline(blowAt, { color: 'var(--bad)' });
      const lh = Math.log10(h);
      E.clear('top');
      E.line(lh, E.y0 - 10, lh, E.y1 + 10, { color: 'var(--accent)', width: 1.4, dash: '4 3', layer: 'top' });
      const rows = [];
      keys.forEach((k) => {
        const M = ODE_METHODS[k];
        const s = solve(k, h);
        const pts = s.ts.map((t, i) => [t, s.ys[i]]);
        P.path(pts, { color: M.color, width: 1.9 });
        if (s.n <= 64) pts.forEach((p) => { if (fin(p)) P.dot(p[0], p[1], { r: s.n <= 16 ? 3.6 : 2.6, color: M.color }); });
        const yN = s.ys[s.ys.length - 1];
        const done = s.ts[s.ts.length - 1] === T && Number.isFinite(yN);
        const err = done && !singular ? Math.abs(yN - yT) : NaN;
        if (err > 0 && Number.isFinite(err)) E.dot(lh, Math.log10(err), { r: 5, color: M.color, layer: 'top' });
        rows.push([M, done ? yN : NaN, err, singular ? NaN : observedOrder(k)]);
      });
      if (Number.isFinite(yT) && !singular) P.dot(T, yT, { r: 3.5, color: 'var(--ink)' });
      // table
      const tb = el('table', { class: 'w-table' });
      tb.append(el('tr', {}, el('th', { text: MA.t('Method') }), el('th', { text: MA.t('order') }), el('th', { text: MA.t('y(%s) ≈', MA.fmt(T)) }), el('th', { text: MA.t('error') }), el('th', { text: MA.t('observed order') })));
      rows.forEach(([M, yN, err, ord]) => {
        tb.append(el('tr', {}, el('td', {}, el('span', { class: 'w-ode-sw', style: '--c:' + M.color }), MA.t(M.name)), el('td', { text: String(M.order) }),
          el('td', { text: MA.fmt(yN, 8) }), el('td', { text: MA.fmt(err, 3) }), el('td', { text: Number.isFinite(ord) ? ord.toFixed(2) : '–' })));
      });
      tableBox.replaceChildren(tb);
      const n = Math.max(1, Math.ceil(L / h - 1e-9));
      info.set({ tex: "y' = " + MA.expr.toTeX(Fx.ast) + ',\\quad y(' + texNum(t0) + ') = ' + texNum(y0) },
        singular ? null : MA.ui.kv(exact ? MA.t('exact y(%s) =', MA.fmt(T)) : MA.t('reference y(%s) =', MA.fmt(T)), MA.fmt(yT, 10)),
        MA.ui.kv(MA.t('steps'), String(n)),
        refNote ? el('span', { class: 'w-ode-warn', text: refNote }) : null,
        singular ? null : el('span', { class: 'w-ode-hint', text: MA.t('Halving h divides the error by about 2, 4 and 16 for orders 1, 2 and 4.') }));
    }
    const hMin = hs[hs.length - 1], hMax = L;
    const toPos = (v) => 1000 * Math.log(v / hMin) / Math.log(hMax / hMin);
    const fromPos = (q) => Math.min(L, +(hMin * Math.pow(hMax / hMin, q / 1000)).toPrecision(2));
    const redraw = perFrame(safe(draw));
    MA.ui.slider(bar, { label: MA.t('step h'), min: 0, max: 1000, step: 1, value: toPos(h), fmt: (q) => MA.fmt(fromPos(q), 2), onInput: (q) => { h = fromPos(q); redraw(); } });
    P.onHover(safe((t) => {
      if (t === null || t < t0 || t > T) { read(null); return; }
      read('t = ' + MA.fmt(t, 3) + (exact ? '   y(t) = ' + MA.fmt(exact(t), 5) : ''));
    }));
    if (!singular) drawErrors();
    draw();
  });

  // ================================================================== oscillator
  MA.widget('oscillator', (stage, cfg) => {
    const p = { m: C.num(cfg.m, 1), c: C.num(cfg.c, 0.4), k: C.num(cfg.k, 4), F: C.num(cfg.F, 0), w: C.num(cfg.omega, 2) };
    let x0 = C.num(cfg.x0, 1), v0 = C.num(cfg.v0, 0);
    if (!(p.m > 0)) throw new Error(MA.t('m must be positive'));
    if (!(p.k > 0)) throw new Error(MA.t('k must be positive'));
    if (!(p.c >= 0)) throw new Error(MA.t('c must be zero or positive'));
    if (!(p.w >= 0)) throw new Error(MA.t('omega must be zero or positive'));
    if (x0 === 0 && v0 === 0 && p.F === 0) x0 = 1;
    const w0i = Math.sqrt(p.k / p.m);
    // a fixed time window: about eight natural periods, long enough to see decay and steady state
    const decay = p.c > 0 ? 2 * p.m / p.c : Infinity;
    const tMax = clamp(Math.max(8 * 2 * Math.PI / w0i, p.F ? 6 * 2 * Math.PI / Math.max(p.w, 0.2) : 0, Number.isFinite(decay) ? Math.min(3 * decay, 40) : 0), 12, 40);
    const wMax = Math.max(3 * w0i, 1.5 * p.w, 1);

    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const W = vbW(stage);
    const springX = 64, PL = 150;
    const P = new MA.Plot(stage, { width: W, height: 280, x: [0, tMax], y: [-1, 1], xLabel: 't', yLabel: 'x', pad: [40, 14, 24, PL], label: MA.t('Mass on a spring and its displacement x(t)') });
    const R = new MA.Plot(stage, { width: W, height: 200, x: [0, wMax], y: [0, 1], xLabel: 'ω', yLabel: 'A/F₀', pad: [12, 14, 24, 48], label: MA.t('Resonance curve: steady-state amplitude per unit force') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);

    // spring, mass and helpers drawn in the left margin of P (not clipped)
    const g = el('g');
    P.svg.insertBefore(g, P.layers.handles);
    const ceil = el('rect', { x: springX - 34, y: 4, width: 68, height: 7, class: 'w-ode-ceil' });
    const ceilLine = el('line', { x1: springX - 34, x2: springX + 34, y1: 11, y2: 11, style: 'stroke:var(--ink-2);stroke-width:1.6' });
    const spring = el('path', { class: 'w-ode-spring' });
    const eqLine = el('line', { style: 'stroke:var(--ink-3);stroke-width:1;stroke-dasharray:4 4' });
    const link = el('line', { style: 'stroke:var(--accent);stroke-width:1.2;stroke-dasharray:3 3' });
    const mass = el('rect', { width: 46, height: 30, rx: 5, class: 'w-ode-mass' });
    const mLabel = el('text', { 'text-anchor': 'end', style: 'fill:var(--ink-2);font-size:13px;font-style:italic;font-family:var(--font)', text: 'm' });
    const force = el('line', { style: 'stroke:var(--accent);stroke-width:2.4' });
    const forceHead = el('path', { style: 'fill:var(--accent)' });
    const tLabel = el('text', { class: 'lbl', 'text-anchor': 'end', style: 'fill:var(--ink-2)' });
    const regimeLabel = el('text', { class: 'lbl', 'text-anchor': 'start', style: 'fill:var(--ink-2)' });
    g.append(ceil, ceilLine, eqLine, spring, link, mass, mLabel, force, forceHead, tLabel, regimeLabel);

    let sol = null, t = 0, playing = false, speed = 1;
    const derived = () => {
      const { m, c, k } = p;
      const w0 = Math.sqrt(k / m), zeta = c / (2 * Math.sqrt(m * k));
      const regime = c === 0 ? 'undamped' : Math.abs(zeta - 1) < 0.004 ? 'critical' : zeta < 1 ? 'under' : 'over';
      return { w0, zeta, regime, gamma: c / (2 * m), wd: zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0 };
    };
    const REG = { undamped: MA.t('undamped'), under: MA.t('underdamped'), critical: MA.t('critically damped'), over: MA.t('overdamped') };
    const gain = (w) => 1 / Math.hypot(p.k - p.m * w * w, p.c * w);

    function simulate() {
      const { m, c, k, F, w } = p;
      const fastest = Math.max(Math.sqrt(k / m), w, c / m, 0.2);
      const dt = Math.min(0.01, 2 * Math.PI / fastest / 150);
      const n = Math.ceil(tMax / dt);
      const xs = new Float64Array(n + 1);
      let x = x0, v = v0, tt = 0;
      xs[0] = x;
      const acc = (s, xx, vv) => (F * Math.cos(w * s) - c * vv - k * xx) / m;
      for (let i = 1; i <= n; i++) {
        const a1 = acc(tt, x, v), b1 = v;
        const a2 = acc(tt + dt / 2, x + dt / 2 * b1, v + dt / 2 * a1), b2 = v + dt / 2 * a1;
        const a3 = acc(tt + dt / 2, x + dt / 2 * b2, v + dt / 2 * a2), b3 = v + dt / 2 * a2;
        const a4 = acc(tt + dt, x + dt * b3, v + dt * a3), b4 = v + dt * a3;
        x += dt / 6 * (b1 + 2 * b2 + 2 * b3 + b4);
        v += dt / 6 * (a1 + 2 * a2 + 2 * a3 + a4);
        tt += dt;
        xs[i] = x;
      }
      sol = { xs, dt, n };
    }
    const xAt = (s) => {
      const q = clamp(s / sol.dt, 0, sol.n), i = Math.min(sol.n - 1, Math.floor(q)), fr = q - i;
      return sol.xs[i] * (1 - fr) + sol.xs[i + 1] * fr;
    };
    function niceMax(v) {
      const steps = [1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
      const e = Math.pow(10, Math.floor(Math.log10(v)));
      for (const s of steps) if (s * e >= v) return s * e;
      return 10 * e;
    }
    let handle = null, rHandle = null;
    function drawCurves() {
      simulate();
      let mx = 0;
      for (let i = 0; i <= sol.n; i++) mx = Math.max(mx, Math.abs(sol.xs[i]));
      const d = derived();
      const ss = p.F ? p.F * gain(p.w) : 0;
      if (!dragging) { const Y = niceMax(Math.max(mx, ss, 1e-6) * 1.3); P.setView([0, tMax], [-Y, Y]); }
      P.clear();
      // steady state or envelope
      if (p.F) {
        const delta = Math.atan2(p.c * p.w, p.k - p.m * p.w * p.w);
        P.fn((s) => ss * Math.cos(p.w * s - delta), { color: 'var(--series-2)', width: 1.6, dash: '6 4', samples: 900 });
      } else if (d.regime === 'under' || d.regime === 'undamped') {
        const C1 = x0, C2 = (v0 + d.gamma * x0) / (d.wd || 1), amp = Math.hypot(C1, C2);
        [1, -1].forEach((sg) => P.fn((s) => sg * amp * Math.exp(-d.gamma * s), { color: 'var(--ink-3)', width: 1.2, dash: '2 4' }));
      }
      const pts = [];
      const stepN = Math.max(1, Math.floor(sol.n / 1400));
      for (let i = 0; i <= sol.n; i += stepN) pts.push([i * sol.dt, sol.xs[i]]);
      P.path(pts, { color: 'var(--series-1)', width: 2.1 });
      cursorTrail = P.path([], { color: 'var(--series-1)', width: 3.4, opacity: 0.35 });
      cursorDot = el('circle', { r: 5, style: 'fill:var(--accent);stroke:var(--plot-bg);stroke-width:1.5' });
      P.layers.top.append(cursorDot);
      const tH = P.inv(springX, 0)[0];
      if (!handle) {
        handle = P.handle(tH, x0, { r: 6, label: MA.t('Mass: drag to set the initial displacement'),
          constrain: (_, y) => [P.inv(springX, 0)[0], clamp(y, -0.92 * P.y1, 0.92 * P.y1)],
          onDrag: safe((_, y) => { stop(); x0 = Math.abs(y) < P.y1 * 0.01 ? 0 : y; v0 = 0; t = 0; dragging = true; refresh(); }),
          onEnd: safe(() => { dragging = false; refresh(); }) });
      }
      eqLine.setAttribute('x1', springX - 34); eqLine.setAttribute('x2', P.pl);
      eqLine.setAttribute('y1', P.Y(0)); eqLine.setAttribute('y2', P.Y(0));
      drawResonance(d);
      drawState();
      showInfo(d, ss);
      setLegend(legend, [{ label: 'x(t)', color: 'var(--series-1)' }].concat(p.F ? [{ label: MA.t('steady state'), color: 'var(--series-2)', dash: true }]
        : (d.regime === 'under' || d.regime === 'undamped') ? [{ label: MA.t('envelope'), color: 'var(--ink-3)', dash: true }] : []));
    }
    let cursorTrail = null, cursorDot = null, dragging = false;
    function springPath(x, top, bot) {
      const lead = Math.min(8, (bot - top) / 5), y0 = top + lead, y1 = bot - lead, n = 14, amp = 9;
      let d = 'M' + x + ',' + top + 'L' + x + ',' + y0.toFixed(1);
      for (let i = 1; i < n; i++) d += 'L' + (x + (i % 2 ? amp : -amp)) + ',' + (y0 + (y1 - y0) * i / n).toFixed(1);
      return d + 'L' + x + ',' + y1.toFixed(1) + 'L' + x + ',' + bot;
    }
    function drawState() {
      const x = dragging ? x0 : xAt(t);
      const py = P.Y(x);
      spring.setAttribute('d', springPath(springX, 11, py - 15));
      mass.setAttribute('x', springX - 23); mass.setAttribute('y', py - 15);
      mLabel.setAttribute('x', springX - 28); mLabel.setAttribute('y', py + 4.5);
      const cx = P.X(dragging ? 0 : t);
      link.setAttribute('x1', springX + 23); link.setAttribute('x2', cx); link.setAttribute('y1', py); link.setAttribute('y2', py);
      if (cursorDot) { cursorDot.setAttribute('cx', cx); cursorDot.setAttribute('cy', py); }
      if (cursorTrail) {
        const tr = [];
        const s0 = Math.max(0, t - 2.5);
        for (let i = 0; i <= 50; i++) { const s = s0 + (t - s0) * i / 50; tr.push(P.X(s).toFixed(1) + ',' + P.Y(xAt(s)).toFixed(1)); }
        cursorTrail.setAttribute('d', dragging ? '' : 'M' + tr.join('L'));
      }
      if (p.F && !dragging) {
        const fv = Math.cos(p.w * t), len = 26 * fv, fx = springX + 36;
        force.setAttribute('x1', fx); force.setAttribute('x2', fx); force.setAttribute('y1', py); force.setAttribute('y2', py - len + (len > 0 ? 6 : len < 0 ? -6 : 0));
        forceHead.setAttribute('d', Math.abs(len) > 4 ? headPath(fx, py - len, len > 0 ? -Math.PI / 2 : Math.PI / 2, 7, 4) : '');
      } else { force.setAttribute('y1', 0); force.setAttribute('y2', 0); force.setAttribute('x1', -10); force.setAttribute('x2', -10); forceHead.setAttribute('d', ''); }
      tLabel.setAttribute('x', P.W - P.pr - 4); tLabel.setAttribute('y', 22);
      tLabel.textContent = 't = ' + t.toFixed(2) + ' s';
      if (handle) handle.set(P.inv(springX, 0)[0], x);
    }
    function drawResonance(d) {
      let peak = 0;
      for (let i = 1; i <= 400; i++) { const v = gain(wMax * i / 400); if (Number.isFinite(v)) peak = Math.max(peak, v); }
      const cap = 10 / p.k;
      const top = niceMax(Math.min(peak, cap) * 1.12);
      R.setView([0, wMax], [0, top]);
      R.clear();
      R.area(gain, 0, wMax, { color: 'var(--series-1)', opacity: 0.08, samples: 400 });
      R.fn(gain, { color: 'var(--series-1)', width: 2.2, samples: 800 });
      R.vline(d.w0, { color: 'var(--ink-3)' });
      R.text(d.w0, top, 'ω₀', { dx: 4, dy: 14, size: 11, color: 'var(--ink-2)' });
      if (d.zeta < Math.SQRT1_2 && p.c > 0) {
        const wr = d.w0 * Math.sqrt(1 - 2 * d.zeta * d.zeta);
        if (gain(wr) <= top) R.dot(wr, gain(wr), { r: 3.5, color: 'var(--series-1)' });
      }
      R.hline(1 / p.k, { color: 'var(--ink-3)', dash: '2 4' });
      R.text(wMax, 1 / p.k, MA.t('static: 1/k'), { anchor: 'end', dx: -4, dy: -5, size: 10.5, color: 'var(--ink-3)' });
      const gy = Math.min(gain(p.w), top);
      if (!rHandle) {
        rHandle = R.handle(p.w, gy, { r: 6.5, label: MA.t('Forcing frequency ω'), constrain: (x) => { const w = clamp(x, 0, wMax); return [w, Math.min(gain(w), R.y1)]; },
          onDrag: safe((x) => { p.w = Math.round(clamp(x, 0, wMax) * 100) / 100; sW.set(p.w); refresh(); }) });
      } else rHandle.set(p.w, gy);
    }
    function showInfo(d, ss) {
      const parts = [MA.ui.kv('\\omega_0 = \\sqrt{k/m} =', MA.fmt(d.w0, 4)), MA.ui.kv('\\zeta = c/(2\\sqrt{mk}) =', MA.fmt(d.zeta, 3))];
      const reg = el('span', { class: 'w-ode-big', text: REG[d.regime] });
      parts.push(reg);
      const disc = p.c * p.c - 4 * p.m * p.k;
      if (disc < 0) parts.push({ tex: 'r = ' + texComplexPair(-p.c / (2 * p.m), Math.sqrt(-disc) / (2 * p.m)) });
      else if (disc === 0) parts.push({ tex: 'r = ' + texNum(-p.c / (2 * p.m)) + '\\ (\\text{double})' });
      else parts.push({ tex: 'r = ' + texNum((-p.c + Math.sqrt(disc)) / (2 * p.m)) + ',\\ ' + texNum((-p.c - Math.sqrt(disc)) / (2 * p.m)) });
      if (p.F) {
        parts.push(MA.ui.kv(MA.t('steady-state amplitude'), MA.fmt(ss, 4)));
        parts.push(MA.ui.kv(MA.t('phase lag'), MA.fmt(Math.atan2(p.c * p.w, p.k - p.m * p.w * p.w) * 180 / Math.PI, 3) + '°'));
      } else parts.push(el('span', { class: 'w-ode-hint', text: MA.t('Set F₀ > 0 to force the oscillator.') }));
      info.set(...parts);
      regimeLabel.setAttribute('x', P.pl + 6); regimeLabel.setAttribute('y', 22);
      regimeLabel.textContent = REG[d.regime] + (p.c > 0 ? '  ·  ζ = ' + MA.fmt(d.zeta, 3) : '');
    }
    const refresh = perFrame(safe(drawCurves));

    const anim = MA.anim((dt) => {
      if (dragging) return true;
      t += dt * speed;
      if (t >= tMax) { t = tMax; drawState(); setPlaying(false); return false; }
      drawState();
      return true;
    });
    const playBtn = MA.ui.button(bar, { label: MA.t('Play'), primary: true, onClick: safe(() => {
      if (anim.running) { stop(); return; }
      if (t >= tMax - 1e-9) t = 0;
      anim.play(); setPlaying(true);
    }) });
    function setPlaying(on) { playing = on; playBtn.textContent = on ? MA.t('Pause') : MA.t('Play'); }
    function stop() { anim.stop(); setPlaying(false); }
    MA.ui.button(bar, { label: MA.t('Restart'), onClick: safe(() => { t = 0; drawState(); if (!anim.running) { anim.play(); setPlaying(true); } }) });
    MA.ui.select(bar, { label: MA.t('Speed'), value: '1', options: [['0.5', '½×'], ['1', '1×'], ['2', '2×'], ['4', '4×']], onChange: (v) => { speed = +v; } });
    const sl = (label, key, min, max, step) => MA.ui.slider(bar2, { label, min, max, step, value: p[key], fmt: (v) => MA.fmt(v, 3), onInput: (v) => { p[key] = v; refresh(); } });
    sl('m', 'm', 0.1, Math.max(5, 2 * p.m), 0.05);
    // up to 1.5 × critical damping 2√(mk), so the overdamped regime can always be reached
    sl('c', 'c', 0, Math.ceil(Math.max(4, 2 * p.c, 3 * Math.sqrt(p.m * p.k))), 0.01);
    sl('k', 'k', 0.1, Math.max(10, 2 * p.k), 0.05);
    sl('F_0', 'F', 0, Math.max(3, 2 * p.F), 0.05);
    const sW = sl('\\omega', 'w', 0, wMax, 0.01);
    pauseOffscreen(stage, anim, (paused) => setPlaying(!paused));
    drawCurves();
    void playing;
  });
})();
