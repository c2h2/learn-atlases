What could $1 - 1 + 1 - 1 + \cdots$ possibly mean? Grouped as $(1 - 1) + (1 - 1) + \cdots$ it looks like $0$; grouped as $1 + (-1 + 1) + (-1 + 1) + \cdots$ it looks like $1$. Worse, the alternating harmonic series

$$
1 - \frac12 + \frac13 - \frac14 + \frac15 - \cdots
$$

has a perfectly good sum, $\ln 2 \approx 0.693$, but if we merely change the *order* of its terms — one positive term followed by two negative ones — the sum becomes $\tfrac12\ln 2$. Infinite sums do not obey the rules of finite ones automatically. This chapter finds out exactly which rules survive and why.

An infinite series is nothing more than a sequence in disguise: the sequence of its partial sums. So everything rests on [[real-analysis/sequences]]: the monotone convergence theorem handles series of positive terms, and the Cauchy criterion handles everything else. You have used the convergence tests before in [[calculus-2/series]] and [[calculus-2/convergence-tests]]; here we prove them, see where each one stops working, and meet the theorem of Riemann that explains the strange behaviour above.

## Series and partial sums

::: definition Series and its sum {#def-series}
Let $(a_n)_{n\ge1}$ be a sequence of real numbers. The **series** $\sum_{n=1}^\infty a_n$ is the sequence of **partial sums**

$$
S_N = a_1 + a_2 + \cdots + a_N = \sum_{n=1}^N a_n \qquad (N \in \N).
$$

The series **converges** with **sum** $S$, written $\sum_{n=1}^\infty a_n = S$, if $S_N \to S$ as $N \to \infty$. Otherwise it **diverges**; if $S_N \to \infty$ we write $\sum a_n = \infty$.
:::

The same symbol $\sum a_n$ is used for the series and (when it exists) for its sum. Series may start at any index, such as $n = 0$; starting later or changing finitely many terms changes the sum but not whether the series converges. Because sums and constant multiples of convergent sequences converge ([[real-analysis/sequences#thm-algebra-limits]]), convergent series can be added term by term: $\sum(a_n + b_n) = \sum a_n + \sum b_n$ and $\sum c\,a_n = c\sum a_n$.

::: example The geometric series {#ex-geometric}
Show that $\sum_{n=0}^\infty r^n = \dfrac{1}{1 - r}$ when $\abs{r} < 1$, and that the series diverges when $\abs{r} \ge 1$.
::: solution
For $r \ne 1$ the partial sums can be computed exactly: multiplying $S_N = 1 + r + \cdots + r^N$ by $1 - r$ makes everything cancel except the ends, so

$$
S_N = \frac{1 - r^{N+1}}{1 - r}.
$$

If $\abs{r} < 1$ then $r^{N+1} \to 0$ ([[real-analysis/sequences#ex-standard]]), so $S_N \to \dfrac{1}{1-r}$. If $\abs{r} \ge 1$, then $\abs{r^n} \ge 1$ for all $n$, so the terms do not tend to $0$ and the series diverges by the term test below. For example $\sum_{n=1}^\infty 2^{-n} = \frac{1}{1 - 1/2} - 1 = 1$, which settles Zeno's paradox of the runner who must first cover half the distance, then a quarter, and so on.
:::
:::

The geometric series is the yardstick against which most other series are measured. The Cauchy criterion for sequences, applied to partial sums, gives a test that uses only the terms.

::: theorem Cauchy criterion for series {#thm-cauchy-series}
The series $\sum a_n$ converges if and only if for every $\eps > 0$ there is $N$ such that

$$
\abs{a_{m+1} + a_{m+2} + \cdots + a_n} < \eps \qquad\text{for all } n > m \ge N.
$$
:::

::: proof
The sum inside the absolute value is $S_n - S_m$. So the condition says exactly that $(S_N)$ is a Cauchy sequence, and by the Cauchy criterion for sequences ([[real-analysis/sequences#thm-cauchy]]) this holds if and only if $(S_N)$ converges.
:::

::: corollary The term test {#thm-term-test}
If $\sum a_n$ converges, then $a_n \to 0$. Equivalently, if $a_n \not\to 0$, the series diverges.
:::

::: proof
Take $n = m + 1$ in [[#thm-cauchy-series]]: for every $\eps > 0$ there is $N$ with $\abs{a_{m+1}} < \eps$ for all $m \ge N$. Alternatively: $a_n = S_n - S_{n-1} \to S - S = 0$.
:::

::: warning The term test only proves divergence
"$a_n \to 0$" is *necessary* for convergence but nowhere near sufficient. The harmonic series $\sum 1/n$ has terms tending to $0$, yet $\sum_{n=1}^N 1/n \to \infty$: the block of terms from $\frac{1}{m+1}$ to $\frac{1}{2m}$ always adds up to at least $\frac12$, so the Cauchy condition fails (this is [[real-analysis/sequences#exr-2-6]]). Never conclude convergence from $a_n \to 0$ alone.
:::

## Series with non-negative terms

When $a_n \ge 0$ for all $n$, the partial sums increase, and the monotone convergence theorem ([[real-analysis/sequences#thm-monotone]]) immediately gives the basic principle of this section.

::: proposition Bounded partial sums {#prop-nonneg}
A series of non-negative terms converges if and only if its partial sums are bounded above. Otherwise $\sum a_n = \infty$.
:::

So for non-negative series the only question is whether the partial sums stay bounded, and we can answer it by comparison with series we already understand.

::: theorem Comparison tests {#thm-comparison}
1. (**Comparison.**) If $0 \le a_n \le b_n$ for all $n \ge N_0$ and $\sum b_n$ converges, then $\sum a_n$ converges. Equivalently, if $\sum a_n$ diverges, so does $\sum b_n$.
2. (**Limit comparison.**) If $a_n > 0$, $b_n > 0$ and $a_n/b_n \to c$ with $0 < c < \infty$, then $\sum a_n$ and $\sum b_n$ either both converge or both diverge.
:::

::: proof
(1) Changing finitely many terms does not affect convergence, so we may assume $0 \le a_n \le b_n$ for all $n$. Then $\sum_{n=1}^N a_n \le \sum_{n=1}^N b_n \le \sum_{n=1}^\infty b_n$, so the partial sums of $\sum a_n$ are bounded and [[#prop-nonneg]] applies.

(2) With $\eps = c/2$ there is $N_0$ such that $\abs{a_n/b_n - c} < c/2$, that is $\tfrac{c}{2}b_n < a_n < \tfrac{3c}{2}b_n$, for $n \ge N_0$. If $\sum b_n$ converges, so does $\sum \tfrac{3c}{2}b_n$, and part (1) gives convergence of $\sum a_n$. If $\sum a_n$ converges, so does $\sum \tfrac2c a_n$, and since $b_n < \tfrac{2}{c}a_n$ part (1) gives convergence of $\sum b_n$.
:::

To use comparison we need a stock of series whose behaviour we know. Geometric series are one family; the $p$-series are the other, and the cleanest way to settle them is a remarkable test due to Cauchy that thins a series out to a geometric-looking one.

::: theorem Cauchy condensation test {#thm-condensation}
Let $(a_n)$ be decreasing with $a_n \ge 0$. Then $\sum_{n=1}^\infty a_n$ converges if and only if

$$
\sum_{k=0}^\infty 2^k a_{2^k} = a_1 + 2a_2 + 4a_4 + 8a_8 + \cdots
$$

converges.
:::

::: proof
Let $S_N = \sum_{n=1}^N a_n$ and $T_K = \sum_{k=0}^K 2^k a_{2^k}$. Group the terms of $S$ into blocks according to powers of $2$.

*Upper bound.* The block $a_{2^k} + a_{2^k + 1} + \cdots + a_{2^{k+1} - 1}$ has $2^k$ terms, each at most $a_{2^k}$ because the sequence decreases. Summing over $k = 0, \dots, K$,

$$
S_{2^{K+1} - 1} \le \sum_{k=0}^K 2^k a_{2^k} = T_K.
$$

*Lower bound.* The block $a_{2^{k-1}+1} + \cdots + a_{2^k}$ has $2^{k-1}$ terms, each at least $a_{2^k}$. Summing over $k = 1, \dots, K$ and adding $a_1$,

$$
S_{2^K} \ge a_1 + \sum_{k=1}^K 2^{k-1}a_{2^k} \ge \frac12\Bigl(a_1 + \sum_{k=1}^K 2^k a_{2^k}\Bigr) = \frac12 T_K.
$$

If $(T_K)$ is bounded by $B$, then for every $N$ we can choose $K$ with $N \le 2^{K+1} - 1$, and $S_N \le S_{2^{K+1}-1} \le B$; so $(S_N)$ is bounded. If $(S_N)$ is bounded by $B$, then $T_K \le 2S_{2^K} \le 2B$. By [[#prop-nonneg]] the two series converge or diverge together.
:::

::: example The p-series {#ex-p-series}
Prove that $\displaystyle\sum_{n=1}^\infty \frac{1}{n^p}$ converges if $p > 1$ and diverges if $p \le 1$.
::: solution
If $p \le 0$ the terms $n^{-p} \ge 1$ do not tend to $0$, so the series diverges by [[#thm-term-test]]. If $p > 0$ the terms are positive and decreasing, so [[#thm-condensation]] applies, and the condensed series is

$$
\sum_{k=0}^\infty 2^k\cdot\frac{1}{(2^k)^p} = \sum_{k=0}^\infty \bigl(2^{1-p}\bigr)^k,
$$

a geometric series with ratio $r = 2^{1-p} > 0$. It converges if and only if $r < 1$, that is $1 - p < 0$, that is $p > 1$. In particular the harmonic series ($p = 1$) diverges and $\sum 1/n^2$ converges. (Its sum is $\pi^2/6$, a famous result of Euler, which can be proved with Fourier series: see [[pde/fourier-series]].)
:::
:::

::: widget sequence
a: 1/n^p
mode: sums
N: 60
sliders: p=2:0.5:3:0.05
y: 0, 6
caption: Partial sums of $\sum 1/n^p$. At $p = 2$ they level off near $\pi^2/6 \approx 1.645$. Slide $p$ down towards $1$: the partial sums still level off for every $p > 1$, but ever more slowly and at a higher value, and at $p = 1$ they creep upwards like $\ln N$ forever. The boundary $p = 1$ is invisible in the terms (all of them tend to $0$) — it shows only in how fast they do so.
:::

With the $p$-series in hand, limit comparison decides most series whose terms are built from powers of $n$. For instance $\sum \frac{n+1}{n^3 + 2}$ converges, because its terms divided by $1/n^2$ tend to $1$; and $\sum \frac{1}{\sqrt{n^2+n}}$ diverges, by comparison with $\sum 1/n$.

::: quiz
For which series does the limit comparison test with $\sum 1/n^2$ prove convergence?
- [x] $\displaystyle\sum \frac{3n^2 - 1}{n^4 + n}$
- [ ] $\displaystyle\sum \frac{n}{n^2 + 1}$
- [ ] $\displaystyle\sum \frac{\ln n}{n^2}$
- [x] $\displaystyle\sum \sin\frac{1}{n^2}$
::: solution
For the first, $\frac{3n^2-1}{n^4+n}\big/\frac1{n^2} = \frac{3n^4 - n^2}{n^4 + n} \to 3$. For the last, $\sin(1/n^2)\big/(1/n^2) \to 1$ by the limit $\sin x/x \to 1$. In both cases the ratio has a finite positive limit, so the series converges. The second behaves like $1/n$ (ratio with $1/n$ tends to $1$) and diverges. For the third the ratio with $1/n^2$ is $\ln n \to \infty$, so limit comparison with $1/n^2$ says nothing — though the series does converge, by comparison with $1/n^{3/2}$, since $\ln n \le \sqrt n$ for all $n$.
:::
:::

## Absolute convergence and the root and ratio tests

For series with terms of both signs, cancellation can help a series converge. The simplest situation is when we do not need any cancellation at all.

::: definition Absolute and conditional convergence {#def-absolute}
A series $\sum a_n$ **converges absolutely** if $\sum\abs{a_n}$ converges. A series that converges but does not converge absolutely **converges conditionally**.
:::

::: theorem Absolute convergence implies convergence {#thm-absolute}
If $\sum\abs{a_n}$ converges, then $\sum a_n$ converges, and $\bigl\lvert\sum a_n\bigr\rvert \le \sum \abs{a_n}$.
:::

::: proof
Let $\eps > 0$. By [[#thm-cauchy-series]] applied to $\sum\abs{a_n}$, there is $N$ such that $\abs{a_{m+1}} + \cdots + \abs{a_n} < \eps$ for all $n > m \ge N$. By the triangle inequality,

$$
\abs{a_{m+1} + \cdots + a_n} \le \abs{a_{m+1}} + \cdots + \abs{a_n} < \eps,
$$

so $\sum a_n$ satisfies the Cauchy criterion and converges. Finally $\abs{S_N} \le \sum_{n=1}^N\abs{a_n} \le \sum_{n=1}^\infty\abs{a_n}$ for every $N$, and the inequality passes to the limit ([[real-analysis/sequences#thm-order-limits]]).
:::

The two most powerful tests for absolute convergence compare a series with a geometric one. They use the upper limit $\limsup$ of [[real-analysis/sequences#def-limsup]], which exists for every sequence of non-negative numbers (possibly as $\infty$).

::: theorem Root test {#thm-root}
Let $\alpha = \limsup_{n\to\infty}\abs{a_n}^{1/n}$.

1. If $\alpha < 1$, then $\sum a_n$ converges absolutely.
2. If $\alpha > 1$, then $\sum a_n$ diverges.
3. If $\alpha = 1$, the test gives no information.
:::

::: proof
(1) Choose $\beta$ with $\alpha < \beta < 1$. By [[real-analysis/sequences#thm-limsup]](1), $\abs{a_n}^{1/n} < \beta$, that is $\abs{a_n} < \beta^n$, for all sufficiently large $n$. The geometric series $\sum\beta^n$ converges, so $\sum\abs{a_n}$ converges by comparison.

(2) If $\alpha > 1$ (including $\alpha = \infty$), then $\abs{a_n}^{1/n} > 1$, hence $\abs{a_n} > 1$, for infinitely many $n$ (by [[real-analysis/sequences#thm-limsup]](1) with $\eps = \alpha - 1$, or directly from unboundedness if $\alpha = \infty$). So $a_n \not\to 0$, and the series diverges by the term test.

(3) For both $\sum 1/n$ and $\sum 1/n^2$ we have $\abs{a_n}^{1/n} = (n^{1/n})^{-1}$ or $(n^{1/n})^{-2}$, which tend to $1$ because $n^{1/n} \to 1$ ([[real-analysis/sequences#ex-standard]]). So $\alpha = 1$ for both, yet the first diverges and the second converges.
:::

::: theorem Ratio test {#thm-ratio}
Suppose $a_n \ne 0$ for all $n$.

1. If $\limsup_{n\to\infty}\abs{a_{n+1}/a_n} < 1$, then $\sum a_n$ converges absolutely.
2. If $\abs{a_{n+1}/a_n} \ge 1$ for all $n \ge N_0$, then $\sum a_n$ diverges.

In particular, if $\abs{a_{n+1}/a_n} \to L$, the series converges absolutely when $L < 1$ and diverges when $L > 1$; when $L = 1$ the test gives no information.
:::

::: proof
(1) Choose $\beta$ strictly between the upper limit and $1$. There is $N$ with $\abs{a_{n+1}} \le \beta\abs{a_n}$ for all $n \ge N$, and by induction $\abs{a_n} \le \abs{a_N}\beta^{n-N}$ for $n \ge N$. The right-hand side is a constant times the terms of a convergent geometric series, so $\sum\abs{a_n}$ converges by comparison.

(2) The inequality gives $\abs{a_n} \ge \abs{a_{N_0}} > 0$ for all $n \ge N_0$, so $a_n \not\to 0$.

If the ratios tend to $L > 1$, they are eventually $\ge 1$, so (2) applies. The examples $\sum 1/n$ and $\sum 1/n^2$, whose ratios both tend to $1$, show that $L = 1$ is inconclusive.
:::

The ratio test is usually easier to apply, especially to terms containing factorials; the root test is more powerful, because whenever the ratio test proves convergence so does the root test ([[#exr-3-8]]), but not conversely.

::: example Ratio versus root {#ex-ratio-root}
(a) Show that $\displaystyle\sum_{n=1}^\infty\frac{n!}{n^n}$ converges. (b) Let $a_n = 2^{(-1)^n - n}$. Show that the ratio test is inconclusive but the root test proves convergence.
::: solution
(a) The ratio of consecutive terms is

$$
\frac{(n+1)!}{(n+1)^{n+1}}\cdot\frac{n^n}{n!} = \frac{(n+1)\,n^n}{(n+1)^{n+1}} = \left(\frac{n}{n+1}\right)^n = \frac{1}{(1 + 1/n)^n} \to \frac1e < 1,
$$

using [[real-analysis/sequences#ex-e]]. So the series converges (its sum is about $1.8799$).

(b) The terms are $a_1 = \tfrac14$, $a_2 = \tfrac12$, $a_3 = \tfrac1{16}$, $a_4 = \tfrac18, \dots$. The ratio $a_{n+1}/a_n = 2^{-2(-1)^n - 1}$ equals $2$ for odd $n$ and $\tfrac18$ for even $n$, so its upper limit is $2$ while the ratios are not eventually $\ge 1$: neither part of [[#thm-ratio]] applies. But $a_n^{1/n} = 2^{(-1)^n/n - 1} \to 2^{-1} = \tfrac12 < 1$, so the root test gives convergence.
:::
:::

::: quiz
What does the ratio test say about $\sum 1/n^2$?
- [ ] It converges, because the ratios are less than $1$.
- [x] Nothing: the ratios tend to $1$.
- [ ] It diverges, because the ratios tend to $1$.
- [ ] It converges absolutely, because the terms are positive.
::: solution
$\dfrac{1/(n+1)^2}{1/n^2} = \left(\dfrac{n}{n+1}\right)^2 \to 1$. The ratios are all less than $1$, but they are not bounded away from $1$ — the upper limit is $1$ — so [[#thm-ratio]] is silent. The series does converge, as the $p$-series test ([[#ex-p-series]]) shows. "Every ratio is less than $1$" is not enough: the harmonic series has that property too.
:::
:::

## Alternating series and Dirichlet's test

Absolute convergence ignores signs. The next tests exploit cancellation, and so can prove convergence of series such as $\sum (-1)^{n+1}/n$ that do not converge absolutely.

::: theorem Alternating series test {#thm-alternating}
Let $(b_n)$ be decreasing with $b_n \to 0$ (so $b_n \ge 0$). Then $\sum_{n=1}^\infty(-1)^{n+1}b_n = b_1 - b_2 + b_3 - \cdots$ converges, and its sum $S$ satisfies

$$
\abs{S - S_N} \le b_{N+1} \qquad\text{for every } N.
$$
:::

::: proof
Because $(b_n)$ decreases, adding a pair of terms $-b_{2k} + b_{2k+1} \le 0$ cannot increase a partial sum, and adding $b_{2k+1} - b_{2k+2} \ge 0$ cannot decrease one. Hence

$$
S_2 \le S_4 \le S_6 \le \cdots \le S_{2n} \le S_{2n-1} \le \cdots \le S_3 \le S_1,
$$

where $S_{2n} = S_{2n-1} - b_{2n} \le S_{2n-1}$ links the two chains. The even partial sums increase and are bounded above by $S_1$; the odd ones decrease and are bounded below by $S_2$. By the monotone convergence theorem $S_{2n} \to E$ and $S_{2n-1} \to O$, and $O - E = \lim(S_{2n-1} - S_{2n}) = \lim b_{2n} = 0$. So the even and odd partial sums have the same limit $S$, and therefore $S_N \to S$: given $\eps > 0$, there is $K$ such that both $\abs{S_{2n} - S}$ and $\abs{S_{2n-1} - S}$ are less than $\eps$ for all $n \ge K$, hence $\abs{S_N - S} < \eps$ for $N \ge 2K$.

For the error bound, the chain shows that $S$ lies between any two consecutive partial sums $S_N$ and $S_{N+1}$, so $\abs{S - S_N} \le \abs{S_{N+1} - S_N} = b_{N+1}$.
:::

::: widget sequence
a: (-1)^(n+1)/n
mode: both
N: 40
limit: ln(2)
caption: Terms and partial sums of the alternating harmonic series. The partial sums zig-zag: odd ones above $\ln 2$, even ones below, each step shorter than the last — exactly the two monotone chains in the proof of [[#thm-alternating]]. The distance to $\ln 2$ is always smaller than the next term, but convergence is slow: about $1/(2N)$ after $N$ terms.
:::

So $1 - \frac12 + \frac13 - \cdots$ converges, although $\sum 1/n$ diverges: the alternating harmonic series converges conditionally. Its sum is $\ln 2$ ([[#exr-3-6]]). The alternating series test is a special case of a more flexible test based on the discrete analogue of integration by parts.

::: lemma Summation by parts {#lem-abel}
Let $A_n = a_1 + \cdots + a_n$ (with $A_0 = 0$). For $1 \le m \le n$,

$$
\sum_{k=m}^n a_k b_k = A_n b_n - A_{m-1}b_m + \sum_{k=m}^{n-1}A_k(b_k - b_{k+1}).
$$
:::

::: proof
Write $a_k = A_k - A_{k-1}$ and split the sum:

$$
\sum_{k=m}^n (A_k - A_{k-1})b_k = \sum_{k=m}^n A_k b_k - \sum_{k=m-1}^{n-1}A_k b_{k+1} = A_n b_n - A_{m-1}b_m + \sum_{k=m}^{n-1}A_k(b_k - b_{k+1}),
$$

where the second step separates the term $k = n$ from the first sum and $k = m-1$ from the second.
:::

::: theorem Dirichlet's test {#thm-dirichlet}
Suppose the partial sums $A_n = a_1 + \cdots + a_n$ are bounded, say $\abs{A_n} \le M$ for all $n$, and $(b_n)$ is decreasing with $b_n \to 0$. Then $\sum a_n b_n$ converges.
:::

::: proof
We check the Cauchy criterion. For $1 \le m \le n$, [[#lem-abel]] and $b_k - b_{k+1} \ge 0$ give

$$
\Bigl\lvert\sum_{k=m}^n a_k b_k\Bigr\rvert \le Mb_n + Mb_m + M\sum_{k=m}^{n-1}(b_k - b_{k+1}) = Mb_n + Mb_m + M(b_m - b_n) = 2Mb_m.
$$

Given $\eps > 0$, choose $N$ with $b_m < \eps/(2M + 1)$ for $m \ge N$; then the block sums are less than $\eps$ for all $n \ge m \ge N$, and [[#thm-cauchy-series]] gives convergence.
:::

With $a_n = (-1)^{n+1}$, whose partial sums are $1, 0, 1, 0, \dots$, Dirichlet's test contains the convergence part of the alternating series test. Its real strength shows with oscillating terms.

::: example A trigonometric series {#ex-sine-series}
Prove that $\displaystyle\sum_{n=1}^\infty\frac{\sin(nx)}{n}$ converges for every real $x$.
::: solution
If $x$ is a multiple of $2\pi$, every term is $0$. Otherwise $\sin(x/2) \ne 0$, and the product formula $2\sin(x/2)\sin(kx) = \cos\bigl((k - \tfrac12)x\bigr) - \cos\bigl((k+\tfrac12)x\bigr)$ makes the partial sums of $\sin(kx)$ telescope:

$$
\sum_{k=1}^n \sin(kx) = \frac{\cos(x/2) - \cos\bigl((n + \frac12)x\bigr)}{2\sin(x/2)}, \qquad\text{so}\qquad \Bigl\lvert\sum_{k=1}^n\sin(kx)\Bigr\rvert \le \frac{1}{\abs{\sin(x/2)}}.
$$

These partial sums are bounded (for fixed $x$), and $b_n = 1/n$ decreases to $0$, so [[#thm-dirichlet]] gives convergence. The convergence is not absolute in general: for $x = 1$, at least one of any two consecutive integers $n$ has $\abs{\sin n} \ge \sin\tfrac12$, which makes $\sum \abs{\sin n}/n$ diverge by comparison with the harmonic series. In fact $\sum_{n\ge1}\frac{\sin nx}{n} = \frac{\pi - x}{2}$ for $0 < x < 2\pi$, a Fourier series computed in [[pde/fourier-series]].
:::
:::

::: widget sequence
a: sin(n)/n
mode: sums
N: 80
limit: (pi - 1)/2
caption: Partial sums of $\sum \sin(n)/n$, which converges by Dirichlet's test to $(\pi - 1)/2 \approx 1.0708$. The approach is irregular, not monotone and not simply alternating: the signs of $\sin n$ follow no simple pattern, but their partial sums stay bounded, and the factor $1/n$ damps the oscillation.
:::

## Rearrangements

A **rearrangement** of $\sum a_n$ is a series $\sum a_{\sigma(n)}$, where $\sigma\colon \N\to\N$ is a bijection: the same terms, each used exactly once, in a different order. For finite sums the order is irrelevant. For infinite series it can matter enormously.

Take the alternating harmonic series with sum $S = \ln 2$ and rearrange it as one positive term followed by two negative terms:

$$
1 - \frac12 - \frac14 + \frac13 - \frac16 - \frac18 + \frac15 - \frac1{10} - \frac1{12} + \cdots
$$

The $k$-th group of three is $\frac{1}{2k-1} - \frac{1}{4k-2} - \frac{1}{4k} = \frac{1}{4k-2} - \frac1{4k} = \frac12\Bigl(\frac{1}{2k-1} - \frac{1}{2k}\Bigr)$, so the grouped series is exactly half of the original one, with sum $\frac12\ln 2$. (Since the terms tend to $0$ and groups have bounded length, the ungrouped partial sums have the same limit.) Every term of the original series appears exactly once, yet the sum has halved. The next two theorems explain this completely.

::: theorem Rearranging absolutely convergent series {#thm-rearrangement-abs}
If $\sum a_n$ converges absolutely with sum $S$, then every rearrangement $\sum a_{\sigma(n)}$ also converges absolutely, with the same sum $S$.
:::

::: proof
Write $T_m = \sum_{n=1}^m a_{\sigma(n)}$. Let $\eps > 0$. Since $\sum\abs{a_n}$ converges, its tails tend to $0$: choose $N$ with $\sum_{k > N}\abs{a_k} < \eps/2$. Then also $\abs{S - S_N} = \bigl\lvert\sum_{k>N}a_k\bigr\rvert < \eps/2$.

The indices $1, \dots, N$ all appear among $\sigma(1), \sigma(2), \dots$; let $M$ be large enough that $\set{1, \dots, N} \subseteq \set{\sigma(1), \dots, \sigma(M)}$. For $m \ge M$, the sum $T_m$ contains every term of $S_N$, and the difference $T_m - S_N$ is a sum of finitely many distinct terms $a_k$ with $k > N$. Hence

$$
\abs{T_m - S} \le \abs{T_m - S_N} + \abs{S_N - S} \le \sum_{k>N}\abs{a_k} + \frac\eps2 < \eps.
$$

So $T_m \to S$. Applying the same argument to $\sum\abs{a_n}$ shows that $\sum\abs{a_{\sigma(n)}}$ converges, so the rearrangement converges absolutely.
:::

For conditionally convergent series, by contrast, the order is everything.

::: theorem Riemann's rearrangement theorem {#thm-riemann-rearrangement}
If $\sum a_n$ converges conditionally, then for every $L \in \R$ there is a rearrangement of $\sum a_n$ that converges to $L$.
:::

::: proof
*Step 1: the positive and negative parts both diverge.* Let $p_n = \max(a_n, 0)$ and $q_n = \max(-a_n, 0)$, so that $a_n = p_n - q_n$ and $\abs{a_n} = p_n + q_n$. If $\sum p_n$ and $\sum q_n$ both converged, $\sum\abs{a_n}$ would converge, which it does not. If just one converged, say $\sum q_n$, then $\sum p_n = \sum(a_n + q_n)$ would converge as a sum of convergent series — again a contradiction; similarly if only $\sum p_n$ converged. So $\sum p_n = \sum q_n = \infty$.

*Step 2: the raw material.* Let $P_1, P_2, \dots$ be the terms $a_n \ge 0$ and $Q_1, Q_2, \dots$ the absolute values of the terms $a_n < 0$, each list in its original order. Every term of the series is in exactly one list; $\sum P_k = \infty$ and $\sum Q_k = \infty$ by step 1 (they differ from $\sum p_n$, $\sum q_n$ only by zero terms); and $P_k \to 0$, $Q_k \to 0$ because $a_n \to 0$ by the term test.

*Step 3: the construction.* Take $P_1, P_2, \dots$ in order until the running sum first exceeds $L$ — possible because $\sum P_k = \infty$ — and always take at least one. Then subtract $Q_1, Q_2, \dots$ until the running sum first drops below $L$, taking at least one. Then add further $P$'s until the sum exceeds $L$ again, and so on, alternating forever. Each stage is possible because the unused $P$'s, and the unused $Q$'s, still have infinite sum. Each stage uses at least one new term, so every $P_k$ and every $Q_k$ is eventually used, exactly once: the result is a rearrangement of $\sum a_n$.

*Step 4: convergence.* Because each stage stops as soon as $L$ is crossed, a stage of $P$'s that ends with the term $P_k$ ends at a sum in $(L, L + P_k]$, and a stage of $Q$'s ending with $Q_l$ ends at a sum in $[L - Q_l, L)$. (This needs the stage to start on the other side of $L$, which is true for every stage after the first.) Within a stage the running sums move monotonically from the end value of the previous stage to the end value of the current one. Hence every partial sum $T_m$ from the third stage on lies within $\max(x, y)$ of $L$, where $x$ and $y$ are the last terms of the stage containing $m$ and of the stage before it. As $m \to \infty$ these are terms $P_k$ and $Q_l$ with $k, l \to \infty$, so they tend to $0$, and $T_m \to L$.
:::

The same construction, with targets $1, 2, 3, \dots$ instead of a fixed $L$, produces a rearrangement that diverges to $\infty$ ([[#exr-3-9]]).

::: warning Infinite sums are not finite sums
Commutativity ("the order does not matter") and associativity ("brackets may be moved") hold for *absolutely* convergent series, by [[#thm-rearrangement-abs]], and fail in general. Inserting brackets into a convergent series is safe — it just picks out a subsequence of partial sums — but *removing* them is not: $(1 - 1) + (1 - 1) + \cdots = 0$, while $1 - 1 + 1 - 1 + \cdots$ diverges. When you manipulate a series, check absolute convergence first.
:::

::: remark Multiplying series
To multiply two series, collect the terms $a_k b_l$ with $k + l = n$: the **Cauchy product** of $\sum_{n\ge0}a_n$ and $\sum_{n\ge0}b_n$ is $\sum_{n\ge0}c_n$ with $c_n = \sum_{k=0}^n a_k b_{n-k}$. If both series converge absolutely, the Cauchy product converges absolutely to the product of the sums (because the terms $a_kb_l$ can be summed in any order); by a theorem of Mertens (1875) it is enough that one of the two converges absolutely. Without absolute convergence the product can diverge, even when both factors converge ([[#exr-3-10]]). This is how one proves $e^{x}e^{y} = e^{x+y}$ directly from the power series of the exponential.
:::

::: quiz
The series $\sum a_n$ converges, and the rearrangement $\sum a_{\sigma(n)}$ converges to a different sum. What can you conclude?
- [ ] Nothing — this cannot happen.
- [x] $\sum \abs{a_n}$ diverges.
- [ ] $a_n \not\to 0$.
- [ ] $\sum a_n$ has only finitely many negative terms.
::: solution
If $\sum\abs{a_n}$ converged, [[#thm-rearrangement-abs]] would force every rearrangement to have the same sum. So the series converges conditionally. Its terms do tend to $0$ (it converges), and it must have infinitely many terms of each sign — otherwise, after finitely many terms, all terms would have the same sign, and convergence would be absolute.
:::
:::

::: history
Nicole Oresme proved the divergence of the harmonic series around 1350, by grouping its terms into blocks each worth at least $\frac12$ — the idea behind the condensation test. Leibniz described the alternating series test in letters in the early eighteenth century. Jean le Rond d'Alembert published a form of the ratio test in 1768, and Augustin-Louis Cauchy's *Cours d'analyse* (1821) proved the root and ratio tests and the condensation test, and gave the convergence criterion its central place. Niels Henrik Abel introduced summation by parts in his 1826 study of the binomial series. In 1837 Peter Gustav Lejeune Dirichlet observed that a conditionally convergent series can change its sum when rearranged, while absolutely convergent series cannot; Bernhard Riemann's Habilitation thesis of 1854, published in 1867 after his death, contains the rearrangement theorem proved above.
:::

## Where this leads

Series of numbers are the stepping stone to series of functions. A power series $\sum c_n x^n$ is a different numerical series for each $x$, and the root test tells us for which $x$ it converges — that is the radius of convergence of [[real-analysis/uniform-convergence]], where we also ask when a series of continuous functions has a continuous sum. Dirichlet's test is the basic tool for Fourier series ([[pde/fourier-series]]). The theorem that absolutely convergent series can be rearranged and multiplied freely reappears in measure theory, where $\sum$ becomes an integral with respect to counting measure and the theorems of [[measure-theory/lebesgue-integral]] explain when sums and limits may be interchanged.

::: summary
- $\sum a_n = S$ means the partial sums $S_N$ converge to $S$ ([[#def-series]]); the geometric series $\sum r^n = 1/(1-r)$ for $\abs r < 1$.
- Cauchy criterion: convergence iff block sums $a_{m+1} + \cdots + a_n$ are eventually small ([[#thm-cauchy-series]]). Convergence forces $a_n \to 0$, but not conversely.
- For non-negative terms, convergence means bounded partial sums; compare with geometric and $p$-series. $\sum 1/n^p$ converges iff $p > 1$ (by Cauchy condensation, [[#thm-condensation]]).
- Absolute convergence implies convergence ([[#thm-absolute]]). Root and ratio tests prove absolute convergence by comparison with a geometric series; both are silent when the limit is $1$, and the root test is the stronger.
- Cancellation: alternating signs with terms decreasing to $0$ converge, with error at most the next term ([[#thm-alternating]]); Dirichlet's test handles bounded oscillating partial sums.
- Absolutely convergent series can be rearranged without changing the sum ([[#thm-rearrangement-abs]]); a conditionally convergent series can be rearranged to converge to any real number ([[#thm-riemann-rearrangement]]).
:::

## Exercises

::: exercise A telescoping series {level=1 check="1"}
Find $\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)}$.
::: solution
Since $\frac{1}{n(n+1)} = \frac1n - \frac1{n+1}$, the partial sums telescope: $S_N = 1 - \frac{1}{N+1} \to 1$.
:::
:::

::: exercise A geometric series {level=1 check="2/3"}
Find $\displaystyle\sum_{n=0}^\infty\left(-\frac12\right)^n$.
::: solution
This is geometric with $r = -\tfrac12$, $\abs r < 1$, so by [[#ex-geometric]] the sum is $\dfrac{1}{1 - (-1/2)} = \dfrac23$.
:::
:::

::: exercise Choosing a test {level=1}
Decide whether each series converges: (a) $\displaystyle\sum\frac{n}{n^2+1}$; (b) $\displaystyle\sum\frac{1}{n^2 + n + 1}$; (c) $\displaystyle\sum\frac{n^2}{3^n}$.
::: solution
(a) Diverges: $\frac{n}{n^2+1}\big/\frac1n = \frac{n^2}{n^2+1} \to 1$, so by limit comparison it behaves like the harmonic series. (b) Converges: $0 < \frac{1}{n^2+n+1} \le \frac1{n^2}$, and $\sum 1/n^2$ converges. (c) Converges by the ratio test: $\frac{(n+1)^2/3^{n+1}}{n^2/3^n} = \frac13\bigl(1 + \frac1n\bigr)^2 \to \frac13 < 1$.
:::
:::

::: exercise Logarithmic borderline {level=2}
Use the condensation test to show that $\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln n}$ diverges and $\displaystyle\sum_{n=2}^\infty\frac{1}{n(\ln n)^2}$ converges.
::: solution
Both have positive decreasing terms (the denominators increase). The condensation test works equally well for series starting at $n = 2$ (apply it to the series with $a_1$ defined as $a_2$). For the first series the condensed terms are $2^k\cdot\frac{1}{2^k\ln 2^k} = \frac{1}{k\ln 2}$, and $\sum_k\frac{1}{k\ln2}$ diverges (a multiple of the harmonic series). For the second, $2^k\cdot\frac{1}{2^k(k\ln2)^2} = \frac{1}{(\ln 2)^2}\cdot\frac1{k^2}$, whose sum converges. So the borderline between convergence and divergence lies even more finely than the $p$-series suggest.
:::
:::

::: exercise Squares of terms {level=2}
(a) Prove that if $a_n \ge 0$ and $\sum a_n$ converges, then $\sum a_n^2$ converges. (b) Show by an example that (a) fails without the hypothesis $a_n \ge 0$.
::: solution
(a) By the term test $a_n \to 0$, so $0 \le a_n \le 1$ for $n \ge N_0$, and then $0 \le a_n^2 \le a_n$. The comparison test gives convergence of $\sum a_n^2$.

(b) Let $a_n = (-1)^{n+1}/\sqrt n$. The terms decrease in absolute value to $0$ with alternating signs, so $\sum a_n$ converges by [[#thm-alternating]]; but $\sum a_n^2 = \sum 1/n$ diverges.
:::
:::

::: exercise The sum of the alternating harmonic series {level=2 check="ln(2)"}
Let $S_N$ be the partial sums of $\sum_{n\ge1}(-1)^{n+1}/n$ and $H_N = 1 + \frac12 + \cdots + \frac1N$. Show that $S_{2n} = H_{2n} - H_n$ and use the inequalities $\ln\frac{k+1}{k} \le \frac1k \le \ln\frac{k}{k-1}$ ($k \ge 2$) to find the sum of the series.
::: hint
The inequalities follow from $\frac{t}{1+t} \le \ln(1 + t) \le t$ for $t > -1$. Sum them for $k = n+1, \dots, 2n$; the logarithms telescope.
:::
::: solution
$S_{2n} = \bigl(1 + \frac12 + \cdots + \frac1{2n}\bigr) - 2\bigl(\frac12 + \frac14 + \cdots + \frac{1}{2n}\bigr) = H_{2n} - H_n$. Summing the inequalities for $k = n+1, \dots, 2n$:

$$
\ln\frac{2n+1}{n+1} = \sum_{k=n+1}^{2n}\ln\frac{k+1}{k} \ \le\ H_{2n} - H_n \ \le\ \sum_{k=n+1}^{2n}\ln\frac{k}{k-1} = \ln\frac{2n}{n} = \ln 2.
$$

As $n\to\infty$, $\frac{2n+1}{n+1} \to 2$ and $\ln$ is continuous, so the left side tends to $\ln 2$. By the squeeze theorem $S_{2n} \to \ln 2$. The series converges by [[#thm-alternating]], so its sum equals the limit of this subsequence of partial sums: the sum is $\ln 2$.
:::
:::

::: exercise A cosine series {level=2}
Prove that $\displaystyle\sum_{n=1}^\infty\frac{\cos(nx)}{n}$ converges for every $x$ that is not a multiple of $2\pi$, and diverges when $x$ is a multiple of $2\pi$.
::: solution
If $x \in 2\pi\Z$ the series is $\sum 1/n$, which diverges. Otherwise $\sin(x/2) \ne 0$, and $2\sin(x/2)\cos(kx) = \sin\bigl((k+\frac12)x\bigr) - \sin\bigl((k - \frac12)x\bigr)$ telescopes to give

$$
\sum_{k=1}^n\cos(kx) = \frac{\sin\bigl((n+\frac12)x\bigr) - \sin(x/2)}{2\sin(x/2)}, \qquad \Bigl\lvert\sum_{k=1}^n\cos(kx)\Bigr\rvert \le \frac{1}{\abs{\sin(x/2)}}.
$$

The partial sums are bounded and $1/n$ decreases to $0$, so the series converges by [[#thm-dirichlet]].
:::
:::

::: exercise The root test is stronger {level=3}
Let $a_n \ne 0$ for all $n$. Prove that $\limsup\abs{a_n}^{1/n} \le \limsup\abs{a_{n+1}/a_n}$. Deduce that whenever part 1 of the ratio test proves convergence, so does the root test.
::: hint
If $\beta$ exceeds the upper limit of the ratios, then $\abs{a_n} \le C\beta^n$ for large $n$. You will need $C^{1/n} \to 1$ for $C > 0$.
:::
::: solution
Let $R = \limsup\abs{a_{n+1}/a_n}$; if $R = \infty$ there is nothing to prove. Let $\beta > R$. By [[real-analysis/sequences#thm-limsup]] there is $N$ with $\abs{a_{n+1}} \le \beta\abs{a_n}$ for $n \ge N$, so $\abs{a_n} \le \abs{a_N}\beta^{n-N} = C\beta^n$ for $n \ge N$, where $C = \abs{a_N}\beta^{-N} > 0$. Hence $\abs{a_n}^{1/n} \le C^{1/n}\beta$ for $n \ge N$.

Now $C^{1/n} \to 1$: if $C \ge 1$ then $1 \le C^{1/n} \le n^{1/n}$ once $n \ge C$, and $n^{1/n} \to 1$; if $C < 1$ then $C^{1/n} = 1/(1/C)^{1/n} \to 1$. So the right-hand side tends to $\beta$. Since the upper limit of a sequence is at most that of a larger sequence (the tail suprema are smaller), and a convergent sequence has upper limit equal to its limit, $\limsup\abs{a_n}^{1/n} \le \beta$. As $\beta > R$ was arbitrary, $\limsup\abs{a_n}^{1/n} \le R$. In particular $R < 1$ implies that the root test's $\alpha$ is less than $1$.
:::
:::

::: exercise Rearranging to infinity {level=3}
Let $\sum a_n$ converge conditionally. Prove that some rearrangement diverges to $\infty$.
::: hint
Use the lists $P_k$ and $Q_k$ from the proof of [[#thm-riemann-rearrangement]], with moving targets $1, 2, 3, \dots$ and a single negative term after each target is passed.
:::
::: solution
Let $P_k$, $Q_k$ be as in the proof of [[#thm-riemann-rearrangement]], so $\sum P_k = \sum Q_k = \infty$ and $P_k, Q_k \to 0$. Build the rearrangement in stages: in stage $j$ ($j = 1, 2, \dots$) take at least one unused $P$ and continue taking $P$'s until the running sum exceeds $j$ (possible since the unused $P$'s have infinite sum), then subtract the single next term $Q_j$. Every $P_k$ and every $Q_k$ is used exactly once, so this is a rearrangement.

Choose $J$ with $Q_j \le 1$ for $j \ge J$. After stage $j \ge J$ the running sum exceeds $j - Q_j \ge j - 1$, and during stage $j + 1$ the $P$'s only increase it before it exceeds $j + 1$; so every partial sum from the end of stage $j$ onwards is at least $j - 1$. Hence the partial sums tend to $\infty$.
:::
:::

::: exercise A divergent Cauchy product {level=3}
Let $a_n = b_n = \dfrac{(-1)^n}{\sqrt{n+1}}$ for $n \ge 0$. Show that $\sum a_n$ converges, but that the Cauchy product $\sum c_n$, with $c_n = \sum_{k=0}^n a_k b_{n-k}$, diverges.
::: hint
Use $\sqrt{(k+1)(n - k + 1)} \le \frac{n+2}{2}$, the inequality between geometric and arithmetic means.
:::
::: solution
$\sum a_n$ converges by the alternating series test, since $1/\sqrt{n+1}$ decreases to $0$. For the product,

$$
c_n = \sum_{k=0}^n\frac{(-1)^k(-1)^{n-k}}{\sqrt{k+1}\sqrt{n-k+1}} = (-1)^n\sum_{k=0}^n\frac{1}{\sqrt{(k+1)(n-k+1)}}.
$$

By the AM–GM inequality, $\sqrt{(k+1)(n-k+1)} \le \frac{(k+1) + (n-k+1)}{2} = \frac{n+2}{2}$, so each of the $n + 1$ terms is at least $\frac{2}{n+2}$ and

$$
\abs{c_n} \ge \frac{2(n+1)}{n+2} \ge 1.
$$

So $c_n \not\to 0$ and $\sum c_n$ diverges by the term test. Neither factor converges absolutely, so Mertens' theorem does not apply.
:::
:::
