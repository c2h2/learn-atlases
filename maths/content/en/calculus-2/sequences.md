How does a calculator find $\sqrt 2$? One very old method, described by Heron of Alexandria almost two thousand years ago, starts from a rough guess $x_0 = 1$ and repeatedly replaces the current guess $x$ by the average of $x$ and $2/x$. If $x$ is too small then $2/x$ is too large, so their average should be closer to the truth. The rule $x_{n+1} = \tfrac12\left(x_n + 2/x_n\right)$ produces

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ |
|---|---|---|---|---|---|
| $x_n$ | $1$ | $1.5$ | $1.416\,666\,666\,67$ | $1.414\,215\,686\,27$ | $1.414\,213\,562\,37$ |
| $x_n - \sqrt2$ | $-0.414$ | $0.0858$ | $0.00245$ | $2.1\times10^{-6}$ | $1.6\times10^{-12}$ |

After four steps eleven digits are correct. An infinite list of numbers produced by a rule like this is a **sequence**, and the question "what number are these approximations approaching, and do they really approach it?" is a question about the **limit of a sequence**.

Sequences are the simplest setting for the idea of a limit: simpler than functions, because there is only one way to "go to infinity" along the integers. They are also the foundation of the rest of this course. An infinite series is defined as the limit of the sequence of its partial sums ([[calculus-2/series]]), and power series and Taylor series are built on top of that. In this chapter we define convergence precisely, prove the rules that make limits computable, collect the standard limits that every later chapter uses, and prove the monotone convergence theorem, which shows that a limit exists even when we cannot compute it.

## What is a sequence?

