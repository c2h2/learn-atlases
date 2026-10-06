Most functions met in practice are composites: $\sin(x^2)$, $e^{-x^2/2}$, $\sqrt{1 + x^4}$, $\ln(\cos x)$. The rules of [[calculus-1/derivatives]] handle sums, products and quotients, but not composition, and expanding $(3x^2 + 1)^{50}$ just to differentiate it is not a serious option. The **chain rule** fills this gap, and with it we can differentiate every elementary function.

The idea is a statement about rates. Suppose $y$ depends on $u$ and $u$ depends on $x$. If $y$ changes three times as fast as $u$, and $u$ changes twice as fast as $x$, then $y$ changes $3 \times 2 = 6$ times as fast as $x$. Rates of change multiply along a chain of dependence:

$$
\frac{dy}{dx} = \frac{dy}{du}\cdot\frac{du}{dx}.
$$

In this chapter we prove this carefully (the obvious proof has a gap), and then use it to differentiate inverse functions, curves given by equations rather than formulas, and quantities linked by a relation as they change in time.

## The chain rule

::: theorem Chain rule {#thm-chain}
If $g$ is differentiable at $a$ and $f$ is differentiable at $g(a)$, then $f\circ g$ is differentiable at $a$, and

$$
(f\circ g)'(a) = f'\bigl(g(a)\bigr)\,g'(a).
$$ {#eq-chain}

In Leibniz notation, with $y = f(u)$ and $u = g(x)$: $\dfrac{dy}{dx} = \dfrac{dy}{du}\,\dfrac{du}{dx}$.
:::

In words: differentiate the outer function, evaluate it at the inner function, and multiply by the derivative of the inner function. Before proving the theorem, let us see why the most natural argument does not quite work.

::: warning The tempting proof has a gap
One would like to write

$$
\frac{f(g(a+h)) - f(g(a))}{h} = \frac{f(g(a+h)) - f(g(a))}{g(a+h) - g(a)}\cdot\frac{g(a+h) - g(a)}{h}
$$

and let $h\to0$: the second factor tends to $g'(a)$, and the first looks like a difference quotient of $f$ at $g(a)$. But the first factor is meaningless whenever $g(a+h) = g(a)$, and this can happen for $h$ arbitrarily close to $0$ — for a constant $g$, or for $g(x) = x^2\sin(1/x)$ (with $g(0) = 0$) at $a = 0$. The argument needs repair, not just polish.
:::

The repair uses a reformulation of differentiability, due to Constantin Carathéodory, that avoids division altogether.

::: lemma Differentiability without division {#lem-caratheodory}
Let $f$ be defined on an open interval $I$ containing $a$. Then $f$ is differentiable at $a$ if and only if there is a function $\varphi$ on $I$, continuous at $a$, such that

$$
f(x) - f(a) = \varphi(x)\,(x - a) \qquad\text{for all } x\in I.
$$

In that case $\varphi(a) = f'(a)$.
:::

::: proof
If $f$ is differentiable at $a$, define $\varphi(x) = \dfrac{f(x) - f(a)}{x - a}$ for $x\neq a$ and $\varphi(a) = f'(a)$. The identity holds (at $x = a$ both sides are $0$), and $\lim_{x\to a}\varphi(x) = f'(a) = \varphi(a)$, so $\varphi$ is continuous at $a$.

Conversely, if such a $\varphi$ exists, then for $x \neq a$ the difference quotient $\dfrac{f(x)-f(a)}{x-a}$ equals $\varphi(x)$, which tends to $\varphi(a)$ as $x\to a$ by continuity. So $f$ is differentiable at $a$ with $f'(a) = \varphi(a)$.
:::

::: proof Proof of the chain rule
Let $b = g(a)$. By [[#lem-caratheodory]] there are functions $\psi$, continuous at $a$ with $\psi(a) = g'(a)$, and $\varphi$, continuous at $b$ with $\varphi(b) = f'(b)$, such that

$$
g(x) - g(a) = \psi(x)(x - a), \qquad f(y) - f(b) = \varphi(y)(y - b)
$$

for $x$ near $a$ and $y$ near $b$. Since $g$ is continuous at $a$ ([[calculus-1/derivatives#thm-diff-cont]]), $g(x)$ is near $b$ when $x$ is near $a$, and we may substitute $y = g(x)$:

$$
f(g(x)) - f(g(a)) = \varphi(g(x))\bigl(g(x) - g(a)\bigr) = \varphi(g(x))\,\psi(x)\,(x - a).
$$

The function $x\mapsto\varphi(g(x))\psi(x)$ is continuous at $a$: $\varphi\circ g$ is continuous at $a$ by [[calculus-1/continuity#thm-composition]], and products of continuous functions are continuous. Its value at $a$ is $\varphi(b)\psi(a) = f'(g(a))\,g'(a)$. By the lemma again, $f\circ g$ is differentiable at $a$ with exactly this derivative. No division by $g(x) - g(a)$ was needed.
:::

::: intuition Composing linear approximations
By [[calculus-1/derivatives#prop-linear-approx]], near $a$ the inner function behaves like $g(a+h)\approx g(a) + g'(a)h$: it stretches small changes by the factor $g'(a)$. Near $b = g(a)$ the outer function stretches small changes $k$ by the factor $f'(b)$: $f(b + k)\approx f(b) + f'(b)k$. Feeding the first change into the second, with $k = g'(a)h$,

$$
f(g(a+h)) \approx f(b) + f'(b)\,g'(a)\,h .
$$

Stretching by $g'(a)$ and then by $f'(b)$ is stretching by the product. The chain rule says that *the linear approximation of a composite is the composite of the linear approximations* — the form in which it survives in several variables, where the stretch factors become matrices.
:::

Combined with the derivatives already known, the chain rule gives a family of general rules: whenever $u = g(x)$ is differentiable,

$$
\frac{d}{dx}u^n = nu^{n-1}\frac{du}{dx}, \qquad \frac{d}{dx}e^u = e^u\frac{du}{dx}, \qquad \frac{d}{dx}\sin u = \cos u\,\frac{du}{dx}, \qquad \frac{d}{dx}\cos u = -\sin u\,\frac{du}{dx}.
$$ {#eq-chain-family}

::: example Using the chain rule {#ex-chain}
Differentiate (a) $(3x^2+1)^5$, (b) $\sin(x^2)$, (c) $e^{-x^2/2}$ and (d) $\sin^3(4x)$.
::: solution
(a) Outer function $u^5$, inner function $u = 3x^2 + 1$ with $u' = 6x$:

$$
\frac{d}{dx}(3x^2+1)^5 = 5(3x^2+1)^4\cdot 6x = 30x\,(3x^2+1)^4.
$$

(b) Outer $\sin u$, inner $u = x^2$: $\dfrac{d}{dx}\sin(x^2) = \cos(x^2)\cdot 2x$. Compare $\dfrac{d}{dx}\sin^2 x = 2\sin x\cos x$, where the roles are reversed.

(c) Outer $e^u$, inner $u = -x^2/2$ with $u' = -x$: $\dfrac{d}{dx}e^{-x^2/2} = -x\,e^{-x^2/2}$. This is the shape of the normal distribution in statistics; its slope vanishes only at $x = 0$.

(d) Here there are three layers: $\sin^3(4x) = (\sin v)^3$ with $v = 4x$. Working from the outside in,

$$
\frac{d}{dx}\sin^3(4x) = 3\sin^2(4x)\cdot\frac{d}{dx}\sin(4x) = 3\sin^2(4x)\cdot\cos(4x)\cdot 4 = 12\sin^2(4x)\cos(4x).
$$
:::
:::

For a chain of three or more functions the rule is simply applied repeatedly: each layer contributes one factor, the derivative of that layer evaluated at everything inside it.

::: widget plot
f: sin(k*x); k*cos(k*x)
sliders: k=1:0.25:3:0.05
x: -2pi, 2pi
y: -3.5, 3.5
tangent: 0.5
piticks: true
labels: \sin(kx); k\cos(kx)
caption: Increase $k$ to speed up the input: the graph of $\sin(kx)$ is compressed horizontally by the factor $k$, so all its slopes are multiplied by $k$. Drag the point of tangency and check that the slope always equals the height of the graph of $k\cos(kx)$ — the chain rule with inner function $kx$, whose derivative is $k$.
:::

::: quiz
What is $\dfrac{d}{dx}\cos(x^3)$?
- [x] $-3x^2\sin(x^3)$
- [ ] $-\sin(3x^2)$
- [ ] $-\sin(x^3)$
- [ ] $3x^2\sin(x^3)$
::: solution
The outer function is $\cos u$ with derivative $-\sin u$, evaluated at $u = x^3$; the inner derivative is $3x^2$. So the answer is $-\sin(x^3)\cdot3x^2$. Forgetting the inner factor gives $-\sin(x^3)$; differentiating inside the cosine instead of multiplying gives $-\sin(3x^2)$; and the last option has the wrong sign.
:::
:::

::: application Kinetic energy and power
A body of mass $m$ moving with velocity $v(t)$ has kinetic energy $E = \frac12mv^2$. Energy depends on time only through the velocity, so by the chain rule

$$
\frac{dE}{dt} = \frac{dE}{dv}\,\frac{dv}{dt} = mv\,\frac{dv}{dt} = (ma)\,v = Fv,
$$

using Newton's law $F = ma$. The rate at which a force does work — its **power** — is force times velocity. This is why a car needs far more power to accelerate at high speed than at low speed.
:::

## Derivatives of inverse functions

If $f$ is one-to-one, the graph of $f^{-1}$ is the reflection of the graph of $f$ in the line $y = x$ ([[calculus-1/real-functions#prop-inverse-graph]]). Reflection swaps the roles of rise and run, so a tangent line of slope $m$ becomes a tangent line of slope $1/m$. This suggests the following theorem.

::: theorem Derivative of an inverse function {#thm-inverse-deriv}
Let $f$ be continuous and strictly monotonic on an open interval $I$, and differentiable at $a\in I$ with $f'(a)\neq0$. Then $f^{-1}$ is differentiable at $b = f(a)$, and

$$
(f^{-1})'(b) = \frac{1}{f'(a)} = \frac{1}{f'\bigl(f^{-1}(b)\bigr)}.
$$ {#eq-inverse-deriv}
:::

::: proof
Let $g = f^{-1}$, defined on the interval $f(I)$. Since $f$ is strictly monotonic and $I$ contains points on both sides of $a$, the interval $f(I)$ contains points on both sides of $b$, so $g$ is defined on an open interval around $b$. By [[calculus-1/continuity#cor-inverse-continuous]], $g$ is continuous at $b$.

For $x \in I$ with $x \neq a$ let $Q(x) = \dfrac{f(x) - f(a)}{x - a}$. Then $Q(x)\to f'(a)$ as $x\to a$, and $Q(x)\neq0$ because $f$ is one-to-one. For $y\neq b$ in the domain of $g$, put $x = g(y)$; then $x\neq a$ and $y = f(x)$, so

$$
\frac{g(y) - g(b)}{y - b} = \frac{x - a}{f(x) - f(a)} = \frac{1}{Q(g(y))}.
$$

As $y\to b$ we have $g(y)\to a$ with $g(y) \neq a$, so by part 2 of [[calculus-1/continuity#thm-composition]], $Q(g(y))\to f'(a)$. Since $f'(a)\neq0$, the quotient law gives $\dfrac{1}{Q(g(y))}\to\dfrac{1}{f'(a)}$.
:::

In Leibniz notation, if $y = f(x)$ and $x = f^{-1}(y)$, the theorem reads $\dfrac{dx}{dy} = 1\Big/\dfrac{dy}{dx}$ — once more the notation behaves like a fraction. The hypothesis $f'(a)\neq0$ is essential: $f(x) = x^3$ has $f'(0) = 0$, and its inverse $\sqrt[3]{y}$ has a vertical tangent at $0$, with no derivative there.

Once we know that $f^{-1}$ is differentiable, the formula is easy to rederive whenever you need it: differentiate the identity $f(f^{-1}(y)) = y$ with the chain rule to get $f'(f^{-1}(y))\,(f^{-1})'(y) = 1$.

### Logarithms and inverse trigonometric functions

::: example The natural logarithm {#ex-ln}
Show that $\dfrac{d}{dx}\ln x = \dfrac1x$ for $x>0$, and $\dfrac{d}{dx}\ln\abs{x} = \dfrac1x$ for $x\neq0$.
::: solution
The exponential function is continuous, strictly increasing on $\R$ and equal to its own derivative, which is never zero ([[calculus-1/derivatives#thm-exp-deriv]]). Its inverse is $\ln$, so by [[#thm-inverse-deriv]], for $x > 0$,

$$
\frac{d}{dx}\ln x = \frac{1}{\exp(\ln x)} = \frac1x.
$$

For $x<0$, $\ln\abs{x} = \ln(-x)$, and the chain rule gives $\dfrac{1}{-x}\cdot(-1) = \dfrac1x$. So $\ln\abs{x}$ is an antiderivative of $1/x$ on each side of $0$, a fact we use constantly in integration.
:::
:::

::: widget plot
f: ln(x); exp(x); x
x: -3, 5
y: -3, 5
equal: true
tangent: 2
labels: \ln x; e^x; y=x
caption: Drag the point of tangency along the graph of $\ln x$. Its slope is $1/x$: steep near $0$, flat for large $x$. Reflecting the tangent line in $y = x$ gives the tangent to $e^x$ at the mirror point $(\ln x, x)$, whose slope is $x$ — the reciprocal, as [[#thm-inverse-deriv]] says.
:::

::: example Inverse trigonometric functions {#ex-arc-derivs}
Show that, for $-1 < x < 1$ and all real $y$ respectively,

$$
\frac{d}{dx}\arcsin x = \frac{1}{\sqrt{1-x^2}}, \qquad \frac{d}{dy}\arctan y = \frac{1}{1 + y^2}.
$$
::: solution
On the open interval $(-\frac\pi2,\frac\pi2)$ the sine function is continuous and strictly increasing, with derivative $\cos\theta > 0$. By [[#thm-inverse-deriv]], for $-1<x<1$,

$$
\frac{d}{dx}\arcsin x = \frac{1}{\cos(\arcsin x)} = \frac{1}{\sqrt{1 - x^2}},
$$

where the last step is [[calculus-1/real-functions#ex-arc-compositions]]. At $x = \pm1$ the denominator vanishes and the graph of $\arcsin$ has vertical tangents.

Similarly $\tan$ is strictly increasing on $(-\frac\pi2,\frac\pi2)$ with derivative $\sec^2\theta = 1 + \tan^2\theta > 0$, so

$$
\frac{d}{dy}\arctan y = \frac{1}{1 + \tan^2(\arctan y)} = \frac{1}{1+y^2}.
$$
:::
:::

In the same way $\dfrac{d}{dx}\arccos x = -\dfrac{1}{\sqrt{1-x^2}}$ for $-1<x<1$. It is remarkable that differentiating these transcendental functions produces purely algebraic ones; read backwards, the formulas supply antiderivatives of $1/\sqrt{1-x^2}$ and $1/(1+x^2)$, which we will need in [[calculus-1/integration-techniques]].

::: quiz
Suppose $f$ is strictly increasing and differentiable, with $f(2) = 5$ and $f'(2) = 4$. What is $(f^{-1})'(5)$?
- [ ] $4$
- [x] $\tfrac14$
- [ ] $\tfrac15$
- [ ] $\tfrac12$
::: solution
By [[#thm-inverse-deriv]] with $a = 2$ and $b = f(2) = 5$, $(f^{-1})'(5) = 1/f'(2) = \frac14$. The derivative of $f$ must be evaluated at the point $f^{-1}(5) = 2$, not at $5$.
:::
:::

## General powers and logarithmic differentiation

The chain rule and the logarithm let us differentiate any power. Since $a = e^{\ln a}$ for $a > 0$, we have $a^x = e^{x\ln a}$, and the chain rule gives

$$
\frac{d}{dx}a^x = e^{x\ln a}\cdot\ln a = a^x\ln a.
$$

This settles the question left open in [[calculus-1/derivatives]]: the slope of $a^x$ at $x = 0$ is $\ln a$ (so $L(2) = \ln 2 \approx 0.6931$, as the table there suggested).

::: theorem Power rule for real exponents {#thm-real-power}
For every real number $r$ and every $x > 0$, $\dfrac{d}{dx}x^r = rx^{r-1}$.
:::

::: proof
For $x>0$ we have $x^r = e^{r\ln x}$ by the definition of $\ln$ and the laws of exponents. By the chain rule and [[#ex-ln]],

$$
\frac{d}{dx}x^r = e^{r\ln x}\cdot\frac{r}{x} = x^r\cdot\frac{r}{x} = r x^{r-1}.
$$
:::

For instance $\frac{d}{dx}x^{\sqrt2} = \sqrt2\,x^{\sqrt2-1}$, and $\frac{d}{dx}\sqrt{x} = \frac12x^{-1/2}$ agrees with our earlier computation from the definition.

Two more families follow at once. By the change-of-base formula, $\log_a x = \frac{\ln x}{\ln a}$ ([[calculus-1/real-functions#thm-log-laws]]), so $\frac{d}{dx}\log_a x = \frac{1}{x\ln a}$; the awkward factor $\ln a$ disappears only for $a = e$, which is why the natural logarithm is natural. And since $\frac{d}{dx}e^{-x} = -e^{-x}$, the hyperbolic functions of [[calculus-1/real-functions#eq-hyperbolic]] satisfy

$$
\frac{d}{dx}\sinh x = \cosh x, \qquad \frac{d}{dx}\cosh x = \sinh x,
$$

mirroring the trigonometric formulas except for a sign.

When the variable appears in both the base and the exponent, or when a function is a long product or quotient, it is easiest to differentiate its logarithm first. This is **logarithmic differentiation**: if $y = f(x) > 0$, then $\frac{d}{dx}\ln y = \frac{y'}{y}$ by the chain rule, so

$$
y' = y\cdot\frac{d}{dx}\ln y.
$$

::: example Logarithmic differentiation {#ex-logdiff}
Differentiate (a) $y = x^x$ for $x>0$ and (b) $y = \dfrac{(x^2+1)^3\sqrt{x+4}}{(2x+1)^5}$ for $x > 0$.
::: solution
(a) Take logarithms: $\ln y = x\ln x$. Differentiating both sides with the product rule,

$$
\frac{y'}{y} = \ln x + x\cdot\frac1x = \ln x + 1, \qquad\text{so}\qquad y' = x^x(\ln x + 1).
$$

(b) The laws of logarithms turn the product and quotient into a sum:

$$
\ln y = 3\ln(x^2+1) + \tfrac12\ln(x+4) - 5\ln(2x+1).
$$

Differentiating term by term with the chain rule,

$$
\frac{y'}{y} = \frac{6x}{x^2+1} + \frac{1}{2(x+4)} - \frac{10}{2x+1}, \qquad y' = \frac{(x^2+1)^3\sqrt{x+4}}{(2x+1)^5}\left(\frac{6x}{x^2+1} + \frac{1}{2(x+4)} - \frac{10}{2x+1}\right).
$$
:::
:::

::: warning Neither the power rule nor the exponential rule applies to $x^x$
In $x^x$ both the base and the exponent vary. Treating the exponent as a constant (power rule) gives $x\cdot x^{x-1} = x^x$; treating the base as a constant (exponential rule) gives $x^x\ln x$. Both are wrong — but notice that the correct answer $x^x(\ln x + 1)$ is exactly their *sum*. This is no accident: each variable occurrence contributes its own term, as the chain rule for functions of two variables explains ([[multivariable/partial-derivatives]]).
:::

## Implicit differentiation

Some curves are not graphs of a single function but are described by an equation, such as the circle $x^2 + y^2 = 25$ or the **folium of Descartes**

$$
x^3 + y^3 = 6xy.
$$ {#eq-folium}

Near most of its points, such a curve is the graph of a differentiable function, even when no formula for that function is available.

::: definition Implicitly defined function {#def-implicit}
Let $F(x, y) = 0$ be an equation and $(a, b)$ a point satisfying it. A function $\varphi$, defined on an open interval $J$ containing $a$, is **defined implicitly** by the equation near $(a,b)$ if $\varphi(a) = b$ and $F\bigl(x, \varphi(x)\bigr) = 0$ for every $x\in J$.
:::

For example, near $(3, 4)$ the equation $x^2 + y^2 - 25 = 0$ defines $\varphi(x) = \sqrt{25 - x^2}$ implicitly, and near $(3,-4)$ it defines $-\sqrt{25 - x^2}$; near $(5, 0)$ it defines no function at all, because the circle has a vertical tangent there. When a differentiable implicit function exists is the content of the implicit function theorem ([[multivariable/partial-derivatives]]). Assuming that it does, we can find $dy/dx$ by **implicit differentiation**: differentiate both sides of the equation with respect to $x$, treating $y$ as a function of $x$ and using the chain rule wherever $y$ appears, then solve for $y'$. The key step is

$$
\frac{d}{dx}\bigl(y^n\bigr) = ny^{n-1}\,\frac{dy}{dx}, \qquad\text{not } ny^{n-1}.
$$

::: example A circle {#ex-circle}
Find the slope of the tangent to $x^2 + y^2 = 25$ at $(3, 4)$, and compute $d^2y/dx^2$.
::: solution
Differentiating both sides with respect to $x$: $2x + 2y\,y' = 0$, so $y' = -\dfrac{x}{y}$ wherever $y\neq0$. At $(3,4)$ the slope is $-\frac34$, and the tangent line is $y = 4 - \frac34(x - 3)$. As a check, the upper semicircle is $y = \sqrt{25 - x^2}$, whose derivative $-x/\sqrt{25 - x^2}$ is indeed $-x/y$. The tangent is perpendicular to the radius, whose slope is $y/x$.

Differentiating $y' = -x/y$ again with the quotient rule, and substituting $y' = -x/y$,

$$
y'' = -\frac{y - x\,y'}{y^2} = -\frac{y + x^2/y}{y^2} = -\frac{x^2 + y^2}{y^3} = -\frac{25}{y^3}.
$$

So $y''<0$ on the upper semicircle and $y''>0$ on the lower one, matching the way the two halves bend.
:::
:::

::: example The folium of Descartes {#ex-folium}
Find $dy/dx$ on the folium [[#eq-folium]], the tangent line at $(3,3)$, and the point in the first quadrant where the tangent is horizontal.
::: solution
Differentiate both sides, using the product rule on $6xy$:

$$
3x^2 + 3y^2y' = 6y + 6xy' \quad\Longrightarrow\quad y'\,(3y^2 - 6x) = 6y - 3x^2 \quad\Longrightarrow\quad y' = \frac{2y - x^2}{y^2 - 2x},
$$

valid where $y^2\neq 2x$. At $(3,3)$ (which lies on the curve: $27 + 27 = 54$) the slope is $\frac{6-9}{9-6} = -1$, so the tangent line is $y = 3 - (x - 3) = 6 - x$.

The tangent is horizontal where $2y = x^2$ (and $y^2 \neq 2x$). Substituting $y = x^2/2$ into the equation of the curve gives $x^3 + \frac{x^6}{8} = 3x^3$, so $x^6 = 16x^3$, and for $x\neq0$, $x^3 = 16$. Thus $x = 2^{4/3}\approx 2.52$ and $y = x^2/2 = 2^{5/3}\approx3.17$. (Check: $x^3 + y^3 = 16 + 32 = 48 = 6xy$.)
:::
:::

::: widget parametric
fx: 6t/(1 + t^3)
fy: 6t^2/(1 + t^3)
t: -0.5, 15
x: -4, 5
y: -4, 5
caption: The folium of Descartes $x^3 + y^3 = 6xy$, traced by the point $\bigl(\frac{6t}{1+t^3}, \frac{6t^2}{1+t^3}\bigr)$. Move $t$: the velocity vector is tangent to the curve, so its slope agrees with the implicit derivative $\frac{2y - x^2}{y^2 - 2x}$. At $t = 1$ the point is $(3,3)$ with slope $-1$; at $t = 2^{1/3}\approx1.26$ it is the top of the loop, where the tangent is horizontal. The loop starts and ends at the origin ($t = 0$ and $t\to\infty$), where the complete curve crosses itself and no single function $y(x)$ describes it.
:::

## Related rates

When several quantities are linked by an equation and all of them change with time, differentiating the equation with respect to $t$ links their rates of change. Such **related rates** problems follow a standard pattern:

1. Draw a picture and name every quantity that varies with time.
2. Write an equation relating the quantities, valid at *all* times.
3. Differentiate it with respect to $t$, using the chain rule.
4. Only now substitute the values at the instant of interest, and solve for the unknown rate.

::: example A sliding ladder {#ex-ladder}
A 5 m ladder leans against a vertical wall. Its foot slides away from the wall at $0.5$ m/s. How fast is the top sliding down the wall when the foot is $3$ m from the wall?
::: solution
Let $x(t)$ be the distance of the foot from the wall and $y(t)$ the height of the top. At all times $x^2 + y^2 = 25$. Differentiating with respect to $t$,

$$
2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0 \quad\Longrightarrow\quad \frac{dy}{dt} = -\frac{x}{y}\,\frac{dx}{dt}.
$$

At the instant in question $x = 3$, so $y = 4$, and $dx/dt = 0.5$. Hence $dy/dt = -\frac34\cdot0.5 = -0.375$: the top slides down at $0.375$ m/s. Notice that as $y\to0$ the formula demands ever larger speeds — the model breaks down before the ladder hits the floor.
:::
:::

::: example Filling a conical tank {#ex-cone}
Water flows at $2$ m³/min into a tank shaped like an inverted cone, $4$ m deep with a top radius of $2$ m. How fast is the water level rising when the water is $3$ m deep?
::: solution
Let $h$ be the depth of the water and $r$ the radius of its surface. By similar triangles $r/h = 2/4$, so $r = h/2$ at all times, and the volume of water is

$$
V = \frac13\pi r^2h = \frac{\pi}{12}h^3.
$$

Differentiating with respect to $t$: $\dfrac{dV}{dt} = \dfrac{\pi}{4}h^2\dfrac{dh}{dt}$. With $dV/dt = 2$ and $h = 3$,

$$
\frac{dh}{dt} = \frac{4}{\pi h^2}\,\frac{dV}{dt} = \frac{8}{9\pi}\approx 0.283 \text{ m/min}.
$$

The level rises more slowly as the tank fills, because the same volume spreads over a larger surface.
:::
:::

::: warning Substitute after differentiating
In [[#ex-cone]], substituting $h = 3$ into $V = \frac{\pi}{12}h^3$ *before* differentiating gives the constant $V = \frac{9\pi}{4}$, whose derivative is $0$ — a nonsensical answer. The equation must hold for all $t$ when it is differentiated; values at one instant are inserted only at the end.
:::

::: quiz
The radius of a circle grows at $2$ cm/s. How fast is its area growing when the radius is $10$ cm?
- [ ] $4\pi$ cm²/s
- [ ] $20\pi$ cm²/s
- [x] $40\pi$ cm²/s
- [ ] $100\pi$ cm²/s
::: solution
$A = \pi r^2$, so $\dfrac{dA}{dt} = 2\pi r\dfrac{dr}{dt} = 2\pi\cdot10\cdot2 = 40\pi$ cm²/s. Geometrically, the area grows at the rate (circumference) × (speed of the boundary).
:::
:::

::: history
The chain rule was used by Gottfried Wilhelm Leibniz in a manuscript of 1676 to differentiate $\sqrt{a + bz + cz^2}$, and it is built into his notation: $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$ looks like the cancellation of fractions, which is one reason his notation prevailed over Newton's. Implicit curves were a testing ground for the early methods. In 1638 René Descartes challenged Pierre de Fermat to find the tangent at an arbitrary point of the curve now called the folium of Descartes; Fermat solved the problem with his method of tangents, something Descartes himself could not do. The proof of the chain rule given here, which avoids dividing by $g(x) - g(a)$, is based on a characterisation of the derivative popularised by Constantin Carathéodory in the twentieth century.
:::

## Where this leads

With the chain rule we can now differentiate any function built from the elementary functions. Read backwards, it becomes the substitution rule for integrals ([[calculus-1/integration-techniques]]). In several variables it becomes a statement about matrices of partial derivatives ([[multivariable/partial-derivatives]]), and the question of when an equation $F(x,y) = 0$ really defines $y$ as a differentiable function of $x$ is answered by the implicit function theorem. Related rates are the simplest examples of differential equations, which describe how quantities change in terms of each other ([[ode/first-order]]).

::: summary
- Chain rule: $(f\circ g)'(x) = f'(g(x))\,g'(x)$, or $\frac{dy}{dx} = \frac{dy}{du}\frac{du}{dx}$. Differentiate the outside, keep the inside, multiply by the derivative of the inside.
- The naive proof fails where $g(x) = g(a)$; writing $f(x) - f(a) = \varphi(x)(x-a)$ with $\varphi$ continuous at $a$ gives a correct proof.
- If $f$ is continuous and strictly monotonic on an open interval and $f'(a)\neq0$, then $(f^{-1})'(f(a)) = 1/f'(a)$.
- $(\ln x)' = 1/x$, $(a^x)' = a^x\ln a$, $(x^r)' = rx^{r-1}$, $(\arcsin x)' = 1/\sqrt{1-x^2}$ and $(\arctan x)' = 1/(1+x^2)$.
- Logarithmic differentiation handles variable exponents such as $x^x$ and long products and quotients.
- Implicit differentiation: differentiate an equation in $x$ and $y$ with $y = y(x)$, remembering $\frac{d}{dx}y^n = ny^{n-1}y'$.
- Related rates: relate the quantities for all $t$, differentiate with respect to $t$, then substitute.
:::

## Exercises

::: exercise Practice with the chain rule {level=1}
Differentiate: (a) $(2x^3 - 5)^4$; (b) $\cos(5x^2 + 1)$; (c) $e^{\sin x}$; (d) $\sqrt{1 + x^4}$; (e) $\ln(x^2 + 1)$.
::: solution
(a) $4(2x^3-5)^3\cdot6x^2 = 24x^2(2x^3-5)^3$.

(b) $-\sin(5x^2+1)\cdot10x = -10x\sin(5x^2+1)$.

(c) $e^{\sin x}\cos x$.

(d) $\frac12(1+x^4)^{-1/2}\cdot4x^3 = \dfrac{2x^3}{\sqrt{1+x^4}}$.

(e) $\dfrac{1}{x^2+1}\cdot2x = \dfrac{2x}{x^2+1}$.
:::
:::

::: exercise The chain rule from a table {level=1 check="-3"}
Let $h = f\circ g$, where $g(1) = 2$, $g'(1) = 3$, $f(2) = 7$ and $f'(2) = -1$. Find $h'(1)$.
::: solution
By [[#thm-chain]], $h'(1) = f'(g(1))\,g'(1) = f'(2)\cdot3 = -3$. The value $f(2) = 7$ is not needed.
:::
:::

::: exercise An inverse sine {level=1 check="1/sqrt(3)"}
Find the derivative of $\arcsin(x/2)$ at $x = 1$.
::: solution
By the chain rule and [[#ex-arc-derivs]], $\dfrac{d}{dx}\arcsin\frac x2 = \dfrac{1}{\sqrt{1 - x^2/4}}\cdot\dfrac12$. At $x = 1$ this is $\dfrac{1/2}{\sqrt{3/4}} = \dfrac{1/2}{\sqrt3/2} = \dfrac{1}{\sqrt3}$.
:::
:::

::: exercise A tangent to an ellipse {level=2 check="-4/5"}
The point $(1, 2)$ lies on the curve $x^2 + xy + y^2 = 7$. Find the slope of the tangent line there.
::: solution
Differentiating implicitly, with the product rule on $xy$: $2x + y + xy' + 2yy' = 0$, so

$$
y' = -\frac{2x + y}{x + 2y}.
$$

At $(1,2)$ (check: $1 + 2 + 4 = 7$) the slope is $-\frac{4}{5}$, and the tangent line is $y = 2 - \frac45(x - 1)$.
:::
:::

::: exercise A variable exponent {level=2}
Differentiate $y = x^{\sin x}$ for $x>0$.
::: solution
Take logarithms: $\ln y = \sin x\,\ln x$. Differentiating with the product rule,

$$
\frac{y'}{y} = \cos x\ln x + \frac{\sin x}{x}, \qquad y' = x^{\sin x}\Bigl(\cos x\ln x + \frac{\sin x}{x}\Bigr).
$$
:::
:::

::: exercise Inflating a balloon {level=2 check="1/pi"}
Air is pumped into a spherical balloon at $100$ cm³/s. How fast is the radius increasing when the radius is $5$ cm?
::: solution
$V = \frac43\pi r^3$, so $\dfrac{dV}{dt} = 4\pi r^2\dfrac{dr}{dt}$. With $dV/dt = 100$ and $r = 5$: $\dfrac{dr}{dt} = \dfrac{100}{4\pi\cdot25} = \dfrac{1}{\pi}\approx0.318$ cm/s.
:::
:::

::: exercise A moving shadow {level=2 check="15/7"}
A person $1.8$ m tall walks away from a $6$ m lamp post at $1.5$ m/s. How fast does the tip of their shadow move along the ground?
::: hint
Let $x$ be the person's distance from the post and $s$ the distance of the tip of the shadow from the post, and use similar triangles.
:::
::: solution
The light ray from the top of the post passes over the person's head to the tip of the shadow. By similar triangles, $\dfrac{s - x}{1.8} = \dfrac{s}{6}$, so $6s - 6x = 1.8s$, i.e. $s = \dfrac{6}{4.2}x = \dfrac{10}{7}x$ at all times. Differentiating, $\dfrac{ds}{dt} = \dfrac{10}{7}\cdot\dfrac{dx}{dt} = \dfrac{10}{7}\cdot1.5 = \dfrac{15}{7}\approx2.14$ m/s, independently of where the person is.
:::
:::

::: exercise Tangent triangles of a hyperbola {level=3 check="2"}
Prove that every tangent line to the hyperbola $xy = 1$ forms, with the coordinate axes, a triangle of the same area, and find that area.
::: solution
Implicit differentiation of $xy = 1$ gives $y + xy' = 0$, so $y' = -y/x$. At the point $(a, 1/a)$ (with $a\neq0$) the slope is $-1/a^2$ and the tangent line is

$$
y = \frac1a - \frac{1}{a^2}(x - a) = \frac2a - \frac{x}{a^2}.
$$

It meets the $y$-axis at $(0, 2/a)$ and the $x$-axis where $x/a^2 = 2/a$, at $(2a, 0)$. The triangle with vertices $(0,0)$, $(2a,0)$, $(0, 2/a)$ has area $\frac12\cdot2\abs{a}\cdot\frac{2}{\abs a} = 2$, whatever the value of $a$. (Notice also that the point of tangency is the midpoint of the hypotenuse.)
:::
:::

::: exercise A derivative that is not continuous {level=3}
Let $f(x) = x^2\sin(1/x)$ for $x\neq0$ and $f(0) = 0$. Show that $f$ is differentiable everywhere, but that $f'$ is not continuous at $0$.
::: solution
For $x\neq0$ the chain and product rules give

$$
f'(x) = 2x\sin\frac1x + x^2\cos\frac1x\cdot\Bigl(-\frac{1}{x^2}\Bigr) = 2x\sin\frac1x - \cos\frac1x.
$$

At $0$ we use the definition: $\dfrac{f(h) - f(0)}{h} = h\sin\dfrac1h$, which tends to $0$ by the squeeze theorem since $\abs{h\sin(1/h)}\le\abs h$. So $f'(0) = 0$ and $f$ is differentiable everywhere.

As $x\to0$, the term $2x\sin(1/x)$ tends to $0$, but $\cos(1/x)$ has no limit (it equals $1$ at $x = \frac{1}{2n\pi}$ and $-1$ at $x = \frac{1}{(2n+1)\pi}$). Hence $f'(x)$ has no limit as $x\to0$, and $f'$ is not continuous at $0$. A derivative can exist everywhere without being continuous — although, as shown in [[real-analysis/differentiation]], it still has the intermediate value property.
:::
:::

::: exercise The second derivative of an inverse {level=3}
Let $f$ be twice differentiable on an open interval $I$ with $f'(x)\neq0$ for all $x \in I$, and let $g = f^{-1}$. Prove that

$$
g''(y) = -\frac{f''(x)}{f'(x)^3}, \qquad\text{where } x = g(y).
$$

(Note that $f$ is strictly monotonic on $I$: as $f$ is twice differentiable, $f'$ is continuous, and since it never vanishes it has constant sign by the intermediate value theorem; now apply [[calculus-1/mean-value-theorem#thm-monotonicity]].)
::: solution
By [[#thm-inverse-deriv]], $g$ is differentiable on $f(I)$ with $g'(y) = \dfrac{1}{f'(g(y))}$. The function $y\mapsto f'(g(y))$ is differentiable by the chain rule, since $g$ is differentiable at $y$ and $f'$ is differentiable at $g(y)$, with derivative $f''(g(y))\,g'(y)$. It is non-zero, so by the quotient rule

$$
g''(y) = -\frac{f''(g(y))\,g'(y)}{f'(g(y))^2} = -\frac{f''(x)}{f'(x)^2}\cdot\frac{1}{f'(x)} = -\frac{f''(x)}{f'(x)^3}.
$$

For example, for $f = \exp$ and $g = \ln$: $g''(y) = -\frac{e^x}{e^{3x}} = -e^{-2x} = -\frac{1}{y^2}$, which agrees with differentiating $\frac1y$ directly.
:::
:::
