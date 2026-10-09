# Economics & Finance Atlas — content guide

Economics & Finance Atlas (`/learn/economics/`) teaches the undergraduate economics and finance
curriculum in depth, from first principles to the frontier of the standard syllabus. Every chapter is
a long, self-contained lesson in the style of a very good textbook: motivation and intuition first,
then precise definitions, models with their assumptions stated, results with derivations or proofs,
many fully worked examples with numbers, interactive figures, quick checks, and graded exercises
with full solutions.

The site runs on the same engine as Maths Atlas (`/learn/maths/`). Its reference lesson,
`/var/www/f.g77k.com/learn/maths/content/en/calculus-1/limits.md`, shows the expected depth, tone
and markup: read it before writing.

**For education only — not investment or financial advice.** Every page of the atlas says so in
its footer, and the content must live up to it (see §4.2).

## 1. Files

```
content/en/<course>/course.json    course record (structure fixed — see §2)
content/en/<course>/<chapter>.md   one lesson per chapter, in the order listed in course.json
data/milestones.json               field-wide events for the timeline (see §2)
```

The curriculum — 25 courses and 220 chapters in seven areas (microeconomics, macroeconomics,
quantitative methods, games and markets, finance, global economy and history, policy and
behaviour) over four years of study — is fixed in the `course.json` files. **Do not rename, add,
remove or reorder courses or chapters**: other lessons and the map link to them.

**Every lesson is written by hand to the standard of this guide.** Never generate lessons, course
fields or timeline entries from templates, word lists or scripts, and never pad a page to reach the
depth targets. A chapter is either written properly or it stays "to be written" (a missing file
is shown that way automatically). Placeholder text is worse than no text.

## 2. course.json — what to fill in

The skeleton already has `slug`, `title`, `full_title`, `area`, `level`, `order`, `tagline`,
`summary`, `prerequisites`, `chapters[].{slug,title,summary,requires}` and `next`. You complete:

| field | content |
|---|---|
| `overview` | 2–4 paragraphs: what the subject is about, why it matters, how the course is organised, what makes it hard and how to approach it. Inline markup and `$math$` allowed. |
| `outcomes` | 6–10 learning outcomes, each a sentence starting with a verb ("Derive…", "Estimate…", "Explain…", "Evaluate…"). |
| `history` | 5–10 events `{"year": 1776, "title": "…", "detail": "1–2 sentences", "people": ["Adam Smith"]}` in chronological order, each tied to a publication, policy or event whose date you have verified. |
| `references` | 4–8 books `{"title", "authors", "year", "note"}` that students actually use — for example Mankiw (*Principles*, *Macroeconomics*), Varian (*Intermediate Microeconomics*), Mas-Colell, Whinston & Green (for orientation at the top end), Romer (*Advanced Macroeconomics*), Blanchard, Wooldridge (*Introductory Econometrics*), Angrist & Pischke, Osborne (*An Introduction to Game Theory*), Tirole or Belleflamme & Peitz, Berk & DeMarzo, Bodie, Kane & Marcus, Hull, Krugman, Obstfeld & Melitz, Ray (*Development Economics*), Gruber (*Public Finance and Public Policy*), Borjas (*Labor Economics*), Thaler and Kahneman, Perman et al., Milgrom (*Putting Auction Theory to Work*), Hamilton and Tsay. `note` says what each is good for. Give the edition year you checked. |

You may polish `tagline`, `summary` and the chapter `summary` strings, and adjust a chapter's
`requires` list (earlier chapters of the same course, or chapters of prerequisite courses, as
`"course/chapter"`). Keep titles plain text: no `$…$` (use Unicode such as α, β, π, Σ if needed).

The timeline (`data/milestones.json`) holds about 30 field-wide milestones `{"year", "title",
"detail", "people", "area"}`, `area` being one of the seven area keys (`micro`, `macro`, `methods`,
`strategy`, `finance`, `global`, `policy`) — for example Smith's *Wealth of Nations* (1776),
Ricardo's *Principles* (1817), Cournot (1838), Walras (1874), Marshall (1890), Keynes's *General
Theory* (1936), von Neumann and Morgenstern (1944), Nash (1950), Markowitz (1952), Arrow and Debreu
(1954), Solow (1956), Modigliani and Miller (1958), Akerlof (1970), Black, Scholes and Merton (1973),
Kahneman and Tversky (1979). Check every year against a primary source before using it.

