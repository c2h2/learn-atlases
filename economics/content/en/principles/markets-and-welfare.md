A competitive market, left to itself, produces a quantity. Is that quantity a good one? **Welfare economics** answers with a measuring rod: the surplus of buyers and sellers. The area under demand and above the price is what buyers would have been willing to pay over and above what they did pay. The area above supply and below the price is what sellers received over and above their marginal cost. Their sum is the gain from trade in that market. Taxes, subsidies and price controls reallocate the two areas and typically leave a gap — a **deadweight loss** — of trades that would have been mutually beneficial and no longer take place.

This chapter defines consumer and producer surplus, shows that a competitive equilibrium maximises their sum when there are no externalities, and computes the effects of a tax and of a price control in the linear market of [[principles/supply-and-demand]]. The next chapter asks what happens when the supply curve is not social cost, or the demand curve is not social benefit.

Throughout, surplus is measured in units of money, and those units are taken as a comparable measure of willingness to pay. That is a modelling choice. It ignores that a unit of money may mean more to a poor buyer than to a rich one; distributional weights are a later, normative overlay, not a correction to the arithmetic. A transfer from a high-surplus buyer to a low-income buyer can raise a weighted sum of well-being while leaving unweighted total surplus unchanged, or even while cutting it. The chapter reports unweighted surplus because that is what the competitive diagram maximises; it does not claim that unweighted surplus is the only social objective.

## Consumer and producer surplus

