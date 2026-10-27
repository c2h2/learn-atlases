Twelve participants try a new touchpad and the old mouse. The mouse's mean throughput is 4.38 bits/s, the touchpad's 4.13. Analysed as two independent groups of numbers, the difference is far from significant ($p = 0.21$), and the team concludes that the devices perform the same. Analysed correctly — the *same* twelve people used both devices, and every one of them was faster with the mouse — the difference is overwhelming ($p \approx 10^{-5}$). Same data, opposite conclusions; the only change is whether the analysis respects how the experiment was designed. At web scale the failures are different but just as easy to commit: an online test that is checked every day and stopped as soon as it looks significant will "find" an effect where none exists about a third of the time.

[[hci/usability-evaluation]] was about finding problems; this chapter is about answering **comparative** questions — is design A faster, more accurate or more satisfying than design B? — with known risks of being wrong. We design **controlled experiments**: choose variables and hypotheses, decide between within- and between-subjects designs, and counterbalance order with balanced Latin squares. We analyse them with **paired** and **Welch's** $t$-tests, implemented in pure Python, together with effect sizes, confidence intervals and power. Finally we scale up to **online controlled experiments** (A/B tests) and their pitfalls: sample sizes for small effects, sample ratio mismatch, peeking, novelty effects and ethics. The probability and statistics are taught in Maths Atlas — [hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing) and [confidence intervals](/learn/maths/lesson.php?c=statistics&l=confidence-intervals) — and used here.

## Designing an experiment

