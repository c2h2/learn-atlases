Firm A can spend $100$ units today on a plant that, in the firm’s planning spreadsheet, produces a cash inflow of $40$ units at the end of each of the next four years. Should the firm spend the $100$? The time-value chapter already turned the four inflows into a present value; this chapter names the difference between that present value and the $100$ as **net present value**, treats NPV as a decision rule under stated assumptions, and compares it with the rules managers still cite — payback, internal rate of return, profitability index. It then asks a prior question: *which* cash flows belong in the $40$s. Incremental cash flow is an economic idea, not an accounting residual, and it is where capital budgeting usually goes wrong.

The plant, the $100$ and the $40$s are invented. A positive NPV at a stated discount rate is not a recommendation to build a plant, and a ranking of two fictional projects is not advice about a capital budget. The atlas is for education only — not investment or financial advice. The discount rate is taken as given until [[corporate-finance/risk-and-return]]. Flexibility — the option to wait, expand or abandon — is ignored until [[corporate-finance/real-options]]; a static NPV that treats the four-year path as a take-it-or-leave-it bundle understates a project that can be reshaped after date $0$.

Irving Fisher’s separation argument, recalled in [[corporate-finance/time-value-of-money]], is why a firm with access to a competitive capital market can rank projects by present value at a market rate without first asking each owner how impatient they are. When that market is missing, or when cash flows are risky in ways the market does not span, the ranking is no longer a sufficient statistic. The rest of the course is largely about those missing pieces.

## Net present value

