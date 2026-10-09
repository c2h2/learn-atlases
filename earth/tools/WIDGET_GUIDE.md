# Earth & Climate Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js` (the
group files are the full Maths Atlas ones, even where this catalogue omits some of their types).
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the Earth & Climate catalogue keeps the 15 types useful here. Earth- and
climate-specific types still have to be built — see the plan at the end.

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

For pixels (heat maps, maps of a field, 3D surfaces) use a `<canvas>` sized in device pixels
(`canvas.width = cssWidth * devicePixelRatio`), styled `width:100%`, inside `<div class="w-plot">`.
Overlay an `MA.Plot` (transparent background: `P.svg.style.background = 'transparent'`, absolutely
positioned) if you need axes or handles on top. Re-render canvases on `window` event `ma:theme`.

3D: write a small projection renderer on canvas (rotation by drag, orthographic or mild
perspective, painter's algorithm for quads, simple Lambert shading). The existing one lives in
`multivar.js` (shared by `surface` and `frenet`); reuse it rather than writing a second one.

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
  Colour ramps for fields (temperature, elevation, anomalies) are built from these variables too,
  re-read on `ma:theme`; anomalies use a diverging ramp centred on zero.
- Show numbers with `MA.fmt(v, sig)` (real minus sign, ∞) and **always with units** (`K`, `W m⁻²`,
  `ppm`, `Ma`, `km`, `m s⁻¹`).
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
- **Data**: everything runs in the browser on small, fixed data — no network calls. A dataset that
  ships with a figure (a CO₂ record, a density profile of the Earth, an orbital table) is a short,
  rounded table inside the figure file or `data/`, with its source, its licence and the last year it
  covers stated in the catalogue `desc` and shown in the figure ("data: NOAA GML, to 2024").
  Physical constants and simplified formulas are named in a comment with their reference.

## Testing

Every type has a live page: `http://f.g77k.com/learn/earth/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/earth
node tools/shot.js "lab.php?w=heat" /tmp/.../heat.png                    # prints JS errors + figure state
node tools/shot.js "lab.php?w=heat" /tmp/.../heat-dark.png --dark
node tools/shot.js "lab.php?w=plot&cfg=f%3A%20x%5E2" /tmp/.../x2.png
node tools/labcheck.js [type …] [--dark]                                  # every catalogue type in turn
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.

## Planned Earth and climate figure types

None of these exists yet. Build them in new group files — `assets/js/widgets/climate.js`,
`geo.js`, `atmos.js`, `ocean.js`, `hydro.js` and `maps.js` — add each type to `data/widgets.json`
with keys, defaults, `zh`/`zh_desc` and an `example`, add the group's label to `$GROUPS` in
`lab.php` (and its Chinese to `inc/lang/zh.php`), and test it on its Lab page. Keep the physics
honest: a simplified model says what it leaves out, in the figure or its catalogue `desc`.

| priority | type | file | what it shows |
|---|---|---|---|
| 1 | `energybalance` | climate | Zero-dimensional energy-balance model: solar constant, albedo and effective emissivity (or a feedback parameter) set the equilibrium temperature; with a mixed-layer heat capacity, the approach to equilibrium after a step in forcing. |
| 1 | `greenhouse` | climate | Layer model of the greenhouse effect: one or more absorbing layers and the fluxes between them, then the emission-height picture in which adding CO₂ raises the emission level along the lapse rate. |
| 1 | `keeling` | climate | The Mauna Loa CO₂ record from a fixed, dated table of monthly means: trend, seasonal cycle and growth rate; detrend it and fit a seasonal harmonic. |
| 1 | `forcing` | climate | Radiative forcing of CO₂ from the simplified logarithmic expression ($5.35\ln(C/C_0)$ W m⁻², Myhre et al. 1998, with its limits stated), the forcing of a doubling, and the equilibrium warming for a chosen feedback parameter. |
| 1 | `insolation` | climate | Daily insolation against latitude and day of the year, and how it changes with eccentricity, obliquity and precession; the summer insolation at 65° N through a fixed orbital table. |
| 1 | `platemotion` | geo | Plates on a sphere rotating about an Euler pole: velocity vectors along a boundary, spreading or convergence rate and direction, and how they vary with distance from the pole. |
| 1 | `seismicrays` | geo | Rays and travel-time curves through a layered Earth with a simplified velocity profile: P and S phases, the core shadow zone, and locating an epicentre from three stations. |
| 1 | `decay` | geo | Radioactive decay and the growth of daughter isotopes, half-lives, and an isochron diagram with adjustable age and initial ratio. |
| 2 | `interior` | geo | Density, pressure, temperature and seismic velocity against depth from a simplified fixed table (PREM-like), with the main boundaries labelled. |
| 2 | `rockcycle` | geo | The rock cycle as reservoirs and processes (melting, cooling, weathering, deposition, burial, metamorphism, uplift) with indicative rates and residence times. |
| 2 | `streamprofile` | geo | A river long profile evolving under uplift and stream-power erosion: steady-state concavity, a knickpoint migrating upstream after a change in uplift or base level. |
| 2 | `skewt` | atmos | A thermodynamic diagram (skew-T log-p) with isotherms, dry and moist adiabats and saturation mixing-ratio lines; lift a parcel, find the lifting condensation level and shade CAPE and CIN. |
| 2 | `geostrophic` | atmos | Wind on a rotating Earth: pressure-gradient and Coriolis forces, geostrophic and gradient wind around highs and lows, the turning of the wind by friction, and inertial oscillations. |
| 2 | `overturning` | ocean | Stommel’s two-box model of the thermohaline circulation: temperature and salinity forcing, two stable states, hysteresis and collapse under freshwater input. |
| 2 | `carbonbox` | climate | A few-box carbon-cycle model (atmosphere, surface ocean, deep ocean, land) under an emission pulse or scenario: airborne fraction, uptake by the sinks and the long tail. |
| 2 | `icesheet` | climate | An ice-sheet cross-section from the perfectly plastic and Vialov profiles, a mass-balance gradient and the equilibrium-line altitude, and the response of ice volume to a change in climate. |
| 2 | `darcy` | hydro | Groundwater flow in a vertical section: hydraulic head contours and flow lines, the Darcy flux, and the cone of depression around a pumping well (Thiem steady state, Theis transient). |
| 3 | `hydrograph` | hydro | Rainfall–runoff with a unit hydrograph: convolve a storm with the unit response, separate baseflow, and compare catchments. |
| 3 | `returnperiod` | hydro | Return periods and exceedance probabilities: a Gumbel or GEV fit to annual maxima, and the chance of at least one exceedance in n years. |
| 3 | `sealevel` | ocean | A sea-level budget as stacked contributions — thermal expansion, glaciers, Greenland, Antarctica, land water — against the observed rise, from a fixed, dated table. |
| 3 | `tides` | ocean | The equilibrium tide raised by the Moon and the Sun: spring and neap tides, and diurnal and semidiurnal tides as the declination changes. |
| 3 | `worldmap` | maps | A world map layer for plate boundaries, earthquake epicentres, climate zones or data points shipped with the figure, drawn with D3 (`assets/vendor/d3.min.js`) and TopoJSON. Copy `../peptides/assets/vendor/topojson.min.js` and `../peptides/assets/geo/countries-110m.json` (world-atlas, Natural Earth data) into this atlas; they are already listed in the repository’s `THIRD-PARTY-NOTICES.md`. |
