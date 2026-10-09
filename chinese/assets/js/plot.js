/* Chinese Atlas (engine shared with Maths Atlas) — plotting toolkit and framework for interactive figures.
 *
 *   MA.widget(type, (stage, cfg, ctx) => { ... })   register a figure type (one per ":::widget type" block)
 *   MA.cfg.*                                         parse the "key: value" strings authors write
 *   new MA.Plot(parent, {x:[-5,5], y:[-3,3], ...})   SVG plot with axes, curves, shading, labels, drag handles
 *   MA.ui.*                                          sliders, selects, toggles, buttons, info rows, legends
 *
 * Colours are CSS variables (var(--series-1) …) so figures follow the light/dark theme automatically.
 */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const E = () => MA.expr;

  // ------------------------------------------------------------------ config parsing
  const truthy = { true: true, yes: true, on: true, 1: true, false: false, no: false, off: false, 0: false };
  MA.cfg = {
    has: (v) => v !== undefined && v !== null && String(v).trim() !== '',
    str: (v, d = '') => (MA.cfg.has(v) ? String(v).trim() : d),
    /** Number or constant expression ("pi/2", "sqrt(2)", "1e-3"). */
    num(v, d = 0) {
      if (!MA.cfg.has(v)) return d;
      if (typeof v === 'number') return v;
      const x = E().value(String(v).trim());
      if (!Number.isFinite(x)) throw new Error('not a number: ' + v);
      return x;
    },
    int: (v, d = 0) => Math.round(MA.cfg.num(v, d)),
    bool(v, d = false) {
      if (!MA.cfg.has(v)) return d;
      const k = String(v).trim().toLowerCase();
      return k in truthy ? truthy[k] : d;
    },
    /** "[-3, 3]", "-3,3", "-3:3", "-2pi, 2pi" -> [a, b] */
    range(v, d) {
      if (!MA.cfg.has(v)) return d;
      const s = String(v).trim().replace(/^\[|\]$/g, '');
      const parts = s.includes(';') ? s.split(';') : s.includes(',') ? s.split(',') : s.split(':');
      if (parts.length !== 2) throw new Error('range must be "min, max": ' + v);
      const r = parts.map((q) => MA.cfg.num(q));
      if (!(r[1] > r[0])) throw new Error('range must have min < max: ' + v);
      return r;
    },
    /** "a; b; c" -> ["a", "b", "c"] */
    list: (v) => (MA.cfg.has(v) ? String(v).split(';').map((q) => q.trim()).filter(Boolean) : []),
    /** "1,2; 3,4" -> [[1,2],[3,4]] (constant expressions allowed) */
    points: (v) => MA.cfg.list(v).map((p) => p.replace(/^\(|\)$/g, '').split(',').map((q) => MA.cfg.num(q))),
    /** "a=1:-3:3:0.1; b=0.5:0:2" -> [{name, value, min, max, step}] (step optional) */
    sliders(v) {
      if (!MA.cfg.has(v)) return [];
      return String(v).split(/[;,]\s*(?=[A-Za-z_][\w]*\s*=)/).map((q) => q.trim()).filter(Boolean).map((q) => {
        const m = /^([A-Za-z_]\w*)\s*=\s*(.+)$/.exec(q);
        if (!m) throw new Error('slider must look like a=1:-3:3:0.1 — got ' + q);
        const parts = m[2].split(':').map((x) => MA.cfg.num(x));
        if (parts.length < 3) throw new Error('slider ' + m[1] + ' needs value:min:max');
        const [value, min, max] = parts;
        const step = parts[3] || niceStep((max - min) / 200);
        return { name: m[1], value, min, max, step };
      });
    },
    /** Compile an expression in the given variables; throws with a readable message. */
    expr(src, vars) {
      try {
        const ast = E().parse(String(src), { vars });
        return { f: E().compile(ast), ast, src: String(src) };
      } catch (e) {
        throw new Error('“' + src + '”: ' + e.message);
      }
    },
    color: (i) => 'var(--series-' + ((i % 4) + 1) + ')',
  };
  function niceStep(raw) {
    const p = Math.pow(10, Math.floor(Math.log10(raw)));
    const m = raw / p;
    return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p;
  }
  MA.niceStep = niceStep;

  // ------------------------------------------------------------------ ticks
  /** Nice tick values covering [a, b] with about n ticks. */
  MA.ticks = (a, b, n = 8) => {
    const step = niceStep((b - a) / n);
    const out = [];
    for (let v = Math.ceil(a / step) * step; v <= b + step * 1e-9; v += step) out.push(Math.abs(v) < step * 1e-9 ? 0 : v);
    return { values: out, step };
  };
  function piLabel(v) {
    const k = Math.round(v / (Math.PI / 2));
    if (k === 0) return '0';
    const num = k % 2 === 0 ? k / 2 : k;
    const den = k % 2 === 0 ? 1 : 2;
    const sgn = num < 0 ? '−' : '';
    const n = Math.abs(num);
    return sgn + (n === 1 ? '' : n) + 'π' + (den === 2 ? '/2' : '');
  }

  // ------------------------------------------------------------------ Plot
  class Plot {
    /**
     * o: width, height (viewBox units), x:[a,b], y:[c,d], equal (same scale on both axes), grid, axes, ticks,
     *    piTicks (x ticks at multiples of π/2), xLabel, yLabel, pad [top,right,bottom,left], label (aria)
     */
    constructor(parent, o = {}) {
      this.o = Object.assign({ width: 640, height: 400, x: [-5, 5], y: [-3, 3], grid: true, axes: true, ticks: true, equal: false,
        piTicks: false, pad: [10, 12, 24, 36], xLabel: '', yLabel: '' }, o);
      this.W = this.o.width;
      this.H = this.o.height;
      this.uid = 'p' + Math.random().toString(36).slice(2, 8);
      this.wrap = el('div', { class: 'w-plot' });
      this.svg = el('svg', { viewBox: `0 0 ${this.W} ${this.H}`, role: 'img', 'aria-label': this.o.label || MA.t('Interactive plot'), preserveAspectRatio: 'xMidYMid meet' });
      this.svg.style.background = 'var(--plot-bg)';
      this.wrap.append(this.svg);
      if (parent) parent.append(this.wrap);
      const defs = el('defs');
      this.clipRect = el('rect');
      defs.append(el('clipPath', { id: this.uid + '-clip' }, this.clipRect));
      const mk = (id, color) => el('marker', { id: this.uid + '-' + id, viewBox: '0 0 10 10', refX: 8.5, refY: 5, markerWidth: 7, markerHeight: 7, orient: 'auto-start-reverse' },
        el('path', { d: 'M0,0.5 L10,5 L0,9.5 z', style: 'fill:' + color }));
      this.markers = {};
      this.svg.append(defs);
      this.defs = defs;
      this.layers = {};
      for (const name of ['bg', 'grid', 'axes', 'fill', 'curves', 'marks', 'labels', 'top', 'handles']) {
        const g = el('g', { class: 'l-' + name });
        if (!['axes', 'labels', 'handles', 'grid'].includes(name)) g.setAttribute('clip-path', `url(#${this.uid}-clip)`);
        this.svg.append(g);
        this.layers[name] = g;
      }
      this._mk = mk;
      this.setView(this.o.x, this.o.y);
    }

    marker(color) {
      if (!this.markers[color]) {
        const id = 'm' + Object.keys(this.markers).length;
        const m = this._mk(id, color);
        this.defs.append(m);
        this.markers[color] = `url(#${this.uid}-${id})`;
      }
      return this.markers[color];
    }

    /** Change the visible window and redraw grid and axes (curves must be redrawn by the caller). */
    setView(x, y) {
      const [pt, pr, pb, pl] = this.o.pad;
      this.pl = pl; this.pr = pr; this.pt = pt; this.pb = pb;
      this.x0 = x[0]; this.x1 = x[1];
      this.y0 = y[0]; this.y1 = y[1];
      const pw = this.W - pl - pr, ph = this.H - pt - pb;
      if (this.o.equal) {
        // keep 1:1 scale: widen whichever range is too short
        const sx = pw / (this.x1 - this.x0), sy = ph / (this.y1 - this.y0);
        if (sx > sy) { const c = (this.x0 + this.x1) / 2, half = pw / sy / 2; this.x0 = c - half; this.x1 = c + half; }
        else { const c = (this.y0 + this.y1) / 2, half = ph / sx / 2; this.y0 = c - half; this.y1 = c + half; }
      }
      this.clipRect.setAttribute('x', pl); this.clipRect.setAttribute('y', pt);
      this.clipRect.setAttribute('width', pw); this.clipRect.setAttribute('height', ph);
      this.drawFrame();
    }
    X(x) { return this.pl + (x - this.x0) / (this.x1 - this.x0) * (this.W - this.pl - this.pr); }
    Y(y) { return this.H - this.pb - (y - this.y0) / (this.y1 - this.y0) * (this.H - this.pt - this.pb); }
    /** Data coordinates of a point in viewBox units. */
    inv(px, py) {
      return [this.x0 + (px - this.pl) / (this.W - this.pl - this.pr) * (this.x1 - this.x0),
        this.y0 + (this.H - this.pb - py) / (this.H - this.pt - this.pb) * (this.y1 - this.y0)];
    }
    /** Data coordinates of a pointer event. */
    eventXY(evt) {
      const pt = this.svg.createSVGPoint();
      pt.x = evt.clientX; pt.y = evt.clientY;
      const m = this.svg.getScreenCTM();
      if (!m) return [NaN, NaN];
      const q = pt.matrixTransform(m.inverse());
      return this.inv(q.x, q.y);
    }
    /** Pixels per data unit. */
    get sx() { return (this.W - this.pl - this.pr) / (this.x1 - this.x0); }
    get sy() { return (this.H - this.pt - this.pb) / (this.y1 - this.y0); }

    drawFrame() {
      const g = this.layers.grid, ax = this.layers.axes;
      g.replaceChildren(); ax.replaceChildren();
      const xt = this.o.piTicks ? { values: piTicks(this.x0, this.x1), step: Math.PI / 2 } : MA.ticks(this.x0, this.x1, Math.max(4, Math.round(this.W / 80)));
      const yt = MA.ticks(this.y0, this.y1, Math.max(3, Math.round(this.H / 60)));
      const L = this.pl, R = this.W - this.pr, T = this.pt, B = this.H - this.pb;
      if (this.o.grid) {
        const grid = el('g', { class: 'grid' });
        xt.values.forEach((v) => grid.append(el('line', { x1: this.X(v), x2: this.X(v), y1: T, y2: B })));
        yt.values.forEach((v) => grid.append(el('line', { x1: L, x2: R, y1: this.Y(v), y2: this.Y(v) })));
        g.append(grid);
      }
      if (!this.o.axes) return;
      const axg = el('g', { class: 'axis' });
      const yAxisX = this.x0 <= 0 && this.x1 >= 0 ? this.X(0) : L;
      const xAxisY = this.y0 <= 0 && this.y1 >= 0 ? this.Y(0) : B;
      axg.append(el('line', { x1: L, x2: R, y1: xAxisY, y2: xAxisY }));
      axg.append(el('line', { x1: yAxisX, x2: yAxisX, y1: T, y2: B }));
      ax.append(axg);
      if (!this.o.ticks) return;
      const tk = el('g', { class: 'tick' });
      // zero relative to the tick step, so axes spanning ±3e-14 are labelled too
      const zero = (v, step) => Math.abs(v) < 1e-9 * step;
      const fmt = (v, step) => (zero(v, step) ? '0' : MA.fmt(+v.toFixed(Math.min(100, Math.max(0, -Math.floor(Math.log10(step)) + 1))), 6));
      xt.values.forEach((v) => {
        if (zero(v, xt.step) && yAxisX === this.X(0)) return;
        const tx = this.X(v);
        if (tx < L + 4 || tx > R - 4) return;
        const lab = this.o.piTicks ? piLabel(v) : fmt(v, xt.step);
        tk.append(el('text', { x: tx, y: Math.min(B + 15, xAxisY + 15), 'text-anchor': 'middle', text: lab }));
      });
      yt.values.forEach((v) => {
        if (zero(v, yt.step) && xAxisY === this.Y(0)) return;
        const ty = this.Y(v);
        if (ty < T + 4 || ty > B - 4) return;
        tk.append(el('text', { x: Math.max(L - 6, yAxisX - 6), y: ty + 4, 'text-anchor': 'end', text: fmt(v, yt.step) }));
      });
      ax.append(tk);
      if (this.o.xLabel) ax.append(el('text', { class: 'lbl', x: R - 4, y: xAxisY - 8, 'text-anchor': 'end', style: 'fill:var(--ink-2)', text: this.o.xLabel }));
      if (this.o.yLabel) ax.append(el('text', { class: 'lbl', x: yAxisX + 8, y: T + 14, style: 'fill:var(--ink-2)', text: this.o.yLabel }));
    }

    /** Remove everything drawn in the given layers (default: all data layers). */
    clear(...names) {
      (names.length ? names : ['fill', 'curves', 'marks', 'labels', 'top']).forEach((n) => this.layers[n].replaceChildren());
    }

    _style(o, kind) {
      const s = [];
      const color = o.color || 'var(--series-1)';
      if (kind === 'stroke' || kind === 'both') {
        s.push('stroke:' + color, 'stroke-width:' + (o.width || 2.2), 'fill:' + (o.fill || 'none'));
        if (o.dash) s.push('stroke-dasharray:' + (o.dash === true ? '6 5' : o.dash));
      }
      if (kind === 'fill') s.push('fill:' + (o.fill || color), 'stroke:none');
      if (o.opacity !== undefined) s.push('opacity:' + o.opacity);
      if (o.fillOpacity !== undefined) s.push('fill-opacity:' + o.fillOpacity);
      return s.join(';');
    }

    /** Polyline through data points; NaN / null breaks the line. */
    path(points, o = {}) {
      let d = '';
      let pen = false;
      const lim = 1e5;
      for (const p of points) {
        if (!p || !Number.isFinite(p[0]) || !Number.isFinite(p[1])) { pen = false; continue; }
        const px = Math.max(-lim, Math.min(lim, this.X(p[0]))), py = Math.max(-lim, Math.min(lim, this.Y(p[1])));
        d += (pen ? 'L' : 'M') + px.toFixed(2) + ',' + py.toFixed(2);
        pen = true;
      }
      const e = el('path', { d, class: 'curve ' + (o.cls || ''), style: this._style(o, 'stroke') });
      if (o.arrow) e.setAttribute('marker-end', this.marker(o.color || 'var(--series-1)'));
      (this.layers[o.layer || 'curves']).append(e);
      return e;
    }

    /** Sample y = f(x) across the view (or o.domain), breaking at discontinuities and asymptotes. */
    sample(f, o = {}) {
      const [a, b] = o.domain || [this.x0, this.x1];
      const lo = Math.max(a, this.x0 - (this.x1 - this.x0) * 0.02), hi = Math.min(b, this.x1 + (this.x1 - this.x0) * 0.02);
      const n = o.samples || Math.max(200, Math.round(this.W * 1.5));
      const span = this.y1 - this.y0;
      const pts = [];
      let prev = null;
      for (let i = 0; i <= n; i++) {
        const x = lo + (hi - lo) * i / n;
        let y;
        try { y = f(x); } catch (e) { y = NaN; }
        if (!Number.isFinite(y)) { pts.push(null); prev = null; continue; }
        if (prev !== null) {
          // a jump across the window between neighbours (tan x, 1/x) is an asymptote, not a steep line
          const jump = Math.abs(y - prev);
          if (jump > span * 2 && (Math.sign(y) !== Math.sign(prev) || Math.min(Math.abs(y), Math.abs(prev)) > span)) pts.push(null);
        }
        pts.push([x, Math.max(this.y0 - span * 50, Math.min(this.y1 + span * 50, y))]);
        prev = y;
      }
      return pts;
    }

    /** Graph of a function of x. o: color, width, dash, domain [a,b], samples, layer. */
    fn(f, o = {}) { return this.path(this.sample(f, o), o); }

    /** Parametric curve t -> (fx(t), fy(t)). */
    param(fx, fy, t0, t1, o = {}) {
      const n = o.samples || 600;
      const pts = [];
      for (let i = 0; i <= n; i++) {
        const t = t0 + (t1 - t0) * i / n;
        let x, y;
        try { x = fx(t); y = fy(t); } catch (e) { x = y = NaN; }
        pts.push(Number.isFinite(x) && Number.isFinite(y) ? [x, y] : null);
      }
      return this.path(pts, o);
    }

    /** Shade between y = f(x) and y = g(x) (default the x-axis) for x in [a, b]. o: fill, opacity. */
    area(f, a, b, o = {}) {
      const g = o.g || (() => 0);
      const n = o.samples || 300;
      const top = [], bot = [];
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n;
        const y1 = f(x), y0 = g(x);
        if (!Number.isFinite(y1) || !Number.isFinite(y0)) continue;
        top.push([x, y1]); bot.push([x, y0]);
      }
      return this.poly(top.concat(bot.reverse()), Object.assign({ fill: o.color || 'var(--series-1)', fillOpacity: o.opacity ?? 0.16 }, o, { layer: o.layer || 'fill' }));
    }

    /** Closed polygon. o.fill / o.color / o.fillOpacity / o.stroke */
    poly(points, o = {}) {
      const d = points.filter((p) => p && Number.isFinite(p[0]) && Number.isFinite(p[1])).map((p, i) => (i ? 'L' : 'M') + this.X(p[0]).toFixed(2) + ',' + this.Y(p[1]).toFixed(2)).join('') + 'Z';
      const style = 'fill:' + (o.fill || o.color || 'var(--series-1)') + ';fill-opacity:' + (o.fillOpacity ?? 0.18) + ';stroke:' + (o.stroke || 'none') + ';stroke-width:' + (o.width || 1.2) + (o.dash ? ';stroke-dasharray:5 4' : '');
      const e = el('path', { d, style });
      this.layers[o.layer || 'fill'].append(e);
      return e;
    }

    line(x1, y1, x2, y2, o = {}) {
      const e = el('line', { x1: this.X(x1), y1: this.Y(y1), x2: this.X(x2), y2: this.Y(y2), style: this._style(Object.assign({ width: 1.6 }, o), 'stroke') });
      if (o.arrow) e.setAttribute('marker-end', this.marker(o.color || 'var(--series-1)'));
      this.layers[o.layer || 'marks'].append(e);
      return e;
    }
    /** Infinite line through (x1,y1) with slope m, clipped to the view. */
    slopeLine(x1, y1, m, o = {}) {
      const span = (this.x1 - this.x0) * 2;
      return this.line(x1 - span, y1 - m * span, x1 + span, y1 + m * span, o);
    }
    vline(x, o = {}) { return this.line(x, this.y0 - 1e3 * (this.y1 - this.y0), x, this.y1 + 1e3 * (this.y1 - this.y0), Object.assign({ color: 'var(--ink-3)', width: 1.2, dash: '4 4' }, o)); }
    hline(y, o = {}) { return this.line(this.x0 - 1e3 * (this.x1 - this.x0), y, this.x1 + 1e3 * (this.x1 - this.x0), y, Object.assign({ color: 'var(--ink-3)', width: 1.2, dash: '4 4' }, o)); }
    arrow(x1, y1, x2, y2, o = {}) { return this.line(x1, y1, x2, y2, Object.assign({ arrow: true, width: 2 }, o)); }
    rect(x, y, w, h, o = {}) {
      const X0 = this.X(Math.min(x, x + w)), X1 = this.X(Math.max(x, x + w));
      const Y0 = this.Y(Math.max(y, y + h)), Y1 = this.Y(Math.min(y, y + h));
      const e = el('rect', { x: X0, y: Y0, width: Math.max(0, X1 - X0), height: Math.max(0, Y1 - Y0),
        style: 'fill:' + (o.fill || o.color || 'var(--series-1)') + ';fill-opacity:' + (o.fillOpacity ?? 0.2) + ';stroke:' + (o.stroke || o.color || 'var(--series-1)') + ';stroke-width:' + (o.width ?? 1) + (o.strokeOpacity !== undefined ? ';stroke-opacity:' + o.strokeOpacity : '') });
      this.layers[o.layer || 'fill'].append(e);
      return e;
    }
    /** Point marker of radius r px. o.hollow draws an open circle (e.g. a removed point). */
    dot(x, y, o = {}) {
      const c = o.color || 'var(--series-1)';
      const e = el('circle', { cx: this.X(x), cy: this.Y(y), r: o.r || 4.5,
        style: o.hollow ? `fill:var(--plot-bg);stroke:${c};stroke-width:2` : `fill:${c};stroke:var(--plot-bg);stroke-width:1.5` });
      this.layers[o.layer || 'marks'].append(e);
      return e;
    }
    /** Circle with radius in data units (x scale). */
    circle(x, y, r, o = {}) {
      const e = el('ellipse', { cx: this.X(x), cy: this.Y(y), rx: Math.abs(r * this.sx), ry: Math.abs(r * this.sy),
        style: this._style(Object.assign({ width: 1.6 }, o), 'stroke') + (o.fill ? ';fill:' + o.fill + ';fill-opacity:' + (o.fillOpacity ?? 0.15) : '') });
      this.layers[o.layer || 'marks'].append(e);
      return e;
    }
    /** Text label at a data point; o.dx/o.dy offsets in px, o.anchor start|middle|end. */
    text(x, y, str, o = {}) {
      const e = el('text', { class: 'lbl', x: this.X(x) + (o.dx || 0), y: this.Y(y) + (o.dy || 0), 'text-anchor': o.anchor || 'start',
        style: 'fill:' + (o.color || 'var(--ink)') + (o.size ? ';font-size:' + o.size + 'px' : ''), text: str });
      this.layers[o.layer || 'labels'].append(e);
      return e;
    }
    /** TeX label at a data point (needs KaTeX on the page). */
    tex(x, y, tex, o = {}) {
      const w = o.w || 220, h = o.h || 44;
      const fo = el('foreignObject', { x: this.X(x) + (o.dx || 0) - (o.anchor === 'middle' ? w / 2 : o.anchor === 'end' ? w : 0), y: this.Y(y) + (o.dy || 0) - h / 2, width: w, height: h, style: 'overflow:visible;pointer-events:none' });
      const div = el('div', { style: { color: o.color || 'var(--ink)', fontSize: (o.size || 14) + 'px', display: 'flex', alignItems: 'center', height: h + 'px',
        justifyContent: o.anchor === 'middle' ? 'center' : o.anchor === 'end' ? 'flex-end' : 'flex-start', whiteSpace: 'nowrap' } });
      MA.tex(div, tex, false);
      fo.append(div);
      this.layers[o.layer || 'labels'].append(fo);
      return fo;
    }

    /**
     * Draggable point. o: color, r, label, constrain(x, y) -> [x, y], onDrag(x, y), onEnd(x, y), step (keyboard).
     * Returns {x, y, set(x, y), el}.
     */
    handle(x, y, o = {}) {
      const color = o.color || 'var(--accent)';
      const g = el('g', { class: 'handle', tabindex: 0, role: 'slider', 'aria-label': o.label || MA.t('Draggable point') });
      const hit = el('circle', { class: 'hit', r: 16 });
      const dot = el('circle', { r: o.r || 7, style: `fill:${color};stroke:var(--plot-bg);stroke-width:2` });
      g.append(hit, dot);
      this.layers.handles.append(g);
      const h = { x, y, el: g };
      const place = () => {
        const px = this.X(h.x), py = this.Y(h.y);
        hit.setAttribute('cx', px); hit.setAttribute('cy', py);
        dot.setAttribute('cx', px); dot.setAttribute('cy', py);
        g.setAttribute('aria-valuetext', MA.fmt(h.x) + ', ' + MA.fmt(h.y));
      };
      h.set = (nx, ny, fire) => {
        [nx, ny] = o.constrain ? o.constrain(nx, ny) : [nx, ny];
        h.x = nx; h.y = ny;
        place();
        if (fire && o.onDrag) o.onDrag(nx, ny);
      };
      h.redraw = place;
      let dragging = false;
      g.addEventListener('pointerdown', (e) => { dragging = true; g.setPointerCapture(e.pointerId); e.preventDefault(); });
      g.addEventListener('pointermove', (e) => { if (!dragging) return; const [nx, ny] = this.eventXY(e); h.set(nx, ny, true); });
      const end = () => { if (dragging) { dragging = false; if (o.onEnd) o.onEnd(h.x, h.y); } };
      g.addEventListener('pointerup', end);
      g.addEventListener('pointercancel', end);
      g.addEventListener('keydown', (e) => {
        const sx = o.step || (this.x1 - this.x0) / 100, sy = o.step || (this.y1 - this.y0) / 100;
        const d = { ArrowLeft: [-sx, 0], ArrowRight: [sx, 0], ArrowUp: [0, sy], ArrowDown: [0, -sy] }[e.key];
        if (!d) return;
        e.preventDefault();
        h.set(h.x + d[0], h.y + d[1], true);
        if (o.onEnd) o.onEnd(h.x, h.y);
      });
      place();
      this.handles = this.handles || [];
      this.handles.push(h);
      return h;
    }

    /** Hover callback with data coordinates (null when the pointer leaves). */
    onHover(cb) {
      this.svg.addEventListener('pointermove', (e) => { const [x, y] = this.eventXY(e); cb(x, y, e); });
      this.svg.addEventListener('pointerleave', () => cb(null, null));
    }
    /** Click callback with data coordinates (ignores clicks that end a drag on a handle). */
    onClick(cb) {
      this.svg.addEventListener('click', (e) => {
        if (e.target.closest && e.target.closest('.handle')) return;
        const [x, y] = this.eventXY(e);
        cb(x, y, e);
      });
    }
    /** A small coordinate read-out in the corner; returns a setter taking text (or null to hide). */
    readout() {
      const r = el('div', { class: 'w-readout', hidden: true });
      this.wrap.append(r);
      return (txt) => { if (txt === null || txt === undefined) { r.hidden = true; return; } r.hidden = false; r.textContent = txt; };
    }
  }
  function piTicks(a, b) {
    const out = [];
    const step = (b - a) / (Math.PI / 2) > 16 ? Math.PI : Math.PI / 2;
    for (let v = Math.ceil(a / step) * step; v <= b + 1e-9; v += step) out.push(v);
    return out;
  }
  MA.Plot = Plot;

  /** Robust y-range for a function over [a, b]: ignores the extreme 2% (asymptotes) and pads 10%. */
  MA.autoRange = (fs, a, b, n = 400) => {
    const ys = [];
    for (const f of [].concat(fs)) {
      for (let i = 0; i <= n; i++) {
        const x = a + (b - a) * i / n;
        let y;
        try { y = f(x); } catch (e) { y = NaN; }
        if (Number.isFinite(y)) ys.push(y);
      }
    }
    if (!ys.length) return [-1, 1];
    ys.sort((p, q) => p - q);
    let lo = ys[Math.floor(ys.length * 0.02)], hi = ys[Math.ceil(ys.length * 0.98) - 1];
    if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * 0.1;
    return [lo - pad, hi + pad];
  };

  // ------------------------------------------------------------------ numerical helpers
  MA.num = {
    /** Adaptive Simpson integral of f on [a, b]. */
    integrate(f, a, b, tol = 1e-10) {
      const simpson = (fa, fm, fb, a0, b0) => (b0 - a0) / 6 * (fa + 4 * fm + fb);
      const rec = (a0, b0, fa, fm, fb, whole, eps, depth) => {
        const m = (a0 + b0) / 2, lm = (a0 + m) / 2, rm = (m + b0) / 2;
        const flm = f(lm), frm = f(rm);
        const left = simpson(fa, flm, fm, a0, m), right = simpson(fm, frm, fb, m, b0);
        if (depth <= 0 || Math.abs(left + right - whole) <= 15 * eps) return left + right + (left + right - whole) / 15;
        return rec(a0, m, fa, flm, fm, left, eps / 2, depth - 1) + rec(m, b0, fm, frm, fb, right, eps / 2, depth - 1);
      };
      if (a === b) return 0;
      // start from 16 panels: three samples can make a step or a narrow bump look linear, and the
      // recursion would then stop at once (floor(4x)/4 + x/4 on [0, 1] gave 0.625 instead of 0.5)
      const K = 16, h = (b - a) / K;
      let sum = 0;
      for (let i = 0; i < K; i++) {
        const a0 = a + i * h, b0 = i === K - 1 ? b : a + (i + 1) * h;
        const fa = f(a0), fb = f(b0), fm = f((a0 + b0) / 2);
        sum += rec(a0, b0, fa, fm, fb, simpson(fa, fm, fb, a0, b0), tol / K, 36);
      }
      return sum;
    },
    /** Derivative by a 5-point stencil. */
    deriv(f, x, h) {
      h = h || 1e-4 * Math.max(1, Math.abs(x));
      return (-f(x + 2 * h) + 8 * f(x + h) - 8 * f(x - h) + f(x - 2 * h)) / (12 * h);
    },
    /** A finite-difference result that is zero up to rounding noise (−3.3e−12 at a critical point) reads as 0. */
    snap(v, scale = 1) {
      return Math.abs(v) < 1e-7 * Math.max(1, Math.abs(scale)) ? 0 : v;
    },
    /** Root of f in [a, b] by bisection (f(a), f(b) of opposite signs) or null. */
    bisect(f, a, b, tol = 1e-12) {
      let fa = f(a), fb = f(b);
      if (!(fa * fb <= 0)) return null;
      for (let i = 0; i < 200 && b - a > tol; i++) {
        const m = (a + b) / 2, fm = f(m);
        if (fa * fm <= 0) { b = m; fb = fm; } else { a = m; fa = fm; }
      }
      return (a + b) / 2;
    },
    /** All sign-change roots of f on [a, b] (sampled). */
    roots(f, a, b, n = 400) {
      const out = [];
      let x0 = a, f0 = f(a);
      for (let i = 1; i <= n; i++) {
        const x1 = a + (b - a) * i / n, f1 = f(x1);
        if (Number.isFinite(f0) && Number.isFinite(f1) && f0 * f1 <= 0 && Math.abs(f1 - f0) < 1e6) {
          const r = MA.num.bisect(f, x0, x1);
          if (r !== null && !out.some((q) => Math.abs(q - r) < (b - a) * 1e-6)) out.push(r);
        }
        x0 = x1; f0 = f1;
      }
      return out;
    },
    /** One classical Runge–Kutta step for y' = f(t, y) where y is a number or an array. */
    rk4(f, t, y, h) {
      const add = (u, v, s) => (Array.isArray(u) ? u.map((q, i) => q + s * v[i]) : u + s * v);
      const k1 = f(t, y), k2 = f(t + h / 2, add(y, k1, h / 2)), k3 = f(t + h / 2, add(y, k2, h / 2)), k4 = f(t + h, add(y, k3, h));
      return Array.isArray(y) ? y.map((q, i) => q + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])) : y + h / 6 * (k1 + 2 * k2 + 2 * k3 + k4);
    },
    /** Seeded pseudo-random generator (mulberry32) so simulations are reproducible. */
    rng(seed = 12345) {
      let a = seed >>> 0;
      return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    },
    /** Standard normal sample (Box–Muller) from a uniform generator. */
    normal(rand) { let u = 0; while (u === 0) u = rand(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand()); },
  };

  // ------------------------------------------------------------------ controls
  const looksTeX = (s) => /[\\^_{}]/.test(s);
  // a legend label such as y = x + 1, f'(x) or 1+nx is a formula even without TeX markup (but not RK4 or a word)
  const formulaLike = (s) => /^[A-Za-z0-9\s+\-*/=()'.,<>|]+$/.test(s) && /[A-Za-z]/.test(s) && !/[A-Za-z]{3,}|[A-Z]{2}/.test(s);
  function labelEl(label, tex) {
    const nm = el('span', { class: 'nm' });
    if (tex || (label && looksTeX(label))) MA.tex(nm, label, false); else nm.textContent = label || '';
    return nm;
  }
  const GREEK = ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'kappa', 'lambda', 'mu', 'nu', 'xi', 'rho', 'sigma', 'tau', 'phi', 'chi', 'psi', 'omega', 'Gamma', 'Delta', 'Theta', 'Lambda', 'Sigma', 'Phi', 'Omega'];
  /** A variable name as TeX: omega -> \omega, k1 -> k_{1}, mu0 -> \mu_{0}. */
  function texName(n) {
    const m = /^([A-Za-z]+?)(\d*)$/.exec(n);
    if (!m) return n;
    const base = GREEK.includes(m[1]) ? '\\' + m[1] : m[1].length > 1 ? '\\mathrm{' + m[1] + '}' : m[1];
    return base + (m[2] ? '_{' + m[2] + '}' : '');
  }
  MA.texName = texName;
  MA.ui = {
    /** Control bar under a plot. */
    bar(stage) { const b = el('div', { class: 'w-controls' }); stage.append(b); return b; },
    /** Range slider. o: label (text or TeX), min, max, step, value, fmt(v), onInput(v). */
    slider(bar, o) {
      const wrap = el('label', { class: 'w-ctl slider' });
      const input = el('input', { type: 'range', min: o.min, max: o.max, step: o.step || 'any', value: o.value });
      const val = el('span', { class: 'val' });
      const fmt = o.fmt || ((v) => MA.fmt(v, 4));
      const show = () => { val.textContent = fmt(+input.value); };
      input.addEventListener('input', () => { show(); if (o.onInput) o.onInput(+input.value); });
      wrap.append(labelEl(o.label, o.tex), input, val);
      bar.append(wrap);
      show();
      return { el: wrap, input, get: () => +input.value, set: (v, fire) => { input.value = v; show(); if (fire && o.onInput) o.onInput(+input.value); } };
    },
    /** Sliders for MA.cfg.sliders() specs; calls onChange(values) on input. Returns the values object. */
    sliders(bar, specs, onChange) {
      const values = {};
      specs.forEach((s) => {
        values[s.name] = s.value;
        MA.ui.slider(bar, { label: s.label || texName(s.name), tex: !s.label, min: s.min, max: s.max, step: s.step, value: s.value, onInput: (v) => { values[s.name] = v; onChange(values); } });
      });
      return values;
    },
    select(bar, o) {
      const wrap = el('label', { class: 'w-ctl' });
      const s = el('select');
      o.options.forEach(([v, t]) => s.append(el('option', { value: v, text: t })));
      s.value = o.value;
      s.addEventListener('change', () => o.onChange && o.onChange(s.value));
      wrap.append(labelEl(o.label, o.tex), s);
      bar.append(wrap);
      return { el: wrap, get: () => s.value, set: (v) => { s.value = v; } };
    },
    /** Segmented buttons. o: label, options [[value, text]], value, onChange. */
    seg(bar, o) {
      const wrap = el('div', { class: 'w-ctl' });
      if (o.label) wrap.append(labelEl(o.label, o.tex));
      const box = el('div', { class: 'w-seg', role: 'group' });
      let cur = o.value;
      const btns = o.options.map(([v, t]) => {
        const b = el('button', { type: 'button', 'aria-pressed': String(v === cur) });
        if (looksTeX(t)) MA.tex(b, t, false); else b.textContent = t;
        b.addEventListener('click', () => { cur = v; btns.forEach((x, i) => x.setAttribute('aria-pressed', String(o.options[i][0] === cur))); o.onChange && o.onChange(v); });
        box.append(b);
        return b;
      });
      wrap.append(box);
      bar.append(wrap);
      return { el: wrap, get: () => cur, set: (v) => { cur = v; btns.forEach((x, i) => x.setAttribute('aria-pressed', String(o.options[i][0] === cur))); } };
    },
    toggle(bar, o) {
      const b = el('button', { type: 'button', class: 'w-btn', 'aria-pressed': String(!!o.value), text: o.label });
      b.addEventListener('click', () => { const v = b.getAttribute('aria-pressed') !== 'true'; b.setAttribute('aria-pressed', String(v)); o.onChange && o.onChange(v); });
      bar.append(b);
      return { el: b, get: () => b.getAttribute('aria-pressed') === 'true', set: (v) => b.setAttribute('aria-pressed', String(!!v)) };
    },
    button(bar, o) {
      const b = el('button', { type: 'button', class: 'w-btn' + (o.primary ? ' primary' : ''), text: o.label });
      b.addEventListener('click', () => o.onClick && o.onClick());
      bar.append(b);
      return b;
    },
    /** Text input for an expression. o.onChange(value) returns an error string or null. */
    text(bar, o) {
      const wrap = el('label', { class: 'w-ctl' });
      const input = el('input', { type: 'text', value: o.value || '', spellcheck: 'false', autocomplete: 'off' });
      if (o.width) input.style.width = o.width + 'px';
      const err = el('span', { class: 'w-err' });
      const run = () => { const msg = o.onChange ? o.onChange(input.value) : null; input.classList.toggle('bad', !!msg); err.textContent = msg || ''; };
      input.addEventListener('change', run);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') run(); });
      wrap.append(labelEl(o.label, o.tex), input);
      bar.append(wrap, err);
      return { el: wrap, input, get: () => input.value };
    },
    /** Info row: set(...parts) where a part is a string, a node, or {tex:'...'}. */
    info(stage) {
      const box = el('div', { class: 'w-info', 'aria-live': 'polite' });
      stage.append(box);
      return {
        el: box,
        set(...parts) {
          box.replaceChildren();
          parts.forEach((p) => {
            if (p === null || p === undefined) return;
            if (p.nodeType) box.append(p);
            else if (typeof p === 'object' && p.tex !== undefined) box.append(MA.texEl(p.tex));
            else box.append(el('span', { text: String(p) }));
          });
        },
      };
    },
    /** Key–value pair for info rows: label (text or TeX) and a value. */
    kv(label, value, tex) {
      const s = el('span');
      s.append(tex || looksTeX(label) ? MA.texEl(label) : el('span', { class: 'k', text: label }), ' ', el('b', { text: value }));
      return s;
    },
    /** Legend: items [{label, color, swatch}] (label may be TeX). */
    legend(stage, items) {
      const box = el('div', { class: 'w-legend' });
      items.forEach((it) => {
        const k = el('span', { class: 'k' }, el('span', { class: it.swatch ? 'sw' : 'ln', style: '--c:' + it.color }));
        k.append(looksTeX(it.label) || formulaLike(it.label) ? MA.texEl(it.label) : el('span', { text: it.label }));
        box.append(k);
      });
      stage.append(box);
      return box;
    },
    title(stage, text) { if (text) stage.append(el('div', { class: 'w-title', text })); },
  };

  /** requestAnimationFrame loop with play/pause; step(dt) returns false to stop. Honours reduced motion. */
  MA.anim = (step) => {
    let id = null, last = 0;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = (ts) => {
      const dt = last ? Math.min(0.1, (ts - last) / 1000) : 0;
      last = ts;
      if (step(dt) === false) { id = null; return; }
      id = requestAnimationFrame(tick);
    };
    return {
      play() { if (id === null) { last = 0; id = requestAnimationFrame(tick); } },
      stop() { if (id !== null) cancelAnimationFrame(id); id = null; },
      get running() { return id !== null; },
      reduce,
    };
  };

  // ------------------------------------------------------------------ registry
  const registry = {};
  MA.widget = (type, factory) => { registry[type] = factory; };
  MA.widgetTypes = () => Object.keys(registry);
  function start(fig) {
    if (fig.dataset.ready) return;
    fig.dataset.ready = '1';
    const type = fig.dataset.widget;
    const stage = fig.querySelector('.widget-stage');
    let cfg = {};
    try { cfg = JSON.parse(fig.dataset.config || '{}'); } catch (e) { cfg = {}; }
    const factory = registry[type];
    if (!factory) { stage.replaceChildren(el('div', { class: 'widget-msg', text: MA.t('Unknown interactive figure: %s', type) })); return; }
    stage.replaceChildren();
    try {
      factory(stage, cfg, { fig, id: fig.id });
    } catch (e) {
      console.error('[' + type + ']', e);
      stage.replaceChildren(el('div', { class: 'widget-msg w-err', text: MA.t('This figure could not be drawn: %s', e.message) }));
    }
  }
  MA.initWidgets = (root = document) => {
    const figs = Array.from(root.querySelectorAll('figure.widget[data-widget]'));
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { io.unobserve(en.target); start(en.target); } }), { rootMargin: '400px 0px' });
      figs.forEach((f) => io.observe(f));
    } else {
      figs.forEach(start);
    }
  };
  MA.startWidget = start;
  document.addEventListener('DOMContentLoaded', () => MA.initWidgets());
})();
