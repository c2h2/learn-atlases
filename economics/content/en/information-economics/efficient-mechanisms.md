The last chapter ended with a preview: a public project, a pivot tax, and a reporter who could not gain by lying. This chapter makes that construction general. **Vickrey–Clarke–Groves** (VCG) mechanisms implement efficient social choice in dominant strategies when payoffs are quasi-linear in money. They do it by charging each person the externality she imposes on the others. The bill does not, in general, add up to the cost of the project: **budget balance** fails. **Myerson–Satterthwaite** says that, in a bilateral trade problem with overlapping values, no mechanism is efficient, Bayesian incentive-compatible, interim individually rational and budget-balanced at once. Efficiency among privately informed people is a theorem with assumptions, not a default.

The language is that of [[information-economics/mechanism-design]]: types $\theta_i$, social choice $f$, transfers $t_i$, dominant-strategy IC (DSIC) and Bayesian IC (BIC). Auctions in [[market-design/auction-formats]] are the leading special case: Vickrey's second-price auction *is* VCG for one object. This chapter treats public decisions and bilateral trade, where the same algebra has a different political life.

Quasi-linear payoff: $u_i = v_i(x, \theta_i) - t_i$. Money is the numeraire; there are no wealth effects. That is the maintained assumption that makes Groves work.

## Groves and Vickrey–Clarke–Groves

