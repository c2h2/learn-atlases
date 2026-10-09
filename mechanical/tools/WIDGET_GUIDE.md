# Mechanical & Aerospace Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot` in `assets/js/widgets/calculus.js` and `oscillator` (an
animated physical drawing) in `assets/js/widgets/ode.js`; the group files also contain Maths Atlas
types that this catalogue leaves out, such as `riemann` and `taylor`, which are good models too.
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the mechanical and aerospace catalogue keeps the 22 types useful here.
Subject-specific types still have to be built — see the plan at the end.

## Files and loading

- `assets/js/core.js` — `MA` namespace: `MA.el` (DOM/SVG builder), `MA.t` (translation), `MA.fmt`
  (number formatting with a real minus sign), `MA.tex(el, tex)` / `MA.texEl(tex)` (KaTeX),
  `MA.isDark()`, `MA.cssVar(name)`, `MA.tip` (tooltip).
- `assets/js/expr.js` — expression language (`MA.expr.parse`, `compile`, `compileC` for complex,
  `taylor`, `toTeX`, `value`). Also runs in node for validation.
- `assets/js/plot.js` — `MA.widget(type, factory)` registry, `MA.cfg` parsers, `MA.Plot` (SVG
  plotting), `MA.ui` (controls), `MA.num` (integrate, deriv, bisect, roots, rk4, seeded rng, normal),
  `MA.anim` (animation loop), `MA.autoRange`.
- `assets/js/widgets/<file>.js` — one file per group, named by the catalogue's `file` field.
  A lesson page loads only the files whose types it uses. Wrap each file in an IIFE like
  calculus.js and register with `MA.widget('type', (stage, cfg, ctx) => { … })`.

## The factory

```js
MA.widget('riemann', (stage, cfg, ctx) => {
  // stage: empty <div> inside <figure class="widget">; append your plot, controls, info rows
  // cfg: {key: "string"} exactly as written by the author (all values are strings)
  // ctx: {fig, id}
});
```

- Parse every value with `MA.cfg`: `num` (accepts `pi/2`), `int`, `bool`, `range`, `list`,
  `points`, `sliders`, `expr(src, vars)` → `{f, ast}`, `str`, `has`. Apply catalogue defaults
  when a key is absent. Matrices: `MA.cfg.list(cfg.matrix).map(r => r.split(',').map(MA.cfg.num))`.
- Throw `new Error('readable message')` for bad input; the framework shows it inside the figure.
- Expressions: compile once (`MA.cfg.expr(cfg.f, ['x', ...sliderNames])`), evaluate with a
  scope object (`f({x: 1, a: 2})`). Slider names (from `cfg.sliders`) must be allowed variables.
- Optional `cfg.title` → `MA.ui.title(stage, cfg.title)`. `caption` is handled by the page.

## Drawing with MA.Plot

```js
const P = new MA.Plot(stage, { x: [-5, 5], y: [-3, 3], equal: false, piTicks: false, width: 640, height: 400 });
P.fn(x => Math.sin(x), { color: 'var(--series-1)' });      // graph, breaks at asymptotes
P.param(fx, fy, t0, t1, opts);  P.path(points, opts);  P.area(f, a, b, { g });  P.poly(points, opts);
P.line(x1, y1, x2, y2, opts);   P.arrow(...);  P.slopeLine(x, y, m);  P.vline(x);  P.hline(y);
P.rect(x, y, w, h, opts);  P.dot(x, y, { r, hollow });  P.circle(x, y, r);  P.text(x, y, 'str', { dx, dy, anchor });
P.tex(x, y, '\\frac{1}{2}', { anchor: 'middle' });
const h = P.handle(x, y, { constrain: (x, y) => [x, f(x)], onDrag: (x, y) => redraw() });   // draggable, keyboard-accessible
P.onHover((x, y) => ...);  P.onClick((x, y) => ...);  const read = P.readout(); read('x = 1.2');
P.clear();  // clears data layers (keeps axes)      P.setView([x0, x1], [y0, y1]);  P.X(x), P.Y(y), P.inv(px, py)
```

Options: `color`, `width`, `dash` (`true` or `'4 3'`), `opacity`, `fill`, `fillOpacity`, `layer`
(`fill` < `curves` < `marks` < `labels` < `top`). Redraw by `P.clear()` then drawing again
(cheap for a few thousand points). Default view box 640×400; use 640×300–460 as needed.

For pixels (domain colouring, heat maps, 3D surfaces) use a `<canvas>` sized in device pixels
(`canvas.width = cssWidth * devicePixelRatio`), styled `width:100%`, inside `<div class="w-plot">`.
Overlay an `MA.Plot` (transparent background: `P.svg.style.background = 'transparent'`, absolutely
positioned) if you need axes or handles on top. Re-render canvases on `window` event `ma:theme`.

