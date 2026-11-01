/* Quant Trading Atlas — trading charts.
   Keys and defaults: data/widgets.json (merged from data/widgets-local.json).
   Every series is a toy or a sampling diagram. None of them is a price forecast or a recommendation. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  function fixed(v, d) {
    if (!Number.isFinite(v)) return MA.fmt(v);
    return v.toFixed(d).replace(/^-/, '−');
  }
  function yRange(vals, frac) {
    const xs = vals.filter((v) => Number.isFinite(v));
    let lo = Math.min.apply(null, xs);
    let hi = Math.max.apply(null, xs);
    if (!(hi > lo)) { lo -= 1; hi += 1; }
    const pad = (hi - lo) * (frac || 0.08);
    return [lo - pad, hi + pad];
  }
  function sampleMoments(xs) {
    const n = xs.length;
    const mean = xs.reduce((a, b) => a + b, 0) / n;
    const sd = n < 2 ? NaN : Math.sqrt(xs.reduce((a, b) => a + (b - mean) * (b - mean), 0) / (n - 1));
    return { mean, sd };
  }
  /** Equity from a positive price list. Drawdown stays negative. */
  function fromPrices(prices) {
    const rets = [];
    for (let i = 1; i < prices.length; i++) rets.push(prices[i] / prices[i - 1] - 1);
    const eq = [1];
    rets.forEach((r) => eq.push(eq[eq.length - 1] * (1 + r)));
    let peak = eq[0];
    let maxdd = 0;
    const dd = eq.map((e) => {
      peak = Math.max(peak, e);
      const d = e / peak - 1;
      maxdd = Math.min(maxdd, d);
      return d;
    });
    const mom = sampleMoments(rets);
    return { rets, eq, dd, maxdd, mean: mom.mean, sd: mom.sd, compound: eq[eq.length - 1] - 1 };
  }
  function clearHandles(P) {
    (P.handles || []).forEach((h) => h.el.remove());
    P.handles = [];
  }
  function poly(P, ys, color, width) {
    P.path(ys.map((y, i) => [i, y]), { color, width: width || 2.2 });
  }

  function pathFromReturns(rets) {
    const prices = [100];
    rets.forEach((r) => prices.push(prices[prices.length - 1] * (1 + r)));
    return prices;
  }
  const PATHS = {
    a: [100, 102, 101, 104, 103, 107, 106, 110],
    b: [100, 110, 90, 95],
    c: pathFromReturns([0.1, 0.1, -0.1, -0.1]),
    d: pathFromReturns([0.1, -0.1, 0.1, -0.1]),
  };

  // ------------------------------------------------------------------ equity
  MA.widget('equity', (stage, cfg) => {
    const preset0 = C.str(cfg.preset, 'a');
    if (!PATHS[preset0] && preset0 !== 'compare') throw new Error('preset must be a, b, c, d or compare');
    let preset = preset0 === 'compare' ? 'compare' : preset0;
    let prices = PATHS[preset === 'compare' ? 'a' : preset].slice();
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    let P = null;
    let D = null;
    let handles = null;
    const info = MA.ui.info(stage);

    function mount() {
      if (P) { P.wrap.remove(); D.wrap.remove(); }
      const n = preset === 'compare' ? PATHS.c.length : prices.length;
      P = new MA.Plot(stage, {
        x: [-0.4, n - 0.6], y: [0, 1], height: 280, pad: [16, 16, 28, 52],
        xLabel: MA.t('Date index'), yLabel: preset === 'compare' ? MA.t('Equity') : MA.t('Price'),
        label: MA.t('Equity and drawdown of a toy path'),
      });
      D = new MA.Plot(stage, {
        x: [-0.4, n - 0.6], y: [-1, 0], height: 200, pad: [12, 16, 28, 52],
        xLabel: MA.t('Date index'), yLabel: MA.t('Drawdown'),
        label: MA.t('Drawdown of a toy path'),
      });
      handles = null;
      // plots were appended after the info row; put the read-out last
      stage.append(info.el);
    }

    function draw() {
      if (preset === 'compare') {
        const A = fromPrices(PATHS.c);
        const B = fromPrices(PATHS.d);
        const y1 = yRange(A.eq.concat(B.eq));
        const y2 = yRange(A.dd.concat(B.dd, [0]));
        P.setView([-0.4, PATHS.c.length - 0.6], y1);
        D.setView([-0.4, PATHS.c.length - 0.6], y2);
        P.clear(); D.clear();
        poly(P, A.eq, 'var(--series-1)');
        poly(P, B.eq, 'var(--series-2)');
        poly(D, A.dd, 'var(--series-1)');
        poly(D, B.dd, 'var(--series-2)');
        D.hline(0, { color: 'var(--ink-3)', width: 1 });
        info.set(
          MA.ui.kv(MA.t('Order C compound'), fixed(A.compound, 4)),
          MA.ui.kv(MA.t('Order C max drawdown'), fixed(A.maxdd, 2)),
          MA.ui.kv(MA.t('Order D max drawdown'), fixed(B.maxdd, 3)),
          MA.ui.kv(MA.t('Shared sample sd'), fixed(A.sd, 5))
        );
        return;
      }
      const s = fromPrices(prices);
      const y1 = yRange(prices);
      const y2 = yRange(s.dd.concat([0]));
      P.setView([-0.4, prices.length - 0.6], y1);
      D.setView([-0.4, prices.length - 0.6], y2);
      P.clear(); D.clear();
      poly(P, prices, 'var(--series-1)');
      poly(D, s.dd, 'var(--bad)', 2);
      D.hline(0, { color: 'var(--ink-3)', width: 1 });
      if (!handles) {
        handles = prices.map((p, i) => P.handle(i, p, {
          label: MA.t('Price at index %s', i),
          constrain: (x, y) => [i, Math.min(400, Math.max(5, y))],
          onDrag: (x, y) => { prices[i] = y; draw(); },
        }));
      } else {
        prices.forEach((p, i) => handles[i].set(i, p));
      }
      info.set(
        MA.ui.kv(MA.t('Compound return'), fixed(s.compound, 6)),
        MA.ui.kv(MA.t('Maximum drawdown'), fixed(s.maxdd, 6)),
        MA.ui.kv(MA.t('Mean simple return'), fixed(s.mean, 6)),
        MA.ui.kv(MA.t('Sample sd'), fixed(s.sd, 6))
      );
    }

    if (preset !== 'compare') {
      [['a', 'Path A'], ['b', 'Path B'], ['c', 'Order C'], ['d', 'Order D']].forEach(([key, name]) => {
        MA.ui.button(bar, {
          label: MA.t(name),
          primary: key === preset,
          onClick: () => {
            preset = key;
            prices = PATHS[key].slice();
            clearHandles(P);
            handles = null;
            mount();
            draw();
          },
        });
      });
    }
    if (preset === 'compare') {
      MA.ui.legend(stage, [
        { label: MA.t('Order C'), color: 'var(--series-1)' },
        { label: MA.t('Order D'), color: 'var(--series-2)' },
      ]);
    }
    mount();
    draw();
  });

  // ------------------------------------------------------------------ compound
  MA.widget('compound', (stage, cfg) => {
    let r = C.num(cfg.r, 0.5);
    let s = C.num(cfg.s, -0.5);
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    MA.ui.slider(bar, { label: MA.t('First simple return'), min: -0.8, max: 1, step: 0.01, value: r, fmt: (v) => fixed(v, 2), onInput: (v) => { r = v; draw(); } });
    MA.ui.slider(bar, { label: MA.t('Second simple return'), min: -0.8, max: 1, step: 0.01, value: s, fmt: (v) => fixed(v, 2), onInput: (v) => { s = v; draw(); } });
    const P = new MA.Plot(stage, {
      x: [-0.5, 2.5], y: [-1, 1], height: 280, pad: [16, 16, 28, 48],
      xLabel: MA.t('Date index'), yLabel: MA.t('Equity'),
      label: MA.t('Wealth after two simple returns'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const w0 = 1;
      const w1 = 1 + r;
      const w2 = (1 + r) * (1 + s);
      const eq = [w0, w1, w2];
      P.setView([-0.5, 2.5], yRange(eq.concat([1])));
      P.clear();
      poly(P, eq, 'var(--series-1)');
      P.hline(1, { color: 'var(--ink-3)', width: 1, dash: '4 3' });
      [0, 1, 2].forEach((i) => P.dot(i, eq[i], { color: 'var(--series-1)' }));
      const sum = r + s;
      const comp = w2 - 1;
      let logSum = NaN;
      if (w2 > 0) logSum = Math.log(w2);
      info.set(
        MA.ui.kv(MA.t('Sum of simple returns'), fixed(sum, 2)),
        MA.ui.kv(MA.t('Compound simple return'), fixed(comp, 4)),
        MA.ui.kv(MA.t('Sum of log returns'), fixed(logSum, 6))
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ candles
  function toyBars(seed, days) {
    const rng = MA.num.rng(seed);
    let p = 100;
    const out = [];
    for (let d = 0; d < days; d++) {
      const path = [p];
      for (let k = 0; k < 6; k++) {
        p *= Math.exp(0.006 * MA.num.normal(rng));
        path.push(p);
      }
      out.push({ o: path[0], c: path[path.length - 1], h: Math.max.apply(null, path), l: Math.min.apply(null, path) });
    }
    return out;
  }
  function groupBars(bars, g) {
    const out = [];
    for (let i = 0; i + g <= bars.length; i += g) {
      const s = bars.slice(i, i + g);
      out.push({
        o: s[0].o,
        c: s[s.length - 1].c,
        h: Math.max.apply(null, s.map((b) => b.h)),
        l: Math.min.apply(null, s.map((b) => b.l)),
      });
    }
    return out;
  }
  function drawCandles(P, bars, paint) {
    bars.forEach((b, i) => {
      const up = b.c >= b.o;
      const color = up ? 'var(--good)' : 'var(--bad)';
      P.line(i, b.l, i, b.h, { color, width: 1.4 });
      const y = Math.min(b.o, b.c);
      const h = Math.max(Math.abs(b.c - b.o), (b.h - b.l) * 0.015);
      const extra = paint ? paint(b, i) : null;
      P.rect(i - 0.28, y, 0.56, h, {
        fill: extra && extra.fill ? extra.fill : color,
        color: extra && extra.stroke ? extra.stroke : color,
        fillOpacity: extra && extra.fillOpacity != null ? extra.fillOpacity : 0.85,
        width: extra && extra.width ? extra.width : 1,
      });
    });
  }

  MA.widget('candles', (stage, cfg) => {
    let seed = C.int(cfg.seed, 11);
    let group = Math.max(1, C.int(cfg.group, 1));
    const days = Math.max(8, Math.min(48, C.int(cfg.days, 24)));
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    MA.ui.slider(bar, { label: MA.t('Group size'), min: 1, max: 8, step: 1, value: group, fmt: (v) => String(v), onInput: (v) => { group = v; draw(); } });
    MA.ui.button(bar, { label: MA.t('New path'), onClick: () => { seed += 1; draw(); } });
    const P = new MA.Plot(stage, {
      x: [-1, 2], y: [90, 110], height: 320, pad: [16, 16, 28, 48],
      xLabel: MA.t('Bar'), yLabel: MA.t('Price'),
      label: MA.t('Toy open high low close bars'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const raw = toyBars(seed, days);
      const g = Math.min(group, raw.length);
      const bars = groupBars(raw, g);
      const lo = Math.min.apply(null, bars.map((b) => b.l));
      const hi = Math.max.apply(null, bars.map((b) => b.h));
      P.setView([-0.8, bars.length - 0.2], yRange([lo, hi]));
      P.clear();
      drawCandles(P, bars);
      info.set(
        MA.ui.kv(MA.t('Sessions in the path'), String(raw.length)),
        MA.ui.kv(MA.t('Bars drawn'), String(bars.length)),
        MA.ui.kv(MA.t('Group size'), String(g))
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ average
  function wavePath() {
    const p = [];
    for (let t = 0; t < 48; t++) p.push(100 + 0.35 * t + 8 * Math.sin(t / 3));
    return p;
  }
  function smaAt(p, n) {
    const out = new Array(p.length).fill(null);
    let run = 0;
    for (let i = 0; i < p.length; i++) {
      run += p[i];
      if (i >= n) run -= p[i - n];
      if (i >= n - 1) out[i] = run / n;
    }
    return out;
  }
  function emaAt(p, n) {
    const lam = 2 / (n + 1);
    const out = new Array(p.length).fill(null);
    let f = p[0];
    out[0] = f;
    for (let i = 1; i < p.length; i++) {
      f = lam * p[i] + (1 - lam) * f;
      out[i] = f;
    }
    return out;
  }
  function crosses(a, b) {
    let n = 0;
    let prev = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] == null || b[i] == null) continue;
      const d = a[i] - b[i];
      const sgn = d > 1e-9 ? 1 : d < -1e-9 ? -1 : 0;
      if (sgn !== 0 && prev !== 0 && sgn !== prev) n += 1;
      if (sgn !== 0) prev = sgn;
    }
    return n;
  }

  MA.widget('average', (stage, cfg) => {
    const kind0 = C.str(cfg.kind, 'sma');
    if (kind0 !== 'sma' && kind0 !== 'ema') throw new Error('kind must be sma or ema');
    let kind = kind0;
    let fast = C.int(cfg.fast, 5);
    let slow = C.int(cfg.slow, 20);
    const prices = wavePath();
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [
      { label: MA.t('Price'), color: 'var(--ink)' },
      { label: MA.t('Fast'), color: 'var(--series-1)' },
      { label: MA.t('Slow'), color: 'var(--series-2)' },
    ]);
    const bar = MA.ui.bar(stage);
    let slowCtl = null;
    MA.ui.slider(bar, {
      label: MA.t('Fast window'), min: 2, max: 20, step: 1, value: fast, fmt: (v) => String(v),
      onInput: (v) => { fast = v; if (fast >= slow) { slow = Math.min(40, fast + 1); if (slowCtl) slowCtl.set(slow); } draw(); },
    });
    slowCtl = MA.ui.slider(bar, {
      label: MA.t('Slow window'), min: 3, max: 40, step: 1, value: slow, fmt: (v) => String(v),
      onInput: (v) => { slow = v; if (slow <= fast) { slow = fast + 1; slowCtl.set(slow); } draw(); },
    });
    MA.ui.seg(bar, {
      label: MA.t('Average'),
      options: [['sma', 'SMA'], ['ema', 'EMA']],
      value: kind,
      onChange: (v) => { kind = v; draw(); },
    });
    const P = new MA.Plot(stage, {
      x: [-0.5, prices.length - 0.5], y: yRange(prices), height: 320, pad: [16, 16, 28, 48],
      xLabel: MA.t('Date index'), yLabel: MA.t('Price'),
      label: MA.t('Two averages on a toy path'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const fn = kind === 'ema' ? emaAt : smaAt;
      const f = fn(prices, fast);
      const s = fn(prices, slow);
      P.setView([-0.5, prices.length - 0.5], yRange(prices));
      P.clear();
      // shade where the fast average is strictly above the slow one
      let run = null;
      const paint = (i) => {
        if (f[i] != null && s[i] != null && f[i] > s[i]) {
          if (run == null) run = i;
        } else if (run != null) {
          P.rect(run - 0.5, P.y0, i - run, P.y1 - P.y0, { fill: 'var(--series-1)', fillOpacity: 0.08, stroke: 'none', width: 0 });
          run = null;
        }
      };
      for (let i = 0; i < prices.length; i++) paint(i);
      if (run != null) P.rect(run - 0.5, P.y0, prices.length - run, P.y1 - P.y0, { fill: 'var(--series-1)', fillOpacity: 0.08, stroke: 'none', width: 0 });
      poly(P, prices, 'var(--ink)', 1.6);
      P.path(f.map((y, i) => (y == null ? null : [i, y])), { color: 'var(--series-1)' });
      P.path(s.map((y, i) => (y == null ? null : [i, y])), { color: 'var(--series-2)' });
      const last = prices.length - 1;
      info.set(
        MA.ui.kv(MA.t('Crosses'), String(crosses(f, s))),
        MA.ui.kv(MA.t('Fast at the last date'), fixed(f[last], 2)),
        MA.ui.kv(MA.t('Slow at the last date'), fixed(s[last], 2)),
        kind === 'ema' ? MA.t('EMA uses λ = 2/(n+1). The chapter’s worked EMA sets λ directly.') : MA.t('Shaded dates: fast average above the slow average.')
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ bands
  function revertPath(seed) {
    const rng = MA.num.rng(seed);
    const p = [];
    let x = 100;
    for (let i = 0; i < 80; i++) {
      x = 100 + 0.86 * (x - 100) + 1.6 * MA.num.normal(rng);
      p.push(x);
    }
    return p;
  }
  MA.widget('bands', (stage, cfg) => {
    let seed = C.int(cfg.seed, 3);
    let win = C.int(cfg.window, 10);
    let k = C.num(cfg.k, 2);
    let prices = revertPath(seed);
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [
      { label: MA.t('Price'), color: 'var(--ink)' },
      { label: MA.t('Rolling mean'), color: 'var(--series-1)' },
      { label: MA.t('Band'), color: 'var(--series-2)' },
    ]);
    const bar = MA.ui.bar(stage);
    MA.ui.slider(bar, { label: MA.t('Window'), min: 5, max: 30, step: 1, value: win, fmt: (v) => String(v), onInput: (v) => { win = v; draw(); } });
    MA.ui.slider(bar, { label: MA.t('Band width k'), min: 0.5, max: 3, step: 0.1, value: k, fmt: (v) => fixed(v, 1), onInput: (v) => { k = v; draw(); } });
    MA.ui.button(bar, { label: MA.t('New path'), onClick: () => { seed += 1; prices = revertPath(seed); draw(); } });
    const P = new MA.Plot(stage, {
      x: [0, 10], y: [90, 110], height: 320, pad: [16, 16, 28, 48],
      xLabel: MA.t('Date index'), yLabel: MA.t('Price'),
      label: MA.t('Rolling mean and a band on a toy path'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const mid = new Array(prices.length).fill(null);
      const up = new Array(prices.length).fill(null);
      const lo = new Array(prices.length).fill(null);
      let outside = 0;
      let defined = 0;
      for (let i = win - 1; i < prices.length; i++) {
        const slice = prices.slice(i - win + 1, i + 1);
        const mom = sampleMoments(slice);
        mid[i] = mom.mean;
        up[i] = mom.mean + k * mom.sd;
        lo[i] = mom.mean - k * mom.sd;
        defined += 1;
        if (prices[i] > up[i] || prices[i] < lo[i]) outside += 1;
      }
      P.setView([-0.5, prices.length - 0.5], yRange(prices.concat(up.filter((v) => v != null), lo.filter((v) => v != null))));
      P.clear();
      const top = [];
      const bot = [];
      for (let i = 0; i < prices.length; i++) {
        if (up[i] == null) continue;
        top.push([i, up[i]]);
        bot.push([i, lo[i]]);
      }
      if (top.length) P.poly(top.concat(bot.reverse()), { fill: 'var(--series-2)', fillOpacity: 0.15, stroke: 'none' });
      poly(P, prices, 'var(--ink)', 1.6);
      P.path(mid.map((y, i) => (y == null ? null : [i, y])), { color: 'var(--series-1)' });
      info.set(
        MA.ui.kv(MA.t('Closes outside the band'), outside + ' / ' + defined),
        MA.t('The band uses the sample standard deviation with divisor n−1.')
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ limit
  const LIMIT_BARS = [
    { o: 102, h: 103, l: 99, c: 101 },
    { o: 101, h: 106, l: 100.5, c: 105 },
    { o: 105, h: 108, l: 103, c: 104 },
    { o: 104, h: 107, l: 96, c: 98 },
    { o: 98, h: 102, l: 97, c: 101 },
    { o: 101, h: 104, l: 100, c: 103 },
    { o: 103, h: 103.5, l: 99.5, c: 100 },
    { o: 100, h: 110, l: 99, c: 109 },
  ];
  MA.widget('barlimit', (stage, cfg) => {
    const side0 = C.str(cfg.side, 'buy');
    if (side0 !== 'buy' && side0 !== 'sell') throw new Error('side must be buy or sell');
    let side = side0;
    let limit = C.num(cfg.limit, 100);
    MA.ui.title(stage, cfg.title);
    const lo = Math.min.apply(null, LIMIT_BARS.map((b) => b.l));
    const hi = Math.max.apply(null, LIMIT_BARS.map((b) => b.h));
    const P = new MA.Plot(stage, {
      x: [-0.6, LIMIT_BARS.length - 0.4], y: yRange([lo - 1, hi + 1]), height: 320, pad: [16, 16, 28, 48],
      xLabel: MA.t('Bar'), yLabel: MA.t('Price'),
      label: MA.t('Limit order against toy bars'),
    });
    let handle = null;
    const bar = MA.ui.bar(stage);
    MA.ui.seg(bar, {
      options: [['buy', MA.t('Buy limit')], ['sell', MA.t('Sell limit')]],
      value: side,
      onChange: (v) => { side = v; draw(); },
    });
    const info = MA.ui.info(stage);
    function draw() {
      P.clear();
      let fills = 0;
      drawCandles(P, LIMIT_BARS, (b) => {
        const hit = b.l <= limit && limit <= b.h;
        if (hit) fills += 1;
        return hit ? { stroke: 'var(--accent)', width: 2.4, fillOpacity: 0.95 } : { fillOpacity: 0.35 };
      });
      P.hline(limit, { color: 'var(--accent)', width: 1.6, dash: '5 4' });
      const yof = (y) => Math.min(hi + 1, Math.max(lo - 1, y));
      if (!handle) {
        handle = P.handle(LIMIT_BARS.length - 1, limit, {
          label: MA.t('Limit price'),
          constrain: (x, y) => [LIMIT_BARS.length - 1, yof(y)],
          onDrag: (x, y) => { limit = y; draw(); },
        });
      } else handle.set(LIMIT_BARS.length - 1, limit);
      const first = LIMIT_BARS[0];
      const firstHit = first.l <= limit && limit <= first.h;
      let firstLine = firstHit ? MA.t('Bar 1 contains the limit, so it fills at the limit.') : MA.t('Bar 1 does not contain the limit, so it misses.');
      if (firstHit) {
        const ret = side === 'buy' ? first.c / limit - 1 : limit / first.c - 1;
        firstLine = MA.t('Bar 1 fills at the limit. Fill-to-close simple return: %s.', fixed(ret, 4));
      }
      info.set(
        MA.ui.kv(MA.t('Limit'), fixed(limit, 2)),
        MA.ui.kv(MA.t('Fills'), String(fills)),
        MA.ui.kv(MA.t('Misses'), String(LIMIT_BARS.length - fills)),
        firstLine
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ stop
  function resolveStop(kind, o, h, l, s, ell) {
    const throughSell = l <= s;
    const throughBuy = h >= s;
    if (kind === 'sell-market') {
      if (!throughSell) return MA.t('Misses. The low is above the trigger.');
      if (o <= s) return MA.t('Fills at the open %s. The open is already through the trigger.', fixed(o, 2));
      return MA.t('Fills at the trigger %s.', fixed(s, 2));
    }
    if (kind === 'buy-market') {
      if (!throughBuy) return MA.t('Misses. The high is below the trigger.');
      if (o >= s) return MA.t('Fills at the open %s. The open is already through the trigger.', fixed(o, 2));
      return MA.t('Fills at the trigger %s.', fixed(s, 2));
    }
    if (kind === 'sell-limit') {
      if (!(ell <= s)) return MA.t('A sell stop-limit needs a limit at or below the trigger.');
      if (!throughSell) return MA.t('Misses. The low is above the trigger.');
      if (o < ell) return MA.t('Misses. The open is through the limit, so the stop-limit does not fill.');
      if (ell <= o && o <= s) return MA.t('Fills at the open %s.', fixed(o, 2));
      return MA.t('Fills at the trigger %s.', fixed(s, 2));
    }
    if (!(ell >= s)) return MA.t('A buy stop-limit needs a limit at or above the trigger.');
    if (!throughBuy) return MA.t('Misses. The high is below the trigger.');
    if (o > ell) return MA.t('Misses. The open is through the limit, so the stop-limit does not fill.');
    if (s <= o && o <= ell) return MA.t('Fills at the open %s.', fixed(o, 2));
    return MA.t('Fills at the trigger %s.', fixed(s, 2));
  }

  MA.widget('stop', (stage, cfg) => {
    const kinds = ['sell-market', 'buy-market', 'sell-limit', 'buy-limit'];
    let kind = C.str(cfg.kind, 'sell-market');
    if (!kinds.includes(kind)) throw new Error('kind must be sell-market, buy-market, sell-limit or buy-limit');
    let o = C.num(cfg.open, 90);
    let h = C.num(cfg.high, 94);
    let l = C.num(cfg.low, 88);
    let c = C.num(cfg.close, 91);
    let s = C.num(cfg.trigger, 95);
    let ell = C.num(cfg.limit, 93);
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    const slide = (label, get, set, value) => {
      MA.ui.slider(bar, { label, min: 70, max: 120, step: 0.5, value, fmt: (v) => fixed(v, 1), onInput: (v) => { set(v); draw(); } });
    };
    slide(MA.t('Open'), () => o, (v) => { o = v; }, o);
    slide(MA.t('High'), () => h, (v) => { h = v; }, h);
    slide(MA.t('Low'), () => l, (v) => { l = v; }, l);
    slide(MA.t('Close'), () => c, (v) => { c = v; }, c);
    slide(MA.t('Trigger'), () => s, (v) => { s = v; }, s);
    slide(MA.t('Limit'), () => ell, (v) => { ell = v; }, ell);
    MA.ui.seg(bar, {
      options: [
        ['sell-market', MA.t('Sell stop-market')],
        ['buy-market', MA.t('Buy stop-market')],
        ['sell-limit', MA.t('Sell stop-limit')],
        ['buy-limit', MA.t('Buy stop-limit')],
      ],
      value: kind,
      onChange: (v) => { kind = v; draw(); },
    });
    const P = new MA.Plot(stage, {
      x: [-0.8, 0.8], y: [70, 120], height: 280, pad: [16, 16, 28, 48],
      yLabel: MA.t('Price'),
      label: MA.t('One bar and a stop'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const H = Math.max(h, o, c, l);
      const L = Math.min(l, o, c, h);
      const barOHLC = { o, h: H, l: L, c };
      P.setView([-0.8, 0.8], yRange([L, H, s, ell, o, c]));
      P.clear();
      drawCandles(P, [barOHLC]);
      P.hline(s, { color: 'var(--accent)', width: 1.6 });
      if (kind.endsWith('limit')) P.hline(ell, { color: 'var(--series-4)', width: 1.4, dash: '5 4' });
      info.set(resolveStop(kind, o, H, L, s, ell));
    }
    draw();
  });

  // ------------------------------------------------------------------ folds
  function foldCount(T, L, H, S) {
    if (!(T >= L + H) || S < 1) return 0;
    return Math.floor((T - L - H) / S) + 1;
  }
  MA.widget('folds', (stage, cfg) => {
    let T = C.int(cfg.T, 30);
    let L = C.int(cfg.L, 12);
    let H = C.int(cfg.H, 6);
    let S = C.int(cfg.S, 6);
    let horizon = C.int(cfg.h, 0);
    let embargo = C.int(cfg.m, 0);
    let mode = C.str(cfg.mode, 'rolling');
    if (mode !== 'rolling' && mode !== 'expanding') throw new Error('mode must be rolling or expanding');
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [
      { label: MA.t('Train'), color: 'var(--series-1)' },
      { label: MA.t('Embargo'), color: 'var(--series-4)' },
      { label: MA.t('Purge'), color: 'var(--bad)' },
      { label: MA.t('Test'), color: 'var(--series-2)' },
    ]);
    const bar = MA.ui.bar(stage);
    const sl = (label, min, max, get, set) => MA.ui.slider(bar, {
      label, min, max, step: 1, value: get(), fmt: (v) => String(v), onInput: (v) => { set(v); draw(); },
    });
    sl(MA.t('Dates T'), 20, 120, () => T, (v) => { T = v; });
    sl(MA.t('Train length L'), 4, 80, () => L, (v) => { L = v; });
    sl(MA.t('Test length H'), 2, 40, () => H, (v) => { H = v; });
    sl(MA.t('Step S'), 1, 40, () => S, (v) => { S = v; });
    sl(MA.t('Label horizon h'), 0, 12, () => horizon, (v) => { horizon = v; });
    sl(MA.t('Embargo m'), 0, 12, () => embargo, (v) => { embargo = v; });
    MA.ui.seg(bar, {
      options: [['rolling', MA.t('Rolling')], ['expanding', MA.t('Expanding')]],
      value: mode,
      onChange: (v) => { mode = v; draw(); },
    });
    const P = new MA.Plot(stage, {
      x: [0, 30], y: [0, 3], height: 300, pad: [12, 12, 28, 36],
      xLabel: MA.t('Date index'),
      label: MA.t('Walk-forward windows'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const n = foldCount(T, L, H, S);
      const show = Math.min(n, 8);
      P.setView([-1, T], [-0.4, Math.max(show, 1) - 0.2]);
      P.clear();
      for (let k = 0; k < show; k++) {
        const tau = k * S + L;
        const testEnd = tau + H - 1;
        const train0 = mode === 'expanding' ? 0 : k * S;
        const train1 = tau - 1;
        const purge0 = Math.max(train0, tau - horizon);
        const emb0 = Math.max(train0, purge0 - embargo);
        const y = show - 1 - k;
        // kept train, then embargo, then purge, then test. Later rects paint over earlier ones.
        if (train1 >= train0) P.rect(train0 - 0.5, y, train1 - train0 + 1, 0.62, { fill: 'var(--series-1)', fillOpacity: 0.8, stroke: 'none' });
        if (embargo > 0 && purge0 - 1 >= emb0) P.rect(emb0 - 0.5, y, purge0 - emb0, 0.62, { fill: 'var(--series-4)', fillOpacity: 0.9, stroke: 'none' });
        if (horizon > 0 && train1 >= purge0) P.rect(purge0 - 0.5, y, train1 - purge0 + 1, 0.62, { fill: 'var(--bad)', fillOpacity: 0.75, stroke: 'none' });
        P.rect(tau - 0.5, y, testEnd - tau + 1, 0.62, { fill: 'var(--series-2)', fillOpacity: 0.85, stroke: 'none' });
      }
      let overlap = MA.t('No fold fits. Lengthen the dates or shorten the windows.');
      if (n === 1) overlap = MA.t('One test window.');
      else if (n > 1 && S === H) overlap = MA.t('Successive tests meet and do not overlap.');
      else if (n > 1 && S < H) overlap = MA.t('Successive tests share %s indices.', H - S);
      else if (n > 1 && S > H) overlap = MA.t('Successive tests leave a gap of %s indices.', S - H);
      const more = n > show ? MA.t('Showing the first %s of %s folds.', show, n) : (n === 1 ? MA.t('1 fold.') : MA.t('%s folds.', n));
      info.set(more, overlap, MA.t('The count is a count of windows on one history.'));
    }
    draw();
  });

  // ------------------------------------------------------------------ weights
  MA.widget('weights', (stage, cfg) => {
    let s1 = C.num(cfg.s1, 0.1);
    let s2 = C.num(cfg.s2, 0.2);
    let s3 = C.num(cfg.s3, 0);
    let target = C.num(cfg.target, 0.1);
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    const sl = (label, value, set, min, max) => MA.ui.slider(bar, {
      label, min, max, step: 0.01, value, fmt: (v) => fixed(v, 2), onInput: (v) => { set(v); draw(); },
    });
    sl(MA.t('First volatility'), s1, (v) => { s1 = v; }, 0.05, 0.5);
    sl(MA.t('Second volatility'), s2, (v) => { s2 = v; }, 0.05, 0.5);
    sl(MA.t('Third volatility, 0 omits it'), s3, (v) => { s3 = v; }, 0, 0.5);
    sl(MA.t('Volatility target'), target, (v) => { target = v; }, 0.05, 0.3);
    const P = new MA.Plot(stage, {
      x: [-0.5, 2.5], y: [0, 1], height: 280, pad: [16, 16, 28, 48],
      xLabel: MA.t('Name'), yLabel: MA.t('Weight'),
      label: MA.t('Inverse-volatility weights'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const sig = s3 > 0.001 ? [s1, s2, s3] : [s1, s2];
      const inv = sig.map((s) => 1 / s);
      const z = inv.reduce((a, b) => a + b, 0);
      const w = inv.map((v) => v / z);
      const book = Math.sqrt(w.reduce((a, wi, i) => a + wi * wi * sig[i] * sig[i], 0));
      const scale = book > 0 ? target / book : NaN;
      const share = w.map((wi, i) => (book > 0 ? (wi * wi * sig[i] * sig[i]) / (book * book) : NaN));
      P.setView([-0.6, sig.length - 0.4], [0, Math.max(1, Math.max.apply(null, w) * scale || 1) * 1.15]);
      P.clear();
      w.forEach((wi, i) => {
        P.rect(i - 0.28, 0, 0.56, wi, { fill: 'var(--series-1)', fillOpacity: 0.85, stroke: 'none' });
        if (Number.isFinite(scale)) P.rect(i - 0.1, 0, 0.2, wi * scale, { fill: 'var(--series-2)', fillOpacity: 0.9, stroke: 'none' });
      });
      const bits = w.map((wi, i) => MA.ui.kv(MA.t('Weight %s', i + 1), fixed(wi, 4)));
      const shares = share.map((ri, i) => MA.ui.kv(MA.t('Variance share %s', i + 1), fixed(ri, 3)));
      info.set.apply(info, bits.concat(shares, [
        MA.ui.kv(MA.t('Zero-correlation book vol'), fixed(book, 4)),
        MA.ui.kv(MA.t('Scale to the target'), fixed(scale, 4)),
      ]));
    }
    draw();
  });

  // ------------------------------------------------------------------ sharpe
  MA.widget('sharpe', (stage, cfg) => {
    let mean = C.num(cfg.mean, 0.01393);
    let sd = C.num(cfg.sd, 0.022848);
    let n = C.int(cfg.n, 7);
    let rf = C.num(cfg.rf, 0);
    let ann = C.bool(cfg.annualise, false);
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    const meanCtl = MA.ui.slider(bar, { label: MA.t('Mean simple return'), min: -0.02, max: 0.05, step: 0.0001, value: mean, fmt: (v) => fixed(v, 6), onInput: (v) => { mean = v; draw(); } });
    const sdCtl = MA.ui.slider(bar, { label: MA.t('Sample sd'), min: 0.005, max: 0.08, step: 0.0001, value: sd, fmt: (v) => fixed(v, 6), onInput: (v) => { sd = Math.max(v, 1e-6); draw(); } });
    const nCtl = MA.ui.slider(bar, { label: MA.t('Observations n'), min: 2, max: 2520, step: 1, value: n, fmt: (v) => String(v), onInput: (v) => { n = v; draw(); } });
    const rfCtl = MA.ui.slider(bar, { label: MA.t('Risk-free simple return'), min: -0.01, max: 0.02, step: 0.0001, value: rf, fmt: (v) => fixed(v, 4), onInput: (v) => { rf = v; draw(); } });
    MA.ui.toggle(bar, { label: MA.t('Annualise by √252'), value: ann, onChange: (v) => { ann = v; draw(); } });
    MA.ui.button(bar, {
      label: MA.t('Path A summaries'),
      onClick: () => {
        mean = 0.01393; sd = 0.022848; n = 7; rf = 0;
        meanCtl.set(mean); sdCtl.set(sd); nCtl.set(n); rfCtl.set(rf);
        draw();
      },
    });
    const info = MA.ui.info(stage);
    // a quiet axis so the page still has a chart: the ratio against its standard error
    const P = new MA.Plot(stage, {
      x: [0, 2], y: [-1, 1], height: 220, pad: [16, 16, 28, 52],
      label: MA.t('Sharpe ratio and its standard error'),
    });
    function draw() {
      const S = (mean - rf) / sd;
      const S4 = Math.round(S * 10000) / 10000;
      const se = Math.sqrt((1 + 0.5 * S4 * S4) / n);
      const factor = ann ? Math.sqrt(252) : 1;
      const showS = S4 * factor;
      const showSe = se * factor;
      const span = Math.max(0.5, Math.abs(showS) + showSe);
      P.setView([-0.2, 1.6], [-span, span]);
      P.clear();
      P.hline(0, { color: 'var(--ink-3)', width: 1 });
      P.line(0.7, showS - showSe, 0.7, showS + showSe, { color: 'var(--series-2)', width: 3 });
      P.dot(0.7, showS, { color: 'var(--series-1)', r: 6 });
      info.set(
        MA.ui.kv(ann ? MA.t('Sharpe × √252') : MA.t('Sharpe per step'), fixed(showS, ann ? 2 : 4)),
        MA.ui.kv(ann ? MA.t('Standard error × √252') : MA.t('Standard error'), fixed(showSe, ann ? 2 : 4)),
        MA.t('iid normal excess returns, per the Lo 2002 approximation. Not a forecast.')
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ payoff
  // Six-decimal simple returns printed for Path A, so the profit factor matches the chapter.
  const PATH_A_PRINT = [0.02, -0.009804, 0.029703, -0.009615, 0.038835, -0.009346, 0.037736];
  MA.widget('payoff', (stage, cfg) => {
    let mode = C.str(cfg.mode, 'patha');
    if (mode !== 'patha' && mode !== 'custom') throw new Error('mode must be patha or custom');
    let p = C.num(cfg.winrate, 0.4);
    let win = C.num(cfg.avgwin, 0.03);
    let loss = C.num(cfg.avgloss, 0.02);
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    MA.ui.seg(bar, {
      options: [['patha', MA.t('Path A steps')], ['custom', MA.t('Custom')]],
      value: mode,
      onChange: (v) => { mode = v; draw(); },
    });
    MA.ui.slider(bar, { label: MA.t('Win rate'), min: 0, max: 1, step: 0.01, value: p, fmt: (v) => fixed(v, 2), onInput: (v) => { p = v; if (mode === 'custom') draw(); } });
    MA.ui.slider(bar, { label: MA.t('Average win'), min: 0, max: 0.2, step: 0.005, value: win, fmt: (v) => fixed(v, 3), onInput: (v) => { win = v; if (mode === 'custom') draw(); } });
    MA.ui.slider(bar, { label: MA.t('Average loss'), min: 0, max: 0.2, step: 0.005, value: loss, fmt: (v) => fixed(v, 3), onInput: (v) => { loss = v; if (mode === 'custom') draw(); } });
    const P = new MA.Plot(stage, {
      x: [-0.5, 1.5], y: [0, 1], height: 240, pad: [16, 16, 28, 52],
      label: MA.t('Gains and losses'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      let G;
      let L;
      let rate;
      let compound = null;
      if (mode === 'patha') {
        G = PATH_A_PRINT.filter((r) => r > 0).reduce((a, b) => a + b, 0);
        L = PATH_A_PRINT.filter((r) => r < 0).reduce((a, b) => a + Math.abs(b), 0);
        rate = PATH_A_PRINT.filter((r) => r > 0).length / PATH_A_PRINT.length;
        compound = 110 / 100 - 1;
      } else {
        G = p * win;
        L = (1 - p) * loss;
        rate = p;
      }
      const pf = L === 0 ? (G > 0 ? Infinity : NaN) : G / L;
      const top = Math.max(G, L, 0.01);
      P.setView([-0.6, 1.6], [0, top * 1.25]);
      P.clear();
      P.rect(-0.25, 0, 0.5, G, { fill: 'var(--good)', fillOpacity: 0.85, stroke: 'none' });
      P.rect(0.75, 0, 0.5, L, { fill: 'var(--bad)', fillOpacity: 0.85, stroke: 'none' });
      P.text(0, G, MA.t('Gains'), { anchor: 'middle', dy: -8, size: 12 });
      P.text(1, L, MA.t('Losses'), { anchor: 'middle', dy: -8, size: 12 });
      const row = [
        MA.ui.kv(MA.t('Win rate'), fixed(rate, 4)),
        MA.ui.kv(MA.t('Profit factor'), fixed(pf, 4)),
      ];
      if (compound != null) row.push(MA.ui.kv(MA.t('Compound simple return'), fixed(compound, 6)));
      info.set.apply(info, row);
    }
    draw();
  });

  // ------------------------------------------------------------------ spread
  MA.widget('spread', (stage, cfg) => {
    let beta = C.num(cfg.beta, 1);
    const xs = [];
    const ys = [];
    for (let t = 0; t < 40; t++) {
      const x = 50 + t;
      xs.push(x);
      ys.push(20 + 2 * x + 3 * Math.sin(t / 2));
    }
    MA.ui.title(stage, cfg.title);
    const bar = MA.ui.bar(stage);
    MA.ui.slider(bar, { label: MA.t('Hedge ratio'), min: 0, max: 4, step: 0.05, value: beta, fmt: (v) => fixed(v, 2), onInput: (v) => { beta = v; draw(); } });
    const P = new MA.Plot(stage, {
      x: [0, 39], y: [-1, 1], height: 280, pad: [16, 16, 28, 52],
      xLabel: MA.t('Date index'), yLabel: MA.t('Spread'),
      label: MA.t('Spread of two toy series'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      const spr = ys.map((y, i) => y - beta * xs[i]);
      const mom = sampleMoments(spr);
      P.setView([-0.5, 39.5], yRange(spr));
      P.clear();
      poly(P, spr, 'var(--series-1)');
      P.hline(mom.mean, { color: 'var(--ink-3)', width: 1.2, dash: '4 3' });
      info.set(
        MA.ui.kv(MA.t('Hedge ratio'), fixed(beta, 2)),
        MA.ui.kv(MA.t('Spread sample sd'), fixed(mom.sd, 3)),
        MA.t('The second series was built as 20 + 2 times the first, plus a wave.')
      );
    }
    draw();
  });

  // ------------------------------------------------------------------ formation
  MA.widget('formation', (stage, cfg) => {
    let form = C.int(cfg.form, 12);
    let skip = C.int(cfg.skip, 1);
    let now = C.int(cfg.now, 36);
    const prices = [];
    for (let t = 0; t < 48; t++) prices.push(100 * Math.exp(0.002 * t + 0.08 * Math.sin(t / 4)));
    MA.ui.title(stage, cfg.title);
    MA.ui.legend(stage, [
      { label: MA.t('Formation'), color: 'var(--series-1)' },
      { label: MA.t('Skip'), color: 'var(--series-4)' },
    ]);
    const bar = MA.ui.bar(stage);
    MA.ui.slider(bar, { label: MA.t('Formation length'), min: 2, max: 24, step: 1, value: form, fmt: (v) => String(v), onInput: (v) => { form = v; draw(); } });
    MA.ui.slider(bar, { label: MA.t('Skip'), min: 0, max: 6, step: 1, value: skip, fmt: (v) => String(v), onInput: (v) => { skip = v; draw(); } });
    MA.ui.slider(bar, { label: MA.t('Decision index'), min: 4, max: 47, step: 1, value: now, fmt: (v) => String(v), onInput: (v) => { now = v; draw(); } });
    const P = new MA.Plot(stage, {
      x: [-0.5, 47.5], y: yRange(prices), height: 300, pad: [16, 16, 28, 48],
      xLabel: MA.t('Date index'), yLabel: MA.t('Price'),
      label: MA.t('Formation window and skip'),
    });
    const info = MA.ui.info(stage);
    function draw() {
      P.setView([-0.5, 47.5], yRange(prices));
      P.clear();
      const end = now - skip;
      const start = end - form;
      if (start >= 0 && end >= 0 && end <= 47 && now <= 47) {
        P.rect(start, P.y0, form, P.y1 - P.y0, { fill: 'var(--series-1)', fillOpacity: 0.12, stroke: 'none' });
        if (skip > 0) P.rect(end, P.y0, skip, P.y1 - P.y0, { fill: 'var(--series-4)', fillOpacity: 0.16, stroke: 'none' });
        P.vline(now, { color: 'var(--ink)', width: 1.2 });
        poly(P, prices, 'var(--ink)', 1.7);
        const sig = prices[end] / prices[start] - 1;
        info.set(
          MA.ui.kv(MA.t('Formation return'), fixed(sig, 4)),
          MA.t('The signal uses the close at the decision minus the skip. It does not use the return after the decision.')
        );
      } else {
        poly(P, prices, 'var(--ink)', 1.7);
        info.set(MA.t('The formation window does not fit before the decision. Shorten it or move the decision later.'));
      }
    }
    draw();
  });
})();
