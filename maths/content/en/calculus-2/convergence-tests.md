Geometric and telescoping series are rare luxuries: their partial sums have closed forms. For almost every other series, such as

$$
\sum_{n=1}^\infty\frac{1}{n^3}, \qquad \sum_{n=1}^\infty \frac{n!}{n^n}, \qquad \sum_{n=2}^\infty\frac{1}{n\ln n}, \qquad \sum_{n=1}^\infty\frac{(-1)^{n+1}}{n},
$$

no formula for $s_n$ exists, and the question splits into two. First, *does the series converge?* Second, *if it does, how well do the partial sums approximate the sum?* This chapter answers both questions with a toolkit of **convergence tests**. Each test compares the given series with one we already understand: an integral, a $p$-series, or a geometric series.

Most of the tests apply to series with non-negative terms, where everything rests on one fact from [[calculus-2/series#thm-positive]]: *a series of non-negative terms converges if and only if its partial sums are bounded.* Series with terms of both signs need extra ideas — absolute convergence and the alternating series test — and they hold a surprise: rearranging the terms can change the sum.

## The integral test

The proof that the harmonic series diverges ([[calculus-2/series#thm-harmonic]]) compared the sum $\sum 1/k$ with the integral $\int dx/x$. The same comparison works whenever the terms are the values of a positive decreasing function.

::: theorem Integral test {#thm-integral-test}
Let $f$ be continuous, positive and decreasing on $[1, \infty)$, and let $a_n = f(n)$. Then $\sum_{n=1}^\infty a_n$ converges if and only if the improper integral $\int_1^\infty f(x)\,dx$ converges. Moreover, if the series converges, its tail $R_N = \sum_{n = N+1}^\infty a_n$ satisfies

$$
\int_{N+1}^\infty f(x)\,dx \;\le\; R_N \;\le\; \int_N^\infty f(x)\,dx .
$$ {#eq-integral-bounds}
:::

::: proof
Since $f$ is decreasing, for $k \le x \le k + 1$ we have $f(k+1) \le f(x) \le f(k)$. Integrating over $[k, k+1]$, an interval of length $1$,

$$
a_{k+1} \le \int_k^{k+1} f(x)\,dx \le a_k .
$$ {#eq-integral-sandwich}

Summing the left inequality for $k = 1, \dots, n-1$ gives $s_n - a_1 \le \int_1^n f(x)\,dx$, and summing the right one gives $\int_1^n f(x)\,dx \le s_{n-1}$.

If $\int_1^\infty f$ converges, then $s_n \le a_1 + \int_1^n f \le a_1 + \int_1^\infty f$ for all $n$ (the integrand is positive), so the partial sums are bounded and the series converges. If the integral diverges, then $F(t) = \int_1^t f$ is increasing and unbounded, so $s_{n-1} \ge F(n) \to \infty$ and the series diverges.

For the tail, sum the left inequality in [[#eq-integral-sandwich]] over $k = N, N+1, \dots$ to get $R_N \le \int_N^\infty f$, and the right inequality over $k = N + 1, N + 2, \dots$ to get $\int_{N+1}^\infty f \le R_N$.
:::

The hypotheses matter: the function must be positive and decreasing, at least from some point on (the beginning of a series never affects convergence). Note also that the test does **not** say that the sum equals the integral; it only says that both are finite or both infinite.

::: widget riemann
f: 1/x^2
a: 1
b: 8
n: 7
method: right
caption: The right-endpoint rectangles over $[1, 8]$ have heights $\frac1{2^2}, \frac1{3^2}, \dots, \frac1{8^2}$ and lie *under* the curve $y = 1/x^2$, so $\sum_{n=2}^{8} \frac1{n^2} \le \int_1^8 \frac{dx}{x^2} < 1$. Switch to left endpoints: those rectangles (heights $1, \frac14, \dots, \frac1{49}$) lie *above* the curve. A series and an integral of a decreasing function always trap each other like this.
:::

The most important application settles the convergence of the **$p$-series** $\sum 1/n^p$ once and for all. It uses the improper integrals of [[calculus-1/improper-integrals]]: $\int_1^\infty x^{-p}\,dx$ converges exactly when $p > 1$.

::: corollary The p-series test {#cor-p-series}
The series $\displaystyle\sum_{n=1}^\infty\frac{1}{n^p}$ converges if $p > 1$ and diverges if $p \le 1$.
:::

::: proof
If $p \le 0$ the terms $n^{-p}$ do not tend to $0$, so the series diverges by the divergence test. If $p > 0$, the function $f(x) = x^{-p}$ is continuous, positive and decreasing on $[1, \infty)$, and

$$
\int_1^t x^{-p}\,dx = \begin{cases}\dfrac{t^{1-p} - 1}{1-p} & p \ne 1,\\[1ex] \ln t & p = 1,\end{cases}
$$

which has a finite limit as $t\to\infty$ exactly when $p > 1$ (then the limit is $\frac{1}{p-1}$). The integral test finishes the proof.
:::

So $\sum 1/n^{1.001}$ converges while $\sum 1/n$ and $\sum 1/\sqrt n$ diverge. The boundary $p = 1$ is sharp, but the integral test can probe even finer scales.

::: example Slower than the harmonic series {#ex-nlogn}
Show that $\displaystyle\sum_{n=2}^\infty\frac{1}{n\ln n}$ diverges.
::: solution
The function $f(x) = \dfrac{1}{x\ln x}$ is continuous and positive on $[2,\infty)$, and decreasing there because $x\ln x$ is increasing. With the substitution $u = \ln x$, $du = dx/x$,

$$
\int_2^t\frac{dx}{x\ln x} = \int_{\ln 2}^{\ln t}\frac{du}{u} = \ln(\ln t) - \ln(\ln 2) \to \infty \quad (t \to\infty).
$$

By the integral test (applied from $n = 2$), the series diverges. Its partial sums grow like $\ln\ln n$ (plus a constant close to $0.795$): even after $10^{100}$ terms they are only about $6.2$. In contrast $\sum \frac{1}{n(\ln n)^2}$ converges ([[#exr-log-p]]).
:::
:::

The tail estimate [[#eq-integral-bounds]] turns the integral test into a method for computing sums with a guaranteed error.

::: example Estimating a sum with error bounds {#ex-zeta3}
Estimate $S = \displaystyle\sum_{n=1}^\infty\frac{1}{n^3}$ using ten terms, with a guaranteed error bound.
::: solution
The partial sum is $s_{10} = 1 + \frac18 + \cdots + \frac1{1000} = 1.197\,532$. With $f(x) = x^{-3}$ we have $\int_N^\infty x^{-3}\,dx = \frac{1}{2N^2}$, so by [[#eq-integral-bounds]]

$$
\frac{1}{2\cdot 11^2} = 0.004\,132 \le S - s_{10} \le \frac{1}{2\cdot10^2} = 0.005 .
$$

Hence $1.201\,664 \le S \le 1.202\,532$. Taking the midpoint, $S \approx 1.202\,098$ with error at most $0.000\,434$. (The true value is $S = 1.202\,056\,9\ldots$, so the actual error of the midpoint is only $4\times10^{-5}$.) Using $s_{10}$ alone would have an error of about $0.0045$: adding the integral estimate of the tail gains two decimal places for free.
:::
:::

## Comparison tests

To decide whether a series converges, it is usually enough to compare it with a series whose behaviour we know.

::: theorem Direct comparison test {#thm-comparison}
Suppose $0 \le a_n \le b_n$ for all $n \ge N_0$.

1. If $\sum b_n$ converges, then $\sum a_n$ converges.
2. If $\sum a_n$ diverges, then $\sum b_n$ diverges.
:::

::: proof
Convergence is not affected by the first $N_0 - 1$ terms, so we may assume $0 \le a_n \le b_n$ for all $n$. Then the partial sums satisfy $\sum_{k=1}^n a_k \le \sum_{k=1}^n b_k \le \sum_{k=1}^\infty b_k$ when $\sum b_n$ converges, so the partial sums of $\sum a_n$ are bounded and it converges by [[calculus-2/series#thm-positive]]. Statement 2 is the contrapositive of statement 1.
:::

::: warning Comparisons must point the right way
Knowing that $a_n \le b_n$ where $\sum b_n$ **diverges** tells you nothing about $\sum a_n$: for instance $\frac1{n^2} \le \frac1n$, and $\sum 1/n^2$ converges. Likewise $a_n \ge b_n$ with $\sum b_n$ convergent tells you nothing. A smaller series inherits only convergence; a larger series inherits only divergence. Before writing a comparison, ask which conclusion you want and check that the inequality goes the corresponding way.
:::

Finding an inequality that goes the right way can be fiddly. Often it is easier to compare the *ratio* of the terms.

::: theorem Limit comparison test {#thm-limit-comparison}
Let $a_n > 0$ and $b_n > 0$ and suppose $\dfrac{a_n}{b_n} \to c$ where $0 < c < \infty$. Then $\sum a_n$ and $\sum b_n$ either both converge or both diverge.
:::

::: proof
Apply the definition of the limit with $\eps = c/2$: there is $N$ such that $\frac c2 < \frac{a_n}{b_n} < \frac{3c}{2}$ for $n \ge N$. Then $a_n < \frac{3c}{2} b_n$ and $b_n < \frac{2}{c} a_n$ for $n \ge N$. If $\sum b_n$ converges, so does $\sum \frac{3c}{2}b_n$, and hence $\sum a_n$ by direct comparison; if $\sum a_n$ converges, so does $\sum b_n$ by the same argument. So convergence of either implies convergence of the other.
:::

The test makes precise the rule of thumb "a series behaves like its dominant term". For a rational function of $n$, the dominant behaviour is $n^{d}$ where $d$ is the degree of the numerator minus that of the denominator, so the series converges exactly when $d < -1$.

::: example Comparisons in practice {#ex-comparisons}
Decide whether these converge: (a) $\displaystyle\sum\frac{1}{n^2 + n + 1}$, (b) $\displaystyle\sum\frac{2n^2 + 3}{n^4 - n + 1}$, (c) $\displaystyle\sum\frac{1}{\sqrt{n^2 + 1}}$, (d) $\displaystyle\sum\sin\frac1n$, (e) $\displaystyle\sum\left(1 - \cos\frac1n\right)$.
::: solution
(a) $0 < \frac{1}{n^2+n+1} < \frac{1}{n^2}$ and $\sum 1/n^2$ converges, so the series converges by direct comparison.

(b) The dominant terms suggest comparing with $b_n = \frac{2n^2}{n^4} = \frac{2}{n^2}$. The ratio is $\dfrac{a_n}{b_n} = \dfrac{(2n^2 + 3)n^2}{2(n^4 - n + 1)} \to 1$, and $\sum 2/n^2$ converges, so the series converges by limit comparison. (A direct comparison would require checking an inequality such as $a_n \le 3/n^2$ for large $n$; the limit version avoids this.)

(c) Compare with $b_n = \frac1n$: $\dfrac{a_n}{b_n} = \dfrac{n}{\sqrt{n^2+1}} = \dfrac{1}{\sqrt{1 + 1/n^2}} \to 1$. The harmonic series diverges, so this one diverges too.

(d) Since $\frac{\sin x}{x} \to 1$ as $x \to 0$ and $\frac1n \to 0$, we get $\dfrac{\sin(1/n)}{1/n} \to 1$. Limit comparison with $\sum\frac1n$ shows divergence. (The terms are positive because $0 < \frac1n \le 1 < \pi$.)

(e) From [[calculus-1/limits]], $\frac{1 - \cos x}{x^2} \to \frac12$ as $x\to 0$, so $\dfrac{1 - \cos(1/n)}{1/n^2} \to \dfrac12$. Limit comparison with $\sum\frac{1}{n^2}$ shows convergence.
:::
:::

::: remark The extreme cases of limit comparison
If $a_n / b_n \to 0$ then eventually $a_n \le b_n$, so convergence of $\sum b_n$ implies convergence of $\sum a_n$ (but not conversely). If $a_n/b_n \to \infty$ then eventually $a_n \ge b_n$, so divergence of $\sum b_n$ implies divergence of $\sum a_n$. For instance $\frac{\ln n}{n^2}\big/\frac{1}{n^{1.5}} = \frac{\ln n}{\sqrt n} \to 0$, so $\sum\frac{\ln n}{n^2}$ converges by comparison with $\sum n^{-1.5}$.
:::

::: quiz
We know that $\frac{1}{n+1} < \frac1n$ and that $\sum \frac1n$ diverges. What does this inequality tell us about $\sum\frac{1}{n+1}$?
- [ ] It converges, because its terms are smaller than those of a divergent series.
- [ ] It diverges, by direct comparison.
- [x] Nothing: the comparison points the wrong way (although the series does in fact diverge).
::: solution
Being smaller than a divergent series proves nothing. The series does diverge — it is the harmonic series without its first term, or use limit comparison: $\frac{1/(n+1)}{1/n} \to 1$ — but that conclusion needs a different argument.
:::
:::

## Absolute convergence

So far all terms were non-negative. When terms have both signs, cancellation can help a series converge, and the first question to ask is whether the series would converge even without any cancellation.

::: definition Absolute and conditional convergence {#def-absolute}
A series $\sum a_n$ **converges absolutely** if $\sum \abs{a_n}$ converges. It **converges conditionally** if $\sum a_n$ converges but $\sum\abs{a_n}$ diverges.
:::

::: theorem Absolute convergence implies convergence {#thm-absolute}
If $\sum\abs{a_n}$ converges, then $\sum a_n$ converges, and $\abs{\sum a_n} \le \sum\abs{a_n}$.
:::

::: proof
For every $n$, $0 \le a_n + \abs{a_n} \le 2\abs{a_n}$. Since $\sum 2\abs{a_n}$ converges, the direct comparison test shows that $\sum (a_n + \abs{a_n})$ converges. Then $\sum a_n = \sum\bigl((a_n + \abs{a_n}) - \abs{a_n}\bigr)$ converges as the difference of two convergent series ([[calculus-2/series#thm-linear]]). For the inequality, $\abs{s_n} \le \sum_{k=1}^n \abs{a_k} \le \sum_{k=1}^\infty\abs{a_k}$ by the triangle inequality, and we let $n \to\infty$.
:::

::: example Absolute convergence with oscillating signs {#ex-absolute}
Show that $\displaystyle\sum_{n=1}^\infty\frac{\sin n}{n^2}$ converges.
::: solution
The signs of $\sin n$ follow no simple pattern, so neither the alternating series test below nor the positive-term tests apply directly. But $\abs{\frac{\sin n}{n^2}} \le \frac{1}{n^2}$, so $\sum\abs{\frac{\sin n}{n^2}}$ converges by direct comparison with the $p$-series for $p = 2$. By [[#thm-absolute]] the series converges (absolutely).
:::
:::

## Ratio and root tests

The tests in this section compare a series with a geometric series. They work beautifully for terms built from factorials, exponentials and $n$th powers, and conclude absolute convergence.

::: theorem Ratio test {#thm-ratio}
Let $a_n \ne 0$ for all $n$ and suppose $\displaystyle\abs{\frac{a_{n+1}}{a_n}} \to L$, where $0 \le L \le \infty$.

1. If $L < 1$, the series $\sum a_n$ converges absolutely.
2. If $L > 1$ (including $L = \infty$), the series diverges.
3. If $L = 1$, the test is inconclusive.
:::

::: proof
1. Choose $q$ with $L < q < 1$. There is $N$ such that $\abs{a_{n+1}} \le q\abs{a_n}$ for $n \ge N$, and by induction $\abs{a_n} \le \abs{a_N}\,q^{n-N}$ for $n \ge N$. The right-hand side is the general term of a convergent geometric series (ratio $q < 1$), so $\sum \abs{a_n}$ converges by direct comparison.

2. If $L > 1$, there is $N$ with $\abs{a_{n+1}} > \abs{a_n}$ for all $n \ge N$. Then $\abs{a_n} \ge \abs{a_N} > 0$ for $n \ge N$, so $a_n \not\to 0$ and the series diverges by the divergence test.

3. For both $\sum\frac1n$ (divergent) and $\sum\frac1{n^2}$ (convergent) the ratio $\abs{a_{n+1}/a_n}$ tends to $1$, so $L = 1$ cannot decide.
:::

::: example The ratio test at work {#ex-ratio}
Decide the convergence of (a) $\displaystyle\sum\frac{3^n}{n!}$, (b) $\displaystyle\sum\frac{n^2}{2^n}$, (c) $\displaystyle\sum\frac{n!}{n^n}$, (d) $\displaystyle\sum\frac{(2n)!}{(n!)^2}$.
::: solution
(a) $\dfrac{a_{n+1}}{a_n} = \dfrac{3^{n+1}}{(n+1)!}\cdot\dfrac{n!}{3^n} = \dfrac{3}{n+1} \to 0 < 1$: converges.

(b) $\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)^2}{n^2}\cdot\dfrac{2^n}{2^{n+1}} = \dfrac12\left(1 + \dfrac1n\right)^2 \to \dfrac12$: converges.

(c) $\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!} = \dfrac{n^n}{(n+1)^n} = \dfrac{1}{(1 + 1/n)^n} \to \dfrac1e < 1$: converges.

(d) $\dfrac{a_{n+1}}{a_n} = \dfrac{(2n+2)(2n+1)}{(n+1)^2} = \dfrac{2(2n+1)}{n+1} \to 4 > 1$: diverges. (These are the central binomial coefficients $\binom{2n}{n}$, which grow roughly like $4^n/\sqrt{\pi n}$.)

Notice how factorials and powers cancel in the ratio, leaving something simple. That is the signal to use the ratio test.
:::
:::

::: theorem Root test {#thm-root}
Suppose $\abs{a_n}^{1/n} \to L$, where $0 \le L \le \infty$. If $L < 1$ the series $\sum a_n$ converges absolutely; if $L > 1$ it diverges; if $L = 1$ the test is inconclusive.
:::

::: proof
If $L < 1$, choose $q$ with $L < q < 1$; for large $n$, $\abs{a_n}^{1/n} < q$, so $\abs{a_n} < q^n$, and $\sum\abs{a_n}$ converges by comparison with the geometric series $\sum q^n$. If $L > 1$, then $\abs{a_n}^{1/n} > 1$ and hence $\abs{a_n} > 1$ for all large $n$, so $a_n \not\to0$ and the series diverges. For $\sum 1/n$ and $\sum 1/n^2$ we have $\abs{a_n}^{1/n} = n^{-1/n}$ or $n^{-2/n}$, both tending to $1$ ([[calculus-2/sequences#ex-nth-root]]), so $L = 1$ is inconclusive.
:::

::: example The root test {#ex-root}
Show that $\displaystyle\sum_{n=1}^\infty\left(\frac{n}{2n+1}\right)^n$ and $\displaystyle\sum_{n=1}^\infty\left(1 + \frac1n\right)^{-n^2}$ converge.
::: solution
For the first, $\abs{a_n}^{1/n} = \dfrac{n}{2n+1} \to \dfrac12 < 1$. For the second, $\abs{a_n}^{1/n} = \left(1 + \dfrac1n\right)^{-n} \to e^{-1} < 1$. Both converge by the root test. The ratio test would be painful here: an $n$th power invites the root test.
:::
:::

::: warning L = 1 means "use another test"
When the ratio or root limit equals $1$, the series may converge or diverge, and you must switch tests. This happens for every series whose terms behave like a power of $n$, such as rational functions of $n$; use comparison with a $p$-series for those. Also, the ratio test needs the *limit* of $\abs{a_{n+1}/a_n}$: knowing only that $\abs{a_{n+1}/a_n} < 1$ for all $n$ is not enough, as $\sum\frac1n$ shows (there $\frac{n}{n+1} < 1$ for every $n$).
:::

::: quiz
For which of these series is the ratio test inconclusive? (Select all that apply.)
- [x] $\displaystyle\sum\frac{1}{n^2}$
- [ ] $\displaystyle\sum\frac{2^n}{n!}$
- [ ] $\displaystyle\sum\frac{n}{3^n}$
- [x] $\displaystyle\sum\frac{1}{\sqrt n}$
::: solution
For $\sum 1/n^2$ the ratio is $\frac{n^2}{(n+1)^2} \to 1$, and for $\sum 1/\sqrt n$ it is $\sqrt{n/(n+1)} \to 1$: inconclusive in both cases (the first converges, the second diverges, by the $p$-series test). For $\sum 2^n/n!$ the ratio $\frac{2}{n+1} \to 0$, and for $\sum n/3^n$ it is $\frac{n+1}{3n} \to \frac13$; both converge.
:::
:::

## Alternating series

A series whose terms alternate in sign, such as $1 - \frac12 + \frac13 - \frac14 + \cdots$, can converge because of cancellation even when the series of absolute values diverges.

::: theorem Alternating series test {#thm-alternating}
Let $(b_n)$ be a decreasing sequence of positive numbers with $b_n \to 0$. Then the **alternating series** $\sum_{n=1}^\infty (-1)^{n+1} b_n = b_1 - b_2 + b_3 - \cdots$ converges. Its sum $S$ lies between any two consecutive partial sums, and

$$
\abs{S - s_N} \le b_{N+1} \qquad \text{for every } N \ge 1 .
$$ {#eq-alternating-error}
:::

::: proof
Consider the partial sums of even and of odd index. Because $(b_n)$ is decreasing,

$$
s_{2n+2} = s_{2n} + (b_{2n+1} - b_{2n+2}) \ge s_{2n}, \qquad s_{2n+1} = s_{2n-1} - (b_{2n} - b_{2n+1}) \le s_{2n-1}.
$$

So the even partial sums increase and the odd ones decrease. Also $s_{2n} = s_{2n-1} - b_{2n} < s_{2n-1}$, so

$$
s_2 \le s_4 \le s_6 \le \cdots \le s_{2n} < s_{2n-1} \le \cdots \le s_3 \le s_1 .
$$

The even partial sums are increasing and bounded above by $s_1$; the odd ones are decreasing and bounded below by $s_2$. By the monotone convergence theorem both converge, say $s_{2n} \to S$ and $s_{2n-1} \to S'$. Since $s_{2n+1} - s_{2n} = b_{2n+1} \to 0$, we get $S = S'$. Then $s_n \to S$: given $\eps > 0$, choose $N$ so that both $\abs{s_{2n} - S} < \eps$ and $\abs{s_{2n-1} - S} < \eps$ for $n \ge N$; every index $m \ge 2N$ is of one of these two forms with $n \ge N$.

Finally, $S$ is the supremum of the even and the infimum of the odd partial sums, so $s_{2n} \le S \le s_{2n+1}$ and $s_{2n+2} \le S \le s_{2n+1}$ for all $n$. Thus $S$ lies between $s_N$ and $s_{N+1}$, and $\abs{S - s_N} \le \abs{s_{N+1} - s_N} = b_{N+1}$.
:::

In words: for an alternating series that passes the test, **the error is at most the first omitted term**, and the error has the sign of that term.

::: example The alternating harmonic series {#ex-alt-harmonic}
Show that $\displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n}$ converges conditionally, and find how many terms guarantee an error below $0.001$.
::: solution
Here $b_n = \frac1n$ is positive, decreasing and tends to $0$, so the series converges by [[#thm-alternating]]. The series of absolute values is the harmonic series, which diverges, so the convergence is conditional.

By [[#eq-alternating-error]], $\abs{S - s_N} \le \frac{1}{N+1}$, which is below $0.001$ once $N + 1 > 1000$, that is $N \ge 1000$. The partial sums $1, 0.5, 0.833, 0.583, 0.783, 0.617, \dots$ zigzag around the sum, which we shall identify in [[calculus-2/power-series]] as $\ln 2 = 0.693\,147\ldots$; indeed $s_{1000} = 0.692\,647$, with error $0.000\,50$. Convergence this slow is typical of conditionally convergent series.
:::
:::

::: widget sequence
a: (-1)^(n+1)/n
mode: both
N: 40
limit: ln(2)
epsilon: 0.05
caption: Terms and partial sums of $1 - \frac12 + \frac13 - \cdots$. The partial sums zigzag around $\ln 2$, the even ones climbing and the odd ones falling, and each partial sum misses the limit by at most the next term. With $\eps = 0.05$ the partial sums stay in the band from about $n = 10$ on — slow convergence, as the error bound $\frac{1}{n+1}$ predicts.
:::

::: warning All three hypotheses are needed
The terms must alternate in sign, decrease in absolute value, and tend to zero. If $b_n \not\to 0$, the series diverges by the divergence test. If $b_n \to 0$ but not monotonically, the series may diverge: take $b_n = \frac1n$ for odd $n$ and $b_n = \frac{1}{n^2}$ for even $n$. Then $\sum(-1)^{n+1}b_n$ is the sum of $1 + \frac13 + \frac15 + \cdots$, which diverges, and $-\left(\frac14 + \frac1{16} + \cdots\right)$, which converges; by [[calculus-2/series#thm-linear]] the total diverges.
:::

::: example A fast alternating series {#ex-alt-factorial}
Approximate $\displaystyle\sum_{n=0}^\infty\frac{(-1)^n}{n!} = 1 - 1 + \frac12 - \frac16 + \cdots$ with error less than $10^{-3}$.
::: solution
The terms $b_n = 1/n!$ decrease (for $n \ge 1$) and tend to $0$, so the test applies. The first term smaller than $10^{-3}$ is $\frac{1}{7!} = \frac{1}{5040} \approx 0.000\,198$. So the sum through $n = 6$,

$$
1 - 1 + \frac12 - \frac16 + \frac1{24} - \frac1{120} + \frac1{720} = 0.368\,056,
$$

is within $0.000\,2$ of the sum. Since the first omitted term is negative, the true sum is slightly *smaller*. (The sum is $e^{-1} = 0.367\,879$, as we shall see in [[calculus-2/taylor-series]]; the actual error is $0.000\,18$.)
:::
:::

### Rearrangements

For finite sums the order of the terms is irrelevant. For conditionally convergent series this fails dramatically. Rearrange the alternating harmonic series so that two positive terms are followed by one negative term:

$$
1 + \frac13 - \frac12 + \frac15 + \frac17 - \frac14 + \frac19 + \frac1{11} - \frac16 + \cdots
$$

Every term of the original series appears exactly once. Yet the partial sums of this series converge to $\frac32\ln 2 \approx 1.0397$, not to $\ln 2$: after $30$, $300$ and $3000$ terms they are $1.0152$, $1.0372$ and $1.0395$.

::: widget sequence
a: if(mod(n, 3) == 1, 1/(4*ceil(n/3) - 3), if(mod(n, 3) == 2, 1/(4*ceil(n/3) - 1), -1/(2*ceil(n/3))))
mode: sums
N: 90
limit: 1.5*ln(2)
caption: Partial sums of the rearranged series $1 + \frac13 - \frac12 + \frac15 + \frac17 - \frac14 + \cdots$ (two positive terms, then one negative). The same terms as the alternating harmonic series, in a different order — but the partial sums head for $\frac32\ln 2 \approx 1.040$, not $\ln 2 \approx 0.693$.
:::

::: theorem Rearrangement theorems {#thm-rearrangement}
1. (Dirichlet) If $\sum a_n$ converges absolutely, then every rearrangement of it converges, to the same sum.
2. (Riemann) If $\sum a_n$ converges conditionally, then for every real number $M$ there is a rearrangement whose sum is $M$, and there are rearrangements that diverge to $\infty$ or to $-\infty$.
:::

::: proof {collapsed}
*Proof sketch of 2.* Let $p_1, p_2, \dots$ be the non-negative terms and $q_1, q_2, \dots$ the absolute values of the negative terms, each in their original order. Both $\sum p_k$ and $\sum q_k$ diverge: if both converged, $\sum\abs{a_n} = \sum p_k + \sum q_k$ would converge; if exactly one converged, $\sum a_n$ would diverge by [[calculus-2/series#thm-linear]]. Now build a rearrangement greedily: take positive terms until the partial sum first exceeds $M$, then negative terms until it first drops below $M$, then positive terms again, and so on. Each phase ends because the corresponding series diverges, so every term is eventually used. After each switch the partial sum differs from $M$ by at most the last term used, and the terms tend to $0$ because $\sum a_n$ converges; so the partial sums converge to $M$. Aiming at $1, 2, 3, \dots$ in turn gives a rearrangement diverging to $\infty$.

Statement 1 is proved by comparing the partial sums of the rearranged series with tails of $\sum\abs{a_n}$; see [[real-analysis/series]] for the full proofs of both parts.
:::

So the order of summation matters exactly for conditionally convergent series. Absolutely convergent series behave like finite sums: they can be reordered, regrouped and multiplied freely. This is one reason why absolute convergence is the "good" kind of convergence, and why power series, which converge absolutely inside their interval of convergence, are so well behaved.

::: quiz
How does $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n}{\sqrt n}$ behave?
- [ ] It converges absolutely.
- [x] It converges conditionally.
- [ ] It diverges, because $\sum 1/\sqrt n$ diverges.
- [ ] It diverges by the divergence test.
::: solution
The terms $\frac{1}{\sqrt n}$ are positive, decreasing and tend to $0$, so the alternating series converges by [[#thm-alternating]]. The series of absolute values $\sum\frac1{\sqrt n}$ is a $p$-series with $p = \frac12 \le 1$, so it diverges. Hence the convergence is conditional; by Riemann's theorem a suitable rearrangement could be made to sum to any number at all.
:::
:::

## Choosing a test

With so many tests available, the skill lies in choosing quickly. A practical order of questions is:

1. **Do the terms tend to $0$?** If not, the series diverges (divergence test). This check takes seconds.
2. **Is it a known series?** Geometric ($\sum ar^n$: converges iff $\abs r < 1$), $p$-series ($\sum 1/n^p$: converges iff $p > 1$), telescoping.
3. **Algebraic terms (powers, roots, rational functions of $n$)?** Compare with a $p$-series, usually by limit comparison with the dominant term.
4. **Factorials or exponentials $a^n$?** Ratio test.
5. **A whole $n$th power such as $(\ldots)^n$?** Root test.
6. **Alternating signs?** First test for absolute convergence; if that fails, try the alternating series test.
7. **Terms $f(n)$ with $f$ easy to integrate (logarithms, $x e^{-x^2}$)?** Integral test.

::: example Classifying a list of series {#ex-classify}
Decide whether each series converges absolutely, converges conditionally or diverges: (a) $\sum\frac{n^3}{e^n}$, (b) $\sum\frac{(-1)^n n}{n^2 + 1}$, (c) $\sum\frac{(-2)^n}{n^2}$, (d) $\sum\frac{\ln n}{n}$.
::: solution
(a) Exponentials suggest the ratio test: $\frac{(n+1)^3}{n^3}\cdot\frac{e^n}{e^{n+1}} \to \frac1e < 1$. Converges absolutely (all terms are positive).

(b) Absolute values $\frac{n}{n^2+1}$ behave like $\frac1n$: limit comparison gives $\frac{n^2}{n^2+1} \to 1$, so $\sum\abs{a_n}$ diverges. For the alternating series test, $b_n = \frac{n}{n^2+1} \to 0$, and $b_n$ is decreasing for $n \ge 1$ because $f(x) = \frac{x}{x^2+1}$ has $f'(x) = \frac{1 - x^2}{(x^2+1)^2} \le 0$ for $x \ge 1$. So the series converges conditionally.

(c) $\abs{a_n} = \frac{2^n}{n^2} \to \infty$, so the terms do not tend to $0$: divergent by step 1.

(d) For $n \ge 3$, $\frac{\ln n}{n} \ge \frac1n$, so the series diverges by direct comparison with the harmonic series.
:::
:::

::: history
Gottfried Wilhelm Leibniz described the alternating series criterion in letters of 1705 and 1713, which is why [[#thm-alternating]] is often called *Leibniz's test*. Colin Maclaurin used the comparison of sums with integrals in his *Treatise of Fluxions* (1742), and Augustin-Louis Cauchy later gave it a rigorous form, hence the name *Maclaurin–Cauchy integral test*. Jean le Rond d'Alembert published the ratio test in 1768, and Cauchy proved the root test in his *Cours d'analyse* (1821). In 1837 Peter Gustav Lejeune Dirichlet observed that the alternating harmonic series can be rearranged to change its sum while absolutely convergent series cannot; Bernhard Riemann's rearrangement theorem appeared in his 1854 thesis on trigonometric series, published only after his death.
:::

## Where this leads

The ratio and root tests are exactly what is needed to find where a power series $\sum c_n (x - a)^n$ converges, which is the first task of [[calculus-2/power-series]]; the alternating series error bound is used constantly to estimate values of Taylor series in [[calculus-2/taylor-series]]. The integral test reflects a deeper relationship between sums and integrals, refined by the Euler–Maclaurin formula and used for numerical integration in [[numerical-analysis/numerical-integration]]. The full theory — the Cauchy criterion, $\limsup$ versions of the ratio and root tests, and proofs of the rearrangement theorems — is in [[real-analysis/series]].

::: summary
- For non-negative terms, convergence means bounded partial sums; every positive-term test is a way of bounding them by a known series or integral.
- Integral test: for $f$ positive and decreasing, $\sum f(n)$ and $\int_1^\infty f$ converge together, and the tail lies between $\int_{N+1}^\infty f$ and $\int_N^\infty f$.
- $p$-series: $\sum 1/n^p$ converges exactly when $p > 1$.
- Comparison: smaller than convergent is convergent, larger than divergent is divergent. Limit comparison: if $a_n/b_n \to c \in (0,\infty)$ both behave alike.
- Ratio and root tests: limit $L < 1$ gives absolute convergence, $L > 1$ divergence, $L = 1$ no information.
- Absolute convergence implies convergence. Alternating series with decreasing terms tending to $0$ converge, with error at most the first omitted term.
- Conditionally convergent series can be rearranged to have any sum; absolutely convergent series cannot.
:::

## Exercises

::: exercise p-series {level=1}
Which of these converge: (a) $\sum n^{-1.01}$, (b) $\sum n^{-0.99}$, (c) $\sum \frac{1}{n\sqrt n}$, (d) $\sum\frac{1}{\sqrt[3]{n}}$?
::: solution
By [[#cor-p-series]]: (a) $p = 1.01 > 1$, converges; (b) $p = 0.99 \le 1$, diverges; (c) $\frac{1}{n\sqrt n} = n^{-3/2}$, $p = \frac32 > 1$, converges; (d) $n^{-1/3}$, $p = \frac13$, diverges.
:::
:::

::: exercise A comparison {level=1}
Show that $\displaystyle\sum_{n=1}^\infty\frac{n}{n^3 + 2}$ converges.
::: solution
For $n \ge 1$, $0 < \dfrac{n}{n^3+2} < \dfrac{n}{n^3} = \dfrac{1}{n^2}$, and $\sum 1/n^2$ converges, so the series converges by direct comparison ([[#thm-comparison]]).
:::
:::

::: exercise A ratio {level=1 check="3/4"}
Find the limit $L$ of $\abs{a_{n+1}/a_n}$ for the series $\displaystyle\sum_{n=1}^\infty\frac{n^2\,3^n}{4^n}$. Does the series converge?
::: solution
$\dfrac{a_{n+1}}{a_n} = \dfrac{(n+1)^2}{n^2}\cdot\dfrac34 \to \dfrac34$. Since $L = \frac34 < 1$, the series converges by the ratio test.
:::
:::

::: exercise Logarithmic p-series {level=2 #exr-log-p}
For which real $p$ does $\displaystyle\sum_{n=2}^\infty\frac{1}{n(\ln n)^p}$ converge?
::: hint
Substitute $u = \ln x$ in $\int_2^\infty\frac{dx}{x(\ln x)^p}$.
:::
::: solution
For $p \le 0$ the terms are at least $\frac1n$ for $n \ge 3$ (because $(\ln n)^p \le 1$ there), so the series diverges by comparison with the harmonic series. For $p > 0$, $f(x) = \frac{1}{x(\ln x)^p}$ is positive, continuous and decreasing on $[2,\infty)$, and with $u = \ln x$,

$$
\int_2^\infty\frac{dx}{x(\ln x)^p} = \int_{\ln 2}^\infty\frac{du}{u^p},
$$

which converges exactly when $p > 1$. By the integral test, the series converges if and only if $p > 1$.
:::
:::

::: exercise Conditional convergence {level=2}
Show that $\displaystyle\sum_{n=1}^\infty\frac{(-1)^n\, n}{n^2+1}$ converges conditionally.
::: solution
This is part (b) of [[#ex-classify]]: the absolute values behave like $\frac1n$ (limit comparison), so the series does not converge absolutely; the terms $b_n = \frac{n}{n^2+1}$ decrease to $0$ (the derivative of $\frac{x}{x^2+1}$ is $\le 0$ for $x \ge 1$), so the alternating series test gives convergence.
:::
:::

::: exercise How many terms? {level=2 check="21"}
What is the smallest $N$ for which the alternating series error bound guarantees $\abs{S - s_N} < 10^{-4}$ for $S = \displaystyle\sum_{n=1}^\infty\frac{(-1)^{n+1}}{n^3}$?
::: solution
By [[#eq-alternating-error]] we need $b_{N+1} = \dfrac{1}{(N+1)^3} < 10^{-4}$, that is $(N+1)^3 > 10^4$, so $N + 1 > 21.54$. The smallest integer is $N + 1 = 22$, so $N = 21$. (Then $s_{21} \approx 0.901\,593$ while $S = 0.901\,543$, so the actual error is $5\times10^{-5}$.)
:::
:::

::: exercise A remainder estimate {level=2 check="1000"}
Use the bounds [[#eq-integral-bounds]] to find the smallest $N$ for which you can be sure that $s_N$ approximates $\sum_{n=1}^\infty\frac1{n^2}$ with error at most $0.001$. Show that no smaller $N$ works.
::: solution
With $f(x) = 1/x^2$, $\int_N^\infty f = \frac1N$ and $\int_{N+1}^\infty f = \frac{1}{N+1}$, so $\frac{1}{N+1} \le R_N \le \frac{1}{N}$. The upper bound gives $R_N \le 0.001$ as soon as $N \ge 1000$. For $N \le 999$ the lower bound gives $R_N \ge \frac{1}{N+1} \ge \frac{1}{1000}$, and in fact $R_N > 0.001$ because $f$ is strictly decreasing, so the inequalities in [[#eq-integral-sandwich]] are strict. Hence $N = 1000$. (Indeed $R_{1000} = 0.000\,999\,5$.)
:::
:::

::: exercise Choose a test {level=2}
Determine whether each series converges: (a) $\sum\frac{5^n}{n!}$, (b) $\sum\left(\frac{2n+1}{3n+1}\right)^n$, (c) $\sum\frac{\sqrt n}{n^2 + 1}$, (d) $\sum\frac{n}{\ln(n+1)}$.
::: solution
(a) Ratio: $\frac{5}{n+1} \to 0$, converges. (b) Root: $\frac{2n+1}{3n+1} \to \frac23 < 1$, converges. (c) Limit comparison with $n^{-3/2}$: $\frac{\sqrt n/(n^2+1)}{n^{-3/2}} = \frac{n^2}{n^2+1} \to 1$, and $\sum n^{-3/2}$ converges, so this converges. (d) The terms tend to $\infty$, so the series diverges by the divergence test.
:::
:::

::: exercise Bounded multipliers {level=3}
Suppose $\sum a_n$ converges absolutely and $(b_n)$ is bounded. Prove that $\sum a_nb_n$ converges absolutely. Give an example showing that "absolutely" cannot be replaced by "conditionally".
::: solution
Let $\abs{b_n} \le M$ for all $n$. Then $0 \le \abs{a_nb_n} \le M\abs{a_n}$, and $\sum M\abs{a_n}$ converges, so $\sum\abs{a_nb_n}$ converges by direct comparison.

For the example take $a_n = \frac{(-1)^n}{n}$, which converges conditionally, and $b_n = (-1)^n$, which is bounded. Then $a_nb_n = \frac1n$ and $\sum a_nb_n$ is the harmonic series, which diverges.
:::
:::

::: exercise Square roots of a convergent series {level=3}
Let $a_n \ge 0$ with $\sum a_n$ convergent. Prove that $\displaystyle\sum\frac{\sqrt{a_n}}{n}$ converges.
::: hint
For non-negative $x, y$, $\sqrt{xy} \le \frac12(x + y)$.
:::
::: solution
Apply the inequality $\sqrt{xy} \le \frac{x+y}{2}$ (which is $(\sqrt x - \sqrt y)^2 \ge 0$ rearranged) with $x = a_n$ and $y = \frac{1}{n^2}$:

$$
0 \le \frac{\sqrt{a_n}}{n} = \sqrt{a_n\cdot\frac{1}{n^2}} \le \frac12\left(a_n + \frac1{n^2}\right).
$$

The right-hand side is the general term of a convergent series (a sum of two convergent series), so the series converges by direct comparison.
:::
:::

::: exercise Cauchy's condensation test {level=3}
Let $(a_n)$ be a decreasing sequence of non-negative numbers. Prove that $\sum_{n=1}^\infty a_n$ converges if and only if $\sum_{k=0}^\infty 2^k a_{2^k}$ converges. Use it to give a new proof of the $p$-series test.
::: hint
Group the terms in blocks $a_{2^k} + \cdots + a_{2^{k+1}-1}$, as in Oresme's proof that the harmonic series diverges.
:::
::: solution
The block $B_k = a_{2^k} + a_{2^k+1} + \cdots + a_{2^{k+1}-1}$ has $2^k$ terms, each between $a_{2^{k+1}}$ and $a_{2^k}$ since the sequence is decreasing. Hence

$$
\tfrac12\, 2^{k+1}a_{2^{k+1}} = 2^k a_{2^{k+1}} \le B_k \le 2^k a_{2^k}.
$$

The partial sum $s_{2^{K+1} - 1} = B_0 + \cdots + B_K$ is therefore at most $\sum_{k=0}^{K}2^ka_{2^k}$ and at least $\frac12\sum_{k=1}^{K+1}2^ka_{2^k}$. If the condensed series converges, the partial sums $s_{2^{K+1}-1}$, and hence all partial sums $s_n$ (which increase with $n$), are bounded, so $\sum a_n$ converges. If $\sum a_n$ converges, the second inequality bounds the partial sums of the condensed series by $2\sum a_n + a_1$, so it converges.

For $a_n = n^{-p}$ with $p > 0$, the condensed series is $\sum 2^k\,2^{-kp} = \sum\left(2^{1-p}\right)^k$, a geometric series that converges exactly when $2^{1-p} < 1$, that is $p > 1$.
:::
:::
