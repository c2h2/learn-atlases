# EE Atlas — content guide

EE Atlas (`/learn/ee/`) teaches the undergraduate electrical and electronic engineering curriculum
in depth. Every chapter is a long, self-contained lesson in the style of a very good textbook:
motivation and physical intuition first, then precise definitions, laws and theorems with their
derivations, many fully worked examples and design problems, interactive figures, quick checks,
and graded exercises with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
```

The curriculum (22 courses, 182 chapters in seven areas: circuits, electronics, digital, signals,
electromagnetics, power, control) is fixed in the `course.json` files. **Do not rename, add,
remove or reorder courses or chapters**, because lessons and the map link to them.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters in practice, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Analyse…", "Design…", "Derive…", "Simulate…"). |
| `history` | 5–10 events `{"year": 1827, "title": "…", "detail": "1–2 sentences", "people": ["Georg Ohm"]}` in chronological order. Facts must be accurate (patents, papers, first demonstrations). |
| `references` | 4–8 books `{"title", "authors", "year", "note"}` — standard textbooks students actually use, for example Alexander & Sadiku, Nilsson & Riedel, Harris & Harris, Oppenheim & Willsky, Oppenheim & Schafer, Hayt & Buck, Ulaby, Pozar, Streetman & Banerjee, Sedra & Smith, Razavi, Horowitz & Hill, Rabaey, Weste & Harris, Patterson & Hennessy, Nise, Franklin–Powell–Emami-Naeini, Åström & Murray, Lathi, Haykin, Proakis & Salehi, Papoulis, Cover & Thomas, Lin & Costello, Fitzgerald & Kingsley, Chapman, Erickson & Maksimović, Mohan, Grainger & Stevenson, Glover–Sarma–Overbye, Kundur, Saleh & Teich, Agrawal, Ott. `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`). Keep titles plain text: no `$…$`
(use Unicode such as Ω, μ, ω, φ, √ if needed).

The timeline (`data/milestones.json`) holds field-wide milestones `{"year", "title", "detail",
"people", "area"}` — about 30 events from Volta's pile to modern wireless systems, `area` being one
of the seven area keys. Course-specific events belong in each `course.json`.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (formulas count as words). This is "very detailed": a
  student should be able to learn the topic from this page alone.
- **Definitions, laws and theorems** as numbered blocks (≥ 3 in total). Derive every result that
  is derived in a standard undergraduate course (Thévenin's theorem, the ideal diode equation, the
  sampling theorem, the Nyquist criterion, the swing equation …); state physical assumptions and
  where a model stops being valid. If a derivation is beyond the course, give a sketch and say
  where to find it.
- **≥ 4 worked examples** (`:::example` with a `:::solution`), from routine to subtle, every step
  and every unit shown. Include at least one design example (choose component values to meet a
  specification) where the topic allows.
- **≥ 1 interactive figure** (`:::widget`, see §6) — 2 or 3 is better — each with a caption that
  tells the reader what to try and what to notice.
- **≥ 1 quick check** (`:::quiz`) — 2–3 spread through the lesson.
- **≥ 1 `:::warning`** (common mistake: sign conventions, peak versus RMS, dB of power versus
  voltage, units …), and `:::intuition`, `:::remark`, `:::application` as useful.
- **One `:::history` block**: accurate names and dates, no invented quotes.
- **A `:::summary` block** ("Key takeaways", 5–8 bullets) just before the exercises.
- **`## Exercises` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and
  2+ challenging (`level=3`, including at least one derivation or design). **Every exercise has a
  complete `:::solution`**; add a `:::hint` for harder ones. When the answer is a single number,
  add `check="…"` in SI base units without the unit (see §5.4).

Suggested shape (adapt to the topic):

```
(intro paragraphs, no heading: motivation, a real device or system, maybe a figure)
## <first idea>            definitions and models, intuition, first examples
## <second idea>           laws and derivations, worked examples, figure, quick check
## …                       3–6 main sections in total
## Design and practice      optional: component choices, tolerances, real-world limits
## Where this leads         short: later chapters/courses that build on this one (with links)
:::summary
## Exercises
```

## 4. Writing style

- Audience: undergraduates who have seen the prerequisite chapters and first-year calculus,
  linear algebra and physics (link to Maths Atlas, `/learn/maths/`, with ordinary Markdown links
  when a mathematical tool is needed). Explain ideas from scratch, motivate before formalising,
  then be exact. Show the reasoning, not just results.
