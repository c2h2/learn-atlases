Consider the numbers $n^2 + n + 41$ for $n = 0, 1, 2, \dots$:

$$
41,\ 43,\ 47,\ 53,\ 61,\ 71,\ 83,\ 97,\ 113,\ 131,\ 151,\ \dots
$$

Every one of them is prime — and so is every value up to $n = 39$, forty primes in a row. It is tempting to conclude that $n^2 + n + 41$ is always prime. It is not: for $n = 40$ we get $40^2 + 40 + 41 = 40\cdot 41 + 41 = 41^2$. Forty confirming examples did not establish a pattern that holds for every $n$, and no number of examples could.

This is why mathematics insists on **proof**. A proof is a finite chain of statements, each of which is a hypothesis, a definition, an axiom or a previously proved result, or follows from earlier statements by a valid rule of inference ([[proofs/propositional-logic#thm-inference]]); the last statement in the chain is the result being proved. A proof establishes a claim about infinitely many cases in finitely many steps, and anyone can check it line by line.

In this chapter we meet the basic methods of proof — direct proof, proof by contrapositive, proof by contradiction, proof by cases — together with existence proofs and counterexamples, and we finish with advice on writing proofs that other people can follow. The logical form of the statement, analysed with the tools of [[proofs/quantifiers]], usually suggests which method to try.

## Starting from definitions

Proofs about a concept begin from its precise definition. We will practise on familiar properties of integers, so we first fix the definitions.

::: definition Even, odd, divisibility, primes and rational numbers {#def-integers}
Let $a$, $b$ and $n$ be integers.

- $n$ is **even** if $n = 2k$ for some integer $k$, and **odd** if $n = 2k+1$ for some integer $k$.
- $a$ **divides** $b$, written $a \mid b$, if $b = ak$ for some integer $k$. We then say that $a$ is a **divisor** (or factor) of $b$ and $b$ is a **multiple** of $a$.
- An integer $p \ge 2$ is **prime** if its only positive divisors are $1$ and $p$; an integer $n \ge 2$ that is not prime is **composite**.
- A real number $x$ is **rational** if $x = a/b$ for some integers $a, b$ with $b \neq 0$, and **irrational** otherwise. The set of rational numbers is $\Q$.
:::

We take for granted the arithmetic of the integers: sums, differences and products of integers are integers, and the usual algebraic rules hold. We also use the fact that **every integer is either even or odd, but not both**, which follows from division with remainder ([[number-theory/divisibility]]). So "not even" means "odd", and vice versa.

A good first step in any proof is to **unpack the definitions**: replace "$m$ is odd" by "$m = 2k+1$ for some integer $k$", and "$a \mid b$" by "$b = ak$ for some integer $k$". The statement then becomes a question of algebra.

## Direct proof

To prove an implication $p \Rightarrow q$ **directly**, assume $p$ and deduce $q$. For a statement of the form $\forall x,\ (P(x) \Rightarrow Q(x))$, begin "Let $x$ be such that $P(x)$ holds" and finish with "$Q(x)$ holds". Since an implication with a false hypothesis is automatically true, the case where $p$ is false needs no attention.

::: proposition The sum of two odd integers is even {#prop-odd-sum}
If $m$ and $n$ are odd integers, then $m + n$ is even.
:::

::: proof
Let $m$ and $n$ be odd. By definition there are integers $k$ and $l$ with $m = 2k + 1$ and $n = 2l + 1$. Then

$$
m + n = 2k + 2l + 2 = 2(k + l + 1).
$$

Since $k + l + 1$ is an integer, $m + n$ is even.
:::

::: warning Use different letters
A frequent error in this proof is to write "$m = 2k+1$ and $n = 2k+1$". That says $m = n$, so the "proof" covers only the sum of an odd number with itself. Each "there exists" in a definition produces its own witness, and witnesses from different hypotheses must get different names.
:::

::: proposition Properties of divisibility {#prop-divides}
Let $a$, $b$, $c$ be integers.

1. If $a \mid b$ and $b \mid c$, then $a \mid c$.
2. If $a \mid b$ and $a \mid c$, then $a \mid (bx + cy)$ for all integers $x$ and $y$.
:::

::: proof
1. Suppose $b = ak$ and $c = bl$ with $k, l \in \Z$. Then $c = (ak)l = a(kl)$, and $kl \in \Z$, so $a \mid c$.
2. Suppose $b = ak$ and $c = al$ with $k, l \in \Z$, and let $x, y \in \Z$. Then $bx + cy = akx + aly = a(kx + ly)$ with $kx + ly \in \Z$, so $a \mid (bx + cy)$.
:::

::: example The rationals are closed under addition {#ex-rational-sum}
Prove that the sum of two rational numbers is rational.
::: solution
Let $x$ and $y$ be rational. Then $x = a/b$ and $y = c/d$ for some integers $a, b, c, d$ with $b \neq 0$ and $d \neq 0$. Hence

$$
x + y = \frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd}.
$$

Here $ad + bc$ and $bd$ are integers, and $bd \neq 0$ because a product of non-zero integers is non-zero. So $x + y$ is a quotient of integers with non-zero denominator, that is, rational.
:::
:::

Direct proofs are not always found in the direction in which they are written. Often we work *backwards* from the conclusion in scratch work, and then write the proof forwards, as with the ε–δ proofs of [[calculus-1/limits]].

::: example The arithmetic–geometric mean inequality {#ex-amgm}
Prove that for all real numbers $x, y \ge 0$,

$$
\sqrt{xy} \le \frac{x + y}{2},
$$

with equality if and only if $x = y$.
::: solution
*Scratch work.* We want $\frac{x+y}{2} - \sqrt{xy} \ge 0$. Since $x = (\sqrt x)^2$ and $y = (\sqrt y)^2$, the left side is $\frac12\bigl((\sqrt x)^2 - 2\sqrt x\sqrt y + (\sqrt y)^2\bigr)$, a perfect square.

*Proof.* Let $x, y \ge 0$, so that $\sqrt x$ and $\sqrt y$ are defined and $\sqrt{xy} = \sqrt x\,\sqrt y$. Then

$$
\frac{x + y}{2} - \sqrt{xy} = \frac{(\sqrt x)^2 - 2\sqrt x\sqrt y + (\sqrt y)^2}{2} = \frac{(\sqrt x - \sqrt y)^2}{2} \ge 0,
$$

because a square is non-negative. Equality holds exactly when $\sqrt x - \sqrt y = 0$, that is, $\sqrt x = \sqrt y$; since the square-root function is injective on $[0, \infty)$, this happens if and only if $x = y$.
:::
:::

::: widget plot
f: sqrt(x); (1 + x)/2
x: 0, 4
y: 0, 2.6
labels: \sqrt{x\cdot 1}; \tfrac{x+1}{2}
points: 1, 1
caption: The inequality with $y = 1$: the geometric mean $\sqrt{x}$ of $x$ and $1$ never rises above their arithmetic mean $\tfrac{x+1}{2}$, and the two graphs touch only at $x = 1$, the equality case $x = y$. Hover to compare values; the gap at $x$ is exactly $\tfrac12(\sqrt{x} - 1)^2$.
:::

## Proof by contrapositive

By [[proofs/propositional-logic#thm-contrapositive]], an implication $p \Rightarrow q$ is logically equivalent to its contrapositive $\neg q \Rightarrow \neg p$. So we may prove $p \Rightarrow q$ by assuming that $q$ is false and deducing that $p$ is false. This helps when $\neg q$ gives us something concrete to work with and $p$ does not.

::: lemma Squares and parity {#lem-square-even}
Let $n$ be an integer. If $n^2$ is even, then $n$ is even.
:::

::: proof
A direct proof is awkward: from $n^2 = 2k$ there is no obvious way to extract information about $n$. So we prove the contrapositive: *if $n$ is odd, then $n^2$ is odd*. (Since every integer is even or odd but not both, "not even" means "odd".) Let $n$ be odd, say $n = 2k + 1$ with $k \in \Z$. Then

$$
n^2 = 4k^2 + 4k + 1 = 2(2k^2 + 2k) + 1,
$$

and $2k^2 + 2k \in \Z$, so $n^2$ is odd. This proves the contrapositive, and hence the lemma.
:::

::: corollary {#cor-square-even}
An integer $n$ is even if and only if $n^2$ is even.
:::

::: proof
A biconditional is proved in two directions. ($\Rightarrow$) If $n = 2k$, then $n^2 = 2(2k^2)$ is even. ($\Leftarrow$) This is [[#lem-square-even]].
:::

::: example A product of integers {#ex-product-even}
Let $a$ and $b$ be integers. Prove that if $ab$ is even, then $a$ is even or $b$ is even.
::: solution
The negation of the conclusion "$a$ is even or $b$ is even" is, by De Morgan's law, "$a$ is odd and $b$ is odd". So the contrapositive is: *if $a$ and $b$ are both odd, then $ab$ is odd*. Let $a = 2k+1$ and $b = 2l+1$ with $k, l \in \Z$. Then

$$
ab = 4kl + 2k + 2l + 1 = 2(2kl + k + l) + 1
$$

is odd. This proves the contrapositive, and hence the original statement.
:::
:::

The same idea works far from the integers. To show that *if $x \ge 0$ is irrational then $\sqrt{x}$ is irrational*, prove the contrapositive: if $\sqrt x = a/b$ is rational, then $x = a^2/b^2$ is rational.

::: quiz
To prove "for every integer $n$, if $n^2 + 3$ is even then $n$ is odd" by contrapositive, what should you assume, and what must you show?
- [ ] Assume $n$ is odd; show $n^2 + 3$ is even.
- [x] Assume $n$ is even; show $n^2 + 3$ is odd.
- [ ] Assume $n^2 + 3$ is odd; show $n$ is even.
- [ ] Assume $n^2 + 3$ is even and $n$ is even; reach a contradiction.
::: solution
The contrapositive of $p \Rightarrow q$ is $\neg q \Rightarrow \neg p$: here, "if $n$ is not odd (so even), then $n^2 + 3$ is not even (so odd)". Indeed, if $n = 2k$ then $n^2 + 3 = 2(2k^2 + 1) + 1$. The first option is the converse; the third is the inverse; the fourth is a proof by contradiction, which would also work but is not a proof by contrapositive.
:::
:::

## Proof by contradiction

To prove a statement $S$ **by contradiction**, assume that $S$ is false and deduce something impossible — a statement of the form $r \land \neg r$. Since a true assumption cannot lead to a false conclusion by valid steps, the assumption $\neg S$ must be false, so $S$ is true. In logical terms, $(\neg S \Rightarrow \bot) \equiv S$. The method (also called *reductio ad absurdum*) is especially natural for statements saying that something does *not* exist or does *not* have a property, because assuming the opposite hands us an object to work with.

Our proofs will use the **well-ordering principle**: every non-empty set of positive integers has a least element. It is discussed, and shown to be equivalent to induction, in [[proofs/induction#thm-well-ordering]].

::: theorem The square root of 2 is irrational {#thm-sqrt2}
There is no rational number $x$ with $x^2 = 2$. In other words, $\sqrt 2$ is irrational.
:::

::: proof
Suppose, for a contradiction, that $\sqrt 2$ is rational, say $\sqrt 2 = a/b$ with $a, b \in \Z$ and $b \neq 0$. Changing the signs of both $a$ and $b$ if necessary, we may assume $b > 0$. Then the set

$$
S = \set{ q \in \N : q\sqrt 2 \in \Z }
$$

contains $b$, so it is non-empty, and by the well-ordering principle it has a least element $q$. Put $p = q\sqrt 2$, an integer. Squaring gives $p^2 = 2q^2$, so $p^2$ is even, and by [[#lem-square-even]] $p$ is even: $p = 2c$ with $c \in \Z$. Then $4c^2 = 2q^2$, so $q^2 = 2c^2$ is even and, again by [[#lem-square-even]], $q$ is even: $q = 2d$ with $d \in \N$ and $d < q$. But

$$
d\sqrt 2 = \frac{q\sqrt 2}{2} = \frac{p}{2} = c \in \Z,
$$

so $d \in S$, contradicting the minimality of $q$. Hence $\sqrt 2$ is irrational.
:::

The more familiar version says "write $\sqrt 2 = a/b$ in lowest terms; then $a$ and $b$ are both even, a contradiction". That is the same argument; the well-ordering principle is what guarantees that lowest terms exist.

Our second classical example needs a lemma, which is itself proved by contradiction.

::: lemma Prime divisors {#lem-prime-divisor}
Every integer $n \ge 2$ has a prime divisor.
:::

::: proof
The set $D$ of divisors $d$ of $n$ with $d \ge 2$ is non-empty, since $n \in D$. By the well-ordering principle it has a least element $p$. Suppose, for a contradiction, that $p$ is not prime. Then $p$ has a divisor $e$ with $1 < e < p$. Since $e \mid p$ and $p \mid n$, [[#prop-divides]] gives $e \mid n$, so $e \in D$ and $e < p$, contradicting the minimality of $p$. Hence $p$ is a prime divisor of $n$.
:::

::: theorem Euclid's theorem {#thm-primes}
There are infinitely many prime numbers.
:::

::: proof
Suppose, for a contradiction, that there are only finitely many primes, and list them all: $p_1, p_2, \dots, p_k$ (the list is not empty, since $2$ is prime). Consider

$$
N = p_1 p_2 \cdots p_k + 1.
$$

Since $N \ge 3$, [[#lem-prime-divisor]] gives a prime $p$ dividing $N$. Every prime is on our list, so $p = p_i$ for some $i$, and then $p$ divides the product $p_1 p_2\cdots p_k$ as well. By [[#prop-divides]] (with $x = 1$, $y = -1$), $p$ divides $N - p_1 p_2 \cdots p_k = 1$. But a prime $p \ge 2$ does not divide $1$. This contradiction shows that there are infinitely many primes.
:::

::: warning Euclid's number need not be prime
The proof does **not** say that $N = p_1 p_2\cdots p_k + 1$ is prime. For the first six primes, $2\cdot3\cdot5\cdot7\cdot11\cdot13 + 1 = 30031 = 59 \times 509$. The proof only needs that $N$ has *some* prime factor, and that this factor cannot be on the list. (Inside a proof by contradiction we work in an impossible world in which the list contains all primes; conclusions drawn there, like "$N$ must be prime", should not be taken out of it.)
:::

::: widget sieve
mode: sieve
n: 120
caption: The sieve of Eratosthenes crosses out the multiples of each prime in turn; the numbers that survive are the primes. They thin out as the numbers grow — yet by Euclid's theorem they never run out. Notice that every crossed-out number is crossed out first by its smallest prime factor, the prime divisor found in [[#lem-prime-divisor]].
:::

::: remark Contradiction or contrapositive?
To prove $p \Rightarrow q$ by contradiction, we assume $p$ *and* $\neg q$ and look for a contradiction. If the contradiction we find is simply $\neg p$, the argument is really a proof of the contrapositive $\neg q \Rightarrow \neg p$, and it is clearer to present it that way. Use contradiction when the impossibility is something else, as in the two theorems above.
:::

::: quiz
To prove by contradiction that "there is no largest prime number", you should begin by assuming:
- [ ] every number has a larger prime
- [x] there is a largest prime number
- [ ] there is no largest prime number
- [ ] some numbers are not prime
::: solution
A proof by contradiction of $S$ assumes $\neg S$. Here $S$ is "there is no largest prime", so $\neg S$ is "there is a largest prime" — call it $P$ — and one then derives a contradiction (for instance from $P! + 1$, or from Euclid's argument). Assuming $S$ itself would be circular.
:::
:::

## Proof by cases

If the hypotheses imply that one of several cases must occur, we can prove the conclusion separately in each case; this is the valid rule $p \lor q,\ p \Rightarrow r,\ q \Rightarrow r \;\therefore\; r$. The cases must be **exhaustive** — between them they cover every possibility — though they need not exclude one another.

Recall that the **absolute value** of a real number is $\abs{a} = a$ if $a \ge 0$ and $\abs{a} = -a$ if $a < 0$. Its definition has two cases, so proofs about it often do too.

::: lemma {#lem-abs}
For real numbers $a$ and $b$, $\abs{a} \le b$ if and only if $-b \le a \le b$. In particular $-\abs{a} \le a \le \abs{a}$.
:::

::: proof
*Case 1: $a \ge 0$.* Then $\abs{a} = a$. If $a \le b$, then $b \ge a \ge 0$, so $-b \le 0 \le a$ and $-b \le a \le b$. Conversely, if $-b \le a \le b$ then $\abs{a} = a \le b$.

*Case 2: $a < 0$.* Then $\abs{a} = -a$. If $-a \le b$, then $a \ge -b$, and also $a < 0 < -a \le b$; so $-b \le a \le b$. Conversely, if $-b \le a$ then $\abs{a} = -a \le b$.

The cases are exhaustive, which proves the equivalence. Taking $b = \abs{a}$ gives the final statement.
:::

::: theorem Triangle inequality {#thm-triangle}
For all real numbers $x$ and $y$, $\abs{x + y} \le \abs{x} + \abs{y}$.
:::

::: proof
By [[#lem-abs]], $-\abs{x} \le x \le \abs{x}$ and $-\abs{y} \le y \le \abs{y}$. Adding these inequalities,

$$
-\bigl(\abs{x} + \abs{y}\bigr) \le x + y \le \abs{x} + \abs{y},
$$

and by [[#lem-abs]] again, with $a = x + y$ and $b = \abs{x} + \abs{y}$, this says $\abs{x + y} \le \abs{x} + \abs{y}$.
:::

The triangle inequality is the single most used inequality in analysis; one of its first uses is the proof that limits are unique in [[calculus-1/limits]].

Cases are just as useful for integers, where we can split according to the remainder on division by some number.

::: proposition Squares modulo 4 {#prop-squares-mod4}
For every integer $n$, $n^2$ is of the form $4k$ or $4k + 1$ for some integer $k$.
:::

::: proof
*Case 1: $n$ even,* $n = 2m$. Then $n^2 = 4m^2$, of the form $4k$ with $k = m^2$.

*Case 2: $n$ odd,* $n = 2m + 1$. Then $n^2 = 4m^2 + 4m + 1 = 4(m^2 + m) + 1$, of the form $4k+1$.

Every integer is even or odd, so the cases are exhaustive.
:::

::: example Sums of two squares {#ex-two-squares}
Prove that no integer of the form $4k + 3$ — for example $2023 = 4\cdot 505 + 3$ — is a sum of two squares of integers.
::: solution
Let $a, b \in \Z$. By [[#prop-squares-mod4]] each of $a^2$, $b^2$ has the form $4k$ or $4k + 1$, so there are three cases for the sum (up to the order of $a$ and $b$):

$$
a^2 + b^2 = \begin{cases} 4k + 4l = 4(k+l), \\ 4k + (4l + 1) = 4(k + l) + 1, \\ (4k+1) + (4l+1) = 4(k+l) + 2. \end{cases}
$$

The remainder of $a^2 + b^2$ on division by $4$ is therefore $0$, $1$ or $2$, never $3$. Since the remainder on division by $4$ is unique ([[number-theory/divisibility]]), $a^2 + b^2 \neq 4m + 3$ for every integer $m$.
:::
:::

::: widget modular
n: 4
mode: multiply
caption: The multiplication table modulo $4$. Its diagonal lists the squares: $0, 1, 0, 1$ — exactly the two cases of [[#prop-squares-mod4]]. Change $n$ to $8$: the odd numbers $1, 3, 5, 7$ all square to $1$, which proves that every odd square has the form $8k + 1$ (one case per odd residue).
:::

Sometimes two cases are symmetric, and we can say **without loss of generality** ("WLOG") that we are in one of them.

::: example Without loss of generality {#ex-wlog}
Prove that $\max(x, y) = \dfrac{x + y + \abs{x - y}}{2}$ for all real numbers $x, y$.
::: solution
Both sides are unchanged if $x$ and $y$ are swapped (note $\abs{x - y} = \abs{y - x}$). So we may assume, without loss of generality, that $x \ge y$: the case $x < y$ is the same statement with the names exchanged. If $x \ge y$ then $\abs{x - y} = x - y$ and

$$
\frac{x + y + (x - y)}{2} = x = \max(x, y).
$$

Writing "WLOG" is an honest shortcut only when the omitted case really is the same argument with the roles exchanged; if it is not, every case must be written out.
:::
:::

## Existence, uniqueness and counterexamples

To prove $\exists x,\ P(x)$ the most convincing method is **constructive**: exhibit a specific $x$ and verify $P(x)$. Sometimes a **non-constructive** argument proves existence without telling us which object works.

::: theorem An irrational power can be rational {#thm-irrational-power}
There exist irrational numbers $a$ and $b$ such that $a^b$ is rational.
:::

::: proof
Consider $x = \sqrt{2}^{\sqrt 2}$. Either $x$ is rational or it is not.

*Case 1: $x$ is rational.* Then $a = b = \sqrt 2$ works, since both are irrational by [[#thm-sqrt2]].

*Case 2: $x$ is irrational.* Then take $a = x$ and $b = \sqrt 2$:

$$
a^b = \left(\sqrt{2}^{\sqrt 2}\right)^{\sqrt 2} = \sqrt{2}^{\sqrt 2 \cdot \sqrt 2} = \sqrt 2^{\,2} = 2,
$$

which is rational. In either case the required $a$ and $b$ exist.
:::

The proof does not tell us which case occurs. (In fact $\sqrt 2^{\sqrt 2}$ is irrational, by the Gelfond–Schneider theorem of 1934, but the proof above needs no such knowledge; an explicit pair is given in the exercises.)

A **uniqueness** claim — "there is at most one $x$ with $P(x)$" — is usually proved by assuming $P(x)$ and $P(y)$ and deducing $x = y$, as in [[proofs/quantifiers#def-unique]].

To **disprove** a universal statement, one **counterexample** suffices, and nothing more is needed: no general argument, no explanation of why the statement "should" fail. The opening example disproved "$n^2 + n + 41$ is prime for all $n \ge 0$" with $n = 40$.

::: example Prove or disprove {#ex-prove-disprove}
Decide whether each statement is true, and prove your answer.

1. For every real number $x$, if $x^2 > 1$ then $x > 1$.
2. If $x$ is rational and $y$ is irrational, then $x + y$ is irrational.
3. The sum of two irrational numbers is irrational.
::: solution
1. **False.** Counterexample: $x = -2$ has $x^2 = 4 > 1$ but $x < 1$.
2. **True.** Suppose, for a contradiction, that $x$ is rational, $y$ irrational and $x + y = r$ is rational. Then $y = r - x$ is a difference of two rationals, hence rational (by [[#ex-rational-sum]], since $-x$ is rational) — contradicting the irrationality of $y$.
3. **False.** $\sqrt 2$ is irrational, and so is $-\sqrt 2$ (if $-\sqrt 2 = a/b$ then $\sqrt 2 = (-a)/b$). But their sum $0$ is rational.
:::
:::

::: quiz
Which pair $(x, y)$ is a counterexample to "for all real $x$ and $y$, if $x < y$ then $x^2 < y^2$"?
- [ ] $x = 1$, $y = 2$
- [x] $x = -3$, $y = 1$
- [ ] $x = 2$, $y = 1$
- [ ] $x = 0$, $y = 0$
::: solution
A counterexample to an implication must make the hypothesis true and the conclusion false. For $x = -3$, $y = 1$ we have $x < y$ but $x^2 = 9 > 1 = y^2$. The pair $(1, 2)$ satisfies the statement; the pairs $(2, 1)$ and $(0, 0)$ do not satisfy the hypothesis $x < y$, so the implication is (vacuously) true for them.
:::
:::

## Writing proofs

A proof is written for a reader, who should be able to check every step without guessing what you mean. Some guidelines:

- **Say what you are proving and how.** "We prove the contrapositive." "Suppose, for a contradiction, that …". "We consider two cases."
- **Write in sentences.** Symbols such as $\Rightarrow$ and $\therefore$ are not a substitute for "so", "hence", "since". A proof that is a column of formulas leaves the logic to the reader.
- **Introduce every symbol.** "Let $n$ be an odd integer. Then $n = 2k+1$ for some integer $k$." Never use a letter that has not been defined.
- **Distinguish what you know from what you want.** Never start from the statement to be proved and manipulate it until you reach something true.
- **End clearly** — "which proves the claim", or the symbol ∎ — so the reader knows the proof is over.

::: warning Arguing from the conclusion
Here is an invalid "proof" that $x^2 + 1 \ge 2x$ for all real $x$: "$x^2 + 1 \ge 2x$, so $x^2 - 2x + 1 \ge 0$, so $(x-1)^2 \ge 0$, which is true." It deduces a true statement *from* the claim, which proves nothing: by the same method, "$-1 = 1$, so $(-1)^2 = 1^2$, so $1 = 1$, which is true" would prove that $-1 = 1$. The correct proof runs forwards: "for every real $x$, $(x-1)^2 \ge 0$; expanding, $x^2 - 2x + 1 \ge 0$, so $x^2 + 1 \ge 2x$." The scratch work was fine for *finding* the proof, but the written proof must start from what we know. (Writing $\iff$ between the steps would also be valid here, because each step is reversible — but then you must check that it is.)
:::

::: history
Proof as we know it began in ancient Greece. Euclid's *Elements* (around 300 BC) derives hundreds of results in geometry and arithmetic from a short list of definitions and postulates; Book IX, Proposition 20, is the theorem that there are infinitely many primes, with essentially the argument given above. The irrationality of $\sqrt 2$ — in Greek terms, the incommensurability of the side and diagonal of a square — was discovered by the Pythagoreans in the fifth century BC (later legend credits Hippasus of Metapontum), and Aristotle cites its proof in the *Prior Analytics* as the standard example of a reductio ad impossibile: if the diagonal were commensurable, odd numbers would equal even ones. Non-constructive existence proofs became controversial in the early twentieth century, when L. E. J. Brouwer and the intuitionists argued that "either $x$ is rational or it is not" may not be used for statements about infinite collections; most mathematicians accept such arguments, but constructive mathematics remains an active field.
:::

## Where this leads

Every later chapter uses these methods. [[proofs/induction]] adds the most important technique for statements about all natural numbers. In [[proofs/sets]] two sets are shown equal by proving two inclusions, a direct application of the biconditional. Number theory builds on the definitions here: Euclid's theorem and the existence of prime divisors lead to unique factorisation in [[number-theory/primes]], and the case analysis of squares modulo $4$ is the first step towards the theory of congruences in [[number-theory/congruences]]. The triangle inequality and proofs by contradiction are the daily tools of [[real-analysis/sequences]] and [[real-analysis/continuity]].

::: summary
- A proof is a finite chain of justified statements; examples, however many, never prove a universal claim ($n^2 + n + 41$ is prime for $n \le 39$ but not for $n = 40$).
- Start by unpacking definitions, giving each witness its own name. A **direct proof** of $p \Rightarrow q$ assumes $p$ and derives $q$; scratch work may run backwards, but the written proof runs forwards.
- **Contrapositive:** prove $\neg q \Rightarrow \neg p$ instead, as for "$n^2$ even $\Rightarrow$ $n$ even". A biconditional needs both directions.
- **Contradiction:** assume the statement is false and derive an impossibility. Classic examples: $\sqrt 2$ is irrational ([[#thm-sqrt2]]) and there are infinitely many primes ([[#thm-primes]]).
- **Cases** must be exhaustive: parity, sign of a number, remainders. The triangle inequality $\abs{x+y}\le\abs{x}+\abs{y}$ and the fact that squares are $0$ or $1$ modulo $4$ are proved this way.
- Existence proofs may be constructive or not; uniqueness means any two solutions are equal; a single counterexample disproves a universal statement.
- Write proofs in sentences, say which method you use, define every symbol, and never argue from the conclusion.
:::

## Exercises

::: exercise A direct proof {level=1}
Prove that if $n$ is an odd integer, then $3n + 5$ is even.
::: solution
Let $n$ be odd, so $n = 2k + 1$ for some integer $k$. Then $3n + 5 = 6k + 3 + 5 = 6k + 8 = 2(3k + 4)$, and $3k + 4$ is an integer, so $3n + 5$ is even.
:::
:::

::: exercise A counterexample {level=1}
Disprove: for all integers $a$ and $b$, if $a \mid b$ and $b \mid a$ then $a = b$. What is the correct conclusion?
::: solution
Take $a = 2$ and $b = -2$. Then $b = a\cdot(-1)$ and $a = b \cdot (-1)$, so $a \mid b$ and $b \mid a$, but $a \neq b$. The correct statement is that $a = \pm b$. (If $b = ak$ and $a = bl$, then $a = akl$. If $a = 0$ then $b = 0 = a$; otherwise $kl = 1$, so $k = l = \pm 1$.)
:::
:::

::: exercise Euler's prime-generating polynomial {level=1 check="40"}
What is the smallest integer $n \ge 0$ for which $n^2 + n + 41$ is not prime?
::: solution
The values for $n = 0, 1, \dots, 39$ are all prime (this can be checked by computer, or by hand with patience). For $n = 40$, $40^2 + 40 + 41 = 40(40 + 1) + 41 = 41\cdot 41$, which is composite. So the answer is $40$. (Also $n = 41$ fails: $41^2 + 41 + 41 = 41 \cdot 43$.)
:::
:::

::: exercise Contrapositive {level=2}
Let $a$ and $b$ be integers. Prove that if $a + b \ge 15$, then $a \ge 8$ or $b \ge 8$.
::: solution
We prove the contrapositive. The negation of "$a \ge 8$ or $b \ge 8$" is "$a < 8$ and $b < 8$", that is, $a \le 7$ and $b \le 7$ (as $a, b$ are integers). Then $a + b \le 14$, so $a + b < 15$, which is the negation of the hypothesis.
:::
:::

::: exercise The square root of 3 {level=2}
Prove that $\sqrt 3$ is irrational.
::: hint
First prove, by cases on the remainder of $n$ on division by $3$, that if $3 \mid n^2$ then $3 \mid n$.
:::
::: solution
*Lemma: if $3 \mid n^2$ then $3 \mid n$.* We prove the contrapositive. If $3 \nmid n$ then $n = 3m + 1$ or $n = 3m + 2$. In the first case $n^2 = 9m^2 + 6m + 1 = 3(3m^2 + 2m) + 1$; in the second $n^2 = 9m^2 + 12m + 4 = 3(3m^2 + 4m + 1) + 1$. Either way $n^2$ leaves remainder $1$ on division by $3$, so $3 \nmid n^2$.

*Theorem.* Suppose $\sqrt 3$ is rational. As in the proof of [[#thm-sqrt2]], let $q$ be the least positive integer with $q\sqrt 3 \in \Z$, and put $p = q \sqrt 3$. Then $p^2 = 3q^2$, so $3 \mid p^2$ and by the lemma $p = 3c$. Then $9c^2 = 3q^2$, so $q^2 = 3c^2$, and $3 \mid q$: $q = 3d$ with $0 < d < q$. But $d\sqrt3 = p/3 = c \in \Z$, contradicting the minimality of $q$.
:::
:::

::: exercise Cases modulo 3 {level=2}
Prove that $n^3 - n$ is divisible by $3$ for every integer $n$.
::: solution
Factorise: $n^3 - n = (n-1)n(n+1)$. Every integer $n$ has the form $3m$, $3m+1$ or $3m+2$.

- If $n = 3m$, the factor $n$ is divisible by $3$.
- If $n = 3m + 1$, the factor $n - 1 = 3m$ is divisible by $3$.
- If $n = 3m + 2$, the factor $n + 1 = 3(m+1)$ is divisible by $3$.

In each case one factor is a multiple of $3$, so the product is: if $3 \mid u$ then $3 \mid uv$ for any integer $v$. (Induction gives another proof; see [[proofs/induction]].)
:::
:::

::: exercise Odd squares {level=2}
Prove that if $n$ is odd, then $n^2 - 1$ is divisible by $8$.
::: hint
Write $n = 2k+1$, factorise, and show that $k(k+1)$ is even by considering cases.
:::
::: solution
Let $n = 2k + 1$. Then $n^2 - 1 = 4k^2 + 4k = 4k(k+1)$. Now $k(k+1)$ is even: if $k$ is even, so is $k(k+1)$; if $k$ is odd, then $k + 1$ is even, and so is $k(k+1)$. Writing $k(k+1) = 2j$ gives $n^2 - 1 = 8j$. (This is the observation in the modular figure: every odd square has the form $8j + 1$.)
:::
:::

::: exercise Rational times irrational {level=2}
Let $x$ be a non-zero rational number and $y$ an irrational number. Prove that $xy$ is irrational. Is the product of two irrational numbers always irrational?
::: solution
Suppose, for a contradiction, that $xy = r$ is rational. Since $x = a/b \neq 0$ with $a, b \in \Z$, both $a \neq 0$ and $b \neq 0$, so $1/x = b/a$ is rational, and $y = r \cdot (1/x)$ is a product of rationals, hence rational (if $r = c/d$, then $y = cb/(da)$ with $da \neq 0$). This contradicts the irrationality of $y$.

The product of two irrationals can be rational: $\sqrt 2 \cdot \sqrt 2 = 2$. (The hypothesis $x \neq 0$ is needed too: $0 \cdot \sqrt 2 = 0$.)
:::
:::

::: exercise A constructive example {level=3}
Prove that $\log_2 3$ is irrational. Deduce that $a = \sqrt 2$ and $b = \log_2 9$ are irrational numbers with $a^b$ rational, giving a constructive proof of [[#thm-irrational-power]].
::: hint
If $\log_2 3 = p/q$ with $p, q$ positive integers, raise $2$ to both sides and then to the power $q$.
:::
::: solution
Since $1 < 3 < 4$, $0 < \log_2 3 < 2$, so if it is rational it equals $p/q$ with $p, q \in \N$. Then $2^{p/q} = 3$, and raising to the power $q$ gives $2^p = 3^q$. The left side is even (as $p \ge 1$) and the right side is odd (a product of odd numbers is odd, by the argument of [[#ex-product-even]]). This contradiction shows that $\log_2 3$ is irrational.

Now $b = \log_2 9 = 2\log_2 3$ is irrational (if $2\log_2 3 = r$ were rational, so would be $\log_2 3 = r/2$), and $a = \sqrt 2$ is irrational by [[#thm-sqrt2]]. Finally

$$
a^b = \left(2^{1/2}\right)^{\log_2 9} = 2^{\frac12 \log_2 9} = 2^{\log_2 3} = 3,
$$

which is rational.
:::
:::

::: exercise Primes of the form 4k + 3 {level=3}
Prove that there are infinitely many primes of the form $4k + 3$. You may use the fact that every integer $n \ge 2$ is a product of primes ([[proofs/induction]]).
::: hint
Imitate Euclid: if $p_1, \dots, p_r$ were all such primes, consider $N = 4p_1 p_2 \cdots p_r - 1$. What can you say about the prime factors of $N$ if they all had the form $4k + 1$?
:::
::: solution
First, a product of integers of the form $4k+1$ has the same form: $(4k+1)(4l+1) = 4(4kl + k + l) + 1$, and by repeating this, any finite product of such numbers has the form $4m+1$.

Suppose, for a contradiction, that $p_1, \dots, p_r$ are all the primes of the form $4k+3$ (there is at least one, namely $3$). Let $N = 4p_1 p_2\cdots p_r - 1 = 4(p_1\cdots p_r - 1) + 3$. Then $N \ge 11$ is odd, so all its prime factors are odd, and every odd prime has the form $4k+1$ or $4k+3$. If all prime factors of $N$ had the form $4k+1$, then so would $N$, by the first paragraph; but $N$ has the form $4m + 3$, and remainders on division by $4$ are unique. So some prime $q$ of the form $4k + 3$ divides $N$. Then $q = p_i$ for some $i$, so $q \mid 4p_1\cdots p_r$, and by [[#prop-divides]] $q$ divides $4p_1 \cdots p_r - N = 1$, which is impossible. Hence there are infinitely many primes of the form $4k + 3$.
:::
:::
