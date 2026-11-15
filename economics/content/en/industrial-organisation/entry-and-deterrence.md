A market that is a monopoly today need not be a monopoly tomorrow. The threat of entry — a second airline on a route, a generic after a patent expires, a new cement kiln — is itself a constraint on the incumbent, but only if the incumbent cannot do something *now* that makes entry unprofitable *later*. This chapter is about that something. The first model is Stackelberg’s 1934 sequential-quantity game, in which the only commitment is to output. The second is Dixit’s 1980 capacity game, in which the commitment is a sunk investment that changes the incumbent’s future cost. The third is limit pricing as a signal of low cost (Milgrom and Roberts 1982). Predation and contestable markets occupy the last sections: one is a theory of fighting entry after it happens, the other a theory of why sunk costs, not concentration, are the right starting point.

The unifying idea is **strategic commitment**, made precise in [[game-theory/extensive-form]] as a choice in an earlier subgame that alters the Nash equilibrium of a later one. Whether the commitment deters or accommodates, and whether it is good or bad for buyers, depends on whether the later game has strategic substitutes or complements, in the language of [[industrial-organisation/cournot-bertrand]].

Profit is $\pi$. There is no inflation in this chapter.

## Stackelberg leadership

::: definition Stackelberg duopoly {#def-stackelberg}
Two firms produce a homogeneous good with inverse demand $p(Q)$ and costs $C_i(q_i)$. Firm 1, the **leader**, chooses $q_1 \ge 0$. Firm 2, the **follower**, observes $q_1$ and then chooses $q_2 \ge 0$. A **Stackelberg equilibrium** is a subgame-perfect equilibrium of this game: the follower’s strategy is a best response $q_2^*(q_1)$ in every subgame, and the leader maximises $p\bigl(q_1 + q_2^*(q_1)\bigr) q_1 - C_1(q_1)$.
:::

::: proposition Linear Stackelberg outcome {#prop-stackelberg}
With $p = a - bQ$ and constant equal marginal costs $c < a$, the unique subgame-perfect equilibrium is
$$
q_1^S = \frac{a-c}{2b}, \qquad q_2^S = \frac{a-c}{4b}, \qquad p^S = \frac{a+3c}{4},
$$ {#eq-stack}
with profits $\pi_1^S = (a-c)^2/(8b)$ and $\pi_2^S = (a-c)^2/(16b)$. The leader produces the monopoly quantity; the follower produces half of that. Total output exceeds Cournot output $(2/3)(a-c)/b$ and falls short of the competitive output $(a-c)/b$. The leader’s profit exceeds the Cournot profit $(a-c)^2/(9b)$; the follower’s falls short of it.
:::

::: proof
The follower’s problem, given $q_1$, is the monopoly problem on residual demand $p = (a-bq_1) - b q_2$. The best response is the Cournot best response of [[industrial-organisation/cournot-bertrand#eq-cournot-br]]:
$$
q_2^*(q_1) = \frac{a-c}{2b} - \frac{q_1}{2},
$$
provided this is positive, and $0$ otherwise. The leader’s residual inverse demand is $p = a - b q_1 - b q_2^*(q_1) = (a+c)/2 - (b/2) q_1$. Revenue minus cost has derivative $(a+c)/2 - b q_1 - c = (a-c)/2 - b q_1$. Setting this to zero gives $q_1^S = (a-c)/(2b)$. Then $q_2^S = (a-c)/(4b)$ and $p^S = a - 3(a-c)/4 = (a+3c)/4$. Profits follow by multiplication. Comparison with [[industrial-organisation/cournot-bertrand#eq-cournot-sym]] at $N=2$: $Q^S = 3(a-c)/(4b)$ versus $Q^C = 2(a-c)/(3b)$, and $3/4 > 2/3$, so $Q^S > Q^C$. Prices: $p^S = (a+3c)/4$ versus $p^C = (a+2c)/3$. The inequality $(a+3c)/4 < (a+2c)/3$ rearranges to $3a + 9c < 4a + 8c$, i.e. $c < a$, which holds. Leader profit $(a-c)^2/(8b)$ exceeds Cournot $(a-c)^2/(9b)$; follower profit $(a-c)^2/(16b)$ falls short of it.
:::

The leader produces more than a Cournot firm *because* the follower will shrink. That is the content of strategic substitutability: a commitment to be large is a commitment to make the rival small, which is valuable. If the later game were differentiated Bertrand, a commitment to be large (a capacity that forces a low price) would make the rival *cut* price too, which is harmful; the valuable commitment would then be to be small (Fudenberg and Tirole’s 1984 taxonomy: top dog versus puppy dog).

::: widget plot
f: (a-c)/(2*b) - x/2; (a-c)/b - 2*x
x: 0, 8
y: 0, 8
sliders: a=12:8:16:0.5; b=1:0.5:2:0.1; c=2:0:5:0.5
labels: \text{follower best response}; \text{Cournot BR of the leader (inverted)}
caption: The follower’s best response $q_2(q_1)$ as a function of the leader’s output (here the figure’s $x$ is $q_1$ and the vertical axis is $q_2$). The Stackelberg point is the leader’s favourite point *on the follower’s best-response line*, not the crossing of the two Cournot best responses (that crossing is Cournot). With $a=12$, $b=1$, $c=2$ the follower’s line is $5-x/2$; the leader chooses $x=5$, and $q_2=2.5$. The Cournot crossing is at $(10/3,10/3)$.
:::

The inverted Cournot BR of the leader is drawn so you can see the Cournot crossing; the leader does not play it. The leader’s isoprofit (not drawn) is tangent to the follower’s BR at Stackelberg.

::: example Water Stackelberg {#ex-stack-water}
$p = 12 - Q$, $c = 2$. Compute Stackelberg quantities, price and profits, and compare with Cournot ([[industrial-organisation/cournot-bertrand#ex-cournot-water]]) and monopoly ([[industrial-organisation/monopoly-pricing#ex-water]]).
::: solution
$q_1^S = 5$, $q_2^S = 2.5$, $Q^S = 7.5$, $p^S = 4.5$. Profits $12.5$ and $6.25$. Cournot was $q_i = 10/3$, $p = 16/3 \approx 5.33$, $\pi_i = 100/9 \approx 11.11$. Monopoly was $q=5$, $p=7$, $\pi=25$. The leader produces the monopoly quantity but does not earn the monopoly profit, because the follower adds 2.5 units and drives the price down to 4.5. Total profit $18.75$ is less than monopoly 25 (the firms fail to collude) and less than twice Cournot $200/9 \approx 22.22$ (the leader’s gain of about $1.39$ does not offset the follower’s loss of about $4.86$). Buyers are better off than under Cournot: consumer surplus is $\tfrac12 \times 7.5 \times 7.5 = 28.125$ versus Cournot $200/9 \approx 22.22$.
:::
:::

::: quiz
In linear Stackelberg with equal costs, the leader’s quantity equals
- [ ] a Cournot duopolist’s quantity
- [x] the monopoly quantity
- [ ] the competitive quantity
- [ ] twice a Cournot duopolist’s quantity
::: solution
[[#eq-stack]] has $q_1^S = (a-c)/(2b) = q^m$. A Cournot duopolist produces $(a-c)/(3b)$, so the leader produces more than Cournot but not twice Cournot (twice Cournot would be $2(a-c)/(3b)$). The competitive quantity is $(a-c)/b$, twice the leader’s output.
:::
:::

## Commitment and Dixit capacity

Stackelberg assumes the leader can commit to a quantity. Why would $q_1$ be irreversible? Dixit (1980, *Economic Journal*) gave the standard microfoundation: capacity.

::: definition Dixit capacity game {#def-dixit}
An incumbent (firm 1) first installs capacity $K$ at unit cost $r > 0$. Then an entrant (firm 2) decides whether to pay a sunk entry cost $F \ge 0$ and, if so, the two firms compete in quantities. Production up to $K$ costs the incumbent $w$ per unit, with $w + r = c$; production above $K$ costs $c$ per unit (capacity can be added later, but then the incumbent pays $r$ at the production stage). The entrant’s marginal cost is $c$. Inverse demand is $p = a - bQ$.
:::

The incumbent’s *post-entry* marginal cost is $w$ up to $K$ and $c$ thereafter. A large $K$ therefore rotates the incumbent’s best-response function outward for $q_1 \le K$, which, because quantities are strategic substitutes, shifts the post-entry Nash equilibrium toward a larger $q_1$ and a smaller $q_2$. If the resulting $\pi_2$ is below $F$, the entrant stays out.

Three outcomes are typical, in increasing order of $F$.

- **Blockaded entry.** Monopoly profit, even without any capacity distortion, is not enough to attract the entrant. The incumbent installs monopoly capacity and charges the monopoly price.
- **Deterred entry.** The incumbent over-installs capacity relative to monopoly, moving the post-entry equilibrium just far enough that $\pi_2 = F$. The incumbent then produces as a monopolist on the residual demand that the threatened entry would have left, which in the linear model is the Stackelberg quantity. Buyers get a lower price than under monopoly, even though entry does not occur.
- **Accommodated entry.** Deterrence is too expensive ( $F$ is small). The incumbent installs the capacity that will be used in the post-entry Stackelberg (or Cournot, if $K$ cannot be a commitment to more than the Cournot output) equilibrium, and entry occurs.

The taxonomy is Spence (1977) and Dixit (1980); Tirole (1988, Chapter 8) is the clean textbook statement. The welfare ranking is not uniform. Deterrence that replaces a high monopoly price with a lower limit output can raise surplus even though it wastes some capacity; deterrence that is achieved by a credible threat of a price war, with little pre-entry output expansion, is closer to a transfer of rents.

::: example A numerical deterrence threshold {#ex-dixit}
$p = 12 - Q$, $w = 1$, $r = 1$ so $c = 2$, $b = 1$. If the incumbent has installed $K \ge 5$ and entry occurs, the post-entry game is Stackelberg-like with the incumbent’s relevant MC equal to $w = 1$ on the relevant range. Use instead the simpler Cournot benchmark with *equal* costs $c=2$ (a conservative case: extra capacity does not cheapen production, it only commits to quantity). Cournot profits are $100/9$ each. For which $F$ is entry blockaded, deterred, or accommodated, if deterrence means installing the Stackelberg leader quantity $K = 5$ and earning the monopoly residual profit, versus accommodating at Cournot?
::: solution
Monopoly profit at $c=2$ is $25$, of which $rK^m = 1 \cdot 5 = 5$ is the capacity outlay if $K^m = q^m = 5$, leaving operating profit $20$ after capacity; the precise accounting depends on whether $r$ is already sunk. The useful comparison is *post-sunk-capacity* payoffs.

If the incumbent will play Cournot after entry, the entrant’s variable profit is $100/9 \approx 11.11$, so entry occurs iff $F < 100/9$. If the incumbent can commit to $q_1 = 5$, the entrant’s profit is the Stackelberg follower’s $6.25$, so entry occurs iff $F < 6.25$. For $F \in (6.25, 100/9)$ capacity commitment *changes* the entry decision: without it entry occurs, with it entry does not. That interval is the deterrence region in this arithmetic. For $F > 100/9$ entry is blockaded even at Cournot; for $F < 6.25$ entry occurs even at Stackelberg, and the incumbent may as well accommodate (and will then choose the capacity it actually uses).
:::
:::

::: warning Sunk versus fixed costs
A cost that is paid by incumbents and entrants alike, and that is not sunk (it can be recovered by exiting), does not deter in Dixit’s sense: it shifts both firms’ payoffs and does not change the incumbent’s future best response. A **sunk** cost, already paid by the incumbent and still to be paid by the entrant, is a commitment. Contestable-market theory, below, pushes the same distinction to its limit: if *nothing* is sunk, even a monopolist cannot earn a rent.
:::

## Limit pricing as a signal

The Bain–Sylos–Labini tradition took the incumbent’s pre-entry *price* as the commitment: the incumbent would maintain output after entry (the Sylos postulate), so a low pre-entry price, corresponding to a large output, left little residual demand. The postulate is not subgame perfect: once entry has occurred, the incumbent typically wants to shrink. A low price today is then cheap talk, unless it conveys information.

::: proposition Milgrom–Roberts limit pricing (informal) {#prop-mr}
Suppose the incumbent’s cost is private information, $c \in \{c_L, c_H\}$, the entrant has a prior $\mu = \Prob(c_L)$, and the entrant’s profit, if it enters, is positive against $c_H$ and negative against $c_L$. In a separating perfect Bayesian equilibrium, the low-cost incumbent chooses a pre-entry output *above* its one-shot monopoly output, so that the high-cost type would not want to mimic, and the entrant stays out after seeing that output. The high-cost type plays its monopoly output and faces entry. Assumptions: the single-crossing property that a low-cost type finds extra output cheaper; beliefs off path that put enough weight on $c_H$; two periods, with the second period a known-cost oligopoly or monopoly.
:::

The result, from Milgrom and Roberts (1982, *Econometrica*), is that limit pricing can be rational *without* the Sylos postulate, as a signal. It is not cheap: the low-cost incumbent distorts its pre-entry output, which is a social gain (more output) even as it deters a possibly efficient entrant (which can be a social loss). Whether the net effect is positive is a calibration, not a theorem. Pooling equilibria, in which both types price low and entry is deterred or not according to $\mu$, also exist for some priors; refinement criteria (intuitive criterion, divinity) tend to select separation in this game.

::: example A two-type numerical signal {#ex-signal}
The incumbent is a monopolist facing $p = 12 - q$. Cost is $c_L = 0$ or $c_H = 4$, each with prior $1/2$. Monopoly quantities are $q_L^m = 6$ and $q_H^m = 4$, profits $36$ and $16$. Suppose, for illustration, that if the entrant enters, the incumbent’s second-period payoff is $20$ if $c_L$ and $4$ if $c_H$, and the entrant’s payoff is $-3$ against $c_L$ and $+5$ against $c_H$. A one-shot (myopic) low-cost monopolist would produce 6. Show that producing $q = 8$ in period 1 can separate, by checking that $H$ would not give up its monopoly profit of 16 to mimic, while $L$ is willing to, if separation deters entry and pooling-on-monopoly would attract entry. Use a discount factor of 1 between the two periods.
::: solution
If $H$ plays $q_H^m = 4$, it earns $16$ plus, after being revealed and facing entry, $4$, total $20$. If it mimics $q = 8$, period-1 profit is $(12-8-4)\cdot 8 = 0$, plus, if it is believed to be $L$ and entry is deterred, a second-period monopoly $16$, total $16$. Mimicking is worse for $H$ than revealing ($20 > 16$).

If $L$ plays $q_L^m = 6$, and this does not separate (the myopic output is expected from $L$ but $H$ might also... in a putative separating equilibrium $H$ does not play 6), period-1 profit $36$. For separation at $8$: period-1 profit $(12-8-0)\cdot 8 = 32$, plus second-period monopoly $36$ if entry is deterred, total $68$. If $L$ instead played 6 and *entry occurred* (as it would if 6 were also in $H$’s support, or if the prior led to entry under pooling), it would earn $36+20 = 56$. The extra output costs $L$ only $4$ in period 1 and saves a $16$ second-period loss from entry. So $L$ is willing to produce 8 to separate, and $H$ is not. The numbers are illustrative — they show the single-crossing arithmetic, not an empirical claim.
:::
:::

## Predation and the chain-store problem

Predation is a price (or output, or advertising) response *after* entry, designed to cause the rival to exit or to deter later entrants. McGee (1958), looking at the Standard Oil cases, argued that predation is an expensive way to acquire a rival: buying the rival, or merging, is cheaper than selling below cost. That Chicago argument is a useful benchmark. It fails when capital-market imperfections make the rival more sensitive to losses than the incumbent (Telser 1966; Bolton and Scharfstein 1990), when the incumbent is fighting a *sequence* of potential entrants and wants a reputation for toughness (Kreps and Wilson 1982; Milgrom and Roberts 1982, *Journal of Economic Theory*), or when the post-exit market is more profitable than the accounting of a one-shot fight suggests.

Selten’s (1978) **chain-store paradox** is the reputation problem in reverse. A chain facing a finite sequence of potential entrants, with complete information, will accommodate the last one (fighting is then a dominated cost). By backward induction it accommodates all of them. Reputation models break the induction by adding a small probability that the chain is a “tough” type that actually likes to fight. Even a short finite horizon can then support fighting in the early periods, as the rational type mimics the tough type.

Competition-policy treatment of predation is taken up in [[industrial-organisation/competition-policy]]. The economic test that agencies use, in some form, is a price-cost test (Areeda and Turner 1975 proposed price below short-run marginal cost; later practice often uses average avoidable cost) plus a recoupment test (the Brooke Group standard in US law, 1993): a predatory sacrifice is not profitable unless the later recoupment, with the rival gone, is plausible. The two tests correspond to the two halves of the models in this section — the fight, and the prize.

## Contestable markets

Baumol, Panzar and Willig’s *Contestable Markets and the Theory of Industry Structure* (1982) asked what remains of monopoly power if entry and exit are free and there are no sunk costs. The polar case is a **perfectly contestable** market: an entrant can duplicate the incumbent’s technology, serve the whole market at a slightly lower price, and exit without loss if the incumbent responds. The only equilibrium prices then cover cost and are sustainable in the sense of Faulhaber (1975): no subset of products is priced so as to invite cream-skimming. For a single product, the contestable price is average-cost pricing, even if $N=1$.

The theory’s empirical reach is the extent of sunk costs. Airline routes were the motivating example (aircraft can be flown to another city), and they were also the example that critics used: once a schedule is advertised, gates are leased and reputation is local, hit-and-run entry is not free (see, among others, Schwartz 1986, *Journal of Economic Perspectives*). The lasting contribution is the comparative-static claim, which Dixit’s model already contains: the *sunk* part of entry costs, not the HHI, is the first thing to measure when asking whether an incumbent is constrained by potential competition.

::: application Cement, software, and a route
A cement kiln is a sunk cost; contestability is a poor description, Stackelberg–Dixit a better one, and the HHI of [[industrial-organisation/market-structure]] is informative. A piece of software with near-zero marginal cost and a large sunk development cost is not contestable in Baumol’s sense (the development cost is sunk) but may be contestable in a weaker sense if a rival has already sunk a similar cost. An airline route with leased gates and substitutable aircraft is closer to contestable than cement, and farther than the theory’s polar case. The three examples are the same taxonomy — how sunk is $F$? — applied to different technologies. They are not a ranking of which markets a government should restructure.
:::

## Where this leads

Collusion, the next chapter, is another dynamic constraint on oligopoly prices, this time among incumbents rather than between incumbents and entrants. The same discount factor that makes reputation for toughness valuable makes a cartel stable. Vertical contracts in [[industrial-organisation/vertical-relations]] can be a commitment device (exclusive dealing as a way to deny an entrant scale, in the spirit of Rasmusen, Ramseyer and Wiley 1991 and of the foreclosure models). Competition policy treats some of the conduct in this chapter — exclusive dealing, predation, some forms of capacity hoarding — as possible abuses of dominance; the models supply the theories of harm and the efficiencies, not the verdicts.

::: history
**1934, Heinrich von Stackelberg.** *Marktform und Gleichgewicht*: sequential quantity leadership.

**1956, Joe S. Bain; 1962, Paolo Sylos Labini.** Bain’s *Barriers to New Competition* and Sylos Labini’s *Oligopolio e progresso tecnico* give the output-maintenance postulate that later work replaced with subgame-perfect commitment.

**1978, Reinhard Selten.** “The chain store paradox”, *Theory and Decision* 9: backward induction undoes a reputation for fighting when information is complete and the horizon is finite.

**1980, Avinash Dixit.** “The role of investment in entry-deterrence”, *Economic Journal* 90: capacity as a commitment that shifts the incumbent’s best response.

**1982, William J. Baumol, John C. Panzar and Robert D. Willig.** *Contestable Markets and the Theory of Industry Structure*: potential competition with no sunk costs.

**1982, Paul Milgrom and John Roberts; David M. Kreps and Robert Wilson.** Limit pricing as a signal (*Econometrica* 50) and reputation for predation (*Journal of Economic Theory* 27; *Econometrica* 50).
:::

::: summary
- **Stackelberg**: the leader chooses quantity first. With linear demand and equal costs, $q_1 = (a-c)/(2b)$ (the monopoly quantity), $q_2 = (a-c)/(4b)$, $p = (a+3c)/4$. Buyers prefer Stackelberg to Cournot; the follower does not.
- Commitment is valuable when it makes the rival *softer* in the later game. With quantity competition (strategic substitutes) the valuable commitment is to be large (**top dog**). Capacity is the usual instrument (Dixit 1980).
- Entry is **blockaded**, **deterred** or **accommodated** as $F$ falls. Deterrence typically requires a sunk investment, not a fixed cost that both parties pay.
- **Limit pricing** is not subgame-perfect as a maintained-output postulate; it can be an equilibrium as a **signal** of low cost (Milgrom–Roberts).
- **Predation** needs a recoupment mechanism: reputation, finance, or a later monopoly. Selten’s chain-store paradox is the complete-information obstacle; incomplete information is the standard way around it.
- **Contestability** prices a market at average cost when nothing is sunk. Sunk costs, not the HHI, are the first measurement.
:::

## Exercises

::: exercise Stackelberg quantity {level=1 check="6"}
$p = 18 - Q$, $c = 6$. Compute the Stackelberg leader’s quantity. (Enter $q_1^S$.)
::: solution
$q_1^S = (18-6)/(2\cdot 1) = 6$. Then $q_2^S = 3$, $p^S = 9$, $\pi_1 = 18$, $\pi_2 = 9$. Monopoly would also have $q^m = 6$ but $p^m = 12$.
:::
:::

::: exercise Stackelberg price {level=1 check="9"}
In the previous exercise, compute $p^S$. (Enter the price.)
::: solution
$p^S = (18 + 3\cdot 6)/4 = 36/4 = 9$. Check: $Q^S = 9$, $18-9 = 9$.
:::
:::

::: exercise Follower best response {level=1 check="2"}
$p = 12 - Q$, $c = 2$. The leader has already produced $q_1 = 6$. What is the follower’s best-response quantity? (Enter $q_2$.)
::: solution
$q_2 = (12-2)/2 - 6/2 = 5 - 3 = 2$. Price $12-8 = 4$, follower profit $4$. (The leader over-produced relative to Stackelberg’s $5$; the follower shrinks from $2.5$ to $2$.)
:::
:::

::: exercise Compare three outcomes {level=2}
For $p = 12-Q$, $c=2$, compute total surplus under monopoly, Cournot duopoly, Stackelberg and competition. Rank them.
::: solution
Total surplus $\mathrm{TS}(Q) = 10Q - Q^2/2$, for $Q \le 10$. Monopoly $Q=5$, $\mathrm{TS}=50-12.5=37.5$. Cournot $Q=20/3$, $\mathrm{TS}=200/3 - 200/9 = 400/9 \approx 44.44$. Stackelberg $Q=7.5$, $\mathrm{TS}=75 - 28.125 = 46.875$. Competition $Q=10$, $\mathrm{TS}=50$. Ranking: competition $>$ Stackelberg $>$ Cournot $>$ monopoly. The ranking of $Q$ is the ranking of $\mathrm{TS}$ on this range.
:::
:::

::: exercise Deterrence region {level=2}
Using the arithmetic of [[#ex-dixit]] (Cournot follower profit $100/9$, Stackelberg follower profit $6.25$), for which interval of $F$ does the ability to commit to $q_1=5$ *change* the entry decision?
::: solution
Without commitment, entry iff $F < 100/9 \approx 11.11$. With commitment to 5, entry iff $F < 6.25$. The decisions differ on $F \in (6.25, 100/9)$: commitment deters entry that would otherwise have occurred. Outside that interval commitment does not change the entry outcome (it may still change post-entry quantities if entry happens).
:::
:::

::: exercise Isoprofit argument {level=2}
In the linear Cournot best-response diagram, the Stackelberg leader’s quantity maximises profit on the follower’s best-response line. Using the residual demand $p = (a+c)/2 - (b/2)q_1$ derived in the proof of [[#prop-stackelberg]], confirm the first-order condition $q_1 = (a-c)/(2b)$ by differentiating $\pi_1(q_1) = \bigl((a+c)/2 - (b/2)q_1 - c\bigr) q_1$.
::: solution
$\pi_1 = \bigl((a-c)/2 - (b/2)q_1\bigr) q_1 = (a-c)q_1/2 - (b/2) q_1^2$. Derivative $(a-c)/2 - b q_1$. Zero at $q_1 = (a-c)/(2b)$. Second derivative $-b < 0$. This is the same algebra as a monopolist facing twice as steep a demand (slope $b/2$ rather than $b$), which is why the leader’s quantity equals $q^m$.
:::
:::

::: exercise Puppy-dog versus top-dog {level=3}
Consider a differentiated Bertrand duopoly, $q_i = \alpha - \beta p_i + \gamma p_j$, as in [[industrial-organisation/cournot-bertrand#prop-diff-bertrand]], with $\beta > \gamma > 0$. Suppose the “leader” can, in a first stage, commit to a *higher* marginal cost (a “fat-cat” or “puppy-dog” investment that makes it a softer price competitor). Using the fact that prices are strategic complements, argue in two paragraphs whether the leader wants to raise or lower its future cost if the aim is (a) to accommodate a rival already in the market, (b) to deter a rival whose entry profit is increasing in the incumbent’s post-entry aggressiveness. Refer to Fudenberg and Tirole (1984) by the names of the strategies.
::: hint
A higher own cost shifts one’s Bertrand best response up (one charges more). The rival then charges more too. That raises the rival’s profit, which is bad for deterrence and can be good for accommodation.
:::
::: solution
(a) Accommodation, strategic complements: the incumbent wants the rival *soft*. Raising own future cost commits the incumbent to a higher price, the rival’s best response is a higher price, both mark-ups rise. That is Fudenberg and Tirole’s **fat cat** (or, if the investment also makes the incumbent small, **puppy dog**): look inoffensive so that the rival does not cut price. The contrast with Stackelberg quantity competition is complete: there the incumbent wanted to look large (**top dog**).

(b) Deterrence: the incumbent wants the rival’s post-entry profit *low*. The same cost-raising commitment raises the rival’s profit (the rival enjoys the softer incumbent), which makes deterrence *harder*. Deterrence under price competition instead wants a **lean and hungry look** (invest to lower future cost, commit to an aggressive price, make entry unprofitable). Whether a given investment (capacity, R&D, advertising) is a top dog or a puppy dog is then a question about the later game — substitutes or complements — not about the investment’s engineering.
:::
:::

::: exercise Contestability and a sunk fraction {level=3}
A monopolist faces $p = a - bq$ and cost $C(q) = F + cq$ if it produces, with $F$ sunk *after* entry but before production. An entrant has the same cost function. (a) If $F$ is fully sunk and hit-and-run is impossible, what does the incumbent charge? (b) If $F$ is not sunk at all (aircraft that can be redeployed at once), what does contestability predict? (c) If a fraction $\sigma \in [0,1]$ of $F$ is sunk, give a verbal description of the two polar cases as $\sigma \to 1$ and $\sigma \to 0$, and explain why a small $\sigma$ is not the same as a small $F$ in Dixit’s model.
::: hint
Dixit’s $F$ is paid by the *entrant* and is sunk for the *incumbent already*. Contestability’s $F$ is paid by whoever is in, and recoverability is the issue.
:::
::: solution
(a) The incumbent, $F$ already sunk, maximises $(a-bq-c)q$ and charges $p^m = (a+c)/2$. Potential entry does not constrain the price, because the entrant would have to sink $F$ and then compete, typically in a Bertrand or Cournot game whose variable profit may or may not cover $F$; even if it would, the incumbent does not lower price *ex ante* unless there is a signalling or commitment reason.

(b) Contestability: the incumbent must set $p$ at average cost on the demand curve, the Ramsey-like point where $p = c + F/q$ meets $p = a-bq$, otherwise an entrant undercuts, serves the market, and leaves. The incumbent earns zero economic profit despite $N=1$.

(c) As $\sigma \to 1$ we are in (a); as $\sigma \to 0$ we are in (b). A small $\sigma$ means *recoverability*, not a small entry fee. In Dixit, a small $F$ means accommodated entry (the rival comes in and stays); in contestability, a small $\sigma$ means the rival *need not stay* and the incumbent’s price is disciplined without entry actually occurring. Hit-and-run is a different constraint from entry-and-stay.
:::
:::
