Two cement firms that would, in a one-shot Bertrand game, price at cost can, if they meet every week for the foreseeable future, price at the monopoly level — provided each is patient enough, and provided a deviation is detected and punished. That sentence is the theory of **collusion**. This chapter writes it as an infinitely repeated game, computes the critical discount factor for grim-trigger strategies in Bertrand and Cournot, and then asks what makes the inequality easier or harder to satisfy: the number of firms, capacity, demand shocks, multi-market contact, and the observability of prices. Detection by agencies, leniency programmes, and the empirical markers of cartels occupy the last sections.

A legal distinction first, because it is not an economic one. **Explicit collusion** is an agreement — a meeting, a message, a written quota. **Tacit collusion** (or conscious parallelism) is an equilibrium of the repeated game with no communication. The incentive constraint derived below is the same object in both cases. What communication does is help with equilibrium *selection* (which price, which allocation of quantities, how to interpret a shock) and with the coordination of a punishment. Competition statutes typically prohibit the agreement, not the parallel prices as such; [[industrial-organisation/competition-policy]] returns to that line. Here we study the incentive constraint.

The stage games are those of [[industrial-organisation/cournot-bertrand]]. The repeated-game tool is [[game-theory/repeated-games]]. Profit is $\pi$; the discount factor $\beta$ of the atlas’s macro notation is written $\delta$ in this chapter, as is standard in IO, with $0 < \delta < 1$ the weight on next period’s profit.

## The incentive constraint

