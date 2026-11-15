The NPV rule of [[corporate-finance/capital-budgeting]] treats a project as a now-or-never bundle: take the four-year path today, or take nothing. Many projects are not that bundle. The firm can wait a year and then decide; it can build a small plant and expand if demand is there; it can abandon and recover scrap. Those choices are **real options** — options on real assets — and they have a present value that a static NPV sets to zero by ignoring them. This chapter values three standard options, to delay, to expand and to abandon, on a one-step decision tree. The numbers are invented; the trees are illustrations of an identity, not a reason to wait, expand or walk away from any project. The atlas is for education only — not investment or financial advice.

A financial call option, priced in [[derivatives/options]], is the right to buy a claim for a strike. A real option is the same logical object with a factory in place of the claim and an investment outlay in place of the strike. The analogy is useful and incomplete. Real options are usually not traded, so the replicating-portfolio argument that delivers a unique option price in a complete market is not free. This chapter uses a decision tree at a stated discount rate, which is the corporate-finance workhorse, and then says what the workhorse leaves out.

Stewart Myers (1977) observed that a firm’s investment opportunities are call options, and that risky debt can distort the exercise decision — the overhang of [[corporate-finance/capital-structure]]. Dixit and Pindyck’s *Investment under Uncertainty* (1994) is the book-length statement of waiting as an option.

## Static NPV as a special case

