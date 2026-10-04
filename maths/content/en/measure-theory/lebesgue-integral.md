When is the limit of integrals the integral of the limit? For the Riemann integral the answer of [[real-analysis/uniform-convergence#thm-uniform-integral]] is: when the convergence is uniform. That hypothesis is often unavailable — the functions $x^n$ on $[0, 1]$ do not converge uniformly, although $\int_0^1 x^n\,dx = \frac{1}{n+1}$ obviously tends to $0 = \int_0^1 0\,dx$ — and sometimes the limit function has no Riemann integral at all.

Lebesgue's integral, built in this chapter from the measures and measurable functions of the previous ones, gives a far better answer, in three theorems that are among the most used results in all of analysis:

- the **monotone convergence theorem**: for increasing sequences of non-negative functions, limits and integrals can *always* be exchanged;
- **Fatou's lemma**: for non-negative functions, the integral of the limit is at most the limit of the integrals — mass can be lost in the limit, but never created;
- the **dominated convergence theorem**: if all the functions are bounded by one fixed integrable function, limits and integrals can be exchanged.

The construction proceeds in three stages — simple functions, non-negative functions, integrable functions — and we then compare the result with the Riemann integral and use it to differentiate under the integral sign. Throughout, $(X, \mathcal{A}, \mu)$ is a measure space, and we use the arithmetic of $[0, \infty]$ with the convention $0\cdot\infty = 0$.

## Integrating simple functions

::: definition Integral of a simple function {#def-integral-simple}
Let $\varphi = \sum_{k=1}^m c_k\mathbf{1}_{E_k}$ be a non-negative simple function in canonical form ([[measure-theory/measurable-functions#def-simple]]). Its **integral** is

$$
\int_X\varphi\,d\mu = \sum_{k=1}^m c_k\,\mu(E_k) \ \in [0, \infty].
$$

For $A \in \mathcal{A}$ we write $\int_A\varphi\,d\mu = \int_X\varphi\,\mathbf{1}_A\,d\mu$.
:::

This is exactly "value × size of the set where the value is taken", summed over the finitely many values. The convention $0\cdot\infty = 0$ says that the zero function on $\R$ has integral $0$, even though $\lambda(\R) = \infty$.

::: lemma Properties of the simple integral {#lem-simple-well-defined}
Let $\varphi$, $\psi$ be non-negative simple functions.

1. If $\varphi = \sum_j a_j\mathbf{1}_{A_j}$ with pairwise disjoint $A_j \in \mathcal{A}$ (not necessarily canonical), then $\int\varphi\,d\mu = \sum_j a_j\mu(A_j)$.
2. $\int(a\varphi + b\psi)\,d\mu = a\int\varphi\,d\mu + b\int\psi\,d\mu$ for all $a, b \ge 0$.
3. If $\varphi \le \psi$, then $\int\varphi\,d\mu \le \int\psi\,d\mu$.
4. $A \mapsto \int_A\varphi\,d\mu$ is a measure on $\mathcal{A}$.
:::

::: proof
(1) Group the sets $A_j$ by their values: for each value $c_k$ of $\varphi$, the set $E_k = \set{\varphi = c_k}$ is the disjoint union of those $A_j$ with $a_j = c_k$ (sets $A_j$ on which $\varphi$ is $0$ contribute $0$ either way). So $\mu(E_k) = \sum_{j : a_j = c_k}\mu(A_j)$, and multiplying by $c_k$ and summing over $k$ gives the claim.

(2) Write $\varphi = \sum_k c_k\mathbf{1}_{E_k}$ and $\psi = \sum_l d_l\mathbf{1}_{F_l}$ canonically. The sets $E_k\cap F_l$ are disjoint, $a\varphi + b\psi = \sum_{k,l}(ac_k + bd_l)\mathbf{1}_{E_k\cap F_l}$, and by (1)

$$
\int(a\varphi + b\psi)\,d\mu = \sum_{k,l}(ac_k + bd_l)\mu(E_k\cap F_l) = a\sum_k c_k\mu(E_k) + b\sum_l d_l\mu(F_l),
$$

because $E_k$ is the disjoint union of the sets $E_k\cap F_l$ over $l$, and $F_l$ of the sets $E_k\cap F_l$ over $k$.

(3) With the same notation, $c_k \le d_l$ whenever $E_k\cap F_l \ne\varnothing$, so $\sum_{k,l}c_k\mu(E_k\cap F_l) \le \sum_{k,l}d_l\mu(E_k\cap F_l)$.

(4) $\int_A\varphi\,d\mu = \sum_k c_k\mu(E_k\cap A)$ by (1). Each $A \mapsto \mu(E_k\cap A)$ is a measure, and non-negative combinations of measures are measures.
:::

## The integral of a non-negative function

::: definition Integral of a non-negative measurable function {#def-integral-nonneg}
For a measurable $f\colon X\to[0, \infty]$,

$$
\int_X f\,d\mu = \sup\set{\int_X\varphi\,d\mu : \varphi \text{ simple},\ 0 \le \varphi \le f}.
$$
:::

By [[#lem-simple-well-defined]](3) this agrees with [[#def-integral-simple]] when $f$ is itself simple. Two properties are immediate from the definition: if $0 \le f \le g$ then $\int f \le \int g$ (every simple function below $f$ is below $g$), and $\int cf = c\int f$ for constants $c \ge 0$. Additivity, $\int(f + g) = \int f + \int g$, is *not* obvious from a supremum — it follows from the first great theorem.

::: theorem Monotone convergence theorem {#thm-monotone-convergence}
Let $f_1 \le f_2 \le f_3 \le \cdots$ be measurable functions $X\to[0,\infty]$ and $f = \lim_n f_n$ (pointwise). Then

$$
\int_X f\,d\mu = \lim_{n\to\infty}\int_X f_n\,d\mu.
$$
:::

::: proof
$f$ is measurable ([[measure-theory/measurable-functions#thm-measurable-limits]]). The integrals $\int f_n$ increase and are at most $\int f$ (monotonicity), so $L = \lim\int f_n$ exists in $[0, \infty]$ and $L \le \int f$.

For the reverse inequality, let $\varphi$ be simple with $0 \le \varphi \le f$, and let $0 < t < 1$. Put

$$
E_n = \set{x : f_n(x) \ge t\varphi(x)}.
$$

These sets are measurable and increase with $n$. Their union is $X$: if $\varphi(x) = 0$ then $x \in E_1$; if $\varphi(x) > 0$ then $f(x) \ge \varphi(x) > t\varphi(x)$, so $f_n(x) > t\varphi(x)$ for large $n$. Now $f_n \ge f_n\mathbf{1}_{E_n} \ge t\varphi\mathbf{1}_{E_n}$, so

$$
\int f_n\,d\mu \ \ge\ t\int_{E_n}\varphi\,d\mu.
$$

By [[#lem-simple-well-defined]](4) and continuity from below ([[measure-theory/sigma-algebras#thm-continuity-measure]]), the right-hand side tends to $t\int_X\varphi\,d\mu$. Hence $L \ge t\int\varphi$. Letting $t \to 1$ and then taking the supremum over $\varphi$ gives $L \ge \int f$.
:::

::: intuition Why monotone limits are harmless
The integral of a non-negative function is defined as a supremum of areas of simple functions lying *underneath* the graph. If $f_n$ increases to $f$, every simple function lying under $f$ is — up to a factor $t$ arbitrarily close to $1$ and on sets exhausting the space — eventually under $f_n$. So approximations from below of the limit are eventually approximations from below of the terms, and the suprema must agree. Nothing can be lost, because the graphs only ever move up, and nothing can be gained, because they never pass $f$.
:::

Notice where the proof used the factor $t < 1$: without it, the sets $\set{f_n \ge \varphi}$ need not exhaust $X$ (take $\varphi = f$). The theorem allows $\int f = \infty$, and needs no domination, no uniformity and no finiteness of the measure — only monotonicity and non-negativity.

::: corollary Additivity and series {#cor-additivity}
For measurable $f, g\colon X\to[0,\infty]$, $\int(f + g)\,d\mu = \int f\,d\mu + \int g\,d\mu$. For measurable $f_n\colon X\to[0,\infty]$,

$$
\int_X\sum_{n=1}^\infty f_n\,d\mu = \sum_{n=1}^\infty\int_X f_n\,d\mu.
$$
:::

::: proof
By the simple approximation theorem ([[measure-theory/measurable-functions#thm-simple-approx]]) there are simple $\varphi_n \uparrow f$ and $\psi_n \uparrow g$. Then $\varphi_n + \psi_n$ are simple and increase to $f + g$, so by the monotone convergence theorem and [[#lem-simple-well-defined]](2),

$$
\int(f + g) = \lim\int(\varphi_n + \psi_n) = \lim\Bigl(\int\varphi_n + \int\psi_n\Bigr) = \int f + \int g.
$$

By induction the integral of a finite sum is the sum of the integrals; the partial sums of $\sum f_n$ increase to the full sum, and the monotone convergence theorem finishes.
:::

The series form is a powerful computational tool: for non-negative terms, integration and summation can always be exchanged. In the examples we use the fact, proved later in [[#thm-riemann-lebesgue]], that on a closed bounded interval the Lebesgue integral of a Riemann integrable function is its Riemann integral; we write $\int_a^b f\,dx$ for both.

::: quiz
Let $f_n\colon X\to[0,\infty]$ be measurable. Which statement is always true, with no further hypotheses?
- [ ] $\int\lim_n f_n = \lim_n\int f_n$ whenever $f_n \to f$ pointwise.
- [x] $\int\sum_n f_n = \sum_n\int f_n$.
- [ ] $\int\sup_n f_n = \sup_n\int f_n$.
- [ ] $\int\liminf_n f_n = \liminf_n\int f_n$.
::: solution
Term-by-term integration of a series of non-negative functions is always allowed ([[#cor-additivity]]), because the partial sums increase. The other statements fail: for $f_n = n\mathbf{1}_{(0,1/n)}$ the pointwise limit is $0$ while every integral is $1$, so the first and last fail; and for $f_n = \mathbf{1}_{[n, n+1]}$ we get $\int\sup_n f_n = \infty$ but $\sup_n\int f_n = 1$. Equality for suprema holds when the sequence is increasing — that is the monotone convergence theorem.
:::
:::

::: example Summing a series by integrating {#ex-series}
Show that $\displaystyle\int_0^\infty\frac{x}{e^x - 1}\,dx = \sum_{k=1}^\infty\frac{1}{k^2} = \frac{\pi^2}{6}$.
::: solution
For $x > 0$, $\frac{x}{e^x - 1} = \frac{xe^{-x}}{1 - e^{-x}} = \sum_{k\ge1}xe^{-kx}$, a geometric series with ratio $e^{-x} < 1$. The terms are non-negative, so [[#cor-additivity]] allows term-by-term integration over $(0, \infty)$:

$$
\int_0^\infty\frac{x}{e^x - 1}\,dx = \sum_{k=1}^\infty\int_0^\infty xe^{-kx}\,dx = \sum_{k=1}^\infty\frac{1}{k^2}.
$$

Here $\int_0^\infty xe^{-kx}\,dx = \lim_{N\to\infty}\int_0^N xe^{-kx}\,dx = \frac1{k^2}$ (integration by parts, and monotone convergence for $N\to\infty$). The value $\pi^2/6$ of the sum is Euler's; numerically both sides are $1.6449\ldots$ No uniform convergence was needed — and none is available: the tail $\sum_{k>K}xe^{-kx} = \frac{xe^{-(K+1)x}}{1 - e^{-x}}$ tends to $1$ as $x \to 0^+$ for every $K$, and the interval is infinite. Monotone convergence handles both difficulties at once.
:::
:::

::: widget plot
f: if(x <= n, (1 - x/n)^n, 0); exp(-x)
x: 0, 6
y: 0, 1.05
sliders: n=1:1:40:1
labels: (1 - x/n)^n\,\mathbf{1}_{[0,n]}; e^{-x}
caption: The functions $f_n = (1 - x/n)^n$ on $[0, n]$ (and $0$ beyond) increase with $n$ towards $e^{-x}$. Watch the graphs rise monotonically under the limit curve. By the monotone convergence theorem, $\int_0^n(1 - x/n)^n\,dx \to \int_0^\infty e^{-x}\,dx = 1$ — no uniform convergence on $[0, \infty)$ is needed (indeed the convergence is uniform, but the integrals are over an unbounded interval, where uniform convergence alone would prove nothing).
:::

::: example A limit by monotone convergence {#ex-mct-limit}
Show that $\displaystyle\lim_{n\to\infty}\int_0^n\Bigl(1 - \frac xn\Bigr)^n dx = 1$.
::: solution
Let $f_n(x) = (1 - x/n)^n$ for $0 \le x \le n$ and $f_n(x) = 0$ for $x > n$. For fixed $x$ and $n > x$, write $u = x/n \in [0, 1)$; then $\frac{d}{dn}\bigl[n\ln(1 - x/n)\bigr] = \ln(1 - u) + \frac{u}{1 - u} \ge 0$, since the right-hand side vanishes at $u = 0$ and has derivative $\frac{u}{(1-u)^2} \ge 0$. So $f_n(x)$ increases with $n$ once $n > x$, and before that it is $0$; hence $(f_n)$ is increasing, with limit $e^{-x}$ (from $n\ln(1 - x/n) \to -x$). By the monotone convergence theorem,

$$
\lim_{n\to\infty}\int_0^n\Bigl(1 - \frac xn\Bigr)^ndx = \int_0^\infty e^{-x}\,dx = 1.
$$
:::
:::

## Null sets, Markov's inequality and Fatou's lemma

::: theorem Markov's inequality {#thm-markov}
If $f\colon X\to[0, \infty]$ is measurable and $t > 0$, then

$$
\mu\bigl(\set{f \ge t}\bigr) \le \frac1t\int_X f\,d\mu.
$$
:::

::: proof
$t\,\mathbf{1}_{\set{f\ge t}} \le f$ pointwise, and the left side is a simple function with integral $t\,\mu(\set{f \ge t})$.
:::

Three consequences make precise the idea that integrals ignore null sets.

- If $\int f\,d\mu = 0$ with $f \ge 0$, then $f = 0$ a.e.: $\set{f > 0} = \bigcup_n\set{f \ge 1/n}$, and each of these has measure at most $n\int f = 0$.
- If $\int f\,d\mu < \infty$, then $f < \infty$ a.e.: $\mu(\set{f = \infty}) \le \mu(\set{f \ge n}) \le \frac1n\int f$ for every $n$.
- If $f = g$ a.e. (both non-negative), then $\int f = \int g$: if $N$ is a null set outside which they agree, any simple $\varphi \le f$ satisfies $\int\varphi = \int\varphi\mathbf{1}_{N^c} + \int\varphi\mathbf{1}_N$, where the last term is $0$ and $\varphi\mathbf{1}_{N^c} \le g$; so $\int f \le \int g$, and by symmetry they are equal.

For example $\int_{[0,1]}\mathbf{1}_\Q\,d\lambda = 1\cdot\lambda(\Q\cap[0,1]) = 0$: Dirichlet's function, the villain of [[real-analysis/riemann-integral#ex-dirichlet-integral]], has Lebesgue integral $0$. The second theorem bounds what can happen to integrals when no monotonicity is available.

::: theorem Fatou's lemma {#thm-fatou}
For any measurable functions $f_n\colon X\to[0,\infty]$,

$$
\int_X\liminf_{n\to\infty}f_n\,d\mu \ \le\ \liminf_{n\to\infty}\int_X f_n\,d\mu.
$$
:::

::: proof
Let $g_k = \inf_{n\ge k}f_n$. These are measurable, non-negative, increase with $k$, and $\lim_k g_k = \liminf_n f_n$. Since $g_k \le f_n$ for every $n \ge k$, monotonicity gives $\int g_k \le \inf_{n\ge k}\int f_n$. By the monotone convergence theorem,

$$
\int\liminf_n f_n = \lim_{k\to\infty}\int g_k \le \lim_{k\to\infty}\inf_{n\ge k}\int f_n = \liminf_n\int f_n.
$$
:::

::: example Mass can disappear {#ex-fatou-strict}
Show that the inequality in Fatou's lemma can be strict, using (a) $f_n = n\mathbf{1}_{(0, 1/n)}$ on $[0, 1]$ and (b) $g_n = \mathbf{1}_{[n, n+1]}$ on $\R$.
::: solution
(a) For $x \in (0, 1]$, $f_n(x) = 0$ as soon as $n \ge 1/x$, and $f_n(0) = 0$; so $f_n \to 0$ everywhere and $\int\liminf f_n = 0$. But $\int f_n = n\cdot\frac1n = 1$ for all $n$, so $\liminf\int f_n = 1$. The mass concentrates on ever smaller sets and vanishes "vertically".

(b) $g_n(x) = 0$ once $n > x$, so again the limit is $0$, while $\int g_n = 1$ for all $n$. Here the mass escapes "horizontally", to infinity. In both cases $0 < 1$: in the limit, mass can be lost but never gained.
:::
:::

::: widget plot
f: n^2*x*exp(-n*x)
x: 0, 2
y: 0, 8
sliders: n=1:1:25:1
labels: f_n(x) = n^2xe^{-nx}
caption: Another sequence that loses its mass: $f_n(x) = n^2xe^{-nx}$ tends to $0$ at every $x \ge 0$, but $\int_0^\infty f_n = 1$ for every $n$. Fatou's lemma allows this ($0 \le 1$). The dominated convergence theorem does not apply, and the picture shows why: no single integrable function lies above all the $f_n$ — their upper envelope behaves like $4/(e^2x)$ near $0$, which is not integrable.
:::

## Integrable functions

To integrate functions of both signs we split them as $f = f^+ - f^-$ ([[measure-theory/measurable-functions#thm-measurable-algebra]]) and subtract, provided we never meet $\infty - \infty$.

::: definition Integrable function {#def-integrable}
A measurable $f\colon X\to[-\infty,\infty]$ is **integrable** if $\int_X\abs{f}\,d\mu < \infty$. Its integral is then

$$
\int_X f\,d\mu = \int_X f^+\,d\mu - \int_X f^-\,d\mu,
$$

a difference of two finite numbers (since $f^\pm \le \abs f$). The set of integrable functions is denoted $L^1(\mu)$, or $L^1(X)$, or $L^1(a, b)$ for Lebesgue measure on an interval.
:::

An integrable function is finite almost everywhere (Markov), so changing it on a null set to make it real-valued changes nothing. Note that the definition requires *absolute* integrability: the Lebesgue integral has no "conditionally convergent" integrals, just as unordered sums of real numbers only make sense for absolutely convergent series ([[real-analysis/series#thm-rearrangement-abs]]).

::: theorem Linearity and monotonicity {#thm-integral-linear}
Let $f, g\colon X\to\R$ be integrable and $a, b \in \R$. Then $af + bg$ is integrable and

$$
\int(af + bg)\,d\mu = a\int f\,d\mu + b\int g\,d\mu.
$$

If $f \le g$ a.e., then $\int f\,d\mu \le \int g\,d\mu$; and $\bigl\lvert\int f\,d\mu\bigr\rvert \le \int\abs f\,d\mu$.
:::

::: proof
$\abs{af + bg} \le \abs a\abs f + \abs b\abs g$, which has finite integral by [[#cor-additivity]], so $af + bg$ is integrable. For $h = f + g$ we have $h^+ - h^- = f^+ - f^- + g^+ - g^-$, hence $h^+ + f^- + g^- = h^- + f^+ + g^+$, an identity between non-negative functions. Integrating with [[#cor-additivity]] and subtracting the (finite) quantities $\int h^- + \int f^- + \int g^-$ gives $\int h = \int f + \int g$. For $c \ge 0$, $(cf)^\pm = cf^\pm$; for $c < 0$, $(cf)^\pm = \abs c f^\mp$; either way $\int cf = c\int f$.

If $f \le g$ a.e., then $g - f$ equals a non-negative function a.e., so $\int g - \int f = \int(g - f) \ge 0$. Finally $\bigl\lvert\int f\bigr\rvert = \bigl\lvert\int f^+ - \int f^-\bigr\rvert \le \int f^+ + \int f^- = \int\abs f$.
:::

Now the third and most used convergence theorem. It follows from Fatou's lemma by a clever choice of non-negative functions.

::: theorem Dominated convergence theorem {#thm-dct}
Let $f_n$ be measurable functions with $f_n \to f$ almost everywhere, and suppose there is an integrable $g$ with $\abs{f_n} \le g$ a.e. for every $n$. Then $f$ is integrable,

$$
\int_X\abs{f_n - f}\,d\mu \to 0, \qquad\text{and in particular}\qquad \int_X f_n\,d\mu \to \int_X f\,d\mu.
$$
:::

::: proof
Changing all the functions on a null set changes no integral, so we may assume (redefining them as $0$ on a suitable null set) that $f_n \to f$ and $\abs{f_n} \le g$ everywhere, with $g$ finite. Then $f$ is measurable and $\abs f \le g$, so $f$ is integrable. The functions $2g - \abs{f_n - f}$ are non-negative (as $\abs{f_n - f} \le \abs{f_n} + \abs f \le 2g$) and converge to $2g$. Fatou's lemma gives

$$
\int 2g\,d\mu \le \liminf_n\int\bigl(2g - \abs{f_n - f}\bigr)d\mu = \int 2g\,d\mu - \limsup_n\int\abs{f_n - f}\,d\mu.
$$

Since $\int 2g < \infty$ we may cancel it: $\limsup_n\int\abs{f_n - f} \le 0$, so $\int\abs{f_n - f} \to 0$. Finally $\bigl\lvert\int f_n - \int f\bigr\rvert \le \int\abs{f_n - f}$ by [[#thm-integral-linear]].
:::

::: warning The dominating function must not depend on n
The bound $\abs{f_n} \le g$ must hold with *one* integrable $g$ for all $n$. In [[#ex-fatou-strict]] each $f_n = n\mathbf{1}_{(0,1/n)}$ is integrable, but the smallest function above all of them, $\sup_n f_n$, is about $1/x$ near $0$ and is not integrable — and the conclusion of the theorem fails. When applying the theorem, write the dominating function down explicitly and check that it is integrable.
:::

::: example Dominated convergence at work {#ex-dct}
Find $\displaystyle\lim_{n\to\infty}\int_0^\infty\frac{n\sin(x/n)}{x(1 + x^2)}\,dx$.
::: solution
Let $f_n(x) = \frac{n\sin(x/n)}{x(1+x^2)}$ for $x > 0$. Since $\frac{\sin u}{u} \to 1$ as $u \to 0$, for fixed $x$ we have $n\sin(x/n) = x\cdot\frac{\sin(x/n)}{x/n} \to x$, so $f_n(x) \to \frac{1}{1+x^2}$. Since $\abs{\sin u} \le \abs u$, $\abs{f_n(x)} \le \frac{x}{x(1+x^2)} = \frac{1}{1 + x^2}$, which is integrable on $(0, \infty)$ with integral $\lim_{N}\arctan N = \frac\pi2$ (monotone convergence). By the dominated convergence theorem,

$$
\lim_{n\to\infty}\int_0^\infty\frac{n\sin(x/n)}{x(1+x^2)}\,dx = \int_0^\infty\frac{dx}{1 + x^2} = \frac{\pi}{2}.
$$

(Numerically the integral is $1.4948$ for $n = 10$ and $1.5700$ for $n = 1000$.)
:::
:::

::: remark Choosing a convergence theorem
To show $\int f_n \to \int f$, run through the following checks.

| situation | tool | what to verify |
|---|---|---|
| $0 \le f_1 \le f_2 \le \cdots$ | monotone convergence | measurability, non-negativity, monotonicity |
| non-negative series $\sum f_n$ | [[#cor-additivity]] | non-negativity of the terms |
| $f_n \to f$ a.e., $\abs{f_n} \le g$ | dominated convergence | an explicit $g$, independent of $n$, with $\int g < \infty$ |
| $f_n \ge 0$, only an inequality needed | Fatou's lemma | non-negativity |
| bounded $f_n$ on a finite measure space | dominated convergence with $g$ constant | a uniform bound $\abs{f_n} \le M$ and $\mu(X) < \infty$ |

If none applies, look for the mass escaping — upwards, as in $n\mathbf{1}_{(0,1/n)}$, or to infinity, as in $\mathbf{1}_{[n,n+1]}$ — before trying to prove convergence: the integrals may simply not converge to the integral of the limit.
:::

::: quiz
Which justification is correct for $\displaystyle\lim_{n\to\infty}\int_0^1 x^n\,dx = 0$ using the Lebesgue theory?
- [ ] The monotone convergence theorem, since $x^n \to 0$.
- [x] The dominated convergence theorem with $g = 1$ on $[0, 1]$.
- [ ] Uniform convergence of $x^n$ on $[0, 1]$.
- [ ] Fatou's lemma, which gives equality here.
::: solution
$x^n \to 0$ for $x \in [0, 1)$, hence almost everywhere on $[0,1]$, and $\abs{x^n} \le 1$, which is integrable on $[0, 1]$ (finite measure). So dominated convergence gives the limit $\int 0 = 0$. The monotone convergence theorem as stated needs an *increasing* sequence (here it decreases); the convergence is not uniform; and Fatou's lemma only gives the inequality $0 \le \liminf\int x^n$.
:::
:::

## Riemann and Lebesgue

Does the new integral agree with the old one? For Riemann integrable functions, yes; and the proof also gives Lebesgue's characterisation of Riemann integrability.

::: theorem Riemann integrable functions are Lebesgue integrable {#thm-riemann-lebesgue}
Let $f\colon[a, b]\to\R$ be bounded.

1. If $f$ is Riemann integrable, then $f$ is Lebesgue measurable and integrable, and $\int_{[a,b]}f\,d\lambda = \int_a^b f(x)\,dx$.
2. (**Lebesgue's criterion.**) $f$ is Riemann integrable if and only if the set of points at which $f$ is discontinuous has Lebesgue measure $0$.
:::

::: proof
Choose partitions $P_1 \subseteq P_2 \subseteq \cdots$ of $[a, b]$, each refining the previous one, whose mesh (longest subinterval) tends to $0$; if $f$ is Riemann integrable, choose them also with $U(f, P_k) - L(f, P_k) \to 0$ (possible by [[real-analysis/riemann-integral#thm-riemann-criterion]] and refinement). Let $\ell_k$ and $u_k$ be the step functions equal, on the interior of each subinterval $I$ of $P_k$, to $\inf_I f$ and $\sup_I f$ respectively, and equal to $f$ at the finitely many partition points. Then $\ell_k \le f \le u_k$, the $\ell_k$ increase and the $u_k$ decrease (refinement), and

$$
\int\ell_k\,d\lambda = L(f, P_k), \qquad \int u_k\,d\lambda = U(f, P_k).
$$

Let $\ell = \lim\ell_k$ and $u = \lim u_k$; they are Borel measurable, $\ell \le f \le u$, and by dominated convergence (all functions are bounded by $\sup\abs f$ on a set of finite measure) $\int\ell = \lim L(f, P_k)$ and $\int u = \lim U(f,P_k)$.

*Key observation.* Let $x$ be a point that is not a partition point of any $P_k$ (all but countably many points are such). Then $u(x) = \ell(x)$ if and only if $f$ is continuous at $x$. Indeed, if $f$ is continuous at $x$ and $\eps > 0$, choose $\delta$ with $\abs{f(y) - f(x)} < \eps$ for $\abs{y - x} < \delta$; once the mesh is below $\delta$, the subinterval of $P_k$ containing $x$ lies within $\delta$ of $x$, so $u_k(x) - \ell_k(x) \le 2\eps$. Conversely, if $u(x) = \ell(x)$ and $\eps > 0$, some $k$ has $u_k(x) - \ell_k(x) < \eps$; $x$ lies in the interior of a subinterval $I$ of $P_k$, and every $y \in I$ satisfies $\abs{f(y) - f(x)} \le \sup_I f - \inf_I f < \eps$. So $f$ is continuous at $x$.

(1) If $f$ is Riemann integrable, $\int(u - \ell)\,d\lambda = \lim\bigl(U(f, P_k) - L(f, P_k)\bigr) = 0$, so $u = \ell$ a.e. (Markov), hence $f = \ell$ a.e. Since $\lambda$ is complete, $f$ is Lebesgue measurable, and $\int f\,d\lambda = \int\ell\,d\lambda = \lim L(f, P_k) = \int_a^b f$.

(2) By the key observation, the set $D$ of discontinuities of $f$ differs from $\set{u \ne \ell}$ only by countably many points. If $f$ is Riemann integrable, $\set{u \ne \ell}$ is null by (1), so $D$ is null. Conversely, if $D$ is null then $u = \ell$ a.e., so $\lim(U(f, P_k) - L(f, P_k)) = \int(u - \ell) = 0$, and $f$ is Riemann integrable by Riemann's criterion.
:::

This settles [[real-analysis/riemann-integral#thm-lebesgue-criterion]], stated without full proof in the Riemann chapter. The Lebesgue integral is a genuine extension: Dirichlet's function is Lebesgue integrable but not Riemann integrable, and unbounded functions need no special treatment — for instance $\int_{(0,1]}x^{-1/2}\,d\lambda = \lim_n\int_{1/n}^1x^{-1/2}\,dx = \lim(2 - 2/\sqrt n) = 2$ by monotone convergence applied to $x^{-1/2}\mathbf{1}_{[1/n, 1]}$.

::: remark Improper integrals
One case is *not* covered: conditionally convergent improper integrals. The improper Riemann integral $\int_0^\infty\frac{\sin x}{x}\,dx = \lim_{N\to\infty}\int_0^N\frac{\sin x}{x}\,dx$ exists (and equals $\pi/2$), but $\frac{\sin x}{x}$ is not Lebesgue integrable on $(0,\infty)$: on $[k\pi, (k+1)\pi]$ the integral of $\abs{\sin x}/x$ is at least $\frac{2}{(k+1)\pi}$, and these add up to $\infty$ like the harmonic series. For non-negative functions, by contrast, improper Riemann integrals and Lebesgue integrals always agree, by the monotone convergence theorem.
:::

## Differentiating under the integral sign

The dominated convergence theorem turns many classical manipulations into theorems. The most useful is differentiation of a parameter-dependent integral.

::: theorem Differentiation under the integral sign {#thm-diff-under-integral}
Let $(a, b)$ be an open interval and $f\colon X\times(a, b)\to\R$ a function such that

1. $x \mapsto f(x, t)$ is integrable for every $t \in (a, b)$;
2. $t \mapsto f(x, t)$ is differentiable for every $x$;
3. there is an integrable $g$ with $\bigl\lvert\frac{\partial f}{\partial t}(x, t)\bigr\rvert \le g(x)$ for all $x$ and $t$.

Then $F(t) = \int_X f(x, t)\,d\mu(x)$ is differentiable on $(a, b)$ and $F'(t) = \displaystyle\int_X\frac{\partial f}{\partial t}(x, t)\,d\mu(x)$.
:::

::: proof
Fix $t$ and let $h_n \to 0$ with $h_n \ne 0$ and $t + h_n \in (a, b)$. The difference quotients

$$
q_n(x) = \frac{f(x, t + h_n) - f(x, t)}{h_n}
$$

are measurable and converge to $\frac{\partial f}{\partial t}(x, t)$ for every $x$, which is therefore measurable. By the mean value theorem ([[real-analysis/differentiation#thm-mvt]]), $q_n(x) = \frac{\partial f}{\partial t}(x, s)$ for some $s$ between $t$ and $t + h_n$, so $\abs{q_n(x)} \le g(x)$. By dominated convergence and linearity,

$$
\frac{F(t + h_n) - F(t)}{h_n} = \int_X q_n\,d\mu \ \longrightarrow\ \int_X\frac{\partial f}{\partial t}(x, t)\,d\mu(x).
$$

Since this holds for every sequence $h_n \to 0$, the sequential criterion for limits ([[real-analysis/continuity#thm-sequential-limit]]) gives the derivative.
:::

::: example A Gaussian integral {#ex-gaussian}
Let $F(t) = \displaystyle\int_0^\infty e^{-x^2}\cos(tx)\,dx$. Given $F(0) = \frac{\sqrt\pi}{2}$, show that $F(t) = \frac{\sqrt\pi}{2}e^{-t^2/4}$.
::: solution
The integrand is integrable (bounded by $e^{-x^2}$), and $\bigl\lvert\frac{\partial}{\partial t}e^{-x^2}\cos(tx)\bigr\rvert = \abs{xe^{-x^2}\sin(tx)} \le xe^{-x^2}$, which is integrable on $(0, \infty)$ and independent of $t$. By [[#thm-diff-under-integral]],

$$
F'(t) = -\int_0^\infty xe^{-x^2}\sin(tx)\,dx = \Bigl[\tfrac12e^{-x^2}\sin(tx)\Bigr]_0^\infty - \frac t2\int_0^\infty e^{-x^2}\cos(tx)\,dx = -\frac t2F(t),
$$

integrating by parts on $[0, N]$ and letting $N\to\infty$. So $\frac{d}{dt}\bigl(e^{t^2/4}F(t)\bigr) = e^{t^2/4}\bigl(F'(t) + \frac t2F(t)\bigr) = 0$, and $e^{t^2/4}F(t) = F(0)$. Hence $F(t) = \frac{\sqrt\pi}2e^{-t^2/4}$ — the computation behind the Fourier transform of the Gaussian ([[pde/fourier-transform]]).
:::
:::

::: application Expectations
In probability theory the integral of a random variable $X$ on a probability space $(\Omega, \mathcal{F}, P)$ is its **expectation**, $\E[X] = \int_\Omega X\,dP$. The theorems of this chapter become the basic rules of the subject: Markov's inequality $P(\abs X \ge t) \le \E\abs X/t$; linearity of expectation; $\E\bigl[\sum X_n\bigr] = \sum\E[X_n]$ for non-negative $X_n$ (so the expected number of events that occur among $A_1, A_2, \dots$ is $\sum P(A_n)$); and the exchange of limits and expectations under domination, used throughout [[probability/limit-theorems]].
:::

::: history
Henri Lebesgue presented his integral in his 1902 thesis *Intégrale, longueur, aire* and in his *Leçons sur l'intégration et la recherche des fonctions primitives* (1904); the thesis already contains the bounded convergence theorem, a special case of the dominated convergence theorem, which Lebesgue later proved in general. Beppo Levi proved the monotone convergence theorem in 1906, and in the same year Pierre Fatou's thesis on trigonometric and Taylor series contained the lemma now named after him. Giuseppe Vitali found in 1907 the exact condition (uniform integrability) under which limits and integrals can be exchanged on finite measure spaces. The construction of the integral on an abstract measure space, as in this chapter, was developed in the following decades, notably by Fréchet (1915) and in the measure-theoretic probability of Kolmogorov (1933).
:::

## Where this leads

The integral of this chapter is the foundation of modern analysis and probability. In [[measure-theory/lp-spaces]] the integrable functions become the normed space $L^1$, joined by the spaces $L^p$ of functions with $\int\abs f^p < \infty$; we prove they are complete — the Riesz–Fischer theorem, whose proof is a direct application of the monotone convergence theorem and Fatou's lemma — and compare the many ways in which functions can converge. In probability ([[probability/expectation]]) the integral is the **expectation** $\E[X] = \int X\,dP$, and the convergence theorems justify exchanging limits and expectations throughout [[probability/limit-theorems]]. Fubini's theorem on iterated integrals, the Fourier transform ([[pde/fourier-transform]]) and the theory of differential equations all rest on the theorems proved here.

::: summary
- For non-negative simple functions $\int\sum c_k\mathbf{1}_{E_k} = \sum c_k\mu(E_k)$; for non-negative measurable $f$, $\int f$ is the supremum of the integrals of simple functions below $f$.
- **Monotone convergence**: if $0 \le f_n \uparrow f$, then $\int f_n \to \int f$ ([[#thm-monotone-convergence]]). Consequences: additivity, and term-by-term integration of non-negative series.
- Markov's inequality $\mu(f \ge t) \le \frac1t\int f$; $\int\abs{f} = 0$ iff $f = 0$ a.e.; integrals ignore null sets.
- **Fatou**: $\int\liminf f_n \le \liminf\int f_n$ for $f_n \ge 0$; mass can vanish in the limit but not appear.
- $f$ is integrable if $\int\abs f < \infty$, and $\int f = \int f^+ - \int f^-$; the integral is linear and monotone.
- **Dominated convergence**: $f_n \to f$ a.e. and $\abs{f_n} \le g \in L^1$ imply $\int\abs{f_n - f} \to 0$ ([[#thm-dct]]); it justifies differentiating under the integral sign.
- Riemann integrable functions are Lebesgue integrable with the same integral, and a bounded function is Riemann integrable exactly when its discontinuities form a null set ([[#thm-riemann-lebesgue]]).
:::

## Exercises

::: exercise Integrating a simple function {level=1 check="10"}
Compute $\int_\R\varphi\,d\lambda$ for $\varphi = 2\cdot\mathbf{1}_{[0,2]} + 3\cdot\mathbf{1}_{[1,3]}$.
::: solution
By [[#lem-simple-well-defined]](2) the integral is additive, so it equals $2\lambda([0, 2]) + 3\lambda([1, 3]) = 4 + 6 = 10$. Using the canonical form of [[measure-theory/measurable-functions#ex-canonical]] gives $2\cdot1 + 5\cdot1 + 3\cdot1 = 10$ as well.
:::
:::

::: exercise Thomae's function {level=1 check="0"}
Compute $\int_{[0,1]}T\,d\lambda$, where $T$ is Thomae's function ([[real-analysis/continuity#ex-thomae]]).
::: solution
$T = 0$ except on the countable set $\Q\cap[0,1]$, which is null. So $T = 0$ a.e. and $\int T\,d\lambda = 0$, in agreement with the Riemann integral computed in [[real-analysis/riemann-integral#ex-thomae-integral]].
:::
:::

::: exercise An unbounded integrand {level=1 check="3/2"}
Compute $\int_{(0, 1]}x^{-1/3}\,d\lambda$.
::: solution
The functions $f_n = x^{-1/3}\mathbf{1}_{[1/n, 1]}$ increase to $x^{-1/3}$ on $(0,1]$, and $\int f_n = \int_{1/n}^1x^{-1/3}\,dx = \frac32\bigl(1 - n^{-2/3}\bigr)$ by the fundamental theorem of calculus and [[#thm-riemann-lebesgue]]. By the monotone convergence theorem the integral is $\lim\frac32(1 - n^{-2/3}) = \frac32$.
:::
:::

::: exercise A limit of integrals {level=2 check="e - 1"}
Find $\displaystyle\lim_{n\to\infty}\int_0^1\Bigl(1 + \frac xn\Bigr)^ndx$, naming the convergence theorem you use.
::: solution
For each $x \in [0, 1]$, $(1 + x/n)^n \to e^x$ (the logarithm $n\ln(1 + x/n) \to x$). Since $\ln(1 + u) \le u$, we have $(1 + x/n)^n \le e^x \le e$ on $[0, 1]$, and the constant $e$ is integrable on $[0,1]$. By dominated convergence the limit is $\int_0^1e^x\,dx = e - 1$. (The sequence is also increasing in $n$, so monotone convergence works too.)
:::
:::

::: exercise A series integrated term by term {level=2 check="pi^2/6"}
Show that $\displaystyle\int_0^1\frac{-\ln x}{1 - x}\,dx = \sum_{k=1}^\infty\frac{1}{k^2}$, and hence find its value.
::: hint
Expand $\frac{1}{1-x} = \sum_{k\ge0}x^k$ and use $\int_0^1x^k(-\ln x)\,dx = \frac{1}{(k+1)^2}$.
:::
::: solution
For $0 < x < 1$, $\frac{-\ln x}{1-x} = \sum_{k\ge0}x^k(-\ln x)$, a series of non-negative terms. By [[#cor-additivity]],

$$
\int_0^1\frac{-\ln x}{1 - x}\,dx = \sum_{k=0}^\infty\int_0^1x^k(-\ln x)\,dx = \sum_{k=0}^\infty\frac{1}{(k+1)^2} = \frac{\pi^2}{6}.
$$

The integrals $\int_0^1x^k(-\ln x)\,dx = \frac{1}{(k+1)^2}$ follow from integration by parts on $[\delta, 1]$ and monotone convergence as $\delta \to 0$.
:::
:::

::: exercise Fatou needs non-negativity {level=2}
Let $f_n = -\mathbf{1}_{[n, n+1]}$ on $\R$. Compute $\int\liminf_n f_n\,d\lambda$ and $\liminf_n\int f_n\,d\lambda$, and explain why Fatou's lemma is not contradicted.
::: solution
$f_n(x) = 0$ once $n > x$, so $\liminf_n f_n = 0$ and $\int\liminf f_n = 0$. But $\int f_n = -1$ for every $n$, so $\liminf\int f_n = -1$. Here $\int\liminf f_n = 0 > -1 = \liminf\int f_n$, the reverse of Fatou's inequality. There is no contradiction because the $f_n$ are not non-negative; the lemma does hold for functions bounded below by a fixed integrable function, $f_n \ge -g$ (apply it to $f_n + g$).
:::
:::

::: exercise Zero integral {level=2}
Let $f$ be integrable. Prove that $\int_A f\,d\mu = 0$ for every $A \in \mathcal{A}$ if and only if $f = 0$ almost everywhere.
::: solution
If $f = 0$ a.e., then $f\mathbf{1}_A = 0$ a.e., so $\int_A f = 0$. Conversely, take $A = \set{f > 0}$: then $\int f^+ = \int_A f = 0$, so $f^+ = 0$ a.e. by the first consequence of Markov's inequality. Similarly $A = \set{f < 0}$ gives $\int f^- = -\int_A f = 0$ and $f^- = 0$ a.e. So $f = f^+ - f^- = 0$ a.e.
:::
:::

::: exercise Series of integrable functions {level=3}
Let $f_n$ be integrable with $\sum_n\int\abs{f_n}\,d\mu < \infty$. Prove that $\sum_n f_n(x)$ converges absolutely for almost every $x$, that its sum $f$ is integrable, and that $\int f\,d\mu = \sum_n\int f_n\,d\mu$.
::: hint
Apply [[#cor-additivity]] to $G = \sum\abs{f_n}$, then dominated convergence to the partial sums.
:::
::: solution
Let $G = \sum_n\abs{f_n}$, a measurable function with values in $[0, \infty]$. By [[#cor-additivity]], $\int G = \sum\int\abs{f_n} < \infty$, so $G < \infty$ a.e. (Markov). Where $G(x) < \infty$ the series $\sum f_n(x)$ converges absolutely; let $f$ be its sum there and $0$ elsewhere. The partial sums $S_N = \sum_{n\le N}f_n$ converge to $f$ a.e. and satisfy $\abs{S_N} \le G$, which is integrable. By dominated convergence and linearity, $\int f = \lim_N\int S_N = \lim_N\sum_{n\le N}\int f_n = \sum_n\int f_n$.
:::
:::

::: exercise Absolute continuity of the integral {level=3}
Let $f$ be integrable. Prove that for every $\eps > 0$ there is $\delta > 0$ such that $\int_A\abs{f}\,d\mu < \eps$ whenever $\mu(A) < \delta$.
::: hint
Truncate: $\min(\abs f, n) \uparrow \abs f$.
:::
::: solution
Let $g_n = \min(\abs f, n)$. These increase to $\abs f$, so by the monotone convergence theorem $\int(\abs f - g_n) \to 0$; choose $n$ with $\int(\abs f - g_n) < \eps/2$. Let $\delta = \eps/(2n)$. If $\mu(A) < \delta$, then

$$
\int_A\abs f\,d\mu = \int_A(\abs f - g_n)\,d\mu + \int_Ag_n\,d\mu \le \frac\eps2 + n\,\mu(A) < \frac\eps2 + \frac\eps2 = \eps.
$$

(For an integrable function, small sets carry small integrals — the property that fails for the sequence $n\mathbf{1}_{(0, 1/n)}$, whose members are integrable but not *uniformly* so.)
:::
:::
