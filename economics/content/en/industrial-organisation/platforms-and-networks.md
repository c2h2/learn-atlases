A payment card is useful because merchants accept it; merchants accept it because cardholders carry it. A messaging app is useful because other people use it. A video-game console is useful because games are written for it, and games are written for it because the installed base is large. These are not ordinary products. Demand for them depends on how many other people — or how many people on the *other* side of a market — are expected to demand them. This chapter treats **network effects** (direct externalities among users of the same product) and **two-sided platforms** (intermediaries who set prices to two groups that value each other’s presence). The pricing rule that emerges is a cousin of the Lerner index, with an extra term for the cross-group externality, and it can rationalise a price of zero, or a negative price, on one side.

The industrial-organisation questions are the usual ones — mark-ups, entry, compatibility, foreclosure — with a new comparative static: a firm may want more rivals on one side in order to be more attractive on the other, or it may want incompatibility in order to tip the market. Competition-policy applications are taken up in the next chapter; the models here are the positive theory.

## Direct network effects

::: definition Network effect {#def-network}
A good has a **direct network effect** if a user’s willingness to pay is increasing in the number of other users of the same good (or of compatible goods). A **fulfilled-expectations** (or rational-expectations) equilibrium of a network market is a pair $(p, q)$ such that $q$ equals the demand that materialises when all users expect that $q$, at the price $p$.
:::

A linear, fulfilled-expectations demand that is enough for every calculation in this section is
$$
p = a - q + \phi q^e, \qquad q^e = q,
$$ {#eq-net-demand}
with $a > 0$ and $\phi < 1$ (so that demand slopes down in actual quantity once expectations are fulfilled). The fulfilled inverse demand is $p = a - (1-\phi)q$, as if the slope had been flattened by $\phi$. A monopolist with cost $c$ facing this inverse demand sets
$$
q^m = \frac{a-c}{2(1-\phi)}, \qquad p^m = \frac{a+c}{2}.
$$
The quantity is *larger* than the no-network monopoly, because the firm internalises the externality among its own users; the price formula looks the same as [[industrial-organisation/monopoly-pricing#eq-linear-monopoly]] with $b = 1-\phi$. A social planner who maximises surplus, taking the externality into account, would produce still more, up to $p = c$, i.e. $q = (a-c)/(1-\phi)$. The monopolist expands output relative to a no-network world but not all the way to the social network-optimum.

::: proposition Critical mass and tipping {#prop-critical}
Suppose a user’s stand-alone value is heterogeneous and the network effect is strong. Then the fulfilled-expectations demand $q(p)$ can be backward-bending or multi-valued: at a given $p$, a small network and a large network can both be self-fulfilling. The **critical mass** at that $p$ is the smallest expected network that, if expected, is fulfilled and is locally stable under a myopic adjustment $q^e \mapsto q(p, q^e)$. Below the critical mass the network unravels toward zero; above it, it grows toward the large equilibrium. **Tipping** is the process by which one of two incompatible networks attracts (almost) all users, once it is ahead.
:::

::: proof
With [[#eq-net-demand]] the fulfilled map is single-valued and downward-sloping in $p$, so this linear specification does *not* produce multiple fulfilled quantities at a given $p$. Multiplicity needs a non-linearity — for example a logistic adoption curve $q = F(v_0 - p + \phi q^e)$ with $F$ an S-shaped cdf. Then $q = F(v_0 - p + \phi q)$ can have three intersections, the middle one unstable. The smallest stable positive intersection, as a function of $p$, is the critical mass. Tipping between two incompatible networks is the same diagram with a relative-size state variable: the basin of attraction of “all on A” versus “all on B” is divided by a threshold that depends on prices and on compatibility. Katz and Shapiro (1985, *American Economic Review*) and Farrell and Saloner (1985, *RAND Journal of Economics*) are the references for the two-network case.
:::

::: widget plot
f: a - (1-phi)*x; c + 0*x
x: 0, 20
y: 0, 16
sliders: a=12:8:16:0.5; phi=0.4:0:0.8:0.05; c=2:0:6:0.5
labels: \text{fulfilled inverse demand } a-(1-\varphi)q; \text{marginal cost}
caption: Fulfilled-expectations inverse demand $p = a-(1-\varphi)q$ and constant MC. Raise $\varphi$: the demand curve flattens and the monopoly quantity (halfway from $0$ to the intercept with MC, along a MR that is not drawn but has twice the slope) grows. At $\varphi = 0$ this is ordinary monopoly. The planner would go to the intercept of demand with MC.
:::

::: example A network monopolist {#ex-net-mon}
Take $a = 12$, $\phi = 1/2$, $c = 2$. Compute the fulfilled-expectations monopoly quantity and price, the planner’s quantity, and the no-network ($\phi = 0$) monopoly quantity.
::: solution
$q^m = (12-2)/(2\cdot 1/2) = 10$, $p^m = 7$. Planner: $p=c=2$ on $p = 12 - 0.5 q$ gives $q = 20$. No-network monopoly: $q = 5$, $p = 7$. The network effect doubles monopoly output at the *same* price in this linear example, because $p^m = (a+c)/2$ does not depend on $\phi$ and the slope change is absorbed entirely by quantity. Deadweight loss relative to the planner is the usual monopoly triangle on the flattened demand, here $\tfrac12 \times (7-2) \times (20-10) = 25$, larger in *quantity* units than the no-network DWL of $12.5$ because the socially optimal output has grown too.
:::
:::

Compatibility is a strategic choice. Katz and Shapiro (1985) showed that firms with a small installed base tend to want compatibility (they free-ride on the large network) and firms with a large base tend to resist it (they protect the base). The social planner’s compatibility decision weighs the network-size gain against the loss of variety and against the cost of adapters. There is no general theorem that the market chooses too little compatibility or too much; Farrell and Saloner (1985, 1986) give examples of both excess inertia (sticking with an inferior standard) and excess momentum (switching too readily).

::: warning Metcalfe’s law is not a demand curve
A popular claim, associated with Ethernet’s Robert Metcalfe, is that a network’s *value* scales as the square of the number of users (the number of potential links). That is a statement about a complete graph, not about willingness to pay at the margin, and it does not imply that inverse demand is $p = k q$. Fulfilled-expectations demand is an empirical object; $\phi$ in [[#eq-net-demand]] is a slope, not a law. Using $q^2$ as if it were surplus, and then recommending a price or a merger, confuses a counting formula with a welfare integral.
:::

## Two-sided platforms

::: definition Two-sided platform {#def-two-sided}
A **two-sided platform** (or two-sided market) is an intermediary that sells interactions to two groups, $1$ and $2$, such that (i) members of each group care about the number (or the quality) of members of the other group, and (ii) the **price structure** — how a given price *level* $p_1+p_2$ is split between the two sides — affects the volume of interactions, not only the level. Rochet and Tirole (2006, *RAND Journal of Economics*) propose (ii) as the definition that distinguishes two-sidedness from a vertically related chain with a single mark-up.
:::

A card network, an operating system, a search engine, a ride-hailing app, a newspaper (readers and advertisers), and a shopping mall are the usual examples. The definition excludes a vertically integrated manufacturer-retailer of [[industrial-organisation/vertical-relations]], unless retailers care about the number of other retailers.

::: proposition Rochet–Tirole usage-price rule {#prop-rt}
A monopoly platform charges usage prices $p_1, p_2$ to two sides with interaction volume $q = D_1(p_1)\, D_2(p_2)$ (the multiplicative special case of Rochet and Tirole 2003, *Journal of the European Economic Association*) and has cost $c$ per interaction. At an interior optimum the **price level** $P = p_1 + p_2$ satisfies
$$
\frac{P - c}{P} = \frac{1}{\lvert\varepsilon_1\rvert + \lvert\varepsilon_2\rvert},
$$ {#eq-rt-level}
where $\varepsilon_i$ is the elasticity of $D_i$ with respect to $p_i$. Equivalently, each side obeys a Lerner rule on the opportunity cost $c - p_j$ of serving it:
$$
\frac{p_i - (c - p_j)}{p_i} = \frac{1}{\lvert\varepsilon_i\rvert}.
$$ {#eq-rt-side}
Holding the other price fixed, the less elastic side is charged a higher Lerner mark-up over $c-p_j$. Either $p_i$ can be negative if $c-p_j < 0$ and $\lvert\varepsilon_i\rvert$ is not too small. Assumptions: no membership fees, no fixed costs, no multi-homing complications; the two demands interact only through the product $D_1 D_2$.
:::

::: proof
Profit is $(P-c) D_1(p_1) D_2(p_2)$. Differentiating in $p_1$ gives $D_1 D_2 + (P-c) D_1' D_2 = 0$, or $1 + (P-c)(D_1'/D_1) = 0$. Since $D_1'/D_1 = \varepsilon_1/p_1$, this is $(P-c)/p_1 = 1/\lvert\varepsilon_1\rvert$, which is [[#eq-rt-side]]. The $p_2$ condition is symmetric. Adding $p_1 = (P-c)\lvert\varepsilon_1\rvert$ and $p_2 = (P-c)\lvert\varepsilon_2\rvert$ yields $P = (P-c)(\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert)$, which rearranges to [[#eq-rt-level]].
:::

The total price is set as if the platform were an ordinary monopolist facing the *sum* of the two elasticities. The split is a pair of ordinary Lerner rules, each treating the other side’s price as a subsidy to cost. That is why a card network can pay rewards to cardholders ($p_1 < 0$) and charge merchants, and why a newspaper can give the paper away and charge advertisers. None of these prices is a recommendation; they are first-order conditions under the stated demand.

Armstrong (2006, *RAND Journal of Economics*) uses membership prices and a Hotelling structure on each side. The extra, and widely used, result is the **competitive bottleneck**: if side 1 single-homes (joins one platform) and side 2 multi-homes (joins every platform that side 1 might join), platforms compete fiercely for side 1 and then charge side 2 for access to their exclusive side-1 members. The single-homing side is courted; the multi-homing side pays. Whether a given pair of groups (app developers and users; merchants and cardholders; advertisers and searchers) is a bottleneck of this kind is an empirical question about homing, not a theorem about digital firms.

::: example A multiplicative platform {#ex-rt}
$D_1(p_1) = 10 - p_1$, $D_2(p_2) = 8 - p_2$, $c = 2$. Find the Rochet–Tirole prices, the total price, and the volume. Confirm [[#eq-rt-level]].
::: solution
The first-order condition $1 + (P-c) D_i'/D_i = 0$ with $D_i' = -1$ says $D_i = P-c$. So $10-p_1 = P-2$ and $8-p_2 = P-2$, hence $p_1 = 12-P$ and $p_2 = 10-P$. Summing, $P = 22-2P$, so $P = 22/3$. Then $p_1 = 14/3$, $p_2 = 8/3$. Volume $D_1 = 16/3 = P-2$. Lerner on the total: $(22/3-2)/(22/3) = 8/11$. And $\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert = (14/3)/(16/3) + (8/3)/(16/3) = 22/16 = 11/8$, whose reciprocal is $8/11$. Side 1, which has the larger intercept, pays more in this linear example.
:::
:::

::: example Divide-and-conquer numbers {#ex-divide}
A new platform must attract two sides. Stand-alone value is $0$ on each side until the other side is on board. The platform can subsidise side 1 by $s$ per user and then charge side 2 a price $p_2$. If $10$ users on side 1 are enough to make side 2 willing to pay $4$ each, and there are $10$ users on side 2, what $s$ is the largest the platform would pay per side-1 user to launch, ignoring ongoing costs?
::: solution
Revenue from side 2 is $40$. The platform would pay up to $4$ per side-1 user ($s \le 4$) to get those $10$ users. After launch, Rochet–Tirole prices take over. The launch subsidy is an investment in the installed base, the chicken-and-egg price of Caillaud–Jullien, not a recoupment-free gift.
:::
:::

::: example Homing and a fee {#ex-homing-fee}
Two platforms, users single-home, developers multi-home. Each platform has $50$ exclusive users. A developer values access at $1$ per user. What fee can each platform charge the developer, in Armstrong's bottleneck logic, and what would happen to that fee if users multi-homed instead?
::: solution
Each platform is a gate to $50$ exclusive users, so it can charge up to $50$ (or $1$ per exclusive user). If users multi-home, the developer can reach the same users through either platform and will not pay a bottleneck fee — the platforms then compete on the developer side and the fee is competed down. Homing is the primitive; the fee is not a technological constant.
:::
:::

::: widget plot
f: (x - c)/x; 1/(e1+e2) + 0*x
x: 2, 20
y: 0, 1
sliders: c=2:0:6:0.5; e1=1.5:0.6:4:0.1; e2=2:0.6:4:0.1
labels: \text{Lerner on the total price }(P-c)/P; \text{target } 1/(\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert)
caption: A calculator for [[#eq-rt-level]]. The figure’s $x$ is the total price $P$; the first curve is $(P-c)/P$. The second is the right-hand side, a horizontal line at $1/(\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert)$. Move the elasticities: the target falls as either side becomes more elastic, so the matching $P$ falls toward $c$. Equivalently $P = c\,\frac{\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert}{\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert-1}$.
:::

::: quiz
A monopoly card platform, in the Rochet–Tirole multiplicative model, can charge a negative price to cardholders only if
- [ ] cardholder demand is perfectly inelastic
- [x] the opportunity cost $c - p_{\text{merchant}}$ is negative, i.e. the merchant price already more than covers $c$
- [ ] network effects are absent
- [ ] the total price $P$ is negative
::: solution
[[#eq-rt-side]] sets a Lerner mark-up over $c-p_j$. If $p_{\text{merchant}} > c$, the opportunity cost of serving a cardholder is negative, and a negative cardholder price can still leave a positive mark-up over that opportunity cost. A negative *total* $P$ would mean the platform loses money on every interaction and cannot be an interior optimum with $c \ge 0$. Perfectly inelastic cardholder demand would push the cardholder price *up*, not down.
:::
:::

Caillaud and Jullien (2003, *RAND Journal of Economics*) labelled the underlying chicken-and-egg problem **divide-and-conquer**: subsidise one side (divide) so as to charge the other (conquer). The subsidy is not a gift; it is an input into the other side’s demand. Weyl (2010, *American Economic Review*) showed that a platform that can use insulating tariffs — prices that hold one side’s expected participation fixed while the other side’s price changes — can implement any interior allocation, which is the two-sided analogue of first-degree discrimination.

Multi-homing versus single-homing also changes foreclosure. A platform that ties a complementary product, or that makes its system incompatible, is more likely to exclude when the other side cannot multi-home. The vertical-foreclosure logic of [[industrial-organisation/vertical-relations]] applies, with the extra twist that excluding a rival on one side can *reduce* the platform’s attractiveness on the other. That is why a merger of two platforms is not the same exercise as a merger of two manufacturers: diversion ratios have to be measured on *both* sides, and a price rise on one side can be offset, or amplified, by a price change on the other.

::: application Homing in cards and in apps
In four-party card networks, cardholders often carry several cards (multi-home) and a merchant’s decision to accept a network is closer to joining a bottleneck if shoppers single-home on a card at the till. Armstrong’s prediction is then that the network that holds exclusive cardholders can charge merchants more — the interchange-fee debate in a sentence. In mobile app stores, users typically single-home on an operating system in the short run and developers multi-home; the bottleneck is then the user side, and the store’s fee falls on developers. Both descriptions are stylised; they are the homing hypotheses one would test, not findings about any named firm. (This is not a recommendation of any interchange fee, store fee, or platform.)
:::

## Where this leads

[[industrial-organisation/competition-policy]] takes these models into merger control and abuse-of-dominance cases involving platforms: market definition on two sides, the meaning of a price of zero, and the treatment of most-favoured-nation clauses and self-preferencing. The economic caution is the same as in vertical relations. A zero price is not a predatory price if it is the Rochet–Tirole split; it can be a predatory price if it is a Dixit-style investment in tipping. Distinguishing the two is an empirical question about homing, diversion and recoupment, not a slogan about digital markets.

::: history
**1974, Jeffrey Rohlfs.** “A theory of interdependent demand for a communications service”, *Bell Journal of Economics and Management Science* 5: critical mass in a telecommunications network.

**1985, Michael L. Katz and Carl Shapiro; Joseph Farrell and Garth Saloner.** Network externalities, compatibility and standardisation (*American Economic Review* 75; *RAND Journal of Economics* 16).

**2003, Jean-Charles Rochet and Jean Tirole.** “Platform competition in two-sided markets”, *Journal of the European Economic Association* 1: the usage-price rule [[#eq-rt-level]].

**2003, Bernard Caillaud and Bruno Jullien.** “Chicken and egg: competition among intermediation service providers”, *RAND Journal of Economics* 34: divide-and-conquer.

**2006, Mark Armstrong; Jean-Charles Rochet and Jean Tirole.** Competitive bottlenecks (*RAND Journal of Economics* 37) and the definition of two-sidedness by the price structure (*RAND Journal of Economics* 37).

**2010, E. Glen Weyl.** “A price theory of multi-sided platforms”, *American Economic Review* 100: insulating tariffs and the implementation of allocations.
:::

::: summary
- A **network effect** makes willingness to pay increase in expected network size. Fulfilled-expectations linear demand $p = a-(1-\phi)q$ flattens the slope; a monopolist expands output relative to $\phi=0$ but not to the social network-optimum $p=c$.
- **Critical mass** and **tipping** require a non-linearity. Compatibility is a strategic choice: small networks want it, large ones often do not. Metcalfe’s $n^2$ count is not a demand curve.
- A **two-sided platform** is defined by a price *structure* that matters, not only a price level (Rochet–Tirole 2006). The usage-price rule sets $(P-c)/P = 1/(\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert)$ and a Lerner split on opportunity cost $c-p_j$. Negative prices are an interior possibility.
- **Competitive bottlenecks** (Armstrong): the single-homing side is courted, the multi-homing side is charged. Homing, not “digital”, is the primitive.
- Divide-and-conquer, insulating tariffs, and two-sided foreclosure are the dynamic and exclusionary counterparts. A zero price is not, by itself, predation.
:::

## Exercises

::: exercise Network monopoly quantity {level=1 check="10"}
Fulfilled inverse demand $p = 12 - 0.5 q$, $c = 2$. Compute the monopoly quantity. (Enter $q^m$.)
::: solution
This is $a=12$, $\phi=1/2$. $q^m = (12-2)/(2\cdot 0.5) = 10$, $p^m = 7$.
:::
:::

::: exercise Planner’s network quantity {level=1 check="20"}
In the previous exercise, compute the planner’s quantity at $p=c$. (Enter $q$.)
::: solution
$2 = 12 - 0.5 q$ gives $q = 20$. The monopoly DWL relative to this point is $\tfrac12 \times 5 \times 10 = 25$.
:::
:::

::: exercise Total platform price {level=1 check="6"}
In the Rochet–Tirole multiplicative model, $\lvert\varepsilon_1\rvert = 1$, $\lvert\varepsilon_2\rvert = 1$, $c = 3$. Compute the optimal total price $P$. (Enter $P$.)
::: solution
$(P-c)/P = 1/(\lvert\varepsilon_1\rvert+\lvert\varepsilon_2\rvert) = 1/2$. Then $1 - c/P = 1/2$, so $c/P = 1/2$, $P = 2c = 6$.
:::
:::

::: exercise A negative price {level=2}
A platform has usage cost $c = 2$, elasticities $\lvert\varepsilon_1\rvert = 4$ (side 1, very elastic) and $\lvert\varepsilon_2\rvert = 1$. The Rochet–Tirole total-price rule gives $P$. If the opportunity-cost Lerner split on side 1 uses a large cross-side externality, $p_1$ can be negative. Explain in two sentences why a negative $p_1$ is not, by itself, predation in this model.
::: solution
$P = c \cdot (5)/(5-1) = 2.5$. Side 1 can be charged $p_1 < 0$ with $p_2 = P - p_1 > P$ if the cross-group externality (or the opportunity cost of stealing a side-1 user) is large enough that the first-order condition on $p_1$ is negative at $0$. That is an interior two-sided price structure, the Rochet–Tirole split, not a below-cost exclusion strategy aimed at recoupment. Predation needs a recoupment theory ([[industrial-organisation/competition-policy#def-predation]]); a negative price on one side of a platform does not supply one by itself.
:::
:::

::: exercise Compatibility incentives {level=2}
Two networks, sizes $n_A > n_B$, compatibility parameter $\phi$ shared if they make the products compatible. In one sentence each: why the small network wants compatibility, and why the large one may not.
::: solution
The small network’s users gain a large extra network $n_A$ if products are compatible, which raises their willingness to pay and the small firm’s demand. The large network’s users already have $n_A$; compatibility gives them only $n_B$ extra and gives the small rival access to the large installed base, which can cut the large firm’s market power. Katz–Shapiro / Farrell–Saloner: compatibility is a strategic choice, not an engineering default.
:::
:::

::: exercise Competitive bottleneck {level=2}
Side $B$ multi-homes, side $S$ single-homes (buyers and sellers on a platform, in Armstrong’s labels). Who is courted with a low price, who is charged, and what happens to the charged side if a second platform appears but $B$ still multi-homes?
::: solution
The single-homing side $S$ is courted (a lower price, perhaps a subsidy): each platform needs those users to attract the other side. The multi-homing side $B$ is charged: they cannot play the platforms off against each other for a given $S$ user, because they join both. A second platform that does not change homing still leaves $B$ as a bottleneck; competition for $B$ does not break out until $B$ single-homes. Homing, not the number of platforms, is the primitive.
:::
:::

::: exercise Metcalfe is not demand {level=3}
A commentator says a network of size $2n$ is worth four times a network of size $n$, “by Metcalfe’s law”, and therefore a merger of two equal networks quadruples surplus. Using fulfilled-expectations demand $p = a-(1-\phi)q$, explain why that arithmetic is not a surplus calculation.
::: solution
Metcalfe’s $n^2$ counts potential links, not willingness to pay and not cost. Surplus is the area under fulfilled demand minus cost. Doubling $q$ on $p = a-(1-\phi)q$ raises gross surplus by a factor that depends on $a$, $\phi$ and $c$, and is *less* than four whenever demand slopes down (the extra users are inframarginal only in the $\phi \to 1$ limit with $a$ large). A merger also changes market power. $n^2$ is not a demand curve and not a merger simulation.
:::
:::

::: exercise Tipping versus SSNIP {level=3}
A two-sided market has tipped to one platform. A SSNIP on the buyer side of 5 per cent would lose few buyers, because of the network effect. Does that mean the relevant market is the platform, and the platform has monopoly power? Name the cellophane issue.
::: solution
A SSNIP at the *prevailing* price on a tipped platform is a SSNIP at a monopoly (or near-monopoly) price: demand looks inelastic because users are already on the elastic part of residual demand *given the installed base*. That is the cellophane fallacy of [[industrial-organisation/competition-policy]]. Market definition for a network good is done at a competitive benchmark, or abandoned in favour of a direct unilateral-effects analysis (diversion, homing, multi-homing costs). Tipping is evidence of a critical-mass dynamic; it is not, by itself, a finding of a relevant market.
:::
:::


