# Physics Atlas — content guide

Physics Atlas (`/learn/physics/`) teaches the undergraduate physics curriculum in depth. Every
chapter is a long, self-contained lesson in the style of a very good textbook: motivation and
intuition first, then precise definitions, laws with derivations, many fully worked
examples, interactive figures, quick checks, and graded exercises with full solutions.

Reference lesson: `content/en/mechanics/motion-1d.md`. Match its depth, tone and markup.
The rules below are the same engine as the maths atlas.

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
```

The curriculum (18 courses, 115 chapters) is fixed in the `course.json` files. **Do not rename,
add, remove or reorder courses or chapters**, because other lessons link to them.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Compute…", "Prove…", "Explain…"). |
| `history` | 5–10 events `{"year": 1821, "title": "…", "detail": "1–2 sentences", "people": ["Augustin-Louis Cauchy"]}` in chronological order. Years before 1 AD are negative (−300 = 300 BC). Facts must be accurate. |
| `references` | 4–8 books or notes `{"title", "authors", "year", "note"}` — standard textbooks students actually use (e.g. Spivak, Stewart, Strang, Axler, Abbott, Rudin, Dummit & Foote, Ross, Boyce & DiPrima, Needham, Munkres, do Carmo). `note` says what each is good for. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (prerequisite chapters as `"course/chapter"`). Keep titles plain text: no `$…$`
(use Unicode such as ε, δ, ℝ, π, ∑, √ if needed).

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (formulas count as words). This is "very detailed": a
  student should be able to learn the topic from this page alone.
- **Definitions and theorems** as numbered blocks (≥ 3 in total). Prove every result that is
  proved in a standard undergraduate course; if a proof is beyond the course, give a proof sketch
  and say where the full proof can be found.
- **≥ 4 worked examples** (`:::example` with a `:::solution`), from routine to subtle, every step shown.
- **≥ 1 interactive figure** (`:::widget`, see §6) — 2 or 3 is better — each with a caption that
  tells the reader what to try and what to notice.
- **≥ 1 quick check** (`:::quiz`) — 2–3 spread through the lesson.
- **≥ 1 `:::warning`** (common mistake), and `:::intuition`, `:::remark`, `:::application` as useful.
- **One `:::history` block**: accurate names and dates, no invented quotes.
- **A `:::summary` block** ("Key takeaways", 5–8 bullets) just before the exercises.
- **`## Exercises` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and
  2+ challenging (`level=3`, including at least one proof). **Every exercise has a complete
  `:::solution`**; add a `:::hint` for harder ones. When the answer is a single number, add
  `check="…"` so readers can check their answer (see §5.4).

Suggested shape (adapt to the topic):

```
(intro paragraphs, no heading: motivation, a concrete question, maybe a figure)
## <first idea>            definitions, intuition, first examples
## <second idea>           theorems + proofs, worked examples, figure, quick check
## …                       3–6 main sections in total
## Common pitfalls          optional section if :::warning blocks are not enough
## Where this leads         short: later chapters/courses that build on this one (with links)
:::summary
## Exercises
```

## 4. Writing style

- Audience: undergraduates who have seen the prerequisite chapters. Explain ideas from scratch,
  motivate before formalising, then be fully rigorous. Show the reasoning, not just results.
- Voice: "we" for shared reasoning, "you" for instructions. Friendly, precise, unhurried. Avoid
  filler and avoid "obviously", "clearly", "trivially" unless it really is a one-liner.
- **British spelling** (colour, centre, behaviour, analyse, modelling). Take $g = 9.80\,\mathrm{m/s^2}$ unless a problem says otherwise. Constants, when needed: $G = 6.67430\times 10^{-11}$, $c = 2.99792458\times 10^{8}$. The first law in later courses uses $\Delta U = Q + W$ with work done *on* the system positive. In mechanics, work done *by* the force in the work–energy theorem is $W_\mathrm{net} = \Delta K$.
- Sentence case for headings. Define a term the first time it is used (bold it: `**limit**`).
- Original text only — never copy textbooks. Use standard notation (as in the main references).
- **Correctness is non-negotiable.** Verify every computation in examples and solutions — use
  `python3` with sympy/numpy/scipy (installed) for anything non-trivial. Check that each proof
  proves exactly the stated result, and that theorem hypotheses are complete.