3D: write a small projection renderer on canvas (rotation by drag, orthographic or mild
perspective, painter's algorithm for quads, simple Lambert shading). Keep it in the group file
(multivar.js already has one for `surface`; reuse it rather than writing a second).

## Controls and read-outs (MA.ui)

```js
const bar = MA.ui.bar(stage);                       // a row of controls under the plot
MA.ui.slider(bar, { label: 'n', min: 1, max: 100, step: 1, value: 6, fmt: v => String(v), onInput: v => {} });
MA.ui.sliders(bar, MA.cfg.sliders(cfg.sliders), values => {});   // author-defined parameters
MA.ui.select(bar, { label, options: [['left', MA.t('Left')], ...], value, onChange });
MA.ui.seg(bar, { label, options, value, onChange });  MA.ui.toggle(bar, { label, value, onChange });
MA.ui.button(bar, { label, onClick, primary });       MA.ui.text(bar, { label, value, onChange: s => errorOrNull });
const info = MA.ui.info(stage); info.set(MA.ui.kv('Area', MA.fmt(a)), { tex: 'x^2' }, 'text');
MA.ui.legend(stage, [{ label: 'f(x)', color: 'var(--series-1)' }]);   // labels with \ ^ _ { } are TeX
```

Labels containing `\`, `^`, `_` or braces are typeset with KaTeX. Use `MA.t('English text')` for
every visible string (translated later); keep strings short and use `%d`/`%s` for numbers.

## Visual and behavioural conventions

- Colours only from CSS variables so dark mode works: `var(--series-1..4)` for data,
  `var(--ink)`, `var(--ink-2)`, `var(--ink-3)` for neutral lines and text, `var(--accent)` for
  handles, `var(--good)`/`var(--bad)` for right/wrong, `var(--plot-bg)` for backgrounds,
  `var(--grid)`, `var(--rule)`. Area/region fills at opacity 0.12–0.2. Never hard-code hex colours.
- Show numbers with `MA.fmt(v, sig)` (real minus sign, ∞). Exact values (fractions, surds) in TeX
  where the mathematics is exact (see `taylor`).
- Everything a reader can change should update immediately (input events), but keep each redraw
  fast (< ~16 ms typical): cache compiled functions, sample at sensible resolution, use canvas for
  > ~5,000 marks. Animations use `MA.anim` and must stop when finished; start paused if
  `anim.reduce` (reduced motion) is set.
- Randomised figures use `MA.num.rng(seed)` so that a fresh page shows the same picture, plus a
  "New sample"/"Run again" button.
- Mobile: the SVG scales to the column width (≥ 320 px); controls wrap. Touch dragging works
  through pointer events (already in `P.handle`).
- Accessibility: meaningful `aria-label` on plots (`new MA.Plot(stage, { label })`), handles have
  keyboard support, result text goes in `MA.ui.info` rows (aria-live).
- Robustness: invalid or extreme inputs (division by zero, huge values, NaN) must never throw
  from event handlers — clamp, skip non-finite points and show a short message instead.

## Testing

Every type has a live page: `http://f.g77k.com/learn/mechanical/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/mechanical
node tools/shot.js "lab.php?w=oscillator" /tmp/.../oscillator.png              # prints JS errors + figure state
node tools/shot.js "lab.php?w=oscillator" /tmp/.../oscillator-dark.png --dark
node tools/shot.js "lab.php?w=oscillator&cfg=c%3A%200.05" /tmp/.../light-damping.png
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.


## What the existing types already cover

Before planning a new figure, check whether a catalogued type does the job:
`oscillator` (single-degree-of-freedom vibration, damping and resonance), `heat` (transient
conduction in a slab or bar), `transform2d` and `svd` (stress and strain transformation as a linear
map, principal directions), `rowreduce` (the equilibrium equations of a truss, small stiffness
systems), `vectorfield` (velocity fields and streamlines), `contour` and `surface` (potential flow,
stream functions, stress functions, response surfaces), `region` (the integration strips behind
centroids and second moments of area), `slopefield`, `odesolver` and `phaseplane` (equations of
motion, nonlinear dynamics, control), `parametric` (trajectories, coupler curves, orbits), `newton`
(Kepler's equation, the Colebrook equation, implicit design equations), `interpolation`,
`quadrature` and `iterative` (numerical methods behind finite elements and CFD), `fourier`
(periodic forcing and vibration spectra) and `distribution` and `montecarlo` (tolerances, scatter
of material properties, reliability).

## Planned mechanical and aerospace figure types

None of these exists yet. Build them in new group files (`assets/js/widgets/structures.js`,
`machines.js`, `thermofluids.js`, `aero.js`, `control.js`); add each type to `data/widgets.json`
with keys, defaults, `zh`/`zh_desc` and an `example`; add each new group file to `$GROUPS` in
`lab.php` with a label (and the label's Chinese in `inc/lang/zh.php`), and put the Chinese of
every new `MA.t()` string in `inc/lang/zh-figures.php`; then test each type on its Lab page.
Everything runs in the browser on small, fixed data — no network calls. Every number a figure
shows is computed, never typed in: check it against a hand calculation or `python3`
(numpy/scipy) before a lesson relies on it. Property data built into a figure (steam tables,
air properties, the standard atmosphere) must name its source in the catalogue entry.

| priority | type | file | what it shows |
|---|---|---|---|
| 1 | `fbd` | structures.js | Free-body diagram of a rigid body: place supports (pin, roller, fixed) and loads, see the unknown reactions, the moment arm of each force and the solution of the equilibrium equations. |
| 1 | `truss` | structures.js | Plane truss by the method of joints: member forces coloured by tension and compression, a draggable load, zero-force members and a method-of-sections cut. |
| 1 | `beamdiagram` | structures.js | Shear-force, bending-moment and deflection diagrams of a beam with point loads, distributed loads and couples on chosen supports; reactions and the maximum moment. |
| 1 | `mohr` | structures.js | Mohr's circle for plane stress and strain: rotate the element and read normal and shear components, principal values and directions, and the maximum shear. |
| 1 | `fourbar` | machines.js | Four-bar and slider–crank linkages: drive the input crank, see the Grashof type, the coupler curve, the transmission angle and the velocity of any point. |
| 1 | `cycle` | thermofluids.js | Otto, Diesel, Brayton, Rankine and vapour-compression cycles on p–v and T–s diagrams, with a state table, net work, heat and efficiency or coefficient of performance. |
| 1 | `twodof` | machines.js | Two-degree-of-freedom vibration: natural frequencies, animated mode shapes, the frequency response and the tuned vibration absorber. |
| 1 | `pid` | control.js | A plant under P, PI, PD and PID control with gain sliders: step response, overshoot, settling time, steady-state error and actuator effort, with root-locus and Bode views of the same loop. |
| 2 | `buckling` | structures.js | Column buckling: mode shapes for different end conditions, critical stress against slenderness ratio, and the Johnson parabola for intermediate columns. |
| 2 | `cam` | machines.js | Cam profile from a follower motion (harmonic, cycloidal, polynomial): displacement, velocity, acceleration and jerk, pressure angle and radius of curvature. |
| 2 | `geartrain` | machines.js | Simple, compound and planetary gear trains drawn to scale and meshing: speed and torque ratios, and the effect of holding different members. |
| 2 | `moody` | thermofluids.js | The Moody chart from the Colebrook equation: friction factor against Reynolds number and relative roughness, and the head loss of a chosen pipe. |
| 2 | `boundarylayer` | thermofluids.js | Laminar (Blasius) and turbulent velocity profiles, boundary-layer growth along a flat plate, displacement and momentum thickness, and skin friction. |
| 2 | `fin` | thermofluids.js | Temperature along a fin for different tip conditions, the heat rate, and fin efficiency and effectiveness against the fin parameter mL. |
| 2 | `heatexchanger` | thermofluids.js | Fluid temperatures along parallel-flow and counterflow exchangers, the LMTD, and effectiveness against NTU for different capacity ratios. |
| 2 | `airfoil` | aero.js | Pressure distribution and lift of an airfoil from a vortex-panel method: angle of attack, camber and thickness, the lift curve and the Kutta condition. |
| 2 | `robotarm` | control.js | Planar two- and three-link arms: forward kinematics from joint angles, inverse kinematics by dragging the end effector, the workspace and singular configurations. |
| 3 | `fe1d` | structures.js | One-dimensional finite elements for a bar or for heat conduction: number and order of elements against the exact solution, and the assembled stiffness matrix. |
| 3 | `shock` | aero.js | Normal and oblique shocks: the θ–β–M chart, pressure, temperature and Mach number across the shock, and the Prandtl–Meyer expansion. |
| 3 | `rocketeq` | aero.js | The rocket equation and staging: Δv against mass ratio and specific impulse for single- and multi-stage vehicles, at the level of performance only. |
| 3 | `orbittransfer` | aero.js | Hohmann and bi-elliptic transfers between circular orbits drawn to scale: the Δv budget, transfer time and phasing. |
| 3 | `aircraftmodes` | aero.js | Longitudinal and lateral–directional modes of an aircraft from a small set of stability derivatives: eigenvalues and the phugoid, short-period and Dutch-roll responses. |
