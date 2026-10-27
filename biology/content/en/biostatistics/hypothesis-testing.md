In 1710 John Arbuthnot, physician to Queen Anne, examined the London baptism records for the 82 years from 1629 to 1710 and noticed that more boys than girls had been christened in every single year. If the sexes were equally likely, he argued, each year would be like the toss of a coin, and the chance of 82 "boy" years in a row would be $(1/2)^{82}$, about $2\times10^{-25}$. Since this was absurdly small, the sex ratio at birth could not be a matter of chance alone. (He concluded that it was the work of Divine Providence; we would now say that it is a biological fact, explained in part by Fisher's theory of sex ratios.) Arbuthnot's argument is often called the first significance test, and it has the structure of every test in this course: assume that nothing interesting is going on, work out how probable the observed data would then be, and treat very improbable data as evidence against the assumption.

This chapter makes that logic precise. It defines null hypotheses, test statistics and **P-values**, and works through the oldest example of all on biological data, Darwin's maize, both by Fisher's randomisation argument and by Student's t-test. It then turns the logic round to the design question — the two kinds of error, the **power** of a test and the sample size needed — and ends with the ways P-values are misread and misused, and with the **multiple-testing** problem that dominates modern genomics. The mathematical theory, including the Neyman–Pearson lemma, is in [Maths Atlas: hypothesis testing](/learn/maths/lesson.php?c=statistics&l=hypothesis-testing).

## The logic of a test {#logic}

::: definition Null hypothesis, alternative and test statistic {#def-hypotheses}
A **null hypothesis** $H_0$ is a specific statement about a population that the data are tested against — usually that there is no effect, no difference or no association ("crossing has no effect on height"; "the mean difference $\mu_d = 0$"). The **alternative hypothesis** $H_A$ is what we accept as the explanation if the data are inconsistent with $H_0$: $\mu_d \ne 0$ (**two-sided**) or, if only one direction is of interest and was specified in advance, $\mu_d > 0$ (**one-sided**). A **test statistic** is a number calculated from the data that measures how far they depart from what $H_0$ predicts, and whose distribution when $H_0$ is true (its **null distribution**) is known.
:::

::: definition P-value {#def-p}
The **P-value** is the probability, calculated assuming that $H_0$ is true, of obtaining a test statistic at least as extreme as the one observed. A small P-value means that the data would be surprising if $H_0$ were true. If a decision is needed, $H_0$ is **rejected** when $P \le \alpha$, a **significance level** fixed in advance, conventionally $\alpha = 0.05$.
:::

The null hypothesis plays a curious role. It is usually the thing we suspect is false, and it is chosen not because anyone believes it but because it is specific enough to calculate with: "no difference" predicts a definite distribution for the test statistic, while "some difference" does not.

### Fisher's randomisation test of Darwin's data

Fisher's argument in *The Design of Experiments* (1935) needs no assumption about the shape of the distribution of heights. Within each pot, Darwin assigned one plant of the pair to be crossed and one to be selfed. If crossing had no effect at all, each plant would have grown to the same height whichever treatment it got, and the only thing the treatment would determine is the *sign* of each difference: the difference within pair $i$ would have been $+\lvert d_i\rvert$ or $-\lvert d_i\rvert$ with equal probability, depending only on which plant happened to be called "crossed".

::: example Fisher's randomisation test {#ex-fisher-perm}
The fifteen differences (crossed − selfed, eighths of an inch) are 49, −67, 8, 16, 6, 23, 28, 41, 14, 29, 56, 24, 75, 60, −48, summing to 314. Under $H_0$, each of the $2^{15} = 32\,768$ assignments of signs to the absolute differences is equally likely. Find the two-sided P-value: the proportion of sign assignments whose sum is at least 314 in absolute value.
::: solution
Enumerating all 32,768 sign patterns (by computer; Fisher did it by hand, by organising the count cleverly) gives 863 patterns with sum $\ge 314$ and, by symmetry, 863 with sum $\le -314$. The two-sided P-value is
$$
P = \frac{1726}{32\,768} = 0.0527,
$$
exactly Fisher's figure. If crossing had no effect, a total advantage this large in one direction or the other would arise by the luck of the assignment in about 5.3 % of experiments. The evidence against the null hypothesis is moderate, not overwhelming. The argument uses only the fact that the treatment was assigned at random within pairs — randomisation is what makes the test valid ([[biostatistics/experimental-design]]).
:::
:::

### The paired t-test

The randomisation test needs heavy computation for large samples. Student's t distribution ([[biostatistics/estimation#def-t]]) gives an approximation that is exact if the differences are normal.

::: proposition One-sample and paired t-tests {#prop-t-test}
To test $H_0\colon \mu = \mu_0$ from $n$ independent observations with mean $\bar x$ and standard deviation $s$, compute
$$
t = \frac{\bar x - \mu_0}{s/\sqrt n}.
$$ {#eq-t-test}
If the observations are normal and $H_0$ is true, $t$ follows $t_{n-1}$; the two-sided P-value is $2\Prob(T_{n-1} \ge \lvert t\rvert)$. For **paired** data (two measurements on each unit, or on each matched pair), apply the test to the differences $d_i$ with $\mu_0 = 0$.
:::

::: example The paired t-test on Darwin's maize {#ex-darwin-t}
Test $H_0\colon \mu_d = 0$ against a two-sided alternative for Darwin's differences.
::: solution
From [[biostatistics/estimation#ex-darwin-ci]], $\bar d = 20.93$ and $\mathrm{SE} = 9.746$, so
$$
t = \frac{20.93}{9.746} = 2.148, \qquad \nu = 14.
$$
The two-sided P-value is $2\Prob(T_{14} \ge 2.148) = 0.0497$, close to the randomisation value 0.0527; Fisher's purpose was to show that the t-test approximates the randomisation test that justifies it. At $\alpha = 0.05$ the result is (just) significant, consistent with the 95 % confidence interval 0.03 to 41.8, which (just) excludes zero. A one-sided test for an advantage of crossing would give $P = 0.025$ — but only if that direction had been chosen before seeing the data.
:::
:::

That last remark generalises. **Tests and confidence intervals are two views of the same calculation**: a two-sided test at level $\alpha$ rejects $H_0\colon\mu = \mu_0$ exactly when $\mu_0$ lies outside the $1 - \alpha$ confidence interval. The interval is usually the more informative report, because it shows not only whether the effect could be zero but how large it plausibly is.

::: warning "A one-sided test is a cheap way to halve the P-value"
A one-sided test is legitimate only when the direction was specified before the data were collected *and* an effect in the other direction would be treated exactly as no effect. Choosing the side after seeing which way the data point doubles the true type I error rate. In biology, an effect in the "wrong" direction is usually interesting (a supposed growth promoter that slows growth), so two-sided tests are the default.
:::

## Two kinds of error {#errors}

Jerzy Neyman and Egon Pearson (1933) recast testing as a decision rule, and in doing so they introduced the second error that Fisher's account had left implicit.

::: definition Type I and type II errors, power {#def-errors}
A **type I error** is rejecting $H_0$ when it is true (a false positive); its probability is the significance level $\alpha$. A **type II error** is failing to reject $H_0$ when it is false (a false negative); its probability is written $\beta$. The **power** of a test is $1 - \beta$, the probability of rejecting $H_0$ when a specified alternative is true.

| | $H_0$ true | $H_0$ false |
|---|---|---|
| reject $H_0$ | type I error ($\alpha$) | correct (power, $1 - \beta$) |
| do not reject $H_0$ | correct ($1 - \alpha$) | type II error ($\beta$) |
:::

There is a trade-off: making $\alpha$ smaller makes a test harder to pass and therefore increases $\beta$. The only ways to reduce both at once are to collect more data, to reduce the noise (better measurement, blocking, pairing), or to study a larger effect.

Power depends on four things: the significance level $\alpha$; the sample size $n$; the variability $\sigma$ of the observations; and the true effect size $\delta$. For tests of means the last two enter only through their ratio, the **standardised effect size** (Cohen's $d$) $= \delta/\sigma$. Jacob Cohen (1988) suggested $d = 0.2$, 0.5 and 0.8 as "small", "medium" and "large" for the behavioural sciences; in biology the scale depends entirely on the system, and the effect size worth detecting should come from the biology, not from a convention.

::: proposition Power of a t-test {#prop-power}
For a two-sided one-sample or paired t-test at level $\alpha$ with $n$ observations and true standardised effect $d = \delta/\sigma$, the statistic $t$ follows a **noncentral t distribution** with $\nu = n - 1$ degrees of freedom and noncentrality $\lambda = d\sqrt n$, and the power is
$$
1 - \beta = \Prob\big(T_{\nu,\lambda} > t^*\big) + \Prob\big(T_{\nu,\lambda} < -t^*\big), \qquad t^* = t_{1-\alpha/2,\,\nu}.
$$ {#eq-power}
For a two-sample t-test with $n$ per group, $\nu = 2n - 2$ and $\lambda = d\sqrt{n/2}$. The large-sample normal approximation gives the sample size per group for power $1 - \beta$ as
$$
n \approx \frac{2\,(z_{1-\alpha/2} + z_{1-\beta})^2}{d^2}
$$ {#eq-n-two-sample}
(half that for a paired or one-sample test).
:::

The approximation in [[#eq-n-two-sample]] follows from requiring the alternative distribution, centred at $d\sqrt{n/2}$, to lie $z_{1-\beta}$ standard units beyond the critical value $z_{1-\alpha/2}$. Because the t distribution has heavier tails than the normal, the exact sample size is always a little larger.

::: example Planning a two-group experiment {#ex-power}
A physiologist plans to compare the mean growth rate of larvae on two diets, with a two-sided two-sample t-test at $\alpha = 0.05$. She wants 80 % power to detect a difference of half a standard deviation ($d = 0.5$). How many larvae per diet does she need? What if the effect is $d = 0.8$ or $d = 0.2$?
::: solution
With $z_{0.975} = 1.960$ and $z_{0.80} = 0.842$, [[#eq-n-two-sample]] gives $n \approx 2(2.802)^2/0.25 = 62.8$. The exact calculation [[#eq-power]] with the noncentral t distribution gives power 0.795 with 63 per group and 0.801 with 64, so she needs **64 larvae per diet**, 128 in all.

Repeating the exact calculation: $d = 0.8$ needs 26 per group; $d = 0.2$ needs 394 per group. Detecting an effect 2.5 times smaller costs about 15 times as many animals, since $n \propto 1/d^2$. (These values were computed for this lesson by numerical integration of the noncentral t distribution and agree with standard tables and software such as G*Power and R's `power.t.test`.)
:::
:::

::: widget hypothesis
test: t
tail: two
alpha: 0.05
effect: 0.555
n: 15
observed: 2.148
caption: Darwin's maize as a one-sample (paired) t-test. The curve centred at zero is the null distribution $t_{14}$; its shaded tails beyond $\pm2.145$ have total area $\alpha = 0.05$. The other curve is the distribution of $t$ if the true standardised effect were $d = 0.555$, the value Darwin observed ($20.93/37.74$); the part of it beyond the critical values is the power, only about 0.52. The marked observed value $t = 2.148$ sits right at the critical value. Increase $n$ to 30 and the power rises to about 0.84; set the effect to 0 and the power falls to $\alpha$.
:::

The figure makes a sobering point about Darwin's experiment. Even if the advantage of crossing were exactly as large as he observed, an experiment of fifteen pairs would detect it only about half the time. The "borderline" P-value is what we should expect from an experiment with power near 50 %.

::: quiz
A study finds no significant difference ($P = 0.34$) in the survival of tadpoles in ponds with and without a pesticide, with 4 ponds per treatment. What is the best conclusion?
- [ ] The pesticide has no effect on tadpole survival.
- [ ] The pesticide has a small effect, because $P$ is less than 0.5.
- [x] The data do not show an effect, but with 4 ponds per group the study probably had low power; the confidence interval for the difference is needed to judge which effects are excluded.
- [ ] The null hypothesis has a 34 % probability of being true.
::: solution
Absence of evidence is not evidence of absence. With $n = 4$ per group, a two-sample t-test has 80 % power only for effects of about $d = 2.4$ standard deviations. The confidence interval for the difference in survival is probably wide, including both zero and biologically important effects. The last option is the most common misreading of a P-value ([[#asa]]).
:::
:::

## What a P-value is not {#asa}

The P-value is perhaps the most misunderstood number in science. In 2016 the American Statistical Association took the unprecedented step of issuing a formal statement on it (Ronald Wasserstein and Nicole Lazar, *The American Statistician* 70: 129–133). Its six principles, paraphrased:

1. P-values can indicate how incompatible the data are with a specified statistical model.
2. P-values do not measure the probability that the hypothesis studied is true, or the probability that the data were produced by chance alone.
3. Scientific conclusions and policy decisions should not be based only on whether a P-value passes a threshold such as 0.05.
4. Proper inference requires full reporting and transparency: all the analyses done, not only those that gave small P-values.
5. A P-value, or statistical significance, does not measure the size of an effect or the importance of a result.
6. By itself, a P-value does not provide a good measure of evidence about a model or hypothesis.

::: warning "P is the probability that the null hypothesis is true"
The P-value is computed *assuming* $H_0$ is true; it is a statement about the data given the hypothesis, $\Prob(\text{data this extreme} \mid H_0)$, not about the hypothesis given the data. The two can be very different, just as the probability that a person who is a professional basketball player is tall differs from the probability that a tall person is a professional basketball player. To get the probability that $H_0$ is true you need the prior plausibility of $H_0$ and Bayes' theorem ([[#ex-fdr-prior]]). Equally, $P = 0.03$ does not mean a 97 % chance that the effect is real, and $P = 0.34$ does not mean a 34 % chance that there is no effect.
:::

Three further confusions are common in biology:

- **Statistical significance is not biological significance.** With a large enough sample, a trivially small difference — 0.1 % in body mass between two strains of mice — becomes highly significant. Conversely an important effect can be non-significant in a small study. Report the size of the effect and its confidence interval, and judge its importance biologically.
- **The difference between "significant" and "not significant" is not itself significant** (Andrew Gelman and Hal Stern, 2006). If drug A gives $P = 0.03$ and drug B gives $P = 0.12$ against a control, that is not evidence that A and B differ; that needs a direct comparison of A with B.
- **$P = 0.049$ and $P = 0.051$ are practically the same evidence.** The threshold 0.05 is a convention Fisher proposed in 1925 as a rough guide; treating it as a cliff encourages the manipulation described next.

### P-hacking and the garden of forking paths

A P-value is valid only if the test was chosen before the data were examined. In practice an analyst faces many choices: which outliers to exclude, which covariates to adjust for, whether to log-transform, which of several response variables to report, when to stop collecting data, which subgroup to analyse. Each choice made after looking at the data, in favour of the more significant result, inflates the type I error rate. Joseph Simmons, Leif Nelson and Uri Simonsohn showed in 2011 that a few such "researcher degrees of freedom", combined, could push the false-positive rate from 5 % to over 60 %. Andrew Gelman calls the problem the **garden of forking paths**: even without deliberate fishing, an analysis shaped by the data has an unknown error rate. The remedies — pre-registration of hypotheses and analysis plans, reporting every analysis performed, and replication — are discussed in [[biostatistics/experimental-design]].

## Multiple testing {#multiple-testing}

If you perform 20 independent tests at $\alpha = 0.05$ when every null hypothesis is true, the chance of at least one false positive is $1 - 0.95^{20} = 0.64$. In a genome-wide association study testing a million genetic variants, or an RNA-sequencing experiment testing 20,000 genes, uncorrected testing guarantees thousands of false positives. Two quite different goals can be set.

::: definition Family-wise error rate and false discovery rate {#def-fwer}
Among $m$ tests, let $V$ be the number of true null hypotheses rejected (false discoveries) and $R$ the total number of rejections. The **family-wise error rate** is $\mathrm{FWER} = \Prob(V \ge 1)$, the probability of making even one false discovery. The **false discovery rate** is $\mathrm{FDR} = \E[V/R]$ (with $V/R = 0$ when $R = 0$), the expected proportion of rejections that are false.
:::

Controlling the FWER is appropriate when a single false positive is costly — a small set of planned comparisons, a confirmatory study. Controlling the FDR is appropriate for screening, when we expect to follow up a list of candidates and can tolerate some false leads, as in genomics.

::: proposition Bonferroni, Holm and Benjamini–Hochberg procedures {#prop-multiple}
Let the $m$ P-values, sorted in increasing order, be $p_{(1)} \le p_{(2)} \le \dots \le p_{(m)}$.

- **Bonferroni**: reject every hypothesis with $p_i \le \alpha/m$. This controls the FWER at $\alpha$ under any dependence between the tests.
- **Holm** (1979): find the first $k$ for which $p_{(k)} > \alpha/(m - k + 1)$, and reject the hypotheses with the $k - 1$ smallest P-values (all of them if there is no such $k$). This also controls the FWER at $\alpha$ under any dependence, and it always rejects at least as many as Bonferroni.
- **Benjamini–Hochberg** (1995): find the largest $k$ such that $p_{(k)} \le k\alpha/m$, and reject the hypotheses with the $k$ smallest P-values. This controls the FDR at $\alpha$ (more exactly at $m_0\alpha/m$, where $m_0$ is the number of true nulls) when the tests are independent or positively dependent.
:::

::: proof Bonferroni controls the family-wise error rate
Let $I_0$ be the set of $m_0$ true null hypotheses. For each $i \in I_0$, $\Prob(p_i \le \alpha/m) = \alpha/m$ (a P-value is uniformly distributed under its null). The probability that at least one of these events happens is at most the sum of their probabilities (the union bound, which holds without independence): $\mathrm{FWER} \le m_0\alpha/m \le \alpha$.
:::

Holm's method is a step-down refinement of Bonferroni: once the smallest P-value has been rejected, only $m - 1$ hypotheses remain in contention, so the next can be compared with $\alpha/(m-1)$, and so on. There is no reason ever to prefer plain Bonferroni to Holm, except simplicity. Benjamini and Hochberg's step-up procedure is much more powerful when many hypotheses are false, which is why it is standard in genomics.

::: example Ten candidate genes {#ex-multiple}
An experiment compares the expression of ten candidate genes between two conditions. The ten P-values, sorted, are (illustrative values):

0.0008, 0.004, 0.006, 0.012, 0.031, 0.041, 0.062, 0.21, 0.48, 0.74.

Which genes are declared significant at $\alpha = 0.05$ with no correction, Bonferroni, Holm and Benjamini–Hochberg?
::: solution
**No correction**: six P-values are below 0.05.

**Bonferroni**: threshold $0.05/10 = 0.005$; two genes (0.0008 and 0.004).

**Holm**: compare $p_{(k)}$ with $0.05/(11 - k)$: $0.0008 \le 0.0050$ ✓; $0.004 \le 0.00556$ ✓; $0.006 \le 0.00625$ ✓; $0.012 > 0.00714$ ✗ — stop. Three genes.

**Benjamini–Hochberg**: compare $p_{(k)}$ with $0.005k$: thresholds 0.005, 0.010, 0.015, 0.020, 0.025, 0.030, …. The largest $k$ with $p_{(k)} \le 0.005k$ is $k = 4$ ($0.012 \le 0.020$; $0.031 > 0.025$, $0.041 > 0.030$, $0.062 > 0.035$ and so on). Four genes.

Equivalently, software reports **adjusted P-values** to compare directly with 0.05: for the fourth gene, Bonferroni 0.12, Holm 0.084 and BH 0.030. The BH-adjusted values are sometimes called q-values (strictly, John Storey's q-value of 2002 also estimates $m_0$). The choice of method changes the answer from two genes to four, and it must be made before looking.
:::
:::

### How often is a significant result true?

The FDR idea also answers a question that individual P-values cannot: across a field of research, what fraction of "significant" findings are false?

::: example Significant findings and prior plausibility {#ex-fdr-prior}
A field tests 1000 hypotheses, of which 10 % are actually true. Each study has 80 % power and uses $\alpha = 0.05$. How many significant results are expected, and what fraction are false? Repeat for a field in which only 1 % of hypotheses are true.
::: solution
Of 100 true hypotheses, $0.8\times100 = 80$ give significant results. Of 900 false ones, $0.05\times900 = 45$ give false positives. So 125 results are significant, and $45/125 = 36\,\%$ of them are false — far more than 5 %.

If only 1 % of hypotheses are true: $0.8\times10 = 8$ true positives and $0.05\times990 = 49.5$ false ones; 86 % of significant results are false. With 50 % true hypotheses the false fraction falls to $25/425 = 5.9\,\%$.

The probability that a significant result reflects a real effect depends on the prior plausibility of the hypotheses and on power, not just on $\alpha$. This is the core of John Ioannidis's argument, "Why most published research findings are false" (2005): exploratory fields with many long-shot hypotheses and underpowered studies produce mostly false positives. The fraction of false positives among positives is the positive predictive value turned round — the same arithmetic as for diagnostic tests ([Medicine Atlas: diagnostic tests](/learn/medicine/lesson.php?c=epidemiology-ebm&l=diagnostic-tests)).
:::
:::

Low power has a second, less obvious cost: the significant results that do emerge from underpowered studies **exaggerate** the true effect. If the power is 50 %, only the half of samples in which chance inflated the estimate reach significance, so the published estimates are biased upwards (the "winner's curse"; a type M, or magnitude, error in Gelman's terms). Darwin's observed advantage of 21 eighths of an inch may well be larger than the true one, for exactly this reason.

::: application Genome-wide significance
Genome-wide association studies test roughly a million approximately independent common variants across the human genome for association with a trait. The field adopted the threshold $P < 5\times10^{-8}$, a Bonferroni correction of 0.05 for one million tests, after early candidate-gene studies with uncorrected thresholds produced associations that mostly failed to replicate. Studies now need tens or hundreds of thousands of participants to reach it, and findings are reported only after replication in an independent sample. The same logic governs genome scans in crops and livestock and in natural populations ([[genomics]]). RNA-sequencing and proteomics experiments, by contrast, typically report genes at an FDR of 5 % or 10 % with the Benjamini–Hochberg procedure.
:::

::: history
John Arbuthnot's sex-ratio argument (1710) was a sign test in all but name. Karl Pearson's χ² test of 1900 ([[biostatistics/categorical-data]]) introduced the P-value as a general tool, and Student's t-test (1908) extended it to small samples. Ronald Fisher's *Statistical Methods for Research Workers* (1925), written at the Rothamsted agricultural experiment station, made significance tests a routine part of biology and suggested 0.05 as a convenient threshold; *The Design of Experiments* (1935) justified tests by randomisation, with Darwin's maize as the example. Jerzy Neyman and Egon Pearson's 1933 paper introduced alternative hypotheses, the two types of error and power, and the two schools disagreed bitterly for decades. Carlo Bonferroni's inequalities date from 1936, Sture Holm's step-down method from 1979, and Yoav Benjamini and Yosef Hochberg's false discovery rate from 1995. John Ioannidis's 2005 essay and the replication projects that followed led to the American Statistical Association's 2016 statement on P-values.
:::

::: summary
- A test assumes a null hypothesis, computes a test statistic, and reports the P-value: the probability, if $H_0$ were true, of a statistic at least as extreme as observed.
- Darwin's maize: Fisher's randomisation test gives $P = 1726/32\,768 = 0.053$; the paired t-test gives $t = 2.148$, $\nu = 14$, $P = 0.0497$.
- A two-sided test at level $\alpha$ rejects $\mu_0$ exactly when $\mu_0$ is outside the $1 - \alpha$ confidence interval; report the interval.
- Type I error (false positive) has probability $\alpha$; type II error (false negative) $\beta$; power $1 - \beta$ depends on $\alpha$, $n$ and $d = \delta/\sigma$.
- For a two-sample t-test with 80 % power at $\alpha = 0.05$: 64 per group for $d = 0.5$, 26 for $d = 0.8$, 394 for $d = 0.2$.
- A P-value is not the probability that $H_0$ is true, not a measure of effect size, and not valid after data-driven choices of analysis.
- Bonferroni and Holm control the family-wise error rate; Benjamini–Hochberg controls the false discovery rate and is more powerful for large screens.
- The fraction of significant findings that are false depends on prior plausibility and power; underpowered studies give many false positives and exaggerated effects.
:::

## Exercises

::: exercise At least one false positive {level=1 check="0.401"}
A researcher performs 10 independent tests at $\alpha = 0.05$, and every null hypothesis is true. What is the probability of at least one significant result? Give three decimal places.
::: solution
$1 - 0.95^{10} = 1 - 0.5987 = 0.401$.
:::
:::

::: exercise A Bonferroni threshold {level=1 check="0.0025"}
What per-test significance level does the Bonferroni correction give for 20 tests with a family-wise error rate of 0.05?
::: solution
$0.05/20 = 0.0025$.
:::
:::

::: exercise A one-sample t statistic {level=1 check="2.5"}
Twenty-five frogs have a mean body temperature 0.6 °C above the water, with standard deviation 1.2 °C. Calculate the t statistic for $H_0\colon\mu = 0$.
::: solution
$t = 0.6/(1.2/\sqrt{25}) = 0.6/0.24 = 2.5$, with 24 degrees of freedom (two-sided $P = 0.020$).
:::
:::

::: exercise Sample size by the normal approximation {level=2 check="32"}
Using the normal approximation (half of [[#eq-n-two-sample]]), how many pairs are needed for a paired t-test with 80 % power to detect $d = 0.5$ at $\alpha = 0.05$? Round up. (The exact calculation gives 34.)
::: solution
$n \approx (1.960 + 0.842)^2/0.5^2 = 7.849/0.25 = 31.4$, so 32 pairs. The exact noncentral-t calculation raises this to 34, because the t distribution with about 30 degrees of freedom has heavier tails than the normal.
:::
:::

::: exercise Holm by hand {level=2 check="2"}
Five P-values are 0.009, 0.011, 0.020, 0.040 and 0.30. How many hypotheses does Holm's procedure reject at $\alpha = 0.05$?
::: solution
Compare with $0.05/5 = 0.010$, $0.05/4 = 0.0125$, $0.05/3 = 0.0167$, …: $0.009 \le 0.010$ ✓, $0.011 \le 0.0125$ ✓, $0.020 > 0.0167$ ✗ — stop. Two hypotheses are rejected. (Bonferroni, with threshold 0.010, rejects one; Benjamini–Hochberg, with thresholds 0.01, 0.02, 0.03, 0.04, 0.05, rejects four, because $0.040 \le 0.040$.)
:::
:::

::: exercise False discoveries in a screen {level=2 check="0.5"}
A genetic screen tests 2000 mutants for a phenotype; in truth 40 have a real effect. Each test has power 0.5 and uses $\alpha = 0.01$. What fraction of the significant mutants are expected to be false positives? Give one significant figure.
::: solution
True positives: $0.5\times40 = 20$. False positives: $0.01\times1960 = 19.6$. Fraction false $= 19.6/39.6 = 0.495$, or 0.5 to one significant figure: half of the "hits" are expected to be false.
:::
:::

::: exercise Interpreting four studies {level=3}
Four studies estimate the effect of a nutrient supplement on the growth of juvenile fish (difference in mean length, mm, with 95 % confidence interval and P-value):

| study | estimate | 95 % CI | $P$ |
|---|---|---|---|
| A | 0.4 | 0.1 to 0.7 | 0.009 |
| B | 6.0 | −1.0 to 13.0 | 0.09 |
| C | 0.1 | −0.2 to 0.4 | 0.51 |
| D | 5.5 | 0.5 to 10.5 | 0.03 |

Suppose a difference of 3 mm is the smallest of practical importance. For each study say what it shows, and rank the studies by how useful they are to a fish farmer.
::: solution
A: statistically significant but the whole interval lies below 1 mm — the effect is real but too small to matter. A large, precise study.
B: not significant, but the interval runs from a small negative effect to a very large positive one; the study is inconclusive — too small, not negative.
C: not significant, and the interval excludes every effect of practical importance; this is good evidence of no useful effect (an informative "negative" result).
D: significant, with an interval from 0.5 to 10.5 mm; the effect is probably positive but could be trivial or large.
For decisions, the precise studies A and C are the most informative: both say the supplement is not worth using. B and D are imprecise and their estimates may be exaggerated (winner's curse in D). Ranking by P-value alone (A, D, B, C) would put the uninformative studies in the middle and the decisive negative one last.
:::
:::

::: exercise Stopping when significant {level=3}
A researcher measures pairs of plants one at a time and runs a paired t-test after each new pair from $n = 5$ onwards, stopping as soon as $P < 0.05$ or at $n = 50$. (a) Explain why the probability of a false positive is greater than 0.05 even if there is no effect. (b) A simulation of this procedure (with no true effect) finds a false-positive rate of about 0.2 to 0.3. Explain why repeated looking causes such a large inflation, and suggest two legitimate ways to monitor an experiment as data accumulate.
::: solution
(a) Each look is a new chance to cross the threshold. Under $H_0$ the t statistic wanders randomly as data accumulate, and the probability that it crosses $\pm t^*$ at least once in 46 looks is much larger than the probability that it is beyond $t^*$ at one pre-planned look.
(b) Successive test statistics are correlated, so the inflation is less than $1 - 0.95^{46}$, but the random walk of the statistic over many looks is likely to touch a fixed boundary sooner or later (by the law of the iterated logarithm, with unlimited looks it eventually crosses any fixed threshold with probability one). Legitimate options: fix the sample size in advance by a power calculation and test once; or use a **group-sequential design** with a small number of pre-planned interim analyses and adjusted boundaries (such as O'Brien–Fleming boundaries), as clinical trials do ([Medicine Atlas: randomised trials](/learn/medicine/lesson.php?c=epidemiology-ebm&l=randomised-trials)); or monitor with Bayesian methods whose interpretation does not depend on the stopping rule, accepting that their frequentist error rates must be studied separately.
:::
:::
