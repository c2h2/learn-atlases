A city offers a six-month training programme to unemployed workers. A year later, trainees earn 1,200 more, on average, than people who did not enrol. Is the programme worth 1,200 a year? Not on that comparison alone. The people who signed up may already have been more motivated, more literate, or closer to a job offer. We observe what trainees earned after training, but we do not observe what they would have earned without it, and that missing number is the effect.

This is the **fundamental problem of causal inference**: for each person we see one of two possible outcomes, never both. The modern language for the two possibilities is the **potential-outcomes** framework of Neyman (1923) and Rubin (1974). Once the missing outcomes are named, it becomes possible to say precisely which average we can recover from data, which comparison is biased, and which research design — randomisation, regression, an instrument, a discontinuity — would fix the bias. The rest of the course is the toolkit that follows from this one idea.

Throughout, a **unit** $i$ is a person, firm, village or year; a **treatment** $D_i \in \{0,1\}$ is a binary programme, policy or event; and an **outcome** $Y_i$ is the thing we care about (earnings, employment, test scores, mortality). Continuous and multi-valued treatments exist, but the binary case already contains every conceptual difficulty.

## Potential outcomes

Imagine that, for each unit, the world can go two ways.

::: definition Potential outcomes {#def-po}
For a binary treatment $D_i \in \{0,1\}$, unit $i$ has two **potential outcomes**: $Y_i(1)$ if treated and $Y_i(0)$ if not. The **individual treatment effect** is

$$
\tau_i = Y_i(1) - Y_i(0).
$$

The **observed outcome** is the potential outcome corresponding to the treatment actually received:

$$
Y_i = D_i Y_i(1) + (1-D_i) Y_i(0) = Y_i(0) + D_i \tau_i.
$$ {#eq-switching}
:::

Equation [[#eq-switching]] is an accounting identity, not an assumption: it says only that we see the treated outcome for the treated and the untreated outcome for the untreated. The other potential outcome is a **counterfactual**. Individual effects $\tau_i$ are therefore never observed. Holland (1986) called this the fundamental problem; everything that follows is about recovering *averages* of the $\tau_i$ under additional assumptions.

Two further conditions are part of the standard setup and are easy to overlook.

::: definition SUTVA {#def-sutva}
The **stable unit treatment value assumption** (SUTVA) requires that (i) unit $i$'s potential outcomes do not depend on other units' treatments (no interference), and (ii) there is only one version of the treatment, so "$D_i = 1$" names a single well-defined intervention.
:::

SUTVA fails when a vaccinated person protects a neighbour (interference), when a training slot given to $i$ is a slot denied to $j$ (another kind of interference), or when "training" means a six-week course for some people and a two-year apprenticeship for others (multiple versions). In those cases $Y_i(1)$ and $Y_i(0)$ are not even well-defined until the treatment and the interference structure are specified more carefully. We maintain SUTVA unless a chapter says otherwise; [[causal-inference/randomised-experiments]] returns to spillovers.

::: remark Notation
The pair $\bigl(Y_i(1), Y_i(0)\bigr)$ is sometimes written $\bigl(Y_i^1, Y_i^0\bigr)$ or $\bigl(Y_{1i}, Y_{0i}\bigr)$. Treatment is $D_i$ in this course, following Imbens and Rubin; some texts use $W_i$ or $T_i$. The observed outcome is always $Y_i$, never $Y_i(D_i)$ in running text, though that is what [[#eq-switching]] says. The error term in a regression is $u_i$, as in [[econometrics/simple-regression]]; $\beta$ is a regression coefficient, never a discount factor, in this course.
:::

::: example Eight workers {#ex-eight}
Eight unemployed workers have the following potential monthly earnings (in units of money) with and without a training programme. Four of them take up the programme ($D_i = 1$).

| $i$ | $Y_i(0)$ | $Y_i(1)$ | $\tau_i$ | $D_i$ | $Y_i$ |
|---|---|---|---|---|---|
| 1 | 8 | 12 | 4 | 1 | 12 |
| 2 | 6 | 11 | 5 | 1 | 11 |
| 3 | 10 | 13 | 3 | 0 | 10 |
| 4 | 7 | 9 | 2 | 1 | 9 |
| 5 | 12 | 14 | 2 | 0 | 12 |
| 6 | 5 | 10 | 5 | 1 | 10 |
| 7 | 9 | 11 | 2 | 0 | 9 |
| 8 | 11 | 12 | 1 | 0 | 11 |

What is worker 3's treatment effect? What do we observe for worker 3?
::: solution
Worker 3's treatment effect is $\tau_3 = 13 - 10 = 3$. We do not observe it. Worker 3 is untreated, so we observe $Y_3 = Y_3(0) = 10$; the treated outcome $13$ is a counterfactual. The table is a device that the econometrician never sees in full: the greyed-out cells, had we greyed them, would be exactly the missing potential outcomes.
:::
:::

## Average effects

Because $\tau_i$ is unidentified person by person, we aim at averages.

::: definition Average treatment effects {#def-ate}
In a population (or a finite study sample, with the average understood as a sample mean) the **average treatment effect** (ATE), the **average treatment effect on the treated** (ATT) and the **average treatment effect on the untreated** (ATU) are

$$
\begin{aligned}
\tau_{\mathrm{ATE}} &= \E\bigl[Y_i(1) - Y_i(0)\bigr], \\
\tau_{\mathrm{ATT}} &= \E\bigl[Y_i(1) - Y_i(0) \mid D_i = 1\bigr], \\
\tau_{\mathrm{ATU}} &= \E\bigl[Y_i(1) - Y_i(0) \mid D_i = 0\bigr].
\end{aligned}
$$
:::

These three numbers coincide if the effect is the same for everyone, or if treatment is independent of the effect. In general they differ, and they answer different questions. A finance ministry that has already enrolled a cohort, and wants to know how much those people gained, wants the ATT. A ministry deciding whether to *offer* the programme to a new, representative cohort wants the ATE. The ATU is the effect on people who currently do not take it up — relevant if the programme is to be expanded to them.

By the law of total expectation,

$$
\tau_{\mathrm{ATE}} = \pi \,\tau_{\mathrm{ATT}} + (1-\pi)\,\tau_{\mathrm{ATU}},
$$ {#eq-ate-mix}

where $\pi = \Prob(D_i = 1)$ is the share treated. The ATE is a weighted average of the effect on those who got the programme and the effect on those who did not.

::: example Average effects in the eight-worker table {#ex-ate-eight}
Using [[#ex-eight]], compute the ATE, ATT and ATU.
::: solution
The eight individual effects are $4, 5, 3, 2, 2, 5, 2, 1$. Their mean is the ATE:

$$
\tau_{\mathrm{ATE}} = \frac{4+5+3+2+2+5+2+1}{8} = 3.
$$

The treated are workers 1, 2, 4 and 6, with effects $4, 5, 2, 5$, so $\tau_{\mathrm{ATT}} = 4$. The untreated are 3, 5, 7 and 8, with effects $3, 2, 2, 1$, so $\tau_{\mathrm{ATU}} = 2$. The treated share is $\pi = 1/2$, and [[#eq-ate-mix]] checks: $\tfrac12 \cdot 4 + \tfrac12 \cdot 2 = 3$. In this population the programme does more for the people who take it than for those who do not — a pattern often called **positive selection on gains**.
:::
:::

::: intuition Who is the "average" person?
An average treatment effect is an average over a *population of units*, not an effect for an average person. If four villagers gain 10 and four lose 2, the ATE is 4, and no villager experienced 4. Heterogeneity is the rule. Later chapters recover *local* averages — for compliers with an instrument ([[causal-inference/iv-and-late]]), or for people at a cutoff ([[causal-inference/regression-discontinuity]]) — that may be far from the ATE. Always ask: average for whom?
:::

## Selection bias

The comparison that started the chapter is the difference in mean *observed* outcomes between treated and untreated units:

$$
\Delta = \E[Y_i \mid D_i = 1] - \E[Y_i \mid D_i = 0].
$$

This is always identified from the data. It is not, in general, any of the causal averages above.

::: theorem Decomposition of the naive comparison {#thm-selection}
Under SUTVA,

$$
\E[Y_i \mid D_i = 1] - \E[Y_i \mid D_i = 0] = \tau_{\mathrm{ATT}} + \underbrace{\E\bigl[Y_i(0) \mid D_i = 1\bigr] - \E\bigl[Y_i(0) \mid D_i = 0\bigr]}_{\text{selection bias}}.
$$ {#eq-selection}
:::

::: proof
Write $\E[Y_i \mid D_i = 1] = \E[Y_i(1) \mid D_i = 1]$ and $\E[Y_i \mid D_i = 0] = \E[Y_i(0) \mid D_i = 0]$ by [[#eq-switching]]. Add and subtract $\E[Y_i(0) \mid D_i = 1]$:

$$
\begin{aligned}
\E[Y_i(1) \mid D_i = 1] - \E[Y_i(0) \mid D_i = 0]
&= \bigl(\E[Y_i(1) \mid D_i = 1] - \E[Y_i(0) \mid D_i = 1]\bigr) \\
&\quad + \bigl(\E[Y_i(0) \mid D_i = 1] - \E[Y_i(0) \mid D_i = 0]\bigr) \\
&= \tau_{\mathrm{ATT}} + \text{selection bias}.
\end{aligned}
$$
:::

Selection bias is the difference in *untreated* outcomes between people who get the treatment and people who do not. It is the answer to: had nobody been treated, how would the two groups have compared? If trainees would have earned more than non-trainees even without the course, selection bias is positive and the naive comparison overstates the ATT. If trainees are negatively selected — the programme is a last resort for people with otherwise poor prospects — the naive comparison understates the ATT, and can even have the wrong sign.

A symmetric decomposition writes the same $\Delta$ as the ATU plus a selection term in $Y_i(1)$. The ATT form is the one used most often, because the treated are the people whose counterfactual $Y_i(0)$ we are trying to guess from the untreated.

::: example Selection can cancel a real effect {#ex-cancel}
In [[#ex-eight]], the naive comparison of observed means is zero. Compute it, and reconcile it with [[#thm-selection]].
::: solution
Observed treated outcomes: $12, 11, 9, 10$, mean $10.5$. Observed untreated outcomes: $10, 12, 9, 11$, mean $10.5$. So $\Delta = 0$. But the ATT is $4$. The missing piece is selection on $Y_i(0)$: among the treated, $\E[Y_i(0) \mid D_i=1] = (8+6+7+5)/4 = 6.5$; among the untreated, $\E[Y_i(0) \mid D_i=0] = (10+12+9+11)/4 = 10.5$. Selection bias equals $6.5 - 10.5 = -4$. Then $4 + (-4) = 0$, as [[#eq-selection]] requires.

The programme *does* raise earnings by 4, on average, for those who take it. The comparison of observed means hides the gain because the people who enrol have much worse untreated prospects. A policymaker who concluded "training does nothing" from $\Delta = 0$ would be wrong; a policymaker who concluded "training is worth 4 for a random unemployed worker" would also be wrong, because the ATE is 3, not 4, and the ATU is only 2.
:::
:::

::: warning Association is not a diluted version of causation
It is tempting to say that a naive comparison is "partly causal". [[#eq-selection]] says something sharper: the observed difference equals a causal effect *plus* a term that can be larger than the effect, of either sign, and that does not shrink just because the sample is large. With millions of observations $\Delta$ is estimated very precisely; it remains the wrong number if selection bias is not zero. Precision is not identification.
:::

::: widget plot
f: tau + s; tau
sliders: tau=4:-2:10; s=-4:-8:8
x: 0, 1
y: -8, 16
labels: \text{naive }\Delta; \text{ATT}
caption: The slider $\tau$ is the ATT; $s$ is selection bias. The naive comparison $\Delta = \tau + s$ (upper line, drawn as a constant) equals the ATT only when $s = 0$. Try $s = -\tau$: a real positive effect is invisible in the observed difference. The horizontal axis is a dummy scale — both quantities are numbers, not functions of $x$.
:::

The figure is deliberately stark: two horizontal lines. Identification is about *which* line the data speak to, not about how wiggly a regression is.

## When is the naive comparison causal?

[[#eq-selection]] makes the condition for $\Delta = \tau_{\mathrm{ATT}}$ obvious: selection bias must be zero.

::: definition Ignorability {#def-ignorability}
Treatment is **ignorable**, or **unconfounded**, when

$$
\bigl(Y_i(1), Y_i(0)\bigr) \;\perp\; D_i.
$$ {#eq-indep}

**Conditional ignorability** given covariates $X_i$ is $\bigl(Y_i(1), Y_i(0)\bigr) \perp D_i \mid X_i$. The weaker condition $\E[Y_i(0) \mid D_i = 1] = \E[Y_i(0) \mid D_i = 0]$ is enough for $\Delta = \tau_{\mathrm{ATT}}$; full independence gives $\Delta = \tau_{\mathrm{ATE}} = \tau_{\mathrm{ATT}} = \tau_{\mathrm{ATU}}$ as well.
:::

Independence of treatment and potential outcomes is a statement about the *assignment mechanism*, not about the observed $Y_i$. It says that the treated and the untreated would have had the same outcome distributions in either regime. It does *not* say that $Y_i$ is independent of $D_i$ — if the treatment works, $Y_i$ and $D_i$ are dependent through [[#eq-switching]].

::: proposition Random assignment identifies the ATE {#prop-random}
If $D_i$ is assigned independently of $\bigl(Y_i(1), Y_i(0)\bigr)$ (as in a well-run randomised experiment, with full compliance), then

$$
\tau_{\mathrm{ATE}} = \E[Y_i \mid D_i = 1] - \E[Y_i \mid D_i = 0],
$$

and the same difference equals the ATT and the ATU. A natural estimator is the difference in sample means.
:::

::: proof
Independence implies $\E[Y_i(d) \mid D_i = 1] = \E[Y_i(d) \mid D_i = 0] = \E[Y_i(d)]$ for $d \in \{0,1\}$. The right-hand side of [[#eq-selection]] therefore has $\tau_{\mathrm{ATT}} = \tau_{\mathrm{ATE}}$ and selection bias equal to zero. The same argument with $Y_i(1)$ in the selection term gives the ATU result.
:::

[[#prop-random]] is the reason randomised experiments occupy the next chapter. It is also the reason every other design in the course tries to *recreate* something like independence: by conditioning on $X_i$, by using an instrument that is as good as random, by comparing units that just barely cleared a cutoff, or by building a synthetic twin.

In observational data, independence is a substantive claim. It might hold if treatment is assigned by a lottery, a cutoff, or a force of nature that has nothing to do with $Y_i(0)$. It does not hold if people *choose* $D_i$ with an eye on their own $Y_i(0)$ or $Y_i(1)$. That choice is the typical situation in labour, development, education and public economics, which is why those fields spend so much effort on design.

::: quiz
In [[#ex-eight]], treatment is *not* ignorable. Which observation is enough to see this?
- [ ] The ATE is 3, which is not zero
- [ ] Four people are treated and four are not
- [x] Mean $Y_i(0)$ is 6.5 among the treated and 10.5 among the untreated
- [ ] Individual effects $\tau_i$ are not all equal
::: solution
Ignorability requires, among other things, that the distribution of $Y_i(0)$ be the same for treated and untreated units. The means 6.5 and 10.5 differ, so independence fails. Heterogeneous effects alone do not violate ignorability, and the ATE being non-zero is a fact about the treatment, not about assignment.
:::
:::

## Regression, control, and what "holding $X$ fixed" means

A common response to selection is to "control for" observable differences in a regression

$$
Y_i = \beta_0 + \beta_1 D_i + X_i'\gamma + u_i.
$$ {#eq-reg}

If $X_i$ is rich enough that remaining variation in $D_i$ is as good as random — that is, if conditional ignorability holds — then $\beta_1$ equals a weighted average of covariate-specific treatment effects, and with a saturated specification for $X_i$ it recovers the ATE under an extra overlap condition. That is the subject of [[causal-inference/selection-on-observables]]. Three comments belong here, before any matching or propensity-score machinery.

First, [[#eq-reg]] does not create ignorability. It *uses* it. If some confounder is omitted, $\hat\beta_1$ inherits omitted-variable bias of the kind derived in [[econometrics/multiple-regression]]: the bias equals the effect of the omitted variable on $Y$ times its regression coefficient on $D$ given $X$. Adding more controls helps only if they are confounders, not if they are colliders or mediators (see below).

Second, the coefficient $\beta_1$ is an average of *conditional* effects, weighted towards covariate cells where treatment variation is large. Angrist (1998) showed that the OLS weight is proportional to the conditional variance of $D_i$ given $X_i$. Groups that are almost all treated, or almost all untreated, contribute little. The regression estimand is therefore not automatically the ATE, even under ignorability.

Third, the residual $u_i$ in [[#eq-reg]] is not a potential outcome. The potential-outcomes model $Y_i = Y_i(0) + D_i \tau_i$ becomes a regression with constant effect $\tau$ and error $Y_i(0) - \E[Y_i(0)]$ only if $\tau_i = \tau$ for all $i$. With heterogeneous effects the error contains $(\tau_i - \beta_1) D_i$, which is correlated with $D_i$ by construction. That is one reason IV, RDD and DID are not just "fancier regressions": they target a defined average of $\tau_i$ under stated assumptions, rather than the probability limit of a particular least-squares functional.

::: example A constant-effect regression that is still biased {#ex-reg-bias}
Suppose $Y_i(0) = 10 + 2 X_i + u_i$, $Y_i(1) = 14 + 2 X_i + u_i$ so the effect is $4$ for everyone, but $D_i = 1$ mainly when $X_i$ is large. A simulation with $n = 200$ and seed 42 (standard normals for $X_i$ and $u_i$; $D_i = 1\{X_i + 0.5 v_i > 0.4\}$ with $v_i$ another standard normal) produces a treated share of $0.34$, a naive treated–control gap of $6.44$, and OLS of $Y$ on $D$ equal to $6.44$ (standard error $0.24$). OLS of $Y$ on $D$ and $X$ produces a coefficient $4.14$ (standard error $0.20$) on $D$. Interpret the three numbers.
::: solution
The true ATE (and ATT, ATU) is $4$. The naive gap $6.44$ overstates it because treated units have higher $X$ (mean $0.78$ versus $-0.45$) and $X$ raises $Y$ even without treatment. That is selection bias of about $2.4$. Once $X$ is in the regression, remaining variation in $D$ is closer to ignorable and the coefficient $4.14$ is within sampling error of $4$. The lesson is not that regression always works — we generated the data so that $X$ is the *only* confounder — but that the potential-outcomes decomposition and the omitted-variable formula are the same fact in two notations.
:::
:::

The numbers in [[#ex-reg-bias]] can be reproduced by drawing $X$, $u$ and $v$ from `numpy.random.default_rng(42)` and running OLS as $\hat\beta = (X^\T X)^{-1} X^\T y$.

## Causal diagrams

Potential outcomes name the counterfactuals. **Directed acyclic graphs** (DAGs), developed by Pearl and others, name the *story* that generates $D$ and $Y$: which variables cause which. A DAG is not a substitute for [[#def-po]], but it is a compact way to decide what to condition on.

::: definition Confounder, mediator, collider {#def-dag}
In a DAG for $(D, Y)$:
- a **confounder** $X$ is a common cause of $D$ and $Y$ (arrows $X \to D$ and $X \to Y$);
- a **mediator** $M$ lies on a causal path from $D$ to $Y$ ($D \to M \to Y$);
- a **collider** $C$ is a common *effect* of $D$ (or a cause of $D$) and $Y$ (or a cause of $Y$), for example $D \to C \leftarrow U \to Y$.
:::

To identify the causal effect of $D$ on $Y$ we must block every **back-door** path from $D$ to $Y$ — every path that starts with an arrow *into* $D$ — and we must not block the causal paths we are trying to measure. Conditioning on a confounder blocks a back-door path. Conditioning on a mediator blocks a causal path and so estimates something other than the total effect (an "indirect-only" or controlled direct effect, depending on the rest of the graph). Conditioning on a collider *opens* a path that was blocked, inducing a spurious association.

The last point is the one that most often surprises. Among people who were admitted to hospital ($C = 1$), a risk factor $D$ and a disease $Y$ can be negatively associated even if they are independent in the population, because admission is caused by either. This is **Berkson's paradox**. In applied work the collider is often a sample-inclusion rule, a post-treatment variable, or an occupation that people select into after treatment.

::: warning Bad controls
A **bad control** is a variable that is itself an outcome of treatment, or a collider. Adding it to [[#eq-reg]] does not "hold more things fixed"; it changes the estimand and can create selection bias that was not there. The safe rule is: control for pre-treatment confounders; do not control for post-treatment outcomes. Intermediate variables belong in a mediation analysis, which answers a different question. Angrist and Pischke (2009, §3.2.3) collect examples; a classic is controlling for occupation when estimating the return to schooling, which throws away the part of the return that operates *through* occupation.
:::

::: quiz
A study of a job-training programme controls for the participant's wage in the first job *after* the programme, "to compare like with like". What is the most likely problem?
- [ ] The post-programme wage is a confounder, so it must be included
- [x] The post-programme wage is a mediator (and an outcome), so controlling for it blocks part of the effect and can open collider paths
- [ ] Controlling for any wage always reduces standard errors, which is the goal
- [ ] SUTVA fails whenever a wage is used as a control
::: solution
The first post-programme wage lies on the path from training to later earnings (or *is* the outcome). Conditioning on it estimates a direct effect net of job quality, not the total effect of training, and among people with the same post-programme wage the treated and untreated are selected in different ways. SUTVA is a statement about interference and treatment versions, not about controls.
:::
:::

DAGs and potential outcomes agree when they are applied to the same story. A DAG that omits a confounder and a potential-outcomes model that claims ignorability given the remaining $X$ are the same mistake. The advantage of writing both is that the DAG makes "do not condition on this" visible, while potential outcomes make "this is an ATT, not an ATE" visible.

## Evidence

The framework is not a recent fashion. Neyman introduced potential yields of agricultural plots in 1923. Rubin (1974) recast the idea for observational studies in psychology and economics. Holland (1986) named the fundamental problem and insisted, in a slogan often repeated, that there is "no causation without manipulation": a causal effect is defined only for a treatment that could, in principle, have been otherwise. That slogan is a useful brake on loose talk about the "effect of being a woman" or the "effect of GDP"; it is not a prohibition on studying discrimination or growth, but a demand that the intervention be specified.

The empirical force of the framework became impossible to ignore with LaLonde (1986). The National Supported Work (NSW) demonstration randomly assigned a job-training programme in the United States in the 1970s. For a sample of men, the experimental estimate of the ATT on annual earnings was on the order of one to two thousand dollars. LaLonde then discarded the experimental control group, replaced it with comparison groups drawn from the Current Population Survey and the Panel Study of Income Dynamics, and ran the selection-on-observables estimators of the day. The non-experimental estimates ranged from several thousand dollars negative to several thousand positive. A method that cannot recover a known experimental benchmark in a setting it was designed for is not a method one would trust in a setting without a benchmark. Dehejia and Wahba (1999) later showed that *some* matching estimators, on a carefully restricted NSW sample with a strong common-support condition, come much closer; the debate is taken up in [[causal-inference/selection-on-observables]]. The lasting lesson of LaLonde is not that observational studies are hopeless. It is that a causal claim is only as good as the design that makes $\E[Y_i(0) \mid D_i=1]$ recoverable, and that the way to test a design is to ask what it would have given in an experiment.

Randomised evaluations have since been used at scale in development economics (Banerjee, Duflo, Kremer and many others; Nobel Prize 2019) and in labour, education and public finance. Natural experiments — draft lotteries, cutoffs, staggered law changes — have been used to the same end (Card, Angrist, Imbens; Nobel Prize 2021). Neither prize ended the argument about how far a well-identified local effect generalises; that is [[causal-inference/external-validity]].

::: application Programme evaluation as missing data
Viewed from [[#eq-switching]], causal inference is a missing-data problem: $Y_i(1)$ is missing when $D_i = 0$ and $Y_i(0)$ is missing when $D_i = 1$. The assignment mechanism is the missingness mechanism. Random assignment is missingness completely at random; ignorability given $X$ is missingness at random; an instrument is a variable that predicts missingness without predicting the outcome except through treatment. This analogy, which Rubin emphasised, is why techniques from survey non-response (weighting, imputation, bounding) reappear as inverse-probability weights, matching and Manski bounds in later chapters.
:::

::: history
**1923, Jerzy Neyman.** In a doctoral thesis on agricultural field experiments, Neyman defined the yield of each plot under each variety as a potential outcome and the average treatment effect as the mean difference of those unobserved pairs. The English translation appeared in *Statistical Science* in 1990.

**1974, Donald Rubin.** "Estimating Causal Effects of Treatments in Randomized and Nonrandomized Studies" (*Journal of Educational Psychology*) stated the potential-outcomes model for observational data and made the assignment mechanism an explicit modelling target.

**1986, Paul Holland and Robert LaLonde.** Holland's *JASA* paper "Statistics and Causal Inference" named the fundamental problem. LaLonde's *AER* paper "Evaluating the Econometric Evaluations of Training Programs with Experimental Data" showed that standard observational estimators of the day failed to recover an experimental training effect, and became a manifesto for design-based inference.
:::

## Where this leads

The next chapter, [[causal-inference/randomised-experiments]], takes [[#prop-random]] seriously: how to analyse an experiment, what to do when compliance is imperfect, and how large a sample must be. When randomisation is off the table, [[causal-inference/selection-on-observables]] uses conditional ignorability; [[causal-inference/iv-and-late]] uses an instrument and recovers a *local* average for compliers; [[causal-inference/difference-in-differences]] uses a comparison group over time; [[causal-inference/regression-discontinuity]] uses a cutoff; [[causal-inference/synthetic-control]] builds a counterfactual from weighted donors. In each case the question is the same one posed here: what identifies $\E[Y_i(0) \mid D_i = 1]$, and for whom?

Applications run through the rest of the atlas. The return to schooling in [[labour-economics/human-capital]] is a causal effect of a year of education, not a coefficient in an earnings regression. The employment effect of a minimum wage in [[labour-economics/labour-market-equilibrium]] is an ATT (or a DID estimand) for affected workers and firms. Field experiments in [[development-economics/aid-and-policy]] are randomised designs whose spillovers often violate SUTVA. The potential-outcomes language is how those estimates are stated.

::: summary
- Each unit has potential outcomes $Y_i(1)$, $Y_i(0)$; we observe $Y_i = D_i Y_i(1) + (1-D_i) Y_i(0)$ and never $\tau_i = Y_i(1) - Y_i(0)$ ([[#def-po]]). SUTVA rules out interference and multiple treatment versions.
- Target averages — ATE, ATT, ATU — answer different questions and need not coincide ([[#def-ate]]).
- The naive treated–control gap equals the ATT plus selection bias, the difference in untreated outcomes between the two groups ([[#thm-selection]]). Selection bias does not shrink with sample size.
- Independence of treatment and potential outcomes (ignorability) makes the naive gap equal the ATE; random assignment delivers it ([[#prop-random]]). Conditional ignorability given $X$ is the observational analogue.
- Control for pre-treatment confounders; do not control for mediators or colliders. A regression coefficient is a variance-weighted average of conditional effects, not automatically the ATE.
- LaLonde (1986) showed that a design which cannot recover an experimental benchmark should not be trusted in the dark. The rest of the course is a catalogue of designs that try to earn that trust.
:::

## Exercises

::: exercise Read the table {level=1 check="3"}
In [[#ex-eight]], what is worker 3's individual treatment effect $\tau_3$? (Enter the integer.)
::: solution
$\tau_3 = Y_3(1) - Y_3(0) = 13 - 10 = 3$. Worker 3 is untreated, so this number is not observed in the data — only $Y_3 = 10$ is.
:::
:::

::: exercise Observed means {level=1 check="10.5"}
In [[#ex-eight]], what is the mean observed outcome among the treated, $\E[Y_i \mid D_i = 1]$? (Enter the mean, with a decimal if needed.)
::: solution
The treated observed outcomes are $12, 11, 9, 10$. Their mean is $42/4 = 10.5$.
:::
:::

::: exercise Four people {level=1 check="2"}
Four people have potential outcomes $Y(0) = (2, 4, 6, 8)$ and $Y(1) = (5, 7, 7, 9)$. Treatment is $D = (1, 0, 1, 0)$. What is the ATE? (Enter the integer.)
::: solution
The four effects are $3, 3, 1, 1$. The ATE is $(3+3+1+1)/4 = 2$. (The ATT is also $2$, the average of $3$ and $1$; the naive comparison of observed means is $(5+7)/2 - (4+8)/2 = 6 - 6 = 0$, so selection bias is $-2$.)
:::
:::

::: exercise Name the bias {level=2 check="-4"}
In [[#ex-eight]], what is the selection-bias term $\E[Y_i(0) \mid D_i=1] - \E[Y_i(0) \mid D_i=0]$ in [[#eq-selection]]? (Enter the integer, including a minus sign if negative.)
::: solution
$\E[Y_i(0) \mid D_i=1] = (8+6+7+5)/4 = 6.5$ and $\E[Y_i(0) \mid D_i=0] = (10+12+9+11)/4 = 10.5$, so the difference is $6.5 - 10.5 = -4$. Combined with $\tau_{\mathrm{ATT}} = 4$ this recovers the naive gap of $0$.
:::
:::

::: exercise ATT from the mix {level=2 check="4"}
A programme treats half of a population. The ATE is $3$ and the ATU is $2$. What is the ATT? (Enter the integer.)
::: hint
Use [[#eq-ate-mix]]: $\tau_{\mathrm{ATE}} = \pi \tau_{\mathrm{ATT}} + (1-\pi)\tau_{\mathrm{ATU}}$.
:::
::: solution
With $\pi = 1/2$, the mixing formula is $3 = \tfrac12 \tau_{\mathrm{ATT}} + \tfrac12 \cdot 2$, so $3 = \tfrac12 \tau_{\mathrm{ATT}} + 1$, hence $\tau_{\mathrm{ATT}} = 4$.
:::
:::

::: exercise Naive versus ATT {level=2}
Suppose $\tau_{\mathrm{ATT}} = 8$ and $\E[Y_i(0) \mid D_i = 1] = 20$, $\E[Y_i(0) \mid D_i = 0] = 26$. What is the naive treated–control difference $\Delta$? Does it overstate or understate the ATT?
::: solution
By [[#thm-selection]], $\Delta = 8 + (20 - 26) = 8 - 6 = 2$. The naive comparison understates the ATT by $6$: the treated have worse untreated outcomes than the untreated (negative selection), so part of the true gain is hidden by the comparison of observed means.
:::
:::

::: exercise SUTVA in a vaccination campaign {level=2}
A village of 200 people is offered a vaccine. Person $i$'s chance of remaining uninfected depends on how many neighbours are vaccinated. Explain, in the language of [[#def-sutva]], why the pair $\bigl(Y_i(1), Y_i(0)\bigr)$ is not well-defined as it stands, and how you might redefine the treatment so that potential outcomes make sense.
::: solution
Interference violates SUTVA: $Y_i$ depends on other people's $D_j$, so "$Y_i(1)$" — $i$ vaccinated, everyone else's treatment unspecified — is not a single number. One repair is to define a treatment *vector* $\mathbf{d} = (d_1,\dots,d_{200})$ and potential outcomes $Y_i(\mathbf{d})$. That object is well-defined but high-dimensional; in practice one restricts interference, for example by assuming that $Y_i$ depends on $D_i$ and the share vaccinated in $i$'s household, which yields a small family of potential outcomes. Another repair is to randomise *villages* rather than people, so the unit of analysis is the village and interference within the village is absorbed into $Y_g(1)$ and $Y_g(0)$. Both strategies appear in [[causal-inference/randomised-experiments]].
:::
:::

::: exercise Prove the ATU form {level=3}
Starting from [[#eq-switching]], derive the companion to [[#eq-selection]]:

$$
\E[Y_i \mid D_i = 1] - \E[Y_i \mid D_i = 0] = \tau_{\mathrm{ATU}} + \bigl(\E[Y_i(1) \mid D_i = 1] - \E[Y_i(1) \mid D_i = 0]\bigr).
$$

Interpret the new selection term.
::: hint
Add and subtract $\E[Y_i(1) \mid D_i = 0]$ instead of $\E[Y_i(0) \mid D_i = 1]$.
:::
::: solution
$\E[Y_i \mid D_i = 1] = \E[Y_i(1) \mid D_i = 1]$ and $\E[Y_i \mid D_i = 0] = \E[Y_i(0) \mid D_i = 0]$. Adding and subtracting $\E[Y_i(1) \mid D_i = 0]$,

$$
\begin{aligned}
&\E[Y_i(1) \mid D_i = 1] - \E[Y_i(0) \mid D_i = 0] \\
&\qquad = \bigl(\E[Y_i(1) \mid D_i = 0] - \E[Y_i(0) \mid D_i = 0]\bigr) + \bigl(\E[Y_i(1) \mid D_i = 1] - \E[Y_i(1) \mid D_i = 0]\bigr) \\
&\qquad = \tau_{\mathrm{ATU}} + \bigl(\E[Y_i(1) \mid D_i = 1] - \E[Y_i(1) \mid D_i = 0]\bigr).
\end{aligned}
$$

The new selection term is the difference in *treated* outcomes between people who do and do not take the treatment: had everyone been treated, how would the two groups have compared? It is zero under ignorability of $Y_i(1)$.
:::
:::

::: exercise A bounding exercise {level=3}
An outcome is known to lie in $\{0,1\}$ (for example, employment). In a sample, $\E[Y_i \mid D_i = 1] = 0.70$ and $\E[Y_i \mid D_i = 0] = 0.40$, with $\pi = \Prob(D_i = 1) = 0.50$. Without any ignorability assumption, give the sharp bounds on the ATE implied by the fact that the missing potential outcomes also lie in $\{0,1\}$.
::: hint
The missing pieces are $\E[Y_i(0) \mid D_i = 1]$ and $\E[Y_i(1) \mid D_i = 0]$, each of which can be anywhere in $[0,1]$. Write the ATE as $\pi \E[Y_i(1) \mid D_i=1] + (1-\pi)\E[Y_i(1) \mid D_i=0] - \pi \E[Y_i(0) \mid D_i=1] - (1-\pi)\E[Y_i(0) \mid D_i=0]$ and insert the observed pieces.
:::
::: solution
The ATE expands as

$$
\tau_{\mathrm{ATE}} = \pi \E[Y_i(1) \mid D_i=1] + (1-\pi)\E[Y_i(1) \mid D_i=0] - \pi \E[Y_i(0) \mid D_i=1] - (1-\pi)\E[Y_i(0) \mid D_i=0].
$$

The observed pieces are $\E[Y_i(1) \mid D_i=1] = 0.70$ and $\E[Y_i(0) \mid D_i=0] = 0.40$. With $\pi = 1/2$ this is

$$
\tau_{\mathrm{ATE}} = \tfrac12 \cdot 0.70 + \tfrac12 \E[Y_i(1) \mid D_i=0] - \tfrac12 \E[Y_i(0) \mid D_i=1] - \tfrac12 \cdot 0.40 = 0.15 + \tfrac12 \bigl(\E[Y_i(1) \mid D_i=0] - \E[Y_i(0) \mid D_i=1]\bigr).
$$

Each missing conditional expectation lies in $[0,1]$, so their difference lies in $[-1,1]$ and $\tfrac12$ of it lies in $[-0.5, 0.5]$. Therefore $\tau_{\mathrm{ATE}} \in [0.15-0.5,\, 0.15+0.5] = [-0.35,\, 0.65]$. These are Manski (1989) **no-assumption bounds**. They always contain zero here in the sense that the interval is wide; the data alone, without a design, do not sign the ATE. Ignorability would collapse the interval to the naive gap $0.70 - 0.40 = 0.30$.
:::
:::

::: exercise Random assignment as a missing-data mechanism {level=3}
Using only [[#eq-switching]] and $\bigl(Y_i(1), Y_i(0)\bigr) \perp D_i$, show that $\E[Y_i \mid D_i = d] = \E[Y_i(d)]$ for $d \in \{0,1\}$, and hence that both $\tau_{\mathrm{ATE}}$ and $\tau_{\mathrm{ATT}}$ equal the naive comparison. (This is [[#prop-random]] written as a short derivation you should be able to reproduce without looking it up.)
::: solution
By [[#eq-switching]], $Y_i = Y_i(d)$ on the event $\{D_i = d\}$, so $\E[Y_i \mid D_i = d] = \E[Y_i(d) \mid D_i = d]$. Independence of the pair $\bigl(Y_i(1), Y_i(0)\bigr)$ and $D_i$ implies $\E[Y_i(d) \mid D_i = d] = \E[Y_i(d)]$. Therefore $\E[Y_i \mid D_i = 1] - \E[Y_i \mid D_i = 0] = \E[Y_i(1)] - \E[Y_i(0)] = \tau_{\mathrm{ATE}}$. The same independence gives $\E[Y_i(1) - Y_i(0) \mid D_i = 1] = \E[Y_i(1) - Y_i(0)]$, so the ATT equals the ATE and both equal the naive comparison.
:::
:::
