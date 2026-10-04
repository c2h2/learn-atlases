How far apart are two functions? Different questions need different answers. If we want $g$ to approximate $f$ at *every* point, the right distance is the largest gap, $\sup\abs{f - g}$, and convergence in that distance is uniform convergence ([[real-analysis/uniform-convergence]]). If we only care about the average error, the area $\int\abs{f - g}$ is better. Engineers and statisticians measure errors by $\int\abs{f - g}^2$, the "energy" or mean square error, which has the geometry of an inner product. Each choice makes a space of functions into a metric space ([[real-analysis/metric-spaces]]), and each gives a different meaning to "$f_n \to f$".

This chapter studies the whole family of distances $\norm{f - g}_p = \bigl(\int\abs{f - g}^p\,d\mu\bigr)^{1/p}$. We prove the two inequalities that make them distances — Hölder's and Minkowski's — and the theorem that makes them useful: the spaces $L^p$ are **complete**. That is the deep reason for preferring the Lebesgue integral to the Riemann integral in modern analysis: in [[real-analysis/metric-spaces#ex-incomplete]] we saw that continuous functions with the distance $\int\abs{f - g}$ form an incomplete space, and the Lebesgue integrable functions are exactly what is needed to fill the holes. Finally we compare the different modes of convergence — almost everywhere, in $L^p$, in measure, uniform — and see by examples that no two of them are the same.

Throughout, $(X, \mathcal{A}, \mu)$ is a measure space.

## The spaces Lp

::: definition Lp spaces {#def-lp}
For $1 \le p < \infty$ and a measurable $f\colon X\to\R$, let

$$
\norm{f}_p = \Bigl(\int_X\abs{f}^p\,d\mu\Bigr)^{1/p},
$$

and let $\norm{f}_\infty = \inf\set{M \ge 0 : \abs{f} \le M \text{ a.e.}}$, the **essential supremum** of $\abs f$. For $1 \le p \le \infty$, $L^p(\mu)$ is the set of measurable $f$ with $\norm f_p < \infty$, where two functions that are equal almost everywhere are regarded as the same element.
:::

The identification is forced on us: $\norm{f}_p = 0$ exactly when $f = 0$ a.e. (by Markov's inequality, [[measure-theory/lebesgue-integral#thm-markov]]), and a distance must vanish only between equal points. So an element of $L^p$ is really an equivalence class of functions, and "the value of $f$ at the point $x$" means nothing, while integrals, norms and a.e. statements all make sense. The infimum defining $\norm{f}_\infty$ is attained: $\abs f \le \norm f_\infty + \frac1n$ a.e. for every $n$, and a countable union of null sets is null. So, for example, the function equal to $x^2$ on $[0, 2]$ except for the value $100$ at $x = 1$ has $\norm{f}_\infty = 4$: one point does not count.

Two special cases deserve names. For Lebesgue measure on an interval we write $L^p(a, b)$. For counting measure on $\N$, $L^p$ is the space $\ell^p$ of sequences $a = (a_n)$ with $\norm{a}_p = \bigl(\sum\abs{a_n}^p\bigr)^{1/p} < \infty$ (here every point has positive measure, so no identification takes place). With counting measure on $\set{1, \dots, n}$ we recover the norms $\norm{x}_p$ on $\R^n$, whose unit balls are drawn below.

::: example Powers of x {#ex-powers}
For $a > 0$ and $1 \le p < \infty$, decide when $f(x) = x^{-a}$ belongs to $L^p(0, 1)$ and when it belongs to $L^p(1, \infty)$.
::: solution
$\abs f^p = x^{-ap}$. On $(0, 1)$, by monotone convergence $\int_0^1x^{-ap}\,dx = \lim_{\delta\to0}\int_\delta^1x^{-ap}\,dx$, which is finite (and equals $\frac{1}{1 - ap}$) exactly when $ap < 1$. On $(1, \infty)$, $\int_1^\infty x^{-ap}\,dx = \lim_N\int_1^N x^{-ap}\,dx$ is finite (equal to $\frac{1}{ap - 1}$) exactly when $ap > 1$. So $x^{-a} \in L^p(0, 1)$ iff $p < 1/a$, and $x^{-a} \in L^p(1, \infty)$ iff $p > 1/a$. Large $p$ punishes tall spikes; small $p$ punishes slowly decaying tails. On $(0, \infty)$ no power of $x$ is in any $L^p$.
:::
:::

::: widget plot
f: x^(-a)
x: 0.02, 4
y: 0, 8
sliders: a=0.5:0.1:2:0.05
vlines: 1
caption: The functions $x^{-a}$. Near $0$ the graph is a spike, whose $p$-th power has finite area exactly when $ap < 1$; beyond $x = 1$ it is a tail, whose $p$-th power has finite area exactly when $ap > 1$. With $a = \tfrac12$: the spike is in $L^1(0,1)$ but not $L^2(0, 1)$, and the tail is in $L^p(1, \infty)$ only for $p > 2$. Move $a$ and decide, for $p = 1$ and $p = 2$, on which side of the dashed line the function is $p$-integrable.
:::

## Hölder's and Minkowski's inequalities

Exponents $p, q \in [1, \infty]$ are **conjugate** if $\frac1p + \frac1q = 1$ (with $\frac1\infty = 0$): for instance $2$ and $2$, $3$ and $\tfrac32$, $1$ and $\infty$. Everything rests on an inequality between numbers.

::: lemma Young's inequality {#lem-young}
Let $1 < p, q < \infty$ be conjugate exponents. For all $a, b \ge 0$,

$$
ab \le \frac{a^p}{p} + \frac{b^q}{q},
$$

with equality if and only if $a^p = b^q$.
:::

::: proof
If $a = 0$ or $b = 0$ the inequality is clear, with equality exactly when both are $0$. Otherwise, the logarithm is strictly concave on $(0, \infty)$ (its second derivative is $-1/t^2 < 0$), so for $u, v > 0$ and $\theta = \frac1p \in (0, 1)$,

$$
\ln\bigl(\theta u + (1 - \theta)v\bigr) \ge \theta\ln u + (1 - \theta)\ln v,
$$

with equality only if $u = v$. Take $u = a^p$ and $v = b^q$, noting $1 - \theta = \frac1q$: the right-hand side is $\ln a + \ln b = \ln(ab)$, and exponentiating gives the inequality, with equality iff $a^p = b^q$.
:::

Geometrically, $ab$ is the area of a rectangle, and $\frac{a^p}{p}$, $\frac{b^q}{q}$ are the areas between the curve $y = x^{p-1}$ and the two axes, up to $x = a$ and up to $y = b$; the two curved regions always cover the rectangle.

::: theorem Hölder's inequality {#thm-holder}
Let $1 \le p, q \le \infty$ be conjugate exponents, $f \in L^p(\mu)$ and $g \in L^q(\mu)$. Then $fg \in L^1(\mu)$ and

$$
\int_X\abs{fg}\,d\mu \le \norm{f}_p\,\norm{g}_q.
$$ {#eq-holder}
:::

::: proof
If $p = 1$ and $q = \infty$: $\abs{fg} \le \abs f\,\norm g_\infty$ a.e., and integrating gives the claim. Now let $1 < p < \infty$. If $\norm f_p = 0$ or $\norm g_q = 0$, then $f = 0$ or $g = 0$ a.e., so $fg = 0$ a.e. and both sides vanish. Otherwise put $F = \abs f/\norm f_p$ and $G = \abs g/\norm g_q$, so that $\int F^p = \int G^q = 1$. By Young's inequality at each point, $FG \le \frac{F^p}{p} + \frac{G^q}{q}$, and integrating,

$$
\int FG\,d\mu \le \frac1p + \frac1q = 1.
$$

Multiplying by $\norm f_p\norm g_q$ gives [[#eq-holder]].
:::

The case $p = q = 2$ is the **Cauchy–Schwarz inequality** $\int\abs{fg} \le \norm f_2\norm g_2$, which says that $\inner{f}{g} = \int fg\,d\mu$ is an inner product on $L^2$ with $\norm{f}_2 = \sqrt{\inner ff}$ ([[linear-algebra/inner-products]]). It gives a first glimpse of how $L^p$ norms control functions.

::: example Square-integrable derivatives {#ex-holder-continuity}
Let $f \in L^2(0, 1)$ and $F(x) = \int_0^x f\,d\lambda$. Show that $\abs{F(x) - F(y)} \le \norm{f}_2\,\abs{x - y}^{1/2}$ for all $x, y \in [0, 1]$.
::: solution
First, $f$ is integrable on $(0,1)$, since $\int_0^1\abs f \le \norm f_2\norm{1}_2 = \norm f_2$ by Cauchy–Schwarz; so $F$ is defined. For $y < x$, apply Cauchy–Schwarz to $f$ and $\mathbf{1}_{[y, x]}$:

$$
\abs{F(x) - F(y)} = \Bigl\lvert\int_0^1 f\,\mathbf{1}_{[y,x]}\,d\lambda\Bigr\rvert \le \norm{f}_2\,\norm{\mathbf{1}_{[y, x]}}_2 = \norm f_2\,(x - y)^{1/2}.
$$

So $F$ is Hölder continuous with exponent $\tfrac12$, a quantitative improvement on the Lipschitz bound of [[real-analysis/riemann-integral#thm-ftc1]], which needs $f$ bounded. With $f \in L^p$ the same argument with Hölder's inequality gives exponent $1 - \frac1p$.
:::
:::

Hölder's inequality also compares different $L^p$ norms on a finite measure space.

::: corollary Inclusions on finite measure spaces {#cor-inclusion}
If $\mu(X) < \infty$ and $1 \le p < r \le \infty$, then $L^r(\mu) \subseteq L^p(\mu)$, and $\norm{f}_p \le \mu(X)^{\frac1p - \frac1r}\norm{f}_r$. In particular, on a probability space $\norm{f}_p$ increases with $p$.
:::

::: proof
For $r = \infty$, $\int\abs f^p \le \norm f_\infty^p\,\mu(X)$. For $r < \infty$, apply Hölder's inequality to $\abs f^p\cdot 1$ with the conjugate exponents $s = r/p > 1$ and $s' = \frac{s}{s-1}$:

$$
\int\abs f^p\,d\mu \le \Bigl(\int\abs f^{r}\,d\mu\Bigr)^{p/r}\Bigl(\int1\,d\mu\Bigr)^{1 - p/r} = \norm f_r^p\,\mu(X)^{1 - p/r}.
$$

Taking $p$-th roots gives the inequality.
:::

::: example Why the essential supremum is called ‖·‖∞ {#ex-p-infinity}
Let $\mu(X) < \infty$ and $f \in L^\infty(\mu)$. Prove that $\norm{f}_p \to \norm{f}_\infty$ as $p \to \infty$.
::: solution
*Upper bound.* $\int\abs f^p \le \norm f_\infty^p\mu(X)$, so $\norm f_p \le \mu(X)^{1/p}\norm f_\infty$, and $\mu(X)^{1/p} \to 1$ (if $\mu(X) > 0$; if $\mu(X) = 0$ all norms vanish). Hence $\limsup_p\norm f_p \le \norm f_\infty$.

*Lower bound.* Let $0 \le M < \norm f_\infty$. The set $A = \set{\abs f > M}$ has positive measure (otherwise $M$ would be an a.e. bound), and $\int\abs f^p \ge M^p\mu(A)$, so $\norm f_p \ge M\mu(A)^{1/p} \to M$. Hence $\liminf_p\norm f_p \ge M$ for every $M < \norm f_\infty$, and so $\liminf_p\norm f_p \ge \norm f_\infty$.

As $p$ grows, $\int\abs f^p$ is dominated more and more by the largest values of $\abs f$ — but values taken only on a null set never count. This is the reason for the notation $\norm{\cdot}_\infty$, and for the shape of the $p$-balls in the figure below, which approach the $\infty$-ball as $p \to \infty$.
:::
:::

On infinite measure spaces such as $\R$ there need be no inclusion in either direction ([[#ex-powers]]); for sequences the inclusion is reversed: $\ell^p \subseteq \ell^r$ when $p < r$ ([[#exr-5-4]]).

::: theorem Minkowski's inequality {#thm-minkowski}
For $1 \le p \le \infty$ and $f, g \in L^p(\mu)$, $f + g \in L^p(\mu)$ and

$$
\norm{f + g}_p \le \norm{f}_p + \norm{g}_p.
$$
:::

::: proof
For $p = 1$ integrate $\abs{f + g} \le \abs f + \abs g$; for $p = \infty$ note $\abs{f + g} \le \norm f_\infty + \norm g_\infty$ a.e. Let $1 < p < \infty$. First, $f + g \in L^p$, since $\abs{f + g}^p \le \bigl(2\max(\abs f, \abs g)\bigr)^p \le 2^p\bigl(\abs f^p + \abs g^p\bigr)$. Now write

$$
\abs{f + g}^p \le \abs{f}\,\abs{f + g}^{p-1} + \abs{g}\,\abs{f + g}^{p-1}
$$

and apply Hölder's inequality to each term with the conjugate exponent $q = \frac{p}{p-1}$. Since $(p - 1)q = p$, we have $\bigl\lVert\abs{f+g}^{p-1}\bigr\rVert_q = \bigl(\int\abs{f + g}^p\bigr)^{1/q} = \norm{f + g}_p^{p-1}$, so

$$
\norm{f + g}_p^p \le \bigl(\norm f_p + \norm g_p\bigr)\norm{f + g}_p^{p-1}.
$$

If $\norm{f + g}_p = 0$ there is nothing to prove; otherwise divide by $\norm{f + g}_p^{p-1}$.
:::

So $\norm{\cdot}_p$ is a **norm** on $L^p$: it vanishes only at $0$ (thanks to the identification of a.e.-equal functions), $\norm{cf}_p = \abs c\norm f_p$, and it satisfies the triangle inequality. Consequently $d(f, g) = \norm{f - g}_p$ is a metric ([[real-analysis/metric-spaces#def-metric]]).

::: intuition Which p?
The exponent $p$ decides how errors are weighted. In $\norm{f - g}_1$ every unit of area counts equally, so a tall narrow spike costs no more than a low wide bump of the same area. Raising $\abs{f - g}$ to a power $p > 1$ before integrating penalises large deviations more than small ones, and as $p \to \infty$ only the worst deviation matters ([[#ex-p-infinity]]). The middle case $p = 2$ is special for a different reason: it is the only $L^p$ norm that comes from an inner product, so it carries a geometry of angles, orthogonality and projections — which is why least squares, Fourier series and variance all live in $L^2$.
:::

::: widget metricballs
metrics: 1; 2; inf
radius: 1
caption: The unit balls $\set{x : \norm{x}_p < 1}$ in $\R^2$ — the space $L^p$ for counting measure on two points. Slide $p$ from $1$ to $\infty$: the ball swells from the diamond to the square, and it is always **convex**. Minkowski's inequality is exactly this convexity. For $p < 1$ the "ball" $\lvert x_1\rvert^p + \lvert x_2\rvert^p < 1$ would be star-shaped, with inward-curving sides, and the triangle inequality would fail.
:::

::: warning No triangle inequality below p = 1
For $0 < p < 1$ the formula $\bigl(\int\abs f^p\bigr)^{1/p}$ still makes sense, but it is not a norm. With counting measure on $\set{1, 2}$, $f = (1, 0)$ and $g = (0, 1)$ have $\norm f_{1/2} = \norm g_{1/2} = 1$, while $\norm{f + g}_{1/2} = (1 + 1)^2 = 4 > 2$. Minkowski's proof breaks because Hölder's inequality needs $p \ge 1$.
:::

::: quiz
Let $f \in L^2(0, 1)$. Which bound on $\int_0^1\abs{f(x)}\sqrt x\,dx$ follows from the Cauchy–Schwarz inequality?
- [x] $\norm f_2/\sqrt2$
- [ ] $\norm f_2/2$
- [ ] $\norm f_1$
- [ ] $\norm{f}_2^2$
::: solution
By Cauchy–Schwarz, $\int_0^1\abs f\sqrt x\,dx \le \norm f_2\bigl(\int_0^1x\,dx\bigr)^{1/2} = \norm f_2\cdot\frac{1}{\sqrt2}$. The other bounds do not follow: for instance $\norm f_2^2$ has the wrong homogeneity (doubling $f$ should double the bound, not quadruple it).
:::
:::

::: remark Duality
Hölder's inequality says that each $g \in L^q$ defines a linear functional $\Lambda_g(f) = \int fg\,d\mu$ on $L^p$ with $\abs{\Lambda_g(f)} \le \norm g_q\norm f_p$. The equality case of Young's inequality shows that the bound is sharp: for $1 < p < \infty$ the function $f = \abs g^{q-1}\sgn g$ gives equality, so the norm of $\Lambda_g$ is exactly $\norm g_q$. The **Riesz representation theorem** states the converse: for $1 \le p < \infty$ (and $\mu$ σ-finite when $p = 1$) every bounded linear functional on $L^p$ is of the form $\Lambda_g$ for a unique $g \in L^q$, so the dual space of $L^p$ is $L^q$. Its proof uses the Radon–Nikodym theorem; see Folland, *Real Analysis*, chapter 6. For $p = \infty$ the dual is strictly larger than $L^1$.
:::

## Completeness: the Riesz–Fischer theorem

The decisive property of $L^p$ is that Cauchy sequences converge. The proof uses a criterion valid in every normed space, and both convergence theorems of the previous chapter.

::: lemma Absolutely convergent series {#lem-abs-series}
Let $V$ be a normed space. If every series $\sum v_k$ in $V$ with $\sum\norm{v_k} < \infty$ converges in $V$, then $V$ is complete.
:::

::: proof
Let $(f_n)$ be a Cauchy sequence. Choose $n_1 < n_2 < \cdots$ such that $\norm{f_m - f_n} < 2^{-k}$ for all $m, n \ge n_k$. The series $f_{n_1} + \sum_k(f_{n_{k+1}} - f_{n_k})$ has $\sum_k\norm{f_{n_{k+1}} - f_{n_k}} < \sum 2^{-k} < \infty$, so it converges to some $f \in V$; its partial sums are $f_{n_{k+1}}$, so $f_{n_k} \to f$. A Cauchy sequence with a convergent subsequence converges (to the same limit): given $\eps$, for $n$ and $n_k$ large, $\norm{f_n - f} \le \norm{f_n - f_{n_k}} + \norm{f_{n_k} - f} < \eps$.
:::

::: theorem Riesz–Fischer theorem {#thm-riesz-fischer}
For $1 \le p \le \infty$, the space $L^p(\mu)$ is complete. Moreover, if $f_n \to f$ in $L^p(\mu)$, then a subsequence of $(f_n)$ converges to $f$ almost everywhere.
:::

::: proof
*Case $1 \le p < \infty$.* By [[#lem-abs-series]] it suffices to show that if $\sum_k\norm{g_k}_p = B < \infty$ then $\sum g_k$ converges in $L^p$. Let $G_K = \sum_{k\le K}\abs{g_k}$ and $G = \sum_{k\ge1}\abs{g_k}$ (with values in $[0, \infty]$). By Minkowski's inequality $\norm{G_K}_p \le B$, and $G_K^p \uparrow G^p$, so by the monotone convergence theorem ([[measure-theory/lebesgue-integral#thm-monotone-convergence]])

$$
\int G^p\,d\mu = \lim_{K\to\infty}\int G_K^p\,d\mu \le B^p < \infty.
$$

Hence $G < \infty$ almost everywhere, and at every such point the series $\sum g_k(x)$ converges absolutely; let $S(x)$ be its sum (and $S = 0$ on the null set where $G = \infty$). The partial sums $S_K = \sum_{k\le K}g_k$ satisfy $S_K \to S$ a.e. and $\abs{S_K - S}^p \le (2G)^p$, which is integrable. By dominated convergence ([[measure-theory/lebesgue-integral#thm-dct]]), $\norm{S_K - S}_p^p = \int\abs{S_K - S}^p \to 0$. Also $\abs S \le G$, so $S \in L^p$. Thus $\sum g_k$ converges in $L^p$ to $S$.

*The subsequence.* If $f_n \to f$ in $L^p$, the sequence is Cauchy, and the proof of [[#lem-abs-series]] together with the argument above produces a subsequence $f_{n_k}$ that converges almost everywhere (the partial sums $f_{n_{k+1}}$ of an a.e. absolutely convergent series) and in $L^p$ to the same function $S$. Limits in a metric space are unique, so $S = f$ in $L^p$, that is $S = f$ a.e., and $f_{n_k} \to f$ a.e.

*Case $p = \infty$.* Let $(f_n)$ be Cauchy in $L^\infty$. For each $n$ the set where $\abs{f_n} > \norm{f_n}_\infty$ is null, and for each pair $m, n$ so is the set where $\abs{f_m - f_n} > \norm{f_m - f_n}_\infty$; let $N$ be the union of these countably many null sets. Off $N$ the sequence is uniformly Cauchy, so it converges uniformly to a bounded function $f$ ([[real-analysis/uniform-convergence#thm-uniform-cauchy]]); setting $f = 0$ on $N$, we get $\norm{f_n - f}_\infty \to 0$.
:::

::: remark Completions and density
In a complete space, a dense subspace determines everything. For $1 \le p < \infty$ the simple functions vanishing outside sets of finite measure are dense in $L^p(\mu)$: for $f \ge 0$ the approximations $\varphi_n \uparrow f$ of [[measure-theory/measurable-functions#thm-simple-approx]] satisfy $\abs{f - \varphi_n}^p \le f^p$, so $\norm{f - \varphi_n}_p \to 0$ by dominated convergence. For Lebesgue measure one can go further, using the regularity of Lebesgue measure ([[measure-theory/lebesgue-measure#thm-regularity]]) to replace measurable sets by finite unions of intervals: step functions, and continuous functions vanishing outside bounded intervals, are dense in $L^p(\R)$ for $p < \infty$. In the language of [[real-analysis/metric-spaces]], $L^1(a, b)$ is the completion of the incomplete space $(C[a,b], d_1)$ of [[real-analysis/metric-spaces#ex-incomplete]]. (For $p = \infty$ density fails: a uniform limit of continuous functions is continuous, so $\mathbf{1}_{[0, 1/2]}$ is not in the closure of $C[0, 1]$.)
:::

::: application Fourier series and least squares
$L^2$ is a complete inner product space — a **Hilbert space** — and this is where Fourier series live. The functions $\frac{1}{\sqrt{2\pi}}e^{inx}$ form an orthonormal basis of $L^2(-\pi, \pi)$, every $f \in L^2$ is the $L^2$-limit of its Fourier partial sums, and Parseval's identity $\norm{f}_2^2 = \sum\abs{\hat f(n)}^2$ holds, where $\hat f(n) = \inner{f}{\tfrac{1}{\sqrt{2\pi}}e^{inx}}$ are the coefficients of $f$ in this basis ([[pde/fourier-series]]). The Riesz–Fischer theorem supplies the converse: every square-summable sequence of coefficients is the Fourier sequence of some $f \in L^2$ — the result that Riesz and Fischer proved in 1907. Orthogonal projection in $L^2$ is least-squares approximation ([[linear-algebra/least-squares]]), and in probability $\norm{X - \E X}_2^2$ is the variance.
:::

## Modes of convergence

A sequence of functions can converge in many different senses. Besides pointwise and uniform convergence ([[real-analysis/uniform-convergence]]), almost-everywhere convergence and convergence in $L^p$, there is one more that is natural in probability.

::: definition Convergence in measure {#def-convergence-in-measure}
Measurable functions $f_n$ **converge in measure** to $f$ if for every $\eps > 0$,

$$
\mu\bigl(\set{x : \abs{f_n(x) - f(x)} > \eps}\bigr) \to 0 \qquad (n\to\infty).
$$

In probability this is called **convergence in probability**.
:::

Convergence in $L^p$ ($p < \infty$) implies convergence in measure, by Markov's inequality applied to $\abs{f_n - f}^p$:

$$
\mu\bigl(\set{\abs{f_n - f} > \eps}\bigr) \le \frac{1}{\eps^p}\int\abs{f_n - f}^p\,d\mu = \frac{\norm{f_n - f}_p^p}{\eps^p} \to 0.
$$ {#eq-chebyshev}

On a finite measure space, almost-everywhere convergence also implies convergence in measure ([[#exr-5-7]]). Convergence in measure does not imply almost-everywhere convergence — but it almost does.

::: theorem Riesz's subsequence theorem {#thm-riesz-subsequence}
If $f_n \to f$ in measure, then some subsequence $f_{n_k}$ converges to $f$ almost everywhere.
:::

::: proof
Choose $n_1 < n_2 < \cdots$ such that the sets $A_k = \set{\abs{f_{n_k} - f} > 2^{-k}}$ satisfy $\mu(A_k) < 2^{-k}$. Since $\sum_k\mu(A_k) < \infty$, the Borel–Cantelli lemma ([[measure-theory/sigma-algebras#thm-borel-cantelli]]) shows that almost every $x$ belongs to only finitely many $A_k$. For such $x$ there is $K$ with $\abs{f_{n_k}(x) - f(x)} \le 2^{-k}$ for all $k \ge K$, so $f_{n_k}(x) \to f(x)$.
:::

That the subsequence is really needed is shown by the most instructive example in the subject.

::: example The typewriter sequence {#ex-typewriter}
Every $n \in \N$ can be written uniquely as $n = 2^k + j$ with $k \ge 0$ and $0 \le j < 2^k$. Let $f_n = \mathbf{1}_{[j2^{-k},\,(j+1)2^{-k}]}$ on $[0, 1]$. Show that $f_n \to 0$ in $L^p$ for every $p < \infty$ and in measure, but that $(f_n(x))$ converges for **no** $x \in [0, 1]$.
::: solution
As $n$ runs from $2^k$ to $2^{k+1} - 1$, the interval of $f_n$ (of length $2^{-k}$) sweeps across $[0, 1]$ from left to right, like the carriage of a typewriter; then $k$ increases and the sweep restarts with intervals half as long.

*Convergence in $L^p$ and in measure.* $\norm{f_n}_p = \bigl(2^{-k}\bigr)^{1/p} \to 0$, since $k \to \infty$ as $n \to \infty$. By [[#eq-chebyshev]] $f_n \to 0$ in measure as well.

*No pointwise convergence.* Fix $x \in [0, 1]$. In each sweep (each $k$) some interval contains $x$, so $f_n(x) = 1$ for at least one $n$ in every block $2^k \le n < 2^{k+1}$; and for $k \ge 1$ some interval of the sweep misses $x$, so $f_n(x) = 0$ for another $n$ in the block. Hence $f_n(x) = 1$ infinitely often and $f_n(x) = 0$ infinitely often, and $(f_n(x))$ diverges.

As Riesz's theorem predicts, subsequences do converge a.e.: $f_{2^k} = \mathbf{1}_{[0, 2^{-k}]} \to 0$ at every $x > 0$.
:::
:::

::: widget plot
f: if(x >= (n - 2^floor(log2(n)))/2^floor(log2(n)) && x <= (n - 2^floor(log2(n)) + 1)/2^floor(log2(n)), 1, 0)
x: 0, 1
y: -0.1, 1.2
sliders: n=5:1:64:1
caption: The typewriter sequence $f_n$, with $n = 2^k + j$. Step $n$ forward: the block of height $1$ sweeps across $[0, 1]$, then halves in width and sweeps again. Its area $2^{-k}$ tends to $0$, so $f_n \to 0$ in $L^1$ and in measure — yet at every point the block keeps coming back, so the values $0, 1$ alternate forever. Watch a single point, say $x = 0.3$: it is hit once in every sweep.
:::

::: example One sequence, several modes {#ex-modes}
Let $f_n = \sqrt n\,\mathbf{1}_{(0, 1/n)}$ on $[0, 1]$. Decide whether $f_n \to 0$ (a) everywhere, (b) uniformly, (c) in measure, (d) in $L^p$, for each $p \in [1, \infty]$.
::: solution
(a) Yes: $f_n(0) = 0$, and for $x > 0$, $f_n(x) = 0$ once $n \ge 1/x$. (b) No: $\sup f_n = \sqrt n \to \infty$. (c) Yes: for $\eps > 0$, $\lambda(\set{f_n > \eps}) \le \lambda((0, 1/n)) = 1/n \to 0$ (or use (a) and finiteness of the measure). (d) For $p < \infty$, $\norm{f_n}_p^p = n^{p/2}\cdot\frac1n = n^{p/2 - 1}$, which tends to $0$ if $p < 2$, equals $1$ if $p = 2$, and tends to $\infty$ if $p > 2$; and $\norm{f_n}_\infty = \sqrt n \to \infty$. So $f_n \to 0$ in $L^p$ exactly for $1 \le p < 2$. Higher exponents are more sensitive to tall, thin spikes — consistent with [[#cor-inclusion]], since convergence in $L^r$ implies convergence in $L^p$ for $p < r$ on a finite measure space.
:::
:::

Two more examples complete the picture. On $[0, 1]$, $g_n = n\mathbf{1}_{(0, 1/n)}$ converges to $0$ everywhere and in measure, but $\norm{g_n}_1 = 1$, so not in $L^1$: almost-everywhere convergence does not imply $L^p$ convergence without domination. On $\R$, $h_n = \mathbf{1}_{[n, n+1]}$ converges to $0$ everywhere but not in measure, since $\lambda(\set{h_n > \tfrac12}) = 1$: on infinite measure spaces, a.e. convergence does not even imply convergence in measure. The relations are summarised below.

| from ↓ / to → | a.e. | in measure | in $L^p$ |
|---|---|---|---|
| uniform | yes | yes | yes if $\mu(X) < \infty$ |
| a.e. | — | yes if $\mu(X) < \infty$ | yes if dominated ([[measure-theory/lebesgue-integral#thm-dct]]) |
| in measure | a subsequence ([[#thm-riesz-subsequence]]) | — | yes if dominated |
| in $L^p$ | a subsequence ([[#thm-riesz-fischer]]) | yes, by [[#eq-chebyshev]] | — |

::: quiz
For the typewriter sequence $(f_n)$ of [[#ex-typewriter]], which statements are true? Select all that apply.
- [x] $f_n \to 0$ in $L^1[0,1]$.
- [ ] $f_n \to 0$ almost everywhere.
- [x] Some subsequence of $(f_n)$ converges to $0$ almost everywhere.
- [ ] $f_n \to 0$ uniformly on $[\tfrac12, 1]$.
::: solution
$\norm{f_n}_1 = 2^{-k} \to 0$, and by Riesz's theorem (or directly, with $f_{2^k}$) a subsequence converges a.e. But $(f_n(x))$ converges at no point, so certainly not a.e. and not uniformly on any subinterval: on $[\tfrac12, 1]$, $\sup f_n = 1$ for infinitely many $n$.
:::
:::

::: history
The inequality now named after Otto Hölder was found by Leonard James Rogers in 1888 and by Hölder in 1889; Hermann Minkowski's inequality appeared in his *Geometrie der Zahlen* (1896). William Henry Young published his inequality for products in 1912. In 1907 Frigyes Riesz and Ernst Fischer independently proved that the space of square-integrable functions is complete — a theorem that showed the new Lebesgue integral to be indispensable. Riesz introduced convergence in measure, and proved that it gives an almost-everywhere convergent subsequence, in 1909, and in 1910 he defined and studied the spaces $L^p$ for $1 < p < \infty$. Stefan Banach's *Théorie des opérations linéaires* (1932) placed these spaces in the general theory of complete normed spaces, now called Banach spaces.
:::

## Where this leads

The $L^p$ spaces are the meeting point of measure theory and functional analysis. $L^2$ is a Hilbert space, and its geometry — orthogonality, projections, bases — underlies Fourier series ([[pde/fourier-series]]) and the Fourier transform ([[pde/fourier-transform]]), quantum mechanics and signal processing. The other $L^p$ are Banach spaces, and for $1 \le p < \infty$ (on σ-finite spaces when $p = 1$) the dual space of $L^p$ is $L^q$, a theorem of Riesz that rests on Hölder's inequality. In probability ([[probability/limit-theorems]]) the modes of convergence of this chapter appear as almost-sure convergence, convergence in probability and convergence in mean, and the strong and weak laws of large numbers are statements about exactly these modes. Weak derivatives and Sobolev spaces, built on $L^p$, are the setting of the modern theory of partial differential equations.

::: summary
- $L^p(\mu)$ consists of measurable functions with $\norm f_p = (\int\abs f^p)^{1/p} < \infty$, or essentially bounded functions for $p = \infty$, with functions equal a.e. identified ([[#def-lp]]).
- Young's inequality $ab \le \frac{a^p}{p} + \frac{b^q}{q}$ gives Hölder's inequality $\int\abs{fg} \le \norm f_p\norm g_q$ for conjugate exponents ([[#thm-holder]]); $p = q = 2$ is Cauchy–Schwarz.
- Minkowski's inequality $\norm{f + g}_p \le \norm f_p + \norm g_p$ makes $L^p$ a normed space for $p \ge 1$ ([[#thm-minkowski]]); it fails for $p < 1$.
- On finite measure spaces $L^r \subseteq L^p$ for $p < r$; on $\R$ no inclusion holds, and for sequences $\ell^p \subseteq \ell^r$.
- Riesz–Fischer: $L^p$ is complete, and $L^p$-convergent sequences have a.e.-convergent subsequences ([[#thm-riesz-fischer]]); simple and (for Lebesgue measure) step and continuous functions are dense.
- Convergence in $L^p$ implies convergence in measure, which implies a.e. convergence of a subsequence ([[#thm-riesz-subsequence]]); the typewriter sequence converges in $L^p$ but nowhere pointwise.
:::

## Exercises

::: exercise An L2 norm {level=1 check="1/sqrt(3)"}
Compute $\norm{f}_2$ for $f(x) = x$ in $L^2(0, 1)$.
::: solution
$\norm f_2^2 = \int_0^1x^2\,dx = \frac13$, so $\norm f_2 = \frac{1}{\sqrt3} \approx 0.577$.
:::
:::

::: exercise An essential supremum {level=1 check="4"}
Let $f(x) = x^2$ for $x \in [0, 2]$, except that $f(1) = 100$ and $f(q) = 0$ for every rational $q \in (1, 2)$. Find $\norm{f}_\infty$ in $L^\infty(0, 2)$.
::: solution
$f$ agrees with $x^2$ outside the countable, hence null, set $\set{1}\cup(\Q\cap(1,2))$, so $\norm f_\infty = \norm{x^2}_\infty$. Since $x^2 \le 4$ everywhere on $[0,2]$, $\norm{x^2}_\infty \le 4$; and for every $M < 4$ the set $\set{x^2 > M}\cap[0,2]$ is an interval of positive length, so $M$ is not an a.e. bound. Hence $\norm f_\infty = 4$.
:::
:::

::: exercise Membership of powers {level=1}
For which $p \in [1, \infty)$ is $f(x) = x^{-1/2}$ in $L^p(0, 1)$? In $L^p(1, \infty)$? Is it in $L^\infty(1, \infty)$?
::: solution
By [[#ex-powers]] with $a = \frac12$: $f \in L^p(0, 1)$ iff $p < 2$, and $f \in L^p(1, \infty)$ iff $p > 2$. On $(1, \infty)$, $0 < f \le 1$, so $f \in L^\infty(1, \infty)$ with $\norm f_\infty = 1$. On $(0, 1)$ it is unbounded on every interval $(0, \delta)$, so it is not in $L^\infty(0, 1)$.
:::
:::

::: exercise Sequence spaces are nested {level=2}
Let $1 \le p < r \le \infty$. Prove that $\ell^p \subseteq \ell^r$ and $\norm{a}_r \le \norm{a}_p$.
::: hint
Normalise so that $\norm a_p = 1$; then every $\abs{a_n} \le 1$.
:::
::: solution
If $a = 0$ there is nothing to prove; otherwise, by homogeneity, assume $\norm a_p = 1$. Then $\abs{a_n}^p \le \sum\abs{a_k}^p = 1$, so $\abs{a_n} \le 1$ for all $n$, which gives $\norm{a}_\infty \le 1$ and, for $r < \infty$, $\abs{a_n}^r \le \abs{a_n}^p$. Summing, $\norm a_r^r \le \norm a_p^p = 1$, so $\norm a_r \le 1 = \norm a_p$. The inclusion is strict: $a_n = n^{-1/p}$ is in $\ell^r$ but not in $\ell^p$. Compare [[#cor-inclusion]]: on finite measure spaces the inclusion goes the other way.
:::
:::

::: exercise A weighted sum {level=2}
Prove that for every real sequence $(a_n)$ with $\sum a_n^2 < \infty$,

$$
\Bigl(\sum_{n=1}^\infty\frac{\abs{a_n}}{n}\Bigr)^2 \le \frac{\pi^2}{6}\sum_{n=1}^\infty a_n^2.
$$
::: solution
This is the Cauchy–Schwarz inequality in $\ell^2$ (Hölder with $p = q = 2$ for counting measure) applied to the sequences $(\abs{a_n})$ and $(1/n)$: $\sum\frac{\abs{a_n}}{n} \le \bigl(\sum a_n^2\bigr)^{1/2}\bigl(\sum\frac1{n^2}\bigr)^{1/2}$, and $\sum 1/n^2 = \pi^2/6$. Squaring gives the result.
:::
:::

::: exercise Sums converge in measure {level=2}
Suppose $f_n \to f$ and $g_n \to g$ in measure. Prove that $f_n + g_n \to f + g$ in measure.
::: solution
If $\abs{(f_n + g_n) - (f + g)} > \eps$, then $\abs{f_n - f} > \eps/2$ or $\abs{g_n - g} > \eps/2$. So

$$
\mu\bigl(\abs{(f_n + g_n) - (f + g)} > \eps\bigr) \le \mu\bigl(\abs{f_n - f} > \tfrac\eps2\bigr) + \mu\bigl(\abs{g_n - g} > \tfrac\eps2\bigr) \to 0.
$$
:::
:::

::: exercise Almost everywhere implies in measure {level=2}
Let $\mu(X) < \infty$ and $f_n \to f$ almost everywhere, all functions real-valued and measurable. Prove that $f_n \to f$ in measure. Show by an example that finiteness of $\mu$ is needed.
::: solution
Fix $\eps > 0$ and let $B_n = \bigcup_{m\ge n}\set{\abs{f_m - f} > \eps}$. These sets decrease, and every $x$ at which $f_m(x) \to f(x)$ lies outside $B_n$ for large $n$; so $\bigcap_n B_n$ is contained in the null set where convergence fails. Since $\mu(B_1) \le \mu(X) < \infty$, continuity from above ([[measure-theory/sigma-algebras#thm-continuity-measure]]) gives $\mu(B_n) \to 0$, and $\mu(\abs{f_n - f} > \eps) \le \mu(B_n) \to 0$. Without finiteness: $\mathbf{1}_{[n,n+1]} \to 0$ everywhere on $\R$, but $\lambda(\set{\mathbf{1}_{[n,n+1]} > \tfrac12}) = 1$ for every $n$.
:::
:::

::: exercise An interpolation inequality {level=3}
Let $1 \le p < r < q < \infty$ and define $\theta \in (0, 1)$ by $\frac1r = \frac\theta p + \frac{1-\theta}{q}$. Prove that $\norm{f}_r \le \norm{f}_p^\theta\,\norm{f}_q^{1-\theta}$ for all measurable $f$. Deduce that $L^p\cap L^q \subseteq L^r$.
::: hint
Write $\abs f^r = \abs f^{\theta r}\abs f^{(1-\theta)r}$ and apply Hölder's inequality with exponents $\frac{p}{\theta r}$ and $\frac{q}{(1-\theta)r}$.
:::
::: solution
The exponents $s = \frac{p}{\theta r}$ and $s' = \frac{q}{(1-\theta)r}$ are conjugate, because $\frac1s + \frac1{s'} = \frac{\theta r}{p} + \frac{(1-\theta)r}{q} = r\cdot\frac1r = 1$, and both exceed $1$. By Hölder,

$$
\int\abs f^r = \int\abs f^{\theta r}\abs f^{(1-\theta)r} \le \Bigl(\int\abs f^{p}\Bigr)^{\theta r/p}\Bigl(\int\abs f^{q}\Bigr)^{(1-\theta)r/q} = \norm f_p^{\theta r}\norm f_q^{(1-\theta)r}.
$$

Taking $r$-th roots gives the inequality (valid also when some norms are infinite, with the usual conventions), and if $f \in L^p\cap L^q$ the right-hand side is finite.
:::
:::

::: exercise The Riemann–Lebesgue lemma {level=3}
Let $f \in L^1(\R)$. Prove that $\displaystyle\int_\R f(x)\cos(nx)\,dx \to 0$ as $n \to \infty$. You may use that step functions (finite combinations of indicators of bounded intervals) are dense in $L^1(\R)$.
::: hint
Check it for $\mathbf{1}_{[a,b]}$ first; then approximate.
:::
::: solution
For $f = \mathbf{1}_{[a, b]}$, $\int_a^b\cos(nx)\,dx = \frac{\sin(nb) - \sin(na)}{n}$, which has absolute value at most $\frac2n \to 0$. By linearity the claim holds for every step function. For general $f \in L^1$ and $\eps > 0$, choose a step function $s$ with $\norm{f - s}_1 < \eps/2$. Then

$$
\Bigl\lvert\int f(x)\cos(nx)\,dx\Bigr\rvert \le \int\abs{f - s}\,\abs{\cos(nx)}\,dx + \Bigl\lvert\int s(x)\cos(nx)\,dx\Bigr\rvert < \frac\eps2 + \Bigl\lvert\int s(x)\cos(nx)\,dx\Bigr\rvert,
$$

and the last term is less than $\eps/2$ for all large $n$. Hence the integrals tend to $0$. (So the Fourier coefficients of an integrable function tend to $0$: [[pde/fourier-series]].)
:::
:::