::: definition Sequence {#def-sequence}
A **sequence** of real numbers is a function $a$ from the set of integers $\set{n \in \Z : n \ge n_0}$ to $\R$, where usually $n_0 = 1$ or $n_0 = 0$. The value $a(n)$ is written $a_n$ and called the $n$th **term**; the sequence as a whole is written $(a_n)_{n \ge 1}$, or simply $(a_n)$.
:::

There are three common ways to specify a sequence.

- **By a formula** for the $n$th term: $a_n = 1/n$ gives $1, \tfrac12, \tfrac13, \dots$; $b_n = (-1)^n$ gives $-1, 1, -1, 1, \dots$; $c_n = n^2$ gives $1, 4, 9, \dots$.
- **By a recursion**, which gives the first term(s) and a rule for each term in terms of earlier ones: Heron's $x_{n+1} = \tfrac12(x_n + 2/x_n)$ with $x_0 = 1$, or the Fibonacci numbers $F_1 = F_2 = 1$, $F_{n+2} = F_{n+1} + F_n$.
- **By a description**: $p_n$ is the $n$th prime, $d_n$ is the $n$th decimal digit of $\pi$.

Listing the first few terms followed by "…" is *not* a definition. The numbers $1, 2, 4, 8, 16$ look as if they continue with $32$, but they are also the first five terms of the sequence "the largest number of regions into which a disc is cut by the chords joining $n$ points on its circumference", whose next term is $31$.

We picture a sequence by plotting the points $(n, a_n)$. Unlike the graph of a function on an interval, this graph is a set of isolated dots, and the only interesting direction is to the right: as $n \to \infty$.

## Convergence

Informally, $a_n \to L$ means that the terms are eventually as close to $L$ as we please. The definition is the same as that of a limit at infinity in [[calculus-1/limits]], except that the variable runs through integers.

::: definition Limit of a sequence {#def-seq-limit}
A sequence $(a_n)$ **converges** to the real number $L$ if

$$
\text{for every } \eps > 0 \text{ there is an integer } N \text{ such that } \quad n \ge N \implies \abs{a_n - L} < \eps .
$$ {#eq-seq-limit}

We then write $\lim_{n\to\infty} a_n = L$ or $a_n \to L$, and call $L$ the **limit**. A sequence that converges to some real number is **convergent**; otherwise it is **divergent**.
:::

Read [[#eq-seq-limit]] as a statement about bands: however narrow a horizontal band $L - \eps < y < L + \eps$ you draw, from some index $N$ onwards *every* term lies inside it. Equivalently, only finitely many terms lie outside the band. Changing, adding or deleting finitely many terms never affects convergence or the limit, because it only changes the $N$ that works.

::: widget sequence
a: (2n+1)/(n+3)
N: 40
limit: 2
epsilon: 0.3
caption: The terms $a_n = \frac{2n+1}{n+3}$ with the band $\lvert y - 2\rvert < \eps$. For $\eps = 0.3$ every term from $n = 14$ on lies in the band. Shrink $\eps$ and watch the required $N$ grow; however small you make $\eps$, some $N$ works — that is what convergence means.
:::

::: example An ε–N proof {#ex-eps-n}
Prove from the definition that $\displaystyle\lim_{n\to\infty}\frac{2n+1}{n+3} = 2$.
::: solution
*Scratch work.* We need to make $\abs{a_n - 2}$ small. Simplify it:

$$
\abs{\frac{2n+1}{n+3} - 2} = \abs{\frac{2n + 1 - 2n - 6}{n+3}} = \frac{5}{n+3}.
$$

This is less than $\eps$ when $n + 3 > 5/\eps$. To keep the proof clean we use the cruder bound $\frac{5}{n+3} < \frac5n$ and ask for $n > 5/\eps$.

*Proof.* Let $\eps > 0$ and choose an integer $N > 5/\eps$. For every $n \ge N$,

$$
\abs{\frac{2n+1}{n+3} - 2} = \frac{5}{n+3} < \frac{5}{n} \le \frac{5}{N} < \eps .
$$

Hence $a_n \to 2$. (For $\eps = 0.3$ this gives $N = 17$; the figure shows that $N = 14$ already works. The definition only asks for *some* $N$, not the smallest one.)
:::
:::

Some divergent sequences diverge in a definite direction, and we have notation for that.

::: definition Divergence to infinity {#def-seq-infinity}
We write $a_n \to \infty$ if for every $M$ there is an $N$ such that $a_n > M$ for all $n \ge N$, and $a_n \to -\infty$ if for every $M$ there is an $N$ with $a_n < M$ for all $n \ge N$.
:::

For example $n^2 \to \infty$ and $\sqrt n \to \infty$, while $(-1)^n n$, whose terms are $-1, 2, -3, 4, \dots$, diverges but tends neither to $\infty$ nor to $-\infty$. As with functions, "$a_n \to \infty$" is a precise description of a way of *diverging*; $\infty$ is not a limit.

::: example A bounded sequence that diverges {#ex-alt-diverges}
Show that the sequence $(-1)^n$ diverges.
::: solution
Suppose, for a contradiction, that $(-1)^n \to L$. Apply the definition with $\eps = 1$: there is an $N$ such that $\abs{(-1)^n - L} < 1$ for all $n \ge N$. Among $n = N$ and $n = N+1$ one is even and one is odd, so

$$
\abs{1 - L} < 1 \quad\text{and}\quad \abs{-1 - L} < 1 .
$$

By the triangle inequality $2 = \abs{1 - (-1)} \le \abs{1 - L} + \abs{L + 1} < 2$, which is impossible. So no limit exists.
:::
:::

The argument shows more generally that a limit, when it exists, is unique: two different numbers $L \neq M$ cannot both be limits, because with $\eps = \abs{L - M}/2$ the terms would eventually have to lie in two disjoint bands at once. A sequence that converges cannot wander very far either.

::: theorem Convergent sequences are bounded {#thm-bounded}
A sequence $(a_n)$ is **bounded** if there is a number $M$ with $\abs{a_n} \le M$ for all $n$. Every convergent sequence is bounded.
:::

::: proof
Let $a_n \to L$. Taking $\eps = 1$ in the definition gives an $N$ with $\abs{a_n - L} < 1$, and hence $\abs{a_n} \le \abs{a_n - L} + \abs{L} < \abs{L} + 1$, for all $n \ge N$. Only the finitely many terms $a_1, \dots, a_{N-1}$ remain, so

$$
M = \max\bigl(\abs{a_1}, \abs{a_2}, \dots, \abs{a_{N-1}}, \abs{L} + 1\bigr)
$$

satisfies $\abs{a_n} \le M$ for every $n$.
:::

The contrapositive is a quick divergence test: an unbounded sequence such as $n^2$ or $(-1)^n n$ cannot converge.

::: warning Bounded does not mean convergent
[[#thm-bounded]] does not run backwards. The sequence $(-1)^n$ is bounded (by $M = 1$) but diverges, as [[#ex-alt-diverges]] showed. Boundedness is necessary for convergence, not sufficient. We shall see below that boundedness *plus monotonicity* is sufficient.
:::

::: quiz
Which of these statements means exactly that $a_n \to L$?
- [ ] There is an $N$ such that for every $\eps > 0$, $\abs{a_n - L} < \eps$ for all $n \ge N$.
- [x] For every $\eps > 0$, all but finitely many terms satisfy $\abs{a_n - L} < \eps$.
- [ ] For every $\eps > 0$ there is at least one $n$ with $\abs{a_n - L} < \eps$.
- [ ] The terms get closer to $L$ at every step: $\abs{a_{n+1} - L} < \abs{a_n - L}$ for all $n$.
::: solution
The second statement is a rephrasing of the definition: "from some $N$ on" is the same as "all but finitely many". The first has the quantifiers in the wrong order; it would force $a_n = L$ for all $n \ge N$. The third is much weaker: $(-1)^n$ comes within any $\eps$ of $1$ infinitely often but does not converge. The fourth is neither necessary ($a_n = 1/n$ for odd $n$ and $0$ for even $n$ converges to $0$ without approaching it at every step) nor sufficient ($1/n$ gets closer to $-1$ at every step but its limit is $0$).
:::
:::

## Computing limits

Proving every limit from the definition would be slow. As for functions, a few rules combine simple limits into complicated ones.

::: theorem Limit laws for sequences {#thm-seq-laws}
Suppose $a_n \to a$ and $b_n \to b$, and let $c$ be a constant. Then

1. $a_n + b_n \to a + b$ and $c\,a_n \to c\,a$;
2. $a_n b_n \to ab$;
3. if $b \ne 0$, then $b_n \ne 0$ for all sufficiently large $n$, and $a_n / b_n \to a/b$.
:::

::: proof
**Sum.** Given $\eps > 0$, choose $N_1$ with $\abs{a_n - a} < \eps/2$ for $n \ge N_1$ and $N_2$ with $\abs{b_n - b} < \eps/2$ for $n \ge N_2$. For $n \ge \max(N_1, N_2)$ the triangle inequality gives $\abs{(a_n + b_n) - (a + b)} < \eps$. The constant multiple is the special case $b_n = c$ of the product rule.

**Product.** By [[#thm-bounded]] there is $M > 0$ with $\abs{a_n} \le M$ for all $n$. Adding and subtracting $a_n b$,

$$
\abs{a_n b_n - ab} = \abs{a_n (b_n - b) + b(a_n - a)} \le M\abs{b_n - b} + \abs{b}\,\abs{a_n - a}.
$$

Given $\eps > 0$, choose $N$ so large that $\abs{b_n - b} < \eps/(2M)$ and $\abs{a_n - a} < \eps/(2\abs{b} + 2)$ for $n \ge N$. Then $\abs{a_n b_n - ab} < \eps/2 + \eps/2 = \eps$.

**Quotient.** By the product rule it is enough to show $1/b_n \to 1/b$. Using $\eps = \abs{b}/2$ in the definition, there is $N_1$ such that $\abs{b_n - b} < \abs{b}/2$, and therefore $\abs{b_n} > \abs{b}/2 > 0$, for $n \ge N_1$. For those $n$,

$$
\abs{\frac{1}{b_n} - \frac{1}{b}} = \frac{\abs{b - b_n}}{\abs{b_n}\,\abs{b}} \le \frac{2}{\abs{b}^2}\abs{b_n - b},
$$

which is less than $\eps$ as soon as $\abs{b_n - b} < \eps\abs{b}^2/2$, true for all large $n$.
:::

::: theorem Squeeze theorem for sequences {#thm-seq-squeeze}
If $a_n \le b_n \le c_n$ for all $n \ge n_1$, and $a_n \to L$ and $c_n \to L$, then $b_n \to L$. In particular, if $\abs{b_n} \le c_n$ and $c_n \to 0$, then $b_n \to 0$.
:::

::: proof
Given $\eps > 0$, choose $N \ge n_1$ such that $L - \eps < a_n$ and $c_n < L + \eps$ for all $n \ge N$. Then $L - \eps < a_n \le b_n \le c_n < L + \eps$, so $\abs{b_n - L} < \eps$, for all $n \ge N$. For the second statement take $a_n = -c_n$.
:::

A special case is worth stating separately: $b_n \to 0$ if and only if $\abs{b_n} \to 0$, because $\bigl\lvert \abs{b_n} - 0 \bigr\rvert = \abs{b_n - 0}$.

::: example Using the laws and the squeeze {#ex-laws}
Find (a) $\displaystyle\lim_{n\to\infty}\frac{3n^2 - n}{5n^2 + 2}$ and (b) $\displaystyle\lim_{n\to\infty}\frac{n\cos n}{n^2 + 1}$.
::: solution
(a) Divide numerator and denominator by the highest power, $n^2$:

$$
\frac{3n^2 - n}{5n^2 + 2} = \frac{3 - 1/n}{5 + 2/n^2}.
$$

Since $1/n \to 0$ (given $\eps$, take $N > 1/\eps$) and $1/n^2 = (1/n)(1/n) \to 0$ by the product law, the numerator tends to $3$ and the denominator to $5 \ne 0$, so the quotient law gives the limit $\tfrac35$.

(b) The factor $\cos n$ has no limit, so the laws do not apply directly. But $\abs{\cos n} \le 1$, so

$$
\abs{\frac{n\cos n}{n^2+1}} \le \frac{n}{n^2+1} < \frac{n}{n^2} = \frac1n \to 0,
$$

and the squeeze theorem gives the limit $0$.
:::
:::

### Sequences and functions

Many sequences are values of a familiar function at the integers, $a_n = f(n)$, and then everything we know about limits of functions at infinity is available, including L'Hôpital's rule from [[calculus-1/mean-value-theorem]].

::: theorem Limits of functions give limits of sequences {#thm-fn-seq}
If $\lim_{x\to\infty} f(x) = L$ and $a_n = f(n)$ for all $n$, then $a_n \to L$.
:::

::: proof
Given $\eps > 0$ there is a real number $X$ with $\abs{f(x) - L} < \eps$ for all real $x > X$. Choose an integer $N > X$. Then for $n \ge N$ we have $n > X$, so $\abs{a_n - L} = \abs{f(n) - L} < \eps$.
:::

For instance, $\dfrac{\ln x}{x} \to 0$ as $x\to\infty$ by L'Hôpital's rule (the quotient of derivatives is $\frac{1/x}{1} \to 0$), so $\dfrac{\ln n}{n} \to 0$.

::: warning The converse is false
If $a_n = f(n) \to L$, the function $f$ need not have a limit at infinity. The sequence $\sin(\pi n)$ is identically $0$, so it converges to $0$, but $\sin(\pi x)$ oscillates between $-1$ and $1$ for ever. A sequence only samples the function at the integers and cannot see what happens in between. Likewise, you may not apply L'Hôpital's rule to a sequence directly — differentiate the function $f(x)$, never "differentiate with respect to $n$".
:::

The second bridge between functions and sequences is continuity: a continuous function maps convergent sequences to convergent sequences.

::: theorem Continuous functions preserve limits {#thm-continuous-seq}
If $a_n \to L$ and $f$ is continuous at $L$ (with all $a_n$ in the domain of $f$), then $f(a_n) \to f(L)$.
:::

::: proof
Let $\eps > 0$. By continuity of $f$ at $L$ there is $\delta > 0$ such that $\abs{f(x) - f(L)} < \eps$ whenever $\abs{x - L} < \delta$ (see [[calculus-1/continuity]]). Applying the definition of $a_n \to L$ with $\delta$ in the role of $\eps$, there is $N$ with $\abs{a_n - L} < \delta$ for $n \ge N$. For those $n$, $\abs{f(a_n) - f(L)} < \eps$.
:::

::: example Two limits involving exponentials {#ex-nth-root}
Show that (a) $\sqrt[n]{n} \to 1$ and (b) $\left(1 + \dfrac{x}{n}\right)^n \to e^x$ for every real $x$.
::: solution
(a) Write $n^{1/n} = \exp\!\left(\dfrac{\ln n}{n}\right)$. We saw that $\dfrac{\ln n}{n} \to 0$, and $\exp$ is continuous at $0$, so by [[#thm-continuous-seq]] $n^{1/n} \to e^0 = 1$. The same argument shows $a^{1/n} = \exp\bigl((\ln a)/n\bigr) \to 1$ for every $a > 0$.

(b) For $x = 0$ there is nothing to prove, so let $x \ne 0$. For $n > \abs{x}$ the base is positive and we can take logarithms: $\ln\bigl((1 + x/n)^n\bigr) = n\ln(1 + x/n)$. Consider the function $g(t) = \dfrac{\ln(1 + xt)}{t}$ as $t \to 0^+$. It has the form $0/0$, and L'Hôpital's rule gives

$$
\lim_{t\to0^+}\frac{\ln(1 + xt)}{t} = \lim_{t\to 0^+}\frac{x/(1+xt)}{1} = x .
$$

Hence $f(s) = s\ln(1 + x/s) = g(1/s) \to x$ as $s\to\infty$, so $n\ln(1 + x/n) \to x$ by [[#thm-fn-seq]], and finally $(1 + x/n)^n = \exp\bigl(n\ln(1+x/n)\bigr) \to e^x$ by continuity of $\exp$.
:::
:::

::: application Compound interest
If £1000 is invested at an annual rate of $5\%$ and interest is added $m$ times a year, after $10$ years it is worth $1000\,(1 + 0.05/m)^{10m}$: £1628.89 for yearly compounding, £1647.01 monthly and £1648.66 daily. As $m\to\infty$, part (b) of [[#ex-nth-root]] (with $n = 10m$ and $x = 0.5$) shows that the amount tends to $1000\,e^{0.5} \approx$ £1648.72, the value under *continuous compounding*. This is how the number $e$ was first met, by Jacob Bernoulli in 1683.
:::

### Standard limits

The following limits are used constantly. The first is the most important of all.

::: theorem Geometric sequences {#thm-geometric-seq}
For a real number $r$,

$$
\lim_{n\to\infty} r^n = \begin{cases} 0 & \text{if } \abs{r} < 1, \\ 1 & \text{if } r = 1, \end{cases}
$$

and $(r^n)$ diverges if $r > 1$ (to $\infty$) or $r \le -1$.
:::

::: proof
**Bernoulli's inequality** says $(1 + h)^n \ge 1 + nh$ for $h \ge 0$ and $n \ge 1$; it follows by induction, since $(1+h)^{n+1} \ge (1 + nh)(1 + h) = 1 + (n+1)h + nh^2 \ge 1 + (n+1)h$.

If $r > 1$, write $r = 1 + h$ with $h > 0$. Then $r^n \ge 1 + nh$, which exceeds any given $M$ once $n > M/h$; so $r^n \to \infty$.

If $0 < \abs{r} < 1$, then $s = 1/\abs{r} > 1$, so $s^n \to \infty$ and therefore $\abs{r}^n = 1/s^n \to 0$ (given $\eps$, eventually $s^n > 1/\eps$). By the squeeze theorem $r^n \to 0$. The case $r = 0$ is immediate, and $r = 1$ gives the constant sequence $1$.

If $r = -1$ the sequence is $(-1)^n$, which diverges by [[#ex-alt-diverges]]. If $r < -1$ then $\abs{r^n} = \abs{r}^n \to \infty$, so the sequence is unbounded and diverges by [[#thm-bounded]].
:::

Many other standard limits follow from one simple principle: if each term is at most a fixed fraction $q < 1$ of the previous one, the terms are squeezed below a geometric sequence.

::: theorem Ratio test for sequences {#thm-ratio-seq}
Let $a_n > 0$ for all $n$ and suppose $\dfrac{a_{n+1}}{a_n} \to \rho$ with $\rho < 1$. Then $a_n \to 0$.
:::

::: proof
Choose a number $q$ with $\rho < q < 1$, for example $q = (1 + \rho)/2$. Applying the definition of $a_{n+1}/a_n \to \rho$ with $\eps = q - \rho$ gives an $N$ such that $a_{n+1}/a_n < q$, that is $a_{n+1} < q\,a_n$, for all $n \ge N$. By induction, $a_n \le a_N\,q^{\,n-N}$ for all $n \ge N$. The right-hand side is a constant multiple of $q^n$, which tends to $0$ by [[#thm-geometric-seq]], so $0 < a_n \le a_N q^{-N} q^n$ and the squeeze theorem gives $a_n \to 0$.
:::

Applying [[#thm-ratio-seq]]:

- $\dfrac{a^n}{n!} \to 0$ for every $a > 0$: the ratio of consecutive terms is $\dfrac{a}{n+1} \to 0$. (For $a < 0$ use $\abs{a}$ and the squeeze theorem.)
- $\dfrac{n^p}{a^n} \to 0$ for every real $p$ and every $a > 1$: the ratio is $\left(1 + \tfrac1n\right)^p \dfrac{1}{a} \to \dfrac1a < 1$.
- $\dfrac{n!}{n^n} \to 0$: the ratio is $\dfrac{(n+1)!}{(n+1)^{n+1}}\cdot\dfrac{n^n}{n!} = \left(\dfrac{n}{n+1}\right)^{n} = \dfrac{1}{(1 + 1/n)^n} \to \dfrac1e < 1$.

Together with $\frac{\ln n}{n} \to 0$ and its generalisation $\frac{(\ln n)^q}{n^p} \to 0$ for $p > 0$ ([[#exr-log-power]]), these say that, for $p, q > 0$ and $a > 1$,

$$
(\ln n)^q \ll n^p \ll a^n \ll n! \ll n^n ,
$$ {#eq-hierarchy}

where $b_n \ll c_n$ means $b_n / c_n \to 0$. Logarithms lose to powers, powers lose to exponentials, exponentials lose to factorials, and factorials lose to $n^n$.

| sequence | limit | condition |
|---|---|---|
| $r^n$ | $0$ | $\abs r < 1$ |
| $a^{1/n}$ | $1$ | $a > 0$ |
| $n^{1/n}$ | $1$ | |
| $(1 + x/n)^n$ | $e^x$ | $x \in \R$ |
| $n^p / a^n$ | $0$ | $p \in \R$, $a > 1$ |
| $a^n / n!$ | $0$ | $a \in \R$ |
| $(\ln n)^q / n^p$ | $0$ | $p > 0$, $q \in \R$ |

::: quiz
Which of these sequences tend to $0$? (Select all that apply.)
- [x] $\dfrac{n^{10}}{1.1^n}$
- [ ] $\dfrac{2^n}{n^{10}}$
- [x] $\dfrac{(\ln n)^5}{\sqrt n}$
- [ ] $\dfrac{n!}{10^n}$
::: solution
By [[#eq-hierarchy]], exponentials beat powers, so $n^{10}/1.1^n \to 0$ even though the terms grow at first (they peak at about $7\times10^{15}$ near $n = 105$ and fall back below $1$ only from $n = 686$ on), while $2^n/n^{10} \to \infty$. Powers beat logarithms, so $(\ln n)^5/\sqrt n \to 0$ (again very slowly). Factorials beat exponentials, so $n!/10^n \to \infty$. Tables of early terms are misleading here; the hierarchy is a statement about the eventual behaviour.
:::
:::

## Monotone sequences and completeness

So far we could only prove that a sequence converges by guessing its limit $L$ and then checking [[#eq-seq-limit]]. Often we cannot guess the limit: what is the limit of Heron's iterates, if we do not already know $\sqrt 2$? What *is* $e$? The answer is a theorem that guarantees a limit exists without naming it.

::: definition Monotone and bounded sequences {#def-monotone}
A sequence $(a_n)$ is **increasing** if $a_n \le a_{n+1}$ for all $n$, **strictly increasing** if $a_n < a_{n+1}$ for all $n$, and **decreasing** (strictly decreasing) if $a_n \ge a_{n+1}$ ($a_n > a_{n+1}$) for all $n$. It is **monotone** if it is increasing or decreasing. It is **bounded above** if there is an $M$ with $a_n \le M$ for all $n$, and **bounded below** if there is an $m$ with $a_n \ge m$ for all $n$.
:::

To show that a sequence is monotone, examine the sign of $a_{n+1} - a_n$; or, for positive terms, compare $a_{n+1}/a_n$ with $1$; or, if $a_n = f(n)$, check the sign of $f'(x)$; or, for a recursion, use induction.

::: theorem Monotone convergence theorem {#thm-mct}
A monotone sequence converges if and only if it is bounded. More precisely, an increasing sequence that is bounded above converges to $\sup\set{a_n : n \ge 1}$, and a decreasing sequence that is bounded below converges to $\inf\set{a_n : n \ge 1}$.
:::

The proof rests on the **completeness axiom** of the real numbers: *every non-empty set of real numbers that is bounded above has a least upper bound* (its **supremum**). This is the property that distinguishes $\R$ from $\Q$, and it is discussed fully in [[real-analysis/real-numbers]].

::: proof
A convergent sequence is bounded by [[#thm-bounded]], so only the converse needs proof.

Let $(a_n)$ be increasing and bounded above. The set $S = \set{a_n : n \ge 1}$ is non-empty and bounded above, so by completeness it has a supremum $L$. Let $\eps > 0$. Since $L$ is the *least* upper bound, $L - \eps$ is not an upper bound of $S$, so some term satisfies $a_N > L - \eps$. Because the sequence is increasing and $L$ is an upper bound, for every $n \ge N$

$$
L - \eps < a_N \le a_n \le L ,
$$

so $\abs{a_n - L} < \eps$. Hence $a_n \to L$.

If $(a_n)$ is decreasing and bounded below, then $(-a_n)$ is increasing and bounded above, so $-a_n \to \sup\set{-a_n} = -\inf\set{a_n}$, and $a_n \to \inf\set{a_n}$ by the limit laws.
:::

::: remark Why completeness is essential
Heron's iterates $x_1 = 1.5$, $x_2 = 1.41\overline{6}$, … are rational numbers, they decrease, and they are bounded below by $1$ ([[#exr-heron]]). Inside the rational numbers they have no limit, because $\sqrt 2$ is irrational. So the monotone convergence theorem is false in $\Q$; it holds in $\R$ precisely because $\R$ has no "gaps".
:::

The theorem is most useful for recursively defined sequences, where the strategy is: (1) prove boundedness and monotonicity by induction; (2) conclude that the limit $L$ exists; (3) only then pass to the limit in the recursion to find $L$.

::: example A recursively defined sequence {#ex-recursive}
Let $a_1 = 1$ and $a_{n+1} = \sqrt{2 + a_n}$. Show that $(a_n)$ converges and find its limit.
::: solution
The first terms are $1,\ \allowbreak 1.7321,\ \allowbreak 1.9319,\ \allowbreak 1.9829,\ \allowbreak 1.9957,\ \allowbreak 1.9989,\ \allowbreak \dots$, which suggests an increasing sequence with limit $2$.

*Bounded above by 2.* We prove $0 < a_n < 2$ by induction. It holds for $a_1 = 1$. If $0 < a_n < 2$, then $a_{n+1} = \sqrt{2 + a_n}$ is positive and $a_{n+1} < \sqrt{2 + 2} = 2$.

*Increasing.* Since all terms are positive, $a_{n+1} > a_n$ is equivalent to $a_{n+1}^2 > a_n^2$, and

$$
a_{n+1}^2 - a_n^2 = 2 + a_n - a_n^2 = (2 - a_n)(1 + a_n) > 0
$$

because $0 < a_n < 2$.

*The limit.* By [[#thm-mct]], $a_n \to L$ for some $L$, and $1 \le L \le 2$ since $1 \le a_n < 2$ for all $n$. The shifted sequence $(a_{n+1})$ has the same limit $L$, so letting $n \to \infty$ in $a_{n+1}^2 = 2 + a_n$ gives $L^2 = 2 + L$, that is $(L - 2)(L + 1) = 0$. As $L \ge 1$, the limit is $L = 2$.
:::
:::

::: widget cobweb
g: sqrt(2 + x)
x0: 1
steps: 12
x: 0, 3
y: 0, 3
caption: The **cobweb diagram** of $a_{n+1} = \sqrt{2 + a_n}$: go vertically to the graph of $g(x) = \sqrt{2+x}$, then horizontally to the line $y = x$, and repeat. The staircase climbs towards the intersection at $x = 2$, the solution of $L = \sqrt{2 + L}$. Start at $x_0 = 3$ instead: the sequence now *decreases* to $2$.
:::

::: warning Prove convergence before solving for the limit
Passing to the limit in a recursion only tells you what the limit must be *if it exists*. With $a_1 = 1$ and $a_{n+1} = 2a_n$, the same manipulation gives "$L = 2L$, so $L = 0$", although $a_n = 2^{n-1} \to \infty$. Always establish convergence first (for example by [[#thm-mct]]), and use the bounds you proved to choose between several solutions of the limit equation.
:::

::: example The number e {#ex-e}
Show that $e_n = \left(1 + \dfrac1n\right)^n$ is increasing and bounded above by $3$. Its limit is the number $e = 2.718\,281\,828\dots$
::: solution
*Increasing.* The arithmetic–geometric mean inequality says that the geometric mean of positive numbers is at most their arithmetic mean, with equality only if they are all equal. Apply it to the $n + 1$ numbers $1 + \frac1n$ (taken $n$ times) and $1$:

$$
\left[\left(1 + \frac1n\right)^n \cdot 1\right]^{\frac{1}{n+1}} < \frac{n\left(1 + \frac1n\right) + 1}{n+1} = \frac{n+2}{n+1} = 1 + \frac{1}{n+1}.
$$

Raising both sides to the power $n + 1$ gives $e_n < e_{n+1}$.

*Bounded.* By the binomial theorem,

$$
\left(1 + \frac1n\right)^n = \sum_{k=0}^{n}\binom{n}{k}\frac{1}{n^k}, \qquad \binom nk\frac{1}{n^k} = \frac{1}{k!}\cdot\frac{n(n-1)\cdots(n-k+1)}{n\cdot n\cdots n} \le \frac{1}{k!}.
$$

Since $k! = 1\cdot 2\cdot 3\cdots k \ge 2^{k-1}$ for $k \ge 1$,

$$
e_n \le 1 + \sum_{k=1}^{n}\frac{1}{k!} \le 1 + \left(1 + \frac12 + \frac14 + \cdots + \frac{1}{2^{n-1}}\right) < 1 + 2 = 3 .
$$

By [[#thm-mct]] the limit exists; it lies between $e_1 = 2$ and $3$. Part (b) of [[#ex-nth-root]] with $x = 1$ identifies it with $e^1$, the base of the natural logarithm. Convergence is slow: $e_{10} = 2.5937$, $e_{100} = 2.7048$, $e_{1000} = 2.7169$, $e_{10^6} = 2.7182805$; the error is roughly $e/(2n)$.
:::
:::

::: widget sequence
a: (1 + 1/n)^n
N: 80
limit: e
epsilon: 0.05
caption: The increasing sequence $\left(1+\frac1n\right)^n$ creeps up towards $e$ from below and never overshoots. With $\eps = 0.05$ the terms enter the band at $n = 27$; with $\eps = 0.01$ you would need $n \ge 135$. Slow convergence like this, with error about $e/(2n)$, is why $e$ is computed from a series instead ([[calculus-2/taylor-series]]).
:::

::: quiz
Suppose $(a_n)$ is increasing and $a_n \le 5$ for all $n$. Which statements must be true? (Select all that apply.)
- [x] $(a_n)$ converges, and its limit $L$ satisfies $L \le 5$.
- [ ] $(a_n)$ converges to $5$.
- [x] The limit satisfies $L \ge a_1$.
- [ ] $a_n < L$ for every $n$.
::: solution
By [[#thm-mct]], $a_n \to L = \sup\set{a_n}$; since $5$ is an upper bound and $a_1$ is a term, $a_1 \le L \le 5$. The limit need not be $5$ (take $a_n = 1 - 1/n$, with limit $1$), and the terms need not be strictly below $L$: an increasing sequence may reach its limit and stay there, like the constant sequence $a_n = 2$.
:::
:::

## Subsequences and the Bolzano–Weierstrass theorem

Picking out infinitely many terms of a sequence, in order, gives a new sequence.

::: definition Subsequence {#def-subsequence}
Given a sequence $(a_n)$ and integers $n_1 < n_2 < n_3 < \cdots$, the sequence $(a_{n_k})_{k\ge1} = (a_{n_1}, a_{n_2}, a_{n_3}, \dots)$ is a **subsequence** of $(a_n)$.
:::

For example, the even-numbered terms $(a_{2k})$ and the odd-numbered terms $(a_{2k-1})$ are subsequences. Because the indices are strictly increasing integers, $n_k \ge k$ for every $k$ (by induction: $n_1 \ge 1$, and $n_{k+1} > n_k \ge k$).

::: theorem Subsequences inherit the limit {#thm-subseq}
If $a_n \to L$, then every subsequence $(a_{n_k})$ also converges to $L$. Consequently, if a sequence has two subsequences with different limits, or a divergent subsequence, then it diverges.
:::

::: proof
Let $\eps > 0$ and choose $N$ with $\abs{a_n - L} < \eps$ for $n \ge N$. If $k \ge N$ then $n_k \ge k \ge N$, so $\abs{a_{n_k} - L} < \eps$. The second statement is the contrapositive of the first.
:::

For instance $a_n = (-1)^n + \frac1n$ has terms $0, 1.5, -0.667, 1.25, -0.8, \dots$; its even-numbered terms tend to $1$ and its odd-numbered terms tend to $-1$, so it diverges. A bounded sequence may diverge, but it can never be completely chaotic: some subsequence always converges.

::: theorem Bolzano–Weierstrass theorem {#thm-bw}
Every bounded sequence of real numbers has a convergent subsequence.
:::

::: proof
First we show that **every sequence has a monotone subsequence**. Call an index $m$ a *peak* if $a_m \ge a_n$ for all $n > m$ (no later term is larger).

- If there are infinitely many peaks $m_1 < m_2 < \cdots$, then $a_{m_1} \ge a_{m_2} \ge a_{m_3} \ge \cdots$ (each is a peak, so it is at least as large as every later term), and this is a decreasing subsequence.
- If there are only finitely many peaks, choose $n_1$ larger than all of them. Since $n_1$ is not a peak, there is $n_2 > n_1$ with $a_{n_2} > a_{n_1}$; since $n_2$ is not a peak, there is $n_3 > n_2$ with $a_{n_3} > a_{n_2}$; and so on. This gives a strictly increasing subsequence.

Now let $(a_n)$ be bounded. Its monotone subsequence is bounded too, so it converges by [[#thm-mct]].
:::

::: remark Cauchy sequences
A sequence is a **Cauchy sequence** if its terms become close *to each other*: for every $\eps > 0$ there is $N$ with $\abs{a_m - a_n} < \eps$ for all $m, n \ge N$. Using [[#thm-bw]] one proves that in $\R$ a sequence converges if and only if it is Cauchy ([[real-analysis/sequences]]). Like the monotone convergence theorem, this criterion proves convergence without knowing the limit, and it is the form of completeness that generalises to the metric spaces of [[real-analysis/metric-spaces]].
:::

::: history
The paradoxes of Zeno of Elea (fifth century BC) already turned on sequences: to cross a room you must first cover half of it, then half of what remains, and so on, passing through the points $\tfrac12, \tfrac34, \tfrac78, \dots$. The square-root iteration at the start of this chapter appears in the *Metrica* of Heron of Alexandria (first century AD), and the number $e$ arose in Jacob Bernoulli's study of compound interest in 1683. Augustin-Louis Cauchy based his *Cours d'analyse* (1821) on limits of sequences of values, and Bernard Bolzano's 1817 proof of the intermediate value theorem used the bisection idea behind the Bolzano–Weierstrass theorem, which Karl Weierstrass made a cornerstone of his Berlin lectures in the 1860s. The completeness of the real numbers, on which [[#thm-mct]] depends, was only put on a firm footing in 1872, when Richard Dedekind (using cuts) and Georg Cantor (using Cauchy sequences) published constructions of $\R$ from $\Q$.
:::

## Where this leads

An infinite series $a_1 + a_2 + a_3 + \cdots$ is defined as the limit of the sequence of partial sums $s_n = a_1 + \cdots + a_n$, so everything in this chapter applies at once to series ([[calculus-2/series]]); the monotone convergence theorem in particular is the engine behind the comparison and integral tests of [[calculus-2/convergence-tests]]. Recursions like Heron's are the subject of fixed-point iteration and Newton's method in [[numerical-analysis/root-finding]], where we measure *how fast* $x_n \to L$; linear recursions such as the Fibonacci rule are solved exactly in [[discrete/recurrences]]. In [[real-analysis/sequences]] the theory is completed with Cauchy sequences, $\limsup$ and $\liminf$.

::: summary
- A sequence is a function on the integers; $a_n \to L$ means that for every $\eps > 0$ all terms from some $N$ on satisfy $\abs{a_n - L} < \eps$ ([[#def-seq-limit]]). Finitely many terms never matter.
- Limits are unique, convergent sequences are bounded ([[#thm-bounded]]), and limits obey the sum, product, quotient and squeeze rules.
- If $f(x) \to L$ as $x \to \infty$ then $f(n) \to L$, so L'Hôpital's rule can be used on the function; continuous functions preserve limits of sequences.
- $r^n \to 0$ exactly when $\abs r < 1$; if $a_{n+1}/a_n \to \rho < 1$ then $a_n \to 0$; and $(\ln n)^q \ll n^p \ll a^n \ll n! \ll n^n$.
- Monotone convergence theorem: a monotone sequence converges if and only if it is bounded. It relies on the completeness of $\R$ and proves convergence without knowing the limit.
- For a recursion, prove boundedness and monotonicity by induction first, and only then solve the limit equation.
- Subsequences of a convergent sequence have the same limit; every bounded sequence has a convergent subsequence (Bolzano–Weierstrass).
:::

## Exercises

::: exercise A rational sequence {level=1 check="2"}
Find $\displaystyle\lim_{n\to\infty}\frac{4n^3 + n}{2n^3 - 7}$.
::: solution
Dividing numerator and denominator by $n^3$,

$$
\frac{4n^3 + n}{2n^3 - 7} = \frac{4 + 1/n^2}{2 - 7/n^3} \to \frac{4 + 0}{2 - 0} = 2
$$

by the limit laws, since $1/n^2 \to 0$ and $1/n^3 \to 0$.
:::
:::

::: exercise A difference of large terms {level=1 check="1/2"}
Find $\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2 + n} - n\right)$.
::: hint
Multiply and divide by the conjugate $\sqrt{n^2+n} + n$.
:::
::: solution
Both terms tend to infinity, so first rewrite:

$$
\sqrt{n^2+n} - n = \frac{(n^2 + n) - n^2}{\sqrt{n^2+n} + n} = \frac{n}{\sqrt{n^2+n} + n} = \frac{1}{\sqrt{1 + 1/n} + 1}.
$$

As $n\to\infty$, $\sqrt{1 + 1/n} \to 1$ by continuity of the square root ([[#thm-continuous-seq]]), so the limit is $\frac{1}{1+1} = \frac12$.
:::
:::

::: exercise Using the table {level=1 check="e^(-2)"}
Find $\displaystyle\lim_{n\to\infty}\left(1 - \frac2n\right)^{n}$.
::: solution
This is $(1 + x/n)^n$ with $x = -2$, so by part (b) of [[#ex-nth-root]] the limit is $e^{-2} \approx 0.1353$.
:::
:::

::: exercise An ε–N proof {level=2}
Prove from the definition that $\displaystyle\lim_{n\to\infty}\frac{3n - 1}{n + 2} = 3$.
::: hint
Show that $\abs{a_n - 3} = \dfrac{7}{n+2}$.
:::
::: solution
We compute $\dfrac{3n-1}{n+2} - 3 = \dfrac{3n - 1 - 3n - 6}{n+2} = \dfrac{-7}{n+2}$, so $\abs{a_n - 3} = \dfrac{7}{n+2} < \dfrac7n$. Let $\eps > 0$ and choose an integer $N > 7/\eps$. For $n \ge N$, $\abs{a_n - 3} < 7/n \le 7/N < \eps$.
:::
:::

::: exercise A sum inside a root {level=2 check="3"}
Find $\displaystyle\lim_{n\to\infty}\left(2^n + 3^n\right)^{1/n}$.
::: hint
Squeeze: $3^n \le 2^n + 3^n \le 2\cdot 3^n$.
:::
::: solution
Since $3^n \le 2^n + 3^n \le 3^n + 3^n = 2\cdot3^n$ and $t \mapsto t^{1/n}$ is increasing on $[0,\infty)$,

$$
3 \le \left(2^n + 3^n\right)^{1/n} \le 2^{1/n}\cdot 3 .
$$

As $2^{1/n} \to 1$ ([[#ex-nth-root]]), the squeeze theorem gives the limit $3$. In general the largest base wins.
:::
:::

::: exercise Another recursion {level=2 check="2"}
Let $a_1 = 1$ and $a_{n+1} = \dfrac{a_n^2 + 6}{5}$. Prove that $(a_n)$ converges and find its limit.
::: hint
Show by induction that $1 \le a_n < 2$, and factorise $a_{n+1} - a_n$.
:::
::: solution
*Bounds.* $a_1 = 1$. If $1 \le a_n < 2$ then $a_{n+1} = (a_n^2 + 6)/5$ satisfies $a_{n+1} \ge 7/5 > 1$ and $a_{n+1} < (4 + 6)/5 = 2$. So $1 \le a_n < 2$ for all $n$.

*Monotone.* $a_{n+1} - a_n = \dfrac{a_n^2 - 5a_n + 6}{5} = \dfrac{(a_n - 2)(a_n - 3)}{5} > 0$, because both factors are negative when $a_n < 2$. So the sequence is increasing.

*Limit.* By [[#thm-mct]] it converges to some $L \in [1, 2]$. Passing to the limit in the recursion, $5L = L^2 + 6$, so $(L-2)(L-3) = 0$. Since $L \le 2$, $L = 2$. (The terms $1, 1.4, 1.592, 1.707, 1.783, \dots$ approach $2$ slowly; the error shrinks by a factor close to $\frac45 = g'(2)$ per step, where $g(x) = (x^2+6)/5$.)
:::
:::

::: exercise Two subsequences {level=2}
Does $a_n = \dfrac{(-1)^n\, n}{n + 1}$ converge? Justify your answer.
::: solution
No. For even $n = 2k$, $a_{2k} = \dfrac{2k}{2k+1} \to 1$; for odd $n = 2k-1$, $a_{2k-1} = -\dfrac{2k-1}{2k} \to -1$. Two subsequences have different limits, so by [[#thm-subseq]] the sequence diverges, even though it is bounded.
:::
:::

::: exercise Logarithms lose to powers {level=2 #exr-log-power}
Let $p > 0$ and $q$ be real. Prove that $\dfrac{(\ln n)^q}{n^p} \to 0$.
::: hint
Write the quotient as $\left(\dfrac{\ln n}{n^{p/q}}\right)^{q}$ when $q > 0$, and use L'Hôpital's rule on $\dfrac{\ln x}{x^s}$.
:::
::: solution
If $q \le 0$ then for $n \ge 3$ we have $\ln n \ge 1$, so $(\ln n)^q \le 1$ and $0 < (\ln n)^q/n^p \le 1/n^p \to 0$. Now let $q > 0$ and put $s = p/q > 0$. By L'Hôpital's rule,

$$
\lim_{x\to\infty}\frac{\ln x}{x^s} = \lim_{x\to\infty}\frac{1/x}{s x^{s-1}} = \lim_{x\to\infty}\frac{1}{s x^s} = 0,
$$

so $b_n = \ln n / n^s \to 0$ by [[#thm-fn-seq]]. The function $t \mapsto t^q$ is continuous at $0$ (for $t \ge 0$), so by [[#thm-continuous-seq]] $(\ln n)^q/n^p = b_n^{\,q} \to 0$ (for $n \ge 2$, $b_n > 0$).
:::
:::

::: exercise Heron's method converges {level=3 #exr-heron}
Let $a > 0$, $x_0 > 0$ and $x_{n+1} = \frac12\left(x_n + \dfrac{a}{x_n}\right)$. Prove that $x_n \ge \sqrt a$ for all $n \ge 1$, that $(x_n)_{n\ge1}$ is decreasing, and that $x_n \to \sqrt a$. Show also that $x_{n+1} - \sqrt a = \dfrac{(x_n - \sqrt a)^2}{2x_n}$, and explain why the number of correct digits roughly doubles at each step.
::: solution
All terms are positive, by induction. For $n \ge 0$,

$$
x_{n+1} - \sqrt a = \frac{x_n^2 + a - 2\sqrt a\,x_n}{2x_n} = \frac{(x_n - \sqrt a)^2}{2x_n} \ge 0,
$$

so $x_n \ge \sqrt a$ for all $n \ge 1$. Then $x_{n+1} - x_n = \dfrac{a - x_n^2}{2x_n} \le 0$ for $n \ge 1$, so $(x_n)_{n \ge 1}$ is decreasing and bounded below by $\sqrt a$. By [[#thm-mct]] it converges to some $L \ge \sqrt a > 0$, and passing to the limit in $2x_{n+1}x_n = x_n^2 + a$ gives $2L^2 = L^2 + a$, so $L = \sqrt a$.

Finally, since $x_n \ge \sqrt a$ for $n \ge 1$, the identity gives $0 \le x_{n+1} - \sqrt a \le \dfrac{(x_n - \sqrt a)^2}{2\sqrt a}$: the new error is a constant times the *square* of the old one. If the error is about $10^{-k}$, the next is about $10^{-2k}$, so the number of correct digits roughly doubles. This is *quadratic convergence*, studied in [[numerical-analysis/root-finding]]; the table at the start of the chapter shows the errors $2.5\times10^{-3}$, $2.1\times10^{-6}$, $1.6\times10^{-12}$.
:::
:::

::: exercise Averages of a convergent sequence {level=3}
Suppose $a_n \to L$. Prove that the averages $m_n = \dfrac{a_1 + a_2 + \cdots + a_n}{n}$ also converge to $L$. Give an example showing that $(m_n)$ can converge although $(a_n)$ does not.
::: hint
Split the sum $\sum_{k=1}^n (a_k - L)$ at an index $K$ beyond which $\abs{a_k - L} < \eps/2$.
:::
::: solution
Let $\eps > 0$ and choose $K$ with $\abs{a_k - L} < \eps/2$ for all $k > K$. Put $C = \sum_{k=1}^{K}\abs{a_k - L}$, a fixed number. For $n > K$,

$$
\abs{m_n - L} = \abs{\frac1n\sum_{k=1}^{n}(a_k - L)} \le \frac{C}{n} + \frac1n\sum_{k=K+1}^{n}\abs{a_k - L} < \frac{C}{n} + \frac{n - K}{n}\cdot\frac{\eps}{2} < \frac Cn + \frac\eps2 .
$$

Choose $N > K$ with $N > 2C/\eps$. For $n \ge N$ we get $\abs{m_n - L} < \eps/2 + \eps/2 = \eps$, so $m_n \to L$.

For the example take $a_n = (-1)^n$, which diverges. Its partial sums are $-1, 0, -1, 0, \dots$, so $\abs{m_n} \le 1/n \to 0$: the averages converge to $0$.
:::
:::

::: exercise Fibonacci ratios and the golden ratio {level=3 check="(1+sqrt(5))/2"}
Let $F_1 = F_2 = 1$, $F_{n+2} = F_{n+1} + F_n$, and $r_n = F_{n+1}/F_n$. Show that $r_{n+1} = 1 + 1/r_n$, that $r_n \ge 1$, and that $\abs{r_{n+1} - \varphi} \le \abs{r_n - \varphi}/\varphi$, where $\varphi = \frac{1+\sqrt5}{2}$ is the positive root of $\varphi^2 = \varphi + 1$. Deduce $\lim r_n$.
::: hint
Note that $\varphi = 1 + 1/\varphi$, so $r_{n+1} - \varphi = \dfrac{1}{r_n} - \dfrac1\varphi$.
:::
::: solution
Dividing $F_{n+2} = F_{n+1} + F_n$ by $F_{n+1}$ gives $r_{n+1} = 1 + F_n/F_{n+1} = 1 + 1/r_n$. The Fibonacci numbers are positive and increasing, so $r_n \ge 1$. Since $\varphi^2 = \varphi + 1$, dividing by $\varphi$ gives $\varphi = 1 + 1/\varphi$, and therefore

$$
\abs{r_{n+1} - \varphi} = \abs{\frac{1}{r_n} - \frac{1}{\varphi}} = \frac{\abs{\varphi - r_n}}{r_n\,\varphi} \le \frac{\abs{r_n - \varphi}}{\varphi}.
$$

By induction $\abs{r_n - \varphi} \le \abs{r_1 - \varphi}\,\varphi^{-(n-1)}$, and $\varphi^{-(n-1)} \to 0$ because $0 < 1/\varphi < 1$ ([[#thm-geometric-seq]]). By the squeeze theorem $r_n \to \varphi = \frac{1+\sqrt5}{2} \approx 1.618\,034$. The ratios $1, 2, 1.5, 1.667, 1.6, 1.625, 1.615, \dots$ alternate around $\varphi$, as the identity $r_{n+1} - \varphi = (\varphi - r_n)/(r_n\varphi)$ predicts.
:::
:::
