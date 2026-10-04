How much work is needed to send a rocket of mass $m$ from the surface of the Earth to infinity? Gravity pulls with force $GMm/r^2$ at distance $r$ from the centre, so by [[calculus-1/integral-applications#def-work]] the work needed to go from the surface, at distance $R$ from the centre, to distance $t$ from the centre is

$$
\int_R^t\frac{GMm}{r^2}\,dr = GMm\Bigl(\frac1R - \frac1t\Bigr).
$$

As $t\to\infty$ this approaches the *finite* value $GMm/R$: escaping the Earth's gravity for ever takes a finite amount of energy. Equating it with the kinetic energy $\frac12mv^2$ gives the **escape velocity** $v = \sqrt{2GM/R}\approx11.2$ km/s.

The Riemann integral of [[calculus-1/integrals]] is defined only for bounded functions on bounded intervals, yet questions like this one — and the total probability or the mean of a waiting time, as in [[calculus-1/integral-applications#ex-exponential-wait]] — need integrals over infinite intervals, or of functions that blow up. In this chapter we define such **improper integrals** as limits of ordinary integrals, compute the basic examples, and develop comparison tests that decide convergence without computing anything. Along the way we meet the gamma function, which extends the factorial to non-integers, and a horn with finite volume but infinite surface area.

## Integrals over infinite intervals

::: definition Improper integral over an infinite interval {#def-improper-infinite}
Suppose $f$ is integrable on $[a, t]$ for every $t>a$. If the limit

$$
\int_a^\infty f(x)\,dx = \lim_{t\to\infty}\int_a^tf(x)\,dx
$$

exists (as a real number), the improper integral **converges** to that value; otherwise it **diverges**. Integrals $\int_{-\infty}^bf(x)\,dx = \lim_{t\to-\infty}\int_t^bf(x)\,dx$ are defined in the same way. Finally,

$$
\int_{-\infty}^\infty f(x)\,dx = \int_{-\infty}^cf(x)\,dx + \int_c^\infty f(x)\,dx,
$$

where $c$ is any real number, provided **both** integrals on the right converge.
:::

By additivity, the choice of $c$ in the last part does not matter. In practice we find an antiderivative $G$, evaluate $\int_a^tf = G(t) - G(a)$, and take the limit.

::: example Three basic examples {#ex-improper-basic}
Evaluate (a) $\displaystyle\int_1^\infty\frac{dx}{x^2}$, (b) $\displaystyle\int_1^\infty\frac{dx}{x}$ and (c) $\displaystyle\int_{-\infty}^\infty\frac{dx}{1+x^2}$.
::: solution
(a) $\displaystyle\int_1^t\frac{dx}{x^2} = \Bigl[-\frac1x\Bigr]_1^t = 1 - \frac1t\to1$ as $t\to\infty$. The integral converges to $1$: the infinitely long region under $1/x^2$ has area $1$.

(b) $\displaystyle\int_1^t\frac{dx}{x} = \ln t\to\infty$, so the integral diverges. Although $1/x\to0$, it does not decrease fast enough.

(c) Split at $0$. Since $\int_0^t\frac{dx}{1+x^2} = \arctan t\to\frac\pi2$ as $t\to\infty$, and by symmetry $\int_t^0\frac{dx}{1+x^2} = -\arctan t\to\frac\pi2$ as $t\to-\infty$, both halves converge and

$$
\int_{-\infty}^\infty\frac{dx}{1+x^2} = \frac\pi2 + \frac\pi2 = \pi .
$$
:::
:::

Examples (a) and (b) are the two sides of a dividing line between powers.

::: theorem The p-test at infinity {#thm-p-infinity}
The integral $\displaystyle\int_1^\infty\frac{dx}{x^p}$ converges if $p>1$, with value $\dfrac{1}{p-1}$, and diverges if $p\le1$.
:::

::: proof
For $p = 1$ this is [[#ex-improper-basic]](b). For $p\neq1$,

$$
\int_1^t\frac{dx}{x^p} = \Bigl[\frac{x^{1-p}}{1-p}\Bigr]_1^t = \frac{t^{1-p} - 1}{1-p}.
$$

If $p>1$ then $1 - p<0$ and $t^{1-p}\to0$, so the integral tends to $\frac{-1}{1-p} = \frac{1}{p-1}$. If $p<1$ then $t^{1-p}\to\infty$ and the integral diverges.
:::

::: intuition Why 1/x is the borderline
Cut $[1,\infty)$ into the doubling intervals $[1,2], [2,4], [4,8], \dots$ For $f(x) = \frac1x$, each piece contributes the same area: $\int_{2^k}^{2^{k+1}}\frac{dx}{x} = \ln2$, because the interval doubles in length while the function halves in height. Infinitely many equal contributions add up to infinity. For $\frac{1}{x^2}$ the height falls by a factor $4$ while the width doubles, so the contributions $\frac12, \frac14, \frac18, \dots$ halve each time and form a convergent geometric series. Any power $x^{-p}$ with $p>1$ behaves like the second case, and any $p<1$ like an even worse version of the first.
:::

::: widget plot
f: x^(-p); 1/x
sliders: p=1.5:0.3:2.5:0.05
x: 0, 20
y: 0, 1.5
shade: 1, 20
labels: x^{-p}; 1/x
caption: The shaded area is $\int_1^{20}x^{-p}\,dx = \frac{1 - 20^{1-p}}{p-1}$. Imagine sliding the right end of the shading off to infinity. For $p>1$ the area stays below $\frac{1}{p-1}$; at $p = 1$ (the orange curve $1/x$) it grows like $\ln t$ without bound. The curves look almost identical far out — convergence is decided by *how fast* the tail decays, not by whether it tends to $0$.
:::

::: quiz
What is $\displaystyle\int_1^\infty x^{-3/2}\,dx$?
- [ ] It diverges
- [ ] $\tfrac23$
- [x] $2$
- [ ] $\tfrac12$
::: solution
By [[#thm-p-infinity]] with $p = \frac32>1$, the integral converges to $\frac{1}{p-1} = 2$. Directly: $\int_1^tx^{-3/2}\,dx = \bigl[-2x^{-1/2}\bigr]_1^t = 2 - \frac{2}{\sqrt t}\to2$.
:::
:::

::: warning Both tails must converge separately
It is tempting to define $\int_{-\infty}^\infty f$ as $\lim_{t\to\infty}\int_{-t}^tf$. That would make $\int_{-\infty}^\infty x\,dx = 0$, since $\int_{-t}^tx\,dx = 0$ for every $t$. But $\int_0^\infty x\,dx$ diverges, so by our definition $\int_{-\infty}^\infty x\,dx$ diverges. The symmetric limit, called the **Cauchy principal value**, is useful in some contexts, but it hides divergence by letting two infinite areas cancel; it can even change if the cut-offs are moved asymmetrically, since $\int_{-t}^{2t}x\,dx = \frac32t^2\to\infty$.
:::

::: quiz
For every $t>0$ we have $\int_{-t}^tx^3\,dx = 0$. Does $\displaystyle\int_{-\infty}^\infty x^3\,dx$ converge?
- [ ] Yes, to $0$, because $x^3$ is odd
- [x] No
- [ ] Yes, to $\infty$
- [ ] It depends on where the integral is split
::: solution
By [[#def-improper-infinite]] we need $\int_0^\infty x^3\,dx$ and $\int_{-\infty}^0x^3\,dx$ to converge separately, and $\int_0^tx^3\,dx = t^4/4\to\infty$. So the integral diverges, even though its principal value is $0$. The choice of splitting point never affects convergence.
:::
:::

## Integrals of unbounded functions

The second kind of improper integral has a finite interval but an integrand that blows up at a point.

::: definition Improper integral of an unbounded function {#def-improper-unbounded}
Suppose $f$ is integrable on $[t, b]$ for every $t\in(a,b)$ but unbounded near $a$. Then

$$
\int_a^bf(x)\,dx = \lim_{t\to a^+}\int_t^bf(x)\,dx,
$$

and the integral **converges** if this limit exists. A singularity at the right endpoint is treated with $\lim_{t\to b^-}\int_a^t f$. If $f$ is unbounded near an interior point $c$, then $\int_a^bf = \int_a^cf + \int_c^bf$, provided both converge.
:::

If $f$ happens to be continuous on all of $[a,b]$, the limit simply returns the ordinary integral (by continuity of $t \mapsto \int_t^bf$), so the definitions are consistent.

The rules of [[calculus-1/integration-techniques]] carry over to improper integrals: apply them on a bounded interval $[a,t]$ (or $[t,b]$), where they are valid, and then take the limit. For instance, with $u = x^2$,

$$
\int_0^\infty xe^{-x^2}\,dx = \lim_{t\to\infty}\frac12\int_0^{t^2}e^{-u}\,du = \lim_{t\to\infty}\frac{1 - e^{-t^2}}{2} = \frac12,
$$

which is what one gets by blindly changing the limits $0$ and $\infty$ to $u = 0$ and $u = \infty$. Such shortcuts are safe when the substitution is monotonic and every integral involved converges; when in doubt, return to the definition. Integration by parts needs extra care, because the boundary term $\bigl[uv\bigr]_a^t$ must itself have a limit — as it does in the gamma function computation below.

::: theorem The p-test at zero {#thm-p-zero}
The integral $\displaystyle\int_0^1\frac{dx}{x^p}$ converges if $p<1$, with value $\dfrac{1}{1-p}$, and diverges if $p\ge1$.
:::

::: proof
For $p = 1$, $\int_t^1\frac{dx}{x} = -\ln t\to\infty$ as $t\to0^+$. For $p\neq1$,

$$
\int_t^1\frac{dx}{x^p} = \frac{1 - t^{1-p}}{1-p}.
$$

If $p<1$ then $t^{1-p}\to0$ as $t\to0^+$ and the limit is $\frac{1}{1-p}$; if $p>1$ then $t^{1-p}\to\infty$.
:::

The two $p$-tests point in opposite directions: near infinity, high powers of $1/x$ are integrable because they decay quickly; near zero, low powers are integrable because they blow up slowly. Only $1/x$ fails at both ends.

::: example A logarithm and a hidden singularity {#ex-improper-unbounded}
Evaluate (a) $\displaystyle\int_0^1\ln x\,dx$ and (b) $\displaystyle\int_0^3\frac{dx}{(x-1)^{2/3}}$.
::: solution
(a) The integrand tends to $-\infty$ as $x\to0^+$. Using the antiderivative $x\ln x - x$ ([[calculus-1/integration-techniques#ex-parts]]),

$$
\int_t^1\ln x\,dx = (0 - 1) - (t\ln t - t) \longrightarrow -1 \qquad (t\to0^+),
$$

because $t\ln t\to0$ ([[calculus-1/mean-value-theorem#ex-indeterminate]]). So the integral converges to $-1$.

(b) The singularity is at the interior point $x = 1$, so we must split there. An antiderivative is $3(x-1)^{1/3}$, and it is continuous, so the one-sided limits are easy:

$$
\int_0^1\frac{dx}{(x-1)^{2/3}} = \lim_{t\to1^-}\Bigl[3(x-1)^{1/3}\Bigr]_0^t = 0 - 3(-1) = 3, \qquad \int_1^3\frac{dx}{(x-1)^{2/3}} = 3\cdot2^{1/3} - 0.
$$

Both converge, so the integral equals $3 + 3\sqrt[3]{2}\approx6.78$.
:::
:::

::: warning The integrand need not tend to zero
Convergence of $\int_a^\infty f$ is about area, not about the values of $f$. If $f(x)\to0$, the integral may still diverge ($\frac1x$). Less obviously, the integral of a non-negative continuous function can converge even though $f(x)$ does *not* tend to $0$: imagine a function that is $0$ except for a narrow triangular spike of height $1$ and width $\frac{2}{n^2}$ centred at each integer $n\ge2$. Its total area is $\sum_{n\ge2}\frac{1}{n^2}<1$ ([[#exr-integral-test]]), yet $f(n) = 1$ for every $n$. Tests based on the size of the integrand compare areas, as in the next section.
:::

::: warning Look for singularities inside the interval
In [[calculus-1/integrals]] we saw the false computation $\int_{-1}^1\frac{dx}{x^2} = \bigl[-\frac1x\bigr]_{-1}^1 = -2$. Treated correctly as an improper integral with a singularity at $0$, it splits into $\int_{-1}^0\frac{dx}{x^2} + \int_0^1\frac{dx}{x^2}$, and the second piece diverges by [[#thm-p-zero]] (with $p = 2$). So the integral diverges. Before applying the fundamental theorem, always check whether the integrand is bounded on the whole interval.
:::

## Comparison tests

Often we only need to know *whether* an improper integral converges, and an antiderivative may not be available — $\int_0^\infty e^{-x^2}\,dx$ is the most famous example. For non-negative integrands, convergence can be decided by comparison with a known integral. The key is a property of monotonic functions that rests on the completeness of the real numbers.

::: lemma Monotone limits {#lem-monotone-limit}
If $F$ is increasing on $[a,\infty)$ and bounded above, then $\lim_{t\to\infty}F(t)$ exists and equals the least upper bound of the values of $F$.
:::

::: proof
By completeness, the set of values $\set{F(t) : t\ge a}$, which is non-empty and bounded above, has a least upper bound $L$. Let $\eps>0$. Since $L - \eps$ is not an upper bound, there is $t_0$ with $F(t_0) > L - \eps$. For every $t\ge t_0$, monotonicity gives $L - \eps < F(t_0)\le F(t)\le L$. Hence $\abs{F(t) - L}<\eps$ for all $t\ge t_0$, which is the definition of $\lim_{t\to\infty}F(t) = L$ ([[calculus-1/limits#def-limit-infinity]]).
:::

::: theorem Comparison test {#thm-comparison}
Suppose $f$ and $g$ are integrable on $[a, t]$ for every $t>a$, and $0\le f(x)\le g(x)$ for all $x\ge a$.

1. If $\int_a^\infty g(x)\,dx$ converges, then so does $\int_a^\infty f(x)\,dx$, and $\int_a^\infty f\le\int_a^\infty g$.
2. If $\int_a^\infty f(x)\,dx$ diverges, then so does $\int_a^\infty g(x)\,dx$.

Analogous statements hold for improper integrals of unbounded functions.
:::

::: proof
Let $F(t) = \int_a^tf$ and $G(t) = \int_a^tg$. Since $f\ge0$, $F$ is increasing: $F(t') - F(t) = \int_t^{t'}f\ge0$ for $t'>t$. By the comparison property of integrals, $F(t)\le G(t)$. If $\int_a^\infty g$ converges then, since $G$ is also increasing, $G(t)\le\int_a^\infty g$ for all $t$; so $F$ is increasing and bounded above, and converges by [[#lem-monotone-limit]] to a limit at most $\int_a^\infty g$. Statement 2 is the contrapositive of statement 1.
:::

For example, $\int_1^\infty\frac{\abs{\sin x}}{x^2}\,dx$ converges by comparison with $\int_1^\infty\frac{dx}{x^2}$, and $\int_1^\infty\frac{2 + \cos x}{\sqrt x}\,dx$ diverges by comparison with $\int_1^\infty\frac{dx}{\sqrt x}$, since $2 + \cos x\ge1$. Often the inequality is awkward to arrange exactly, but the integrand *behaves like* a simple power for large $x$; the following version of the test handles this.

::: theorem Limit comparison test {#thm-limit-comparison}
Let $f$ and $g$ be continuous and positive on $[a,\infty)$, and suppose $\displaystyle\lim_{x\to\infty}\frac{f(x)}{g(x)} = L$ with $0<L<\infty$. Then $\int_a^\infty f$ and $\int_a^\infty g$ either both converge or both diverge.
:::

::: proof
Taking $\eps = L/2$ in the definition of the limit, there is $N\ge a$ such that $\frac L2<\frac{f(x)}{g(x)}<2L$, that is, $\frac L2g(x)<f(x)<2Lg(x)$, for all $x\ge N$. If $\int_N^\infty g$ converges, so does $\int_N^\infty 2Lg$, and hence $\int_N^\infty f$ by [[#thm-comparison]]; if $\int_N^\infty f$ converges, so does $\int_N^\infty\frac{2}{L}f\ge\int_N^\infty g$. The integrals over $[a,N]$ are ordinary integrals of continuous functions, so convergence on $[a,\infty)$ is equivalent to convergence on $[N,\infty)$.
:::

::: example Comparisons {#ex-comparison}
Decide whether the integrals converge: (a) $\displaystyle\int_0^\infty e^{-x^2}\,dx$ and (b) $\displaystyle\int_1^\infty\frac{x+1}{\sqrt{x^4 + x}}\,dx$.
::: solution
(a) The integrand is continuous on $[0,1]$, so only the tail matters. For $x\ge1$ we have $x^2\ge x$, so $0<e^{-x^2}\le e^{-x}$, and $\int_1^\infty e^{-x}\,dx = e^{-1}$ converges. By [[#thm-comparison]], $\int_0^\infty e^{-x^2}\,dx$ converges. Its value, $\frac{\sqrt\pi}{2}$, cannot be found with an antiderivative; it is computed in [[multivariable/multiple-integrals]] by a beautiful trick with polar coordinates.

(b) For large $x$ the numerator behaves like $x$ and the denominator like $\sqrt{x^4} = x^2$, so the integrand behaves like $1/x$. Precisely, with $g(x) = 1/x$,

$$
\frac{f(x)}{g(x)} = \frac{x(x+1)}{\sqrt{x^4 + x}} = \frac{1 + 1/x}{\sqrt{1 + 1/x^3}}\longrightarrow1 .
$$

Since $\int_1^\infty\frac{dx}{x}$ diverges, so does the given integral, by [[#thm-limit-comparison]].
:::
:::

The comparison tests work in the same way at a singularity, where the relevant behaviour is how fast the integrand blows up.

::: example A singularity of sine type {#ex-comparison-singular}
Show that $\displaystyle\int_0^1\frac{dx}{\sqrt{\sin x}}$ converges, and that $\displaystyle\int_0^\infty\frac{e^{-x}}{\sqrt x}\,dx$ converges.
::: solution
On $(0,1]$ the first integrand is positive and continuous, and unbounded only near $0$. Since $\frac{\sin x}{x}\to1$ ([[calculus-1/limits#thm-sinx]]), the ratio of $\frac{1}{\sqrt{\sin x}}$ to $\frac{1}{\sqrt x}$ is $\sqrt{\frac{x}{\sin x}}\to1$ as $x\to0^+$. By the limit comparison test at $0$, the integral converges together with $\int_0^1x^{-1/2}\,dx$, which converges by [[#thm-p-zero]]. (Numerically it is about $2.03$.)

The second integral is improper at both ends. On $(0,1]$, $0<\frac{e^{-x}}{\sqrt x}\le\frac{1}{\sqrt x}$, which has a convergent integral; on $[1,\infty)$, $0<\frac{e^{-x}}{\sqrt x}\le e^{-x}$, which also does. So the whole integral converges. It is the gamma function value $\Gamma\bigl(\frac12\bigr)$ discussed below, and equals $\sqrt\pi$.
:::
:::

::: quiz
Which of these improper integrals converge? (Select all that apply.)
- [x] $\displaystyle\int_1^\infty\frac{dx}{x^2+1}$
- [ ] $\displaystyle\int_1^\infty\frac{dx}{\sqrt x}$
- [x] $\displaystyle\int_0^1\frac{dx}{\sqrt x}$
- [ ] $\displaystyle\int_0^1\frac{dx}{x^2}$
::: solution
The first converges by comparison with $1/x^2$. The second diverges ($p = \frac12\le1$ at infinity), while the third converges ($p = \frac12<1$ at zero) — the same function, opposite behaviour at the two ends. The last diverges ($p = 2\ge1$ at zero).
:::
:::

For integrands that change sign, the comparison tests apply to $\abs{f}$.

::: theorem Absolute convergence implies convergence {#thm-absolute}
If $f$ is integrable on $[a,t]$ for every $t>a$ and $\int_a^\infty\abs{f(x)}\,dx$ converges, then $\int_a^\infty f(x)\,dx$ converges.
:::

::: proof
Since $-\abs f\le f\le\abs f$, we have $0\le f + \abs{f}\le2\abs{f}$. The integral $\int_a^\infty2\abs f$ converges, so by [[#thm-comparison]] so does $\int_a^\infty(f + \abs f)$. Then $\int_a^tf = \int_a^t(f + \abs f) - \int_a^t\abs f$ is a difference of two functions of $t$ with finite limits, so it has a finite limit as $t\to\infty$.
:::

The converse is false. The integral $\int_1^\infty\frac{\sin x}{x}\,dx$ converges, because the positive and negative humps of $\sin x/x$ partly cancel, while $\int_1^\infty\frac{\abs{\sin x}}{x}\,dx$ diverges ([[#exr-dirichlet]]). Such integrals are said to converge **conditionally**.

## The gamma function and other applications

::: example The gamma function {#ex-gamma}
For $s>0$ define $\displaystyle\Gamma(s) = \int_0^\infty x^{s-1}e^{-x}\,dx$. Show that the integral converges, that $\Gamma(s+1) = s\,\Gamma(s)$, and that $\Gamma(n+1) = n!$ for every integer $n\ge0$.
::: solution
*Convergence.* Split at $1$. On $(0,1]$, $0<x^{s-1}e^{-x}\le x^{s-1} = \frac{1}{x^{1-s}}$, and $\int_0^1x^{s-1}\,dx$ converges by [[#thm-p-zero]] because $1 - s<1$. On $[1,\infty)$, write $x^{s-1}e^{-x} = \bigl(x^{s-1}e^{-x/2}\bigr)e^{-x/2}$. The bracket tends to $0$ as $x\to\infty$ (exponentials beat powers, [[calculus-1/mean-value-theorem#ex-lhopital]]), so it is bounded by some constant $C$ on $[1,\infty)$, and $x^{s-1}e^{-x}\le Ce^{-x/2}$, whose integral converges. By [[#thm-comparison]] both pieces converge.

*Recurrence.* Integrate by parts on $[\delta, t]$ with $u = x^s$ and $dv = e^{-x}\,dx$:

$$
\int_\delta^tx^se^{-x}\,dx = \bigl[-x^se^{-x}\bigr]_\delta^t + s\int_\delta^tx^{s-1}e^{-x}\,dx .
$$

As $\delta\to0^+$ and $t\to\infty$, the boundary terms $\delta^se^{-\delta}$ and $t^se^{-t}$ tend to $0$, so $\Gamma(s+1) = s\,\Gamma(s)$.

*Factorials.* $\Gamma(1) = \int_0^\infty e^{-x}\,dx = 1$, and then $\Gamma(2) = 1\cdot\Gamma(1) = 1$, $\Gamma(3) = 2\Gamma(2) = 2$, and by induction $\Gamma(n+1) = n\cdot(n-1)! = n!$. The gamma function interpolates the factorials smoothly; for instance $\Gamma\bigl(\frac12\bigr) = \sqrt\pi$, so "$\bigl(-\frac12\bigr)! = \sqrt\pi$". It appears throughout probability and statistics ([[probability/continuous-random-variables]]).

The value at $\frac12$ comes from the Gaussian integral: substituting $x = u^2$ (so $dx = 2u\,du$ and $x^{-1/2} = u^{-1}$) gives $\Gamma\bigl(\frac12\bigr) = \int_0^\infty x^{-1/2}e^{-x}\,dx = 2\int_0^\infty e^{-u^2}\,du = 2\cdot\frac{\sqrt\pi}{2} = \sqrt\pi$, using the value of $\int_0^\infty e^{-u^2}\,du$ quoted in [[#ex-comparison]].
:::
:::

::: application Waiting times and their means
The exponential density $f(x) = \lambda e^{-\lambda x}$ ($x\ge0$) of [[calculus-1/integral-applications#ex-exponential-wait]] has total probability $\int_0^\infty\lambda e^{-\lambda x}\,dx = \lim_{t\to\infty}\bigl(1 - e^{-\lambda t}\bigr) = 1$, as a density must. Its mean, by the substitution $u = \lambda x$ and the gamma function, is

$$
\int_0^\infty x\,\lambda e^{-\lambda x}\,dx = \frac1\lambda\int_0^\infty ue^{-u}\,du = \frac{\Gamma(2)}{\lambda} = \frac1\lambda .
$$

So with $\lambda = 0.1$ per minute the mean wait is $10$ minutes, as claimed earlier. Improper integrals are the natural language of continuous probability, because waiting times, lifetimes and measurement errors have no upper bound.
:::

::: application The value of a perpetuity
How much is it worth today to receive money for ever? If a payment stream arrives continuously at $c$ pounds per year and money can earn interest at the continuously compounded rate $r$, then a pound due at time $t$ is worth $e^{-rt}$ pounds today, and the **present value** of the whole stream is

$$
\int_0^\infty ce^{-rt}\,dt = \lim_{T\to\infty}\frac{c}{r}\bigl(1 - e^{-rT}\bigr) = \frac{c}{r}.
$$

At $r = 5\%$, an income of $1000$ pounds a year for ever is worth $20\,000$ pounds now — finite, because payments in the distant future are discounted exponentially. Economists use the same improper integral to value land, bonds without a maturity date, and the long-run costs of climate change.
:::

Not every density has a mean. The **Cauchy density** $f(x) = \frac{1}{\pi(1+x^2)}$ is a genuine probability density — by [[#ex-improper-basic]](c) its total integral is $\frac\pi\pi = 1$ — but its tails decay so slowly that $\int_0^\infty\frac{x}{\pi(1+x^2)}\,dx$ diverges: by limit comparison with $\frac1x$, or directly, $\int_0^t\frac{x\,dx}{1+x^2} = \frac12\ln(1+t^2)\to\infty$.

::: widget distribution
dist: cauchy
params: x0=0, gamma=1
a: -1
b: 1
caption: The Cauchy density looks like a bell curve, and $\Prob(-1\le X\le1) = \frac{1}{\pi}\bigl(\arctan1 - \arctan(-1)\bigr) = \frac12$. But its tails decay only like $\frac{1}{\pi x^2}$, so $x f(x)$ behaves like $\frac{1}{\pi x}$, whose integral diverges at both ends: the Cauchy distribution has no mean. One consequence, explored in [[probability/limit-theorems]], is that averages of Cauchy samples never settle down.
:::

::: example Gabriel's horn {#ex-gabriel}
The curve $y = \frac1x$, $x\ge1$, is rotated about the $x$-axis. Show that the resulting infinitely long horn has finite volume but infinite surface area. (The area of a surface of revolution is $\int2\pi f(x)\sqrt{1 + f'(x)^2}\,dx$, obtained like arc length by approximating with thin bands; see [[multivariable/surface-integrals]].)
::: solution
By the disc method ([[calculus-1/integral-applications#def-volume]]) and [[#thm-p-infinity]],

$$
V = \int_1^\infty\pi\Bigl(\frac1x\Bigr)^2dx = \pi\int_1^\infty\frac{dx}{x^2} = \pi .
$$

For the surface area, $f'(x) = -\frac{1}{x^2}$, so

$$
S = \int_1^\infty\frac{2\pi}{x}\sqrt{1 + \frac{1}{x^4}}\,dx \ge\int_1^\infty\frac{2\pi}{x}\,dx = \infty
$$

by [[#thm-comparison]]. The paradox — a horn that can be filled with $\pi$ cubic units of paint but whose inside cannot be painted — dissolves once one notices that a layer of paint of fixed thickness would have infinite volume, while the paint filling the horn becomes ever thinner.
:::
:::

::: widget surface
fx: u
fy: cos(v)/u
fz: sin(v)/u
u: 1, 10
v: 0, 2pi
color: height
caption: Gabriel's horn (here cut off at $x = 10$). The cross-section at $x$ has radius $1/x$ and area $\pi/x^2$, whose integral converges; the circumference $2\pi/x$ decays only like $1/x$, so the surface area grows without bound as the horn is extended.
:::

::: history
In 1641 Evangelista Torricelli, a pupil of Galileo, astonished his contemporaries by showing that the infinitely long solid obtained by rotating a hyperbola — Gabriel's horn — has a finite volume; the result, published in 1644, provoked a philosophical debate about the nature of the infinite. In letters to Christian Goldbach in 1729 and 1730, Leonhard Euler solved the problem of extending the factorial to non-integer arguments, arriving at the integral that now defines the gamma function. Augustin-Louis Cauchy, in the 1820s, treated integrals over infinite intervals and integrals of functions with infinite values systematically as limits, as in this chapter, and introduced the principal value for certain divergent integrals.
:::

## Where this leads

Improper integrals and infinite series are close relatives: for a positive decreasing function $f$, the series $\sum f(n)$ and the integral $\int_1^\infty f$ converge or diverge together (the integral test, [[#exr-integral-test]] and [[calculus-2/convergence-tests]]). The comparison tests have exact analogues for series. Improper integrals with a parameter define the Laplace transform ([[ode/laplace-transform]]) and the Fourier transform ([[pde/fourier-transform]]), and many of them, such as $\int_{-\infty}^\infty\frac{dx}{1+x^4}$, are evaluated most easily with complex analysis ([[complex-analysis/residues]]). In the Lebesgue theory of integration ([[measure-theory/lebesgue-integral]]) absolutely convergent improper integrals become ordinary integrals, while conditionally convergent ones like $\int\frac{\sin x}{x}$ keep their special status.

::: summary
- Improper integrals are limits of ordinary integrals: $\int_a^\infty f = \lim_{t\to\infty}\int_a^tf$, and for an integrand unbounded at $a$, $\int_a^bf = \lim_{t\to a^+}\int_t^bf$. They converge when the limit is finite.
- A doubly infinite integral, or one with a singularity inside the interval, must be split, and each piece must converge on its own; the symmetric principal value is a different notion.
- $p$-tests: $\int_1^\infty x^{-p}\,dx$ converges exactly when $p>1$, and $\int_0^1x^{-p}\,dx$ exactly when $p<1$.
- For non-negative integrands, convergence follows by comparison with a larger convergent integral, and divergence by comparison with a smaller divergent one; the limit comparison test compares growth rates. Both rest on the completeness of $\R$.
- Absolute convergence implies convergence, but not conversely: $\int_1^\infty\frac{\sin x}{x}\,dx$ converges only conditionally.
- The gamma function $\Gamma(s) = \int_0^\infty x^{s-1}e^{-x}\,dx$ satisfies $\Gamma(s+1) = s\Gamma(s)$ and $\Gamma(n+1) = n!$.
- Improper integrals give total probabilities and means of continuous distributions; some densities, like Cauchy's, have no mean.
:::

## Exercises

::: exercise An exponential tail {level=1 check="1/2"}
Evaluate $\displaystyle\int_0^\infty e^{-2x}\,dx$.
::: solution
$\int_0^te^{-2x}\,dx = \frac12\bigl(1 - e^{-2t}\bigr)\to\frac12$ as $t\to\infty$.
:::
:::

::: exercise A power tail {level=1 check="1/8"}
Evaluate $\displaystyle\int_2^\infty\frac{dx}{x^3}$.
::: solution
$\int_2^t x^{-3}\,dx = \Bigl[-\frac{1}{2x^2}\Bigr]_2^t = \frac18 - \frac{1}{2t^2}\to\frac18$.
:::
:::

::: exercise An infinite integrand {level=1 check="4"}
Evaluate $\displaystyle\int_0^4\frac{dx}{\sqrt x}$.
::: solution
The integrand is unbounded near $0$. $\int_t^4x^{-1/2}\,dx = \bigl[2\sqrt x\bigr]_t^4 = 4 - 2\sqrt t\to4$ as $t\to0^+$.
:::
:::

::: exercise Converge or diverge? {level=2}
Decide whether each integral converges, with reasons: (a) $\displaystyle\int_1^\infty\frac{dx}{x^3 + 1}$; (b) $\displaystyle\int_1^\infty\frac{2 + \sin x}{x}\,dx$; (c) $\displaystyle\int_0^1\frac{dx}{x + \sqrt x}$; (d) $\displaystyle\int_1^\infty\frac{\ln x}{x^2}\,dx$.
::: solution
(a) Converges: $0<\frac{1}{x^3+1}\le\frac{1}{x^3}$ and $\int_1^\infty x^{-3}\,dx$ converges.

(b) Diverges: $\frac{2 + \sin x}{x}\ge\frac{1}{x}$ and $\int_1^\infty\frac{dx}{x}$ diverges.

(c) Converges: for $0<x\le1$, $\frac{1}{x + \sqrt x}\le\frac{1}{\sqrt x}$, and $\int_0^1x^{-1/2}\,dx$ converges by [[#thm-p-zero]].

(d) Converges: $\frac{\ln x}{\sqrt x}\to0$ as $x\to\infty$ (every power beats the logarithm), so $\ln x\le C\sqrt{x}$ for $x \ge 1$ and some constant $C$; then $0\le\frac{\ln x}{x^2}\le\frac{C}{x^{3/2}}$, whose integral converges. (In fact the integral equals $1$, by parts.)
:::
:::

::: exercise Completing the square {level=2 check="pi"}
Evaluate $\displaystyle\int_{-\infty}^\infty\frac{dx}{x^2 + 2x + 2}$.
::: solution
Since $x^2 + 2x + 2 = (x+1)^2 + 1$, an antiderivative is $\arctan(x+1)$. Splitting at $-1$: $\int_{-1}^\infty = \lim_{t\to\infty}\arctan(t+1) - 0 = \frac\pi2$ and $\int_{-\infty}^{-1} = 0 - \lim_{t\to-\infty}\arctan(t+1) = \frac\pi2$. Both converge and the total is $\pi$.
:::
:::

::: exercise A logarithmic substitution {level=2 check="1"}
Evaluate $\displaystyle\int_e^\infty\frac{dx}{x(\ln x)^2}$.
::: solution
With $u = \ln x$, $du = \frac{dx}{x}$, the integral over $[e,t]$ becomes $\int_1^{\ln t}\frac{du}{u^2} = 1 - \frac{1}{\ln t}\to1$. (Compare $\int_e^\infty\frac{dx}{x\ln x} = \lim\ln(\ln t) = \infty$: very small changes in the integrand can decide convergence.)
:::
:::

::: exercise A logarithmic singularity {level=2 check="-1/4"}
Evaluate $\displaystyle\int_0^1x\ln x\,dx$.
::: solution
By parts with $u = \ln x$, $dv = x\,dx$: $\int x\ln x\,dx = \frac{x^2}{2}\ln x - \frac{x^2}{4}$. So $\int_t^1x\ln x\,dx = -\frac14 - \frac{t^2}{2}\ln t + \frac{t^2}{4}\to-\frac14$ as $t\to0^+$, since $t^2\ln t\to0$. (The integrand is actually bounded, since $x\ln x\to0$; it is improper only because $\ln x$ is undefined at $0$.)
:::
:::

::: exercise The Dirichlet integral {#exr-dirichlet level=3}
Prove that $\displaystyle\int_1^\infty\frac{\sin x}{x}\,dx$ converges, but that $\displaystyle\int_1^\infty\frac{\abs{\sin x}}{x}\,dx$ diverges.
::: hint
For the first, integrate by parts to get $\frac{\cos x}{x^2}$. For the second, use $\abs{\sin x}\ge\sin^2x = \frac{1 - \cos 2x}{2}$.
:::
::: solution
*Convergence.* By parts with $u = \frac1x$ and $dv = \sin x\,dx$,

$$
\int_1^t\frac{\sin x}{x}\,dx = \Bigl[-\frac{\cos x}{x}\Bigr]_1^t - \int_1^t\frac{\cos x}{x^2}\,dx = \cos 1 - \frac{\cos t}{t} - \int_1^t\frac{\cos x}{x^2}\,dx .
$$

As $t\to\infty$, $\frac{\cos t}{t}\to0$, and $\int_1^\infty\frac{\cos x}{x^2}\,dx$ converges absolutely (compare $\frac{\abs{\cos x}}{x^2}\le\frac{1}{x^2}$), hence converges by [[#thm-absolute]]. So the left-hand side has a finite limit.

*Divergence of the absolute integral.* Since $0\le\abs{\sin x}\le1$, we have $\abs{\sin x}\ge\sin^2x = \frac{1-\cos2x}{2}$, so

$$
\int_1^t\frac{\abs{\sin x}}{x}\,dx\ge\frac12\int_1^t\frac{dx}{x} - \frac12\int_1^t\frac{\cos 2x}{x}\,dx .
$$

The last integral has a finite limit as $t\to\infty$ (by the same integration by parts as above, with $2x$ in place of $x$), while $\frac12\int_1^t\frac{dx}x = \frac12\ln t\to\infty$. Hence the absolute integral diverges. (Using complex analysis one can show that $\int_0^\infty\frac{\sin x}{x}\,dx = \frac\pi2$.)
:::
:::

::: exercise Two singular ends {level=3}
For which real numbers $p$ does $\displaystyle\int_0^\infty\frac{dx}{x^p(1+x)}$ converge?
::: solution
The integrand is positive and continuous on $(0,\infty)$, so split at $1$ and examine each end with [[#thm-limit-comparison]] (and its analogue at $0$).

Near $0$: $\frac{1}{x^p(1+x)}\big/\frac{1}{x^p} = \frac{1}{1+x}\to1$, so $\int_0^1$ converges exactly when $\int_0^1x^{-p}\,dx$ does, that is, when $p<1$.

Near $\infty$: $\frac{1}{x^p(1+x)}\big/\frac{1}{x^{p+1}} = \frac{x}{1+x}\to1$, so $\int_1^\infty$ converges exactly when $\int_1^\infty x^{-(p+1)}\,dx$ does, that is, when $p + 1>1$, i.e. $p>0$.

The whole integral converges if and only if both pieces do: exactly for $0<p<1$. (For $p = \frac12$ the substitution $x = u^2$ gives $\int_0^\infty\frac{2\,du}{1+u^2} = \pi$.)
:::
:::

::: exercise The integral test {#exr-integral-test level=3}
Let $f$ be continuous, non-negative and decreasing on $[1,\infty)$. Prove that for every integer $N\ge2$,

$$
\sum_{n=2}^Nf(n)\le\int_1^Nf(x)\,dx\le\sum_{n=1}^{N-1}f(n),
$$

and deduce that $\sum_{n=1}^N\frac1n\to\infty$ as $N\to\infty$, while the partial sums of $\sum\frac{1}{n^2}$ stay below $2$.
::: solution
For $n\le x\le n+1$, monotonicity gives $f(n+1)\le f(x)\le f(n)$, so by the bounds property of integrals $f(n+1)\le\int_n^{n+1}f\le f(n)$. Adding these for $n = 1, \dots, N-1$ and using additivity gives the two inequalities.

With $f(x) = \frac1x$: $\sum_{n=1}^{N-1}\frac1n\ge\int_1^N\frac{dx}{x} = \ln N$, which tends to infinity, so the harmonic sums are unbounded.

With $f(x) = \frac1{x^2}$: $\sum_{n=2}^N\frac{1}{n^2}\le\int_1^N\frac{dx}{x^2} = 1 - \frac1N<1$, so $\sum_{n=1}^N\frac1{n^2}<2$ for all $N$. These partial sums increase and are bounded, so they converge (the discrete analogue of [[#lem-monotone-limit]]); Euler showed in 1734 that the limit is $\frac{\pi^2}{6}$. Series of this kind are the subject of [[calculus-2/series]].
:::
:::
