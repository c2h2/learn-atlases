# Economics & Finance Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot`, `riemann` and `cobweb` in `assets/js/widgets/calculus.js`.
Read them and `assets/js/plot.js` before writing anything. The engine and figure files are copied
from Maths Atlas; the economics catalogue keeps the 22 types useful here (function plots and
surplus, iteration and sequences, root finding, level curves and constraints, surfaces, numerical
optimisation, row reduction, differential equations and phase planes, Markov chains, probability
and simulation, inference and regression, graphs). Economics-specific types still have to be
built — see the plan at the end.

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

Economic diagrams put quantity on the horizontal axis and price on the vertical axis (Marshall's
convention), even though price is usually the independent variable in the algebra: plot inverse
demand and supply curves $p(q)$, and label axes in words ("Quantity", "Price") through `MA.t`.

For pixels (heat maps, 3D surfaces) use a `<canvas>` sized in device pixels
(`canvas.width = cssWidth * devicePixelRatio`), styled `width:100%`, inside `<div class="w-plot">`.
Overlay an `MA.Plot` (transparent background: `P.svg.style.background = 'transparent'`, absolutely
positioned) if you need axes or handles on top. Re-render canvases on `window` event `ma:theme`.

3D: reuse the small projection renderer of `surface` in `multivar.js` (rotation by drag,
orthographic or mild perspective, painter's algorithm for quads, simple Lambert shading).

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
every visible string (translated later in `inc/lang/zh-figures.php`); keep strings short and use
`%d`/`%s` for numbers.

## Visual and behavioural conventions

- Colours only from CSS variables so dark mode works: `var(--series-1..4)` for data,
  `var(--ink)`, `var(--ink-2)`, `var(--ink-3)` for neutral lines and text, `var(--accent)` for
  handles, `var(--good)`/`var(--bad)` for right/wrong, `var(--plot-bg)` for backgrounds,
  `var(--grid)`, `var(--rule)`. Area/region fills at opacity 0.12–0.2. Never hard-code hex colours.
  Use one colour consistently for each role across the atlas: demand `--series-1`, supply
  `--series-2`, consumer surplus a light fill of `--series-1`, producer surplus of `--series-2`,
  deadweight loss `--bad` at low opacity, tax revenue `--series-4`.
- Show numbers with `MA.fmt(v, sig)` (real minus sign, ∞). Money is shown as plain numbers with
  "units" or a currency code given by the author (`currency:` key), never hard-coded "$".
- Everything a reader can change should update immediately (input events), but keep each redraw
  fast (< ~16 ms typical): cache compiled functions, sample at sensible resolution, use canvas for
  > ~5,000 marks. Animations use `MA.anim` and must stop when finished; start paused if
  `anim.reduce` (reduced motion) is set.
- Randomised figures (auctions, simulated returns, regression data) use `MA.num.rng(seed)` so that
  a fresh page shows the same picture, plus a "New sample"/"Run again" button.
- Mobile: the SVG scales to the column width (≥ 320 px); controls wrap. Touch dragging works
  through pointer events (already in `P.handle`).
- Accessibility: meaningful `aria-label` on plots (`new MA.Plot(stage, { label })`), handles have
  keyboard support, result text goes in `MA.ui.info` rows (aria-live).
- Robustness: invalid or extreme inputs (division by zero, prices below zero, empty markets, NaN)
  must never throw from event handlers — clamp, skip non-finite points and show a short message.
- Figures illustrate models with made-up parameters. They never fetch market data, never show live
  prices and never present an output as a forecast or a recommendation.

## Testing

Every type has a live page: `http://f.g77k.com/learn/economics/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/economics
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann.png            # prints JS errors + figure state
node tools/shot.js "lab.php?w=riemann" /tmp/.../riemann-dark.png --dark
node tools/shot.js "lab.php?w=contour&cfg=f%3A%20x%5E0.5*y%5E0.5" /tmp/.../cd.png
node tools/labcheck.js [type …] [--dark]                                # every Lab page, figure states
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.

## Planned economics and finance figure types

None of these exists yet. Build them in new group files — `assets/js/widgets/markets.js`,
`games.js`, `macro.js`, `finance.js` and `data.js` — add each type to `data/widgets.json` with
`file`, keys, defaults, `zh`/`zh_desc` and an `example`, add the group to `$GROUPS` in `lab.php`
(with its Chinese label in `inc/lang/zh.php`), and test it on its Lab page. Everything runs in the
browser on small, fixed or seeded data — no network calls.

| priority | type | file | what it shows |
|---|---|---|---|
| 1 | `supplydemand` | markets | Linear or curved supply and demand with shifts, a per-unit tax or subsidy, and price floors and ceilings; consumer and producer surplus, tax revenue and deadweight loss shaded and reported. |
| 1 | `budgetchoice` | markets | Budget line and indifference curves for Cobb–Douglas, perfect-substitute, perfect-complement and quasi-linear preferences; the optimal bundle; a price change split into substitution and income effects. |
| 1 | `costcurves` | markets | Total, average, average variable and marginal cost from a cost function; the competitive firm's supply curve, shutdown and break-even prices. |
| 1 | `monopoly` | markets | Demand, marginal revenue and marginal cost; the monopoly price and quantity against the competitive outcome, the deadweight loss, and third-degree price discrimination between two markets. |
| 1 | `normalform` | games | Editable two-player bimatrix game: best responses marked, dominated strategies eliminated step by step, pure and mixed Nash equilibria computed. |
| 1 | `gametree` | games | Extensive-form game tree with payoffs and information sets; backward induction animated and the subgame-perfect equilibrium path highlighted. |
| 1 | `solow` | macro | Solow diagram (saving against break-even investment) and the time paths of capital, output and consumption per worker after changes in $s$, $n$, $g$ or $\delta$; the golden-rule saving rate. |
| 1 | `islm` | macro | IS–LM and AD–AS diagrams side by side; fiscal and monetary shocks move the curves and the economy adjusts from short-run to long-run equilibrium. |
| 1 | `npv` | finance | A cash-flow timeline with discounting: present values of each flow, NPV against the discount rate, the internal rate of return, annuities and perpetuities. |
| 2 | `bestresponse` | games | Best-response functions in continuous games — Cournot, Bertrand with differentiated products, Stackelberg — with the equilibrium and the iteration of best responses. |
| 2 | `auction` | games | Simulated first-price, second-price, English and Dutch auctions with independent private values: equilibrium bids, the distribution of revenue and revenue equivalence. |
| 2 | `matching` | games | Two-sided preference lists and the deferred-acceptance algorithm step by step; blocking pairs, proposer- and receiver-optimal stable matchings. |
| 2 | `ppf` | markets | Two-country Ricardian model: production possibility frontiers, autarky and world relative prices, specialisation and the gains from trade. |
| 2 | `phillips` | macro | Phillips curve with adaptive or rational expectations and a Taylor rule: paths of inflation, the output gap and the policy rate after demand and supply shocks. |
| 2 | `frontier` | finance | Mean–variance frontier for two to four assets with adjustable correlations; the tangency portfolio, the capital market line and the security market line. |
| 2 | `binomialtree` | finance | Multi-period binomial tree: underlying prices, risk-neutral probabilities, backward valuation of European and American options, and convergence to Black–Scholes as steps increase. |
| 2 | `blackscholes` | finance | Black–Scholes call and put values and the Greeks against the underlying price, volatility and time to maturity; payoff diagrams of spreads and combinations. |
| 2 | `lorenz` | data | Lorenz curve and Gini coefficient from income-quantile shares; the effect of a tax-and-transfer scheme. |
| 3 | `yieldcurve` | finance | Spot, forward and par curves bootstrapped from bond prices; duration and convexity of a bond under parallel shifts. |
| 3 | `ovb` | data | Seeded simulated data with a confounder: short and long regressions and the omitted-variable-bias formula. |
| 3 | `did` | data | Difference-in-differences with treated and control groups over time: the estimate under parallel trends and the bias when trends diverge. |
| 3 | `rdd` | data | Regression discontinuity: outcome against a running variable with a cut-off, local linear fits on each side and a bandwidth slider. |