## 5. Markup reference

### 5.1 Blocks

```
## Section heading {#optional-id}
### Subsection

Paragraph text with $inline$ maths, **bold**, *italic*, `code`, [a link](https://example.org).

$$
\int_a^b f(x)\,dx = F(b) - F(a)
$$ {#eq-ftc}

- bullet list item (continuation lines indented by two spaces)
  - nested item
1. numbered item

| $x$ | $f(x)$ |
|---|---|
| $1$ | $2$ |

> quotation

```python
code shown verbatim
```
```

Display maths: `$$` on its own line, the formula, `$$` on its own line (or `$$ … $$` on one
line). Add `{#eq-name}` after the closing `$$` to number the equation and refer to it.
**No blank lines inside `$$ … $$`.** For multi-line work use `\begin{aligned} … \end{aligned}`
with `&` and `\\`; for cases use `\begin{cases} … \end{cases}`.

### 5.2 Containers (`:::`)

```
::: definition Continuity {#def-continuous}
A function $f$ is **continuous at** $a$ if …
:::

::: theorem Intermediate value theorem {#thm-ivt}
Statement…
:::

::: proof
Proof text… (the ∎ is added automatically)
:::

::: example Title of the example {#ex-squeeze}
Problem statement…
::: solution
Every step…
:::
:::
```

Kinds and how they render:

| kind | use |
|---|---|
| `definition`, `theorem`, `lemma`, `proposition`, `corollary`, `axiom`, `algorithm` | numbered together (Theorem 3.2, Definition 3.3 …); listed in the site-wide theorem index with their statement. Put the name after the kind; omit for unnamed results. |
| `proof` | follows the result it proves; open by default (`{collapsed}` to close long proofs). |
| `example` | numbered separately (Example 3.1); contains the problem and a nested `solution` (shown open). |
| `exercise` | numbered (Exercise 3.1); attributes `level=1|2|3`, optional `check="…"`; contains the statement, optional `hint`, required `solution`, optional `answer` (short final answer). Hints and solutions are collapsed. |
| `quiz` | quick check: a question, then a list whose items start with `[x]` (correct) or `[ ]`; then a nested `solution` with the explanation (shown after answering). Several `[x]` make it multiple-answer. |
| `remark`, `note` | asides and subtleties |
| `warning` | "Common mistake" — a typical error and why it is wrong |
| `intuition` | geometric or informal picture |
| `application` | uses outside pure maths (physics, statistics, computing, economics…) |
| `history` | historical note (once per lesson) |
| `summary` | "Key takeaways" bullet list |

Containers nest (solution inside example/exercise/quiz). Every `:::kind` line needs a matching
bare `:::` line. Attributes go in `{…}` at the end of the opening line: `#id`, `level=2`,
`check="pi/4"`, `collapsed`.

### 5.3 References

- `[[#thm-ivt]]` → "Theorem 3.2" linked to that block in this lesson (works for any `{#id}`,
  headings, equations `[[#eq-ftc]]` → "(3.1)").
- `[[calculus-1/continuity]]` → link titled with the chapter title (any chapter of any course).
- `[[calculus-1/continuity#thm-ivt]]` → "Theorem 3.2" in another lesson. **Only use anchors you
  created yourself** (same course or another course you are writing); for other courses link the
  chapter instead.
- `[[linear-algebra]]` → link to a course page.
- `[[target|custom text]]` changes the link text.

Unresolved references are errors. Give ids to every important definition, theorem and equation
(`def-…`, `thm-…`, `lem-…`, `eq-…`, `ex-…`), short and stable (they are part of the URL).

### 5.4 Answer checks

