The equation

$$
y'' - x\,y = 0
$$ {#eq-airy}

looks almost as simple as $y'' + y = 0$, and it matters just as much: it describes light near a caustic (the bright edge of a rainbow) and a quantum particle near a turning point, where its classical motion reverses. Yet none of our methods applies. The coefficient $-x$ is not constant, so there is no characteristic equation; no solution can be guessed; and in fact no solution is an elementary function. Equations with variable coefficients — Legendre's equation in problems with spherical symmetry, Bessel's equation for drums and cylinders — are the rule in applications, not the exception.

The way forward goes back to Newton: look for the solution as a **power series** $y = \sum a_nx^n$ and let the equation determine the coefficients. Near an **ordinary point**, where the coefficients are analytic, this always works. Near a **regular singular point** a modified series $x^r\sum a_nx^n$, found by the **method of Frobenius**, does the job. In this chapter we develop both methods and use them to meet the most important special functions of mathematical physics: Airy functions, Legendre polynomials and Bessel functions.

## Power series and ordinary points

We use the facts about power series from [[calculus-2/power-series]]. A power series $\sum_{n=0}^\infty a_n(x - x_0)^n$ has a radius of convergence $R\in[0,\infty]$; inside $\lvert x - x_0\rvert < R$ it may be differentiated term by term, any number of times, and the derived series have the same radius. A function is **analytic** at $x_0$ if it equals a convergent power series on some interval around $x_0$. Two facts make the method work:

- **Identity theorem.** If $\sum a_n(x-x_0)^n = 0$ for all $x$ in an interval around $x_0$, then every $a_n = 0$. So we may *compare coefficients* of the same power on both sides of an equation.
- **Index shifting.** To combine series we rewrite them with the same power: for instance $\sum_{n=2}^\infty n(n-1)a_nx^{n-2} = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n$, by putting $n\to n + 2$.

::: definition Ordinary and singular points {#def-ordinary}
Consider $P(x)y'' + Q(x)y' + R(x)y = 0$, where $P, Q, R$ are analytic (for us, usually polynomials). A point $x_0$ is an **ordinary point** if $p = Q/P$ and $q = R/P$ are analytic at $x_0$ — for polynomial coefficients without common factors, if $P(x_0)\neq0$. Otherwise $x_0$ is a **singular point**.
:::

::: example A familiar equation by series {#ex-warmup}
Solve $y'' + y = 0$ by power series about $x_0 = 0$.
::: solution
Substitute $y = \sum_{n=0}^\infty a_nx^n$, so $y'' = \sum_{n=2}^\infty n(n-1)a_nx^{n-2} = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n$. The equation becomes

$$
\sum_{n=0}^\infty\bigl[(n+2)(n+1)a_{n+2} + a_n\bigr]x^n = 0,
$$

and by the identity theorem every bracket vanishes. This gives the **recurrence relation**

$$
a_{n+2} = -\frac{a_n}{(n+2)(n+1)} \qquad (n\ge0).
$$

The even coefficients are determined by $a_0$ and the odd ones by $a_1$: $a_2 = -\frac{a_0}{2!}$, $a_4 = \frac{a_0}{4!}$, …, $a_{2k} = \frac{(-1)^ka_0}{(2k)!}$, and $a_{2k+1} = \frac{(-1)^ka_1}{(2k+1)!}$. Hence

$$
y = a_0\sum_{k=0}^\infty\frac{(-1)^kx^{2k}}{(2k)!} + a_1\sum_{k=0}^\infty\frac{(-1)^kx^{2k+1}}{(2k+1)!} = a_0\cos x + a_1\sin x .
$$

The two free constants are $a_0 = y(0)$ and $a_1 = y'(0)$, exactly as the existence theorem predicts. For the cosine and sine we already knew the answer; for most equations the series *is* the answer.
:::
:::

At an ordinary point this procedure never fails, and the series converge on a predictable interval. The following theorem was proved by Fuchs in 1866 (and essentially by Cauchy before him).

::: theorem Series solutions at an ordinary point {#thm-ordinary}
Let $x_0$ be an ordinary point of $y'' + p(x)y' + q(x)y = 0$, and suppose the power series of $p$ and $q$ about $x_0$ converge for $\lvert x - x_0\rvert < \rho$. Then every solution is analytic at $x_0$: for any $a_0, a_1$ there is exactly one solution $y = \sum a_n(x - x_0)^n$ with $y(x_0) = a_0$, $y'(x_0) = a_1$, and its series converges at least for $\lvert x - x_0\rvert < \rho$.
:::

::: proof {collapsed}
*Sketch.* Substituting $y = \sum a_nx^n$ (take $x_0 = 0$), $p = \sum p_kx^k$, $q = \sum q_kx^k$ and comparing coefficients of $x^n$ gives

$$
(n+2)(n+1)a_{n+2} = -\sum_{k=0}^{n}\bigl[(k+1)p_{n-k}\,a_{k+1} + q_{n-k}\,a_k\bigr],
$$

which determines $a_2, a_3, \dots$ uniquely from $a_0, a_1$. Convergence is proved by the **method of majorants**: fix $0 < r < \rho$; since the series for $p, q$ converge at $r$, there is $M$ with $\lvert p_k\rvert, \lvert q_k\rvert\le M/r^k$. One then shows by induction that $\lvert a_n\rvert\le A_n$, where the $A_n$ are the coefficients of the solution of a comparison equation with coefficients $\frac{M}{1 - x/r}$, which can be solved explicitly and whose series converges for $\lvert x\rvert < r$. Since $r < \rho$ was arbitrary, the radius is at least $\rho$. Uniqueness follows from the uniqueness of the coefficients (or from [[ode/second-order-linear#thm-eu2]]). Full details are in Coddington's *An Introduction to Ordinary Differential Equations*, Chapter 3, or Teschl's notes, Chapter 4.
:::

For rational coefficients the radius $\rho$ is easy to find: by complex analysis ([[complex-analysis/laurent-series]]) the power series of $Q/P$ about $x_0$ converges out to the nearest zero of $P$ **in the complex plane** (after cancelling common factors). For example, solutions of $(1 + x^2)y'' + y = 0$ about $0$ converge at least for $\lvert x\rvert < 1$, because $1 + x^2$ vanishes at $\pm i$ — even though nothing at all happens to the equation at real points.

::: example The Airy equation {#ex-airy}
Find two independent power series solutions of $y'' - xy = 0$ about $x = 0$.
::: solution
With $y = \sum a_nx^n$,

$$
y'' - xy = \sum_{n=0}^\infty(n+2)(n+1)a_{n+2}x^n - \sum_{n=0}^\infty a_nx^{n+1} = 2a_2 + \sum_{n=1}^\infty\bigl[(n+2)(n+1)a_{n+2} - a_{n-1}\bigr]x^n ,
$$

after shifting the index in the second sum ($n + 1\to n$) and separating the $n = 0$ term. Hence $a_2 = 0$ and

$$
a_{n+2} = \frac{a_{n-1}}{(n+2)(n+1)} \qquad (n\ge1).
$$

The recurrence jumps in steps of three. Starting from $a_0$: $a_3 = \frac{a_0}{2\cdot3}$, $a_6 = \frac{a_0}{2\cdot3\cdot5\cdot6}$, …; from $a_1$: $a_4 = \frac{a_1}{3\cdot4}$, $a_7 = \frac{a_1}{3\cdot4\cdot6\cdot7}$, …; and $a_2 = a_5 = a_8 = \dots = 0$. So

$$
y_1 = 1 + \frac{x^3}{6} + \frac{x^6}{180} + \frac{x^9}{12960} + \cdots, \qquad y_2 = x + \frac{x^4}{12} + \frac{x^7}{504} + \frac{x^{10}}{45360} + \cdots .
$$

The coefficients $p = 0$, $q = -x$ are polynomials, so $\rho = \infty$ and both series converge for all $x$. Their Wronskian at $0$ is $y_1(0)y_2'(0) - y_1'(0)y_2(0) = 1$, so they are independent. The standard **Airy function** $\operatorname{Ai}$ is the combination $\operatorname{Ai} = c_1y_1 - c_2y_2$ with $c_1\approx0.3550$, $c_2\approx0.2588$, chosen so that it decays as $x\to+\infty$.
:::
:::

::: widget plot
f: sum(x^(3k)/(9^k*fact(k)*gamma(k + 2/3)), k, 0, 40)/3^(2/3) - sum(x^(3k+1)/(9^k*fact(k)*gamma(k + 4/3)), k, 0, 40)/3^(4/3); sum(x^(3k)/(9^k*fact(k)*gamma(k + 2/3)), k, 0, n)/3^(2/3) - sum(x^(3k+1)/(9^k*fact(k)*gamma(k + 4/3)), k, 0, n)/3^(4/3)
x: -10, 3
y: -0.8, 0.8
sliders: n=3:1:30:1
labels: \operatorname{Ai}(x); \text{partial sum}
caption: The Airy function $\operatorname{Ai}$, computed from the series of [[#ex-airy]], and a partial sum with terms up to $x^{3n+1}$. For $x < 0$ the equation $y'' = xy$ behaves like an oscillator with growing frequency; for $x > 0$ like exponential growth or decay. Increase $n$: the partial sums converge for every $x$, but far from $0$ many terms are needed, because huge terms of alternating sign must cancel.
:::

## Legendre's equation

Problems with spherical symmetry — the gravitational field of a planet, the electric field around a charged sphere, the hydrogen atom — lead, after separation of variables in spherical coordinates, to **Legendre's equation**

$$
(1 - x^2)\,y'' - 2x\,y' + \alpha(\alpha + 1)\,y = 0,
$$ {#eq-legendre}

where $\alpha$ is a constant and $x = \cos\theta$ ranges over $[-1,1]$. The points $x = \pm1$ are singular, so by [[#thm-ordinary]] series about $0$ converge at least for $\lvert x\rvert < 1$.

Substituting $y = \sum a_kx^k$ and collecting the coefficient of $x^k$:

$$
(k+2)(k+1)a_{k+2} - k(k-1)a_k - 2ka_k + \alpha(\alpha+1)a_k = 0,
$$

so

$$
a_{k+2} = \frac{k(k+1) - \alpha(\alpha+1)}{(k+2)(k+1)}\,a_k = -\frac{(\alpha - k)(\alpha + k + 1)}{(k+2)(k+1)}\,a_k .
$$ {#eq-legendre-recurrence}

Again the even and odd coefficients form separate chains, giving an even solution (from $a_0$) and an odd one (from $a_1$). Now comes the key observation: **if $\alpha = n$ is a non-negative integer, the factor $\alpha - k$ vanishes at $k = n$**, so $a_{n+2} = a_{n+4} = \dots = 0$, and the chain containing $a_n$ stops. One of the two solutions is then a polynomial of degree $n$.

::: definition Legendre polynomials {#def-legendre}
For $n = 0, 1, 2, \dots$, the **Legendre polynomial** $P_n$ is the polynomial solution of [[#eq-legendre]] with $\alpha = n$, normalised by $P_n(1) = 1$. The first few are

$$
P_0 = 1,\quad P_1 = x,\quad P_2 = \tfrac12(3x^2 - 1),\quad P_3 = \tfrac12(5x^3 - 3x),\quad P_4 = \tfrac18(35x^4 - 30x^2 + 3).
$$
:::

For instance, for $n = 2$ the even chain is $a_2 = -\frac{2\cdot3}{2}a_0 = -3a_0$ and $a_4 = 0$, giving $a_0(1 - 3x^2)$; normalising at $x = 1$ gives $P_2 = \frac12(3x^2 - 1)$. The *other* solution, from the non-terminating chain, is an infinite series that diverges at $x = \pm1$; for $n = 1$ it is the function $Q_1 = \frac x2\ln\frac{1+x}{1-x} - 1$ found by reduction of order in [[ode/second-order-linear#ex-legendre-q]]. In physical problems, where solutions must be finite at the poles $x = \pm1$, only the polynomials survive — which is why $\alpha$ must be an integer, a first glimpse of the **eigenvalue problems** of [[pde/sturm-liouville]].

The Legendre polynomials are mutually orthogonal, like the sines and cosines of Fourier series.

::: theorem Orthogonality of Legendre polynomials {#thm-legendre-orth}
For $m\neq n$,

$$
\int_{-1}^1P_m(x)\,P_n(x)\,dx = 0 .
$$
:::

::: proof
Since $\bigl((1 - x^2)y'\bigr)' = (1 - x^2)y'' - 2xy'$, Legendre's equation can be written in the **self-adjoint form** $\bigl((1 - x^2)P_n'\bigr)' + n(n+1)P_n = 0$. Multiply this by $P_m$, multiply the corresponding equation for $P_m$ by $P_n$, and subtract:

$$
\bigl(n(n+1) - m(m+1)\bigr)P_mP_n = P_n\bigl((1-x^2)P_m'\bigr)' - P_m\bigl((1-x^2)P_n'\bigr)' = \Bigl((1 - x^2)\bigl(P_nP_m' - P_mP_n'\bigr)\Bigr)'.
$$

(Check the last step with the product rule: the terms $(1-x^2)P_n'P_m'$ cancel.) Integrating from $-1$ to $1$, the right-hand side gives the boundary term $\bigl[(1 - x^2)(P_nP_m' - P_mP_n')\bigr]_{-1}^1 = 0$, because $1 - x^2$ vanishes at both ends. Since $m\neq n$ (and $m, n\ge0$), $n(n+1)\neq m(m+1)$, so $\int_{-1}^1P_mP_n\,dx = 0$.
:::

Two further facts, whose proofs are exercises ([[#exr-8-9]]) or can be found in Simmons's book, are **Rodrigues' formula**

$$
P_n(x) = \frac{1}{2^nn!}\,\frac{d^n}{dx^n}\bigl(x^2 - 1\bigr)^n
$$ {#eq-rodrigues}

and the normalisation $\int_{-1}^1P_n^2\,dx = \frac{2}{2n+1}$. Together with orthogonality they allow any reasonable function $f$ on $[-1,1]$ to be expanded as $f = \sum c_nP_n$ with $c_n = \frac{2n+1}{2}\int_{-1}^1fP_n\,dx$, just as in Fourier series.

::: widget plot
f: 1; x; (3x^2 - 1)/2; (5x^3 - 3x)/2; (35x^4 - 30x^2 + 3)/8
x: -1, 1
y: -1.1, 1.1
labels: P_0; P_1; P_2; P_3; P_4
caption: The Legendre polynomials $P_0, \dots, P_4$ on $[-1,1]$. Notice that $P_n(1) = 1$, $P_n(-1) = (-1)^n$, that $P_n$ is even or odd with $n$, and that $P_n$ has exactly $n$ zeros, all inside $(-1,1)$. These zeros are the nodes of Gauss–Legendre quadrature, the most accurate way to integrate with $n$ function values ([[numerical-analysis/numerical-integration]]).
:::

::: quiz
For which value of $\alpha$ does Legendre's equation $(1-x^2)y'' - 2xy' + \alpha(\alpha+1)y = 0$ have a polynomial solution of degree $5$?
- [x] $\alpha = 5$ (and also $\alpha = -6$)
- [ ] $\alpha = 30$
- [ ] $\alpha = \sqrt{30}$
- [ ] No value: the solutions are always infinite series
::: solution
By [[#eq-legendre-recurrence]] the odd chain terminates after $x^5$ when $\alpha - 5 = 0$, giving $P_5$. Since the equation only involves $\alpha(\alpha+1) = 30$, the value $\alpha = -6$ gives the same equation (then the factor $\alpha + k + 1$ vanishes at $k = 5$).
:::
:::

## Regular singular points and the Frobenius method

At a singular point solutions may misbehave — blow up, oscillate infinitely often, or fail to be differentiable — and power series may not exist. The model case is the Cauchy–Euler equation $x^2y'' + bxy' + cy = 0$ of [[ode/second-order-linear]], whose solutions $x^r$ (or $x^r\ln x$) are not analytic at $0$ unless $r$ happens to be a non-negative integer. Frobenius's idea is to combine the Cauchy–Euler behaviour with a power series. This works when the singularity is no worse than in the Cauchy–Euler case.

::: definition Regular singular point {#def-regular-singular}
A singular point $x_0$ of $y'' + p(x)y' + q(x)y = 0$ is **regular** if $(x - x_0)\,p(x)$ and $(x - x_0)^2q(x)$ are both analytic at $x_0$, and **irregular** otherwise.
:::

Equivalently, after multiplying by $(x - x_0)^2$ (take $x_0 = 0$), the equation reads $x^2y'' + x\,\tilde p(x)\,y' + \tilde q(x)\,y = 0$ with $\tilde p = xp$, $\tilde q = x^2q$ analytic — a Cauchy–Euler equation whose coefficients have been allowed to vary analytically. We look for a solution of the form

$$
y = x^r\sum_{n=0}^\infty a_nx^n = \sum_{n=0}^\infty a_nx^{n+r}, \qquad a_0\neq0,
$$ {#eq-frobenius}

for $x > 0$, where the exponent $r$ (possibly non-integer or complex) is to be found. Write $p_0 = \tilde p(0)$ and $q_0 = \tilde q(0)$. Substituting, the lowest power $x^r$ has coefficient $a_0\bigl(r(r-1) + p_0r + q_0\bigr)$, so we need

$$
F(r) = r(r - 1) + p_0\,r + q_0 = 0 ,
$$ {#eq-indicial}

the **indicial equation**, with roots $r_1, r_2$ called the **exponents** at the singular point. Its form is exactly that of the Cauchy–Euler equation with constants $p_0, q_0$: near a regular singular point, solutions behave like $x^{r_1}$ and $x^{r_2}$.

::: theorem Frobenius {#thm-frobenius}
Let $0$ be a regular singular point of $x^2y'' + x\tilde p(x)y' + \tilde q(x)y = 0$, where the series of $\tilde p$ and $\tilde q$ converge for $\lvert x\rvert < \rho$, and let the indicial roots $r_1, r_2$ be real with $r_1\ge r_2$. Then on $0 < x < \rho$:

1. there is a solution $y_1 = x^{r_1}\sum_{n=0}^\infty a_nx^n$ with $a_0 = 1$, the series converging for $\lvert x\rvert < \rho$;
2. if $r_1 - r_2$ is **not an integer**, there is a second, independent solution $y_2 = x^{r_2}\sum_{n=0}^\infty b_nx^n$ with $b_0 = 1$;
3. if $r_1 = r_2$, a second solution has the form $y_2 = y_1\ln x + x^{r_1}\sum_{n=1}^\infty b_nx^n$;
4. if $r_1 - r_2 = N$ is a positive integer, a second solution has the form $y_2 = C\,y_1\ln x + x^{r_2}\sum_{n=0}^\infty b_nx^n$ with $b_0 = 1$, where the constant $C$ may be zero.
:::

::: proof {collapsed}
*Sketch.* Write $\tilde p = \sum p_kx^k$, $\tilde q = \sum q_kx^k$ and substitute [[#eq-frobenius]]. The coefficient of $x^{n+r}$ is

$$
\bigl[(n + r)(n + r - 1) + p_0(n + r) + q_0\bigr]a_n + \sum_{k=0}^{n-1}\bigl[(k + r)p_{n-k} + q_{n-k}\bigr]a_k = 0,
$$

that is,

$$
F(r + n)\,a_n = -\sum_{k=0}^{n-1}\bigl[(k + r)\,p_{n-k} + q_{n-k}\bigr]a_k \qquad (n\ge1).
$$ {#eq-frobenius-recurrence}

For $r = r_1$, $F(r_1 + n)\neq0$ for every $n\ge1$, because the only roots of $F$ are $r_1$ and $r_2\le r_1 < r_1 + n$. So [[#eq-frobenius-recurrence]] determines every $a_n$, proving part 1 apart from convergence. For $r = r_2$ the same works unless $F(r_2 + n) = 0$ for some $n\ge1$, which happens exactly when $r_2 + n = r_1$, i.e. when $r_1 - r_2$ is a positive integer; this proves part 2. In case 4 the recurrence at $n = N$ reads $0\cdot b_N = (\text{something})$: if the right-hand side happens to vanish, $b_N$ is arbitrary and a second Frobenius series exists ($C = 0$); otherwise there is none and a logarithm is forced. Cases 3 and 4 are obtained by reduction of order ([[ode/second-order-linear#prop-reduction]]) or by differentiating the series with respect to $r$, as in the intuition for repeated characteristic roots. Convergence is proved with majorants as in [[#thm-ordinary]]. See Coddington, Chapter 4, or Teschl, Chapter 4, for complete proofs.
:::

The practical procedure: compute $p_0$, $q_0$ and the indicial roots; derive the recurrence; run it for $r_1$; and for the second solution check whether $r_1 - r_2$ is an integer.

::: example Two Frobenius series {#ex-frobenius}
Solve $2x\,y'' + y' + y = 0$ near $x = 0$.
::: solution
In standard form $p = \frac{1}{2x}$, $q = \frac{1}{2x}$, so $xp = \frac12$ and $x^2q = \frac x2$ are analytic: $0$ is a regular singular point with $p_0 = \frac12$, $q_0 = 0$. The indicial equation $r(r-1) + \frac12r = r\bigl(r - \frac12\bigr) = 0$ has roots $r_1 = \frac12$, $r_2 = 0$, which do not differ by an integer, so we expect two Frobenius series.

Substituting $y = \sum a_nx^{n+r}$:

$$
2xy'' + y' = \sum_{n=0}^\infty(n + r)\bigl(2(n + r) - 1\bigr)a_nx^{n+r-1}, \qquad y = \sum_{n=1}^\infty a_{n-1}x^{n+r-1}.
$$

So $(n + r)(2n + 2r - 1)a_n + a_{n-1} = 0$ for $n\ge1$.

- For $r = 0$: $a_n = -\dfrac{a_{n-1}}{n(2n - 1)}$, so $a_1 = -1$, $a_2 = \frac16$, $a_3 = -\frac1{90}$, …, and in general $a_n = \dfrac{(-1)^n2^n}{(2n)!}$. Hence $y_2 = \sum\dfrac{(-1)^n(2x)^n}{(2n)!} = \cos\sqrt{2x}$.
- For $r = \frac12$: $a_n = -\dfrac{a_{n-1}}{n(2n + 1)}$, giving $y_1 = x^{1/2}\bigl(1 - \frac x3 + \frac{x^2}{30} - \cdots\bigr) = \dfrac{\sin\sqrt{2x}}{\sqrt2}$.

The general solution for $x > 0$ is $c_1\cos\sqrt{2x} + c_2\sin\sqrt{2x}$. The solution $\sin\sqrt{2x}$ is continuous at $0$ but has infinite slope there: the singular point shows up as a square-root singularity.
:::
:::

::: quiz
What are the indicial roots of $x^2y'' + xy' + \bigl(x^2 - \tfrac14\bigr)y = 0$ at $x = 0$?
- [ ] $0$ and $1$
- [x] $\tfrac12$ and $-\tfrac12$
- [ ] $\tfrac14$ and $-\tfrac14$
- [ ] There are none, because $0$ is an irregular singular point
::: solution
Here $\tilde p = 1$ and $\tilde q = x^2 - \frac14$, so $p_0 = 1$, $q_0 = -\frac14$ and $F(r) = r(r-1) + r - \frac14 = r^2 - \frac14$, with roots $\pm\frac12$. They differ by the integer $1$, case 4 of [[#thm-frobenius]] — but here $C = 0$: the solutions are $\frac{\sin x}{\sqrt x}$ and $\frac{\cos x}{\sqrt x}$, with no logarithm (see [[#ex-bessel-half]]).
:::
:::

::: warning Irregular singular points
At an irregular singular point Frobenius series need not exist at all. For $x^2y'' + y' - y = 0$ at $0$, $xp = 1/x$ is not analytic, and the formal power series that the recurrence produces diverges for every $x\neq0$. Behaviour at irregular singular points (such as the point at infinity for Bessel's and Airy's equations) is studied with asymptotic expansions instead.
:::

## Bessel's equation

Vibrations of a circular drum, heat flow in a cylinder and the diffraction of light by a circular aperture all lead to **Bessel's equation of order $\nu$**,

$$
x^2y'' + xy' + \bigl(x^2 - \nu^2\bigr)y = 0 \qquad (\nu\ge0).
$$ {#eq-bessel}

Here $\tilde p = 1$ and $\tilde q = x^2 - \nu^2$, so $0$ is a regular singular point with indicial equation $r^2 - \nu^2 = 0$ and exponents $\pm\nu$. Substituting $y = \sum a_nx^{n+r}$, the coefficient of $x^{n+r}$ gives

$$
\bigl((n + r)^2 - \nu^2\bigr)a_n + a_{n-2} = 0 \qquad (n\ge2), \qquad \bigl((1 + r)^2 - \nu^2\bigr)a_1 = 0 .
$$

For $r = \nu$: $(1 + \nu)^2 - \nu^2 = 1 + 2\nu > 0$, so $a_1 = 0$ and all odd coefficients vanish, while $(2k + \nu)^2 - \nu^2 = 4k(k + \nu)$ gives

$$
a_{2k} = -\frac{a_{2k-2}}{4k(k + \nu)}, \qquad\text{so}\qquad a_{2k} = \frac{(-1)^ka_0}{4^k\,k!\,(\nu+1)(\nu+2)\cdots(\nu+k)} .
$$

The product $(\nu+1)\cdots(\nu+k)$ is best written with the Gamma function.

::: definition Gamma function {#def-gamma}
For $x > 0$, the **Gamma function** is $\Gamma(x) = \displaystyle\int_0^\infty t^{x-1}e^{-t}\,dt$. It satisfies

$$
\Gamma(x + 1) = x\,\Gamma(x), \qquad \Gamma(n + 1) = n!, \qquad \Gamma\bigl(\tfrac12\bigr) = \sqrt\pi .
$$
:::

(The functional equation follows by integrating by parts, $\int_0^\infty t^xe^{-t}\,dt = \bigl[-t^xe^{-t}\bigr]_0^\infty + x\int_0^\infty t^{x-1}e^{-t}\,dt$; with $\Gamma(1) = 1$ it gives $\Gamma(n+1) = n!$; and substituting $t = u^2$ turns $\Gamma(\frac12)$ into the Gaussian integral $2\int_0^\infty e^{-u^2}du = \sqrt\pi$.) The functional equation also extends $\Gamma$ to negative non-integers by $\Gamma(x) = \Gamma(x+1)/x$; at $0, -1, -2, \dots$ it has poles, and we use the convention $1/\Gamma(-m) = 0$ for $m = 0, 1, 2, \dots$. Now $(\nu+1)\cdots(\nu+k) = \Gamma(\nu + k + 1)/\Gamma(\nu + 1)$, and the conventional choice $a_0 = \dfrac{1}{2^\nu\,\Gamma(\nu+1)}$ leads to the following definition.

::: definition Bessel functions of the first kind {#def-bessel}
The **Bessel function of the first kind of order $\nu$** is

$$
J_\nu(x) = \sum_{k=0}^\infty\frac{(-1)^k}{k!\,\Gamma(k + \nu + 1)}\left(\frac x2\right)^{2k + \nu}.
$$ {#eq-bessel-series}
:::

By construction $J_\nu$ solves [[#eq-bessel]] for $x > 0$; the series converges for all $x$ by the ratio test (the ratio of consecutive terms is $-\frac{x^2}{4(k+1)(k+\nu+1)}\to0$). In particular

$$
J_0(x) = 1 - \frac{x^2}{4} + \frac{x^4}{64} - \frac{x^6}{2304} + \cdots, \qquad J_1(x) = \frac x2 - \frac{x^3}{16} + \frac{x^5}{384} - \cdots .
$$

For the second solution, [[#thm-frobenius]] says: if $2\nu$ is not an integer, $J_{-\nu}$ (the same series with $\nu$ replaced by $-\nu$) is a second solution, independent of $J_\nu$ because it behaves like $x^{-\nu}$ near $0$. If $\nu = n$ is an integer, then $J_{-n} = (-1)^nJ_n$ (the terms with $k < n$ vanish because $1/\Gamma(k - n + 1) = 0$), and the second solution, the **Bessel function of the second kind** $Y_n$, contains $J_n(x)\ln x$ and is unbounded as $x\to0^+$. In physical problems on a full disc, boundedness at the centre therefore selects $J_n$.

::: example Equal exponents: a logarithm appears {#ex-bessel-zero}
For Bessel's equation of order $0$, $x^2y'' + xy' + x^2y = 0$, find the first terms of a second solution independent of $J_0$.
::: solution
The exponents are $r_1 = r_2 = 0$, so by part 3 of [[#thm-frobenius]] we look for $y_2 = J_0(x)\ln x + v(x)$ with $v = \sum_{n\ge1}b_nx^n$. Write $L[y] = x^2y'' + xy' + x^2y$. For $y = J_0\ln x$ we have $y' = J_0'\ln x + J_0/x$ and $y'' = J_0''\ln x + 2J_0'/x - J_0/x^2$, so

$$
L[J_0\ln x] = \ln x\;L[J_0] + 2xJ_0' - J_0 + J_0 = 2xJ_0' .
$$

Hence we need $L[v] = -2xJ_0' = x^2 - \frac{x^4}{8} + \frac{x^6}{192} - \cdots$ (using $J_0' = -\frac x2 + \frac{x^3}{16} - \cdots$). Since $L[x^n] = n^2x^n + x^{n+2}$, the coefficient of $x^n$ in $L[v]$ is $n^2b_n + b_{n-2}$. Comparing: $b_1 = 0$ and all odd $b_n$ vanish; $4b_2 = 1$, so $b_2 = \frac14$; $16b_4 + b_2 = -\frac18$, so $b_4 = -\frac{3}{128}$. Therefore

$$
y_2 = J_0(x)\ln x + \frac{x^2}{4} - \frac{3x^4}{128} + \cdots .
$$

This solution tends to $-\infty$ like $\ln x$ as $x\to0^+$. The standard Bessel function of the second kind is the combination $Y_0 = \frac{2}{\pi}\bigl(y_2 + (\gamma - \ln 2)J_0\bigr)$, where $\gamma\approx0.5772$ is Euler's constant.
:::
:::

::: example Bessel functions of half-integer order {#ex-bessel-half}
Show that $J_{1/2}(x) = \sqrt{\dfrac{2}{\pi x}}\,\sin x$.
::: solution
We need $\Gamma\bigl(k + \frac32\bigr)$. By the functional equation, $\Gamma(\frac32) = \frac12\Gamma(\frac12) = \frac{\sqrt\pi}{2}$, and by induction

$$
\Gamma\left(k + \tfrac32\right) = \frac{(2k+1)!}{4^k\,k!}\cdot\frac{\sqrt\pi}{2}
$$

(by induction: the formula holds for $k = 0$, and the ratio of the right-hand sides for $k+1$ and $k$ is $\frac{(2k+3)(2k+2)}{4(k+1)} = k + \frac32$, as the functional equation requires). Then

$$
\frac{(x/2)^{2k + 1/2}}{k!\,\Gamma(k + \frac32)} = \frac{x^{2k+1/2}}{2^{2k+1/2}}\cdot\frac{2\cdot4^k}{(2k+1)!\sqrt\pi} = \sqrt{\frac2\pi}\;x^{-1/2}\,\frac{x^{2k+1}}{(2k+1)!}.
$$

Summing with the signs $(-1)^k$ gives $J_{1/2}(x) = \sqrt{\frac{2}{\pi x}}\sum_k\frac{(-1)^kx^{2k+1}}{(2k+1)!} = \sqrt{\frac{2}{\pi x}}\sin x$. Similarly $J_{-1/2}(x) = \sqrt{\frac{2}{\pi x}}\cos x$ ([[#exr-8-10]]). Bessel functions of half-integer order are elementary — they describe waves in three dimensions — and they suggest the general behaviour $J_\nu(x)\approx\sqrt{\frac{2}{\pi x}}\cos\bigl(x - \frac{\nu\pi}{2} - \frac\pi4\bigr)$ for large $x$: oscillation with slowly decaying amplitude.
:::
:::

Bessel functions of different orders are tied together by recurrence relations, which play the role that $\sin' = \cos$ plays for trigonometric functions.

::: theorem Bessel recurrences {#thm-bessel-recurrence}
For every $\nu$ and $x > 0$,

$$
\frac{d}{dx}\bigl(x^\nu J_\nu(x)\bigr) = x^\nu J_{\nu-1}(x), \qquad \frac{d}{dx}\bigl(x^{-\nu}J_\nu(x)\bigr) = -x^{-\nu}J_{\nu+1}(x).
$$

In particular $J_0' = -J_1$.
:::

::: proof
We prove the first identity; the second is proved in the same way in [[#exr-8-8]]. Multiply [[#eq-bessel-series]] by $x^\nu$:

$$
x^\nu J_\nu(x) = \sum_{k=0}^\infty\frac{(-1)^k\,x^{2k + 2\nu}}{2^{2k+\nu}\,k!\,\Gamma(k + \nu + 1)} .
$$

Differentiate term by term (allowed inside the radius of convergence, here everywhere) and use $\frac{2k + 2\nu}{\Gamma(k + \nu + 1)} = \frac{2(k + \nu)}{(k + \nu)\Gamma(k + \nu)} = \frac{2}{\Gamma(k + \nu)}$:

$$
\frac{d}{dx}\bigl(x^\nu J_\nu\bigr) = \sum_{k=0}^\infty\frac{(-1)^k\,x^{2k + 2\nu - 1}}{2^{2k + \nu - 1}\,k!\,\Gamma(k + \nu)} = x^\nu\sum_{k=0}^\infty\frac{(-1)^k}{k!\,\Gamma(k + (\nu - 1) + 1)}\left(\frac x2\right)^{2k + \nu - 1} = x^\nu J_{\nu-1}(x).
$$

(When $\nu + k = 0$ the term on the left is a constant whose derivative is $0$, matching $1/\Gamma(0) = 0$ on the right.) For $\nu = 0$ the second identity reads $J_0' = -J_1$.
:::

::: widget plot
f: sum((-1)^k*(x/2)^(2k)/fact(k)^2, k, 0, 35); sum((-1)^k*(x/2)^(2k+1)/(fact(k)*fact(k + 1)), k, 0, 35); sum((-1)^k*(x/2)^(2k)/fact(k)^2, k, 0, n)
x: 0, 15
y: -1, 1.2
sliders: n=2:1:20:1
labels: J_0; J_1; \text{partial sum of } J_0
caption: The Bessel functions $J_0$ and $J_1$, computed from [[#eq-bessel-series]], with a partial sum of the series for $J_0$. Both oscillate like damped cosines; the zeros of $J_0$ ($2.405$, $5.520$, $8.654$, …) are not equally spaced near the origin but approach a spacing of $\pi$. Where $J_0$ has a maximum or minimum, $J_1$ crosses zero — the identity $J_0' = -J_1$ of [[#thm-bessel-recurrence]].
:::

::: application The sound of a drum
A circular drumhead of radius $a$ vibrates in modes of the form $J_n(kr)\cos(n\theta)\cos(ckt)$, where the fixed rim requires $J_n(ka) = 0$. The allowed frequencies are therefore proportional to the zeros of Bessel functions: for the symmetric modes, to $2.405$, $5.520$, $8.654$, …. Unlike the frequencies $1, 2, 3, \dots$ of a vibrating string, these are not integer multiples of the lowest one, which is why a drum has a less definite pitch than a violin. The modes come from separating the wave equation in polar coordinates, as Laplace's equation is separated in a disc in [[pde/laplace-equation]]; the radial factor then solves Bessel's equation, a singular Sturm–Liouville problem ([[pde/sturm-liouville]]).
:::

::: history
Newton solved differential equations by infinite series in his *Methodus fluxionum* (1671). Daniel Bernoulli met the function now called $J_0$ in 1732, studying the oscillations of a hanging chain, and Euler encountered Bessel's equation in the vibrations of a circular membrane in 1764. Friedrich Wilhelm Bessel made a systematic study of the functions in 1824 in connection with planetary perturbations, and they have carried his name since. Legendre introduced his polynomials in 1782–1785 while studying the gravitational attraction of spheroids. Lazarus Fuchs characterised regular singular points in 1866, and Georg Frobenius published his method in 1873. George Airy introduced the integral now called the Airy function in 1838, in a study of the intensity of light near a caustic.
:::

## Where this leads

Legendre polynomials and Bessel functions are the eigenfunctions of singular Sturm–Liouville problems, studied in [[pde/sturm-liouville]], and they appear whenever Laplace's, the heat or the wave equation is separated in spherical or cylindrical coordinates ([[pde/laplace-equation]]). The orthogonality of [[#thm-legendre-orth]] is the polynomial cousin of the orthogonality of sines and cosines in [[pde/fourier-series]]. In complex analysis, series solutions are the starting point of the theory of differential equations in the complex plane, where the behaviour of solutions continued around singular points (their **monodromy**) is a central topic; the local expansions used there generalise the Laurent series of [[complex-analysis/laurent-series]]. And the zeros of Legendre polynomials are the nodes of Gaussian quadrature ([[numerical-analysis/numerical-integration]]).

::: summary
- At an ordinary point, substitute $y = \sum a_n(x-x_0)^n$, shift indices and compare coefficients to get a recurrence; $a_0 = y(x_0)$ and $a_1 = y'(x_0)$ are free ([[#thm-ordinary]]).
- The series converge at least out to the nearest singular point of the coefficients in the complex plane.
- Legendre's equation has polynomial solutions $P_n$ exactly when $\alpha(\alpha+1) = n(n+1)$; they are orthogonal on $[-1,1]$ ([[#thm-legendre-orth]]).
- At a regular singular point ($xp$ and $x^2q$ analytic), try $y = x^r\sum a_nx^n$; the exponents solve the indicial equation $r(r-1) + p_0r + q_0 = 0$.
- Frobenius: the larger root always gives a series solution; the smaller one does too unless the roots differ by an integer, when a $\ln x$ term may appear (and always does for equal roots) ([[#thm-frobenius]]).
- Bessel's equation has solutions $J_{\pm\nu}$ built with the Gamma function; $J_{1/2} = \sqrt{2/(\pi x)}\sin x$; for integer orders the second solution $Y_n$ is unbounded at $0$; $J_0' = -J_1$.
:::

## Exercises

::: exercise A recurrence that sums {level=1 check="exp(1/2)"}
Solve $y'' - xy' - y = 0$, $y(0) = 1$, $y'(0) = 0$ by power series, identify the sum, and give $y(1)$.
::: solution
With $y = \sum a_nx^n$: $\sum(n+2)(n+1)a_{n+2}x^n - \sum na_nx^n - \sum a_nx^n = 0$, so $a_{n+2} = \frac{(n+1)a_n}{(n+2)(n+1)} = \frac{a_n}{n+2}$. With $a_0 = 1$, $a_1 = 0$: $a_{2k} = \frac{1}{2\cdot4\cdots(2k)} = \frac{1}{2^kk!}$ and all odd coefficients vanish. Hence $y = \sum\frac{(x^2/2)^k}{k!} = e^{x^2/2}$ and $y(1) = e^{1/2} = \sqrt e$.
:::
:::

::: exercise Classifying singular points {level=1}
Find and classify the singular points of $x(x - 1)^2y'' + y' + y = 0$.
::: solution
$P = x(x-1)^2$ vanishes at $0$ and $1$. In standard form $p = q = \frac{1}{x(x-1)^2}$. At $x = 0$: $xp = \frac{1}{(x-1)^2}$ and $x^2q = \frac{x}{(x-1)^2}$ are analytic at $0$, so $0$ is a regular singular point. At $x = 1$: $(x-1)p = \frac{1}{x(x-1)}$ is not analytic at $1$, so $1$ is an irregular singular point.
:::
:::

::: exercise Indicial roots {level=1 check="1/3"}
Find the indicial roots of $x^2y'' + xy' + \bigl(x^2 - \frac19\bigr)y = 0$ at $x = 0$. What is the larger one, and what does [[#thm-frobenius]] say about a second solution?
::: solution
$p_0 = 1$, $q_0 = -\frac19$, so $F(r) = r^2 - \frac19$ and $r = \pm\frac13$. The larger root is $\frac13$. The difference $\frac23$ is not an integer, so there are two Frobenius series solutions: these are $J_{1/3}$ and $J_{-1/3}$ (Bessel's equation with $\nu = \frac13$).
:::
:::

::: exercise A guaranteed radius {level=2 check="sqrt(5)"}
Without solving, give a lower bound for the radius of convergence of power series solutions of $(x^2 + 4)y'' + xy' + y = 0$ about $x_0 = 1$.
::: solution
$p = \frac{x}{x^2+4}$ and $q = \frac{1}{x^2+4}$ are analytic except at the complex zeros $\pm2i$ of $x^2 + 4$. The distance from $1$ to $\pm2i$ is $\sqrt{1 + 4} = \sqrt5$, so by [[#thm-ordinary]] the series converge at least for $\lvert x - 1\rvert < \sqrt5$.
:::
:::

::: exercise A Legendre polynomial {level=2 check="-7/16"}
Use the recurrence [[#eq-legendre-recurrence]] to find $P_3$, and evaluate $P_3(1/2)$.
::: solution
With $\alpha = 3$ and the odd chain: $a_3 = -\frac{(3-1)(3+2)}{3\cdot2}a_1 = -\frac53a_1$ and $a_5 = 0$. So the polynomial is $a_1\bigl(x - \frac53x^3\bigr)$; normalising $P_3(1) = 1$ requires $a_1\bigl(1 - \frac53\bigr) = 1$, i.e. $a_1 = -\frac32$, giving $P_3 = \frac12(5x^3 - 3x)$. Then $P_3(\frac12) = \frac12\bigl(\frac58 - \frac32\bigr) = -\frac{7}{16}$.
:::
:::

::: exercise Roots differing by an integer {level=2}
Show that $0$ is a regular singular point of $xy'' + 2y' + xy = 0$, find the indicial roots, and find two independent solutions in closed form.
::: hint
Run the recurrence for both roots; for the smaller one, check whether the problematic step really is a problem.
:::
::: solution
Multiplying by $x$: $x^2y'' + 2xy' + x^2y = 0$, so $\tilde p = 2$, $\tilde q = x^2$, $p_0 = 2$, $q_0 = 0$, and $F(r) = r(r-1) + 2r = r(r + 1)$: roots $0$ and $-1$, differing by $1$. Substituting $y = \sum a_nx^{n+r}$ gives $F(n + r)a_n + a_{n-2} = 0$ for $n\ge2$ and $F(1 + r)a_1 = 0$.

For $r = 0$: $F(1) = 2\neq0$ so $a_1 = 0$, and $a_n = -\frac{a_{n-2}}{n(n+1)}$, giving $1 - \frac{x^2}{3!} + \frac{x^4}{5!} - \cdots = \frac{\sin x}{x}$.

For $r = -1$: $F(0) = 0$, so the condition at $n = 1$ is $0\cdot a_1 = 0$, which holds for any $a_1$ — the obstruction is absent and no logarithm appears. Taking $a_1 = 0$, $a_n = -\frac{a_{n-2}}{n(n-1)}$ gives $x^{-1}\bigl(1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \cdots\bigr) = \frac{\cos x}{x}$.

So $y = c_1\frac{\sin x}{x} + c_2\frac{\cos x}{x}$ for $x > 0$, an instance of case 4 of [[#thm-frobenius]] with $C = 0$.
:::
:::

::: exercise Hermite polynomials {level=2 check="-4"}
The **Hermite equation** $y'' - 2xy' + 2\lambda y = 0$ arises for the quantum harmonic oscillator. Show that it has a polynomial solution of degree $n$ when $\lambda = n$, find it for $n = 3$, and evaluate at $x = 1$ the multiple $H_3$ of this solution whose leading coefficient is $2^3 = 8$.
::: solution
With $y = \sum a_kx^k$: $(k+2)(k+1)a_{k+2} - 2ka_k + 2\lambda a_k = 0$, so $a_{k+2} = \frac{2(k - \lambda)}{(k+2)(k+1)}a_k$. If $\lambda = n$, the chain through $a_n$ stops at degree $n$. For $n = 3$ (odd chain, $a_1 = 1$): $a_3 = \frac{2(1-3)}{3\cdot2} = -\frac23$, $a_5 = 0$, so $y = x - \frac23x^3$. The multiple with leading coefficient $8$ is $H_3 = -12\bigl(x - \frac23x^3\bigr) = 8x^3 - 12x$, and $H_3(1) = -4$.
:::
:::

::: exercise A Bessel identity {level=3}
Prove the second identity of [[#thm-bessel-recurrence]], $\frac{d}{dx}\bigl(x^{-\nu}J_\nu(x)\bigr) = -x^{-\nu}J_{\nu+1}(x)$, and deduce from the two identities that $J_{\nu-1} + J_{\nu+1} = \frac{2\nu}{x}J_\nu$.
::: solution
From [[#eq-bessel-series]], $x^{-\nu}J_\nu = \sum_{k\ge0}\frac{(-1)^kx^{2k}}{2^{2k+\nu}k!\,\Gamma(k+\nu+1)}$. The $k = 0$ term is constant. Differentiating, using $\frac{2k}{k!} = \frac{2}{(k-1)!}$ and putting $k = j + 1$:

$$
\frac{d}{dx}\bigl(x^{-\nu}J_\nu\bigr) = \sum_{j\ge0}\frac{(-1)^{j+1}x^{2j+1}}{2^{2j+\nu+1}j!\,\Gamma(j + \nu + 2)} = -x^{-\nu}\sum_{j\ge0}\frac{(-1)^j}{j!\,\Gamma(j + (\nu+1) + 1)}\left(\frac x2\right)^{2j + \nu + 1} = -x^{-\nu}J_{\nu+1}.
$$

Expanding both identities with the product rule: $\nu x^{\nu-1}J_\nu + x^\nu J_\nu' = x^\nu J_{\nu-1}$ and $-\nu x^{-\nu-1}J_\nu + x^{-\nu}J_\nu' = -x^{-\nu}J_{\nu+1}$. Dividing by $x^\nu$ and $x^{-\nu}$ respectively: $J_\nu' + \frac\nu xJ_\nu = J_{\nu-1}$ and $J_\nu' - \frac\nu xJ_\nu = -J_{\nu+1}$. Subtracting the second from the first gives $J_{\nu-1} + J_{\nu+1} = \frac{2\nu}{x}J_\nu$.
:::
:::

::: exercise Rodrigues' formula {level=3}
Let $u = (x^2 - 1)^n$ and $v = u^{(n)}$, the $n$th derivative. Show that $(x^2 - 1)u' = 2nxu$, differentiate this identity $n + 1$ times using Leibniz's rule, and deduce that $v$ solves Legendre's equation with $\alpha = n$. Then show $v(1) = 2^nn!$, which proves [[#eq-rodrigues]].
::: hint
Leibniz's rule: $(fg)^{(m)} = \sum_j\binom mjf^{(j)}g^{(m-j)}$. Only the first few terms survive when one factor is a polynomial of degree at most $2$.
:::
::: solution
$u' = 2nx(x^2 - 1)^{n-1}$, so $(x^2 - 1)u' = 2nxu$. Differentiate $n + 1$ times. On the left, $(x^2-1)$ has only three non-zero derivatives:

$$
\bigl((x^2-1)u'\bigr)^{(n+1)} = (x^2 - 1)u^{(n+2)} + (n+1)\,2x\,u^{(n+1)} + \binom{n+1}{2}\,2\,u^{(n)} .
$$

On the right, $\bigl(2nxu\bigr)^{(n+1)} = 2nx\,u^{(n+1)} + 2n(n+1)\,u^{(n)}$. Equating, with $v = u^{(n)}$:

$$
(x^2 - 1)v'' + 2(n+1)xv' + n(n+1)v = 2nxv' + 2n(n+1)v,
$$

that is $(x^2 - 1)v'' + 2xv' - n(n+1)v = 0$, or $(1 - x^2)v'' - 2xv' + n(n+1)v = 0$: Legendre's equation with $\alpha = n$. Since $v$ is a polynomial of degree $n$, it is a multiple of $P_n$ (the other solution is not a polynomial). To find the multiple, write $u = (x-1)^n(x+1)^n$ and apply Leibniz's rule: every term of $v = u^{(n)}$ contains a factor $(x-1)^{n-j}$ with $j < n$, except the one in which all $n$ derivatives fall on $(x-1)^n$, which is $n!\,(x+1)^n$. At $x = 1$ this gives $v(1) = n!\,2^n$. Hence $P_n = \frac{v}{2^nn!}$, which is [[#eq-rodrigues]].
:::
:::

::: exercise The cosine Bessel function {level=3}
Show that $J_{-1/2}(x) = \sqrt{\dfrac{2}{\pi x}}\cos x$, and verify directly that $J_{1/2}$ and $J_{-1/2}$ are independent solutions of Bessel's equation of order $\frac12$ on $x > 0$.
::: solution
In [[#eq-bessel-series]] with $\nu = -\frac12$ we need $\Gamma(k + \frac12)$. As in [[#ex-bessel-half]], $\Gamma(k + \frac12) = \frac{(2k)!}{4^kk!}\sqrt\pi$ (true for $k = 0$, and the ratio of consecutive right-hand sides is $\frac{(2k+2)(2k+1)}{4(k+1)} = k + \frac12$). Then

$$
\frac{(x/2)^{2k - 1/2}}{k!\,\Gamma(k + \frac12)} = \frac{x^{2k-1/2}}{2^{2k - 1/2}}\cdot\frac{4^k}{(2k)!\sqrt\pi} = \sqrt{\frac2\pi}\,x^{-1/2}\frac{x^{2k}}{(2k)!},
$$

and summing with signs $(-1)^k$ gives $\sqrt{\frac{2}{\pi x}}\cos x$.

For the verification, $y = x^{-1/2}\sin x$ gives $y' = x^{-1/2}\cos x - \frac12x^{-3/2}\sin x$ and $y'' = -x^{-1/2}\sin x - x^{-3/2}\cos x + \frac34x^{-5/2}\sin x$, so

$$
x^2y'' + xy' + \left(x^2 - \tfrac14\right)y = \left(-x^{3/2} + \tfrac34x^{-1/2} - \tfrac12x^{-1/2} + x^{3/2} - \tfrac14x^{-1/2}\right)\sin x + \bigl(-x^{1/2} + x^{1/2}\bigr)\cos x = 0,
$$

and the computation for $x^{-1/2}\cos x$ is identical with $\sin$ and $\cos$ exchanged (up to sign). They are independent because their ratio $\cot x$ is not constant; equivalently, $W[J_{1/2}, J_{-1/2}] = -\frac{2}{\pi x}\neq0$, consistent with Abel's identity ($p = 1/x$ gives $W = C/x$).
:::
:::
