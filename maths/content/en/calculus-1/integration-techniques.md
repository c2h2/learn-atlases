Differentiation is a mechanical process: the rules of [[calculus-1/derivatives]] and [[calculus-1/chain-rule]] differentiate any elementary function, however complicated. Integration is different. The fundamental theorem of calculus ([[calculus-1/integrals]]) reduces the evaluation of $\int_a^bf$ to finding an antiderivative, but there is no product rule, quotient rule or chain rule for antiderivatives that always works. Instead there is a toolkit of techniques, each of which transforms an integral into one that is easier — and some skill in choosing between them.

The two most important techniques are differentiation rules read backwards: the chain rule becomes **substitution**, and the product rule becomes **integration by parts**. To these we add algebraic methods for particular classes of integrands: trigonometric identities for powers of sines and cosines, **trigonometric substitution** for square roots of quadratics, and **partial fractions** for rational functions. Finally we meet integrals that no technique can do in closed form, such as $\int e^{-x^2}\,dx$, and see what can be done instead.

Throughout, remember that any proposed antiderivative can be checked by differentiating it. That check is mechanical, even when finding the antiderivative was not.

## Substitution

By the chain rule, $\frac{d}{dx}F(g(x)) = F'(g(x))\,g'(x)$. Read backwards, an integrand of the form $f(g(x))\,g'(x)$ — "a function of $g(x)$, times the derivative of $g(x)$" — has the antiderivative $F(g(x))$, where $F' = f$.