`check="…"` on an exercise holds the exact value in the expression language of §6.2, e.g.
`check="3/4"`, `check="2*sqrt(2)"`, `check="pi^2/6"`, `check="e - 1"`. The reader can type any
equivalent expression; it is compared numerically. Only use it when the whole answer is one number.

### 5.5 Maths conventions (KaTeX)

- KaTeX supports standard LaTeX maths (amsmath environments `aligned`, `cases`, `pmatrix`,
  `bmatrix`, `vmatrix`, `array`, `\operatorname`, `\mathbb`, `\mathcal`, `\boldsymbol` …).
  Not supported: `\label`, `\ref`, `\eqref`, `\begin{equation}`, `\newcommand`, `\def`,
  `\DeclareMathOperator`, TikZ, `\usepackage`. Use `{#eq-…}` and `[[#eq-…]]` instead of labels.
- Site macros (data/macros.json): `\R \N \Z \Q \C \F` (blackboard bold), `\Prob \E \Var \Cov \Corr`,
  `\abs{x}`, `\norm{v}`, `\inner{u}{v}`, `\set{x : x>0}`, `\dd` (upright d), `\deriv{f}{x}`,
  `\pdv{f}{x}`, `\eps` (ε), `\rank \tr \Span \sgn \Img \Res \Arg \Log \diag \proj \lcm \ord \Aut
  \Hom \id \supp \erf \curl \divg \Bin`, `\Normal` (𝒩), `\iid`, `\T` (transpose: `A\T`).
- Write `\,dx` before differentials, `\lvert x\rvert` or `\abs{x}` for absolute values, `\colon`
  for function arrows `f\colon A\to B`, `\varepsilon` (or `\eps`) not `\epsilon`.
- Words inside maths: `\text{if } x>0`. A literal dollar sign in text: `\$`.
- Keep inline maths short; put long formulas on their own lines.

## 6. Interactive figures

```
::: widget riemann
f: sin(x) + 1
a: 0
b: pi
n: 8
method: mid
caption: Increase $n$ and watch the error shrink — roughly like $1/n^2$ for midpoint sums.
:::
```

The available figure types, their keys and examples are in `data/widgets.json`; each one can be
tried live at `/learn/physics/lab.php?w=<type>`. Unknown types or keys are build errors. The mechanics figures are `vector`, `motion`, `projectile`, `incline`, `springenergy`, `collision`, `rolling`, `orbit` and `hydro` (see `data/widgets.json`). `plot`, `parametric`, `oscillator` and `slopefield` are also available.

### 6.1 Values

`num` values accept constant expressions (`pi/2`, `sqrt(2)`, `1e-3`); `range` is `min, max`;
`points` is `x,y; x,y`; `matrix` is `a,b; c,d` (rows separated by `;`); `list` is separated by
`;`; `sliders` is `a=1:-3:3:0.1; b=2:0:5` (name=value:min:max:step) — slider names can be used
in the figure's expressions.

### 6.2 Expression language (figures and `check`)

`+ - * / ^`, parentheses, implicit multiplication (`2x`, `3(x+1)`, `x y`), factorial `n!`,
comparisons for `if(cond, a, b)`. Constants `pi e tau phi`; `i` in complex figures.
Functions **need parentheses**: `sin(x)`, never `sin x`. Available: `sin cos tan sec csc cot
asin acos atan atan2 sinh cosh tanh asinh acosh atanh exp ln log (log(x) = ln x, log(x, b))
log10 log2 sqrt cbrt root(x,n) abs sign floor ceil round frac min max mod gamma fact binom erf
heaviside sinc clamp if sum(expr, k, from, to) prod(…) re im conj arg`.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/physics
php tools/check.php <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, checks and references, and prints a
depth table (words, numbered blocks, examples, exercises, figures, quizzes, proofs) per lesson.
Fix every `ERROR`; depth `warn`ings must be gone for finished lessons. Preview a lesson at
`http://f.g77k.com/learn/physics/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …`). Read your rendered lesson at least once.