- Voice: "we" for shared reasoning, "you" for instructions. Friendly, precise, unhurried.
- **British spelling** (analyse, modelling, behaviour, centre, fibre, optimise), but standard
  engineering terms as they are (program, disk).
- Sentence case for headings. Define a term the first time it is used (bold it: `**impedance**`).
- Original text only — never copy textbooks. Use standard notation (as in the main references).
- **Correctness is non-negotiable.** Verify every number in examples and solutions with `python3`
  (numpy, scipy, sympy are installed): solve circuits with nodal analysis in numpy, check transfer
  functions and responses with `scipy.signal`, simulate transients with `scipy.integrate`. Units
  and orders of magnitude must be realistic (resistor values, supply voltages, frequencies).

## 5. Markup reference

### 5.1 Blocks

```
## Section heading {#optional-id}
### Subsection

Paragraph text with $inline$ maths, **bold**, *italic*, `code`, [a link](https://example.org).

$$
v(t) = V_m\cos(\omega t + \phi)
$$ {#eq-sinusoid}

- bullet list item (continuation lines indented by two spaces)
1. numbered item

| $f$ | $\lvert H(j\omega)\rvert$ |
|---|---|
| $1\,\mathrm{kHz}$ | $0.707$ |

> quotation

```verilog
code shown verbatim (Verilog, C, Python …)
```
```

Display maths: `$$` on its own line, the formula, `$$` on its own line (or `$$ … $$` on one
line). Add `{#eq-name}` after the closing `$$` to number the equation and refer to it.
**No blank lines inside `$$ … $$`.** For multi-line work use `\begin{aligned} … \end{aligned}`.

### 5.2 Containers (`:::`)

```
::: definition Impedance {#def-impedance}
The **impedance** of a two-terminal element is …
:::

::: theorem Thévenin's theorem {#thm-thevenin}
Statement…
:::

::: proof
Derivation… (the ∎ is added automatically)
:::

::: example A voltage divider with a load {#ex-loaded-divider}
Problem statement…
::: solution
Every step…
:::
:::
```

| kind | use |
|---|---|
| `definition`, `theorem`, `lemma`, `proposition`, `corollary`, `axiom`, `algorithm` | numbered together (Theorem 3.2, Definition 3.3 …) and listed in the site-wide index. Physical laws (Kirchhoff's laws, Faraday's law) go in `theorem` blocks named after the law; design procedures in `algorithm`. |
| `proof` | the derivation of the result above it; `{collapsed}` for long ones. |
| `example` | numbered separately; problem plus a nested `solution` (shown open). |
| `exercise` | attributes `level=1|2|3`, optional `check="…"`; statement, optional `hint`, required `solution`, optional `answer`. |
| `quiz` | a question, then items `[x]` (correct) / `[ ]`, then a nested `solution`. |
| `remark`, `note`, `warning`, `intuition`, `application`, `history`, `summary` | as in Maths Atlas. `application` = real devices and systems. |

Containers nest. Every `:::kind` line needs a matching bare `:::` line. Attributes go in `{…}` at
the end of the opening line: `#id`, `level=2`, `check="…"`, `collapsed`.

### 5.3 References

- `[[#thm-thevenin]]` → "Theorem 3.2" in this lesson; `[[#eq-sinusoid]]` → "(3.1)".
- `[[circuits-1/network-theorems]]` → link titled with the chapter title (any chapter).
- `[[circuits-1/network-theorems#thm-thevenin]]` → a numbered block in another lesson. **Only use
  anchors you created yourself**; for other courses link the chapter.
- `[[signals-systems]]` → a course page; `[[target|custom text]]` changes the link text.

Unresolved references are errors. Give ids to every important definition, theorem and equation
(`def-…`, `thm-…`, `eq-…`, `ex-…`), short and stable (they are part of the URL).

### 5.4 Answer checks

`check="…"` holds the exact value in the expression language of §6.2, e.g. `check="2.5"`,
`check="1/(2*pi*1000*1e-6)"`, `check="20*log10(2)"`. Use SI base units (volts, ohms, hertz,
seconds) and say in the question which unit the answer is in. The reader's answer is compared
numerically. Only use it when the whole answer is one number.

### 5.5 Notation (KaTeX)

- Imaginary unit **$j$** (never $i$, which is current). Phasors in bold: $\mathbf{V}$, $\mathbf{I}$;
  impedance $Z = R + jX$; polar form $10\angle 30^\circ$ (`10\angle 30^\circ`).
