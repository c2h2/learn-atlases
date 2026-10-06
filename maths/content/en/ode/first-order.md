A cup of coffee is poured at $90\,^\circ\mathrm{C}$ in a room at $20\,^\circ\mathrm{C}$. Five minutes later it has cooled to $70\,^\circ\mathrm{C}$. You like it at $50\,^\circ\mathrm{C}$: how long must you wait? A thermometer reading at two instants cannot answer this on its own. What answers it is a *law about rates*: the coffee loses heat at a rate proportional to how much hotter it is than the room. Writing $T(t)$ for the temperature after $t$ minutes, the law says

$$
\frac{dT}{dt} = -k\,(T - 20)
$$

for some constant $k > 0$. This is a **differential equation**: an equation for an unknown *function* $T$ that involves its derivative. Its solutions tell us the whole future of the coffee, and we will answer the question in [[#ex-coffee]].

You met slope fields, separable equations and the logistic model in [[calculus-2/intro-odes]]. This chapter puts those ideas on a firm footing and extends them. We define precisely what a solution and an initial value problem are, then develop the four classical methods for first-order equations: separation of variables, integrating factors for linear equations, exact equations, and substitutions that reduce new equations to old ones. Along the way we meet a phenomenon that will occupy the next chapter: solutions of perfectly innocent-looking equations can cease to exist after a finite time.

## Differential equations and their solutions

::: definition Ordinary differential equation {#def-ode}
An **ordinary differential equation** (ODE) for an unknown function $y$ of one variable $t$ is an equation

$$
F\bigl(t, y, y', \dots, y^{(n)}\bigr) = 0
$$

relating $t$, $y(t)$ and finitely many derivatives of $y$. The **order** of the equation is the order $n$ of the highest derivative that appears. A **solution** on an open interval $I$ is a function $\varphi\colon I \to \R$ that is $n$ times differentiable on $I$ and satisfies $F\bigl(t, \varphi(t), \varphi'(t), \dots, \varphi^{(n)}(t)\bigr) = 0$ for every $t \in I$.
:::

The word *ordinary* distinguishes these from **partial** differential equations, in which the unknown depends on several variables and partial derivatives appear (see [[pde]]). In this chapter we study first-order equations, almost always in the **normal form**

$$
y' = f(t, y),
$$ {#eq-normal}

where the derivative is expressed in terms of $t$ and $y$. Geometrically, [[#eq-normal]] prescribes a slope $f(t,y)$ at every point of the plane, and a solution is a curve that has the prescribed slope at each of its points.

An equation of order $n$ is **linear** if it has the form $a_n(t)y^{(n)} + \dots + a_1(t)y' + a_0(t)y = g(t)$: the unknown and its derivatives appear only to the first power, multiplied by functions of $t$. So $y'' + t^2 y = \sin t$ is linear of order two, while $y' = y^2$ and $y'' + \sin y = 0$ are nonlinear.

A differential equation alone usually has infinitely many solutions — the coffee law is satisfied by $T = 20 + Ce^{-kt}$ for every constant $C$. To single out one, we prescribe the state at one instant.

::: definition Initial value problem {#def-ivp}
An **initial value problem** (IVP) for a first-order equation consists of the equation $y' = f(t,y)$ together with an **initial condition** $y(t_0) = y_0$. A solution of the IVP is a solution $\varphi$ of the equation on an open interval $I$ containing $t_0$ with $\varphi(t_0) = y_0$.
:::

A formula containing an arbitrary constant that produces (essentially) all solutions is called a **general solution**. Solutions are not always given explicitly as $y = \varphi(t)$: often we obtain an **implicit solution**, a relation $G(t, y) = C$ that defines $y$ as a function of $t$ only locally. Both the formula and the interval matter, as the first example shows.

::: example A solution that lives on a half-line {#ex-blowup-intro}
Show that $y = \dfrac{1}{1-t}$ solves the IVP $y' = y^2$, $y(0) = 1$, and determine the largest interval on which it is a solution.
::: solution
For $t \neq 1$, $y' = \dfrac{d}{dt}(1-t)^{-1} = (1-t)^{-2} = y^2$, and $y(0) = 1$. The formula is defined on $(-\infty, 1)$ and on $(1, \infty)$, but a solution must live on an *interval containing $t_0 = 0$*, so the solution of the IVP is $y = 1/(1-t)$ on $(-\infty, 1)$. As $t \to 1^-$ we have $y(t) \to \infty$: the solution **blows up** in finite time, although the right-hand side $f(t,y) = y^2$ is a polynomial, defined and smooth everywhere. The piece of the graph on $(1,\infty)$ is a solution of the equation, but of a different IVP.

More generally $y = 1/(C - t)$ solves $y' = y^2$ for each constant $C$, and so does $y \equiv 0$, which is not of this form for any $C$. A "general solution" may therefore miss individual solutions; we return to this in [[#warn-lost]].
:::
:::

::: quiz
Which of the following equations is linear?
- [x] $y' + t^2 y = \sin t$
- [ ] $y' + y^2 = t$
- [ ] $y\,y' = 1$
- [ ] $y' = \sin y$
::: solution
Only the first has $y$ and $y'$ appearing to the first power with coefficients depending on $t$ alone. The others contain $y^2$, the product $y\,y'$, and $\sin y$, all of which are nonlinear in the unknown.
:::
:::

## Separable equations

An equation is **separable** if its right-hand side factorises as a function of $t$ times a function of $y$:

$$
y' = f(t)\,g(y).
$$ {#eq-separable}

The informal recipe from [[calculus-2/intro-odes]] is to write $dy/g(y) = f(t)\,dt$ and integrate both sides. The following theorem says exactly when this is legitimate and why it produces *the* solution.

::: theorem Separation of variables {#thm-separable}
Let $f$ be continuous on an open interval $I$ and $g$ continuous on an open interval $J$, and let $t_0 \in I$, $y_0 \in J$.

1. If $g(y_0) = 0$, the constant function $y \equiv y_0$ solves the IVP $y' = f(t)g(y)$, $y(t_0) = y_0$.
2. If $g(y_0) \neq 0$, put
$$
G(y) = \int_{y_0}^{y}\frac{d\eta}{g(\eta)}, \qquad F(t) = \int_{t_0}^{t} f(s)\,ds .
$$
Then on some open interval around $t_0$ the IVP has exactly one solution with $g(y(t)) \neq 0$, and it is given implicitly by $G(y(t)) = F(t)$.
:::

::: proof
Part 1 is immediate: the constant function has derivative $0 = f(t)g(y_0)$.

For part 2, let $J_0 \subseteq J$ be the largest open interval containing $y_0$ on which $g$ has no zero. On $J_0$, $g$ has constant sign (by the intermediate value theorem), so $G' = 1/g$ is continuous and of constant sign, and $G$ is a strictly monotone differentiable function from $J_0$ onto an open interval $G(J_0)$ containing $G(y_0) = 0$. Its inverse $G^{-1}$ is differentiable with $(G^{-1})'(u) = 1/G'(G^{-1}(u)) = g(G^{-1}(u))$. Since $F$ is continuous with $F(t_0) = 0$, there is an open interval $I_0 \ni t_0$ on which $F(t) \in G(J_0)$.

*Existence.* Define $y(t) = G^{-1}(F(t))$ for $t \in I_0$. Then $y(t_0) = G^{-1}(0) = y_0$ and, by the chain rule,

$$
y'(t) = g\bigl(G^{-1}(F(t))\bigr)\,F'(t) = g(y(t))\,f(t).
$$

*Uniqueness.* Let $z$ be any solution on an interval around $t_0$ with $g(z(t)) \neq 0$, so that $z(t) \in J_0$. Then

$$
\frac{d}{dt}\,G(z(t)) = \frac{z'(t)}{g(z(t))} = f(t),
$$

so $G(z(t)) - F(t)$ is constant; at $t = t_0$ it equals $0$. Hence $G(z(t)) = F(t)$ and $z(t) = G^{-1}(F(t)) = y(t)$.
:::

In practice we compute antiderivatives with an arbitrary constant, $\int dy/g(y) = \int f(t)\,dt + C$, and fix $C$ from the initial condition. The theorem tells us what this computation means: it is the chain rule run backwards.

::: example The cooling coffee {#ex-coffee}
Solve the cooling problem from the start of the chapter: $T' = -k(T - 20)$, $T(0) = 90$, $T(5) = 70$. When does the coffee reach $50\,^\circ\mathrm{C}$?
::: solution
Here $f(t) = -k$ and $g(T) = T - 20$, which is non-zero at $T_0 = 90$. Separating,

$$
\int\frac{dT}{T - 20} = -\int k\,dt \quad\Longrightarrow\quad \ln\lvert T - 20\rvert = -kt + c .
$$

Exponentiating, $\lvert T - 20\rvert = e^{c}e^{-kt}$, so $T - 20 = Ae^{-kt}$ with $A = \pm e^c$ (and $A = 0$ gives the equilibrium solution $T \equiv 20$ from part 1 of the theorem). The condition $T(0) = 90$ gives $A = 70$:

$$
T(t) = 20 + 70e^{-kt}.
$$

The measurement $T(5) = 70$ determines $k$: $70e^{-5k} = 50$, so $k = \tfrac15\ln\tfrac75 \approx 0.0673$ per minute. Finally $T(t) = 50$ when $e^{-kt} = \tfrac37$, that is

$$
t = \frac{\ln(7/3)}{k} = \frac{5\ln(7/3)}{\ln(7/5)} \approx 12.6 \text{ minutes}.
$$

The temperature difference $T - 20$ decays exponentially, falling by the same factor $5/7$ in every five-minute period.
:::
:::

::: widget slopefield
f: -k*(y - 20)
x: 0, 40
y: 0, 100
sliders: k=0.07:0.01:0.3:0.01
points: 0, 90; 0, 50; 0, 5
caption: The slope field of Newton's law of cooling $T' = -k(T - 20)$ (here $x$ is time and $y$ the temperature). Every solution curve approaches the room temperature $T = 20$, from above or below — the horizontal line is the equilibrium solution. Increase $k$ (a thinner cup) and watch the approach speed up; click anywhere to start a new solution.
:::

::: example A solution with a finite interval {#ex-xy2}
Solve $y' = x\,y^2$, $y(0) = 1$, and find the interval on which the solution exists.
::: solution
Separating (valid since $y_0 = 1 \neq 0$): $\displaystyle\int y^{-2}\,dy = \int x\,dx$, so $-\dfrac1y = \dfrac{x^2}{2} + c$. At $x = 0$, $y = 1$ gives $c = -1$, hence

$$
y = \frac{1}{1 - x^2/2} = \frac{2}{2 - x^2}.
$$

The denominator vanishes at $x = \pm\sqrt2$, and the solution must be defined on an interval containing $0$, so the interval of existence is $(-\sqrt2, \sqrt2)$. At both ends $y \to +\infty$. Nothing in the equation hints at the number $\sqrt2$; it is found only by solving.
:::
:::

::: example An implicit solution {#ex-implicit}
Solve $y' = \dfrac{1 + 2x}{\cos y}$, $y(0) = 0$, and find the interval of existence.
::: solution
Separating, $\int \cos y\,dy = \int (1 + 2x)\,dx$, so $\sin y = x + x^2 + c$ and $y(0)=0$ gives $c = 0$. The implicit solution is $\sin y = x + x^2$. To make it explicit we invert the sine on the branch through $y = 0$, namely $y \in (-\pi/2, \pi/2)$, where $\cos y > 0$:

$$
y = \arcsin\bigl(x + x^2\bigr).
$$

This requires $-1 < x + x^2 < 1$. The left inequality always holds (the minimum of $x + x^2$ is $-\tfrac14$); the right one gives $x^2 + x - 1 < 0$, that is

$$
\frac{-1-\sqrt5}{2} < x < \frac{-1+\sqrt5}{2}.
$$

At both endpoints $x + x^2 \to 1$, so $y \to \pi/2$, where $\cos y = 0$ and the slope $y' = (1+2x)/\cos y$ becomes infinite: the solution curve turns vertical and cannot be continued as the graph of a function. The interval of existence is about $(-1.618, 0.618)$ — the golden ratio makes an unexpected appearance.
:::
:::

::: warning Dividing by zero loses solutions {#warn-lost}
Separating $y' = 2x\,y^2$ gives $-1/y = x^2 + C$, that is $y = -1/(x^2 + C)$. But $y \equiv 0$ is also a solution, and it is not of this form for any $C$: it was lost when we divided by $y^2$. Whenever you divide by $g(y)$, check the zeros of $g$ separately — each zero $y^*$ gives an **equilibrium solution** $y \equiv y^*$. Part 1 of [[#thm-separable]] is there for exactly this reason.
:::

## Linear equations and integrating factors

::: definition First-order linear equation {#def-linear}
A **first-order linear equation** in **standard form** is

$$
y' + p(t)\,y = q(t),
$$ {#eq-linear}

where $p$ and $q$ are functions of $t$. It is **homogeneous** if $q \equiv 0$.
:::

A linear equation is separable only in special cases, so we need a new idea. The left-hand side $y' + p y$ looks almost like the derivative of a product. If we multiply it by a positive function $\mu(t)$ chosen so that $\mu' = p\,\mu$, then by the product rule

$$
\mu\,(y' + p\,y) = \mu y' + \mu' y = (\mu y)'.
$$

The condition $\mu' = p\mu$ is itself a separable equation, with the solution $\mu(t) = \exp\bigl(\int p(t)\,dt\bigr)$. Such a $\mu$ is called an **integrating factor**: after multiplying by it, the equation becomes $(\mu y)' = \mu q$, which we can integrate directly.

::: theorem Solution of the linear equation {#thm-linear}
Let $p$ and $q$ be continuous on an open interval $I$, let $t_0 \in I$ and $y_0 \in \R$. Then the IVP $y' + p(t)y = q(t)$, $y(t_0) = y_0$ has exactly one solution on the **whole** interval $I$, namely

$$
y(t) = \frac{1}{\mu(t)}\left( y_0 + \int_{t_0}^{t}\mu(s)\,q(s)\,ds \right), \qquad \mu(t) = \exp\left(\int_{t_0}^{t} p(s)\,ds\right).
$$ {#eq-linear-solution}
:::

::: proof
The function $\mu$ is differentiable on $I$ with $\mu' = p\mu$ (fundamental theorem of calculus and the chain rule), $\mu(t_0) = 1$, and $\mu > 0$, so [[#eq-linear-solution]] defines a differentiable function on all of $I$.

*Existence.* Write [[#eq-linear-solution]] as $\mu y = y_0 + \int_{t_0}^t \mu q$. The right-hand side is differentiable with derivative $\mu q$ because $\mu q$ is continuous. Hence

$$
\mu y' + \mu' y = \mu q \quad\Longrightarrow\quad \mu\,(y' + p y) = \mu q \quad\Longrightarrow\quad y' + py = q,
$$

dividing by $\mu > 0$. Also $y(t_0) = y_0/\mu(t_0) = y_0$.

*Uniqueness.* Let $z$ be any solution of the IVP on an interval $I' \subseteq I$ containing $t_0$. Then $(\mu z)' = \mu z' + p\mu z = \mu q$ on $I'$, so by the fundamental theorem of calculus $\mu(t)z(t) - \mu(t_0)z(t_0) = \int_{t_0}^t \mu q$, which is exactly [[#eq-linear-solution]]. So $z$ coincides with $y$ wherever both are defined.
:::

Two features of this theorem are worth stressing, because they distinguish linear from nonlinear equations.

- **Global existence.** The solution exists on the entire interval where the coefficients are continuous. It cannot blow up in the middle of $I$, unlike the solutions of $y' = y^2$ and $y' = xy^2$ above.
- **Structure.** Formula [[#eq-linear-solution]] splits as $y = y_p + C\,y_h$, where $y_h = 1/\mu$ solves the homogeneous equation $y' + py = 0$ and $y_p$ is one particular solution of the full equation. The difference of two solutions of [[#eq-linear]] solves the homogeneous equation. This "particular plus homogeneous" structure is the organising principle of all linear equations, and returns in [[ode/second-order-linear]] and [[ode/nonhomogeneous]].

::: warning Put the equation in standard form first
The integrating factor is built from the coefficient $p$ of $y$ *after dividing by the coefficient of* $y'$. For $t\,y' + 2y = 4t^2$ the standard form is $y' + \frac{2}{t}y = 4t$, so $p = 2/t$ and $\mu = t^2$ — not $e^{2t}$. Dividing also reveals where the theorem applies: here $p$ is discontinuous at $t = 0$, so solutions are only guaranteed on $(0,\infty)$ or $(-\infty, 0)$.
:::

::: example An equation with a singular coefficient {#ex-tlinear}
Solve $t\,y' + 2y = 4t^2$, $y(1) = 2$.
::: solution
In standard form, $y' + \dfrac{2}{t}y = 4t$ with $p(t) = 2/t$ and $q(t) = 4t$, both continuous on $(0, \infty)$, which contains $t_0 = 1$. An integrating factor is $\mu = \exp\int \frac2t\,dt = t^2$ (for $t > 0$). Multiplying,

$$
t^2 y' + 2t\,y = 4t^3 \quad\Longrightarrow\quad (t^2 y)' = 4t^3 \quad\Longrightarrow\quad t^2 y = t^4 + C .
$$

So $y = t^2 + C/t^2$, and $y(1) = 2$ gives $C = 1$:

$$
y = t^2 + \frac{1}{t^2}, \qquad t > 0.
$$

By [[#thm-linear]] this is the unique solution on $(0,\infty)$. It cannot be continued through $t = 0$, where it blows up. Of all the solutions $t^2 + C/t^2$, only the one with $C = 0$ is defined at $t = 0$ — which is consistent with uniqueness, because at $t = 0$ the equation itself forces $2y(0) = 0$.
:::
:::

::: widget plot
f: x^2 + C/x^2; x^2
x: 0, 3
y: -6, 12
sliders: C=1:-4:4:0.1
labels: t^2 + C/t^2; t^2
caption: Solutions $y = t^2 + C/t^2$ of $t\,y' + 2y = 4t^2$ for $t > 0$ (horizontal axis $t$). Move the slider: every solution blows up as $t\to 0^+$ except the one with $C = 0$, and all of them merge with $y = t^2$ as $t$ grows, because the homogeneous part $C/t^2$ dies away.
:::

::: quiz
What is an integrating factor for $y' + \dfrac{2}{t}\,y = t$ on $t > 0$?
- [ ] $e^{2t}$
- [ ] $\dfrac{2}{t}$
- [x] $t^2$
- [ ] $e^{t^2}$
::: solution
$\mu = \exp\int \frac{2}{t}\,dt = \exp(2\ln t) = t^2$. Check: $(t^2 y)' = t^2 y' + 2t y = t^2\bigl(y' + \tfrac{2}{t}y\bigr)$. Then $(t^2 y)' = t^3$ gives $y = \tfrac{t^2}{4} + \tfrac{C}{t^2}$.
:::
:::

Linear equations arise whenever a quantity changes at a rate that depends linearly on the amount present. The most common source is a **compartment model**: a tank, an organ, a lake or a bank account, with

$$
\text{rate of change of the amount} = \text{rate in} - \text{rate out}.
$$

::: example A tank that fills while it mixes {#ex-tank}
A tank initially contains $100$ litres of water in which $10$ kg of salt is dissolved. Brine containing $0.5$ kg of salt per litre flows in at $3$ litres per minute, and the well-stirred mixture flows out at $2$ litres per minute. How much salt is in the tank when it holds $200$ litres, and what is the concentration then?
::: solution
The volume grows at $3 - 2 = 1$ litre per minute, so $V(t) = 100 + t$, and the tank holds $200$ litres at $t = 100$. Let $Q(t)$ be the amount of salt in kg. Salt enters at $0.5 \times 3 = 1.5$ kg/min. The outflow carries the current concentration $Q/V$ at $2$ litres per minute. Hence

$$
Q' = 1.5 - \frac{2Q}{100 + t}, \qquad Q(0) = 10.
$$

In standard form $Q' + \frac{2}{100+t}Q = 1.5$, with integrating factor $\mu = \exp\int\frac{2\,dt}{100+t} = (100+t)^2$. Then

$$
\bigl((100+t)^2 Q\bigr)' = 1.5\,(100+t)^2 \quad\Longrightarrow\quad (100+t)^2 Q = 0.5\,(100+t)^3 + C .
$$

At $t = 0$: $10^4 \cdot 10 = 0.5\cdot 10^6 + C$, so $C = -4\times 10^5$ and

$$
Q(t) = 0.5\,(100 + t) - \frac{4\times 10^5}{(100+t)^2}.
$$

At $t = 100$, $Q = 100 - \dfrac{4\times10^5}{4\times 10^4} = 90$ kg, a concentration of $90/200 = 0.45$ kg/L. As a sanity check, the concentration $Q/V = 0.5 - 4\times10^5/(100+t)^3$ increases towards the inflow concentration $0.5$ kg/L, as it should.
:::
:::

::: application Circuits, drugs and loans
The same linear equation appears under many names. In an electrical circuit with a resistor $R$ and capacitor $C$ driven by a voltage $E(t)$, the charge satisfies $Rq' + q/C = E(t)$, and the product $RC$ is the **time constant** of the circuit. A drug infused into the bloodstream at rate $r(t)$ and eliminated at a rate proportional to the amount present satisfies $A' = r(t) - kA$. A loan of size $L$ at continuously compounded interest rate $\rho$, repaid at a constant rate $P$, satisfies $L' = \rho L - P$. In each case [[#thm-linear]] gives the complete answer, and the long-term behaviour is read off from the integrating factor.
:::

## Exact equations

Many first-order equations are written in the symmetric **differential form**

$$
M(x,y)\,dx + N(x,y)\,dy = 0, \qquad\text{that is,}\qquad M(x,y) + N(x,y)\,\frac{dy}{dx} = 0.
$$ {#eq-differential-form}

Suppose that the solutions are the level curves $F(x,y) = C$ of some function $F$. Differentiating $F(x, y(x)) = C$ with the chain rule gives $F_x + F_y\,y' = 0$. So if we can find $F$ with $F_x = M$ and $F_y = N$, the equation says precisely that $F$ is constant along solutions.

::: definition Exact equation {#def-exact}
Equation [[#eq-differential-form]] is **exact** on an open set $R \subseteq \R^2$ if there is a continuously differentiable function $F$ on $R$, called a **potential**, with

$$
\frac{\partial F}{\partial x} = M, \qquad \frac{\partial F}{\partial y} = N \qquad\text{on } R.
$$

Then every solution satisfies $F(x, y(x)) = C$ for a constant $C$; conversely, every differentiable $y$ with $F(x,y(x)) = C$ is a solution, and near each point of a level curve $F = C$ where $N \ne 0$ the curve is the graph of such a function (implicit function theorem).
:::

In the language of [[multivariable/line-integrals]], the equation is exact when the vector field $(M, N)$ is conservative and $F$ is its potential. As there, a simple test decides the question on rectangles.

::: theorem Test for exactness {#thm-exact}
Let $M$, $N$ and the partial derivatives $M_y$, $N_x$ be continuous on an open rectangle $R = (a,b)\times(c,d)$. Then [[#eq-differential-form]] is exact on $R$ if and only if

$$
\frac{\partial M}{\partial y} = \frac{\partial N}{\partial x} \qquad\text{at every point of } R.
$$ {#eq-exact-test}
:::

::: proof
($\Rightarrow$) If $F_x = M$ and $F_y = N$, then $F_{xy} = M_y$ and $F_{yx} = N_x$ are continuous, and by the symmetry of mixed partial derivatives (Clairaut's theorem, [[multivariable/partial-derivatives]]) they are equal.

($\Leftarrow$) Fix $(x_0, y_0) \in R$ and define, for $(x, y) \in R$,

$$
F(x, y) = \int_{x_0}^{x} M(s, y_0)\,ds + \int_{y_0}^{y} N(x, s)\,ds .
$$

Every point on the two segments of integration lies in $R$, because $R$ is a rectangle. The first integral does not depend on $y$, so by the fundamental theorem of calculus $F_y(x,y) = N(x, y)$. For $F_x$ we differentiate the second integral under the integral sign, which is allowed because $N_x$ is continuous on $R$, and $R$ contains a closed rectangle around the segment (Leibniz's rule), and then use [[#eq-exact-test]]:

$$
F_x(x,y) = M(x, y_0) + \int_{y_0}^{y} N_x(x, s)\,ds = M(x, y_0) + \int_{y_0}^{y} M_y(x, s)\,ds = M(x,y_0) + \bigl(M(x,y) - M(x,y_0)\bigr) = M(x,y).
$$

So $F$ is a potential and the equation is exact.
:::

::: remark The shape of the region matters
On regions with holes, [[#eq-exact-test]] is necessary but not sufficient. The equation $-\dfrac{y}{x^2+y^2}\,dx + \dfrac{x}{x^2+y^2}\,dy = 0$ satisfies $M_y = N_x$ on the punctured plane, and locally its potential is the polar angle $\theta$, but no single-valued potential exists on the whole punctured plane. The proof above used the rectangle to integrate along segments that stay in $R$. The theorem remains true on any simply connected region, but the proof must then integrate along other paths, for instance polygonal ones, and use Green's theorem to show that the result does not depend on the path (compare [[multivariable/greens-theorem]]).
:::

::: example Solving an exact equation {#ex-exact}
Solve $(2xy + 3x^2) + (x^2 + 2y)\,y' = 0$, $y(1) = 1$.
::: solution
Here $M = 2xy + 3x^2$ and $N = x^2 + 2y$, and $M_y = 2x = N_x$ everywhere, so the equation is exact on $\R^2$. To find $F$, integrate $M$ with respect to $x$, treating $y$ as constant:

$$
F(x,y) = \int (2xy + 3x^2)\,dx = x^2 y + x^3 + h(y),
$$

where the "constant" of integration $h$ may depend on $y$. Now impose $F_y = N$: $x^2 + h'(y) = x^2 + 2y$, so $h'(y) = 2y$ and $h(y) = y^2$. Thus $F = x^2y + x^3 + y^2$, and the solutions satisfy $x^2y + x^3 + y^2 = C$. The initial condition gives $C = 1 + 1 + 1 = 3$.

This is a quadratic in $y$: $y^2 + x^2 y + (x^3 - 3) = 0$, so

$$
y = \frac{-x^2 + \sqrt{x^4 - 4x^3 + 12}}{2},
$$

where the $+$ sign is chosen so that $y(1) = (-1 + 3)/2 = 1$. The solution exists as long as the discriminant $x^4 - 4x^3 + 12$ stays positive, which is the case for $x < x^* \approx 1.746$. At $x^*$ the two roots merge, $y = -x^2/2$, and $N = x^2 + 2y = 0$: the level curve $F = 3$ has a vertical tangent there and the solution cannot be continued.
:::
:::

::: quiz
Is $(y\cos x + 2x e^y) + (\sin x + x^2 e^y - 1)\,y' = 0$ exact?
- [x] Yes
- [ ] No, because $M$ contains $\cos x$ but $N$ contains $\sin x$
- [ ] No, because the $-1$ in $N$ has no partner in $M$
- [ ] It cannot be decided without solving the equation
::: solution
$M_y = \cos x + 2x e^y$ and $N_x = \cos x + 2x e^y$, which agree on all of $\R^2$, so by [[#thm-exact]] the equation is exact. A potential is $F = y\sin x + x^2 e^y - y$.
:::
:::

### Integrating factors for non-exact equations

The equation $y\,dx - x\,dy = 0$ is not exact ($M_y = 1$, $N_x = -1$), but multiplying it by $1/x^2$ gives $\frac{y}{x^2}dx - \frac{1}{x}dy = 0$, which is $-d(y/x) = 0$ and is exact. In general a non-zero function $\mu(x,y)$ is an **integrating factor** if $\mu M\,dx + \mu N\,dy = 0$ is exact; the two equations have the same solutions wherever $\mu \neq 0$. Finding $\mu$ requires solving the partial differential equation $(\mu M)_y = (\mu N)_x$, which is usually harder than the original problem — but in two common cases there is an integrating factor depending on one variable only.

::: proposition Integrating factors depending on one variable {#prop-mu}
Suppose $M, N, M_y, N_x$ are continuous.

1. If $\dfrac{M_y - N_x}{N} = h(x)$ depends on $x$ alone, then $\mu(x) = \exp\int h(x)\,dx$ is an integrating factor.
2. If $\dfrac{N_x - M_y}{M} = k(y)$ depends on $y$ alone, then $\mu(y) = \exp\int k(y)\,dy$ is an integrating factor.
:::

::: proof
For $\mu = \mu(x)$, the exactness condition $(\mu M)_y = (\mu N)_x$ reads $\mu M_y = \mu' N + \mu N_x$, that is $\mu' = \mu\,\dfrac{M_y - N_x}{N} = \mu\,h(x)$. The function $\mu = \exp\int h$ satisfies this, so $\mu M\,dx + \mu N\,dy = 0$ is exact by [[#thm-exact]]. Part 2 is the same computation with the roles of $x$ and $y$ exchanged (see [[#exr-1-9]]).
:::

::: example Finding an integrating factor {#ex-intfactor}
Solve $(3xy + y^2) + (x^2 + xy)\,y' = 0$.
::: solution
$M_y = 3x + 2y$ and $N_x = 2x + y$ differ, so the equation is not exact. But

$$
\frac{M_y - N_x}{N} = \frac{x + y}{x(x + y)} = \frac{1}{x}
$$

depends only on $x$, so $\mu = \exp\int \frac{dx}{x} = x$ (for $x > 0$) is an integrating factor. The new equation $(3x^2y + xy^2) + (x^3 + x^2y)\,y' = 0$ is exact: both mixed partials equal $3x^2 + 2xy$. Integrating $3x^2y + xy^2$ with respect to $x$ gives $F = x^3 y + \tfrac12 x^2y^2 + h(y)$, and $F_y = x^3 + x^2 y$ forces $h' = 0$. The solutions are

$$
x^3 y + \tfrac12 x^2 y^2 = C .
$$

Multiplying by $\mu = x$ could introduce the spurious "solution" $x = 0$; since $x = 0$ is not the graph of a function of $x$, nothing is lost or gained here.
:::
:::

## Substitutions

A change of variables can turn an unfamiliar equation into one of the types above. The two classical examples are Bernoulli equations and homogeneous equations.

::: proposition Bernoulli equations {#prop-bernoulli}
Let $n \neq 0, 1$ be a real number and $p, q$ continuous. On any interval where a solution $y$ of the **Bernoulli equation**

$$
y' + p(t)\,y = q(t)\,y^n
$$

is positive (or, when $y^{1-n}$ makes sense for negative $y$, non-zero), the function $v = y^{1-n}$ satisfies the *linear* equation

$$
v' + (1-n)\,p(t)\,v = (1-n)\,q(t).
$$
:::

::: proof
By the chain rule and the equation, $v' = (1-n)\,y^{-n}\,y' = (1-n)\,y^{-n}\bigl(q\,y^n - p\,y\bigr) = (1-n)\bigl(q - p\,y^{1-n}\bigr) = (1-n)(q - p\,v)$.
:::

The logistic equation $P' = rP(1 - P/K)$ of [[calculus-2/intro-odes]] is a Bernoulli equation with $n = 2$: the substitution $v = 1/P$ turns it into the linear equation $v' + rv = r/K$, whose solution $v = 1/K + Ce^{-rt}$ gives back the familiar logistic curve.

::: example A Bernoulli equation that blows up {#ex-bernoulli}
Solve $y' + y = e^{t}y^2$, $y(0) = 1$.
::: solution
Here $n = 2$, so put $v = y^{-1}$. By [[#prop-bernoulli]], $v' - v = -e^{t}$. An integrating factor is $e^{-t}$:

$$
(e^{-t}v)' = -1 \quad\Longrightarrow\quad e^{-t}v = C - t \quad\Longrightarrow\quad y = \frac1v = \frac{e^{-t}}{C - t}.
$$

The initial condition gives $C = 1$, so $y = \dfrac{e^{-t}}{1-t}$, valid on $(-\infty, 1)$, with $y \to \infty$ as $t\to1^-$. The linear equation for $v$ has a solution for all $t$, but $v = e^{t}(1-t)$ passes through zero at $t = 1$, and that is where $y = 1/v$ blows up. With $y(0) = \tfrac12$ instead we get $C = 2$ and blow-up at $t = 2$; with $y(0) = -1$ we get $y = -e^{-t}/(1+t)$, which exists for all $t > -1$ and tends to $0$. Also $y \equiv 0$ is a solution, lost by the substitution $v = 1/y$.
:::
:::

::: widget slopefield
f: exp(x)*y^2 - y
x: -1, 3
y: -2, 4
points: 0, 1; 0, 0.5; 0, -1
caption: Slope field of $y' = e^{t}y^2 - y$ (horizontal axis $t$). The solutions through $(0, 1)$ and $(0, \tfrac12)$ shoot off to infinity near $t = 1$ and $t = 2$, while the one through $(0,-1)$ decays to $0$. Click below the $t$-axis and above it: positive solutions eventually blow up, because the $e^t y^2$ term wins.
:::

An equation $y' = F(y/x)$, where the right-hand side depends only on the ratio $y/x$, is called **homogeneous** (an unfortunate clash with the meaning for linear equations). The substitution $v = y/x$, that is $y = xv$, gives $y' = v + xv'$, and the equation becomes

$$
x\,v' = F(v) - v,
$$

which is separable. For example, $y' = \dfrac{x^2 + y^2}{xy} = \dfrac{1}{v} + v$ becomes $x v' = 1/v$, so $v^2/2 = \ln\lvert x\rvert + C$ and $y^2 = 2x^2\ln\lvert x\rvert + Cx^2$.

## Modelling: a checklist

Writing down the equation is often the hardest part of a real problem. Good models come from a small number of principles.

1. **Identify the state and the rate law.** Decide what quantity $y(t)$ describes the system, and express its rate of change from a balance law (rate in $-$ rate out), a physical law (Newton's second law, Newton's law of cooling, Kirchhoff's laws) or an empirical assumption (growth proportional to size).
2. **Check units.** Every term in the equation must have the units of $y$ per unit time. In [[#ex-tank]], $1.5$ kg/min and $2Q/(100+t)$ (L/min times kg/L) are both rates of salt.
3. **Solve, or analyse qualitatively.** Use the methods of this chapter when they apply, and the slope field when they do not.
4. **Interpret and test.** Long-term limits, equilibria and time scales should make physical sense, and parameters such as $k$ in [[#ex-coffee]] are fitted to data.

For instance, a body of mass $m$ falling under gravity with air resistance proportional to its speed satisfies $mv' = mg - bv$. This is linear (and separable); the solution with $v(0) = 0$ is

$$
v(t) = \frac{mg}{b}\left(1 - e^{-bt/m}\right),
$$

which approaches the **terminal velocity** $mg/b$, the speed at which drag balances weight. For larger, faster bodies drag is closer to quadratic, $mv' = mg - cv^2$, still separable but with a $\tanh$ in the answer.

::: history
The first general methods appeared within a few years of the invention of calculus. Leibniz found the method of separating the variables in 1691, and Johann Bernoulli used the name *separatio indeterminatarum* for it soon afterwards. In 1695 Jacob Bernoulli proposed the equation that now bears his name, and in 1696 Leibniz showed that a change of variable reduces it to a linear equation. Newton's law of cooling was published anonymously in the *Philosophical Transactions* in 1701, in a paper describing a scale of temperatures. Euler gave the first systematic account of these techniques, including integrating factors, in his *Institutionum calculi integralis* (1768–1770).
:::

## Where this leads

Every method in this chapter produced a formula, and in every case the formula raised the same questions: on what interval does the solution exist, and is it the only one? [[ode/existence-uniqueness]] answers these questions in general with Picard's theorem, and shows how to approximate solutions numerically when no formula is available. The structure "particular solution plus homogeneous solution" from [[#thm-linear]] becomes the main theme of [[ode/second-order-linear]] and [[ode/nonhomogeneous]]. Equilibrium solutions and their stability, met here as the room temperature in [[#ex-coffee]], grow into the phase portraits of [[ode/nonlinear-systems]].

::: summary
- An ODE relates an unknown function to its derivatives; a solution must satisfy it on an *interval*, and an initial value problem adds a condition $y(t_0) = y_0$ ([[#def-ode]], [[#def-ivp]]).
- Separable equations $y' = f(t)g(y)$ are solved by $\int dy/g(y) = \int f(t)\,dt$; zeros of $g$ give equilibrium solutions that this formula misses ([[#thm-separable]]).
- Linear equations $y' + py = q$ are solved with the integrating factor $\mu = e^{\int p}$; solutions exist on the whole interval where $p$ and $q$ are continuous ([[#thm-linear]]).
- $M + Ny' = 0$ is exact on a rectangle iff $M_y = N_x$; then the solutions are the level curves of a potential $F$ ([[#thm-exact]]). Integrating factors $\mu(x)$ or $\mu(y)$ can make an equation exact ([[#prop-mu]]).
- Substitutions reduce Bernoulli equations ($v = y^{1-n}$) to linear ones and homogeneous equations ($v = y/x$) to separable ones.
- Nonlinear equations with smooth right-hand sides can have solutions that blow up in finite time; the interval of existence must be found, not assumed.
- Models come from balance laws; check units, equilibria and time scales.
:::

## Exercises

::: exercise A separable IVP {level=1 check="2*e"}
Solve $y' = 3t^2 y$, $y(0) = 2$, and give $y(1)$.
::: solution
Since $y_0 \neq 0$ we may separate: $\int dy/y = \int 3t^2\,dt$, so $\ln\lvert y\rvert = t^3 + c$ and $y = Ae^{t^3}$. The initial condition gives $A = 2$, so $y = 2e^{t^3}$ (defined for all $t$) and $y(1) = 2e$.
:::
:::

::: exercise An integrating factor {level=1 check="3/2"}
Solve $y' + 2y = 4$, $y(0) = 0$, and find $y(\ln 2)$.
::: solution
With $\mu = e^{2t}$: $(e^{2t}y)' = 4e^{2t}$, so $e^{2t}y = 2e^{2t} + C$ and $y = 2 + Ce^{-2t}$. From $y(0) = 0$, $C = -2$, so $y = 2 - 2e^{-2t}$. At $t = \ln 2$, $e^{-2t} = \tfrac14$ and $y = 2 - \tfrac12 = \tfrac32$.
:::
:::

::: exercise An exact equation {level=1}
Show that $(2x + y) + (x + 2y)\,y' = 0$ is exact, solve it with $y(1) = 1$, and find the interval of existence of the explicit solution.
::: solution
$M_y = 1 = N_x$, so the equation is exact on $\R^2$. Integrating $M$ in $x$: $F = x^2 + xy + h(y)$, and $F_y = x + h'(y) = x + 2y$ gives $h = y^2$. So $x^2 + xy + y^2 = C$, and $y(1) = 1$ gives $C = 3$. Solving the quadratic $y^2 + xy + (x^2 - 3) = 0$ for $y$ and choosing the root with $y(1) = 1$,

$$
y = \frac{-x + \sqrt{12 - 3x^2}}{2}.
$$

This requires $12 - 3x^2 > 0$, i.e. $-2 < x < 2$. At $x = \pm 2$ the solution curve (an ellipse) has a vertical tangent, where $N = x + 2y = 0$.
:::
:::

::: exercise Terminal velocity {level=1 check="5*ln(10)"}
A skydiver with $m/b = 5$ s falls from rest with linear drag, $mv' = mg - bv$. How many seconds does it take to reach $90\%$ of the terminal velocity?
::: solution
The solution is $v = \frac{mg}{b}\bigl(1 - e^{-bt/m}\bigr) = \frac{mg}{b}(1 - e^{-t/5})$. It equals $0.9\,mg/b$ when $e^{-t/5} = 0.1$, i.e. $t = 5\ln 10 \approx 11.5$ s. Note that the answer does not depend on $g$.
:::
:::

::: exercise Time of death {level=2 check="ln(1.7)/ln(1.25)"}
A body is found at noon in a room kept at $20\,^\circ\mathrm{C}$; its temperature is $30\,^\circ\mathrm{C}$. An hour later it is $28\,^\circ\mathrm{C}$. Assuming Newton's law of cooling and a body temperature of $37\,^\circ\mathrm{C}$ at death, how many hours before noon did death occur?
::: solution
Measure $t$ in hours from noon. As in [[#ex-coffee]], $T = 20 + 10e^{-kt}$, and $T(1) = 28$ gives $e^{-k} = 0.8$, so $k = \ln 1.25$. Death occurred at the time $t_d < 0$ with $T(t_d) = 37$: $10e^{-kt_d} = 17$, so $-t_d = \ln(1.7)/k = \ln 1.7/\ln 1.25 \approx 2.38$ hours. Death occurred about 2 hours 23 minutes before noon, around 9:37 am.
:::
:::

::: exercise A Bernoulli equation {level=2 check="2"}
Solve $t\,y' + y = t^2y^2$, $y(1) = 1$. At what time $t > 1$ does the solution blow up?
::: hint
Divide by $t$ and substitute $v = 1/y$.
:::
::: solution
For $t > 0$ the equation is $y' + \frac1t y = t\,y^2$, Bernoulli with $n = 2$. With $v = 1/y$, [[#prop-bernoulli]] gives $v' - \frac1t v = -t$. The integrating factor is $1/t$: $(v/t)' = -1$, so $v = Ct - t^2$ and $y = \dfrac{1}{Ct - t^2}$. From $y(1) = 1$, $C = 2$:

$$
y = \frac{1}{t(2 - t)},
$$

which solves the IVP on $(0, 2)$ and blows up as $t \to 2^-$ (and as $t \to 0^+$).
:::
:::

::: exercise Draining a tank {level=2 check="10"}
By Torricelli's law, the water depth $h$ (in metres) in a cylindrical tank draining through a hole in the bottom satisfies $h' = -0.2\sqrt{h}$ ($t$ in minutes). If $h(0) = 1$, when is the tank empty? Explain why the equation cannot tell you, from the information "the tank is empty at $t = 20$", when it became empty.
::: solution
While $h > 0$ separate: $\int h^{-1/2}\,dh = -\int 0.2\,dt$, so $2\sqrt h = -0.2t + c$, and $h(0) = 1$ gives $c = 2$. Hence $\sqrt{h} = 1 - 0.1t$ and $h = (1 - 0.1t)^2$ for $0 \le t \le 10$; the tank is empty at $t = 10$ minutes, after which $h \equiv 0$.

For the second part, for every $T \le 20$ the function equal to $\bigl(0.1(T - t)\bigr)^2$ for $t \le T$ and $0$ for $t \ge T$ is a solution with $h(20) = 0$: the IVP $h' = -0.2\sqrt h$, $h(20) = 0$ has infinitely many solutions. This happens because $\sqrt h$ is not differentiable (indeed not Lipschitz) at $h = 0$; [[ode/existence-uniqueness]] explains why uniqueness fails exactly here.
:::
:::

::: exercise A homogeneous equation {level=2 check="15"}
Solve $y' = \dfrac{x^2 + 3y^2}{2xy}$, $y(1) = 1$, for $x > 0$, and compute $y(5)$.
::: solution
With $y = xv$: $v + xv' = \dfrac{1 + 3v^2}{2v}$, so $xv' = \dfrac{1 + v^2}{2v}$. Separating, $\displaystyle\int\frac{2v\,dv}{1+v^2} = \int\frac{dx}{x}$, i.e. $\ln(1 + v^2) = \ln x + c$ and $1 + v^2 = Ax$. At $x = 1$, $v = 1$, so $A = 2$. Then $y^2 = x^2v^2 = 2x^3 - x^2$ and, taking the positive root,

$$
y = x\sqrt{2x - 1}, \qquad x > \tfrac12 .
$$

So $y(5) = 5\sqrt9 = 15$.
:::
:::

::: exercise Integrating factors depending on y {level=3}
(a) Prove part 2 of [[#prop-mu]]: if $(N_x - M_y)/M = k(y)$ depends only on $y$, then $\mu(y) = \exp\int k(y)\,dy$ is an integrating factor.
(b) Use it to solve $y + (3x + y^3)\,y' = 0$.
::: solution
(a) For $\mu = \mu(y)$, exactness of $\mu M + \mu N y' = 0$ means $(\mu M)_y = (\mu N)_x$, i.e. $\mu' M + \mu M_y = \mu N_x$, i.e. $\mu' = \mu\,\dfrac{N_x - M_y}{M} = \mu\,k(y)$. The function $\mu = \exp\int k$ satisfies this ODE, so with it the equation is exact by [[#thm-exact]].

(b) $M = y$, $N = 3x + y^3$: $\dfrac{N_x - M_y}{M} = \dfrac{3 - 1}{y} = \dfrac{2}{y}$, so $\mu = y^2$. The equation $y^3 + (3xy^2 + y^5)y' = 0$ is exact ($\partial_y y^3 = 3y^2 = \partial_x(3xy^2 + y^5)$). Integrating $y^3$ in $x$ gives $F = xy^3 + h(y)$, and $F_y = 3xy^2 + h'(y) = 3xy^2 + y^5$ gives $h = y^6/6$. The solutions satisfy

$$
xy^3 + \frac{y^6}{6} = C,
$$

together with $y \equiv 0$ (where $\mu = 0$; check directly that it solves the original equation).
:::
:::

::: exercise Forcing that fades {level=3}
Let $a > 0$ and let $q$ be continuous on $[0, \infty)$ with $q(t) \to 0$ as $t \to\infty$. Prove that every solution of $y' + a\,y = q(t)$ satisfies $y(t) \to 0$ as $t\to\infty$.
::: hint
Write the solution with [[#eq-linear-solution]] and split the integral at a time $T$ after which $\lvert q\rvert < \eps$.
:::
::: solution
By [[#thm-linear]] with $t_0 = 0$, $\mu = e^{at}$ and

$$
y(t) = e^{-at}y(0) + \int_0^t e^{-a(t-s)}q(s)\,ds .
$$

The first term tends to $0$. Let $\eps > 0$ and choose $T$ with $\lvert q(s)\rvert < a\eps/2$ for $s \ge T$; let $B = \max_{[0,T]}\lvert q\rvert$. For $t > T$,

$$
\left\lvert \int_0^t e^{-a(t-s)}q(s)\,ds\right\rvert \le B\int_0^T e^{-a(t-s)}\,ds + \frac{a\eps}{2}\int_T^t e^{-a(t-s)}\,ds \le \frac{B}{a}\,e^{-a(t-T)} + \frac{a\eps}{2}\cdot\frac1a .
$$

The first term is less than $\eps/2$ for all sufficiently large $t$, so the integral is eventually less than $\eps$ in absolute value. Hence $y(t) \to 0$. (Physically: a system with a restoring tendency forgets its initial state and follows its input, so a dying input gives a dying response.)
:::
:::
