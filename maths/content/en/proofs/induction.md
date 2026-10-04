Add up the first few odd numbers:

$$
1 = 1, \qquad 1 + 3 = 4, \qquad 1 + 3 + 5 = 9, \qquad 1 + 3 + 5 + 7 = 16, \qquad 1 + 3 + 5 + 7 + 9 = 25.
$$

The answers are the squares, and it is natural to guess that $1 + 3 + \dots + (2n - 1) = n^2$ for every $n$. But [[proofs/proof-techniques]] opened with a pattern that held for forty values of $n$ and then failed, so checking cases cannot settle the question. We need a way to prove infinitely many statements — one for each $n = 1, 2, 3, \dots$ — in a finite number of steps.

The idea is that of a line of dominoes. If the first domino falls, and if each domino knocks over the next one, then every domino falls. For the sum of odd numbers: the formula is true for $n = 1$; and *if* it is true for some $n = k$, then adding the next odd number $2k + 1$ gives $k^2 + 2k + 1 = (k+1)^2$, so it is true for $n = k+1$ as well. From $n = 1$ the truth passes to $2$, from $2$ to $3$, and so on forever.

This principle, **mathematical induction**, is the main tool for proving statements about all natural numbers, and it reaches far beyond formulas for sums: inequalities, divisibility, the correctness of algorithms and properties of anything built up step by step. In this chapter we state it carefully, meet its variants — strong induction and the well-ordering principle — and use it to reason about recursively defined sequences. Recall that $\N = \set{1, 2, 3, \dots}$ and $\N_0 = \set{0, 1, 2, \dots}$.

## The principle of induction

