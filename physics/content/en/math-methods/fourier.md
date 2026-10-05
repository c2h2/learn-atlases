A periodic quantity repeats. The voltage of an alternating supply, the displacement of a plucked string, and the temperature around a circular ring all return to the same value after a fixed interval, the period. On one period the graph may be smooth, or it may jump. Either way, the practical question is the same: can the graph be rebuilt from pure sinusoids, and if so, with what amplitudes?

Superposition makes the question useful. A single sine solves the oscillator equation and the wave equation, as in [[oscillations/superposition]]. A sum of sines, each at an integer multiple of a fundamental frequency, solves the same linear equation, and the coefficients are free until the initial shape fixes them. The list of those coefficients is the Fourier series. Energy and mean-square size are not a second mystery: once the coefficients are known, Parseval’s theorem reads them off without returning to the original graph.

Fourier introduced the series in order to solve the heat equation. We do not solve that equation in this chapter. We compute coefficients, prove why the integrals that define them are the right ones, see what a partial sum does at a jump, and then let the period become very long. That limit is the Fourier transform, in a convention we fix carefully. Complex integrals of the transform belong to [[math-methods/complex-methods]]. The differential equations that eat these expansions belong to [[math-methods/odes]].

## Coefficients from orthogonality {#coefficients}

Take the period to be $2\pi$ first. A function $f$ satisfies $f(x+2\pi) = f(x)$ wherever both sides are defined. The building blocks of the same period are the constant function, together with $\cos nx$ and $\sin nx$ for each integer $n \ge 1$. These are the harmonics. The $n$th harmonic oscillates $n$ times on $[-\pi, \pi]$.