## 3. Depth targets for every lesson (checked by tools/check.php)

- **3,000–5,500 words** of explanation (formulas count as words; `check.php` warns below 2,500).
  A student should be able to learn the topic from this page alone.
- **Definitions and results** as numbered blocks (≥ 3 in total): definitions of concepts and models,
  propositions and theorems with derivations or proofs (Roy's identity, the Slutsky equation, the
  first welfare theorem, the Gauss–Markov theorem, Modigliani–Miller, put–call parity …). State
  every assumption. Mark empirical regularities as such — a stylised fact or an estimated
  elasticity is not a theorem — and give the evidence behind them.
- **≥ 4 worked examples** (`:::example` with a `:::solution`) with numbers, from routine to subtle:
  an equilibrium price and quantity, a deadweight loss, a Lagrangian solved step by step, a regression
  estimated by hand, a net present value, an option priced on a two-step tree …
- **≥ 1 interactive figure** (`:::widget`, see §6) — 2 or 3 is better — each with a caption that
  tells the reader what to try and what to notice.
- **≥ 1 quick check** (`:::quiz`) — 2–3 spread through the lesson.
- **≥ 1 `:::warning`** (common mistake: confusing a shift of a curve with a movement along it,
  nominal with real, correlation with causation, accounting with economic profit …), and
  `:::intuition`, `:::remark`, `:::application` as useful.
- **One `:::history` block**: accurate names and dates, no invented quotes.
- **A `:::summary` block** ("Key takeaways", 5–8 bullets) just before the exercises.
- **`## Exercises` with ≥ 8 exercises**: about 3 routine (`level=1`), 3 standard (`level=2`) and
  2+ challenging (`level=3`, including a derivation or a short data exercise). **Every exercise has
  a complete `:::solution`**; add a `:::hint` for harder ones. When the answer is a single number,
  add `check="…"` and say which number to enter ("(Enter the equilibrium price.)").

Suggested shape (adapt to the topic):

```
(intro paragraphs, no heading: a concrete economic question, why it matters, maybe a figure)
## <first idea>            definitions, the model and its assumptions, first examples
## <second idea>           results with derivations, worked examples, figure, quick check
## …                       3–6 main sections in total
## Evidence                what the data say, with sources (where the chapter makes empirical claims)
## Where this leads        short: later chapters and courses that build on this one (with links)
:::summary
## Exercises
```

## 4. Writing style, accuracy and neutrality

### 4.1 Style

- Audience: undergraduates who have done the prerequisite chapters. Explain ideas from scratch,
  motivate before formalising, then be exact. Show the reasoning, not just the results.
- Voice: "we" for shared reasoning, "you" for instructions. Friendly, precise, unhurried. Avoid
  filler and avoid "obviously" and "clearly".
- **British spelling** (behaviour, labour, optimise, modelling, programme, organisation) except in
  names, titles and quotations ("Bureau of Labor Statistics").
- Sentence case for headings. Define a term the first time it is used and bold it (`**elasticity**`).
- Original text only — never copy textbooks. Use standard notation (§5.1).
- Mathematics tools are taught in [[mathematical-economics]]; probability, statistics and linear
  algebra in full in the Maths Atlas. Link there with ordinary links, e.g.
  `[hypothesis tests](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)` or
  `[least squares](/learn/maths/lesson.php?c=linear-algebra&l=least-squares)`; `[[…]]` references
  only work inside this atlas.

### 4.2 For education only — not investment or financial advice

- Explain how markets, instruments and models work. **Never recommend** a security, fund, asset
  class, trading strategy, tax scheme, pension or mortgage choice, and never use buy/sell/hold
  language or imply that a model predicts future prices.
