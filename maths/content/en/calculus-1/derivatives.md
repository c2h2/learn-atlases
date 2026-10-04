The chapter on [[calculus-1/limits]] opened with a question: how fast is a falling stone moving at the instant $t = 2$? A stone dropped from rest falls $s(t) = 4.9t^2$ metres in $t$ seconds, so over the time interval from $2$ to $2 + h$ its average speed is

$$
\frac{s(2+h) - s(2)}{h} = \frac{4.9\bigl(4 + 4h + h^2\bigr) - 19.6}{h} = 19.6 + 4.9h \qquad (h\neq0).
$$

As $h \to 0$ this tends to $19.6$, and we call $19.6$ m/s the stone's speed at the instant $t = 2$. The same limit answers a geometric question: the slope of the line through two points of a graph tends to the slope of the **tangent line** as the points merge.

This limit of difference quotients is the **derivative**, the central concept of differential calculus. It measures instantaneous rates of change of every kind: velocity, the growth rate of a population, the marginal cost of production, the slope of a curve. In this chapter we define the derivative, see where it exists and where it fails to, interpret it as the best linear approximation, and prove the rules that make derivatives easy to compute — for sums, products and quotients, and for the trigonometric and exponential functions.

## Tangent lines and rates of change

Let $f$ be a function and $a$ a point of its domain. The **secant line** through $(a, f(a))$ and $(a+h, f(a+h))$ has slope

$$
\frac{f(a+h) - f(a)}{h},
$$

the **difference quotient** of $f$ at $a$. It is also the **average rate of change** of $f$ over the interval between $a$ and $a+h$. If these slopes approach a definite number as $h\to0$, the secant lines rotate towards a limiting line through $(a,f(a))$: the tangent line.

::: widget secant
f: x^2
x0: 1
h: 1.5
caption: The secant through $(1, 1)$ and $(1+h, (1+h)^2)$ has slope $\frac{(1+h)^2 - 1}{h} = 2 + h$. Slide $h$ towards $0$ from either side: the secant turns into the tangent line, and its slope approaches $2$, the derivative of $x^2$ at $1$. At $h = 0$ itself the quotient is $0/0$ — only the limit makes sense.
:::

