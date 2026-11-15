A student has a grant of 100, to be spent this year and next. Consuming more today is pleasant; so is consuming more tomorrow; tomorrow's consumption can be raised by saving, at a real interest rate of 10 per cent. How should the 100 be split? The question is a constrained optimisation problem, like those of [[mathematical-economics/constrained-optimisation]], except that the two goods are the same good at two dates, and a discount factor $\beta$ records impatience.

Once there are many dates, or a continuum of dates, substituting the constraints out becomes unmanageable. **Dynamic programming** replaces the many-variable problem by a sequence of two-period problems, linked by a **value function** that satisfies **Bellman's equation**. **Optimal control** does the same in continuous time, with a **Hamiltonian** and a co-state variable in the role of the Lagrange multiplier. This chapter is an introduction: two periods, the Bellman equation for a cake-eating problem, the Euler equation, and a sketch of the Ramsey planner. The graduate treatment is Stokey, Lucas and Prescott (1989); the growth application is [[economic-growth/ramsey-model]].

Numbers below are illustrative. They are not advice about saving, and they are not a forecast of any return.

## Two-period consumption

A household has wealth $m$ in period 1, faces a real interest rate $r$, and ranks streams by

$$
U(c_1, c_2) = u(c_1) + \beta u(c_2), \qquad 0 < \beta < 1,
$$

with $u$ strictly increasing and strictly concave. The budget is $c_1 + c_2/(1+r) = m$, or $c_2 = (1+r)(m-c_1)$. Substituting, the problem is unconstrained in $c_1$.

