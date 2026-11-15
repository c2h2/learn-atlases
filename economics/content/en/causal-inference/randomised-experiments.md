If treatment is assigned by a coin toss, the people who get it and the people who do not were, before the toss, the same population. Their $Y_i(0)$ distributions match, their $Y_i(1)$ distributions match, and the naive comparison of mean outcomes is the average treatment effect. That is [[causal-inference/potential-outcomes#prop-random]], and it is why a well-run **randomised experiment** — a randomised controlled trial (RCT) in medicine, a randomised evaluation in economics — is the design against which every other design in this course is judged.

The argument is older than economics. Fisher advocated randomisation in agricultural trials in the 1920s and 1930s; Neyman's 1923 potential outcomes were invented for the same plots. In economics the modern wave begins with field experiments on social programmes (the Negative Income Tax experiments of the 1960s–70s, the NSW training experiment used by LaLonde 1986) and becomes a research programme with Banerjee, Duflo, Kremer and many others in development, and with a parallel industry of laboratory and field experiments in labour, education, public finance and industrial organisation. The 2019 Nobel Prize recognised that programme. This chapter is the toolkit: identification with and without covariates, inference and power, the intention-to-treat effect when people do not comply, and the threats — attrition, spillovers, Hawthorne effects — that can undo randomisation after the fact.

## Why randomisation identifies the ATE

Recall the switching equation $Y_i = Y_i(0) + D_i \tau_i$ and the selection-bias decomposition of [[causal-inference/potential-outcomes#thm-selection]]. Random assignment of $D_i$ makes $D_i$ independent of $\bigl(Y_i(1), Y_i(0)\bigr)$, so the two groups have the same mean $Y_i(0)$ and the selection term vanishes.

::: definition Completely randomised experiment {#def-cre}
In a **completely randomised experiment** with $n$ units, of which $n_1$ are treated, every subset of size $n_1$ is equally likely to be the treated group. In a **Bernoulli trial** each unit is treated independently with probability $p$. In a **stratified** (or blocked) experiment the sample is partitioned on covariates and complete randomisation is applied inside each stratum.
:::

Independence is slightly stronger in the Bernoulli trial (the number treated is random) than in the completely randomised experiment (the number treated is fixed, so $D_i$ and $D_j$ are weakly dependent). In large samples the distinction is second-order. Stratification is a free lunch: it balances the covariates you stratified on, and it typically reduces the variance of the estimated ATE without changing the estimand.

::: proposition Difference in means {#prop-dim}
In a completely randomised experiment, the difference in sample means

$$
\hat\tau = \bar Y_1 - \bar Y_0, \qquad \bar Y_d = \frac{1}{n_d}\sum_{i: D_i=d} Y_i,
$$

is unbiased for the finite-sample ATE $\tau = n^{-1}\sum_i \bigl(Y_i(1)-Y_i(0)\bigr)$ and, in a large superpopulation, consistent for $\tau_{\mathrm{ATE}}$. With the Neyman conservative variance

$$
\widehat{\Var}(\hat\tau) = \frac{s_1^2}{n_1} + \frac{s_0^2}{n_0},
$$ {#eq-neyman-var}

where $s_d^2$ is the sample variance of $Y$ in group $d$, a normal approximation $\hat\tau \big/ \sqrt{\widehat{\Var}(\hat\tau)}$ yields confidence intervals that are valid (if anything, slightly conservative) because the covariance of potential outcomes is unidentified.
:::

::: proof
Unbiasedness is a calculation with indicators. Let $D_i$ be the treatment indicator in a completely randomised design; $\E[D_i] = n_1/n$ and $\E[Y_i \mid D_i] = D_i Y_i(1) + (1-D_i) Y_i(0)$. Taking the expectation of $\hat\tau$ and using symmetry across units gives $\E[\hat\tau] = n^{-1}\sum_i \bigl(Y_i(1)-Y_i(0)\bigr)$. The variance formula is Neyman's (1923): the true sampling variance of $\hat\tau$ involves $\Cov\bigl(Y_i(1), Y_i(0)\bigr)$, which cannot be estimated because the two potential outcomes are never co-observed. Replacing that covariance by its Cauchy–Schwarz upper bound produces [[#eq-neyman-var]], which is therefore conservative. In a superpopulation with iid assignment the same formula is the ordinary two-sample variance and is consistent for $\Var(\hat\tau)$.
:::

Covariates are not required for unbiasedness, but they help with precision. The regression

$$
Y_i = \alpha + \tau D_i + X_i'\gamma + u_i
$$ {#eq-ancova}

is the analysis-of-covariance (ANCOVA) estimator. In a randomised experiment $D_i$ is independent of $X_i$, so omitting $X$ does not bias $\hat\tau$; including $X$ subtracts variation in $Y$ that randomisation did not need to balance, and typically shrinks the standard error. Lin (2013) recommends interacting $X$ with $D$ (fully saturated ANCOVA) so that $\hat\tau$ remains consistent for the ATE even when effects are heterogeneous.

::: example A simulated trial {#ex-rct-sim}
A training experiment is run with $n = 120$ people. Potential earnings are $Y_i(0) = 50 + 3 X_i + u_i$ and $Y_i(1) = 56 + 3 X_i + u_i$, so the ATE is $6$; $X_i$ and $u_i$ are independent normals (standard deviations $1$ and $1.5$). Treatment is Bernoulli with $p = 1/2$. Using `numpy.random.default_rng(7)`, fifty-six people are treated. The difference in means is $55.72 - 49.00 = 6.72$, with Neyman standard error $0.545$ (t-statistic $12.3$). OLS of $Y$ on $D$ and $X$ produces $\hat\tau = 5.83$ (standard error $0.26$). What has the covariate done?
::: solution
Randomisation already made the naive comparison unbiased: $6.72$ is within sampling error of $6$ (the discrepancy $0.72$ is $0.72/0.545 \approx 1.3$ standard errors, unremarkable). Adding $X$ does not change the estimand; it soaks up residual variation and halves the standard error, from $0.55$ to $0.26$. The ANCOVA point estimate $5.83$ is a little closer to $6$, as one would expect from a more precise unbiased estimator. Reproducing the numbers: draw $X$, $u$ and $D$ from the stated generator, form $Y = 50 + 3X + u + 6D$, and compute OLS as $\hat\beta = (X^\T X)^{-1} X^\T y$.
:::
:::

::: widget hypothesis
test: z
tail: two
alpha: 0.05
effect: 0.5
n: 64
observed: 2.0
caption: A two-sided $z$-test of $H_0$: ATE $= 0$. Raise the sample size $n$ and the true effect size (in standard deviations). The orange alternative distribution slides right, the blue rejection region stays put, and power $1-\beta$ rises. At $n = 64$ and an effect of $0.5$ sd the test is only moderately powered; experiments that look for small effects need large samples.
:::

## Power and sample size

An experiment that cannot distinguish a policy-relevant effect from zero is a waste of money, even if it is unbiased. **Power** is the probability of rejecting $H_0$: $\tau = 0$ when the true effect is $\tau$. For a two-sided test of size $\alpha$ with two groups of size $n$ and common outcome standard deviation $\sigma$,

$$
\mathrm{Power} \approx 1 - \Phi\Bigl(z_{1-\alpha/2} - \frac{\tau}{\sigma\sqrt{2/n}}\Bigr) + \Phi\Bigl(-z_{1-\alpha/2} - \frac{\tau}{\sigma\sqrt{2/n}}\Bigr),
$$ {#eq-power}

where $\Phi$ is the standard normal cdf and $z_{1-\alpha/2} \approx 1.96$ for $\alpha = 0.05$. The ratio $\tau/\sigma$ is a standardised effect (Cohen's $d$). Solving for $n$ at power $0.8$ gives the usual rule of thumb

$$
n \approx \frac{2\sigma^2 \bigl(z_{1-\alpha/2} + z_{0.8}\bigr)^2}{\tau^2} \approx 15.7\,\frac{\sigma^2}{\tau^2}
$$ {#eq-n80}

people *per arm*. Halving the detectable effect quadruples the sample.

::: example How large is large enough? {#ex-power}
Earnings have $\sigma = 10$ (in the same units as [[#ex-rct-sim]]). The effect worth detecting is $\tau = 4$. How many people per arm are needed for 80 percent power at $\alpha = 0.05$, two-sided? What is the power with 50 per arm?
::: solution
[[#eq-n80]] gives $n \approx 15.7 \times 100 / 16 = 98.1$, so about $100$ per arm (200 people in total). With $n = 50$, the standard error of $\hat\tau$ is $10\sqrt{2/50} = 2$, the non-centrality is $4/2 = 2$, and power is about $0.52$ — a coin toss dressed up as a trial. Many published social experiments are closer to this second calculation than to the first. Underpowered studies that are selected for statistical significance produce exaggerated effects; that is a leading reason for pre-registering a primary outcome and a minimum detectable effect before the trial runs (see [[causal-inference/external-validity]]).
:::
:::

::: warning Fishing after the fact
Randomisation identifies the ATE for *the outcome you specified*. It does not identify an ATE chosen from twenty outcomes, five subgroups and three functional forms after seeing the data. Multiple testing inflates Type I error; reporting only the significant comparisons inflates the typical published effect. The experimental ideal includes a pre-analysis plan: primary outcome, subgroups, and the estimator, written down before looking at $Y$. Exploratory analyses are valuable and should be labelled as such.
:::

Clustering changes the arithmetic. If treatment is assigned at the *school* level, the relevant $n$ is the number of schools, not the number of pupils; the variance in [[#eq-neyman-var]] should be clustered, or the data collapsed to school means. Duflo, Glennerster and Kremer (2007) is the standard practical guide: power calculations for clustered designs replace $\sigma^2$ by $\sigma^2 \bigl(1+(m-1)\rho\bigr)$, the Moulton factor, where $m$ is cluster size and $\rho$ is the intra-cluster correlation.

## Stratification, pair randomisation and rerandomisation

Three design choices improve on a coin toss without threatening unbiasedness.

**Stratification.** Partition on a covariate that predicts $Y$ (sex, site, baseline score) and randomise inside each stratum. The ATE estimator is a weighted average of within-stratum differences; its variance is smaller than the unstratified variance whenever the strata mean-outcomes differ. Never stratify on a post-treatment variable.

**Pair randomisation.** The extreme of stratification: pair units on $X$ and randomise within pairs. The estimator is the mean of the $n/2$ paired differences. Inference must respect the pairing (the unit of randomisation is the pair).

**Rerandomisation.** If a completely randomised assignment happens to unbalance an important covariate, some experimenters redraw. Morgan and Rubin (2012) show that rerandomisation that requires balance on $X$ is still unbiased for the ATE, with smaller variance, provided the acceptance rule is a symmetric function of the treated–control difference in $X$ and analysis accounts for it.

None of these is a licence to cherry-pick an assignment that makes $\hat\tau$ large. The assignment rule has to be specified in advance.

::: intuition The experiment as a missing-data design
Randomisation does not make $Y_i(0)$ observed for the treated. It makes the *missingness* independent of the missing values, which is enough to impute the missing mean from the other group. Everything that goes wrong with an experiment — attrition, non-compliance, spillovers — is a way in which missingness becomes dependent on the missing values after all.
:::

## Non-compliance and the intention to treat

People do not always do what they are assigned. In a job-training trial some of the treated never show up, and some of the controls find a similar course elsewhere. Let $Z_i$ be the **assignment** (the instrument, in the language of the next-but-one chapter) and $D_i$ the **treatment taken**. The switching equation is still $Y_i = Y_i(0) + D_i \tau_i$; $Z_i$ does not appear in it.

::: definition Intention-to-treat {#def-itt}
The **intention-to-treat** (ITT) effect is the effect of *assignment* on the outcome:

$$
\tau_{\mathrm{ITT}} = \E[Y_i \mid Z_i = 1] - \E[Y_i \mid Z_i = 0].
$$

It is identified by random assignment of $Z_i$ under SUTVA for $Z$, regardless of how badly people comply.
:::

The ITT answers a policy question: what happens if we *offer* the programme? It is not the effect of taking the programme. If take-up is low, the ITT is a diluted version of the effect on those who take it.

To recover an effect of *treatment* one needs more. Imbens and Angrist (1994) and Angrist, Imbens and Rubin (1996) partition the population into **always-takers** ($D_i = 1$ whatever $Z_i$), **never-takers** ($D_i = 0$ whatever $Z_i$), **compliers** ($D_i = Z_i$) and **defiers** ($D_i = 1-Z_i$). Under monotonicity (no defiers) and an exclusion restriction ($Z$ affects $Y$ only through $D$), the Wald ratio

$$
\hat\tau_{\mathrm{Wald}} = \frac{\bar Y_{Z=1} - \bar Y_{Z=0}}{\bar D_{Z=1} - \bar D_{Z=0}}
$$ {#eq-wald}

is consistent for the **local average treatment effect** on compliers. The denominator is the first-stage difference in take-up. This is the LATE theorem, proved and discussed in [[causal-inference/iv-and-late]]; it is mentioned here because almost every social experiment has one-sided non-compliance and therefore estimates a LATE, not an ATE, once one divides the ITT by take-up.

::: example Dilution {#ex-itt}
Assignment is randomised. Take-up is $80$ percent in the assigned-to-treatment arm and $20$ percent in the control arm (some controls obtain the treatment on their own). The ITT on earnings is $4$. Under monotonicity and exclusion, what is the LATE for compliers? What share of the population are compliers?
::: solution
The first stage is $0.80 - 0.20 = 0.60$, so the complier share is $0.60$ and $\tau_{\mathrm{LATE}} = 4 / 0.60 \approx 6.67$. Always-takers are $20$ percent, never-takers $20$ percent, compliers $60$ percent, defiers (by monotonicity) $0$. The ITT is a $60$–$40$ mix of the complier effect and a zero effect on always- and never-takers, for whom assignment does not change treatment. Reporting only the ITT, or reporting $4$ as “the effect of training”, would understate the effect of *taking* training for those whose take-up is moved by the offer.
:::
:::

::: warning Per-protocol is not a solution
A **per-protocol** analysis compares people who actually took the treatment with people who did not, ignoring assignment. That comparison reintroduces selection: the always-takers and the never-takers are different people. It throws away the experiment. Analyse ITT; if you want an effect of treatment, use the Wald ratio (or two-stage least squares) and state that it is a LATE for compliers.
:::

## Threats that randomisation does not prevent

Random assignment balances potential outcomes *at assignment*. Several things can unbalance them afterwards.

**Attrition.** If people leave the sample for reasons related to treatment and to $Y$, the remaining comparison is selected. Differential attrition is a first-order threat in field experiments with long follow-ups. Partial remedies: track a random subsample intensively (Lee 2009 trimming bounds), report attrition by arm, and bound the ATE by assigning the worst and best missing outcomes (Manski-type bounds, as in the exercises of [[causal-inference/potential-outcomes]]).

**Spillovers and SUTVA.** If a treated farmer's new seed blows into a control farmer's field, or a deworming programme reduces infection among untreated neighbours, the control group's $Y_i(0)$ is not the no-programme potential outcome. Miguel and Kremer (2004), in a randomised school deworming programme in Busia, Kenya, documented exactly this: treated schools had lower worm loads, and so did nearby untreated schools. Treating the school as the unit, and using distance to estimate spillovers, turned a SUTVA violation into a finding — that deworming reduced absenteeism by about one-quarter in treated schools, with additional externalities on untreated neighbours. The later “worm wars” re-analysis (Aiken et al. 2015; Hicks, Kremer and Miguel's replies) disputed magnitudes and cost-effectiveness but not the existence of spillovers. Design around interference: randomise clusters, measure neighbours, or both.

**Hawthorne and John Henry effects.** People who know they are in a trial may change behaviour because they are watched (Hawthorne) or because they are the controls and try harder (John Henry). Double-blinding, standard in drug trials, is often impossible in social programmes. A partial check is a pure-control arm that is not surveyed as often, or a placebo programme.

**Balance is not a test of identification, but imbalance is a warning.** With many covariates, some treated–control differences will be significant by chance. A joint $F$-test of $D$ on $X$, or a normalised difference $\bigl(\bar X_1 - \bar X_0\bigr)\big/\sqrt{(s_1^2+s_0^2)/2}$, is more informative than a table of stars. Large imbalances should be explained (failed randomisation, attrition, a coding error) and, if needed, adjusted for.

::: quiz
An experiment assigns job training by lottery. Thirty percent of the lottery winners never attend, and ten percent of the losers find equivalent training elsewhere. The difference in mean earnings by *lottery outcome* is 300. The difference by *actual attendance* is 1,200. Which is the ITT, and which comparison is causally interpreted only under extra assumptions?
- [ ] 1,200 is the ITT; 300 is biased
- [x] 300 is the ITT; 1,200 is a selected comparison (per-protocol) unless turned into a Wald LATE
- [ ] Both are ATEs, because the lottery was randomised
- [ ] Neither is interpretable, because compliance was imperfect
::: solution
Assignment $Z$ is randomised, so the comparison by lottery outcome is the ITT and is causal for the effect of *winning the lottery*. The comparison by attendance is per-protocol and is generally biased. Dividing $300$ by the first stage $0.30-0.10 = 0.20$ would give a Wald LATE of $1{,}500$ for compliers, which is *not* the $1{,}200$ per-protocol number. Imperfect compliance does not destroy the ITT.
:::
:::

## Evidence

The Tennessee STAR class-size experiment (Krueger 1999, among others) randomly assigned kindergarten pupils to small classes, regular classes, or regular classes with a teacher's aide. Small classes raised test scores by about $0.2$ standard deviations, with larger effects for disadvantaged pupils; the effect faded on some later tests but reappeared in college-going (Chetty et al. 2011, using administrative follow-up). STAR is a model of a large, well-documented social experiment, and also a model of the arguments that follow: was the randomisation clean (yes, with some caveats about scaling-up and later tracking), and does $0.2$ sd at kindergarten justify the cost of smaller classes everywhere (an external-validity question)?

Progresa (later Oportunidades, then Prospera) in Mexico, launched in 1997, randomised the *timing* of a conditional cash transfer across poor rural villages. Schultz (2004) and many subsequent papers found substantial increases in school enrolment, especially in the transition to secondary school, and improvements in health. Because the control villages were scheduled to receive the programme later, the design estimates a short-run effect of earlier rollout; long-run evaluations have used the original randomisation years after the controls were treated, with mixed persistence. Progresa is also a political-economy story: a randomised evaluation was built into a national policy, and the evaluation is widely credited with helping the programme survive a change of government.

Not every experiment looks like STAR or Progresa. Many development RCTs are small, short-run, and run in sites that NGOs already work in. Allcott (2015) documents **site-selection bias** in energy-conservation experiments: the first partner utilities were those for whom the programme worked best, and later sites showed smaller effects. An internally valid estimate from the wrong site is still the wrong number for national policy. That is the subject of [[causal-inference/external-validity]].

::: example STAR, in potential outcomes {#ex-star}
Tennessee STAR randomly assigned kindergarten pupils to small classes (about $15$ pupils) or regular classes (about $22$). Krueger (1999) reports that small classes raised test scores by about $0.2$ standard deviations. In the language of this chapter: what is $D_i$, what is the ITT, and why might the ATT differ?
::: solution
$D_i$ is assignment to a small class (in STAR, assignment and enrolment were close, so ITT $\approx$ ATT). The $0.2$ sd is an ITT for pupils in the experimental sample, in those grades. The ATT would differ if some assigned pupils switched class type (they did, a little: some parents moved children, some schools backfilled). Krueger's tables include both an assignment contrast and an adjustment for crossover; they agree closely. The number is *not* the effect of reducing every class in a state to $15$, which would change the teacher pool (a scale/implementation gap taken up in [[causal-inference/external-validity]]).
:::
:::

::: application From the trial to the regression
The experimental estimator is ordinary least squares of $Y$ on $D$ (and perhaps $X$). Everything you know from [[econometrics/inference]] about heteroskedasticity-robust and clustered standard errors applies. What is new is the *interpretation*: under random assignment, $\hat\tau$ is not “the coefficient on $D$ holding $X$ fixed in a linear model of $Y$”. It is the ATE (or the ITT, if $D$ is assignment). The linear model is a computational device, not the causal model. The causal model is $Y_i = Y_i(0) + D_i \tau_i$ with $D_i$ independent of the potential outcomes.
:::

::: history
**1925–1935, Ronald Fisher and Jerzy Neyman.** Fisher’s *Statistical Methods for Research Workers* (1925) and *The Design of Experiments* (1935) made randomisation the basis of agricultural inference, including the tea-tasting lady as a permutation test. Neyman’s 1923 thesis, in parallel, defined the ATE and a conservative variance that does not require Fisher’s sharp null.

**1970s, social experiments in the United States.** The Negative Income Tax experiments, the RAND Health Insurance Experiment, and the National Supported Work demonstration brought random assignment to tax, health and training policy. LaLonde (1986) used NSW as a benchmark for observational estimators.

**1997–, Progresa and the development RCT movement.** Mexico’s Progresa built a randomised evaluation into a national anti-poverty programme. Banerjee, Duflo, Kremer and co-authors scaled the method across education, health and credit in India, Kenya and elsewhere; the 2019 Nobel Prize recognised that work. Miguel and Kremer (2004) on deworming remains a canonical — and contested — illustration of both the power of randomisation and the reality of spillovers.
:::

## Where this leads

When assignment is randomised but take-up is not, the ITT is identified and the LATE for compliers is identified under extra assumptions; that is [[causal-inference/iv-and-late]]. When randomisation is unavailable, the next chapters look for a substitute: a covariate set that restores ignorability ([[causal-inference/selection-on-observables]]), a cutoff ([[causal-inference/regression-discontinuity]]), a comparison group over time ([[causal-inference/difference-in-differences]]), or a synthetic twin ([[causal-inference/synthetic-control]]). Experiments also set the standard those designs are tested against, in the spirit of LaLonde. And because a well-identified effect in one sample may not travel, [[causal-inference/external-validity]] asks how to combine, replicate and transport experimental estimates.

::: summary
- Random assignment of $D$ makes treatment independent of potential outcomes, so the difference in means is unbiased for the ATE ([[#prop-dim]]). Covariates are for precision, not for unbiasedness.
- Power scales with $n \tau^2/\sigma^2$. Detecting small effects requires large (often clustered) samples; underpowered significant results are exaggerated ([[#eq-n80]]).
- Pre-specify the primary outcome and the subgroups. Randomisation does not license a search over specifications.
- With non-compliance, the ITT is the effect of assignment and is still identified ([[#def-itt]]). The effect of treatment is a LATE for compliers, obtained by dividing by the first stage — not by dropping non-compliers.
- Attrition, spillovers and Hawthorne effects can undo randomisation after assignment. Cluster randomisation, spillover arms and attrition bounds are part of the design, not afterthoughts.
:::

## Exercises

::: exercise Difference in means {level=1 check="6"}
In a completely randomised experiment, the treated ($n_1 = 50$) have mean outcome $22$ and the untreated ($n_0 = 50$) have mean $16$. What is $\hat\tau$? (Enter the integer.)
::: solution
$\hat\tau = 22 - 16 = 6$. Under random assignment this estimates the ATE (and the ATT, which coincide).
:::
:::

::: exercise Neyman standard error {level=1 check="2"}
In the same experiment the sample variances are $s_1^2 = 100$ and $s_0^2 = 100$. Using [[#eq-neyman-var]], what is the standard error of $\hat\tau$? (Enter the integer.)
::: solution
$\widehat{\Var}(\hat\tau) = 100/50 + 100/50 = 4$, so the standard error is $2$.
:::
:::

::: exercise Complier share {level=1 check="0.5"}
Take-up is $0.70$ among those assigned to treatment and $0.20$ among those assigned to control. Under monotonicity, what share of the population are compliers? (Enter a decimal.)
::: solution
The first stage is $0.70 - 0.20 = 0.50$. That difference is the complier share.
:::
:::

::: exercise Wald from an ITT {level=2 check="8"}
The ITT is $4$ and the first stage (difference in take-up) is $0.5$. Under monotonicity and exclusion, what is the LATE for compliers? (Enter the integer.)
::: solution
$\tau_{\mathrm{LATE}} = 4 / 0.5 = 8$.
:::
:::

::: exercise Sample size {level=2 check="100"}
Using [[#eq-n80]], with $\sigma = 10$ and $\tau = 4$, how many people *per arm* are needed for (approximately) 80 percent power? Round to the nearest ten. (Enter the integer.)
::: hint
$n \approx 15.7\,\sigma^2/\tau^2$.
:::
::: solution
$15.7 \times 100 / 16 = 98.125$, which rounds to $100$. (The more precise calculation with $z_{0.975} = 1.96$ and $z_{0.8} = 0.84$ gives $n = 2\sigma^2(1.96+0.84)^2/\tau^2 = 98.1$.)
:::
:::

::: exercise Why ANCOVA does not bias {level=2}
In a randomised experiment, $D$ is independent of a pre-treatment covariate $X$. Explain why the coefficient on $D$ in the regression of $Y$ on $D$ alone, and in the regression of $Y$ on $D$ and $X$, both estimate the ATE (with constant effects), and why the second is typically more precise.
::: solution
Independence of $D$ and $X$ implies that $X$ is not a confounder: it does not appear in the selection-bias term of [[causal-inference/potential-outcomes#thm-selection]]. By the omitted-variable formula of [[econometrics/multiple-regression]], the bias from omitting $X$ is proportional to the coefficient of $X$ in a regression of $D$ on $X$, which is zero. So both regressions are unbiased for $\tau$. The residual variance of $Y$ given $D$ and $X$ is smaller than given $D$ alone whenever $X$ predicts $Y$, and the standard error of $\hat\tau$ shrinks accordingly. (With heterogeneous effects, Lin's interacted specification keeps the estimand equal to the ATE.)
:::
:::

::: exercise One-sided non-compliance {level=3}
In many social experiments, controls cannot obtain the treatment (one-sided non-compliance): $D_i = 0$ whenever $Z_i = 0$, while some of those assigned to treatment do not take it up. Show that, under exclusion and SUTVA, the Wald estimator equals the ATT (not just the LATE for a strict subset of the treated).
::: hint
Always-takers cannot exist if nobody with $Z=0$ is treated. Who, then, are the treated?
:::
::: solution
$Z_i = 0$ implies $D_i = 0$, so there are no always-takers and no defiers. The treated ($D_i = 1$) are therefore a subset of those assigned to treatment, and they are exactly the compliers. The LATE for compliers is the ATT. The Wald denominator is $\Prob(D_i=1 \mid Z_i=1) = \Prob(\text{complier})$, and the ITT equals that probability times the ATT. This is why experimental papers with one-sided non-compliance often report “TOT” (treatment on the treated) as ITT divided by take-up.
:::
:::

::: exercise Attrition bounds {level=3}
A binary outcome (employment) is observed for every treated unit, with $\bar Y_1 = 0.60$, but 20 percent of the controls attrit. Among remaining controls, $\bar Y_0 = 0.50$. The treated and control assigned groups were of equal size. Give the worst-case and best-case ITT when missing control outcomes can be $0$ or $1$.
::: hint
Fill in the missing 20 percent of controls with $0$ to maximise the ITT, and with $1$ to minimise it. The observed control mean $0.50$ applies to the 80 percent who remain.
:::
::: solution
The control mean under worst-case missingness (all missing controls have $Y=0$) is $0.8\times 0.50 + 0.2\times 0 = 0.40$, so the ITT is $0.60-0.40 = 0.20$. Under best-case missingness (all missing controls have $Y=1$) the control mean is $0.8\times 0.50 + 0.2\times 1 = 0.60$, so the ITT is $0.60-0.60 = 0$. The identified set is $[0, 0.20]$. The point estimate that ignores attrition, $0.60-0.50 = 0.10$, sits inside the set; the set is the honest report when one refuses to assume that attrition is independent of $Y$.
:::
:::

::: exercise Clustered power {level=3}
A school-level experiment has $m = 50$ pupils per school and intra-cluster correlation $\rho = 0.05$. Relative to an individually randomised design, by what factor must the number of *pupils* increase to keep the same power? (The Moulton factor is $1+(m-1)\rho$.)
::: solution
The Moulton factor is $1 + 49\times 0.05 = 3.45$. Variance of the school-mean comparison is $3.45$ times the individually randomised variance for the same number of pupils, so one needs $3.45$ times as many pupils — equivalently, the design is about as precise as an individual RCT with $n/3.45$ observations. With $50$ schools (25 per arm) the effective sample is far closer to $50$ than to $2{,}500$. This is why power calculations for clustered trials are done in numbers of clusters.
:::
:::