::: definition Net present value {#def-npv}
The **net present value** of a project with cash flows $(C_0, C_1, \dots, C_T)$, discounted at a constant rate $r$ for its risk class, is

$$
\mathrm{NPV}(r) = \sum_{t=0}^{T} \frac{C_t}{(1+r)^{t}}.
$$ {#eq-npv}

The **NPV rule**, under the assumptions of this section, is: accept a stand-alone project if $\mathrm{NPV}(r) > 0$; reject it if $\mathrm{NPV}(r) < 0$; and, among mutually exclusive projects in the same risk class, choose the one with the highest NPV. Assumptions: cash flows are incremental to the firm, dated correctly, and in the same units as $r$ (all real or all nominal); $r$ matches the risk class; capital markets allow Fisher separation; there is no option value from delaying or reshaping the project.
:::

Linearity of present value, from [[corporate-finance/time-value-of-money]], makes NPV additive across projects that do not interact. Two plants that share a bottleneck, or a new product that cannibalises an old one, interact: the NPV of the pair is not the sum of the NPVs computed in isolation. Additivity is recovered by putting the interaction into the incremental cash flows of the pair.

::: proposition NPV as a function of the discount rate {#prop-npv-slope}
For a **conventional** project — $C_0 < 0$ and $C_t \ge 0$ for $t \ge 1$, with at least one inflow strictly positive — $\mathrm{NPV}(r)$ is strictly decreasing in $r$ for $r > -1$, $\mathrm{NPV}(0)$ is the undiscounted sum of the cash flows, $\mathrm{NPV}(r) \to C_0 < 0$ as $r \to \infty$, and there is a unique $r > -1$ at which $\mathrm{NPV}(r) = 0$.
:::

::: proof
Differentiating [[#eq-npv]] term by term, $\mathrm{NPV}'(r) = -\sum_{t=1}^{T} t C_t (1+r)^{-(t+1)}$. For a conventional project every term in the sum is non-negative and at least one is positive, so $\mathrm{NPV}'(r) < 0$. Continuity and the two limits give a unique root by the intermediate-value theorem.
:::

That unique root is the internal rate of return, defined below. For unconventional streams — a decommissioning cost at the end, or a project that starts with an inflow — NPV need not be monotone and may cross zero more than once, or not at all.

::: example Helios Ltd’s plant {#ex-helios}
Helios Ltd, fictional, faces $C = (-100, 40, 40, 40, 40)$. Compute NPV at $0$, $10$ and $20$ percent. At which of these rates does the NPV rule accept the plant?
::: solution
The inflows are a four-year annuity of $40$. At $r = 0$, $\mathrm{NPV} = 60$. At $r = 10$ percent,

$$
\mathrm{NPV} = -100 + 40 \cdot \frac{1 - (1.10)^{-4}}{0.10} = -100 + 126.79461785 = 26.79461785,
$$

about $26.79$ units. At $r = 20$ percent, $\mathrm{NPV} \approx 3.55$ units. The plant has positive NPV at all three rates, so the rule accepts it at each of them. The present value of the inflows at $10$ percent is $126.79$; the profitability index, defined below, is $1.27$. None of these figures is a reason to build a plant. They are the present values of an invented path at three invented rates.
:::
:::

::: widget plot
f: -100+40/(1+x)+40/(1+x)^2+40/(1+x)^3+40/(1+x)^4
x: 0, 0.5
y: -40, 70
hlines: 0
labels: \text{NPV}
caption: NPV of Helios’s invented plant as a function of the discount rate r. The curve falls and crosses zero at the internal rate of return, a little above 21 percent. Raise r in your head, or drag along the curve: distant inflows are punished more, and NPV falls. Illustrative cash flows, not a forecast.
:::

::: intuition NPV is a market-value increment
Under Fisher separation, a positive-NPV project raises the present value of the owners’ wealth by that NPV, because the owners can finance the outlay in the capital market and pocket the surplus as a present value. The statement is about a complete, competitive market and a correctly measured incremental stream. It is not a statement that the firm’s quoted equity value will rise by the NPV the day the project is announced; that would require the market to have been unaware of the project and to share the spreadsheet.
:::

## Payback, IRR and the profitability index

Managers, in surveys cited below, report using several rules. The textbook task is to say when those rules agree with NPV and when they do not.

::: definition Payback, IRR and profitability index {#def-alternatives}
The **payback period** is the first time $T_p$ at which the undiscounted cumulative cash flow $\sum_{t=0}^{T_p} C_t$ is non-negative. **Discounted payback** uses discounted cash flows. The **internal rate of return** (IRR) is a root of $\mathrm{NPV}(r) = 0$. The **profitability index** (PI) is the present value of inflows divided by the present value of outflows (for a conventional project, $\bigl(\mathrm{NPV}(r) - C_0\bigr)/(-C_0)$).
:::

Payback ignores cash flows after $T_p$ and ignores dating before $T_p$. A project that returns the outlay on the last day of year two and then nothing, and a project that returns the outlay on the same day and then a large third-year inflow, share a payback of two years; NPV does not. A short payback cutoff can therefore reject a long-lived positive-NPV project and accept a short-lived negative-NPV one. Discounted payback restores dating but still ignores the tail.

::: proposition IRR and NPV for a conventional project {#prop-irr}
For a conventional project the IRR exists and is unique, and $\mathrm{NPV}(r) > 0$ if and only if $r < \mathrm{IRR}$. The NPV rule at discount rate $r$ and the IRR rule “accept if $\mathrm{IRR} > r$” therefore agree on stand-alone conventional projects.
:::

::: proof
Immediate from [[#prop-npv-slope]]: NPV is strictly decreasing, positive below the unique root and negative above it.
:::

Agreement on stand-alone conventional projects is the beginning of the comparison, not the end. Mutually exclusive projects, different scales, different timing, and unconventional cash-flow signs all break the agreement.

::: example Helios’s IRR {#ex-helios-irr}
Compute the IRR of $(-100, 40, 40, 40, 40)$. Does the IRR rule at a $10$ percent cost of capital agree with NPV?
::: solution
Solve $-100 + 40\bigl(1-(1+\rho)^{-4}\bigr)/\rho = 0$, or $\bigl(1-(1+\rho)^{-4}\bigr)/\rho = 2.5$. Newton’s method from $\rho_0 = 0.20$ converges to $\rho \approx 0.2186$, about $21.86$ percent. Because $21.86 > 10$, the IRR rule accepts, and so does NPV ($26.79 > 0$). The two rules agree here because the project is conventional and stand-alone. They are two readings of the same present-value polynomial, not two independent sources of information.
:::
:::

::: widget newton
f: -100+40/(1+x)+40/(1+x)^2+40/(1+x)^3+40/(1+x)^4
method: newton
x0: 0.10
steps: 8
x: -0.2, 0.5
y: -40, 80
caption: Newton’s method for the IRR of Helios’s plant: the root of NPV(r) = 0. Step through the iteration from r = 0.10; the root is about 21.86 percent. Invented cash flows.
:::

::: example Mutually exclusive plants {#ex-mutex}
Helios can build at most one of two plants, A and B, each costing $80$ units today.

- A: $(-80, 30, 30, 30, 30)$
- B: $(-80, 10, 20, 40, 60)$

At $r = 10$ percent, which has the higher NPV? Which has the higher IRR? At what rate do the NPVs cross?
::: solution
$\mathrm{NPV}_A(0.10) \approx 15.10$ and $\mathrm{NPV}_B(0.10) \approx 16.65$, so B has the higher NPV at $10$ percent. A’s cash flows are a scale of Helios’s original plant: IRR of A is again about $21.86$ percent. B’s IRR is the root of $\mathrm{NPV}_B(\rho) = 0$; Newton’s method gives about $18.0$ percent, *below* A’s IRR. The IRR rule would pick A; the NPV rule at $10$ percent picks B.

The crossing rate solves $\mathrm{NPV}_A(r) = \mathrm{NPV}_B(r)$, or $\mathrm{NPV}_{A-B}(r) = 0$, where $A-B$ has cash flows $(0, 20, 10, -10, -30)$. That IRR is about $12.63$ percent. For discount rates below $12.63$ percent, B has the higher NPV; above it, A does. IRR, being a single number per project, cannot see the crossing. Scale and timing are why: A front-loads cash, B back-loads it, and a low discount rate cares about the tail.
:::
:::

::: warning Ranking by IRR
Using IRR to rank mutually exclusive projects, or to allocate a scarce capital budget, is the most common operational mistake with the measure. IRR is a *rate*, invariant to scale: doubling a project’s cash flows leaves IRR unchanged and doubles NPV. A small, high-IRR project can have a smaller NPV than a large, lower-IRR project. When projects differ in timing, as in [[#ex-mutex]], even equal-scale IRRs disagree with NPV at some discount rates. The profitability index ranks correctly when the scarce resource is date-$0$ cash and projects are otherwise independent; it does not rank correctly when the constraint is of a different kind, or when projects interact. NPV, computed from incremental cash flows at the right $r$, is the ranking that matches value-additivity.
:::

Descartes’ rule of signs implies that the number of positive IRRs is at most the number of sign changes in the cash-flow list. A stream $(-100, 230, -132)$ has two sign changes and two IRRs, $10$ percent and $20$ percent. NPV is slightly *negative* at $r = 0$, slightly *positive* between the two roots (about $0.19$ at $15$ percent), and negative again above $20$ percent as $r \to \infty$ sends NPV to $-100$. The IRR rule “accept if $\mathrm{IRR} > r$” has no well-defined comparison when there are several roots: $15$ percent lies between the two IRRs and NPV is positive there, while $5$ percent lies below both IRRs and NPV is negative. NPV remains well-defined at every $r$.

::: quiz
A conventional stand-alone project has IRR $18$ percent. The discount rate is $12$ percent. The NPV rule
- [ ] rejects, because $18 > 12$ means the project is “too risky”
- [x] accepts, because for a conventional project $\mathrm{IRR} > r$ if and only if $\mathrm{NPV}(r) > 0$
- [ ] cannot be applied until payback is known
- [ ] accepts if and only if payback is shorter than the cutoff
::: solution
[[#prop-irr]] is the comparison. The $18$ percent is a root of the present-value polynomial, not a measure of risk; risk, if it is in the calculation at all, sits in the $12$ percent. Payback is a different functional of the cash-flow list and is not needed for the NPV rule.
:::
:::

## Incremental cash flows

The $C_t$ in [[#eq-npv]] are **incremental** cash flows: cash the firm has with the project minus cash the firm has without it. Several regular mistakes are ways of violating that subtraction.

::: definition Incremental cash flow {#def-incremental}
An **incremental cash flow** at date $t$ is the difference in the firm’s cash at $t$ caused by accepting the project. It includes: cannibalisation of existing sales; side-effects on costs; changes in net working capital (inventory, receivables, payables) that reverse at the end of the project; after-tax proceeds from the sale of assets, including tax on the difference between sale price and tax book value; opportunity costs of assets the firm already owns and would otherwise sell or rent. It excludes: allocated overhead that does not change; interest (financing is in $r$, or in a separate tax shield); sunk costs incurred whether or not the project proceeds.
:::

Depreciation is not cash, but it affects tax. If $t_c$ is the corporate tax rate used in the illustration and $\mathrm{Dep}_t$ is tax depreciation in period $t$, the depreciation tax shield is $t_c \mathrm{Dep}_t$. Operating cash flow is often written $(\mathrm{Rev} - \mathrm{Cost} - \mathrm{Dep})(1-t_c) + \mathrm{Dep}$, which is $(\mathrm{Rev}-\mathrm{Cost})(1-t_c) + t_c \mathrm{Dep}$. The two writings are the same. Inflation belongs in both the cash-flow forecast and the discount rate, or in neither, as in the time-value remark on real and nominal rates.

::: example Sunk cost and opportunity cost {#ex-sunk}
Helios spent $15$ units last year on a design study. The plant would occupy a building Helios could sell today for $20$ units, after tax. The spreadsheet’s “investment” line is the $100$ of physical capital. What date-$0$ cash flow belongs in the NPV?
::: solution
The $15$ is sunk: it is gone whether or not the plant is built, so it is not incremental. The building is an opportunity cost: accepting the plant means not collecting $20$ today. The date-$0$ cash flow is $-100 - 20 = -120$, not $-100$ and not $-115$. Including the $15$ would punish the plant for a cost it does not cause; excluding the $20$ would treat a scarce building as free. The $20$ is an illustrative after-tax sale price, not a property appraisal.
:::
:::

::: example Working capital {#ex-nwc}
A project requires $10$ units of extra inventory at date $0$, recovered at date $3$ when the project ends. Operating cash inflows, already after tax and excluding this item, are $40$ a year for three years. The physical investment is $80$, with no salvage. At $r = 10$ percent, what is NPV?
::: solution
Cash flows are $(-90, 40, 40, 50)$: the extra $10$ of inventory is an outflow at date $0$ and an inflow at date $3$. NPV is

$$
-90 + 40/1.10 + 40/1.10^{2} + 50/1.10^{3} \approx 16.97.
$$

Omitting the inventory would report cash flows $(-80, 40, 40, 40)$ and an NPV of about $19.47$, overstating value by the present-value cost of tying up $10$ units for three years, $10 - 10/1.10^{3} \approx 2.49$. Working capital is a timing difference, not a permanent loss, but timing has a present value.
:::
:::

::: remark Equivalent annual annuity
Projects of different lives, if they are repeatable, are not ranked by the NPV of a single cycle. The **equivalent annual annuity** (EAA) of a project with NPV equal to $V$ over $n$ years at rate $r$ is the ordinary-annuity payment $C$ satisfying $C\bigl(1-(1+r)^{-n}\bigr)/r = V$. Comparing EAAs ranks the per-year value of repeating each cycle, under the assumption that each project can be replicated on the same terms. If replication is impossible — a one-off site, a changing technology — the EAA comparison is the wrong tool and the right comparison is the NPV of the feasible chain of replacements, or a real-option analysis of the replacement date.
:::

::: application Equivalent annual cost
A fictional municipality can buy a machine that costs $90$ units, lasts three years, and has no salvage, or a machine that costs $140$ units, lasts five years, and has no salvage. Operating costs are identical. At $r = 8$ percent the present-cost of the three-year machine is $90$, with EAA of cost $90 \times 0.08 / \bigl(1-1.08^{-3}\bigr) \approx 34.90$ per year; the five-year machine has EAA of cost $140 \times 0.08 / \bigl(1-1.08^{-5}\bigr) \approx 35.06$ per year. The three-year machine has the lower equivalent annual cost in this illustration. The comparison assumes each machine can be replaced on the same terms at the end of its life. It is not a procurement recommendation.
:::

## Sensitivity, scenarios and the limits of a spreadsheet

A single NPV is a point estimate of a present value. **Sensitivity analysis** moves one input at a time — a sales volume, a discount rate, a cost — and records NPV. **Scenario analysis** moves several inputs together, as they would move in a named state of the world (“recession”, “boom”). **Break-even** analysis asks what value of one input makes NPV zero. None of these is a probability. A tornado chart of sensitivities is a map of the spreadsheet’s derivatives, useful for seeing which assumption the NPV is a hostage to. It does not turn the NPV into an expected value under a joint distribution; that would need the distribution.

Monte Carlo simulation draws the inputs from a joint distribution and produces a distribution of NPV. The output is only as good as the joint distribution, including the correlations. Treating every input as independent typically understates the probability of very bad and very good NPVs. Treating a discount rate as random *and* also putting risk into the cash-flow distribution is a way of double-counting risk, unless the rate is a risk-free rate and the cash flows are already in a risk-neutral measure — a distinction that belongs to [[asset-pricing]] and [[derivatives]].

::: example A one-at-a-time sensitivity {#ex-sensitivity}
Helios’s plant has NPV $26.79$ at $r = 10$ percent with inflows of $40$. If the inflow is $35$ each year instead, NPV is $-100 + 35 \times 3.169865 \approx 10.95$. If it is $30$, NPV is about $-4.90$. The break-even annual inflow solves $C \times 3.169865 = 100$, so $C \approx 31.55$. A $10$ percent fall in the inflow, from $40$ to $36$, cuts NPV from $26.79$ to about $14.11$, a $47$ percent fall. NPV is levered with respect to the operating inputs because the outlay is fixed. The arithmetic identifies the inflow as a sensitive assumption. It does not assign a probability to $C = 31.55$.
:::

::: quiz
A project’s NPV is computed at a $10$ percent discount rate using expected cash flows. Sensitivity analysis shows that NPV is negative if sales volume falls $20$ percent. Which conclusion follows?
- [ ] The project should be rejected, because a $20$ percent fall is possible
- [ ] The discount rate should be raised by $20$ percent
- [x] The NPV is sensitive to sales volume; without a probability for that fall, the sign of expected NPV has not been shown to change
- [ ] Payback is a better rule when NPV is sensitive
::: solution
Sensitivity identifies a hostage assumption. It does not, by itself, change the expected cash flows that went into the original NPV. Rejecting because a bad path exists would reject almost every project; raising $r$ by the same percentage as the volume fall has no present-value foundation; payback ignores the tail rather than modelling it. A scenario with an assigned probability *would* change expected cash flows, and then NPV should be recomputed from those.
:::
:::

## Evidence

Graham and Harvey’s survey of 392 CFOs (*Journal of Financial Economics*, 60, 2001) found that IRR and NPV were the two most frequently cited capital-budgeting tools (about three-quarters of respondents “always or almost always” used each), with payback still used by a majority. Large firms and firms with MBAs in the finance function reported more use of NPV and of CAPM costs of capital; small firms reported more use of payback. The survey is a picture of *reported* practice among mostly US firms around 1999, not a picture of what those firms’ capital budgets actually maximised, and not a sample of firms in India, Brazil, China or Nigeria, where subsequent surveys have found payback even more persistent. The persistence of payback is often attributed to liquidity constraints, to incentive systems that reward short-horizon cash, and to mistrust of long-horizon forecasts — reasons that, if true, are agency and information problems, not demonstrations that payback ranks projects by present value.

::: history
Irving Fisher’s *The Theory of Interest* (1930) is the present-value foundation. Joel Dean’s *Capital Budgeting* (1951) brought discounted-cash-flow methods into the managerial literature. Jack Hirshleifer (1958, *Journal of Political Economy*) clarified the ranking of mutually exclusive projects and the pitfalls of IRR when capital markets are imperfect. The equivalent-annual-annuity comparison of different lives is older engineering-economy practice, standardised in textbooks by the 1960s. Stewart Myers (1977) pointed out that a static DCF treats the project as a now-or-never bundle and so misses the option value of waiting — the subject of [[corporate-finance/real-options]].
:::

## Where this leads

The discount rate $r$ is still an input. [[corporate-finance/risk-and-return]] constructs it from a cost of equity and a cost of debt, as a WACC. Capital structure in [[corporate-finance/capital-structure]] asks whether the financing mix changes $V$ itself, and whether the tax shield belongs in the cash flows or in the WACC. Real options in [[corporate-finance/real-options]] restore the flexibility that a static NPV sets to zero. Incremental cash flow, once it includes side-effects on other units of the firm, is also an agency question: who inside the firm has an incentive to report the cannibalisation? That is [[corporate-finance/governance]].

::: summary
- NPV is the present value of incremental cash flows including the initial outlay. Under Fisher separation and a matching discount rate, the NPV rule maximises owners’ wealth on stand-alone projects.
- For a conventional project, NPV is strictly decreasing in $r$ and the IRR rule “accept if $\mathrm{IRR} > r$” agrees with NPV. The agreement fails for mutually exclusive projects, for unconventional sign patterns, and when ranking by a rate rather than by a value.
- Payback ignores the tail and (unless discounted) ignores dating. It can contradict NPV.
- Incremental cash flow is with-versus-without: include opportunity costs, cannibalisation and working capital; exclude sunk costs and interest.
- Sensitivity and scenarios map the spreadsheet’s assumptions. They are not probabilities unless a probability is supplied.
- Every project in this chapter is fictional. A positive NPV at an invented rate is not a recommendation to invest.
:::

## Exercises

::: exercise NPV at 10 percent {level=1 check="26.79"}
Using Helios’s cash flows $(-100, 40, 40, 40, 40)$ and $r = 10$ percent, what is NPV, rounded to two decimal places?
::: solution
$-100 + 40(1-1.10^{-4})/0.10 = -100 + 126.7946 = 26.7946$, which rounds to $26.79$.
:::
:::

::: exercise Payback {level=1 check="2.5"}
What is the (undiscounted) payback period of $(-100, 40, 40, 40, 40)$, in years?
::: solution
Cumulative cash: $-100$, $-60$, $-20$, $+20$. Payback falls in year three: $2 + 20/40 = 2.5$ years.
:::
:::

::: exercise Profitability index {level=1 check="1.27"}
For the same Helios project at $r = 10$ percent, what is the profitability index, rounded to two decimal places?
::: solution
Present value of inflows is $126.79$, outlay $100$, so $\mathrm{PI} = 1.2679$, which rounds to $1.27$. Equivalently $1 + 26.79/100$.
:::
:::

::: exercise A larger copy {level=2 check="64.97"}
A project has cash flows $(-200, 80, 80, 80, 80)$ — Helios scaled by two. What is NPV at $8$ percent, rounded to two decimal places?
::: solution
$-200 + 80(1-1.08^{-4})/0.08 = -200 + 264.9701 = 64.9701$, which rounds to $64.97$. IRR is unchanged at about $21.86$ percent; NPV has doubled relative to Helios at the same rate only if the rate is $10$ percent. At $8$ percent the original Helios NPV is $32.49$ and this project is exactly twice that.
:::
:::

::: exercise Mutually exclusive NPVs {level=2}
For plants A and B in [[#ex-mutex]], confirm that $\mathrm{NPV}_B(0.10) > \mathrm{NPV}_A(0.10)$ and that A has the higher IRR. Which plant does the NPV rule pick at $10$ percent?
::: solution
$\mathrm{NPV}_A(0.10) \approx 15.10$, $\mathrm{NPV}_B(0.10) \approx 16.65$. IRR of A is about $21.86$ percent; IRR of B is about $18$ percent. The NPV rule at $10$ percent picks B. The IRR ranking picks A and disagrees.
:::
:::

::: exercise Sunk or incremental {level=2 check="-120"}
In [[#ex-sunk]], the design study cost $15$ and the building could be sold for $20$ after tax. The physical capital costs $100$. What date-$0$ cash flow belongs in the NPV? (Enter the signed cash flow.)
::: solution
$-100 - 20 = -120$. The $15$ is sunk.
:::
:::

::: exercise Two IRRs {level=3 check="0.19"}
A project has cash flows $(-100, 230, -132)$. Confirm that $10$ percent and $20$ percent are both IRRs. What is NPV at $15$ percent, rounded to two decimal places? Does the rule “accept if $\mathrm{IRR} > r$” have a well-defined answer at $r = 15$ percent?
::: hint
Substitute $r = 0.10$ and $r = 0.20$ into [[#eq-npv]]. Descartes’ rule of signs permits two positive roots because the stream changes sign twice.
:::
::: solution
At $r = 0.10$: $-100 + 230/1.10 - 132/1.21 = -100 + 209.0909 - 109.0909 = 0$. At $r = 0.20$: $-100 + 230/1.20 - 132/1.44 = -100 + 191.6667 - 91.6667 = 0$. At $r = 0.15$: $-100 + 230/1.15 - 132/1.3225 = -100 + 200 - 99.8110 = 0.1890$, which rounds to $0.19$. NPV is positive *between* the two IRRs. The comparison “$\mathrm{IRR} > r$” is not well-defined: both IRRs exceed $15$ percent, but that is also true at $r = 5$ percent, where NPV is negative (about $-0.68$). NPV at $15$ percent is well-defined and positive; the IRR rule is not.
:::
:::

::: exercise Equivalent annual annuity {level=3 check="7.24"}
A repeatable three-year project has NPV $18$ at $r = 10$ percent. What is its equivalent annual annuity, rounded to two decimal places?
::: hint
Solve $C \bigl(1-1.10^{-3}\bigr)/0.10 = 18$.
:::
::: solution
$C = 18 \times 0.10 / \bigl(1 - 1.10^{-3}\bigr) = 1.8 / 0.248685 = 7.238$, which rounds to $7.24$. Comparing this $C$ with the EAA of another repeatable project of a different life ranks the two on a per-year basis, under the replication assumption in the remark above.
:::
:::