::: proposition Euler equation, two periods {#prop-euler-two}
At an interior optimum,

$$
u'(c_1) = \beta (1+r)\, u'(c_2).
$$ {#eq-euler-two}

The household saves up to the point at which the marginal utility of a unit consumed today equals the discounted marginal utility of the $(1+r)$ units that unit would become tomorrow.
:::
::: proof
Let $h(c_1) = u(c_1) + \beta u\bigl((1+r)(m-c_1)\bigr)$. Then $h'(c_1) = u'(c_1) - \beta(1+r) u'(c_2)$, and $h'(c_1) = 0$ is [[#eq-euler-two]]. The second derivative $h''(c_1) = u''(c_1) + \beta(1+r)^2 u''(c_2) < 0$ confirms a maximum.
:::

If $u(c) = \ln c$, the Euler equation becomes $c_2 / c_1 = \beta(1+r)$, so consumption grows when $\beta(1+r) > 1$ and shrinks when $\beta(1+r) < 1$. Combined with the budget,

$$
c_1^* = \frac{m}{1+\beta}, \qquad c_2^* = \beta(1+r)\, c_1^*.
$$ {#eq-log-two}

The interest rate drops out of $c_1^*$ for log utility: income and substitution effects on current consumption cancel. That is special to logs, not a general fact.

::: example A numerical split {#ex-two-period}
Let $u(c) = \ln c$, $\beta = 0.9$, $r = 0.1$, $m = 100$. Find $c_1^*$, $c_2^*$ and the implied saving.
::: solution
$c_1^* = 100/(1+0.9) = 1000/19 \approx 52.63$ and $c_2^* = 0.9 \times 1.1 \times c_1^* = 0.99\, c_1^* = 990/19 \approx 52.11$. Saving is $m-c_1^* \approx 47.37$, which grows to $52.11$. Because $\beta(1+r) = 0.99 < 1$, consumption falls slightly: impatience just outweighs the interest rate. These numbers illustrate [[#eq-log-two]]; they are not a recommendation.
:::
:::

::: widget plot
f: log(x) + 0.9*log(1.1*(100-x))
x: 5, 95
y: 6, 9
labels: \text{two-period utility } U(c_1)
caption: $U$ as a function of $c_1$ for [[#ex-two-period]]. The peak sits at $c_1 \approx 52.63$. Flatten $\beta$ in your head (more patience): the peak slides right, toward more saving. Raise $r$: for log utility the peak does not move, but $c_2$ rises.
:::

The same Euler equation is the first-order condition of a Lagrangian $\mathcal{L} = u(c_1)+\beta u(c_2) + \lambda\bigl(m - c_1 - c_2/(1+r)\bigr)$. The multiplier $\lambda = u'(c_1)$ is the marginal utility of wealth. With many periods the Lagrangian has one $\lambda_t$ per date; dynamic programming packages those multipliers into a single value function.

## Dynamic programming and the Bellman equation

Consider an infinite horizon, discrete time, with a **state** $w_t$ (wealth, capital, a cake) that is controlled by an **action** $c_t$ (consumption) and that evolves as $w_{t+1} = g(w_t, c_t)$. The household maximises $\sum_{t=0}^\infty \beta^t u(c_t)$ subject to that law and $w_0$ given. Under standard conditions (bounded $u$, or $u$ with a growth restriction, and a compact feasible set) a unique **value function** $V$ exists, and the problem from any date looks the same.

::: definition Bellman equation {#def-bellman}
The **value function** $V(w)$ is the maximised present value of utility, starting from state $w$. It satisfies **Bellman's equation**

$$
V(w) = \max_{c} \Bigl\{ u(c) + \beta V\bigl(g(w,c)\bigr) \Bigr\},
$$ {#eq-bellman}

where the maximisation is over actions feasible from $w$. A policy $c = \sigma(w)$ that attains the maximum is an **optimal policy**. Bellman's **principle of optimality** says that an optimal path from $w_0$ is given by iterating $\sigma$: take $c_0 = \sigma(w_0)$, move to $w_1 = g(w_0,c_0)$, take $c_1 = \sigma(w_1)$, and so on.
:::

The content of [[#eq-bellman]] is that the many-variable problem has been reduced to a two-period problem in which "tomorrow" is summarised by $V$. Tomorrow's $V$ is itself the value of an identical problem. The mathematical engine that produces a unique $V$ from [[#eq-bellman]] is the **contraction mapping theorem**: the Bellman operator $T v = \max_c \bigl\{u(c)+\beta v(g(w,c))\bigr\}$ is a contraction of modulus $\beta$ on a complete space of candidate value functions, hence has a unique fixed point, and iterating $T$ from any starting function converges to $V$. Details are in Stokey, Lucas and Prescott (1989, ch. 4) and in the [Maths Atlas chapter on metric spaces](/a/maths/lesson.php?c=real-analysis&l=metric-spaces).

::: example Cake eating {#ex-cake}
A cake of size $w$ can be eaten over infinitely many days. The law is $w' = w - c$, $0 \le c \le w$, and $u(c) = \ln c$. Guess that $V(w) = A + B \ln w$, and find $A$, $B$ and the optimal policy.
::: solution
Bellman: $V(w) = \max_{0 < c < w} \bigl\{\ln c + \beta \bigl(A + B \ln(w-c)\bigr)\bigr\}$. The first-order condition is $1/c = \beta B /(w-c)$, so $c = w/(1+\beta B)$ and $w-c = \beta B\, w/(1+\beta B)$. Substitute back:

$$
A + B \ln w = \ln\Bigl(\frac{w}{1+\beta B}\Bigr) + \beta A + \beta B \ln\Bigl(\frac{\beta B\, w}{1+\beta B}\Bigr).
$$

Equating coefficients of $\ln w$: $B = 1 + \beta B$, so $B = 1/(1-\beta)$. Then $c = (1-\beta) w$: the household eats a constant fraction of the remaining cake. The constant $A$ is $\bigl(\ln(1-\beta) + \tfrac{\beta}{1-\beta} \ln \beta\bigr)/(1-\beta)$, which we do not need for the policy. Check: with $\beta = 0.9$ and $w = 10$, $c = 1$ and the remainder is 9, then $0.9$, then $0.81$, a geometric sequence. Along the path $c_t = (1-\beta)\beta^t w = 0.9^t$, and $V(10) = A + B \ln 10$ with $B = 10$.
:::
:::

::: intuition Why a value function
With $T$ dates there are $T$ consumption choices and $T$ constraints. The Lagrangian works, but the number of first-order conditions grows with $T$, and the infinite-horizon problem has infinitely many. The value function $V(w)$ stores the whole future as a single number, a function of the current state. Today's problem then has one choice, $c$, and one constraint, the law of motion. Tomorrow is not ignored: it is inside $V$. That is why the same $V$ has to solve Bellman's equation — tomorrow's remaining problem *is* today's problem, started from a different $w$.
:::

::: warning The guess must be verified
Guessing $V(w) = A + B \ln w$ works because log utility and a linear constraint produce a value that is log in the state. For a different $u$, the guess is different (quadratic $u$ gives quadratic $V$; CRRA $u$ gives $V$ proportional to $w^{1-\theta}/(1-\theta)$). A guess that does not satisfy Bellman's equation is not a solution. The contraction-mapping argument says a solution exists even when one cannot guess it; one then computes $V$ by iterating $T$ numerically.
:::

::: widget sequence
a: 10*(0.9)**n
N: 30
start: 0
mode: terms
limit: 0
y: 0, 12
caption: Cake remaining $w_t = 10 \times 0.9^t$ under the optimal policy of [[#ex-cake]] with $\beta = 0.9$. Consumption is $c_t = w_t - w_{t+1} = 0.9^t$, the same geometric sequence. The cake is never finished in finite time; it is eaten asymptotically. Raise $\beta$ in your head: the sequence decays more slowly — more patience, more cake left for later.
:::

Differentiating Bellman's equation, using the envelope theorem of [[mathematical-economics/comparative-statics]], recovers the Euler equation in recursive form.

::: proposition Envelope and Euler {#prop-envelope-euler}
If $V$ is differentiable and the constraint is $w' = (1+r)(w-c)$ (a linear saving technology), then $V'(w) = (1+r) \beta V'(w')$ and the maximiser satisfies $u'(c) = \beta (1+r) u'(c')$, the infinite-horizon Euler equation.
:::
::: proof
The envelope theorem applied to [[#eq-bellman]] gives $V'(w) = \beta V'(w') \cdot \partial g/\partial w = \beta(1+r) V'(w')$. The first-order condition for $c$ is $u'(c) = \beta V'(w') \cdot (1+r)$. Combining, $u'(c) = V'(w)$, and substituting the envelope, $u'(c) = \beta(1+r) u'(c')$.
:::

That is [[#eq-euler-two]] at every date. Dynamic programming did not change the first-order condition; it organised the computation of $V$ and $\sigma$.

::: quiz
In the cake-eating problem with $u = \ln c$ and $0 < \beta < 1$, the optimal policy
- [ ] eats the whole cake in finite time
- [x] eats a constant fraction $1-\beta$ of the remaining cake each period
- [ ] eats a constant *amount* each period
- [ ] postpones all consumption to the infinite future
::: solution
[[#ex-cake]] gives $\sigma(w) = (1-\beta)w$. A constant amount would exhaust the cake in finite time and leave $u'(c) = +\infty$ at the last bite, violating the Euler equation. Postponing everything yields utility $-\infty$ because $\ln 0$ is not integrable against $\beta^t$ in a useful way; the household would prefer to eat a little today.
:::
:::

## A first look at optimal control

In continuous time the planner maximises $\int_0^\infty e^{-\rho t} u(c(t))\, \dd t$ subject to $\dot k = f(k) - c - \delta k$, $k(0)$ given. This is the **Ramsey problem**. The current-value **Hamiltonian** is

$$
H = u(c) + \mu \bigl(f(k) - c - \delta k\bigr),
$$ {#eq-hamiltonian}

where $\mu(t)$ is the **co-state** (the continuous-time Lagrange multiplier on the capital constraint, the shadow price of capital). The first-order conditions are

$$
\frac{\partial H}{\partial c} = 0 \quad\Rightarrow\quad u'(c) = \mu, \qquad \dot\mu = \rho\mu - \frac{\partial H}{\partial k} = \mu\bigl(\rho + \delta - f'(k)\bigr),
$$

together with the law of motion for $k$ and the **transversality** condition $\lim_{t\to\infty} e^{-\rho t} \mu(t) k(t) = 0$. Eliminating $\mu$ produces the **Keynes–Ramsey rule**

$$
\frac{\dot c}{c} = \frac{1}{\theta(c)}\bigl(f'(k) - \delta - \rho\bigr),
$$ {#eq-kr}

where $\theta(c) = -c u''(c)/u'(c)$ is the elasticity of marginal utility (the inverse IES). Consumption grows when the net marginal product of capital exceeds the discount rate.

The system $(\dot k, \dot c)$ in the $(k,c)$-plane has a unique positive steady state at $f'(\bar k) = \delta + \rho$ (the **modified golden rule**) and $\bar c = f(\bar k)-\delta\bar k$. The steady state is a **saddle**: one stable arm, which is the optimal path. The planner jumps $c(0)$ onto that arm; any other $c(0)$ violates transversality or feasibility. The phase diagram is the subject of [[economic-growth/ramsey-model]]; the linear algebra of saddles is in the [Maths Atlas](/a/maths/lesson.php?c=ode&l=linear-systems).

::: example A linear-quadratic sketch {#ex-lq}
Suppose $u(c) = - \tfrac12 (c-\bar c)^2$ near a bliss point and $f(k) = rk$ with $r$ constant (an AK technology, no diminishing returns). Then [[#eq-kr]] says $\dot c = 0$ if $r = \rho + \delta$ and $\dot c$ has the sign of $r-\rho-\delta$ otherwise. With no diminishing returns there is no interior modified golden rule for $k$: if $r > \rho+\delta$ consumption (and capital) grow forever; if $r < \rho+\delta$ they shrink. The AK model of endogenous growth lives in the first case. Diminishing returns, $f'' < 0$, are what produce a finite $\bar k$ in Ramsey.
:::

::: widget phaseplane
f: 0.4*x**(0.5) - 0.1*x - y
g: y*(0.2*x**(-0.5) - 0.1 - 0.05)
x: 0.4, 12
y: 0.05, 2.2
nullclines: true
points: 1.2, 0.4
caption: A Ramsey-like phase plane: $\dot k = 0.4\sqrt{k} - 0.1 k - c$ and $\dot c = c\bigl(0.2 k^{-1/2} - 0.15\bigr)$ (so $\rho+\delta = 0.15$). The $\dot c = 0$ nullcline is the vertical line $k = (0.2/0.15)^2 \approx 1.78$; the $\dot k = 0$ nullcline is the hump $c = 0.4\sqrt{k}-0.1k$. The crossing is a saddle. Starting at $(1.2, 0.4)$, watch whether the trajectory heads for the saddle or veers off; only one $c$ for each $k$ stays on the stable arm.
:::

::: example Transversality in a finite horizon {#ex-transversality}
A cake of size $w$ must be eaten in exactly $T$ days, with $u = \ln c$ and $\beta < 1$, and with no value attached to leftover cake. The Euler equation is still $1/c_t = \beta / c_{t+1}$, so $c_{t+1} = \beta c_t$, but the cake must now be exhausted: $\sum_{t=0}^{T-1} c_t = w$. Then $c_0 (1-\beta^T)/(1-\beta) = w$, hence $c_0 = (1-\beta)w/(1-\beta^T)$. As $T \to \infty$ this tends to $(1-\beta)w$, the infinite-horizon policy of [[#ex-cake]]. For finite $T$ the household eats a little more up front, because leftover cake at $T$ is worthless. That is transversality in miniature: the shadow price of cake at $T$, $\beta^T / c_T$, times leftover cake, must vanish, and with no salvage value it vanishes by exhausting the cake.
:::

The same logic, in continuous time, is $\lim_{t\to\infty} e^{-\rho t} \mu(t) k(t) = 0$. It rules out paths that accumulate capital forever for its own sake, and paths that hit $k = 0$ in finite time with $\mu$ exploding. Together with $k(0)$ given, transversality is what selects the stable arm of the Ramsey saddle.

::: remark Pontryagin and Bellman
The Hamiltonian conditions are **Pontryagin's maximum principle** (Pontryagin, Boltyanskii, Gamkrelidze and Mishchenko, *The Mathematical Theory of Optimal Processes*, English edition 1962). Bellman's equation is the discrete-time, or Hamilton–Jacobi–Bellman, approach. At an interior optimum they agree: $\mu = V'(k)$, and the co-state equation is the derivative of Bellman. Continuous-time problems with inequality constraints (irreversible investment, a zero lower bound) need complementary slackness on top, as in Kuhn–Tucker.
:::

## Where this leads

Two-period consumption is the workhorse of [[microeconomics/labour-and-intertemporal-choice]] and of a first course in [[macroeconomics/consumption-and-saving]]. The Bellman equation is the language of recursive competitive equilibrium in [[economic-growth/ramsey-model]], of real-business-cycle theory in [[business-cycles/real-business-cycles]], and of a large part of modern finance (the stochastic discount factor is a cousin of $u'(c)$). Optimal control is the language of the Ramsey planner, of a central bank's linear-quadratic problem, and of exhaustible-resource extraction in [[environmental-economics/non-renewable-resources]]. Probability, when the state is a random variable, is taught in the [Maths Atlas](/a/maths/course.php?c=probability); stochastic dynamic programming is the natural next step and is not taken here.

Time inconsistency is the reason a Bellman equation can fail even when the objective looks recursive. If the discount factor between today and tomorrow differs from the discount factor between tomorrow and the next day — $(\beta, \delta)$ present-biased preferences, or a hyperbolic $1/(1+\alpha t)$ — then the planner at $t$ and the planner at $t+1$ do not share a value function, and the solution is a game between successive selves, not a single Bellman equation. Strotz (1956) is the classic reference; the economic analysis is in [[behavioural-economics/present-bias]]. Standard exponential discounting $\beta^t$ is what makes [[#eq-bellman]] valid.

Stochastic dynamic programming replaces $V(g(w,c))$ by $\E\bigl[V(g(w,c,\varepsilon'))\bigm|w\bigr]$, an expectation over next period's shock. The Euler equation picks up the expectation: $u'(c) = \beta \E\bigl[(1+r') u'(c')\bigr]$. That is the consumption Euler equation of modern macroeconomics, and the asset-pricing equation of the consumption-CAPM once $1+r'$ is allowed to differ across assets. Certainty equivalence — the policy that ignores shocks is optimal — holds for linear-quadratic problems and not in general; precautionary saving (Kimball) is the leading extra term when $u''' > 0$. Probability is taught in the Maths Atlas; the economic structure is the same Bellman equation with an $\E$ in it.

::: history
**1928, Frank Ramsey.** “A mathematical theory of saving” (*Economic Journal*) writes down the planner's problem in continuous time and derives [[#eq-kr]], decades before optimal-control textbooks.

**1957, Richard Bellman.** *Dynamic Programming* states the principle of optimality and the functional equation [[#eq-bellman]]. The method came from engineering; economics took it up in the 1960s and made it the default language of recursive macroeconomics.

**1965, David Cass** and **1965, Tjalling Koopmans.** Their papers, building on Ramsey, give the complete phase diagram of [[#eq-kr]] with a neoclassical $f$, including the saddle path and the modified golden rule. Combined with Ramsey, this is the Ramsey–Cass–Koopmans model.

**1989, Nancy Stokey, Robert Lucas and Edward Prescott.** *Recursive Methods in Economic Dynamics* is the graduate standard for the contraction-mapping treatment of [[#eq-bellman]] and for stochastic recursive competitive equilibrium.
:::

::: summary
- Two-period consumption yields the **Euler equation** $u'(c_1) = \beta(1+r) u'(c_2)$. For log utility, $c_1 = m/(1+\beta)$.
- **Bellman's equation** $V(w) = \max_c \bigl\{u(c)+\beta V(g(w,c))\bigr\}$ reduces an infinite-horizon problem to a two-period one. The optimal policy attains the maximum; iterating it generates the path.
- The envelope theorem applied to Bellman recovers the Euler equation. In the cake-eating problem with log utility, $\sigma(w) = (1-\beta)w$.
- In continuous time the **Hamiltonian** $H = u(c) + \mu(f(k)-c-\delta k)$ produces $u'(c)=\mu$ and a co-state equation. Eliminating $\mu$ gives the **Keynes–Ramsey rule** for $\dot c$.
- The Ramsey steady state is a **saddle**. Transversality selects the stable arm.
:::

## Exercises

::: exercise Two-period arithmetic {level=1 check="50"}
With log utility, $\beta = 1$, $r = 0$ and $m = 100$, find $c_1^*$. (Enter $c_1^*$.)
::: solution
[[#eq-log-two]] gives $c_1^* = 100/(1+1) = 50$, and $c_2^* = 50$. Perfect patience and a zero interest rate split wealth equally.
:::
:::

::: exercise An Euler check {level=1}
With $u(c) = -1/c$, $\beta = 0.8$, $r = 0.25$ and $m = 20$, the Euler equation is $1/c_1^2 = \beta(1+r)/c_2^2$. Combined with the budget, find $c_1$ and $c_2$.
::: solution
$\beta(1+r) = 0.8 \times 1.25 = 1$, so $c_2 = c_1$. The budget $c_1 + c_2/1.25 = 20$ becomes $c_1(1+0.8) = 20$, $c_1 = 20/1.8 = 100/9 \approx 11.11$ and $c_2 = 100/9$. (Here $u'(c) = 1/c^2$, so $u'(c_1) = u'(c_2)$ when $c_1 = c_2$.)
:::
:::

::: exercise A three-period Lagrangian {level=1}
Write the Lagrangian for $\max \ln c_1 + \beta \ln c_2 + \beta^2 \ln c_3$ subject to $c_1 + c_2/(1+r) + c_3/(1+r)^2 = m$. Derive the two Euler equations.
::: solution
$\mathcal{L} = \ln c_1 + \beta \ln c_2 + \beta^2 \ln c_3 + \lambda\bigl(m - c_1 - c_2/(1+r) - c_3/(1+r)^2\bigr)$. Stationarity: $1/c_1 = \lambda$, $\beta/c_2 = \lambda/(1+r)$, $\beta^2/c_3 = \lambda/(1+r)^2$. Eliminating $\lambda$, $1/c_1 = \beta(1+r)/c_2$ and $1/c_2 = \beta(1+r)/c_3$. The same Euler equation holds between every adjacent pair of dates.
:::
:::

::: exercise Cake policy {level=2}
In [[#ex-cake]], let $\beta = 0.8$ and $w_0 = 25$. Compute $c_0, c_1, c_2$ and $w_3$.
::: solution
$\sigma(w) = 0.2 w$, so $c_0 = 5$, $w_1 = 20$, $c_1 = 4$, $w_2 = 16$, $c_2 = 3.2$, $w_3 = 12.8$. Each period the cake and consumption are multiplied by $\beta = 0.8$.
:::
:::

::: exercise Guess and verify, CRRA {level=2}
Let $u(c) = c^{1-\theta}/(1-\theta)$ with $\theta > 0$, $\theta \neq 1$, and $w' = w-c$. Guess $V(w) = A w^{1-\theta}/(1-\theta)$. Show that the optimal policy is still a constant fraction of the cake, and find the fraction.
::: hint
The first-order condition is $c^{-\theta} = \beta A (w-c)^{-\theta}$, so $c/(w-c) = (\beta A)^{-1/\theta}$.
:::
::: solution
FOC: $c^{-\theta} = \beta A (w-c)^{-\theta}$, hence $c = \kappa w$ with $\kappa = 1 / \bigl(1 + (\beta A)^{1/\theta}\bigr)$. Substitute into Bellman and equate coefficients of $w^{1-\theta}$: $A = \kappa^{1-\theta} + \beta A (1-\kappa)^{1-\theta}$. Combined with the FOC relation $(\beta A)^{1/\theta} = (1-\kappa)/\kappa$, one obtains $A = \bigl(1-\beta^{1/\theta}\bigr)^{-\theta}$ and $\kappa = 1 - \beta^{1/\theta}$. (For $\theta = 1$ this is $1-\beta$, matching the log case.) The household eats a larger fraction of the cake when it is less patient (smaller $\beta$) or when $\theta$ is smaller (more willing to substitute over time).
:::
:::

::: exercise A modified golden rule {level=2}
In the Ramsey model with $f(k) = k^{1/2}$, $\delta = 0.1$, $\rho = 0.05$, compute $\bar k$ and $\bar c$. Compare $\bar k$ with the golden-rule capital that maximises $\bar c = f(k)-\delta k$.
::: solution
Modified golden rule: $f'(\bar k) = \delta + \rho$, so $\tfrac12 \bar k^{-1/2} = 0.15$, $\bar k^{-1/2} = 0.3$, $\bar k = 1/0.09 \approx 11.11$. Then $\bar c = \sqrt{11.11} - 0.1\times 11.11 \approx 3.333 - 1.111 = 2.222$. The golden rule maximises $f(k)-\delta k$: $f'(k_g) = \delta$, $\tfrac12 k_g^{-1/2} = 0.1$, $k_g = 25$, with $c_g = 5 - 2.5 = 2.5$. Modified-golden-rule capital is lower, because the planner discounts: $\rho > 0$ makes future consumption less valuable, so the planner stops short of the consumption-maximising stock.
:::
:::

::: exercise Discrete Euler with CRRA {level=3}
Let $u(c) = c^{1-\theta}/(1-\theta)$. Write the two-period Euler equation and rearrange to $c_2/c_1 = \bigl(\beta(1+r)\bigr)^{1/\theta}$. Interpret $\theta$ as controlling the response of consumption growth to $r$.
::: solution
$u'(c) = c^{-\theta}$, so $c_1^{-\theta} = \beta(1+r) c_2^{-\theta}$, hence $(c_2/c_1)^\theta = \beta(1+r)$ and $c_2/c_1 = \bigl(\beta(1+r)\bigr)^{1/\theta}$. The elasticity of $c_2/c_1$ with respect to $1+r$ is $1/\theta$, the intertemporal elasticity of substitution. Small $\theta$ (linear $u$ in the limit $\theta \to 0$) makes consumption very sensitive to $r$; large $\theta$ makes the household determined to smooth, and $c_2/c_1$ barely moves. Log utility is $\theta = 1$.
:::
:::

::: exercise Why a saddle {level=3}
Linearise the Ramsey system near $(\bar k, \bar c)$: the Jacobian of $(\dot k, \dot c)$ has the form $\begin{pmatrix} f'(\bar k)-\delta & -1 \\ \bar c f''(\bar k)/\theta(\bar c) & 0 \end{pmatrix}$. Compute its determinant. Why does $\det < 0$ mean a saddle, and why does economics want a saddle here?
::: hint
$f'(\bar k)-\delta = \rho > 0$ at the modified golden rule, and $f'' < 0$.
:::
::: solution
$\det J = 0 \cdot \rho - (-1)\cdot \bar c f''(\bar k)/\theta(\bar c) = \bar c f''(\bar k)/\theta(\bar c)$. Now $\bar c > 0$, $\theta > 0$ and $f'' < 0$, so $\det J < 0$. A $2\times 2$ matrix with negative determinant has eigenvalues of opposite sign (product of eigenvalues equals the determinant): one stable and one unstable direction, a saddle. Economics wants a saddle because $k(0)$ is given (a state) while $c(0)$ is free (a jump variable). One degree of freedom is exactly enough to place the system on the stable arm. A sink would make every nearby $c(0)$ converge, so the optimum would not be pinned down by transversality; a source would make every path diverge.
:::
:::
