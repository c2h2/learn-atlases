# EE Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js`.
Read them and `assets/js/plot.js` before writing anything. The engine and the figure files are
copied from Maths Atlas (`/learn/maths/`); the EE catalogue keeps the 33 types useful in
engineering. EE-specific types still have to be built — see the plan at the end.

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
(multivar.js) and share it between `surface` and `frenet`.

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

Every type has a live page: `http://f.g77k.com/learn/ee/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/ee
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann-dark.png --dark
node tools/shot.js "lab.php?w=riemann&cfg=f%3A%20x%5E2" /tmp/.../x2.png
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.

## Planned EE figure types

None of these exists yet. Build them in new group files (`assets/js/widgets/circuits.js`,
`signals.js`, `em.js`, `electronics.js`, `power.js`), add each to `data/widgets.json` with its keys,
defaults, `zh`/`zh_desc` and an `example`, and test it on its Lab page. Suggested order:

| priority | type | what it shows |
|---|---|---|
| 1 | `schematic` | A circuit drawn from a compact netlist (`R1 a b 4.7k; C1 b 0 10u; V1 a 0 dc 5`, optional grid positions), solved by modified nodal analysis: node voltages and branch currents on hover, editable values, DC and AC (phasor) modes. Needed by almost every circuits and electronics lesson. |
| 1 | `transient` | Step and natural responses of RC, RL and RLC circuits: $v(t)$, $i(t)$, time constants, damping regimes, sliders for R, L, C. |
| 1 | `bode` | Magnitude and phase Bode plots of a rational $H(s)$ (coefficients or poles/zeros/gain), asymptotes, −3 dB points, gain and phase margins. |
| 1 | `polezero` | Draggable poles and zeros in the s- or z-plane with the linked frequency response and step/impulse response. |
| 1 | `phasor` | Rotating phasors and their projections, phasor sums, impedance and power triangles, leading and lagging current. |
| 2 | `rootlocus` | Root locus of $1 + KG(s)$ with a gain slider, closed-loop poles and step response. |
| 2 | `nyquist` | Nyquist plot with encirclements of −1 and gain/phase margins. |
| 2 | `convolution` | Flip-and-slide convolution in continuous and discrete time. |
| 2 | `sampling` | Sampling and aliasing in time and frequency, reconstruction filters. |
| 2 | `spectrum` | A signal and its spectrum (Fourier transform or DFT/FFT) with windowing. |
| 2 | `filterdesign` | FIR (window) and IIR (bilinear) design: magnitude, phase, group delay, poles and zeros. |
| 2 | `devicecurves` | Diode, MOSFET and BJT characteristics with load line and Q-point. |
| 2 | `logicsim` | Gate-level logic simulation from a netlist with truth table and timing diagram; flip-flops and simple state machines. |
| 2 | `kmap` | Karnaugh map editor with prime implicants and a minimal sum of products. |
| 3 | `tline` | Transmission line: incident and reflected waves, standing-wave pattern, VSWR, bounce diagram for transients. |
| 3 | `smithchart` | Smith chart with a load, lines and stubs, and matching networks. |
| 3 | `fieldlines` | Field lines and equipotentials of point and line charges or currents (extends `vectorfield`). |
| 3 | `planewave` | Polarisation of plane waves and reflection at an interface. |
| 3 | `antenna` | Radiation patterns of dipoles and arrays. |
| 3 | `modulation` | AM, FM and PM signals in time and frequency. |
| 3 | `constellation` | PSK/QAM constellations with noise, decision regions and error rate. |
| 3 | `eyediagram` | Pulse shaping, intersymbol interference and the eye diagram. |
| 3 | `threephase` | Three-phase phasors, wye and delta, balanced and unbalanced loads, power. |
| 3 | `converter` | Buck/boost converter waveforms: inductor current, ripple, duty cycle, CCM/DCM. |
| 3 | `rectifier` | Diode and thyristor rectifier waveforms. |
| 3 | `machine` | Induction-motor torque–speed curve; synchronous-machine power angle. |
| 3 | `swing` | Swing equation and the equal-area criterion. |
| 3 | `powerflow` | Newton–Raphson power flow on a small network. |

