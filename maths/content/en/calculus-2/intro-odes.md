A cup of coffee at $90\,^\circ$C is left in a room at $20\,^\circ$C. How hot is it after ten minutes? A colony of bacteria doubles every hour while food lasts. How large is it after a day, and what happens when the food runs short? A bone contains $30\%$ of the carbon-14 it had when the animal died. How old is it?

None of these questions gives a formula for the unknown quantity directly. What each gives is a *rule for its rate of change*: the coffee cools at a rate proportional to its excess temperature over the room; the colony grows at a rate proportional to its size; carbon-14 decays at a rate proportional to the amount present. An equation relating an unknown function to its derivatives is a **differential equation**, and differential equations are the language in which the laws of physics, chemistry, biology and economics are written.

This chapter is a first look. We meet the basic vocabulary, learn to *see* solutions through slope fields, approximate them with Euler's method, solve the most important class of equations exactly — separable equations — and apply the results to exponential growth and decay, Newton's law of cooling and the logistic model of population growth. The systematic theory follows in the [[ode]] course.

## Differential equations and their solutions

::: definition Differential equation {#def-ode}
An **ordinary differential equation** (ODE) for an unknown function $y(x)$ is an equation involving $x$, $y$ and derivatives $y', y'', \dots$. Its **order** is the highest derivative that occurs. A **solution** on an interval $I$ is a function $y$, differentiable as often as the equation requires, that satisfies the equation at every point of $I$. A first-order **initial value problem** (IVP) is an equation $y' = f(x, y)$ together with an **initial condition** $y(x_0) = y_0$.
:::

Some first examples show the variety of behaviour.

- $y' = 2x$: the solutions are the antiderivatives $y = x^2 + C$. Integration is the simplest kind of differential equation.
- $y' = y$: the solutions are $y = Ce^x$ (proved below). Here the derivative depends on the unknown function itself.
- $y'' = -y$: solutions include $\sin x$, $\cos x$ and every combination $A\cos x + B\sin x$ (a second-order equation, studied in [[ode/second-order-linear]]).

A formula containing an arbitrary constant, such as $y = x^2 + C$, that describes all solutions is called the **general solution**; fixing the constant by an initial condition gives a **particular solution**.

::: example Checking a solution {#ex-verify}
Show that $y = Ce^{-x^2}$ solves $y' = -2xy$ for every constant $C$, and find the solution with $y(0) = 3$.
::: solution
By the chain rule, $y' = Ce^{-x^2}\cdot(-2x) = -2x\cdot Ce^{-x^2} = -2xy$, for all $x$. The initial condition gives $3 = Ce^0 = C$, so $y = 3e^{-x^2}$, a bell-shaped curve. (Checking a proposed solution needs only differentiation; *finding* it is the hard part.)
:::
:::

::: warning A solution lives on an interval
The equation $y' = y^2$ with $y(0) = 1$ has the solution $y = \frac{1}{1 - x}$, as you can check by differentiating. This solution exists only for $x < 1$: as $x \to 1^-$ it blows up to infinity, **in finite time**, although the equation itself looks perfectly harmless. The formula $\frac{1}{1-x}$ for $x > 1$ describes a *different* solution (one with $y(2) = -1$, say); the graph of $y = \frac{1}{1-x}$ is not "one solution with a gap". Always state the interval on which a solution is valid.
:::

## Slope fields

Even without solving $y' = f(x, y)$ we can see what its solutions look like. At each point $(x, y)$ the equation prescribes the slope $f(x, y)$ of any solution curve through that point. Drawing a short line segment with this slope at each point of a grid produces the **slope field** (or direction field). A solution curve is a curve that is tangent to the field at every one of its points — like a leaf carried along by a current.

::: example Reading a slope field {#ex-slope-field}
Sketch the slope field of $y' = x - y$, find a straight-line solution, and describe the long-term behaviour of all solutions.
::: solution
The slope is constant along each line $x - y = c$ (an **isocline**): slope $0$ on $y = x$, slope $1$ on $y = x - 1$, slope $-1$ on $y = x + 1$, and so on. On the line $y = x - 1$ the prescribed slope is $1$, which is also the slope of the line itself, so $y = x - 1$ is a solution: indeed $y' = 1 = x - (x - 1)$.

Above that line, $x - y < 1$, so solution curves are less steep than the line, and below it they are steeper; either way they approach it. In fact $y = x - 1 + Ce^{-x}$ is a solution for every $C$ (check: $y' = 1 - Ce^{-x}$ and $x - y = 1 - Ce^{-x}$), and $Ce^{-x} \to 0$ as $x \to\infty$: every solution is eventually close to the line $y = x - 1$.
:::
:::

::: widget slopefield
f: x - y
x: -3, 4
y: -3, 4
points: -2, 3; -2, -2; 0, 2; 0, -1
caption: The slope field of $y' = x - y$ with four solution curves. Click anywhere to start a new solution there. Every curve, whatever its starting point, bends towards the straight-line solution $y = x - 1$ and then runs alongside it — the slope field shows this without solving anything.
:::

An equation of the form $y' = f(y)$, in which $x$ does not appear explicitly, is called **autonomous**. Its slope field is the same along every horizontal line, and each zero $y^*$ of $f$ gives a constant solution $y = y^*$, an **equilibrium**. Between equilibria, solutions increase where $f(y) > 0$ and decrease where $f(y) < 0$, so a sign chart of $f$ tells the whole qualitative story.

A natural question is whether slope fields can mislead: could two solution curves cross, or could a solution through a point fail to exist? The fundamental theorem of the subject answers this.

::: theorem Existence and uniqueness {#thm-picard}
Suppose $f(x, y)$ and $\dfrac{\partial f}{\partial y}(x, y)$ are continuous on a rectangle containing $(x_0, y_0)$ in its interior. Then there is an interval $I$ around $x_0$ on which the initial value problem $y' = f(x, y)$, $y(x_0) = y_0$ has exactly one solution.
:::

::: proof {collapsed}
*Proof sketch.* Integrating, a solution is the same as a continuous function satisfying $y(x) = y_0 + \int_{x_0}^x f\bigl(t, y(t)\bigr)\,dt$. Starting from $y_0(x) = y_0$, define the **Picard iterates** $y_{n+1}(x) = y_0 + \int_{x_0}^x f\bigl(t, y_n(t)\bigr)\,dt$. The continuity of $\partial f/\partial y$ gives a bound $\abs{f(t, u) - f(t, v)} \le L\abs{u - v}$ (by the mean value theorem), from which one shows that on a short enough interval the iterates converge uniformly to a solution, and that any two solutions coincide. The full proof is in [[ode/existence-uniqueness]].
:::

Uniqueness has a vivid geometric meaning: **solution curves of such an equation never cross or touch**, because at a common point both would solve the same initial value problem. For example, a solution of $y' = x - y$ that starts above the line $y = x - 1$ stays above it for ever.

The hypothesis on $\partial f/\partial y$ cannot be dropped. For $y' = 3y^{2/3}$ with $y(0) = 0$, both $y = 0$ and $y = x^3$ are solutions (check: $(x^3)' = 3x^2 = 3(x^3)^{2/3}$), and here $\partial f/\partial y = 2y^{-1/3}$ is undefined at $y = 0$.

### Euler's method

The slope field suggests a way to *compute* an approximate solution: start at $(x_0, y_0)$, walk a short distance $h$ along the direction the field prescribes there, re-read the slope at the new point, and repeat.

::: algorithm Euler's method {#alg-euler}
To approximate the solution of $y' = f(x, y)$, $y(x_0) = y_0$, choose a step size $h > 0$ and compute, for $n = 0, 1, 2, \dots$,

$$
x_{n+1} = x_n + h, \qquad y_{n+1} = y_n + h\,f(x_n, y_n).
$$

Then $y_n \approx y(x_n)$.
:::

Each step replaces the solution curve by its tangent line, so each step makes an error of order $h^2$ (Taylor's theorem, [[calculus-2/taylor-series#thm-taylor]]); over $1/h$ steps these add up to an error of order $h$ at a fixed $x$. For $y' = y$, $y(0) = 1$, the method gives $y_{n+1} = (1 + h)y_n$, so after $n$ steps of size $h = \frac1n$ it reaches $y_n = \left(1 + \frac1n\right)^n$ at $x = 1$ — the sequence for $e$ from [[calculus-2/sequences#ex-e]]:

| step $h$ | $0.5$ | $0.25$ | $0.1$ | $0.01$ |
|---|---|---|---|---|
| Euler value at $x = 1$ | $2.25$ | $2.441\,41$ | $2.593\,74$ | $2.704\,81$ |
| error $e - y$ | $0.468$ | $0.277$ | $0.125$ | $0.013\,5$ |

Dividing $h$ by $10$ divides the error by about $10$: the error is proportional to $h$, which makes Euler's method simple but inefficient. Much better methods are developed in [[numerical-analysis/numerical-odes]].

::: widget odesolver
f: y
y0: 1
t: 0, 2
exact: exp(t)
h: 0.25
methods: euler
caption: Euler's method for $y' = y$, $y(0) = 1$ against the exact solution $e^t$. Each step follows the tangent of the solution through the current point, so the polygon falls further and further below the convex exponential. Halve the step size: the error at $t = 2$ roughly halves too — Euler's method is first-order accurate.
:::

## Separable equations

Most differential equations cannot be solved by a formula. An important class that can is the class of separable equations, in which the variables can be pulled to opposite sides.

::: definition Separable equation {#def-separable}
A first-order equation is **separable** if it can be written as

$$
\frac{dy}{dx} = g(x)\,h(y)
$$

for some functions $g$ of $x$ alone and $h$ of $y$ alone.
:::

For example, $y' = xy^2$, $y' = \frac{x}{y}$ and $y' = ky$ are separable; $y' = x + y$ is not. The informal recipe is to "separate the variables and integrate":

$$
\frac{dy}{h(y)} = g(x)\,dx \quad\Longrightarrow\quad \int\frac{dy}{h(y)} = \int g(x)\,dx .
$$

Manipulating $dy$ and $dx$ as if they were numbers needs justification, which the chain rule provides.

::: theorem Solving separable equations {#thm-separable}
Let $g$ be continuous on an interval $I$ and $h$ continuous and non-zero on an interval $J$. Let $G$ be an antiderivative of $g$ and $H$ an antiderivative of $\frac1h$. A differentiable function $y\colon I \to J$ solves $y' = g(x)h(y)$ if and only if

$$
H\bigl(y(x)\bigr) = G(x) + C \qquad\text{for all } x \in I
$$ {#eq-separable}

for some constant $C$. In addition, every zero $y^*$ of $h$ gives a constant solution $y = y^*$.
:::

::: proof
Since $h(y(x)) \ne 0$, the equation $y'(x) = g(x)h(y(x))$ is equivalent to $\dfrac{y'(x)}{h(y(x))} = g(x)$. By the chain rule, the left side is $\dfrac{d}{dx}H\bigl(y(x)\bigr)$. So $y$ is a solution if and only if $\frac{d}{dx}\bigl[H(y(x)) - G(x)\bigr] = 0$ on $I$, which, by the mean value theorem, holds if and only if $H(y(x)) - G(x)$ is constant. Finally, if $h(y^*) = 0$ then the constant function $y = y^*$ has $y' = 0 = g(x)h(y^*)$.
:::

The relation [[#eq-separable]] defines $y$ **implicitly**; since $H' = 1/h$ is never zero on $J$, $H$ is strictly monotone and can be inverted, at least in principle, to give $y$ explicitly.

::: example A separable equation with blow-up {#ex-separable}
Solve $y' = xy^2$ with $y(0) = 1$, and find the largest interval on which the solution exists.
::: solution
Here $g(x) = x$ and $h(y) = y^2$, non-zero for $y \ne 0$. Separating,

$$
\int\frac{dy}{y^2} = \int x\,dx \quad\Longrightarrow\quad -\frac1y = \frac{x^2}{2} + C .
$$

At $x = 0$, $y = 1$: $-1 = C$. So $\frac1y = 1 - \frac{x^2}{2} = \frac{2 - x^2}{2}$ and

$$
y = \frac{2}{2 - x^2}.
$$

The solution must be differentiable on an interval containing $0$, and the formula blows up at $x = \pm\sqrt2$, so the solution exists exactly on $(-\sqrt2, \sqrt2)$. Check: $y' = \frac{4x}{(2 - x^2)^2} = x\left(\frac{2}{2-x^2}\right)^2 = xy^2$. (The equilibrium $y = 0$ is the solution with $y(0) = 0$; by uniqueness, no other solution can touch it.)
:::
:::

::: warning Do not lose the constant solutions
Dividing by $h(y)$ is only allowed where $h(y) \ne 0$. The constant solutions $y = y^*$ with $h(y^*) = 0$ are easily lost and are often exactly the most important ones — the equilibria of a model. Also add the constant of integration *at the moment of integrating*: writing $-\frac1y = \frac{x^2}{2}$ and only then "adding $C$" to the final formula ($y = \frac{-2}{x^2} + C$) gives wrong answers.
:::

::: quiz
Which of these equations are separable? (Select all that apply.)
- [x] $y' = e^{x + y}$
- [ ] $y' = x + y$
- [x] $y' = \dfrac{\sin x}{y^2 + 1}$
- [x] $y' = y(1 - y)$
::: solution
$e^{x+y} = e^x\cdot e^y$ separates. $\frac{\sin x}{y^2+1} = \sin x\cdot\frac{1}{y^2+1}$ separates. $y(1 - y)$ depends on $y$ alone (take $g(x) = 1$), so every autonomous equation is separable. But $x + y$ cannot be written as a product $g(x)h(y)$: it is a *linear* equation, solved by an integrating factor in [[ode/first-order]].
:::
:::

## Exponential growth and decay

The simplest and most important differential equation says that a quantity changes at a rate proportional to its size:

$$
\frac{dy}{dt} = ky .
$$ {#eq-exp-growth}

For $k > 0$ this models unrestricted growth (populations with unlimited resources, compound interest, chain reactions); for $k < 0$, decay (radioactive nuclei, drug concentrations, discharging capacitors). The separation recipe gives $\ln\abs y = kt + C$, but division by $y$ is suspect when $y$ might vanish; a direct argument is cleaner and proves that there are no other solutions.

::: theorem Solutions of y′ = ky {#thm-exp-growth}
For a constant $k$, the solutions of $y' = ky$ on $\R$ are exactly the functions $y(t) = Ce^{kt}$, $C \in \R$. The solution with $y(0) = y_0$ is $y = y_0e^{kt}$.
:::

::: proof
Each $Ce^{kt}$ is a solution, since $\frac{d}{dt}Ce^{kt} = kCe^{kt}$. Conversely, let $y$ be any solution and put $u(t) = y(t)e^{-kt}$. Then

$$
u'(t) = y'(t)e^{-kt} - ky(t)e^{-kt} = \bigl(y'(t) - ky(t)\bigr)e^{-kt} = 0 ,
$$

so $u$ is a constant $C$ by the mean value theorem, and $y = Ce^{kt}$. Setting $t = 0$ gives $C = y_0$.
:::

For decay ($k < 0$) the **half-life** $T_{1/2}$ is the time in which the quantity halves: $e^{kT_{1/2}} = \frac12$ gives $T_{1/2} = \frac{\ln 2}{\abs k}$. For growth the **doubling time** is $\frac{\ln2}{k}$. Both are independent of the starting amount — the signature of exponential behaviour.

::: example Radiocarbon dating {#ex-carbon}
Carbon-14 has a half-life of $5730$ years. A bone contains $30\%$ of the carbon-14 of living tissue. Estimate its age.
::: solution
The amount satisfies $N = N_0e^{kt}$ with $k = -\frac{\ln2}{5730}$. We need $e^{kt} = 0.3$, so

$$
t = \frac{\ln 0.3}{k} = \frac{5730\,\ln(1/0.3)}{\ln2} = \frac{5730\times1.2040}{0.6931} \approx 9950 \text{ years}.
$$

(Real radiocarbon dates are then calibrated, because the proportion of carbon-14 in the atmosphere has not been exactly constant over time.)
:::
:::

**Newton's law of cooling** says that a body cools at a rate proportional to the difference between its temperature $T$ and the ambient temperature $T_a$: $T' = -k(T - T_a)$ with $k > 0$. The substitution $u = T - T_a$ turns this into $u' = -ku$, so by [[#thm-exp-growth]]

$$
T(t) = T_a + (T_0 - T_a)e^{-kt}.
$$ {#eq-cooling}

::: example A cooling cup of coffee {#ex-coffee}
Coffee at $90\,^\circ$C is placed in a room at $20\,^\circ$C. After $5$ minutes it is at $70\,^\circ$C. When will it reach $50\,^\circ$C?
::: solution
By [[#eq-cooling]], $T(t) = 20 + 70e^{-kt}$. From $T(5) = 70$: $70e^{-5k} = 50$, so $k = \frac15\ln\frac75 \approx 0.0673$ per minute. Then $T(t) = 50$ requires $70e^{-kt} = 30$, so

$$
t = \frac{\ln(7/3)}{k} = \frac{5\ln(7/3)}{\ln(7/5)} \approx 12.6 \text{ minutes}.
$$

Note that the first $20$ degrees of cooling took $5$ minutes but the next $20$ take about $7.6$: the closer the coffee is to room temperature, the slower it cools.
:::
:::

## The logistic model

Exponential growth cannot last: no population grows for ever. In 1838 Verhulst proposed that the per-capita growth rate should decrease linearly as the population $P$ approaches a **carrying capacity** $K$ set by the available resources:

$$
\frac{dP}{dt} = rP\left(1 - \frac PK\right), \qquad r > 0,\; K > 0 .
$$ {#eq-logistic}

When $P$ is small compared with $K$, the factor $1 - P/K$ is close to $1$ and growth is nearly exponential with rate $r$. As $P$ approaches $K$ growth slows down, and if $P > K$ the population declines.

**Qualitative analysis.** The equation is autonomous with $f(P) = rP(1 - P/K)$. Its equilibria are $P = 0$ and $P = K$. For $0 < P < K$, $f(P) > 0$, so solutions increase; for $P > K$, $f(P) < 0$, so they decrease. Solutions near $K$ move towards it — $K$ is a **stable** equilibrium — while solutions near $0$ (with $P > 0$) move away — $0$ is **unstable**. Moreover

$$
\frac{d^2P}{dt^2} = f'(P)\frac{dP}{dt} = r\left(1 - \frac{2P}{K}\right)f(P),
$$

so for $0 < P < K$ the graph of $P(t)$ is concave up while $P < \frac K2$ and concave down afterwards: growth is fastest when the population is at half the carrying capacity. These are the famous S-shaped (sigmoid) curves.

::: widget slopefield
f: y*(1 - y)
x: 0, 10
y: -0.3, 1.6
points: 0, 0.05; 0, 0.3; 0, 1.5; 0, 0.7
caption: The logistic equation $y' = y(1-y)$ ($r = 1$, $K = 1$). Solutions starting between $0$ and $\frac12$ follow S-shaped curves up to the stable equilibrium $y = 1$, steepest where they cross $y = \frac12$; those starting between $\frac12$ and $1$ are concave down throughout; solutions above $1$ decay down to $1$. Click below $y = 0$ to see the (biologically meaningless) solutions that run away from the unstable equilibrium $y = 0$.
:::

::: theorem Solution of the logistic equation {#thm-logistic}
For $P(0) = P_0 > 0$, the solution of [[#eq-logistic]] is

$$
P(t) = \frac{K}{1 + A e^{-rt}}, \qquad A = \frac{K - P_0}{P_0},
$$ {#eq-logistic-solution}

defined for all $t \ge 0$, and $P(t) \to K$ as $t \to \infty$.
:::

::: proof
If $P_0 = K$ then $A = 0$ and $P \equiv K$, the equilibrium. Otherwise the solution never takes the values $0$ or $K$ (uniqueness, [[#thm-picard]]: it cannot meet the equilibrium solutions), so by [[#thm-separable]] it satisfies $\int\frac{dP}{P(1 - P/K)} = \int r\,dt$. Partial fractions give $\frac{1}{P(1 - P/K)} = \frac{K}{P(K - P)} = \frac1P + \frac{1}{K - P}$, so

$$
\ln\abs{P} - \ln\abs{K - P} = rt + C, \qquad\text{that is}\qquad \abs{\frac{K - P}{P}} = e^{-C}e^{-rt}.
$$

The quantity $\frac{K - P}{P}$ is continuous and never zero, so it has constant sign, equal to its sign at $t = 0$. Hence $\frac{K - P}{P} = Ae^{-rt}$ with $A = \frac{K - P_0}{P_0}$, and solving for $P$ gives [[#eq-logistic-solution]]. Since $P_0 > 0$ we have $A > -1$, so $1 + Ae^{-rt} > 0$ for all $t \ge 0$ and the formula is defined there; as $t \to\infty$, $Ae^{-rt} \to 0$ and $P(t) \to K$.
:::

::: example A logistic population {#ex-logistic}
A population with carrying capacity $K = 1000$ and growth rate $r = 0.5$ per year starts at $P_0 = 100$. When does it reach $500$, and when $900$?
::: solution
Here $A = \frac{1000 - 100}{100} = 9$, so $P(t) = \dfrac{1000}{1 + 9e^{-0.5t}}$. $P = 500$ requires $1 + 9e^{-0.5t} = 2$, i.e. $e^{-0.5t} = \frac19$, so $t = 2\ln9 \approx 4.39$ years. This is the inflection point, where growth is fastest. $P = 900$ requires $1 + 9e^{-0.5t} = \frac{10}{9}$, i.e. $e^{-0.5t} = \frac1{81}$, so $t = 2\ln 81 \approx 8.79$ years — exactly twice as long, by the symmetry of the S-curve about its inflection point.
:::
:::

::: quiz
For the autonomous equation $y' = y(y - 2)$, which statement is correct?
- [ ] Both equilibria $y = 0$ and $y = 2$ are stable.
- [x] $y = 0$ is stable and $y = 2$ is unstable.
- [ ] $y = 0$ is unstable and $y = 2$ is stable.
- [ ] Solutions starting at $y(0) = 1$ increase to $2$.
::: solution
Sign chart of $f(y) = y(y-2)$: positive for $y < 0$, negative for $0 < y < 2$, positive for $y > 2$. So solutions just below $0$ increase towards $0$ and solutions between $0$ and $2$ decrease towards $0$: $y = 0$ attracts from both sides (stable). Near $2$, solutions below decrease away from $2$ and solutions above increase away from it: unstable. The solution with $y(0) = 1$ decreases to $0$.
:::
:::

::: application Logistic curves beyond biology
The logistic equation appears whenever growth is proportional both to what has happened and to what remains. In the simplest model of an epidemic, the rate of new infections is proportional to the number of contacts between infected people $I$ and susceptible people $N - I$, giving $I' = \beta I(N - I)$, a logistic equation. The same S-curve describes the spread of rumours and the adoption of new technologies, and the logistic function $\frac{1}{1 + e^{-z}}$ is the basis of logistic regression in statistics and of activation functions in neural networks. In 1920 Raymond Pearl and Lowell Reed fitted a logistic curve to the population of the United States; such fits work over limited periods, but real carrying capacities change with technology.
:::

::: history
Differential equations were born with calculus: Newton classified first-order equations in his *Method of Fluxions* (written in 1671), and Leibniz found the method of separation of variables in 1691. Newton's law of cooling appeared, anonymously, in the *Philosophical Transactions* of 1701. Leonhard Euler described the numerical method that bears his name in his *Institutiones calculi integralis* (1768). Thomas Malthus argued in 1798 that populations grow geometrically while food supplies do not, and Pierre-François Verhulst answered with the logistic equation in 1838; it was largely forgotten until Pearl and Reed rediscovered it in 1920. Radiocarbon dating was developed by Willard Libby in the late 1940s and earned him the Nobel Prize in Chemistry in 1960.
:::

## Where this leads

The [[ode]] course develops the subject systematically: linear first-order equations and integrating factors ([[ode/first-order]]), the existence and uniqueness theorem with its proof ([[ode/existence-uniqueness]]), second-order linear equations for oscillations ([[ode/second-order-linear]]), and systems of equations, where the logistic model grows into predator–prey and competition models ([[ode/nonlinear-systems]]). Euler's method is the first of the numerical methods in [[numerical-analysis/numerical-odes]], where Runge–Kutta methods reduce the error from order $h$ to order $h^4$. Equations whose unknowns depend on several variables, such as the heat equation, are partial differential equations ([[pde/heat-equation]]).

::: summary
- A differential equation relates a function to its derivatives; a solution must satisfy it on an interval, and an initial condition picks one solution from the family.
- The slope field of $y' = f(x, y)$ shows solution curves without solving; under mild conditions solutions exist and are unique, so solution curves never cross.
- Euler's method $y_{n+1} = y_n + hf(x_n, y_n)$ follows the slope field in steps; its error at a fixed point is proportional to $h$.
- Separable equations $y' = g(x)h(y)$ are solved by $\int\frac{dy}{h(y)} = \int g(x)\,dx$; do not lose the constant solutions where $h(y) = 0$.
- $y' = ky$ has exactly the solutions $y = Ce^{kt}$; half-life and doubling time are $\ln 2/\abs k$. Newton's law of cooling reduces to this equation.
- The logistic equation $P' = rP(1 - P/K)$ has S-shaped solutions $\frac{K}{1 + Ae^{-rt}}$ tending to the stable equilibrium $K$, with fastest growth at $P = K/2$.
:::

## Exercises

::: exercise Verifying a solution {level=1}
Show that $y = A\cos 2x + B\sin 2x$ solves $y'' + 4y = 0$ for all constants $A$, $B$, and find the solution with $y(0) = 1$, $y'(0) = 4$.
::: solution
$y' = -2A\sin 2x + 2B\cos2x$ and $y'' = -4A\cos2x - 4B\sin2x = -4y$, so $y'' + 4y = 0$. From $y(0) = A = 1$ and $y'(0) = 2B = 4$ we get $B = 2$: $y = \cos 2x + 2\sin 2x$.
:::
:::

::: exercise Exponential growth {level=1 check="2*e^3"}
Solve $y' = 3y$ with $y(0) = 2$ and give $y(1)$.
::: solution
By [[#thm-exp-growth]], $y = 2e^{3t}$, so $y(1) = 2e^3 \approx 40.17$.
:::
:::

::: exercise A half-life {level=1 check="ln(2)/ln(10/9)"}
A substance loses $10\%$ of its mass every year. Find its half-life in years.
::: solution
After $t$ years the mass is $m_0(0.9)^t = m_0e^{t\ln0.9}$, so $k = \ln 0.9$ and the half-life is $\frac{\ln2}{\abs k} = \frac{\ln 2}{\ln(10/9)} \approx 6.58$ years.
:::
:::

::: exercise A tangent solution {level=2}
Solve $y' = 1 + y^2$ with $y(0) = 0$ and find the largest interval on which the solution exists.
::: solution
The equation is separable with $h(y) = 1 + y^2 \ne 0$: $\int\frac{dy}{1+y^2} = \int dx$ gives $\arctan y = x + C$, and $y(0) = 0$ gives $C = 0$. So $\arctan y = x$, which requires $-\frac\pi2 < x < \frac\pi2$, and then $y = \tan x$. The solution blows up at $x = \pm\frac\pi2$, so its largest interval of existence is $\left(-\frac\pi2, \frac\pi2\right)$ — although $1 + y^2$ is defined and smooth everywhere.
:::
:::

::: exercise A mixing tank {level=2 check="20*exp(-1/2)"}
A tank holds $100$ litres of brine containing $20$ kg of dissolved salt. Pure water flows in at $5$ litres per minute and the well-stirred mixture flows out at the same rate. How much salt is in the tank after $10$ minutes?
::: solution
Let $S(t)$ be the salt in kg. The concentration is $\frac{S}{100}$ kg per litre, and salt leaves at $5\cdot\frac{S}{100} = \frac{S}{20}$ kg per minute, while none enters. So $S' = -\frac{1}{20}S$, $S(0) = 20$, giving $S(t) = 20e^{-t/20}$. After $10$ minutes $S = 20e^{-1/2} \approx 12.13$ kg.
:::
:::

::: exercise Fitting a logistic model {level=2 check="2*ln(9)/ln(9/4)"}
A population follows the logistic equation with carrying capacity $500$. It starts at $50$ and is $100$ after $2$ years. When does it reach $250$?
::: solution
With $K = 500$ and $P_0 = 50$, $A = \frac{450}{50} = 9$ and $P(t) = \frac{500}{1 + 9e^{-rt}}$. From $P(2) = 100$: $1 + 9e^{-2r} = 5$, so $e^{-2r} = \frac49$ and $r = \frac12\ln\frac94 \approx 0.405$. Then $P = 250$ when $9e^{-rt} = 1$, i.e. $t = \frac{\ln 9}{r} = \frac{2\ln9}{\ln(9/4)} \approx 5.42$ years.
:::
:::

::: exercise Euler by hand {level=2}
Apply Euler's method with $h = 0.25$ to $y' = y$, $y(0) = 1$, to estimate $y(1)$. Compare with $e$, and explain why the estimate is too small.
::: solution
Each step multiplies by $1 + h = 1.25$: $y_1 = 1.25$, $y_2 = 1.5625$, $y_3 = 1.953\,125$, $y_4 = 2.441\,406$. The true value is $e \approx 2.718\,28$, so the error is about $0.277$. The estimate is too small because the solution $e^t$ is convex: each tangent line lies *below* the curve, so each step falls short, and the shortfalls accumulate.
:::
:::

::: exercise Non-uniqueness {level=3}
Show that the initial value problem $y' = 2\sqrt{\abs y}$, $y(0) = 0$ has infinitely many solutions on $\R$. Which hypothesis of [[#thm-picard]] fails?
::: hint
For each $c \ge 0$, consider the function equal to $0$ for $x \le c$ and to $(x - c)^2$ for $x > c$.
:::
::: solution
For $c \ge 0$ let $y_c(x) = 0$ for $x \le c$ and $y_c(x) = (x - c)^2$ for $x > c$. For $x < c$, $y_c' = 0 = 2\sqrt{0}$. For $x > c$, $y_c' = 2(x - c) = 2\sqrt{(x - c)^2} = 2\sqrt{\abs{y_c}}$ since $x - c > 0$. At $x = c$, both one-sided difference quotients tend to $0$ (the right one is $\frac{h^2}{h} = h \to 0$), so $y_c'(c) = 0 = 2\sqrt{\abs{y_c(c)}}$. Thus each $y_c$ is a solution with $y_c(0) = 0$, and different $c$ give different functions. The function $f(x, y) = 2\sqrt{\abs y}$ is continuous, but $\frac{\partial f}{\partial y} = \frac{\operatorname{sgn}(y)}{\sqrt{\abs y}}$ is unbounded (and undefined) at $y = 0$, so the uniqueness hypothesis fails exactly along the solution $y = 0$.
:::
:::

::: exercise The logistic inflection point {level=3}
Let $0 < P_0 < \frac K2$. Using only [[#eq-logistic]] (not the solution formula), prove that the solution is increasing, that it is concave up while $P < \frac K2$ and concave down once $P > \frac K2$, and that its maximum growth rate is $\frac{rK}{4}$.
::: solution
The solution never reaches the equilibria $0$ or $K$ (by uniqueness, solution curves cannot meet), so $0 < P(t) < K$ for all $t \ge 0$, and then $P' = rP(1 - P/K) > 0$: $P$ is increasing. Differentiating the equation with the chain rule,

$$
P'' = r\left(1 - \frac{2P}{K}\right)P',
$$

and since $P' > 0$, the sign of $P''$ is the sign of $1 - \frac{2P}{K}$: positive (concave up) for $P < \frac K2$ and negative (concave down) for $P > \frac K2$. The growth rate is $P' = f(P) = rP - \frac{r}{K}P^2$, a downward parabola in $P$ with maximum $f\left(\frac K2\right) = r\cdot\frac K2\cdot\frac12 = \frac{rK}{4}$, so $P' \le \frac{rK}{4}$ always.

It remains to show that the solution actually reaches $P = \frac K2$, so that the concave-down phase occurs and the maximum rate is attained. Since $P$ is increasing and bounded by $K$, it has a limit $L \le K$ as $t \to\infty$ ([[calculus-2/sequences#thm-mct]] applies equally to functions of $t$). If $L < K$, then for all $t \ge 0$ the value $P(t)$ lies in $[P_0, L]$, where $f$ has a positive minimum $m$; so $P' \ge m$ and $P(t) \ge P_0 + mt \to \infty$, a contradiction. Hence $L = K > \frac K2$, and by the intermediate value theorem $P(t_*) = \frac K2$ at some time $t_*$, where $P'(t_*) = \frac{rK}{4}$: the curve is concave up before $t_*$ and concave down after it.
:::
:::

::: exercise Euler's method converges for y′ = y {level=3}
For $y' = y$, $y(0) = 1$, let $E_n$ be Euler's approximation to $y(1)$ with $h = \frac1n$. Show that $E_n = \left(1 + \frac1n\right)^n$ and that $0 < e - E_n < \frac{e}{2n}$.
::: hint
Use $\ln(1 + u) > u - \frac{u^2}{2}$ for $u > 0$ and $1 - e^{-v} < v$ for $v > 0$.
:::
::: solution
Each Euler step gives $y_{k+1} = y_k + hy_k = (1 + h)y_k$, so after $n$ steps $E_n = (1 + \frac1n)^n$. From $\ln(1+u) < u$ we get $E_n = e^{n\ln(1 + 1/n)} < e^{1} = e$. For the other bound, $\ln(1 + u) > u - \frac{u^2}{2}$ for $u > 0$ (the difference has derivative $\frac{1}{1+u} - 1 + u = \frac{u^2}{1+u} > 0$ and vanishes at $0$), so with $u = \frac1n$, $n\ln\left(1 + \frac1n\right) > 1 - \frac{1}{2n}$. Hence $E_n > e^{1 - 1/(2n)} = e\cdot e^{-1/(2n)}$, and

$$
e - E_n < e\left(1 - e^{-1/(2n)}\right) < e\cdot\frac{1}{2n},
$$

using $1 - e^{-v} < v$. So the error of Euler's method here is less than $\frac{e}{2n} = \frac{e}{2}h$: proportional to the step size, as claimed in the text.
:::
:::