::: definition Groves mechanism {#def-groves}
A **Groves mechanism** chooses an efficient allocation
$$
x^*(\theta) \in \arg\max_x \sum_{i=1}^n v_i(x, \theta_i)
$$
and charges
$$
t_i(\theta) = h_i(\theta_{-i}) - \sum_{j \ne i} v_j\bigl(x^*(\theta), \theta_j\bigr),
$$ {#eq-groves}
where $h_i$ does not depend on $\theta_i$. The **Clarke (pivot)** rule is the Groves mechanism with
$$
h_i(\theta_{-i}) = \sum_{j \ne i} v_j\bigl(x^*_{-i}(\theta_{-i}), \theta_j\bigr),
$$
so that $i$ pays the damage she does to the others by being present — her **externality**. VCG is Groves plus Clarke's $h_i$, applied to the efficient rule.
:::

::: proposition Groves is DSIC {#prop-groves}
Under quasi-linear utility, every Groves mechanism is dominant-strategy incentive-compatible: truthful report is weakly dominant. The efficient allocation $x^*$ is implemented in dominant strategies. Assumptions: quasi-linearity, a well-defined maximiser $x^*$, unrestricted type reports, no collusion.
:::

::: proof
Agent $i$'s payoff from reporting $\hat\theta_i$, given $\theta_{-i}$, is
$$
v_i\bigl(x^*(\hat\theta_i,\theta_{-i}), \theta_i\bigr) + \sum_{j\ne i} v_j\bigl(x^*(\hat\theta_i,\theta_{-i}), \theta_j\bigr) - h_i(\theta_{-i}).
$$
The last term does not depend on her report. The first two terms are the social surplus of $x^*(\hat\theta_i,\theta_{-i})$ *as evaluated at the true $\theta_i$ and the others' true types*. That surplus is maximised, over reports, by choosing the report that makes $x^*$ the true maximiser of $\sum_k v_k(\cdot,\theta_k)$, i.e. by reporting $\theta_i$. Hence DSIC. Efficiency is by construction of $x^*$.
:::

The pivot rule has a further property: $t_i \ge 0$ in the usual sign convention where $t_i$ is a payment *by* $i$ (she pays only when she is pivotal), and agents who do not change the decision pay nothing. In a public-good setting with cost $C$, the efficient rule is $q=1$ iff $\sum_i \theta_i \ge C$. Agent $i$ is pivotal if the project is built and $\sum_{j\ne i}\theta_j < C$, and then she pays $C - \sum_{j\ne i}\theta_j$.

::: example Three agents, one project {#ex-pivot}
Cost $C = 16$. Values $\theta = (10, 8, 5)$. Is the project built? Who is pivotal, and what does each pay under Clarke? What is the budget surplus $\sum t_i - C$?
::: solution
Sum $= 23 \ge 16$, so $q=1$. Without agent 1: $8+5=13<16$, agent 1 is pivotal and pays $16-13=3$. Without agent 2: $10+5=15<16$, agent 2 pays $1$. Without agent 3: $10+8=18\ge 16$, agent 3 is not pivotal and pays $0$. Transfers sum to $4$. The project costs $16$, so the budget is $4-16 = -12$: a **deficit** of $12$. Efficiency and DSIC are achieved; the cost is not covered by pivot taxes.
:::
:::

::: widget plot
f: 16-x; 0*x
x: 0, 20
y: -2, 18
labels: \text{pivot payment } C-\theta_{-i}\text{ if pivotal}; \text{zero}
caption: Clarke payment as a function of others' reported value $\theta_{-i}$, for $C=16$. If $\theta_{-i} \ge 16$, the agent is not pivotal and pays $0$. If $\theta_{-i} < 16$ and her own report makes the project go ahead, she pays $16-\theta_{-i}$. Her own report does not appear on the payment (conditional on the decision), which is why truth-telling is dominant. Drag nothing; vary $\theta_{-i}$ in the exercises.
:::

## Budget balance and Green–Laffont

::: proposition No DSIC, efficient, budget-balanced Groves rule {#prop-green-laffont}
Green and Laffont (1979): if the domain of valuation profiles is sufficiently rich (e.g. all profiles of public-good values in $\R^n$), the only Groves mechanisms that balance the budget ($\sum_i t_i = C(x^*)$ for every $\theta$, or $=0$ when $C=0$) are pathological — in the standard public-good model, **no** Groves mechanism is budget-balanced for all $\theta$. Assumptions: quasi-linearity, efficiency, DSIC (hence Groves, by the characterisation that DSIC efficient mechanisms *are* Groves on a rich domain), exact ex-post budget balance.
:::

The escape hatches are: (i) give up exact balance and run a deficit, financed by distortionary taxes outside the model; (ii) give up dominant strategies and use **expected-externality** (d'Aspremont–Gérard-Varet, AGV / "expected Groves") transfers, which are BIC and can balance the budget *in expectation* or ex post under extra conditions; (iii) give up efficiency at some profiles; (iv) restrict the domain.

::: example AGV in a two-person public good {#ex-agv}
Two agents, $\theta_i$ i.i.d. uniform on $\{0, 10\}$, $C=10$. Efficient $q=1$ iff at least one has $\theta_i=10$ (sum is $0$, $10$ or $20$; $C=10$ so $q=1$ unless both are $0$). AGV charges each agent the *expected* externality her report imposes. Compute, for a type-$10$ agent, the expected Clarke-like payment given the prior on the other, and confirm that the two agents' expected payments can cover $C$ in expectation when $q=1$ with probability $3/4$.
::: solution
The other is $0$ or $10$ with equal probability. If $i$ reports $10$: $q=1$ always. The externality on $j$ is $-C$ plus $j$'s value, relative to $q$ without $i$. Without $i$, $q=1$ iff $\theta_j=10$. So $i$'s presence changes the decision only when $\theta_j=0$ (from $q=0$ to $q=1$), imposing net cost $C - 0 = 10$ on the "others" in that state, and does not change the decision when $\theta_j=10$. Expected externality $= (1/2)\times 10 = 5$. Charge $5$ to a report of $10$. A report of $0$: $q=1$ iff $\theta_j=10$; $i$ is never pivotal for a $0$ report in a way that hurts $j$ (when $\theta_j=10$ the project would happen anyway). Charge $0$ to a report of $0$. Expected revenue: each agent is type $10$ with probability $1/2$, so expected payment per agent $2.5$, total $5$. Expected cost: $C \times \Pr(q=1) = 10 \times 3/4 = 7.5$. Expected deficit $2.5$ in this arithmetic — AGV balanced the *externality* in expectation, not necessarily this particular $C$. The point of the example is the *method*: replace the realised pivot with its expectation so that $t_i$ depends on $\hat\theta_i$ only through a term that IC can live with, and on $\theta_{-i}$ in a way that can be used to balance. Full AGV budget balance is arranged by adding a function of $\theta_{-i}$ that does not disturb IC (a Groves $h_i$) chosen so that $\sum t_i = C$ in expectation. It is BIC, not DSIC: if $i$ *knew* $\theta_j=0$, she might not want to pay $5$ for a project worth $10$ that she could get by reporting just above $10-C$ in a different scheme. That is the DSIC/BIC fork of the previous chapter's last exercise.
:::
:::

## Myerson–Satterthwaite

Two people, one object. A seller has cost $c$, a buyer has value $v$. Both privately known. Gains from trade exist when $v > c$. Can a designer implement trade exactly when $v>c$, have both participate voluntarily (interim IR), have truthful BIC reports, and not run a deficit?

::: theorem Myerson–Satterthwaite {#thm-ms}
(Myerson and Satterthwaite 1983, *Journal of Economic Theory*.) Suppose $v$ and $c$ are independently drawn from densities that are positive on overlapping intervals $[\underline v, \bar v]$ and $[\underline c, \bar c]$ with $\underline v < \bar c$ and $\bar v > \underline c$ (gains from trade possible but not certain). There is **no** mechanism that is Bayesian incentive-compatible, interim individually rational, efficient (trade iff $v \ge c$) and weakly budget-balanced (the designer does not subsidise). Assumptions: quasi-linearity, independent types, independent private values, the overlapping-support condition, no outside subsidy.
:::

::: proof
(Sketch of the usual envelope argument.) BIC and IR imply that each party's expected transfer is pinned down, up to a constant, by her allocation rule via the envelope theorem: a buyer of type $v$ has expected surplus $\int^{\,v} Q_B(t)\,dt$ plus her lowest-type surplus, where $Q_B$ is her probability of receiving the object. Efficiency requires $Q_B(v,c) = \mathbf{1}_{\{v \ge c\}}$. Integrating expected transfers, the designer's expected surplus equals expected gains from trade minus the information rents that IR and IC force her to leave with the agents. With overlapping supports those rents exceed the expected gains: the lowest-type seller and the highest-type buyer must be willing to participate, and the envelope then pays rents to every other type. The difference is strictly negative. Hence a deficit. Dropping efficiency (trading only when $v \ge c + \Delta$ for some wedge $\Delta$) can restore balance; that is the second-best, and it is the posted-price and k-double-auction family.
:::

::: example A posted price {#ex-posted}
$v, c$ i.i.d. uniform on $[0,1]$. A posted price $p = 1/2$: trade iff $v \ge 1/2$ and $c \le 1/2$. Probability of trade? Expected gains from trade, versus first-best $\E[(v-c)_+] = 1/6$?
::: solution
$\Pr(\text{trade}) = (1/2)\times(1/2) = 1/4$. First-best trade probability is $\Pr(v\ge c) = 1/2$. Expected gains under the posted price: $\E[v-c \mid v\ge 1/2,\, c\le 1/2]\times 1/4$. Given the conditions, $v$ is uniform on $[1/2,1]$ with mean $3/4$, $c$ uniform on $[0,1/2]$ with mean $1/4$, so $\E[v-c\mid\text{trade}] = 1/2$ and expected gains $= (1/2)\times(1/4) = 1/8$. First-best $\E[(v-c)_+] = \int_0^1 \int_c^1 (v-c)\,dv\,dc = 1/6$. The posted price captures $1/8$ over $1/6 = 75\%$ of expected first-best gains, with probability of trade half the first-best. It is BIC (no report — the price is posted), IR (either party can walk away), and budget-balanced (the buyer pays the seller). Efficiency was dropped, and Myerson–Satterthwaite says something had to be.
:::
:::

::: warning Efficiency is not the default once information is private
The first welfare theorem assumed complete information (or at least prices that agents take as given with convex production). VCG restores efficiency with private information *by running a deficit* (or, in an auction of a privately owned object, by not paying the seller the whole bill). Myerson–Satterthwaite says that if you also want voluntary participation and no deficit, you cannot have efficiency in bilateral trade with overlapping values. A public-good pivot tax that does not cover the cost is the same tension. Do not quote "markets are efficient" as a reason that a privately informed buyer and seller will trade whenever $v>c$.
:::

## Public decisions and auctions as the same object

A second-price (Vickrey) auction of one object to $n$ bidders with values $\theta_i$ is VCG: the object goes to the highest $\theta_i$, and the winner pays the second highest — which is the externality imposed on the rest (they lose the object that would have gone to the second). The seller's revenue is that second price, not the social surplus. Budget "balance" here means: the winner's payment is received by the seller. That works because the seller is the residual claimant and is not a privately informed player in the simplest model. Put a privately informed seller back in, and you are in Myerson–Satterthwaite.

A public good with a cost $C$ has no residual claimant who enjoys paying $C$ minus pivot taxes. The deficit is political: it must be financed by general revenue, which (outside this model) has a marginal cost of public funds. That is the link to [[public-economics/efficiency-costs-of-taxation]].

::: example Lowest-type rent in bilateral trade {#ex-ms-rent}
$v,c$ i.i.d. uniform $[0,1]$, efficient trade $Q=\mathbf{1}_{\{v\ge c\}}$. The buyer's lowest type $v=0$ never trades and gets surplus $0$. The envelope then gives a type-$v$ buyer expected surplus $\int_0^v \Pr(c \le t)\,dt = \int_0^v t\,dt = v^2/2$. At $v=1$ that rent is $1/2$. Expected information rent paid to the buyer (averaging over $v$) is $\E[v^2/2] = 1/6$. The expected first-best gains are also $1/6$. A seller-side rent of the same order must still be paid. Why is a deficit the natural outcome?
::: solution
Expected gains $1/6$ are exhausted by the buyer's expected envelope rent $1/6$ *before* the seller's IR/IC rents are paid. The seller's symmetric rent is another $1/6$. Total rents $1/3 > 1/6$ gains: the designer cannot pay both and break even. That is Myerson–Satterthwaite in the uniform example — the theorem's integral identity, not a new assumption.
:::
:::

::: quiz
A Clarke pivot tax for a public project of cost $16$ collects $4$ from three agents whose project is built. This shows that
- [ ] VCG is not efficient
- [x] DSIC efficient public-good provision need not cover cost
- [ ] someone lied in the Groves mechanism
::: solution
[[#ex-pivot]] is efficient and DSIC by [[#prop-groves]], and it runs a deficit of $12$. Green–Laffont says that is generic on a rich domain. Lying is not the explanation: truth-telling is dominant.
:::
:::

::: history
**1961, William Vickrey.** "Counterspeculation, Auctions, and Competitive Sealed Tenders" (*Journal of Finance*) — the second-price auction.

**1971, Edward Clarke.** "Multipart Pricing of Public Goods" (*Public Choice*) — the pivot tax.

**1973, Theodore Groves.** "Incentives in Teams" (*Econometrica*) — the general Groves scheme.

**1979, Jerry Green and Jean-Jacques Laffont.** Incompatibility of DSIC, efficiency and budget balance on a rich domain.

**1983, Roger Myerson and Mark Satterthwaite.** Efficient bilateral trade is impossible under BIC, IR and no deficit, with overlapping supports.
:::

::: summary
- Groves mechanisms implement efficient social choice in dominant strategies under quasi-linearity by charging each agent an $h_i(\theta_{-i})$ minus the others' realised surplus. VCG is Groves with the Clarke pivot $h_i$.
- Pivot taxes need not cover costs. Green–Laffont: DSIC, efficiency and ex-post budget balance are incompatible on a rich domain.
- AGV (expected-externality) transfers are BIC and can be budget-balanced in expectation; they are not DSIC.
- Myerson–Satterthwaite: in bilateral trade with overlapping independent values, efficiency, BIC, interim IR and no deficit cannot hold together. Posted prices and wedges are the second-best.
- A Vickrey auction is VCG for one object with a residual-claimant seller. A public-good pivot tax is VCG without one.
:::

## Exercises

::: exercise A two-person pivot {level=1 check="5"}
$C=10$, $\theta_1=9$, $\theta_2=5$. The project is built. Report agent 1's Clarke payment.
::: solution
Without agent 1, $\theta_2=5<10$, so agent 1 is pivotal and pays $10-5=5$.
:::
:::

::: exercise Who pays nothing {level=1}
In [[#ex-pivot]], why does the agent with $\theta=5$ pay nothing, even though the project is built?
::: solution
Without her, $10+8=18\ge 16$, so the project would be built anyway. She is not pivotal; Clarke charges the externality, which is zero.
:::
:::

::: exercise Vickrey as VCG {level=1 check="7"}
Three bidders, values $10, 7, 3$. Second-price auction. What does the winner pay?
::: solution
The winner is the $10$, she pays the second highest, $7$. That is the surplus the others lose (the object would have gone to $7$).
:::
:::

::: exercise Deficit arithmetic {level=2 check="12"}
In [[#ex-pivot]], the deficit is $C - \sum t_i$. Report it.
::: solution
$16-4=12$.
:::
:::

::: exercise A non-pivotal high type {level=2}
Four agents, $C=30$, values $20, 20, 20, 1$. Built? Each Clarke payment? What is the deficit?
::: solution
Sum $61\ge 30$, built. Without any one of the $20$s: $20+20+1=41\ge 30$, still built. Without the $1$: $60\ge 30$, still built. Nobody is pivotal. All pay $0$. Deficit $=30$. A project that would happen without any single agent collects no pivot tax. That is why pivot revenue is small when $n$ is large and values are not concentrated.
:::
:::

::: exercise MS and a wedge {level=2}
$v,c$ i.i.d. uniform $[0,1]$. Trade only if $v \ge c + 1/4$. Is this efficient? Why might a designer choose it anyway?
::: solution
It is not first-best efficient: some $v>c$ pairs (those with $0 < v-c < 1/4$) do not trade. A designer who must not run a deficit, must obey IC and IR, *cannot* implement $v\ge c$ (Myerson–Satterthwaite), and may choose a wedge to reduce information rents until expected transfers balance. The $1/4$ is a cartoon of that second-best. The posted price $1/2$ is another second-best, with a different set of unrealised trades.
:::
:::

::: exercise Groves $h_i$ and a balanced try {level=3}
Two agents, a private good to be given to one of them, $v_i \in \R$, efficient rule: give the object to the higher $v_i$ (a Vickrey auction). Clarke: winner pays the loser $v_j$. Show that the budget (payment received minus $0$, there is no $C$) is the second price, which is not zero. Can you choose some other Groves $h_i$ so that $t_1+t_2=0$ for all $(v_1,v_2)$? What does Green–Laffont say you should expect?
::: hint
Groves $t_i = h_i(\theta_{-i}) - \sum_{j\ne i} v_j(x^*(\theta),\theta_j)$. If $i$ wins, the other gets $0$ of object-value, so the sum is $0$ and $t_i = h_i(v_j)$. If $i$ loses, the other gets $v_j$, so $t_i = h_i(v_j) - v_j$.
:::
::: solution
If $i$ wins, $x^*$ gives $j$ nothing, so $t_i = h_i(v_j)$. If $i$ loses, $t_i = h_i(v_j) - v_j$. For $t_1+t_2=0$ at every profile: suppose $v_1>v_2$, then $t_1 = h_1(v_2)$, $t_2 = h_2(v_1)-v_1$, sum $h_1(v_2)+h_2(v_1)-v_1 = 0$ for all $v_1>v_2$. An analogous identity holds for $v_2>v_1$. Differentiating in $v_1$ on $v_1>v_2$ gives $h_2'(v_1) = 1$, so $h_2(v_1)=v_1 + \mathrm{const}$, and then the identity cannot hold for all $v_1>v_2$ unless the domain is trivial. Green–Laffont says this is the expected outcome: no Groves $h_i$ balances for all profiles on a rich domain. (You *can* balance at a single prior in expectation with AGV.)
:::
:::

::: exercise Collusion against VCG {level=3}
Two bidders, values $10$ and $7$, Vickrey auction. They collude: the $7$ reports $0$, the $10$ reports $10$. What does the winner pay? Compare with truthful Vickrey. Why does DSIC of the *one-shot* mechanism not prevent this?
::: solution
Winner pays the second reported price, $0$, instead of $7$. The pair gains $7$. DSIC says that *given the other's report*, neither wants to lie *unilaterally*. It does not say that a *joint* deviation is unprofitable. VCG is not collusion-proof. Group strategy-proofness and collusion-proof mechanism design are extra constraints; they typically cost efficiency or budget. This is a reason real multi-object auctions (FCC, spectrum) do not run naïve VCG.
:::
:::
