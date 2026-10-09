# Chemistry Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js`.
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the Chemistry catalogue keeps the 18 types useful here. Chemistry-specific types
still have to be built — see the plan at the end.

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

Every type has a live page: `http://f.g77k.com/learn/chemistry/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/chemistry
node tools/shot.js "lab.php?w=plot" /tmp/.../plot.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=plot" /tmp/.../plot-dark.png --dark
node tools/shot.js "lab.php?w=plot&cfg=f%3A%20exp(-x%5E2)" /tmp/.../gauss.png
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.


## Planned chemistry figure types

None of these exists yet. Build them in new group files (`assets/js/widgets/molecules.js`,
`reactions.js`, `spectra.js`, `analysis.js`, `solids.js`), add each to `data/widgets.json` with keys,
defaults, `zh`/`zh_desc` and an `example`, give each new group file a label in `$GROUPS` in
`lab.php` (and its Chinese in `inc/lang/zh.php`), put figure strings through `MA.t` (Chinese in
`inc/lang/zh-figures.php`), and test every type on its Lab page. Everything runs in the browser on
small, fixed data (a built-in table of molecules, spectra, lattices) — no network calls, no
chemistry web services.

For true 3D molecular graphics, 3Dmol.js (BSD-3-Clause) is already vendored in this repository at
`/learn/peptides/assets/vendor/3Dmol-min.js`; copy it into `assets/vendor/` (and list it in the root
`THIRD-PARTY-NOTICES.md`) rather than loading it from a CDN. A small canvas renderer in the style of
the `surface` figure (rotation by drag, painter's algorithm, Lambert shading) may be enough for
ball-and-stick models and orbital lobes.

| priority | type | file | what it shows |
|---|---|---|---|
| 1 | `molecule` | molecules | A rotatable 3D molecule from a built-in library (ball-and-stick or space-filling), with bond lengths and angles on hover and optional dipole arrow. |
| 1 | `vsepr` | molecules | A central atom with a chosen number of bonding pairs and lone pairs: the electron-domain and molecular geometries, ideal angles and polarity. |
| 1 | `orbital` | molecules | Hydrogen-like orbitals (s, p, d, f) as lobes or density slices, with the radial wavefunction and radial distribution function; n, l and m selectable. |
| 1 | `mo-diagram` | molecules | Molecular-orbital energy diagrams for homonuclear and heteronuclear diatomics (s–p mixing on or off): fill electrons, read bond order and magnetism. |
| 1 | `titration` | analysis | pH against added volume for strong and weak, mono- and polyprotic acids and bases: equivalence points, buffer regions, half-equivalence pH = pKa and indicator ranges. |
| 1 | `reaction-profile` | reactions | Energy against reaction coordinate with reactants, transition states and intermediates; catalysed and uncatalysed paths; ΔH and activation energies. |
| 1 | `kinetics` | reactions | Concentrations against time for a set of elementary steps (A → B → C, reversible, parallel, pre-equilibrium), with the steady-state approximation for comparison. |
| 2 | `equilibrium` | reactions | Le Chatelier explorer: an equilibrium mixture responds to added species, pressure and temperature; Q against K and the ICE-table solution. |
| 2 | `maxwell-boltzmann` | reactions | Speed and energy distributions for chosen gases and temperatures; the fraction of collisions above an activation energy. |
| 2 | `phase-diagram` | solids | One-component (water, CO₂) and binary (liquid–vapour, eutectic) phase diagrams with a movable state point, tie lines and the lever rule. |
| 2 | `particle-box` | molecules | Particle in a box, harmonic oscillator and rigid rotor: energy levels, wavefunctions, probability densities and transitions. |
| 2 | `nmr` | spectra | ¹H NMR multiplets built from chemical shifts and coupling constants (n + 1 rule, coupling trees, second-order roofing at low field). |
| 2 | `ir-ms` | spectra | Infrared spectra assembled from group frequencies, and mass-spectrum isotope patterns for Cl, Br, S and C counts. |
| 2 | `beer-lambert` | analysis | Absorbance against concentration and path length, a calibration line with unknowns, and deviations from linearity (stray light, chemical equilibria). |
| 2 | `crystal` | solids | Unit cells (simple cubic, bcc, fcc, hcp, NaCl, CsCl, fluorite, perovskite): coordination numbers, packing fractions and Miller planes. |
| 2 | `bragg` | solids | Bragg diffraction from lattice planes, and the powder pattern of a cubic lattice with its systematic absences. |
| 2 | `galvanic-cell` | reactions | A galvanic or electrolytic cell from chosen half-cells: standard and Nernst potentials, electron and ion flow, and ΔG. |
| 3 | `mechanism` | reactions | A curly-arrow mechanism stepper: skeletal structures with electron-pushing arrows, advanced step by step (SN1, SN2, E2, addition, acyl substitution …). |
| 3 | `huckel` | molecules | Hückel π-orbital energies and coefficients for chains and rings (ethene to benzene, cyclic polyenes), delocalisation energy and aromaticity. |
| 3 | `crystal-field` | molecules | d-orbital splitting in octahedral, tetrahedral and square-planar fields: high- and low-spin filling, CFSE and spin-only magnetic moment. |
| 3 | `chromatogram` | analysis | A chromatographic separation: retention times, band broadening, plate number and resolution as column and conditions change. |
| 3 | `polymer-mass` | solids | Molar-mass distributions from step-growth and chain-growth polymerisation; Mn, Mw and dispersity against conversion. |
