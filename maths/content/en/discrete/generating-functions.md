In how many ways can you pay $50$p using only $1$p, $2$p and $5$p coins? You could organise a long case analysis by the number of $5$p coins, then of $2$p coins. But here is a stranger idea. Multiply out

$$
(1 + x + x^2 + x^3 + \cdots)(1 + x^2 + x^4 + \cdots)(1 + x^5 + x^{10} + \cdots)
$$

and look at the coefficient of $x^{50}$. A term $x^{a}\cdot x^{2b}\cdot x^{5c}$ contributes to it exactly when $a + 2b + 5c = 50$, that is, exactly when $a$ pennies, $b$ two-pence coins and $c$ five-pence coins pay $50$p. So the coefficient *is* the answer, and since the three series are $\frac1{1-x}$, $\frac1{1-x^2}$ and $\frac1{1-x^5}$, the whole problem is encoded in the single expression

$$
\frac{1}{(1-x)(1-x^2)(1-x^5)} = 1 + x + 2x^2 + 2x^3 + 3x^4 + 4x^5 + \dots + 146x^{50} + \cdots.
$$

This is the method of **generating functions**: package a whole sequence of numbers as the coefficients of a power series, then use algebra — multiplication, partial fractions, the binomial theorem — to do the counting. Herbert Wilf compared a generating function to a clothesline on which a sequence is hung up for display. In this chapter we develop the method and use it to count, to solve recurrences, to find a formula for the Catalan numbers, and to study partitions of integers.

## Sequences as power series

