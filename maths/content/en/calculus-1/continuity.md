The graph of $y = x^2$ can be drawn without lifting the pencil from the paper; the graph of the floor function $\lfloor x\rfloor$ cannot, because it jumps at every integer. This chapter turns the pencil test into mathematics. A function is **continuous** at a point when its values near the point are close to its value at the point — so that small errors in the input cause only small errors in the output.

Continuity matters for practical and for theoretical reasons. Practically, every measurement has an error, and only for continuous functions does an approximate input give an approximately correct output: a calculator that computes $\sin(1.4142)$ in place of $\sin(\sqrt2)$ relies on it. Theoretically, continuous functions on intervals have two remarkable properties. They cannot skip values (the **intermediate value theorem**), which guarantees that equations have solutions, and on closed bounded intervals they attain a largest and a smallest value (the **extreme value theorem**), which guarantees that optimisation problems have answers. Both theorems are used constantly in the rest of the course.

## Continuity at a point

In [[calculus-1/limits]] we were careful to ignore the value $f(a)$ when computing $\lim_{x\to a} f(x)$. Continuity is the requirement that the limit and the value agree.

::: definition Continuity at a point {#def-continuous}
Let $f$ be defined on an open interval containing $a$. Then $f$ is **continuous at** $a$ if

$$
\lim_{x\to a} f(x) = f(a).
$$ {#eq-continuity}

Equivalently: for every $\eps > 0$ there is a $\delta > 0$ such that $\abs{x - a} < \delta \implies \abs{f(x) - f(a)} < \eps$.
:::

The definition packs three requirements into one equation: $f(a)$ is defined, the limit $\lim_{x\to a} f(x)$ exists, and the two are equal. In the ε–δ form we no longer need the restriction $0 < \abs{x-a}$ of [[calculus-1/limits#def-limit]], because at $x = a$ the inequality $\abs{f(a) - f(a)} < \eps$ holds automatically.

The definition also says something useful in practice: **limits of continuous functions can be computed by substitution**. Direct substitution for polynomials and rational functions ([[calculus-1/limits#cor-substitution]]) says exactly that these functions are continuous wherever they are defined.

At the end of an interval only one side is available, so we need one-sided versions.

::: definition One-sided continuity and continuity on an interval {#def-continuous-interval}
$f$ is **continuous from the right** at $a$ if $\lim_{x\to a^+} f(x) = f(a)$, and **continuous from the left** at $a$ if $\lim_{x\to a^-} f(x) = f(a)$. A function is **continuous on an interval** $I$ if it is continuous at every interior point of $I$, continuous from the right at the left endpoint (if that belongs to $I$) and from the left at the right endpoint (if that belongs to $I$). A **continuous function** is one that is continuous at every point of its domain, in this sense.
:::

::: example The square root is continuous {#ex-sqrt}
Prove that $f(x) = \sqrt{x}$ is continuous on $[0, \infty)$.
::: solution
*At a point $a > 0$.* For $x\ge 0$, multiplying by the conjugate gives

$$
\abs{\sqrt{x} - \sqrt{a}} = \frac{\abs{x - a}}{\sqrt{x} + \sqrt{a}} \le \frac{\abs{x-a}}{\sqrt{a}}.
$$

Let $\eps > 0$ and put $\delta = \min(a, \eps\sqrt{a})$. If $\abs{x - a} < \delta$, then $x > a - \delta \ge 0$, so $\sqrt{x}$ is defined, and $\abs{\sqrt x - \sqrt a} \le \abs{x-a}/\sqrt a < \delta/\sqrt a \le \eps$.

*At $0$, from the right.* Let $\eps > 0$ and put $\delta = \eps^2$. If $0 \le x < \delta$, then $\abs{\sqrt{x} - 0} = \sqrt{x} < \sqrt{\delta} = \eps$.

Hence $\sqrt{x}$ is continuous at every $a > 0$ and from the right at $0$, so it is continuous on $[0, \infty)$.
:::
:::

Notice that the $\delta$ that works at $a$ depends on $a$ as well as on $\eps$: the closer $a$ is to $0$, the steeper the graph and the smaller $\delta$ must be. Whether one $\delta$ can serve for all points at once is the question of *uniform continuity*, studied in [[real-analysis/continuity]].

::: quiz
Let $f(x) = \dfrac{\sin x}{x}$ for $x\neq0$ and $f(0) = c$. For which values of $c$ is $f$ continuous at $0$?
- [ ] $c = 0$
- [x] $c = 1$
- [ ] Every $c$, because $\sin x/x$ is undefined at $0$ anyway
- [ ] No $c$ works
::: solution
By [[calculus-1/limits#thm-sinx]], $\lim_{x\to0}\frac{\sin x}{x} = 1$. Continuity at $0$ requires $f(0)$ to equal this limit, so exactly $c = 1$ works. For any other $c$ the function has a *removable* discontinuity at $0$.
:::
:::

## Kinds of discontinuity

If $f$ is defined on an open interval around $a$, except possibly at $a$ itself, and $f$ is not continuous at $a$, we say that $f$ is **discontinuous** at $a$, or has a **discontinuity** there. Discontinuities come in a few distinct kinds, classified by the one-sided limits.

::: definition Types of discontinuity {#def-discontinuities}
Suppose $f$ has a discontinuity at $a$. The discontinuity is

1. **removable** if $\lim_{x\to a}f(x)$ exists (as a real number): redefining $f(a)$ to be this limit makes $f$ continuous at $a$;
2. a **jump** if both one-sided limits exist but are different;
3. **infinite** if at least one one-sided limit is $\infty$ or $-\infty$;
4. **essential** (or oscillating) in all other cases, that is, when neither one-sided limit is infinite and at least one of them does not exist.
:::

The standard examples:

- $f(x) = \dfrac{x^2-1}{x-1}$ has a removable discontinuity at $1$ (the limit is $2$, and $f(1)$ is undefined);
- $\lfloor x\rfloor$ and $\sgn x$ have jumps at the integers and at $0$ respectively;
- $1/x^2$ has an infinite discontinuity at $0$;
- $\sin(1/x)$ has an essential discontinuity at $0$ ([[calculus-1/limits#exr-sin-reciprocal]]).

::: widget plot
f: if(abs(x - 1) < 0.004, sqrt(-1), if(x < 1, x^2 + k, 3 - x))
sliders: k=-1:-2:3:0.1
x: -1, 3
y: -1, 5
points: 1, 2
caption: This function equals $x^2 + k$ for $x<1$ and $3 - x$ for $x \ge 1$; the dot marks the value $f(1) = 2$. The left-hand limit at $1$ is $1 + k$ and the right-hand limit is $2$, so for most $k$ there is a jump discontinuity. Find the one value of $k$ that closes the gap and makes $f$ continuous at $1$.
:::

::: widget plot
f: sin(1/x); x*sin(1/x)
x: -0.5, 0.5
y: -1.2, 1.2
labels: \sin(1/x); x\sin(1/x)
caption: Near $0$, $\sin(1/x)$ oscillates between $-1$ and $1$ infinitely often — so often that the picture becomes a blur — and neither one-sided limit exists. This essential discontinuity cannot be repaired by any choice of value at $0$. Multiplying by $x$ damps the oscillation: $\lvert x\sin(1/x)\rvert \le \lvert x\rvert$, so $x\sin(1/x)\to0$ by the squeeze theorem, and giving it the value $0$ at $0$ produces a continuous function.
:::

::: remark Is 1/x a continuous function?
Yes: it is continuous at every point of its domain $\R\setminus\set{0}$. It also has an infinite discontinuity at $0$, a point *outside* its domain. There is no contradiction, because "continuous function" refers only to points where the function is defined, whereas a discontinuity is a property of a point near which $f$ is defined. The graph of $1/x$ is in two pieces because its domain is in two pieces, not because the function breaks anywhere it is defined.
:::

## Combining continuous functions

Proving continuity from the ε–δ definition each time would be tedious. Instead, we show that continuity survives the ways of building functions from [[calculus-1/real-functions]], and check a handful of basic functions by hand.

::: theorem Arithmetic of continuous functions {#thm-cont-algebra}
If $f$ and $g$ are continuous at $a$ and $c$ is a constant, then $f + g$, $f - g$, $cf$ and $fg$ are continuous at $a$, and so is $f/g$ provided $g(a) \neq 0$.
:::

::: proof
By hypothesis $f(x) \to f(a)$ and $g(x)\to g(a)$ as $x\to a$. The limit laws ([[calculus-1/limits#thm-laws]]) give $f(x) + g(x) \to f(a) + g(a)$, $f(x)g(x) \to f(a)g(a)$ and so on, and, when $g(a)\neq 0$, $f(x)/g(x)\to f(a)/g(a)$. Each of these says that the combined function has limit equal to its value at $a$.
:::

The deeper fact is that continuity survives composition. We prove a slightly stronger statement about limits, which also justifies substitutions such as $u = 3x$ inside $\frac{\sin u}{u}$ in [[calculus-1/limits#ex-sin3x]].

::: theorem Limits and continuity of composites {#thm-composition}
Suppose $\lim_{x\to a} g(x) = b$.

1. If $f$ is continuous at $b$, then $\displaystyle\lim_{x\to a} f\bigl(g(x)\bigr) = f(b)$. In particular, if $g$ is continuous at $a$ and $f$ is continuous at $g(a)$, then $f\circ g$ is continuous at $a$.
2. If instead $\lim_{y\to b} f(y) = L$ and $g(x) \neq b$ for all $x \neq a$ in some open interval around $a$, then $\displaystyle\lim_{x\to a} f\bigl(g(x)\bigr) = L$.
:::

::: proof
(1) Let $\eps > 0$. Since $f$ is continuous at $b$, there is $\eta > 0$ such that $\abs{y - b} < \eta$ implies $\abs{f(y) - f(b)} < \eps$. Since $g(x) \to b$, applying the definition of limit with $\eta$ in the role of $\eps$, there is $\delta>0$ such that $0<\abs{x-a}<\delta$ implies $\abs{g(x) - b} < \eta$. Then for $0 < \abs{x-a} < \delta$ we may take $y = g(x)$ and conclude $\abs{f(g(x)) - f(b)} < \eps$. If $g$ is continuous at $a$, take $b = g(a)$: the conclusion says $f(g(x)) \to f(g(a))$, which is continuity of $f\circ g$ at $a$.

(2) Let $\eps>0$. Choose $\eta>0$ with $\abs{f(y) - L} < \eps$ whenever $0<\abs{y - b} < \eta$, then $\delta>0$ so small that $0<\abs{x-a}<\delta$ implies both $\abs{g(x) - b} < \eta$ and $g(x)\neq b$. For such $x$, $y = g(x)$ satisfies $0 < \abs{y-b} < \eta$, hence $\abs{f(g(x)) - L} < \eps$.
:::

::: warning The composition rule needs its hypotheses
It is tempting to "move the limit inside": $\lim f(g(x)) = f(\lim g(x))$. This is exactly part 1, and it needs $f$ to be continuous at $b$. For a counterexample otherwise, let $f(y) = 0$ for $y\neq0$ and $f(0) = 1$, and let $g(x) = 0$ for all $x$. Then $g(x)\to 0$ and $\lim_{y\to0} f(y) = 0$, yet $f(g(x)) = 1$ for every $x$, so $\lim_{x\to0}f(g(x)) = 1$. Part 2 does not apply because $g(x) = 0 = b$ for all $x$.
:::

For instance, $\lim_{x\to0}\dfrac{\sin(x^2)}{x^2} = 1$ by part 2, with $g(x) = x^2$ (which is non-zero for $x\neq0$) and $f(y) = \frac{\sin y}{y}$.

### The basic continuous functions

Polynomials and rational functions are continuous on their domains by direct substitution. For the trigonometric functions we need one inequality: $\abs{\sin t} \le \abs{t}$ for all real $t$. For $0<\abs{t}<\pi/2$ it follows from the area comparison in the proof of [[calculus-1/limits#thm-sinx]], and for $\abs{t}\ge\pi/2$ it holds because $\abs{\sin t}\le 1 < \abs{t}$.

::: proposition Sine and cosine are continuous {#prop-trig-continuous}
For all real $x$ and $a$, $\abs{\sin x - \sin a} \le \abs{x-a}$ and $\abs{\cos x - \cos a} \le \abs{x-a}$. Consequently $\sin$ and $\cos$ are continuous on $\R$, and $\tan$, $\sec$, $\cot$, $\csc$ are continuous on their domains.
:::

::: proof
Put $u = \frac{x+a}{2}$ and $v = \frac{x-a}{2}$, so that $x = u + v$ and $a = u - v$. By the addition formulas ([[calculus-1/real-functions#thm-addition]]),

$$
\sin x - \sin a = \sin(u+v) - \sin(u-v) = 2\cos u\sin v, \qquad \cos x - \cos a = -2\sin u\sin v.
$$

Since $\abs{\cos u}\le1$, $\abs{\sin u} \le 1$ and $\abs{\sin v}\le\abs{v}$, both differences are at most $2\abs{v} = \abs{x - a}$ in absolute value. Given $\eps>0$, the choice $\delta = \eps$ therefore works in [[#def-continuous]] at every point. The other four functions are quotients of $\sin$, $\cos$ and $1$, so they are continuous where their denominators do not vanish, by [[#thm-cont-algebra]].
:::

::: example Where is a function continuous? {#ex-where-continuous}
Find where $f(x) = \dfrac{\ln(4 - x^2)}{\sqrt{x} - 1}$ is continuous, and compute $\lim_{x\to0^+} f(x)$.
::: solution
We build $f$ from continuous pieces (using the continuity of $\ln$, proved in [[#cor-elementary]] below). The polynomial $4 - x^2$ is continuous everywhere and $\ln$ is continuous on $(0, \infty)$, so by [[#thm-composition]] $\ln(4 - x^2)$ is continuous wherever $4 - x^2 > 0$, that is, on $(-2, 2)$. The function $\sqrt{x} - 1$ is continuous on $[0,\infty)$ by [[#ex-sqrt]], and non-zero except at $x = 1$. By [[#thm-cont-algebra]] the quotient is continuous at every point of

$$
[0, 1)\cup(1, 2),
$$

with continuity from the right at $0$. This set is exactly the natural domain of $f$, so $f$ is a continuous function. In particular the limit can be found by substitution:

$$
\lim_{x\to0^+} f(x) = f(0) = \frac{\ln 4}{0 - 1} = -\ln 4.
$$
:::
:::

## The intermediate value theorem

If you walk from the bottom of a hill to the top, at some moment you must be exactly halfway up. Continuous functions behave the same way: they cannot get from one value to another without passing through every value in between.

::: theorem Intermediate value theorem {#thm-ivt}
Let $f$ be continuous on the closed interval $[a, b]$, and let $N$ be any number strictly between $f(a)$ and $f(b)$. Then there is a number $c \in (a, b)$ with $f(c) = N$.
:::

The statement looks obvious, but it depends on a deep property of the real numbers. Over the rational numbers it is false: $f(x) = x^2 - 2$ is continuous on $[1, 2]$, negative at $1$ and positive at $2$, but there is no *rational* $c$ with $c^2 = 2$. What the reals have and the rationals lack is **completeness**: every non-empty set of real numbers that is bounded above has a least upper bound. The following sketch shows where completeness enters; the full proof is in [[real-analysis/continuity]].

::: proof {collapsed}
*Sketch.* Replacing $f$ by $f - N$ we may assume $N = 0$, and replacing $f$ by $-f$ if necessary we may assume $f(a) < 0 < f(b)$. Put $[a_0, b_0] = [a, b]$. Given an interval $[a_n, b_n]$ with $f(a_n) < 0 \le f(b_n)$, let $m$ be its midpoint: if $f(m) < 0$ let $[a_{n+1}, b_{n+1}] = [m, b_n]$, and otherwise let $[a_{n+1}, b_{n+1}] = [a_n, m]$. Either way $f(a_{n+1}) < 0 \le f(b_{n+1})$, and the lengths satisfy $b_n - a_n = (b-a)/2^n$.

The left endpoints $a_0 \le a_1 \le a_2 \le \cdots$ increase and are bounded above by $b$. By completeness they converge to a limit $c\in[a,b]$ (their least upper bound), and because $b_n - a_n\to0$ the right endpoints converge to $c$ as well. By continuity of $f$ at $c$, $f(a_n) \to f(c)$ and $f(b_n)\to f(c)$. Since every $f(a_n)$ is negative, $f(c)\le 0$; since every $f(b_n)$ is non-negative, $f(c)\ge0$. Hence $f(c) = 0$, and $c\neq a, b$ because $f(a)\neq0\neq f(b)$. (The facts about limits of sequences used here are proved in [[calculus-2/sequences]].)
:::

The most common use is to show that an equation has a solution.

::: corollary Bolzano's theorem {#cor-bolzano}
If $f$ is continuous on $[a, b]$ and $f(a)$ and $f(b)$ have opposite signs, then $f(c) = 0$ for some $c\in(a, b)$.
:::

The proof sketch is also a practical algorithm. It does not find $c$ exactly, but it traps it in an interval that halves at every step.

::: algorithm Bisection method {#alg-bisection}
Input: $f$ continuous on $[a,b]$ with $f(a)f(b) < 0$, and a tolerance $\tau > 0$.

1. Let $m = \frac{a+b}{2}$. If $f(m) = 0$, stop: $m$ is a root.
2. If $f(a)f(m) < 0$, replace $b$ by $m$; otherwise replace $a$ by $m$. The new interval again has a sign change, so it contains a root by [[#cor-bolzano]].
3. If $b - a < \tau$, stop and return $m = \frac{a+b}{2}$; otherwise go to step 1.

After $n$ halvings the bracketing interval has length $(b-a)/2^n$, so its midpoint is within $(b-a)/2^{n+1}$ of a root.
:::

::: example Solving cos x = x {#ex-ivt-cos}
Show that the equation $\cos x = x$ has a solution in $(0, \pi/2)$, and locate it to within $0.1$.
::: solution
Let $g(x) = \cos x - x$, which is continuous on $\R$ by [[#prop-trig-continuous]] and [[#thm-cont-algebra]]. Since $g(0) = 1 > 0$ and $g(\pi/2) = -\pi/2 < 0$, [[#cor-bolzano]] gives $c \in (0, \pi/2)$ with $g(c) = 0$, that is, $\cos c = c$.

To locate $c$, bisect, starting more conveniently from $[0, 1]$ (as $g(1) = \cos 1 - 1 \approx -0.460 < 0$):

| interval | midpoint $m$ | $g(m)$ |
|---|---|---|
| $[0, 1]$ | $0.5$ | $0.378 > 0$ |
| $[0.5, 1]$ | $0.75$ | $-0.018 < 0$ |
| $[0.5, 0.75]$ | $0.625$ | $0.186 > 0$ |
| $[0.625, 0.75]$ | $0.6875$ | $0.085 > 0$ |

So $c \in [0.6875, 0.75]$, an interval of length $0.0625 < 0.1$. (The root is $c = 0.739085\ldots$; bisection gains one binary digit per step.)
:::
:::

::: widget newton
f: cos(x) - x
method: bisection
x0: 0
x1: pi/2
steps: 10
x: -0.2, 1.8
caption: Bisection for $g(x) = \cos x - x$ on $[0, \pi/2]$. Each step halves the bracketing interval while keeping a sign change inside it, so the root $c\approx 0.739085$ is trapped in ever smaller intervals — the construction in the proof of [[#thm-ivt]]. Step through the iterations and compare the width of the interval with $(\pi/2)/2^n$.
:::

::: example Polynomials of odd degree {#ex-odd-degree}
Prove that every polynomial of odd degree has at least one real root.
::: solution
Dividing by the leading coefficient does not change the roots, so we may assume $p(x) = x^n + c_{n-1}x^{n-1} + \dots + c_0$ with $n$ odd. For $x\neq0$ write

$$
p(x) = x^n\bigl(1 + r(x)\bigr), \qquad r(x) = \frac{c_{n-1}}{x} + \frac{c_{n-2}}{x^2} + \dots + \frac{c_0}{x^n}.
$$

Each term of $r(x)$ tends to $0$ as $x\to\pm\infty$, so there is $R > 0$ such that $\abs{r(x)} < \frac12$ whenever $\abs{x}\ge R$. For such $x$ the factor $1 + r(x)$ is positive, so $p(x)$ has the same sign as $x^n$, which (as $n$ is odd) is the sign of $x$. Thus $p(-R) < 0 < p(R)$. Since $p$ is continuous, [[#cor-bolzano]] gives a root in $(-R, R)$.

For even degree the conclusion fails: $x^2 + 1$ has no real root.
:::
:::

::: quiz
Suppose $f$ is continuous on $[0, 2]$ with $f(0) = 3$ and $f(2) = -1$. Which statements **must** be true? (Select all that apply.)
- [x] $f(c) = 0$ for some $c\in(0,2)$.
- [x] $f(c) = 2.5$ for some $c \in (0, 2)$.
- [ ] $f(1) = 1$.
- [ ] $f$ has exactly one zero in $(0,2)$.
- [ ] $f(c) = 4$ for no $c\in[0,2]$.
::: solution
Both $0$ and $2.5$ lie strictly between $f(2) = -1$ and $f(0) = 3$, so the intermediate value theorem guarantees they are taken. Nothing forces $f(1) = 1$ (the graph need not be a straight line), the theorem says nothing about *how many* zeros there are (the graph may cross the axis three times), and $f$ may well exceed $3$ somewhere in between — it is not prevented from taking the value $4$.
:::
:::

::: warning All the hypotheses matter
The theorem needs continuity on the **whole** closed interval. The function $1/x$ is negative at $-1$ and positive at $1$ but is never $0$: it is not continuous on $[-1, 1]$ (it is not even defined at $0$). Likewise $\sgn x$ takes the values $-1$ and $1$ on $[-1,1]$ but never $\frac12$. Also remember that the theorem only asserts existence: it does not say where $c$ is, nor that it is unique.
:::

::: application Two antipodal points with the same temperature
At any instant, there are two diametrically opposite points on the equator with exactly the same temperature. Describe points of the equator by their longitude $\theta$, and let $T(\theta)$ be the temperature there, assumed to vary continuously, with $T(\theta + 2\pi) = T(\theta)$. Put $g(\theta) = T(\theta) - T(\theta + \pi)$. Then $g$ is continuous and $g(\pi) = T(\pi) - T(2\pi) = -g(0)$. So either $g(0) = 0$, or $g(0)$ and $g(\pi)$ have opposite signs and $g$ vanishes somewhere in $(0,\pi)$. A zero of $g$ is a pair of antipodal points with equal temperatures. The two-dimensional version, the Borsuk–Ulam theorem (see [[topology/connectedness]]), goes further: at any instant there are two antipodal points somewhere on the globe with the same temperature *and* the same pressure.
:::

### Continuity of inverse functions

The intermediate value theorem shows that a continuous function maps an interval onto an interval: if $y_1 < y < y_2$ are values $y_1 = f(x_1)$ and $y_2 = f(x_2)$, the theorem applied between $x_1$ and $x_2$ shows that $y$ is a value too. Combined with the next result, this gives the continuity of all the inverse functions met in [[calculus-1/real-functions]].

::: theorem Monotonic functions without gaps are continuous {#thm-monotone-continuous}
Let $f$ be monotonic on an interval $I$, and suppose its range $f(I)$ is an interval. Then $f$ is continuous on $I$.
:::

::: proof
Suppose $f$ is increasing (otherwise apply the argument to $-f$, whose range $-f(I)$ is also an interval). Let $a\in I$ and $\eps > 0$. We find $\delta_+>0$ such that $f(a) \le f(x) < f(a) + \eps$ for all $x\in I$ with $a \le x < a + \delta_+$, assuming $a$ is not the right endpoint of $I$.

Pick any $b \in I$ with $b > a$. If $f(b) < f(a) + \eps$, then $\delta_+ = b - a$ works, since $f(a)\le f(x)\le f(b)$ for $a\le x\le b$. Otherwise $f(b) \ge f(a) + \eps$, and the number $y = f(a) + \eps/2$ lies between the two values $f(a)$ and $f(b)$. Because $f(I)$ is an interval, $y = f(x_1)$ for some $x_1\in I$, and $x_1 > a$ because $f(x_1) > f(a)$ and $f$ is increasing. Then $\delta_+ = x_1 - a$ works: for $a\le x< x_1$ we have $f(a) \le f(x) \le f(x_1) = f(a) + \eps/2$.

In the same way there is $\delta_- > 0$ with $f(a) - \eps < f(x) \le f(a)$ for $x \in I$ with $a - \delta_- < x \le a$, unless $a$ is the left endpoint of $I$. With $\delta$ the smaller of the available $\delta_\pm$, every $x\in I$ with $\abs{x - a} < \delta$ satisfies $\abs{f(x) - f(a)} < \eps$. So $f$ is continuous at $a$ (one-sidedly if $a$ is an endpoint).
:::

::: corollary Continuity of inverse functions {#cor-inverse-continuous}
If $f$ is continuous and strictly monotonic on an interval $I$, then $f(I)$ is an interval and the inverse function $f^{-1}\colon f(I)\to I$ is continuous.
:::

::: proof
By the intermediate value theorem $f(I)$ contains every number between any two of its elements, which is what it means to be an interval. By [[calculus-1/real-functions#thm-monotone-inverse]], $f^{-1}$ is strictly monotonic on $f(I)$, and its range is the interval $I$. So [[#thm-monotone-continuous]] applies to $f^{-1}$.
:::

::: corollary The elementary functions are continuous {#cor-elementary}
Roots $x^{1/n}$, exponentials $a^x$, logarithms $\log_a x$ and the inverse trigonometric functions $\arcsin$, $\arccos$, $\arctan$ are continuous on their domains. Consequently every function built from these, polynomials and the trigonometric functions by arithmetic operations and composition is continuous at each point of its domain (one-sidedly at endpoints).
:::

::: proof
The root $x^{1/n}$ is the inverse of the continuous, strictly increasing function $x^n$ on $[0,\infty)$ (on $\R$ if $n$ is odd), so it is continuous by [[#cor-inverse-continuous]]. The exponential $a^x$ ($a > 0$) is monotonic on $\R$ and its range is the interval $(0,\infty)$ (or $\set{1}$ when $a = 1$), so it is continuous by [[#thm-monotone-continuous]]; $\log_a$ is the inverse of a continuous strictly monotonic function, hence continuous. Similarly $\arcsin$, $\arccos$ and $\arctan$ are inverses of the restrictions of $\sin$, $\cos$, $\tan$ to $[-\frac\pi2,\frac\pi2]$, $[0,\pi]$ and $(-\frac\pi2,\frac\pi2)$, which are continuous ([[#prop-trig-continuous]]) and strictly monotonic. The final statement follows from [[#thm-cont-algebra]] and [[#thm-composition]].
:::

## The extreme value theorem

The second great property of continuous functions concerns maxima and minima. We say $f$ **attains a maximum** on a set $D$ at $d\in D$ if $f(x)\le f(d)$ for all $x\in D$, and similarly for a minimum.

::: theorem Extreme value theorem {#thm-evt}
If $f$ is continuous on a closed bounded interval $[a, b]$, then $f$ attains a maximum and a minimum on $[a,b]$: there are $c, d\in[a,b]$ such that

$$
f(c) \le f(x) \le f(d) \qquad\text{for all } x\in[a,b].
$$
:::

::: proof {collapsed}
*Sketch.* The proof has two steps, both relying on completeness; details are in [[real-analysis/continuity]].

*Step 1: $f$ is bounded.* If not, for each $n$ there is $x_n\in[a,b]$ with $\abs{f(x_n)} > n$. By the Bolzano–Weierstrass theorem (a consequence of completeness, proved in [[real-analysis/sequences]]), some subsequence $x_{n_k}$ converges to a point $p$, which lies in $[a,b]$ because the interval is closed. Continuity at $p$ gives $f(x_{n_k}) \to f(p)$, which is impossible since $\abs{f(x_{n_k})} > n_k \to\infty$.

*Step 2: the bound is attained.* By Step 1 and completeness, the set of values has a least upper bound $M$. Suppose $f(x) < M$ for every $x$. Then $h(x) = 1/(M - f(x))$ is continuous on $[a,b]$, hence bounded by Step 1, say $h(x)\le K$ with $K>0$. This gives $f(x)\le M - 1/K$ for all $x$, so $M - 1/K$ is an upper bound smaller than $M$ — a contradiction. Hence $f(d) = M$ for some $d$. Applying this to $-f$ gives the minimum.
:::

Each hypothesis is needed, as these examples show.

- **Closed interval.** $f(x) = x$ on $(0, 1)$ is continuous and bounded but has no largest or smallest value: it gets arbitrarily close to $1$ and to $0$ without reaching them.
- **Bounded interval.** $f(x) = x$ on $[0,\infty)$ has no maximum.
- **Continuity.** $f(x) = x$ for $0\le x< 1$ with $f(1) = 0$ is defined on $[0,1]$, but its values approach $1$ without attaining it.
- **Boundedness may fail too.** $1/x$ on $(0, 1]$ is continuous but unbounded above.

::: quiz
Which of these functions attain a maximum value on the given interval? (Select all that apply.)
- [x] $x^2$ on $[-1, 2]$
- [ ] $x$ on $(0,1)$
- [x] $\sin x$ on $(0, \pi)$
- [ ] $1/x$ on $(0, 1]$
::: solution
$x^2$ on $[-1,2]$ is covered by the extreme value theorem; the maximum is $4$, at $x=2$. The identity on $(0,1)$ has no maximum. $\sin x$ on $(0,\pi)$ *does* attain its maximum $1$, at $\pi/2$, although the interval is open — the theorem gives a sufficient condition, not a necessary one. $1/x$ on $(0,1]$ is unbounded above, though it does attain a minimum, $1$, at $x = 1$.
:::
:::

The extreme value theorem only asserts that extreme values exist; finding them is the business of [[calculus-1/curve-sketching]], where we shall see that they occur at endpoints or at points where the derivative is zero or undefined. Its most important theoretical consequence is Rolle's theorem, the first step towards the mean value theorem ([[calculus-1/mean-value-theorem]]).

::: history
Until the early nineteenth century a "continuous" function meant one given by a single formula, and it was taken for granted that such a function could not change sign without vanishing. In 1817 Bernard Bolzano, a Prague priest and mathematician, published a proof of the intermediate value theorem "by purely analytic means", and gave along the way a definition of continuity equivalent to ours. Augustin-Louis Cauchy's *Cours d'analyse* (1821) defined continuity through infinitely small increments and proved the theorem by repeatedly subdividing the interval, much as in the bisection method. Both arguments relied, without saying so, on the completeness of the real numbers. This was made explicit only in 1872, when Richard Dedekind constructed the real numbers from the rationals in a booklet titled *Stetigkeit und irrationale Zahlen* ("Continuity and irrational numbers"). The extreme value theorem was proved by Bolzano in the 1830s, in work that remained unpublished for a century, and independently by Karl Weierstrass around 1860.
:::

## Where this leads

Continuity is the minimum regularity assumed in almost every theorem of calculus. In [[calculus-1/derivatives]] we shall see that differentiable functions are automatically continuous; the extreme value theorem drives the mean value theorem ([[calculus-1/mean-value-theorem]]); and every continuous function on a closed interval can be integrated ([[calculus-1/integrals]]). In [[real-analysis/continuity]] the theorems sketched here are proved in full, together with uniform continuity. Topology then reveals what is really going on: the intermediate value theorem is a statement about connectedness ([[topology/connectedness]]) and the extreme value theorem a statement about compactness ([[topology/compactness]]).

::: summary
- $f$ is continuous at $a$ when $\lim_{x\to a}f(x) = f(a)$; at the ends of an interval only one-sided limits are used.
- A discontinuity is removable, a jump, infinite or essential, according to the behaviour of the one-sided limits.
- Sums, products, quotients (where the denominator is non-zero) and composites of continuous functions are continuous; $\lim f(g(x)) = f(\lim g(x))$ when $f$ is continuous at the inner limit.
- All elementary functions are continuous on their domains, so their limits at points of the domain are found by substitution.
- Intermediate value theorem: a function continuous on $[a,b]$ takes every value between $f(a)$ and $f(b)$. It guarantees solutions of equations, and bisection approximates them.
- A continuous strictly monotonic function on an interval has a continuous inverse.
- Extreme value theorem: a function continuous on a closed bounded interval attains a maximum and a minimum. Both theorems depend on the completeness of $\R$.
:::

## Exercises

::: exercise Choosing a constant {level=1 check="1"}
Find the value of $k$ for which

$$
f(x) = \begin{cases} kx + 1, & x \le 2,\\ x^2 - k, & x > 2\end{cases}
$$

is continuous on $\R$.
::: solution
Each piece is a polynomial, so $f$ is continuous at every $x\neq2$. At $2$: $f(2) = 2k+1$, the left-hand limit is $2k + 1$ and the right-hand limit is $4 - k$. Continuity requires $2k + 1 = 4 - k$, so $k = 1$.
:::
:::

::: exercise Classifying a discontinuity {level=1}
Let $g(x) = \dfrac{\sin x}{\abs{x}}$ for $x\neq0$. What kind of discontinuity does $g$ have at $0$? Can a value $g(0)$ be chosen to make $g$ continuous?
::: solution
For $x>0$, $g(x) = \frac{\sin x}{x}\to1$ as $x\to0^+$; for $x<0$, $g(x) = -\frac{\sin x}{x}\to-1$ as $x\to0^-$. Both one-sided limits exist and differ, so $g$ has a jump discontinuity at $0$. No value of $g(0)$ can make $g$ continuous, since the two-sided limit does not exist.
:::
:::

::: exercise Substitution through a continuous function {level=1 check="e^3"}
Evaluate $\displaystyle\lim_{x\to0}\exp\Bigl(\frac{\sin 3x}{x}\Bigr)$.
::: solution
The inner function tends to $3$ ([[calculus-1/limits#ex-sin3x]]) and $\exp$ is continuous at $3$, so by [[#thm-composition]] the limit is $e^3$.
:::
:::

::: exercise Three real roots {level=2}
Show that $x^3 - 3x + 1 = 0$ has exactly three real solutions, and find an interval of length $1$ containing each.
::: solution
Let $p(x) = x^3 - 3x + 1$, which is continuous. Its values at the integers from $-2$ to $2$ are

$$
p(-2) = -1,\quad p(-1) = 3,\quad p(0) = 1,\quad p(1) = -1,\quad p(2) = 3.
$$

There are sign changes on $(-2,-1)$, $(0,1)$ and $(1,2)$, so by [[#cor-bolzano]] there is a root in each of these disjoint intervals. A cubic has at most three roots ([[calculus-1/real-functions#cor-roots]]), so there are exactly three. (They are approximately $-1.879$, $0.347$ and $1.532$.)
:::
:::

::: exercise Continuity of the absolute value {#exr-abs level=2}
Prove from the ε–δ definition that $f(x) = \abs{x}$ is continuous at every $a\in\R$.
::: hint
Use the reverse triangle inequality $\bigl\lvert\abs{x} - \abs{a}\bigr\rvert \le \abs{x-a}$.
:::
::: solution
First the inequality: by the triangle inequality $\abs{x} = \abs{(x - a) + a} \le \abs{x-a} + \abs{a}$, so $\abs{x} - \abs{a} \le \abs{x-a}$; exchanging $x$ and $a$ gives $\abs{a}-\abs{x}\le\abs{x-a}$. Together, $\bigl\lvert\abs{x}-\abs{a}\bigr\rvert\le\abs{x-a}$.

Now let $\eps>0$ and take $\delta = \eps$. If $\abs{x-a}<\delta$ then $\bigl\lvert\abs{x}-\abs{a}\bigr\rvert \le \abs{x-a} < \eps$. So $\abs{\cdot}$ is continuous at $a$.
:::
:::

::: exercise How many bisection steps? {level=2 check="20"}
The bisection method is started on $[1, 2]$. How many steps are needed before the bracketing interval has length less than $10^{-6}$?
::: solution
After $n$ steps the interval has length $2^{-n}$. We need $2^{-n} < 10^{-6}$, that is, $2^n > 10^6$. Since $2^{19} = 524\,288 < 10^6 < 1\,048\,576 = 2^{20}$, the smallest such $n$ is $20$.
:::
:::

::: exercise A fixed point theorem {level=2}
Let $f\colon[0,1]\to[0,1]$ be continuous. Prove that $f$ has a **fixed point**: a number $c\in[0,1]$ with $f(c) = c$.
::: hint
Apply the intermediate value theorem to $g(x) = f(x) - x$.
:::
::: solution
Let $g(x) = f(x) - x$, which is continuous on $[0,1]$. Since the values of $f$ lie in $[0,1]$, $g(0) = f(0) \ge 0$ and $g(1) = f(1) - 1 \le 0$. If $g(0) = 0$ or $g(1) = 0$, then $0$ or $1$ is a fixed point. Otherwise $g(0) > 0 > g(1)$, and [[#cor-bolzano]] gives $c\in(0,1)$ with $g(c) = 0$, that is, $f(c) = c$. (Geometrically: the graph of $f$ must cross the diagonal $y = x$ of the unit square.)
:::
:::

::: exercise The half-period chord {level=3}
Let $f$ be continuous on $[0, 1]$ with $f(0) = f(1)$. Prove that there is a number $c\in[0,\frac12]$ with $f(c) = f\bigl(c + \frac12\bigr)$. (If you walk a route that ends at the height where it started, at some moment you are at the same height as you will be half the time later.)
::: solution
Define $g(x) = f\bigl(x + \frac12\bigr) - f(x)$ on $[0,\frac12]$; it is continuous. Then

$$
g(0) + g\bigl(\tfrac12\bigr) = \bigl(f(\tfrac12) - f(0)\bigr) + \bigl(f(1) - f(\tfrac12)\bigr) = f(1) - f(0) = 0.
$$

So $g(\frac12) = -g(0)$. If $g(0) = 0$, take $c = 0$. Otherwise $g(0)$ and $g(\frac12)$ are non-zero with opposite signs, and [[#cor-bolzano]] gives $c\in(0,\frac12)$ with $g(c) = 0$, as required.
:::
:::

::: exercise Continuous one-to-one functions are monotonic {level=3}
Let $f$ be continuous and one-to-one on an interval $I$. Prove that $f$ is strictly monotonic on $I$.
::: hint
Suppose $x_1 < x_2$ with $f(x_1) < f(x_2)$, and $y_1 < y_2$ with $f(y_1) > f(y_2)$. Consider $u(t) = (1-t)x_1 + ty_1$, $v(t) = (1-t)x_2 + ty_2$ and $g(t) = f(v(t)) - f(u(t))$ for $t\in[0,1]$.
:::
::: solution
Since $f$ is one-to-one, for every pair $x<y$ in $I$ we have either $f(x)<f(y)$ or $f(x)>f(y)$. It suffices to show that the same alternative occurs for all pairs. Suppose not: there are $x_1 < x_2$ with $f(x_1) < f(x_2)$ and $y_1 < y_2$ with $f(y_1) > f(y_2)$, all in $I$.

For $t\in[0,1]$ let $u(t) = (1-t)x_1 + ty_1$ and $v(t) = (1-t)x_2 + ty_2$. These points lie in $I$, because an interval contains every point between two of its points, and

$$
v(t) - u(t) = (1-t)(x_2 - x_1) + t(y_2 - y_1) > 0,
$$

so $u(t)<v(t)$. The function $g(t) = f(v(t)) - f(u(t))$ is continuous on $[0,1]$ (composites and differences of continuous functions), with $g(0) = f(x_2) - f(x_1) > 0$ and $g(1) = f(y_2) - f(y_1) < 0$. By [[#cor-bolzano]], $g(t_0) = 0$ for some $t_0$, that is, $f(u(t_0)) = f(v(t_0))$ although $u(t_0) \neq v(t_0)$. This contradicts injectivity. Hence $f$ is strictly increasing or strictly decreasing.
:::
:::

::: exercise Continuous at exactly one point {level=3}
Define $f(x) = x$ if $x$ is rational and $f(x) = 0$ if $x$ is irrational. Prove that $f$ is continuous at $0$ and discontinuous at every $a\neq0$. You may use that every open interval contains both rational and irrational numbers.
::: solution
*At $0$.* For every $x$, $\abs{f(x) - f(0)} = \abs{f(x)} \le \abs{x}$. Given $\eps>0$, take $\delta = \eps$: then $\abs{x}<\delta$ implies $\abs{f(x) - f(0)} < \eps$.

*At $a\neq0$.* Suppose $f$ were continuous at $a$. Taking $\eps = \abs{a}/4 > 0$, there would be $\delta>0$ such that $\abs{f(x) - f(a)} < \abs{a}/4$ whenever $\abs{x-a}<\delta$. Let $\delta' = \min(\delta, \abs{a}/4)$, and choose a rational $q$ and an irrational $x$ in $(a - \delta', a + \delta')$. Then $f(q) = q$ and $f(x) = 0$. On the one hand $\abs{q} \ge \abs{a} - \abs{q - a} > \abs{a} - \abs{a}/4 = \tfrac34\abs{a}$. On the other hand,

$$
\abs{q} = \abs{f(q) - f(x)} \le \abs{f(q) - f(a)} + \abs{f(a) - f(x)} < \frac{\abs{a}}{4} + \frac{\abs a}{4} = \frac{\abs{a}}{2}.
$$

Together these give $\tfrac34\abs{a} < \tfrac12\abs{a}$, which is impossible because $\abs{a} > 0$. Hence $f$ is not continuous at $a$.
:::
:::
