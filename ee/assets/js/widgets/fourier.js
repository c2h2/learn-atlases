/* EE Atlas (engine shared with Maths Atlas) — interactive figures: Fourier series, the heat equation and the wave equation.
     fourier  partial sums S_N f of the 2π-periodic extension of f: presets with exact coefficients, or any
              expression on [−π, π] (Gauss–Legendre quadrature on panels split at the jumps and kinks of f);
              amplitude spectrum (linear or log scale), the Gibbs overshoot next to a jump, mean-square and sup errors
     heat     animated series solution on [0, L] of u_t = k u_xx (Dirichlet ends: sine series; insulated ends:
              cosine series with a₀/2) or of u_tt = c² u_xx released from rest (c = k), with d'Alembert's exact
              solution as a reference for the wave
   See tools/WIDGET_GUIDE.md. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;
  const PI = Math.PI, TAU = 2 * Math.PI;
  const fin = Number.isFinite;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  /** Gibbs constant Si(π)/π − 1/2: next to a jump, S_N f overshoots by this fraction of the jump as N → ∞. */
  const GIBBS = 0.0894898722360836;

  // ================================================================== styles
  (function injectStyle() {
    if (document.getElementById('w-fou-style')) return;
    const s = document.createElement('style');
    s.id = 'w-fou-style';
    s.textContent = [
      '.w-fou-cap{display:flex;flex-wrap:wrap;align-items:center;gap:4px 16px;padding:8px 16px 0;border-top:1px solid var(--rule);font-size:.8125rem;color:var(--ink-3)}',
      '.w-fou-cap .ttl{font-weight:650;color:var(--ink-2)}',
      '.w-fou-cap .k{display:inline-flex;align-items:center;gap:6px}',
      '.w-fou-cap .katex{font-size:1em}',
      '.w-fou-sw{display:inline-block;width:10px;height:10px;border-radius:2px;background:var(--c)}',
      '.w-fou-dot{display:inline-block;width:9px;height:9px;border-radius:50%;box-sizing:border-box;background:var(--c)}',
      '.w-fou-note{color:var(--ink-3)}',
      '.w-fou-formula{min-height:2.6em;align-items:center}',
      '.w-fou-formula .katex{font-size:1.05em}',
    ].join('\n');
    document.head.append(s);
  })();

  // ================================================================== small helpers
  /** Wrap an event handler so that nothing escapes it. */
  function safe(fn) {
    return function () {
      try { return fn.apply(this, arguments); } catch (e) { console.error(e); return undefined; }
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
  /** View-box width: narrower on phones so that tick labels stay legible. */
  const vbW = (stage) => ((stage.clientWidth || 640) < 520 ? 480 : 640);
  const SUBS = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (s, k) => s + String(k).replace(/\d/g, (d) => SUBS[+d]);
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  /** Label of a power of ten: 1, 0.1, 0.01, 0.001, then 10⁻⁴ … */
  const pow10Label = (k) => (k >= -3 && k <= 3 ? MA.fmt(Math.pow(10, k), 4) : '10' + String(k).replace(/[-\d]/g, (c) => SUP[c]));
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const r = a % b; a = b; b = r; } return a || 1; }
  /** Number for TeX: ASCII minus, ×10^k instead of e-notation. */
  function texNum(v, sig) {
    const s = MA.fmt(v, sig || 4);
    if (s === '∞') return '\\infty';
    if (s === '−∞') return '-\\infty';
    if (s === '–') return '\\text{–}';
    const t = s.replace(/−/g, '-');
    const m = /^(-?[\d.]+)e([+-]?\d+)$/.exec(t);
    return m ? m[1] + '\\times 10^{' + (+m[2]) + '}' : t;
  }
  /** x as a multiple of π/4 when it is one ("π/2", "−3π/4"), else a decimal. */
  function fmtX(x) {
    const q = x / (PI / 4), k = Math.round(q);
    if (Math.abs(q - k) > 1e-9 || Math.abs(k) > 64) return MA.fmt(x, 3);
    if (k === 0) return '0';
    const g = gcd(k, 4), num = k / g, den = 4 / g;
    return (num < 0 ? '−' : '') + (Math.abs(num) === 1 ? '' : Math.abs(num)) + 'π' + (den === 1 ? '' : '/' + den);
  }
  /** Fill a legend box (same look as MA.ui.legend, but refreshable; items may be dashed lines or dots). */
  function setLegend(box, items) {
    box.replaceChildren();
    items.forEach((it) => {
      const st = '--c:' + it.color + (it.dash ? ';background:repeating-linear-gradient(90deg,var(--c) 0 4px,transparent 4px 7px)' : '') + (it.opacity ? ';opacity:' + it.opacity : '') +
        (it.wide ? ';height:7px;border-radius:3px' : '');
      const k = el('span', { class: 'k' }, el('span', { class: it.dot ? 'w-fou-dot' : 'ln', style: st }));
      k.append(it.tex || /[\\^_{}]/.test(it.label) ? MA.texEl(it.label) : el('span', { text: it.label }));
      box.append(k);
    });
  }
  /** Pause an animation while its figure is off screen and resume it when it comes back. */
  function pauseOffscreen(node, anim, onChange) {
    if (!('IntersectionObserver' in window)) return;
    let resume = false;
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (!en.isIntersecting && anim.running) { resume = true; anim.stop(); onChange(false); }
      else if (en.isIntersecting && resume) { resume = false; anim.play(); onChange(true); }
    }));
    io.observe(node);
  }
  /** Tick label like plot.js (enough decimals for the step). */
  const tickLabel = (v, step) => (Math.abs(v) < 1e-12 ? '0' : MA.fmt(+v.toFixed(Math.max(0, -Math.floor(Math.log10(step)) + 1)), 6));
  /** Multiples of π/2 (or of π when there would be too many) in [a, b]. */
  function piTickValues(a, b) {
    const step = (b - a) / (PI / 2) > 16 ? PI : PI / 2, out = [];
    for (let v = Math.ceil(a / step - 1e-9) * step; v <= b + 1e-9; v += step) out.push(Math.abs(v) < 1e-12 ? 0 : v);
    return out;
  }
  function piLabel(v) {
    const k = Math.round(v / (PI / 2));
    if (k === 0) return '0';
    const num = k % 2 === 0 ? k / 2 : k, den = k % 2 === 0 ? 1 : 2, n = Math.abs(num);
    return (num < 0 ? '−' : '') + (n === 1 ? '' : n) + 'π' + (den === 2 ? '/2' : '');
  }
  /**
   * Tick labels along the left and bottom edges of a plot made with ticks: false (the axis lines stay at 0, where
   * labels would collide with curves crossing the axes). Call again after every setView.
   */
  function edgeTicks(P, pi, xLabel, yLabel) {
    const L = P.pl, R = P.W - P.pr, T = P.pt, B = P.H - P.pb;
    const tk = el('g', { class: 'tick' });
    const lbl = (x, y, anchor, text) => P.layers.axes.append(el('text', { class: 'lbl', x, y, 'text-anchor': anchor, style: 'fill:var(--ink-2)', text }));
    if (xLabel) lbl(R + 5, (P.y0 <= 0 && P.y1 >= 0 ? P.Y(0) : B) + 4, 'start', xLabel);
    if (yLabel) lbl((P.x0 <= 0 && P.x1 >= 0 ? P.X(0) : L) + 8, T + 14, 'start', yLabel);
    const xt = pi ? null : MA.ticks(P.x0, P.x1, Math.max(4, Math.round(P.W / 80)));
    (pi ? piTickValues(P.x0, P.x1) : xt.values).forEach((v) => {
      const X = P.X(v);
      if (X < L + 4 || X > R - 4) return;
      tk.append(el('text', { x: X, y: B + 15, 'text-anchor': 'middle', text: pi ? piLabel(v) : tickLabel(v, xt.step) }));
    });
    const yt = MA.ticks(P.y0, P.y1, Math.max(3, Math.round(P.H / 60)));
    yt.values.forEach((v) => {
      const Y = P.Y(v);
      if (Y < T + 4 || Y > B - 4) return;
      tk.append(el('text', { x: L - 6, y: Y + 4, 'text-anchor': 'end', text: tickLabel(v, yt.step) }));
    });
    P.layers.axes.append(tk);
  }
  /** One <path> made of many bars [x0, y0, x1, y1] (data units) in a plot layer. */
  function bars(P, rects, style, layer) {
    let d = '';
    for (const r of rects) {
      const X0 = P.X(r[0]), X1 = P.X(r[2]), Y0 = P.Y(r[1]), Y1 = P.Y(r[3]);
      if (!fin(X0 + X1 + Y0 + Y1)) continue;
      const ya = clamp(Math.min(Y0, Y1), -1e4, 1e4), yb = clamp(Math.max(Y0, Y1), -1e4, 1e4);
      d += 'M' + X0.toFixed(2) + ',' + yb.toFixed(2) + 'V' + ya.toFixed(2) + 'H' + X1.toFixed(2) + 'V' + yb.toFixed(2) + 'Z';
    }
    if (!d) return null;
    const e = el('path', { d, style });
    P.layers[layer || 'fill'].append(e);
    return e;
  }

  // ================================================================== numerical core (no DOM)
  /** Gauss–Legendre nodes and weights on [−1, 1] (Newton's method on the Legendre polynomial P_n). */
  function gaussLegendre(n) {
    const x = new Float64Array(n), w = new Float64Array(n);
    for (let i = 0; i < (n + 1) >> 1; i++) {
      let z = Math.cos(PI * (i + 0.75) / (n + 0.5)), dp = 1;
      for (let it = 0; it < 100; it++) {
        let p0 = 1, p1 = z;
        for (let j = 2; j <= n; j++) { const p2 = ((2 * j - 1) * z * p1 - (j - 1) * p0) / j; p0 = p1; p1 = p2; }
        dp = n * (z * p1 - p0) / (z * z - 1);
        const dz = p1 / dp;
        z -= dz;
        if (Math.abs(dz) < 1e-16) break;
      }
      x[i] = -z; x[n - 1 - i] = z;
      w[i] = w[n - 1 - i] = 2 / ((1 - z * z) * dp * dp);
    }
    return { x, w };
  }
  const GL = gaussLegendre(10);

  /** Root of g in [a, b] by bisection to full precision; ga = g(a) (non-zero). */
  function bisect(g, a, b, ga) {
    for (let k = 0; k < 200; k++) {
      const m = 0.5 * (a + b);
      if (!(m > a && m < b)) break;
      const gm = g(m);
      if (gm === 0) return m;
      if (!fin(gm)) break;
      if ((gm < 0) === (ga < 0)) { a = m; ga = gm; } else b = m;
    }
    return 0.5 * (a + b);
  }

  const ZERO_FNS = new Set(['sign', 'abs', 'heaviside', 'sqrt', 'cbrt', 'root', 'pow', 'atan2']);
  /**
   * Sub-expressions of f whose zeros ('zero'), integer crossings ('int') or half-integer crossings ('half') are
   * where f may jump or have a corner: comparisons in if(…), sign, abs, min/max, floor, round, mod, roots …
   */
  function switchesOf(ast) {
    const out = [];
    const minus = (a, b) => ({ t: 'bin', op: '-', a, b });
    const add = (node, kind) => out.push({ ast: node, kind });
    const visit = (n) => {
      if (!n || typeof n !== 'object') return;
      switch (n.t) {
        case 'cmp':
          if (n.op !== '&&' && n.op !== '||') add(minus(n.a, n.b), 'zero');
          visit(n.a); visit(n.b);
          return;
        case 'neg': case 'fact': visit(n.a); return;
        case 'bin':
          if (n.op === '^' && !(n.b.t === 'num' && Number.isInteger(n.b.v) && n.b.v >= 0)) add(n.a, 'zero');
          visit(n.a); visit(n.b);
          return;
        case 'call': {
          const A = n.args || [];
          if (n.f === 'sum' || n.f === 'prod') { visit(A[2]); visit(A[3]); return; } // the body has a bound variable
          if (n.f === 'if') { if (A[0] && A[0].t !== 'cmp') add(A[0], 'zero'); }
          else if (ZERO_FNS.has(n.f)) add(A[0], 'zero');
          else if (n.f === 'asin' || n.f === 'acos') { add(minus(A[0], { t: 'num', v: 1 }), 'zero'); add({ t: 'bin', op: '+', a: A[0], b: { t: 'num', v: 1 } }, 'zero'); }
          else if (n.f === 'floor' || n.f === 'ceil' || n.f === 'frac') add(A[0], 'int');
          else if (n.f === 'round') add(A[0], 'half');
          else if (n.f === 'mod') add({ t: 'bin', op: '/', a: A[0], b: A[1] }, 'int');
          else if (n.f === 'min' || n.f === 'max') { for (let i = 0; i < A.length; i++) for (let j = i + 1; j < A.length; j++) add(minus(A[i], A[j]), 'zero'); }
          else if (n.f === 'clamp') { add(minus(A[0], A[1]), 'zero'); add(minus(A[0], A[2]), 'zero'); }
          A.forEach(visit);
          return;
        }
        default:
      }
    };
    visit(ast);
    return out;
  }

  /**
   * Points of (lo, hi) where f may jump or have a corner, sorted: zeros of the switching sub-expressions located by
   * bisection to full precision, plus any remaining jump found by sampling (a safety net for exotic expressions).
   */
  function breakPoints(ast, f, lo, hi) {
    const n = 2048, h = (hi - lo) / n;
    const at = (i) => (i === n ? hi : lo + i * h);
    const pts = [];
    for (const sw of ast ? switchesOf(ast) : []) {
      if (!MA.expr.varsOf(sw.ast).has('x')) continue;
      let g0;
      try { g0 = MA.expr.compile(sw.ast); } catch (e) { continue; }
      const G = (x) => { try { return g0({ x }); } catch (e) { return NaN; } };
      const found = [];
      let xa = lo, ga = G(lo);
      for (let i = 1; i <= n && found.length <= 400; i++) {
        const xb = at(i), gb = G(xb);
        if (fin(ga) && fin(gb)) {
          if (sw.kind === 'zero') {
            if (ga === 0) found.push(xa);
            else if (gb !== 0 && (ga < 0) !== (gb < 0)) found.push(bisect(G, xa, xb, ga));
          } else {
            const off = sw.kind === 'half' ? 0.5 : 0;
            const ka = Math.floor(ga - off), kb = Math.floor(gb - off);
            for (let k = Math.min(ka, kb) + 1; k <= Math.max(ka, kb) && found.length <= 400; k++) {
              const c = k + off;
              found.push(ga === c ? xa : bisect((x) => G(x) - c, xa, xb, ga - c));
            }
          }
        }
        xa = xb; ga = gb;
      }
      if (sw.kind === 'zero' && ga === 0) found.push(hi);
      if (found.length <= 400) found.forEach((p) => pts.push(p));
    }
    // safety net: a big step between neighbouring samples with no break point in between
    const fs = new Float64Array(n + 1);
    let fmin = Infinity, fmax = -Infinity;
    for (let i = 0; i <= n; i++) { const v = f(at(i)); fs[i] = v; if (fin(v)) { fmin = Math.min(fmin, v); fmax = Math.max(fmax, v); } }
    const span = fmax - fmin;
    if (span > 0) {
      const known = pts.slice().sort((p, q) => p - q);
      let j = 0;
      for (let i = 0; i < n; i++) {
        const xa = at(i), xb = at(i + 1);
        while (j < known.length && known[j] < xa - 1e-12) j++;
        if (j < known.length && known[j] <= xb + 1e-12) continue;
        if (!(Math.abs(fs[i + 1] - fs[i]) > 0.02 * span)) continue;
        let a = xa, b = xb, fa = fs[i], fb = fs[i + 1];
        for (let k = 0; k < 64; k++) {
          const m = 0.5 * (a + b);
          if (!(m > a && m < b)) break;
          const fm = f(m);
          if (!fin(fm)) break;
          if (Math.abs(fm - fa) > Math.abs(fb - fm)) { b = m; fb = fm; } else { a = m; fa = fm; }
        }
        if (Math.abs(fb - fa) > 1e-3 * span) pts.push(0.5 * (a + b));
      }
    }
    pts.sort((p, q) => p - q);
    const tol = 1e-12 * Math.max(1, Math.abs(lo), Math.abs(hi));
    const out = [];
    for (const p of pts) {
      if (!(p > lo + tol && p < hi - tol)) continue;
      if (out.length && p - out[out.length - 1] < tol) continue;
      out.push(p);
    }
    return out;
  }

  /** One-sided limit f(x±) by linear extrapolation from two nearby points (dir = −1 left, +1 right). */
  function oneSided(f, x, dir) {
    const d = 1e-9 * Math.max(1, Math.abs(x));
    return 2 * f(x + dir * d) - f(x + 2 * dir * d);
  }

  /** Composite 10-point Gauss–Legendre nodes and weights on [lo, hi], with panel edges at the break points. */
  function quadrature(lo, hi, breaks, panels) {
    const edges = [lo].concat(breaks.filter((b) => b > lo && b < hi), [hi]);
    const h = (hi - lo) / panels, m = GL.x.length;
    const pieces = [];
    let count = 0;
    for (let j = 0; j + 1 < edges.length; j++) {
      const a = edges[j], b = edges[j + 1];
      if (!(b > a)) continue;
      const k = Math.max(1, Math.ceil((b - a) / h - 1e-9));
      pieces.push([a, b, k]);
      count += k;
    }
    const X = new Float64Array(count * m), W = new Float64Array(count * m);
    let i = 0;
    for (const [a, b, k] of pieces) {
      const d = (b - a) / k, r = d / 2;
      for (let p = 0; p < k; p++) {
        const c = a + (p + 0.5) * d;
        for (let q = 0; q < m; q++) { X[i] = c + r * GL.x[q]; W[i] = r * GL.w[q]; i++; }
      }
    }
    return { X, W };
  }

  /** a_n = norm·∫ f cos(n·scale·x), b_n = norm·∫ f sin(n·scale·x) for n = 0 … nmax from quadrature data. */
  function trigCoefs(V, X, W, scale, norm, nmax) {
    const a = new Float64Array(nmax + 1), b = new Float64Array(nmax + 1);
    for (let i = 0; i < X.length; i++) {
      const w = W[i] * V[i];
      if (w === 0) continue;
      const th = scale * X[i], c1 = Math.cos(th), s1 = Math.sin(th);
      let c = 1, s = 0;
      for (let n = 0; n <= nmax; n++) {
        if (n && (n & 31) === 0) { c = Math.cos(n * th); s = Math.sin(n * th); } // re-seed the rotation
        a[n] += w * c; b[n] += w * s;
        const cn = c * c1 - s * s1;
        s = s * c1 + c * s1;
        c = cn;
      }
    }
    for (let n = 0; n <= nmax; n++) { a[n] *= norm; b[n] *= norm; }
    return { a, b };
  }

  /**
   * Coefficients of f on [lo, hi] for the angle θ = scale·x: break points, a_n, b_n (n ≤ nmax) and ∫ f².
   * Throws a readable error when f is undefined or unbounded on the interval.
   */
  function analyse(f, ast, lo, hi, nmax, scale, norm) {
    const breaks = breakPoints(ast, f, lo, hi);
    const panels = Math.max(256, Math.ceil((hi - lo) * scale * nmax / 2));
    const Q = quadrature(lo, hi, breaks, panels);
    const V = new Float64Array(Q.X.length);
    let big = 0;
    for (let i = 0; i < V.length; i++) {
      const y = f(Q.X[i]);
      if (!fin(y)) throw new Error(MA.t('f is not defined at x = %s', MA.fmt(Q.X[i], 4)));
      V[i] = y;
      big = Math.max(big, Math.abs(y));
    }
    if (big > 1e12) throw new Error(MA.t('the values of f are too large for this figure (|f| reaches %s)', MA.fmt(big, 3)));
    // a pole (or a 1/√ singularity) at a break point or at an end: |f| keeps growing as the point is approached
    const mags = Array.from(V, Math.abs).sort((p, q) => p - q);
    const typical = Math.max(1, mags[mags.length >> 1]);
    const near = (p, dir) => {
      const sc = Math.max(1, Math.abs(p));
      const g = [1e-9, 1e-6, 1e-3].map((d) => f(p + dir * d * sc));
      if (g.some((v) => Number.isNaN(v))) throw new Error(MA.t('f is not defined near x = %s', fmtX(p)));
      const m = g.map(Math.abs);
      if (!fin(m[0]) || !fin(m[1]) || (m[0] > 8 * m[1] && m[1] > 8 * m[2] && m[0] > 100 * typical)) throw new Error(MA.t('f must be bounded, but it blows up near x = %s', fmtX(p)));
    };
    breaks.forEach((p) => { near(p, -1); near(p, 1); });
    near(lo, 1); near(hi, -1);
    const { a, b } = trigCoefs(V, Q.X, Q.W, scale, norm, nmax);
    let sq = 0;
    for (let i = 0; i < V.length; i++) sq += Q.W[i] * V[i] * V[i];
    return { breaks, a, b, sq };
  }

  /** Σ_{n=0}^{N} (A[n] cos nθ + B[n] sin nθ) by Clenshaw's recurrence (A or B may be null). */
  function trigSum(A, B, N, th) {
    const c = Math.cos(th), c2 = 2 * c;
    let ua = 0, ua1 = 0, ub = 0, ub1 = 0;
    for (let n = N; n >= 1; n--) {
      if (A) { const t = A[n] + c2 * ua - ua1; ua1 = ua; ua = t; }
      if (B) { const t = B[n] + c2 * ub - ub1; ub1 = ub; ub = t; }
    }
    return (A ? A[0] + ua * c - ua1 : 0) + (B ? ub * Math.sin(th) : 0);
  }

  /** Jumps of f at the break points (and, if `wrap`, between f(hi−) and f(lo+)): [{x, l, r}]. */
  function jumpsOf(f, breaks, lo, hi, span, wrap) {
    const thr = 1e-4 * Math.max(span, 1e-12);
    const out = [];
    for (const p of breaks) {
      const l = oneSided(f, p, -1), r = oneSided(f, p, 1);
      if (fin(l) && fin(r) && Math.abs(r - l) > thr) out.push({ x: p, l, r });
    }
    if (wrap) {
      const l = oneSided(f, hi, -1), r = oneSided(f, lo, 1);
      if (fin(l) && fin(r) && Math.abs(r - l) > thr) out.push({ x: hi, l, r });
    }
    return out;
  }

  /** Graph of f on [lo, hi] as points, sharp at the break points and with a gap at each jump. */
  function piecewisePts(f, lo, hi, breaks, isJump, total) {
    const edges = [lo].concat(breaks, [hi]);
    const pts = [];
    for (let j = 0; j + 1 < edges.length; j++) {
      const p = edges[j], q = edges[j + 1];
      const m = Math.max(2, Math.ceil(total * (q - p) / (hi - lo)));
      const d = 1e-9 * Math.max(1, Math.abs(p), Math.abs(q));
      if (j > 0 && isJump(p)) pts.push(null);
      for (let i = 0; i <= m; i++) {
        const x = i === 0 ? p + d : i === m ? q - d : p + (q - p) * i / m;
        const y = f(x);
        pts.push(fin(y) ? [x, y] : null);
      }
    }
    return pts;
  }

  /** Range [lo, hi] of finite values (null if none). */
  function rangeOf(vals) {
    let lo = Infinity, hi = -Infinity;
    for (const v of vals) if (fin(v)) { if (v < lo) lo = v; if (v > hi) hi = v; }
    return lo <= hi ? [lo, hi] : null;
  }
  /** Pad a range by a fraction of its width (degenerate ranges are widened). */
  function padRange(r, fr) {
    let [a, b] = r;
    if (!(b - a > 1e-9 * Math.max(1, Math.abs(a), Math.abs(b)))) { const c = (a + b) / 2, w = Math.max(Math.abs(c) * 0.5, 1); a = c - w; b = c + w; }
    const p = (b - a) * fr;
    return [a - p, b + p];
  }

  // ================================================================== Fourier presets (exact coefficients)
  /** Symbolic coefficient (p/q)·√r·π^k with p/q in lowest terms. */
  const sym = (p, q, r = 1, k = 0) => { const g = gcd(p, q); return { p: p / g, q: q / g, r, k }; };
  const symVal = (s) => s.p / s.q * Math.sqrt(s.r) * Math.pow(PI, s.k);
  /** TeX of the magnitude of a symbolic coefficient ("1" when it is exactly one). */
  function symTeX(s) {
    const pi = (k) => (k === 1 ? '\\pi' : '\\pi^{' + k + '}');
    let num = (Math.abs(s.p) !== 1 ? String(Math.abs(s.p)) : '') + (s.r !== 1 ? '\\sqrt{' + s.r + '}' : '') + (s.k > 0 ? pi(s.k) : '');
    if (!num) num = '1';
    const den = (s.q !== 1 ? String(s.q) : '') + (s.k < 0 ? pi(-s.k) : '');
    return den ? '\\frac{' + num + '}{' + den + '}' : num;
  }
  function pulseCoef(n) {
    if (n === 0) return [sym(1, 4), null];
    switch (n % 8) {
      case 1: case 3: return [sym(1, n, 2, -1), null];
      case 5: case 7: return [sym(-1, n, 2, -1), null];
      case 2: return [sym(2, n, 1, -1), null];
      case 6: return [sym(-2, n, 1, -1), null];
      default: return [null, null];
    }
  }
  /**
   * f on (−π, π), its corners/jumps inside the period, its jumps [x, f(x−), f(x+)] (x = π is the jump between
   * periods), ∫_{−π}^{π} f², and coef(n) = [constant or cos coefficient, sin coefficient] (n = 0: a₀/2).
   */
  const PRESETS = {
    square: { f: (x) => Math.sign(x), breaks: [0], jumps: [[0, -1, 1], [PI, 1, -1]], sq: TAU, tex: 'f(x) = \\operatorname{sgn} x',
      coef: (n) => [null, n % 2 ? sym(4, n, 1, -1) : null] },
    sawtooth: { f: (x) => x, breaks: [], jumps: [[PI, PI, -PI]], sq: TAU * PI * PI / 3, tex: 'f(x) = x',
      coef: (n) => [null, n ? sym(n % 2 ? 2 : -2, n) : null] },
    triangle: { f: Math.abs, breaks: [0], jumps: [], sq: TAU * PI * PI / 3, tex: 'f(x) = |x|',
      coef: (n) => [n === 0 ? sym(1, 2, 1, 1) : n % 2 ? sym(-4, n * n, 1, -1) : null, null] },
    pulse: { f: (x) => (Math.abs(x) < PI / 4 ? 1 : 0), breaks: [-PI / 4, PI / 4], jumps: [[-PI / 4, 0, 1], [PI / 4, 1, 0]], sq: PI / 2, tex: 'f(x)',
      coef: pulseCoef },
    parabola: { f: (x) => x * x, breaks: [], jumps: [], sq: 2 * Math.pow(PI, 5) / 5, tex: 'f(x) = x^2',
      coef: (n) => [n === 0 ? sym(1, 3, 1, 2) : sym(n % 2 ? -4 : 4, n * n), null] },
  };
  /** Name of the preset whose coefficients equal A, B (n ≤ maxN), or null. */
  function matchPreset(A, B, maxN) {
    let scale = 0;
    for (let n = 0; n <= maxN; n++) scale = Math.max(scale, Math.abs(A[n]), Math.abs(B[n]));
    if (!(scale > 0)) return null;
    const tol = 1e-8 * scale;
    outer: for (const name of Object.keys(PRESETS)) {
      const co = PRESETS[name].coef;
      for (let n = 0; n <= maxN; n++) {
        const [sa, sb] = co(n);
        if (Math.abs(A[n] - (sa ? symVal(sa) : 0)) > tol || Math.abs(B[n] - (sb ? symVal(sb) : 0)) > tol) continue outer;
      }
      return name;
    }
    return null;
  }

  // ================================================================== fourier
  MA.widget('fourier', (stage, cfg) => {
    const wave = C.str(cfg.wave, C.has(cfg.f) ? 'custom' : 'square').toLowerCase();
    if (wave !== 'custom' && !PRESETS[wave]) throw new Error(MA.t('wave must be one of: %s', 'square, sawtooth, triangle, pulse, parabola, custom'));
    const maxRaw = C.num(cfg.max, 60);
    if (!(maxRaw >= 1)) throw new Error(MA.t('max must be at least 1'));
    const maxN = Math.min(400, Math.round(maxRaw));
    const termsRaw = C.num(cfg.terms, 5);
    if (!fin(termsRaw)) throw new Error(MA.t('terms must be a whole number'));
    let N = clamp(Math.round(termsRaw), 0, maxN);
    const showSpec = C.bool(cfg.spectrum, true);

    // ---- coefficients: A[0] = a₀/2, A[n] = a_n, B[n] = b_n
    const A = new Float64Array(maxN + 1), B = new Float64Array(maxN + 1);
    let f, kinks, jumps, sq, symOf = null, fLabel = 'f(x)';
    if (wave === 'custom') {
      if (!C.has(cfg.f)) throw new Error(MA.t('wave: custom needs f, a function of x on [−π, π]'));
      const ex = C.expr(cfg.f, ['x']);
      f = (x) => { try { return ex.f({ x }); } catch (e) { return NaN; } };
      const an = analyse(f, ex.ast, -PI, PI, maxN, 1, 1 / PI);
      A[0] = an.a[0] / 2;
      for (let n = 1; n <= maxN; n++) { A[n] = an.a[n]; B[n] = an.b[n]; }
      kinks = an.breaks;
      sq = an.sq;
      const samples = [];
      for (let i = 0; i <= 512; i++) samples.push(f(-PI + TAU * i / 512));
      const fr = rangeOf(samples) || [0, 0];
      jumps = jumpsOf(f, kinks, -PI, PI, fr[1] - fr[0], true);
      const match = matchPreset(A, B, maxN);
      if (match) {
        symOf = PRESETS[match].coef;
        for (let n = 0; n <= maxN; n++) { const [sa, sb] = symOf(n); A[n] = sa ? symVal(sa) : 0; B[n] = sb ? symVal(sb) : 0; }
      }
      try {
        const tex = MA.expr.toTeX(ex.ast);
        if (tex && !/cases|\\sum|\\prod/.test(tex) && tex.length <= 48) fLabel = 'f(x) = ' + tex;
      } catch (e) { /* keep f(x) */ }
    } else {
      const pr = PRESETS[wave];
      f = pr.f; kinks = pr.breaks; sq = pr.sq; symOf = pr.coef; fLabel = pr.tex;
      for (let n = 0; n <= maxN; n++) { const [sa, sb] = pr.coef(n); A[n] = sa ? symVal(sa) : 0; B[n] = sb ? symVal(sb) : 0; }
      jumps = pr.jumps.map(([x, l, r]) => ({ x, l, r }));
    }
    const S = (n, x) => trigSum(A, B, n, x);
    const amp = new Float64Array(maxN + 1);
    amp[0] = Math.abs(A[0]);
    for (let n = 1; n <= maxN; n++) amp[n] = Math.hypot(A[n], B[n]);
    let ampMax = 0;
    for (let n = 0; n <= maxN; n++) ampMax = Math.max(ampMax, amp[n]);
    const zeroTol = 1e-11 * Math.max(ampMax, 1e-300);
    const cleanC = (v) => (Math.abs(v) < zeroTol ? 0 : v);
    // the energy beyond the last coefficient (Parseval): ‖f‖² − π(a₀²/2 + Σ_{n ≤ max}(a_n² + b_n²))
    let energy = TAU * A[0] * A[0];
    for (let n = 1; n <= maxN; n++) energy += PI * (A[n] * A[n] + B[n] * B[n]);
    const rest = sq - energy > 1e-12 * sq ? sq - energy : 0;

    // ---- jumps: room to the neighbouring jump; the main one (largest, nearest 0) carries the Gibbs read-out
    jumps.forEach((j) => {
      let d = TAU;
      jumps.forEach((o) => { if (o !== j) { const e = Math.abs(o.x - j.x) % TAU; d = Math.min(d, e, TAU - e); } });
      j.room = Math.min(PI, d / 2);
      j.size = Math.abs(j.r - j.l);
    });
    const main = jumps.slice().sort((p, q) => {
      if (Math.abs(p.size - q.size) > 1e-6 * Math.max(p.size, q.size)) return q.size - p.size;
      if (Math.abs(Math.abs(p.x) - Math.abs(q.x)) > 1e-9) return Math.abs(p.x) - Math.abs(q.x);
      return (q.r - q.l) - (p.r - p.l);
    })[0] || null;
    const isJump = (x) => jumps.some((j) => Math.abs(j.x - x) < 1e-12 * Math.max(1, Math.abs(x)));

    // ---- grids: f on one period (sup error) and the graph of f (sharp corners, gaps at jumps)
    const brk = kinks.concat(jumps.map((j) => j.x)).filter((x) => x > -PI && x < PI).sort((p, q) => p - q)
      .filter((x, i, a) => !i || x - a[i - 1] > 1e-12);
    const basePts = piecewisePts(f, -PI, PI, brk, isJump, 900);
    // S_N f on a grid of cell midpoints of one period, shared by the graph (repeated periodically) and the sup error
    const gridX = (G, i) => -PI + (i + 0.5) * TAU / G;
    const fCache = {};
    const fGrid = (G) => {
      if (!fCache[G]) { const v = new Float64Array(G); for (let i = 0; i < G; i++) v[i] = f(gridX(G, i)); fCache[G] = v; }
      return fCache[G];
    };
    let sg = null;
    const sGrid = (n) => {
      const G = n <= 100 ? 1024 : n <= 200 ? 2048 : 4096;
      if (!sg || sg.G !== G || sg.n !== n) {
        const v = new Float64Array(G);
        for (let i = 0; i < G; i++) v[i] = S(n, gridX(G, i));
        sg = { G, n, v };
      }
      return sg;
    };
    const probes = [-PI].concat(kinks).filter((x) => !isJump(x) && !(Math.abs(x + PI) < 1e-12 && isJump(PI)));

    // ---- y-range: f and the partial sums for a spread of N (so that the scale stays fixed while N changes)
    const ys = [];
    basePts.forEach((p) => { if (p) ys.push(p[1]); });
    jumps.forEach((j) => ys.push(j.l, j.r));
    const Ns = [0, 1, 2, 3, 4, 5, 6, 7, 9, 12, 16, 22, 30, 40, 60, 90, 130, 200, 300, 400, N, maxN].filter((n, i, a) => n <= maxN && a.indexOf(n) === i);
    for (const n of Ns) for (let i = 0; i < 1024; i++) ys.push(S(n, -PI + (i + 0.5) * TAU / 1024));
    const yr = padRange(rangeOf(ys) || [-1, 1], 0.1);
    const xr = [-2 * PI, 2 * PI];

    // ---- layout
    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const W = vbW(stage);
    const P = new MA.Plot(stage, { width: W, height: W < 600 ? 290 : 310, x: xr, y: yr, piTicks: true, ticks: false, pad: [10, 12, 24, 40],
      label: MA.t('The function f and its Fourier partial sum') });
    edgeTicks(P, true);
    const read = P.readout();
    let P2 = null, read2 = null;
    if (showSpec) {
      const cap = el('div', { class: 'w-fou-cap' });
      cap.append(el('span', { class: 'ttl', text: MA.t('Amplitude spectrum') }), MA.texEl('\\sqrt{a_n^2 + b_n^2}'),
        el('span', { class: 'k' }, el('span', { class: 'w-fou-sw', style: '--c:var(--series-1)' }), MA.texEl('n \\le N')),
        el('span', { class: 'k' }, el('span', { class: 'w-fou-sw', style: '--c:var(--ink-3);opacity:.4' }), MA.texEl('n > N')));
      stage.append(cap);
      P2 = new MA.Plot(stage, { width: W, height: 170, x: [-0.8, maxN + 0.8], y: [0, 1], pad: [10, 22, 24, 40], grid: false, axes: false,
        label: MA.t('Amplitude spectrum: the size of each harmonic') });
      P2.svg.style.cursor = 'pointer';
      read2 = P2.readout();
    }
    const bar = MA.ui.bar(stage);
    const info1 = MA.ui.info(stage);
    info1.el.classList.add('w-fou-formula');
    const info2 = MA.ui.info(stage);

    let logScale = false, zoom = false;
    const redraw = perFrame(safe(() => { draw(); drawSpectrum(); showInfo(); }));
    const sN = MA.ui.slider(bar, { label: 'N', min: 0, max: maxN, step: 1, value: N, fmt: (v) => String(v), onInput: (v) => { N = clamp(Math.round(v), 0, maxN); redraw(); } });
    sN.input.setAttribute('aria-label', MA.t('Number of terms N'));
    if (showSpec) MA.ui.toggle(bar, { label: MA.t('Log scale'), value: false, onChange: safe((v) => { logScale = v; drawSpectrum(); }) });
    if (main) MA.ui.toggle(bar, { label: MA.t('Zoom on the jump'), value: false, onChange: safe((v) => { zoom = v; setView(); draw(); }) });

    // ---- Gibbs: the peak of S_N on the high side of the main jump
    function gibbs(n) {
      if (!main || n < 1) return null;
      const J = main.r - main.l, up = J > 0, side = up ? 1 : -1, hiVal = up ? main.r : main.l;
      const w = Math.min(2 * PI / (n + 1), main.room), m = 400;
      let best = -Infinity, bi = 1;
      for (let i = 1; i <= m; i++) { const y = S(n, main.x + side * w * i / m); if (y > best) { best = y; bi = i; } }
      // golden-section refinement around the best sample
      let a = main.x + side * w * (bi - 1) / m, b = main.x + side * w * Math.min(m, bi + 1) / m;
      if (a > b) { const t = a; a = b; b = t; }
      const gr = (Math.sqrt(5) - 1) / 2;
      let c = b - gr * (b - a), d = a + gr * (b - a), fc = S(n, c), fd = S(n, d);
      for (let k = 0; k < 60; k++) {
        if (fc > fd) { b = d; d = c; fd = fc; c = b - gr * (b - a); fc = S(n, c); } else { a = c; c = d; fc = fd; d = a + gr * (b - a); fd = S(n, d); }
      }
      const xm = (a + b) / 2, ym = S(n, xm);
      const x = ym >= best ? xm : main.x + side * w * bi / m, y = Math.max(ym, best);
      // the overshoot is S_N f − f at the peak (for a sloping f this is what tends to 9% of the jump)
      let fx = f(x - TAU * Math.floor((x + PI) / TAU));
      if (!fin(fx)) fx = hiVal;
      return { x, y, frac: (y - fx) / Math.abs(J), side, limit: hiVal + GIBBS * Math.abs(J) };
    }
    function errors(n) {
      let e2 = rest;
      for (let k = n + 1; k <= maxN; k++) e2 += PI * (A[k] * A[k] + B[k] * B[k]);
      const g = sGrid(n), fv = fGrid(g.G);
      let sup = 0, at = 0;
      for (let i = 0; i < g.G; i++) { const d = Math.abs(fv[i] - g.v[i]); if (d > sup) { sup = d; at = i; } }
      // refine the largest grid value by golden-section search in the neighbouring cells
      const err = (x) => { const y = f(x); return fin(y) ? Math.abs(y - S(n, x)) : 0; };
      let a = gridX(g.G, at - 1), b = gridX(g.G, at + 1);
      const gr = (Math.sqrt(5) - 1) / 2;
      let c = b - gr * (b - a), d = a + gr * (b - a), ec = err(c), ed = err(d);
      for (let k = 0; k < 40; k++) {
        if (ec > ed) { b = d; d = c; ed = ec; c = b - gr * (b - a); ec = err(c); } else { a = c; c = d; ec = ed; d = a + gr * (b - a); ed = err(d); }
      }
      sup = Math.max(sup, ec, ed);
      for (const x of probes) { const d = Math.abs(oneSided(f, x, 1) - S(n, x)); if (d > sup) sup = d; }
      for (const j of jumps) { const s = S(n, j.x); sup = Math.max(sup, Math.abs(j.l - s), Math.abs(j.r - s)); }
      return { l2: Math.sqrt(Math.max(0, e2)), sup };
    }
    /** S_N f in TeX: exact coefficients when known, the first three terms, ⋯ and the last one. */
    function texSN(n) {
      const terms = [];
      const push = (c, s, k, kind) => {
        if (s === null && !(Math.abs(c) >= zeroTol)) return;
        if (s !== null && !s) return;
        const basis = k === 0 ? '' : (kind === 'c' ? '\\cos ' : '\\sin ') + (k === 1 ? 'x' : k + 'x');
        let mag = s ? symTeX(s) : texNum(Math.abs(c), 4);
        if (mag === '1' && basis) mag = '';
        terms.push({ neg: s ? s.p < 0 : c < 0, body: mag + basis });
      };
      for (let k = 0; k <= n; k++) {
        const pair = symOf ? symOf(k) : null;
        push(A[k], pair ? pair[0] : null, k, 'c');
        if (k) push(B[k], pair ? pair[1] : null, k, 's');
      }
      const lhs = 'S_{' + n + '}f(x) = ';
      if (!terms.length) return lhs + '0';
      const shown = terms.length > 5 ? [terms[0], terms[1], terms[2], null, terms[terms.length - 1]] : terms;
      let out = (shown[0].neg ? '-' : '') + shown[0].body;
      for (let i = 1; i < shown.length; i++) out += shown[i] ? (shown[i].neg ? ' - ' : ' + ') + shown[i].body : ' + \\cdots';
      return lhs + out;
    }

    function setView() {
      if (zoom && main) { P.o.piTicks = false; P.setView([main.x - PI / 2, main.x + PI / 2], yr); }
      else { P.o.piTicks = true; P.setView(xr, yr); }
      edgeTicks(P, P.o.piTicks);
    }
    let lastGibbs = null;
    function draw() {
      P.clear();
      const x0 = P.x0, x1 = P.x1;
      const k0 = Math.floor((x0 + PI) / TAU) - 1, k1 = Math.ceil((x1 - PI) / TAU) + 1;
      // f: the base period solid, its periodic copies faded
      for (let k = k0; k <= k1; k++) {
        const sh = k * TAU;
        if (sh + PI < x0 - 1 || sh - PI > x1 + 1) continue;
        P.path(basePts.map((p) => (p ? [p[0] + sh, p[1]] : null)), { color: 'var(--ink)', width: 2, opacity: k === 0 ? 1 : 0.42 });
      }
      // jumps: dotted connector between the one-sided limits and the midpoint, where every S_N f converges
      for (const j of jumps) {
        for (let k = k0; k <= k1; k++) {
          const x = j.x + k * TAU;
          if (x < x0 - 0.01 || x > x1 + 0.01) continue;
          P.line(x, j.l, x, j.r, { color: 'var(--ink-3)', width: 1.2, dash: '2 3' });
          P.dot(x, (j.l + j.r) / 2, { r: 3.6, color: 'var(--ink)', layer: 'top' });
        }
      }
      // the partial sum
      let pts;
      if (zoom) {
        const M = clamp(Math.round(12 * Math.max(N, 4) * (x1 - x0) / TAU), 600, 3000);
        pts = new Array(M + 1);
        for (let i = 0; i <= M; i++) { const x = x0 + (x1 - x0) * i / M; pts[i] = [x, S(N, x)]; }
      } else {
        const g = sGrid(N), h = TAU / g.G;
        pts = [];
        for (let k = k0; k <= k1; k++) {
          for (let i = 0; i < g.G; i++) {
            const x = gridX(g.G, i) + k * TAU;
            if (x >= x0 - h && x <= x1 + h) pts.push([x, g.v[i]]);
          }
        }
      }
      P.path(pts, { color: 'var(--series-1)', width: 2.3 });
      // the Gibbs peak next to the main jump, and the height it tends to
      const g = gibbs(N);
      lastGibbs = g;
      if (g) {
        const span = Math.min(main.room, 0.9) * g.side;
        P.line(main.x, g.limit, main.x + span, g.limit, { color: 'var(--series-2)', width: 1.4, dash: '5 4', layer: 'top' });
        P.dot(g.x, g.y, { r: 4.6, color: 'var(--series-2)', layer: 'top' });
        P.text(g.x, Math.max(g.y, g.limit), MA.fmt(g.y, 4), { dx: g.side > 0 ? 4 : -4, dy: -9, anchor: g.side > 0 ? 'start' : 'end', color: 'var(--series-2)' });
      }
      const items = [{ label: fLabel, color: 'var(--ink)', tex: true }, { label: 'S_{' + N + '}f(x)', color: 'var(--series-1)' }];
      if (jumps.length) items.push({ label: MA.t('midpoint of a jump'), color: 'var(--ink)', dot: true });
      if (g) items.push({ label: MA.t('peak next to the jump'), color: 'var(--series-2)', dot: true }, { label: MA.t('its limit as N → ∞'), color: 'var(--series-2)', dash: true });
      setLegend(legend, items);
    }

    /** Grid, axes at the left and bottom edges, and labels; y in log10 units when `log`. */
    function specFrame(Q, log) {
      const g = Q.layers.grid, ax = Q.layers.axes;
      g.replaceChildren(); ax.replaceChildren();
      const L = Q.pl, R = Q.W - Q.pr, T = Q.pt, Bt = Q.H - Q.pb;
      const grid = el('g', { class: 'grid' }), tk = el('g', { class: 'tick' });
      if (log) {
        const every = Q.y1 - Q.y0 > 6 ? 2 : 1;
        for (let k = Math.ceil(Q.y0 - 1e-9); k <= Math.floor(Q.y1 + 1e-9); k++) {
          const y = Q.Y(k);
          grid.append(el('line', { x1: L, x2: R, y1: y, y2: y }));
          if (k % every === 0 && y > T + 3) tk.append(el('text', { x: L - 6, y: y + 4, 'text-anchor': 'end', text: pow10Label(k) }));
        }
      } else {
        const yt = MA.ticks(Q.y0, Q.y1, 3);
        yt.values.forEach((v) => {
          const y = Q.Y(v);
          grid.append(el('line', { x1: L, x2: R, y1: y, y2: y }));
          if (y > T + 3) tk.append(el('text', { x: L - 6, y: y + 4, 'text-anchor': 'end', text: tickLabel(v, yt.step) }));
        });
      }
      const xt = MA.ticks(Math.max(0, Q.x0), Q.x1, Math.max(4, Math.round(Q.W / 80)));
      xt.values.forEach((v) => {
        const X = Q.X(v);
        if (X < L || X > R) return;
        if (X > L + 6) grid.append(el('line', { x1: X, x2: X, y1: T, y2: Bt }));
        tk.append(el('text', { x: X, y: Bt + 15, 'text-anchor': 'middle', text: MA.fmt(v, 6) }));
      });
      g.append(grid);
      const axg = el('g', { class: 'axis' });
      axg.append(el('line', { x1: L, x2: R, y1: Bt, y2: Bt }), el('line', { x1: L, x2: L, y1: T, y2: Bt }));
      ax.append(axg, tk, el('text', { class: 'lbl', x: R + 5, y: Bt + 4, 'text-anchor': 'start', style: 'fill:var(--ink-2)', text: 'n' }));
    }
    function drawSpectrum() {
      if (!P2) return;
      const xs = [-0.8, maxN + 0.8];
      const pos = [];
      for (let n = 0; n <= maxN; n++) if (amp[n] > zeroTol) pos.push(amp[n]);
      let base = 0, top = ampMax > 0 ? ampMax * 1.12 : 1, ty = (v) => v;
      const log = logScale && pos.length > 0;
      if (log) {
        const hi = Math.log10(ampMax), lo = Math.max(Math.floor(Math.log10(Math.min(...pos)) - 1e-9), Math.floor(hi) - 12);
        base = lo; top = hi + 0.3; ty = (v) => Math.log10(v);
      }
      P2.setView(xs, [base, top]);
      specFrame(P2, log);
      P2.clear();
      const bw = Math.max(0.7, 1.4 / P2.sx) / 2;
      const used = [], unused = [];
      for (let n = 0; n <= maxN; n++) {
        if (!(amp[n] > zeroTol)) continue;
        (n <= N ? used : unused).push([n - bw, base, n + bw, Math.max(base, ty(amp[n]))]);
      }
      bars(P2, unused, 'fill:var(--ink-3);fill-opacity:0.38');
      bars(P2, used, 'fill:var(--series-1);fill-opacity:0.9');
      if (log) {
        // reference decay rates through the first non-zero harmonic
        let n1 = 1;
        while (n1 <= maxN && !(amp[n1] > zeroTol)) n1++;
        if (n1 < maxN) {
          const a1 = Math.log10(amp[n1]);
          [[1, '1/n'], [2, '1/n²']].forEach(([p, lab]) => {
            const pts = [];
            for (let i = 0; i <= 120; i++) { const n = n1 + (maxN - n1) * i / 120; pts.push([n, a1 - p * Math.log10(n / n1)]); }
            P2.path(pts, { color: 'var(--ink-2)', width: 1.3, dash: '5 4', layer: 'marks' });
            const yEnd = a1 - p * Math.log10(maxN / n1);
            if (yEnd > base) P2.text(maxN, yEnd, lab, { anchor: 'end', dx: -2, dy: -6, size: 11, color: 'var(--ink-2)' });
          });
        }
      }
      const yTop = P2.y1;
      P2.line(N + 0.5, base, N + 0.5, yTop, { color: 'var(--ink-3)', width: 1.1, dash: '3 3' });
      const flip = P2.X(N + 0.5) > P2.W - P2.pr - 16;
      P2.text(N + 0.5, yTop, 'N', { dx: flip ? -4 : 4, dy: 12, anchor: flip ? 'end' : 'start', size: 11, color: 'var(--ink-2)' });
    }
    function showInfo() {
      info1.set({ tex: texSN(N) });
      const parts = [];
      const g = lastGibbs;
      if (main) {
        parts.push(MA.ui.kv(MA.t('peak next to the jump at x = %s', fmtX(main.x)), g ? MA.fmt(g.y, 4) : '–'));
        parts.push(MA.ui.kv(MA.t('overshoot'), g ? MA.t('%s of the jump', MA.fmt(100 * g.frac, 3) + '%') : '–'));
        parts.push(MA.ui.kv(MA.t('value at the jump'), MA.fmt(cleanC(S(N, main.x)), 4)), MA.ui.kv(MA.t('midpoint of the jump'), MA.fmt(cleanC((main.l + main.r) / 2), 4)));
      } else {
        parts.push(el('span', { class: 'w-fou-note', text: MA.t('No jumps, so no overshoot: the convergence is uniform.') }));
      }
      const e = errors(N);
      parts.push(MA.ui.kv('\\lVert f - S_{' + N + '}f\\rVert =', MA.fmt(e.l2, 4)), MA.ui.kv('\\max\\,\\lvert f - S_{' + N + '}f\\rvert =', MA.fmt(e.sup, 4)));
      info2.set(...parts);
    }

    P.onHover(safe((x) => {
      if (x === null) { read(null); return; }
      const y = x - TAU * Math.floor((x + PI) / TAU);
      read('x = ' + MA.fmt(x, 3) + '   f(x) = ' + MA.fmt(cleanC(f(y)), 4) + '   ' + sub('S', N) + 'f(x) = ' + MA.fmt(cleanC(S(N, x)), 4));
    }));
    if (P2) {
      P2.onHover(safe((x) => {
        const n = Math.round(x);
        if (x === null || n < 0 || n > maxN) { read2(null); return; }
        if (n === 0) { read2('n = 0   a₀/2 = ' + MA.fmt(cleanC(A[0]), 4)); return; }
        read2('n = ' + n + '   ' + sub('a', n) + ' = ' + MA.fmt(cleanC(A[n]), 4) + '   ' + sub('b', n) + ' = ' + MA.fmt(cleanC(B[n]), 4));
      }));
      P2.onClick(safe((x) => {
        const n = clamp(Math.round(x), 0, maxN);
        if (!fin(n)) return;
        N = n; sN.set(n); redraw();
      }));
    }
    draw();
    drawSpectrum();
    showInfo();
  });

  // ================================================================== heat (and wave)
  MA.widget('heat', (stage, cfg) => {
    const eq = C.str(cfg.equation, 'heat').toLowerCase();
    if (eq !== 'heat' && eq !== 'wave') throw new Error(MA.t('equation must be heat or wave'));
    const isWave = eq === 'wave';
    const bc = C.str(cfg.boundary, 'dirichlet').toLowerCase();
    if (bc !== 'dirichlet' && bc !== 'neumann') throw new Error(MA.t('boundary must be dirichlet or neumann'));
    const neu = bc === 'neumann';
    if (!C.has(cfg.f)) throw new Error(MA.t('f, the initial profile on [0, L], is required'));
    const L = C.num(cfg.L, PI);
    if (!(L > 0 && L < 1e6)) throw new Error(MA.t('L must be a positive number'));
    const k0 = C.num(cfg.k, 1);
    if (!(k0 > 0 && k0 < 1e6)) throw new Error(isWave ? MA.t('the speed c (key k) must be positive') : MA.t('the diffusivity k must be positive'));
    const termsRaw = C.num(cfg.terms, 40);
    if (!(termsRaw >= 1)) throw new Error(MA.t('terms must be at least 1'));
    const maxTerms = Math.min(400, Math.max(100, 2 * Math.round(termsRaw)));
    let terms = Math.min(maxTerms, Math.round(termsRaw));
    const ex = C.expr(cfg.f, ['x']);
    const f = (x) => { try { return ex.f({ x }); } catch (e) { return NaN; } };
    const an = analyse(f, ex.ast, 0, L, maxTerms, PI / L, 2 / L);

    // modal coefficients: Dirichlet b_n (sine series), Neumann a₀/2 and a_n (cosine series)
    const coef = new Float64Array(maxTerms + 1);
    if (neu) { coef[0] = an.a[0] / 2; for (let n = 1; n <= maxTerms; n++) coef[n] = an.a[n]; }
    else for (let n = 1; n <= maxTerms; n++) coef[n] = an.b[n];
    let cmax = 0;
    for (let n = 0; n <= maxTerms; n++) cmax = Math.max(cmax, Math.abs(coef[n]));
    for (let n = 0; n <= maxTerms; n++) if (Math.abs(coef[n]) < 1e-12 * cmax) coef[n] = 0;
    // the slowest non-constant mode (Dirichlet heat: the shape the profile relaxes to)
    let n1 = 1;
    while (n1 < maxTerms && coef[n1] === 0) n1++;
    const hasMode = coef[n1] !== 0;
    const mean = neu ? coef[0] : 0;

    const fs = [];
    for (let i = 0; i <= 600; i++) fs.push(f(L * i / 600));
    const fr = rangeOf(fs) || [0, 0];
    const jumps = jumpsOf(f, an.breaks, 0, L, fr[1] - fr[0], false);
    const isJump = (x) => jumps.some((j) => Math.abs(j.x - x) < 1e-12 * Math.max(1, Math.abs(x)));
    const fPts = piecewisePts(f, 0, L, an.breaks, isJump, 700);

    // ---- time: heat runs to 4 decay times of the first mode with t ∝ s² (early instants and the long decay);
    //      the wave runs over one period 2L/c at constant speed
    let k = k0, s = 0, t = 0, speed = 1, halves = false;
    const tEnd = 4 * L * L / (k0 * PI * PI);
    const period = () => 2 * L / k;
    const tOf = (v) => (isWave ? v * period() : tEnd * v * v);
    const RUN = 12; // seconds for the whole run at speed 1×

    const G = new Float64Array(maxTerms + 1);
    function modal(tt) {
      for (let n = 0; n <= terms; n++) {
        const c = coef[n];
        G[n] = c === 0 ? 0 : isWave ? c * Math.cos(n * PI * k * tt / L) : c * Math.exp(-k * (n * PI / L) * (n * PI / L) * tt);
      }
    }
    const series = (x) => (neu ? trigSum(G, null, terms, PI * x / L) : trigSum(null, G, terms, PI * x / L));
    /** Odd (Dirichlet) or even (Neumann) 2L-periodic extension of f. */
    const ext = (y) => {
      const r = y - 2 * L * Math.floor((y + L) / (2 * L));
      return r >= 0 ? f(r) : neu ? f(-r) : -f(-r);
    };

    // ---- y-range: the partial sums at t = 0 bound every later time (maximum principle / d'Alembert)
    const ys = fs.slice();
    jumps.forEach((j) => ys.push(j.l, j.r));
    for (const nt of [1, 2, 3, 5, 8, 12, 20, 30, 40, 60, 100, 150, 200, 300, 400, terms, maxTerms]) {
      if (nt > maxTerms) continue;
      for (let i = 0; i <= 300; i++) {
        const th = PI * i / 300;
        ys.push(neu ? trigSum(coef, null, nt, th) : trigSum(null, coef, nt, th));
      }
    }
    if (!neu) ys.push(0);
    if (!neu && !isWave) ys.push(coef[n1]);
    let yr0 = rangeOf(ys) || [-1, 1];
    if (isWave && !neu) { const m = Math.max(Math.abs(yr0[0]), Math.abs(yr0[1])); yr0 = [-m, m]; }
    const yr = padRange(yr0, 0.1);
    const piT = Math.abs(L / (PI / 2) - Math.round(L / (PI / 2))) < 1e-9 && L / (PI / 2) <= 16;
    const nearPi = Math.abs(L - PI) < 1e-12;

    // ---- layout
    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const W = vbW(stage);
    const P = new MA.Plot(stage, { width: W, height: W < 600 ? 300 : 320, x: [-0.03 * L, 1.03 * L], y: yr, piTicks: piT, ticks: false, pad: [10, 20, 24, 40],
      label: isWave ? MA.t('Displacement u(x, t) of the string') : MA.t('Temperature u(x, t) along the rod') });
    edgeTicks(P, piT, 'x', 'u');
    const read = P.readout();
    const stat = el('g', { 'clip-path': 'url(#' + P.uid + '-clip)' });
    P.svg.insertBefore(stat, P.layers.fill);
    P.layers.stat = stat;
    // static: the initial profile (faint), the ends of the rod or string
    P.path(fPts, { color: 'var(--ink-3)', width: 1.7, opacity: 0.75, layer: 'stat' });
    if (neu) [0, L].forEach((x) => P.line(x, yr[0] - 1, x, yr[1] + 1, { color: 'var(--ink-3)', width: 4, opacity: 0.22, layer: 'stat' }));
    const bar = MA.ui.bar(stage), bar2 = MA.ui.bar(stage);
    const info = MA.ui.info(stage);

    const expTeX = (n) => {
      const nn = n * n === 1 ? '' : String(n * n);
      return nearPi ? '-' + nn + 'kt' : '-' + nn + 'k\\pi^2t/L^2';
    };
    const modeTeX = (n) => (nearPi ? '\\sin ' + (n === 1 ? 'x' : n + 'x') : '\\sin(' + (n === 1 ? '' : n) + '\\pi x/L)');
    function setItems() {
      const items = [{ label: 'u(x,t)', color: 'var(--series-1)', tex: true }, { label: 'u(x,0) = f(x)', color: 'var(--ink-3)', opacity: 0.75, tex: true }];
      if (neu) items.push({ label: MA.t('mean value'), color: 'var(--series-2)', dash: true });
      else if (!isWave && hasMode) items.push({ label: 'b_{' + n1 + '}e^{' + expTeX(n1) + '}' + modeTeX(n1), color: 'var(--series-2)', dash: true });
      if (isWave) {
        items.push({ label: MA.t('d’Alembert (exact)'), color: 'var(--ink)', opacity: 0.3, wide: true });
        if (halves) items.push({ label: '\\tfrac12F(x-ct)', color: 'var(--series-2)' }, { label: '\\tfrac12F(x+ct)', color: 'var(--series-3)' });
      }
      setLegend(legend, items);
    }

    const M = 600;
    function draw() {
      t = tOf(s);
      modal(t);
      const pts = new Array(M + 1);
      let mx = -Infinity, mn = Infinity, amax = 0;
      for (let i = 0; i <= M; i++) {
        const x = L * i / M, y = series(x);
        pts[i] = [x, y];
        if (y > mx) mx = y;
        if (y < mn) mn = y;
        if (Math.abs(y) > amax) amax = Math.abs(y);
      }
      P.clear();
      const parts = [MA.ui.kv('t =', MA.fmt(t, 3), true)];
      if (!isWave) P.poly(pts.concat([[L, 0], [0, 0]]), { fill: 'var(--series-1)', fillOpacity: 0.13 });
      if (neu) P.hline(mean, { color: 'var(--series-2)', width: 1.5, dash: '6 4' });
      if (isWave) {
        const ct = k * t, ex0 = [], hl = [], hr = [];
        let diff = 0;
        for (let i = 0; i <= M; i++) {
          const x = L * i / M, a = ext(x - ct) / 2, b = ext(x + ct) / 2;
          ex0.push([x, a + b]);
          if (halves) { hr.push([x, a]); hl.push([x, b]); }
          const d = Math.abs(a + b - pts[i][1]);
          if (fin(d) && d > diff) diff = d;
        }
        if (halves) {
          P.path(hr, { color: 'var(--series-2)', width: 1.7, opacity: 0.95 });
          P.path(hl, { color: 'var(--series-3)', width: 1.7, opacity: 0.95 });
        }
        P.path(ex0, { color: 'var(--ink)', width: 6.5, opacity: 0.16, layer: 'fill' });
        const T = period();
        parts.push(MA.ui.kv('2L/c =', MA.fmt(T, 4), true), MA.ui.kv('t\\,/\\,(2L/c) =', MA.fmt(t / T, 3)), MA.ui.kv('\\max|u| =', MA.fmt(amax, 4)));
        if (neu) parts.push(MA.ui.kv(MA.t('mean displacement'), MA.fmt(mean, 4) + ' ' + MA.t('(conserved)')));
        parts.push(MA.ui.kv(MA.t('largest gap between series and exact solution'), MA.fmt(diff, 2)));
      } else if (neu) {
        parts.push(MA.ui.kv(MA.t('mean temperature'), MA.fmt(mean, 4) + ' ' + MA.t('(conserved)')),
          MA.ui.kv('\\int_0^L u\\,dx =', MA.fmt(mean * L, 4)), MA.ui.kv('\\max u - \\min u =', MA.fmt(mx - mn, 4)));
      } else {
        const c1 = coef[n1] * Math.exp(-k * (n1 * PI / L) * (n1 * PI / L) * t);
        let dev = 0;
        if (hasMode) {
          P.fn((x) => c1 * Math.sin(n1 * PI * x / L), { domain: [0, L], samples: 300, color: 'var(--series-2)', width: 1.6, dash: '6 4', layer: 'marks' });
          for (let i = 0; i <= M; i++) dev = Math.max(dev, Math.abs(pts[i][1] - c1 * Math.sin(n1 * PI * pts[i][0] / L)));
        }
        let area = 0;
        for (let n = 1; n <= terms; n += 2) area += G[n] * 2 * L / (n * PI);
        parts.push(MA.ui.kv('\\max|u| =', MA.fmt(amax, 4)));
        if (hasMode) parts.push(MA.ui.kv('b_{' + n1 + '}e^{' + expTeX(n1) + '} =', MA.fmt(c1, 4)), MA.ui.kv(MA.t('u differs from this mode by'), amax > 0 ? MA.fmt(100 * dev / amax, 3) + '%' : '–'));
        parts.push(MA.ui.kv('\\int_0^L u\\,dx =', MA.fmt(area, 4)));
      }
      P.path(pts, { color: 'var(--series-1)', width: 2.6 });
      if (!neu) [0, L].forEach((x) => P.dot(x, 0, { r: 4, color: 'var(--ink)', layer: 'top' }));
      P.text(L, P.y1, 't = ' + MA.fmt(t, 3), { anchor: 'end', dx: -9, dy: 16, color: 'var(--ink-2)' });
      info.set(...parts);
    }
    const redraw = perFrame(safe(draw));

    // ---- controls
    const anim = MA.anim((dt) => {
      try {
        s = Math.min(1, s + dt * speed * (isWave ? k / k0 : 1) / RUN);
        tSl.set(s);
        draw();
        if (s >= 1) { setPlaying(false); return false; }
        return true;
      } catch (e) { console.error(e); setPlaying(false); return false; }
    });
    function setPlaying(on) {
      playBtn.textContent = on ? MA.t('Pause') : MA.t('Play');
      info.el.setAttribute('aria-live', on ? 'off' : 'polite');
    }
    function stop() { anim.stop(); setPlaying(false); }
    const playBtn = MA.ui.button(bar, { label: MA.t('Play'), primary: true, onClick: safe(() => {
      if (anim.running) { stop(); return; }
      if (s >= 1 - 1e-9) s = 0;
      setPlaying(true);
      anim.play();
    }) });
    MA.ui.button(bar, { label: MA.t('Reset'), onClick: safe(() => { stop(); s = 0; tSl.set(0); draw(); }) });
    const tSl = MA.ui.slider(bar, { label: 't', min: 0, max: 1, step: 0.0005, value: 0, fmt: (v) => MA.fmt(tOf(v), 3),
      onInput: safe((v) => { stop(); s = clamp(v, 0, 1); redraw(); }) });
    tSl.input.setAttribute('aria-label', MA.t('Time t'));
    const kSl = MA.ui.slider(bar2, { label: isWave ? 'c' : 'k', min: isWave ? k0 / 4 : k0 / 10, max: isWave ? 3 * k0 : 5 * k0, step: k0 / 20, value: k0,
      fmt: (v) => MA.fmt(v, 3), onInput: safe((v) => {
        if (!(v > 0)) return;
        if (isWave) { const tKeep = t; k = v; s = clamp(tKeep / period(), 0, 1); tSl.set(s); } else k = v;
        redraw();
      }) });
    kSl.input.setAttribute('aria-label', isWave ? MA.t('Wave speed c') : MA.t('Diffusivity k'));
    const nSl = MA.ui.slider(bar2, { label: MA.t('terms'), min: 1, max: maxTerms, step: 1, value: terms, fmt: (v) => String(v),
      onInput: safe((v) => { terms = clamp(Math.round(v), 1, maxTerms); redraw(); }) });
    nSl.input.setAttribute('aria-label', MA.t('Number of terms of the series'));
    MA.ui.select(bar2, { label: MA.t('Speed'), value: '1', options: [['0.5', '½×'], ['1', '1×'], ['2', '2×'], ['4', '4×']], onChange: (v) => { speed = +v || 1; } });
    if (isWave) MA.ui.toggle(bar2, { label: MA.t('Two travelling halves'), value: false, onChange: safe((v) => { halves = v; setItems(); draw(); }) });
    P.onHover(safe((x) => {
      if (x === null || x < 0 || x > L) { read(null); return; }
      read('x = ' + MA.fmt(x, 3) + '   u(x, t) = ' + MA.fmt(series(x), 4) + '   f(x) = ' + MA.fmt(f(x), 4));
    }));
    pauseOffscreen(stage, anim, setPlaying);
    setItems();
    draw();
  });
})();