::: definition Consumer and producer surplus {#def-surplus}
**Consumer surplus** (CS) is the extra willingness to pay of buyers, above the price they actually pay, summed over the units they buy. For a continuous inverse demand $P_d(Q)$ and a uniform price $P$ at which $Q$ units are bought,

$$
\mathrm{CS} = \int_0^{Q}\bigl(P_d(q) - P\bigr)\,\mathrm{d}q.
$$

**Producer surplus** (PS) is the extra receipts of sellers, above marginal cost, summed over the units they sell. For inverse supply $P_s(Q)$,

$$
\mathrm{PS} = \int_0^{Q}\bigl(P - P_s(q)\bigr)\,\mathrm{d}q.
$$

**Total surplus** is $\mathrm{TS} = \mathrm{CS} + \mathrm{PS}$. If a tax $t$ is collected on each of $Q$ units, tax revenue $tQ$ is a transfer; $\mathrm{TS}$ including the government is $\mathrm{CS} + \mathrm{PS} + tQ$.
:::

On a linear diagram the integrals are triangles (or triangles plus rectangles). For inverse demand $P = 30 - Q/4$ and a price of 22 at $Q = 32$,

$$
\mathrm{CS} = \tfrac12 \times (30-22)\times 32 = 128.
$$

For inverse supply $P = 6 + Q/2$ at the same point,

$$
\mathrm{PS} = \tfrac12 \times (22-6)\times 32 = 256.
$$

Total surplus is 384.

::: widget plot
f: 30-x/4; 6+x/2
x: 0, 50
y: 0, 32
shade: 0, 32
between: true
labels: \text{demand}; \text{supply}
caption: Total surplus is the area between demand and supply from $Q = 0$ to the equilibrium $Q = 32$. The part above the price 22 is consumer surplus (a triangle of area 128); the part below is producer surplus (area 256). A tax or a quota that cuts $Q$ below 32 slices a triangle out of this area — the deadweight loss.
:::

::: example Surplus at a non-equilibrium price {#ex-cs-at-p}
If, for some reason, the price were 18 and only the units that sellers are willing to supply at 18 were transacted, what would CS, PS and TS be? Inverse supply $P = 6 + Q/2$ gives $Q^s(18) = 24$. Demand at 18 is $Q^d = 48$, so there is a shortage and the short side rules.
::: solution
Quantity transacted is $Q = 24$. Inverse demand at 24 is $P_d = 30 - 6 = 24$. Buyers of the 24 units were willing to pay along the demand curve from 30 down to 24, and they pay 18, so

$$
\mathrm{CS} = \tfrac12(30-24)\times 24 + (24-18)\times 24 = 72 + 144 = 216.
$$

Sellers receive 18 and have marginal cost along supply from 6 to 18,

$$
\mathrm{PS} = \tfrac12(18-6)\times 24 = 144.
$$

$\mathrm{TS} = 360$, which is 24 less than the equilibrium 384. The missing 24 is the surplus on units 24 to 32, which demand values above supply’s cost and which are not produced.
:::
:::

## The efficiency of competitive equilibrium

::: proposition Competitive efficiency in a single market {#prop-efficiency}
Suppose inverse demand $P_d(Q)$ equals buyers’ marginal willingness to pay, inverse supply $P_s(Q)$ equals sellers’ marginal cost, there are no externalities, and a unit is homogeneous. Then total surplus $\int_0^{Q}(P_d - P_s)$ is maximised at the competitive quantity $Q^*$ where $P_d(Q^*) = P_s(Q^*)$. Any other quantity leaves a deadweight loss.
:::

::: proof
The integrand $P_d(q) - P_s(q)$ is positive for $q < Q^*$ (the unit is worth more to a buyer than it costs a seller) and negative for $q > Q^*$. Extending $Q$ toward $Q^*$ therefore raises the integral; passing $Q^*$ lowers it. The maximum is at $Q^*$.
:::

The proposition is the first welfare theorem specialised to one market with no income effects and no externalities. It is a positive statement about a sum of willingness-to-pay and cost. It is not a statement that the competitive outcome is fair. Competitive equilibrium can be efficient and highly unequal; the second welfare theorem, in [[microeconomics]], says that a different efficient point can be reached by lump-sum redistribution *then* competitive trade, which is a theorem about a model, not a description of a tax system.

::: quiz
In the linear market of this chapter, a planner forces $Q = 40$ instead of $Q^* = 32$. Total surplus
- [ ] rises, because more trade is more surplus
- [x] falls, because units 32 to 40 cost more to produce than buyers are willing to pay
- [ ] is unchanged, because price adjusts
- [ ] falls only if demand is elastic
::: solution
For $Q > Q^*$, $P_s(Q) > P_d(Q)$: the extra units fail a cost–benefit test. Elasticity affects the *size* of the loss, not its sign. Forcing more trade is not the same as discovering mutually beneficial trade.
:::
:::

## A tax

A specific tax of $t$ per unit, levied on sellers, shifts inverse supply up by $t$. Demand $P = 30 - Q/4$ and pre-tax supply $P = 6 + Q/2$, with $t = 6$, give post-tax supply $P = 12 + Q/2$. Setting them equal,

$$
30 - \frac{Q}{4} = 12 + \frac{Q}{2} \implies 18 = \frac{3}{4}Q \implies Q_t = 24.
$$

The price buyers pay is $P_b = 30 - 24/4 = 24$. The price sellers receive is $P_s = P_b - 6 = 18$. Check on the old supply: $6 + 24/2 = 18$. Buyers pay 2 more than 22; sellers receive 4 less. The split is 2 : 4, and it does not depend on which side the tax is levied on: a tax on buyers would shift demand down by 6 and produce the same $P_b$, $P_s$ and $Q_t$. The elasticity chapter’s local formula, [[principles/elasticity#prop-incidence]], already pointed to a one-third share on buyers.

::: definition Deadweight loss of a tax {#def-dwl}
The **deadweight loss** (DWL) of a tax is the total surplus that is lost and not recouped as government revenue. For a tax that cuts quantity from $Q^*$ to $Q_t$,

$$
\mathrm{DWL} = \int_{Q_t}^{Q^*}\bigl(P_d(q) - P_s(q)\bigr)\,\mathrm{d}q,
$$

the area of the triangle (for linear curves) between demand and supply from $Q_t$ to $Q^*$.
:::

In the example the height of that triangle is the tax, 6, and the base is $32-24 = 8$, so $\mathrm{DWL} = \tfrac12 \times 6 \times 8 = 24$. Accounting:

|  | Pre-tax | Post-tax |
|---|---|---|
| CS | 128 | $\tfrac12(30-24)\times 24 = 72$ |
| PS | 256 | $\tfrac12(18-6)\times 24 = 144$ |
| Revenue | 0 | $6\times 24 = 144$ |
| TS | 384 | $72+144+144 = 360$ |
| DWL | 0 | $24$ |

::: example A tax levied on buyers {#ex-tax-buyers}
The same tax of 6 is levied on buyers instead: they pay $P_s + 6$, so inverse demand as a function of the price sellers receive becomes $P_s = 24 - Q/4$. Supply is $P_s = 6 + Q/2$. Find $Q$, $P_s$ and $P_b$.
::: solution
$24 - Q/4 = 6 + Q/2$ gives $18 = (3/4)Q$, so $Q = 24$, $P_s = 6 + 12 = 18$, $P_b = 24$. The outcome is identical to the tax on sellers. Incidence is determined by elasticities, not by the legal assignment of the tax.
:::
:::

::: widget plot
f: 30-x/4; 6+x/2; 12+x/2
x: 0, 50
y: 0, 32
labels: \text{demand}; \text{supply}; \text{supply plus tax}
caption: A tax of 6 on sellers. The new crossing of demand with supply-plus-tax is $Q = 24$, $P_b = 24$. Drop vertically to the original supply to read $P_s = 18$. The rectangle $(24-18)\times 24$ is revenue; the small triangle to the right, between demand and original supply from 24 to 32, is deadweight loss.
:::

::: warning The legal incidence is not the economic incidence
Writing the tax into the buyer’s invoice, or into the seller’s, does not decide who is worse off. In the example buyers pay 2 more and sellers receive 4 less, whichever side remits the 6. A politician who promises that “the tax will be paid by firms, not by households” has stated a legal fact and has not stated an economic one. [[principles/elasticity#prop-incidence]] is the right first approximation: the less elastic side bears more.
:::

The deadweight loss grows with the square of the tax when curves are linear: doubling $t$ doubles the height of the triangle and, because $Q_t$ moves linearly with $t$, doubles the base, so DWL quadruples. Small taxes have small efficiency costs; large taxes do not have linearly large ones. That is an argument for a broad base and a low rate if the goal is revenue at least DWL, and it is only one argument: equity, administration and externalities (the next chapter) can point the other way.

::: example Doubling a tax {#ex-double-tax}
In this chapter’s linear market, a tax of 3 produced $Q_t = 28$ and $\mathrm{DWL} = 6$ (see the exercises). A tax of 6 produced $Q_t = 24$ and $\mathrm{DWL} = 24$. Confirm the “square” rule, and compute the extra DWL of going from 3 to 6 relative to the extra revenue.
::: solution
$6/3 = 2$ and $24/6 = 4$: DWL quadrupled when the tax doubled, as the linear geometry requires. Revenue at $t = 3$ is $3\times 28 = 84$; at $t = 6$ it is $6\times 24 = 144$. Extra revenue 60 is bought with extra DWL of 18, a much worse “rate of exchange” than the first 3 units of tax, which bought 84 of revenue at a DWL of 6. The last slice of a high tax is the expensive slice.
:::
:::

## Price controls

A **price ceiling** is a legal maximum price. It binds if it is below $P^*$. Quantity transacted falls to $Q^s(P_{\mathrm{ceil}})$, the short side, and a shortage $Q^d - Q^s$ appears. A **price floor** is a legal minimum; it binds above $P^*$, quantity falls to $Q^d(P_{\mathrm{floor}})$, and a surplus appears.

::: example A binding ceiling {#ex-ceiling}
In the original market a ceiling is set at 16. Compute quantity transacted, the shortage, CS, PS and the deadweight loss, assuming the 20 units go to the buyers with the highest willingness to pay.
::: solution
$Q^s(16) = 2\times 16 - 12 = 20$, $Q^d(16) = 120 - 64 = 56$, shortage 36. Quantity transacted is 20. Inverse demand at 20 is 25. If the highest-value buyers are served,

$$
\mathrm{CS} = \int_0^{20}\bigl(30 - q/4 - 16\bigr)\,\mathrm{d}q = \bigl[14q - q^2/8\bigr]_0^{20} = 280 - 50 = 230,
$$

$$
\mathrm{PS} = \tfrac12(16-6)\times 20 = 100.
$$

$\mathrm{TS} = 330$, so $\mathrm{DWL} = 384 - 330 = 54$. If the units are *not* allocated to the highest-value buyers — a queue that favours those with low time costs, or a lottery — CS is smaller and the DWL is larger than 54.
:::
:::

Price floors on labour (minimum wages) and on crops have the same geometry, with more controversy about the shape of the supply (or demand) curve. Card and Krueger (1994, *American Economic Review*) compared fast-food employment in New Jersey and Pennsylvania after New Jersey raised its minimum wage from USD 4.25 to USD 5.05 in 1992, and did not find a fall in employment; later studies, using other designs and other episodes, have found zero, small negative, and occasionally positive employment effects. The competitive diagram predicts a fall. Monopsony (a single buyer of labour) can predict a rise. The evidence is a live dispute, not a settled measurement, and it is a dispute about a positive claim. Whether a given employment effect is acceptable is a separate, normative question.

## Evidence

Harberger (1954, *American Economic Review*) estimated the deadweight loss of monopoly in US manufacturing at a fraction of a per cent of GDP, using triangles of the kind in this chapter; the number is sensitive to the demand elasticities assumed. For taxes, Feldstein (1999, *Review of Economics and Statistics*) argued that the relevant elasticity for the DWL of income tax is the elasticity of *taxable income*, which includes avoidance, and that the DWL is then larger than a labour-supply triangle suggests. Chetty (2009, *Annual Review of Economics*) surveys the subsequent literature. The lesson for this chapter is modest: the triangle is the right *shape* of the calculation; filling it in requires an elasticity and a view of what the curves represent.

Rent control is a price ceiling on housing. A review by Diamond, McQuade and Qian (2019, *American Economic Review*) of a 1994 San Francisco expansion of rent control found that affected landlords reduced the supply of rental housing, converting some of it to other uses, which raised rents in the uncontrolled sector. The finding is about one city and one reform; it matches the direction of the supply response in this chapter’s diagram, and it does not, by itself, settle the normative debate over tenant security.

::: history
**1844, Jules Dupuit.** In “De la mesure de l’utilité des travaux publics”, Dupuit measured the benefit of a public work by the extra willingness to pay of users above the price charged — consumer surplus. Marshall made the triangle standard in 1890 and was careful about income effects. The deadweight-loss triangle of a tax is in Jules Dupuit’s work as well, and was revived for empirical use by Arnold Harberger in the 1950s. The incidence result — that the legal assignment of a tax does not determine the economic assignment — is older still; it is in Ricardo and, in diagrammatic form, in Marshall.
:::

## Where this leads

[[principles/market-failure]] drops the assumption that $P_s$ is social cost or $P_d$ is social benefit. [[principles/market-power]] drops price-taking, so the firm’s supply curve is replaced by a marginal-revenue curve and the equilibrium quantity is too low. [[public-economics]] takes the tax triangle to a many-good world (Ramsey rules) and to distortionary income taxes. The measurement of surplus with income effects — compensating and equivalent variation — is in [[microeconomics]].

This atlas is for education only — not investment or financial advice, and not a recommendation of any tax or price-control scheme.

::: summary
- Consumer surplus is willingness to pay minus what buyers pay; producer surplus is receipts minus marginal cost. Total surplus is their sum, plus tax revenue if the government is included.
- In a competitive market with no externalities, total surplus is maximised at the equilibrium quantity. Other quantities leave a deadweight-loss triangle.
- A specific tax cuts the quantity, raises the buyer price, lowers the seller price, and creates a DWL equal to the surplus on the lost units. Legal incidence does not determine economic incidence.
- A binding price ceiling creates a shortage and a DWL; a binding floor creates a surplus and a DWL. Who receives the scarce units under a ceiling affects how large the loss is.
- The triangle is a template. Filling it in requires elasticities and a judgement that the curves represent social value and social cost.
:::

## Exercises

::: exercise A consumer-surplus triangle {level=1 check="128"}
Inverse demand is $P = 30 - Q/4$. At the equilibrium price 22, quantity is 32. Compute consumer surplus. (Enter CS.)
::: solution
$\mathrm{CS} = \tfrac12(30-22)\times 32 = 128$.
:::
:::

::: exercise Producer surplus {level=1}
Inverse supply is $P = 6 + Q/2$. At $P = 22$, $Q = 32$, compute producer surplus.
::: solution
$\mathrm{PS} = \tfrac12(22-6)\times 32 = 256$.
:::
:::

::: exercise A tax table {level=1}
For the tax of 6 in the text, verify that $\mathrm{CS} + \mathrm{PS} + \text{revenue} + \mathrm{DWL} = 384$.
::: solution
$72 + 144 + 144 + 24 = 384$. The identity is the definition of DWL as the missing slice of pre-tax total surplus.
:::
:::

::: exercise A smaller tax {level=2}
With the same curves, a tax of 3 on sellers gives post-tax supply $P = 9 + Q/2$. Find $Q_t$, $P_b$, $P_s$ and DWL. Confirm that DWL is one quarter of the DWL of a tax of 6.
::: solution
$30 - Q/4 = 9 + Q/2$ gives $21 = (3/4)Q$, so $Q_t = 28$. $P_b = 30 - 7 = 23$, $P_s = 20$. DWL $= \tfrac12 \times 3 \times (32-28) = 6$, which is $24/4$. Doubling the tax from 3 to 6 quadrupled DWL, as the linear arithmetic requires.
:::
:::

::: exercise Incidence split {level=2}
In the text’s tax of 6, buyers’ price rose by 2 and sellers’ price fell by 4. Compute the pre-tax elasticities of demand and supply at $(32, 22)$, and check that [[principles/elasticity#prop-incidence]] approximately matches the 2 : 4 split.
::: solution
Demand $Q = 120 - 4P$, $\varepsilon^d = -4\times 22/32 = -2.75$. Supply $Q = 2P - 12$, $\varepsilon^s = 2\times 22/32 = 1.375$. The local formula gives $\mathrm{d}P_b/\mathrm{d}t = 1.375/(1.375+2.75) = 1.375/4.125 = 1/3$. A tax of 6 would then raise $P_b$ by about 2 and lower $P_s$ by about 4, which matches the exact linear calculation. The match is exact here because the formula’s $1/3$ equals $2/6$.
:::
:::

::: exercise A price floor {level=2}
A floor is set at 26 in the original market. Compute quantity demanded, quantity supplied, the surplus of unsold units, and the deadweight loss if $Q^d(26)$ is what is transacted.
::: solution
$Q^d(26) = 120 - 104 = 16$, $Q^s(26) = 52 - 12 = 40$, unsold surplus $24$. Quantity transacted is 16. DWL $= \int_{16}^{32}(24 - 0.75q)\,\mathrm{d}q = \bigl[24q - 0.375q^2\bigr]_{16}^{32} = (768-384) - (384 - 96) = 384 - 288 = 96$.
:::
:::

::: exercise Who is served {level=3}
Under the ceiling of [[#ex-ceiling]], suppose the 20 units are allocated at random among the 56 buyers who want a unit at price 16, rather than to the highest-value buyers. Explain why expected total surplus is then less than 330. You need not compute the exact number.
::: hint
Random allocation gives some units to buyers whose willingness to pay lies between 16 and 25, and may give none to buyers near 30.
:::
::: solution
Demand at $Q = 56$ is 16, so the 56 willing buyers have willingness to pay uniformly (in quantity-rank) from 30 down to 16. The highest-value 20 have willingness from 30 down to 25, which was the CS calculation of 230 plus PS of 100. A random 20 of the 56 have a lower average willingness to pay — the mean of a random sample from that range rather than the top 20. CS falls, PS is unchanged (sellers still receive 16 for 20 units), so TS falls below 330. The extra loss is misallocation among buyers, on top of the under-production loss of 54.
:::
:::

::: exercise A subsidy {level=3}
A subsidy of 6 per unit is paid to sellers, so inverse supply becomes $P = Q/2$ (that is, $6 + Q/2 - 6$). Demand is still $P = 30 - Q/4$. (a) Find the new $Q$, the price buyers pay and the price sellers receive. (b) Compute the subsidy bill. (c) Show that CS + PS − subsidy bill is 24 less than the original TS of 384, so the subsidy has a DWL of 24 as well.
::: hint
Sellers receive $P_b + 6$. Surplus on units beyond 32 is negative because cost exceeds willingness to pay.
:::
::: solution
(a) $30 - Q/4 = Q/2$ gives $30 = (3/4)Q$, so $Q = 40$. $P_b = 30 - 10 = 20$, $P_s = 20 + 6 = 26$. (b) Bill $= 6\times 40 = 240$. (c) CS $= \tfrac12(30-20)\times 40 = 200$. Sellers receive 26; original inverse supply at $Q = 40$ is $6+20 = 26$, so $\mathrm{PS} = \tfrac12(26-6)\times 40 = 400$. Then $\mathrm{CS}+\mathrm{PS}-\text{bill} = 200+400-240 = 360 = 384-24$. The DWL is the triangle from 32 to 40: $\tfrac12\times 6\times 8 = 24$, now from *over*-production. A subsidy of 6 and a tax of 6 have the same-sized triangle in this linear example, on opposite sides of $Q^*$.
:::
:::
