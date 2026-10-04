A falling stone, a cooling cup of tea, the balance of a savings account and the voltage across a capacitor have one thing in common: a quantity that depends on another. The height of the stone depends on time; the voltage depends on time and on the components of the circuit. Calculus is the study of how such dependent quantities change and accumulate, and its basic object is the **function**.

Almost every function in this course is built from a small stock of *elementary functions* — polynomials, roots, exponentials, logarithms and the trigonometric functions — by arithmetic, composition and inversion. This chapter sets up the language precisely (domain, range, composition, inverse), explains how simple changes to a formula move its graph, and collects the properties of the elementary functions that later chapters rely on. Much of it may be familiar from school. Read it anyway for the definitions and the proofs: domains, restricted inverses and radians are exactly the places where later calculations go wrong.

## Functions and their graphs

Informally, a function is a rule that turns an input into an output. The essential word is *one*: each admissible input must produce exactly one output.

::: definition Function {#def-function}
Let $A$ and $B$ be sets of real numbers. A **function** $f\colon A \to B$ is a rule that assigns to each $x \in A$ exactly one number $f(x) \in B$. The set $A$ is the **domain** of $f$ and $B$ is its **codomain**. The **range** (or **image**) of $f$ is the set of values actually taken,

$$
f(A) = \set{f(x) : x \in A} \subseteq B.
$$
:::

Formally, a function is a set of ordered pairs $(x, f(x))$, as explained in [[proofs/functions]]. In calculus functions are usually given by formulas, and the domain is often left implicit: by convention the **natural domain** of a formula is the set of all real $x$ for which it makes sense — no division by zero, no even roots of negative numbers, no logarithms of numbers $\le 0$.

::: definition Graph {#def-graph}
The **graph** of $f\colon A\to B$ is the set of points $\set{(x, f(x)) : x \in A}$ in the plane.
:::

Because each $x$ has exactly one value, every vertical line $x = c$ meets the graph at most once: once if $c\in A$, and not at all otherwise. This **vertical line test** tells us which curves are graphs of functions. The circle $x^2 + y^2 = 1$ is not one (the line $x=0$ meets it twice), but its upper half, the graph of $y = \sqrt{1-x^2}$ on $[-1,1]$, is.

::: example Domain and range {#ex-domain}
(a) Find the natural domain of $f(x) = \dfrac{\sqrt{3 - x}}{x^2 - 4}$.

(b) Find the range of $g(x) = x^2 - 4x + 7$, $x\in\R$.
::: solution
(a) The square root needs $3 - x \ge 0$, that is $x \le 3$, and the division needs $x^2 - 4 \neq 0$, that is $x \neq \pm 2$. So the domain is

$$
(-\infty, -2) \cup (-2, 2) \cup (2, 3].
$$

(b) Completing the square, $g(x) = (x - 2)^2 + 3$. Squares are non-negative, so $g(x) \ge 3$ for every $x$: the range is contained in $[3, \infty)$. Conversely, every $y \ge 3$ is a value of $g$: the equation $(x-2)^2 + 3 = y$ has the solution $x = 2 + \sqrt{y - 3}$, and indeed $g\bigl(2 + \sqrt{y-3}\bigr) = (y - 3) + 3 = y$. Hence the range is exactly $[3, \infty)$.
:::
:::

Part (b) illustrates a general point. To show that a set $S$ is the range of $f$, you must prove two inclusions: every value $f(x)$ lies in $S$, *and* every $y \in S$ equals $f(x)$ for some $x$ in the domain. The second inclusion amounts to solving the equation $f(x) = y$ for $x$.

Some functions are defined piecewise, and three of them appear constantly:

- the **absolute value** $\abs{x}$, equal to $x$ for $x \ge 0$ and to $-x$ for $x < 0$, which is the distance from $x$ to $0$;
- the **floor function** $\lfloor x\rfloor$, the greatest integer that is $\le x$ (so $\lfloor 2.7\rfloor = 2$ but $\lfloor -2.7\rfloor = -3$);
- the **sign function** $\sgn x$, which is $1$, $0$ or $-1$ according as $x > 0$, $x = 0$ or $x < 0$.

They are useful precisely because they are not given by a single smooth formula; they will supply many of our examples of functions that fail to be continuous or differentiable.

## Combining functions

Functions can be added, subtracted, multiplied and divided pointwise: $(f+g)(x) = f(x) + g(x)$, $(fg)(x) = f(x)g(x)$ and $(f/g)(x) = f(x)/g(x)$. The domain of $f + g$ and of $fg$ is the intersection of the two domains; for $f/g$ we must also remove the zeros of $g$. A more powerful operation feeds the output of one function into another.

::: definition Composition {#def-composition}
The **composite** of $f$ and $g$ is the function $g\circ f$ ("$g$ after $f$") given by

$$
(g\circ f)(x) = g\bigl(f(x)\bigr),
$$

whose domain is the set of all $x$ in the domain of $f$ for which $f(x)$ lies in the domain of $g$.
:::

Composition is not commutative: in general $g\circ f \neq f\circ g$, just as putting on socks and then shoes differs from shoes and then socks.

::: example Domains of composites {#ex-composite}
Let $f(x) = \sqrt{x}$ and $g(x) = x^2 - 1$. Find $g\circ f$ and $f\circ g$, with their domains.
::: solution
For $g\circ f$, the input $x$ must lie in the domain $[0,\infty)$ of $f$; then $f(x)$ automatically lies in $\R$, the domain of $g$. So

$$
(g\circ f)(x) = (\sqrt{x})^2 - 1 = x - 1, \qquad x \in [0, \infty).
$$

The simplified formula $x - 1$ makes sense for every real $x$, but the composite is *not* defined for $x<0$: the domain is part of the function, and simplifying the formula does not change it.

For $f\circ g$, any real $x$ is in the domain of $g$, but we need $g(x) = x^2 - 1 \ge 0$, that is $\abs{x} \ge 1$. So

$$
(f\circ g)(x) = \sqrt{x^2 - 1}, \qquad x \in (-\infty, -1] \cup [1, \infty).
$$
:::
:::

Seeing a complicated function as a composite of simple ones is a skill that pays off with the chain rule ([[calculus-1/chain-rule]]). For instance $h(x) = \sin^2(3x + 1)$ is $u \mapsto u^2$, after $v\mapsto \sin v$, after $x \mapsto 3x+1$.

### Transforming graphs

The simplest compositions are those with linear functions, and they move graphs in a predictable way.

::: proposition Transformations of graphs {#prop-transform}
Let $a, b, c, d$ be constants with $a \neq 0$ and $b \neq 0$, and let $h(x) = a\,f\bigl(b(x - c)\bigr) + d$. Then $(u, v)$ lies on the graph of $f$ if and only if

$$
\Bigl(\frac{u}{b} + c,\; a v + d\Bigr)
$$

lies on the graph of $h$. Thus the graph of $h$ is obtained from that of $f$ by scaling horizontally by the factor $1/b$ and then shifting right by $c$, and by scaling vertically by the factor $a$ and then shifting up by $d$. A negative $a$ includes a reflection in the $x$-axis, and a negative $b$ a reflection in the $y$-axis.
:::

::: proof
The point $(x, y)$ lies on the graph of $h$ exactly when $b(x-c)$ is in the domain of $f$ and $y = a f(b(x-c)) + d$. Put $u = b(x - c)$ and $v = (y - d)/a$. Because $a \neq 0$ and $b\neq 0$, these equations are equivalent to $x = u/b + c$ and $y = av + d$, so they set up a one-to-one correspondence between points $(x,y)$ and points $(u,v)$. In terms of $u$ and $v$, the condition reads: $u$ is in the domain of $f$ and $v = f(u)$, that is, $(u,v)$ lies on the graph of $f$. Hence the map $(u,v)\mapsto(u/b + c,\ av + d)$ carries the graph of $f$ exactly onto the graph of $h$.
:::

::: widget plot
f: a*sin(b*(x - c)) + d; sin(x)
sliders: a=1:-3:3:0.1; b=1:-3:3:0.1; c=0:-3:3:0.1; d=0:-2:2:0.1
x: -2pi, 2pi
y: -4, 4
piticks: true
labels: a\sin(b(x-c))+d; \sin x
caption: At the initial slider values the two graphs coincide. Move one slider at a time. The output parameters $a$ and $d$ act as you would expect, but the input parameters act "backwards": increasing $c$ moves the graph to the *right*, and increasing $b$ *compresses* it horizontally (the period becomes $2\pi/\lvert b\rvert$). Make $a$ or $b$ negative to see the reflections.
:::

::: warning Horizontal shifts go the "wrong" way
The graph of $y = f(x - 2)$ is the graph of $f$ moved 2 units to the **right**, not the left: the value that $f$ takes at $u$, the new function takes at $x = u + 2$. Likewise $y = f(2x)$ is the graph *compressed* horizontally by a factor of 2. When several transformations are combined, factor the inside first: $f(2x + 6) = f\bigl(2(x+3)\bigr)$ is a compression by 2 followed by a shift of 3 units (not 6) to the left.
:::

::: quiz
Which descriptions produce the graph of $y = f(2x+6)$ from the graph of $y = f(x)$? (Select all that apply.)
- [x] Compress horizontally by a factor of 2 (towards the $y$-axis), then shift 3 units to the left.
- [x] Shift 6 units to the left, then compress horizontally by a factor of 2 (towards the $y$-axis).
- [ ] Compress horizontally by a factor of 2, then shift 6 units to the left.
- [ ] Shift 3 units to the right, then compress horizontally by a factor of 2.
::: solution
Let $k(x) = f(2x)$; shifting its graph 3 units left gives $k(x+3) = f(2x+6)$, so the first description is right. Alternatively let $m(x) = f(x+6)$, a shift left by 6; compressing gives $m(2x) = f(2x+6)$, so the second is right too. The third produces $f(2(x+6)) = f(2x+12)$ and the fourth produces $f(2x - 3)$. "Shift then scale" and "scale then shift" are both possible, but they need different shifts.
:::
:::

### Symmetry and periodicity

::: definition Even, odd and periodic functions {#def-even-odd}
Let $f$ be defined on a set $A$ that is symmetric about $0$ (that is, $-x\in A$ whenever $x\in A$). Then $f$ is **even** if $f(-x) = f(x)$ for all $x \in A$, and **odd** if $f(-x) = -f(x)$ for all $x\in A$. A function $f$ is **periodic** with period $p>0$ if, whenever $x$ is in its domain, so are $x\pm p$, and $f(x+p) = f(x)$.
:::

The graph of an even function is symmetric under reflection in the $y$-axis; the graph of an odd function is symmetric under a half-turn about the origin. The names come from powers: $x^n$ is even when $n$ is even and odd when $n$ is odd. Cosine is even, sine and tangent are odd, and all three are periodic. Most functions are neither even nor odd, but every function splits into an even part and an odd part.

::: proposition Even and odd parts {#prop-even-odd}
Every function $f$ on a symmetric domain $A$ can be written in exactly one way as $f = E + O$ with $E$ even and $O$ odd, namely

$$
E(x) = \frac{f(x) + f(-x)}{2}, \qquad O(x) = \frac{f(x) - f(-x)}{2}.
$$
:::

::: proof
*Existence.* With $E$ and $O$ defined by these formulas, $E(x) + O(x) = f(x)$, while $E(-x) = \frac{f(-x) + f(x)}{2} = E(x)$ and $O(-x) = \frac{f(-x) - f(x)}{2} = -O(x)$.

*Uniqueness.* Suppose $f = E_1 + O_1$ with $E_1$ even and $O_1$ odd. Replacing $x$ by $-x$ gives $f(-x) = E_1(x) - O_1(x)$. Adding this to $f(x) = E_1(x) + O_1(x)$ and dividing by 2 gives $E_1(x) = \frac{f(x)+f(-x)}{2} = E(x)$; subtracting gives $O_1(x) = O(x)$.
:::

Applied to the exponential function (discussed below), the proposition produces two functions that appear throughout applied mathematics, the **hyperbolic cosine** and the **hyperbolic sine**:

$$
\cosh x = \frac{e^x + e^{-x}}{2}, \qquad \sinh x = \frac{e^x - e^{-x}}{2}, \qquad e^x = \cosh x + \sinh x.
$$ {#eq-hyperbolic}

Squaring and subtracting gives $\cosh^2 x - \sinh^2 x = 1$, the analogue of $\cos^2 x + \sin^2 x = 1$ that explains the names: the point $(\cosh t, \sinh t)$ moves along the hyperbola $X^2 - Y^2 = 1$ just as $(\cos t, \sin t)$ moves around the circle $X^2 + Y^2 = 1$. A chain hanging under its own weight takes the shape of a $\cosh$ curve, the *catenary*.

## Monotonic functions and inverse functions

::: definition Monotonic function {#def-monotone}
Let $f$ be defined on a set $I$. Then $f$ is **increasing** on $I$ if $x_1 < x_2$ implies $f(x_1) \le f(x_2)$ for all $x_1, x_2 \in I$, and **strictly increasing** if $x_1 < x_2$ implies $f(x_1) < f(x_2)$. **Decreasing** and **strictly decreasing** are defined in the same way with the inequalities between the values reversed. A function that is increasing or decreasing on $I$ is **monotonic** there.
:::

Some books say "non-decreasing" for our "increasing". In [[calculus-1/mean-value-theorem]] we shall see that the sign of the derivative detects monotonicity.

Solving an equation $f(x) = y$ means running a function backwards. This has a unique answer for every $y$ in the range exactly when $f$ never takes the same value twice.

::: definition One-to-one functions and inverses {#def-inverse}
A function $f\colon A\to\R$ is **one-to-one** (or **injective**) if $f(x_1) = f(x_2)$ implies $x_1 = x_2$; equivalently, distinct inputs give distinct outputs. If $f$ is one-to-one with range $R = f(A)$, its **inverse function** $f^{-1}\colon R\to A$ is defined by

$$
f^{-1}(y) = x \iff f(x) = y \qquad (x\in A,\ y \in R).
$$
:::

Then $f^{-1}(f(x)) = x$ for every $x \in A$, and $f(f^{-1}(y)) = y$ for every $y \in R$: each function undoes the other. Graphically, $f$ is one-to-one exactly when every horizontal line meets its graph at most once (the **horizontal line test**).

::: warning $f^{-1}$ is not $1/f$
The $-1$ in $f^{-1}$ refers to inversion under composition, not to a reciprocal: $f^{-1}(x)$ and $1/f(x)$ are different things. For $f(x) = x^3$ we have $f^{-1}(x) = \sqrt[3]{x}$ but $1/f(x) = x^{-3}$. Trigonometric notation adds to the confusion, because $\sin^{-1}x$ usually means the inverse sine while $\sin^2 x$ means $(\sin x)^2$. To avoid ambiguity this course writes $\arcsin$, $\arccos$ and $\arctan$.
:::

Strict monotonicity is the most common way to guarantee that an inverse exists.

::: theorem Strictly monotonic functions are invertible {#thm-monotone-inverse}
If $f$ is strictly increasing on $A$, then $f$ is one-to-one, and its inverse $f^{-1}\colon f(A)\to A$ is also strictly increasing. The same holds with "decreasing" in place of "increasing".
:::

::: proof
Let $x_1 \neq x_2$ in $A$; say $x_1 < x_2$. Then $f(x_1) < f(x_2)$, so $f(x_1)\neq f(x_2)$. Thus $f$ is one-to-one and $f^{-1}$ exists.

Now let $y_1 < y_2$ in $f(A)$ and put $x_1 = f^{-1}(y_1)$ and $x_2 = f^{-1}(y_2)$. If $x_1 = x_2$, then $y_1 = f(x_1) = f(x_2) = y_2$; if $x_1 > x_2$, then $y_1 = f(x_1) > f(x_2) = y_2$. Both contradict $y_1 < y_2$, so $x_1 < x_2$, that is, $f^{-1}(y_1) < f^{-1}(y_2)$. The decreasing case is identical with the inequalities between values reversed.
:::

::: quiz
Which of these functions are one-to-one on the given domain? (Select all that apply.)
- [x] $x^3$ on $\R$
- [ ] $x^2$ on $[-1, 2]$
- [x] $1/x$ on $\R\setminus\set{0}$
- [ ] $\cos x$ on $[-\pi/2, \pi/2]$
::: solution
$x^3$ is strictly increasing, hence one-to-one by [[#thm-monotone-inverse]]. On $[-1, 2]$ the square takes the value $1$ at both $-1$ and $1$. The function $1/x$ is one-to-one ($1/a = 1/b$ forces $a = b$) even though it is *not* monotonic on its domain: $-1 < 1$ but $1/(-1) < 1/1$ while $-2 < -1$ gives $1/(-2) > 1/(-1)$. So the converse of the theorem fails. Finally $\cos(-\pi/4) = \cos(\pi/4)$; to invert cosine we restrict it to $[0, \pi]$ instead.
:::
:::

For *continuous* functions on an interval the converse does hold — a one-to-one continuous function on an interval is strictly monotonic — but the proof needs the intermediate value theorem of [[calculus-1/continuity]].

::: proposition The graph of the inverse {#prop-inverse-graph}
If $f$ is one-to-one, the graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$.
:::

::: proof
For $x$ in the domain of $f$ and $y$ in its range, $(x, y)$ lies on the graph of $f$ $\iff$ $y = f(x)$ $\iff$ $x = f^{-1}(y)$ $\iff$ $(y, x)$ lies on the graph of $f^{-1}$. So the graph of $f^{-1}$ is the image of the graph of $f$ under the map $(x, y) \mapsto (y, x)$. This map is the reflection in the line $y = x$: the segment from $(x,y)$ to $(y,x)$ has its midpoint $\bigl(\frac{x+y}{2}, \frac{x+y}{2}\bigr)$ on the line, and its direction $(y - x,\, x - y)$ is perpendicular to the direction $(1,1)$ of the line.
:::

::: example Finding an inverse {#ex-inverse}
Show that $f(x) = \dfrac{2x+1}{x-3}$, with its natural domain $x\neq3$, is one-to-one, and find its range and its inverse.
::: solution
We try to solve $y = f(x)$ for $x$. Multiplying by $x - 3$ (which is non-zero), $y(x - 3) = 2x + 1$, so $xy - 2x = 3y + 1$, that is,

$$
x(y - 2) = 3y + 1.
$$

If $y = 2$ this reads $0 = 7$, which is impossible, so $2$ is not a value of $f$. If $y \neq 2$, the only candidate is $x = \dfrac{3y+1}{y-2}$. It is not $3$ (that would need $3y + 1 = 3y - 6$), so it lies in the domain, and since every step above is reversible it really is a solution. Hence each $y\neq 2$ is taken exactly once: $f$ is one-to-one with range $\R\setminus\set{2}$, and, renaming the variable,

$$
f^{-1}(x) = \frac{3x+1}{x-2}, \qquad x \neq 2.
$$

Check: $f\bigl(f^{-1}(x)\bigr) = \dfrac{2\cdot\frac{3x+1}{x-2} + 1}{\frac{3x+1}{x-2} - 3} = \dfrac{6x + 2 + x - 2}{3x + 1 - 3x + 6} = \dfrac{7x}{7} = x$.
:::
:::

When a function is not one-to-one we can often restrict it to a set on which it is. The square is not one-to-one on $\R$, since $2^2 = (-2)^2$, but it is strictly increasing on $[0, \infty)$ with range $[0,\infty)$. Its inverse there is the square root: $\sqrt{y}$ is by definition the **non-negative** number whose square is $y$. Consequently $\sqrt{x^2} = \abs{x}$, not $x$. The same idea produces the inverse trigonometric functions at the end of this chapter.

## Polynomials and rational functions

::: definition Polynomials and rational functions {#def-polynomial}
A **polynomial** is a function of the form $p(x) = c_n x^n + c_{n-1}x^{n-1} + \dots + c_1 x + c_0$ with real coefficients $c_k$. If $c_n\neq0$, then $n$ is the **degree** of $p$ and $c_n$ its **leading coefficient**. A **root** (or zero) of $p$ is a number $a$ with $p(a) = 0$. A **rational function** is a quotient $p/q$ of two polynomials, defined wherever $q \neq 0$.
:::

The factor theorem links roots to factors.

::: theorem Factor theorem {#thm-factor}
Let $p$ be a polynomial of degree $n\ge1$ and let $a\in\R$. Then there is a polynomial $q$ of degree $n-1$ such that

$$
p(x) - p(a) = (x - a)\,q(x) \quad\text{for all } x.
$$

In particular, $p(a) = 0$ if and only if $p(x) = (x-a)q(x)$ for some polynomial $q$.
:::

::: proof
For each integer $k\ge1$,

$$
x^k - a^k = (x - a)\bigl(x^{k-1} + x^{k-2}a + \dots + x a^{k-2} + a^{k-1}\bigr),
$$

as you can see by multiplying out: all the middle terms cancel in pairs. Hence, writing $p(x) = \sum_{k=0}^n c_k x^k$,

$$
p(x) - p(a) = \sum_{k=1}^n c_k\,(x^k - a^k) = (x-a)\sum_{k=1}^n c_k\bigl(x^{k-1} + x^{k-2}a + \dots + a^{k-1}\bigr).
$$

The last sum is a polynomial $q(x)$ whose only term of degree $n-1$ is $c_n x^{n-1}$, so $q$ has degree $n-1$. If $p(a) = 0$ the identity reads $p(x) = (x-a)q(x)$; conversely, if $p(x) = (x-a)q(x)$ for some polynomial $q$, then $p(a) = 0$.
:::

::: corollary Number of roots {#cor-roots}
A polynomial of degree $n \ge 0$ has at most $n$ distinct real roots.
:::

::: proof
We use induction on $n$. A polynomial of degree $0$ is a non-zero constant and has no roots. Suppose the claim holds for degree $n-1$, and let $p$ have degree $n\ge1$. If $p$ has no root we are done. Otherwise let $a$ be a root; by [[#thm-factor]], $p(x) = (x-a)q(x)$ with $q$ of degree $n-1$. If $b \neq a$ is another root, then $0 = p(b) = (b-a)q(b)$ with $b - a\neq0$, so $q(b) = 0$. Thus every root of $p$ other than $a$ is a root of $q$, and by the induction hypothesis there are at most $n-1$ of these. So $p$ has at most $n$ roots.
:::

One consequence ([[#exr-poly-agree]]) is that two polynomials of degree at most $n$ that agree at $n+1$ points are identical — the fact behind polynomial interpolation ([[numerical-analysis/interpolation]]).

For large $\abs{x}$ a polynomial behaves like its leading term. Indeed, for $x\neq0$,

$$
p(x) = c_n x^n\Bigl(1 + \frac{c_{n-1}}{c_n x} + \dots + \frac{c_0}{c_n x^n}\Bigr),
$$

and the bracket tends to $1$ as $x\to\pm\infty$. So $x^3 - 100x^2$ eventually behaves like $x^3$, however large the $100$. Rational functions at infinity are compared through their leading terms in the same way, as in [[calculus-1/limits#ex-rational-infinity]].

**Powers and roots.** For an integer $n\ge2$, the $n$th root $\sqrt[n]{x} = x^{1/n}$ is the inverse of $x\mapsto x^n$: on $[0, \infty)$ when $n$ is even, and on all of $\R$ when $n$ is odd (then $x^n$ is strictly increasing on $\R$). Rational powers are defined by $x^{m/n} = \bigl(\sqrt[n]{x}\bigr)^m$. Power functions with negative or fractional exponents, such as $x^{-1}$ and $x^{2/3}$, will be our standard examples of graphs with asymptotes and cusps.

## Exponential and logarithmic functions

For a base $a > 0$, the powers $a^x$ are first defined for integers ($a^3 = a\cdot a\cdot a$, $a^0 = 1$, $a^{-n} = 1/a^n$), then for rationals ($a^{m/n} = (\sqrt[n]{a})^m$), and finally for irrational $x$ by filling the gaps: $2^{\sqrt2}$, for example, is the number approached by $2^{1.4}, 2^{1.41}, 2^{1.414}, \dots$ That this process works, and produces a function obeying the familiar rules, follows from the completeness of the real numbers ([[real-analysis/real-numbers]]); a slicker construction, through the integral of $1/t$, is carried out in [[calculus-1/integrals#thm-log-integral]]. We shall use the following facts freely. For $a, b > 0$ and all real $x, y$,

$$
a^{x+y} = a^x a^y, \qquad (a^x)^y = a^{xy}, \qquad (ab)^x = a^x b^x, \qquad a^0 = 1.
$$ {#eq-exp-laws}

Moreover $a^x > 0$ for all $x$; if $a > 1$, the function $x \mapsto a^x$ is strictly increasing with range $(0, \infty)$, and if $0 < a < 1$ it is strictly decreasing with range $(0, \infty)$.

Among all bases one is special: the number $e = 2.71828\ldots$, characterised by the property that the graph of $y = e^x$ crosses the $y$-axis with slope exactly $1$. We make this precise in [[calculus-1/derivatives]], where it explains why $e^x$ is its own derivative; equivalently, $e = \lim_{n\to\infty}(1 + 1/n)^n$ ([[calculus-2/sequences]]). The function $\exp(x) = e^x$ is called *the* exponential function.

::: definition Logarithm {#def-log}
Let $a > 0$ with $a \neq 1$. The **logarithm to base $a$**, $\log_a\colon(0,\infty)\to\R$, is the inverse of the function $x\mapsto a^x$:

$$
\log_a y = x \iff a^x = y \qquad (y > 0,\ x\in\R).
$$

The **natural logarithm** is $\ln = \log_e$.
:::

The logarithm exists, and is strictly increasing when $a > 1$, by [[#thm-monotone-inverse]]. The defining relation gives $a^{\log_a y} = y$ for $y > 0$ and $\log_a(a^x) = x$ for every real $x$; in particular $\log_a 1 = 0$ and $\log_a a = 1$.

::: theorem Laws of logarithms {#thm-log-laws}
Let $a>0$ with $a\neq1$. For all $x, y > 0$ and all $r\in\R$,

$$
\log_a(xy) = \log_a x + \log_a y, \qquad \log_a\frac{x}{y} = \log_a x - \log_a y, \qquad \log_a(x^r) = r\log_a x.
$$

Moreover, for any other base $b>0$ with $b\neq1$, we have the change-of-base formula $\log_a x = \dfrac{\log_b x}{\log_b a}$.
:::

::: proof
Put $u = \log_a x$ and $v = \log_a y$, so that $a^u = x$ and $a^v = y$. By [[#eq-exp-laws]], $a^{u+v} = a^u a^v = xy$, which says precisely that $\log_a(xy) = u + v$. Similarly $a^{u-v} = a^u a^{-v} = x/y$ (because $a^{-v}a^{v} = a^0 = 1$), and $a^{ru} = (a^u)^r = x^r$; these give the second and third laws. For the change of base, apply $\log_b$ to $x = a^u$ and use the third law (for base $b$): $\log_b x = u\log_b a$. Since $a\neq1$, $\log_b a\neq 0$, and so $u = \log_b x/\log_b a$.
:::

By the change-of-base formula every exponential is a rescaled natural exponential, $a^x = e^{x\ln a}$, and every logarithm a rescaled natural logarithm. This is why calculators and programming languages provide little more than $\exp$ and $\ln$.

::: widget plot
f: a^x; log(x, a); x
sliders: a=2:0.25:4:0.05
x: -4, 6
y: -4, 6
equal: true
labels: a^x; \log_a x; y=x
caption: The graph of $\log_a x$ is the mirror image of the graph of $a^x$ in the line $y = x$, as [[#prop-inverse-graph]] predicts. Move $a$: for $a > 1$ both functions increase, for $a<1$ both decrease. Near $a = 1$ the exponential flattens to the constant $1$, which is not one-to-one, and the logarithm disappears. Every $a^x$ passes through $(0,1)$ and every $\log_a x$ through $(1,0)$.
:::

::: example Solving an exponential equation {#ex-exp-equation}
Solve $3^{2x+1} = 5^x$ exactly, and give a numerical value.
::: solution
Both sides are positive, and two positive numbers are equal exactly when their natural logarithms are equal ($\ln$ is one-to-one). Taking logarithms turns the exponents into factors ([[#thm-log-laws]]):

$$
(2x+1)\ln 3 = x\ln 5 \iff x(2\ln 3 - \ln 5) = -\ln 3 \iff x = \frac{\ln 3}{\ln 5 - 2\ln 3} = \frac{\ln 3}{\ln(5/9)}.
$$

Since $5/9 < 1$, $\ln(5/9) < 0$ and the solution is negative: $x \approx 1.0986/(-0.5878) \approx -1.869$.
:::
:::

::: application Half-lives and radiocarbon dating
A radioactive sample decays so that after time $t$ the fraction remaining is $2^{-t/T}$, where $T$ is the half-life. For carbon-14, $T \approx 5730$ years. If a piece of ancient charcoal retains $30\%$ of the carbon-14 found in living wood, its age $t$ satisfies $2^{-t/T} = 0.3$, so

$$
t = T\log_2\frac{1}{0.3} = T\,\frac{\ln(10/3)}{\ln 2} \approx 5730 \times 1.737 \approx 9950 \text{ years}.
$$

Logarithms are the tool for extracting an unknown exponent; the same computation gives doubling times of investments and of epidemics.
:::

## Trigonometric functions

In calculus, angles are always measured in radians.

::: definition Radians, sine and cosine {#def-sin-cos}
Let $P$ be the point reached by travelling a distance $\abs{\theta}$ around the unit circle $x^2 + y^2 = 1$, starting from $(1, 0)$, anticlockwise if $\theta \ge 0$ and clockwise if $\theta<0$. We say the ray $OP$ makes an angle of $\theta$ **radians** with the positive $x$-axis, and define

$$
\cos\theta = \text{the } x\text{-coordinate of } P, \qquad \sin\theta = \text{the } y\text{-coordinate of } P.
$$

Further, $\tan\theta = \dfrac{\sin\theta}{\cos\theta}$ and $\sec\theta = \dfrac1{\cos\theta}$ where $\cos\theta\neq0$, and $\cot\theta = \dfrac{\cos\theta}{\sin\theta}$ and $\csc\theta = \dfrac1{\sin\theta}$ where $\sin\theta\neq0$.
:::

The circumference of the unit circle is $2\pi$, so a full turn is $2\pi$ radians: $360^\circ = 2\pi$, $180^\circ = \pi$ and $1 \text{ rad} \approx 57.3^\circ$. Radians are not an arbitrary choice. They are the unit for which $\lim_{x\to0}(\sin x)/x = 1$ ([[calculus-1/limits#thm-sinx]]) and hence for which the derivative of $\sin$ is $\cos$; in degrees an awkward factor $\pi/180$ would appear in every formula.

Directly from the definition we read off:

- $\sin^2\theta + \cos^2\theta = 1$, because $P$ lies on the unit circle, and so $-1 \le \sin\theta,\cos\theta \le 1$;
- $\sin$ and $\cos$ are periodic with period $2\pi$, and $\tan$ with period $\pi$;
- $\cos(-\theta) = \cos\theta$ and $\sin(-\theta) = -\sin\theta$ (reflect in the $x$-axis), so $\cos$ is even and $\sin$ is odd;
- $\sin\theta = 0$ exactly when $\theta = k\pi$, and $\cos\theta = 0$ exactly when $\theta = \frac{\pi}{2} + k\pi$, for $k \in \Z$.

The values at $\pi/6$, $\pi/4$ and $\pi/3$ come from the half-equilateral and the isosceles right triangles: $\sin\frac{\pi}{6} = \frac12$, $\sin\frac{\pi}{4} = \frac{\sqrt2}{2}$ and $\sin\frac{\pi}{3} = \frac{\sqrt3}{2}$, with cosine taking the same values in the reverse order.

::: widget unitcircle
angle: pi/6
show: all
caption: Change the angle $\theta$. The height of the point is $\sin\theta$ and its horizontal position is $\cos\theta$; the graphs record these coordinates as $\theta$ varies. Watch $\tan\theta$, the slope of the ray, blow up as the point approaches the top and bottom of the circle, where $\cos\theta = 0$.
:::

All the other trigonometric identities follow from a single formula.

::: theorem Addition formulas {#thm-addition}
For all real $\alpha$ and $\beta$,

$$
\begin{aligned}
\cos(\alpha - \beta) &= \cos\alpha\cos\beta + \sin\alpha\sin\beta, & \cos(\alpha+\beta) &= \cos\alpha\cos\beta - \sin\alpha\sin\beta,\\
\sin(\alpha + \beta) &= \sin\alpha\cos\beta + \cos\alpha\sin\beta, & \sin(\alpha-\beta) &= \sin\alpha\cos\beta - \cos\alpha\sin\beta.
\end{aligned}
$$
:::

::: proof
Let $P = (\cos\alpha, \sin\alpha)$, $Q = (\cos\beta, \sin\beta)$, $A = (1,0)$ and $R = (\cos(\alpha-\beta), \sin(\alpha-\beta))$. Rotating the plane about the origin through the angle $-\beta$ moves $Q$ to $A$ and $P$ to $R$. Rotations preserve distances, so $\abs{PQ} = \abs{RA}$. Using $\cos^2 + \sin^2 = 1$ to simplify,

$$
\begin{aligned}
\abs{PQ}^2 &= (\cos\alpha - \cos\beta)^2 + (\sin\alpha-\sin\beta)^2 = 2 - 2(\cos\alpha\cos\beta + \sin\alpha\sin\beta),\\
\abs{RA}^2 &= \bigl(\cos(\alpha-\beta) - 1\bigr)^2 + \sin^2(\alpha-\beta) = 2 - 2\cos(\alpha-\beta).
\end{aligned}
$$

Equating the two gives the formula for $\cos(\alpha-\beta)$. Replacing $\beta$ by $-\beta$, and using that $\cos$ is even and $\sin$ is odd, gives the formula for $\cos(\alpha+\beta)$.

Taking $\alpha = \frac{\pi}{2}$ in the first formula gives $\cos\bigl(\frac{\pi}{2} - \beta\bigr) = \sin\beta$ for every $\beta$; applying this with $\frac{\pi}{2}-\beta$ in place of $\beta$ gives $\sin\bigl(\frac\pi2-\beta\bigr) = \cos\beta$. Therefore

$$
\sin(\alpha+\beta) = \cos\bigl((\tfrac{\pi}{2} - \alpha) - \beta\bigr) = \cos(\tfrac\pi2-\alpha)\cos\beta + \sin(\tfrac\pi2-\alpha)\sin\beta = \sin\alpha\cos\beta + \cos\alpha\sin\beta,
$$

and replacing $\beta$ by $-\beta$ gives the last formula.
:::

Taking $\alpha = \beta = \theta$ gives the **double-angle formulas**

$$
\sin 2\theta = 2\sin\theta\cos\theta, \qquad \cos 2\theta = \cos^2\theta - \sin^2\theta = 2\cos^2\theta - 1 = 1 - 2\sin^2\theta.
$$ {#eq-double-angle}

Rearranged as $\cos^2\theta = \frac{1 + \cos 2\theta}{2}$ and $\sin^2\theta = \frac{1 - \cos 2\theta}{2}$, the last two forms will be indispensable for integrating powers of sine and cosine in [[calculus-1/integration-techniques]].

::: example A trigonometric equation {#ex-trig-equation}
Find all $x \in [0, 2\pi)$ with $\sin 2x = \cos x$.
::: solution
By the double-angle formula the equation is $2\sin x\cos x = \cos x$, that is,

$$
\cos x\,(2\sin x - 1) = 0.
$$

A product is zero exactly when one of its factors is. Either $\cos x = 0$, giving $x = \pi/2$ or $x = 3\pi/2$; or $\sin x = \frac12$, giving $x = \pi/6$ or $x = 5\pi/6$. So there are four solutions: $\pi/6$, $\pi/2$, $5\pi/6$ and $3\pi/2$.
:::
:::

::: warning Do not divide by something that may be zero
Dividing $2\sin x\cos x = \cos x$ by $\cos x$ gives $\sin x = \frac12$ and silently loses the solutions $\pi/2$ and $3\pi/2$, where $\cos x = 0$. Factorise instead of dividing, or treat the case "divisor $= 0$" separately.
:::

## Inverse trigonometric functions

The sine function is far from one-to-one: it takes every value in $[-1, 1]$ infinitely often. But on $[-\frac\pi2, \frac\pi2]$ it is strictly increasing — the point $P$ climbs from the bottom of the circle to the top through the right half — and takes every value in $[-1, 1]$ exactly once. We invert this restricted function, and similarly cosine on $[0, \pi]$ and tangent on $(-\frac\pi2, \frac\pi2)$.

::: definition Inverse trigonometric functions {#def-arcsin}
- $\arcsin\colon[-1,1]\to[-\frac\pi2,\frac\pi2]$ is given by $\arcsin y = x \iff \bigl(\sin x = y$ and $-\frac\pi2\le x\le\frac\pi2\bigr)$.
- $\arccos\colon[-1,1]\to[0,\pi]$ is given by $\arccos y = x \iff \bigl(\cos x = y$ and $0 \le x \le \pi\bigr)$.
- $\arctan\colon\R\to(-\frac\pi2,\frac\pi2)$ is given by $\arctan y = x \iff \bigl(\tan x = y$ and $-\frac\pi2< x<\frac\pi2\bigr)$.
:::

Each is the inverse of a strictly monotonic function, so it exists by [[#thm-monotone-inverse]]; $\arcsin$ and $\arctan$ are increasing and $\arccos$ is decreasing. As $x \to \pm\infty$, $\arctan x \to \pm\frac{\pi}{2}$: the graph of $\arctan$ has two horizontal asymptotes, the reflections of the vertical asymptotes of $\tan$.

::: warning arcsin(sin x) is not always x
The identity $\sin(\arcsin y) = y$ holds for every $y\in[-1,1]$, but $\arcsin(\sin x) = x$ holds only for $x\in[-\frac\pi2, \frac\pi2]$. For example, $\arcsin\bigl(\sin\frac{3\pi}{4}\bigr) = \arcsin\frac{\sqrt2}{2} = \frac{\pi}{4}$, because $\arcsin$ always returns an angle in $[-\frac\pi2,\frac\pi2]$.
:::

::: quiz
What is $\arccos\bigl(\cos(-\tfrac{\pi}{3})\bigr)$?
- [ ] $-\pi/3$
- [x] $\pi/3$
- [ ] $2\pi/3$
- [ ] $5\pi/3$
::: solution
Cosine is even, so $\cos(-\pi/3) = \cos(\pi/3) = \frac12$, and $\arccos\frac12$ is the unique angle in $[0,\pi]$ whose cosine is $\frac12$, namely $\pi/3$. The answer $-\pi/3$ is impossible because $\arccos$ never returns a negative angle.
:::
:::

::: example Simplifying compositions {#ex-arc-compositions}
Show that $\cos(\arcsin x) = \sqrt{1-x^2}$ for $-1\le x\le1$, and that $\sin(\arctan x) = \dfrac{x}{\sqrt{1+x^2}}$ for all real $x$.
::: solution
Let $\theta = \arcsin x$, so that $\sin\theta = x$ and $\theta\in[-\frac\pi2,\frac\pi2]$. Then $\cos^2\theta = 1 - \sin^2\theta = 1 - x^2$, so $\cos\theta = \pm\sqrt{1-x^2}$. The sign is $+$ because $\cos\theta\ge0$ on $[-\frac\pi2, \frac\pi2]$. Hence $\cos(\arcsin x) = \sqrt{1-x^2}$.

Now let $\varphi = \arctan x$, so that $\tan\varphi = x$ and $\varphi\in(-\frac\pi2,\frac\pi2)$, where $\cos\varphi>0$. Dividing $\sin^2\varphi+\cos^2\varphi = 1$ by $\cos^2\varphi$ gives $\tan^2\varphi + 1 = 1/\cos^2\varphi$, so $\cos\varphi = 1/\sqrt{1+x^2}$ (the positive root), and

$$
\sin\varphi = \tan\varphi\,\cos\varphi = \frac{x}{\sqrt{1+x^2}}.
$$

A right triangle with legs $x$ and $1$ makes the second identity easy to remember when $x > 0$, but the algebraic argument also covers $x \le 0$ and settles the signs.
:::
:::

Identities of this kind are exactly what is needed to differentiate the inverse trigonometric functions in [[calculus-1/chain-rule]] and to undo trigonometric substitutions in [[calculus-1/integration-techniques]].

::: history
The word *function* was introduced by Gottfried Wilhelm Leibniz in the 1670s for quantities attached to a curve, such as its coordinates or the length of a tangent. In the eighteenth century Johann Bernoulli and then Leonhard Euler took a function to be an *analytic expression*, a formula built from a variable and constants; Euler, who also introduced the notation $f(x)$, made functions the central objects of analysis in his *Introductio in analysin infinitorum* (1748). Disputes over the vibrating string, and Joseph Fourier's claim (1807) that very general functions can be written as sums of sines and cosines, showed that formulas were too narrow a foundation. In 1837 Peter Gustav Lejeune Dirichlet described a function as any rule assigning a definite value to each input, formula or not — essentially the definition used today. Logarithms are older than all of this: John Napier published the first tables in 1614, as a way of turning multiplications into additions.
:::

## Where this leads

Every later chapter works with the functions met here. Limits ([[calculus-1/limits]]) and continuity ([[calculus-1/continuity]]) make precise the idea that the elementary functions have "unbroken" graphs; [[calculus-1/derivatives]] and [[calculus-1/chain-rule]] differentiate all of them, including the inverse functions, using the addition formulas proved above and the laws of exponents. Power series ([[calculus-2/taylor-series]]) give a second, fully rigorous definition of $\exp$, $\sin$ and $\cos$, and in [[complex-analysis/elementary-functions]] Euler's formula $e^{i\theta} = \cos\theta + i\sin\theta$ reveals the exponential and trigonometric functions as one and the same.

::: summary
- A function assigns exactly one output to each input in its domain. The domain is part of the function, and the range is found by solving $f(x) = y$.
- The composite $g\circ f$ is defined where $f(x)$ lies in the domain of $g$. The graph of $af(b(x-c))+d$ is the graph of $f$ scaled and shifted, with the horizontal changes acting "backwards".
- Every function on a symmetric domain is uniquely the sum of an even and an odd function; for $e^x$ these parts are $\cosh x$ and $\sinh x$.
- A strictly monotonic function is one-to-one and has a strictly monotonic inverse, whose graph is the reflection in $y=x$. Remember that $f^{-1}$ is not $1/f$.
- $p(a) = 0$ exactly when $x - a$ is a factor of the polynomial $p$, and a polynomial of degree $n$ has at most $n$ roots.
- $\log_a$ is the inverse of $a^x$; the laws of logarithms are the laws of exponents read backwards.
- In calculus angles are measured in radians. Sine and cosine are coordinates on the unit circle, and the addition formulas generate the other identities.
- $\arcsin$, $\arccos$ and $\arctan$ invert sine, cosine and tangent restricted to $[-\frac\pi2,\frac\pi2]$, $[0,\pi]$ and $(-\frac\pi2,\frac\pi2)$.
:::

## Exercises

::: exercise Natural domains {level=1}
Find the natural domain of $f(x) = \dfrac{\sqrt{x+2}}{x^2-9}$ and of $g(x) = \ln(4-x^2)$.
::: solution
For $f$ we need $x + 2 \ge 0$, i.e. $x\ge -2$, and $x^2 \neq 9$, i.e. $x\neq\pm3$. The value $-3$ is already excluded by $x \ge -2$, so the domain is $[-2, 3)\cup(3,\infty)$.

For $g$ the logarithm needs $4 - x^2 > 0$, i.e. $x^2 < 4$, so the domain is $(-2, 2)$.
:::
:::

::: exercise Composition is not commutative {level=1 check="-38"}
Let $f(x) = 2x + 3$ and $g(x) = x^2$. Compute $(f\circ g)(2) - (g\circ f)(2)$.
::: solution
$(f\circ g)(2) = f(g(2)) = f(4) = 11$ and $(g\circ f)(2) = g(f(2)) = g(7) = 49$, so the difference is $11 - 49 = -38$. In general $f(g(x)) = 2x^2 + 3$ while $g(f(x)) = (2x+3)^2$.
:::
:::

::: exercise Laws of logarithms {level=1 check="4"}
Evaluate $\log_2 48 - \log_2 3$ without a calculator.
::: solution
By [[#thm-log-laws]], $\log_2 48 - \log_2 3 = \log_2\frac{48}{3} = \log_2 16 = 4$, since $2^4 = 16$.
:::
:::

::: exercise Even, odd or neither {level=1}
Decide whether each function is even, odd or neither: (a) $x^3 - x$; (b) $x^2 + \cos x$; (c) $x + 1$; (d) $x\sin x$; (e) $e^x$.
::: solution
(a) Odd: $(-x)^3 - (-x) = -(x^3 - x)$.

(b) Even: $(-x)^2 + \cos(-x) = x^2 + \cos x$.

(c) Neither: the value at $1$ is $2$ and the value at $-1$ is $0$, which is neither $2$ nor $-2$.

(d) Even: $(-x)\sin(-x) = (-x)(-\sin x) = x\sin x$. (A product of two odd functions is even.)

(e) Neither: $e^{-1}$ is neither $e$ nor $-e$. Its even and odd parts are $\cosh x$ and $\sinh x$.
:::
:::

::: exercise An exact value {level=2 check="(sqrt(6)+sqrt(2))/4"}
Find the exact value of $\cos\frac{\pi}{12}$.
::: hint
$\frac{\pi}{12} = \frac{\pi}{3} - \frac{\pi}{4}$.
:::
::: solution
By the addition formula ([[#thm-addition]]),

$$
\cos\frac{\pi}{12} = \cos\frac\pi3\cos\frac\pi4 + \sin\frac\pi3\sin\frac\pi4 = \frac12\cdot\frac{\sqrt2}{2} + \frac{\sqrt3}{2}\cdot\frac{\sqrt2}{2} = \frac{\sqrt2 + \sqrt6}{4} \approx 0.9659.
$$
:::
:::

::: exercise A quadratic in sine {level=2}
Solve $2\cos^2 x + 3\sin x - 3 = 0$ for $x \in [0, 2\pi)$.
::: solution
Replace $\cos^2 x$ by $1 - \sin^2 x$: the equation becomes $2 - 2\sin^2 x + 3\sin x - 3 = 0$, that is,

$$
2\sin^2 x - 3\sin x + 1 = 0 \iff (2\sin x - 1)(\sin x - 1) = 0.
$$

So $\sin x = \frac12$, giving $x = \frac{\pi}{6}$ or $\frac{5\pi}{6}$, or $\sin x = 1$, giving $x = \frac\pi2$. The solutions are $\frac\pi6$, $\frac\pi2$ and $\frac{5\pi}{6}$.
:::
:::

::: exercise Inverting the logistic function {level=2}
Show that $f(x) = \dfrac{e^{2x}}{1 + e^{2x}}$ is one-to-one on $\R$ with range $(0,1)$, and find $f^{-1}$.
::: solution
We solve $y = f(x)$ for $x$. Multiplying out, $y + ye^{2x} = e^{2x}$, so $e^{2x}(1 - y) = y$. If $y = 1$ this says $0 = 1$, which is impossible. Otherwise $e^{2x} = \dfrac{y}{1-y}$, which has a solution exactly when $\dfrac{y}{1-y} > 0$, that is, when $0 < y < 1$; the solution is then unique because $\exp$ is one-to-one:

$$
x = \frac12\ln\frac{y}{1-y}.
$$

So each $y \in (0,1)$ is taken exactly once and no other value is taken: $f$ is one-to-one with range $(0,1)$, and $f^{-1}(y) = \frac12\ln\frac{y}{1-y}$. (In fact $f(x) = \frac{1 + \tanh x}{2}$, where $\tanh = \sinh/\cosh$.)
:::
:::

::: exercise Double angle of an arctangent {level=2 check="4/5"}
Find $\sin\bigl(2\arctan\frac12\bigr)$ exactly.
::: solution
Let $\theta = \arctan\frac12$, so $\tan\theta = \frac12$ and $\theta\in(0,\frac\pi2)$. As in [[#ex-arc-compositions]], $\cos\theta = \dfrac{1}{\sqrt{1 + 1/4}} = \dfrac{2}{\sqrt5}$ and $\sin\theta = \tan\theta\cos\theta = \dfrac{1}{\sqrt5}$. By the double-angle formula,

$$
\sin 2\theta = 2\sin\theta\cos\theta = 2\cdot\frac{1}{\sqrt5}\cdot\frac{2}{\sqrt5} = \frac45.
$$
:::
:::

::: exercise The inverse hyperbolic sine {level=3}
Prove that $\sinh$ is strictly increasing on $\R$ with range $\R$, and that its inverse is $\operatorname{arsinh} y = \ln\bigl(y + \sqrt{y^2 + 1}\bigr)$.
::: hint
Solve $\sinh x = y$ as a quadratic equation in $u = e^x$.
:::
::: solution
If $x_1 < x_2$, then $e^{x_1} < e^{x_2}$ and $e^{-x_1} > e^{-x_2}$, so $\sinh x_1 = \frac{e^{x_1} - e^{-x_1}}{2} < \frac{e^{x_2} - e^{-x_2}}{2} = \sinh x_2$. Thus $\sinh$ is strictly increasing and hence one-to-one.

Given $y\in\R$, put $u = e^x > 0$. The equation $\sinh x = y$ becomes $u - 1/u = 2y$, that is, $u^2 - 2yu - 1 = 0$, with roots $u = y \pm\sqrt{y^2+1}$. Since $\sqrt{y^2+1} > \abs{y}$, the root $y - \sqrt{y^2+1}$ is negative and cannot equal $e^x$, while $y + \sqrt{y^2+1}$ is positive. So the equation has exactly one solution,

$$
x = \ln\bigl(y + \sqrt{y^2+1}\bigr).
$$

Every real $y$ is therefore a value of $\sinh$, so its range is $\R$, and this formula is the inverse function.
:::
:::

::: exercise Polynomials that agree at many points {#exr-poly-agree level=3}
Let $p$ and $q$ be polynomials of degree at most $n$, and suppose that $p(x_k) = q(x_k)$ for $n+1$ distinct numbers $x_0, x_1, \dots, x_n$. Prove that $p$ and $q$ have the same coefficients.
::: solution
The difference $r = p - q$ is a polynomial whose coefficients are the differences of those of $p$ and $q$, all of degree at most $n$, and $r(x_k) = 0$ for $k = 0, \dots, n$. Suppose some coefficient of $r$ is non-zero. Then $r$ has a degree $m$ with $0 \le m\le n$, and by [[#cor-roots]] it has at most $m \le n$ distinct roots. But $x_0, \dots, x_n$ are $n + 1$ distinct roots — a contradiction. Hence every coefficient of $r$ is $0$, so $p$ and $q$ have the same coefficients.
:::
:::

::: exercise A bijection from ℝ onto (−1, 1) {level=3}
Let $f(x) = \dfrac{x}{1 + \abs{x}}$. Prove that $f$ is strictly increasing on $\R$ with range $(-1, 1)$, and find a formula for $f^{-1}$.
::: hint
Treat $x\ge0$ and $x<0$ separately; $f$ is odd.
:::
::: solution
*Monotonicity.* For $x \ge 0$, $f(x) = \dfrac{x}{1+x} = 1 - \dfrac{1}{1+x}$, which is strictly increasing on $[0,\infty)$ (as $x$ grows, $\frac{1}{1+x}$ strictly decreases) and satisfies $0\le f(x) < 1$. Since $f$ is odd, it is also strictly increasing on $(-\infty, 0]$ with $-1 < f(x)\le 0$ there. Now let $x_1 < x_2$. If both are $\ge 0$ or both are $\le 0$, then $f(x_1)<f(x_2)$ by what we have shown; otherwise $x_1 < 0 < x_2$, and $f(x_1) < 0 < f(x_2)$. So $f$ is strictly increasing on $\R$.

*Range.* We have seen that $\abs{f(x)} < 1$ for all $x$. Conversely, let $y \in (-1,1)$. If $y \ge 0$, put $x = \dfrac{y}{1-y}\ge 0$; then $1 + x = \dfrac{1}{1-y}$ and $f(x) = \dfrac{x}{1+x} = y$. If $y < 0$, put $x = \dfrac{y}{1+y} < 0$; then $1 + \abs{x} = 1 - x = \dfrac{1}{1+y}$ and $f(x) = y$. So the range is exactly $(-1,1)$, and both cases are summarised by

$$
f^{-1}(y) = \frac{y}{1 - \abs{y}}, \qquad -1 < y < 1.
$$
:::
:::
