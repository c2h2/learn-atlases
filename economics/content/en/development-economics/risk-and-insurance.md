A bad harvest, a sick cow, a hospital bill, a flood: poor households live closer to these shocks than rich ones, and they have fewer formal contracts with which to spread them. Health insurance, crop insurance and unemployment insurance, where they exist, cover a small share of the rural poor. What they have instead is a web of informal arrangements — gifts, state-contingent loans, extra work, selling animals, pulling children out of school — and, more recently, a set of **index insurance** products that pay on rainfall or a satellite greenness index rather than on a household's own loss. This chapter sets out the full-insurance benchmark, the tests that household panels have applied to it since Townsend (1994), the reasons sharing is incomplete, and the promise and the basis risk of index products.

The credit contracts of [[development-economics/credit-and-microfinance]] are part of the same web: an informal loan that shrinks after a bad harvest is insurance. Choice under uncertainty is developed in [[microeconomics/uncertainty]]; here the question is how a *village*, not an individual, allocates risk.

## The full-insurance benchmark

Consider a village of $n$ households, $i = 1, \dots, n$, with Pareto weights $\lambda_i > 0$, period utility $u_i$ strictly increasing and strictly concave, and a common discount factor. In state $s$ with probability $\pi_s$, household $i$ has endowment (or farm income) $y_i(s)$ and consumes $c_i(s)$. An efficient risk-sharing contract maximises $\sum_i \lambda_i \sum_s \pi_s u_i\bigl(c_i(s)\bigr)$ subject to $\sum_i c_i(s) = \sum_i y_i(s)$ in each $s$.

