Every number in this course so far has been an estimate. A benchmark is a sample of questions from a larger population, a model's answers are samples from its output distribution, and the prompt and seed are draws from a space of equally reasonable choices. Two models whose scores differ by a point may not differ at all; a model that "improves" by two points after a change may only have been lucky. The course overview gave the most useful habit in evaluation: **report uncertainty**. This chapter supplies the tools to do it properly.

The basics — the standard error of an accuracy, the Wilson interval, McNemar's test and the bootstrap — were introduced in [[ml-fundamentals/evaluation-metrics]] and [[math-for-ml/estimation]]; the noise of benchmarks during pretraining in [[pretraining/in-training-evaluation]]. Here they are developed for language-model evaluation, following the framework set out by Miller (2024). The chapter derives the **Wilson interval** and checks its coverage against the naive interval; decomposes the variance of a score into question sampling and answer sampling; treats **paired** comparisons with McNemar's test and the paired bootstrap; computes the **sample size** needed to detect a difference; derives **clustered standard errors** for questions that share a passage; handles **multiple comparisons**; separates variance across **seeds and prompts**; briefly revisits **calibration**; and ends with a reporting standard. All listings are plain Python with their real output.

## Questions as a sample {#sec-sample}

[[evaluation/evaluation-principles#def-evaluation]] defined the estimand of an evaluation as an expectation over a task population $\mathcal{D}$. A benchmark of $n$ questions is a sample from it, and the question to ask of any score is how much it would change with a different sample of the same size.

::: definition The super-population view {#def-superpop}
Let questions $x_1, \dots, x_n$ be drawn independently from $\mathcal{D}$. For each question let $\mu_x = \E[s(x, y)\mid x]$ be the model's expected score on $x$ (its probability of a correct answer, if scoring is binary), and $\sigma_x^2 = \Var(s(x, y)\mid x)$ the variance due to sampling its answer. If $K$ answers are sampled per question and averaged, the score is $\hat\mu = \frac1n\sum_i\frac1K\sum_{j=1}^Ks(x_i, y_{ij})$, an estimate of $\mu = \E_{x\sim\mathcal{D}}[\mu_x]$.
:::

::: proposition Two sources of variance {#prop-two-sources}
Under [[#def-superpop]],

$$
\Var(\hat\mu) = \frac1n\left(\Var_x(\mu_x) + \frac{\E_x[\sigma_x^2]}{K}\right).
$$ {#eq-two-sources}

For binary scores with one sample per question ($K = 1$) this equals $\mu(1 - \mu)/n$, the familiar binomial variance, which splits as $\mu(1 - \mu) = \Var_x(\mu_x) + \E_x[\mu_x(1 - \mu_x)]$. Sampling more answers per question reduces only the second term; more questions reduce both.
:::

::: proof
The per-question averages $\bar s_i = \frac1K\sum_js(x_i, y_{ij})$ are independent and identically distributed, so $\Var(\hat\mu) = \Var(\bar s_1)/n$. By the law of total variance, $\Var(\bar s_1) = \Var(\E[\bar s_1\mid x]) + \E[\Var(\bar s_1\mid x)] = \Var(\mu_x) + \E[\sigma_x^2/K]$, since the $K$ answers are independent given $x$. For binary scores and $K = 1$, $\bar s_1$ is Bernoulli with mean $\mu$, so its variance is $\mu(1 - \mu)$, and $\sigma_x^2 = \mu_x(1 - \mu_x)$.
:::

Miller (2024) drew two practical recommendations from this decomposition. When answers are sampled with temperature above zero, sample several per question and average them — or use the model's probability of the correct answer directly, which removes the second term altogether. And understand that no amount of resampling answers reduces the first term, which reflects the questions that happened to be chosen.

::: example How much does resampling help? {#ex-resample}
A model has overall accuracy $0.6$ on a $500$-question benchmark, and the variance of its per-question success probabilities is $\Var_x(\mu_x) = 0.15$. What is the standard error of its score with one sample per question, and with $10$?
::: solution
With $K = 1$: $\sqrt{0.24/500} = 0.0219$. The within-question term is $0.24 - 0.15 = 0.09$. With $K = 10$: $\sqrt{(0.15 + 0.009)/500} = 0.0178$. Ten times the generation cost buys a $19\%$ smaller standard error; to halve it would need four times as many *questions*.
:::
:::

## Confidence intervals for accuracy {#sec-wilson}

For binary scores, $n\hat\mu$ is (approximately) binomial. The usual **Wald** interval $\hat\mu\pm z\sqrt{\hat\mu(1 - \hat\mu)/n}$ plugs the estimate into the variance, and fails exactly where evaluations often are: near $0$ or $1$, or with few questions. The **Wilson** interval does not plug in.

::: proposition The Wilson score interval {#prop-wilson}
The set of $p\in[0, 1]$ not rejected by the two-sided score test at level $\alpha$, $\{p : \lvert\hat p - p\rvert\le z\sqrt{p(1 - p)/n}\}$ with $z = z_{1-\alpha/2}$, is the interval

$$
\frac{\hat p + \frac{z^2}{2n}\ \pm\ z\sqrt{\frac{\hat p(1 - \hat p)}{n} + \frac{z^2}{4n^2}}}{1 + \frac{z^2}{n}}.
$$ {#eq-wilson}

It always lies inside $[0, 1]$, and its centre is $\hat p$ shrunk towards $\frac12$ by the weight $\frac{z^2/n}{1 + z^2/n}$.
:::

::: proof
The condition is $(\hat p - p)^2\le z^2p(1 - p)/n$. Expanding and collecting powers of $p$,

$$
\Big(1 + \frac{z^2}{n}\Big)p^2 - \Big(2\hat p + \frac{z^2}{n}\Big)p + \hat p^2\le0,
$$

a quadratic in $p$ with positive leading coefficient, so the solution set is the interval between its roots. The discriminant is $(2\hat p + z^2/n)^2 - 4(1 + z^2/n)\hat p^2 = 4\hat pz^2/n + z^4/n^2 - 4\hat p^2z^2/n = \frac{4z^2}{n}\big(\hat p(1 - \hat p) + \frac{z^2}{4n}\big)$, and the roots are $\big(2\hat p + z^2/n\pm\sqrt{\text{disc}}\big)/\big(2(1 + z^2/n)\big)$, which simplifies to [[#eq-wilson]]. At $p = 0$ the left side of the quadratic is $\hat p^2\ge0$ and at $p = 1$ it is $(1 - \hat p)^2\ge0$, with the vertex inside $[0, 1]$, so both roots lie in $[0, 1]$. The centre is $(\hat p + z^2/(2n))/(1 + z^2/n) = w\cdot\frac12 + (1 - w)\hat p$ with $w = \frac{z^2/n}{1 + z^2/n}$.
:::

The Wald interval inverts the same test but with the variance evaluated at $\hat p$ instead of at the hypothesised $p$; that substitution is what breaks it near the boundary. The listing compares the two, including their **coverage** — how often a nominal $95\%$ interval actually contains the true accuracy — by simulation.

```python
import math, random

def wald(k, n, z=1.96):
    p = k / n
    h = z * math.sqrt(p * (1 - p) / n)
    return p - h, p + h

def wilson(k, n, z=1.96):
    p = k / n
    centre = (p + z * z / (2 * n)) / (1 + z * z / n)
    half = z / (1 + z * z / n) * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))
    return centre - half, centre + half

print("47/50 correct: Wald   [%.3f, %.3f]" % wald(47, 50))
print("47/50 correct: Wilson [%.3f, %.3f]" % wilson(47, 50))

# coverage: how often does each 95% interval contain the true accuracy?
rng = random.Random(8)
for n, p in [(50, 0.95), (50, 0.7), (500, 0.95)]:
    cover = {"Wald": 0, "Wilson": 0}
    reps = 20000
    for _ in range(reps):
        k = sum(rng.random() < p for _ in range(n))
        for name, f in (("Wald", wald), ("Wilson", wilson)):
            lo, hi = f(k, n)
            cover[name] += lo <= p <= hi
    print(f"n = {n:3d}, p = {p:.2f}: coverage Wald {cover['Wald'] / reps:.3f}, "
          f"Wilson {cover['Wilson'] / reps:.3f}")
```

```text
47/50 correct: Wald   [0.874, 1.006]
47/50 correct: Wilson [0.838, 0.979]
n =  50, p = 0.95: coverage Wald 0.919, Wilson 0.962
n =  50, p = 0.70: coverage Wald 0.933, Wilson 0.956
n = 500, p = 0.95: coverage Wald 0.932, Wilson 0.949
```

For $47$ correct out of $50$, the Wald interval extends above $100\%$, while Wilson's is asymmetric and stays inside. In repeated sampling with $n = 50$ and a true accuracy of $95\%$, the Wald interval covers the truth only $92\%$ of the time; Wilson's covers it about $96\%$. With $500$ questions both are close to nominal. For small evaluations — a few dozen agentic tasks, a safety test with few failures — Wilson (or the exact Clopper–Pearson interval) should be the default.

::: widget confidence
dist: bernoulli
n: 50
level: 0.95
intervals: 80
method: z
caption: Eighty simulated $95\%$ Wald intervals for an accuracy from $50$ questions each. Intervals that miss the true value are highlighted. Move the true probability towards $0$ or $1$, or reduce $n$, and the miss rate rises above $5\%$ — the failure that the Wilson interval of [[#prop-wilson]] corrects.
:::

## Comparing two models {#sec-paired}

The most common statistical question in evaluation is whether model A is better than model B. When both are run on the **same questions**, the comparison should be **paired**: question difficulty is shared, so most of the question-sampling variance cancels in the difference.

::: proposition Variance of a paired difference {#prop-paired}
Let $a_i, b_i$ be the two models' scores on question $i$ and $d_i = a_i - b_i$. Then

$$
\Var(\bar a - \bar b) = \frac{\Var(a) + \Var(b) - 2\Cov(a, b)}{n} = \frac{\Var(d)}{n},
$$

which is smaller than the independent-samples variance $(\Var(a) + \Var(b))/n$ whenever the scores are positively correlated across questions. For binary scores with discordant rates $\pi_{10} = \Prob(a = 1, b = 0)$ and $\pi_{01}$, $\Var(d) = (\pi_{10} + \pi_{01}) - (\pi_{10} - \pi_{01})^2$.
:::

::: proof
The first equality is the variance of a difference of means of $n$ i.i.d. pairs; the second is the same expression written for $d_i$. With binary scores, $d_i\in\{-1, 0, 1\}$ with $\Prob(d = 1) = \pi_{10}$ and $\Prob(d = -1) = \pi_{01}$, so $\E[d^2] = \pi_{10} + \pi_{01}$ and $\E[d] = \pi_{10} - \pi_{01}$.
:::

Language models evaluated on the same benchmark typically agree on most questions, because easy questions are easy for both, so pairing helps a great deal. Three ways to use it:

- the **paired $z$-test** on $\bar d$ with standard error $\operatorname{sd}(d)/\sqrt n$;
- **McNemar's test** ([[ml-fundamentals/evaluation-metrics]]), which conditions on the $b + c$ discordant questions and tests whether $b\sim\Bin(b + c, \frac12)$, either with $\chi^2 = (b - c)^2/(b + c)$ or exactly;
- the **paired bootstrap**: resample questions with replacement, keeping each question's pair of outcomes together, recompute $\bar d$, and take quantiles. It applies to any metric (F1, pass@$k$, a judge's win rate) and to clusters, by resampling clusters.

```python
import math, random

rng = random.Random(9)
sig = lambda z: 1 / (1 + math.exp(-z))
n = 1000
A, B = [], []
for _ in range(n):
    d = rng.gauss(0, 4.0)                        # question difficulty, shared by both models
    A.append(int(rng.random() < sig(2.1 - d)))  # model A is slightly stronger
    B.append(int(rng.random() < sig(1.6 - d)))
pa, pb = sum(A) / n, sum(B) / n
diff = [a - b for a, b in zip(A, B)]
mean_d = sum(diff) / n
se_unpaired = math.sqrt(pa * (1 - pa) / n + pb * (1 - pb) / n)
se_paired = math.sqrt(sum((x - mean_d) ** 2 for x in diff) / (n - 1) / n)
print(f"accuracy A {pa:.3f}, B {pb:.3f}, difference {mean_d:.3f}")
print(f"unpaired SE {se_unpaired:.4f} (z = {mean_d / se_unpaired:.2f}); "
      f"paired SE {se_paired:.4f} (z = {mean_d / se_paired:.2f})")

# McNemar: only the discordant questions matter
b = sum(a == 1 and c == 0 for a, c in zip(A, B))   # A right, B wrong
c = sum(a == 0 and c == 1 for a, c in zip(A, B))   # B right, A wrong
chi2 = (b - c) ** 2 / (b + c)
m = b + c
p_exact = min(1.0, 2 * sum(math.comb(m, j) for j in range(max(b, c), m + 1)) / 2 ** m)
print(f"discordant: b = {b}, c = {c}; McNemar chi2 = {chi2:.2f}, exact two-sided p = {p_exact:.4f}")

# paired bootstrap: resample questions, keeping each question's pair of outcomes together
boot = []
for _ in range(5000):
    idx = [rng.randrange(n) for _ in range(n)]
    boot.append(sum(diff[i] for i in idx) / n)
boot.sort()
print(f"paired bootstrap 95% CI for the difference: [{boot[124]:.3f}, {boot[4874]:.3f}]")
print(f"agreement between the models: {sum(a == b for a, b in zip(A, B)) / n:.3f}")
```

```text
accuracy A 0.709, B 0.674, difference 0.035
unpaired SE 0.0206 (z = 1.70); paired SE 0.0125 (z = 2.80)
discordant: b = 96, c = 61; McNemar chi2 = 7.80, exact two-sided p = 0.0065
paired bootstrap 95% CI for the difference: [0.011, 0.060]
agreement between the models: 0.843
```

The models agree on $84\%$ of questions. Treated as independent samples, their $3.5$-point difference is $1.70$ standard errors — not significant at the $5\%$ level. Paired, it is $2.80$ standard errors, McNemar's exact $p$ is $0.0065$, and the paired bootstrap interval excludes zero. The data are the same; only the analysis differs. Conversely, comparing two models' separate confidence intervals and calling the difference insignificant because they overlap is a common error: overlapping marginal intervals are compatible with a highly significant paired difference.

## How many questions? {#sec-power}

Before running an evaluation it is worth asking whether it can detect the difference one cares about. The **power** of a test is the probability that it detects a real difference of a given size.

::: proposition Sample size for comparing accuracies {#prop-power}
For a two-sided test at level $\alpha$ with power $1 - \beta$, to detect a difference $\delta$ in accuracy, approximately

$$
n_{\text{unpaired}} = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2\,\big(p_1(1 - p_1) + p_2(1 - p_2)\big)}{\delta^2}
$$

questions per model are needed with independent question sets, and

$$
n_{\text{paired}} = \frac{(z_{1-\alpha/2} + z_{1-\beta})^2\,\big(\pi_{\text{disc}} - \delta^2\big)}{\delta^2}
$$ {#eq-n-paired}

with a shared set, where $\pi_{\text{disc}} = \pi_{10} + \pi_{01}$ is the fraction of questions on which exactly one model is right.
:::

::: proof
Let $\hat\delta$ be approximately normal with mean $\delta > 0$ and standard deviation $\sigma/\sqrt n$. The test rejects when $\hat\delta > z_{1-\alpha/2}\sigma/\sqrt n$ (ignoring the negligible opposite tail). The rejection probability is $\Prob\big(Z > z_{1-\alpha/2} - \delta\sqrt n/\sigma\big)$, which equals $1 - \beta$ when $z_{1-\alpha/2} - \delta\sqrt n/\sigma = -z_{1-\beta}$, that is $n = (z_{1-\alpha/2} + z_{1-\beta})^2\sigma^2/\delta^2$. For independent samples $\sigma^2 = p_1(1 - p_1) + p_2(1 - p_2)$; for paired samples $\sigma^2 = \Var(d) = \pi_{\text{disc}} - \delta^2$ by [[#prop-paired]]. (Using the variance under the alternative for both terms is the common approximation.)
:::

```python
import math, random
from statistics import NormalDist

Z = NormalDist().inv_cdf

def n_unpaired(p1, p2, alpha=0.05, power=0.8):
    """Questions per model to detect p1 - p2 with independent samples (two-sided z-test)."""
    return math.ceil((Z(1 - alpha / 2) + Z(power)) ** 2 * (p1 * (1 - p1) + p2 * (1 - p2))
                     / (p1 - p2) ** 2)

def n_paired(delta, discordant, alpha=0.05, power=0.8):
    """Questions to detect a difference delta when a fraction `discordant` of questions
    are answered correctly by exactly one of the two models (same questions for both)."""
    var_d = discordant - delta ** 2                    # variance of d_i in {-1, 0, 1}
    return math.ceil((Z(1 - alpha / 2) + Z(power)) ** 2 * var_d / delta ** 2)

print("unpaired, 70% vs 72%:", n_unpaired(0.72, 0.70))
for disc in (0.30, 0.15, 0.08):
    print(f"paired, delta = 0.02, discordant fraction {disc:.2f}:", n_paired(0.02, disc))

# check by simulation: power of the paired z-test at the computed n (discordant = 0.15)
rng = random.Random(10)
n = n_paired(0.02, 0.15)
p_plus, p_minus = (0.15 + 0.02) / 2, (0.15 - 0.02) / 2   # P(d = +1), P(d = -1)
hits, reps = 0, 2000
for _ in range(reps):
    d = [1 if u < p_plus else -1 if u < p_plus + p_minus else 0
         for u in (rng.random() for _ in range(n))]
    mean = sum(d) / n
    se = math.sqrt(sum((x - mean) ** 2 for x in d) / (n - 1) / n)
    hits += abs(mean / se) > 1.96
print(f"simulated power at n = {n}: {hits / reps:.3f}")
```

```text
unpaired, 70% vs 72%: 8077
paired, delta = 0.02, discordant fraction 0.30: 5879
paired, delta = 0.02, discordant fraction 0.15: 2936
paired, delta = 0.02, discordant fraction 0.08: 1562
simulated power at n = 2936: 0.808
```

Detecting a two-point difference near $70\%$ with $80\%$ power needs about $8{,}000$ questions with independent sets — more than most benchmarks have. Pairing cuts this by a factor that depends on how often the models disagree: at $15\%$ disagreement, typical for related models, about $2{,}900$ questions suffice, and the simulation confirms the power. Most benchmarks of a few hundred questions can only detect differences of five points or more; a reported one-point gain on them is almost never established by the benchmark alone.

::: widget plot
f: 0.5*(1 + erf((d*sqrt(x)/s - 1.96)/sqrt(2)))
x: 0, 10000
y: 0, 1
sliders: d=0.02:0.005:0.1:0.005; s=0.39:0.1:0.7:0.01
hlines: 0.8
labels: power against number of questions $n$
caption: Approximate power of a two-sided $5\%$ test to detect an accuracy difference $d$ ([[#prop-power]]), where $s$ is the standard deviation of a per-question difference: about $0.65$ for unpaired comparisons near $70\%$, $\sqrt{0.15}\approx0.39$ for paired comparisons with $15\%$ discordance. The curve crosses $80\%$ at the required sample size.
:::

## Clustered questions {#sec-clusters}

The formulas so far assume independent questions. Many benchmarks violate this: reading-comprehension sets ask several questions about one passage; multi-turn benchmarks score several turns of one conversation; agentic suites contain variants of one task; some benchmarks are built from templates instantiated many times. Questions in a **cluster** share difficulty, so they carry less independent information than their number suggests.

::: proposition Clustered standard errors {#prop-cluster}
Let the questions fall into clusters $c = 1, \dots, C$, with scores independent across clusters but possibly correlated within them, and let $\hat\mu = \frac1n\sum_is_i$. A consistent estimate of $\Var(\hat\mu)$ is the **cluster-robust** estimate

$$
\widehat{\operatorname{SE}}_{\text{cl}}^2 = \frac{1}{n^2}\sum_{c=1}^C\Big(\sum_{i\in c}(s_i - \hat\mu)\Big)^2.
$$ {#eq-cluster-se}

If all clusters have size $m$ and scores within a cluster have common variance $\sigma^2$ and pairwise correlation $\rho$, then

$$
\Var(\hat\mu) = \frac{\sigma^2}{n}\big(1 + (m - 1)\rho\big),
$$ {#eq-design-effect}

so the naive standard error is too small by the factor $\sqrt{1 + (m - 1)\rho}$, the square root of the **design effect**.
:::

::: proof
$n(\hat\mu - \mu) = \sum_cS_c$ with $S_c = \sum_{i\in c}(s_i - \mu)$ independent across clusters with mean zero, so $\Var(\hat\mu) = \frac{1}{n^2}\sum_c\Var(S_c) = \frac{1}{n^2}\sum_c\E[S_c^2]$; [[#eq-cluster-se]] replaces each $\E[S_c^2]$ by its observed value with $\mu$ estimated, which is consistent as $C\to\infty$. With equal clusters, $\Var(S_c) = m\sigma^2 + m(m - 1)\rho\sigma^2$ (the variances plus the covariances of the $m(m - 1)$ ordered pairs), and with $C = n/m$ clusters, $\Var(\hat\mu) = \frac{1}{n^2}\cdot\frac nm\cdot m\sigma^2(1 + (m - 1)\rho) = \frac{\sigma^2}{n}(1 + (m - 1)\rho)$.
:::

The design effect is often large. With $10$ questions per passage and a within-passage correlation of only $0.25$, it is $3.25$: a benchmark of $1{,}000$ questions has the precision of about $300$ independent ones.

```python
import math, random

rng = random.Random(11)
sig = lambda z: 1 / (1 + math.exp(-z))

def benchmark(passages=100, per=10, mu=0.5, tau=1.5):
    """Reading-comprehension benchmark: questions share passages; a passage effect u
    makes all questions about the same passage easier or harder together."""
    data = []
    for c in range(passages):
        u = rng.gauss(0, tau)
        data += [(c, int(rng.random() < sig(mu + u))) for _ in range(per)]
    return data

def standard_errors(data):
    n = len(data)
    mean = sum(s for _, s in data) / n
    naive = math.sqrt(mean * (1 - mean) / n)
    by_cluster = {}
    for c, s in data:
        by_cluster[c] = by_cluster.get(c, 0.0) + (s - mean)
    clustered = math.sqrt(sum(v * v for v in by_cluster.values())) / n
    return mean, naive, clustered

mean, naive, clustered = standard_errors(benchmark())
print(f"one benchmark: accuracy {mean:.3f}, naive SE {naive:.4f}, clustered SE {clustered:.4f}, "
      f"ratio {clustered / naive:.2f}")

# true accuracy of the super-population, by Monte Carlo over passage effects
truth = sum(sig(0.5 + rng.gauss(0, 1.5)) for _ in range(400000)) / 400000
cover_naive = cover_cl = 0
reps = 2000
for _ in range(reps):
    m, se_n, se_c = standard_errors(benchmark())
    cover_naive += abs(m - truth) <= 1.96 * se_n
    cover_cl += abs(m - truth) <= 1.96 * se_c
print(f"true accuracy {truth:.3f}; coverage of 95% intervals: naive {cover_naive / reps:.3f}, "
      f"clustered {cover_cl / reps:.3f}")
```

```text
one benchmark: accuracy 0.574, naive SE 0.0156, clustered SE 0.0281, ratio 1.79
true accuracy 0.588; coverage of 95% intervals: naive 0.703, clustered 0.954
```

The clustered standard error is $1.8$ times the naive one, and the coverage simulation shows why it matters: naive $95\%$ intervals contain the true accuracy only $70\%$ of the time, clustered ones $95\%$. Miller (2024) recommended clustered standard errors whenever questions share context, and the same applies to the paired bootstrap, which must resample clusters rather than questions.

::: example A design effect {#ex-design}
A benchmark has $2{,}000$ questions on $400$ passages ($5$ per passage), and the within-passage correlation of a model's correctness is $0.4$. By what factor is the naive standard error too small, and what is the effective number of independent questions?
::: solution
Design effect $1 + 4\cdot0.4 = 2.6$; the naive standard error is too small by $\sqrt{2.6} = 1.61$; the effective sample size is $2000/2.6 = 769$ questions. A naive $95\%$ interval would really be about a $78\%$ interval, since it spans only $1.96/1.61 = 1.22$ true standard errors.
:::
:::

## Many comparisons {#sec-multiple}

A technical report that compares a model with five others on twenty benchmarks makes a hundred comparisons. At the $5\%$ level, about five of them will be "significant" even if no model differs from any other. The same holds for any search over prompts, checkpoints or subsets ([[evaluation/evaluation-principles#prop-winners-curse]]).

::: definition Error rates for multiple tests {#def-fwer}
With $m$ hypothesis tests, the **family-wise error rate** (FWER) is the probability of at least one false rejection; the **false discovery rate** (FDR) is the expected fraction of rejections that are false (zero if there are none). For $p$-values sorted as $p_{(1)}\le\dots\le p_{(m)}$:

- **Bonferroni** rejects hypotheses with $p_i\le\alpha/m$;
- **Holm** (1979) rejects $p_{(1)}, p_{(2)}, \dots$ in order while $p_{(k)}\le\alpha/(m - k + 1)$, and stops at the first failure;
- **Benjamini–Hochberg** (1995) finds the largest $k$ with $p_{(k)}\le k\alpha/m$ and rejects $p_{(1)}, \dots, p_{(k)}$.
:::

::: proposition Bonferroni controls the family-wise error {#prop-bonferroni}
For any dependence between the tests, Bonferroni's procedure has FWER at most $\alpha$.
:::

::: proof
Let $I_0$ be the set of true null hypotheses. A false rejection occurs if $p_i\le\alpha/m$ for some $i\in I_0$. By the union bound and the validity of each $p$-value, $\Prob\big(\bigcup_{i\in I_0}\{p_i\le\alpha/m\}\big)\le\sum_{i\in I_0}\alpha/m\le\alpha$.
:::

Holm's procedure also controls the FWER under any dependence and rejects at least as much as Bonferroni; Benjamini–Hochberg controls the weaker FDR (under independence or positive dependence) and is much more powerful when many effects are real. Which to use depends on the claim: "model A beats B on every one of these benchmarks" is a family-wise claim; "here are the benchmarks on which A appears better" is a discovery claim. The simplest protection of all is to fix the comparisons that matter in advance and report the rest as exploratory.

::: example Three corrections {#ex-multiple}
Five comparisons give $p$-values $0.001, 0.008, 0.012, 0.04, 0.2$. Which are significant at $\alpha = 0.05$ under no correction, Bonferroni, Holm and Benjamini–Hochberg?
::: solution
Uncorrected: the first four. Bonferroni (threshold $0.01$): the first two. Holm: $0.001\le0.05/5$, $0.008\le0.05/4 = 0.0125$, $0.012\le0.05/3 = 0.0167$, but $0.04 > 0.05/2$: the first three. Benjamini–Hochberg (thresholds $0.01, 0.02, 0.03, 0.04, 0.05$): the largest $k$ with $p_{(k)}\le k\cdot0.01$ is $k = 4$ ($0.04\le0.04$): the first four. The methods agree on the strong results and differ on the marginal ones, which is where the choice of claim matters.
:::
:::

## Seeds, prompts and other variance {#sec-variance}

Question sampling is not the only source of variation. A score also depends on choices that the evaluator regards as arbitrary, and a different arbitrary choice gives a different score.

- **Answer sampling**: with temperature above zero, rerunning gives different answers ([[#prop-two-sources]]).
- **Prompt templates**: equally reasonable templates, few-shot sets and orders change scores, sometimes by many points ([[evaluation/evaluation-principles#sec-pipeline]]).
- **Training seeds**: two training runs differing only in random seed give models with different scores; Madaan et al. (2024) measured this for language models and found seed variance comparable to many published improvements, and earlier work on fine-tuned models found large seed effects (Dodge et al., 2020).
- **Evaluation infrastructure**: hardware, numerical precision and batching can change greedy outputs slightly, and agentic evaluations add variability from tools, timeouts and environments.

If the claim is about a *method* (a training recipe, an architecture), the relevant population includes seeds, and the method's variance must be estimated from several training runs; one run per method, however many questions, cannot separate the method from the seed. If the claim is about a *model* under a *range of prompts*, the prompts are a sample too.

::: proposition Variance from prompt templates {#prop-prompts}
Suppose model A's and model B's scores under template $j$ differ by $\Delta + \gamma_j + \varepsilon_j$, where $\Delta$ is the average difference over the population of templates, $\gamma_j$ a template-specific interaction with variance $\tau^2$, and $\varepsilon_j$ the question-sampling error of a paired comparison with variance $v$, all independent. Averaging over $P$ templates estimates $\Delta$ with variance $(\tau^2 + v)/P$, and the empirical variance of the $P$ template-level differences, divided by $P$, estimates it without bias.
:::

::: proof
The template-level differences $D_j = \Delta + \gamma_j + \varepsilon_j$ are i.i.d. with mean $\Delta$ and variance $\tau^2 + v$, so their mean has variance $(\tau^2 + v)/P$; the sample variance of i.i.d. variables is unbiased for their variance.
:::

The practical consequence is that a single template hides $\tau^2$ entirely: a difference that is significant on one template, with a paired test over thousands of questions, may be within the spread over templates. Sclar et al. (2023) proposed reporting the range or distribution of performance over a sample of formats for this reason. When the claim is about the model as deployed with one fixed prompt, $\tau^2$ is irrelevant; when the claim is general, it is not.

### Calibration {#sec-calibration}

Statistics of evaluation also include the model's own statements of uncertainty. A model is **calibrated** if, among answers it gives with confidence $c$, a fraction $c$ is correct ([[ml-fundamentals/evaluation-metrics]]). The **expected calibration error** (ECE) bins answers by confidence and averages the absolute gap between mean confidence and accuracy over bins, weighted by bin size. For language models, confidence can be read from token probabilities (for multiple choice) or asked for in words. Kadavath et al. (2022) found that large pretrained models were well calibrated on multiple-choice questions in a suitable format, and the GPT-4 technical report (OpenAI, 2023) showed calibration of the pretrained model that was degraded by post-training; benchmarks such as Humanity's Last Exam report large calibration errors in stated confidence ([[evaluation/benchmarks#sec-hle]]). ECE itself is an estimate with binning choices and sampling noise, and should be reported with its bins and an interval like any other metric.

::: example An expected calibration error {#ex-ece}
A model's answers fall into three confidence bins: $200$ answers with mean confidence $0.55$ and accuracy $0.50$; $500$ with confidence $0.75$ and accuracy $0.70$; $300$ with confidence $0.95$ and accuracy $0.80$. Compute the ECE.
::: solution
$\text{ECE} = (200\cdot0.05 + 500\cdot0.05 + 300\cdot0.15)/1000 = (10 + 25 + 45)/1000 = 0.08$. The model is overconfident in every bin, most of all when it claims near-certainty, which is the bin that matters most for decisions.
:::
:::

::: quiz
A paper reports that its method raises accuracy on a $1{,}200$-question reading-comprehension benchmark from $81.0\%$ to $82.5\%$, from one training run each, one prompt, and a paired test with $p = 0.03$. Which concerns are valid?
- [x] The questions share passages, so the paired test's standard error is probably too small
- [x] One training run per method cannot separate the method from the seed
- [x] A different prompt template might change or reverse the difference
- [ ] A paired test is inappropriate when both methods use the same questions
::: solution
Clustering inflates the true variance ([[#prop-cluster]]), seed variance is not measured with one run per method, and prompt-template variance is hidden by a single template ([[#prop-prompts]]). Pairing on the same questions is exactly right; the problem is the sources of variance it does not cover.
:::
:::

## Reporting results {#sec-reporting}

The tools of this chapter combine into a reporting standard. Miller (2024) and others proposed similar lists; the essentials are these.

::: algorithm Reporting an evaluation {#alg-reporting}
1. **Describe the estimand**: the item set (version, subset, $n$), protocol (template, shots, decoding, samples per item, tools) and scoring ([[evaluation/evaluation-principles#def-evaluation]]).
2. **Report every score with an uncertainty**: a standard error or $95\%$ interval — Wilson for accuracies on small sets, clustered when items share context, bootstrap for other metrics.
3. **Compare with paired methods** on shared items, and report the interval of the *difference*, not two separate intervals.
4. **State the sources of variance covered**: questions only, or also answer samples, prompt templates and training seeds; run several of the last where the claim requires it.
5. **Plan sample sizes** for the differences that matter, and say when a benchmark cannot resolve them.
6. **Account for multiplicity**: say how many configurations, benchmarks and comparisons were examined, distinguish pre-specified from exploratory comparisons, and correct where claims are family-wise.
7. **Avoid selection on the test set**; select on development data and report on held-out data once.
:::

::: warning "Not significant" does not mean "no difference"
A non-significant comparison means the data cannot distinguish the models at the chosen level — often because the benchmark is too small ([[#prop-power]]) — not that they are equal. Report the confidence interval of the difference: "$+0.8$ points, $95\%$ interval $[-1.5, 3.1]$" says that the data are consistent with anything from a small loss to a substantial gain. To claim that two models are *equivalent*, specify a margin in advance and show that the whole interval lies inside it. Conversely, a "significant" difference of $0.3$ points on $50{,}000$ questions may be real and irrelevant.
:::

::: history
Confidence intervals for a binomial proportion date to Wilson (1927) and Clopper and Pearson (1934); McNemar's test for paired proportions to 1947; the bootstrap to Efron (1979). Cluster-robust variance estimation was developed in econometrics and survey statistics (Kish's design effect, 1965; Liang and Zeger, 1986). Multiple-comparison corrections run from Bonferroni's inequality through Holm (1979) to Benjamini and Hochberg's false discovery rate (1995). In NLP, Dror et al. (2018) surveyed significance testing and found it often missing or misapplied, Card et al. (2020) showed that many NLP experiments were underpowered, and Dodge et al. (2020) measured the variance due to fine-tuning seeds. For language-model evaluation, Miller (2024) brought these threads together — the super-population view, clustered errors, paired analysis, variance reduction by resampling and power analysis — and Madaan et al. (2024) quantified variance across seeds and checkpoints on common benchmarks.
:::

::: summary
- A benchmark is a sample of questions; the variance of a score is $\frac1n\big(\Var_x(\mu_x) + \E_x[\sigma_x^2]/K\big)$ ([[#prop-two-sources]]). Sampling more answers per question reduces only the second term.
- The **Wilson** interval inverts the score test ([[#prop-wilson]]); it stays in $[0, 1]$ and keeps its coverage where the Wald interval fails (small $n$, accuracy near $0$ or $1$).
- **Paired** comparisons on shared questions have variance $\Var(d)/n$ ([[#prop-paired]]), often much smaller than unpaired; use the paired $z$-test, McNemar's test or the paired bootstrap, and report the interval of the difference.
- **Sample size**: $n = (z_{1-\alpha/2} + z_{1-\beta})^2\sigma^2/\delta^2$ ([[#prop-power]]); detecting two points needs thousands of questions even when paired.
- **Clustered** questions inflate the variance by the design effect $1 + (m - 1)\rho$; use the cluster-robust standard error ([[#prop-cluster]]) and resample clusters.
- Correct for **multiple comparisons** (Bonferroni, Holm, Benjamini–Hochberg, [[#def-fwer]]); report **seed** and **prompt** variance when claims are general ([[#prop-prompts]]); report calibration with its bins.
- Report the estimand, uncertainties, paired differences, sources of variance and number of comparisons ([[#alg-reporting]]).
:::

## Exercises

::: exercise A Wilson interval {level=1 check="0.699"}
A model answers $18$ of $20$ questions correctly. Compute the lower end of the $95\%$ Wilson interval from [[#eq-wilson]] (three decimal places), and compare it with the Wald interval.
::: solution
$\hat p = 0.9$, $z^2/n = 3.8416/20 = 0.1921$. Centre $(0.9 + 0.0960)/1.1921 = 0.8356$; half-width $\frac{1.96}{1.1921}\sqrt{0.0045 + 0.0024} = 1.6442\cdot0.0831 = 0.1366$. The interval is $[0.699, 0.972]$. The Wald interval is $0.9\pm1.96\cdot0.0671 = [0.769, 1.031]$, which exceeds $1$ and is centred too high.
:::
:::

::: exercise Answer resampling {level=1 check="0.0180"}
A model has overall accuracy $0.5$ on $400$ questions, with $\Var_x(\mu_x) = 0.10$. Using [[#eq-two-sources]], compute the standard error of its score with $K = 5$ samples per question (four decimal places).
::: solution
$\E_x[\mu_x(1 - \mu_x)] = 0.25 - 0.10 = 0.15$, so $\Var(\hat\mu) = (0.10 + 0.15/5)/400 = 0.13/400$, and the standard error is $\sqrt{0.000325} = 0.0180$.
:::
:::

::: exercise A design effect {level=1 check="2.2"}
Questions come in clusters of $5$ with within-cluster correlation $0.3$. What is the design effect of [[#eq-design-effect]]? How many independent questions is a $1{,}000$-question benchmark worth?
::: solution
$1 + 4\cdot0.3 = 2.2$; effective size $1000/2.2\approx455$.
:::
:::

::: exercise Unpaired sample size {level=2 check="1091"}
How many questions per model are needed to detect an accuracy difference between $75\%$ and $80\%$ with independent question sets, at $\alpha = 0.05$ two-sided and $80\%$ power? Use $z_{0.975} + z_{0.8} = 2.8016$ and round up.
::: solution
$2.8016^2(0.75\cdot0.25 + 0.8\cdot0.2)/0.05^2 = 7.849\cdot0.3475/0.0025 = 1091.0$; rounding up, $1{,}091$ questions per model.
:::
:::

::: exercise Paired sample size {level=2 check="1039"}
Two models will be compared on shared questions. You expect a difference of $\delta = 0.03$ and a discordant fraction of $0.12$. How many questions are needed for $80\%$ power at $\alpha = 0.05$, by [[#eq-n-paired]]?
::: solution
$7.849\cdot(0.12 - 0.0009)/0.0009 = 7.849\cdot132.33 = 1038.7$, so $1{,}039$ questions.
:::
:::

::: exercise An exact McNemar test {level=2 check="0.0352"}
On a shared set, model A alone is right on $12$ questions and model B alone on $3$. Compute the exact two-sided McNemar $p$-value to four decimal places.
::: solution
Under the null hypothesis, $b\sim\Bin(15, \frac12)$. $\Prob(b\ge12) = (\binom{15}{12} + \binom{15}{13} + \binom{15}{14} + \binom{15}{15})/2^{15} = (455 + 105 + 15 + 1)/32768 = 0.01758$, and the two-sided $p$-value is twice this, $0.0352$. The $\chi^2$ approximation, $(12 - 3)^2/15 = 5.4$ with $p = 0.020$, is optimistic with so few discordant questions.
:::
:::

::: exercise Template-level variance {level=2 check="0.609"}
Two models are compared under $5$ prompt templates. Their accuracy differences, in percentage points, are $2.1, -0.5, 1.4, 3.0, 0.5$. Estimate the mean difference and its standard error by [[#prop-prompts]] (three decimal places), and say whether the data support a positive difference.
::: solution
The mean is $1.3$ points. The sample standard deviation is $1.362$, so the standard error is $1.362/\sqrt5 = 0.609$ points. With $4$ degrees of freedom, $t_{0.975} = 2.776$ and the $95\%$ interval is $1.3\pm1.69 = [-0.39, 2.99]$: consistent with no difference across templates, even if each template's paired test on many questions were significant.
:::
:::

::: exercise The cluster bootstrap {level=3}
Implement a **cluster bootstrap** for the benchmark of [[#sec-clusters]]: resample passages with replacement (keeping all questions of each), recompute the accuracy, and take the standard deviation over $1{,}000$ resamples. Compare it with the naive bootstrap that resamples questions and with the two standard errors of the listing.
::: solution
```python
import math, random

rng = random.Random(12)
sig = lambda z: 1 / (1 + math.exp(-z))
data = {}
for c in range(100):                                  # 100 passages, 10 questions each
    u = rng.gauss(0, 1.5)
    data[c] = [int(rng.random() < sig(0.5 + u)) for _ in range(10)]
flat = [s for qs in data.values() for s in qs]
n = len(flat)

def sd(xs):
    m = sum(xs) / len(xs)
    return math.sqrt(sum((x - m) ** 2 for x in xs) / (len(xs) - 1))

naive = [sum(flat[rng.randrange(n)] for _ in range(n)) / n for _ in range(1000)]
keys = list(data)
cluster = []
for _ in range(1000):
    picked = [data[keys[rng.randrange(len(keys))]] for _ in keys]
    cluster.append(sum(map(sum, picked)) / sum(map(len, picked)))
mean = sum(flat) / n
se_cl = math.sqrt(sum(sum(s - mean for s in qs) ** 2 for qs in data.values())) / n
print(f"accuracy {mean:.3f}")
print(f"question bootstrap SE {sd(naive):.4f}, binomial SE {math.sqrt(mean * (1 - mean) / n):.4f}")
print(f"cluster bootstrap SE  {sd(cluster):.4f}, cluster-robust SE {se_cl:.4f}")
```

```text
accuracy 0.586
question bootstrap SE 0.0155, binomial SE 0.0156
cluster bootstrap SE  0.0305, cluster-robust SE 0.0310
```

Resampling questions reproduces the naive binomial standard error, and so inherits its error; resampling passages reproduces the cluster-robust standard error of [[#eq-cluster-se]]. The bootstrap is only as good as its assumption about what is independent.
:::
:::

::: exercise Power under clustering {level=3}
Combine [[#prop-power]] and [[#prop-cluster]]: a paired comparison on a benchmark with clusters of size $m$ and within-cluster correlation $\rho_d$ of the per-question differences needs how many questions? Evaluate for the paired example of the listing in [[#sec-power]] ($\delta = 0.02$, discordant fraction $0.15$) with $m = 5$ and $\rho_d = 0.2$, and discuss what this implies for building benchmarks.
::: solution
Clustering multiplies the variance of $\bar d$ by $1 + (m - 1)\rho_d$, so the required number of questions is multiplied by the same design effect: $n = (z_{1-\alpha/2} + z_{1-\beta})^2(\pi_{\text{disc}} - \delta^2)(1 + (m - 1)\rho_d)/\delta^2$. With the numbers given, the design effect is $1 + 4\cdot0.2 = 1.8$, and $2936\cdot1.8\approx5{,}285$ questions (about $1{,}057$ passages). For benchmark builders this means that many questions per passage, template or task are worth much less than the same number of independent items: for a fixed budget, more passages with fewer questions each give more precision, and benchmarks should record their cluster structure so that users can compute correct standard errors.
:::
:::
