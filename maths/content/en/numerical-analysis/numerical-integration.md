The probability that a normally distributed measurement lies within one standard deviation of its mean is $\frac{2}{\sqrt{2\pi}}\int_0^1 e^{-t^2/2}\,dt$. The function $e^{-x^2}$ has no elementary antiderivative, so the fundamental theorem of calculus is of no direct use here; the same is true of the arc length of an ellipse, of most integrals in physics and statistics, and of every integral of a function known only through measured values. These integrals must be computed numerically.

A **quadrature rule** approximates an integral by a weighted sum of function values,

$$
\int_a^b f(x)\,dx \approx \sum_{i=0}^n w_i\,f(x_i),
$$

with **nodes** $x_i$ and **weights** $w_i$. Riemann sums ([[calculus-1/integrals]]) are the crudest examples. In this chapter we derive much better rules by integrating interpolating polynomials ([[numerical-analysis/interpolation]]), prove their error formulas, combine them into composite rules, accelerate them by Richardson extrapolation (Romberg integration), and finally choose the nodes optimally (Gaussian quadrature). Our test integral is

$$
I = \int_0^1 e^{-x^2}\,dx = 0.746\,824\,132\,812\,427\ldots
$$

## Interpolatory rules

::: definition Degree of exactness {#def-exactness}
A quadrature rule has **degree of exactness** $d$ if it integrates every polynomial of degree at most $d$ exactly, but not every polynomial of degree $d + 1$. A rule is **interpolatory** if it is obtained by integrating the polynomial interpolant $p_n$ of $f$ at the nodes, so that $w_i = \int_a^b\ell_i(x)\,dx$ with the Lagrange basis polynomials $\ell_i$.
:::

Since both the integral and the rule are linear in $f$, a rule has degree of exactness at least $d$ if and only if it is exact for $1, x, \dots, x^d$. An interpolatory rule with $n + 1$ nodes has degree of exactness at least $n$, because the interpolant of a polynomial of degree $\le n$ is the polynomial itself. Integrating the interpolants at equally spaced nodes gives the **Newton–Cotes rules**; the three most important use one, two and three nodes. With $m = \frac{a+b}{2}$:

| rule | formula | degree of exactness | error |
|---|---|---|---|
| midpoint | $(b - a)\,f(m)$ | $1$ | $\dfrac{(b-a)^3}{24}f''(\xi)$ |
| trapezoid | $\dfrac{b - a}{2}\bigl(f(a) + f(b)\bigr)$ | $1$ | $-\dfrac{(b-a)^3}{12}f''(\xi)$ |
| Simpson | $\dfrac{b - a}{6}\bigl(f(a) + 4f(m) + f(b)\bigr)$ | $3$ | $-\dfrac{(b-a)^5}{2880}f^{(4)}(\xi)$ |

Here "error" means $\int_a^b f - (\text{rule})$, and $\xi$ is some point in $(a, b)$. The midpoint rule is exact for linear functions although it uses a single node, and Simpson's rule is exact for *cubics* although it interpolates by a parabola: in both cases symmetry gives a degree for free, because $\int_a^b(x - m)^k\,dx = 0$ for odd $k$.

::: theorem Errors of the basic rules {#thm-basic-errors}
Let $f$ be twice continuously differentiable on $[a, b]$. Then for some $\xi, \xi' \in [a, b]$,

$$
\int_a^bf - (b - a)f(m) = \frac{(b-a)^3}{24}f''(\xi), \qquad \int_a^bf - \frac{b-a}{2}\bigl(f(a) + f(b)\bigr) = -\frac{(b-a)^3}{12}f''(\xi') .
$$

If $f$ is four times continuously differentiable, Simpson's rule satisfies $\int_a^bf - \frac{b-a}{6}\bigl(f(a) + 4f(m) + f(b)\bigr) = -\frac{(b-a)^5}{2880}f^{(4)}(\eta)$ for some $\eta \in [a, b]$.
:::

::: proof
Let $\mu_k$ and $M_k$ be the minimum and maximum of $f^{(k)}$ on $[a, b]$. All three proofs follow one pattern: express the error as $\int(\text{something between } \mu_k \text{ and } M_k)\times(\text{a weight of one sign})$, bound it, and finish with the intermediate value theorem for $f^{(k)}$.

*Midpoint.* By Taylor's theorem, $f(x) = f(m) + f'(m)(x - m) + \frac12f''(\eta_x)(x - m)^2$. Integrating, the linear term vanishes by symmetry, so the error is $E = \int_a^b\frac12f''(\eta_x)(x - m)^2\,dx$. Since $(x - m)^2 \ge 0$ and $\int_a^b(x - m)^2\,dx = \frac{(b-a)^3}{12}$, we get $\mu_2\frac{(b-a)^3}{24} \le E \le M_2\frac{(b-a)^3}{24}$, and $E = \frac{(b-a)^3}{24}c$ with $c \in [\mu_2, M_2]$. By the intermediate value theorem $c = f''(\xi)$ for some $\xi$.

*Trapezoid.* The rule integrates the linear interpolant $p_1$ at $a$ and $b$, and by the interpolation error formula ([[numerical-analysis/interpolation#thm-interp-error]]) $f(x) - p_1(x) = \frac12f''(\xi_x)(x - a)(x - b)$. Here the weight $(x - a)(x - b) \le 0$, with $\int_a^b(x-a)(x-b)\,dx = -\frac{(b-a)^3}{6}$, so as before the error is $-\frac{(b-a)^3}{12}c$ with $c \in [\mu_2, M_2]$, and $c = f''(\xi')$.

*Simpson.* Let $h = \frac{b-a}{2}$ and, for $0 \le t \le h$,

$$
F(t) = \int_{m-t}^{m+t}f(x)\,dx - \frac t3\bigl(f(m - t) + 4f(m) + f(m + t)\bigr),
$$

so that $F(h)$ is the error of Simpson's rule. Differentiating three times (a routine computation),

$$
F'''(t) = -\frac t3\bigl(f'''(m + t) - f'''(m - t)\bigr) = -\frac{2t^2}{3}g(t), \qquad g(t) = \frac{f'''(m+t) - f'''(m-t)}{2t},
$$

and $F(0) = F'(0) = F''(0) = 0$. By the mean value theorem $g(t) = f^{(4)}(\eta_t)$ lies in $[\mu_4, M_4]$. Taylor's theorem with integral remainder ([[calculus-2/taylor-series#thm-integral-remainder]]) gives

$$
F(h) = \int_0^h\frac{(h - t)^2}{2}F'''(t)\,dt = -\frac13\int_0^h t^2(h - t)^2g(t)\,dt .
$$

The weight $t^2(h - t)^2$ is non-negative with integral $\frac{h^5}{30}$, so $F(h) = -\frac{h^5}{90}c$ with $c \in [\mu_4, M_4]$, hence $c = f^{(4)}(\eta)$. Finally $\frac{h^5}{90} = \frac{(b-a)^5}{32\cdot90} = \frac{(b-a)^5}{2880}$.
:::

::: example The basic rules on the test integral {#ex-basic}
Apply the midpoint, trapezoid and Simpson rules to $\int_0^1e^{-x^2}\,dx$ on the single interval $[0, 1]$.
::: solution
With $f(0) = 1$, $f(\frac12) = e^{-1/4} = 0.778\,801$ and $f(1) = e^{-1} = 0.367\,879$:

- midpoint: $0.778\,801$, error $I - M = -0.031\,98$;
- trapezoid: $\frac12(1 + 0.367\,879) = 0.683\,940$, error $+0.062\,88$;
- Simpson: $\frac16(1 + 4\times0.778\,801 + 0.367\,879) = 0.747\,180$, error $-0.000\,356$.

The midpoint error is about half the trapezoid error and of opposite sign, as the formulas predict ($\frac{1}{24}$ versus $-\frac{1}{12}$, if $f''$ were constant). This is no coincidence: Simpson's rule is exactly the combination $\frac{2M + T}{3}$ that cancels the two leading errors, and it is far more accurate.
:::
:::

::: warning High-order Newton–Cotes rules are a trap
It is tempting to integrate the interpolant at many equally spaced nodes in one go. But Runge's phenomenon ([[numerical-analysis/interpolation]]) carries over: for $9$ or more equally spaced nodes some weights become negative, the weights grow in size, and the rules can fail to converge even for analytic integrands while amplifying rounding errors. Accuracy is gained instead by subdividing the interval (composite rules) or by choosing better nodes (Gaussian quadrature).
:::

Why should negative weights matter? Because function values are never exact: they carry rounding or measurement errors. The next proposition shows that positive weights make a rule immune to amplification of such errors.

::: proposition Stability of rules with positive weights {#prop-quad-stability}
Suppose a rule $Q(f) = \sum_iw_if(x_i)$ integrates constants exactly over $[a, b]$, and the values $f(x_i)$ are replaced by perturbed values $\hat f_i$ with $\abs{\hat f_i - f(x_i)} \le \eps$. Then $\abs{\sum_iw_i\hat f_i - Q(f)} \le \eps\sum_i\abs{w_i}$, and if all weights are positive, $\sum_i\abs{w_i} = b - a$.
:::

::: proof
$\abs{\sum_iw_i(\hat f_i - f(x_i))} \le \sum_i\abs{w_i}\,\eps$ by the triangle inequality. Exactness for $f = 1$ gives $\sum_iw_i = \int_a^b1 = b - a$, and if every $w_i > 0$ then $\sum\abs{w_i} = \sum w_i = b - a$.
:::

So for rules with positive weights — the composite midpoint, trapezoid and Simpson rules, and Gaussian quadrature — errors in the data are never amplified beyond $(b - a)\eps$, however many nodes are used. For Newton–Cotes rules with many equally spaced nodes, $\sum\abs{w_i}$ grows exponentially with the number of nodes.

## Composite rules

Divide $[a, b]$ into $n$ subintervals of width $h = \frac{b-a}{n}$, with points $x_i = a + ih$, and apply a basic rule on each. This gives the **composite midpoint**, **trapezoid** and **Simpson** rules (for Simpson, $n$ must be even and the subintervals are grouped in pairs):

$$
\begin{aligned}
M_h &= h\sum_{i=1}^{n}f\!\left(x_{i-1} + \tfrac h2\right), \\
T_h &= h\left(\tfrac12f(x_0) + f(x_1) + f(x_2) + \cdots + f(x_{n-1}) + \tfrac12f(x_n)\right), \\
S_h &= \frac h3\left(f(x_0) + 4f(x_1) + 2f(x_2) + 4f(x_3) + \cdots + 2f(x_{n-2}) + 4f(x_{n-1}) + f(x_n)\right).
\end{aligned}
$$

```python
import numpy as np

def trapezoid(f, a, b, n):
    x = np.linspace(a, b, n + 1)
    y = f(x)
    return (b - a) / n * (y.sum() - 0.5 * (y[0] + y[-1]))

def simpson(f, a, b, n):          # n must be even
    x = np.linspace(a, b, n + 1)
    w = np.ones(n + 1); w[1:-1:2] = 4; w[2:-1:2] = 2
    return (b - a) / (3 * n) * (w * f(x)).sum()
```

::: theorem Errors of the composite rules {#thm-composite}
If $f \in C^2[a, b]$, then for some $\xi, \xi' \in [a, b]$

$$
I - M_h = \frac{(b-a)h^2}{24}f''(\xi), \qquad I - T_h = -\frac{(b-a)h^2}{12}f''(\xi') ,
$$

and if $f \in C^4[a, b]$ and $n$ is even, $I - S_h = -\frac{(b-a)h^4}{180}f^{(4)}(\eta)$ for some $\eta \in [a, b]$.
:::

::: proof
For the trapezoid rule, [[#thm-basic-errors]] on each subinterval gives errors $-\frac{h^3}{12}f''(\xi_i)$, $i = 1, \dots, n$. Their sum is $-\frac{h^3}{12}\sum_if''(\xi_i) = -\frac{h^3n}{12}\bar c$, where the average $\bar c = \frac1n\sum f''(\xi_i)$ lies between the minimum and maximum of $f''$, so $\bar c = f''(\xi')$ by the intermediate value theorem. Since $nh = b - a$, the error is $-\frac{(b-a)h^2}{12}f''(\xi')$. The midpoint rule is identical with $\frac1{24}$. For Simpson's rule there are $\frac n2$ panels of width $2h$, each with error $-\frac{(2h)^5}{2880}f^{(4)}(\eta_i) = -\frac{h^5}{90}f^{(4)}(\eta_i)$, and the same averaging gives $-\frac{n}{2}\cdot\frac{h^5}{90}f^{(4)}(\eta) = -\frac{(b-a)h^4}{180}f^{(4)}(\eta)$.
:::

So the composite midpoint and trapezoid rules converge like $h^2$ and Simpson's rule like $h^4$: halving $h$ divides the errors by about $4$ and $16$. On the test integral:

| $n$ | $M_h$ error | $T_h$ error | $S_h$ error | ratios (M, T, S) |
|---|---|---|---|---|
| $2$ | $-7.77\times10^{-3}$ | $1.55\times10^{-2}$ | $-3.56\times10^{-4}$ | |
| $4$ | $-1.92\times10^{-3}$ | $3.84\times10^{-3}$ | $-3.13\times10^{-5}$ | $4.04,\ 4.02,\ 11.4$ |
| $8$ | $-4.79\times10^{-4}$ | $9.59\times10^{-4}$ | $-1.99\times10^{-6}$ | $4.01,\ 4.01,\ 15.7$ |
| $16$ | $-1.20\times10^{-4}$ | $2.40\times10^{-4}$ | $-1.25\times10^{-7}$ | $4.00,\ 4.00,\ 16.0$ |
| $32$ | $-2.99\times10^{-5}$ | $5.99\times10^{-5}$ | $-7.80\times10^{-9}$ | $4.00,\ 4.00,\ 16.0$ |
| $64$ | $-7.49\times10^{-6}$ | $1.50\times10^{-5}$ | $-4.87\times10^{-10}$ | $4.00,\ 4.00,\ 16.0$ |

(Errors are $I - Q$: the midpoint and Simpson rules overestimate this integral and the trapezoid rule underestimates it, in agreement with the signs in [[#thm-composite]], since $\int_0^1 f'' = f'(1) - f'(0) < 0$ and $\int_0^1 f^{(4)} = f'''(1) - f'''(0) > 0$.) The observed ratios confirm the orders $2$, $2$ and $4$. Checking observed ratios against the theory like this is the standard way to test a quadrature code.

::: widget riemann
f: exp(-x^2)
a: 0
b: 1
n: 4
method: trap
caption: The composite trapezoid rule for $\int_0^1 e^{-x^2}\,dx$. Each trapezoid lies slightly below the curve where it is concave ($x < 1/\sqrt2$) and above it where it is convex, so errors partly cancel. Double $n$ and the error drops by a factor of $4$. Switch the method to Simpson: its parabolas are almost indistinguishable from the curve already for $n = 4$.
:::

::: example How many intervals? {#ex-how-many}
How many subintervals do the composite trapezoid and Simpson rules need to guarantee an error below $10^{-6}$ for $\int_0^1e^{-x^2}\,dx$?
::: solution
With $f(x) = e^{-x^2}$, $f''(x) = (4x^2 - 2)e^{-x^2}$ and $f^{(4)}(x) = (16x^4 - 48x^2 + 12)e^{-x^2}$; on $[0, 1]$ their absolute values are at most $2$ and $12$ (both maxima at $x = 0$). For the trapezoid rule [[#thm-composite]] requires $\frac{h^2}{12}\cdot2 \le 10^{-6}$, i.e. $h \le \sqrt{6\times10^{-6}} \approx 0.002\,45$, so $n \ge 409$. For Simpson's rule we need $\frac{h^4}{180}\cdot12 \le 10^{-6}$, i.e. $h \le (1.5\times10^{-5})^{1/4} \approx 0.0622$, so $n \ge 16.07$; since $n$ must be even, $n = 18$. The table shows these bounds are realistic: the actual trapezoid error is $1.5\times10^{-5}$ already at $n = 64$, consistent with needing several hundred intervals.
:::
:::

::: widget quadrature
f: exp(-x^2)
a: 0
b: 1
methods: mid; trap; simpson; gauss
caption: Errors of the composite midpoint, trapezoid, Simpson and $2$-point Gauss–Legendre rules against the number $n$ of subintervals, on log–log axes. The fitted slopes confirm the orders $2$, $2$, $4$ and $4$; the $2$-point Gauss rule has the same order as Simpson's rule but an error about $24$ times smaller, until both reach rounding level near $10^{-15}$ (hollow points). Raising the *number of Gauss points* instead, as in [[#ex-gauss]], converges faster than any power.
:::

## Richardson extrapolation and Romberg integration

The trapezoid error is not just bounded by a multiple of $h^2$; for smooth $f$ it has a precise expansion in even powers of $h$, the **Euler–Maclaurin formula**:

$$
T_h = I + c_1h^2 + c_2h^4 + c_3h^6 + \cdots, \qquad c_1 = \frac{f'(b) - f'(a)}{12},\quad c_2 = -\frac{f'''(b) - f'''(a)}{720}, \ \dots
$$ {#eq-euler-maclaurin}

(the constants involve Bernoulli numbers and odd derivatives at the endpoints; for a proof see Süli and Mayers, Chapter 7). The constants do not depend on $h$, and this can be exploited. For the test integral $c_1 = \frac{-2e^{-1} - 0}{12} = -0.0613$, and indeed with $n = 64$ the prediction $T_h - I \approx c_1h^2 = -1.497\times10^{-5}$ matches the table to four digits.

**Richardson extrapolation.** Since $T_h = I + c_1h^2 + O(h^4)$ and $T_{h/2} = I + \frac14c_1h^2 + O(h^4)$, the combination

$$
\frac{4T_{h/2} - T_h}{3} = I + O(h^4)
$$

eliminates the $h^2$ term. A short calculation ([[#exr-simpson-richardson]]) shows that this combination is exactly Simpson's rule $S_{h/2}$. Repeating the idea eliminates $h^4$, $h^6$, … in turn.

::: algorithm Romberg integration {#alg-romberg}
Let $R_{k,0} = T_{h_k}$ with $h_k = (b - a)/2^k$, for $k = 0, 1, \dots, K$ (each new trapezoid sum reuses all previous function values). For $j = 1, \dots, k$ set

$$
R_{k,j} = R_{k,j-1} + \frac{R_{k,j-1} - R_{k-1,j-1}}{4^j - 1}.
$$

For smooth $f$, $R_{k,j} = I + O(h_k^{2j+2})$. Return $R_{K,K}$.
:::

```python
def romberg(f, a, b, K):
    R = [[trapezoid(f, a, b, 1)]]
    for k in range(1, K + 1):
        row = [trapezoid(f, a, b, 2**k)]          # (could reuse old values)
        for j in range(1, k + 1):
            row.append(row[j-1] + (row[j-1] - R[k-1][j-1]) / (4**j - 1))
        R.append(row)
    return R[K][K]
```

::: example A Romberg table {#ex-romberg}
Compute the Romberg table for $\int_0^1e^{-x^2}\,dx$ with $K = 5$.
::: solution
The first column contains trapezoid sums with $1, 2, 4, \dots, 32$ subintervals; each later column extrapolates the one before:

| $k$ | $R_{k,0}$ | $R_{k,1}$ | $R_{k,2}$ | $R_{k,3}$ | $R_{k,4}$ | $R_{k,5}$ |
|---|---|---|---|---|---|---|
| $0$ | $0.683\,939\,721$ | | | | | |
| $1$ | $0.731\,370\,252$ | $0.747\,180\,429$ | | | | |
| $2$ | $0.742\,984\,098$ | $0.746\,855\,380$ | $0.746\,833\,710$ | | | |
| $3$ | $0.745\,865\,615$ | $0.746\,826\,121$ | $0.746\,824\,170$ | $0.746\,824\,018$ | | |
| $4$ | $0.746\,584\,597$ | $0.746\,824\,257$ | $0.746\,824\,133$ | $0.746\,824\,133$ | $0.746\,824\,133$ | |
| $5$ | $0.746\,764\,255$ | $0.746\,824\,141$ | $0.746\,824\,133$ | $0.746\,824\,133$ | $0.746\,824\,133$ | $0.746\,824\,133$ |

The diagonal entries have errors $R_{k,k} - I$ equal to $-6.3\times10^{-2}$, $3.6\times10^{-4}$, $9.6\times10^{-6}$, $-1.1\times10^{-7}$, $2.8\times10^{-10}$ and $-1.8\times10^{-13}$. With only $33$ function evaluations Romberg integration reaches $13$ correct digits, while the plain trapezoid rule with the same $33$ points ($R_{5,0}$) has only four. The second column is Simpson's rule.
:::
:::

::: remark When the expansion fails
Richardson extrapolation assumes the error expansion [[#eq-euler-maclaurin]]. If $f$ is not smooth on $[a, b]$ — for example $\int_0^1\sqrt x\,dx$, where $f'$ is infinite at $0$ — the error behaves like $h^{1.5}$ instead of $h^2$ (Simpson's errors for $\sqrt x$ shrink only by $2^{1.5} \approx 2.8$ per halving: $3.6\times10^{-3}$, $1.3\times10^{-3}$, $4.5\times10^{-4}$), and extrapolation assuming $h^2, h^4, \dots$ does not help. In the opposite direction, if $f$ is smooth and **periodic** with period $b - a$, all the endpoint terms in [[#eq-euler-maclaurin]] vanish and the plain trapezoid rule converges faster than any power of $h$: for $\int_0^{2\pi}e^{\cos x}\,dx = 7.954\,926\,521\ldots$ it has error $3.4\times10^{-2}$ with $4$ points, $1.3\times10^{-6}$ with $8$ and $2\times10^{-15}$ with $16$. This is why the trapezoid rule is the method of choice for periodic integrands and Fourier coefficients ([[#exr-periodic]]).
:::

::: widget quadrature
f: exp(cos(x))
a: 0
b: 2pi
methods: trap; simpson; gauss
caption: The periodic integrand $e^{\cos x}$ over a full period. Here the humble trapezoid rule is the champion: its error falls faster than any power of $n$ and reaches rounding level by $n = 16$ subintervals, that is $16$ function values. The composite $2$-point Gauss rule needs about twice as many function values for the same accuracy, and Simpson's rule, which weights the points unequally, lags well behind the trapezoid rule it was designed to improve.
:::

::: example Removing a singularity {#ex-singular}
Compute $\displaystyle\int_0^1\frac{\cos x}{\sqrt x}\,dx$ accurately.
::: solution
The integrand is infinite at $x = 0$, so the trapezoid and Simpson rules cannot even be applied (they need $f(0)$), and the midpoint rule converges only like $h^{1/2}$ because of the singularity. Substituting $x = t^2$, $dx = 2t\,dt$, removes it:

$$
\int_0^1\frac{\cos x}{\sqrt x}\,dx = \int_0^1\frac{\cos(t^2)}{t}\,2t\,dt = 2\int_0^1\cos(t^2)\,dt ,
$$

whose integrand is smooth. Composite Simpson on the new integral gives errors $2.9\times10^{-8}$, $2.4\times10^{-9}$ and $1.6\times10^{-10}$ with $16$, $32$ and $64$ subintervals, approaching the expected factor of $16$ per halving; the value is $1.809\,048\,475\,8\ldots$ Analysing the integrand before integrating — and transforming away singularities — is usually worth more than any choice of rule.
:::
:::

## Gaussian quadrature

All rules so far fixed the nodes in advance. A rule with $n$ nodes has $2n$ free parameters — $n$ nodes and $n$ weights — so we might hope to make it exact for polynomials of degree up to $2n - 1$, which form a space of dimension $2n$. Gauss showed that this is possible, and that it is the best possible.

::: proposition The limit on exactness {#prop-gauss-limit}
No rule $\sum_{i=1}^nw_if(x_i)$ with $n$ nodes integrates every polynomial of degree $2n$ exactly over $[a, b]$.
:::

::: proof
Let $q(x) = \prod_{i=1}^n(x - x_i)^2$, of degree $2n$. Then $\int_a^bq > 0$ because $q \ge 0$ and $q$ is not identically zero, but the rule gives $\sum w_iq(x_i) = 0$.
:::

The optimal nodes are the zeros of the **Legendre polynomials** $P_0 = 1$, $P_1 = x$, $P_2 = \frac12(3x^2 - 1)$, $P_3 = \frac12(5x^3 - 3x)$, …, which are **orthogonal** on $[-1, 1]$:

$$
\int_{-1}^1P_m(x)P_n(x)\,dx = 0 \qquad (m \ne n).
$$

They can be obtained by applying the Gram–Schmidt process to $1, x, x^2, \dots$ with the inner product $\inner fg = \int_{-1}^1fg$ ([[linear-algebra/inner-products]]). In particular $P_n$ has degree $n$ and is orthogonal to every polynomial of degree less than $n$.

::: theorem Gauss–Legendre quadrature {#thm-gauss}
For $n \ge 1$, the Legendre polynomial $P_n$ has $n$ distinct zeros $x_1, \dots, x_n$, all in $(-1, 1)$. With weights $w_i = \int_{-1}^1\ell_i(x)\,dx$, the rule

$$
G_n(f) = \sum_{i=1}^nw_if(x_i)
$$

integrates every polynomial of degree at most $2n - 1$ exactly over $[-1, 1]$, and all weights are positive.
:::

::: proof
*Zeros.* Let $t_1 < \cdots < t_k$ be the points of $(-1, 1)$ where $P_n$ changes sign. If $k < n$, the polynomial $P_n(x)\prod_j(x - t_j)$ does not change sign on $(-1, 1)$ and is not identically zero, so its integral is non-zero; but $\prod_j(x - t_j)$ has degree $k < n$, so the integral is $0$ by orthogonality. Hence $k \ge n$, and since $P_n$ has degree $n$, it has exactly $n$ simple zeros, all in $(-1, 1)$.

*Exactness.* Let $f$ be a polynomial of degree at most $2n - 1$. Divide by $P_n$: $f = qP_n + r$ with $q$ and $r$ of degree at most $n - 1$. Then $\int_{-1}^1qP_n = 0$ by orthogonality, so $\int f = \int r$. On the other hand $f(x_i) = r(x_i)$ since $P_n(x_i) = 0$, so $G_n(f) = G_n(r)$. Finally $G_n$ is interpolatory with $n$ nodes, hence exact for $r$, which has degree at most $n - 1$: $G_n(f) = G_n(r) = \int r = \int f$.

*Positive weights.* $\ell_i^2$ has degree $2n - 2 \le 2n - 1$, so it is integrated exactly: $0 < \int_{-1}^1\ell_i^2 = \sum_jw_j\ell_i(x_j)^2 = w_i$.
:::

For a general interval, substitute $x = \frac{a+b}{2} + \frac{b-a}{2}t$: $\int_a^bf(x)\,dx \approx \frac{b-a}{2}\sum_iw_if\left(\frac{a+b}{2} + \frac{b-a}{2}x_i\right)$. The first few rules on $[-1, 1]$:

| $n$ | nodes $x_i$ | weights $w_i$ | exact for degree |
|---|---|---|---|
| $1$ | $0$ | $2$ | $1$ (the midpoint rule) |
| $2$ | $\pm\frac{1}{\sqrt3}$ | $1,\ 1$ | $3$ |
| $3$ | $0,\ \pm\sqrt{3/5}$ | $\frac89,\ \frac59,\ \frac59$ | $5$ |

In practice the nodes and weights are computed as eigenvalues and eigenvector components of a symmetric tridiagonal matrix (the Golub–Welsch algorithm); `numpy.polynomial.legendre.leggauss(n)` returns them. For $f \in C^{2n}[a, b]$ the error is

$$
\int_a^bf - G_n(f) = \frac{(b-a)^{2n+1}(n!)^4}{(2n+1)\bigl((2n)!\bigr)^3}f^{(2n)}(\xi),
$$

which shrinks extraordinarily fast as $n$ grows when the derivatives of $f$ are moderate.

::: example Gauss quadrature on the test integral {#ex-gauss}
Apply the $n$-point Gauss–Legendre rule to $\int_0^1e^{-x^2}\,dx$ for $n = 1, \dots, 6$.
::: solution
After mapping $[-1, 1]$ to $[0, 1]$, the computed values and errors $G_n - I$ are:

| $n$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| $G_n$ | $0.778\,801$ | $0.746\,594\,7$ | $0.746\,814\,58$ | $0.746\,824\,468$ | $0.746\,824\,126\,8$ | $0.746\,824\,132\,89$ |
| error | $3.2\times10^{-2}$ | $-2.3\times10^{-4}$ | $-9.6\times10^{-6}$ | $3.4\times10^{-7}$ | $-6.0\times10^{-9}$ | $7.8\times10^{-11}$ |

Six function evaluations give ten correct digits — as accurate as the trapezoid rule with about $28\,000$ intervals, and better than Simpson's rule with $64$ intervals ($65$ evaluations, error $4.9\times10^{-10}$). Each extra node gains one and a half to two digits here.
:::
:::

::: quiz
What is the degree of exactness of the $3$-point Gauss–Legendre rule, and of Simpson's rule, which also uses $3$ points?
- [ ] $2$ and $2$
- [ ] $3$ and $3$
- [x] $5$ and $3$
- [ ] $6$ and $4$
::: solution
An $n$-point Gauss rule is exact up to degree $2n - 1 = 5$ ([[#thm-gauss]]), and no $3$-point rule can do better ([[#prop-gauss-limit]]). Simpson's rule, with prescribed equally spaced nodes, reaches degree $3$ — one more than its interpolating parabola, thanks to symmetry.
:::
:::

::: quiz
The composite trapezoid rule has error $1.5\times10^{-5}$ for some integral with $n = 64$. Assuming the integrand is smooth, roughly what error do you expect with $n = 128$, and what error should the Richardson combination $\frac{4T_{128} - T_{64}}{3}$ have?
- [ ] $7.5\times10^{-6}$, and about $10^{-6}$
- [x] $3.75\times10^{-6}$, and much smaller (of order $h^4$)
- [ ] $3.75\times10^{-6}$, and exactly $0$
- [ ] $1.5\times10^{-5}$, since the error does not depend on $n$
::: solution
The trapezoid error is $c_1h^2 + O(h^4)$, so halving $h$ divides it by about $4$. The Richardson combination removes the $c_1h^2$ term, leaving an $O(h^4)$ error (it is Simpson's rule with $128$ intervals), typically several orders of magnitude smaller — but not exactly zero, because of the $c_2h^4$ term.
:::
:::

::: application Adaptive quadrature in software
Library routines such as `scipy.integrate.quad` (built on the QUADPACK package of 1983) combine these ideas adaptively. On each subinterval they apply a pair of rules of different accuracy — for example a $10$-point Gauss rule and a $21$-point Gauss–Kronrod rule that reuses its nodes — and take the difference as an error estimate. Subintervals whose estimated error is too large are bisected and treated again, so the effort concentrates where the integrand is difficult (near singularities, peaks or rapid oscillations) while smooth regions are handled with a few evaluations.
:::

::: history
The trapezoid and midpoint rules are ancient. Newton (in *Methodus differentialis*, 1711) and Roger Cotes (in *Harmonia mensurarum*, published in 1722, after his death) derived the rules obtained by integrating interpolants at equally spaced points. The rule now named after Thomas Simpson, who published it in 1743, had been used by Bonaventura Cavalieri and by James Gregory in the seventeenth century. Carl Friedrich Gauss found the optimal rules in 1814, and Carl Jacobi connected them with orthogonal polynomials in 1826. Euler (about 1735) and Maclaurin (1742) found the summation formula behind [[#eq-euler-maclaurin]]. Lewis Fry Richardson promoted extrapolation as the "deferred approach to the limit" in 1927, and Werner Romberg proposed the systematic table in 1955.
:::

## Where this leads

Integrals over several dimensions can be computed with products of one-dimensional rules, but the cost grows exponentially with the dimension; in high dimensions Monte Carlo methods, whose error decreases like $N^{-1/2}$ whatever the dimension, take over ([[probability/limit-theorems]]). Quadrature rules are the engine of Runge–Kutta methods for differential equations, which are quadrature rules applied to $y(t + h) = y(t) + \int_t^{t+h}f(s, y(s))\,ds$ ([[numerical-analysis/numerical-odes]]), and of finite element methods. The orthogonal polynomials behind Gaussian quadrature reappear in Sturm–Liouville theory ([[pde/sturm-liouville]]).

::: summary
- A quadrature rule $\sum w_if(x_i)$ has degree of exactness $d$ if it integrates polynomials up to degree $d$ exactly; integrating interpolants gives the Newton–Cotes rules.
- Basic errors: midpoint $\frac{(b-a)^3}{24}f''$, trapezoid $-\frac{(b-a)^3}{12}f''$, Simpson $-\frac{(b-a)^5}{2880}f^{(4)}$; symmetry gives midpoint and Simpson one extra degree.
- Composite rules converge like $h^2$ (midpoint, trapezoid) and $h^4$ (Simpson); check the observed ratios $4$ and $16$ when halving $h$.
- For smooth $f$, $T_h = I + c_1h^2 + c_2h^4 + \cdots$ (Euler–Maclaurin); Richardson extrapolation removes the terms one at a time, and Romberg integration organises this in a table. For periodic integrands the trapezoid rule is already spectrally accurate.
- Gauss–Legendre rules use the zeros of Legendre polynomials as nodes; with $n$ nodes they are exact for degree $2n - 1$ (the maximum possible) and have positive weights.
- Avoid high-order equally spaced rules; adaptive codes combine Gauss–Kronrod pairs with local subdivision.
:::

## Exercises

::: exercise The trapezoid rule on a cubic {level=1 check="8"}
Apply the basic trapezoid rule to $\int_0^2x^3\,dx$, and compare with the exact value $4$.
::: solution
$\frac{2}{2}\bigl(0^3 + 2^3\bigr) = 8$. The error $4 - 8 = -4$ agrees with $-\frac{(b-a)^3}{12}f''(\xi) = -\frac{8}{12}\cdot6\xi = -4\xi$ with $\xi = 1$.
:::
:::

::: exercise Simpson's rule on a cubic {level=1 check="4"}
Apply Simpson's rule to $\int_0^2x^3\,dx$.
::: solution
$\frac{2}{6}\bigl(0 + 4\cdot1^3 + 2^3\bigr) = \frac13\cdot12 = 4$, the exact value: Simpson's rule has degree of exactness $3$ (and indeed $f^{(4)} = 0$).
:::
:::

::: exercise A composite trapezoid sum {level=1 check="3/8"}
Compute the composite trapezoid approximation to $\int_0^1x^2\,dx$ with $h = \frac12$.
::: solution
$T_{1/2} = \frac12\left(\frac12\cdot0 + \frac14 + \frac12\cdot1\right) = \frac12\cdot\frac34 = \frac38$. The error is $\frac13 - \frac38 = -\frac1{24}$, matching $-\frac{(b-a)h^2}{12}f'' = -\frac{1\cdot\frac14}{12}\cdot2 = -\frac1{24}$ exactly (here $f''$ is constant).
:::
:::

::: exercise Choosing n for the midpoint rule {level=2 check="289"}
How many subintervals does the composite midpoint rule need to guarantee an error below $10^{-6}$ for $\int_1^2\frac{dx}{x}$?
::: solution
$f''(x) = \frac{2}{x^3} \le 2$ on $[1, 2]$, so by [[#thm-composite]] the error is at most $\frac{1\cdot h^2}{24}\cdot2 = \frac{h^2}{12}$. We need $h^2 \le 1.2\times10^{-5}$, i.e. $h \le 0.003\,464$, so $n \ge 288.7$: $n = 289$.
:::
:::

::: exercise Designing a two-point rule {level=2 check="1/sqrt(3)"}
Find $\alpha > 0$ and $w$ such that $\int_{-1}^1f(x)\,dx \approx w\bigl(f(-\alpha) + f(\alpha)\bigr)$ is exact for all polynomials of degree at most $3$.
::: solution
By symmetry the rule is exact for odd functions ($x$ and $x^3$) for any $\alpha, w$. Exactness for $1$ gives $2w = 2$, so $w = 1$; exactness for $x^2$ gives $2\alpha^2 = \frac23$, so $\alpha = \frac{1}{\sqrt3}$. This is the $2$-point Gauss–Legendre rule, and $\pm\frac1{\sqrt3}$ are the zeros of $P_2 = \frac12(3x^2 - 1)$.
:::
:::

::: exercise Two-point Gauss on the exponential {level=2}
Use the $2$-point Gauss rule to approximate $\int_0^1e^x\,dx = e - 1$, and compare its error with that of Simpson's rule (also exact for cubics), which uses three points.
::: solution
Mapping $t \in [-1, 1]$ to $x = \frac{1 + t}{2}$: $\int_0^1e^x\,dx \approx \frac12\left(e^{(1 - 1/\sqrt3)/2} + e^{(1 + 1/\sqrt3)/2}\right) = \frac12(1.235\,314 + 2.200\,479) = 1.717\,896$, error $(e - 1) - 1.717\,896 = 3.9\times10^{-4}$. Simpson: $\frac16(1 + 4e^{1/2} + e) = 1.718\,861$, error $-5.8\times10^{-4}$. The Gauss rule, with two evaluations, is more accurate than Simpson's rule with three.
:::
:::

::: exercise Romberg by hand {level=2}
For $\int_0^1e^{-x^2}\,dx$, $T_1 = 0.683\,940$ and $T_{1/2} = 0.731\,370$. Compute the Richardson extrapolation $\frac{4T_{1/2} - T_1}{3}$, check that it equals Simpson's rule with $h = \frac12$, and estimate the error of $T_{1/2}$.
::: solution
$\frac{4(0.731\,370) - 0.683\,940}{3} = \frac{2.925\,480 - 0.683\,940}{3} = 0.747\,180$, which is Simpson's value from [[#ex-basic]]. Since $T_h - I \approx c_1h^2$ and $T_{h/2} - I \approx \frac14c_1h^2$, we have $T_h - T_{h/2} \approx \frac34c_1h^2$, so the error of $T_{1/2}$ is about $\frac{T_{1/2} - T_1}{3} = 0.0158$ in magnitude, i.e. $I \approx T_{1/2} + 0.0158$. (The true error is $0.0155$.)
:::
:::

::: exercise Simpson's rule is extrapolated trapezoid {level=3 #exr-simpson-richardson}
Show that $\frac{4T_{h/2} - T_h}{3} = S_{h/2}$ exactly, for any function, where $T_h$ uses $n$ subintervals and $S_{h/2}$ is the composite Simpson rule with $2n$ subintervals.
::: solution
Let $y_j = f(a + jh/2)$ for $j = 0, \dots, 2n$. Then $T_h = h\left(\frac12y_0 + y_2 + y_4 + \cdots + y_{2n-2} + \frac12y_{2n}\right)$ and $T_{h/2} = \frac h2\left(\frac12y_0 + y_1 + y_2 + \cdots + y_{2n-1} + \frac12y_{2n}\right)$. Hence

$$
4T_{h/2} - T_h = h\Bigl(y_0 + 2\sum_{j \text{ odd}}y_j + 2\sum_{\substack{j \text{ even}\\ 0<j<2n}}y_j + y_{2n}\Bigr) - h\Bigl(\tfrac12y_0 + \sum_{\substack{j \text{ even}\\0<j<2n}}y_j + \tfrac12y_{2n}\Bigr) = h\Bigl(\tfrac12y_0 + 2\sum_{\text{odd}}y_j + \sum_{\text{even, interior}}y_j + \tfrac12y_{2n}\Bigr).
$$

Dividing by $3$: $\frac{h}{6}\left(y_0 + 4\sum_{\text{odd}}y_j + 2\sum_{\text{even, interior}}y_j + y_{2n}\right)$, which is $S_{h/2}$ with spacing $\frac h2$ (since $\frac{h/2}{3} = \frac h6$).
:::
:::

::: exercise The trapezoid rule for periodic functions {level=3 #exr-periodic}
Let $T_n(f) = \frac{2\pi}{n}\sum_{j=0}^{n-1}f\left(\frac{2\pi j}{n}\right)$. Show that $T_n(f) = \int_0^{2\pi}f(x)\,dx$ exactly for $f(x) = \cos(kx)$ and $f(x) = \sin(kx)$ whenever $k$ is an integer with $0 \le k < n$, and explain why this makes the trapezoid rule extremely accurate for smooth periodic functions.
::: hint
Use $e^{ikx}$ and sum a geometric series in $\omega = e^{2\pi ik/n}$.
:::
::: solution
For $k = 0$ both sides equal $2\pi$ (for $\cos 0 = 1$) or $0$. For $1 \le k < n$, $\int_0^{2\pi}e^{ikx}\,dx = 0$, and $T_n(e^{ikx}) = \frac{2\pi}{n}\sum_{j=0}^{n-1}\omega^j$ with $\omega = e^{2\pi ik/n} \ne 1$ (since $n$ does not divide $k$), so the geometric sum is $\frac{\omega^n - 1}{\omega - 1} = 0$ because $\omega^n = e^{2\pi ik} = 1$. Taking real and imaginary parts gives exactness for $\cos kx$ and $\sin kx$. A smooth periodic function has a Fourier series whose coefficients decay faster than any power of $k$ (exponentially if $f$ is analytic) ([[pde/fourier-series]]); the trapezoid rule integrates the first $n$ harmonics exactly, so its error comes only from the rapidly decaying high-frequency coefficients.
:::
:::

::: exercise Gauss weights and exactness {level=3}
Show directly that the $3$-point rule with nodes $0, \pm\sqrt{3/5}$ and weights $\frac89, \frac59, \frac59$ integrates $1, x^2$ and $x^4$ exactly over $[-1, 1]$ but not $x^6$, and explain why it is then exact for all polynomials of degree at most $5$.
::: solution
Odd powers are integrated exactly by symmetry (both sides vanish). For $1$: $\frac89 + \frac59 + \frac59 = 2 = \int_{-1}^11$. For $x^2$: $2\cdot\frac59\cdot\frac35 = \frac23 = \int x^2$. For $x^4$: $2\cdot\frac59\cdot\frac{9}{25} = \frac25 = \int x^4$. For $x^6$: $2\cdot\frac59\cdot\frac{27}{125} = \frac{6}{25} = 0.24$, while $\int_{-1}^1x^6 = \frac27 \approx 0.286$. By linearity the rule is exact for all combinations of $1, x, \dots, x^5$, i.e. all polynomials of degree at most $5$, and not for $x^6$: its degree of exactness is $5 = 2\cdot3 - 1$.
:::
:::
