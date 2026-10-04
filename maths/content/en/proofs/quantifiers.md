Compare two sentences about real numbers that use exactly the same words in a different order:

1. For every real number $x$ there is a real number $y$ such that $y > x$.
2. There is a real number $y$ such that for every real number $x$, $y > x$.

The first is true: whatever $x$ you name, $y = x + 1$ is bigger. The second is false: it claims there is a single number larger than every real number, and no such number exists (it would have to be larger than itself). The only difference is the order of "for every" and "there is".

The definitions of analysis are full of such phrases. A sequence $(a_n)$ converges to $L$ if *for every* $\eps > 0$ *there is* an $N$ such that *for all* $n \ge N$, $\abs{a_n - L} < \eps$. To use a definition like this, or to prove that a sequence does *not* converge, you must be able to read, manipulate and negate statements with several quantifiers without thinking twice. Propositional logic, the subject of [[proofs/propositional-logic|the previous chapter]], treats statements as indivisible units; in this chapter we look inside them, at the objects they talk about.

## Predicates

A sentence such as "$n$ is prime" is not a proposition: it is true for $n = 7$ and false for $n = 8$. It becomes a proposition once we say which $n$ we mean.

::: definition Predicate {#def-predicate}
A **predicate** (or **open sentence**) $P(x)$ is a sentence containing a variable $x$ that becomes a proposition whenever $x$ is replaced by an element of a specified set $D$, called the **domain** (or universe of discourse). More generally a predicate $P(x_1, \dots, x_k)$ may contain several variables, each with its own domain. The **truth set** of $P(x)$ is the set of elements $a \in D$ for which $P(a)$ is true.
:::

For example, with domain $\Z$:

- $P(n)$: "$n$ is even" is true for $n = 4$ and false for $n = 7$; its truth set is the set of even integers.
- $Q(x, y)$: "$x < y$" is a predicate in two variables; $Q(2, 5)$ is true and $Q(5, 2)$ false.
- $R(x)$: "$x^2 - 5x + 6 = 0$" has truth set $\set{2, 3}$.

Throughout this course $\N = \set{1, 2, 3, \dots}$ denotes the positive integers and $\N_0 = \set{0, 1, 2, \dots}$; books differ on whether $0 \in \N$, so always check the convention.

There are two ways to turn a predicate into a proposition. One is to substitute a value. The other is to say for *how many* values of the variable it holds — all of them, or at least one.

## The two quantifiers

::: definition Universal and existential quantifiers {#def-quantifiers}
Let $P(x)$ be a predicate with domain $D$.

- The **universal statement** $\forall x \in D,\ P(x)$, read "for all $x$ in $D$, $P(x)$", is true if $P(a)$ is true for every $a \in D$, and false otherwise.
- The **existential statement** $\exists x \in D,\ P(x)$, read "there exists $x$ in $D$ such that $P(x)$", is true if $P(a)$ is true for at least one $a \in D$, and false otherwise.

The symbols $\forall$ and $\exists$ are the **universal** and **existential quantifiers**.
:::

If the domain is finite, say $D = \set{a_1, \dots, a_n}$, the quantifiers are just long conjunctions and disjunctions:

$$
\forall x \in D,\ P(x) \;\equiv\; P(a_1) \land P(a_2) \land \dots \land P(a_n), \qquad \exists x \in D,\ P(x) \;\equiv\; P(a_1) \lor P(a_2) \lor \dots \lor P(a_n).
$$

For infinite domains no such expansion is possible, which is why quantifiers are genuinely new.

::: remark The empty domain
If $D = \varnothing$, then $\exists x \in D,\ P(x)$ is false (there is nothing to serve as a witness) and $\forall x \in D,\ P(x)$ is **true**, whatever $P$ is: there is no element of $D$ for which $P$ fails. This is the quantifier form of vacuous truth. "Every unicorn in this room is purple" is true, because $\forall x\,(x \text{ is a unicorn in this room} \Rightarrow x \text{ is purple})$ has a false hypothesis for every $x$. Vacuous truth is not a trick; it is what makes statements like "every element of $\varnothing$ belongs to $A$", and hence $\varnothing \subseteq A$, true for every set $A$ ([[proofs/sets]]).
:::

The variable $x$ in $\forall x \in D,\ P(x)$ is **bound**: the statement is about $P$ and $D$, not about any particular $x$, and renaming $x$ to $t$ changes nothing — just as $\int_0^1 x^2\,dx = \int_0^1 t^2\,dt$. A variable that is not bound by a quantifier is **free**, and a statement with free variables is still a predicate.

::: example The domain matters {#ex-domain}
Decide whether each statement is true or false.

1. $\forall x \in \R,\ x^2 \ge 0$.
2. $\exists x \in \R,\ x^2 = 2$.
3. $\exists x \in \Q,\ x^2 = 2$.
4. $\forall n \in \N,\ n^2 \ge n$.
5. $\forall n \in \Z,\ n^2 > n$.
::: solution
1. True: the square of a real number is never negative.
2. True: $x = \sqrt 2$ is a witness.
3. False: $\sqrt 2$ is irrational ([[proofs/proof-techniques#thm-sqrt2]]), so no rational number squares to $2$. Statements 2 and 3 differ only in their domain.
4. True: for $n \ge 1$, multiplying $n \ge 1$ by $n > 0$ gives $n^2 \ge n$.
5. False: $n = 0$ gives $0 > 0$, which is false. (So does $n = 1$.) One counterexample is enough to make a universal statement false.
:::
:::

### Restricted quantifiers and translation

Often the variable ranges over a large domain, but the statement concerns only the elements with some property. "Every prime greater than $2$ is odd" quantifies over primes greater than $2$; in terms of the domain $\N$ it reads

$$
\forall n \in \N,\ \bigl( (n \text{ is prime} \land n > 2) \Rightarrow n \text{ is odd} \bigr).
$$

Similarly, "some prime is even" reads $\exists n \in \N,\ (n \text{ is prime} \land n \text{ is even})$. The pattern is worth memorising: **a universal quantifier pairs with an implication, an existential quantifier with a conjunction**. We abbreviate such statements as $\forall n > 2,\ \dots$ or $\exists p \text{ prime},\ \dots$, but the expanded forms are what the abbreviations mean.

::: warning ∃ goes with ∧, not ⇒
Writing "some prime is even" as $\exists n \in \N,\ (n \text{ is prime} \Rightarrow n \text{ is even})$ is a classic error. The implication is true for every $n$ that is not prime (vacuously), so $n = 4$, $n = 9$, … all witness this statement and it says nothing at all about primes. Likewise "every prime is odd" is *not* $\forall n,\ (n \text{ is prime} \land n \text{ is odd})$, which claims that every natural number is an odd prime.
:::

::: example Translating into symbols {#ex-translate-q}
Write each statement in symbols.

1. Every positive real number has a square root.
2. Some integer is not the square of an integer.
3. No odd integer is divisible by $4$.
4. The function $f\colon \R \to \R$ is bounded.
::: solution
1. $\forall x \in \R,\ \bigl(x > 0 \Rightarrow \exists y \in \R,\ y^2 = x\bigr)$, or with a restricted quantifier $\forall x > 0\ \exists y \in \R,\ y^2 = x$.
2. $\exists n \in \Z\ \forall m \in \Z,\ m^2 \neq n$. ("Not the square of any integer" is a universal statement about $m$.)
3. "No $A$ is $B$" means "every $A$ is not $B$": $\forall n \in \Z,\ (n \text{ odd} \Rightarrow 4 \nmid n)$. Equivalently $\neg\,\exists n \in \Z,\ (n \text{ odd} \land 4 \mid n)$.
4. Bounded means that a single bound $M$ works for every input: $\exists M \in \R\ \forall x \in \R,\ \abs{f(x)} \le M$.
:::
:::

Statements with several quantifiers are read from left to right, and each quantifier governs everything to its right. In $\forall x\ \exists y\ \forall z,\ P(x,y,z)$, the choice of $y$ may depend on $x$ but not on $z$.

::: example Statements with nested quantifiers {#ex-nested}
Write in symbols: (a) there are infinitely many primes; (b) between any two distinct real numbers there is a rational number; (c) the equation $x^2 = a$ has a real solution for every $a \ge 0$, but not for every real $a$.
::: solution
(a) "Infinitely many" is not a quantifier, so we rephrase: however large a number we name, there is a prime beyond it.

$$
\forall n \in \N\ \exists p \in \N,\ (p > n \land p \text{ is prime}).
$$

(b) "Any two distinct" means all pairs $x, y$ with $x \neq y$; we may name them so that $x < y$:

$$
\forall x \in \R\ \forall y \in \R,\ \bigl(x < y \Rightarrow \exists q \in \Q,\ x < q < y\bigr).
$$

(c) This is a conjunction of two statements, the second of which is negated:

$$
\bigl(\forall a \ge 0\ \exists x \in \R,\ x^2 = a\bigr) \land \neg\bigl(\forall a \in \R\ \exists x \in \R,\ x^2 = a\bigr).
$$

By [[#thm-negation]] below, the second part is equivalent to $\exists a \in \R\ \forall x \in \R,\ x^2 \neq a$ — witnessed by $a = -1$.
:::
:::

### Hidden quantifiers

Mathematical English often leaves quantifiers unspoken, and part of reading mathematics is putting them back.

- "If $x > 2$, then $x^2 > 4$" means $\forall x \in \R,\ (x > 2 \Rightarrow x^2 > 4)$. A conditional with a free variable is almost always meant universally.
- "$(x+1)^2 = x^2 + 2x + 1$" is an *identity*, a universal statement about all $x$; but "solve $x^2 = 2x + 3$" asks for the truth set of a predicate, and "$x^2 = 2x + 3$ has a solution" is existential.
- "A continuous function on $[a,b]$ is bounded" means *every* such function, although it says "a".
- "For any $\eps > 0$" means "for all $\eps > 0$". But "if $f(x) = 0$ for any $x$, then …" is ambiguous between "for all $x$" and "for some $x$". Write "for all" or "for some" and the problem disappears.

When you write mathematics, make every quantifier explicit; when you read it, find the hidden ones before trying to prove anything.

Some statements assert that *exactly one* object has a property.

::: definition Unique existence {#def-unique}
$\exists!\, x \in D,\ P(x)$, read "there is a unique $x$ in $D$ such that $P(x)$", means

$$
\exists x \in D,\ \Bigl(P(x) \land \forall y \in D,\ \bigl(P(y) \Rightarrow y = x\bigr)\Bigr).
$$
:::

A proof of unique existence therefore has two parts: **existence** (find an $x$ with $P(x)$) and **uniqueness** (show that any two objects with property $P$ are equal). For example, $\exists!\, x \in \R,\ 3x - 7 = 2$: the number $x = 3$ works, and if $3a - 7 = 2$ and $3b - 7 = 2$ then $3a = 3b$, so $a = b$.

## Negating quantified statements

To show that a universal statement is false we need one counterexample: "not every prime is odd" is the same as "some prime is not odd". To show that an existential statement is false we must rule out every candidate: "there is no rational $x$ with $x^2 = 2$" is the same as "every rational $x$ has $x^2 \neq 2$". These are the quantifier versions of De Morgan's laws.

::: theorem Negating quantifiers {#thm-negation}
For any predicate $P(x)$ with domain $D$,

$$
\neg\bigl(\forall x \in D,\ P(x)\bigr) \;\equiv\; \exists x \in D,\ \neg P(x), \qquad \neg\bigl(\exists x \in D,\ P(x)\bigr) \;\equiv\; \forall x \in D,\ \neg P(x).
$$
:::

::: proof
For the first: $\forall x \in D,\ P(x)$ is false exactly when it is not the case that $P(a)$ holds for every $a \in D$, that is, when there is at least one $a \in D$ for which $P(a)$ is false. That says precisely that $\exists x \in D,\ \neg P(x)$ is true. So the two sides are true in exactly the same circumstances.

For the second, apply the first to the predicate $\neg P(x)$: $\neg\bigl(\forall x,\ \neg P(x)\bigr) \equiv \exists x,\ \neg\neg P(x) \equiv \exists x,\ P(x)$. Negating both sides gives $\forall x,\ \neg P(x) \equiv \neg\bigl(\exists x,\ P(x)\bigr)$.
:::

When $D = \set{a_1, \dots, a_n}$ is finite, the theorem is exactly De Morgan's law [[proofs/propositional-logic#thm-de-morgan]] applied to $P(a_1)\land\dots\land P(a_n)$ and to $P(a_1) \lor \dots \lor P(a_n)$.

For a statement with several quantifiers we apply the theorem repeatedly. The negation sign moves from left to right, **flipping each quantifier it passes** ($\forall \leftrightarrow \exists$), until it reaches the predicate at the end, which we then negate with the rules of propositional logic: $\neg(p \Rightarrow q) \equiv p \land \neg q$, De Morgan's laws, and facts such as $\neg(x < y) \equiv x \ge y$. For example,

$$
\neg\bigl(\forall x\ \exists y\ \forall z,\ P(x,y,z)\bigr) \equiv \exists x\ \neg\bigl(\exists y\ \forall z,\ P\bigr) \equiv \exists x\ \forall y\ \neg\bigl(\forall z,\ P\bigr) \equiv \exists x\ \forall y\ \exists z,\ \neg P(x,y,z).
$$

::: warning Do not negate the restriction
The negation of "$\forall \eps > 0,\ Q(\eps)$" is "$\exists \eps > 0,\ \neg Q(\eps)$" — the restriction $\eps > 0$ stays as it is. The restriction is part of the domain, not part of the claim: $\forall \eps > 0,\ Q(\eps)$ abbreviates $\forall \eps\,(\eps > 0 \Rightarrow Q(\eps))$, whose negation is $\exists \eps\,(\eps > 0 \land \neg Q(\eps))$. Writing "$\exists \eps \le 0$" is a common error.
:::

::: example An unbounded function {#ex-unbounded}
Write down what it means for $f\colon\R\to\R$ to be **unbounded**, and prove that $f(x) = x^3$ is unbounded.
::: solution
From [[#ex-translate-q]], $f$ is bounded when $\exists M \in \R\ \forall x \in \R,\ \abs{f(x)} \le M$. Negating with [[#thm-negation]],

$$
f \text{ is unbounded} \iff \forall M \in \R\ \exists x \in \R,\ \abs{f(x)} > M.
$$

So we must show that for *every* $M$ we can *find* an $x$ with $\abs{x^3} > M$. Let $M \in \R$ be arbitrary and put $x = \abs{M} + 1$. Then $x \ge 1$, so $x^3 \ge x$, and

$$
\abs{f(x)} = x^3 \ge x = \abs{M} + 1 > M.
$$

Since $M$ was arbitrary, $f$ is unbounded. Notice that the $x$ we found depends on $M$, as the order "$\forall M\ \exists x$" allows.
:::
:::

::: example A sequence that does not converge {#ex-diverge}
A sequence $(a_n)$ **converges** to $L$ if $\forall \eps > 0\ \exists N \in \N\ \forall n \ge N,\ \abs{a_n - L} < \eps$. Negate this, and prove that $a_n = (-1)^n$ does not converge to any real number $L$.
::: solution
Pushing the negation through the three quantifiers,

$$
(a_n) \text{ does not converge to } L \iff \exists \eps > 0\ \forall N \in \N\ \exists n \ge N,\ \abs{a_n - L} \ge \eps.
$$

In words: there is a tolerance $\eps$ such that, however far along the sequence we start, some later term is at least $\eps$ away from $L$.

Let $L \in \R$ be arbitrary; we show the negated statement with $\eps = 1$. Let $N \in \N$. The terms $a_N$ and $a_{N+1}$ are $1$ and $-1$ in some order, and by the triangle inequality

$$
\abs{1 - L} + \abs{-1 - L} \ge \abs{(1 - L) - (-1 - L)} = 2,
$$

so at least one of $\abs{1 - L}$ and $\abs{-1 - L}$ is $\ge 1$. Hence one of $n = N$ or $n = N+1$ satisfies $n \ge N$ and $\abs{a_n - L} \ge 1$. As $N$ was arbitrary, $(a_n)$ does not converge to $L$; and as $L$ was arbitrary, it converges to no real number.
:::
:::

::: quiz
What is the negation of "every student in the class passed at least one exam"?
- [ ] Every student in the class failed at least one exam.
- [ ] No student in the class passed any exam.
- [x] Some student in the class failed every exam.
- [ ] Some student in the class failed at least one exam.
::: solution
In symbols the statement is $\forall s\ \exists e,\ \text{passed}(s, e)$. Its negation is $\exists s\ \forall e,\ \neg\text{passed}(s,e)$: some student failed every exam. Both quantifiers flip. The second option negates too much (it is the negation of "some student passed some exam"); the first flips neither quantifier, and the last flips only one.
:::
:::

## The order of quantifiers

Quantifiers of the same kind can be swapped freely: $\forall x\ \forall y,\ P(x,y)$ and $\forall y\ \forall x,\ P(x,y)$ both say that $P$ holds for every pair, and similarly two existential quantifiers commute. Mixed quantifiers are different, as the opening example showed.

::: theorem Swapping ∃ and ∀ {#thm-order}
For any predicate $P(x, y)$, with $x \in A$ and $y \in B$,

$$
\exists y \in B\ \forall x \in A,\ P(x,y) \quad\Longrightarrow\quad \forall x \in A\ \exists y \in B,\ P(x,y),
$$

but the converse implication fails in general.
:::

::: proof
Suppose $\exists y\ \forall x,\ P(x,y)$ is true, and choose $b \in B$ such that $P(x, b)$ holds for every $x \in A$. To prove the right-hand side, let $x \in A$ be arbitrary. Then $y = b$ satisfies $P(x, y)$. So for every $x$ there is a suitable $y$ — the same one each time.

For the converse, take $A = B = \R$ and let $P(x, y)$ be "$y > x$". The right-hand side $\forall x\ \exists y,\ y > x$ is true (take $y = x + 1$). The left-hand side $\exists y\ \forall x,\ y > x$ is false: its negation $\forall y\ \exists x,\ y \le x$ is true, because for any $y$ we can take $x = y$.
:::

The difference is one of **dependence**. In $\forall x\ \exists y$, the $y$ may be chosen *after* $x$ and may change when $x$ changes — in effect $y$ is a function of $x$. In $\exists y\ \forall x$, one $y$ must be chosen *before* $x$ and must work for all $x$ at once. "Everyone has a mother" is $\forall x\ \exists y$; "someone is everyone's mother" is $\exists y\ \forall x$.

::: widget relation
set: 1; 2; 3; 4
pairs: 1,2; 2,3; 3,4; 4,1
view: quantifiers
name: P
caption: A predicate $P(x,y)$ on a finite set is a relation: the entry in row $x$, column $y$ of the matrix is $1$ when $P(x,y)$ holds. Here every row contains a $1$, so $\forall x\,\exists y,\ P(x,y)$ is true; but no column is full, so $\exists y\,\forall x,\ P(x,y)$ is false. Click entries to fill a whole column (say column $1$) and both statements become true. Why can "$\forall x\,\exists y$" never be false while some column is full? That is [[#thm-order]].
:::

::: example Four statements about the integers {#ex-order}
Decide which of the following are true.

1. $\forall x \in \Z\ \exists y \in \Z,\ x + y = 0$.
2. $\exists y \in \Z\ \forall x \in \Z,\ x + y = 0$.
3. $\exists x \in \Z\ \forall y \in \Z,\ xy = 0$.
4. $\forall x \in \Z\ \exists y \in \Z,\ xy = 1$.
::: solution
1. True. Let $x \in \Z$ and take $y = -x$, which depends on $x$; then $x + y = 0$.
2. False. Its negation is $\forall y\ \exists x,\ x + y \neq 0$. Given any $y \in \Z$, take $x = 1 - y$; then $x + y = 1 \neq 0$.
3. True. Take $x = 0$: then $xy = 0$ for every $y$. A single $x$ works for all $y$.
4. False. Its negation is $\exists x\ \forall y,\ xy \neq 1$. Take $x = 2$: if $2y = 1$ then $y = \tfrac12 \notin \Z$, so $2y \neq 1$ for all $y \in \Z$. (Over the domain $\Q \setminus \set{0}$ for $x$ and $\Q$ for $y$, the statement becomes true: take $y = 1/x$.)
:::
:::

::: quiz
Which statement says that $f\colon\R\to\R$ is bounded above?
- [ ] $\forall x \in \R\ \exists M \in \R,\ f(x) \le M$
- [x] $\exists M \in \R\ \forall x \in \R,\ f(x) \le M$
- [ ] $\forall M \in \R\ \exists x \in \R,\ f(x) \le M$
- [ ] $\exists x \in \R\ \forall M \in \R,\ f(x) \le M$
::: solution
A bound is a single number $M$ that works for every $x$, so $\exists M$ must come first. The first option is true for *every* function (given $x$, take $M = f(x)$), so it says nothing. The third says that for every $M$ some value $f(x)$ is at most $M$, which means that $f$ is unbounded *below*. The last is false for every function, since $M = f(x) - 1$ fails.
:::
:::

## Quantifiers and connectives

How do quantifiers interact with $\land$ and $\lor$? Some combinations distribute and some do not, and the failures are as instructive as the laws.

::: theorem Distributing quantifiers {#thm-distribute}
For predicates $P(x)$ and $Q(x)$ with domain $D$:

1. $\forall x,\ \bigl(P(x) \land Q(x)\bigr) \;\equiv\; \bigl(\forall x,\ P(x)\bigr) \land \bigl(\forall x,\ Q(x)\bigr)$;
2. $\exists x,\ \bigl(P(x) \lor Q(x)\bigr) \;\equiv\; \bigl(\exists x,\ P(x)\bigr) \lor \bigl(\exists x,\ Q(x)\bigr)$;
3. $\bigl(\forall x,\ P(x)\bigr) \lor \bigl(\forall x,\ Q(x)\bigr) \;\Rightarrow\; \forall x,\ \bigl(P(x) \lor Q(x)\bigr)$, but not conversely.
:::

::: proof
1. If $P(a) \land Q(a)$ holds for every $a$, then in particular $P(a)$ holds for every $a$ and $Q(a)$ holds for every $a$. Conversely, if $P(a)$ holds for all $a$ and $Q(a)$ holds for all $a$, then for each $a$ both hold.

2. Negate both sides of 1 applied to $\neg P$ and $\neg Q$ and use [[#thm-negation]]: $\neg\forall x\,(\neg P \land \neg Q) \equiv \exists x\, \neg(\neg P \land \neg Q) \equiv \exists x\,(P \lor Q)$, while $\neg\bigl(\forall x\, \neg P \land \forall x\, \neg Q\bigr) \equiv \exists x\, P \lor \exists x\, Q$.

3. Suppose $P(a)$ holds for every $a$. Then $P(a) \lor Q(a)$ holds for every $a$. The same is true if $Q(a)$ holds for every $a$. For the failure of the converse, let $D = \Z$, $P(x)$: "$x$ is even" and $Q(x)$: "$x$ is odd". Every integer is even or odd, so the right-hand side is true; but neither "every integer is even" nor "every integer is odd" is true, so the left-hand side is false.
:::

The example in part 3 is worth remembering: "every integer is even or odd" is not the same as "every integer is even, or every integer is odd". Dually, $\exists x\,(P \land Q)$ implies $(\exists x\, P) \land (\exists x\, Q)$ but not conversely (see the exercises).

## Proving quantified statements

The logical form of a statement tells you how a proof of it must begin.

- **To prove $\forall x \in D,\ P(x)$**, start with "Let $x \in D$" (an *arbitrary* element, about which you assume nothing except membership of $D$) and prove $P(x)$. Because nothing special about $x$ was used, the argument works for every element.
- **To prove $\exists x \in D,\ P(x)$**, find a specific element — a **witness** — and verify that it has property $P$. (Occasionally existence can be shown without exhibiting a witness; see [[proofs/proof-techniques]].)
- **To disprove $\forall x,\ P(x)$**, prove $\exists x,\ \neg P(x)$: give a **counterexample**.
- **To disprove $\exists x,\ P(x)$**, prove $\forall x,\ \neg P(x)$.

Nested quantifiers are handled in order from left to right. A statement of the form $\forall \eps > 0\ \exists N\ \forall n \ge N,\ \dots$ is proved by: "Let $\eps > 0$. Put $N = \dots$ (an expression in $\eps$). Let $n \ge N$. Then …".

::: example An ε–N proof {#ex-eps-n}
Prove that the sequence $a_n = \dfrac{n}{n+1}$ converges to $1$.
::: solution
We must show $\forall \eps > 0\ \exists N \in \N\ \forall n \ge N,\ \abs{a_n - 1} < \eps$.

*Scratch work.* $\abs{a_n - 1} = \abs{\frac{n - (n+1)}{n+1}} = \frac{1}{n+1}$, which is less than $\eps$ once $n + 1 > 1/\eps$. Any $N > 1/\eps$ will do.

*Proof.* Let $\eps > 0$. By the Archimedean property of the real numbers ([[real-analysis/real-numbers]]) there is a natural number $N$ with $N > 1/\eps$. Let $n \ge N$. Then

$$
\abs{a_n - 1} = \frac{1}{n+1} < \frac{1}{n} \le \frac{1}{N} < \eps.
$$

Hence $a_n \to 1$. The $N$ we chose depends on $\eps$, as the order $\forall\eps\ \exists N$ permits; it does not depend on $n$, which is introduced only afterwards.
:::
:::

::: widget sequence
a: n/(n+1)
N: 40
limit: 1
epsilon: 0.08
caption: The band has half-width $\eps$ around the limit $1$, and the figure marks the first $N$ after which every term stays inside it. For $\eps = 0.08$ that is $N = 12$, as $\frac{1}{n+1} < 0.08$ exactly when $n > 11.5$. Shrink $\eps$: the required $N$ grows. That $N$ depends on $\eps$ is exactly what the order "$\forall \eps\ \exists N$" allows.
:::

::: application Continuity and uniform continuity
A function $f$ is **continuous** on a set $D$ if

$$
\forall x \in D\ \forall \eps > 0\ \exists \delta > 0\ \forall y \in D,\ \bigl(\abs{x - y} < \delta \Rightarrow \abs{f(x) - f(y)} < \eps\bigr),
$$

and **uniformly continuous** on $D$ if

$$
\forall \eps > 0\ \exists \delta > 0\ \forall x \in D\ \forall y \in D,\ \bigl(\abs{x - y} < \delta \Rightarrow \abs{f(x) - f(y)} < \eps\bigr).
$$

The only difference is where $\forall x$ stands. In the first, $\delta$ may depend on the point $x$ as well as on $\eps$; in the second, one $\delta$ must serve every point. By [[#thm-order]], uniform continuity implies continuity. The converse fails: $f(x) = 1/x$ is continuous on $(0, 1)$, but the $\delta$ that works at $x$ for a given $\eps$ shrinks to $0$ as $x \to 0$, so no single $\delta$ serves all points. The same swap distinguishes pointwise from uniform convergence of functions, a distinction at the heart of [[real-analysis/uniform-convergence]].
:::

::: widget limit
f: 1/x
a: 0.2
L: 5
epsilon: 0.5
x: 0, 1
y: 0, 10
caption: Continuity of $1/x$ at the point $a = 0.2$ with tolerance $\eps = 0.5$: the largest $\delta$ that works is tiny, about $0.018$ (it equals $a^2\eps/(1 + a\eps)$). At $a = 1$ the same $\eps$ allows $\delta = 1/3$. As $a$ approaches $0$ the admissible $\delta$ tends to $0$, which is why $1/x$ is continuous but not uniformly continuous on $(0,1)$.
:::

::: quiz
Which of these is a correct way to begin a proof of "$\forall x \in \R\ \exists y \in \R,\ x < y^2$"?
- [ ] Let $y = x + 1$. Then for every $x$ …
- [x] Let $x \in \R$ be arbitrary. Put $y = \abs{x} + 1$. Then …
- [ ] Choose $x = 0$ and $y = 1$; then $0 < 1$, so the statement holds.
- [ ] Let $x, y \in \R$ be arbitrary. Then …
::: solution
The statement begins with $\forall x$, so we fix an arbitrary $x$; then, because of $\exists y$, we choose a $y$, which may depend on $x$. With $y = \abs{x}+1$ we get $y^2 \ge y > \abs{x} \ge x$ (since $y \ge 1$). The first option chooses $y$ before $x$ exists; the third checks a single case, which proves nothing about every $x$; the last treats $y$ as arbitrary, which would be a (false) universal claim about $y$.
:::
:::

::: history
Aristotle's logic already contained quantified sentences of four kinds — "all $S$ are $P$", "no $S$ is $P$", "some $S$ is $P$" and "some $S$ is not $P$" — and the traditional *square of opposition* records that "all $S$ are $P$" and "some $S$ is not $P$" are each other's negations, an early form of [[#thm-negation]]. But Aristotelian logic could not handle nested quantifiers such as "every number has a larger one". The modern theory began with Gottlob Frege's *Begriffsschrift* (1879), which introduced quantified variables and could express statements of any depth; Charles Sanders Peirce and his student Oscar Howard Mitchell developed quantifiers independently in the early 1880s. The notation came later: Giuseppe Peano introduced a reversed E for "there exists" in 1897, and Gerhard Gentzen introduced the turned A, $\forall$, by analogy in 1935. Meanwhile the ε–δ definitions of Karl Weierstrass, from the 1850s and 1860s, had shown how much of analysis consists of getting quantifiers in the right order.
:::

## Where this leads

Quantifiers are everywhere from now on. Sets are described by predicates, as in $\set{x \in \R : x^2 < 2}$ ([[proofs/sets]]); a function is injective when $\forall a, b,\ (f(a) = f(b) \Rightarrow a = b)$ and surjective when $\forall y\ \exists x,\ f(x) = y$ ([[proofs/functions]]). The proof strategies of the last section are developed in [[proofs/proof-techniques]], and the ε–δ and ε–$N$ definitions of [[calculus-1/limits]], [[real-analysis/sequences]] and [[real-analysis/continuity]] are the main proving ground for nested quantifiers. Formal predicate logic, with axioms for quantifiers and Gödel's completeness and incompleteness theorems, is the subject of mathematical logic.

::: summary
- A predicate $P(x)$ becomes a proposition when $x$ is given a value from its domain, or when it is quantified: $\forall x \in D,\ P(x)$ (true if $P$ holds for every element) or $\exists x \in D,\ P(x)$ (true if it holds for at least one).
- Restricted quantifiers expand as $\forall x\,(x \in A \Rightarrow \dots)$ and $\exists x\,(x \in A \land \dots)$: $\forall$ pairs with $\Rightarrow$, $\exists$ with $\land$.
- Negation flips each quantifier and negates the predicate: $\neg\forall x\, P \equiv \exists x\,\neg P$ and $\neg\exists x\, P \equiv \forall x\, \neg P$ ([[#thm-negation]]). Restrictions such as $\eps > 0$ are not negated.
- The order of mixed quantifiers matters: $\exists y\,\forall x$ implies $\forall x\,\exists y$, not conversely ([[#thm-order]]). In $\forall x\,\exists y$ the $y$ may depend on $x$.
- $\forall$ distributes over $\land$ and $\exists$ over $\lor$, but "every integer is even or odd" is not "every integer is even or every integer is odd".
- To prove $\forall x$: take an arbitrary $x$. To prove $\exists x$: produce a witness. To disprove $\forall x$: give a counterexample. $\exists!$ needs existence and uniqueness.
:::

## Exercises

::: exercise True or false? {level=1}
Decide whether each statement is true, with a reason.

1. $\forall x \in \R,\ x^2 + 1 > 0$.
2. $\exists n \in \N,\ n^2 = 2n$.
3. $\forall n \in \N,\ n^2 \ge 2n - 1$.
4. $\exists x \in \R,\ x^2 < 0$.
::: solution
1. True: $x^2 \ge 0$, so $x^2 + 1 \ge 1 > 0$.
2. True: $n = 2$ is a witness ($4 = 4$).
3. True: $n^2 - 2n + 1 = (n-1)^2 \ge 0$ for every $n$.
4. False: by [[#thm-negation]] we must show $\forall x \in \R,\ x^2 \ge 0$, which holds.
:::
:::

::: exercise Negations {level=1}
Write the negation of each statement with the $\neg$ moved all the way inside, and say which of each pair is true.

1. $\forall x \in \R\ \exists y \in \R,\ x + y = 0$.
2. $\exists n \in \Z,\ (n > 0 \land n^2 < n)$.
3. $\forall x \in \R,\ (x > 1 \Rightarrow x^2 > x)$.
::: solution
1. $\exists x \in \R\ \forall y \in \R,\ x + y \neq 0$. The original is true ($y = -x$), so the negation is false.
2. $\forall n \in \Z,\ (n \le 0 \lor n^2 \ge n)$. The negation is true: if $n \ge 1$ then $n^2 \ge n$. So the original is false.
3. $\exists x \in \R,\ (x > 1 \land x^2 \le x)$. The original is true (if $x > 1$ then $x^2 = x \cdot x > x$), so the negation is false.
:::
:::

::: exercise Increasing functions {level=1}
A function $f\colon \R\to\R$ is *increasing* if $x < y$ implies $f(x) \le f(y)$. Write this definition, and its negation, in symbols. Use the negation to show that $f(x) = x^2$ is not increasing.
::: solution
Increasing: $\forall x \in \R\ \forall y \in \R,\ \bigl(x < y \Rightarrow f(x) \le f(y)\bigr)$. Negation: $\exists x \in \R\ \exists y \in \R,\ \bigl(x < y \land f(x) > f(y)\bigr)$. For $f(x) = x^2$ take $x = -2$ and $y = 0$: then $x < y$ and $f(x) = 4 > 0 = f(y)$.
:::
:::

::: exercise A truth set {level=1 check="5"}
How many integers $n$ with $1 \le n \le 20$ satisfy $\exists m \in \Z,\ n = m^2 + 1$?
::: solution
As $m$ runs through the integers, $m^2 + 1$ takes the values $1, 2, 5, 10, 17, 26, \dots$ (from $m = 0, \pm1, \pm2, \pm3, \pm4, \pm5, \dots$). Those between $1$ and $20$ are $1, 2, 5, 10, 17$: there are $5$.
:::
:::

::: exercise Divisibility and quantifier order {level=2}
On the domain $\N$, let $P(x, y)$ be "$x$ divides $y$". Which of the following are true?

1. $\forall x\ \exists y,\ P(x,y)$
2. $\exists y\ \forall x,\ P(x,y)$
3. $\exists x\ \forall y,\ P(x,y)$
4. $\forall y\ \exists x,\ P(x,y)$
::: solution
1. True: every $x$ divides $y = x$ (or $2x$, …).
2. False: no positive integer $y$ is divisible by every positive integer, since $y + 1 > y$ does not divide $y$. (Formally, the negation $\forall y\ \exists x,\ x \nmid y$ holds with $x = y+1$.)
3. True: $x = 1$ divides every $y$.
4. True: take $x = 1$ (or $x = y$).

Statements 1 and 2 illustrate [[#thm-order]]: swapping the quantifiers turns a true statement into a false one.
:::
:::

::: exercise Unique existence {level=2}
Express $\exists!\, x,\ P(x)$ using only $\exists$, $\forall$, $=$ and connectives, then negate your formula and interpret the negation in words.
::: solution
By [[#def-unique]], $\exists!\,x,\ P(x)$ is $\exists x\,\bigl(P(x) \land \forall y\,(P(y) \Rightarrow y = x)\bigr)$. Its negation is

$$
\forall x\,\bigl(\neg P(x) \lor \exists y\,(P(y) \land y \neq x)\bigr), \quad\text{equivalently}\quad \forall x\,\bigl(P(x) \Rightarrow \exists y\,(P(y) \land y \neq x)\bigr).
$$

In words: every object with property $P$ has a *different* object with property $P$ alongside it. That happens exactly when no object has property $P$, or at least two do — the two ways in which "exactly one" can fail.
:::
:::

::: exercise ∃ does not distribute over ∧ {level=2}
Prove that $\exists x\,\bigl(P(x)\land Q(x)\bigr) \Rightarrow \bigl(\exists x\, P(x)\bigr) \land \bigl(\exists x\, Q(x)\bigr)$, and give an example showing that the converse is false.
::: solution
If some $a$ satisfies $P(a) \land Q(a)$, then $a$ is a witness for $\exists x\, P(x)$ and also for $\exists x\, Q(x)$. For the converse, take the domain $\Z$ with $P(x)$: "$x$ is even" and $Q(x)$: "$x$ is odd". There is an even integer and there is an odd integer, so the right-hand side is true; but no integer is both even and odd, so the left-hand side is false.
:::
:::

::: exercise Another divergent sequence {level=2}
Using the negated definition from [[#ex-diverge]], prove that the sequence $a_n = n$ does not converge to any real number $L$.
::: hint
Take $\eps = 1$. Given $N$, choose $n \ge N$ much larger than $\abs{L}$.
:::
::: solution
Let $L \in \R$; we prove $\exists \eps > 0\ \forall N\ \exists n \ge N,\ \abs{n - L} \ge \eps$ with $\eps = 1$. Let $N \in \N$. Choose a natural number $n \ge \max(N, \abs{L} + 1)$, which exists by the Archimedean property. Then $n \ge N$ and

$$
\abs{n - L} \ge n - \abs{L} \ge 1 = \eps.
$$

So $(a_n)$ does not converge to $L$, and since $L$ was arbitrary it does not converge at all.
:::
:::

::: exercise The order matters in analysis {level=3}
Prove that the statement
$$
\forall \eps > 0\ \exists \delta > 0\ \forall x \in \R,\ \bigl(\abs{x} < \delta \Rightarrow \abs{3x} < \eps\bigr)
$$
is true, but that
$$
\exists \delta > 0\ \forall \eps > 0\ \forall x \in \R,\ \bigl(\abs{x} < \delta \Rightarrow \abs{3x} < \eps\bigr)
$$
is false.
::: hint
For the second, write down its negation: for every $\delta$ you must find an $\eps$ and an $x$.
:::
::: solution
*First statement.* Let $\eps > 0$ and put $\delta = \eps/3$. If $\abs{x} < \delta$ then $\abs{3x} = 3\abs{x} < 3\delta = \eps$.

*Second statement.* Its negation is $\forall \delta > 0\ \exists \eps > 0\ \exists x \in \R,\ \bigl(\abs{x} < \delta \land \abs{3x} \ge \eps\bigr)$. Let $\delta > 0$. Put $x = \delta/2$ and $\eps = 3\delta/2$. Then $\abs{x} = \delta/2 < \delta$ and $\abs{3x} = 3\delta/2 = \eps$, so $\abs{3x} \ge \eps$. The negation is true, so the second statement is false. (It would say that some fixed interval around $0$ is mapped by $x \mapsto 3x$ into *every* interval $(-\eps, \eps)$, i.e. into $\set{0}$.)
:::
:::

::: exercise A function that is not uniformly continuous {level=3}
Using the definition in the application above, write down what it means for $f$ *not* to be uniformly continuous on $\R$, and prove that $f(x) = x^2$ is not uniformly continuous on $\R$.
::: hint
Take $\eps = 1$. For a given $\delta$, use two points $x$ and $x + \delta/2$ with $x$ large.
:::
::: solution
Negating the definition,

$$
\exists \eps > 0\ \forall \delta > 0\ \exists x, y \in \R,\ \bigl(\abs{x - y} < \delta \land \abs{f(x) - f(y)} \ge \eps\bigr).
$$

Take $\eps = 1$ and let $\delta > 0$. Put $x = 1/\delta$ and $y = x + \delta/2$. Then $\abs{x - y} = \delta/2 < \delta$, and

$$
\abs{y^2 - x^2} = (y - x)(y + x) = \frac{\delta}{2}\left(\frac{2}{\delta} + \frac{\delta}{2}\right) = 1 + \frac{\delta^2}{4} \ge 1 = \eps.
$$

So $f$ is not uniformly continuous on $\R$: however small $\delta$ is, far enough out two points within $\delta$ of each other have squares differing by at least $1$. (On a bounded interval such as $[0, 1]$, by contrast, $x^2$ *is* uniformly continuous; see [[real-analysis/continuity]].)
:::
:::