::: definition Infinitely repeated oligopoly {#def-repeated}
$N$ firms play a stage game $G$ (Bertrand or Cournot, homogeneous or differentiated) in each period $t = 0, 1, 2, \dots$. Firm $i$’s payoff is $\sum_{t=0}^\infty \delta^t \pi_i(a_t)$, where $a_t$ is the action profile in period $t$ and $\delta \in (0,1)$ is a common discount factor. Histories are observed according to a specified information structure (perfect monitoring unless stated otherwise). A **collusive strategy profile** is a subgame-perfect equilibrium in which, on the equilibrium path, the stage-game actions are more profitable for each firm than a static Nash equilibrium of $G$.
:::

The workhorse profile is **grim trigger**: play a collusive action (the monopoly price, or a share of the monopoly quantity) as long as everyone has done so; following any deviation, play a static Nash equilibrium of $G$ forever.

::: proposition Grim-trigger incentive constraint {#prop-grim}
Let $\pi^c$ be a firm’s per-period profit on the collusive path, $\pi^d$ the one-shot profit from a best deviation given that the others play the collusive action, and $\pi^n$ the static Nash profit used as punishment, with $\pi^d > \pi^c > \pi^n$. Grim trigger is a subgame-perfect equilibrium if and only if
$$
\delta \ge \delta^* := \frac{\pi^d - \pi^c}{\pi^d - \pi^n}.
$$ {#eq-delta}
The constraint is easier to satisfy ( $\delta^*$ is smaller) when the deviation gain $\pi^d - \pi^c$ is smaller or the punishment $\pi^c - \pi^n$ is larger. After a deviation, reversion to Nash is itself a subgame-perfect continuation because Nash is an equilibrium of $G$.
:::

::: proof
On path, the present value is $\pi^c /(1-\delta)$. A one-shot deviation yields $\pi^d$ today and $\pi^n$ thereafter, present value $\pi^d + \delta \pi^n/(1-\delta)$. The inequality $\pi^c /(1-\delta) \ge \pi^d + \delta \pi^n/(1-\delta)$ rearranges to $\pi^c \ge (1-\delta)\pi^d + \delta \pi^n$, then to $\delta(\pi^d - \pi^n) \ge \pi^d - \pi^c$, which is [[#eq-delta]]. The one-shot deviation principle for discounted infinite-horizon games with perfect monitoring (see [[game-theory/repeated-games]]) makes it sufficient to check this single deviation. Nash reversion is a Nash equilibrium of the continuation game by construction.
:::

Folk theorems (Friedman 1971 for Nash reversion; Fudenberg and Maskin 1986 for a broader set) say that if $\delta$ is close enough to 1, *any* feasible and individually rational payoff vector can be supported. The grim-trigger formula is the constructive, computable special case that IO uses.

::: widget plot
f: 1 - 1/x; (x+1)^2 / ((x+1)^2 + 4*x)
x: 2, 12
y: 0, 1
labels: \text{Bertrand } \delta^{\ast}=1-1/N; \text{Cournot } \delta^{\ast}=(N+1)^{2}/((N+1)^{2}+4N)
caption: Critical discount factors under grim trigger, against the number of firms $N$. Bertrand (homogeneous, Nash at cost) is the upper curve for these $N$: a deviant steals the whole pie. Cournot (linear demand) is lower, because a deviant cannot steal everything and the Nash punishment is milder. Both rise in $N$. At $N=2$ the two values are $1/2$ and $9/17 \approx 0.53$, almost the same.
:::

The widget is a calculator. The next two sections feed it numbers from Bertrand and Cournot.

## Bertrand and Cournot numbers

::: proposition Critical discount factors in linear oligopoly {#prop-deltas}
(1) **Homogeneous Bertrand**, $N$ firms, equal constant cost $c$, monopoly profit $\pi^m$ (the industry profit of [[industrial-organisation/monopoly-pricing#prop-mr-mc]]). Collusion on the monopoly price with equal shares, Nash reversion to $p=c$. Then $\pi^c = \pi^m/N$, $\pi^d = \pi^m$ (undercut and take the market), $\pi^n = 0$, and
$$
\delta^*_B = 1 - \frac{1}{N}.
$$ {#eq-delta-b}
(2) **Symmetric Cournot**, linear demand $p=a-bQ$, equal cost $c$, collusion on equal shares of the monopoly quantity, Nash reversion to Cournot. Then
$$
\delta^*_C = \frac{(N+1)^2}{(N+1)^2 + 4N}.
$$ {#eq-delta-c}
For $N=2$, $\delta^*_B = 1/2$ and $\delta^*_C = 9/17$. Both $\delta^*$ increase in $N$: more firms make collusion harder under grim trigger.
:::

::: proof
(1) is [[#eq-delta]] with the three profits stated. (2): monopoly quantity $q^m = (a-c)/(2b)$, each collusive output $q^m/N$, collusive price $(a+c)/2$, so $\pi^c = (a-c)^2/(4b N)$. A deviant’s best response to the others’ $(N-1)q^m/N$ is the Cournot best response $q^d = (a-c)/(2b) - (N-1)q^m/(2N) = (a-c)(N+1)/(4b N)$, and $\pi^d = (a-c)^2 (N+1)^2 / (16 b N^2)$. Nash profit $\pi^n = (a-c)^2 /(b(N+1)^2)$. Substituting into [[#eq-delta]] and cancelling $(a-c)^2/b$ produces [[#eq-delta-c]]. At $N=2$: $\delta^*_C = 9/(9+8) = 9/17$. Both formulae increase in $N$ (for (2), divide numerator and denominator by $(N+1)^2$ and inspect).
:::

::: example Water cartel, Bertrand and Cournot {#ex-water-cartel}
$p = 12 - Q$, $c = 2$, $N = 2$. Compute $\pi^m$, the three profits and $\delta^*$ under Bertrand grim trigger and under Cournot grim trigger. Confirm $\delta^*_C = 9/17$.
::: solution
$\pi^m = 25$. **Bertrand:** $\pi^c = 12.5$, $\pi^d = 25$, $\pi^n = 0$, $\delta^*_B = (25-12.5)/25 = 1/2$. **Cournot:** collusive each $q=2.5$, $p=7$, $\pi^c = 12.5$. Deviation: $q^d = 5 - 2.5/2 = 3.75$, $Q = 6.25$, $p = 5.75$, $\pi^d = 3.75^2 = 14.0625 = 225/16$. Nash $\pi^n = 100/9$. Then
$$
\delta^*_C = \frac{225/16 - 25/2}{225/16 - 100/9} = \frac{25/16}{425/144} = \frac{25}{16}\cdot\frac{144}{425} = \frac{9}{17}.
$$
Cournot collusion is sustainable at a slightly higher $\delta$ than Bertrand collusion in this $N=2$ comparison ($9/17 \approx 0.529 > 0.5$), because the deviation gain is smaller (quantities adjust less discontinuously) but the Nash punishment is milder (Cournot profits are positive). The two effects nearly cancel at $N=2$; at larger $N$, Bertrand’s $\delta^*_B = 1-1/N$ rises faster at first, then Cournot’s formula catches the intuition that a many-firm Cournot deviation is also very profitable.
:::
:::

::: warning Collusion is not “high concentration”
[[#eq-delta-b]] and [[#eq-delta-c]] both say that *more* firms make grim-trigger collusion harder, which is the concentration intuition. They do not say that a high HHI is collusion. Differentiated products, which raise the HHI’s welfare meaning in [[industrial-organisation/product-differentiation]], typically *lower* $\pi^d - \pi^c$ (a price cut steals less) and can also lower $\pi^c - \pi^n$ (Nash is already collusive-looking). The net effect of differentiation on $\delta^*$ is a calibration, not a theorem (Deneckere 1983; Ross 1992). Treating every concentrated market as a cartel is the SCP error of [[industrial-organisation/market-structure]] in a new suit.
:::

::: quiz
Four identical Bertrand firms collude on the monopoly price and punish with $p=c$. The critical discount factor is
- [ ] $1/4$
- [ ] $1/2$
- [x] $3/4$
- [ ] $1$
::: solution
[[#eq-delta-b]] with $N=4$ is $1-1/4 = 3/4$. Each firm’s collusive share is too small, relative to the whole monopoly pie a deviant can steal, to be protected by anything less than a very patient future.
:::
:::

## What makes cartels stable

The formula [[#eq-delta]] organises a list that goes back to Stigler (1964, *Journal of Political Economy*).

**Number and symmetry.** $\delta^*$ rises in $N$. Asymmetry (different costs, different capacities) typically raises $\delta^*$ further, because the efficient collusive allocation gives more output to the low-cost firm, which the high-cost firm must be compensated for, and because a low-cost deviant has a larger $\pi^d$. Compensating transfers, if they are feasible, restore some of the lost ground; they also produce the paper trail that agencies look for.

**Capacity.** A firm that cannot serve the whole market cannot take $\pi^d = \pi^m$. Tighter capacity *lowers* $\delta^*$ in Bertrand (Brock and Scheinkman 1985). Excess capacity, the reverse, is a two-edged sword: it makes deviations more tempting and punishments more severe.

**Demand shocks.** Rotemberg and Saloner (1986, *American Economic Review*) study i.i.d. demand. In a boom, $\pi^d - \pi^c$ is large today while the punishment is the *average* future, so $\delta^*$ is harder to meet: collusion is **countercyclical** in their model (prices are lower, relative to the monopoly price, in booms). Green and Porter (1984, *Econometrica*) study unobservable demand with observable own sales. A demand slump looks like a deviation; the equilibrium uses periodic, on-path price wars as an incentive device. The two models distinguish **price wars as breakdowns** from **price wars as punishments**, and they have different implications for the correlation of price with demand.

**Observability.** Perfect monitoring was assumed above. If prices are secret (a buyer-specific discount), Abreu, Pearce and Stacchetti (1986) and the Green–Porter line apply: punishments are triggered by noisy signals, and they must occasionally be used on path. Transparency — posted prices, trade associations’ statistics, most-favoured-customer clauses — can help collusion by improving monitoring, which is why some of those practices appear in agency guidelines as plus factors.

**Multi-market contact.** Bernheim and Whinston (1990, *RAND Journal of Economics*) show that firms meeting in several markets can pool the incentive constraints: slack in a market where $\delta > \delta^*$ can be used to support collusion in a market where $\delta < \delta^*$ taken alone. The famous “spheres of influence” of the shipping conferences are the historical illustration.

**Leniency.** A competition-authority programme that grants the first firm to report a cartel immunity from fines changes $\pi^n$ and the off-path payoffs. Motta and Polo (2003, *Journal of Industrial Economics*) and Harrington (2008, *Handbook of Antitrust Economics*) survey the theory: leniency can destabilise an existing cartel (the race to report) and, for some parameter values, can make collusion *more* attractive ex ante by lowering expected fines if the cartel is going to be detected anyway. The design question is the reduction in fines for the first reporter versus the expected fine if nobody reports.

::: example Three-firm Bertrand and a leniency prize {#ex-leniency}
Three Bertrand firms, $\pi^m = 90$, grim trigger, $\delta = 0.6$. Without leniency, is collusion on equal shares sustainable? Suppose a leniency programme pays the first deviant a reduced fine, modelled as an extra $10$ of payoff in the deviation period only (a reduced expected fine). What happens to $\delta^*$?
::: solution
Without leniency, $\pi^c = 30$, $\pi^d = 90$, $\pi^n = 0$, $\delta^* = 60/90 = 2/3 > 0.6$. Collusion is *not* sustainable. With the extra $10$, $\pi^d = 100$, $\delta^* = 70/100 = 0.7$, which is even larger: the programme, modelled this way, makes collusion *harder* (the deviation is more attractive). That is the destabilising effect. (A model in which the programme also lowers $\pi^c$ by a fine that lands on the cartel with some probability, whether or not anyone defects, would move $\delta^*$ in the other direction. Both channels are in Motta–Polo; the exercise isolates one.)
:::
:::

## Detection and stylised facts

Agencies and empirical researchers look for **markers**: a high price with a low variance, a sudden drop when a maverick enters or a leniency application arrives, identical sealed bids, market-share stability, and communication in the discovery record. Harrington (2008) and the OECD’s roundtables on cartels (various years; the 2013 *Ex Officio Cartel Investigations* paper is a dated survey of methods) catalogue these. None is a theorem. A low price variance is also a competitive prediction in a stable-cost industry; a high price is also a differentiated-Bertrand prediction.

What is a stylised fact, with sources:

- **Cartels exist and die.** Levenstein and Suslow (2006, *Journal of Economic Literature*) survey historical cartels and report a median duration on the order of five to eight years, with a long right tail; death comes from cheating, entry, and prosecution, in proportions that vary by sample. Connor’s private-international-cartel database (various vintages; e.g. Connor 2014 working paper) compiles overcharge estimates whose *mean* is well above the *median*, a reminder that the typical detected cartel is not the typical cartel.
- **Overcharges are positive in detected cases, and the distribution is wide.** Boyer and Kotchoni (2015, *Review of Industrial Organization*) re-estimate Connor’s sample and obtain a median overcharge around 16 per cent once selection and biases are addressed, against Connor’s higher mean. The number is a property of *detected* cartels; it is not a multiplier to be applied to every oligopoly.
- **Leniency changed the flow of cases.** The US Department of Justice revised its corporate leniency policy in 1993; the European Commission’s 1996 notice (revised 2002, 2006) and many other jurisdictions followed. The share of cartel decisions that originate in a leniency application is high in those jurisdictions in the 2000s and 2010s (Commission annual reports on competition policy, various years). Whether the underlying *rate* of cartel formation fell is a different, harder, question (Miller 2009, *American Economic Review*, on the US revision, finds a pattern consistent with both more detection and more deterrence).

::: quiz
In Rotemberg and Saloner (1986), i.i.d. demand booms make collusion
- [ ] easier, because the pie is larger
- [x] harder, because the one-shot deviation gain is larger relative to the (average) future punishment
- [ ] unchanged, because $\delta$ has not changed
- [ ] easier in Bertrand and harder in Cournot
::: solution
The boom raises $\pi^d - \pi^c$ today; the punishment is the expected future, which does not move one-for-one with today’s shock. Hence $\delta^*$ rises in booms and the sustainable collusive price is lower, relative to monopoly, in high-demand periods. The pie being larger is why the deviation is tempting.
:::
:::

## Where this leads

Vertical relations can help or hinder collusion: resale-price maintenance can make retail prices more transparent (and so help monitoring) or can be a response to free-riding that has nothing to do with a cartel. Platforms and networks, in the next-but-one chapter, change the monitoring technology again (posted digital prices are very transparent; personalised discounts are not). Competition policy’s cartel chapter is the enforcement counterpart of [[#eq-delta]]: fines raise $\pi^n$’s opportunity cost, leniency raises $\pi^d$ for the reporter, and dawn raids improve monitoring *by the agency*, which is not the same as monitoring by the cartel.

::: history
**1964, George J. Stigler.** “A theory of oligopoly”, *Journal of Political Economy* 72: the detection of secret price cutting as the binding constraint on collusion, and the list of structural factors still in use.

**1971, James W. Friedman.** “A non-cooperative equilibrium for supergames”, *Review of Economic Studies* 38: Nash reversion as a subgame-perfect construction, the ancestor of [[#eq-delta]].

**1984, Edward J. Green and Robert H. Porter.** “Noncooperative collusion under imperfect price information”, *Econometrica* 52: on-path price wars as an incentive device when demand is unobserved.

**1986, Julio J. Rotemberg and Garth Saloner.** “A supergame-theoretic model of price wars during booms”, *American Economic Review* 76: countercyclical collusion under i.i.d. demand.

**1990, B. Douglas Bernheim and Michael D. Whinston.** “Multimarket contact and collusive behavior”, *RAND Journal of Economics* 21: pooling incentive constraints across markets.

**1993, US Department of Justice.** Revision of the corporate leniency policy, the starting date for the modern wave of leniency-based cartel detection in the United States.
:::

::: summary
- Collusion, tacit or explicit, is a repeated-game equilibrium in which on-path profits exceed static Nash. The legal object is typically the agreement; the economic object is [[#eq-delta]].
- Grim trigger is sustainable iff $\delta \ge (\pi^d-\pi^c)/(\pi^d-\pi^n)$. Bertrand with $N$ equal firms: $\delta^* = 1-1/N$. Linear Cournot: $\delta^* = (N+1)^2/((N+1)^2+4N)$. Both rise in $N$.
- Stability is helped by few firms, symmetry, tight capacity (in Bertrand), multi-market contact, and transparent prices; it is hurt by secret discounts, booms (Rotemberg–Saloner), and a well-designed leniency programme.
- Green–Porter price wars occur *on path* as punishments under imperfect monitoring; they are not evidence that collusion has collapsed.
- Detected cartels last a few years on average (Levenstein–Suslow) and overcharge by a median amount on the order of 10–20 per cent in re-estimated samples (Boyer–Kotchoni), with wide dispersion. Those are facts about detected cases.
:::

## Exercises

::: exercise Two-firm Bertrand delta {level=1 check="0.5"}
Two homogeneous Bertrand firms, grim trigger, monopoly split, Nash at $p=c$. Compute $\delta^*$. (Enter $\delta^*$ as a decimal.)
::: solution
$\delta^* = 1 - 1/2 = 0.5$.
:::
:::

::: exercise Five-firm Bertrand delta {level=1 check="0.8"}
The same, with $N = 5$. Compute $\delta^*$. (Enter $\delta^*$ as a decimal.)
::: solution
$\delta^* = 1 - 1/5 = 0.8$. Five firms that undercut to steal the whole pie need a very valuable future to resist.
:::
:::

::: exercise Cournot duopoly delta {level=1 check="0.529"}
Report $\delta^*_C$ for $N=2$ linear Cournot to three decimals. (Enter $9/17$ rounded to three decimals.)
::: solution
$9/17 \approx 0.529411$, which to three decimals is $0.529$.
:::
:::

::: exercise A grim-trigger check {level=2}
A duopoly has $\pi^c = 8$, $\pi^d = 12$, $\pi^n = 2$, $\delta = 0.6$. Is grim trigger a SPE? What is the smallest $\delta$ that works?
::: solution
$\delta^* = (12-8)/(12-2) = 4/10 = 0.4$. Since $0.6 > 0.4$, yes. The smallest $\delta$ is $0.4$. Present-value check: on path $8/0.4 = 20$; deviation $12 + 0.6\cdot 2/0.4 = 12 + 3 = 15 < 20$.
:::
:::

::: exercise Cournot formula at N=3 {level=2}
Using [[#eq-delta-c]], compute $\delta^*_C$ for three symmetric linear Cournot firms. Compare with $\delta^*_B$ for three Bertrand firms.
::: solution
$\delta^*_C = 16/(16+12) = 16/28 = 4/7 \approx 0.571$. $\delta^*_B = 1-1/3 = 2/3 \approx 0.667$. Three-firm Cournot collusion is sustainable at a lower $\delta$ than three-firm Bertrand collusion, because a Cournot deviant cannot steal the whole market.
:::
:::

::: exercise Capacity and deviation {level=2}
Two Bertrand firms, $\pi^m = 40$ if a single firm serves the whole market at the monopoly price. Each firm has capacity equal to 60 per cent of the monopoly quantity, so a deviant can serve only 60 per cent of monopoly output (and the loyal firm still sells its capacity at the collusive price... use instead the simpler bound: the deviant’s one-shot profit cannot exceed $0.6 \times 40 = 24$, collusive profit is $20$ each if they split the market within capacity, Nash profit is $0$ if residual Bertrand on residual demand is fierce). Compute the corresponding $\delta^*$ and compare with the unconstrained $1/2$.
::: solution
$\pi^c = 20$, $\pi^d = 24$, $\pi^n = 0$, $\delta^* = 4/24 = 1/6 < 1/2$. Tighter capacity makes the deviation less profitable and grim trigger easier. (The Nash-profit $0$ is a simplification; if capacity constraints also soften the punishment, $\pi^n$ rises and the comparison is ambiguous. Brock–Scheinkman 1985 is the careful treatment.)
:::
:::

::: exercise Green–Porter versus Rotemberg–Saloner {level=3}
A researcher observes that in a two-firm industry, prices fall in recessions and rise in booms, tracking a cost index. Another researcher observes that in a different two-firm industry, prices undergo occasional sharp, short wars that are *not* coincident with demand slumps, after which the high price is restored. Which observation is more nearly a Green–Porter marker, which a competitive marker, and which (if either) a Rotemberg–Saloner marker? Write a reasoned paragraph, not a slogan.
::: hint
Rotemberg–Saloner: wars (or softer collusion) in *booms*. Green–Porter: wars triggered by low *observed sales*, which may be demand. Cost-tracking prices are the competitive benchmark.
:::
::: solution
Cost-tracking prices, rising in booms and falling in recessions, are what a competitive (or a static Cournot) industry with procyclical demand and stable mark-ups would produce; they are not a collusion marker by themselves. Rotemberg–Saloner predict that the *collusive* price is *lower relative to monopoly* in booms — a countercyclical *mark-up*, not a countercyclical price level. A sharp, short war not coincident with a slump, after which the high price returns, is closer to an on-path Green–Porter punishment (or to a renegotiation after a detected cheat) than to Rotemberg–Saloner, who time their softness with demand. None of the three observations *proves* collusion; the Green–Porter-like pattern is the one that is hard to produce from a static competitive model with observed costs and demand.
:::
:::

::: exercise Optimal collusive price below monopoly {level=3}
Suppose $\delta$ is too low to support the monopoly price in homogeneous Bertrand duopoly (so $\delta < 1/2$), but grim trigger can support *some* price $p \in (c, p^m)$. Let $\pi(p)$ be industry profit at a common price $p$, split in half on path; a deviant undercuts and takes $\pi(p)$; Nash profit is 0. (a) Write $\delta^*(p)$. (b) Show that $\delta^*(p)$ is *independent* of $p$ in this specification. (c) What does that imply for the set of sustainable prices when $\delta < 1/2$? (d) Which modelling ingredient, if added, would make the highest sustainable price strictly increasing in $\delta$?
::: hint
The independence in (b) is the knife-edge of homogeneous Bertrand with all-or-nothing demand. Product differentiation or a convex cost of serving extra demand breaks it.
:::
::: solution
(a) $\pi^c = \pi(p)/2$, $\pi^d = \pi(p)$, $\pi^n = 0$, so $\delta^*(p) = 1/2$ for every $p$ with $\pi(p) > 0$.

(b) The $p$ in the numerator and denominator cancels. Homogeneous Bertrand deviations steal the *whole* profit at that price, so the ratio is always one half.

(c) If $\delta < 1/2$, *no* $p > c$ is sustainable by this grim trigger; if $\delta \ge 1/2$, *every* $p \in [c, p^m]$ is. There is no “partial collusion” in this knife-edge model.

(d) Differentiated demand (a deviant takes only part of the market, and $\pi^d/\pi^c$ falls as $p$ falls toward Nash) or increasing marginal cost (the deviant cannot serve the whole market at a constant margin) makes $\delta^*(p)$ increasing in $p$. Then there is a highest sustainable price $p(\delta)$, rising in $\delta$, which is the object Rotemberg–Saloner and most applied work use.
:::
:::