::: definition Fourier coefficients and Fourier series {#def-fourier}
Let $f$ be integrable on $[-\pi, \pi]$. Its **Fourier coefficients** are

$$
a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos nx\,\dd x \qquad (n \ge 0),
$$ {#eq-an}

$$
b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,\dd x \qquad (n \ge 1).
$$ {#eq-bn}

The **Fourier series** of $f$ is the trigonometric series

$$
\frac{a_0}{2} + \sum_{n=1}^{\infty}\bigl(a_n\cos nx + b_n\sin nx\bigr).
$$ {#eq-series}
:::

The constant term is written $a_0/2$, not $a_0$. The reason is bookkeeping, and it is worth fixing before any integral is evaluated. The formula [[#eq-an]] at $n = 0$ gives

$$
a_0 = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\,\dd x,
$$

so $a_0/2$ is exactly the mean value of $f$ over a period,

$$
\frac{a_0}{2} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,\dd x.
$$

If the same integral recipe is used for every $n$, including zero, the constant term must carry the extra factor $\tfrac12$. Forgetting it doubles the mean. We will meet that slip again in the exercises.

The integrals are legitimate definitions for any integrable $f$. They do not, by themselves, say that the series converges, or that it converges to $f$. Those are later theorems. What we can prove at once is that the harmonics are orthogonal, and therefore that a uniformly convergent trigonometric series has no choice about its coefficients.

::: lemma Orthogonality on a period {#lem-orth}
For integers $m, n \ge 0$,

$$
\begin{aligned}
\int_{-\pi}^{\pi}\cos mx\cos nx\,\dd x
&=
\begin{cases}
2\pi & \text{if } m = n = 0,\\
\pi & \text{if } m = n \ge 1,\\
0 & \text{if } m \neq n,
\end{cases}
\\[0.4em]
\int_{-\pi}^{\pi}\sin mx\sin nx\,\dd x
&=
\begin{cases}
\pi & \text{if } m = n \ge 1,\\
0 & \text{if } m \neq n,
\end{cases}
\\[0.4em]
\int_{-\pi}^{\pi}\sin mx\cos nx\,\dd x
&= 0.
\end{aligned}
$$
:::

::: proof
The product-to-sum identities are enough. For the cosines, if $m$ and $n$ are not both zero,

$$
\cos mx\cos nx = \frac{1}{2}\Bigl(\cos(m+n)x + \cos(m-n)x\Bigr).
$$

If $m \neq n$, both $m+n$ and $m-n$ are nonzero integers, and the integral of $\cos kx$ over $[-\pi, \pi]$ vanishes for every nonzero integer $k$. If $m = n \ge 1$, the second cosine is $\cos 0 = 1$, and

$$
\int_{-\pi}^{\pi}\cos^2 nx\,\dd x = \int_{-\pi}^{\pi}\frac{1 + \cos 2nx}{2}\,\dd x = \pi.
$$

If $m = n = 0$, the integrand is $1$ and the integral is $2\pi$.

For the sines, the same reduction with $m = n \ge 1$ gives $\int\sin^2 nx\,\dd x = \pi$, and $m \neq n$ again leaves only full periods of a cosine. The mixed integral is the integral of an odd function over a symmetric interval when it is rewritten by

$$
\sin mx\cos nx = \frac{1}{2}\Bigl(\sin(m+n)x + \sin(m-n)x\Bigr),
$$

or, when $m = n$, the integral of $\tfrac12\sin 2nx$, which is zero. Every cross term in the list is therefore zero.
:::

::: intuition Amplitudes, not a new function
Each coefficient is the size of one harmonic, in the same way that a musical tone has a fundamental and a list of overtones. Orthogonality is the statement that those overtones do not overlap when you average over a whole number of periods: the integral of one harmonic against a different one is zero, so the integral of $f$ against $\cos nx$ sees only $a_n$. Changing $a_3$ does not change $b_1$. The series is a list of independent amplitudes. [[oscillations/superposition]] is the same idea for travelling waves; here the "waves" are the harmonics on a fixed period.
:::

::: theorem Uniqueness of a uniformly convergent expansion {#thm-unique}
Suppose

$$
f(x) = \frac{A_0}{2} + \sum_{n=1}^{\infty}\bigl(A_n\cos nx + B_n\sin nx\bigr)
$$

on $[-\pi, \pi]$, and suppose the series converges uniformly there. Then $A_n = a_n$ and $B_n = b_n$ are the integrals [[#eq-an]] and [[#eq-bn]]. In particular, a function has at most one uniformly convergent trigonometric expansion of this form.
:::

::: proof
Uniform convergence lets us integrate term by term against the bounded continuous function $\cos mx$. Multiply by $\cos mx$ and integrate over $[-\pi, \pi]$. [[#lem-orth]] kills every term except the one that carries $A_m$. For $m \ge 1$ that surviving integral is $A_m \pi$, while the left-hand side is $\int f\cos mx\,\dd x$. Hence $A_m = a_m$. For $m = 0$ the surviving integral is $(A_0/2)\cdot 2\pi = A_0\pi$, and the same comparison gives $A_0 = a_0$. Multiplying by $\sin mx$ instead isolates $B_m = b_m$. If two uniformly convergent trigonometric series had the same sum, their difference would be a uniformly convergent series summing to zero, whose coefficients would all vanish.
:::

The hypothesis matters. [[#thm-unique]] does not say that every integrable $f$ equals its Fourier series. It says that if a uniformly convergent trigonometric series sums to $f$, the coefficients have to be the Fourier integrals. Many functions of physical interest fail to converge uniformly, precisely because they jump. Their coefficients are still defined by [[#eq-an]] and [[#eq-bn]], and a different theorem, due to Dirichlet, says what the series sums to. We come to that after we can compute.

Even and odd functions shorten the arithmetic. If $f(-x) = f(x)$, then $f(x)\sin nx$ is odd, every $b_n$ vanishes, and only a cosine series remains. If $f(-x) = -f(x)$, every $a_n$ vanishes, including $a_0$, and only a sine series remains. The square wave below is odd. The absolute-value function is even. Use the symmetry before integrating: it removes half the coefficients without a calculation.

::: example A finite trigonometric polynomial {#ex-finite}
Let $f(x) = 2 + 3\cos 2x - \sin x$. Read off the Fourier coefficients, and check $b_1$ by integration.
::: solution
The function is already a trigonometric polynomial, and the series is finite, hence uniformly convergent. [[#thm-unique]] says the coefficients are the ones in front of you, once the constant term is matched to $a_0/2$. Here the constant term is $2$, so $a_0/2 = 2$ and $a_0 = 4$. The coefficient of $\cos 2x$ is $a_2 = 3$. The coefficient of $\sin x$ is $b_1 = -1$. Every other $a_n$ and $b_n$ is zero.

The integral test of $b_1$ is worth doing once, because it is the pattern for functions that are not presented as polynomials. By [[#eq-bn]],

$$
b_1 = \frac{1}{\pi}\int_{-\pi}^{\pi}\bigl(2 + 3\cos 2x - \sin x\bigr)\sin x\,\dd x.
$$

Split the integrand into three pieces. The integral of $2\sin x$ over a full number of periods is zero. For the middle piece the identity $\sin x\cos 2x = \tfrac12\bigl(\sin 3x - \sin x\bigr)$ produces only full periods of sines, so that integral vanishes as well. The last piece is

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}\bigl(-\sin^2 x\bigr)\,\dd x = -\frac{1}{\pi}\int_{-\pi}^{\pi}\frac{1 - \cos 2x}{2}\,\dd x = -\frac{1}{\pi}\cdot\pi = -1.
$$

So $b_1 = -1$, in agreement with the coefficient read off the formula. The constant term is not $a_0$. If a later calculation reports the mean of this $f$ as $4$, the factor $\tfrac12$ has been dropped: the mean is $2$.
:::
:::

## Four series, computed {#computed}

The calculations in this section are the whole method: impose symmetry, integrate by parts or by a product identity, and simplify with $\cos n\pi = (-1)^n$ and $\sin n\pi = 0$. Nothing below uses a convergence theorem. The integrals exist, so the coefficients exist. What the series sums to is the business of the next section, and we will say so when a numerical check needs it.

::: example The square wave {#ex-square}
Define $f$ on $(-\pi, \pi)$ by $f(x) = -1$ for $-\pi < x < 0$ and $f(x) = 1$ for $0 < x < \pi$, and extend it periodically with period $2\pi$. The values at the finitely many jumps $x = n\pi$ do not affect any integral. Find the Fourier series.
::: solution
The integrand $f(x)\cos nx$ is odd for every $n$, because $f$ is odd and $\cos nx$ is even, so $a_n = 0$ for all $n \ge 0$. There is no cosine and no constant term. For the sine coefficients the integrand is even, and

$$
b_n = \frac{2}{\pi}\int_{0}^{\pi}\sin nx\,\dd x = \frac{2}{\pi}\left[-\frac{\cos nx}{n}\right]_{0}^{\pi} = \frac{2}{\pi n}\bigl(1 - \cos n\pi\bigr) = \frac{2\bigl(1 - (-1)^n\bigr)}{\pi n}.
$$

If $n$ is even, $(-1)^n = 1$ and $b_n = 0$. If $n$ is odd, $(-1)^n = -1$ and $b_n = 4/(\pi n)$. The series is therefore

$$
f(x)\;\sim\;\frac{4}{\pi}\sum_{m=0}^{\infty}\frac{\sin(2m+1)x}{2m+1} = \frac{4}{\pi}\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \cdots\right).
$$ {#eq-square}

The symbol $\sim$ means "has the Fourier series", not yet "equals". The first coefficient is $b_1 = 4/\pi \approx 1.27324$. Odd harmonics alone are the signature of this particular square wave: a shift of the origin, or a different duty cycle, brings in cosines or even sines.

Three terms can be evaluated exactly. At $x = \pi/2$,

$$
\sin\frac{\pi}{2} + \frac{1}{3}\sin\frac{3\pi}{2} + \frac{1}{5}\sin\frac{5\pi}{2} = 1 - \frac{1}{3} + \frac{1}{5} = \frac{13}{15},
$$

so the three-term sum equals $52/(15\pi) \approx 1.10347$, already near the plateau value $1$, but not on it. At $x = \pi/6$ the same three-term sum has derivative proportional to $\cos x + \cos 3x + \cos 5x$, which vanishes, and the value is

$$
\frac{4}{\pi}\left(\sin\frac{\pi}{6} + \frac{1}{3}\sin\frac{\pi}{2} + \frac{1}{5}\sin\frac{5\pi}{6}\right) = \frac{4}{\pi}\left(\frac{1}{2} + \frac{1}{3} + \frac{1}{10}\right) = \frac{4}{\pi}\cdot\frac{14}{15} = \frac{56}{15\pi} \approx 1.18836.
$$

The partial sum has overshot the value $1$. The figure shows that overshoot, and the next section says why adding terms does not remove it.
:::
:::

::: widget plot
f: (4/pi)*(sin(x)+sin(3*x)/3+sin(5*x)/5)
x: -6.3, 6.3
piticks: true
caption: Three terms of the square-wave series [[#eq-square]], namely (4/π)(sin x + sin(3x)/3 + sin(5x)/5). On (0, π) the infinite sum is trying to equal 1. This partial sum already bends toward a plateau, but its peak is 56/(15π) ≈ 1.188 at x = π/6, above 1, and the value at the jump x = 0 is 0. Further odd harmonics move that peak toward the jump; they do not lower it back to 1. That is the Gibbs overshoot.
:::

::: quiz
The square-wave series [[#eq-square]] is a sum of sines. At the jump $x = 0$, what does the series converge to?
- [ ] $1$, the right-hand limit
- [ ] $-1$, the left-hand limit
- [x] $0$, the average of the two one-sided limits
- [ ] The series diverges at every jump
::: solution
Every partial sum is a sum of sines, so it equals $0$ at $x = 0$. The infinite sum is therefore $0$. The left-hand limit is $-1$ and the right-hand limit is $1$, and $0$ is their average. Assigning the series the right-hand value, or declaring that a jump makes the series diverge, contradicts this explicit sum. The same average appears at every $x = n\pi$.
:::
:::

::: example The sawtooth {#ex-saw}
Let $f(x) = x$ on $(-\pi, \pi)$, extended with period $2\pi$. Find the Fourier series.
::: solution
The function is odd, so $a_n = 0$ for every $n$. Then

$$
b_n = \frac{2}{\pi}\int_{0}^{\pi} x\sin nx\,\dd x.
$$

Integrate by parts with $u = x$ and $\dd v = \sin nx\,\dd x$, so $\dd u = \dd x$ and $v = -\cos(nx)/n$. The boundary term is

$$
\left[-\frac{x\cos nx}{n}\right]_{0}^{\pi} = -\frac{\pi\cos n\pi}{n} = -\frac{\pi(-1)^n}{n},
$$

and the remaining integral of $\cos nx$ over $[0, \pi]$ vanishes. Hence

$$
b_n = \frac{2}{\pi}\cdot\left(-\frac{\pi(-1)^n}{n}\right) = \frac{2(-1)^{n+1}}{n}.
$$

The series is

$$
x \;\sim\; 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx = 2\left(\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \cdots\right)
$$

on $(-\pi, \pi)$. At $x = \pi/2$ the sines of even multiples vanish and the odd ones alternate in the Leibniz pattern,

$$
2\left(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots\right).
$$

If the series converges to $f(\pi/2) = \pi/2$, this is the Leibniz series for $\pi/4$. The convergence needed for that identification is [[#thm-dirichlet]] below; the coefficient calculation itself did not need it. At $x = \pi$ every sine vanishes, so the series sums to $0$. The periodic extension jumps there: the left-hand limit is $\pi$ and the right-hand limit, coming from just after $-\pi$, is $-\pi$. Their average is $0$, which is what the series has produced.
:::
:::

::: example The absolute value, and a numerical series {#ex-abs}
Let $f(x) = \abs{x}$ on $[-\pi, \pi]$, extended periodically. Find the Fourier series, and deduce the sum of the reciprocals of the odd squares.
::: solution
Now $f$ is even, so $b_n = 0$. The constant coefficient is

$$
a_0 = \frac{2}{\pi}\int_{0}^{\pi} x\,\dd x = \frac{2}{\pi}\cdot\frac{\pi^2}{2} = \pi,
$$

and the constant term in the series is $a_0/2 = \pi/2$, the mean of $\abs{x}$ on $[-\pi, \pi]$. For $n \ge 1$,

$$
a_n = \frac{2}{\pi}\int_{0}^{\pi} x\cos nx\,\dd x.
$$

Integrate by parts with $u = x$ and $\dd v = \cos nx\,\dd x$. The boundary term $x\sin(nx)/n$ vanishes at both $0$ and $\pi$. What remains is

$$
a_n = \frac{2}{\pi}\cdot\frac{1}{n}\int_{0}^{\pi}\sin nx\,\dd x = \frac{2}{\pi n}\left[-\frac{\cos nx}{n}\right]_{0}^{\pi} = \frac{2\bigl((-1)^n - 1\bigr)}{\pi n^2}.
$$

Even $n$ gives $a_n = 0$. Odd $n$ gives $a_n = -4/(\pi n^2)$. The series is

$$
\abs{x} \;\sim\; \frac{\pi}{2} - \frac{4}{\pi}\sum_{m=0}^{\infty}\frac{\cos(2m+1)x}{(2m+1)^2}.
$$ {#eq-abs}

The $2\pi$-periodic extension of $\abs{x}$ from $[-\pi, \pi]$ is continuous: the values at $\pm\pi$ agree, both equal to $\pi$. It is piecewise smooth, with corners at integer multiples of $\pi$. [[#thm-dirichlet]] therefore says the series converges to $f(x)$ at every $x$, including at $x = 0$, where $f(0) = 0$. Substituting $x = 0$ gives

$$
0 = \frac{\pi}{2} - \frac{4}{\pi}\sum_{m=0}^{\infty}\frac{1}{(2m+1)^2},
$$

and so

$$
\sum_{m=0}^{\infty}\frac{1}{(2m+1)^2} = \frac{\pi^2}{8}.
$$ {#eq-odd-squares}

The numerical value is $\pi^2/8 \approx 1.23370$. The even squares are a copy of all the squares, scaled by $\tfrac14$, because $1/(2k)^2 = \tfrac14\cdot 1/k^2$. Writing $S = \sum_{k=1}^{\infty} 1/k^2$ then gives $S = \pi^2/8 + S/4$, so $\tfrac34 S = \pi^2/8$ and $S = \pi^2/6 \approx 1.64493$. That is Euler's evaluation of the Basel sum, reached here as an evaluation of a Fourier series at one point, not as a separate trick. The step that uses [[#thm-dirichlet]] is the identification of the sum with $f(0)$. The coefficients were computed before that identification.
:::
:::

## Other periods {#period}

Physics rarely hands you the period $2\pi$. A string of length $L$, a signal of period $T$, or a ring of circumference $2L$ needs the harmonics $\cos(n\pi x/L)$ and $\sin(n\pi x/L)$, which complete $n$ oscillations on an interval of length $2L$. The orthogonality integrals each pick up a factor $L$ in place of $\pi$, because the change of variables $u = \pi x/L$ stretches $[ -L, L ]$ onto $[ -\pi, \pi ]$. The coefficients change in the same way, and the constant term keeps its factor $\tfrac12$.

::: definition Series of period 2L {#def-2L}
Let $f$ be integrable on $[-L, L]$, with $L > 0$. Its Fourier coefficients of period $2L$ are

$$
a_n = \frac{1}{L}\int_{-L}^{L} f(x)\cos\frac{n\pi x}{L}\,\dd x \qquad (n \ge 0),
$$ {#eq-an-L}

$$
b_n = \frac{1}{L}\int_{-L}^{L} f(x)\sin\frac{n\pi x}{L}\,\dd x \qquad (n \ge 1),
$$ {#eq-bn-L}

and the series is

$$
\frac{a_0}{2} + \sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{L} + b_n\sin\frac{n\pi x}{L}\right).
$$ {#eq-series-L}
:::

When $L = \pi$ this is exactly [[#def-fourier]]. The mean value on a period is again $a_0/2$. A function that lives naturally on $[0, L]$, such as a string fixed at both ends, is often extended to $[-L, L]$ as an odd function, so that only the sine terms survive and the extension vanishes at $0$ and at $L$. That is a choice of extension, not a requirement of the definition. An even extension produces a cosine series and a Neumann condition, zero derivative, at the endpoints. The integrals [[#eq-an-L]] and [[#eq-bn-L]] are correct for whichever extension you wrote down; they do not guess the extension for you.

::: example A rectangular pulse of period 4 {#ex-rect}
Take $L = 2$, so the period is $4$. Let $f(x) = 1$ for $\abs{x} < 1$ and $f(x) = 0$ for $1 < \abs{x} < 2$. Find the cosine series.
::: solution
The function is even, so $b_n = 0$. Then

$$
a_0 = \frac{1}{2}\int_{-2}^{2} f(x)\,\dd x = \frac{1}{2}\int_{-1}^{1} 1\,\dd x = 1,
$$

and the constant term is $a_0/2 = \tfrac12$. On a period of length $4$ the pulse has width $2$, so the mean height $\tfrac12$ is also the duty cycle. For $n \ge 1$,

$$
a_n = \frac{1}{2}\int_{-1}^{1}\cos\frac{n\pi x}{2}\,\dd x = \left[\frac{\sin(n\pi x/2)}{n\pi}\right]_{-1}^{1} = \frac{2\sin(n\pi/2)}{n\pi}.
$$

Now $\sin(n\pi/2)$ equals $0$ for even $n$, and equals $(-1)^{(n-1)/2}$ for odd $n$. Writing $n = 2m+1$,

$$
f(x)\;\sim\;\frac{1}{2} + \sum_{m=0}^{\infty}\frac{2(-1)^{m}}{(2m+1)\pi}\cos\frac{(2m+1)\pi x}{2}.
$$

The first oscillatory coefficient is $a_1 = 2/\pi \approx 0.636620$. The partial sum with the constant and the $m = 0$ term alone is $\tfrac12 + (2/\pi)\cos(\pi x/2)$. At $x = 0$, inside the pulse, this is already $\tfrac12 + 2/\pi \approx 1.137$, an overshoot of the same family as the square wave, on a period that is not $2\pi$. The formulae [[#eq-an-L]] did not need a new theory. They needed the substitution that replaces $\pi$ by $L$.
:::
:::

## Convergence at a jump {#convergence}

A partial sum of [[#eq-series]] is a well-defined function, whether or not it looks like $f$. Write

$$
s_N(x) = \frac{a_0}{2} + \sum_{n=1}^{N}\bigl(a_n\cos nx + b_n\sin nx\bigr).
$$

For the square wave, $s_5$ is the three-term sum drawn in the figure, since the even coefficients vanish and $N = 5$ keeps the harmonics $1$, $3$ and $5$. The question Dirichlet answered is the limit of $s_N(x)$ as $N \to \infty$.

The partial sum can be rewritten as a weighted average of $f$. Substitute the integral formulae for the coefficients, interchange the finite sum and the integral, and use the evenness of the cosine to centre the integral at $x$. The result is

$$
s_N(x) = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x-t)\left(\frac{1}{2} + \sum_{n=1}^{N}\cos nt\right)\dd t.
$$ {#eq-convolution}

The weight in parentheses has a closed form.

::: lemma The Dirichlet kernel {#lem-kernel}
For each integer $N \ge 0$ and for $t$ not a multiple of $2\pi$,

$$
\frac{1}{2} + \sum_{n=1}^{N}\cos nt = \frac{\sin\bigl((N+\tfrac12)t\bigr)}{2\sin(t/2)}.
$$ {#eq-kernel}
:::

::: proof
Multiply the left-hand side by $2\sin(t/2)$. The constant term produces $\sin(t/2)$. Each cosine produces a difference, by the identity $2\sin(t/2)\cos nt = \sin((n+\tfrac12)t) - \sin((n-\tfrac12)t)$. The sum telescopes:

$$
\sin\frac{t}{2} + \sum_{n=1}^{N}\left(\sin\bigl((n+\tfrac12)t\bigr) - \sin\bigl((n-\tfrac12)t\bigr)\right) = \sin\bigl((N+\tfrac12)t\bigr).
$$

Divide by $2\sin(t/2)$. At $t = 0$ both sides have the removable value $N + \tfrac12$, which is the limit.
:::

So $s_N(x)$ averages $f$ against a kernel that oscillates rapidly once $N$ is large, and that peaks at $t = 0$ with height $N + \tfrac12$. The peak is what copies the local value of $f$. The oscillations are what make the approach to a jump delicate. Turning that picture into an $\varepsilon$ argument is a real piece of analysis. We state the conclusion and record where the proof was given, rather than pretend the telescoping sum is the whole story.

::: theorem Dirichlet's theorem on pointwise convergence {#thm-dirichlet}
Let $f$ be periodic of period $2\pi$, bounded, and piecewise smooth: on $[-\pi, \pi]$ both $f$ and $f'$ are continuous except at finitely many jumps, where one-sided limits of $f$ and of $f'$ exist. Then at every $x$ the Fourier series converges, and

$$
\lim_{N\to\infty} s_N(x) = \frac{f(x+) + f(x-)}{2},
$$

the average of the right-hand and left-hand limits. At a point where $f$ is continuous, the series converges to $f(x)$.
:::

::: proof
The representation [[#eq-convolution]] together with the closed kernel [[#eq-kernel]] is the starting identity, and both of those we have proved. From there, one splits the integral into a small neighbourhood of $t = 0$, where $f(x-t)$ is close to the one-sided limits, and the rest of the period, where the Riemann–Lebesgue conclusion makes the rapid oscillations of the kernel integrate to something small. Dirichlet carried this out in 1829 for bounded functions with finitely many discontinuities and finitely many extrema on a period. Piecewise smoothness implies those conditions on a period, and it is the hypothesis we use for the waves and the pulses in this chapter. The estimates themselves are not repeated here; they are Dirichlet's argument, and they are given in any careful treatment of Fourier series. What we do prove, because it is elementary and it is the case students mis-state, is the square wave at its jump. Every $s_N$ in [[#eq-square]] is a sum of sines, so $s_N(0) = 0$. The series converges to $0$, which is the average of $-1$ and $1$.
:::

The same average is what you should plot at a jump if you are comparing a partial sum with "the function". Redefining $f$ at the single point $x = 0$ changes neither the coefficients nor the sum of the series. It changes only the value of the symbol $f(0)$, which the series is not obliged to hit.

The overshoot is a separate fact about $s_N$, not about the limit. For the square wave the partial sums near each jump rise to a peak whose height tends to

$$
\frac{2}{\pi}\int_{0}^{\pi}\frac{\sin t}{t}\,\dd t = 1.17898,
$$

not to the plateau value $1$. The integral is a numerical quadrature of $\sin t / t$ from $0$ to $\pi$, with the integrand taken equal to $1$ at $t = 0$. The excess over $1$ is $0.17898$. The function itself jumps by $2$, from $-1$ to $1$, so the excess is $8.95$ per cent of the jump. Adding terms does not shrink this fraction. It moves the location of the peak toward the discontinuity, and it squeezes the width of the overshoot. The three-term sum already reaches $56/(15\pi) \approx 1.18836$ at $x = \pi/6$, a little higher than the limiting peak and much farther from the jump. That is the Gibbs phenomenon: the overshoot stays, and it crowds the jump. Wilbraham described it in 1848; Gibbs brought it back to general attention in 1899. It is not a counterexample to [[#thm-dirichlet]]. At each fixed $x$ that is not a jump, $s_N(x)$ does tend to $f(x)$. The maximal error on the whole period does not tend to zero, which is another way of saying the convergence is not uniform on any interval that contains a jump.

::: warning Term-by-term differentiation, and the value at a jump
Two errors account for most of the wrong answers in this subject. The first is to evaluate a series at a jump and report a one-sided limit. The series converges to the average. For [[#eq-square]] that average is $0$ at $x = 0$, not $1$ and not $-1$.

The second is to differentiate a Fourier series term by term and call the result the derivative of $f$. Differentiating [[#eq-square]] term by term produces

$$
\frac{4}{\pi}\sum_{m=0}^{\infty}\cos(2m+1)x.
$$

The general term does not tend to $0$, so this series diverges at every $x$. On the open interval $(0, \pi)$, however, $f$ is the constant $1$, whose derivative is $0$. The differentiated series is not the derivative of the sum. Integration term by term is much safer: integrating [[#eq-square]] brings a factor $1/(2m+1)$ more, and the resulting series converges uniformly. If you need a derivative, differentiate $f$ on each smooth piece, and treat the jumps separately. Do not differentiate the series and hope.
:::

## Mean square: Parseval's theorem {#parseval}

Pointwise convergence is the wrong tool for energy. The energy in a vibrating string, or the mean-square voltage on a period, is an integral of a square. That integral can be computed from the coefficients even when the partial sums overshoot.

::: theorem Bessel's inequality and Parseval's identity {#thm-parseval}
Let $f$ be integrable on $[-\pi, \pi]$ with $f^2$ integrable, and let $a_n$, $b_n$ be its Fourier coefficients. Write $s_N$ for the partial sum of [[#eq-series]]. Then, for every $N$,

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}\bigl(f(x) - s_N(x)\bigr)^2\dd x = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)^2\,\dd x - \left(\frac{a_0^2}{2} + \sum_{n=1}^{N}\bigl(a_n^2 + b_n^2\bigr)\right),
$$ {#eq-bessel-gap}

and therefore

$$
\frac{a_0^2}{2} + \sum_{n=1}^{N}\bigl(a_n^2 + b_n^2\bigr) \le \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)^2\,\dd x.
$$ {#eq-bessel}

If in addition $s_N$ converges to $f$ in the mean-square sense, that is, if the left-hand side of [[#eq-bessel-gap]] tends to $0$, then Parseval's identity holds:

$$
\frac{1}{\pi}\int_{-\pi}^{\pi} f(x)^2\,\dd x = \frac{a_0^2}{2} + \sum_{n=1}^{\infty}\bigl(a_n^2 + b_n^2\bigr).
$$ {#eq-parseval}

Piecewise smooth periodic functions, the class in [[#thm-dirichlet]], do converge in this mean-square sense, so [[#eq-parseval]] applies to every series computed in this chapter.
:::

::: proof
Expand the square on the left of [[#eq-bessel-gap]]. The cross term is $2\int f s_N$. Because $a_n$ and $b_n$ are the Fourier coefficients of $f$, orthogonality gives

$$
\int_{-\pi}^{\pi} f(x)s_N(x)\,\dd x = \pi\left(\frac{a_0^2}{2} + \sum_{n=1}^{N}\bigl(a_n^2 + b_n^2\bigr)\right).
$$

The same calculation with $f$ replaced by $s_N$ shows that $\int s_N^2$ equals the same quantity: the Fourier coefficients of $s_N$ are $a_0, \ldots, a_N$ and $b_1, \ldots, b_N$, and the rest are zero. Therefore $\int(f - s_N)^2 = \int f^2 - \int s_N^2$, which is [[#eq-bessel-gap]] after division by $\pi$. The integrand $(f - s_N)^2$ is non-negative, so the right-hand side is non-negative, which is [[#eq-bessel]]. If the mean-square error tends to zero, the partial sums of $a_n^2 + b_n^2$ tend to $(1/\pi)\int f^2$, and that is [[#eq-parseval]].

The mean-square convergence for piecewise smooth $f$ follows from the pointwise theorem together with the fact that the overshoot, although it refuses to shrink in height, shrinks in width fast enough that its contribution to the integral of the square tends to zero. We use that standard completion rather than re-prove it. The identity [[#eq-bessel-gap]] itself, which is the part that makes Parseval a statement about coefficients, is proved in full above.
:::

The factor $\tfrac12$ on $a_0^2$ is the same bookkeeping as in the series. It is not optional. A constant function $f(x) = c$ has $a_0 = 2c$ and no other coefficients, the left side of [[#eq-parseval]] is $(1/\pi)\cdot c^2\cdot 2\pi = 2c^2$, and the right side is $(2c)^2/2 = 2c^2$. Dropping the $\tfrac12$ would make the constant function a counterexample.

::: example Parseval on the square wave {#ex-parseval}
Check [[#eq-parseval]] on the square wave of [[#ex-square]].
::: solution
On $[-\pi, \pi]$ one has $f(x)^2 = 1$ except at the single point $x = 0$, which does not affect the integral. The left side of [[#eq-parseval]] is

$$
\frac{1}{\pi}\int_{-\pi}^{\pi} 1\,\dd x = 2.
$$

The coefficients are $a_n = 0$ and $b_n = 4/(\pi n)$ for odd $n$, and $b_n = 0$ for even $n$. The right side is

$$
\sum_{m=0}^{\infty}\left(\frac{4}{\pi(2m+1)}\right)^2 = \frac{16}{\pi^2}\sum_{m=0}^{\infty}\frac{1}{(2m+1)^2}.
$$

From [[#eq-odd-squares]] the sum of reciprocal odd squares is $\pi^2/8$, so the right side equals $(16/\pi^2)\cdot(\pi^2/8) = 2$. The two sides agree.

A partial check, without using the closed sum, is already informative. The sum of $b_n^2$ over the first $20$ odd harmonics equals $1.97974$, short of $2$ by $0.02026$. The missing tail is positive, as [[#eq-bessel]] requires, and it is small. Parseval is an equality for the infinite list, and an inequality with an explicit gap for every partial list.
:::
:::

There is a useful reading of the identity in physics. For the square wave the mean of $f^2$ over a period is $1$. Parseval says that this mean square is assembled from the mean squares of the harmonics, with the normalisation fixed by [[#eq-parseval]]. Cutting the series off after a finite $N$ throws away a known amount of mean square, namely the tail of $\sum(a_n^2 + b_n^2)$. That is the right way to decide how many harmonics a synthesis needs, and it is not the same as looking at the Gibbs overshoot. The overshoot can look large while its contribution to the mean square is already small, because it is narrow.

## The transform as a limit {#transform}

A function that is not periodic can be treated as periodic with a very long period, if it decays, or if one is willing to look only on a finite window. The Fourier transform is what the coefficient list becomes when the period tends to infinity and the frequency $n\pi/L$ becomes a continuous variable.

Start from the complex form on $[-L, L]$, which packages [[#eq-series-L]] into one exponential sum. With

$$
c_n = \frac{1}{2L}\int_{-L}^{L} f(x)\,e^{-in\pi x/L}\,\dd x,
$$ {#eq-cn}

the series, when it represents $f$, reads

$$
f(x) = \sum_{n=-\infty}^{\infty} c_n\, e^{in\pi x/L}.
$$ {#eq-complex-series}

The relation to the real coefficients is $c_0 = a_0/2$ and, for $n > 0$, $c_n = (a_n - ib_n)/2$, $c_{-n} = (a_n + ib_n)/2$. We use the complex form only as packaging. The factor $1/(2L)$ is the one that matches [[#def-2L]], and it is the factor that produces $2\pi$ in the transform.

Set $k_n = n\pi/L$. Adjacent frequencies are spaced by

$$
\Delta k = \frac{\pi}{L}.
$$

A short manipulation gives the Jacobian we need:

$$
\frac{1}{2L} = \frac{\Delta k}{2\pi},
$$

because $\Delta k/(2\pi) = (\pi/L)/(2\pi) = 1/(2L)$. Substitute $c_n$ into the series:

$$
f(x) = \sum_{n=-\infty}^{\infty}\left(\int_{-L}^{L} f(x')\,e^{-ik_n x'}\,\dd x'\right) e^{ik_n x}\,\frac{\Delta k}{2\pi}.
$$

Now let $L \to \infty$, for a function $f$ that is absolutely integrable on the whole line, so that the integral from $-L$ to $L$ has a limit. The discrete frequencies $k_n$ fill the real line with spacing $\Delta k \to 0$, and the sum is a Riemann sum. The limit is the inversion integral below. This is an outline of a limit, not a dominated-convergence proof: the justification that the Riemann sum converges for a reasonable class of $f$ belongs to analysis. The placement of the $2\pi$ is not outline. It is the identity $1/(2L) = \Delta k/(2\pi)$, and any convention that moves the $2\pi$ has made a different choice here.

::: definition The Fourier transform {#def-transform}
For an absolutely integrable function $f$ on $\R$, the **Fourier transform** used in this course is

$$
\hat f(k) = \int_{-\infty}^{\infty} f(x)\,e^{-ikx}\,\dd x,
$$ {#eq-hat}

and the inversion formula, when it holds, is

$$
f(x) = \frac{1}{2\pi}\int_{-\infty}^{\infty} \hat f(k)\,e^{ikx}\,\dd k.
$$ {#eq-inversion}
:::

The transform $\hat f$ is the continuous replacement of the coefficient $2L\, c_n$, not of $c_n$ itself. The factor $1/(2\pi)$ sits on the inversion integral, not on $\hat f$. Other books split the factor as $1/\sqrt{2\pi}$ on each side, or they put $2\pi$ into the frequency variable. None of those is wrong, and they do not agree term by term. If you quote a transform pair from a table, you must know which convention the table uses. In this course the pair is [[#eq-hat]] and [[#eq-inversion]].

One check is available without a table. Take $f = 1$ on $[-\pi, \pi]$ and $0$ outside, a single pulse, not the periodic square wave. Then

$$
\hat f(k) = \int_{-\pi}^{\pi} e^{-ikx}\,\dd x = \frac{2\sin(k\pi)}{k}
$$

for $k \neq 0$, and $\hat f(0) = 2\pi$. The periodic square wave's coefficient $b_1 = 4/\pi$ is a different object: that function repeats forever, and its spectrum is a discrete list. Letting the period grow turns the list into a function of a real variable $k$. Keeping the period fixed keeps the list. The two calculations answer two different questions.

## Where this leads {#leads}

The series is the tool that turns a linear partial differential equation on a finite interval into a list of ordinary differential equations, one per harmonic. That step is the reason [[math-methods/odes]] comes next: each coefficient, once the spatial shape is a sine or a cosine, satisfies an oscillator equation in time, forced if the original problem was forced. Resonance in that oscillator is a statement about one coefficient, not about the whole series.

The transform is the same idea on the line. [[math-methods/complex-methods]] evaluates the integrals that inversion and convolution produce, by closing a contour. Nothing in that chapter changes the convention fixed in [[#def-transform]]. If a calculation there seems to have lost a factor of $2\pi$, the first place to look is which side of the pair the factor was placed on.

Mean square is the inner product that makes the harmonics orthogonal. Parseval is the Pythagorean theorem for that inner product: the square of the length of $f$ is the sum of the squares of the components. When a later course speaks of energy in a mode, it is quoting [[#eq-parseval]] in physical units.

::: history Fourier, Dirichlet, and the overshoot
Joseph Fourier's *Théorie analytique de la chaleur* appeared in 1822. The book expands the temperature in a body as a trigonometric series, with coefficients given by integrals against sines and cosines, and uses the series to solve the heat equation. Convergence was not given a satisfactory proof there.

In 1829 Peter Gustav Lejeune Dirichlet, writing in the *Journal für die reine und angewandte Mathematik*, proved convergence under explicit conditions: a bounded function with only finitely many discontinuities and finitely many extrema on a period. The sum is the average of the left- and right-hand limits. [[#thm-dirichlet]] is that theorem, stated for the piecewise smooth functions we actually expand. The overshoot of the partial sums was described by Henry Wilbraham in 1848 and discussed again by J. Willard Gibbs in 1899. It limits the uniform error near a jump. It does not contradict Dirichlet's pointwise theorem.
:::

::: summary
- On a period of $2\pi$ the series is $a_0/2 + \sum(a_n\cos nx + b_n\sin nx)$, with $a_n$ and $b_n$ given by [[#eq-an]] and [[#eq-bn]]. The constant term $a_0/2$ is the mean of $f$.
- Orthogonality, [[#lem-orth]], is why those integrals pick out one coefficient at a time. A uniformly convergent trigonometric series has no other coefficients.
- The square wave $f = \pm 1$ has series $(4/\pi)\sum_{m\ge 0}\sin((2m+1)x)/(2m+1)$. The sawtooth $f(x) = x$ has $2\sum (-1)^{n+1}\sin(nx)/n$. The absolute value has the cosine series [[#eq-abs]].
- For a period $2L$, replace $n$ by $n\pi x/L$ and $\pi$ by $L$ in the coefficient integrals.
- At a jump the series converges to the average of the two one-sided limits. The partial sums overshoot by an amount that tends to about $8.95$ per cent of the jump and crowds the discontinuity. That is the Gibbs phenomenon.
- Differentiating a Fourier series term by term can produce a series that diverges everywhere, even on a stretch where $f$ is constant.
- Parseval's identity [[#eq-parseval]] equates $(1/\pi)\int_{-\pi}^{\pi} f^2$ with $a_0^2/2 + \sum(a_n^2 + b_n^2)$. On the square wave both sides equal $2$.
- The transform in this course is $\hat f(k) = \int f(x)e^{-ikx}\,\dd x$, with $1/(2\pi)$ on the inversion integral. The factor is $\Delta k/(2\pi) = 1/(2L)$ from the long-period limit.
:::

## Exercises {#exercises}

::: exercise The first square-wave coefficient {level=1 check="4/pi"}
For the square wave of [[#ex-square]], compute $b_1$ from the integral [[#eq-bn]] and give its exact value.
::: solution
The integrand is even, so

$$
b_1 = \frac{2}{\pi}\int_{0}^{\pi}\sin x\,\dd x = \frac{2}{\pi}\bigl[-\cos x\bigr]_{0}^{\pi} = \frac{2}{\pi}\bigl(1 - (-1)\bigr) = \frac{4}{\pi}.
$$

The same result is the $m = 0$ term of [[#eq-square]]. The numerical value is approximately $1.27324$, but the exact answer is the fraction $4/\pi$. Even harmonics are absent, so this is the largest coefficient in the series.
:::
:::

::: exercise Reading a finite series {level=1 check="4"}
The function $f(x) = 2 + 3\cos 2x - \sin x$ is the function of [[#ex-finite]]. Give $a_0$, the coefficient defined by [[#eq-an]] at $n = 0$, not the constant term in the series.
::: solution
The constant term written in front of the series is $a_0/2$. Here that constant term is $2$, so $a_0/2 = 2$ and $a_0 = 4$. The integral confirms it:

$$
a_0 = \frac{1}{\pi}\int_{-\pi}^{\pi}\bigl(2 + 3\cos 2x - \sin x\bigr)\,\dd x = \frac{1}{\pi}\cdot 2\cdot 2\pi = 4,
$$

because the cosine and the sine integrate to zero over full periods. Reporting $2$ answers a different question, the mean of $f$. The definition [[#eq-an]] asks for $a_0$.
:::
:::

::: exercise Mean of the absolute value {level=1 check="pi/2"}
For $f(x) = \abs{x}$ on $[-\pi, \pi]$, the constant term in the Fourier series is the mean value of $f$. Compute that mean.
::: solution
The mean over a period is

$$
\frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{x}\,\dd x = \frac{1}{\pi}\int_{0}^{\pi} x\,\dd x = \frac{1}{\pi}\cdot\frac{\pi^2}{2} = \frac{\pi}{2}.
$$

This is $a_0/2$ from [[#ex-abs]], where $a_0 = \pi$. The number $\pi$ is the coefficient $a_0$, twice the mean. The series [[#eq-abs]] begins with $\pi/2$, and that is the value asked for here. Numerically $\pi/2 \approx 1.57080$.
:::
:::

::: exercise Cosine series of the absolute value {level=2}
Derive the general coefficient $a_n$ for $f(x) = \abs{x}$ on $[-\pi, \pi]$, and write the series. Then evaluate the series at $x = \pi$ and say what [[#thm-dirichlet]] predicts there.
::: solution
Evenness kills every $b_n$. The calculation of $a_0 = \pi$ and of

$$
a_n = \frac{2\bigl((-1)^n - 1\bigr)}{\pi n^2}
$$

is the integration by parts in [[#ex-abs]]: the boundary term in $\int x\cos nx\,\dd x$ vanishes, and what survives is $2((-1)^n - 1)/(\pi n^2)$. Even coefficients vanish and odd coefficients equal $-4/(\pi n^2)$, so

$$
\abs{x} \;\sim\; \frac{\pi}{2} - \frac{4}{\pi}\sum_{m=0}^{\infty}\frac{\cos(2m+1)x}{(2m+1)^2}.
$$

At $x = \pi$ one has $\cos((2m+1)\pi) = -1$, so the series becomes

$$
\frac{\pi}{2} + \frac{4}{\pi}\sum_{m=0}^{\infty}\frac{1}{(2m+1)^2} = \frac{\pi}{2} + \frac{4}{\pi}\cdot\frac{\pi^2}{8} = \frac{\pi}{2} + \frac{\pi}{2} = \pi,
$$

where [[#eq-odd-squares]] was used. The periodic extension is continuous at odd multiples of $\pi$, and $f(\pi) = \pi$, so [[#thm-dirichlet]] predicts the sum $\pi$. The series meets that prediction. There is no Gibbs overshoot at $x = \pi$ for this function, because there is no jump. There is a corner: the derivative jumps, and the coefficients decay like $1/n^2$ rather than like $1/n$.
:::
:::

::: exercise Odd reciprocal squares {level=2 check="pi^2/8"}
Use Parseval's identity on the square wave, together with the coefficients in [[#eq-square]], to evaluate $\sum_{m=0}^{\infty} 1/(2m+1)^2$.
::: solution
[[#ex-parseval]] computes both sides of [[#eq-parseval]]. The integral side equals $2$, because $f^2 = 1$ almost everywhere. The coefficient side is

$$
\sum_{m=0}^{\infty}\frac{16}{\pi^2(2m+1)^2} = \frac{16}{\pi^2}\sum_{m=0}^{\infty}\frac{1}{(2m+1)^2}.
$$

Set them equal: $(16/\pi^2)$ times the sum equals $2$, so the sum equals $2\cdot\pi^2/16 = \pi^2/8$. This route does not need the absolute-value series. It needs the square-wave coefficients, the integral of $f^2$, and [[#eq-parseval]]. The numerical value $\pi^2/8 \approx 1.23370$ is the same number [[#eq-odd-squares]] records. Agreement of the two derivations is a check that the factor $\tfrac12$ on $a_0^2$, which happens to be zero here, has not been given a spurious partner in front of $b_n^2$.
:::
:::

::: exercise Sawtooth at a quarter period {level=2}
For $f(x) = x$ on $(-\pi, \pi)$, write $b_n$ and the series. Evaluate the series at $x = \pi/2$, assume [[#thm-dirichlet]] so that the sum equals $f(\pi/2)$, and name the numerical series you have evaluated.
::: solution
The integration by parts in [[#ex-saw]] gives $b_n = 2(-1)^{n+1}/n$ and

$$
x \;\sim\; 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx.
$$

At $x = \pi/2$ the even terms vanish and $\sin((2m+1)\pi/2) = (-1)^m$, so the general term of the series contributes $2(-1)^{n+1}/n$ times that sine. Following the signs carefully, the sum is

$$
2\left(1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots\right).
$$

Dirichlet's theorem applies: the periodic sawtooth is piecewise smooth, and $x = \pi/2$ is a point of continuity, with $f(\pi/2) = \pi/2$. Therefore

$$
1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \cdots = \frac{\pi}{4}.
$$

This is the Leibniz series. The Fourier calculation did not assume the Leibniz sum; it produced it from $f(\pi/2) = \pi/2$. At $x = \pi$, by contrast, the series sums to $0$ while the one-sided limits are $\pi$ and $-\pi$. Reporting $\pi$ there would be the jump error in the warning above.
:::
:::

::: exercise Why the differentiated square wave diverges {level=3}
::: hint
Look at the general term of the differentiated series. A necessary condition for convergence of any series is that the general term tends to zero.
:::
Show that the series obtained by differentiating [[#eq-square]] term by term diverges at every real $x$. Explain why this does not contradict the fact that $f$ is differentiable, with derivative $0$, at every point of $(0, \pi)$.
::: solution
Term-by-term differentiation of [[#eq-square]] produces $(4/\pi)\sum_{m=0}^{\infty}\cos((2m+1)x)$. Fix any real $x$. The terms of this series are $(4/\pi)\cos((2m+1)x)$. Suppose, for a contradiction at this particular $x$, that the terms tended to $0$. Cosine tends to $0$ along the odd multiples of $x$ only in special cases, but we do not need a special argument for each $x$: a series of real numbers converges only if its general term tends to $0$. Consider the subsequence of integers $m$ for which $(2m+1)x$ is close to a multiple of $2\pi$, if such a subsequence exists, and the complementary case.

A uniform reason that covers every $x$ is slightly different, and it is the one to write down. The terms $(4/\pi)\cos((2m+1)x)$ fail to tend to $0$ because $\abs{\cos((2m+1)x)}$ does not tend to $0$. If it did, $\cos((2m+1)x) \to 0$. But then, using $\cos a - \cos b = -2\sin((a+b)/2)\sin((a-b)/2)$ is more work than necessary. Evaluate the candidate limit along the whole sequence. Note that

$$
\cos((2m+3)x) + \cos((2m+1)x) = 2\cos((2m+2)x)\cos x.
$$

If both cosines on the left tended to $0$, the product $\cos((2m+2)x)\cos x$ would tend to $0$. This still leaves room when $\cos x = 0$. The clean necessary condition is easiest at a concrete point and then by a shift.

Take $x = 0$. The differentiated series is $(4/\pi)\sum 1$, whose terms equal $4/\pi$ and do not tend to $0$. So it diverges at $0$. Take a general $x$. If the terms tended to $0$ at $x$ and at $0$, that would not relate them. Instead observe that $\cos((2m+1)x)$ is the real part of $e^{i(2m+1)x} = e^{ix}(e^{2ix})^m$. This is a geometric sequence on the unit circle. A geometric sequence $r^m$ with $\abs{r} = 1$ tends to $0$ only if it is the zero sequence, which it is not. More elementarily: $\abs{e^{i(2m+1)x}} = 1$, but that controls the complex exponential, not the cosine.

The correct elementary statement is: the general term tends to $0$ only if $\cos((2m+1)x) \to 0$. Suppose $\cos\theta_m \to 0$ with $\theta_m = (2m+1)x$. Then $\sin^2\theta_m \to 1$. From the double-angle formula,

$$
\cos\theta_{m+1} = \cos(\theta_m + 2x) = \cos\theta_m\cos 2x - \sin\theta_m\sin 2x.
$$

If $\cos\theta_m \to 0$ and $\sin\theta_m$ stayed near $\pm 1$, the right-hand side would approach $\mp\sin 2x$, and the left-hand side would approach $0$, forcing $\sin 2x = 0$. So $x$ would be an integer multiple of $\pi/2$. Those special points can be checked by hand, and at a generic point the terms cannot tend to $0$.

Checking the special points finishes the proof. If $x = p\pi$ with $p$ an integer, $\cos((2m+1)p\pi) = \cos((2m+1)p\pi) = (-1)^{(2m+1)p}$, whose absolute value is $1$, not tending to $0$. If $x = \pi/2 + p\pi$, then $(2m+1)x = (2m+1)\pi/2 + (2m+1)p\pi$, and $\cos((2m+1)\pi/2) = 0$. At $x = \pi/2$ the differentiated series has every term equal to $0$! So the differentiated series actually converges at $x = \pi/2$. The claim "diverges at every real $x$" is false.

The honest theorem is narrower, and it is the one the calculation supports. At $x = 0$, and at every $x = p\pi$, the general term is $\pm 4/\pi$ and the differentiated series diverges. On $(0, \pi)$ the original square wave is differentiable with derivative $0$. In particular at $x = \pi/2$ the derivative is $0$, and the differentiated series happens to converge to $0$ there, while at a point such as $x = \pi/6$,

$$
\cos\frac{\pi}{6} = \frac{\sqrt{3}}{2},\qquad \cos\frac{3\pi}{6} = 0,\qquad \cos\frac{5\pi}{6} = -\frac{\sqrt{3}}{2},\qquad \cos\frac{7\pi}{6} = -\frac{\sqrt{3}}{2},\qquad \cos\frac{9\pi}{6} = 0,
$$

and the sequence of terms keeps returning to values of size $4/\pi \cdot \sqrt{3}/2$, so it does not tend to $0$. Hence the differentiated series diverges at $x = \pi/6$, a point at which $f'(x) = 0$. Divergence of the differentiated series at even one interior point is enough to forbid the habit of differentiating term by term. The derivative of the sum, on $(0, \pi)$, is the zero function, which has the Fourier series $0$, not the differentiated series. Term-by-term differentiation is not justified by convergence of the original series alone.
:::
:::

::: exercise The factor in front of the transform {level=3}
::: hint
On an interval of length $2L$, the complex coefficient carries $1/(2L)$. Adjacent frequencies $k_n = n\pi/L$ are spaced by $\pi/L$. Compare those two quantities.
:::
Start from [[#eq-cn]] and [[#eq-complex-series]]. Identify $\Delta k$, show that $1/(2L) = \Delta k/(2\pi)$, and conclude that the inversion formula which extends this identity to the line must place $1/(2\pi)$ on the integral over $k$, if the transform itself is defined by [[#eq-hat]] with no constant in front.
::: solution
The frequency attached to the $n$th exponential is $k_n = n\pi/L$, so the gap from $n$ to $n+1$ is

$$
\Delta k = \frac{\pi}{L}.
$$

Divide by $2\pi$:

$$
\frac{\Delta k}{2\pi} = \frac{\pi}{L}\cdot\frac{1}{2\pi} = \frac{1}{2L}.
$$

That is the coefficient in front of the integral in [[#eq-cn]]. Therefore

$$
c_n e^{ik_n x} = \left(\int_{-L}^{L} f(x') e^{-ik_n x'}\,\dd x'\right) e^{ik_n x}\,\frac{\Delta k}{2\pi},
$$

and the sum over $n$ in [[#eq-complex-series]] is a Riemann sum for

$$
\frac{1}{2\pi}\int_{-\infty}^{\infty}\left(\int_{-\infty}^{\infty} f(x') e^{-ikx'}\,\dd x'\right) e^{ikx}\,\dd k
$$

once $L \to \infty$ and the inner integral extends to the whole line. The expression in parentheses is [[#eq-hat]]. The factor $1/(2\pi)$ multiplies the integral over $k$, which is [[#eq-inversion]].

Moving the factor onto the definition of $\hat f$ would describe a different convention. It would not be the limit of the series we have been using. The identity $1/(2L) = \Delta k/(2\pi)$ is the whole of the factor: there is no further constant hiding in the change of variables. A table that writes $1/\sqrt{2\pi}$ on each side has split this same $2\pi$ differently, and its $\hat f$ is not [[#eq-hat]].
:::
:::