- Worked examples use **illustrative numbers** and fictional firms ("Firm A", "a bond paying 5% a
  year"). When real data are shown — historical returns, a yield curve, an index — they illustrate
  a concept, carry their source and date, and are not a forecast.
- Strategies such as hedging or portfolio diversification are taught as theory with stated
  assumptions and limitations; say plainly what the model leaves out (transaction costs, taxes,
  model risk, liquidity).
- No personal financial planning ("you should save…", "you should invest…"). Exercises are about
  model agents, not the reader's own money.

### 4.3 Neutrality

- Economics has live disputes — the effects of minimum wages, the size of fiscal multipliers, the
  gains and costs of trade, the causes of the Great Depression and of 2008, the merits of industrial
  policy. Present the competing theories and the evidence on each side even-handedly, say where
  there is a broad consensus and where there is not, and attribute views to the authors who hold them.
- Present schools of thought (classical, Keynesian, monetarist, new classical, New Keynesian,
  Austrian, post-Keynesian, institutional, Marxian where historically relevant) on their own terms,
  without caricature.
- **Separate positive from normative claims.** State what a model or study finds; when discussing
  what policy should do, set out the trade-offs and the value judgements involved instead of
  concluding for the reader.
- No partisan framing, no slogans, and no evaluative comments on current politicians or parties.
  Describe the policies of countries and organisations factually.

### 4.4 Data and evidence

- **Every statistic is sourced and dated**: World Bank (World Development Indicators), IMF (World
  Economic Outlook, International Financial Statistics), OECD, BIS, national statistical offices,
  central banks, FRED, the Penn World Table, the Maddison Project. Write "(World Bank WDI, accessed
  2026)" or "in 2023, according to …".
- Say what is measured: nominal or real, base year, market exchange rates or purchasing-power
  parity, per capita or total, seasonally adjusted or not.
- Anything that changes (policy rates, debt ratios, rankings, institutional rules) is dated
  ("as of 2026").
- **Balance country examples across regions** — Africa, East and South Asia, Latin America, the
  Middle East, Europe, North America and Oceania — and include low- and middle-income countries,
  not only the United States and Western Europe.
- Cite empirical studies by author and year (Card and Krueger 1994; Acemoglu, Johnson and Robinson
  2001), and report effect sizes with their uncertainty.

### 4.5 Correctness

- **Correctness is non-negotiable.** Verify every computation in examples and solutions with
  `python3` — numpy, scipy, pandas and sympy are installed (statsmodels is not: compute OLS with
  numpy linear algebra). Check that each derivation proves exactly the stated result and that the
  assumptions are complete.
- Simulated data in examples come from a fixed seed so that numbers in the text can be reproduced.

## 5. Markup

Exactly as in Maths Atlas — see `/var/www/f.g77k.com/learn/maths/tools/CONTENT_GUIDE.md` §5 for
blocks (`:::definition`, `:::theorem`/`:::proposition`, `:::proof`, `:::example` + `:::solution`,
`:::exercise`, `:::quiz`, `:::warning`, `:::intuition`, `:::application`, `:::history`,
`:::summary`, `:::algorithm` for procedures such as deferred acceptance or backward induction),
references (`[[#id]]`, `[[course/chapter]]`, `[[course/chapter#id]]`), answer checks and KaTeX.

**Dollar signs.** `$` starts mathematics. A literal dollar sign in prose must be written `\$`
(`\$100 billion`), or write "USD 100" or "100 dollars". Prefer ISO codes for real data (USD, EUR,
CNY, INR, BRL) and neutral "units of money" in illustrative examples.

### 5.1 Notation used across the atlas

State any symbol whose meaning differs from this list at the start of the chapter.

- **Consumers**: goods $x_1, x_2$ (bundle $\mathbf{x}$), prices $p_1, p_2$, income $m$; utility
  $u(\mathbf{x})$; indirect utility $v(\mathbf{p}, m)$; expenditure function $e(\mathbf{p}, u)$;
  Marshallian demand $x_i(\mathbf{p}, m)$, Hicksian demand $h_i(\mathbf{p}, u)$;
  $\mathrm{MRS}_{12}$.
- **Firms**: output $q$ (or $y$), inputs capital $K$ and labour $L$, production function
  $f(K, L)$; wage $w$, rental rate of capital $r$ (micro chapters only); cost function $c(w, r, q)$
  or $C(q)$; marginal cost $MC$.
- **Profit and inflation**: $\pi$ is profit in micro and game-theory chapters and inflation in
  macro chapters. Where both appear, write profit as $\Pi$ — and say so.
