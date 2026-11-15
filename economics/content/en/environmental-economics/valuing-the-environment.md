A wetland filters nutrients, stores carbon, hosts migratory birds and gives hikers a place to walk. None of those services is sold on a market. A cost–benefit analysis that counted only the developer's willingness to pay for the land would treat the wetland as worth whatever a warehouse would pay, and nothing else. **Valuation** is the set of methods that try to recover the missing numbers — not because a bird has a posted price, but because a decision that ignores the bird is a decision that prices it at zero.

This chapter is about *what* is being measured and *how*. The total economic value of an environmental good splits into use, option and non-use (existence, bequest) values. **Revealed-preference** methods — travel cost, hedonic pricing, averting behaviour — read values from real choices. **Stated-preference** methods — contingent valuation, choice experiments — ask people. Both families rest on the welfare measures of [[microeconomics/slutsky-and-welfare]]: compensating and equivalent variation, which coincide with consumer surplus when income effects are small. Both families have identification problems that a number in a table can hide.

A valuation estimate is an input to [[environmental-economics/cost-benefit-analysis]], not a moral ranking of species. Whether a particular good *ought* to be traded is a separate question from what people would give up to keep it.

## Total economic value

::: definition Total economic value {#def-tev}
The **total economic value** (TEV) of an environmental good is the sum of **use value** (actual, on-site or in-situ use: recreation, harvest, amenity), **option value** (willingness to pay to keep the option of future use under uncertainty; Weisbrod 1964), and **non-use value**. Non-use splits into **existence value** (Krutilla 1967: value from knowing that a good persists, without any plan to use it) and **bequest value** (value from leaving the good to others). TEV is a classification of motives in a preference relation, not a biological account of the good.
:::

Use values can in principle be recovered from behaviour. Non-use values cannot: there is no trip, no house purchase, no defensive expenditure that traces existence value. That is why stated preference exists, and why it is controversial. Option value is a *use* concept under uncertainty; it is not the same as the **quasi-option value** of Arrow and Fisher (1974) and Henry (1974), which is the value of delaying an irreversible decision in order to learn, and which belongs in [[environmental-economics/cost-benefit-analysis]].

::: remark Accounting prices are not market prices
The $p_S$ in green NNP ([[environmental-economics/environment-and-economy#def-green-nnp]]) is an **accounting price** (a shadow price): the increment to social welfare of a marginal unit of the stock. A valuation exercise is an attempt to estimate that shadow price, or the area under a demand curve that the shadow price helps to trace. It is not an observation of a posted price, and it is not a recommendation to create a market in the good.
:::

For a *marginal* change in a marketed good, willingness to pay (WTP) and willingness to accept (WTA) coincide. For a non-marginal change in a non-marketed environmental good they need not: WTA to forgo a loss is often several times WTP to obtain a gain (Horowitz and McConnell, *Journal of Environmental Economics and Management*, 2002). Loss aversion, income effects, and the absence of a budget constraint on WTA are competing explanations. A study should say which measure it reports.

## Revealed preference: travel cost

::: definition Travel-cost method {#def-travel-cost}
The **travel-cost method** (Hotelling's 1947 letter to the US National Park Service; Clawson and Knetsch 1966) treats the cost of reaching a recreational site — out-of-pocket travel, plus the opportunity cost of time — as the implicit price of a visit. Variation in that price across origins traces a demand curve for visits. The area under the demand curve down to the visitor's own price is that visitor's consumer surplus from the site.
:::

A simple single-site model is $v_i = \alpha - \beta c_i + \mathbf{x}_i'\gamma + u_i$, where $v_i$ is visits by person or zone $i$, $c_i$ is travel cost, and $\mathbf{x}_i$ are demographics. Consumer surplus for visitor $i$ is $v_i^2/(2\beta)$ when demand is linear. Random-utility (RUM) models of site *choice* (McFadden) handle many sites and substitution; they are the modern default.

::: example A linear trip demand {#ex-travel}
A visitor's demand for days at a reserve is $v = 10 - 0.5\, c$, where $c$ is travel cost in units of money per day-trip. The visitor lives at a distance that makes $c = 8$ when the entry fee is zero. The choke price (where $v=0$) is $c = 20$. Compute annual consumer surplus at a zero fee, and the surplus loss if a fee of $4$ is introduced (raising $c$ to $12$).
::: solution
At $c = 8$, $v = 6$. Surplus is the triangle of height $20-8 = 12$ and base $6$: $\mathrm{CS} = \tfrac12 \cdot 12 \cdot 6 = 36$. At $c = 12$, $v = 4$, $\mathrm{CS} = \tfrac12 \cdot 8 \cdot 4 = 16$. The loss is $20$. Of that loss, the fee collected is $4 \cdot 4 = 16$ (a transfer) and the deadweight loss is $4$. The travel-cost estimate of the *site's* value to this visitor, at a zero fee, is $36$ per year — provided the linear demand is right and time has been costed correctly.
:::
:::

::: widget plot
f: 20 - 2*x
x: 0, 12
y: 0, 24
shade: 0, 6
labels: \text{inverse demand}
caption: Quantity of visits is on the horizontal axis, travel cost on the vertical — the inverse of $v = 10 - 0.5 c$. The shaded triangle is consumer surplus at $c = 8$ (six visits). Raise the implied price (a fee, a longer drive) and the triangle shrinks. The method lives or dies on whether travel cost is the right price and whether substitutes have been modelled.
:::

The method's wounds are well known. The opportunity cost of time is not a posted wage for people who are not on the margin of the labour market. Multi-purpose trips (the reserve *and* a relative) contaminate $c_i$. People who live near a site may have sorted there because they like it (endogenous location). And travel cost recovers *use* value only. A non-visitor's existence value for the reserve is invisible.

## Revealed preference: hedonics and averting behaviour

::: definition Hedonic pricing {#def-hedonic}
A **hedonic** regression decomposes the price of a differentiated product — typically a house — into implicit prices of its attributes, including environmental attributes (air quality, noise, proximity to a park or a landfill). Rosen (1974) showed that, under perfect information, free mobility and a continuous choice of attributes, the derivative of the hedonic price function with respect to an attribute equals the marginal WTP for that attribute *at the chosen bundle*. Ridker and Henning (1967) is the classic air-quality application.
:::

A typical specification is $\ln P_i = \mathbf{z}_i'\beta + \gamma A_i + u_i$, where $A_i$ is ambient quality at house $i$. Then $\partial P/\partial A = \gamma P$, an implicit price in units of money per unit of $A$. Moving from the implicit price to the *demand curve* for $A$ requires a second stage that Rosen outlined and that identification has not been kind to (Bartik 1987; Epple 1987). Most policy work uses the first-stage implicit price as a local measure of marginal WTP and does not claim to have traced the whole demand curve.

::: example An implicit price of $\mathrm{PM}_{10}$ {#ex-hedonic}
A hedonic log-price equation on a city's houses gives $\widehat{\gamma} = -0.008$ on $\mathrm{PM}_{10}$ (micrograms per cubic metre). At a house with price $P = 200{,}000$ (units of money), what is the first-stage implicit price of a $1\,\mu\mathrm{g\,m^{-3}}$ reduction in $\mathrm{PM}_{10}$? What would you need in order to value a *non-marginal* clean-up that cuts $\mathrm{PM}_{10}$ by $15$ units city-wide?
::: solution
$\partial P/\partial \mathrm{PM}_{10} = \gamma P = -0.008 \times 200{,}000 = -1{,}600$. A $1$-unit reduction is associated with a $1{,}600$ higher house price at this bundle. That is a marginal WTP only under Rosen's conditions, and only for households who chose this bundle. A $15$-unit city-wide cut is non-marginal: it shifts the whole hedonic surface, so using $15 \times 1{,}600 = 24{,}000$ per house is a linear extrapolation, not a second-stage welfare measure. It also capitalises only *use* values that home-buyers perceive and can sort on. Non-residents' values, and health effects buyers do not know about, are missing.
:::
:::

**Averting-behaviour** (defensive-expenditure) methods use purchases of filters, bottled water or medical care as a lower bound on the value of reducing a risk. They bound rather than identify WTP, because the defensive good is an imperfect substitute for the environmental good and because health is produced with other inputs.

::: example Bottled water as a bound {#ex-averting}
Households in a city with unreliable tap water spend $60$ a year on bottled water, which reduces (but does not eliminate) exposure to pathogens. A proposed treatment plant would make the tap safe. Why is $60$ a *lower* bound on WTP for the plant, not a point estimate?
::: solution
Bottled water is an imperfect substitute: it does not cover cooking, bathing or the anxiety of guests drinking from the tap, and it has its own inconvenience. Households who do not buy bottles may still value safer tap water. The $60$ is what some households pay for a partial, privately supplied reduction in risk; WTP for a complete public reduction is at least as large for those households, and is positive for others. Adding up bottle expenditure over buyers is therefore a lower bound, and it misses non-use and non-buyer use values entirely.
:::
:::

::: warning Correlation is not a hedonic price
Houses near parks are expensive. Parks are also near other amenities, and rich people sort into nice neighbourhoods. A regression of $P$ on distance-to-park without rich controls, spatial fixed effects, or a quasi-experiment (a new park, a new road, a Clean Air Act threshold as in Chay and Greenstone, *Journal of Political Economy*, 2005) is a correlation. Chay and Greenstone's mid-1980s TSP-non-attainment design is the template for taking [[#def-hedonic]] to data: the implicit price is estimated from a policy-driven change in air quality, not from the cross-section of hills and wind.
:::

## Stated preference

::: definition Contingent valuation and choice experiments {#def-cv}
**Contingent valuation** (CV) asks a survey sample what they would pay (or accept) for a specified change in an environmental good, in a hypothetical market or referendum. **Choice experiments** (choice modelling) present repeated discrete choices among bundles of attributes, including a cost attribute, and recover marginal WTP from the ratio of coefficients in a RUM. Both are **stated-preference** methods: the data are answers, not transactions.
:::

Davis (1963) on hunting in Maine is an early CV study. The *Exxon Valdez* oil spill (1989) made the method a courtroom object. The NOAA panel (Arrow, Solow, Portney, Leamer, Radner and Schuman, 1993) recommended referendum formats, reminder of budget, tests for scope (WTP should rise with the size of the good), and conservative design. Carson, Mitchell and others' *Exxon Valdez* CV study, and Hausman's (2012) critique "Contingent Valuation: From Dubious to Hopeless" (*Journal of Economic Perspectives*), still mark the two poles of the argument.

::: example A referendum CV {#ex-cv}
A random sample of $800$ households is asked: "Would you vote for a programme that restores $20$ km of river at a cost of $L$ added to your water bill?" Split samples face $L \in \{10, 20, 40, 80\}$. Yes-shares are $0.78$, $0.61$, $0.39$, $0.18$. Using a linear-in-cost probit is more than we need here: interpolate the median WTP, the $L$ at which the yes-share is $0.5$.
::: solution
The yes-share crosses $0.5$ between $L = 20$ ($0.61$) and $L = 40$ ($0.39$). Linear interpolation: $0.61 - 0.5 = 0.11$ of a $0.22$ drop occurs over $20$ units of $L$, so median WTP $\approx 20 + 20\cdot(0.11/0.22) = 30$. Mean WTP requires a parametric tail and is more sensitive to how the upper bid is handled. The NOAA instinct is to emphasise the median in a referendum, because a majority vote is what the question mimicked. Whether $30$ per household is a number a court should use depends on scope tests, protest zeros, and whether non-use motives were the ones the survey described.
:::
:::

::: intuition Hypothetical bias and cheap talk
People overstate WTP when the payment is not collected. Meta-analyses (List and Gallet 2001; Murphy et al. 2005) put hypothetical-to-actual ratios around $2$–$3$ on average, with a wide range. Cheap-talk scripts, certainty calibration and incentive-compatible mechanisms (a real referendum, a binding Becker–DeGroot–Marschak device in the lab) are the usual treatments. They reduce the gap; they do not always close it. A CV number should be presented with that caveat attached, not as a market observation.
:::

Choice experiments help on *which attributes* people value — water clarity versus fish species versus access — and they make the budget constraint visible in every card. They do not escape hypothetical bias, and they add their own: attribute non-attendance, design effects, and the risk of putting a price on an attribute the respondent had never thought about.

::: quiz
Which environmental value can travel-cost and hedonic methods *not* recover, even in an ideal data set?
- [ ] Recreational use of a national park
- [ ] The amenity value of local air quality for residents
- [x] Existence value for an Antarctic species that the respondent will never see
- [ ] The time-and-fuel cost of visiting a beach
::: solution
Revealed preference needs a real choice whose cost traces the good. Existence value, by definition, involves no such choice. Stated preference is the only family that even tries; whether it succeeds is the debate around [[#def-cv]].
:::
:::

## Benefit transfer and the value of a statistical life

Most agencies cannot run a new CV study for every project. **Benefit transfer** copies an estimate from a study site to a policy site, sometimes with an income adjustment $WTP_p = WTP_s (Y_p/Y_s)^\varepsilon$. Transfers across dissimilar sites have been found to err by $40\%$ and more (Rosenberger and Loomis, various meta-analyses). The honest use is as a placeholder with a wide band, not as a substitute for a study when the stake is large.

Health benefits dominate many air-quality appraisals, and they are usually monetised with a **value of a statistical life** (VSL): the marginal WTP for a small reduction in mortality risk, scaled to one "statistical" death. US labour-market hedonic wages and stated-preference studies have produced VSLs of the order of several million dollars (in recent USD); the US EPA has used figures around USD $7$–$11$ million in 2020s guidance, depending on the year and update (EPA, *Guidelines for Preparing Economic Analyses*, and related VSL memos). A VSL is not the value of an identified person, and it is not a recommendation about whose life to save. It is a local slope of a WTP function for risk. Using a rich-country VSL unchanged in a low-income country is a value judgement (about whose WTP counts), not an identification result; some agencies adjust for income, some do not, and the two practices should not be confused.

## Evidence

Travel-cost estimates of recreation are routinely in the tens of units of money per trip for local sites and higher for unique destinations; they move with travel prices and with the wage used for time (Parsons, handbook chapters in Champ, Boyle and Brown). Hedonic air-quality implicit prices in US cities are typically a fraction of a percent of house value per unit of $\mathrm{PM}$ or ozone, but they are sensitive to spatial confounding; quasi-experimental estimates (Chay and Greenstone 2005; subsequent work on the Clean Air Act) are smaller than some cross-sectional hedonics and more credible as causal capitalisation.

On CV, Carson and Hanemann and colleagues have argued that well-designed referendum studies pass scope tests and predict actual referendum votes. Hausman (2012) and Diamond and Hausman (1994) argue that embedding, sequencing and hypothetical bias make the numbers unsuitable for damages. The NOAA panel sat between them. A fair summary of the subsequent literature is that stated preference can recover *orderings* and *attribute trade-offs* more reliably than *levels*, and that levels should be stress-tested against a revealed-preference analogue whenever one exists.

Valuation in low- and middle-income countries is no longer a blank. Travel-cost and contingent studies exist for Kenyan and South African parks, Indian urban lakes, Chinese scenic sites and Brazilian forests, among others (Whittington's work on water WTP in Africa and Latin America is the methodological starting point). Benefit transfer from OECD studies to these sites, unadjusted, is the procedure most likely to be wrong.

## Where this leads

A WTP number becomes a benefit in a net present value, which requires a discount rate and a stance on uncertainty and irreversibility ([[environmental-economics/cost-benefit-analysis]]). Climate damages used in integrated assessment ([[environmental-economics/climate-economics]]) are a valuation exercise at planetary scale, with the same revealed-versus-stated and use-versus-non-use problems, plus a discounting dispute. None of the methods in this chapter licenses a particular policy on its own.

::: history
**1947, Harold Hotelling.** In a letter to the US National Park Service, Hotelling proposed using travel costs to trace demand for parks. Clawson and Knetsch (1966) turned the letter into a method.

**1967, John Krutilla.** "Conservation Reconsidered" (*American Economic Review*) introduced existence value and argued that uniqueness and irreversibility put a wedge between development NPV and conservation NPV.

**1993, NOAA panel.** Arrow, Solow, Portney, Leamer, Radner and Schuman set the design rules that contingent-valuation practice still cites, in the aftermath of *Exxon Valdez*.
:::

::: summary
- TEV = use + option + non-use (existence, bequest). Revealed preference sees use; non-use requires stated preference ([[#def-tev]]).
- Travel cost treats the cost of a visit as a price and recovers visitor surplus; time-costing, multi-purpose trips and substitution are the main threats ([[#def-travel-cost]]).
- A hedonic first stage gives a local implicit price of an amenity under Rosen's conditions; it is not a demand curve, and it is not causal without a design ([[#def-hedonic]]).
- Contingent valuation and choice experiments can in principle capture non-use value; hypothetical bias, scope and embedding are why the NOAA panel's rules exist ([[#def-cv]]).
- Benefit transfer and the VSL are practical tools with large documented errors when sites or incomes differ. A valuation is an estimate of a shadow price, not a posted price and not a moral ranking.
:::

## Exercises

::: exercise A travel-cost surplus {level=1 check="25"}
Demand for visits is $v = 10 - 0.5 c$. A visitor faces travel cost $c = 10$. Compute consumer surplus. (Enter CS.)
::: solution
Visits are $v = 5$. The choke price is $c = 20$. $\mathrm{CS} = \tfrac12 \cdot (20-10) \cdot 5 = 25$.
:::
:::

::: exercise A fee's deadweight loss {level=1 check="4"}
In the previous exercise a fee of $4$ is added, so $c$ rises from $10$ to $14$. Compute the deadweight loss of the fee (not including the fee revenue). (Enter the DWL.)
::: solution
At $c = 14$, $v = 10 - 7 = 3$. The fee cuts visits from $5$ to $3$. DWL is the triangle of base $2$ and height $4$: $\tfrac12 \cdot 2 \cdot 4 = 4$. Revenue $4 \cdot 3 = 12$ is a transfer.
:::
:::

::: exercise A hedonic implicit price {level=1 check="2400"}
$\ln P = \text{controls} - 0.006\, A$, where $A$ is a pollution index. At $P = 400{,}000$, what is $\lvert \partial P / \partial A \rvert$? (Enter the implicit price as a positive number.)
::: solution
$\partial P/\partial A = -0.006 \times 400{,}000 = -2{,}400$, so the implicit price of a one-unit *reduction* is $2{,}400$.
:::
:::

::: exercise Median WTP {level=2 check="30"}
Yes-shares at bids $10$, $20$, $40$, $80$ are $0.78$, $0.61$, $0.39$, $0.18$. Linearly interpolate the median WTP as in [[#ex-cv]]. (Enter the median.)
::: solution
The crossing of $0.5$ lies between $20$ and $40$. $0.61-0.5 = 0.11$ of a $0.22$ drop: $20 + 20 \times 0.5 = 30$.
:::
:::

::: exercise Benefit transfer {level=2 check="80"}
Study-site mean WTP is $50$. Policy-site income is $60\%$ higher and the income elasticity of WTP is $1$. Using $WTP_p = WTP_s (Y_p/Y_s)^\varepsilon$, compute transferred WTP. (Enter the transferred WTP.)
::: solution
$Y_p/Y_s = 1.6$ and $\varepsilon = 1$, so $WTP_p = 50 \times 1.6 = 80$. With a smaller elasticity the transferred number would be closer to $50$; unadjusted transfer ($\varepsilon = 0$) would copy $50$ and ignore the income gap.
:::
:::

::: exercise WTP versus WTA {level=2}
A household's WTP to prevent the loss of a local wood is $200$. Its WTA to allow the wood to be felled is $700$. Give two reasons, one from standard theory and one from behavioural evidence, why the two numbers can differ, and say which number a compensation tribunal might use.
::: solution
In standard theory WTP is constrained by income while WTA is not, so for a non-marginal loss of a good with no close substitute the Hicksian measures diverge (Hanemann 1991). Prospect theory adds loss aversion: giving up an endowment is weighted more heavily than acquiring it. A tribunal that aims to restore the household to the original indifference curve is using WTA (compensating variation for a loss). A project appraisal that asks whether winners could compensate losers often uses WTP, which is smaller. The gap is a reason to report both, not to pick the one that favours a preferred verdict.
:::
:::

::: exercise From implicit price to a non-marginal change {level=3}
A first-stage hedonic gives $\partial P/\partial A = 1{,}000$ at the mean house. A clean-up would raise $A$ by $10$ units for every house. Why is $10{,}000$ per house not, in general, the welfare gain? What extra structure would make it a good approximation?
::: hint
Rosen's second stage; also general-equilibrium shifts of the hedonic surface.
:::
::: solution
The $1{,}000$ is a *marginal* WTP at the chosen bundle. A $10$-unit shift is large: diminishing marginal WTP would make the trapezoid smaller than $10 \times 1{,}000$, and the whole hedonic surface $P(A,\mathbf{z})$ will shift as all buyers re-sort, so even the local slope changes. The $10{,}000$ figure is a linear, partial-equilibrium extrapolation. It is a reasonable approximation for a *small* change in a *small* location (so the city-wide surface is approximately fixed) when the first stage is causal. For a city-wide clean-up one needs either a second-stage demand or a sorting model (Epple, Sieg and co-authors).
:::
:::

::: exercise A VSL from a wage differential {level=3 check="5"}
A hedonic wage study finds that a $1/100{,}000$ increase in annual occupational fatality risk is associated with a wage premium of $50$ units of money per year. Compute the implied VSL in millions of units. (Enter the VSL in millions, so $5$ million is entered as $5$.)
::: solution
WTP for a $1/100{,}000$ risk reduction is $50$ per year. Scaling by $100{,}000$ gives a VSL of $5{,}000{,}000$, i.e. $5$ million. The calculation assumes a linear WTP-for-risk schedule, no confounding of the wage differential, and that the sample's preferences apply to the policy population.
:::
:::

::: exercise Scope test {level=3}
A CV study reports mean WTP of $40$ to protect $10$ km of river and $42$ to protect $100$ km, in independent samples. What is a scope test, does this study pass a strong one, and what does the NOAA panel recommend in this situation?
::: solution
A scope test asks whether WTP rises with the size of the good. Here the rise is $2$ on a tenfold increase — statistically perhaps noise, economically implausible if the kilometres are similar. The study fails a *strong* (proportional) scope test and barely suggests a *weak* (positive) one. The NOAA panel recommended that studies demonstrating insensitivity to scope not be used for damages. Possible diagnoses: embedding (respondents give a warm-glow amount for "doing something for rivers"), a budget-reminder failure, or a genuine satiation of use value with a large existence-value lump. A choice experiment that varies kilometres as an attribute, with a cost attribute, is the usual next design.
:::
:::

