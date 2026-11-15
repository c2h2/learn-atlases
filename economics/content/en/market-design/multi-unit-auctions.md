A government selling one painting can choose among the four classical formats. A government selling $K$ units of a homogeneous good — treasury bills, electricity, carbon permits — or $K$ heterogeneous licences whose values interact — radio spectrum in different regions and bands — cannot. The new forces are **demand reduction** (a bidder who wants several units shades her bid on the second unit to hold down the price of the first), **exposure** (a bidder who wants a package of licences may win only part of it and be left with a worthless fragment), and **information** (bids on one licence tell rivals about another). This chapter takes those forces in turn: first homogeneous multi-unit auctions and the comparison of uniform-price, discriminatory and Vickrey rules; then heterogeneous objects, the simultaneous ascending auction used for spectrum, and combinatorial (package) bidding.

The FCC’s Auction 1 in July 1994 sold ten nationwide narrowband PCS licences for USD 617 million (FCC public notice PNWL 94-4, 2 August 1994) in a simultaneous multiple-round ascending format designed with advice from Preston McAfee, Paul Milgrom and Robert Wilson. That sale is the applied landmark of the chapter. Figures for proceeds are historical. Nothing here is a recommendation to bid for spectrum, bills or permits, or a forecast of any future sale.

## Homogeneous units: three payment rules

$K$ identical units, $n$ bidders. Bidder $i$ has a **marginal-value** schedule $v_i^1 \ge v_i^2 \ge \cdots \ge v_i^K \ge 0$: $v_i^k$ is the increment to $i$’s payoff of receiving a $k$-th unit. (Diminishing marginal values are assumed throughout.) A bid is a demand curve, or equivalently a list of $K$ prices, one for each unit. Three ways of turning those bids into an allocation and a payment are used in the field.

