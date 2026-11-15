Carbon dioxide is a uniformly mixing stock pollutant with a long atmospheric lifetime. One year's emissions shift a stock that damages harvests, health, coasts and ecosystems for centuries. The economic problem is then a dynamic Pigouvian problem: what path of emissions, and what path of carbon prices, maximises the present value of output minus abatement costs minus climate damages? **Integrated assessment models** (IAMs) answer that question inside a particular model. The **social cost of carbon** (SCC) is a *number that falls out of such a model*, given damages, discounting, climate sensitivity and a socio-economic path. It is not a measurement of a posted price, and it is not a recommendation to buy, sell or tax at that number.

This chapter states the stock-pollutant problem, defines the SCC, shows how DICE-style IAMs produce it, and compares carbon taxes, caps and quantity paths aimed at temperature targets. IPCC carbon budgets and IEA energy numbers fix the physical scale. Stern versus Nordhaus on discounting ([[environmental-economics/cost-benefit-analysis]]) and Weitzman on prices versus quantities ([[environmental-economics/policy-instruments]]) reappear as competing views, not as a single policy conclusion.

## A stock pollutant

Let $S(t)$ be the atmospheric (or extra-atmospheric) carbon stock above a pre-industrial baseline, $E(t)$ emissions, and $\delta$ a decay rate (a cartoon of the carbon cycle). Then

