Here are three initial value problems whose right-hand sides look equally harmless:

$$
\text{(a)}\;\; y' = y^2,\; y(0) = 1; \qquad \text{(b)}\;\; y' = 3y^{2/3},\; y(0) = 0; \qquad \text{(c)}\;\; y' = \sin(ty),\; y(0) = 1.
$$

Problem (a) has the solution $y = 1/(1-t)$, which ceases to exist at $t = 1$ ([[ode/first-order#ex-blowup-intro]]). Problem (b) has *two* obvious solutions, $y \equiv 0$ and $y = t^3$, and in fact infinitely many. Problem (c) cannot be solved by any method of [[ode/first-order]], yet we shall prove that it has exactly one solution, defined for all real $t$. Before computing anything, we would like to know which of these behaviours to expect.

That is the purpose of this chapter. Its centrepiece is the **Picard–Lindelöf theorem**: if $f$ is continuous and does not change too violently in $y$ (a *Lipschitz condition*), then the IVP $y' = f(t,y)$, $y(t_0) = y_0$ has exactly one solution near $t_0$. The proof is constructive — it builds the solution as the limit of explicit approximations — and it is one of the most important arguments in analysis. Around it we place the geometric picture (slope fields and phase lines) and the simplest numerical method (Euler's method), with a proof that it converges.

## Slope fields and isoclines

The equation $y' = f(t,y)$ assigns a slope to each point of the $(t,y)$-plane. Drawing a short segment of that slope at many points produces the **slope field** (or direction field), and solutions are the curves that are tangent to the field everywhere. You met slope fields in [[calculus-2/intro-odes]]; here are two techniques that make sketching them efficient.

- An **isocline** is a curve $f(t,y) = c$ along which every segment has the same slope $c$. Drawing a few isoclines with their constant slopes quickly fills in the field.
- Where $f$ does not depend on $t$, the field is the same along every horizontal line, so the whole picture is determined by the single function $f(y)$; we exploit this in [[#sec-phase-line]].

::: example Isoclines and a straight-line solution {#ex-isoclines}
Sketch the slope field of $y' = y - t$ using isoclines, and find a solution that is a straight line.
::: solution
The isocline of slope $c$ is the line $y = t + c$, of slope $1$. On $y = t$ the segments are horizontal; on $y = t + 1$ they have slope $1$; on $y = t - 1$ slope $-1$; on $y = t + 2$ slope $2$, and so on.

The isocline $c = 1$ is special: it is a line of slope $1$ carrying segments of slope $1$, so it is itself a solution curve. Indeed $y = t + 1$ gives $y' = 1 = (t+1) - t$. The equation is linear, $y' - y = -t$, and [[ode/first-order#thm-linear]] gives the general solution $y = t + 1 + Ce^{t}$. Solutions above the line ($C > 0$) curve upward away from it, those below ($C < 0$) curve downward: the straight-line solution separates two families, which the slope field shows at a glance.
:::
:::

A slope field suggests that through every point passes exactly one solution curve. Problem (b) above shows that this is not always so, and finding the right hypothesis is our next task.

::: example Infinitely many solutions {#ex-nonunique}
Find all solutions of $y' = 3y^{2/3}$, $y(0) = 0$.
::: solution
The constant $y \equiv 0$ is a solution. Where $y \neq 0$ we can separate: $\int \tfrac13 y^{-2/3}\,dy = \int dt$ gives $y^{1/3} = t - c$, so $y = (t - c)^3$. Now we can glue pieces together. For any $a \le 0 \le b$, the function

$$
y(t) = \begin{cases} (t - a)^3, & t < a, \\ 0, & a \le t \le b, \\ (t - b)^3, & t > b, \end{cases}
$$

is differentiable (the one-sided derivatives at $a$ and $b$ are all $0$) and satisfies $y' = 3y^{2/3}$ everywhere, with $y(0) = 0$. A solution can sit at zero for as long as it likes and then leave at any moment. There are infinitely many solutions — and with $a = -\infty$ or $b = +\infty$ (that is, omitting a piece) we obtain still more. Conversely, every solution has this form: since $y' \ge 0$, a solution is non-decreasing, so it vanishes exactly on an interval $[a, b]$ containing $0$; on either side of it $y \ne 0$, separation gives $y = (t - c)^3$, and continuity at the endpoint forces $c = a$ or $c = b$.
:::
:::

What goes wrong in this example is the behaviour of $f(y) = 3y^{2/3}$ near $y = 0$: its graph has a vertical tangent there, $\lvert f'(y)\rvert = 2\lvert y\rvert^{-1/3} \to \infty$. A tiny change in $y$ produces a disproportionately large change in the slope, and this allows solutions to peel away from the equilibrium. The cure is to forbid such behaviour.

## Lipschitz conditions

::: definition Lipschitz condition {#def-lipschitz}
A function $f(t,y)$ defined on a set $D \subseteq \R^2$ is **Lipschitz in $y$** on $D$ (uniformly in $t$) if there is a constant $L \ge 0$, a **Lipschitz constant**, such that

$$
\lvert f(t, y) - f(t, z)\rvert \le L\,\lvert y - z\rvert \qquad\text{for all } (t,y),\,(t,z) \in D.
$$ {#eq-lipschitz}
:::

The condition bounds the slopes of the chords of $y \mapsto f(t,y)$ by $L$. Functions with bounded partial derivative in $y$ satisfy it.

::: proposition Bounded derivative implies Lipschitz {#prop-c1-lipschitz}
Let $D$ be a set such that whenever $(t, y)$ and $(t, z)$ lie in $D$, so does the segment between them (for instance a rectangle or a strip). If $\partial f/\partial y$ exists on $D$ and $\lvert \partial f/\partial y\rvert \le L$ there, then $f$ is Lipschitz in $y$ on $D$ with constant $L$. In particular, if $f$ and $\partial f/\partial y$ are continuous on a closed rectangle, $f$ is Lipschitz in $y$ there.
:::

::: proof
Fix $t$ and apply the mean value theorem ([[calculus-1/mean-value-theorem]]) to $u \mapsto f(t,u)$ on the segment between $y$ and $z$: for some $\xi$ between them,

$$
\lvert f(t,y) - f(t,z)\rvert = \left\lvert\frac{\partial f}{\partial y}(t,\xi)\right\rvert\,\lvert y - z\rvert \le L\,\lvert y - z\rvert .
$$

If $\partial f/\partial y$ is continuous on a closed rectangle, it is bounded there because the rectangle is compact, and we may take $L = \max\lvert\partial f/\partial y\rvert$.
:::

So $f(t,y) = y^2$ is Lipschitz on every rectangle $\lvert y\rvert \le b$ (with $L = 2b$), but not on the whole plane, since $\lvert y^2 - z^2\rvert = \lvert y + z\rvert\,\lvert y - z\rvert$ and $\lvert y + z\rvert$ is unbounded. The function $\lvert y\rvert$ is Lipschitz with $L = 1$ although it is not differentiable at $0$. And $3y^{2/3}$ is not Lipschitz on any rectangle containing a point with $y = 0$: taking $z = 0$, $\lvert f(y) - f(0)\rvert/\lvert y\rvert = 3\lvert y\rvert^{-1/3}$ is unbounded as $y\to0$.

## Picard iteration

The key to the existence theorem is to replace the differential equation by an equivalent *integral* equation, which is better suited to approximation.

::: lemma The integral equation {#lem-integral}
Let $f$ be continuous on a set $D$ and let $I$ be an interval containing $t_0$. A continuous function $y\colon I\to\R$ with graph in $D$ solves the IVP $y' = f(t,y)$, $y(t_0) = y_0$ on $I$ if and only if

$$
y(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y(s)\bigr)\,ds \qquad\text{for all } t \in I.
$$ {#eq-integral}
:::

::: proof
If $y$ solves the IVP, then $y'(s) = f(s,y(s))$ is continuous, so integrating from $t_0$ to $t$ (fundamental theorem of calculus) gives [[#eq-integral]]. Conversely, if $y$ is continuous and satisfies [[#eq-integral]], the integrand $s\mapsto f(s, y(s))$ is continuous, so the right-hand side is differentiable with derivative $f(t,y(t))$; hence $y' = f(t,y)$, and putting $t = t_0$ gives $y(t_0) = y_0$.
:::

Equation [[#eq-integral]] says that $y$ is a **fixed point** of the map $\Phi$ that sends a function $y$ to the function $\Phi[y](t) = y_0 + \int_{t_0}^t f(s,y(s))\,ds$. The natural way to look for a fixed point is to iterate: start with a guess and apply $\Phi$ repeatedly, just as the fixed-point iteration $x_{n+1} = g(x_n)$ of [[numerical-analysis/root-finding]] does for numbers.

::: definition Picard iterates {#def-picard}
The **Picard iterates** for the IVP $y' = f(t,y)$, $y(t_0) = y_0$ are the functions

$$
y_0(t) \equiv y_0, \qquad y_{n+1}(t) = y_0 + \int_{t_0}^{t} f\bigl(s, y_n(s)\bigr)\,ds \quad (n = 0, 1, 2, \dots).
$$
:::

::: example Picard iteration in action {#ex-picard}
Compute the Picard iterates for $y' = 2t(1 + y)$, $y(0) = 0$, and identify their limit.
::: solution
Starting from $y_0 \equiv 0$:

$$
\begin{aligned}
y_1(t) &= \int_0^t 2s\,(1 + 0)\,ds = t^2, \\
y_2(t) &= \int_0^t 2s\,(1 + s^2)\,ds = t^2 + \frac{t^4}{2}, \\
y_3(t) &= \int_0^t 2s\left(1 + s^2 + \frac{s^4}{2}\right)ds = t^2 + \frac{t^4}{2} + \frac{t^6}{6}.
\end{aligned}
$$

By induction $y_n(t) = \sum_{k=1}^{n} \dfrac{t^{2k}}{k!}$, the $n$th partial sum of the series for $e^{t^2} - 1$. So the iterates converge (for every $t$) to $y = e^{t^2} - 1$, and indeed $y' = 2te^{t^2} = 2t(1 + y)$, $y(0) = 0$. Each iterate adds one more term of the Taylor series of the solution, so $y_n$ agrees with it up to the term in $t^{2n}$.
:::
:::

::: widget plot
f: exp(x^2) - 1; sum(x^(2k)/fact(k), k, 1, n)
x: -1.6, 1.6
y: -0.5, 8
sliders: n=1:1:8:1
labels: e^{t^2}-1; y_n(t)
caption: The Picard iterates $y_n$ for $y' = 2t(1+y)$, $y(0) = 0$ (horizontal axis $t$). Increase $n$: each iterate hugs the true solution on a wider interval around $t_0 = 0$, and the convergence is fastest near the initial point — exactly the behaviour quantified by the factorials in the proof of [[#thm-picard]].
:::

## The Picard–Lindelöf theorem

We now prove that, under a Lipschitz condition, the Picard iterates always converge, and that their limit is the one and only solution. Uniqueness rests on an inequality that is useful far beyond this proof.

::: lemma Gronwall's inequality {#lem-gronwall}
Let $w$ be continuous and non-negative on $[t_0, t_1]$, and let $C \ge 0$ and $L \ge 0$ be constants with

$$
w(t) \le C + L\int_{t_0}^{t} w(s)\,ds \qquad (t_0 \le t \le t_1).
$$

Then $w(t) \le C\,e^{L(t - t_0)}$ for $t_0 \le t \le t_1$. The same holds on an interval $[t_1, t_0]$ to the left of $t_0$ if $\int_{t_0}^t$ is replaced by $\int_t^{t_0}$ and $t - t_0$ by $t_0 - t$.
:::

::: proof
Let $W(t) = C + L\int_{t_0}^t w(s)\,ds$. Then $W$ is differentiable with $W' = Lw \le LW$, since $w \le W$ by hypothesis. Hence

$$
\frac{d}{dt}\Bigl(e^{-L(t - t_0)}W(t)\Bigr) = e^{-L(t-t_0)}\bigl(W'(t) - LW(t)\bigr) \le 0,
$$

so $e^{-L(t-t_0)}W(t) \le W(t_0) = C$, and $w(t) \le W(t) \le Ce^{L(t-t_0)}$. The left-hand version follows by applying this to $t\mapsto w(2t_0 - t)$.
:::

::: theorem Picard–Lindelöf {#thm-picard}
Let $R = \set{(t,y) : \lvert t - t_0\rvert \le a,\ \lvert y - y_0\rvert \le b}$ with $a, b > 0$. Suppose that $f$ is continuous on $R$ and Lipschitz in $y$ on $R$ with constant $L$. Let $M = \max_R \lvert f\rvert$ and

$$
h = \min\left(a, \frac{b}{M}\right) \qquad (h = a \text{ if } M = 0).
$$

Then the IVP $y' = f(t,y)$, $y(t_0) = y_0$ has exactly one solution $y$ on $I = [t_0 - h, t_0 + h]$ with graph in $R$, and the Picard iterates converge to it uniformly on $I$.
:::

::: proof
Throughout, $t \in I$, and we may assume $L > 0$ (a Lipschitz constant can always be increased).

*Step 1: the iterates are defined and stay in $R$.* We show by induction that each $y_n$ is continuous on $I$ with $\lvert y_n(t) - y_0\rvert \le b$. This is clear for $y_0$. If it holds for $y_n$, then $s \mapsto f(s, y_n(s))$ is continuous on $I$, so $y_{n+1}$ is well defined and continuous, and

$$
\lvert y_{n+1}(t) - y_0\rvert = \left\lvert\int_{t_0}^{t} f(s, y_n(s))\,ds\right\rvert \le M\,\lvert t - t_0\rvert \le Mh \le b .
$$

This is where the choice $h \le b/M$ is used: the slope is at most $M$, so in time $h$ the iterates cannot climb out of the rectangle.

*Step 2: the successive differences are small.* We claim that

$$
\lvert y_{n+1}(t) - y_n(t)\rvert \le \frac{M L^{n}\,\lvert t - t_0\rvert^{n+1}}{(n+1)!} \qquad (t \in I,\ n \ge 0).
$$ {#eq-picard-estimate}

For $n = 0$ this is the estimate $\lvert y_1(t) - y_0\rvert \le M\lvert t-t_0\rvert$ from Step 1. If it holds for $n$, then by the Lipschitz condition (for $t \ge t_0$; the case $t < t_0$ is symmetric)

$$
\lvert y_{n+2}(t) - y_{n+1}(t)\rvert \le \int_{t_0}^{t} \bigl\lvert f(s, y_{n+1}(s)) - f(s,y_n(s))\bigr\rvert\,ds \le L\int_{t_0}^t \frac{ML^n (s - t_0)^{n+1}}{(n+1)!}\,ds = \frac{ML^{n+1}(t - t_0)^{n+2}}{(n+2)!}.
$$

*Step 3: uniform convergence.* Write $y_n = y_0 + \sum_{k=0}^{n-1}(y_{k+1} - y_k)$. By [[#eq-picard-estimate]] the $k$th term is bounded on $I$ by the constant $M L^k h^{k+1}/(k+1)!$, and

$$
\sum_{k=0}^{\infty}\frac{ML^k h^{k+1}}{(k+1)!} = \frac{M}{L}\bigl(e^{Lh} - 1\bigr) < \infty .
$$

By the Weierstrass M-test ([[real-analysis/uniform-convergence]]) the series converges uniformly on $I$, so $y_n \to y$ uniformly for some continuous function $y$ on $I$. Since each $\lvert y_n(t) - y_0\rvert \le b$, also $\lvert y(t) - y_0\rvert \le b$: the graph of $y$ lies in $R$.

*Step 4: the limit solves the IVP.* For $s \in I$, $\lvert f(s, y_n(s)) - f(s, y(s))\rvert \le L\lvert y_n(s) - y(s)\rvert$, which tends to $0$ uniformly. Hence $\int_{t_0}^t f(s,y_n(s))\,ds \to \int_{t_0}^t f(s, y(s))\,ds$, and letting $n\to\infty$ in the definition of $y_{n+1}$ gives

$$
y(t) = y_0 + \int_{t_0}^{t} f(s, y(s))\,ds \qquad (t \in I).
$$

By [[#lem-integral]], $y$ solves the IVP on $I$.

*Step 5: uniqueness.* Let $z$ be another solution on $I$ with graph in $R$. Subtracting the integral equations for $y$ and $z$ and using the Lipschitz condition, $w = \lvert y - z\rvert$ satisfies, for $t \ge t_0$,

$$
w(t) \le \int_{t_0}^{t} L\,w(s)\,ds .
$$

Gronwall's inequality ([[#lem-gronwall]]) with $C = 0$ gives $w(t) \le 0$, so $w \equiv 0$ for $t \ge t_0$; the left-hand version handles $t \le t_0$. Hence $z = y$.
:::

::: remark Solutions cannot escape early
If $f$ is defined on a larger set than $R$, a solution of the IVP could in principle leave $R$. It cannot do so while $\lvert t - t_0\rvert < h$: if $\lvert z(t_1) - y_0\rvert = b$ for a first time $t_1 > t_0$, then $\lvert z'\rvert \le M$ on $[t_0, t_1]$ gives $b \le M(t_1 - t_0)$, so $t_1 - t_0 \ge b/M \ge h$. Hence uniqueness holds among *all* solutions on $I$, not only those with graph in $R$.
:::

The same Gronwall argument shows that solutions depend continuously on their initial values — the mathematical content of the statement that a deterministic model makes predictions.

::: corollary Continuous dependence on initial data {#cor-dependence}
Under the hypotheses of [[#thm-picard]], let $y$ and $z$ solve $y' = f(t,y)$ on an interval $J \ni t_0$ with graphs in $R$, and initial values $y(t_0) = y_0$, $z(t_0) = z_0$. Then

$$
\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert\,e^{L\lvert t - t_0\rvert} \qquad (t \in J).
$$
:::

::: proof
Subtracting the integral equations, $\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert + L\bigl\lvert\int_{t_0}^t \lvert y(s) - z(s)\rvert\,ds\bigr\rvert$. Apply [[#lem-gronwall]] with $C = \lvert y_0 - z_0\rvert$ on each side of $t_0$.
:::

The factor $e^{L\lvert t - t_0\rvert}$ is a warning as well as a guarantee: initial errors may be amplified exponentially. In a chaotic system such as the weather this amplification is real, and it limits how far ahead any forecast can be trusted.

::: example How long is the guaranteed interval? {#ex-interval}
Apply [[#thm-picard]] to $y' = y^2$, $y(0) = 1$. What is the best interval the theorem can guarantee, and how does it compare with the true interval of existence?
::: solution
On $R = \set{\lvert t\rvert \le a,\ \lvert y - 1\rvert \le b}$ we have $M = \max\lvert y^2\rvert = (1+b)^2$, and $f$ is Lipschitz with $L = 2(1+b)$ by [[#prop-c1-lipschitz]]. The theorem gives existence on $\lvert t\rvert \le h$ with

$$
h = \min\left(a, \frac{b}{(1+b)^2}\right).
$$

Taking $a$ large, we maximise $b/(1+b)^2$: its derivative $\frac{1-b}{(1+b)^3}$ vanishes at $b = 1$, giving $h = \tfrac14$. The theorem therefore guarantees a solution on $[-\tfrac14, \tfrac14]$, while the actual solution $1/(1 - t)$ exists on $(-\infty, 1)$. The theorem is *local* and deliberately cautious: it uses only crude information (the bound $M$) about $f$ on a fixed rectangle.
:::
:::

::: quiz
For which initial conditions does [[#thm-picard]] guarantee a unique solution of $y' = y^{2/3}$ near $t_0$? (Select all that apply.)
- [x] $y(0) = 1$
- [x] $y(2) = -3$
- [ ] $y(0) = 0$
- [ ] $y(5) = 0$
::: solution
$f(y) = y^{2/3}$ has $f'(y) = \tfrac23 y^{-1/3}$, which is continuous and bounded on any rectangle that avoids the line $y = 0$. So for $y_0 = 1$ and $y_0 = -3$ we can choose $b < \lvert y_0\rvert$, and [[#prop-c1-lipschitz]] gives a Lipschitz condition. When $y_0 = 0$ every rectangle contains points with $y = 0$, where $f$ is not Lipschitz; the theorem does not apply, and in fact uniqueness fails, as in [[#ex-nonunique]].
:::
:::

### Global solutions and blow-up

[[#thm-picard]] is local, and [[#ex-interval]] shows why: on a rectangle the slope bound $M$ limits how long we can guarantee that solutions stay inside. If $f$ is Lipschitz on a whole vertical strip, there is no rectangle to leave, and the same proof works on the entire interval.

::: theorem Global existence {#thm-global}
Let $f$ be continuous on the strip $S = [\alpha, \beta]\times\R$ and Lipschitz in $y$ on $S$ with constant $L$. Then for every $t_0 \in [\alpha,\beta]$ and $y_0\in\R$, the IVP $y' = f(t,y)$, $y(t_0) = y_0$ has exactly one solution on the whole interval $[\alpha,\beta]$.
:::

::: proof
The Picard iterates are now defined on all of $[\alpha,\beta]$ without any restriction. Let $K = \max_{[\alpha,\beta]}\lvert f(t, y_0)\rvert$. Then $\lvert y_1(t) - y_0\rvert \le K\lvert t - t_0\rvert$, and exactly the induction of Step 2 gives $\lvert y_{n+1}(t) - y_n(t)\rvert \le KL^n\lvert t-t_0\rvert^{n+1}/(n+1)!$. Steps 3–5 go through word for word with $M$ replaced by $K$ and $h$ by $\beta - \alpha$.
:::

::: corollary Linear equations have global solutions {#cor-linear-global}
If $p$ and $q$ are continuous on an interval $I$, every solution of $y' = -p(t)y + q(t)$ through a point of $I\times\R$ exists on all of $I$ and is unique.
:::

::: proof
On each closed subinterval $[\alpha,\beta]\subseteq I$, $\lvert f(t,y) - f(t,z)\rvert = \lvert p(t)\rvert\,\lvert y - z\rvert \le L\lvert y - z\rvert$ with $L = \max_{[\alpha,\beta]}\lvert p\rvert$, so [[#thm-global]] applies. Every point of $I$ lies in such a subinterval containing $t_0$, and uniqueness lets us patch the solutions together.
:::

This recovers the existence part of [[ode/first-order#thm-linear]] without a formula. It also settles problem (c) from the introduction: for $f(t,y) = \sin(ty)$, $\lvert\partial f/\partial y\rvert = \lvert t\cos(ty)\rvert \le \max(\lvert\alpha\rvert,\lvert\beta\rvert)$ on any strip, so the solution exists on every $[\alpha, \beta]$, hence on all of $\R$ ([[#exr-2-7]]).

For nonlinear equations without a global Lipschitz condition, the general picture is the following. We state it without the (not difficult, but fiddly) proof, which glues local solutions together using uniqueness; see Teschl's notes or Coddington–Levinson, Chapter 1.

::: theorem Maximal solutions {#thm-maximal}
Let $f$ and $\partial f/\partial y$ be continuous on an open set $D\subseteq\R^2$ and $(t_0, y_0) \in D$. Then the IVP has a unique solution on a largest open interval $(\omega_-, \omega_+) \ni t_0$. If $\omega_+ < \infty$, then $(t, y(t))$ eventually leaves every compact subset of $D$ as $t\to\omega_+$; in particular, if $D = \R^2$ then $\lvert y(t)\rvert\to\infty$ as $t \to \omega_+$. The same holds at $\omega_-$.
:::

In words: **a solution of an equation defined on the whole plane can only stop existing by blowing up.** This is what happens to $y = 1/(1 - t)$ at $t = 1$.

::: remark Existence without uniqueness
Peano showed in 1886 (with a complete proof in 1890) that continuity of $f$ alone already guarantees that the IVP has at least one solution. His theorem needs a compactness argument (the Arzelà–Ascoli theorem) instead of the contraction-like estimates above, and, as [[#ex-nonunique]] shows, it cannot promise uniqueness. For almost every equation in applications, $f$ has continuous partial derivatives and Picard–Lindelöf applies.
:::

## Autonomous equations and the phase line {#sec-phase-line}

An equation $y' = f(y)$ whose right-hand side does not depend on $t$ is called **autonomous**. Its slope field is the same along every horizontal line, and all the essential information can be drawn on a single vertical line, the **phase line**.

::: definition Equilibria and their stability {#def-equilibrium}
A number $y^*$ with $f(y^*) = 0$ is an **equilibrium** (or critical point) of $y' = f(y)$; the constant function $y\equiv y^*$ is then a solution. The equilibrium is **asymptotically stable** if every solution starting sufficiently close to $y^*$ tends to $y^*$ as $t\to\infty$, and **unstable** if there are solutions starting arbitrarily close to $y^*$ that move away from it.
:::

::: proposition Behaviour of autonomous equations {#prop-autonomous}
Let $f$ be continuously differentiable on $\R$.

1. A solution that is not constant never takes an equilibrium value, and it is strictly increasing or strictly decreasing.
2. If a solution is bounded on its maximal interval $[t_0, \omega_+)$, then $\omega_+ = \infty$ and $y(t)$ converges to an equilibrium as $t \to \infty$.
3. If $f(y^*) = 0$ and $f'(y^*) < 0$, then $y^*$ is asymptotically stable; if $f'(y^*) > 0$, it is unstable.
:::

::: proof
1. If $y(t_1) = y^*$ with $f(y^*) = 0$, then $y$ and the constant $y^*$ solve the same IVP at $t_1$, so by uniqueness ([[#thm-picard]]; $f$ is Lipschitz near every point by [[#prop-c1-lipschitz]]) $y \equiv y^*$. So a non-constant solution has $f(y(t)) \ne 0$ for all $t$; as $t\mapsto f(y(t))$ is continuous, the intermediate value theorem shows it has constant sign. Thus $y'$ has constant sign and $y$ is strictly monotone.

2. A bounded solution cannot blow up, so $\omega_+ = \infty$ by [[#thm-maximal]]. By part 1 it is monotone, so it has a limit $\ell$. If $f(\ell) > 0$, then by continuity $y'(t) = f(y(t)) > f(\ell)/2$ for all large $t$, which forces $y(t)\to\infty$, a contradiction; similarly $f(\ell) < 0$ is impossible. So $f(\ell) = 0$.

3. If $f'(y^*) < 0$, there is $\delta > 0$ such that $f > 0$ on $(y^* - \delta, y^*)$ and $f < 0$ on $(y^*, y^* + \delta)$, and $y^*$ is the only equilibrium in $(y^* - \delta, y^* + \delta)$. A solution starting in $(y^*, y^*+\delta)$ decreases (part 1), cannot cross $y^*$ (part 1 again), is bounded, and so by part 2 converges to an equilibrium in $[y^*, y^*+\delta)$, which must be $y^*$. Solutions starting below $y^*$ are handled in the same way. If $f'(y^*) > 0$, solutions starting slightly above $y^*$ increase and cannot converge to $y^*$, so they move away.
:::

To draw a phase line, mark the zeros of $f$, and between consecutive zeros draw an arrow upward where $f > 0$ and downward where $f < 0$. Equilibria with arrows pointing towards them on both sides are stable; this is the picture behind [[#prop-autonomous]].

::: example Harvesting a population {#ex-harvest}
A fish population, measured in units of its carrying capacity, obeys $y' = y(1 - y) - h$, where the constant $h \ge 0$ is the harvesting rate. Draw the phase line for $h = 3/16$ and describe what happens for larger $h$.
::: solution
For $h = \tfrac{3}{16}$, $f(y) = -y^2 + y - \tfrac3{16} = -(y - \tfrac14)(y - \tfrac34)$. The equilibria are $\tfrac14$ and $\tfrac34$, with $f'(y) = 1 - 2y$ equal to $\tfrac12$ and $-\tfrac12$ respectively. So $\tfrac34$ is asymptotically stable and $\tfrac14$ unstable. On the phase line: $f < 0$ below $\tfrac14$ (arrow down), $f > 0$ between (arrow up), $f < 0$ above $\tfrac34$ (arrow down).

A population starting above $\tfrac14$ settles at $\tfrac34$; one starting below $\tfrac14$ decreases, and since $f(0) = -h < 0$ it reaches $0$ in finite time — the fishery collapses. In general the equilibria are $\tfrac12 \pm \sqrt{\tfrac14 - h}$. As $h$ increases towards $\tfrac14$ they approach each other, merge at $h = \tfrac14$, and disappear for $h > \tfrac14$, when $f < 0$ everywhere and every population collapses. This sudden change in behaviour as a parameter crosses a critical value is a **bifurcation** (a saddle–node bifurcation): a small increase in fishing effort past $h = \tfrac14$ destroys the stable state.
:::
:::

::: widget slopefield
f: y*(1 - y) - h
x: 0, 12
y: -0.4, 1.4
sliders: h=0.1875:0:0.35:0.0125
points: 0, 0.2; 0, 0.3; 0, 1.2
caption: Harvested logistic growth $y' = y(1-y) - h$ (horizontal axis $t$). Because the equation is autonomous, shifting a solution curve sideways gives another solution curve. Slide $h$ up to $0.25$ and watch the stable and unstable equilibria approach each other and annihilate; beyond that, every solution collapses.
:::

::: quiz
For $y' = y^2 - 1$, which statement is correct?
- [ ] Both equilibria $y = \pm1$ are stable.
- [x] $y = -1$ is asymptotically stable and $y = 1$ is unstable.
- [ ] $y = 1$ is asymptotically stable and $y = -1$ is unstable.
- [ ] Every solution tends to $-1$.
::: solution
$f(y) = y^2 - 1$ has $f'(-1) = -2 < 0$ and $f'(1) = 2 > 0$, so by [[#prop-autonomous]] $-1$ is asymptotically stable and $1$ is unstable. Not every solution tends to $-1$: solutions starting above $1$ increase and in fact blow up in finite time (compare $y' = y^2$).
:::
:::

## Euler's method

When no formula is available we approximate. The simplest idea is to follow the slope field in short straight steps.

::: algorithm Euler's method {#alg-euler}
Given $y' = f(t,y)$, $y(t_0) = y_0$ and a step size $h > 0$, set $t_n = t_0 + nh$ and

$$
y_{n+1} = y_n + h\,f(t_n, y_n) \qquad (n = 0, 1, 2, \dots).
$$

Then $y_n$ is the approximation to $y(t_n)$.
:::

Each step moves along the tangent line of the solution through the current point, so it commits an error of order $h^2$ (the curvature of the solution over one step). Over a fixed time interval there are about $1/h$ steps, which suggests a total error of order $h$. The danger is that errors made early are carried along and possibly amplified, just as in [[#cor-dependence]]. The following theorem shows that the amplification is controlled by the same factor $e^{L(t - t_0)}$.

::: theorem Convergence of Euler's method {#thm-euler}
Suppose $f$ is Lipschitz in $y$ with constant $L > 0$ on the strip $[t_0, T]\times\R$, and that the solution $y$ of the IVP is twice continuously differentiable on $[t_0, T]$ with $\lvert y''\rvert \le K$. Then the Euler approximations satisfy, for all $n$ with $t_n \le T$,

$$
\lvert y(t_n) - y_n\rvert \le \frac{Kh}{2L}\left(e^{L(t_n - t_0)} - 1\right).
$$

In particular the error at a fixed time is $O(h)$: Euler's method is **first-order accurate**.
:::

::: proof
By Taylor's theorem with remainder, for some $\xi_n \in (t_n, t_{n+1})$,

$$
y(t_{n+1}) = y(t_n) + h\,y'(t_n) + \frac{h^2}{2}\,y''(\xi_n) = y(t_n) + h\,f\bigl(t_n, y(t_n)\bigr) + \tau_n, \qquad \lvert\tau_n\rvert \le \frac{Kh^2}{2}.
$$

Subtract the Euler step $y_{n+1} = y_n + hf(t_n, y_n)$ and write $e_n = y(t_n) - y_n$:

$$
\lvert e_{n+1}\rvert \le \lvert e_n\rvert + h\,\bigl\lvert f(t_n, y(t_n)) - f(t_n, y_n)\bigr\rvert + \lvert\tau_n\rvert \le (1 + hL)\,\lvert e_n\rvert + \frac{Kh^2}{2}.
$$

Since $e_0 = 0$, induction gives

$$
\lvert e_n\rvert \le \frac{Kh^2}{2}\sum_{j=0}^{n-1}(1 + hL)^j = \frac{Kh^2}{2}\cdot\frac{(1+hL)^n - 1}{hL} = \frac{Kh}{2L}\bigl((1 + hL)^n - 1\bigr).
$$

Finally $1 + hL \le e^{hL}$, so $(1 + hL)^n \le e^{nhL} = e^{L(t_n - t_0)}$.
:::

::: example Euler's method for exponential growth {#ex-euler}
Apply Euler's method to $y' = y$, $y(0) = 1$ on $[0,1]$ with $h = 0.1$, and compare the error with [[#thm-euler]].
::: solution
Here $y_{n+1} = y_n + hy_n = (1 + h)y_n$, so $y_n = (1+h)^n$. With $h = 0.1$, $y_{10} = 1.1^{10} \approx 2.5937$, while $y(1) = e \approx 2.7183$. The error is about $0.1245$.

For the bound: $f(t,y) = y$ has $L = 1$, and $y'' = e^t \le e = K$ on $[0,1]$. The theorem gives

$$
\lvert e - y_{10}\rvert \le \frac{e\cdot 0.1}{2}\,(e - 1) \approx 0.234,
$$

which is valid but pessimistic by a factor of about two. Halving the step to $h = 0.05$ gives $1.05^{20} \approx 2.6533$ and error $0.0650$; halving again gives error $0.0332$. Each halving of $h$ roughly halves the error, as expected of a first-order method. (The error is close to $\tfrac{e}{2}h$; compare [[#exr-2-8]].)
:::
:::

::: widget odesolver
f: y
y0: 1
t: 0, 2
exact: exp(t)
h: 0.25
methods: euler; heun; rk4
caption: Euler's method (and two higher-order methods) for $y' = y$, $y(0) = 1$, against the exact solution $e^t$. Shrink the step size and watch the global error: Euler's error halves when $h$ halves, Heun's falls by a factor of four and RK4's by sixteen. Euler consistently undershoots here because the solution is convex and each step follows a tangent line, which lies below the curve.
:::

::: warning Small steps are not a cure-all
[[#thm-euler]] says the error tends to zero as $h\to0$, but the constant $e^{L(t_n-t_0)}$ can be astronomically large on long intervals, and in floating-point arithmetic very small steps accumulate rounding error ([[numerical-analysis/floating-point]]). Moreover, a numerical method will happily produce numbers past a blow-up time or through a point of non-uniqueness. Always know, from the theory of this chapter, what the solution can and cannot do before trusting a computation.
:::

::: application Why weather forecasts have a horizon
Numerical weather prediction integrates a huge system of differential equations forward from today's measured state. [[#cor-dependence]] guarantees that small errors in the initial data produce small errors in the forecast — but only up to a factor that grows exponentially in time. For the atmosphere this growth is genuine, not an artefact of a crude bound: in 1963 Edward Lorenz showed that a simple three-variable convection model is acutely sensitive to its initial conditions. This is why weather forecasts lose their skill after roughly two weeks, however good the computers.
:::

::: history
Cauchy gave the first existence proof for initial value problems in his lectures at the École polytechnique in the 1820s, by showing that Euler's polygonal approximations converge when $f$ and $\partial f/\partial y$ are continuous; Euler had described the polygon method in his *Institutionum calculi integralis* of 1768. Rudolf Lipschitz later replaced the hypothesis on $\partial f/\partial y$ by the condition that now bears his name. Giuseppe Peano proved existence under continuity alone (announced in 1886, fully proved in 1890), and in 1890 Émile Picard published the method of successive approximations. In 1894 Ernst Lindelöf refined Picard's argument, giving the theorem essentially the form proved above. In France the result is often called the Cauchy–Lipschitz theorem.
:::

## Where this leads

The proof of [[#thm-picard]] is the prototype of the **contraction mapping principle** proved in [[real-analysis/metric-spaces]], and it extends without change to systems of equations, where $y$ becomes a vector and absolute values become norms; this is how we shall justify the existence of solutions in [[ode/second-order-linear]] and [[ode/linear-systems]]. Euler's method is only the first of many numerical schemes; [[numerical-analysis/numerical-odes]] develops Runge–Kutta methods, error control and stiffness. The phase line is the one-dimensional case of the phase plane of [[ode/nonlinear-systems]], where equilibria and their stability become far richer.

::: summary
- Slope fields show solutions as curves tangent to a field of segments; isoclines $f(t,y) = c$ speed up sketching.
- An IVP is equivalent to the integral equation $y = y_0 + \int_{t_0}^t f(s,y(s))\,ds$, whose fixed point is approached by the Picard iterates ([[#lem-integral]], [[#def-picard]]).
- **Picard–Lindelöf**: if $f$ is continuous and Lipschitz in $y$ on a rectangle, there is exactly one solution on $\lvert t - t_0\rvert \le \min(a, b/M)$ ([[#thm-picard]]). Continuous $\partial f/\partial y$ suffices for the Lipschitz condition.
- Without a Lipschitz condition uniqueness can fail ($y' = 3y^{2/3}$); without a global one, solutions can blow up ($y' = y^2$). On the whole plane, blow-up is the only way a solution can end ([[#thm-maximal]]).
- Gronwall's inequality gives uniqueness and continuous dependence: $\lvert y(t) - z(t)\rvert \le \lvert y_0 - z_0\rvert e^{L\lvert t-t_0\rvert}$.
- For autonomous equations, non-constant solutions are monotone and bounded ones converge to equilibria; $f'(y^*) < 0$ means stable, $f'(y^*) > 0$ unstable.
- Euler's method $y_{n+1} = y_n + hf(t_n,y_n)$ converges with error $O(h)$ ([[#thm-euler]]).
:::

## Exercises

::: exercise Picard iterates {level=1 check="1/3"}
Compute the first three Picard iterates $y_1, y_2, y_3$ for $y' = -y$, $y(0) = 1$, and evaluate $y_3(1)$.
::: solution
$y_1 = 1 + \int_0^t (-1)\,ds = 1 - t$, $y_2 = 1 - \int_0^t (1 - s)\,ds = 1 - t + \frac{t^2}{2}$, $y_3 = 1 - \int_0^t\bigl(1 - s + \frac{s^2}{2}\bigr)ds = 1 - t + \frac{t^2}{2} - \frac{t^3}{6}$. These are the Taylor polynomials of the solution $e^{-t}$, and $y_3(1) = 1 - 1 + \frac12 - \frac16 = \frac13$ (compared with $e^{-1}\approx 0.368$).
:::
:::

::: exercise Two Euler steps {level=1 check="5/2"}
Use Euler's method with $h = 0.5$ to approximate $y(1)$ for $y' = t + y$, $y(0) = 1$. Compare with the exact solution $y = 2e^t - t - 1$.
::: solution
$y_1 = 1 + 0.5\,(0 + 1) = 1.5$ and $y_2 = 1.5 + 0.5\,(0.5 + 1.5) = 2.5$. The exact value is $2e - 2 \approx 3.437$, so the error is about $0.94$ — large, because $h$ is large and the solution is strongly convex.
:::
:::

::: exercise A phase line {level=1 check="1"}
Draw the phase line of $y' = y^2 - 4y + 3$, classify the equilibria, and find $\lim_{t\to\infty} y(t)$ for the solution with $y(0) = 2$.
::: solution
$f(y) = (y - 1)(y - 3)$, with $f'(y) = 2y - 4$: $f'(1) = -2 < 0$, so $y = 1$ is asymptotically stable; $f'(3) = 2 > 0$, so $y = 3$ is unstable. For $1 < y < 3$, $f < 0$, so the solution starting at $2$ decreases, stays above $1$, and by [[#prop-autonomous]] converges to $1$.
:::
:::

::: exercise The best Lipschitz constant {level=2 check="2 + cos(1)"}
Find the smallest Lipschitz constant in $y$ of $f(t,y) = t\sin y + y^2$ on the square $\lvert t\rvert \le 1$, $\lvert y\rvert \le 1$.
::: hint
For a function with continuous $\partial f/\partial y$ on a rectangle, the smallest Lipschitz constant is $\max\lvert\partial f/\partial y\rvert$.
:::
::: solution
By [[#prop-c1-lipschitz]], $L = \max\lvert f_y\rvert$ works; it is also the smallest, since $f_y(t,y)$ is a limit of difference quotients $\frac{f(t,z) - f(t,y)}{z - y}$, each bounded in absolute value by any Lipschitz constant. Here $f_y = t\cos y + 2y$. Since $\cos y > 0$ for $\lvert y\rvert \le 1$, the maximum of $\lvert t\cos y + 2y\rvert$ occurs with $t = \sgn(y)$, giving $\cos y + 2\lvert y\rvert$, which increases in $\lvert y\rvert$ because its derivative $2 - \sin\lvert y\rvert > 0$. So the smallest constant is $L = \cos 1 + 2 \approx 2.540$.
:::
:::

::: exercise The guaranteed interval {level=2 check="1/2"}
Apply [[#thm-picard]] to $y' = 1 + y^2$, $y(0) = 0$ on rectangles $\lvert t\rvert\le a$, $\lvert y\rvert\le b$ with $a \ge 1$. What is the largest $h$ the theorem can give? Compare with the true solution.
::: solution
$M = 1 + b^2$, so $h = \min\bigl(a, \frac{b}{1+b^2}\bigr)$. The function $b/(1+b^2)$ has derivative $(1 - b^2)/(1+b^2)^2$, so its maximum is at $b = 1$, where it equals $\frac12$. Hence the best guarantee is $h = \frac12$. The true solution is $y = \tan t$, which exists on $(-\frac\pi2, \frac\pi2)$, an interval about three times longer.
:::
:::

::: exercise All solutions {level=2}
Find all solutions of $y' = \sqrt{\lvert y\rvert}$, $y(0) = 0$, defined on $\R$.
::: solution
Since $y' \ge 0$, every solution is non-decreasing. Where $y > 0$, separating gives $2\sqrt y = t - c$, i.e. $y = (t-c)^2/4$ for $t > c$; where $y < 0$, $y' = \sqrt{-y}$ gives $-2\sqrt{-y} = t - c'$, i.e. $y = -(c' - t)^2/4$ for $t < c'$. Gluing as in [[#ex-nonunique]], the solutions are: for any $c' \le 0 \le c$ (with $c' = -\infty$ or $c = +\infty$ allowed),

$$
y(t) = \begin{cases} -\tfrac14 (c' - t)^2, & t < c', \\ 0, & c' \le t \le c, \\ \tfrac14 (t - c)^2, & t > c. \end{cases}
$$

Each piece solves the equation and the derivatives match ($=0$) at the junctions. Uniqueness fails because $\sqrt{\lvert y\rvert}$ is not Lipschitz near $y = 0$.
:::
:::

::: exercise A solution that exists forever {level=3}
Prove that the IVP $y' = \sin(ty)$, $y(0) = 1$ has a unique solution defined on all of $\R$.
::: solution
Let $\beta > 0$ and consider the strip $S = [-\beta, \beta]\times\R$. The function $f(t,y) = \sin(ty)$ is continuous, and $\lvert\partial f/\partial y\rvert = \lvert t\cos(ty)\rvert \le \beta$ on $S$, so by [[#prop-c1-lipschitz]] (a strip contains the vertical segment between any two of its points with the same $t$) $f$ is Lipschitz in $y$ on $S$ with $L = \beta$. By [[#thm-global]] there is exactly one solution $y_\beta$ on $[-\beta,\beta]$. If $\beta < \gamma$, then $y_\gamma$ restricted to $[-\beta,\beta]$ also solves the IVP there, so it equals $y_\beta$. Hence $y(t) = y_\beta(t)$ for any $\beta > \lvert t\rvert$ is a well-defined function on $\R$ solving the IVP, and any solution on $\R$ coincides with it on every $[-\beta,\beta]$.
:::
:::

::: exercise Euler's method and the number e {level=3}
Use [[#thm-euler]] for $y' = y$, $y(0) = 1$ on $[0, t]$ with $h = t/n$ to prove that $(1 + t/n)^n \to e^t$ for every $t > 0$, with an error at most $\frac{t\,e^{t}(e^t - 1)}{2n}$.
::: solution
Euler's method gives $y_{k+1} = (1 + h)y_k$, so after $n$ steps $y_n = (1 + t/n)^n$, an approximation to $y(t) = e^t$. On $[0,t]$ the Lipschitz constant is $L = 1$ and $\lvert y''\rvert = e^s \le e^t = K$. The theorem gives

$$
\left\lvert e^t - \left(1 + \frac tn\right)^n\right\rvert \le \frac{e^t\,(t/n)}{2}\bigl(e^t - 1\bigr) = \frac{t\,e^t(e^t - 1)}{2n} \longrightarrow 0
$$

as $n\to\infty$. (For $t = 1$ the error is at most $e(e-1)/(2n)\approx 2.34/n$; the true error is close to $e/(2n)\approx 1.36/n$.)
:::
:::

::: exercise Proving blow-up by comparison {level=3}
Let $y$ be the solution of $y' = t^2 + y^2$, $y(0) = 1$ on its maximal interval $[0,\omega_+)$. Prove that $\omega_+ \le 1$, so the solution blows up no later than $t = 1$.
::: hint
As long as $y > 0$, compute $\frac{d}{dt}\left(-\frac1y\right)$ and compare with the solution of $y' = y^2$.
:::
::: solution
Since $y' \ge y^2 \ge 0$, $y$ is non-decreasing, so $y(t) \ge 1 > 0$ on $[0,\omega_+)$. There,

$$
\frac{d}{dt}\left(-\frac{1}{y}\right) = \frac{y'}{y^2} = \frac{t^2 + y^2}{y^2} \ge 1 .
$$

Integrating from $0$ to $t$: $-\frac{1}{y(t)} + 1 \ge t$, so $\frac{1}{y(t)} \le 1 - t$. Suppose $\omega_+ > 1$. Then $y$ is continuous on $[0,1]$, hence bounded there, yet for $t < 1$ we have $y(t) \ge \frac{1}{1 - t}\to\infty$ as $t\to1^-$: a contradiction. Hence $\omega_+ \le 1$, and by [[#thm-maximal]], $y(t)\to\infty$ as $t\to\omega_+$. (Numerically, $\omega_+ \approx 0.97$.)
:::
:::