::: definition Uniform-price, discriminatory and Vickrey multi-unit auctions {#def-multi-unit}
Bids are stacked from high to low. The **stop-out** price $p$ is the $K$-th highest unit bid; the $K$ highest unit bids win. In a **uniform-price** (single-price) auction every winning unit pays $p$. In a **discriminatory** (pay-as-bid) auction every winning unit pays its own bid. In a **Vickrey** (multi-unit Vickrey–Clarke–Groves) auction a bidder who wins $k$ units pays, for her $m$-th unit, the highest *rejected* rival bid that would have been accepted had she demanded one unit less — the social opportunity cost of that unit.
:::

Uniform-price is the format of many treasury-bill auctions after the 1990s (the US Treasury moved notes and bonds toward uniform-price following experiments reported in Archibald and Malvey, 1998). Discriminatory is the older treasury format and remains common (India’s government-securities auctions, for example, have used multiple-price / discriminatory rules for much of their history; see the RBI’s auction notices). Vickrey is theoretically dominant-strategy incentive compatible, as in the single-unit case, and is rare as a literal institution for the same reason as single-unit Vickrey: payments are computed from other people’s bids in a way that is hard to audit and that can look “unfair” when a high bidder pays less than a low bidder.

With **unit demand** (each bidder wants at most one unit) the three formats collapse to familiar objects. Uniform-price is a $(K+1)$-st price auction: the $K$ winners pay the highest rejected bid. Discriminatory is a first-price auction for $K$ slots. Vickrey coincides with uniform-price. Revenue equivalence, in its multi-unit version, then compares them under IPV unit demand. Once bidders want several units, Vickrey parts company with uniform-price, and a new incentive appears.

## Demand reduction

::: proposition Demand reduction in the uniform-price auction {#prop-demand-reduction}
Suppose a bidder with two-unit demand faces a residual supply that will set a uniform price equal to her own second-unit bid whenever that bid is marginal. Then she has a strict incentive to bid *below* her second-unit value. In a symmetric IPV equilibrium her second-unit bid is shaded, and the allocation is inefficient with positive probability: a unit can go to a rival whose first-unit value is below her second-unit value.
:::

::: proof
(Two bidders, two units, to make the algebra visible.) Bidder $A$ has values $v^1 \ge v^2$; bidder $B$ is summarised by a residual-supply price $p$ — the bid $A$ must beat to win a second unit, which is also the price $A$ will pay on *both* units if she wins two. If $A$ bids truthfully on both units she wins two whenever $v^2 \ge p$, and pays $2p$. If she instead drops her second bid below $p$, she wins one and pays $p$ (or whatever the new stop-out is). The gain from the second unit is $v^2 - p$; the cost of winning it is that it *raises the price on the first unit* from the next-lower rival bid up to $p$. Whenever that price effect is larger than $v^2 - p$, she prefers to demand one. In equilibrium everyone shades the second bid, so residual supply is not perfectly elastic, and the inequality holds on a set of positive measure.
:::

Vickrey kills the incentive: the price on the first unit is the highest rejected *rival* bid, independent of her own second bid. Discriminatory has a different shade — the first-price shade of [[market-design/auction-formats]] on every unit — and does not have the “my second bid sets my first price” channel, so it demand-reduces less, but it is not strategy-proof.

::: example Two units, three bidders {#ex-demand-reduction}
Two identical units. Three bidders, each wanting at most two. Values (first, second): Ava $(10, 8)$, Ben $(9, 2)$, Cara $(7, 1)$. Truthful uniform-price bids would rank $10, 9, 8, 7, 2, 1$; the two highest are Ava’s first and Ben’s first; the stop-out is $8$ (Ava’s second, the third-highest bid); Ava and Ben each win one unit at $8$. Show that Ava can profitably reduce her second bid to $0$. What is the Vickrey allocation and what does each winner pay?
::: solution
If Ava bids $(10, 0)$ the ranking is $10, 9, 7, 2, 1, 0$. Winners: Ava’s first and Ben’s first; stop-out is $7$ (Cara’s first). Ava wins one at $7$, payoff $10 - 7 = 3$. Under truth-telling she won one at $8$, payoff $2$. Demand reduction raised her payoff by $1$. (Ben still wins one, now at $7$; Cara still wins nothing.) The allocation happens to remain efficient — the two highest *first-unit* values still win — but Ava’s second unit, worth $8$, is not a winner either way against Ben’s $9$.

Vickrey: the efficient allocation is one unit to Ava and one to Ben (the two highest marginal values among the top $K$ in the combined list are $10$ and $9$). Ava’s payment for her one unit is the highest rejected rival bid that would have been accepted without her, namely Ben’s second or Cara’s first: without Ava the winners would be Ben and Cara, stop-out Cara’s $7$, so Ava pays $7$. Ben pays the highest rejected rival without him: Ava’s second $8$ or Cara’s $7$, actually without Ben the winners are Ava (two units, values $10$ and $8$), so the opportunity cost of Ben’s unit is Ava’s second unit, $8$. Ben pays $8$. Ava’s payoff is $10-7=3$, Ben’s is $9-8=1$. Neither wants to misreport, by the usual VCG argument ([[information-economics/efficient-mechanisms]]).
:::
:::

::: warning Uniform-price is not “the Vickrey auction for several units”
A widespread slip, inherited from the unit-demand case, is to treat a uniform-price auction as strategy-proof. It is not. The price a multi-unit bidder pays on her inframarginal units is her own marginal bid (or is pushed up by it). Vickrey’s payments are rival bids. Treasury “uniform-price” sales are not dominant-strategy mechanisms, and the demand-reduction incentive is one reason some countries kept discriminatory rules.
:::

::: widget plot
f: 10-x; 8; 6
x: 0, 6
y: 0, 12
labels: \text{Ava residual demand}; \text{truthful 2nd bid}; \text{reduced 2nd bid}
hlines: 8; 6
caption: A schematic residual-supply picture. Ava’s second-unit bid, if it is the stop-out, sets the uniform price on *both* of her units. Cutting that bid from $8$ to $6$ lowers the price she pays on the first unit. Hover along the demand step; the incentive to cut appears whenever the second unit is close to marginal.
:::

::: example Share auction, two bidders {#ex-wilson-share}
Wilson’s share auction: a perfectly divisible good of supply $1$, two bidders, each with value $\theta_i \cdot q - \tfrac12 q^2$ for a quantity $q$ (so inverse demand is $p = \theta_i - q$). They bid demand curves, the price $p$ clears the market, and each pays $p$ times her quantity (uniform-price). In a symmetric linear equilibrium, bidders demand less than their true demand at every $p$. Sketch why, without computing the equilibrium.
::: solution
A bidder who inflates her demand raises $p$ and therefore the bill on every unit she is already getting. The first-order condition for her demand at the margin equates marginal value to $p$ *plus* quantity times $\mathrm{d}p/\mathrm{d}q_i$, a strictly positive term. So she names a demand curve below the true one. The larger her expected quantity, the stronger the reduction — a continuous version of [[#prop-demand-reduction]]. Wilson (1979, *Quarterly Journal of Economics*) computed the linear equilibrium and showed that with two bidders the distortion is severe; as $n$ grows it vanishes, as in a competitive limit.
:::
:::

## Discriminatory auctions and the treasury comparison

In a discriminatory auction the shade is the first-price shade: you pay what you bid, so you bid below value on every unit, more so on units you are likely to win. There is no “second bid sets first price” channel. Whether uniform-price or discriminatory raises more expected revenue is theoretically ambiguous (Ausubel, Cramton, Pycia, Rostek and Weretka, 2014, *American Economic Review*, give examples in both directions). The empirical literature on treasury auctions is correspondingly mixed. Hortaçsu and McAdams (2010), already cited in [[market-design/revenue-equivalence]], find a small gap in Turkish data. The US Treasury’s 1990s experiment (Archibald and Malvey 1998) reported that uniform-price did not reduce revenue and may have increased it, and the Treasury adopted uniform-price for notes and bonds; bills have a more complicated history. The honest theoretical summary is that **unit demand plus IPV restores a revenue-equivalence logic**, and **multi-unit demand breaks it in a direction that depends on $F$ and on $K/n$**.

::: example Discriminatory versus uniform-price, two units {#ex-disc-uniform}
Two units, two bidders, unit demand (each wants at most one), values $v_A = 10$, $v_B = 6$, private and known for this illustration. Uniform-price: both bid value, both win, price is the highest rejected bid — but with only two bidders and two units the highest rejected bid is $0$ if nobody else is present. Add a third bidder with value $4$ who wants one unit. Truthful uniform-price: winners $A$ and $B$, price $4$. Discriminatory, if they bid values: $A$ pays $10$, $B$ pays $6$. Contrast the two payments, and say why, with private values, bidding $10$ in discriminatory is not an equilibrium.
::: solution
Uniform-price: the three unit bids $10, 6, 4$; the two highest win; stop-out $4$; $A$ and $B$ each pay $4$. Discriminatory with naive value-bids: $A$ pays $10$ (payoff $0$), $B$ pays $6$ (payoff $0$). Bidding value in discriminatory is dominated — $A$ can bid $4+\varepsilon$ still beat $C$, win, and pay much less than $10$. The first-price shade of [[market-design/auction-formats]] appears on each unit. Uniform-price, with unit demand, has no such shade: bidding $10$ still pays $4$. That is why the two formats, which coincide in allocation here, do not coincide in *equilibrium* bids once demand is for payment of one’s own bid.
:::
:::

::: quiz
A bidder wants two of $K$ identical units in a uniform-price auction. Relative to her true second-unit value, her equilibrium second-unit bid is typically
- [ ] equal to that value, because uniform-price is a Vickrey rule
- [x] below that value (demand reduction)
- [ ] above that value, to secure the unit
- [ ] zero, because the second unit is free
::: solution
[[#prop-demand-reduction]]. Uniform-price is not Vickrey once demand exceeds one. Bidding above value is dominated in any of these formats with private values (you might win a unit worth less than you pay). The second unit is not free: it pays the stop-out, and it can *set* the stop-out.
:::
:::

## Heterogeneous objects: the simultaneous ascending auction

Spectrum licences are not identical. A nationwide operator wants a *collection* of regional licences, and the value of a licence in Manchester depends on whether the firm also has Leeds. Selling them one at a time, in sequence, exposes the bidder to **aggregation risk**: she may win the first and lose the second, or skip the first and watch the second sell cheap. Selling them independently as sealed bids gives her no chance to react. The format the FCC adopted in 1994, and that many other regulators copied, is the **simultaneous ascending auction** (SAA, or simultaneous multiple-round, SMR).

::: definition Simultaneous ascending auction {#def-saa}
All licences are open for bidding at once. In each round, bidders name new bids on any licences they wish, subject to an **activity rule** (a bidder must bid on a sufficient fraction of the licences she hopes to win, or lose eligibility). The round’s standing high bids are posted. The auction closes when a round produces no new bids. Each standing high bidder then wins that licence and pays her standing bid. A **reserve** (minimum opening bid) may apply.
:::

The SAA is an English auction for many objects at once, with a common clock in discrete rounds. Linkage ([[market-design/common-values]]) recommends it when values have a common component: prices on one licence inform bidders about another. The activity rule exists to stop **parking** (bidding on a licence you do not want, to keep the auction open while you wait) and to force information out early. Milgrom (2004, *Putting Auction Theory to Work*) is the reference for the design as used.

It does not solve every problem. **Demand reduction** still occurs: a large bidder may stop bidding on a licence to keep prices down on the rest of her package. **Collusion** is easier than in a sealed bid, because rivals can use bids as messages (“I want A, you take B”) — the 1996–97 FCC auction of PCS licences produced documented bid signalling by trailing digits (Cramton and Schwartz 2000, *Journal of Law and Economics*). **Exposure** remains: a bidder who wants A and B together may be standing high on A when B has been bid out of reach, and the SAA does not let her withdraw without a penalty.

::: example Exposure in a two-licence SAA {#ex-exposure}
Two licences, $A$ and $B$. Ava values the pair at $15$ and either licence alone at $1$. Ben values $A$ at $6$ and $B$ at $0$; Cara values $B$ at $6$ and $A$ at $0$. No package bids are allowed. Sketch a path on which Ava is exposed on $A$, and a path on which she drops both licences and the split is inefficient.
::: solution
Suppose Ava’s pair is worth $15$ and either licence alone is worth $1$; Ben values $A$ at $6$ and $B$ at $0$; Cara values $B$ at $6$ and $A$ at $0$. The efficient allocation is the pair to Ava ($15 > 6+6$). Without package bids Ava must bid on $A$ and $B$ separately. Ben is willing to go to $6$ on $A$, Cara to $6$ on $B$. If Ava is standing high on $A$ at $5$ when $B$ has been bid to $6$ by Cara, her remaining value for $A$ alone is $1$, so she should drop $A$; if a slow reaction or a withdrawal penalty leaves her standing high on $A$ at a price above $1$, she is **exposed** and may win a licence she values at $1$ for more than $1$. If instead she drops both early to avoid that risk, Ben wins $A$ and Cara wins $B$, which is inefficient. A package bid of $15$ on $\{A,B\}$ would have let her contest the pair without naming high stand-alone bids.
:::
:::

## Combinatorial auctions

A **combinatorial** (package) auction lets a bidder name a bid for a *set* of objects, not just for each object. The Vickrey–Clarke–Groves mechanism extends: each bidder names a value for every package, the seller chooses an allocation that maximises reported surplus, and each winner pays the externality she imposes on the others. Strategy-proofness survives. Two practical objections have kept VCG from being the field standard. **Payments can be zero** (or very low) when competition is thin on packages even if it is thick on items — the “low-revenue” problem. **The message space is exponential**: $2^K - 1$ packages. And VCG outcomes can be **not in the core**: a coalition of the seller and a subset of bidders may prefer a different allocation, which invites negotiation after the sale.

Practical combinatorial designs therefore compromise. The **combinatorial clock auction** (CCA), used by Ofcom in the UK and by several other regulators in the 2010s, runs an ascending clock to discover prices, then a sealed supplementary round in which package bids are named, then a Vickrey-nearest-core payment rule to restore core prices. Cramton, Shoham and Steinberg (2006) collect the designs. The trade-off is the chapter’s recurring one: incentive compatibility, revenue, simplicity, and core stability cannot all be had at once.

::: application Spectrum, 1994–2000
The US Congress authorised spectrum auctions in 1993, after decades of comparative hearings and a brief, unsatisfactory lottery period (Milgrom 2004, ch. 1, recounts the history). Auction 1 (July 1994) used the SAA on ten nationwide narrowband licences; six bidders won, net proceeds USD 617 million (FCC). Subsequent broadband PCS auctions in 1994–96 raised larger sums in the same format. The UK’s 3G auction in April 2000 used an ascending format for five licences, one reserved for a new entrant, and raised GBP 22.5 billion (National Audit Office, 2001). Germany’s 3G sale the same year, also ascending, raised EUR 50.8 billion. Later European 3G sales, some of them sealed-bid, raised less — after the telecom share-price boom had broken, and after the set of serious bidders had changed. Comparing those numbers as a test of format is not possible without a model of $F$, of entry, and of 2000’s capital-market conditions; Klemperer (2002, 2004) and Binmore and Klemperer (2002) argue the case for taking entry seriously. India’s 2010 3G auction (Department of Telecommunications) used a simultaneous ascending format and raised about INR 677 billion (DoT, 2010 auction results). Brazil’s 4G (Anatel, 2012) and Nigeria’s spectrum sales have used variants of the same idea. The design lesson the chapter draws is modest and positive: when objects are complements and information is dispersed, a simultaneous ascending sale with an activity rule is a workable default; when exposure is first-order, a combinatorial overlay is the next instrument, not a different reserve.
:::

::: widget montecarlo
mode: integral
f: 2*x*(1-x)
a: 0
b: 1
n: 2000
caption: A reminder from the single-unit theory: $\int_0^1 2x(1-x)\,\mathrm{d}x = 1/3$ is two-bidder uniform expected revenue. Multi-unit revenue has no such universal number — it depends on $K$, on demand reduction, and on the payment rule. Use this figure as a baseline, then notice that nothing in the multi-unit formulae reduces to it once a bidder wants two units. A numerical integral, not a forecast.
:::

## Evidence, briefly

Laboratory. List and Lucking-Reiley (2000, *American Economic Review*) sold multi-unit lots of sports cards in uniform-price and Vickrey auctions on the internet and found demand reduction in uniform-price, of the sign [[#prop-demand-reduction]] predicts. Engelbrecht-Wiggans, List and Reiley (2006) replicate. Kagel and Levin’s multi-unit experiments find the same qualitative shade, and find that Vickrey is not always played as a dominant strategy when the payment rule is hard to compute.

Field. The treasury literature was mentioned above. For spectrum, the “success” of 1994 is a consensus among the designers and among most commentators (McMillan 1994; Cramton 1995; Milgrom 2004); the “success” of 2000’s European 3G sales is not. Combinatorial clock auctions have been studied by Bichler, Goeree, Mayer and Shabalin (among others); reported problems include supplementary-round gaming and price-driver strategies. The literature is active and unsettled; this chapter does not pick a winner among CCA variants.

## Where this leads

Matching markets, beginning in the next chapter, drop prices. The design problem becomes stability and strategy-proofness rather than demand reduction and exposure, but the methodological habit is the same: write down the game the rule induces, compute the equilibrium, and only then ask whether the rule should be changed. Spectrum and treasury auctions remain among the largest applications of the theory in this course; the matching applications in [[market-design/school-choice]] and [[market-design/exchange-without-money]] are the largest without money.

::: history
Vickrey (1961) already discussed multi-unit generalisations. Robert Wilson, “Auctions of shares” (*Quarterly Journal of Economics*, 1979), gave the first equilibrium of a uniform-price share auction and exhibited demand reduction. Lawrence Ausubel and Peter Cramton’s work in the 1990s (several papers, including Ausubel’s 2004 *American Economic Review* “ascending-bid auction for multiple objects”) clarified the inefficiency of uniform-price and proposed dynamic Vickrey implementations. The FCC’s 1994 SAA, designed by McAfee, Milgrom and Wilson, is the institutional turning point; Milgrom and Wilson’s 2020 Nobel citation names it. Combinatorial clock auctions were developed in the 2000s for Ofcom and others, with Cramton a principal consultant.
:::

::: summary
- Three payment rules for $K$ identical units: uniform-price, discriminatory, Vickrey ([[#def-multi-unit]]). With unit demand they collapse to $(K+1)$-st price, first-price, and Vickrey, which coincide in the last two names’ logic. With multi-unit demand they do not.
- Uniform-price invites **demand reduction**: a bidder shades her marginal bid to hold down the price on inframarginal units ([[#prop-demand-reduction]]). Vickrey does not; discriminatory shades for a first-price reason.
- Heterogeneous complements: the **simultaneous ascending auction** ([[#def-saa]]) with an activity rule is the spectrum default. It reveals information (linkage) and lets bidders assemble packages, but it does not eliminate demand reduction, signalling, or exposure.
- Combinatorial (package) bids, including VCG and the combinatorial clock auction, address exposure at the cost of complexity, possible low revenue, and possible non-core outcomes.
- Treasury and spectrum proceeds are historical. Comparing them across countries and years is not a test of format without a model of values, entry and the cycle.
:::

## Exercises

::: exercise Unit demand, three units {level=1}
Three identical units, four bidders, each wanting at most one, values $12, 9, 7, 4$. Uniform-price (equivalently Vickrey, with unit demand): who wins, and at what price?
::: solution
The three highest values win: $12, 9, 7$. The highest rejected bid is $4$, which is the uniform price. Each of the three winners pays $4$.
:::
:::

::: exercise Demand reduction, arithmetic {level=1 check="3"}
In [[#ex-demand-reduction]], Ava’s payoff under truthful uniform-price bidding is $2$ and under the reduced bid $(10, 0)$ is $3$. What is the gain from demand reduction? (Enter the gain.)
::: solution
$3 - 2 = 1$.
:::
:::

::: exercise Vickrey payment {level=1 check="7"}
In the same example, Ava’s Vickrey payment for her one unit is $7$. Confirm in one sentence why, and enter $7$.
::: solution
Without Ava, Ben and Cara would be the winners; Cara’s first-unit bid $7$ is the opportunity cost of Ava’s unit. She pays $7$.
:::
:::

::: exercise Discriminatory shade, unit demand {level=2}
$K = 1$ (so we are back to a single object), $n = 2$, uniform$[0, 1]$ IPV. Discriminatory coincides with first-price. What is the equilibrium bid of a bidder with $v = 0.80$? How does this compare with her uniform-price / second-price bid?
::: solution
First-price: $b = v/2 = 0.40$. Second-price (uniform-price with $K = 1$): $b = 0.80$. She shades in discriminatory / first-price and not in uniform-price / second-price. With $K = 1$ there is no demand-reduction channel in uniform-price, because there is no inframarginal unit.
:::
:::

::: exercise Inefficient demand reduction {level=2}
Two units. Two bidders. Ava: $(10, 9)$. Ben: $(8, 1)$. If both bid truthfully in uniform-price, who wins what, at what price? Show that Ava has a profitable demand reduction, and that the resulting allocation is inefficient.
::: hint
Truthful ranking: $10, 9, 8, 1$. After Ava drops her second bid below $8$, the ranking changes.
:::
::: solution
Truthful: the two highest bids are Ava’s $10$ and $9$; stop-out is $8$; Ava wins both units at $8$; her payoff is $10+9-16 = 3$. Ben wins nothing. If Ava instead bids $(10, 0)$, the ranking is $10, 8, 1, 0$; winners are Ava’s first and Ben’s first; stop-out is $1$; Ava’s payoff is $10-1 = 9 > 3$. Ben wins one unit worth $8$ at price $1$. The efficient allocation was both units to Ava (marginal values $10$ and $9$ beat $8$ and $1$). Demand reduction assigns the second unit to Ben: inefficient.
:::
:::

::: exercise Exposure, numbers {level=2}
Two licences. Ava values the pair at $15$, either alone at $1$. Ben values only $A$, at $8$. Cara values only $B$, at $8$. The SAA has just produced standing bids Ava $7$ on $A$, Cara $7$ on $B$. Ava must decide whether to raise on $B$. What is her risk if she raises, and what is her risk if she drops $A$?
::: solution
If she raises on $B$ she may still lose $B$ to Cara (who will go to $8$) and be left standing on $A$ at $7$, which she values at $1$: a loss of $6$ if she cannot withdraw. If she drops $A$ now, she has neither licence, payoff $0$, and Ben will take $A$, Cara $B$, total surplus $16 > 15$, which in this profile is efficient. Exposure is the *risk* of the first path, not the certainty. A package bid of $15$ on $\{A,B\}$ would have let her contest the pair without naming high stand-alone bids.
:::
:::

::: exercise Vickrey vs uniform-price, two units {level=3}
Two units, two bidders, Ava $(5, 4)$, Ben $(3, 1)$, private values, truthful Vickrey versus truthful uniform-price (truthful *as a benchmark* — we already know uniform-price is not strategy-proof). Compute allocations and payments under both rules, assuming truthful bids. Then, using [[#prop-demand-reduction]], say which bidder wants to deviate from truth-telling in uniform-price.
::: solution
Combined marginal values: $5, 4, 3, 1$. Efficient allocation: both units to Ava. Uniform-price stop-out is $3$ (highest rejected); Ava pays $6$ for two units, payoff $5+4-6=3$. Vickrey: Ava’s two units displace Ben’s $(3,1)$, so she pays $3+1=4$, payoff $5$. (Check: without Ava, Ben would get both; opportunity cost $3+1=4$.) Ben pays $0$ and gets nothing. In uniform-price Ava is setting the price on both units with her contest against Ben’s first unit; she can drop her second bid below $3$, win only one unit at a stop-out of $1$ (Ben’s second), payoff $5-1=4 > 3$. She will deviate. Vickrey does not give her that incentive: dropping the second bid would lose a unit worth $4$ for a payment saving of $0$ on the first (the first unit’s Vickrey price is Ben’s first-unit $3$, independent of her second bid).
:::
:::

::: exercise Activity rules {level=3}
In an SAA with no activity rule, describe a parking strategy for a bidder who wants only licence $B$ but fears that $B$’s price will jump once $A$ has sold. Why does an activity rule — requiring her to bid on a fraction of her eligibility each round — make that strategy costly? What genuine bidding behaviour might the same rule interfere with?
::: hint
Parking: bid on $A$ to keep the auction open, without intending to win $A$.
:::
::: solution
Without an activity rule she can bid the minimum increment on $A$ for many rounds, delaying the close, and switch to $B$ only when she likes $B$’s price. She ties up $A$ and slows price discovery on $B$. An activity rule counts that $A$-bid toward eligibility only if she maintains sufficient activity; if she later wants a large package she may have lost eligibility by not bidding on enough licences, and if she is a small bidder her $A$-parking uses eligibility she will need on $B$. The cost is that a bidder with a genuine *substitutes* strategy (bid on $A$ or $B$, whichever is cheaper) may be forced to bid on both to keep eligibility, pushing prices up on a licence she will later drop — a version of exposure created by the rule itself. Designers trade that off against parking; there is no theorem that the current FCC activity-rule parameters are optimal.
:::
:::

::: exercise Share-auction first-order condition {level=3}
A bidder in a uniform-price share auction chooses a quantity $q$ given residual supply $p = a + b q$ (the more she demands, the higher the uniform price). Her value for quantity $q$ is $u(q) = \theta q - \tfrac12 q^2$. Write the first-order condition for $q$, and show that she demands less than the competitive quantity $\theta - p$.
::: solution
Payoff is $u(q) - p(q) q = \theta q - \tfrac12 q^2 - (a + b q)q = \theta q - \tfrac12 q^2 - a q - b q^2$. Differentiate: $\theta - q - a - 2 b q = 0$, so $\theta - p - q - b q = 0$ because $p = a + bq$, hence $q = (\theta - p)/(1+b)$. The competitive (price-taking) demand is $q = \theta - p$. For $b > 0$, $(\theta-p)/(1+b) < \theta-p$. The extra $b q$ is the demand-reduction term: quantity times the slope of residual supply.
:::
:::