- **Macro**: output $Y$, consumption $C$, investment $I$, government purchases $G$, taxes $T$, net
  exports $NX$; capital $K$, labour $L$ (or $N$), per-worker quantities in lower case ($k = K/L$,
  per effective worker $\tilde k$); saving rate $s$, depreciation $\delta$, population growth $n$,
  technology growth $g$; price level $P$, inflation $\pi$, money $M$; **real** interest rate $r$,
  **nominal** interest rate $i$, Fisher relation $i \approx r + \pi^e$; discount factor $\beta$,
  discount rate $\rho$; expectations $\E_t$.
- **Log-linearisation**: a hat denotes a log deviation from the steady state,
  $\hat x_t = \ln X_t - \ln \bar X$ (approximately a percentage deviation); in New Keynesian chapters
  lower-case letters are logs and $\tilde y_t$ is the output gap. Growth rates are $g_X$ or $\dot X/X$.
- **Econometrics** (as in Wooldridge): $y_i = \beta_0 + \beta_1 x_i + u_i$ with error $u_i$ and
  residual $\hat u_i$; matrix form $\mathbf{y} = X\boldsymbol\beta + \mathbf{u}$,
  $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$; $\operatorname{se}(\hat\beta_j)$, $R^2$;
  macros `\E`, `\Var`, `\Cov`, `\Prob`. Potential outcomes $Y_i(1), Y_i(0)$, treatment $D_i$.
- **Finance**: gross return $R$, net return $r$ (state which), risk-free rate $r_f$, volatility
  $\sigma$, CAPM beta $\beta_i$, stochastic discount factor $m_{t+1}$; for options, underlying price
  $S$, strike $K$ (finance chapters only), maturity $T$, standard normal CDF $\Phi$ (or $N(\cdot)$ —
  pick one per course). State whether rates are annual, effective or continuously compounded.
- **$\beta$** is a regression coefficient, a discount factor or a CAPM beta depending on the
  chapter — never two of these in the same chapter without renaming one.
- **Games**: players $i \in \{1, \dots, n\}$, strategies $s_i \in S_i$, profiles $(s_i, s_{-i})$,
  payoffs $u_i$; mixed strategies $\sigma_i$; types $\theta_i$; beliefs $\mu$.

## 6. Interactive figures

The available types are in `data/widgets.json`; try each at
`/learn/economics/lab.php?w=<type>`. Useful mappings:

| type | economics use |
|---|---|
| `plot` | supply and demand, cost curves, budget lines, any curve with parameter sliders and shading |
| `riemann` | consumer and producer surplus as integrals; present value of a continuous income stream |
| `cobweb` | the cobweb model of a market; difference-equation dynamics |
| `sequence` | compounding, the multiplier as a geometric series, convergence of a sequence |
| `newton` | solving for an internal rate of return, a yield to maturity or an equilibrium price |
| `contour` | indifference curves and isoquants; `constraint:` draws a budget line or cost constraint for Lagrange problems |
| `surface` | utility, production and profit functions in 3D |
| `gradientdescent` | numerical optimisation and estimation |
| `rowreduce` | input–output (Leontief) models and linear market systems |
| `slopefield`, `odesolver` | continuous-time growth and adjustment |
| `phaseplane` | the Solow and Ramsey phase diagrams, the saddle path |
| `markov` | labour-market flows, credit-rating transitions, regime switching |
| `distribution`, `clt`, `lln`, `montecarlo` | risk and returns, sampling, simulation |
| `hypothesis`, `confidence`, `bayes`, `regression` | econometric inference and fitting |
| `graph` | networks: trade, payments, interbank exposures |

Economics-specific figures (supply and demand with taxes and price controls, indifference curves and
the budget line, game solvers, game trees, auctions, Solow and IS–LM, the Lorenz curve, the efficient
frontier, binomial trees, Black–Scholes, difference-in-differences …) are planned in
`tools/WIDGET_GUIDE.md`; use a type only once it is in the catalogue.

## 7. Check your work

```
cd /var/www/f.g77k.com/learn/economics
bash tools/check.sh <course> [<course> …]
```

This typesets every formula with KaTeX, validates figures, answer checks and references, and prints
a depth table per lesson. Fix every `ERROR`; depth `warn`ings must be gone for finished lessons.
Preview at `http://f.g77k.com/learn/economics/lesson.php?c=<course>&l=<chapter>` (from this machine:
`curl --resolve f.g77k.com:80:127.0.0.1 …` or `node tools/shot.js "lesson.php?c=…&l=…" out.png`).
Read your rendered lesson at least once, in light and dark mode.
