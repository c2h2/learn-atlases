A painting is to be sold. Four dealers have come; each knows what the painting is worth *to her*, and that number is her own business. The auctioneer can shout prices up from a low start until only one bidder remains; or shout them down from a high start until someone claims the lot; or collect a sealed envelope from each dealer and award the painting to the highest number, charging that number; or collect the same envelopes and charge the winner only the *second*-highest number. These four procedures — English, Dutch, first-price sealed-bid and second-price sealed-bid — are the classical **auction formats**. They look different, they feel different to a bidder sitting in the room, and they produce different bids. Under one leading model of values they produce the same allocation and, in expectation, the same revenue. Under others they do not. This chapter builds the model, derives the equilibrium of each format, and computes the bids by hand.

The setting is a **single indivisible object** and $n \ge 2$ bidders. Later chapters add a reserve price chosen by the seller ([[market-design/optimal-auctions]]), values that depend on what other people know ([[market-design/common-values]]), and several objects sold at once ([[market-design/multi-unit-auctions]]). The game-theoretic language is that of Bayesian games ([[game-theory/bayesian-games]]): a bidder’s value is her **type**, a bid is a strategy, and an equilibrium is a Bayesian Nash equilibrium, except where a stronger dominance argument is available.

Nothing here is a recommendation to bid, to run, or to participate in any particular auction. Numbers are illustrative unless a source and date are attached.

## Four formats

An **auction** is a mechanism that maps a profile of bids into an allocation (who receives the object) and a profile of payments. The four classical formats differ in what bidders observe while they bid and in how the winner’s payment is computed from the bids.

