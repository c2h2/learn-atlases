A one-step tree is a market with two dates and two states. The underlying moves from $S$ to either $Su$ or $Sd$. A call pays $\max(Su-K,0)$ or $\max(Sd-K,0)$. Two traded instruments — the underlying and cash — span two states, so there is a unique replicating portfolio, and the call's price is that portfolio's cost. No opinion about the physical probability of the up move enters. The **risk-neutral** probability is the mixing weight that makes the discounted underlying a martingale; using it is a computational shortcut for the replicating cost.

This chapter works a one-step tree by hand, then a two-step tree, then American exercise, then the limit of many steps. The house numbers are $S = 100$, $K = 100$, $r = 0.05$, $\sigma = 0.20$, $T = 1$, Cox–Ross–Rubinstein moves $u = e^{\sigma\sqrt{\Delta t}}$, $d = 1/u$. The one-step call comes out $12.162$; the two-step call $9.541$; fifty steps $10.411$; Black–Scholes $10.451$. The sequence is the argument that the next chapter's formula is a tree with $\Delta t \to 0$. Numbers are illustrative. The tree is a model of a hedge, not a recommendation to put the hedge on.

## One step, by hand

:::definition One-step binomial market {#def-one-step}
Dates are $0$ and $T$. The underlying starts at $S$ and moves to $S u$ or $S d$, with $u > e^{rT} > d > 0$ so that neither the underlying nor cash dominates. Cash grows at a constant continuous rate $r$. A **European claim** pays $V_u$ in the up state and $V_d$ in the down state. There are no dividends in this section ($q = 0$).
:::

Two numbers, $\Delta$ units of the underlying and $B$ units of cash (a negative $B$ is borrowing), must satisfy

$$
\Delta\, S u + B e^{rT} = V_u,\qquad \Delta\, S d + B e^{rT} = V_d.
$$

:::proposition Replicating portfolio and no-arbitrage price {#prop-replicate}
In the market of [[#def-one-step]] there is a unique replicating pair

$$
\Delta = \frac{V_u - V_d}{S(u-d)},\qquad B = e^{-rT}\,\frac{u V_d - d V_u}{u-d},
$$ {#eq-delta-B}

and the unique no-arbitrage price of the claim is $V = \Delta S + B$. Equivalently, with the **risk-neutral probability**

$$
p^* = \frac{e^{rT} - d}{u - d},
$$ {#eq-pstar}

one has $0 < p^* < 1$ and

$$
V = e^{-rT}\bigl(p^* V_u + (1-p^*) V_d\bigr).
$$ {#eq-rn}
:::

:::proof
The two linear equations in $\Delta$ and $B$ have coefficient determinant $S(u-d)e^{rT} \ne 0$, so a unique solution exists and is [[#eq-delta-B]]. Any other quoted price $V'$ for the claim would differ from $\Delta S + B$; buying the cheap side and selling the dear side, and using the replicating portfolio on the claim's side, produces a non-zero cash amount today and a zero net payoff at $T$.

For the risk-neutral form, substitute [[#eq-delta-B]] into $\Delta S + B$ and rearrange. The coefficient of $V_u$ is $e^{-rT}(e^{rT}-d)/(u-d) = e^{-rT} p^*$, and the coefficient of $V_d$ is $e^{-rT}(u-e^{rT})/(u-d) = e^{-rT}(1-p^*)$. The condition $u > e^{rT} > d$ is exactly $0 < p^* < 1$. Under $p^*$ the discounted underlying is a martingale: $S = e^{-rT}(p^* S u + (1-p^*) S d)$. The physical probability of the up move never appears.
:::

The quantity $\Delta$ is the **delta** of the claim on this tree. It is the number of units of the underlying in the hedge. For a call, $V_u \ge V_d$, so $\Delta \ge 0$; for a put, $\Delta \le 0$.

:::example One-step European call {#ex-one-call}
$S = 100$, $K = 100$, $r = 0.05$, $T = 1$, $\sigma = 0.20$. Set $u = e^{\sigma\sqrt{T}} = e^{0.20}$, $d = e^{-0.20}$. Compute $u$, $d$, $Su$, $Sd$, the call payoffs, $p^*$, $\Delta$, $B$ and the call price.
:::solution
$u = e^{0.20} = 1.221403$, $d = 0.818731$. Then $Su = 122.140$, $Sd = 81.873$. Call payoffs: $V_u = \max(122.140-100,0) = 22.140$, $V_d = \max(81.873-100,0) = 0$. The risk-neutral probability is

$$
p^* = \frac{e^{0.05} - 0.818731}{1.221403 - 0.818731} = \frac{1.051271 - 0.818731}{0.402672} = 0.577493.
$$

Then

$$
C = e^{-0.05}\bigl(0.577493 \times 22.140 + 0.422507 \times 0\bigr) = 0.951229 \times 12.786 = 12.162.
$$

Delta is $\Delta = 22.140 / (122.140 - 81.873) = 0.5498$. Cash is $B = 12.162 - 0.5498 \times 100 = -42.821$: the replicating portfolio is long $0.55$ shares and borrows $42.82$. Check: in the up state, $0.5498 \times 122.140 - 42.821 e^{0.05} = 67.16 - 45.02 = 22.14$; in the down state, $0.5498 \times 81.873 - 45.02 = 45.02 - 45.02 = 0$.
:::
:::

:::example One-step European put, and parity {#ex-one-put}
On the same tree, price the European put with $K = 100$. Confirm put–call parity with the call of [[#ex-one-call]].
:::solution
Put payoffs: $V_u = \max(100-122.140,0) = 0$, $V_d = \max(100-81.873,0) = 18.127$. Then

$$
P = e^{-0.05}\bigl(0.577493 \times 0 + 0.422507 \times 18.127\bigr) = 0.951229 \times 7.659 = 7.285.
$$

Parity: $C - P = 12.162 - 7.285 = 4.877$, and $S - K e^{-rT} = 100 - 95.123 = 4.877$. The tree prices a call and a put that differ by the forward, as [[derivatives/options#thm-parity]] requires of any no-arbitrage pair. The physical probability of the up move was not used for either price.
:::
:::

:::warning Using the physical probability in the tree
A common mistake is to replace $p^*$ by a physical $p$ — say $p = 1/2$, or a $p$ estimated from historical up-days — and then discount at $r$. That mixing is not a replicating cost. It is an expected discounted payoff under a measure that is not the one that makes the underlying a martingale, and it does not match $\Delta S + B$. If one insists on using $p$, the discount rate on the claim has to be a risk-adjusted rate that one does not know. The whole point of $p^*$ is to avoid that rate. Historical frequencies belong in a forecasting exercise; they do not belong in [[#eq-rn]].
:::

:::quiz
On the one-step tree of [[#ex-one-call]], the physical probability of the up move is estimated at $0.4$. What is the no-arbitrage call price?
- [ ] $e^{-0.05}(0.4 \times 22.140 + 0.6 \times 0) = 8.424$
- [x] $12.162$, the replicating cost, which does not use $0.4$
- [ ] $22.140$, the up payoff
- [ ] $0$, because the physical chance of a positive payoff is only $0.4$
:::solution
[[#prop-replicate]] prices by replication. The physical $0.4$ never enters $\Delta$ or $B$. The $8.424$ figure is an expected discounted payoff at $r$ under the wrong measure. The up payoff $22.140$ is a future cashflow, not a price.
:::
:::

## Two steps, by hand

Split $[0,T]$ into two periods of length $\Delta t = T/2$. At each node the underlying moves by $u = e^{\sigma\sqrt{\Delta t}}$ or $d = 1/u$, and the one-step argument is applied backwards.

:::algorithm Backward induction on a CRR tree {#alg-crr}
1. Set $\Delta t = T/n$, $u = e^{\sigma\sqrt{\Delta t}}$, $d = 1/u$, $p^* = \bigl(e^{r\Delta t} - d\bigr)/(u-d)$, and $\mathrm{disc} = e^{-r\Delta t}$.
2. At maturity, $V_{n,j} = \max(S u^j d^{n-j} - K, 0)$ for a call (or the put payoff), $j = 0,\dots,n$ up-moves.
3. For $i = n-1,\dots,0$ and $j = 0,\dots,i$,
   $$
   V_{i,j} = \mathrm{disc}\bigl(p^* V_{i+1,j+1} + (1-p^*) V_{i+1,j}\bigr).
   $$
4. For an American claim, replace the right-hand side by the maximum of that continuation value and the intrinsic value at node $(i,j)$.
:::

The Cox–Ross–Rubinstein choice $u = e^{\sigma\sqrt{\Delta t}}$, $d = 1/u$ matches the underlying's variance per step to $\sigma^2 \Delta t$ as $\Delta t \to 0$. Other parameterisations (Jarrow–Rudd, Tian) match different moments; they all have the same continuous-time limit under the Black–Scholes assumptions.

:::example Two-step European call {#ex-two-call}
$S = 100$, $K = 100$, $r = 0.05$, $\sigma = 0.20$, $T = 1$, $n = 2$. Compute $u$, $p^*$, the three terminal spots, the continuation values at the up and down nodes, and $C$.
:::solution
$\Delta t = 0.5$, $u = e^{0.20\sqrt{0.5}} = e^{0.141421} = 1.151910$, $d = 0.868123$. Then

$$
p^* = \frac{e^{0.05\times 0.5} - 0.868123}{1.151910 - 0.868123} = \frac{1.025315 - 0.868123}{0.283787} = 0.553908.
$$

Terminal spots: $S u^2 = 132.690$, $S ud = 100$, $S d^2 = 75.364$. Call payoffs: $32.690$, $0$, $0$. Discount per step $e^{-0.025} = 0.975310$. Continuation at the up node (spots $132.690$ and $100$):

$$
C_u = 0.975310 \times (0.553908 \times 32.690 + 0.446092 \times 0) = 17.660.
$$

At the down node (spots $100$ and $75.364$): $C_d = 0$, because both successor payoffs are $0$. At the root:

$$
C = 0.975310 \times (0.553908 \times 17.660 + 0.446092 \times 0) = 9.541.
$$

Deltas: at the root, $\Delta_0 = (17.660 - 0)/(115.191 - 86.812) = 0.622$; at the up node, $\Delta_u = (32.690-0)/(132.690-100) = 1$; at the down node, $\Delta_d = 0$. The hedge is $0.62$ shares today, then $1$ share if the first move is up and $0$ if it is down. That rebalancing *is* dynamic hedging, on a tree with two dates.
:::
:::

:::example Two-step American put {#ex-am-put}
On the same two-step tree, price the American put with $K = 100$. At each node compare continuation with intrinsic.
:::solution
Terminal put payoffs: $\max(100-132.690,0) = 0$, $\max(100-100,0) = 0$, $\max(100-75.364,0) = 24.636$. Continuation at the up node: $0$ (both successors pay $0$); intrinsic $\max(100-115.191,0) = 0$; take $0$. Continuation at the down node:

$$
P_d^{\mathrm{cont}} = 0.975310 \times (0.553908 \times 0 + 0.446092 \times 24.636) = 10.719.
$$

Intrinsic at the down node: $\max(100 - 86.812, 0) = 13.188$. Exercise is better: store $13.188$. At the root, continuation uses the American values:

$$
P_0 = 0.975310 \times (0.553908 \times 0 + 0.446092 \times 13.188) = 5.738.
$$

Intrinsic at the root is $0$, so the American put is worth $5.738$. The European put on the same tree is $4.663$ (replace $13.188$ by $10.719$ in the last line). Early exercise is worth $1.075$ on this tree. The comparison at the down node is the whole of American optionality: a number against a number, no slogan required.
:::
:::

:::widget plot
f: max(x-100,0); 0.5498*x - 42.821*exp(0.05)
x: 70, 140
y: -20, 50
labels: \text{call payoff}; \text{replicating line}
points: 81.873,0; 122.140,22.140
caption: The one-step replicating line $\Delta S + B e^{rT}$ of [[#ex-one-call]] against the call payoff. The line matches the kink at the two tree states (marked) and misses it everywhere else. A two-state hedge cannot match a three-kink world; that is why the tree is refined.
:::

The widget is the geometric content of [[#prop-replicate]]. Two points determine a line. The call payoff is not a line. The hedge is exact at $Sd$ and $Su$ and wrong at every other $S_T$. Adding steps adds points, and the polyline hugs the kink.

## Many steps, and the limit

Repeating [[#alg-crr]] for $n = 1, 2, 4, 8, 16, 32, 50, 100, 200$ on the house-number call produces

| $n$ | $1$ | $2$ | $4$ | $8$ | $16$ | $32$ | $50$ | $100$ | $200$ |
|---|---|---|---|---|---|---|---|---|---|
| $C_n$ | $12.162$ | $9.541$ | $9.971$ | $10.205$ | $10.327$ | $10.388$ | $10.411$ | $10.431$ | $10.441$ |

The Black–Scholes value with the same $S, K, r, \sigma, T$ is $10.451$. The tree oscillates around the limit (even $n$ from below, on this example) and the gap after $100$ steps is two cents on a $100$ underlying. That is the computational meaning of “the binomial model converges to Black–Scholes”.

:::proposition Binomial limit (statement) {#prop-limit}
Let $u = e^{\sigma\sqrt{\Delta t}}$, $d = e^{-\sigma\sqrt{\Delta t}}$, $p^* = (e^{r\Delta t}-d)/(u-d)$, with $\Delta t = T/n$. As $n \to \infty$, the distribution of $\ln S_T$ under $p^*$ converges to a normal with mean $\ln S + (r - \tfrac12 \sigma^2)T$ and variance $\sigma^2 T$, and the discounted binomial expectation of $\max(S_T-K,0)$ converges to the Black–Scholes call of [[derivatives/black-scholes#thm-bs]]. Assumptions: constant $r$ and $\sigma$, no jumps, European exercise, and the CRR calibration of $u,d$.
:::

:::proof
Sketch. $\ln S_T = \ln S + N_u \ln u + (n-N_u)\ln d = \ln S + (2N_u - n)\sigma\sqrt{\Delta t}$, where $N_u$ is the number of up moves. Under $p^*$, $N_u$ is binomial. A short expansion gives $p^* = \tfrac12 + \tfrac12 (r/\sigma - \sigma/2)\sqrt{\Delta t} + O(\Delta t)$. Then $\E^*[2N_u - n] \sqrt{\Delta t} \to (r-\sigma^2/2)T / \sigma$ after algebra, and $\Var^*(2N_u-n)\Delta t \to T$. The de Moivre–Laplace (Lindeberg) theorem sends $(2N_u-n)$ to a Gaussian, so $\ln S_T$ is lognormal with the Black–Scholes moments. The discounted expectation of the call payoff is a bounded continuous functional of that distribution and passes to the limit. A full $\varepsilon$–$\delta$ write-up is in Cox, Ross and Rubinstein (1979); the next chapter derives the same formula from a PDE.
:::

:::widget sequence
a: exp(0.2*sqrt(1/n))
N: 40
start: 1
limit: 1
caption: The CRR up-move $u_n = e^{\sigma\sqrt{T/n}}$ against the number of steps, for $\sigma = 0.20$, $T = 1$. As $n$ grows, $u_n \to 1$: each step becomes a small return. The binomial call in the table above is the discounted risk-neutral expectation on that shrinking lattice, not a path of the spot.
:::

The sequence widget is $u_n$, not $C_n$, because $C_n$ is not a one-line formula in $n$. The table is the object to look at for prices. The shrinking $u_n$ is the object to look at for the mechanism: a tree with $200$ steps is a model of many tiny up-or-down returns whose log-sum is approximately normal.

:::intuition Risk-neutral is a change of weights, not a change of preferences
The physical world can have $p = 0.4$ for the up move. The hedge still costs $12.162$ on the one-step tree. Writing $p^* = 0.577$ does not mean anyone believes the up move is more likely than not. It means that if you *compute* the replicating cost as a discounted mixture, those are the weights that make the mixture equal $\Delta S + B$. People can remain risk-averse; they are already in $S$ and in $r$. The option, given $S$ and $r$, has no extra risk premium because it is manufactured from $S$ and cash.
:::

The even-$n$ / odd-$n$ oscillation is a known feature of CRR at-the-money: the tree's central node sits on $K$ when $n$ is even ($ud = 1$) and sits off $K$ when $n$ is odd. Richardson extrapolation, or a slightly different calibration such as Jarrow–Rudd ($u = e^{(r-\sigma^2/2)\Delta t + \sigma\sqrt{\Delta t}}$), reduces the wiggle. For a first course the table is enough: after a few dozen steps the tree and the formula agree to pennies on a $100$ underlying, and the remaining gap is discretisation, not a different theory.

A European put on the same trees satisfies parity at every $n$: $C_n - P_n = S - K e^{-rT} = 4.877$, exactly, because each finite tree is itself an arbitrage-free market. That is a useful check on an implementation. American puts break the equality, as [[#ex-am-put]] showed: the extra $1.075$ of early-exercise value on the two-step tree is an interest-on-the-strike effect that a European holder cannot capture. As $n$ grows, that American premium converges too, but to a number for which there is no Black–Scholes formula. The tree remains the method.

## Dividends and the limits of the tree

The Cox–Ross–Rubinstein tree is not the only two-state calibration. Jarrow–Rudd centres the log-move on the risk-neutral drift; Tian matches one extra moment. For the house-number call they all wander toward $10.451$. What they share, and what this chapter has been about, is replication at each node: two instruments, two states, one price. Changing $u$ and $d$ changes the grid, not the argument.

A continuous yield $q$ replaces $e^{r\Delta t}$ by $e^{(r-q)\Delta t}$ in $p^*$. A known discrete dividend $D$ at a date inside the tree is subtracted from $S$ along the path at that date; the tree for the **prepaid forward** $S - I$ is then recombined, and the dividend is added back for intrinsic-value comparisons. American calls on dividend-paying shares can then exercise just before an ex-dividend date, which the algorithm captures by the $\max$ in step 4.

What the tree does not capture, at any finite $n$, is a jump that is not one of the two moves, a $\sigma$ that moves on its own, or a trading cost that makes rebalancing at every node unviable. Those are not small omissions. They are the agenda of later models (local vol, stochastic vol, jump-diffusions) and of the discrete-hedging error in [[derivatives/greeks-and-hedging]]. The binomial model is the first dynamic hedge, and it is exact in its own two-state world.

## Where this leads

The table of $C_n$ is the numerical bridge to [[derivatives/black-scholes]]. The delta process $(\Delta_{i,j})$ is the discrete version of the Black–Scholes delta. American exercise, which the tree handles by a comparison at each node, has no closed Black–Scholes formula; the tree remains the standard classroom method, and a finite-difference scheme in [[derivatives/numerical-methods]] is the same comparison on a grid. First, the continuous-time limit as a model with named assumptions.

:::history
**1979, Cox, Ross and Rubinstein.** John C. Cox, Stephen A. Ross and Mark Rubinstein published “Option Pricing: A Simplified Approach” in the *Journal of Financial Economics* (volume 7, 1979, pages 229–263). The paper gave the replicating tree, the risk-neutral probability, American exercise by backward induction, and the convergence to Black–Scholes. William Sharpe had used a two-state argument in teaching notes; Rendleman and Bartter (1979) published a related two-state model the same year. The CRR calibration $u = e^{\sigma\sqrt{\Delta t}}$ is the one this chapter uses by hand. The contribution was not a new continuous-time formula — that was 1973 — but a proof you can do on a blackboard with two states, then $n$ states, then a limit.
:::

:::summary
- In a one-step two-state market the claim has a unique replicating portfolio $(\Delta, B)$, and its price is $\Delta S + B$.
- The same price is the discounted risk-neutral expectation, with $p^* = (e^{rT}-d)/(u-d)$. The physical probability does not enter.
- House-number one-step call: $u = 1.2214$, $p^* = 0.5775$, $C = 12.162$, $\Delta = 0.550$, $B = -42.82$. The put is $7.285$, and $C-P = 4.877$ matches parity.
- Two-step CRR call: $C = 9.541$. Two-step American put: $5.738$, against a European put of $4.663$; exercise is optimal at the down node.
- As $n \to \infty$, CRR prices converge to Black–Scholes ($10.451$ on these numbers). The tree is the hedge made visible, then taken to a limit.
:::

## Exercises

:::exercise The up move {level=1 check="1.2214"}
For $\sigma = 0.20$, $T = 1$, $n = 1$, enter $u = e^{\sigma\sqrt{T}}$ to four decimals.
:::solution
$e^{0.20} = 1.2214$ to four decimals. Then $d = 1/u = 0.8187$.
:::
:::

:::exercise Risk-neutral $p^*$ {level=1 check="0.5775"}
On the one-step house tree, $u = 1.221403$, $d = 0.818731$, $r = 0.05$, $T = 1$. Enter $p^*$ to four decimals.
:::solution
$p^* = (e^{0.05}-d)/(u-d) = 0.5775$ to four decimals, [[#ex-one-call]].
:::
:::

:::exercise One-step call {level=1 check="12.162"}
Enter the one-step European call price of [[#ex-one-call]] to three decimals.
:::solution
$C = e^{-0.05} \times 0.577493 \times 22.140 = 12.162$. The replicating check is $\Delta S + B = 0.5498\times 100 - 42.821 = 12.162$.
:::
:::

:::exercise One-step put {level=2 check="7.285"}
Enter the one-step European put of [[#ex-one-put]] to three decimals.
:::solution
$P = e^{-0.05} \times 0.422507 \times 18.127 = 7.285$. Parity: $12.162 - 7.285 = 4.877$.
:::
:::

:::exercise Two-step call {level=2 check="9.541"}
Enter the two-step CRR European call of [[#ex-two-call]] to three decimals.
:::solution
$C_u = 17.660$, $C_d = 0$, $C = 0.975310 \times 0.553908 \times 17.660 = 9.541$.
:::
:::

:::exercise American versus European put {level=2 check="5.738"}
Enter the two-step American put of [[#ex-am-put]] to three decimals.
:::solution
At the down node intrinsic $13.188$ beats continuation $10.719$. Rolling back, $P_0 = 5.738$. The European price on the same tree is $4.663$.
:::
:::

:::exercise Recover $\Delta$ and $B$ {level=3}
On the one-step tree of [[#ex-one-call]], compute $\Delta$ and $B$ from [[#eq-delta-B]] without looking at the example, and verify that $\Delta Su + B e^{rT} = 22.140$ and $\Delta Sd + B e^{rT} = 0$.
:::hint
$V_u = 22.140$, $V_d = 0$, $S(u-d) = 40.267$.
:::
:::solution
$\Delta = 22.140 / (100 \times (1.221403-0.818731)) = 22.140/40.2672 = 0.54983$. Then $B = e^{-0.05}(1.221403 \times 0 - 0.818731 \times 22.140)/(1.221403-0.818731) = 0.951229 \times (-18.127)/0.402672 = -42.821$. Up-state check: $0.54983\times 122.140 + (-42.821)\times e^{0.05} = 67.163 - 45.023 = 22.140$. Down-state check: $0.54983\times 81.873 - 45.023 = 45.023 - 45.023 = 0$. The two identities are the definition of replication, and they are why $V = \Delta S + B = 12.162$ is the price.
:::
:::

:::exercise Why $p^*$ ignores the physical $p$ {level=3}
Suppose the physical probability of the up move is $p = 0.4$ and the physical expected return on the underlying is whatever it then is. Show that the discounted physical expectation $e^{-rT}(p V_u + (1-p)V_d)$ is not equal to $\Delta S + B$ for the call of [[#ex-one-call]], and compute the gap. Explain in one paragraph what rate you would need to discount at, if you insisted on using $p$, and why that rate is not $r$.
:::hint
The replicating portfolio earns $r$ because it is financed; the naked claim, under $P$, does not.
:::
:::solution
The physical mixture is $e^{-0.05}(0.4 \times 22.140 + 0.6 \times 0) = 0.951229 \times 8.856 = 8.424$. The replicating cost is $12.162$. The gap is $3.738$. If one discounts the physical expectation at a rate $r+\pi$ chosen so that $e^{-(r+\pi)T}(p V_u+(1-p)V_d) = 12.162$, then $e^{-(r+\pi)} \times 8.856 = 12.162$ gives $r+\pi = -\ln(12.162/8.856) = -0.318$, which is nonsense as an interest rate — the physical mixture is *below* the replicating cost, so no positive discount rate can raise it. (The call, under this $p$, has a physical expected payoff of $8.856$, below the $12.786$ risk-neutral mixture, because $p < p^*$; a risk-adjusted discount on the call would have to be *smaller* than $r$, even negative, to recover $12.162$.) The calculation is why one does not go down this road. Replication prices the call at $r$, because the hedge is a financed position in $S$ and cash. The physical $p$ is a statement about how often the up move happens in the world; it is not a statement about what the hedge costs.
:::
:::