$$
\dot S = E - \delta S.
$$ {#eq-stock}

Damages are $D(S)$ (or $D(S,Y)$ as a share of output). Abatement $a$ reduces emissions below a baseline $E^{\mathrm{bau}}(t)$ at cost $C(a)$. The planner maximises $\int e^{-r t}\bigl(Y - C - D\bigr)\,\dd t$, and the current-value costate $\lambda_S$ on $S$ is the **marginal present-value damage of a tonne in the atmosphere**.

::: definition Social cost of carbon {#def-scc}
The **social cost of carbon** at date $t$ is the present-value welfare loss from emitting one extra tonne of $\mathrm{CO}_2$ at $t$, along a specified path, in a specified model:

$$
\mathrm{SCC}_t = \frac{\partial W}{\partial E_t}.
$$ {#eq-scc}

It inherits the model's damage function, discounting, climate module, socio-economic baseline and uncertainty treatment. Changing any of those changes the SCC. The SCC is a model output. It is not a market price, a moral desert, or a recommendation to set a tax equal to that number in a world that is not the model.
:::

Along an *optimal* path, a carbon tax (or permit price) equal to the SCC implements the path, by the same Pigouvian logic as [[environmental-economics/environment-and-economy#prop-msc-msb]]. Along a *business-as-usual* path, the SCC is still defined — it is the marginal damage of a tonne given that path — and is typically larger, because $S$ is larger. Reporting *which path* an SCC was computed on is part of reporting the number.

::: proposition Hotelling for a stock pollutant {#prop-carbon-hotelling}
If damages depend on $S$, decay is $\delta$, and the discount rate is $r$, the current-value costate on $S$ obeys $\dot\lambda = (r+\delta)\lambda - D'(S)$ along an interior path. At an optimum with abatement cost $C(E)$ in emissions, $C'(E_t) = \lambda_t$. With $\delta = 0$ (a permanent stock) and $D'$ growing at rate $g_D$, the efficient carbon price grows at $r - g_D$ adjustments aside. Assumptions: the cartoon cycle [[#eq-stock]], interior abatement, no uncertainty, a single region.
:::

::: proof
Hamiltonian $H = Y - C(E) - D(S) + \lambda(E - \delta S)$ with $E$ the control (or $E = E^{\mathrm{bau}} - a$). Then $\partial H/\partial E = 0$ gives $C'(E) = \lambda$ (up to sign conventions on whether $\lambda$ is the shadow *cost* of $S$). The costate is $\dot\lambda = r\lambda - \partial H/\partial S = r\lambda + D'(S) + \lambda \delta$ if $\lambda$ is the shadow *value* of a lower stock; equivalently the carbon *price* $p_c = -\lambda_{\mathrm{stock}}$ satisfies $\dot p_c = (r+\delta)p_c - D'(S)$ with the sign of damages. Either way, the carbon price is a Hotelling rent on a sink.
:::

::: example A two-period SCC {#ex-two-period}
Period $0$ emissions $E$ cost $C(E) = 0$ up to a baseline of $8$, and abatement $a = 8 - E$ costs $a^2$. Next period, damages are $\tfrac12 (S_0 + E)^2$ with $S_0 = 10$, discounted by $\beta = 0.9$. No further decay. Find optimal $a$ and the SCC at the optimum (the extra damage of a marginal tonne).
::: solution
The planner minimises $a^2 + 0.9 \cdot \tfrac12 (18 - a)^2$. First-order condition: $2a = 0.9(18-a)$, so $2a = 16.2 - 0.9a$, $2.9a = 16.2$, $a^* \approx 5.59$, $E^* \approx 2.41$. The SCC is $\beta (S_0+E^*) = 0.9 \times 12.41 \approx 11.17$, which equals $2a^* = 11.17$ — the Pigouvian equality of marginal abatement cost and discounted marginal damage. Doubling $\beta$ (more patient) raises $a^*$ and the SCC. A more convex damage function would raise both still further.
:::
:::

## Integrated assessment and the SCC as a model output

An IAM couples a simple climate module (from $E$ to warming) to an economic module (from warming to damages and from carbon prices to abatement). **DICE** (Nordhaus, from 1992 onwards) is the workhorse: a Ramsey growth model, a carbon cycle, a temperature equation, and damages as a polynomial in warming as a share of GDP. **FUND** and **PAGE** are the other two models that underpinned the US Interagency Working Group SCCs of the 2010s. Later work (Howard and Sterner 2017; Rennert et al. 2022, *Nature*, the DSCIM / GIVE lineage) uses richer damage functions, income-dependent vulnerability and probabilistic climate.

::: definition DICE-style damages {#def-dice}
A **DICE-style** damage function takes the form $D = \Omega(T) Y$, with $\Omega(T) \approx \pi_1 T + \pi_2 T^2$ (or a related polynomial) in global mean warming $T$. The coefficients $\pi$ are calibrated to a handful of sectoral studies. The SCC is then the present-value derivative of remaining welfare with respect to a pulse of $\mathrm{CO}_2$, computed by finite difference on the model's $W$.
:::

Nordhaus's own preferred DICE runs have produced SCCs of the order of a few tens of US dollars per tonne of $\mathrm{CO}_2$ (various dollars and various years; e.g. Nordhaus, *American Economic Review* 2017, of order USD $30$–$50$ in the mid-2010s calibration at a descriptive rate). The US EPA's 2023 update, using a modular approach recommended by the National Academies (2017) and a $2\%$ near-term Ramsey rate, reports a central SCC of **USD $190$ per tonne of $\mathrm{CO}_2$ for 2020 emissions** (2020 dollars), with $120$ at $2.5\%$ and $340$ at $1.5\%$ (EPA, *Report on the Social Cost of Greenhouse Gases*, December 2023). Rennert et al. (2022) are in the same range at a $2\%$ rate. The spread between Nordhaus's DICE numbers and the EPA 2023 numbers is not a measurement error. It is mostly discounting, the damage function, and the treatment of uncertainty — the objects of [[#def-scc]].

::: warning Do not quote an SCC without its model
A headline "the social cost of carbon is $190$" is incomplete. Complete reporting names the model (or damage module), the near-term discount rate, the emissions year, the price-level year, the socio-economic scenarios, and whether the number is a mean, a median or a percentile. Using the EPA $190$ as a tax in a different country, at a different date, without those qualifiers, is not what the model produced. Using Nordhaus's lower number as a demonstration that "climate is a small problem" is the same mistake with the opposite sign.
:::

::: example Discounting a damage flow {#ex-scc-toy}
An extra tonne causes a damage flow that starts at $0.02$ units of money per year and grows at $g = 1.5\%$. The discount rate is $r$. The infinite-horizon SCC is $0.02/(r-g)$ if $r > g$. Compute it at $r = 3\%$ and at $r = 5.5\%$. What happens at a Stern-like $r = 1.4\%$?
::: solution
At $3\%$: $0.02/(0.03-0.015) = 1.33$. At $5.5\%$: $0.02/(0.055-0.015) = 0.50$. At $1.4\%$ we have $r < g$ and the infinite integral diverges: a growing damage flow discounted more slowly than it grows has infinite present value. In any finite but long horizon the Stern-like SCC is then very large (at a $200$-year truncation, $0.02 \times (e^{0.002\cdot 200}-1)/0.002 \approx 0.02 \times (e^{0.4}-1)/0.002 \approx 4.9$). The example is a cartoon of why [[environmental-economics/cost-benefit-analysis#prop-ramsey]]'s calibration dominates many IAM headlines. It is not a climate forecast.
:::
:::

Weitzman (2009, "On Modeling and Interpreting the Economics of Catastrophic Climate Change", *Review of Economics and Statistics*) argued that a fat-tailed distribution of climate sensitivity makes the expected marginal damage explode, even at Nordhaus's $r$. The argument is about the *damage* tail, not about $\rho$. Nordhaus (2011) and others replied that the tail can be truncated by policy and by physics. The disagreement is live. It is one more reason the SCC is a model output.

## Carbon prices, budgets and paths

A **temperature target** (hold warming below $2^{\circ}\mathrm{C}$ or $1.5^{\circ}\mathrm{C}$) is a quantity constraint, not an SCC. IPCC AR6 Working Group I (2021, Table SPM.2 / Table 5.8) assessed remaining carbon budgets from the beginning of **2020**:

| Warming | $50\%$ probability | $67\%$ probability |
|---|---|---|
| $1.5^{\circ}\mathrm{C}$ | $500$ Gt $\mathrm{CO}_2$ | $400$ Gt $\mathrm{CO}_2$ |
| $2.0^{\circ}\mathrm{C}$ | $1{,}350$ Gt $\mathrm{CO}_2$ | $1{,}150$ Gt $\mathrm{CO}_2$ |

Budgets are uncertain by hundreds of Gt because of non-$\mathrm{CO}_2$ forcing, historical warming and the zero-emissions commitment (IPCC AR6 WGI, Chapter 5). Energy-related $\mathrm{CO}_2$ was $37.8$ Gt in 2024 (IEA, *Global Energy Review 2025*). A $400$ Gt budget from 2020, with five subsequent years of nearly $38$ Gt, is a remaining budget of the order of two hundred Gt by 2025 — a handful of years at current rates. Those arithmetic facts are physical and energy-statistical. They are not an SCC.

::: widget plot
f: 40 + 3*x; 190*exp(0.02*x); 50*exp(0.03*x)
x: 0, 40
y: 0, 500
labels: \text{illustrative MAC}; \text{EPA-like SCC path}; \text{DICE-like SCC path}
caption: Two *illustrative* carbon-price paths and a linear MAC in abatement $x$ (here a time index, not a structural estimate). The EPA-like path starts near $190$ and grows at $2\%$; the DICE-like path starts near $50$ and grows at $3\%$. They are cartoons of [[#def-scc]], not forecasts and not a menu of investments. Notice that a given MAC is crossed at very different dates — that is the whole Stern–Nordhaus–EPA disagreement in one picture.
:::

Cost-effective paths that *respect a budget* still equalise MAC across sources and dates (the Hotelling-like carbon price rises at a rate related to $r$). They do not require the carbon price to equal any particular SCC; the dual of a quantity constraint is whatever price clears the remaining budget. Weitzman's static ranking (taxes versus caps) is modified for a stock: a cap on *cumulative* emissions is a quantity instrument on the budget; a tax must be committed over time and will miss the budget if MACs surprise (Hoel and Karp 2002; Newell and Pizer 2003). Hybrids — a rising tax with a quantity backstop, or a cap with a price collar — are the practical response.

::: example A budget and a constant tax {#ex-budget-tax}
A two-period budget is $E_1 + E_2 = 10$. Period-1 MAC is $4a_1$, period-2 MAC is $8a_2$, with $a_t = 6 - E_t$ (baseline $6$ each period). Discount factor $1$. What abatement path minimises cost, and what carbon price supports it?
::: solution
$a_1 + a_2 = 2$ because total baseline $12$ and budget $10$. Cost-effectiveness: $4a_1 = 8a_2$, so $a_1 = 2a_2$ and $2a_2 + a_2 = 2$, $a_2 = 2/3$, $a_1 = 4/3$. The carbon price is $\lambda = 4 \cdot 4/3 = 16/3 \approx 5.33$ in both periods (no discounting). Emissions are $E_1 = 6-4/3 = 14/3$ and $E_2 = 6-2/3 = 16/3$. A tax of $16/3$ implements the budget; a cap of $10$ permits, bankable, does the same under certainty.
:::
:::

The example's heading has `{level=2}` which is for exercises not examples. I need to remove that.

## Evidence from energy systems

IEA *World Energy Outlook 2024* reports that fossil fuels supplied about $80\%$ of global primary energy in 2023, while renewables supplied about $30\%$ of electricity. In the Stated Policies Scenario (STEPS), fossil demand peaks before 2030 in aggregate; in the Net Zero Emissions by 2050 (NZE) scenario, declines are far steeper and warming in 2100 is consistent with $1.5^{\circ}\mathrm{C}$. These are scenarios, not predictions. The IEA is explicit that NZE is a pathway to a target, not a forecast of what will happen.

Observed carbon prices remain, in most jurisdictions, below the EPA 2023 SCC and often below Nordhaus's DICE numbers as well (World Bank, *State and Trends of Carbon Pricing 2024*). The EU ETS, California, and a few carbon taxes (Sweden, Switzerland) have at times been in the tens to low hundreds of euros or dollars. China's national ETS, as launched, is an intensity scheme in power. Coverage of world emissions by a carbon price of any level is still a minority (World Bank, same report). The gap between model SCCs and observed prices is a political-economy fact, not a refutation of [[#def-scc]].

::: quiz
The US EPA (2023) reports a central SCC of USD $190$ (2020 dollars) for 2020 emissions at a $2\%$ near-term rate. Which statement is correct?
- [ ] This is the price of carbon on a world market, so investors should treat it as a forecast
- [x] It is a model output at a stated rate and damage module; a different $r$ or $\Omega(T)$ produces a different number
- [ ] It proves that Nordhaus's DICE is false
- [ ] It is a recommendation to set every country's tax at USD $190$ in 2020 dollars
::: solution
[[#def-scc]] and the EPA report itself present the number as the output of a modular IAM at stated assumptions. Nordhaus's lower figures are the same object with different assumptions. Neither number is a market forecast, and this course does not recommend a tax.
:::
:::

## Where this leads

A global SCC is not a global tax unless countries cooperate. [[environmental-economics/international-agreements]] is about why they may not, and about leakage when some do. [[environmental-economics/green-growth]] is about the MAC curve shifting down through directed technical change — which IAMs often treat as exogenous, and which is the long-run alternative to a high carbon price on a static MAC.

::: example A constant tax versus a budget {#ex-tax-vs-budget}
A remaining carbon budget is $200$ Gt. Unconstrained emissions would be $40$ Gt a year. A constant carbon tax is expected, in a cartoon MAC, to cut emissions to $25$ Gt a year. In what year is the budget exhausted under the tax, and what quantity instrument would keep the stock inside $200$ Gt for certain if MAC is uncertain?
::: solution
Annual cut under the tax is $15$ Gt versus BAU $40$, so $25$ Gt a year. $200/25 = 8$ years to exhaustion at that rate. If MAC is *flatter* than expected, the same tax cuts less and the budget is breached sooner; if MAC is steeper, the tax over-complies. A cumulative cap of $200$ Gt (or a cap path) hits the budget by construction and lets the *price* vary — Weitzman's quantity instrument when the constraint is a stock. A hybrid (tax plus a quantity backstop) bounds both mistakes. The $25$ Gt is a cartoon, not an IEA scenario.
:::
:::

::: history
**1992, William Nordhaus.** "An Optimal Transition Path for Controlling Greenhouse Gases" (*Science*) and the first DICE papers made the SCC a computable object. Nordhaus was awarded the 2018 Nobel Prize in part for this programme.

**2006–2009, Stern and Weitzman.** The *Stern Review* and Weitzman's fat-tail paper shifted the argument from "whether to price carbon" to discounting and to tail damages.

**2021–2023, IPCC AR6 and EPA 2023.** AR6 WGI restated remaining carbon budgets; the EPA's 2023 SCC update put a $2\%$ near-term rate and new damage modules into US federal analysis. Both are dated sources, not last words.
:::

::: summary
- Climate is a stock-pollutant problem: $\dot S = E - \delta S$, and the efficient carbon price is a Hotelling-like shadow cost of $S$ ([[#prop-carbon-hotelling]]).
- The SCC is $\partial W/\partial E_t$ in a named model. It is a model output, not a recommendation ([[#def-scc]]).
- DICE-style quadratic damages and a descriptive $r$ produce SCCs of tens of dollars; EPA 2023 at $2\%$ produces $190$ (2020 dollars, 2020 emissions). The gap is assumptions.
- IPCC AR6 remaining budgets from 2020 are $400$–$500$ Gt $\mathrm{CO}_2$ for $1.5^{\circ}\mathrm{C}$ ($67$–$50\%$) and about $1{,}150$–$1{,}350$ Gt for $2^{\circ}\mathrm{C}$. IEA energy-related $\mathrm{CO}_2$ was $37.8$ Gt in 2024.
- A budget is a quantity instrument; an SCC-based tax is a price instrument. Under uncertainty they diverge, as in Weitzman. Report the model with the number.
:::

## Exercises

::: exercise A remaining budget {level=1 check="10"}
A remaining budget is $400$ Gt and emissions run at $40$ Gt a year. How many years of current emissions does the budget represent? (Enter the number of years.)
::: solution
$400/40 = 10$.
:::
:::

::: exercise A toy SCC {level=1 check="2"}
An extra tonne causes a constant damage flow of $0.06$ a year forever. At $r = 0.03$, what is the SCC? (Enter the SCC.)
::: solution
$0.06/0.03 = 2$.
:::
:::

::: exercise Ramsey in an IAM {level=1 check="0.055"}
An IAM uses $\rho = 0.015$, $\eta = 2$, $g = 0.02$. What discount rate does the Ramsey formula give? (Enter $r$.)
::: solution
$r = 0.015 + 0.04 = 0.055$.
:::
:::

::: exercise Two-period abatement {level=2 check="5.59"}
In [[#ex-two-period]], report $a^*$ rounded to two decimals. (Enter the rounded abatement.)
::: solution
$a^* = 16.2/2.9 \approx 5.586$, which rounds to $5.59$.
:::
:::

::: exercise A budget split {level=2 check="4/3"}
In the two-period budget example, what is period-1 abatement $a_1$? (Enter the exact fraction or its decimal $1.333$.)
::: solution
$a_1 = 4/3$.
:::
:::

::: exercise Path dependence of the SCC {level=2}
Why is the SCC along a high-emissions path typically larger than the SCC along an optimal path, holding the model fixed? Does that mean a country on a high-emissions path should use the larger number as a tax?
::: solution
Damages $D(S)$ are convex in most IAMs, so $D'(S)$ rises with $S$. A high-emissions path has a larger stock and therefore a larger marginal damage. Using that larger SCC as a tax would, if it stuck, *leave* the high-emissions path, so the consistent Pigouvian tax is the SCC *along the path the tax implements* — the optimal-path SCC. Quoting a BAU SCC as "the" tax mixes a descriptive path with a prescriptive instrument. Report both if you wish; do not treat either as a market forecast.
:::
:::

::: exercise Fat tails versus discounting {level=3}
Weitzman (2009) and Nordhaus (the DICE programme) disagree about more than $\rho$. In two sentences, separate the fat-tail argument from the Ramsey-rate argument, and say why an SCC can be large even at a descriptive $r$.
::: solution
The Ramsey-rate argument is about $\rho + \eta g$: a smaller $r$ raises the present value of any given damage *path*. The fat-tail argument is about the *distribution* of damages (or of climate sensitivity): if the tail of $D$ is heavy enough, $\E[D']$ is large at *any* $r$ that does not truncate the tail. An SCC can therefore be large at Nordhaus's $r$ if the damage module has a heavy tail (as in some EPA 2023 and Rennert et al. runs), without accepting Stern's $\rho$.
:::
:::

::: exercise A quantity target and a tax {level=3}
A planner has a remaining budget $B$ and an uncertain MAC. Using Weitzman's criterion as applied to a *stock* (Hoel and Karp; Newell and Pizer), should a country that cares about staying inside $B$ prefer a cumulative cap or a constant tax, and why might a hybrid dominate both?
::: hint
Annual MD of a stock pollutant is relatively flat; the *budget* constraint is not.
:::
::: solution
Year-by-year MD is flat, which is Weitzman's case for a *tax* if the target is a Pigouvian optimum. A *hard budget* $B$ is a quantity target whose marginal benefit becomes steep as $B$ is exhausted (or as a temperature threshold is approached). A cumulative cap (or a cap path) then limits the cost of being wrong about MAC. A hybrid — a tax with a quantity backstop, or a cap with a price ceiling and floor — bounds both price and quantity mistakes. The EU ETS market-stability reserve is a version of the second. None of these is a forecast of allowance prices.
:::
:::