::: definition Ordinary generating function {#def-ogf}
The **(ordinary) generating function** of a sequence $(a_n)_{n\ge0}$ is the formal power series

$$
A(x) = \sum_{n=0}^{\infty} a_nx^n = a_0 + a_1x + a_2x^2 + \cdots.
$$

We write $[x^n]A(x) = a_n$ for the coefficient of $x^n$. Formal power series are added coefficientwise and multiplied like polynomials:

$$
\Bigl(\sum_n a_nx^n\Bigr)\Bigl(\sum_n b_nx^n\Bigr) = \sum_{n}c_nx^n, \qquad c_n = \sum_{k=0}^{n}a_kb_{n-k}.
$$ {#eq-convolution}
:::

The word *formal* matters. The symbol $x$ is a placeholder that keeps the terms of the sequence apart, and two series are equal exactly when all their coefficients are equal. We never substitute a number for $x$, so questions of convergence do not arise: each coefficient of a product is a finite sum, and the rules of algebra (associativity, commutativity, distributivity) hold because they hold for polynomials. The sequence $(c_n)$ in [[#eq-convolution]] is called the **convolution** of $(a_n)$ and $(b_n)$. When a series does converge for small $x$, as all our examples do, it also defines a function, and analytic facts from [[calculus-2/power-series]] may be used; but nothing in this chapter depends on them.

::: proposition Inverses of power series {#prop-inverse}
A formal power series $A(x) = \sum a_nx^n$ has a multiplicative inverse $B(x)$, with $A(x)B(x) = 1$, if and only if $a_0 \neq 0$; the inverse is then unique.
:::

::: proof
We need $\sum b_nx^n$ with $a_0b_0 = 1$ and $\sum_{k=0}^n a_kb_{n-k} = 0$ for every $n \ge 1$. If $a_0 = 0$, the first equation is impossible. If $a_0 \ne 0$, the equations can be solved one at a time and in only one way: $b_0 = 1/a_0$ and

$$
b_n = -\frac{1}{a_0}\sum_{k=1}^{n}a_kb_{n-k} \qquad (n \ge 1),
$$

which involves only $b_0, \dots, b_{n-1}$. This recursive definition produces the unique inverse.
:::

The most important example is $(1 - cx)(1 + cx + c^2x^2 + \cdots) = 1$, since all terms but the first cancel in pairs. So

$$
\frac{1}{1 - cx} = \sum_{n\ge0}c^nx^n, \qquad\text{in particular}\qquad \frac{1}{1-x} = 1 + x + x^2 + \cdots,
$$ {#eq-geometric}

as an identity of formal power series, for every constant $c$.

::: widget plot
f: 1/(1-x); sum(x^k, k, 0, N)
sliders: N=4:1:40:1
x: -1.5, 1.5
y: -4, 10
vlines: -1; 1
labels: \frac{1}{1-x}; 1 + x + \dots + x^N
caption: Increase $N$. On $-1 < x < 1$ the partial sums $1 + x + \dots + x^N$ close in on $\frac1{1-x}$, but outside that interval they run off wildly, so as *functions* the two sides of [[#eq-geometric]] agree only for $\lvert x\rvert < 1$. As *formal* power series the identity $(1-x)(1 + x + x^2 + \cdots) = 1$ holds without any condition: generating functions are about coefficients, and convergence is a bonus.
:::

Taking powers of [[#eq-geometric]] gives the second basic expansion, the negative-exponent version of the binomial theorem.

::: theorem Powers of the geometric series {#thm-negative-binomial}
For every integer $k \ge 1$,

$$
\frac{1}{(1-x)^k} = \sum_{n\ge0}\binom{n+k-1}{k-1}x^n.
$$
:::

::: proof
$\dfrac{1}{(1-x)^k}$ is the product of $k$ copies of $1 + x + x^2 + \cdots$. Multiplying out, the coefficient of $x^n$ is the number of ways to choose one term $x^{i_j}$ from each factor with $i_1 + i_2 + \dots + i_k = n$, that is, the number of solutions of this equation in non-negative integers. By stars and bars ([[discrete/advanced-counting#thm-stars-bars]]) it is $\binom{n+k-1}{k-1}$.
:::

Replacing $x$ by $cx$ (which multiplies the $n$-th coefficient by $c^n$ and respects sums and products) gives $\dfrac{1}{(1-cx)^k} = \sum_n\binom{n+k-1}{k-1}c^nx^n$. Here is a small dictionary of sequences, generating functions and operations.

| sequence $a_n$ | generating function |
|---|---|
| $1$ for all $n$ | $\dfrac{1}{1-x}$ |
| $c^n$ | $\dfrac{1}{1-cx}$ |
| $\binom{m}{n}$ ($m$ fixed) | $(1+x)^m$ |
| $\binom{n+k-1}{k-1}$ | $\dfrac{1}{(1-x)^k}$ |
| $n$ | $\dfrac{x}{(1-x)^2}$ |
| $a_{n-m}$ (zero for $n < m$): shift right | $x^mA(x)$ |
| $na_n$ | $xA'(x)$ |
| $a_0 + a_1 + \dots + a_n$ (partial sums) | $\dfrac{A(x)}{1-x}$ |

The derivative $A'(x) = \sum na_nx^{n-1}$ is defined formally, term by term. The last line follows from [[#eq-convolution]] with $b_n = 1$ for all $n$: the convolution of $(a_n)$ with the all-ones sequence is the sequence of partial sums.

::: example Summing squares with a generating function {#ex-sum-squares}
Find the generating function of $a_n = n^2$, and use it to find $\sum_{k=0}^n k^2$.
::: solution
Start from $\frac{1}{1-x} = \sum x^n$ and apply the operation "multiply the $n$-th term by $n$", which is $x\frac{d}{dx}$, twice:

$$
\sum_n nx^n = x\cdot\frac{1}{(1-x)^2} = \frac{x}{(1-x)^2}, \qquad \sum_n n^2x^n = x\frac{d}{dx}\frac{x}{(1-x)^2} = \frac{x(1+x)}{(1-x)^3}.
$$

(The derivative is $\frac{(1-x)^2 + 2x(1-x)}{(1-x)^4} = \frac{1+x}{(1-x)^3}$.) Dividing by $1 - x$ gives the partial sums:

$$
\sum_n\Bigl(\sum_{k=0}^nk^2\Bigr)x^n = \frac{x + x^2}{(1-x)^4}.
$$

By [[#thm-negative-binomial]], $[x^n]\frac{x}{(1-x)^4} = \binom{n+2}{3}$ and $[x^n]\frac{x^2}{(1-x)^4} = \binom{n+1}{3}$, so

$$
\sum_{k=0}^nk^2 = \binom{n+2}{3} + \binom{n+1}{3} = \frac{(n+2)(n+1)n + (n+1)n(n-1)}{6} = \frac{n(n+1)(2n+1)}{6}.
$$
:::
:::

::: quiz
Which sequence has generating function $\dfrac{1}{(1-2x)^2}$?
- [ ] $2^n$
- [x] $(n+1)\,2^n$
- [ ] $n\,2^n$
- [ ] $4^n$
::: solution
By [[#thm-negative-binomial]] with $k = 2$ and $x$ replaced by $2x$, the coefficient of $x^n$ is $\binom{n+1}{1}2^n = (n+1)2^n$: the terms are $1, 4, 12, 32, \dots$ Equivalently, $\frac{1}{(1-2x)^2}$ is the square of $\sum 2^nx^n$, and the convolution of $2^n$ with itself is $\sum_{k=0}^n2^k2^{n-k} = (n+1)2^n$.
:::
:::

## Counting with products

The introduction worked because multiplying generating functions corresponds to combining choices. To make this precise, suppose each object of some kind has a **size** in $\N_0$, and only finitely many objects have a given size. The generating function of the kind is $\sum_n a_nx^n$, where $a_n$ is the number of objects of size $n$.

::: proposition Product principle {#prop-product}
Let $A(x)$ count the objects of kind $\mathcal{A}$ and $B(x)$ those of kind $\mathcal{B}$ by size. Then $A(x)B(x)$ counts the pairs $(\alpha, \beta)$ with $\alpha$ of kind $\mathcal{A}$ and $\beta$ of kind $\mathcal{B}$, by total size $\operatorname{size}(\alpha) + \operatorname{size}(\beta)$. The same holds for any finite number of factors.
:::

::: proof
A pair of total size $n$ consists of an object of size $k$ and an object of size $n - k$ for some $k \in \set{0, \dots, n}$. For fixed $k$ there are $a_kb_{n-k}$ such pairs by the product rule, and by the sum rule there are $\sum_{k=0}^n a_kb_{n-k}$ pairs in all, which is the coefficient of $x^n$ in $A(x)B(x)$ by [[#eq-convolution]]. For more factors, use induction on the number of factors.
:::

In the coin problem, a way of paying is a triple (pennies, two-pence coins, five-pence coins). The pennies used are counted by $1 + x + x^2 + \cdots$ (one way to use $j$ pence worth of pennies, for every $j$), the two-pence coins by $1 + x^2 + x^4 + \cdots$, and the five-pence coins by $1 + x^5 + x^{10} + \cdots$; the product principle gives the generating function of the introduction.

::: example Paying 10p {#ex-coins}
Use the generating function to count the ways of paying $10$p with $1$p, $2$p and $5$p coins, and check by listing.
::: solution
First combine the pennies and two-pence coins: $\frac{1}{(1-x)(1-x^2)} = \sum_n\bigl(\lfloor n/2\rfloor + 1\bigr)x^n$, because an amount $n$ is paid by choosing the number $b$ of two-pence coins, $0 \le b \le \lfloor n/2\rfloor$, and making up the rest with pennies. Multiplying by $1 + x^5 + x^{10} + \cdots$, the coefficient of $x^{10}$ is

$$
\bigl(\lfloor 10/2\rfloor + 1\bigr) + \bigl(\lfloor 5/2\rfloor + 1\bigr) + \bigl(\lfloor 0/2\rfloor + 1\bigr) = 6 + 3 + 1 = 10,
$$

the three terms corresponding to zero, one and two five-pence coins. Listing confirms it: with no $5$p coin, $0$ to $5$ two-pence coins ($6$ ways); with one $5$p coin, the other $5$p is paid with $0$, $1$ or $2$ two-pence coins ($3$ ways); with two $5$p coins, $1$ way. The same computation done by computer gives $29$ ways for $20$p and $146$ for $50$p.
:::
:::

::: quiz
Which generating function counts the ways to pay $n$ pence using $1$p and $2$p coins, where the order in which coins are handed over does not matter?
- [x] $\dfrac{1}{(1-x)(1-x^2)}$
- [ ] $\dfrac{1}{1 - x - x^2}$
- [ ] $(1 + x)(1 + x^2)$
- [ ] $\dfrac{1}{(1-x)^2}$
::: solution
By the product principle, the pennies contribute $\frac{1}{1-x}$ and the two-pence coins $\frac{1}{1-x^2}$. The function $\frac{1}{1-x-x^2}$ counts *ordered* sequences of $1$s and $2$s with sum $n$ — the staircase climbs of [[discrete/recurrences]], counted by Fibonacci numbers. $(1+x)(1+x^2)$ allows at most one coin of each kind, and $\frac{1}{(1-x)^2}$ would treat a two-pence coin as worth $1$p.
:::
:::

Generating functions can also answer questions that seem to have nothing to do with algebra.

::: example Strange dice {#ex-sicherman}
Is there a pair of six-sided dice, labelled with positive integers and not both standard, whose total has the same distribution as for two standard dice?
::: solution
A die is described by the polynomial $\sum x^{\text{label}}$, summed over its six faces; by the product principle, the number of ways to roll a total $n$ with two dice is the coefficient of $x^n$ in the product of their polynomials. For standard dice the product is

$$
(x + x^2 + \dots + x^6)^2 = x^2(1+x)^2(1+x+x^2)^2(1-x+x^2)^2,
$$

using $x + \dots + x^6 = x\frac{1-x^6}{1-x} = x(1+x)(1+x+x^2)(1-x+x^2)$. We need two polynomials $P, Q$ with non-negative integer coefficients whose product is this. Since factorisation of polynomials is unique, each is $x^a(1+x)^b(1+x+x^2)^c(1-x+x^2)^d$ with exponents taken from those available. Each die has six faces, so $P(1) = 6$; since the four factors take the values $1, 2, 3, 1$ at $x = 1$, we need $2^b3^c = 6$, so $b = c = 1$ for each die. No face is labelled $0$, so $P(0) = 0$ and $a \ge 1$, hence $a = 1$ for each die. That leaves the two factors $(1 - x + x^2)$ to share out. Giving one to each die gives the standard dice; giving both to one die gives

$$
x(1+x)(1+x+x^2) = x + 2x^2 + 2x^3 + x^4, \qquad x(1+x)(1+x+x^2)(1-x+x^2)^2 = x + x^3 + x^4 + x^5 + x^6 + x^8.
$$

Both have non-negative coefficients, so the dice labelled $1, 2, 2, 3, 3, 4$ and $1, 3, 4, 5, 6, 8$ work, and they are the only alternative. These are the **Sicherman dice**.
:::
:::

## Solving recurrences

Generating functions turn a recurrence into an algebraic equation. The recipe: multiply the recurrence by $x^n$, sum over all $n$ for which it holds, rewrite each sum in terms of $A(x)$ (taking care of the initial terms), and solve for $A(x)$. Then expand by partial fractions.

::: example The Fibonacci numbers again {#ex-fib-gf}
Find the generating function $F(x) = \sum F_nx^n$ of the Fibonacci numbers ($F_0 = 0$, $F_1 = 1$, $F_n = F_{n-1} + F_{n-2}$) and deduce Binet's formula.
::: solution
Multiply the recurrence by $x^n$ and sum over $n \ge 2$:

$$
\sum_{n\ge2}F_nx^n = x\sum_{n\ge2}F_{n-1}x^{n-1} + x^2\sum_{n\ge2}F_{n-2}x^{n-2}, \quad\text{that is}\quad F(x) - F_0 - F_1x = x\bigl(F(x) - F_0\bigr) + x^2F(x).
$$

With $F_0 = 0$ and $F_1 = 1$ this says $F(x)(1 - x - x^2) = x$, so

$$
F(x) = \frac{x}{1 - x - x^2}.
$$

Now $1 - x - x^2 = (1 - \varphi x)(1 - \psi x)$, where $\varphi + \psi = 1$ and $\varphi\psi = -1$, so $\varphi, \psi = \frac{1\pm\sqrt5}{2}$. Since $\frac{1}{1-\varphi x} - \frac{1}{1 - \psi x} = \frac{(\varphi - \psi)x}{(1-\varphi x)(1 - \psi x)}$ and $\varphi - \psi = \sqrt5$,

$$
F(x) = \frac{1}{\sqrt5}\Bigl(\frac{1}{1 - \varphi x} - \frac{1}{1 - \psi x}\Bigr) = \sum_n\frac{\varphi^n - \psi^n}{\sqrt5}x^n
$$

by [[#eq-geometric]]. Comparing coefficients gives Binet's formula ([[discrete/recurrences#cor-binet]]) with no guessing at all.
:::
:::

::: example A non-homogeneous recurrence {#ex-nonhom-gf}
Solve $a_0 = 0$, $a_n = 2a_{n-1} + n$ for $n \ge 1$.
::: solution
Multiply by $x^n$ and sum over $n \ge 1$. The left side is $A(x) - a_0 = A(x)$; the first term on the right is $2xA(x)$; and $\sum_{n\ge1}nx^n = \frac{x}{(1-x)^2}$. So

$$
A(x)(1 - 2x) = \frac{x}{(1-x)^2}, \qquad A(x) = \frac{x}{(1-x)^2(1-2x)}.
$$

Partial fractions: write $\dfrac{x}{(1-x)^2(1-2x)} = \dfrac{\alpha}{1-2x} + \dfrac{\beta}{1-x} + \dfrac{\gamma}{(1-x)^2}$, that is $x = \alpha(1-x)^2 + \beta(1-x)(1-2x) + \gamma(1-2x)$. Putting $x = 1$ gives $\gamma = -1$; putting $x = \frac12$ gives $\alpha = 2$; comparing the coefficients of $x^2$ gives $0 = \alpha + 2\beta$, so $\beta = -1$. Hence, by [[#eq-geometric]] and [[#thm-negative-binomial]],

$$
a_n = 2\cdot 2^n - 1 - (n+1) = 2^{n+1} - n - 2.
$$

Check: the recurrence gives $0, 1, 4, 11, 26$, and so does the formula.
:::
:::

::: warning Keep track of the initial terms
Multiply the recurrence by $x^n$ only for the values of $n$ where it actually holds, and when you rewrite a sum such as $\sum_{n\ge2}a_{n-1}x^n$ in terms of $A(x)$, subtract the missing initial terms: it equals $x\bigl(A(x) - a_0\bigr)$, not $xA(x)$. Forgetting these terms is the most common error, and it produces a generating function with the right denominator but the wrong numerator.
:::

The examples illustrate a general fact, which also completes the proof of the repeated-root theorem of [[discrete/recurrences]].

::: theorem Linear recurrences have rational generating functions {#thm-rational}
Let $c_1, \dots, c_k$ be constants with $c_k\ne0$, and let $Q(x) = 1 - c_1x - c_2x^2 - \dots - c_kx^k$.

1. A sequence satisfies $a_n = c_1a_{n-1} + \dots + c_ka_{n-k}$ for all $n\ge k$ if and only if its generating function is $A(x) = P(x)/Q(x)$ for a polynomial $P$ of degree less than $k$.
2. If the characteristic polynomial factorises as $\chi(t) = t^k - c_1t^{k-1} - \dots - c_k = \prod_{i=1}^s(t - r_i)^{m_i}$ with distinct $r_i$, then the solutions of the recurrence are exactly the sequences $a_n = \sum_{i=1}^sP_i(n)\,r_i^n$ with $P_i$ a polynomial of degree less than $m_i$.
:::

::: proof
1. For any sequence, the coefficient of $x^n$ in $Q(x)A(x)$ is $a_n - c_1a_{n-1} - \dots - c_ka_{n-k}$ when $n \ge k$. So the recurrence holds exactly when $Q(x)A(x)$ has no terms of degree $\ge k$, that is, when $Q(x)A(x) = P(x)$ is a polynomial of degree less than $k$. As $Q$ has constant term $1$ it is invertible ([[#prop-inverse]]), and this is equivalent to $A = P/Q$.

2. Since $Q(x) = x^k\chi(1/x)$, the factorisation of $\chi$ gives $Q(x) = \prod_i(1 - r_ix)^{m_i}$, where $\sum m_i = k$ and $r_i \neq 0$. By the theory of partial fractions (as used for integration in [[calculus-1/integration-techniques]]), every $P/Q$ with $\deg P < k$ can be written uniquely as $\sum_i\sum_{j=1}^{m_i}\beta_{ij}(1 - r_ix)^{-j}$, and conversely every such sum is of the form $R/Q$ with $\deg R < k$, since $Q(x)/(1 - r_ix)^j$ is a polynomial of degree $k - j$. By [[#thm-negative-binomial]] (with $x$ replaced by $r_ix$), $[x^n](1 - r_ix)^{-j} = \binom{n+j-1}{j-1}r_i^n$, and $\binom{n+j-1}{j-1}$ is a polynomial in $n$ of degree exactly $j - 1$. As $j$ runs from $1$ to $m_i$, these polynomials span all polynomials of degree less than $m_i$. Combining with part 1, the solutions are exactly the sequences $\sum_iP_i(n)r_i^n$ with $\deg P_i < m_i$.
:::

## Catalan numbers

How many ways are there to write $n$ pairs of brackets so that they match correctly? For $n = 3$ there are five: $((()))$, $(()())$, $(())()$, $()(())$ and $()()()$.

::: definition Catalan numbers {#def-catalan}
A sequence of $n$ opening and $n$ closing brackets is **balanced** if every initial segment contains at least as many opening as closing brackets. The **Catalan number** $C_n$ is the number of balanced sequences with $n$ pairs; $C_0 = 1$ (the empty sequence).
:::

The first values are $1, 1, 2, 5, 14, 42, 132, 429, 1430, \dots$ The same numbers count many other things: binary trees with $n$ nodes, triangulations of a convex $(n+2)$-gon, lattice paths from $(0,0)$ to $(n,n)$ that never go above the diagonal, and ways to bracket a product of $n+1$ factors.

::: lemma Catalan recurrence {#lem-catalan-rec}
For $n \ge 0$, $\displaystyle C_{n+1} = \sum_{k=0}^nC_kC_{n-k}$.
:::

::: proof
Let $w$ be balanced with $n+1$ pairs, and let $d_i$ be the number of opening minus the number of closing brackets among the first $i$ symbols, so $d_i \ge 0$, $d_1 = 1$ and $d_{2n+2} = 0$. Let $j$ be the first position after $0$ with $d_j = 0$; the bracket there closes the first bracket. Then $w = (\,u\,)\,v$, where $u$ consists of the symbols strictly between positions $1$ and $j$, and $v$ of those after $j$. Within $u$ the running count is $d_i - 1 \ge 0$ (as $d_i \ge 1$ before position $j$) and returns to $0$, so $u$ is balanced, say with $k$ pairs, where $0 \le k \le n$; then $v$ is balanced with $n - k$ pairs. Conversely, for balanced $u$ and $v$ with $k$ and $n-k$ pairs, $(u)v$ is balanced and its decomposition returns exactly $u$ and $v$. So the sequences with a given $k$ are in bijection with pairs $(u, v)$, there are $C_kC_{n-k}$ of them, and the sum rule completes the proof.
:::

The recurrence says that $C(x) = \sum C_nx^n$ satisfies $C(x) = 1 + xC(x)^2$: by [[#eq-convolution]] the coefficient of $x^{n+1}$ in $xC(x)^2$ is $\sum_kC_kC_{n-k} = C_{n+1}$, and the $1$ accounts for $C_0$. To solve this quadratic equation we need square roots of power series, which come from the **binomial series**: for any real $\alpha$,

$$
(1 + y)^\alpha = \sum_{n\ge0}\binom{\alpha}{n}y^n, \qquad \binom{\alpha}{n} = \frac{\alpha(\alpha-1)\cdots(\alpha - n + 1)}{n!}.
$$

For $\alpha \in \N_0$ this is the binomial theorem; for other $\alpha$ the series is infinite. The rule $(1+y)^\alpha(1+y)^\beta = (1+y)^{\alpha+\beta}$ holds as an identity of formal power series, because comparing coefficients it says $\sum_k\binom\alpha k\binom\beta{n-k} = \binom{\alpha+\beta}{n}$, Vandermonde's identity ([[discrete/counting#thm-vandermonde]]), and both sides are polynomials in $\alpha, \beta$ that agree whenever $\alpha$ and $\beta$ are natural numbers, hence always. In particular $S(x) = \sum_n\binom{1/2}{n}(-4x)^n$ satisfies $S(x)^2 = 1 - 4x$.

::: theorem Formula for the Catalan numbers {#thm-catalan}
For every $n \ge 0$,

$$
C_n = \frac{1}{n+1}\binom{2n}{n}.
$$
:::

::: proof
From $C(x) = 1 + xC(x)^2$ we get $\bigl(1 - 2xC(x)\bigr)^2 = 1 - 4x\bigl(C(x) - xC(x)^2\bigr) = 1 - 4x$. So $T = 1 - 2xC(x)$ and $S$ are two power series with constant term $1$ and the same square. Then $(T - S)(T + S) = T^2 - S^2 = 0$, and $T + S$ has constant term $2$, so it is invertible by [[#prop-inverse]]; multiplying by its inverse gives $T = S$, that is,

$$
2xC(x) = 1 - S(x) = 1 - \sum_{n\ge0}\binom{1/2}{n}(-4)^nx^n.
$$

For $n\ge1$, $\binom{1/2}{n} = \frac{\frac12\left(-\frac12\right)\left(-\frac32\right)\cdots\left(\frac{3-2n}{2}\right)}{n!} = \frac{(-1)^{n-1}\,1\cdot3\cdots(2n-3)}{2^nn!}$, and $1\cdot 3\cdots(2n-3) = \frac{(2n-2)!}{2^{n-1}(n-1)!}$. Therefore

$$
\binom{1/2}{n}(-4)^n = -\frac{2^n(2n-2)!}{2^{n-1}(n-1)!\,n!} = -\frac2n\binom{2n-2}{n-1},
$$

and $2xC(x) = \sum_{n\ge1}\frac2n\binom{2n-2}{n-1}x^n$. Comparing the coefficients of $x^{n+1}$: $2C_n = \frac{2}{n+1}\binom{2n}{n}$.
:::

::: warning Choosing the square root
Solving $xC^2 - C + 1 = 0$ with the school formula gives $C(x) = \dfrac{1\pm\sqrt{1-4x}}{2x}$, and one must choose a sign. With the plus sign the numerator has constant term $2$, so the quotient would contain $\frac1x$ and is not a power series at all; only the minus sign gives a series with $C_0 = 1$. The proof above makes the choice automatic: $1 - 2xC(x)$ has constant term $+1$, so it must be the square root with constant term $+1$.
:::

::: widget plot
f: (1 - sqrt(1-4x))/(2x); sum(binom(2k,k)/(k+1)*x^k, k, 0, N)
sliders: N=6:1:40:1
x: -0.6, 0.25
y: 0, 2.2
vlines: -0.25; 0.25
labels: \frac{1-\sqrt{1-4x}}{2x}; \sum_{k\le N} C_kx^k
caption: The Catalan generating function and its partial sums $\sum_{k=0}^N C_kx^k$. Increase $N$: the partial sums converge only for $\lvert x\rvert \le \frac14$, and to the left of $-\frac14$ they swing ever more wildly. The radius of convergence $\frac14$ reflects the growth of the coefficients: $C_n$ is roughly $4^n/(\sqrt{\pi}\,n^{3/2})$, so $C_{n+1}/C_n \to 4$.
:::

## Integer partitions

::: definition Partitions {#def-partition}
A **partition** of $n \in \N_0$ is a way of writing $n$ as a sum of positive integers, called **parts**, where the order of the parts does not matter; we list them in decreasing order, $n = \lambda_1 + \lambda_2 + \dots + \lambda_\ell$ with $\lambda_1 \ge \dots \ge \lambda_\ell \ge 1$. The number of partitions of $n$ is $p(n)$, with $p(0) = 1$.
:::

For example $p(4) = 5$, from $4$, $3+1$, $2+2$, $2+1+1$ and $1+1+1+1$. The sequence continues

| $n$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ | $7$ | $8$ | $9$ | $10$ | $11$ | $12$ |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| $p(n)$ | $1$ | $1$ | $2$ | $3$ | $5$ | $7$ | $11$ | $15$ | $22$ | $30$ | $42$ | $56$ | $77$ |

and grows quickly: $p(100) = 190\,569\,292$. Unlike most counts in the previous chapters, $p(n)$ has no simple closed formula. Partitions are pictured by **Ferrers diagrams**, with a row of $\lambda_i$ dots for each part. Reflecting the diagram in its diagonal, so that rows become columns, gives the **conjugate** partition. Here are $12 = 5 + 3 + 3 + 1$ and its conjugate $4 + 3 + 3 + 1 + 1$:

$$
\begin{array}{lllll}
\bullet&\bullet&\bullet&\bullet&\bullet\\
\bullet&\bullet&\bullet&&\\
\bullet&\bullet&\bullet&&\\
\bullet&&&&
\end{array}
\qquad\longleftrightarrow\qquad
\begin{array}{llll}
\bullet&\bullet&\bullet&\bullet\\
\bullet&\bullet&\bullet&\\
\bullet&\bullet&\bullet&\\
\bullet&&&\\
\bullet&&&
\end{array}
$$

::: proposition Conjugation {#prop-conjugate}
For all $n$ and $k$, the number of partitions of $n$ into at most $k$ parts equals the number of partitions of $n$ with every part at most $k$.
:::

::: proof
Conjugation is a bijection from the partitions of $n$ to themselves, since conjugating twice gives back the original diagram. The number of parts of a partition is the number of rows of its diagram, which is the length of the first column, that is, the largest part of the conjugate. So conjugation maps partitions with at most $k$ parts onto partitions with largest part at most $k$.
:::

Generating functions handle partitions beautifully. A partition is determined by its **multiplicities** $m_1, m_2, \dots$, where $m_k$ is the number of parts equal to $k$, subject to $\sum_k km_k = n$.

::: theorem Generating function for partitions {#thm-partition-gf}
$$
\sum_{n\ge0}p(n)x^n = \prod_{k=1}^{\infty}\frac{1}{1-x^k} = \frac{1}{(1-x)(1-x^2)(1-x^3)\cdots}.
$$
:::

::: proof
First we explain the infinite product. For each $N$, consider the finite product $\prod_{k=1}^{N}\frac{1}{1-x^k} = \prod_{k=1}^N\bigl(1 + x^k + x^{2k} + \cdots\bigr)$. By the product principle, its coefficient of $x^n$ is the number of choices of multiplicities $m_1, \dots, m_N \ge 0$ with $m_1 + 2m_2 + \dots + Nm_N = n$, which is the number of partitions of $n$ with all parts at most $N$. For $N \ge n$ this is $p(n)$, since no part of a partition of $n$ exceeds $n$. So the coefficient of $x^n$ stops changing once $N \ge n$, the infinite product is the series with these stable coefficients, and the coefficients are $p(n)$.
:::

Restricting the factors restricts the parts: $\prod_{k \text{ odd}}\frac1{1-x^k}$ counts partitions into odd parts, and $\prod_{k}(1 + x^k)$ — each part used at most once — counts partitions into **distinct parts**. For example, here are the partitions of six of each kind:

- distinct parts: $6$, $5+1$, $4+2$, $3+2+1$ (four partitions);
- odd parts: $5+1$, $3+3$, $3+1+1+1$, $1+1+1+1+1+1$ (four partitions).

The equality is no accident.

::: theorem Euler's partition theorem {#thm-euler-partitions}
For every $n$, the number of partitions of $n$ into distinct parts equals the number of partitions of $n$ into odd parts.
:::

::: proof
Fix $N \ge n$ and work with finite products. Since $1 + x^k = \dfrac{1-x^{2k}}{1-x^k}$,

$$
\prod_{k=1}^N(1 + x^k) = \frac{(1-x^2)(1-x^4)\cdots(1-x^{2N})}{(1-x)(1-x^2)\cdots(1-x^N)}.
$$

Every factor $1 - x^{2j}$ of the denominator with $2j \le N$ cancels against the same factor in the numerator. What remains in the denominator are the factors $1 - x^k$ with $k \le N$ odd, and in the numerator the factors $1 - x^{2j}$ with $2j > N$. These numerator factors are $1$ plus terms of degree greater than $N \ge n$, so they do not affect the coefficient of $x^n$. Hence

$$
[x^n]\prod_{k=1}^N(1 + x^k) = [x^n]\prod_{\substack{k\le N\\ k \text{ odd}}}\frac{1}{1-x^k}.
$$

As in the proof of [[#thm-partition-gf]], the left side counts the partitions of $n$ into distinct parts (all at most $N$) and the right side those into odd parts, which proves the theorem.
:::

The algebra hides an explicit bijection, due to J. W. L. Glaisher. Given a partition into odd parts in which the odd number $k$ occurs $m$ times, write $m$ in binary as a sum of distinct powers of $2$, and replace the $m$ copies of $k$ by the parts $2^ek$ for the powers $2^e$ in this sum. For example $5 + 5 + 5 + 3 + 1 + 1$ becomes $10 + 5 + 3 + 2$. The new parts are distinct, because every positive integer is uniquely $2^e\times(\text{odd})$; and the process can be reversed by splitting each part $2^ek$ into $2^e$ copies of $k$.

::: quiz
Let $q(n)$ be the number of partitions of $n$ into distinct parts. Which of these products equal $\sum_n q(n)x^n$? (Select all that apply.)
- [x] $\prod_{k\ge1}(1 + x^k)$
- [x] $\prod_{k \text{ odd}}\dfrac{1}{1-x^k}$
- [ ] $\prod_{k\ge1}\dfrac{1}{1-x^k}$
- [ ] $\prod_{k\ge1}(1 + x^{2k-1})$
::: solution
The first product allows each part at most once, so it counts partitions into distinct parts directly; by Euler's theorem ([[#thm-euler-partitions]]) the second, which counts partitions into odd parts, is the same series. The third is the generating function of all partitions, $p(n)$, and the fourth counts partitions into distinct *odd* parts, which is smaller (for example $2$ has none).
:::
:::

::: remark Exponential generating functions
For labelled structures such as permutations it is better to use the **exponential generating function** $\sum_n a_n\frac{x^n}{n!}$. Products then correspond to the "binomial convolution" $\sum_k\binom nka_kb_{n-k}$, which counts ways to split a labelled set into two parts carrying the two kinds of structure. For example, a permutation of $[n]$ is a set of fixed points together with a derangement of the remaining elements, so $n! = \sum_k\binom nkD_{n-k}$. In exponential generating functions this reads $\frac{1}{1-x} = e^x D(x)$, so $D(x) = \frac{e^{-x}}{1-x}$, which gives $D_n/n! = \sum_{k\le n}(-1)^k/k!$ — the formula of [[discrete/advanced-counting#thm-derangements]] in one line.
:::

::: history
Generating functions were introduced by Abraham de Moivre in 1730 to solve linear recurrences. Leonhard Euler turned them into a tool of genius: in his *Introductio in analysin infinitorum* (1748) he studied partitions with infinite products and proved that distinct parts and odd parts give the same counts, and in a letter of 1751 to Christian Goldbach he gave the number of triangulations of a convex polygon — the Catalan numbers, which are named after Eugène Catalan, who studied bracketings in 1838. Pierre-Simon Laplace developed "generating functions" systematically in his *Théorie analytique des probabilités* (1812). In 1918 G. H. Hardy and Srinivasa Ramanujan found an asymptotic formula for $p(n)$ of astonishing accuracy, checked against Percy MacMahon's table of $p(n)$ for $n$ up to $200$.
:::

## Where this leads

Generating functions connect discrete mathematics with analysis. The location of the singularities of $A(x)$ as a function of a complex variable controls how fast $a_n$ grows — $\frac{1}{1 - x - x^2}$ has its nearest singularity at $1/\varphi$, and $F_n$ grows like $\varphi^n$ — a theme developed with the tools of [[complex-analysis/laurent-series]] and [[complex-analysis/residues]]. In probability, the generating function $\sum_n\Prob(X = n)s^n$ of a random variable turns sums of independent variables into products ([[probability/expectation]]). The theory of partitions is a branch of number theory: Ramanujan discovered that $p(5n + 4)$ is always divisible by $5$ (as in $p(4) = 5$, $p(9) = 30$, $p(14) = 135$). And the method of this chapter, matching coefficients of power series, reappears in the series solutions of differential equations ([[ode/series-solutions]]).

::: summary
- The **generating function** of $(a_n)$ is the formal power series $\sum a_nx^n$ ([[#def-ogf]]); products correspond to convolutions, and a series is invertible exactly when its constant term is non-zero.
- Key expansions: $\frac1{1-cx} = \sum c^nx^n$ and $\frac1{(1-x)^k} = \sum\binom{n+k-1}{k-1}x^n$; shifting, $x\frac{d}{dx}$ and division by $1-x$ (partial sums) translate operations on sequences.
- **Product principle**: if $A(x)$ and $B(x)$ count objects by size, $A(x)B(x)$ counts pairs by total size — coins, dice, and any choice made independently from several kinds.
- **Recurrences**: multiply by $x^n$, sum, solve for $A(x)$, expand by partial fractions. Linear recurrences with constant coefficients are exactly the sequences with rational generating functions $P/Q$, $\deg P < \deg Q$ ([[#thm-rational]]).
- **Catalan numbers** satisfy $C(x) = 1 + xC(x)^2$, and $C_n = \frac{1}{n+1}\binom{2n}{n}$ ([[#thm-catalan]]); choose the square root with constant term $1$.
- **Partitions**: $\sum p(n)x^n = \prod_k\frac1{1-x^k}$; conjugation swaps number of parts and largest part; distinct parts and odd parts are equinumerous ([[#thm-euler-partitions]]).
:::

## Exercises

::: exercise A coefficient {level=1 check="56"}
Find the coefficient of $x^5$ in $\dfrac{1}{(1-x)^4}$.
::: solution
By [[#thm-negative-binomial]] with $k = 4$ and $n = 5$: $\binom{5+3}{3} = \binom83 = 56$.
:::
:::

::: exercise Pennies and tuppences {level=1 check="10"}
Using the generating function $\frac{1}{(1-x)(1-x^2)}$, in how many ways can $18$p be paid with $1$p and $2$p coins?
::: solution
As shown in [[#ex-coins]], $[x^n]\frac{1}{(1-x)(1-x^2)} = \lfloor n/2\rfloor + 1$: choose the number of $2$p coins from $0$ to $\lfloor n/2\rfloor$, and pennies make up the rest. For $n = 18$ this is $9 + 1 = 10$.
:::
:::

::: exercise Partitions of seven {level=1 check="15"}
List the partitions of $7$ and check that $p(7) = 15$.
::: solution
By largest part: $7$; $6+1$; $5+2$, $5+1+1$; $4+3$, $4+2+1$, $4+1+1+1$; $3+3+1$, $3+2+2$, $3+2+1+1$, $3+1+1+1+1$; $2+2+2+1$, $2+2+1+1+1$, $2+1+1+1+1+1$; $1+1+1+1+1+1+1$. That is $1 + 1 + 2 + 3 + 4 + 3 + 1 = 15$.
:::
:::

::: exercise Solving a recurrence {level=2 check="2047"}
Let $a_0 = 1$, $a_1 = 3$ and $a_n = 3a_{n-1} - 2a_{n-2}$ for $n\ge2$. Find the generating function, a closed form, and $a_{10}$.
::: solution
Multiplying by $x^n$ and summing over $n\ge2$: $A(x) - 1 - 3x = 3x\bigl(A(x) - 1\bigr) - 2x^2A(x)$, so $A(x)(1 - 3x + 2x^2) = 1$ and

$$
A(x) = \frac{1}{(1-x)(1-2x)} = \frac{2}{1-2x} - \frac{1}{1-x}.
$$

(Check: $2(1-x) - (1-2x) = 1$.) Hence $a_n = 2^{n+1} - 1$ and $a_{10} = 2047$.
:::
:::

::: exercise Three dice {level=2 check="25"}
Use generating functions to find the number of ways to roll a total of $12$ with three distinguishable standard dice.
::: hint
$(x + \dots + x^6)^3 = x^3\dfrac{(1-x^6)^3}{(1-x)^3}$.
:::
::: solution
We need $[x^{12}]\,x^3(1-x^6)^3(1-x)^{-3} = [x^9](1 - 3x^6 + 3x^{12} - x^{18})\sum_n\binom{n+2}{2}x^n$. Only the first two terms of the first factor can contribute to $x^9$:

$$
\binom{11}{2} - 3\binom{5}{2} = 55 - 30 = 25.
$$

(This is inclusion–exclusion in disguise, as in [[discrete/advanced-counting#ex-dice]].)
:::
:::

::: exercise A bag of sweets {level=2 check="11"}
A bag of $n$ sweets contains toffees, mints and chocolates. The number of toffees must be a multiple of $3$, there are at most two mints, and any number of chocolates. Show that the number of possible bags is $n + 1$, and state the answer for $n = 10$.
::: solution
By the product principle the generating function is

$$
\frac{1}{1-x^3}\cdot(1 + x + x^2)\cdot\frac{1}{1-x} = \frac{1}{1-x^3}\cdot\frac{1-x^3}{1-x}\cdot\frac{1}{1-x} = \frac{1}{(1-x)^2},
$$

using $1 + x + x^2 = \frac{1-x^3}{1-x}$. Its coefficients are $n+1$, so there are $11$ bags of $10$ sweets.
:::
:::

::: exercise Catalan numbers by recurrence {level=2 check="132"}
Use [[#lem-catalan-rec]] to compute $C_4$, $C_5$ and $C_6$, and check $C_6$ against [[#thm-catalan]].
::: solution
With $C_0, \dots, C_3 = 1, 1, 2, 5$:

$$
\begin{aligned}
C_4 &= C_0C_3 + C_1C_2 + C_2C_1 + C_3C_0 = 5 + 2 + 2 + 5 = 14,\\
C_5 &= 14 + 5 + 4 + 5 + 14 = 42,\\
C_6 &= 42 + 14 + 10 + 10 + 14 + 42 = 132.
\end{aligned}
$$

The formula gives $C_6 = \frac17\binom{12}{6} = \frac{924}{7} = 132$.
:::
:::

::: exercise Distinct and odd parts of eight {level=2 check="6"}
List the partitions of $8$ into distinct parts and those into odd parts, and match them using Glaisher's bijection. How many are there of each?
::: solution
Distinct parts: $8$, $7+1$, $6+2$, $5+3$, $5+2+1$, $4+3+1$. Odd parts: $7+1$, $5+3$, $5+1+1+1$, $3+3+1+1$, $3+1+1+1+1+1$, $1+1+1+1+1+1+1+1$. Glaisher's map merges equal odd parts in binary groups:

- $7+1 \mapsto 7+1$ and $5+3\mapsto 5+3$ (no repeated parts);
- $5+1+1+1 \mapsto 5 + 2 + 1$ (three $1$s $= 2 + 1$);
- $3+3+1+1 \mapsto 6 + 2$;
- $3 + 1+1+1+1+1 \mapsto 4 + 3 + 1$ (five $1$s $= 4 + 1$);
- eight $1$s $\mapsto 8$.

There are $6$ of each, as [[#thm-euler-partitions]] predicts.
:::
:::

::: exercise A theorem of Glaisher {level=3}
Prove that the number of partitions of $n$ in which no part appears more than twice equals the number of partitions of $n$ in which no part is divisible by $3$.
::: hint
Imitate the proof of [[#thm-euler-partitions]], using $1 + x^k + x^{2k} = \dfrac{1-x^{3k}}{1-x^k}$.
:::
::: solution
Fix $N \ge n$. By the product principle, $\prod_{k=1}^N(1 + x^k + x^{2k})$ counts partitions with parts at most $N$, each used at most twice, and its coefficient of $x^n$ counts all partitions of $n$ with each part used at most twice. Now

$$
\prod_{k=1}^N(1 + x^k + x^{2k}) = \prod_{k=1}^N\frac{1 - x^{3k}}{1-x^k}.
$$

Each factor $1 - x^{3j}$ of the denominator with $3j \le N$ cancels against the same factor of the numerator. The remaining denominator factors are the $1 - x^k$ with $k \le N$ not divisible by $3$; the remaining numerator factors $1 - x^{3j}$ have $3j > N \ge n$ and do not affect the coefficient of $x^n$. So $[x^n]\prod_{k\le N}(1 + x^k + x^{2k}) = [x^n]\prod_{k \le N,\,3\nmid k}\frac{1}{1-x^k}$, and the right side counts the partitions of $n$ into parts not divisible by $3$. (For example, both counts are $7$ for $n = 6$.)
:::
:::

::: exercise The reflection principle {level=3}
A balanced bracket sequence with $n$ pairs corresponds to a lattice path from $(0,0)$ to $(2n, 0)$ with steps $(1,1)$ for "(" and $(1,-1)$ for ")" that never goes below the $x$-axis. Prove that the number of *unbalanced* sequences of $n$ opening and $n$ closing brackets is $\binom{2n}{n+1}$, and deduce again that $C_n = \frac{1}{n+1}\binom{2n}{n}$.
::: hint
An unbalanced path touches the line $y = -1$. Reflect the part of the path up to the first such touch in the line $y = -1$.
:::
::: solution
There are $\binom{2n}{n}$ sequences of $n$ opening and $n$ closing brackets in all, that is, paths from $(0,0)$ to $(2n, 0)$. A path is unbalanced exactly when it reaches height $-1$. For such a path, let $t$ be the first time it is at height $-1$, and reflect the part of the path before time $t$ in the line $y = -1$ (swap up and down steps). The new path starts at $(0, -2)$ and ends at $(2n, 0)$, so it has $n+1$ up steps and $n - 1$ down steps. Conversely, every path from $(0,-2)$ to $(2n, 0)$ must cross the line $y = -1$; reflecting its part before the first visit to $y = -1$ gives back an unbalanced path from $(0, 0)$. These maps are inverse to each other, so the unbalanced paths are equinumerous with the paths with $n+1$ up and $n-1$ down steps, of which there are $\binom{2n}{n+1}$. Hence

$$
C_n = \binom{2n}{n} - \binom{2n}{n+1} = \binom{2n}{n}\Bigl(1 - \frac{n}{n+1}\Bigr) = \frac{1}{n+1}\binom{2n}{n},
$$

using $\binom{2n}{n+1} = \binom{2n}{n}\cdot\frac{n}{n+1}$.
:::
:::