::: theorem Substitution rule {#thm-substitution}
Let $g$ have a continuous derivative on an interval $I$, and let $f$ be continuous on an interval containing $g(I)$. If $F$ is an antiderivative of $f$, then

$$
\int f\bigl(g(x)\bigr)\,g'(x)\,dx = F\bigl(g(x)\bigr) + C,
$$

and for $a, b\in I$,

$$
\int_a^b f\bigl(g(x)\bigr)\,g'(x)\,dx = \int_{g(a)}^{g(b)} f(u)\,du.
$$ {#eq-substitution}
:::

::: proof
By the chain rule, $\frac{d}{dx}F(g(x)) = f(g(x))\,g'(x)$, which proves the first formula. Both integrands in [[#eq-substitution]] are continuous, so the fundamental theorem ([[calculus-1/integrals#thm-ftc2]]) evaluates both sides: the left-hand side equals $F(g(b)) - F(g(a))$ because $F\circ g$ is an antiderivative of its integrand, and the right-hand side equals $F(g(b)) - F(g(a))$ because $F$ is an antiderivative of $f$.
:::

In practice the substitution is carried out with Leibniz notation: put $u = g(x)$, write $du = g'(x)\,dx$, and replace every occurrence of $x$ by $u$. The notation does the bookkeeping, and it is fully justified by the theorem.

::: intuition Why the factor g′(x) appears
Think of a Riemann sum for $\int f(u)\,du$ on the $u$-axis. If $u = g(x)$, a short interval of length $\Delta x$ on the $x$-axis is mapped to an interval of length $\Delta u\approx g'(x)\,\Delta x$ on the $u$-axis: $g'(x)$ is the local stretching factor of the substitution. So each term $f(u)\,\Delta u$ of the sum on the $u$-axis equals approximately $f(g(x))\,g'(x)\,\Delta x$ on the $x$-axis. The substitution rule says that these approximations become exact in the limit. In several variables the stretching factor becomes the Jacobian determinant ([[multivariable/change-of-variables]]).
:::

::: example Substitutions {#ex-substitution}
Find (a) $\displaystyle\int2x\cos(x^2)\,dx$, (b) $\displaystyle\int\frac{x}{x^2+1}\,dx$, (c) $\displaystyle\int\tan x\,dx$ and (d) $\displaystyle\int_0^1x\sqrt{1 - x^2}\,dx$.
::: solution
(a) With $u = x^2$, $du = 2x\,dx$: $\int\cos u\,du = \sin u + C = \sin(x^2) + C$.

(b) With $u = x^2 + 1$, $du = 2x\,dx$, so $x\,dx = \frac12du$:

$$
\int\frac{x}{x^2+1}\,dx = \frac12\int\frac{du}{u} = \frac12\ln\abs{u} + C = \frac12\ln(x^2+1) + C.
$$

The derivative of the denominator need only be present up to a constant factor.

(c) Write $\tan x = \frac{\sin x}{\cos x}$ and put $u = \cos x$, $du = -\sin x\,dx$:

$$
\int\tan x\,dx = -\int\frac{du}{u} = -\ln\abs{\cos x} + C = \ln\abs{\sec x} + C.
$$

(d) Put $u = 1 - x^2$, $du = -2x\,dx$. The limits change too: $x = 0$ gives $u = 1$ and $x = 1$ gives $u = 0$. By [[#eq-substitution]],

$$
\int_0^1x\sqrt{1-x^2}\,dx = -\frac12\int_1^0\sqrt{u}\,du = \frac12\int_0^1u^{1/2}\,du = \frac12\cdot\frac23 = \frac13 .
$$
:::
:::

::: warning Change the limits, and get rid of x entirely
In a definite integral, either change the limits to the corresponding values of $u$ (as in (d)) or return to $x$ before substituting the original limits — never mix the two. And after substituting, no $x$ may remain: in $\int x^2\sqrt{1 - x^2}\,dx$ the choice $u = 1-x^2$ leaves a factor $x$ that cannot be expressed through $du = -2x\,dx$ alone (it needs $x = \sqrt{1-u}$), which signals that this substitution will not simplify matters. A different method (trigonometric substitution, below) is needed.
:::

::: widget plot
f: 2x*cos(x^2); cos(x)
x: -0.5, 3.6
y: -4, 4
shade: 0, sqrt(pi)
labels: 2x\cos(x^2); \cos u
caption: The substitution $u = x^2$ turns $\int_0^{\sqrt\pi}2x\cos(x^2)\,dx$ (shaded) into $\int_0^{\pi}\cos u\,du$ (the orange curve on $[0,\pi]$). The regions look completely different — the first oscillates faster and grows taller as $x$ increases — but their signed areas are equal, and both are $\sin\pi - \sin 0 = 0$. The factor $2x = du/dx$ is exactly what compensates for the stretching of the axis.
:::

::: quiz
What is $\displaystyle\int\cos(5x)\,dx$?
- [x] $\frac15\sin(5x) + C$
- [ ] $5\sin(5x) + C$
- [ ] $\sin(5x) + C$
- [ ] $-\frac15\sin(5x) + C$
::: solution
With $u = 5x$, $dx = \frac15du$, so $\int\cos(5x)\,dx = \frac15\sin(5x) + C$. Check by differentiating: the chain rule produces a factor $5$ that cancels the $\frac15$. The answer $5\sin 5x$ comes from multiplying by the inner derivative instead of dividing by it.
:::
:::

## Integration by parts

The product rule $(uv)' = u'v + uv'$, integrated, gives the second great technique.

::: theorem Integration by parts {#thm-parts}
If $u$ and $v$ have continuous derivatives on an interval, then

$$
\int u(x)\,v'(x)\,dx = u(x)\,v(x) - \int u'(x)\,v(x)\,dx,
$$

and for $a$, $b$ in the interval,

$$
\int_a^bu\,v'\,dx = \bigl[u\,v\bigr]_a^b - \int_a^bu'\,v\,dx .
$$ {#eq-parts}
:::

::: proof
By the product rule, $uv$ is an antiderivative of $u'v + uv'$, a continuous function. So $\int(u'v + uv')\,dx = uv + C$, and rearranging gives the first formula. For the definite version, the fundamental theorem gives $\int_a^b(u'v + uv')\,dx = \bigl[uv\bigr]_a^b$, and the integral splits by linearity.
:::

In differential notation the rule reads $\int u\,dv = uv - \int v\,du$. The art is in choosing $u$ and $dv$: we want $u$ to become simpler when differentiated and $dv$ to be easy to integrate. A rough guide is to choose for $u$ the first available factor in the list *logarithms, inverse trigonometric functions, algebraic functions (powers), trigonometric functions, exponentials*.

::: example Integration by parts {#ex-parts}
Find (a) $\displaystyle\int xe^x\,dx$, (b) $\displaystyle\int\ln x\,dx$, (c) $\displaystyle\int x^2\sin x\,dx$ and (d) $\displaystyle\int e^x\sin x\,dx$.
::: solution
(a) Take $u = x$ and $dv = e^x\,dx$, so $du = dx$ and $v = e^x$:

$$
\int xe^x\,dx = xe^x - \int e^x\,dx = (x - 1)e^x + C.
$$

(The opposite choice, $u = e^x$ and $dv = x\,dx$, leads to $\int\frac{x^2}{2}e^x\,dx$, which is worse.)

(b) There seems to be only one factor, but we may take $u = \ln x$ and $dv = dx$, so $du = \frac{dx}{x}$ and $v = x$:

$$
\int\ln x\,dx = x\ln x - \int x\cdot\frac1x\,dx = x\ln x - x + C.
$$

(c) Two rounds of parts reduce the power of $x$ to zero. With $u = x^2$, $dv = \sin x\,dx$: $\int x^2\sin x\,dx = -x^2\cos x + \int2x\cos x\,dx$. Then with $u = 2x$, $dv = \cos x\,dx$: $\int2x\cos x\,dx = 2x\sin x - \int2\sin x\,dx = 2x\sin x + 2\cos x$. Altogether,

$$
\int x^2\sin x\,dx = -x^2\cos x + 2x\sin x + 2\cos x + C.
$$

(d) Neither factor simplifies, but integrating by parts twice brings the original integral back. Let $I = \int e^x\sin x\,dx$. With $u = \sin x$, $dv = e^x\,dx$: $I = e^x\sin x - \int e^x\cos x\,dx$. With $u = \cos x$, $dv = e^x\,dx$: $\int e^x\cos x\,dx = e^x\cos x + \int e^x\sin x\,dx = e^x\cos x + I$. Hence

$$
I = e^x\sin x - e^x\cos x - I \quad\Longrightarrow\quad I = \frac{e^x}{2}(\sin x - \cos x) + C.
$$

(When solving for $I$ we must keep the arbitrary constant in mind; it is added at the end.)
:::
:::

::: quiz
For $\displaystyle\int x\ln x\,dx$, which choice of $u$ and $dv$ leads to an easier integral?
- [x] $u = \ln x$, $dv = x\,dx$
- [ ] $u = x$, $dv = \ln x\,dx$
- [ ] $u = x\ln x$, $dv = dx$
- [ ] Integration by parts cannot be used here
::: solution
With $u = \ln x$ and $dv = x\,dx$ we get $du = \frac{dx}x$ and $v = \frac{x^2}{2}$, so $\int x\ln x\,dx = \frac{x^2}{2}\ln x - \int\frac x2\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4} + C$. The other two choices also succeed in the end, but less directly: each brings back $\int x\ln x\,dx$ itself, and one must then solve for it, as in part (d) of [[#ex-parts]].
:::
:::

::: remark Moving a derivative from one factor to another
Integration by parts transfers a derivative from one factor of the integrand to the other, at the cost of a boundary term and a change of sign. When the boundary term vanishes — because a factor is zero at both ends, or because everything decays at infinity — the rule reads simply $\int_a^bu\,v' = -\int_a^bu'\,v$. This form is used constantly in physics and in the theory of differential equations: it is how derivatives are moved off an unknown function onto a known one, and in [[pde/fourier-series]] it explains why the Fourier coefficients of smooth functions decrease rapidly.
:::

Integration by parts also produces **reduction formulas**, which express an integral involving a power $n$ through the same kind of integral with a smaller power.

::: example A reduction formula {#ex-reduction}
Let $I_n = \displaystyle\int_0^{\pi/2}\sin^nx\,dx$. Show that $I_n = \dfrac{n-1}{n}I_{n-2}$ for $n\ge2$, and compute $I_4$.
::: solution
Write $\sin^nx = \sin^{n-1}x\cdot\sin x$ and integrate by parts with $u = \sin^{n-1}x$ and $dv = \sin x\,dx$, so $du = (n-1)\sin^{n-2}x\cos x\,dx$ and $v = -\cos x$. The boundary term $\bigl[-\sin^{n-1}x\cos x\bigr]_0^{\pi/2}$ vanishes for $n\ge2$, so

$$
I_n = (n-1)\int_0^{\pi/2}\sin^{n-2}x\cos^2x\,dx = (n-1)\int_0^{\pi/2}\sin^{n-2}x\,(1 - \sin^2x)\,dx = (n-1)(I_{n-2} - I_n).
$$

Solving for $I_n$ gives $nI_n = (n-1)I_{n-2}$. Since $I_0 = \frac\pi2$,

$$
I_4 = \frac34I_2 = \frac34\cdot\frac12I_0 = \frac{3\pi}{16}.
$$

Similarly, starting from $I_1 = 1$, the odd integrals are rational numbers ([[#exr-wallis]]).
:::
:::

## Trigonometric integrals

Integrals of products of powers of sine and cosine are handled with the identity $\sin^2x + \cos^2x = 1$ and the double-angle formulas $\cos^2x = \frac{1+\cos2x}{2}$, $\sin^2x = \frac{1 - \cos2x}{2}$ ([[calculus-1/real-functions#eq-double-angle]]). For $\int\sin^mx\cos^nx\,dx$:

- **If $n$ is odd**, save one factor $\cos x$, convert the remaining even power of cosine to sines, and substitute $u = \sin x$.
- **If $m$ is odd**, save one factor $\sin x$, convert the rest to cosines, and substitute $u = \cos x$.
- **If both are even**, use the double-angle formulas to halve the powers, repeatedly if necessary.

::: example Powers of sine and cosine {#ex-trig-integrals}
Find (a) $\displaystyle\int\sin^3x\,dx$, (b) $\displaystyle\int\sin^2x\cos^3x\,dx$ and (c) $\displaystyle\int_0^\pi\sin^2x\,dx$.
::: solution
(a) Save one $\sin x$: $\sin^3x = (1 - \cos^2x)\sin x$. With $u = \cos x$, $du = -\sin x\,dx$,

$$
\int\sin^3x\,dx = -\int(1 - u^2)\,du = -u + \frac{u^3}{3} + C = -\cos x + \frac{\cos^3x}{3} + C.
$$

(b) The power of cosine is odd: $\sin^2x\cos^3x = \sin^2x(1 - \sin^2x)\cos x$. With $u = \sin x$,

$$
\int\sin^2x\cos^3x\,dx = \int(u^2 - u^4)\,du = \frac{\sin^3x}{3} - \frac{\sin^5x}{5} + C.
$$

(c) Both powers are even, so use $\sin^2x = \frac{1-\cos2x}{2}$:

$$
\int_0^\pi\sin^2x\,dx = \int_0^\pi\frac{1 - \cos2x}{2}\,dx = \Bigl[\frac x2 - \frac{\sin2x}{4}\Bigr]_0^\pi = \frac\pi2.
$$

This is half the length of the interval: over a full period, $\sin^2$ and $\cos^2$ have the same integral and add up to $1$, so each has average value $\frac12$ — a fact used constantly in physics and signal processing.
:::
:::

::: warning Different-looking answers can all be right
Indefinite integrals found by different methods often look different. For $\int\sin x\cos x\,dx$, the substitution $u = \sin x$ gives $\frac12\sin^2x + C$, the substitution $u = \cos x$ gives $-\frac12\cos^2x + C$, and the identity $\sin x\cos x = \frac12\sin2x$ gives $-\frac14\cos2x + C$. All three are correct: they differ by constants ($\frac12\sin^2x + \frac12\cos^2x = \frac12$ and $\frac12\sin^2x + \frac14\cos 2x = \frac14$), which the arbitrary constant $C$ absorbs. When comparing your answer with a book's, differentiate both rather than trying to match their forms.
:::

Integrals of tangent and secant are treated similarly using $\sec^2x = 1 + \tan^2x$ and the derivatives $(\tan x)' = \sec^2x$, $(\sec x)' = \sec x\tan x$. One integral needs a trick: multiplying and dividing by $\sec x + \tan x$,

$$
\int\sec x\,dx = \int\frac{\sec^2x + \sec x\tan x}{\sec x + \tan x}\,dx = \ln\abs{\sec x + \tan x} + C,
$$

because the numerator is the derivative of the denominator.

## Trigonometric substitution

Square roots of quadratic expressions are removed by substituting a trigonometric function and using a Pythagorean identity:

| expression | substitution | identity used |
|---|---|---|
| $\sqrt{a^2 - x^2}$ | $x = a\sin\theta,\ -\frac\pi2\le\theta\le\frac\pi2$ | $1 - \sin^2\theta = \cos^2\theta$ |
| $\sqrt{a^2 + x^2}$ | $x = a\tan\theta,\ -\frac\pi2<\theta<\frac\pi2$ | $1 + \tan^2\theta = \sec^2\theta$ |
| $\sqrt{x^2 - a^2}$ | $x = a\sec\theta,\ 0\le\theta<\frac\pi2$ (for $x \ge a$) | $\sec^2\theta - 1 = \tan^2\theta$ |

Here the substitution runs the other way, $x = g(\theta)$, and is justified by [[#thm-substitution]] read from right to left: the restriction on $\theta$ makes $g$ one-to-one, so we can return to $x$ through $\theta = g^{-1}(x)$, and it fixes the signs of the square roots (for instance $\cos\theta\ge0$ on $[-\frac\pi2,\frac\pi2]$, so $\sqrt{a^2 - a^2\sin^2\theta} = a\cos\theta$).

::: example The area of a circle {#ex-circle-area}
Find $\displaystyle\int\sqrt{1 - x^2}\,dx$, and deduce that a circle of radius $r$ has area $\pi r^2$.
::: solution
Put $x = \sin\theta$ with $\theta\in[-\frac\pi2,\frac\pi2]$, so $dx = \cos\theta\,d\theta$ and $\sqrt{1 - x^2} = \cos\theta$. Then

$$
\int\sqrt{1-x^2}\,dx = \int\cos^2\theta\,d\theta = \frac\theta2 + \frac{\sin2\theta}{4} + C = \frac{\theta + \sin\theta\cos\theta}{2} + C = \frac{\arcsin x + x\sqrt{1-x^2}}{2} + C,
$$

using $\sin2\theta = 2\sin\theta\cos\theta$ and $\cos\theta = \sqrt{1-x^2}$ to return to $x$.

The upper half of the circle $x^2 + y^2 = r^2$ is the graph of $\sqrt{r^2 - x^2}$. Substituting $x = rs$ and using the result above,

$$
\int_{-r}^r\sqrt{r^2 - x^2}\,dx = r^2\int_{-1}^1\sqrt{1-s^2}\,ds = r^2\Bigl[\frac{\arcsin s + s\sqrt{1-s^2}}{2}\Bigr]_{-1}^1 = r^2\cdot\frac{\frac\pi2 - (-\frac\pi2)}{2} = \frac{\pi r^2}{2}.
$$

So the whole disc has area $\pi r^2$. This confirms the familiar formula, but within this course it is not an independent proof: the derivative of $\sin$ rests on $\lim_{x\to0}\frac{\sin x}{x} = 1$, whose proof in [[calculus-1/limits#thm-sinx]] compared areas of circular sectors. A fully non-circular treatment defines $\sin$ and $\cos$ by power series ([[calculus-2/power-series]]) and $\pi$ through them; then this computation genuinely proves that the area of a disc is $\pi r^2$.
:::
:::

::: example A tangent substitution {#ex-tan-sub}
Find $\displaystyle\int\frac{dx}{(1 + x^2)^{3/2}}$.
::: solution
Put $x = \tan\theta$ with $\theta\in(-\frac\pi2,\frac\pi2)$, so $dx = \sec^2\theta\,d\theta$ and $1 + x^2 = \sec^2\theta$, hence $(1+x^2)^{3/2} = \sec^3\theta$ (as $\sec\theta>0$ there). Then

$$
\int\frac{dx}{(1+x^2)^{3/2}} = \int\frac{\sec^2\theta}{\sec^3\theta}\,d\theta = \int\cos\theta\,d\theta = \sin\theta + C = \frac{x}{\sqrt{1+x^2}} + C,
$$

using [[calculus-1/real-functions#ex-arc-compositions]] for $\sin(\arctan x)$. Differentiating confirms the answer.
:::
:::

The third type of substitution works in the same way. For instance, for $x>1$ put $x = \sec\theta$ with $0\le\theta<\frac\pi2$, so that $dx = \sec\theta\tan\theta\,d\theta$ and $\sqrt{x^2 - 1} = \tan\theta\ge0$. Then

$$
\int\frac{dx}{\sqrt{x^2-1}} = \int\frac{\sec\theta\tan\theta}{\tan\theta}\,d\theta = \int\sec\theta\,d\theta = \ln(\sec\theta + \tan\theta) + C = \ln\bigl(x + \sqrt{x^2-1}\bigr) + C.
$$

The answer is the inverse of the hyperbolic cosine of [[calculus-1/real-functions#eq-hyperbolic]], which explains why hyperbolic substitutions such as $x = \cosh t$ give an alternative route to the same integrals.

## Partial fractions

To integrate a rational function $p(x)/q(x)$, first make it **proper** ($\deg p<\deg q$) by polynomial division, then split it into simple pieces that can be integrated directly.

::: theorem Partial fraction decomposition {#thm-partial-fractions}
Let $p/q$ be a proper rational function, and factor $q$ into linear factors $(x - r)$ and irreducible quadratic factors $(x^2 + bx + c)$ with $b^2 < 4c$. Then $p/q$ is a sum of terms of the form

$$
\frac{A}{(x - r)^k} \qquad\text{and}\qquad \frac{Bx + C}{(x^2 + bx + c)^k},
$$

where, for each factor $(x - r)^m$ of $q$, the terms with $k = 1, \dots, m$ appear, and similarly for each quadratic factor; the constants $A$, $B$, $C$ are uniquely determined.
:::

::: proof {collapsed}
*Sketch.* That every real polynomial factors into real linear and irreducible quadratic factors is a consequence of the fundamental theorem of algebra: complex roots of real polynomials come in conjugate pairs $\alpha, \bar\alpha$, and $(x - \alpha)(x - \bar\alpha)$ is a real quadratic ([[complex-analysis/cauchy-theorem]] proves the fundamental theorem of algebra). If $q = q_1q_2$ with $q_1$ and $q_2$ having no common factor, the Euclidean algorithm for polynomials gives polynomials $s_1, s_2$ with $s_1q_1 + s_2q_2 = 1$, so $\frac{p}{q} = \frac{ps_2}{q_1} + \frac{ps_1}{q_2}$; repeating this splits $p/q$ into fractions whose denominators are powers of a single factor, and expanding the numerators in powers of that factor gives the terms listed. Uniqueness follows by comparing coefficients. See [[abstract-algebra/polynomials]] for the algebra.
:::

The constants are found by multiplying through by $q(x)$ and either comparing coefficients or substituting convenient values of $x$. For a simple linear factor $x - r$, substituting $x = r$ isolates its coefficient at once (the "cover-up" method): every other term still contains the factor $x - r$ and vanishes. A useful check on the form of the decomposition is to count unknowns. A linear factor repeated $m$ times contributes $m$ constants and a quadratic factor repeated $m$ times contributes $2m$, so the total number of unknowns always equals the degree of $q$ — exactly the number of coefficients that a proper fraction $p/q$ can have in its numerator. Comparing coefficients therefore produces a square system of linear equations, which the theorem guarantees has a unique solution.

::: example Partial fractions {#ex-partial-fractions}
Find (a) $\displaystyle\int\frac{x+5}{x^2 + x - 2}\,dx$, (b) $\displaystyle\int\frac{dx}{x^2(x+1)}$ and (c) $\displaystyle\int\frac{2x + 3}{x^2 + 2x + 5}\,dx$.
::: solution
(a) The denominator factors as $(x-1)(x+2)$, so we seek $\dfrac{x+5}{(x-1)(x+2)} = \dfrac{A}{x-1} + \dfrac{B}{x+2}$, that is, $x + 5 = A(x+2) + B(x-1)$. At $x = 1$: $6 = 3A$, so $A = 2$. At $x = -2$: $3 = -3B$, so $B = -1$. Hence

$$
\int\frac{x+5}{x^2+x-2}\,dx = 2\ln\abs{x-1} - \ln\abs{x+2} + C.
$$

(b) The repeated factor $x^2$ needs two terms: $\dfrac{1}{x^2(x+1)} = \dfrac Ax + \dfrac B{x^2} + \dfrac{C}{x+1}$, so $1 = Ax(x+1) + B(x+1) + Cx^2$. At $x = 0$: $B = 1$. At $x = -1$: $C = 1$. Comparing coefficients of $x^2$: $0 = A + C$, so $A = -1$. Hence

$$
\int\frac{dx}{x^2(x+1)} = -\ln\abs{x} - \frac1x + \ln\abs{x+1} + C.
$$

(c) The discriminant of $x^2 + 2x + 5$ is $4 - 20<0$, so it is irreducible. Complete the square, $x^2 + 2x + 5 = (x+1)^2 + 4$, and split the numerator into a multiple of the derivative of the denominator plus a constant: $2x + 3 = (2x + 2) + 1$. Then

$$
\int\frac{2x+3}{x^2+2x+5}\,dx = \int\frac{2x+2}{x^2+2x+5}\,dx + \int\frac{dx}{(x+1)^2 + 4} = \ln(x^2+2x+5) + \frac12\arctan\frac{x+1}{2} + C,
$$

using $u = x^2 + 2x + 5$ in the first integral and $u = \frac{x+1}{2}$ in the second.
:::
:::

::: application Logistic growth
A population $P(t)$ with limited resources is often modelled by the **logistic equation** $\frac{dP}{dt} = kP\bigl(1 - \frac PM\bigr)$, where $k>0$ is the growth rate and $M$ the carrying capacity. Separating the variables (a method justified in [[ode/first-order]]) leads to $\int\frac{M\,dP}{P(M-P)} = \int k\,dt$. Partial fractions give $\frac{M}{P(M-P)} = \frac1P + \frac{1}{M-P}$, so for $0<P<M$

$$
\ln\frac{P}{M-P} = kt + C, \qquad\text{hence}\qquad P(t) = \frac{M}{1 + Ae^{-kt}}
$$

for a constant $A>0$ fixed by the initial population. The resulting S-shaped curve — slow start, rapid middle, saturation at $M$ — describes the spread of epidemics and innovations, the growth of yeast cultures and the uptake of new technology.
:::

::: widget plot
f: 1/(x^2 - 1); 0.5/(x - 1); -0.5/(x + 1)
x: -4, 4
y: -5, 5
vlines: -1; 1
labels: \frac{1}{x^2-1}; \frac{1/2}{x-1}; \frac{-1/2}{x+1}
caption: The partial fraction decomposition $\frac{1}{x^2-1} = \frac{1/2}{x-1} - \frac{1/2}{x+1}$ splits a function with two vertical asymptotes into two simple hyperbolas, one for each asymptote. Hover at any $x$ and check that the blue value is the sum of the other two. Each hyperbola integrates to a logarithm, giving $\int\frac{dx}{x^2-1} = \frac12\ln\bigl\lvert\frac{x-1}{x+1}\bigr\rvert + C$.
:::

::: quiz
What is the correct form of the partial fraction decomposition of $\dfrac{3x+1}{(x-1)^2(x^2+1)}$?
- [ ] $\dfrac{A}{x-1} + \dfrac{B}{x^2+1}$
- [ ] $\dfrac{A}{(x-1)^2} + \dfrac{Bx + C}{x^2+1}$
- [x] $\dfrac{A}{x-1} + \dfrac{B}{(x-1)^2} + \dfrac{Cx+D}{x^2+1}$
- [ ] $\dfrac{A}{x-1} + \dfrac{B}{x-1} + \dfrac{C}{x^2+1}$
::: solution
The repeated linear factor $(x-1)^2$ contributes two terms, with denominators $x - 1$ and $(x-1)^2$, and the irreducible quadratic needs a *linear* numerator $Cx + D$. That makes four unknowns, matching the degree $4$ of the denominator.
:::
:::

## Integrals without elementary antiderivatives

With these techniques, together with algebraic manipulation, a great many integrals can be evaluated. A reasonable strategy is: simplify the integrand; look for a substitution (is the derivative of some inner expression present?); identify the type (product of different kinds of functions → parts; powers of trigonometric functions → identities; square roots of quadratics → trigonometric substitution; rational function → partial fractions); and if all else fails, try a different form of the integrand. Tables of integrals and computer algebra systems automate much of this.

::: example Which technique? {#ex-strategy}
Choose a method for each integral and evaluate it: (a) $\displaystyle\int\frac{x}{\sqrt{1-x^2}}\,dx$, (b) $\displaystyle\int\frac{x^2}{\sqrt{1-x^2}}\,dx$, (c) $\displaystyle\int\sqrt{x}\,\ln x\,dx$ and (d) $\displaystyle\int\frac{x^3+1}{x^2-x}\,dx$.
::: solution
(a) The numerator is, up to a factor, the derivative of $1 - x^2$, so substitute $u = 1 - x^2$, $du = -2x\,dx$: $\int\frac{x\,dx}{\sqrt{1-x^2}} = -\frac12\int u^{-1/2}\,du = -\sqrt{1 - x^2} + C$.

(b) The extra factor of $x$ spoils that substitution, as in the warning in the first section. The square root $\sqrt{1 - x^2}$ calls for $x = \sin\theta$, $dx = \cos\theta\,d\theta$:

$$
\int\frac{x^2}{\sqrt{1-x^2}}\,dx = \int\frac{\sin^2\theta}{\cos\theta}\cos\theta\,d\theta = \int\sin^2\theta\,d\theta = \frac\theta2 - \frac{\sin\theta\cos\theta}{2} + C = \frac{\arcsin x - x\sqrt{1-x^2}}{2} + C.
$$

(c) A product of a power and a logarithm: integrate by parts with $u = \ln x$ (the logarithm comes first in the guide) and $dv = x^{1/2}\,dx$, so $v = \frac23x^{3/2}$:

$$
\int\sqrt x\ln x\,dx = \frac23x^{3/2}\ln x - \frac23\int x^{1/2}\,dx = \frac23x^{3/2}\ln x - \frac49x^{3/2} + C.
$$

(d) A rational function that is not proper, so divide first: $x^3 + 1 = (x^2 - x)(x + 1) + (x + 1)$. Then split the proper part, $\frac{x+1}{x(x-1)} = -\frac1x + \frac{2}{x-1}$ (cover-up at $x = 0$ and $x = 1$):

$$
\int\frac{x^3+1}{x^2-x}\,dx = \int\Bigl(x + 1 - \frac1x + \frac{2}{x-1}\Bigr)dx = \frac{x^2}{2} + x - \ln\abs x + 2\ln\abs{x-1} + C.
$$
:::
:::

But some integrals cannot be done in closed form at all. To say precisely what this means we need a name for the functions we have been working with.

::: definition Elementary function {#def-elementary}
An **elementary function** is one that can be built from constants, the identity $x$, exponentials, logarithms, the trigonometric functions and their inverses by finitely many additions, subtractions, multiplications, divisions, compositions and extractions of roots.
:::

By FTC part 1, the continuous function $e^{-x^2}$ certainly has an antiderivative, namely $\int_0^xe^{-t^2}\,dt$; what fails is that this antiderivative is not an elementary function. The same is true of $\frac{\sin x}{x}$, $\sqrt{1 + x^3}$ and $\frac{1}{\ln x}$. Such antiderivatives are simply new functions; for example the **error function**

$$
\operatorname{erf}(x) = \frac{2}{\sqrt\pi}\int_0^xe^{-t^2}\,dt
$$

is as well understood, and as easily computed, as $\sin$ or $\ln$, and it gives the probabilities of the normal distribution in statistics ([[probability/continuous-random-variables]]). When a definite integral is needed numerically, refined Riemann sums do the job.

Another route is through infinite series. Integrating the series $e^{-t^2} = 1 - t^2 + \frac{t^4}{2!} - \frac{t^6}{3!} + \cdots$ term by term gives

$$
\int_0^xe^{-t^2}\,dt = x - \frac{x^3}{3} + \frac{x^5}{5\cdot2!} - \frac{x^7}{7\cdot3!} + \cdots,
$$

a formula that is valid for every $x$ and converges quickly for moderate $x$. Justifying term-by-term integration is one of the main themes of [[calculus-2/power-series]].

::: widget riemann
f: exp(-x^2)
a: 0
b: 1
n: 4
method: simpson
caption: Simpson's rule fits parabolas through consecutive triples of points. For $\int_0^1e^{-x^2}\,dx = 0.746824\ldots$, which has no elementary antiderivative, $n = 4$ subintervals already give $0.746855$, an error of $3\times10^{-5}$; doubling $n$ divides the error by about $16$. Compare with the midpoint and trapezoid rules, whose errors only fall by a factor of about $4$.
:::

::: application Numerical integration
Every serious computation of an integral that has no closed form — the arc length of an ellipse, the probability that a normally distributed quantity lies in a range, the energy radiated by a black body — uses numerical rules such as Simpson's. Their analysis, including why Simpson's error behaves like $1/n^4$ for smooth integrands and how adaptive methods concentrate effort where the integrand changes fastest, is part of [[numerical-analysis/numerical-integration]].
:::

::: history
Substitution and integration by parts were used from the very beginning of the calculus; Leibniz's notation, in which $du = g'(x)\,dx$, makes substitution almost automatic. In 1702 Leibniz and Johann Bernoulli independently showed how to integrate rational functions by splitting them into partial fractions. Leibniz, however, believed that $x^4 + a^4$ could not be factored into real quadratics — in fact $x^4 + a^4 = (x^2 + \sqrt2ax + a^2)(x^2 - \sqrt2ax + a^2)$ — and the general factorisation of real polynomials became secure only with the fundamental theorem of algebra, first proved (by modern standards with a gap) by Carl Friedrich Gauss in 1799. John Wallis used the integrals of powers of sine, in an equivalent form, to obtain his infinite product for $\pi$ in *Arithmetica infinitorum* (1656). In a series of papers in the 1830s Joseph Liouville proved that integrals such as $\int e^{-x^2}\,dx$ cannot be expressed in elementary terms, and in 1969 Robert Risch gave an algorithm that decides whether an elementary antiderivative exists — the basis of the integration routines in computer algebra systems.
:::

## Where this leads

The techniques of this chapter are used throughout the rest of the course: in [[calculus-1/integral-applications]] to compute areas, volumes and arc lengths, and in [[calculus-1/improper-integrals]] for integrals over infinite ranges. In several variables, substitution becomes the change of variables formula with its Jacobian determinant ([[multivariable/change-of-variables]]), and integration by parts becomes the divergence theorem ([[multivariable/stokes-divergence]]). Integration by parts is also the engine of Fourier analysis ([[pde/fourier-series]]), and partial fractions reappear in inverting Laplace transforms ([[ode/laplace-transform]]) and in evaluating integrals by residues ([[complex-analysis/residues]]).

::: summary
- Substitution, $\int f(g(x))g'(x)\,dx = \int f(u)\,du$ with $u = g(x)$, is the chain rule backwards; in definite integrals the limits change to $g(a)$ and $g(b)$.
- Integration by parts, $\int u\,dv = uv - \int v\,du$, is the product rule backwards; choose $u$ to simplify on differentiation. It also yields reduction formulas.
- Powers of sine and cosine: peel off one factor from an odd power and substitute, or halve even powers with the double-angle formulas.
- Trigonometric substitutions $x = a\sin\theta$, $a\tan\theta$, $a\sec\theta$ remove $\sqrt{a^2 - x^2}$, $\sqrt{a^2 + x^2}$, $\sqrt{x^2 - a^2}$.
- A proper rational function splits into partial fractions $\frac{A}{(x - r)^k}$ and $\frac{Bx + C}{(x^2 + bx + c)^k}$, which integrate to logarithms, powers and arctangents.
- Some elementary functions, such as $e^{-x^2}$, have no elementary antiderivative; their integrals define new functions or are computed numerically.
- Always check an antiderivative by differentiating it.
:::

## Exercises

::: exercise A substitution {level=1 check="(e - 1)/2"}
Evaluate $\displaystyle\int_0^1xe^{x^2}\,dx$.
::: solution
With $u = x^2$, $du = 2x\,dx$, and the limits become $0$ and $1$: $\displaystyle\frac12\int_0^1e^u\,du = \frac{e - 1}{2}$.
:::
:::

::: exercise The logarithm {level=1 check="1"}
Evaluate $\displaystyle\int_1^e\ln x\,dx$.
::: solution
By [[#ex-parts]](b), an antiderivative is $x\ln x - x$, so the integral is $(e\cdot1 - e) - (1\cdot0 - 1) = 1$.
:::
:::

::: exercise An even power {level=1 check="pi/4"}
Evaluate $\displaystyle\int_0^{\pi/2}\sin^2x\,dx$.
::: solution
Using $\sin^2x = \frac{1 - \cos 2x}{2}$: $\Bigl[\frac x2 - \frac{\sin2x}{4}\Bigr]_0^{\pi/2} = \frac\pi4$.
:::
:::

::: exercise Parts twice {level=2}
Find $\displaystyle\int x^2e^{-x}\,dx$.
::: solution
With $u = x^2$, $dv = e^{-x}\,dx$ ($v = -e^{-x}$): $\int x^2e^{-x}\,dx = -x^2e^{-x} + \int2xe^{-x}\,dx$. With $u = 2x$, $dv = e^{-x}\,dx$: $\int2xe^{-x}\,dx = -2xe^{-x} + \int2e^{-x}\,dx = -2xe^{-x} - 2e^{-x}$. Hence

$$
\int x^2e^{-x}\,dx = -e^{-x}(x^2 + 2x + 2) + C,
$$

which can be checked by differentiation.
:::
:::

::: exercise Partial fractions {level=2 check="ln(4/3)"}
Evaluate $\displaystyle\int_0^1\frac{dx}{x^2 + 3x + 2}$.
::: solution
$x^2 + 3x + 2 = (x+1)(x+2)$ and $\dfrac{1}{(x+1)(x+2)} = \dfrac{1}{x+1} - \dfrac{1}{x+2}$ (cover-up: $A = \frac{1}{-1+2}$, $B = \frac{1}{-2+1}$). So the integral is

$$
\Bigl[\ln\frac{x+1}{x+2}\Bigr]_0^1 = \ln\frac23 - \ln\frac12 = \ln\frac43 .
$$
:::
:::

::: exercise A substitution with a twist {level=2 check="(2 - sqrt(2))/3"}
Evaluate $\displaystyle\int_0^1\frac{x^3}{\sqrt{1 + x^2}}\,dx$.
::: hint
Put $u = 1 + x^2$ and write $x^3\,dx = x^2\cdot x\,dx = (u - 1)\cdot\frac12du$.
:::
::: solution
With $u = 1 + x^2$, $du = 2x\,dx$ and $x^2 = u - 1$; the limits become $1$ and $2$:

$$
\frac12\int_1^2\frac{u - 1}{\sqrt u}\,du = \frac12\Bigl[\frac23u^{3/2} - 2u^{1/2}\Bigr]_1^2 = \frac12\Bigl(\frac{4\sqrt2}{3} - 2\sqrt2 - \frac23 + 2\Bigr) = \frac{2 - \sqrt2}{3}.
$$
:::
:::

::: exercise Exponential times cosine {level=2}
Find $\displaystyle\int e^{2x}\cos x\,dx$.
::: solution
Let $I = \int e^{2x}\cos x\,dx$. With $u = e^{2x}$, $dv = \cos x\,dx$: $I = e^{2x}\sin x - 2\int e^{2x}\sin x\,dx$. Again with $u = e^{2x}$, $dv = \sin x\,dx$: $\int e^{2x}\sin x\,dx = -e^{2x}\cos x + 2I$. Hence $I = e^{2x}\sin x + 2e^{2x}\cos x - 4I$, so

$$
I = \frac{e^{2x}(\sin x + 2\cos x)}{5} + C.
$$
:::
:::

::: exercise Powers of the logarithm {level=3 check="6 - 2*e"}
Let $J_n = \displaystyle\int_1^e(\ln x)^n\,dx$. Prove that $J_n = e - nJ_{n-1}$ for $n\ge1$, and compute $J_3$.
::: solution
Integrate by parts with $u = (\ln x)^n$, $dv = dx$, so $du = n(\ln x)^{n-1}\frac{dx}{x}$ and $v = x$:

$$
J_n = \bigl[x(\ln x)^n\bigr]_1^e - n\int_1^e(\ln x)^{n-1}\,dx = e - nJ_{n-1},
$$

since $(\ln e)^n = 1$ and $\ln 1 = 0$. Starting from $J_0 = e - 1$: $J_1 = e - (e - 1) = 1$, $J_2 = e - 2$, and $J_3 = e - 3(e - 2) = 6 - 2e\approx0.563$.
:::
:::

::: exercise Wallis's integrals {#exr-wallis level=3 check="8/15"}
Using the reduction formula of [[#ex-reduction]], prove that

$$
\int_0^{\pi/2}\sin^{2n+1}x\,dx = \frac{2\cdot4\cdots(2n)}{3\cdot5\cdots(2n+1)}
$$

for $n\ge1$, and evaluate it for $n = 2$.
::: solution
We use induction on $n$. For $n = 1$, $I_3 = \frac23I_1 = \frac23$, since $I_1 = \int_0^{\pi/2}\sin x\,dx = 1$. If the formula holds for $n$, then by the reduction formula with exponent $2n+3$,

$$
I_{2n+3} = \frac{2n+2}{2n+3}I_{2n+1} = \frac{2\cdot4\cdots(2n)(2n+2)}{3\cdot5\cdots(2n+1)(2n+3)},
$$

which is the formula for $n + 1$. For $n = 2$: $I_5 = \frac{2\cdot4}{3\cdot5} = \frac{8}{15}$. (Comparing $I_{2n}$, $I_{2n+1}$ and $I_{2n+2}$, which decrease in $n$ because $0 \le \sin x\le1$, leads to Wallis's product $\frac\pi2 = \frac{2}{1}\cdot\frac23\cdot\frac43\cdot\frac45\cdot\frac65\cdots$.)
:::
:::

::: exercise The half-angle substitution {level=3 check="pi/(3*sqrt(3))"}
The substitution $t = \tan(x/2)$ turns any rational function of $\sin x$ and $\cos x$ into a rational function of $t$. Show that it gives $\sin x = \dfrac{2t}{1+t^2}$, $\cos x = \dfrac{1-t^2}{1+t^2}$ and $dx = \dfrac{2\,dt}{1+t^2}$, and use it to evaluate $\displaystyle\int_0^{\pi/2}\frac{dx}{2 + \cos x}$.
::: solution
With $\varphi = x/2\in(-\frac\pi2, \frac\pi2)$ and $t = \tan\varphi$, we have $\cos^2\varphi = \frac{1}{1+t^2}$, so

$$
\sin x = 2\sin\varphi\cos\varphi = 2\tan\varphi\cos^2\varphi = \frac{2t}{1+t^2}, \qquad \cos x = \cos^2\varphi - \sin^2\varphi = (1 - t^2)\cos^2\varphi = \frac{1-t^2}{1+t^2}.
$$

Also $x = 2\arctan t$, so $dx = \frac{2\,dt}{1+t^2}$. For the integral, $x = 0$ gives $t = 0$ and $x = \frac\pi2$ gives $t = 1$, and $2 + \cos x = \frac{2(1+t^2) + 1 - t^2}{1+t^2} = \frac{3 + t^2}{1+t^2}$. Hence

$$
\int_0^{\pi/2}\frac{dx}{2+\cos x} = \int_0^1\frac{2\,dt}{3 + t^2} = \frac{2}{\sqrt3}\Bigl[\arctan\frac{t}{\sqrt3}\Bigr]_0^1 = \frac{2}{\sqrt3}\cdot\frac\pi6 = \frac{\pi}{3\sqrt3}\approx0.6046.
$$
:::
:::
