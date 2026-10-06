A calculator can only add, subtract, multiply and divide. So how does it produce $\sin 0.3 = 0.295\,520\,206\,661\ldots$? The idea goes back to the tangent line of [[calculus-1/derivatives]]: near $0$, $\sin x \approx x$, because the line $y = x$ has the same value and the same slope as $\sin x$ at $0$. At $x = 0.3$ this gives $0.3$, with error about $0.0045$. If we also match the second and third derivatives we get the cubic $x - \frac{x^3}{6}$, which gives $0.2955$ with error $2\times10^{-5}$; matching up to the fifth derivative gives $x - \frac{x^3}{6} + \frac{x^5}{120} = 0.295\,520\,25$, with error $4\times10^{-8}$. Each extra matched derivative buys more digits.

The polynomials obtained by matching derivatives are **Taylor polynomials**, and the question "how large is the error?" is answered by **Taylor's theorem**, one of the most useful results in analysis. Letting the degree go to infinity gives **Taylor series**, and with them the standard series for $e^x$, $\sin x$, $\cos x$, $\ln(1+x)$ and $(1+x)^\alpha$. In [[calculus-2/power-series]] we found some of these series by manipulating the geometric series; here we derive them directly from the function, with an error estimate, and then put them to work on limits, integrals and approximations.

## Taylor polynomials

Suppose $f$ can be differentiated $n$ times at $a$. We look for the polynomial of degree at most $n$ that agrees with $f$ "to order $n$" at $a$: same value, same slope, same second derivative, and so on up to the $n$th derivative. Write the polynomial in powers of $x - a$, $p(x) = \sum_{k=0}^n b_k(x-a)^k$. Differentiating $k$ times and setting $x = a$ kills every term except $k!\,b_k$, so $p^{(k)}(a) = k!\,b_k$, and matching derivatives forces $b_k = f^{(k)}(a)/k!$.

