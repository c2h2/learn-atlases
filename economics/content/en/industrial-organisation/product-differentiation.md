A euro spent on a train ticket from Paris to Lyon and a euro spent on an airline seat on the same route buy different goods: different travel times, different stations, different discomfort. They also buy goods that *compete*. Industrial organisation needs a language for products that are neither identical (the Cournot–Bertrand homogeneous case) nor independent (two monopolies). That language is **product differentiation**. This chapter distinguishes horizontal from vertical differentiation, solves the Hotelling line and the Salop circle, and treats advertising as a demand shifter whose optimal intensity is governed by a simple elasticity rule.

Differentiation is the leading resolution of the Bertrand paradox of [[industrial-organisation/cournot-bertrand]]. A price cut no longer steals the entire market; it steals the buyers who were close to indifferent. The residual demand facing each firm is downward-sloping, the equilibrium mark-up is positive, and the mark-up is larger when products are more differentiated. Location, quality and advertising are three ways of producing that downward slope.

## Horizontal and vertical differentiation

::: definition Horizontal and vertical differentiation {#def-hv}
Two products are **horizontally differentiated** if, at equal prices, some buyers prefer each: tastes differ and there is no agreed ranking. They are **vertically differentiated** if, at equal prices, all buyers rank them in the same order: one is agreed to be of higher quality, and buyers differ only in their willingness to pay for quality. A market can have both dimensions at once.
:::

Train versus plane on a given day is mostly horizontal (some people hate airports, some people hate six-hour journeys). First class versus second class on the same train is vertical (everyone prefers first at the same price; they differ in how much they will pay for it). Brand cola versus store cola is a mixture: some buyers have a genuine taste for the brand, and some treat the brand as a quality signal.

The modelling consequence is the shape of demand. Horizontal models generate interior market-sharing at equal prices. Vertical models generate a quality-ordered partition of the type space, and can generate equilibria in which a low-quality product is not sold.

## The Hotelling line

Hotelling (1929) placed two sellers on a line and gave buyers a transport cost for travelling to a seller. The line can be geographic (two shops on a road) or a characteristic (sweetness of cider, political ideology, colour of a shirt).

::: definition Hotelling duopoly {#def-hotelling}
A continuum of buyers of mass 1 is uniformly distributed on $[0,1]$. Two firms sell a physically homogeneous good at constant marginal cost $c$ and are located at $x_1 \le x_2$ in $[0,1]$. A buyer at $x$ who buys from firm $i$ at price $p_i$ has utility
$$
u_x(i) = v - p_i - t(x-x_i)^2,
$$
with $v$ large enough that the market is covered and $t > 0$ a quadratic transport parameter. Firms simultaneously choose prices. Quadratic transport follows d’Aspremont, Gabszewicz and Thisse (1979, *Econometrica*): Hotelling’s original linear transport $t\lvert x-x_i\rvert$ does not yield a pure-strategy price equilibrium when the firms are close together.
:::

The indifferent buyer, found by equating the two utilities, sits at
$$
\hat x = \frac{x_1+x_2}{2} + \frac{p_2-p_1}{2t(x_2-x_1)},
$$ {#eq-indiff}
provided this lies between $x_1$ and $x_2$ in the relevant sense (between 0 and 1 when the market is covered). Firm 1’s demand is $\hat x$ and firm 2’s is $1-\hat x$.

::: proposition Hotelling prices at given locations {#prop-hotelling-p}
In the quadratic Hotelling game of [[#def-hotelling]] with $x_1 < x_2$, the unique Nash equilibrium in prices is
$$
\begin{aligned}
p_1 &= c + t(x_2-x_1)\Bigl(1 + \frac{x_1+x_2-1}{3}\Bigr),\\
p_2 &= c + t(x_2-x_1)\Bigl(1 + \frac{1-x_1-x_2}{3}\Bigr).
\end{aligned}
$$ {#eq-hotelling-p}
If the firms are at the endpoints $x_1 = 0$, $x_2 = 1$, this reduces to $p_1 = p_2 = c+t$. Each then serves half the market and earns $\pi_i = t/2$.
:::

::: proof
Demand for firm 1 is [[#eq-indiff]]. Profit $\pi_1 = (p_1-c)\hat x$. The derivative of $\hat x$ in $p_1$ is $-1/(2t\Delta)$ where $\Delta = x_2-x_1$. The first-order condition is
$$
\hat x - \frac{p_1-c}{2t\Delta} = 0 \implies \hat x = \frac{p_1-c}{2t\Delta}.
$$
Firm 2’s corresponding condition is $1-\hat x = (p_2-c)/(2t\Delta)$. Adding the two displayed equations: $1 = (p_1+p_2-2c)/(2t\Delta)$, so $p_1+p_2 = 2c + 2t\Delta$. Subtracting them gives $2\hat x-1 = (p_1-p_2)/(2t\Delta)$. From [[#eq-indiff]], $2\hat x-1 = (x_1+x_2-1) - (p_1-p_2)/(t\Delta)$. Equating and collecting the price difference,
$$
\frac{p_1-p_2}{2t\Delta} + \frac{p_1-p_2}{t\Delta} = x_1+x_2-1 \implies p_1-p_2 = \frac{2t\Delta}{3}(x_1+x_2-1).
$$
Solving the sum and difference for $p_1$ and $p_2$ gives [[#eq-hotelling-p]]. At the endpoints, $\Delta = 1$ and $x_1+x_2-1 = 0$, so $p_i = c+t$. Then $\hat x = 1/2$ and $\pi_i = t/2$. Second-order conditions hold because demand is linear in own price.
:::

::: widget plot
f: v - p - t*x*x; v - r - t*(x-1)*(x-1)
x: 0, 1
y: 0, 12
sliders: v=10:6:14:0.5; p=3:0:6:0.1; r=3:0:6:0.1; t=1:0.2:3:0.1
labels: \text{utility of buying from } 0; \text{utility of buying from } 1
caption: Quadratic Hotelling utilities as a function of the buyer’s location $x$, with firms at $0$ and $1$. Sliders: reservation $v$, firm 1’s price $p$, firm 2’s price $r$, transport $t$. The crossing is the indifferent buyer $\hat x$. Start at $p=r=3$, $t=1$: the crossing is at $1/2$. Raise $p$: $\hat x$ moves left, firm 1 loses the middle. Raise $t$: both parabolas steepen and a given price gap moves $\hat x$ less — that is differentiation as a demand insulator.
:::

Differentiation *is* $t$. With firms at the ends, $p = c+t$: double $t$ and you double the mark-up. There is no Bertrand paradox here; two firms and a homogeneous physical good still leave a positive mark-up, because the good is not homogeneous *as delivered*.

::: example Endpoint Hotelling {#ex-ends}
Let $c = 2$, $t = 1$, firms at 0 and 1, $v = 10$. Compute prices, the indifferent consumer, profits, and a buyer’s utility at $x = 0$, $x = 1/2$ and $x = 1$.
::: solution
$p_1 = p_2 = 3$. The indifferent consumer is at $1/2$. Profits $t/2 = 1/2$ each. Utility: at $x=0$, buying from 1, $u = 10-3-1\cdot 0 = 7$; buying from 2, $u = 10-3-1\cdot 1 = 6$, so the local shop is preferred. At $x=1/2$, $u = 10-3-1\cdot(1/2)^2 = 7-0.25 = 6.75$ from either firm. At $x=1$, symmetrically, utility 7 from firm 2. All exceed zero, so the market is covered.
:::
:::

Where do the firms want to locate, if they choose locations before prices? With linear transport and *fixed* prices, Hotelling’s original conclusion was **minimum differentiation**: both firms crowd at the median. With quadratic transport and *endogenous* prices, d’Aspremont, Gabszewicz and Thisse (1979) showed the opposite: in the two-stage game the unique subgame-perfect equilibrium is **maximum differentiation**, $x_1 = 0$, $x_2 = 1$. The reason is the price effect. Moving toward the rival steals demand at given prices (the demand effect, which Hotelling saw) but also intensifies price competition (the price effect, which he did not). Under quadratic transport the price effect dominates, and the firms flee to the ends.

::: warning Linear transport and existence
It is tempting to use $t\lvert x-x_i\rvert$ because the algebra of $\hat x$ is slightly cleaner. For locations close together that specification destroys the concavity of profit: a firm may want to jump its price down and capture the whole market, as in Bertrand. There is then no pure-strategy price equilibrium. Quadratic transport restores concavity. If you need linear transport, keep the firms far apart (the endpoint case still has $p = c+t$ with linear transport too) or mix.
:::

## The Salop circle and free entry

A line has two ends, which is awkward once there are more than two firms. Salop (1979, *Bell Journal of Economics*) wrapped the line into a circle.

::: definition Salop circle {#def-salop}
A continuum of buyers of mass 1 is uniformly distributed on a circle of circumference 1. $n$ firms are equally spaced around the circle, each with constant marginal cost $c$ and a sunk entry cost $F > 0$. A buyer at distance $d$ from a firm pays transport $t d$ (linear, now safe because equal spacing keeps neighbours at least $1/n$ apart). Utility is $v - p_i - t d$, with $v$ large enough that the market is covered. Firms that enter compete in prices; $n$ is determined by a free-entry, zero-profit condition, treating $n$ as a real number for the calculus.
:::

Between two neighbouring firms the model is a Hotelling segment of length $1/n$.

::: proposition Salop prices, free entry and excess entry {#prop-salop}
In the symmetric Salop model, the Nash price is
$$
p = c + \frac{t}{n}.
$$ {#eq-salop-p}
Each firm’s variable profit is $t/n^2$. Free entry drives this to $F$, so
$$
n^e = \sqrt{\frac{t}{F}}
$$ {#eq-salop-n}
(ignoring integer constraints). The social planner who chooses $n$ to minimise the sum of entry costs $nF$ and total transport costs $t/(4n)$ would choose $n^* = \tfrac12 \sqrt{t/F} = n^e/2$. Free entry produces **excess entry**: twice as many firms as the planner, in this specification.
:::

::: proof
A firm that charges $p$ while its two neighbours charge $p^*$ faces, on each side, an indifferent buyer at distance $d$ given by $p + t d = p^* + t(1/n - d)$, so $d = (p^*-p)/(2t) + 1/(2n)$. Demand is $2d = (p^*-p)/t + 1/n$. Profit $(p-c)\bigl((p^*-p)/t + 1/n\bigr)$. The first-order condition at $p = p^*$ is $1/n - (p-c)/t = 0$, hence $p = c + t/n$. Variable profit $(t/n)\cdot(1/n) = t/n^2$. Setting this equal to $F$ gives [[#eq-salop-n]].

Total transport: each firm’s hinterland has length $1/n$; a buyer at distance $s$ from the midpoint of a hinterland... more simply, on each side of a firm the buyers run from 0 to $1/(2n)$, density 1, transport $t s$, so each firm’s transport bill is $2\int_0^{1/(2n)} t s\,\mathrm{d}s = t/(4 n^2)$, and $n$ firms give total transport $t/(4n)$. The planner minimises $nF + t/(4n)$; the first-order condition $F - t/(4n^2) = 0$ gives $n^* = \tfrac12 \sqrt{t/F}$.
:::

::: widget plot
f: c + t/x; c + 0*x
x: 1, 12
y: 0, 8
sliders: c=1:0:3:0.5; t=4:1:10:0.5
labels: \text{Salop price } c+t/n; \text{marginal cost } c
caption: Salop’s Nash price as a function of the number of firms $n$ (horizontal axis). Raise $t$: the whole schedule of mark-ups shifts up. At the free-entry $n^e=\sqrt{t/F}$ (not drawn, because $F$ is not a slider) the mark-up is $\sqrt{tF}$. Watch how fast $p$ falls in $n$: the fifth firm does much more to the price than the tenth.
:::

The excess-entry result is the spatial version of a business-stealing externality (Mankiw and Whinston 1986, *RAND Journal of Economics*). An entrant pays $F$ and captures buyers from neighbours; those captured buyers save some transport, but the entrant does not internalise the profit the neighbours lose. In Salop the stealing effect outweighs the transport-saving effect, and too many firms enter. Different specifications (elastic demand, uncovered market, different transport) can reverse the comparison; the robust lesson is that free-entry $n$ is not automatically efficient.

::: example A circular city {#ex-salop}
Let $t = 4$, $F = 1/4$, $c = 1$. Compute $n^e$, $p$, variable profit, $n^*$, and total transport under free entry and at the social optimum.
::: solution
$n^e = \sqrt{4/(1/4)} = \sqrt{16} = 4$. Then $p = 1 + 4/4 = 2$, variable profit $4/16 = 1/4 = F$, as required. $n^* = 2$. Total transport at $n=4$ is $4/(4\cdot 4) = 1/4$; at $n=2$ it is $4/(4\cdot 2) = 1/2$. Entry costs are $1$ at $n=4$ and $1/2$ at $n=2$. The social cost $nF + t/(4n)$ is $1.25$ under free entry and $1$ at the optimum. The extra two firms cost $1/2$ in entry and save $1/4$ in transport.
:::
:::

::: quiz
In Salop’s circle, an increase in transport cost $t$, with $F$ fixed, will
- [ ] lower the free-entry number of firms, because travel is more expensive
- [x] raise the free-entry number of firms, because the equilibrium mark-up $t/n$ can support more entry
- [ ] leave $n^e$ unchanged, because $F$ has not changed
- [ ] raise prices one-for-one with $t$, at fixed $n^e$
::: solution
[[#eq-salop-n]] has $n^e = \sqrt{t/F}$, increasing in $t$. The mark-up $t/n^e = \sqrt{t F}$ also rises, but less than one-for-one. The last option would be true if $n$ were fixed; free entry makes $n$ endogenous. More differentiation (higher $t$) invites more entry, which partly competes the mark-up back down.
:::
:::

## Vertical differentiation

Now let products be ranked. Mussa and Rosen (1978) and Shaked and Sutton (1982, 1983) are the standard references; a stripped-down duopoly is enough to see the mechanism.

::: definition Vertical duopoly {#def-vertical}
Two firms sell qualities $s_H > s_L > 0$ at constant marginal costs $c_H \ge c_L$. A buyer of type $\theta$, with $\theta$ distributed on $[\underline\theta, \bar\theta]$, has utility $\theta s - p$ from quality $s$ at price $p$, and 0 from not buying. All buyers agree that $H$ is better; they differ in $\theta$, the willingness to pay per unit of quality.
:::

The indifferent type between $H$ and $L$ is $\hat\theta = (p_H - p_L)/(s_H - s_L)$; the indifferent type between $L$ and not buying is $\theta_0 = p_L/s_L$. High types buy $H$, middle types buy $L$, low types may buy nothing.

Two qualitative results drive the literature. First, **quality-equivalent prices** cannot be an equilibrium: if $p_H/s_H = p_L/s_L$, every buyer who buys prefers $H$ or is indifferent, and $L$ has no strictly loyal hinterland. The low-quality firm must sell at a discount that more than offsets the quality gap for some types. Second, in Shaked and Sutton’s version with endogenous quality and a mild condition on the income (type) distribution, only a finite number of firms can survive even as $F \to 0$ (**finiteness property**): the market is a “natural oligopoly”, unlike Salop, where $n^e \to \infty$ as $F \to 0$. Vertical differentiation plus a quality that can be raised without bound is a concentration mechanism that horizontal differentiation is not.

::: example A two-quality numerical market {#ex-vertical}
Let $s_H = 2$, $s_L = 1$, $c_H = c_L = 0$, and $\theta$ uniform on $[0,1]$. Suppose the firms set $p_H = 0.8$, $p_L = 0.2$. Find $\hat\theta$, $\theta_0$, demands, and profits. Is this a Nash equilibrium? (Check firm $L$’s best response at this $p_H$.)
::: solution
$\hat\theta = (0.8-0.2)/(2-1) = 0.6$. $\theta_0 = 0.2/1 = 0.2$. Demand for $H$ is $1-0.6 = 0.4$; demand for $L$ is $0.6-0.2 = 0.4$. Profits $0.8\cdot 0.4 = 0.32$ and $0.2\cdot 0.4 = 0.08$.

Firm $L$, taking $p_H = 0.8$ as given, has $\hat\theta = (0.8-p_L)/1 = 0.8-p_L$ and $\theta_0 = p_L$. Demand $0.8-2p_L$ (requiring $p_L \le 0.4$). Profit $p_L(0.8-2p_L)$; the maximum is at $p_L = 0.2$, profit $0.08$. So $L$ *is* best-responding. Firm $H$, taking $p_L = 0.2$, has $\hat\theta = p_H-0.2$, demand $1-(p_H-0.2) = 1.2-p_H$, profit $p_H(1.2-p_H)$, maximised at $p_H = 0.6$, not $0.8$. So the quoted prices are *not* a Nash equilibrium: $H$ would cut to $0.6$, earning $0.36$ rather than $0.32$. The Nash pair, by the same two best responses, is $p_L = 0.2$ wait — if $H$ plays $0.6$, $L$’s demand is $(0.6-p_L)-p_L = 0.6-2p_L$, profit $p_L(0.6-2p_L)$, best $p_L = 0.15$. Iterating is the way to the Nash point: the linear system $p_L = p_H/4$ from $L$’s FOC $p_L = \hat\theta_{\text{mid}}/2$ with $\hat\theta = p_H-p_L$, $\theta_0=p_L$, demand $p_H-2p_L$, FOC $p_H-4p_L=0$. And $H$’s FOC: demand $1-(p_H-p_L)$, profit $p_H(1-p_H+p_L)$, FOC $1-2p_H+p_L=0$. Solving $p_H = 4p_L$ and $1-8p_L+p_L=0$ gives $7p_L=1$, $p_L=1/7$, $p_H=4/7$. Demands: $\hat\theta = 3/7$, $\theta_0=1/7$, $q_H=4/7$, $q_L=2/7$. Profits $(4/7)(4/7)=16/49$ and $(1/7)(2/7)=2/49$.
:::
:::

The example is worth the arithmetic because it shows the method: write the two indifferent types, write demands, take first-order conditions, solve. The same method extends to $n$ qualities.

## Advertising

Advertising can be **informative** (it tells people the product exists, or what it costs, or where to buy it) or **persuasive** (it shifts tastes). The distinction is old (Marshall; later, Chamberlin) and empirically entangled, but the first-order condition for the advertising budget is the same once advertising is written as a demand shifter.

::: proposition Dorfman–Steiner condition {#prop-ds}
A monopolist with demand $q(p, A)$ depending on price and advertising outlay $A$, and constant marginal cost $c$, maximises $(p-c)q(p,A) - A$. At an interior optimum,
$$
\frac{A}{p q} = \frac{\varepsilon_A}{\lvert\varepsilon_p\rvert},
$$ {#eq-ds}
where $\varepsilon_A = (A/q)(\partial q/\partial A)$ is the advertising elasticity of demand and $\varepsilon_p$ is the price elasticity. The advertising-to-sales ratio equals the ratio of the two elasticities. Combined with the Lerner rule $ (p-c)/p = 1/\lvert\varepsilon_p\rvert$, this is $A = (p-c) q\, \varepsilon_A$.
:::

::: proof
The first-order condition in $A$ is $(p-c)\partial q/\partial A - 1 = 0$, so $p-c = 1/(\partial q/\partial A)$. Multiply by $q A / (p q A)$: $(p-c)/p \cdot (A/(pq))^{-1} \cdot (A/q)(\partial q/\partial A) = 1$, hence $L \cdot \varepsilon_A = A/(pq)$. Substitute $L = 1/\lvert\varepsilon_p\rvert$.
:::

Dorfman and Steiner (1954, *American Economic Review*) is the reference. The condition is a cousin of the Lerner rule: both equate a margin to an inverse elasticity, one for price and one for advertising. In oligopoly the same logic produces a best response in $A$ that depends on rivals’ advertising; whether advertising is a strategic complement or substitute depends on whether it expands the market or steals share (the same taxonomy as [[industrial-organisation/cournot-bertrand]]). Informative advertising that tells people a product exists tends to expand the market and can be complementary; purely stealing advertising is a zero-sum tournament.

Empirically, advertising-to-sales ratios vary widely across industries and over time. The World Federation of Advertisers and agency compilations (for example, WARC’s *Advertising Expenditure Report*, 2024 vintage) put global advertising expenditure on the order of several hundred billion US dollars a year, with digital channels taking a majority share in high-income countries by the early 2020s; those are expenditure aggregates, not estimates of $\varepsilon_A$. Industry-level studies typically find $\varepsilon_A$ well below 1, which, with price elasticities around $2$ to $5$ in branded consumer goods, is consistent with advertising-to-sales ratios of a few per cent rather than tens of per cent. The Dorfman–Steiner condition is a check on those magnitudes, not a recommendation to advertise.

::: application Informative advertising and search
Butters (1977) and Grossman and Shapiro (1984) model advertising as a random matching technology: a firm that sends more ads is more likely to inform a buyer of its existence and price. In a differentiated oligopoly this produces a downward-sloping residual demand even with otherwise homogeneous products, because some buyers have not heard of the rival. The mark-up and the advertising intensity are then jointly determined, and free entry again need not be efficient. Search models ([[information-economics]] if available; otherwise the same logic as sequential search) are the buyer-side counterpart: differentiation can be informational rather than physical.
:::

::: quiz
A monopolist has $\lvert\varepsilon_p\rvert = 4$ and $\varepsilon_A = 0.2$ at an interior optimum. The Dorfman–Steiner condition says the advertising-to-sales ratio is
- [ ] $0.8$
- [x] $0.05$
- [ ] $20$
- [ ] $4.2$
::: solution
$A/(pq) = 0.2/4 = 0.05$. The ratio $0.8$ would be the product of the elasticities; $20$ would be their inverse ratio the wrong way up. Combined with Lerner, $L = 1/4$, so 5 per cent of sales is spent on advertising and the margin is 25 per cent of price.
:::
:::

## Where this leads

Differentiation is the demand side of almost everything that follows. Entry in [[industrial-organisation/entry-and-deterrence]] is entry *into a location or a quality*. Collusion in [[industrial-organisation/collusion]] is easier to sustain when products are homogeneous (a deviation is more profitable, but detection is also easier — the net effect is discussed there). Vertical restraints in [[industrial-organisation/vertical-relations]] are often a response to retailers’ incentives to free-ride on each other’s point-of-sale service, a horizontal-differentiation problem in the downstream market. Platforms in [[industrial-organisation/platforms-and-networks]] differentiate on both sides. Merger simulation in [[industrial-organisation/competition-policy]] is, in current agency practice, more often a differentiated-Bertrand exercise than a Cournot one, and the diversion ratios that feed those simulations are the empirical version of $\hat x$ and $\varepsilon_A$.

::: history
**1929, Harold Hotelling.** “Stability in competition”, *Economic Journal* 39: two sellers on a line, the demand effect of location, and the (subsequently qualified) principle of minimum differentiation.

**1933, Edward Chamberlin.** *The Theory of Monopolistic Competition*: product differentiation and advertising as endogenous firm choices, with a free-entry zero-profit condition that is the ancestor of Salop’s.

**1954, Robert Dorfman and Peter O. Steiner.** “Optimal advertising and optimal quality”, *American Economic Review* 44: the elasticity rule [[#eq-ds]].

**1979, Claude d’Aspremont, Jean-Jaskold Gabszewicz and Jacques-François Thisse.** “On Hotelling’s ‘Stability in competition’”, *Econometrica* 47: quadratic transport, existence, and maximum differentiation.

**1979, Steven C. Salop.** “Monopolistic competition with outside goods”, *Bell Journal of Economics* 10: the circular city and the free-entry price $c+t/n$.

**1982–1983, Avner Shaked and John Sutton.** “Relaxing price competition through product differentiation”, *Review of Economic Studies* 49, and “Natural oligopolies”, *Econometrica* 51: vertical differentiation and the finiteness property.
:::

::: summary
- **Horizontal** differentiation: at equal prices, some buyers prefer each product. **Vertical**: all buyers agree on the ranking and differ in willingness to pay for quality.
- **Hotelling** with quadratic transport and firms at the ends: $p = c+t$, profits $t/2$. Locations chosen in a first stage tend to the ends (maximum differentiation), because the price effect of moving closer dominates the demand effect.
- **Salop** circle: $p = c + t/n$, free-entry $n^e = \sqrt{t/F}$, which is twice the transport-plus-entry-cost optimum. Free entry can over-provide varieties because of business stealing.
- **Vertical** duopoly: the low-quality good sells only at a discount that creates a middle interval of types. Endogenous quality can produce a natural oligopoly (Shaked–Sutton).
- **Dorfman–Steiner**: $A/(pq) = \varepsilon_A/\lvert\varepsilon_p\rvert$. Advertising is a demand shifter; whether it is wasteful or informative is a separate, empirical question.
:::

## Exercises

::: exercise Endpoint mark-up {level=1 check="5"}
Hotelling firms at 0 and 1, quadratic transport $t = 3$, $c = 2$. Compute the Nash price. (Enter $p$.)
::: solution
$p = c + t = 5$. Each demand $1/2$, profit $3/2$.
:::
:::

::: exercise Salop price {level=1 check="4"}
A Salop circle with $n = 5$ firms, $t = 10$, $c = 2$. Compute the symmetric Nash price. (Enter $p$.)
::: solution
$p = 2 + 10/5 = 4$. Variable profit $t/n^2 = 10/25 = 0.4$.
:::
:::

::: exercise Dorfman–Steiner ratio {level=1 check="0.08"}
A monopolist has $\lvert\varepsilon_p\rvert = 2.5$ and $\varepsilon_A = 0.2$ at an interior optimum. Compute $A/(pq)$. (Enter the ratio as a decimal.)
::: solution
$0.2/2.5 = 0.08$. Combined with Lerner, $L = 1/2.5 = 0.4$, so advertising is 8 per cent of sales and the margin is 40 per cent of price.
:::
:::

::: exercise A price cut on the line {level=2}
Endpoint Hotelling, $c = 0$, $t = 2$, currently $p_1 = p_2 = 2$. Firm 1 cuts its price to $1.6$. Compute $\hat x$, both demands, and firm 1’s new profit. Is the cut a profitable deviation from Nash?
::: solution
With firms at 0 and 1, $\hat x = 1/2 + (p_2-p_1)/(2t) = 1/2 + (2-1.6)/4 = 0.5 + 0.1 = 0.6$. Demands $0.6$ and $0.4$. Firm 1’s profit $1.6 \times 0.6 = 0.96$. Nash profit was $t/2 = 1$. The cut *lowers* profit, as it must at a Nash equilibrium. (The first-order condition at $p_1=p_2=t$ is exactly the statement that a small cut does not pay.)
:::
:::

::: exercise Free-entry Salop {level=2 check="6"}
$t = 9$, $F = 0.25$, $c = 1$. Compute the free-entry number of firms $n^e$ (treat $n$ as real, then report the integer if it is an integer). (Enter $n^e$.)
::: solution
$n^e = \sqrt{9/0.25} = \sqrt{36} = 6$. Then $p = 1 + 9/6 = 2.5$, variable profit $9/36 = 0.25 = F$. The planner would choose $n^* = 3$.
:::
:::

::: exercise Vertical best responses {level=2}
In the setting of [[#ex-vertical]] ($s_H=2$, $s_L=1$, $c=0$, $\theta$ uniform on $[0,1]$), compute the Nash prices, demands and profits.
::: solution
As derived in the example: $L$’s FOC is $p_H - 4p_L = 0$; $H$’s FOC is $1 - 2p_H + p_L = 0$. Then $p_H = 4p_L$ and $1 - 8p_L + p_L = 0$, so $p_L = 1/7$, $p_H = 4/7$. $\hat\theta = 3/7$, $\theta_0 = 1/7$, $q_H = 4/7$, $q_L = 2/7$, $\pi_H = 16/49$, $\pi_L = 2/49$. The high-quality firm earns eight times the low-quality firm on twice the quality and twice the demand, at four times the price.
:::
:::

::: exercise Excess entry as a theorem {level=3}
On the Salop circle, write social cost $C(n) = nF + t/(4n)$. (a) Show that $C'(n^e) > 0$, so that a small reduction in $n$ from the free-entry number lowers social cost. (b) Compute the ratio $C(n^e)/C(n^*)$. (c) What feature of the model, if relaxed, could reverse the excess-entry conclusion? Give one example.
::: hint
$n^e = \sqrt{t/F}$, $n^* = \tfrac12 n^e$. For (c), think about an uncovered market or a demand-expanding variety effect.
:::
::: solution
(a) $C'(n) = F - t/(4n^2)$. At $n^e = \sqrt{t/F}$, $t/(n^e)^2 = F$, so $C'(n^e) = F - F/4 = 3F/4 > 0$.

(b) $C(n^*) = \tfrac12\sqrt{t/F}\cdot F + t/(4\cdot \tfrac12\sqrt{t/F}) = \tfrac12 \sqrt{t F} + \tfrac12 \sqrt{t F} = \sqrt{t F}$. $C(n^e) = \sqrt{t/F}\cdot F + t/(4\sqrt{t/F}) = \sqrt{t F} + \tfrac14 \sqrt{t F} = \tfrac54 \sqrt{t F}$. Ratio $5/4$. Free entry wastes one quarter of the planner’s cost in this specification.

(c) If the market is not covered, extra firms expand consumption, not just steal. If demand is elastic and varieties are valued in a CES way (Dixit–Stiglitz 1977), extra varieties raise surplus directly and free entry can produce too few firms. Salop’s covered-market, inelastic-unit-demand specification shuts those channels down, which is why business stealing dominates.
:::
:::

::: exercise Maximum versus minimum differentiation {level=3}
Two firms choose locations on $[0,1]$ and then prices, with quadratic transport $t$ and cost $c=0$. (a) Using [[#eq-hotelling-p]], write firm 1’s reduced-form profit as a function of $(x_1,x_2)$ when both play the price equilibrium. (b) Evaluate the derivative of that profit in $x_1$ at the endpoints $x_1=0$, $x_2=1$, and argue that firm 1 does not want to move inward. (c) Contrast with Hotelling’s original (1929) argument, in which prices were fixed.
::: hint
At the endpoints $\Delta=1$ and $x_1+x_2-1=0$, so $p_1=p_2=t$ and $\pi_1=t/2$. For a small move of $x_1$ to $\varepsilon>0$ with $x_2=1$, use [[#eq-hotelling-p]] to first order.
:::
::: solution
(a) From [[#eq-hotelling-p]], $p_1-c = t\Delta\bigl(1+(x_1+x_2-1)/3\bigr)$ with $c=0$ and $\Delta=x_2-x_1$. Demand of firm 1 at the price equilibrium can be read from the FOC $\hat x = (p_1-c)/(2t\Delta) = \bigl(1+(x_1+x_2-1)/3\bigr)/2$. Profit is $(p_1) \times \hat x = t\Delta \bigl(1+(x_1+x_2-1)/3\bigr)^2 / 2$.

(b) At $(0,1)$, $\Delta=1$ and the squared term is 1, profit $t/2$. For $x_1=\varepsilon$, $x_2=1$, $\Delta=1-\varepsilon$ and $x_1+x_2-1=\varepsilon$, so
$$
\pi_1 = t(1-\varepsilon)\bigl(1+\varepsilon/3\bigr)^2 / 2 = (t/2)(1-\varepsilon)(1 + 2\varepsilon/3 + \varepsilon^2/9).
$$
The first-order term in $\varepsilon$ is $(t/2)(-1 + 2/3) = -t/6 < 0$. A small inward move *lowers* firm 1’s profit: the shortening of $\Delta$ (tougher price competition) outweighs the demand gain from moving toward the mass of consumers. Hence a local incentive for maximum differentiation.

(c) With prices fixed (Hotelling 1929), moving toward the rival at the same price steals the buyers in between without any price response, so both firms crowd at the median. The 1979 correction is the price stage. Minimum differentiation is a fixed-price result; maximum differentiation is a two-stage result under quadratic transport.
:::
:::