::: axiom Principle of mathematical induction {#thm-induction}
Let $P(n)$ be a predicate whose domain is $\N$. Suppose that

1. **(base case)** $P(1)$ is true, and
2. **(inductive step)** for every $k \in \N$, if $P(k)$ is true then $P(k+1)$ is true.

Then $P(n)$ is true for every $n \in \N$.
:::

Why should we believe this? For any *particular* $n$, say $n = 4$, the conclusion follows from the hypotheses by pure logic: $P(1)$ is given; $P(1) \Rightarrow P(2)$ gives $P(2)$ by modus ponens; then $P(3)$, then $P(4)$. But to conclude $P(n)$ for *all* $n$ at once we need something that says that every natural number is reached by starting at $1$ and repeatedly adding $1$. That is a basic property of $\N$ — part of what we mean by "the natural numbers" — and in Peano's axioms for arithmetic it appears precisely as the principle of induction. We take it as an axiom; later in the chapter we will see that it is equivalent to the well-ordering principle.

In the inductive step, the assumption "$P(k)$ is true" is called the **inductive hypothesis**. We do *not* assume that $P(k)$ holds for all $k$ — that would be assuming what we want to prove. We prove an implication: for an arbitrary $k$, *if* $P(k)$ holds, *then* so does $P(k+1)$.

A proof by induction has a fixed shape, and it is good practice to make that shape visible.

::: example The sum of the first n odd numbers {#ex-odd-sum}
Prove that for every $n \in \N$,

$$
1 + 3 + 5 + \dots + (2n - 1) = n^2.
$$
::: solution
For $n \in \N$ let $P(n)$ be the statement $\sum_{i=1}^{n} (2i - 1) = n^2$.

**Base case.** For $n = 1$ the left side is $1$ and the right side is $1^2 = 1$, so $P(1)$ is true.

**Inductive step.** Let $k \in \N$ and assume $P(k)$, that is, $\sum_{i=1}^{k}(2i-1) = k^2$. Then

$$
\sum_{i=1}^{k+1}(2i - 1) = \sum_{i=1}^{k}(2i - 1) + \bigl(2(k+1) - 1\bigr) = k^2 + 2k + 1 = (k+1)^2,
$$

where the second equality uses the inductive hypothesis. This is $P(k+1)$.

**Conclusion.** By the principle of induction, $P(n)$ holds for every $n \in \N$.
:::
:::

The key move in the inductive step was to find the case $n = k$ *inside* the case $n = k+1$: the sum up to $k+1$ is the sum up to $k$ plus one more term. Almost every induction proof contains such a moment, and looking for it is how you find the proof.

::: intuition A picture of the inductive step
Arrange $k^2$ dots in a $k\times k$ square. To enlarge it to a $(k+1)\times(k+1)$ square, add an L-shaped border of $k + 1 + k = 2k+1$ dots along two sides. So the squares are built by adding the odd numbers $1, 3, 5, \dots$ one border at a time — the inductive step is the picture of one border.
:::

### Starting somewhere else

Some statements are true only from some point on, or are naturally indexed from $0$. The base case can then be any integer $n_0$.

::: corollary Induction from any starting point {#cor-induction-n0}
Let $n_0$ be an integer and $P(n)$ a predicate on the integers $n \ge n_0$. If $P(n_0)$ is true, and for every $k \ge n_0$, $P(k)$ implies $P(k+1)$, then $P(n)$ is true for every integer $n \ge n_0$.
:::

::: proof
For $m \in \N$ let $Q(m)$ be the statement $P(m + n_0 - 1)$. Then $Q(1)$ is $P(n_0)$, which is true. If $m \in \N$ and $Q(m)$ holds, then $P(k)$ holds for $k = m + n_0 - 1 \ge n_0$, so $P(k+1)$ holds, and that is $Q(m+1)$. By [[#thm-induction]], $Q(m)$ is true for every $m \in \N$; as $m$ runs through $\N$, $n = m + n_0 - 1$ runs through all integers $n \ge n_0$.
:::

::: example An exponential beats a square {#ex-power-square}
Prove that $2^n > n^2$ for every integer $n \ge 5$.
::: solution
Let $P(n)$ be "$2^n > n^2$".

**Base case.** $2^5 = 32 > 25 = 5^2$.

**Inductive step.** Let $k \ge 5$ and assume $2^k > k^2$. Then

$$
2^{k+1} = 2\cdot 2^k > 2k^2.
$$

To finish we need $2k^2 \ge (k+1)^2$, which is equivalent to $k^2 - 2k - 1 \ge 0$, that is $(k-1)^2 \ge 2$; this holds because $k - 1 \ge 4$. Hence $2^{k+1} > 2k^2 \ge (k+1)^2$, which is $P(k+1)$.

By [[#cor-induction-n0]] with $n_0 = 5$, $2^n > n^2$ for all $n \ge 5$. The base case cannot be moved earlier: $2^4 = 4^2$ and $2^3 < 3^2$. Notice that the inductive step used $k \ge 5$ only through $(k-1)^2 \ge 2$, which already holds for $k \ge 3$; what fails for $n = 3$ and $4$ is the base case.
:::
:::

::: widget plot
f: 2^x; x^2
x: 0, 7
y: 0, 80
labels: 2^x; x^2
points: 2, 4; 4, 16
caption: The graphs of $2^x$ and $x^2$ cross at $x = 2$ and $x = 4$; between them $x^2$ is larger (for instance $3^2 = 9 > 8 = 2^3$). From $x = 4$ on, the exponential pulls away, and the inductive step explains why: each step multiplies $2^n$ by $2$, but multiplies $n^2$ only by $\bigl(\tfrac{n+1}{n}\bigr)^2$, which is less than $2$ once $n \ge 3$.
:::

::: example A divisibility statement {#ex-divisibility}
Prove that $8 \mid 9^n - 1$ for every $n \in \N_0$.
::: solution
Let $P(n)$ be "$8 \mid 9^n - 1$".

**Base case.** $9^0 - 1 = 0 = 8 \cdot 0$, so $P(0)$ holds.

**Inductive step.** Let $k \ge 0$ and assume $8 \mid 9^k - 1$, say $9^k - 1 = 8m$ with $m \in \Z$. To bring the inductive hypothesis into play, write $9^{k+1} - 1$ in terms of $9^k - 1$:

$$
9^{k+1} - 1 = 9\cdot 9^k - 1 = 9\,(9^k - 1) + 8 = 72m + 8 = 8(9m + 1).
$$

So $8 \mid 9^{k+1} - 1$. By induction (from $n_0 = 0$), $P(n)$ holds for all $n \ge 0$.
:::
:::

The next result is a workhorse of analysis; its proof is a good example of an inductive step that needs care with inequalities.

::: theorem Bernoulli's inequality {#thm-bernoulli}
For every real number $x \ge -1$ and every $n \in \N$,

$$
(1 + x)^n \ge 1 + nx.
$$
:::

::: proof
Fix $x \ge -1$ and induct on $n$. For $n = 1$ both sides equal $1 + x$. Suppose $(1 + x)^k \ge 1 + kx$ for some $k \in \N$. Since $1 + x \ge 0$, multiplying both sides of this inequality by $1 + x$ preserves it, so

$$
(1+x)^{k+1} = (1+x)^k (1+x) \ge (1 + kx)(1 + x) = 1 + (k+1)x + kx^2 \ge 1 + (k+1)x,
$$

because $kx^2 \ge 0$. This is the statement for $k + 1$, and the result follows by induction.
:::

The hypothesis $x \ge -1$ was used exactly once, to multiply an inequality by $1 + x$, and it cannot be dropped: for $x = -4$ and $n = 3$, $(1+x)^3 = -27$ is less than $1 + 3x = -11$.

::: widget plot
f: (1 + x)^n; 1 + n*x
sliders: n=3:1:8:1
x: -4, 1.5
y: -25, 15
labels: (1+x)^n; 1+nx
caption: Bernoulli's inequality says that the curve $y = (1+x)^n$ never dips below its tangent line $y = 1 + nx$ at $x = 0$, as long as $x \ge -1$. Move the slider: for even $n$ the curve stays above the line for every real $x$, but for odd $n \ge 3$ it crosses below the line somewhere to the left of $x = -1$ — the hypothesis $x \ge -1$ cannot simply be dropped.
:::

::: quiz
In the inductive step of a proof that $P(n)$ holds for all $n \in \N$, what exactly are you allowed to assume?
- [ ] That $P(n)$ is true for every $n \in \N$.
- [x] That $P(k)$ is true for one arbitrary but fixed $k \in \N$, in order to prove $P(k+1)$.
- [ ] That $P(k+1)$ is true, in order to prove $P(k)$.
- [ ] Nothing: the inductive step must be proved without assumptions.
::: solution
The inductive step proves the implication $P(k) \Rightarrow P(k+1)$ for an arbitrary $k$; to prove an implication we assume its hypothesis $P(k)$. Assuming $P(n)$ for all $n$ would be circular, and the third option proves the wrong implication (it would let truth flow downwards, not upwards).
:::
:::

## Strong induction

In ordinary induction, $P(k+1)$ is deduced from $P(k)$ alone. Sometimes $P(k+1)$ depends on an earlier case that is not the immediately preceding one — for example, factorising $n$ as $ab$ leads to the cases $a$ and $b$, which may be much smaller than $n$. Strong induction allows the inductive hypothesis to include *all* earlier cases.

::: theorem Strong induction {#thm-strong-induction}
Let $P(n)$ be a predicate on $\N$. Suppose that $P(1)$ is true, and that for every $k \in \N$,

$$
\bigl(P(1) \land P(2) \land \dots \land P(k)\bigr) \Rightarrow P(k+1).
$$

Then $P(n)$ is true for every $n \in \N$.
:::

::: proof
We apply ordinary induction to the predicate

$$
Q(n):\quad P(1) \land P(2) \land \dots \land P(n),
$$

which says that $P$ holds for every number from $1$ to $n$. $Q(1)$ is $P(1)$, which is true. Suppose $Q(k)$ holds for some $k \in \N$. Then $P(1), \dots, P(k)$ all hold, so by hypothesis $P(k+1)$ holds, and therefore $Q(k+1) = Q(k) \land P(k+1)$ holds. By [[#thm-induction]], $Q(n)$ is true for every $n$, and in particular so is $P(n)$.
:::

So strong induction is no stronger than ordinary induction — it is a consequence of it — but it is often far more convenient. As with ordinary induction, the base case may be any integer $n_0$, and there may be several base cases when the inductive step reaches back more than one place.

::: theorem Existence of prime factorisations {#thm-factorisation}
Every integer $n \ge 2$ is a product of one or more primes.
:::

::: proof
We use strong induction on $n \ge 2$. Let $P(n)$ be "$n$ is a product of primes". The base case $P(2)$ holds because $2$ is prime. Let $k \ge 2$ and assume $P(2), \dots, P(k)$; we prove $P(k+1)$.

If $k + 1$ is prime, it is a product of one prime. Otherwise $k + 1 = ab$ for some integers $a, b$ with $1 < a < k+1$ and $1 < b < k+1$, so $2 \le a, b \le k$. By the inductive hypothesis $a$ and $b$ are products of primes, and so $k + 1 = ab$ is a product of primes (the primes for $a$ followed by those for $b$). By strong induction, $P(n)$ holds for all $n \ge 2$.
:::

That this factorisation is *unique* apart from the order of the factors — the fundamental theorem of arithmetic — needs an extra idea and is proved in [[number-theory/primes]]. Notice that ordinary induction would not work here: knowing that $k$ is a product of primes says nothing about $k + 1$.

::: example Postage stamps {#ex-stamps}
Prove that every amount of $n \ge 12$ pence can be paid exactly using only $4$p and $5$p stamps.
::: solution
Let $P(n)$ be "$n = 4a + 5b$ for some $a, b \in \N_0$". The inductive step will go from $n - 4$ to $n$ by adding one $4$p stamp, so it reaches back four places and we need four base cases:

$$
12 = 4\cdot 3, \qquad 13 = 4\cdot 2 + 5, \qquad 14 = 4 + 5\cdot 2, \qquad 15 = 5\cdot 3.
$$

**Inductive step.** Let $k \ge 15$ and assume $P(12), \dots, P(k)$. Then $(k+1) - 4 = k - 3$ satisfies $12 \le k - 3 \le k$, so $k - 3 = 4a + 5b$ with $a, b \ge 0$, and $k + 1 = 4(a + 1) + 5b$. Hence $P(k+1)$.

By strong induction, $P(n)$ holds for all $n \ge 12$. The bound is sharp: $11$ cannot be paid, since $11$, $11 - 5 = 6$ and $11 - 10 = 1$ are not multiples of $4$.
:::
:::

::: quiz
You want to prove by strong induction that every integer $n \ge 8$ can be written as $3a + 5b$ with $a, b \in \N_0$, using the inductive step "$n - 3$ can be written, so add one more $3$". How many base cases must you check directly?
- [ ] $1$
- [ ] $2$
- [x] $3$
- [ ] $5$
::: solution
The step from $n - 3$ to $n$ is valid only when $n - 3 \ge 8$, that is $n \ge 11$. So $8$, $9$ and $10$ must be checked directly: $8 = 3 + 5$, $9 = 3\cdot 3$, $10 = 5\cdot 2$. Every $n \ge 11$ is then reached from one of these by adding $3$s.
:::
:::

::: warning The inductive step must work for every k
In the stamp problem, the step from $k - 3$ to $k + 1$ is only valid when $k - 3 \ge 12$, i.e. $k \ge 15$. That is why the four values $12, 13, 14, 15$ must all be checked directly. In general, look at the smallest $k$ for which your inductive step is supposed to work, and make sure every case it relies on is either a base case or already covered.
:::

## The well-ordering principle

Induction builds upwards from the smallest case. An equivalent way to say the same thing is that there is no infinite descent: every non-empty set of natural numbers has a smallest member.

::: theorem Well-ordering principle {#thm-well-ordering}
Every non-empty subset of $\N$ has a least element.
:::

::: proof
Let $S \subseteq \N$ be a set with no least element; we show that $S$ is empty, which proves the theorem by contraposition. Let $P(n)$ be the statement "$n \notin S$", and use strong induction.

*Base case.* If $1 \in S$, then $1$ would be the least element of $S$, since no natural number is smaller than $1$. So $1 \notin S$.

*Inductive step.* Suppose $1, 2, \dots, k \notin S$. If $k + 1$ were in $S$, it would be the least element of $S$, because every smaller natural number is outside $S$. So $k + 1 \notin S$.

By [[#thm-strong-induction]], $n \notin S$ for every $n \in \N$, so $S = \varnothing$.
:::

Conversely, the principle of induction can be proved from the well-ordering principle (see the exercises), so the two are logically equivalent: either can be taken as the basic axiom about $\N$. The well-ordering principle is the natural tool for proofs by **minimal counterexample**: suppose a statement fails for some natural numbers, take the *smallest* $n$ for which it fails, and derive a contradiction, typically by producing a smaller failure. We used this in [[proofs/proof-techniques]] to show that $\sqrt 2$ is irrational and that every integer $n \ge 2$ has a prime divisor.

::: example Factoring out powers of 2 {#ex-wop}
Use the well-ordering principle to prove that every $n \in \N$ can be written as $n = 2^a m$ with $a \in \N_0$ and $m$ odd.
::: solution
Suppose not. Then the set $S$ of natural numbers that cannot be written in this form is non-empty, so by [[#thm-well-ordering]] it has a least element $n$. If $n$ were odd, then $n = 2^0 n$ would be of the required form; so $n$ is even, $n = 2n'$ with $n' \in \N$ and $n' < n$. Since $n$ is the least element of $S$, $n' \notin S$, so $n' = 2^a m$ with $m$ odd. But then $n = 2^{a+1} m$, so $n \notin S$ — a contradiction. Hence $S$ is empty.
:::
:::

::: quiz
Which of these sets has a least element?
- [ ] $\set{x \in \Q : x > 0}$
- [ ] $\set{n \in \Z : n < 5}$
- [x] $\set{n \in \N : n^2 > 1000}$
- [ ] the interval $(0, 1)$
::: solution
The third set is a non-empty set of natural numbers, so by the well-ordering principle it has a least element — namely $32$, since $31^2 = 961$ and $32^2 = 1024$. The positive rationals and $(0,1)$ have no least element ($x/2$ is always smaller), and $\set{n \in \Z : n < 5}$ has no least element either: it is not a subset of $\N$, and it is unbounded below.
:::
:::

::: remark Well-ordering is special to ℕ
The well-ordering principle fails for other familiar number systems: $\Z$ has no least element, and neither does the set of positive rationals or the interval $(0, 1)$ (for any $x \in (0,1)$, the number $x/2$ is smaller). This is why induction is a method for natural numbers (or anything indexed by them), and why "take the smallest counterexample" is not available for real numbers.
:::

## Recursive definitions

Induction proves statements about every natural number; **recursion** defines objects for every natural number. The two go hand in hand.

::: definition Recursive definition {#def-recursive}
A sequence $a_0, a_1, a_2, \dots$ is **defined recursively** by specifying one or more initial terms and a rule that expresses each later term $a_{n+1}$ in terms of earlier terms $a_0, \dots, a_n$.
:::

Some important examples:

- **Factorials:** $0! = 1$ and $(n+1)! = (n+1)\cdot n!$, so $n! = 1\cdot 2\cdots n$ for $n \ge 1$.
- **Sums:** $\sum_{i=1}^{0} a_i = 0$ and $\sum_{i=1}^{n+1} a_i = \bigl(\sum_{i=1}^{n} a_i\bigr) + a_{n+1}$. This is the precise meaning of "$a_1 + a_2 + \dots + a_n$", and it is why induction is so effective for sums.
- **Fibonacci numbers:** $F_0 = 0$, $F_1 = 1$ and $F_{n+1} = F_n + F_{n-1}$ for $n \ge 1$, giving $0, 1, 1, 2, 3, 5, 8, 13, 21, \dots$.

That such a definition really defines a unique sequence is itself proved by induction (the *recursion theorem*); we take it for granted. Proofs about recursively defined sequences follow the shape of the definition: a sequence defined from the previous term invites ordinary induction, and one defined from the previous two terms invites strong induction with two base cases.

::: example A Fibonacci identity {#ex-fibonacci}
Prove that $F_1 + F_2 + \dots + F_n = F_{n+2} - 1$ for every $n \in \N$.
::: solution
**Base case.** For $n = 1$: $F_1 = 1$ and $F_3 - 1 = 2 - 1 = 1$.

**Inductive step.** Assume $\sum_{i=1}^{k} F_i = F_{k+2} - 1$ for some $k \in \N$. Then

$$
\sum_{i=1}^{k+1} F_i = \bigl(F_{k+2} - 1\bigr) + F_{k+1} = (F_{k+2} + F_{k+1}) - 1 = F_{k+3} - 1,
$$

using the recursive definition $F_{k+3} = F_{k+2} + F_{k+1}$. This is the statement for $k + 1$, so the identity holds for all $n$ by induction.
:::
:::

::: example The Tower of Hanoi {#ex-hanoi}
Three pegs hold $n$ discs of different sizes, all on the first peg in decreasing size from the bottom. A move takes the top disc from one peg and puts it on another, never on a smaller disc. Show that the least number of moves $T_n$ needed to transfer all the discs to the third peg is $2^n - 1$.
::: solution
*A recurrence.* To move the largest disc at all, the $n - 1$ smaller discs must first be stacked on the one remaining peg (the largest disc must be uncovered, and its destination must be empty), which takes at least $T_{n-1}$ moves. After the last move of the largest disc, the $n-1$ smaller discs must be moved on top of it, at least $T_{n-1}$ more moves. So $T_n \ge 2T_{n-1} + 1$. Conversely, moving the top $n - 1$ discs to the middle peg, the largest disc to the third peg, and the $n - 1$ discs back on top of it achieves this, so $T_n = 2T_{n-1} + 1$, with $T_1 = 1$.

*Solving it.* We prove $T_n = 2^n - 1$ by induction. For $n = 1$, $T_1 = 1 = 2^1 - 1$. If $T_k = 2^k - 1$, then $T_{k+1} = 2(2^k - 1) + 1 = 2^{k+1} - 1$. Hence $T_n = 2^n - 1$ for all $n$: for $64$ discs, more than $1.8 \times 10^{19}$ moves. Recurrences like this one are studied systematically in [[discrete/recurrences]].
:::
:::

::: widget sequence
a: 1/(n*(n+1))
N: 30
mode: sums
limit: 1
caption: The partial sums $S_n = \sum_{i=1}^{n} \frac{1}{i(i+1)}$ are $\tfrac12, \tfrac23, \tfrac34, \tfrac45, \dots$ — it looks as if $S_n = \frac{n}{n+1}$, which you are asked to prove by induction in the exercises. Hover over the points to test the guess, and notice how the sums creep up towards $1$ without reaching it.
:::

## When induction goes wrong

Both parts of an induction proof are essential, and both can fail in instructive ways.

**A missing base case.** Let $P(n)$ be "$n^2 + n$ is odd". If $k^2 + k$ is odd, then $(k+1)^2 + (k+1) = (k^2 + k) + 2(k+1)$ is odd plus even, hence odd: the inductive step is perfectly valid. But $P(1)$ is false ($1 + 1 = 2$), and in fact $n^2 + n = n(n+1)$ is *always* even. The dominoes are set up correctly, but none of them ever falls.

::: warning All horses are the same colour
Here is a famous fake proof. *Claim:* in any set of $n \ge 1$ horses, all have the same colour. *Base case:* one horse has the same colour as itself. *Step:* given $k + 1$ horses, remove one; the remaining $k$ have the same colour by hypothesis. Put it back and remove a different one; again the remaining $k$ have one colour. The two groups overlap, so all $k+1$ horses share a colour.

The error: the two groups of $k$ horses overlap only if $k \ge 2$. For $k = 1$ (two horses), each group is a single horse and the groups are disjoint, so nothing links their colours. The step $P(1) \Rightarrow P(2)$ fails, and with it the whole chain. An inductive step must be valid for *every* $k$ from the base case on, including the smallest.
:::

::: application Loop invariants
Induction is how programmers prove that loops do what they should. A **loop invariant** is a statement that holds before the first iteration (the base case) and is preserved by each iteration (the inductive step); by induction it holds after any number of iterations. For example, in a loop that adds up the entries of a list, the invariant "after $i$ iterations, the running total equals the sum of the first $i$ entries" shows that the final total is the sum of the whole list. Recursive programs are proved correct by strong induction on the size of the input, exactly as in [[#thm-factorisation]].
:::

::: history
Arguments resembling induction appear in the work of al-Karaji (around 1000), who used them for sums of cubes and binomial coefficients, and of Levi ben Gershon in 1321. Francesco Maurolico's *Arithmeticorum libri duo* (1575) proved that the sum of the first $n$ odd numbers is $n^2$ by passing from each case to the next, and Blaise Pascal's *Traité du triangle arithmétique* (written 1654, published 1665) stated the method clearly as a base case together with a "lemma" that each case implies the next. The name *mathematical induction* was introduced by Augustus De Morgan in 1838. Richard Dedekind (1888) and Giuseppe Peano (1889) then made induction one of the defining axioms of the natural numbers, which is the status it has today.
:::

## Where this leads

Induction is used in every branch of mathematics. In [[proofs/sets]] and [[proofs/cardinality]] it proves that a set with $n$ elements has $2^n$ subsets and underlies the theory of finite sets. Counting formulas and identities for binomial coefficients in [[discrete/counting]] are proved by induction, and [[discrete/recurrences]] solves recursive definitions like those for the Tower of Hanoi and the Fibonacci numbers in closed form. In analysis, Bernoulli's inequality and inductive arguments control sequences ([[real-analysis/sequences]]); in algebra, induction on the order of a group or the degree of a polynomial is everywhere ([[abstract-algebra/groups]], [[abstract-algebra/polynomials]]). Structural induction — on the way formulas, trees or programs are built — generalises the idea beyond numbers, as in the last exercise of [[proofs/propositional-logic]].

::: summary
- To prove $P(n)$ for all $n \ge n_0$: prove the **base case** $P(n_0)$, then the **inductive step** $P(k) \Rightarrow P(k+1)$ for an arbitrary $k \ge n_0$ ([[#thm-induction]], [[#cor-induction-n0]]).
- In the inductive step, find the case $k$ inside the case $k+1$ and use the inductive hypothesis there; never assume $P(n)$ for all $n$.
- **Strong induction** assumes $P(n_0), \dots, P(k)$ to prove $P(k+1)$ ([[#thm-strong-induction]]); it follows from ordinary induction and is used when the step reaches back further, as for prime factorisations. Steps that reach back $r$ places need $r$ base cases.
- The **well-ordering principle** — every non-empty subset of $\N$ has a least element — is equivalent to induction and justifies proofs by minimal counterexample.
- Recursive definitions (factorials, sums, Fibonacci numbers, the Tower of Hanoi) and induction go together: the proof follows the shape of the definition.
- Both parts matter: without a base case nothing starts, and an inductive step must work for every $k$, including the smallest (the "horses" fallacy).
:::

## Exercises

::: exercise The sum 1 + 2 + … + n {level=1}
Prove by induction that $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$ for every $n \in \N$.
::: solution
For $n = 1$ both sides equal $1$. Assume $\sum_{i=1}^{k} i = \frac{k(k+1)}{2}$. Then

$$
\sum_{i=1}^{k+1} i = \frac{k(k+1)}{2} + (k+1) = \frac{(k+1)(k + 2)}{2},
$$

which is the formula for $n = k+1$. By induction the formula holds for all $n \in \N$.
:::
:::

::: exercise Ten discs {level=1 check="1023"}
What is the least number of moves needed to solve the Tower of Hanoi with $10$ discs?
::: solution
By [[#ex-hanoi]], $T_{10} = 2^{10} - 1 = 1023$.
:::
:::

::: exercise Factorials grow faster {level=1}
Prove that $n! > 2^n$ for every integer $n \ge 4$.
::: solution
**Base case.** $4! = 24 > 16 = 2^4$.

**Inductive step.** Let $k \ge 4$ and assume $k! > 2^k$. Then

$$
(k+1)! = (k+1)\cdot k! > (k+1)\, 2^k \ge 2\cdot 2^k = 2^{k+1},
$$

since $k + 1 \ge 2$. By [[#cor-induction-n0]] with $n_0 = 4$, the inequality holds for all $n \ge 4$. (It fails for $n = 1, 2, 3$, so the base case cannot be moved earlier.)
:::
:::

::: exercise A divisibility proof {level=2}
Prove that $7 \mid 3^{2n+1} + 2^{n+2}$ for every $n \in \N_0$.
::: hint
Write $3^{2(k+1)+1} = 9\cdot 3^{2k+1}$ and $2^{(k+1)+2} = 2\cdot 2^{k+2}$, then add and subtract a suitable multiple of $2^{k+2}$.
:::
::: solution
For $n = 0$: $3 + 4 = 7$. Assume $7 \mid 3^{2k+1} + 2^{k+2}$. Then

$$
3^{2k+3} + 2^{k+3} = 9\cdot 3^{2k+1} + 2\cdot 2^{k+2} = 9\bigl(3^{2k+1} + 2^{k+2}\bigr) - 7\cdot 2^{k+2}.
$$

Both terms on the right are divisible by $7$, so the left side is too (by [[proofs/proof-techniques#prop-divides]]). By induction the claim holds for all $n \ge 0$.
:::
:::

::: exercise Sum of cubes {level=2}
Prove that $1^3 + 2^3 + \dots + n^3 = \left(\dfrac{n(n+1)}{2}\right)^2$ for every $n \in \N$.
::: solution
For $n = 1$ both sides are $1$. Assuming the formula for $k$,

$$
\sum_{i=1}^{k+1} i^3 = \frac{k^2(k+1)^2}{4} + (k+1)^3 = \frac{(k+1)^2\bigl(k^2 + 4k + 4\bigr)}{4} = \left(\frac{(k+1)(k+2)}{2}\right)^2,
$$

which is the formula for $k+1$. Combined with the first exercise, this shows the curious fact that $1^3 + \dots + n^3 = (1 + \dots + n)^2$.
:::
:::

::: exercise A telescoping sum {level=2 check="99/100"}
Prove by induction that $\displaystyle\sum_{i=1}^{n}\frac{1}{i(i+1)} = \frac{n}{n+1}$ for all $n \in \N$, and hence evaluate $\displaystyle\sum_{i=1}^{99}\frac{1}{i(i+1)}$.
::: solution
For $n = 1$: $\frac{1}{2} = \frac{1}{1+1}$. Assuming the formula for $k$,

$$
\sum_{i=1}^{k+1}\frac{1}{i(i+1)} = \frac{k}{k+1} + \frac{1}{(k+1)(k+2)} = \frac{k(k+2) + 1}{(k+1)(k+2)} = \frac{(k+1)^2}{(k+1)(k+2)} = \frac{k+1}{k+2}.
$$

By induction the formula holds for all $n$, and with $n = 99$ the sum is $\frac{99}{100}$. (Without induction: $\frac{1}{i(i+1)} = \frac1i - \frac{1}{i+1}$, and the sum telescopes to $1 - \frac{1}{n+1}$.)
:::
:::

::: exercise A bound on Fibonacci numbers {level=2}
Prove that $F_n < 2^n$ for every $n \in \N_0$.
::: hint
Use strong induction with two base cases, since $F_{n}$ is defined from the two previous terms.
:::
::: solution
For $n = 0$ and $n = 1$: $F_0 = 0 < 1$ and $F_1 = 1 < 2$. Let $k \ge 1$ and assume $F_j < 2^j$ for all $j \le k$. Then

$$
F_{k+1} = F_k + F_{k-1} < 2^k + 2^{k-1} < 2^k + 2^k = 2^{k+1}.
$$

By strong induction (the step from $k \ge 1$ uses the cases $k$ and $k - 1 \ge 0$, both covered), $F_n < 2^n$ for all $n \ge 0$.
:::
:::

::: exercise Binary representation {level=3}
Prove that every $n \in \N$ is a sum of distinct powers of $2$ (for example $13 = 8 + 4 + 1$).
::: hint
Let $2^a$ be the largest power of $2$ with $2^a \le n$, and apply strong induction to $n - 2^a$.
:::
::: solution
We use strong induction on $n$. For $n = 1 = 2^0$ the claim holds. Let $n \ge 2$ and assume every natural number less than $n$ is a sum of distinct powers of $2$. Let $2^a$ be the largest power of $2$ with $2^a \le n$ (it exists because $2^0 = 1 \le n$ and $2^m > n$ for large $m$). Then $n < 2^{a+1}$, so $0 \le n - 2^a < 2^a$.

If $n = 2^a$ we are done. Otherwise $1 \le n - 2^a < n$, so by the inductive hypothesis $n - 2^a$ is a sum of distinct powers of $2$. Each of these powers is at most $n - 2^a < 2^a$, so none of them equals $2^a$, and

$$
n = 2^a + (n - 2^a)
$$

is a sum of distinct powers of $2$. (Uniqueness of this representation can also be proved, by a similar induction.)
:::
:::

::: exercise Tiling with L-shapes {level=3}
An L-tromino is the shape formed by three squares of a $2\times 2$ block. Prove that for every $n \in \N$, a $2^n \times 2^n$ chessboard with any one square removed can be tiled by L-trominoes.
::: hint
Divide the $2^{k+1}\times 2^{k+1}$ board into four $2^k \times 2^k$ quarters. One of them contains the missing square; place one tromino at the centre of the board to remove one square from each of the other three.
:::
::: solution
For $n = 1$, a $2\times 2$ board with one square removed *is* an L-tromino. Assume the result for $2^k\times 2^k$ boards, and take a $2^{k+1}\times 2^{k+1}$ board with one square removed. Divide it into four $2^k\times 2^k$ quarters; the removed square lies in exactly one of them. The four quarters meet at the centre of the board, where each has one corner square. Place a single L-tromino covering the three central corner squares of the three quarters that do *not* contain the removed square. Now each of the four quarters is a $2^k\times 2^k$ board with exactly one square removed (or covered), and by the inductive hypothesis each can be tiled. Together with the central tromino this tiles the whole board, completing the induction. (Count check: $4^n - 1$ is divisible by $3$, as it must be.)
:::
:::

::: exercise Well-ordering implies induction {level=3}
Assuming the well-ordering principle, prove the principle of induction [[#thm-induction]].
::: solution
Let $P(n)$ be a predicate on $\N$ with $P(1)$ true and $P(k) \Rightarrow P(k+1)$ for all $k \in \N$. Suppose, for a contradiction, that $P(n)$ is false for some $n$. Then $S = \set{n \in \N : P(n) \text{ is false}}$ is non-empty, so by the well-ordering principle it has a least element $m$. Since $P(1)$ is true, $m \neq 1$, so $m \ge 2$ and $m - 1 \in \N$. As $m - 1 < m$ and $m$ is the least element of $S$, $m - 1 \notin S$, so $P(m-1)$ is true. By the inductive step with $k = m - 1$, $P(m)$ is true, contradicting $m \in S$. Hence $P(n)$ is true for all $n$.
:::
:::
