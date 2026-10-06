If you drive 100 km in exactly one hour, then at some instant during the journey your speedometer must have read exactly 100 km/h. You cannot have driven slower than 100 km/h the whole time (you would not have arrived), nor faster the whole time; and since your speed changed continuously, at some moment it was exactly the average. This is the **mean value theorem**, and despite its innocent appearance it is the most important theoretical result of differential calculus.

The derivative is a *local* quantity: $f'(a)$ depends only on the values of $f$ arbitrarily close to $a$. Most questions we want to answer are *global*: is $f$ increasing on an interval? How large can $f(b) - f(a)$ be? Is a function with zero derivative constant? The mean value theorem is the bridge from local information to global conclusions. In this chapter we prove it, starting from Fermat's observation about maxima and Rolle's theorem, derive its main consequences, and use a generalisation of it to prove L'Hôpital's rule for indeterminate limits.

## Local extrema and Fermat's theorem

::: definition Local and global extrema {#def-local-extremum}
Let $f$ be defined on a set $D$ and let $c\in D$. Then $f$ has a **global** (or **absolute**) **maximum** on $D$ at $c$ if $f(x)\le f(c)$ for all $x\in D$, and a **local maximum** at $c$ if $f(x)\le f(c)$ for all $x\in D$ in some open interval containing $c$. Global and local **minima** are defined with $f(x)\ge f(c)$. A maximum or minimum is called an **extremum**.
:::

Every global extremum is a local one, but not conversely: the function $x^3 - 3x$ has a local maximum at $x = -1$, yet takes larger values for $x > 2$. At the top of a smooth hill the tangent line is horizontal, and this is the key observation.

::: theorem Fermat's theorem on extrema {#thm-fermat}
Suppose $f$ has a local extremum at $c$, that $f$ is defined on an open interval containing $c$, and that $f$ is differentiable at $c$. Then $f'(c) = 0$.
:::

::: proof
Suppose $f$ has a local maximum at $c$ (for a minimum apply the argument to $-f$). Then there is $\delta > 0$ such that $f(c+h) \le f(c)$ whenever $\abs{h} < \delta$. For $0 < h < \delta$ the difference quotient satisfies

$$
\frac{f(c+h) - f(c)}{h} \le 0,
$$

because the numerator is $\le 0$ and the denominator is positive. Limits preserve weak inequalities ([[calculus-1/limits#thm-order]]; the same proof works for one-sided limits), so the right-hand limit of the quotient, which equals $f'(c)$, is $\le 0$. For $-\delta < h < 0$ the numerator is still $\le 0$ but the denominator is negative, so the quotient is $\ge 0$, and the left-hand limit gives $f'(c)\ge0$. Hence $f'(c) = 0$.
:::

::: warning f′(c) = 0 does not mean an extremum, and extrema need not have f′(c) = 0
The converse of Fermat's theorem is false: $f(x) = x^3$ has $f'(0) = 0$ but no extremum at $0$ — it is increasing through $0$. And the theorem needs its hypotheses: $\abs{x}$ has a minimum at $0$ where it is not differentiable, and on $[0,1]$ the function $f(x) = x$ has a maximum at the endpoint $1$, where $f'(1) = 1$. Fermat's theorem says that interior extrema of differentiable functions are among the zeros of $f'$, nothing more.
:::

## Rolle's theorem and the mean value theorem

Combining Fermat's theorem with the extreme value theorem gives our first global result.

::: theorem Rolle's theorem {#thm-rolle}
Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$, with $f(a) = f(b)$. Then there is a $c\in(a,b)$ with $f'(c) = 0$.
:::

::: proof
By the extreme value theorem ([[calculus-1/continuity#thm-evt]]), $f$ attains a maximum value $M$ and a minimum value $m$ on $[a,b]$. If both are attained only at the endpoints, then $M = m = f(a)$, because $f(a) = f(b)$; so $f$ is constant and $f'(c) = 0$ for every $c\in(a,b)$. Otherwise one of them is attained at some interior point $c\in(a,b)$. There $f$ has a local extremum and is differentiable, so $f'(c) = 0$ by [[#thm-fermat]].
:::

The mean value theorem is Rolle's theorem viewed from a tilted angle.

::: theorem Mean value theorem {#thm-mvt}
Let $f$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then there is a $c\in(a,b)$ with

$$
f'(c) = \frac{f(b) - f(a)}{b - a}, \qquad\text{equivalently}\qquad f(b) - f(a) = f'(c)(b-a).
$$ {#eq-mvt}
:::

::: proof
Let $s(x) = f(a) + \dfrac{f(b) - f(a)}{b-a}(x - a)$ be the secant line through $(a, f(a))$ and $(b, f(b))$, and let $g(x) = f(x) - s(x)$ be the vertical distance from the secant to the graph. Then $g$ is continuous on $[a,b]$ and differentiable on $(a,b)$, with $g(a) = 0 = g(b)$. By [[#thm-rolle]] there is $c\in(a,b)$ with $0 = g'(c) = f'(c) - \dfrac{f(b) - f(a)}{b-a}$.
:::

Geometrically: somewhere between $a$ and $b$ the tangent line is parallel to the secant line. Physically: at some instant the instantaneous velocity equals the average velocity. The theorem says nothing about *where* $c$ is, and there may be several such points; its power lies in the fact that some $c$ exists.

::: widget plot
f: x^3 - 3x + 1; x + 1
x: -2.5, 2.5
y: -4, 5
points: -2, -1; 2, 3
tangent: 0
labels: f(x) = x^3 - 3x + 1; \text{secant}
caption: The fixed line through the two small dots $(-2,-1)$ and $(2,3)$ is the secant, of slope $1$; the other line is the tangent at the large dot. Drag the dot until the tangent line is parallel to the secant. There are two such points, $c = \pm 2/\sqrt3 \approx \pm1.155$, where $f'(c) = 3c^2 - 3 = 1$. The mean value theorem promises at least one; it does not say where.
:::

::: example Finding the mean value point {#ex-mvt-point}
Verify the mean value theorem for $f(x) = \sqrt{x}$ on $[0, 4]$.
::: solution
$f$ is continuous on $[0,4]$ and differentiable on $(0,4)$ with $f'(x) = \frac{1}{2\sqrt x}$. (It is *not* differentiable at $0$, but the theorem only asks for differentiability on the open interval.) The secant slope is $\frac{\sqrt4 - \sqrt0}{4 - 0} = \frac12$. Solving $\frac{1}{2\sqrt c} = \frac12$ gives $\sqrt{c} = 1$, so $c = 1\in(0,4)$.
:::
:::

::: warning The hypotheses cannot be dropped
On $[-1,1]$ the function $\abs{x}$ has equal values at the ends, but its derivative is $\pm1$ wherever it exists: Rolle's theorem fails because $\abs{x}$ is not differentiable at $0$. The function equal to $x$ on $[0,1)$ with $f(1) = 0$ is differentiable on $(0,1)$ with $f(0) = f(1)$, and again $f'(c) = 1\neq0$ everywhere: this time continuity at the endpoint fails.
:::

::: quiz
A car is at kilometre $0$ at noon and at kilometre $150$ at 2 pm. Assuming its position is a differentiable function of time, which statements **must** be true? (Select all that apply.)
- [x] At some instant between noon and 2 pm its speed was exactly $75$ km/h.
- [ ] At some instant its speed was exactly $100$ km/h.
- [x] Its average velocity was $75$ km/h.
- [ ] Its speed was $75$ km/h at 1 pm.
::: solution
The average velocity (displacement divided by time) is $150/2 = 75$ km/h, and by the mean value theorem the instantaneous velocity equals it at some instant, when the speed is therefore $75$ km/h too. (The average *speed* could be larger, if the car overshot kilometre $150$ and came back.) Nothing forces the speed ever to reach $100$ km/h (the car may have driven at a steady $75$), and nothing says *when* the speed was $75$.
:::
:::

## Consequences of the mean value theorem

The first consequence answers a question that sounds obvious but needs proof: if a function's derivative is zero everywhere, is the function constant?

::: corollary Zero derivative means constant {#cor-zero-derivative}
Let $f$ be continuous on an interval $I$ with $f'(x) = 0$ at every interior point $x$ of $I$. Then $f$ is constant on $I$.
:::

::: proof
Let $x_1 < x_2$ be points of $I$. The hypotheses of [[#thm-mvt]] hold on $[x_1, x_2]$, so $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$ for some $c\in(x_1,x_2)$. This $c$ is an interior point of $I$, so $f'(c) = 0$ and $f(x_2) = f(x_1)$. Since $x_1, x_2$ were arbitrary, $f$ is constant.
:::

::: corollary Functions with the same derivative {#cor-same-derivative}
If $f$ and $g$ are continuous on an interval $I$ and $f'(x) = g'(x)$ at every interior point of $I$, then $f - g$ is constant on $I$: there is a constant $C$ with $f(x) = g(x) + C$ for all $x \in I$.
:::

::: proof
Apply [[#cor-zero-derivative]] to $f - g$, whose derivative is $f' - g' = 0$.
:::

This is the foundation of integration: once one antiderivative of a function is known, all others on an interval differ from it by a constant ([[calculus-1/integrals]]). The word *interval* matters. The function equal to $0$ for $x<0$ and $1$ for $x>0$ has zero derivative on its domain $\R\setminus\set{0}$ but is not constant.

::: theorem Monotonicity test {#thm-monotonicity}
Let $f$ be continuous on an interval $I$ and differentiable at every interior point of $I$.

1. If $f'(x) > 0$ at every interior point, then $f$ is strictly increasing on $I$.
2. If $f'(x) \ge 0$ at every interior point, then $f$ is increasing on $I$.
3. If $f'(x) < 0$ (respectively $\le 0$) at every interior point, then $f$ is strictly decreasing (respectively decreasing) on $I$.
:::

::: proof
Let $x_1 < x_2$ in $I$. By the mean value theorem, $f(x_2) - f(x_1) = f'(c)(x_2 - x_1)$ for some interior point $c$. Since $x_2 - x_1 > 0$, the difference $f(x_2) - f(x_1)$ has the same sign as $f'(c)$: positive in case 1, non-negative in case 2, and negative or non-positive in case 3.
:::

A partial converse is easy: if $f$ is increasing and differentiable, all its difference quotients are $\ge 0$, so $f'\ge0$. But a strictly increasing function can have $f'(c) = 0$ at isolated points, as $x^3$ does at $0$.

::: quiz
Suppose $f$ is differentiable on $\R\setminus\set{0}$ with $f'(x) < 0$ for every $x\neq0$. Which statements must be true? (Select all that apply.)
- [x] $f$ is strictly decreasing on $(0,\infty)$.
- [x] $f$ is strictly decreasing on $(-\infty, 0)$.
- [ ] $f(-1) > f(1)$.
- [ ] $f$ is strictly decreasing on $\R\setminus\set{0}$.
::: solution
[[#thm-monotonicity]] applies on each of the intervals $(0,\infty)$ and $(-\infty,0)$ separately. It says nothing about comparing a point of one with a point of the other: $f(x) = 1/x$ has $f'(x) = -1/x^2<0$, yet $f(-1) = -1 < 1 = f(1)$. Since $\R\setminus\set{0}$ is not an interval, the theorem does not apply to it.
:::
:::

::: example Proving inequalities {#ex-inequalities}
Prove that $e^x \ge 1 + x$ for all real $x$, with equality only at $x = 0$, and deduce that $\ln(1 + x) \le x$ for all $x > -1$.
::: solution
Let $g(x) = e^x - 1 - x$, so $g'(x) = e^x - 1$. This is negative for $x<0$ and positive for $x > 0$. By [[#thm-monotonicity]], $g$ is strictly decreasing on $(-\infty, 0]$ and strictly increasing on $[0,\infty)$. Hence $g(x) > g(0) = 0$ for every $x\neq0$, that is, $e^x > 1 + x$ for $x\neq0$.

For $x > -1$, both $1 + x$ and $e^x$ are positive, and $\ln$ is increasing, so applying $\ln$ to $1 + x\le e^x$ gives $\ln(1+x)\le x$.
:::
:::

::: widget plot
f: exp(x); 1 + x; ln(1 + x); x
x: -2, 3
y: -3, 4
labels: e^x; 1 + x; \ln(1+x); x
caption: The line $y = 1 + x$ is the tangent to $e^x$ at $0$, and the graph of $e^x$ lies above it everywhere. Reflecting both in $y = x$ and shifting gives the companion inequality: $\ln(1+x)$ lies below its tangent line $y = x$. Hover to compare the values: near $0$ both gaps are about $x^2/2$, and they widen further away.
:::

::: example Exactly one root {#ex-one-root}
Prove that $x^5 + 2x - 1 = 0$ has exactly one real solution.
::: solution
Let $p(x) = x^5 + 2x - 1$. *Existence:* $p(0) = -1 < 0$ and $p(1) = 2>0$, so by the intermediate value theorem ([[calculus-1/continuity#cor-bolzano]]) there is a root in $(0,1)$. *Uniqueness:* $p'(x) = 5x^4 + 2 > 0$ for all $x$, so $p$ is strictly increasing on $\R$ by [[#thm-monotonicity]], hence one-to-one, and takes the value $0$ at most once.

(Alternatively: if $p$ had two roots $r_1<r_2$, Rolle's theorem would give $c \in(r_1,r_2)$ with $p'(c) = 0$, which is impossible.) Note that we have proved there is exactly one root (it is $0.48638\ldots$) without being able to write it down — and for this polynomial no formula in radicals exists at all, a consequence of Galois theory ([[abstract-algebra/fields-galois]]).
:::
:::

The mean value theorem also gives quantitative estimates. If $\abs{f'(x)}\le M$ on an interval, then for any two points of the interval

$$
\abs{f(x) - f(y)} \le M\abs{x - y}.
$$ {#eq-lipschitz}

For example, $\abs{\sin x - \sin y} = \abs{\cos c}\,\abs{x - y}\le\abs{x-y}$ — the inequality behind the continuity of sine in [[calculus-1/continuity#prop-trig-continuous]].

::: example Estimating a square root {#ex-sqrt-estimate}
Use the mean value theorem to show that $10.0497 < \sqrt{101} < 10.05$.
::: solution
Apply [[#thm-mvt]] to $f(x) = \sqrt{x}$ on $[100, 101]$: for some $c\in(100,101)$,

$$
\sqrt{101} - 10 = \frac{1}{2\sqrt{c}}\,(101 - 100) = \frac{1}{2\sqrt{c}}.
$$

Since $\sqrt{c} > 10$, this is less than $\frac{1}{20}$, so $\sqrt{101} < 10.05$. Feeding this back in, $\sqrt{c} < \sqrt{101} < 10.05$, so $\frac{1}{2\sqrt c} > \frac{1}{20.1} > 0.04975$, and $\sqrt{101} > 10.0497$. (The true value is $10.04987\ldots$)
:::
:::

::: example Exponential growth is the only solution {#ex-exp-unique}
Let $k$ be a constant and suppose $f$ is differentiable on $\R$ with $f'(x) = kf(x)$ for all $x$. Prove that $f(x) = f(0)e^{kx}$.
::: solution
Consider $g(x) = f(x)e^{-kx}$. By the product and chain rules,

$$
g'(x) = f'(x)e^{-kx} - kf(x)e^{-kx} = \bigl(f'(x) - kf(x)\bigr)e^{-kx} = 0.
$$

By [[#cor-zero-derivative]], $g$ is constant, equal to $g(0) = f(0)$. Hence $f(x) = f(0)e^{kx}$. This is why every quantity that grows or decays at a rate proportional to its size — a bacterial culture, a radioactive sample, money at continuously compounded interest — follows an exponential law.
:::
:::

## Cauchy's mean value theorem and L'Hôpital's rule

A generalisation of the mean value theorem involving two functions leads to a powerful method for indeterminate limits.

::: theorem Cauchy's mean value theorem {#thm-cauchy-mvt}
Let $f$ and $g$ be continuous on $[a,b]$ and differentiable on $(a,b)$. Then there is a $c\in(a,b)$ with

$$
\bigl(f(b) - f(a)\bigr)\,g'(c) = \bigl(g(b) - g(a)\bigr)\,f'(c).
$$
:::

::: proof
Let $h(x) = \bigl(f(b) - f(a)\bigr)g(x) - \bigl(g(b) - g(a)\bigr)f(x)$. Then $h$ is continuous on $[a,b]$ and differentiable on $(a,b)$, and a direct computation gives $h(a) = f(b)g(a) - g(b)f(a) = h(b)$. By Rolle's theorem $h'(c) = 0$ for some $c\in(a,b)$, which is the claimed identity.
:::

With $g(x) = x$ this is the ordinary mean value theorem. If $g'$ does not vanish, the identity can be written $\dfrac{f(b) - f(a)}{g(b) - g(a)} = \dfrac{f'(c)}{g'(c)}$; geometrically, the curve traced by the point $(g(t), f(t))$ has a tangent parallel to the chord between its ends.

::: theorem L'Hôpital's rule {#thm-lhopital}
Let $f$ and $g$ be differentiable on an open interval $I$ containing $a$, except possibly at $a$ itself, with $g'(x)\neq0$ for $x\in I$, $x \neq a$. Suppose that

- either $\lim_{x\to a}f(x) = 0$ and $\lim_{x\to a}g(x) = 0$ (the form $\frac00$),
- or $\lim_{x\to a}g(x) = \infty$ or $-\infty$ (which includes the form $\frac\infty\infty$).

If $\displaystyle\lim_{x\to a}\frac{f'(x)}{g'(x)} = L$, where $L$ is a real number, $\infty$ or $-\infty$, then $\displaystyle\lim_{x\to a}\frac{f(x)}{g(x)} = L$. The same holds for one-sided limits and for limits as $x\to\infty$ or $x\to-\infty$.
:::

::: proof
We prove the $\frac00$ case for $x\to a^+$ with $L$ real; the left-hand limit is similar, and together they give the two-sided limit. Redefine $f(a) = g(a) = 0$; this does not affect any limit as $x\to a$ and makes $f$ and $g$ continuous on $[a, x]$ for every $x > a$ in $I$.

First, $g(x)\neq0$ for $x>a$ in $I$: otherwise Rolle's theorem on $[a, x]$ would give a zero of $g'$ in $(a,x)$. Now fix such an $x$. By [[#thm-cauchy-mvt]] on $[a, x]$ there is $c_x\in(a,x)$ with $f(x)g'(c_x) = g(x)f'(c_x)$, that is,

$$
\frac{f(x)}{g(x)} = \frac{f'(c_x)}{g'(c_x)}.
$$

Let $\eps > 0$, and choose $\delta>0$ such that $\abs{f'(t)/g'(t) - L} < \eps$ whenever $a < t < a + \delta$. If $a < x < a + \delta$, then $c_x$ also lies in $(a, a + \delta)$, so $\abs{f(x)/g(x) - L} < \eps$. Hence $f(x)/g(x)\to L$ as $x\to a^+$. (If $L = \pm\infty$, replace "within $\eps$ of $L$" by "beyond $\pm M$".)

For $x\to\infty$, put $F(t) = f(1/t)$ and $G(t) = g(1/t)$ for small $t>0$. By the chain rule $\dfrac{F'(t)}{G'(t)} = \dfrac{-t^{-2}f'(1/t)}{-t^{-2}g'(1/t)} = \dfrac{f'(1/t)}{g'(1/t)}\to L$ as $t\to0^+$, so the case already proved gives $F(t)/G(t)\to L$, which is the claim. The case $g\to\pm\infty$ needs a more delicate argument with the same ingredients; see [[real-analysis/differentiation]].
:::

When $f'/g'$ is again of the form $\frac00$, the rule can be applied repeatedly. Logically the argument runs backwards: the final limit, once found, justifies each earlier step.

::: example Applying the rule repeatedly {#ex-lhopital}
Find (a) $\displaystyle\lim_{x\to0}\frac{\sin x - x}{x^3}$ and (b) $\displaystyle\lim_{x\to\infty}\frac{x^2}{e^x}$.
::: solution
(a) Numerator and denominator tend to $0$. Differentiating each,

$$
\lim_{x\to0}\frac{\sin x - x}{x^3} \overset{?}{=} \lim_{x\to0}\frac{\cos x - 1}{3x^2} \overset{?}{=} \lim_{x\to0}\frac{-\sin x}{6x} = -\frac16 .
$$

The middle limit is again of the form $\frac00$; the last one exists by [[calculus-1/limits#thm-sinx]]. Reading from right to left, L'Hôpital's rule justifies each "$\overset{?}{=}$" (the derivatives $6x$ and $3x^2$ are non-zero for $x\neq0$). So the limit is $-\frac16$, which says that $\sin x\approx x - x^3/6$ for small $x$ — the start of the Taylor series of sine ([[calculus-2/taylor-series]]).

(b) This is of the form $\frac\infty\infty$. Twice,

$$
\lim_{x\to\infty}\frac{x^2}{e^x} = \lim_{x\to\infty}\frac{2x}{e^x} = \lim_{x\to\infty}\frac{2}{e^x} = 0.
$$

By induction, $x^n/e^x\to0$ for every $n$: the exponential eventually beats every power. Similarly $\dfrac{\ln x}{x^p} \to 0$ for every $p > 0$, since $\dfrac{1/x}{px^{p-1}} = \dfrac{1}{px^p}\to0$: every power beats the logarithm.
:::
:::

::: widget plot
f: (exp(x) - 1 - x)/x^2; (exp(x) - 1)/(2x); exp(x)/2
x: -2, 2
y: 0, 1.6
hlines: 0.5
labels: \frac{e^x - 1 - x}{x^2}; \frac{e^x - 1}{2x}; \frac{e^x}{2}
caption: With $f(x) = e^x - 1 - x$ and $g(x) = x^2$, the three curves are $f/g$, $f'/g'$ and $f''/g''$. The first two are undefined at $0$, yet all three approach the same value $\frac12$ there — the content of L'Hôpital's rule. Away from $0$ the three functions are quite different: the rule says nothing about values, only about the limit.
:::

### Other indeterminate forms

Products, differences and powers can often be rewritten as quotients.

- **$0\cdot\infty$:** write $fg = \dfrac{f}{1/g}$ or $\dfrac{g}{1/f}$.
- **$\infty - \infty$:** combine into a single fraction, or factor.
- **$0^0$, $1^\infty$, $\infty^0$:** take logarithms. If $y = f(x)^{g(x)}$ then $\ln y = g(x)\ln f(x)$ is of the form $0\cdot\infty$; if $\ln y\to\ell$, then $y = e^{\ln y}\to e^\ell$ by continuity of the exponential.

::: example Products and powers {#ex-indeterminate}
Find (a) $\displaystyle\lim_{x\to0^+}x\ln x$, (b) $\displaystyle\lim_{x\to0^+}x^x$ and (c) $\displaystyle\lim_{x\to\infty}\Bigl(1 + \frac1x\Bigr)^x$.
::: solution
(a) The form is $0\cdot(-\infty)$. Rewrite as a quotient of the form $\frac{-\infty}{\infty}$:

$$
\lim_{x\to0^+}x\ln x = \lim_{x\to0^+}\frac{\ln x}{1/x} = \lim_{x\to0^+}\frac{1/x}{-1/x^2} = \lim_{x\to0^+}(-x) = 0.
$$

(b) The form is $0^0$. Since $x^x = e^{x\ln x}$ and $x\ln x\to0$ by (a), continuity of $\exp$ gives $x^x\to e^0 = 1$.

(c) The form is $1^\infty$. The logarithm is $x\ln\bigl(1 + \frac1x\bigr) = \dfrac{\ln(1 + 1/x)}{1/x}$, of the form $\frac00$ as $x\to\infty$. By L'Hôpital's rule,

$$
\lim_{x\to\infty}\frac{\ln(1 + 1/x)}{1/x} = \lim_{x\to\infty}\frac{\frac{1}{1 + 1/x}\cdot\bigl(-\frac{1}{x^2}\bigr)}{-\frac{1}{x^2}} = \lim_{x\to\infty}\frac{1}{1 + 1/x} = 1,
$$

so $\bigl(1 + \frac1x\bigr)^x\to e^1 = e$. This is the limit of compound interest: one pound at $100\%$ annual interest, compounded $x$ times a year, grows to $\bigl(1 + \frac1x\bigr)^x$ pounds, approaching $e\approx2.718$ pounds as compounding becomes continuous.
:::
:::

::: warning Check the form before applying L'Hôpital's rule
The rule applies only to indeterminate forms. For $\lim_{x\to0}\frac{\cos x}{x + 1}$, substitution gives $\frac11 = 1$; "applying L'Hôpital" anyway would give $\lim\frac{-\sin x}{1} = 0$, which is wrong. Two further traps: differentiate the numerator and denominator *separately* (not with the quotient rule), and remember that the rule only works in one direction — if $\lim f'/g'$ does not exist, nothing follows. For example, $\frac{x + \sin x}{x}\to1$ as $x\to\infty$, although $\frac{1 + \cos x}{1}$ has no limit.
:::

::: quiz
What is $\displaystyle\lim_{x\to0}\frac{1-\cos x}{x^2}$?
- [ ] $0$
- [x] $\tfrac12$
- [ ] $1$
- [ ] It does not exist
::: solution
Both parts tend to $0$. One application of the rule gives $\lim\frac{\sin x}{2x}$, again $\frac00$; a second gives $\lim\frac{\cos x}{2} = \frac12$. (This agrees with the conjugate method in [[calculus-1/limits]].) The answer $0$ comes from stopping after one step and wrongly "substituting" into $\frac{\sin x}{2x}$.
:::
:::

::: history
The mean value theorem grew out of algebra. In 1691 Michel Rolle — later a vocal critic of the new calculus — proved that between two roots of a polynomial there lies a root of what we would call its derivative, using purely algebraic methods. Joseph-Louis Lagrange stated the general mean value theorem in his *Théorie des fonctions analytiques* (1797), and Augustin-Louis Cauchy proved it in 1823, assuming the derivative to be continuous, and also found the generalised form with two functions; the short proof via Rolle's theorem given here is usually attributed to Ossian Bonnet and appeared in Joseph Serret's textbook of 1868. L'Hôpital's rule has a more colourful history. Guillaume de l'Hôpital, a French marquis, paid the young Johann Bernoulli for lessons and for the right to use his discoveries. Bernoulli communicated the rule to him in a letter of 1694, and it appeared in l'Hôpital's *Analyse des infiniment petits* (1696), the first textbook of differential calculus, under l'Hôpital's name.
:::

## Where this leads

The mean value theorem is used, often silently, in almost every argument that follows. In [[calculus-1/curve-sketching]] the monotonicity test becomes the main tool for analysing graphs and finding maxima. In [[calculus-1/integrals]] the mean value theorem is the key step in the proof of the fundamental theorem of calculus, and [[#cor-same-derivative]] explains why antiderivatives are unique up to a constant. Taylor's theorem ([[calculus-2/taylor-series]]) is a higher-order mean value theorem that controls the error of polynomial approximations, and in [[numerical-analysis/root-finding]] it explains why Newton's method converges so fast. Not every generalisation survives: as $t$ runs over $[0, 2\pi]$ the point $(\cos t, \sin t)$ goes once round the unit circle, so its average velocity is zero, yet its velocity $(-\sin t, \cos t)$ never vanishes. For curves in the plane ([[multivariable/vector-functions]]), and for complex-valued functions such as $e^{it}$, only an inequality remains.

::: summary
- Fermat: at an interior local extremum of a differentiable function, $f'(c) = 0$. The converse is false ($x^3$ at $0$).
- Rolle: if $f$ is continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a) = f(b)$, then $f'(c) = 0$ for some $c\in(a,b)$.
- Mean value theorem: under the same hypotheses without $f(a) = f(b)$, $f(b) - f(a) = f'(c)(b-a)$ for some $c\in(a,b)$.
- On an interval: $f' = 0$ implies $f$ is constant; $f' = g'$ implies $f - g$ is constant; $f'>0$ implies $f$ is strictly increasing. On sets that are not intervals these fail.
- The theorem turns derivative bounds into inequalities and estimates, such as $e^x\ge1+x$ and $\abs{f(x)-f(y)}\le M\abs{x-y}$.
- L'Hôpital's rule: for $\frac00$ or $\frac{\cdot}{\pm\infty}$ forms, $\lim\frac fg = \lim\frac{f'}{g'}$ when the right-hand limit exists. Other forms are first rewritten as quotients, using logarithms for powers.
:::

## Exercises

::: exercise The mean value point for a parabola {level=1 check="2"}
Find the number $c$ guaranteed by the mean value theorem for $f(x) = x^2$ on $[1, 3]$.
::: solution
The secant slope is $\frac{9 - 1}{3 - 1} = 4$, and $f'(c) = 2c = 4$ gives $c = 2$. (For a parabola, $c$ is always the midpoint of the interval.)
:::
:::

::: exercise An indeterminate quotient {level=1 check="9/2"}
Evaluate $\displaystyle\lim_{x\to0}\frac{1-\cos 3x}{x^2}$.
::: solution
The form is $\frac00$. By L'Hôpital's rule twice,

$$
\lim_{x\to0}\frac{1-\cos3x}{x^2} = \lim_{x\to0}\frac{3\sin3x}{2x} = \lim_{x\to0}\frac{9\cos 3x}{2} = \frac92.
$$
:::
:::

::: exercise Recovering a function from its derivative {level=1 check="8"}
Suppose $f$ is differentiable on $\R$ with $f'(x) = 2x$ for all $x$ and $f(1) = 5$. Find $f(2)$.
::: solution
The function $x^2$ has the same derivative as $f$, so by [[#cor-same-derivative]], $f(x) = x^2 + C$ for some constant $C$. From $f(1) = 1 + C = 5$ we get $C = 4$, so $f(x) = x^2 + 4$ and $f(2) = 8$.
:::
:::

::: exercise Exactly one solution {level=2}
Prove that the equation $2x - 1 = \sin x$ has exactly one real solution.
::: solution
Let $g(x) = 2x - 1 - \sin x$. Then $g(0) = -1 < 0$ and $g(\pi) = 2\pi - 1 > 0$, so by the intermediate value theorem $g$ has a root in $(0,\pi)$. Moreover $g'(x) = 2 - \cos x\ge1 > 0$ for all $x$, so $g$ is strictly increasing on $\R$ ([[#thm-monotonicity]]) and has at most one root. Hence there is exactly one solution (it is $x\approx0.8879$).
:::
:::

::: exercise A power with a limit of e³ {level=2 check="e^3"}
Evaluate $\displaystyle\lim_{x\to\infty}\Bigl(1 + \frac{3}{x}\Bigr)^x$.
::: solution
The logarithm is $x\ln(1 + 3/x) = \dfrac{\ln(1 + 3/x)}{1/x}$, of the form $\frac00$. By L'Hôpital's rule,

$$
\lim_{x\to\infty}\frac{\frac{1}{1+3/x}\cdot\bigl(-\frac{3}{x^2}\bigr)}{-\frac{1}{x^2}} = \lim_{x\to\infty}\frac{3}{1 + 3/x} = 3,
$$

so the limit is $e^3$.
:::
:::

::: exercise Two useful inequalities {level=2}
Prove that $\sin x < x$ for all $x > 0$, and that $\abs{\arctan a - \arctan b}\le\abs{a - b}$ for all real $a, b$.
::: solution
Let $g(x) = x - \sin x$. Then $g'(x) = 1 - \cos x\ge0$, with equality only at the isolated points $x = 2k\pi$. On each interval $[2k\pi, 2(k+1)\pi]$ we have $g'>0$ in the interior, so $g$ is strictly increasing there by [[#thm-monotonicity]]; hence $g$ is strictly increasing on $[0,\infty)$, and $g(x) > g(0) = 0$ for $x>0$.

For the second inequality, $\frac{d}{dx}\arctan x = \frac{1}{1+x^2}$, whose absolute value is at most $1$. By the mean value theorem, $\arctan a - \arctan b = \frac{1}{1+c^2}(a - b)$ for some $c$ between $a$ and $b$, and so $\abs{\arctan a - \arctan b} \le\abs{a-b}$. (If $a = b$ there is nothing to prove.)
:::
:::

::: exercise A limit of the form 0⁰ {level=2 check="1"}
Evaluate $\displaystyle\lim_{x\to0^+}x^{\sin x}$.
::: hint
Write $\sin x\ln x = \dfrac{\sin x}{x}\cdot x\ln x$.
:::
::: solution
We have $x^{\sin x} = e^{\sin x\ln x}$ and

$$
\sin x\ln x = \frac{\sin x}{x}\cdot x\ln x \longrightarrow 1\cdot 0 = 0 \qquad (x\to0^+),
$$

by [[calculus-1/limits#thm-sinx]] and [[#ex-indeterminate]]. By continuity of the exponential, $x^{\sin x}\to e^0 = 1$.
:::
:::

::: exercise Bernoulli's inequality {level=3}
Let $r\ge1$. Prove that $(1+x)^r\ge1 + rx$ for every $x > -1$.
::: solution
Let $g(x) = (1+x)^r - 1 - rx$ on $(-1,\infty)$. By [[calculus-1/chain-rule#thm-real-power]] and the chain rule,

$$
g'(x) = r(1+x)^{r-1} - r = r\bigl((1+x)^{r-1} - 1\bigr).
$$

Since $r - 1\ge0$, the function $t\mapsto t^{r-1}$ is increasing on $(0,\infty)$ and equals $1$ at $t = 1$. So for $x \ge 0$ we have $(1+x)^{r-1}\ge1$ and $g'(x)\ge0$, while for $-1<x\le0$ we have $(1+x)^{r-1}\le1$ and $g'(x)\le0$. By [[#thm-monotonicity]], $g$ is increasing on $[0,\infty)$ and decreasing on $(-1, 0]$. Hence $g(x)\ge g(0) = 0$ for all $x > -1$, which is the inequality.
:::
:::

::: exercise Rolle's theorem twice {level=3}
Let $f$ be twice differentiable on $\R$ with $f(0) = f(1) = f(2) = 0$. Prove that $f''(c) = 0$ for some $c\in(0,2)$.
::: solution
By Rolle's theorem on $[0,1]$ and on $[1,2]$ there are $c_1\in(0,1)$ and $c_2\in(1,2)$ with $f'(c_1) = 0 = f'(c_2)$. The function $f'$ is differentiable on $\R$ (as $f$ is twice differentiable), hence continuous, so Rolle's theorem applies to $f'$ on $[c_1, c_2]$: there is $c\in(c_1, c_2)\subseteq(0,2)$ with $f''(c) = 0$. More generally, if an $n$ times differentiable function $f$ has $n+1$ zeros, then $f^{(n)}$ has a zero between the smallest and largest of them.
:::
:::

::: exercise A positive derivative is not enough {level=3}
Let $f(x) = x + 2x^2\sin(1/x)$ for $x\neq0$ and $f(0) = 0$. Show that $f'(0) = 1$, but that $f$ is not increasing on any open interval containing $0$.
::: solution
At $0$: $\dfrac{f(h) - f(0)}{h} = 1 + 2h\sin\dfrac1h\to1$, because $\abs{2h\sin(1/h)}\le2\abs h$. So $f'(0) = 1$.

For $x\neq0$, $f'(x) = 1 + 4x\sin\dfrac1x - 2\cos\dfrac1x$. At the points $x_n = \dfrac{1}{2n\pi}$ we have $\sin(1/x_n) = 0$ and $\cos(1/x_n) = 1$, so $f'(x_n) = -1$. Since $f'$ is continuous on $\R\setminus\set{0}$, it stays negative on some open interval $J_n$ around $x_n$ (sign preservation), and by [[#thm-monotonicity]] $f$ is strictly decreasing on $J_n$. Every open interval containing $0$ contains $x_n$ for all large $n$, and hence a small interval $J_n$ (shrunk if necessary) on which $f$ decreases. So $f$ is not increasing on any open interval containing $0$, even though $f'(0) > 0$. The monotonicity test needs the sign of $f'$ on a whole interval, not at a single point.
:::
:::
