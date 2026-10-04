If a clock shows 9 o'clock now, what will it show 100 hours from now? Counted from 12 o'clock, the hour hand is then $9 + 100 = 109 = 9\cdot 12 + 1$ hours along: nine complete turns and one more hour, so the clock shows 1 o'clock. A clock cannot tell apart the numbers $1, 13, 25, \dots, 109$; as far as the clock is concerned they are the same, because they differ by multiples of $12$. Fractions behave in the same way: $\frac12$, $\frac24$ and $\frac{50}{100}$ are written with different pairs of integers but denote the same rational number.

Mathematics constantly treats different objects as "the same for present purposes", and **equivalence relations** are the tool that makes this precise. We shall see that an equivalence relation always splits a set into disjoint classes, and that the classes can then be treated as new objects in their own right — this is how the integers modulo $n$, and even the rational and real numbers, are constructed. The other important kind of relation is an **order**, which says when one object "comes before" another. Both are special cases of the general notion of a relation, which is where we begin.

## Relations

::: definition Relation {#def-relation}
A **relation** from a set $A$ to a set $B$ is a subset $R\subseteq A\times B$. We write $a\mathrel{R}b$, read "$a$ is related to $b$", when $(a,b)\in R$. A relation from $A$ to $A$ is called a relation **on** $A$.
:::

The familiar symbols $=$, $<$, $\le$, $\subseteq$ and $\mid$ ("divides") all denote relations. For instance, $\le$ on $\R$ is the set $\set{(x,y)\in\R^2 : x\le y}$, the half-plane on and above the line $y = x$, and divisibility on $\N$ is the set of pairs $(a,b)$ with $b = ka$ for some $k\in\Z$. "Is a parent of" is a relation on the set of all people. Every function $f\colon A\to B$ is a relation — its graph ([[proofs/functions]]) — with the special property that each $a\in A$ is related to exactly one $b\in B$. A general relation drops this requirement: an element may be related to many elements, or to none.

A relation on a small finite set can be drawn as a **directed graph**: a dot for each element, and an arrow from $a$ to $b$ whenever $a\mathrel{R}b$ (a loop at $a$ if $a \mathrel{R} a$). It can also be recorded as a **matrix** of $0$s and $1$s, with a $1$ in row $a$ and column $b$ exactly when $a\mathrel{R}b$.

## Properties of relations

::: definition Reflexive, symmetric, antisymmetric, transitive {#def-relation-properties}
A relation $R$ on a set $A$ is

- **reflexive** if $a\mathrel{R}a$ for every $a\in A$;
- **symmetric** if $a\mathrel{R}b$ implies $b\mathrel{R}a$, for all $a,b\in A$;
- **antisymmetric** if $a\mathrel{R}b$ and $b\mathrel{R}a$ together imply $a = b$, for all $a,b\in A$;
- **transitive** if $a\mathrel{R}b$ and $b\mathrel{R}c$ together imply $a\mathrel{R}c$, for all $a,b,c\in A$.
:::

Each property has a picture. Reflexive: every dot has a loop, and the matrix has $1$s all down the diagonal. Symmetric: every arrow comes with the reverse arrow, and the matrix is symmetric. Antisymmetric: no two *distinct* dots are joined by arrows in both directions. Transitive: whenever there are arrows $a\to b\to c$, the shortcut $a\to c$ is also present.

| relation | reflexive | symmetric | antisymmetric | transitive |
|---|---|---|---|---|
| $=$ on any set | yes | yes | yes | yes |
| $\le$ on $\R$ | yes | no | yes | yes |
| $<$ on $\R$ | no | no | yes | yes |
| divides on $\N$ | yes | no | yes | yes |
| $\subseteq$ on $\mathcal{P}(X)$, $X\neq\varnothing$ | yes | no | yes | yes |
| $\abs{x-y}\le 1$ on $\R$ | yes | yes | no | no |
| "is a sibling of" on people | no | yes | no | no |

Notice that $<$ is antisymmetric *vacuously*: the hypothesis "$a<b$ and $b<a$" is never satisfied, so the implication is always true.

::: example Checking the properties {#ex-properties}
Determine which of the four properties each relation has.
(a) On $\R$: $x\sim y$ if and only if $x^2 = y^2$.
(b) On $\Z$: $a\mathrel{R}b$ if and only if $a+b$ is odd.
(c) The empty relation $R = \varnothing$ on the set $A = \set{1,2}$.
::: solution
(a) *Reflexive*: $x^2 = x^2$. *Symmetric*: if $x^2 = y^2$ then $y^2 = x^2$. *Transitive*: if $x^2 = y^2$ and $y^2 = z^2$ then $x^2 = z^2$. *Not antisymmetric*: $1\sim -1$ and $-1\sim 1$, but $1\neq -1$. All three positive properties are inherited from the corresponding properties of equality — a pattern we shall exploit below.

(b) *Not reflexive*: $a + a = 2a$ is even, so in fact no integer is related to itself. *Symmetric*, since $a+b = b+a$. *Not antisymmetric*: $1\mathrel{R}2$ and $2\mathrel{R}1$ with $1\neq2$. *Not transitive*: $1\mathrel{R}2$ and $2\mathrel{R}1$, but $1 + 1 = 2$ is even, so $1\mathrel{R}1$ fails.

(c) The empty relation is *not reflexive*, since $(1,1)\notin R$. It is *symmetric*, *antisymmetric* and *transitive*, all vacuously: each condition has the form "if certain pairs lie in $R$, then …", and no pair lies in $R$.
:::
:::

::: warning Symmetric and transitive does not imply reflexive
Here is a tempting "proof" that every symmetric, transitive relation is reflexive: given $a$, if $a\mathrel{R}b$ then $b\mathrel{R}a$ by symmetry, so $a\mathrel{R}a$ by transitivity. The flaw is the word "if": the argument needs *some* $b$ with $a\mathrel{R}b$, and there may be none. Part (c) of [[#ex-properties]] is a counterexample. Similarly, *symmetric* and *antisymmetric* are not opposites: equality is both, and the relation $\set{(1,2),(2,1),(1,3)}$ on $\set{1,2,3}$ is neither.
:::

::: quiz
Let $R$ be the relation on $\R$ with $x\mathrel{R}y$ if and only if $\abs{x-y}\le 1$. Which property does $R$ lack?
- [ ] Reflexivity
- [ ] Symmetry
- [x] Transitivity
- [ ] None — it has all three
::: solution
$\abs{x - x} = 0\le 1$, so $R$ is reflexive, and $\abs{x-y} = \abs{y-x}$, so it is symmetric. But $0\mathrel{R}1$ and $1\mathrel{R}2$, while $\abs{0-2} = 2 > 1$, so $0\mathrel{R}2$ fails: $R$ is not transitive. "Being close to" is not an equivalence relation, because small differences can accumulate.
:::
:::

::: widget relation
set: 1; 2; 3; 4
pairs: 1,1; 2,2; 3,3; 4,4; 1,2; 2,1; 2,3
view: properties
caption: A relation on $\set{1,2,3,4}$ as a directed graph and a $0$–$1$ matrix. It is reflexive, but not symmetric (the arrow $2\to3$ has no partner) and not transitive ($1\to2\to3$ but no $1\to3$). Click entries of the matrix to add $(3,2)$, $(1,3)$ and $(3,1)$: the relation becomes an equivalence relation, and the figure shows its classes $\set{1,2,3}$ and $\set{4}$.
:::

## Equivalence relations and partitions

::: definition Equivalence relation {#def-equivalence-relation}
An **equivalence relation** on a set $A$ is a relation on $A$ that is reflexive, symmetric and transitive. Equivalence relations are usually written $a\sim b$, read "$a$ is equivalent to $b$".
:::

Examples abound.

- Equality on any set — the finest possible equivalence relation — and the relation $A\times A$, under which everything is equivalent to everything, the coarsest.
- On $\Z$: $a\sim b$ if $a$ and $b$ have the same parity.
- On $\R$: $x\sim y$ if $x^2 = y^2$ ([[#ex-properties]]).
- On a set of people: "has the same birthday as".
- In plane geometry: congruence of triangles, and similarity of triangles.
- For any function $f\colon A\to B$: $a\sim_f b$ if $f(a) = f(b)$. Reflexivity, symmetry and transitivity are inherited from equality, as in [[#ex-properties]](a), which is the case $f(x) = x^2$.

::: definition Equivalence classes and quotient {#def-equivalence-class}
Let $\sim$ be an equivalence relation on $A$. The **equivalence class** of $a\in A$ is

$$
[a] = \set{x\in A : x\sim a}.
$$

Any element of a class is called a **representative** of the class. The set of all equivalence classes, $A/{\sim} = \set{[a] : a\in A}$, is the **quotient** of $A$ by $\sim$.
:::

For "same parity" on $\Z$ there are exactly two classes, $[0]$ (the even integers) and $[1]$ (the odd integers), and $[0] = [2] = [-4]$ — a class has many names, one for each representative. So $\Z/{\sim} = \set{[0],[1]}$ has two elements, each of which is an infinite set. For $x\sim y \iff x^2 = y^2$, the class of $x$ is $[x] = \set{x,-x}$, which has two elements unless $x = 0$.

The key fact about classes is that two of them never partially overlap.

::: lemma When are two classes equal? {#lem-classes}
Let $\sim$ be an equivalence relation on $A$, and let $a,b\in A$. The following are equivalent:

1. $a\sim b$;
2. $[a] = [b]$;
3. $[a]\cap[b]\neq\varnothing$.
:::

::: proof
*1 ⇒ 2.* Suppose $a\sim b$. If $x\in[a]$ then $x\sim a$ and $a\sim b$, so $x\sim b$ by transitivity, that is, $x\in[b]$. Hence $[a]\subseteq[b]$. By symmetry $b\sim a$, and the same argument with $a$ and $b$ exchanged gives $[b]\subseteq[a]$.

*2 ⇒ 3.* By reflexivity $a\in[a]$, so $a\in[a] = [b]$ and $a\in[a]\cap[b]$.

*3 ⇒ 1.* Let $x\in[a]\cap[b]$, so $x\sim a$ and $x\sim b$. By symmetry $a\sim x$, and then by transitivity $a\sim b$.
:::

::: definition Partition {#def-partition}
A **partition** of a set $A$ is a collection $\mathcal{P}$ of subsets of $A$, called **blocks**, such that

1. every block is non-empty;
2. every element of $A$ lies in some block;
3. distinct blocks are disjoint.
:::

For example, $\set{\set{1,2},\set{3},\set{4,5,6}}$ is a partition of $[6]$, and the even and odd integers form a partition of $\Z$. Every element of $A$ lies in *exactly* one block: in at least one by condition 2, and in at most one by condition 3.

::: theorem Equivalence relations and partitions {#thm-partition}
Let $A$ be a set.

1. If $\sim$ is an equivalence relation on $A$, then its equivalence classes form a partition of $A$.
2. If $\mathcal{P}$ is a partition of $A$, then the relation "$a\sim_{\mathcal P} b$ if $a$ and $b$ lie in the same block" is an equivalence relation on $A$, and its equivalence classes are exactly the blocks of $\mathcal{P}$.
3. These two constructions are inverse to each other. Hence equivalence relations on $A$ correspond one-to-one to partitions of $A$.
:::

::: proof
*1.* Each class is non-empty, since $a\in[a]$ by reflexivity. Every $a\in A$ lies in some class, namely $[a]$. If two classes $[a]$ and $[b]$ are not disjoint, then $[a] = [b]$ by [[#lem-classes]]; so distinct classes are disjoint. Thus the classes form a partition.

*2.* Every $a$ lies in some block, so $a\sim_{\mathcal P} a$: the relation is reflexive. The condition "$a$ and $b$ lie in the same block" does not depend on the order of $a$ and $b$, so the relation is symmetric. For transitivity, suppose $a, b\in P$ and $b, c\in P'$ for blocks $P, P'\in\mathcal{P}$. Then $b\in P\cap P'$, so $P$ and $P'$ are not disjoint, and hence $P = P'$. So $a$ and $c$ both lie in $P$, and $a\sim_{\mathcal P} c$.

Now let $a\in A$ and let $P$ be the unique block containing $a$. An element $x$ satisfies $x\sim_{\mathcal P} a$ exactly when $x$ lies in the block containing $a$, that is, when $x \in P$. So $[a] = P$: every class is a block. Conversely every block $P$ is non-empty, and $P = [a]$ for any $a\in P$: every block is a class.

*3.* Starting from an equivalence relation $\sim$, form its partition into classes and then the relation "lie in the same class". If $a$ and $b$ lie in a common class $[c]$, then $a\sim c$ and $b\sim c$, so $a\sim b$ by symmetry and transitivity; conversely, if $a\sim b$ then $a$ and $b$ both lie in $[b]$. So we recover $\sim$. Starting from a partition $\mathcal{P}$, part 2 says that the classes of $\sim_{\mathcal P}$ are exactly the blocks, so we recover $\mathcal P$.
:::

::: intuition Sorting into boxes
A partition sorts the elements of $A$ into boxes, and the corresponding equivalence relation is the rule "is in the same box as". [[#thm-partition]] says that these are two descriptions of the same thing, so we may use whichever is more convenient: the relation for checking properties element by element, the partition for counting and for pictures.
:::

::: example From a partition to a relation and back {#ex-partition}
Let $\mathcal{P} = \set{\set{1,2},\set{3},\set{4,5,6}}$, a partition of $[6]$. List the corresponding equivalence relation as a set of ordered pairs. How many pairs does it contain?
::: solution
Two elements are related exactly when they lie in the same block. The block $\set{1,2}$ contributes the $2^2 = 4$ pairs $(1,1)$, $(1,2)$, $(2,1)$, $(2,2)$; the block $\set3$ contributes $(3,3)$; and the block $\set{4,5,6}$ contributes all $3^2 = 9$ pairs $(a,b)$ with $a,b\in\set{4,5,6}$. In total there are $4+1+9 = 14$ pairs. In general, a partition with blocks of sizes $k_1,\dots,k_r$ corresponds to an equivalence relation with $k_1^2+\cdots+k_r^2$ pairs.

Going back, the classes of this relation are $[1] = \set{1,2}$, $[3] = \set{3}$ and $[4] = \set{4,5,6}$, which recovers $\mathcal{P}$.
:::
:::

::: quiz
How many different equivalence relations are there on the set $\set{1,2,3}$?
- [ ] $3$
- [x] $5$
- [ ] $8$
- [ ] $9$
::: solution
By [[#thm-partition]], equivalence relations correspond to partitions, so we count partitions of $\set{1,2,3}$: one block $\set{1,2,3}$; a pair and a singleton ($\set{1,2},\set3$ or $\set{1,3},\set2$ or $\set{2,3},\set1$); or three singletons. That makes $1 + 3 + 1 = 5$. (Counting partitions of larger sets gives the Bell numbers $1, 2, 5, 15, 52, \dots$)
:::
:::

Quotients are how mathematicians build new number systems: we take pairs of old numbers, declare two pairs equivalent when they "should" represent the same new number, and *define* the new numbers to be the equivalence classes.

::: example Constructing the rational numbers {#ex-fractions}
Let $S = \Z\times(\Z\setminus\set{0})$, and define $(a,b)\sim(c,d)$ if $ad = bc$. Prove that $\sim$ is an equivalence relation on $S$, and that the multiplication $[(a,b)]\cdot[(c,d)] = [(ac,bd)]$ of classes is well defined.
::: solution
Think of $(a,b)$ as the fraction $\frac ab$; the relation encodes the rule $\frac ab = \frac cd \iff ad = bc$.

*Reflexive:* $ab = ba$. *Symmetric:* if $ad = bc$ then $cb = da$. *Transitive:* suppose $(a,b)\sim(c,d)$ and $(c,d)\sim(e,f)$, so $ad = bc$ and $cf = de$. Multiplying the first equation by $f$ and using the second,

$$
adf = bcf = b(cf) = b(de) = bde,
$$

so $d(af - be) = 0$. Since $d\neq0$, we get $af = be$, that is, $(a,b)\sim(e,f)$. Note where the condition $d \neq 0$ was used: allowing zero "denominators" would destroy transitivity, since $(1,2)\sim(0,0)\sim(1,3)$ but $(1,2)\not\sim(1,3)$.

*Well-definedness.* The formula defines the product of two classes in terms of chosen representatives, so we must check that the resulting class does not depend on the choice. First, $bd\neq 0$, so $(ac, bd)\in S$. Now suppose $(a,b)\sim(a',b')$ and $(c,d)\sim(c',d')$, so $ab' = a'b$ and $cd' = c'd$. Then

$$
(ac)(b'd') = (ab')(cd') = (a'b)(c'd) = (a'c')(bd),
$$

which says $(ac,bd)\sim(a'c',b'd')$. So $[(ac,bd)] = [(a'c',b'd')]$, as required.

The quotient $S/{\sim}$, with this multiplication and the addition $[(a,b)]+[(c,d)] = [(ad+bc,\ bd)]$ (also well defined), *is* the field $\Q$ of rational numbers: the class $[(a,b)]$ is the number we write as $\frac ab$.
:::
:::

The same idea constructs the integers from pairs of natural numbers (see the exercises) and the real numbers from sequences of rationals ([[real-analysis/real-numbers]]).

## Congruence modulo n

The most important equivalence relation in elementary mathematics formalises the clock.

::: definition Congruence modulo n {#def-congruence}
Let $n\in\N$. Integers $a$ and $b$ are **congruent modulo $n$**, written $a\equiv b\pmod n$, if $n$ divides $a-b$, that is, if $a - b = kn$ for some $k\in\Z$. The number $n$ is the **modulus**.
:::

For example $109\equiv 1\pmod{12}$, $-3\equiv 9\pmod{12}$, and $a\equiv 0\pmod n$ exactly when $n\mid a$. In the proof below we use the **division algorithm**: for every $a\in\Z$ and $n\in\N$ there are unique integers $q$ and $r$ with $a = qn + r$ and $0\le r<n$; the number $r$ is the **remainder** of $a$ on division by $n$ (see [[number-theory/divisibility]]).

::: theorem Congruence classes {#thm-congruence}
Let $n\in\N$. Congruence modulo $n$ is an equivalence relation on $\Z$. Every integer is congruent modulo $n$ to exactly one of $0, 1, \dots, n-1$, namely its remainder on division by $n$. Hence there are exactly $n$ congruence classes, $[0], [1], \dots, [n-1]$.
:::

::: proof
*Reflexive:* $a - a = 0 = 0\cdot n$. *Symmetric:* if $a - b = kn$ then $b - a = (-k)n$. *Transitive:* if $a - b = kn$ and $b - c = ln$, then $a - c = (a-b) + (b-c) = (k+l)n$.

Let $a\in\Z$ and write $a = qn + r$ with $0\le r<n$. Then $a - r = qn$, so $a\equiv r\pmod n$. For uniqueness, suppose $a\equiv r$ and $a\equiv r'$ with $0\le r,r' < n$. Then $r\equiv r'$ by symmetry and transitivity, so $n$ divides $r - r'$. But $-n < r - r' < n$, and the only multiple of $n$ strictly between $-n$ and $n$ is $0$; hence $r = r'$. So the classes $[0],\dots,[n-1]$ are distinct and every integer lies in one of them.
:::

The quotient is denoted $\Z_n$ (also written $\Z/n\Z$):

$$
\Z_n = \set{[0],[1],\dots,[n-1]}.
$$

For $n = 12$ the twelve classes are the twelve positions on a clock face, with $12$ written as $0$. What makes $\Z_n$ useful is that we can calculate with its elements.

::: theorem Arithmetic modulo n {#thm-zn}
Let $n\in\N$. If $a\equiv a'\pmod n$ and $b\equiv b'\pmod n$, then

$$
a+b\equiv a'+b'\pmod n \qquad\text{and}\qquad ab\equiv a'b'\pmod n.
$$

Consequently the operations $[a]+[b] = [a+b]$ and $[a]\cdot[b] = [ab]$ on $\Z_n$ are well defined.
:::

::: proof
Write $a' = a + kn$ and $b' = b + ln$ with $k,l\in\Z$. Then

$$
a'+b' = (a+b) + (k+l)n \qquad\text{and}\qquad a'b' = ab + (al + bk + kln)\,n,
$$

so $n$ divides $(a'+b') - (a+b)$ and $a'b' - ab$. The second statement follows, since this is exactly what well-definedness requires: replacing $a$ and $b$ by other representatives $a'$ and $b'$ of the same classes does not change the classes $[a+b]$ and $[ab]$.
:::

Applying the multiplication rule repeatedly (formally, by induction on $k$) shows that $a\equiv b$ implies $a^k\equiv b^k\pmod n$ for every $k \in \N$. This lets us replace a number by a smaller representative at any stage of a calculation.

::: example Calculating with congruences {#ex-congruence}
(a) Use $\Z_{12}$ to answer the opening question. (b) Find the remainder when $2^{100}$ is divided by $7$. (c) Show that $10^{100}+2$ is divisible by $3$.
::: solution
(a) Since $100 = 8\cdot12+4$, in $\Z_{12}$ we have $[9]+[100] = [9]+[4] = [13] = [1]$: the clock shows 1 o'clock.

(b) Look for a small power of $2$ that is congruent to $1$: $2^3 = 8\equiv1\pmod7$. Since $100 = 3\cdot33+1$,

$$
2^{100} = \bigl(2^3\bigr)^{33}\cdot 2 \equiv 1^{33}\cdot2 = 2 \pmod 7.
$$

As $0 \le 2 < 7$, the remainder is $2$.

(c) $10\equiv1\pmod3$, so $10^{100}\equiv1^{100} = 1$ and $10^{100}+2\equiv 1+2 = 3\equiv0\pmod 3$. The same reasoning shows that every number is congruent modulo $3$ (and modulo $9$) to the sum of its decimal digits, since $10^k\equiv1$: this is the familiar divisibility test.
:::
:::

::: widget modular
n: 6
mode: multiply
caption: The multiplication table of $\Z_6$. Look at the rows of $[2]$, $[3]$ and $[4]$: they contain $0$ away from the first column (for example $[2]\cdot[3] = [0]$), and the row of $[2]$ repeats values ($[2]\cdot[1] = [2]\cdot[4] = [2]$), so $[2]$ cannot be cancelled. Change $n$ to a prime such as $7$: every non-zero row becomes a rearrangement of all the classes, so every non-zero class has a multiplicative inverse.
:::

::: warning Do not divide or reduce exponents modulo n
Addition, subtraction and multiplication respect congruences, but division does not: $2\cdot3\equiv2\cdot0\pmod6$, yet $3\not\equiv0\pmod 6$. A factor $a$ can be cancelled from both sides of a congruence modulo $n$ exactly when $a$ and $n$ have no common factor greater than $1$ ([[number-theory/congruences]]). Nor may exponents be reduced modulo $n$: $2^5 = 32\equiv2\pmod3$, but $5\equiv 2 \pmod 3$ and $2^2 = 4\equiv1\pmod3$. In [[#ex-congruence]] we reduced the *base*, which [[#thm-zn]] allows, and used the exact identity $100 = 3\cdot 33 + 1$ for the exponent.
:::

## Partial orders

The second great family of relations describes comparisons such as "is at most", "is contained in" and "divides".

::: definition Partial order {#def-partial-order}
A **partial order** on a set $A$ is a relation $\preceq$ on $A$ that is reflexive, antisymmetric and transitive. The pair $(A,\preceq)$ is a **partially ordered set**, or **poset**. Elements $a, b$ are **comparable** if $a\preceq b$ or $b\preceq a$; if every two elements are comparable, $\preceq$ is a **total** (or **linear**) order. We write $a\prec b$ for "$a\preceq b$ and $a\neq b$".
:::

- The usual $\le$ on $\N$, $\Z$, $\Q$ or $\R$ is a total order.
- Inclusion $\subseteq$ on $\mathcal{P}(X)$ is a partial order ([[proofs/sets#def-subset]]), and it is not total if $X$ has two distinct elements $a,b$: neither of $\set a$, $\set b$ contains the other.
- Divisibility on $\N$ is a partial order. It is reflexive ($a = 1\cdot a$) and transitive (if $b = ka$ and $c = lb$ then $c = (lk)a$). It is antisymmetric because $a\mid b$ with $a,b \in \N$ forces $a\le b$, so $a\mid b$ and $b\mid a$ give $a \le b\le a$. It is not total: $2$ and $3$ are incomparable. On $\Z$, divisibility is *not* antisymmetric, since $2\mid-2$ and $-2\mid 2$.
- The **lexicographic** (dictionary) order on $\R^2$, with $(a,b)\preceq(c,d)$ if $a<c$, or $a = c$ and $b\le d$, is a total order.

A finite poset is drawn as a **Hasse diagram**. Say that $b$ **covers** $a$ if $a\prec b$ and there is no $c$ with $a\prec c\prec b$. Draw each element as a point, place $b$ higher than $a$ whenever $a\prec b$, and join $a$ to $b$ by a line exactly when $b$ covers $a$. Loops and shortcuts are omitted because reflexivity and transitivity restore them: $a\preceq b$ holds exactly when $a = b$ or there is an upward path from $a$ to $b$.

::: widget graph
nodes: 1@0,0; 2@-1,1; 3@1,1; 4@-2,2; 6@0,2; 12@-1,3
edges: 1>2; 1>3; 2>4; 2>6; 3>6; 4>12; 6>12
algorithm: topo
caption: The Hasse diagram of the divisors of $12$ under divisibility, with each line directed upwards, from a number to a number that covers it. Seven lines encode all $18$ related pairs. Step through the topological sort: it lists the elements one at a time, always choosing an element with nothing below it, and produces a total order compatible with divisibility — a *linear extension* of the partial order.
:::

::: definition Minimal, maximal, least and greatest elements {#def-extremal}
Let $(A,\preceq)$ be a poset and $m\in A$. Then $m$ is

- **minimal** if there is no $x\in A$ with $x\prec m$, and **maximal** if there is no $x\in A$ with $m\prec x$;
- the **least** element if $m\preceq x$ for every $x\in A$, and the **greatest** element if $x\preceq m$ for every $x\in A$.
:::

"Minimal" means nothing is below $m$; "least" means $m$ is below everything. In a Hasse diagram, minimal elements are those with no line coming up to them from below.

::: proposition Facts about extremal elements {#prop-extremal}
Let $(A,\preceq)$ be a poset.

1. $A$ has at most one least element. A least element is minimal, and it is then the only minimal element.
2. If $A$ is finite and non-empty, it has a minimal element.
3. If $\preceq$ is a total order, every minimal element is the least element.

The corresponding statements for maximal and greatest elements hold as well.
:::

::: proof
1. If $m$ and $m'$ are both least, then $m\preceq m'$ and $m'\preceq m$, so $m = m'$ by antisymmetry. Let $m$ be least. If $x\prec m$, then $x\preceq m$ and also $m\preceq x$ (as $m$ is least), so $x = m$, contradicting $x\neq m$; hence $m$ is minimal. If $m'$ is any minimal element, then $m\preceq m'$, and $m\prec m'$ is impossible because $m'$ is minimal, so $m = m'$.

2. By induction on $\abs A\ge1$. A one-element poset has a minimal element. Suppose every poset with $n\ge 1$ elements has a minimal element, and let $\abs A = n+1$. Pick $a\in A$; the set $A' = A\setminus\set a$ with the same order has a minimal element $m'$. If $a\prec m'$ does not hold, then $m'$ is minimal in $A$: no element of $A'$ lies strictly below $m'$, and neither does $a$. If $a\prec m'$, then $a$ is minimal in $A$: if some $x\in A'$ had $x\prec a$, then $x\preceq m'$ by transitivity, and $x \neq m'$ (otherwise $m' \prec a \prec m'$ would give $a = m'$ by antisymmetry), so $x\prec m'$, contradicting the minimality of $m'$ in $A'$.

3. Let $m$ be minimal and $x\in A$. Since the order is total, $x\preceq m$ or $m\preceq x$. If $x\preceq m$ then $x = m$, because $x\prec m$ is impossible; either way $m\preceq x$. So $m$ is least.

The statements about maximal and greatest elements follow by applying these to the reversed order $a\succeq b$, which is again a partial order.
:::

::: example Minimal is not the same as least {#ex-extremal}
Find the minimal, maximal, least and greatest elements of $A = \set{2,3,4,6,8,12}$ ordered by divisibility.
::: solution
An element is minimal if no other element of $A$ divides it. Every element except $2$ and $3$ has a proper divisor in $A$ ($2\mid4$, $2\mid6$, $2\mid8$, $2\mid12$), while $2$ and $3$ have none. So the minimal elements are $2$ and $3$. There is no least element, since a least element would divide both $2$ and $3$, and by [[#prop-extremal]] a least element would be the only minimal element.

An element is maximal if it divides no other element of $A$. Now $2,3,4,6$ all divide $12$, while $8$ and $12$ divide no other element of $A$ ($8\nmid12$). So the maximal elements are $8$ and $12$, and there is no greatest element.

Compare: under divisibility, $\N$ itself has the least element $1$ but no maximal elements at all, and $(\Z,\le)$ has no minimal elements — part 2 of [[#prop-extremal]] needs finiteness.
:::
:::

::: application Scheduling and prerequisites
Tasks in a project — or chapters of a course — are partially ordered by "must come before". The chapters of this site form such a poset: each chapter lists the chapters it requires, and taking all consequences of these requirements (the **reflexive–transitive closure**) gives a partial order — antisymmetric because no chapter depends, even indirectly, on itself. A valid order in which to do the tasks is a **linear extension**: a total order containing the partial order. One always exists for a finite poset: repeatedly remove a minimal element, which exists by [[#prop-extremal]], and append it to the list. This procedure, **topological sorting**, is used by build systems, spreadsheets and package managers, and is studied in [[discrete/graph-algorithms]].
:::

::: quiz
Order the six non-empty proper subsets of $\set{a,b,c}$ by inclusion. How many maximal elements does this poset have?
- [ ] $1$
- [x] $3$
- [ ] $6$
- [ ] None, because there is no greatest element
::: solution
The two-element subsets $\set{a,b}$, $\set{a,c}$ and $\set{b,c}$ are maximal: the only subset of $\set{a,b,c}$ strictly containing one of them is $\set{a,b,c}$ itself, which has been removed. The one-element sets are not maximal, since each lies inside a two-element set. There is no greatest element — no single set contains all the others — but that does not prevent maximal elements from existing.
:::
:::

::: history
The notation $a\equiv b\pmod n$ was introduced by Carl Friedrich Gauss in his *Disquisitiones Arithmeticae* (1801), which made calculation with congruences a central tool of number theory. Forming new objects as equivalence classes became a standard construction in the nineteenth century: Charles Méray (1869) and Georg Cantor (1872) independently built the real numbers from sequences of rational numbers, and in 1884 Gottlob Frege defined the number of a concept through the classes of concepts that can be put in one-to-one correspondence with it. The general theory of ordered sets was developed by Richard Dedekind, whose study of lattices dates from 1897, and by Felix Hausdorff in his *Grundzüge der Mengenlehre* (1914). Hasse diagrams take their name from Helmut Hasse, who used them to good effect in algebra, although similar diagrams had already appeared in the 1890s.
:::

## Where this leads

Congruences are the foundation of elementary number theory ([[number-theory/congruences]]), and $\Z_n$ is the first example of a finite ring ([[abstract-algebra/rings]]). Quotients reappear throughout algebra and topology: the cosets of a subgroup are the classes of an equivalence relation, which is the key to Lagrange's theorem ([[abstract-algebra/lagrange]]), and gluing the points of a space together gives the quotient spaces of [[topology/quotient-spaces]]. In a graph, "is joined by a path to" is an equivalence relation whose classes are the connected components ([[discrete/graphs]]). Partial orders appear as topological sorts in [[discrete/graph-algorithms]], and "has at most as many elements as" behaves like an order on sizes of sets in [[proofs/cardinality]].

::: summary
- A relation from $A$ to $B$ is a subset of $A\times B$; on a finite set it can be drawn as a directed graph or a $0$–$1$ matrix. Functions are the relations in which each element is related to exactly one element.
- The key properties are reflexive, symmetric, antisymmetric and transitive. Each must be checked separately; in particular symmetric and transitive does not imply reflexive.
- An equivalence relation is reflexive, symmetric and transitive. Two equivalence classes are either equal or disjoint ([[#lem-classes]]), and equivalence relations on $A$ correspond exactly to partitions of $A$ ([[#thm-partition]]).
- Quotient sets build new objects from classes; operations on classes must be checked to be well defined, that is, independent of the representatives chosen.
- $a\equiv b\pmod n$ means $n\mid a-b$. There are $n$ classes, and $\Z_n$ inherits well-defined addition and multiplication ([[#thm-zn]]) — but not division in general.
- A partial order is reflexive, antisymmetric and transitive; finite posets are drawn as Hasse diagrams. Minimal and least elements differ: a least element is unique and is the only minimal element, and every finite non-empty poset has a minimal element.
:::

## Exercises

::: exercise Four relations on the integers {level=1}
Decide which of the properties reflexive, symmetric, antisymmetric and transitive each relation on $\Z$ has.
(a) $a\mathrel{R}b$ if $a+b$ is even.
(b) $a\mathrel{R}b$ if $\abs{a-b}\le1$.
(c) $a\mathrel{R}b$ if $ab>0$.
(d) $a\mathrel{R}b$ if $a\mid b$.
::: solution
(a) $a+b$ is even exactly when $a$ and $b$ have the same parity, so $R$ is an equivalence relation: reflexive, symmetric and transitive. It is not antisymmetric: $0\mathrel{R}2$ and $2\mathrel{R}0$.

(b) Reflexive and symmetric. Not antisymmetric ($0\mathrel{R}1$ and $1\mathrel{R}0$) and not transitive ($0\mathrel{R}1$, $1\mathrel{R}2$, but not $0\mathrel{R}2$).

(c) Not reflexive, since $0\cdot0 = 0$. Symmetric, since $ab = ba$. Transitive: $ab > 0$ means $a$ and $b$ are non-zero with the same sign, and if also $b$ and $c$ have the same sign, so do $a$ and $c$. Not antisymmetric: $1\mathrel{R}2$ and $2\mathrel{R}1$.

(d) Reflexive ($a = 1\cdot a$) and transitive, but not symmetric ($1\mid2$, $2\nmid1$) and, on $\Z$, not antisymmetric ($2\mid-2$ and $-2\mid2$).
:::
:::

::: exercise A large power {level=1 check="4"}
Find the remainder when $3^{100}$ is divided by $7$.
::: hint
Compute $3^1, 3^2, \dots$ modulo $7$ until you reach $1$.
:::
::: solution
Modulo $7$: $3^2 = 9\equiv2$, so $3^3\equiv 6$, and $3^6 = (3^3)^2\equiv 36\equiv1$. Since $100 = 6\cdot16+4$,

$$
3^{100} = \bigl(3^6\bigr)^{16}\cdot3^4\equiv 3^4 = 81 = 11\cdot7+4\equiv 4\pmod 7.
$$

The remainder is $4$.
:::
:::

::: exercise The divisors of 30 {level=1}
Draw the Hasse diagram of the set of positive divisors of $30$, ordered by divisibility. Which elements are minimal, maximal, least and greatest? Which other poset in this chapter has a Hasse diagram of the same shape?
::: solution
The divisors are $1,2,3,5,6,10,15,30$. Arrange them in levels: $1$ at the bottom; $2$, $3$, $5$ above it; $6$, $10$, $15$ above those; and $30$ at the top. The covering lines are $1$–$2$, $1$–$3$, $1$–$5$, $2$–$6$, $2$–$10$, $3$–$6$, $3$–$15$, $5$–$10$, $5$–$15$, $6$–$30$, $10$–$30$ and $15$–$30$: twelve lines in all. The least element is $1$ (it divides everything), which is therefore the only minimal element; the greatest is $30$, the only maximal element.

The diagram is a cube, exactly like that of $\mathcal{P}(\set{2,3,5})$ under inclusion: the divisor $d$ corresponds to the set of primes dividing $d$, and $d\mid d'$ exactly when the set for $d$ is contained in the set for $d'$.
:::
:::

::: exercise Real numbers modulo 1 {level=2}
On $\R$ define $x\sim y$ if $x-y\in\Z$. Prove that $\sim$ is an equivalence relation, and show that every equivalence class contains exactly one number in $[0,1)$.
::: solution
*Reflexive:* $x - x = 0\in\Z$. *Symmetric:* if $x-y\in\Z$ then $y-x = -(x-y)\in\Z$. *Transitive:* if $x-y$ and $y-z$ are integers, so is their sum $x-z$.

Given $x\in\R$, let $n = \lfloor x\rfloor$ be the greatest integer with $n\le x$, so that $n\le x<n+1$. Then $r = x-n$ lies in $[0,1)$ and $x - r = n\in\Z$, so $r\in[x]$. If $r, r'\in[0,1)$ both lie in $[x]$, then $r\sim r'$, so $r-r'$ is an integer; but $-1 < r-r' < 1$, so $r - r' = 0$. Hence each class meets $[0,1)$ in exactly one point. (The quotient $\R/{\sim}$ can be pictured as $[0,1]$ with its ends glued together — a circle; see [[topology/quotient-spaces]].)
:::
:::

::: exercise Constructing the integers {level=2}
On $\N_0\times\N_0$ define $(a,b)\sim(c,d)$ if $a+d = b+c$. Prove that $\sim$ is an equivalence relation, describe the class of $(a,b)$, and show that $[(a,b)]+[(c,d)] = [(a+c,\ b+d)]$ is well defined.
::: hint
Think of $(a,b)$ as the integer $a - b$.
:::
::: solution
*Reflexive:* $a + b = b + a$. *Symmetric:* if $a+d = b+c$ then $c+b = d+a$. *Transitive:* if $a+d = b+c$ and $c+f = d+e$, adding gives $a+d+c+f = b+c+d+e$; cancelling $c+d$ leaves $a+f = b+e$, so $(a,b)\sim(e,f)$.

$(c,d)\sim(a,b)$ means $c - d = a - b$, so the class of $(a,b)$ consists of all pairs with the same difference: for example $[(5,2)] = \set{(3,0),(4,1),(5,2),\dots}$ represents the integer $3$, and $[(0,2)] = \set{(0,2),(1,3),\dots}$ represents $-2$.

*Well-definedness.* If $(a,b)\sim(a',b')$ and $(c,d)\sim(c',d')$, then $a+b' = b+a'$ and $c+d' = d+c'$. Adding, $(a+c)+(b'+d') = (b+d)+(a'+c')$, which says $(a+c,\ b+d)\sim(a'+c',\ b'+d')$.
:::
:::

::: exercise Partitions of a four-element set {level=2 check="15"}
How many equivalence relations are there on $\set{1,2,3,4}$?
::: hint
By [[#thm-partition]], count partitions, sorted by their block sizes.
:::
::: solution
Count partitions of $\set{1,2,3,4}$ by block sizes:

- one block of size $4$: $1$ partition;
- sizes $3+1$: choose the singleton, $4$ ways;
- sizes $2+2$: the block containing $1$ is $\set{1,x}$ for one of $3$ choices of $x$, and the other block is determined: $3$ ways;
- sizes $2+1+1$: choose the pair, $\binom42 = 6$ ways;
- four singletons: $1$ way.

The total is $1+4+3+6+1 = 15$, so there are $15$ equivalence relations.
:::
:::

::: exercise Counting symmetric relations {level=2 check="64"}
How many symmetric relations are there on a set with $3$ elements?
::: hint
A symmetric relation is determined by the diagonal entries of its matrix and the entries above the diagonal.
:::
::: solution
For $A = \set{a,b,c}$, a symmetric relation is determined by deciding, for each of the $3$ diagonal pairs $(x,x)$, whether it is included, and for each of the $3$ unordered pairs $\set{x,y}$ with $x\neq y$, whether both $(x,y)$ and $(y,x)$ are included (symmetry forces both or neither). These $6$ independent yes/no decisions give $2^6 = 64$ symmetric relations. (In general there are $2^{n(n+1)/2}$ on an $n$-element set, out of $2^{n^2}$ relations in all.)
:::
:::

::: exercise Every equivalence relation comes from a function {level=3}
Let $\sim$ be an equivalence relation on $A$, and let $q\colon A\to A/{\sim}$ be the **quotient map** $q(a) = [a]$. Prove that $q$ is surjective and that $a\sim b$ if and only if $q(a) = q(b)$. Conclude that the equivalence relations on $A$ are exactly the relations of the form $a\sim_f b \iff f(a) = f(b)$ for functions $f$ with domain $A$.
::: solution
Every element of $A/{\sim}$ has the form $[a]$ for some $a\in A$, and $[a] = q(a)$, so $q$ is surjective. By [[#lem-classes]], $a\sim b$ if and only if $[a] = [b]$, that is, if and only if $q(a) = q(b)$. So $\sim$ is the relation $\sim_q$.

Conversely, for any function $f$ with domain $A$, the relation $\sim_f$ is an equivalence relation, because reflexivity, symmetry and transitivity of $\sim_f$ follow from the same properties of equality: $f(a) = f(a)$; $f(a) = f(b)$ implies $f(b) = f(a)$; and $f(a) = f(b)$, $f(b) = f(c)$ imply $f(a) = f(c)$. Together, the equivalence relations on $A$ are exactly the relations $\sim_f$.
:::
:::

::: exercise When symmetric and transitive suffice {level=3}
Let $R$ be a symmetric and transitive relation on a set $A$ such that every $a\in A$ is related to at least one element of $A$. Prove that $R$ is an equivalence relation. Give an example of a symmetric, transitive relation on $\set{1,2,3}$ that is not reflexive and is not empty.
::: solution
Only reflexivity needs proof. Let $a\in A$. By hypothesis there is $b\in A$ with $a\mathrel{R}b$. By symmetry $b\mathrel{R}a$, and by transitivity, from $a\mathrel{R}b$ and $b\mathrel{R}a$, we get $a\mathrel{R}a$.

Example: $R = \set{(1,1),(1,2),(2,1),(2,2)}$ on $\set{1,2,3}$. It is symmetric, and it is transitive because all its pairs involve only $1$ and $2$ and every pair of elements of $\set{1,2}$ is related. It is not reflexive, since $(3,3)\notin R$ — and indeed $3$ is related to nothing, which is exactly where the argument above breaks down.
:::
:::

::: exercise A unique minimal element {level=3}
Let $(A,\preceq)$ be a finite poset with exactly one minimal element $m$. Prove that $m$ is the least element. Show that the conclusion can fail for infinite posets.
::: hint
For $x\in A$, apply [[#prop-extremal]] to the set of elements below $x$.
:::
::: solution
Let $x\in A$ and let $D = \set{y\in A : y\preceq x}$, a finite set which is non-empty because $x\in D$. With the order inherited from $A$, $D$ is a poset, so by [[#prop-extremal]] it has a minimal element $y_0$. We claim $y_0$ is minimal in $A$. If $z\in A$ and $z\prec y_0$, then $z\preceq y_0\preceq x$, so $z\in D$, contradicting the minimality of $y_0$ in $D$. As $m$ is the only minimal element of $A$, $y_0 = m$, and hence $m\preceq x$. Since $x$ was arbitrary, $m$ is the least element.

For an infinite counterexample, take $A = \Z\cup\set{\ast}$, where $\ast$ is a new element, ordered by the usual $\le$ on $\Z$ with $\ast$ comparable only to itself. No integer is minimal (since $n - 1 < n$), and $\ast$ is minimal, so $\ast$ is the only minimal element; but $\ast$ is not least, because it is not below $0$.
:::
:::
