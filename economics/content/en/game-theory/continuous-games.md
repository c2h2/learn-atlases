Two mineral-water firms pump from the same aquifer. Each chooses a quantity $q_i \ge 0$. The market price is $P = 12 - (q_1 + q_2)$, in units of money per unit of water, and each firm's pumping cost is zero in this illustration. Firm 1's profit is $q_1\bigl(12 - q_1 - q_2\bigr)$. If firm 1 knew $q_2$, it would have an ordinary calculus problem: the first-order condition $12 - 2q_1 - q_2 = 0$ gives the **best-response function** $q_1 = (12 - q_2)/2$. Firm 2 has a symmetric best response. A Nash equilibrium is a pair $(q_1^*, q_2^*)$ that lies on both best-response functions at once.

That is Cournot's 1838 model, and it is the pattern of this chapter. Strategy sets are intervals, payoff functions are differentiable, and best responses are found by taking derivatives as in [[mathematical-economics/unconstrained-optimisation]]. The same pattern covers Hotelling's location game, Tullock contests, and the tragedy of the commons with a continuous extraction rate. Mixing, the subject of the previous chapter, is often unnecessary: under standard concavity conditions a pure-strategy Nash equilibrium exists, by a fixed-point theorem.

The numbers are illustrative. They are not a description of any particular aquifer, and they are not advice on how much to pump.

## Best-response functions

