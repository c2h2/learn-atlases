For many things we want from a language model — a helpful explanation, a well-written story, sound advice, a safe refusal — there is no answer key. The final judge of such outputs is a person, and **human evaluation** is the reference against which automatic metrics and model judges are calibrated. It is also expensive, slow and noisy: people disagree with each other, with themselves on another day, and with what they would conclude if they checked more carefully. Getting useful numbers out of human judgements is a measurement problem of its own, with a long history in psychometrics and in the rating of chess players.

This chapter covers the design of human evaluations — what to ask, on which scale, and why **pairwise preference** usually beats absolute ratings — and how to measure whether raters agree, deriving **Cohen's κ** and computing it together with **Krippendorff's α**. It then turns preferences into ratings with the **Bradley–Terry** model, derives the **Elo** update as a stochastic-gradient step on its likelihood, fits both in plain Python with **bootstrap** confidence intervals, and examines the largest public human evaluation of language models, **Chatbot Arena** (Chiang et al., 2024): how it works, the statistical choices behind it, and the critiques it has received, with its organisers' responses. The same machinery is used for the reward models of [[post-training/reward-models]]; here the focus is on measurement.

## Designing a human evaluation {#sec-design}

::: definition Human evaluation protocols {#def-protocols}
A human evaluation presents raters with model outputs and records a judgement. The main protocols are:

- **absolute rating**: each output alone is scored on a scale — a **Likert scale** (for example $1$ to $5$ or $1$ to $7$, with labelled points from "very poor" to "excellent"), or a binary judgement ("is it correct?", "does it follow the instruction?");
- **pairwise preference**: two outputs for the same prompt are shown side by side, in random order, and the rater chooses the better one, possibly allowing a tie or a graded preference ("A much better" … "B much better");
- **ranking**: $k > 2$ outputs are ordered, which implies $\binom{k}{2}$ pairwise preferences;
- **error annotation**: raters mark specific errors (factual mistakes, unsupported claims, harmful content) against a taxonomy, giving counts rather than overall scores.

The protocol also fixes who the raters are (domain experts, trained annotators, crowdworkers, end users), the **rubric** or guidelines, whether raters see the model's identity, and how many raters judge each item.
:::

Absolute ratings are easy to collect and to average, but suffer from **scale-use differences**: one rater's "4" is another's "3", raters drift over a session, and the first outputs seen anchor later scores. Pairwise comparison removes much of this, because a rater who is uniformly harsh or lenient is harsh or lenient to both outputs.

::: proposition Pairwise judgements cancel rater offsets {#prop-offset}
Suppose rater $r$ perceives output $y$ as $u_r(y) = q(y) + b_r + \varepsilon$, where $q$ is the output's quality, $b_r$ a rater-specific offset, and $\varepsilon$ independent noise with a fixed continuous distribution, and that an absolute rating reports $u_r(y)$ while a pairwise judgement reports which of two outputs has larger $u_r$. Then the probability that rater $r$ prefers $y_1$ to $y_2$ depends on $q(y_1) - q(y_2)$ and not on $b_r$; whereas the mean absolute rating of an output depends on which raters happened to rate it.
:::

::: proof
$u_r(y_1) - u_r(y_2) = q(y_1) - q(y_2) + (\varepsilon_1 - \varepsilon_2)$: the offset cancels, and the distribution of $\varepsilon_1 - \varepsilon_2$ is the same for all raters. A mean of absolute ratings is $q(y) + \bar b + \bar\varepsilon$, where $\bar b$ is the average offset of the raters assigned to $y$, which differs between outputs unless every output is rated by the same raters.
:::

Real scale use is not a constant shift — some raters use the whole scale, others only the middle — but the moral is general. Pairwise preferences are also closer to the decision usually being made ("which model should we use?"), and they are the format of most preference data for RLHF. Their costs are that they say nothing about absolute quality (two bad answers can be compared), that the number of pairs grows quadratically with the number of systems, and that ties and near-ties carry little information.

Good protocol design follows from the earlier chapters: define the construct in the rubric ([[evaluation/evaluation-principles#def-validity]]); randomise the order of outputs; hide model identities; give raters time and resources appropriate to the task (checking a factual claim takes longer than judging fluency); include **attention checks** and items with known answers; and collect several judgements per item on a subset, to measure agreement.

## Agreement between raters {#sec-agreement}

If two raters judging the same items often disagree, then a single rater's judgements are a noisy measurement, and any comparison of models based on them inherits the noise. Agreement is the reliability of a human evaluation. The simplest measure, the fraction of items on which raters agree, is misleading on its own, because some agreement happens by chance.

::: definition Cohen's κ {#def-kappa}
Two raters assign each of $n$ items to one of the categories $1, \dots, C$. Let $p_o$ be the fraction of items on which they agree, and let $p_{A,c}$ and $p_{B,c}$ be the fractions of items that raters $A$ and $B$ put in category $c$. **Cohen's κ** (Cohen, 1960) is

$$
\kappa = \frac{p_o - p_e}{1 - p_e},\qquad p_e = \sum_{c=1}^Cp_{A,c}\,p_{B,c}.
$$ {#eq-kappa}
:::

::: proposition What κ measures {#prop-kappa}
1. $p_e$ is the expected agreement of two raters who assign categories independently of each other and of the item, with the observed marginal frequencies.
2. $\kappa$ is the fraction of the possible improvement over chance that is achieved: $\kappa = 1$ if and only if the raters agree on every item; $\kappa = 0$ when the observed agreement equals the chance agreement; $\kappa < 0$ when they agree less than chance.
3. For given marginals, $\kappa$ is an increasing linear function of $p_o$.
:::

::: proof
(1) If rater $A$ picks category $c$ with probability $p_{A,c}$ and rater $B$ independently with $p_{B,c}$, they agree on $c$ with probability $p_{A,c}p_{B,c}$, and on some category with probability $\sum_cp_{A,c}p_{B,c} = p_e$. (2) The largest possible agreement is $1$, so the possible improvement over chance is $1 - p_e$ and the achieved improvement is $p_o - p_e$; their ratio is $\kappa$. It equals $1$ exactly when $p_o = 1$ (provided $p_e < 1$), $0$ when $p_o = p_e$, and is negative when $p_o < p_e$. (3) With $p_e$ fixed by the marginals, $\kappa = p_o/(1 - p_e) - p_e/(1 - p_e)$ is linear in $p_o$ with positive slope.
:::

::: example κ from a table {#ex-kappa}
Two annotators judge $100$ responses as "good" or "bad". Both say good on $45$, both say bad on $40$; $A$ says good and $B$ bad on $10$, and the reverse on $5$. Compute $p_o$, $p_e$ and κ.
::: solution
$p_o = (45 + 40)/100 = 0.85$. $A$ says good on $55\%$, $B$ on $50\%$, so $p_e = 0.55\cdot0.50 + 0.45\cdot0.50 = 0.5$. Then $\kappa = (0.85 - 0.5)/(1 - 0.5) = 0.7$: the raters achieve $70\%$ of the possible improvement over chance.
:::
:::

κ depends on the marginals, sometimes surprisingly. When one category dominates, chance agreement is high, and even raters who agree on most items can have κ near zero — the **kappa paradox** (Feinstein and Cicchetti, 1990).

::: example The kappa paradox {#ex-paradox}
Two raters label $100$ responses as safe or unsafe. Each labels $95$ as safe; they agree on $90$ of them, and each labels as unsafe $5$ responses that the other labels safe, so they never agree on an unsafe one. Compute $p_o$ and κ.
::: solution
$p_o = 0.90$. $p_e = 0.95^2 + 0.05^2 = 0.905$. $\kappa = (0.90 - 0.905)/(1 - 0.905) = -0.053$. Ninety per cent agreement, but worse than chance on the category that matters: the raters do not agree on a *single* unsafe response. κ is right to be unimpressed; the lesson is to report agreement per category (or on a balanced sample) when categories are rare, and never $p_o$ alone.
:::
:::

::: widget plot
f: (x - e)/(1 - e)
x: 0, 1
y: -1, 1
sliders: e=0.5:0:0.95:0.01
hlines: 0
labels: Cohen's $\kappa$ against observed agreement $p_o$
caption: κ as a function of observed agreement for chance agreement $p_e$ (slider $e$). With balanced binary categories ($p_e = 0.5$), $80\%$ agreement gives $\kappa = 0.6$; with skewed categories ($p_e = 0.9$), the same $80\%$ is worse than chance.
:::

Cohen's κ handles exactly two raters who rate every item, with nominal categories. **Krippendorff's α** (Krippendorff, 1970; 2004) generalises it to any number of raters, missing ratings, and ordinal or interval scales through a choice of distance between values.

::: definition Krippendorff's α (nominal) {#def-alpha}
For each item (unit) $u$ rated by $m_u\ge2$ raters, every ordered pair of its ratings $(c, k)$ from different raters contributes $1/(m_u - 1)$ to the **coincidence matrix** $o_{ck}$. Let $n_c = \sum_ko_{ck}$ and $n = \sum_cn_c$ (the number of pairable ratings). Then

$$
\alpha = 1 - \frac{D_o}{D_e},\qquad D_o = \frac1n\sum_{c\ne k}o_{ck},\qquad D_e = \frac{1}{n(n - 1)}\sum_{c\ne k}n_cn_k,
$$ {#eq-alpha}

the observed disagreement relative to the disagreement expected if all $n$ ratings were paired at random. For ordinal or interval data, the indicator $c\ne k$ is replaced by a squared distance $\delta^2_{ck}$.
:::

Like κ, α is $1$ for perfect agreement and $0$ at chance; unlike κ, it pools both raters' marginals into one expected distribution, and its $n - 1$ makes it slightly less optimistic for small samples. Krippendorff suggested relying on data with $\alpha\ge0.8$ and drawing only tentative conclusions for $0.667\le\alpha < 0.8$; the frequently quoted bands for κ ("$0.61$–$0.80$ substantial", Landis and Koch, 1977) are conventions, not derived thresholds.

```python
from collections import Counter
from itertools import permutations

# 12 responses rated "good" / "ok" / "bad" by three annotators; None = not rated
ratings = {
    "A": ["good", "good", "ok", "bad", "good", "ok", "bad", "good", "ok", "good", "bad", "ok"],
    "B": ["good", "ok",   "ok", "bad", "good", "good", "bad", "good", "bad", "good", "bad", "ok"],
    "C": ["good", "good", "ok", "ok",  None,   "ok", "bad", "good", "ok", None,   "bad", "good"],
}

def cohen_kappa(x, y):
    pairs = [(a, b) for a, b in zip(x, y) if a is not None and b is not None]
    n = len(pairs)
    p_o = sum(a == b for a, b in pairs) / n                         # observed agreement
    mx, my = Counter(a for a, _ in pairs), Counter(b for _, b in pairs)
    p_e = sum(mx[c] * my[c] for c in mx) / n ** 2                   # chance agreement
    return p_o, p_e, (p_o - p_e) / (1 - p_e)

def krippendorff_alpha_nominal(table):
    """table: list of raters, each a list of values (None = missing) over the same units."""
    o = Counter()                                                   # coincidence matrix
    for unit in zip(*table):
        vals = [v for v in unit if v is not None]
        m = len(vals)
        if m < 2:
            continue                                                # unpairable unit
        for i, j in permutations(range(m), 2):
            o[(vals[i], vals[j])] += 1 / (m - 1)
    n_c = Counter()
    for (c, k), w in o.items():
        n_c[c] += w
    n = sum(n_c.values())
    d_o = sum(w for (c, k), w in o.items() if c != k)               # observed disagreement
    d_e = sum(n_c[c] * n_c[k] for c in n_c for k in n_c if c != k) / (n - 1)
    return 1 - d_o / d_e

p_o, p_e, k = cohen_kappa(ratings["A"], ratings["B"])
print(f"A vs B: observed agreement {p_o:.3f}, chance {p_e:.3f}, Cohen's kappa {k:.3f}")
for r1, r2 in [("A", "C"), ("B", "C")]:
    print(f"{r1} vs {r2}: Cohen's kappa {cohen_kappa(ratings[r1], ratings[r2])[2]:.3f}")
print(f"Krippendorff's alpha (A, B): {krippendorff_alpha_nominal([ratings['A'], ratings['B']]):.3f}")
print(f"Krippendorff's alpha (all three, with missing): "
      f"{krippendorff_alpha_nominal(list(ratings.values())):.3f}")
```

```text
A vs B: observed agreement 0.750, chance 0.340, Cohen's kappa 0.621
A vs C: Cohen's kappa 0.697
B vs C: Cohen's kappa 0.265
Krippendorff's alpha (A, B): 0.635
Krippendorff's alpha (all three, with missing): 0.565
```

The two agreement measures are close on the same pair of raters ($0.621$ and $0.635$). The pairwise κ values show that rater B disagrees with C much more than A does, which an overall α of $0.565$ hides; looking at pairs is how one finds a rater who misunderstood the guidelines. For language-model outputs, moderate agreement is normal: Ouyang et al. (2022) reported that their trained labellers agreed with each other on about $73\%$ of pairwise comparisons for InstructGPT. Some of the disagreement is noise, but some is genuine diversity of preference — people differ in how much they value brevity, caution or detail — and averaging it away is itself a choice about whose preferences count ([[llm-society/bias-fairness]]).

## From preferences to ratings {#sec-bt}

A pairwise evaluation of many models produces a list of **battles**: model $i$ against model $j$ on some prompt, and who won. To rank the models we need a model of how strengths produce outcomes.

::: definition Bradley–Terry model {#def-bt}
Each model $i$ has a **strength** $\theta_i\in\R$, and in a comparison between $i$ and $j$,

$$
\Prob(i\succ j) = \sigma(\theta_i - \theta_j) = \frac{1}{1 + e^{-(\theta_i - \theta_j)}},
$$ {#eq-bt}

independently across comparisons (Bradley and Terry, 1952; Zermelo, 1929). Only differences are identified, so a constraint such as $\sum_i\theta_i = 0$ is imposed. Ratings are often reported on the **Elo scale** $R_i = R_0 + \frac{400}{\ln10}\theta_i$, on which a difference of $400$ points means odds of $10$ to $1$: $\Prob(i\succ j) = 1/(1 + 10^{-(R_i - R_j)/400})$.
:::

::: proposition The Bradley–Terry likelihood {#prop-bt-likelihood}
Given battles with $w_{ij}$ wins of $i$ over $j$ and $n_{ij} = w_{ij} + w_{ji}$ comparisons, the log-likelihood

$$
\ell(\theta) = \sum_{i\ne j}w_{ij}\log\sigma(\theta_i - \theta_j)
$$

is concave, with gradient $\partial\ell/\partial\theta_i = W_i - \sum_{j\ne i}n_{ij}\sigma(\theta_i - \theta_j)$, where $W_i$ is the total number of wins of $i$. At a maximum, every model's expected number of wins equals its actual number of wins. If the comparison graph is connected the maximiser is unique up to the shift, and it exists (is finite) if and only if, for every split of the models into two non-empty groups, some model in each group has beaten some model in the other.
:::

::: proof
$\log\sigma(z)$ has second derivative $-\sigma(z)(1 - \sigma(z)) < 0$, so it is concave, and a sum of concave functions of linear functions of $\theta$ is concave. Differentiating, $\frac{d}{dz}\log\sigma(z) = 1 - \sigma(z)$; collecting the terms in which $\theta_i$ appears (with sign $+$ as winner, $-$ as loser) gives $\sum_jw_{ij}(1 - \sigma(\theta_i - \theta_j)) - \sum_jw_{ji}\sigma(\theta_j - \theta_i)$, and using $1 - \sigma(\theta_j - \theta_i) = \sigma(\theta_i - \theta_j)$ this is $W_i - \sum_jn_{ij}\sigma(\theta_i - \theta_j)$. Setting it to zero gives the moment condition. Along any direction other than the shift, the Hessian is negative definite when the graph is connected, which gives uniqueness. If some group has beaten no model outside it, increasing the strengths of the other group without bound increases $\ell$, so no finite maximiser exists; the converse is the theorem of Zermelo (1929) and Ford (1957).
:::

The maximum-likelihood strengths can be computed by Newton's method, by logistic regression (each battle is a data point with feature $+1$ for the winner's column and $-1$ for the loser's), or by the **MM algorithm** of Zermelo, which in terms of $p_i = e^{\theta_i}$ iterates $p_i\leftarrow W_i\big/\sum_{j\ne i}n_{ij}/(p_i + p_j)$ and increases the likelihood at every step (Hunter, 2004).

### Elo as stochastic gradient ascent {#sec-elo}

The **Elo** system (Elo, 1978), used for chess ratings, updates ratings after each game instead of fitting them all at once.

::: definition Elo update {#def-elo}
Before a game between players with ratings $R_i$ and $R_j$, the expected score of $i$ is $E_i = 1/(1 + 10^{(R_j - R_i)/400})$. After the game, with result $S_i = 1$ for a win, $\frac12$ for a draw and $0$ for a loss,

$$
R_i\leftarrow R_i + K(S_i - E_i),\qquad R_j\leftarrow R_j - K(S_i - E_i),
$$

for a fixed **K-factor** $K$.
:::

::: proposition Elo is SGD on the Bradley–Terry likelihood {#prop-elo-sgd}
For a decisive game, the Elo update is one step of stochastic gradient ascent on the Bradley–Terry log-likelihood of that game, in the strengths $\theta = \frac{\ln10}{400}R$, with learning rate $\eta = K\ln10/400$.
:::

::: proof
For a game won by $i$, the log-likelihood is $\log\sigma(\theta_i - \theta_j)$, with gradient $1 - \sigma(\theta_i - \theta_j)$ in $\theta_i$ and its negative in $\theta_j$. With $\theta = \frac{\ln10}{400}R$, $\sigma(\theta_i - \theta_j) = 1/(1 + e^{-\ln10\,(R_i - R_j)/400}) = 1/(1 + 10^{(R_j - R_i)/400}) = E_i$. A gradient step $\theta_i\leftarrow\theta_i + \eta(1 - E_i)$ is, in Elo units, $R_i\leftarrow R_i + \frac{400}{\ln10}\eta(1 - E_i) = R_i + K(1 - E_i)$, which is the Elo update with $S_i = 1$; $\theta_j$ moves by the opposite amount. A loss is the same with $i$ and $j$ exchanged.
:::

The proposition explains Elo's behaviour. Like any SGD with a constant learning rate, it never settles: ratings fluctuate with recent results, by an amount that grows with $K$. And it depends on the **order** of the games, which is right for chess players whose strength changes over time, but wrong for fixed model checkpoints, whose strength does not. For a static set of models the full maximum-likelihood fit uses all the information symmetrically.

::: example An Elo update by hand {#ex-elo}
Model A, rated $1500$, beats model B, rated $1600$, with $K = 32$. What are the new ratings? What would the Bradley–Terry model say is the probability that B beats A?
::: solution
$E_A = 1/(1 + 10^{100/400}) = 1/(1 + 1.778) = 0.360$. A gains $32(1 - 0.360) = 20.5$ points, to $1520.5$, and B falls to $1579.5$. Before the game, $\Prob(\text{B}\succ\text{A}) = 1 - 0.360 = 0.640$: a $100$-point gap corresponds to odds of $10^{1/4} = 1.78$ to $1$.
:::
:::

::: widget plot
f: 1/(1 + 10^(-x/400)); 1/(1 + 10^(-x/s))
x: -800, 800
y: 0, 1
sliders: s=400:100:800:10
hlines: 0.5
labels: Elo scale, $400$ points per factor $10$ in odds; another scale $s$
caption: Win probability against rating difference under [[#def-bt]] on the Elo scale. A difference of $100$ points gives $64\%$, $200$ points $76\%$, $400$ points $91\%$. The scale constant is a convention: multiplying all ratings by a factor and changing $s$ to match leaves every predicted probability unchanged.
:::

### Fitting ratings with uncertainty {#sec-fit}

The listing simulates $3{,}000$ battles among five models with known strengths, fits Bradley–Terry by the MM algorithm, attaches **bootstrap** confidence intervals by resampling battles with replacement and refitting, and compares the result with online Elo run in two different orders.

```python
import math, random

rng = random.Random(5)
models = ["m1", "m2", "m3", "m4", "m5"]
true = {"m1": 1.0, "m2": 0.6, "m3": 0.5, "m4": 0.0, "m5": -0.4}   # true strengths (log-odds scale)

# simulate 3000 battles between random pairs; ties are dropped here
battles = []
for _ in range(3000):
    i, j = rng.sample(models, 2)
    p = 1 / (1 + math.exp(-(true[i] - true[j])))
    battles.append((i, j) if rng.random() < p else (j, i))      # (winner, loser)

def fit_bt(battles, iters=200):
    """Bradley-Terry MLE by the MM algorithm (Zermelo 1929; Hunter 2004).
    Returns log-strengths theta, centred to mean zero."""
    wins = {m: 0 for m in models}
    n = {(a, b): 0 for a in models for b in models}
    for w, l in battles:
        wins[w] += 1
        n[(w, l)] += 1
        n[(l, w)] += 1
    p = {m: 1.0 for m in models}
    for _ in range(iters):
        p = {i: wins[i] / sum(n[(i, j)] / (p[i] + p[j]) for j in models if j != i) for i in models}
        g = math.exp(sum(math.log(v) for v in p.values()) / len(p))   # fix the scale
        p = {m: v / g for m, v in p.items()}
    return {m: math.log(v) for m, v in p.items()}

def elo_scale(theta, base=1000):
    return {m: base + 400 / math.log(10) * t for m, t in theta.items()}

def online_elo(battles, k=4, base=1000):
    r = {m: base for m in models}
    for w, l in battles:
        e = 1 / (1 + 10 ** ((r[l] - r[w]) / 400))               # expected score of the winner
        r[w] += k * (1 - e)
        r[l] -= k * (1 - e)
    return r

theta = fit_bt(battles)
elo = elo_scale(theta)
online = online_elo(battles)
reverse = online_elo(battles[::-1])                          # same battles, opposite order
# bootstrap: resample battles with replacement, refit, take 2.5% and 97.5% quantiles
boots = {m: [] for m in models}
for _ in range(200):
    sample = [battles[rng.randrange(len(battles))] for _ in battles]
    for m, v in elo_scale(fit_bt(sample, iters=100)).items():
        boots[m].append(v)
print("model  true(Elo)  BT fit   95% bootstrap CI    online Elo  (reversed)")
for m in models:
    lo, hi = sorted(boots[m])[4], sorted(boots[m])[194]
    t = 1000 + 400 / math.log(10) * (true[m] - sum(true.values()) / 5)
    print(f"{m:5s} {t:9.1f} {elo[m]:8.1f}   [{lo:7.1f}, {hi:7.1f}]   {online[m]:8.1f}  {reverse[m]:8.1f}")
```

```text
model  true(Elo)  BT fit   95% bootstrap CI    online Elo  (reversed)
m1       1114.7   1102.6   [ 1084.5,  1119.6]     1119.0    1073.1
m2       1045.2   1048.9   [ 1035.0,  1063.5]     1050.2    1046.0
m3       1027.8   1029.4   [ 1014.7,  1045.1]     1034.8    1024.4
m4        940.9    946.4   [  925.9,   963.2]      933.4     941.1
m5        871.4    872.7   [  858.4,   892.9]      862.6     915.4
```

The maximum-likelihood fit recovers every true rating within its interval, and the intervals — about $\pm15$ to $\pm20$ points with $1{,}200$ battles per model — overlap for the two middle models, whose true ratings differ by only $17$ points: their order is not established by this data. Online Elo gives a different answer for the same battles in a different order, by about $50$ points for the top and bottom models, because with a small $K$ it is still drifting from its starting value, and with a large $K$ it would fluctuate instead. The bootstrap treats battles as independent draws; when many battles share a prompt or a voter, resampling those clusters instead gives more honest intervals ([[evaluation/evaluation-statistics]]).

::: quiz
A leaderboard shows model X at $1205$ (95% interval $1195$–$1215$) and model Y at $1198$ ($1188$–$1208$), both fitted by Bradley–Terry on the same battles. Which conclusions are justified?
- [ ] X is better than Y
- [x] The data are consistent with X and Y being equally preferred
- [x] If the ratings are right, X would be preferred to Y in about $51\%$ of comparisons
- [ ] Y will overtake X when more votes arrive
::: solution
The intervals overlap substantially, and a $7$-point gap corresponds to $\Prob(\text{X}\succ\text{Y}) = 1/(1 + 10^{-7/400}) = 0.510$: even if real, the difference is tiny. Overlapping marginal intervals do not by themselves prove the difference is insignificant (the right test uses the interval of the *difference*, which the bootstrap also gives), but nothing here supports ranking X above Y. Nothing predicts the direction of future movement.
:::
:::

## Chatbot Arena {#sec-arena}

**Chatbot Arena** (Chiang et al., 2024), launched in 2023 by researchers at LMSYS and UC Berkeley and later operated as LMArena, applies this machinery at scale. A visitor writes any prompt; two anonymous models, chosen by the platform, answer side by side; the visitor votes for one, for a tie, or for "both bad", after which the identities are revealed (votes cast after a model reveals its identity in its answer are discarded). By the time of the paper the platform had collected over $240{,}000$ votes in over $100$ languages, and it has since collected millions.

The paper's statistical choices are those of this chapter. Ratings are Bradley–Terry maximum-likelihood estimates reported on the Elo scale — the leaderboard initially used online Elo and moved to the full fit because the order dependence of [[#prop-elo-sgd]] made ratings unstable — with confidence intervals from the bootstrap and from robust ("sandwich") standard errors. Pairs of models are sampled adaptively to reduce the uncertainty of the ranking faster than uniform sampling would. To validate the crowd, the authors compared crowd votes with expert votes on a sample, finding substantial though not perfect agreement, and showed with topic modelling that user prompts are diverse. Because all comparisons are pairwise and all prompts are user-written and new, Arena is resistant to the contamination of [[evaluation/contamination]], and it measures something no static benchmark does: what a large population of users prefers on the prompts they actually write.

What it measures is also its main limitation. Arena's voters are self-selected, its prompts are skewed towards what such visitors ask (much coding, many short questions), and a vote reflects a few seconds of reading, not checking. A preference can therefore reward style — length, formatting, confidence, friendliness — as well as substance. The organisers introduced **style control** (2024): adding to the Bradley–Terry logistic regression covariates for the differences in response length and in the use of markdown headers, lists and bold text, so that a model's rating estimates its strength *at equal style*; some models' ratings changed noticeably when style was controlled. They also report ratings per category (coding, mathematics, hard prompts, languages), since an overall rating averages over very different tasks.

### Critiques and responses {#sec-critiques}

As Arena became a widely cited ranking, its methodology came under scrutiny. The most detailed critique is **"The Leaderboard Illusion"** (Singh et al., 2025), by researchers from several industry and academic groups. Its main claims were these:

- **Private testing and selective disclosure.** Some providers tested many private variants of their models on the platform before release and could choose which result to publish; by the winner's-curse argument of [[evaluation/evaluation-principles#prop-winners-curse]], publishing the best of many noisy ratings inflates the published one. The paper reported, for example, that one provider had tested $27$ private variants in the period before a major release, and showed by simulation how best-of-$N$ selection raises the expected rating.
- **Data asymmetries.** Models from a few large providers were sampled in more battles than open-weight models, which gives those providers more of the platform's prompt and preference data; the authors argued that training on such data improves performance on the Arena distribution specifically, and estimated large relative gains from it in their own experiments.
- **Deprecation.** Many models were removed from sampling over time, often without notice, which the authors argued can bias Bradley–Terry ratings when the remaining comparison graph becomes unbalanced.

The organisers responded publicly. They stated that their policy of allowing providers to test pre-release models, under anonymous names, had been published and was open to all providers; that the leaderboard lists only publicly available models, whose scores reflect real users' votes; that sampling rates reflected factors such as the number of models submitted and their popularity, and they published further data on sampling; and they disputed several of the paper's factual claims and figures, while describing changes to their policies and transparency. Readers can assess both documents; the general lessons do not depend on resolving every disagreement. Any leaderboard that permits repeated submissions is exposed to selection effects; data access confers advantages on the distribution the data comes from; and the transparency of sampling, testing and deprecation policies determines how far ratings can be trusted.

::: example The selection effect on a rating {#ex-selection}
A provider tests $10$ private variants of equal true strength, each rated with a standard error of $5$ Elo points, and publishes the best. By how much does the published rating overstate the true one on average? How could a leaderboard remove the bias?
::: solution
By [[evaluation/evaluation-principles#prop-winners-curse]], the expected maximum of $10$ independent normal errors is $1.539$ standard deviations: $1.539\cdot5 = 7.7$ points. Remedies: publish the ratings of all tested variants; require that the published model be fixed in advance of testing; or re-rate the chosen variant on fresh battles after selection, which removes the bias exactly as re-evaluating on fresh questions did in the earlier chapter.
:::
:::

::: warning Human judgement is not ground truth
It is tempting to treat human preference as the gold standard against which everything else is measured. It is a measurement with its own biases. Crowd raters could not reliably tell GPT-3's stories from human-written ones (Clark et al., 2021), so fluency can masquerade as quality; Hosking et al. (2024) found that more assertive responses were judged more factual, and that preference scores under-weighted factual errors; and raters' time limits make long or technical responses hard to check. Human evaluations measure what the raters, under the conditions given, prefer — which is exactly right for some purposes (user satisfaction) and a proxy for others (correctness, safety). For the latter, use experts, give them time and tools, ask about specific errors rather than overall preference, and measure agreement.
:::

::: history
Pairwise comparison as a basis for measurement goes back to Thurstone's "law of comparative judgment" (1927), which modelled perceived differences with normal noise. Zermelo (1929) proposed the logistic model to rank chess players from round-robin results and proved its existence and uniqueness conditions; Bradley and Terry (1952) rediscovered it for taste tests, and Ford (1957) and Hunter (2004) analysed its estimation. Arpad Elo's rating system, adopted by the US Chess Federation in 1960 and by FIDE in 1970 and described in his book of 1978, made the online update standard. Inter-rater agreement measures came from psychology and content analysis: Cohen's κ (1960), Fleiss's multi-rater extension (1971), and Krippendorff's α (from 1970). In NLP, human evaluation was standard for translation and summarisation long before neural models; for language models, preference comparisons became central with RLHF (Christiano et al., 2017; Stiennon et al., 2020; Ouyang et al., 2022), and Chatbot Arena (2023; Chiang et al., 2024) turned crowdsourced pairwise votes into a public leaderboard. Its critique by Singh et al. (2025), and the response of its organisers, brought the statistics of leaderboards into wide discussion.
:::

::: summary
- Human evaluation uses absolute ratings, **pairwise preferences**, rankings or error annotation ([[#def-protocols]]); pairwise judgements cancel rater offsets ([[#prop-offset]]) and are the usual format for comparing models.
- **Cohen's κ** $= (p_o - p_e)/(1 - p_e)$ measures agreement beyond chance for two raters ([[#prop-kappa]]); with rare categories high raw agreement can give low κ. **Krippendorff's α** extends this to many raters, missing data and ordinal scales ([[#def-alpha]]).
- The **Bradley–Terry** model sets $\Prob(i\succ j) = \sigma(\theta_i - \theta_j)$ ([[#def-bt]]); its log-likelihood is concave and its MLE matches expected to actual wins ([[#prop-bt-likelihood]]). The **Elo** scale uses $400/\ln10$ points per unit of log-odds.
- **Elo updates** are SGD steps on the Bradley–Terry likelihood ([[#prop-elo-sgd]]): order-dependent and never converged. For fixed models, fit the MLE and give **bootstrap** intervals.
- **Chatbot Arena** ranks models from crowdsourced, anonymous pairwise votes on users' own prompts with Bradley–Terry and bootstrap intervals, style control and category ratings. Its critics (Singh et al., 2025) pointed to private testing, data asymmetries and deprecation; its organisers disputed several claims and cited published policies. Selection and transparency matter for any leaderboard.
- Human preference is itself a biased measurement — towards fluency, confidence and length — and is not ground truth for correctness or safety.
:::

## Exercises

::: exercise Computing κ {level=1 check="0.565"}
Two raters agree on $80\%$ of binary judgements. Rater A says "yes" $60\%$ of the time and rater B $70\%$. Compute Cohen's κ to three decimal places.
::: solution
$p_e = 0.6\cdot0.7 + 0.4\cdot0.3 = 0.42 + 0.12 = 0.54$. $\kappa = (0.80 - 0.54)/(1 - 0.54) = 0.26/0.46 = 0.565$.
:::
:::

::: exercise Win probability on the Elo scale {level=1 check="0.640"}
Under [[#def-bt]] on the Elo scale, what is the probability that a model rated $100$ points higher wins a comparison (three decimal places)?
::: solution
$1/(1 + 10^{-100/400}) = 1/(1 + 0.5623) = 0.640$.
:::
:::

::: exercise A rating gap from a win rate {level=1 check="70.4"}
In $100$ comparisons between two models (and no others), model A wins $60$. What is the maximum-likelihood rating difference on the Elo scale (one decimal place)?
::: solution
With two models, [[#prop-bt-likelihood]] requires $100\,\sigma(\theta_A - \theta_B) = 60$, so $\theta_A - \theta_B = \operatorname{logit}0.6 = \ln1.5 = 0.405$. On the Elo scale, $\frac{400}{\ln10}\cdot0.405 = 400\log_{10}1.5 = 70.4$ points.
:::
:::

::: exercise An Elo update {level=2 check="1520.48"}
Model A, rated $1500$, beats model B, rated $1600$, with $K = 32$. Give A's new rating to two decimal places, and say how many points B loses.
::: solution
$E_A = 1/(1 + 10^{0.25}) = 0.35994$, so A gains $32\cdot0.64006 = 20.48$ points, to $1520.48$; B loses the same $20.48$ points. The total rating is conserved by every update.
:::
:::

::: exercise Krippendorff's α by hand {level=2 check="0.6349"}
Two raters label $12$ items (no missing values). They disagree on $3$ items. Over both raters' $24$ labels, "good" occurs $10$ times, "ok" $7$ times and "bad" $7$ times. Compute nominal α from [[#eq-alpha]] to four decimal places.
::: solution
Each unit has $m_u = 2$, so each disagreement contributes two ordered off-diagonal pairs of weight $1$: $\sum_{c\ne k}o_{ck} = 6$, and $n = 24$. $\sum_{c\ne k}n_cn_k = 24^2 - (10^2 + 7^2 + 7^2) = 576 - 198 = 378$. Then $D_o = 6/24 = 0.25$ and $D_e = 378/(24\cdot23) = 0.6848$, so $\alpha = 1 - 0.25/0.6848 = 0.6349$ — the value for raters A and B in the listing of [[#sec-agreement]].
:::
:::

::: exercise Graded preferences {level=2}
A protocol records preferences on a five-point scale ("A much better", "A better", "tie", "B better", "B much better"). Propose two ways to use these in a Bradley–Terry fit, and discuss what each assumes.
::: solution
(1) Collapse to wins, losses and ties, counting a tie as half a win for each (equivalently a soft label $\frac12$), and possibly "much better" and "better" alike: simple, discards the intensity, and assumes ties are equally informative about both directions. (2) Use soft labels, for example $1, 0.75, 0.5, 0.25, 0$, in the cross-entropy $-\sum[y\log\sigma(\theta_i - \theta_j) + (1 - y)\log\sigma(\theta_j - \theta_i)]$: uses intensity, but assumes the chosen numbers are calibrated probabilities, which raters' use of the scale may not support. Alternatives model ties explicitly (Rao and Kupper, 1967; Davidson, 1970) or use an ordinal logistic model with estimated thresholds between the categories, which learns from the data how "much better" relates to "better".
:::
:::

::: exercise The cost of a best-of-$N$ {level=2 check="7.69"}
Following [[#ex-selection]], what is the expected inflation, in Elo points to two decimal places, if each variant's rating has a standard error of $5$ points and the best of $10$ is published, using $e_{10} = 1.539$?
::: solution
$1.539\cdot5 = 7.69$ points (rounded to $7.7$ in the example). With $20$ variants, $e_{20} = 1.867$ and the inflation is $9.3$ points; it grows slowly, like $\sqrt{2\ln N}$, but it is never zero for $N > 1$.
:::
:::

::: exercise When the MLE does not exist {level=3}
Three models play: A beats B $5$ times and loses $0$; B beats C $3$ times and loses $2$; A and C never meet. Show that the Bradley–Terry MLE does not exist, explain what an MM or gradient fit does on this data, and propose two remedies.
::: solution
Take the split $\{A\}$ versus $\{B, C\}$: A has never lost to anyone in the other group, so by [[#prop-bt-likelihood]] there is no finite maximiser. Concretely, $\ell = 5\log\sigma(\theta_A - \theta_B) + 3\log\sigma(\theta_B - \theta_C) + 2\log\sigma(\theta_C - \theta_B)$; the first term increases towards $0$ as $\theta_A\to\infty$ with $\theta_B, \theta_C$ fixed, and the other terms do not involve $\theta_A$, so the supremum is approached but never attained. A gradient or MM fit drives $\theta_A$ upwards indefinitely (slowly, as the gradient $5(1 - \sigma)$ decays), and the reported rating depends on when it stopped. Remedies: (1) add a weak prior, for example a Gaussian penalty $-\lambda\sum_i\theta_i^2$, which makes the objective strictly concave with a finite maximiser — a MAP estimate ([[math-for-ml/estimation]]); (2) add a pseudo-count, such as half a win and half a loss for each pair against a reference model, which has the same effect; and in any case collect more comparisons for A, since five games cannot establish how much stronger it is.
:::
:::

::: exercise A bootstrap interval for κ {level=3}
Write a function that computes a $95\%$ bootstrap confidence interval for Cohen's κ by resampling items with replacement, and apply it to raters A and B of the listing in [[#sec-agreement]] with $2{,}000$ resamples and seed $0$. What does the interval say about a κ estimated from $12$ items?
::: solution
```python
import random
from collections import Counter

A = ["good", "good", "ok", "bad", "good", "ok", "bad", "good", "ok", "good", "bad", "ok"]
B = ["good", "ok",   "ok", "bad", "good", "good", "bad", "good", "bad", "good", "bad", "ok"]

def kappa(pairs):
    n = len(pairs)
    p_o = sum(a == b for a, b in pairs) / n
    ma, mb = Counter(a for a, _ in pairs), Counter(b for _, b in pairs)
    p_e = sum(ma[c] * mb[c] for c in ma) / n ** 2
    return (p_o - p_e) / (1 - p_e) if p_e < 1 else 1.0

rng = random.Random(0)
pairs = list(zip(A, B))
boot = sorted(kappa([rng.choice(pairs) for _ in pairs]) for _ in range(2000))
print(f"kappa = {kappa(pairs):.3f}, 95% bootstrap interval [{boot[49]:.3f}, {boot[1949]:.3f}]")
```

```text
kappa = 0.621, 95% bootstrap interval [0.178, 1.000]
```

The interval is very wide: with $12$ items the data are consistent with agreement ranging from weak to almost perfect, so the point estimate $0.621$ says little on its own. Agreement studies need many items — typically at least a hundred — and should report an interval. (A resample in which both raters use a single category has $p_e = 1$; the function returns $1$ for it, a convention that matters little here.)
:::
:::
