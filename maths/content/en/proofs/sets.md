Which integers can be written in the form $4a + 6b$ with $a$ and $b$ integers? A few experiments — $4\cdot 1 + 6\cdot 0 = 4$, $4\cdot(-1) + 6\cdot 1 = 2$, $4\cdot(-3) + 6\cdot 2 = 0$, $4\cdot 2 + 6\cdot 1 = 14$ — suggest the answer "exactly the even integers". To *prove* it we must show that two collections of numbers, the numbers of the form $4a+6b$ and the even numbers, are the same collection. That requires saying precisely what a collection is, and what it means for two collections to be equal. This is the job of set theory.

Sets are the raw material of modern mathematics. The number systems $\N$, $\Z$, $\Q$ and $\R$ are sets; an interval is a set of real numbers; the solutions of an equation form a set; a function ([[proofs/functions]]) is a special kind of set of ordered pairs; vector spaces, groups and probability spaces are sets with extra structure. In this chapter we learn the notation, the operations of union, intersection and complement, and the standard method for proving that two sets are equal — prove two inclusions. Throughout, the logic of [[proofs/propositional-logic]] and [[proofs/quantifiers]] does the real work: every statement about sets unpacks into a statement about elements.

## Sets and elements

Informally, a **set** is a collection of objects, called its **elements** or **members**. We write $x \in A$ for "$x$ is an element of $A$" and $x \notin A$ for its negation. The single most important fact about sets is that a set is determined by its elements and by nothing else.

