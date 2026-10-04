A bicycle lock has four dials, each showing a digit from $0$ to $9$. How many codes are possible? How many if no digit may be repeated? And how many if, in addition, the digits must increase from left to right, as in $2589$? The three answers are

$$
10^4 = 10\,000, \qquad 10\cdot 9\cdot 8\cdot 7 = 5040, \qquad \binom{10}{4} = 210,
$$

and they illustrate the three basic counting formulas of this chapter: sequences with repetition, sequences without repetition (**permutations**), and unordered selections (**combinations**). For the third, notice that once we know *which* four digits appear, the increasing order leaves no further choice, so we are really counting $4$-element subsets of $\set{0, 1, \dots, 9}$.

Counting is harder than it looks. It is easy to count something twice, or to miss a case, and intuition about large numbers is unreliable. So we build the subject on two simple principles, the sum rule and the product rule, prove them from the definition of the size of a finite set, and derive everything else from them: permutations, binomial coefficients, the binomial theorem and the powerful technique of proving identities by counting the same thing in two ways.

## The sum and product rules

Throughout, $\abs{A}$ denotes the number of elements of a finite set $A$. Formally, $\abs{A} = n$ means that there is a bijection $[n] \to A$, where $[n] = \set{1, 2, \dots, n}$ and $[0] = \varnothing$ (sizes of sets are studied in [[proofs/cardinality]]). Two consequences are used constantly.

- **Bijection principle.** If there is a bijection $f\colon A \to B$ (see [[proofs/functions]]), then $\abs{A} = \abs{B}$: composing a bijection $[n]\to A$ with $f$ gives a bijection $[n] \to B$. Many counting problems are solved by finding a bijection with a set that is easier to count.
- **Counting is independent of labels.** The number of ways to do something with an $n$-element set depends only on $n$, not on what the elements are.