::: definition The derivative at a point {#def-derivative}
Let $f$ be defined on an open interval containing $a$. We say $f$ is **differentiable at** $a$ if the limit

$$
f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}
$$ {#eq-derivative}

exists (as a real number). The number $f'(a)$ is the **derivative** of $f$ at $a$. The **tangent line** to the graph of $f$ at $(a, f(a))$ is then the line through that point with slope $f'(a)$:

$$
y = f(a) + f'(a)(x - a).
$$ {#eq-tangent}
:::

Writing $x = a + h$ gives the equivalent form $f'(a) = \lim_{x\to a}\dfrac{f(x) - f(a)}{x - a}$, which is sometimes more convenient. Physically, if $f(t)$ is the position of an object at time $t$, then $f'(a)$ is its **velocity** at time $a$; in general $f'(a)$ is the **instantaneous rate of change** of $f$ at $a$, measured in units of $f$ per unit of $x$.

::: example A parabola {#ex-def-square}
Find the derivative of $f(x) = x^2$ at an arbitrary point $a$, and the tangent line at $a = 1$.
::: solution
For $h\neq0$,

$$
\frac{f(a+h) - f(a)}{h} = \frac{a^2 + 2ah + h^2 - a^2}{h} = 2a + h.
$$

As $h \to 0$ this tends to $2a$, so $f'(a) = 2a$. At $a = 1$ the slope is $2$ and the tangent line is $y = 1 + 2(x - 1)$, that is, $y = 2x - 1$.
:::
:::

The cancellation of $h$ is the heart of every such computation. Before it, the quotient has the indeterminate form $0/0$; after it, the limit can be found by substitution.

::: example A reciprocal and a square root {#ex-def-recip-sqrt}
Find from the definition the derivatives of $g(x) = 1/x$ at $a\neq0$ and of $k(x) = \sqrt{x}$ at $a > 0$.
::: solution
For $1/x$, combine the fractions:

$$
\frac{g(a+h) - g(a)}{h} = \frac1h\Bigl(\frac{1}{a+h} - \frac1a\Bigr) = \frac1h\cdot\frac{a - (a+h)}{a(a+h)} = \frac{-1}{a(a+h)} \longrightarrow -\frac{1}{a^2}.
$$

For $\sqrt{x}$, multiply by the conjugate (for small $h$, so that $a + h > 0$):

$$
\frac{\sqrt{a+h} - \sqrt{a}}{h} = \frac{(a+h) - a}{h\bigl(\sqrt{a+h} + \sqrt{a}\bigr)} = \frac{1}{\sqrt{a+h} + \sqrt{a}} \longrightarrow \frac{1}{2\sqrt a},
$$

using the continuity of the square root ([[calculus-1/continuity#ex-sqrt]]). So $g'(a) = -1/a^2$ and $k'(a) = 1/(2\sqrt{a})$. At $a = 0$ the square root has no derivative: the quotient $\sqrt{h}/h = 1/\sqrt{h}$ tends to $\infty$ as $h\to0^+$, and the graph has a vertical tangent there.
:::
:::

::: quiz
Suppose $f'(2) = 3$. Which of the following statements are true? (Select all that apply.)
- [x] The tangent line to the graph at $(2, f(2))$ has slope $3$.
- [ ] $f(2) = 3$.
- [x] $f$ is continuous at $2$.
- [x] $f(2.01)$ is approximately $f(2) + 0.03$.
::: solution
The first statement is the definition. The derivative says nothing about the value $f(2)$ itself. Continuity at $2$ follows from differentiability, as we prove in [[#thm-diff-cont]]. The last statement is the linear approximation $f(a+h)\approx f(a) + f'(a)h$ with $h = 0.01$, discussed below in [[#prop-linear-approx]].
:::
:::

## The derivative as a function

Letting the point vary, we obtain a new function.

::: definition The derivative function {#def-derivative-function}
The **derivative** of $f$ is the function $f'$ whose value at $x$ is $f'(x) = \lim_{h\to0}\frac{f(x+h)-f(x)}{h}$, defined at every $x$ where this limit exists. If $f'(x)$ exists for every $x$ in an open interval $I$, $f$ is **differentiable on** $I$.
:::

Several notations are in use, and you should be fluent in all of them. If $y = f(x)$,

$$
f'(x) = \frac{dy}{dx} = \frac{df}{dx} = \frac{d}{dx}f(x) = Df(x),
$$

and in physics a dot is used for derivatives with respect to time, $\dot{s} = ds/dt$. The **Leibniz notation** $dy/dx$ recalls the quotient $\Delta y/\Delta x$ of small changes from which the derivative arises. It is a single symbol, not a fraction, but it behaves so much like one (as the chain rule will show) that it is extremely convenient. The value at a point is written $f'(a)$ or $\left.\dfrac{dy}{dx}\right|_{x=a}$.

From the examples above: $\dfrac{d}{dx}x^2 = 2x$, $\dfrac{d}{dx}\dfrac1x = -\dfrac1{x^2}$ and $\dfrac{d}{dx}\sqrt{x} = \dfrac1{2\sqrt x}$ for $x > 0$. Two more follow at once: a constant function has derivative $0$ (its difference quotients are all $0$), and $\frac{d}{dx}x = 1$ (its difference quotients are all $1$).

::: widget plot
f: sin(x); cos(x)
x: -2pi, 2pi
y: -1.6, 1.6
piticks: true
tangent: 1
labels: \sin x; \cos x
caption: Drag the point of tangency along the graph of $\sin x$ and compare the slope of the tangent line with the height of the graph of $\cos x$ at the same $x$. They always agree: the derivative of $\sin$ is $\cos$, which we prove in [[#thm-trig-deriv]]. Where $\sin$ has a peak or a trough the tangent is horizontal and $\cos x = 0$.
:::

## Differentiability and continuity

A function must be continuous to be differentiable.

::: theorem Differentiable functions are continuous {#thm-diff-cont}
If $f$ is differentiable at $a$, then $f$ is continuous at $a$.
:::

::: proof
For $h\neq0$ we can write

$$
f(a+h) - f(a) = \frac{f(a+h) - f(a)}{h}\cdot h.
$$

As $h\to0$ the first factor tends to $f'(a)$ and the second to $0$, so by the product law for limits $f(a+h) - f(a) \to f'(a)\cdot 0 = 0$. Hence $\lim_{h\to0}f(a+h) = f(a)$, which is continuity at $a$.
:::

The converse is false: a continuous function need not be differentiable. A graph can fail to have a tangent line at a point in several ways.

::: example A corner {#ex-abs}
Show that $f(x) = \abs{x}$ is continuous but not differentiable at $0$.
::: solution
Continuity at $0$ was proved in [[calculus-1/continuity#exr-abs]]. The difference quotient at $0$ is

$$
\frac{\abs{0+h} - \abs{0}}{h} = \frac{\abs{h}}{h} = \begin{cases} 1, & h>0,\\ -1, & h<0.\end{cases}
$$

Its one-sided limits are $1$ and $-1$, so the two-sided limit does not exist ([[calculus-1/limits#thm-two-sided]]) and $f'(0)$ is undefined. Geometrically the graph has a corner: lines of slope $1$ and $-1$ fit it from the two sides, but no single tangent line does. For $x\neq0$, $\abs{x}$ agrees with $x$ or $-x$ near $x$, so $f'(x) = \sgn x$.
:::
:::

There are three typical ways for a continuous function to be non-differentiable at $a$:

- a **corner**, where the one-sided limits of the difference quotient differ, as for $\abs{x}$ at $0$;
- a **vertical tangent**, where the difference quotients tend to $\pm\infty$, as for $\sqrt[3]{x}$ at $0$, whose quotient is $h^{1/3}/h = h^{-2/3}\to\infty$;
- **oscillation**, where the difference quotients have no limit even in the extended sense, as for $x\sin(1/x)$ (with value $0$ at $0$), whose quotient $\sin(1/h)$ oscillates.

::: quiz
Which of these functions are differentiable at $0$? (Each is given the value $0$ at $0$.) Select all that apply.
- [ ] $\abs{x}$
- [x] $x\abs{x}$
- [ ] $\sqrt[3]{x}$
- [x] $x^2\sin(1/x)$
::: solution
Compute each difference quotient at $0$. For $\abs{x}$ it is $\sgn h$, with no limit. For $x\abs{x}$ it is $h\abs{h}/h = \abs{h}\to0$, so the derivative is $0$. For $\sqrt[3]{x}$ it is $h^{-2/3}\to\infty$: a vertical tangent. For $x^2\sin(1/x)$ it is $h\sin(1/h)$, which tends to $0$ by the squeeze theorem since $\abs{h\sin(1/h)}\le\abs{h}$. Multiplying by an extra factor of $x$ can repair a corner or an oscillation.
:::
:::

::: remark Continuous but nowhere differentiable
A continuous function can fail to be differentiable at a few points, as above — but it can also fail at *every* point. Karl Weierstrass constructed such a function in 1872 as an infinite sum of cosine waves of rapidly increasing frequency and decreasing amplitude; its graph is a fractal with corners at every scale. Such functions are constructed in [[real-analysis/uniform-convergence]]. They show that the intuition "continuous graphs are smooth curves with occasional corners" is wrong.
:::

## Linear approximation

Near a point of differentiability, a function is very well approximated by its tangent line. Write $f(a+h) = f(a) + f'(a)h + E(h)$, so that $E(h)$ is the error made by replacing the graph with the tangent line. The error is not only small, it is small *compared with $h$*.

::: proposition The tangent line is the best linear approximation {#prop-linear-approx}
Let $f$ be defined on an open interval containing $a$. Then $f$ is differentiable at $a$ if and only if there is a number $m$ such that

$$
f(a+h) = f(a) + mh + E(h) \qquad\text{with}\qquad \lim_{h\to0}\frac{E(h)}{h} = 0.
$$ {#eq-linear-approx}

In that case $m = f'(a)$.
:::

::: proof
Given any number $m$, define $E(h) = f(a+h) - f(a) - mh$. Then for $h\neq0$

$$
\frac{E(h)}{h} = \frac{f(a+h) - f(a)}{h} - m.
$$

So $E(h)/h \to 0$ if and only if the difference quotient tends to $m$, that is, if and only if $f$ is differentiable at $a$ with $f'(a) = m$.
:::

The proposition says that among all lines through $(a, f(a))$ the tangent line is the only one whose error is negligible compared with the distance $h$ from $a$. This point of view — the derivative as a linear approximation — is the one that generalises to functions of several variables ([[multivariable/partial-derivatives]]), where "slope" no longer makes sense but "best linear approximation" does.

::: example Approximating a square root {#ex-linear-approx}
Use the tangent line of $\sqrt{x}$ at $4$ to approximate $\sqrt{4.1}$.
::: solution
With $f(x) = \sqrt{x}$ we have $f(4) = 2$ and, by [[#ex-def-recip-sqrt]], $f'(4) = \frac{1}{2\sqrt4} = \frac14$. Taking $h = 0.1$,

$$
\sqrt{4.1} \approx f(4) + f'(4)\cdot0.1 = 2 + 0.025 = 2.025.
$$

The true value is $2.024846\ldots$, so the error is about $1.5\times10^{-4}$ — much smaller than $h = 0.1$, as [[#prop-linear-approx]] predicts. (In [[calculus-2/taylor-series]] we shall see that the error is roughly proportional to $h^2$.)
:::
:::

::: application Marginal cost
If $C(q)$ is the cost of producing $q$ units of a product, economists call $C'(q)$ the **marginal cost**. By linear approximation with $h = 1$, $C(q+1) - C(q)\approx C'(q)$: the marginal cost is approximately the cost of producing one more unit. For example, if $C(q) = 2000 + 3q + 0.01q^2$ pounds, then $C'(q) = 3 + 0.02q$, so at a production level of $500$ units the marginal cost is $C'(500) = 13$ pounds per unit; the exact cost of the 501st unit is $C(501) - C(500) = 13.01$ pounds. Working with the derivative rather than with differences lets economists apply the whole of calculus — in particular the optimisation methods of [[calculus-1/curve-sketching]] — to such models.
:::

::: application Small-angle approximation
Since $\sin'(0) = \cos 0 = 1$, the tangent line of $\sin$ at $0$ is $y = x$, and $\sin\theta\approx\theta$ for small $\theta$ (in radians). Physicists use this to replace the pendulum equation $\ddot\theta = -\frac{g}{\ell}\sin\theta$ by the much simpler $\ddot\theta = -\frac{g}{\ell}\theta$, whose solutions are sine waves with period $2\pi\sqrt{\ell/g}$. For swings of $10^\circ$ ($0.1745$ rad) the error $\theta - \sin\theta$ is only about $0.5\%$ of $\theta$.
:::

## Rules of differentiation

Computing every derivative from the definition would be laborious. Instead we prove a few rules once and for all.

::: theorem Sums and constant multiples {#thm-linearity}
If $f$ and $g$ are differentiable at $x$ and $c$ is a constant, then $f + g$ and $cf$ are differentiable at $x$, with

$$
(f + g)'(x) = f'(x) + g'(x), \qquad (cf)'(x) = c\,f'(x).
$$
:::

::: proof
The difference quotient of $f + g$ is the sum of those of $f$ and $g$:

$$
\frac{(f+g)(x+h) - (f+g)(x)}{h} = \frac{f(x+h) - f(x)}{h} + \frac{g(x+h)-g(x)}{h} \longrightarrow f'(x) + g'(x)
$$

by the sum law for limits. Similarly the difference quotient of $cf$ is $c$ times that of $f$, and tends to $cf'(x)$.
:::

::: theorem Power rule {#thm-power}
For every positive integer $n$, $\dfrac{d}{dx}x^n = nx^{n-1}$.
:::

::: proof
Fix $a$. By the factorisation used in [[calculus-1/real-functions#thm-factor]], for $x\neq a$,

$$
\frac{x^n - a^n}{x - a} = x^{n-1} + x^{n-2}a + \dots + xa^{n-2} + a^{n-1}.
$$

The right-hand side is a sum of $n$ terms, each a polynomial in $x$ that tends to $a^{n-1}$ as $x\to a$. Hence the limit is $na^{n-1}$.
:::

Together, the last two theorems differentiate every polynomial term by term: for example $\frac{d}{dx}\bigl(4x^5 - 3x^2 + 7\bigr) = 20x^4 - 6x$.

::: theorem Product rule {#thm-product}
If $f$ and $g$ are differentiable at $x$, then so is $fg$, and

$$
(fg)'(x) = f'(x)\,g(x) + f(x)\,g'(x).
$$
:::

::: proof
Add and subtract $f(x+h)g(x)$ in the numerator of the difference quotient:

$$
\frac{f(x+h)g(x+h) - f(x)g(x)}{h} = f(x+h)\,\frac{g(x+h) - g(x)}{h} + g(x)\,\frac{f(x+h) - f(x)}{h}.
$$

As $h\to0$, $f(x+h)\to f(x)$ because $f$ is continuous at $x$ ([[#thm-diff-cont]]), and the two difference quotients tend to $g'(x)$ and $f'(x)$. By the limit laws the whole expression tends to $f(x)g'(x) + g(x)f'(x)$.
:::

::: intuition The product rule as a change of area
Think of $f(x)g(x)$ as the area of a rectangle with sides $f$ and $g$. When $x$ increases slightly, the sides grow by $\Delta f$ and $\Delta g$, and the area grows by $g\,\Delta f + f\,\Delta g + \Delta f\,\Delta g$: two thin strips and a tiny corner. Dividing by $\Delta x$ and letting $\Delta x\to0$, the strips give $gf' + fg'$, while the corner contributes $\Delta f\cdot\frac{\Delta g}{\Delta x}\to 0\cdot g'$. This is essentially how Leibniz first found the rule.
:::

::: theorem Quotient rule {#thm-quotient}
If $f$ and $g$ are differentiable at $x$ and $g(x)\neq0$, then $f/g$ is differentiable at $x$, and

$$
\Bigl(\frac{f}{g}\Bigr)'(x) = \frac{f'(x)\,g(x) - f(x)\,g'(x)}{g(x)^2}.
$$
:::

::: proof
First consider $1/g$. Since $g$ is continuous at $x$ and $g(x)\neq0$, we have $g(x+h)\neq0$ for all sufficiently small $h$ (by the sign-preservation argument of [[calculus-1/limits]]), so the quotient below is defined, and

$$
\frac{1}{h}\Bigl(\frac{1}{g(x+h)} - \frac{1}{g(x)}\Bigr) = -\frac{g(x+h) - g(x)}{h}\cdot\frac{1}{g(x+h)\,g(x)} \longrightarrow -\frac{g'(x)}{g(x)^2},
$$

using $g(x+h)\to g(x)$ once more. Now $f/g = f\cdot(1/g)$, and the product rule gives

$$
\Bigl(\frac fg\Bigr)' = f'\cdot\frac1g + f\cdot\Bigl(-\frac{g'}{g^2}\Bigr) = \frac{f'g - fg'}{g^2}.
$$
:::

With $f = 1$ and $g(x) = x^n$, the quotient rule gives $\frac{d}{dx}x^{-n} = \frac{-nx^{n-1}}{x^{2n}} = -nx^{-n-1}$. So the power rule $\frac{d}{dx}x^k = kx^{k-1}$ holds for every integer $k$ (with $x\neq0$ when $k<0$). In [[calculus-1/chain-rule]] we extend it to all real exponents.

::: example Using the rules {#ex-rules}
Differentiate (a) $p(x) = (x^2 + 1)(x^3 - 2x)$ and (b) $q(x) = \dfrac{x^2-1}{x^2+1}$.
::: solution
(a) By the product rule,

$$
p'(x) = 2x\,(x^3 - 2x) + (x^2 + 1)(3x^2 - 2) = 2x^4 - 4x^2 + 3x^4 + x^2 - 2 = 5x^4 - 3x^2 - 2.
$$

As a check, expanding first gives $p(x) = x^5 - x^3 - 2x$, whose derivative is the same.

(b) By the quotient rule,

$$
q'(x) = \frac{2x(x^2+1) - (x^2-1)\,2x}{(x^2+1)^2} = \frac{4x}{(x^2+1)^2}.
$$
:::
:::

::: warning The derivative of a product is not the product of the derivatives
It is tempting to write $(fg)' = f'g'$ and $(f/g)' = f'/g'$. Both are wrong: for $f(x) = g(x) = x$, $(fg)' = (x^2)' = 2x$, whereas $f'g' = 1$. In the quotient rule, keep the order of the numerator straight — "derivative of the top times the bottom, *minus* the top times the derivative of the bottom" — since swapping the terms changes the sign.
:::

::: example Horizontal and parallel tangents {#ex-horizontal}
Find the points on the curve $y = x^3 - 3x^2 - 9x + 5$ where the tangent line is horizontal, and the points where it is parallel to the line $y = 15x$.
::: solution
The slope of the tangent at $x$ is

$$
y' = 3x^2 - 6x - 9 = 3(x - 3)(x + 1).
$$

It is zero at $x = 3$ and $x = -1$, so the tangent is horizontal at the points $(3, -22)$ and $(-1, 10)$. These are the "turning points" of the graph, which we shall learn to classify in [[calculus-1/curve-sketching]].

The tangent is parallel to $y = 15x$ when its slope is $15$:

$$
3x^2 - 6x - 9 = 15 \iff x^2 - 2x - 8 = 0 \iff (x-4)(x+2) = 0.
$$

At $x = 4$ the point is $(4, -15)$ and the tangent line is $y = -15 + 15(x - 4) = 15x - 75$; at $x = -2$ the point is $(-2, 3)$ and the tangent line is $y = 3 + 15(x+2) = 15x + 33$.
:::
:::

## Derivatives of trigonometric and exponential functions

The derivatives of sine and cosine rest on the two trigonometric limits proved in [[calculus-1/limits]]: $\frac{\sin h}{h}\to1$ ([[calculus-1/limits#thm-sinx]]) and $\frac{1-\cos h}{h}\to0$ ([[calculus-1/limits#cor-cos]]).

::: theorem Derivatives of sine and cosine {#thm-trig-deriv}
For all real $x$ (in radians), $\dfrac{d}{dx}\sin x = \cos x$ and $\dfrac{d}{dx}\cos x = -\sin x$.
:::

::: proof
By the addition formula ([[calculus-1/real-functions#thm-addition]]),

$$
\frac{\sin(x+h) - \sin x}{h} = \frac{\sin x\cos h + \cos x\sin h - \sin x}{h} = \cos x\,\frac{\sin h}{h} - \sin x\,\frac{1 - \cos h}{h}.
$$

As $h\to0$ this tends to $\cos x\cdot1 - \sin x\cdot0 = \cos x$. Similarly,

$$
\frac{\cos(x+h) - \cos x}{h} = \frac{\cos x\cos h - \sin x\sin h - \cos x}{h} = -\cos x\,\frac{1-\cos h}{h} - \sin x\,\frac{\sin h}{h} \longrightarrow -\sin x.
$$
:::

The quotient rule now gives the rest. For instance,

$$
\frac{d}{dx}\tan x = \frac{\cos x\cdot\cos x - \sin x\cdot(-\sin x)}{\cos^2 x} = \frac{1}{\cos^2x} = \sec^2 x,
$$

and in the same way $\frac{d}{dx}\sec x = \sec x\tan x$ and $\frac{d}{dx}\cot x = -\csc^2 x$ ([[#exr-trig-derivs]]), and $\frac{d}{dx}\csc x = -\csc x\cot x$.

::: quiz
Let $f(x) = x\sin x$. What is $f'(\pi)$?
- [ ] $0$
- [x] $-\pi$
- [ ] $\pi$
- [ ] $-1$
::: solution
By the product rule, $f'(x) = \sin x + x\cos x$, so $f'(\pi) = \sin\pi + \pi\cos\pi = 0 - \pi = -\pi$. The wrong answers come from typical slips: the false rule $(fg)' = f'g'$ gives $1\cdot\cos\pi = -1$, and keeping only the term $\sin x$ gives $0$.
:::
:::

### The exponential function and the number e

For an exponential $f(x) = a^x$ with $a>0$, the laws of exponents give

$$
\frac{a^{x+h} - a^x}{h} = a^x\cdot\frac{a^h - 1}{h}.
$$

So $a^x$ is differentiable everywhere as soon as it is differentiable at $0$, and then $\frac{d}{dx}a^x = a^x\cdot L(a)$, where $L(a) = \lim_{h\to0}\frac{a^h-1}{h}$ is the slope of the graph of $a^x$ at $x = 0$. **The derivative of an exponential is proportional to the exponential itself.** Numerically, with $h = 10^{-6}$:

| $a$ | $2$ | $2.5$ | $2.7$ | $2.72$ | $2.8$ | $3$ |
|---|---|---|---|---|---|---|
| $\frac{a^h - 1}{h}$ | $0.6931$ | $0.9163$ | $0.9933$ | $1.0006$ | $1.0296$ | $1.0986$ |

The slope at $0$ increases with $a$ and passes through $1$ between $2.7$ and $2.72$.

::: definition The number e {#def-e}
The number $e$ is the base for which the exponential function has slope exactly $1$ at $x = 0$:

$$
\lim_{h\to0}\frac{e^h - 1}{h} = 1.
$$ {#eq-e}

Numerically $e = 2.718281828\ldots$
:::

That the limit $L(a)$ exists for every $a>0$, and that exactly one base has $L(a) = 1$, requires a careful construction of $a^x$. We take it on trust for now. One rigorous route defines the natural logarithm as an integral and is outlined in [[calculus-1/integrals]]; another uses power series ([[calculus-2/power-series]]).

::: theorem The derivative of the exponential function {#thm-exp-deriv}
$\dfrac{d}{dx}e^x = e^x$ for all $x$.
:::

::: proof
By the computation above with $a = e$, the difference quotient is $e^x\cdot\frac{e^h-1}{h}$, which tends to $e^x\cdot 1 = e^x$ by [[#eq-e]].
:::

So $e^x$ is a function equal to its own derivative — a property that makes it the basic solution of the differential equation $y' = y$ and explains its ubiquity in models of growth and decay ([[ode/first-order]]). For other bases we will show in [[calculus-1/chain-rule]] that $L(a) = \ln a$, so that $\frac{d}{dx}a^x = a^x\ln a$; the table above confirms $L(2) = 0.6931\ldots = \ln 2$.

::: widget plot
f: a^x; 1 + x
sliders: a=2:1.5:3.5:0.01
x: -2, 2
y: -1, 5
tangent: 0
labels: a^x; y = 1 + x
caption: Adjust $a$ until the graph of $a^x$ just touches the line $y = 1 + x$ at $(0, 1)$, so that the tangent at $0$ coincides with the line. This happens only when the slope at $0$ equals $1$, that is, when $a = e \approx 2.718$. For $a = e$ the graph lies above its tangent line everywhere, which gives the useful inequality $e^x \ge 1 + x$.
:::

## Higher derivatives

The derivative $f'$ is itself a function, and may have a derivative of its own.

::: definition Higher derivatives {#def-higher}
The **second derivative** of $f$ is $f'' = (f')'$, the **third derivative** is $f''' = (f'')'$, and in general the $n$th derivative $f^{(n)}$ is the derivative of $f^{(n-1)}$ (with $f^{(0)} = f$). In Leibniz notation, $f''(x) = \dfrac{d^2y}{dx^2}$ and $f^{(n)}(x) = \dfrac{d^ny}{dx^n}$.
:::

If $s(t)$ is the position of a moving object, $v(t) = s'(t)$ is its velocity and $a(t) = v'(t) = s''(t)$ its **acceleration**. Some families of higher derivatives have clean patterns: the derivatives of $\sin$ cycle through $\cos, -\sin, -\cos, \sin$ with period $4$, the $n$th derivative of $x^n$ is the constant $n!$, and every derivative of $e^x$ is $e^x$.

::: example Motion along a line {#ex-motion}
A particle moves along a line with position $s(t) = t^3 - 6t^2 + 9t$ (metres) at time $t\in[0,4]$ (seconds). When is it at rest, when does it move backwards, and how far does it travel in total?
::: solution
The velocity and acceleration are

$$
v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3), \qquad a(t) = v'(t) = 6t - 12.
$$

The particle is at rest when $v(t) = 0$, at $t = 1$ and $t = 3$. The sign of $v$ is positive on $[0,1)$, negative on $(1,3)$ and positive on $(3,4]$, so it moves forwards, then backwards between $t = 1$ and $t = 3$, then forwards again. Its positions at the turning points and ends are

$$
s(0) = 0, \qquad s(1) = 4, \qquad s(3) = 0, \qquad s(4) = 4,
$$

so it travels $4 + 4 + 4 = 12$ metres in total, although its net displacement is only $s(4) - s(0) = 4$ metres. The acceleration vanishes at $t = 2$, where the backward velocity is greatest in size: $v(2) = -3$ m/s.
:::
:::

::: history
Pierre de Fermat found tangents and maxima in the 1630s by a method he called *adequality*, comparing $f(x)$ with $f(x + e)$, dividing by $e$ and then setting $e = 0$ — the difference quotient in all but name. Isaac Newton, in 1665–66, treated quantities as flowing in time; he later called their rates of change *fluxions* and, from the 1690s, wrote them with a dot, as in $\dot x$. Gottfried Wilhelm Leibniz published the first account of the differential calculus in 1684, in a short paper titled *Nova methodus pro maximis et minimis*; it already contained the rules for sums, products, quotients and powers, in the notation $dx$, $dy$ that we still use. The notation $f'(x)$ and the name "derivative" come from Joseph-Louis Lagrange's *Théorie des fonctions analytiques* (1797). Augustin-Louis Cauchy finally defined the derivative as the limit of the difference quotient in 1823, giving the subject the foundation used in this chapter.
:::

## Where this leads

The rules in this chapter handle sums, products and quotients; the next chapter, [[calculus-1/chain-rule]], handles composites and inverse functions, which completes the toolkit for differentiating every elementary function. The deeper question of what the derivative tells us about a function — for instance, that a positive derivative means an increasing function — needs the mean value theorem ([[calculus-1/mean-value-theorem]]), and it is put to work in [[calculus-1/curve-sketching]]. Derivatives of functions of several variables are the subject of [[multivariable/partial-derivatives]]; differential equations, which relate a function to its own derivatives, start in [[ode/first-order]]; and complex differentiability turns out to be dramatically stronger than its real counterpart ([[complex-analysis/analytic-functions]]).

::: summary
- The derivative $f'(a) = \lim_{h\to0}\frac{f(a+h) - f(a)}{h}$ is the slope of the tangent line and the instantaneous rate of change of $f$ at $a$.
- Differentiability implies continuity, but not conversely: corners ($\abs{x}$), vertical tangents ($\sqrt[3]{x}$) and oscillation ($x\sin(1/x)$) all prevent a derivative.
- Equivalently, $f(a+h) = f(a) + f'(a)h + E(h)$ with $E(h)/h\to0$: the tangent line is the best linear approximation.
- Rules: $(f+g)' = f'+g'$, $(cf)' = cf'$, $(fg)' = f'g + fg'$, $(f/g)' = (f'g - fg')/g^2$, and $(x^n)' = nx^{n-1}$ for every integer $n$.
- $(\sin x)' = \cos x$ and $(\cos x)' = -\sin x$ (in radians); $(\tan x)' = \sec^2x$.
- $e$ is the base whose exponential has slope $1$ at $0$, and $(e^x)' = e^x$.
- Higher derivatives describe acceleration and other second-order behaviour.
:::

## Exercises

::: exercise A polynomial {level=1 check="15"}
Let $f(x) = 3x^4 - 2x^2 + 7x - 5$. Compute $f'(1)$.
::: solution
By the power rule and linearity, $f'(x) = 12x^3 - 4x + 7$, so $f'(1) = 12 - 4 + 7 = 15$.
:::
:::

::: exercise From the definition {level=1}
Use the definition of the derivative to find $f'(x)$ for $f(x) = \dfrac{1}{2x+1}$.
::: solution
For $x\neq-\frac12$ and small $h \neq 0$,

$$
\frac{f(x+h) - f(x)}{h} = \frac1h\cdot\frac{(2x+1) - (2x+2h+1)}{(2x+2h+1)(2x+1)} = \frac{-2}{(2x+2h+1)(2x+1)}.
$$

As $h\to0$ this tends to $f'(x) = \dfrac{-2}{(2x+1)^2}$.
:::
:::

::: exercise A tangent line {level=1 check="22"}
Find the tangent line to $y = \dfrac{x^2+1}{x-2}$ at the point where $x = 3$, and give its $y$-intercept.
::: solution
At $x = 3$, $y = 10/1 = 10$. By the quotient rule,

$$
y' = \frac{2x(x-2) - (x^2+1)}{(x-2)^2} = \frac{x^2 - 4x - 1}{(x-2)^2},
$$

so the slope at $3$ is $\frac{9 - 12 - 1}{1} = -4$. The tangent line is $y = 10 - 4(x - 3) = -4x + 22$, with $y$-intercept $22$.
:::
:::

::: exercise Derivatives of even functions {level=2}
Let $f$ be an even function that is differentiable on $\R$. Prove that $f'$ is odd.
::: solution
Fix $x$. Using $f(-y) = f(y)$ for every $y$,

$$
f'(-x) = \lim_{h\to0}\frac{f(-x+h) - f(-x)}{h} = \lim_{h\to0}\frac{f(x - h) - f(x)}{h} = -\lim_{h\to0}\frac{f(x-h) - f(x)}{-h}.
$$

Substituting $k = -h$ (which tends to $0$ exactly when $h$ does), the last limit is $\lim_{k\to0}\frac{f(x+k)-f(x)}{k} = f'(x)$. Hence $f'(-x) = -f'(x)$. For example, $\cos$ is even and its derivative $-\sin$ is odd.
:::
:::

::: exercise Joining two pieces smoothly {level=2}
Find constants $a$ and $b$ such that

$$
f(x) = \begin{cases} x^2, & x\le1,\\ ax + b, & x > 1\end{cases}
$$

is differentiable at $1$.
::: solution
A differentiable function must be continuous ([[#thm-diff-cont]]), so first $f(1) = 1$ must equal the right-hand limit $a + b$: we need $a + b = 1$. Then the one-sided difference quotients at $1$ are

$$
\frac{(1+h)^2 - 1}{h} = 2 + h \to 2 \quad (h\to0^-), \qquad \frac{a(1+h) + b - 1}{h} = \frac{ah}{h} = a \quad (h > 0).
$$

They have the same limit exactly when $a = 2$. So $a = 2$ and $b = -1$: the line $y = 2x - 1$ is the tangent to $y = x^2$ at $x = 1$ (compare [[#ex-def-square]]).
:::
:::

::: exercise A ball thrown upwards {level=2 check="100/49"}
A ball thrown upwards has height $s(t) = 20t - 4.9t^2$ metres after $t$ seconds. At what time is its velocity zero?
::: solution
The velocity is $v(t) = s'(t) = 20 - 9.8t$, which vanishes at $t = \frac{20}{9.8} = \frac{100}{49}\approx 2.04$ seconds. At that moment the ball is at the top of its flight, at height $s(100/49) = \frac{1000}{49}\approx 20.4$ m. Its acceleration is $s''(t) = -9.8$ m/s² throughout: gravity.
:::
:::

::: exercise More trigonometric derivatives {#exr-trig-derivs level=2}
Use the quotient and product rules to show that $\dfrac{d}{dx}\sec x = \sec x\tan x$ and $\dfrac{d}{dx}\cot x = -\csc^2 x$, and that $\dfrac{d}{dx}(\sin x\cos x) = \cos 2x$.
::: solution
With $\sec x = 1/\cos x$, the quotient rule gives $\dfrac{0\cdot\cos x - 1\cdot(-\sin x)}{\cos^2 x} = \dfrac{\sin x}{\cos^2 x} = \dfrac{1}{\cos x}\cdot\dfrac{\sin x}{\cos x} = \sec x\tan x$.

With $\cot x = \cos x/\sin x$, it gives $\dfrac{-\sin x\cdot\sin x - \cos x\cdot\cos x}{\sin^2 x} = -\dfrac{1}{\sin^2 x} = -\csc^2 x$.

By the product rule, $\frac{d}{dx}(\sin x\cos x) = \cos x\cos x + \sin x(-\sin x) = \cos^2 x - \sin^2 x = \cos 2x$, by the double-angle formula ([[calculus-1/real-functions#eq-double-angle]]). This is consistent with $\sin x\cos x = \frac12\sin 2x$.
:::
:::

::: exercise All derivatives of 1/x {level=3}
Prove by induction that for $f(x) = 1/x$ and every $n\ge1$,

$$
f^{(n)}(x) = \frac{(-1)^n\, n!}{x^{n+1}} \qquad (x\neq0).
$$
::: solution
For $n = 1$, $f'(x) = -x^{-2} = \frac{(-1)^1 1!}{x^2}$ ([[#ex-def-recip-sqrt]]). Suppose the formula holds for some $n\ge1$. By the power rule for negative integer exponents,

$$
f^{(n+1)}(x) = \frac{d}{dx}\Bigl((-1)^n n!\,x^{-n-1}\Bigr) = (-1)^n n!\,(-n-1)\,x^{-n-2} = \frac{(-1)^{n+1}(n+1)!}{x^{n+2}},
$$

which is the formula for $n + 1$. By induction it holds for all $n\ge1$.
:::
:::

::: exercise Differentiable once but not twice {level=3}
Let $f(x) = x\abs{x}$. Show that $f$ is differentiable on $\R$ with $f'(x) = 2\abs{x}$, and that $f'$ is not differentiable at $0$.
::: solution
For $x > 0$, $f(x) = x^2$ on a neighbourhood of $x$, so $f'(x) = 2x = 2\abs{x}$. For $x<0$, $f(x) = -x^2$ near $x$, so $f'(x) = -2x = 2\abs{x}$. At $0$ the difference quotient is $\frac{h\abs{h}}{h} = \abs{h}\to 0$, so $f'(0) = 0 = 2\abs{0}$. Hence $f'(x) = 2\abs{x}$ for all $x$, and by [[#ex-abs]] this is not differentiable at $0$. So $f$ has a first derivative everywhere but no second derivative at $0$.
:::
:::

::: exercise Leibniz's formula {level=3}
Suppose $f$ and $g$ have derivatives of all orders up to $n$. Prove that

$$
(fg)^{(n)} = \sum_{k=0}^{n}\binom{n}{k}f^{(k)}g^{(n-k)}.
$$
::: hint
Induction on $n$, using the product rule and Pascal's rule $\binom{n}{k-1} + \binom{n}{k} = \binom{n+1}{k}$.
:::
::: solution
For $n = 1$ the formula is the product rule. Suppose it holds for $n$ (and that $f, g$ have $n+1$ derivatives). Differentiating each term with the product rule,

$$
(fg)^{(n+1)} = \sum_{k=0}^n\binom nk\Bigl(f^{(k+1)}g^{(n-k)} + f^{(k)}g^{(n+1-k)}\Bigr).
$$

In the first part substitute $j = k+1$, so that it becomes $\sum_{j=1}^{n+1}\binom{n}{j-1}f^{(j)}g^{(n+1-j)}$; the second part is $\sum_{j=0}^{n}\binom nj f^{(j)}g^{(n+1-j)}$. Collecting the coefficient of $f^{(j)}g^{(n+1-j)}$: for $1\le j\le n$ it is $\binom{n}{j-1} + \binom nj = \binom{n+1}{j}$; for $j = 0$ it is $1 = \binom{n+1}{0}$; for $j = n+1$ it is $1 = \binom{n+1}{n+1}$. Hence $(fg)^{(n+1)} = \sum_{j=0}^{n+1}\binom{n+1}{j}f^{(j)}g^{(n+1-j)}$, which completes the induction. (The formula mirrors the binomial theorem for $(a+b)^n$.)
:::
:::
