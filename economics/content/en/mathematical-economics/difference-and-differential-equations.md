A harvest is planted in the spring and sold in the autumn. Farmers form a price expectation when they plant, based on last year's price; the harvest then meets demand and determines this year's price. If last year's price was high, this year's planting is large, this year's price is low, and next year's planting is small. The market **oscillates**. Whether the oscillations shrink toward equilibrium or explode away from it is a question about a **difference equation**.

The same mathematics, in continuous time, describes capital accumulation, inflation, and the adjustment of a price toward equilibrium. This chapter treats first-order linear difference and differential equations, their steady states and stability, the cobweb model, and a first look at the Solow growth model. Existence theory and the general solution of linear systems are in the [Maths Atlas ODE course](/a/maths/course.php?c=ode) and the [chapter on recurrences](/a/maths/lesson.php?c=discrete&l=recurrences).

## Linear difference equations

::: definition First-order linear difference equation {#def-diff}
A **first-order linear difference equation** with constant coefficients is

$$
x_{t+1} = a x_t + b, \qquad t = 0, 1, 2, \dots,
$$ {#eq-diff}

with $a, b$ given and $x_0$ given as an initial condition. A **steady state** (stationary solution, equilibrium of the recurrence) is a value $\bar x$ with $\bar x = a \bar x + b$. If $a \neq 1$, then $\bar x = b/(1-a)$.
:::

The deviation $\tilde x_t = x_t - \bar x$ satisfies $\tilde x_{t+1} = a \tilde x_t$, so $\tilde x_t = a^t \tilde x_0$ and

$$
x_t = \bar x + a^t (x_0 - \bar x).
$$ {#eq-diff-sol}

::: proposition Stability of a one-dimensional recurrence {#prop-stab-diff}
The solution [[#eq-diff-sol]] converges to $\bar x$ from every $x_0$ if and only if $\abs{a} < 1$. If $\abs{a} > 1$ the solution diverges (unless $x_0 = \bar x$). If $a = -1$ the solution oscillates with constant amplitude; if $a = 1$ and $b \neq 0$ there is no steady state and $x_t = x_0 + b t$ trends linearly.

When $-1 < a < 0$ the path oscillates *and* converges (damped cobweb). When $0 < a < 1$ it converges monotonically.
:::
::: proof
$\abs{a^t} \to 0$ iff $\abs{a} < 1$; $\abs{a^t} \to \infty$ iff $\abs{a} > 1$. The remaining claims are the four cases of the sign and size of $a$, read off [[#eq-diff-sol]].
:::

::: example A multiplier {#ex-multiplier}
National income follows $Y_{t+1} = c Y_t + I$, with $0 < c < 1$ the marginal propensity to consume and $I$ autonomous investment. Find the steady state and the path from $Y_0 = 0$.
::: solution
$\bar Y = I/(1-c)$, the Keynesian multiplier formula. Then $Y_t = \bar Y \bigl(1 - c^t\bigr)$, which rises toward $\bar Y$ because $0 < c < 1$. After one period $Y_1 = I$; after two, $Y_2 = cI + I$; the partial sums of the geometric series $I(1 + c + c^2 + \cdots)$ are the path. The same series appeared as a present-value sum in [[mathematical-economics/integration]]; here the ratio $c$ is a propensity, not a discount factor.
:::
:::

::: widget sequence
a: 100*(1 - 0.6**n)
N: 24
start: 0
mode: terms
limit: 100
y: 0, 120
caption: The Keynesian path $Y_t = 100(1-0.6^t)$ of [[#ex-multiplier]] with $c = 0.6$ and $\bar Y = 100$. Terms climb monotonically toward the steady state. Change the story in your head to $c = 0.9$: convergence is slower, the multiplier $1/(1-c)$ is larger, and more terms sit visibly below the limit.
:::

## The cobweb model

Let inverse demand be $p_t = \alpha - \beta q_t$ and let supply be $q_t = \gamma + \delta p_t^e$, with $\alpha, \beta, \delta > 0$. **Naive expectations** set $p_t^e = p_{t-1}$: farmers expect this year's price to equal last year's. Market clearing then gives

$$
p_t = \alpha - \beta(\gamma + \delta p_{t-1}) = \bigl(\alpha - \beta\gamma\bigr) - \beta\delta\, p_{t-1},
$$ {#eq-cobweb}

a recurrence $p_t = A + a p_{t-1}$ with $a = -\beta\delta < 0$. The steady state is the ordinary static equilibrium of demand and supply with $p^e = p$. Oscillation is built in because $a$ is negative: a high price produces a large harvest, which produces a low price, which produces a small harvest.

::: proposition Cobweb stability {#prop-cobweb}
Under naive expectations the cobweb [[#eq-cobweb]] converges to equilibrium if and only if $\beta \delta < 1$. In the Marshallian plane (price vertical), that is the case in which the inverse-supply curve is *steeper* than the inverse-demand curve. Equivalently, at equilibrium, the price elasticity of supply is smaller in absolute value than the price elasticity of demand.
:::
::: proof
Here $a = -\beta\delta$, so $\abs{a} = \beta\delta$, and [[#prop-stab-diff]] gives convergence iff $\beta\delta < 1$. Inverse demand has slope $-\beta$ and inverse supply has slope $1/\delta$; supply is steeper when $1/\delta > \beta$, which is $\beta\delta < 1$. Elasticities at a point $(q,p)$ are $\varepsilon_d = -(1/\beta)(p/q)$ and $\varepsilon_s = \delta (p/q)$, so $\abs{\varepsilon_s} < \abs{\varepsilon_d}$ iff $\delta < 1/\beta$ iff $\beta\delta < 1$.
:::

::: example A stable cobweb {#ex-cobweb}
Demand is $q = 80 - 2 p_{t}$ and supply is $q = 20 + p_{t-1}$ (naive expectations). Find the law of motion for price, the steady state, and the first four prices from $p_0 = 10$.
::: solution
Clearing: $80 - 2 p_t = 20 + p_{t-1}$, so $p_t = 30 - \tfrac12 p_{t-1}$. The steady state is $p = 30 - \tfrac12 p$, hence $\bar p = 20$ and $\bar q = 40$. Then $p_1 = 30 - 5 = 25$, $p_2 = 30 - 12.5 = 17.5$, $p_3 = 30 - 8.75 = 21.25$, $p_4 = 30 - 10.625 = 19.375$. The path is oscillating in toward 20, as $|a| = 1/2 < 1$ predicts.
:::
:::

::: widget cobweb
g: 30 - 0.5*x
x0: 10
steps: 16
x: 0, 40
y: 0, 40
sliders: x0=10:0:36:1
caption: The cobweb of [[#ex-cobweb]]: $p_t = 30 - \tfrac12 p_{t-1}$, graphed as iteration of $g(p) = 30-\tfrac12 p$ against the $45^\circ$ line. Starting at $10$, the staircase spirals into $\bar p = 20$. Try $x_0 = 30$: the same spiral, from the other side. (To see instability, imagine $g(p) = 30 - 1.5 p$; the widget’s $g$ is the stable case.)
:::

::: intuition A cobweb is a staircase
Draw inverse demand and inverse supply in the $(q,p)$-plane. From last period's price, read quantity off the supply curve (that is what was planted); from that quantity, read this period's price off the demand curve (that is what the harvest fetches); from this period's price, plant again. The picture is a staircase, bouncing between the two curves. If supply is steeper than demand the staircase spirals in; if demand is steeper it spirals out. The coefficient $a = -\beta\delta$ is the product of the two slopes, and $\abs{a} < 1$ is the staircase shrinking.
:::

::: warning Expectations are a hypothesis
Naive expectations are a modelling choice, not a fact. If farmers instead have **rational expectations**, $p_t^e = p_t$ (they solve the model), the cobweb collapses to the static equilibrium immediately and there is no oscillation. Adaptive expectations $p_t^e = p_{t-1}^e + \lambda (p_{t-1} - p_{t-1}^e)$ produce a different recurrence, stable under a weaker condition. The data on agricultural prices do show cobweb-like cycles in some markets and some periods (the hog cycle is the textbook case) and do not in others. Treat [[#eq-cobweb]] as a model of one expectations hypothesis.
:::

## Linear differential equations

In continuous time the analogue of [[#eq-diff]] is

$$
\dot x = r x + b,
$$ {#eq-de}

or, with a non-zero coefficient of $x$ written as $-\rho$ to match discounting, $\dot x + \rho x = c$.

::: definition First-order linear DE {#def-de}
The equation $\dot x(t) = r x(t) + b$, with $r, b$ constant and $x(0) = x_0$ given, is a **first-order linear differential equation**. If $r \neq 0$ the steady state is $\bar x = -b/r$. The solution is

$$
x(t) = \bar x + e^{rt}(x_0 - \bar x).
$$ {#eq-de-sol}
:::
::: proof
The homogeneous equation $\dot x = r x$ has solution $C e^{rt}$. A particular solution is the constant $\bar x = -b/r$. The general solution is the sum, and $C = x_0 - \bar x$ matches the initial condition. Alternatively, $\frac{\dd}{\dd t}\bigl(e^{-rt} x\bigr) = b e^{-rt}$; integrate from $0$ to $t$.
:::

::: proposition Stability of $\dot x = r x + b$ {#prop-stab-de}
The steady state is globally asymptotically stable if and only if $r < 0$: every solution converges to $\bar x$. If $r > 0$ the steady state is unstable (solutions run away, except the solution that starts at $\bar x$). If $r = 0$ and $b \neq 0$ there is no steady state.
:::

The sign of $r$ is the continuous-time analogue of $\abs{a} \lessgtr 1$. Capital that depreciates, inflation that mean-reverts, a price that is pulled toward equilibrium by excess demand with a negative slope — all have $r < 0$ once the model is written as [[#eq-de]].

::: example Continuous compounding and a deposit {#ex-ode-deposit}
A balance $B$ earns instantaneous return $r = 0.05$ and there is a continuous withdrawal of $10$ per year. If $B(0) = 100$, what is $B(t)$? Does the balance tend to a positive steady state?
::: solution
$\dot B = 0.05 B - 10$, so $r = 0.05 > 0$ and $\bar B = 10/0.05 = 200$. Then $B(t) = 200 + e^{0.05 t}(100-200) = 200 - 100 e^{0.05 t}$. Because $r > 0$ *and* $B_0 < \bar B$, the balance *falls*, hitting zero at $t = \ln 2 / 0.05 \approx 13.86$ years and going negative thereafter (which, for a bank balance, means the model has left its domain). A positive stable rest point would need a negative coefficient on $B$ — leakage larger than the return, as in a well with a hole.
:::
:::

::: widget odesolver
f: 0.05*y - 10
y0: 100
t: 0, 20
exact: 200 - 100*exp(0.05*t)
h: 1
methods: euler; rk4
caption: Numerical solution of $\dot B = 0.05 B - 10$, $B(0) = 100$, against the exact path $200 - 100 e^{0.05 t}$. Euler with step $1$ already sags below the true path; RK4 sits on it. The balance is heading for zero, not for the unstable rest point $200$.
:::

## The Solow equation

The Solow growth model in intensive form is the nonlinear equation

$$
\dot k = s k^{\alpha} - (\delta + n) k,
$$ {#eq-solow}

with $k$ capital per worker, $s \in (0,1)$ the saving rate, $\alpha \in (0,1)$ the capital elasticity, $\delta > 0$ depreciation and $n \ge 0$ population growth. (A full development is in [[economic-growth/solow-model]].) The steady state $\bar k = \bigl(s/(\delta+n)\bigr)^{1/(1-\alpha)}$ is unique and positive. Linearising about $\bar k$ gives $\dot{\tilde k} \approx \bigl(s \alpha \bar k^{\alpha-1} - (\delta+n)\bigr) \tilde k = -(1-\alpha)(\delta+n)\, \tilde k$, whose coefficient is negative, so the steady state is locally stable. In one dimension, with $\dot k > 0$ for $k < \bar k$ and $\dot k < 0$ for $k > \bar k$, it is globally stable on $k > 0$.

::: example A Solow number {#ex-solow}
Take $s = 0.3$, $\alpha = 1/2$, $\delta = 0.06$, $n = 0$. Find $\bar k$, and compute $\dot k$ at $k = 16$ and at $k = 36$.
::: solution
$\bar k = (0.3/0.06)^{1/(1-1/2)} = 5^2 = 25$. At $k = 16$, $\dot k = 0.3 \cdot 4 - 0.06\cdot 16 = 1.2 - 0.96 = 0.24 > 0$: capital is still accumulating. At $k = 36$, $\dot k = 0.3 \cdot 6 - 0.06\cdot 36 = 1.8 - 2.16 = -0.36 < 0$: capital is running down toward 25.
:::
:::

::: widget phaseplane
f: 0.3*x**(0.5) - 0.06*x
g: 0
x: 0.5, 50
y: -1, 1
nullclines: true
points: 16,0; 36,0
caption: The Solow law $\dot k = 0.3\sqrt{k} - 0.06 k$ plotted as a one-dimensional flow on the $k$-axis ($y$ is a dummy). The nullcline $\dot k = 0$ is the steady state $k = 25$. From $16$ the arrow points right; from $36$, left.
:::

Second-order linear equations $x_{t+2} + a x_{t+1} + b x_t = 0$, and planar systems $\dot{\mathbf{x}} = A \mathbf{x}$, are solved by eigenvalues. A steady state of a planar system is a sink, source, saddle or centre according to the trace and determinant of $A$ ([Maths Atlas](/a/maths/lesson.php?c=ode&l=linear-systems)). The Ramsey–Cass–Koopmans model of the next chapter has a saddle: one stable direction (the one the planner places the economy on) and one unstable direction.

::: quiz
The recurrence $p_{t+1} = 24 - 1.2 p_t$
- [ ] converges monotonically to $\bar p = 24/2.2$
- [ ] converges with oscillations to $\bar p = 24/2.2$
- [x] oscillates and diverges, because $\abs{a} = 1.2 > 1$
- [ ] has no steady state
::: solution
$\bar p = 24/(1+1.2) = 24/2.2 \approx 10.91$. The coefficient $a = -1.2$ has absolute value greater than 1, so [[#prop-stab-diff]] says divergence with oscillations: a cobweb on the wrong side of the stability bound.
:::
:::

A second-order linear recurrence $x_{t+2} + a x_{t+1} + b x_t = 0$ has solutions of the form $A r_1^t + B r_2^t$ when the characteristic roots $r_1, r_2$ are real and distinct, and $r^t (A + B t)$ when they are repeated. Complex roots $\rho e^{\pm i\omega}$ produce damped or explosive oscillations of period $2\pi/\omega$, damped when $\rho < 1$. Samuelson's multiplier–accelerator model is of this type: consumption is a fraction of lagged income and investment is proportional to the *change* in lagged income, and the resulting second-order equation for $Y_t$ can cycle. Whether the cycle is damped is a question about the product of the two parameters; the knife-edge of an undamped cycle is not a place a model should live without a good reason.

In continuous time the analogue is a linear system $\dot{\mathbf{x}} = A \mathbf{x}$. The origin is a sink if both eigenvalues have negative real part, a source if both have positive real part, a saddle if they have opposite signs, and a centre if they are pure imaginary. Nonlinear systems are classified by their linearisation, provided no eigenvalue has zero real part (Hartman–Grobman). The Solow diagram is the one-dimensional case; the Ramsey diagram of the next chapter is the saddle case, which is the typical geometry of a planner's problem with a state and a jump variable.

## Where this leads

Cobweb logic reappears in any model with a production lag and backward-looking expectations. The Solow equation is the workhorse of [[economic-growth]]; its phase diagram is the one-dimensional case of the Ramsey diagram. Overlapping-generation models and real-business-cycle models are higher-dimensional difference equations; New Keynesian models in continuous time are differential equations with a jump variable. Stability, saddles and the correspondence principle — using stability to sign a comparative static — are the link back to [[mathematical-economics/comparative-statics]]. The next chapter *chooses* a path, rather than taking the law of motion as given.

Forward-looking variables change the stability picture. In a New Keynesian model inflation is a jump variable: it is not inherited from yesterday, it is set by an Euler equation that looks into the future. The relevant solution is then the *non*-explosive path, selected by a terminal (transversality) condition rather than by an initial condition. A saddle, which looks unstable if every variable is a state, is exactly what one wants when some variables are free to jump. The next chapter takes that geometry as its starting point.

Discrete and continuous time are not interchangeable without comment. A continuous-time stability condition $r < 0$ and a discrete-time condition $\abs{a} < 1$ describe different objects: $a$ is a one-period gross multiplier, $r$ is an instantaneous rate. The map $a = e^{r\Delta t}$ converts one into the other for a given period length $\Delta t$. As $\Delta t \to 0$ the cobweb, which is intrinsically discrete (a harvest lag), does not become a differential equation; a price-adjustment equation $\dot p = \lambda\bigl(D(p)-S(p)\bigr)$ is intrinsically continuous and does not become a cobweb. Choose the time structure to match the economics, then apply the matching stability test.

A further distinction: in a differential equation the unknown is a *function* $x(t)$, and existence plus uniqueness (Picard–Lindelöf, given a Lipschitz $f$) give a unique path through each initial condition. In a difference equation uniqueness is free — the recurrence defines the next term — and existence is free on $\N$. What can fail is *positivity* or *boundedness*: a linear recurrence with $\abs{a} > 1$ leaves any economically relevant interval in finite time. Checking that a computed path stays in the domain (prices positive, capital positive, a balance non-negative) is part of solving the model, not an afterthought.

Nonlinear recurrences can do things linear ones cannot. The logistic map $x_{t+1} = r x_t (1-x_t)$, which appears as a simple model of a bounded population or of a cobweb with quadratic demand, is stable at its interior rest point for $r \in (1,3)$, then undergoes a cascade of period-doubling bifurcations, and at $r \approx 3.57$ becomes chaotic: paths from nearby initial conditions diverge, and the long-run average is described by an invariant density rather than by a cycle. Economics mostly stays on the linear, or linearised, side of this zoo — local stability of a steady state, a saddle path — because chaotic cobwebs are hard to take to data and because agents who understood the map would not keep using naive expectations. The possibility is worth knowing about: "the linearisation is stable" is a local statement, and a large shock can put the system somewhere the linearisation does not describe.

::: history
**1930, Umberto Ricci** and **1934, Henry Schultz / Jan Tinbergen / Wassily Leontief.** The cobweb model of agricultural prices was written down independently in several places; Mordecai Ezekiel’s 1938 *Quarterly Journal of Economics* paper is the English-language classic, complete with the stability condition $\beta\delta < 1$.

**1956, Robert Solow.** “A contribution to the theory of economic growth” (*QJE*) writes down [[#eq-solow]] and shows that a neoclassical production function produces a stable steady state, against the knife-edge of the Harrod–Domar model.

**1939, Paul Samuelson.** “Interactions between the multiplier analysis and the principle of acceleration” produces a second-order linear difference equation for national income, whose roots can be damped, explosive or (on a knife-edge) sinusoidal — the beginning of linear business-cycle theory.
:::

::: summary
- The linear recurrence $x_{t+1} = a x_t + b$ has steady state $\bar x = b/(1-a)$ (if $a \neq 1$) and solution $x_t = \bar x + a^t (x_0-\bar x)$. It converges iff $\abs{a} < 1$.
- The **cobweb** $p_t = A - \beta\delta\, p_{t-1}$ oscillates; it converges iff $\beta\delta < 1$ (supply steeper than demand in the Marshallian plane), under naive expectations.
- The linear DE $\dot x = r x + b$ has solution $\bar x + e^{rt}(x_0-\bar x)$ and is stable iff $r < 0$.
- The **Solow** equation $\dot k = s k^{\alpha} - (\delta+n)k$ has a unique positive steady state that is globally stable on $k > 0$.
:::

## Exercises

::: exercise A recurrence by hand {level=1}
Solve $x_{t+1} = 0.5 x_t + 6$ with $x_0 = 0$. Compute $x_1, x_2, x_3$ and $\bar x$.
::: solution
$\bar x = 6/0.5 = 12$. Then $x_t = 12\bigl(1 - 0.5^t\bigr)$, so $x_1 = 6$, $x_2 = 9$, $x_3 = 10.5$.
:::
:::

::: exercise Stability classification {level=1}
For each $a \in \{0.8,\ -0.8,\ 1.1,\ -1.1,\ -1\}$ describe the path of $x_{t+1} = a x_t + 1$ (monotonic/oscillatory, convergent/divergent) and give $\bar x$ when it exists.
::: solution
$\bar x = 1/(1-a)$ when $a \neq 1$. For $a = 0.8$, $\bar x = 5$, monotonic convergence. For $a = -0.8$, $\bar x = 1/1.8 = 5/9$, oscillatory convergence. For $a = 1.1$, $\bar x = -10$, monotonic divergence. For $a = -1.1$, $\bar x = 1/2.1 = 10/21$, oscillatory divergence. For $a = -1$, $\bar x = 1/2$, constant-amplitude oscillation about $1/2$.
:::
:::

::: exercise An unstable cobweb {level=1 check="12"}
Demand is $q = 80 - 2p_t$ and supply is $q = 20 + 3 p_{t-1}$. Find the steady-state price. (Enter the steady-state price.)
::: solution
Market clearing: $80 - 2p_t = 20 + 3 p_{t-1}$, so $p_t = 30 - 1.5 p_{t-1}$. The steady state satisfies $p = 30 - 1.5 p$, hence $2.5p = 30$ and $\bar p = 12$. Because $\abs{a} = 1.5 > 1$, the cobweb diverges.
:::
:::

::: exercise A differential equation {level=2}
Solve $\dot x = -0.2 x + 4$ with $x(0) = 0$. What is $x(10)$, and what is $\bar x$?
::: solution
$\bar x = 4/0.2 = 20$ and $r = -0.2 < 0$, so the rest point is stable. $x(t) = 20\bigl(1 - e^{-0.2 t}\bigr)$. Then $x(10) = 20\bigl(1 - e^{-2}\bigr) \approx 20 \times 0.8647 = 17.29$.
:::
:::

::: exercise Solow half-life {level=2}
In [[#ex-solow]], the linearised law is $\dot{\tilde k} \approx -(1-\alpha)(\delta+n)\tilde k = -0.03 \tilde k$. Starting from $k = 16$, how many years does the linearisation say it takes to close half the gap to $\bar k = 25$?
::: solution
$\tilde k(t) = \tilde k(0) e^{-0.03 t}$. Half-life satisfies $e^{-0.03 t} = 1/2$, so $t = \ln 2 / 0.03 \approx 23.1$ years. (The true nonlinear path is a little faster from below, because $s\sqrt{k}$ is concave and the linearisation is taken at $\bar k$.)
:::
:::

::: exercise Second-order characteristic roots {level=2}
Samuelson's multiplier–accelerator model can produce $Y_{t+2} - 1.2 Y_{t+1} + 0.8 Y_t = 0$. Find the characteristic roots. Are they inside the unit circle? Does the homogeneous path converge?
::: solution
The characteristic polynomial is $r^2 - 1.2 r + 0.8 = 0$. Discriminant $1.44 - 3.2 = -1.76 < 0$, so the roots are complex: $r = 0.6 \pm i\sqrt{0.44} = 0.6 \pm i\sqrt{11}/5$. The modulus is $\sqrt{0.8} \approx 0.894 < 1$, so the path is a damped oscillation and converges. (The modulus of the roots of $r^2 - a r + b = 0$ with complex roots is $\sqrt{b}$ when $b > 0$.)
:::
:::

::: exercise Phase line of Solow {level=3}
For [[#eq-solow]] with $n = 0$, show that $\dot k > 0$ on $(0, \bar k)$ and $\dot k < 0$ on $(\bar k, \infty)$. Deduce global stability on $k > 0$ without linearising.
::: hint
Factor $\dot k = k^\alpha \bigl( s - \delta k^{1-\alpha}\bigr)$ and use $\bar k^{1-\alpha} = s/\delta$.
:::
::: solution
$\dot k = k^\alpha \bigl( s - \delta k^{1-\alpha}\bigr)$ for $k > 0$. The term in parentheses is positive iff $k^{1-\alpha} < s/\delta$ iff $k < \bar k$. So $\dot k$ has the sign of $\bar k - k$. A solution starting in $(0, \bar k)$ is strictly increasing and bounded above (by $\bar k$), hence converges; the only possible limit is a zero of $\dot k$, i.e. $\bar k$. Starting above $\bar k$, the solution is strictly decreasing and bounded below by $\bar k$, hence converges to $\bar k$. The rest point $k = 0$ is unstable (solutions leave it immediately if $s > 0$).
:::
:::

::: exercise Rational versus naive {level=3}
In the market of [[#ex-cobweb]], suppose farmers have rational expectations: $p_t^e = p_t$. What is the path of price? Compare with the naive path from $p_0 = 10$. What information have the farmers been given that the naive farmers did not have?
::: solution
Supply is $q_t = 20 + p_t$ and demand is $q_t = 80 - 2p_t$, so $20 + p_t = 80 - 2p_t$, $3p_t = 60$, $p_t = 20$ in every period. The path is the constant equilibrium. The naive path from 10 was $10, 25, 17.5, 21.25, \ldots$, oscillating in. Rational farmers must know the demand curve and know that others are rational — they solve the model, they do not extrapolate last year's price. Whether that is descriptive is an empirical question; the mathematics only says what the two hypotheses imply.
:::
:::
