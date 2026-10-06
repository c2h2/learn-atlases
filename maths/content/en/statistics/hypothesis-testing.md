At an afternoon tea at the Rothamsted agricultural research station in the 1920s, Ronald Fisher's colleague Muriel Bristol claimed that she could tell, by taste, whether the milk had been poured into the cup before or after the tea. Fisher later used the story to explain how such a claim should be tested. Prepare eight cups, four of each kind, present them in random order, and tell her that there are four of each. If she has no ability at all, she is simply choosing $4$ cups out of $8$ at random, and the chance that she picks exactly the right four is $1/\binom84 = 1/70\approx0.014$. So if she does get all eight right, either she was very lucky — a $1.4\%$ chance — or she really can tell the difference.

This is the logic of a **significance test**: assume, for the sake of argument, that nothing interesting is going on (the **null hypothesis**), and ask how surprising the data would be under that assumption. If they would be very surprising, we have evidence against the null hypothesis. This chapter formalises that logic with **p-values**, examines the two kinds of error a test can make and the **power** to detect real effects, develops the standard z, t and chi-square tests, proves the **Neyman–Pearson lemma** on optimal tests, and ends with the ways in which tests are commonly misused.

## The logic of a significance test {#logic}

::: definition Hypotheses and test statistic {#def-hypotheses}
A **statistical hypothesis** is a statement about the distribution of the data, usually about a parameter $\theta$. A test compares a **null hypothesis** $H_0$ (typically "no effect", such as $\theta = \theta_0$) with an **alternative hypothesis** $H_1$ (such as $\theta\ne\theta_0$, a **two-sided** alternative, or $\theta>\theta_0$, a **one-sided** one). A **test statistic** $T$ is a statistic chosen so that values far from what $H_0$ predicts are evidence for $H_1$.
:::

::: definition p-value {#def-p-value}
Suppose large values of $T$ are evidence against $H_0$, and $t$ is the observed value. The **p-value** is

$$
p = \Prob_{H_0}(T\ge t),
$$

the probability, computed assuming $H_0$ is true, of obtaining a test statistic at least as extreme as the one observed. (For a two-sided test, "extreme" includes both tails.)
:::

A small p-value means the data would be unusual if $H_0$ were true. By convention, results with $p<0.05$ are often called **statistically significant**, and those with $p<0.01$ highly significant; but a p-value is a continuous measure of evidence, and the thresholds are conventions, not laws.

::: example A suspicious coin {#ex-coin-test}
A coin is tossed $100$ times and shows $60$ heads. Is it fair?
::: solution
Let $\theta$ be the probability of heads (the letter $p$ is kept for the p-value). Take $H_0$: $\theta = \tfrac12$ against the two-sided $H_1$: $\theta\ne\tfrac12$, and use the number of heads $X$ as the test statistic. Under $H_0$, $X\sim\Bin(100,\tfrac12)$, and results at least as extreme as $60$ are $X\ge60$ or $X\le40$. By symmetry,

$$
p = 2\,\Prob_{H_0}(X\ge60) = 2\times0.0284 = 0.057 .
$$

(The normal approximation with continuity correction, $2(1-\Phi(1.9)) = 0.057$, agrees.) A result at least as extreme as sixty heads would happen in about $6\%$ of experiments with a fair coin: some evidence of bias, but not strong evidence. At the $5\%$ level we would not reject fairness.
:::
:::

## Errors, significance level and power {#errors}

The p-value measures evidence. The approach of Jerzy Neyman and Egon Pearson instead treats a test as a *decision rule*, and asks how often it makes mistakes.

::: definition Test, errors and power {#def-errors}
A **test** of $H_0$ against $H_1$ is a rule that rejects $H_0$ when the data fall in a **rejection region** $R$. A **type I error** is rejecting $H_0$ when it is true; a **type II error** is failing to reject $H_0$ when it is false. The test has **significance level** $\alpha$ if $\Prob_\theta(\text{reject }H_0)\le\alpha$ for every $\theta$ in $H_0$. The **power** of the test at a parameter value $\theta$ in $H_1$ is $\Prob_\theta(\text{reject }H_0)$, one minus the probability of a type II error at $\theta$.
:::

| | $H_0$ true | $H_0$ false |
|---|---|---|
| reject $H_0$ | type I error (probability $\le\alpha$) | correct (probability = power) |
| do not reject $H_0$ | correct | type II error |

The two error types trade off against each other: shrinking the rejection region lowers $\alpha$ but also lowers the power. The usual practice is to fix $\alpha$ (often $0.05$) and then choose the test, and the sample size, to make the power large. The two approaches connect simply: rejecting when $p\le\alpha$ gives a test with significance level $\alpha$.

::: theorem p-values are uniform under the null {#thm-p-uniform}
Suppose that under $H_0$ the test statistic $T$ has a continuous distribution function $F$, and large values are evidence against $H_0$, so that the p-value is $P = 1 - F(T)$. Then, under $H_0$, $P$ is uniformly distributed on $[0,1]$. In particular $\Prob_{H_0}(P\le\alpha) = \alpha$ for every $\alpha\in[0,1]$.
:::

::: proof
By the probability integral transform ([[probability/continuous-random-variables#thm-inverse-transform]]), $F(T)\sim\operatorname{U}(0,1)$ under $H_0$. (That theorem also assumes $F$ strictly increasing where $0<F<1$, but continuity is enough: for $u\in(0,1)$ let $x_u$ be the largest $x$ with $F(x) = u$, which exists because $F$ is continuous with limits $0$ and $1$; then $F(T)\le u$ exactly when $T\le x_u$, so $\Prob(F(T)\le u) = F(x_u) = u$.) If $U$ is uniform then so is $1-U$, so $P = 1-F(T)$ is uniform, and $\Prob(P\le\alpha) = \alpha$.
:::

So when the null hypothesis is true, a p-value is just a uniform random number: $5\%$ of true null hypotheses produce $p<0.05$, by construction. (For discrete statistics, such as the binomial count above, $\Prob_{H_0}(P\le\alpha)\le\alpha$, so the test is conservative.)

### The z-test and its power

For a normal mean with known $\sigma$, the test of $H_0$: $\mu = \mu_0$ uses

$$
Z = \frac{\bar X - \mu_0}{\sigma/\sqrt n},
$$ {#eq-z-stat}

which is $\Normal(0,1)$ under $H_0$. For $H_1$: $\mu>\mu_0$ we reject when $Z>z_\alpha$; for $H_1$: $\mu\ne\mu_0$, when $\lvert Z\rvert>z_{\alpha/2}$. For the bolts of [[statistics/sampling#ex-bolts]], $z = (50.08 - 50)/0.04 = 2.0$, so the two-sided p-value is $2(1-\Phi(2)) = 0.046$: significant at the $5\%$ level, but only just.

If the true mean is $\mu>\mu_0$, then $Z$ is normal with mean $\delta\sqrt n/\sigma$, where $\delta = \mu-\mu_0$, and the power of the one-sided test is

$$
\Prob_\mu(Z>z_\alpha) = 1 - \Phi\Bigl(z_\alpha - \frac{\delta\sqrt n}{\sigma}\Bigr).
$$ {#eq-power}

Power increases with the **effect size** $\delta/\sigma$ and with $\sqrt n$. Setting the power equal to $1-\beta$ gives the sample size formula

$$
n = \Bigl(\frac{(z_\alpha + z_\beta)\,\sigma}{\delta}\Bigr)^2 .
$$ {#eq-sample-size}

::: example Planning a study {#ex-power}
A new teaching method is expected to raise scores by half a standard deviation. How many students are needed for a one-sided z-test at $\alpha = 0.05$ to have power $0.8$?
::: solution
Here $\delta/\sigma = 0.5$, $z_{0.05} = 1.645$ and $z_{0.2} = 0.842$, so by [[#eq-sample-size]]

$$
n = \Bigl(\frac{1.645 + 0.842}{0.5}\Bigr)^2 = 24.7,
$$

so $25$ students; the power is then $1-\Phi(1.645 - 2.5) = 0.80$. For a two-sided test ($z_{0.025} = 1.96$) the requirement rises to $32$. To detect an effect half as large, four times as many students are needed. Studies that are too small to detect plausible effects are a major source of wasted effort and misleading results.
:::
:::

::: widget hypothesis
test: z
tail: right
alpha: 0.05
effect: 0.5
n: 25
caption: Sampling distributions of the z statistic under $H_0$ (centred at $0$) and under the alternative (centred at $\delta\sqrt n/\sigma = 2.5$). The shaded right tail of the null curve is $\alpha$; the part of the alternative curve beyond the critical value is the power, here about $0.80$. Increase $n$ or the effect size and the curves separate; lower $\alpha$ and the critical value moves right, cutting both the type I error and the power.
:::

::: quiz
A test gives $p = 0.03$. Which statement is correct?
- [ ] The probability that $H_0$ is true is $0.03$.
- [ ] The probability that the result is due to chance is $3\%$.
- [x] If $H_0$ were true, results at least this extreme would occur with probability $0.03$.
- [ ] There is a $97\%$ probability that $H_1$ is true.
::: solution
The p-value is computed *assuming* $H_0$, so it is a probability about the data, not about the hypotheses. Turning it into $\Prob(H_0\mid\text{data})$ would require Bayes' theorem and a prior probability for $H_0$, exactly as in the diagnostic-test calculation of [[probability/conditional-probability#ex-diagnostic]]; the two can differ enormously.
:::
:::

## Tests for means {#mean-tests}

With $\sigma$ unknown, replace it by $S$ and use Student's distribution ([[statistics/sampling#cor-t-statistic]]). The **one-sample t-test** of $H_0$: $\mu = \mu_0$ uses

$$
T = \frac{\bar X-\mu_0}{S/\sqrt n},
$$

which has the $t_{n-1}$ distribution under $H_0$ for normal data.

::: example Is the coffee stronger than advertised? {#ex-t-test}
The café of [[statistics/confidence-intervals#ex-caffeine]] advertises $95$ mg of caffeine per cup. The eight measured cups had $\bar x = 100.75$ and $s = 5.55$. Test $H_0$: $\mu = 95$ against $H_1$: $\mu\ne95$.
::: solution
The test statistic is

$$
t = \frac{100.75 - 95}{5.55/\sqrt8} = \frac{5.75}{1.962} = 2.93,
$$

and with $7$ degrees of freedom the two-sided p-value is $2\,\Prob(t_7>2.93) = 0.022$. There is fairly strong evidence that the mean caffeine content differs from $95$ mg (it appears to be higher). Consistently with this, $95$ lies outside the $95\%$ confidence interval $[96.1, 105.4]$ found earlier.
:::
:::

::: widget hypothesis
test: t
tail: two
alpha: 0.05
effect: 1
n: 8
observed: 2.93
caption: The $t_7$ null distribution for the coffee test, with the two-sided rejection region at $\lvert t\rvert>2.365$ and the observed statistic $t = 2.93$ marked; the p-value is the total area beyond $\pm2.93$, about $0.022$. Switch to a one-sided test and the p-value halves — which is why the choice of alternative must be made before looking at the data.
:::

The agreement between the test and the interval in this example is no accident.

::: theorem Duality of tests and confidence intervals {#thm-duality}
Suppose that for every $\theta_0$ there is a test of $H_0$: $\theta = \theta_0$ with significance level $\alpha$, with acceptance region $A(\theta_0)$ (the data for which $H_0$ is not rejected). Then $C(x) = \{\theta_0 : x\in A(\theta_0)\}$ is a $1-\alpha$ confidence set for $\theta$. Conversely, if $C$ is a $1-\alpha$ confidence set, the test that rejects $\theta = \theta_0$ when $\theta_0\notin C(x)$ has significance level $\alpha$.
:::

::: proof
For the true value $\theta$, the events $\{\theta\in C(X)\}$ and $\{X\in A(\theta)\}$ are the same, by the definition of $C$. Hence $\Prob_\theta(\theta\in C(X)) = \Prob_\theta(X\in A(\theta))\ge1-\alpha$, because the test of $\theta_0 = \theta$ has level $\alpha$. The converse is the same identity read the other way: $\Prob_{\theta_0}(\text{reject}) = \Prob_{\theta_0}(\theta_0\notin C(X))\le\alpha$.
:::

So a two-sided t-test at level $0.05$ rejects $\mu = \mu_0$ exactly when $\mu_0$ lies outside the $95\%$ t-interval. Reporting the interval conveys more than the test: it shows both whether an effect is detectable and how large it plausibly is.

When the data come in pairs, the right test is the one-sample t-test applied to the differences.

::: example A paired comparison {#ex-paired}
The systolic blood pressures (mmHg) of eight patients before and after a month on a new drug were:

| patient | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| before | 142 | 150 | 138 | 160 | 147 | 155 | 149 | 152 |
| after | 135 | 148 | 136 | 150 | 145 | 147 | 146 | 144 |

Test whether the drug lowers blood pressure.
::: solution
The differences (before minus after) are $7, 2, 2, 10, 2, 8, 3, 8$, with mean $\bar d = 5.25$ and standard deviation $s_d = 3.33$. Testing $H_0$: $\mu_d = 0$,

$$
t = \frac{5.25}{3.33/\sqrt8} = 4.46,
$$

and with $7$ degrees of freedom the two-sided p-value is $0.003$: strong evidence of a reduction. If the two rows were wrongly treated as independent samples, the two-sample t-test would give $t = 1.67$ and $p = 0.12$, because the large differences *between* patients would swamp the consistent changes *within* patients. Pairing (and, in experiments, a randomised design) is one of the most effective ways to gain power.
:::
:::

## Chi-square tests {#chi-square}

For categorical data, Karl Pearson's statistic compares observed counts $O_j$ in $k$ categories with the counts $E_j$ expected under $H_0$:

$$
X^2 = \sum_{j=1}^k\frac{(O_j - E_j)^2}{E_j}.
$$ {#eq-pearson}

Large values indicate a poor fit. Pearson proved (in 1900) that if $H_0$ specifies the category probabilities completely, then as the sample size grows the distribution of $X^2$ under $H_0$ converges to $\chi^2_{k-1}$; one degree of freedom is lost because the counts must add up to $n$. If $m$ parameters are estimated from the data to compute the $E_j$, the degrees of freedom drop to $k-1-m$ (a correction due to Fisher). The approximation is usually considered adequate when all $E_j\ge5$. The proof uses the multivariate central limit theorem; see, for example, Ferguson, *A Course in Large Sample Theory* (1996), Chapter 9.

::: example Is the die fair? {#ex-die-test}
A die is rolled $120$ times, giving the counts $15, 22, 18, 26, 17, 22$ for faces $1$ to $6$. Test whether it is fair.
::: solution
Under $H_0$ each face has probability $\tfrac16$, so $E_j = 20$. Then

$$
X^2 = \frac{25 + 4 + 4 + 36 + 9 + 4}{20} = \frac{82}{20} = 4.1,
$$

with $6 - 1 = 5$ degrees of freedom. The $5\%$ critical value is $\chi^2_{5,0.05} = 11.07$ and the p-value is $0.54$. The deviations are well within what chance produces; there is no evidence that the die is biased. (This does not prove that it is fair — $120$ rolls could easily miss a small bias.)
:::
:::

::: example Mendel's peas {#ex-mendel}
In his 1866 paper, Gregor Mendel reported the $556$ seeds produced by $15$ self-fertilised hybrid pea plants: $315$ round yellow, $108$ round green, $101$ wrinkled yellow and $32$ wrinkled green. His theory predicts the ratio $9:3:3:1$. Test the fit.
::: solution
The expected counts are $556\times\tfrac{9}{16} = 312.75$, $104.25$, $104.25$ and $34.75$. Then

$$
X^2 = \frac{2.25^2}{312.75} + \frac{3.75^2}{104.25} + \frac{3.25^2}{104.25} + \frac{2.75^2}{34.75}\approx0.47,
$$

with $3$ degrees of freedom, giving $p = 0.93$. The fit is excellent. In 1936 Fisher, combining many of Mendel's experiments, argued that the fit was *too* good to be true — that is, that $X^2$ values as small as Mendel's would arise by chance only rarely — a claim that is still debated.
:::
:::

::: widget distribution
dist: chisq
params: k=3
a: 7.815
b: 20
caption: The $\chi^2_3$ distribution with the $5\%$ rejection region $X^2>7.815$ shaded. Mendel's $X^2 = 0.47$ lies far to the left, in the region of almost perfect agreement. Change the degrees of freedom to $5$ and locate the die's $X^2 = 4.1$: comfortably inside the bulk of the distribution.
:::

The same statistic tests **independence** in a contingency table. If $n$ individuals are classified by two categorical variables into an $r\times c$ table with row totals $R_i$ and column totals $C_j$, then under the hypothesis of independence the expected count in cell $(i,j)$ is estimated by $E_{ij} = R_iC_j/n$, and $X^2 = \sum_{i,j}(O_{ij}-E_{ij})^2/E_{ij}$ is approximately $\chi^2_{(r-1)(c-1)}$.

::: example A vaccine trial {#ex-contingency}
In a trial, $200$ people received a vaccine and $200$ a placebo; $10$ of the vaccinated and $30$ of the placebo group became infected. Test whether infection is independent of treatment.
::: solution
The table of counts, with its margins, is

| | infected | not infected | total |
|---|---|---|---|
| vaccine | $10$ | $190$ | $200$ |
| placebo | $30$ | $170$ | $200$ |
| total | $40$ | $360$ | $400$ |

The expected counts under independence are $200\times40/400 = 20$ infected and $180$ not infected in each group, so

$$
X^2 = \frac{10^2}{20} + \frac{10^2}{180} + \frac{10^2}{20} + \frac{10^2}{180} = 11.1,
$$

with $(2-1)(2-1) = 1$ degree of freedom, giving $p = 0.0009$. The evidence that infection depends on treatment is strong; the estimated infection rates are $5\%$ and $15\%$, a reduction of two thirds. Because the treatment was randomised, the dependence can be interpreted causally.
:::
:::

## The Neyman–Pearson lemma {#neyman-pearson}

Which test statistic should we use? For the simplest case — two completely specified hypotheses — there is a definitive answer.

::: theorem Neyman–Pearson lemma {#thm-neyman-pearson}
Let the data $X$ have density (or pmf) $f_0$ under $H_0$ and $f_1$ under $H_1$. For $k>0$, let $R = \{x : f_1(x)>kf_0(x)\}$ and $\alpha = \Prob_0(X\in R)$. Then every test with rejection region $R'$ and $\Prob_0(X\in R')\le\alpha$ has power at most that of $R$: $\Prob_1(X\in R')\le\Prob_1(X\in R)$.
:::

::: proof
Consider the function $g(x) = \bigl(\mathbf{1}_R(x) - \mathbf{1}_{R'}(x)\bigr)\bigl(f_1(x) - kf_0(x)\bigr)$. If $x\in R$ the first factor is $\ge0$ and the second is $>0$; if $x\notin R$ the first factor is $\le0$ and the second is $\le0$. So $g\ge0$ everywhere, and integrating (or summing),

$$
0\le\int g = \bigl(\Prob_1(R) - \Prob_1(R')\bigr) - k\bigl(\Prob_0(R) - \Prob_0(R')\bigr).
$$

Since $k>0$ and $\Prob_0(R')\le\alpha = \Prob_0(R)$, the second bracket is non-negative, so $\Prob_1(R)\ge\Prob_1(R')$.
:::

The most powerful test therefore rejects when the **likelihood ratio** $f_1(x)/f_0(x)$ is large, which is the formal justification for the intuition that evidence is measured by how much better the alternative explains the data.

::: example The z-test is most powerful {#ex-np-normal}
For $X_1,\ldots,X_n\iid\Normal(\mu,\sigma^2)$ with $\sigma$ known, find the most powerful level-$\alpha$ test of $H_0$: $\mu = \mu_0$ against $H_1$: $\mu = \mu_1$, where $\mu_1>\mu_0$.
::: solution
The likelihood ratio is

$$
\frac{f_1(x)}{f_0(x)} = \exp\Bigl(-\frac{1}{2\sigma^2}\sum_i\bigl[(x_i-\mu_1)^2 - (x_i-\mu_0)^2\bigr]\Bigr) = \exp\Bigl(\frac{n(\mu_1-\mu_0)}{\sigma^2}\bar x - \frac{n(\mu_1^2-\mu_0^2)}{2\sigma^2}\Bigr),
$$

an increasing function of $\bar x$ because $\mu_1>\mu_0$. So "$f_1/f_0>k$" is equivalent to "$\bar x>c$" for some $c$, and choosing $c = \mu_0 + z_\alpha\sigma/\sqrt n$ gives size $\alpha$: this is the one-sided z-test. Since the test does not depend on the particular value $\mu_1>\mu_0$, it is most powerful against every such alternative simultaneously — a **uniformly most powerful** test of $H_0$ against $H_1$: $\mu>\mu_0$.
:::
:::

For composite hypotheses no single test is usually best, and the general-purpose method is the **likelihood ratio test**, which compares the maximised likelihoods under $H_0$ and under $H_1$. By a theorem of Samuel Wilks (1938), $2\ln$ of that ratio is approximately chi-square in large samples, with degrees of freedom equal to the number of parameters fixed by $H_0$; Pearson's $X^2$ is a close approximation to it.

## Using tests well {#pitfalls}

::: warning Five misreadings of p-values
1. A p-value is not the probability that $H_0$ is true, nor the probability that "the result is due to chance".
2. $p>0.05$ does not show that $H_0$ is true: absence of evidence is not evidence of absence, especially in a small study with low power.
3. Statistical significance is not practical importance. With a million observations, a difference of $0.1$ IQ points can be highly significant; report the size of the effect with a confidence interval.
4. A p-value of $0.04$ in one study and $0.06$ in another do not "conflict": the evidence is almost the same.
5. A p-value computed after choosing the analysis in the light of the data (which outcome, which subgroup, which test) is not valid. Trying many analyses and reporting the one that works is called **p-hacking**.
:::

The last point is an instance of the **multiple testing** problem. If $20$ true null hypotheses are each tested at level $0.05$, independently, the chance of at least one "significant" result is $1 - 0.95^{20}\approx0.64$. The simplest remedy controls the probability of any false rejection.

::: theorem Bonferroni correction {#thm-bonferroni}
If $m$ hypotheses are each tested at level $\alpha/m$, then the probability of rejecting at least one true null hypothesis (the **family-wise error rate**) is at most $\alpha$, whatever the dependence between the tests.
:::

::: proof
Let $A_j$ be the event that true null hypothesis $j$ is rejected; there are at most $m$ such hypotheses, and each has $\Prob(A_j)\le\alpha/m$. By the union bound ([[probability/probability-spaces#thm-union-bound]]), $\Prob\bigl(\bigcup_jA_j\bigr)\le\sum_j\Prob(A_j)\le m\cdot\frac{\alpha}{m} = \alpha$.
:::

The Bonferroni correction is conservative when $m$ is large; in genomics, where thousands of genes are tested at once, one instead controls the expected proportion of false discoveries (the method of Benjamini and Hochberg, 1995).

::: quiz
A small study finds that a treatment reduces symptoms, but $p = 0.20$. What is the most reasonable conclusion?
- [ ] The treatment does not work.
- [ ] The treatment works, but only in $20\%$ of patients.
- [x] The data do not provide convincing evidence either way; the study may simply be too small.
- [ ] There is an $80\%$ chance that the treatment works.
::: solution
A non-significant result means the data are compatible with no effect — but they may also be compatible with a substantial effect, if the study had low power. Look at the confidence interval for the effect: if it is wide and includes both zero and clinically important values, the honest conclusion is "not enough information".
:::
:::

::: history
An early significance test was published by John Arbuthnot in 1710: in each of the $82$ years from 1629 to 1710, more boys than girls had been christened in London, and if each year were equally likely to go either way, this would have probability $(1/2)^{82}$, which he took as evidence of divine providence. Karl Pearson's chi-square test (1900) and Student's t-test (1908) began the modern theory. Ronald Fisher's *Statistical Methods for Research Workers* (1925) made p-values and the $5\%$ convention standard in science, and his *The Design of Experiments* (1935) introduced the lady tasting tea. Jerzy Neyman and Egon Pearson recast testing as a decision problem with two types of error, culminating in their lemma of 1933; Fisher never accepted their approach, and modern practice is an uneasy blend of the two. Concern about the misuse of p-values led the American Statistical Association to issue a formal statement on p-values in 2016.
:::

## Where this leads {#where-next}

Tests and confidence intervals for regression coefficients are developed in [[statistics/regression]]; the F-test for comparing nested regression models, based on the F distribution of [[statistics/sampling#def-f]], is a natural next step beyond this course. The Bayesian alternative to significance testing, based on Bayes factors and posterior probabilities of hypotheses, is described in [[statistics/bayesian]]; it answers the question "how probable is $H_0$ given the data?" that p-values are so often misread as answering. Beyond this course lie nonparametric tests that do not assume normality (rank tests, permutation tests), the analysis of variance for comparing several groups, and the theory of sequential testing.

::: summary
- A test assumes $H_0$ and asks how surprising the data are; the p-value is the probability, computed under $H_0$, of a result at least as extreme as the one observed.
- Type I error: rejecting a true $H_0$ (probability $\le\alpha$); type II error: missing a real effect; power $=\Prob(\text{reject}\mid H_1)$ grows with effect size and $\sqrt n$.
- Under $H_0$ a continuous p-value is uniform, so $\Prob(p\le\alpha) = \alpha$.
- z-test with known $\sigma$; t-test with estimated $\sigma$; paired data are analysed through their differences.
- Tests and confidence intervals are dual: $\theta_0$ is rejected at level $\alpha$ exactly when it lies outside the $1-\alpha$ interval.
- Pearson's $X^2 = \sum(O-E)^2/E$ is approximately chi-square: $k-1$ degrees of freedom for goodness of fit, $(r-1)(c-1)$ for independence.
- Neyman–Pearson: for simple hypotheses, rejecting for large likelihood ratios is most powerful.
- A p-value is not $\Prob(H_0\mid\text{data})$; non-significance is not proof of no effect; correct for multiple testing (Bonferroni: test each at $\alpha/m$).
:::

## Exercises

::: exercise A z statistic {level=1 check="1.2"}
A sample of $36$ from a normal population with $\sigma = 15$ has $\bar x = 103$. Compute the z statistic for $H_0$: $\mu = 100$, and the two-sided p-value.
::: solution
$z = (103-100)/(15/6) = 3/2.5 = 1.2$, and $p = 2(1-\Phi(1.2)) = 0.23$: no evidence against $H_0$.
:::
:::

::: exercise The size of a test {level=1 check="11/1024"}
A coin is declared biased towards heads if at least $9$ of $10$ tosses are heads. Find the probability of a type I error.
::: solution
Under $H_0$: $p = \tfrac12$, $\Prob(X\ge9) = \bigl(\binom{10}{9}+\binom{10}{10}\bigr)2^{-10} = 11/1024\approx0.011$.
:::
:::

::: exercise Degrees of freedom {level=1 check="6"}
How many degrees of freedom does the chi-square test of independence have for a $3\times4$ contingency table?
::: solution
$(3-1)(4-1) = 6$.
:::
:::

::: exercise A t statistic {level=2 check="2.3"}
A sample of $16$ observations has $\bar x = 52.3$ and $s = 4$. Compute the t statistic for $H_0$: $\mu = 50$, and decide whether $H_0$ is rejected against the two-sided alternative at the $5\%$ level ($t_{15,0.025} = 2.131$).
::: solution
$t = (52.3 - 50)/(4/4) = 2.3>2.131$, so $H_0$ is rejected at the $5\%$ level (the p-value is about $0.036$).
:::
:::

::: exercise Power of a z-test {level=2}
A one-sided z-test of $H_0$: $\mu = 100$ against $H_1$: $\mu>100$ uses $n = 25$ observations with $\sigma = 10$ and $\alpha = 0.05$. Find its power when $\mu = 104$.
::: solution
By [[#eq-power]] with $\delta\sqrt n/\sigma = 4\times5/10 = 2$, the power is $1-\Phi(1.645 - 2) = \Phi(0.355)\approx0.64$. There is a $36\%$ chance of missing a real increase of $4$.
:::
:::

::: exercise Sample size for high power {level=2 check="169"}
How many observations does a two-sided z-test at $\alpha = 0.05$ need for power $0.9$ to detect an effect of a quarter of a standard deviation? (Use $z_{0.025} = 1.96$ and $z_{0.1} = 1.2816$, and ignore the negligible far tail.)
::: solution
$n = \bigl((1.96 + 1.2816)/0.25\bigr)^2 = 12.966^2 = 168.1$, so $n = 169$.
:::
:::

::: exercise Many tests {level=2 check="1-0.95^10"}
Ten independent true null hypotheses are each tested at the $5\%$ level. Find the probability of at least one false rejection, and the per-test level that Bonferroni's method would use to keep this below $5\%$.
::: solution
$1 - 0.95^{10}\approx0.401$. Bonferroni would test each at $0.05/10 = 0.005$.
:::
:::

::: exercise Arbuthnot's argument {level=3 check="0.5^82"}
Compute the probability that Arbuthnot used — that in each of $82$ years more boys than girls are christened, if each year independently has probability $\tfrac12$ of going either way. Is it a p-value? What does it, and does it not, establish?
::: solution
$(1/2)^{82}\approx2.1\times10^{-25}$. It is the one-sided p-value of a **sign test** of $H_0$: "each year is equally likely to have more boys or more girls", since $82$ out of $82$ is the most extreme possible result. It establishes overwhelmingly that the probability of a male birth exceeds $\tfrac12$ (about $0.51$ to $0.52$, we now know). It says nothing about *why*: rejecting the null hypothesis supports "not chance", not any particular explanation, such as Arbuthnot's appeal to providence.
:::
:::

::: exercise Neyman–Pearson for exponential lifetimes {level=3}
Lifetimes $X_1,\ldots,X_n$ are iid $\operatorname{Exp}(\lambda)$. Show that the most powerful test of $H_0$: $\lambda = 1$ against $H_1$: $\lambda = 2$ rejects when $\sum_iX_i$ is small, and find the critical value for $\alpha = 0.05$ in terms of a chi-square quantile.
::: hint
Use the pivot $2\lambda\sum X_i\sim\chi^2_{2n}$ from the exercises of [[statistics/confidence-intervals]].
:::
::: solution
The likelihood ratio is $\dfrac{f_1(x)}{f_0(x)} = \dfrac{2^ne^{-2\sum x_i}}{e^{-\sum x_i}} = 2^ne^{-\sum x_i}$, a decreasing function of $s = \sum x_i$. By [[#thm-neyman-pearson]], the most powerful test rejects when $s<c$. Under $H_0$ ($\lambda = 1$), $2\sum X_i\sim\chi^2_{2n}$, so $\Prob_0(\sum X_i<c) = 0.05$ when $2c = \chi^2_{2n,0.95}$, the lower $5\%$ point. Hence reject when $\sum X_i<\tfrac12\chi^2_{2n,0.95}$. Short lifetimes are evidence for the higher failure rate, as intuition suggests; the lemma shows that nothing beats this test.
:::
:::

::: exercise Discrete p-values are conservative {level=3}
Let $T$ be an integer-valued test statistic (such as a count), with large values being evidence against $H_0$, and let $G(t) = \Prob_{H_0}(T\ge t)$, so that the p-value is $P = G(T)$. Prove that $\Prob_{H_0}(P\le\alpha)\le\alpha$ for every $\alpha\in(0,1)$.
::: solution
$G$ is non-increasing and $G(t)\to0$ as $t\to\infty$, so there is a smallest integer $t_0$ with $G(t_0)\le\alpha$. Because $G$ is non-increasing, for integers $t$ we have $G(t)\le\alpha$ exactly when $t\ge t_0$ (if $t<t_0$ then $G(t)>\alpha$ by the minimality of $t_0$). Hence $\{P\le\alpha\} = \{G(T)\le\alpha\} = \{T\ge t_0\}$, and

$$
\Prob_{H_0}(P\le\alpha) = \Prob_{H_0}(T\ge t_0) = G(t_0)\le\alpha .
$$

Equality typically fails, so tests based on discrete p-values are conservative. For the coin test of [[#ex-coin-test]], rejecting when the two-sided p-value is at most $0.05$ means rejecting when $X\le39$ or $X\ge61$, whose actual size is $0.035$.
:::
:::
