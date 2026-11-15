A minimum wage rises in New Jersey and stays put in Pennsylvania. Fast-food employment is observed in both states, before and after. The **difference-in-differences** (DID) estimator subtracts the Pennsylvania change from the New Jersey change. What remains, if the two states would have followed **parallel trends** in the absence of the rise, is the effect of the New Jersey law on New Jersey restaurants.

Card and Krueger (1994) ran that comparison and found that employment in New Jersey did *not* fall relative to Pennsylvania; it rose a little. The paper is one of the most famous in labour economics and one of the most famous in applied econometrics. It is also a running argument: Neumark and Wascher (2000) found a negative effect in payroll data from a similar sample; Card and Krueger (2000) found a small positive effect again in official administrative counts. Thirty years of subsequent work — border-county designs, stacked event studies, synthetic controls — has not produced a single number that everyone accepts. What it has produced is a much sharper understanding of what DID identifies, when parallel trends is plausible, and how a two-way fixed-effects regression with *staggered* adoption can average treatment effects with negative weights.

This chapter is that understanding. Panel mechanics (first differences, unit and time fixed effects) are in [[econometrics/panel-data]]. The causal content is here.

## The two-by-two design

Two groups, treated $G_i = 1$ and comparison $G_i = 0$; two periods, pre $P_t = 0$ and post $P_t = 1$. Treatment is $D_{it} = G_i P_t$: nobody is treated in the pre-period, and only the treated group is treated in the post-period.

