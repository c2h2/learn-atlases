California passed Proposition 99 in 1988, a large tobacco-control programme: a tax increase, anti-smoking campaigns, and restrictions on smoking in public. Cigarette sales in California fell. They were also falling in the rest of the United States. How much of California's fall was the proposition, and how much was a national trend that California would have shared anyway?

A DID against the average of the other $38$ states with complete data treats those states as equally good comparisons. They are not: some were closing on California's pre-1988 path, some were not. **Synthetic control** (Abadie and Gardeazabal 2003; Abadie, Diamond and Hainmueller 2010) builds a comparison as a *weighted average* of donor states, with weights chosen so that the synthetic California matches California's pre-1988 sales (and predictors of sales) as closely as possible. Abadie, Diamond and Hainmueller estimated that by 2000, annual per-capita cigarette sales in California were about $26$ packs lower than in this synthetic twin. Placebo tests — applying the same procedure to states that did *not* pass a Proposition 99 — found few gaps as large.

The method is DID with a data-driven comparison group, for the case of one (or a few) treated units and a donor pool of potential controls. It has become the standard tool for comparative case studies: a region, a country, a reform that happens once.

## The estimator

One treated unit, $i=1$, observed in periods $t = 1,\dots,T$, with treatment starting at $T_0+1$. A **donor pool** of $J$ untreated units, $i=2,\dots,J+1$. Outcomes $Y_{it}$. Pre-treatment predictors $X_i$ (which may include pre-treatment outcomes).

