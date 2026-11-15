A student has one free evening. She can work a paid shift, revise for an examination, or go to a concert with friends. She cannot do all three. That small fact is the whole subject in miniature. **Economics** is the study of how people, firms and governments choose when resources — time, land, labour, machines, attention — are limited and wants are not. The evening is scarce; so is the labour of a nurse, the water in a catchment, and the capacity of a government budget. Once a resource has more than one valuable use, a choice has a cost: the value of what is given up.

This chapter turns that observation into a method. We define scarcity and opportunity cost, draw a production possibility frontier to make a trade-off visible, and show why a decision-maker who can adjust a little at a time should compare **marginal** benefit with **marginal** cost. We then look at incentives, at the use and limits of models, and at the distinction between what *is* and what *ought* to be. Later chapters put prices, markets and the national accounts on top of this scaffolding. The scaffolding itself is the economic way of thinking.

## Scarcity and opportunity cost

A resource is scarce if, at a price of zero, people would want more of it than exists. Clean air in a remote valley may not be scarce in that sense; clean air in a congested city is. Scarcity is a relation between means and ends, not a property of an object. The same barrel of oil is scarce in an industrial economy and would not have been scarce to a society with no use for it.

::: definition Scarcity {#def-scarcity}
A good or resource is **scarce** if, at a zero price, the quantity people would like to use exceeds the quantity available. Economics studies the allocation of scarce means that have alternative uses.
:::

Lionel Robbins put the same idea in a sentence that has been quoted ever since: economics “studies human behaviour as a relationship between ends and scarce means which have alternative uses” (*An Essay on the Nature and Significance of Economic Science*, 1932, p. 16). The clause about alternative uses is the important one. If a means had only one use, there would be nothing to choose.

The cost of a choice is therefore not, in the first instance, the money that changes hands. Money is a convenient measuring rod. The cost that matters for a decision is the value of the next-best alternative that the decision rules out.

::: definition Opportunity cost {#def-opportunity-cost}
The **opportunity cost** of a choice is the value of the best alternative that is given up. It includes both explicit outlays and the implicit value of resources the decision-maker already owns, among them time.
:::

Opportunity cost is forward-looking. What has already been spent, and cannot be recovered, is a **sunk cost** and does not belong in the comparison of remaining alternatives. A student who has already bought a non-refundable ticket still faces a choice about how to spend the evening; the ticket price is gone either way.

::: example A concert and a shift {#ex-concert}
A student can work a three-hour evening shift at a wage of 18 units of money per hour, or attend a concert. The ticket costs 48 units and is not refundable once bought. She has not yet bought the ticket. What is the opportunity cost of going to the concert? After she has bought the ticket, what is the opportunity cost of *attending*?
::: solution
Before she buys the ticket, going to the concert means paying 48 and giving up three hours that would have earned $3 \times 18 = 54$. The opportunity cost is $48 + 54 = 102$ units of money (plus whatever she values the shift less, or more, than the money: if she dislikes the work, the implicit cost of the time is less than 54; if she would have enjoyed the shift, it is more). After the ticket is bought and cannot be resold, the 48 is sunk. Attending then costs only the 54 of lost wages — and the next-best use of the three hours, if that is not work.
:::
:::

The example is arithmetic, but it already contains a modelling choice. We measured the value of time by the wage. That is reasonable when she can work as many hours as she likes at a given wage and has no other valued use of the evening. It is not reasonable if the shift was not on offer, or if the next-best use of the evening was unpaid care for a relative. Opportunity cost is defined by the actual alternatives, not by a line in a ledger.

::: warning Accounting cost is not opportunity cost
A common mistake is to treat the money paid as the whole cost, or to include sunk outlays in a forward-looking decision. The accountant’s cost of a journey is fuel, depreciation and a share of insurance. The economist’s opportunity cost of the same journey is the best alternative use of the fuel, the vehicle and the time. Depreciation that will happen whether or not the journey is made is not part of the decision. Neither is a ticket already bought.
:::

Firms and governments face the same logic. A city that uses a valuable plot of land for a car park forgoes the rent the plot could have earned as housing or a shop. A ministry that assigns its best engineers to one project forgoes their contribution to another. In 2023, according to the World Bank (World Development Indicators, accessed 2026), GDP at current market prices was about USD 27.8 trillion in the United States, USD 18.3 trillion in China, USD 3.5 trillion in India and USD 2.2 trillion in Brazil. Those figures measure production, not well-being, and they do not say what else the same labour and capital could have produced. Opportunity cost is the missing column.

## Trade-offs and the production possibility frontier

When a resource can produce more than one output, the set of feasible combinations can be drawn. The simplest picture is a **production possibility frontier** (PPF): the boundary of what can be produced with given resources and technology, when those resources are used fully and efficiently.

::: definition Production possibility frontier {#def-ppf}
A **production possibility frontier** is the set of output bundles that can be produced with given resources and technology when those resources are fully and efficiently employed. Points inside the frontier are feasible but wasteful; points outside are infeasible. The slope of the frontier is the opportunity cost of one more unit of the good on the horizontal axis, measured in units of the good on the vertical axis.
:::

For a single person the two “goods” can be two uses of time. Suppose a student has 6 hours and can cook 4 meals per hour or read 20 pages per hour. If she spends $c$ hours cooking, she produces $M = 4c$ meals and $P = 20(6 - c)$ pages. Eliminating $c$ gives the frontier

$$
P = 120 - 5M, \qquad 0 \le M \le 24.
$$ {#eq-student-ppf}

Each extra meal costs 5 pages. The opportunity cost is constant because we assumed that every hour is as productive as every other. When resources are specialised — some hours of the day are better for reading, some plots of land better for one crop than another — the frontier bows out, and the opportunity cost of each good rises as more of it is produced. That **increasing opportunity cost** is the usual shape in later chapters; the straight line is the right starting point because the slope is then a single number.

::: widget plot
f: 120-5*x; a-b*x
sliders: a=120:80:140:5; b=5:2:8:0.5
x: 0, 28
y: 0, 140
labels: \text{student PPF}; \text{comparison PPF}
caption: The solid line is [[#eq-student-ppf]]: pages against meals for a 6-hour evening. Move $a$ and $b$ to see a different endowment or a different opportunity cost. Points below the line waste time; points above cannot be reached without more hours or better technique. The slope $-b$ is the page-cost of one meal.
:::

::: example A bowed-out frontier {#ex-bowed}
A small farm can grow maize and beans. With all land in maize it grows 10 tonnes of maize and no beans; with all land in beans, 6 tonnes of beans and no maize. Intermediate allocations, in tonnes $(\text{maize}, \text{beans})$, are $(8, 2)$, $(5, 4)$ and $(2, 5.5)$. Sketch the frontier and compute the opportunity cost of the first 2 tonnes of beans, of the next 2, and of the last 1.5.
::: solution
From $(10, 0)$ to $(8, 2)$ the farm gives up 2 tonnes of maize for 2 tonnes of beans, so the opportunity cost of the first 2 tonnes of beans is 1 tonne of maize per tonne of beans. From $(8, 2)$ to $(5, 4)$ it gives up 3 tonnes of maize for 2 tonnes of beans, an opportunity cost of $1.5$ tonnes of maize per tonne of beans. From $(5, 4)$ to $(2, 5.5)$ it gives up 3 tonnes of maize for 1.5 tonnes of beans, an opportunity cost of 2 tonnes of maize per tonne of beans. From $(2, 5.5)$ to $(0, 6)$ the last 0.5 tonnes of beans cost 2 tonnes of maize, or 4 tonnes of maize per tonne of beans. Opportunity cost rises as beans displace maize on land that is worse and worse for beans. The frontier through these points bows away from the origin.
:::
:::

A movement *along* the frontier is a reallocation of fully used resources. A movement *to* the frontier from inside is a reduction in waste — idle labour, a machine left switched off, a ban that forbids a mutually beneficial swap. A shift *of* the frontier comes from more resources or better technology. Distinguishing those three is a habit this course will need again for demand and supply in [[principles/supply-and-demand]].

The PPF is silent on *which* point on the frontier a society should pick. That choice depends on preferences and, in a market economy, on prices. It is a separate question, taken up when we discuss efficiency and distribution in [[principles/markets-and-welfare]].

## Decisions at the margin

Many choices are not all-or-nothing. A firm decides how many extra units to produce this week; a commuter decides whether to make one more journey; a government decides whether to extend a road by one more kilometre. The relevant comparison is then not total benefit with total cost, but the benefit and cost of the next small step — the **margin**.

::: definition Marginal benefit and marginal cost {#def-marginal}
The **marginal benefit** (MB) of an activity is the additional benefit from one more unit of it. The **marginal cost** (MC) is the additional cost of one more unit. Both are defined holding other things equal, and both can depend on how much of the activity has already been undertaken.
:::

If MB exceeds MC, doing a little more raises net benefit. If MC exceeds MB, doing a little less raises net benefit. When the activity can be varied continuously and the functions are well behaved, the net-benefit maximum occurs where they are equal.

::: proposition The marginal equality {#prop-mb-mc}
Suppose a decision-maker chooses a quantity $x \ge 0$ of an activity, receiving benefit $B(x)$ and bearing cost $C(x)$, both differentiable, with $B$ concave and $C$ convex. Net benefit $B(x) - C(x)$ is maximised at an interior $x^*$ if and only if

$$
B'(x^*) = C'(x^*),
$$ {#eq-mb-mc}

that is, $\mathrm{MB}(x^*) = \mathrm{MC}(x^*)$, and the second-order condition $B''(x^*) - C''(x^*) \le 0$ holds. If $B'(0) \le C'(0)$, the maximum is at $x^* = 0$.
:::

::: proof
Let $N(x) = B(x) - C(x)$. At an interior maximum, $N'(x^*) = 0$, so $B'(x^*) = C'(x^*)$. Concavity of $B$ and convexity of $C$ make $N$ concave, so the first-order condition is sufficient. If $N'(0) \le 0$, then $N$ is decreasing on $[0, \infty)$ and the maximum is at the boundary $x = 0$.
:::

The same condition can be read off a diagram. Plot MB and MC against $x$. The crossing is the candidate optimum. If MB starts above MC and falls while MC rises, the crossing is unique.

::: widget plot
f: 20-2*x; w
sliders: w=12:4:18:1
x: 0, 10
y: 0, 24
labels: \text{MB of study}; \text{MC (forgone wage)}
caption: Marginal benefit of an hour of study, $20 - 2x$, against a constant opportunity cost of time equal to the wage $w$. At $w = 12$ the curves cross at $x = 4$ hours. Raise the wage: the student studies less. The area between MB and MC to the left of the crossing is the net benefit of studying rather than working.
:::

::: example Hours of study {#ex-study}
A student has a paid job at 12 units of money per hour, with as many hours as she wants. The marginal benefit of the $x$-th hour of study, in the same units, is $20 - 2x$, reflecting diminishing returns to extra revision. How many hours should she study? What if the examination is tomorrow and the marginal benefit schedule becomes $28 - 2x$?
::: solution
Set $20 - 2x = 12$. Then $2x = 8$ and $x^* = 4$. The fourth hour is worth 12, equal to the wage; a fifth would be worth 10, which is less. If MB shifts to $28 - 2x$, then $28 - 2x = 12$ gives $x^* = 8$. A higher return to study, holding the wage fixed, lengthens the evening at the desk. The total benefit of study is not needed for the decision; only the margin is.
:::
:::

::: quiz
A commuter can take as many bus journeys as she likes at a fare of 3 units each. The marginal benefit of the first through sixth journey, in the same units, is $15, 11, 8, 6, 2, 1$. How many journeys does she take?
- [ ] 2, because that is where MB first exceeds the fare
- [x] 4, because the fourth journey is the last with $\mathrm{MB} \ge 3$
- [ ] 5, because the fifth journey still has positive MB
- [ ] 6, to use every journey with positive benefit
::: solution
Take every unit for which $\mathrm{MB} \ge \mathrm{MC}$, and stop before the first unit with $\mathrm{MB} < \mathrm{MC}$. The first four journeys have marginal benefits $15, 11, 8, 6$, all at least 3. The fifth has MB of 2, below the fare. She takes four journeys. Discrete units need not hit $\mathrm{MB} = \mathrm{MC}$ exactly; they come as close as the grid allows. Positive MB is not enough: the fifth and sixth journeys still have positive benefit, but not enough to cover the fare.
:::
:::

Marginal reasoning is also how economists think about **sunk costs**. A firm that has spent 50 on a machine which cannot be resold should not add that 50 to the cost of using the machine. Using it has an opportunity cost only if using it wears it out or blocks another use. The 50 is gone.

::: example The unfinished project {#ex-sunk}
A firm has already spent 70 on a project. Completing it will cost a further 40 and will yield revenue of 90. Abandoning it yields 0. The 70 cannot be recovered. Should the firm complete the project?
::: solution
The 70 is sunk. Completing yields $90 - 40 = 50$ of net additional cash; abandoning yields 0. Complete. The accounting total $90 - 110 = -20$ is a loss relative to never having started, but that comparison is no longer available. A different mistake would be to complete a project whose *remaining* cost exceeded remaining benefit, merely to “make the sunk cost worthwhile”.
:::
:::

## Incentives

If the costs or benefits of an action change, people do more or less of it. That statement is an empirical claim, not a moral one, and it is the reason economists look first at **incentives** when a policy changes.

A tax on a good raises the price buyers pay or lowers the price sellers receive, or both; the chapter on [[principles/markets-and-welfare]] computes the split. A subsidy does the reverse. A price ceiling, if it binds, makes the legal price a worse deal for sellers and typically shortens supply. None of these claims says that the policy is good or bad. They say what follows if people respond to the new relative prices.

Incentives operate through more than prices. A performance bonus changes the return to effort. A university that admits students on examination scores raises the return to revision, and also the return to coaching and, in the worst cases, to cheating. A well-designed incentive is aligned with the outcome one actually wants; a poorly designed one is gamed. Later courses on [[information-economics]] and [[public-economics]] treat this as a constraint, not an afterthought.

People differ, and they do not all respond. Some commuters will take the bus at any plausible fare; some will never take it. The economist’s claim is about averages and about the people near the margin — those for whom MB and MC are close, so that a small change in one of them flips the decision. Policy often acts through those people.

::: intuition Who is at the margin?
When a city raises the bus fare by a small amount, the riders who stop riding are those whose marginal benefit was just above the old fare and is now just below the new one. Inframarginal riders — those with much higher MB — continue to ride and simply pay more. A statement about “what people will do” is almost always a statement about the marginal group, whose size is an empirical question.
:::

## Models, ceteris paribus and evidence

A **model** is a simplified description that keeps the mechanism of interest and discards the rest. The demand-and-supply diagram in the next-but-one chapter has two curves and a price. It does not have the colour of the product, the biographies of the traders, or the weather, except insofar as those things shift a curve. The slogan for this discipline is *ceteris paribus*: other things equal.

Models in this course are used in three ways. First, to define terms — equilibrium, elasticity, surplus — so that we know what we are talking about. Second, to derive implications: if demand is linear and supply is linear, a parallel shift of demand raises price and quantity by amounts we can compute. Third, as a template for evidence: the model says which other things must be held equal, or adjusted for, before a correlation can be read as a response to a price.

A model can be useful and false at the same time. The assumption of **price-taking** — that no buyer or seller can move the market price — is false of a village with one grain mill, and a good approximation in a wholesale market with many mills. Judging a model is not a matter of listing the assumptions that are not literally true; it is a matter of asking whether the conclusions still hold approximately when the assumptions are relaxed. That is a theme of [[microeconomics]] and of [[econometrics]].

This atlas is for education only — not investment or financial advice. Illustrative numbers in the examples are invented. When real magnitudes appear, they illustrate a concept, they carry a source and a date, and they are not a forecast.

## Positive and normative claims

::: definition Positive and normative {#def-positive-normative}
A **positive** claim is a claim about what is, was or would be under stated conditions. It is true or false, at least in principle, by evidence. A **normative** claim is a claim about what ought to be. It depends on values as well as on facts.
:::

“A tax of 6 units on this good would reduce the quantity traded from 32 to 24” is positive. “The government should levy that tax” is normative. The first can be checked, given a demand curve, a supply curve and the assumption that the market clears. The second requires a view about whose welfare counts, how inequality is to be weighed, and what else the government might do with the revenue.

Economists have no special authority on the second question. They do have tools for the first, and for a restricted class of normative statements that *take goals as given*: if the goal is to raise a given amount of revenue at the smallest loss of total surplus, then, under stated assumptions, a tax should fall more heavily on the inelastic side of the market ([[principles/elasticity]], [[principles/markets-and-welfare]]). Even that “should” is a should-given-the-goal. The goal itself is a value judgement.

Disputes in economics are of both kinds, and they are easy to mix up. Whether a higher minimum wage reduces employment in a given labour market is a positive question, on which Card and Krueger (1994) and the studies that followed them disagree in magnitude and sometimes in sign. Whether a given employment effect is a price worth paying for higher wages among those who remain employed is a normative question. This course will present competing positive claims with their evidence, and will flag value judgements rather than hide them in the choice of words.

::: quiz
Which of the following is a positive claim?
- [ ] Food should be cheaper.
- [x] Other things equal, a binding price ceiling on food reduces the quantity supplied.
- [ ] It is unfair for landlords to raise rents.
- [ ] The government ought to tax carbon.
::: solution
The second statement is a prediction about quantities, true or false given the model of [[principles/supply-and-demand]]. The other three use “should”, “unfair” and “ought”: they are normative, even if one agrees with them.
:::
:::

## Evidence

The economic way of thinking is a set of questions, not a claim that people are selfish or that markets always work. What the questions have turned up, empirically, is mixed and specific.

People do respond to relative prices. When the price of a staple rises, households in low-income countries typically cut the quantity a little and cut other spending more; the price elasticity of demand for food is negative but often well below one in absolute value (a pattern documented across many settings; see, for example, the estimates surveyed in the next-but-one chapter on [[principles/elasticity]]). When a wage rises in one occupation relative to another, new cohorts move toward the better-paid occupation, though existing workers move more slowly. None of this requires that people optimise like the student in [[#ex-study]]; it requires that *some* people, at the margin, notice a change in the terms.

People also leave money on the table. Laboratory experiments, from the ultimatum game onwards, find that subjects reject unequal splits they could accept at a profit (Güth, Schmittberger and Schwarze, 1982, *Journal of Economic Behavior & Organization*). Field experiments find that default options in pension enrolment change participation sharply, a fact used — and debated — in behavioural public policy (Madrian and Shea, 2001, *Quarterly Journal of Economics*). These findings do not abolish opportunity cost; they qualify the assumption that the decision-maker perceives and acts on it. [[behavioural-economics]] takes up the qualifications.

Macroeconomic magnitudes give a sense of scale for later chapters. In 2023, world GDP at current US dollars was on the order of USD 105 trillion (World Bank WDI, accessed 2026). The same source reports national figures of about USD 27.8 trillion for the United States, USD 18.3 trillion for China, USD 4.6 trillion for Germany, USD 3.5 trillion for India, USD 2.2 trillion for Brazil and USD 1.4 trillion for Indonesia. These are production totals, at market exchange rates, not measures of typical living standards; GDP per person and purchasing-power-parity comparisons tell a different ranking, which [[principles/measuring-the-macroeconomy]] will sort out.

::: history
**1932, Lionel Robbins.** In *An Essay on the Nature and Significance of Economic Science*, Robbins defined economics as the study of human behaviour as a relationship between ends and scarce means that have alternative uses. The definition displaced older ones that tied the subject to “material welfare” or to wealth, and it is the definition this chapter has used. It does not say that ends are selfish, or that markets are the only allocation mechanism; it says that whenever means are scarce and have more than one use, there is an economic problem.
:::

## Where this leads

The next chapter, [[principles/gains-from-trade]], puts two production possibility frontiers side by side and asks when specialisation and exchange raise consumption for both sides. The answer — comparative advantage — is opportunity cost applied to two people or two countries. [[principles/supply-and-demand]] then lets prices do the coordinating, and the rest of the micro half of the course asks when that coordination is efficient and when it is not. The macro half starts from measurement rather than from choice, but the same distinction between a movement along a relationship and a shift of it, and the same insistence on opportunity cost, will return.

If you go further, [[microeconomics]] rebuilds the consumer and the firm from preferences and technology, and [[macroeconomics]] rebuilds aggregate demand and supply with expectations and dynamics. The present chapter is the habit of mind those courses assume.

::: summary
- Scarcity means that means are limited relative to ends and have alternative uses; a zero price would then leave unsatisfied wants.
- The opportunity cost of a choice is the value of the best alternative given up, including implicit costs such as time; sunk costs are not part of a forward-looking decision.
- A production possibility frontier shows the trade-offs implied by full, efficient use of given resources; its slope is a marginal opportunity cost.
- When a quantity can be varied a little at a time, net benefit is maximised by equating marginal benefit to marginal cost (or stopping at the last discrete unit for which $\mathrm{MB} \ge \mathrm{MC}$).
- People at the margin respond to incentives; a policy that changes relative prices or payoffs changes their behaviour, for better or worse.
- Models hold other things equal in order to isolate a mechanism. Positive claims are about what is or would be; normative claims are about what ought to be, and they require value judgements as well as evidence.
:::

## Exercises

::: exercise A lost afternoon {level=1}
A consultant can bill 80 units of money per hour. She spends 2 hours in a queue to buy a ticket that costs 25, then attends a 3-hour match. The ticket cannot be resold. Compute the opportunity cost of (a) the whole outing, evaluated before she joins the queue, and (b) attending the match, evaluated after the ticket is in her hand and the queue is behind her.
::: solution
(a) She gives up 5 hours that could have billed $5 \times 80 = 400$, plus 25 for the ticket, so the opportunity cost is 425. (b) The ticket and the queue are sunk. Attending still costs 3 hours of billing, or 240.
:::
:::

::: exercise A linear PPF {level=1}
A workshop has 10 hours. Each hour can produce 3 chairs or 5 bowls. Write the equation of the PPF with chairs $C$ on the horizontal axis, state the opportunity cost of a chair, and find the maximum number of bowls if 12 chairs are required.
::: solution
Hours: $C/3 + B/5 = 10$, so $B = 50 - \tfrac{5}{3}C$, with $0 \le C \le 30$. The opportunity cost of one chair is $5/3$ bowls. If $C = 12$, then $B = 50 - 20 = 30$ bowls.
:::
:::

::: exercise Discrete hours {level=1}
The marginal benefit of hours of home repair, in units of money, is $40, 28, 19, 12, 6$ for hours 1 through 5. A paid alternative pays 15 per hour. How many hours of repair should be done? What if the wage rises to 20?
::: solution
Compare each hour with 15: 40, 28 and 19 exceed 15; 12 and 6 do not. Do 3 hours. If the wage is 20, only the first two hours (40 and 28) exceed 20; the third hour’s MB of 19 is now below the wage, so do 2 hours.
:::
:::

::: exercise A shift of the frontier {level=2}
In [[#eq-student-ppf]] a new cooker raises cooking productivity from 4 meals per hour to 6, with reading still at 20 pages per hour and 6 hours available. Write the new PPF. Has the opportunity cost of a meal risen or fallen? Illustrate with the page-cost of the 6th meal.
::: solution
$M = 6c$, $P = 20(6-c)$, so $P = 120 - \tfrac{20}{6}M = 120 - \tfrac{10}{3}M$, with $0 \le M \le 36$. The opportunity cost of a meal has fallen from 5 pages to $10/3 \approx 3.33$ pages. The 6th meal used to cost 5 pages and now costs $10/3$ pages. The intercept on the meal axis rises; the intercept on the page axis is unchanged, because reading productivity and hours did not change.
:::
:::

::: exercise MB and a rising MC {level=2 check="5"}
A farmer’s marginal benefit from irrigation water, in units of money per millimetre, is $24 - 2x$, where $x$ is millimetres applied. Marginal cost is $4 + 2x$ (water becomes harder to pump). Find the optimal $x$. (Enter the optimal number of millimetres.)
::: solution
Set $24 - 2x = 4 + 2x$. Then $20 = 4x$, so $x^* = 5$. The second-order condition holds because MB is decreasing and MC is increasing: each extra millimetre is worth less to the crop and costs more to pump. (Enter 5.)
:::
:::

::: exercise Sunk cost and a second offer {level=2}
A theatre has sold a ticket for 30. On the evening of the performance a friend offers 18 for the ticket (the theatre does not refund). The holder values the performance at 20 and has no other costs of attending. Should she attend or sell? What if she values the performance at 15?
::: solution
The 30 is sunk. Attending yields value 20. Selling yields 18. Attend, because $20 > 18$. If she values the performance at 15, sell, because $18 > 15$. The original price never enters.
:::
:::

::: exercise Increasing opportunity cost {level=3}
A coastal region produces fish $F$ and coconuts $K$. Feasible efficient bundles $(F, K)$ are $(0, 12)$, $(4, 11)$, $(8, 8)$, $(12, 3)$ and $(14, 0)$. Compute the opportunity cost of fish, in coconuts per extra fish, on each segment. Explain in one paragraph why the opportunity cost rises, and why a point such as $(8, 6)$ is not on the frontier.
::: hint
Opportunity cost on a segment is the absolute slope $\lvert\Delta K / \Delta F\rvert$. A point below the piecewise-linear frontier wastes resources.
:::
::: solution
From $(0, 12)$ to $(4, 11)$: $\lvert\Delta K/\Delta F\rvert = 1/4$. From $(4, 11)$ to $(8, 8)$: $3/4$. From $(8, 8)$ to $(12, 3)$: $5/4$. From $(12, 3)$ to $(14, 0)$: $3/2$. Opportunity cost rises because the region moves fish production onto waters and labour that are progressively worse for fishing (or progressively better for coconuts). The point $(8, 6)$ has the same fish as $(8, 8)$ but fewer coconuts, so some labour or boats are idle or misallocated; it lies inside the frontier.
:::
:::

::: exercise A normative overlay {level=3}
A city can operate a bus route at a marginal cost of 2 units of money per extra passenger (constant), and the marginal benefit schedule of passengers is $12 - q$ for $q$ passengers. (a) What is the quantity that maximises total surplus $B(q) - C(q)$? (b) If the city charges a fare of 2, will that quantity be reached? (c) A councillor says “fares should be zero so that nobody is excluded”. Using [[#def-positive-normative]], separate the positive claim implied by zero fares from the normative claim, and state one positive consequence of a zero fare given these schedules.
::: hint
Total surplus is maximised at $\mathrm{MB} = \mathrm{MC}$. A zero fare sets the price the passenger pays, not the social cost.
:::
::: solution
(a) $12 - q = 2$ gives $q^* = 10$. (b) Yes: a fare equal to marginal cost leads each passenger to take the trip if and only if MB $\ge 2$, which is the social rule here (no externalities). (c) The normative claim is that exclusion is undesirable and fares ought to be zero. The implied positive claim is that at a fare of 0, passengers ride until $\mathrm{MB} = 0$, so $q = 12$. At $q = 12$, MC is still 2 and MB is 0, so the extra two passengers generate a social loss equal to the area between MC and MB from 10 to 12: $\int_{10}^{12}(2 - (12-q))\,\mathrm{d}q = \int_{10}^{12}(q-10)\,\mathrm{d}q = 2$. Whether that loss is a price worth paying for the distributional goal is a value judgement; the loss itself is a positive consequence.
:::
:::