::: definition Equality of sets {#def-set-equality}
Two sets $A$ and $B$ are **equal**, written $A = B$, if they have exactly the same elements:

$$
A = B \quad\text{means}\quad \forall x\ \bigl(x \in A \Leftrightarrow x \in B\bigr).
$$
:::

So the order in which elements are listed, and any repetitions, are irrelevant: $\set{1,2,3} = \set{3,1,2} = \set{1,1,2,3}$, because each of these sets has the same elements, namely $1$, $2$ and $3$.

There are two common ways to describe a set.

- **Roster notation** lists the elements between braces: $\set{2,3,5,7}$. An ellipsis may be used when the pattern is unmistakable, as in $\set{1,2,\dots,100}$ or $\set{2,4,6,\dots}$.
- **Set-builder notation** describes the elements by a property. If $A$ is a set and $P(x)$ is a predicate, then $\set{x \in A : P(x)}$ is the set of those elements of $A$ for which $P(x)$ is true; for example $\set{n \in \Z : n^2 < 10} = \set{-3,-2,-1,0,1,2,3}$. A variant collects the values of an expression: $\set{n^2 : n \in \Z} = \set{0,1,4,9,\dots}$ is the set of perfect squares, and $\set{4a+6b : a,b\in\Z}$ is the set from the opening question. (Some books write a vertical bar, $\set{x\in A \mid P(x)}$; the meaning is the same.)

We use the standard number sets

$$
\N = \set{1,2,3,\dots},\qquad \N_0 = \set{0,1,2,\dots},\qquad \Z,\qquad \Q,\qquad \R,\qquad \C,
$$

the **intervals** such as $[a,b] = \set{x\in\R : a \le x \le b}$, $(a,b) = \set{x \in \R : a < x < b}$ and $[a,\infty) = \set{x\in\R : x\ge a}$, and the abbreviation $[n] = \set{1,2,\dots,n}$. Conventions differ on whether $0 \in \N$; in this course it is not, and we write $\N_0$ when we want to include it.

The set with no elements at all is the **empty set**, written $\varnothing$. There is only one: if $E$ and $E'$ both have no elements, then $x \in E \Leftrightarrow x\in E'$ is true for every $x$ (both sides are false), so $E = E'$ by [[#def-set-equality]]. The empty set turns up constantly — as the set of real solutions of $x^2 = -1$, or as the intersection of two sets with nothing in common.

The elements of a set can themselves be sets. The set $\set{\varnothing}$ is *not* empty: it has exactly one element, namely $\varnothing$. Think of $\varnothing$ as an empty bag and $\set{\varnothing}$ as a bag containing an empty bag. Similarly $\set{1,\set{1}}$ has two elements, the number $1$ and the set $\set{1}$. For a finite set $A$ we write $\abs{A}$ for the number of elements of $A$; thus $\abs{\varnothing} = 0$, $\abs{\set{\varnothing}} = 1$ and $\abs{\set{1,\set{1}}} = 2$. Sizes of infinite sets are the subject of [[proofs/cardinality]].

::: quiz
How many elements does the set $\set{\varnothing,\ \set{\varnothing},\ \set{1,2},\ \set{2,1}}$ have?
- [ ] $0$
- [ ] $2$
- [x] $3$
- [ ] $4$
::: solution
The sets $\set{1,2}$ and $\set{2,1}$ have the same elements, so they are equal and count only once. The remaining elements $\varnothing$ and $\set{\varnothing}$ differ from each other (one has no elements, the other has one) and from $\set{1,2}$. So the set is $\set{\varnothing, \set{\varnothing}, \set{1,2}}$, with three elements. Note that $\varnothing$ counts as an element here: being empty is a property of the elements *of* $\varnothing$, not a reason to ignore $\varnothing$ when it sits inside another set.
:::
:::

## Subsets and double inclusion {#subsets}

::: definition Subset {#def-subset}
Let $A$ and $B$ be sets. We say $A$ is a **subset** of $B$, and write $A \subseteq B$, if every element of $A$ is an element of $B$:

$$
A \subseteq B \quad\text{means}\quad \forall x\ \bigl(x\in A \Rightarrow x \in B\bigr).
$$

If $A \subseteq B$ and $A \ne B$, then $A$ is a **proper subset** of $B$, written $A \subsetneq B$.
:::

For example $\N \subseteq \Z \subseteq \Q \subseteq \R$, and all three inclusions are proper. The symbol $\subset$ is used by some authors for $\subseteq$ and by others for $\subsetneq$, which is why we avoid it.

To prove $A \subseteq B$ we follow the shape of the definition: *let $x \in A$ be arbitrary* and deduce that $x \in B$. To disprove it we need just one element of $A$ that is not in $B$ — a counterexample, as the rules for negating quantifiers ([[proofs/quantifiers#thm-negation]]) dictate.

::: theorem Basic properties of inclusion {#thm-subset-props}
For all sets $A$, $B$ and $C$:

1. $\varnothing \subseteq A$;
2. $A \subseteq A$;
3. if $A \subseteq B$ and $B \subseteq C$, then $A \subseteq C$;
4. $A = B$ if and only if $A \subseteq B$ and $B \subseteq A$.
:::

::: proof
1. We must show that $x \in \varnothing \Rightarrow x \in A$ for every $x$. The hypothesis $x \in\varnothing$ is false for every $x$, so the implication is (vacuously) true.
2. For every $x$, the implication $x \in A \Rightarrow x \in A$ is true.
3. Let $x \in A$. Since $A \subseteq B$, we have $x \in B$; since $B\subseteq C$, we have $x\in C$. As $x$ was an arbitrary element of $A$, this proves $A \subseteq C$.
4. The biconditional $x\in A \Leftrightarrow x\in B$ is equivalent to the conjunction of $x\in A \Rightarrow x\in B$ and $x\in B \Rightarrow x \in A$. Hence "$x\in A \Leftrightarrow x\in B$ for every $x$" holds exactly when "$x \in A \Rightarrow x\in B$ for every $x$" and "$x\in B\Rightarrow x\in A$ for every $x$" both hold, that is, when $A\subseteq B$ and $B \subseteq A$.
:::

Part 4 is the workhorse of the subject. To prove that two sets are equal we usually prove **double inclusion**: first $A\subseteq B$, then $B \subseteq A$, each time starting from an arbitrary element.

::: example The opening question {#ex-4a6b}
Prove that $\set{4a + 6b : a, b\in\Z} = \set{2k : k\in\Z}$.
::: solution
Call the left-hand set $S$ and the right-hand set $E$ (the even integers).

*$S \subseteq E$.* Let $x\in S$. Then $x = 4a+6b$ for some integers $a$ and $b$, so $x = 2(2a+3b)$ with $2a+3b\in\Z$. Hence $x \in E$.

*$E \subseteq S$.* Let $x \in E$, say $x = 2k$ with $k\in\Z$. We need integers $a, b$ with $4a + 6b = 2k$. Since $4\cdot(-1) + 6 \cdot 1 = 2$, multiplying by $k$ gives $4(-k) + 6k = 2k$. So $x = 4a + 6b$ with $a = -k$ and $b = k$, and $x\in S$.

By [[#thm-subset-props]], part 4, $S = E$.
:::
:::

The two halves of this proof differ in character. The first is a computation; the second needs an idea (writing $2$ itself in the required form). This is typical: one inclusion is often routine and the other is where the content lies. The general question — which integers have the form $ma + nb$ — leads to Bézout's identity in [[number-theory/divisibility]].

::: example Solving an inequality is proving a set equality {#ex-inequality}
Show that $\set{x\in\R : x^2 < x} = (0,1)$.
::: solution
Here a chain of equivalences proves both inclusions at once. For a real number $x$,

$$
x^2 < x \iff x^2 - x < 0 \iff x(x-1) < 0 \iff 0 < x < 1.
$$

The last step holds because a product of two real numbers is negative exactly when the factors have opposite signs; since $x - 1 < x$, the only possibility is $x - 1 < 0 < x$. So $x$ belongs to the left-hand set if and only if $x\in(0,1)$, and the sets are equal by [[#def-set-equality]].
:::
:::

::: example Multiples of 2 and of 3 {#ex-six}
For $d \in \N$ write $d\Z = \set{dk : k \in \Z}$ for the set of multiples of $d$. Prove that $2\Z \cap 3\Z = 6\Z$.
::: solution
*$6\Z \subseteq 2\Z\cap 3\Z$.* If $x = 6k$ then $x = 2(3k)\in 2\Z$ and $x = 3(2k) \in 3\Z$.

*$2\Z\cap 3\Z \subseteq 6\Z$.* Let $x \in 2\Z\cap3\Z$, say $x = 2a$ and $x = 3b$ with $a,b\in\Z$. The trick is to write $x = 3x - 2x$ and use a *different* description of $x$ in each term:

$$
x = 3x - 2x = 3(2a) - 2(3b) = 6a - 6b = 6(a-b),
$$

so $x\in 6\Z$. The same idea shows $m\Z \cap n\Z = mn\Z$ whenever some combination $um + vn$ equals $1$, which is the case exactly when $m$ and $n$ have no common factor greater than $1$ ([[number-theory/divisibility]]). Without that condition the statement fails: $2\Z \cap 4\Z = 4\Z \neq 8\Z$.
:::
:::

::: warning ∈ is not ⊆
The symbols $\in$ and $\subseteq$ relate different kinds of thing. "$x \in A$" says that $x$ is one of the elements of $A$; "$S \subseteq A$" says that every element of $S$ is an element of $A$. For $A = \set{1,2}$ we have $1\in A$ and $\set{1} \subseteq A$, but $\set{1}\notin A$ (the elements of $A$ are numbers, not sets) and "$1 \subseteq A$" is meaningless (a number is not a set). The two can hold simultaneously: for $B = \set{1,\set{1}}$ both $\set{1} \in B$ and $\set{1}\subseteq B$ are true. Before writing either symbol, ask whether the object on the left is an element or a collection of elements.
:::

## Operations on sets

In most discussions all the sets involved are subsets of some fixed **universal set** $U$ — for instance $U = \R$ when we talk about intervals. Within $U$ we can combine sets as follows.

::: definition Union, intersection, difference and complement {#def-operations}
Let $A$ and $B$ be subsets of a universal set $U$.

- The **union** is $A\cup B = \set{x : x\in A \text{ or } x\in B}$.
- The **intersection** is $A \cap B = \set{x : x\in A \text{ and } x\in B}$.
- The **difference** is $A\setminus B = \set{x : x\in A \text{ and } x\notin B}$.
- The **complement** is $A^c = U\setminus A = \set{x \in U : x \notin A}$.
- The **symmetric difference** is $A \mathbin{\triangle} B = (A\setminus B) \cup (B \setminus A)$, the set of elements that lie in exactly one of $A$ and $B$.

$A$ and $B$ are **disjoint** if $A \cap B = \varnothing$.
:::

The "or" in the union is inclusive: an element of both $A$ and $B$ belongs to $A \cup B$. Unlike the other operations, the complement depends on the universe: the complement of $\N$ is $\set{0,-1,-2,\dots}$ in $U = \Z$, but it contains $\tfrac12$ and $\pi$ when $U = \R$.

::: example A finite computation {#ex-compute}
Let $U = [10]$, $A = \set{1,2,3,4,5,6}$, $B = \set{2,4,6,8,10}$ and $C = \set{3,6,9}$. Compute $A\cap B$, $A \cup C$, $A \setminus B$, $B^c$, $A \mathbin{\triangle} B$ and $(A\cup B)^c \cap C$.
::: solution
Working element by element:

- $A \cap B = \set{2,4,6}$, the even elements of $A$;
- $A\cup C = \set{1,2,3,4,5,6,9}$;
- $A\setminus B = \set{1,3,5}$;
- $B^c = \set{1,3,5,7,9}$;
- $A\mathbin{\triangle} B = (A\setminus B) \cup (B\setminus A) = \set{1,3,5} \cup \set{8,10} = \set{1,3,5,8,10}$;
- $A\cup B = \set{1,2,3,4,5,6,8,10}$, so $(A\cup B)^c = \set{7,9}$ and $(A\cup B)^c\cap C = \set{9}$.

As a check on the last answer: $9$ is the only element of $C$ that is neither in $A$ nor even.
:::
:::

Pictures help. In a **Venn diagram** the universe is a rectangle and each set is a region inside it. Two overlapping circles cut the rectangle into four regions and three circles into eight — one region for each combination of "in" or "out" of each set.

::: widget venn
sets: 2
expr: (A - B) | (B - A)
labels: A; B
caption: The shaded region is the symmetric difference $A \mathbin{\triangle} B$. Type other expressions — try `A & B`, `A - B` and `A'` — and then compare `(A | B)'` with `A' & B'`. The last two shade the same region: that is De Morgan's law, proved below.
:::

Every set operation is a logical connective in disguise. Unwinding the definitions for an element $x$ of $U$:

| statement about sets | statement about an element $x$ |
|---|---|
| $x \in A \cup B$ | $(x\in A) \lor (x \in B)$ |
| $x\in A\cap B$ | $(x\in A)\land(x\in B)$ |
| $x\in A^c$ | $\neg(x\in A)$ |
| $x\in A\setminus B$ | $(x\in A) \land \neg(x\in B)$ |
| $x \in A\mathbin{\triangle}B$ | exactly one of $x\in A$ and $x \in B$ |
| $A \subseteq B$ | $\forall x\ \bigl((x\in A) \Rightarrow (x\in B)\bigr)$ |
| $A = B$ | $\forall x\ \bigl((x\in A)\Leftrightarrow(x\in B)\bigr)$ |

This dictionary is the reason why the algebra of sets looks exactly like the algebra of propositions.

## The algebra of sets

::: theorem Laws of the algebra of sets {#thm-set-laws}
Let $A$, $B$ and $C$ be subsets of a universal set $U$. Then:

1. (commutative) $A\cup B = B\cup A$ and $A\cap B = B\cap A$;
2. (associative) $A\cup(B\cup C) = (A\cup B)\cup C$ and $A\cap(B\cap C) = (A\cap B)\cap C$;
3. (distributive) $A\cap(B\cup C) = (A\cap B)\cup(A\cap C)$ and $A\cup(B\cap C) = (A\cup B)\cap(A\cup C)$;
4. (identity and domination) $A \cup\varnothing = A$, $A\cap U = A$, $A\cap\varnothing = \varnothing$ and $A \cup U = U$;
5. (complement) $A\cup A^c = U$, $A\cap A^c = \varnothing$ and $(A^c)^c = A$;
6. (idempotent) $A\cup A = A$ and $A \cap A = A$;
7. (absorption) $A\cup(A\cap B) = A$ and $A\cap(A\cup B) = A$.
:::

::: proof
Each law is a law of propositional logic applied to the statements $p = (x\in A)$, $q = (x\in B)$ and $r = (x\in C)$ for an arbitrary $x \in U$. We give the first distributive law in full; the others are proved in exactly the same way. Let $x\in U$. Then

$$
\begin{aligned}
x\in A\cap(B\cup C) &\iff x\in A \ \land\ (x\in B \lor x\in C)\\
&\iff (x\in A\land x\in B) \ \lor\ (x\in A \land x\in C)\\
&\iff x\in A\cap B \ \lor\ x\in A\cap C\\
&\iff x\in (A\cap B)\cup(A\cap C).
\end{aligned}
$$

The second step is the distributive law $p\land(q\lor r)\equiv(p\land q)\lor(p\land r)$ of propositional logic; the other steps are the definitions. Since $x$ was arbitrary, the two sets have the same elements.

For absorption, $x\in A\cup(A\cap B)$ means $p\lor(p\land q)$, and $p \lor (p\land q)\equiv p$: if $p$ is true both sides are true, and if $p$ is false both sides are false. So $x \in A\cup(A\cap B) \iff x\in A$. The remaining laws correspond in the same way to the commutative, associative, identity, complement and idempotent laws of logic.
:::

Laws like these can also be proved in the "element-chasing" style of double inclusion, without quoting any logic. We do this for the most important pair.

::: theorem De Morgan's laws for sets {#thm-set-de-morgan}
For all sets $A$, $B$ and $C$,

$$
C\setminus(A\cup B) = (C\setminus A)\cap(C\setminus B) \qquad\text{and}\qquad C\setminus(A\cap B) = (C\setminus A)\cup(C\setminus B).
$$

In particular, for subsets of a universal set $U$, $(A\cup B)^c = A^c\cap B^c$ and $(A\cap B)^c = A^c\cup B^c$.
:::

::: proof
*First law, $\subseteq$.* Let $x\in C\setminus(A\cup B)$. Then $x\in C$ and $x\notin A\cup B$. If $x$ were in $A$ it would be in $A\cup B$, so $x\notin A$; likewise $x\notin B$. Hence $x\in C\setminus A$ and $x\in C\setminus B$, so $x\in(C\setminus A)\cap(C\setminus B)$.

*First law, $\supseteq$.* Let $x\in (C\setminus A)\cap(C\setminus B)$. Then $x\in C$, $x\notin A$ and $x\notin B$. Every element of $A\cup B$ lies in $A$ or in $B$, so $x\notin A\cup B$, and therefore $x\in C\setminus(A\cup B)$.

*Second law, $\subseteq$.* Let $x\in C\setminus(A\cap B)$, so $x\in C$ and $x\notin A\cap B$. Then $x \notin A$ or $x\notin B$, for if both $x \in A$ and $x \in B$ held then $x$ would lie in $A\cap B$. In the first case $x\in C\setminus A$, in the second $x\in C\setminus B$; either way $x\in(C\setminus A)\cup(C\setminus B)$.

*Second law, $\supseteq$.* Let $x\in(C\setminus A)\cup(C\setminus B)$. If $x\in C\setminus A$, then $x\in C$ and $x\notin A$, so $x \notin A\cap B$; similarly if $x\in C\setminus B$. Either way $x\in C \setminus (A\cap B)$.

Taking $C = U$ gives the statements about complements.
:::

The proof is De Morgan's law for propositions, $\neg(p\lor q)\equiv \neg p\land\neg q$ and $\neg(p\land q) \equiv \neg p\lor\neg q$ ([[proofs/propositional-logic#thm-de-morgan]]), written out element by element. In words: to be outside a union you must be outside every piece, but to be outside an intersection it is enough to be outside one piece.

::: widget venn
sets: 3
expr: A & (B | C)
labels: A; B; C
caption: The region $A \cap (B \cup C)$. Now type `(A & B) | (A & C)` — the same region, as the distributive law says. Compare `A | (B & C)` with `(A | B) & (A | C)` as well. Then test a false "law", `A - (B - C)` against `(A - B) - C`: the regions differ, and any point in the difference gives a counterexample.
:::

Once proved, the laws can be combined algebraically, much as in school algebra.

::: example Simplifying with the laws {#ex-simplify}
Show that $(A\cup B)\cap(A\cup B^c) = A$ for all subsets $A$ and $B$ of $U$.
::: solution
By the second distributive law (read from right to left), then the complement law and then the identity law,

$$
(A\cup B)\cap(A\cup B^c) = A\cup(B\cap B^c) = A\cup\varnothing = A.
$$

Each step is justified by a part of [[#thm-set-laws]], so no element-chasing is needed.
:::
:::

The next result collects several ways of saying that one set is contained in another; each is the convenient one in some situation.

::: proposition Equivalent forms of inclusion {#prop-subset-equiv}
For subsets $A$ and $B$ of $U$ the following statements are equivalent:

1. $A\subseteq B$;
2. $A\cap B = A$;
3. $A\cup B = B$;
4. $A\setminus B = \varnothing$;
5. $B^c\subseteq A^c$.
:::

::: proof
We prove 1 ⇒ 2 ⇒ 3 ⇒ 1, then 1 ⇔ 4 and 1 ⇔ 5.

*1 ⇒ 2.* Always $A\cap B\subseteq A$. Conversely, if $x\in A$ then $x\in B$ by 1, so $x\in A\cap B$. Hence $A\cap B = A$.

*2 ⇒ 3.* Always $B\subseteq A\cup B$. Conversely, let $x\in A\cup B$; either $x\in B$, or $x\in A = A\cap B$, which again gives $x\in B$. So $A\cup B = B$.

*3 ⇒ 1.* If $x\in A$, then $x\in A\cup B = B$.

*1 ⇔ 4.* $A\setminus B\neq\varnothing$ says that some $x$ satisfies $x\in A$ and $x\notin B$, which is exactly the negation of 1.

*1 ⇔ 5.* For each $x \in U$, the implication $x\in A\Rightarrow x\in B$ is equivalent to its contrapositive $x\notin B\Rightarrow x\notin A$ ([[proofs/propositional-logic#thm-contrapositive]]), that is, to $x\in B^c\Rightarrow x\in A^c$.
:::

### Disproving an identity

A proposed identity fails as soon as one element lies in one side but not the other, so a single small example refutes it.

::: example Set difference is not associative {#ex-not-assoc}
Is $A\setminus(B\setminus C) = (A\setminus B)\setminus C$ for all sets $A$, $B$, $C$?
::: solution
No. Take $A = B = C = \set{1}$. Then $B\setminus C = \varnothing$, so $A\setminus(B\setminus C) = \set{1}$; but $A\setminus B = \varnothing$, so $(A\setminus B)\setminus C = \varnothing$. The two sides differ.

One inclusion does always hold: $(A\setminus B)\setminus C \subseteq A\setminus(B\setminus C)$. Indeed, if $x\in(A\setminus B)\setminus C$ then $x\in A$ and $x\notin B$; since $x\notin B$, certainly $x\notin B\setminus C$, so $x\in A\setminus(B\setminus C)$. The counterexample shows where the reverse inclusion breaks down: an element of $A\cap B\cap C$, such as $1$ above, lies in the left side but not the right. (In fact $A\setminus(B\setminus C) = (A\setminus B)\cup(A\cap C)$, which you can prove by the method of the next remark.)
:::
:::

::: remark Membership tables
For identities involving finitely many sets and the operations $\cup$, $\cap$, $\setminus$ and ${}^c$ there is a mechanical test. Relative to $k$ sets, an element $x$ of $U$ has one of $2^k$ **membership patterns** (in or out of each set), and whether $x$ lies in a set built from them depends only on its pattern. So an identity holds if and only if both sides agree for every pattern — exactly when the corresponding propositional formulas are logically equivalent, which a truth table decides ([[proofs/propositional-logic]]). This is what the regions of a Venn diagram really represent: each region is one membership pattern. A picture is not a proof, but a complete table of patterns is.
:::

Here is the method in action, for the symmetric difference.

::: proposition Properties of symmetric difference {#prop-symmetric-difference}
For all subsets $A$, $B$, $C$ of $U$:

1. $A\mathbin{\triangle} B = B\mathbin{\triangle} A$;
2. $(A\mathbin{\triangle} B)\mathbin{\triangle} C = A\mathbin{\triangle}(B\mathbin{\triangle} C)$;
3. $A\mathbin{\triangle}\varnothing = A$ and $A\mathbin{\triangle} A = \varnothing$.
:::

::: proof
By definition, $x \in A\mathbin{\triangle} B$ exactly when $x$ lies in exactly one of $A$ and $B$, which is symmetric in $A$ and $B$. If $B = \varnothing$, "exactly one" means "in $A$", so $A \mathbin{\triangle}\varnothing = A$; if $B = A$, no element lies in exactly one of them, so $A\mathbin{\triangle} A = \varnothing$. For associativity we tabulate all eight membership patterns, writing $1$ for "in" and $0$ for "out":

| $A$ | $B$ | $C$ | $A\mathbin{\triangle} B$ | $(A\mathbin{\triangle} B)\mathbin{\triangle} C$ | $B\mathbin{\triangle} C$ | $A\mathbin{\triangle}(B\mathbin{\triangle} C)$ |
|---|---|---|---|---|---|---|
| 1 | 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 | 1 |
| 0 | 0 | 1 | 0 | 1 | 1 | 1 |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 |

The fifth and seventh columns agree in every row, so the two sets are equal. (Both consist of the elements lying in an odd number of the sets $A$, $B$, $C$.)
:::

::: quiz
Which of the following equals $(A\cap B^c)^c$ for all subsets $A$ and $B$ of $U$?
- [ ] $A^c\cap B$
- [x] $A^c\cup B$
- [ ] $A\cup B^c$
- [ ] $(A\cup B)^c$
::: solution
By De Morgan's law ([[#thm-set-de-morgan]]) and $(B^c)^c = B$, we get $(A\cap B^c)^c = A^c\cup (B^c)^c = A^c\cup B$. In logical terms, $\neg(p\land\neg q) \equiv \neg p\lor q$, which is equivalent to $p\Rightarrow q$. Consistently with this, $(A\cap B^c)^c = U$ holds exactly when $A\cap B^c = A \setminus B = \varnothing$, that is, when $A \subseteq B$ ([[#prop-subset-equiv]]).
:::
:::

## Power sets

::: definition Power set {#def-power-set}
The **power set** of a set $A$ is the set of all subsets of $A$:

$$
\mathcal{P}(A) = \set{S : S\subseteq A}.
$$

Thus $S\in\mathcal{P}(A)$ if and only if $S\subseteq A$.
:::

For example, $\mathcal P(\set{a,b,c})$ has eight elements:

$$
\varnothing,\quad \set{a},\quad \set{b},\quad \set{c},\quad \set{a,b},\quad \set{a,c},\quad \set{b,c},\quad \set{a,b,c}.
$$

Both $\varnothing$ and $A$ itself always belong to $\mathcal{P}(A)$. Even the empty set has a subset: $\mathcal{P}(\varnothing) = \set{\varnothing}$, which has one element, and $\mathcal{P}(\mathcal{P}(\varnothing)) = \mathcal{P}(\set{\varnothing}) = \set{\varnothing, \set{\varnothing}}$ has two. The counts $8$, $1$ and $2$ are powers of $2$, and this is no accident.

::: theorem Size of the power set {#thm-power-set-size}
If $A$ is a finite set with $\abs{A} = n$, then $\abs{\mathcal{P}(A)} = 2^n$.
:::

::: proof
We use induction on $n \ge 0$ ([[proofs/induction#cor-induction-n0]]).

*Base case.* If $n = 0$ then $A = \varnothing$, whose only subset is $\varnothing$, so $\abs{\mathcal{P}(A)} = 1 = 2^0$.

*Inductive step.* Let $n \ge 0$, assume that every set with $n$ elements has exactly $2^n$ subsets, and let $\abs{A} = n+1$. Choose an element $a\in A$ and put $A' = A\setminus\set{a}$, so that $\abs{A'} = n$. Split the subsets of $A$ into two disjoint classes.

- Those not containing $a$ are exactly the subsets of $A'$; by the inductive hypothesis there are $2^n$ of them.
- Those containing $a$ have the form $S = T\cup\set{a}$ with $T = S\setminus\set{a}\subseteq A'$. Conversely $T \cup\set{a}$ is such a subset for every $T \subseteq A'$, and different sets $T$ give different sets $T\cup \set{a}$, because removing $a$ recovers $T$. So the subsets in this class correspond one-to-one with the subsets of $A'$, and there are also $2^n$ of them.

Hence $\abs{\mathcal{P}(A)} = 2^n + 2^n = 2^{n+1}$, which completes the induction.
:::

::: intuition Subsets as yes/no choices
A subset of $\set{a_1,\dots,a_n}$ is specified by answering $n$ independent questions "is $a_i$ in?", each with two possible answers. Recording the answers as a string of $1$s (in) and $0$s (out) matches subsets with binary strings of length $n$; for $n = 3$ the string $101$ stands for $\set{a_1, a_3}$. There are $2^n$ such strings — the product rule of [[discrete/counting]] in action. The string is called the **characteristic vector** of the subset, and it is how computers store subsets of a small set: as the bits of a single integer.
:::

::: example Power sets of intersections and unions {#ex-power}
Prove that $\mathcal{P}(A\cap B) = \mathcal{P}(A)\cap\mathcal{P}(B)$ for all sets $A$ and $B$. Is $\mathcal{P}(A\cup B) = \mathcal{P}(A)\cup\mathcal{P}(B)$?
::: solution
For any set $S$,

$$
S\in\mathcal{P}(A\cap B) \iff S\subseteq A\cap B \iff \bigl(S\subseteq A \text{ and } S\subseteq B\bigr) \iff S\in \mathcal{P}(A)\cap\mathcal{P}(B).
$$

The middle step deserves a check. If $S\subseteq A\cap B$, every element of $S$ lies in $A$ and in $B$, so $S\subseteq A$ and $S \subseteq B$. Conversely, if $S\subseteq A$ and $S\subseteq B$, then each $x \in S$ lies in both, hence in $A\cap B$. So the first identity holds.

The second is false in general. With $A = \set{1}$ and $B = \set{2}$, the set $\set{1,2}$ is a subset of $A\cup B$, so $\set{1,2}\in\mathcal{P}(A\cup B)$; but $\set{1,2}$ is a subset neither of $A$ nor of $B$, so $\set{1,2}\notin\mathcal{P}(A)\cup\mathcal{P}(B)$. Only one inclusion holds in general: if $S\subseteq A$ or $S\subseteq B$, then $S\subseteq A\cup B$, so $\mathcal{P}(A)\cup\mathcal{P}(B)\subseteq\mathcal{P}(A\cup B)$. Counting shows how far from equality this is: here $\mathcal{P}(A)\cup\mathcal{P}(B) = \set{\varnothing, \set1, \set2}$ has $3$ elements, while $\mathcal{P}(A\cup B)$ has $4$.
:::
:::

## Ordered pairs and Cartesian products

Sets ignore order, but coordinates do not: the point $(1,2)$ of the plane is not the point $(2,1)$. We need **ordered pairs** $(a,b)$ with the characteristic property

$$
(a,b) = (c,d) \iff a = c \text{ and } b = d.
$$ {#eq-pair}

We could take ordered pairs as a new primitive notion, but it is a pleasing fact that sets alone suffice.

::: theorem Kuratowski's ordered pair {#thm-kuratowski}
Define $(a,b) = \set{\set{a},\set{a,b}}$. Then $(a,b) = (c,d)$ if and only if $a = c$ and $b = d$.
:::

::: proof {collapsed}
If $a = c$ and $b = d$, the two sets are built from the same ingredients and are equal. Conversely, suppose that $\set{\set{a},\set{a,b}} = \set{\set{c},\set{c,d}}$.

*Case $a = b$.* The left side is $\set{\set{a}}$, which has one element. Hence the right side has one element, so $\set{c} = \set{c,d}$, which forces $d = c$. Then $\set{\set{a}} = \set{\set{c}}$ gives $\set{a} = \set{c}$, so $a = c$, and $b = a = c = d$.

*Case $a\neq b$.* Now $\set{a}\ne\set{a,b}$, so the left side has exactly two elements, one with one element and one with two. The right side must also have a two-element member, so $c\ne d$. The one-element member $\set{a}$ on the left must equal the one-element member $\set{c}$ on the right, so $a = c$. The two-element members must then be equal as well: $\set{a,b} = \set{c,d} = \set{a,d}$. Since $b\in\set{a,d}$ and $b\ne a$, we conclude $b = d$.
:::

Nobody thinks of $(1,2)$ as $\set{\set1,\set{1,2}}$ in practice. The point of the theorem is foundational: ordered pairs — and hence functions and relations, which are built from them — need no axioms beyond those for sets. After this, only the property [[#eq-pair]] is ever used.

::: definition Cartesian product {#def-cartesian-product}
The **Cartesian product** of sets $A$ and $B$ is the set of all ordered pairs with first entry in $A$ and second entry in $B$:

$$
A\times B = \set{(a,b) : a\in A,\ b\in B}.
$$

More generally, $A_1\times\cdots\times A_n$ is the set of ordered $n$-tuples $(a_1,\dots,a_n)$ with each $a_i\in A_i$, and $A^n = A\times\cdots\times A$ with $n$ factors.
:::

The plane $\R^2 = \R\times\R$ is the basic example; the name honours René Descartes and his coordinates. The squares of a chessboard form $\set{a,b,\dots,h}\times[8]$, and the rectangle $[0,2]\times[0,1]$ is a product of intervals. If $A$ and $B$ are finite then $\abs{A\times B} = \abs{A}\cdot\abs{B}$, since each of the $\abs A$ possible first entries combines with each of the $\abs B$ possible second entries. Note that $A\times B\neq B\times A$ in general — for $A = \set1$ and $B = \set2$ the only elements are $(1,2)$ and $(2,1)$ respectively — and that $A\times\varnothing = \varnothing$, because there is no possible second entry.

::: example Products of intersections and of unions {#ex-products}
Prove that $(A\times B)\cap(C\times D) = (A\cap C)\times(B\cap D)$, and show that the corresponding statement for unions is false.
::: solution
Both sides consist of ordered pairs, so let $(x,y)$ be any ordered pair. By [[#eq-pair]] and the definitions,

$$
\begin{aligned}
(x,y)\in(A\times B)\cap(C\times D) &\iff (x\in A\land y\in B)\land(x\in C\land y\in D)\\
&\iff (x\in A\land x\in C)\land(y\in B\land y\in D)\\
&\iff (x,y)\in (A\cap C)\times(B\cap D),
\end{aligned}
$$

where the middle step merely rearranges a conjunction of four statements.

For unions, the inclusion $(A\times B)\cup(C\times D)\subseteq (A\cup C)\times(B\cup D)$ always holds, but equality can fail. Take $A = B = [0,1]$ and $C = D = [2,3]$. The left side is two separate unit squares in the plane. The right side is $([0,1]\cup[2,3])\times([0,1]\cup[2,3])$, which consists of four squares and contains, for example, the point $(0, 2)$. But $(0,2)\notin [0,1]\times[0,1]$ and $(0,2) \notin[2,3]\times[2,3]$.
:::
:::

## Indexed families of sets

Analysis and probability need unions and intersections of infinitely many sets. If for each $i$ in an **index set** $I$ we are given a set $A_i$, we call $(A_i)_{i\in I}$ an **indexed family** of sets.

::: definition Unions and intersections of families {#def-indexed}
Let $(A_i)_{i\in I}$ be an indexed family of sets. Its **union** and, when $I \ne \varnothing$, its **intersection** are

$$
\bigcup_{i\in I}A_i = \set{x : x\in A_i \text{ for some } i\in I}, \qquad \bigcap_{i\in I}A_i = \set{x : x\in A_i \text{ for every } i\in I}.
$$

When $I = \N$ we also write $\bigcup_{n=1}^\infty A_n$ and $\bigcap_{n=1}^\infty A_n$. The family is **pairwise disjoint** if $A_i\cap A_j = \varnothing$ whenever $i\ne j$.
:::

Quantifiers now take centre stage: membership of a union is an existential statement and membership of an intersection is a universal one. Why exclude $I = \varnothing$ for intersections? Every object $x$ satisfies "$x\in A_i$ for every $i\in\varnothing$" vacuously, so the intersection of the empty family would contain everything — and, as we shall see at the end of the chapter, there is no set of everything. (Inside a fixed universe $U$ the convention is that the empty intersection is $U$.)

::: example Shrinking and growing intervals {#ex-nested}
Show that

$$
\bigcap_{n=1}^{\infty}\Bigl(-\frac1n,\frac1n\Bigr) = \set{0} \qquad\text{and}\qquad \bigcup_{n=1}^{\infty}\Bigl[\frac1n,1\Bigr] = (0,1].
$$
::: solution
*The intersection.* For every $n$ we have $-\frac1n < 0 < \frac1n$, so $0$ lies in every interval and $\set{0}\subseteq\bigcap_n(-\frac1n,\frac1n)$. Conversely, let $x\neq 0$. By the Archimedean property of $\R$ ([[real-analysis/real-numbers]]) there is $n\in\N$ with $n > 1/\abs{x}$, that is, $\abs{x} > \frac1n$. Then $x\notin(-\frac1n,\frac1n)$, so $x$ is not in the intersection. Hence the intersection is exactly $\set{0}$.

*The union.* Each interval $[\frac1n,1]$ is contained in $(0,1]$ because $\frac1n > 0$, so the union is contained in $(0,1]$. Conversely, let $x\in(0,1]$. Choose $n \in \N$ with $n\ge 1/x$ (the Archimedean property again); then $\frac1n\le x\le 1$, so $x\in[\frac1n,1]$ and $x$ lies in the union.

Notice what happened at $0$. Every interval in the union stays away from $0$, yet together they reach arbitrarily close to it without containing it; and the intersection of infinitely many *open* intervals is the single point $\set 0$, which contains no open interval at all. Phenomena like these are the starting point of [[topology/topological-spaces]].
:::
:::

A third example is just as instructive: $\bigcap_{n=1}^\infty [n,\infty) = \varnothing$, because a real number $x$ fails to lie in $[n,\infty)$ as soon as $n > x$. So a decreasing sequence of non-empty sets can have empty intersection. For *closed bounded* intervals this cannot happen (the nested interval property of $\R$), a fact that underlies many existence theorems in analysis.

::: quiz
What is $\displaystyle\bigcap_{n=1}^{\infty}\Bigl(0,\frac1n\Bigr)$?
- [ ] $\set{0}$
- [x] $\varnothing$
- [ ] $(0,1)$
- [ ] It is not defined, because the intervals keep shrinking
::: solution
The number $0$ is in none of the intervals, since they are open at $0$. A number $x > 0$ is not in $(0,\frac1n)$ once $n \ge 1/x$, and a negative number is in none of them. So no real number lies in every interval, and the intersection is empty. Compare [[#ex-nested]], where the intervals $(-\frac1n,\frac1n)$ all contain $0$.
:::
:::

De Morgan's laws extend to arbitrary families, and now their logical content — the negation of quantifiers — is plain to see.

::: theorem De Morgan's laws for families {#thm-general-de-morgan}
Let $(A_i)_{i\in I}$ be a family of subsets of $U$ with $I\neq\varnothing$. Then

$$
\Bigl(\bigcup_{i\in I}A_i\Bigr)^c = \bigcap_{i\in I}A_i^c \qquad\text{and}\qquad \Bigl(\bigcap_{i\in I}A_i\Bigr)^c = \bigcup_{i\in I}A_i^c.
$$
:::

::: proof
For $x\in U$, the rules for negating quantifiers ([[proofs/quantifiers#thm-negation]]) give

$$
\begin{aligned}
x\in\Bigl(\bigcup_{i\in I}A_i\Bigr)^c &\iff \neg\bigl(\exists i\in I : x\in A_i\bigr) \iff \forall i\in I : x\notin A_i \iff x\in\bigcap_{i\in I}A_i^c,\\
x\in\Bigl(\bigcap_{i\in I}A_i\Bigr)^c &\iff \neg\bigl(\forall i\in I : x\in A_i\bigr) \iff \exists i\in I : x\notin A_i \iff x\in\bigcup_{i\in I}A_i^c.
\end{aligned}
$$

Since $x$ was arbitrary, both identities hold.
:::

::: application Sets in databases and search engines
Database query languages are built on set operations. In SQL, `UNION`, `INTERSECT` and `EXCEPT` combine the results of two queries as $\cup$, $\cap$ and $\setminus$; a `WHERE` clause is set-builder notation; and a join is, conceptually, a Cartesian product of two tables from which only the matching pairs of rows are kept. Search engines treat each word as the set of documents containing it, so the query *cats AND dogs NOT birds* asks for $(C\cap D)\setminus B$, computed by merging sorted lists of document numbers. Query optimisers rewrite queries using exactly the laws of [[#thm-set-laws]] to make them run faster.
:::

## Russell's paradox

Set-builder notation $\set{x\in A : P(x)}$, as we have used it, always carves a set out of a set $A$ that we already have. Why not allow $\set{x : P(x)}$, the set of *all* objects with the property $P$? Because it leads to a contradiction.

::: theorem Russell's paradox {#thm-russell}
There is no set $R$ such that, for every set $x$, $\ x\in R \iff x\notin x$. Consequently there is no set of all sets.
:::

::: proof
Suppose such a set $R$ existed. Since the condition holds for *every* set $x$, it holds for $x = R$: $R\in R \iff R\notin R$. A statement equivalent to its own negation is a contradiction (if $R \in R$ then $R \notin R$, and if $R \notin R$ then $R \in R$). So no such $R$ exists.

Now suppose there were a set $V$ containing every set. Carving out a subset of $V$ in the permitted way, $R = \set{x\in V : x\notin x}$ would be a set, and for every set $x$ (each of which lies in $V$) we would have $x\in R\iff x\notin x$, which we have just shown to be impossible.
:::

The paradox is not about anything exotic: the property "$x\notin x$" looks harmless, yet the "set of all $x$ with this property" cannot exist. The cure, adopted by modern set theory, is to say exactly which constructions produce sets — pairs, unions, power sets, subsets cut out by a property, and a few more — in a list of axioms. The standard list is the Zermelo–Fraenkel axioms with the axiom of choice, abbreviated **ZFC**. In everyday mathematics we never come close to the paradoxes, because we form sets inside a set we already have ($\set{x\in\R : x^2<2}$, never "the set of all $x$ with $x^2 < 2$"), and that is all the caution this course requires.

::: history
Set theory as a branch of mathematics was created by Georg Cantor in the 1870s–1890s, initially in his work on the uniqueness of trigonometric series; his discoveries about infinite sets are the subject of [[proofs/cardinality]]. The diagrams are older than the theory: Leonhard Euler used overlapping circles to explain logical statements in his *Letters to a German Princess*, written in the early 1760s, and John Venn introduced the systematic diagrams that bear his name in 1880. The membership sign goes back to Giuseppe Peano, who in 1889 used the Greek letter ε, the first letter of ἐστί ("is"). Around 1900 the unrestricted use of set-builder notation was found to be contradictory: Bertrand Russell discovered his paradox in 1901 and in June 1902 wrote to Gottlob Frege, whose logical foundation of arithmetic it undermined. Ernst Zermelo's axioms of 1908, extended by Abraham Fraenkel and Thoralf Skolem in 1922, restrict how sets may be formed and remain the standard foundation of mathematics.
:::

## Where this leads

Everything later in this course is built from sets. A function is a set of ordered pairs ([[proofs/functions]]), a relation is a subset of a Cartesian product ([[proofs/relations]]), and comparing the sizes of infinite sets leads to Cantor's theorem that $\mathcal{P}(A)$ is always strictly larger than $A$ ([[proofs/cardinality]]) — the infinite counterpart of $2^n > n$. In counting, the binomial coefficient $\binom nk$ is the number of $k$-element subsets of $[n]$ ([[discrete/counting]]), and the formula $\abs{A\cup B} = \abs A + \abs B - \abs{A\cap B}$ grows into inclusion–exclusion ([[discrete/advanced-counting]]). In probability an event is a subset of a sample space, with "or" as union and "not" as complement ([[probability/probability-spaces]]); measure theory needs countable unions and intersections ([[measure-theory/sigma-algebras]]); and topology is founded on families of open sets closed under arbitrary unions and finite intersections ([[topology/topological-spaces]]).

::: summary
- A set is determined by its elements: $A = B$ means they have the same elements, so order and repetition do not matter. There is exactly one empty set $\varnothing$, and $\set{\varnothing}\neq\varnothing$.
- $A\subseteq B$ means every element of $A$ lies in $B$; prove it by taking an arbitrary $x\in A$. Prove $A = B$ by double inclusion ([[#thm-subset-props]]). Never confuse $\in$ with $\subseteq$.
- Union, intersection, complement and difference correspond to "or", "and", "not" and "and not"; the laws of the algebra of sets, including De Morgan's laws ([[#thm-set-de-morgan]]), are the laws of logic applied to statements $x\in A$.
- One element lying in one side but not the other disproves an identity; membership tables decide identities among finitely many sets.
- The power set $\mathcal{P}(A)$ is the set of all subsets of $A$, and $\abs{\mathcal{P}(A)} = 2^{\abs A}$ for finite $A$.
- Ordered pairs satisfy $(a,b) = (c,d)$ exactly when $a=c$ and $b=d$; the Cartesian product $A\times B$ is the set of all pairs, with $\abs{A\times B} = \abs A\,\abs B$.
- Unions and intersections of families are existential and universal statements; De Morgan's laws for families are the rules for negating quantifiers. Infinite intersections and unions can be surprising: $\bigcap_n(-\frac1n,\frac1n) = \set0$.
- Unrestricted set formation leads to Russell's paradox; sets are formed inside sets we already have.
:::

## Exercises

::: exercise Elements or subsets? {level=1}
Let $A = \set{1, \set{1}, \set{1,2}}$. Which of the following are true? (a) $1\in A$; (b) $\set1\in A$; (c) $\set1\subseteq A$; (d) $\set2\subseteq A$; (e) $\set{1,2}\in A$; (f) $\set{1,2}\subseteq A$; (g) $\varnothing\in A$; (h) $\varnothing\subseteq A$.
::: solution
The elements of $A$ are $1$, $\set1$ and $\set{1,2}$.

(a) True. (b) True. (c) True, since its only element $1$ belongs to $A$. (d) False, since $2\notin A$. (e) True. (f) False: $2\in\set{1,2}$ but $2\notin A$. (g) False: $\varnothing$ is not one of the three elements. (h) True, as for every set ([[#thm-subset-props]]).
:::
:::

::: exercise Computing with finite sets {level=1}
Let $U = [12]$, let $A$ be the set of even numbers in $U$ and $B$ the set of multiples of $3$ in $U$. List $A\cap B$, $A\cup B$, $A\setminus B$, $B\setminus A$, $(A\cup B)^c$ and $A\mathbin{\triangle} B$.
::: solution
$A = \set{2,4,6,8,10,12}$ and $B = \set{3,6,9,12}$. Then

- $A\cap B = \set{6,12}$ (the multiples of $6$);
- $A\cup B = \set{2,3,4,6,8,9,10,12}$;
- $A\setminus B = \set{2,4,8,10}$ and $B\setminus A = \set{3,9}$;
- $(A\cup B)^c = \set{1,5,7,11}$;
- $A\mathbin{\triangle} B = (A\setminus B)\cup(B\setminus A) = \set{2,3,4,8,9,10}$.
:::
:::

::: exercise Power set of a power set {level=1 check="16"}
List the elements of $\mathcal{P}(\set{a,b})$. How many elements does $\mathcal{P}(\mathcal{P}(\set{a,b}))$ have?
::: solution
$\mathcal{P}(\set{a,b}) = \set{\varnothing, \set a, \set b, \set{a,b}}$, which has $4$ elements. By [[#thm-power-set-size]], its power set has $2^4 = 16$ elements.
:::
:::

::: exercise Difference as intersection {level=2}
Prove that $A\setminus B = A\cap B^c$ for subsets $A$, $B$ of $U$. Use this and the laws of [[#thm-set-laws]] to show that $A\setminus(A\setminus B) = A\cap B$.
::: solution
For $x\in U$: $x\in A\setminus B \iff (x\in A \land x\notin B) \iff (x\in A\land x\in B^c) \iff x\in A\cap B^c$.

Hence, using De Morgan's law and the distributive, complement and identity laws,

$$
A\setminus(A\setminus B) = A\cap(A\cap B^c)^c = A\cap(A^c\cup B) = (A\cap A^c)\cup(A\cap B) = \varnothing\cup(A\cap B) = A\cap B.
$$
:::
:::

::: exercise Element chasing {level=2}
Prove by double inclusion that $(A\cup B)\setminus C = (A\setminus C)\cup(B\setminus C)$ for all sets $A$, $B$, $C$.
::: solution
*$\subseteq$.* Let $x\in(A\cup B)\setminus C$. Then $x\notin C$, and $x\in A$ or $x\in B$. If $x\in A$ then $x\in A\setminus C$; if $x\in B$ then $x\in B\setminus C$. Either way $x\in(A\setminus C)\cup(B\setminus C)$.

*$\supseteq$.* Let $x\in(A\setminus C)\cup(B\setminus C)$. If $x\in A\setminus C$ then $x\in A\subseteq A\cup B$ and $x\notin C$; if $x \in B\setminus C$ then $x\in B\subseteq A\cup B$ and $x\notin C$. Either way $x\in(A\cup B)\setminus C$.
:::
:::

::: exercise Prove or disprove {level=2}
For each statement, prove it for all sets $A$, $B$, $C$ or give a counterexample.
(a) $A\setminus(B\cup C) = (A\setminus B)\setminus C$.
(b) $A\cup(B\cap C) = (A\cup B)\cap C$.
(c) $A\mathbin{\triangle} B = (A\cup B)\setminus(A\cap B)$.
::: hint
Draw the Venn diagram of each side first; it tells you whether to look for a proof or a counterexample.
:::
::: solution
(a) True. $x\in A\setminus(B\cup C) \iff x\in A \land \neg(x\in B\lor x\in C) \iff x\in A\land x\notin B\land x\notin C \iff x\in (A\setminus B)\setminus C$, using De Morgan's law for propositions in the middle.

(b) False. Take $A = \set{1}$ and $B = C = \varnothing$. Then $A\cup(B\cap C) = \set{1}$ but $(A\cup B)\cap C = \varnothing$.

(c) True. If $x \in A\mathbin{\triangle}B$, then $x$ is in exactly one of $A$, $B$: so $x\in A\cup B$ and $x\notin A\cap B$. Conversely, if $x\in A\cup B$ and $x\notin A\cap B$, then $x$ is in at least one of $A$, $B$ but not in both, so in exactly one, and $x\in A\mathbin{\triangle} B$.
:::
:::

::: exercise An infinite union and intersection {level=2}
Determine, with proof, $\displaystyle\bigcup_{n=1}^\infty\Bigl[\frac1n,\,2-\frac1n\Bigr]$ and $\displaystyle\bigcap_{n=1}^\infty\Bigl(-\frac1n,\,1+\frac1n\Bigr)$.
::: hint
Guess the answers by drawing the first few intervals, then follow [[#ex-nested]].
:::
::: solution
*The union is $(0,2)$.* Each interval satisfies $[\frac1n, 2-\frac1n] \subseteq (0,2)$, since $\frac1n > 0$ and $2-\frac1n < 2$. Conversely, let $0 < x < 2$. Both $x$ and $2-x$ are positive, so by the Archimedean property there is $n\in\N$ with $\frac1n\le\min(x,\,2-x)$. Then $\frac1n\le x$ and $x\le 2-\frac1n$, so $x$ lies in the $n$th interval.

*The intersection is $[0,1]$.* If $0\le x\le1$ then $-\frac1n<0\le x\le 1<1+\frac1n$ for every $n$. Conversely, if $x<0$ choose $n$ with $\frac1n< -x$; then $x < -\frac1n$, so $x$ is not in the $n$th interval. If $x>1$ choose $n$ with $\frac1n < x-1$; then $x > 1+\frac1n$. So no point outside $[0,1]$ lies in every interval.
:::
:::

::: exercise Subsets with an odd element {level=2 check="992"}
How many subsets of $[10]$ contain at least one odd number?
::: hint
Count the complement: the subsets containing no odd number at all.
:::
::: solution
A subset contains no odd number exactly when it is a subset of $\set{2,4,6,8,10}$, and there are $2^5 = 32$ of those. All other subsets of $[10]$ — there are $2^{10} = 1024$ subsets altogether — contain at least one odd number. The answer is $1024 - 32 = 992$.
:::
:::

::: exercise Inclusion and power sets {level=3}
Prove that $A\subseteq B$ if and only if $\mathcal{P}(A)\subseteq\mathcal{P}(B)$.
::: solution
($\Rightarrow$) Suppose $A\subseteq B$ and let $S\in\mathcal{P}(A)$. Then $S\subseteq A$ and $A\subseteq B$, so $S\subseteq B$ by transitivity ([[#thm-subset-props]]); that is, $S\in\mathcal{P}(B)$.

($\Leftarrow$) Suppose $\mathcal{P}(A)\subseteq\mathcal{P}(B)$. Since $A\subseteq A$, we have $A\in\mathcal{P}(A)$, hence $A\in\mathcal{P}(B)$, which means $A\subseteq B$.
:::
:::

::: exercise When do products commute? {level=3}
Prove that if $A$ and $B$ are non-empty sets with $A\times B = B\times A$, then $A = B$. Show by an example that the word "non-empty" cannot be removed.
::: hint
To show $A\subseteq B$, take $a \in A$ and pair it with some element of $B$.
:::
::: solution
Let $a\in A$. Since $B\neq\varnothing$ we may choose some $b\in B$. Then $(a,b)\in A\times B = B\times A$, so by [[#eq-pair]] the first entry $a$ lies in $B$. Hence $A\subseteq B$. Exchanging the roles of $A$ and $B$ (using $A\neq\varnothing$) gives $B\subseteq A$, so $A = B$.

Without the hypothesis the statement fails: for $A = \varnothing$ and $B = \set1$ we have $A\times B = \varnothing = B\times A$, but $A\neq B$.
:::
:::

::: exercise Cancelling a symmetric difference {level=3}
Prove that if $A\mathbin{\triangle} C = B\mathbin{\triangle} C$, then $A = B$.
::: hint
Take the symmetric difference of both sides with $C$, and use [[#prop-symmetric-difference]].
:::
::: solution
Using the properties in [[#prop-symmetric-difference]] (associativity, $C\mathbin{\triangle}C = \varnothing$ and $X\mathbin{\triangle}\varnothing = X$),

$$
A = A\mathbin{\triangle}\varnothing = A\mathbin{\triangle}(C\mathbin{\triangle} C) = (A\mathbin{\triangle} C)\mathbin{\triangle} C = (B\mathbin{\triangle} C)\mathbin{\triangle} C = B\mathbin{\triangle}(C\mathbin{\triangle}C) = B\mathbin{\triangle}\varnothing = B.
$$

(Together with commutativity, these properties say that the subsets of $U$ form a group under $\mathbin{\triangle}$, with identity $\varnothing$ and every set its own inverse; see [[abstract-algebra/groups]].)
:::
:::
