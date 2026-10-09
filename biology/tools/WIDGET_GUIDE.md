# Biology Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann`, `taylor` in `assets/js/widgets/calculus.js`.
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the Biology catalogue keeps the 18 types useful here. Biology-specific types
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

Every type has a live page: `http://f.g77k.com/learn/biology/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/biology
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann-dark.png --dark
node tools/shot.js "lab.php?w=riemann&cfg=f%3A%20x%5E2" /tmp/.../x2.png
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.


## Planned biology figure types

None of these exists yet. Build them in new group files (`assets/js/widgets/genetics.js`,
`molecular.js`, `population.js`, `physiology.js`), add each to `data/widgets.json` with keys,
defaults, `zh`/`zh_desc` and an `example`, and test it on its Lab page. Everything runs in the
browser on small, fixed data — no network calls, and no data about the reader leaves the page.

| priority | type | group file | what it shows |
|---|---|---|---|
| 1 | `punnett` | genetics | A cross drawn as a Punnett square: one or two loci, dominance, gametes, genotype and phenotype ratios, and the χ² of an observed count against them. |
| 1 | `pedigree` | genetics | A family tree the reader can edit: affected individuals, and the inheritance patterns (autosomal dominant and recessive, X-linked, mitochondrial) consistent with it. |
| 1 | `hardyweinberg` | population | Allele against genotype frequencies: the parabolas of the Hardy–Weinberg proportions, and what selection, drift, inbreeding or migration do to them. |
| 1 | `drift` | population | The Wright–Fisher model: replicate populations drifting to fixation, the effect of $N_e$, and the distribution of fixation times. |
| 1 | `selection` | population | Allele-frequency trajectories under selection: dominance, heterozygote advantage, mutation–selection balance and selection against a recessive. |
| 1 | `michaelis` | molecular | Enzyme kinetics: $v$ against $[S]$ with $K_\mathrm{m}$ and $V_\max$, the Lineweaver–Burk plot, and competitive, uncompetitive and non-competitive inhibition. |
| 1 | `popgrowth` | population | Exponential and logistic growth, a life table and age structure, harvesting, and time lags producing cycles and chaos. |
| 1 | `lotkavolterra` | population | Predator–prey and competition models: time series, the phase plane, isoclines and coexistence. |
| 1 | `codontable` | molecular | The central dogma on a short sequence: transcription, reading frames, the codon table, translation, and the effect of a point mutation or indel. |
| 2 | `membranepotential` | physiology | Ion concentrations and permeabilities to a membrane potential by the Nernst and Goldman equations, with an action potential from the Hodgkin–Huxley model. |
| 2 | `alignment` | molecular | Needleman–Wunsch and Smith–Waterman step by step: the scoring matrix filling in, the traceback, and the effect of gap penalties and substitution matrices. |
| 2 | `phylotree` | population | A distance matrix turned into a tree (UPGMA and neighbour joining), with rerooting, branch lengths and a molecular-clock scale. |
| 2 | `generegulation` | molecular | A small gene-regulatory circuit simulated live: repression and activation, a toggle switch, a feed-forward loop and an oscillator. |
| 2 | `photosynthesis` | physiology | Light- and CO₂-response curves of photosynthesis: light saturation, the compensation point, and the differences between C3, C4 and CAM plants. |
| 2 | `linkagemap` | genetics | Recombinant counts from a two- or three-point cross turned into map distances, with interference and the limit of 50 %. |
| 2 | `islandbiogeography` | population | Immigration and extinction curves against island area and distance, the equilibrium number of species, and species–area relationships. |
| 3 | `meiosis` | genetics | Chromosomes through mitosis and meiosis: independent assortment, crossing over, and how aneuploidy arises. |
| 3 | `allometry` | physiology | Log–log scaling of metabolic rate, lifespan and organ size against body mass, with fitted slopes and the comparison of exponents. |
| 3 | `epidemic` | population | An SIR model on a population or a contact network: the basic reproduction number, the epidemic curve and the herd-immunity threshold (conceptual model only). |
| 3 | `structure3d` | molecular | A small protein or nucleic-acid structure in three dimensions, with cartoon and stick views and a sequence ruler. 3Dmol.js is already vendored in `../peptides/assets/vendor` (BSD-3-Clause) and a bundled PDB file can be served from `data/`; keep the file small and local. |
| 3 | `sequencelogo` | molecular | A sequence logo and position-weight matrix from a small alignment, with information content per position and scoring of a new site. |
| 3 | `fluxbalance` | molecular | A toy metabolic network: stoichiometry, flux balance at steady state, and the effect of knocking out a reaction. |

Captions in lessons must describe what the figure actually draws, so check a new type against the
captions already written for it and fix whichever is wrong.
