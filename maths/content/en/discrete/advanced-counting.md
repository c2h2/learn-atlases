Twelve guests leave their hats at a cloakroom, and the attendant, having lost the tickets, hands the hats back at random. What is the probability that *nobody* gets their own hat? With two guests it is $\tfrac12$; with three it is $\tfrac13$. As the number of guests grows, the answer settles down astonishingly fast: for twelve guests it agrees with $1/e = 0.367879\ldots$ to *nine* decimal places, and it would be no different for a thousand guests.

Problems like this one involve conditions that overlap — guest $1$ gets the wrong hat, guest $2$ gets the wrong hat, and so on — and the sum rule of [[discrete/counting]], which needs disjoint cases, cannot be applied directly. The tool for overlapping conditions is the **principle of inclusion–exclusion**, the central result of this chapter. We also meet a principle of a quite different kind, the **pigeonhole principle**, which proves that something *exists* without finding it, and the **stars and bars** method for distributing identical objects.

## The pigeonhole principle

If $13$ people are in a room, two of them were born in the same month. There is nothing to compute: there are only $12$ months, so the months cannot all be different. This simple observation is surprisingly powerful.

::: theorem Pigeonhole principle {#thm-pigeonhole}
Let $A$ and $B$ be finite sets with $\abs{A} > \abs{B}$. Then no function $f\colon A \to B$ is injective: there are distinct $a, a' \in A$ with $f(a) = f(a')$.

In words: if more than $n$ objects are placed in $n$ boxes, some box contains at least two objects.
:::

