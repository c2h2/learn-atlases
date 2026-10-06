In 1807 Joseph Fourier made a claim that the leading mathematicians of his day found hard to believe: essentially *any* function on an interval, even one with corners or jumps, can be written as a sum of sines and cosines. For example, the square wave that equals $-1$ on $(-\pi, 0)$ and $+1$ on $(0, \pi)$ should be

$$
\frac{4}{\pi}\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \frac{\sin 7x}{7} + \cdots\right),
$$

an infinite sum of perfectly smooth waves that somehow adds up to a function that jumps. How can that be? In what sense does the sum "equal" the function, and what happens exactly at the jump, where the function has no single obvious value?

Fourier needed such expansions to solve the heat equation, and they are the main tool of this whole course: separating variables in the heat, wave and Laplace equations ([[pde/heat-equation]], [[pde/wave-equation]], [[pde/laplace-equation]]) produces exactly these sums. In this chapter we build the theory from the ground up. Orthogonality of sines and cosines tells us how to compute the coefficients; a geometric argument shows that the partial sums are the best possible approximations in a mean-square sense; and a careful analysis with the Dirichlet kernel proves that for piecewise smooth functions the series converges at every point — to the midpoint of each jump. Along the way we meet the Gibbs phenomenon and use Parseval's identity to sum series such as $\sum 1/n^2 = \pi^2/6$.

## Periodic functions and trigonometric polynomials

A function $f\colon \R\to\R$ is **periodic with period** $T > 0$ if $f(x + T) = f(x)$ for every $x$. The functions $\cos nx$ and $\sin nx$, $n = 0, 1, 2, \dots$, all have period $2\pi$ (for $n \ge 1$ the smallest period is $2\pi/n$, but $2\pi$ is a period of each). So do their finite linear combinations

