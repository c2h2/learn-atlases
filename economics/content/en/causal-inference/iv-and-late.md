A valid instrument is a source of variation in treatment that is as good as random and that does not affect the outcome except by moving treatment. Randomised assignment with imperfect compliance is the cleanest case: the lottery is the instrument, take-up is the treatment, and the Wald ratio of [[causal-inference/randomised-experiments#eq-wald]] is the effect on people who take the programme because they won the lottery. **Natural experiments** try to find the same structure in the wild: a draft lottery, a school-entry cutoff, a river that was on one side of a tax, a quarter of birth that shifts compulsory schooling.

Two ideas organise the chapter. First, the instrumental-variables (IV) estimand is not the ATE. Under the Imbens–Angrist conditions it is the **local average treatment effect** (LATE) for **compliers** — people whose treatment is moved by the instrument. Second, an instrument that is only weakly correlated with treatment produces estimates that are biased towards OLS, even in huge samples. Angrist and Krueger's (1991) quarter-of-birth study, and Bound, Jaeger and Baker's (1995) critique of it, are the founding illustration of both ideas.

The mechanics of two-stage least squares are in [[econometrics/instrumental-variables]]. This chapter is about what the number means.

## The three IV conditions, and a fourth

::: definition Instrumental-variables conditions {#def-iv}
A binary instrument $Z_i$ is valid for a binary treatment $D_i$ if:

1. **Independence (as-good-as-random).** $\bigl(Y_i(1), Y_i(0), D_i(1), D_i(0)\bigr) \perp Z_i$, where $D_i(z)$ is the treatment unit $i$ would take if assigned $Z_i = z$.
2. **Exclusion.** $Z_i$ does not enter the outcome equation: $Y_i = Y_i\bigl(D_i, Z_i\bigr)$ depends on $Z$ only through $D$, so we may write $Y_i(d)$ as before.
3. **Relevance (first stage).** $\E[D_i \mid Z_i = 1] \ne \E[D_i \mid Z_i = 0]$.

**Monotonicity** (no defiers) is the fourth condition: $D_i(1) \ge D_i(0)$ for all $i$ (or the reverse for all $i$).
:::

Independence is the randomisation of $Z$. Exclusion says the lottery ticket does not raise earnings except by sending you to training. Relevance says the lottery actually changes take-up. Monotonicity says nobody does the opposite of their assignment. The first three are the classical IV conditions; the fourth is what makes the estimand a well-defined average of individual effects rather than a mixture with negative weights.

::: warning Exclusion is a causal claim, not a regression residual
"The instrument is uncorrelated with the error" in the linear model $Y = \alpha + \tau D + u$ is *equivalent* to exclusion plus independence in that model, but it hides the economics. The way to argue exclusion is to name the channels through which $Z$ could affect $Y$ and to shut them down, not to look at a diagnostic of $u$. An overidentification test (Sargan, Hansen) can reject exclusion when there are extra instruments; it cannot confirm exclusion when there is only one.
:::

## The Wald estimator and the LATE theorem

With a binary $Z$ and a binary $D$, two-stage least squares collapses to the **Wald ratio**

$$
\tau_{\mathrm{Wald}} = \frac{\E[Y_i \mid Z_i=1] - \E[Y_i \mid Z_i=0]}{\E[D_i \mid Z_i=1] - \E[D_i \mid Z_i=0]} = \frac{\text{reduced form}}{\text{first stage}}.
$$ {#eq-wald-pop}

The numerator is the ITT of [[causal-inference/randomised-experiments#def-itt]]; the denominator is the difference in take-up.

::: definition Two-stage least squares (binary case) {#def-2sls}
**Two-stage least squares** with a single binary instrument is the sample Wald ratio: the OLS reduced form of $Y$ on $Z$ divided by the OLS first stage of $D$ on $Z$. With covariates, the same ratio is taken after partialling $X$ out of $Y$, $D$ and $Z$. In matrix form, $\hat\tau_{\mathrm{2SLS}} = (Z_{\mathrm{mat}}^\T X_{\mathrm{mat}})^{-1} Z_{\mathrm{mat}}^\T Y$ with $X_{\mathrm{mat}} = [1, D]$ and $Z_{\mathrm{mat}} = [1, Z]$.
:::

::: theorem LATE {#thm-late}
Assume SUTVA, the four conditions of [[#def-iv]], and a binary $Z$. Then

$$
\tau_{\mathrm{Wald}} = \E\bigl[Y_i(1) - Y_i(0) \bigm| D_i(1) > D_i(0)\bigr] = \tau_{\mathrm{LATE}},
$$

the average treatment effect on **compliers**. Always-takers and never-takers contribute to neither the numerator nor the denominator: the instrument does not change their treatment, so it does not change their outcome (by exclusion).
:::

::: proof
Independence lets us write the reduced form as $\E[Y_i(D_i(1))] - \E[Y_i(D_i(0))]$. Partition the population into always-takers $D(1)=D(0)=1$, never-takers $D(1)=D(0)=0$, compliers $D(1)>D(0)$, and defiers $D(1)<D(0)$. Monotonicity sets the defier share to zero. Exclusion implies that always-takers contribute $Y(1)$ under both $Z$ values and never-takers contribute $Y(0)$ under both, so they cancel in the reduced form. Compliers contribute $Y(1)$ when $Z=1$ and $Y(0)$ when $Z=0$. The reduced form is therefore $\pi_c \cdot \E[Y(1)-Y(0) \mid \text{complier}]$, where $\pi_c = \Prob(D(1)>D(0))$ is also the first stage. Dividing gives the LATE. (Imbens and Angrist 1994, Theorem 1; Angrist, Imbens and Rubin 1996 for the four-type language.)
:::

The LATE is an ATT for a specific subpopulation: the people whose treatment the instrument can switch. It is not the ATE, not the ATT in the whole treated population (which includes always-takers), and not the effect of a mandate that would force never-takers into treatment. Whether it is the interesting number depends on the instrument. A draft lottery's compliers are people who serve because they were drafted and would not have served otherwise — a group of first-order policy interest for military manpower. A quarter-of-birth instrument's compliers are people who stay in school because the law makes them, typically people near the minimum leaving age — a group of interest for compulsory-schooling policy, not for the return to a university degree.

::: example A numerical Wald {#ex-wald-hand}
Eighty people are assigned $Z=1$ and eighty $Z=0$. Mean outcome is $32$ in the $Z=1$ group and $24$ in the $Z=0$ group. Take-up is $48/80$ and $16/80$ respectively. Compute the first stage, the reduced form and the Wald LATE. Who are the always-takers?
::: solution
The reduced form is $32-24 = 8$. The first stage is $0.60 - 0.20 = 0.40$. The Wald ratio is $8/0.40 = 20$. Always-takers are people who take treatment even when $Z=0$, a share $0.20$ of the population (assuming no defiers, so $\E[D \mid Z=0]$ equals the always-taker share). Never-takers are $1-0.60 = 0.40$. Compliers are $0.40$. The ITT of $8$ is the complier effect of $20$ diluted by the $60$ percent of people whose treatment $Z$ does not change.
:::
:::

::: example A simulated LATE {#ex-late-sim}
A sample of $n = 400$ is drawn with `numpy.random.default_rng(13)`. Types are never-taker, complier, always-taker with probabilities $0.30, 0.50, 0.20$; $Z$ is a fair coin; $D = Z$ for compliers, $1$ for always-takers, $0$ for never-takers. Treatment effects are $8$ for compliers, $2$ for always-takers, $5$ for never-takers, and $Y(0) = 20 + \mathrm{noise}$. The realised shares are $0.29$, $0.545$, $0.165$. The first stage is $0.527$, the reduced form $4.58$, the Wald estimate $8.70$. OLS of $Y$ on $D$ is $5.99$. Comment.
::: solution
The true LATE is $8$ (constant on compliers); $8.70$ is sampling error with $n=400$ (the first-stage $t$-statistic is $12.5$, so this is not a weak-instrument problem). OLS, $5.99$, is close to the ATE of $6.14$ in this draw — it mixes always-takers (effect $2$) with compliers (effect $8$) among the treated — and is *not* the LATE. IV and OLS answer different questions; they need not agree even when both are consistent for their own estimands. Two-stage least squares with the binary $Z$ reproduces the Wald number: $\hat\tau_{\mathrm{2SLS}} = 8.70$. Reproduce by constructing $D$ from types and $Z$, $Y = 20 + \tau_{\text{type}} \cdot D + \mathrm{noise}$, and computing $\hat\beta = (Z^\T X)^{-1} Z^\T Y$ with $X = [1, D]$ and $Z_{\mathrm{mat}} = [1, Z]$.
:::
:::

::: widget plot
f: rf / max(fs, 0.05); 8
sliders: rf=4:0:10; fs=0.5:0.05:1
x: 0, 1
y: 0, 40
labels: \text{Wald LATE}; \text{true LATE}=8
caption: The Wald ratio (reduced form)/(first stage). Keep the reduced form at $4$ and shrink the first stage: the LATE explodes. That is not a large effect — it is a small denominator. Weak instruments live at the left of the $f_s$ slider. The true LATE in this cartoon is $8$, which the Wald recovers when $f_s$ equals the complier share that generated $r_f = 8 f_s$.
:::

## Two-stage least squares, covariates and multiple instruments

With covariates $X_i$ that make $Z$ conditionally independent of potential outcomes, the same theorem holds *inside* cells of $X$, and 2SLS of $Y$ on $D$ and $X$, instrumenting $D$ with $Z$ and $X$, averages the cell LATEs with a variance weight analogous to [[causal-inference/selection-on-observables#prop-ols-weights]] (Angrist and Imbens 1995). With a continuous $D$ or a multi-valued $Z$, 2SLS estimates a **weighted average of causal responses** along the $D$ margin that $Z$ shifts, with non-negative weights under monotonicity.

Multiple instruments, each with its own compliers, produce a 2SLS estimand that is a weighted average of instrument-specific LATEs, with weights proportional to the strength of each first stage (Imbens and Angrist 1994, Theorem 2). If two instruments move different people, and those people have different effects, the two just-identified IV estimates will differ — not because one is "wrong", but because they are averages over different complier groups. That is a feature. It is also why overidentification tests reject when instruments are valid for different LATEs: the test assumes a common $\tau$.

## Weak instruments

Relevance is not a yes-or-no condition in finite samples. If the first stage is small, two things go wrong.

**Inconsistency from even a little exclusion error.** The IV probability limit is $\tau + \Cov(Z,u)/\Cov(Z,D)$. A small $\Cov(Z,D)$ blows up any exclusion violation. Bound, Jaeger and Baker (1995) emphasised this: an instrument that is *almost* exogenous and *almost* irrelevant can be worse than OLS.

**Finite-sample bias towards OLS.** Even with exact exclusion, the 2SLS estimator is biased towards the OLS estimand, with the bias shrinking like $1/F$ where $F$ is the first-stage $F$-statistic on the excluded instruments. Staiger and Stock (1997) suggested $F > 10$ as a rule of thumb; Stock and Yogo (2005) tabulated critical values; Lee, McCrary, Moreira and Porter (2022) argue that $F > 10$ is too lenient for conventional $t$-tests and recommend $F > 104$ if one wants the usual $t$-critical values to be reliable. Robust procedures (Anderson–Rubin; conditional likelihood ratio; identification-robust confidence sets) remain valid when $F$ is small; they should be reported whenever the first stage is not overwhelming.

A diagnostic that belongs in every IV table: the first-stage coefficient, its standard error, and the $F$-statistic on the excluded instruments. Partial $R^2$ of $Z$ given $X$ is the other Bound–Jaeger–Baker statistic.

::: example Angrist and Krueger (1991), and the critique {#ex-ak91}
Angrist and Krueger used quarter of birth as an instrument for years of schooling, in samples of hundreds of thousands of American men from the 1960 and 1980 censuses. The idea: children born at the start of the year start school older, hit the compulsory-leaving age after less schooling, and (some of them) drop out. The reduced form — quarter of birth predicts earnings — divided by the first stage — quarter of birth predicts schooling — is a Wald estimate of the return to a year of school for the people whose leaving is moved by the law. Their IV estimates were close to OLS, around $7$–$10$ percent per year, which they read as evidence that OLS ability bias is small for this margin.

Bound, Jaeger and Baker (1995) re-examined the many-instrument specifications (quarter of birth interacted with year and state of birth: 180 instruments). The first-stage $F$ on those interactions can be small, even with enormous $n$, because each interaction is a weak shifter. They showed that replacing the real quarter-of-birth dummies with *randomly generated* dummies still produced IV estimates close to OLS — the signature of weak-instrument bias. The just-identified Wald using a single quarter-of-birth dummy is much less prone to this, but its reduced form is also smaller and more fragile (season-of-birth may affect earnings through health and attendance, a possible exclusion violation; Buckles and Hungerman 2013 document systematic differences in parental characteristics by season of birth).

The current reading is mixed. The *design* — compulsory schooling as a shifter of education at the leaving-age margin — is still used, often with better first stages (changes in school-leaving laws across states and cohorts: Acemoglu and Angrist 2000; Oreopoulos 2006; Pischke and von Wachter 2008, who find zero returns in Germany). The original 180-instrument 2SLS number is not trusted. The episode taught the profession to report $F$ and to prefer few strong instruments over many weak ones.
::: solution
The paper's headline — IV close to OLS, returns of about $7$–$10$ percent — is a LATE for compulsory-schooling compliers, not a return to university. The many-instrument 2SLS specification is the one Bound, Jaeger and Baker showed can be reproduced with noise; the just-identified Wald is the more credible IV number, and even it needs a defence of exclusion (season of birth is not a lottery). The lasting methodological lesson is to report the first-stage $F$ and to treat $F$ near $1$ as a design failure, not as a small-sample inconvenience.
:::
:::

::: quiz
A just-identified IV estimate is $0.09$ and OLS is $0.07$. The first-stage $F$ is $4$. The most careful conclusion is
- [ ] IV is larger, so OLS is biased down by ability
- [x] the IV estimate is not reliable enough to compare with OLS; $F = 4$ is in the weak-instrument region
- [ ] $F = 4$ is fine because $n$ is probably large
- [ ] exclusion must hold, because otherwise 2SLS would not run
::: solution
$F = 4$ is well below every conventional threshold. Finite-sample bias towards OLS is substantial, and any exclusion error is magnified. Large $n$ does not cure a weak first stage (Bound, Jaeger and Baker's point). Exclusion is an assumption, not a by-product of estimation. A just-identified Anderson–Rubin interval would be the honest report.
:::
:::

## Famous designs

::: example The draft lottery as a Wald {#ex-draft-wald}
In a (illustrative) two-by-two of the Angrist (1990) design, mean log earnings are $10.00$ among the draft-eligible and $10.03$ among the ineligible, and veteran shares are $0.30$ and $0.10$. Compute the Wald estimate of the effect of veteran status on log earnings, and say who it applies to.
::: solution
Reduced form: $10.00 - 10.03 = -0.03$. First stage: $0.30 - 0.10 = 0.20$. Wald: $-0.03/0.20 = -0.15$, a $15$ percent earnings penalty, matching Angrist's headline magnitude. Compliers are men who serve if and only if they are draft-eligible. The $-0.15$ is not the effect of service on always-takers (career soldiers) and not the ATE in the male population. The numbers in this box are rounded for arithmetic; Angrist's tables use Social Security administrative earnings and a richer specification.
:::
:::

**The Vietnam draft lottery (Angrist 1990).** Draft eligibility for American men was assigned by a random lottery on dates of birth in the 1970 cohorts. Eligibility is $Z$; veteran status is $D$. Social Security earnings records showed that, in the early 1980s, white veterans earned about $15$ percent less than comparable non-veterans, using eligibility as the instrument. Compliers are men who served because they were draft-eligible and would not have served otherwise. Exclusion requires that lottery numbers affect earnings only through service (not, for example, through subsequent education that the lottery shifted by other routes — a channel Angrist discusses). The paper is the template for a randomised instrument in observational data.

**Quarter of birth (Angrist and Krueger 1991).** Discussed above. Compliers are students who stay an extra year because the compulsory-attendance law bites, typically at grades 10–12, not at college.

**Other workhorses.** Distance to college as an instrument for enrolment (Card 1995) — exclusion is contentious, because distance also proxies family background. Judge leniency as an instrument for incarceration (Kling 2006; a large subsequent literature) — independence requires random assignment of judges, which can be tested by balance; exclusion requires that judges affect recidivism only through the sentence. Rainfall as an instrument for growth in conflict studies (Miguel, Satyanath and Sergenti 2004) — a design that has been both influential and heavily criticised on exclusion (rain affects conflict through more than income). Each of these is a LATE for the people the instrument moves, and each lives or dies on exclusion.

## Characterising compliers

The complier population is not listed in the data, but some of its features are identified. The **complier share** is the first stage. The mean of a binary covariate $X$ among compliers is identified by a Wald applied to $X \cdot D$ (Abadie 2003; Angrist and Pischke, *Mostly Harmless*, §4.4.4):

$$
\E[X_i \mid \text{complier}] = \frac{\E[X_i D_i \mid Z_i=1] - \E[X_i D_i \mid Z_i=0]}{\E[D_i \mid Z_i=1] - \E[D_i \mid Z_i=0]}.
$$

Reporting this, alongside the overall mean of $X$, tells the reader *who* the LATE applies to. If the instrument moves only men, or only people in rural districts, say so.

::: intuition Always-takers are not a nuisance
Always-takers are people who get the treatment anyway. For them the instrument is irrelevant, and the LATE is silent. That is not a defect of IV; it is a description of the experiment. A policy that *mandates* treatment for always-takers has already happened. A policy that *extends* treatment to never-takers is a different margin from the one $Z$ identifies. Use LATE for the margin you have; do not relabel it as the ATE.
:::

::: history
**1990, Joshua Angrist.** "Lifetime Earnings and the Vietnam Era Draft Lottery" (*AER*) used a randomised lottery as an instrument for military service and estimated a 15 percent earnings penalty for white veterans.

**1991, Joshua Angrist and Alan Krueger.** "Does Compulsory School Attendance Affect Schooling and Earnings?" (*QJE*) introduced quarter of birth as an instrument for schooling. The paper is both a classic natural experiment and, after Bound, Jaeger and Baker (1995), the classic weak-instrument cautionary tale.

**1994, Guido Imbens and Joshua Angrist.** "Identification and Estimation of Local Average Treatment Effects" (*Econometrica*) proved [[#thm-late]] and showed that 2SLS with multiple instruments is a weighted average of LATEs. Angrist, Imbens and Rubin (1996) recast the result in the four-type (complier / always-taker / never-taker / defier) language.

**1995, John Bound, David Jaeger and Regina Baker.** "Problems with Instrumental Variables Estimation When the Correlation Between the Instruments and the Endogenous Explanatory Variable is Weak" (*JASA*) showed that weak instruments bias 2SLS towards OLS and that this can happen at census sample sizes. Reporting the first-stage $F$ became standard after this paper and Staiger and Stock (1997).
:::

## Where this leads

A **fuzzy** regression discontinuity is IV, with the cutoff indicator as the instrument and treatment as take-up on one side of a threshold; that is [[causal-inference/regression-discontinuity]]. Difference-in-differences is not IV, but a staggered adoption can be recast as a design with many instruments (time-by-group dummies), and the same LATE-weighting logic explains why two-way fixed effects can go wrong ([[causal-inference/difference-in-differences]]). External validity of a LATE — transporting a draft-lottery effect, or a compulsory-schooling effect, to a different margin — is [[causal-inference/external-validity]]. The return to schooling in [[labour-economics/human-capital]] is the leading applied consumer of this chapter.

::: summary
- A valid instrument is as-good-as-random, excluded, and relevant ([[#def-iv]]). Monotonicity rules out defiers and makes the estimand an average of individual effects with non-negative weights.
- With a binary $Z$ and $D$, 2SLS is the Wald ratio (reduced form)/(first stage), and that ratio is the LATE for compliers ([[#thm-late]]). Always-takers and never-takers drop out.
- LATE is not the ATE. Name the compliers. Characterise them with covariate-specific Walds.
- Weak instruments bias 2SLS towards OLS and magnify exclusion violations. Report the first-stage $F$; prefer few strong instruments; use identification-robust inference when $F$ is small.
- Angrist and Krueger (1991) found IV returns to schooling close to OLS; Bound, Jaeger and Baker (1995) showed that the many-instrument version of that finding is what a weak instrument looks like. Angrist (1990) remains the template for a randomised natural experiment.
:::

## Exercises

::: exercise Wald arithmetic {level=1 check="25"}
$\E[Y \mid Z=1] = 40$, $\E[Y \mid Z=0] = 30$, $\E[D \mid Z=1] = 0.6$, $\E[D \mid Z=0] = 0.2$. What is the Wald LATE? (Enter the integer.)
::: solution
Reduced form $10$, first stage $0.4$, Wald $10/0.4 = 25$.
:::
:::

::: exercise Always-taker share {level=1 check="0.2"}
In a design with no defiers, $\E[D \mid Z=0] = 0.2$. What is the always-taker share? (Enter a decimal.)
::: solution
People with $Z=0$ who are treated are always-takers (and only always-takers, under monotonicity). The share is $0.2$.
:::
:::

::: exercise First stage as complier share {level=1 check="0.4"}
$\E[D \mid Z=1] = 0.7$ and $\E[D \mid Z=0] = 0.3$, no defiers. What is the complier share? (Enter a decimal.)
::: solution
First stage $0.7-0.3 = 0.4$, which is $\pi_c$.
:::
:::

::: exercise Diluted ITT {level=2 check="6"}
The LATE on compliers is $15$ and the complier share is $0.4$. What is the ITT? (Enter the integer.)
::: solution
$\mathrm{ITT} = \pi_c \cdot \mathrm{LATE} = 0.4 \times 15 = 6$. Always-takers and never-takers contribute $0$ to the ITT.
:::
:::

::: exercise OLS and IV disagree {level=2}
In [[#ex-late-sim]] OLS is about $6$ and IV is about $8.7$, with a strong first stage. Give two reasons, other than "one of them is wrong", why the two numbers can both be consistent and still differ.
::: solution
(i) They estimate different averages: OLS (under selection on observables, which does *not* hold in that DGP, but even under it) mixes effects on always-takers and compliers among the treated; IV estimates the effect on compliers only, which was set to $8$ versus $2$ for always-takers. (ii) OLS is inconsistent for the ATT when $D$ is endogenous — in the simulation, type is correlated with $D$ — so part of the gap is selection bias in OLS, not just a different estimand. Distinguishing (i) from (ii) requires a design in which both are consistent for their own targets (for example, one-sided non-compliance, where LATE = ATT, so a gap is pure OLS bias).
:::
:::

::: exercise Exclusion in the draft lottery {level=2}
Name one channel that would violate exclusion in Angrist (1990) even if lottery numbers are randomly assigned, and one check you might look at.
::: solution
Random assignment gives independence, not exclusion. A channel: draft eligibility might change educational choices *other than through military service* (deferments, college as a way to avoid service that does not result in veteran status as measured), and education affects earnings. A check: the reduced form of $Z$ on education *among never-servers*, or a balance of pre-lottery outcomes. Angrist discusses education as a competing channel; later work (for example on the GI Bill) treats the education path as part of the effect of service rather than a violation, which is a choice of what $D$ means.
:::
:::

::: exercise Prove the Wald is a LATE, in the four-type table {level=3}
There are $100$ people: $40$ compliers with $\tau = 10$, $20$ always-takers with $\tau = 4$, $40$ never-takers with $\tau = 0$. $Y(0) = 0$ for everyone. $Z$ is randomised 50–50, independently of type. Compute $\E[Y \mid Z=1]$, $\E[Y \mid Z=0]$, the first stage, and the Wald ratio. Confirm it equals $10$.
::: hint
When $Z=1$, treated people are compliers plus always-takers. When $Z=0$, treated people are only always-takers.
:::
::: solution
When $Z=1$ (50 people, 20 compliers, 10 always-takers, 20 never-takers, in expectation): $Y = 10$ for 20 compliers, $Y = 4$ for 10 always-takers, $Y = 0$ for 20 never-takers, so $\E[Y \mid Z=1] = (20\cdot 10 + 10\cdot 4)/50 = 4.8$. When $Z=0$: $Y = 4$ for 10 always-takers and $0$ otherwise, so $\E[Y \mid Z=0] = 40/50 = 0.8$. Reduced form $4.0$. First stage: $\E[D \mid Z=1] = 30/50 = 0.6$, $\E[D \mid Z=0] = 10/50 = 0.2$, difference $0.4$. Wald $4.0/0.4 = 10$, the complier effect. The always-taker effect $4$ cancelled.
:::
:::

::: exercise Weak-instrument bias, schematically {level=3}
In the linear model $Y = \tau D + u$, $D = \pi Z + v$, with $\E[Z u] = 0$, $\E[Z v] \ne 0$ (endogeneity of $D$), and $\pi$ small. 2SLS is $\hat\tau = (Z^\T Y)/(Z^\T D)$. Using the approximation $\hat\tau - \tau \approx (Z^\T u)/(n \pi \sigma_Z^2)$ and $\hat\tau_{\mathrm{OLS}} - \tau \approx \Cov(D,u)/\Var(D)$, explain why $\hat\tau_{\mathrm{2SLS}}$ is biased in the direction of OLS when $\pi \approx 0$, even though $\E[Zu]=0$.
::: solution
When $\pi \approx 0$, $D \approx v$, and $Z$ (which is correlated with $v$ only weakly through whatever tiny first stage remains in the sample) is also, in finite samples, correlated with $u$ because $u$ and $v$ are correlated — the same endogeneity that biases OLS. Formally, the leading bias term of 2SLS is proportional to $\sigma_{uv}/(n \pi)$ times a $\chi^2$-like first-stage noise; as $\pi \to 0$ this looks like $\sigma_{uv}/\Var(D)$, the OLS bias. Exact exclusion ($\E[Zu]=0$) is a population statement; in a given sample $Z^\T u / n$ is $O_p(n^{-1/2})$ and is being divided by a first stage that is also $O_p(n^{-1/2})$ when $\pi = 0$, a ratio that does not settle at $\tau$. That is why large $n$ does not rescue a zero first stage, and why the $F$-statistic (squared first-stage $t$) governs the bias.
:::
:::

::: exercise Characterising compliers {level=3 check="0.75"}
A binary covariate $X$ (for example, "female") has $\E[X D \mid Z=1] = 0.42$, $\E[X D \mid Z=0] = 0.12$, and first stage $0.40$. What is $\E[X \mid \text{complier}]$? (Enter a decimal.)
::: solution
$\E[X \mid \text{complier}] = (0.42 - 0.12)/0.40 = 0.30/0.40 = 0.75$. Three-quarters of compliers have $X=1$. Compare that with the population mean of $X$ to see whether the instrument moves a selected group.
:::
:::
