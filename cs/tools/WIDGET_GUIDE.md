# Computer Science Atlas — interactive figure guide

Figures are small JavaScript programs that turn a `:::widget <type>` block in a lesson into an
interactive diagram. Lessons are written by other people against the **catalogue**
`data/widgets.json`: every type, its keys, their types and defaults. Implement each type exactly
as catalogued; it is the contract.

Reference implementations: `plot` in `assets/js/widgets/calculus.js` (a plotted figure with
controls) and `graph` in `assets/js/widgets/discrete.js` (an algorithm run step by step, with play,
step and reset — the model for most computer-science figures). Read them and `assets/js/plot.js`
before writing anything. The engine and figure files are copied from Maths Atlas; the CS catalogue
keeps the 20 types useful here. Computer-science types still have to be built — see the plan at
the end.

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

Every type has a live page: `http://f.g77k.com/learn/cs/lab.php?w=<type>` (renders the
catalogue `example`; `&cfg=` with URL-encoded `key: value` lines tests other settings).
From this machine:

```
cd /var/www/f.g77k.com/learn/cs
node tools/shot.js "lab.php?w=graph" /tmp/.../graph.png                # prints JS errors + figure state
node tools/shot.js "lab.php?w=graph" /tmp/.../graph-dark.png --dark
node tools/shot.js "lab.php?w=graph&cfg=nodes%3A%20A%3B%20B%3B%20C%0Aedges%3A%20A-B%3B%20B-C%0Aalgorithm%3A%20bfs%0Astart%3A%20A" /tmp/.../bfs.png
node -e "require('./assets/js/expr.js')"                                  # expression engine in node
```

Look at every screenshot (light and dark), test several catalogue options, and fix all errors.
If a catalogue entry is unworkable, you may add optional keys (update `data/widgets.json`, keep
existing keys and defaults compatible) — report any change.

## Planned computer science figure types

None of these exists yet. Build them in new group files — `assets/js/widgets/algorithms.js`,
`automata.js`, `systems.js`, `networks.js`, `crypto.js`, `graphics.js` and `quantum.js` — add each
to `data/widgets.json` with keys, defaults, `zh`/`zh_desc` and an `example`, add a label for every
new group file to `$GROUPS` in `lab.php` (and its Chinese in `inc/lang/zh.php`), and test each type
on its Lab page. Everything runs in the browser on small, fixed or reader-entered data — no network
calls, no real systems. Algorithms run as **step-through animations** in the manner of `graph`:
precompute the list of frames, then drive them with the `player` helper in `discrete.js` (Reset,
Back, Play/Pause, Step — move it into `plot.js` as a shared `MA.ui` control once a second file
needs it); describe the current step in words in an `MA.ui.info` row, update counters
(comparisons, probes, faults, messages) live, and give the same result for the same input.

The existing `graph` type already animates BFS, DFS, Dijkstra, Prim, Kruskal, topological sort,
Euler circuits and greedy colouring; extend it with new `algorithm` values (strongly connected
components, Bellman–Ford, maximum flow, A* on a grid) rather than writing a second graph widget.

| priority | type | file | what it shows |
|---|---|---|---|
| 1 | `sorting` | algorithms | Insertion, selection, merge, quick and heap sort on a short array (typed or random): comparisons, swaps, the invariant after each step and the running counts. |
| 1 | `hashtable` | algorithms | Insertions into a hash table with separate chaining or open addressing (linear and quadratic probing, double hashing): collisions, probe sequences, load factor and resizing. |
| 1 | `bst` | algorithms | A binary search tree with search, insert and delete; switchable to AVL or red–black balancing with rotations animated and the height shown. |
| 1 | `heap` | algorithms | A binary heap as tree and array side by side: sift-up, sift-down, linear-time build-heap and heapsort. |
| 1 | `recursiontree` | algorithms | The recursion tree of $T(n) = aT(n/b) + f(n)$ with the cost of each level, the total and the case of the master theorem. |
| 1 | `dptable` | algorithms | A dynamic-programming table filled cell by cell (edit distance, longest common subsequence, 0–1 knapsack) with each cell's dependencies and the traceback. |
| 1 | `automaton` | automata | An editable DFA or NFA run on an input string step by step (sets of active states for an NFA), with the subset construction and minimisation. |
| 1 | `turing` | automata | A Turing machine with an editable transition table on a tape: step, run, halt or loop detection; examples such as binary increment and palindromes. |
| 2 | `btree` | algorithms | B+-tree insertion with node splits, search paths and range scans; height against number of keys for several fan-outs. |
| 2 | `minimax` | algorithms | A small game tree evaluated by minimax, then with alpha–beta pruning: values backed up and the branches pruned for each move ordering. |
| 2 | `cache` | systems | A direct-mapped or set-associative cache processing an address trace: hits and compulsory, capacity and conflict misses; block size, associativity and replacement policy. |
| 2 | `pagereplace` | systems | FIFO, LRU, clock and optimal page replacement on a reference string: frames over time, page faults and Bélády’s anomaly. |
| 2 | `scheduler` | systems | A Gantt chart for first-come first-served, shortest job first, round robin and a multilevel feedback queue, with turnaround and waiting times. |
| 2 | `slidingwindow` | networks | Go-back-N and selective repeat on a lossy link: packets and acknowledgements in flight, timeouts and retransmissions. |
| 2 | `tcp` | networks | The TCP congestion window over time — slow start, congestion avoidance, fast retransmit and recovery — and two AIMD flows converging to a fair share. |
| 2 | `routing` | networks | Distance-vector and link-state routing on an editable network: routing tables converging, link failures and count-to-infinity. |
| 2 | `rsa` | crypto | Toy RSA and Diffie–Hellman with small numbers: key generation, encryption and signing, and why such small parameters are insecure. |
| 3 | `raft` | networks | Raft leader election and log replication among five servers, with terms, votes, crashes and network partitions. |
| 3 | `rasteriser` | graphics | A triangle rasterised on a coarse pixel grid: edge functions, barycentric interpolation of colour and depth, and the depth buffer. |
| 3 | `raytracer` | graphics | A tiny ray tracer of a few spheres and a plane: one ray per pixel shown on demand, shadows, reflection depth and samples per pixel. |
| 3 | `qcircuit` | quantum | A circuit simulator for up to four qubits: gates placed on wires, the state vector after each column, the Bloch sphere of a single qubit and measurement statistics. |