::: definition Synthetic control {#def-sc}
A **synthetic control** is a weight vector $W = (w_2,\dots,w_{J+1})'$ with $w_j \ge 0$ and $\sum_{j=2}^{J+1} w_j = 1$. The synthetic outcome is $\hat Y_{1t}^N = \sum_{j=2}^{J+1} w_j Y_{jt}$. The weights minimise a distance between the treated unit and the synthetic unit in pre-treatment predictors,

$$
W^* = \arg\min_{W \in \Delta} \lVert X_1 - X_0 W \rVert_V,
$$ {#eq-sc-w}

where $X_0$ is the matrix of donors' predictors, $\Delta$ is the simplex, and $V$ is a positive-definite matrix that weights the coordinates of $X$ (often chosen so that the pre-treatment *outcome path* is matched well). The estimated effect in period $t > T_0$ is

$$
\hat\tau_{1t} = Y_{1t} - \hat Y_{1t}^N.
$$
:::

The non-negativity and adding-up constraints are essential. They make the synthetic unit an interpolation, not an extrapolation: $\hat Y_{1t}^N$ lies between the donors' outcomes, and the weights have the interpretation "California as $0.34$ Utah $+ 0.25$ Nevada $+ \cdots$". Unrestricted regression of $Y_{1t}$ on donors' $Y_{jt}$ in the pre-period can put negative weights on some donors (a "California" that is long Utah and short Kentucky), which is harder to defend as a counterfactual.

::: proposition When a synthetic control recovers $Y_{1t}(0)$ {#prop-sc}
Suppose untreated outcomes follow a linear factor model $Y_{it}(0) = \delta_t + \theta_t' Z_i + \lambda_t' \mu_i + \eps_{it}$, with transitory $\eps_{it}$. If there exist weights $W$ in the simplex such that the treated unit's pre-treatment outcomes and covariates are perfectly matched, then, as the number of pre-periods grows, $\hat Y_{1t}^N \approx Y_{1t}(0)$ in post-periods, and $\hat\tau_{1t}$ is close to the treatment effect on the treated unit. (Abadie, Diamond and Hainmueller 2010, Theorem 1, under conditions on the factor model and on $\eps$.)
:::

::: proof
Sketch. Perfect pre-treatment match on a long outcome path forces the weighted donors to share the treated unit's factor loadings $\mu_1$ (and $Z_1$). In the post-period the common factors $\lambda_t$ then cancel, leaving $\hat\tau_{1t} \approx \tau_{1t} + $ a combination of $\eps$ that averages out when $T_0$ is large. The simplex constraint prevents the match from being achieved by cancelling large errors of opposite sign. If no combination of donors can match the treated unit, the theorem does not apply: a large pre-treatment **mean squared prediction error** (MSPE) is a warning, not a number to ignore.
:::

The method therefore needs (i) a donor pool of units that *could* have produced the treated path, (ii) a long enough pre-period to make a demanding match, and (iii) no anticipation, so that pre-period $Y$ is really $Y(0)$. Donors that adopted a similar reform, or that were affected by spillovers from the treated unit, do not belong in the pool.

::: example A three-donor toy {#ex-synth-toy}
A treated unit is, in the five pre-periods, exactly $0.6$ of donor A plus $0.4$ of donor B:

| $t$ | A | B | C | Treated |
|---|---|---|---|---|
| 1 | 80 | 70 | 90 | 76 |
| 2 | 82 | 71 | 88 | 77.6 |
| 3 | 81 | 73 | 95 | 77.8 |
| 4 | 83 | 72 | 85 | 78.6 |
| 5 | 84 | 74 | 92 | 80 |

Donor C is a noisy decoy. After treatment, the treated series is $12$ packs (say) *below* $0.6\mathrm{A}+0.4\mathrm{B}$. A grid search over the simplex (steps of $0.05$) recovers $W^* = (0.6, 0.4, 0)$ with pre-MSPE of essentially zero, and a post-treatment gap of $-12$ in every period.
::: solution
The pre-period match is unique in this construction, so any procedure that minimises pre-MSPE subject to $w_j \ge 0$, $\sum w_j = 1$ finds $(0.6, 0.4, 0)$ and puts zero on C. The post-period synthetic is $0.6\mathrm{A}+0.4\mathrm{B}$; the gap is the treatment effect by construction. In a real application the match is never exact, C might steal a little weight, and the gap is an estimate. The toy is the ideal case [[#prop-sc]] describes: a treated unit in the convex hull of the donors, matched on a long pre-path.
:::
:::

::: widget plot
f: 80 - 0.4*x; 80 - 0.4*x - 12*heaviside(x-5)
x: 0, 10
y: 50, 85
labels: \text{synthetic}; \text{treated}
vlines: 5
caption: Ideal synthetic control: the two series coincide until the reform (vertical line) and then diverge. In an application you should see this picture in the *pre*-period (a tight match) before you trust the post-period gap. If the pre-period already wanders, the method has not found a twin.
:::

(The slider is omitted on purpose: the figure is a picture of a good match, not a parameter to tune. In software the tuning is $V$ and the donor pool.)

## Inference without a large $N$

With one treated unit, conventional standard errors are not available. Abadie, Diamond and Hainmueller's answer is **placebo inference**.

::: definition Placebo tests in space and time {#def-placebo}
**In space.** Apply the same synthetic-control procedure to every donor, pretending it was treated at $T_0$. Rank the treated unit's post/pre MSPE *ratio* among the placebo ratios. The $p$-value is the fraction of placebos with a ratio at least as large. (A large post gap is impressive only if the pre-fit was good; the ratio penalises donors that never fitted.)

**In time.** Move the treatment date back into the pre-period (a fake reform) and check that $\hat\tau$ is near zero until the real $T_0$. Anticipation, or a poor match, shows up as a fake effect.
:::

In the Proposition 99 study, California's post/pre MSPE ratio was extreme relative to the placebos (the authors report a ratio on the order of a hundred, and a placebo $p$-value of about $0.03$ among the states with a reasonable pre-fit). That is the sense in which the $26$-pack gap is "significant". It is a permutation test, not a sampling-theory standard error, and it has the usual limitation of permutation tests: it treats the donor pool as the universe.

Firpo and Possebom (2018) and Abadie and L'Hour (2021) refine the inference. With *several* treated units, one can also return to clustered DID or to the **synthetic difference-in-differences** estimator of Arkhangelsky, Athey, Hirshberg, Imbens and Wager (2021), which combines synthetic-control weights on units with a DID-style time reweighting, and comes with a more standard large-sample theory.

## Design choices that matter

**Donor pool.** Exclude units that adopted a similar treatment, units affected by spillovers, and units whose outcome scale is alien (matching California to a tiny state on *per-capita* sales is reasonable; matching on total sales is not). A pool that is too large, with many irrelevant donors, makes the pre-period match easier in-sample and worse out of sample; Abadie, Diamond and Hainmueller (2015) recommend a small, reasoned pool.

**What to match on.** Matching only on the last pre-period $Y$ is under-demanding; matching on every pre-period $Y$ can overfit. A common compromise is to match on several pre-period averages of $Y$ and on covariates that predict $Y$ (prices, income, demographics). The $V$ matrix can be chosen by cross-validation in the pre-period.

**Interpolation, not extrapolation.** If the treated unit is outside the convex hull of the donors — richer than every donor, or on a unique trend — no $W \in \Delta$ will match, pre-MSPE will be large, and the method should be abandoned for this treated unit. That is a feature. DID against the donor average would still run, and would be wrong in the same cases, quietly.

**Nested in DID.** If the optimal weights happen to be uniform, synthetic control *is* DID against the donor mean. If they concentrate on a few neighbours, it is DID against those neighbours. Reporting $W^*$ is part of the result: "synthetic California is 34 percent Utah, 25 percent Nevada, 20 percent Montana, 11 percent Connecticut, …" (the mix in the published Proposition 99 paper is of this form) is a sentence a reader can argue with.

::: example Reading weights {#ex-weights}
A synthetic California has weights $0.40$ on Utah, $0.30$ on Nevada, $0.20$ on Montana, $0.10$ on Connecticut, and $0$ on everyone else. In $2000$, per-capita sales are $40$ packs in California, $70$ in Utah, $65$ in Nevada, $80$ in Montana, $55$ in Connecticut. What is $\hat Y_{1,2000}^N$ and $\hat\tau$?
::: solution
$\hat Y^N = 0.40\cdot 70 + 0.30\cdot 65 + 0.20\cdot 80 + 0.10\cdot 55 = 28 + 19.5 + 16 + 5.5 = 69$. Then $\hat\tau = 40 - 69 = -29$ packs. The weights are the result: a reader who thinks Connecticut does not belong can drop it and re-estimate; a reader who thinks the $69$ is a reasonable twin of California's *pre*-path is ready to interpret $-29$.
:::
:::

::: example A failed match {#ex-failed-match}
The treated unit's pre-period path is $(10, 20, 30, 40)$. Every donor is roughly constant (values between $8$ and $12$). Can a synthetic control in the simplex match the treated path? What should you do?
::: solution
No convex combination of constants can track a line that rises from $10$ to $40$. Pre-MSPE will be large no matter what $V$ you pick. [[#prop-sc]] does not apply. Options: find a different donor pool (units that were also growing); transform the outcome (match on *growth rates*); or abandon synthetic control for this case. DID against the donor mean would also be wrong — the treated unit is on a different trend — but it would not announce the failure as loudly.
:::
:::

::: example Placebo in time {#ex-time-placebo}
Proposition 99 passed in 1988. A researcher reruns the procedure with a fake treatment date of 1980, using 1970–1979 as the pre-period. Synthetic and actual California track until 1980 and then diverge by $15$ packs through 1988. What does this do to the 1988–2000 headline?
::: solution
The fake reform produces a large gap *before* the real reform, so either the match on 1970–79 does not extend (the factor loadings are not stable) or something else hit California around 1980. In either case the 1988 gap is not cleanly the effect of Proposition 99. A convincing time-placebo would show a near-zero gap from 1980 to 1988 and a gap only after 1988. Abadie, Diamond and Hainmueller's published figure is much closer to that second picture; this exercise is the picture that would have undermined it.
:::
:::

::: warning Cherry-picking the pool
The donor pool, the predictors, and the pre-period length are researcher choices. Each can be used to make $\hat\tau$ large. The discipline the method provides — a visible $W^*$, a visible pre-fit, placebo $p$-values — is only as good as the specification that was *pre-stated*. Running twenty donor pools and reporting the one where California looks extreme is the same sin as running twenty DID specifications. A pre-analysis plan, or at least a specification that is the obvious one (all untreated states with complete data, all pre-years, standard covariates), should be the headline; alternatives belong in an appendix.
:::

::: quiz
A synthetic-control graph shows a large post-treatment gap, but the treated series and the synthetic series already diverge in the three years before the reform. The right conclusion is
- [ ] the effect began early, so the gap is a lower bound
- [x] the match failed; $\hat\tau$ is not identified by [[#prop-sc]], and a placebo-in-time would probably also fail
- [ ] weights should be allowed to be negative, to force a pre-match
- [ ] the gap is still valid because post-MSPE is large
::: solution
[[#prop-sc]] requires a match on the pre-path. A pre-divergence means the synthetic unit is not a twin; the post-gap mixes treatment with whatever the failed match missed. Negative weights would force a numerical match by extrapolation, which the simplex is there to prevent. Large post-MSPE is interesting only conditional on small pre-MSPE.
:::
:::

## Evidence

**Basque Country (Abadie and Gardeazabal 2003).** The original synthetic-control paper. Terrorism in the Basque Country in the late 1960s–70s is the treatment; other Spanish regions are the donors. Synthetic Basque Country (a combination of regions that matched Basque GDP per capita and industry mix before terrorism) lies about $10$ percent above actual Basque GDP per capita by the 1990s. The paper is both an estimate of the economic cost of conflict and the introduction of the method.

**California Proposition 99 (Abadie, Diamond and Hainmueller 2010).** Discussed above: about $26$ packs per capita by 2000, a gap that is extreme in the placebo distribution. Criticisms: other states adopted tobacco control later (so the donor pool "contaminates" over time); cigarette smuggling across state lines (SUTVA); the result is for *sales in California*, not for smoking by Californians. None of these is fatal — they are the usual comparative-case-study caveats, now attached to a more transparent counterfactual.

**Subsequent applications** are numerous: German reunification (Abadie, Diamond and Hainmueller 2015), the Brexit vote, state-level health and minimum-wage reforms, the effect of a natural disaster on a region's GDP. Quality varies with the pre-fit and with the honesty of the donor pool. A useful consumer's question: if I cover the post-period with my hand, would I have picked this synthetic unit as a twin?

**Synthetic DID (Arkhangelsky et al. 2021).** When several units are treated and a panel is reasonably large, SDID reweights both units (as in synthetic control) and time periods (as in a two-way DID), then runs a DID on the reweighted panel. It often has smaller error than either synthetic control or TWFE, and it comes with an asymptotic variance. For the one-treated-unit case, classical synthetic control remains the transparent choice.

::: application Comparative case studies in development and history
A country liberalises, a city hosts an Olympics, a region is occupied. The sample is $N=1$ treated. Synthetic control is the method that refuses to pretend there are $50$ independent treated units. It also refuses, via the simplex, to invent a counterfactual outside the observed range of donors. In economic history, where the treated unit is often unique (a revolution, a border change), that honesty is worth as much as the point estimate. The method does not solve external validity: the effect on California's cigarettes is the effect on California's cigarettes.
:::

::: history
**2003, Alberto Abadie and Javier Gardeazabal.** "The Economic Costs of Conflict: A Case Study of the Basque Country" (*AER*) introduced synthetic control as a weighted comparative case study and estimated a 10 percent GDP-per-capita gap.

**2010, Alberto Abadie, Alexis Diamond and Jens Hainmueller.** "Synthetic Control Methods for Comparative Case Studies: Estimating the Effect of California’s Tobacco Control Program" (*JASA*) gave the factor-model rationale, the placebo-inference procedure, and the Proposition 99 estimate of about $26$ packs. Companion software (`Synth` in R and Stata) made the method widely usable.

**2021, Dmitry Arkhangelsky, Susan Athey, David Hirshberg, Guido Imbens and Stefan Wager.** "Synthetic Difference-in-Differences" (*AER*) nested synthetic control and DID in a single estimator with large-sample inference, now a standard robustness check whenever the panel can support it.
:::

## Where this leads

Synthetic control is a sibling of [[causal-inference/difference-in-differences]]: both subtract a comparison path, and both need a version of parallel trends — here, parallel trends between the treated unit and a *weighted* combination of donors that has been forced to match pre-treatment. When many units are treated at different dates, the staggered-DID estimators of the previous chapter are usually more appropriate. When a cutoff, rather than a date, assigns treatment, [[causal-inference/regression-discontinuity]] is the local comparison. The last chapter of the course, [[causal-inference/external-validity]], asks what one does with a $26$-pack estimate if the next state considering a tobacco law is not California.

::: summary
- A synthetic control is a convex combination of donors that matches the treated unit's pre-treatment path and covariates ([[#def-sc]]). The post-period gap is the estimated effect on that unit.
- The method is justified by a factor model plus a good match on a long pre-period ([[#prop-sc]]). A bad pre-fit means the method has not found a counterfactual.
- Inference is by placebo tests in space (MSPE ratios) and time (fake reform dates) ([[#def-placebo]]), not by clustered standard errors.
- Weights must be non-negative and sum to one; report them. A treated unit outside the convex hull of donors is a reason to stop, not a reason to allow negative weights.
- Abadie, Diamond and Hainmueller (2010) estimated that Proposition 99 reduced California cigarette sales by about $26$ packs per capita by 2000 relative to a synthetic California. Abadie and Gardeazabal (2003) estimated a 10 percent Basque GDP-per-capita gap from terrorism. Both estimates are only as good as their pre-fits and their donor pools.
:::

## Exercises

::: exercise Read a gap {level=1 check="-12"}
In [[#ex-synth-toy]], what is $\hat\tau_{1t}$ in each post-period? (Enter the integer, with a minus sign.)
::: solution
The treated series is $12$ below the synthetic in every post-period, so $\hat\tau_{1t} = -12$.
:::
:::

::: exercise Simplex {level=1}
Why does [[#def-sc]] forbid $w_j < 0$? Give an economic sentence, not a computational one.
::: solution
A negative weight means the counterfactual is "California plus a short position in Kentucky": an extrapolation outside the range of observed untreated outcomes. If Kentucky's path is unlike California's, the negative weight uses that unlike path *with the opposite sign*, which is not a comparison unit anyone would have written down in a case study. The simplex keeps the synthetic unit inside the convex hull of donors — an interpolation, a weighted average of real places.
:::
:::

::: exercise Uniform weights {level=1}
If $W^*$ is uniform over $J$ donors, what familiar estimator is $\hat\tau_{1t}$?
::: solution
DID against the donor mean: $Y_{1t} - \bar Y_{\text{donors}, t}$, after a pre-period in which that same difference was (approximately) zero. Synthetic control *nests* DID.
:::
:::

::: exercise MSPE ratio {level=2}
A treated unit has pre-MSPE $1$ and post-MSPE $25$. A placebo donor has pre-MSPE $4$ and post-MSPE $36$. Compute both post/pre ratios. Who looks more unusual?
::: solution
Treated: $25/1 = 25$. Placebo: $36/4 = 9$. The treated unit's ratio is larger: its post-gap is large *relative to a tight pre-fit*. The placebo's post-gap is larger in absolute terms ($36$ versus $25$) but it never fitted well. Ranking on the ratio, as [[#def-placebo]] does, is what prevents poorly fitted placebos from looking like "effects".
:::
:::

::: exercise Contaminated donors {level=2}
Two years after California's Proposition 99, another donor state passes a similar law. What does this do to $\hat Y_{1t}^N$ in later years, and what is the practical response?
::: solution
The donor is no longer a $Y(0)$ path; it is a $Y(1)$ path of a similar treatment. If it had positive weight, $\hat Y_{1t}^N$ is pulled *down* (in the cigarette case) and $|\hat\tau_{1t}|$ is biased toward zero. Practical response: drop that donor from the pool (or end the study before its reform). Abadie, Diamond and Hainmueller discuss this contamination; it is the SUTVA/no-interference issue of comparative case studies.
:::
:::

::: exercise Factor-model intuition {level=2}
In the factor model of [[#prop-sc]], why does matching a *long* pre-path of $Y$ pin down the loadings $\mu_1$, and why is matching a single pre-period not enough?
::: solution
Each period is a noisy observation of $\delta_t + \theta_t' Z_1 + \lambda_t' \mu_1$. A single $t$ cannot separate $\mu_1$ from $\eps_{1t}$. A long path, with varying $\lambda_t$, over-identifies $\mu_1$ (as in a factor-model Kalman filter, or as in "the unit that tracked California for twenty years probably shares California's loadings"). Matching one year can be achieved by accident of $\eps$. That is why $T_0$ needs to be large relative to the number of factors.
:::
:::

::: exercise A tiny simplex problem {level=3 check="0.5"}
Treated pre-period averages: $Y = 10$, $X = 4$. Two donors: donor 2 has $(Y, X) = (8, 2)$, donor 3 has $(12, 6)$. Find $w_2$ in the synthetic control that matches both coordinates (and $w_3 = 1-w_2$). (Enter $w_2$ as a decimal.)
::: solution
$w_2 \cdot 8 + (1-w_2)\cdot 12 = 10$ gives $12 - 4 w_2 = 10$, so $4 w_2 = 2$, $w_2 = 0.5$. Check $X$: $0.5\cdot 2 + 0.5\cdot 6 = 4$, matched. The treated unit is the midpoint of the two donors.
:::
:::

::: exercise Placebo $p$-value {level=3 check="0.05"}
A donor pool of $19$ untreated states plus California. California has the largest post/pre MSPE ratio. Under the permutation test of [[#def-placebo]], what is the $p$-value? (Enter a decimal.)
::: solution
$20$ units are each given a chance to be "treated". California is the most extreme, so $p = 1/20 = 0.05$. With a small donor pool the smallest possible $p$ is $1/(J+1)$; "significance at $5$ percent" is impossible with fewer than $19$ donors. This is a reason to treat placebo $p$-values as descriptive ranks, not as a licence to hunt for $0.05$.
:::
:::

::: exercise SDID in one paragraph {level=3}
How does synthetic difference-in-differences (Arkhangelsky et al. 2021) combine the ideas of this chapter and of [[causal-inference/difference-in-differences]], and when would you prefer it to classical synthetic control?
::: solution
SDID chooses non-negative weights on *units* so that the weighted control average matches the treated average of pre-period $Y$ (the synthetic-control idea) and non-negative weights on *time* so that the weighted pre-period matches the post-period on the controls (a DID idea: reweight time to make parallel trends more plausible). It then runs a DID on the twice-reweighted panel. Prefer SDID when several units are treated and $N$ and $T$ are large enough for its asymptotic variance to be meaningful. Prefer classical synthetic control, with reported $W^*$ and placebo graphs, when $N_{\text{treated}} = 1$ and the audience is a case-study audience that wants to know *which* donors did the work.
:::
:::
