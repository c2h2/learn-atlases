The last chapter maximised total surplus at the competitive quantity *on the assumption* that the demand curve is social benefit and the supply curve is social cost. That assumption fails when a transaction imposes costs or benefits on people who are not party to it, or when a good, once provided, can be used by others at no extra cost. **Externalities** and **public goods** are the two textbook names for those failures. In both cases the competitive quantity is the wrong quantity, and there is a case — not a proof that any particular ministry will get it right — for a tax, a subsidy, a regulation, a property right, or public provision.

This chapter defines a negative and a positive externality, computes a **Pigouvian tax** in the linear market already in use, states the **Coase theorem** with its transaction-cost caveat, and then turns to public goods, the free-rider problem, and common resources. The treatment is positive: it says where private markets misallocate, and what instruments close the gap in a model. Whether those instruments should be used, and at what level, depends on the size of the externality, the cost of the instrument, and value judgements about distribution.

## Externalities

::: definition Externality {#def-externality}
An **externality** is a cost or benefit of a decision that falls on someone who is not a party to the decision and is not compensated (or charged) through a market. It is **negative** if the unpriced effect is a cost (smoke, congestion, infection) and **positive** if it is a benefit (vaccination of one’s neighbours, bees pollinating an orchard). **Marginal external cost** (MEC) is the external cost of one more unit; **marginal social cost** is $\mathrm{MSC} = \mathrm{MPC} + \mathrm{MEC}$, where MPC is marginal private cost. **Marginal social benefit** is $\mathrm{MSB} = \mathrm{MPB} + \mathrm{MEB}$.
:::

A competitive market equates MPB to MPC. Efficiency, as in [[principles/markets-and-welfare#prop-efficiency]], equates MSB to MSC. When MEC $> 0$ and MEB $= 0$, MSC lies above supply, and the market produces too much. When MEB $> 0$ and MEC $= 0$, MSB lies above demand, and the market produces too little.

Take the linear market of the previous chapters and add a constant MEC of 6. Inverse demand (MPB) is $P = 30 - Q/4$; inverse supply (MPC) is $P = 6 + Q/2$; MSC is $P = 12 + Q/2$. Private equilibrium remains $(Q, P) = (32, 22)$. The efficient quantity solves $30 - Q/4 = 12 + Q/2$, so $Q^{**} = 24$ and the price on the demand curve is 24. Units 24 to 32 have social cost above social benefit. The deadweight loss of ignoring the externality is the triangle between MSC and demand from 24 to 32:

$$
\mathrm{DWL} = \tfrac12 \times 6 \times 8 = 24.
$$

::: proposition Pigouvian tax {#prop-pigou}
If MEC is measurable and depends only on the quantity of the good, a specific tax $t(Q) = \mathrm{MEC}(Q)$ levied on sellers, with no other distortions, leads a competitive market to the efficient quantity. When MEC is constant, the tax is a constant $t = \mathrm{MEC}$. A positive externality is symmetric: a subsidy equal to MEB leads to the efficient quantity.
:::

::: proof
Sellers then face MPC $+ t = $ MPC $+ $ MEC $= $ MSC. Competitive equilibrium equates MPB to that schedule. If MEB $= 0$, MPB $= $ MSB, so MSB $= $ MSC. For a subsidy, buyers face a net price that makes them equate MSB to MPC.
:::

In the example, $t = 6$ is exactly the tax of the previous chapter, which produced $Q = 24$. The deadweight-loss triangle of that tax, computed against *private* surplus, is now a *correction*: it is the triangle that should not have been in the surplus in the first place, because the 8 units cost third parties 6 each. After the tax, private CS + PS + revenue, *minus* the remaining external cost, is maximised.

::: example Accounting for the unpriced harm {#ex-unpriced}
With MEC $= 6$ at every quantity, private equilibrium is $Q = 32$. Compute total external cost at $Q = 32$ and at $Q = 24$. Using the private surplus numbers of the previous chapter (TS $= 384$ at $Q = 32$, and CS+PS+revenue $= 360$ at the tax of 6), find social surplus in each case.
::: solution
External cost is $6Q$, so 192 at $Q = 32$ and 144 at $Q = 24$. Social surplus at the private quantity is $384 - 192 = 192$. After the Pigouvian tax, private CS+PS+revenue is 360, but 144 of external cost remains, so social surplus is $360 - 144 = 216$. The gain of 24 is the DWL triangle that has been avoided. Revenue is a transfer, not a social cost; the remaining external cost on the 24 units that are still produced *is* a social cost, and it is the cost that is worth incurring because MSB $\ge$ MSC on those units.
:::
:::

::: widget plot
f: 30-x/4; 6+x/2; 12+x/2
x: 0, 50
y: 0, 32
labels: \text{MSB (= demand)}; \text{MPC (= supply)}; \text{MSC}
caption: A constant marginal external cost of 6. Private trading is at $Q = 32$; efficiency is at $Q = 24$, where demand meets MSC. A Pigouvian tax of 6 shifts supply onto MSC. Shade, in your head, the triangle between MSC and demand from 24 to 32: that is the DWL of leaving the externality unpriced.
:::

::: example A positive externality {#ex-positive}
Demand (MPB) is $P = 30 - Q/4$, supply (MPC) is $P = 6 + Q/2$, and each unit confers an external benefit of 6 on others. Find the private quantity, the efficient quantity, and the Pigouvian subsidy.
::: solution
Private equilibrium is still $(32, 22)$. MSB is $P = 36 - Q/4$. Set $36 - Q/4 = 6 + Q/2$: $30 = (3/4)Q$, so $Q^{**} = 40$. The subsidy is 6 per unit, the MEB. Buyers then behave as if demand were $36 - Q/4$, and the market produces 40. Units 32 to 40 were not produced privately, even though MSB exceeds MSC on that range.
:::
:::

::: warning The tax must match the externality, not the product
A tax on “fuel” is a tax on an input that is correlated with carbon emissions, congestion and local air pollution, but it is not a tax on each of those externalities separately, and it hits uses of fuel that do not produce them. A Pigouvian tax in the model is a tax on the *externality*. In practice the instrument is often a proxy — a fuel tax, a congestion charge in a zone, a cap on emissions — and the proxy is better the tighter the correlation and the cheaper the monitoring. Calling every product tax “Pigouvian” does not make it one.
:::

## The Coase theorem

Pigou’s tax assumes that the state can measure MEC and collect $t$. Ronald Coase (1960) asked what happens if the parties can bargain.

::: proposition Coase theorem {#prop-coase}
If property rights over the externality are well defined and tradable, and if bargaining is costless (no transaction costs, no bargaining failure), then the efficient quantity is reached by private agreement, regardless of which side holds the rights. The assignment of rights affects distribution, not efficiency.
:::

::: proof (sketch)
Suppose efficiency requires $Q^{**} < Q_{\mathrm{private}}$. If the victim has the right to be free of the harm, the producer must buy permission for each unit; it will buy only while MPB $-$ MPC exceeds MEC, that is, only up to $Q^{**}$. If the producer has the right to emit, the victim will pay the producer to cut back while MEC exceeds MPB $-$ MPC, again down to $Q^{**}$. In both cases the bargain stops at the efficient point. The payments run in opposite directions, so the two assignments differ in wealth.
:::

The “if” clauses are the content. Transaction costs are not small when victims are many (air pollution over a city), when rights are unclear, or when information is private. Then the assignment of rights *does* affect the quantity, and a tax, a cap, or a regulation may cost less than a bargain that will not occur. Coase’s paper is an argument for taking transaction costs seriously, not an argument that they are zero.

::: example Two neighbours {#ex-coase}
A factory’s extra shift is worth 20 to the owner and imposes a cost of 12 on one neighbour, who can be bargained with at no cost. (a) If the neighbour has a right to quiet, will the shift run? (b) If the factory has a right to run the shift, will it run? (c) What if the cost to the neighbour is 25?
::: solution
(a) The factory can pay the neighbour up to 20; the neighbour needs 12. A payment between 12 and 20 makes both better off and the shift runs. (b) The neighbour can pay the factory up to 12; the factory needs 20 to stop. No payment in $[0,12]$ will stop a shift worth 20, so the shift runs. (c) Now the harm is 25 > 20. Under (a) the factory cannot offer enough and the shift does not run. Under (b) the neighbour can pay between 20 and 25 to stop it, and it does not run. Efficiency (run if and only if 20 > harm) is reached in all four combinations; who pays whom is not.
:::
:::

## Public goods and common resources

Goods differ along two lines: **rivalry** (does one person’s use diminish another’s?) and **excludability** (can a non-payer be prevented from using the good?).

::: definition Public good and common resource {#def-public}
A **pure public good** is non-rival and non-excludable (a large-scale radio signal, basic research once published, defence of a territory). A **private good** is rival and excludable (a loaf of bread). A **club good** is non-rival (up to congestion) and excludable (a subscription stream, a patent). A **common resource** is rival and non-excludable (a fishery without quotas, an open aquifer).
:::

For a pure public good, efficiency requires that the *sum* of marginal willingness to pay equal marginal cost (Samuelson, 1954): everyone consumes the same $Q$, and each extra unit is valued by everyone at once.

::: example Two-person Samuelson condition {#ex-samuelson}
Two people, with marginal benefits $\mathrm{MB}_1 = 12 - Q$ and $\mathrm{MB}_2 = 8 - Q$, share a public good with constant MC $= 10$. Find the efficient $Q$. If each were charged MC and the good were rival, how much would each buy privately?
::: solution
Sum of MBs: $20 - 2Q$. Set $20 - 2Q = 10$, so $Q^{**} = 5$. At $Q = 5$, $\mathrm{MB}_1 = 7$ and $\mathrm{MB}_2 = 3$, which sum to 10. If the good were rival and each paid 10, person 1 would buy until $12 - Q = 10$, so $Q_1 = 2$; person 2 would buy nothing because $8 < 10$. Private markets for a rival good do not add the two demand curves *vertically*; they add them horizontally. The public-good problem is the vertical sum.
:::
:::

::: widget plot
f: 12-x; 8-x; 20-2*x; 10
x: 0, 12
y: 0, 22
labels: \text{MB}_1; \text{MB}_2; \text{sum of MBs}; \text{MC}
caption: Vertical summation for a public good. Efficiency is where the sum of the two MB curves meets MC, at $Q = 5$. Each person’s MB at that quantity is positive but, for person 2, below MC: person 2 would not buy a rival copy at price 10, yet values the shared unit at 3.
:::

**Free riding.** If the public good is non-excludable, each person prefers that others pay. In a Nash equilibrium of voluntary contributions, provision is typically too low. That is the case for public provision, or for a mechanism that excludes (club goods, patents) when exclusion is cheap enough not to destroy the non-rival benefit. Exclusion of a non-rival good is itself inefficient — the extra user has MEC $= 0$ — which is the tension in intellectual property: a patent creates an incentive to invent by manufacturing scarcity.

**Common resources.** Rivalry without exclusion produces the **tragedy of the commons** (the name is Garrett Hardin’s, 1968; the model is older): each user considers MPC, not the MEC imposed on other users, and the resource is overused. Quotas, individual transferable quotas in fisheries, and community rules (Ostrom, 1990, *Governing the Commons*) are alternative assignments of rights. Ostrom documented cases in which local rules conserved a resource without either a Pigouvian tax or a single private owner; she also documented failures. The Coase caveat applies: the rules are a way of cutting transaction costs.

::: quiz
Which of the following is a pure public good in the sense of [[#def-public]]?
- [ ] A seat on a full train (rival, excludable)
- [x] A flood-warning siren covering a valley, once installed (non-rival, non-excludable)
- [ ] A patented vaccine dose (rival, excludable)
- [ ] A congested unfenced pasture (rival, non-excludable)
::: solution
The siren is non-rival (one more household hearing it does not diminish the warning) and non-excludable (households in the valley cannot be switched off). A train seat is a private good when the train is full; a vaccine dose is rival; the pasture is a common resource.
:::
:::

## Evidence

Externalities are estimated, not assumed. Nordhaus (2017, *American Economic Review*, Nobel lecture) reviews estimates of the social cost of carbon — the present-value MEC of an extra tonne of CO$_2$ — and the corresponding carbon price in an integrated assessment model; the number is sensitive to the discount rate, to climate damages, and to the treatment of catastrophic risk, which is why published figures span a wide range. The Stern Review (2006) used a lower discount rate than Nordhaus’s then-central runs and obtained a higher social cost. That disagreement is in part ethical (how to weigh future people) and in part empirical (damages). A carbon tax or a cap-and-trade system is the Pigouvian instrument; fuel-economy standards and renewable subsidies are proxies, with extra deadweight loss if they do not hit MEC uniformly.

Congestion charging in central London, introduced in 2003, reduced traffic in the zone; Transport for London’s early monitoring reports documented falls in vehicle-kilometres and in delay inside the zone, with displacement onto the inner ring (TfL, *Impacts Monitoring*, 2004–2008). The charge is a local Pigouvian tax on a congestion externality, not on carbon as such.

On public goods, the free-rider prediction is strong in large groups and weaker in small ones. Laboratory public-good games find contributions above the Nash-zero of the linear voluntary-contribution model, declining with repetition, and sensitive to punishment opportunities (Fehr and Gächter, 2000, *American Economic Review*). Field public goods — vaccination, open-source software, Wikipedia — are provided in mixed ways: subsidy, duty, prestige, and exclusion (copyright, paywalls) in combination.

::: application Vaccination
A vaccine dose is rival (one vial, one arm) but confers a positive externality: it lowers the risk to people the recipient would have infected. MPB is the private reduction in risk; MEB is the reduction in risk to others. Competitive pricing of the dose at MPC therefore undersupplies vaccination relative to MSB $= $ MSC. The Pigouvian response is a subsidy (or a mandate, which is a different instrument with a different incidence). The size of MEB depends on the epidemiology — on how many others the person would have infected — which is why the case for a subsidy is stronger at some stages of an outbreak than at others.
:::

::: history
**1920, A. C. Pigou; 1954, Paul Samuelson; 1960, Ronald Coase.** Pigou’s *The Economics of Welfare* treated the divergence between private and social cost and proposed taxes and subsidies to close it. Samuelson’s “The Pure Theory of Public Expenditure” (*Review of Economics and Statistics*, 1954) defined a pure public good and stated the summation condition. Coase’s “The Problem of Social Cost” (*Journal of Law and Economics*, 1960) showed that with well-defined rights and no transaction costs the parties bargain to efficiency, and that when transaction costs are positive the assignment of rights matters. Elinor Ostrom’s *Governing the Commons* (1990) added evidence that some communities invent rules that neither Pigou’s tax nor a single owner had supplied.
:::

## Where this leads

[[public-economics]] takes externalities and public goods to second-best tax systems, to cost–benefit analysis, and to political economy. [[environmental-economics]] is the carbon, pollution and resource case in depth. [[information-economics]] is a different market failure: asymmetric information, not unpriced effects. The four together — market power, externalities, public goods, asymmetric information — are the standard list of reasons a competitive diagram can mislead.

::: summary
- An externality is an unpriced cost or benefit on a third party. Competitive markets equate private margins; efficiency equates social margins.
- A Pigouvian tax equal to MEC (or a subsidy equal to MEB) restores the efficient quantity in an otherwise undistorted competitive market.
- If rights are well defined and bargaining is costless, private bargains reach efficiency (Coase); transaction costs, unclear rights and large groups undo the result and make the assignment of rights consequential.
- A pure public good is non-rival and non-excludable. Efficiency adds willingness to pay *vertically*. Voluntary provision under-provides because of free riding.
- Common resources are rival and non-excludable and tend to be overused unless rights, quotas or community rules impose the missing MEC.
:::

## Exercises

::: exercise The efficient quantity {level=1 check="24"}
MPB $= 30 - Q/4$, MPC $= 6 + Q/2$, MEC $= 6$. Find the efficient quantity. (Enter $Q^{**}$.)
::: solution
MSC $= 12 + Q/2$. Set $30 - Q/4 = 12 + Q/2$: $18 = (3/4)Q$, so $Q^{**} = 24$.
:::
:::

::: exercise A Pigouvian tax {level=1}
In the previous exercise, what tax on sellers implements $Q^{**}$? What are $P_b$ and $P_s$ after the tax?
::: solution
$t = 6$. As in [[principles/markets-and-welfare]], $Q = 24$, $P_b = 24$, $P_s = 18$. Sellers receive 18, which equals MPC at $Q = 24$; buyers pay 24, which equals MSB.
:::
:::

::: exercise Sign of the distortion {level=1}
Say whether the competitive quantity is too high or too low: (a) a factory’s smoke; (b) a neighbour’s well-kept garden visible from the street; (c) antibiotic use that breeds resistance; (d) basic research published in an open journal.
::: solution
(a) Too high (negative externality). (b) Too low (positive). (c) Too high (negative). (d) Too low (positive; a public good once published).
:::
:::

::: exercise Samuelson arithmetic {level=2}
Three people have $\mathrm{MB}_i = 10 - Q$ each, and MC $= 12$. Find the efficient public-good quantity. What would one person buy if she alone paid the 12 and the others could not be excluded from a non-rival good she financed?
::: solution
Sum of MBs $= 30 - 3Q$. Set $30 - 3Q = 12$, so $Q^{**} = 6$. If one person paid 12 alone, she would set $10 - Q = 12$, which has no positive solution: she buys 0. Free riding is complete in this example, and voluntary provision fails.
:::
:::

::: exercise Coase with numbers {level=2}
A firm can abate pollution at a cost of 8 per tonne. The downstream damage is 11 per tonne. Bargaining is costless. (a) If the firm has the right to pollute, how much will the downstream user pay per tonne to induce abatement, and will abatement occur? (b) If the downstream user has a right to clean water, will the firm pollute?
::: solution
(a) Damage 11 exceeds abatement cost 8, so there is a surplus of 3 per tonne from abating. The user can pay any amount in $(8, 11)$ per tonne; abatement occurs. (b) The firm would have to pay 11 for the right to pollute, but polluting only saves the abatement cost of 8, so it will not buy the right; it abates. Efficiency (abate, because $8 < 11$) in both assignments.
:::
:::

::: exercise A common resource {level=2}
Catch per boat is $c = 20 - 2n$ when $n$ boats go out, so total catch is $T = 20n - 2n^2$. Each boat costs 8. Treating $n$ as continuous, find the private number of boats (where catch per boat equals 8) and the efficient number (where $T'(n) = 8$).
::: solution
Private: $20 - 2n = 8$ gives $n = 6$. Efficient: $T'(n) = 20 - 4n = 8$ gives $n = 3$. Private use is double efficient use, because each extra boat ignores the 2 fish it takes from every existing boat.
:::
:::

::: exercise DWL of an unpriced externality {level=3}
With MPB $= 30 - Q/4$, MPC $= 6 + Q/2$ and MEC $= 6$, compute the external cost at the private quantity $Q = 32$ and at the efficient quantity $Q = 24$. Then compute the deadweight loss of the unpriced externality as the extra *social* cost minus extra *private* benefit on units 24 to 32.
::: hint
External cost is $6Q$. The DWL triangle has height 6 and base 8.
:::
::: solution
External cost at 32 is $192$; at 24 is $144$. On units 24 to 32, extra external cost is 48. Extra private surplus on those units is the private CS+PS triangle between demand and MPC, of area $\tfrac12\times 6\times 8 = 24$ (the tax triangle of the previous chapter). Net social loss is $48 - 24 = 24$, which is also $\int_{24}^{32}(\mathrm{MSC}-\mathrm{MSB})\,\mathrm{d}q = \tfrac12\times 6\times 8 = 24$.
:::
:::

::: exercise Classify and choose an instrument {level=3}
For each good, classify it by rivalry and excludability, name the problem (if any), and name one instrument from this chapter that addresses it: (a) a dose of a patented antibiotic; (b) an unfenced pasture; (c) a city-wide air-quality improvement; (d) a streaming film with unused server capacity.
::: solution
(a) Rival and excludable (private good) *as a dose*, but antibiotic resistance is a negative externality of *use*, so a Pigouvian tax or a stewardship regulation. The patent is a club-good device on the *formula*, a different problem. (b) Rival, non-excludable: common resource; quotas, a fee per animal, or community rules. (c) Non-rival, non-excludable: public good (and a positive externality of abatement); public provision of abatement or a Pigouvian tax on emissions. (d) Non-rival (until congestion) and excludable: club good; a subscription is already the instrument. Forcing a positive price still excludes users whose MB is positive and whose MC is near zero, which is the static inefficiency of exclusion.
:::
:::