::: definition The four classical auctions {#def-formats}
An **English** (oral ascending, or Japanese clock) auction raises a public price continuously or in small increments. Each bidder chooses when to drop out. The last remaining bidder wins and pays the price at which the last rival dropped. A **Dutch** (oral descending) auction starts at a high public price and lowers it until a bidder claims the object; that bidder wins and pays the current price. A **first-price sealed-bid** auction collects a single bid from each bidder; the highest bidder wins and pays her own bid. A **second-price sealed-bid** (Vickrey) auction collects a single bid from each bidder; the highest bidder wins and pays the *second*-highest bid. Ties are broken uniformly at random, or by a fixed rule announced in advance.
:::

The English auction in [[#def-formats]] is the **Japanese** (or button, or clock) version, in which the only decision is when to exit and exit is irrevocable. The “open-outcry” English auction used in some salerooms, where bidders may jump and may re-enter, is a richer extensive game; with independent private values the extra options do not change the equilibrium outcome derived below. The Dutch auction is the format of Dutch flower markets, which still sell by descending clock. First-price sealed-bid is the standard format for many procurement tenders (the auction is then a *procurement* auction: the lowest price wins) and for some mineral-rights sales. Second-price sealed-bid is rare as a literal sealed-bid institution — bidders distrust a seller who says “pay the second bid” when only the seller sees the envelopes — but it is the sealed-bid counterpart of the English auction, and it is the building block of the Vickrey–Clarke–Groves mechanisms of [[information-economics/efficient-mechanisms]].

Two observations save a great deal of work.

::: proposition Strategic equivalences {#prop-equivalence-formats}
(i) The Dutch auction and the first-price sealed-bid auction are **strategically equivalent**: they induce the same normal-form game. A bidder in the Dutch auction must choose, before anyone has claimed, the price at which she will claim; that choice is a sealed bid, and she pays it if she is first. (ii) With **independent private values** (defined below), the English auction and the second-price sealed-bid auction have the same dominant-strategy outcome: each bidder stays in, or bids, up to her value, the highest-value bidder wins, and she pays the second-highest value.
:::

::: proof
(i) In the Dutch auction a bidder observes only that the clock is still running, which she already knew she would observe until she or someone else claimed. No information arrives. Choosing a claim-price $b_i$ is therefore the same act as writing $b_i$ on an envelope, and the winner pays her own number in both games. The strategy sets, the mapping from strategy profiles to outcomes, and the payoffs coincide. (ii) is proved as [[#thm-vickrey]] and the paragraph that follows it, once private values have been defined.
:::

Strategic equivalence is stronger than “same equilibrium revenue”. It says the *games* are the same, so every Nash equilibrium, every dominant strategy, and every trembling-hand refinement transfers. The English–second-price link in (ii) is weaker: the extensive form of the English auction can reveal the prices at which rivals drop, which is useless under independent private values and valuable under affiliated values ([[market-design/common-values]]).

## Independent private values

To compare formats we need a model of what the object is worth and of what bidders know.

::: definition Independent private values (IPV) {#def-ipv}
There is one object and $n$ bidders. Bidder $i$’s **value** $v_i$ is drawn independently from a distribution $F$ on $[\underline{v}, \overline{v}]$, with density $f = F'$ strictly positive on the interior. Bidder $i$ observes $v_i$ before bidding and does not observe $v_{-i}$. If $i$ wins and pays $p$, her payoff is $v_i - p$; if she loses and pays nothing, her payoff is $0$. Bidders are risk-neutral. The seller’s value for the object is $v_0$, often normalised to $0$. Values are **private**: $i$’s payoff depends on $v_i$ and on the payment, not on other bidders’ values. They are **independent**: observing $v_i$ does not change $i$’s beliefs about $v_{-i}$.
:::

Independence plus privacy is a strong package. A painting you mean to hang is close to it: what it is worth to you does not depend on what it is worth to the dealer next to you, and you learned your value from your own walls, not from her. A tract of oil is not: the oil is the same whoever wins, and each bidder’s seismic survey is a noisy signal of that common value ([[market-design/common-values]]). Procurement of a standardised good, sale of a unique house to owner-occupiers, and sale of a licence to firms with idiosyncratic downstream costs are the IPV cases of most applied interest.

Throughout this chapter $F$ is the same for every bidder (**symmetry**). Asymmetries — an incumbent and an entrant, a strong and a weak dealer — wait for [[market-design/revenue-equivalence]]. The lowest possible value $\underline{v}$ will usually be $0$, so that a bidder with nothing to gain can be given nothing in equilibrium; that normalisation is used by the revenue equivalence theorem of the next chapter.

The seller’s problem, for now, is not to choose $F$ or $n$ but to choose a format and to predict bids. Because types are private, the game is one of incomplete information. A **pure strategy** for $i$ is a bid function $b_i(\cdot)$ mapping her value into a bid (or, in the English auction, into an exit price). A **symmetric Bayesian Nash equilibrium** is a single function $b(\cdot)$ such that, when rivals use $b$, it is optimal for $i$ to use $b$ as well.

::: widget plot
f: ((n-1)/n)*x; x
sliders: n=3:2:8:1
x: 0, 1
y: 0, 1
labels: \text{first-price bid}; \text{value (second-price bid)}
caption: Independent private values, uniform on $[0,1]$. The 45-degree line is the second-price (and English) bid. The flatter line is the symmetric first-price bid $b(v)=((n-1)/n)v$. Raise $n$: first-price bids move towards the 45-degree line. Hover to read off the bid at a chosen value.
:::

The figure is a preview of [[#thm-fpa]] and [[#thm-vickrey]]. Before deriving those functions we settle the second-price auction, whose argument does not use $F$ at all.

## Second-price and English: a dominant strategy

Suppose the envelopes have been collected and the rule is: highest bid wins, winner pays the second-highest bid. You have value $v$. Should you bid $v$, or shade, or jump?

::: theorem Vickrey’s argument {#thm-vickrey}
In a second-price sealed-bid auction with private values (independence is not required), bidding $b_i = v_i$ is a weakly dominant strategy for every bidder. In the resulting equilibrium the highest-value bidder wins and pays the second-highest value.
:::

::: proof
Fix rivals’ bids and let $m$ be the highest among them. If you bid $b$, you win if $b > m$ (and with probability $1/2$ if $b = m$; the tie-breaking details do not affect the comparison of strict inequalities) and you pay $m$ if you win. Your payoff is therefore $v - m$ if $b > m$ and $0$ if $b < m$.

Compare $b = v$ with any other bid. If $m < v$, bidding $v$ wins and earns $v - m > 0$; bidding $b < m$ loses and earns $0$, which is worse, and bidding $b > m$ still wins and still pays $m$, so it is no better. If $m > v$, bidding $v$ loses and earns $0$; bidding $b > m$ wins and earns $v - m < 0$, which is worse, and bidding $b < m$ still loses. If $m = v$, every bid earns $0$. So no bid does strictly better than $b = v$ against any realisation of $m$, and against some realisations (any $m$ strictly between $v$ and the alternative bid) it does strictly better. The strategy is weakly dominant.

Once every bidder uses it, the ranking of bids is the ranking of values, and the price is the second-highest value.
:::

The argument never used the distribution of rivals’ values, nor risk neutrality: it is an argument in the realised numbers $v$ and $m$. That is why second-price is **strategy-proof** (dominant-strategy incentive compatible) on the private-value domain, a much stronger property than Bayesian incentive compatibility. It is also why the English auction, in the Japanese-clock version, has the same outcome: staying in until the clock reaches $v$ and then dropping is dominant, because the clock is a running second-price, and the last rival’s dropout price is $m$.

::: example Two envelopes {#ex-two-envelopes}
Ava’s value is $12$, Ben’s is $8$, Cara’s is $5$, in some unit of money. Each bids her value in a second-price auction. Who wins, and what does she pay? What if Ava instead bids $20$? What if she bids $7$?
::: solution
Ava wins and pays $8$, the second-highest bid. Her payoff is $12 - 8 = 4$. If she bids $20$ she still wins and still pays $8$; the jump is wasted. If she bids $7$ she loses to Ben (who bids $8$); her payoff is $0$ instead of $4$. Overbidding cannot raise the price she *pays* — that is set by Ben — and underbidding can only lose a profitable lot.
:::
:::

::: warning The price is not your bid
A common first encounter with Vickrey is to think “I bid $12$, so I pay $12$”. In a second-price auction you pay the second bid. Overbidding does not make the object more expensive *to you* unless it changes *who wins*. The mistake is harmless in a classroom example with three named bidders; it is costly in a multi-object Vickrey auction, where overbidding on one package can raise the price of another ([[market-design/multi-unit-auctions]]).
:::

::: example English clock, same values {#ex-english-clock}
The same three bidders face a clock that starts at $0$ and rises continuously. Each plans to drop when the clock reaches her value. At what price does each drop, who wins, and what does she pay?
::: solution
Cara drops at $5$, Ben at $8$, Ava is last and pays $8$. The allocation and the price coincide with [[#ex-two-envelopes]]. Ava never has to name $12$; she only has to be willing to stay past $8$.
:::
:::

Dominance does not say that bidding $v$ is the *only* Nash equilibrium. If Ava bids $100$ and everyone else bids $0$, that is a Nash equilibrium of the second-price game (nobody wants to deviate given the others), and it is a bad one: Ben, who values the object at $8$, is not winning. Weak dominance discards those equilibria. In what follows “the” second-price equilibrium means the dominant-strategy equilibrium of [[#thm-vickrey]].

## First-price equilibrium

In a first-price auction the winner pays her own bid, so bidding $v$ guarantees a payoff of $0$. Every bidder with $v > \underline{v}$ will **shade** — bid strictly below her value. How much depends on the trade-off between winning more often (raising the bid) and paying more when she wins (also raising the bid). The equilibrium bid function internalises that trade-off given that rivals are shading too.

Consider a symmetric, strictly increasing, differentiable candidate $b(\cdot)$ with $b(\underline{v}) = \underline{v}$. Bidder $i$ with value $v$ who bids as if her value were $z$ — that is, who submits $b(z)$ — wins if every rival’s value is below $z$, an event of probability $F(z)^{n-1}$. She then pays $b(z)$. Her expected payoff is

$$
u(z; v) = F(z)^{n-1}\bigl(v - b(z)\bigr).
$$ {#eq-fpa-payoff}

In equilibrium she chooses $z = v$. The first-order condition $\partial u/\partial z = 0$ at $z = v$, together with the boundary $b(\underline{v}) = \underline{v}$, pins down $b$.

::: theorem Symmetric first-price equilibrium {#thm-fpa}
In the IPV environment of [[#def-ipv]], the unique symmetric Bayesian Nash equilibrium in strictly increasing differentiable strategies of the first-price auction is

$$
b(v) = v - \frac{\int_{\underline{v}}^{v} F(t)^{n-1}\,\mathrm{d}t}{F(v)^{n-1}}, \qquad v > \underline{v},
$$ {#eq-fpa-bid}

and $b(\underline{v}) = \underline{v}$. Equivalently, $b(v)$ is the expected value of the *highest rival* value, conditional on that rival value being below $v$:

$$
b(v) = \E\bigl[Y_1 \mid Y_1 \le v\bigr],
$$ {#eq-fpa-rival}

where $Y_1 = \max_{j \neq i} v_j$.
:::

::: proof
Differentiate [[#eq-fpa-payoff]] in $z$:

$$
\frac{\partial u}{\partial z} = (n-1)F(z)^{n-2}f(z)\bigl(v - b(z)\bigr) - F(z)^{n-1} b'(z).
$$

Set $z = v$ and require the derivative to vanish:

$$
(n-1)F(v)^{n-2}f(v)\bigl(v - b(v)\bigr) = F(v)^{n-1} b'(v),
$$

or, for $F(v) > 0$,

$$
b'(v) F(v)^{n-1} + (n-1)F(v)^{n-2}f(v)\, b(v) = (n-1)F(v)^{n-2}f(v)\, v.
$$

The left-hand side is $\dfrac{\mathrm{d}}{\mathrm{d}v}\bigl[b(v) F(v)^{n-1}\bigr]$. Integrating from $\underline{v}$ to $v$ and using $b(\underline{v})F(\underline{v})^{n-1} = 0$ gives

$$
b(v) F(v)^{n-1} = \int_{\underline{v}}^{v} t \cdot (n-1) F(t)^{n-2} f(t)\,\mathrm{d}t,
$$

which is [[#eq-fpa-bid]] after an integration by parts (or after dividing through). The integrand on the right is the density of $Y_1$ on $[\underline{v}, v]$ times $t$, and $F(v)^{n-1} = \Prob(Y_1 \le v)$, so [[#eq-fpa-rival]] follows.

Uniqueness among strictly increasing differentiable symmetric equilibria is the uniqueness of the solution of this ODE with the given boundary. That the candidate is indeed an equilibrium, not just a critical point, follows from the expected-payoff function $u(z; v)$ being single-peaked at $z = v$ (the derivative $\partial u/\partial z$ has the sign of $v - z$), which is the standard envelope argument of the next chapter.
:::

The formula has two readings, both worth keeping. The shading term $\int F^{n-1}/\ F^{n-1}$ is the amount by which the bid undershoots the value; it shrinks as $n$ grows, because the chance of being beaten by a rival becomes more sensitive to a small cut in the bid. The rival-order-statistic reading says something blunter: you bid what you expect to *pay in a second-price auction, conditional on winning*. That is the first glimpse of revenue equivalence.

::: example Uniform values, two bidders {#ex-uniform-two}
Let $n = 2$ and $F(v) = v$ on $[0, 1]$. Compute $b(v)$. If Ava’s value is $0.80$ and Ben’s is $0.50$, what are the bids, who wins, and what is paid? What would have been paid in a second-price auction?
::: solution
[[#eq-fpa-bid]] with $F(t) = t$ and $n = 2$ gives $\int_0^v F(t)\,\mathrm{d}t = \int_0^v t\,\mathrm{d}t = v^2/2$, hence

$$
b(v) = v - \frac{v^2/2}{v} = \frac{v}{2}.
$$

Ava bids $0.40$, Ben bids $0.25$. Ava wins and pays $0.40$. In a second-price auction Ava would bid $0.80$, Ben $0.50$, Ava would win and pay $0.50$. The *realised* prices differ ($0.40$ versus $0.50$); we have not yet compared them in expectation. Ava’s first-price payoff is $0.80 - 0.40 = 0.40$; her second-price payoff is $0.80 - 0.50 = 0.30$. Different realisations, different payoffs — and, as the next chapter shows, the same expected payoff as a function of $v$.
:::
:::

::: example Uniform values, $n$ bidders {#ex-uniform-n}
Keep $F(v) = v$ on $[0, 1]$ and let $n \ge 2$ be arbitrary. Show that $b(v) = \dfrac{n-1}{n} v$. Compute the bid of a bidder with $v = 0.90$ when $n = 2$, $n = 3$ and $n = 10$.
::: solution
$F(t)^{n-1} = t^{n-1}$, so

$$
\int_0^v t^{n-1}\,\mathrm{d}t = \frac{v^n}{n}, \qquad b(v) = v - \frac{v^n/n}{v^{n-1}} = v - \frac{v}{n} = \frac{n-1}{n}\, v.
$$

At $v = 0.90$: for $n = 2$ the bid is $0.45$; for $n = 3$ it is $0.60$; for $n = 10$ it is $0.81$. Competition eats the shade. In the limit $n \to \infty$ the bid approaches the value, which is the competitive (Bertrand) price of an object whose cost to the winner is zero and whose second-highest value concentrates at the top of the support.
:::
:::

The Dutch auction, by [[#prop-equivalence-formats]], uses the same bid function: a bidder with value $v$ plans to claim when the clock falls to $b(v)$.

::: quiz
In a first-price sealed-bid auction with $n = 3$ bidders and independent values uniform on $[0, 1]$, a bidder with value $0.60$ should bid, in the symmetric equilibrium,
- [ ] $0.60$, because anything less risks losing
- [ ] $0.30$, half the value, as in the two-bidder formula
- [x] $0.40$
- [ ] $0.50$, the expected highest rival value without conditioning on winning
::: solution
[[#ex-uniform-n]] gives $b(v) = (2/3)v = 0.40$. Half the value is the $n = 2$ formula and is too aggressive a shade with three bidders. Bidding the value is dominated. The unconditional expected highest of two rivals is $2/3$, which is not even a function of $v$; the right statistic is $\E[Y_1 \mid Y_1 \le 0.60] = 0.40$.
:::
:::

## Expected payments and expected revenue

The seller cares about **revenue**, the sum of payments. Under the equilibria just derived we can write it down.

In a second-price (or English) auction the seller receives the second-highest value. Write $Y_1^{(n)} \ge Y_2^{(n)} \ge \cdots$ for the descending order statistics of $n$ draws from $F$. Revenue is $Y_2^{(n)}$, and expected revenue is $\E[Y_2^{(n)}]$. For the uniform$[0,1]$ distribution the $k$-th highest of $n$ is a Beta$(n-k+1, k)$ random variable, and

$$
\E\bigl[Y_2^{(n)}\bigr] = \frac{n-1}{n+1}.
$$ {#eq-rev-uniform}

So two bidders yield expected revenue $1/3$; three yield $1/2$; ten yield $9/11$. Adding bidders raises expected revenue, at a decreasing rate, because it raises the likely second-highest draw.

In a first-price (or Dutch) auction the seller receives the highest *bid*, $b(Y_1^{(n)})$. For uniform$[0,1]$, $b(v) = \frac{n-1}{n} v$, so revenue is $\frac{n-1}{n} Y_1^{(n)}$ and

$$
\E[\text{revenue}] = \frac{n-1}{n} \cdot \E\bigl[Y_1^{(n)}\bigr] = \frac{n-1}{n} \cdot \frac{n}{n+1} = \frac{n-1}{n+1}.
$$

The two numbers coincide. That is not an accident of the uniform distribution, and it is not a statement about realised revenue: in [[#ex-uniform-two]] the first-price price was $0.40$ and the second-price price was $0.50$. It is a statement about *expectations*, and it is the content of the next chapter.

A more revealing object than expected revenue is the **expected payment of a type**. Under either format, a bidder with value $v$ wins with probability $F(v)^{n-1}$ (the probability she is the highest). In the first-price auction she then pays $b(v)$, so her expected payment is $F(v)^{n-1} b(v)$. For uniform$[0,1]$,

$$
m(v) := F(v)^{n-1} b(v) = v^{n-1} \cdot \frac{n-1}{n} v = \frac{n-1}{n}\, v^n.
$$ {#eq-payment-uniform}

In the second-price auction she pays the highest rival if she wins, so her expected payment is $\E[Y_1 \mathbf{1}_{Y_1 \le v}] = \int_{\underline{v}}^v t \cdot (n-1) F(t)^{n-2} f(t)\,\mathrm{d}t$, which is exactly the numerator of [[#eq-fpa-bid]] and therefore equals $F(v)^{n-1} b(v)$ again. Expected payments match type by type, not only on average.

::: example Expected payment at a given value {#ex-payment}
Two bidders, values uniform on $[0, 1]$. What is the expected payment of a bidder with $v = 0.80$ in the first-price auction? In the second-price auction? What is expected revenue?
::: solution
From [[#eq-payment-uniform]] with $n = 2$, $m(0.80) = \tfrac12 (0.80)^2 = 0.32$. That is the first-price figure: she bids $0.40$ and wins with probability $0.80$, and $0.40 \times 0.80 = 0.32$. In the second-price auction she wins with probability $0.80$ and then pays a rival drawn uniformly from $[0, 0.80]$, whose expectation is $0.40$, so she expects to pay $0.80 \times 0.40 = 0.32$ again. Expected revenue is $n$ times the average of $m(v)$:

$$
\E[R] = 2 \int_0^1 \tfrac12 v^2\,\mathrm{d}v = \frac13,
$$

which matches $(n-1)/(n+1) = 1/3$.
:::
:::

::: quiz
Two bidders, independent values uniform on $[0, 1]$. In one realisation Ava’s value is $0.80$ and Ben’s is $0.50$. First-price revenue is $0.40$; second-price revenue is $0.50$. Does this contradict revenue equivalence?
- [ ] Yes: the formats are supposed to raise the same amount
- [x] No: revenue equivalence is a statement about *expected* revenue (and expected payments by type), not about every realisation
- [ ] Yes, unless the bidders are risk-averse
- [ ] No, because $0.40$ is the expected revenue
::: solution
Expected revenue is $1/3$ in both formats. Realised prices differ from sale to sale and across formats. The number $0.40$ is the first-price *realised* price in this one draw, not the expectation. Risk aversion is a reason the *expectations* would differ, which is a different chapter.
:::
:::

::: widget montecarlo
mode: integral
f: 2*x*(1-x)
a: 0
b: 1
n: 2000
caption: Monte Carlo estimate of $\int_0^1 2x(1-x)\,\mathrm{d}x$. The integrand is $x$ times the density $2(1-x)$ of the *minimum* of two uniform$[0,1]$ draws — that minimum is the second-price revenue with two bidders. The integral equals $1/3$. Raise the number of draws and watch the estimate settle on $0.333\ldots$; this is expected revenue, not a forecast of any particular sale.
:::

## Efficiency

An allocation is **ex-post efficient** if the object goes to the bidder with the highest value (or stays with the seller when $v_0$ exceeds every $v_i$; for now $v_0 = 0$). Both the dominant-strategy equilibrium of second-price / English and the symmetric increasing equilibrium of first-price / Dutch are efficient in the IPV model: the ranking of bids is the ranking of values. That is a property of *symmetric* IPV equilibria, not of first-price auctions in general. If Ava’s value is drawn from a distribution that first-order stochastically dominates Ben’s, her first-price bid function is not the same as his, and there will be value-pairs at which Ben bids more and wins, wasting the object. Second-price still awards to the highest value. Efficiency of first-price is fragile; efficiency of second-price (with private values) is not.

With a seller’s value $v_0 > 0$ even second-price can be inefficient, because a bidder with $v_i \in (v_0, \text{second-highest})$ might still win if there is no reserve. Reserves are the subject of [[market-design/optimal-auctions]]; they trade a bit of efficiency for a bit of revenue.

::: intuition Why shade, and why not
In a first-price auction you are bidding against the *distribution* of rivals. Cutting the bid a little saves money whenever you would have won anyway and costs you the object only when you were close to losing. The optimum balances those. In a second-price auction you are not bidding against a distribution in that sense: the price, if you win, is set by someone else, so the “save money when you win” margin is not yours to pick. You use the bid only as a yes-or-no at each possible price $m$, and the right yes-or-no is $m \le v$.
:::

## Evidence

Laboratory tests of the IPV predictions are old and, on the whole, kind to the theory’s directional claims and unkind to its point predictions. Coppinger, Smith and Titus (1980, *Economic Inquiry*) and Cox, Roberson and Smith (1982, *Journal of Financial Economics*) ran induced-value English, Dutch, first-price and second-price auctions. English prices tracked the second-highest value closely. First-price bids were above the risk-neutral Nash benchmark of [[#eq-fpa-bid]] — consistent with risk aversion, which we take up in the next chapter, and also with a noisy best response. Second-price sealed-bid subjects sometimes overbid relative to true values, a finding replicated by Kagel, Harstad and Levin (1987, *Econometrica*) and still not fully settled; one reading is that the dominance argument of [[#thm-vickrey]] is transparent on a blackboard and less so when an envelope is in your hand. Field evidence is harder to interpret because values are not observed. The FCC’s first spectrum sale (Auction 1, July 1994) used an English-style simultaneous ascending format rather than sealed bids, precisely because the objects were not independent private-value paintings; that design belongs in [[market-design/multi-unit-auctions]].

Treasury-bill auctions, which are multi-unit, have been run as discriminatory (pay-as-bid, the multi-unit cousin of first-price) and as uniform-price (the cousin of second-price). The US Treasury moved its notes and bonds to uniform-price in the 1990s after experiments reported in Archibald and Malvey (1998, Treasury staff study); we return to that comparison when there are several units.

## Where this leads

The coincidence of expected revenue across the four formats, visible for the uniform distribution in [[#eq-rev-uniform]] and for expected payments in [[#eq-payment-uniform]], is a theorem: [[market-design/revenue-equivalence]]. That theorem is an envelope identity, and the same identity produces Myerson’s characterisation of **optimal** auctions ([[market-design/optimal-auctions]]). Dropping independence takes us to the winner’s curse ([[market-design/common-values]]). Dropping “one object” takes us to demand reduction and spectrum ([[market-design/multi-unit-auctions]]). The dominance argument of [[#thm-vickrey]] will reappear, almost unchanged, as strategy-proofness of deferred acceptance on the proposing side ([[market-design/stable-matching]]) and of top trading cycles ([[market-design/exchange-without-money]]).

::: history
William Vickrey’s 1961 paper in the *Journal of Finance*, “Counterspeculation, auctions, and competitive sealed tenders”, introduced the second-price sealed-bid auction and compared it with first-price, including an independent-private-value calculation of equilibrium bids. Vickrey received the 1996 Nobel Memorial Prize in Economic Sciences, jointly with James Mirrlees, for the study of incentives under asymmetric information; he died three days after the announcement. The English and Dutch formats are much older as institutions — the Dutch flower auction at Aalsmeer has used a descending clock since the early twentieth century; open ascending auctions are older still — but the equilibrium analysis of first-price sealed-bid under IPV was completed in the 1970s, notably in work by James Griesmer, Richard Levitan and Martin Shubik (1967) and by John Riley and William Samuelson (1981). The four-format taxonomy used here is the one popularised by McAfee and McMillan’s 1987 *Journal of Economic Literature* survey.
:::

::: summary
- Four classical formats sell one object: English (ascending), Dutch (descending), first-price sealed-bid and second-price sealed-bid ([[#def-formats]]). Dutch is strategically equivalent to first-price; with IPV, English has the same outcome as second-price ([[#prop-equivalence-formats]]).
- Independent private values: each bidder knows her own value, values are independent draws from $F$, and payoffs are $v_i - p$ for the winner ([[#def-ipv]]).
- In a second-price auction, bidding one’s value is weakly dominant; the highest-value bidder wins and pays the second-highest value ([[#thm-vickrey]]).
- In a first-price auction the unique symmetric increasing equilibrium is $b(v) = \E[Y_1 \mid Y_1 \le v]$, the expected highest rival value given that one wins. For uniform$[0,1]$, $b(v) = ((n-1)/n)v$ ([[#thm-fpa]], [[#ex-uniform-n]]).
- Under these equilibria both formats are efficient, and for uniform$[0,1]$ both yield expected revenue $(n-1)/(n+1)$. Expected payments match type by type. Realised prices need not match.
- First-price efficiency fails once bidders are asymmetric; second-price efficiency (with private values and no reserve) does not.
:::

## Exercises

::: exercise A three-bidder Vickrey sale {level=1}
Dina’s value is $15$, Eli’s is $11$, Farah’s is $9$. They bid in a second-price sealed-bid auction and each uses the dominant strategy. Who wins, what is the price, and what is each bidder’s payoff?
::: solution
Each bids her value. Dina wins and pays $11$. Payoffs: Dina $15-11 = 4$, Eli $0$, Farah $0$.
:::
:::

::: exercise Shade with four bidders {level=1 check="0.75"}
Values are independent uniform on $[0, 1]$, $n = 4$, first-price sealed-bid, symmetric equilibrium. What does a bidder with value $1$ bid? (Enter the bid.)
::: solution
$b(v) = ((4-1)/4)v = (3/4)v$. At $v = 1$ the bid is $3/4 = 0.75$.
:::
:::

::: exercise Expected revenue, five bidders {level=1 check="2/3"}
Values independent uniform on $[0, 1]$, $n = 5$. What is expected revenue in the second-price equilibrium? (Enter the expected revenue, as a fraction in lowest terms.)
::: solution
$\E[Y_2^{(5)}] = (5-1)/(5+1) = 4/6 = 2/3$. By the calculation in the text the first-price expected revenue is the same.
:::
:::

::: exercise Uniform on $[2, 5]$, two bidders {level=2}
Let $n = 2$ and $F$ be uniform on $[2, 5]$, so $F(v) = (v-2)/3$ for $v \in [2, 5]$. Using [[#eq-fpa-bid]], find the first-price bid $b(v)$. Evaluate $b(4)$.
::: hint
$\int_2^v F(t)\,\mathrm{d}t = \int_2^v (t-2)/3\,\mathrm{d}t$. The boundary is $b(2) = 2$, not $0$.
:::
::: solution
$\int_2^v (t-2)/3\,\mathrm{d}t = (v-2)^2/6$. Then

$$
b(v) = v - \frac{(v-2)^2/6}{(v-2)/3} = v - \frac{v-2}{2} = \frac{v+2}{2}.
$$

(The same formula is $b(v) = \E[Y_1 \mid Y_1 \le v]$ with $Y_1$ uniform on $[2, v]$.) At $v = 4$, $b(4) = 3$. Check: a bidder at the bottom of the support bids $2$ and never shades below her value, because bidding below $2$ cannot raise the chance of winning (the rival never bids below $2$ either).
:::
:::

::: exercise An English dropout {level=2}
Four bidders have private values $10, 7, 6, 3$. An English clock starts at $0$. Each uses the dominant strategy. List the dropout prices in order, the winner, and the price paid. Compare with the second-price sealed-bid outcome.
::: solution
The bidder with $3$ drops at $3$; then $6$ drops at $6$; then $7$ drops at $7$. The bidder with $10$ remains and pays $7$. Second-price sealed-bid: bids $10, 7, 6, 3$, winner pays $7$. Same allocation, same price.
:::
:::

::: exercise Expected payment as a function of type {level=2 check="0.32"}
Two bidders, uniform$[0, 1]$ values, either format in symmetric equilibrium. What is the expected payment $m(v)$ of a bidder with $v = 0.80$? (Enter the expected payment as a decimal.)
::: solution
From [[#eq-payment-uniform]] with $n = 2$, $m(v) = \frac12 v^2$, so $m(0.80) = \frac12 (0.80)^2 = 0.32$. In the first-price auction she bids $0.40$ and wins with probability $0.80$. In the second-price auction she wins with probability $0.80$ and then pays a rival drawn uniformly from $[0, 0.80]$.
:::
:::

::: exercise A first-price first-order condition {level=2}
Two bidders, values independent with $F(v) = v^2$ on $[0, 1]$ (so the density is $f(v) = 2v$). Using [[#eq-fpa-bid]], find the symmetric first-price bid $b(v)$. Evaluate $b(1)$.
::: hint
$F(t)^{n-1} = t^2$. Integrate $\int_0^v t^2\,\mathrm{d}t$.
:::
::: solution
$n = 2$, so $b(v) = v - \bigl(\int_0^v t^2\,\mathrm{d}t\bigr)/v^2 = v - (v^3/3)/v^2 = v - v/3 = \tfrac23 v$. At $v = 1$ the bid is $2/3$. Compared with uniform values, where $b(v) = v/2$, bids are *higher* (less shade as a fraction of $v$). The distribution $F(v) = v^2$ puts more mass near $1$ than the uniform, so a rival is more likely to be strong; the first-price trade-off then favours bidding closer to value.
:::
:::

::: exercise Overbidding in a second-price auction {level=3}
Ava’s value is $v$, Ben’s bid is already in the envelope, and Ava does not know it. The auction is second-price. Show that bidding $b > v$ is weakly dominated by bidding $v$, and exhibit a rival bid against which $b > v$ does strictly worse. Conclude that “I might as well bid high, because I only pay the second bid” is false.
::: hint
Let $m$ be Ben’s bid. Split into $m < v$, $v < m < b$, and $m > b$.
:::
::: solution
If $m < v$, both $b$ and $v$ win and both pay $m$, so they tie. If $m > b > v$, both lose and earn $0$. If $v < m < b$, bidding $v$ loses and earns $0$, while bidding $b$ wins and earns $v - m < 0$. That event is the one that makes overbidding strictly worse. The slogan is false because the second bid can sit *between* $v$ and the inflated bid, in which case overbidding buys a loss-making object.
:::
:::

::: exercise Deriving the uniform bid from the rival order statistic {level=3}
Let $n = 3$ and $F(v) = v$ on $[0, 1]$. The highest of the two rivals, $Y_1$, has density $2y$ on $[0, 1]$. Using [[#eq-fpa-rival]], compute $b(v) = \E[Y_1 \mid Y_1 \le v]$ directly from that density, and confirm it equals $(2/3)v$.
::: hint
The conditional density of $Y_1$ given $Y_1 \le v$ is $2y / v^2$ on $[0, v]$.
:::
::: solution
$\Prob(Y_1 \le v) = v^2$. The conditional density is $2y / v^2$ on $[0, v]$. Then

$$
b(v) = \int_0^v y \cdot \frac{2y}{v^2}\,\mathrm{d}y = \frac{2}{v^2} \int_0^v y^2\,\mathrm{d}y = \frac{2}{v^2} \cdot \frac{v^3}{3} = \frac{2}{3} v,
$$

which is [[#ex-uniform-n]] for $n = 3$.
:::
:::

::: exercise An inefficient first-price example {level=3}
Two bidders. Ava’s value is $1$ for sure (it is common knowledge). Ben’s value is $0$ or $2$ with equal probability, known to Ben but not to Ava. They play a first-price sealed-bid auction, bids must be non-negative, and ties are broken uniformly. Show that there is no equilibrium in which the highest-value bidder always wins. (A complete characterisation of equilibrium is not required; a contradiction from assuming an efficient equilibrium in pure strategies for Ben, together with a best response for Ava, is enough.)
::: hint
If Ben with value $2$ always outbids Ava, Ava earns $0$ whenever Ben has value $2$. What would Ava bid if she tried to beat Ben’s low type only?
:::
::: solution
Efficiency requires: Ben wins when his value is $2$, Ava wins when Ben’s value is $0$. So Ben with $v_B = 2$ must bid strictly more than Ava, and Ben with $v_B = 0$ must bid strictly less (or bid $0$ and lose the tie in a way that still awards the object to Ava). Ben with $v_B = 0$ will not bid above $0$. Let Ava’s bid be $a \ge 0$. Then Ben with $v_B = 2$ wins by bidding just above $a$, and will not bid more than that. If $a > 0$, Ava wins against Ben’s low type and pays $a$, for expected payoff $\tfrac12 (1 - a)$; she could cut $a$ towards $0$ and still beat Ben’s zero bid, so the only candidate is $a = 0$. But then Ben with $v_B = 2$ can bid $0$ as well, and a tie at $0$ awards the object to Ben with probability $1/2$ when $v_B = 2$ — contradicting efficiency — or, if the tie-break is perturbed in Ava’s favour, Ben with $v_B = 2$ will bid $\varepsilon > 0$ and win, and Ava, bidding $0$, never beats him. If she raises her bid to beat that $\varepsilon$, Ben raises too. There is no pair of bids that both awards the object to whoever has the higher value *and* is a mutual best response: first-price cannot separate Ben’s high type from Ava without giving Ava a reason to bid up, which then gives Ben a reason to bid up further, wasting the object on some paths. (Second-price still works: Ava bids $1$, Ben bids $0$ or $2$, and the highest value always wins.)
:::
:::