::: definition Full insurance {#def-full}
**Full insurance** (efficient risk sharing, with a complete set of state-contingent transfers) is the allocation in which households' **marginal utilities of consumption are proportional** across states:

$$
\lambda_i u_i'\bigl(c_i(s)\bigr) = \mu(s) \qquad \text{for all } i, s,
$$ {#eq-full}

where $\mu(s)$ is the multiplier on the village resource constraint in state $s$. If households have identical CRRA (or CARA) preferences, [[#eq-full]] says that *individual* consumption moves only with *aggregate* village consumption, not with idiosyncratic income.
:::

::: proposition Townsend's regression {#prop-townsend}
Suppose $u_i(c) = \frac{c^{1-\gamma}}{1-\gamma}$ with a common $\gamma$. Then [[#eq-full]] implies $\ln c_i(s) = \alpha_i + \ln C(s)$, where $C(s) = \sum_j c_j(s)$ (up to a constant). In a panel, the testable regression

$$
\Delta \ln c_{it} = \beta\, \Delta \ln y_{it} + \delta_t + \varepsilon_{it}
$$ {#eq-townsend}

should yield $\beta = 0$ under full insurance, once time dummies $\delta_t$ have absorbed aggregate shocks. A positive $\beta$ is residual exposure to idiosyncratic income.
:::
::: proof
CRRA plus [[#eq-full]] gives $\lambda_i c_i^{-\gamma} = \mu(s)$, so $c_i(s) = \bigl(\lambda_i / \mu(s)\bigr)^{1/\gamma}$. Summing, $C(s) \propto \mu(s)^{-1/\gamma}$, hence $c_i(s) \propto \lambda_i^{1/\gamma} C(s)$ and $\ln c_i = \alpha_i + \ln C$. First-differencing kills $\alpha_i$. Aggregate consumption is absorbed by a time dummy if the village is the economy (or by a village-time dummy in a multi-village panel). Idiosyncratic $y_{it}$ should then have coefficient zero. The test assumes preferences, assumes that the relevant risk-sharing group is the one we have data on, and assumes that $y_{it}$ is not itself a choice (labour supply, cropping) correlated with $\varepsilon_{it}$.
:::

Townsend (1994), using ICRISAT panels from three Indian villages, found $\beta$ small — of the order of 0.1 to 0.3, depending on specification — and interpreted this as *substantial but incomplete* insurance. Subsequent work (Ravallion and Chaudhuri; Ligon; Kazianga and Udry on Burkina Faso; Fafchamps and Lund on the Philippines; Dercon and Krishnan on Ethiopia) has typically found the same qualitative pattern: village and kin networks move a lot of risk, and they do not move all of it. Households remain exposed to idiosyncratic health shocks, to flooding of a particular plot, and to the death of a particular animal.

::: example A two-household village {#ex-two-hh}
Two households, identical $u(c) = \ln c$, equal Pareto weights. Incomes are $(8, 2)$ in the good state and $(4, 2)$ in the bad state, each with probability $1/2$. Compute the full-insurance allocation. Then compute the efficient allocation that keeps each household's *expected* consumption at its autarky mean (pure insurance, no redistribution of means).
::: solution
Aggregate income is $Y_g = 10$ and $Y_b = 6$. Equal weights and log utility imply equal sharing: consumptions $(5, 5)$ in the good state and $(3, 3)$ in the bad. That allocation redistributes: household 1's expected consumption falls from $6$ to $4$, household 2's rises from $2$ to $4$.

Pure insurance uses constant shares of $Y$ equal to shares of expected income. Expected incomes are $6$ and $2$, total $8$, so shares $3/4$ and $1/4$. Then good: $(7.5,\ 2.5)$; bad: $(4.5,\ 1.5)$. Household 1 is smoothed around $6$, household 2 around $2$, and $c_i(s) \propto Y(s)$ in both states, which is [[#eq-full]] for common CRRA. Household 2's autarky income is *already* safe at 2, so being given a share of fluctuating $Y$ actually *adds* risk; a participation constraint would then require a larger share or a side payment. Efficient risk sharing pins down comovement with $Y$; participation pins down the shares.
:::
:::

## Why sharing is incomplete

Several well-developed reasons, not mutually exclusive:

**Hidden income and moral hazard.** If effort on the farm is unobserved, full insurance destroys the incentive to work (the same trade-off as in [[information-economics/moral-hazard]]). Optimal contracts then leave residual exposure — a deductible, a positive $\beta$ in [[#eq-townsend]].

**Limited commitment.** A household that had a good year may refuse to pay up, if the only punishment is exclusion from future sharing. Ligon, Thomas and Worrall (2002) characterise constrained-efficient contracts: they look like a promise-keeping rule, with consumption tilting toward whoever had a recent run of good luck. The prediction is history dependence, which some panels find.

**Locally correlated shocks.** A drought that hits the whole village cannot be shared *inside* the village. Townsend's test nets out $\delta_t$; it is silent on aggregate risk. That is the gap index insurance tries to fill.

**Missing enforcement across villages.** Kin networks that cross villages (Rosenzweig, Stark) do move some long-distance risk, through migration and marriage. They do not complete the market.

::: warning $\beta = 0$ is not the same as "the poor are insured"
A Townsend coefficient near zero says idiosyncratic *income* does not move consumption, given aggregate consumption. It does not say that consumption is smooth — village-level droughts still bite — and it does not say that smoothing is cheap. Selling the plough, or taking a child out of school (the "human-capital buffer" documented by Jacoby and Skoufias, and by Ferreira and Schady in crises), can keep $\Delta \ln c$ small at a large long-run cost. Look at *how* households smooth, not only at whether they do.
:::

::: example A deductible {#ex-deductible}
Incomes are $10$ or $1$ with equal probability, $u(c) = \ln c$. Compute expected utility under autarky, under fair full insurance, and under a contract that yields consumption $6$ in the good state and $3$ in the bad state (a residual deductible).
::: solution
Autarky: $\tfrac12\ln 10 + \tfrac12\ln 1 \approx 1.151$. Fair full insurance consumes the mean $5.5$ for sure: $\ln 5.5 \approx 1.705$. The deductible contract: $\tfrac12\ln 6 + \tfrac12\ln 3 = \tfrac12\ln 18 \approx 1.447$, which sits between autarky and full insurance. The residual gap of $2.5$ relative to $5.5$ in the bad state is the wedge left by moral hazard, limited commitment, or basis risk — whichever constraint is binding.
:::
:::

::: example Reading $\hat\beta$ {#ex-beta}
A village panel gives $\hat\beta = 0.20$ (standard error 0.04) in [[#eq-townsend]]. A household's farm income falls 30 percent in a year when village mean consumption is unchanged. What is the predicted fall in that household's consumption, and what does the standard error tell you?
::: solution
Predicted $\Delta \ln c = 0.20 \times (-0.30) = -0.06$, about a 6 percent drop. The estimate is five standard errors from the full-insurance value $0$, and also far from autarky ($\beta = 1$). Residual exposure is statistically and economically present, and it is much smaller than one-for-one pass-through.
:::
:::

## Index insurance

A contract that pays when *this household's* yield is low has to measure that yield, which is costly and invites fraud (the farmer who lets the crop die). An **index insurance** contract pays when an *index* $R$ — rainfall at a station, a satellite NDVI, an area-average yield — crosses a threshold. If $R$ is correlated with the household's loss, the product moves money into bad states. If not, the household can lose the crop *and* the premium: **basis risk**.

::: definition Index insurance and basis risk {#def-index}
An **index contract** pays $b(R)$, a function of a public index $R$, in exchange for a premium $p$. **Basis risk** is the residual variation in household income (or consumption) given $R$: $\Var(y_i \mid R) > 0$. The household can have a bad $y_i$ in a state where $b(R) = 0$.
:::

Index products have been piloted for rainfall in India (the BASIX / World Bank experiments; Giné, Townsend, Vickery; later Cole, Giné, Tobacman and others), for livestock mortality in Mongolia, and for maize in several African countries. Take-up has usually been low at market (or even at heavily subsidised) prices: often 5–30 percent of the target population. Reasons, in the studies: basis risk itself, distrust of the payer, liquidity at premium time, and a lack of understanding of a product that pays on a station 20 km away. When take-up happens, some trials find more investment in fertiliser or in riskier, higher-yield seeds (Karlan, Osei, Osei-Akoto and Udry on Ghana, among others); some find little. The product is not a settled success, and it is not a dead end.

::: widget distribution
dist: lognormal
params: mu=2.0, sigma=0.6
a: 0
b: 4
caption: A stand-in for farm income (lognormal). The shaded left tail is the "bad harvest" region an insurance contract tries to fill. Index insurance pays when a *correlated* public index is in its own left tail; if the index and this household's $y$ can disagree, the household can sit in the shaded region and receive nothing. Raise $\sigma$ to see how much mass a given threshold leaves in the tail.
:::

::: example A fair premium with basis risk {#ex-basis-prem}
A farmer loses 100 with probability 0.2. An index pays 100 with probability 0.2, but $\Prob(\text{loss and payout}) = 0.12$ (so the index misses 40 percent of losses). The insurer is risk-neutral and prices at expected payout. What is the fair premium, and in what fraction of loss years does the farmer get nothing?
::: solution
Expected payout is $100 \times 0.2 = 20$, so the fair premium is 20 regardless of the correlation — the insurer pays on the index, not on the loss. The farmer gets nothing in $\Prob(\text{loss and no payout}) = 0.2 - 0.12 = 0.08$ of years, which is $0.08/0.2 = 40$ percent of loss years. She pays 20 every year, including those. That combination — a sure premium, a missed catastrophe — is why basis risk kills take-up even at an actuarially fair price.
:::
:::

::: quiz
A rainfall index pays 100 if station rainfall is below 400 mm, and 0 otherwise. A farmer 30 km away loses her crop in a local hailstorm while the station records 600 mm. This is
- [ ] moral hazard, because she should have irrigated
- [x] basis risk
- [ ] adverse selection, because only hail-prone farmers buy the product
- [ ] a violation of Townsend's $\beta = 0$
::: solution
The index did not move with her loss. That is basis risk. It can happen without any hidden action (moral hazard) and without any hidden type (adverse selection), though both of those can also be present in other contracts. Townsend's $\beta$ is about idiosyncratic income given *village* consumption, a different object.
:::
:::

::: application Self-insurance and animals
Rosenzweig and Wolpin, and later studies in India and in the Sahel, documented livestock as a buffer: animals are sold after a bad harvest. The buffer is imperfect, because animal prices *fall* when everyone sells (a general-equilibrium effect), because animals are also a productive asset, and because a household at the bottom may have already sold the last goat. Kazianga and Udry (2006), on Burkina Faso, found that livestock sales and grain stores absorbed only a small share of rainfall shocks; much of the adjustment was in consumption. Buffers, informal sharing and residual exposure coexist.
:::

## Evidence

Putting the pieces together, with dates:

- ICRISAT India, 1970s–80s panels: Townsend (1994) and follow-ups — substantial within-village sharing, $\beta$ small but not zero.
- Burkina Faso, 1980s: Kazianga and Udry — limited buffering by assets, consumption exposed to rainfall.
- Philippines: Fafchamps and Lund (2003) — gifts and informal loans respond to shocks, more so for some networks than others.
- Ethiopia: Dercon and Krishnan; the Ethiopian Rural Household Survey — food-aid and informal sharing both matter; droughts still cut consumption and health.
- Ghana, India, Kenya index-insurance trials, 2000s–2010s: low take-up, some investment responses among buyers, basis risk measured and found to be first-order (Clarke; Cole et al.).
- Health shocks: multiple studies (Gertler and Gruber on Indonesia; later work in India and Kenya) find that illness of an adult is badly insured, more so than crop shocks, perhaps because it is less public and because it hits both income and the need for expenditure.

The picture is not "the poor have no insurance". It is "the poor have partial, local, enforcement-constrained insurance, which fails for village-level shocks and for some idiosyncratic shocks, especially health, and which is costly in the assets and the children it uses as buffers."

::: history
Arrow's 1963 and 1964 papers on insurance and medical care, and Borch's 1962 risk-sharing rule, are the parent theory. Townsend's 1994 *Econometrica* paper made the theory a village regression. Udry's 1994 *AER* paper on Nigeria showed that informal loans were state-contingent. Ligon, Thomas and Worrall (2002) added limited commitment. The index-insurance movement, with World Bank and NGO pilots from the early 2000s, tried to complete the market for *aggregate* agricultural risk; Giné, Townsend, Vickery, Cole, Karlan, Udry and others ran the evaluations. The product is still being redesigned around basis risk, around satellite indices, and around the fact that a farmer who does not trust the weather station will not buy.
:::

## Where this leads

Land and the farm technology that produces $y_i$ are [[development-economics/land-and-agriculture]]. Credit, the other half of informal finance, is [[development-economics/credit-and-microfinance]]. How governments and donors have tried to add formal social insurance and disaster relief is part of [[development-economics/aid-and-policy]]. The microeconomics of insurance demand, with CARA and CRRA, is [[microeconomics/uncertainty]].

::: summary
- Full insurance equalises (weighted) marginal utilities across people in each state ([[#def-full]]). With common CRRA, individual consumption tracks only aggregate consumption.
- Townsend's test is $\beta = 0$ in $\Delta \ln c_{it} = \beta \Delta \ln y_{it} + \delta_t + \varepsilon_{it}$ ([[#prop-townsend]]). Village panels typically find $\beta$ small and positive: sharing is substantial and incomplete.
- Incomplete sharing comes from hidden action, limited commitment, and shocks that hit the whole group. Smoothing by selling assets or cutting school can hide exposure in $\beta$ while storing a long-run cost.
- Index insurance pays on a public index and so can cover village-level weather, at the cost of **basis risk** ([[#def-index]]). Take-up in pilots has been low; investment responses among buyers are mixed.
- Health shocks are, in several panels, worse insured than crop shocks.
:::

## Exercises

::: exercise A Townsend coefficient {level=1}
If $\hat\beta = 0.25$ in [[#eq-townsend]], how should that be read in words?
::: solution
A 10 percent idiosyncratic drop in income is associated with a 2.5 percent drop in consumption, after absorbing aggregate shocks with time dummies. That is residual exposure: not autarky ($\beta = 1$), not full insurance ($\beta = 0$).
:::
:::

::: exercise Fair full insurance {level=1 check="5"}
Incomes 8 and 2 with equal probability. What is the fair full-insurance consumption (a sure amount) if the contract is within the household's own endowment? (Enter that consumption.)
::: solution
The mean is $(8+2)/2 = 5$.
:::
:::

::: exercise Log utility gain {level=1}
With $u = \ln$ and the incomes of the previous exercise, compute expected utility under autarky and under fair full insurance.
::: solution
Autarky: $\tfrac12\ln 8 + \tfrac12\ln 2 = \tfrac12 \ln 16 = \ln 4 \approx 1.386$. Full insurance: $\ln 5 \approx 1.609$. The difference is the value of fair insurance, in utils; the certainty equivalent of autarky is 4, so the household would pay up to 1 unit of sure consumption to get the fair contract.
:::
:::

::: exercise Two households, equal shares {level=2}
Two identical log households have a joint endowment of 12 or 6 with equal probability. Full insurance with equal weights. Write consumption of each in each state, and confirm that [[#eq-full]] holds.
::: solution
Equal sharing: $(6,6)$ and $(3,3)$. Then $u'(c) = 1/c$, so $\lambda u'(c_1) = \lambda u'(c_2)$ in each state (both $1/6$ or both $1/3$), which is [[#eq-full]] with $\mu(\text{good}) = \lambda/6$ and $\mu(\text{bad}) = \lambda/3$.
:::
:::

::: exercise Basis risk {level=2}
A household's loss is 100 with probability 0.3. An index pays 100 with probability 0.3. Jointly, the probability that the household loses *and* the index does not pay is 0.1. What is the probability that the index pays when the household has *not* lost? Why does this object deter take-up?
::: hint
Use a two-by-two table of (loss, index).
:::
::: solution
$\Prob(\text{loss}) = 0.3$, $\Prob(\text{index}) = 0.3$, $\Prob(\text{loss and no index}) = 0.1$, so $\Prob(\text{loss and index}) = 0.2$ and $\Prob(\text{no loss and index}) = 0.1$. Ten percent of the time the household pays the premium, does not lose the crop, and still receives a payout (not itself a problem), and ten percent of the time it loses the crop and receives *nothing* — that is the event that hurts. A risk-averse household dislikes that cell, and may dislike it enough to refuse a fairly priced contract (Clarke's 2016 result: with enough basis risk, a risk-averse farmer may reject even a subsidised index product).
:::
:::

::: exercise Asset smoothing {level=2}
A household can sell a goat worth 50 to keep consumption unchanged after a shock of 50, but next period's farm output will then be 10 lower. In a Townsend regression on *this* period's consumption and income, what would $\beta$ look like, and what would you miss?
::: solution
This period, $\Delta c \approx 0$ while $\Delta y = -50$, so $\beta$ looks close to 0 — "insured". The cost is shifted into next period's production. A test that does not look at assets, at future $y$, or at children pulled from school will overstate the welfare quality of the smoothing.
:::
:::

::: exercise Limited commitment {level=3}
Two households, two periods, no discounting, incomes $(10, 0)$ in period 1 (household A rich) and $(0, 10)$ in period 2, with this switch known in advance. Full insurance would set $c = 5$ each period for each. If a household that is asked to transfer 5 can walk away to autarky from then on, is full insurance self-enforcing? What is a constrained contract that is?
::: hint
In period 1, A is asked to give 5, and in period 2 A will *receive* 5. Check A's incentive in period 1.
:::
::: solution
In period 1, A can refuse, consume 10, and then in period 2 consume 0 (autarky from then on), for total utility $u(10)+u(0)$. Staying yields $u(5)+u(5)$. For $u = \ln$ this comparison is not defined at 0; with $u(c) = \sqrt{c}$, staying gives $2\sqrt{5} \approx 4.47$, walking gives $\sqrt{10} + 0 \approx 3.16$, so A stays. If the second-period income of A were 2 rather than 0, walking would be more tempting. A constrained contract that always works is "transfer a little, not 5": keep the debtor closer to autarky so that the future reward for staying is enough. Ligon–Thomas–Worrall is the systematic version of that idea.
:::
:::

::: exercise Designing an index {level=3}
You can choose a rainfall station at the village, or a satellite NDVI index at 1 km resolution, or area-yield in the district. Rank the three, qualitatively, on (a) basis risk for a typical farmer, (b) cost of measurement, (c) moral hazard. There is no unique correct ranking; give a reason for each comparison.
::: solution
Area-yield at district level: low moral hazard (one farmer cannot move the district mean), high basis risk (the district can have a good year on average while this village fails), moderate cost (crop-cutting experiments). Village rainfall: lower basis risk than district yield for rain-fed crops, almost no moral hazard, cheap once the station exists, but hail and pests do not appear in rainfall, and a station 20 km away recreates basis risk. 1 km NDVI: potentially the lowest basis risk of the three for vegetation-covered crops, low moral hazard, cost in the satellite processing and in explaining the index to buyers. A serious design also worries about *trust*: a farmer who can see the village rain gauge may buy; a farmer who is told a number from a satellite may not.
:::
:::