::: definition Two-by-two DID {#def-did}
The **difference-in-differences** estimand is

$$
\tau_{\mathrm{DID}} = \bigl(\E[Y_{it} \mid G_i=1, P_t=1] - \E[Y_{it} \mid G_i=1, P_t=0]\bigr) - \bigl(\E[Y_{it} \mid G_i=0, P_t=1] - \E[Y_{it} \mid G_i=0, P_t=0]\bigr).
$$ {#eq-did}

In a sample it is the corresponding difference of four cell means, and it is also the coefficient $\tau$ in the regression

$$
Y_{it} = \alpha + \gamma G_i + \delta P_t + \tau (G_i P_t) + u_{it}.
$$ {#eq-did-reg}
:::

The first difference in [[#eq-did]] is the treated group's change, which mixes the treatment effect with whatever would have happened anyway. The second difference is the comparison group's change — the stand-in for that "anyway". Subtracting it is the whole design.

::: theorem Parallel trends identifies the ATT {#thm-pt}
Assume SUTVA (no spillovers across groups or periods) and **parallel trends**:

$$
\E\bigl[Y_{it}(0) \mid G_i=1, P_t=1\bigr] - \E\bigl[Y_{it}(0) \mid G_i=1, P_t=0\bigr] = \E\bigl[Y_{it}(0) \mid G_i=0, P_t=1\bigr] - \E\bigl[Y_{it}(0) \mid G_i=0, P_t=0\bigr].
$$ {#eq-pt}

Then $\tau_{\mathrm{DID}} = \tau_{\mathrm{ATT}}$, the average effect of treatment on the treated group in the post-period. No assumption is needed on $Y_{it}(1)$ for the comparison group, who are never treated.
:::

::: proof
Write $\E[Y \mid G=1, P=1] = \E[Y(1) \mid G=1, P=1]$ and the other three cells as $\E[Y(0) \mid \cdot]$. Then

$$
\tau_{\mathrm{DID}} = \E[Y(1)-Y(0) \mid G=1, P=1] + \bigl\{\text{treated $Y(0)$ change} - \text{comparison $Y(0)$ change}\bigr\}.
$$

Parallel trends sets the brace to zero, leaving the ATT. (The treated $Y(0)$ in the post-period is the counterfactual the comparison group's change is used to build.)
:::

Parallel trends is an assumption about *untreated* potential outcomes. It is not testable in the post-period, because $Y(0)$ is missing for the treated. It *is* partially probeable in the pre-period, if more than one pre-period is available: the two groups should have moved in parallel *before* treatment. That is the event-study test below. Passing it does not prove [[#eq-pt]] after treatment — a shock that hits the treated group at the same moment as the policy would not show up pre-trend — but failing it is a serious warning.

::: example Card and Krueger's four cells {#ex-ck94}
Card and Krueger surveyed about 410 fast-food restaurants in New Jersey and eastern Pennsylvania, in February 1992 (before New Jersey's minimum wage rose from \$4.25 to \$5.05 on 1 April 1992) and in November 1992. Full-time-equivalent employment per store was, in their Table 3,

| | February 1992 | November 1992 | Change |
|---|---|---|---|
| New Jersey | $20.44$ | $21.03$ | $+0.59$ |
| Pennsylvania | $23.33$ | $21.17$ | $-2.16$ |

Compute $\hat\tau_{\mathrm{DID}}$. What does parallel trends say, in this table?
::: solution
$\hat\tau_{\mathrm{DID}} = 0.59 - (-2.16) = 2.75$ FTE per store (about $13$ percent of the New Jersey baseline). Under [[#thm-pt]] this is the ATT of the New Jersey rise on New Jersey stores. Parallel trends says that, had New Jersey not raised the wage, its employment would have fallen by about $2.16$ FTE, as Pennsylvania's did. The comparison is not of *levels* — Pennsylvania starts higher — but of *changes*. A sceptic who thinks New Jersey's restaurants were already on a different trajectory (a recession that hit Pennsylvania harder, a demand shock in New Jersey) is doubting [[#eq-pt]], not the arithmetic.

The paper also compared New Jersey stores that were already paying above \$5.05 (less affected) with those that had to raise wages, a second DID that does not use Pennsylvania at all, and found a similar pattern. Neumark and Wascher (2000), using payroll records from a smaller and partly overlapping sample, estimated a *negative* DID of a few percent. Card and Krueger (2000), using BLS ES-202 administrative counts, again found a small positive or zero effect. The dispute is about measurement (telephone survey versus payroll versus universe administrative data) and about which restaurants belong in the sample, not about the DID formula.
:::
:::

::: widget plot
f: 10 + 0.4*x; 12 + 0.4*x + tau*heaviside(x-5)
sliders: tau=3:-2:8
x: 0, 10
y: 8, 24
labels: \text{comparison}; \text{treated}
vlines: 5
caption: Parallel trends: both groups rise with slope $0.4$ until the vertical line (the reform). After it, the treated line jumps by $\tau$. Set $\tau = 0$ to see a pure common trend; set $\tau$ negative to see a falling treated path that still has the same slope as the comparison path before the reform. DID is the post gap minus the pre gap, which here equals $\tau$.
:::

A common trend in *logs* is a different assumption from a common trend in levels. If one group is larger, parallel trends in levels implies diverging percentage changes, and conversely. State the outcome's transformation as part of the design.

::: example Parallel trends in a table {#ex-pt-table}
Two groups, three pre-years. Untreated outcomes (so these *are* $Y(0)$):

| Year | Treated | Comparison |
|---|---|---|
| 1 | 10 | 8 |
| 2 | 12 | 10 |
| 3 | 15 | 13 |

Does [[#eq-pt]] hold in the pre-period? What would you forecast for the treated group's $Y(0)$ in year 4 if the comparison group goes to $16$?
::: solution
Changes in the treated group: $+2$, $+3$. Changes in the comparison group: $+2$, $+3$. Pre-period trends are parallel (the *gap* is constant at $2$). If the comparison group goes to $16$ in year 4, a change of $+3$, parallel trends forecasts treated $Y(0)$ of $15+3 = 18$. A DID using year 3 as pre and year 4 as post would then equal $Y_{4}^{\text{treated}} - 18$.
:::
:::

## The two-way fixed-effects regression

With many periods and a single treatment date, [[#eq-did-reg]] generalises to

$$
Y_{it} = \alpha_i + \lambda_t + \tau D_{it} + u_{it},
$$ {#eq-twfe}

the **two-way fixed-effects** (TWFE) regression. Unit effects $\alpha_i$ absorb all time-invariant confounding (New Jersey is always New Jersey); time effects $\lambda_t$ absorb shocks common to both groups. The coefficient $\tau$ is DID: it compares the within-unit change in treated units with the within-unit change in comparison units, after netting out common time shocks.

::: example A simulated two-by-two {#ex-did-sim}
Fifty treated and fifty comparison units are observed in two periods. The DGP is $Y_{it} = 12 + 3 G_i + 1.5 P_t + 4 G_i P_t + u_{it}$ with $u_{it} \sim N(0, 1.5^2)$, drawn from `numpy.random.default_rng(2024)`. Cell means are: treated pre $15.02$, treated post $20.72$, comparison pre $11.65$, comparison post $13.42$. The DID is $5.70 - 1.76 = 3.94$. OLS of [[#eq-did-reg]] reproduces $\hat\tau = 3.94$ (standard error $0.42$). The true $\tau$ is $4$.
::: solution
The four means recover [[#eq-did]] directly. The regression is algebraically identical to the four-mean formula in the two-by-two case, so it *must* give $3.94$. Sampling error of $0.06$ on a true effect of $4$, with standard error $0.42$, is unremarkable. Reproduce: stack the $200$ observations, form columns $(1, G, P, G\cdot P)$, and compute $\hat\beta = (X^\T X)^{-1} X^\T Y$. Adding unit and time dummies in a two-period panel, with a treatment indicator $D_{it} = G_i P_t$, gives the same $\hat\tau$.
:::
:::

Controls $X_{it}$ can be added to [[#eq-twfe]]. They should be pre-treatment or, if time-varying, not themselves outcomes of treatment (bad controls, again). A time-varying confounder that *breaks* parallel trends cannot always be fixed by putting it on the right-hand side: if the confounder is itself affected by treatment, [[#eq-twfe]] estimates a direct effect; if it is not, but its *trend* differs by group, the control helps only to the extent that the parallel-trends residual, given $X$, is more plausible.

## Event studies

With several pre- and post-periods, replace the single $D_{it}$ by a set of dummies for "relative time" $k = t - t_i^*$ (leads and lags of the treatment date $t_i^*$):

$$
Y_{it} = \alpha_i + \lambda_t + \sum_{k \ne -1} \tau_k \mathbf{1}\{t - t_i^* = k\} + u_{it}.
$$ {#eq-es}

The coefficients $\tau_k$ for $k < 0$ are **pre-trends**; $\tau_{-1}$ is omitted as the reference. Under parallel trends the pre-trend coefficients have mean zero. The $\tau_k$ for $k \ge 0$ are the dynamic ATT at horizon $k$. Plotting them, with confidence intervals, is the standard way to present DID.

::: example An event-study reading {#ex-es-read}
An event-study reports $\hat\tau_k$ for $k = -3,-2,-1,0,1,2$, with $\tau_{-1}$ normalised to $0$: $-0.2, 0.1, 0, 3.8, 4.1, 4.0$, each with a standard error of about $0.6$. Interpret the plot under [[#thm-pt]].
::: solution
Pre-coefficients are all well within a standard error of zero, so there is no obvious pre-trend (with the usual caveat that a quiet pre-trend is not a proof). At $k=0$ the outcome jumps by about $3.8$ and stays there: a one-off, persistent ATT of about $4$, not a growing or fading effect. Under parallel trends this is the dynamic ATT. A static TWFE that pooled $k=0,1,2$ would report a similar number, which is the right situation for TWFE — a single treatment date, a stable effect, a clean pre-period.
:::
:::

::: warning A quiet pre-trend is not a proof
A failure to reject $\tau_k = 0$ for $k < 0$ can mean parallel trends, or it can mean a short pre-period, a noisy outcome, or a pre-trend too small to detect but large enough to matter post-treatment. Roth (2022) shows that conditioning on a "passed" pre-trend test distorts subsequent inference. Report the pre-trend coefficients and their intervals; do not treat "insignificant pre-trends" as a green light that replaces an economic argument for [[#eq-pt]].
:::

**Ashenfelter's dip** is a pre-trend of a particular kind: treated units' outcomes fall just before enrolment (people take training after a job loss). A DID that uses the immediate pre-period as the baseline then overstates the ATT, because part of the subsequent rise is mean reversion. Using a longer pre-period, or matching on the dip, is the usual response.

## Staggered adoption and negative weights

Most modern DID applications are not two-by-two. States adopt a law in different years; schools get a programme in waves. The regression people run is still [[#eq-twfe]], with $D_{it} = 1$ after unit $i$'s adoption date. Goodman-Bacon (2021) showed that the TWFE coefficient is a weighted average of *every* two-by-two DID in the panel: early-treated versus never-treated, late-treated versus never-treated, and — this is the problem — late-treated versus already-treated, with the already-treated serving as comparison units.

::: proposition Goodman-Bacon decomposition {#prop-gb}
In a staggered-adoption design with $D_{it} \in \{0,1\}$ absorbing, the TWFE coefficient $\hat\tau_{\mathrm{TWFE}}$ is a weighted average of all two-group, two-period DID estimators that compare one timing group to another. The weights are non-negative and sum to one, but they use **already-treated** units as comparisons for **later-treated** units. If treatment effects *change over time*, those 2×2s are biased for any ATT, and some implicit weights on the group-time effects can be **negative** (Borusyak, Jaravel and Spiess 2024; de Chaisemartin and D'Haultfœuille 2020).
:::

The intuition for negative weights: already-treated units have $D_{it}=1$ in both the "pre" and "post" of a late-versus-early comparison, so their treatment effect is *differenced out of the comparison* and then, because TWFE demeans, can enter $\hat\tau$ with a minus sign. A large, growing treatment effect on the early group can drag $\hat\tau_{\mathrm{TWFE}}$ towards zero or through zero, even if every genuine ATT is positive.

The remedies, now standard, are estimators that only use **not-yet-treated** or **never-treated** units as comparisons, and that estimate a family of group-time ATTs rather than a single $\tau$: Callaway and Sant'Anna (2021), Sun and Abraham (2021), de Chaisemartin and D'Haultfœuille (2020), Borusyak, Jaravel and Spiess (2024). An event-study plot built from those estimators, rather than from [[#eq-es]] with TWFE, is the current default when adoption is staggered.

::: quiz
A state adopts a law in 2005, another in 2015, and a third never does. TWFE of $Y$ on unit effects, year effects and a post-adoption dummy. Which comparison is the one that can produce negative weights?
- [ ] 2005 adopters versus never-treated, around 2005
- [ ] 2015 adopters versus never-treated, around 2015
- [x] 2015 adopters versus 2005 adopters, around 2015, with the 2005 adopters already treated
- [ ] Never-treated versus never-treated
::: solution
The first two comparisons are clean 2×2s against a never-treated group. The third uses already-treated units as controls; if their treatment effect is still evolving in 2015, that evolution is subtracted from the 2015 adopters' change and can contribute a negative weight to TWFE. Never-versus-never is not a DID.
:::
:::

## Inference

Bertrand, Duflo and Mullainathan (2004) showed that conventional standard errors in DID, with serially correlated $Y_{it}$ and a treatment that switches once and stays on, over-reject badly. The standard response is to **cluster** at the level of the treatment assignment — states, if a state law is the treatment (see [[econometrics/heteroskedasticity]]). With few clusters (New Jersey versus Pennsylvania is two), cluster-robust standard errors are themselves unreliable; wild cluster bootstrap (Cameron, Gelbach and Miller 2008) or randomisation inference (permute treatment among units) is more honest. Card and Krueger's original paper reported robust standard errors around $1.3$ on the $2.75$ estimate, so a $t$ of about $2$; the inference, as well as the point, has been part of the argument.

## Evidence, beyond New Jersey

DID is the workhorse of applied microeconomics. Autor (2003) used DID across states and years to study the effect of employment-protection exceptions on temporary-help employment. Duflo (2001) used a school-construction programme in Indonesia that rolled out by region and cohort — a DID in two ages — to estimate returns to schooling of about $7$ percent. Many minimum-wage studies after Card and Krueger use bordering counties (Dube, Lester and Reich 2010 find near-zero employment effects in restaurants) or stacked state-level event studies (Cengiz, Dube, Lindner and Zipperer 2019 find that jobs below the new minimum disappear and are roughly replaced just above it, with little change in total employment). Neumark and Shirley (2022) read the same literature as showing negative employment effects for low-skilled workers more often than not. The disagreement is now about *which* DID — which comparison group, which specification, which sample of workers — is the one parallel trends applies to, not about whether one should run a DID at all.

Outside the United States: the introduction of a national minimum wage in the United Kingdom in 1999 was studied with DID against regions and firms less affected (Stewart 2004; several subsequent papers), generally finding small employment effects at the levels then chosen. India's NREGA rural-work programme, rolled out by district, has a large DID literature with estimates that vary by specification and by whether one uses not-yet-treated districts as controls — a staggered-adoption setting where [[#prop-gb]] applies directly.

::: application Taxes, environment, health
A fuel-tax rise in one region, a smoking ban, a hospital-payment reform: each is a candidate DID. The comparison group is the intellectual step. Neighbouring regions (spillovers, SUTVA), regions that almost passed the same law (similar politics, more parallel trends?), or a synthetic control ([[causal-inference/synthetic-control]]) are three options, and they need not agree. Pre-trends, a placebo reform date, and a placebo outcome that the law should not affect are the minimum report.
:::

::: history
**1978, Orley Ashenfelter.** "Estimating the Effect of Training Programs on Earnings" (*REStat*) documented the pre-programme dip in trainees' earnings and the bias it causes in before–after comparisons — the ancestor of the pre-trend discussion.

**1994, David Card and Alan Krueger.** "Minimum Wages and Employment: A Case Study of the Fast-Food Industry in New Jersey and Pennsylvania" (*AER*) is the textbook two-by-two. The finding — a $2.75$ FTE *increase* in New Jersey relative to Pennsylvania — contradicted the simple competitive model's prediction and launched a literature that is still active. Neumark and Wascher (2000) and Card and Krueger (2000) are the first round of the data argument.

**2004, Marianne Bertrand, Esther Duflo and Sendhil Mullainathan.** "How Much Should We Trust Differences-in-Differences Estimates?" (*QJE*) showed that serial correlation makes conventional DID standard errors far too small, and made clustering (or collapsing to pre/post means) standard.

**2020–2021, the staggered-adoption papers.** de Chaisemartin and D'Haultfœuille (2020), Goodman-Bacon (2021), Callaway and Sant'Anna (2021), Sun and Abraham (2021) and Borusyak, Jaravel and Spiess (2024) mapped the TWFE estimand in staggered designs and offered replacements that use only clean comparisons.
:::

## Where this leads

When there is one treated unit rather than a group, DID against an average of controls is often dominated by a weighted average that matches the treated unit's pre-path: [[causal-inference/synthetic-control]]. When treatment is assigned by a cutoff rather than a date, [[causal-inference/regression-discontinuity]] is the more natural local comparison. The minimum-wage debate continues in [[labour-economics/labour-market-equilibrium]]; this chapter has been about the design, not the labour-demand elasticity.

::: summary
- Two-by-two DID is the difference of two changes ([[#def-did]]). Under parallel trends in $Y(0)$ it equals the ATT ([[#thm-pt]]). It is not a comparison of levels.
- The identifying assumption is about untreated potential outcomes. Pre-trends can fail it; they cannot prove it. Ashenfelter's dip is a pre-trend that biases a short DID up.
- TWFE with a single treatment date is DID. TWFE with staggered dates is a weighted average of many 2×2s, some of which use already-treated units as controls and can attach negative weights to group-time effects ([[#prop-gb]]). Use an estimator built from clean comparisons.
- Cluster standard errors at the assignment level; with few clusters, bootstrap or randomise.
- Card and Krueger (1994) found a DID of $+2.75$ FTE; the subsequent literature still disagrees about the sign of minimum-wage employment effects, in part because different DID designs embody different parallel-trends claims.
:::

## Exercises

::: exercise Four-cell DID {level=1 check="10"}
Treated means: pre $100$, post $130$. Comparison means: pre $90$, post $110$. What is $\hat\tau_{\mathrm{DID}}$? (Enter the integer.)
::: solution
$(130-100) - (110-90) = 30 - 20 = 10$.
:::
:::

::: exercise Read Card–Krueger {level=1 check="2.75"}
Using the four means in [[#ex-ck94]], compute $\hat\tau_{\mathrm{DID}}$. (Enter two decimal places.)
::: solution
$(21.03-20.44) - (21.17-23.33) = 0.59 - (-2.16) = 2.75$.
:::
:::

::: exercise Counterfactual {level=1 check="18.28"}
In [[#ex-ck94]], under parallel trends, what would New Jersey's November employment have been without the law? (Enter two decimal places.)
::: solution
February New Jersey plus the Pennsylvania change: $20.44 + (21.17 - 23.33) = 20.44 - 2.16 = 18.28$. The DID of $2.75$ is $21.03 - 18.28$.
:::
:::

::: exercise Logs versus levels {level=2}
Group A's untreated outcome goes from $100$ to $110$; group B's from $50$ to $55$. Are trends parallel in levels? In logs? Which assumption is the more natural if $Y$ is employment and B is a smaller labour market?
::: solution
Levels: A rises by $10$, B by $5$ — not parallel. Logs: both rise by $\ln 1.1 \approx 0.095$ — parallel in logs (a common 10 percent trend). If $Y$ is employment and B is half the size of A, a common *percentage* shock (a national demand shift) is the more natural parallel-trends claim, so the regression belongs in logs. A common *absolute* shock (a plant of a fixed size closing) would be parallel trends in levels. The choice is economic, not cosmetic: DID in levels and DID in logs answer different questions and can disagree in sign when groups start far apart.
:::
:::

::: exercise Regression equivalence {level=2}
Show that in the two-by-two design the OLS coefficient on $G_i P_t$ in [[#eq-did-reg]] equals the four-mean DID [[#eq-did]]. (You may use dummy-variable regression or the Frisch–Waugh–Lovell theorem.)
::: solution
The regressors $(1, G, P, GP)$ are the four cell indicators (up to a linear transformation): the intercept is the $G=0,P=0$ mean, $G$ is the extra for $G=1,P=0$, $P$ is the extra for $G=0,P=1$, and $GP$ is the extra for $G=1,P=1$ beyond those. OLS cell means are the four sample means, so $\hat\tau = (\bar Y_{11} - \bar Y_{10}) - (\bar Y_{01} - \bar Y_{00})$, which is [[#eq-did]].
:::
:::

::: exercise A failed pre-trend {level=2}
An event-study plot shows $\hat\tau_{-2} = -3$, $\hat\tau_{-1} = 0$ (the reference), $\hat\tau_{0} = 1$, $\hat\tau_{1} = 2$, with standard errors of about $0.5$. Is parallel trends plausible? How might you report the ATT?
::: solution
A pre-trend of $-3$ (six standard errors) is a failure, not a quibble: the treated group was already falling relative to the comparison group. The post coefficients $1$ and $2$ could easily be the continuation of that decline *plus* a treatment effect of $4$ or $5$, or a mean-reversion. Do not report $\hat\tau_0$ as the ATT. Options: choose a different comparison group; match on pre-trends; estimate a linear pre-trend and extrapolate (an extra assumption); or bound the ATT under a limit on how much the trend can change (Rambachan and Roth 2023). Hiding the pre-trend and reporting a static TWFE of $1.5$ would be the wrong option.
:::
:::

::: exercise Negative weights, a tiny panel {level=3}
Three units, three periods. Unit A is treated in periods 2 and 3; unit B is treated in period 3 only; unit C is never treated. True effects: A's effect is $0$ in period 2 and $10$ in period 3 (growing); B's effect is $2$ in period 3. All $Y(0)$ are $0$. Compute the three clean 2×2 ATTs (A vs C around period 2; B vs C around period 3; A vs C around period 3). Explain why a TWFE regression that also uses A as a comparison for B around period 3 is at risk of a strange $\hat\tau$.
::: hint
B versus already-treated A, around period 3: A's outcome jumps from $0$ (period 2) to $10$ (period 3) while treated throughout, so A's *change* is $10$ of treatment dynamics, not of $Y(0)$.
:::
::: solution
A vs C around period 2: A goes $0 \to 0$ (effect $0$ in period 2), C stays $0$, DID $= 0$. B vs C around period 3: B goes $0 \to 2$, C stays $0$, DID $= 2$. A vs C around period 3: A goes $0 \to 10$, DID $= 10$. All genuine effects are non-negative. Now B vs A around period 3, treating A's period-2-to-3 change as the comparison: B's change is $2$, A's change is $10$, DID $= 2-10 = -8$. TWFE mixes this $-8$ with the clean 2×2s. If that comparison gets enough weight, $\hat\tau_{\mathrm{TWFE}}$ can be far below any ATT, even negative. This is [[#prop-gb]] in a three-by-three table. A Callaway–Sant'Anna estimator would keep only the comparisons against C (and, for B, against not-yet-treated units) and would not use A-as-control in period 3.
:::
:::

::: exercise Clustering {level=3}
A DID is run on $50{,}000$ workers in $10$ states, half of which adopt a law. The outcome is individual earnings. At what level should standard errors be clustered, and what goes wrong if they are clustered at the worker, or not clustered at all?
::: solution
Treatment is assigned at the state level, and $u_{it}$ is almost certainly correlated within states (common shocks, a common labour market). Cluster at the state. Worker-level (or iid) standard errors treat $50{,}000$ as the information count; the effective count is closer to $10$ clusters. Bertrand, Duflo and Mullainathan (2004) showed that this over-rejection is severe when treatment is a once-and-for-all switch. With $10$ clusters the cluster-robust variance is itself noisy; a wild cluster bootstrap, or collapsing to a $10 \times T$ panel of state means, is more trustworthy than a default cluster on $50{,}000$ rows.
:::
:::

::: exercise Derive parallel trends from a two-way model {level=3}
Suppose $Y_{it}(0) = \alpha_i + \lambda_t + \eps_{it}$ with $\E[\eps_{it} \mid G_i, t] = 0$. Show that [[#eq-pt]] holds. What violation of this additive model produces a pre-trend?
::: solution
$\E[Y_{it}(0) \mid G=1, t] = \E[\alpha_i \mid G=1] + \lambda_t$, so the treated group's $Y(0)$ change between $t$ and $s$ is $\lambda_t - \lambda_s$, the same as the comparison group's. That is [[#eq-pt]]. A pre-trend appears if the treated group's $\alpha_i$ is not additive — for example if $\alpha_i$ multiplies a time-varying factor (a unit-specific trend $\alpha_i \cdot t$), or if $\E[\eps_{it} \mid G=1]$ moves before treatment (Ashenfelter's dip). Group-specific linear trends can be added to [[#eq-twfe]] as a robustness check; they also absorb some of the treatment path if the post-period is short, which is a bias–variance choice.
:::
:::