::: definition Best-response function {#def-br-function}
Let player $i$'s strategy set $S_i$ be a convex subset of $\R^k$, and let $u_i$ be differentiable and strictly concave in $s_i$. A **best-response function** $b_i(s_{-i})$ is the unique maximiser of $u_i(\cdot, s_{-i})$ on $S_i$. When the maximiser is interior, it solves

$$
\frac{\partial u_i}{\partial s_i}\bigl(b_i(s_{-i}), s_{-i}\bigr) = 0.
$$

A pure-strategy Nash equilibrium is a profile $s^*$ with $s_i^* = b_i(s_{-i}^*)$ for every $i$: a **fixed point** of the best-response map $b = (b_1, \dots, b_n)$.
:::

Concavity of $u_i$ in own strategy is the important extra assumption relative to finite games. It makes $b_i$ single-valued (a function, not a correspondence) and, when $S_i$ is compact, continuous. Brouwer's theorem then gives existence.

::: theorem Existence with continuous actions {#thm-brouwer-nash}
Suppose each $S_i \subset \R^{k_i}$ is compact and convex, each $u_i$ is continuous in $s$ and quasiconcave in $s_i$. Then a pure-strategy Nash equilibrium exists.
:::
::: proof
Sketch. The best-response correspondence $BR_i(s_{-i}) = \arg\max_{s_i \in S_i} u_i(s_i, s_{-i})$ is non-empty (continuous function on a compact set), convex-valued (quasiconcave objective, convex constraint), and upper hemicontinuous (Berge). Kakutani's theorem supplies a fixed point, as in [[game-theory/mixed-strategies#thm-nash-existence]]. If each $u_i$ is *strictly* quasiconcave in $s_i$, then $BR_i$ is single-valued and continuous, and Brouwer's theorem on the compact convex set $S_1 \times \cdots \times S_n$ suffices.
:::

The theorem does not require mixed strategies. Compactness can fail when $S_i = [0, \infty)$; in Cournot one usually either imposes a capacity or notes that quantities above the choke price are dominated, so an effective compactification is free.

## Cournot duopoly

Two firms produce a homogeneous good. Inverse demand is $P = a - b(q_1 + q_2)$ with $a > 0$, $b > 0$, provided $q_1 + q_2 \le a/b$, and $P = 0$ otherwise. Firm $i$'s cost is $c q_i$ with $0 \le c < a$. Profit is $\pi_i = \bigl(a - b(q_1+q_2) - c\bigr) q_i$.

::: proposition Cournot–Nash equilibrium {#prop-cournot}
In the linear Cournot duopoly, firm $i$'s interior best response is

$$
b_i(q_j) = \frac{a - c}{2b} - \frac{q_j}{2},\qquad i \neq j,
$$ {#eq-cournot-br}

for $q_j \le (a-c)/b$. The unique Nash equilibrium is symmetric:

$$
q_1^* = q_2^* = \frac{a - c}{3b},\qquad P^* = \frac{a + 2c}{3},\qquad \pi_i^* = \frac{(a-c)^2}{9b}.
$$

Assumptions: simultaneous quantity choice, homogeneous product, linear inverse demand, constant marginal cost, no capacity constraint, profit maximisation, common knowledge of $(a, b, c)$.
:::
::: proof
For $q_2$ fixed and $q_1$ interior, $\partial\pi_1/\partial q_1 = a - c - 2b q_1 - b q_2$. Setting this to zero gives [[#eq-cournot-br]]. The second derivative $-2b < 0$ confirms a maximum. Solving $q_1 = (a-c)/(2b) - q_2/2$ and $q_2 = (a-c)/(2b) - q_1/2$ yields $q_1 = q_2 = (a-c)/(3b)$. Price and profit follow by substitution. Uniqueness: the two best-response lines have slopes $-1/2$ and $-2$ (when $q_1$ is on the horizontal axis), so they cross once.
:::

Compared with monopoly, which produces $q^m = (a-c)/(2b)$ at price $(a+c)/2$, Cournot produces more and prices lower: $2(a-c)/(3b) > (a-c)/(2b)$ and $(a+2c)/3 < (a+c)/2$. Compared with perfect competition, which produces $(a-c)/b$ at price $c$, Cournot produces less and prices higher. Oligopoly sits between monopoly and competition. The $n$-firm extension, with $q_i^* = (a-c)/((n+1)b)$, converges to competition as $n \to \infty$ — Cournot's "limit theorem", taken up in [[industrial-organisation/cournot-bertrand]].

::: example Numbers for the aquifer {#ex-cournot-numbers}
Take $a = 12$, $b = 1$, $c = 0$. Compute the Cournot quantities, price and profits. Compare with monopoly and with the competitive (price-equals-marginal-cost) outcome. What is the deadweight loss relative to competition, taking consumer surplus as the area under inverse demand?
::: solution
$q_1^* = q_2^* = 12/3 = 4$, total quantity $8$, $P^* = 12 - 8 = 4$, $\pi_i^* = 4 \times 4 = 16$. Monopoly: $q^m = 6$, $P^m = 6$, $\pi^m = 36$. Competition: $P = c = 0$, $Q = 12$, profit $0$.

Consumer surplus at a price $P$ with quantity $Q = 12 - P$ is $\tfrac12 (12-P)Q = \tfrac12 Q^2$. At Cournot, CS $= 32$, producer surplus $= 32$, total surplus $= 64$. At competition, CS $= 72$, PS $= 0$, total $= 72$. Deadweight loss $= 8$. At monopoly, CS $= 18$, PS $= 36$, total $= 54$, DWL $= 18$. Cournot is more efficient than monopoly and less efficient than competition, in this linear model.
:::
:::

::: widget plot
f: (a-c)/2 - x/2; (a-c) - 2*x
sliders: a=12:8:16; c=0:0:4
x: 0, 12
y: 0, 12
labels: \text{firm 2 BR}; \text{firm 1 BR}
points: 4,4
caption: Cournot best responses with $b = 1$. Horizontal axis: $q_1$; vertical axis: $q_2$. Firm 2's best response is the flatter line $q_2 = (a-c)/2 - q_1/2$; firm 1's is the steeper line $q_2 = (a-c) - 2q_1$. Their intersection is the Nash equilibrium. Raise $a$ (demand) and watch both lines shift out; raise $c$ (cost) and watch them shift in. The marked point is the equilibrium at $a = 12$, $c = 0$.
:::

The widget is the picture to remember. Each firm takes the other's quantity as given — that is the Cournot conjecture — and the equilibrium is the only pair of quantities consistent with both conjectures.

::: warning Best response is not a reaction over time
The best-response function $b_1(q_2)$ is not a story about firm 1 *adjusting* after seeing $q_2$. In the Cournot game the firms choose simultaneously. The function records what firm 1 *would* choose if it expected $q_2$. Dynamics — cobwebs, best-response adjustment — are extra structure, studied in [[industrial-organisation]] and, as difference equations, in [[mathematical-economics/difference-and-differential-equations]]. Do not read the arrows of a textbook best-response diagram as a clock.
:::

::: example A cost difference {#ex-cournot-asymmetric}
Keep $a = 12$, $b = 1$. Now firm 1 has $c_1 = 0$ and firm 2 has $c_2 = 3$. Find the Nash equilibrium quantities, the price, and the two profits.
::: solution
Best responses: $q_1 = (12 - 0 - q_2)/2 = 6 - q_2/2$, and $q_2 = (12 - 3 - q_1)/2 = 4.5 - q_1/2$. Substitute: $q_1 = 6 - \tfrac12(4.5 - q_1/2) = 6 - 2.25 + q_1/4$, so $\tfrac34 q_1 = 3.75$, $q_1 = 5$. Then $q_2 = 4.5 - 2.5 = 2$. Total quantity $7$, $P = 5$. Profits: $\pi_1 = (5-0)\cdot 5 = 25$, $\pi_2 = (5-3)\cdot 2 = 4$. The lower-cost firm produces more and earns more. The general formula, worth deriving, is $q_i = \bigl(a - 2c_i + c_j\bigr)/(3b)$.
:::
:::

## Hotelling location

Two ice-cream vendors choose locations $x_1, x_2$ on the beach $[0, 1]$. Consumers are uniformly distributed, each buys one unit from the nearer vendor (with a coin flip if equidistant), and the price is regulated at $1$. Transport cost does not appear in the vendors' payoffs — only in the consumer's choice of vendor. Payoff is the mass of consumers served.

::: proposition Median location {#prop-hotelling}
If prices are fixed and equal, the unique Nash equilibrium is $x_1^* = x_2^* = 1/2$: both vendors locate at the median (here, the midpoint). Any pair of distinct locations is unstable, because the vendor further from $1/2$ can move toward the other and capture more than half the beach.
:::
::: proof
Suppose $x_1 < x_2$. Vendor 1 serves $[0, (x_1+x_2)/2]$ and vendor 2 serves $[(x_1+x_2)/2, 1]$. If $(x_1+x_2)/2 < 1/2$, vendor 1's share is less than $1/2$, and moving right toward $x_2$ raises the midpoint and raises vendor 1's share. If $(x_1+x_2)/2 > 1/2$, vendor 2 can profitably move left. So any equilibrium with $x_1 \neq x_2$ would require the midpoint to be $1/2$ *and* neither vendor to want to jump to the other side — but jumping just across the rival captures the larger interval. The only remaining candidate is $x_1 = x_2 = 1/2$, where each serves half and a unilateral move left (say) yields share less than $1/2$.
:::

This is Hotelling's 1929 "stability in competition" in its location-only form, and it is the median-voter theorem of political science in another language. It is *not* Hotelling's full model: when vendors also choose prices, differentiation becomes attractive, because locating together unleashes Bertrand competition that drives prices to cost. The price-and-location game is in [[industrial-organisation/product-differentiation]]. The location-only version is already a useful Nash equilibrium: a pure-strategy equilibrium exists, it is unique, and it is socially excessive clustering — consumers at the endpoints travel $1/2$, whereas two socially optimal locations at $1/4$ and $3/4$ would cut average travel in half.

::: example Three vendors {#ex-hotelling-three}
Three vendors locate on $[0, 1]$, prices fixed. Show that there is no pure-strategy Nash equilibrium in which all three occupy different points, and that there is none in which all three occupy the same point. (The mixed-strategy equilibrium is not asked.)
::: solution
If all three sit at the same $x$, a unilateral move an epsilon toward the longer side of the beach captures almost half the beach rather than one third, which is profitable unless $x = 1/2$ and the two sides are equal — but then a move either way still captures almost $1/2 > 1/3$. So coincidence of all three is not an equilibrium.

If $x_1 < x_2 < x_3$, the middle vendor's neighbours can squeeze: the left vendor can move right toward $x_2$ without losing the interval $[0, \cdot]$ until the midpoint with $x_2$ moves, gaining consumers. More cleanly: the two outer vendors each want to move toward the middle (as in the two-player argument), and the middle vendor, once the outers are close, wants to jump outside. There is no configuration of three distinct locations in which all three best-respond. (A pure equilibrium *does* exist if the space is a circle rather than an interval — the Salop model.)
:::
:::

## Contests

A **Tullock contest** (Tullock 1980) is a game in which $n$ players spend $x_i \ge 0$ to win a prize of value $V > 0$. Player $i$'s probability of winning is $x_i / \sum_j x_j$ if the denominator is positive, and $1/n$ if everyone spends zero. The cost of spending is $x_i$. Payoff is $u_i = V \cdot x_i / \sum_j x_j - x_i$.

::: proposition Symmetric Tullock equilibrium {#prop-tullock}
For $n \ge 2$ and $V > 0$, there is a unique symmetric Nash equilibrium $x_i^* = \dfrac{n-1}{n^2} V$. Each player's expected payoff is $V/n^2$. Total spending is $\dfrac{n-1}{n} V$, which approaches the whole prize as $n$ grows.
:::
::: proof
At an interior symmetric profile $x_j = x$ for all $j$, player $i$'s payoff as a function of own $x_i$ is $V x_i / (x_i + (n-1)x) - x_i$. The first-order condition is

$$
\frac{V \cdot (n-1)x}{\bigl(x_i + (n-1)x\bigr)^2} = 1.
$$

Imposing $x_i = x$ gives $V(n-1)x / (n x)^2 = 1$, so $x = (n-1)V / n^2$. The second-order condition holds at this point (the winning probability is concave in own $x_i$ on the relevant region). Payoff: $V/n - (n-1)V/n^2 = V/n^2$. Total spending: $n x = (n-1)V/n$. If $n=1$, the unique equilibrium is $x=0$; the formula is for $n \ge 2$. The all-zero profile is not an equilibrium for $n \ge 2$: a player who spends a tiny $\eps$ wins with probability $1$ and gets $V - \eps > 0$.
:::

::: example A two-player contest {#ex-tullock-two}
Two lobbyists value a contract at $V = 16$. Spending is in the same units. Find equilibrium spending, the probability each wins, and expected payoffs. What would a player spend as a pure monopolist of influence (the $n=1$ case)?
::: solution
$x^* = (1/4)\cdot 16 = 4$ each. Each wins with probability $1/2$. Expected payoff $16/4 = 4$. Total spending $8$, half the prize. A monopolist of influence spends $0$ and gets $16$: the contest is a fight over a prize that would cost nothing to award. Rent-seeking, in Tullock's vocabulary, is this dissipation. With $n=2$ half the rent is dissipated; as $n$ grows, dissipation approaches the whole rent.
:::
:::

The model is used for lobbying, patent races, and sporting contests. It is sensitive to the contest-success function: if the probability is $x_i^r / \sum_j x_j^r$ with $r > 1$, spending rises, and for $r$ large the equilibrium may exist only in mixed strategies. All-pay auctions — the highest spend wins for sure, and every spend is lost — are the $r \to \infty$ limit and dissipate the whole rent in expectation even with two players.

## The tragedy of the commons, continuously

$n$ users have access to a common-pool resource. User $i$ extracts $x_i \ge 0$. Inverse "price" (or marginal yield) is $a - b X$ with $X = \sum_j x_j$, and the cost of extraction is zero. User $i$'s payoff is $x_i(a - b X)$. This is Cournot with $c = 0$: the "firms" are users, the "price" is the yield of the resource.

::: proposition Commons equilibrium and the social optimum {#prop-commons}
The unique symmetric Nash equilibrium is $x_i^* = a/((n+1)b)$, with total extraction $X^* = n a /((n+1)b)$. A utilitarian planner, maximising $\sum_i u_i = X(a - b X)$, chooses $X^o = a/(2b)$. For $n \ge 2$, $X^* > X^o$: the resource is over-extracted. As $n \to \infty$, $X^* \to a/b$, the yield is driven to zero, and each user's payoff goes to zero.
:::
::: proof
The game is the Cournot game of [[#prop-cournot]] with $c = 0$, so $x_i^* = a/((n+1)b)$ and $X^* = n a/((n+1)b)$. The planner's objective $aX - b X^2$ is maximised at $X = a/(2b)$. Now $n/(n+1) > 1/2$ for $n \ge 2$, so $X^* > X^o$. The limit $n/(n+1) \to 1$ gives $X^* \to a/b$, at which $a - bX = 0$ and payoffs vanish.
:::

The social optimum $X^o$ is the monopoly (or perfectly collusive) extraction. The Nash equilibrium is more aggressive because each user captures the full extra yield of a marginal unit and bears only $1/n$ of the resulting depression of yield. Hardin (1968) named the tragedy; Gordon (1954) had already written the fisheries model. Neither is a theorem about every common-pool resource: Ostrom (1990) documented communities that sustain $X$ nearer $X^o$ by monitoring and sanctions — that is, by *changing the game*, the subject of [[game-theory/repeated-games]]. The one-shot Nash equilibrium is the prediction when those institutions are absent.

::: widget plot
f: a - x; a - 2*x
sliders: a=12:6:16
x: 0, 16
y: 0, 16
labels: \text{yield } a-X; \text{marginal social yield } a-2X
shade: 0, 6
caption: Linear yield $a - X$ and its marginal social value $a - 2X$. The planner extracts where marginal social yield is zero, $X^o = a/2$ (the shaded quantity at $a = 12$). Open access with many users extracts where yield itself is zero, $X = a$. Cournot-Nash with $n$ users sits between them at $n a/(n+1)$. Move $a$ and watch both benchmarks scale.
:::

::: quiz
In linear Cournot with $n$ firms, $a = 12$, $b = 1$, $c = 0$, what happens to each firm's profit as $n$ goes from $2$ to $5$?
- [ ] It stays at $16$, because demand is unchanged
- [x] It falls from $16$ to $4$
- [ ] It rises, because the market is larger
- [ ] It falls to zero already at $n = 3$
::: solution
The $n$-firm formula is $q_i = (a-c)/((n+1)b) = 12/(n+1)$, $P = a - n q_i = 12/(n+1)$, $\pi_i = 144/(n+1)^2$. At $n=2$, $\pi_i = 16$; at $n=5$, $\pi_i = 144/36 = 4$. Profits fall as competition intensifies. They reach zero only in the limit $n \to \infty$.
:::
:::

## Evidence

**Cournot in the laboratory.** Fouraker and Siegel (1963) and a large subsequent literature (reviewed by Huck, Normann and Oechssler, *International Journal of Industrial Organization*, 2004) find that quantity choices in experimental oligopolies sit between Cournot and collusion in repeated play with two firms, and near Cournot or slightly more competitive with three or more. The qualitative comparative static — more firms, lower price — is robust. The exact $(a-c)/(3b)$ quantity is a reasonable first approximation, not a law.

**Commons in the field.** Fisheries, aquifers and forests with open access have been over-extracted relative to a planner's benchmark in a wide range of cases (World Bank, *The Sunken Billions*, 2009, on marine fisheries; many national aquifer studies). The size of the gap varies with monitoring, property rights and the number of users, as the $n$-dependence of [[#prop-commons]] suggests. It is not always the "zero yield" limit.

**Contests.** Laboratory Tullock contests typically show *over*-bidding relative to $x^* = (n-1)V/n^2$ (Sheremeta, *Journal of Economic Surveys*, 2013): subjects spend more than the Nash amount, leaving expected payoffs below $V/n^2$ and sometimes negative. The Nash prediction is a useful lower bound on dissipation, not a ceiling.

## Where this leads

Quantity competition with a homogeneous product is only one oligopoly model. Price competition (Bertrand), capacity constraints, and the Cournot limit theorem occupy [[industrial-organisation/cournot-bertrand]]. Location with price choice is [[industrial-organisation/product-differentiation]]. Sequential quantity choice — Stackelberg — is an extensive-form game, and is computed by backward induction in [[game-theory/extensive-form]]. The commons with repeated interaction, monitoring and sanctions is [[game-theory/repeated-games]] and [[environmental-economics]]. Contests with incomplete information about $V$ are Bayesian games.

::: history
Antoine Augustin Cournot's *Recherches sur les principes mathématiques de la théorie des richesses* (1838) gave the duopoly best-response functions and the equilibrium $(a-c)/(3b)$, derived without the words "Nash equilibrium". Harold Hotelling's "Stability in Competition" (*Economic Journal*, 1929) introduced location on a line; the observation that prices reverse the clustering incentive was clarified much later (d'Aspremont, Gabszewicz and Thisse, 1979). H. Scott Gordon, "The Economic Theory of a Common-Property Resource: The Fishery" (*Journal of Political Economy*, 1954), wrote the continuous commons model; Garrett Hardin's 1968 essay named the tragedy and over-claimed its inevitability. Gordon Tullock's 1980 chapter "Efficient rent-seeking" introduced the contest-success function used above. Existence of a pure-strategy Nash equilibrium with continuous actions is an application of Brouwer (1911) and Kakutani (1941), as Nash noted.
:::

::: summary
- With continuous, convex strategy sets and payoffs quasiconcave in own strategy, a pure-strategy Nash equilibrium exists ([[#thm-brouwer-nash]]). Best responses are functions, and an equilibrium is a fixed point ([[#def-br-function]]).
- Linear Cournot duopoly has unique equilibrium $q_i^* = (a-c)/(3b)$, sitting between monopoly and competition ([[#prop-cournot]]). Best-response lines slope $-1/2$.
- With fixed equal prices, two Hotelling vendors locate at the median ([[#prop-hotelling]]). Clustering is excessive for consumers. Three vendors on an interval have no pure-strategy equilibrium.
- In a symmetric Tullock contest, each player spends $(n-1)V/n^2$ and expected payoff is $V/n^2$ ([[#prop-tullock]]). Dissipation rises with $n$.
- The continuous commons is Cournot: $n$ users extract more than a planner would, and as $n$ grows the yield is driven toward zero ([[#prop-commons]]). Institutions can change the game.
:::

## Exercises

::: exercise Cournot with a choke price {level=1 check="4"}
Inverse demand is $P = 18 - Q$, $c = 6$, two firms. Find each firm's Cournot–Nash quantity. (Enter one firm's quantity.)
::: solution
Here $a = 18$, $b = 1$, $c = 6$, so $q_i^* = (18-6)/(3\cdot 1) = 4$. Total quantity $8$, price $P = 10$, profit $\pi_i = (10-6)\cdot 4 = 16$. Monopoly would produce $(18-6)/2 = 6$ at price $12$.
:::
:::

::: exercise Monopoly versus Cournot {level=1 check="36"}
In the aquifer example $P = 12 - Q$, $c = 0$, what is monopoly profit? (Enter the integer profit.)
::: solution
Monopoly: $q^m = 6$, $P^m = 6$, $\pi^m = 36$. (Cournot total profit is $32$, which is less: competition between the two firms destroys $4$ of producer surplus and creates $14$ of extra consumer surplus, for a net social gain of $10$ relative to monopoly, leaving a deadweight loss of $8$ relative to $Q = 12$.)
:::
:::

::: exercise Tullock with three players {level=1 check="8/3"}
Three players, $V = 12$. Find each player's equilibrium spending in the symmetric Tullock contest. (Enter a fraction.)
::: solution
$x^* = (n-1)V/n^2 = 2\cdot 12 / 9 = 24/9 = 8/3$. Expected payoff $V/n^2 = 12/9 = 4/3$. Total spending $8$, two-thirds of the prize.
:::
:::

::: exercise Best response to a given quantity {level=2 check="3"}
In the linear Cournot model with $a = 12$, $b = 1$, $c = 0$, firm 2 is expected to produce $q_2 = 6$. What is firm 1's best-response quantity? (Enter an integer.)
::: solution
$b_1(6) = (12-0)/2 - 6/2 = 6 - 3 = 3$. Firm 1 produces $3$, total quantity $9$, price $3$, firm 1's profit $9$. (This is not an equilibrium: firm 2's best response to $3$ is $b_2(3) = 6 - 1.5 = 4.5 \neq 6$.)
:::
:::

::: exercise Asymmetric Cournot {level=2}
Using the formula $q_i = (a - 2c_i + c_j)/(3b)$, find equilibrium quantities when $a = 20$, $b = 1$, $c_1 = 2$, $c_2 = 8$. Which firm produces more? Verify that firm 2's quantity is positive; what would happen if $c_2$ were $14$?
::: solution
$q_1 = (20 - 4 + 8)/3 = 24/3 = 8$, $q_2 = (20 - 16 + 2)/3 = 6/3 = 2$. Firm 1, the low-cost firm, produces more. Price $P = 20 - 10 = 10$. If $c_2 = 14$, the formula gives $q_2 = (20 - 28 + 2)/3 = -6/3 = -2 < 0$, which is not feasible. Firm 2 is then inactive, and firm 1 becomes a monopolist: $q_1 = (20-2)/2 = 9$, $P = 11$, which is below $c_2 = 14$, so firm 2 indeed does not wish to enter. The interior formula applies only when both quantities come out non-negative, i.e. when $c_i < (a + c_j)/2$.
:::
:::

::: exercise Planner versus Nash on the commons {level=2}
Four users, $a = 12$, $b = 1$, zero extraction cost. Compute Nash total extraction $X^*$ and the planner's $X^o$. Compute each user's Nash payoff and the payoff each would get if all extracted $X^o/4$.
::: solution
$X^* = 4\cdot 12 / 5 = 9.6$, $x_i^* = 2.4$. Yield $a - bX^* = 2.4$, payoff $2.4 \times 2.4 = 5.76$ each. Planner: $X^o = 6$, $x_i^o = 1.5$, yield $6$, payoff $1.5 \times 6 = 9$ each. Every user would prefer the planned profile, but it is not a Nash equilibrium: a user who extracted $b_i(4.5) = (12-4.5)/2 = 3.75$ instead of $1.5$ would raise their own payoff, given the others' $1.5$. That is the tragedy in numbers.
:::
:::

::: exercise Hotelling with a corner {level=3}
Two vendors on $[0, 1]$, prices fixed. Suppose vendor 2 is committed to locate at $x_2 = 0$ (a corner). Where does vendor 1 locate in a best response, and what share does each get? Is $(x_1, x_2) = (1/2, 0)$ an equilibrium of the two-sided location game?
::: hint
Vendor 1 wants the midpoint of $x_1$ and $0$ to sit as far right as possible, without jumping over... actually with $x_2$ fixed at $0$, vendor 1 can locate just to the right of $0$ and take almost the whole beach.
:::
::: solution
With $x_2$ fixed at $0$, any $x_1 > 0$ gives vendor 1 the interval $[(x_1+0)/2, 1]$, of length $1 - x_1/2$. This is maximised by taking $x_1$ as small as possible: $x_1 \downarrow 0$, length $\uparrow 1$. There is no best response in the open interval $(0, 1]$; in the closed interval, $x_1 = 0$ gives a tie (share $1/2$ by the coin-flip rule), which is worse than any $x_1 > 0$. So on $[0, 1]$ vendor 1 has no best response if we use the strict "just next to $0$" logic — a standard illustration that compact strategy sets and *upper semicontinuous* payoffs are needed for existence. If locations must be at least $\eps$ apart, vendor 1 locates at $\eps$ and takes $1 - \eps/2$.

The pair $(1/2, 0)$ is not an equilibrium of the two-sided game: vendor 2, at $0$, gets only $1/4$ and would move toward $1/2$.
:::
:::

::: exercise Deriving the $n$-firm Cournot quantity {level=3}
$n$ firms, inverse demand $P = a - b \sum_j q_j$, cost $c q_i$. Write firm $i$'s first-order condition, impose symmetry, and derive $q_i^* = (a-c)/((n+1)b)$. Then compute $\lim_{n\to\infty} P^*$ and $\lim_{n\to\infty} \pi_i^*$.
::: solution
$\pi_i = \bigl(a - b(q_i + Q_{-i}) - c\bigr) q_i$. FOC: $a - c - 2b q_i - b Q_{-i} = 0$, i.e. $q_i = (a-c)/ (2b) - Q_{-i}/2$. Symmetry: $Q_{-i} = (n-1)q_i$, so $q_i = (a-c)/(2b) - (n-1)q_i/2$. Then $q_i \bigl(1 + (n-1)/2\bigr) = (a-c)/(2b)$, i.e. $q_i (n+1)/2 = (a-c)/(2b)$, so $q_i^* = (a-c)/((n+1)b)$. Price $P^* = a - n(a-c)/(n+1) = \bigl(a + n c\bigr)/(n+1)$. As $n\to\infty$, $P^* \to c$ and $\pi_i^* = (P^*-c) q_i^* \to 0$ because $q_i^* \to 0$ while $P^*-c \to 0$. The Cournot industry converges to perfect competition.
:::
:::

::: exercise A contest with a favourite {level=2}
Two players, $V = 16$. Player 1's cost of spending is $x_1$; player 2's cost is $2x_2$ (a less efficient lobbyist). Find the Nash equilibrium of the Tullock contest. Who spends more, and who wins with higher probability?
::: hint
FOCs: $V x_2 / (x_1+x_2)^2 = 1$ for player 1, and $V x_1 / (x_1+x_2)^2 = 2$ for player 2.
:::
::: solution
Player 1's FOC: $16 x_2 / (x_1+x_2)^2 = 1$. Player 2's: $16 x_1 / (x_1+x_2)^2 = 2$. Dividing, $x_2 / x_1 = 1/2$, so $x_1 = 2 x_2$. Let $x_2 = x$, $x_1 = 2x$, $X = 3x$. Then $16 x / (9x^2) = 1$, so $16 = 9x$, $x = 16/9$, $x_1 = 32/9$, $x_2 = 16/9$. Player 1 spends more and wins with probability $2/3$. Payoffs: $u_1 = 16\cdot\tfrac23 - 32/9 = 32/3 - 32/9 = 64/9$; $u_2 = 16\cdot\tfrac13 - 2\cdot 16/9 = 16/3 - 32/9 = 16/9$. The more efficient player spends more, wins more often, and earns more — unlike an all-pay auction, in which the weaker player may be deterred entirely.
:::
:::

