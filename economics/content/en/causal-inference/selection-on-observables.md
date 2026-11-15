Randomisation is a luxury. Most of the comparisons economists are asked to interpret — trainees versus non-trainees, union members versus non-members, countries with a land-reform law versus those without — were not assigned by a coin toss. The hope, in a large class of studies, is that once we hold enough *observed* things fixed, remaining variation in treatment is as good as random. That hope is **selection on observables**, or **conditional ignorability**. It is the identifying assumption behind regression with controls, matching, and inverse-probability weighting.

The assumption is strong. It says that every confounder has been measured. LaLonde (1986) showed that the estimators of his day, given the covariates of his day, did not recover an experimental training effect. Dehejia and Wahba (1999) showed that a matching estimator, on a sample restricted to a region of common support, could come much closer. The lesson is not that controlling for $X$ always works, or that it never works. It is that the assumption has content, that it can be probed (overlap, balance, placebo outcomes), and that it fails silently when a confounder is omitted. This chapter makes the content precise.

## Conditional ignorability and overlap

::: definition Conditional ignorability and overlap {#def-cia}
Treatment is **conditionally ignorable** given covariates $X_i$ (also called **unconfoundedness**, or **selection on observables**) if

$$
\bigl(Y_i(1), Y_i(0)\bigr) \;\perp\; D_i \mid X_i.
$$ {#eq-cia}

**Overlap** (common support) requires $0 < \Prob(D_i = 1 \mid X_i) < 1$ for (almost) all $x$ in the support of $X_i$. The **propensity score** is $e(x) = \Prob(D_i = 1 \mid X_i = x)$.
:::

Conditional ignorability says that, *inside a cell of $X$*, treatment is as good as randomly assigned. Overlap says that each cell contains both treated and untreated units, so the cell-specific comparison can actually be computed. Without overlap, ignorability may hold but the ATE is not identified from data: some types of people are only observed in one regime.

::: proposition Identification under selection on observables {#prop-soo}
Assume SUTVA, [[#eq-cia]] and overlap. Then

$$
\begin{aligned}
\tau_{\mathrm{ATE}} &= \E\bigl[\E[Y_i \mid D_i=1, X_i] - \E[Y_i \mid D_i=0, X_i]\bigr], \\
\tau_{\mathrm{ATT}} &= \E\bigl[\E[Y_i \mid D_i=1, X_i] - \E[Y_i \mid D_i=0, X_i] \bigm| D_i=1\bigr].
\end{aligned}
$$ {#eq-soo}

The inner difference is a **conditional average treatment effect** $\tau(x)$; the outer expectation averages it with the distribution of $X$ in the relevant population (everyone, or the treated).
:::

::: proof
By [[#eq-cia]], $\E[Y_i(d) \mid D_i, X_i] = \E[Y_i(d) \mid X_i]$, so $\E[Y_i \mid D_i=d, X_i] = \E[Y_i(d) \mid X_i]$. Overlap makes those conditional expectations well-defined almost everywhere. Taking $\E[Y_i(1)-Y_i(0) \mid X_i] = \tau(X_i)$ and applying the law of iterated expectations gives the ATE; restricting the outer expectation to $\{D_i=1\}$ gives the ATT.
:::

The proposition is an identification result, not an estimator. It says that if we knew the two regression functions $m_d(x) = \E[Y \mid D=d, X=x]$, we would be done. Matching, regression, and inverse-probability weighting are three ways of estimating those functions, or of averaging their difference.

::: intuition Matching in a sentence
Find, for each treated unit, untreated units with the same $X$, average their $Y$, and subtract. Conditional ignorability says those untreated $Y$s are a stand-in for the treated unit's $Y(0)$. Overlap says the stand-ins exist.
:::

## Regression as weighted matching

The regression

$$
Y_i = \alpha + \tau D_i + X_i'\gamma + u_i
$$ {#eq-ols}

is the most common implementation of [[#prop-soo]]. If $X$ is discrete and the specification is **saturated** — a dummy for every cell of $X$, and $D$ interacted with those dummies — then the coefficient on $D$ in a weighted average of the cell-specific differences recovers a well-defined average of $\tau(x)$. If $X$ is entered linearly, [[#eq-ols]] imposes $\tau(x) = \tau$ and $m_0(x) = \alpha + x'\gamma$, neither of which is implied by ignorability.

::: proposition OLS weights {#prop-ols-weights}
Suppose $D_i$ is binary, $X_i$ is discrete, and we estimate [[#eq-ols]] by OLS (no interactions). Then $\hat\tau$ is consistent for a variance-weighted average of the cell-specific differences $\tau(x)$:

$$
\tau_{\mathrm{OLS}} = \sum_x w(x)\,\tau(x), \qquad w(x) \propto \Prob(X_i=x)\,\Var(D_i \mid X_i=x),
$$

with $\sum w(x) = 1$ and $w(x) \ge 0$. Cells where treatment is nearly certain, or nearly impossible, get small weight, because $\Var(D \mid X=x) = e(x)\bigl(1-e(x)\bigr)$ is small when $e(x)$ is near $0$ or $1$.
:::

::: proof
This is the binary-treatment case of Angrist (1998). OLS projects $Y$ on the space spanned by $(1, D, X)$. After partialling $X$ out of $Y$ and of $D$ (the Frisch–Waugh–Lovell theorem, [[econometrics/multiple-regression]]), $\hat\tau$ is the coefficient from regressing the residual of $Y$ on the residual of $D$. The residual of $D$ given $X$ has variance $e(X)(1-e(X))$, and the probability limit is the $e(1-e)$-weighted average of $\E[Y \mid D=1, X] - \E[Y \mid D=0, X]$. Under [[#eq-cia]] those cell differences are $\tau(x)$.
:::

Two consequences. First, even under ignorability, OLS does not automatically estimate the ATE: it overweights cells with $e(x)$ near $1/2$ and underweights cells with $e(x)$ near $0$ or $1$. If one wants the ATE, either reweight (see IPW below) or saturate. Second, OLS *silently drops* the no-overlap problem: cells with $e(x) \in \{0,1\}$ have zero weight rather than producing a warning. Matching and IPW, which have to look for counterparts, make the overlap failure visible.

::: example The simulation again, with and without $X$ {#ex-sim-soo}
Return to the $n = 200$, seed-$42$ simulation of [[causal-inference/potential-outcomes#ex-reg-bias]]: $Y_i(0) = 10 + 2X_i + u_i$, $Y_i(1) = 14 + 2X_i + u_i$ (ATE $= 4$), and $D_i = 1\{X_i + 0.5 v_i > 0.4\}$. The naive gap is $6.44$. OLS of $Y$ on $D$ and $X$ gives $4.14$ (standard error $0.20$). Mean $X$ is $0.78$ among the treated and $-0.45$ among the untreated. Interpret the role of overlap.
::: solution
Conditional ignorability holds in the DGP given $X$ (the only confounder). Overlap is imperfect but not disastrous: $X$ is continuous and the selection rule is noisy, so both groups occupy a wide range of $X$, with more treated units on the right. Linear OLS is slightly misspecified as a *weighting* scheme — it is not the ATE-weighted average — but with a constant treatment effect every weighted average equals $4$, and $4.14$ is sampling error. If we had set $D_i = 1\{X_i > 0.4\}$ with no noise, overlap would fail on each side of $0.4$ and linear OLS would *extrapolate* $m_0(x)$ into the treated region. That extrapolation is an assumption beyond [[#eq-cia]], and it is the usual hidden cost of a linear control strategy.
:::
:::

::: widget regression
points: -1.2,7.6; -0.8,8.4; -0.4,9.1; 0.0,10.2; 0.3,14.5; 0.6,15.1; 0.9,15.8; 1.2,16.6
degree: 1
residuals: true
x: -1.5, 1.5
y: 6, 18
caption: Eight illustrative points: four untreated at low $X$ (outcome near $8$–$10$) and four treated at high $X$ (outcome near $14$–$17$). Drag a treated point left into the untreated cloud, or an untreated point right. The slope — a muddle of the $X$–$Y$ relationship and the treatment jump — changes. A regression that does not separate $D$ from $X$ cannot tell a treatment effect from a confounder; one that includes both, with overlap, can.
:::

## Matching

**Nearest-neighbour matching** estimates $\tau_{\mathrm{ATT}}$ by pairing each treated unit with one or more untreated units that minimise a distance in $X$ (Euclidean, Mahalanobis, or, after Rosenbaum and Rubin 1983, the propensity score). The estimator is

$$
\hat\tau_{\mathrm{ATT}}^{\mathrm{nn}} = \frac{1}{n_1} \sum_{i: D_i=1} \Bigl(Y_i - \frac{1}{|J_i|}\sum_{j \in J_i} Y_j\Bigr),
$$ {#eq-nn}

where $J_i$ is the set of matched controls for $i$. Variants include matching with replacement, a caliper that drops treated units without a close match, and kernel matching, which uses a weighted average of many controls.

Matching does not require a linear $m_d(x)$. It does require overlap: treated units with no neighbour are either dropped (changing the estimand towards those with support) or matched to a distant unit (bias). Abadie and Imbens (2006, 2011) derive the asymptotic distribution; a bias-correction term is needed when $X$ is continuous and the number of neighbours is fixed, because matching discrepancy does not vanish fast enough.

**Exact matching** on a discrete $X$ is nonparametric regression: within each cell, the difference in means is $\hat\tau(x)$, and the ATT is the treated-weighted average of those differences. When $X$ is rich, cells empty out — the **curse of dimensionality**. The propensity score is the standard reduction.

## The propensity score

::: theorem Rosenbaum–Rubin {#thm-pscore}
If $\bigl(Y_i(1), Y_i(0)\bigr) \perp D_i \mid X_i$ and $e(x) \in (0,1)$, then $\bigl(Y_i(1), Y_i(0)\bigr) \perp D_i \mid e(X_i)$. Balancing on the scalar propensity score is enough for ignorability; one does not need to balance on the whole $X$.
:::

::: proof
$D_i$ given $X_i$ is Bernoulli with parameter $e(X_i)$, so $D_i \perp X_i \mid e(X_i)$. Combined with ignorability given $X_i$, this implies ignorability given $e(X_i)$. (Rosenbaum and Rubin 1983, Theorem 3.)
:::

The practical pipeline is: (i) estimate $e(x)$ by a logit (or a more flexible classifier) of $D$ on $X$; (ii) check **overlap**, by plotting the two densities of $\hat e(X)$ and trimming units with scores near $0$ or $1$; (iii) check **balance**, by comparing means of $X$ in treated and control groups *within* strata of $\hat e$, or after weighting; (iv) estimate $\tau$ by matching on $\hat e$, by stratifying on $\hat e$, or by inverse-probability weighting.

::: definition Inverse-probability weighting {#def-ipw}
The **Horvitz–Thompson** (IPW) estimators of the two potential-outcome means, and of the ATE, are

$$
\hat\mu_1 = \frac{1}{n}\sum_{i=1}^n \frac{D_i Y_i}{\hat e(X_i)}, \qquad \hat\mu_0 = \frac{1}{n}\sum_{i=1}^n \frac{(1-D_i) Y_i}{1-\hat e(X_i)}, \qquad \hat\tau_{\mathrm{IPW}} = \hat\mu_1 - \hat\mu_0.
$$ {#eq-ipw}

The **Hájek** version replaces $n$ by the sum of the weights, which often reduces variance. For the ATT, weight the untreated by $\hat e(X)/(1-\hat e(X))$ and the treated by $1$.
:::

IPW is regression on a saturated propensity, in another costume: it reweights the treated and untreated samples so that the distribution of $X$ matches the population (or the treated). Weights explode when $\hat e$ is near $0$ or $1$, which is the overlap problem announcing itself. Trimming, or using a bounded "overlap weight" $e(1-e)$, is standard.

::: example Exact matching on a binary $X$ {#ex-exact}
Twenty people, ten with $X=0$ and ten with $X=1$. Among $X=0$, four are treated and their mean $Y$ is $6$; the six untreated have mean $Y$ of $4$. Among $X=1$, eight are treated with mean $Y$ of $14$ and two untreated with mean $Y$ of $8$. Under [[#eq-cia]], compute $\tau(0)$, $\tau(1)$, the ATE and the ATT.
::: solution
$\tau(0) = 6-4 = 2$, $\tau(1) = 14-8 = 6$. The ATE is $\tfrac{10}{20}\cdot 2 + \tfrac{10}{20}\cdot 6 = 4$. Among the treated ($4+8=12$ people), the share with $X=1$ is $8/12 = 2/3$, so $\tau_{\mathrm{ATT}} = \tfrac13\cdot 2 + \tfrac23\cdot 6 = 14/3 \approx 4.67$. Exact matching *is* these cell differences; no propensity score is needed when $X$ is a single dummy with overlap in both cells.
:::
:::

::: example A four-observation IPW {#ex-ipw}
Four units: $(D, Y, e(X)) = (1, 10, 0.5)$, $(1, 14, 0.8)$, $(0, 6, 0.5)$, $(0, 8, 0.2)$. Compute the Horvitz–Thompson ATE.
::: solution
$$
\hat\mu_1 = \tfrac14 \Bigl(\frac{10}{0.5} + \frac{14}{0.8} + 0 + 0\Bigr) = \tfrac14(20 + 17.5) = 9.375,
$$
$$
\hat\mu_0 = \tfrac14 \Bigl(0 + 0 + \frac{6}{0.5} + \frac{8}{0.8}\Bigr) = \tfrac14(12 + 10) = 5.5,
$$
so $\hat\tau_{\mathrm{IPW}} = 9.375 - 5.5 = 3.875$. (The Hájek version, normalising by the sum of weights, gives $4.77$ here; with $n=4$ the two differ. In large samples with a well-estimated score they usually agree.)
:::
:::

::: widget plot
f: 1/(1+exp(-(x-a))); 1 - 1/(1+exp(-(x-a)))
sliders: a=0:-2:2
x: -4, 4
y: 0, 1
labels: e(x); 1-e(x)
caption: A logistic propensity $e(x) = (1+e^{-(x-a)})^{-1}$. Move $a$ to shift the score. Overlap is the region where both $e$ and $1-e$ are bounded away from zero. When $a = 2$, almost everyone with $x>0$ is treated and IPW weights on the right become huge. Matching will find no controls there.
:::

## What can go wrong

**Omitted confounders.** Conditional ignorability is untestable. A placebo outcome that should not be affected by treatment (a pre-treatment score, a variable determined before $D$) *can* be tested: its estimated "effect" should be zero. A non-zero placebo is evidence against ignorability; a zero placebo is consistent with it but does not prove it. Sensitivity analysis (Rosenbaum bounds; Cinelli and Hazlett 2020) asks how strong an unobserved confounder would have to be to explain away $\hat\tau$.

**Bad controls, again.** Post-treatment variables do not belong in $X$. Occupation, post-programme wages, and "whether the person was motivated" measured after enrolment are outcomes, mediators or colliders. Conditioning on them changes the estimand and can create bias that ignorability given pre-treatment $X$ had already removed. See [[causal-inference/potential-outcomes#def-dag]].

**The propensity-score logit is a model.** If $e(x)$ is misspecified, matching on $\hat e$ and IPW are inconsistent. Doubly robust estimators (Robins, Rotnitzky and Zhao; the AIPW estimator) combine a model for $m_d(x)$ with a model for $e(x)$ and remain consistent if *either* model is right. They are the default in much of statistics; in applied economics, OLS with a flexible $X$ and a trimmed overlap sample is still the most common specification, with matching as a robustness check.

**LaLonde, Dehejia–Wahba, and Smith–Todd.** LaLonde (1986) found that regression and selection-correction estimators, using CPS or PSID comparison groups, did not reproduce the NSW experimental ATT. Dehejia and Wahba (1999) restricted the NSW sample to a subset with two years of pre-treatment earnings, matched on a propensity score, imposed common support, and came close to the experimental number. Smith and Todd (2005) showed that the result is sensitive to the sample restriction and to the comparison group: matching is not a recipe that works regardless of design. The current reading of this literature is that selection on observables can work when (i) pre-treatment outcomes that absorb a lot of $Y_i(0)$ are available (Ashenfelter's dip: people enter training after a dip in earnings, so lagged $Y$ is a crucial control), (ii) overlap is real, not extrapolated, and (iii) the comparison group is drawn from the same labour market. When those fail, the right response is a different design, not a more complicated propensity.

::: example Placebo on a pre-treatment outcome {#ex-placebo-soo}
A job-training study estimates $\hat\tau = 2{,}000$ on post-programme annual earnings, controlling for age, sex and education. The same specification, with *last year's* earnings as the outcome, produces $\hat\tau_{\mathrm{pre}} = 1{,}800$. What does this say about [[#eq-cia]] given those $X$?
::: solution
Last year's earnings are a pre-treatment outcome, so the true effect on them is zero. A $1{,}800$ "effect" means that, given age, sex and education, the treated already earned much more (or were in a dip — the sign depends) than the untreated. Conditional ignorability given *those* $X$ fails. Adding last year's earnings to $X$ is the obvious next specification; it is also the Ashenfelter-dip lesson. A small placebo $\hat\tau_{\mathrm{pre}}$ would not have *proved* [[#eq-cia]], but this large one is enough to reject it.
:::
:::

::: warning Balance tests are not identification tests
A table showing that treated and control means of $X$ are close after matching is a check that matching did its *mechanical* job. It is not evidence that [[#eq-cia]] holds. Unobserved confounders do not appear in the table. The table can also be gamed by dropping the $X$s that do not balance. Report the specification of $e(x)$ before looking at $\hat\tau$, and report balance on a pre-specified list.
:::

::: quiz
Under conditional ignorability and overlap, OLS of $Y$ on $D$ and a linear $X$ estimates
- [ ] the ATE, always
- [x] a variance-weighted average of $\tau(x)$, which equals the ATE if $\tau(x)$ is constant but not in general
- [ ] the ATT, always
- [ ] nothing causal, because OLS requires randomisation
::: solution
[[#prop-ols-weights]]: OLS weights cells by $e(x)(1-e(x))$. That weighted average equals the ATE when treatment effects are homogeneous, or when $e(x)$ happens to be constant. It is not automatically the ATT either (the ATT weights cells by the treated distribution of $X$). OLS *can* be causal under ignorability; it does not require unconditional randomisation.
:::
:::

## Evidence

Beyond NSW, selection-on-observables designs are everywhere, and their credibility varies with the quality of $X$. Dale and Krueger (2002) compared students who were *admitted* to the same set of colleges but chose differently, using the admission set as a proxy for unobserved ability; they found small returns to college selectivity, much smaller than a naive earnings gap. The design is matching on a very informative $X$ (where else you got in). Altonji, Elder and Taber (2005) studied Catholic schooling with a sensitivity approach: they asked how much selection on unobservables would be needed, relative to selection on observables, to explain the estimated effect, and found that the required selection was large. That is not a proof of ignorability; it is a way of stating how uncomfortable a sceptic must be.

In development, many "quasi-experimental" evaluations of microfinance, school inputs and health programmes still rely on a conditional-independence claim given village and household covariates. RCTs in the same domains (see [[causal-inference/randomised-experiments]]) often find smaller effects, which is the LaLonde pattern repeating. The right response is not to discard every regression with controls. It is to ask, of each $X$: is this enough to make $D$ ignorable, is there overlap, and what would a different design give?

::: application When lagged outcomes are the $X$ that matters
Ashenfelter (1978) noticed that trainees' earnings dip in the year they enrol. A cross-section comparison of trainees to non-trainees then overstates the ATT, because the treated are caught at a trough (Ashenfelter's dip). Controlling for pre-programme earnings, or better, looking at *changes* (which is already a step towards [[causal-inference/difference-in-differences]]), absorbs a large part of the selection. In any evaluation of a programme people *choose* to enter after a shock, lagged $Y$ is not an optional extra. It is the covariate that makes [[#eq-cia]] least implausible.
:::

::: history
**1983, Paul Rosenbaum and Donald Rubin.** "The Central Role of the Propensity Score in Observational Studies for Causal Effects" (*Biometrika*) proved [[#thm-pscore]] and proposed stratification and matching on $e(x)$. The paper is the reason applied work talks about propensity scores at all.

**1986 and 1999, LaLonde and Dehejia–Wahba.** LaLonde's *AER* critique showed that the selection-on-observables estimators then in use failed an experimental test. Dehejia and Wahba's *JASA* reply showed that matching on a propensity score, with a common-support restriction and two years of pre-earnings, could recover the NSW benchmark — and, equally important, that the result depended on those choices.

**1998, Joshua Angrist.** "Estimating the Labor Market Impact of Voluntary Military Service Using Social Security Data on Military Applicants" (*Econometrica*) derived the variance-weighted interpretation of OLS with dummy covariates, which is [[#prop-ols-weights]] in its original setting.
:::

## Where this leads

If you do not believe [[#eq-cia]] given the $X$ you have, you need a variable that moves $D$ without moving $Y$ except through $D$: an instrument, in [[causal-inference/iv-and-late]]. If treatment is assigned by a cutoff, you do not need ignorability globally, only locally: [[causal-inference/regression-discontinuity]]. If you have a comparison group and a pre-period, parallel trends can replace ignorability in levels: [[causal-inference/difference-in-differences]]. Selection on observables remains the right tool when the $X$ is genuinely rich — lagged outcomes, admission sets, administrative eligibility records — and when overlap is a fact rather than an extrapolation.

::: summary
- Conditional ignorability plus overlap identify the ATE and ATT as averages of cell-specific treated–control differences ([[#prop-soo]]). The assumption is that every confounder is in $X$.
- OLS with linear controls estimates a variance-weighted average of $\tau(x)$, not automatically the ATE ([[#prop-ols-weights]]). Saturated specifications and IPW recover the ATE weighting.
- Matching makes the counterfactual explicit and makes overlap failures visible. The propensity score reduces $X$ to a scalar that is sufficient for ignorability ([[#thm-pscore]]).
- Inverse-probability weighting reweights groups to the target distribution of $X$; huge weights are a diagnosis of poor overlap ([[#def-ipw]]).
- Placebo outcomes, balance on pre-specified $X$, trimming, and sensitivity analysis probe the design. They cannot prove ignorability. LaLonde's warning still applies: a method is credible when it can recover a known experimental benchmark in a setting like yours.
:::

## Exercises

::: exercise Cell difference {level=1 check="4"}
In a cell with $X = x$, the treated mean is $14$ and the untreated mean is $10$. Under [[#eq-cia]], what is $\tau(x)$? (Enter the integer.)
::: solution
$\tau(x) = 14 - 10 = 4$.
:::
:::

::: exercise Overlap {level=1}
A covariate cell has $80$ treated units and $0$ untreated units. Which part of [[#def-cia]] fails, and what does that mean for the ATE?
::: solution
Overlap fails: $e(x) = 1$ in this cell. Conditional ignorability might still be true, but $\E[Y_i(0) \mid X=x]$ is not identified from data — there are no untreated units to read it from. The ATE, which averages $\tau(x)$ over the distribution of $X$ including this cell, is not identified without extrapolating $m_0$ from other cells.
:::
:::

::: exercise IPW two observations {level=1 check="5"}
Two units: treated $(Y=12, e=0.5)$ and untreated $(Y=7, e=0.5)$. What is the Horvitz–Thompson $\hat\tau_{\mathrm{IPW}}$ with $n=2$? (Enter the integer.)
::: solution
$\hat\mu_1 = \tfrac12 \cdot 12/0.5 = 12$, $\hat\mu_0 = \tfrac12 \cdot 7/0.5 = 7$, so $\hat\tau = 5$. With $e=0.5$ for both, IPW agrees with the raw difference.
:::
:::

::: exercise OLS versus ATE weights {level=2}
There are two equally likely cells. In cell $A$, $e(A) = 0.5$ and $\tau(A) = 10$. In cell $B$, $e(B) = 0.1$ and $\tau(B) = 0$. Compute the ATE and the OLS estimand from [[#prop-ols-weights]].
::: solution
The ATE is $\tfrac12 \cdot 10 + \tfrac12 \cdot 0 = 5$. The OLS weights are proportional to $e(1-e)$: $w(A) \propto 0.5\cdot 0.5 = 0.25$, $w(B) \propto 0.1\cdot 0.9 = 0.09$, so $w(A) = 0.25/0.34 \approx 0.735$ and $w(B) \approx 0.265$. Then $\tau_{\mathrm{OLS}} \approx 0.735\cdot 10 + 0.265\cdot 0 = 7.35$. OLS overweights the balanced cell and reports a larger effect than the ATE.
:::
:::

::: exercise Matching ATT {level=2 check="5.5"}
Treated units: $(X,Y) = (2, 12)$ and $(5, 18)$. Untreated: $(1, 8)$, $(4, 11)$, $(6, 13)$. Match each treated unit to its nearest neighbour (Euclidean distance in $X$; break ties by choosing the smaller $X$). What is $\hat\tau_{\mathrm{ATT}}$? (Enter one decimal place.)
::: solution
$X=2$ matches to $X=1$ ($Y=8$); $X=5$ is equally far from $4$ and $6$, and the smaller $X$ is $4$ ($Y=11$). The two differences are $12-8 = 4$ and $18-11 = 7$, so $\hat\tau_{\mathrm{ATT}} = (4+7)/2 = 5.5$.
:::
:::

::: exercise ATT weighting of IPW {level=2}
Explain in one paragraph why the ATT uses weights $1$ on the treated and $e(X)/(1-e(X))$ on the untreated, rather than the ATE weights $D/e$ and $(1-D)/(1-e)$.
::: solution
The ATT is $\E[Y(1)-Y(0) \mid D=1]$. The treated already have the target distribution of $X$ (the treated distribution), so they need no reweighting: their mean $Y$ estimates $\E[Y(1) \mid D=1]$. The untreated must be reweighted to look like the treated. The odds $e(X)/(1-e(X))$ are exactly the Radon–Nikodym factor that maps the untreated distribution of $X$ to the treated distribution, under the usual identity $\Prob(D=1 \mid X)/\Prob(D=0 \mid X) = e/(1-e)$. The ATE instead reweights *both* groups to the population distribution of $X$.
:::
:::

::: exercise A back-door calculation {level=3}
$X \in \{0,1\}$ with $\Prob(X=1)=0.5$. Treatment probabilities: $e(0)=0.25$, $e(1)=0.75$. Conditional means: $\E[Y \mid D=1, X=0] = 6$, $\E[Y \mid D=0, X=0] = 4$, $\E[Y \mid D=1, X=1] = 14$, $\E[Y \mid D=0, X=1] = 8$. Compute $\tau_{\mathrm{ATE}}$ and $\tau_{\mathrm{ATT}}$ under [[#eq-cia]].
::: hint
First compute $\tau(0)$ and $\tau(1)$, then the distribution of $X$ among the treated from Bayes' rule.
:::
::: solution
$\tau(0) = 6-4 = 2$ and $\tau(1) = 14-8 = 6$. The ATE is $\E[\tau(X)] = 0.5\cdot 2 + 0.5\cdot 6 = 4$. For the ATT, $\Prob(X=1 \mid D=1) = e(1)\Prob(X=1)/\pi$ with $\pi = 0.5\cdot 0.25 + 0.5\cdot 0.75 = 0.5$, so $\Prob(X=1 \mid D=1) = 0.75\cdot 0.5 / 0.5 = 0.75$. Then $\tau_{\mathrm{ATT}} = 0.25\cdot 2 + 0.75\cdot 6 = 5$. The treated are concentrated in the high-$X$ cell, where the effect is larger.
:::
:::

::: exercise Why a linear control extrapolates {level=3}
Suppose $D_i = 1\{X_i \ge 0\}$, $Y_i(0) = X_i^2$, $Y_i(1) = X_i^2 + 1$, and $X_i$ is symmetric about $0$. Ignorability holds given $X$ (in fact $D$ is a deterministic function of $X$). Does overlap hold? What would a linear regression of $Y$ on $D$ and $X$ be estimating, and why is it not the ATE of $1$?
::: solution
Overlap fails everywhere: $e(x) \in \{0,1\}$. The ATE is $1$ but is not identified from the treated–control comparison *within* $X$-cells, because no cell contains both groups. A linear regression of $Y$ on $D$ and $X$ fits a single slope in $X$ to a quadratic $Y(0)$, using untreated units (who have $X<0$) to guess $Y(0)$ for treated units (who have $X>0$). Since $X^2$ is even, the linear term in $X$ is approximately $0$ and the dummy $D$ will try to absorb the average difference between $\{X>0\}$ and $\{X<0\}$, which is $1$ plus the difference in mean $X^2$ — and mean $X^2$ is the same on both sides by symmetry, so in this special case OLS happens to recover $1$. If $Y(0) = e^{X}$ instead, the untreated side does not look like the treated side and the dummy is badly biased. The example is the reason RDD (next-but-two chapters) uses *local* comparisons at the cutoff rather than a global linear control.
:::
:::

::: exercise Doubly robust, in words {level=3}
The augmented IPW (AIPW) estimator adds the term $(D - \hat e) \bigl(\hat m_1(X)/\hat e - \hat m_0(X)/(1-\hat e)\bigr)$ to IPW, where $\hat m_d$ is a regression of $Y$ on $X$ in group $d$. Explain why this is consistent if either the propensity is correct or the two regressions are correct (not necessarily both).
::: solution
If $\hat e \to e$, IPW is already consistent and the added term has mean zero because $\E[D-e \mid X] = 0$, regardless of $\hat m_d$. If $\hat m_d \to m_d$ but $\hat e$ is wrong, the IPW piece is inconsistent, but the added term is exactly the influence-function correction that subtracts the projection of that inconsistency onto $X$; the two errors cancel and the remainder is the sample analogue of $\E[m_1(X)-m_0(X)]$, which is the ATE under ignorability. That is double robustness: two models, one of which may be wrong. (Robins, Rotnitzky and Zhao 1994 is the original; textbook treatments are in Hernán and Robins, *What If*.)
:::
:::
