# Quant Trading Atlas — content guide

Quant Trading Atlas (`/learn/quant/`) teaches systematic trading **research**: how a rule is specified, measured and criticised. Every chapter is a long, self-contained lesson in the style of a very good textbook. Motivation first, then definitions, results with their assumptions, worked numbers, an interactive figure, quick checks and graded exercises with full solutions.

The reference for markup and tone is `/home/c2h2/learn/maths/content/en/calculus-1/limits.md`. Read it before writing.

**For education only — not investment, trading or financial advice.** A lesson may explain how an order, a weight or a backtest works. It must not recommend a security, fund, asset class, broker, leverage choice or strategy, and it must not tell the reader to buy, sell or hold anything. Published backtests illustrate a mechanism. They are not forecasts.

The Chinese translation is **not** part of this pass. Do not add files under `content/zh/`.

## 1. Files

```
content/en/<course>/course.json    course record (already written — do not restructure)
content/en/<course>/<chapter>.md   one lesson per chapter, in course.json order
tools/LIBRARY.md                   the fifty quants.md cases and the only figures you may quote from them
```

**Do not rename, add, remove or reorder courses or chapters.** Other lessons link to them.

Write every lesson properly. Never pad with filler. The checker rejects the stock phrases "the one that the … is for" and a lesson that opens with "This lesson defines the".

## 2. Depth (tools/check.php)

Counted on **paragraphs and list items only**. Headings and display math do not count. Aim for **2,800–5,000** words so the warning line (2,500) is cleared with margin.

- **≥ 3** numbered blocks in total (`:::definition`, `:::theorem`, `:::proposition`, `:::lemma`, `:::corollary`, `:::algorithm`). Prove, or derive in full, anything you number as a theorem or proposition. State every assumption.
- **≥ 4** `:::example` blocks, each with a `:::solution`. Use a short invented series. Check every arithmetic step with `python3` before you write the number down.
- **≥ 8** `:::exercise` blocks under `## Exercises`, each with a `:::solution`. About 3 at `{level=1}`, 3 at `{level=2}`, 2 at `{level=3}`. Add `:::hint` on the level-3 items. Use `check="…"` only when the answer is a single number, and make the solution produce that exact string.
- **≥ 1** `:::widget` and **≥ 1** `:::quiz` (two is better).
- **≥ 1** `:::warning`. Also use `:::intuition`, `:::remark`, `:::application` where they earn their place.
- One `:::history` block. Names and dates must match `course.json` or `tools/LIBRARY.md`. No invented quotations.
- A `:::summary` block of 5–8 bullets immediately before `## Exercises`.
- A short `## Where this leads` with `[[course/chapter]]` links.

Do not write "Theorem [[#id]]" or "Definition [[#id]]". The reference already prints its label. Write `[[#id]]` alone.

## 3. Voice and notation

- British spelling (behaviour, modelling). Voice: "we" for reasoning, "you" for instructions.
- Bold a term on first definition (`**simple return**`).
- No literal `$` in prose. Write `\$` or "dollars" or "units of account".
- No h1. Sections are `##`.
- Original prose. Do not paste source code from QuantJourney or from textbooks. A short formula is fine.
- Illustrative prices are invented (100, 101, 99) unless you are quoting `tools/LIBRARY.md`.
- When you quote the library, name the case (W01, O03, …), say the figure is **as reported on quants.md for that QuantJourney example (Apache-2.0), read in 2026**, and say this atlas has **not** re-run the backtest. Do not invent a win rate, Sharpe or CAGR that LIBRARY.md does not list. If a cell is "—", say the library does not report it.
- A library loss is part of the lesson. Do not flip it into "so one should take the other side".
- Link inside the atlas with `[[course/chapter]]`. Link to Maths Atlas in ordinary URLs, for example `[hypothesis tests](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)`.

Notation used everywhere:

- Price at the decision time $t$: $P_t$. Say when it is an adjusted close.
- Simple return $R_t = P_t/P_{t-1} - 1$. Log return $r_t = \ln(P_t/P_{t-1}) = \ln(1+R_t)$.
- Gross compound growth over $T$ steps: $\prod_{t=1}^{T}(1+R_t)$.
- Volatility: sample standard deviation of simple returns, and say the denominator ($n$ or $n-1$) and whether it is annualised by $\sqrt{252}$.
- Sharpe ratio in **our** examples: mean excess return divided by the standard deviation of excess return, risk-free rate stated (often 0 in a short example). Annualise only with the factor you name. Never claim the library uses this exact convention. Call their number "the reported Sharpe".
- Maximum drawdown: the largest peak-to-trough fall of the equity index, as a negative fraction.
- Profit factor: sum of positive P&L divided by the absolute sum of negative P&L, over a stated unit (trades or periods). Infinite when the denominator is 0.
- Weight $w_{i,t}$ is a target fraction of net asset value. A signal $s_{i,t}$ is not a weight until a map is stated.
- Decision clock: a feature dated $t$ may use prices up to $t$ and earns returns **after** $t$.

## 4. Markup skeleton

```
Opening paragraphs with no heading.

## First idea

:::definition Name of the object {#def-short}
The definition, with symbols.
:::

:::quiz
One question, ending with a question mark.
- [ ] a wrong answer
- [x] the right answer
- [ ] another wrong answer
:::solution
Why, in a sentence or two.
:::
:::

:::example A four-day path {#ex-four}
The problem, with every input written out.
:::solution
The steps, ending at the number.
:::
:::

:::widget plot
f: 100*(1.01)^x
x: 0, 20
caption: Drag is not required. Say what to look at.
:::

:::warning The usual slip
What people mix up.
:::

:::history
Two or three accurate sentences. No fake quotations.
:::

## Where this leads

One paragraph with [[other/chapter]] links.

:::summary
- Five to eight bullets.
:::

## Exercises

:::exercise Routine {level=1 check="0.02"}
Ask for one number. Say "(Enter the simple return.)" if you set check.
:::solution
Work.
:::
:::
```

Widgets that exist (do not invent types): `plot`, `sequence`, `distribution`, `hypothesis`, `confidence`, `regression`, `montecarlo`, `markov`, `lln`, `clt`, `newton`, `rowreduce`. Copy a known-good block:

```
:::widget distribution
dist: normal
params: mu=0, sigma=0.01
a: -0.02
b: 0.02
caption: Shade a central band of a daily simple return. Widen sigma and watch the band empty out.
:::

:::widget regression
points: 0,0.001; 1,0.004; 2,-0.002; 3,0.006; 4,0.003
degree: 1
residuals: true
caption: Drag a point. The line is the least-squares fit of a later return on a signal known earlier.
:::

:::widget sequence
a: (1.001)^n
mode: terms
N: 40
caption: Compounding of a constant gross return. This is a toy, not a market.
:::

:::widget hypothesis
test: z
tail: right
alpha: 0.05
effect: 0.3
n: 60
caption: Power of a one-sided test of a mean excess return. Raise n, then raise the number of tests you imagine having run.
:::

:::widget markov
matrix: 0.85,0.15; 0.30,0.70
states: Calm; Stress
steps: 24
caption: A two-regime volatility sketch. The chain is illustrative.
:::
```

`caption` is an allowed extra key on every widget.

## 5. Check

```
cd /home/c2h2/learn/quant
php tools/check.php <course>
```

Fix every ERROR. Clear depth warnings on any lesson you claim is finished. Verify arithmetic with Python before you finish.
