Walk halfway to a wall, then half of the remaining distance, then half of what is left, and so on. The distances walked are $\tfrac12, \tfrac14, \tfrac18, \dots$, and common sense says that altogether they add up to the whole distance:

$$
\frac12 + \frac14 + \frac18 + \frac1{16} + \cdots = 1 .
$$

But what does it mean to add infinitely many numbers? Nobody can carry out infinitely many additions, and naive manipulation of infinite sums quickly leads to nonsense. Consider $S = 1 - 1 + 1 - 1 + \cdots$. Grouping as $(1 - 1) + (1 - 1) + \cdots$ suggests $S = 0$; grouping as $1 - (1 - 1) - (1 - 1) - \cdots$ suggests $S = 1$; and $S = 1 - (1 - 1 + 1 - \cdots) = 1 - S$ suggests $S = \tfrac12$. All three cannot be right.

The way out is to define an infinite sum through a limit of *finite* sums, using the theory of [[calculus-2/sequences]]. In this chapter we make that definition, compute the two families of series that can be summed exactly (geometric and telescoping series), prove the simple but important divergence test, and study the harmonic series $1 + \tfrac12 + \tfrac13 + \cdots$, whose terms tend to zero but whose sum is infinite.

## Partial sums

::: definition Series and its sum {#def-series}
Let $(a_n)_{n\ge1}$ be a sequence. The **series** $\sum_{n=1}^\infty a_n = a_1 + a_2 + a_3 + \cdots$ is the sequence of **partial sums**

$$
s_n = a_1 + a_2 + \cdots + a_n = \sum_{k=1}^{n} a_k .
$$

If $s_n \to S$ for a real number $S$, the series **converges** and $S$ is its **sum**; we write $\sum_{n=1}^\infty a_n = S$. Otherwise the series **diverges**. If $s_n \to \infty$ we write $\sum a_n = \infty$ and say the series diverges to infinity. The numbers $a_n$ are the **terms** of the series.
:::

Two sequences are attached to every series, and it is essential not to confuse them: the sequence of **terms** $(a_n)$ and the sequence of **partial sums** $(s_n)$. The series converges when the partial sums converge. Series may also start at $n = 0$ or any other index; the definition is the same.

Under this definition, the series $1 - 1 + 1 - 1 + \cdots$ has partial sums $1, 0, 1, 0, \dots$, which diverge (they behave like $(-1)^n$, see [[calculus-2/sequences#ex-alt-diverges]]). It has no sum, and the contradictory "values" $0$, $1$ and $\tfrac12$ came from manipulations that are not valid for divergent series.

::: quiz
For a series $\sum a_n$ with partial sums $s_n$, which statement is correct?
- [ ] The series converges if $a_n \to 0$.
- [x] The series converges if $s_n$ tends to a real number, and the sum is that number.
- [ ] The series converges if $s_n$ is bounded.
- [ ] The sum is $\lim_{n\to\infty} a_n$.
::: solution
By [[#def-series]], convergence of a series means convergence of its partial sums. Terms tending to $0$ is *not* enough (the harmonic series below is the standard counterexample), and bounded partial sums are not enough either ($1 - 1 + 1 - \cdots$ has partial sums $1, 0, 1, 0, \dots$). The limit of the terms is a different thing from the sum.
:::
:::

## Geometric series

The most important series of all is the geometric series, in which each term is a fixed multiple $r$ of the previous one. It is one of the very few series whose partial sums have a simple closed form.

::: theorem Geometric series {#thm-geometric}
Let $a \ne 0$. The **geometric series** $\sum_{n=0}^\infty a r^n = a + ar + ar^2 + \cdots$ converges if and only if $\abs r < 1$, and then

$$
\sum_{n=0}^{\infty} a r^n = \frac{a}{1 - r}.
$$ {#eq-geometric}
:::

::: proof
Let $s_n = a + ar + \cdots + ar^{n}$ (the sum of the first $n + 1$ terms). Then $r s_n = ar + ar^2 + \cdots + ar^{n+1}$, and subtracting, all terms but two cancel: $s_n - rs_n = a - ar^{n+1}$. Hence, for $r \ne 1$,

$$
s_n = a\,\frac{1 - r^{n+1}}{1 - r}.
$$ {#eq-geometric-partial}

If $\abs r < 1$, then $r^{n+1} \to 0$ ([[calculus-2/sequences#thm-geometric-seq]]), so $s_n \to a/(1-r)$. If $\abs r > 1$ or $r = -1$, the sequence $r^{n+1}$ diverges, so $s_n$, which is an affine function of it, diverges as well. If $r = 1$, then $s_n = (n+1)a$, which diverges since $a \ne 0$.
:::

A useful way to remember [[#eq-geometric]]: the sum of a convergent geometric series is

$$
\frac{\text{first term}}{1 - \text{common ratio}} .
$$

::: widget sequence
a: r^(n-1)
start: 1
mode: both
N: 30
sliders: r=0.5:-1.2:1.2:0.05
y: -3, 12
caption: Terms $r^{n-1}$ (dots) and partial sums $s_n$ of $1 + r + r^2 + \cdots$. For $\lvert r\rvert<1$ the partial sums level off at $\frac{1}{1-r}$ (try $r = 0.5$, $0.8$, $0.9$: limits $2$, $5$, $10$). For negative $r$ they zigzag around the limit. At $r = 1$ they climb linearly, at $r = -1$ they alternate $1, 0, 1, 0, \dots$, and for $\lvert r\rvert > 1$ they run away.
:::

::: example Repeating decimals {#ex-decimals}
Write $0.272727\ldots$ and $0.999\ldots$ as fractions.
::: solution
A decimal expansion is itself a series: $0.d_1d_2d_3\ldots = \sum_k d_k 10^{-k}$. For the first number,

$$
0.272727\ldots = \frac{27}{100} + \frac{27}{100^2} + \frac{27}{100^3} + \cdots ,
$$

a geometric series with first term $\frac{27}{100}$ and ratio $\frac{1}{100}$. Its sum is $\dfrac{27/100}{1 - 1/100} = \dfrac{27}{99} = \dfrac{3}{11}$.

Similarly $0.999\ldots = \dfrac{9}{10} + \dfrac{9}{100} + \cdots = \dfrac{9/10}{1 - 1/10} = 1$. The notation $0.999\ldots$ *means* the limit of the partial sums $0.9, 0.99, 0.999, \dots$, and that limit is exactly $1$. There is no "infinitely small" gap left over.
:::
:::

::: example Rewriting into geometric form {#ex-geometric-shift}
Find $\displaystyle\sum_{n=1}^\infty \frac{2^{n+1}}{3^n}$.
::: solution
Write each term as a constant times a power of a single ratio: $\dfrac{2^{n+1}}{3^n} = 2\left(\dfrac23\right)^n$. The series starts at $n = 1$, so its first term is $2\cdot\frac23 = \frac43$ and its ratio is $\frac23$:

$$
\sum_{n=1}^\infty 2\left(\frac23\right)^n = \frac{4/3}{1 - 2/3} = 4 .
$$

The most common error is to use [[#eq-geometric]] as if the series started at $n = 0$, which would give $2/(1 - \frac23) = 6$. Always identify the actual first term.
:::
:::

### How many terms are enough?

In practice we often stop after finitely many terms and need to know how large the error is. For a convergent geometric series the error is itself a geometric series: if $S = \sum_{n=0}^\infty ar^n$ and $s_N = \sum_{n=0}^{N} ar^n$, then

$$
S - s_N = \sum_{n=N+1}^{\infty} ar^n = \frac{ar^{N+1}}{1-r}.
$$ {#eq-geometric-tail}

The error shrinks by the factor $r$ with each extra term. When $r$ is close to $1$ this is slow, and the formula tells us exactly how slow.

::: example Estimating a tail {#ex-geometric-tail}
How many terms of $\sum_{n=0}^\infty (0.9)^n = 10$ are needed to approximate the sum with error less than $10^{-6}$?
::: solution
By [[#eq-geometric-tail]] with $a = 1$ and $r = 0.9$, the error after the terms up to $n = N$ is $\dfrac{0.9^{N+1}}{0.1} = 10\cdot 0.9^{N+1}$. We need $10\cdot0.9^{N+1} < 10^{-6}$, that is $0.9^{N+1} < 10^{-7}$. Taking logarithms (and remembering that $\ln 0.9 < 0$ reverses the inequality),

$$
N + 1 > \frac{7\ln 10}{\ln(1/0.9)} = \frac{16.118}{0.10536} \approx 152.98 .
$$

So $N + 1 \ge 153$: the partial sum up to $n = 152$, which has $153$ terms, is the first with error below $10^{-6}$ (its error is $9.98\times10^{-7}$). Compare $r = 0.5$, where the error after $N + 1$ terms is $0.5^{N}$ and $21$ terms suffice ($2^{-20} \approx 9.5\times10^{-7}$). Ratios near $1$ converge slowly; this observation reappears in the ratio test of [[calculus-2/convergence-tests]].
:::
:::

::: application Bouncing balls and multipliers
A ball dropped from $2$ m rebounds each time to $\tfrac34$ of its previous height. It travels $2$ m down, then $2\cdot\tfrac32$ m (up and down) after the first bounce, $2\cdot\tfrac98$ m after the second, and so on: in total $2 + 2\sum_{k\ge1} 2\left(\tfrac34\right)^k = 2 + 4\cdot\dfrac{3/4}{1/4} = 14$ m, although it bounces infinitely often. Economists use the same formula for the *multiplier effect*: if each pound spent leads to $c$ pounds of further spending ($0 < c < 1$), an initial £1 generates $1 + c + c^2 + \cdots = 1/(1-c)$ pounds of total spending.
:::

## Telescoping series

In a **telescoping** series each term is a difference of consecutive values of some sequence, so that almost everything cancels in the partial sums, like the sections of a collapsing telescope.

::: theorem Telescoping series {#thm-telescoping}
Let $(b_n)$ be a sequence. The series $\sum_{n=1}^\infty (b_n - b_{n+1})$ converges if and only if $(b_n)$ converges, and then

$$
\sum_{n=1}^\infty (b_n - b_{n+1}) = b_1 - \lim_{n\to\infty} b_n .
$$
:::

::: proof
The partial sums collapse:

$$
s_n = (b_1 - b_2) + (b_2 - b_3) + \cdots + (b_n - b_{n+1}) = b_1 - b_{n+1}.
$$

So $s_n$ converges if and only if $b_{n+1}$ converges, that is, if and only if $(b_n)$ converges, and then $s_n \to b_1 - \lim b_n$.
:::

::: example A classic telescoping sum {#ex-telescoping}
Show that $\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)} = 1$.
::: solution
The partial-fraction decomposition $\dfrac{1}{n(n+1)} = \dfrac1n - \dfrac{1}{n+1}$ (check by combining the right-hand side) shows that the series is telescoping with $b_n = 1/n$. Explicitly,

$$
s_n = \left(1 - \frac12\right) + \left(\frac12 - \frac13\right) + \cdots + \left(\frac1n - \frac1{n+1}\right) = 1 - \frac{1}{n+1} \to 1 .
$$

So the sum is $b_1 - \lim b_n = 1 - 0 = 1$.
:::
:::

::: example Terms tend to zero, sum is infinite {#ex-log-telescope}
Does $\displaystyle\sum_{n=1}^\infty \ln\left(1 + \frac1n\right)$ converge?
::: solution
The terms tend to $\ln 1 = 0$, but that settles nothing. Since $\ln\left(1 + \frac1n\right) = \ln\frac{n+1}{n} = \ln(n+1) - \ln n$, the series telescopes with $b_n = -\ln n$:

$$
s_n = (\ln 2 - \ln 1) + (\ln 3 - \ln 2) + \cdots + (\ln(n+1) - \ln n) = \ln(n+1).
$$

The partial sums tend to $\infty$, so the series diverges, even though its terms tend to $0$.
:::
:::

### Algebra of series

Because a series is the limit of a sequence of partial sums, the limit laws of [[calculus-2/sequences#thm-seq-laws]] give rules for combining series.

::: theorem Linearity of convergent series {#thm-linear}
If $\sum a_n = A$ and $\sum b_n = B$ converge and $c$ is a constant, then $\sum (a_n + b_n)$ and $\sum c\,a_n$ converge, with

$$
\sum_{n=1}^\infty (a_n + b_n) = A + B, \qquad \sum_{n=1}^\infty c\,a_n = cA .
$$

If $\sum a_n$ converges and $\sum b_n$ diverges, then $\sum(a_n + b_n)$ diverges.
:::

::: proof
The partial sums of $\sum(a_n + b_n)$ are $\sum_{k\le n} a_k + \sum_{k\le n} b_k$, the sum of the partial sums of the two series, so the first statement is the sum law for sequences; the second is the constant-multiple law. For the last statement, if $\sum(a_n + b_n)$ converged, then $\sum b_n = \sum\bigl((a_n + b_n) - a_n\bigr)$ would converge by the first part, a contradiction.
:::

::: warning Products of series are not term-by-term
There is no rule $\sum a_n b_n = \left(\sum a_n\right)\left(\sum b_n\right)$. For example $\sum_{n\ge0} 2^{-n} = 2$, so the product of this series with itself is $4$, whereas $\sum_{n \ge 0} 2^{-n}\cdot 2^{-n} = \sum 4^{-n} = \tfrac43$. Multiplying two series requires every term of one to meet every term of the other (the *Cauchy product*, which we meet with power series in [[calculus-2/power-series]]).
:::

Convergence depends only on the "tail" of a series. If we delete or change finitely many terms, the partial sums change by a fixed amount from some point on, so convergence is unaffected (although the sum changes). In particular $\sum_{n=1}^\infty a_n$ converges if and only if $\sum_{n=N}^\infty a_n$ converges, for any $N$. When the series converges, the **tail** $R_N = \sum_{n=N+1}^\infty a_n = S - s_N$ tends to $0$ as $N \to\infty$; this is the error made when the sum is approximated by the partial sum $s_N$.

## The divergence test

Since convergence of a series is about partial sums, a necessary condition on the terms is easy to obtain.

::: theorem Divergence test {#thm-divergence}
If $\sum a_n$ converges, then $a_n \to 0$. Equivalently: if $a_n \not\to 0$ (the terms have a non-zero limit, or no limit at all), then $\sum a_n$ diverges.
:::

::: proof
Let $s_n \to S$. Then also $s_{n-1} \to S$ (a shifted sequence has the same limit), and $a_n = s_n - s_{n-1} \to S - S = 0$.
:::

::: example Applying the divergence test {#ex-divergence}
Decide whether (a) $\displaystyle\sum_{n=1}^\infty\frac{n}{2n+1}$, (b) $\displaystyle\sum_{n=1}^\infty \cos\frac1n$, (c) $\displaystyle\sum_{n=1}^\infty (-1)^n\frac{n}{n+1}$ converge.
::: solution
(a) $\dfrac{n}{2n+1} = \dfrac{1}{2 + 1/n} \to \dfrac12 \ne 0$, so the series diverges. Indeed each term is at least $\tfrac13$, so $s_n \ge n/3 \to \infty$.

(b) $\cos(1/n) \to \cos 0 = 1 \ne 0$ by continuity, so the series diverges.

(c) The terms have absolute value $\frac{n}{n+1} \to 1$, so they do not tend to $0$ (even-numbered terms approach $1$, odd-numbered terms approach $-1$). The series diverges.
:::
:::

::: warning The divergence test can only prove divergence
The test says "terms not tending to $0$ $\Rightarrow$ divergence". It never proves convergence. If $a_n \to 0$ the test is **inconclusive**: [[#ex-log-telescope]] and the harmonic series below have terms tending to $0$ and diverge, while $\sum 1/n^2$ has terms tending to $0$ and converges. Writing "$a_n \to 0$, so the series converges" is the single most common error with series.
:::

::: quiz
Suppose $a_n \to 0$. What can you conclude about $\sum a_n$?
- [ ] It converges.
- [ ] It diverges.
- [x] Nothing yet: it may converge or diverge.
- [ ] It converges if the $a_n$ are positive.
::: solution
The divergence test is inconclusive when $a_n \to 0$. Both behaviours occur, even for positive terms: $\sum \frac{1}{n(n+1)}$ converges and $\sum \ln\left(1 + \frac1n\right)$ diverges, and both have positive terms tending to $0$. Further tests are needed; they are the subject of [[calculus-2/convergence-tests]].
:::
:::

## The harmonic series

The series $\sum_{n=1}^\infty \frac1n = 1 + \frac12 + \frac13 + \cdots$ is called the **harmonic series** (the name comes from music: strings whose lengths are proportional to $1, \frac12, \frac13, \dots$ produce the harmonics of a fundamental note). Its terms tend to $0$, and its partial sums $H_n = \sum_{k=1}^n \frac1k$, the **harmonic numbers**, grow very slowly: $H_{100} \approx 5.19$ and $H_{1000} \approx 7.49$. Nevertheless they are unbounded.

::: theorem The harmonic series diverges {#thm-harmonic}
$\displaystyle\sum_{n=1}^\infty \frac1n = \infty$. More precisely, $H_{2^k} \ge 1 + \dfrac k2$ for every $k \ge 0$, and $\ln(n+1) < H_n \le 1 + \ln n$ for every $n \ge 1$.
:::

::: proof
**Grouping (Oresme's proof).** Group the terms in blocks whose lengths double:

$$
H_{2^k} = 1 + \frac12 + \left(\frac13 + \frac14\right) + \left(\frac15 + \cdots + \frac18\right) + \cdots + \left(\frac{1}{2^{k-1}+1} + \cdots + \frac{1}{2^k}\right).
$$

The block ending at $\frac{1}{2^j}$ has $2^{j-1}$ terms, each at least $\frac{1}{2^j}$, so the block is at least $2^{j-1}\cdot 2^{-j} = \frac12$. There are $k$ blocks after the initial $1$, so $H_{2^k} \ge 1 + \frac k2$. Since $(H_n)$ is increasing and $H_{2^k} \to \infty$, $H_n \to\infty$.

**Comparison with an integral.** For $k \le x \le k+1$ we have $\frac1x \le \frac1k$, with strict inequality except at $x = k$, so $\int_k^{k+1}\frac{dx}{x} < \frac1k$. Summing for $k = 1, \dots, n$,

$$
\ln(n+1) = \int_1^{n+1}\frac{dx}{x} < \sum_{k=1}^n\frac1k = H_n .
$$

Similarly $\frac1k \le \int_{k-1}^{k}\frac{dx}{x}$ for $k \ge 2$, and summing for $k = 2, \dots, n$ gives $H_n - 1 \le \int_1^n \frac{dx}{x} = \ln n$.
:::

::: remark A third proof, by contradiction
Suppose the harmonic series converged, with sum $H$. Then the series of even-numbered terms $E = \frac12 + \frac14 + \frac16 + \cdots = \frac12 H$ would converge by [[#thm-linear]], and so would the series of odd-numbered terms $O = 1 + \frac13 + \frac15 + \cdots$, because its partial sums are $O_m = H_{2m} - E_m \to H - \frac12H = \frac12H$, where $E_m = \frac12 + \cdots + \frac{1}{2m}$. Hence $O = E$. But term by term $1 > \frac12$, $\frac13 > \frac14$, $\frac15 > \frac16$, …, so $O - E = \sum_{k\ge1}\left(\frac{1}{2k-1} - \frac{1}{2k}\right) \ge 1 - \frac12 > 0$. This contradiction shows that $H$ cannot exist.
:::

The bounds $\ln(n+1) < H_n \le 1 + \ln n$ show how slow the divergence is. The partial sums first exceed $10$ at $n = 12\,367$ and first exceed $20$ at $n = 272\,400\,600$; to exceed $100$ you would need about $1.5\times10^{43}$ terms. No computer could ever "see" the divergence numerically: this is a series where only proof will do.

The difference $H_n - \ln n$ does even better than stay bounded: it converges.

::: theorem The Euler–Mascheroni constant {#thm-gamma}
The sequence $D_n = H_n - \ln n$ is decreasing and bounded below by $0$, so it converges. Its limit

$$
\gamma = \lim_{n\to\infty}\left(1 + \frac12 + \cdots + \frac1n - \ln n\right) = 0.577\,215\,664\,9\ldots
$$

is the **Euler–Mascheroni constant**.
:::

::: proof
Bounded below: by [[#thm-harmonic]], $H_n > \ln(n+1) > \ln n$, so $D_n > 0$. Decreasing:

$$
D_n - D_{n+1} = \ln(n+1) - \ln n - \frac{1}{n+1} = \int_n^{n+1}\left(\frac1x - \frac{1}{n+1}\right)dx > 0 ,
$$

because the integrand is positive for $n \le x < n+1$. By the monotone convergence theorem ([[calculus-2/sequences#thm-mct]]) the limit exists.
:::

::: widget sequence
a: sum(1/k, k, 1, n) - ln(n)
N: 60
limit: 0.5772156649
epsilon: 0.02
caption: The sequence $D_n = H_n - \ln n$ decreases towards $\gamma \approx 0.5772$; the gap $D_n - \gamma$ is close to $\frac{1}{2n}$, so the terms enter the band $\eps = 0.02$ at $n = 25$. Thus $H_n \approx \ln n + 0.5772$: the harmonic numbers grow exactly as fast as the logarithm, which tends to infinity.
:::

So $H_n \approx \ln n + \gamma$, which is excellent even for moderate $n$: $\ln 1000 + \gamma = 7.4850$ while $H_{1000} = 7.4855$. Nobody knows whether $\gamma$ is rational.

::: application How far can a stack of books overhang?
Stack $n$ identical books, each of length $1$, at the edge of a table, one book per level. The best possible overhang turns out to be $\frac12 H_n$: the top book can stick out $\frac12$ beyond the one below, the top two together $\frac14$ beyond the third, and so on, with the $k$th offset equal to $\frac{1}{2k}$. Because the harmonic series diverges, the overhang can be made as large as you like — but an overhang of two book lengths already needs $31$ books, since $H_{30} < 4 < H_{31}$.
:::

## Series with non-negative terms

When all terms are non-negative, the partial sums can only increase, and the monotone convergence theorem gives a clean criterion. This is the foundation of most of the tests in the next chapter.

::: theorem Bounded partial sums {#thm-positive}
If $a_n \ge 0$ for all $n$, then $\sum a_n$ converges if and only if its partial sums are bounded above. Otherwise $\sum a_n = \infty$.
:::

::: proof
Since $s_{n+1} - s_n = a_{n+1} \ge 0$, the partial sums form an increasing sequence. By the monotone convergence theorem it converges if and only if it is bounded above. If it is not bounded above, then for every $M$ some $s_N > M$, and then $s_n \ge s_N > M$ for all $n \ge N$, so $s_n \to \infty$.
:::

::: example The sum of reciprocal squares converges {#ex-basel}
Show that $\displaystyle\sum_{n=1}^\infty \frac{1}{n^2}$ converges, with sum at most $2$.
::: solution
For $k \ge 2$, $\dfrac{1}{k^2} < \dfrac{1}{k(k-1)} = \dfrac{1}{k-1} - \dfrac1k$. Hence, telescoping,

$$
s_n = 1 + \sum_{k=2}^n \frac{1}{k^2} < 1 + \sum_{k=2}^n\left(\frac{1}{k-1} - \frac1k\right) = 1 + 1 - \frac1n < 2 .
$$

The terms are positive and the partial sums are bounded by $2$, so the series converges by [[#thm-positive]], with sum at most $2$. The exact value, found by Euler, is $\dfrac{\pi^2}{6} = 1.644\,934\ldots$; the partial sums $s_{10} = 1.549\,77$, $s_{100} = 1.634\,98$, $s_{1000} = 1.643\,93$ approach it with error close to $1/n$.
:::
:::

::: widget sequence
a: 1/n^2
mode: both
N: 50
limit: pi^2/6
caption: Terms $1/n^2$ and partial sums of $\sum 1/n^2$, approaching $\frac{\pi^2}{6}\approx 1.6449$. Compare with the harmonic series: both have terms tending to $0$, but here the terms shrink fast enough for the partial sums to level off. The error after $n$ terms is about $\frac1n$ — still slow, which is why accelerating series matters.
:::

::: example The reciprocals of the factorials {#ex-factorials}
Show that $\displaystyle\sum_{n=0}^\infty\frac{1}{n!} = 1 + 1 + \frac12 + \frac16 + \frac1{24} + \cdots$ converges, and that its sum lies between $2.5$ and $3$.
::: solution
For $n \ge 1$, $n! = 1\cdot2\cdot3\cdots n \ge 1\cdot 2\cdot 2\cdots 2 = 2^{n-1}$, so $\frac{1}{n!} \le \frac{1}{2^{n-1}}$. The partial sums satisfy

$$
s_N = 1 + \sum_{n=1}^{N}\frac{1}{n!} \le 1 + \sum_{n=1}^{N}\frac{1}{2^{n-1}} < 1 + \frac{1}{1 - \frac12} = 3 .
$$

The terms are positive and the partial sums are bounded, so the series converges by [[#thm-positive]], with sum at most $3$; and the sum exceeds $s_2 = 2.5$. Its value is $e = 2.718\,28\ldots$: this is the series $e^x = \sum x^n/n!$ at $x = 1$, proved in [[calculus-2/taylor-series]]. Unlike $\left(1 + \frac1n\right)^n$, it converges very fast: $s_{10}$ already agrees with $e$ to seven decimal places.
:::
:::

::: remark Every decimal expansion converges
[[#thm-positive]] explains why infinite decimals make sense. If each digit $d_k$ lies in $\set{0, 1, \dots, 9}$, the series $\sum_{k\ge1} d_k 10^{-k}$ has non-negative terms and partial sums bounded by $\sum_{k\ge1} 9\cdot10^{-k} = 1$, so it converges to a number in $[0, 1]$. Conversely every real number in $[0,1]$ arises this way. Infinite decimals are therefore not an extra kind of object: each one is the sum of a convergent series of non-negative terms, and its existence is guaranteed by the completeness of $\R$.
:::

::: remark The Cauchy criterion
For series whose terms change sign, partial sums need not be monotone and [[#thm-positive]] does not apply. The general criterion, which follows from the Cauchy criterion for sequences mentioned in [[calculus-2/sequences]], is: $\sum a_n$ converges if and only if for every $\eps > 0$ there is an $N$ such that $\abs{a_{m+1} + a_{m+2} + \cdots + a_n} < \eps$ for all $n > m \ge N$. In words, blocks of terms far out in the series have arbitrarily small sums. The divergence test is the special case of blocks of length one; the harmonic series fails the criterion because the block $\frac1{m+1} + \cdots + \frac{1}{2m}$ is always at least $\frac12$. See [[real-analysis/series]] for the proof.
:::

Comparing the harmonic series ($\sum 1/n$, divergent) with $\sum 1/n^2$ (convergent) raises the central question of the next chapter: *how fast* must the terms tend to $0$ for a series to converge? The answer for the $p$-series $\sum 1/n^p$ is: exactly when $p > 1$.

::: quiz
Which of these series converge? (Select all that apply.)
- [x] $\displaystyle\sum_{n=0}^\infty \left(-\tfrac{9}{10}\right)^n$
- [ ] $\displaystyle\sum_{n=1}^\infty \frac{1}{2n}$
- [x] $\displaystyle\sum_{n=1}^\infty \left(\frac1n - \frac1{n+2}\right)$
- [ ] $\displaystyle\sum_{n=1}^\infty \frac{n+1}{n}$
::: solution
The first is geometric with $\abs r = \frac9{10} < 1$; its sum is $\frac{1}{1 + 9/10} = \frac{10}{19}$. The second is half the harmonic series, so it diverges by [[#thm-linear]] (if it converged, twice it would too). The third telescopes in steps of two: $s_n = 1 + \frac12 - \frac{1}{n+1} - \frac{1}{n+2} \to \frac32$. The fourth has terms tending to $1$, so it diverges by the divergence test.
:::
:::

::: warning Rearranging and regrouping infinite sums
Inserting brackets into a *convergent* series is harmless: the new partial sums form a subsequence of the old ones, which has the same limit. But removing brackets, or reordering terms, can change everything: $(1 - 1) + (1 - 1) + \cdots = 0$, while $1 - 1 + 1 - 1 + \cdots$ diverges. Even for convergent series, reordering infinitely many terms can change the sum (we prove this in [[calculus-2/convergence-tests]]). Treat an infinite series as a limit, not as a big sum. Claims such as "$1 + 2 + 3 + \cdots = -\frac{1}{12}$" refer to a different procedure (analytic continuation of the zeta function) and are not sums in the sense of [[#def-series]]: that series diverges to $\infty$.
:::

::: history
Archimedes, around 250 BC, found the area of a parabolic segment by showing, in effect, that $1 + \frac14 + \frac1{16} + \cdots = \frac43$, with a careful argument that avoided "completed" infinite sums. Around 1350 Nicole Oresme proved the divergence of the harmonic series by the grouping argument above. Guido Grandi discussed $1 - 1 + 1 - \cdots$ in 1703, and it provoked a long debate in which Leibniz argued that its value should be $\frac12$. Leonhard Euler found $\sum 1/n^2 = \pi^2/6$ in 1734–35 and introduced the constant $\gamma$ in the same period; Lorenzo Mascheroni published a longer, partly incorrect, decimal expansion of it in 1790. The modern definition of convergence through partial sums, together with the principle that a divergent series has no sum, is due to Augustin-Louis Cauchy's *Cours d'analyse* (1821).
:::

## Where this leads

The divergence test and the comparison of $\sum 1/n$ with $\sum 1/n^2$ lead directly to the convergence tests of [[calculus-2/convergence-tests]]: integral, comparison, ratio, root and alternating series tests. The geometric series is the prototype of a power series, $\sum c_n x^n$, and its formula $\frac{1}{1-x} = \sum x^n$ is the starting point of [[calculus-2/power-series]]. Series appear throughout mathematics: expected values in [[probability/discrete-random-variables]], Fourier series in [[pde/fourier-series]], generating functions in [[discrete/generating-functions]], and the rigorous theory, including rearrangements, in [[real-analysis/series]].

::: summary
- A series $\sum a_n$ converges when its partial sums $s_n = a_1 + \cdots + a_n$ converge; the sum is $\lim s_n$ ([[#def-series]]). Terms and partial sums are different sequences.
- Geometric series: $\sum_{n\ge0} ar^n = \frac{a}{1-r}$ when $\abs r < 1$, divergent otherwise. Always identify the first term.
- Telescoping series $\sum(b_n - b_{n+1})$ have partial sums $b_1 - b_{n+1}$; partial fractions often reveal them.
- Convergent series can be added and multiplied by constants term by term, but not multiplied together term by term.
- Divergence test: if $a_n \not\to 0$ the series diverges. If $a_n \to 0$ the test says nothing.
- The harmonic series diverges, but only like $\ln n$: $H_n = \ln n + \gamma + o(1)$.
- A series of non-negative terms converges exactly when its partial sums are bounded; this gives $\sum 1/n^2 < 2$ (in fact $= \pi^2/6$).
:::

## Exercises

::: exercise An alternating geometric series {level=1 check="1/7"}
Find $\displaystyle\sum_{n=0}^\infty \frac{(-1)^n\,3^n}{4^{n+1}}$.
::: solution
The terms are $\frac14\left(-\frac34\right)^n$, a geometric series with first term $\frac14$ (at $n = 0$) and ratio $-\frac34$, which has absolute value less than $1$. The sum is $\dfrac{1/4}{1 + 3/4} = \dfrac{1/4}{7/4} = \dfrac17$.
:::
:::

::: exercise A repeating decimal {level=1 check="41/333"}
Write $0.123123123\ldots$ as a fraction in lowest terms.
::: solution
$0.123123\ldots = \dfrac{123}{1000} + \dfrac{123}{1000^2} + \cdots = \dfrac{123/1000}{1 - 1/1000} = \dfrac{123}{999} = \dfrac{41}{333}$, since $123 = 3\cdot41$ and $999 = 3\cdot333$.
:::
:::

::: exercise The divergence test {level=1}
Show that $\displaystyle\sum_{n=1}^\infty\frac{n^2}{3n^2+1}$ diverges.
::: solution
$\dfrac{n^2}{3n^2+1} = \dfrac{1}{3 + 1/n^2} \to \dfrac13 \ne 0$, so the series diverges by [[#thm-divergence]].
:::
:::

::: exercise Partial fractions {level=2 check="3/4"}
Find $\displaystyle\sum_{n=2}^\infty\frac{1}{n^2 - 1}$.
::: hint
$\dfrac{1}{n^2-1} = \dfrac12\left(\dfrac{1}{n-1} - \dfrac{1}{n+1}\right)$. The terms cancel in steps of two.
:::
::: solution
Using the hint, the partial sum up to $n = N$ is

$$
\frac12\sum_{n=2}^{N}\left(\frac{1}{n-1} - \frac{1}{n+1}\right) = \frac12\left(1 + \frac12 - \frac1N - \frac{1}{N+1}\right),
$$

since every $\frac1m$ with $3 \le m \le N - 1$ appears once with each sign and cancels. Letting $N\to\infty$ gives $\frac12\cdot\frac32 = \frac34$.
:::
:::

::: exercise The bouncing ball {level=2 check="14"}
A ball is dropped from a height of $2$ m and after each bounce rises to $\frac34$ of the height it fell from. Show that the total distance travelled is $14$ m. (Then explain why the total time is also finite: the time to fall from height $h$ is $\sqrt{2h/g}$.)
::: solution
The ball falls $2$ m. After the $k$th bounce it rises to $2\left(\frac34\right)^k$ m and falls the same distance, for $k = 1, 2, \dots$. The total distance is

$$
2 + 2\sum_{k=1}^\infty 2\left(\frac34\right)^k = 2 + 4\cdot\frac{3/4}{1 - 3/4} = 2 + 12 = 14 \text{ m}.
$$

The time for the drop from height $h_k = 2(3/4)^k$ and the rise to it are both $\sqrt{2h_k/g} = \sqrt{4/g}\left(\sqrt{3}/2\right)^k$, so the total time is a geometric series with ratio $\frac{\sqrt3}{2} \approx 0.866 < 1$ and is finite. The ball makes infinitely many bounces in a finite time.
:::
:::

::: exercise For which x? {level=2}
Find all real $x$ for which $\displaystyle\sum_{n=0}^\infty\frac{(x-1)^n}{2^n}$ converges, and find the sum for those $x$.
::: solution
This is geometric with ratio $r = \frac{x-1}{2}$. It converges exactly when $\abs{x - 1} < 2$, that is $-1 < x < 3$, and then

$$
\sum_{n=0}^\infty\left(\frac{x-1}{2}\right)^n = \frac{1}{1 - \frac{x-1}{2}} = \frac{2}{3 - x}.
$$

At $x = -1$ and $x = 3$ the ratio is $\mp1$ and the series diverges.
:::
:::

::: exercise A logarithmic telescope {level=2}
Show that $\displaystyle\sum_{n=1}^\infty \ln\frac{n}{n+1}$ diverges, and describe how.
::: solution
$\ln\frac{n}{n+1} = \ln n - \ln(n+1)$, so the series telescopes with $b_n = \ln n$, and $s_n = \ln 1 - \ln(n+1) = -\ln(n+1) \to -\infty$. The series diverges to $-\infty$, although its terms tend to $0$.
:::
:::

::: exercise Three consecutive factors {level=2 check="1/4"}
Find $\displaystyle\sum_{n=1}^\infty\frac{1}{n(n+1)(n+2)}$.
::: hint
Check that $\dfrac{1}{n(n+1)(n+2)} = \dfrac12\left(\dfrac{1}{n(n+1)} - \dfrac{1}{(n+1)(n+2)}\right)$.
:::
::: solution
Combining the right-hand side of the hint over a common denominator gives $\frac12\cdot\frac{(n+2) - n}{n(n+1)(n+2)} = \frac{1}{n(n+1)(n+2)}$. So the series telescopes with $b_n = \frac{1}{2n(n+1)}$, and by [[#thm-telescoping]] the sum is $b_1 - \lim b_n = \frac{1}{4} - 0 = \frac14$.
:::
:::

::: exercise Squares of a convergent series {level=3}
Let $a_n \ge 0$ and suppose $\sum a_n$ converges. Prove that $\sum a_n^2$ converges. Show by an example that the converse is false.
::: hint
The terms tend to $0$, so eventually $a_n \le 1$.
:::
::: solution
By the divergence test, $a_n \to 0$, so there is $N$ with $0 \le a_n \le 1$, and hence $a_n^2 \le a_n$, for all $n \ge N$. For $n \ge N$,

$$
\sum_{k=1}^n a_k^2 \le \sum_{k=1}^{N-1} a_k^2 + \sum_{k=N}^{n} a_k \le \sum_{k=1}^{N-1}a_k^2 + \sum_{k=1}^\infty a_k ,
$$

a bound independent of $n$. The partial sums of $\sum a_n^2$ are increasing and bounded, so the series converges by [[#thm-positive]]. The converse fails: $\sum 1/n^2$ converges but $\sum 1/n$ diverges.
:::
:::

::: exercise An arithmetic–geometric series {level=3 check="2"}
Prove that $\displaystyle\sum_{n=1}^\infty\frac{n}{2^n}$ converges and find its sum.
::: hint
Let $s_N = \sum_{n=1}^N n/2^n$ and compute $s_N - \frac12 s_N$.
:::
::: solution
Subtracting term by term,

$$
s_N - \tfrac12 s_N = \sum_{n=1}^N\frac{n}{2^n} - \sum_{n=2}^{N+1}\frac{n-1}{2^{n}} = \sum_{n=1}^{N}\frac{1}{2^n} - \frac{N}{2^{N+1}} = 1 - \frac{1}{2^N} - \frac{N}{2^{N+1}} .
$$

So $s_N = 2 - \dfrac{2}{2^N} - \dfrac{N}{2^N}$. Since $\frac{1}{2^N} \to 0$ and $\frac{N}{2^N} \to 0$ (powers lose to exponentials, [[calculus-2/sequences#eq-hierarchy]]), $s_N \to 2$. The series converges with sum $2$.
:::
:::