::: definition Static NPV and a real option {#def-real-option}
A **static NPV** is the net present value of a project computed as if the cash-flow path were a take-it-or-leave-it bundle chosen at date $0$. A **real option** is the right, but not the obligation, to take a real-investment action (invest, expand, abandon, switch) at a later date, after some uncertainty has been resolved. The **expanded NPV** is static NPV plus the present value of embedded real options. Assumptions of the tree calculations below: a named set of states, named probabilities, a single discount rate $r$ on every branch, and no option to reshape the tree other than the action being valued.
:::

When the option to wait has no value — because the project evaporates if not taken today, or because there is no uncertainty, or because waiting has no cost and no gain — expanded NPV and static NPV coincide. When waiting is feasible and uncertainty is resolved by waiting, they need not.

::: example A project with zero static NPV {#ex-static}
A fictional project costs $100$ units today and pays, in one year, either $140$ or $80$ with equal probability. The discount rate is $10$ percent. What is static NPV if the project must be taken today?
::: solution
Expected payoff next year is $0.5 \times 140 + 0.5 \times 80 = 110$. Present value $110 / 1.10 = 100$. Static NPV is $-100 + 100 = 0$. The NPV rule is indifferent. The calculation treats the $100$ as sunk the moment the decision is taken, and it treats the two branches as a lottery the firm is committed to. Both treatments will be relaxed.
:::
:::

The same project, with an option to wait, is a different object.

## The option to delay

::: proposition Value of the option to delay {#prop-delay}
Suppose the project of [[#ex-static]] can be delayed one year: the outlay of $100$ is then paid only if the firm invests, and it invests only in the state it chooses. With a $10$ percent discount rate and equal probabilities, the present value of the project-with-the-option is $\tfrac12 \times \max(140-100, 0) / 1.10 = 18.18$, and the option to delay is worth $18.18$ relative to static NPV of zero. Assumptions: the opportunity does not evaporate or attract a rival; the $100$ outlay does not change; the two states are equally likely; the same $r$ discounts both branches; there is no cash flow during the waiting year.
:::

::: proof
In the high state the firm invests and nets $40$; in the low state it walks away and nets $0$. Expected payoff next year is $20$, worth $20/1.10 \approx 18.18$ today. Static NPV was $0$, so the option’s incremental value is $18.18$. The $\max(\cdot, 0)$ is the call-option payoff with strike $100$ on an underlying that will be $140$ or $80$.
:::

::: example Invest now or wait {#ex-delay}
Using the project of [[#ex-static]], compare (i) invest today, (ii) wait one year and invest only in the high state. What is the value of waiting? What would waiting be worth if the low-state payoff were $90$ rather than $80$?
::: solution
(i) is static NPV $= 0$. (ii) is worth $18.18$, from [[#prop-delay]]. Waiting is strictly better, in this illustration, by $18.18$. If the low payoff is $90$, static NPV is $-100 + (0.5 \times 140 + 0.5 \times 90)/1.10 = -100 + 104.545 = 4.545$. Waiting still pays $40$ only in the high state, still worth $18.18$, which remains larger than $4.545$. Waiting is preferred even though static NPV is now positive: a positive static NPV is not a sufficient reason to invest *today* when waiting is feasible. The $40$ of high-state surplus is kept either way; waiting avoids the $10$ of low-state *negative* NPV ($-100 + 90/1.10 \approx -18.18$ if one were forced to invest in the low state today, in present-value terms the low state contributes $40.91 - 50 = -9.09$ to the static $4.545$). The option’s value is the value of not taking that bad branch.
:::
:::

::: widget plot
f: -100+(0.5*(s+x))/1.10; 0.5*max(s-100,0)/1.10+0.5*max(x-100,0)/1.10
sliders: s=140:100:180:5
x: 50, 130
y: -40, 50
hlines: 0
labels: \text{static NPV}; \text{value of waiting}
caption: Static NPV (invest today) and the value of waiting, as functions of the low-state payoff x, with the high-state payoff s on a slider. Waiting is a horizontal line until x exceeds 100 (when the firm would invest in the low state too). Static NPV rises with x. The crossing is where the firm is indifferent. Invented payoffs, not a market.
:::

::: warning A positive static NPV is not a now-or-never command
The NPV rule of the capital-budgeting chapter was stated for a stand-alone project with no option to wait. Applying it to a project that *can* wait, and investing because static NPV is positive, forgoes the option. The correct comparison, when waiting is feasible, is between investing today and the *expanded* NPV of waiting. Static NPV $> 0$ is necessary for investing today only if the option to wait is worthless. McDonald and Siegel (1986) made the same point in a continuous-time model: even a project with positive static NPV is not exercised until the underlying is sufficiently far in the money, because exercise kills the option.
:::

::: quiz
A project has static NPV of $5$ and an option to delay worth $12$ if the project is not taken today. Investing today is worth, relative to waiting,
- [ ] $5$, so the firm should invest
- [x] $5 - 12 = -7$, so waiting is better in this comparison
- [ ] $12$, because the option is added to NPV
- [ ] $5 + 12 = 17$, the expanded NPV of investing today
::: solution
Investing today collects the static $5$ and *kills* the option, so its value relative to waiting is $5$ minus the $12$ the option is worth. Expanded NPV of *waiting* is $12$ (static NPV of not investing today is $0$, plus the option). Expanded NPV of investing today is $5$, without the option. The comparison is $5$ against $12$, not $5$ against $0$.
:::
:::

## Expand and abandon

::: definition Options to expand and to abandon {#def-expand-abandon}
An **option to expand** is the right to make a further outlay, after information arrives, in exchange for additional cash flows. An **option to abandon** is the right to stop a project and collect a salvage (or to avoid a continuation cost). Both are valued, on a tree, by replacing a committed branch-payoff with the $\max$ of that payoff and the alternative (expand; salvage).
:::

::: proposition Abandonment as a put {#prop-abandon}
Take the project of [[#ex-static]], committed today (outlay $100$ now), but with the right to abandon next year for salvage $90$ instead of collecting the operating payoff. With equal probabilities and $r = 10$ percent, expanded NPV is $-100 + (0.5 \times 140 + 0.5 \times 90)/1.10 = 4.545$. The abandonment option is worth $4.545$ relative to static NPV of zero. It is a put on the operating payoff with strike $90$.
:::

::: proof
In the high state the firm keeps $140 > 90$; in the low state it takes $90 > 80$. Expected payoff $115$, present value $104.545$, minus the $100$ outlay. The increment over static NPV is the present value of the $10$ of extra cash in the low state, $5 / 1.10 \approx 4.545$.
:::

::: example Expansion as a call {#ex-expand}
The firm has invested. Next year, in the high state only, it may spend an extra $50$ to obtain an extra $80$ of cash (same date). In the low state expansion is not available, or is not worthwhile. With equal probabilities and $r = 10$ percent, what is the expansion option worth today?
::: solution
The extra payoff is $\max(80-50, 0) = 30$ in the high state and $0$ in the low state. Present value $0.5 \times 30 / 1.10 \approx 13.64$. That $13.64$ is added to whatever the base project is worth. If the base project is the zero-static-NPV plant of [[#ex-static]], expanded NPV is $13.64$ with the expansion option and without abandonment or delay. The extra $80$ and the extra $50$ are invented; the calculation is the present value of a call with strike $50$ on an $80$-or-nothing underlying.
:::
:::

::: example A two-action tree {#ex-tree}
Helios can (i) invest $100$ today in a plant that pays $140$ or $80$ next year with equal probability, (ii) wait, as in [[#prop-delay]], or (iii) invest today with abandonment salvage $90$, as in [[#prop-abandon]]. Rank the three expanded NPVs at $r = 10$ percent.
::: solution
(i) static NPV $= 0$. (ii) delay $= 18.18$. (iii) invest-and-abandon $= 4.545$. Waiting is the most valuable of the three in this illustration, because it avoids the $100$ outlay in the low state entirely, whereas abandonment recovers only $90$ of a $100$ that has already been spent. Abandonment would rank higher if salvage were close to (or above) the outlay, or if waiting were impossible. The ranking is a ranking of three named trees, not a recommendation to wait on any plant.
:::
:::

Decision trees of more than one step are the same object iterated. At each node the firm chooses the action that maximises the continuation value, working **backwards** from the last date — dynamic programming, as in [[mathematical-economics/dynamic-optimisation]]. A two-step tree with expansion at date $1$ and abandonment at date $2$ is solved by first putting $\max(\text{operate}, \text{salvage})$ at date $2$, then $\max(\text{expand}, \text{not})$ at date $1$, then the date-$0$ choice between investing and waiting. The algebra is not harder; the number of nodes is.

::: intuition Kill the option or keep it
Exercise — investing, expanding, abandoning — is a decision to swap an option for its intrinsic value. The swap is right when intrinsic value exceeds the option’s continuation value, and wrong when it does not. Static NPV reports intrinsic value of investing today, and reports it as if continuation value were zero. The whole of real-options analysis is the refusal of that zero.
:::

## What the tree leaves out

A single discount rate on every branch is a strong assumption. The option to delay is a call, and a call’s risk *changes* as it moves in and out of the money: in the high state of [[#prop-delay]] the firm’s claim is a $40$ net payoff, in the low state it is $0$. Blending those with a project $r$ that was estimated from a committed plant is an approximation. In a complete market the call is priced by replication, or under a risk-neutral probability, as in [[derivatives/binomial-model]]; the physical probabilities and a risk-adjusted $r$ are then the wrong pair, unless they have been chosen to match. For a real option that cannot be replicated — because the underlying plant is not traded — there is no unique no-arbitrage price, and the tree at a stated $r$ is a model, not a market value.

Competition erodes delay. If waiting invites a rival to take the site, the option to delay is less valuable and may be worth zero; static NPV is then restored as the right now-or-never comparison. The same logic applies to patents that expire and to learning that a rival can do instead. Dixit and Pindyck’s waiting result is a result about a *monopolist* on the opportunity.

Interest-rate and cash-flow risk that unfold continuously, rather than in one step, are handled in the continuous-time models; the qualitative lesson is the same (a hurdle rate above $r$, a delay despite static NPV $> 0$) and the quantitative lesson is not (the hurdle depends on volatility, on $r$, and on the project’s lost cash while waiting). Using a one-step tree to produce a number for a long-lived natural-resource project is a sketch, not an estimate.

::: remark Strategic options
Some “options” are game-theoretic: the value of investing today is that it deters a rival, or that it does not. The decision tree then has to include the rival’s action, and the right tool is an extensive-form game, as in [[game-theory]]. Treating a strategic investment as a one-player option to delay can get the sign wrong: waiting may *invite* entry. The chapter’s trees are one-player trees.
:::

::: application A licence that expires
Northbridge holds a fictional one-year licence to develop a site. After a year the licence expires and the opportunity is gone. The option to delay is then worthless, and the comparison collapses to static NPV. A ten-year licence on the same site, with the same $140$-or-$80$ uncertainty resolved next year and then remaining, restores delay as an option. The legal length of the opportunity is an input to the tree, as material as the $100$ outlay. Treating a short-lived licence as a Dixit–Pindyck waiting problem is a domain error.
:::

## Evidence

Real-options *language* is common in natural resources, pharmaceuticals, and R&D, where delay, abandonment and expansion are contractible (a mine that can be mothballed; a drug that can fail a trial; a follow-on indication). Quantitative use of option-pricing formulae is less common than the language. Graham and Harvey (2001) found that a minority of their CFO respondents reported using real-options techniques, against a majority using NPV and IRR. Subsequent surveys have found similar gaps. The gap is not a test of the theory; it is a finding about reported practice, in a particular population.

Quigg (1993, *Journal of Finance*) estimated that the option to wait to develop urban land in Seattle was a material fraction of the undeveloped land’s value, in a sample from the late 1970s and 1980s — an empirical analogue of [[#prop-delay]]. Moel and Tufano (2002, *Review of Financial Studies*) studied gold-mine closings and reopenings and found that they responded to prices and costs in the direction the abandonment option predicts, though not at the exact thresholds of a calibrated model. The studies are evidence that flexibility has a price in two particular markets. They are not a calibration of Helios’s plant.

::: history
Myers (1977, *Journal of Financial Economics*) named real options and linked them to debt overhang. Brennan and Schwartz (1985, *Journal of Business*) priced a mine as an option on the commodity. McDonald and Siegel (1986, *Quarterly Journal of Economics*) and, at book length, Dixit and Pindyck (1994) made waiting-to-invest the organising application. The decision-tree presentation used here is older operations-research practice; the option interpretation is what ties the tree to the rest of corporate finance.
:::

## Where this leads

A financial option on a traded underlying is priced by no-arbitrage in [[derivatives/options]] and [[derivatives/binomial-model]]. The cost of capital of [[corporate-finance/risk-and-return]] is, in an option, no longer a constant: the option’s beta moves. Governance and capital structure return through overhang: the *exercise* of a real option can be distorted by the claims that sit on it, which is Myers’s original point. Capital budgeting, with this chapter in hand, is the static NPV of [[corporate-finance/capital-budgeting]] plus the trees of this one, when the trees apply.

::: summary
- Static NPV treats a project as now-or-never. Expanded NPV adds the present value of options to delay, expand or abandon.
- The option to delay is a call on the project with strike equal to the outlay. A positive static NPV is not a sufficient reason to invest today when waiting is feasible and valuable.
- Abandonment is a put with strike equal to salvage. Expansion is a further call.
- Trees are solved backwards. A single $r$ on every branch is an approximation; replication, when it is available, is the cleaner pricing argument.
- Competition, expiry of a licence, and untraded underlyings all limit the value of waiting.
- Every tree in this chapter is invented. A calculated option value is not a recommendation to wait, expand or abandon.
:::

## Exercises

::: exercise Static NPV {level=1 check="0"}
Using $(-100$ today, $140$ or $80$ next year, equal probabilities, $r = 10$ percent$)$, what is static NPV?
::: solution
$-100 + 110/1.10 = 0$.
:::
:::

::: exercise Delay {level=1 check="18.18"}
For the same project, the option to delay (invest next year only in the high state) is worth how much today, rounded to two decimal places?
::: solution
$0.5 \times 40 / 1.10 = 18.1818\ldots$, which rounds to $18.18$.
:::
:::

::: exercise Abandonment {level=1 check="4.55"}
Invest today, with salvage $90$ in the low state. What is expanded NPV, rounded to two decimal places?
::: solution
$-100 + 115/1.10 = -100 + 104.5454 = 4.5454$, which rounds to $4.55$.
:::
:::

::: exercise Expansion {level=2 check="13.64"}
Using [[#ex-expand]], what is the expansion option worth today, rounded to two decimal places?
::: solution
$0.5 \times 30 / 1.10 = 13.636\ldots$, which rounds to $13.64$.
:::
:::

::: exercise Ranking {level=2}
Rank static NPV, delay, and invest-and-abandon in [[#ex-tree]]. In one sentence, why is delay worth more than abandonment in that illustration?
::: solution
Delay $18.18$, abandon $4.55$, static $0$. Delay avoids spending the $100$ in the low state; abandonment recovers only $90$ after the $100$ has been spent.
:::
:::

::: exercise A higher salvage {level=2 check="13.64"}
If salvage is $110$ rather than $90$, what is the expanded NPV of invest-and-abandon, rounded to two decimal places? (Equal probabilities, $r = 10$ percent, high payoff $140$, outlay $100$ today.)
::: solution
The firm now abandons in the low state ($110 > 80$) and operates in the high state ($140 > 110$). Expected payoff $0.5 \times 140 + 0.5 \times 110 = 125$. Expanded NPV $-100 + 125/1.10 = -100 + 113.636 = 13.636$, which rounds to $13.64$. Salvage above the outlay makes abandonment valuable even in a present-value sense at date $1$; whether such a salvage is available is part of the illustration, not a property of plants.
:::
:::

::: exercise Waiting with a positive static NPV {level=3}
The low payoff is $90$, the high payoff $140$, the outlay $100$, $r = 10$ percent, equal probabilities. Compute static NPV and the value of waiting. Which is larger, and what does that say about the NPV rule as a now-or-never command?
::: hint
Static NPV was computed in [[#ex-delay]]; waiting is still $\max(140-100,0)$ in the high state only.
:::
::: solution
Static NPV is $-100 + 115/1.10 = 4.545$. Waiting is $20/1.10 = 18.18$. Waiting is larger. The NPV rule “accept if static NPV $> 0$” would invest today and forgo an option worth $18.18$ in exchange for $4.545$. The rule as stated in [[corporate-finance/capital-budgeting]] assumed there was no such option. When there is, the comparison is expanded NPV of investing today versus expanded NPV of waiting.
:::
:::

::: exercise A two-step sketch {level=3}
A project can be started today for $50$, producing a base cash flow next year of $40$ or $20$ with equal probability. At date $1$ the firm may expand, paying $30$ for an extra cash flow at date $2$ of $50$ in the high state and $10$ in the low state. There is no other cash at date $2$, and no expansion is possible unless the project was started at date $0$. The discount rate is $10$ percent on every branch. Working backwards, should the firm expand in each date-$1$ state? What is the expanded NPV of starting today, including the expansion option?
::: hint
At each date-$1$ node compute $\max(\text{do not expand}, \text{expand})$. Then discount the chosen continuation back, add the date-$1$ base cash flow, and subtract the $50$.
:::
::: solution
High state at date $1$: expansion costs $30$ and pays $50$ at date $2$, worth $50/1.10 \approx 45.45$ at date $1$, so expansion’s NPV at that node is $45.45 - 30 = 15.45 > 0$; expand. Low state: expansion pays $10$ at date $2$, worth $9.09$, NPV $9.09 - 30 = -20.91 < 0$; do not expand. Continuation values at date $1$, including the base cash flow, are $40 + 15.45 = 55.45$ (high) and $20 + 0 = 20$ (low). Expected date-$1$ value $37.725$, worth $37.725/1.10 = 34.30$ at date $0$. Expanded NPV $34.30 - 50 = -15.70$. Starting today is negative-NPV even with the expansion option, in this illustration: the base project is not good enough to carry the option. (Waiting, if it were available, would have to be valued as a further alternative; this exercise does not add it.)
:::
:::
