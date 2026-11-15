A tract of offshore oil is to be leased. The oil under the ground is the same whoever wins; what differs is the seismic survey each company has run. A bidder who wins has, in one stroke, learned two things: that she owns the oil, and that every rival’s survey was more pessimistic than hers. The second piece of news is bad. If she bid as if her survey were an unbiased estimate of the oil, she has overpaid. That is the **winner’s curse**, and it is the central new force once values are no longer private.

Independent private values made a bidder’s payoff depend only on her own type and on the price. **Interdependent values** let the payoff depend on other bidders’ information. **Common values** are the extreme case: the object is worth the same $V$ to everyone, and each bidder observes a signal of $V$. Between the extremes sit **affiliated** private values, mineral-rights models with a private-cost component, and almost every auction of a resaleable asset. Revenue equivalence fails. English and second-price cease to be equivalent. The ranking of formats becomes a theorem, Milgrom and Weber’s **linkage principle**: the more the price is linked to rivals’ information, the higher the expected price.

This chapter is about that failure and that ranking. Numbers are illustrative unless sourced. Nothing here is a recommendation to bid on oil, spectrum, or anything else.

## Interdependent values and the mineral-rights model

::: definition Interdependent and common values {#def-interdependent}
Bidder $i$ observes a **signal** $X_i$ (her type). The value of the object to $i$ is $v_i(X_1, \dots, X_n)$, a function of the whole signal profile, nondecreasing in each argument. Values are **pure common values** if $v_i = V(X_1, \dots, X_n)$ does not depend on $i$. They are **private** if $v_i = u(X_i)$. The **mineral-rights** (or mineral-oil, or wallet) model is the common-value specification $V = V(X_1, \dots, X_n)$ with the $X_i$ i.i.d. given $V$, or, in the wallet game below, $V = X_1 + X_2$ with the $X_i$ themselves the private observations.
:::

A house you will live in is close to private values. A house you will flip is closer to common values, because the resale price is a common $V$ that each bidder estimates. A Treasury bill is a common-value object (the resale value in the secondary market is the same for every dealer) with a small private component (balance-sheet and inventory differences). Offshore oil is the textbook mineral-rights case: $V$ is the profit of pumping the tract, and $X_i$ is bidder $i$’s survey.

The statistical structure that makes the theory work is **affiliation**, a strong form of positive dependence introduced by Milgrom and Weber (1982).

::: definition Affiliation {#def-affiliation}
Random variables $X_1, \dots, X_n$ with joint density $f$ are **affiliated** if $f(x \vee y)\, f(x \wedge y) \ge f(x)\, f(y)$ for all $x, y$, where $\vee$ and $\wedge$ are componentwise max and min. Informally: large values of some coordinates make large values of the others more likely. Independent random variables are affiliated (the inequality holds with equality). So are the monotone transformations of a common shock plus idiosyncratic noise that generate most mineral-rights models.
:::

Affiliation implies that the conditional distribution of $V$ given $X_i = x$ is increasing in $x$ in the likelihood-ratio order, and that the conditional distribution of rivals’ signals given $X_i = x$ is increasing in $x$ as well. A high signal is good news about the object *and* about rivals’ signals.

## The winner’s curse

Fix a pure common-value environment, and consider a bidder who has observed $X_i = x$ and is deciding how much to bid in a first-price or second-price auction. The naive estimate of the object is $\E[V \mid X_i = x]$. Winning, however, is informative.

::: proposition The winner’s curse {#prop-winners-curse}
Suppose bids are symmetric and strictly increasing in signals, and $V$ is affiliated with the signals. Then

$$
\E\bigl[V \mid X_i = x,\, i\text{ wins}\bigr] \;\le\; \E\bigl[V \mid X_i = x\bigr],
$$

with strict inequality whenever the other signals are not deterministic given $X_i$. A bidder who bids $\E[V \mid X_i = x]$ (or any increasing function of it that does not condition on winning) expects to lose money, conditional on winning, in a first-price auction, and more generally whenever the price paid is close to her bid.
:::

::: proof
Winning with an increasing bid function means $X_i \ge \max_{j \neq i} X_j$ (up to ties). Affiliation says that $\max_{j \neq i} X_j$ is positively dependent with $V$ given $X_i$. Conditioning on that maximum being *below* $x$ is therefore bad news about $V$. The inequality follows from the definition of affiliation (or, in the independent-signals-given-$V$ mineral-rights model, from Bayes: $i$ wins when her survey is the most optimistic, which, given $X_i = x$, shifts posterior mass toward lower $V$). If she pays a price equal to her bid and her bid equals $\E[V \mid X_i = x]$, then $\E[V - b \mid \text{win}, X_i = x] \le 0$.
:::

The curse is not a claim that winners lose money in a well-played equilibrium. It is a claim about a *naive* strategy. Equilibrium bids shade for two reasons that private-value bids already shaded for — to pay less when you win — and for a third: to correct for the bad news that winning itself contains.

::: example A two-signal oil tract {#ex-two-signal}
The tract is worth $V = 10$ or $V = 0$ with equal prior probability. Each of two firms observes a signal $X_i \in \{H, L\}$. If $V = 10$, $\Prob(X_i = H) = 3/4$ independently; if $V = 0$, $\Prob(X_i = H) = 1/4$. Signals are independent given $V$. Compute $\E[V \mid X_1 = H]$ and $\E[V \mid X_1 = H, X_2 = L]$. Interpret the gap as the winner’s curse in a second-price auction where the rival bids her naive estimate.
::: solution
By Bayes,

$$
\Prob(V = 10 \mid X_1 = H) = \frac{\tfrac12 \cdot \tfrac34}{\tfrac12 \cdot \tfrac34 + \tfrac12 \cdot \tfrac14} = \frac{3/8}{4/8} = \frac34,
$$

so $\E[V \mid X_1 = H] = 7.5$. Now condition also on $X_2 = L$:

$$
\Prob(V = 10 \mid H, L) = \frac{\tfrac12 \cdot \tfrac34 \cdot \tfrac14}{\tfrac12 \cdot \tfrac34 \cdot \tfrac14 + \tfrac12 \cdot \tfrac14 \cdot \tfrac34} = \frac{3/32}{6/32} = \frac12,
$$

so $\E[V \mid H, L] = 5$. The naive estimate given a high signal is $7.5$; the estimate given a high signal *and* the news that the rival was low — which is exactly the news a second-price winner receives, in equilibrium, when the rival has a low signal — is $5$. A bidder who bids $7.5$ with a high signal, against a rival who bids $2.5$ with a low signal (the naive $\E[V \mid L] = 2.5$), wins against a low rival, pays $2.5$, and has expected value $5$, so she still makes money in this particular comparison; but if the rival is also naive and also has a high signal, both bid $7.5$, one wins at $7.5$ against a true expected value of $\E[V \mid H, H] = 9$, which happens to be safe. The curse is sharper in first-price, where she *pays her own bid*. The next example makes the loss visible.
:::
:::

::: example Naive first-price bids lose money {#ex-naive-loss}
In the same two-signal model, suppose both bidders use the naive first-price strategy “bid $\E[V \mid X_i]$”: bid $7.5$ with $H$ and $2.5$ with $L$. Ties at equal bids are broken randomly. Compute bidder 1’s expected profit given $X_1 = H$.
::: solution
Given $X_1 = H$, the rival has $H$ with probability $\Prob(X_2 = H \mid X_1 = H)$.

$$
\Prob(X_2 = H \mid X_1 = H) = \frac34 \cdot \frac34 + \frac14 \cdot \frac14 = \frac{10}{16} = \frac58,
$$

because with probability $3/4$ we are in the $V = 10$ world (from the previous calculation, $\Prob(V=10 \mid H)=3/4$) and then the rival is $H$ with probability $3/4$, and with probability $1/4$ we are in the $V = 0$ world and the rival is $H$ with probability $1/4$. (Check: $\tfrac34\cdot\tfrac34 + \tfrac14\cdot\tfrac14 = \tfrac{9}{16}+\tfrac{1}{16}=\tfrac{10}{16}$.)

If the rival has $L$ (probability $3/8$), bidder 1 wins for sure, pays $7.5$, and the expected value of $V$ given $(H,L)$ is $5$, so expected profit on this branch is $5 - 7.5 = -2.5$. If the rival has $H$ (probability $5/8$), they tie, bidder 1 wins with probability $1/2$, pays $7.5$, and $\E[V \mid H, H] = 9$, so expected profit on this branch is $\tfrac12 (9-7.5) = 0.75$. Overall expected profit given $H$:

$$
\frac38 \cdot (-2.5) + \frac58 \cdot 0.75 = -0.9375 + 0.46875 = -0.46875 < 0.
$$

The naive high-signal bidder expects to *lose* money. The loss comes from the branch where she beats a low rival and pays $7.5$ for an object worth $5$ in expectation. That is the winner’s curse in a first-price number.
:::
:::

::: warning Winning is not confirmation that you were right
A common verbal slip is “I won, so my survey was the best, so the oil is probably there.” The first clause is right; the second is the curse. Your survey being the *most optimistic* is, given how optimistic it was, evidence that the oil is *less* plentiful than your survey taken alone suggested. Equilibrium bidding subtracts that evidence before the bid is named.
:::

## Equilibrium with common values

The second-price auction still has a tractable equilibrium, because the price, if you win, is the rival’s bid, which in a symmetric increasing equilibrium is a function of the highest rival signal.

::: theorem Second-price equilibrium with interdependent values {#thm-spa-inter}
In a symmetric affiliated-values model, a symmetric increasing equilibrium of the second-price auction is

$$
b(x) = \E\bigl[v_i(X) \mid X_i = x,\, \max_{j \neq i} X_j = x\bigr].
$$ {#eq-spa-inter}

That is: bid the expected value of the object *as if* the highest rival signal equalled your own. With two bidders and pure common values this is $b(x) = \E[V \mid X_1 = x, X_2 = x]$.
:::

::: proof
(Sketch for two bidders.) Suppose the rival uses $b(\cdot)$ strictly increasing. If you bid $b(z)$, you win when $X_2 < z$ and pay $b(X_2)$. Your expected payoff at signal $x$ is

$$
\int^{z} \bigl(\E[V \mid X_1 = x, X_2 = t] - b(t)\bigr) f_{X_2 \mid X_1}(t \mid x)\,\mathrm{d}t.
$$

Differentiating in $z$ and setting $z = x$ to zero gives $b(x) = \E[V \mid X_1 = x, X_2 = x]$. Affiliation ensures the second-order condition: the integrand changes from positive to negative at $t = x$. The $n$-bidder case replaces $X_2$ by the highest rival signal.
:::

The formula is the curse-corrected bid. You do *not* bid $\E[V \mid X_i = x]$; you bid as if you were just tied with the strongest rival. That is worse news than winning against a weaker rival, so it is a conservative (low) estimate — conservative enough that, when you actually beat someone weaker and pay *their* bid, you still break even in expectation.

First-price equilibrium exists under similar conditions but does not have as closed a form: the bid solves a differential equation that mixes shading against the distribution of rivals with shading against the curse. Dutch remains strategically equivalent to first-price (no information arrives). English does *not* remain equivalent to second-price: drop-out prices reveal signals, and remaining bidders update. That extra information is the source of the linkage ranking.

::: example The wallet game {#ex-wallet}
Two bidders. Each draws $X_i$ independently uniform on $[0, 1]$ and observes it. The object is worth $V = X_1 + X_2$ to both (a wallet containing both amounts). Compute the naive estimate $\E[V \mid X_i = x]$ and the second-price equilibrium bid $b(x)$. At $x = 0.40$, compare them. If both use $b$, and the draws are $0.40$ and $0.70$, who wins, what is paid, and what is $V$?
::: solution
$\E[V \mid X_1 = x] = x + \E[X_2] = x + 1/2$. At $x = 0.40$ the naive estimate is $0.90$. The equilibrium bid is $b(x) = \E[X_1 + X_2 \mid X_1 = x, X_2 = x] = 2x$, so $b(0.40) = 0.80$. The naive bid is *above* the equilibrium bid: the curse correction subtracts $0.10$ at this signal.

If the draws are $0.40$ and $0.70$, bids are $0.80$ and $1.40$. The $0.70$ bidder wins and pays $0.80$. True $V = 1.10$. The winner’s surplus is $1.10 - 0.80 = 0.30 > 0$. Had she bid the naive $0.70 + 0.50 = 1.20$, she would still have won (against $0.80$) and paid $0.80$ in *second-price* — same price, because the price is the rival’s bid. The curse in second-price bites through the *rival’s* naive bid being too high. If *both* were naive, bids would be $0.90$ and $1.20$, the winner would pay $0.90$ for an object worth $1.10$, still a profit in this draw; averaging over draws, naive second-price in the wallet game is actually not catastrophic because the price is the other wallet. First-price is the dangerous format for naive bids: paying $0.90$ for $V$ whose expectation given winning at $x = 0.40$ is $\E[X_1+X_2 \mid X_1=0.40, X_2 < 0.40] = 0.40 + 0.20 = 0.60$, a loss of $0.30$.
:::
:::

::: widget plot
f: 2*x; x+0.5; x
x: 0, 1
y: 0, 2
labels: \text{SPA equilibrium }2x; \text{naive }x+0.5; \text{signal }x
caption: The wallet game. The 45-degree line is the signal. The naive estimate $x+1/2$ lies above the second-price equilibrium bid $2x$ for $x < 1/2$ and below it for $x > 1/2$. At low signals the curse correction *cuts* the bid; at high signals the fact that $V$ includes $x$ pushes the just-tied estimate $2x$ above the unconditional-on-the-rival estimate $x+1/2$. Hover to compare the three numbers at a chosen $x$.
:::

::: widget montecarlo
mode: integral
f: 4*x*(1-x)
a: 0
b: 1
n: 2000
caption: Monte Carlo estimate of $\int_0^1 4x(1-x)\,\mathrm{d}x = 2/3$. This is expected second-price (and first-price) revenue in the two-bidder wallet game: $2\E[\min(X_1,X_2)]$. Increase the draws; the estimate settles near $0.667$. A numerical integral, not a forecast of any sale.
:::

::: quiz
In a pure common-value second-price auction, the symmetric increasing equilibrium bid of a bidder with signal $x$ is
- [ ] $\E[V \mid X_i = x]$, the best estimate of the object given her information
- [x] $\E[V \mid X_i = x, \max_{j\neq i} X_j = x]$, the estimate as if she were just tied
- [ ] $x$ itself, as in Vickrey’s private-value argument
- [ ] $\E[V]$, the prior mean, because values are common
::: solution
[[#thm-spa-inter]]. Vickrey’s “bid your value” needs a *private* value; here there is no single “your value” until rivals’ signals are known. The prior mean ignores the signal. The naive estimate ignores the information in winning.
:::
:::

## The linkage principle

With affiliated signals, the four classical formats cease to be revenue-equivalent. Milgrom and Weber’s ranking is:

::: theorem Linkage principle (Milgrom–Weber) {#thm-linkage}
In the symmetric affiliated-values model, with a symmetric increasing equilibrium of each format, expected revenues satisfy

$$
\text{English} \;\ge\; \text{second-price sealed-bid} \;\ge\; \text{first-price sealed-bid} = \text{Dutch}.
$$

Moreover, a seller who can commit to revealing information affiliated with $V$ (an estimate, an appraisal, the number of bidders who passed a qualification) raises expected revenue in these auctions — the **publicity** effect.
:::

The intuition is **linkage**. A bidder’s expected payment, given her signal, is increasing in how tightly the price she pays is tied to rivals’ (and the seller’s) information. Tighter linkage leaves her less information rent. The English clock links the price to every dropout; second-price links it to the highest rival bid, which is one dropout; first-price links it only to her own bid, which is a function of her own signal. Public information is a further link, and it reduces the winner’s curse (everyone conditions on the same extra signal) which, under affiliation, raises bids by more than it reveals.

Independence is the boundary: affiliation holds with equality, the ranking collapses to equality, and we recover revenue equivalence.

::: intuition Why English raises more
In an English auction you see rivals drop. Each dropout is a signal. Remaining bidders revise $V$ down (a dropout is bad news) but they also learn *where* they stand, and the eventual price is literally a rival’s dropout — a statistic of someone else’s information. In a first-price envelope you have only your survey. The envelope of [[market-design/revenue-equivalence]] required independence to make winning probabilities and payments match across formats; affiliation breaks that, and it breaks it in favour of the format that uses more of the room’s information.
:::

The publicity corollary is the theoretical case for appraisal, for publishing a reserve that conveys information, and for the FCC’s practice of making bids public during a simultaneous ascending auction. It is not a case for revealing *everything*: the seller will not reveal a signal that is not affiliated with $V$, and she will not reveal information that destroys competition (for example, that only one bidder has a positive value).

::: example Wallet revenues, and what they do not show {#ex-wallet-rev}
Two bidders, wallet game, $X_i$ i.i.d. uniform on $[0, 1]$, $V = X_1 + X_2$. Compute expected revenue in the second-price equilibrium $b(x) = 2x$ and in the first-price equilibrium. Do the two formats rank as the linkage principle’s *strict* inequality would suggest?
::: solution
Second-price bids are $b(x) = 2x$, so revenue is $2\min(X_1, X_2)$ and $\E[R_{\text{SP}}] = 2 \cdot (1/3) = 2/3$. First-price: a bidder with signal $x$ who bids as type $z$ wins when $X_2 < z$, pays $b(z)$, and expects value $x + z/2$. The first-order condition at $z = x$ with $F(z) = z$ reduces to $2x = b(x) + x b'(x)$, or $(x b(x))' = 2x$. The solution with $b(0) = 0$ is $b(x) = x$. Expected first-price revenue is then $\E[\max(X_1, X_2)] = 2/3$. The two formats raise the same expected revenue.

This is not a counter-example to [[#thm-linkage]]. The theorem’s *strict* ranking uses affiliation of **signals**. In the wallet game the signals are independent — affiliation holds with equality — and values are interdependent because $V$ adds them. Interdependence of values without affiliation of signals is not enough to rank the formats. The mineral-rights specification $X_i = V + \varepsilon_i$ with a random $V$ and idiosyncratic $\varepsilon_i$ *does* affiliate the signals, and there the ranking is strict: English (with at least three bidders, so that a dropout is visible to someone who remains) raises more expected revenue than sealed second-price, which raises more than first-price.
:::
:::

With two bidders, English and second-price coincide even under affiliation: there is only one rival, and her dropout is the second-price. The English advantage needs $n \ge 3$, so that the price can be linked to a dropout that is *not* the runner-up’s signal in a sealed envelope, but a public statistic the remaining bidders have already used to update.

::: quiz
The linkage principle says that, with affiliated signals, a seller who wants expected revenue should prefer
- [ ] first-price sealed-bid, because bids are “real money”
- [ ] Dutch, because it is fast
- [x] English (ascending), because the price is linked to rivals’ information
- [ ] whichever format hides the most information
::: solution
[[#thm-linkage]] ranks English on top. Hiding information is the opposite of the publicity effect. Dutch is strategically equivalent to first-price and sits at the bottom of the ranking. “Real money” is not a criterion in the model.
:::
:::

## Almost-common values and the Waldmann / Klemperer footnote

A small private-value advantage on top of a common-value object can destroy the symmetric equilibrium and, with it, the revenue ranking. Klemperer (1998, *European Economic Review*) constructs an “almost common value” English auction in which one bidder values the object at $V + \varepsilon$ and the other at $V$; the advantaged bidder wins at a price that does not reflect $V$, because the disadvantaged bidder knows she will be cursed whenever she is close. The applied moral, used in the design of the UK 3G auction (Klemperer 2004), is that **entry** and **symmetry** can matter more than the choice among the four classical formats. A format that looks revenue-dominant on the blackboard can raise little if it deters the second serious bidder from showing up.

## Evidence

Field. Capen, Clapp and Campbell (1971, *Journal of Petroleum Technology*), writing as petroleum engineers rather than as theorists, documented systematic overpayment on US outer-continental-shelf oil leases in the 1960s and named the phenomenon the winner’s curse. Hendricks, Porter and Boudreau (1987, *Economic Journal*) and Hendricks and Porter (1988, *American Economic Review*) studied those leases with modern data: bidding is more conservative when the number of rivals is larger, consistent with curse-correction, and firms with neighbouring tracts (better information) bid more aggressively and earn more, consistent with [[#thm-spa-inter]]. The 1994 FCC spectrum sale used an English-style simultaneous ascending format in part because licences were expected to have a common-value component (downstream-market forecasts that every firm was making) and because the designers wanted the information revelation that linkage recommends (McMillan 1994, *Journal of Economic Perspectives*; Cramton 1995).

Laboratory. Kagel and Levin (1986, *American Economic Review*) ran common-value auctions with induced $V$ and noisy signals. Inexperienced bidders in first-price auctions fall prey to the curse, especially as $n$ grows (more rivals, more bad news in winning, naive bids do not adjust enough). Experienced bidders in the same lab correct more, but not always enough to restore the risk-neutral Nash bid. English auctions in the lab mitigate the curse, consistent with linkage: dropout prices give subjects the information the sealed envelope withholds.

The UK 3G auction of April 2000, an English-style ascending sale of five licences, raised GBP 22.5 billion (National Audit Office, *The Auction of Radio Spectrum for the Third Generation of Mobile Telephones*, 2001). Whether that number was “linkage plus common values” or “a stock-market bubble plus too little entry in later European sales” is a live dispute (Klemperer 2002, *Journal of Economic Perspectives*, versus Binmore and Klemperer 2002, *Economic Journal*). The course takes no side; it records that the designers chose an ascending format on linkage and entry grounds, and that subsequent European 3G sealed-bid and Anglo-Dutch hybrids were chosen on the opposite worry — that a pure English sale would let incumbents scare off entrants.

## Where this leads

Multi-unit and spectrum auctions ([[market-design/multi-unit-auctions]]) combine common-value information with complementarities across licences; the simultaneous ascending auction is an English auction for many objects at once, and activity rules exist to force the information out. Matching chapters drop prices altogether, so the winner’s curse does not arise; the analogue of “winning is bad news” is a different informational problem, the inference an applicant draws from being assigned a school that everyone else avoided.

::: history
The winner’s curse was named in print by Capen, Clapp and Campbell in 1971, in a petroleum-engineering journal, before the equilibrium theory existed. Robert Wilson’s 1969 and 1977 papers on mineral-rights auctions gave the first equilibrium analysis of common-value first-price bidding. Paul Milgrom and Robert Weber, “A theory of auctions and competitive bidding” (*Econometrica*, 1982), introduced affiliation, proved the second-price formula [[#eq-spa-inter]], and established the linkage ranking and the publicity effect. John Kagel and Dan Levin’s 1986 laboratory paper made the curse a standard experimental result. Milgrom and Wilson received the 2020 Nobel Memorial Prize “for improvements to auction theory and inventions of new auction formats”.
:::

::: summary
- Interdependent values: the object’s worth to $i$ depends on others’ signals. Pure common values are the case $v_i = V$ for all $i$ ([[#def-interdependent]]). Affiliation is the positive-dependence assumption that ranks the formats ([[#def-affiliation]]).
- The winner’s curse: $\E[V \mid X_i = x,\, i\text{ wins}] \le \E[V \mid X_i = x]$. Naive bids that ignore the inequality lose money in expectation ([[#prop-winners-curse]]).
- Second-price equilibrium bid: $\E[v_i \mid X_i = x, \max_{j\neq i} X_j = x]$, the just-tied estimate ([[#thm-spa-inter]]). In the wallet game that is $b(x) = 2x$.
- Linkage: with affiliated signals, English $\ge$ second-price $\ge$ first-price $=$ Dutch in expected revenue. Public affiliated information raises expected revenue ([[#thm-linkage]]). Independent signals can restore equality, as in the two-bidder wallet game.
- A small private advantage can wreck the symmetric equilibrium. Entry can matter more than format.
:::

## Exercises

::: exercise Naive versus just-tied {level=1 check="9"}
In [[#ex-two-signal]], $\E[V \mid H] = 7.5$ and $\E[V \mid H, L] = 5$. What is $\E[V \mid H, H]$? (Enter the expected value.)
::: solution
$$
\Prob(V = 10 \mid H, H) = \frac{\tfrac12 \cdot (\tfrac34)^2}{\tfrac12 \cdot (\tfrac34)^2 + \tfrac12 \cdot (\tfrac14)^2} = \frac{9/32}{10/32} = 0.9,
$$
so $\E[V \mid H, H] = 9$. The just-tied estimate of [[#thm-spa-inter]], for a high-signal bidder, is this number.
:::
:::

::: exercise Wallet bid {level=1 check="1.2"}
In the wallet game, second-price equilibrium, a bidder observes $X_i = 0.60$. What does she bid? (Enter the bid.)
::: solution
$b(x) = 2x = 1.2$.
:::
:::

::: exercise Wallet naive estimate {level=1 check="1.1"}
Same bidder, $X_i = 0.60$. What is the naive estimate $\E[V \mid X_i = 0.60]$? (Enter it.)
::: solution
$x + 1/2 = 1.1$. The equilibrium bid $1.2$ is *above* the naive estimate at this high signal; see the figure in the text.
:::
:::

::: exercise First-price wallet bid {level=2 check="0.6"}
In the wallet game the first-price equilibrium derived in [[#ex-wallet-rev]] is $b(x) = x$. What does a bidder with $X_i = 0.60$ bid in first-price? Who wins, and what is paid, if the rival drew $0.45$?
::: solution
She bids $0.60$. The rival bids $0.45$. She wins and pays $0.60$. True $V = 1.05$, so her surplus is $0.45$. (Enter the bid $0.6$.)
:::
:::

::: exercise Low-signal just-tied estimate {level=2}
In [[#ex-two-signal]], compute $\E[V \mid L]$ and $\E[V \mid L, L]$. Interpret the second number as a second-price equilibrium bid for a low-signal bidder, in the sense of [[#thm-spa-inter]].
::: solution
$\Prob(V = 10 \mid L) = \dfrac{\tfrac12\cdot\tfrac14}{\tfrac12\cdot\tfrac14+\tfrac12\cdot\tfrac34} = 1/4$, so $\E[V \mid L] = 2.5$. And

$$
\Prob(V = 10 \mid L, L) = \frac{\tfrac12\cdot(\tfrac14)^2}{\tfrac12\cdot(\tfrac14)^2+\tfrac12\cdot(\tfrac34)^2} = \frac{1/32}{10/32} = 0.1,
$$

so $\E[V \mid L, L] = 1$. A low-signal bidder in second-price equilibrium bids $1$, well below her naive $2.5$: winning as a low type, just tying another low type, is very bad news.
:::
:::

::: exercise Why English needs three bidders {level=2}
With two bidders, explain why the English auction and the second-price sealed-bid auction produce the same outcome even under affiliation. What extra information does English reveal when $n = 3$?
::: solution
With two bidders the English clock stops when the first (and only) rival drops; the remaining bidder pays that dropout price. That is exactly a second-price: the price is the rival’s bid (dropout). No third party’s information is revealed because there is no third party. With three bidders, the first dropout is observed by the two who remain; they update their estimate of $V$ before the clock continues, and the eventual price is the second dropout, which has been formed *after* that update. Sealed second-price has no such intermediate public statistic.
:::
:::

::: exercise Naive first-price expected loss {level=3}
In [[#ex-naive-loss]] the high-signal naive bidder’s expected profit was $-0.46875$. Repeat the calculation for a *low*-signal naive bidder, who bids $2.5$. Is her expected profit also negative?
::: hint
Given $X_1 = L$, $\Prob(X_2 = L \mid L) = 5/8$ by symmetry with the high-signal calculation, and $\E[V \mid L, L] = 1$, $\E[V \mid L, H] = 5$. Both bid $2.5$ when the signal is $L$, so against another $L$ they tie; against $H$ she loses for sure.
:::
::: solution
Given $L$, $\Prob(V = 10 \mid L) = 1/4$, and $\Prob(X_2 = L \mid L) = \tfrac14\cdot\tfrac14 + \tfrac34\cdot\tfrac34 = 10/16 = 5/8$. Against $H$ (probability $3/8$) she loses and earns $0$. Against $L$ (probability $5/8$) they tie at $2.5$; she wins with probability $1/2$, pays $2.5$, and $\E[V \mid L, L] = 1$, so expected profit on that branch is $\tfrac12(1-2.5) = -0.75$. Overall: $\tfrac58 \cdot (-0.75) = -0.46875$. The same loss as the high type! Naive bidding is a losing strategy at both signals; the low type’s loss comes from tying another low type and paying $2.5$ for an object worth $1$ in expectation.
:::
:::

::: exercise Derive the wallet first-price bid {level=3}
Two bidders, $V = X_1 + X_2$, $X_i$ i.i.d. uniform on $[0, 1]$. A bidder with signal $x$ who bids as type $z$ has expected payoff $z\bigl(x + z/2 - b(z)\bigr)$. Impose the first-order condition at $z = x$ and the boundary $b(0) = 0$, and confirm $b(x) = x$.
::: hint
Differentiate $u(z) = z x + z^2/2 - z b(z)$ in $z$.
:::
::: solution
$u(z) = zx + z^2/2 - z b(z)$. Then $u'(z) = x + z - \bigl(b(z) + z b'(z)\bigr)$. Set $z = x$: $2x = b(x) + x b'(x)$, which is $\frac{\mathrm{d}}{\mathrm{d}x}\bigl(x b(x)\bigr) = 2x$. Integrate: $x b(x) = x^2 + C$. The condition $b(0) = 0$ forces $C = 0$ (more carefully: $b$ bounded near $0$ forces $C = 0$). Thus $b(x) = x$.
:::
:::

::: exercise Publicity, direction {level=3}
A seller of a mineral-rights tract can, before a second-price auction, reveal a public signal $S$ affiliated with $V$ (an independent survey). Using the linkage idea, argue in a few sentences that expected revenue rises, and identify one reason a seller might nevertheless stay silent.
::: solution
Revealing $S$ links the price to an additional statistic of $V$. Each bidder’s just-tied estimate $\E[V \mid X_i = x, \max_{j\neq i} X_j = x, S = s]$ is more precise, the winner’s curse is milder (part of the bad news in winning has been replaced by public news already in everyone’s bid), and under affiliation the reduction in information rent raises expected payments. A seller might stay silent if the signal is *not* affiliated (it could be bad news that deters entry), if revealing it would make values common knowledge and collapse competition to a Bertrand outcome at $V$ when $n=2$ and signals become redundant, or if the survey is costly and the revenue gain does not cover the cost. The theorem assumes affiliation and a fixed $n$.
:::
:::