::: definition Variables and hypotheses {#def-variables}
In a controlled experiment the experimenter manipulates one or more **independent variables** (factors), each with two or more **levels** (conditions) — for instance, input device with levels mouse and touchpad — and measures one or more **dependent variables** — throughput, error rate, satisfaction. **Control variables** are held constant (the task, the display, the instructions). A **confounding variable** varies systematically with an independent variable and offers an alternative explanation of the results. The **null hypothesis** $H_0$ states that the independent variable has no effect on the dependent variable; the **alternative** $H_1$ that it does.
:::

The defining feature of an experiment, as opposed to an observational study, is that the experimenter *assigns* conditions — and assigns them so that confounds are broken. Classic confounds in HCI: the new design is tested by enthusiastic early adopters and the old one by everyone else (participant confound); the new design is always tried second, when participants have learned the task (order confound); the new design has more practice trials, a better screen, or a more encouraging experimenter.

Experiments trade **internal validity** — confidence that the independent variable caused the observed difference — against **external validity** — confidence that the result generalises to real users, tasks and settings. A tightly controlled laboratory pointing task has high internal validity and says little about real office work; a field deployment is the reverse. Good research programmes use both.

### Within or between subjects

::: definition Within- and between-subjects designs {#def-designs}
In a **between-subjects** design each participant experiences exactly one condition, and conditions are compared across different groups of participants, assigned at random. In a **within-subjects** (repeated-measures) design each participant experiences every condition, and conditions are compared within participants.
:::

Within-subjects designs need fewer participants and are much more sensitive, because each participant serves as their own control: the large differences *between* people (some are simply faster at everything) cancel out. The price is **order effects**: practice (people get better at the task), fatigue (worse), and transfer (a strategy learned with one design carries over to the next). Between-subjects designs avoid order effects entirely and are necessary when exposure to one condition would contaminate another — two ways of teaching the same concept, or two versions of a website that a person would recognise — but they need many more participants. The sensitivity gain has a precise form.

::: proposition Variance of a paired difference {#prop-paired-variance}
Let a participant's scores in two conditions be random variables $X$ and $Y$ with variances $\sigma_X^2$, $\sigma_Y^2$ and correlation $\rho$. Then

$$
\Var(X - Y) = \sigma_X^2 + \sigma_Y^2 - 2\rho\,\sigma_X\sigma_Y.
$$

With $n$ participants per condition, the variance of the estimated mean difference is $\Var(X-Y)/n$ in a within-subjects design and $(\sigma_X^2 + \sigma_Y^2)/n$ in a between-subjects design with $n$ different participants in each group. When $\sigma_X = \sigma_Y = \sigma$, the ratio of these variances is $1 - \rho$.
:::

::: proof
By bilinearity of covariance, $\Var(X - Y) = \Var X + \Var Y - 2\Cov(X, Y)$ and $\Cov(X, Y) = \rho\sigma_X\sigma_Y$. The mean of $n$ independent paired differences has variance $\Var(X - Y)/n$. In the between-subjects design the two group means are independent, each with variance $\sigma^2/n$ (writing the general case as $\sigma_X^2/n$ and $\sigma_Y^2/n$), so their difference has variance $(\sigma_X^2 + \sigma_Y^2)/n$. With equal variances the ratio is $(2\sigma^2 - 2\rho\sigma^2)/(2\sigma^2) = 1 - \rho$.
:::

In pointing and text-entry studies the correlation between a participant's scores on two devices is often 0.8 or higher, so a within-subjects design can reduce the variance of the comparison by a factor of five or more — equivalent to five times as many participants.

### Counterbalancing

To prevent order effects from masquerading as condition effects, the order of conditions is **counterbalanced**: varied across participants so that each condition appears equally often in each position. With $k$ conditions, using all $k!$ orders is impractical beyond three or four. A **Latin square** — a $k \times k$ arrangement in which each condition appears once in each row (participant group) and each column (position) — balances positions with only $k$ orders. But a simple cyclic square ($ABCD$, $BCDA$, $CDAB$, $DABC$) always has $B$ immediately after $A$, so if experience with $A$ helps or hurts $B$, the effect is confounded. A **balanced** Latin square also balances which condition immediately precedes which.

::: algorithm Balanced Latin square (Williams design) {#alg-balanced-latin}
For an even number of conditions $k$, labelled $0, \dots, k-1$:

1. Form the first row $0, 1, k-1, 2, k-2, 3, k-3, \dots$ — alternately the next lowest and next highest unused label, ending after $k$ entries.
2. For $r = 1, \dots, k - 1$, row $r$ is the first row with $r$ added to every entry modulo $k$.

Assign participants to the $k$ rows in equal numbers. (For odd $k$, use this square together with its mirror image, giving $2k$ rows.)
:::

::: proposition The Williams square is balanced {#prop-williams}
For even $k$, the square of [[#alg-balanced-latin]] is a Latin square, and each ordered pair $(a, b)$ of distinct conditions occurs as adjacent entries "$a$ then $b$" in exactly one row.
:::

::: proof
The first row lists $0$ and then $1, k-1, 2, k-2, \dots, k/2$, which is every label exactly once. Adding $r$ modulo $k$ is a bijection, so every row contains every label once. In column $j$, the entries are $f_j + r$ for $r = 0, \dots, k-1$, where $f_j$ is the first-row entry, which runs through every label once; so every column contains every label once.

For adjacency, look at the differences $\delta_j = f_{j+1} - f_j \bmod k$ between consecutive first-row entries, $j = 0, \dots, k-2$. They are $1, -2, 3, -4, \dots, \pm(k-1)$, that is $1, k-2, 3, k-4, \dots, k-1$ modulo $k$ — the odd numbers $1, 3, \dots, k-1$ and the even numbers $k-2, k-4, \dots, 2$, each once: every nonzero residue exactly once. Adding $r$ to a row does not change these differences. Now take $a \ne b$ and let $\delta = b - a \bmod k \ne 0$. There is exactly one position $j$ with $\delta_j = \delta$, and exactly one row $r$ with $f_j + r \equiv a$; in that row positions $j, j+1$ hold $a, b$. In any other row or position the pair is not $(a, b)$, because either the difference or the first element is wrong. So $(a, b)$ is adjacent exactly once.
:::

::: example Four interface conditions {#ex-latin}
Generate and check a balanced Latin square for four conditions $A$–$D$.
::: solution
```python
def balanced_latin_square(n):
    """Williams design for even n: row r is the first row plus r (mod n)."""
    first, lo, hi = [0], 1, n - 1
    while len(first) < n:            # 0, 1, n-1, 2, n-2, ...
        first.append(lo); lo += 1
        if len(first) < n:
            first.append(hi); hi -= 1
    return [[(x + r) % n for x in first] for r in range(n)]

def check(square):
    n = len(square)
    latin = all(sorted(row) == list(range(n)) for row in square) and \
            all(sorted(col) == list(range(n)) for col in zip(*square))
    pairs = [(row[j], row[j + 1]) for row in square for j in range(n - 1)]
    each_once = len(pairs) == len(set(pairs)) == n * (n - 1)
    return latin, each_once

sq = balanced_latin_square(4)
for row in sq:
    print(" ".join("ABCD"[x] for x in row))
print(check(sq))
print([check(balanced_latin_square(n)) for n in (2, 6, 8, 10)])
```

```console
$ python3 latin.py
A B D C
B C A D
C D B A
D A C B
(True, True)
[(True, True), (True, True), (True, True), (True, True)]
```

Each condition appears once in each position, and each of the $4 \times 3 = 12$ ordered pairs (such as $A \to B$, $B \to A$) is adjacent exactly once, as [[#prop-williams]] proves. With 12 participants, assign three to each row. Counterbalancing *balances* order effects across conditions; it does not remove them, and if learning is strong it inflates the variance — practice trials before measurement help.
:::
:::

## Analysing the results: $t$-tests

For a dependent variable measured on an interval scale (times, throughput, error rates averaged over many trials) and two conditions, the workhorse analysis is the $t$-test; its version must match the design.

::: definition Paired and Welch $t$-tests {#def-t-tests}
**Paired $t$-test** (within subjects). Let $d_i = x_i - y_i$ be participant $i$'s difference between conditions, $i = 1, \dots, n$, with mean $\bar d$ and sample standard deviation $s_d$. The statistic

$$
t = \frac{\bar d}{s_d/\sqrt n}
$$ {#eq-paired-t}

has, under $H_0$ (mean difference 0) and if the $d_i$ are independent and approximately normal, a Student $t$ distribution with $n - 1$ degrees of freedom.

**Welch's $t$-test** (between subjects). For independent samples of sizes $n_1, n_2$ with means $\bar x_1, \bar x_2$ and variances $s_1^2, s_2^2$, let $v_j = s_j^2/n_j$. The statistic

$$
t = \frac{\bar x_1 - \bar x_2}{\sqrt{v_1 + v_2}}
$$ {#eq-welch-t}

is approximately $t$-distributed under $H_0$ with $\nu = (v_1 + v_2)^2 / \bigl(v_1^2/(n_1 - 1) + v_2^2/(n_2 - 1)\bigr)$ degrees of freedom (the Welch–Satterthwaite approximation). Welch's test does not assume equal variances and is generally preferred to the classical pooled two-sample $t$-test.
:::

The **$p$-value** is the probability, computed assuming $H_0$, of a statistic at least as extreme as the one observed; for a two-sided test, $p = \Prob(\lvert T\rvert \ge \lvert t\rvert)$. Computing it needs the $t$ distribution's tail, which can be written with the regularised incomplete beta function: for $T \sim t_\nu$, $\Prob(\lvert T\rvert \ge t) = I_{\nu/(\nu + t^2)}(\nu/2, 1/2)$. Python's standard library has no $t$ distribution, so we implement it.

::: example Mouse against touchpad {#ex-ttest}
Twelve participants each used a mouse and a touchpad, in counterbalanced order; their throughputs (bits/s; illustrative data) were

| participant | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| mouse | 4.6 | 3.9 | 5.1 | 4.2 | 4.8 | 3.6 | 4.4 | 5.0 | 4.1 | 3.8 | 4.7 | 4.3 |
| touchpad | 4.3 | 3.7 | 4.8 | 3.9 | 4.6 | 3.3 | 4.4 | 4.6 | 3.8 | 3.6 | 4.3 | 4.2 |

Analyse the data correctly, and then incorrectly as if the groups were independent.
::: solution
```python
from math import lgamma, exp, log, sqrt
from statistics import mean, stdev

def betainc(a, b, x):
    """Regularised incomplete beta I_x(a, b), by Lentz's continued fraction."""
    if x <= 0 or x >= 1:
        return 0.0 if x <= 0 else 1.0
    if x > (a + 1) / (a + b + 2):                 # symmetry for fast convergence
        return 1.0 - betainc(b, a, 1 - x)
    front = exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * log(x) + b * log(1 - x)) / a
    f, c, d = 1.0, 1.0, 0.0
    for i in range(400):
        m = i // 2
        if i == 0:
            num = 1.0
        elif i % 2 == 0:
            num = m * (b - m) * x / ((a + 2 * m - 1) * (a + 2 * m))
        else:
            num = -(a + m) * (a + b + m) * x / ((a + 2 * m) * (a + 2 * m + 1))
        d = 1.0 / (1.0 + num * d or 1e-300)
        c = (1.0 + num / c) or 1e-300
        f *= c * d
        if abs(1.0 - c * d) < 1e-14:
            break
    return front * (f - 1.0)

def t_p(t, df):
    """Two-sided p-value for Student's t with df degrees of freedom."""
    return betainc(df / 2, 0.5, df / (df + t * t))

mouse    = [4.6, 3.9, 5.1, 4.2, 4.8, 3.6, 4.4, 5.0, 4.1, 3.8, 4.7, 4.3]
touchpad = [4.3, 3.7, 4.8, 3.9, 4.6, 3.3, 4.4, 4.6, 3.8, 3.6, 4.3, 4.2]
n = len(mouse)
diff = [m - t for m, t in zip(mouse, touchpad)]
d_bar, s_d = mean(diff), stdev(diff)
t1 = d_bar / (s_d / sqrt(n))
print(f"paired: mean diff {d_bar:.3f}, t({n-1}) = {t1:.3f}, p = {t_p(t1, n-1):.2g}, d_z = {d_bar/s_d:.2f}")
half = 2.200985 * s_d / sqrt(n)                  # t quantile 0.975 with 11 df
print(f"        95% CI {d_bar - half:.3f} to {d_bar + half:.3f}")
v1, v2 = stdev(mouse) ** 2 / n, stdev(touchpad) ** 2 / n
t2 = (mean(mouse) - mean(touchpad)) / sqrt(v1 + v2)
df = (v1 + v2) ** 2 / (v1 ** 2 / (n - 1) + v2 ** 2 / (n - 1))
print(f"Welch (wrong here): t({df:.1f}) = {t2:.3f}, p = {t_p(t2, df):.2g}")
print(f"check: t_p(2.262157, 9) = {t_p(2.262157, 9):.4f}")
```

```console
$ python3 ttest.py
paired: mean diff 0.250, t(11) = 7.416, p = 1.3e-05, d_z = 2.14
        95% CI 0.176 to 0.324
Welch (wrong here): t(22.0) = 1.302, p = 0.21
check: t_p(2.262157, 9) = 0.0500
```

The last line checks the implementation against a tabulated value: $t_{9,\,0.025} = 2.262$. Every participant but one was faster with the mouse (participant 7 tied), by between 0 and 0.4 bits/s, so the paired differences are small but very consistent: $t(11) = 7.42$, $p \approx 1.3 \times 10^{-5}$, and the 95% confidence interval for the mean advantage of the mouse is 0.18 to 0.32 bits/s. Welch's test ignores the pairing; it sees two overlapping clouds of numbers whose spread is dominated by differences between people (the scores' correlation across devices is 0.97), and finds nothing. By [[#prop-paired-variance]] the paired analysis has about $1 - 0.97 = 0.03$ times the variance. Report the design, the test, $t$ with its degrees of freedom, $p$, the effect size and the confidence interval — and the data, if you can.
:::
:::

::: widget distribution
dist: t
params: df=11
a: -2.201
b: 2.201
normal: true
caption: The $t$ distribution with 11 degrees of freedom, the null distribution of the paired statistic in [[#ex-ttest]], with the central 95% between $\pm 2.201$ shaded and the standard normal overlaid. The observed $t = 7.42$ lies far off the right of the plot. Reduce the degrees of freedom: the tails get heavier and the critical value moves out, which is why small samples need larger $t$ to reach significance.
:::

### Effect sizes, intervals and power

A $p$-value says how surprising the data would be if there were no effect; it does not say how big the effect is or whether it matters. Report an **effect size** in the units of the measure (0.25 bits/s, 6% faster) with a **confidence interval**, and a standardised effect size when comparing across studies: **Cohen's $d$**, the difference in means divided by the (pooled) standard deviation for between-subjects designs, or $d_z = \bar d/s_d$ for paired designs. Jacob Cohen's labels of 0.2, 0.5 and 0.8 as "small", "medium" and "large" were offered as rough conventions for the behavioural sciences, not as universal standards.

::: proposition Sample size for a two-group comparison {#prop-power}
To detect a true standardised difference $d$ between two independent groups with a two-sided test at significance level $\alpha$ and power $1 - \beta$, the normal approximation requires about

$$
n = \frac{2\,(z_{1-\alpha/2} + z_{1-\beta})^2}{d^2}
$$ {#eq-power}

participants per group, where $z_q$ is the standard normal $q$-quantile. For a paired design with standardised effect $d_z$, about $n = (z_{1-\alpha/2} + z_{1-\beta})^2 / d_z^2$ participants in total.
:::

::: proof
With $n$ per group and common standard deviation $\sigma$, the difference in means $\hat\Delta$ is approximately normal with mean $\Delta = d\sigma$ and standard deviation $\sigma\sqrt{2/n}$. The test rejects when $\lvert\hat\Delta\rvert/(\sigma\sqrt{2/n}) > z_{1-\alpha/2}$. Ignoring the negligible chance of rejecting in the wrong direction, the power is $\Prob\bigl(\hat\Delta > z_{1-\alpha/2}\sigma\sqrt{2/n}\bigr) = \Phi\bigl(d\sqrt{n/2} - z_{1-\alpha/2}\bigr)$. Setting this equal to $1 - \beta$ gives $d\sqrt{n/2} - z_{1-\alpha/2} = z_{1-\beta}$, which rearranges to [[#eq-power]]. For the paired design the mean difference has standard deviation $\sigma_d/\sqrt n$, and the same argument with $d_z = \Delta/\sigma_d$ gives $d_z\sqrt n = z_{1-\alpha/2} + z_{1-\beta}$.
:::

With $\alpha = 0.05$ and power $0.8$, $(1.960 + 0.842)^2 \approx 7.85$. A "medium" effect $d = 0.5$ needs about $2 \times 7.85/0.25 \approx 63$ participants per group — 126 in all — whereas a paired design with $d_z = 0.5$ needs about $7.85/0.25 \approx 32$ (a couple more with the exact $t$ distribution). Many HCI studies use 12 to 24 participants; they can detect only large effects, and a non-significant result from them is weak evidence of *no* effect.

::: example Planning a menu study {#ex-plan}
A team expects a new menu to save about 0.3 s per selection. From a pilot, selection times vary between people with a standard deviation of about 1.0 s, but each person's *difference* between two menus varies with a standard deviation of only about 0.5 s. How many participants are needed for 80% power at $\alpha = 0.05$ in a between-subjects and in a within-subjects design?
::: solution
Between subjects, the standardised effect is $d = 0.3/1.0 = 0.3$, so by [[#eq-power]] $n = 2 \times 7.849/0.09 \approx 174.4$: **175 per group**, 350 participants. Within subjects, $d_z = 0.3/0.5 = 0.6$, so $n = 7.849/0.36 \approx 21.8$: about **22 participants** (24 to allow for the $t$ distribution and to fill a $4 \times 4$ balanced Latin square with whole groups). The fifteenfold difference is [[#prop-paired-variance]] at work: the pilot's two standard deviations imply a correlation of $\rho = 1 - 0.5^2/(2 \times 1.0^2) = 0.875$ between a person's times with the two menus. The plan depends heavily on the pilot's standard deviations, which are themselves uncertain from a small pilot — a reason to plan conservatively.
:::
:::

::: warning "$p = 0.21$, so the designs perform the same"
A non-significant result means the data are compatible with no effect; it does not show that there is no effect — they may equally be compatible with a large one. Look at the confidence interval: if it runs from "much worse" to "much better", the study was simply too small. To claim equivalence, define the smallest difference that matters and show that the confidence interval lies inside it (equivalence testing). Equally, $p < 0.05$ is not the probability that the hypothesis is true, and a tiny $p$ with a negligible effect size (common in large samples) is not an important finding. And testing many measures, subgroups or analysis choices until one gives $p < 0.05$ — **$p$-hacking** — makes false positives near-certain; decide the analysis in advance and, where possible, preregister it.
:::

### Beyond two means

More than two conditions, or several factors, call for analysis of variance (ANOVA) and its repeated-measures form, followed by corrected pairwise comparisons; each additional test at $\alpha = 0.05$ adds false-positive risk, and the **Bonferroni** correction (testing each of $m$ comparisons at $\alpha/m$) is the simplest remedy. Data that are far from normal — counts of rare errors, task times with long tails — are often analysed on a log scale or with non-parametric tests such as the Wilcoxon signed-rank test (paired) or Mann–Whitney (independent). Ratings from **Likert** items are ordinal; their analysis is debated, and Maurits Kaptein, Clifford Nass and Panos Markopoulos (CHI 2010) argued for non-parametric methods appropriate to the design. A full treatment is in Lazar, Feng and Hochheiser's *Research Methods in Human–Computer Interaction* and MacKenzie's *Human–Computer Interaction: An Empirical Research Perspective*. The deeper problem is replication: Kasper Hornbæk and colleagues ("Is once enough?", CHI 2014) found that only a small percentage of HCI studies they examined were replications of earlier work, so many published findings rest on a single small study.

::: quiz
A study compares two menu designs with 16 participants in a within-subjects design and reports "Design B was faster (Welch's $t(29.8) = 1.6$, $p = 0.12$), so there is no difference." What should a reviewer ask for? (Select all that apply.)
- [x] A paired analysis, since every participant used both designs.
- [x] The mean difference with a confidence interval, rather than a verdict of "no difference".
- [x] Information on how the order of designs was counterbalanced.
- [ ] A larger significance level, such as 0.10, so that the result becomes significant.
::: solution
The Welch test throws away the pairing and its sensitivity ([[#prop-paired-variance]]); a non-significant result is not evidence of no difference, and a confidence interval shows what effects remain plausible; and without counterbalancing, order effects could hide or create a difference ([[#alg-balanced-latin]]). Changing $\alpha$ after seeing the data is $p$-hacking.
:::
:::

## Online controlled experiments

Web and app companies run thousands of experiments a year in which live traffic is randomly split between a **control** and one or more **treatments**. Ron Kohavi, Diane Tang and Ya Xu's *Trustworthy Online Controlled Experiments* (2020) is the standard practical reference.

::: definition A/B test {#def-ab-test}
An **A/B test** (online controlled experiment) randomly assigns each **unit** — usually a user, identified by a cookie or account — to a variant, consistently over the experiment's duration, and compares a pre-specified **overall evaluation criterion** (OEC), such as conversion rate or sessions per user, between variants, together with **guardrail metrics** (latency, errors, unsubscribes) that must not get worse.
:::

Random assignment of very many users gives A/B tests great internal validity: any difference in the OEC beyond chance is caused by the change. But the effects being sought are often tiny, which makes sample sizes enormous.

::: example Sizing a conversion test {#ex-ab}
A checkout converts 5.0% of visitors. A redesign is worth deploying if it raises conversion to 5.5% (a 10% relative improvement). How many users per variant are needed for 80% power at $\alpha = 0.05$? Also: the experiment platform was configured for a 50/50 split but delivered 50,600 users to the treatment and 49,400 to control. Should you trust the results? And how often does an A/A test (no real difference) look significant if checked repeatedly and stopped at the first $p < 0.05$?
::: solution
For proportions, the analogue of [[#eq-power]] uses the binomial variances: $n = \bigl(z_{1-\alpha/2}\sqrt{2\bar p(1-\bar p)} + z_{1-\beta}\sqrt{p_1(1-p_1) + p_2(1-p_2)}\bigr)^2/(p_2 - p_1)^2$. A **sample ratio mismatch** (SRM) is checked with a chi-square goodness-of-fit test against the configured split. The peeking question we answer by simulation.

```python
from math import sqrt, erfc, ceil
import random

def norm_two_sided_p(z):
    return erfc(abs(z) / sqrt(2))

# Sample size per arm to detect 5.0% -> 5.5% with alpha = 0.05 (two-sided), power 0.8.
p1, p2 = 0.050, 0.055
za, zb = 1.959964, 0.841621
pbar = (p1 + p2) / 2
n = (za * sqrt(2 * pbar * (1 - pbar)) + zb * sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2 / (p2 - p1) ** 2
print(f"users per arm: {ceil(n)}")

# Sample ratio mismatch: a 50/50 split delivered 50,600 vs 49,400 users.
a, b = 50_600, 49_400
e = (a + b) / 2
chi2 = (a - e) ** 2 / e + (b - e) ** 2 / e
print(f"SRM chi-square = {chi2:.1f}, p = {erfc(sqrt(chi2 / 2)):.2g}")

# Peeking: an A/A test (no true difference) checked after every 200 users per arm.
rng = random.Random(1)
def aa_test(p=0.05, step=200, looks=50, peek=True):
    xa = xb = n = 0
    for _ in range(looks):
        xa += sum(rng.random() < p for _ in range(step))
        xb += sum(rng.random() < p for _ in range(step))
        n += step
        if peek or n == step * looks:
            pa, pb = xa / n, xb / n
            pp = (xa + xb) / (2 * n)
            z = (pa - pb) / sqrt(pp * (1 - pp) * 2 / n)
            if norm_two_sided_p(z) < 0.05:
                return True          # declared a "significant" difference
    return False
runs = 1000
print(f"false positives, one look at the end: {sum(aa_test(peek=False) for _ in range(runs)) / runs:.3f}")
print(f"false positives, stop at first p<0.05: {sum(aa_test(peek=True) for _ in range(runs)) / runs:.3f}")
```

```console
$ python3 ab.py
users per arm: 31234
SRM chi-square = 14.4, p = 0.00015
false positives, one look at the end: 0.053
false positives, stop at first p<0.05: 0.310
```

About **31,000 users per variant** are needed to detect a half-point change in a 5% rate — numbers that only large services have, which is why small sites cannot meaningfully A/B test small changes. The split of 50,600 to 49,400 is wildly unlikely under a true 50/50 assignment ($\chi^2 = 14.4$ with 1 degree of freedom, $p \approx 0.00015$): something — a redirect that loses some users, a bot filter, a crash in one variant — is removing users non-randomly, and the comparison is no longer between equivalent groups. Kohavi and colleagues advise not trusting any result with an SRM until its cause is found. Finally, with 50 looks and stopping at the first $p < 0.05$, an A/A test is declared "significant" 31% of the time instead of 5%: repeated testing gives chance many opportunities. Fix the sample size in advance, or use methods designed for continuous monitoring (sequential tests, always-valid $p$-values).
:::
:::

Other well-documented pitfalls: **novelty and primacy effects** (users click a changed button because it is new, or resist it because it is unfamiliar, so short tests misjudge long-term effects); **interference** between units (in social networks or two-sided marketplaces, treating one user affects others, violating the independence that the statistics assume); **metric choice** (optimising clicks can reduce satisfaction or long-term retention, so the OEC must reflect long-term value); and **Twyman's law** — any figure that looks interesting or different is usually wrong — which Kohavi and colleagues invoke as a reason to investigate surprising results for bugs before celebrating them.

A/B tests are experiments on people, and the ethics of research apply. In 2014, Adam Kramer, Jamie Guillory and Jeffrey Hancock published in *PNAS* a study in which Facebook reduced the proportion of positive or negative posts in about 689,000 users' news feeds for a week and measured the emotional tone of what those users posted. The effect sizes were very small, but the study provoked widespread criticism because users had not given informed consent beyond the platform's terms of service, and the journal published an editorial expression of concern. The episode prompted many organisations to set up review processes for experiments, distinguishing routine product tests from manipulations that could harm users' wellbeing — a theme of [[hci/accessibility-ethics]].

::: history
Ronald Fisher's *The Design of Experiments* (1935) established randomisation, replication and blocking as the foundation of experimental science; William Gosset ("Student") had published the $t$ distribution in 1908, and Bernard Welch his unequal-variances test in 1947. Evan Williams constructed balanced Latin squares in 1949. Experimental psychology brought these methods into human factors, and Card, English and Burr's 1978 comparison of pointing devices was an early controlled experiment in HCI. Jacob Cohen's *Statistical Power Analysis for the Behavioral Sciences* (1969, 2nd ed. 1988) made power and effect sizes standard. Online controlled experiments grew at web companies in the 2000s; Kohavi and colleagues' "Practical guide to controlled experiments on the web" (KDD 2007) and *Trustworthy Online Controlled Experiments* (2020) codified the practice, while the replication crisis in psychology of the 2010s pushed HCI towards preregistration, effect sizes and open data.
:::

## Where this leads

Experiments test the predictions of [[hci/human-factors]] and [[hci/interaction-techniques]] and the summative claims of [[hci/usability-evaluation]]. Their ethics — consent, harm and manipulation at scale — continue in [[hci/accessibility-ethics]]. The probability behind every test here is developed in Maths Atlas ([hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing)), and the evaluation of machine-learning systems, which raises related questions, in the [LLM Atlas](/learn/llm/).

::: summary
- An experiment manipulates **independent variables**, measures **dependent variables** and breaks **confounds** by random assignment and control ([[#def-variables]]).
- **Within-subjects** designs reduce the variance of a comparison by the factor $1 - \rho$ ([[#prop-paired-variance]]) at the price of order effects; **between-subjects** designs avoid order effects but need many more participants ([[#def-designs]]).
- Counterbalance with a **balanced Latin square** ([[#alg-balanced-latin]]), in which each condition appears once per position and follows each other exactly once ([[#prop-williams]]).
- Match the test to the design: **paired $t$** for within, **Welch's $t$** for between ([[#def-t-tests]]); analysing paired data as independent can turn $p \approx 10^{-5}$ into $p = 0.21$ ([[#ex-ttest]]).
- Report effect sizes with confidence intervals; plan sample size for power ([[#prop-power]]): $d = 0.5$ needs about 63 per group, or about 32 paired.
- Non-significance is not evidence of no effect; $p$-hacking and multiple comparisons inflate false positives.
- **A/B tests** ([[#def-ab-test]]) need large samples for small effects, checks for **sample ratio mismatch**, fixed horizons instead of **peeking** (31% false positives in [[#ex-ab]]), attention to novelty and interference, and ethical review.
:::

## Exercises

::: exercise Identify the variables {level=1}
A study asks 20 participants to enter text with two keyboard layouts on a tablet, in counterbalanced order, measuring words per minute and error rate, with the same phrases and the same tablet. Name the independent variable and its levels, the dependent variables, two control variables and the design.
::: solution
Independent variable: keyboard layout, with two levels. Dependent variables: entry rate (wpm) and error rate ([[hci/interaction-techniques#def-text-entry]]). Control variables: the phrases, the tablet (screen size, sensitivity), posture and instructions. Design: within-subjects ([[#def-designs]]), counterbalanced — half the participants use layout A first.
:::
:::

::: exercise A paired statistic {level=1 check="4"}
Nine participants' differences between two conditions have mean 2 and standard deviation 1.5. What is the paired $t$ statistic? (Enter the number.)
::: solution
By [[#eq-paired-t]], $t = 2/(1.5/\sqrt 9) = 2/0.5 = 4$, with 8 degrees of freedom.
:::
:::

::: exercise Variance reduction {level=1 check="0.2"}
Two conditions have equal variances, and participants' scores in them have correlation 0.8. By what factor does a within-subjects design multiply the variance of the estimated difference, compared with a between-subjects design with the same number of participants per condition? (Enter the factor.)
::: solution
By [[#prop-paired-variance]], $1 - \rho = 0.2$. The within-subjects design needs only about a fifth as many participants per condition for the same precision.
:::
:::

::: exercise Participants for a medium effect {level=2 check="63"}
Using [[#eq-power]] with $z_{0.975} = 1.960$ and $z_{0.8} = 0.8416$, how many participants per group are needed to detect $d = 0.5$ with 80% power in a between-subjects design? (Enter the smallest whole number.)
::: solution
$n = 2(1.960 + 0.8416)^2/0.5^2 = 2 \times 7.849/0.25 \approx 62.8$, so 63 per group. (The exact calculation with the $t$ distribution gives 64.)
:::
:::

::: exercise Sample ratio mismatch {level=2}
An experiment intended to split users 50/50 recorded 10,120 in control and 9,880 in treatment. Compute the chi-square statistic and its $p$-value (with 1 degree of freedom, $p = \operatorname{erfc}(\sqrt{\chi^2/2})$), and decide whether there is a mismatch. Is a mismatch of the same *proportion* more or less worrying with ten times as many users?
::: solution
Expected 10,000 each; $\chi^2 = 2 \times 120^2/10{,}000 = 2.88$, and $p = \operatorname{erfc}(\sqrt{1.44}) = \operatorname{erfc}(1.2) \approx 0.090$. That is not strong evidence of a mismatch (Kohavi and colleagues suggest a threshold such as $p < 0.001$ for SRM alarms, since the check is run on every experiment). With ten times as many users and the same 50.6/49.4 split, $\chi^2 = 28.8$ and $p \approx 8 \times 10^{-8}$: a clear mismatch. The same proportional imbalance is far more significant in a larger sample, because chance imbalance shrinks like $1/\sqrt n$ — compare [[#ex-ab]].
:::
:::

::: exercise A between-subjects analysis {level=2}
Ten participants used design A and ten others design B. Task times (s) were A: 41, 38, 52, 45, 47, 39, 44, 50, 43, 46 and B: 36, 40, 35, 42, 38, 33, 41, 39, 37, 44. Compute Welch's $t$, its degrees of freedom and the two-sided $p$-value with the code of [[#ex-ttest]], and state the result as you would in a report.
::: solution
```python
from statistics import mean, stdev
from math import sqrt
# paste betainc and t_p from the example above here
A = [41, 38, 52, 45, 47, 39, 44, 50, 43, 46]
B = [36, 40, 35, 42, 38, 33, 41, 39, 37, 44]
v1, v2 = stdev(A) ** 2 / len(A), stdev(B) ** 2 / len(B)
t = (mean(A) - mean(B)) / sqrt(v1 + v2)
df = (v1 + v2) ** 2 / (v1 ** 2 / (len(A) - 1) + v2 ** 2 / (len(B) - 1))
print(mean(A), mean(B), round(t, 3), round(df, 1), f"{t_p(t, df):.2g}")
```

```console
$ python3 welch.py
44.5 38.5 3.372 16.7 0.0037
```

Report: "Participants using design B completed the task faster (mean 38.5 s) than those using design A (44.5 s), a difference of 6.0 s; Welch's $t(16.7) = 3.37$, $p = 0.004$." Add the confidence interval for the difference and an effect size ($d \approx 6.0/\text{pooled SD}$; the pooled SD is about 4.0 s, so $d \approx 1.5$), and the caveat that with 10 participants per group the estimate of the difference is imprecise.
:::
:::

::: exercise Odd numbers of conditions {level=3}
Show that for $k = 3$ no $3 \times 3$ Latin square is balanced for immediate precedence (each ordered pair adjacent exactly once), and verify that the Williams construction for odd $k$ — the square of [[#alg-balanced-latin]] built the same way together with each row reversed — balances adjacency over $2k$ rows. Check your argument by program for $k = 3$ and $k = 5$.
::: solution
In any $k \times k$ Latin square each row has $k - 1$ adjacent pairs, so there are $k(k-1)$ in all — exactly the number of ordered pairs of distinct conditions — and balance means every ordered pair occurs exactly once. For $k = 3$ the program below enumerates all 12 Latin squares of order 3 and finds none balanced; for instance $ABC, BCA, CAB$ has $A \to B$ in rows 1 and 3. Constructions like Williams's, in which every row is the first row plus a constant, fail for *every* odd $k$: they need the consecutive differences $\delta_j$ of the first row to be all $k - 1$ nonzero residues, but the differences sum to (last entry $-$ first entry), while the nonzero residues sum to $k(k-1)/2 \equiv 0 \pmod k$ when $k$ is odd, which would force the first and last entries of the row to be equal. (Balanced squares of some larger odd orders do exist, but there is no simple general construction.) Reversing each row turns each adjacency $a \to b$ into $b \to a$, so the cyclic square plus its reversal contains every ordered pair as often as the cyclic square contains it in either direction; the program checks that this is exactly twice.

```python
from itertools import permutations

def williams(k):
    first, lo, hi = [0], 1, k - 1
    while len(first) < k:
        first.append(lo); lo += 1
        if len(first) < k:
            first.append(hi); hi -= 1
    rows = [[(x + r) % k for x in first] for r in range(k)]
    return rows if k % 2 == 0 else rows + [row[::-1] for row in rows]

def pair_counts(rows):
    counts = {}
    for row in rows:
        for a, b in zip(row, row[1:]):
            counts[(a, b)] = counts.get((a, b), 0) + 1
    return sorted(set(counts.values())), len(counts)

# all 3x3 Latin squares: no balanced one exists
latin3 = [rows for rows in permutations(permutations(range(3)), 3)
          if all(len({r[j] for r in rows}) == 3 for j in range(3))]
print(len(latin3), any(pair_counts(r) == ([1], 6) for r in latin3))
print(pair_counts(williams(3)), pair_counts(williams(5)))
```

```console
$ python3 odd.py
12 False
([2], 6) ([2], 20)
```

There are 12 Latin squares of order 3 and none is balanced. With the reversed rows added, every one of the $k(k-1)$ ordered pairs is adjacent exactly **twice** over the $2k$ rows — balanced, as required — for both $k = 3$ and $k = 5$. For odd $k$, participants are therefore assigned in multiples of $2k$.
:::
:::

::: exercise Peeking with a correction {level=3}
Modify the A/A simulation of [[#ex-ab]] so that, with 50 looks, it rejects only if $p < 0.05/50$ at some look (a Bonferroni correction across looks). Estimate the false-positive rate and the power to detect 5.0% versus 6.0% with 10,000 users per arm, compared with a single look at the end at $p < 0.05$. What does the result suggest about Bonferroni as a remedy for peeking?
::: solution
```python
from math import sqrt, erfc
import random

rng = random.Random(7)
def run(pa, pb, threshold, step=200, looks=50, peek=True):
    xa = xb = n = 0
    for _ in range(looks):
        xa += sum(rng.random() < pa for _ in range(step))
        xb += sum(rng.random() < pb for _ in range(step))
        n += step
        if peek or n == step * looks:
            pp = (xa + xb) / (2 * n)
            z = (xa / n - xb / n) / sqrt(pp * (1 - pp) * 2 / n)
            if erfc(abs(z) / sqrt(2)) < threshold:
                return True
    return False

R = 500
for name, th, peek in [("single look, 0.05", 0.05, False), ("50 looks, 0.05/50", 0.05 / 50, True)]:
    fp = sum(run(0.05, 0.05, th, peek=peek) for _ in range(R)) / R
    power = sum(run(0.05, 0.06, th, peek=peek) for _ in range(R)) / R
    print(f"{name:18}: false positives {fp:.3f}, power {power:.3f}")
```

```console
$ python3 peek.py
single look, 0.05 : false positives 0.038, power 0.862
50 looks, 0.05/50 : false positives 0.004, power 0.526
```

Bonferroni controls the false-positive rate — overcontrols it, at about 0.4% instead of 5%, because the 50 tests on accumulating data are highly correlated — and loses much of the power (53% against 86%; with 500 runs each estimate has a standard error of about 2 percentage points, which is also why the single-look false-positive rate came out at 3.8% rather than exactly 5%). It is a valid but wasteful remedy. Group-sequential designs (O'Brien–Fleming boundaries) and always-valid inference spend the error rate across looks efficiently, keeping most of the power of a single test while allowing early stopping; they are what experimentation platforms use. (Results vary slightly from run to run of the simulation with a different seed.)
:::
:::
