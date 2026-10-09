/* Maths Atlas — interactive figures: complex analysis.
     complexmap    domain colouring of f(z) (hue = arg f, brightness = |f|) or the images of a grid / polar grid
     complexplane  draggable z and w: sum, product, quotient (polar form), powers and n-th roots
     contourint    a movable circle over the domain colouring: ∮ f dz (trapezoid rule) against 2πi Σ residues
     winding       closed curves (parametric or drawn by hand) and the winding number of a draggable point
   See tools/WIDGET_GUIDE.md. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;
  const TAU = 2 * Math.PI;

  // ================================================================== shared helpers
  (function injectStyle() {
    if (document.getElementById('w-cx-style')) return;
    const s = document.createElement('style');
    s.id = 'w-cx-style';
    s.textContent = [
      '.w-cx-dc .tick text{paint-order:stroke;stroke:var(--plot-bg);stroke-width:3px;stroke-linejoin:round}',
      '.w-cx-dc .axis line{stroke:var(--ink);opacity:.45}',
      '.w-cx-pair{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)}',
      '.w-cx-pair>div{min-width:0}',
      '.w-cx-pair>div+div{border-left:1px solid var(--rule)}',
      '@media (max-width:640px){.w-cx-pair{grid-template-columns:minmax(0,1fr)}.w-cx-pair>div+div{border-left:0;border-top:1px solid var(--rule)}}',
      '.w-cx-cap{font-size:.8125rem;color:var(--ink-2);padding:8px 14px 0;font-weight:600}',
      '.w-cx-key{display:inline-flex;align-items:center;gap:6px}',
      '.w-cx-key canvas{width:84px;height:11px;border-radius:3px;border:1px solid var(--rule);display:block}',
      '.w-cx-hint{color:var(--ink-3);font-size:.8125rem}',
      '.w-cx-big{font-size:1.05rem;font-weight:700;color:var(--ink)}',
      '.w-cx-ok{color:var(--good);font-weight:650}',
      '.w-cx-bad{color:var(--bad);font-weight:600}',
      '.w-cx-draw svg{cursor:crosshair}',
    ].join('\n');
    document.head.append(s);
  })();

  function sliderSetup(cfg) {
    const specs = C.sliders(cfg.sliders);
    const values = {};
    specs.forEach((s) => { values[s.name] = s.value; });
    return { specs, values, names: specs.map((s) => s.name) };
  }
  /** Wrap an event handler so that nothing escapes it. */
  function safe(fn) {
    return function () {
      try { return fn.apply(this, arguments); } catch (e) { console.error(e); return undefined; }
    };
  }
  function perFrame(fn) {
    let queued = false;
    return () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; fn(); });
    };
  }
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  function pointsOf(v, what) {
    const pts = C.points(v);
    pts.forEach((p) => { if (p.length < 2) throw new Error(MA.t('%s must look like "x,y; x,y"', what || 'points')); });
    return pts;
  }
  /** Compile a complex expression in z (and slider names); throws a readable error. */
  function cexpr(src, names) {
    try {
      const ast = MA.expr.parse(String(src), { vars: ['z'].concat(names || []), complex: true });
      return { f: MA.expr.compileC(ast), ast };
    } catch (e) {
      throw new Error('“' + src + '”: ' + e.message);
    }
  }
  /** TeX of a complex expression, with the implicit products by i written compactly. */
  const cTeX = (ast) => MA.expr.toTeX(ast).replace(/ \\cdot i \\cdot /g, 'i').replace(/ \\cdot i\b/g, 'i').replace(/\bi \\cdot /g, 'i');
  /** a + bi as text (real minus sign), dropping parts that are negligible. */
  function fmtC(re, im, sig) {
    sig = sig || 4;
    if (!Number.isFinite(re) || !Number.isFinite(im)) return Number.isNaN(re) || Number.isNaN(im) ? '–' : '∞';
    const m = Math.max(Math.abs(re), Math.abs(im));
    if (m === 0) return '0';
    const tiny = m * 1e-10;
    const r = Math.abs(re) <= tiny ? 0 : re, i = Math.abs(im) <= tiny ? 0 : im;
    const ip = (v) => (Math.abs(v) === 1 ? '' : MA.fmt(Math.abs(v), sig)) + 'i';
    if (!i) return MA.fmt(r, sig);
    if (!r) return (i < 0 ? '−' : '') + ip(i);
    return MA.fmt(r, sig) + (i < 0 ? ' − ' : ' + ') + ip(i);
  }
  const texC = (re, im, sig) => fmtC(re, im, sig).replace(/−/g, '-').replace(/∞/, '\\infty').replace(/–/, '\\text{–}').replace(/(\d)e([+-]?\d+)/g, '$1\\times10^{$2}');
  const deg = (a) => MA.fmt(a * 180 / Math.PI, 4) + '°';
  const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  /** Resolve a CSS colour (or var(--x)) to [r, g, b]. */
  const probe = document.createElement('canvas').getContext('2d');
  function rgbOf(color) {
    const m = /^var\((--[\w-]+)\)$/.exec(color);
    const v = m ? MA.cssVar(m[1]) : color;
    probe.fillStyle = '#000';
    probe.fillStyle = v || '#000';
    const s = probe.fillStyle;
    if (s[0] === '#') return [parseInt(s.slice(1, 3), 16), parseInt(s.slice(3, 5), 16), parseInt(s.slice(5, 7), 16)];
    const q = /rgba?\(([^)]+)\)/.exec(s);
    return q ? q[1].split(',').slice(0, 3).map((x) => +x) : [0, 0, 0];
  }

  // ---------------------------------------------------------------- domain colouring
  /** RGB of the domain colouring at w = (re, im): hue = arg w; dark at zeros, light at poles; a band per doubling of |w|. */
  function dcColour(re, im, out, o) {
    if (!(Number.isFinite(re) && Number.isFinite(im))) {
      const inf = Math.abs(re) === Infinity || Math.abs(im) === Infinity;
      out[o] = out[o + 1] = out[o + 2] = inf ? 255 : 170;
      out[o + 3] = 255;
      return;
    }
    const m = Math.hypot(re, im);
    if (m === 0) { out[o] = out[o + 1] = out[o + 2] = 0; out[o + 3] = 255; return; }
    let h = Math.atan2(im, re) / TAU;
    if (h < 0) h += 1;
    const lm = Math.log2(m);
    const l0 = 0.5 + Math.atan(0.36 * lm) / Math.PI;
    const band = lm - Math.floor(lm);
    const l = l0 * (0.7 + 0.3 * Math.sqrt(band));
    const s = 0.92;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
    out[o] = 255 * hue2(p, q, h + 1 / 3);
    out[o + 1] = 255 * hue2(p, q, h);
    out[o + 2] = 255 * hue2(p, q, h - 1 / 3);
    out[o + 3] = 255;
  }
  function hue2(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  /** A canvas under the SVG of an MA.Plot, covering exactly its plot area. */
  function canvasUnder(P, cls) {
    const cv = el('canvas', { 'aria-hidden': 'true' });
    const pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb;
    Object.assign(cv.style, { position: 'absolute', left: (100 * P.pl / P.W) + '%', top: (100 * P.pt / P.H) + '%', width: (100 * pw / P.W) + '%', height: (100 * ph / P.H) + '%' });
    P.wrap.insertBefore(cv, P.svg);
    P.wrap.classList.add(cls || 'w-cx-dc');
    P.svg.style.background = 'transparent';
    P.svg.style.position = 'relative';
    P.wrap.style.background = 'var(--plot-bg)';
    return cv;
  }
  /** Size of the plot area in device pixels (times scale). */
  function deviceSize(P, scale) {
    const r = P.svg.getBoundingClientRect();
    const k = r.width > 20 ? r.width / P.W : 1;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    return [Math.max(8, Math.round((P.W - P.pl - P.pr) * k * dpr * scale)), Math.max(8, Math.round((P.H - P.pt - P.pb) * k * dpr * scale))];
  }
  /**
   * Progressive pixel renderer for a canvas under a plot: pixel(x, y, data, offset) writes RGBA for the data point
   * (x, y). render() paints a coarse preview at once and refines it to full resolution over the next frames;
   * a newer render cancels an older one. Re-renders on theme changes and when the figure is resized.
   */
  function pixelRenderer(P, cv, pixel) {
    const ctx = cv.getContext('2d');
    let gen = 0, lastW = 0;
    function job(scale) {
      const [w, h] = deviceSize(P, scale);
      const img = ctx.createImageData(w, h), data = img.data;
      const x0 = P.x0, y1 = P.y1, dx = (P.x1 - P.x0) / w, dy = (P.y1 - P.y0) / h;
      let row = 0;
      return {
        w, h, img,
        step(budget) {
          const t0 = performance.now();
          while (row < h) {
            const y = y1 - (row + 0.5) * dy;
            let o = row * w * 4;
            for (let i = 0; i < w; i++, o += 4) {
              try { pixel(x0 + (i + 0.5) * dx, y, data, o); } catch (e) { data[o] = data[o + 1] = data[o + 2] = 170; data[o + 3] = 255; }
            }
            row++;
            if (performance.now() - t0 > budget) break;
          }
          return row >= h;
        },
      };
    }
    function blit(j) { cv.width = j.w; cv.height = j.h; ctx.putImageData(j.img, 0, 0); }
    function render(previewScale) {
      const my = ++gen;
      const pre = job(previewScale || 0.3);
      pre.step(Infinity);
      blit(pre);
      const full = job(1);
      lastW = P.svg.getBoundingClientRect().width;
      const tick = () => {
        if (my !== gen) return;
        if (full.step(12)) blit(full); else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
    window.addEventListener('ma:theme', () => render(0.5));
    if ('ResizeObserver' in window) {
      let tm = null;
      new ResizeObserver(() => {
        const w = P.svg.getBoundingClientRect().width;
        if (!lastW || Math.abs(w - lastW) / lastW < 0.12) return;
        clearTimeout(tm);
        tm = setTimeout(() => render(0.5), 150);
      }).observe(P.wrap);
    }
    return { render };
  }
  /** Colour key for domain colouring: argument (hue) and modulus (brightness with bands). */
  function colourKey(parent) {
    const box = el('div', { class: 'w-legend' });
    const bar = (fn) => {
      const cv = el('canvas', { width: 128, height: 22 });
      const ctx = cv.getContext('2d'), img = ctx.createImageData(128, 22);
      for (let i = 0; i < 128; i++) {
        const w = fn(i / 127);
        for (let j = 0; j < 22; j++) dcColour(w[0], w[1], img.data, (j * 128 + i) * 4);
      }
      ctx.putImageData(img, 0, 0);
      return cv;
    };
    const hueBar = bar((s) => { const a = -Math.PI + TAU * s; return [Math.cos(a), Math.sin(a)]; });
    const modBar = bar((s) => [Math.pow(2, -5 + 10 * s), 0]);
    box.append(el('span', { class: 'w-cx-key' }, el('span', { text: MA.t('arg f: −π') }), hueBar, el('span', { text: 'π' })),
      el('span', { class: 'w-cx-key' }, el('span', { text: MA.t('|f|: 0') }), modBar, el('span', { text: '∞' })));
    parent.append(box);
    return box;
  }

  // ================================================================== complexmap
  MA.widget('complexmap', (stage, cfg) => {
    if (!C.has(cfg.f)) throw new Error(MA.t('complexmap needs f, a function of z'));
    const sl = sliderSetup(cfg);
    const F = cexpr(cfg.f, sl.names);
    const scope = Object.assign({}, sl.values);
    const f = (x, y) => { scope.z = [x, y]; return F.f(scope); };
    let mode = C.str(cfg.mode, 'domain').toLowerCase();
    if (!['domain', 'grid', 'polar'].includes(mode)) throw new Error(MA.t('mode must be domain, grid or polar'));
    const xr = C.range(cfg.x, [-2, 2]), yr = C.range(cfg.y, [-2, 2]);
    const narrow = (stage.clientWidth || 640) < 520;

    MA.ui.title(stage, cfg.title);
    // ---- domain colouring view
    const domBox = el('div');
    stage.append(domBox);
    colourKey(domBox);
    const D = new MA.Plot(domBox, { x: xr, y: yr, equal: true, grid: false, width: narrow ? 480 : 640, height: narrow ? 440 : 420, xLabel: 'Re z', yLabel: 'Im z', label: MA.t('Domain colouring of f(z)') });
    const cv = canvasUnder(D);
    const R = pixelRenderer(D, cv, (x, y, out, o) => { const w = f(x, y); dcColour(w[0], w[1], out, o); });
    const read = D.readout();
    // ---- grid view: z-plane and w-plane side by side
    const pairBox = el('div', { class: 'w-cx-pair' });
    const zCol = el('div'), wCol = el('div');
    pairBox.append(zCol, wCol);
    stage.append(pairBox);
    zCol.append(el('div', { class: 'w-cx-cap', text: MA.t('z-plane') }));
    wCol.append(el('div', { class: 'w-cx-cap', text: MA.t('w = f(z)') }));
    const Z = new MA.Plot(zCol, { x: xr, y: yr, equal: true, grid: false, width: 420, height: 400, pad: [10, 12, 24, 34], xLabel: 'Re z', yLabel: 'Im z', label: MA.t('The z-plane with a grid') });
    const Wp = new MA.Plot(wCol, { x: [-2, 2], y: [-2, 2], equal: true, width: 420, height: 400, pad: [10, 12, 24, 34], xLabel: 'Re w', yLabel: 'Im w', label: MA.t('Images of the grid lines under f') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    let zp = [xr[0] + 0.62 * (xr[1] - xr[0]), yr[0] + 0.62 * (yr[1] - yr[0])];
    let probeH = null;

    /** Grid lines of the z-plane as parametrised curves. */
    function zLines() {
      const out = [];
      if (mode === 'grid') {
        const xt = MA.ticks(xr[0], xr[1], 8).values, yt = MA.ticks(yr[0], yr[1], 8).values;
        xt.forEach((x) => out.push({ kind: 'v', main: Math.abs(x) < 1e-12, at: (s) => [x, s], a: yr[0], b: yr[1] }));
        yt.forEach((y) => out.push({ kind: 'h', main: Math.abs(y) < 1e-12, at: (s) => [s, y], a: xr[0], b: xr[1] }));
      } else {
        const Rm = Math.max(Math.abs(xr[0]), Math.abs(xr[1]), Math.abs(yr[0]), Math.abs(yr[1]));
        const rt = MA.ticks(0, Rm, 6).values.filter((r) => r > 1e-12);
        rt.forEach((r) => out.push({ kind: 'h', main: Math.abs(r - 1) < 1e-12, at: (s) => [r * Math.cos(s), r * Math.sin(s)], a: 0, b: TAU }));
        for (let k = 0; k < 12; k++) {
          const a = k * Math.PI / 6;
          out.push({ kind: 'v', main: k === 0, at: (s) => [s * Math.cos(a), s * Math.sin(a)], a: 0, b: Rm });
        }
      }
      return out;
    }
    /** Image of a curve under f: adaptive sampling, broken at poles and jumps (branch cuts). */
    function imageOf(line, view) {
      const pts = [];
      const big = 60 * Math.max(view, 1e-9), jump = 0.12 * view;
      const W = (s) => { const p = line.at(s), w = f(p[0], p[1]); return Number.isFinite(w[0]) && Number.isFinite(w[1]) && Math.hypot(w[0], w[1]) < big ? [w[0], w[1]] : null; };
      const N = 220;
      let s0 = line.a, w0 = W(s0);
      pts.push(w0);
      let budget = 4000;
      const seg = (sa, wa, sb, wb, depth) => {
        if (!wa || !wb) { pts.push(wb); return; }
        if (Math.hypot(wb[0] - wa[0], wb[1] - wa[1]) <= jump || depth > 9 || budget <= 0) {
          if (Math.hypot(wb[0] - wa[0], wb[1] - wa[1]) > jump) pts.push(null);
          pts.push(wb);
          return;
        }
        budget--;
        const sm = (sa + sb) / 2, wm = W(sm);
        if (!wm) { pts.push(null); pts.push(wb); return; }
        seg(sa, wa, sm, wm, depth + 1);
        seg(sm, wm, sb, wb, depth + 1);
      };
      for (let i = 1; i <= N; i++) {
        const s1 = line.a + (line.b - line.a) * i / N, w1 = W(s1);
        seg(s0, w0, s1, w1, 0);
        s0 = s1; w0 = w1;
      }
      return pts;
    }
    /** Robust window for the w-plane from images of sample points. */
    function wView(lines) {
      const re = [], im = [];
      lines.forEach((L) => { for (let i = 0; i <= 40; i++) { const p = L.at(L.a + (L.b - L.a) * i / 40), w = f(p[0], p[1]); if (Number.isFinite(w[0]) && Number.isFinite(w[1])) { re.push(w[0]); im.push(w[1]); } } });
      if (re.length < 4) return [[-2, 2], [-2, 2]];
      re.sort((a, b) => a - b); im.sort((a, b) => a - b);
      const q = (arr, t) => arr[Math.min(arr.length - 1, Math.max(0, Math.round(t * (arr.length - 1))))];
      let a = q(re, 0.04), b = q(re, 0.96), c = q(im, 0.04), d = q(im, 0.96);
      const s = Math.max(b - a, d - c, 1e-6) * 0.12;
      if (b - a < 1e-9) { a -= 1; b += 1; }
      if (d - c < 1e-9) { c -= 1; d += 1; }
      return [[a - s, b + s], [c - s, d + s]];
    }
    const COL = { h: 'var(--series-1)', v: 'var(--series-2)' };
    function drawGrid() {
      const lines = zLines();
      const [vx, vy] = wView(lines);
      Wp.setView(vx, vy);
      Z.clear(); Wp.clear();
      const view = Math.max(Wp.x1 - Wp.x0, Wp.y1 - Wp.y0);
      lines.forEach((L) => {
        const zp2 = [];
        for (let i = 0; i <= 200; i++) zp2.push(L.at(L.a + (L.b - L.a) * i / 200));
        Z.path(zp2, { color: COL[L.kind], width: L.main ? 2.4 : 1.3, opacity: L.main ? 1 : 0.85 });
        Wp.path(imageOf(L, view), { color: COL[L.kind], width: L.main ? 2.4 : 1.3, opacity: L.main ? 1 : 0.85 });
      });
      drawProbe();
    }
    function drawProbe() {
      Z.clear('top'); Wp.clear('top');
      const eps = 0.05 * Math.max(Z.x1 - Z.x0, Z.y1 - Z.y0);
      const view = Math.max(Wp.x1 - Wp.x0, Wp.y1 - Wp.y0);
      const hor = { at: (s) => [zp[0] + s, zp[1]], a: -eps, b: eps }, ver = { at: (s) => [zp[0], zp[1] + s], a: -eps, b: eps };
      Z.path([hor.at(-eps), hor.at(eps)], { color: 'var(--series-1)', width: 3.2, layer: 'top' });
      Z.path([ver.at(-eps), ver.at(eps)], { color: 'var(--series-2)', width: 3.2, layer: 'top' });
      Wp.path(imageOf(hor, view), { color: 'var(--series-1)', width: 3.2, layer: 'top' });
      Wp.path(imageOf(ver, view), { color: 'var(--series-2)', width: 3.2, layer: 'top' });
      const w = f(zp[0], zp[1]);
      if (Number.isFinite(w[0]) && Number.isFinite(w[1])) Wp.dot(w[0], w[1], { r: 6, color: 'var(--accent)', layer: 'top' });
      // derivative by a central difference
      const hh = 1e-5 * Math.max(1, Math.hypot(zp[0], zp[1]));
      const a = f(zp[0] + hh, zp[1]), b = f(zp[0] - hh, zp[1]);
      const d = [(a[0] - b[0]) / (2 * hh), (a[1] - b[1]) / (2 * hh)];
      const md = Math.hypot(d[0], d[1]);
      const parts = [{ tex: 'f(z) = ' + cTeX(F.ast) }, MA.ui.kv('z =', fmtC(zp[0], zp[1], 3)), MA.ui.kv('f(z) =', fmtC(w[0], w[1], 4))];
      if (Number.isFinite(md)) {
        parts.push(MA.ui.kv("f'(z) \\approx", fmtC(d[0], d[1], 4), true));
        if (md < 1e-6 * Math.max(1, Math.hypot(w[0], w[1]))) parts.push(el('span', { class: 'w-cx-bad', text: MA.t('f′(z) = 0: angles are not preserved at this critical point') }));
        else parts.push(MA.ui.kv(MA.t('stretch |f′(z)| ='), MA.fmt(md, 4)), MA.ui.kv(MA.t('turn arg f′(z) ='), deg(Math.atan2(d[1], d[0]))));
      }
      parts.push(el('span', { class: 'w-cx-hint', text: MA.t('Drag the cross: the small right angle at z keeps its angle in the image wherever f′(z) ≠ 0.') }));
      info.set(...parts);
      if (!probeH) probeH = Z.handle(zp[0], zp[1], { label: MA.t('Point z'), constrain: (x, y) => [clamp(x, Z.x0, Z.x1), clamp(y, Z.y0, Z.y1)], onDrag: (x, y) => { zp = [x, y]; probeLater(); } });
    }
    const probeLater = perFrame(safe(drawProbe));
    function domainInfo(hover) {
      const parts = [{ tex: 'f(z) = ' + cTeX(F.ast) }];
      if (hover) parts.push(hover);
      else parts.push(el('span', { class: 'w-cx-hint', text: MA.t('Hue shows arg f(z) (red: positive real values); zeros are dark, poles are white; each band is a doubling of |f(z)|.') }));
      info.set(...parts);
    }
    function show() {
      domBox.style.display = mode === 'domain' ? '' : 'none';
      pairBox.style.display = mode === 'domain' ? 'none' : '';
      if (mode === 'domain') { R.render(0.3); domainInfo(); } else drawGrid();
    }
    MA.ui.seg(bar, { label: MA.t('Show'), value: mode, options: [['domain', MA.t('Colouring')], ['grid', MA.t('Grid')], ['polar', MA.t('Polar grid')]], onChange: safe((v) => { mode = v; show(); }) });
    if (sl.specs.length) {
      const again = perFrame(safe(() => { if (mode === 'domain') R.render(0.3); else drawGrid(); }));
      MA.ui.sliders(bar, sl.specs, (v) => { Object.assign(scope, v); again(); });
    }
    D.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      const w = f(x, y);
      read('z = ' + fmtC(x, y, 3) + '   f(z) = ' + fmtC(w[0], w[1], 3) + '   |f| = ' + MA.fmt(Math.hypot(w[0], w[1]), 3) + '   arg f = ' + (Number.isFinite(w[0]) && Number.isFinite(w[1]) && (w[0] || w[1]) ? deg(Math.atan2(w[1], w[0])) : '–'));
    }));
    show();
  });

  // ================================================================== complexplane
  MA.widget('complexplane', (stage, cfg) => {
    const zs = pointsOf(C.has(cfg.z) ? cfg.z : '1.5,1', 'z'), ws = pointsOf(C.has(cfg.w) ? cfg.w : '0.5,1.2', 'w');
    let z = zs[0].slice(0, 2), w = ws[0].slice(0, 2);
    let mode = C.str(cfg.mode, 'product').toLowerCase();
    const MODES = ['sum', 'product', 'quotient', 'powers', 'roots'];
    if (!MODES.includes(mode)) throw new Error(MA.t('mode must be one of %s', MODES.join(', ')));
    let n = C.int(cfg.n, 5);
    if (!(n >= 1)) throw new Error(MA.t('n must be a positive integer'));
    n = Math.min(n, 36);
    let conj = false;

    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const narrow = (stage.clientWidth || 640) < 520;
    const P = new MA.Plot(stage, { x: [-3, 3], y: [-2, 2], equal: true, width: narrow ? 480 : 640, height: narrow ? 460 : 420, xLabel: 'Re', yLabel: 'Im', label: MA.t('The complex plane') });
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const mod = (a) => Math.hypot(a[0], a[1]), arg = (a) => Math.atan2(a[1], a[0]);
    const snap = (v) => Math.round(v * 20) / 20;
    const res = () => (mode === 'sum' ? [z[0] + w[0], z[1] + w[1]] : mode === 'product' ? cmul(z, w) : mode === 'quotient' ? cdiv(z, w) : null);

    function fitView() {
      let R = 2;
      const r = res();
      if (mode === 'powers') { let m = 1; for (let k = 1; k <= n; k++) m = Math.max(m, Math.pow(mod(z), k)); R = Math.max(1.6, Math.min(m, 8) * 1.15); R = Math.max(R, mod(z) * 1.15); }
      else if (mode === 'roots') R = Math.max(1.6, 1.2 * Math.max(mod(z), Math.pow(mod(z), 1 / n), 1));
      else R = Math.max(2, 1.2 * Math.max(mod(z), mod(w), r && Number.isFinite(mod(r)) ? Math.min(mod(r), 8) : 0, 1));
      P.setView([-R, R], [-R, R]);
      if (hz) hz.set(z[0], z[1]);
      if (hw) hw.set(w[0], w[1]);
    }
    function arc(r, a0, a1, o) {
      const pts = [];
      const N = Math.max(8, Math.ceil(Math.abs(a1 - a0) / 0.05));
      for (let i = 0; i <= N; i++) { const a = a0 + (a1 - a0) * i / N; pts.push([r * Math.cos(a), r * Math.sin(a)]); }
      P.path(pts, Object.assign({ width: 2 }, o));
      if (Math.abs(a1 - a0) > 0.12) {
        const a = a1, px = P.X(r * Math.cos(a)), py = P.Y(r * Math.sin(a)), dir = a1 > a0 ? 1 : -1;
        const tx = -Math.sin(a) * dir, ty = -Math.cos(a) * dir; // screen tangent (y down)
        const len = 7, wid = 3.5, bx = px - len * tx, by = py - len * ty;
        P.layers.marks.append(el('path', { d: `M${px.toFixed(1)},${py.toFixed(1)}L${(bx - wid * ty).toFixed(1)},${(by + wid * tx).toFixed(1)}L${(bx + wid * ty).toFixed(1)},${(by - wid * tx).toFixed(1)}Z`, style: 'fill:' + (o.color || 'var(--ink)') }));
      }
    }
    const lbl = (p, s, color, dx, dy) => P.tex(p[0], p[1], s, { dx: dx === undefined ? 8 : dx, dy: dy === undefined ? -10 : dy, size: 15, color: color || 'var(--ink)', w: 90, h: 26, anchor: dx < 0 ? 'end' : 'start' });
    /** Put a label on the outside of a point (away from the origin). */
    const lblOut = (p, s, color) => { const a = Math.atan2(p[1], p[0]); lbl(p, s, color, Math.cos(a) >= -0.2 ? 9 : -9, Math.sin(a) >= 0 ? -12 : 14); };
    const vec = (p, color, width) => { if (mod(p) > 1e-9) P.arrow(0, 0, p[0], p[1], { color, width: width || 2.2, layer: 'curves' }); };

    function draw() {
      P.clear();
      P.circle(0, 0, 1, { color: 'var(--ink-3)', width: 1, dash: '3 4', layer: 'fill' });
      P.dot(1, 0, { r: 3, color: 'var(--ink-3)' });
      const parts = [];
      const zr = mod(z), za = arg(z), wr = mod(w), wa = arg(w);
      const pz = 'var(--series-1)', pw = 'var(--series-2)', pr = 'var(--series-3)';
      let items = [{ label: 'z', color: pz }, { label: 'w', color: pw }];
      if (mode === 'sum') {
        const s = res();
        P.poly([[0, 0], z, s, w], { fill: pr, fillOpacity: 0.08 });
        P.line(z[0], z[1], s[0], s[1], { color: pw, width: 1.6, dash: '5 4' });
        P.line(w[0], w[1], s[0], s[1], { color: pz, width: 1.6, dash: '5 4' });
        vec(z, pz); vec(w, pw); vec(s, pr, 2.8);
        lblOut(s, 'z+w', pr);
        items.push({ label: 'z + w', color: pr });
        parts.push(MA.ui.kv('z + w =', fmtC(s[0], s[1])), { tex: '(' + texC(z[0], z[1], 3) + ') + (' + texC(w[0], w[1], 3) + ')' }, el('span', { class: 'w-cx-hint', text: MA.t('Add the real parts and the imaginary parts: the parallelogram rule for vectors.') }));
      } else if (mode === 'product' || mode === 'quotient') {
        const r = res();
        const prod = mode === 'product';
        if (Number.isFinite(r[0])) {
          // similar triangles: (0, 1, z) ~ (0, w, zw)  and  (0, 1, z/w) ~ (0, w, z)
          if (prod) { P.poly([[0, 0], [1, 0], z], { fill: pz, fillOpacity: 0.13, stroke: pz, width: 1 }); P.poly([[0, 0], w, r], { fill: pr, fillOpacity: 0.13, stroke: pr, width: 1 }); }
          else { P.poly([[0, 0], [1, 0], r], { fill: pr, fillOpacity: 0.13, stroke: pr, width: 1 }); P.poly([[0, 0], w, z], { fill: pz, fillOpacity: 0.13, stroke: pz, width: 1 }); }
          const R = Math.min(P.x1, P.y1);
          if (prod) {
            arc(0.2 * R, 0, za, { color: pz });
            arc(0.28 * R, za, za + wa, { color: pw });
          } else {
            arc(0.2 * R, 0, wa, { color: pw });
            arc(0.28 * R, wa, za, { color: pz, dash: '4 3' });
            arc(0.36 * R, 0, za - wa, { color: pr });
          }
          vec(z, pz); vec(w, pw); vec(r, pr, 2.8);
          lblOut(r, prod ? 'zw' : 'z/w', pr);
          items.push({ label: prod ? 'zw' : 'z/w', color: pr });
          const rr = mod(r);
          const sumA = prod ? za + wa : za - wa;
          const norm = Math.atan2(Math.sin(sumA), Math.cos(sumA));
          parts.push(MA.ui.kv(prod ? 'zw =' : 'z/w =', fmtC(r[0], r[1])));
          parts.push({ tex: (prod ? '|zw| = |z|\\,|w| = ' + MA.fmt(zr, 4) + '\\times' + MA.fmt(wr, 4) : '\\left|\\tfrac{z}{w}\\right| = \\tfrac{|z|}{|w|} = \\tfrac{' + MA.fmt(zr, 4) + '}{' + MA.fmt(wr, 4) + '}') + ' = ' + MA.fmt(rr, 4) });
          parts.push({ tex: (prod ? '\\arg zw = \\arg z + \\arg w = ' + MA.fmt(za * 180 / Math.PI, 4) + '^\\circ + ' : '\\arg\\tfrac{z}{w} = \\arg z - \\arg w = ' + MA.fmt(za * 180 / Math.PI, 4) + '^\\circ - ') + '(' + MA.fmt(wa * 180 / Math.PI, 4) + '^\\circ) = ' + MA.fmt(sumA * 180 / Math.PI, 4) + '^\\circ' + (Math.abs(norm - sumA) > 1e-9 ? '\\equiv ' + MA.fmt(norm * 180 / Math.PI, 4) + '^\\circ' : '') });
        } else parts.push(el('span', { class: 'w-cx-bad', text: MA.t('w = 0: division by zero') }));
      } else if (mode === 'powers') {
        items = [{ label: 'z', color: pz }, { label: 'z^k', color: pr }];
        // continuous spiral z^s = exp(s Log z) through the powers
        const sp = [];
        for (let i = 0; i <= 60 * n; i++) { const s = i / 60, m = Math.pow(zr, s), a = s * za; sp.push([m * Math.cos(a), m * Math.sin(a)]); }
        P.path(sp, { color: pr, width: 1.4, opacity: 0.55, dash: '5 4' });
        let p = [1, 0];
        const pts = [[1, 0]];
        for (let k = 1; k <= n; k++) { p = cmul(p, z); pts.push(p); }
        pts.forEach((q, k) => { if (k) P.line(0, 0, q[0], q[1], { color: pr, width: 1, opacity: 0.35 }); });
        pts.forEach((q, k) => { P.dot(q[0], q[1], { r: k === 0 ? 3.5 : 4.5, color: k === 1 ? pz : pr }); if (k <= 12 && k >= 2) lblOut(q, 'z^{' + k + '}', pr); });
        vec(z, pz);
        parts.push({ tex: 'z^{' + n + '} = |z|^{' + n + '} e^{i\\,' + n + '\\theta} = ' + MA.fmt(zr, 4) + '^{' + n + '}\\, e^{i\\cdot ' + n + '\\cdot ' + MA.fmt(za * 180 / Math.PI, 4) + '^\\circ}' },
          MA.ui.kv('z^n =', fmtC(pts[n][0], pts[n][1])), MA.ui.kv('|z^n| =', MA.fmt(Math.pow(zr, n), 4)),
          el('span', { class: 'w-cx-hint', text: zr > 1.0005 ? MA.t('|z| > 1: the powers spiral outwards.') : zr < 0.9995 ? MA.t('|z| < 1: the powers spiral in to 0.') : MA.t('|z| = 1: the powers stay on the unit circle.') }));
      } else if (mode === 'roots') {
        items = [{ label: 'z', color: pz }, { label: MA.t('n-th roots of z'), color: pr }];
        const rho = Math.pow(zr, 1 / n);
        const roots = [];
        for (let k = 0; k < n; k++) { const a = (za + TAU * k) / n; roots.push([rho * Math.cos(a), rho * Math.sin(a)]); }
        P.circle(0, 0, rho, { color: pr, width: 1.2, dash: '4 4', layer: 'fill' });
        if (n >= 2) P.poly(roots, { fill: pr, fillOpacity: 0.1, stroke: pr, width: 1.6 });
        roots.forEach((q, k) => { P.line(0, 0, q[0], q[1], { color: pr, width: 1, opacity: 0.4 }); P.dot(q[0], q[1], { r: k === 0 ? 5.5 : 4.5, color: pr }); if (n <= 12) lblOut(q, 'w_{' + k + '}', pr); });
        if (n >= 2) arc(0.6 * rho, za / n, (za + TAU) / n, { color: 'var(--ink-3)', width: 1.4 });
        vec(z, pz);
        parts.push({ tex: 'w_k = \\sqrt[' + n + ']{|z|}\\; e^{i(\\theta + 2\\pi k)/' + n + '},\\ k = 0,\\dots,' + (n - 1) },
          MA.ui.kv(MA.t('radius'), MA.fmt(rho, 4)), MA.ui.kv(MA.t('spacing'), MA.fmt(360 / n, 4) + '°'), MA.ui.kv('w_0 =', fmtC(roots[0][0], roots[0][1])));
      }
      if (conj) {
        P.line(z[0], z[1], z[0], -z[1], { color: 'var(--ink-3)', width: 1.2, dash: '3 3' });
        P.dot(z[0], -z[1], { r: 5, color: pz, hollow: true });
        lbl([z[0], -z[1]], '\\bar z', pz, 8, z[1] > 0 ? 14 : -12);
        if (mode !== 'powers' && mode !== 'roots') {
          P.line(w[0], w[1], w[0], -w[1], { color: 'var(--ink-3)', width: 1.2, dash: '3 3' });
          P.dot(w[0], -w[1], { r: 5, color: pw, hollow: true });
          lbl([w[0], -w[1]], '\\bar w', pw, 8, w[1] > 0 ? 14 : -12);
        }
        parts.push({ tex: '\\bar z = ' + texC(z[0], -z[1], 3) + ',\\ z\\bar z = |z|^2 = ' + MA.fmt(zr * zr, 4) });
      }
      lblOut(z, 'z', pz);
      if (mode !== 'powers' && mode !== 'roots') lblOut(w, 'w', pw);
      const polar = (name, p) => ({ tex: name + ' = ' + texC(p[0], p[1], 3) + ' = ' + MA.fmt(mod(p), 4) + '\\,e^{i\\cdot' + MA.fmt(arg(p) * 180 / Math.PI, 4) + '^\\circ}' });
      const head = [polar('z', z)];
      if (mode !== 'powers' && mode !== 'roots') head.push(polar('w', w));
      info.set(...head, ...parts);
      const lg = el('div', { class: 'w-legend' });
      legend.replaceChildren();
      MA.ui.legend(lg, items);
      legend.append(...lg.firstChild.childNodes);
    }
    let hz = null, hw = null;
    const later = perFrame(safe(draw));
    const lim = (x, y) => [snap(clamp(x, P.x0, P.x1)), snap(clamp(y, P.y0, P.y1))];
    hz = P.handle(z[0], z[1], { label: MA.t('Point z'), color: 'var(--series-1)', constrain: lim, onDrag: (x, y) => { z = [x, y]; later(); }, step: 0.05 });
    hw = P.handle(w[0], w[1], { label: MA.t('Point w'), color: 'var(--series-2)', constrain: lim, onDrag: (x, y) => { w = [x, y]; later(); }, step: 0.05 });
    const nSl = MA.ui.slider(bar, { label: 'n', min: 1, max: Math.max(12, n), step: 1, value: n, fmt: (v) => String(v), onInput: (v) => { n = v; if (mode === 'powers' || mode === 'roots') fitView(); later(); } });
    function modeUI() {
      hw.el.style.display = mode === 'powers' || mode === 'roots' ? 'none' : '';
      nSl.el.style.display = mode === 'powers' || mode === 'roots' ? '' : 'none';
    }
    MA.ui.seg(bar, { label: MA.t('Operation'), value: mode, options: [['sum', 'z + w'], ['product', 'zw'], ['quotient', 'z/w'], ['powers', 'z^n'], ['roots', '\\sqrt[n]{z}']],
      onChange: safe((v) => { mode = v; modeUI(); fitView(); draw(); }) });
    bar.insertBefore(bar.lastChild, bar.firstChild);
    MA.ui.toggle(bar, { label: MA.t('Conjugates'), value: false, onChange: safe((v) => { conj = v; draw(); }) });
    MA.ui.button(bar, { label: MA.t('Fit view'), onClick: safe(() => { fitView(); draw(); }) });
    modeUI();
    fitView();
    draw();
  });

  // ================================================================== contourint
  MA.widget('contourint', (stage, cfg) => {
    if (!C.has(cfg.f)) throw new Error(MA.t('contourint needs f, a function of z'));
    const F = cexpr(cfg.f, []);
    const f = (x, y) => F.f({ z: [x, y] });
    const c0 = pointsOf(C.has(cfg.center) ? cfg.center : '0,0', 'center')[0];
    let cx = c0[0], cy = c0[1];
    const r0 = C.num(cfg.radius, 1);
    if (!(r0 > 0)) throw new Error(MA.t('radius must be positive'));
    let r = r0;
    const xr = C.range(cfg.x, [-3, 3]), yr = C.range(cfg.y, [-3, 3]);
    const given = pointsOf(cfg.poles, 'poles').map((p) => [p[0], p[1]]);
    const narrow = (stage.clientWidth || 640) < 520;

    MA.ui.title(stage, cfg.title);
    colourKey(stage);
    const P = new MA.Plot(stage, { x: xr, y: yr, equal: true, grid: false, width: narrow ? 480 : 640, height: narrow ? 440 : 420, xLabel: 'Re z', yLabel: 'Im z', label: MA.t('Contour over the domain colouring of f') });
    const cv = canvasUnder(P);
    cv.style.opacity = '0.8';
    const R = pixelRenderer(P, cv, (x, y, out, o) => { const w = f(x, y); dcColour(w[0], w[1], out, o); });
    const read = P.readout();
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    const scale = Math.max(P.x1 - P.x0, P.y1 - P.y0);

    /** ∮ over the circle |z − (a, b)| = rho by the trapezoid rule with N points (spectrally accurate for analytic f). */
    function circleInt(a, b, rho, N) {
      let sr = 0, si = 0, bad = false;
      for (let k = 0; k < N; k++) {
        const t = TAU * k / N, c = Math.cos(t), s = Math.sin(t);
        const w = f(a + rho * c, b + rho * s);
        if (!Number.isFinite(w[0]) || !Number.isFinite(w[1])) { bad = true; continue; }
        // f(z) dz with dz = i rho e^{it} dt
        sr += w[0] * (-rho * s) - w[1] * (rho * c);
        si += w[0] * (rho * c) + w[1] * (-rho * s);
      }
      return { re: sr * TAU / N, im: si * TAU / N, bad };
    }
    /** Poles from the settings, or found numerically (Newton's method on 1/f from local maxima of |f|). */
    function findPoles() {
      const NX = 96, NY = 64, M = new Float64Array((NX + 1) * (NY + 1));
      for (let j = 0; j <= NY; j++) for (let i = 0; i <= NX; i++) {
        const w = f(P.x0 + (P.x1 - P.x0) * i / NX, P.y0 + (P.y1 - P.y0) * j / NY);
        const m = Math.hypot(w[0], w[1]);
        M[j * (NX + 1) + i] = Number.isNaN(m) ? Infinity : m;
      }
      const sorted = Array.from(M).filter(Number.isFinite).sort((a, b) => a - b);
      const med = sorted.length ? sorted[sorted.length >> 1] : 1;
      const out = [];
      const g = (x, y) => { const w = f(x, y); const d = w[0] * w[0] + w[1] * w[1]; return d === Infinity || Number.isNaN(d) ? [0, 0] : [w[0] / d, -w[1] / d]; };
      for (let j = 1; j < NY; j++) for (let i = 1; i < NX; i++) {
        const m = M[j * (NX + 1) + i];
        if (!(m > 20 * med + 1e-9)) continue;
        let peak = true;
        for (let dj = -1; dj <= 1 && peak; dj++) for (let di = -1; di <= 1; di++) if ((di || dj) && M[(j + dj) * (NX + 1) + i + di] > m) { peak = false; break; }
        if (!peak) continue;
        let x = P.x0 + (P.x1 - P.x0) * i / NX, y = P.y0 + (P.y1 - P.y0) * j / NY, ok = false;
        for (let it = 0; it < 60; it++) {
          const v = g(x, y);
          if (v[0] === 0 && v[1] === 0) { ok = true; break; }
          const hh = 1e-6 * Math.max(1, Math.hypot(x, y));
          const a = g(x + hh, y), b = g(x - hh, y);
          const d = [(a[0] - b[0]) / (2 * hh), (a[1] - b[1]) / (2 * hh)];
          const st = cdiv(v, d);
          if (!Number.isFinite(st[0]) || !Number.isFinite(st[1])) break;
          const lim = 0.1 * scale, n = Math.hypot(st[0], st[1]);
          x -= n > lim ? st[0] * lim / n : st[0]; y -= n > lim ? st[1] * lim / n : st[1];
          if (n < 1e-11 * scale) { ok = true; break; }
        }
        if (!ok || x < P.x0 || x > P.x1 || y < P.y0 || y > P.y1) continue;
        const v = g(x, y);
        if (Math.hypot(v[0], v[1]) > 1e-8) continue;
        const rx = Math.abs(x - Math.round(x * 1e6) / 1e6) < 1e-9 ? Math.round(x * 1e6) / 1e6 : x, ry = Math.abs(y - Math.round(y * 1e6) / 1e6) < 1e-9 ? Math.round(y * 1e6) / 1e6 : y;
        if (!out.some((p) => Math.hypot(p[0] - rx, p[1] - ry) < 1e-6 * scale)) out.push([rx, ry]);
        if (out.length >= 24) return out;
      }
      return out;
    }
    const auto = !given.length;
    const poles = auto ? findPoles() : given;
    // residues by small circles that enclose no other pole
    const residues = poles.map((p, k) => {
      let d = Infinity;
      poles.forEach((q, j) => { if (j !== k) d = Math.min(d, Math.hypot(q[0] - p[0], q[1] - p[1])); });
      const eps = Math.min(0.1 * scale / 6, 0.35 * d);
      const I = circleInt(p[0], p[1], eps, 512);
      // Res = I / (2πi)
      return I.bad ? [NaN, NaN] : [I.im / TAU, -I.re / TAU];
    });

    let hc = null, hr = null, ang = -Math.PI / 5;
    function draw() {
      P.clear();
      const N = 1024;
      const I = circleInt(cx, cy, r, N), I2 = circleInt(cx, cy, r, N / 2);
      // contour with a halo, and arrowheads for the positive (anticlockwise) direction
      P.circle(cx, cy, r, { color: 'var(--plot-bg)', width: 5.5, layer: 'curves' });
      P.circle(cx, cy, r, { color: 'var(--ink)', width: 2.2, layer: 'curves' });
      let hd = '';
      for (let k = 0; k < 4; k++) {
        const t = Math.PI / 4 + k * Math.PI / 2, px = P.X(cx + r * Math.cos(t)), py = P.Y(cy + r * Math.sin(t));
        const a = Math.atan2(-Math.cos(t), -Math.sin(t)); // screen direction of increasing t
        const c = Math.cos(a), s = Math.sin(a), bx = px - 10 * c, by = py - 10 * s;
        hd += `M${(px + 2 * c).toFixed(1)},${(py + 2 * s).toFixed(1)}L${(bx - 5 * s).toFixed(1)},${(by + 5 * c).toFixed(1)}L${(bx + 5 * s).toFixed(1)},${(by - 5 * c).toFixed(1)}Z`;
      }
      P.layers.marks.append(el('path', { d: hd, style: 'fill:var(--ink);stroke:var(--plot-bg);stroke-width:1' }));
      // poles
      let sr = 0, si = 0, unknown = false, onContour = false;
      const inside = [];
      poles.forEach((p, k) => {
        const d = Math.hypot(p[0] - cx, p[1] - cy);
        const isIn = d < r;
        if (Math.abs(d - r) < 2e-3 * r + 1e-9) onContour = true;
        const px = P.X(p[0]), py = P.Y(p[1]);
        P.layers.top.append(el('circle', { cx: px, cy: py, r: 5.5, style: 'fill:var(--plot-bg);stroke:' + (isIn ? 'var(--accent)' : 'var(--ink)') + ';stroke-width:' + (isIn ? 2.6 : 1.6) }));
        P.layers.top.append(el('path', { d: `M${px - 3},${py - 3}L${px + 3},${py + 3}M${px - 3},${py + 3}L${px + 3},${py - 3}`, style: 'stroke:' + (isIn ? 'var(--accent)' : 'var(--ink)') + ';stroke-width:1.6' }));
        const rs = residues[k];
        if (poles.length <= 8) P.text(p[0], p[1], 'Res = ' + fmtC(rs[0], rs[1], 3), { dx: 9, dy: -9, size: 11.5, color: 'var(--ink)', layer: 'top' });
        if (isIn) {
          inside.push(k);
          if (!Number.isFinite(rs[0])) unknown = true; else { sr += rs[0]; si += rs[1]; }
        }
      });
      // 2πi Σ Res; parts below the round-off level of the computation are shown as 0
      let pr = -TAU * si, pi = TAU * sr;
      let tol = 1e-12 * Math.max(1, Math.hypot(I.re, I.im));
      residues.forEach((q) => { if (Number.isFinite(q[0])) tol = Math.max(tol, 1e-12 * TAU * Math.hypot(q[0], q[1])); });
      const tidy = (v) => (Math.abs(v) < tol ? 0 : v);
      I.re = tidy(I.re); I.im = tidy(I.im); pr = tidy(pr); pi = tidy(pi);
      const parts = [];
      parts.push({ tex: 'f(z) = ' + cTeX(F.ast) });
      parts.push(MA.ui.kv('C:', (Math.hypot(cx, cy) < 1e-12 ? '|z|' : '|z − (' + fmtC(cx, cy, 3) + ')|') + ' = ' + MA.fmt(r, 3)));
      const through = onContour || I.bad || !Number.isFinite(I.re) || !Number.isFinite(I.im);
      parts.push(MA.ui.kv('\\oint_C f(z)\\,dz \\approx', through ? '–' : fmtC(I.re, I.im, 7), true));
      parts.push(MA.ui.kv(inside.length ? '2\\pi i \\sum_{\\text{inside}} \\operatorname{Res} =' : '2\\pi i \\cdot 0 =', through ? '–' : fmtC(pr, pi, 7), true));
      const diff = Math.hypot(I.re - pr, I.im - pi), size = Math.max(1, Math.hypot(I.re, I.im));
      const unstable = Math.hypot(I.re - I2.re, I.im - I2.im) > 1e-7 * size;
      if (through) parts.push(el('span', { class: 'w-cx-bad', text: MA.t('The contour passes through a pole: the integral does not exist. Move or resize the circle.') }));
      else if (unknown) parts.push(el('span', { class: 'w-cx-bad', text: MA.t('A residue could not be computed.') }));
      else if (diff <= 1e-6 * size && !unstable) parts.push(el('span', { class: 'w-cx-ok', text: '✓ ' + MA.t('equal (difference %s)', MA.fmt(diff, 2)) }));
      else if (unstable) parts.push(el('span', { class: 'w-cx-bad', text: MA.t('The numerical integral has not converged: the contour runs very close to a pole, or crosses a branch cut where f jumps.') }));
      else parts.push(el('span', { class: 'w-cx-bad', text: MA.t('The two values differ: inside the circle f has a singularity that is not a listed pole, or a branch cut.') }));
      parts.push(el('span', { class: 'w-cx-hint', text: (auto ? (poles.length ? MA.t('Singularities found numerically.') + ' ' : MA.t('No poles found in this window.') + ' ') : '') + MA.t('Drag the centre or the rim of the circle.') }));
      info.set(...parts);
      const ax = cx + r * Math.cos(ang), ay = cy + r * Math.sin(ang);
      if (hc) hc.set(cx, cy); else hc = P.handle(cx, cy, { label: MA.t('Centre of the circle'), constrain: (x, y) => [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)], onDrag: (x, y) => { cx = x; cy = y; later(); } });
      if (hr) hr.set(ax, ay); else hr = P.handle(ax, ay, { r: 6, color: 'var(--ink)', label: MA.t('Radius of the circle'),
        constrain: (x, y) => { const d = Math.hypot(x - cx, y - cy); if (d > 1e-9) ang = Math.atan2(y - cy, x - cx); const rr = Math.max(0.02 * scale, d); return [cx + rr * Math.cos(ang), cy + rr * Math.sin(ang)]; },
        onDrag: (x, y) => { r = Math.max(0.02 * scale, Math.hypot(x - cx, y - cy)); rSl.set(r); later(); } });
    }
    const later = perFrame(safe(draw));
    const rSl = MA.ui.slider(bar, { label: 'r', min: 0.02 * scale, max: 0.75 * scale, step: 'any', value: r, fmt: (v) => MA.fmt(v, 3), onInput: (v) => { r = v; later(); } });
    MA.ui.button(bar, { label: MA.t('Reset'), onClick: safe(() => { cx = c0[0]; cy = c0[1]; r = r0; rSl.set(r); draw(); }) });
    P.onHover(safe((x, y) => {
      if (x === null) { read(null); return; }
      const w = f(x, y);
      read('z = ' + fmtC(x, y, 3) + '   f(z) = ' + fmtC(w[0], w[1], 3));
    }));
    R.render(0.35);
    draw();
  });

  // ================================================================== winding
  MA.widget('winding', (stage, cfg) => {
    const hasX = C.has(cfg.fx), hasY = C.has(cfg.fy);
    if (hasX !== hasY) throw new Error(MA.t('winding needs both fx and fy (or neither, for the default curve)'));
    const FX = C.expr(hasX ? cfg.fx : '(0.6 + 1.2cos(t))cos(t)', ['t']), FY = C.expr(hasY ? cfg.fy : '(0.6 + 1.2cos(t))sin(t)', ['t']);
    const [ta, tb] = C.range(cfg.t, [0, TAU]);
    const canDraw = C.bool(cfg.draw, true);
    const p0 = pointsOf(C.has(cfg.point) ? cfg.point : '0.3,0.2', 'point')[0];
    let pt = [p0[0], p0[1]];
    // the parametric curve as a closed polygon
    function paramCurve() {
      const pts = [];
      const N = 900;
      for (let i = 0; i <= N; i++) {
        const t = ta + (tb - ta) * i / N, x = FX.f({ t }), y = FY.f({ t });
        if (Number.isFinite(x) && Number.isFinite(y)) pts.push([x, y]);
      }
      if (pts.length < 3) throw new Error(MA.t('the curve (fx, fy) is not finite on the interval t'));
      return pts;
    }
    const base = paramCurve();
    let curve = base.slice();
    // window: the curve's bounding box, padded, containing the point
    let bx0 = Math.min(pt[0], ...base.map((p) => p[0])), bx1 = Math.max(pt[0], ...base.map((p) => p[0]));
    let by0 = Math.min(pt[1], ...base.map((p) => p[1])), by1 = Math.max(pt[1], ...base.map((p) => p[1]));
    const padv = 0.25 * Math.max(bx1 - bx0, by1 - by0, 1);
    const narrow = (stage.clientWidth || 640) < 520;

    MA.ui.title(stage, cfg.title);
    const legend = el('div', { class: 'w-legend' });
    stage.append(legend);
    const P = new MA.Plot(stage, { x: [bx0 - padv, bx1 + padv], y: [by0 - padv, by1 + padv], equal: true, width: narrow ? 480 : 640, height: narrow ? 440 : 420, label: MA.t('A closed curve and the winding number of a point') });
    const cv = canvasUnder(P, 'w-cx-wn');
    const bar = MA.ui.bar(stage);
    const info = MA.ui.info(stage);
    if (canDraw) P.wrap.classList.add('w-cx-draw');

    /** Closed polygon: the curve plus the closing segment if its ends do not meet. */
    const closed = () => {
      const a = curve[0], b = curve[curve.length - 1];
      return Math.hypot(a[0] - b[0], a[1] - b[1]) > 1e-9 ? curve.concat([a]) : curve;
    };
    const isOpen = () => { const a = curve[0], b = curve[curve.length - 1]; return Math.hypot(a[0] - b[0], a[1] - b[1]) > 1e-6 * (P.x1 - P.x0); };
    /** Winding number of the closed polygon around q (sum of the changes in argument), or NaN on the curve. */
    function windingAt(q, poly, upto) {
      let tot = 0;
      const n = upto === undefined ? poly.length - 1 : upto;
      for (let i = 0; i < n; i++) {
        const a = poly[i], b = poly[i + 1];
        const ax = a[0] - q[0], ay = a[1] - q[1], bx = b[0] - q[0], by = b[1] - q[1];
        if (Math.hypot(ax, ay) < 1e-12 || Math.hypot(bx, by) < 1e-12) return NaN;
        tot += Math.atan2(ax * by - ay * bx, ax * bx + ay * by);
      }
      return tot / TAU;
    }
    /** Winding numbers on a raster by scanlines: signed crossings of each row, summed from the right. */
    function raster(w, h, x0, x1, y0, y1) {
      const poly = closed(), out = new Int16Array(w * h);
      const dx = (x1 - x0) / w;
      const xs = [];
      for (let row = 0; row < h; row++) {
        const y = y1 - (row + 0.5) * (y1 - y0) / h;
        xs.length = 0;
        for (let i = 0; i + 1 < poly.length; i++) {
          const a = poly[i], b = poly[i + 1];
          if ((a[1] <= y) !== (b[1] <= y)) {
            const x = a[0] + (y - a[1]) * (b[0] - a[0]) / (b[1] - a[1]);
            xs.push([x, b[1] > a[1] ? 1 : -1]);
          }
        }
        if (!xs.length) continue;
        xs.sort((p, q) => p[0] - q[0]);
        // winding number at x = sum of signs of crossings to the right of x
        let wn = 0, k = xs.length - 1;
        for (let i = w - 1; i >= 0; i--) {
          const x = x0 + (i + 0.5) * dx;
          while (k >= 0 && xs[k][0] > x) { wn += xs[k][1]; k--; }
          out[row * w + i] = wn;
        }
      }
      return out;
    }
    const ctx = cv.getContext('2d');
    let cols = null;
    function paintRegions() {
      const [w, h] = deviceSize(P, 1);
      const wn = raster(w, h, P.x0, P.x1, P.y0, P.y1);
      const img = ctx.createImageData(w, h), d = img.data;
      if (!cols) cols = { pos: rgbOf('var(--series-1)'), neg: rgbOf('var(--series-2)'), bg: rgbOf('var(--plot-bg)') };
      const cache = new Map();
      const colour = (n) => {
        if (!cache.has(n)) {
          const a = n === 0 ? 0 : Math.min(0.62, 0.17 + 0.15 * (Math.abs(n) - 1)), c = n > 0 ? cols.pos : cols.neg;
          cache.set(n, [0, 1, 2].map((i) => Math.round(cols.bg[i] * (1 - a) + c[i] * a)));
        }
        return cache.get(n);
      };
      for (let i = 0, o = 0; i < w * h; i++, o += 4) { const c = colour(wn[i]); d[o] = c[0]; d[o + 1] = c[1]; d[o + 2] = c[2]; d[o + 3] = 255; }
      cv.width = w; cv.height = h;
      ctx.putImageData(img, 0, 0);
    }
    /** Labels for the regions: the winding number at the most interior cell of each large connected region. */
    function regionLabels() {
      const cell = 7, pw = P.W - P.pl - P.pr, ph = P.H - P.pt - P.pb, nx = Math.floor(pw / cell), ny = Math.floor(ph / cell);
      const wn = raster(nx, ny, P.x0, P.x1, P.y0, P.y1);
      const comp = new Int32Array(nx * ny).fill(-1), dist = new Int32Array(nx * ny);
      const labels = [];
      const qx = new Int32Array(nx * ny);
      let c = 0;
      for (let s = 0; s < nx * ny; s++) {
        if (comp[s] >= 0) continue;
        const v = wn[s];
        let head = 0, tail = 0;
        qx[tail++] = s; comp[s] = c;
        const members = [];
        while (head < tail) {
          const q = qx[head++]; members.push(q);
          const i = q % nx, j = (q - i) / nx;
          const nb = [i > 0 ? q - 1 : -1, i < nx - 1 ? q + 1 : -1, j > 0 ? q - nx : -1, j < ny - 1 ? q + nx : -1];
          for (const t of nb) if (t >= 0 && comp[t] < 0 && wn[t] === v) { comp[t] = c; qx[tail++] = t; }
        }
        if (members.length >= 30) {
          // distance to the region's boundary (multi-source BFS), label at the farthest cell
          head = 0; tail = 0;
          members.forEach((q) => {
            const i = q % nx, j = (q - i) / nx;
            const edge = i === 0 || j === 0 || i === nx - 1 || j === ny - 1 || wn[q - 1] !== v || wn[q + 1] !== v || wn[q - nx] !== v || wn[q + nx] !== v;
            dist[q] = edge ? 0 : -1;
            if (edge) qx[tail++] = q;
          });
          let best = qx[0];
          while (head < tail) {
            const q = qx[head++];
            best = q;
            const i = q % nx;
            for (const t of [i > 0 ? q - 1 : -1, i < nx - 1 ? q + 1 : -1, q - nx, q + nx]) if (t >= 0 && t < nx * ny && comp[t] === c && dist[t] < 0) { dist[t] = dist[q] + 1; qx[tail++] = t; }
          }
          if (dist[best] >= 2) {
            const i = best % nx, j = (best - i) / nx;
            labels.push({ x: P.x0 + (i + 0.5) / nx * (P.x1 - P.x0), y: P.y1 - (j + 0.5) / ny * (P.y1 - P.y0), n: v });
          }
        }
        c++;
      }
      return labels;
    }
    let traceS = null;
    function drawCurve() {
      P.clear();
      paintRegions();
      const poly = closed();
      P.path(curve, { color: 'var(--ink)', width: 2.2 });
      if (isOpen()) P.path([curve[curve.length - 1], curve[0]], { color: 'var(--ink)', width: 1.6, dash: '5 4' });
      // orientation arrows every ~120 px of arc
      let acc = 0, next = 60, hd = '';
      for (let i = 1; i < poly.length; i++) {
        const ax = P.X(poly[i - 1][0]), ay = P.Y(poly[i - 1][1]), bx = P.X(poly[i][0]), by = P.Y(poly[i][1]);
        const L = Math.hypot(bx - ax, by - ay);
        if (!(L > 0)) continue;
        while (acc + L >= next) {
          const t = (next - acc) / L, px = ax + t * (bx - ax), py = ay + t * (by - ay), a = Math.atan2(by - ay, bx - ax);
          const c = Math.cos(a), s = Math.sin(a), qx = px - 9 * c, qy = py - 9 * s;
          hd += `M${px.toFixed(1)},${py.toFixed(1)}L${(qx - 4.2 * s).toFixed(1)},${(qy + 4.2 * c).toFixed(1)}L${(qx + 4.2 * s).toFixed(1)},${(qy - 4.2 * c).toFixed(1)}Z`;
          next += 130;
        }
        acc += L;
      }
      P.layers.marks.append(el('path', { d: hd, style: 'fill:var(--ink)' }));
      regionLabels().forEach((l) => P.text(l.x, l.y, MA.fmt(l.n), { anchor: 'middle', dy: 5, size: 15, color: l.n === 0 ? 'var(--ink-3)' : 'var(--ink)' }));
      const vals = new Set();
      const [w, h] = [60, 40];
      raster(w, h, P.x0, P.x1, P.y0, P.y1).forEach((v) => vals.add(v));
      const items = Array.from(vals).sort((a, b) => a - b).map((v) => ({ label: MA.t('winding number %s', MA.fmt(v)), color: v === 0 ? 'var(--plot-bg)' : v > 0 ? 'var(--series-1)' : 'var(--series-2)', swatch: true }));
      setLegendSw(items);
      drawPoint();
    }
    function setLegendSw(items) {
      legend.replaceChildren();
      items.forEach((it) => {
        const n = it.label;
        const k = el('span', { class: 'k' }, el('span', { class: 'sw', style: '--c:' + it.color + ';border:1px solid var(--rule-2)' }), el('span', { text: n }));
        legend.append(k);
      });
    }
    function drawPoint() {
      P.clear('top');
      const poly = closed();
      const wn = windingAt(pt, poly);
      const parts = [];
      let shown = wn;
      if (traceS !== null) {
        // the moving ray from the point to γ(s) and the angle swept so far
        const m = Math.max(1, Math.round(traceS * (poly.length - 1)));
        const g = poly[m];
        P.path(poly.slice(0, m + 1), { color: 'var(--accent)', width: 4, opacity: 0.55, layer: 'top' });
        P.line(pt[0], pt[1], g[0], g[1], { color: 'var(--accent)', width: 2, arrow: true, layer: 'top' });
        P.dot(g[0], g[1], { r: 4.5, color: 'var(--accent)', layer: 'top' });
        shown = windingAt(pt, poly, m);
        parts.push(MA.ui.kv(MA.t('angle swept / 2π ='), Number.isFinite(shown) ? shown.toFixed(2) : '–'));
      }
      if (Number.isNaN(wn)) parts.unshift(el('span', { class: 'w-cx-bad', text: MA.t('The point lies on the curve: the winding number is not defined there.') }));
      else parts.unshift(el('span', {}, MA.texEl('n(\\gamma, p) = \\frac{1}{2\\pi}\\oint_\\gamma d(\\arg(z - p)) ='), ' ', el('b', { class: 'w-cx-big', text: MA.fmt(Math.round(wn)) })));
      parts.push(MA.ui.kv('p =', fmtC(pt[0], pt[1], 3)));
      if (isOpen()) parts.push(el('span', { class: 'w-cx-hint', text: MA.t('The ends of the curve are joined by the dashed segment.') }));
      parts.push(el('span', { class: 'w-cx-hint', text: canDraw ? MA.t('Drag the point, or draw your own closed curve on the plane.') : MA.t('Drag the point across the curve.') }));
      info.set(...parts);
    }
    const later = perFrame(safe(drawPoint));
    P.handle(pt[0], pt[1], { label: MA.t('Point p'), constrain: (x, y) => [clamp(x, P.x0, P.x1), clamp(y, P.y0, P.y1)], onDrag: (x, y) => { pt = [x, y]; later(); } });

    // ---- the trace animation: a ray from p sweeps along the curve
    const anim = MA.anim((dt) => {
      traceS = Math.min(1, traceS + dt / 5);
      drawPoint();
      if (traceS >= 1) { traceBtn.textContent = MA.t('Trace again'); return false; }
      return true;
    });
    const traceBtn = MA.ui.button(bar, { label: MA.t('Trace the angle'), primary: true, onClick: safe(() => {
      if (anim.running) { anim.stop(); traceBtn.textContent = MA.t('Continue'); return; }
      if (traceS === null || traceS >= 1) traceS = 0;
      traceBtn.textContent = MA.t('Pause');
      anim.play();
    }) });
    if (canDraw || hasX) MA.ui.button(bar, { label: MA.t('Reset curve'), onClick: safe(() => { anim.stop(); traceS = null; traceBtn.textContent = MA.t('Trace the angle'); curve = base.slice(); drawCurve(); }) });

    // ---- freehand drawing
    if (canDraw) {
      let stroke = null, live = null;
      P.svg.addEventListener('pointerdown', safe((e) => {
        if (e.button !== 0 || (e.target.closest && e.target.closest('.handle'))) return;
        const q = P.eventXY(e);
        if (!(q[0] >= P.x0 && q[0] <= P.x1 && q[1] >= P.y0 && q[1] <= P.y1)) return;
        stroke = [q];
        P.svg.setPointerCapture(e.pointerId);
        e.preventDefault();
      }));
      P.svg.addEventListener('pointermove', safe((e) => {
        if (!stroke) return;
        const q = P.eventXY(e), last = stroke[stroke.length - 1];
        if (Math.hypot((q[0] - last[0]) * P.sx, (q[1] - last[1]) * P.sy) < 3) return;
        stroke.push([clamp(q[0], P.x0, P.x1), clamp(q[1], P.y0, P.y1)]);
        if (live) live.remove();
        live = P.path(stroke, { color: 'var(--accent)', width: 2.4, layer: 'top' });
      }));
      const finish = safe(() => {
        if (!stroke) return;
        const s = stroke;
        stroke = null;
        if (live) { live.remove(); live = null; }
        let len = 0;
        for (let i = 1; i < s.length; i++) len += Math.hypot((s[i][0] - s[i - 1][0]) * P.sx, (s[i][1] - s[i - 1][1]) * P.sy);
        if (s.length < 6 || len < 40) return;
        anim.stop(); traceS = null; traceBtn.textContent = MA.t('Trace the angle');
        curve = s;
        drawCurve();
      });
      P.svg.addEventListener('pointerup', finish);
      P.svg.addEventListener('pointercancel', finish);
    }
    window.addEventListener('ma:theme', safe(() => { cols = null; paintRegions(); }));
    if ('ResizeObserver' in window) {
      let lastW = 0, tm = null;
      new ResizeObserver(() => {
        const w = P.svg.getBoundingClientRect().width;
        if (lastW && Math.abs(w - lastW) / lastW < 0.12) return;
        lastW = w;
        clearTimeout(tm);
        tm = setTimeout(safe(paintRegions), 120);
      }).observe(P.wrap);
    }
    drawCurve();
  });
})();
