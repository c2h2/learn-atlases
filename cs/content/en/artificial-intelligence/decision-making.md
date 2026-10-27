A delivery robot must cross a warehouse floor to reach a loading bay. The direct route passes beside a stairwell; the robot's wheels slip now and then, and a slip at the wrong moment sends it down the stairs. The long way round is safe but slow, and the robot's battery charge is worth something too. What should it do? Not simply "the shortest path" — that ignores the risk — nor "never go near the stairs" — that may waste far more than the risk costs. A rational agent ([[artificial-intelligence/intelligent-agents#def-rational]]) weighs each outcome's *desirability* by its *probability*, and it must do so not once but at every step, because its next decision will depend on where the last one took it.

This chapter supplies the two ingredients. **Utility theory** says how to choose among uncertain outcomes: assign each outcome a utility and choose the action with the **maximum expected utility**; a famous theorem of von Neumann and Morgenstern shows that any agent whose preferences obey a few consistency axioms behaves as if it did exactly this. We use it to compute the **value of information**. Then **Markov decision processes** (MDPs) extend single decisions to sequential ones. We define policies and their values, derive the **Bellman equation**, and prove that **value iteration** converges because the Bellman update is a **contraction** — with explicit error bounds that tell us when to stop — and that **policy iteration** terminates with an optimal policy after finitely many steps. Everything is computed exactly here, from a known model; [[artificial-intelligence/reinforcement-learning]] removes that assumption.

## Utility and rational choice

A **lottery** $L = [p_1, S_1; \dots; p_k, S_k]$ is a situation in which outcome $S_i$ occurs with probability $p_i$ ($\sum p_i = 1$); an outcome may itself be a lottery. We write $A \succ B$ if the agent prefers $A$ to $B$, $A \sim B$ if it is indifferent, and $A \succeq B$ for either.

::: theorem Von Neumann–Morgenstern utility theorem {#thm-vnm}
Suppose an agent's preferences over lotteries satisfy: **orderability** (for any $A$, $B$ exactly one of $A \succ B$, $B \succ A$, $A \sim B$ holds); **transitivity**; **continuity** (if $A \succ B \succ C$ there is a $p$ with $[p, A; 1 - p, C] \sim B$); **substitutability** (if $A \sim B$ then $[p, A; 1 - p, C] \sim [p, B; 1 - p, C]$); **monotonicity** (if $A \succ B$ then $[p, A; 1 - p, B] \succeq [q, A; 1 - q, B]$ exactly when $p \ge q$); and **decomposability** (compound lotteries reduce to simple ones by the laws of probability). Then there is a **utility function** $U$ on outcomes such that
$$
A \succeq B \iff \E U(A) \ge \E U(B), \qquad \text{where } \E U([p_1, S_1; \dots; p_k, S_k]) = \sum_i p_i\, U(S_i),
$$
and $U$ is unique up to a positive affine transformation $U' = aU + b$, $a > 0$ (von Neumann and Morgenstern, 1944).
:::

We do not prove the theorem; the construction is natural, though. Pick a best outcome $S^\top$ and a worst $S^\bot$, and define $U(S)$ as the probability $p$ for which $S \sim [p, S^\top; 1 - p, S^\bot]$, which exists by continuity; the axioms then force every lottery to be valued by its expectation. The axioms are not arbitrary: an agent that violates transitivity, for example, can be exploited as a **money pump** — if it prefers $A$ to $B$, $B$ to $C$ and $C$ to $A$, it will pay a little to trade $C$ for $B$, then $B$ for $A$, then $A$ for $C$, and so on for ever.

So a rational agent chooses the action that maximises **expected utility**:
$$
\mathrm{EU}(a \mid e) = \sum_{s'} \Prob(\mathrm{Result}(a) = s' \mid a, e)\, U(s'), \qquad a^* = \operatorname*{arg\,max}_a \mathrm{EU}(a \mid e).
$$ {#eq-meu}
This is the **principle of maximum expected utility** (MEU). It says nothing about *where* utilities come from — that is for the designer, the user, or preference elicitation — only how they must be combined with probabilities.

Utility is not money. For most people a sure £1,000 is worth more than a fair coin flip between £0 and £2,000, although both have expected monetary value £1,000: their utility of money is **concave**, and they are **risk-averse**. The **certainty equivalent** of a lottery is the sure amount with the same utility; the difference between the expected monetary value and the certainty equivalent is the **risk premium**, the amount the agent would pay to avoid the risk — the basis of insurance.

::: example Certainty equivalent {#ex-certainty-equivalent}
An agent with wealth utility $U(x) = \sqrt x$ (in pounds) is offered a lottery: £0 or £400 with probability $1/2$ each. What is its certainty equivalent, and its risk premium?
::: solution
$\E U = \tfrac12 \sqrt0 + \tfrac12 \sqrt{400} = 10$. The certainty equivalent $c$ satisfies $\sqrt c = 10$, so $c = £100$. The expected monetary value is £200, so the risk premium is £100: the agent would accept any sure amount above £100 in exchange for the lottery. An agent with linear utility $U(x) = x$ is **risk-neutral** and values the lottery at £200; one with convex utility (say $x^2$) is risk-seeking.
:::
:::

::: widget plot
f: sqrt(x); x/20
x: 0, 400
y: 0, 21
points: 0,0; 400,20; 100,10; 200,10
labels: U(x) = \sqrt{x}; \text{chord: expected utility of the lottery}
caption: A concave utility of money. The chord joins the two outcomes of the lottery of the example (£0 and £400); its height at the mean £200 is the expected utility, $10$. The curve reaches $10$ already at £100, the certainty equivalent. The horizontal gap between $100$ and $200$ is the risk premium — the more curved the utility, the larger it is. Concavity is exactly Jensen's inequality, $\E U(X) \le U(\E X)$.
:::

::: quiz
An agent's utility function is $U(x)$ for money $x$. Which of the following utility functions lead to exactly the same choices between lotteries as $U$?

- [x] $3U(x) + 7$
- [ ] $U(x)^3$
- [ ] $e^{U(x)}$
- [x] $U(x)/2 - 1$
::: solution
By [[#thm-vnm]], a utility function is unique up to a *positive affine* transformation $aU + b$ with $a > 0$, which preserves the order of expected utilities: $\E[aU + b] = a\,\E U + b$. Nonlinear increasing transformations such as $U^3$ or $e^U$ preserve the ranking of sure outcomes but not of lotteries, since $\E[\phi(U)] \ne \phi(\E U)$; they change the agent's attitude to risk. (In deterministic minimax search, any increasing transformation was harmless — compare the exercise on expectiminimax in [[artificial-intelligence/adversarial-search]].)
:::
:::

### The value of information

An agent can often gather information before acting: run a test, consult a sensor, commission a survey. Information has value only if it might change the decision.

::: definition Value of perfect information {#def-vpi}
Let $E$ be a random variable that the agent could observe before choosing an action, with current evidence $e$. The **value of perfect information** about $E$ is
$$
\mathrm{VPI}_e(E) = \Bigl(\sum_{j} \Prob(E = e_j \mid e)\, \max_a \mathrm{EU}(a \mid e, E = e_j)\Bigr) - \max_a \mathrm{EU}(a \mid e),
$$
the expected utility of acting after seeing $E$, minus that of acting now.
:::

::: theorem Information never hurts in expectation {#thm-vpi}
$\mathrm{VPI}_e(E) \ge 0$ for every $E$ and $e$, with equality if the best action is the same for every value of $E$.
:::

::: proof
Let $\alpha$ be the best action now. By the law of total expectation, $\mathrm{EU}(\alpha \mid e) = \sum_j \Prob(e_j \mid e)\, \mathrm{EU}(\alpha \mid e, e_j)$. For each $j$, $\mathrm{EU}(\alpha \mid e, e_j) \le \max_a \mathrm{EU}(a \mid e, e_j)$. Summing with the weights $\Prob(e_j \mid e)$ gives $\max_a \mathrm{EU}(a \mid e) \le \sum_j \Prob(e_j \mid e) \max_a \mathrm{EU}(a \mid e, e_j)$, i.e. $\mathrm{VPI} \ge 0$. If $\alpha$ is optimal for every $e_j$, every inequality is an equality.
:::

The theorem concerns *expected* value before the observation; a particular observation can make the agent worse off in hindsight. And information is worth its VPI only if it is free: a rational agent gathers information when its VPI exceeds its cost — the **myopic** policy that asks for the observation with the highest net value, one at a time, is a common and often good approximation.

::: example Should we commission a survey? {#ex-vpi}
A firm can launch a product or not. If the market is good (probability $0.4$) launching earns $100$; if it is bad, launching loses $40$; not launching earns $0$ (utilities in units of £10,000, risk-neutral). What is the value of a perfect market survey?
::: solution
Without the survey: $\mathrm{EU}(\text{launch}) = 0.4 \cdot 100 + 0.6 \cdot (-40) = 40 - 24 = 16$, and $\mathrm{EU}(\text{don't}) = 0$; so the firm launches, with expected utility $16$. With the survey: if it says "good" (probability $0.4$) the firm launches and earns $100$; if "bad" (probability $0.6$) it does not launch and earns $0$. Expected utility $0.4 \cdot 100 + 0.6 \cdot 0 = 40$. So $\mathrm{VPI} = 40 - 16 = 24$, i.e. £240,000: the firm should pay up to that for a perfect survey. The value comes entirely from the bad-market case, where the information changes the decision; an imperfect survey is worth less, by the same calculation with the survey's error rates (a Bayesian network computation as in [[artificial-intelligence/probabilistic-reasoning]]).
:::
:::

## Markov decision processes

Now let the agent act repeatedly. After each action the world moves to a new state, stochastically, and the agent receives a reward; its goal is to maximise the total reward over time.

::: definition Markov decision process {#def-mdp}
A **Markov decision process** consists of a finite set of states $S$; for each state a finite set of actions $A(s)$; a **transition model** $P(s' \mid s, a)$, the probability that doing $a$ in $s$ leads to $s'$; a **reward function** $R(s, a, s')$, bounded by $R_{\max}$ in absolute value; and a **discount factor** $\gamma \in [0, 1)$. The transitions are **Markovian**: they depend only on the current state and action, not on the history. The **return** from time $0$ is the discounted sum $\sum_{t \ge 0} \gamma^t R(s_t, a_t, s_{t+1})$.
:::

Discounting says that a reward $t$ steps away is worth $\gamma^t$ of a reward now — because the future is uncertain, because of interest rates, or simply to make infinite sums finite: $\lvert \sum_t \gamma^t r_t\rvert \le R_{\max}/(1 - \gamma)$. **Terminal states** (absorbing, with zero reward afterwards) model episodes that end. Because the outcome of each action is uncertain, a solution cannot be a fixed sequence of actions; it is a **policy** $\pi$ that specifies an action $\pi(s)$ for every state.

::: definition Value of a policy, optimal value {#def-value}
The **value** (or **utility**) of a policy $\pi$ in state $s$ is the expected return when starting in $s$ and following $\pi$:
$$
U^\pi(s) = \E\Bigl[\sum_{t \ge 0} \gamma^t R(s_t, \pi(s_t), s_{t+1}) \Bigm| s_0 = s\Bigr].
$$
The **optimal value** is $U^*(s) = \max_\pi U^\pi(s)$, and a policy is **optimal** if it attains it in every state.
:::

Conditioning on the first step gives the **Bellman equations**. For a fixed policy,
$$
U^\pi(s) = \sum_{s'} P(s' \mid s, \pi(s))\, \bigl[R(s, \pi(s), s') + \gamma\, U^\pi(s')\bigr],
$$ {#eq-bellman-policy}
a system of $\lvert S\rvert$ linear equations; and for the optimal value,
$$
U^*(s) = \max_{a \in A(s)} \sum_{s'} P(s' \mid s, a)\, \bigl[R(s, a, s') + \gamma\, U^*(s')\bigr].
$$ {#eq-bellman}
The inner expression is the **Q-value** $Q(s, a)$: the expected return of doing $a$ in $s$ and acting optimally afterwards. If we know $U^*$, an optimal policy is **greedy** with respect to it: $\pi^*(s) = \arg\max_a Q(s, a)$. That optimal stationary deterministic policies exist, and that $U^*$ is the unique solution of [[#eq-bellman]], follows from the contraction argument below (together with a standard argument that history-dependent or randomised policies cannot do better). The recursion is the same as the expectiminimax recursion of [[artificial-intelligence/adversarial-search]] with chance nodes and no opponent — but on a graph with cycles, so it cannot be evaluated bottom-up.

::: example A grid world {#ex-grid}
A robot moves in a $3 \times 4$ grid (rows $0$–$2$ from the top, columns $0$–$3$) with a wall at $(1, 1)$, a goal at $(0, 3)$ (terminal, utility $+1$) and a stairwell at $(1, 3)$ (terminal, $-1$). Actions $N$, $S$, $E$, $W$ move in the intended direction with probability $0.8$ and slip to each perpendicular direction with probability $0.1$; bumping into a wall or the edge leaves the robot in place. Each move costs $0.04$ (reward $-0.04$), and $\gamma = 0.9$. Find the optimal values and policy.
::: solution
```python
GRID = ["...G",
        ".#.P",
        "...."]
STEP, GAMMA, SLIP = -0.04, 0.9, 0.1            # reward per step, discount, slip to each side
MOVES = {"N": (-1, 0), "S": (1, 0), "E": (0, 1), "W": (0, -1)}
SIDE = {"N": "EW", "S": "EW", "E": "NS", "W": "NS"}
states = [(r, c) for r in range(3) for c in range(4) if GRID[r][c] != "#"]
terminal = {(r, c): (1.0 if GRID[r][c] == "G" else -1.0) for r, c in states if GRID[r][c] in "GP"}

def move(s, d):
    r, c = s[0] + MOVES[d][0], s[1] + MOVES[d][1]
    return (r, c) if (r, c) in states else s    # bumping into a wall or the edge: stay

def transitions(s, a):
    """List of (probability, next state): intended direction 0.8, each side 0.1."""
    return [(1 - 2 * SLIP, move(s, a))] + [(SLIP, move(s, d)) for d in SIDE[a]]

def q_value(U, s, a):
    return sum(p * (STEP + GAMMA * U[t]) for p, t in transitions(s, a))

def value_iteration(eps=1e-4, trace=False):
    U = {s: 0.0 for s in states}; k = 0
    while True:
        new = {s: terminal[s] if s in terminal else max(q_value(U, s, a) for a in MOVES) for s in states}
        delta = max(abs(new[s] - U[s]) for s in states); U = new; k += 1
        if trace and k in (1, 2, 3, 5, 10, 20, 50): print(f"iteration {k:2d}: max change {delta:.6f}")
        if delta <= eps * (1 - GAMMA) / GAMMA:      # stopping rule of the error bound
            return U, k
```

(A terminal state's value is its utility; the greedy policy and a printing function are a few more lines.)

```console
$ python3 mdp.py
iteration  1: max change 1.000000
iteration  2: max change 0.712800
iteration  3: max change 0.506736
iteration  5: max change 0.253244
iteration 10: max change 0.016783
converged after 19 iterations
 0.509E  0.650E  0.795E  1.000
 0.399N   ####  0.486N -1.000
 0.296N  0.254E  0.345N  0.130W
```

Each cell shows $U^*$ and the greedy action. From the start in the bottom-left corner the robot goes north and then east along the top row, away from the stairwell. Two choices are instructive. At $(1, 2)$, next to the stairwell, the robot moves *north*, towards the goal's row, rather than east: an east move would enter the stairwell with probability $0.8$. At $(2, 3)$, directly below the stairwell, it moves *west*, away from the goal, although north is the shortest way: north enters the stairwell with probability $0.8$. Moving west still slips north into the stairwell with probability $0.1$; moving south (into the edge, so staying put) carries no risk at all but makes progress only when it slips west. With $\gamma = 0.9$ the progress is worth the small risk, and the low value $0.130$ reflects it. ([[#ex-grid-q]] asks for the four Q-values.)
:::
:::

## Value iteration

[[#eq-bellman]] is a system of $\lvert S\rvert$ nonlinear equations (because of the $\max$). **Value iteration** solves it by fixed-point iteration: start from any $U_0$ and repeatedly apply the right-hand side.

::: definition Bellman update {#def-bellman-operator}
The **Bellman operator** $B$ maps a value function $U\colon S \to \R$ to
$$
(BU)(s) = \max_{a \in A(s)} \sum_{s'} P(s' \mid s, a)\, \bigl[R(s, a, s') + \gamma\, U(s')\bigr].
$$
Value iteration computes $U_{k+1} = BU_k$. We measure the distance between value functions by the **max norm** $\lVert U - V\rVert = \max_s \lvert U(s) - V(s)\rvert$.
:::

::: theorem The Bellman operator is a contraction {#thm-contraction}
For all value functions $U$ and $V$, $\lVert BU - BV\rVert \le \gamma\, \lVert U - V\rVert$. Consequently $B$ has a unique fixed point $U^*$, and value iteration converges to it from any starting point, with $\lVert U_k - U^*\rVert \le \gamma^k \lVert U_0 - U^*\rVert$.
:::

::: proof
First, for any two functions $f, g$ on a finite set, $\lvert \max_a f(a) - \max_a g(a)\rvert \le \max_a \lvert f(a) - g(a)\rvert$: if, say, $\max f \ge \max g$ with $\max f = f(a^*)$, then $\max f - \max g \le f(a^*) - g(a^*) \le \max_a \lvert f(a) - g(a)\rvert$. Apply this in state $s$ with $f(a)$ and $g(a)$ the Q-values computed from $U$ and $V$:
$$
\lvert (BU)(s) - (BV)(s)\rvert \le \max_a \Bigl\lvert \sum_{s'} P(s' \mid s, a)\, \gamma\, \bigl(U(s') - V(s')\bigr)\Bigr\rvert \le \gamma \max_a \sum_{s'} P(s' \mid s, a)\, \lVert U - V\rVert = \gamma\, \lVert U - V\rVert,
$$
since the rewards cancel and the probabilities sum to $1$. Taking the maximum over $s$ proves the contraction.

*Uniqueness.* If $U = BU$ and $V = BV$, then $\lVert U - V\rVert = \lVert BU - BV\rVert \le \gamma \lVert U - V\rVert$, so $(1 - \gamma)\lVert U - V\rVert \le 0$ and $U = V$.

*Existence and convergence.* The sequence $U_k = B^k U_0$ satisfies $\lVert U_{k+1} - U_k\rVert \le \gamma^k \lVert U_1 - U_0\rVert$, so for $m > k$, $\lVert U_m - U_k\rVert \le \sum_{j=k}^{m-1} \gamma^j \lVert U_1 - U_0\rVert \le \frac{\gamma^k}{1 - \gamma} \lVert U_1 - U_0\rVert$: it is a Cauchy sequence in each coordinate, so it converges to some $U^*$ (the space $\R^{\lvert S\rvert}$ is complete). $B$ is continuous (it is a contraction), so $BU^* = \lim B U_k = \lim U_{k+1} = U^*$. Finally $\lVert U_k - U^*\rVert = \lVert BU_{k-1} - BU^*\rVert \le \gamma \lVert U_{k-1} - U^*\rVert$, and induction gives the rate. This is the Banach fixed-point theorem specialised to $B$.
:::

The fixed point is the optimal value: one shows that $U^*$ is attained by the greedy policy with respect to it (its value satisfies [[#eq-bellman-policy]], whose solution is unique by the same contraction argument for the policy's operator) and that no policy does better (any policy's value $U^\pi$ satisfies $U^\pi = B^\pi U^\pi \le B U^\pi$, and iterating $B$ from $U^\pi$ gives a non-decreasing sequence converging to $U^*$).

How many iterations are needed? Starting from $U_0 = 0$, the initial error is at most $R_{\max}/(1 - \gamma)$, so to reach error $\varepsilon$ it suffices that $\gamma^k R_{\max}/(1 - \gamma) \le \varepsilon$, i.e. $k \ge \log\bigl(R_{\max}/(\varepsilon(1 - \gamma))\bigr)/\log(1/\gamma)$. As $\gamma \to 1$, $\log(1/\gamma) \approx 1 - \gamma$, so the number of iterations grows like $1/(1 - \gamma)$. In practice we do not know $U^*$, and we stop when successive iterates are close.

::: corollary Stopping rule and policy loss {#cor-vi-stopping}
(1) If $\lVert U_{k+1} - U_k\rVert \le \varepsilon(1 - \gamma)/\gamma$, then $\lVert U_{k+1} - U^*\rVert \le \varepsilon$. (2) If $\lVert U - U^*\rVert \le \varepsilon$ and $\pi$ is greedy with respect to $U$, then $\lVert U^\pi - U^*\rVert \le 2\gamma\varepsilon/(1 - \gamma)$.
:::

::: proof
(1) By the triangle inequality and the contraction property,
$\lVert U_{k+1} - U^*\rVert \le \lVert U_{k+2} - U_{k+1}\rVert + \lVert U_{k+2} - U^*\rVert$, and continuing the telescoping sum, $\lVert U_{k+1} - U^*\rVert \le \sum_{j \ge 1} \lVert U_{k+j+1} - U_{k+j}\rVert \le \sum_{j \ge 1} \gamma^j \lVert U_{k+1} - U_k\rVert = \frac{\gamma}{1 - \gamma} \lVert U_{k+1} - U_k\rVert \le \varepsilon$.

(2) Let $B^\pi$ be the operator of [[#eq-bellman-policy]] for $\pi$ (no maximum); it is also a $\gamma$-contraction with fixed point $U^\pi$. Since $\pi$ is greedy for $U$, $B^\pi U = BU$. Then
$$
\lVert U^\pi - U^*\rVert = \lVert B^\pi U^\pi - B U^*\rVert \le \lVert B^\pi U^\pi - B^\pi U\rVert + \lVert BU - BU^*\rVert \le \gamma \lVert U^\pi - U\rVert + \gamma \lVert U - U^*\rVert,
$$
and $\lVert U^\pi - U\rVert \le \lVert U^\pi - U^*\rVert + \varepsilon$. So $\lVert U^\pi - U^*\rVert \le \gamma \lVert U^\pi - U^*\rVert + 2\gamma\varepsilon$, which rearranges to the claim.
:::

The stopping rule is exactly the test in the listing of [[#ex-grid]], with $\varepsilon = 10^{-4}$: after $19$ iterations the values are within $10^{-4}$ of $U^*$. The policy usually becomes optimal long before the values converge — the greedy policy only needs the *ranking* of Q-values to be right — which motivates the next algorithm.

::: widget plot
f: g^x; 2*g^x/(1-g)
x: 0, 100
y: 0, 2
sliders: g=0.5:0.01:0.99
labels: \gamma^k \text{ (contraction factor after } k \text{ updates)}; \text{bound } 2\gamma^k/(1-\gamma) \text{ on } \lVert U_k - U^*\rVert, R_{\max} = 1
caption: How fast value iteration converges. The first curve is the factor $\gamma^k$ by which the error shrinks after $k$ Bellman updates; the second is the worst-case error from $U_0 = 0$ when rewards lie in $[-1, 1]$ (the initial error can be up to $2/(1 - \gamma)$ in this normalisation). Move $\gamma$ from $0.9$ towards $0.99$: the number of iterations needed for a given accuracy grows roughly like $1/(1 - \gamma)$. Real problems often converge faster than the bound, as the grid world did.
:::

::: quiz
Value iteration with $\gamma = 0.9$ has just performed an update that changed no value by more than $0.001$. What can you guarantee about the current values $U$?

- [ ] They are exactly optimal.
- [x] $\lVert U - U^*\rVert \le 0.009$.
- [ ] $\lVert U - U^*\rVert \le 0.001$.
- [ ] Nothing, because the bound depends on the initial values.
::: solution
By [[#cor-vi-stopping]] (1), $\lVert U_{k+1} - U^*\rVert \le \frac{\gamma}{1 - \gamma}\lVert U_{k+1} - U_k\rVert = 9 \cdot 0.001 = 0.009$. The last change underestimates the remaining error by the factor $\gamma/(1 - \gamma)$, because the future changes, though shrinking geometrically, add up. The guarantee does not depend on $U_0$.
:::
:::

::: warning Discounting is part of the problem, not a numerical trick
It is tempting to treat $\gamma$ as a convergence parameter to be set close to $1$ "to be safe", or to change it to speed up an algorithm. But the discount factor changes which policy is optimal. In the grid world, with $\gamma = 0.5$ the robot below the stairwell no longer walks round: future rewards are worth so little that it prefers to bump into the wall, collecting step costs and avoiding risk, rather than make progress — its optimal policy changes from $W$ to $S$ there (the value of the start falls to $-0.062$). Likewise, the size of the step cost changes optimal behaviour qualitatively: a large cost makes risky shortcuts worth taking. Decide $\gamma$ and the rewards from what you want the agent to optimise; then choose the algorithm.
:::

## Policy iteration

**Policy iteration** alternates two steps: **policy evaluation** computes $U^{\pi_i}$ exactly, by solving the linear system [[#eq-bellman-policy]], and **policy improvement** makes the policy greedy with respect to it.

::: algorithm Policy iteration {#alg-policy-iteration}
1. Start with any policy $\pi_0$.
2. Repeat for $i = 0, 1, 2, \dots$:
   1. *Evaluate:* solve $U^{\pi_i}(s) = \sum_{s'} P(s' \mid s, \pi_i(s))\,[R(s, \pi_i(s), s') + \gamma U^{\pi_i}(s')]$ for all $s$.
   2. *Improve:* for each $s$, let $\pi_{i+1}(s) = \arg\max_a Q^{\pi_i}(s, a)$, where $Q^{\pi_i}(s, a) = \sum_{s'} P(s' \mid s, a)[R(s, a, s') + \gamma U^{\pi_i}(s')]$, keeping $\pi_{i+1}(s) = \pi_i(s)$ when $\pi_i(s)$ is among the maximisers.
   3. If $\pi_{i+1} = \pi_i$, stop and return $\pi_i$.
:::

::: theorem Policy improvement and termination {#thm-policy-iteration}
(1) *(Policy improvement theorem.)* If $\pi'$ is greedy with respect to $U^\pi$, then $U^{\pi'}(s) \ge U^\pi(s)$ for every state $s$. (2) If $\pi' = \pi$ in step 3, then $\pi$ is optimal. (3) Policy iteration terminates after at most $\prod_s \lvert A(s)\rvert$ iterations with an optimal policy.
:::

::: proof
(1) Greediness gives $B^{\pi'} U^\pi = B U^\pi \ge B^\pi U^\pi = U^\pi$ pointwise. The operator $B^{\pi'}$ is **monotone**: if $U \ge V$ pointwise then $B^{\pi'} U \ge B^{\pi'} V$ (its coefficients $\gamma P$ are non-negative). Applying it repeatedly, $U^\pi \le B^{\pi'} U^\pi \le (B^{\pi'})^2 U^\pi \le \cdots$, and the sequence converges to the fixed point $U^{\pi'}$ of $B^{\pi'}$ by the contraction property. So $U^\pi \le U^{\pi'}$.

(2) If the improvement step leaves $\pi$ unchanged, $\pi$ is greedy with respect to its own value: $U^\pi = B^\pi U^\pi = B U^\pi$. So $U^\pi$ is a fixed point of $B$, which by [[#thm-contraction]] is unique: $U^\pi = U^*$.

(3) If $\pi_{i+1} \ne \pi_i$, then at some state the new action has a strictly larger Q-value than the old one (by the tie-breaking rule), so $B^{\pi_{i+1}} U^{\pi_i} \ge U^{\pi_i}$ with strict inequality somewhere, and the argument of (1) shows $U^{\pi_{i+1}} \ge U^{\pi_i}$ with strict inequality at that state. So no policy repeats. There are $\prod_s \lvert A(s)\rvert$ deterministic policies, so the algorithm stops, and by (2) with an optimal policy.
:::

The bound in (3) is exponential, but in practice policy iteration needs very few iterations — often fewer than ten, even for large problems — each of which solves a linear system in $O(\lvert S\rvert^3)$ time (or approximately, by a few sweeps of [[#eq-bellman-policy]]: **modified policy iteration**). Exactly how many iterations policy iteration can need in the worst case was a long-standing question; for a fixed discount factor it is polynomial in the number of states and actions (Ye, 2011), while value iteration's running time depends on $1/(1 - \gamma)$.

::: example Policy iteration on the grid world {#ex-policy-iteration}
Run policy iteration on [[#ex-grid]] from the policy "always go west", evaluating each policy exactly.
::: solution
Policy evaluation solves an $11 \times 11$ linear system by Gaussian elimination (pure Python, a dozen lines); improvement is the greedy step.

```python
def evaluate(pi):
    """Solve U(s) = sum_s' P(s'|s,pi(s)) (STEP + GAMMA U(s')) exactly, a linear system."""
    idx = {s: i for i, s in enumerate(states)}; n = len(states)
    A = [[0.0] * n for _ in range(n)]; b = [0.0] * n
    for s in states:
        i = idx[s]; A[i][i] = 1.0
        if s in terminal: b[i] = terminal[s]; continue
        for p, t in transitions(s, pi[s]):
            A[i][idx[t]] -= GAMMA * p; b[i] += p * STEP
    x = solve(A, b)                                 # Gaussian elimination
    return {s: x[idx[s]] for s in states}

def policy_iteration():
    pi = {s: "W" for s in states if s not in terminal}      # a poor initial policy
    for k in range(1, 100):
        U = evaluate(pi); new = greedy(U)
        changed = sum(new[s] != pi[s] for s in pi)
        print(f"iteration {k}: U(start) = {U[(2, 0)]:.4f}, {changed} actions changed")
        if changed == 0: return pi, U
        pi = new
```

```console
$ python3 pi.py
iteration 1: U(start) = -0.4000, 7 actions changed
iteration 2: U(start) = -0.0566, 4 actions changed
iteration 3: U(start) = 0.2919, 2 actions changed
iteration 4: U(start) = 0.2965, 0 actions changed
 0.509E  0.650E  0.795E  1.000
 0.399N   ####  0.486N -1.000
 0.296N  0.254E  0.345N  0.130W
```

The "always west" policy never reaches the goal, so from the start it collects step costs for ever: $U = -0.04/(1 - 0.9) = -0.4$. Each improvement raises the value of the start, as [[#thm-policy-iteration]] promises, and after four evaluations the policy is stable and equal to the one found by value iteration, with the same values (now exact rather than within $10^{-4}$).
:::
:::

## Beyond fully observable MDPs

Real agents rarely know the state. In a **partially observable MDP** (POMDP) the agent receives observations through a sensor model, as in a hidden Markov model, and the optimal decision depends on the **belief state** — the distribution over states computed by the forward algorithm of [[artificial-intelligence/probabilistic-reasoning#thm-forward]]. A POMDP is an MDP whose states are beliefs: a continuous, high-dimensional state space, and solving it exactly is intractable in general (finite-horizon POMDPs are $\mathsf{PSPACE}$-complete, and infinite-horizon ones undecidable to solve exactly); practical solvers use point-based approximations or online tree search. **Factored MDPs** describe states by variables, as in planning, and represent transitions with dynamic Bayesian networks. And when the transition model and rewards are unknown, the agent must learn from experience — reinforcement learning.

::: history
Daniel Bernoulli resolved the St Petersburg paradox in 1738 by proposing that the utility of money is logarithmic. John von Neumann and Oskar Morgenstern's *Theory of Games and Economic Behavior* (1944; the utility axioms appeared in the second edition, 1947) founded modern utility theory, and Leonard Savage's *The Foundations of Statistics* (1954) combined subjective probability and utility. Ronald Howard's *Dynamic Programming and Markov Processes* (1960) introduced policy iteration, and Richard Bellman's *Dynamic Programming* (1957) the principle of optimality, the Bellman equation and value iteration. Howard also defined the value of information (1966). Ross Shachter's influence-diagram algorithms (1986) and the Russell–Wefald theory of metareasoning (1991) brought decision theory into AI. Ronald Williams and Leemon Baird bounded the policy loss of greedy policies in 1993, and Christos Papadimitriou and John Tsitsiklis proved the hardness of POMDPs in 1987. Yinyu Ye showed in 2011 that policy iteration is strongly polynomial for a fixed discount factor.
:::

## Where this leads

Value iteration and policy iteration need the model $P$ and $R$. [[artificial-intelligence/reinforcement-learning]] estimates values and policies from sampled experience instead, and its central algorithms — temporal-difference learning and Q-learning — are stochastic approximations of the Bellman updates of this chapter; their convergence proofs rest on the same contraction property. Multi-agent versions of MDPs are stochastic games, which combine this chapter with [[artificial-intelligence/adversarial-search]]. Dynamic programming in general is in [[algorithms/dynamic-programming]].

::: summary
- A rational agent maximises **expected utility** ([[#eq-meu]]); the **von Neumann–Morgenstern** axioms imply that consistent preferences are represented by a utility function, unique up to positive affine maps ([[#thm-vnm]]). Concave utility means risk aversion.
- The **value of perfect information** is never negative in expectation ([[#thm-vpi]]) and is positive only if the information can change the decision ([[#ex-vpi]]).
- An **MDP** ([[#def-mdp]]) has states, actions, a Markovian transition model, rewards and a discount; solutions are **policies**, and values satisfy the **Bellman equations** ([[#eq-bellman-policy]], [[#eq-bellman]]).
- The Bellman update is a **$\gamma$-contraction** in the max norm ([[#thm-contraction]]): value iteration converges geometrically to the unique fixed point $U^*$; stop when changes are below $\varepsilon(1 - \gamma)/\gamma$, and the greedy policy then loses at most $2\gamma\varepsilon/(1 - \gamma)$ ([[#cor-vi-stopping]]).
- **Policy iteration** evaluates and greedily improves; values never decrease and it terminates with an optimal policy ([[#thm-policy-iteration]]), usually in a handful of iterations.
- The discount and rewards define the problem: changing them changes the optimal policy.
:::

## Exercises

::: exercise Expected utility {level=1 check="16"}
In [[#ex-vpi]], what is the expected utility of launching without a survey? (Enter the expected utility.)
::: solution
$0.4 \cdot 100 + 0.6 \cdot (-40) = 40 - 24 = 16$. Not launching has expected utility $0$, so the firm launches.
:::
:::

::: exercise One Bellman update {level=1 check="0.68"}
In the grid world of [[#ex-grid]], start value iteration from $U_0 = 0$ for non-terminal states (terminal states have their utilities $+1$ and $-1$). What is the Q-value of action $E$ in state $(0, 2)$, next to the goal, after the first update? (Enter the Q-value.)
::: solution
Moving east reaches the goal with probability $0.8$; slipping north bumps into the edge and stays at $(0, 2)$ (probability $0.1$); slipping south reaches $(1, 2)$ (probability $0.1$). With $U_0 = 0$ for both non-terminal states,
$Q = 0.8\,(-0.04 + 0.9 \cdot 1) + 0.1\,(-0.04 + 0) + 0.1\,(-0.04 + 0) = 0.688 - 0.004 - 0.004 = 0.68$.
The other actions give $0.05$ ($N$ and $S$, which reach the goal only by slipping) and $-0.04$ ($W$), so $U_1(0, 2) = 0.68$.
:::
:::

::: exercise A certainty equivalent {level=1 check="400"}
An agent with utility $U(x) = \sqrt x$ faces a lottery paying £100 or £900 with probability $1/2$ each. What is its certainty equivalent, in pounds? (Enter the amount.)
::: solution
$\E U = \tfrac12(10 + 30) = 20$, so the certainty equivalent is $20^2 = 400$ pounds, against an expected monetary value of £500: a risk premium of £100.
:::
:::

::: exercise How many iterations? {level=1 check="66"}
Rewards lie in $[-1, 1]$ and $\gamma = 0.9$. Using $\lVert U_k - U^*\rVert \le \gamma^k R_{\max}/(1 - \gamma)$ (from $U_0 = 0$), what is the smallest $k$ that guarantees an error of at most $0.01$? (Enter $k$.)
::: solution
We need $0.9^k \cdot 10 \le 0.01$, i.e. $0.9^k \le 10^{-3}$, i.e. $k \ge \ln 1000 / \ln(1/0.9) = 6.9078/0.10536 = 65.56$. So $k = 66$. (The grid world needed far fewer iterations: its episodes end at terminal states, so the effective horizon is short. The bound is a worst case.)
:::
:::

::: exercise An imperfect survey {level=2 check="17.6"}
In [[#ex-vpi]], the survey is only $90\%$ accurate: it reports the true state of the market with probability $0.9$ and the wrong one with probability $0.1$. What is the expected value of the survey (the expected utility of deciding after seeing it, minus $16$)? (Enter the value.)
::: solution
$\Prob(\text{says good}) = 0.4 \cdot 0.9 + 0.6 \cdot 0.1 = 0.42$. Given "good", launching has expected utility $(0.36 \cdot 100 - 0.06 \cdot 40)/0.42 = 33.6/0.42 = 80 > 0$: launch. $\Prob(\text{says bad}) = 0.58$; given "bad", launching has $(0.04 \cdot 100 - 0.54 \cdot 40)/0.58 = -17.6/0.58 < 0$: do not launch, utility $0$. Expected utility with the survey: $0.42 \cdot 80 + 0.58 \cdot 0 = 33.6$. Value of the survey: $33.6 - 16 = 17.6$, less than the $24$ of a perfect survey, as it must be.
:::
:::

::: exercise Evaluating a policy {level=2 check="9"}
An MDP has states $A$ and $B$. Under policy $\pi$, from $A$ the agent moves to $B$ with probability $1$ and reward $0$; from $B$ it stays in $B$ with probability $1$ and reward $1$. With $\gamma = 0.9$, what is $U^\pi(A)$? (Enter the value.)
::: solution
From [[#eq-bellman-policy]]: $U(B) = 1 + 0.9\,U(B)$, so $U(B) = 1/(1 - 0.9) = 10$, and $U(A) = 0 + 0.9 \cdot 10 = 9$.
:::
:::

::: exercise The Q-values below the stairwell {#ex-grid-q level=2}
Using the optimal values printed in [[#ex-grid]], compute the four Q-values of state $(2, 3)$, and explain why $W$ is optimal with $\gamma = 0.9$ but $S$ is optimal with $\gamma = 0.5$.
::: solution
From $(2, 3)$: $N$ reaches the stairwell ($-1$) with probability $0.8$ and slips to $(2, 2)$ ($0.345$) or stays ($0.130$, east is the edge) with probability $0.1$ each; $S$ stays with probability $0.8$ (edge), slips west to $(2, 2)$ or east (stays) with $0.1$ each; $E$ stays with probability $0.8$, slips north into the stairwell or south (stays) with $0.1$ each; $W$ reaches $(2, 2)$ with probability $0.8$, slips north into the stairwell or south (stays) with $0.1$ each. With $Q = \sum p\,(-0.04 + 0.9\,U)$:
$Q(N) = 0.8(-0.94) + 0.1(0.2705) + 0.1(0.077) = -0.7173$;
$Q(S) = 0.9(0.077) + 0.1(0.2705) = 0.0963$;
$Q(E) = 0.9(0.077) + 0.1(-0.94) = -0.0247$;
$Q(W) = 0.8(0.2705) + 0.1(-0.94) + 0.1(0.077) = 0.1299$.
(Here $-0.04 + 0.9 \cdot 0.345 = 0.2705$ and $-0.04 + 0.9 \cdot 0.130 = 0.077$, using four-digit values.) So $W$ beats $S$ by about $0.034$: the $10\%$ risk of the stairwell costs $0.1 \cdot (0.077 + 0.94) \approx 0.10$, but reaching $(2, 2)$ with probability $0.8$ instead of $0.1$ gains $0.7 \cdot (0.2705 - 0.077) \approx 0.135$. With $\gamma = 0.5$ every future value is discounted much more heavily, the gain from progress shrinks below the immediate risk, and $S$ — the safe, useless move — becomes optimal.
:::
:::

::: exercise The greedy policy becomes optimal in finite time {level=3}
Let $Q^*(s, a)$ be the optimal Q-values of a finite MDP and suppose some state has a non-optimal action. Let $\Delta = \min \{ \max_b Q^*(s, b) - Q^*(s, a) : Q^*(s, a) < \max_b Q^*(s, b)\} > 0$. Prove that if $\lVert U_k - U^*\rVert < \Delta/(2\gamma)$, then every policy greedy with respect to $U_k$ is optimal. Conclude that value iteration finds an optimal policy after finitely many iterations, although its values converge only in the limit.
::: solution
Let $Q_k(s, a) = \sum_{s'} P(s' \mid s, a)[R(s, a, s') + \gamma U_k(s')]$. Then $\lvert Q_k(s, a) - Q^*(s, a)\rvert \le \gamma \lVert U_k - U^*\rVert < \Delta/2$ for every $s$, $a$. If $a$ is not optimal at $s$ and $b$ is optimal, $Q^*(s, b) - Q^*(s, a) \ge \Delta$, so $Q_k(s, b) - Q_k(s, a) > \Delta - \Delta/2 - \Delta/2 = 0$: the non-optimal action never attains the maximum of $Q_k$, and a greedy policy picks optimal actions everywhere. A policy that chooses an optimal action ($\arg\max Q^*$) in every state is optimal, because its value satisfies $B^\pi U^* = BU^* = U^*$, so $U^\pi = U^*$ by uniqueness of the fixed point of $B^\pi$. Since $\lVert U_k - U^*\rVert \le \gamma^k \lVert U_0 - U^*\rVert \to 0$ by [[#thm-contraction]], the condition holds for all $k$ beyond some finite $k_0$. (If every action is optimal in every state, every policy is optimal and there is nothing to prove.)
:::
:::

::: exercise Value iteration without discounting {level=3}
(a) Give an MDP with $\gamma = 1$ in which the Bellman operator is not a contraction and value iteration does not converge. (b) Explain why value iteration nevertheless converges for undiscounted problems in which every policy reaches a terminal state with probability $1$ (stochastic shortest-path problems), at least in the case where every policy reaches a terminal state within $n$ steps with probability at least $p > 0$ from every state.
::: solution
(a) One state $s$ with one action that returns to $s$ with reward $1$. Then $(BU)(s) = 1 + U(s)$, so $U_k(s) = k$ diverges, and $\lVert BU - BV\rVert = \lVert U - V\rVert$: not a contraction. (With reward $0$ the iterates stay put but every constant is a fixed point — no uniqueness.)

(b) Consider the $n$-fold operator $B^n$. Two value functions that agree on terminal states (where values are fixed) can differ only through the probability of not yet having terminated: for any policy, $\lvert (B^\pi)^n U(s) - (B^\pi)^n V(s)\rvert \le \Prob(\text{not terminated after } n \text{ steps}) \lVert U - V\rVert \le (1 - p)\lVert U - V\rVert$, and the same holds for $B$ by the max argument of [[#thm-contraction]] applied to $n$-step lookahead. So $B^n$ is a $(1 - p)$-contraction, and the iterates $U_{kn}$ converge geometrically, with the intermediate iterates following. The termination probability plays the role of the discount. (The general theory of stochastic shortest-path problems, due to Bertsekas and Tsitsiklis, needs only that improper policies have infinite cost.)
:::
:::