::: theorem Sum rule {#thm-sum-rule}
If $A_1, \dots, A_k$ are finite sets that are pairwise disjoint ($A_i \cap A_j = \varnothing$ whenever $i \neq j$), then

$$
\abs{A_1 \cup A_2 \cup \dots \cup A_k} = \abs{A_1} + \abs{A_2} + \dots + \abs{A_k}.
$$
:::

::: proof
First let $k = 2$, write $A = A_1$, $B = A_2$, $\abs{A} = a$, $\abs{B} = b$, and choose bijections $f\colon [a]\to A$ and $g\colon [b] \to B$. Define $h\colon [a+b] \to A\cup B$ by

$$
h(i) = \begin{cases} f(i) & \text{if } 1 \le i \le a, \\ g(i - a) & \text{if } a < i \le a + b. \end{cases}
$$

Every element of $A$ is some $f(i) = h(i)$ and every element of $B$ is some $g(j) = h(a + j)$, so $h$ is surjective. If $h(i) = h(i')$ with $i, i' \le a$, then $f(i) = f(i')$ and so $i = i'$; similarly if $i, i' > a$. If $i \le a < i'$, then $h(i) \in A$ and $h(i') \in B$, which cannot be equal because $A \cap B = \varnothing$. So $h$ is injective, hence a bijection, and $\abs{A \cup B} = a + b$.

For general $k$ we use induction on $k$ (see [[proofs/induction]]); $k = 1$ is trivial. If $k \ge 2$, the set $A_1 \cup \dots \cup A_{k-1}$ is disjoint from $A_k$, because an element of both would lie in some $A_i \cap A_k$ with $i < k$. By the case of two sets and the induction hypothesis,

$$
\abs{A_1 \cup \dots \cup A_k} = \abs{A_1 \cup \dots \cup A_{k-1}} + \abs{A_k} = \abs{A_1} + \dots + \abs{A_{k-1}} + \abs{A_k}.
$$
:::

In words: if a task can be done in one of $k$ mutually exclusive ways, and the $i$-th way can be carried out in $n_i$ ways, then the task can be done in $n_1 + \dots + n_k$ ways. A special case is used so often that it deserves a name. If $A \subseteq U$, then $U$ is the disjoint union of $A$ and its complement $U \setminus A$, so

$$
\abs{U \setminus A} = \abs{U} - \abs{A}.
$$ {#eq-complement}

This is **complementary counting**: to count the objects with a property, count all objects and subtract those *without* it. For instance, of the $10^4$ four-digit lock codes, $5040$ have four different digits, so $10^4 - 5040 = 4960$ codes contain a repeated digit.

::: theorem Product rule {#thm-product-rule}
1. For finite sets $A_1, \dots, A_k$,
$$
\abs{A_1 \times A_2 \times \dots \times A_k} = \abs{A_1}\cdot\abs{A_2}\cdots\abs{A_k}.
$$
2. *(Sequential form.)* Suppose each object in a set $S$ is produced by a sequence of $k$ choices, different sequences of choices produce different objects, and every object arises in this way. If the first choice can be made in $n_1$ ways and, whatever the earlier choices were, the $i$-th choice can be made in $n_i$ ways, then $\abs{S} = n_1 n_2 \cdots n_k$.
:::

::: proof
1. For two sets, $A\times B$ is the union of the sets $\set{a} \times B$ for $a \in A$. These are pairwise disjoint (pairs with different first coordinates are different), and each is in bijection with $B$ via $b \mapsto (a, b)$. By the sum rule, $\abs{A \times B} = \sum_{a\in A}\abs{B} = \abs{A}\,\abs{B}$. For $k$ sets, the map $\bigl((a_1, \dots, a_{k-1}), a_k\bigr) \mapsto (a_1, \dots, a_k)$ is a bijection from $(A_1\times\dots\times A_{k-1})\times A_k$ to $A_1 \times\dots\times A_k$, so the result follows by induction on $k$.

2. Induction on $k$. If $k = 1$, the $n_1$ possible choices produce $n_1$ different objects, which are all of $S$. For $k \ge 2$, group the objects of $S$ according to the first choice. This splits $S$ into $n_1$ pairwise disjoint groups, and the objects in one group are produced by the remaining $k - 1$ choices, which satisfy the same hypotheses; by the induction hypothesis each group has $n_2\cdots n_k$ elements. The sum rule gives $\abs{S} = n_1 \cdot n_2 \cdots n_k$.
:::

The sequential form is the one used in practice. Note exactly what it requires: the *set* of options at a stage may depend on the earlier choices, but the *number* of options must not.

Two consequences are worth recording at once. A subset of $[n]$ is determined by deciding, for each element in turn, whether it is in or out — two options at each of $n$ stages — so an $n$-element set has $2^n$ subsets: $\abs{\mathcal{P}(A)} = 2^{\abs{A}}$ (power sets are introduced in [[proofs/sets]]). Similarly, a function from a $k$-element set to an $n$-element set chooses one of $n$ values for each of the $k$ inputs, so there are $n^k$ such functions. The lock in the introduction is a function $\set{\text{dial }1, \dots, \text{dial }4} \to \set{0, \dots, 9}$, hence the $10^4$ codes.

::: example Counting divisors {#ex-divisors}
How many positive divisors does $720$ have?
::: solution
Factorise: $720 = 2^4 \cdot 3^2 \cdot 5$. By unique prime factorisation (see [[number-theory/primes]]), the positive divisors of $720$ are exactly the numbers $2^a 3^b 5^c$ with

$$
0 \le a \le 4, \qquad 0 \le b \le 2, \qquad 0 \le c \le 1,
$$

and different exponent triples $(a, b, c)$ give different divisors. So the divisors are in bijection with $\set{0,\dots,4}\times\set{0,1,2}\times\set{0,1}$, and by the product rule there are $5 \cdot 3 \cdot 2 = 30$ of them. In general, $n = p_1^{e_1}\cdots p_r^{e_r}$ has $(e_1+1)(e_2+1)\cdots(e_r+1)$ positive divisors.
:::
:::

::: example Even numbers with distinct digits {#ex-even}
How many four-digit even numbers (from $1000$ to $9998$) have four different digits?
::: solution
It is natural to choose the last digit first, since it carries the evenness condition, and then the first digit, which cannot be $0$. But the number of options for the first digit depends on whether the last digit was $0$, so the product rule cannot be applied directly. We split into two disjoint cases and use the sum rule.

*Case 1: last digit $0$.* The first digit can be any of $1, \dots, 9$ (nine options), the second any of the eight digits not yet used, the third any of the remaining seven: $9 \cdot 8 \cdot 7 = 504$ numbers.

*Case 2: last digit $2, 4, 6$ or $8$* (four options). The first digit must avoid $0$ and the last digit: eight options. The second digit avoids the two digits used so far: eight options (now $0$ is allowed). The third has seven. Total $4 \cdot 8 \cdot 8 \cdot 7 = 1792$.

By the sum rule the answer is $504 + 1792 = 2296$. (A brute-force check over all four-digit numbers confirms this.)
:::
:::

::: warning Choices whose number depends on earlier choices
The tempting calculation "$5$ choices for the last digit, then $8$ for the first, $8$ for the second, $7$ for the third, so $5\cdot 8\cdot 8\cdot 7 = 2240$" is wrong: when the last digit is $0$, the first digit has $9$ options, not $8$. The product rule requires the *number* of options at each stage to be the same whatever happened before. When it is not, split into cases first, as in [[#ex-even]].
:::

::: quiz
A password is either two letters ($A$ to $Z$) or three digits ($0$ to $9$). How many passwords are there?
- [x] $26^2 + 10^3 = 1676$
- [ ] $26^2 \cdot 10^3 = 676\,000$
- [ ] $36^3 = 46\,656$
- [ ] $26 \cdot 25 + 10\cdot 9\cdot 8 = 1370$
::: solution
A password is of one type *or* the other, and the two types are disjoint, so the sum rule applies: $26^2 = 676$ letter passwords plus $10^3 = 1000$ digit passwords. The product $676\,000$ would count pairs (a letter part *and* a digit part). Repeated symbols are allowed, so there is no reason to use $26\cdot 25$.
:::
:::

## Permutations

::: definition Permutations {#def-permutation}
Let $A$ be a set with $n$ elements and let $0 \le k \le n$. A **$k$-permutation** of $A$ is a sequence $(a_1, \dots, a_k)$ of $k$ *distinct* elements of $A$. An $n$-permutation is simply called a **permutation** of $A$: a listing of all its elements in some order. We write $P(n, k)$ for the number of $k$-permutations of an $n$-element set.
:::

For example, the $2$-permutations of $\set{a, b, c}$ are $ab, ba, ac, ca, bc, cb$, so $P(3, 2) = 6$. Recall that $n! = n(n-1)\cdots 2\cdot 1$ for $n \ge 1$, and $0! = 1$.

::: theorem Counting permutations {#thm-permutations}
For $0 \le k \le n$,

$$
P(n, k) = n(n-1)(n-2)\cdots(n-k+1) = \frac{n!}{(n-k)!}.
$$

In particular, an $n$-element set has exactly $n!$ permutations.
:::

::: proof
Build $(a_1, \dots, a_k)$ one entry at a time. There are $n$ choices for $a_1$. Once $a_1, \dots, a_{i-1}$ have been chosen, they are $i - 1$ distinct elements, and $a_i$ may be any of the other $n - (i-1)$ elements. Different sequences of choices give different $k$-permutations, and every $k$-permutation arises, so by the sequential product rule $P(n,k) = n(n-1)\cdots(n-k+1)$, a product of $k$ factors. Multiplying and dividing by $(n-k)! = (n-k)(n-k-1)\cdots 1$ gives $n!/(n-k)!$. For $k = 0$ there is exactly one (empty) sequence, which agrees with $n!/n! = 1$.
:::

So gold, silver and bronze medals can be awarded to $8$ finalists in $P(8, 3) = 8 \cdot 7 \cdot 6 = 336$ ways, and a deck of $52$ cards can be shuffled into $52! \approx 8.07 \times 10^{67}$ different orders — far more orders than any number of people could ever produce by shuffling.

Many problems count *unordered* objects by first counting ordered ones and then correcting for the overcount. The principle behind this is the following.

::: lemma Division rule {#lem-division}
Let $f\colon A \to B$ be a map between finite sets such that every $b \in B$ has exactly $d \ge 1$ preimages, that is, $\abs{\set{a \in A : f(a) = b}} = d$. Then $\abs{A} = d\,\abs{B}$, so $\abs{B} = \abs{A}/d$.
:::

::: proof
Each $a \in A$ lies in exactly one of the sets $f^{-1}(\set{b}) = \set{a\in A : f(a) = b}$, namely the one with $b = f(a)$. So $A$ is the disjoint union of these $\abs{B}$ sets, each of size $d$, and the sum rule gives $\abs{A} = \sum_{b\in B} d = d\,\abs{B}$.
:::

::: proposition Circular arrangements {#prop-circular}
The number of ways to seat $n \ge 1$ people around a round table, where two seatings count as the same if one is a rotation of the other, is $(n-1)!$.
:::

::: proof
Let $A$ be the set of the $n!$ ways to arrange the people in a row, and let $f$ send a row $(a_1, \dots, a_n)$ to the circular seating obtained by placing $a_1, \dots, a_n$ clockwise around the table. A given circular seating arises from exactly $n$ rows: we may start reading clockwise at any of the $n$ people, and these give $n$ different rows because they begin with different people. By the division rule there are $n!/n = (n-1)!$ circular seatings.
:::

::: example A round table {#ex-round-table}
Six people, including Ann and Bob, sit at a round table. In how many seatings (up to rotation) do Ann and Bob sit next to each other? In how many are they apart?
::: solution
Glue Ann and Bob together into a single block. There are now $5$ units to arrange around the table, which can be done in $(5-1)! = 24$ ways by [[#prop-circular]]. Inside the block, reading clockwise, the order is either Ann–Bob or Bob–Ann. Each seating with Ann and Bob adjacent arises from exactly one arrangement of units together with one of these orders, so the product rule gives $24 \cdot 2 = 48$ seatings.

There are $(6-1)! = 120$ seatings in all, so by complementary counting [[#eq-complement]] Ann and Bob are apart in $120 - 48 = 72$ of them. (Both numbers were confirmed by listing all seatings by computer.)
:::
:::

::: remark How big is n!?
Factorials grow faster than any exponential $c^n$. A precise estimate is **Stirling's formula**

$$
n! \sim \sqrt{2\pi n}\,\Bigl(\frac{n}{e}\Bigr)^n,
$$

meaning that the ratio of the two sides tends to $1$ as $n \to \infty$; in fact the ratio is about $1 + \frac{1}{12n}$. It is proved in courses on analysis and is indispensable in probability, where factorials appear in the binomial distribution.
:::

::: widget plot
f: gamma(x+1)/(sqrt(2*pi*x)*(x/e)^x); 1 + 1/(12x)
x: 1, 20
y: 0.98, 1.1
labels: n!/(\sqrt{2\pi n}\,(n/e)^n); 1+\frac{1}{12n}
hlines: 1
points: 1, 1.0844; 5, 1.0168; 10, 1.0084
caption: The ratio of $n!$ to Stirling's approximation (the gamma function $\Gamma(x+1)$ interpolates $n!$ between integers). Hover over the marked points: the error is about $8\%$ at $n=1$, under $2\%$ at $n=5$ and under $1\%$ from $n = 9$ on. Notice how closely the curve $1 + \frac{1}{12n}$ tracks the ratio.
:::

## Combinations and binomial coefficients

::: definition Binomial coefficient {#def-binomial}
For $n, k \in \N_0$, the **binomial coefficient** $\binom{n}{k}$, read "$n$ choose $k$", is the number of $k$-element subsets of an $n$-element set. A $k$-element subset is also called a **$k$-combination**.
:::

By the bijection principle the number does not depend on which $n$-element set is used, so we may as well use $[n]$. Directly from the definition, $\binom{n}{0} = \binom{n}{n} = 1$, $\binom{n}{1} = n$, and $\binom{n}{k} = 0$ for $k > n$.

::: theorem Formula for binomial coefficients {#thm-binomial-formula}
For $0 \le k \le n$,

$$
\binom{n}{k} = \frac{n!}{k!\,(n-k)!} = \frac{n(n-1)\cdots(n-k+1)}{k!}.
$$ {#eq-binom}
:::

::: proof
We count the $k$-permutations of $[n]$ in a second way. Let $f$ send a $k$-permutation $(a_1, \dots, a_k)$ to its set of entries $\set{a_1, \dots, a_k}$, a $k$-element subset of $[n]$. Every $k$-element subset $S$ is the image of exactly $k!$ $k$-permutations, namely the $k!$ orderings of $S$ ([[#thm-permutations]] applied to $S$). By the division rule,

$$
P(n, k) = k!\,\binom{n}{k}, \qquad\text{so}\qquad \binom{n}{k} = \frac{P(n,k)}{k!} = \frac{n!}{k!\,(n-k)!}. \qquad
$$
:::

The formula makes the **symmetry** $\binom{n}{k} = \binom{n}{n-k}$ evident, but a bijective explanation is better: sending a subset $S \subseteq [n]$ to its complement $[n]\setminus S$ is a bijection from $k$-element subsets to $(n-k)$-element subsets. Choosing the $k$ people who go on an outing is the same as choosing the $n - k$ who stay at home.

::: intuition Ordered versus unordered
The proof of [[#thm-binomial-formula]] is the model for most counting with combinations: *count ordered selections, then divide by the number of orders that describe the same unordered selection.* Before writing down any formula, ask: does the order of the chosen objects matter in the thing I am counting? If not, have I made sure each object is counted once?
:::

::: example Two pairs in poker {#ex-poker}
A poker hand is a $5$-card subset of a standard $52$-card deck ($13$ ranks, $4$ suits). How many hands are "two pair": two cards of one rank, two cards of a second rank, and a fifth card of a third rank?
::: solution
There are $\binom{52}{5} = 2\,598\,960$ hands in all. To build a two-pair hand:

1. choose the two ranks that form the pairs, as a *set*: $\binom{13}{2} = 78$ ways;
2. choose two suits for the lower pair and two for the higher pair: $\binom42\binom42 = 36$ ways;
3. choose the fifth card from the $44$ cards whose rank is neither of the two: $44$ ways.

Each two-pair hand arises from exactly one such sequence of choices, so there are $78 \cdot 36 \cdot 44 = 123\,552$ two-pair hands, about $4.75\%$ of all hands.
:::
:::

::: warning Counting the same object twice
A common wrong answer to [[#ex-poker]] is $13\binom42\cdot 12\binom42 \cdot 44 = 247\,104$: "choose the rank of the first pair, then of the second pair". But the hand K♠ K♥ 7♦ 7♣ 2♠ is produced twice — kings first, or sevens first — because the two pairs play the same role in the hand. The answer is exactly double the truth. Whenever two parts of a construction are interchangeable, choose them together as a set.
:::

::: example Lattice paths {#ex-lattice}
A path in the grid moves from $(0, 0)$ to $(5, 3)$ by unit steps, each either right $(1,0)$ or up $(0,1)$. How many such paths are there?
::: solution
Every path consists of exactly $5$ right steps and $3$ up steps, $8$ steps in all, so it is recorded by a word of length $8$ in the letters R and U with three U's — for example RRURRUUR. Conversely, every such word describes a path. The word is determined by the set of positions (among $1, \dots, 8$) holding a U, and every $3$-element subset of $[8]$ occurs. So the paths are in bijection with the $3$-element subsets of $[8]$, and there are $\binom{8}{3} = 56$ of them. In general there are $\binom{m+n}{n}$ paths from $(0,0)$ to $(m, n)$.
:::
:::

::: quiz
A committee of $3$ is chosen from $10$ people, and then one of the three is made chair. How many outcomes are possible?
- [ ] $\binom{10}{3} = 120$
- [x] $3\binom{10}{3} = 360$
- [ ] $P(10, 3) = 720$
- [ ] $10^3 = 1000$
::: solution
Choose the committee ($120$ ways) and then its chair ($3$ ways): $360$. Counting the other way round gives the same answer: choose the chair ($10$ ways) and then the two ordinary members from the remaining nine, $\binom92 = 36$ ways, so $10 \cdot 36 = 360$. The number $720$ would count committees with a chair, a secretary and a treasurer, where all three roles are different.
:::
:::

## Pascal's triangle and the binomial theorem

Arranging the binomial coefficients in rows, with row $n$ listing $\binom{n}{0}, \binom{n}{1}, \dots, \binom{n}{n}$, gives **Pascal's triangle**:

$$
\begin{array}{ccccccccccccc}
 &&&&&& 1 &&&&&& \\
 &&&&& 1 && 1 &&&&& \\
 &&&& 1 && 2 && 1 &&&& \\
 &&& 1 && 3 && 3 && 1 &&& \\
 && 1 && 4 && 6 && 4 && 1 && \\
 & 1 && 5 && 10 && 10 && 5 && 1 & \\
 1 && 6 && 15 && 20 && 15 && 6 && 1
\end{array}
$$

Each entry is the sum of the two entries diagonally above it. This is the most important identity for binomial coefficients.

::: theorem Pascal's identity {#thm-pascal}
For $n \ge 1$ and $1 \le k \le n$,

$$
\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}.
$$
:::

::: proof
*Combinatorial proof.* Split the $k$-element subsets of $[n]$ into two classes. Those that contain $n$ correspond bijectively to the $(k-1)$-element subsets of $[n-1]$ (remove $n$, or add it back); there are $\binom{n-1}{k-1}$ of them. Those that do not contain $n$ are exactly the $k$-element subsets of $[n-1]$; there are $\binom{n-1}{k}$ of them (zero if $k = n$). The sum rule gives the identity.

*Algebraic proof.* For $k = n$ both sides equal $1$. For $1 \le k \le n-1$, using [[#eq-binom]],

$$
\binom{n-1}{k-1} + \binom{n-1}{k} = \frac{(n-1)!}{(k-1)!\,(n-k)!} + \frac{(n-1)!}{k!\,(n-k-1)!} = \frac{(n-1)!\,\bigl(k + (n-k)\bigr)}{k!\,(n-k)!} = \frac{n!}{k!\,(n-k)!}. \qquad
$$
:::

The combinatorial proof is shorter and explains *why* the identity holds; the algebraic proof needs no idea but gives no insight. We shall prefer combinatorial proofs whenever they exist.

::: widget pascal
rows: 32
mod: 2
caption: Pascal's triangle with each entry coloured by its remainder mod $2$. Hover over an entry to see the identities it satisfies; every entry is the sum of the two above it. The odd entries form a Sierpiński triangle, and rows $2^j - 1$ (rows $3, 7, 15, 31$) consist entirely of odd numbers, while every interior entry of row $2^j$ is even.
:::

The name "binomial coefficient" comes from the following theorem, which explains why the same numbers appear when a binomial $x + y$ is raised to a power.

::: theorem Binomial theorem {#thm-binomial}
For all real (or complex) numbers $x, y$ and every $n \in \N_0$,

$$
(x + y)^n = \sum_{k=0}^{n} \binom{n}{k} x^k y^{n-k}.
$$ {#eq-binomial}
:::

::: proof
*Combinatorial proof.* Write $(x+y)^n$ as a product of $n$ factors $(x+y)(x+y)\cdots(x+y)$ and expand by the distributive law. The result is a sum of $2^n$ products, one for each way of choosing either $x$ or $y$ from every factor. A choice that takes $x$ from exactly $k$ factors (and $y$ from the others) contributes $x^k y^{n-k}$. Such a choice is determined by the set of factors from which $x$ is taken, which can be any $k$-element subset of the $n$ factors. Hence $x^ky^{n-k}$ occurs exactly $\binom nk$ times.

*Proof by induction.* For $n = 0$ both sides are $1$. Suppose the formula holds for $n - 1$, where $n \ge 1$. Then

$$
(x+y)^n = (x+y)\sum_{k=0}^{n-1}\binom{n-1}{k}x^ky^{n-1-k} = \sum_{k=0}^{n-1}\binom{n-1}{k}x^{k+1}y^{n-1-k} + \sum_{k=0}^{n-1}\binom{n-1}{k}x^ky^{n-k}.
$$

In the first sum put $j = k + 1$; it becomes $\sum_{j=1}^{n}\binom{n-1}{j-1}x^jy^{n-j}$. With the conventions $\binom{n-1}{-1} = \binom{n-1}{n} = 0$, the coefficient of $x^jy^{n-j}$ in the total is $\binom{n-1}{j-1} + \binom{n-1}{j}$, which is $\binom{n}{j}$ by Pascal's identity (and $1 = \binom{n}{0} = \binom n n$ for $j = 0, n$).
:::

Only the rules of algebra are used — commutativity, associativity and distributivity — so the theorem holds for $x, y$ in any commutative ring, for example for polynomials or for integers modulo $m$ ([[abstract-algebra/rings]]). It fails for matrices that do not commute: $(A + B)^2 = A^2 + AB + BA + B^2$, which differs from $A^2 + 2AB + B^2$ unless $AB = BA$.

::: corollary Row sums {#cor-row-sums}
For every $n \ge 0$, $\displaystyle\sum_{k=0}^n \binom{n}{k} = 2^n$, and for every $n \ge 1$, $\displaystyle\sum_{k=0}^n (-1)^k\binom{n}{k} = 0$. Consequently, for $n \ge 1$ an $n$-element set has exactly $2^{n-1}$ subsets of even size and $2^{n-1}$ of odd size.
:::

::: proof
Put $x = y = 1$ in [[#eq-binomial]] for the first identity, and $x = -1$, $y = 1$ for the second (using $0^n = 0$ for $n \ge 1$). The second identity says (number of even-size subsets) $-$ (number of odd-size subsets) $= 0$, and the two numbers add up to $2^n$, so each is $2^{n-1}$.
:::

Both identities have combinatorial proofs too. The first counts all subsets of $[n]$ in two ways: by size (left side) and by the in-or-out choices of the product rule (right side). For the second, the map that adds $1$ to a subset not containing $1$ and removes it from a subset containing $1$ is a bijection from even-size subsets to odd-size subsets.

::: example A coefficient {#ex-coefficient}
Find the coefficient of $x^5$ in $(2x - 3)^8$.
::: solution
Apply the binomial theorem with $2x$ in place of $x$ and $-3$ in place of $y$:

$$
(2x - 3)^8 = \sum_{k=0}^{8}\binom{8}{k}(2x)^k(-3)^{8-k}.
$$

The power $x^5$ comes only from $k = 5$, whose term is $\binom85 2^5 (-3)^3 x^5 = 56 \cdot 32 \cdot (-27)\,x^5$. The coefficient is $-48\,384$. Forgetting the factor $2^5$, or the sign of $(-3)^3$, are the usual slips.
:::
:::

::: widget galton
rows: 10
balls: 400
caption: Each ball makes $10$ independent left/right bounces. A ball lands in bin $k$ exactly when it bounces right $k$ times, and there are $\binom{10}{k}$ routes that do this — one for each choice of *which* $k$ rows send it right. With equal chances, all $2^{10}$ routes are equally likely, so the heights settle into the proportions of row $10$ of Pascal's triangle: $1, 10, 45, 120, 210, 252, 210, \dots$ Drop more balls and watch the shape stabilise.
:::

::: quiz
How many subsets of a $10$-element set have an even number of elements?
- [ ] $1024$
- [x] $512$
- [ ] $252$
- [ ] $256$
::: solution
By [[#cor-row-sums]], exactly half of the $2^{10} = 1024$ subsets have even size, so the answer is $512$. (Indeed $\binom{10}{0}+\binom{10}{2}+\dots+\binom{10}{10} = 1 + 45 + 210 + 210 + 45 + 1 = 512$.) The number $252 = \binom{10}{5}$ counts only the subsets of size $5$.
:::
:::

## Combinatorial proofs

A **combinatorial proof** (or **double-counting** proof) of an identity $L = R$ describes a set, and shows that $L$ counts it in one way and $R$ counts it in another. We have already seen several. Here are two more classics.

::: theorem Vandermonde's identity {#thm-vandermonde}
For all $m, n, r \in \N_0$,

$$
\sum_{k=0}^{r}\binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}.
$$
:::

::: proof
A department has $m$ mathematicians and $n$ physicists, and a committee of $r$ of these $m + n$ people is to be formed. The right-hand side counts all such committees. Alternatively, classify the committees by the number $k$ of mathematicians on them, $0 \le k \le r$. A committee with exactly $k$ mathematicians is formed by choosing them ($\binom{m}{k}$ ways) and then the $r - k$ physicists ($\binom{n}{r-k}$ ways), so by the product rule there are $\binom mk\binom n{r-k}$ such committees (this is $0$ when $k > m$ or $r - k > n$, as it should be). The sum rule over $k$ gives the left-hand side.
:::

Taking $m = n = r$ and using symmetry, $\binom{n}{r-k} = \binom{n}{k}$, gives the pretty special case

$$
\binom{n}{0}^2 + \binom{n}{1}^2 + \dots + \binom{n}{n}^2 = \binom{2n}{n}.
$$

::: theorem Hockey-stick identity {#thm-hockey-stick}
For $0 \le r \le n$,

$$
\binom{r}{r} + \binom{r+1}{r} + \dots + \binom{n}{r} = \binom{n+1}{r+1}.
$$
:::

::: proof
Count the $(r+1)$-element subsets of $[n+1]$ according to their largest element. If the largest element is $i + 1$, then the other $r$ elements form an $r$-element subset of $[i]$, and any such subset may occur; this requires $i \ge r$, and $i + 1 \le n + 1$. So there are $\binom{i}{r}$ subsets with largest element $i + 1$, for $i = r, r+1, \dots, n$, and the sum rule gives the identity.
:::

In Pascal's triangle the terms on the left run down a diagonal and the sum sits just below and to the side of the last one, tracing out a hockey stick. With $r = 1$ it gives a famous formula: $1 + 2 + \dots + n = \binom{1}{1} + \binom21 + \dots + \binom{n}{1} = \binom{n+1}{2} = \frac{n(n+1)}{2}$. With $r = 2$ it gives $\sum_{i=2}^n \binom{i}{2} = \binom{n+1}{3}$, from which the sum of squares $\sum i^2$ follows ([[#exr-squares]]).

## Repeated objects and multinomial coefficients

How many different words can be made by rearranging the letters of MISSISSIPPI? Swapping two S's does not change the word, so the answer is not $11!$.

::: example Rearranging MISSISSIPPI {#ex-mississippi}
Count the distinct arrangements of the letters of MISSISSIPPI.
::: solution
The word has $11$ letters: one M, four I's, four S's and two P's.

*Method 1: choose positions.* Choose the $4$ positions of the S's out of $11$: $\binom{11}{4} = 330$ ways. Then the $4$ positions of the I's among the remaining $7$: $\binom{7}{4} = 35$ ways. Then the $2$ positions of the P's among the remaining $3$: $\binom32 = 3$ ways. The M goes in the last free place. By the product rule there are $330 \cdot 35 \cdot 3 = 34\,650$ words.

*Method 2: label and divide.* Make the letters distinguishable by labelling them, $\mathrm{S}_1, \mathrm{S}_2, \mathrm{S}_3, \mathrm{S}_4$ and so on; the labelled letters have $11!$ arrangements. Erasing the labels maps these onto the words, and each word arises from exactly $4!\,4!\,2!\,1!$ labelled arrangements (permute the labels of each letter among its positions). By the division rule the number of words is

$$
\frac{11!}{1!\,4!\,4!\,2!} = \frac{39\,916\,800}{1152} = 34\,650.
$$
:::
:::

::: theorem Multinomial coefficients {#thm-multinomial}
Let $n = n_1 + n_2 + \dots + n_r$ with all $n_i \in \N_0$. The number of words of length $n$ consisting of $n_1$ copies of a letter $a_1$, $n_2$ copies of $a_2$, …, $n_r$ copies of $a_r$ is the **multinomial coefficient**

$$
\binom{n}{n_1, n_2, \dots, n_r} = \frac{n!}{n_1!\,n_2!\cdots n_r!}.
$$

Equivalently, it is the number of ways to distribute $n$ distinguishable objects into $r$ labelled boxes so that box $i$ receives exactly $n_i$ objects.
:::

::: proof
Choose the positions of the $a_1$'s, then of the $a_2$'s among the remaining positions, and so on. By the product rule the number of words is

$$
\binom{n}{n_1}\binom{n - n_1}{n_2}\cdots\binom{n - n_1 - \dots - n_{r-1}}{n_r} = \frac{n!}{n_1!\,(n-n_1)!}\cdot\frac{(n-n_1)!}{n_2!\,(n-n_1-n_2)!}\cdots\frac{(n - n_1 - \dots - n_{r-1})!}{n_r!\,0!}.
$$

The product telescopes: each numerator after the first cancels the second factor of the previous denominator, leaving $n!/(n_1!\cdots n_r!)$. For the second description, a distribution of objects $1, \dots, n$ into boxes corresponds to the word whose $j$-th letter is $a_i$ when object $j$ goes into box $i$.
:::

For $r = 2$ the multinomial coefficient $\binom{n}{k,\,n-k}$ is just $\binom nk$. The proof of the binomial theorem generalises word for word: expanding $(x_1 + \dots + x_r)^n$, the term $x_1^{n_1}\cdots x_r^{n_r}$ arises once for each word recording which variable was taken from each factor, so

$$
(x_1 + x_2 + \dots + x_r)^n = \sum_{\substack{n_1 + \dots + n_r = n\\ n_i \ge 0}} \binom{n}{n_1, \dots, n_r}\,x_1^{n_1}x_2^{n_2}\cdots x_r^{n_r}.
$$

This is the **multinomial theorem**. For example, the coefficient of $x^2y^3z$ in $(x + y + z)^6$ is $\dfrac{6!}{2!\,3!\,1!} = 60$.

::: application Binomial probabilities
If a coin that shows heads with probability $p$ is tossed $n$ times, each particular sequence with $k$ heads has probability $p^k(1-p)^{n-k}$, and there are $\binom nk$ such sequences. So the probability of exactly $k$ heads is $\binom nk p^k(1-p)^{n-k}$ — the **binomial distribution**. By the binomial theorem these probabilities add up to $\bigl(p + (1-p)\bigr)^n = 1$, as they must. The multinomial coefficients play the same role for experiments with more than two outcomes. See [[probability/probability-spaces]] and [[probability/discrete-random-variables]].
:::

::: history
Counting problems are ancient. Indian scholars studied combinations early: Pingala's treatise on poetic metre (from the last centuries BC) enumerates patterns of long and short syllables, and Mahāvīra (9th century) stated the general rule for the number of combinations. The triangle of binomial coefficients was described by al-Karajī around 1000 (his work survives through al-Samawʾal), and it appears in Yang Hui's book of 1261, which attributes it to Jia Xian in the eleventh century. In Europe it is named after Blaise Pascal, whose *Traité du triangle arithmétique* (written in 1654, published in 1665) derived its properties systematically. Isaac Newton extended the binomial theorem to fractional exponents in the 1660s, and the notation $\binom nk$ was introduced by Andreas von Ettingshausen in 1826.
:::

## Where this leads

The sum and product rules handle disjoint cases and independent stages; the next chapter, [[discrete/advanced-counting]], deals with overlapping cases (inclusion–exclusion), shows that sometimes it is enough to know that an object *exists* (the pigeonhole principle), and counts distributions of identical objects (stars and bars). Many counting problems are best attacked recursively ([[discrete/recurrences]]), and generating functions ([[discrete/generating-functions]]) turn the binomial theorem into a general method. Counting equally likely outcomes is the starting point of probability ([[probability/probability-spaces]]); the binomial theorem with arbitrary real exponents becomes the binomial series of [[calculus-2/taylor-series]]; permutations reappear as a group in [[abstract-algebra/permutation-groups]]; and divisibility of binomial coefficients gives a proof of Fermat's little theorem ([[number-theory/fermat-euler]] and [[#exr-fermat]]).

::: summary
- **Sum rule** ([[#thm-sum-rule]]): sizes of *disjoint* sets add. **Complementary counting**: $\abs{U\setminus A} = \abs U - \abs A$.
- **Product rule** ([[#thm-product-rule]]): for a sequence of choices, multiply the numbers of options — which must not depend on earlier choices (otherwise split into cases first).
- There are $n^k$ sequences of length $k$ from $n$ symbols, $P(n,k) = \frac{n!}{(n-k)!}$ sequences without repetition, $n!$ permutations, and $(n-1)!$ circular arrangements.
- $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ counts $k$-element subsets: count ordered selections, then divide by the $k!$ orders ([[#lem-division]]).
- Pascal's identity $\binom nk = \binom{n-1}{k-1}+\binom{n-1}{k}$ and the binomial theorem $(x+y)^n = \sum\binom nk x^ky^{n-k}$; in particular $\sum_k\binom nk = 2^n$.
- A **combinatorial proof** counts one set in two ways: Vandermonde's identity, the hockey stick, $\sum\binom nk^2 = \binom{2n}n$.
- Words with repeated letters are counted by multinomial coefficients $\frac{n!}{n_1!\cdots n_r!}$; lattice paths to $(m,n)$ by $\binom{m+n}{n}$.
:::

## Exercises

::: exercise Three-letter words {level=1 check="15600"}
How many three-letter strings can be formed from the $26$ letters $A$ to $Z$ if no letter may be used twice?
::: solution
This is the number of $3$-permutations of a $26$-element set: $P(26, 3) = 26 \cdot 25 \cdot 24 = 15\,600$.
:::
:::

::: exercise Pizza toppings {level=1 check="120"}
A pizzeria offers $10$ toppings. How many different pizzas with exactly three different toppings can be ordered?
::: solution
The order in which toppings are listed does not matter, so we count $3$-element subsets of the $10$ toppings: $\binom{10}{3} = \dfrac{10\cdot 9\cdot 8}{3!} = 120$.
:::
:::

::: exercise A binomial coefficient {level=1 check="280"}
Find the coefficient of $x^3$ in $(1 + 2x)^7$.
::: solution
By the binomial theorem the term in $x^3$ is $\binom73(2x)^3\cdot 1^4 = 35\cdot 8\,x^3$, so the coefficient is $280$.
:::
:::

::: exercise Rearranging STATISTICS {level=2 check="50400"}
How many distinct arrangements of the letters of STATISTICS are there?
::: solution
STATISTICS has $10$ letters: S three times, T three times, I twice, and A and C once each. By [[#thm-multinomial]] the number of arrangements is

$$
\frac{10!}{3!\,3!\,2!\,1!\,1!} = \frac{3\,628\,800}{72} = 50\,400.
$$
:::
:::

::: exercise At least one ace {level=2 check="886656"}
How many $5$-card hands from a standard $52$-card deck contain at least one ace?
::: hint
Count the complement.
:::
::: solution
A hand with no ace is a $5$-element subset of the $48$ non-aces. By complementary counting the answer is $\binom{52}{5} - \binom{48}{5} = 2\,598\,960 - 1\,712\,304 = 886\,656$. (Adding up the hands with exactly $1, 2, 3, 4$ aces, $\sum_{j=1}^{4}\binom4j\binom{48}{5-j}$, gives the same total — a useful check. The tempting "$4\binom{51}{4}$", choosing an ace and then any four other cards, counts hands with several aces more than once.)
:::
:::

::: exercise Alternating around a table {level=2 check="2880"}
Five boys and five girls sit at a round table so that boys and girls alternate. How many seatings are there, if seatings that differ by a rotation are regarded as the same?
::: solution
Rotations allow us to fix the seat of one particular boy. The other four boys go in the remaining four "boy" seats (every second seat going round) in $4!$ ways, and the five girls fill the five seats between the boys in $5!$ ways. Distinct choices give distinct seatings once the first boy is fixed, so there are $4!\cdot 5! = 24\cdot 120 = 2880$ seatings.
:::
:::

::: exercise Paths through a point {level=2 check="100"}
How many lattice paths with unit right and up steps go from $(0,0)$ to $(6,4)$ and pass through the point $(3,2)$?
::: solution
Such a path is a path from $(0,0)$ to $(3,2)$ followed by a path from $(3,2)$ to $(6,4)$, and any two such pieces can be combined. By [[#ex-lattice]] the first piece can be chosen in $\binom{5}{2} = 10$ ways, and the second piece (three steps right and two up) also in $\binom52 = 10$ ways. By the product rule there are $100$ paths.
:::
:::

::: exercise Committees with a chair {level=2 #exr-chair}
Prove combinatorially that $k\binom{n}{k} = n\binom{n-1}{k-1}$ for $1 \le k \le n$, and deduce that $\displaystyle\sum_{k=1}^{n} k\binom nk = n\,2^{n-1}$.
::: hint
Count committees of size $k$ with a chair in two ways.
:::
::: solution
Count pairs $(S, c)$ where $S$ is a $k$-element subset of $[n]$ (a committee) and $c \in S$ (its chair). Choosing $S$ first and then $c$ gives $\binom nk\cdot k$ pairs. Choosing the chair $c$ first ($n$ ways) and then the other $k - 1$ members from the remaining $n - 1$ people ($\binom{n-1}{k-1}$ ways) gives $n\binom{n-1}{k-1}$. Hence the identity.

Summing over $k$ and using [[#cor-row-sums]] for $n - 1$,

$$
\sum_{k=1}^n k\binom nk = n\sum_{k=1}^{n}\binom{n-1}{k-1} = n\sum_{j=0}^{n-1}\binom{n-1}{j} = n\,2^{n-1}.
$$

(Directly: both sides count pairs ($S$, $c$) with $c \in S \subseteq [n]$ of any size — choose $c$, then any subset of the other $n-1$ elements to join it.)
:::
:::

::: exercise Sums of squares {level=3 #exr-squares}
Using the hockey-stick identity ([[#thm-hockey-stick]]) with $r = 1$ and $r = 2$, and the identity $i^2 = 2\binom{i}{2} + \binom{i}{1}$, prove that $\displaystyle\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}$.
::: solution
First, $2\binom i2 + \binom i1 = i(i-1) + i = i^2$ for every $i \ge 1$ (for $i = 1$, $\binom12 = 0$). Summing and applying the hockey stick (the term $\binom12 = 0$ may be dropped),

$$
\sum_{i=1}^n i^2 = 2\sum_{i=2}^n\binom i2 + \sum_{i=1}^n\binom i1 = 2\binom{n+1}{3} + \binom{n+1}{2} = \frac{(n+1)n(n-1)}{3} + \frac{(n+1)n}{2}.
$$

Putting this over the common denominator $6$: $\dfrac{n(n+1)\bigl(2(n-1) + 3\bigr)}{6} = \dfrac{n(n+1)(2n+1)}{6}$.
:::
:::

::: exercise Powers of three {level=3}
Give a combinatorial proof that $\displaystyle\sum_{k=0}^{n}\binom{n}{k}2^k = 3^n$, and check it with the binomial theorem.
::: hint
Count strings of length $n$ over the alphabet $\set{a, b, c}$ according to how many letters are *not* $a$.
:::
::: solution
By the product rule there are $3^n$ strings of length $n$ over $\set{a,b,c}$. Classify them by the number $k$ of positions holding $b$ or $c$. To build a string with exactly $k$ such positions, choose those positions ($\binom nk$ ways) and then fill each with $b$ or $c$ ($2^k$ ways); the other positions hold $a$. So there are $\binom nk 2^k$ strings for each $k$, and the sum rule gives $\sum_k \binom nk 2^k = 3^n$. Algebraically, this is the binomial theorem with $x = 2$, $y = 1$: $(2+1)^n = \sum_k\binom nk 2^k 1^{n-k}$.
:::
:::

::: exercise Primes divide binomial coefficients {level=3 #exr-fermat}
Let $p$ be a prime.

1. Prove that $p$ divides $\binom{p}{k}$ for $1 \le k \le p - 1$.
2. Deduce that $(a + 1)^p - a^p - 1$ is divisible by $p$ for every integer $a$, and hence prove **Fermat's little theorem**: $p$ divides $a^p - a$ for every $a \in \N_0$.
::: hint
For part 1, $p! = k!\,(p-k)!\binom{p}{k}$; which side is divisible by $p$? For part 2, use induction on $a$.
:::
::: solution
1. By [[#thm-binomial-formula]], $p! = k!\,(p-k)!\,\binom pk$. The prime $p$ divides the left side. On the right, $k!$ and $(p-k)!$ are products of integers between $1$ and $p - 1$, none of which is divisible by $p$; since a prime dividing a product must divide one of the factors (Euclid's lemma, see [[number-theory/primes]]), $p$ does not divide $k!\,(p-k)!$. Hence $p$ divides $\binom pk$.

2. By the binomial theorem, $(a+1)^p - a^p - 1 = \sum_{k=1}^{p-1}\binom pk a^k$, and every term is divisible by $p$ by part 1. Now prove $p \mid a^p - a$ by induction on $a \ge 0$. For $a = 0$, $0^p - 0 = 0$. If $p \mid a^p - a$, then

$$
(a+1)^p - (a+1) = \bigl[(a+1)^p - a^p - 1\bigr] + \bigl[a^p - a\bigr]
$$

is a sum of two multiples of $p$, so $p \mid (a+1)^p - (a+1)$. This completes the induction. (Fermat's theorem is developed further in [[number-theory/fermat-euler]].)
:::
:::