::: proof
For $b \in B$ let $A_b = \set{a \in A : f(a) = b}$, the objects in box $b$. Each $a$ lies in exactly one $A_b$, so the sets $A_b$ are pairwise disjoint with union $A$, and by the sum rule ([[discrete/counting#thm-sum-rule]])

$$
\sum_{b \in B}\abs{A_b} = \abs{A} > \abs{B}.
$$

If every $A_b$ had at most one element, the left-hand side would be at most $\sum_{b\in B} 1 = \abs{B}$. So some $A_b$ has two distinct elements $a, a'$, and $f(a) = f(a') = b$.
:::

The same counting gives more when there are many more objects than boxes. Recall that $\lceil x\rceil$, the **ceiling** of $x$, is the least integer $\ge x$.

::: theorem Generalised pigeonhole principle {#thm-gen-pigeonhole}
If $N$ objects are placed in $k$ boxes, then some box contains at least $\lceil N/k\rceil$ objects.
:::

::: proof
Suppose every box contains at most $\lceil N/k\rceil - 1$ objects. Since $\lceil N/k\rceil < N/k + 1$, every box contains fewer than $N/k$ objects, and the total number of objects is less than $k\cdot N/k = N$, a contradiction.
:::

::: quiz
What is the smallest number of people that guarantees that at least three of them were born in the same month?
- [ ] $24$
- [x] $25$
- [ ] $36$
- [ ] $37$
::: solution
With $25$ people and $12$ months, some month contains at least $\lceil 25/12\rceil = 3$ of them. With $24$ people it can fail: exactly two people born in each month. So $25$ is the smallest number that works. In general, $k(r-1) + 1$ objects in $k$ boxes force a box with $r$ objects, and $k(r-1)$ do not.
:::
:::

The art in using the principle lies in choosing the boxes.

::: example One number divides another {#ex-divides}
Let $n \ge 1$. Show that among any $n+1$ numbers chosen from $\set{1, 2, \dots, 2n}$, one divides another.
::: solution
Every positive integer can be written uniquely as $s = 2^a m$ with $a \ge 0$ and $m$ odd: divide by $2$ as often as possible. Call $m$ the **odd part** of $s$. For $s \le 2n$ the odd part is one of the $n$ numbers $1, 3, 5, \dots, 2n - 1$. These are our boxes: we have $n + 1$ numbers and $n$ possible odd parts, so by the pigeonhole principle two different chosen numbers have the same odd part, say $s = 2^a m$ and $s' = 2^b m$. As $s \ne s'$, $a \ne b$; if $a < b$ then $s' = 2^{b-a}s$, so $s$ divides $s'$.

The result is sharp: the $n$ numbers $n+1, n+2, \dots, 2n$ contain no such pair, since twice the smallest of them is already bigger than $2n$.
:::
:::

::: example Equal sums {#ex-equal-sums}
Show that from any ten distinct two-digit numbers one can choose two *disjoint* non-empty subsets with the same sum. (This was Problem 1 at the 1972 International Mathematical Olympiad.)
::: solution
Let $S$ be the set of ten numbers. It has $2^{10} = 1024$ subsets. The sum of a subset is a whole number between $0$ and the largest possible total $90 + 91 + \dots + 99 = 945$, so there are at most $946$ possible sums. As $1024 > 946$, the pigeonhole principle gives two *different* subsets $X \ne Y$ with the same sum.

They need not be disjoint, but removing the common elements $X\cap Y$ from both lowers both sums by the same amount, so $X' = X\setminus Y$ and $Y' = Y \setminus X$ are disjoint and have equal sums. Neither is empty: they cannot both be empty because $X \neq Y$, and if just one were empty, its sum $0$ would equal the sum of the other, a non-empty set of positive numbers, which is impossible.
:::
:::

Notice that the proof does not tell us *which* subsets to choose; finding them could require a search. This is typical of the pigeonhole principle, which establishes existence without construction.

A more sophisticated application concerns patterns in sequences. A **subsequence** of $a_1, a_2, \dots, a_N$ is a sequence $a_{i_1}, a_{i_2}, \dots, a_{i_r}$ with $i_1 < i_2 < \dots < i_r$; it is **increasing** if $a_{i_1} < a_{i_2} < \dots < a_{i_r}$ and **decreasing** if the inequalities are reversed.

::: theorem Erdős–Szekeres theorem {#thm-erdos-szekeres}
Every sequence of $n^2 + 1$ distinct real numbers contains an increasing subsequence of length $n + 1$ or a decreasing subsequence of length $n+1$.
:::

::: proof
Let the sequence be $a_1, \dots, a_{n^2+1}$, and for each index $i$ let $L_i$ be the length of the longest increasing subsequence that *begins* with $a_i$. If some $L_i \ge n+1$ we are done, so suppose $1 \le L_i \le n$ for every $i$. Then $n^2 + 1$ indices are sorted into $n$ boxes according to the value of $L_i$, and by [[#thm-gen-pigeonhole]] some value $\ell$ is taken by at least $\lceil (n^2+1)/n\rceil = n + 1$ indices $i_1 < i_2 < \dots < i_{n+1}$.

We claim that $a_{i_1} > a_{i_2} > \dots > a_{i_{n+1}}$, which gives a decreasing subsequence of length $n+1$. Take $i < j$ with $L_i = L_j$. If we had $a_i < a_j$, then putting $a_i$ in front of a longest increasing subsequence starting at $a_j$ would give an increasing subsequence starting at $a_i$ of length $L_j + 1$, so $L_i \ge L_j + 1$, a contradiction. Since the terms are distinct, $a_i > a_j$, as claimed.
:::

The bound is the best possible: the $9$ numbers $3, 2, 1, 6, 5, 4, 9, 8, 7$ have no increasing or decreasing subsequence of length $4$, and the same construction with $n$ blocks of $n$ works for every $n$.

## Inclusion–exclusion

For two finite sets that may overlap, adding $\abs{A}$ and $\abs{B}$ counts the elements of $A\cap B$ twice, so we subtract them once:

$$
\abs{A \cup B} = \abs{A} + \abs{B} - \abs{A \cap B}.
$$ {#eq-ie2}

(Formally: $A\cup B$ is the disjoint union of $A$ and $B\setminus A$, and $B$ is the disjoint union of $B\setminus A$ and $A\cap B$; apply the sum rule to both.) For three sets, subtracting the three pairwise intersections removes the elements in all three sets once too often, so they must be added back:

$$
\abs{A\cup B\cup C} = \abs A + \abs B + \abs C - \abs{A\cap B} - \abs{A\cap C} - \abs{B \cap C} + \abs{A\cap B\cap C}.
$$ {#eq-ie3}

::: widget venn
sets: 3
expr: A | B | C
caption: The union $A\cup B\cup C$ is shaded. Type `A & B`, then `A & B & C`, to see the overlaps that [[#eq-ie3]] subtracts and adds back. Check region by region: a point in exactly two of the sets is counted $2 - 1 = 1$ time, and a point in all three is counted $3 - 3 + 1 = 1$ time — every point of the union exactly once.
:::

::: example Divisible by 2, 3 or 5 {#ex-235}
How many integers from $1$ to $1000$ are divisible by at least one of $2$, $3$ and $5$?
::: solution
Let $A_2$, $A_3$, $A_5$ be the sets of multiples of $2$, $3$, $5$ in $[1000]$. The number of multiples of $d$ in $[1000]$ is $\lfloor 1000/d\rfloor$. A number is divisible by both $2$ and $3$ exactly when it is divisible by $6$, and similarly for the other intersections, because the primes are distinct. So

$$
\begin{aligned}
\abs{A_2\cup A_3\cup A_5} &= \lfloor\tfrac{1000}{2}\rfloor + \lfloor\tfrac{1000}{3}\rfloor + \lfloor\tfrac{1000}{5}\rfloor - \lfloor\tfrac{1000}{6}\rfloor - \lfloor\tfrac{1000}{10}\rfloor - \lfloor\tfrac{1000}{15}\rfloor + \lfloor\tfrac{1000}{30}\rfloor \\
&= 500 + 333 + 200 - 166 - 100 - 66 + 33 = 734.
\end{aligned}
$$

Consequently $1000 - 734 = 266$ of the numbers are divisible by none of $2, 3, 5$.
:::
:::

::: warning Intersections are not always products
To count the numbers in $[100]$ divisible by $4$ or $6$, the overlap consists of the numbers divisible by both, which are the multiples of $\lcm(4, 6) = 12$, not of $4\cdot 6 = 24$. The correct count is $25 + 16 - 8 = 33$; using $24$ gives the wrong answer $25 + 16 - 4 = 37$. In [[#ex-235]] the products were right only because the numbers were pairwise coprime.
:::

To state the general principle, write $A_I = \bigcap_{i\in I}A_i$ for a non-empty set of indices $I$, and use the **indicator** notation $[P]$, which is $1$ if the statement $P$ is true and $0$ if it is false.

::: theorem Inclusion–exclusion principle {#thm-inclusion-exclusion}
Let $A_1, \dots, A_n$ be subsets of a finite set $U$, and put $A_\varnothing = U$. The number of elements of $U$ lying in *none* of the $A_i$ is

$$
\abs{U \setminus (A_1\cup\dots\cup A_n)} = \sum_{I\subseteq[n]}(-1)^{\abs{I}}\abs{A_I},
$$ {#eq-ie-none}

and, equivalently,

$$
\abs{A_1\cup\dots\cup A_n} = \sum_{\varnothing\neq I\subseteq[n]}(-1)^{\abs I+1}\abs{A_I} = \sum_i\abs{A_i} - \sum_{i<j}\abs{A_i\cap A_j} + \sum_{i<j<k}\abs{A_i\cap A_j\cap A_k} - \dots
$$ {#eq-ie-union}
:::

::: proof
For $x \in U$ let $T(x) = \set{i : x\in A_i}$ be the set of indices of the sets containing $x$. Then $x \in A_I$ exactly when $I\subseteq T(x)$ (for $I = \varnothing$ this is always true). Write each $\abs{A_I}$ as a sum of indicators and exchange the order of the two finite sums:

$$
\sum_{I\subseteq[n]}(-1)^{\abs I}\abs{A_I} = \sum_{I\subseteq [n]}(-1)^{\abs I}\sum_{x\in U}\bigl[I\subseteq T(x)\bigr] = \sum_{x\in U}\ \sum_{I\subseteq T(x)}(-1)^{\abs I}.
$$

If $T(x)$ has $t$ elements, it has $\binom tj$ subsets of size $j$, so the inner sum is $\sum_{j=0}^t(-1)^j\binom tj$. By [[discrete/counting#cor-row-sums]] this is $0$ when $t \ge 1$, and it is $1$ when $t = 0$. Hence each $x$ contributes $1$ if it lies in none of the $A_i$ and $0$ otherwise, which proves [[#eq-ie-none]]. Subtracting [[#eq-ie-none]] from $\abs U = \abs{A_\varnothing}$ gives [[#eq-ie-union]].
:::

The proof shows what "inclusion–exclusion" really does: it assigns to each element the weight $\sum_j (-1)^j\binom tj$, which by the binomial theorem is $(1-1)^t$ — zero for everything in at least one set. In most applications the sizes $\abs{A_I}$ depend only on how many sets are intersected, and the formula collapses to a single sum.

::: corollary Symmetric inclusion–exclusion {#cor-symmetric}
If, in [[#thm-inclusion-exclusion]], $\abs{A_I} = N_k$ whenever $\abs{I} = k$, then the number of elements in none of the $A_i$ is

$$
\sum_{k=0}^n (-1)^k\binom nk N_k.
$$
:::

::: proof
Group the terms of [[#eq-ie-none]] by $k = \abs I$: there are $\binom nk$ sets $I$ of size $k$, and each contributes $(-1)^kN_k$.
:::

### Two applications

**Euler's function.** For $n \ge 1$, let $\varphi(n)$ be the number of integers in $[n]$ that are coprime to $n$. If $n = p_1^{e_1}\cdots p_r^{e_r}$ with distinct primes $p_i$, an integer is coprime to $n$ exactly when none of the $p_i$ divides it. Let $A_i$ be the set of multiples of $p_i$ in $[n]$. For $I \subseteq [r]$, a number is divisible by all $p_i$ with $i\in I$ exactly when it is divisible by their product $d_I$ (by unique factorisation), and $d_I$ divides $n$, so $\abs{A_I} = n/d_I$. By [[#eq-ie-none]],

$$
\varphi(n) = \sum_{I\subseteq[r]}(-1)^{\abs I}\frac{n}{d_I} = n\prod_{i=1}^r\Bigl(1 - \frac{1}{p_i}\Bigr),
$$ {#eq-phi}

because expanding the product, choosing $1$ or $-1/p_i$ from each factor, produces exactly the terms of the sum. For example $\varphi(360) = 360\cdot\frac12\cdot\frac23\cdot\frac45 = 96$. This function is central to [[number-theory/fermat-euler]].

**Surjections.** How many functions from an $m$-element set onto an $n$-element set are there?

::: proposition Counting surjections {#prop-surjections}
For $m, n \ge 1$, the number of surjective functions $[m]\to[n]$ is

$$
\sum_{k=0}^{n}(-1)^k\binom nk (n-k)^m.
$$
:::

::: proof
Let $U$ be the set of all $n^m$ functions $[m] \to [n]$ and $A_i$ the set of functions whose image misses the value $i$. A function lies in $A_I$ exactly when it takes values in $[n]\setminus I$, so $\abs{A_I} = (n - \abs I)^m$. The surjections are the functions in none of the $A_i$, and [[#cor-symmetric]] with $N_k = (n-k)^m$ gives the formula.
:::

For example, six different toys can be given to three children so that each child gets at least one in $3^6 - 3\cdot 2^6 + 3\cdot 1^6 - 0 = 540$ ways. Taking $m = n$, a surjection $[n]\to[n]$ is a permutation, so the formula yields the curious identity $\sum_k(-1)^k\binom nk(n-k)^n = n!$; and for $m < n$ there are no surjections, so the sum is $0$.

## Derangements

::: definition Derangement {#def-derangement}
A **derangement** of $[n]$ is a permutation $\sigma$ of $[n]$ with no fixed point: $\sigma(i)\neq i$ for every $i$. We write $D_n$ for the number of derangements of $[n]$, with $D_0 = 1$ (the empty permutation has no fixed point).
:::

By hand: $D_1 = 0$; $D_2 = 1$ (swap the two elements); $D_3 = 2$ (the two "rotations" $1\to2\to3\to1$ and $1\to3\to2\to1$). The hat-check problem asks for $D_n/n!$, the proportion of all permutations that are derangements.

::: theorem Counting derangements {#thm-derangements}
For every $n \ge 0$,

$$
D_n = n!\sum_{k=0}^n\frac{(-1)^k}{k!} = n!\Bigl(1 - \frac1{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots + \frac{(-1)^n}{n!}\Bigr).
$$
:::

::: proof
Let $U$ be the set of all $n!$ permutations of $[n]$ and $A_i = \set{\sigma : \sigma(i) = i}$. For $\abs I = k$, the permutations fixing every element of $I$ correspond to the permutations of the remaining $n - k$ elements, so $\abs{A_I} = (n-k)!$. The derangements are the permutations in none of the $A_i$, so by [[#cor-symmetric]]

$$
D_n = \sum_{k=0}^n(-1)^k\binom nk(n-k)! = \sum_{k=0}^n(-1)^k\frac{n!}{k!\,(n-k)!}(n-k)! = n!\sum_{k=0}^n\frac{(-1)^k}{k!}. \qquad
$$
:::

The formula gives $D_4 = 24 - 24 + 12 - 4 + 1 = 9$, $D_5 = 44$, $D_6 = 265$. It also yields the recurrence $D_n = nD_{n-1} + (-1)^n$ for $n \ge 1$: the sum for $D_n$ is the sum for $D_{n-1}$ plus the single term $(-1)^n/n!$, and multiplying by $n! = n\cdot(n-1)!$ gives $D_n = nD_{n-1} + (-1)^n$. The sum is the beginning of the exponential series $e^{-1} = \sum_{k=0}^\infty (-1)^k/k!$ (see [[calculus-2/taylor-series]]), which explains the hat-check mystery.

::: corollary Derangements and 1/e {#cor-nearest-e}
For every $n \ge 1$, $D_n$ is the integer nearest to $n!/e$. In particular $D_n/n! \to 1/e$ as $n\to\infty$.
:::

::: proof
By the theorem and the exponential series,

$$
\frac{n!}{e} - D_n = n!\sum_{k=n+1}^{\infty}\frac{(-1)^k}{k!} = \pm\Bigl(\frac{1}{n+1} - \frac{1}{(n+1)(n+2)} + \frac{1}{(n+1)(n+2)(n+3)} - \dots\Bigr).
$$

The bracket is an alternating series $t_1 - t_2 + t_3 - \dots$ with strictly decreasing positive terms tending to $0$; grouping its terms in pairs shows that its value lies strictly between $0$ and the first term $t_1 = \frac{1}{n+1}$. So $\bigl\lvert n!/e - D_n\bigr\rvert < \frac{1}{n+1} \le \frac12$, and the integer $D_n$ is the nearest integer to $n!/e$. Dividing by $n!$, $\abs{1/e - D_n/n!} < \frac{1}{(n+1)!} \to 0$.
:::

::: widget sequence
a: sum((-1)^k/fact(k), k, 0, n)
N: 12
limit: exp(-1)
epsilon: 0.01
y: 0, 0.55
caption: The probability $D_n/n!$ that a random permutation of $[n]$ has no fixed point. The values $0, \tfrac12, \tfrac13, \tfrac38, \tfrac{11}{30}, \dots$ alternate above and below $1/e \approx 0.3679$ and close in on it very quickly — the error is less than $1/(n+1)!$. Shrink $\eps$ and watch how few terms are needed to enter the band.
:::

::: example Letters and envelopes {#ex-envelopes}
Five letters are put into their five addressed envelopes at random. In how many of the $120$ ways does no letter reach the right envelope? In how many do exactly two letters reach the right envelope?
::: solution
No letter in the right envelope means the permutation is a derangement, so the first answer is

$$
D_5 = 120\Bigl(1 - 1 + \frac12 - \frac16 + \frac1{24} - \frac1{120}\Bigr) = 60 - 20 + 5 - 1 = 44,
$$

a probability of $44/120 \approx 0.367$, already close to $1/e$.

For exactly two correct letters, first choose which two are correct, $\binom52 = 10$ ways; the other three letters must then all be wrong, which is a derangement of those three: $D_3 = 2$ ways. Each such permutation arises once, so the answer is $10\cdot 2 = 20$. (Brute-force enumeration of all $120$ permutations confirms both counts.)
:::
:::

::: widget permutation
perm: 2 3 1 5 4
caption: The permutation $1\mapsto 2$, $2 \mapsto 3$, $3\mapsto 1$, $4 \mapsto 5$, $5\mapsto 4$ has no fixed point: no arrow returns to where it started, and its cycle notation $(1\,2\,3)(4\,5)$ has no cycle of length $1$. A permutation is a derangement exactly when all its cycles have length at least $2$. For $n = 4$, the $D_4 = 9$ derangements are the six $4$-cycles and the three products of two disjoint transpositions.
:::

::: quiz
A permutation of $[4]$ is chosen uniformly at random. What is the probability that it is a derangement?
- [x] $3/8$
- [ ] $1/e$
- [ ] $1/4$
- [ ] $(3/4)^4$
::: solution
$D_4 = 9$ of the $4! = 24$ permutations are derangements, so the probability is $9/24 = 3/8 = 0.375$, close to but not equal to $1/e \approx 0.368$. The answer $(3/4)^4$ would be right if the events "$i$ is not fixed" were independent, but they are not: if $1, 2, 3$ are all moved, that affects where $4$ can go.
:::
:::

## Distributing identical objects: stars and bars

In how many ways can $6$ identical sweets be shared among $4$ children? Equivalently, how many solutions does $x_1 + x_2 + x_3 + x_4 = 6$ have in non-negative integers, where $x_i$ is the number of sweets child $i$ receives? Draw the sweets as stars in a row and separate the children's shares by $3$ bars:

$$
\star\star\,\big|\,\big|\,\star\star\star\,\big|\,\star \qquad\longleftrightarrow\qquad (x_1, x_2, x_3, x_4) = (2, 0, 3, 1).
$$

Each distribution is a row of $6$ stars and $3$ bars in some order, so there are $\binom{9}{3} = 84$ distributions.

::: theorem Stars and bars {#thm-stars-bars}
Let $n \ge 0$ and $k \ge 1$ be integers.

1. The number of solutions of $x_1 + x_2 + \dots + x_k = n$ in non-negative integers is $\dbinom{n+k-1}{k-1}$.
2. If $n \ge 1$, the number of solutions in positive integers is $\dbinom{n-1}{k-1}$.
:::

::: proof
1. Send a solution $(x_1, \dots, x_k)$ to the word consisting of $x_1$ stars, a bar, $x_2$ stars, a bar, …, a bar, $x_k$ stars. It has $n$ stars and $k - 1$ bars, so length $n + k - 1$. Conversely, any word of $n$ stars and $k - 1$ bars comes from exactly one solution: $x_i$ is the number of stars between the $(i-1)$-th and the $i$-th bar (before the first bar for $i = 1$, after the last for $i = k$). This bijection shows that the solutions are counted by the words, which are determined by the positions of the $k-1$ bars among $n+k-1$ places: $\binom{n+k-1}{k-1}$.

2. The substitution $y_i = x_i - 1$ is a bijection from positive solutions of $\sum x_i = n$ to non-negative solutions of $\sum y_i = n - k$. If $n \ge k$, part 1 gives $\binom{(n-k)+k-1}{k-1} = \binom{n-1}{k-1}$. If $1 \le n < k$, there are no positive solutions, and indeed $\binom{n-1}{k-1} = 0$ since $n - 1 < k - 1$.
:::

A solution of $x_1 + \dots + x_k = n$ is the same as a **multiset** of size $n$ drawn from $k$ types — a selection in which repetition is allowed and order does not matter, $x_i$ being the number of items of type $i$. So a bakery with $4$ kinds of doughnut sells $\binom{6+3}{3} = 84$ different boxes of six. This is the fourth basic count, after sequences with and without repetition and subsets.

::: quiz
In how many ways can $8$ identical coins be shared among $3$ children so that every child gets at least one?
- [x] $\binom72 = 21$
- [ ] $\binom{10}{2} = 45$
- [ ] $3^8 = 6561$
- [ ] $\binom83 = 56$
::: solution
We need positive solutions of $x_1 + x_2 + x_3 = 8$, and part 2 of [[#thm-stars-bars]] gives $\binom{8-1}{3-1} = \binom72 = 21$. The answer $45$ also allows children to get nothing, and $3^8$ would treat the coins as distinguishable (each coin chooses a child).
:::
:::

Upper bounds on the variables are handled by inclusion–exclusion: let $A_i$ be the set of solutions violating the $i$-th bound, and count the solutions in none of the $A_i$.

::: example Rolling a total of ten {#ex-dice}
In how many ways can three distinguishable dice show a total of $10$?
::: solution
We want solutions of $x_1 + x_2 + x_3 = 10$ with $1 \le x_i \le 6$. Put $y_i = x_i - 1$: we need $y_1 + y_2 + y_3 = 7$ with $0 \le y_i\le 5$.

Without the upper bounds there are $\binom{7+2}{2} = 36$ solutions. Let $A_i$ be the set of solutions with $y_i \ge 6$. Writing $y_i = 6 + z_i$ turns these into non-negative solutions of a sum equal to $1$, so $\abs{A_i} = \binom{1+2}{2} = 3$. Two variables cannot both be $\ge 6$ when the total is $7$, so all intersections are empty. By inclusion–exclusion the number of solutions is

$$
36 - 3\cdot 3 + 0 - 0 = 27.
$$

So the probability of a total of $10$ is $27/216 = 1/8$. (Listing all $216$ outcomes by computer confirms $27$.)
:::
:::

::: warning Identical or distinguishable?
Stars and bars counts distributions of *identical* objects. If the objects are distinguishable — six different toys rather than six sweets — each object independently chooses a recipient, giving $k^n$ distributions ($4^6 = 4096$ instead of $84$). Before counting, always decide whether the objects, and the boxes, can be told apart.
:::

### A table of distributions

Many counting problems amount to placing $n$ balls into $k$ boxes. The answer depends on whether balls and boxes are distinguishable, and on whether boxes may stay empty or hold several balls. Write $S(n,k)$ for the **Stirling number of the second kind**, the number of ways to partition an $n$-element set into $k$ non-empty blocks. A surjection $[n]\to[k]$ is a partition of $[n]$ into $k$ blocks (the sets of balls sharing a box) together with an assignment of the $k$ box labels to the blocks, which can be made in $k!$ ways; so by the division rule ([[discrete/counting#lem-division]]) and [[#prop-surjections]],

$$
S(n,k) = \frac{1}{k!}\sum_{j=0}^{k}(-1)^j\binom kj(k-j)^n, \qquad\text{for example}\quad S(5,3) = \frac{150}{6} = 25.
$$

| $n$ balls into $k$ boxes | any number per box | at most one per box | at least one per box |
|---|---|---|---|
| balls distinct, boxes distinct | $k^n$ | $P(k,n)$ | $k!\,S(n,k)$ |
| balls identical, boxes distinct | $\binom{n+k-1}{k-1}$ | $\binom kn$ | $\binom{n-1}{k-1}$ |
| balls distinct, boxes identical | $S(n,1) + \dots + S(n,k)$ | $1$ if $n\le k$, else $0$ | $S(n,k)$ |
| balls identical, boxes identical | partitions of $n$ into at most $k$ parts | $1$ if $n \le k$, else $0$ | partitions of $n$ into exactly $k$ parts |

The first two rows have been proved in this chapter and [[discrete/counting]]. In the third row the boxes cannot be told apart, so a distribution is just the partition of the balls into the non-empty boxes. The last row leads to integer partitions, which have no closed formula; they are studied with generating functions in [[discrete/generating-functions]]. (This table, with its twelve entries, is known as the *twelvefold way*.)

::: history
The hat-check problem goes back to Pierre Rémond de Montmort, who in his *Essay d'analyse sur les jeux de hazard* (1708) analysed the card game *treize*, in which a player wins if some card turns up in its own position. He solved the problem in the second edition of 1713, as did Nicolaus Bernoulli at about the same time, effectively obtaining the series for $1/e$. Abraham de Moivre used the inclusion–exclusion idea in *The Doctrine of Chances* (1718), and the general principle was stated by Daniel da Silva (1854) and James Joseph Sylvester (1883). The pigeonhole principle is often called *Dirichlet's principle* (in German the *Schubfachprinzip*, or drawer principle), because Peter Gustav Lejeune Dirichlet used it in his number theory, in print from 1842; the date 1834 often quoted for it is not supported by his writings. Paul Erdős and George Szekeres proved their theorem on monotone subsequences in 1935, in a paper that helped launch Ramsey theory.
:::

## Where this leads

The pigeonhole principle is the simplest case of **Ramsey theory**, whose theme is that complete disorder is impossible: every large enough structure contains a regular substructure. The classic first example: among any six people there are three mutual acquaintances or three mutual strangers. (Fix one person $P$. By the pigeonhole principle, of the other five at least three know $P$ or at least three do not; say three know $P$. If two of these three know each other, they form a trio of acquaintances with $P$; if not, the three are mutual strangers. The opposite case is symmetric.) Five people do not suffice: seat them round a table and let each know only their two neighbours. Inclusion–exclusion is a basic tool of probability, where it computes $\Prob(A_1 \cup\dots\cup A_n)$ from the probabilities of intersections ([[probability/probability-spaces]]), and of number theory, where $\varphi(n)$ and sieve methods depend on it ([[number-theory/fermat-euler]]). The recurrences $D_n = nD_{n-1} + (-1)^n$ and $D_n = (n-1)(D_{n-1}+D_{n-2})$ are examples of the recurrence relations of [[discrete/recurrences]], and stars and bars reappears in [[discrete/generating-functions]] as the coefficients of $(1-x)^{-k}$.

::: summary
- **Pigeonhole** ([[#thm-pigeonhole]]): more than $n$ objects in $n$ boxes forces a box with two; $N$ objects in $k$ boxes force a box with $\lceil N/k\rceil$. The skill is in choosing the boxes.
- The pigeonhole principle proves existence without construction, as in the Erdős–Szekeres theorem: $n^2 + 1$ distinct numbers contain a monotone subsequence of length $n+1$.
- **Inclusion–exclusion** ([[#thm-inclusion-exclusion]]): $\abs{\bigcup A_i} = \sum\abs{A_i} - \sum\abs{A_i\cap A_j} + \dots$; each element is counted with weight $(1-1)^t$.
- When intersections of $k$ sets all have size $N_k$, the number of elements in none is $\sum_k(-1)^k\binom nkN_k$. This gives $\varphi(n) = n\prod_{p\mid n}(1 - 1/p)$ and the number of surjections $\sum_k(-1)^k\binom nk(n-k)^m$.
- **Derangements**: $D_n = n!\sum_{k=0}^n (-1)^k/k!$ is the integer nearest to $n!/e$, so a random permutation has no fixed point with probability close to $1/e$.
- **Stars and bars** ([[#thm-stars-bars]]): $x_1 + \dots + x_k = n$ has $\binom{n+k-1}{k-1}$ non-negative and $\binom{n-1}{k-1}$ positive integer solutions; upper bounds are handled by inclusion–exclusion.
- Always decide whether objects and boxes are distinguishable; the table of distributions summarises the answers.
:::

## Exercises

::: exercise Blue socks {level=1 check="14"}
A drawer contains $12$ red and $12$ blue socks. Taking socks in the dark, how many must you take to be sure of getting at least two blue socks?
::: solution
In the worst case the first $12$ socks are all red, and then the next two are blue, so $14$ socks suffice. Thirteen do not: $12$ red and $1$ blue is possible. Hence the answer is $14$. (To be sure of a matching pair of either colour, only $3$ socks are needed, by the pigeonhole principle with two boxes.)
:::
:::

::: exercise Languages {level=1 check="45"}
In a group of students, $25$ study French, $18$ German and $20$ Spanish; $8$ study French and German, $7$ French and Spanish, $6$ German and Spanish, and $3$ study all three. How many study at least one of the three languages?
::: solution
By [[#eq-ie3]], $25 + 18 + 20 - 8 - 7 - 6 + 3 = 45$.
:::
:::

::: exercise Non-negative solutions {level=1 check="455"}
How many solutions does $x_1 + x_2 + x_3 + x_4 = 12$ have in non-negative integers?
::: solution
By stars and bars with $n = 12$ and $k = 4$: $\binom{12+3}{3} = \binom{15}{3} = 455$.
:::
:::

::: exercise Avoiding 7, 11 and 13 {level=2 check="720"}
How many integers from $1$ to $1000$ are divisible by none of $7$, $11$ and $13$?
::: solution
The three primes are distinct, so intersections correspond to products. The numbers of multiples in $[1000]$ are $\lfloor 1000/7\rfloor = 142$, $\lfloor 1000/11\rfloor = 90$, $\lfloor 1000/13\rfloor = 76$, $\lfloor 1000/77\rfloor = 12$, $\lfloor 1000/91\rfloor = 10$, $\lfloor 1000/143\rfloor = 6$ and $\lfloor 1000/1001\rfloor = 0$. By [[#eq-ie-none]] the answer is

$$
1000 - 142 - 90 - 76 + 12 + 10 + 6 - 0 = 720.
$$
:::
:::

::: exercise Exactly two correct {level=2 check="135"}
Six letters are placed in six addressed envelopes at random. In how many of the $720$ ways do exactly two letters reach the right envelope?
::: solution
Choose the two correct letters in $\binom62 = 15$ ways; the remaining four must form a derangement, $D_4 = 9$ ways. The answer is $15\cdot 9 = 135$.
:::
:::

::: exercise Toys for three children {level=2 check="540"}
In how many ways can $6$ different toys be given to $3$ children so that every child receives at least one toy?
::: solution
This is the number of surjections from the set of $6$ toys onto the set of $3$ children. By [[#prop-surjections]] it is $3^6 - \binom31 2^6 + \binom32 1^6 - \binom33 0^6 = 729 - 192 + 3 - 0 = 540$.
:::
:::

::: exercise Bounded solutions {level=2 check="10"}
How many solutions does $x_1 + x_2 + x_3 = 15$ have in integers with $0 \le x_i \le 6$?
::: solution
Without upper bounds there are $\binom{17}{2} = 136$ solutions. Let $A_i$ be the set of solutions with $x_i \ge 7$; substituting $x_i = 7 + z_i$ gives a sum of $8$, so $\abs{A_i} = \binom{10}{2} = 45$. For two violations, $x_i, x_j \ge 7$ leaves a sum of $1$: $\abs{A_i\cap A_j} = \binom32 = 3$. Three violations would need a total of at least $21$, so $A_1 \cap A_2\cap A_3 = \varnothing$. Hence the count is $136 - 3\cdot 45 + 3\cdot 3 - 0 = 10$. Check by listing: the permutations of $(6,6,3)$, $(6,5,4)$ and $(5,5,5)$ number $3 + 6 + 1 = 10$.
:::
:::

::: exercise Same number of friends {level=2}
Prove that in any group of $n \ge 2$ people, two of them have the same number of friends within the group. (Friendship is mutual, and nobody is their own friend.)
::: hint
The possible numbers of friends are $0, 1, \dots, n-1$. Can $0$ and $n - 1$ both occur?
:::
::: solution
Each person has between $0$ and $n-1$ friends in the group, which gives $n$ possible values for $n$ people — not enough for the pigeonhole principle on its own. But the values $0$ and $n-1$ cannot both occur: a person with $n - 1$ friends is friends with everybody, so nobody has $0$ friends. Hence the $n$ people take at most $n - 1$ different values, and by the pigeonhole principle two of them have the same number of friends. (In the language of [[discrete/graphs]]: every simple graph with at least two vertices has two vertices of equal degree.)
:::
:::

::: exercise A sum divisible by n {level=3}
Prove that for any integers $a_1, a_2, \dots, a_n$ (with $n \ge 1$) there are indices $1 \le i \le j \le n$ such that $a_i + a_{i+1} + \dots + a_j$ is divisible by $n$.
::: hint
Look at the $n + 1$ partial sums $s_0 = 0, s_1 = a_1, s_2 = a_1 + a_2, \dots, s_n$ and their remainders on division by $n$.
:::
::: solution
Let $s_0 = 0$ and $s_k = a_1 + \dots + a_k$ for $1 \le k \le n$. These are $n+1$ integers, and each leaves one of the $n$ remainders $0, 1, \dots, n-1$ on division by $n$. By the pigeonhole principle two of them, say $s_{i-1}$ and $s_j$ with $i - 1 < j$, leave the same remainder. Then $n$ divides $s_j - s_{i-1} = a_i + a_{i+1} + \dots + a_j$, and $1 \le i \le j \le n$.
:::
:::

::: exercise A recurrence for derangements {level=3}
Give a combinatorial proof that $D_n = (n-1)\bigl(D_{n-1} + D_{n-2}\bigr)$ for $n \ge 2$.
::: hint
Let $\sigma$ be a derangement with $\sigma(n) = i$. Distinguish the cases $\sigma(i) = n$ and $\sigma(i) \neq n$.
:::
::: solution
For a derangement $\sigma$ of $[n]$, the value $i = \sigma(n)$ is one of $1, \dots, n-1$. We show that for each fixed $i$ there are exactly $D_{n-1} + D_{n-2}$ derangements with $\sigma(n) = i$; the sum rule over the $n-1$ values of $i$ then gives the formula.

*Case 1: $\sigma(i) = n$.* Then $\sigma$ swaps $i$ and $n$, and on the other $n-2$ elements it is a derangement of those elements. Conversely, any derangement of $[n]\setminus\set{i,n}$, extended by swapping $i$ and $n$, is a derangement of $[n]$ in this case. So there are $D_{n-2}$ such $\sigma$.

*Case 2: $\sigma(i)\neq n$.* Let $j = \sigma^{-1}(n)$, so $j \ne i$ and $j \ne n$. Define $\tau$ on $[n-1]$ by $\tau(j) = i$ and $\tau(x) = \sigma(x)$ for $x \neq j$: we "short-circuit" $j \to n \to i$ to $j\to i$. Then $\tau$ is a permutation of $[n-1]$, and it has no fixed point, because $\tau(j) = i \ne j$ and the other values are those of $\sigma$. Conversely, from a derangement $\tau$ of $[n-1]$ we recover $\sigma$: let $j = \tau^{-1}(i)$ (so $j \neq i$), and set $\sigma(j) = n$, $\sigma(n) = i$ and $\sigma(x) = \tau(x)$ otherwise; this $\sigma$ is a derangement with $\sigma(n) = i$ and $\sigma(i)\neq n$. The two constructions are inverse to each other, so Case 2 contains $D_{n-1}$ derangements.

Hence $D_n = (n-1)(D_{n-1} + D_{n-2})$. Check: $D_4 = 3(2 + 1) = 9$ and $D_5 = 4(9 + 2) = 44$.
:::
:::