$$
T(x) = \frac{c_0}{2} + \sum_{n=1}^{N}\bigl(c_n\cos nx + d_n\sin nx\bigr),
$$ {#eq-trig-poly}

which are called **trigonometric polynomials** of degree at most $N$. The name is apt: since $\cos nx$ and $\sin nx$ are combinations of $e^{inx} = (e^{ix})^n$ and $e^{-inx}$, a trigonometric polynomial is an ordinary polynomial in $e^{ix}$ and $e^{-ix}$. The odd-looking $c_0/2$ for the constant term will make one formula cover all the coefficients.

Any function defined on an interval of length $2\pi$, say on $(-\pi, \pi]$, has a unique **$2\pi$-periodic extension** to $\R$, obtained by repeating its graph in every interval $(-\pi + 2k\pi, \pi + 2k\pi]$. A Fourier series can only ever represent a periodic function, so whenever we expand a function given on $[-\pi, \pi]$, it is really the periodic extension that is being expanded. This has visible consequences. The function $f(x) = x$ is as smooth as can be on $(-\pi, \pi)$, but its periodic extension is the **sawtooth wave**, which jumps from $\pi$ down to $-\pi$ at every odd multiple of $\pi$. By contrast, the periodic extension of $\abs{x}$ is the continuous **triangle wave**.

We need a class of functions that is wide enough to include square waves and sawtooths, yet tame enough for the theory. For one-sided limits we write $f(x^+) = \lim_{t\to0^+} f(x+t)$ and $f(x^-) = \lim_{t\to 0^+} f(x - t)$.

::: definition Piecewise continuous and piecewise smooth functions {#def-piecewise}
A function $f$ on $[a, b]$ is **piecewise continuous** if there is a partition $a = x_0 < x_1 < \dots < x_m = b$ such that $f$ is continuous on each open interval $(x_{j-1}, x_j)$ and has finite one-sided limits at every $x_j$ (from within $[a, b]$). It is **piecewise smooth** if, in addition, $f'$ exists and is continuous on each $(x_{j-1}, x_j)$ and $f'$ also has finite one-sided limits at every $x_j$. A periodic function is piecewise continuous (smooth) if it is so on every bounded interval.
:::

The square wave, the sawtooth and the triangle wave are all piecewise smooth. The function $\sqrt{\abs{x}}$ on $[-\pi, \pi]$ is continuous but not piecewise smooth, because its derivative is unbounded near $0$. A piecewise continuous function is bounded and Riemann integrable, and changing its values at finitely many points changes none of its integrals — so the values of $f$ at the break points $x_j$ will never matter for its Fourier coefficients.

## Orthogonality of sines and cosines

The key to Fourier series is a piece of geometry. For piecewise continuous functions $f$ and $g$ on $[-\pi, \pi]$ define

$$
\inner{f}{g} = \int_{-\pi}^{\pi} f(x)\,g(x)\,dx, \qquad \norm{f} = \sqrt{\inner{f}{f}} = \left(\int_{-\pi}^{\pi} f(x)^2\,dx\right)^{1/2}.
$$ {#eq-inner}

This is the continuous analogue of the dot product of [[linear-algebra/inner-products]]: instead of multiplying components $u_k v_k$ and summing over $k$, we multiply values $f(x)g(x)$ and integrate over $x$. It is symmetric and bilinear, and $\inner{f}{f} \ge 0$. (If $\inner{f}{f} = 0$, then $f$ vanishes at every point where it is continuous, but it could be non-zero at finitely many points; we simply regard two functions that differ at finitely many points as the same element.) The quantity $\norm{f - g}$ is the **mean-square distance** between $f$ and $g$: it is small when $f$ and $g$ are close on average, even if they differ a lot on a short interval.

::: theorem Orthogonality relations {#thm-orthogonality}
For integers $m, n \ge 0$,

$$
\int_{-\pi}^{\pi}\cos mx\cos nx\,dx = \begin{cases} 0 & m \ne n,\\ \pi & m = n \ge 1,\\ 2\pi & m = n = 0,\end{cases}
\qquad
\int_{-\pi}^{\pi}\sin mx\sin nx\,dx = \begin{cases} 0 & m \ne n,\\ \pi & m = n \ge 1,\end{cases}
$$

and $\displaystyle\int_{-\pi}^{\pi}\cos mx\,\sin nx\,dx = 0$ for all $m, n$. In other words, the functions $1, \cos x, \sin x, \cos 2x, \sin 2x, \dots$ are mutually orthogonal for the inner product [[#eq-inner]].
:::

::: proof
For an integer $k \neq 0$ we have $\int_{-\pi}^{\pi}\cos kx\,dx = \bigl[\sin(kx)/k\bigr]_{-\pi}^{\pi} = 0$, and $\int_{-\pi}^{\pi}\sin kx\,dx = 0$ for every integer $k$ because the integrand is odd. The product-to-sum formulas give

$$
\cos mx\cos nx = \tfrac12\bigl[\cos(m-n)x + \cos(m+n)x\bigr], \qquad \sin mx \sin nx = \tfrac12\bigl[\cos(m-n)x - \cos(m+n)x\bigr].
$$

If $m \neq n$ then $m - n$ and $m + n$ are both non-zero integers, so both integrals vanish. If $m = n \ge 1$, then $m - n = 0$ and $m + n \neq 0$, so the integrals equal $\tfrac12\int_{-\pi}^{\pi} 1\,dx = \pi$. If $m = n = 0$ the first integrand is $1$, with integral $2\pi$. Finally, $\cos mx \sin nx$ is the product of an even and an odd function, hence odd, so its integral over the symmetric interval $[-\pi, \pi]$ is zero.
:::

Orthogonality makes coefficients easy to extract. Suppose $f$ is the trigonometric polynomial [[#eq-trig-poly]]. Take the inner product of both sides with $\cos mx$ for some $1 \le m \le N$. By [[#thm-orthogonality]] every term on the right is killed except $c_m\cos mx$, which contributes $c_m\pi$; so $c_m = \frac1\pi\inner{f}{\cos mx}$. Taking the inner product with $1$ gives $\inner{f}{1} = \frac{c_0}{2}\cdot 2\pi = \pi c_0$ — the same formula with $m = 0$, which is why we wrote the constant term as $c_0/2$. Similarly $d_m = \frac1\pi\inner{f}{\sin mx}$. This is exactly how coordinates are found in an orthogonal basis of $\R^n$: the coordinate of $v$ along $e_k$ is $\inner{v}{e_k}/\inner{e_k}{e_k}$. Fourier's insight was to use the same formulas for functions that are *not* trigonometric polynomials.

## Fourier coefficients and Fourier series

::: definition Fourier series {#def-fourier-series}
Let $f$ be $2\pi$-periodic and piecewise continuous (or piecewise continuous on $[-\pi,\pi]$, extended periodically). Its **Fourier coefficients** are

$$
a_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\cos nx\,dx \quad (n \ge 0), \qquad b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)\sin nx\,dx \quad (n \ge 1),
$$ {#eq-coeffs}

and its **Fourier series** is the formal series

$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty}\bigl(a_n\cos nx + b_n\sin nx\bigr).
$$

The trigonometric polynomial $S_N f(x) = \frac{a_0}{2} + \sum_{n=1}^{N}(a_n\cos nx + b_n\sin nx)$ is the $N$th **partial sum**.
:::

The symbol $\sim$ is deliberate: at this stage it asserts nothing about convergence. It only records which coefficients belong to $f$. Whether, and in what sense, the series converges to $f$ is the subject of the rest of the chapter. Because the integrands in [[#eq-coeffs]] are $2\pi$-periodic, the integrals may be taken over any interval of length $2\pi$, such as $[0, 2\pi]$. Note also that $a_0/2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} f$ is the **mean value** of $f$ over a period.

::: example The square wave {#ex-square}
Find the Fourier series of the $2\pi$-periodic function with $f(x) = -1$ for $-\pi < x < 0$ and $f(x) = 1$ for $0 < x < \pi$.
::: solution
The function is odd (apart from its irrelevant values at $0$ and $\pm\pi$), so $f(x)\cos nx$ is odd and every $a_n$ is $0$. The product $f(x)\sin nx$ is even, so

$$
b_n = \frac{2}{\pi}\int_0^{\pi}\sin nx\,dx = \frac{2}{\pi}\left[-\frac{\cos nx}{n}\right]_0^{\pi} = \frac{2\bigl(1 - (-1)^n\bigr)}{\pi n} = \begin{cases} \dfrac{4}{\pi n} & n \text{ odd},\\[1ex] 0 & n \text{ even}.\end{cases}
$$

Hence

$$
f(x) \sim \frac{4}{\pi}\sum_{k=0}^{\infty}\frac{\sin(2k+1)x}{2k+1} = \frac4\pi\left(\sin x + \frac{\sin 3x}{3} + \frac{\sin 5x}{5} + \cdots\right).
$$

If the series converges to $f(\pi/2) = 1$ at $x = \pi/2$ (it does, by [[#thm-dirichlet]] below), then since $\sin\bigl((2k+1)\pi/2\bigr) = (-1)^k$ we obtain Leibniz's series $\frac{\pi}{4} = 1 - \frac13 + \frac15 - \frac17 + \cdots$.
:::
:::

::: widget fourier
wave: custom
f: sign(x)
terms: 5
max: 60
caption: The square wave $f = \sgn(x)$ on $(-\pi,\pi)$ and its partial sums $S_N f$. Increase the number of terms. Away from the jumps the partial sums settle down to $\pm1$, and at $x = 0, \pm\pi$ they always pass through $0$, the midpoint of the jump. But next to each jump there is an overshoot that moves closer to the jump without getting smaller: its height stays near $1.18$. This is the Gibbs phenomenon. In the spectrum, only odd harmonics appear, with heights $4/(\pi n)$.
:::

::: example The sawtooth wave {#ex-sawtooth}
Find the Fourier series of $f(x) = x$ on $(-\pi, \pi)$, extended $2\pi$-periodically.
::: solution
Again $f$ is odd, so $a_n = 0$ and $b_n = \frac{2}{\pi}\int_0^{\pi} x\sin nx\,dx$. Integrating by parts,

$$
\int_0^{\pi} x\sin nx\,dx = \left[-\frac{x\cos nx}{n}\right]_0^{\pi} + \frac1n\int_0^{\pi}\cos nx\,dx = -\frac{\pi\cos n\pi}{n} + 0 = \frac{\pi(-1)^{n+1}}{n}.
$$

Therefore $b_n = \dfrac{2(-1)^{n+1}}{n}$ and

$$
x \sim 2\left(\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \frac{\sin 4x}{4} + \cdots\right) = 2\sum_{n=1}^{\infty}\frac{(-1)^{n+1}}{n}\sin nx.
$$
:::
:::

In both examples the coefficients decrease only like $1/n$. That slow decay is the signature of a jump: the periodic extension of $x$ jumps by $2\pi$ at every odd multiple of $\pi$. Smoother functions have faster-decaying coefficients, as the next examples show.

The symmetry used in these examples is worth recording once and for all.

::: proposition Even and odd functions {#prop-even-odd}
Let $f$ be piecewise continuous on $[-\pi, \pi]$.

1. If $f$ is even, then $b_n = 0$ for all $n$ and $a_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\cos nx\,dx$: the Fourier series is a **cosine series**.
2. If $f$ is odd, then $a_n = 0$ for all $n$ and $b_n = \dfrac{2}{\pi}\displaystyle\int_0^{\pi} f(x)\sin nx\,dx$: the Fourier series is a **sine series**.
:::

::: proof
The product of an even and an odd function is odd, and the integral of an odd function $g$ over $[-\pi,\pi]$ is zero (substitute $x \mapsto -x$ in $\int_{-\pi}^0 g$ to see that it cancels $\int_0^{\pi} g$). The product of two even or of two odd functions is even, and for even $g$ the same substitution gives $\int_{-\pi}^{\pi} g = 2\int_0^{\pi} g$. If $f$ is even, then $f\sin nx$ is odd and $f\cos nx$ is even; if $f$ is odd, the roles are reversed.
:::

::: example The triangle wave {#ex-abs}
Find the Fourier series of $f(x) = \abs{x}$ on $[-\pi, \pi]$ and deduce the value of $\sum_{k\ge0} \frac{1}{(2k+1)^2}$.
::: solution
The function is even, so $b_n = 0$ and $a_0 = \frac{2}{\pi}\int_0^\pi x\,dx = \pi$. For $n \ge 1$, integrating by parts,

$$
a_n = \frac{2}{\pi}\int_0^{\pi} x\cos nx\,dx = \frac{2}{\pi}\left[\frac{x\sin nx}{n} + \frac{\cos nx}{n^2}\right]_0^{\pi} = \frac{2}{\pi}\cdot\frac{(-1)^n - 1}{n^2} = \begin{cases} -\dfrac{4}{\pi n^2} & n\text{ odd},\\[1ex] 0 & n \text{ even}.\end{cases}
$$

So

$$
\abs{x} \sim \frac{\pi}{2} - \frac{4}{\pi}\left(\cos x + \frac{\cos 3x}{9} + \frac{\cos 5x}{25} + \cdots\right).
$$

The triangle wave is continuous and piecewise smooth, so by [[#thm-uniform]] below the series converges to $\abs{x}$ for every $x \in [-\pi, \pi]$. At $x = 0$ this gives $0 = \frac{\pi}{2} - \frac{4}{\pi}\sum_{k\ge0}\frac{1}{(2k+1)^2}$, that is,

$$
\sum_{k=0}^{\infty}\frac{1}{(2k+1)^2} = 1 + \frac19 + \frac{1}{25} + \cdots = \frac{\pi^2}{8}.
$$
:::
:::

::: widget fourier
wave: custom
f: abs(x)
terms: 2
max: 40
caption: The triangle wave $\lvert x\rvert$. Even two or three terms already give a good approximation, and there is no overshoot anywhere: the coefficients $4/(\pi n^2)$ decay like $1/n^2$ and the convergence is uniform. Compare the spectrum with the square wave above, whose coefficients decay only like $1/n$. One derivative of smoothness buys one power of $1/n$.
:::

::: example The parabola and the Basel problem {#ex-xsq}
Find the Fourier series of $f(x) = x^2$ on $[-\pi, \pi]$ and deduce that $\sum_{n=1}^\infty \frac1{n^2} = \frac{\pi^2}{6}$.
::: solution
The function is even. First $a_0 = \frac{2}{\pi}\int_0^{\pi} x^2\,dx = \frac{2\pi^2}{3}$. For $n \ge 1$, two integrations by parts give

$$
\int_0^{\pi} x^2\cos nx\,dx = \left[\frac{x^2\sin nx}{n}\right]_0^{\pi} - \frac{2}{n}\int_0^{\pi} x\sin nx\,dx = -\frac2n\cdot\frac{\pi(-1)^{n+1}}{n} = \frac{2\pi(-1)^n}{n^2},
$$

using the integral computed in [[#ex-sawtooth]]. Hence $a_n = \frac{4(-1)^n}{n^2}$ and

$$
x^2 \sim \frac{\pi^2}{3} + 4\sum_{n=1}^{\infty}\frac{(-1)^n}{n^2}\cos nx = \frac{\pi^2}{3} - 4\left(\cos x - \frac{\cos 2x}{4} + \frac{\cos 3x}{9} - \cdots\right).
$$

The periodic extension is continuous (both ends of the parabola are at height $\pi^2$) and piecewise smooth, so the series converges to $x^2$ on all of $[-\pi,\pi]$. At $x = \pi$, where $\cos n\pi = (-1)^n$,

$$
\pi^2 = \frac{\pi^2}{3} + 4\sum_{n=1}^\infty\frac{1}{n^2}, \qquad\text{so}\qquad \sum_{n=1}^{\infty}\frac{1}{n^2} = \frac{\pi^2}{6}.
$$

This is Euler's celebrated solution of the Basel problem, obtained here in two lines.
:::
:::

::: quiz
Which of these functions on $[-\pi,\pi]$ have Fourier series containing only cosine terms (and possibly a constant)? Select all that apply.
- [x] $\abs{\sin x}$
- [x] $x\sin x$
- [ ] $x^3$
- [ ] $e^x$
::: solution
A function has a pure cosine series exactly when it is even (up to its values at finitely many points), by [[#prop-even-odd]]. $\abs{\sin x}$ is even, and $x\sin x$ is the product of two odd functions, hence even. $x^3$ is odd, so its series contains only sines. $e^x$ is neither even nor odd, so it has both sines and cosines; its even part $\cosh x$ gives the cosine terms and its odd part $\sinh x$ the sine terms.
:::
:::

## Other periods, half-range expansions and complex form

### Functions of period 2L

Nothing is special about $2\pi$. If $f$ has period $2L$, then $g(y) = f(Ly/\pi)$ has period $2\pi$; expanding $g$ and substituting back $y = \pi x/L$ gives

$$
f(x) \sim \frac{a_0}{2} + \sum_{n=1}^{\infty}\left(a_n\cos\frac{n\pi x}{L} + b_n\sin\frac{n\pi x}{L}\right), \quad a_n = \frac1L\int_{-L}^{L}f(x)\cos\frac{n\pi x}{L}\,dx, \quad b_n = \frac1L\int_{-L}^{L}f(x)\sin\frac{n\pi x}{L}\,dx.
$$ {#eq-period-2L}

All results in this chapter transfer to period $2L$ by the same change of variable.

### Half-range expansions

In boundary value problems we are usually given a function on $[0, L]$ only, and we are free to extend it to $[-L, 0)$ in whichever way suits the boundary conditions.

::: definition Half-range sine and cosine series {#def-half-range}
Let $f$ be piecewise continuous on $[0, L]$. Its **Fourier sine series** is the Fourier series of its odd extension to $[-L, L]$, and its **Fourier cosine series** is that of its even extension:

$$
f(x) \sim \sum_{n=1}^{\infty} b_n\sin\frac{n\pi x}{L}, \quad b_n = \frac2L\int_0^L f(x)\sin\frac{n\pi x}{L}\,dx; \qquad f(x)\sim \frac{a_0}{2} + \sum_{n=1}^{\infty}a_n\cos\frac{n\pi x}{L},\quad a_n = \frac2L\int_0^L f(x)\cos\frac{n\pi x}{L}\,dx.
$$
:::

Every term of a sine series vanishes at $x = 0$ and $x = L$, which makes it the right tool when a solution must vanish at the ends of an interval (a string with fixed ends, a rod held at zero temperature). Every term of a cosine series has zero derivative at both ends, which suits insulated ends. We will use both in [[pde/heat-equation]].

::: example A half-range sine series {#ex-half-range}
Expand $f(x) = x(\pi - x)$ on $[0, \pi]$ in a Fourier sine series.
::: solution
Here $L = \pi$ and $b_n = \frac{2}{\pi}\int_0^{\pi}x(\pi - x)\sin nx\,dx$. Integrate by parts twice, noting that $x(\pi - x)$ vanishes at both ends:

$$
\begin{aligned}
\int_0^{\pi}x(\pi-x)\sin nx\,dx &= \left[-\frac{x(\pi-x)\cos nx}{n}\right]_0^{\pi} + \frac1n\int_0^{\pi}(\pi - 2x)\cos nx\,dx \\
&= \frac1n\left[\frac{(\pi - 2x)\sin nx}{n}\right]_0^{\pi} + \frac{2}{n^2}\int_0^{\pi}\sin nx\,dx = \frac{2\bigl(1 - (-1)^n\bigr)}{n^3}.
\end{aligned}
$$

So $b_n = \dfrac{4(1 - (-1)^n)}{\pi n^3}$, which is $\dfrac{8}{\pi n^3}$ for odd $n$ and $0$ for even $n$:

$$
x(\pi - x) = \frac{8}{\pi}\left(\sin x + \frac{\sin 3x}{27} + \frac{\sin 5x}{125} + \cdots\right), \qquad 0 \le x \le \pi.
$$

The odd extension is continuous with a continuous derivative (the slopes $\pm\pi$ match at $0$ and $\pm\pi$); only the second derivative jumps. Accordingly the coefficients decay like $1/n^3$, and already the first term $\frac{8}{\pi}\sin x$ differs from $f$ by less than $0.11$ on $[0,\pi]$, about $4\%$ of the maximum value $\pi^2/4$.
:::
:::

### Complex form

Using $e^{inx} = \cos nx + i\sin nx$, the partial sum can be written $S_Nf(x) = \sum_{n=-N}^{N} c_n e^{inx}$ with

$$
c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)e^{-inx}\,dx \qquad (n \in \Z),
$$ {#eq-complex-coeffs}

and $c_0 = \frac{a_0}{2}$, $c_n = \frac{a_n - ib_n}{2}$, $c_{-n} = \frac{a_n + ib_n}{2}$ for $n \ge 1$. The orthogonality relations become the single statement $\int_{-\pi}^{\pi} e^{imx}\,\overline{e^{inx}}\,dx = 2\pi$ if $m = n$ and $0$ otherwise. The complex form is often quicker for exponentials, and it is the form that generalises to the Fourier transform in [[pde/fourier-transform]].

::: example A complex Fourier series {#ex-exp}
Find the complex Fourier coefficients of $f(x) = e^{x}$ on $(-\pi, \pi)$ and use the series at $x = \pi$ to evaluate $\sum_{n=-\infty}^{\infty}\frac{1}{1 + n^2}$.
::: solution
Since $e^{(1 - in)x}$ has antiderivative $e^{(1-in)x}/(1-in)$ and $e^{\mp in\pi} = (-1)^n$,

$$
c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi}e^{(1-in)x}\,dx = \frac{(-1)^n\bigl(e^{\pi} - e^{-\pi}\bigr)}{2\pi(1 - in)} = \frac{(-1)^n\sinh\pi}{\pi(1 - in)}.
$$

At $x = \pi$ the periodic extension jumps from $e^{\pi}$ down to $e^{-\pi}$, so by [[#thm-dirichlet]] the symmetric partial sums converge there to the midpoint $\frac{e^{\pi} + e^{-\pi}}{2} = \cosh\pi$. On the other hand, $c_ne^{in\pi} = (-1)^nc_n$ and $\frac{1}{1 - in} = \frac{1 + in}{1 + n^2}$, so

$$
S_Nf(\pi) = \frac{\sinh \pi}{\pi}\sum_{n=-N}^{N}\frac{1 + in}{1 + n^2} = \frac{\sinh\pi}{\pi}\sum_{n=-N}^{N}\frac{1}{1 + n^2},
$$

because the imaginary parts of the terms $n$ and $-n$ cancel. Letting $N\to\infty$ gives $\cosh\pi = \frac{\sinh\pi}{\pi}\sum_{n\in\Z}\frac{1}{1+n^2}$, that is,

$$
\sum_{n=-\infty}^{\infty}\frac{1}{1 + n^2} = \pi\coth\pi \approx 3.1533.
$$
:::
:::

## Best approximation and Bessel's inequality

Before asking whether $S_N f(x) \to f(x)$ at individual points, we ask a more geometric question: how well does $S_N f$ approximate $f$ *on average*? The answer is "as well as any trigonometric polynomial of the same degree possibly can", and the proof is Pythagoras' theorem.

::: theorem Best mean-square approximation {#thm-best}
Let $f$ be piecewise continuous on $[-\pi, \pi]$ and $N \ge 0$. For every trigonometric polynomial $T$ of degree at most $N$,

$$
\norm{f - T} \ge \norm{f - S_Nf},
$$

with equality only if $T = S_Nf$. Moreover

$$
\norm{f - S_Nf}^2 = \norm{f}^2 - \pi\left(\frac{a_0^2}{2} + \sum_{n=1}^{N}\bigl(a_n^2 + b_n^2\bigr)\right).
$$ {#eq-pythag}
:::

::: proof
First, $f - S_Nf$ is orthogonal to every trigonometric polynomial of degree at most $N$. It suffices to check this against $1$, $\cos kx$ and $\sin kx$ for $1\le k\le N$. By [[#thm-orthogonality]], $\inner{S_Nf}{\cos kx} = a_k\pi$, while $\inner{f}{\cos kx} = \pi a_k$ by the definition of $a_k$; so $\inner{f - S_Nf}{\cos kx} = 0$. The same computation works for $\sin kx$ and for $1$ (where $\inner{S_Nf}{1} = \frac{a_0}{2}\cdot 2\pi = \inner{f}{1}$).

Now let $T$ have degree at most $N$. Then $S_Nf - T$ is also such a polynomial, so it is orthogonal to $f - S_Nf$, and

$$
\norm{f - T}^2 = \norm{(f - S_Nf) + (S_Nf - T)}^2 = \norm{f - S_Nf}^2 + \norm{S_Nf - T}^2 \ge \norm{f - S_Nf}^2.
$$

Equality forces $\norm{S_Nf - T} = 0$; a trigonometric polynomial is continuous, so this means $T = S_Nf$. Finally, applying the same Pythagorean identity with $T = 0$ gives $\norm{f}^2 = \norm{f - S_Nf}^2 + \norm{S_Nf}^2$, and by orthogonality $\norm{S_Nf}^2 = \bigl(\frac{a_0}{2}\bigr)^2 2\pi + \sum_{n=1}^N(a_n^2\pi + b_n^2\pi)$, which is [[#eq-pythag]].
:::

Since the left-hand side of [[#eq-pythag]] is non-negative, we immediately get an inequality that holds for every $N$, and therefore in the limit.

::: corollary Bessel's inequality {#cor-bessel}
If $f$ is piecewise continuous on $[-\pi, \pi]$, then

$$
\frac{a_0^2}{2} + \sum_{n=1}^{\infty}\bigl(a_n^2 + b_n^2\bigr) \le \frac{1}{\pi}\int_{-\pi}^{\pi} f(x)^2\,dx.
$$

In particular the series on the left converges, so $a_n \to 0$ and $b_n \to 0$ as $n \to \infty$ (the **Riemann–Lebesgue lemma** for Fourier coefficients).
:::

::: intuition Coordinates in infinitely many directions
Think of $1, \cos x, \sin x, \cos 2x, \dots$ as mutually perpendicular axes in an infinite-dimensional space, and of $f$ as a vector. The Fourier coefficients are (rescaled) coordinates of $f$ along these axes, and $S_Nf$ is the orthogonal projection of $f$ onto the span of the first $2N+1$ axes. Bessel's inequality says that the squared lengths of some of the components of a vector cannot add up to more than its total squared length. Parseval's identity below says that *no direction is missing*: the components account for the whole length.
:::

The Riemann–Lebesgue lemma is the engine of the convergence proof. We will apply it to piecewise continuous functions $g$ defined only on $[0, \pi]$: extending $g$ by zero to $[-\pi, 0)$ and applying [[#cor-bessel]] gives $\int_0^{\pi} g(t)\cos nt\,dt \to 0$ and $\int_0^{\pi}g(t)\sin nt\,dt \to 0$. The intuition is that for large $n$ the rapid oscillations of $\sin nt$ make the positive and negative parts of $g(t)\sin nt$ cancel almost exactly.

## Pointwise convergence

To study $S_Nf(x)$ at a single point $x$, we first write it as an integral.

::: lemma The Dirichlet kernel {#lem-dirichlet}
Let $f$ be $2\pi$-periodic and piecewise continuous. Then

$$
S_Nf(x) = \frac{1}{\pi}\int_{-\pi}^{\pi} f(x + t)\,D_N(t)\,dt, \qquad D_N(t) = \frac12 + \sum_{n=1}^{N}\cos nt = \frac{\sin\bigl((N + \frac12)t\bigr)}{2\sin(t/2)},
$$ {#eq-dirichlet}

where the closed form holds for $t \notin 2\pi\Z$ (at $t = 0$, $D_N(0) = N + \frac12$). Moreover $\displaystyle\frac1\pi\int_0^{\pi} D_N(t)\,dt = \frac1\pi\int_{-\pi}^0 D_N(t)\,dt = \frac12$.
:::

::: proof
Insert the definitions of the coefficients into $S_Nf(x)$ and use $\cos ny\cos nx + \sin ny\sin nx = \cos n(y - x)$:

$$
S_Nf(x) = \frac1\pi\int_{-\pi}^{\pi}f(y)\left[\frac12 + \sum_{n=1}^N\cos n(y - x)\right]dy = \frac1\pi\int_{-\pi}^{\pi}f(y)\,D_N(y - x)\,dy.
$$

Substituting $y = x + t$ and using that $f(x+t)D_N(t)$ is $2\pi$-periodic in $t$ (so the integral over $[-x-\pi, -x+\pi]$ equals the integral over $[-\pi,\pi]$) gives the first formula. For the closed form, multiply by $2\sin(t/2)$ and use $2\sin(t/2)\cos nt = \sin\bigl((n + \frac12)t\bigr) - \sin\bigl((n - \frac12)t\bigr)$; the sum telescopes:

$$
2\sin\tfrac t2\,D_N(t) = \sin\tfrac t2 + \sum_{n=1}^N\Bigl[\sin\bigl((n+\tfrac12)t\bigr) - \sin\bigl((n-\tfrac12)t\bigr)\Bigr] = \sin\bigl((N+\tfrac12)t\bigr).
$$

Finally, $\int_0^{\pi}\cos nt\,dt = 0$ for $n \ge 1$, so $\int_0^{\pi}D_N = \frac{\pi}{2}$; since $D_N$ is even, the same holds on $[-\pi, 0]$.
:::

::: widget plot
f: if(abs(x) < 1e-9, N + 0.5, sin((N + 0.5)*x)/(2*sin(x/2)))
x: -pi, pi
y: -6, 21
sliders: N=5:1:20:1
piticks: true
labels: D_N(t)
caption: The Dirichlet kernel $D_N$ (the horizontal axis is $t$). As $N$ grows, the central peak gets taller ($D_N(0) = N + \tfrac12$) and narrower, while the area under each half stays $\pi/2$. Away from $t = 0$ the kernel does not shrink — it oscillates faster and faster. Those oscillations are why convergence needs the Riemann–Lebesgue lemma, and why some smoothness of $f$ is required.
:::

::: theorem Dirichlet's convergence theorem {#thm-dirichlet}
Let $f$ be $2\pi$-periodic and piecewise smooth. Then for every $x \in \R$,

$$
\lim_{N\to\infty} S_Nf(x) = \frac{f(x^+) + f(x^-)}{2}.
$$

In particular, the Fourier series converges to $f(x)$ at every point $x$ where $f$ is continuous.
:::

::: proof
Fix $x$. By [[#lem-dirichlet]], $\frac{1}{\pi}\int_0^{\pi}f(x^+)D_N(t)\,dt = \frac12 f(x^+)$ and $\frac1\pi\int_{-\pi}^0 f(x^-)D_N(t)\,dt = \frac12 f(x^-)$. Subtracting these from [[#eq-dirichlet]],

$$
S_Nf(x) - \frac{f(x^+) + f(x^-)}{2} = \frac1\pi\int_0^{\pi}\bigl[f(x+t) - f(x^+)\bigr]D_N(t)\,dt + \frac1\pi\int_{-\pi}^0\bigl[f(x + t) - f(x^-)\bigr]D_N(t)\,dt.
$$

We show that the first integral tends to $0$; the second is handled in the same way. Using the closed form of $D_N$, write it as $\frac1\pi\int_0^\pi g(t)\sin\bigl((N+\frac12)t\bigr)\,dt$ with

$$
g(t) = \frac{f(x+t) - f(x^+)}{2\sin(t/2)} = \frac{f(x+t) - f(x^+)}{t}\cdot\frac{t}{2\sin(t/2)}, \qquad 0 < t \le \pi.
$$

On $(0, \pi]$ the denominator $2\sin(t/2)$ is continuous and positive, so $g$ is piecewise continuous there. Near $t = 0$: for small $t > 0$, $f$ is continuously differentiable on $(x, x + t)$ and continuous on $(x, x+t]$ with limit $f(x^+)$ at $x$, so the mean value theorem gives $\frac{f(x+t) - f(x^+)}{t} = f'(\xi_t)$ for some $\xi_t \in (x, x+t)$; as $t \to 0^+$ this tends to the one-sided limit $f'(x^+)$, which exists because $f$ is piecewise smooth. Also $\frac{t}{2\sin(t/2)} \to 1$. So $g(0^+)$ exists and $g$ is piecewise continuous on $[0, \pi]$. Now expand

$$
\sin\bigl((N + \tfrac12)t\bigr) = \sin Nt\,\cos\tfrac t2 + \cos Nt\,\sin\tfrac t2,
$$

so that our integral equals $\frac1\pi\int_0^{\pi}g(t)\cos\frac t2\,\sin Nt\,dt + \frac1\pi\int_0^\pi g(t)\sin\frac t2\,\cos Nt\,dt$. Both $g(t)\cos\frac t2$ and $g(t)\sin\frac t2$ are piecewise continuous on $[0,\pi]$, so both integrals tend to $0$ as $N\to\infty$ by the Riemann–Lebesgue lemma ([[#cor-bessel]]).
:::

The proof shows where each hypothesis is used: smoothness near $x$ keeps $g$ bounded near $t = 0$, cancelling the singularity of the kernel, and Riemann–Lebesgue handles everything else. Mere continuity is not enough. In 1873 Paul du Bois-Reymond constructed a continuous periodic function whose Fourier series diverges at a point.

::: warning The series sees the periodic extension
When you expand a function given on $[-\pi,\pi]$, the value of the series at the endpoints is governed by the **periodic extension**, not by the formula. For $f(x) = x$ the series of [[#ex-sawtooth]] converges at $x = \pi$ to $\frac{\pi + (-\pi)}{2} = 0$, not to $\pi$ — and indeed every term $\sin n\pi$ is $0$. Before using a series at a point, always ask: is the periodic extension continuous there, and if not, what is the midpoint of the jump?
:::

::: quiz
Let $f(x) = x + 1$ on $(-\pi, \pi)$, extended $2\pi$-periodically. To what value does its Fourier series converge at $x = \pi$?
- [ ] $\pi + 1$
- [ ] $1 - \pi$
- [x] $1$
- [ ] The series diverges at $x = \pi$, because $f$ is discontinuous there.
::: solution
The periodic extension jumps at $x = \pi$ from $f(\pi^-) = \pi + 1$ to $f(\pi^+) = f(-\pi^+) = 1 - \pi$. Since $f$ is piecewise smooth, [[#thm-dirichlet]] says the series converges to the midpoint $\frac{(\pi + 1) + (1 - \pi)}{2} = 1$. Discontinuity does not cause divergence; it only decides *which* value the series picks.
:::
:::

### Uniform convergence

For continuous functions the convergence is much better than pointwise.

::: theorem Uniform convergence {#thm-uniform}
Let $f$ be $2\pi$-periodic, continuous and piecewise smooth. Then $\sum_{n=1}^\infty\bigl(\abs{a_n} + \abs{b_n}\bigr) < \infty$, and $S_Nf \to f$ uniformly on $\R$.
:::

::: proof
The derivative $f'$ is defined except at finitely many points per period and is piecewise continuous; let $a_n'$, $b_n'$ be its Fourier coefficients. Integrate by parts on each interval $[x_{j-1}, x_j]$ of a partition on which $f$ is smooth and add up. Because $f$ is continuous and periodic, the boundary terms telescope and cancel, leaving

$$
a_n' = \frac1\pi\int_{-\pi}^{\pi} f'(x)\cos nx\,dx = \frac{n}{\pi}\int_{-\pi}^{\pi}f(x)\sin nx\,dx = n b_n, \qquad b_n' = -n a_n \quad (n \ge 1).
$$

By the Cauchy–Schwarz inequality for sums, and then Bessel's inequality ([[#cor-bessel]]) applied to $f'$,

$$
\sum_{n=1}^{\infty}\bigl(\abs{a_n} + \abs{b_n}\bigr) = \sum_{n=1}^{\infty}\frac{\abs{b_n'} + \abs{a_n'}}{n} \le \left(\sum_{n=1}^{\infty}\frac{2}{n^2}\right)^{1/2}\left(\sum_{n=1}^{\infty}\bigl(a_n'^2 + b_n'^2\bigr)\right)^{1/2} < \infty,
$$

where we also used $(\abs{a} + \abs{b})^2 \le 2(a^2 + b^2)$. Since $\abs{a_n\cos nx + b_n\sin nx} \le \abs{a_n} + \abs{b_n}$, the Weierstrass M-test ([[real-analysis/uniform-convergence]]) shows that $S_Nf$ converges uniformly on $\R$ to some function. By [[#thm-dirichlet]] that function is $f$, because $f$ is continuous everywhere.
:::

### The Gibbs phenomenon

When $f$ has a jump, uniform convergence is impossible: a uniform limit of continuous functions is continuous. The widget for the square wave shows *how* uniformity fails. Take $N = 2M - 1$, so that $S_N f(x) = \frac{4}{\pi}\sum_{k=1}^{M}\frac{\sin(2k-1)x}{2k-1}$. Its derivative is $\frac4\pi\sum_{k=1}^M\cos(2k-1)x = \frac{2}{\pi}\cdot\frac{\sin 2Mx}{\sin x}$, whose first positive zero is $x_M = \frac{\pi}{2M}$, the location of the first peak. There, writing $t_k = \frac{(2k-1)\pi}{2M}$,

$$
S_Nf(x_M) = \frac{4}{\pi}\sum_{k=1}^{M}\frac{\sin t_k}{2k - 1} = \frac{2}{\pi}\sum_{k=1}^{M}\frac{\sin t_k}{t_k}\cdot\frac{\pi}{M} \;\longrightarrow\; \frac{2}{\pi}\int_0^{\pi}\frac{\sin t}{t}\,dt \approx 1.17898,
$$

because the middle expression is a midpoint Riemann sum for the integral. So however many terms we take, the partial sums overshoot the value $1$ by about $0.179$, which is roughly $9\%$ of the jump of size $2$. The peak moves towards the discontinuity as $N$ grows, which is why this does not contradict pointwise convergence: any *fixed* $x > 0$ is eventually to the right of the peak. The same $9\%$ overshoot (precisely $\frac1\pi\int_0^\pi\frac{\sin t}{t}\,dt - \frac12 \approx 0.0895$ times the jump) occurs at every jump of every piecewise smooth function. This is the **Gibbs phenomenon**.

::: quiz
For the square wave of [[#ex-square]], what happens to $\max_x S_Nf(x)$ as $N \to \infty$?
- [ ] It tends to $1$, because the series converges to $f$.
- [x] It tends to about $1.179$.
- [ ] It grows without bound.
- [ ] It tends to $0$, the midpoint of the jump.
::: solution
The calculation above shows that the first peak of $S_Nf$, at $x = \pi/(2M)$, has height tending to $\frac2\pi\int_0^\pi\frac{\sin t}{t}\,dt \approx 1.179$. Pointwise convergence to $f$ is not violated, because the peak moves towards the jump; but the convergence is not uniform, and the maximum never comes down to $1$.
:::
:::

## Parseval's identity

Bessel's inequality becomes an equality: the Fourier coefficients carry all of the "energy" $\int f^2$.

::: theorem Parseval's identity {#thm-parseval}
If $f$ is piecewise continuous on $[-\pi, \pi]$, then $\norm{f - S_Nf} \to 0$ as $N\to\infty$, and

$$
\frac{1}{\pi}\int_{-\pi}^{\pi}f(x)^2\,dx = \frac{a_0^2}{2} + \sum_{n=1}^{\infty}\bigl(a_n^2 + b_n^2\bigr).
$$ {#eq-parseval}
:::

::: proof
By [[#eq-pythag]], the identity is equivalent to $\norm{f - S_Nf}\to 0$. Note that $\norm{f - S_Nf}$ is non-increasing in $N$, by [[#thm-best]].

*Step 1: $f$ continuous, periodic and piecewise smooth.* By [[#thm-uniform]], $\delta_N = \max\abs{f - S_Nf} \to 0$, and $\norm{f - S_Nf}^2 \le 2\pi\delta_N^2 \to 0$.

*Step 2: general $f$ (sketch).* Given $\eps > 0$, there is a continuous, periodic, piecewise linear $g$ with $\norm{f - g} < \eps$. To construct it, let $\abs{f} \le K$, take a fine partition of $[-\pi,\pi]$, join the values of $f$ at the partition points by straight segments, and adjust $g$ near $\pm\pi$ so that $g(-\pi) = g(\pi)$. On subintervals free of discontinuities $\abs{f - g}$ is small by uniform continuity, and the remaining subintervals have small total length, on which $\abs{f - g} \le 2K$. By Step 1, $\norm{g - S_Ng} < \eps$ for all large $N$. Since $S_Ng$ is a trigonometric polynomial of degree $N$, [[#thm-best]] gives

$$
\norm{f - S_Nf} \le \norm{f - S_Ng} \le \norm{f - g} + \norm{g - S_Ng} < 2\eps
$$

for all large $N$. Hence $\norm{f - S_Nf} \to 0$.
:::

::: example Sums of reciprocal powers {#ex-parseval}
Apply Parseval's identity to the sawtooth and to the parabola to find $\sum_{n\ge1}\frac{1}{n^2}$ and $\sum_{n\ge1}\frac1{n^4}$.
::: solution
For $f(x) = x$ ([[#ex-sawtooth]]) we have $a_n = 0$ and $b_n^2 = \frac{4}{n^2}$, while $\frac1\pi\int_{-\pi}^{\pi}x^2\,dx = \frac{2\pi^2}{3}$. Parseval gives $\frac{2\pi^2}{3} = 4\sum\frac{1}{n^2}$, so $\sum\frac{1}{n^2} = \frac{\pi^2}{6}$ once more.

For $f(x) = x^2$ ([[#ex-xsq]]), $a_0 = \frac{2\pi^2}{3}$ and $a_n^2 = \frac{16}{n^4}$, while $\frac1\pi\int_{-\pi}^{\pi}x^4\,dx = \frac{2\pi^4}{5}$. So

$$
\frac{2\pi^4}{5} = \frac12\left(\frac{2\pi^2}{3}\right)^2 + 16\sum_{n=1}^{\infty}\frac{1}{n^4} = \frac{2\pi^4}{9} + 16\sum_{n=1}^\infty\frac{1}{n^4},
$$

hence $16\sum\frac1{n^4} = \frac{2\pi^4}{5} - \frac{2\pi^4}{9} = \frac{8\pi^4}{45}$ and $\displaystyle\sum_{n=1}^{\infty}\frac{1}{n^4} = \frac{\pi^4}{90}$.
:::
:::

::: application Energy, spectra and compression
In acoustics and electrical engineering $\int f^2$ measures the energy of a signal over one period, and $a_n^2 + b_n^2$ is the energy carried by the $n$th harmonic. Parseval's identity says that the total energy is the sum of the energies of the harmonics; the sequence $a_n^2 + b_n^2$ is the **power spectrum**, and it is what distinguishes a violin from a flute playing the same note. It also explains lossy compression. If we discard some coefficients of an orthogonal expansion, [[#eq-pythag]] together with Parseval's identity shows that the mean-square error is exactly the sum of the squares of the discarded coefficients (times $\pi$), so throwing away many small coefficients costs very little. JPEG image compression applies this idea with the discrete cosine transform on $8\times8$ blocks of pixels.
:::

## Integrating and differentiating Fourier series

Integration smooths functions, so it can only improve convergence. This is made precise by the following theorem, which is remarkable because it requires no convergence of the original series at all.

::: theorem Term-by-term integration {#thm-integrate}
Let $f$ be piecewise continuous on $[-\pi, \pi]$ with Fourier coefficients $a_n$, $b_n$. Then for $-\pi \le x \le \pi$,

$$
\int_0^x f(t)\,dt = \frac{a_0x}{2} + \sum_{n=1}^{\infty}\frac{a_n\sin nx - b_n(\cos nx - 1)}{n},
$$

and the series converges uniformly. That is, the Fourier series of $f$ may always be integrated term by term.
:::

::: proof
Let $F(x) = \int_0^x\bigl(f(t) - \frac{a_0}{2}\bigr)\,dt$. Then $F$ is continuous and piecewise smooth, and $F(\pi) - F(-\pi) = \int_{-\pi}^{\pi}f - \pi a_0 = 0$, so the periodic extension of $F$ is continuous. By [[#thm-uniform]] its Fourier series converges uniformly to $F$. For $n \ge 1$, integration by parts (with $F' = f - \frac{a_0}{2}$ and vanishing boundary terms, as in the proof of [[#thm-uniform]]) gives the coefficients $A_n = -\frac{b_n}{n}$ and $B_n = \frac{a_n}{n}$ of $F$. Evaluating the series at $x = 0$, where $F(0) = 0$, gives $\frac{A_0}{2} = \sum_{n\ge1}\frac{b_n}{n}$. Therefore

$$
F(x) = \sum_{n=1}^{\infty}\frac{b_n}{n} + \sum_{n=1}^{\infty}\left(-\frac{b_n}{n}\cos nx + \frac{a_n}{n}\sin nx\right),
$$

and adding $\frac{a_0x}{2}$ gives the result.
:::

For instance, integrating the sawtooth series $x \sim 2\sum\frac{(-1)^{n+1}}{n}\sin nx$ from $0$ to $x$ gives $\frac{x^2}{2} = 2\sum_{n\ge1}\frac{(-1)^{n+1}}{n^2}(1 - \cos nx)$, which rearranges to the series of [[#ex-xsq]] — although the sawtooth series itself converges only conditionally.

Differentiation is the opposite: it roughens functions and multiplies the $n$th coefficient by $n$. The proof of [[#thm-uniform]] shows that if $f$ is **continuous, periodic and piecewise smooth**, then the Fourier series of $f'$ is the term-by-term derivative of the series of $f$; if moreover $f'$ is piecewise smooth, [[#thm-dirichlet]] tells us where that series converges.

::: warning Do not differentiate across a jump
Differentiating the sawtooth series $x = 2\sum\frac{(-1)^{n+1}}{n}\sin nx$ (valid on $(-\pi,\pi)$) term by term gives $1 = 2\sum(-1)^{n+1}\cos nx$, which is nonsense: the terms do not even tend to $0$, so the series diverges at every $x$. The derivative of the periodic extension of $x$ contains the jumps at $\pm\pi$, which the formal differentiation cannot see. Term-by-term differentiation requires the periodic extension of $f$ to be **continuous**.
:::

::: remark Smoothness and decay
The examples display a general dictionary. Jumps give coefficients of size about $1/n$; a continuous function with jumps in its derivative gives about $1/n^2$; and if $f$ is periodic and $k$ times continuously differentiable, then $n^k a_n \to 0$ and $n^kb_n\to0$ (see the exercises). Conversely, rapidly decaying coefficients force smoothness. For PDEs this is decisive: in the heat equation the $n$th coefficient is multiplied by $e^{-kn^2t}$, which decays so fast that the solution becomes infinitely differentiable instantly ([[pde/heat-equation]]).
:::

::: history
Euler was already using trigonometric series in the 1740s, and in the 1750s they became the centre of the debate between d'Alembert, Euler and Daniel Bernoulli about the vibrating string; Clairaut and Euler also found the integral formulas for the coefficients in special cases. Joseph Fourier's memoir on heat, presented to the Institut de France in 1807, went much further: he claimed that an *arbitrary* function could be so expanded. The examiners, among them Lagrange and Laplace, were sceptical, and the work appeared in full only in his *Théorie analytique de la chaleur* (1822). The first rigorous convergence proof was published by Peter Gustav Lejeune Dirichlet in 1829 for functions with finitely many jumps and finitely many maxima and minima. Bernhard Riemann's 1854 Habilitation thesis on trigonometric series introduced the Riemann integral for this purpose, and Georg Cantor's study of the uniqueness of trigonometric series in the 1870s led him to set theory. The overshoot near jumps was analysed by Henry Wilbraham in 1848 and rediscovered by J. Willard Gibbs in letters to *Nature* in 1898–99. Paul du Bois-Reymond found a continuous function with a divergent Fourier series (1873), and the long-standing question whether the Fourier series of every square-integrable function converges at least almost everywhere was settled only in 1966, when Lennart Carleson proved that it does.
:::

## Where this leads

Fourier series are the workhorse of the rest of this course. Sine and cosine series solve the heat equation ([[pde/heat-equation]]) and the wave equation ([[pde/wave-equation]]) on an interval, and series in $\cos n\theta$ and $\sin n\theta$ solve Laplace's equation in a disc ([[pde/laplace-equation]]). Sturm–Liouville theory ([[pde/sturm-liouville]]) explains why other families of functions — Bessel functions, Legendre polynomials — have the same orthogonality and expansion properties, and the Fourier transform ([[pde/fourier-transform]]) replaces the sum over $n$ by an integral over all frequencies. On the analysis side, the natural home of Parseval's identity is the space $L^2$ of square-integrable functions ([[measure-theory/lp-spaces]]), which is complete; there the exponentials $e^{inx}$ form an orthonormal basis (after normalising) and Fourier series become a special case of Hilbert space theory.

::: summary
- The functions $1, \cos nx, \sin nx$ are orthogonal on $[-\pi,\pi]$ ([[#thm-orthogonality]]), which gives the coefficient formulas [[#eq-coeffs]]; even functions have cosine series and odd functions sine series.
- A Fourier series represents the **periodic extension** of $f$. For period $2L$ replace $nx$ by $n\pi x/L$; half-range sine and cosine series use the odd and even extensions of a function on $[0, L]$.
- $S_Nf$ is the best mean-square approximation of degree $N$ ([[#thm-best]]); Bessel's inequality follows, and with it $a_n, b_n \to 0$.
- For piecewise smooth $f$ the series converges at every point to $\frac12\bigl(f(x^+) + f(x^-)\bigr)$ ([[#thm-dirichlet]]); if $f$ is also continuous and periodic, the convergence is uniform ([[#thm-uniform]]).
- Near a jump the partial sums overshoot by about $9\%$ of the jump, however many terms are taken (the Gibbs phenomenon).
- Parseval's identity $\frac1\pi\int f^2 = \frac{a_0^2}{2} + \sum(a_n^2 + b_n^2)$ holds for all piecewise continuous $f$ and evaluates sums such as $\sum\frac{1}{n^2} = \frac{\pi^2}{6}$ and $\sum\frac{1}{n^4} = \frac{\pi^4}{90}$.
- Fourier series can always be integrated term by term, but differentiated term by term only when the periodic extension is continuous. Smoothness of $f$ corresponds to fast decay of its coefficients.
:::

## Exercises

::: exercise A trigonometric polynomial in disguise {level=1 check="-1/4"}
Without computing any integrals, find the Fourier series of $f(x) = \sin^3 x$. What is $b_3$?
::: hint
Write $\sin^3 x$ using $\sin 3x = 3\sin x - 4\sin^3 x$.
:::
::: solution
From $\sin 3x = 3\sin x - 4\sin^3x$ we get $\sin^3 x = \frac34\sin x - \frac14\sin 3x$. This is a trigonometric polynomial, and by the uniqueness of coefficients in an orthogonal family (the argument after [[#thm-orthogonality]]), it is its own Fourier series: $b_1 = \frac34$, $b_3 = -\frac14$, and all other coefficients vanish.
:::
:::

::: exercise Value at a jump {level=1 check="pi^2/2"}
Let $f(x) = 0$ for $-\pi < x < 0$ and $f(x) = x^2$ for $0 \le x < \pi$, extended $2\pi$-periodically. Without computing the coefficients, find the sum of the Fourier series of $f$ at $x = \pi$. What are the sums at $x = 0$ and $x = \pi/2$? (Enter the sum at $x = \pi$.)
::: solution
$f$ is piecewise smooth, so [[#thm-dirichlet]] applies. At $x = \pi$ the periodic extension jumps from $f(\pi^-) = \pi^2$ to $f(\pi^+) = f(-\pi^+) = 0$, so the series converges to $\frac{\pi^2 + 0}{2} = \frac{\pi^2}{2}$. At $x = 0$ both one-sided limits are $0$, so the sum is $0$. At $x = \pi/2$ the function is continuous and the sum is $f(\pi/2) = \frac{\pi^2}{4}$.
:::
:::

::: exercise A different period {level=1 check="2/pi"}
Find the Fourier series of $f(x) = x$ on $(-1, 1)$, extended with period $2$. What is the coefficient of $\sin \pi x$?
::: solution
Here $L = 1$ and $f$ is odd, so by [[#eq-period-2L]] the series is a sine series with

$$
b_n = \int_{-1}^{1}x\sin n\pi x\,dx = 2\int_0^1x\sin n\pi x\,dx = 2\left[-\frac{x\cos n\pi x}{n\pi}\right]_0^1 + \frac{2}{n\pi}\int_0^1\cos n\pi x\,dx = \frac{2(-1)^{n+1}}{n\pi}.
$$

So $x \sim \frac{2}{\pi}\sum_{n\ge1}\frac{(-1)^{n+1}}{n}\sin n\pi x$ on $(-1,1)$, and the coefficient of $\sin\pi x$ is $b_1 = \frac{2}{\pi}$. (This is [[#ex-sawtooth]] rescaled by $x \mapsto \pi x$ and divided by $\pi$.)
:::
:::

::: exercise The rectified sine wave {level=2 check="1/2"}
Find the Fourier series of $f(x) = \abs{\sin x}$ and use it to evaluate $\displaystyle\sum_{k=1}^{\infty}\frac{1}{4k^2 - 1}$.
::: hint
Use $2\sin x\cos nx = \sin(n+1)x - \sin(n-1)x$, and treat $n = 1$ separately.
:::
::: solution
$f$ is even, so $b_n = 0$ and $a_n = \frac2\pi\int_0^\pi\sin x\cos nx\,dx = \frac1\pi\int_0^\pi\bigl[\sin(n+1)x - \sin(n-1)x\bigr]dx$. For $n = 1$ this is $\frac1\pi\int_0^\pi\sin 2x\,dx = 0$. For $n \ne 1$, using $\int_0^\pi\sin mx\,dx = \frac{1 - (-1)^m}{m}$ (and $0$ for $m = 0$),

$$
a_n = \frac1\pi\left[\frac{1 + (-1)^n}{n + 1} - \frac{1 + (-1)^n}{n - 1}\right] = -\frac{2\bigl(1 + (-1)^n\bigr)}{\pi(n^2 - 1)},
$$

which is $-\frac{4}{\pi(n^2-1)}$ for even $n$ and $0$ for odd $n$; in particular $a_0 = \frac4\pi$. So

$$
\abs{\sin x} = \frac{2}{\pi} - \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{\cos 2kx}{4k^2 - 1},
$$

with equality everywhere because $\abs{\sin x}$ is continuous, periodic and piecewise smooth ([[#thm-uniform]]). Putting $x = 0$: $0 = \frac2\pi - \frac4\pi\sum\frac{1}{4k^2-1}$, so $\sum_{k\ge1}\frac{1}{4k^2-1} = \frac12$. (Check: $\frac{1}{4k^2-1} = \frac12\bigl(\frac{1}{2k-1} - \frac1{2k+1}\bigr)$ telescopes to $\frac12$.)
:::
:::

::: exercise A cosine as a sine series {level=2 check="8/(3*pi)"}
Find the half-range sine series of $f(x) = \cos x$ on $(0, \pi)$. What is $b_2$? To what does the series converge at $x = 0$, and why do its coefficients decay only like $1/n$? (Enter $b_2$.)
::: solution
By [[#def-half-range]] with $L = \pi$, $b_n = \frac2\pi\int_0^\pi\cos x\sin nx\,dx = \frac1\pi\int_0^\pi\bigl[\sin(n+1)x + \sin(n-1)x\bigr]dx$. For $n = 1$ this is $\frac1\pi\int_0^\pi\sin 2x\,dx = 0$. For $n \ge 2$,

$$
b_n = \frac1\pi\left[\frac{1 + (-1)^n}{n+1} + \frac{1 + (-1)^n}{n - 1}\right] = \frac{2n\bigl(1 + (-1)^n\bigr)}{\pi(n^2-1)},
$$

which is $\frac{4n}{\pi(n^2-1)}$ for even $n$ and $0$ for odd $n$. So $b_2 = \frac{8}{3\pi}$ and $\cos x \sim \frac{8}{\pi}\sum_{k\ge1}\frac{k\sin 2kx}{4k^2-1}$ on $(0,\pi)$. The odd extension jumps from $-1$ to $1$ at $x = 0$ (and from $-1$ to $1$ at $x = \pi$), so the series converges to $0$ at both endpoints — as every sine series must — and the jumps force the slow $1/n$ decay.
:::
:::

::: exercise Parseval for the triangle wave {level=2 check="pi^4/96"}
Apply Parseval's identity to the series of $\abs{x}$ in [[#ex-abs]] to evaluate $\displaystyle\sum_{k=0}^{\infty}\frac{1}{(2k+1)^4}$.
::: solution
Here $a_0 = \pi$, $a_n = -\frac{4}{\pi n^2}$ for odd $n$, and $\frac1\pi\int_{-\pi}^{\pi}x^2\,dx = \frac{2\pi^2}{3}$. Parseval gives

$$
\frac{2\pi^2}{3} = \frac{\pi^2}{2} + \frac{16}{\pi^2}\sum_{k=0}^\infty\frac{1}{(2k+1)^4}, \qquad\text{so}\qquad \sum_{k=0}^\infty\frac{1}{(2k+1)^4} = \frac{\pi^2}{16}\left(\frac{2\pi^2}{3} - \frac{\pi^2}{2}\right) = \frac{\pi^4}{96}.
$$

Consistency check: the sum over even $n$ is $\sum\frac{1}{(2m)^4} = \frac1{16}\cdot\frac{\pi^4}{90}$, and $\frac{\pi^4}{96} + \frac{\pi^4}{1440} = \frac{15\pi^4 + \pi^4}{1440} = \frac{\pi^4}{90}$.
:::
:::

::: exercise An alternating series {level=2 check="pi^2/12"}
Use the series of $x^2$ in [[#ex-xsq]] at a suitable point to evaluate $\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^2} = 1 - \frac14 + \frac19 - \cdots$.
::: solution
The series converges to $x^2$ everywhere on $[-\pi,\pi]$. At $x = 0$: $0 = \frac{\pi^2}{3} + 4\sum_{n\ge1}\frac{(-1)^n}{n^2}$, so $\sum_{n\ge1}\frac{(-1)^{n+1}}{n^2} = \frac{\pi^2}{12}$.
:::
:::

::: exercise Integrating twice {level=3 check="pi^3/32"}
Starting from $\sum_{n\ge1}\frac{\sin nx}{n} = \frac{\pi - x}{2}$ for $0 < x < 2\pi$, use [[#thm-integrate]] to show that

$$
\sum_{n=1}^{\infty}\frac{\cos nx}{n^2} = \frac{\pi^2}{6} - \frac{\pi x}{2} + \frac{x^2}{4}, \qquad \sum_{n=1}^\infty\frac{\sin nx}{n^3} = \frac{\pi^2x}{6} - \frac{\pi x^2}{4} + \frac{x^3}{12} \qquad (0 \le x \le \pi),
$$

and deduce the value of $1 - \frac{1}{3^3} + \frac1{5^3} - \frac1{7^3} + \cdots$.
::: hint
First derive the starting series from [[#ex-sawtooth]] by substituting $x \mapsto \pi - x$. Then integrate from $0$ to $x$, and evaluate at $x = \pi/2$ at the end.
:::
::: solution
Substituting $x \mapsto \pi - x$ in $x = 2\sum\frac{(-1)^{n+1}}{n}\sin nx$ and using $\sin(n\pi - nx) = (-1)^{n+1}\sin nx$ gives $\pi - x = 2\sum\frac{\sin nx}{n}$ for $0 < x < 2\pi$. So $h(x) = \sum\frac{\sin nx}{n}$ is the Fourier series of a piecewise continuous function equal to $\frac{\pi - x}{2}$ on $(0, \pi]$, with $a_n = 0$, $b_n = \frac1n$. By [[#thm-integrate]], for $0 \le x \le \pi$,

$$
\int_0^x\frac{\pi - t}{2}\,dt = \frac{\pi x}{2} - \frac{x^2}{4} = \sum_{n=1}^{\infty}\frac{1 - \cos nx}{n^2} = \frac{\pi^2}{6} - \sum_{n=1}^{\infty}\frac{\cos nx}{n^2},
$$

which is the first formula. That series converges uniformly (its terms are bounded by $1/n^2$), so it may be integrated term by term from $0$ to $x$:

$$
\sum_{n=1}^\infty\frac{\sin nx}{n^3} = \int_0^x\left(\frac{\pi^2}{6} - \frac{\pi t}{2} + \frac{t^2}{4}\right)dt = \frac{\pi^2x}{6} - \frac{\pi x^2}{4} + \frac{x^3}{12}.
$$

At $x = \pi/2$, $\sin\frac{n\pi}{2}$ is $0$ for even $n$ and $(-1)^k$ for $n = 2k+1$, while the right-hand side is $\frac{\pi^3}{12} - \frac{\pi^3}{16} + \frac{\pi^3}{96} = \frac{8 - 6 + 1}{96}\pi^3$. Hence

$$
1 - \frac{1}{3^3} + \frac{1}{5^3} - \cdots = \frac{\pi^3}{32}.
$$
:::
:::

::: exercise Smoothness forces decay {level=3}
Let $f$ be $2\pi$-periodic with $k \ge 1$ continuous derivatives. Prove that $\abs{a_n} \le \frac{2M_k}{n^k}$ and $\abs{b_n} \le \frac{2M_k}{n^k}$ for $n \ge 1$, where $M_k = \max\abs{f^{(k)}}$, and that in fact $n^ka_n \to 0$ and $n^kb_n \to 0$.
::: hint
Integrate by parts once to relate the coefficients of $f$ to those of $f'$, then iterate.
:::
::: solution
For a periodic $C^1$ function $g$ and $n\ge1$, integration by parts gives

$$
a_n(g) = \frac1\pi\int_{-\pi}^{\pi}g(x)\cos nx\,dx = \left[\frac{g(x)\sin nx}{n\pi}\right]_{-\pi}^{\pi} - \frac{1}{n\pi}\int_{-\pi}^{\pi}g'(x)\sin nx\,dx = -\frac{b_n(g')}{n},
$$

since $\sin(\pm n\pi) = 0$. Similarly $b_n(g) = \bigl[-\frac{g(x)\cos nx}{n\pi}\bigr]_{-\pi}^{\pi} + \frac{a_n(g')}{n} = \frac{a_n(g')}{n}$, where the boundary term vanishes because $g(\pi) = g(-\pi)$. Applying this to $f, f', \dots, f^{(k-1)}$ (all periodic and $C^1$) shows that $\abs{a_n(f)}$ and $\abs{b_n(f)}$ equal $\frac{1}{n^k}$ times the absolute value of a Fourier coefficient of $f^{(k)}$. Each such coefficient is at most $\frac1\pi\int_{-\pi}^{\pi}\abs{f^{(k)}} \le 2M_k$, which gives the bounds. Moreover the coefficients of the continuous function $f^{(k)}$ tend to $0$ by the Riemann–Lebesgue lemma ([[#cor-bessel]]), so $n^ka_n(f) \to 0$ and $n^kb_n(f) \to 0$.
:::
:::

::: exercise Coefficients determine the function {level=3}
Let $f$ and $g$ be piecewise continuous on $[-\pi,\pi]$ with the same Fourier coefficients. Prove that $f(x) = g(x)$ at every $x \in (-\pi,\pi)$ at which both $f$ and $g$ are continuous.
::: solution
Let $h = f - g$. It is piecewise continuous and all its Fourier coefficients are $0$, so Parseval's identity ([[#thm-parseval]]) gives $\int_{-\pi}^{\pi}h(x)^2\,dx = 0$. Suppose $h(x_0) \ne 0$ at a point $x_0 \in (-\pi,\pi)$ where $f$ and $g$, hence $h$, are continuous. By continuity there is $\delta > 0$ with $(x_0 - \delta, x_0 + \delta) \subset (-\pi, \pi)$ and $h(x)^2 > \frac12h(x_0)^2$ on that interval. Then

$$
\int_{-\pi}^{\pi}h^2 \ge \int_{x_0-\delta}^{x_0+\delta}h^2 \ge 2\delta\cdot\tfrac12h(x_0)^2 > 0,
$$

a contradiction. Hence $h(x_0) = 0$, that is, $f(x_0) = g(x_0)$. (Pointwise convergence is not needed: this works even for functions whose Fourier series diverge somewhere.)
:::
:::
