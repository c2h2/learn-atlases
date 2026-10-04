A car's speedometer reads $50$ km/h at every instant of a one-hour journey of $60$ km. Something is wrong: an average speed of $60$ km/h must be matched, at some instant, by an instantaneous speed of exactly $60$ km/h. That is the **mean value theorem**, and it is the most useful single fact about derivatives. It turns information about $f'$ — the local rate of change — into information about $f$ itself: functions with zero derivative are constant, functions with positive derivative increase, functions with bounded derivative cannot change quickly.

In calculus you computed derivatives with rules; in this chapter we prove the rules, prove the mean value theorem from the extreme value theorem of [[real-analysis/continuity]], and use it to justify L'Hôpital's rule and Taylor's theorem with an explicit remainder. Along the way we meet derivatives that are not continuous, a function whose Taylor series converges to the wrong function, and the surprising fact that every derivative — continuous or not — has the intermediate value property.

## The derivative

Throughout, $I$ denotes an interval with more than one point. Every point of $I$ is then a limit point of $I$, so limits as $x \to c$ within $I$ make sense ([[real-analysis/continuity#def-function-limit]]).

::: definition Derivative {#def-derivative}
Let $f\colon I \to \R$ and $c \in I$. The function $f$ is **differentiable at** $c$ if the limit

$$
f'(c) = \lim_{x\to c}\frac{f(x) - f(c)}{x - c}
$$

exists (as a real number), the limit being taken over $x \in I$, $x \ne c$. Then $f'(c)$ is the **derivative** of $f$ at $c$. If $f$ is differentiable at every point of $I$, it is **differentiable on** $I$, and $f'\colon I\to\R$ is its derivative.
:::

At an end-point of $I$ the limit is automatically one-sided. Writing $x = c + h$ gives the familiar form $f'(c) = \lim_{h\to0}\frac{f(c+h) - f(c)}{h}$.

::: widget secant
f: x^3 - x
x0: 1
h: 1
x: -1.5, 2.5
caption: The secant through $(1, f(1))$ and $(1 + h, f(1 + h))$ for $f(x) = x^3 - x$. Slide $h$ towards $0$ from either side: the secant slopes $\frac{f(1+h) - f(1)}{h} = 2 + 3h + h^2$ approach the tangent slope $f'(1) = 2$. The derivative *is* this limit; nothing else.
:::

The quotient $\frac{f(x) - f(c)}{x-c}$ is awkward in proofs because we cannot divide by $x - c$ at $x = c$. Carathéodory's reformulation removes the division.

::: lemma Carathéodory's criterion {#lem-caratheodory}
$f\colon I \to \R$ is differentiable at $c$ if and only if there is a function $\varphi\colon I \to \R$, continuous at $c$, such that

$$
f(x) - f(c) = \varphi(x)(x - c) \qquad\text{for all } x \in I.
$$

In that case $f'(c) = \varphi(c)$.
:::

::: proof
If $f$ is differentiable at $c$, define $\varphi(x) = \frac{f(x) - f(c)}{x - c}$ for $x \ne c$ and $\varphi(c) = f'(c)$. The identity holds (trivially at $x = c$), and $\varphi$ is continuous at $c$ because $\lim_{x\to c}\varphi(x) = f'(c) = \varphi(c)$. Conversely, if such $\varphi$ exists, then for $x \ne c$ the difference quotient equals $\varphi(x)$, which tends to $\varphi(c)$ as $x \to c$. So $f'(c)$ exists and equals $\varphi(c)$.
:::

::: theorem Differentiability implies continuity {#thm-diff-continuous}
If $f$ is differentiable at $c$, then $f$ is continuous at $c$.
:::

::: proof
With $\varphi$ as in [[#lem-caratheodory]], $f(x) = f(c) + \varphi(x)(x - c)$. As $x \to c$, $\varphi(x) \to \varphi(c)$ and $x - c \to 0$, so $f(x) \to f(c)$.
:::

The converse fails: $\abs{x}$ is continuous at $0$ but its difference quotients are $+1$ to the right and $-1$ to the left. Far worse is possible — in [[real-analysis/uniform-convergence]] we meet Weierstrass's function, continuous everywhere and differentiable nowhere.

The sum, product and quotient rules follow from [[#lem-caratheodory]] with almost no effort. For instance, if $f(x) - f(c) = \varphi(x)(x - c)$ and $g(x) - g(c) = \psi(x)(x - c)$, then

$$
f(x)g(x) - f(c)g(c) = \bigl(f(x) - f(c)\bigr)g(x) + f(c)\bigl(g(x) - g(c)\bigr) = \bigl[\varphi(x)g(x) + f(c)\psi(x)\bigr](x - c),
$$

and the bracket is continuous at $c$ (because $g$ is, by [[#thm-diff-continuous]]), with value $f'(c)g(c) + f(c)g'(c)$ at $c$. That is the product rule. The chain rule is where the reformulation really pays off.

::: theorem Chain rule {#thm-chain-rule}
Let $f\colon I \to \R$ be differentiable at $c$, let $f(I) \subseteq J$ for an interval $J$, and let $g\colon J \to \R$ be differentiable at $f(c)$. Then $g\circ f$ is differentiable at $c$ and

$$
(g \circ f)'(c) = g'\bigl(f(c)\bigr)\,f'(c).
$$
:::

::: proof
By [[#lem-caratheodory]] there are $\varphi$, continuous at $c$ with $\varphi(c) = f'(c)$, and $\psi$, continuous at $f(c)$ with $\psi(f(c)) = g'(f(c))$, such that

$$
f(x) - f(c) = \varphi(x)(x - c) \quad (x \in I), \qquad g(y) - g\bigl(f(c)\bigr) = \psi(y)\bigl(y - f(c)\bigr) \quad (y \in J).
$$

Substituting $y = f(x)$ in the second identity and then using the first,

$$
g\bigl(f(x)\bigr) - g\bigl(f(c)\bigr) = \psi\bigl(f(x)\bigr)\bigl(f(x) - f(c)\bigr) = \psi\bigl(f(x)\bigr)\varphi(x)\,(x - c).
$$

The function $x \mapsto \psi(f(x))\varphi(x)$ is continuous at $c$: $f$ is continuous at $c$ and $\psi$ at $f(c)$, so $\psi\circ f$ is continuous at $c$ ([[real-analysis/continuity#thm-composition]]), and products of functions continuous at $c$ are continuous at $c$. By [[#lem-caratheodory]], $g\circ f$ is differentiable at $c$ with derivative $\psi(f(c))\varphi(c) = g'(f(c))f'(c)$.
:::

::: warning The tempting proof of the chain rule is wrong
It is tempting to write $\dfrac{g(f(x)) - g(f(c))}{x - c} = \dfrac{g(f(x)) - g(f(c))}{f(x) - f(c)}\cdot\dfrac{f(x) - f(c)}{x - c}$ and let $x \to c$. But $f(x) - f(c)$ may vanish for $x$ arbitrarily close to $c$, and then the first fraction is undefined. This really happens: for $f(x) = x^2\sin(1/x)$ (with $f(0) = 0$) and $c = 0$, $f(x) = 0$ at every $x = 1/(n\pi)$. Carathéodory's $\psi$ is defined at $y = f(c)$ too, which is exactly what rescues the argument.
:::

::: example A derivative that is not continuous {#ex-discontinuous-derivative}
Let $f(x) = x^2\sin(1/x)$ for $x \ne 0$ and $f(0) = 0$. Show that $f$ is differentiable on $\R$, but that $f'$ is not continuous at $0$.
::: solution
For $x \ne 0$ the product and chain rules give

$$
f'(x) = 2x\sin\frac1x - \cos\frac1x.
$$

At $0$ we use the definition: $\left\lvert\dfrac{f(x) - f(0)}{x - 0}\right\rvert = \abs{x\sin(1/x)} \le \abs{x} \to 0$, so $f'(0) = 0$. Now take $x_n = \frac{1}{2n\pi} \to 0$: $f'(x_n) = 0 - \cos(2n\pi) = -1$, which does not tend to $f'(0) = 0$. By the sequential criterion ([[real-analysis/continuity#thm-sequential-continuity]]), $f'$ is not continuous at $0$. So "differentiable" does not imply "continuously differentiable".
:::
:::

::: widget plot
f: x^2*sin(1/x); 2x*sin(1/x) - cos(1/x)
x: -0.4, 0.4
y: -1.3, 1.3
labels: f(x) = x^2\sin(1/x); f'(x)
caption: The function $x^2\sin(1/x)$ (flattened against the parabolas $\pm x^2$) is differentiable at $0$ with $f'(0) = 0$, yet its derivative oscillates between about $-1$ and $1$ in every neighbourhood of $0$. Notice, though, that $f'$ does not *jump*: by Darboux's theorem below, no derivative can.
:::

## The mean value theorem

Everything in this section flows from one observation of Fermat's: at a peak or a trough of a smooth graph, the tangent is horizontal.

::: theorem Interior extremum theorem {#thm-fermat}
Let $f\colon (a, b) \to \R$ attain a maximum or a minimum at $c \in (a, b)$. If $f$ is differentiable at $c$, then $f'(c) = 0$.
:::

::: proof
Suppose $f$ has a maximum at $c$, so $f(x) - f(c) \le 0$ for all $x \in (a, b)$. For $x > c$ the difference quotient $\frac{f(x)-f(c)}{x - c}$ is $\le 0$, and for $x < c$ it is $\ge 0$. Since $c$ is an interior point, the quotient has the limit $f'(c)$ both from the right and from the left, and limits preserve weak inequalities: $f'(c) \le 0$ and $f'(c) \ge 0$. Hence $f'(c) = 0$. For a minimum apply this to $-f$.
:::

The converse is false ($f(x) = x^3$ has $f'(0) = 0$ but no extremum at $0$), and the theorem says nothing about end-points: $f(x) = x$ on $[0, 1]$ has its maximum at $1$, where $f' = 1$.

::: theorem Rolle's theorem {#thm-rolle}
Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$, with $f(a) = f(b)$. Then there is $c \in (a, b)$ with $f'(c) = 0$.
:::

::: proof
By the extreme value theorem ([[real-analysis/continuity#thm-evt]]) $f$ attains a maximum $M$ and a minimum $m$ on $[a, b]$. If $M = m = f(a)$, then $f$ is constant and $f'(c) = 0$ for every $c \in (a, b)$. Otherwise $M$ or $m$ differs from the common value $f(a) = f(b)$, so it is attained at some $c$ that is not an end-point. Then $c \in (a, b)$ is an interior extremum, and $f'(c) = 0$ by [[#thm-fermat]].
:::

::: theorem Mean value theorem {#thm-mvt}
Let $f$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there is $c \in (a, b)$ with

$$
f'(c) = \frac{f(b) - f(a)}{b - a}.
$$ {#eq-mvt}
:::

::: proof
Subtract the secant line: let

$$
h(x) = f(x) - f(a) - \frac{f(b) - f(a)}{b - a}(x - a).
$$

Then $h$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $h(a) = h(b) = 0$. Rolle's theorem gives $c \in (a, b)$ with $0 = h'(c) = f'(c) - \frac{f(b) - f(a)}{b - a}$.
:::

::: widget plot
f: x^3 - x; 3x
x: -0.5, 2.3
y: -1, 7
tangent: 0.5
labels: f(x) = x^3 - x; \text{secant } y = 3x
caption: For $f(x) = x^3 - x$ on $[0, 2]$ the secant through $(0, 0)$ and $(2, 6)$ has slope $3$. Drag the point of tangency until the tangent line is parallel to the secant. This happens at $c = 2/\sqrt3 \approx 1.155$, inside $(0, 2)$, where $f'(c) = 3c^2 - 1 = 3$ — the point promised by [[#thm-mvt]].
:::

The mean value theorem does not tell us *where* $c$ is, and it is rarely used to find $c$. Its power lies in the fact that some $c$ exists, so any bound on $f'$ becomes a bound on how much $f$ can change.

::: corollary Consequences of the mean value theorem {#cor-monotone}
Let $f$ be continuous on an interval $I$ and differentiable at every interior point of $I$.

1. If $f'(x) = 0$ for all interior $x$, then $f$ is constant on $I$.
2. If $f'(x) \ge 0$ for all interior $x$, then $f$ is increasing on $I$; if $f'(x) > 0$, strictly increasing. (Similarly for decreasing.)
3. If $\abs{f'(x)} \le K$ for all interior $x$, then $\abs{f(x) - f(y)} \le K\abs{x - y}$ for all $x, y \in I$.
:::

::: proof
Let $x < y$ in $I$. By [[#thm-mvt]] on $[x, y]$ there is $c \in (x, y)$, an interior point of $I$, with $f(y) - f(x) = f'(c)(y - x)$. In case 1 the right-hand side is $0$; in case 2 it is $\ge 0$ (respectively $> 0$); in case 3 its absolute value is at most $K(y - x)$.
:::

Part 1 is the reason antiderivatives are unique up to a constant, a fact used constantly in integration. Part 3 converts a bound on the derivative into a Lipschitz bound, and hence into uniform continuity ([[real-analysis/continuity#def-uniform-continuity]]).

::: example Inequalities from the mean value theorem {#ex-mvt-inequalities}
Prove that (a) $\abs{\sin x - \sin y} \le \abs{x - y}$ for all $x, y$, and (b) $\dfrac{x}{1+x} < \ln(1 + x) < x$ for all $x > -1$ with $x \ne 0$.
::: solution
(a) The derivative of $\sin$ is $\cos$, and $\abs{\cos t} \le 1$, so [[#cor-monotone]](3) with $K = 1$ gives the inequality.

(b) Apply [[#thm-mvt]] to $\ln(1 + t)$ on the interval between $0$ and $x$: there is $c$ strictly between $0$ and $x$ with

$$
\ln(1 + x) = \ln(1 + x) - \ln 1 = \frac{x}{1 + c}.
$$

If $x > 0$, then $0 < c < x$ gives $\frac{1}{1 + x} < \frac{1}{1+c} < 1$; multiplying by $x > 0$ gives $\frac{x}{1+x} < \ln(1+x) < x$. If $-1 < x < 0$, then $x < c < 0$ gives $1 < \frac1{1+c} < \frac{1}{1+x}$; multiplying by $x < 0$ reverses the inequalities, $x > \frac{x}{1+c} > \frac{x}{1+x}$, which is the same conclusion. (These are the inequalities used to sum the alternating harmonic series in [[real-analysis/series#exr-3-6]].)
:::
:::

::: quiz
Rolle's theorem fails for $f(x) = \abs{x}$ on $[-1, 1]$: $f(-1) = f(1)$, but $f'(c) \neq 0$ wherever $f'(c)$ exists. Which hypothesis is not satisfied?
- [ ] $f$ is not continuous on $[-1, 1]$.
- [x] $f$ is not differentiable at every point of $(-1, 1)$.
- [ ] $f(-1) \ne f(1)$.
- [ ] Rolle's theorem needs $f$ to be a polynomial.
::: solution
$\abs x$ is continuous everywhere and $f(-1) = f(1) = 1$, but it is not differentiable at $0$, which lies in $(-1, 1)$. The minimum of $f$ is at $0$ — exactly the point where the interior extremum theorem would have produced a horizontal tangent, had the derivative existed.
:::
:::

A two-function version of the mean value theorem is needed for L'Hôpital's rule.

::: theorem Cauchy's mean value theorem {#thm-cauchy-mvt}
Let $f$ and $g$ be continuous on $[a, b]$ and differentiable on $(a, b)$. Then there is $c \in (a, b)$ with

$$
\bigl(f(b) - f(a)\bigr)g'(c) = \bigl(g(b) - g(a)\bigr)f'(c).
$$
:::

::: proof
Let $h(x) = \bigl(f(b) - f(a)\bigr)g(x) - \bigl(g(b) - g(a)\bigr)f(x)$. It is continuous on $[a, b]$ and differentiable on $(a, b)$, and a short computation gives $h(a) = f(b)g(a) - f(a)g(b) = h(b)$. Rolle's theorem provides $c \in (a, b)$ with $h'(c) = 0$, which is the claim.
:::

Geometrically: the curve $t \mapsto (g(t), f(t))$ has, at some interior time, a tangent parallel to the chord joining its end-points. With $g(x) = x$ we recover [[#thm-mvt]].

### Derivatives have the intermediate value property

[[#ex-discontinuous-derivative]] shows that a derivative can be discontinuous. But it cannot be discontinuous in the simplest way, by jumping.

::: theorem Darboux's theorem {#thm-darboux}
Let $f$ be differentiable on $[a, b]$ (with one-sided derivatives at the end-points), and let $y$ lie strictly between $f'(a)$ and $f'(b)$. Then there is $c \in (a, b)$ with $f'(c) = y$.
:::

::: proof
Suppose $f'(a) < y < f'(b)$ (otherwise replace $f$ by $-f$ and $y$ by $-y$). Let $g(x) = f(x) - yx$, so $g$ is differentiable on $[a, b]$ with $g'(a) = f'(a) - y < 0$ and $g'(b) = f'(b) - y > 0$. By the extreme value theorem $g$ attains a minimum on $[a, b]$ at some point $c$.

The minimum is not at $a$: since $\frac{g(x) - g(a)}{x - a} \to g'(a) < 0$ as $x \to a^+$, the quotient is negative for $x$ close to $a$, so $g(x) < g(a)$ there. Similarly, since $\frac{g(x) - g(b)}{x - b} \to g'(b) > 0$ as $x \to b^-$ and $x - b < 0$, we get $g(x) < g(b)$ for $x$ close to $b$. So $c \in (a, b)$, and by [[#thm-fermat]] $g'(c) = 0$, that is $f'(c) = y$.
:::

So the sign function, for example, is not the derivative of anything: it jumps from $-1$ to $1$ without taking the value $0$ anywhere on $(-1, 0) \cup (0, 1)$. Note that the proof does not use continuity of $f'$ — it could not, since $f'$ need not be continuous.

## L'Hôpital's rule

::: theorem L'Hôpital's rule {#thm-lhopital}
Let $f$ and $g$ be differentiable on $(a, b)$ with $g'(x) \ne 0$ for all $x \in (a, b)$. Suppose $\lim_{x\to a^+}f(x) = \lim_{x\to a^+}g(x) = 0$ and

$$
\lim_{x\to a^+}\frac{f'(x)}{g'(x)} = L.
$$

Then $\lim_{x\to a^+}\dfrac{f(x)}{g(x)} = L$.
:::

::: proof
Set $f(a) = g(a) = 0$; then $f$ and $g$ are continuous on $[a, x]$ for every $x \in (a, b)$ and differentiable on $(a, x)$. First, $g(x) \ne 0$ for $x \in (a, b)$: otherwise Rolle's theorem on $[a, x]$ would give a zero of $g'$. Next, by Cauchy's mean value theorem on $[a, x]$ there is $c_x \in (a, x)$ with $f(x)g'(c_x) = g(x)f'(c_x)$, that is

$$
\frac{f(x)}{g(x)} = \frac{f'(c_x)}{g'(c_x)}.
$$

Let $\eps > 0$, and choose $\delta > 0$ such that $\abs{f'(t)/g'(t) - L} < \eps$ for all $t \in (a, a + \delta)$. If $a < x < a + \delta$ then $c_x \in (a, x) \subseteq (a, a + \delta)$, so $\abs{f(x)/g(x) - L} < \eps$.
:::

The same proof works for left-hand limits and hence for two-sided limits. Variants for $x \to \infty$ and for the form $\infty/\infty$ hold too (see Rudin, *Principles of Mathematical Analysis*, Theorem 5.13). The hypothesis that $\lim f'/g'$ *exists* is essential and is often forgotten: for $f(x) = x^2\sin(1/x)$ and $g(x) = x$ the quotient $f/g = x\sin(1/x)$ tends to $0$ as $x \to 0$, but $f'/g' = 2x\sin(1/x) - \cos(1/x)$ has no limit. L'Hôpital's rule simply does not apply; it does not say that $f/g$ has no limit.

## Taylor's theorem

The tangent line $f(a) + f'(a)(x - a)$ is the best linear approximation to $f$ near $a$. Using higher derivatives we can do better: the **Taylor polynomial** of degree $n$ of $f$ about $a$ is

$$
P_n(x) = \sum_{k=0}^n\frac{f^{(k)}(a)}{k!}(x - a)^k = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x - a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x - a)^n.
$$

It is the unique polynomial of degree at most $n$ with $P_n^{(k)}(a) = f^{(k)}(a)$ for $k = 0, 1, \dots, n$. The question is how well it approximates $f$ — and Taylor's theorem answers it with a formula that looks like the next term of the polynomial, evaluated at an unknown point.

::: theorem Taylor's theorem with Lagrange remainder {#thm-taylor}
Let $f$ be $n+1$ times differentiable on an open interval $I$ containing $a$. For every $x \in I$ with $x \ne a$ there is a point $c$ strictly between $a$ and $x$ such that

$$
f(x) = P_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}.
$$ {#eq-taylor}
:::

::: proof
Fix $x \ne a$ and define the number $M$ by $f(x) = P_n(x) + M(x - a)^{n+1}$. We must show $M = f^{(n+1)}(c)/(n+1)!$ for some $c$ between $a$ and $x$. Consider

$$
g(t) = f(t) - P_n(t) - M(t - a)^{n+1} \qquad (t \in I).
$$

Because $P_n^{(k)}(a) = f^{(k)}(a)$ and the $k$-th derivative of $(t-a)^{n+1}$ vanishes at $t = a$ for $k \le n$, we have $g(a) = g'(a) = \cdots = g^{(n)}(a) = 0$; and $g(x) = 0$ by the choice of $M$. Each $g^{(k)}$ with $k \le n$ is differentiable, hence continuous.

Rolle's theorem on the interval between $a$ and $x$ gives $x_1$ strictly between them with $g'(x_1) = 0$. Since $g'(a) = 0$ too, Rolle's theorem for $g'$ on the interval between $a$ and $x_1$ gives $x_2$ strictly between $a$ and $x_1$ with $g''(x_2) = 0$. Continuing, we obtain $x_{n+1}$ strictly between $a$ and $x$ with $g^{(n+1)}(x_{n+1}) = 0$. But $P_n$ has degree at most $n$, so $P_n^{(n+1)} = 0$, and the $(n+1)$-th derivative of $(t-a)^{n+1}$ is $(n+1)!$. Hence

$$
0 = g^{(n+1)}(x_{n+1}) = f^{(n+1)}(x_{n+1}) - (n+1)!\,M,
$$

and $c = x_{n+1}$ does the job.
:::

For $n = 0$ this is the mean value theorem. The remainder term in [[#eq-taylor]] is small when $f^{(n+1)}$ is bounded and $x$ is close to $a$ — or when $(n+1)!$ grows faster than everything else, as for the exponential and trigonometric functions.

::: example Computing e {#ex-e-estimate}
Use Taylor's theorem to compute $e$ with an error less than $10^{-6}$.
::: solution
Take $f(x) = e^x$ and $a = 0$, so every derivative is $e^x$ and $P_n(1) = \sum_{k=0}^n\frac1{k!}$. By [[#eq-taylor]] with $x = 1$ there is $c \in (0, 1)$ with

$$
e - \sum_{k=0}^n\frac{1}{k!} = \frac{e^c}{(n+1)!}, \qquad 0 < \frac{e^c}{(n+1)!} < \frac{3}{(n+1)!},
$$

using $e < 3$ ([[real-analysis/sequences#ex-e]]). For $n = 9$ the bound $3/10! \approx 8.3\times10^{-7}$ is already below $10^{-6}$, and for $n = 10$ it is $3/11! \approx 7.5\times10^{-8}$. Indeed $\sum_{k=0}^{10}\frac{1}{k!} = 2.7182818011\ldots$, while $e = 2.7182818284\ldots$: the error is about $2.7\times 10^{-8}$. The same estimate, with $x$ in place of $1$, shows that $\sum_{k=0}^n x^k/k! \to e^x$ for *every* real $x$, because $\abs{x}^{n+1}/(n+1)! \to 0$.
:::
:::

::: widget taylor
f: ln(1 + x)
a: 0
n: 4
max: 20
x: -0.95, 3
caption: Taylor polynomials of $\ln(1 + x)$ about $0$, with the remainder shaded. Raise the degree: on $-1 < x \le 1$ the polynomials close in on the function, but for $x > 1$ they swing ever more wildly. The remainder term is $\pm\frac{x^{n+1}}{(n+1)(1+c)^{n+1}}$, which tends to $0$ only when $x$ is not too large — Taylor's theorem *bounds* the error, it does not promise that it is small.
:::

::: quiz
Using Taylor's theorem with $n = 4$, what is the best bound you can give for $\abs{\sin x - (x - x^3/6)}$ on $\abs{x} \le \tfrac12$?
- [x] $\dfrac{(1/2)^5}{5!} = \dfrac{1}{3840}$
- [ ] $\dfrac{(1/2)^4}{4!}$
- [ ] $\dfrac{(1/2)^3}{3!}$
- [ ] $0$, since the $x^4$ term of the Taylor polynomial vanishes
::: solution
The Taylor polynomial of $\sin$ of degree $4$ about $0$ is $x - x^3/6$, because the $x^4$ coefficient is $\sin^{(4)}(0)/4! = 0$. So $\sin x - (x - x^3/6)$ is the remainder with $n = 4$, namely $\frac{\sin^{(5)}(c)}{5!}x^5 = \frac{\cos c}{120}x^5$, whose absolute value is at most $\frac{(1/2)^5}{120} = \frac{1}{3840}$. Using $n = 4$ rather than $n = 3$ gains a whole power of $x$ for free.
:::
:::

If $f$ has derivatives of all orders, we may let $n \to \infty$ and form the **Taylor series** $\sum_{k\ge0}\frac{f^{(k)}(a)}{k!}(x - a)^k$. It converges to $f(x)$ exactly when the remainder in [[#eq-taylor]] tends to $0$. That can fail in two ways: the series may diverge (as for $\ln(1+x)$ when $x > 1$), or — more surprisingly — it may converge to the wrong function.

::: example A smooth function that is not analytic {#ex-flat}
Let $f(x) = e^{-1/x^2}$ for $x \ne 0$ and $f(0) = 0$. Show that $f$ has derivatives of all orders at every point, that $f^{(k)}(0) = 0$ for every $k$, and conclude that the Taylor series of $f$ about $0$ converges to $f(x)$ only at $x = 0$.
::: solution
*Step 1: a limit.* For every integer $j \ge 0$, $x^{-j}e^{-1/x^2} \to 0$ as $x \to 0$. Indeed, with $t = 1/x^2$ and any integer $m$ with $2m > j$, the series for $e^t$ gives $e^t \ge t^m/m!$, so

$$
\abs{x}^{-j}e^{-1/x^2} \le \abs{x}^{-j}\,\frac{m!}{t^m} = m!\,\abs{x}^{2m - j} \to 0.
$$

*Step 2: the form of the derivatives.* By induction, for $x \ne 0$ we have $f^{(k)}(x) = p_k(1/x)\,e^{-1/x^2}$ for a polynomial $p_k$: this holds for $k = 0$ with $p_0 = 1$, and differentiating $p_k(1/x)e^{-1/x^2}$ gives $\bigl(-x^{-2}p_k'(1/x) + 2x^{-3}p_k(1/x)\bigr)e^{-1/x^2}$, which has the same form with $p_{k+1}(u) = -u^2p_k'(u) + 2u^3p_k(u)$.

*Step 3: the derivatives at $0$.* Suppose $f^{(k)}(0) = 0$ (true for $k = 0$). Then

$$
\frac{f^{(k)}(x) - f^{(k)}(0)}{x - 0} = \frac1x\,p_k\Bigl(\frac1x\Bigr)e^{-1/x^2},
$$

a finite sum of terms $c\,x^{-j}e^{-1/x^2}$, which tends to $0$ by step 1. So $f^{(k+1)}(0)$ exists and equals $0$. By induction every derivative exists everywhere and vanishes at $0$.

*Conclusion.* The Taylor series of $f$ about $0$ is $0 + 0x + 0x^2 + \cdots$, which converges (to $0$) for every $x$. But $f(x) > 0$ for every $x \ne 0$. The function is "infinitely flat" at $0$, so flat that its Taylor series cannot see it rising.
:::
:::

Functions equal to the sum of their Taylor series near every point are called **analytic**; [[#ex-flat]] shows that smooth (infinitely differentiable) functions need not be analytic. Such flat functions are indispensable for building smooth "bump" functions, used throughout differential geometry and analysis. In complex analysis the situation is completely different: a function that is differentiable once in the complex sense is automatically analytic ([[complex-analysis/analytic-functions]]).

::: history
Pierre de Fermat's method for finding maxima and minima, developed in the 1630s, already contains the idea that the tangent is horizontal at an extremum. Michel Rolle stated his theorem for polynomials in 1691, without using calculus at all. Brook Taylor published the series that bears his name in *Methodus incrementorum* (1715), without a remainder; Joseph-Louis Lagrange gave the remainder in the form used here in *Théorie des fonctions analytiques* (1797), and the mean value theorem appears in his work as well. Augustin-Louis Cauchy proved the mean value theorem and his two-function version in his lectures of 1823 and 1829. The rule for $0/0$ was discovered by Johann Bernoulli, who taught it to the Marquis de l'Hôpital; l'Hôpital published it in his textbook *Analyse des infiniment petits* (1696). Gaston Darboux proved that derivatives have the intermediate value property in 1875.
:::

## Where this leads

The mean value theorem is the main bridge between derivatives and integrals: in [[real-analysis/riemann-integral]] it proves the fundamental theorem of calculus, and the integral in turn gives a second form of Taylor's remainder. In [[real-analysis/uniform-convergence]] we ask when the derivative of a limit is the limit of the derivatives, and we prove that power series can be differentiated term by term, so that they are smooth and equal to their own Taylor series. Lipschitz bounds from [[#cor-monotone]] are the key hypothesis of the contraction mapping theorem of [[real-analysis/metric-spaces]], which underlies Newton's method ([[numerical-analysis/root-finding]]) and the existence theorem for differential equations ([[ode/existence-uniqueness]]). In several variables the derivative becomes a linear map, studied in [[multivariable/partial-derivatives]].

::: summary
- $f'(c)$ is the limit of difference quotients; equivalently, $f(x) - f(c) = \varphi(x)(x - c)$ with $\varphi$ continuous at $c$ and $\varphi(c) = f'(c)$ ([[#lem-caratheodory]]). Differentiable functions are continuous.
- Carathéodory's form gives a correct proof of the chain rule, avoiding division by $f(x) - f(c)$.
- At an interior extremum $f'(c) = 0$; with the extreme value theorem this gives Rolle's theorem and the **mean value theorem** $f(b) - f(a) = f'(c)(b - a)$ ([[#thm-mvt]]).
- Consequences: $f' = 0$ ⇒ constant; $f' \ge 0$ ⇒ increasing; $\abs{f'} \le K$ ⇒ $K$-Lipschitz. Many inequalities follow.
- Derivatives need not be continuous, but they always have the intermediate value property (Darboux).
- L'Hôpital's rule follows from Cauchy's mean value theorem; it requires $\lim f'/g'$ to exist.
- Taylor's theorem: $f(x) = P_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ ([[#thm-taylor]]). Smooth functions such as $e^{-1/x^2}$ need not equal the sum of their Taylor series.
:::

## Exercises

::: exercise A derivative at a corner {level=1 check="0"}
Let $f(x) = x\abs{x}$. Find $f'(0)$ from the definition, and show that $f'(x) = 2\abs{x}$ for all $x$.
::: solution
$\dfrac{f(x) - f(0)}{x - 0} = \dfrac{x\abs x}{x} = \abs x \to 0$, so $f'(0) = 0$. For $x > 0$, $f(x) = x^2$ near $x$, so $f'(x) = 2x = 2\abs x$; for $x < 0$, $f(x) = -x^2$ near $x$, so $f'(x) = -2x = 2\abs x$. Together with $f'(0) = 0$ this gives $f'(x) = 2\abs x$ everywhere — a differentiable function whose derivative is not differentiable at $0$.
:::
:::

::: exercise The exponential lies above its tangent {level=1}
Use the mean value theorem to prove that $e^x \ge 1 + x$ for all real $x$, with equality only at $x = 0$.
::: solution
For $x \ne 0$, [[#thm-mvt]] applied to $e^t$ on the interval between $0$ and $x$ gives $c$ strictly between $0$ and $x$ with $e^x - 1 = e^c x$. If $x > 0$ then $c > 0$, so $e^c > 1$ and $e^x - 1 = e^cx > x$. If $x < 0$ then $c < 0$, so $0 < e^c < 1$ and, multiplying by $x < 0$, $e^c x > x$; again $e^x - 1 > x$. At $x = 0$ both sides equal $1$.
:::
:::

::: exercise Applying L'Hôpital's rule {level=1 check="1/6"}
Find $\displaystyle\lim_{x\to0}\frac{x - \sin x}{x^3}$.
::: solution
Numerator and denominator tend to $0$, and the derivative of the denominator, $3x^2$, is non-zero for $x \ne 0$. The quotient of derivatives is $\frac{1 - \cos x}{3x^2}$, again of the form $0/0$; differentiating again gives $\frac{\sin x}{6x} \to \frac16$. Applying [[#thm-lhopital]] (on each side of $0$) to the second quotient shows $\frac{1 - \cos x}{3x^2} \to \frac16$, and applying it again shows the original limit is $\frac16$. (Alternatively, Taylor's theorem gives $x - \sin x = \frac{x^3}{6} - \frac{\cos c}{120}x^5$ for some $c$, from which the limit is immediate.)
:::
:::

::: exercise Characterising the exponential {level=2}
Let $f\colon \R \to \R$ be differentiable with $f' = f$ and $f(0) = 1$. Prove that $f(x) = e^x$ for all $x$.
::: hint
Differentiate $g(x) = f(x)e^{-x}$.
:::
::: solution
$g(x) = f(x)e^{-x}$ is differentiable with $g'(x) = f'(x)e^{-x} - f(x)e^{-x} = 0$ for all $x$. By [[#cor-monotone]](1), $g$ is constant, so $g(x) = g(0) = f(0) = 1$. Hence $f(x) = e^x$.
:::
:::

::: exercise Positive derivative at a point {level=2}
Let $f(x) = x + 2x^2\sin(1/x)$ for $x \ne 0$ and $f(0) = 0$. Show that $f'(0) = 1$, but that $f$ is not increasing on any interval containing $0$.
::: solution
$\frac{f(x) - f(0)}{x} = 1 + 2x\sin(1/x) \to 1$, so $f'(0) = 1$. For $x \ne 0$, $f'(x) = 1 + 4x\sin(1/x) - 2\cos(1/x)$. At $x_n = \frac{1}{2n\pi}$ this equals $1 + 0 - 2 = -1 < 0$. If $f$ were increasing on an interval $(-\delta, \delta)$, all its difference quotients there would be $\ge 0$, hence so would every derivative $f'(x)$ with $\abs x < \delta$; but $x_n \in (-\delta, \delta)$ for large $n$ and $f'(x_n) = -1$. So a positive derivative at a single point does not make a function increasing near that point; [[#cor-monotone]] needs $f' \ge 0$ on a whole interval.
:::
:::

::: exercise Tangent lines of convex functions {level=2}
Let $f$ be twice differentiable on $\R$ with $f''(x) \ge 0$ for all $x$. Prove that $f(x) \ge f(a) + f'(a)(x - a)$ for all $a, x \in \R$: the graph lies above each of its tangent lines.
::: solution
For $x = a$ there is equality. For $x \ne a$, [[#thm-taylor]] with $n = 1$ gives $c$ between $a$ and $x$ with

$$
f(x) = f(a) + f'(a)(x - a) + \frac{f''(c)}{2}(x - a)^2 \ \ge\ f(a) + f'(a)(x - a),
$$

since $f''(c) \ge 0$ and $(x - a)^2 > 0$.
:::
:::

::: exercise A Taylor error bound {level=2 check="1/384"}
The approximation $\cos x \approx 1 - \dfrac{x^2}{2}$ is used for $\abs{x} \le \tfrac12$. Use Taylor's theorem with $n = 3$ to find an upper bound for the error.
::: solution
The Taylor polynomial of degree $3$ of $\cos$ about $0$ is $1 - \frac{x^2}{2}$, because the $x^3$ coefficient is $\cos^{(3)}(0)/3! = \sin(0)/6 = 0$. By [[#thm-taylor]] with $n = 3$, the error is

$$
\cos x - \Bigl(1 - \frac{x^2}{2}\Bigr) = \frac{\cos^{(4)}(c)}{4!}x^4 = \frac{\cos c}{24}x^4
$$

for some $c$ between $0$ and $x$, so its absolute value is at most $\frac{(1/2)^4}{24} = \frac{1}{384}$. (Using $n = 2$ would only give $\frac{(1/2)^3}{6} = \frac1{48}$: as in the quiz on $\sin x$, a vanishing coefficient lets us take one more term for free.)
:::
:::

::: exercise Monotone derivatives are continuous {level=3}
Let $f$ be differentiable on an open interval $I$, and suppose $f'$ is increasing on $I$. Prove that $f'$ is continuous on $I$.
::: hint
Combine [[real-analysis/continuity#thm-monotone-jumps]] with [[#thm-darboux]].
:::
::: solution
Since $f'$ is increasing, [[real-analysis/continuity#thm-monotone-jumps]] shows that at each $c \in I$ the one-sided limits $f'(c^-) \le f'(c) \le f'(c^+)$ exist, and $f'$ is continuous at $c$ unless $f'(c^-) < f'(c^+)$. Suppose, say, $f'(c^-) < f'(c)$, and pick $y$ with $f'(c^-) < y < f'(c)$. For any $a < c$ in $I$ we have $f'(a) \le f'(c^-) < y$, since $f'(a) \le f'(x)$ for $a \le x < c$. By [[#thm-darboux]] on $[a, c]$ there is $t \in (a, c)$ with $f'(t) = y$. But for $t < c$, $f'(t) \le f'(c^-) < y$ — a contradiction. The case $f'(c) < f'(c^+)$ is symmetric (use $[c, b]$). Hence $f'$ has no jumps and is continuous.
:::
:::

::: exercise e is irrational {level=3}
Prove that $e$ is irrational.
::: hint
Suppose $e = p/q$. Multiply the identity of [[#ex-e-estimate]] by $n!$ for some $n \ge \max(q, 3)$.
:::
::: solution
By [[#ex-e-estimate]], for each $n$ there is $c \in (0, 1)$ with $e - \sum_{k=0}^n\frac{1}{k!} = \frac{e^c}{(n+1)!}$, and $0 < e^c < e < 3$. Suppose $e = p/q$ with $p, q \in \N$, and take $n \ge \max(q, 3)$. Multiplying by $n!$,

$$
n!\,e - \sum_{k=0}^n\frac{n!}{k!} = \frac{e^c}{n+1}.
$$

The left side is an integer: $n!\,e = n!\,p/q$ is an integer because $q \le n$, and each $n!/k!$ is an integer. The right side satisfies $0 < \frac{e^c}{n+1} < \frac{3}{n+1} \le \frac34 < 1$. No integer lies strictly between $0$ and $1$, a contradiction.
:::
:::

::: exercise Roots of derivatives {level=2}
Let $p$ be a polynomial of degree $n \ge 2$ with $n$ distinct real roots. Prove that $p'$ has $n - 1$ distinct real roots, all lying between the smallest and largest roots of $p$.
::: solution
Let the roots be $r_1 < r_2 < \cdots < r_n$. On each interval $[r_i, r_{i+1}]$ the polynomial is continuous and differentiable with $p(r_i) = p(r_{i+1}) = 0$, so Rolle's theorem gives $c_i \in (r_i, r_{i+1})$ with $p'(c_i) = 0$. The $n - 1$ points $c_1 < c_2 < \cdots < c_{n-1}$ are distinct because they lie in disjoint open intervals. Since $p'$ has degree $n - 1$, it has at most $n - 1$ roots, so these are all of them, and they lie in $(r_1, r_n)$.
:::
:::
