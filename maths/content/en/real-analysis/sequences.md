The decimal approximations $1,\ 1.4,\ 1.41,\ 1.414,\ \dots$ to $\sqrt2$; the iterates of Newton's method; the partial sums of a series; the outcomes of a long run of coin tosses averaged over more and more trials — each is a **sequence**, an infinite list of numbers produced one after another. The basic question about a sequence is whether it *settles down*: whether its terms eventually stay as close as we like to a single number.

You met sequences informally in [[calculus-2/sequences]]. In this chapter we prove the theorems behind the computations. The ε–N definition of convergence comes first, then the rules that make limits computable. After that comes the real subject of the chapter: three theorems that each guarantee convergence *without our knowing the limit in advance* — the monotone convergence theorem, the Bolzano–Weierstrass theorem and the Cauchy criterion. All three are consequences of the completeness of $\R$ ([[real-analysis/real-numbers#ax-completeness]]), and all three fail in $\Q$.

## Convergence

A **sequence** of real numbers is a function $a\colon \N \to \R$; we write $a_n$ for $a(n)$ and $(a_n)$ or $(a_n)_{n\ge1}$ for the whole sequence. Recall that $\N = \set{1, 2, 3, \dots}$.

::: definition Convergence of a sequence {#def-convergence}
A sequence $(a_n)$ **converges** to $L \in \R$, written $a_n \to L$ or $\lim_{n\to\infty} a_n = L$, if

$$
\text{for every } \eps > 0 \text{ there is } N \in \N \text{ such that } \abs{a_n - L} < \eps \text{ for all } n \ge N.
$$ {#eq-conv}

A sequence that converges to some $L$ is **convergent**; otherwise it **diverges**.
:::

The definition is a game, like the ε–δ game of [[calculus-1/limits]]: a sceptic names a tolerance $\eps$; you must name a point $N$ in the sequence after which *every* term lies within $\eps$ of $L$. Only the tail of a sequence matters — changing, adding or deleting finitely many terms affects neither convergence nor the limit. And $N$ may (and usually does) depend on $\eps$.

::: example A rational sequence {#ex-rational-seq}
Prove from the definition that $\dfrac{3n+1}{2n+5} \to \dfrac32$.
::: solution
*Scratch work.* Simplify the error:

$$
\left\lvert\frac{3n+1}{2n+5} - \frac32\right\rvert = \left\lvert\frac{2(3n+1) - 3(2n+5)}{2(2n+5)}\right\rvert = \frac{13}{4n+10} < \frac{13}{4n}.
$$

This is less than $\eps$ as soon as $n > 13/(4\eps)$.

*Proof.* Let $\eps > 0$. By the Archimedean property ([[real-analysis/real-numbers#thm-archimedean]]) choose $N \in \N$ with $N > 13/(4\eps)$. For $n \ge N$,

$$
\left\lvert\frac{3n+1}{2n+5} - \frac32\right\rvert = \frac{13}{4n+10} < \frac{13}{4n} \le \frac{13}{4N} < \eps.
$$
:::
:::

As in that example, it is usually easiest to bound $\abs{a_n - L}$ above by something simpler that visibly tends to $0$, rather than to solve $\abs{a_n - L} < \eps$ exactly.

::: widget sequence
a: (3n+1)/(2n+5)
N: 40
limit: 1.5
epsilon: 0.2
y: 0.4, 1.7
caption: The terms of $\frac{3n+1}{2n+5}$ and the band $\abs{y - \tfrac32} < \eps$. The figure marks the first $N$ after which every term stays inside the band. Halve $\eps$ and watch $N$ roughly double: here $N$ is about $13/(4\eps)$, as the scratch work in [[#ex-rational-seq]] predicts.
:::

::: theorem Uniqueness of limits {#thm-limit-unique}
A sequence has at most one limit.
:::

::: proof
Suppose $a_n \to L$ and $a_n \to M$ with $L \ne M$, and let $\eps = \abs{L - M}/2 > 0$. There are $N_1$ and $N_2$ with $\abs{a_n - L} < \eps$ for $n \ge N_1$ and $\abs{a_n - M} < \eps$ for $n \ge N_2$. For $n = \max(N_1, N_2)$ the triangle inequality gives $\abs{L - M} \le \abs{L - a_n} + \abs{a_n - M} < 2\eps = \abs{L - M}$, which is absurd.
:::

To show that a sequence diverges we must negate [[#eq-conv]] for *every* candidate $L$: for each $L$ there is an $\eps > 0$ such that $\abs{a_n - L} \ge \eps$ for infinitely many $n$. For example $a_n = (-1)^n$ diverges: if $a_n \to L$, then with $\eps = 1$ we would have $\abs{1 - L} < 1$ and $\abs{-1 - L} < 1$ (take an even and an odd $n \ge N$), so $2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L + 1} < 2$.

A sequence is **bounded** if there is $M$ with $\abs{a_n} \le M$ for all $n$.

::: theorem Convergent sequences are bounded {#thm-convergent-bounded}
Every convergent sequence is bounded.
:::

::: proof
Let $a_n \to L$. With $\eps = 1$ there is $N$ such that $\abs{a_n - L} < 1$, and hence $\abs{a_n} < \abs{L} + 1$, for all $n \ge N$. The finitely many remaining terms are bounded by their maximum absolute value, so $M = \max\bigl(\abs{a_1}, \dots, \abs{a_{N-1}}, \abs{L} + 1\bigr)$ satisfies $\abs{a_n} \le M$ for every $n$.
:::

The converse is false: $(-1)^n$ is bounded but divergent. We say $a_n \to \infty$ (the sequence **diverges to infinity**) if for every $M$ there is $N$ with $a_n > M$ for all $n \ge N$; similarly for $-\infty$. By [[#thm-convergent-bounded]] such sequences diverge, but in a controlled way.

## Limit laws and inequalities

::: theorem Algebra of limits {#thm-algebra-limits}
Suppose $a_n \to a$ and $b_n \to b$, and let $c \in \R$. Then

1. $a_n + b_n \to a + b$ and $c\,a_n \to c\,a$;
2. $a_n b_n \to ab$;
3. if $b \ne 0$ and $b_n \ne 0$ for all $n$, then $a_n / b_n \to a/b$.
:::

::: proof
(1) Given $\eps > 0$, choose $N_1$ with $\abs{a_n - a} < \eps/2$ for $n \ge N_1$ and $N_2$ with $\abs{b_n - b} < \eps/2$ for $n \ge N_2$. For $n \ge \max(N_1, N_2)$, $\abs{(a_n + b_n) - (a + b)} \le \abs{a_n - a} + \abs{b_n - b} < \eps$. The statement about $c\,a_n$ is the case $b_n = c$ of (2).

(2) By [[#thm-convergent-bounded]] there is $M > 0$ with $\abs{a_n} \le M$ for all $n$. Then

$$
\abs{a_n b_n - ab} = \abs{a_n(b_n - b) + b(a_n - a)} \le M\abs{b_n - b} + \abs{b}\,\abs{a_n - a}.
$$

Given $\eps > 0$, choose $N$ so large that $\abs{b_n - b} < \eps/(2M)$ and $\abs{a_n - a} < \eps/(2\abs{b} + 1)$ for $n \ge N$. Then $\abs{a_n b_n - ab} < \eps/2 + \eps/2 = \eps$.

(3) By (2) it suffices to show $1/b_n \to 1/b$. There is $N_1$ with $\abs{b_n - b} < \abs{b}/2$ for $n \ge N_1$; by the reverse triangle inequality $\abs{b_n} > \abs{b}/2$ for these $n$, and so

$$
\left\lvert\frac1{b_n} - \frac1b\right\rvert = \frac{\abs{b - b_n}}{\abs{b_n}\,\abs{b}} < \frac{2}{\abs{b}^2}\,\abs{b_n - b} \qquad (n \ge N_1).
$$

Given $\eps > 0$, choose $N_2$ with $\abs{b_n - b} < \eps\abs{b}^2/2$ for $n \ge N_2$; for $n \ge \max(N_1, N_2)$ the right-hand side is less than $\eps$.
:::

The proof of (2) shows a technique worth naming: *add and subtract a mixed term* ($a_n b$ here) to split one difficult difference into two easy ones, and *bound the uncontrolled factor* using boundedness. With [[#thm-algebra-limits]], $\dfrac{3n+1}{2n+5} = \dfrac{3 + 1/n}{2 + 5/n} \to \dfrac{3}{2}$ follows from $1/n \to 0$ in one line.

::: theorem Limits preserve weak inequalities {#thm-order-limits}
If $a_n \to a$, $b_n \to b$ and $a_n \le b_n$ for all $n \ge N_0$, then $a \le b$. In particular, if $c \le a_n \le d$ for all large $n$, then $c \le a \le d$.
:::

::: proof
Suppose $a > b$ and put $\eps = (a - b)/2$. For $n$ large enough (and $\ge N_0$) we have both $a_n > a - \eps$ and $b_n < b + \eps$. But $a - \eps = b + \eps = (a+b)/2$, so $b_n < (a+b)/2 < a_n$, contradicting $a_n \le b_n$. The second statement is the first applied to constant sequences.
:::

::: warning Strict inequalities become weak
$1/n > 0$ for every $n$, yet $\lim 1/n = 0$. Limits preserve $\le$ but not $<$: from $a_n < b_n$ for all $n$ you may only conclude $\lim a_n \le \lim b_n$. Similarly, a sequence of irrational numbers can converge to a rational one, and a sequence of positive numbers to $0$.
:::

::: theorem Squeeze theorem for sequences {#thm-squeeze-seq}
If $a_n \le x_n \le b_n$ for all $n \ge N_0$ and $a_n \to L$, $b_n \to L$, then $x_n \to L$.
:::

::: proof
Given $\eps > 0$, for all sufficiently large $n$ we have $L - \eps < a_n$ and $b_n < L + \eps$, hence $L - \eps < a_n \le x_n \le b_n < L + \eps$, that is $\abs{x_n - L} < \eps$.
:::

::: example Two standard limits {#ex-standard}
Prove that (a) $r^n \to 0$ if $\abs{r} < 1$, and (b) $n^{1/n} \to 1$.
::: solution
Both proofs use the binomial theorem in the form of lower bounds: for $h \ge 0$ and $n \ge 2$,

$$
(1 + h)^n = \sum_{k=0}^n \binom nk h^k \ \ge\ 1 + nh \qquad\text{and}\qquad (1+h)^n \ \ge\ \binom n2 h^2 = \frac{n(n-1)}{2}h^2,
$$

since all the omitted terms are non-negative.

(a) If $r = 0$ there is nothing to prove. Otherwise write $\abs{r} = \dfrac{1}{1 + h}$ with $h = \dfrac{1}{\abs r} - 1 > 0$. Then $(1+h)^n \ge 1 + nh > nh$, so

$$
0 \le \abs{r^n - 0} = \frac{1}{(1+h)^n} < \frac{1}{nh}.
$$

Given $\eps > 0$, any $N > 1/(h\eps)$ makes the right-hand side less than $\eps$ for $n \ge N$.

(b) Put $h_n = n^{1/n} - 1$; $h_n \ge 0$ because $n \ge 1$. For $n \ge 2$, $n = (1 + h_n)^n \ge \tfrac12 n(n-1)h_n^2$, so

$$
0 \le h_n \le \sqrt{\frac{2}{n-1}}.
$$

The right-hand side tends to $0$ (it is less than $\eps$ once $n > 1 + 2/\eps^2$), so $h_n \to 0$ by [[#thm-squeeze-seq]], and $n^{1/n} = 1 + h_n \to 1$.
:::
:::

## Monotone sequences

A sequence is **increasing** if $a_n \le a_{n+1}$ for all $n$, **decreasing** if $a_n \ge a_{n+1}$ for all $n$, and **monotone** if it is one or the other. (Some books say "non-decreasing" for our "increasing" and reserve "increasing" for $a_n < a_{n+1}$.) Our first convergence theorem is completeness in its most usable form.

::: theorem Monotone convergence theorem {#thm-monotone}
An increasing sequence that is bounded above converges, and

$$
\lim_{n\to\infty} a_n = \sup\set{a_n : n \in \N}.
$$

Likewise a decreasing sequence that is bounded below converges to $\inf\set{a_n : n \in \N}$. An increasing sequence that is not bounded above diverges to $\infty$.
:::

::: proof
Let $(a_n)$ be increasing and bounded above. By the completeness axiom $s = \sup\set{a_n}$ exists. Let $\eps > 0$. By the approximation property ([[real-analysis/real-numbers#lem-sup-approx]]) there is $N$ with $a_N > s - \eps$. For $n \ge N$, since the sequence increases and $s$ is an upper bound,

$$
s - \eps < a_N \le a_n \le s,
$$

so $\abs{a_n - s} < \eps$. The decreasing case follows by applying this to $(-a_n)$. If $(a_n)$ is increasing and unbounded above, then for every $M$ some $a_N > M$, and then $a_n \ge a_N > M$ for all $n \ge N$.
:::

The theorem is the formal version of the intuition that a quantity which keeps growing but never passes a barrier must settle down — exactly the statement whose geometric "proof" dissatisfied Dedekind. Its typical use is for sequences defined by a recursion, where we cannot write $a_n$ in closed form.

::: example A recursively defined sequence {#ex-recursive}
Let $x_1 = 1$ and $x_{n+1} = \sqrt{2 + x_n}$. Prove that $(x_n)$ converges and find its limit.
::: solution
*Bounded and increasing.* We prove by induction that $1 \le x_n < 2$ and $x_n < x_{n+1}$ for all $n$. For $n = 1$: $x_1 = 1$ and $x_2 = \sqrt3 > 1$. Suppose $1 \le x_n < 2$. Then $x_{n+1} = \sqrt{2 + x_n} < \sqrt4 = 2$ and $x_{n+1} \ge \sqrt 3 > 1$. Moreover, for $1 \le x < 2$,

$$
(2 + x) - x^2 = (2 - x)(1 + x) > 0,
$$

so $x_{n+1}^2 = 2 + x_n > x_n^2$, and therefore $x_{n+1} > x_n$ (both are positive).

*Convergence.* By [[#thm-monotone]] the sequence converges; call the limit $L$. By [[#thm-order-limits]], $1 \le L \le 2$.

*The limit.* Square the recursion: $x_{n+1}^2 = 2 + x_n$. The sequence $(x_{n+1})$ is $(x_n)$ with its first term removed, so it also tends to $L$; by [[#thm-algebra-limits]] the left side tends to $L^2$ and the right side to $2 + L$. Hence $L^2 = L + 2$, so $(L - 2)(L + 1) = 0$, and since $L \ge 1$ we get $L = 2$. (Squaring first let us avoid assuming that $\sqrt{\ }$ is continuous, which we prove only in [[real-analysis/continuity]].)
:::
:::

::: widget cobweb
g: sqrt(2 + x)
x0: 1
steps: 12
x: 0, 2.5
caption: The cobweb diagram of $x_{n+1} = \sqrt{2 + x_n}$ from $x_1 = 1$. The orbit climbs a staircase between the graph of $\sqrt{2+x}$ and the line $y = x$: every step goes up (the sequence increases) but no step can cross the intersection point $x = 2$ (the sequence is bounded). Try starting values above $2$: the sequence now decreases to $2$.
:::

Note the logic: we must show *first* that the limit exists, and only then find it from the recursion. Skipping the first step leads to nonsense — the recursion $x_{n+1} = 2x_n$ with $x_1 = 1$ "has limit $L = 2L$, so $L = 0$", although $x_n = 2^{n-1} \to \infty$.

::: example The number e {#ex-e}
Let $e_n = \left(1 + \dfrac1n\right)^n$. Prove that $(e_n)$ is increasing and bounded above by $3$. Its limit is the number $e \approx 2.71828$.
::: solution
By the binomial theorem,

$$
e_n = \sum_{k=0}^n \binom nk\frac{1}{n^k} = \sum_{k=0}^n \frac{1}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n^k} = \sum_{k=0}^n \frac{1}{k!}\left(1 - \frac1n\right)\left(1 - \frac2n\right)\cdots\left(1 - \frac{k-1}{n}\right).
$$

*Increasing.* Compare $e_n$ with $e_{n+1}$ term by term. For each fixed $k \le n$, every factor $1 - j/n$ is smaller than the corresponding $1 - j/(n+1)$, so the $k$-th term of $e_n$ is at most the $k$-th term of $e_{n+1}$; and $e_{n+1}$ has an extra positive term for $k = n + 1$. Hence $e_n < e_{n+1}$.

*Bounded.* Every product of factors $1 - j/n \in [0,1]$ is at most $1$, and $k! \ge 2^{k-1}$ for $k \ge 1$ (each of the factors $2, 3, \dots, k$ is at least $2$). So

$$
e_n \le \sum_{k=0}^n \frac1{k!} \le 1 + \sum_{k=1}^n \frac{1}{2^{k-1}} = 1 + 2\left(1 - \frac{1}{2^n}\right) < 3.
$$

By [[#thm-monotone]], $(e_n)$ converges; its limit is called $e$. Since $e_1 = 2$ and the sequence increases, $2 \le e \le 3$ by [[#thm-order-limits]]. Numerically $e_{10} \approx 2.594$, $e_{100} \approx 2.705$ and $e_{1000} \approx 2.717$ — the convergence is slow, with error roughly $e/(2n)$.
:::
:::

::: quiz
A sequence $(a_n)$ is increasing and satisfies $a_n < 5$ for every $n$. What can you conclude?
- [ ] $a_n \to 5$
- [x] $(a_n)$ converges to some limit $L \le 5$
- [ ] $(a_n)$ converges to some limit $L < 5$
- [ ] Nothing: the sequence may diverge
::: solution
By [[#thm-monotone]] the sequence converges to $L = \sup\set{a_n}$, and $L \le 5$ because $5$ is an upper bound. The limit need not be $5$ (take $a_n = 1 - 1/n$), and it can equal $5$ although every term is less than $5$ (take $a_n = 5 - 1/n$): strict inequalities are not preserved in the limit.
:::
:::

## Subsequences and the Bolzano–Weierstrass theorem

Most sequences are not monotone. The way to handle them is to look at part of the sequence.

::: definition Subsequence {#def-subsequence}
Given a sequence $(a_n)$ and indices $n_1 < n_2 < n_3 < \cdots$ in $\N$, the sequence $(a_{n_k})_{k\ge1} = (a_{n_1}, a_{n_2}, a_{n_3}, \dots)$ is a **subsequence** of $(a_n)$.
:::

For example $(a_{2k})$ and $(a_{2k-1})$ are the even- and odd-indexed subsequences, and $(a_{k^2})$ is another. A simple induction shows $n_k \ge k$ for every $k$: $n_1 \ge 1$, and $n_{k+1} > n_k \ge k$ gives $n_{k+1} \ge k+1$.

::: theorem Subsequences of convergent sequences {#thm-subsequence}
If $a_n \to L$, then every subsequence of $(a_n)$ also converges to $L$.
:::

::: proof
Let $\eps > 0$ and choose $N$ with $\abs{a_n - L} < \eps$ for all $n \ge N$. If $k \ge N$ then $n_k \ge k \ge N$, so $\abs{a_{n_k} - L} < \eps$.
:::

This gives the quickest proofs of divergence: exhibit two subsequences with different limits. For $a_n = (-1)^n(1 + \tfrac1n)$, the even terms $1 + \frac1{2k} \to 1$ and the odd terms $-(1 + \frac{1}{2k-1}) \to -1$, so $(a_n)$ diverges.

::: lemma Every sequence has a monotone subsequence {#lem-peak}
Every sequence of real numbers has a monotone subsequence.
:::

::: proof
Call an index $m$ a **peak** if $a_m \ge a_n$ for all $n > m$ — from the term $a_m$ you can see over the whole of the rest of the sequence.

*Infinitely many peaks.* List them as $m_1 < m_2 < m_3 < \cdots$. Each $m_k$ is a peak and $m_{k+1} > m_k$, so $a_{m_k} \ge a_{m_{k+1}}$: the subsequence $(a_{m_k})$ is decreasing.

*Finitely many peaks.* Choose $n_1$ larger than every peak (if there are no peaks, $n_1 = 1$). Since $n_1$ is not a peak, there is $n_2 > n_1$ with $a_{n_2} > a_{n_1}$. Since $n_2$ is not a peak either, there is $n_3 > n_2$ with $a_{n_3} > a_{n_2}$, and so on. This produces a strictly increasing subsequence $(a_{n_k})$.
:::

::: theorem Bolzano–Weierstrass theorem {#thm-bw}
Every bounded sequence of real numbers has a convergent subsequence.
:::

::: proof
By [[#lem-peak]] the sequence has a monotone subsequence. It is bounded, because the whole sequence is, so it converges by the monotone convergence theorem ([[#thm-monotone]]).
:::

The theorem says nothing about *what* the limit of the subsequence is, and different subsequences may have different limits. Its strength is that it manufactures a convergent sequence out of nothing but boundedness. In [[real-analysis/continuity]] this is how we prove that a continuous function on $[a, b]$ attains a maximum, and in [[real-analysis/metric-spaces]] it becomes the definition of compactness.

::: widget sequence
a: sin(n)
N: 120
y: -1.2, 1.2
caption: The bounded sequence $\sin n$ (in radians) wanders through $[-1, 1]$ without settling down. By Bolzano–Weierstrass some subsequence converges; look for the terms that come close to $1$ (for example $n = 8, 33, 77, 102$): they are the beginnings of a subsequence converging to $1$. Because $\pi$ is irrational, every point of $[-1,1]$ is in fact the limit of some subsequence.
:::

::: quiz
Which statement is true for every sequence of real numbers?
- [ ] If some subsequence converges, the sequence converges.
- [ ] Every sequence has a convergent subsequence.
- [x] If the sequence is bounded, it has a convergent subsequence that is monotone.
- [ ] If the sequence is bounded, it converges.
::: solution
By [[#lem-peak]] any sequence has a monotone subsequence, and if the sequence is bounded that subsequence converges by [[#thm-monotone]]. The others fail: $(-1)^n$ has convergent subsequences but diverges, and is bounded; and $a_n = n$ has no convergent subsequence at all, since every subsequence is unbounded.
:::
:::

## Cauchy sequences

To apply [[#def-convergence]] we must know the limit $L$ in advance. Cauchy's idea was to test convergence using the terms alone: if the terms eventually cluster together, they should be clustering *around* something.

::: definition Cauchy sequence {#def-cauchy}
A sequence $(a_n)$ is a **Cauchy sequence** if for every $\eps > 0$ there is $N \in \N$ such that $\abs{a_m - a_n} < \eps$ for all $m, n \ge N$.
:::

Note that the condition compares *all pairs* of late terms, not just consecutive ones: the harmonic partial sums $H_n = 1 + \frac12 + \dots + \frac1n$ have $H_{n+1} - H_n = \frac{1}{n+1} \to 0$, yet they diverge ([[#exr-2-6]]).

::: lemma Cauchy sequences are bounded {#lem-cauchy-bounded}
Every Cauchy sequence is bounded.
:::

::: proof
With $\eps = 1$ there is $N$ such that $\abs{a_n - a_N} < 1$, hence $\abs{a_n} < \abs{a_N} + 1$, for all $n \ge N$. Then $\abs{a_n} \le \max\bigl(\abs{a_1}, \dots, \abs{a_{N-1}}, \abs{a_N} + 1\bigr)$ for all $n$.
:::

::: theorem Cauchy criterion {#thm-cauchy}
A sequence of real numbers converges if and only if it is a Cauchy sequence.
:::

::: proof
*Convergent implies Cauchy.* Let $a_n \to L$ and $\eps > 0$. Choose $N$ with $\abs{a_n - L} < \eps/2$ for $n \ge N$. For $m, n \ge N$, $\abs{a_m - a_n} \le \abs{a_m - L} + \abs{L - a_n} < \eps$.

*Cauchy implies convergent.* Let $(a_n)$ be Cauchy. By [[#lem-cauchy-bounded]] it is bounded, so by [[#thm-bw]] it has a subsequence $a_{n_k} \to L$. We show the whole sequence converges to $L$. Let $\eps > 0$. Choose $N$ with $\abs{a_m - a_n} < \eps/2$ for all $m, n \ge N$, and $K$ with $\abs{a_{n_k} - L} < \eps/2$ for all $k \ge K$. Fix one $k \ge \max(K, N)$; then $n_k \ge k \ge N$. For every $n \ge N$,

$$
\abs{a_n - L} \le \abs{a_n - a_{n_k}} + \abs{a_{n_k} - L} < \frac\eps2 + \frac\eps2 = \eps.
$$
:::

::: remark Four faces of completeness
In $\Q$ the decimal approximations $1, 1.4, 1.41, 1.414, \dots$ form a Cauchy sequence (two terms beyond the $n$-th agree to $n$ decimal places) with no rational limit. So the Cauchy criterion, like the monotone convergence theorem and Bolzano–Weierstrass, fails in $\Q$; each is a form of completeness. In fact, in an ordered field with the Archimedean property the following are equivalent: the completeness axiom, the monotone convergence theorem, the Bolzano–Weierstrass theorem, the Cauchy criterion, and the nested interval property. We have proved completeness ⇒ monotone convergence ⇒ Bolzano–Weierstrass ⇒ Cauchy; the remaining implications are good exercises (one of them is [[real-analysis/real-numbers#exr-1-11]]). The Cauchy form is the one that generalises: in [[real-analysis/metric-spaces]] a space is *defined* to be complete when its Cauchy sequences converge.
:::

::: example A sequence that is not monotone {#ex-golden}
Let $a_1 = 1$ and $a_{n+1} = 1 + \dfrac{1}{a_n}$. Prove that $(a_n)$ converges and find its limit.
::: solution
The terms are $1, 2, \tfrac32, \tfrac53, \tfrac85, \tfrac{13}{8}, \dots$ (ratios of consecutive Fibonacci numbers). They jump up and down, so [[#thm-monotone]] does not apply directly; we show the sequence is Cauchy.

By induction $a_n \ge 1$ for all $n$ (if $a_n \ge 1$ then $a_{n+1} = 1 + 1/a_n > 1$). For $n \ge 2$,

$$
\abs{a_{n+1} - a_n} = \left\lvert\frac{1}{a_n} - \frac{1}{a_{n-1}}\right\rvert = \frac{\abs{a_n - a_{n-1}}}{a_n a_{n-1}}, \qquad a_n a_{n-1} = \Bigl(1 + \frac{1}{a_{n-1}}\Bigr)a_{n-1} = a_{n-1} + 1 \ge 2.
$$

So each gap is at most half the previous one, and by induction $\abs{a_{n+1} - a_n} \le 2^{-(n-1)}\abs{a_2 - a_1} = 2^{1-n}$. For $m > n$, the triangle inequality and the geometric sum give

$$
\abs{a_m - a_n} \le \sum_{k=n}^{m-1}\abs{a_{k+1} - a_k} \le \sum_{k=n}^{m-1} 2^{1-k} < 2^{2-n}.
$$

Given $\eps > 0$ choose $N$ with $2^{2-N} < \eps$; then $\abs{a_m - a_n} < \eps$ for all $m > n \ge N$. So $(a_n)$ is Cauchy and converges by [[#thm-cauchy]]; let $L$ be its limit, with $L \ge 1$. Multiplying the recursion by $a_n$ gives $a_{n+1}a_n = a_n + 1$, and letting $n \to \infty$ gives $L^2 = L + 1$. The positive root is the golden ratio $L = \frac{1 + \sqrt5}{2} \approx 1.618$.
:::
:::

## Upper and lower limits

A bounded sequence may have no limit, but it always has a *largest* and a *smallest* subsequential limit. These are the upper and lower limits, and they are what the root test of [[real-analysis/series]] needs.

::: definition Limit superior and limit inferior {#def-limsup}
Let $(a_n)$ be bounded. For each $n$ put $s_n = \sup\set{a_k : k \ge n}$ and $t_n = \inf\set{a_k : k \ge n}$. Then $(s_n)$ is decreasing and $(t_n)$ is increasing (a supremum over fewer terms is smaller), and both are bounded, so by [[#thm-monotone]] they converge. Define

$$
\limsup_{n\to\infty} a_n = \lim_{n\to\infty} s_n = \inf_{n} s_n, \qquad \liminf_{n\to\infty} a_n = \lim_{n\to\infty} t_n = \sup_{n} t_n.
$$

If $(a_n)$ is not bounded above we set $\limsup a_n = \infty$, and if it is not bounded below, $\liminf a_n = -\infty$.
:::

For example, for $a_n = (-1)^n(1 + \frac1n)$ the supremum of each tail is its first even-indexed term, so $s_n = 1 + \frac1n$ or $1 + \frac{1}{n+1}$ and $\limsup a_n = 1$; similarly $\liminf a_n = -1$. Unlike $\sup a_n$, the upper limit ignores any finite number of terms.

::: theorem Characterisation of lim sup and lim inf {#thm-limsup}
Let $(a_n)$ be bounded, $S = \limsup a_n$ and $I = \liminf a_n$. Then:

1. for every $\eps > 0$, $a_n < S + \eps$ for all sufficiently large $n$, and $a_n > S - \eps$ for infinitely many $n$;
2. some subsequence of $(a_n)$ converges to $S$, and every convergent subsequence has limit at most $S$; similarly with $I$ as the smallest subsequential limit;
3. $I \le S$, and $(a_n)$ converges if and only if $I = S$, in which case $\lim a_n = I = S$.
:::

::: proof
(1) Since $s_n$ decreases to $S$, there is $N$ with $s_N < S + \eps$, and then $a_k \le s_N < S + \eps$ for every $k \ge N$. On the other hand $s_n \ge S$ for every $n$, so $S - \eps$ is not an upper bound of $\set{a_k : k \ge n}$: there is $k \ge n$ with $a_k > S - \eps$. As $n$ is arbitrary, infinitely many terms exceed $S - \eps$.

(2) We choose $n_1 < n_2 < \cdots$ with $\abs{a_{n_j} - S} < 1/j$. Given $n_{j-1}$, part (1) with $\eps = 1/j$ says that all but finitely many terms are below $S + 1/j$ and infinitely many are above $S - 1/j$; so some index $n_j > n_{j-1}$ has both properties. Then $a_{n_j} \to S$ by the squeeze theorem. Conversely, if $a_{n_k} \to L$, then $a_{n_k} \le s_{n_k}$ and $(s_{n_k})$ is a subsequence of the convergent sequence $(s_n)$, so it tends to $S$ by [[#thm-subsequence]]; hence $L \le S$ by [[#thm-order-limits]]. The statements about $I$ follow by applying these to $(-a_n)$.

(3) $t_n \le s_n$ for every $n$, so $I \le S$. If $a_n \to L$, every subsequence tends to $L$ ([[#thm-subsequence]]), and by (2) subsequences tend to $S$ and to $I$, so $I = S = L$. Conversely, if $I = S$, then $t_n \le a_n \le s_n$ with both outer sequences tending to the same number, and the squeeze theorem gives $a_n \to S$.
:::

::: quiz
Let $a_1 = 5$ and $a_n = 1/n$ for $n \ge 2$. What are $\sup_n a_n$ and $\limsup_n a_n$?
- [ ] Both are $5$.
- [x] $\sup a_n = 5$ and $\limsup a_n = 0$.
- [ ] $\sup a_n = 5$, and $\limsup a_n$ does not exist.
- [ ] $\sup a_n = \tfrac12$ and $\limsup a_n = 0$.
::: solution
The supremum sees every term, so it is $5$. The upper limit only sees tails: for $n \ge 2$, $s_n = \sup\set{1/k : k \ge n} = 1/n \to 0$. Since the sequence converges to $0$, [[#thm-limsup]](3) confirms $\limsup a_n = \liminf a_n = 0$.
:::
:::

::: history
Bernard Bolzano, a priest and mathematician in Prague, published in 1817 a "purely analytic" proof of the intermediate value theorem. In it he stated the convergence criterion that now bears Cauchy's name and used a bisection argument of the kind behind the Bolzano–Weierstrass theorem, though without a theory of real numbers he could not prove the criterion. Augustin-Louis Cauchy stated the same criterion in his *Cours d'analyse* (1821) and treated its sufficiency as evident. Karl Weierstrass, in his Berlin lectures from the 1860s onwards, proved that every bounded infinite set of real numbers has an accumulation point, the result now called the Bolzano–Weierstrass theorem, and his lectures spread the ε–N style of argument used in this chapter. A complete proof of the Cauchy criterion became possible only after the constructions of the real numbers by Dedekind and Cantor in 1872.
:::

## Where this leads

Sequences are the workhorse of analysis. A series is a sequence of partial sums, so the Cauchy criterion and the monotone convergence theorem become the basic convergence tests of [[real-analysis/series]], and $\limsup$ gives the sharpest form of the root test. In [[real-analysis/continuity]] continuity is characterised by sequences, and Bolzano–Weierstrass proves the extreme value theorem. In [[real-analysis/uniform-convergence]] we take limits of sequences of *functions*, and in [[real-analysis/metric-spaces]] convergence, Cauchy sequences and subsequences are generalised to arbitrary spaces, where completeness and compactness are defined by exactly the properties proved here. Limits of averages of random quantities — the laws of large numbers in [[probability/limit-theorems]] — are statements about sequences too.

::: summary
- $a_n \to L$ means: for every $\eps > 0$ there is $N$ with $\abs{a_n - L} < \eps$ for all $n \ge N$ ([[#def-convergence]]). Limits are unique; convergent sequences are bounded.
- Limits respect sums, products, quotients ([[#thm-algebra-limits]]) and weak inequalities ([[#thm-order-limits]]); the squeeze theorem traps a sequence between two with the same limit.
- **Monotone convergence**: bounded monotone sequences converge, to their supremum or infimum ([[#thm-monotone]]). Prove existence first, then find the limit from the recursion.
- Subsequences of a convergent sequence have the same limit; two subsequences with different limits prove divergence.
- **Bolzano–Weierstrass**: every bounded sequence has a convergent subsequence ([[#thm-bw]]), via a monotone subsequence.
- **Cauchy criterion**: a real sequence converges if and only if it is Cauchy ([[#thm-cauchy]]) — convergence without knowing the limit.
- $\limsup$ and $\liminf$ are the largest and smallest subsequential limits; the sequence converges exactly when they are equal ([[#thm-limsup]]).
:::

## Exercises

::: exercise An ε–N proof {level=1}
Prove from the definition that $\dfrac{2n - 1}{n + 3} \to 2$.
::: solution
For every $n$, $\left\lvert\dfrac{2n-1}{n+3} - 2\right\rvert = \dfrac{\abs{2n - 1 - 2n - 6}}{n+3} = \dfrac{7}{n+3} < \dfrac7n$. Given $\eps > 0$, choose $N \in \N$ with $N > 7/\eps$. For $n \ge N$ the error is less than $7/n \le 7/N < \eps$.
:::
:::

::: exercise Using the limit laws {level=1 check="5/2"}
Find $\displaystyle\lim_{n\to\infty}\frac{5n^2 + 3n}{2n^2 - 1}$, justifying each step.
::: solution
Divide numerator and denominator by $n^2$: $\dfrac{5 + 3/n}{2 - 1/n^2}$. Since $1/n \to 0$, the product rule gives $1/n^2 \to 0$, and the sum and quotient rules of [[#thm-algebra-limits]] give the limit $\dfrac{5 + 0}{2 - 0} = \dfrac52$ (the denominator $2 - 1/n^2$ is never $0$).
:::
:::

::: exercise A difference of large terms {level=1 check="1/2"}
Find $\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2 + n} - n\right)$.
::: hint
Multiply and divide by $\sqrt{n^2+n} + n$.
:::
::: solution
$$
\sqrt{n^2+n} - n = \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1}.
$$

Since $1 \le \sqrt{1 + 1/n} \le 1 + \frac{1}{2n}$ (square the right-hand side), the squeeze theorem gives $\sqrt{1 + 1/n} \to 1$, and the quotient rule gives the limit $\dfrac{1}{1 + 1} = \dfrac12$.
:::
:::

::: exercise Absolute values {level=2}
Prove that if $a_n \to a$ then $\abs{a_n} \to \abs{a}$. Is the converse true?
::: solution
By the reverse triangle inequality, $\bigl\lvert\abs{a_n} - \abs{a}\bigr\rvert \le \abs{a_n - a}$. Given $\eps > 0$, the $N$ that makes $\abs{a_n - a} < \eps$ for $n \ge N$ also makes $\bigl\lvert\abs{a_n} - \abs a\bigr\rvert < \eps$. The converse is false: $a_n = (-1)^n$ has $\abs{a_n} \to 1$ but diverges. (It is true when $a = 0$, since $\abs{a_n - 0} = \bigl\lvert\abs{a_n} - 0\bigr\rvert$.)
:::
:::

::: exercise Null times bounded {level=2}
Prove that if $a_n \to 0$ and $(b_n)$ is bounded, then $a_n b_n \to 0$. Deduce that $\dfrac{\sin n}{n} \to 0$. Why does [[#thm-algebra-limits]] not give this directly?
::: solution
Let $\abs{b_n} \le M$ for all $n$, with $M > 0$. Given $\eps > 0$, choose $N$ with $\abs{a_n} < \eps/M$ for $n \ge N$. Then $\abs{a_n b_n} \le M\abs{a_n} < \eps$ for $n \ge N$. With $a_n = 1/n$ and $b_n = \sin n$ (bounded by $1$) we get $\frac{\sin n}{n} \to 0$. The product rule needs *both* factors to converge, and $(\sin n)$ does not converge.
:::
:::

::: exercise The harmonic sequence is not Cauchy {level=2}
Let $H_n = 1 + \frac12 + \cdots + \frac1n$. Show that $H_{2n} - H_n \ge \frac12$ for every $n$, and deduce that $(H_n)$ diverges, although $H_{n+1} - H_n \to 0$.
::: solution
$H_{2n} - H_n = \frac{1}{n+1} + \cdots + \frac{1}{2n}$ has $n$ terms, each at least $\frac{1}{2n}$, so it is at least $n\cdot\frac1{2n} = \frac12$. If $(H_n)$ were Cauchy, then with $\eps = \frac12$ there would be $N$ with $\abs{H_m - H_n} < \frac12$ for all $m, n \ge N$; taking $n = N$ and $m = 2N$ contradicts the inequality. So $(H_n)$ is not Cauchy and diverges by [[#thm-cauchy]]. Since it is increasing, [[#thm-monotone]] shows $H_n \to \infty$. Consecutive differences $\frac{1}{n+1}$ tend to $0$, which shows that the Cauchy condition really does need *all* pairs $m, n \ge N$.
:::
:::

::: exercise The Babylonian square root {level=2}
Let $x_1 = 3$ and $x_{n+1} = \dfrac12\Bigl(x_n + \dfrac{5}{x_n}\Bigr)$. Prove that $x_n \ge \sqrt5$ for all $n$, that $(x_n)$ is decreasing, and that $x_n \to \sqrt5$.
::: solution
By induction all $x_n > 0$. For every $n$,

$$
x_{n+1} - \sqrt5 = \frac{x_n^2 - 2\sqrt5\,x_n + 5}{2x_n} = \frac{(x_n - \sqrt5)^2}{2x_n} \ge 0,
$$

so $x_n \ge \sqrt5$ for $n \ge 2$, and also for $n = 1$ since $3 > \sqrt5$. Then $x_n - x_{n+1} = \dfrac{x_n^2 - 5}{2x_n} \ge 0$, so the sequence decreases. Being decreasing and bounded below by $\sqrt5$, it converges by [[#thm-monotone]] to some $L \ge \sqrt5 > 0$. From $2x_{n+1}x_n = x_n^2 + 5$ we get $2L^2 = L^2 + 5$, so $L^2 = 5$ and $L = \sqrt5$. (The first display shows that the error is roughly squared at each step: $x_4 \approx 2.2360689$ already agrees with $\sqrt5$ to five decimal places, with an error below $10^{-6}$.)
:::
:::

::: exercise Averages converge {level=3}
Suppose $a_n \to L$, and let $\sigma_n = \dfrac{a_1 + a_2 + \cdots + a_n}{n}$. Prove that $\sigma_n \to L$. Show by an example that $(\sigma_n)$ may converge although $(a_n)$ does not.
::: hint
Split the sum at an index $N$ beyond which $\abs{a_k - L} < \eps/2$; the first $N-1$ terms contribute a fixed amount divided by $n$.
:::
::: solution
Let $\eps > 0$. Choose $N$ with $\abs{a_k - L} < \eps/2$ for $k \ge N$, and put $C = \sum_{k=1}^{N-1}\abs{a_k - L}$. For $n \ge N$,

$$
\abs{\sigma_n - L} = \left\lvert\frac1n\sum_{k=1}^n (a_k - L)\right\rvert \le \frac{C}{n} + \frac1n\sum_{k=N}^{n}\abs{a_k - L} < \frac Cn + \frac{n - N + 1}{n}\cdot\frac\eps2 \le \frac Cn + \frac\eps2.
$$

Choose $N' \ge N$ with $C/N' < \eps/2$. Then $\abs{\sigma_n - L} < \eps$ for all $n \ge N'$. For the example take $a_n = (-1)^n$: the partial sums are $-1, 0, -1, 0, \dots$, so $\abs{\sigma_n} \le 1/n \to 0$, while $(a_n)$ diverges.
:::
:::

::: exercise Upper limits are subadditive {level=3}
Let $(a_n)$ and $(b_n)$ be bounded. Prove that $\limsup(a_n + b_n) \le \limsup a_n + \limsup b_n$, and give an example where the inequality is strict.
::: solution
For each $n$ and every $k \ge n$, $a_k + b_k \le \sup_{j\ge n} a_j + \sup_{j\ge n} b_j$. So the right-hand side is an upper bound of $\set{a_k + b_k : k \ge n}$, and

$$
\sup_{k\ge n}(a_k + b_k) \le \sup_{k \ge n} a_k + \sup_{k\ge n} b_k.
$$

Letting $n \to \infty$ and using [[#thm-order-limits]] and the sum rule gives the inequality. For strictness take $a_n = (-1)^n$ and $b_n = (-1)^{n+1}$: then $a_n + b_n = 0$, so the left side is $0$, while $\limsup a_n + \limsup b_n = 1 + 1 = 2$.
:::
:::

::: exercise Sub-subsequences {level=3}
Prove that $a_n \to L$ if and only if every subsequence of $(a_n)$ has a further subsequence that converges to $L$.
::: hint
For the harder direction, argue by contradiction: if $a_n \not\to L$, build a subsequence that stays at distance at least $\eps$ from $L$.
:::
::: solution
If $a_n \to L$, every subsequence converges to $L$ by [[#thm-subsequence]], and is its own further subsequence. Conversely, suppose $a_n \not\to L$. Negating [[#def-convergence]], there is $\eps > 0$ such that for every $N$ some $n \ge N$ has $\abs{a_n - L} \ge \eps$. Choose $n_1$ with $\abs{a_{n_1} - L} \ge \eps$, then $n_2 > n_1$ with $\abs{a_{n_2} - L} \ge \eps$, and so on. Every term of the subsequence $(a_{n_k})$, hence of every further subsequence, is at distance at least $\eps$ from $L$, so no further subsequence converges to $L$ — contradicting the hypothesis. (This principle is used constantly in analysis and probability to upgrade "along a subsequence" statements.)
:::
:::
