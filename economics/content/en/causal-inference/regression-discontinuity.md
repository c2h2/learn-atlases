A scholarship is awarded to every student who scores at least $70$ on an exam, and to nobody who scores $69$. Near $70$, the difference between treated and untreated is a couple of exam questions. If those questions are as good as random — if students cannot perfectly polish their score, and if nothing else jumps at $70$ — then comparing people just above the cutoff with people just below is a local randomised experiment. That is **regression discontinuity** (RD, or RDD).

Thistlethwaite and Campbell proposed the design in 1960. Hahn, Todd and van der Klaauw (2001) gave it a modern identification proof; Imbens and Lemieux (2008) and Lee and Lemieux (2010) made it a standard applied tool. Lee (2008) used close US House elections as an RD for the incumbency advantage and found that barely winning raises the probability of winning next time by about $0.40$–$0.45$ and the vote share by about $8$ percentage points. The design is as credible as an experiment *at the cutoff*. It is silent about people far from the cutoff, which is both its limitation and the reason its assumptions are often more believable than global ignorability.

## Sharp RD

A **running variable** (forcing variable) $R_i$ determines treatment: in the **sharp** design,

$$
D_i = \mathbf{1}\{R_i \ge c\}
$$

for a known cutoff $c$. Potential outcomes $Y_i(1)$, $Y_i(0)$ may depend on $R_i$ — better exam scores predict better later outcomes — so a naive treated–control comparison is badly biased. The RD idea is to take the *limit* of that comparison as $R$ approaches $c$ from each side.

