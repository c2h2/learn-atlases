In his *Cours d'analyse* of 1821, Cauchy stated as a theorem that the sum of a convergent series of continuous functions is continuous. Five years later Abel pointed out that the Fourier series

$$
\sin x - \frac{\sin 2x}{2} + \frac{\sin 3x}{3} - \cdots
$$

converges for every $x$, has continuous terms, and yet its sum jumps at $x = \pi$: it equals $x/2$ for $-\pi < x < \pi$ but $0$ at $x = \pi$. Something was missing from Cauchy's argument, and it took two decades to say precisely what: the series converges at every point, but not at the same *rate* at every point. The missing hypothesis is **uniform convergence**.

This chapter is about sequences and series of functions $f_n\colon A \to \R$. The basic question is whether properties of the $f_n$ — continuity, integrals, derivatives — pass to the limit. Equivalently, it is about interchanging limits: is $\lim_n\lim_{x\to c}f_n(x) = \lim_{x\to c}\lim_n f_n(x)$? Is $\lim_n\int f_n = \int\lim_n f_n$? We will see that the naive notion of convergence answers "not necessarily" every time, and that uniform convergence answers "yes" (with a little more care for derivatives). The payoff is a rigorous theory of power series, a continuous function that is nowhere differentiable, and Weierstrass's theorem that every continuous function on $[a, b]$ is a uniform limit of polynomials.

## Pointwise convergence and its failures