- Time functions lower case ($v(t)$, $i_L(t)$), DC and phasor quantities upper case ($V_{DD}$,
  $\mathbf{I}$), Laplace transforms $V(s)$, continuous-time Fourier transforms $X(j\omega)$,
  discrete-time Fourier transforms $X(e^{j\omega})$, $z$-transforms $X(z)$.
- Units upright with a thin space: `$4.7\,\mathrm{k\Omega}$`, `$10\,\mathrm{\mu F}$`,
  `$50\,\mathrm{Hz}$`, `$3\,\mathrm{dB}$`. RMS values are stated as such.
- Transistors: $V_{GS}$, $V_{th}$, $i_D$, $g_m$, $r_o$ (MOSFET); $V_{BE}$, $I_C$, $\beta$, $r_\pi$
  (BJT); thermal voltage $V_T$. Logic: $\overline{A}$, $A\cdot B$ or $AB$, $A + B$, $A\oplus B$.
- Site macros (data/macros.json) are those of Maths Atlas: `\R \C`, `\abs{x}`, `\norm{v}`,
  `\Prob \E \Var`, `\dd`, `\deriv{f}{x}`, `\pdv{f}{x}`, `\curl \divg`, `\T` …
- Not supported: `\label`, `\ref`, `\begin{equation}`, `\newcommand`, `\def`, TikZ, circuitikz.

## 6. Interactive figures

```
::: widget phaseplane
matrix: 0, 1; -4, -1
caption: A series RLC circuit as a linear system. Increase the resistance until the spiral becomes a node: that is critical damping.
:::
```

The available figure types, their keys and examples are in `data/widgets.json`; try each one at
`/learn/ee/lab.php?w=<type>`. Unknown types or keys are build errors. Inherited from Maths Atlas:
function plots, parametric curves (Lissajous figures), the unit circle (sinusoids), slope fields,
phase planes and ODE solvers (transients), complex-plane arithmetic and complex maps (phasors,
Möbius maps), contour integrals and winding numbers (Nyquist), Fourier series, the heat and wave
equations (transmission lines), vector fields, contours and surfaces (fields and potentials),
probability distributions, the CLT, Monte Carlo, Markov chains, hypothesis tests (detection),
regression, truth tables, graphs, modular arithmetic, row reduction and iterative solvers.

EE-specific figure types — circuit schematics, Bode and Nyquist plots, pole–zero and root-locus
plots, phasor diagrams, filters, sampling and aliasing, convolution, the Smith chart, standing
waves, eye diagrams and constellations, logic timing, transistor characteristics, converter
waveforms and three-phase phasors — are planned in `tools/WIDGET_GUIDE.md`. Use a type only once
it is in the catalogue; until a schematic type exists, describe each circuit precisely in words
(element values and connections) or with a table of branches.

### 6.1 Values

`num` values accept constant expressions (`pi/2`, `sqrt(2)`, `1e-3`); `range` is `min, max`;
`points` is `x,y; x,y`; `matrix` is `a,b; c,d`; `list` is separated by `;`; `sliders` is
`R=1:0.1:10:0.1; C=1e-6:1e-7:1e-5` (name=value:min:max:step) — slider names can be used in the
figure's expressions.

### 6.2 Expression language (figures and `check`)

`+ - * / ^`, parentheses, implicit multiplication (`2x`, `3(x+1)`), `if(cond, a, b)`. Constants
`pi e tau phi`; `i` in complex figures. Functions **need parentheses**: `sin(x)`. Available:
`sin cos tan asin acos atan atan2 sinh cosh tanh exp ln log log10 log2 sqrt abs sign floor ceil
round min max mod heaviside sinc clamp sum(expr, k, from, to) re im conj arg` and more (see
Maths Atlas `tools/CONTENT_GUIDE.md` §6.2).

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/ee
bash tools/check.sh <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, checks and references, and prints a
depth table per lesson. Fix every `ERROR`; depth `warn`ings must be gone for finished lessons.
Preview a lesson at `http://f.g77k.com/learn/ee/lesson.php?c=<course>&l=<chapter>` (from this
machine: `curl --resolve f.g77k.com:80:127.0.0.1 …`, or `node tools/shot.js "lesson.php?c=…&l=…"
out.png` for a screenshot). Read your rendered lesson at least once.