::: definition Sharp RD estimand {#def-sharp}
The **sharp RD treatment effect** at the cutoff is

$$
\tau_{\mathrm{SRD}} = \lim_{r \downarrow c} \E[Y_i \mid R_i = r] - \lim_{r \uparrow c} \E[Y_i \mid R_i = r].
$$ {#eq-srd}
:::

::: theorem Identification of sharp RD {#thm-srd}
Assume SUTVA, $D_i = \mathbf{1}\{R_i \ge c\}$, and that $\E[Y_i(1) \mid R_i = r]$ and $\E[Y_i(0) \mid R_i = r]$ are continuous in $r$ at $c$. Then $\tau_{\mathrm{SRD}} = \E\bigl[Y_i(1) - Y_i(0) \bigm| R_i = c\bigr]$, the average treatment effect for units *at the cutoff*.
:::

::: proof
Continuity of the two conditional expectations and the switching equation give

$$
\lim_{r \downarrow c} \E[Y \mid R=r] = \E[Y(1) \mid R=c], \qquad \lim_{r \uparrow c} \E[Y \mid R=r] = \E[Y(0) \mid R=c].
$$

Subtract. (Hahn, Todd and van der Klaauw 2001. Lee 2008 gives a local-randomisation interpretation: if $R_i = r_i^* + \eps_i$ with a density of $\eps$ that is positive and continuous at the cutoff, then among units with $R$ near $c$, treatment is as good as randomly assigned.)
:::

Continuity of $\E[Y(d) \mid R]$ is the identifying assumption. It fails if something other than $D$ jumps at $c$: another programme that uses the same cutoff, a round-number psychological effect, or **manipulation** of $R$ (students retaking the exam until they pass, firms bunching just below a tax threshold). Continuity of the *density* of $R$ at $c$ is a testable implication of no manipulation (McCrary 2008); continuity of pre-determined covariates at $c$ is a testable implication of local randomisation.

::: widget plot
f: 8 + 0.6*(x-c) + tau*heaviside(x-c) + 0.4*(x-c)*heaviside(x-c)
sliders: tau=5:0:10; c=0:-0.5:0.5
x: -1, 1
y: 4, 16
labels: \E[Y \mid R]
vlines: 0
caption: A sharp RD: the conditional mean of $Y$ given $R$ jumps by $\tau$ at the cutoff (move $c$ and $\tau$). The slope is allowed to differ on the two sides. The effect the design reports is the jump, not the difference in average $Y$ between the whole right and the whole left — that difference mixes the jump with the slope in $R$.
:::

## Estimation: local linear, bandwidth, bias

The two limits in [[#eq-srd]] are estimated by **local linear regression**: OLS of $Y$ on a constant and $(R-c)$, separately on each side of $c$, using only observations with $|R-c| \le h$ (the **bandwidth**), typically with a triangular kernel that weights points near $c$ more heavily.

::: definition Local linear RD {#def-llr}
On a window $|R_i - c| \le h$, fit

$$
Y_i = \alpha + \tau D_i + \beta (R_i - c) + \gamma D_i (R_i - c) + u_i.
$$ {#eq-llr}

The OLS coefficient $\hat\tau$ is the estimated jump. The interaction lets the slope differ on the two sides. A quadratic in $(R-c)$, interacted with $D$, is the local-quadratic version.
:::

Global high-order polynomials in $R$, fit on the whole support, are no longer recommended (Gelman and Imbens 2019): they are sensitive to points far from $c$, can oscillate, and produce confidence intervals that undercover. Local linear, with a bandwidth chosen to balance bias and variance, is the default.

**Bandwidth choice.** A smaller $h$ reduces bias (the linear approximation to $\E[Y(d) \mid R]$ is better) and raises variance (fewer observations). Imbens and Kalyanaraman (2012) and Calonico, Cattaneo and Titiunik (2014, CCT) give data-driven $h$. CCT also provide **robust bias-corrected** confidence intervals that inflate the variance to account for the bias that a MSE-optimal $h$ leaves in. Report $\hat\tau$ at the CCT bandwidth and at a couple of neighbours of that $h$; a result that exists at only one $h$ is not a result.

::: example A simulated sharp RD {#ex-rdd-sim}
Draw $n = 250$ running variables $R_i \sim U(-1,1)$ and outcomes

$$
Y_i = 8 + 3 R_i + 5 \cdot \mathbf{1}\{R_i \ge 0\} + 1 \cdot R_i \cdot \mathbf{1}\{R_i \ge 0\} + u_i,
$$

$u_i \sim N(0, 1.2^2)$, from `numpy.random.default_rng(11)`. The true jump at $0$ is $5$. Local linear [[#eq-llr]] on the whole $[-1,1]$ (a global linear-with-interaction) gives $\hat\tau = 5.32$ (standard error $0.31$). Restricted to $|R| < 0.4$ ($95$ observations), $\hat\tau = 5.48$ (se $0.49$). Restricted to $|R| < 0.25$ ($60$ observations), $\hat\tau = 5.65$ (se $0.64$). A raw mean-difference in $|R|<0.15$ is $6.05$.
::: solution
All four numbers are within sampling error of $5$, and the standard errors grow as the window shrinks, as they should. The global fit is precise here because the DGP *is* linear on each side; in an application that luck is not guaranteed, which is why the local fits are the ones to trust. Reproduce: draw $R$ and $u$, form $D = 1\{R \ge 0\}$, $Y = 8 + 3R + 5D + R\cdot D + u$, and OLS of $Y$ on $(1, R, D, D\cdot R)$ on the subsample $|R|<h$.
:::
:::

::: example A four-number local linear {#ex-llr-hand}
In a window around $c=0$, four observations: $(-0.2, 9)$, $(-0.1, 10)$ on the left and $(0.1, 16)$, $(0.2, 17)$ on the right. Fit a separate intercept-and-slope on each side by eye (or by OLS) and read off $\hat\tau$.
::: solution
Left: the two points sit on the line $Y = 11 + 10 R$, so the left intercept at $0$ is $11$. Right: $Y = 15 + 10 R$, intercept $15$. The jump is $15-11 = 4$. (OLS on each pair of points recovers the unique line through them.) A raw mean difference $(16.5-9.5) = 7$ overstates the jump because it includes the slope in $R$. That is why [[#eq-llr]] includes $(R-c)$ and the interaction.
:::
:::

::: warning Donut RD and mass at the cutoff
If units *exactly* at $c$ are selected (teachers rounding scores to $70$), dropping a "donut" around $c$ and estimating on the remaining window is a robustness check. It is not a solution if manipulation extends further. A spike in the histogram of $R$ at $c$, or a McCrary density jump, is a reason to distrust the design, not a reason to drop the spike and proceed.
:::

## Fuzzy RD

When the cutoff changes the *probability* of treatment but does not switch it from $0$ to $1$ — some people below $c$ get treated, some above do not — the design is **fuzzy**. The first stage is the jump in $\E[D \mid R]$ at $c$; the reduced form is the jump in $\E[Y \mid R]$ at $c$; the ratio is an IV estimator, with $Z_i = \mathbf{1}\{R_i \ge c\}$ as the instrument.

::: theorem Fuzzy RD is a LATE at the cutoff {#thm-frd}
Assume continuity of $\E[Y_i(d) \mid R_i = r]$ and of $\E[D_i(z) \mid R_i = r]$ at $c$, a non-zero jump in $\E[D \mid R]$ at $c$, exclusion (the cutoff affects $Y$ only through $D$), and monotonicity (no defiers at $c$). Then

$$
\tau_{\mathrm{FRD}} = \frac{\displaystyle\lim_{r \downarrow c}\E[Y \mid R=r] - \lim_{r \uparrow c}\E[Y \mid R=r]}{\displaystyle\lim_{r \downarrow c}\E[D \mid R=r] - \lim_{r \uparrow c}\E[D \mid R=r]}
$$ {#eq-frd}

equals $\E\bigl[Y_i(1)-Y_i(0) \bigm| \text{complier},\, R_i = c\bigr]$, the LATE for people at the cutoff whose treatment is switched by crossing $c$.
:::

::: proof
This is Hahn, Todd and van der Klaauw (2001), combining [[#thm-srd]] with [[causal-inference/iv-and-late#thm-late]]. The numerator is the ITT of crossing $c$; the denominator is the first-stage jump in treatment probability. Local linear 2SLS, instrumenting $D$ with $\mathbf{1}\{R \ge c\}$ in a window around $c$, is the estimator.
:::

A scholarship that is *offered* at $70$ but not always taken up, or a rule that is not perfectly enforced, is fuzzy. The first-stage jump should be plotted with the same care as the outcome jump. A small first-stage jump is a weak instrument, with all the problems of [[causal-inference/iv-and-late]].

## Manipulation, covariates and donuts

::: definition McCrary density test {#def-mccrary}
Under local randomisation the density $f_R(r)$ is continuous at $c$. McCrary (2008) tests for a jump in $f_R$ by local-linear regression of a finely binned histogram on either side of $c$. A spike or a hole at $c$ is evidence that units sorted themselves around the cutoff.
:::

Cattaneo, Jansson and Ma (2020) provide a local-polynomial density test that is the current default. Neither test has much power in small samples; a histogram is still worth looking at.

**Covariates.** Pre-determined $X$ should not jump at $c$. Estimating [[#eq-llr]] with $X$ as the outcome is the balance test. Including $X$ as a control in the $Y$ regression is optional and, as in an experiment, is for precision rather than identification — unless one is worried about a small-sample imbalance.

**Discrete running variables.** When $R$ is a test score in integer points, the limits in [[#eq-srd]] are not literally limits. Lee and Card (2008) discuss clustering on $R$; local randomisation in a small window (Cattaneo, Frandsen and Titiunik 2015) treats the few score values nearest $c$ as a mini-experiment and uses Fisher-style permutation inference.

::: example Covariate continuity {#ex-cov-rd}
An RD on a scholarship cutoff of $70$ is used to study college enrolment. Mean parental income is \$42,000 just below $70$ and \$58,000 just above, in a small bandwidth, with the difference several times its standard error. The density of the score is smooth. Can you still interpret the enrolment jump as the effect of the scholarship?
::: solution
No. Parental income is a pre-determined covariate; it should not jump at $70$ under local randomisation. A \$16,000 jump means the two sides are not comparable — perhaps a second rule uses the same cutoff, or scores are manipulated in a way the density test missed (manipulation of a *subset* can move means without a big density spike). Continuity of $\E[Y(d) \mid R]$ is then implausible, because parental income is a determinant of $Y(0)$. The density test is necessary, not sufficient.
:::
:::

::: example Fuzzy first stage {#ex-fuzzy-fs}
At a cutoff, take-up of a training programme jumps from $0.20$ to $0.70$ and earnings jump from $1{,}000$ to $1{,}400$ (monthly, illustrative). Compute $\hat\tau_{\mathrm{FRD}}$. Who are the compliers?
::: solution
$\hat\tau_{\mathrm{FRD}} = (1400-1000)/(0.70-0.20) = 400/0.5 = 800$. Compliers are people at the cutoff whose take-up is switched by crossing it: they take training if and only if they are above $c$. Always-takers (the $0.20$ below) and never-takers (the $0.30$ above) drop out of the ratio, as in [[causal-inference/iv-and-late#thm-late]].
:::
:::

::: quiz
A plot of $Y$ against $R$ shows a jump at the cutoff and a *second* jump at a round number a little above it. The McCrary test does not reject. The most careful next step is
- [ ] to ignore the second jump, because the density is continuous
- [x] to ask what else happens at that round number, and to treat it as a threat to the continuity of $\E[Y(d) \mid R]$
- [ ] to widen the bandwidth so the second jump is averaged away
- [ ] to conclude that RD is invalid whenever $Y$ is not perfectly linear
::: solution
Continuity of the density is about manipulation of $R$, not about other discontinuities in $Y$. A second jump is a sign that $Y$ has structure at round numbers (or a second programme). Widening the bandwidth mixes that structure into $\hat\tau$. Non-linearity of $Y$ given $R$ is why we use local linear, not why we abandon the design.
:::
:::

## Evidence: Lee's close elections, and others

Lee (2008) takes the Democratic vote share in US House elections as $R$, with cutoff $50$ percent. Barely winning ($R \downarrow 50$ from above) versus barely losing is as good as random if the exact vote count has a smooth density — a claim the paper documents with density and covariate tests. The outcome is whether the party wins the *next* election, and by how much. The RD estimate of the incumbency advantage is large: about $8$ percentage points of vote share and $40$–$45$ percentage points of win probability. The design launched a political-science industry of close-election RDs (and a debate about whether very close elections are *less* random, because campaigns fight harder: Caughey and Sekhon 2011; Eggers et al. 2015, who find that in most electoral settings the density is well-behaved).

Other canonical applications. Ludwig and Miller (2007): Head Start funding, assigned by a 1960s poverty-rate cutoff, with effects on child mortality and schooling. Dell (2010): the Spanish *mita* forced-labour boundary in Peru, a geographic RD, with persistent effects on consumption and public goods. Abdulkadiroğlu, Angrist and Pathak (2014): exam-school offers in Boston and New York, a fuzzy RD at admission cutoffs, finding little effect of elite exam schools on test scores for marginal students. Each paper's credibility lives in the continuity argument and in the plots of $Y$, $D$ and $X$ against $R$.

RD is not a licence to treat any threshold as an experiment. Firms bunch below tax kinks (Saez 2010); students retake tests; mayors who would lose sometimes find extra votes. When the density test fails, the design is not "a bit weaker". It is a selected comparison, and the selection is on the running variable that the whole method uses.

::: application Geographic RD
A border between two policy regimes — a state line, a development-zone boundary — is an RD with *location* as $R$, if one is willing to treat the border as a cutoff in a continuous geography. The continuity assumption is that potential outcomes would not jump at the border in the absence of the policy: same labour market, same culture, same weather. Spillovers across the border violate SUTVA (workers commute; shops move). Donut RDs that drop the immediate border strip, and maps that show the jump is at the border rather than at a river or a motorway that happens to coincide with it, are part of the argument. Geographic RD is closer in spirit to DID against a neighbour than it first looks.
:::

::: history
**1960, Donald Thistlethwaite and Donald Campbell.** "Regression-Discontinuity Analysis: An Alternative to the Ex Post Facto Experiment" (*Journal of Educational Psychology*) compared scholarship recipients just above a cutoff with near-misses. The design waited forty years for widespread use in economics.

**2001, Jinyong Hahn, Petra Todd and Wilbert van der Klaauw.** "Identification and Estimation of Treatment Effects with a Regression-Discontinuity Design" (*Econometrica*) proved [[#thm-srd]] and [[#thm-frd]] and connected fuzzy RD to LATE.

**2008, David Lee; Justin McCrary.** Lee's *Journal of Econometrics* paper on House elections gave the local-randomisation interpretation and a canonical application. McCrary's density test, in the same journal, became the standard manipulation check.

**2014, Sebastian Calonico, Matias Cattaneo and Rocio Titiunik.** "Robust Nonparametric Confidence Intervals for Regression-Discontinuity Designs" (*Econometrica*) is the CCT bandwidth and bias-correction procedure implemented in `rdrobust`, now the default software.
:::

## Where this leads

Fuzzy RD is IV; everything in [[causal-inference/iv-and-late]] about weak first stages and compliers applies at the cutoff. When a policy is adopted in one region and not a neighbour, the comparison is either a geographic RD or a DID, and the two can be combined. External validity is the obvious tax: $\tau_{\mathrm{SRD}}$ is the effect at $c$, for the people who are at $c$. Transporting it to a different cutoff, or to people far from $c$, is [[causal-inference/external-validity]].

::: summary
- Sharp RD compares limits of $\E[Y \mid R]$ from each side of a cutoff. Under continuity of $\E[Y(d) \mid R]$, the jump is the ATE at the cutoff ([[#thm-srd]]).
- Estimate with local linear regression in a bandwidth $h$ ([[#def-llr]]); avoid global high-order polynomials. Report CCT robust intervals and sensitivity to $h$.
- Fuzzy RD is the Wald ratio of two jumps, a LATE for cutoff-compliers ([[#thm-frd]]).
- Test the density of $R$ (McCrary) and the continuity of pre-determined $X$. Manipulation of $R$ is a design failure.
- Lee (2008) found an incumbency advantage of about $8$ percentage points of vote share in close House elections. The result, and the method, have been unusually influential because the identifying assumption is unusually transparent — and testable.
:::

## Exercises

::: exercise Read the jump {level=1 check="6"}
Local linear fits give $\lim_{r \downarrow c}\widehat{\E}[Y \mid R=r] = 16$ and $\lim_{r \uparrow c}\widehat{\E}[Y \mid R=r] = 10$. What is $\hat\tau_{\mathrm{SRD}}$? (Enter the integer.)
::: solution
$16 - 10 = 6$.
:::
:::

::: exercise Fuzzy ratio {level=1 check="8"}
The outcome jumps by $4$ at $c$ and the treatment probability jumps by $0.5$. Under the conditions of [[#thm-frd]], what is $\hat\tau_{\mathrm{FRD}}$? (Enter the integer.)
::: solution
$4 / 0.5 = 8$.
:::
:::

::: exercise Who is the effect for? {level=1}
A scholarship is awarded at a test-score cutoff of $70$. The RD estimate is $0.12$ years of additional college. For whom is this the effect?
::: solution
For students *at* a score of $70$ (sharp RD: the ATE at $c$; fuzzy RD: the LATE for those at $c$ whose take-up is switched by the offer). It is not the effect of the scholarship on students who score $95$, or on students who would never enrol, and it is not the average effect in the whole candidate population.
:::
:::

::: exercise Why not a global cubic? {level=2}
A researcher fits $Y = \alpha + \tau D + \beta_1 R + \beta_2 R^2 + \beta_3 R^3 + \beta_4 D R + \beta_5 D R^2 + \beta_6 D R^3$ on the whole support of $R$ and reports $\hat\tau$ as the RD estimate. Give two reasons this is a bad default, relative to local linear.
::: solution
(i) High-order polynomials are driven by $R$ far from $c$; a wiggle at the edge of the support can tilt the cubic and move $\hat\tau$ even if nothing happened at $c$. (ii) They overfit and produce misleadingly small standard errors (Gelman and Imbens 2019). Local linear uses only a window around $c$ and a specification that is accurate in that window. If the researcher wants a global picture, plot the data; do not let a cubic do the identification.
:::
:::

::: exercise McCrary logic {level=2}
The running variable is an exam score. The histogram shows a hole at $69$ and a spike at $70$. What does this suggest, and what does it do to [[#thm-srd]]?
::: solution
Teachers or students are rounding (or retaking) so that marginal fails become $70$. Units just above $c$ are a selected subset of the would-be $69$s — perhaps the ones with better unobservables, or the ones with more assertive parents. Continuity of $\E[Y(d) \mid R]$ at $c$ is then false, because the composition of units jumps. [[#thm-srd]] does not apply. A density test would reject; the honest report is that the cutoff is manipulated.
:::
:::

::: exercise Bandwidth bias-variance {level=2}
In [[#ex-rdd-sim]] the true $\tau$ is $5$ and the DGP is linear on each side. Why, even so, does the standard error rise from $0.31$ (full sample) to $0.64$ ($|R|<0.25$), and when would the *point* estimate get *worse* as $h$ grows?
::: solution
Smaller $h$ means fewer observations, so $\Var(\hat\tau)$ rises — here from $0.31$ to $0.64$ — even though bias is zero in this linear DGP. If $\E[Y(d) \mid R]$ were *curved*, a large $h$ would fit the wrong slope and mis-extrapolate to $c$, biasing $\hat\tau$. That is the bias–variance trade-off CCT bandwidths are built for: in curved DGPs, the MSE-optimal $h$ is not the largest $h$.
:::
:::

::: exercise Local randomisation {level=3}
Suppose $R_i = r_i^* + \eps_i$, where $r_i^*$ is a desired score and $\eps_i$ is a small continuous noise (a lucky question, a marking glitch). Argue that, in a small enough window around $c$, $D_i$ is independent of $\bigl(Y_i(1), Y_i(0)\bigr)$ conditional on being in the window. Which of Lee's (2008) plots is the empirical counterpart of this argument?
::: hint
The event $\{R \in (c-h, c+h)\}$ is, for small $h$, almost the event $\{\eps \approx c - r^*\}$, which is a statement about noise, not about $r^*$ or about potential outcomes.
:::
::: solution
For a unit to fall just above rather than just below $c$, the noise $\eps$ must have pushed $r^*+\eps$ across $c$. If $\eps$ is continuously distributed and independent of $(r^*, Y(1), Y(0))$, then among units with $R$ very near $c$, the sign of $R-c$ is a function of $\eps$ and is independent of potential outcomes. That is local randomisation, Lee's interpretation of [[#thm-srd]]. The empirical counterpart is the plot showing that the density of vote share is continuous at $50$ percent, and that pre-determined district characteristics do not jump there: those are statements that $\eps$, not $r^*$, is what decides close elections.
:::
:::

::: exercise Fuzzy RD as 2SLS {level=3}
Write the two local linear regressions (first stage and reduced form) that produce [[#eq-frd]], and show that their ratio equals the coefficient on $\hat D$ in a 2SLS of $Y$ on $D$, $(R-c)$, $D(R-c)$ instrumented by $Z = \mathbf{1}\{R \ge c\}$, $Z(R-c)$ and $(R-c)$, in the same window.
::: solution
Reduced form: $Y = \alpha_y + \pi_y Z + \beta_y (R-c) + \gamma_y Z(R-c) + u$, with $\hat\pi_y \to$ the jump in $\E[Y \mid R]$. First stage: $D = \alpha_d + \pi_d Z + \beta_d (R-c) + \gamma_d Z(R-c) + v$, with $\hat\pi_d \to$ the jump in $\E[D \mid R]$. The Wald ratio $\hat\pi_y/\hat\pi_d$ is [[#eq-frd]]. 2SLS with instruments $(Z, R-c, Z(R-c))$ and endogenous $(D, R-c, D(R-c))$ is algebraically the same ratio, because in a just-identified linear IV the endogenous-coefficient estimate is the ratio of reduced-form to first-stage coefficients on $Z$ (the other instruments partial out the slopes). This is why software that runs `ivreg Y (D D·R R = Z Z·R R)` in a window is running fuzzy RD.
:::
:::

::: exercise A continuity counterexample {level=3}
Let $Y_i(0) = 1\{R_i \ge c\}$ — the untreated outcome *is* the cutoff indicator — and $Y_i(1) = 1$. Treatment is sharp, $D_i = 1\{R_i \ge c\}$. Compute $\tau_{\mathrm{SRD}}$ from [[#eq-srd]] and $\E[Y(1)-Y(0) \mid R=c]$. What failed?
::: solution
Observed $Y_i = D_i \cdot 1 + (1-D_i) \cdot 1\{R_i \ge c\} = 1\{R_i \ge c\}$ on both sides, so $Y$ is $0$ to the left and $1$ to the right, and [[#eq-srd]] says $\tau_{\mathrm{SRD}} = 1$. But $Y(1)-Y(0) = 1 - 1\{R \ge c\}$, which is $0$ to the right of $c$ and $1$ to the left; at $c$ the difference is not well-defined without a convention, and $\E[Y(1)-Y(0) \mid R=c]$ is not equal to $1$ in any useful sense. Continuity of $\E[Y(0) \mid R]$ fails: $Y(0)$ itself jumps at $c$. The example is artificial, but it is the formal version of "something else jumps at the cutoff" — here, the untreated outcome *is* the jump.
:::
:::