::: definition Pointwise convergence {#def-pointwise}
A sequence of functions $f_n\colon A \to \R$ **converges pointwise** on $A$ to $f\colon A \to \R$ if $f_n(x) \to f(x)$ for every $x \in A$; that is, for every $x \in A$ and every $\eps > 0$ there is $N$ (depending on $x$ and $\eps$) such that $\abs{f_n(x) - f(x)} < \eps$ for all $n \ge N$.
:::

Pointwise convergence is just convergence of a separate sequence of numbers at each point. Three examples show how little it preserves.

::: example Three failures of pointwise convergence {#ex-failures}
Find the pointwise limits of (a) $f_n(x) = x^n$ on $[0, 1]$; (b) $h_n(x) = n^2xe^{-nx}$ on $[0, 1]$; (c) $d_n(x) = \dfrac{\sin(nx)}{\sqrt n}$ on $\R$. In each case decide whether continuity, integrals or derivatives survive in the limit.
::: solution
(a) For $0 \le x < 1$, $x^n \to 0$ ([[real-analysis/sequences#ex-standard]]); at $x = 1$, $1^n = 1$. So the limit is $f(x) = 0$ for $x < 1$ and $f(1) = 1$: each $f_n$ is continuous but $f$ is not. Equivalently, $\lim_{x\to1^-}\lim_n x^n = 0$ while $\lim_n\lim_{x\to1^-}x^n = 1$.

(b) $h_n(0) = 0$, and for $x > 0$, $h_n(x) = n^2xe^{-nx} \to 0$ because exponential decay beats polynomial growth. So the limit is $0$. But with $u = nx$,

$$
\int_0^1 h_n(x)\,dx = \int_0^n ue^{-u}\,du = 1 - (n+1)e^{-n} \to 1 \ne 0 = \int_0^1 0\,dx.
$$

The limit of the integrals is not the integral of the limit.

(c) $\abs{d_n(x)} \le 1/\sqrt n \to 0$, so $d_n \to 0$ — even uniformly, in the sense defined below. But $d_n'(x) = \sqrt n\cos(nx)$, and $d_n'(0) = \sqrt n \to \infty$: the derivatives do not converge to the derivative $0$ of the limit.
:::
:::

::: widget plot
f: x^n
x: 0, 1
y: -0.05, 1.1
sliders: n=1:1:60:1
labels: x^n
caption: The functions $x^n$ on $[0, 1]$. Increase $n$: at every fixed $x < 1$ the values fall to $0$, but ever more slowly as $x$ approaches $1$, and the graph always climbs back to $1$ at $x = 1$. Pick a level such as $\tfrac12$: for every $n$ there are points (near $1$) where $x^n > \tfrac12$. No single $N$ works for all $x$ at once — the convergence is not uniform, and the limit is discontinuous.
:::

## Uniform convergence

In example (a) the trouble is that the $N$ needed at a point $x$ grows without bound as $x \to 1$. Uniform convergence forbids this: one $N$ must serve every $x$.

::: definition Uniform convergence {#def-uniform}
A sequence $f_n\colon A \to \R$ **converges uniformly** on $A$ to $f$ if for every $\eps > 0$ there is $N$ such that

$$
\abs{f_n(x) - f(x)} < \eps \qquad\text{for all } n \ge N \text{ and all } x \in A.
$$

Equivalently, $\norm{f_n - f}_\infty \to 0$, where $\norm{g}_\infty = \sup_{x \in A}\abs{g(x)}$ is the **supremum norm**.
:::

The two definitions differ only in the order of quantifiers — "for every $\eps$ there is $N$ such that for all $x$" against "for every $x$ and $\eps$ there is $N$" — exactly as for uniform continuity ([[real-analysis/continuity#def-uniform-continuity]]). Geometrically, uniform convergence says that for $n \ge N$ the whole graph of $f_n$ lies in the tube of vertical half-width $\eps$ around the graph of $f$. Uniform convergence implies pointwise convergence, with the same limit.

To test uniform convergence, compute (or bound) $\norm{f_n - f}_\infty$. For $x^n$ on $[0, b]$ with $b < 1$, $\sup_{[0,b]}x^n = b^n \to 0$, so the convergence is uniform; on $[0, 1)$ the supremum is $1$ for every $n$, so it is not. For $h_n$ in (b), calculus gives the maximum at $x = 1/n$, so $\norm{h_n}_\infty = h_n(1/n) = n/e \to \infty$: not uniform either. As with sequences of numbers, there is a criterion that does not need the limit.

::: theorem Cauchy criterion for uniform convergence {#thm-uniform-cauchy}
A sequence $f_n\colon A \to \R$ converges uniformly on $A$ if and only if for every $\eps > 0$ there is $N$ such that $\abs{f_n(x) - f_m(x)} < \eps$ for all $m, n \ge N$ and all $x \in A$.
:::

::: proof
If $f_n \to f$ uniformly, choose $N$ with $\abs{f_n(x) - f(x)} < \eps/2$ for $n \ge N$ and all $x$; then $\abs{f_n(x) - f_m(x)} < \eps$ for $m, n \ge N$.

Conversely, assume the condition. For each fixed $x$, $(f_n(x))$ is a Cauchy sequence of numbers, so it converges ([[real-analysis/sequences#thm-cauchy]]); call the limit $f(x)$. Given $\eps > 0$, take $N$ from the condition. For $n \ge N$ and any $x \in A$, letting $m \to \infty$ in $\abs{f_n(x) - f_m(x)} < \eps$ gives $\abs{f_n(x) - f(x)} \le \eps$ ([[real-analysis/sequences#thm-order-limits]]). Since $N$ does not depend on $x$, the convergence is uniform.
:::

Now the theorems that make uniform convergence worth having.

::: theorem Uniform limits of continuous functions are continuous {#thm-uniform-continuous}
If each $f_n\colon A \to \R$ is continuous at $c \in A$ and $f_n \to f$ uniformly on $A$, then $f$ is continuous at $c$.
:::

::: proof
Let $\eps > 0$. Choose $N$ with $\abs{f_N(x) - f(x)} < \eps/3$ for all $x \in A$. Since $f_N$ is continuous at $c$, there is $\delta > 0$ with $\abs{f_N(x) - f_N(c)} < \eps/3$ whenever $x \in A$ and $\abs{x - c} < \delta$. For such $x$,

$$
\abs{f(x) - f(c)} \le \abs{f(x) - f_N(x)} + \abs{f_N(x) - f_N(c)} + \abs{f_N(c) - f(c)} < \frac\eps3 + \frac\eps3 + \frac\eps3 = \eps.
$$
:::

This is the "$\eps/3$ argument": go from $f(x)$ to $f(c)$ via $f_N$, using uniformity for the first and last steps and continuity of the single function $f_N$ for the middle one. Where does it need uniformity? In the first step: $\abs{f(x) - f_N(x)}$ must be small *for the $x$ we have not chosen yet*, so $N$ cannot depend on $x$. Read in reverse, the theorem is a test: since the limit of $x^n$ on $[0, 1]$ is discontinuous, the convergence cannot be uniform.

::: quiz
Let $f_n(x) = x/n$. On which domain does $f_n \to 0$ uniformly?
- [ ] On $\R$
- [x] On $[0, 1]$, but not on $\R$
- [ ] On neither, since the limit is continuous only on bounded sets
- [ ] On both, since $x/n \to 0$ for every $x$
::: solution
On $[0, 1]$, $\sup\abs{x/n} = 1/n \to 0$, so the convergence is uniform. On $\R$, $\sup_x\abs{x/n} = \infty$ for every $n$: however large $n$ is, $f_n(n) = 1$. Pointwise convergence everywhere does not imply uniform convergence, even when the limit is continuous.
:::
:::

::: theorem Integration of uniform limits {#thm-uniform-integral}
If each $f_n$ is Riemann integrable on $[a, b]$ and $f_n \to f$ uniformly on $[a, b]$, then $f$ is integrable and

$$
\lim_{n\to\infty}\int_a^b f_n = \int_a^b f.
$$
:::

::: proof
Let $\eps_n = \norm{f_n - f}_\infty \to 0$. Then $f_n - \eps_n \le f \le f_n + \eps_n$, so $f$ is bounded, and on every subinterval of any partition $P$ the supremum and infimum of $f$ are within $\eps_n$ of those of $f_n$. Hence

$$
U(f, P) - L(f, P) \le U(f_n, P) - L(f_n, P) + 2\eps_n(b - a).
$$

Given $\eps > 0$, fix $n$ with $2\eps_n(b - a) < \eps/2$, and then a partition $P$ with $U(f_n, P) - L(f_n, P) < \eps/2$ ([[real-analysis/riemann-integral#thm-riemann-criterion]]). Then $U(f, P) - L(f, P) < \eps$, so $f$ is integrable. Finally, by the properties of the integral ([[real-analysis/riemann-integral#thm-integral-properties]]),

$$
\Bigl\lvert\int_a^b f_n - \int_a^b f\Bigr\rvert \le \int_a^b\abs{f_n - f} \le \eps_n(b - a) \to 0.
$$
:::

::: widget plot
f: n^2*x*exp(-n*x)
x: 0, 1
y: 0, 8
sliders: n=1:1:20:1
labels: h_n(x) = n^2xe^{-nx}
caption: The bumps $h_n(x) = n^2xe^{-nx}$ of [[#ex-failures]]. As $n$ grows, each bump is taller ($n/e$ at $x = 1/n$) and narrower, and it slides towards $x = 0$. At every fixed $x > 0$ the values eventually die out, so $h_n \to 0$ pointwise; but the area under each bump stays close to $1$. The mass escapes up the vertical axis — which uniform convergence would forbid.
:::

Derivatives are more delicate. Uniform convergence of $f_n$ says nothing about $f_n'$ (example (c)); the right hypothesis is uniform convergence of the *derivatives*.

::: theorem Differentiation of limits {#thm-uniform-derivative}
Let each $f_n$ be differentiable on $[a, b]$. Suppose $(f_n')$ converges uniformly on $[a, b]$ to a function $g$, and $(f_n(x_0))$ converges for some $x_0 \in [a, b]$. Then $(f_n)$ converges uniformly on $[a, b]$ to a differentiable function $f$, and $f' = g$.
:::

::: proof
*Uniform convergence of $(f_n)$.* For any $m, n$ the function $f_n - f_m$ is differentiable, so by the mean value theorem ([[real-analysis/differentiation#thm-mvt]]), for all $x, y \in [a, b]$,

$$
\bigl\lvert(f_n - f_m)(x) - (f_n - f_m)(y)\bigr\rvert \le \norm{f_n' - f_m'}_\infty\,\abs{x - y}.
$$ {#eq-mvt-diff}

Taking $y = x_0$: $\abs{f_n(x) - f_m(x)} \le \abs{f_n(x_0) - f_m(x_0)} + (b - a)\norm{f_n' - f_m'}_\infty$. Both terms are small for large $m, n$ (the first because $(f_n(x_0))$ converges, the second by [[#thm-uniform-cauchy]] applied to $f_n'$), uniformly in $x$. So $(f_n)$ converges uniformly, by [[#thm-uniform-cauchy]], to some $f$.

*The derivative.* Fix $c \in [a, b]$, and for $x \ne c$ put

$$
\varphi_n(x) = \frac{f_n(x) - f_n(c)}{x - c}, \qquad \varphi(x) = \frac{f(x) - f(c)}{x - c}.
$$

Then $\varphi_n \to \varphi$ pointwise on $[a,b]\setminus\set{c}$, and [[#eq-mvt-diff]] with $y = c$ gives $\abs{\varphi_n(x) - \varphi_m(x)} \le \norm{f_n' - f_m'}_\infty$; letting $m \to\infty$, $\abs{\varphi_n(x) - \varphi(x)} \le \sup_{m\ge n}\norm{f_n' - f_m'}_\infty$, which tends to $0$ as $n\to\infty$ independently of $x$. Let $\eps > 0$. Choose $N$ with $\abs{\varphi_N(x) - \varphi(x)} < \eps/3$ for all $x \ne c$ and $\abs{f_N'(c) - g(c)} < \eps/3$. Since $\varphi_N(x) \to f_N'(c)$ as $x \to c$, there is $\delta > 0$ with $\abs{\varphi_N(x) - f_N'(c)} < \eps/3$ for $0 < \abs{x - c} < \delta$. For such $x$,

$$
\abs{\varphi(x) - g(c)} \le \abs{\varphi(x) - \varphi_N(x)} + \abs{\varphi_N(x) - f_N'(c)} + \abs{f_N'(c) - g(c)} < \eps.
$$

So $\varphi(x) \to g(c)$ as $x \to c$: $f$ is differentiable at $c$ with $f'(c) = g(c)$.
:::

If the $f_n'$ are continuous there is a shorter route: $f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'$ by the fundamental theorem of calculus, and [[#thm-uniform-integral]] lets us pass to the limit. The proof above avoids that assumption.

::: example Uniform convergence does not control derivatives {#ex-derivative-limit}
Let $f_n(x) = \dfrac{x}{1 + nx^2}$ on $\R$. Show that $f_n \to 0$ uniformly and that $f_n'(x)$ converges for every $x$, but that $\lim_n f_n'(0) \ne 0$. Which hypothesis of [[#thm-uniform-derivative]] fails?
::: solution
For $x \ne 0$ the AM–GM inequality gives $1 + nx^2 \ge 2\sqrt n\,\abs x$, so $\abs{f_n(x)} \le \frac{1}{2\sqrt n}$, with equality at $x = \pm1/\sqrt n$; and $f_n(0) = 0$. Hence $\norm{f_n}_\infty = \frac{1}{2\sqrt n} \to 0$: the convergence is uniform, to $f = 0$.

The derivatives are $f_n'(x) = \dfrac{1 - nx^2}{(1 + nx^2)^2}$. At $x = 0$, $f_n'(0) = 1$ for every $n$. For $x \ne 0$, $\abs{f_n'(x)} \le \dfrac{1 + nx^2}{(1 + nx^2)^2} = \dfrac{1}{1 + nx^2} \to 0$. So $f_n' \to g$ pointwise, where $g(0) = 1$ and $g(x) = 0$ otherwise — but $f' = 0$, and $f'(0) = 0 \ne 1 = g(0)$.

The failing hypothesis is the *uniform* convergence of $(f_n')$: its limit $g$ is discontinuous at $0$, so by [[#thm-uniform-continuous]] the continuous functions $f_n'$ cannot converge uniformly on any interval containing $0$. Away from $0$, on $[\delta, \infty)$, they do converge uniformly, and there $f' = g = 0$ as the theorem predicts.
:::
:::

::: warning Uniform convergence of the functions is not enough
In [[#ex-failures]](c), $d_n \to 0$ uniformly on $\R$ but $d_n'(0) = \sqrt n$ diverges. Uniform closeness of graphs says nothing about their slopes: a function can be uniformly tiny and wiggle violently. For derivatives you must check the convergence of $(f_n')$.
:::

## Series of functions and the M-test

A series $\sum_n f_n$ of functions **converges uniformly** on $A$ if its partial sums $S_N = \sum_{n=1}^N f_n$ do. Each theorem above has a series version: a uniformly convergent series of continuous functions has a continuous sum, and a uniformly convergent series of integrable functions can be integrated term by term. The standard way to prove uniform convergence of a series is to compare it with a convergent series of numbers.

::: theorem Weierstrass M-test {#thm-m-test}
Let $f_n\colon A \to \R$ and suppose there are constants $M_n$ with $\abs{f_n(x)} \le M_n$ for all $x \in A$ and $\sum_n M_n < \infty$. Then $\sum_n f_n$ converges absolutely and uniformly on $A$.
:::

::: proof
For each $x$, $\sum\abs{f_n(x)}$ converges by comparison with $\sum M_n$. For uniformity, let $\eps > 0$ and use the Cauchy criterion for $\sum M_n$ ([[real-analysis/series#thm-cauchy-series]]) to choose $N$ with $\sum_{k=m+1}^n M_k < \eps$ for $n > m \ge N$. Then for all $x \in A$,

$$
\abs{S_n(x) - S_m(x)} = \Bigl\lvert\sum_{k=m+1}^n f_k(x)\Bigr\rvert \le \sum_{k=m+1}^n M_k < \eps,
$$

and [[#thm-uniform-cauchy]] gives uniform convergence.
:::

The M-test produces one of the most surprising objects in analysis. Fix $0 < a < 1$ and an odd integer $b \ge 3$, and let

$$
W(x) = \sum_{k=0}^\infty a^k\cos(b^k\pi x).
$$ {#eq-weierstrass}

Each term is continuous and bounded by $M_k = a^k$, and $\sum a^k$ converges, so the series converges uniformly and $W$ is **continuous on $\R$** by [[#thm-uniform-continuous]]. Weierstrass proved in 1872 that if $ab > 1 + \frac{3\pi}{2}$, then $W$ is **differentiable at no point**; G. H. Hardy showed in 1916 that $ab \ge 1$ suffices. The proof that $W$ has no derivative is longer than we can give here (a proof for a closely related function is in Abbott, *Understanding Analysis*, section 5.4), but the idea is visible: the $k$-th term has slope of order $(ab)^k$, so when $ab \ge 1$ the wiggles of the later terms are too steep to cancel.

::: widget plot
f: sum(cos(3^k*pi*x)/2^k, k, 0, N)
x: -1, 1
y: -2.2, 2.2
sliders: N=4:0:8:1
labels: \sum_{k=0}^{N}2^{-k}\cos(3^k\pi x)
caption: Partial sums of Weierstrass's function with $a = \tfrac12$, $b = 3$ (here $ab = \tfrac32 \ge 1$). Increase $N$: each new term adds wiggles three times as fast and half as tall. The partial sums converge uniformly (the M-test with $M_k = 2^{-k}$), so the limit is continuous; but every added term makes the graph steeper at more and more points, and the limit has a tangent nowhere.
:::

::: example A series integrated term by term {#ex-term-by-term}
Show that $F(x) = \displaystyle\sum_{n=1}^\infty\frac{\cos(nx)}{n^2}$ is continuous on $\R$, and compute $\displaystyle\int_0^{\pi/2}F(x)\,dx$ as a series.
::: solution
$\abs{\cos(nx)/n^2} \le 1/n^2$ and $\sum 1/n^2$ converges, so by the M-test the series converges uniformly on $\R$, and $F$ is continuous. By [[#thm-uniform-integral]] applied to the partial sums, we may integrate term by term:

$$
\int_0^{\pi/2}F(x)\,dx = \sum_{n=1}^\infty\frac{1}{n^2}\int_0^{\pi/2}\cos(nx)\,dx = \sum_{n=1}^\infty\frac{\sin(n\pi/2)}{n^3} = 1 - \frac{1}{3^3} + \frac{1}{5^3} - \frac{1}{7^3} + \cdots,
$$

since $\sin(n\pi/2)$ is $0$ for even $n$ and alternates $1, -1$ for odd $n$. (This sum equals $\pi^3/32$, a value obtainable from Fourier series.) Differentiating term by term would be illegitimate, by contrast: the derived series $-\sum\frac{\sin nx}{n}$ does not converge uniformly on any interval containing a multiple of $2\pi$, since its sum jumps there.
:::
:::

## Power series

A **power series** about $a$ is a series $\sum_{n=0}^\infty c_n(x - a)^n$. Its behaviour is governed by a single number.

::: theorem Cauchy–Hadamard theorem {#thm-cauchy-hadamard}
Let $R = 1\big/\limsup_{n\to\infty}\abs{c_n}^{1/n}$, with the conventions $1/0 = \infty$ and $1/\infty = 0$. Then the power series $\sum c_n(x - a)^n$

1. converges absolutely if $\abs{x - a} < R$ and diverges if $\abs{x - a} > R$;
2. converges uniformly on $[a - r, a + r]$ for every $0 < r < R$.

$R$ is called the **radius of convergence**.
:::

::: proof
(1) Apply the root test ([[real-analysis/series#thm-root]]) to the terms $c_n(x - a)^n$: $\limsup\abs{c_n(x - a)^n}^{1/n} = \abs{x - a}\limsup\abs{c_n}^{1/n} = \abs{x - a}/R$, which is less than $1$ when $\abs{x - a} < R$ and greater than $1$ when $\abs{x - a} > R$.

(2) For $\abs{x - a} \le r$ we have $\abs{c_n(x - a)^n} \le \abs{c_n}r^n = M_n$, and $\sum M_n$ converges by part (1) applied at the point $x = a + r$, since $r < R$. The M-test gives uniform convergence.
:::

At $\abs{x - a} = R$ anything can happen: $\sum x^n$ diverges at both $x = \pm1$, $\sum x^n/n$ converges at $-1$ only, and $\sum x^n/n^2$ at both. And convergence is uniform on closed subintervals of $(a - R, a + R)$, but not necessarily on the whole open interval ($\sum x^n$ on $(-1, 1)$ is unbounded). This is enough for the main theorem.

::: theorem Power series are smooth {#thm-power-series}
Let $\sum c_n(x - a)^n$ have radius of convergence $R > 0$, and let $f(x)$ be its sum for $\abs{x - a} < R$. Then $f$ is differentiable on $(a - R, a + R)$, and

$$
f'(x) = \sum_{n=1}^\infty nc_n(x - a)^{n-1},
$$

a power series with the same radius $R$. Consequently $f$ has derivatives of all orders, $c_n = f^{(n)}(a)/n!$, and $\int_a^x f = \sum_{n\ge0}\frac{c_n}{n+1}(x - a)^{n+1}$ for $\abs{x - a} < R$.
:::

::: proof
*Same radius.* The derived series $\sum nc_n(x - a)^{n-1}$ converges at $x$ exactly when $\sum nc_n(x-a)^n$ does (multiply by the non-zero number $x - a$), so its radius is $1/\limsup(n\abs{c_n})^{1/n}$. Since $n^{1/n} \to 1$, for every $\eps > 0$ we have $1 \le n^{1/n} < 1 + \eps$ for large $n$, so $\abs{c_n}^{1/n} \le (n\abs{c_n})^{1/n} \le (1 + \eps)\abs{c_n}^{1/n}$ eventually, and the upper limits agree.

*Differentiation.* Let $\abs{x_1 - a} < R$ and choose $r$ with $\abs{x_1 - a} < r < R$. On $[a - r, a + r]$ the partial sums $S_N$ of the series for $f$ are polynomials, their derivatives $S_N'$ are the partial sums of the derived series, which converge uniformly there by [[#thm-cauchy-hadamard]], and $S_N(a) = c_0$ converges. By [[#thm-uniform-derivative]], $f$ is differentiable on $[a - r, a + r]$ — in particular at $x_1$ — with $f' = \lim S_N'$.

*Consequences.* Applying this repeatedly, $f$ has derivatives of all orders, each given by a power series with radius $R$; evaluating $f^{(n)}(a)$ term by term leaves only $n!\,c_n$. Finally, $\sum\frac{c_n}{n+1}(x-a)^{n+1}$ has radius $R$ (by the same argument) and derivative $f$, and vanishes at $a$, so it equals $\int_a^x f$ by the fundamental theorem of calculus.
:::

So inside its interval of convergence a power series can be differentiated and integrated term by term, and it is the Taylor series of its own sum. In particular the function $e^{-1/x^2}$ of [[real-analysis/differentiation#ex-flat]] is not given by any power series about $0$.

::: example The logarithmic series {#ex-log-series}
Prove that $\ln(1 + x) = \displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}x^n$ for $\abs{x} < 1$.
::: solution
The series has radius $1$, since $\abs{(-1)^{n+1}/n}^{1/n} = 1/n^{1/n} \to 1$. Let $g(x)$ be its sum. By [[#thm-power-series]], for $\abs x < 1$,

$$
g'(x) = \sum_{n=1}^\infty(-1)^{n+1}x^{n-1} = 1 - x + x^2 - \cdots = \frac{1}{1 + x},
$$

a geometric series. So $g(x) - \ln(1 + x)$ has derivative $0$ on $(-1, 1)$ and vanishes at $x = 0$; by [[real-analysis/differentiation#cor-monotone]] it is identically $0$. At $x = 1$ the series still converges (by the alternating series test), and a theorem of Abel shows that the sum is then the limit of $g(x)$ as $x \to 1^-$, namely $\ln 2$ — in agreement with [[real-analysis/series#exr-3-6]].
:::
:::

::: quiz
The power series $\sum_{n\ge0}(-1)^n x^{2n}$ represents $\frac{1}{1 + x^2}$, a function that is smooth on all of $\R$. What is its radius of convergence?
- [ ] $\infty$, because $\frac{1}{1+x^2}$ is smooth everywhere
- [x] $1$
- [ ] $\tfrac12$
- [ ] $0$
::: solution
The coefficients are $c_{2n} = (-1)^n$ and $c_{2n+1} = 0$, so $\limsup\abs{c_k}^{1/k} = 1$ and $R = 1$; indeed the terms do not tend to $0$ when $\abs x \ge 1$. The real function gives no warning of this. The explanation lives in the complex plane: $\frac{1}{1 + z^2}$ blows up at $z = \pm i$, at distance $1$ from $0$, and the radius of convergence is the distance to the nearest complex singularity ([[complex-analysis/laurent-series]]).
:::
:::

## The Weierstrass approximation theorem

Power series are very special continuous functions. Remarkably, polynomials — the simplest functions of all — can approximate *every* continuous function on a closed bounded interval, uniformly.

::: theorem Weierstrass approximation theorem {#thm-weierstrass-approx}
If $f\colon [a, b] \to \R$ is continuous, then for every $\eps > 0$ there is a polynomial $p$ with $\abs{f(x) - p(x)} < \eps$ for all $x \in [a, b]$.
:::

::: proof
The substitution $x = a + (b - a)t$ maps $[0, 1]$ onto $[a, b]$ and turns polynomials in $t$ into polynomials in $x$, so we may assume $[a, b] = [0, 1]$. We use the **Bernstein polynomials**

$$
B_nf(x) = \sum_{k=0}^n f\Bigl(\frac kn\Bigr)b_{n,k}(x), \qquad b_{n,k}(x) = \binom nk x^k(1 - x)^{n-k}.
$$

*Three identities.* By the binomial theorem, $\sum_k b_{n,k}(x) = (x + (1 - x))^n = 1$. Differentiating $(x + y)^n = \sum_k\binom nk x^ky^{n-k}$ with respect to $x$ once and twice, multiplying by $x$ and $x^2$, and then putting $y = 1 - x$, gives $\sum_k k\,b_{n,k}(x) = nx$ and $\sum_k k(k-1)b_{n,k}(x) = n(n-1)x^2$. Combining the three,

$$
\sum_{k=0}^n\Bigl(\frac kn - x\Bigr)^2b_{n,k}(x) = \frac{x(1 - x)}{n} \le \frac{1}{4n}.
$$ {#eq-bernstein-variance}

*The estimate.* $f$ is bounded, say $\abs f \le M$, and uniformly continuous ([[real-analysis/continuity#thm-heine-cantor]]). Let $\eps > 0$ and choose $\delta > 0$ such that $\abs{s - t} < \delta$ implies $\abs{f(s) - f(t)} < \eps/2$. Fix $x \in [0, 1]$. Since the $b_{n,k}(x)$ are non-negative and sum to $1$,

$$
\abs{B_nf(x) - f(x)} = \Bigl\lvert\sum_{k=0}^n\Bigl(f\bigl(\tfrac kn\bigr) - f(x)\Bigr)b_{n,k}(x)\Bigr\rvert \le \sum_{k=0}^n\Bigl\lvert f\bigl(\tfrac kn\bigr) - f(x)\Bigr\rvert\,b_{n,k}(x).
$$

Split the sum. Terms with $\abs{k/n - x} < \delta$ contribute less than $\frac\eps2\sum_k b_{n,k}(x) = \frac\eps2$. In the remaining terms $\abs{f(k/n) - f(x)} \le 2M$ and $1 \le (k/n - x)^2/\delta^2$, so by [[#eq-bernstein-variance]] they contribute at most

$$
2M\sum_{k}\frac{(k/n - x)^2}{\delta^2}\,b_{n,k}(x) \le \frac{2M}{4n\delta^2} = \frac{M}{2n\delta^2}.
$$

This is less than $\eps/2$ once $n > M/(\eps\delta^2)$, a condition that does not depend on $x$. For such $n$, $\abs{B_nf(x) - f(x)} < \eps$ for every $x \in [0, 1]$.
:::

The proof has a probabilistic reading: $B_nf(x)$ is the expected value of $f(S_n/n)$, where $S_n$ counts successes in $n$ independent trials with success probability $x$, and [[#eq-bernstein-variance]] is the variance of $S_n/n$. The estimate is Chebyshev's inequality in disguise, and the theorem is a weak law of large numbers ([[probability/limit-theorems]]).

::: widget plot
f: sum(abs(k/n - 1/2)*binom(n, k)*x^k*(1 - x)^(n - k), k, 0, n); abs(x - 1/2)
x: 0, 1
y: 0, 0.55
sliders: n=10:1:60:1
labels: B_n f; f(x) = \lvert x - \tfrac12\rvert
caption: Bernstein polynomials of the corner function $\lvert x - \tfrac12\rvert$. Increase $n$: the polynomials creep up on the graph uniformly, though slowly — at the corner the error is still about $0.4/\sqrt n$. Weierstrass's theorem promises uniform approximation of every continuous function, corners and all; it says nothing about speed.
:::

::: history
Cauchy's *Cours d'analyse* (1821) claimed that a convergent series of continuous functions has a continuous sum, and Niels Henrik Abel gave the counterexample $\sum(-1)^{n+1}\sin(nx)/n$ in 1826. In 1847 Philipp Ludwig von Seidel and George Gabriel Stokes independently located the gap: convergence that becomes arbitrarily slow near a point. The concept of uniform convergence appears in work of Christoph Gudermann from 1838, and his student Karl Weierstrass made it central to analysis in his Berlin lectures. Weierstrass presented his continuous nowhere-differentiable function to the Berlin Academy in 1872 and proved the approximation theorem in 1885. Sergei Bernstein gave the probabilistic proof with the polynomials named after him in 1912, and G. H. Hardy extended Weierstrass's non-differentiability result in 1916.
:::

## Where this leads

Uniform convergence is convergence in the supremum norm, and in [[real-analysis/metric-spaces]] it becomes convergence in the metric space $C[a, b]$; [[#thm-uniform-cauchy]] says that this space is complete, which is the key to the contraction mapping theorem and to existence theorems for differential equations ([[ode/existence-uniqueness]]). Fourier series ([[pde/fourier-series]]) rarely converge uniformly — Abel's example jumps — and need weaker notions of convergence. Measure theory provides them: in [[measure-theory/lebesgue-integral]] the monotone and dominated convergence theorems allow limits and integrals to be exchanged under hypotheses far weaker than uniform convergence, and [[measure-theory/lp-spaces]] compares the many ways in which functions can converge. In the complex plane power series are even better behaved: [[complex-analysis/analytic-functions]] shows that a complex differentiable function is always the sum of its Taylor series.

::: summary
- Pointwise convergence ($f_n(x) \to f(x)$ at each $x$) does not preserve continuity ($x^n$), integrals (escaping bumps) or derivatives ($\sin(nx)/\sqrt n$).
- Uniform convergence: $\sup_x\abs{f_n(x) - f(x)} \to 0$ — one $N$ for all $x$ ([[#def-uniform]]); there is a Cauchy criterion ([[#thm-uniform-cauchy]]).
- Uniform limits of continuous functions are continuous (the $\eps/3$ argument, [[#thm-uniform-continuous]]); integrals of uniform limits are limits of integrals.
- For derivatives, require uniform convergence of $f_n'$ and convergence at one point ([[#thm-uniform-derivative]]).
- Weierstrass M-test: $\abs{f_n} \le M_n$ with $\sum M_n < \infty$ gives uniform convergence; it shows Weierstrass's nowhere-differentiable function is continuous.
- A power series converges absolutely inside its radius $R = 1/\limsup\abs{c_n}^{1/n}$, uniformly on smaller closed intervals, and can be differentiated and integrated term by term there.
- Every continuous function on $[a, b]$ is a uniform limit of polynomials (Weierstrass), for instance of its Bernstein polynomials.
:::

## Exercises

::: exercise Uniform convergence without convergence of derivatives {level=1}
Show that $f_n(x) = \dfrac{\sin(nx)}{n}$ converges uniformly to $0$ on $\R$, but that $f_n'(0) \not\to 0$ and that $(f_n'(\pi))$ does not converge.
::: solution
$\abs{f_n(x)} \le 1/n$ for all $x$, so $\norm{f_n}_\infty \le 1/n \to 0$. But $f_n'(x) = \cos(nx)$, and $f_n'(0) = 1$ for every $n$, which does not tend to the derivative $0$ of the limit function. (At $x = \pi$, $f_n'(\pi) = (-1)^n$ does not converge at all.)
:::
:::

::: exercise A radius of convergence {level=1 check="3"}
Find the radius of convergence of $\displaystyle\sum_{n=1}^\infty\frac{n^2}{3^n}x^n$.
::: solution
$\abs{c_n}^{1/n} = \frac{(n^{1/n})^2}{3} \to \frac13$, since $n^{1/n} \to 1$. By [[#thm-cauchy-hadamard]], $R = 3$. (The ratio test gives the same: $\frac{c_{n+1}}{c_n} = \frac{(n+1)^2}{3n^2} \to \frac13$.)
:::
:::

::: exercise Bounded versus unbounded domains {level=1}
Let $f_n(x) = \dfrac{x^2}{n}$. Show that $f_n \to 0$ uniformly on $[-5, 5]$ but not on $\R$.
::: solution
On $[-5, 5]$, $\sup\abs{f_n} = 25/n \to 0$. On $\R$, $f_n(\sqrt n) = 1$ for every $n$, so $\norm{f_n}_\infty \ge 1$ (in fact it is infinite) and the convergence is not uniform, though $f_n(x) \to 0$ for each $x$.
:::
:::

::: exercise A moving peak {level=2}
Let $f_n(x) = \dfrac{nx}{1 + n^2x^2}$ on $[0, 1]$. Find the pointwise limit, and show that the convergence is not uniform on $[0, 1]$ but is uniform on $[\delta, 1]$ for each $\delta > 0$.
::: solution
$f_n(0) = 0$, and for $x > 0$, $f_n(x) \le \frac{nx}{n^2x^2} = \frac{1}{nx} \to 0$. So $f_n \to 0$ pointwise. But $f_n(1/n) = \frac{1}{2}$ for every $n$, so $\norm{f_n}_\infty \ge \frac12$ and the convergence is not uniform. On $[\delta, 1]$, the same bound gives $\sup\abs{f_n} \le \frac{1}{n\delta} \to 0$, so the convergence is uniform there. (The peak, at $x = 1/n$, runs into the corner $x = 0$.)
:::
:::

::: exercise Differentiating a series {level=2 check="2"}
Use term-by-term differentiation of the geometric series to find $\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$.
::: hint
For $\abs x < 1$, $\sum_{n\ge0}x^n = \frac{1}{1-x}$; differentiate and multiply by $x$.
:::
::: solution
By [[#thm-power-series]], differentiating $\sum_{n\ge0}x^n = \frac1{1-x}$ on $(-1, 1)$ gives $\sum_{n\ge1}nx^{n-1} = \frac{1}{(1-x)^2}$, so $\sum_{n\ge1}nx^n = \frac{x}{(1-x)^2}$. At $x = \frac12$ this is $\frac{1/2}{1/4} = 2$.
:::
:::

::: exercise A continuous function given by a series {level=2}
Show that $f(x) = \displaystyle\sum_{n=1}^\infty\frac{\sin(nx)}{n^2}$ is continuous on $\R$, and that $\displaystyle\int_0^\pi f(x)\,dx = \sum_{k=1}^\infty\frac{2}{(2k-1)^3}$.
::: solution
The terms are bounded by $1/n^2$, so the M-test gives uniform convergence on $\R$ and $f$ is continuous by [[#thm-uniform-continuous]]. By [[#thm-uniform-integral]] we may integrate term by term on $[0, \pi]$:

$$
\int_0^\pi\frac{\sin(nx)}{n^2}\,dx = \frac{1 - \cos(n\pi)}{n^3} = \begin{cases}2/n^3 & n \text{ odd},\\ 0 & n\text{ even},\end{cases}
$$

so $\int_0^\pi f = \sum_{k\ge1}\frac{2}{(2k-1)^3}$.
:::
:::

::: exercise Dini's theorem {level=3}
Let $f_n\colon [a, b] \to \R$ be continuous, with $f_1(x) \ge f_2(x) \ge f_3(x) \ge \cdots$ for every $x$ and $f_n(x) \to 0$ for every $x$. Prove that $f_n \to 0$ uniformly on $[a, b]$.
::: hint
Argue by contradiction: if $\sup f_n \ge \eps$ for all $n$, pick $x_n$ with $f_n(x_n) \ge \eps$ and use Bolzano–Weierstrass together with monotonicity in $n$.
:::
::: solution
Note $f_n \ge 0$ (a decreasing sequence with limit $0$ stays above $0$), so $\norm{f_n}_\infty = \sup f_n$, which decreases with $n$. Suppose it does not tend to $0$: then there is $\eps > 0$ with $\sup f_n \ge \eps$ for all $n$, and since $f_n$ is continuous on $[a,b]$ the supremum is attained ([[real-analysis/continuity#thm-evt]]): $f_n(x_n) \ge \eps$ for some $x_n$. By Bolzano–Weierstrass a subsequence $x_{n_j} \to c \in [a, b]$. Fix any $m$. For $n_j \ge m$, monotonicity gives $f_m(x_{n_j}) \ge f_{n_j}(x_{n_j}) \ge \eps$, and letting $j \to \infty$, continuity of $f_m$ gives $f_m(c) \ge \eps$. This holds for every $m$, contradicting $f_m(c) \to 0$. Hence $f_n \to 0$ uniformly. (The functions $x^n$ on $[0, 1)$ show that compactness of the domain is needed; on $[0,1]$ the limit is not $0$ at $x = 1$.)
:::
:::

::: exercise Uniform limits of polynomials on the line {level=3}
Let $p_n$ be polynomials converging uniformly on $\R$ to a function $f$. Prove that $f$ is a polynomial.
::: hint
For large $m, n$ the polynomial $p_n - p_m$ is bounded on $\R$.
:::
::: solution
By [[#thm-uniform-cauchy]] there is $N$ with $\abs{p_n(x) - p_m(x)} < 1$ for all $x \in \R$ and $m, n \ge N$. A polynomial that is bounded on $\R$ is constant (a non-constant polynomial tends to $\pm\infty$ as $x \to \infty$). So $p_n - p_N = c_n$ is a constant for each $n \ge N$. Since $p_n(0) \to f(0)$, the constants $c_n = p_n(0) - p_N(0)$ converge to some $c$. Then for every $x$, $f(x) = \lim_n p_n(x) = p_N(x) + c$, a polynomial. (So Weierstrass's theorem fails badly on unbounded intervals: $e^x$ is not a uniform limit of polynomials on $\R$.)
:::
:::

::: exercise The sophomore's dream {level=3}
Prove Johann Bernoulli's identity $\displaystyle\int_0^1 x^{-x}\,dx = \sum_{n=1}^\infty\frac{1}{n^n}$.
::: hint
Write $x^{-x} = e^{-x\ln x} = \sum_{k\ge0}\frac{(-x\ln x)^k}{k!}$, use $\abs{x\ln x} \le 1/e$ on $(0, 1]$, and show $\int_0^1(-x\ln x)^k\,dx = \frac{k!}{(k+1)^{k+1}}$ by substituting $x = e^{-t}$.
:::
::: solution
Let $u(x) = -x\ln x$ for $0 < x \le 1$ and $u(0) = 0$; $u$ is continuous on $[0, 1]$ and $0 \le u \le 1/e$ (its maximum is at $x = 1/e$). The exponential series $e^u = \sum_k u^k/k!$ converges uniformly on $[0, 1]$ by the M-test with $M_k = e^{-k}/k!$. By [[#thm-uniform-integral]],

$$
\int_0^1 x^{-x}\,dx = \int_0^1 e^{u(x)}\,dx = \sum_{k=0}^\infty\frac{1}{k!}\int_0^1(-x\ln x)^k\,dx.
$$

With $x = e^{-t}$ (so $-\ln x = t$ and $dx = -e^{-t}dt$), $\int_0^1(-x\ln x)^k\,dx = \int_0^\infty t^ke^{-(k+1)t}\,dt = \frac{k!}{(k+1)^{k+1}}$, using $\int_0^\infty t^ke^{-st}\,dt = k!/s^{k+1}$ (an improper integral; for $k \ge 1$ the integrand $(-x\ln x)^k$ is continuous on $[0,1]$, and for $k = 0$ the integral is $1$). Hence the sum is $\sum_{k\ge0}\frac{1}{(k+1)^{k+1}} = \sum_{n\ge1}n^{-n} \approx 1.29129$.
:::
:::
