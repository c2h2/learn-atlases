A cost function says how cheaply a firm can produce $q$. It does not say which $q$ to produce. That is **profit maximisation**: choose $q$ to maximise $p q - C(q)$, taking the price as given. A **perfectly competitive** firm is defined by that taking-as-given. Its supply curve is the marginal-cost curve above average variable cost. Summing those supplies and intersecting with demand gives a **short-run equilibrium**; letting firms enter and exit until profit is zero gives a **long-run equilibrium**. The same geometry measures producer surplus and, with the consumer surplus of [[microeconomics/slutsky-and-welfare]], the gains from trade in a competitive market.

This chapter is the supply half of [[principles/supply-and-demand]], derived rather than assumed. Monopoly and oligopoly — firms that do *not* take $p$ as given — belong to [[industrial-organisation/monopoly-pricing]] and [[industrial-organisation/cournot-bertrand]]. Notation: profit $\pi$ (this is a micro chapter, so $\pi$ is not inflation), cost $C(q)$ when factor prices are in the background, otherwise $c(w, r, q)$.

## The competitive firm

::: definition Perfect competition {#def-pc}
A firm is **perfectly competitive** if it treats the output price $p$ and input prices $(w, r)$ as independent of its own $(q, K, L)$. Its **profit** is

$$
\pi(q) = p q - C(q),
$$ {#eq-profit}

where $C(q) = c(w, r, q)$ is the cost function of [[microeconomics/production-and-cost]], short-run or long-run as the horizon requires. A **supply function** $q(p)$ (possibly a correspondence) is a profit-maximising output at each $p$.
:::

The assumption is an idealisation of many small firms, a homogeneous product, free information, and no barriers. It is a benchmark, not a census of industries. When it fails, the first-order condition below fails with it. Empirically, "how competitive is this market?" is a question about residual demand elasticities and about entry, asked in [[industrial-organisation/market-structure]]; the present chapter develops the polar case in which residual demand is perfectly elastic at $p$, so that the firm's only decision is how much to sell at that price.

Taking $p$ as given is also a statement about what the firm *knows*. A wheat farmer does not need to estimate a demand curve; she needs to watch a posted price and her own $MC$. That informational thinness is part of the appeal of the competitive model, and part of why it is a poor description of a firm that sets a catalogue price, advertises, and turns customers away. The mathematics of $p = MC$ is the same in both stories; the economic content is not.

::: proposition Competitive supply {#prop-supply}
Suppose $C$ is differentiable and convex (so $MC$ is non-decreasing). An interior profit maximum satisfies

$$
p = MC(q) = C'(q).
$$ {#eq-p-mc}

In the short run the firm produces this $q$ only if $p \ge \min AVC$; otherwise it shuts down and $q = 0$. In the long run it produces only if $p \ge \min AC$; otherwise it exits. Consequently short-run supply is the $MC$ curve above $\min AVC$, and long-run supply of an existing firm is the $MC$ curve above $\min AC$.
:::

::: proof
First-order condition: $\pi'(q) = p - C'(q) = 0$. Second-order: $\pi''(q) = -C''(q) \le 0$ by convexity of $C$. Shutdown: at $q = 0$ the firm still pays fixed cost $F$ in the short run, so it compares $p q - VC(q) - F$ with $-F$. Producing beats shutting down iff $p \ge VC(q)/q = AVC(q)$, and at the FOC point this is $p \ge \min AVC$ because $MC$ cuts $AVC$ at its minimum. Long run: $F$ is avoidable, so the comparison is with zero, i.e. $p \ge AC(q)$, and $MC$ cuts $AC$ at $\min AC$.
:::

If $C$ is strictly convex the supply is a function; if $C$ is linear (CRS, $AC$ constant) the supply is a correspondence: $q = 0$ if $p < AC$, any $q \ge 0$ if $p = AC$, and no finite maximum if $p > AC$. That last case is why a competitive industry with IRS cannot have an equilibrium with a finite number of firms making positive output — a theme of [[microeconomics/welfare-theorems]] and of industrial organisation.

::: example A quadratic cost firm {#ex-quadratic-firm}
Let $C(q) = q^2 + 16$, so $MC = 2q$, $AC = q + 16/q$, $AVC = q$. (a) Find min $AC$ and min $AVC$. (b) Write the short-run supply function. (c) At $p = 12$, find $q$, profit, and producer surplus.
::: solution
(a) $AC' = 1 - 16/q^2 = 0$ at $q = 4$, $\min AC = 8$. $\min AVC = 0$ at $q = 0$ (there is no shutdown above $p = 0$; variable cost is $q^2$, which starts at the origin).

(b) $p = 2q$ gives $q^s(p) = p/2$ for $p \ge 0$.

(c) $q = 6$, revenue $72$, cost $36+16 = 52$, profit $\pi = 20$. Producer surplus, the area above $MC$ and below $p$, is $\int_0^6 (12 - 2q)\,\mathrm{d}q = 12\cdot 6 - 6^2 = 72-36 = 36$, which equals revenue minus variable cost $72 - 36 = 36$. Profit is producer surplus minus fixed cost, $36-16 = 20$.
:::
:::

::: example Shutdown {#ex-shutdown}
Now $C(q) = 2q^2 + 8q + 16$, so $MC = 4q + 8$, $AVC = 2q + 8$, $AC = 2q + 8 + 16/q$. (a) Find min $AVC$ and min $AC$. (b) Supply? (c) Profit at $p = 16$ and at $p = 24$.
::: solution
(a) $AVC$ is minimised at $q = 0$, $\min AVC = 8$. $AC' = 2 - 16/q^2 = 0$ at $q = \sqrt{8} = 2\sqrt{2} \approx 2.83$, $\min AC = 2\cdot 2\sqrt{2} + 8 + 16/(2\sqrt{2}) = 4\sqrt{2} + 8 + 4\sqrt{2} = 8 + 8\sqrt{2} \approx 19.31$.

(b) $p = 4q + 8$ for $p \ge 8$, i.e. $q^s(p) = (p-8)/4$ for $p \ge 8$, and $q = 0$ for $p < 8$.

(c) At $p = 16$, which lies in $[\min AVC, \min AC)$: $q = 2$, $TR = 32$, $VC = 2\cdot 4 + 16 = 24$, $TC = 40$, $\pi = -8$. The firm produces because $p = 16 > AVC(2) = 12$, and the loss of 8 is smaller than the fixed cost of 16 it would pay if it shut down. At $p = 24$: $q = 4$, $TR = 96$, $TC = 32 + 32 + 16 = 80$, $\pi = 16$.
:::
:::

::: widget plot
f: 2*x; x + 16/x; x
x: 0.5, 12
y: 0, 24
labels: MC; AC; AVC
caption: The firm of [[#ex-quadratic-firm]]: $MC=2q$, $AC=q+16/q$, $AVC=q$. Supply is the $MC$ curve. At $p=12$ the firm produces $q=6$, where $MC=12$ and $AC=6+16/6\approx 8.67$, so profit per unit is positive. Drag a horizontal line in your head from $p=8$ (min $AC$ at $q=4$): below that price a long-run firm would exit, but this short-run firm still produces because $AVC$ is below $MC$ everywhere $q>0$.
:::

## Industry supply and short-run equilibrium

::: definition Industry supply and short-run equilibrium {#def-sr-eq}
With $n$ identical firms, each supplying $q^s(p)$, **industry supply** is $Q^s(p) = n q^s(p)$. A **short-run competitive equilibrium** given demand $Q^d(p)$ is a price $p^*$ with $Q^d(p^*) = Q^s(p^*)$. Each firm produces $q^s(p^*)$ and earns $\pi = p^* q^s(p^*) - C(q^s(p^*))$.
:::

Entry is not allowed in the short run: $n$ is fixed, and so is each firm's capital. The equilibrium price can lie above or below min $AC$; profits can be positive or negative. What cannot happen, with the shutdown rule, is $p < \min AVC$ and $Q > 0$.

::: example Ten quadratic firms {#ex-ten-firms}
Ten firms have the costs of [[#ex-quadratic-firm]], so $Q^s = 10\cdot(p/2) = 5p$. Market demand is $Q^d = 80 - p$. Find the short-run equilibrium price, quantity, output per firm, and profit per firm.
::: solution
$5p = 80 - p$, $6p = 80$, $p^* = 80/6 = 40/3 \approx 13.333$. $Q^* = 5\cdot 40/3 = 200/3 \approx 66.67$. Each firm produces $q = (40/3)/2 = 20/3 \approx 6.67$. Cost $C = (20/3)^2 + 16 = 400/9 + 16 = 544/9 \approx 60.44$. Revenue $(40/3)(20/3) = 800/9 \approx 88.89$. Profit $256/9 \approx 28.44$. Positive: $p^*$ exceeds $\min AC = 8$, so entry will look attractive in the long run.
:::
:::

A **tax** of $t$ per unit, levied on firms, shifts each $MC$ up by $t$ and so shifts $Q^s$ up by $t$. Incidence — how much of $t$ falls on buyers versus sellers — is determined by the relative elasticities of $Q^d$ and $Q^s$, as in [[principles/markets-and-welfare]] and [[public-economics/tax-incidence]]. The competitive apparatus of this chapter is what makes those elasticities well-defined: they are properties of $MC$ curves and of Marshallian demand.

::: widget cobweb
g: 6 - x/2
x0: 1
steps: 20
x: 0, 8
y: 0, 8
caption: Cobweb dynamics on quantity: demand $p=12-q$ and supply $q=p/2$ give the map $q_{t+1} = (12-q_t)/2 = 6 - q_t/2$. Equilibrium $q=4$, $p=8$. Start at $q_0=1$ and watch the orbit spiral in. The slope of supply is flatter than demand in this scaling, so the cobweb is stable. The figure is a *dynamic* curiosity about lagged supply; the equilibrium of [[#def-sr-eq]] does not need a cobweb story to exist.
:::

Demand p=12-q, supply q=p/2 so p=2q. Inverse supply slope 2, inverse demand slope -1. The map on quantity: producers last period received p_t = 12 - q_t, supply q_{t+1} = p_t/2 = 6 - q_t/2. Fixed point q=6-q/2 => (3/2)q=6, q=4. |slope of g| = 1/2 < 1, stable. Good.

## Long-run equilibrium

::: definition Long-run competitive equilibrium {#def-lr-eq}
A **long-run competitive equilibrium** with free entry is a price $p^*$, an output per active firm $q^*$, and a number of firms $n^*$ such that:

1. each active firm maximises profit at $(p^*, q^*)$: $p^* = MC(q^*)$ and $q^*$ minimises $AC$ (or, with identical firms, $p^* = \min AC$);
2. demand is served: $Q^d(p^*) = n^* q^*$;
3. profits are zero: $p^* q^* - C(q^*) = 0$.

With identical firms and U-shaped $AC$, this means $p^* = \min AC$, $q^* = \arg\min AC$, and $n^* = Q^d(p^*)/q^*$.
:::

Zero profit is not a failure; it is the definition of $p$ being bid down (or up) by entry (or exit) until firms are indifferent between being in and being out. Economic profit here is already net of the rental on capital: $C(q)$ includes $rK$. Zero economic profit is compatible with a positive accounting profit that just covers the opportunity cost of capital.

The long-run supply curve of the *industry* is, with identical firms and no scarce industry-specific factor, a horizontal line at $\min AC$. Any demand shift is absorbed entirely by $n$, not by $p$. If a factor is in limited supply to the industry — land for vineyards, a licensed taxi medallion, a particular mineral — then extra entry bids up that factor's price, each firm's $AC$ rises, and long-run industry supply slopes up. The extra payment is a rent to the scarce factor, not a competitive profit. Marshall distinguished these "rents" from profits with some care; the distinction still matters when someone points to a high accounting return in a competitive industry and calls it evidence of market power. It might be evidence of a scarce input instead.

A demand increase in the short run raises $p$ along the fixed-$n$ supply curve, raises profit, and so sets up entry. The path from the short-run equilibrium to the long-run one is a sequence of such steps. Nothing in the static model says how fast they happen. Industries with large sunk costs and slow permitting (electricity generation, pharmaceuticals) can spend a long time at a "short-run" equilibrium; industries with trivial setup (some digital services, some retail) can look like the long-run picture almost immediately. The labels are horizons, as they were for cost curves.

If firms have heterogeneous costs, the long-run price equals the min $AC$ of the *marginal* firm, intramarginal firms earn rents, and those rents are the return to whatever scarce factor (a better location, a patent, a manager) makes them intramarginal. The identical-firm case is the clean picture, not the only one.

::: example Long-run with the quadratic cost {#ex-lr}
Demand $Q^d = 80 - p$, each firm $C(q) = q^2 + 16$ as in [[#ex-quadratic-firm]], so $\min AC = 8$ at $q = 4$. Find $p^*$, $q^*$, $n^*$, and $Q^*$. Compare with the short-run $n = 10$ of [[#ex-ten-firms]].
::: solution
$p^* = 8$, $q^* = 4$, $Q^* = 80-8 = 72$, $n^* = 72/4 = 18$. Eighteen firms, each producing at min $AC$, each earning zero economic profit. In the short run with $n = 10$, price was $40/3 \approx 13.33$ and profit was positive, so eight firms enter, price falls to 8, and industry output rises from $200/3 \approx 66.7$ to $72$.
:::
:::

::: warning Zero profit is not zero cash
Students (and commentators) sometimes treat "zero profit in the long run" as a claim that competitive firms barely survive. $C(q)$ includes the opportunity cost of every input, capital among them. Zero *economic* profit means owners earn the going return on capital, nothing extra. A firm with zero economic profit can pay wages, rent, interest and dividends at market rates. Confusing economic with accounting profit is the same error as confusing $m$ with full income in the labour-supply chapter.
:::

::: quiz
In a long-run competitive equilibrium with identical firms and U-shaped $AC$, which equality does *not* have to hold?
- [ ] $p = MC(q)$
- [ ] $p = AC(q)$
- [ ] $MC(q) = AC(q)$
- [x] $p = AVC(q)$
::: solution
$p = MC$ (profit max), $p = AC$ (zero profit), and those two imply $MC = AC$, hence $q$ minimises $AC$. $AVC$ lies below $AC$ whenever there is a fixed cost, so $p = AVC$ would mean $AC > p$ and negative profit, which is not a long-run equilibrium with free exit.
:::
:::

## Producer surplus and efficiency of a single market

**Producer surplus** at price $p$ is the area above the supply curve and below $p$, equal (in the short run) to the sum over firms of $TR - VC$, or equivalently of profit plus fixed cost. Combined with Marshallian consumer surplus, the total surplus in a competitive market is maximised at the equilibrium $(Q^*, p^*)$, among all quantities that could be produced by these firms and consumed by these demanders. That is the partial-equilibrium version of the first welfare theorem, proved properly in [[microeconomics/welfare-theorems]]. A tax, a price ceiling or a monopoly restriction that moves $Q$ away from $Q^*$ creates a **deadweight loss** equal to the missing surplus on the units not traded.

The statement is only as good as its assumptions: no externalities, no market power, complete information, and — for the Marshallian area — small income effects. Each of those failures is a later chapter.

::: application An entry test, not a verdict
Positive short-run profits attract entry in the model. In a real industry, entry takes time, products are differentiated, and sunk costs make exit sticky. Observing positive accounting profits is therefore not, by itself, evidence that a market is not competitive, and observing exit is not evidence that it is. The model organises the question; it does not answer it from a newspaper headline.
:::

::: history
**1890, Alfred Marshall.** *Principles* defined the short run and the long run, drew industry supply from firm $MC$ curves, and introduced producer surplus as the area above supply.

**1920s, Piero Sraffa and the cost controversies.** Sraffa's 1926 paper argued that IRS (falling $AC$) is incompatible with competitive price-taking, a tension resolved in modern terms by Chamberlin and Robinson's monopolistic competition and by later general-equilibrium work on convexity.

**1951, Kenneth Arrow and 1954, Arrow and Debreu.** The first welfare theorem lifted Marshall's surplus argument from one market to the whole economy, under convexity. That is [[microeconomics/welfare-theorems]].

**1976, Arnold Harberger.** The applied measurement of deadweight triangles in competitive markets distorted by taxes is associated with Harberger's work of the 1960s–70s, still the workhorse of [[public-economics/efficiency-costs-of-taxation]].
:::

## Where this leads

A competitive industry is one block of a general equilibrium: the same $p = MC$ will have to hold for every produced good, and factor prices will have to clear input markets ([[microeconomics/general-equilibrium]]). Relaxing price-taking produces monopoly, oligopoly and monopolistic competition ([[industrial-organisation]]). Relaxing "no externalities" produces the Pigouvian agenda of [[microeconomics/welfare-theorems]] and [[public-economics/externalities]]. The cobweb figure is a reminder that equilibrium is a stationary point of a price-adjustment story; whether that story is stable is a question for [[mathematical-economics/difference-and-differential-equations]].

::: summary
- A competitive firm takes $p$ as given and maximises $pq - C(q)$. Interior FOC: $p = MC$. Short-run supply is $MC$ above $\min AVC$; long-run supply of an incumbent is $MC$ above $\min AC$.
- Industry supply with $n$ identical firms is $n$ times firm supply. Short-run equilibrium equates $Q^d$ to $Q^s$ at that $n$. Profits may be positive or negative.
- Long-run free entry drives $p$ to $\min AC$, $q$ to $\arg\min AC$, and $n$ to $Q^d(p)/q$. Economic profit is zero; accounting profit need not be.
- Producer surplus is the area above supply and below $p$, equal to $TR - VC$. Competitive quantity maximises the sum of consumer and producer surplus in a single market without externalities.
- CRS with $p > AC$ yields infinite desired output; IRS is incompatible with a competitive equilibrium of finite firms. Convex costs are part of the definition of the benchmark.
:::

## Exercises

::: exercise Read off supply {level=1 check="6"}
For $C(q) = q^2 + 16$, $p = 12$, what output does the firm choose? (Enter $q$.)
::: solution
$p = MC = 2q$ gives $q = 6$.
:::
:::

::: exercise Profit {level=1 check="20"}
In the same problem, what is profit? (Enter $\pi$.)
::: solution
$TR = 72$, $C = 36+16 = 52$, $\pi = 20$.
:::
:::

::: exercise Shutdown price {level=1 check="8"}
For $C(q) = 2q^2 + 8q + 16$, what is the short-run shutdown price? (Enter $\min AVC$.)
::: solution
$AVC = 2q+8$, minimised at $q=0$ with value $8$. Shutdown at $p < 8$.
:::
:::

::: exercise Short-run industry {level=2}
Twenty firms have $C(q) = q^2 + 16$. Demand is $Q = 100 - 2p$. Find the short-run equilibrium $p$ and $Q$, and profit per firm.
::: solution
Firm supply $q = p/2$, industry $Q^s = 10p$. Then $10p = 100-2p$, $12p = 100$, $p = 25/3 \approx 8.333$. $Q = 10\cdot 25/3 = 250/3 \approx 83.33$. Each $q = 25/6 \approx 4.17$. $\pi = p q - q^2 - 16 = (25/3)(25/6) - (25/6)^2 - 16 = 625/18 - 625/36 - 16 = 625/36 - 16 = (625 - 576)/36 = 49/36 \approx 1.36$. Slightly above min $AC$, small profits.
:::
:::

::: exercise Long-run entry {level=2 check="18"}
Demand $Q = 80-p$, $C(q) = q^2+16$. How many firms in long-run equilibrium? (Enter $n^*$.)
::: solution
From [[#ex-lr]], $n^* = 18$.
:::
:::

::: exercise A per-unit tax {level=2}
Ten firms, $C(q) = q^2 + 16$, demand $Q = 80-p$. A tax of $t = 6$ per unit is levied on firms, shifting each $MC$ from $2q$ to $2q+6$. Find the new short-run $p$ paid by buyers and the quantity. How much of the tax is paid by buyers, how much by sellers?
::: solution
Firm FOC: $p_{\text{buyer}} = 2q + 6$, so $q = (p-6)/2$, $Q^s = 5(p-6)$. $5p - 30 = 80-p$, $6p = 110$, $p_{\text{buyer}} = 55/3 \approx 18.333$. $Q = 80-55/3 = (240-55)/3 = 185/3 \approx 61.67$. Price received by sellers is $p-6 = 37/3 \approx 12.333$. Pre-tax price was $40/3 \approx 13.333$. Buyers pay $5$ more ($13.333 \to 18.333$); sellers receive $1$ less ($13.333 \to 12.333$). The two pieces sum to the tax of $6$. Incidence is heavier on the demand side because, in this linear example, demand is steeper than supply in the $p$–$Q$ plane.
:::
:::

::: exercise Derive supply from the cost function {level=3}
A firm has $c(w, r, q) = 2q\sqrt{w r}$ (the CRS Cobb–Douglas of the previous chapter). Show that long-run competitive supply is: produce nothing if $p < 2\sqrt{w r}$, produce any $q \ge 0$ if $p = 2\sqrt{w r}$, and that no finite $q$ maximises profit if $p > 2\sqrt{w r}$.
::: solution
$MC = AC = 2\sqrt{w r}$, constant. $\pi = \bigl(p - 2\sqrt{w r}\bigr) q$. If $p < AC$, $\pi$ is maximised at $q=0$. If $p = AC$, $\pi = 0$ for all $q$. If $p > AC$, $\pi \to \infty$ as $q \to \infty$. CRS competitive firms cannot have a finite interior supply at a price above min $AC$; industry equilibrium, if it exists, must have $p = 2\sqrt{w r}$ and $n q = Q^d(p)$, with $n$ and $q$ separately indeterminate.
:::
:::

::: exercise Producer surplus as an integral {level=3}
For $MC = 2q$ and $p = 12$, compute producer surplus two ways: as $\int_0^{6} (12-2q)\,\mathrm{d}q$ and as $TR - VC$ with $VC = q^2$. Reconcile with profit when $FC = 16$.
::: solution
Integral: $\bigl[12q - q^2\bigr]_0^6 = 72-36 = 36$. $TR-VC = 72-36 = 36$. Profit $= TR-VC-FC = 20$. Producer surplus $= \pi + FC$.
:::
:::

::: exercise Heterogeneous firms {level=3}
Firm A has $C_A(q) = q^2 + 4$ (so $\min AC_A = 4$ at $q=2$). Firm B has $C_B(q) = q^2 + 16$ ($\min AC_B = 8$ at $q=4$). Demand is $Q = 20 - p$. In a long-run equilibrium where both may enter freely but each firm type is available in unlimited copies, which type operates, at what $p$, and how many firms?
::: hint
Free entry of the lower-cost type bids $p$ down to that type's min $AC$.
:::
::: solution
Type A has the lower min $AC$. Free entry of A bids $p$ to $4$. Type B, whose min $AC$ is 8, exits (or never enters). At $p=4$, $Q^d = 16$, each A-firm produces $q=2$, so $n_A = 8$, $n_B = 0$. (If copies of A were scarce, B might operate as a marginal firm and A would earn a rent of $4$ per unit on its intramarginal output.)
:::
:::