::: definition Taylor polynomial {#def-taylor-poly}
Let $f$ be $n$ times differentiable at $a$. The **Taylor polynomial of degree $n$** of $f$ about $a$ is

$$
T_n(x) = \sum_{k=0}^{n}\frac{f^{(k)}(a)}{k!}(x-a)^k = f(a) + f'(a)(x - a) + \frac{f''(a)}{2!}(x-a)^2 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n .
$$ {#eq-taylor-poly}

When $a = 0$ it is also called the **Maclaurin polynomial**. The difference $R_n(x) = f(x) - T_n(x)$ is the **remainder**.
:::

The calculation before the definition proves the following characterisation.

::: proposition Taylor polynomials match derivatives {#prop-match}
$T_n$ is the unique polynomial $p$ of degree at most $n$ with $p^{(k)}(a) = f^{(k)}(a)$ for $k = 0, 1, \dots, n$.
:::

::: proof
For $p(x) = \sum_{j=0}^n b_j(x-a)^j$, differentiating $k$ times gives $p^{(k)}(x) = \sum_{j\ge k} j(j-1)\cdots(j-k+1)\,b_j(x-a)^{j-k}$, and at $x = a$ only the term $j = k$ survives: $p^{(k)}(a) = k!\,b_k$. So the conditions $p^{(k)}(a) = f^{(k)}(a)$ hold if and only if $b_k = f^{(k)}(a)/k!$ for every $k \le n$, that is, if and only if $p = T_n$.
:::

$T_0$ is the constant $f(a)$ and $T_1$ is the tangent line, the linear approximation of Calculus I. $T_2$ is the parabola that also matches the curvature, and so on.

::: example Maclaurin polynomials of $e^x$, $\sin x$ and $\cos x$ {#ex-maclaurin}
Find the Maclaurin polynomials of $e^x$, $\sin x$ and $\cos x$.
::: solution
For $f(x) = e^x$ every derivative is $e^x$, so $f^{(k)}(0) = 1$ and

$$
T_n(x) = 1 + x + \frac{x^2}{2!} + \cdots + \frac{x^n}{n!}.
$$

For $f(x) = \sin x$ the derivatives cycle through $\sin, \cos, -\sin, -\cos$, so their values at $0$ cycle through $0, 1, 0, -1$. Only odd powers appear, with alternating signs:

$$
\sin x:\quad T_{2m+1}(x) = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots + \frac{(-1)^mx^{2m+1}}{(2m+1)!}.
$$

Similarly the derivatives of $\cos x$ at $0$ cycle through $1, 0, -1, 0$, giving only even powers: $1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots$. Because $\sin$ is odd, its even-degree coefficients vanish, so $T_{2m+1} = T_{2m+2}$ for $\sin x$; this small fact improves error estimates below.
:::
:::

::: widget taylor
f: sin(x)
a: 0
n: 3
x: -2pi, 2pi
y: -3, 3
caption: Taylor polynomials of $\sin x$ about $0$. Raise the degree: each new odd degree hugs the sine curve over a wider interval (for $\sin x$, $T_{2m+1} = T_{2m+2}$), and the shaded remainder shrinks near $0$ first. Every non-constant polynomial eventually shoots off to $\pm\infty$, yet for each fixed $x$ the values converge to $\sin x$. Move the centre $a$ to see the polynomials re-anchor there.
:::

::: example A square root by hand {#ex-sqrt}
Find the Taylor polynomial of degree $2$ of $f(x) = \sqrt x$ about $a = 4$, and use it to estimate $\sqrt{4.1}$.
::: solution
The derivatives are $f'(x) = \frac12 x^{-1/2}$ and $f''(x) = -\frac14 x^{-3/2}$, so $f(4) = 2$, $f'(4) = \frac14$ and $f''(4) = -\frac14\cdot\frac18 = -\frac1{32}$. Hence

$$
T_2(x) = 2 + \frac{x-4}{4} - \frac{1}{2!}\cdot\frac{1}{32}(x-4)^2 = 2 + \frac{x-4}{4} - \frac{(x-4)^2}{64}.
$$

At $x = 4.1$: $T_2(4.1) = 2 + 0.025 - 0.000\,156\,25 = 2.024\,843\,75$. The true value is $\sqrt{4.1} = 2.024\,845\,673\ldots$, so the error is about $1.9\times10^{-6}$. The centre $a = 4$ was chosen because $\sqrt4$ and the derivatives there are easy to compute exactly, and $4.1$ is close to it.
:::
:::

::: quiz
A function satisfies $f(1) = 3$, $f'(1) = -2$ and $f''(1) = 4$. What is its Taylor polynomial of degree $2$ about $1$?
- [ ] $3 - 2x + 4x^2$
- [ ] $3 - 2(x-1) + 4(x-1)^2$
- [x] $3 - 2(x-1) + 2(x-1)^2$
- [ ] $3 - 2(x-1) + 8(x-1)^2$
::: solution
By [[#eq-taylor-poly]], $T_2(x) = f(1) + f'(1)(x-1) + \frac{f''(1)}{2!}(x-1)^2 = 3 - 2(x-1) + 2(x-1)^2$. Two common slips are forgetting the $\frac{1}{k!}$ and writing powers of $x$ instead of powers of $x - a$.
:::
:::

## Taylor's theorem

A Taylor polynomial is only useful together with a bound on the remainder. The following theorem expresses the remainder through the next derivative, evaluated at an unknown point.

::: theorem Taylor's theorem with Lagrange remainder {#thm-taylor}
Let $f$ be $n + 1$ times differentiable on an open interval $I$ containing $a$. For every $x \in I$ there is a number $c$ between $a$ and $x$ such that

$$
f(x) = T_n(x) + \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}.
$$ {#eq-lagrange}
:::

For $n = 0$ this is the mean value theorem, $f(x) = f(a) + f'(c)(x - a)$, and the proof is an extension of the proof of the mean value theorem via Rolle's theorem ([[calculus-1/mean-value-theorem]]).

::: proof
For $x = a$ there is nothing to prove, so fix $x \ne a$ in $I$. For $t$ between $a$ and $x$ define

$$
\varphi(t) = f(x) - \sum_{k=0}^n\frac{f^{(k)}(t)}{k!}(x - t)^k ,
$$

the error made when the Taylor polynomial is centred at $t$ instead of $a$. Then $\varphi(x) = 0$ and $\varphi(a) = R_n(x)$. Differentiating with the product rule, the $k$th term contributes $\frac{f^{(k+1)}(t)}{k!}(x-t)^k - \frac{f^{(k)}(t)}{(k-1)!}(x - t)^{k-1}$ (only the first part for $k = 0$), and the sum telescopes:

$$
\varphi'(t) = -\frac{f^{(n+1)}(t)}{n!}(x - t)^n .
$$ {#eq-phi-prime}

Now put $g(t) = \varphi(t) - \varphi(a)\left(\dfrac{x - t}{x - a}\right)^{n+1}$. Then $g(a) = \varphi(a) - \varphi(a) = 0$ and $g(x) = \varphi(x) = 0$. The function $g$ is continuous on the closed interval between $a$ and $x$ and differentiable inside it, so by Rolle's theorem there is $c$ strictly between $a$ and $x$ with $g'(c) = 0$:

$$
0 = g'(c) = -\frac{f^{(n+1)}(c)}{n!}(x-c)^n + \varphi(a)\,\frac{(n+1)(x - c)^n}{(x-a)^{n+1}}.
$$

Since $x - c \ne 0$ we can divide by $(x - c)^n$ and solve: $R_n(x) = \varphi(a) = \dfrac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$.
:::

The point $c$ depends on $x$ (and $n$) and is almost never known. What makes the theorem useful is that we can bound $f^{(n+1)}$ over the whole interval between $a$ and $x$.

::: corollary Taylor's inequality {#cor-taylor-bound}
If $\abs{f^{(n+1)}(t)} \le M$ for all $t$ between $a$ and $x$, then

$$
\abs{f(x) - T_n(x)} \le \frac{M}{(n+1)!}\abs{x - a}^{n+1}.
$$ {#eq-taylor-bound}
:::

::: proof
Take absolute values in [[#eq-lagrange]] and use $\abs{f^{(n+1)}(c)} \le M$.
:::

The bound shows the two forces at work: the factor $\abs{x - a}^{n+1}$ is small near the centre, and the factorial $(n+1)!$ in the denominator eventually beats any geometric growth of $M$.

::: example An error bound for the square root {#ex-sqrt-error}
Bound the error in the estimate $\sqrt{4.1} \approx 2.024\,843\,75$ of [[#ex-sqrt]].
::: solution
Here $n = 2$ and $f'''(t) = \frac38 t^{-5/2}$, which is positive and decreasing. For $4 \le t \le 4.1$, $f'''(t) \le f'''(4) = \frac38\cdot\frac1{32} = \frac{3}{256}$. By [[#eq-taylor-bound]],

$$
0 < R_2(4.1) \le \frac{3/256}{3!}(0.1)^3 = \frac{1}{512}\cdot 10^{-3} \approx 1.95\times10^{-6}.
$$

(The remainder is positive because $f'''(c) > 0$.) So $\sqrt{4.1}$ lies between $2.024\,843\,75$ and $2.024\,845\,70$. The actual error, $1.92\times10^{-6}$, is very close to the bound: the bound is sharp here because $f'''$ hardly changes between $4$ and $4.1$.
:::
:::

::: example Computing sin 0.3 {#ex-sin-error}
Show that $x - \frac{x^3}{6} + \frac{x^5}{120}$ approximates $\sin 0.3$ with error less than $5\times10^{-8}$.
::: solution
All derivatives of $\sin$ are bounded by $M = 1$. A naive use of [[#eq-taylor-bound]] with $n = 5$ gives $\frac{0.3^6}{6!} \approx 1.0\times10^{-6}$. But for $\sin x$ the degree-$5$ and degree-$6$ Maclaurin polynomials coincide (the $x^6$ coefficient is $-\sin 0/6! = 0$), so we may use $n = 6$:

$$
\abs{\sin 0.3 - T_6(0.3)} \le \frac{1}{7!}(0.3)^7 = \frac{0.000\,218\,7}{5040} \approx 4.34\times10^{-8}.
$$

Indeed $T_5(0.3) = 0.295\,520\,25$ while $\sin 0.3 = 0.295\,520\,206\,66\ldots$; the error, $4.33\times10^{-8}$, matches the bound almost exactly.
:::
:::

::: example Computing e {#ex-e-digits}
How many terms of $1 + 1 + \frac1{2!} + \frac{1}{3!} + \cdots$ guarantee $e$ to six decimal places (error below $5\times10^{-7}$)?
::: solution
With $f(x) = e^x$, $a = 0$ and $x = 1$, [[#eq-lagrange]] gives $R_n(1) = \frac{e^c}{(n+1)!}$ for some $0 < c < 1$, so $0 < R_n(1) < \frac{e}{(n+1)!} < \frac{3}{(n+1)!}$. For $n = 9$ the bound is $\frac{3}{10!} = 8.3\times10^{-7}$, not quite enough; for $n = 10$ it is $\frac{3}{11!} = 7.5\times10^{-8}$. So $T_{10}(1) = 2.718\,281\,801$ is within $7.5\times10^{-8}$ of $e$ (the actual error is $2.7\times10^{-8}$), and $e = 2.718\,282$ to six decimals. So $11$ terms, through $\frac{1}{10!}$, suffice.
:::
:::

Often we need an approximation that is good on a whole interval, not just at one point. Taylor's inequality handles this too: bound $\abs{x - a}^{n+1}$ by its largest value on the interval.

::: example A uniform error bound {#ex-uniform}
Show that $\cos x \approx 1 - \dfrac{x^2}{2} + \dfrac{x^4}{24}$ with error less than $3.3\times10^{-4}$ for all $x$ in $[-\frac\pi4, \frac\pi4]$.
::: solution
The polynomial is $T_4$ for $\cos x$ about $0$, and since the $x^5$ coefficient of $\cos$ is $0$ it is also $T_5$. All derivatives of $\cos$ are bounded by $1$, so for $\abs x \le \frac\pi4$, by [[#eq-taylor-bound]] with $n = 5$,

$$
\abs{\cos x - T_4(x)} \le \frac{\abs x^6}{6!} \le \frac{(\pi/4)^6}{720} \approx 3.26\times10^{-4}.
$$

The worst case is at the ends: at $x = \frac\pi4$, $T_4 = 0.707\,429$ while $\cos\frac\pi4 = 0.707\,107$, an error of $3.22\times10^{-4}$. A uniform bound like this, over a fixed interval, is what a library routine needs after range reduction (see the application below).
:::
:::

There is a second form of the remainder, which needs slightly more of $f$ but is exact and often easier to estimate. It is the form used in numerical analysis.

::: theorem Integral form of the remainder {#thm-integral-remainder}
If $f^{(n+1)}$ is continuous on an open interval $I$ containing $a$ and $x$, then

$$
R_n(x) = \frac{1}{n!}\int_a^x f^{(n+1)}(t)\,(x - t)^n\,dt .
$$
:::

::: proof
With $\varphi$ as in the proof of [[#thm-taylor]], $\varphi'$ is continuous, so by the fundamental theorem of calculus and [[#eq-phi-prime]],

$$
-R_n(x) = \varphi(x) - \varphi(a) = \int_a^x\varphi'(t)\,dt = -\frac{1}{n!}\int_a^x f^{(n+1)}(t)(x - t)^n\,dt.
$$
:::

::: remark Three forms of the remainder
The Lagrange form [[#eq-lagrange]] and the integral form describe the remainder exactly. A third, weaker statement needs only $n$ derivatives at the single point $a$: the **Peano form** says that $f(x) = T_n(x) + o\bigl((x-a)^n\bigr)$, meaning $\frac{R_n(x)}{(x-a)^n} \to 0$ as $x \to a$. It follows from $n - 1$ applications of L'Hôpital's rule and says that $T_n$ is the best polynomial approximation of degree $n$ *near* $a$, but it gives no numerical error bound. For computations with guaranteed accuracy use the Lagrange or integral form; for limits, the Peano form (or the big-O form below) is all that is needed.
:::

::: warning The Taylor polynomial is a local approximation
Taylor polynomials are excellent near the centre and can be useless far away. The degree-$5$ Maclaurin polynomial of $\sin x$ is accurate to $4\times10^{-8}$ at $x = 0.3$, but at $x = 6$ it gives $6 - 36 + 64.8 = 34.8$, while $\sin 6 \approx -0.28$. Always check that $\abs{x - a}^{n+1}/(n+1)!$ (times the derivative bound) is small *at the point you care about*, and choose the centre close to it.
:::

## Taylor series

If $f$ has derivatives of all orders at $a$, we can let $n \to \infty$.

::: definition Taylor series {#def-taylor-series}
If $f$ is infinitely differentiable at $a$, its **Taylor series** about $a$ is the power series

$$
\sum_{n=0}^\infty\frac{f^{(n)}(a)}{n!}(x-a)^n .
$$

For $a = 0$ it is the **Maclaurin series**. A function that equals its Taylor series on some open interval around each point of its domain is called **(real) analytic**.
:::

By [[calculus-2/power-series#cor-coefficients]], if $f$ is given by *any* power series centred at $a$, that series must be the Taylor series. But having a Taylor series is not the same as being equal to it. The partial sums of the Taylor series are the Taylor polynomials $T_n(x) = f(x) - R_n(x)$, which gives the criterion:

::: theorem Convergence of a Taylor series {#thm-taylor-convergence}
Let $f$ be infinitely differentiable on an interval containing $a$ and $x$. The Taylor series of $f$ about $a$ converges to $f(x)$ if and only if $R_n(x) \to 0$ as $n \to \infty$.
:::

::: proof
The $n$th partial sum of the Taylor series is $T_n(x) = f(x) - R_n(x)$, and $T_n(x) \to f(x)$ exactly when $R_n(x) \to 0$.
:::

::: theorem The exponential, sine and cosine series {#thm-exp-sin-cos}
For every real $x$,

$$
e^x = \sum_{n=0}^\infty\frac{x^n}{n!}, \qquad \sin x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n+1}}{(2n+1)!}, \qquad \cos x = \sum_{n=0}^\infty\frac{(-1)^nx^{2n}}{(2n)!}.
$$
:::

::: proof
For $\sin$ and $\cos$, every derivative is bounded by $M = 1$, so by [[#eq-taylor-bound]] $\abs{R_n(x)} \le \frac{\abs x^{n+1}}{(n+1)!}$. For $e^x$, all derivatives equal $e^t \le e^{\abs x}$ for $t$ between $0$ and $x$, so $\abs{R_n(x)} \le e^{\abs x}\frac{\abs x^{n+1}}{(n+1)!}$. In both cases $\frac{\abs x^{n+1}}{(n+1)!} \to 0$ for each fixed $x$ (factorials beat exponentials, [[calculus-2/sequences#thm-ratio-seq]]), so $R_n(x) \to 0$ and [[#thm-taylor-convergence]] applies.
:::

Not every infinitely differentiable function is analytic. The next example is the standard warning.

::: proposition A smooth function with zero Taylor series {#prop-flat}
Let $f(x) = e^{-1/x^2}$ for $x \ne 0$ and $f(0) = 0$. Then $f$ has derivatives of all orders on $\R$, and $f^{(n)}(0) = 0$ for every $n$. Consequently its Maclaurin series is identically $0$, and it converges to $f(x)$ only at $x = 0$.
:::

::: proof
*Claim 1: for $x \ne 0$, $f^{(n)}(x) = p_n(1/x)\,e^{-1/x^2}$ for some polynomial $p_n$.* For $n = 0$ take $p_0 = 1$. If it holds for $n$, then by the chain and product rules

$$
f^{(n+1)}(x) = \left(-\frac{1}{x^2}p_n'\!\left(\tfrac1x\right) + \frac{2}{x^3}p_n\!\left(\tfrac1x\right)\right)e^{-1/x^2},
$$

which has the same form with $p_{n+1}(u) = -u^2p_n'(u) + 2u^3p_n(u)$.

*Claim 2: $q(1/x)\,e^{-1/x^2} \to 0$ as $x \to 0$ for every polynomial $q$.* It suffices to treat $q(u) = u^m$. With $u = 1/\abs{x} \to \infty$, $\abs{x^{-m}e^{-1/x^2}} = u^m e^{-u^2} \le u^m e^{-u}$ for $u \ge 1$, and $u^me^{-u} \to 0$ because exponentials beat powers.

*Claim 3: $f^{(n)}(0) = 0$ for all $n$.* By induction: if $f^{(n)}(0) = 0$, then

$$
f^{(n+1)}(0) = \lim_{h\to0}\frac{f^{(n)}(h) - 0}{h} = \lim_{h\to0}\frac1h\,p_n\!\left(\tfrac1h\right)e^{-1/h^2} = 0
$$

by Claim 2 applied to the polynomial $u\,p_n(u)$. So all Maclaurin coefficients vanish, while $f(x) > 0$ for every $x \ne 0$.
:::

The function is extraordinarily flat at $0$ — $e^{-1/x^2}$ is about $4\times10^{-44}$ at $x = 0.1$ — so flat that every Taylor polynomial is $0$ and the remainder is the whole function. Functions of a complex variable cannot behave like this: a complex-differentiable function always equals its Taylor series near each point ([[complex-analysis/analytic-functions]]). The point of [[#prop-flat]] is that **convergence of the Taylor series to $f$ must be proved**, by showing $R_n(x) \to 0$ or by deriving the series from a known one.

::: quiz
Which statement is correct?
- [ ] If $f$ has derivatives of all orders at $a$, its Taylor series converges to $f$ near $a$.
- [ ] If the Taylor series of $f$ converges at $x$, it converges to $f(x)$.
- [x] The Taylor series of $f$ converges to $f(x)$ exactly when the remainders $R_n(x)$ tend to $0$.
- [ ] Every Taylor series has radius of convergence $\infty$.
::: solution
The third statement is [[#thm-taylor-convergence]]. The first two fail for $e^{-1/x^2}$, whose Taylor series at $0$ converges everywhere — to the zero function. The last fails for $\ln(1+x)$ or $\frac{1}{1-x}$, whose series have radius $1$.
:::
:::

### The binomial series

For a positive integer $m$, $(1+x)^m$ is a polynomial given by the binomial theorem. Newton's great discovery (around 1665) was that the same formula, continued for ever, works for fractional and negative exponents as well; the proof for every real exponent came much later, from Cauchy and Abel. For real $\alpha$ and integer $n \ge 0$ define the **binomial coefficient**

$$
\binom{\alpha}{n} = \frac{\alpha(\alpha-1)(\alpha-2)\cdots(\alpha - n + 1)}{n!}, \qquad \binom{\alpha}{0} = 1 .
$$

::: theorem Binomial series {#thm-binomial}
For every real $\alpha$ and every $x$ with $\abs x < 1$,

$$
(1 + x)^\alpha = \sum_{n=0}^\infty\binom{\alpha}{n}x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2!}x^2 + \frac{\alpha(\alpha-1)(\alpha-2)}{3!}x^3 + \cdots .
$$
:::

::: proof
If $\alpha$ is a non-negative integer, the coefficients vanish from $n = \alpha + 1$ on and this is the binomial theorem. Otherwise no coefficient vanishes, and $\abs{\binom{\alpha}{n+1}\big/\binom{\alpha}{n}} = \frac{\abs{\alpha - n}}{n+1} \to 1$, so the series has radius $1$ ([[calculus-2/power-series#thm-radius-formula]]). Let $g(x) = \sum\binom\alpha n x^n$ for $\abs x < 1$. Differentiating term by term,

$$
(1+x)g'(x) = \sum_{n\ge0}\left[(n+1)\binom{\alpha}{n+1} + n\binom\alpha n\right]x^n = \sum_{n\ge0}\alpha\binom{\alpha}{n}x^n = \alpha\,g(x),
$$

using $(n+1)\binom{\alpha}{n+1} = (\alpha - n)\binom\alpha n$. Now $h(x) = g(x)(1+x)^{-\alpha}$ has $h'(x) = (1+x)^{-\alpha-1}\bigl[(1+x)g'(x) - \alpha g(x)\bigr] = 0$ on $(-1, 1)$, so $h$ is constant, equal to $h(0) = 1$. Hence $g(x) = (1+x)^\alpha$.
:::

For example, $\alpha = \frac12$ gives the first series below, and $\alpha = -\frac12$ with $-x^2$ in place of $x$ gives the second:

$$
\sqrt{1+x} = 1 + \frac x2 - \frac{x^2}{8} + \frac{x^3}{16} - \cdots, \qquad \frac{1}{\sqrt{1 - x^2}} = 1 + \frac{x^2}{2} + \frac{3x^4}{8} + \frac{5x^6}{16} + \cdots .
$$

### Table of standard series

| function | series | valid for |
|---|---|---|
| $\dfrac{1}{1-x}$ | $\displaystyle\sum_{n\ge0} x^n = 1 + x + x^2 + \cdots$ | $-1 < x < 1$ |
| $e^x$ | $\displaystyle\sum_{n\ge0}\frac{x^n}{n!} = 1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots$ | all $x$ |
| $\sin x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n+1}}{(2n+1)!} = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$ | all $x$ |
| $\cos x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n)!} = 1 - \frac{x^2}{2} + \frac{x^4}{24} - \cdots$ | all $x$ |
| $\ln(1+x)$ | $\displaystyle\sum_{n\ge1}\frac{(-1)^{n+1}x^n}{n} = x - \frac{x^2}{2} + \frac{x^3}{3} - \cdots$ | $-1 < x \le 1$ |
| $\arctan x$ | $\displaystyle\sum_{n\ge0}\frac{(-1)^nx^{2n+1}}{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \cdots$ | $-1 \le x \le 1$ |
| $(1+x)^\alpha$ | $\displaystyle\sum_{n\ge0}\binom{\alpha}{n}x^n = 1 + \alpha x + \frac{\alpha(\alpha-1)}{2}x^2 + \cdots$ | $-1 < x < 1$ |

The logarithm and arctangent series were derived in [[calculus-2/power-series]]. New series are best obtained from these by substitution, multiplication, differentiation and integration rather than by computing high derivatives: for instance $e^{-x^2} = \sum\frac{(-1)^nx^{2n}}{n!}$ is immediate, while differentiating $e^{-x^2}$ ten times is not.

::: widget taylor
f: ln(1 + x)
a: 0
n: 5
x: -1, 3
y: -3, 3
caption: Taylor polynomials of $\ln(1+x)$ about $0$. For $-1 < x \le 1$ they converge as the degree grows; for $x > 1$ they diverge more and more violently, although $\ln(1+x)$ is perfectly smooth there. The radius of convergence is $1$, the distance from the centre to the singularity at $x = -1$. Move the centre $a$ to $1$ and the convergence interval becomes $(-1, 3]$.
:::

## Using Taylor series

### Limits

Taylor expansions turn indeterminate limits into algebra. The bookkeeping is done with **big-O notation**: $O(x^k)$ stands for a function bounded by a constant times $\abs x^k$ near $0$. By [[#cor-taylor-bound]], if $f^{(n+1)}$ is bounded near $0$ then $f(x) = T_n(x) + O(x^{n+1})$; for example $\sin x = x - \frac{x^3}{6} + O(x^5)$ and $\cos x = 1 - \frac{x^2}{2} + O(x^4)$.

::: example A limit by series {#ex-limit}
Find $\displaystyle\lim_{x\to0}\frac{x - \sin x}{x(1 - \cos x)}$.
::: solution
L'Hôpital's rule would need three rounds of differentiation. With series,

$$
x - \sin x = \frac{x^3}{6} + O(x^5), \qquad x(1 - \cos x) = \frac{x^3}{2} + O(x^5).
$$

Dividing numerator and denominator by $x^3$,

$$
\frac{x - \sin x}{x(1-\cos x)} = \frac{\frac16 + O(x^2)}{\frac12 + O(x^2)} \to \frac{1/6}{1/2} = \frac13 .
$$
:::
:::

::: warning Expand far enough, and keep the error terms
In $\lim_{x\to0}\frac{x - \sin x}{x^3}$, using only $\sin x \approx x$ gives $\frac{0}{x^3}$ and the false answer $0$: the approximation discarded exactly the term that matters. Expand until the leading terms no longer cancel, and carry an $O(\cdot)$ term to show what was discarded. Also do not substitute a series outside its interval of validity — $\ln(1+x)$ about $0$ is useless at $x = 2$.
:::

### Integrals

Many functions have no elementary antiderivative, but their series can be integrated term by term inside the interval of convergence ([[calculus-2/power-series#thm-termwise]]).

::: example The Gaussian integral on [0, 1] {#ex-gauss-integral}
Compute $\displaystyle\int_0^1 e^{-x^2}\,dx$ with error less than $10^{-4}$.
::: solution
Substituting $-x^2$ into the exponential series, $e^{-x^2} = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{n!}$ for all $x$. Integrating term by term over $[0,1]$,

$$
\int_0^1e^{-x^2}\,dx = \sum_{n=0}^\infty\frac{(-1)^n}{n!\,(2n+1)} = 1 - \frac13 + \frac{1}{10} - \frac{1}{42} + \frac{1}{216} - \frac{1}{1320} + \frac{1}{9360} - \frac{1}{75600} + \cdots .
$$

This is an alternating series with decreasing terms, so the error is at most the first omitted term ([[calculus-2/convergence-tests#thm-alternating]]). The term $\frac{1}{9360} \approx 1.07\times10^{-4}$ is still too big, but $\frac{1}{75600} \approx 1.3\times10^{-5}$ is small enough. So the sum of the first seven terms, $0.746\,836$, is within $1.3\times10^{-5}$ of the integral. (The true value is $0.746\,824\,1$.) This integral is $\frac{\sqrt\pi}{2}\operatorname{erf}(1)$, central in probability ([[probability/continuous-random-variables]]).
:::
:::

### Sums

Recognising a numerical series as a standard Taylor series evaluated at a particular point gives its exact sum.

::: example Summing series with the table {#ex-sums}
Find (a) $\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{2^n\,n!}$ and (b) $\displaystyle\sum_{n=0}^\infty\frac{n+1}{n!}$.
::: solution
(a) This is $\sum\frac{x^n}{n!}$ with $x = -\frac12$, so the sum is $e^{-1/2} = 0.606\,53\ldots$

(b) Split the numerator. For $n \ge 1$, $\frac{n}{n!} = \frac{1}{(n-1)!}$, so

$$
\sum_{n=0}^\infty\frac{n+1}{n!} = \sum_{n=1}^\infty\frac{1}{(n-1)!} + \sum_{n=0}^\infty\frac{1}{n!} = e + e = 2e .
$$

Shifting the index ($m = n - 1$) to recognise a known series is the key step. The same idea with $x\frac{d}{dx}$ applied to $e^x = \sum\frac{x^n}{n!}$ gives $\sum\frac{n\,x^n}{n!} = xe^x$.
:::
:::

::: application Physics: when is a formula "approximately classical"?
The kinetic energy of a particle of mass $m$ and speed $v$ in special relativity is $E_k = mc^2\left((1 - v^2/c^2)^{-1/2} - 1\right)$. The binomial series with $\alpha = -\frac12$ and $x = -v^2/c^2$ gives

$$
E_k = mc^2\left(\frac12\frac{v^2}{c^2} + \frac38\frac{v^4}{c^4} + \cdots\right) = \frac12mv^2 + \frac38\frac{mv^4}{c^2} + \cdots .
$$

The first term is Newton's kinetic energy; the second measures the relativistic correction, which is negligible unless $v$ is a sizeable fraction of $c$. The same reasoning lies behind the small-angle approximation $\sin\theta \approx \theta$ for the pendulum and countless other "first-order" approximations in science.
:::

::: application How computers really evaluate functions
Software libraries do not simply sum Taylor series. To compute $\sin x$, they first use periodicity and symmetry to reduce $x$ to a small interval such as $\abs{x} \le \frac\pi4$ (**range reduction**), then evaluate a polynomial of modest degree. Its coefficients are usually slightly adjusted from the Taylor coefficients to minimise the *maximum* error over the whole interval (a *minimax* polynomial) instead of being exact at a single point. Taylor's theorem is still the starting point: it shows that a polynomial of degree about $15$ suffices for double precision on such an interval. See [[numerical-analysis/floating-point]] and [[numerical-analysis/interpolation]].
:::

::: quiz
Using $e^u = 1 + u + \frac{u^2}{2} + O(u^3)$ and $\sin x = x + O(x^3)$, what is the coefficient of $x^2$ in the Maclaurin series of $e^{\sin x}$?
- [ ] $0$
- [x] $\frac12$
- [ ] $1$
- [ ] $-\frac16$
::: solution
Substitute $u = \sin x = x + O(x^3)$: $e^{\sin x} = 1 + \left(x + O(x^3)\right) + \frac12\left(x + O(x^3)\right)^2 + O(x^3) = 1 + x + \frac{x^2}{2} + O(x^3)$. The coefficient is $\frac12$. (Carrying more terms gives $e^{\sin x} = 1 + x + \frac{x^2}{2} - \frac{x^4}{8} + \cdots$: the $x^3$ terms cancel.)
:::
:::

::: widget taylor
f: sqrt(x)
a: 4
n: 2
x: 0, 12
y: 0, 4
caption: Taylor polynomials of $\sqrt x$ about $a = 4$, as in [[#ex-sqrt]]. Near $x = 4$ even degree $2$ is excellent. Raise the degree and watch the approximation improve on $(0, 8)$ but deteriorate beyond $x = 8$: the series has radius $4$, the distance from the centre to $x = 0$, where $\sqrt x$ is not differentiable.
:::

::: history
James Gregory knew how to expand functions in what we call Taylor series by 1671, as letters to John Collins show, and Newton used similar expansions. Brook Taylor published the general formula in his *Methodus incrementorum directa et inversa* (1715), deriving it from finite-difference interpolation, without any discussion of convergence. Colin Maclaurin's *Treatise of Fluxions* (1742) made the case $a = 0$ popular, hence "Maclaurin series". Joseph-Louis Lagrange, who hoped to base all of calculus on power series, found the remainder formula [[#eq-lagrange]] in his *Théorie des fonctions analytiques* (1797). In 1823 Augustin-Louis Cauchy showed with the function $e^{-1/x^2}$ that a function is not determined by its Taylor series, which ended Lagrange's programme and made remainder estimates indispensable.
:::

## Where this leads

Taylor's theorem is the main tool for error estimates throughout numerical analysis: it bounds rounding effects in [[numerical-analysis/floating-point]], proves the quadratic convergence of Newton's method in [[numerical-analysis/root-finding]], and gives the error of interpolation, quadrature and ODE solvers in [[numerical-analysis/interpolation]], [[numerical-analysis/numerical-integration]] and [[numerical-analysis/numerical-odes]]. In several variables it becomes the second-derivative test with the Hessian ([[multivariable/extrema]]). Complex analysis explains which functions are analytic and why radii of convergence are what they are ([[complex-analysis/analytic-functions]]).

::: summary
- The Taylor polynomial $T_n(x) = \sum_{k\le n}\frac{f^{(k)}(a)}{k!}(x - a)^k$ is the unique polynomial of degree $\le n$ matching $f$ and its first $n$ derivatives at $a$.
- Taylor's theorem: $f(x) - T_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$ for some $c$ between $a$ and $x$; hence $\abs{R_n(x)} \le \frac{M}{(n+1)!}\abs{x-a}^{n+1}$ when $\abs{f^{(n+1)}} \le M$.
- The remainder also equals $\frac{1}{n!}\int_a^x f^{(n+1)}(t)(x-t)^n\,dt$.
- The Taylor series converges to $f(x)$ exactly when $R_n(x) \to 0$; this holds for $e^x$, $\sin x$, $\cos x$ for all $x$, but fails for the flat function $e^{-1/x^2}$.
- Standard series: geometric, exponential, sine, cosine, logarithm, arctangent and the binomial series $(1+x)^\alpha = \sum\binom\alpha nx^n$; derive new ones by substitution and term-by-term operations.
- Series turn indeterminate limits into algebra (expand until the leading terms do not cancel) and integrate functions without elementary antiderivatives, with error bounds.
:::

## Exercises

::: exercise A coefficient {level=1 check="4/3"}
Find the coefficient of $x^3$ in the Maclaurin series of $e^{2x}$.
::: solution
Substituting $2x$ into the exponential series, $e^{2x} = \sum\frac{(2x)^n}{n!}$, so the coefficient of $x^3$ is $\frac{2^3}{3!} = \frac86 = \frac43$. (Equivalently, $f'''(0)/3! = 8/6$.)
:::
:::

::: exercise A limit {level=1 check="1/2"}
Use series to find $\displaystyle\lim_{x\to0}\frac{e^x - 1 - x}{x^2}$.
::: solution
$e^x - 1 - x = \frac{x^2}{2} + \frac{x^3}{6} + \cdots = \frac{x^2}{2} + O(x^3)$, so the quotient is $\frac12 + O(x) \to \frac12$.
:::
:::

::: exercise Multiplying by a power {level=1 check="-1/6"}
Find the coefficient of $x^5$ in the Maclaurin series of $x^2e^{-x}$.
::: solution
$x^2e^{-x} = x^2\sum_{n\ge0}\frac{(-1)^nx^n}{n!} = \sum_{n\ge0}\frac{(-1)^nx^{n+2}}{n!}$. The power $x^5$ comes from $n = 3$, with coefficient $\frac{(-1)^3}{3!} = -\frac16$.
:::
:::

::: exercise A logarithmic limit {level=2 check="1/3"}
Find $\displaystyle\lim_{x\to0}\frac{\ln(1+x) - x + \frac{x^2}{2}}{x^3}$.
::: solution
From the table, $\ln(1+x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$ for $\abs x < 1$, so the numerator is $\frac{x^3}{3} + O(x^4)$ and the limit is $\frac13$.
:::
:::

::: exercise Choosing the degree {level=2 check="7"}
Using Taylor's inequality with the bound $e^{t} < 2$ for $0 \le t \le \frac12$, find the smallest $n$ for which the Maclaurin polynomial $T_n$ of $e^x$ is guaranteed to approximate $e^{0.5}$ with error less than $10^{-6}$.
::: solution
By [[#cor-taylor-bound]] with $M = 2$, $\abs{R_n(0.5)} \le \dfrac{2\,(0.5)^{n+1}}{(n+1)!}$. For $n = 6$ this is $\frac{2}{128\cdot5040} \approx 3.1\times10^{-6}$, too big; for $n = 7$ it is $\frac{2}{256\cdot 40320} \approx 1.9\times10^{-7} < 10^{-6}$. So $n = 7$.
:::
:::

::: exercise A non-elementary integral {level=2}
Use a series to compute $\displaystyle\int_0^1\frac{\sin x}{x}\,dx$ with error less than $10^{-4}$.
::: solution
For $x \ne 0$, $\frac{\sin x}{x} = \sum_{n\ge0}\frac{(-1)^nx^{2n}}{(2n+1)!}$ (and the series gives the continuous extension with value $1$ at $0$). Integrating term by term,

$$
\int_0^1\frac{\sin x}{x}\,dx = \sum_{n=0}^\infty\frac{(-1)^n}{(2n+1)\,(2n+1)!} = 1 - \frac{1}{18} + \frac{1}{600} - \frac{1}{35280} + \cdots .
$$

The series alternates with decreasing terms; $\frac{1}{35280} \approx 2.8\times10^{-5} < 10^{-4}$, so three terms suffice: $1 - 0.055\,556 + 0.001\,667 = 0.946\,11$, within $2.8\times10^{-5}$ of the integral. (The true value is $0.946\,083$.)
:::
:::

::: exercise The arcsine series {level=2 check="3/40"}
Using the binomial series for $(1 - t^2)^{-1/2}$, find the Maclaurin series of $\arcsin x$ up to the term in $x^5$. What is the coefficient of $x^5$?
::: solution
With $\alpha = -\frac12$ and $x = -t^2$: $\binom{-1/2}{1} = -\frac12$ and $\binom{-1/2}{2} = \frac{(-\frac12)(-\frac32)}{2} = \frac38$, so for $\abs t < 1$

$$
\frac{1}{\sqrt{1-t^2}} = 1 + \frac12t^2 + \frac38t^4 + \cdots .
$$

Since $\arcsin x = \int_0^x\frac{dt}{\sqrt{1 - t^2}}$, integrating term by term gives $\arcsin x = x + \frac{x^3}{6} + \frac{3x^5}{40} + \cdots$ for $\abs x < 1$. The coefficient of $x^5$ is $\frac{3}{40}$.
:::
:::

::: exercise A composite limit {level=2 check="1/2"}
Find $\displaystyle\lim_{x\to0}\frac{e^{\sin x} - 1 - x}{x^2}$.
::: solution
From the last quick check, $e^{\sin x} = 1 + x + \frac{x^2}{2} + O(x^3)$. Hence the quotient is $\frac12 + O(x) \to \frac12$.
:::
:::

::: exercise The second-derivative test {level=3}
Let $f''$ be continuous on an open interval containing $a$, with $f'(a) = 0$ and $f''(a) > 0$. Use Taylor's theorem to prove that $f$ has a strict local minimum at $a$.
::: solution
By continuity of $f''$ and $f''(a) > 0$, there is $\delta > 0$ such that $f''(t) > 0$ for $\abs{t - a} < \delta$. For $0 < \abs{x - a} < \delta$, [[#thm-taylor]] with $n = 1$ gives $c$ between $a$ and $x$ (so $\abs{c - a} < \delta$) with

$$
f(x) = f(a) + f'(a)(x-a) + \frac{f''(c)}{2}(x-a)^2 = f(a) + \frac{f''(c)}{2}(x-a)^2 > f(a).
$$

So $f(x) > f(a)$ for all $x \ne a$ within $\delta$ of $a$: a strict local minimum.
:::
:::

::: exercise e is irrational {level=3}
Prove that $e$ is irrational.
::: hint
Suppose $e = p/q$ with integers $p, q$ and $q \ge 2$. Multiply Taylor's formula $e = \sum_{k=0}^q\frac{1}{k!} + R_q(1)$ by $q!$.
:::
::: solution
Suppose $e = p/q$ with positive integers $p, q$; replacing $p/q$ by $2p/2q$ if necessary, we may assume $q \ge 2$. By [[#thm-taylor]] with $f = \exp$, $a = 0$, $x = 1$ and $n = q$,

$$
e = \sum_{k=0}^q\frac{1}{k!} + \frac{e^c}{(q+1)!} \quad\text{for some } 0 < c < 1 .
$$

Multiply by $q!$: the number $N = q!\,e - \sum_{k=0}^q\frac{q!}{k!}$ is an integer, because $q!\,e = p\,(q-1)!$ and each $q!/k!$ is an integer. But $N = \frac{e^c}{q+1}$, and $1 < e^c < e < 3$, so $0 < N < \frac{3}{q+1} \le 1$. No integer lies strictly between $0$ and $1$, a contradiction. Hence $e$ is irrational.
:::
:::
