/* Maths Atlas — interactive figures: multivariable calculus.
   surface (3D graphs and parametric surfaces), frenet (space curves), contour (level curves, gradient,
   Lagrange multipliers), vectorfield (arrows, streamlines, div/curl, line integrals), gradientdescent,
   region (iterated integrals). Keys and defaults: data/widgets.json. Conventions: tools/WIDGET_GUIDE.md.

   Shared pieces: a small canvas 3D renderer (View3D: drag to rotate, pinch / ctrl+wheel zoom, painter's
   algorithm, Lambert shading, axes box), marching squares with joined polylines, theme colour ramps
   mixed in OKLab, and an adaptive Gauss–Kronrod integrator. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  // ------------------------------------------------------------------ styles
  const STYLE = `
.w-mv-3d { background: var(--plot-bg); }
.w-mv-3d canvas { cursor: grab; outline: none; }
.w-mv-3d canvas:active { cursor: grabbing; }
.w-mv-3d canvas:focus-visible { box-shadow: inset 0 0 0 2px var(--accent); }
.w-mv-hint { position: absolute; right: 10px; bottom: 8px; font-size: 0.75rem; color: var(--ink-3); pointer-events: none; transition: opacity 0.6s; padding: 2px 7px; border-radius: 6px; background: color-mix(in srgb, var(--plot-bg) 85%, transparent); }
.w-mv-hint.off { opacity: 0; }
.w-mv-hint { animation: w-mv-fade 0.8s ease 7s forwards; }
@keyframes w-mv-fade { to { opacity: 0; } }
/* maths.css sizes every svg inside .w-plot (height:auto), which collapses KaTeX's own svg glyphs (√, wide accents) in plot labels */
.w-plot .katex svg { height: inherit; }
.w-mv-warn { color: var(--bad); }
.w-mv-note { color: var(--ink-3); }
.w-mv-halo foreignObject .katex { text-shadow: 0 0 2px var(--plot-bg), 0 0 2px var(--plot-bg), 0 0 4px var(--plot-bg), 0 0 6px var(--plot-bg); }
.w-mv-sub { border-top: 1px solid var(--rule); }
.w-mv-sub .w-plot svg { background: var(--plot-bg); }
.w-mv-cap { padding: 6px 16px 0; font-size: 0.75rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--ink-3); border-top: 1px solid var(--rule); }
.w-mv-bar .w-btn:disabled { opacity: 0.4; cursor: default; }
`;
  if (!document.getElementById('w-mv-style')) document.head.append(el('style', { id: 'w-mv-style', text: STYLE }));

  // ------------------------------------------------------------------ small helpers
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const fin = Number.isFinite;
  const fmt = (v, s = 4) => MA.fmt(fin(v) && Math.abs(v) < 1e-12 ? 0 : v, s);
  /** A number for TeX (ASCII minus, e-notation as ×10^k). */
  function tn(v, s = 4) {
    let t = fmt(v, s);
    if (t === '–') return '?';
    t = t.replace(/−/g, '-').replace('∞', '\\infty');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(t);
    if (m) t = m[1] + '\\times 10^{' + (+m[2]) + '}';
    return t;
  }
  const tvec = (v, s) => '(' + v.map((q) => tn(q, s)).join(',\\ ') + ')';
  const safe = (fn) => function (...args) { try { return fn.apply(this, args); } catch (e) { console.warn('[multivar]', e); return undefined; } };
  const safeStep = (fn) => (dt) => { try { return fn(dt); } catch (e) { console.warn('[multivar]', e); return false; } };
  const showEl = (node, on) => { node.style.display = on ? '' : 'none'; };
  const deg = (a) => a * 180 / Math.PI;
  const span = (r) => r[1] - r[0];

  /** Author parameters (cfg.sliders): {specs, values, names}. */
  function sliderSetup(cfg) {
    const specs = C.sliders(cfg.sliders);
    const values = {};
    specs.forEach((s) => { values[s.name] = s.value; });
    return { specs, values, names: specs.map((s) => s.name) };
  }
  /** Compile an expression; returns {f, ast}. */
  function compile(src, vars, what) {
    if (!C.has(src)) throw new Error(what + ': ' + MA.t('an expression is needed'));
    try { return C.expr(src, vars); } catch (e) { throw new Error(what + ': ' + e.message); }
  }
  function point(src, def, what) {
    const p = C.points(C.has(src) ? src : def)[0];
    if (!p || p.length < 2 || !fin(p[0]) || !fin(p[1])) throw new Error(what + ': ' + MA.t('a point is written “x,y”'));
    return [p[0], p[1]];
  }
  /** Constant expression shown in TeX (pi/2 -> \frac{\pi}{2}); falls back to the number. */
  function texConst(src, v) {
    if (C.has(src)) { try { return MA.expr.toTeX(MA.expr.parse(String(src), { vars: [] })); } catch (e) { /* number below */ } }
    return tn(v, 5);
  }

  /** TeX for the two ends of a range as written ("0, 2pi" -> ["0", "2\\pi"]). */
  function rangeTeX(src, r) {
    if (C.has(src)) {
      const t = String(src).trim().replace(/^\[|\]$/g, '');
      const parts = t.includes(';') ? t.split(';') : t.includes(',') ? t.split(',') : t.split(':');
      if (parts.length === 2) { try { return parts.map((q) => MA.expr.toTeX(MA.expr.parse(q.trim(), { vars: [] }))); } catch (e) { /* numbers below */ } }
    }
    if (Math.abs(r[1] - 2 * Math.PI) < 1e-12 && r[0] === 0) return ['0', '2\\pi'];
    return [tn(r[0], 4), tn(r[1], 4)];
  }

  // ------------------------------------------------------------------ colours (theme variables only)
  let scratch = null;
  /** CSS colour (any syntax the browser knows) -> [r, g, b]. */
  function rgbOf(css) {
    if (!scratch) scratch = document.createElement('canvas').getContext('2d');
    scratch.fillStyle = '#808080';
    scratch.fillStyle = css || '#808080';
    const s = scratch.fillStyle;
    if (s[0] === '#') return [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
    const m = s.match(/[\d.]+/g) || [128, 128, 128];
    return [+m[0], +m[1], +m[2]];
  }
  const themeRGB = (name) => rgbOf(MA.cssVar(name));
  const css = (c, a) => (a === undefined || a >= 1 ? 'rgb(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ')' : 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a.toFixed(3) + ')');
  const toLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
  const toSrgb = (c) => { const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(Math.max(0, c), 1 / 2.4) - 0.055; return Math.round(255 * clamp(v, 0, 1)); };
  function toLab(c) {
    const r = toLin(c[0]), g = toLin(c[1]), b = toLin(c[2]);
    const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
    const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
    const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function fromLab(L) {
    const l = Math.pow(L[0] + 0.3963377774 * L[1] + 0.2158037573 * L[2], 3);
    const m = Math.pow(L[0] - 0.1055613458 * L[1] - 0.0638541728 * L[2], 3);
    const s = Math.pow(L[0] - 0.0894841775 * L[1] - 1.2914855480 * L[2], 3);
    return [toSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s), toSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s), toSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s)];
  }
  /** Mix two colours in OKLab (t = 0 gives a, 1 gives b). */
  const mix = (a, b, t) => { const A = toLab(a), B = toLab(b); return fromLab([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]); };
  /** Colour ramp through the given stops (OKLab), tabulated: ramp(t) -> [r, g, b] for t in [0, 1]. */
  function makeRamp(stops) {
    const labs = stops.map(toLab);
    const N = 256, lut = new Array(N + 1);
    for (let i = 0; i <= N; i++) {
      const t = i / N * (labs.length - 1);
      const k = Math.min(labs.length - 2, Math.floor(t)), f = t - k;
      const A = labs[k], B = labs[k + 1];
      lut[i] = fromLab([A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, A[2] + (B[2] - A[2]) * f]);
    }
    const ramp = (t) => lut[Math.round(clamp(fin(t) ? t : 0.5, 0, 1) * N)];
    ramp.stops = stops;
    return ramp;
  }
  /** The palette used by every figure in this file, read from the current theme. */
  function palette() {
    const P = {};
    ['plot-bg', 'ink', 'ink-2', 'ink-3', 'grid', 'axis', 'rule', 'series-1', 'series-2', 'series-3', 'series-4', 'accent', 'good', 'bad', 'a-applied'].forEach((n) => { P[n] = themeRGB('--' + n); });
    P.dark = MA.isDark();
    P.neutral = mix(P['plot-bg'], P.ink, P.dark ? 0.42 : 0.24);
    P.height = makeRamp([P['series-4'], P['series-1'], P['series-3'], P['a-applied']]);
    P.diverge = makeRamp([P['series-1'], P.neutral, P['series-2']]);
    const soft = P.dark ? 0.5 : 0.42;
    P.map2d = makeRamp([mix(P['plot-bg'], P['series-1'], soft), P['plot-bg'], mix(P['plot-bg'], P['series-2'], soft)]);
    P.div2d = makeRamp([mix(P['plot-bg'], P['series-1'], soft - 0.04), P['plot-bg'], mix(P['plot-bg'], P['series-2'], soft - 0.04)]);
    return P;
  }

  // ------------------------------------------------------------------ numerics
  const GKX = [0.991455371120812639, 0.949107912342758525, 0.864864423359769073, 0.741531185599394440, 0.586087235467691130, 0.405845151377397167, 0.207784955007898468, 0];
  const GKW = [0.022935322010529225, 0.063092092629978553, 0.104790010322250184, 0.140653259715525919, 0.169004726639267903, 0.190350578064785410, 0.204432940075298892, 0.209482141084727828];
  const GW = [0.129484966168869693, 0.279705391489276668, 0.381830050505118945, 0.417959183673469388];
  function gk15(f, a, b) {
    const c = (a + b) / 2, h = (b - a) / 2;
    const fc = f(c);
    let k = fc * GKW[7], g = fc * GW[3];
    for (let i = 0; i < 7; i++) {
      const dx = h * GKX[i];
      const s = f(c - dx) + f(c + dx);
      k += GKW[i] * s;
      if (i % 2 === 1) g += GW[(i - 1) / 2] * s;
    }
    return { v: k * h, e: Math.abs((k - g) * h) };
  }
  /** Adaptive Gauss–Kronrod integral of f on [a, b]; NaN if the integrand is not finite. */
  function quad(f, a, b, tol = 1e-10, maxSeg = 120) {
    if (!(fin(a) && fin(b))) return NaN;
    if (a === b) return 0;
    const segs = [Object.assign({ a, b }, gk15(f, a, b))];
    for (let it = 0; it < maxSeg; it++) {
      let tot = 0, err = 0, worst = 0;
      for (let i = 0; i < segs.length; i++) { tot += segs[i].v; err += segs[i].e; if (segs[i].e > segs[worst].e) worst = i; }
      if (!fin(tot)) return NaN;
      if (err <= tol * Math.max(1, Math.abs(tot))) return tot;
      const s = segs[worst], m = (s.a + s.b) / 2;
      segs.splice(worst, 1, Object.assign({ a: s.a, b: m }, gk15(f, s.a, m)), Object.assign({ a: m, b: s.b }, gk15(f, m, s.b)));
    }
    return segs.reduce((q, s) => q + s.v, 0);
  }
  /** Gradient and Hessian of F(x, y) by central differences (steps relative to the view). */
  function grad2(F, x, y, h) {
    return [(F(x + h, y) - F(x - h, y)) / (2 * h), (F(x, y + h) - F(x, y - h)) / (2 * h)];
  }
  function hess2(F, x, y, h) {
    const f0 = F(x, y);
    const fxx = (F(x + h, y) - 2 * f0 + F(x - h, y)) / (h * h);
    const fyy = (F(x, y + h) - 2 * f0 + F(x, y - h)) / (h * h);
    const fxy = (F(x + h, y + h) - F(x + h, y - h) - F(x - h, y + h) + F(x - h, y - h)) / (4 * h * h);
    return [[fxx, fxy], [fxy, fyy]];
  }
  function eigSym2(H) {
    const a = H[0][0], b = H[0][1], d = H[1][1];
    const m = (a + d) / 2, r = Math.hypot((a - d) / 2, b);
    return [m - r, m + r];
  }
  /** Robust value range: ignores isolated spikes (poles) beyond the 1st/99th percentiles. */
  function robustRange(vals) {
    const a = Float64Array.from(vals.filter(fin)).sort();
    if (!a.length) return null;
    const lo = a[0], hi = a[a.length - 1];
    const p1 = a[Math.floor((a.length - 1) * 0.01)], p99 = a[Math.ceil((a.length - 1) * 0.99)];
    if (hi - lo > 8 * (p99 - p1) + 1e-12) { const pad = 0.08 * (p99 - p1 || 1); return [p1 - pad, p99 + pad, true]; }
    return [lo, hi, false];
  }
  function percentile(vals, q) {
    const a = Float64Array.from(vals.filter(fin)).sort();
    return a.length ? a[Math.min(a.length - 1, Math.floor(q * (a.length - 1)))] : NaN;
  }
  /** About `count` contour levels at nice values strictly inside (lo, hi). */
  function niceLevels(lo, hi, count) {
    if (!(hi > lo) || count < 1) return [];
    const raw = (hi - lo) / (count + 1);
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    let step = p;
    for (const m of [1, 2, 2.5, 5, 10]) if (Math.abs(Math.log(m * p / raw)) < Math.abs(Math.log(step / raw))) step = m * p;
    const out = [];
    for (let k = Math.ceil(lo / step); k * step < hi; k++) { const v = k * step; if (v > lo + step * 1e-9 && v < hi - step * 1e-9) out.push(Math.abs(v) < step * 1e-9 ? 0 : +v.toPrecision(12)); }
    return out;
  }

  // ------------------------------------------------------------------ marching squares
  /**
   * Level curves of a grid of values: vals[j*(nx+1)+i] at (X(i), Y(j)). Returns polylines [[x, y], …]
   * joined across cells (closed curves repeat their first point).
   */
  function isolines(vals, nx, ny, X, Y, L) {
    const W = nx + 1;
    const pts = new Map(), adj = new Map();
    const at = (id, i0, j0, i1, j1) => {
      if (!pts.has(id)) {
        const a = vals[j0 * W + i0], b = vals[j1 * W + i1];
        const t = (L - a) / (b - a);
        pts.set(id, [X(i0) + (X(i1) - X(i0)) * t, Y(j0) + (Y(j1) - Y(j0)) * t]);
      }
      return id;
    };
    const link = (p, q) => { (adj.get(p) || adj.set(p, []).get(p)).push(q); (adj.get(q) || adj.set(q, []).get(q)).push(p); };
    for (let j = 0; j < ny; j++) {
      for (let i = 0; i < nx; i++) {
        const v00 = vals[j * W + i], v10 = vals[j * W + i + 1], v11 = vals[(j + 1) * W + i + 1], v01 = vals[(j + 1) * W + i];
        if (!(fin(v00) && fin(v10) && fin(v11) && fin(v01))) continue;
        const idx = (v00 > L ? 1 : 0) | (v10 > L ? 2 : 0) | (v11 > L ? 4 : 0) | (v01 > L ? 8 : 0);
        if (idx === 0 || idx === 15) continue;
        const e = [
          () => at(2 * (j * W + i), i, j, i + 1, j),
          () => at(2 * (j * W + i + 1) + 1, i + 1, j, i + 1, j + 1),
          () => at(2 * ((j + 1) * W + i), i, j + 1, i + 1, j + 1),
          () => at(2 * (j * W + i) + 1, i, j, i, j + 1),
        ];
        const pair = (p, q) => link(e[p](), e[q]());
        switch (idx) {
          case 1: case 14: pair(3, 0); break;
          case 2: case 13: pair(0, 1); break;
          case 3: case 12: pair(3, 1); break;
          case 4: case 11: pair(1, 2); break;
          case 6: case 9: pair(0, 2); break;
          case 7: case 8: pair(2, 3); break;
          case 5: case 10: {
            const c = (v00 + v10 + v11 + v01) / 4 > L;
            if ((idx === 5) === c) { pair(0, 1); pair(2, 3); } else { pair(3, 0); pair(1, 2); }
            break;
          }
        }
      }
    }
    const lines = [], seen = new Set();
    const walk = (start) => {
      const line = [pts.get(start)];
      seen.add(start);
      let prev = -1, cur = start;
      for (;;) {
        const nb = adj.get(cur) || [];
        let nxt = -1;
        for (const q of nb) { if (q !== prev && !seen.has(q)) { nxt = q; break; } }
        if (nxt < 0) { if (nb.includes(start) && line.length > 2 && prev !== start) line.push(pts.get(start)); break; }
        line.push(pts.get(nxt)); seen.add(nxt); prev = cur; cur = nxt;
      }
      lines.push(line);
    };
    adj.forEach((nb, id) => { if (nb.length === 1 && !seen.has(id)) walk(id); });
    adj.forEach((nb, id) => { if (!seen.has(id)) walk(id); });
    return lines;
  }
  /** Line segments of one level inside one grid cell (for curves drawn on a 3D surface). */
  function cellSegments(v00, v10, v11, v01, L) {
    if (!(fin(v00) && fin(v10) && fin(v11) && fin(v01))) return null;
    const idx = (v00 > L ? 1 : 0) | (v10 > L ? 2 : 0) | (v11 > L ? 4 : 0) | (v01 > L ? 8 : 0);
    if (idx === 0 || idx === 15) return null;
    // edge parameters: e0 bottom (00→10), e1 right (10→11), e2 top (01→11), e3 left (00→01); point = [u, v] in the unit cell
    const e = [() => [(L - v00) / (v10 - v00), 0], () => [1, (L - v10) / (v11 - v10)], () => [(L - v01) / (v11 - v01), 1], () => [0, (L - v00) / (v01 - v00)]];
    const out = [];
    const pair = (p, q) => out.push([e[p](), e[q]()]);
    switch (idx) {
      case 1: case 14: pair(3, 0); break;
      case 2: case 13: pair(0, 1); break;
      case 3: case 12: pair(3, 1); break;
      case 4: case 11: pair(1, 2); break;
      case 6: case 9: pair(0, 2); break;
      case 7: case 8: pair(2, 3); break;
      default: { const c = (v00 + v10 + v11 + v01) / 4 > L; if ((idx === 5) === c) { pair(0, 1); pair(2, 3); } else { pair(3, 0); pair(1, 2); } }
    }
    return out;
  }

  // ------------------------------------------------------------------ 2D plot helpers (SVG + canvas underlay)
  /** A low-resolution canvas under the plot area of an MA.Plot (smoothly scaled by the browser). */
  function underlay(P) {
    const cv = el('canvas', { 'aria-hidden': 'true' });
    const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
    Object.assign(cv.style, { position: 'absolute', left: (P.pl / P.W * 100) + '%', top: (P.pt / P.H * 100) + '%', width: (pw / P.W * 100) + '%', height: (ph / P.H * 100) + '%', zIndex: 0, pointerEvents: 'none' });
    P.wrap.style.background = 'var(--plot-bg)';
    P.svg.style.background = 'transparent';
    P.svg.style.position = 'relative';
    P.svg.style.zIndex = 1;
    P.wrap.insertBefore(cv, P.svg);
    P.wrap.classList.add('w-mv-halo');
    return cv;
  }
  /** Values of F on the (nx+1)×(ny+1) grid of nodes covering the current view of P. */
  function sampleGrid(P, F, nx) {
    const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
    const ny = Math.max(8, Math.round(nx * ph / pw));
    const vals = new Float64Array((nx + 1) * (ny + 1));
    const X = (i) => P.x0 + (P.x1 - P.x0) * i / nx, Y = (j) => P.y0 + (P.y1 - P.y0) * j / ny;
    for (let j = 0; j <= ny; j++) {
      const y = Y(j);
      for (let i = 0; i <= nx; i++) {
        let v;
        try { v = F(X(i), y); } catch (e) { v = NaN; }
        vals[j * (nx + 1) + i] = fin(v) ? v : NaN;
      }
    }
    return { vals, nx, ny, X, Y };
  }
  /** Paint grid values onto an underlay canvas with colour(v) -> [r,g,b] (NaN transparent). */
  function paintGrid(cv, G, colour) {
    const w = G.nx + 1, h = G.ny + 1;
    if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(w, h);
    const d = img.data;
    for (let j = 0; j < h; j++) {
      const row = (h - 1 - j) * w;
      for (let i = 0; i < w; i++) {
        const v = G.vals[j * w + i];
        const k = (row + i) * 4;
        if (!fin(v)) { d[k + 3] = 0; continue; }
        const c = colour(v);
        d[k] = c[0]; d[k + 1] = c[1]; d[k + 2] = c[2]; d[k + 3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }
  /** SVG path data for polylines in data coordinates of P. */
  function pathData(P, lines) {
    let d = '';
    const lim = 1e5;
    for (const ln of lines) {
      let pen = false;
      for (const p of ln) {
        if (!p || !fin(p[0]) || !fin(p[1])) { pen = false; continue; }
        d += (pen ? 'L' : 'M') + clamp(P.X(p[0]), -lim, lim).toFixed(1) + ',' + clamp(P.Y(p[1]), -lim, lim).toFixed(1);
        pen = true;
      }
    }
    return d;
  }
  function svgPath(P, d, style, layer) {
    if (!d) return null;
    const e = el('path', { d, style: 'fill:none;stroke-linejoin:round;stroke-linecap:round;' + style });
    P.layers[layer || 'curves'].append(e);
    return e;
  }
  /** Arrow with a fixed-size head (data coordinates). */
  function arrow(P, a, b, o = {}) {
    const lim = 1e5;
    const x1 = clamp(P.X(a[0]), -lim, lim), y1 = clamp(P.Y(a[1]), -lim, lim), x2 = clamp(P.X(b[0]), -lim, lim), y2 = clamp(P.Y(b[1]), -lim, lim);
    const L = Math.hypot(x2 - x1, y2 - y1);
    const c = o.color || 'var(--series-1)';
    if (!(L > 1.5)) { if (o.dotIfZero && fin(x1)) P.dot(a[0], a[1], { r: 3.5, color: c }); return null; }
    const w = o.width || 2;
    const hl = Math.min(L * 0.5, 8 + 1.5 * w), hw = hl * 0.72;
    const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
    const bx = x2 - ux * hl * 0.9, by = y2 - uy * hl * 0.9, hx = x2 - ux * hl, hy = y2 - uy * hl;
    const g = el('g', { style: o.opacity !== undefined ? 'opacity:' + o.opacity : null });
    g.append(el('line', { x1: x1.toFixed(1), y1: y1.toFixed(1), x2: bx.toFixed(1), y2: by.toFixed(1), style: 'stroke:' + c + ';stroke-width:' + w + ';stroke-linecap:' + (o.dash ? 'butt' : 'round') + (o.dash ? ';stroke-dasharray:' + o.dash : '') }));
    g.append(el('path', { d: 'M' + x2.toFixed(1) + ',' + y2.toFixed(1) + 'L' + (hx - uy * hw / 2).toFixed(1) + ',' + (hy + ux * hw / 2).toFixed(1) + 'L' + (hx + uy * hw / 2).toFixed(1) + ',' + (hy - ux * hw / 2).toFixed(1) + 'Z',
      style: 'fill:' + c + ';stroke:' + c + ';stroke-width:1;stroke-linejoin:round' }));
    P.layers[o.layer || 'marks'].append(g);
    return g;
  }
  /** A filled arrowhead at p pointing along dir (screen size px). */
  function head(P, p, dir, o = {}) {
    const X = P.X(p[0]), Y = P.Y(p[1]);
    const dx = P.X(p[0] + dir[0]) - X, dy = P.Y(p[1] + dir[1]) - Y, L = Math.hypot(dx, dy);
    if (!(L > 0) || !fin(X) || !fin(Y)) return;
    const ux = dx / L, uy = dy / L, s = o.size || 9, w = s * 0.72;
    const tx = X + ux * s / 2, ty = Y + uy * s / 2, bx = X - ux * s / 2, by = Y - uy * s / 2;
    P.layers[o.layer || 'marks'].append(el('path', { d: 'M' + tx.toFixed(1) + ',' + ty.toFixed(1) + 'L' + (bx - uy * w / 2).toFixed(1) + ',' + (by + ux * w / 2).toFixed(1) + 'L' + (bx + uy * w / 2).toFixed(1) + ',' + (by - ux * w / 2).toFixed(1) + 'Z',
      style: 'fill:' + (o.color || 'var(--ink)') + ';stroke:var(--plot-bg);stroke-width:1;paint-order:stroke' }));
  }
  /** Many small arrows as two path elements (fast): list of [x, y, dx, dy] in data units. */
  function arrowField(P, list, o = {}) {
    let shafts = '', heads = '';
    for (const [x, y, dx, dy] of list) {
      const x1 = P.X(x), y1 = P.Y(y), x2 = P.X(x + dx), y2 = P.Y(y + dy);
      const L = Math.hypot(x2 - x1, y2 - y1);
      if (!(L > 0.8) || !fin(L)) continue;
      const ux = (x2 - x1) / L, uy = (y2 - y1) / L;
      const hl = clamp(L * 0.38, 2.2, 6.5), hw = hl * 0.75;
      const hx = x2 - ux * hl, hy = y2 - uy * hl;
      shafts += 'M' + x1.toFixed(1) + ',' + y1.toFixed(1) + 'L' + hx.toFixed(1) + ',' + hy.toFixed(1);
      heads += 'M' + x2.toFixed(1) + ',' + y2.toFixed(1) + 'L' + (hx - uy * hw / 2).toFixed(1) + ',' + (hy + ux * hw / 2).toFixed(1) + 'L' + (hx + uy * hw / 2).toFixed(1) + ',' + (hy - ux * hw / 2).toFixed(1) + 'Z';
    }
    const c = o.color || 'var(--ink-2)';
    const g = el('g', { style: 'opacity:' + (o.opacity ?? 1) });
    if (shafts) g.append(el('path', { d: shafts, style: 'fill:none;stroke:' + c + ';stroke-width:' + (o.width || 1.3) + ';stroke-linecap:round' }));
    if (heads) g.append(el('path', { d: heads, style: 'fill:' + c + ';stroke:none' }));
    P.layers[o.layer || 'curves'].append(g);
  }
  /** Persistent TeX labels on a plot: created once, then moved. */
  function texLabels(P) {
    const map = new Map();
    let used = new Set();
    return {
      begin() { used = new Set(); },
      put(key, x, y, tex, o = {}) {
        if (!fin(x) || !fin(y)) return;
        const w = o.w || 160, h = o.h || 28;
        let L = map.get(key);
        if (!L || L.tex !== tex || L.color !== o.color) {
          if (L) L.fo.remove();
          L = { fo: P.tex(x, y, tex, Object.assign({}, o, { w, h, layer: 'top' })), tex, color: o.color };
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
  /** Start a callback when the node first becomes visible. */
  function whenVisible(node, cb) {
    if (!('IntersectionObserver' in window)) { cb(); return; }
    const io = new IntersectionObserver((ents) => { if (ents.some((e) => e.isIntersecting)) { io.disconnect(); cb(); } }, { threshold: 0.4 });
    io.observe(node);
  }

  /**
   * Contour map of F over the view of P: coloured underlay (low = series-1, high = series-2), level
   * curves with labels. compute(F) samples; draw() appends SVG; levelAt(v) draws one extra level.
   */
  function contourMap(P, o = {}) {
    const cv = underlay(P);
    let pal = palette();
    const nx = o.nx || 150;
    const M = { G: null, lo: 0, hi: 1, levels: [], lines: [], grad90: 1 };
    M.compute = (F, count) => {
      M.G = sampleGrid(P, F, nx);
      const r = robustRange(Array.from(M.G.vals));
      if (!r) { M.levels = []; M.lines = []; M.lo = 0; M.hi = 1; return M; }
      M.lo = r[0]; M.hi = r[1] > r[0] ? r[1] : r[0] + 1;
      M.levels = niceLevels(M.lo, M.hi, count);
      M.lines = M.levels.map((L) => isolines(M.G.vals, M.G.nx, M.G.ny, M.G.X, M.G.Y, L));
      // typical gradient size (for scaling arrows)
      const g = [], W = M.G.nx + 1, hx = (P.x1 - P.x0) / M.G.nx, hy = (P.y1 - P.y0) / M.G.ny;
      for (let j = 1; j < M.G.ny; j += 3) for (let i = 1; i < M.G.nx; i += 3) {
        const v = M.G.vals;
        g.push(Math.hypot((v[j * W + i + 1] - v[j * W + i - 1]) / (2 * hx), (v[(j + 1) * W + i] - v[(j - 1) * W + i]) / (2 * hy)));
      }
      M.grad90 = percentile(g, 0.9) || 1;
      return M;
    };
    M.paint = () => {
      if (!M.G) return;
      const lo = M.lo, sc = 1 / (M.hi - M.lo);
      paintGrid(cv, M.G, (v) => pal.map2d((v - lo) * sc));
    };
    M.draw = (opt = {}) => {
      const d = pathData(P, [].concat(...M.lines));
      svgPath(P, d, 'stroke:var(--ink-2);stroke-width:1;opacity:0.55', 'curves');
      if (opt.labels === false) return;
      // label the longest piece of every other level, avoiding collisions
      const placed = [];
      const every = M.levels.length > 9 ? 2 : 1;
      M.levels.forEach((L, k) => {
        if (k % every) return;
        let best = null, bestLen = 0;
        for (const ln of M.lines[k]) {
          let len = 0;
          for (let i = 1; i < ln.length; i++) len += Math.hypot(P.X(ln[i][0]) - P.X(ln[i - 1][0]), P.Y(ln[i][1]) - P.Y(ln[i - 1][1]));
          if (len > bestLen) { bestLen = len; best = ln; }
        }
        if (!best || bestLen < 70) return;
        for (const frac of [0.5, 0.25, 0.75, 0.1, 0.9]) {
          const p = best[Math.floor((best.length - 1) * frac)];
          const px = P.X(p[0]), py = P.Y(p[1]);
          if (px < P.pl + 14 || px > P.W - P.pr - 14 || py < P.pt + 10 || py > P.H - P.pb - 8) continue;
          if (placed.some((q) => Math.hypot(q[0] - px, q[1] - py) < 46)) continue;
          placed.push([px, py]);
          P.text(p[0], p[1], fmt(L, 3), { anchor: 'middle', dy: 4, color: 'var(--ink-2)', size: 10, layer: 'labels' });
          break;
        }
      });
    };
    M.line = (L) => (M.G ? isolines(M.G.vals, M.G.nx, M.G.ny, M.G.X, M.G.Y, L) : []);
    M.retheme = () => { pal = palette(); M.paint(); };
    window.addEventListener('ma:theme', safe(M.retheme));
    return M;
  }

  // ------------------------------------------------------------------ View3D: a small canvas 3D renderer
  class View3D {
    /** o: aspect (height/width), az, el (radians), label, hint. */
    constructor(parent, o = {}) {
      this.o = Object.assign({ aspect: 0.66, az: 0.62, el: 0.42 }, o);
      this.wrap = el('div', { class: 'w-plot w-mv-3d' });
      this.cv = el('canvas', { tabindex: 0, role: 'img', 'aria-label': this.o.label || MA.t('Rotatable 3D figure. Drag or use the arrow keys to rotate.') });
      this.hint = el('div', { class: 'w-mv-hint', text: this.o.hint || MA.t('drag to rotate · ctrl + scroll or pinch to zoom') });
      this.read = el('div', { class: 'w-readout', hidden: true });
      this.wrap.append(this.cv, this.hint, this.read);
      parent.append(this.wrap);
      this.ctx = this.cv.getContext('2d');
      this.az = this.o.az; this.el = this.o.el; this.zoom = 1;
      this.lo = [-1, -1, -1]; this.hi = [1, 1, 1]; this.half = [1, 1, 1]; this.sp = [2, 2, 2];
      this.labels = ['x', 'y', 'z'];
      this.scene = null; this.overlay = null; this.onClick = null; this.onHover = null;
      this.w = 0; this.h = 0; this.dpr = 1;
      this.pal = palette();
      this.font = MA.cssVar('--font') || 'sans-serif';
      this._events();
      if ('ResizeObserver' in window) new ResizeObserver(safe(() => this.resize())).observe(this.wrap);
      else window.addEventListener('resize', safe(() => this.resize()));
      window.addEventListener('ma:theme', safe(() => { this.pal = palette(); if (this.onTheme) this.onTheme(); this.draw(); }));
      this.resize();
    }
    /** Data bounds; mode 'equal' keeps true proportions, 'graph' gives z a fixed box height. */
    setBounds(lo, hi, mode) {
      const sp = [0, 1, 2].map((i) => hi[i] - lo[i]);
      const m = Math.max(...sp.filter(fin), 1e-12);
      lo = lo.slice(); hi = hi.slice();
      this.flat = [false, false, false];
      for (let i = 0; i < 3; i++) {
        if (!(sp[i] > m * 0.04)) { const c = fin(lo[i] + hi[i]) ? (lo[i] + hi[i]) / 2 : 0; lo[i] = c - m * 0.02; hi[i] = c + m * 0.02; sp[i] = m * 0.04; this.flat[i] = c; }
      }
      this.lo = lo; this.hi = hi; this.sp = sp;
      if (mode === 'graph') { const mx = Math.max(sp[0], sp[1]); this.half = [sp[0] / mx, sp[1] / mx, 0.72]; }
      else this.half = sp.map((s) => s / m);
      this.mode = mode;
    }
    /** Data -> box coordinates. */
    B(x, y, z) {
      return [((x - this.lo[0]) / this.sp[0] * 2 - 1) * this.half[0], ((y - this.lo[1]) / this.sp[1] * 2 - 1) * this.half[1], ((z - this.lo[2]) / this.sp[2] * 2 - 1) * this.half[2]];
    }
    /** Box-coordinate scale factors (box units per data unit) for directions. */
    get k() { return [2 * this.half[0] / this.sp[0], 2 * this.half[1] / this.sp[1], 2 * this.half[2] / this.sp[2]]; }
    basis() {
      const ca = Math.cos(this.az), sa = Math.sin(this.az), ce = Math.cos(this.el), se = Math.sin(this.el);
      this.D3 = [ce * ca, ce * sa, se];
      this.R3 = [-sa, ca, 0];
      this.U3 = [-se * ca, -se * sa, ce];
      const rad = Math.hypot(this.half[0], this.half[1], this.half[2]);
      this.dist = rad * 7;
      const key = this.w + ',' + this.h + ',' + this.half.join(',');
      if (key !== this._fitKey) {
        // scale chosen so that the box fits at the starting orientation (kept fixed while rotating)
        this._fitKey = key;
        const a0 = this.o.az, e0 = this.o.el;
        const R0 = [-Math.sin(a0), Math.cos(a0)], U0 = [-Math.sin(e0) * Math.cos(a0), -Math.sin(e0) * Math.sin(a0), Math.cos(e0)];
        let mx = 1e-9, my = 1e-9;
        for (const X of [-this.half[0], this.half[0]]) for (const Y of [-this.half[1], this.half[1]]) for (const Z of [-this.half[2], this.half[2]]) {
          mx = Math.max(mx, Math.abs(X * R0[0] + Y * R0[1]));
          my = Math.max(my, Math.abs(X * U0[0] + Y * U0[1] + Z * U0[2]));
        }
        this.fit = Math.min((this.w / 2 - 48) / mx, (this.h / 2 - 34) / my) / 1.1;
      }
      this.sc = this.zoom * this.fit;
      this.cx = this.w / 2; this.cy = this.h / 2;
      const L = [-0.45 * this.R3[0] + 0.6 * this.U3[0] + 0.66 * this.D3[0], -0.45 * this.R3[1] + 0.6 * this.U3[1] + 0.66 * this.D3[1], -0.45 * this.R3[2] + 0.6 * this.U3[2] + 0.66 * this.D3[2]];
      const n = Math.hypot(L[0], L[1], L[2]);
      this.light = [L[0] / n, L[1] / n, L[2] / n];
    }
    /** Box coordinates -> [screen x, screen y, depth (larger = nearer), perspective factor]. */
    P(X, Y, Z) {
      const r = this.R3, u = this.U3, d = this.D3;
      const sx = X * r[0] + Y * r[1], sy = X * u[0] + Y * u[1] + Z * u[2], dp = X * d[0] + Y * d[1] + Z * d[2];
      const f = this.dist / (this.dist - dp);
      return [this.cx + this.sc * f * sx, this.cy - this.sc * f * sy, dp, f];
    }
    resize() {
      const w = Math.max(240, Math.round(this.wrap.clientWidth || 640));
      const h = Math.round(w * this.o.aspect);
      const dpr = Math.min(2.5, window.devicePixelRatio || 1);
      if (w === this.w && h === this.h && dpr === this.dpr) return;
      this.w = w; this.h = h; this.dpr = dpr;
      this.cv.width = Math.round(w * dpr); this.cv.height = Math.round(h * dpr);
      this.draw();
    }
    render() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => { this._raf = 0; this.draw(); });
    }
    reset() { this.az = this.o.az; this.el = this.o.el; this.zoom = 1; this.render(); }
    draw() {
      try { this._draw(); } catch (e) { console.warn('[multivar 3D]', e); }
    }
    _draw() {
      const ctx = this.ctx;
      if (!this.w) return;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.fillStyle = css(this.pal['plot-bg']);
      ctx.fillRect(0, 0, this.w, this.h);
      this.basis();
      this.drawPanes();
      const prims = this.scene ? this.scene(this) || [] : [];
      prims.sort((a, b) => a.d - b.d);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      for (const p of prims) this.prim(ctx, p);
      this.drawTicks();
      if (this.overlay) this.overlay(this, ctx);
      this.drawn = prims;
    }
    /** Draw one primitive: q (polygon), l (segment), a (arrow), p (point), t (text). */
    prim(ctx, p) {
      if (p.k === 'q') {
        const s = p.s;
        ctx.beginPath(); ctx.moveTo(s[0], s[1]);
        for (let i = 2; i < s.length; i += 2) ctx.lineTo(s[i], s[i + 1]);
        ctx.closePath();
        ctx.fillStyle = p.fill; ctx.fill();
        if (p.seam) { ctx.strokeStyle = p.seam; ctx.lineWidth = 0.7; ctx.stroke(); }
        if (p.edges) { ctx.strokeStyle = p.edgeColor; ctx.lineWidth = p.edgeWidth || 0.6; ctx.beginPath(); for (const e of p.edges) { ctx.moveTo(e[0], e[1]); ctx.lineTo(e[2], e[3]); } ctx.stroke(); }
        if (p.segs) { ctx.strokeStyle = p.segColor; ctx.lineWidth = p.segWidth || 1.2; ctx.beginPath(); for (const e of p.segs) { ctx.moveTo(e[0], e[1]); ctx.lineTo(e[2], e[3]); } ctx.stroke(); }
      } else if (p.k === 'l') {
        ctx.strokeStyle = p.color; ctx.lineWidth = p.width || 1;
        ctx.beginPath(); ctx.moveTo(p.x1, p.y1); ctx.lineTo(p.x2, p.y2); ctx.stroke();
      } else if (p.k === 'a') {
        const L = Math.hypot(p.x2 - p.x1, p.y2 - p.y1);
        if (!(L > 1)) return;
        const ux = (p.x2 - p.x1) / L, uy = (p.y2 - p.y1) / L, w = p.width || 2;
        const hl = Math.min(L * 0.45, 7 + 1.6 * w), hw = hl * 0.7;
        ctx.strokeStyle = p.color; ctx.fillStyle = p.color; ctx.lineWidth = w;
        ctx.beginPath(); ctx.moveTo(p.x1, p.y1); ctx.lineTo(p.x2 - ux * hl * 0.85, p.y2 - uy * hl * 0.85); ctx.stroke();
        const hx = p.x2 - ux * hl, hy = p.y2 - uy * hl;
        ctx.beginPath(); ctx.moveTo(p.x2, p.y2); ctx.lineTo(hx - uy * hw / 2, hy + ux * hw / 2); ctx.lineTo(hx + uy * hw / 2, hy - ux * hw / 2); ctx.closePath(); ctx.fill();
        if (p.label) this.text(p.label, p.x2 + ux * 11, p.y2 + uy * 11, p.color, 'bold 13px', 'center');
      } else if (p.k === 'p') {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r || 4.5, 0, 2 * Math.PI);
        ctx.fillStyle = p.fill; ctx.fill();
        ctx.lineWidth = 2; ctx.strokeStyle = css(this.pal['plot-bg']); ctx.stroke();
      } else if (p.k === 't') {
        this.text(p.text, p.x, p.y, p.color, p.font || '12px', p.align || 'center');
      }
    }
    text(str, x, y, color, font, align) {
      const ctx = this.ctx;
      ctx.font = (font || '11px') + ' ' + this.font;
      ctx.textAlign = align || 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 3; ctx.strokeStyle = css(this.pal['plot-bg']); ctx.lineJoin = 'round';
      ctx.strokeText(str, x, y);
      ctx.fillStyle = color; ctx.fillText(str, x, y);
    }
    /** The three box faces that face away from the viewer, with grid lines at the ticks. */
    drawPanes() {
      const ctx = this.ctx, h = this.half, pal = this.pal;
      this.ticks = [0, 1, 2].map((i) => (this.flat && this.flat[i] !== false ? [this.flat[i]] : MA.ticks(this.lo[i], this.hi[i], i === 2 ? 4 : 5).values.filter((v) => v >= this.lo[i] - 1e-9 && v <= this.hi[i] + 1e-9)));
      const tb = (i, v) => ((v - this.lo[i]) / this.sp[i] * 2 - 1) * h[i];
      const faces = [];
      for (let ax = 0; ax < 3; ax++) for (const s of [-1, 1]) {
        const n = [0, 0, 0]; n[ax] = s;
        if (n[0] * this.D3[0] + n[1] * this.D3[1] + n[2] * this.D3[2] >= 0) continue; // faces the viewer
        faces.push([ax, s]);
      }
      ctx.lineWidth = 1;
      const fill = css(mix(pal['plot-bg'], pal.ink, pal.dark ? 0.05 : 0.025));
      for (const [ax, s] of faces) {
        const a = (ax + 1) % 3, b = (ax + 2) % 3;
        const corner = (ua, ub) => { const q = [0, 0, 0]; q[ax] = s * h[ax]; q[a] = ua; q[b] = ub; return this.P(q[0], q[1], q[2]); };
        const c = [corner(-h[a], -h[b]), corner(h[a], -h[b]), corner(h[a], h[b]), corner(-h[a], h[b])];
        ctx.beginPath(); ctx.moveTo(c[0][0], c[0][1]); for (let i = 1; i < 4; i++) ctx.lineTo(c[i][0], c[i][1]); ctx.closePath();
        ctx.fillStyle = fill; ctx.fill();
        ctx.strokeStyle = css(pal.grid); ctx.beginPath();
        for (const v of this.ticks[a]) { const p = corner(tb(a, v), -h[b]), q = corner(tb(a, v), h[b]); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); }
        for (const v of this.ticks[b]) { const p = corner(-h[a], tb(b, v)), q = corner(h[a], tb(b, v)); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); }
        ctx.stroke();
        ctx.strokeStyle = css(pal.axis); ctx.beginPath(); ctx.moveTo(c[0][0], c[0][1]); for (let i = 1; i < 4; i++) ctx.lineTo(c[i][0], c[i][1]); ctx.closePath(); ctx.stroke();
      }
    }
    /** Tick labels on outer edges of the box (x, y on the floor's front edges, z on the leftmost vertical edge). */
    drawTicks() {
      const h = this.half, pal = this.pal;
      const tb = (i, v) => ((v - this.lo[i]) / this.sp[i] * 2 - 1) * h[i];
      const c0 = this.P(0, 0, 0);
      const zf = this.el >= 0 ? -h[2] : h[2];
      const placed = [];
      const free = (x, y, r) => { if (placed.some((q) => Math.abs(q[0] - x) < r && Math.abs(q[1] - y) < 11)) return false; placed.push([x, y]); return true; };
      const lab = (i, edge, offAxis) => {
        const mid = this.P(...edge(0));
        let ox = mid[0] - c0[0], oy = mid[1] - c0[1];
        const L = Math.hypot(ox, oy) || 1; ox /= L; oy /= L;
        const col = css(pal['ink-3']);
        for (const v of this.ticks[i]) {
          const p = this.P(...edge(tb(i, v)));
          const s = fmt(v, 3), x = p[0] + ox * 13, y = p[1] + oy * 11;
          if (free(x, y, 6 + 3.2 * s.length)) this.text(s, x, y, col, '10px', 'center');
        }
        const e1 = this.P(...edge(h[i]));
        const tx = (mid[0] + e1[0]) / 2 + ox * 30, ty = (mid[1] + e1[1]) / 2 + oy * 26;
        const top = this.P(...edge(h[i])), bot = this.P(...edge(-h[i]));
        const hi = top[1] < bot[1] ? top : bot;
        this.text(this.labels[i], offAxis ? hi[0] + ox * 13 : tx, offAxis ? hi[1] - 17 : ty, css(pal['ink-2']), 'italic 13px', 'center');
      };
      const sy = this.D3[1] >= 0 ? h[1] : -h[1], sx = this.D3[0] >= 0 ? h[0] : -h[0];
      lab(0, (t) => [t, sy, zf]);
      lab(1, (t) => [sx, t, zf]);
      // z: the vertical edge furthest left on screen
      let best = null, bx = Infinity;
      for (const ex of [-h[0], h[0]]) for (const ey of [-h[1], h[1]]) {
        const p = this.P(ex, ey, 0);
        if (p[0] < bx) { bx = p[0]; best = [ex, ey]; }
      }
      lab(2, (t) => [best[0], best[1], t], true);
    }
    _events() {
      const cv = this.cv, pts = new Map();
      let last = null, moved = 0, downT = 0, pinch0 = 0, zoom0 = 1;
      const off = () => this.hint.classList.add('off');
      cv.addEventListener('pointerdown', safe((e) => {
        try { cv.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
        pts.set(e.pointerId, [e.clientX, e.clientY]);
        if (pts.size === 1) { last = [e.clientX, e.clientY]; moved = 0; downT = performance.now(); }
        if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch0 = Math.hypot(a[0] - b[0], a[1] - b[1]); zoom0 = this.zoom; }
      }));
      cv.addEventListener('pointermove', safe((e) => {
        if (!pts.has(e.pointerId)) {
          if (this.onHover && e.pointerType === 'mouse') { const r = cv.getBoundingClientRect(); this.onHover(e.clientX - r.left, e.clientY - r.top); }
          return;
        }
        pts.set(e.pointerId, [e.clientX, e.clientY]);
        if (pts.size >= 2) {
          const [a, b] = [...pts.values()];
          const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
          if (pinch0 > 0) { this.zoom = clamp(zoom0 * d / pinch0, 0.5, 4); this.render(); }
          moved += 10; off();
          return;
        }
        const dx = e.clientX - last[0], dy = e.clientY - last[1];
        last = [e.clientX, e.clientY];
        moved += Math.abs(dx) + Math.abs(dy);
        if (moved < 3) return;
        off();
        this.az -= dx * 0.0095;
        this.el = clamp(this.el + dy * 0.0095, -1.52, 1.52);
        if (this.onHover) this.onHover(null);
        this.render();
      }));
      const up = safe((e) => {
        if (!pts.has(e.pointerId)) return;
        pts.delete(e.pointerId);
        if (!pts.size && moved < 5 && performance.now() - downT < 600 && this.onClick) { const r = cv.getBoundingClientRect(); this.onClick(e.clientX - r.left, e.clientY - r.top); }
        if (pts.size === 1) last = [...pts.values()][0];
      });
      cv.addEventListener('pointerup', up);
      cv.addEventListener('pointercancel', up);
      cv.addEventListener('pointerleave', safe(() => { if (this.onHover && !pts.size) this.onHover(null); }));
      cv.addEventListener('wheel', safe((e) => {
        if (!e.ctrlKey && !e.metaKey) return;
        e.preventDefault(); off();
        this.zoom = clamp(this.zoom * Math.exp(-e.deltaY * 0.0035), 0.5, 4);
        this.render();
      }), { passive: false });
      cv.addEventListener('dblclick', safe(() => this.reset()));
      cv.addEventListener('keydown', safe((e) => {
        const k = e.key;
        if (k === 'ArrowLeft') this.az += 0.08; else if (k === 'ArrowRight') this.az -= 0.08;
        else if (k === 'ArrowUp') this.el = clamp(this.el - 0.08, -1.52, 1.52); else if (k === 'ArrowDown') this.el = clamp(this.el + 0.08, -1.52, 1.52);
        else if (k === '+' || k === '=') this.zoom = clamp(this.zoom * 1.15, 0.5, 4); else if (k === '-' || k === '_') this.zoom = clamp(this.zoom / 1.15, 0.5, 4);
        else if (k === '0' || k === 'Home') { this.reset(); e.preventDefault(); return; } else return;
        e.preventDefault(); off();
        this.render();
      }));
    }
    /** Readout text in the corner (null hides it). */
    say(txt) { if (txt === null || txt === undefined) { this.read.hidden = true; return; } this.read.hidden = false; this.read.textContent = txt; }
    /** Front-most drawn quad (with .pick data) under a screen point. */
    pick(x, y) {
      const prims = this.drawn || [];
      for (let i = prims.length - 1; i >= 0; i--) {
        const p = prims[i];
        if (p.k !== 'q' || !p.pick) continue;
        const s = p.s;
        let inside = false;
        for (let a = 0, b = s.length - 2; a < s.length; b = a, a += 2) {
          if ((s[a + 1] > y) !== (s[b + 1] > y) && x < (s[b] - s[a]) * (y - s[a + 1]) / (s[b + 1] - s[a + 1]) + s[a]) inside = !inside;
        }
        if (inside) return p.pick;
      }
      return null;
    }
    /** Vertical colour bar at the right edge. */
    colorBar(ramp, lo, hi, title, mid) {
      const ctx = this.ctx, pal = this.pal;
      const x = this.w - 30, h = Math.min(150, this.h * 0.42), y = 30;
      for (let i = 0; i < h; i++) { ctx.fillStyle = css(ramp(1 - i / h)); ctx.fillRect(x, y + i, 10, 1.2); }
      ctx.strokeStyle = css(pal.rule); ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, 10, h);
      const col = css(pal['ink-3']);
      this.text(fmt(hi, 3), x - 4, y + 2, col, '10px', 'right');
      this.text(fmt(lo, 3), x - 4, y + h - 2, col, '10px', 'right');
      if (mid !== undefined) this.text(fmt(mid, 3), x - 4, y + h / 2, col, '10px', 'right');
      this.text(title, x + 5, y - 13, css(pal['ink-2']), 'italic 12px', 'center');
    }
  }

  /** Lambert shading (two-sided, slightly darker on the back): base [r,g,b] -> css colour. */
  function shadeCss(view, base, n) {
    const L = view.light;
    const dl = Math.abs(n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
    const facing = n[0] * view.D3[0] + n[1] * view.D3[1] + n[2] * view.D3[2];
    const k = (0.5 + 0.56 * dl) * (facing < 0 ? 0.84 : 1);
    return 'rgb(' + Math.min(255, base[0] * k | 0) + ',' + Math.min(255, base[1] * k | 0) + ',' + Math.min(255, base[2] * k | 0) + ')';
  }

  // ------------------------------------------------------------------ surface
  MA.widget('surface', (stage, cfg) => {
    const sl = sliderSetup(cfg);
    const isGraph = C.has(cfg.f);
    if (!isGraph && !(C.has(cfg.fx) && C.has(cfg.fy) && C.has(cfg.fz))) throw new Error('surface: ' + MA.t('give f (a graph z = f(x, y)) or fx, fy, fz (a parametric surface in u, v)'));
    const vars = (isGraph ? ['x', 'y'] : ['u', 'v']).concat(sl.names);
    const F = isGraph ? [compile(cfg.f, vars, 'f')] : [compile(cfg.fx, vars, 'fx'), compile(cfg.fy, vars, 'fy'), compile(cfg.fz, vars, 'fz')];
    const ur = isGraph ? C.range(cfg.x, [-2, 2]) : C.range(cfg.u, [0, 2 * Math.PI]);
    const vr = isGraph ? C.range(cfg.y, [-2, 2]) : C.range(cfg.v, [0, Math.PI]);
    let colorMode = C.str(cfg.color, 'height');
    if (!['height', 'gauss', 'mean', 'plain'].includes(colorMode)) throw new Error('surface: ' + MA.t('color must be height, gauss, mean or plain'));
    let showContours = C.bool(cfg.contours, false);
    const n = clamp(C.int(cfg.resolution, 40), 6, 100);
    let tangentOn = isGraph && C.has(cfg.tangent);
    let tp = isGraph ? (C.has(cfg.tangent) ? point(cfg.tangent, '0,0', 'tangent') : [(ur[0] + ur[1]) / 2, (vr[0] + vr[1]) / 2]) : null;
    if (tp) tp = [clamp(tp[0], ur[0], ur[1]), clamp(tp[1], vr[0], vr[1])];
    const scope = Object.assign({}, sl.values);
    const pos = isGraph
      ? (u, v) => { scope.x = u; scope.y = v; return [u, v, F[0].f(scope)]; }
      : (u, v) => { scope.u = u; scope.v = v; return [F[0].f(scope), F[1].f(scope), F[2].f(scope)]; };
    const fz = (x, y) => { scope.x = x; scope.y = y; return F[0].f(scope); };

    MA.ui.title(stage, cfg.title);
    const view = new View3D(stage, { aspect: 0.68, label: isGraph ? MA.t('Rotatable graph of z = f(x, y)') : MA.t('Rotatable parametric surface') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    let D = null; // sampled data

    /** Curvatures at parameter (u, v) by central differences. */
    function curv(u, v) {
      const hu = 1e-3 * span(ur), hv = 1e-3 * span(vr);
      if (isGraph) {
        const f0 = fz(u, v), fxp = fz(u + hu, v), fxm = fz(u - hu, v), fyp = fz(u, v + hv), fym = fz(u, v - hv);
        const fx = (fxp - fxm) / (2 * hu), fy = (fyp - fym) / (2 * hv);
        const fxx = (fxp - 2 * f0 + fxm) / (hu * hu), fyy = (fyp - 2 * f0 + fym) / (hv * hv);
        const fxy = (fz(u + hu, v + hv) - fz(u + hu, v - hv) - fz(u - hu, v + hv) + fz(u - hu, v - hv)) / (4 * hu * hv);
        const w = 1 + fx * fx + fy * fy;
        return { K: (fxx * fyy - fxy * fxy) / (w * w), H: ((1 + fy * fy) * fxx - 2 * fx * fy * fxy + (1 + fx * fx) * fyy) / (2 * Math.pow(w, 1.5)), fx, fy };
      }
      const r0 = pos(u, v), rup = pos(u + hu, v), rum = pos(u - hu, v), rvp = pos(u, v + hv), rvm = pos(u, v - hv);
      const rpp = pos(u + hu, v + hv), rpm = pos(u + hu, v - hv), rmp = pos(u - hu, v + hv), rmm = pos(u - hu, v - hv);
      const ru = [0, 1, 2].map((i) => (rup[i] - rum[i]) / (2 * hu)), rv = [0, 1, 2].map((i) => (rvp[i] - rvm[i]) / (2 * hv));
      const ruu = [0, 1, 2].map((i) => (rup[i] - 2 * r0[i] + rum[i]) / (hu * hu)), rvv = [0, 1, 2].map((i) => (rvp[i] - 2 * r0[i] + rvm[i]) / (hv * hv));
      const ruv = [0, 1, 2].map((i) => (rpp[i] - rpm[i] - rmp[i] + rmm[i]) / (4 * hu * hv));
      const nn = [ru[1] * rv[2] - ru[2] * rv[1], ru[2] * rv[0] - ru[0] * rv[2], ru[0] * rv[1] - ru[1] * rv[0]];
      const nl = Math.hypot(nn[0], nn[1], nn[2]);
      const E = ru[0] * ru[0] + ru[1] * ru[1] + ru[2] * ru[2], Fv = ru[0] * rv[0] + ru[1] * rv[1] + ru[2] * rv[2], G = rv[0] * rv[0] + rv[1] * rv[1] + rv[2] * rv[2];
      const dt = E * G - Fv * Fv;
      if (!(nl > 1e-12) || !(dt > 1e-20)) return { K: NaN, H: NaN };
      const L = (ruu[0] * nn[0] + ruu[1] * nn[1] + ruu[2] * nn[2]) / nl, M = (ruv[0] * nn[0] + ruv[1] * nn[1] + ruv[2] * nn[2]) / nl, N = (rvv[0] * nn[0] + rvv[1] * nn[1] + rvv[2] * nn[2]) / nl;
      return { K: (L * N - M * M) / dt, H: (E * N - 2 * Fv * M + G * L) / (2 * dt) };
    }

    /** Sample the surface: vertices, bounds, colour values, contour segments. */
    function sample() {
      const N1 = n + 1;
      const P3 = new Array(N1 * N1);
      const U = (i) => ur[0] + span(ur) * i / n, V = (j) => vr[0] + span(vr) * j / n;
      for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) {
        let p;
        try { p = pos(U(i), V(j)); } catch (e) { p = [NaN, NaN, NaN]; }
        P3[j * N1 + i] = p.every(fin) ? p : null;
      }
      const ok = P3.filter(Boolean);
      if (!ok.length) throw new Error(MA.t('the surface has no finite points in this range'));
      let lo, hi, clipZ = null;
      if (isGraph) {
        const r = robustRange(ok.map((p) => p[2]));
        lo = [ur[0], vr[0], r[0]]; hi = [ur[1], vr[1], r[1]];
        if (r[2]) clipZ = [r[0], r[1]];
        if (!(hi[2] - lo[2] > 1e-9 * Math.max(1, Math.abs(lo[2])))) { lo[2] -= 1; hi[2] += 1; }
      } else {
        const rs = [0, 1, 2].map((k) => robustRange(ok.map((p) => p[k])));
        lo = rs.map((r) => r[0]); hi = rs.map((r) => r[1]);
      }
      view.setBounds(lo, hi, isGraph ? 'graph' : 'equal');
      // values for colouring
      const val = new Float64Array(N1 * N1).fill(NaN);
      let curvOK = true;
      if (colorMode === 'gauss' || colorMode === 'mean') {
        for (let j = 0; j <= n; j++) for (let i = 0; i <= n; i++) {
          if (!P3[j * N1 + i]) continue;
          let c;
          try { c = curv(U(i), V(j)); } catch (e) { c = { K: NaN, H: NaN }; }
          val[j * N1 + i] = colorMode === 'gauss' ? c.K : c.H;
        }
        curvOK = val.some(fin);
      } else {
        for (let k = 0; k < P3.length; k++) if (P3[k]) val[k] = P3[k][2];
      }
      let vlo = lo[2], vhi = hi[2];
      if (colorMode === 'gauss' || colorMode === 'mean') {
        // curvatures of a surface of size L are of order 1/L; far below that they are finite-difference noise
        // (H ≈ 5e-6 on a catenoid), and stretching the scale to the noise would shade a surface with H = 0
        const L = Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]) || 1;
        const m = percentile(Array.from(val).map(Math.abs), 0.95);
        if (m < 1e-4 / L) val.forEach((v, k) => { if (fin(v)) val[k] = 0; });
        vhi = m >= 1e-4 / L ? m : 1 / L; vlo = -vhi;
      }
      // contour segments per cell (levels of z)
      const levels = showContours ? niceLevels(lo[2], hi[2], 11) : [];
      const zv = new Float64Array(N1 * N1);
      for (let k = 0; k < P3.length; k++) zv[k] = P3[k] ? P3[k][2] : NaN;
      const cellSegs = new Array(n * n);
      const floorSegs = [];
      if (levels.length) {
        for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
          const a = P3[j * N1 + i], b = P3[j * N1 + i + 1], c = P3[(j + 1) * N1 + i + 1], d = P3[(j + 1) * N1 + i];
          if (!(a && b && c && d)) continue;
          for (const L of levels) {
            const segs = cellSegments(a[2], b[2], c[2], d[2], L);
            if (!segs) continue;
            for (const [p, q] of segs) {
              const at = (s) => { const u = s[0], v = s[1]; return [0, 1, 2].map((k) => (1 - u) * (1 - v) * a[k] + u * (1 - v) * b[k] + u * v * c[k] + (1 - u) * v * d[k]); };
              const A = at(p), B = at(q);
              (cellSegs[j * n + i] = cellSegs[j * n + i] || []).push([A, B]);
              if (isGraph) floorSegs.push([A, B, L]);
            }
          }
        }
      }
      D = { P3, N1, val, vlo, vhi, clipZ, levels, cellSegs, floorSegs, curvOK, U, V };
    }

    function baseColour(pal, t) {
      if (colorMode === 'plain') return pal['series-1'];
      if (colorMode === 'height') return pal.height(t);
      return pal.diverge(t);
    }

    view.scene = (vw) => {
      if (!D) return [];
      const pal = vw.pal;
      const { P3, N1, val, vlo, vhi, clipZ } = D;
      const prims = [];
      const B = P3.map((p) => (p ? vw.B(p[0], p[1], p[2]) : null));
      const S = B.map((b) => (b ? vw.P(b[0], b[1], b[2]) : null));
      const mesh = Math.max(1, Math.round(n / 20));
      const meshCol = pal.dark ? 'rgba(0,0,0,0.30)' : 'rgba(20,25,43,0.16)';
      const segCol = css(pal.dark ? pal.ink : pal.ink, 0.85);
      const zmin = clipZ ? clipZ[0] - 0.05 * (clipZ[1] - clipZ[0]) : -Infinity, zmax = clipZ ? clipZ[1] + 0.05 * (clipZ[1] - clipZ[0]) : Infinity;
      for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) {
        const k00 = j * N1 + i, k10 = k00 + 1, k11 = k00 + N1 + 1, k01 = k00 + N1;
        const a = S[k00], b = S[k10], c = S[k11], d = S[k01];
        if (!(a && b && c && d)) continue;
        if (clipZ && [k00, k10, k11, k01].some((q) => P3[q][2] < zmin || P3[q][2] > zmax)) continue;
        const A = B[k00], Bb = B[k10], Cc = B[k11], Dd = B[k01];
        const e1 = [Cc[0] - A[0], Cc[1] - A[1], Cc[2] - A[2]], e2 = [Dd[0] - Bb[0], Dd[1] - Bb[1], Dd[2] - Bb[2]];
        let nrm = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
        const nl = Math.hypot(nrm[0], nrm[1], nrm[2]) || 1;
        nrm = [nrm[0] / nl, nrm[1] / nl, nrm[2] / nl];
        let vs = 0, vn = 0;
        for (const q of [k00, k10, k11, k01]) if (fin(val[q])) { vs += val[q]; vn++; }
        const vv = vn ? vs / vn : NaN;
        const t = fin(vv) ? (vv - vlo) / (vhi - vlo || 1) : NaN;
        const base = fin(t) || colorMode === 'plain' ? baseColour(pal, t) : pal.neutral;
        const fill = shadeCss(vw, base, nrm);
        const q = { k: 'q', d: (a[2] + b[2] + c[2] + d[2]) / 4, s: [a[0], a[1], b[0], b[1], c[0], c[1], d[0], d[1]], fill, seam: fill, pick: [i, j] };
        const edges = [];
        if (j % mesh === 0) edges.push([a[0], a[1], b[0], b[1]]);
        if (i % mesh === 0) edges.push([a[0], a[1], d[0], d[1]]);
        if (j === n - 1) edges.push([d[0], d[1], c[0], c[1]]);
        if (i === n - 1) edges.push([b[0], b[1], c[0], c[1]]);
        if (edges.length) { q.edges = edges; q.edgeColor = meshCol; }
        const cs = D.cellSegs[j * n + i];
        if (cs) {
          q.segs = cs.map(([p1, p2]) => { const s1 = vw.P(...vw.B(...p1)), s2 = vw.P(...vw.B(...p2)); return [s1[0], s1[1], s2[0], s2[1]]; });
          q.segColor = segCol; q.segWidth = 1.3;
        }
        prims.push(q);
      }
      // contour map on the floor of the box
      if (D.floorSegs.length) {
        const zf = vw.el >= 0 ? vw.lo[2] : vw.hi[2];
        for (const [p1, p2, L] of D.floorSegs) {
          const s1 = vw.P(...vw.B(p1[0], p1[1], zf)), s2 = vw.P(...vw.B(p2[0], p2[1], zf));
          const col = colorMode === 'height' ? css(pal.height((L - vlo) / (vhi - vlo || 1))) : css(pal['ink-3']);
          prims.push({ k: 'l', x1: s1[0], y1: s1[1], x2: s2[0], y2: s2[1], d: Math.min(s1[2], s2[2]) - 0.01, color: col, width: 1.3 });
        }
      }
      if (tangentOn && isGraph) tangentPrims(vw, prims);
      return prims;
    };
    view.overlay = (vw) => {
      if (!D || colorMode === 'plain') return;
      const pal = vw.pal;
      if (colorMode === 'height') vw.colorBar(pal.height, D.vlo, D.vhi, 'z');
      else if (D.curvOK) vw.colorBar(pal.diverge, D.vlo, D.vhi, colorMode === 'gauss' ? 'K' : 'H', 0);
    };

    /** Tangent plane at (a, b) as translucent quads, the point, and the normal vector. */
    let T = null;
    function tangentInfo() {
      const [a, b] = tp;
      const h = 1e-5 * Math.max(span(ur), span(vr));
      const z0 = fz(a, b);
      const p = MA.num.snap((fz(a + h, b) - fz(a - h, b)) / (2 * h), z0), q = MA.num.snap((fz(a, b + h) - fz(a, b - h)) / (2 * h), z0);
      let c = { K: NaN, H: NaN };
      try { c = curv(a, b); } catch (e) { /* shown as – */ }
      T = { a, b, z0, p, q, K: c.K, H: c.H };
      return T;
    }
    function tangentPrims(vw, prims) {
      const t = tangentInfo();
      if (![t.z0, t.p, t.q].every(fin)) return;
      const pal = vw.pal;
      let w = 0.26 * Math.max(span(ur), span(vr));
      const zs = vw.sp[2];
      if (Math.abs(t.p) + Math.abs(t.q) > 0) w = Math.min(w, 0.55 * zs / (Math.abs(t.p) + Math.abs(t.q)));
      const m = 12, fillc = css(pal.accent, 0.42), edge = css(pal.accent, 0.95);
      const Z = (x, y) => t.z0 + t.p * (x - t.a) + t.q * (y - t.b);
      for (let j = 0; j < m; j++) for (let i = 0; i < m; i++) {
        const xs = [t.a - w + 2 * w * i / m, t.a - w + 2 * w * (i + 1) / m], ys = [t.b - w + 2 * w * j / m, t.b - w + 2 * w * (j + 1) / m];
        const c = [[xs[0], ys[0]], [xs[1], ys[0]], [xs[1], ys[1]], [xs[0], ys[1]]].map(([x, y]) => vw.P(...vw.B(x, y, Z(x, y))));
        const q = { k: 'q', d: (c[0][2] + c[1][2] + c[2][2] + c[3][2]) / 4 + 0.004, s: [].concat(...c.map((p) => [p[0], p[1]])), fill: fillc };
        const edges = [];
        if (j === 0) edges.push([c[0][0], c[0][1], c[1][0], c[1][1]]);
        if (j === m - 1) edges.push([c[3][0], c[3][1], c[2][0], c[2][1]]);
        if (i === 0) edges.push([c[0][0], c[0][1], c[3][0], c[3][1]]);
        if (i === m - 1) edges.push([c[1][0], c[1][1], c[2][0], c[2][1]]);
        if (edges.length) { q.edges = edges; q.edgeColor = edge; q.edgeWidth = 1.4; }
        prims.push(q);
      }
      const P0 = vw.B(t.a, t.b, t.z0);
      const s0 = vw.P(...P0);
      prims.push({ k: 'p', x: s0[0], y: s0[1], r: 5, fill: css(pal.accent), d: s0[2] + 0.05 });
      // normal (−f_x, −f_y, 1), drawn in box coordinates so it looks perpendicular to the plane
      const kk = vw.k;
      const nb = [-t.p * kk[2] / kk[0], -t.q * kk[2] / kk[1], 1];
      const nl = Math.hypot(nb[0], nb[1], nb[2]);
      const tip = [P0[0] + 0.42 * nb[0] / nl, P0[1] + 0.42 * nb[1] / nl, P0[2] + 0.42 * nb[2] / nl];
      const s1 = vw.P(...tip);
      prims.push({ k: 'a', x1: s0[0], y1: s0[1], x2: s1[0], y2: s1[1], color: css(pal.accent), width: 2.2, d: Math.max(s0[2], s1[2]) + 0.05, label: 'n' });
    }

    function affineTeX(t) {
      const term = (c, v, a) => {
        if (Math.abs(c) < 1e-12) return '';
        const sh = Math.abs(a) < 1e-12 ? v : '(' + v + (a > 0 ? ' - ' : ' + ') + tn(Math.abs(a), 3) + ')';
        return (c < 0 ? ' - ' : ' + ') + (Math.abs(Math.abs(c) - 1) < 1e-12 ? '' : tn(Math.abs(c), 4) + '\\,') + sh;
      };
      const body = tn(t.z0, 4) + term(t.p, 'x', t.a) + term(t.q, 'y', t.b);
      return 'z = ' + body.replace(/^0 \+ /, '').replace(/^0 - /, '-');
    }
    function describe() {
      const parts = [];
      if (tangentOn && isGraph && T) {
        parts.push(MA.ui.kv('(x_0, y_0) =', '(' + fmt(T.a, 3) + ', ' + fmt(T.b, 3) + ')'), MA.ui.kv('f_x =', fmt(T.p, 4)), MA.ui.kv('f_y =', fmt(T.q, 4)));
        parts.push({ tex: affineTeX(T) });
        parts.push(MA.ui.kv('K =', fmt(T.K, 4), true), MA.ui.kv('H =', fmt(T.H, 4), true));
      } else if (colorMode === 'gauss') {
        parts.push(el('span', { class: 'w-mv-note', text: MA.t('Gaussian curvature K: orange where the surface is dome-like (K > 0), blue where it is saddle-like (K < 0).') }));
      } else if (colorMode === 'mean') {
        parts.push(el('span', { class: 'w-mv-note', text: MA.t('Mean curvature H (its sign depends on the choice of normal); H = 0 everywhere for a minimal surface.') }));
      } else if (isGraph) {
        parts.push(el('span', { class: 'w-mv-note', text: MA.t('Hover over the surface to read off values; turn on the tangent plane and click to move it.') }));
      } else {
        parts.push(el('span', { class: 'w-mv-note', text: MA.t('Hover over the surface to read off values.') }));
      }
      if ((colorMode === 'gauss' || colorMode === 'mean') && D && !D.curvOK) parts.push(el('span', { class: 'w-mv-warn', text: MA.t('curvature could not be computed here') }));
      info.set(...parts);
    }
    function redraw() { if (tangentOn && isGraph) tangentInfo(); view.render(); describe(); }
    function rebuild() {
      try { sample(); } catch (e) { D = null; info.set(el('span', { class: 'w-mv-warn', text: e.message })); view.render(); return; }
      redraw();
    }

    // hover read-out and click to move the tangent point
    view.onHover = (x, y) => {
      if (x === null || !D) { view.say(null); return; }
      const pk = view.pick(x, y);
      if (!pk) { view.say(null); return; }
      const u = D.U(pk[0] + 0.5), v = D.V(pk[1] + 0.5);
      const p = pos(u, v);
      let s = (isGraph ? '' : 'u = ' + fmt(u, 3) + ', v = ' + fmt(v, 3) + '   ') + 'x = ' + fmt(p[0], 3) + ', y = ' + fmt(p[1], 3) + ', z = ' + fmt(p[2], 4);
      if (colorMode === 'gauss' || colorMode === 'mean') { const c = curv(u, v); s += '   ' + (colorMode === 'gauss' ? 'K' : 'H') + ' = ' + fmt(colorMode === 'gauss' ? c.K : c.H, 4); }
      view.say(s);
    };
    view.onClick = (x, y) => {
      if (!isGraph || !tangentOn || !D) return;
      const pk = view.pick(x, y);
      if (!pk) return;
      tp = [D.U(pk[0] + 0.5), D.V(pk[1] + 0.5)];
      sx.set(tp[0]); sy.set(tp[1]);
      redraw();
    };

    // controls
    MA.ui.select(bar, { label: MA.t('Colour'), value: colorMode, options: [['height', MA.t('height z')], ['gauss', MA.t('Gaussian curvature K')], ['mean', MA.t('mean curvature H')], ['plain', MA.t('plain')]],
      onChange: safe((v) => { colorMode = v; rebuild(); }) });
    MA.ui.toggle(bar, { label: MA.t('Contours'), value: showContours, onChange: safe((v) => { showContours = v; rebuild(); }) });
    let sx = null, sy = null;
    if (isGraph) {
      MA.ui.toggle(bar, { label: MA.t('Tangent plane'), value: tangentOn, onChange: safe((v) => { tangentOn = v; showEl(sx.el, v); showEl(sy.el, v); showEl(bar2, v || sl.specs.length > 0); redraw(); }) });
      sx = MA.ui.slider(bar2, { label: 'x_0', min: ur[0], max: ur[1], step: span(ur) / 200, value: tp[0], onInput: safe((v) => { tp[0] = v; redraw(); }) });
      sy = MA.ui.slider(bar2, { label: 'y_0', min: vr[0], max: vr[1], step: span(vr) / 200, value: tp[1], onInput: safe((v) => { tp[1] = v; redraw(); }) });
      showEl(sx.el, tangentOn); showEl(sy.el, tangentOn);
      showEl(bar2, tangentOn || sl.specs.length > 0);
    }
    MA.ui.button(bar, { label: MA.t('Reset view'), onClick: safe(() => view.reset()) });
    if (sl.specs.length) MA.ui.sliders(bar2, sl.specs, safe((vals) => { Object.assign(scope, vals); rebuild(); }));
    if (!bar2.children.length) bar2.remove();
    rebuild();
  });

  // ------------------------------------------------------------------ frenet
  MA.widget('frenet', (stage, cfg) => {
    const sl = sliderSetup(cfg);
    const vars = ['t'].concat(sl.names);
    const R = [compile(cfg.fx, vars, 'fx'), compile(cfg.fy, vars, 'fy'), compile(cfg.fz, vars, 'fz')];
    const tr = C.range(cfg.t, [0, 4 * Math.PI]);
    const scope = Object.assign({}, sl.values);
    let ser = null;
    try { ser = R.map((q) => MA.expr.taylor(q.ast, 't')); } catch (e) { ser = null; }
    const r = (t) => { scope.t = t; return [R[0].f(scope), R[1].f(scope), R[2].f(scope)]; };
    let t0 = tr[0] + 0.3 * span(tr);
    let showCircle = true, showPlane = false;
    const M = 600;
    let S = null; // samples

    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: '\\mathbf T', color: 'var(--series-2)' }, { label: '\\mathbf N', color: 'var(--series-3)' }, { label: '\\mathbf B', color: 'var(--series-4)' },
      { label: MA.t('osculating circle'), color: 'var(--series-3)' }]);
    const view = new View3D(stage, { aspect: 0.66, label: MA.t('Rotatable space curve with its Frenet frame') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);

    /** r, r', r'', r''' at t (Taylor arithmetic: exact derivatives; finite differences as a fallback). */
    function derivs(t) {
      if (ser) {
        try {
          const c = ser.map((s) => s(scope, t, 3));
          const out = [c.map((q) => q[0]), c.map((q) => q[1]), c.map((q) => 2 * q[2]), c.map((q) => 6 * q[3])];
          if (out.every((v) => v.every(fin))) return out;
        } catch (e) { /* fall back */ }
      }
      const h = 1e-3 * Math.max(1, span(tr) / 10);
      const p = [-2, -1, 0, 1, 2].map((k) => r(t + k * h));
      const d = (fnc) => [0, 1, 2].map(fnc);
      return [p[2], d((i) => (p[3][i] - p[1][i]) / (2 * h)), d((i) => (p[3][i] - 2 * p[2][i] + p[1][i]) / (h * h)), d((i) => (p[4][i] - 2 * p[3][i] + 2 * p[1][i] - p[0][i]) / (2 * h * h * h))];
    }
    const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    const nrm3 = (a) => Math.hypot(a[0], a[1], a[2]);
    function frame(t) {
      const [p, d1, d2, d3] = derivs(t);
      const sp = nrm3(d1);
      const b = cross(d1, d2), bl = nrm3(b);
      const T = sp > 0 ? d1.map((q) => q / sp) : null;
      const kappa = sp > 0 ? bl / (sp * sp * sp) : NaN;
      if (!T || !(bl > 1e-9 * Math.max(1e-300, sp * sp * sp) * 1e-3) || kappa < 1e-9) return { p, T, N: null, B: null, kappa: T ? 0 : NaN, tau: NaN, speed: sp };
      const B = b.map((q) => q / bl);
      const N = cross(B, T);
      return { p, T, N, B, kappa, tau: dot3(b, d3) / (bl * bl), speed: sp };
    }
    function sampleCurve() {
      const pts = [];
      const len = [0];
      for (let i = 0; i <= M; i++) {
        let p;
        try { p = r(tr[0] + span(tr) * i / M); } catch (e) { p = [NaN, NaN, NaN]; }
        pts.push(p.every(fin) ? p : null);
        if (i) { const a = pts[i - 1]; len.push(len[i - 1] + (a && pts[i] ? Math.hypot(pts[i][0] - a[0], pts[i][1] - a[1], pts[i][2] - a[2]) : 0)); }
      }
      const ok = pts.filter(Boolean);
      if (ok.length < 2) throw new Error(MA.t('the curve has no finite points in this range'));
      const rs = [0, 1, 2].map((k) => robustRange(ok.map((p) => p[k])));
      view.setBounds(rs.map((q) => q[0]), rs.map((q) => q[1]), 'equal');
      // arc length with Simpson's rule on |r'| (finer than the chords above)
      S = { pts, len };
    }
    /** Arc length from the start of the range to t (Gauss–Kronrod on |r'|). */
    const arcLen = (t) => quad((s) => nrm3(derivs(s)[1]), tr[0], t, 1e-8, 60);

    view.scene = (vw) => {
      if (!S) return [];
      const pal = vw.pal, prims = [];
      const B = S.pts.map((p) => (p ? vw.B(p[0], p[1], p[2]) : null));
      const Sc = B.map((b) => (b ? vw.P(b[0], b[1], b[2]) : null));
      const zf = vw.el >= 0 ? -vw.half[2] : vw.half[2];
      const shadow = css(pal['ink-3'], 0.35);
      let dmin = Infinity, dmax = -Infinity;
      for (const s of Sc) if (s) { dmin = Math.min(dmin, s[2]); dmax = Math.max(dmax, s[2]); }
      for (let i = 0; i < M; i++) {
        const a = Sc[i], b = Sc[i + 1];
        if (!a || !b) continue;
        const dd = (a[2] + b[2]) / 2;
        const fog = dmax > dmin ? (dd - dmin) / (dmax - dmin) : 1;
        prims.push({ k: 'l', x1: a[0], y1: a[1], x2: b[0], y2: b[1], d: dd, color: css(mix(pal['plot-bg'], pal['series-1'], 0.45 + 0.55 * fog)), width: 2.6 * a[3] });
        const sa = vw.P(B[i][0], B[i][1], zf), sb = vw.P(B[i + 1][0], B[i + 1][1], zf);
        prims.push({ k: 'l', x1: sa[0], y1: sa[1], x2: sb[0], y2: sb[1], d: Math.min(sa[2], sb[2]) - 1, color: shadow, width: 1.2 });
      }
      const f = frame(t0);
      if (!f.p.every(fin)) return prims;
      const k = vw.k;
      const P0 = vw.B(...f.p);
      const s0 = vw.P(...P0);
      const Lb = 0.42; // arrow length in box units (equal scaling, so the frame stays orthonormal on screen)
      const dir = (v) => { const w = [v[0] * k[0], v[1] * k[1], v[2] * k[2]]; const L = nrm3(w) || 1; return w.map((q) => q / L); };
      if (f.N && showPlane) {
        const tt = dir(f.T), nn = dir(f.N), m = 4, hs = 0.62;
        for (let j = 0; j < m; j++) for (let i = 0; i < m; i++) {
          const cs = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => {
            const u = -hs + 2 * hs * a / m, v = -hs + 2 * hs * b / m;
            return vw.P(P0[0] + u * tt[0] + v * nn[0], P0[1] + u * tt[1] + v * nn[1], P0[2] + u * tt[2] + v * nn[2]);
          });
          const q = { k: 'q', d: (cs[0][2] + cs[1][2] + cs[2][2] + cs[3][2]) / 4, s: [].concat(...cs.map((p) => [p[0], p[1]])), fill: css(pal.ink, pal.dark ? 0.1 : 0.07) };
          const edges = [];
          if (j === 0) edges.push([cs[0][0], cs[0][1], cs[1][0], cs[1][1]]);
          if (j === m - 1) edges.push([cs[3][0], cs[3][1], cs[2][0], cs[2][1]]);
          if (i === 0) edges.push([cs[0][0], cs[0][1], cs[3][0], cs[3][1]]);
          if (i === m - 1) edges.push([cs[1][0], cs[1][1], cs[2][0], cs[2][1]]);
          if (edges.length) { q.edges = edges; q.edgeColor = css(pal['ink-3'], 0.6); q.edgeWidth = 1; }
          prims.push(q);
        }
      }
      if (f.N && showCircle && f.kappa > 0) {
        const rho = 1 / f.kappa;
        const rb = rho * k[0];
        if (fin(rb)) {
          // the whole circle when it is about the size of the box, otherwise an arc of length ±1.1 box units
          const full = rb < 1.1, amax = full ? Math.PI : 1.1 / rb;
          const c = [f.p[0] + rho * f.N[0], f.p[1] + rho * f.N[1], f.p[2] + rho * f.N[2]];
          const pts = [];
          const nseg = 96;
          for (let i = 0; i <= nseg; i++) {
            const a = -amax + 2 * amax * i / nseg;
            const q = [0, 1, 2].map((m) => c[m] + rho * (-Math.cos(a) * f.N[m] + Math.sin(a) * f.T[m]));
            pts.push(vw.P(...vw.B(...q)));
          }
          const col = css(pal['series-3'], 0.85);
          for (let i = 0; i < nseg; i++) prims.push({ k: 'l', x1: pts[i][0], y1: pts[i][1], x2: pts[i + 1][0], y2: pts[i + 1][1], d: (pts[i][2] + pts[i + 1][2]) / 2, color: col, width: 1.4 });
          if (full) { const cc = vw.P(...vw.B(...c)); prims.push({ k: 'p', x: cc[0], y: cc[1], r: 2.6, fill: col, d: cc[2] }); }
        }
      }
      const arrows = [['T', f.T, pal['series-2']], ['N', f.N, pal['series-3']], ['B', f.B, pal['series-4']]];
      for (const [name, v, col] of arrows) {
        if (!v) continue;
        const u = dir(v);
        const s1 = vw.P(P0[0] + Lb * u[0], P0[1] + Lb * u[1], P0[2] + Lb * u[2]);
        prims.push({ k: 'a', x1: s0[0], y1: s0[1], x2: s1[0], y2: s1[1], color: css(col), width: 2.6, d: (s0[2] + s1[2]) / 2 + 0.02, label: name });
      }
      prims.push({ k: 'p', x: s0[0], y: s0[1], r: 5, fill: css(pal.ink), d: s0[2] + 0.03 });
      return prims;
    };

    function describe() {
      const f = frame(t0);
      const parts = [MA.ui.kv('t =', fmt(t0, 4)), MA.ui.kv('\\kappa =', fmt(f.kappa, 4)), MA.ui.kv('\\tau =', fmt(f.tau, 4)), MA.ui.kv("|\\mathbf r'| =", fmt(f.speed, 4))];
      const s = arcLen(t0);
      if (fin(s)) parts.push(MA.ui.kv('s =', fmt(s, 4)));
      if (f.kappa > 0) parts.push(MA.ui.kv(MA.t('radius of curvature'), fmt(1 / f.kappa, 4)));
      info.set(...parts);
      if (!f.N) info2.set(el('span', { class: 'w-mv-warn', text: fin(f.speed) && f.speed > 0 ? MA.t('κ = 0 here: the curve is (momentarily) straight, so N and B are not defined.') : MA.t('r′(t) = 0 or undefined here: no tangent direction.') }));
      else info2.set({ tex: '\\mathbf T = ' + tvec(f.T, 3) }, { tex: '\\mathbf N = ' + tvec(f.N, 3) }, { tex: '\\mathbf B = ' + tvec(f.B, 3) });
    }
    function rebuild() {
      try { sampleCurve(); } catch (e) { S = null; info.set(el('span', { class: 'w-mv-warn', text: e.message })); view.render(); return; }
      view.render(); describe();
    }
    const update = () => { view.render(); describe(); };

    const st = MA.ui.slider(bar, { label: 't', min: tr[0], max: tr[1], step: span(tr) / 1000, value: t0, onInput: safe((v) => { anim.stop(); setPlay(false); t0 = v; update(); }) });
    const anim = MA.anim(safeStep((dt) => {
      t0 = Math.min(tr[1], t0 + dt * span(tr) / 9);
      st.set(t0); update();
      if (t0 >= tr[1]) { setPlay(false); return false; }
      return true;
    }));
    const play = MA.ui.button(bar, { label: MA.t('Play'), primary: true, onClick: safe(() => {
      if (anim.running) { anim.stop(); setPlay(false); return; }
      if (t0 >= tr[1] - 1e-9) t0 = tr[0];
      setPlay(true); anim.play();
    }) });
    const setPlay = (on) => { play.textContent = on ? MA.t('Pause') : MA.t('Play'); };
    MA.ui.toggle(bar2, { label: MA.t('Osculating circle'), value: showCircle, onChange: safe((v) => { showCircle = v; view.render(); }) });
    MA.ui.toggle(bar2, { label: MA.t('Osculating plane'), value: showPlane, onChange: safe((v) => { showPlane = v; view.render(); }) });
    MA.ui.button(bar2, { label: MA.t('Reset view'), onClick: safe(() => view.reset()) });
    if (sl.specs.length) MA.ui.sliders(bar2, sl.specs, safe((vals) => { Object.assign(scope, vals); rebuild(); }));
    rebuild();
  });

  // ------------------------------------------------------------------ contour
  MA.widget('contour', (stage, cfg) => {
    const sl = sliderSetup(cfg);
    const vars = ['x', 'y'].concat(sl.names);
    const Fe = compile(cfg.f, vars, 'f');
    const Ge = C.has(cfg.constraint) ? compile(cfg.constraint, vars, 'constraint') : null;
    const xr = C.range(cfg.x, [-3, 3]), yr = C.range(cfg.y, [-3, 3]);
    const nLev = clamp(C.int(cfg.levels, 14), 1, 60);
    const showGrad = C.bool(cfg.gradient, true);
    let showField = C.bool(cfg.field, false);
    let P0 = point(cfg.point, '1,1', 'point');
    const scope = Object.assign({}, sl.values);
    const f = (x, y) => { scope.x = x; scope.y = y; return Fe.f(scope); };
    const g = Ge ? (x, y) => { scope.x = x; scope.y = y; return Ge.f(scope); } : null;
    let onCurve = !!Ge;
    let theta = Math.PI / 6;

    MA.ui.title(stage, cfg.title);
    const leg = [{ label: MA.t('level curves'), color: 'var(--ink-3)' }];
    if (showGrad) leg.push({ label: '\\nabla f', color: 'var(--series-1)' });
    if (Ge) leg.push({ label: 'g = 0', color: 'var(--series-2)' }, { label: MA.t('∇f ∥ ∇g'), color: 'var(--good)', swatch: true });
    else if (showGrad) leg.push({ label: '\\mathbf u', color: 'var(--series-2)' });
    if (showGrad) leg.push({ label: 'f = f(P)', color: 'var(--accent)' });
    MA.ui.legend(stage, leg);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, height: 460, label: MA.t('Contour map with a draggable point') });
    const CM = contourMap(P);
    const labels = texLabels(P);
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    const H = () => 1e-5 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
    let gLines = [], lag = [], gScale = 1, gScaleG = 1;

    /** Project a point onto g = 0 by Newton steps along ∇g. */
    function project(x, y) {
      for (let k = 0; k < 30; k++) {
        const gv = g(x, y), gg = grad2(g, x, y, H());
        const n2 = gg[0] * gg[0] + gg[1] * gg[1];
        if (!fin(gv) || !(n2 > 1e-24)) return null;
        x -= gv * gg[0] / n2; y -= gv * gg[1] / n2;
        if (Math.abs(gv) < 1e-13 * Math.max(1, Math.abs(x), Math.abs(y))) break;
      }
      return fin(x) && fin(y) && Math.abs(g(x, y)) < 1e-6 * Math.max(1, P.x1 - P.x0) ? [x, y] : null;
    }
    /** Points on g = 0 where ∇f ∥ ∇g (sign changes of fx·gy − fy·gx along the traced curve), classified along the curve. */
    function lagrange() {
      const out = [];
      const crossAt = (p) => { const a = grad2(f, p[0], p[1], H()), b = grad2(g, p[0], p[1], H()); return a[0] * b[1] - a[1] * b[0]; };
      const tol = 1e-3 * (P.x1 - P.x0);
      for (const ln of gLines) {
        const closedLn = ln.length > 3 && Math.hypot(ln[0][0] - ln[ln.length - 1][0], ln[0][1] - ln[ln.length - 1][1]) < 1e-9;
        let hp = NaN;
        for (let i = 0; i < ln.length; i++) {
          const p = ln[i], hv = crossAt(p);
          if (i && fin(hv) && fin(hp) && hv * hp <= 0 && hv !== hp) {
            const prev = ln[i - 1];
            let a = 0, b = 1, ha = hp;
            const at = (sv) => { const q = [prev[0] + (p[0] - prev[0]) * sv, prev[1] + (p[1] - prev[1]) * sv]; return project(q[0], q[1]) || q; };
            for (let it = 0; it < 40; it++) { const m = (a + b) / 2, hm = crossAt(at(m)); if (ha * hm <= 0) b = m; else { a = m; ha = hm; } }
            const q = at((a + b) / 2);
            if (!out.some((o) => Math.hypot(o.x - q[0], o.y - q[1]) < tol)) {
              // compare with points a little way along the curve on either side
              const L = ln.length, k = 4;
              const nb = (j) => (closedLn ? ln[((j % (L - 1)) + (L - 1)) % (L - 1)] : ln[clamp(j, 0, L - 1)]);
              const fa = f(...nb(i - 1 - k)), fb = f(...nb(i + k)), fq = f(q[0], q[1]);
              const kind = fq <= Math.min(fa, fb) ? 'min' : fq >= Math.max(fa, fb) ? 'max' : '';
              out.push({ x: q[0], y: q[1], kind, closed: closedLn });
            }
          }
          hp = hv;
        }
      }
      const res = out.map((q) => {
        const a = grad2(f, q.x, q.y, H()), b = grad2(g, q.x, q.y, H());
        return Object.assign(q, { f: f(q.x, q.y), lambda: (a[0] * b[0] + a[1] * b[1]) / (b[0] * b[0] + b[1] * b[1]) });
      }).filter((q) => fin(q.f));
      const allClosed = gLines.length > 0 && res.length > 0 && res.every((q) => q.closed);
      res.forEach((q) => {
        if (!q.kind) { q.tag = ''; return; }
        const extreme = q.kind === 'max' ? res.every((o) => o.f <= q.f + 1e-12) : res.every((o) => o.f >= q.f - 1e-12);
        q.tag = allClosed && extreme ? q.kind : 'local ' + q.kind;
      });
      return res;
    }
    function compute() {
      CM.compute(f, nLev);
      CM.paint();
      // arrows: the gradient at the starting point gets about a fifth of the view (relative sizes are kept as P moves)
      const g0 = grad2(f, P0[0], P0[1], H()), m0 = Math.hypot(g0[0], g0[1]);
      gScale = 0.2 * Math.min(P.x1 - P.x0, P.y1 - P.y0) / (fin(m0) && m0 > 0 ? Math.max(m0, 0.2 * CM.grad90) : (CM.grad90 || 1));
      if (Ge) {
        const G = sampleGrid(P, g, 160);
        gLines = isolines(G.vals, G.nx, G.ny, G.X, G.Y, 0);
        const gg = [];
        for (const ln of gLines) for (let i = 0; i < ln.length; i += 5) { const q = grad2(g, ln[i][0], ln[i][1], H()); gg.push(Math.hypot(q[0], q[1])); }
        const q0 = grad2(g, P0[0], P0[1], H()), n0 = Math.hypot(q0[0], q0[1]);
        gScaleG = 0.16 * Math.min(P.x1 - P.x0, P.y1 - P.y0) / (fin(n0) && n0 > 0 ? Math.max(n0, 0.3 * (percentile(gg, 0.5) || n0)) : (percentile(gg, 0.5) || 1));
        lag = lagrange();
        if (onCurve) { const q = project(P0[0], P0[1]); if (q) P0 = q; }
      }
    }
    let hP = null, hU = null;
    const rho = () => 0.13 * Math.min(P.x1 - P.x0, P.y1 - P.y0);

    function draw() {
      P.clear();
      labels.begin();
      CM.draw();
      if (showField) {
        const list = [], nx = 17, ny = Math.round(nx * (P.y1 - P.y0) / (P.x1 - P.x0));
        const cell = (P.x1 - P.x0) / nx;
        for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
          const x = P.x0 + (i + 0.5) * cell, y = P.y0 + (j + 0.5) * (P.y1 - P.y0) / ny;
          const q = grad2(f, x, y, H());
          const m = Math.hypot(q[0], q[1]);
          if (!(m > 0) || !fin(m)) continue;
          const L = Math.min(0.85 * cell, gScale * m * 0.55);
          list.push([x - q[0] / m * L / 2, y - q[1] / m * L / 2, q[0] / m * L, q[1] / m * L]);
        }
        arrowField(P, list, { color: 'var(--series-1)', opacity: 0.45, width: 1.1 });
      }
      if (Ge) {
        svgPath(P, pathData(P, gLines), 'stroke:var(--series-2);stroke-width:2.6', 'curves');
        lag.forEach((q, i) => {
          const lv = CM.line(q.f);
          svgPath(P, pathData(P, lv), 'stroke:var(--good);stroke-width:1.4;stroke-dasharray:5 4;opacity:0.9', 'curves');
          P.dot(q.x, q.y, { r: 5.5, color: 'var(--good)' });
          const tag = q.tag ? MA.t(q.tag) + ': ' : '';
          P.text(q.x, q.y, tag + 'f = ' + fmt(q.f, 4), { dx: 9, dy: -9, color: 'var(--good)', size: 11 });
          void i;
        });
      }
      const fP = f(P0[0], P0[1]);
      if (fin(fP) && showGrad) svgPath(P, pathData(P, CM.line(fP)), 'stroke:var(--accent);stroke-width:2', 'curves');
      const gr = grad2(f, P0[0], P0[1], H());
      const parts = showGrad ? [MA.ui.kv('P =', '(' + fmt(P0[0], 3) + ', ' + fmt(P0[1], 3) + ')'), MA.ui.kv('f(P) =', fmt(fP, 4))]
        : [el('span', { class: 'w-mv-note', text: MA.t('Hover over the map to read off f(x, y). Level curves are drawn at equally spaced values: closely packed curves mean a steep slope.') })];
      const parts2 = [];
      if (showGrad && fin(gr[0]) && fin(gr[1])) {
        const gn = Math.hypot(gr[0], gr[1]);
        const cap = 0.42 * Math.min(P.x1 - P.x0, P.y1 - P.y0);
        const gs = gn * gScale > cap ? cap / gn : gScale;
        const tip = [P0[0] + gs * gr[0], P0[1] + gs * gr[1]];
        // tangent line of the level curve through P
        if (gn > 0 && !(Ge && onCurve)) {
          const t = [-gr[1] / gn, gr[0] / gn], L = 0.22 * (P.x1 - P.x0);
          P.line(P0[0] - L * t[0], P0[1] - L * t[1], P0[0] + L * t[0], P0[1] + L * t[1], { color: 'var(--accent)', width: 1.2, dash: '5 4', opacity: 0.8 });
        }
        parts.push({ tex: '\\nabla f(P) = ' + tvec(gr, 4) }, MA.ui.kv('|\\nabla f| =', fmt(gn, 4)));
        if (Ge && onCurve) {
          const gg = grad2(g, P0[0], P0[1], H());
          const ggn = Math.hypot(gg[0], gg[1]);
          if (ggn > 0) {
            const t = [-gg[1] / ggn, gg[0] / ggn];
            const L = 0.3 * (P.x1 - P.x0);
            P.line(P0[0] - L * t[0], P0[1] - L * t[1], P0[0] + L * t[0], P0[1] + L * t[1], { color: 'var(--series-2)', width: 1.2, dash: '2 4' });
            const gsg = ggn * gScaleG > cap ? cap / ggn : gScaleG;
            arrow(P, P0, [P0[0] + gsg * gg[0], P0[1] + gsg * gg[1]], { color: 'var(--series-2)', width: 2.4 });
            const comp = gr[0] * t[0] + gr[1] * t[1];
            arrow(P, P0, [P0[0] + gs * comp * t[0], P0[1] + gs * comp * t[1]], { color: 'var(--series-4)', width: 3.4, dotIfZero: true });
            P.line(tip[0], tip[1], P0[0] + gs * comp * t[0], P0[1] + gs * comp * t[1], { color: 'var(--series-4)', width: 1, dash: '3 3' });
            labels.put('dg', P0[0] + gsg * gg[0], P0[1] + gsg * gg[1], '\\nabla g', { color: 'var(--series-2)', anchor: 'middle', dx: gg[0] / ggn * 16, dy: -gg[1] / ggn * 16, size: 14 });
            parts2.push({ tex: '\\nabla f\\cdot\\hat{\\mathbf t} = ' + tn(comp, 4) }, el('span', { class: 'w-mv-note', text: MA.t('(rate of change of f along g = 0; zero exactly where ∇f ∥ ∇g)') }));
            parts2.push({ tex: '\\lambda \\approx \\frac{\\nabla f\\cdot\\nabla g}{|\\nabla g|^2} = ' + tn((gr[0] * gg[0] + gr[1] * gg[1]) / (ggn * ggn), 4) });
          }
        } else if (!Ge) {
          const u = [Math.cos(theta), Math.sin(theta)];
          const Du = gr[0] * u[0] + gr[1] * u[1];
          const rr = rho();
          arrow(P, P0, [P0[0] + rr * u[0], P0[1] + rr * u[1]], { color: 'var(--series-2)', width: 2 });
          arrow(P, P0, [P0[0] + gs * Du * u[0], P0[1] + gs * Du * u[1]], { color: 'var(--series-2)', width: 4, opacity: 0.55, dotIfZero: false });
          P.line(tip[0], tip[1], P0[0] + gs * Du * u[0], P0[1] + gs * Du * u[1], { color: 'var(--series-2)', width: 1, dash: '3 3' });
          labels.put('u', P0[0] + rr * u[0], P0[1] + rr * u[1], '\\mathbf u', { color: 'var(--series-2)', anchor: 'middle', dx: u[0] * 14, dy: -u[1] * 14, size: 14 });
          parts2.push({ tex: '\\mathbf u = (\\cos\\theta, \\sin\\theta),\\ \\theta = ' + tn(deg(theta), 4) + '^\\circ' }, { tex: 'D_{\\mathbf u}f = \\nabla f\\cdot\\mathbf u = ' + tn(Du, 4) });
          const ang = gn > 0 ? deg(Math.acos(clamp(Du / gn, -1, 1))) : NaN;
          parts2.push(el('span', { class: 'w-mv-note', text: gn > 0 ? MA.t('= |∇f| cos α with α = %s° (largest along ∇f, zero along the level curve)', fmt(ang, 3)) : MA.t('∇f = 0: a critical point') }));
        }
        arrow(P, P0, tip, { color: 'var(--series-1)', width: 2.8, dotIfZero: true });
        if (gn > 0) labels.put('df', tip[0], tip[1], '\\nabla f', { color: 'var(--series-1)', anchor: 'middle', dx: gr[0] / gn * 16, dy: -gr[1] / gn * 16, size: 14 });
      }
      if (Ge && lag.length) {
        lag.forEach((q) => parts2.push({ tex: (q.tag ? '\\text{' + MA.t(q.tag) + ':}\\ ' : '') + 'f(' + tn(q.x, 3) + ', ' + tn(q.y, 3) + ') = ' + tn(q.f, 4) + ',\\ \\lambda = ' + tn(q.lambda, 3) }));
      } else if (Ge) parts2.push(el('span', { class: 'w-mv-note', text: MA.t('No point with ∇f ∥ ∇g on the visible part of g = 0.') }));
      labels.end();
      info.set(...parts);
      info2.set(...parts2);
      showEl(info2.el, parts2.length > 0);
      if (hU) hU.set(P0[0] + rho() * Math.cos(theta), P0[1] + rho() * Math.sin(theta));
    }
    const clampView = (x, y) => [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)];
    if (showGrad) {
      hP = P.handle(P0[0], P0[1], { label: MA.t('Point P'), color: 'var(--accent)',
        constrain: (x, y) => { const q = clampView(x, y); if (Ge && onCurve) { const p = project(q[0], q[1]); return p || P0; } return q; },
        onDrag: safe((x, y) => { P0 = [x, y]; draw(); }) });
      if (!Ge) {
        hU = P.handle(P0[0] + rho() * Math.cos(theta), P0[1] + rho() * Math.sin(theta), { label: MA.t('Direction u'), color: 'var(--series-2)', r: 5.5,
          constrain: (x, y) => { const a = Math.atan2(y - P0[1], x - P0[0]); return [P0[0] + rho() * Math.cos(a), P0[1] + rho() * Math.sin(a)]; },
          onDrag: safe((x, y) => { theta = Math.atan2(y - P0[1], x - P0[0]); draw(); }) });
      }
    }
    if (Ge && showGrad) MA.ui.toggle(bar, { label: MA.t('Stay on g = 0'), value: onCurve, onChange: safe((v) => { onCurve = v; if (v) { const q = project(P0[0], P0[1]); if (q) { P0 = q; hP.set(q[0], q[1]); } } draw(); }) });
    MA.ui.toggle(bar, { label: MA.t('Gradient field'), value: showField, onChange: safe((v) => { showField = v; draw(); }) });
    if (sl.specs.length) MA.ui.sliders(bar, sl.specs, safe((vals) => { Object.assign(scope, vals); compute(); if (hP) hP.set(P0[0], P0[1]); draw(); }));
    if (!bar.children.length) bar.remove();
    P.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      read('x = ' + fmt(x, 3) + '   y = ' + fmt(y, 3) + '   f = ' + fmt(f(x, y), 4) + (g ? '   g = ' + fmt(g(x, y), 3) : ''));
    }));
    compute();
    if (hP) hP.set(P0[0], P0[1]);
    window.addEventListener('ma:theme', safe(() => draw()));
    draw();
  });

  // ------------------------------------------------------------------ vectorfield
  MA.widget('vectorfield', (stage, cfg) => {
    const sl = sliderSetup(cfg);
    const vars = ['x', 'y'].concat(sl.names);
    const Pe = compile(cfg.P, vars, 'P'), Qe = compile(cfg.Q, vars, 'Q');
    const xr = C.range(cfg.x, [-3, 3]), yr = C.range(cfg.y, [-3, 3]);
    let streams = C.bool(cfg.streamlines, false);
    let shadeMode = C.str(cfg.shade, 'none');
    if (!['none', 'divergence', 'curl'].includes(shadeMode)) throw new Error('vectorfield: ' + MA.t('shade must be none, divergence or curl'));
    const hasCurve = C.has(cfg.cx) || C.has(cfg.cy);
    if (hasCurve && !(C.has(cfg.cx) && C.has(cfg.cy))) throw new Error('vectorfield: ' + MA.t('a curve needs both cx and cy'));
    const cvars = ['t'].concat(sl.names);
    const CX = hasCurve ? compile(cfg.cx, cvars, 'cx') : null, CY = hasCurve ? compile(cfg.cy, cvars, 'cy') : null;
    const tr = C.range(cfg.t, [0, 2 * Math.PI]);
    const scope = Object.assign({}, sl.values);
    const F = (x, y) => { scope.x = x; scope.y = y; return [Pe.f(scope), Qe.f(scope)]; };
    const cs = Object.assign({}, sl.values);
    const rc = (t) => { cs.t = t; return [CX.f(cs), CY.f(cs)]; };
    let mode = cfg.mode === 'flux' ? 'flux' : 'work';
    let tt = tr[0] + 0.35 * span(tr);

    MA.ui.title(stage, cfg.title);
    const legBox = el('div');
    stage.append(legBox);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, height: 460, label: MA.t('Vector field with streamlines and a curve') });
    const under = underlay(P);
    const labels = texLabels(P);
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const bar2 = hasCurve ? MA.ui.bar(stage) : null;
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    let pal = palette();
    const h = () => 1e-4 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
    const divAt = (x, y) => { const e = h(); return (F(x + e, y)[0] - F(x - e, y)[0]) / (2 * e) + (F(x, y + e)[1] - F(x, y - e)[1]) / (2 * e); };
    const curlAt = (x, y) => { const e = h(); return (F(x + e, y)[1] - F(x - e, y)[1]) / (2 * e) - (F(x, y + e)[0] - F(x, y - e)[0]) / (2 * e); };
    let D = null;

    function legend() {
      legBox.replaceChildren();
      const items = [{ label: '\\mathbf F = (P, Q)', color: 'var(--ink-2)' }];
      if (streams) items.push({ label: MA.t('streamlines'), color: 'var(--series-1)' });
      if (shadeMode !== 'none') {
        const nm = shadeMode === 'divergence' ? '\\operatorname{div}\\mathbf F' : '\\operatorname{curl}\\mathbf F';
        items.push({ label: nm + ' > 0', color: 'var(--series-2)', swatch: true }, { label: nm + ' < 0', color: 'var(--series-1)', swatch: true });
      }
      if (hasCurve) items.push({ label: mode === 'work' ? '\\mathbf F\\cdot\\mathbf r\' > 0' : '\\mathbf F\\cdot\\mathbf n > 0', color: 'var(--good)' }, { label: '< 0', color: 'var(--bad)' });
      MA.ui.legend(legBox, items);
    }

    /** Evenly spread streamlines (RK4 on the unit direction field, with an occupancy grid). */
    function streamlines(fmax) {
      const W = P.x1 - P.x0, Hh = P.y1 - P.y0;
      const dsep = 0.055 * Math.min(W, Hh), step = dsep / 4;
      const gw = Math.ceil(W / (dsep / 2)), gh = Math.ceil(Hh / (dsep / 2));
      const occ = new Int32Array(gw * gh).fill(-1);
      const cellOf = (x, y) => { const i = Math.floor((x - P.x0) / (dsep / 2)), j = Math.floor((y - P.y0) / (dsep / 2)); return i < 0 || j < 0 || i >= gw || j >= gh ? -1 : j * gw + i; };
      const near = (x, y, id) => {
        const i0 = Math.floor((x - P.x0) / (dsep / 2)), j0 = Math.floor((y - P.y0) / (dsep / 2));
        for (let j = j0 - 1; j <= j0 + 1; j++) for (let i = i0 - 1; i <= i0 + 1; i++) {
          if (i < 0 || j < 0 || i >= gw || j >= gh) continue;
          const o = occ[j * gw + i];
          if (o >= 0 && o !== id) return true;
        }
        return false;
      };
      const dir = (t, p) => { const v = F(p[0], p[1]); const m = Math.hypot(v[0], v[1]); return m > 1e-9 * fmax && fin(m) ? [v[0] / m, v[1] / m] : [0, 0]; };
      const lines = [];
      const rnd = MA.num.rng(7);
      const seeds = [];
      for (let y = P.y0 + dsep * 0.7; y < P.y1; y += dsep * 1.4) for (let x = P.x0 + dsep * 0.7; x < P.x1; x += dsep * 1.4) seeds.push([x + (rnd() - 0.5) * dsep * 0.6, y + (rnd() - 0.5) * dsep * 0.6]);
      for (const s of seeds) {
        if (lines.length > 260) break;
        const c0 = cellOf(s[0], s[1]);
        if (c0 < 0 || near(s[0], s[1], -2)) continue;
        const id = lines.length;
        const trace = (sg) => {
          const pts = [];
          let p = s.slice();
          for (let k = 0; k < 500; k++) {
            const q = MA.num.rk4((t, y) => dir(t, y).map((v) => v * sg), 0, p, step);
            if (!fin(q[0]) || !fin(q[1]) || q[0] < P.x0 || q[0] > P.x1 || q[1] < P.y0 || q[1] > P.y1) break;
            if (Math.hypot(q[0] - p[0], q[1] - p[1]) < step * 0.2) break;
            if (near(q[0], q[1], id)) break;
            if (k > 12 && Math.hypot(q[0] - s[0], q[1] - s[1]) < step * 0.9) { pts.push(s.slice()); break; }
            pts.push(q); p = q;
          }
          return pts;
        };
        const fwd = trace(1), bwd = trace(-1);
        const ln = bwd.reverse().concat([s.slice()], fwd);
        if (ln.length < 6) continue;
        for (const q of ln) { const c = cellOf(q[0], q[1]); if (c >= 0) occ[c] = id; }
        lines.push({ pts: ln, mid: bwd.length });
      }
      return lines;
    }

    function compute() {
      pal = palette();
      const nx = 21, ny = Math.max(6, Math.round(nx * (P.y1 - P.y0) / (P.x1 - P.x0)));
      const cell = (P.x1 - P.x0) / nx;
      const raw = [];
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
        const x = P.x0 + (i + 0.5) * cell, y = P.y0 + (j + 0.5) * (P.y1 - P.y0) / ny;
        let v;
        try { v = F(x, y); } catch (e) { v = [NaN, NaN]; }
        raw.push([x, y, v[0], v[1], Math.hypot(v[0], v[1])]);
      }
      const mags = raw.map((a) => a[4]).filter(fin);
      const f90 = percentile(mags, 0.9) || 1, fmax = Math.max(...mags, 1e-300);
      D = { raw, cell, f90, fmax, lines: streams ? streamlines(fmax) : [], shade: null };
      if (shadeMode !== 'none') {
        const G = sampleGrid(P, shadeMode === 'divergence' ? divAt : curlAt, 110);
        const m = percentile(Array.from(G.vals).map(Math.abs), 0.95);
        D.shade = { G, m: m > 1e-9 ? m : 0 };
      }
      if (hasCurve) curveData();
      paint();
    }
    function paint() {
      const ctx = under.getContext('2d');
      if (!D || !D.shade || !D.shade.m) { under.width = 1; under.height = 1; ctx.clearRect(0, 0, 1, 1); return; }
      const m = D.shade.m;
      paintGrid(under, D.shade.G, (v) => pal.div2d(0.5 + 0.5 * clamp(v / m, -1, 1)));
    }
    /** Samples of the curve with the integrands, cumulative integrals and Green's-theorem checks. */
    function curveData() {
      const N = 800;
      const dr = (t) => { const e = 1e-5 * Math.max(1, span(tr)); const a = rc(t - e), b = rc(t + e); return [(b[0] - a[0]) / (2 * e), (b[1] - a[1]) / (2 * e)]; };
      const work = (t) => { const p = rc(t), d = dr(t), v = F(p[0], p[1]); return v[0] * d[0] + v[1] * d[1]; };
      const flux = (t) => { const p = rc(t), d = dr(t), v = F(p[0], p[1]); return v[0] * d[1] - v[1] * d[0]; };
      const pts = [], wv = [], fv = [];
      for (let i = 0; i <= N; i++) { const t = tr[0] + span(tr) * i / N; pts.push(rc(t)); wv.push(work(t)); fv.push(flux(t)); }
      const cum = (v) => { const c = [0]; for (let i = 1; i <= N; i++) c.push(c[i - 1] + (v[i - 1] + v[i]) / 2 * span(tr) / N); return c; };
      // scale of each integral (∫|integrand|): values far below it are rounding noise, and a double integral that
      // misses the line integral by more than a few per cent means F is not smooth inside C (Green does not apply)
      const absW = quad((t) => Math.abs(work(t)), tr[0], tr[1], 1e-8, 200), absPhi = quad((t) => Math.abs(flux(t)), tr[0], tr[1], 1e-8, 200);
      const W = MA.num.snap(quad(work, tr[0], tr[1], 1e-10, 200), absW), Phi = MA.num.snap(quad(flux, tr[0], tr[1], 1e-10, 200), absPhi);
      const a = pts[0], b = pts[N];
      const closed = a.every(fin) && b.every(fin) && Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-6 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
      let green = null;
      if (closed) {
        // winding number on a grid (scanline crossings) to weight ∬ curl F and ∬ div F
        let xmin = Infinity, xmax = -Infinity, ymin = Infinity, ymax = -Infinity;
        for (const p of pts) { xmin = Math.min(xmin, p[0]); xmax = Math.max(xmax, p[0]); ymin = Math.min(ymin, p[1]); ymax = Math.max(ymax, p[1]); }
        const G = 220, dx = (xmax - xmin) / G, dy = (ymax - ymin) / G;
        let sc = 0, sd = 0;
        for (let j = 0; j < G; j++) {
          const y = ymin + (j + 0.5) * dy;
          const xs = [];
          for (let i = 0; i < N; i++) {
            const p = pts[i], q = pts[i + 1];
            if ((p[1] <= y) !== (q[1] <= y)) xs.push([p[0] + (y - p[1]) / (q[1] - p[1]) * (q[0] - p[0]), q[1] > p[1] ? 1 : -1]);
          }
          if (!xs.length) continue;
          xs.sort((u, v) => u[0] - v[0]);
          let w = 0, k = 0;
          for (let i = 0; i < G; i++) {
            const x = xmin + (i + 0.5) * dx;
            while (k < xs.length && xs[k][0] < x) { w += xs[k][1]; k++; }
            if (!w) continue;
            // crossing upward on the left means the point is inside a counter-clockwise loop: weight -w
            sc += -w * curlAt(x, y); sd += -w * divAt(x, y);
          }
        }
        const curl = sc * dx * dy, div = sd * dx * dy;
        const off = (a, b, s) => !fin(a) || Math.abs(a - b) > 0.02 * Math.max(s, 1e-9);
        green = { curl: MA.num.snap(curl, absW), div: MA.num.snap(div, absPhi), curlOff: off(curl, W, absW), divOff: off(div, Phi, absPhi) };
      }
      const fm = percentile(pts.map((p) => { const v = F(p[0], p[1]); return Math.hypot(v[0], v[1]); }), 0.9);
      const fsc = 0.17 * Math.min(P.x1 - P.x0, P.y1 - P.y0) / (fm > 0 ? fm : 1);
      D.curve = { pts, wv, fv, cw: cum(wv), cf: cum(fv), W, Phi, closed, green, N, dr, fsc };
    }
    function draw() {
      if (!D) return;
      P.clear();
      labels.begin();
      // arrows (lengths ∝ |F|, capped), in four opacity bands
      const bands = [[], [], [], []];
      for (const [x, y, u, v, m] of D.raw) {
        if (!fin(m) || m === 0) continue;
        const L = Math.min(0.9 * D.cell, 0.9 * D.cell * m / D.f90);
        const b = Math.min(3, Math.floor(4 * m / (D.f90 * 1.05)));
        bands[b].push([x - u / m * L / 2, y - v / m * L / 2, u / m * L, v / m * L]);
      }
      const op = streams ? [0.18, 0.26, 0.34, 0.42] : [0.38, 0.55, 0.75, 0.95];
      bands.forEach((list, b) => arrowField(P, list, { color: 'var(--ink-2)', opacity: op[b], width: 1.25 }));
      if (streams) {
        svgPath(P, pathData(P, D.lines.map((l) => l.pts)), 'stroke:var(--series-1);stroke-width:1.4;opacity:0.85', 'curves');
        const heads = [];
        for (const l of D.lines) {
          const i = clamp(l.mid, 1, l.pts.length - 2), p = l.pts[i], q = l.pts[i + 1];
          heads.push([p[0], p[1], (q[0] - p[0]) * 0.01, (q[1] - p[1]) * 0.01]);
        }
        let d = '';
        for (const [x, y, dx, dy] of heads) {
          const X = P.X(x), Y = P.Y(y), L = Math.hypot(P.X(x + dx) - X, P.Y(y + dy) - Y) || 1;
          const ux = (P.X(x + dx) - X) / L, uy = (P.Y(y + dy) - Y) / L;
          d += 'M' + (X + ux * 4).toFixed(1) + ',' + (Y + uy * 4).toFixed(1) + 'L' + (X - ux * 3 - uy * 3.4).toFixed(1) + ',' + (Y - uy * 3 + ux * 3.4).toFixed(1) + 'L' + (X - ux * 3 + uy * 3.4).toFixed(1) + ',' + (Y - uy * 3 - ux * 3.4).toFixed(1) + 'Z';
        }
        if (d) P.layers.curves.append(el('path', { d, style: 'fill:var(--series-1);opacity:0.9' }));
      }
      const parts = [], parts2 = [];
      if (hasCurve && D.curve) {
        const c = D.curve, vals = mode === 'work' ? c.wv : c.fv, cum = mode === 'work' ? c.cw : c.cf;
        // curve coloured by the sign of the integrand
        const pos = [], neg = [];
        let cur = null, sign = 0;
        for (let i = 0; i <= c.N; i++) {
          const s = vals[i] >= 0 ? 1 : -1;
          if (s !== sign) { if (cur && i) cur.push(c.pts[i]); cur = []; (s > 0 ? pos : neg).push(cur); sign = s; }
          cur.push(c.pts[i]);
        }
        svgPath(P, pathData(P, pos), 'stroke:var(--good);stroke-width:3.2', 'marks');
        svgPath(P, pathData(P, neg), 'stroke:var(--bad);stroke-width:3.2', 'marks');
        // orientation of the curve
        for (const fr of [0.12, 0.45, 0.78]) {
          const t = tr[0] + span(tr) * fr, p = rc(t), dv = c.dr(t);
          if (p.every(fin) && dv.every(fin)) head(P, p, dv.map((q) => q * 1e-3), { color: 'var(--ink)', size: 11 });
        }
        // moving point
        const p = rc(tt), d = c.dr(tt), v = F(p[0], p[1]);
        if (p.every(fin)) {
          const sc = c.fsc;
          const dn = Math.hypot(d[0], d[1]) || 1;
          const L = 0.12 * (P.x1 - P.x0);
          const dir = mode === 'work' ? [d[0] / dn, d[1] / dn] : [d[1] / dn, -d[0] / dn];
          arrow(P, p, [p[0] + L * dir[0], p[1] + L * dir[1]], { color: mode === 'work' ? 'var(--series-2)' : 'var(--series-4)', width: 2.4 });
          if (v.every(fin)) arrow(P, p, [p[0] + sc * v[0], p[1] + sc * v[1]], { color: 'var(--series-1)', width: 2.8, dotIfZero: true });
          P.dot(p[0], p[1], { r: 5, color: 'var(--ink)' });
          labels.put('dir', p[0] + L * dir[0], p[1] + L * dir[1], mode === 'work' ? '\\mathbf T' : '\\mathbf n', { color: mode === 'work' ? 'var(--series-2)' : 'var(--series-4)', anchor: 'middle', dx: dir[0] * 13, dy: -dir[1] * 13, size: 14 });
          if (v.every(fin)) { const vn = Math.hypot(v[0], v[1]) || 1; labels.put('F', p[0] + sc * v[0], p[1] + sc * v[1], '\\mathbf F', { color: 'var(--series-1)', anchor: 'middle', dx: v[0] / vn * 13, dy: -v[1] / vn * 13, size: 14 }); }
        }
        const k = Math.round((tt - tr[0]) / span(tr) * c.N);
        const sym = c.closed ? '\\oint_C' : '\\int_C';
        const [ta, tb] = rangeTeX(cfg.t, tr);
        if (mode === 'work') {
          parts.push({ tex: 'W = ' + sym + '\\mathbf F\\cdot d\\mathbf r = \\int_{' + ta + '}^{' + tb + '} (P x\' + Q y\')\\,dt = ' + tn(c.W, 5) });
          parts2.push({ tex: '\\int_{' + ta + '}^{t}\\mathbf F\\cdot d\\mathbf r = ' + tn(cum[k], 4) }, el('span', { class: 'k', text: MA.t('integrand') }), { tex: '\\mathbf F\\cdot\\mathbf r\'(t) = ' + tn(vals[k], 4) });
          // a field singular inside C gives a meaningless grid sum: say why instead of printing it
          if (c.green) parts2.push(c.green.curlOff ? { tex: '\\iint_D \\operatorname{curl}\\mathbf F\\,dA' } : { tex: '\\iint_D \\operatorname{curl}\\mathbf F\\,dA \\approx ' + tn(c.green.curl, 4) }, el('span', { class: 'w-mv-note', text: c.green.curlOff ? MA.t('does not exist here: F is not smooth everywhere inside C, so Green’s theorem does not apply') : MA.t('(Green’s theorem)') }));
        } else {
          parts.push({ tex: '\\Phi = ' + sym + '\\mathbf F\\cdot\\mathbf n\\,ds = \\int_{' + ta + '}^{' + tb + '} (P y\' - Q x\')\\,dt = ' + tn(c.Phi, 5) });
          parts2.push({ tex: '\\int_{' + ta + '}^{t}\\mathbf F\\cdot\\mathbf n\\,ds = ' + tn(cum[k], 4) }, el('span', { class: 'k', text: MA.t('integrand') }), { tex: '\\mathbf F\\cdot\\mathbf n\\,|\\mathbf r\'| = ' + tn(vals[k], 4) });
          if (c.green) parts2.push(c.green.divOff ? { tex: '\\iint_D \\operatorname{div}\\mathbf F\\,dA' } : { tex: '\\iint_D \\operatorname{div}\\mathbf F\\,dA \\approx ' + tn(c.green.div, 4) }, el('span', { class: 'w-mv-note', text: c.green.divOff ? MA.t('does not exist here: F is not smooth everywhere inside C, so the divergence theorem does not apply') : MA.t('(divergence theorem in the plane)') }));
        }
      } else {
        parts.push(el('span', { class: 'w-mv-note', text: MA.t('Hover to read F, div F and curl F at a point.') }));
      }
      if (shadeMode !== 'none' && D.shade && !D.shade.m) parts.push(el('span', { class: 'w-mv-note', text: shadeMode === 'divergence' ? MA.t('div F = 0 everywhere here (no sources or sinks).') : MA.t('curl F = 0 everywhere here (no rotation).') }));
      labels.end();
      info.set(...parts);
      info2.set(...parts2);
      showEl(info2.el, parts2.length > 0);
    }

    MA.ui.toggle(bar, { label: MA.t('Streamlines'), value: streams, onChange: safe((v) => { streams = v; if (v && D && !D.lines.length) D.lines = streamlines(D.fmax); legend(); draw(); }) });
    MA.ui.select(bar, { label: MA.t('Shading'), value: shadeMode, options: [['none', MA.t('none')], ['divergence', MA.t('divergence')], ['curl', MA.t('curl')]], onChange: safe((v) => { shadeMode = v; compute(); legend(); draw(); }) });
    let anim = null, playBtn = null, tSl = null;
    if (hasCurve) {
      MA.ui.seg(bar2, { options: [['work', MA.t('Work')], ['flux', MA.t('Flux')]], value: mode, onChange: safe((v) => { mode = v; legend(); draw(); }) });
      tSl = MA.ui.slider(bar2, { label: 't', min: tr[0], max: tr[1], step: span(tr) / 800, value: tt, onInput: safe((v) => { if (anim) anim.stop(); setPlay(false); tt = v; draw(); }) });
      anim = MA.anim(safeStep((dt) => { tt = Math.min(tr[1], tt + dt * span(tr) / 7); tSl.set(tt); draw(); if (tt >= tr[1]) { setPlay(false); return false; } return true; }));
      playBtn = MA.ui.button(bar2, { label: MA.t('Play'), primary: true, onClick: safe(() => { if (anim.running) { anim.stop(); setPlay(false); return; } if (tt >= tr[1] - 1e-9) tt = tr[0]; setPlay(true); anim.play(); }) });
    }
    const setPlay = (on) => { if (playBtn) playBtn.textContent = on ? MA.t('Pause') : MA.t('Play'); };
    if (sl.specs.length) MA.ui.sliders(bar2 || bar, sl.specs, safe((vals) => { Object.assign(scope, vals); Object.assign(cs, vals); compute(); draw(); }));
    P.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      const v = F(x, y);
      read('F(' + fmt(x, 3) + ', ' + fmt(y, 3) + ') = (' + fmt(v[0], 3) + ', ' + fmt(v[1], 3) + ')   div = ' + fmt(divAt(x, y), 3) + '   curl = ' + fmt(curlAt(x, y), 3));
    }));
    window.addEventListener('ma:theme', safe(() => { pal = palette(); paint(); }));
    legend();
    compute();
    draw();
  });

  // ------------------------------------------------------------------ gradientdescent
  MA.widget('gradientdescent', (stage, cfg) => {
    const Fe = compile(cfg.f, ['x', 'y'], 'f');
    const f = (x, y) => Fe.f({ x, y });
    let start = point(cfg.start, '2,2', 'start');
    let method = C.str(cfg.method, 'gd');
    if (!['gd', 'momentum', 'newton'].includes(method)) throw new Error('gradientdescent: ' + MA.t('method must be gd, momentum or newton'));
    const rate0 = C.has(cfg.rate) ? C.num(cfg.rate) : (method === 'newton' ? 1 : 0.1);
    if (!(rate0 > 0)) throw new Error('gradientdescent: ' + MA.t('rate must be positive'));
    let rate = rate0;
    let beta = 0.8;
    let steps = clamp(C.int(cfg.steps, 30), 1, 500);
    const xr = C.range(cfg.x, [-3, 3]), yr = C.range(cfg.y, [-3, 3]);
    let shown = Infinity; // iterates shown (animation)
    let lossMode = 'f';

    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [{ label: MA.t('iterates'), color: 'var(--series-2)' }, { label: MA.t('start (drag me)'), color: 'var(--accent)' }, { label: MA.t('level curves'), color: 'var(--ink-3)' }]);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, height: 420, label: MA.t('Gradient descent iterates on a contour map') });
    const CM = contourMap(P);
    const read = P.readout();
    const cap = el('div', { class: 'w-mv-cap', text: MA.t('Loss curve') });
    stage.append(cap);
    const sub = el('div', { class: 'w-mv-sub' });
    stage.append(sub);
    const LP = new MA.Plot(sub, { x: [0, steps], y: [0, 1], height: 170, pad: [10, 12, 24, 44], label: MA.t('Loss against iteration') });
    const bar = MA.ui.bar(stage);
    const bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);
    const H = () => 1e-5 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
    let run = null;

    function iterate() {
      let [x, y] = start;
      const xs = [[x, y]], fs = [f(x, y)], gs = [];
      let v = [0, 0], status = 'max', why = '';
      const big = 1e4 * Math.max(P.x1 - P.x0, P.y1 - P.y0);
      for (let k = 0; k < steps; k++) {
        const g = grad2(f, x, y, H());
        gs.push(Math.hypot(g[0], g[1]));
        if (!fin(g[0]) || !fin(g[1])) { status = 'nan'; break; }
        if (Math.hypot(g[0], g[1]) < 1e-10) { status = 'conv'; break; }
        if (method === 'gd') { x -= rate * g[0]; y -= rate * g[1]; }
        else if (method === 'momentum') { v = [beta * v[0] - rate * g[0], beta * v[1] - rate * g[1]]; x += v[0]; y += v[1]; }
        else {
          const Hs = hess2(f, x, y, 1e-3 * Math.max(P.x1 - P.x0, P.y1 - P.y0));
          const det = Hs[0][0] * Hs[1][1] - Hs[0][1] * Hs[1][0];
          if (!(Math.abs(det) > 1e-14) || !fin(det)) { status = 'sing'; break; }
          const sx = (Hs[1][1] * g[0] - Hs[0][1] * g[1]) / det, sy = (-Hs[1][0] * g[0] + Hs[0][0] * g[1]) / det;
          const ev = eigSym2(Hs);
          if (ev[0] <= 0 && !why) why = 'indef';
          x -= rate * sx; y -= rate * sy;
        }
        xs.push([x, y]); fs.push(f(x, y));
        if (!fin(x) || !fin(y) || Math.abs(x) > big || Math.abs(y) > big || !fin(fs[fs.length - 1])) { status = 'div'; break; }
      }
      if (status === 'max') {
        const g = grad2(f, x, y, H());
        gs.push(Math.hypot(g[0], g[1]));
        if (Math.hypot(g[0], g[1]) < 1e-6 * Math.max(1, CM.grad90)) status = 'conv';
      } else if (gs.length < xs.length) { const g = grad2(f, x, y, H()); gs.push(Math.hypot(g[0], g[1])); }
      return { xs, fs, gs, status, why };
    }
    function drawLoss() {
      const n = run.xs.length - 1;
      const k = Math.min(n, shown);
      const vals = lossMode === 'f' ? run.fs : run.gs.map((q) => (q > 0 ? Math.log10(q) : NaN));
      const fv = vals.filter(fin);
      let lo = fv.length ? Math.min(...fv) : 0, hi = fv.length ? Math.max(...fv) : 1;
      if (lossMode === 'f' && fv.length > 2 && run.status === 'div') {
        const s = fv.slice().sort((a, b) => a - b);
        const cap = s[Math.floor(0.9 * (s.length - 1))];
        if (hi > lo + 6 * (cap - lo) && cap > lo) hi = cap + 0.5 * (cap - lo);
      }
      if (!(hi > lo)) { lo -= 1; hi += 1; }
      const pad = 0.08 * (hi - lo);
      LP.setView([0, Math.max(1, steps)], [lo - pad, hi + pad]);
      LP.clear();
      const pts = vals.slice(0, k + 1).map((v, i) => [i, v]);
      LP.path(pts, { color: 'var(--series-2)', width: 2 });
      if (pts.length <= 120) pts.forEach((p) => { if (fin(p[1])) LP.dot(p[0], p[1], { r: 2.4, color: 'var(--series-2)' }); });
      if (fin(vals[k])) LP.dot(k, vals[k], { r: 4.5, color: 'var(--accent)' });
      LP.text(LP.x0, hi + pad, lossMode === 'f' ? 'f(x_k)' : 'log₁₀|∇f(x_k)|', { dx: 6, dy: 12, color: 'var(--ink-3)', size: 11 });
      LP.text(LP.x1, lo - pad, 'k', { dx: -6, dy: -6, anchor: 'end', color: 'var(--ink-3)', size: 11 });
    }
    function draw() {
      P.clear();
      CM.draw();
      const n = run.xs.length - 1, k = Math.min(n, shown);
      const pts = run.xs.slice(0, k + 1);
      P.path(pts, { color: 'var(--series-2)', width: 1.8, layer: 'marks' });
      pts.forEach((p, i) => { if (i && i <= 160) P.dot(p[0], p[1], { r: i === k ? 4.5 : 3, color: 'var(--series-2)' }); });
      drawLoss();
      const last = pts[pts.length - 1];
      const st = run.status;
      const msg = st === 'conv' && k === n ? MA.t('converged after %d steps', n) : st === 'div' && k === n ? MA.t('diverged after %d steps — the step size is too large', n)
        : st === 'nan' && k === n ? MA.t('stopped: the gradient is not defined here') : st === 'sing' && k === n ? MA.t('stopped: the Hessian is singular, Newton’s step is undefined') : MA.t('step %d of %d', k, n);
      info.set(el('span', { class: st === 'div' || st === 'nan' || st === 'sing' ? 'w-mv-warn' : '', text: msg }),
        { tex: '\\mathbf x_{' + k + '} = ' + tvec(last, 4) }, MA.ui.kv('f(\\mathbf x_{' + k + '}) =', fmt(run.fs[k], 5)), MA.ui.kv('|\\nabla f| =', fmt(run.gs[k], 3)));
      // stability from the Hessian at the last iterate
      const Hs = hess2(f, last[0], last[1], 1e-3 * Math.max(P.x1 - P.x0, P.y1 - P.y0));
      const ev = eigSym2(Hs);
      const p2 = [];
      if (ev.every(fin)) {
        p2.push({ tex: '\\text{' + MA.t('Hessian eigenvalues') + '}\\ \\lambda = ' + tn(ev[0], 3) + ',\\ ' + tn(ev[1], 3) });
        if (ev[0] > 1e-9) {
          if (method === 'gd') p2.push({ tex: '\\eta < 2/\\lambda_{\\max} = ' + tn(2 / ev[1], 3) }, el('span', { class: 'w-mv-note', text: MA.t('needed for stability here; condition number %s', fmt(ev[1] / ev[0], 3)) }));
          else if (method === 'momentum') p2.push({ tex: '\\eta < 2(1+\\beta)/\\lambda_{\\max} = ' + tn(2 * (1 + beta) / ev[1], 3) }, el('span', { class: 'w-mv-note', text: MA.t('needed for stability (heavy ball)') }));
          else p2.push(el('span', { class: 'w-mv-note', text: MA.t('positive definite: Newton (η = 1) converges quadratically near here') }));
        } else if (ev[1] > 1e-9) p2.push(el('span', { class: 'w-mv-note', text: MA.t('a saddle direction here (one negative eigenvalue)') }));
      }
      if (run.why === 'indef') p2.push(el('span', { class: 'w-mv-warn', text: MA.t('the Hessian was not positive definite: Newton steps can head for saddles or maxima') }));
      info2.set(...p2);
      showEl(info2.el, p2.length > 0);
    }
    function recompute() { run = iterate(); draw(); }

    const lr = (v) => Math.pow(10, v);
    const lmin = Math.min(-3, Math.floor(Math.log10(rate0) - 1)), lmax = Math.max(0.3, Math.ceil(Math.log10(rate0) * 10 + 2) / 10);
    MA.ui.select(bar, { label: MA.t('Method'), value: method, options: [['gd', MA.t('gradient descent')], ['momentum', MA.t('momentum')], ['newton', MA.t('Newton')]],
      onChange: safe((v) => {
        const was = method;
        method = v;
        if (v === 'newton' && rate < 0.5) { rate = 1; rs.set(0); }
        else if (was === 'newton' && v !== 'newton' && rate >= 0.5) { rate = rate0 < 0.5 ? rate0 : 0.1; rs.set(Math.log10(rate)); }
        showEl(bs.el, v === 'momentum');
        shown = Infinity; recompute();
      }) });
    const rs = MA.ui.slider(bar, { label: '\\eta', min: lmin, max: lmax, step: 'any', value: Math.log10(rate0), fmt: (v) => fmt(lr(v), 3), onInput: safe((v) => { rate = lr(v); shown = Infinity; anim.stop(); recompute(); }) });
    const bs = MA.ui.slider(bar, { label: '\\beta', min: 0, max: 0.99, step: 0.01, value: beta, onInput: safe((v) => { beta = v; shown = Infinity; anim.stop(); recompute(); }) });
    showEl(bs.el, method === 'momentum');
    MA.ui.slider(bar2, { label: MA.t('steps'), min: 1, max: Math.max(100, steps), step: 1, value: steps, fmt: (v) => String(v), onInput: safe((v) => { steps = v; shown = Infinity; anim.stop(); recompute(); }) });
    let acc = 0;
    const anim = MA.anim(safeStep((dt) => {
      acc += dt;
      const per = Math.min(0.25, 4 / Math.max(1, run.xs.length));
      if (acc < per) return true;
      acc = 0; shown += 1; draw();
      if (shown >= run.xs.length - 1) { shown = Infinity; setPlay(false); draw(); return false; }
      return true;
    }));
    const play = MA.ui.button(bar2, { label: MA.t('Play'), primary: true, onClick: safe(() => { if (anim.running) { anim.stop(); shown = Infinity; setPlay(false); draw(); return; } shown = 0; acc = 0; setPlay(true); draw(); anim.play(); }) });
    const setPlay = (on) => { play.textContent = on ? MA.t('Stop') : MA.t('Play'); };
    MA.ui.seg(bar2, { label: MA.t('Loss'), options: [['f', 'f(\\mathbf x_k)'], ['g', '\\log|\\nabla f|']], value: lossMode, onChange: safe((v) => { lossMode = v; draw(); }) });
    MA.ui.button(bar2, { label: MA.t('Reset'), onClick: safe(() => { anim.stop(); setPlay(false); shown = Infinity; start = point(cfg.start, '2,2', 'start'); hS.set(start[0], start[1]); recompute(); }) });
    const hS = P.handle(start[0], start[1], { label: MA.t('Starting point'), color: 'var(--accent)',
      constrain: (x, y) => [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)],
      onDrag: safe((x, y) => { start = [x, y]; anim.stop(); setPlay(false); shown = Infinity; recompute(); }) });
    P.onHover(safe((x, y) => { if (x === null) { read(null); return; } read('x = ' + fmt(x, 3) + '   y = ' + fmt(y, 3) + '   f = ' + fmt(f(x, y), 4)); }));
    CM.compute(f, 14);
    CM.paint();
    window.addEventListener('ma:theme', safe(() => draw()));
    recompute();
  });

  // ------------------------------------------------------------------ region
  MA.widget('region', (stage, cfg) => {
    const hasI = C.has(cfg.lower) || C.has(cfg.upper), hasII = C.has(cfg.left) || C.has(cfg.right);
    if (!hasI && !hasII) throw new Error('region: ' + MA.t('give lower and upper (y between two graphs) or left and right (x between two graphs)'));
    if (hasI && !(C.has(cfg.lower) && C.has(cfg.upper))) throw new Error('region: ' + MA.t('a type I region needs both lower and upper'));
    if (hasII && !(C.has(cfg.left) && C.has(cfg.right))) throw new Error('region: ' + MA.t('a type II region needs both left and right'));
    if (hasII && !(C.has(cfg.c) && C.has(cfg.d))) throw new Error('region: ' + MA.t('a type II region needs c and d (the range of y)'));
    const lowE = hasI ? compile(cfg.lower, ['x'], 'lower') : null, upE = hasI ? compile(cfg.upper, ['x'], 'upper') : null;
    const leftE = hasII ? compile(cfg.left, ['y'], 'left') : null, rightE = hasII ? compile(cfg.right, ['y'], 'right') : null;
    const a = C.num(cfg.a, 0), b = C.num(cfg.b, 1);
    const c = hasII ? C.num(cfg.c) : 0, d = hasII ? C.num(cfg.d) : 1;
    if (hasI && !(b > a)) throw new Error('region: ' + MA.t('need a < b'));
    if (hasII && !(d > c)) throw new Error('region: ' + MA.t('need c < d'));
    const fE = C.has(cfg.f) ? compile(cfg.f, ['x', 'y'], 'f') : null;
    const lower = (x) => lowE.f({ x }), upper = (x) => upE.f({ x }), left = (y) => leftE.f({ y }), right = (y) => rightE.f({ y });
    const fxy = fE ? (x, y) => fE.f({ x, y }) : () => 1;
    let mode = hasI ? 'I' : 'II';
    let s = hasI ? (a + b) / 2 : (c + d) / 2;
    // view
    const xs = [], ys = [];
    if (hasI) for (let i = 0; i <= 80; i++) { const x = a + (b - a) * i / 80; xs.push(x); ys.push(lower(x), upper(x)); }
    if (hasII) for (let i = 0; i <= 80; i++) { const y = c + (d - c) * i / 80; ys.push(y); xs.push(left(y), right(y)); }
    const fx = xs.filter(fin), fy = ys.filter(fin);
    if (!fx.length || !fy.length) throw new Error('region: ' + MA.t('the boundary curves are not defined on this interval'));
    const bx = [Math.min(...fx), Math.max(...fx)], by = [Math.min(...fy), Math.max(...fy)];
    const padx = 0.18 * Math.max(bx[1] - bx[0], by[1] - by[0], 1e-6), pady = padx;
    const xr = C.range(cfg.x, [bx[0] - padx, bx[1] + padx]), yr = C.range(cfg.y, [by[0] - pady, by[1] + pady]);

    MA.ui.title(stage, cfg.title);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, height: 420, label: MA.t('A plane region with a moving slice') });
    P.wrap.classList.add('w-mv-halo');
    const labels = texLabels(P);
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const info2 = MA.ui.info(stage);

    const inner = (u) => (mode === 'I' ? quad((y) => fxy(u, y), lower(u), upper(u), 1e-10, 60) : quad((x) => fxy(x, u), left(u), right(u), 1e-10, 60));
    const total = (m) => (m === 'I' ? quad((x) => quad((y) => fxy(x, y), lower(x), upper(x), 1e-10, 60), a, b, 1e-9, 80) : quad((y) => quad((x) => fxy(x, y), left(y), right(y), 1e-10, 60), c, d, 1e-9, 80));
    const values = {};
    if (hasI) values.I = total('I');
    if (hasII) values.II = total('II');
    const tex = (e) => MA.expr.toTeX(e.ast);
    const fT = fE ? (['bin'].includes(fE.ast.t) && ['+', '-'].includes(fE.ast.op) ? '\\left(' + tex(fE) + '\\right)' : tex(fE)) : '';
    const integralTeX = (m) => (m === 'I'
      ? '\\int_{' + texConst(cfg.a, a) + '}^{' + texConst(cfg.b, b) + '}\\int_{' + tex(lowE) + '}^{' + tex(upE) + '} ' + fT + '\\,dy\\,dx'
      : '\\int_{' + texConst(cfg.c, c) + '}^{' + texConst(cfg.d, d) + '}\\int_{' + tex(leftE) + '}^{' + tex(rightE) + '} ' + fT + '\\,dx\\,dy');
    let warn = '';
    if (hasI) for (let i = 0; i <= 50; i++) { const x = a + (b - a) * i / 50; if (lower(x) > upper(x) + 1e-9) { warn = MA.t('lower(x) > upper(x) somewhere in [a, b]: check the description.'); break; } }
    if (hasII && !warn) for (let i = 0; i <= 50; i++) { const y = c + (d - c) * i / 50; if (left(y) > right(y) + 1e-9) { warn = MA.t('left(y) > right(y) somewhere in [c, d]: check the description.'); break; } }

    let handle = null;
    function draw() {
      P.clear();
      labels.begin();
      const lo = mode === 'I' ? a : c, hi = mode === 'I' ? b : d;
      // boundary curves extended faintly, region shaded
      if (mode === 'I') {
        P.fn(lower, { color: 'var(--ink-3)', width: 1.2, dash: '4 4' });
        P.fn(upper, { color: 'var(--ink-3)', width: 1.2, dash: '4 4' });
        P.area(upper, a, b, { g: lower, color: 'var(--series-1)', opacity: 0.17, samples: 200 });
        P.fn(lower, { domain: [a, b], color: 'var(--series-1)', width: 2.4 });
        P.fn(upper, { domain: [a, b], color: 'var(--series-1)', width: 2.4 });
        P.line(a, lower(a), a, upper(a), { color: 'var(--series-1)', width: 1.6 });
        P.line(b, lower(b), b, upper(b), { color: 'var(--series-1)', width: 1.6 });
        const xl = a + 0.78 * (b - a), e = 1e-3 * (b - a);
        const slope = (fn) => -(P.Y(fn(xl + e)) - P.Y(fn(xl - e))) / (P.X(xl + e) - P.X(xl - e));
        const su = slope(upper), sl = slope(lower);
        labels.put('up', xl, upper(xl), 'y = ' + tex(upE), { color: 'var(--series-1)', anchor: su > 0.25 ? 'end' : su < -0.25 ? 'start' : 'middle', dx: su > 0.25 ? -8 : su < -0.25 ? 8 : 0, dy: -15, size: 13, w: 200 });
        labels.put('lo', xl, lower(xl), 'y = ' + tex(lowE), { color: 'var(--series-1)', anchor: sl > 0.25 ? 'start' : sl < -0.25 ? 'end' : 'middle', dx: sl > 0.25 ? 10 : sl < -0.25 ? -10 : 0, dy: 15, size: 13, w: 200 });
      } else {
        P.param((t) => left(t), (t) => t, yr[0], yr[1], { color: 'var(--ink-3)', width: 1.2, dash: '4 4' });
        P.param((t) => right(t), (t) => t, yr[0], yr[1], { color: 'var(--ink-3)', width: 1.2, dash: '4 4' });
        const poly = [];
        for (let i = 0; i <= 200; i++) { const y = c + (d - c) * i / 200; poly.push([right(y), y]); }
        for (let i = 200; i >= 0; i--) { const y = c + (d - c) * i / 200; poly.push([left(y), y]); }
        P.poly(poly, { fill: 'var(--series-1)', fillOpacity: 0.17 });
        P.param((t) => left(t), (t) => t, c, d, { color: 'var(--series-1)', width: 2.4 });
        P.param((t) => right(t), (t) => t, c, d, { color: 'var(--series-1)', width: 2.4 });
        P.line(left(c), c, right(c), c, { color: 'var(--series-1)', width: 1.6 });
        P.line(left(d), d, right(d), d, { color: 'var(--series-1)', width: 1.6 });
        const yl = c + 0.82 * (d - c);
        labels.put('up', right(yl), yl, 'x = ' + tex(rightE), { color: 'var(--series-1)', anchor: 'start', dx: 10, size: 13, w: 200 });
        labels.put('lo', left(yl), yl, 'x = ' + tex(leftE), { color: 'var(--series-1)', anchor: 'end', dx: -10, size: 13, w: 200 });
      }
      // the slice
      const w = 0.012 * (hi - lo) + 0.004 * (P.x1 - P.x0);
      let ends;
      if (mode === 'I') {
        ends = [lower(s), upper(s)];
        P.rect(s - w / 2, ends[0], w, ends[1] - ends[0], { color: 'var(--series-2)', fillOpacity: 0.35, width: 0 });
        P.line(s, ends[0], s, ends[1], { color: 'var(--series-2)', width: 2.6 });
        P.dot(s, ends[0], { r: 4, color: 'var(--series-2)' }); P.dot(s, ends[1], { r: 4, color: 'var(--series-2)' });
        P.text(s, ends[0], 'y = ' + fmt(ends[0], 3), { dx: 8, dy: 14, color: 'var(--series-2)', size: 11 });
        P.text(s, ends[1], 'y = ' + fmt(ends[1], 3), { dx: 8, dy: -8, color: 'var(--series-2)', size: 11 });
        P.vline(s, { color: 'var(--series-2)', width: 1, dash: '2 4', opacity: 0.6 });
      } else {
        ends = [left(s), right(s)];
        P.rect(ends[0], s - w / 2, ends[1] - ends[0], w, { color: 'var(--series-2)', fillOpacity: 0.35, width: 0 });
        P.line(ends[0], s, ends[1], s, { color: 'var(--series-2)', width: 2.6 });
        P.dot(ends[0], s, { r: 4, color: 'var(--series-2)' }); P.dot(ends[1], s, { r: 4, color: 'var(--series-2)' });
        P.text(ends[0], s, 'x = ' + fmt(ends[0], 3), { dx: -6, dy: -8, anchor: 'end', color: 'var(--series-2)', size: 11 });
        P.text(ends[1], s, 'x = ' + fmt(ends[1], 3), { dx: 6, dy: -8, color: 'var(--series-2)', size: 11 });
        P.hline(s, { color: 'var(--series-2)', width: 1, dash: '2 4', opacity: 0.6 });
      }
      const mid = (ends[0] + ends[1]) / 2;
      if (handle) handle.set(mode === 'I' ? s : mid, mode === 'I' ? mid : s);
      labels.end();
      const V = values[mode];
      const head = fE ? '' : MA.t('Area@@size') + ' = ';
      const parts = [{ tex: (fE ? '' : '\\text{' + head.replace(' = ', '') + '} = ') + integralTeX(mode) + ' = ' + tn(V, 6) }];
      const other = mode === 'I' ? 'II' : 'I';
      if (values[other] !== undefined) {
        const same = Math.abs(values[other] - V) <= 1e-6 * Math.max(1, Math.abs(V));
        parts.push(el('span', { class: same ? 'w-mv-note' : 'w-mv-warn', text: same ? MA.t('the other order gives the same value (Fubini)') : MA.t('the other description gives %s — do they describe the same region?', fmt(values[other], 6)) }));
      }
      if (warn) parts.push(el('span', { class: 'w-mv-warn', text: warn }));
      info.set(...parts);
      const A = inner(s);
      info2.set(mode === 'I'
        ? { tex: 'x = ' + tn(s, 3) + ':\\quad \\int_{' + tn(ends[0], 3) + '}^{' + tn(ends[1], 3) + '} ' + (fE ? fT.replace(/\bx\b/g, 'x') : '1') + '\\,dy = ' + tn(A, 4) }
        : { tex: 'y = ' + tn(s, 3) + ':\\quad \\int_{' + tn(ends[0], 3) + '}^{' + tn(ends[1], 3) + '} ' + (fE ? fT : '1') + '\\,dx = ' + tn(A, 4) },
      el('span', { class: 'w-mv-note', text: mode === 'I' ? MA.t('inner integral at this x (the slice); integrating it over [a, b] gives the total') : MA.t('inner integral at this y (the slice); integrating it over [c, d] gives the total') }));
    }

    if (hasI && hasII) MA.ui.seg(bar, { options: [['I', MA.t('Type I: dy dx')], ['II', MA.t('Type II: dx dy')]], value: mode, onChange: safe((v) => { mode = v; s = v === 'I' ? (a + b) / 2 : (c + d) / 2; sl2.el.remove(); sl2 = mkSlider(); draw(); }) });
    const mkSlider = () => {
      const lo = mode === 'I' ? a : c, hi = mode === 'I' ? b : d;
      const sld = MA.ui.slider(bar, { label: mode === 'I' ? 'x' : 'y', min: lo, max: hi, step: (hi - lo) / 400, value: s, onInput: safe((v) => { anim.stop(); s = v; draw(); }) });
      bar.insertBefore(sld.el, sweep);
      return sld;
    };
    const anim = MA.anim(safeStep((dt) => {
      const lo = mode === 'I' ? a : c, hi = mode === 'I' ? b : d;
      s = Math.min(hi, s + dt * (hi - lo) / 3.5);
      sl2.set(s); draw();
      return s < hi;
    }));
    const sweep = MA.ui.button(bar, { label: MA.t('Sweep'), primary: true, onClick: safe(() => { anim.stop(); s = mode === 'I' ? a : c; anim.play(); }) });
    let sl2 = mkSlider();
    handle = P.handle(s, 0, { label: MA.t('Move the slice'), color: 'var(--accent)', r: 6,
      constrain: (x, y) => {
        if (mode === 'I') { const u = clamp(x, a, b); return [u, (lower(u) + upper(u)) / 2]; }
        const u = clamp(y, c, d); return [(left(u) + right(u)) / 2, u];
      },
      onDrag: safe((x, y) => { anim.stop(); s = mode === 'I' ? x : y; sl2.set(s); draw(); }) });
    P.onHover(safe((x, y) => { if (x === null) { read(null); return; } read('x = ' + fmt(x, 3) + '   y = ' + fmt(y, 3) + (fE ? '   f = ' + fmt(fxy(x, y), 4) : '')); }));
    draw();
  });
})();
