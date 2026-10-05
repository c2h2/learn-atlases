/* Physics Atlas — interactive figures for mechanics, waves, fields, heat, quantum physics and relativity.
   Each figure is registered with MA.widget and driven by the "key: value" lines of a :::widget block. */
(function () {
  'use strict';
  const MA = window.MA;
  const el = MA.el;
  const C = MA.cfg;

  function playButton(bar, anim, onStep) {
    let on = false;
    const b = MA.ui.button(bar, {
      label: MA.t('Play'),
      primary: true,
      onClick: () => {
        on = !on;
        b.textContent = on ? MA.t('Pause') : MA.t('Play');
        if (on) anim.play(); else anim.stop();
      },
    });
    return {
      stop() { on = false; b.textContent = MA.t('Play'); anim.stop(); },
      running: () => on,
    };
  }

  function rk4(state, dt, accel) {
    const a = (s) => accel(s);
    const add = (s, k, h) => s.map((v, i) => v + h * k[i]);
    const deriv = (s) => {
      const acc = a(s);
      return s.slice(s.length / 2).concat(acc);
    };
    // state is [x, y, vx, vy] or [x, vx]
    const n = state.length;
    const half = n / 2;
    const f = (s) => {
      const acc = accel(s);
      const out = new Array(n);
      for (let i = 0; i < half; i++) out[i] = s[half + i];
      for (let i = 0; i < half; i++) out[half + i] = acc[i];
      return out;
    };
    const k1 = f(state);
    const k2 = f(add(state, k1, dt / 2));
    const k3 = f(add(state, k2, dt / 2));
    const k4 = f(add(state, k3, dt));
    return state.map((v, i) => v + dt * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6);
  }

  // ------------------------------------------------------------------ vector
  MA.widget('vector', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    const P = new MA.Plot(stage, { x: [-5, 5], y: [-5, 5], equal: true, label: MA.t('Vector addition') });
    let ax = C.num(cfg.ax, 2.4), ay = C.num(cfg.ay, 1.1);
    let bx = C.num(cfg.bx, -0.8), by = C.num(cfg.by, 2.2);
    const clamp = (x, y) => [Math.max(-4.6, Math.min(4.6, x)), Math.max(-4.6, Math.min(4.6, y))];
    const info = MA.ui.info(stage);
    function draw() {
      P.clear();
      P.line(ax, ay, ax + bx, ay + by, { color: 'var(--series-2)', dash: '4 3', width: 1.2 });
      P.line(bx, by, ax + bx, ay + by, { color: 'var(--series-1)', dash: '4 3', width: 1.2 });
      P.arrow(0, 0, ax, ay, { color: 'var(--series-1)', width: 2.4 });
      P.arrow(0, 0, bx, by, { color: 'var(--series-2)', width: 2.4 });
      P.arrow(0, 0, ax + bx, ay + by, { color: 'var(--series-3)', width: 2.6 });
      ha.set(ax, ay);
      hb.set(bx, by);
      const dot = ax * bx + ay * by;
      const cross = ax * by - ay * bx;
      const am = Math.hypot(ax, ay), bm = Math.hypot(bx, by);
      const ang = am * bm > 1e-9 ? Math.acos(Math.max(-1, Math.min(1, dot / (am * bm)))) * 180 / Math.PI : 0;
      info.set(
        MA.ui.kv('|a| =', MA.fmt(am, 3)),
        MA.ui.kv('|b| =', MA.fmt(bm, 3)),
        MA.ui.kv('a · b =', MA.fmt(dot, 3)),
        MA.ui.kv('a × b =', MA.fmt(cross, 3)),
        MA.ui.kv('θ =', MA.fmt(ang, 3) + '°')
      );
    }
    const ha = P.handle(ax, ay, { color: 'var(--series-1)', label: MA.t('Tip of a'), constrain: clamp, onDrag: (x, y) => { ax = x; ay = y; draw(); } });
    const hb = P.handle(bx, by, { color: 'var(--series-2)', label: MA.t('Tip of b'), constrain: clamp, onDrag: (x, y) => { bx = x; by = y; draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ motion (constant acceleration, 1D)
  MA.widget('motion', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let x0 = C.num(cfg.x0, 0), v0 = C.num(cfg.v0, 8), a = C.num(cfg.a, -9.8);
    const T = C.num(cfg.T, 2);
    let t = 0;
    const pos = (tt) => x0 + v0 * tt + 0.5 * a * tt * tt;
    const vel = (tt) => v0 + a * tt;
    const P = new MA.Plot(stage, { x: [0, T], y: [-1, 1], xLabel: 't', yLabel: 'x', label: MA.t('Motion with constant acceleration') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      const xs = [];
      for (let i = 0; i <= 40; i++) xs.push(pos(T * i / 40));
      const lo = Math.min(...xs), hi = Math.max(...xs);
      const pad = Math.max(0.5, 0.15 * (hi - lo || 1));
      P.setView([-0.02 * T, T * 1.04], [lo - pad, hi + pad]);
      P.clear();
      P.fn((tt) => pos(tt), { color: 'var(--series-1)' });
      P.dot(t, pos(t), { color: 'var(--series-2)', r: 6 });
      info.set(MA.ui.kv('t =', MA.fmt(t, 3)), MA.ui.kv('x =', MA.fmt(pos(t), 3)), MA.ui.kv('v =', MA.fmt(vel(t), 3)), MA.ui.kv('a =', MA.fmt(a, 3)));
    }
    MA.ui.slider(bar, { label: 'x_0', tex: true, min: -5, max: 20, step: 0.1, value: x0, onInput: (v) => { x0 = v; draw(); } });
    MA.ui.slider(bar, { label: 'v_0', tex: true, min: -15, max: 20, step: 0.1, value: v0, onInput: (v) => { v0 = v; draw(); } });
    MA.ui.slider(bar, { label: 'a', tex: true, min: -15, max: 10, step: 0.1, value: a, onInput: (v) => { a = v; draw(); } });
    const anim = MA.anim((dt) => { t += dt * 0.45; if (t > T) t = 0; draw(); });
    playButton(bar, anim);
    MA.ui.button(bar, { label: MA.t('Reset'), onClick: () => { t = 0; draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ projectile
  MA.widget('projectile', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let v0 = C.num(cfg.v, 12), deg = C.num(cfg.angle, 50), g = C.num(cfg.g, 9.8), h0 = C.num(cfg.h, 0);
    let t = 0;
    function flight() {
      const th = deg * Math.PI / 180;
      const vx = v0 * Math.cos(th), vy = v0 * Math.sin(th);
      // y = h0 + vy t - 0.5 g t^2 = 0
      const disc = vy * vy + 2 * g * h0;
      const T = disc > 0 ? (vy + Math.sqrt(disc)) / g : 0;
      return { th, vx, vy, T: Math.max(T, 0.05) };
    }
    const P = new MA.Plot(stage, { x: [0, 1], y: [0, 1], equal: true, label: MA.t('Projectile') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      const f = flight();
      const R = f.vx * f.T;
      const H = h0 + (f.vy > 0 ? f.vy * f.vy / (2 * g) : 0);
      const xmax = Math.max(R, 1) * 1.08;
      const ymax = Math.max(H, h0, 1) * 1.25;
      P.setView([0, xmax], [0, ymax]);
      P.clear();
      P.hline(0, { color: 'var(--ink-3)', width: 1.4, dash: null });
      const pts = [];
      const n = 80;
      for (let i = 0; i <= n; i++) {
        const tt = f.T * i / n;
        pts.push([f.vx * tt, h0 + f.vy * tt - 0.5 * g * tt * tt]);
      }
      P.path(pts, { color: 'var(--series-1)', width: 2.2 });
      const y = h0 + f.vy * t - 0.5 * g * t * t;
      P.dot(f.vx * t, Math.max(0, y), { color: 'var(--series-2)', r: 6 });
      info.set(
        MA.ui.kv('R =', MA.fmt(R, 3)),
        MA.ui.kv('H =', MA.fmt(H, 3)),
        MA.ui.kv('T =', MA.fmt(f.T, 3)),
        MA.ui.kv('t =', MA.fmt(t, 3))
      );
    }
    MA.ui.slider(bar, { label: 'v_0', tex: true, min: 2, max: 30, step: 0.1, value: v0, onInput: (v) => { v0 = v; t = 0; draw(); } });
    MA.ui.slider(bar, { label: 'θ', tex: true, min: 5, max: 85, step: 1, value: deg, fmt: (v) => Math.round(v) + '°', onInput: (v) => { deg = v; t = 0; draw(); } });
    MA.ui.slider(bar, { label: 'g', tex: true, min: 1, max: 20, step: 0.1, value: g, onInput: (v) => { g = v; t = 0; draw(); } });
    const anim = MA.anim((dt) => {
      const f = flight();
      t += dt * 0.7;
      if (t > f.T) t = 0;
      draw();
    });
    playButton(bar, anim);
    draw();
  });

  // ------------------------------------------------------------------ incline
  MA.widget('incline', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let deg = C.num(cfg.angle, 30), mu = C.num(cfg.mu, 0.2), g = C.num(cfg.g, 9.8);
    const P = new MA.Plot(stage, { x: [-0.2, 5.2], y: [-0.3, 3.4], equal: true, axes: false, ticks: false, grid: false, label: MA.t('Block on an incline') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      const th = deg * Math.PI / 180;
      const s = Math.sin(th), c = Math.cos(th);
      const sticks = Math.abs(s) <= mu * c + 1e-9 && deg < 90;
      const a = sticks ? 0 : g * (s - mu * c);
      P.clear();
      const L = 4.6;
      P.line(0, 0, L * c, L * s, { color: 'var(--ink)', width: 3 });
      P.line(0, 0, L * c, 0, { color: 'var(--ink-3)', width: 1.4 });
      const bx = 1.7 * c, by = 1.7 * s;
      const w = 0.55, h = 0.38;
      // block corners in the incline frame, then rotate
      const corners = [[-w / 2, 0], [w / 2, 0], [w / 2, h], [-w / 2, h]].map(([u, v]) => [bx + u * c - v * s, by + u * s + v * c]);
      P.poly(corners, { fill: 'var(--series-1)', fillOpacity: 0.85, stroke: 'var(--series-1)' });
      // weight, normal, friction arrows from the block centre
      const cx = bx - (h / 2) * s, cy = by + (h / 2) * c;
      P.arrow(cx, cy, cx, cy - 0.9, { color: 'var(--series-2)', width: 2 });
      P.arrow(cx, cy, cx - 0.7 * s, cy + 0.7 * c, { color: 'var(--series-3)', width: 2 });
      if (mu > 0) P.arrow(cx, cy, cx - 0.55 * c, cy - 0.55 * s, { color: 'var(--series-4)', width: 2 });
      info.set(
        MA.ui.kv('a =', sticks ? '0' : MA.fmt(a, 3)),
        el('span', { text: sticks ? MA.t('The block sticks.') : MA.t('The block slides.') })
      );
    }
    MA.ui.slider(bar, { label: 'θ', tex: true, min: 0, max: 70, step: 1, value: deg, fmt: (v) => Math.round(v) + '°', onInput: (v) => { deg = v; draw(); } });
    MA.ui.slider(bar, { label: 'μ', tex: true, min: 0, max: 1.2, step: 0.01, value: mu, onInput: (v) => { mu = v; draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ energy of a spring
  MA.widget('springenergy', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let k = C.num(cfg.k, 8), m = C.num(cfg.m, 1), A = C.num(cfg.A, 0.4);
    let t = 0;
    const P = new MA.Plot(stage, { x: [-1, 1], y: [-0.35, 0.85], equal: true, axes: false, ticks: false, grid: false, label: MA.t('Energy of a mass on a spring') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      const w = Math.sqrt(k / m);
      const x = A * Math.cos(w * t);
      const v = -A * w * Math.sin(w * t);
      const U = 0.5 * k * x * x, K = 0.5 * m * v * v, E = 0.5 * k * A * A;
      P.clear();
      P.line(-0.85, 0, 0.85, 0, { color: 'var(--ink-3)', width: 2 });
      P.line(-0.85, -0.12, -0.85, 0.12, { color: 'var(--ink)', width: 3 });
      const coils = 8;
      let d = '';
      const x0 = -0.85, x1 = x;
      for (let i = 0; i <= coils * 2; i++) {
        const px = P.X(x0 + (x1 - x0) * i / (coils * 2));
        const py = P.Y(i === 0 || i === coils * 2 ? 0 : (i % 2 ? 0.12 : -0.12));
        d += (i ? 'L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1);
      }
      P.layers.curves.append(el('path', { d, style: 'fill:none;stroke:var(--ink-2);stroke-width:1.6' }));
      P.rect(x, -0.1, 0.16, 0.22, { fill: 'var(--series-1)', fillOpacity: 1, stroke: 'var(--series-1)' });
      const scale = E > 1e-9 ? 0.62 / E : 0;
      P.rect(-0.7, 0.22, 0.28, Math.max(0.01, K * scale), { fill: 'var(--series-2)', fillOpacity: 0.9 });
      P.rect(-0.28, 0.22, 0.28, Math.max(0.01, U * scale), { fill: 'var(--series-3)', fillOpacity: 0.9 });
      P.rect(0.16, 0.22, 0.28, Math.max(0.01, E * scale), { fill: 'var(--ink)', fillOpacity: 0.75 });
      P.text(-0.56, 0.18, 'K', { anchor: 'middle', dy: 0 });
      P.text(-0.14, 0.18, 'U', { anchor: 'middle' });
      P.text(0.3, 0.18, 'E', { anchor: 'middle' });
      info.set(MA.ui.kv('x =', MA.fmt(x, 3)), MA.ui.kv('K =', MA.fmt(K, 3)), MA.ui.kv('U =', MA.fmt(U, 3)), MA.ui.kv('E =', MA.fmt(E, 3)));
    }
    MA.ui.slider(bar, { label: 'k', tex: true, min: 1, max: 40, step: 0.5, value: k, onInput: (v) => { k = v; draw(); } });
    MA.ui.slider(bar, { label: 'm', tex: true, min: 0.2, max: 5, step: 0.1, value: m, onInput: (v) => { m = v; draw(); } });
    MA.ui.slider(bar, { label: 'A', tex: true, min: 0.05, max: 0.7, step: 0.01, value: A, onInput: (v) => { A = v; draw(); } });
    const anim = MA.anim((dt) => { t += dt; draw(); });
    playButton(bar, anim);
    draw();
  });

  // ------------------------------------------------------------------ 1D collision
  MA.widget('collision', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let m1 = C.num(cfg.m1, 2), m2 = C.num(cfg.m2, 1), u1 = C.num(cfg.u1, 3), u2 = C.num(cfg.u2, 0), e = C.num(cfg.e, 1);
    let t = 0, phase = 'approach';
    const P = new MA.Plot(stage, { x: [-1, 11], y: [-0.4, 2.2], axes: false, ticks: false, grid: false, label: MA.t('One-dimensional collision') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function velocities() {
      const M = m1 + m2;
      const v1 = (m1 * u1 + m2 * u2 - m2 * e * (u1 - u2)) / M;
      const v2 = (m1 * u1 + m2 * u2 + m1 * e * (u1 - u2)) / M;
      return [v1, v2];
    }
    function draw() {
      const [v1, v2] = velocities();
      const x1 = phase === 'approach' ? 2 + u1 * t : 4.2 + v1 * (t - 0.7);
      const x2 = phase === 'approach' ? 7 + u2 * t : 6.2 + v2 * (t - 0.7);
      P.clear();
      P.line(0, 0, 10.5, 0, { color: 'var(--ink-3)', width: 2 });
      const s1 = 0.35 + 0.12 * m1, s2 = 0.35 + 0.12 * m2;
      P.rect(x1 - s1 / 2, 0, s1, 0.55 + 0.15 * m1, { fill: 'var(--series-1)', fillOpacity: 0.9 });
      P.rect(x2 - s2 / 2, 0, s2, 0.55 + 0.15 * m2, { fill: 'var(--series-2)', fillOpacity: 0.9 });
      info.set(MA.ui.kv("v_1' =", MA.fmt(v1, 3)), MA.ui.kv("v_2' =", MA.fmt(v2, 3)));
    }
    function reset() { t = 0; phase = 'approach'; }
    MA.ui.slider(bar, { label: 'm_1', tex: true, min: 0.5, max: 5, step: 0.1, value: m1, onInput: (v) => { m1 = v; reset(); draw(); } });
    MA.ui.slider(bar, { label: 'm_2', tex: true, min: 0.5, max: 5, step: 0.1, value: m2, onInput: (v) => { m2 = v; reset(); draw(); } });
    MA.ui.slider(bar, { label: 'u_1', tex: true, min: -2, max: 6, step: 0.1, value: u1, onInput: (v) => { u1 = v; reset(); draw(); } });
    MA.ui.slider(bar, { label: 'u_2', tex: true, min: -4, max: 4, step: 0.1, value: u2, onInput: (v) => { u2 = v; reset(); draw(); } });
    MA.ui.slider(bar, { label: 'e', tex: true, min: 0, max: 1, step: 0.01, value: e, onInput: (v) => { e = v; reset(); draw(); } });
    const anim = MA.anim((dt) => {
      t += dt;
      if (phase === 'approach' && t >= 0.7) { phase = 'leave'; }
      if (t > 2.4) reset();
      draw();
    });
    playButton(bar, anim);
    draw();
  });

  // ------------------------------------------------------------------ rolling race
  MA.widget('rolling', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let deg = C.num(cfg.angle, 25);
    const kinds = [
      { name: MA.t('Solid sphere'), k: 2 / 5, color: 'var(--series-1)' },
      { name: MA.t('Disc'), k: 1 / 2, color: 'var(--series-2)' },
      { name: MA.t('Hoop'), k: 1, color: 'var(--series-4)' },
    ];
    let t = 0;
    const P = new MA.Plot(stage, { x: [-0.3, 6.2], y: [-0.4, 3.2], equal: true, axes: false, ticks: false, grid: false, label: MA.t('Rolling race') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      const th = deg * Math.PI / 180;
      const s = Math.sin(th), c = Math.cos(th);
      const g = 9.8;
      const L = 5.4;
      P.clear();
      P.line(0.3, 0.25, 0.3 + L * c, 0.25 + L * s, { color: 'var(--ink)', width: 3 });
      const parts = [];
      kinds.forEach((kd, i) => {
        const a = g * s / (1 + kd.k);
        const dist = Math.min(L - 0.4, 0.5 * a * t * t);
        const x = 0.5 + dist * c;
        const y = 0.25 + 0.22 + dist * s + i * 0.02;
        P.dot(x, y, { color: kd.color, r: 7 });
        parts.push(MA.ui.kv(kd.name, MA.fmt(a, 3)));
      });
      info.set(...parts);
    }
    MA.ui.slider(bar, { label: 'θ', tex: true, min: 5, max: 50, step: 1, value: deg, fmt: (v) => Math.round(v) + '°', onInput: (v) => { deg = v; t = 0; draw(); } });
    const anim = MA.anim((dt) => { t += dt; if (t > 3.2) t = 0; draw(); });
    playButton(bar, anim);
    draw();
  });

  // ------------------------------------------------------------------ orbit
  MA.widget('orbit', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let GM = C.num(cfg.GM, 1), r0 = C.num(cfg.r, 1.4), vt = C.num(cfg.vt, 0.85);
    const P = new MA.Plot(stage, { x: [-3.2, 3.2], y: [-3.2, 3.2], equal: true, label: MA.t('Orbit in an inverse-square field') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function trace() {
      // start at (r0, 0) with velocity (0, vt). Integrate until return or escape.
      let s = [r0, 0, 0, vt];
      const pts = [[s[0], s[1]]];
      const dt = 0.012;
      let escaped = false, bound = false;
      for (let i = 0; i < 2400; i++) {
        s = rk4(s, dt, (st) => {
          const r = Math.hypot(st[0], st[1]) || 1e-6;
          const a = -GM / (r * r * r);
          return [a * st[0], a * st[1]];
        });
        const r = Math.hypot(s[0], s[1]);
        if (r > 8 || r < 0.05) { escaped = r > 8; break; }
        if (i > 20 && s[1] < 0 && pts[pts.length - 1][1] >= 0 && Math.abs(s[0] - r0) < 0.08) { bound = true; break; }
        if (i % 2 === 0) pts.push([s[0], s[1]]);
      }
      const E = 0.5 * vt * vt - GM / r0;
      const vc = Math.sqrt(GM / r0), ve = Math.sqrt(2 * GM / r0);
      let kind = MA.t('Ellipse');
      if (E > 1e-3) kind = MA.t('Hyperbola');
      else if (Math.abs(E) <= 1e-3) kind = MA.t('Parabola');
      else if (Math.abs(vt - vc) < 0.03 * vc) kind = MA.t('Circle');
      return { pts, kind, vc, ve, E, bound };
    }
    function draw() {
      const tr = trace();
      P.clear();
      P.circle(0, 0, 0.12, { fill: 'var(--series-2)', color: 'var(--series-2)', fillOpacity: 1 });
      P.circle(0, 0, r0, { color: 'var(--rule-2)', width: 1, dash: '3 4' });
      P.path(tr.pts, { color: 'var(--series-1)', width: 2.2 });
      P.dot(r0, 0, { color: 'var(--series-1)', r: 5 });
      info.set(
        MA.ui.kv(MA.t('Orbit'), tr.kind),
        MA.ui.kv('v_c =', MA.fmt(tr.vc, 3)),
        MA.ui.kv('v_e =', MA.fmt(tr.ve, 3)),
        MA.ui.kv('E =', MA.fmt(tr.E, 3))
      );
    }
    MA.ui.slider(bar, { label: 'r', tex: true, min: 0.6, max: 2.4, step: 0.02, value: r0, onInput: (v) => { r0 = v; draw(); } });
    MA.ui.slider(bar, { label: 'v', tex: true, min: 0.15, max: 2.2, step: 0.01, value: vt, onInput: (v) => { vt = v; draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ hydrostatic / Torricelli
  MA.widget('hydro', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let H = C.num(cfg.H, 2), d = C.num(cfg.d, 1.2), rho = C.num(cfg.rho, 1000);
    const g = 9.8;
    const P = new MA.Plot(stage, { x: [-0.2, 3.4], y: [-0.2, 2.8], equal: true, axes: false, ticks: false, grid: false, label: MA.t('Pressure in a fluid') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      d = Math.min(d, H);
      P.clear();
      P.rect(0.4, 0, 1.3, H, { fill: 'var(--series-1)', fillOpacity: 0.28, stroke: 'var(--series-1)', width: 2 });
      const yHole = H - d;
      P.dot(1.7, yHole, { color: 'var(--series-2)', r: 4 });
      const v = Math.sqrt(2 * g * d);
      const range = v * Math.sqrt(2 * yHole / g);
      if (yHole > 0.02) {
        const pts = [];
        for (let i = 0; i <= 24; i++) {
          const x = 1.7 + range * i / 24;
          const tt = (x - 1.7) / Math.max(v, 1e-6);
          pts.push([x, yHole - 0.5 * g * tt * tt]);
        }
        P.path(pts, { color: 'var(--series-2)', width: 2 });
      }
      info.set(
        MA.ui.kv('ΔP =', MA.fmt(rho * g * d, 4) + ' Pa'),
        MA.ui.kv('v =', MA.fmt(v, 3) + ' m/s'),
        MA.ui.kv('R =', MA.fmt(yHole > 0 ? range : 0, 3) + ' m')
      );
    }
    MA.ui.slider(bar, { label: 'H', tex: true, min: 0.4, max: 2.4, step: 0.02, value: H, onInput: (v) => { H = v; if (d > H) d = H; draw(); } });
    MA.ui.slider(bar, { label: 'd', tex: true, min: 0.05, max: 2.4, step: 0.02, value: d, onInput: (v) => { d = Math.min(v, H); draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ point charges
  MA.widget('charges', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    const raw = C.list(cfg.charges);
    const charges = (raw.length ? raw : ['1, -1.2, 0', '-1, 1.2, 0']).map((s) => {
      const p = s.split(',').map((x) => C.num(x.trim()));
      return { q: p[0], x: p[1], y: p[2] };
    });
    const P = new MA.Plot(stage, { x: [-3, 3], y: [-3, 3], equal: true, label: MA.t('Electric field of point charges') });
    function field(x, y) {
      let Ex = 0, Ey = 0;
      for (const c of charges) {
        const dx = x - c.x, dy = y - c.y;
        const r2 = dx * dx + dy * dy;
        if (r2 < 0.08) return null;
        const r = Math.sqrt(r2);
        const f = c.q / (r2 * r);
        Ex += f * dx; Ey += f * dy;
      }
      return [Ex, Ey];
    }
    P.clear();
    const step = 0.55;
    for (let x = -2.6; x <= 2.6; x += step) {
      for (let y = -2.6; y <= 2.6; y += step) {
        const E = field(x, y);
        if (!E) continue;
        const m = Math.hypot(E[0], E[1]);
        if (m < 1e-6) continue;
        const L = 0.22;
        P.arrow(x, y, x + L * E[0] / m, y + L * E[1] / m, { color: 'var(--ink-3)', width: 1.3 });
      }
    }
    charges.forEach((c) => {
      P.dot(c.x, c.y, { color: c.q >= 0 ? 'var(--series-2)' : 'var(--series-1)', r: 8 });
      P.text(c.x, c.y, c.q > 0 ? '+' : '−', { anchor: 'middle', dy: 4, color: '#fff' });
    });
  });

  // ------------------------------------------------------------------ travelling waves
  MA.widget('wave', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let A = C.num(cfg.A, 1), B = C.num(cfg.B, 0), k = C.num(cfg.k, 2), w = C.num(cfg.w, 3);
    let t = 0;
    const P = new MA.Plot(stage, { x: [0, 4 * Math.PI], y: [-2.4, 2.4], piTicks: true, xLabel: 'x', yLabel: 'y', label: MA.t('Travelling waves') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function yOf(x) { return A * Math.sin(k * x - w * t) + B * Math.sin(k * x + w * t); }
    function draw() {
      P.clear();
      P.fn(yOf, { color: 'var(--series-1)' });
      const v = k !== 0 ? w / k : 0;
      info.set(MA.ui.kv('v =', MA.fmt(v, 3)), MA.ui.kv('λ =', k ? MA.fmt(2 * Math.PI / k, 3) : '–'));
    }
    MA.ui.slider(bar, { label: 'A', tex: true, min: 0, max: 1.5, step: 0.05, value: A, onInput: (v) => { A = v; draw(); } });
    MA.ui.slider(bar, { label: 'B', tex: true, min: 0, max: 1.5, step: 0.05, value: B, onInput: (v) => { B = v; draw(); } });
    MA.ui.slider(bar, { label: 'k', tex: true, min: 0.4, max: 4, step: 0.05, value: k, onInput: (v) => { k = v; draw(); } });
    const anim = MA.anim((dt) => { t += dt; draw(); });
    playButton(bar, anim);
    draw();
  });

  // ------------------------------------------------------------------ infinite well
  MA.widget('well', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let n = C.int(cfg.n, 1);
    const show = C.str(cfg.show, 'both');
    const P = new MA.Plot(stage, { x: [-0.15, 1.15], y: [-1.6, 1.6], xLabel: 'x / a', label: MA.t('Infinite square well') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    function draw() {
      P.clear();
      P.vline(0, { color: 'var(--ink)', width: 2, dash: null });
      P.vline(1, { color: 'var(--ink)', width: 2, dash: null });
      if (show !== 'density') P.fn((x) => (x <= 0 || x >= 1 ? NaN : Math.sqrt(2) * Math.sin(n * Math.PI * x)), { color: 'var(--series-1)' });
      if (show !== 'wave') P.fn((x) => (x <= 0 || x >= 1 ? NaN : 2 * Math.sin(n * Math.PI * x) ** 2 - 1.35), { color: 'var(--series-2)' });
      const E = n * n * Math.PI * Math.PI / 2;
      info.set(MA.ui.kv('n =', String(n)), MA.ui.kv('E / E_1 =', String(n * n)), MA.ui.kv('E =', MA.fmt(E, 4) + '  (ℏ = m = a = 1)'));
    }
    MA.ui.slider(bar, { label: 'n', tex: true, min: 1, max: 8, step: 1, value: n, fmt: (v) => String(Math.round(v)), onInput: (v) => { n = Math.round(v); draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ ideal-gas isotherms
  MA.widget('isotherm', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let T = C.num(cfg.T, 300);
    const P = new MA.Plot(stage, { x: [0.15, 3], y: [0, 4.2], xLabel: 'V', yLabel: 'P', label: MA.t('Isotherms of an ideal gas') });
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    // P V = T/300, so the T=300 isotherm is P = 1/V in these units
    function draw() {
      P.clear();
      [200, 300, 400].forEach((temp, i) => {
        P.fn((V) => (temp / 300) / V, { color: C.color(i), width: temp === 300 ? 2.6 : 1.6 });
      });
      const V0 = 1.2;
      const P0 = (T / 300) / V0;
      P.dot(V0, P0, { color: 'var(--ink)', r: 5 });
      info.set(MA.ui.kv('T =', MA.fmt(T, 4) + ' K'), MA.ui.kv('P =', MA.fmt(P0, 3)), MA.ui.kv('V =', MA.fmt(V0, 3)));
    }
    MA.ui.legend(stage, [
      { label: '200 K', color: 'var(--series-1)' },
      { label: '300 K', color: 'var(--series-2)' },
      { label: '400 K', color: 'var(--series-3)' },
    ]);
    MA.ui.slider(bar, { label: 'T', tex: true, min: 150, max: 500, step: 5, value: T, fmt: (v) => Math.round(v) + ' K', onInput: (v) => { T = v; draw(); } });
    draw();
  });

  // ------------------------------------------------------------------ velocity addition
  MA.widget('boost', (stage, cfg) => {
    MA.ui.title(stage, cfg.title);
    let v = C.num(cfg.v, 0.6), u = C.num(cfg.u, 0.6);
    const info = MA.ui.info(stage);
    const bar = MA.ui.bar(stage);
    const P = new MA.Plot(stage, { x: [-1.05, 1.05], y: [-0.15, 1.15], xLabel: 'velocity / c', label: MA.t('Relativistic velocity addition') });
    function draw() {
      const rel = (v + u) / (1 + v * u);
      const cl = v + u;
      P.clear();
      P.hline(0, { color: 'var(--ink-3)', width: 1.2, dash: null });
      P.vline(1, { color: 'var(--series-2)', width: 1.3 });
      P.vline(-1, { color: 'var(--series-2)', width: 1.3 });
      P.dot(Math.max(-1.5, Math.min(1.5, cl)), 0.35, { color: 'var(--ink-3)', r: 6 });
      P.dot(rel, 0.7, { color: 'var(--series-1)', r: 6 });
      P.text(Math.max(-1, Math.min(1, cl)), 0.35, MA.t('Galilean'), { dy: -10, anchor: 'middle' });
      P.text(rel, 0.7, MA.t('Einstein'), { dy: -10, anchor: 'middle' });
      const g = 1 / Math.sqrt(Math.max(1e-9, 1 - v * v));
      info.set(MA.ui.kv("u' / c =", MA.fmt(rel, 4)), MA.ui.kv('γ(v) =', MA.fmt(g, 4)));
    }
    MA.ui.slider(bar, { label: 'v/c', min: -0.95, max: 0.95, step: 0.01, value: v, onInput: (val) => { v = val; draw(); } });
    MA.ui.slider(bar, { label: 'u/c', min: -0.95, max: 0.95, step: 0.01, value: u, onInput: (val) => { u = val; draw(); } });
    draw();
  });
})();
