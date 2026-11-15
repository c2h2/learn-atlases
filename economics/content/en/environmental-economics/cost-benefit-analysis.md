A coastal defence that costs $120$ units of money today will, if it works, prevent flood damages of $10$ every year for $20$ years. Is it worth building? The answer is not "$10 \times 20 = 200 > 120$", because a unit of damage prevented in year $20$ is not a unit of damage prevented today. **Cost–benefit analysis** (CBA) translates a stream of effects into a present value, using a **social discount rate**, and asks whether the net present value is positive. For an ordinary bridge the rate is a familiar object. For a project whose benefits stretch across generations — climate mitigation, a nuclear-waste store, the conservation of a unique ecosystem — the rate is also an ethical parameter, and reasonable people disagree about it.

This chapter sets out the NPV rule, the Ramsey formula that produces a discount rate from preferences and growth, the Stern–Nordhaus disagreement, declining discount rates, and the extra tools that uncertainty and irreversibility require (expected NPV, option value). Benefits and costs are assumed to have been valued as in [[environmental-economics/valuing-the-environment]]. The chapter does not recommend a project, a discount rate or a portfolio.

## The NPV rule

::: definition Net present value {#def-npv}
A project with costs and benefits $(B_t - C_t)_{t=0}^T$, valued in real units of money, has **net present value**

$$
\mathrm{NPV} = \sum_{t=0}^{T} \frac{B_t - C_t}{(1+r)^t}
$$ {#eq-npv}

at a constant real social discount rate $r > -1$. In continuous time with a flow $b(t)$ and rate $\rho$, $\mathrm{NPV} = \int_0^T e^{-\rho t} b(t)\,\dd t$. The **NPV rule** is: accept the project if $\mathrm{NPV} > 0$ (and, among mutually exclusive projects, pick the largest NPV). Equivalently, accept if the benefit–cost ratio exceeds one, provided costs are the discounted costs in the denominator.
:::

The rule is the social analogue of a firm's capital-budgeting criterion. It is first-best only if $r$ is the right social rate, all effects are included and monetised, and there are no binding quantity constraints. Distributional weights can be applied to $(B_t - C_t)$ if a unit of money to the poor is judged to be worth more than a unit to the rich; that is a social-welfare choice, not an efficiency result.

::: example A flood wall {#ex-flood}
The wall costs $120$ at $t = 0$ and prevents damages of $10$ at the end of each of $20$ years. At $r = 0.04$, is NPV positive? What is the longest horizon at which a $4\%$ rate would still accept a perpetual $10$-a-year benefit of this cost?
::: solution
The discrete annuity formula gives $\sum_{t=1}^{20} 10/(1.04)^t = 10 \cdot \bigl(1 - 1.04^{-20}\bigr)/0.04 \approx 135.90$. $\mathrm{NPV} \approx 135.90 - 120 = 15.90 > 0$; the wall passes at $4\%$. A perpetual $10$ a year is worth $10/r = 250$ at $4\%$, so the wall would still pass as a perpetuity. The *shortest* perpetuity-equivalent benefit that covers $120$ is $120 \times 0.04 = 4.8$ a year. At a $5.5\%$ rate the twenty-year annuity is $10 \cdot \bigl(1 - 1.055^{-20}\bigr)/0.055 \approx 119.5$, and $\mathrm{NPV}$ is about $-0.5$: the same wall fails. The rate, not the engineering, flipped the sign.
:::
:::

::: widget riemann
f: 10*exp(-0.04*x)
a: 0
b: 20
n: 8
method: mid
caption: The present-value integral $\int_0^{20} 10 e^{-0.04 t}\,\dd t$ of the flood-wall benefits. Increase $n$ to watch the Riemann sum approach $10(1-e^{-0.8})/0.04 \approx 137.7$. A higher discount rate is a faster-decaying integrand: try to imagine $e^{-0.055 t}$ in place of $e^{-0.04 t}$ and the area shrinking toward $120$.
:::

::: warning Discounting is not inflation, and NPV is not IRR
The $r$ in [[#eq-npv]] is a *real* rate: benefits and costs are in constant units of money. Inflation is handled by using real flows, or by using nominal flows and a nominal rate, not by mixing them. The internal rate of return is the $r$ that sets $\mathrm{NPV} = 0$; ranking projects by IRR can contradict NPV when projects differ in scale or timing. Public agencies that have a single $r$ should rank by NPV.
:::

## The social discount rate and the Ramsey formula

Where does $r$ come from? In a representative-agent economy with isoelastic utility $u(C) = C^{1-\eta}/(1-\eta)$ ($\eta = 1$ is $\ln C$), the Euler equation for consumption along an optimal path is the **Ramsey rule**.

::: proposition Ramsey discount rate {#prop-ramsey}
If a planner has pure rate of time preference $\rho \ge 0$, elasticity of the marginal utility of consumption $\eta > 0$, and consumption grows at a constant rate $g$, the social discount rate on consumption is

$$
r = \rho + \eta g.
$$ {#eq-ramsey}

Assumptions: isoelastic utility, no uncertainty, a single consumption good, an interior path. With uncertainty about $g$, Jensen's inequality on marginal utility produces a *precautionary* subtraction from $r$ (Gollier 2002).
:::

::: proof
The planner maximises $\int_0^\infty e^{-\rho t} u(C_t)\,\dd t$. The current-value first-order condition for a marginal investment that yields extra consumption tomorrow is $u'(C_t) = e^{-\rho \Delta} (1 + r \Delta) u'(C_{t+\Delta})$ as $\Delta \to 0$. Taking logs and using $\mathrm{d}\ln u'(C)/\mathrm{d}t = -\eta \dot C/C = -\eta g$ gives $r = \rho + \eta g$.
:::

Three numbers, three arguments.

- $\rho$ is **impatience**. Ramsey (1928) called a $\rho > 0$ as between generations "ethically indefensible"; Stern (2007) set $\rho = 0.1\%$ per year, a small allowance for extinction risk. Nordhaus (2007, 2008) used a $\rho$ around $1$–$1.5\%$, calibrated so that $r$ matches observed returns on capital.
- $\eta$ is both the **inequality aversion** across people at a date and the aversion to inequality across dates. $\eta = 1$ is log utility; $\eta = 2$ is a common alternative. Larger $\eta$ raises $r$ when $g > 0$ (future people are richer, so a unit of their consumption is worth less) and *lowers* $r$ if growth is negative.
- $g$ is the expected growth rate of consumption. Stern used about $1.3\%$; Nordhaus's DICE baseline has used figures around $2\%$.

::: example Two Ramsey rates {#ex-ramsey-numbers}
Compute $r$ under (i) Stern-like parameters $\rho = 0.001$, $\eta = 1$, $g = 0.013$ and (ii) Nordhaus-like parameters $\rho = 0.015$, $\eta = 2$, $g = 0.02$. Then compare the present value of $1$ a year for $100$ years under the two rates, using the continuous formula $(1 - e^{-r T})/r$.
::: solution
Stern-like: $r = 0.001 + 1\cdot 0.013 = 0.014$ ($1.4\%$). Nordhaus-like: $r = 0.015 + 2\cdot 0.02 = 0.055$ ($5.5\%$). The hundred-year annuities are $(1 - e^{-1.4})/0.014 \approx 53.8$ and $(1 - e^{-5.5})/0.055 \approx 18.1$. The same unit of money in the twenty-second century is worth about three times as much at Stern's rate as at Nordhaus's. That, more than any disagreement about climate physics, is why the *Stern Review* found a high present-value benefit of mitigation and why Nordhaus did not.
:::
:::

::: intuition Descriptive versus prescriptive rates
Nordhaus's calibration is **descriptive**: $r$ should match the rate at which the economy actually trades consumption across time, or else the public sector will crowd in or out private investment on a distorted basis (the "shadow price of capital" argument). Stern's calibration is **prescriptive**: $\rho$ is a moral parameter about generations, not a market observation, and observed returns mix risk premia, taxes and imperfections (Gollier and Weitzman have both developed this line). Neither side is making a simple arithmetic mistake. The disagreement is about whether the planner is *bound* by observed capital returns. Arrow et al. (1996, IPCC SAR; later Arrow et al. 2013, *Science*) set out both views without dissolving them.
:::

A related dualism is the **social opportunity cost of capital** versus the **social time preference rate**. If public investment displaces private investment one-for-one, using a rate near the pre-tax return on capital (often $5$–$8\%$ real in older guidance) is the opportunity-cost view. If the public sector can borrow at the government rate, or if displaced consumption rather than displaced investment is the margin, a lower consumption rate of the Ramsey type is appropriate. Many agencies now use a *pair* of rates, or a declining schedule, rather than a single number.

## Declining rates, uncertainty and irreversibility

::: proposition Declining discount rates under uncertainty (Weitzman) {#prop-declining}
Suppose the future discount rate is a random variable $r$, constant over time but unknown today, and the planner uses the expected discount *factor* $\E[e^{-r t}]$. Then the **certainty-equivalent rate** $r_{\mathrm{ce}}(t) = -\frac{1}{t}\ln \E[e^{-r t}]$ is decreasing in $t$, and as $t \to \infty$ it tends to the lowest possible $r$. Assumptions: $r$ is drawn once, persistence is perfect, and the planner is risk-neutral over discount factors (Weitzman 1998, 2001 "gamma discounting").
:::

::: proof
$\E[e^{-r t}] = \int e^{-r t}\,\mathrm{d}F(r)$ is a mixture of exponentials. The mixture puts relatively more weight, as $t$ grows, on the smallest $r$ in the support, because those terms decay most slowly. Therefore $-\frac1t \ln \E[e^{-rt}]$ falls toward $\inf r$.
:::

::: example A two-point declining rate {#ex-declining-num}
The future rate is $2\%$ or $6\%$ with equal probability. Compute the expected discount factor for $t = 100$ and the certainty-equivalent rate $r_{\mathrm{ce}}(100) = -\frac1t \ln \E[e^{-r t}]$. Compare with $e^{-0.04 \times 100}$.
::: solution
$\E[e^{-r\cdot 100}] = \tfrac12 e^{-2} + \tfrac12 e^{-6} \approx \tfrac12(0.1353 + 0.00248) \approx 0.0689$. Then $r_{\mathrm{ce}}(100) = -\ln(0.0689)/100 \approx 0.0267$ ($2.67\%$). Discounting at the mean rate $4\%$ would use $e^{-4} \approx 0.0183$, less than a third of $0.0689$. The low-rate state dominates the long-horizon present value, which is [[#prop-declining]] in arithmetic.
:::
:::

Gollier (2002, later books) reaches declining rates from a different route: uncertain growth and prudent utility. The UK Treasury's *Green Book* has used a declining schedule (for example $3.5\%$ for years $0$–$30$, stepping down for longer maturities; HM Treasury, *Green Book* 2022). France has used a similar idea. The US Office of Management and Budget's 2023 circular A-4 moved the default rate down (toward $2\%$ in real terms) and discussed declining rates; it is guidance for US federal CBA, not a law of nature, and it can be revised.

Irreversibility adds a reason to *wait*. Arrow–Fisher–Henry **quasi-option value** is the value of information that would be lost if a development (a dam, an extinction, a tonne of carbon) were sunk today. Dixit and Pindyck (1994) option-value models give a hurdle rate above $r$ for irreversible investment under uncertainty. For a *conservation* project the option value typically *raises* the benefit of waiting to develop, i.e. tilts CBA toward preservation. For a *mitigation* project that is itself irreversible (a power station, a carbon tax that is politically hard to reverse) the option value can cut either way.

::: example A two-period option {#ex-option}
A unique wood can be felled for a development value $D = 100$, today or next period. If it is left standing, next period a study will reveal conservation value $C = 180$ or $C = 40$, each with probability $1/2$. Development is irreversible. The discount factor is $\beta = 0.9$. Compare (i) felling today, (ii) committing to conservation without learning, and (iii) waiting to learn and then choosing. What is the quasi-option value of waiting, relative to the best irreversible decision today?
::: solution
(i) Felling today yields $100$. (ii) Conservation without learning yields expected present value $\beta \E[C] = 0.9 \times 110 = 99$. The best irreversible decision today is therefore to fell ($100 > 99$). (iii) Waiting: in the high state the planner conserves ($180$); in the low state the planner fells ($100$). Expected present value $0.9 \times \bigl(\tfrac12 \cdot 180 + \tfrac12 \cdot 100\bigr) = 0.9 \times 140 = 126$. Waiting dominates felling today. The quasi-option value of information is $126 - 100 = 26$. A CBA that replaced $C$ by $\E[C]$ and ignored learning would fell a wood that, with a study, is worth keeping until the study is in.
:::
:::

Distributional weights and a **marginal cost of public funds** greater than one (because taxes are distortionary) further modify [[#eq-npv]]: benefits to the poor can be scaled up, and costs that fall on the public budget can be scaled up. Those weights are explicit value judgements. Hiding them in a "conservative" discount rate mixes ethics with opportunity cost.

## Evidence and competing views

The Stern–Nordhaus exchange is the public record of [[#prop-ramsey]] applied to climate. The *Stern Review* (2007) used a low $\rho$, concluded that the present-value benefits of holding warming near $2^{\circ}\mathrm{C}$ greatly exceeded the costs, and recommended early, strong mitigation. Nordhaus (2007, *Journal of Economic Literature*; 2008, *A Question of Balance*) argued that Stern's $\rho$ was inconsistent with observed saving and that a descriptive $r$ near $4$–$5\%$ implied a lower present-value benefit, a rising carbon price, and a slower ramp. Weitzman (2007, *JEL*) accepted that discounting mattered but added that *fat-tailed* damages could dominate the discount-rate dispute — a structural, not a rate, disagreement. Gollier (2013, *Pricing the Planet's Future*) and the UK *Green Book* declining schedule are the operational descendants of [[#prop-declining]].

Agency practice has moved. US federal guidance used $7\%$ and $3\%$ real for many years (OMB Circular A-4, 2003); the 2023 revision put more weight on a consumption rate near $2\%$ and on uncertainty. France, the United Kingdom and Norway publish declining or dual-rate schedules. China's and India's project-appraisal manuals have used higher real rates, reflecting a higher opportunity cost of capital. None of these manuals is a measurement of $\rho$.

Empirical estimates of $\eta$ from inequality aversion and from risk aversion do not agree on a single number (a range from under $1$ to above $4$ is common), and $g$ for the next century is a forecast, not a constant. A sensitivity table over $r \in \{1\%, 3\%, 5\%\}$ is therefore part of the result, not an appendix.

::: quiz
A project prevents $1$ unit of damage in $100$ years. Which statement is correct?
- [ ] At any $r > 0$ the present value is zero, so the project fails
- [x] The present value is $1/(1+r)^{100}$, which is about $0.37$ at $r = 1\%$ and about $0.008$ at $r = 5\%$
- [ ] Stern's rate and Nordhaus's rate give the same present value because physics is the same
- [ ] Declining discount rates raise the rate applied to year $100$
::: solution
$(1.01)^{-100} \approx 0.370$, $(1.05)^{-100} \approx 0.0076$. The two Ramsey calibrations in [[#ex-ramsey-numbers]] are an instance of this gap. Declining rates *lower* the long-horizon rate, which *raises* the present value of distant benefits.
:::
:::

## Where this leads

Climate economics ([[environmental-economics/climate-economics]]) is CBA at planetary scale, with the social cost of carbon as a model output that inherits every choice in this chapter. Resource chapters use the same $r$ as a Hotelling or Faustmann interest rate. International agreements add the problem that one country's $r$ is not another's. A low $r$ is not a substitute for a carbon price, and a high $r$ is not a demonstration that climate physics is negligible.

::: history
**1928, Frank Ramsey.** "A Mathematical Theory of Saving" (*Economic Journal*) derived [[#eq-ramsey]]. Ramsey himself argued for $\rho = 0$ across generations.

**1998–2001, Martin Weitzman.** "Why the Far-Distant Future Should Be Discounted at Its Lowest Possible Rate" (*Journal of Environmental Economics and Management*, 1998) and "Gamma Discounting" (*American Economic Review*, 2001) gave [[#prop-declining]].

**2006–2007, Nicholas Stern and William Nordhaus.** The *Stern Review* and Nordhaus's *JEL* reply made the social discount rate a public argument. The argument is not settled.
:::

::: summary
- NPV discounts monetised net benefits at a social rate $r$; accept if $\mathrm{NPV} > 0$ ([[#def-npv]]). The rate is real; do not mix it with inflation.
- The Ramsey formula $r = \rho + \eta g$ splits $r$ into impatience, inequality aversion and growth ([[#prop-ramsey]]). Stern-like and Nordhaus-like calibrations differ by several percentage points and by a factor of three in a hundred-year annuity.
- Descriptive rates match capital returns; prescriptive rates treat $\rho$ as ethics. Both views are live.
- Uncertainty about $r$ or $g$ produces declining certainty-equivalent rates ([[#prop-declining]]). Irreversibility plus learning produces quasi-option value, which often favours waiting to develop ([[#ex-option]]).
- Report NPV at more than one rate. A single $r$ hides the disagreement this chapter is about.
:::


## Exercises

::: exercise A one-year NPV {level=1 check="8"}
A project costs $32$ today and pays $50$ in one year. At $r = 0.25$, compute NPV. (Enter NPV.)
::: solution
$\mathrm{NPV} = -32 + 50/1.25 = -32 + 40 = 8$.
:::
:::

::: exercise A Ramsey rate {level=1 check="0.05"}
A planner uses $\rho = 0.01$, $\eta = 2$ and $g = 0.02$. Compute the Ramsey rate $r$. (Enter $r$ as a decimal.)
::: solution
$r = \rho + \eta g = 0.01 + 2\cdot 0.02 = 0.05$.
:::
:::

::: exercise A perpetuity {level=1 check="20"}
At $r = 0.05$, what is the present value of $1$ a year forever? (Enter the PV.)
::: solution
$\mathrm{PV} = 1/r = 20$.
:::
:::

::: exercise A distant unit {level=2 check="0.02"}
Compute $(1.04)^{-100}$, rounded to two decimal places. (Enter the rounded value.)
::: solution
$(1.04)^{-100} \approx 0.0198$, which rounds to $0.02$. A unit of damage prevented a century hence is worth two cents on the dollar at $4\%$.
:::
:::

::: exercise Quasi-option value {level=2 check="26"}
In [[#ex-option]], what is the quasi-option value of waiting relative to felling today? (Enter that value.)
::: solution
Waiting is worth $126$, felling today is worth $100$, so the quasi-option value is $26$.
:::
:::

::: exercise Certainty-equivalent rate {level=2}
Tomorrow's constant discount rate will be $2\%$ or $6\%$ with equal probability. Explain why the certainty-equivalent rate for a benefit in year $100$ is closer to $2\%$ than to $6\%$, and why this is not the same as using $\E[r] = 4\%$.
::: hint
Compare $\E[e^{-r t}]$ with $e^{-\E[r] t}$.
:::
::: solution
The expected discount factor is $\tfrac12 e^{-2} + \tfrac12 e^{-6} \approx \tfrac12 (0.1353 + 0.0025) \approx 0.0689$, so $r_{\mathrm{ce}}(100) = -\ln(0.0689)/100 \approx 2.67\%$, much nearer the low rate. Using $\E[r] = 4\%$ would give $e^{-4} \approx 0.0183$, less than a third as large. Jensen's inequality on the convex map $r \mapsto e^{-r t}$ is the whole of [[#prop-declining]]: long-horizon present values are dominated by the possibility that $r$ is low.
:::
:::

::: exercise Stern versus Nordhaus on a century {level=3}
Using the two rates in [[#ex-ramsey-numbers]], compute the present-value ratio of a unit of consumption in $100$ years at $1.4\%$ relative to the same unit at $5.5\%$, in continuous time. Interpret the ratio as a disagreement about weights, not about physics.
::: hint
The ratio of discount factors is $e^{-(0.014-0.055)\cdot 100}$.
:::
::: solution
$e^{-1.4}/e^{-5.5} = e^{4.1} \approx 60.3$. A unit in year $100$ receives about sixty times as much weight in the Stern-like present value as in the Nordhaus-like present value. Climate physics, damages and abatement costs can be held fixed; the CBA still disagrees. That is why this chapter treats $r$ as a reported assumption, not as an estimated constant.
:::
:::

::: exercise Distributional weights {level=3 check="140"}
A project costs the rich $100$ today and benefits the poor by $80$ today. The planner's weight on a unit to the poor relative to a unit to the rich is $Y_R/Y_P$ (the case $\eta = 1$). If $Y_R/Y_P = 1.75$, what is the weighted benefit, and is weighted NPV positive? (Enter the weighted benefit.)
::: solution
The weight is $1.75$, so the poor's $80$ counts as $140$. Weighted NPV is $140 - 100 = 40 > 0$. Unweighted NPV is $80 - 100 = -20$ and would reject the project. The weight is a social-welfare parameter, not a market price.
:::
:::
