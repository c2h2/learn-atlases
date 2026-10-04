The differential equation $y'' + y = 0$ has the solutions $\sin x$ and $\cos x$. Because the equation is linear, any combination $a\sin x + b\cos x$ is again a solution: if $y_1'' + y_1 = 0$ and $y_2'' + y_2 = 0$, then $(ay_1 + by_2)'' + (ay_1 + by_2) = a(y_1'' + y_1) + b(y_2'' + y_2) = 0$. The solutions of a homogeneous linear system $A\mathbf{x} = \mathbf{0}$ behave in exactly the same way ([[linear-algebra/linear-systems#thm-structure]]), and so do polynomials, matrices, sequences, and the signals processed by a phone. In each case there are objects that can be **added** and **multiplied by numbers**, and the familiar rules of arithmetic hold.

It would be wasteful to develop the theory separately for column vectors, functions, polynomials and matrices. Instead we list the rules they share as axioms and prove theorems from the axioms alone; every theorem then applies at once to every example. A set with operations obeying the rules is a **vector space**, and its elements are called **vectors** — even when they are functions or matrices. This chapter sets up the language: vector spaces, subspaces, linear combinations, span and linear independence. The next chapter uses it to define dimension.

*Notation.* From now on we write elements of a general vector space in italic, $u, v, w$, and keep bold letters $\mathbf{x}, \mathbf{b}$ for column vectors in $\R^n$ or $\C^n$.

## The axioms of a vector space

The scalars, the numbers we multiply vectors by, will be real numbers or complex numbers. Everything in this chapter and the next works for any **field** $\F$ — a number system in which we can add, subtract, multiply and divide by non-zero elements with the usual rules, such as $\Q$, $\R$, $\C$ or the integers modulo a prime (see [[abstract-algebra/fields-galois]]). The reader who prefers may always read $\F$ as $\R$.

::: definition Vector space {#def-vector-space}
A **vector space** over a field $\F$ is a set $V$ together with an **addition** that assigns to each pair $u, v \in V$ an element $u + v \in V$, and a **scalar multiplication** that assigns to each $a\in\F$ and $v \in V$ an element $av\in V$, such that for all $u, v, w \in V$ and $a, b \in \F$:

1. $u + v = v + u$ (commutativity);
2. $(u + v) + w = u + (v + w)$ (associativity);
3. there is an element $0 \in V$, the **zero vector**, with $v + 0 = v$ for all $v\in V$;
4. for each $v\in V$ there is $w \in V$ with $v + w = 0$ (additive inverses);
5. $1v = v$;
6. $a(bv) = (ab)v$;
7. $a(u + v) = au + av$;
8. $(a + b)v = av + bv$.

When $\F = \R$ we speak of a **real** vector space, when $\F = \C$ of a **complex** vector space.
:::

The requirement that $u + v$ and $av$ lie in $V$ is part of the definition: $V$ is **closed** under the two operations. Here are the examples we shall use most often.

- $\F^n$, the column vectors $(x_1, \dots, x_n)$ with entries in $\F$, with entrywise operations. All eight axioms reduce to rules of arithmetic in $\F$, applied to each entry.
- $M_{m\times n}(\F)$, the $m\times n$ matrices with entries in $\F$, with the operations of [[linear-algebra/matrices#def-matrix-ops]].
- $\mathcal{P}(\F)$, all polynomials $a_0 + a_1x + \dots + a_dx^d$ with coefficients in $\F$, and for each $n$ the set $\mathcal{P}_n(\F)$ of polynomials of degree at most $n$ (including the zero polynomial), with the usual addition and scalar multiplication of polynomials.
- For any set $X$, the set $\mathcal{F}(X, \F)$ of all functions $f\colon X \to \F$, with the **pointwise** operations $(f + g)(x) = f(x) + g(x)$ and $(af)(x) = a\,f(x)$. The zero vector is the function that is identically $0$. Taking $X = \{1, 2, 3, \dots\}$ gives the space of all sequences.
- The **zero space** $\{0\}$, with $0 + 0 = 0$ and $a0 = 0$.
- $\C$ is a vector space over $\C$, but also over $\R$ (multiply complex numbers by real scalars only). These are different vector spaces, as we shall see when we count dimensions.

The axioms say nothing about what vectors *are*, only about how they combine. The next example shows how far that can be pushed.

::: example A strange vector space {#ex-strange}
Let $V = \R_{>0}$ be the positive real numbers, with "addition" $u \oplus v = uv$ (ordinary multiplication) and "scalar multiplication" $a \odot v = v^a$ for $a\in\R$. Show that $V$ is a real vector space. What is its zero vector?
::: solution
Closure: if $u, v > 0$ then $uv > 0$ and $v^a > 0$. Now check the axioms with $u, v, w > 0$ and $a, b\in\R$.

1. $u\oplus v = uv = vu = v \oplus u$. 2. $(u\oplus v)\oplus w = (uv)w = u(vw) = u\oplus(v\oplus w)$.
3. The number $1$ satisfies $v\oplus 1 = v\cdot 1 = v$, so the zero vector of $V$ is the number $1$.
4. Given $v$, the element $w = 1/v$ satisfies $v\oplus w = 1$, the zero vector.
5. $1\odot v = v^1 = v$. 6. $a\odot(b\odot v) = (v^b)^a = v^{ab} = (ab)\odot v$.
7. $a\odot(u\oplus v) = (uv)^a = u^av^a = (a\odot u)\oplus(a\odot v)$.
8. $(a + b)\odot v = v^{a+b} = v^av^b = (a\odot v)\oplus(b\odot v)$.

So $V$ is a vector space whose zero vector is the number $1$. It is less strange than it looks: the logarithm turns $\oplus$ into $+$ and $\odot$ into ordinary multiplication ($\ln(uv) = \ln u + \ln v$, $\ln v^a = a\ln v$), so $V$ is a disguised copy of $\R$ — an *isomorphism*, in the language of [[linear-algebra/linear-maps]].
:::
:::

::: quiz
In the vector space $V = \R_{>0}$ of [[#ex-strange]], what is the additive inverse $-4$ of the vector $4$?
- [ ] The number $-4$
- [x] The number $\tfrac14$
- [ ] The number $0$
- [ ] It has none, because $V$ contains no negative numbers
::: solution
The additive inverse of $v$ is the vector $w$ with $v\oplus w$ equal to the zero vector, which in $V$ is the number $1$. Since $4\oplus\tfrac14 = 4\cdot\tfrac14 = 1$, the inverse is $\tfrac14$. The number $-4$ is not even an element of $V$, and $0$ is neither in $V$ nor its zero vector. Consistently with [[#prop-axioms]], $(-1)\odot 4 = 4^{-1} = \tfrac14$.
:::
:::

Some facts that look too obvious to need proof are not among the axioms, and must be deduced from them. Doing so once means we never have to worry about them again, in any vector space.

::: proposition Consequences of the axioms {#prop-axioms}
In any vector space $V$ over $\F$, for all $v\in V$ and $a \in \F$:

1. the zero vector is unique, and each $v$ has exactly one additive inverse, written $-v$;
2. $0v = 0$ (the scalar zero times any vector is the zero vector);
3. $a0 = 0$;
4. $(-1)v = -v$;
5. if $av = 0$, then $a = 0$ or $v = 0$.
:::

::: proof
1. If $0$ and $0'$ are both zero vectors, then $0 = 0 + 0' = 0' + 0 = 0'$, using axiom 3 for $0'$, then axiom 1, then axiom 3 for $0$. If $w$ and $w'$ are both additive inverses of $v$, then
   $w = w + 0 = w + (v + w') = (w + v) + w' = 0 + w' = w'$.
2. By axiom 8, $0v = (0 + 0)v = 0v + 0v$. Adding $-(0v)$ to both sides and using associativity gives $0 = 0v$.
3. By axiom 7, $a0 = a(0 + 0) = a0 + a0$, and adding $-(a0)$ gives $0 = a0$.
4. By axioms 5 and 8 and part 2, $v + (-1)v = 1v + (-1)v = (1 + (-1))v = 0v = 0$. So $(-1)v$ is an additive inverse of $v$, and by uniqueness it is $-v$.
5. Suppose $av = 0$ and $a\neq 0$. Then, using axioms 5 and 6 and part 3, $v = 1v = (a^{-1}a)v = a^{-1}(av) = a^{-1}0 = 0$.
:::

We write $u - v$ for $u + (-v)$. With [[#prop-axioms]] in hand, algebra in a vector space works as you expect, as long as you never multiply two vectors or divide by one — operations that a general vector space simply does not have.

## Subspaces

Most vector spaces met in practice live inside bigger ones: the solutions of $y'' + y = 0$ inside all functions, the solutions of $A\mathbf{x} = \mathbf{0}$ inside $\F^n$.

::: definition Subspace {#def-subspace}
A **subspace** of a vector space $V$ is a subset $U \subseteq V$ that is itself a vector space with the addition and scalar multiplication of $V$.
:::

Checking eight axioms for every candidate would be tedious. Fortunately most of them are inherited automatically.

::: theorem Subspace test {#thm-subspace-test}
A subset $U$ of a vector space $V$ is a subspace if and only if

1. $0 \in U$;
2. $U$ is **closed under addition**: $u, w \in U \implies u + w \in U$;
3. $U$ is **closed under scalar multiplication**: $a\in\F,\ u\in U \implies au \in U$.
:::

::: proof
Suppose the three conditions hold. Conditions 2 and 3 say that the operations of $V$ give operations on $U$. Axioms 1, 2 and 5–8 are identities that hold for *all* vectors of $V$, so in particular for those in $U$. Axiom 3 holds because $0\in U$ and $u + 0 = u$. For axiom 4, if $u \in U$ then $(-1)u\in U$ by condition 3, and $(-1)u = -u$ by [[#prop-axioms]]; so $u$ has an additive inverse in $U$.

Conversely, suppose $U$ is a subspace. Conditions 2 and 3 hold because $U$ is closed under its operations, which are those of $V$. By axiom 3 for $U$ there is $0_U \in U$ with $0_U + 0_U = 0_U$; adding $-0_U$ (computed in $V$) to both sides gives $0_U = 0$. So $0 \in U$.
:::

In practice one checks condition 1 first: a set that does not contain $0$ can be rejected at once. Conditions 2 and 3 can be combined into the single requirement that $au + bw \in U$ whenever $u, w\in U$ and $a, b\in\F$.

::: example The null space and other subspaces {#ex-subspaces}
Show that the following are subspaces: (a) the set $\operatorname{Nul}(A) = \set{\mathbf{x}\in\F^n : A\mathbf{x} = \mathbf{0}}$ of solutions of a homogeneous system, where $A$ is an $m\times n$ matrix; (b) the set of polynomials $p\in\mathcal{P}_3(\R)$ with $p(1) = 0$; (c) the set of solutions of $y'' + y = 0$ in the space of twice-differentiable functions $\R \to \R$.
::: solution
(a) $A\mathbf{0} = \mathbf{0}$, so $\mathbf{0}\in\operatorname{Nul}(A)$. If $A\mathbf{u} = A\mathbf{w} = \mathbf{0}$ then $A(\mathbf{u} + \mathbf{w}) = A\mathbf{u} + A\mathbf{w} = \mathbf{0}$ and $A(a\mathbf{u}) = aA\mathbf{u} = \mathbf{0}$ by [[linear-algebra/linear-systems#eq-linear]]. By [[#thm-subspace-test]], $\operatorname{Nul}(A)$ is a subspace of $\F^n$, called the **null space** of $A$.

(b) The zero polynomial vanishes at $1$. If $p(1) = q(1) = 0$ then $(p + q)(1) = p(1) + q(1) = 0$ and $(ap)(1) = a\,p(1) = 0$. So this is a subspace of $\mathcal{P}_3(\R)$.

(c) The zero function satisfies $0'' + 0 = 0$, and the computation in the introduction shows that $ay_1 + by_2$ is a solution whenever $y_1, y_2$ are. So the solution set is a subspace. In each case the key was that the defining condition is *linear and homogeneous*.
:::
:::

Change the conditions slightly and the conclusion fails. The solutions of $A\mathbf{x} = \mathbf{b}$ with $\mathbf{b} \neq \mathbf{0}$ never form a subspace, since $\mathbf{0}$ is not a solution; nor do the polynomials with $p(1) = 1$; nor the solutions of $y'' + y = 1$. Closure can also fail in subtler ways.

::: example Sets that are not subspaces {#ex-not-subspaces}
Decide which of these subsets of $\R^2$ are subspaces: (a) the line $y = 2x + 1$; (b) the first quadrant $Q = \set{(x,y) : x\ge0,\ y\ge0}$; (c) the union of the two axes $X = \set{(x, y) : xy = 0}$; (d) the set $H = \set{(x, y): xy \ge 0}$.
::: solution
(a) The line does not contain $(0,0)$, so it is not a subspace.

(b) $Q$ contains $\mathbf{0}$ and is closed under addition, but not under scalar multiplication: $(1, 1)\in Q$ but $(-1)(1,1) = (-1,-1)\notin Q$. Not a subspace.

(c) $X$ contains $\mathbf{0}$ and is closed under scalar multiplication (a multiple of a point on an axis is on the same axis), but $(1, 0) + (0, 1) = (1,1)\notin X$. Not a subspace.

(d) $H$ is the union of the first and third quadrants, including the axes. It contains $\mathbf{0}$ and is closed under scalar multiplication ($(ax)(ay) = a^2xy\ge 0$), but $(1, 2) + (-2, -1) = (-1, 1)\notin H$. Not a subspace.

In fact, as we will see in [[linear-algebra/basis-dimension]], the only subspaces of $\R^2$ are $\{\mathbf{0}\}$, the lines through the origin, and $\R^2$ itself.
:::
:::

::: quiz
Which of the following are subspaces of the vector space $M_2(\R)$ of $2\times 2$ real matrices? (Select all that apply.)
- [x] The symmetric matrices, $A\T = A$.
- [ ] The invertible matrices.
- [x] The matrices with trace $a_{11} + a_{22} = 0$.
- [ ] The matrices whose entries are all $\ge 0$.
::: solution
Symmetric matrices: $O\T = O$, $(A + B)\T = A\T + B\T = A + B$ and $(cA)\T = cA$, so yes. Trace zero: the trace is a linear and homogeneous condition ($\tr(A + B) = \tr A + \tr B$, $\tr(cA) = c\tr A$), so yes. The invertible matrices do not contain $O$ (and $I + (-I) = O$ shows they are not closed under addition). Non-negative matrices are not closed under multiplication by $-1$.
:::
:::

New subspaces can be built from old ones. If $U$ and $W$ are subspaces of $V$, their **intersection** $U\cap W$ and their **sum**

$$
U + W = \set{u + w : u\in U,\ w\in W}
$$

are subspaces (check the three conditions; for the sum, $(u + w) + (u' + w') = (u + u') + (w + w')$). The sum is the smallest subspace containing both $U$ and $W$. The *union* $U \cup W$ is usually not a subspace — the two axes in [[#ex-not-subspaces]] are an example — and [[#exr-union]] shows exactly when it is.

::: definition Direct sum {#def-direct-sum}
If every $v\in V$ can be written as $v = u + w$ with $u\in U$ and $w \in W$ in **exactly one** way, we say $V$ is the **direct sum** of $U$ and $W$ and write $V = U\oplus W$.
:::

::: proposition Criterion for a direct sum {#prop-direct-sum}
Let $U$ and $W$ be subspaces of $V$ with $U + W = V$. Then $V = U \oplus W$ if and only if $U\cap W = \{0\}$.
:::

::: proof
Suppose $V = U\oplus W$ and $v \in U\cap W$. Then $v = v + 0 = 0 + v$ are two ways of writing $v$ as (element of $U$) $+$ (element of $W$), so by uniqueness $v = 0$. Conversely, suppose $U \cap W = \{0\}$ and $v = u + w = u' + w'$ with $u, u'\in U$, $w, w'\in W$. Then $u - u' = w' - w$; the left side is in $U$ and the right side in $W$, so both lie in $U \cap W = \{0\}$. Hence $u = u'$ and $w = w'$.
:::

For example, $\R^2$ is the direct sum of any two different lines through the origin, and every square matrix is uniquely a symmetric matrix plus a skew-symmetric one ([[#exr-sym-skew]]).

## Linear combinations and span

::: definition Linear combination and span {#def-span}
A **linear combination** of vectors $v_1, \dots, v_k\in V$ is a vector of the form $a_1v_1 + \dots + a_kv_k$ with $a_1, \dots, a_k\in\F$. The **span** of $v_1, \dots, v_k$ is the set of all their linear combinations,

$$
\Span(v_1, \dots, v_k) = \set{a_1v_1 + \dots + a_kv_k : a_1, \dots, a_k\in\F},
$$

and by convention the span of the empty list is $\{0\}$. If $\Span(v_1,\dots,v_k) = V$, we say that $v_1, \dots, v_k$ **span** $V$, or form a **spanning list** for $V$.
:::

::: theorem The span is the smallest subspace {#thm-span}
$\Span(v_1, \dots, v_k)$ is a subspace of $V$ containing each $v_j$, and it is contained in every subspace of $V$ that contains all of $v_1, \dots, v_k$.
:::

::: proof
Taking all coefficients zero shows $0 \in \Span(v_1,\dots,v_k)$. Sums and multiples of linear combinations are linear combinations:

$$
\textstyle\sum_j a_jv_j + \sum_j b_jv_j = \sum_j (a_j + b_j)v_j, \qquad c\sum_j a_jv_j = \sum_j (ca_j)v_j,
$$

so the span is a subspace by [[#thm-subspace-test]]. It contains $v_j$ (take $a_j = 1$ and the other coefficients $0$). Finally, a subspace containing $v_1, \dots, v_k$ is closed under addition and scalar multiplication, so it contains every linear combination of them.
:::

Spans give a simple way to manufacture subspaces, and every subspace we will meet in finite dimensions is a span. Geometrically, in $\R^3$ the span of one non-zero vector is a line through the origin, and the span of two non-parallel vectors is a plane through the origin.

For a matrix $A$ with columns $\mathbf{a}_1, \dots, \mathbf{a}_n \in \F^m$, the span of the columns is the **column space**

$$
\operatorname{Col}(A) = \Span(\mathbf{a}_1, \dots, \mathbf{a}_n) = \set{A\mathbf{x} : \mathbf{x}\in\F^n}.
$$

Because $A\mathbf{x} = x_1\mathbf{a}_1 + \dots + x_n\mathbf{a}_n$, a vector $\mathbf{b}$ lies in $\operatorname{Col}(A)$ exactly when the system $A\mathbf{x} = \mathbf{b}$ is consistent. Questions about spans in $\F^m$ are therefore questions about linear systems, and Gaussian elimination answers them.

::: example Is it in the span? {#ex-in-span}
Let $\mathbf{v}_1 = (1, 0, 1)$ and $\mathbf{v}_2 = (1, 2, 3)$. Decide whether $\mathbf{b} = (2, 1, 5)$ and $\mathbf{c} = (3, 2, 5)$ lie in $\Span(\mathbf{v}_1, \mathbf{v}_2)$, and describe this span geometrically.
::: solution
$\mathbf{b} = x_1\mathbf{v}_1 + x_2\mathbf{v}_2$ is a system with augmented matrix $[\,\mathbf{v}_1\ \mathbf{v}_2 \mid \mathbf{b}\,]$:

$$
\left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 1&3&5 \end{array}\right] \xrightarrow{R_3 - R_1} \left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 0&2&3 \end{array}\right] \xrightarrow{R_3 - R_2} \left[\begin{array}{cc|c} 1&1&2\\ 0&2&1\\ 0&0&2 \end{array}\right].
$$

The last row is $0 = 2$: inconsistent, so $\mathbf{b}\notin\Span(\mathbf{v}_1,\mathbf{v}_2)$. The same operations on $[\,\mathbf{v}_1\ \mathbf{v}_2\mid\mathbf{c}\,]$ give the last column $(3, 2, 0)$: consistent, with $x_2 = 1$ and $x_1 = 2$. Indeed $2(1,0,1) + (1,2,3) = (3,2,5)$.

The span is a plane through the origin. Its equation can be found by doing the elimination with a general right-hand side $(b_1, b_2, b_3)$: the last entry becomes $b_3 - b_1 - b_2$, so the span is the plane $b_1 + b_2 - b_3 = 0$. Check: $2 + 1 - 5 \neq 0$ but $3 + 2 - 5 = 0$.
:::
:::

::: widget transform2d
matrix: 1,3; 2,1
caption: The columns of $A$ are the images of $\mathbf{e}_1$ and $\mathbf{e}_2$, and the transformed grid shows the combinations $x_1\mathbf{a}_1 + x_2\mathbf{a}_2$, so it fills out $\operatorname{Col}(A)$. Here the columns $(1,2)$ and $(3,1)$ span the whole plane. Now change the second column to $(0.5, 1)$, half the first: the grid collapses onto a line, because the span of two parallel vectors is only a line.
:::

Spans make sense in every vector space, not only in $\F^n$. In the space of functions, $\Span(\sin x, \cos x)$ is exactly the set of solutions of $y'' + y = 0$ (a fact from [[ode/second-order-linear]]); every element is a sinusoid $a\sin x + b\cos x = R\sin(x + \varphi)$ with amplitude $R = \sqrt{a^2 + b^2}$.

::: widget plot
f: a*sin(x) + b*cos(x)
x: -2pi, 2pi
y: -4, 4
sliders: a=1:-3:3:0.1; b=1:-3:3:0.1
piticks: true
labels: a\sin x + b\cos x
caption: A two-parameter family of vectors in a function space: the span of $\sin x$ and $\cos x$. Every choice of the weights $a, b$ gives a wave of period $2\pi$ and amplitude $\sqrt{a^2+b^2}$. Setting $a = b = 0$ gives the zero vector — the function that is identically $0$.
:::

## Linear independence

A spanning list may contain redundancy. In $\Span(\mathbf{v}_1, \mathbf{v}_2, \mathbf{v}_1 + \mathbf{v}_2)$ the third vector adds nothing. Linear independence is the precise meaning of "no redundancy".

::: definition Linear independence {#def-independent}
A list $v_1, \dots, v_k$ of vectors in $V$ is **linearly independent** if the only choice of scalars with

$$
a_1v_1 + a_2v_2 + \dots + a_kv_k = 0
$$

is $a_1 = a_2 = \dots = a_k = 0$. Otherwise the list is **linearly dependent**, and an equation $a_1v_1 + \dots + a_kv_k = 0$ with not all $a_j = 0$ is a **linear dependence relation**. The empty list is linearly independent.
:::

Some immediate consequences: a list containing the zero vector is dependent ($1\cdot 0 = 0$); a list with a repeated vector is dependent ($v - v = 0$); a single vector $v$ is independent exactly when $v \neq 0$ (by [[#prop-axioms]], part 5); and two vectors are dependent exactly when one is a multiple of the other.

For vectors in $\F^m$ the definition is a statement about a homogeneous system: $\mathbf{v}_1, \dots, \mathbf{v}_k$ are linearly independent if and only if $A\mathbf{x} = \mathbf{0}$ has only the trivial solution, where $A = (\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$; by [[linear-algebra/linear-systems#thm-exist-unique]] this happens exactly when **every column of $A$ is a pivot column**.

::: example Testing independence {#ex-independence}
(a) Are $(1,2,3)$, $(4,5,6)$, $(7,8,9)$ linearly independent? (b) Show that the functions $e^x$, $e^{2x}$, $e^{3x}$ are linearly independent in $\mathcal{F}(\R,\R)$.
::: solution
(a) Row reduce the matrix with these columns:

$$
\begin{pmatrix}1&4&7\\2&5&8\\3&6&9\end{pmatrix} \xrightarrow[R_3 - 3R_1]{R_2 - 2R_1} \begin{pmatrix}1&4&7\\0&-3&-6\\0&-6&-12\end{pmatrix} \xrightarrow{R_3 - 2R_2} \begin{pmatrix}1&4&7\\0&-3&-6\\0&0&0\end{pmatrix}.
$$

Column 3 is not a pivot column, so the vectors are dependent. To find a relation, solve $A\mathbf{x} = \mathbf{0}$: $x_3 = t$ is free, $-3x_2 - 6t = 0$ gives $x_2 = -2t$, and $x_1 + 4x_2 + 7x_3 = 0$ gives $x_1 = t$. With $t = 1$:

$$
(1,2,3) - 2(4,5,6) + (7,8,9) = (0,0,0).
$$

(b) Suppose $ae^x + be^{2x} + ce^{3x} = 0$ for **all** $x\in\R$ (the zero vector of a function space is the zero function, so the equation must hold at every point). Divide by $e^{3x}$: $ae^{-2x} + be^{-x} + c = 0$ for all $x$. Letting $x\to\infty$ gives $c = 0$. Then $ae^{-2x} + be^{-x} = 0$; multiplying by $e^{x}$ and letting $x\to\infty$ again gives $b = 0$, and then $ae^{-2x} = 0$ forces $a = 0$. So the only relation is the trivial one.
:::
:::

::: warning Independence of functions is about all points
To show functions are *dependent* you need one relation that holds at every point, such as $\sin(x + 1) = \cos 1\,\sin x + \sin 1\,\cos x$, which shows that $\sin x$, $\cos x$, $\sin(x+1)$ are dependent. To show they are *independent* it is not enough to find one point where some combination is non-zero; you must show that no non-trivial combination vanishes everywhere. A useful trick: if $\sum a_jf_j = 0$ everywhere, then it holds in particular at any points you choose, giving a linear system for the $a_j$; if that system has only the trivial solution, the functions are independent.
:::

The next lemma is the basic tool for removing redundancy, and it is the key to the theory of dimension.

::: lemma Linear dependence lemma {#lem-dependence}
Suppose $v_1, \dots, v_k$ is a linearly dependent list in $V$. Then there is an index $j$ such that

$$
v_j\in\Span(v_1, \dots, v_{j-1}),
$$

and removing $v_j$ from the list does not change its span. (For $j = 1$ this says $v_1 = 0$.)
:::

::: proof
Choose a dependence relation $a_1v_1 + \dots + a_kv_k = 0$ with not all $a_i = 0$, and let $j$ be the **largest** index with $a_j \neq 0$. Then $a_1v_1 + \dots + a_jv_j = 0$, and dividing by $a_j$,

$$
v_j = -\frac{a_1}{a_j}v_1 - \dots - \frac{a_{j-1}}{a_j}v_{j-1} \in \Span(v_1, \dots, v_{j-1}).
$$

For the second statement, any linear combination of $v_1, \dots, v_k$ can be rewritten, by substituting this expression for $v_j$, as a linear combination of the remaining vectors. So removing $v_j$ leaves the span unchanged.
:::

::: theorem Too many vectors are dependent {#thm-too-many}
Any list of more than $m$ vectors in $\F^m$ is linearly dependent.
:::

::: proof
Let $\mathbf{v}_1, \dots, \mathbf{v}_k \in \F^m$ with $k > m$, and $A = (\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$. The system $A\mathbf{x} = \mathbf{0}$ has $m$ equations and $k > m$ unknowns, so by [[linear-algebra/linear-systems#thm-more-unknowns]] it has a non-trivial solution $\mathbf{x}$, and $x_1\mathbf{v}_1 + \dots + x_k\mathbf{v}_k = \mathbf{0}$ is a dependence relation.
:::

For instance, any three vectors in the plane are dependent. In [[linear-algebra/basis-dimension]] this theorem grows into the statement that in a space spanned by $m$ vectors, any $m + 1$ vectors are dependent — the fact on which the notion of dimension rests. Finally, independence is exactly what makes coefficients unique.

::: proposition Unique coefficients {#prop-unique-coeffs}
The list $v_1, \dots, v_k$ is linearly independent if and only if every vector in $\Span(v_1, \dots, v_k)$ can be written as a linear combination of $v_1, \dots, v_k$ in only one way.
:::

::: proof
If $\sum a_jv_j = \sum b_jv_j$, then $\sum (a_j - b_j)v_j = 0$; independence forces $a_j = b_j$ for all $j$. Conversely, if representations are unique, then since $0 = \sum 0\,v_j$ is one representation of $0$, the only relation $\sum a_jv_j = 0$ is the one with all $a_j = 0$.
:::

::: quiz
Vectors $\mathbf{u}, \mathbf{v}, \mathbf{w}\in\R^3$ satisfy $\mathbf{w} = \mathbf{u} + \mathbf{v}$. Which statements must be true? (Select all that apply.)
- [x] $\mathbf{u}, \mathbf{v}, \mathbf{w}$ are linearly dependent.
- [x] $\Span(\mathbf{u}, \mathbf{v}, \mathbf{w}) = \Span(\mathbf{u}, \mathbf{v})$.
- [ ] $\Span(\mathbf{u}, \mathbf{v}, \mathbf{w})$ is a plane.
- [ ] $\mathbf{u}$ and $\mathbf{v}$ are linearly independent.
::: solution
$\mathbf{u} + \mathbf{v} - \mathbf{w} = \mathbf{0}$ is a dependence relation, and by [[#lem-dependence]] removing $\mathbf{w}$ does not change the span. But nothing forces $\mathbf{u}, \mathbf{v}$ to be independent: if $\mathbf{v} = 2\mathbf{u} \neq \mathbf{0}$, the span is a line, and if all three vectors are zero it is $\{\mathbf{0}\}$. So the span need not be a plane.
:::
:::

::: history
The idea of a space whose elements can be added and scaled, with notions of independence and dimension, appears in Hermann Grassmann's *Die lineale Ausdehnungslehre* (1844), a work so far ahead of its time that it was almost entirely ignored; a revised version of 1862 fared little better. Giuseppe Peano, who admired Grassmann, distilled the ideas into a short list of axioms in his *Calcolo geometrico* (1888) — the first axiomatic definition of a real vector space, essentially the one used today. The axiomatic viewpoint became standard only in the twentieth century, as it proved indispensable for spaces of functions: in his thesis of 1920, published in 1922, Stefan Banach set out the axioms for complete normed vector spaces, now called Banach spaces, which underpin modern analysis.
:::

## Where this leads

With subspaces, span and independence in place, [[linear-algebra/basis-dimension]] combines spanning and independence into the notion of a **basis**, proves that all bases of a space have the same size — its **dimension** — and computes bases for the null space and column space of a matrix. [[linear-algebra/linear-maps]] studies the functions between vector spaces that respect the operations. Function spaces such as $C[a,b]$ are infinite-dimensional vector spaces, and the geometry they acquire from inner products and norms drives Fourier series ([[pde/fourier-series]]), the $L^p$ spaces of [[measure-theory/lp-spaces]] and much of modern analysis ([[real-analysis/metric-spaces]]). Replacing the field of scalars by a ring gives the theory of modules, met in [[abstract-algebra/rings]].

::: summary
- A vector space is a set with an addition and a scalar multiplication satisfying eight axioms ([[#def-vector-space]]); examples include $\F^n$, matrices, polynomials and functions with pointwise operations.
- Familiar facts such as $0v = 0$, $(-1)v = -v$ and "$av = 0$ implies $a = 0$ or $v = 0$" follow from the axioms ([[#prop-axioms]]).
- A subset is a subspace exactly when it contains $0$ and is closed under addition and scalar multiplication ([[#thm-subspace-test]]); solution sets of homogeneous linear conditions are the typical examples.
- $\Span(v_1,\dots,v_k)$, the set of all linear combinations, is the smallest subspace containing the $v_j$; in $\F^m$, $\mathbf{b}\in\Span(\mathbf{a}_1,\dots,\mathbf{a}_n)$ iff $A\mathbf{x} = \mathbf{b}$ is consistent.
- Vectors are linearly independent when only the trivial combination gives $0$; in $\F^m$, iff every column of $(\mathbf{v}_1\ \cdots\ \mathbf{v}_k)$ is a pivot column.
- In a dependent list some vector lies in the span of the earlier ones and can be removed without changing the span ([[#lem-dependence]]).
- More than $m$ vectors in $\F^m$ are always dependent ([[#thm-too-many]]); independence is equivalent to uniqueness of coefficients.
:::

## Exercises

::: exercise Subspace or not? {level=1}
Which of the following are subspaces of $\R^3$? Justify each answer. (a) $\set{(x,y,z) : x + 2y - z = 0}$; (b) $\set{(x,y,z) : x + 2y - z = 1}$; (c) $\set{(x,y,z): x = y^2}$; (d) $\set{(t, 2t, -t) : t\in\R}$.
::: solution
(a) Yes: it is $\operatorname{Nul}(A)$ for $A = (1\ \ 2\ {-1})$, a subspace by [[#ex-subspaces]]. (b) No: $(0,0,0)$ does not satisfy the equation. (c) No: $(1, 1, 0)$ is in the set but $2(1,1,0) = (2,2,0)$ is not, since $2 \neq 2^2$. (d) Yes: it is $\Span\bigl((1,2,-1)\bigr)$, a line through the origin, which is a subspace by [[#thm-span]].
:::
:::

::: exercise A missing parameter {level=1 check="4"}
For which value of $h$ does $(1, h, 5)$ lie in $\Span\bigl((1,0,1), (1,2,3)\bigr)$?
::: solution
By [[#ex-in-span]] the span is the plane $b_1 + b_2 - b_3 = 0$. So we need $1 + h - 5 = 0$, that is $h = 4$. Indeed $(1, 4, 5) = -(1,0,1) + 2(1,2,3)$.
:::
:::

::: exercise Finding a dependence relation {level=1}
Show that $(1,1,0)$, $(0,1,1)$, $(1,0,-1)$ are linearly dependent and find a dependence relation.
::: solution
Row reduce the matrix with these columns: $\begin{pmatrix}1&0&1\\1&1&0\\0&1&-1\end{pmatrix} \xrightarrow{R_2 - R_1}\begin{pmatrix}1&0&1\\0&1&-1\\0&1&-1\end{pmatrix}\xrightarrow{R_3 - R_2}\begin{pmatrix}1&0&1\\0&1&-1\\0&0&0\end{pmatrix}$. Column 3 is not a pivot column, so the vectors are dependent. With $x_3 = 1$: $x_2 = 1$, $x_1 = -1$, giving $-(1,1,0) + (0,1,1) + (1,0,-1) = (0,0,0)$.
:::
:::

::: exercise A parameter and independence {level=2 check="-1"}
Find the real value of $k$ for which the vectors $(1, k, 0)$, $(0, 1, k)$, $(k, 0, 1)$ are linearly dependent.
::: solution
Row reduce $A = \begin{pmatrix}1&0&k\\k&1&0\\0&k&1\end{pmatrix}$ (columns are the given vectors): $R_2 \to R_2 - kR_1$ gives $(0, 1, -k^2)$, and then $R_3 \to R_3 - kR_2$ gives $(0, 0, 1 + k^3)$. The vectors are dependent exactly when the third column is not a pivot column, i.e. $1 + k^3 = 0$. Since $1 + k^3 = (1 + k)(1 - k + k^2)$ and $1 - k + k^2 = (k - \frac12)^2 + \frac34 > 0$, the only real solution is $k = -1$. Check: $(1,-1,0) + (0,1,-1) + (-1,0,1) = \mathbf{0}$.
:::
:::

::: exercise A solution space {level=2}
Let $S$ be the set of twice-differentiable functions $y\colon\R\to\R$ with $y'' - 3y' + 2y = 0$. Prove that $S$ is a subspace of $\mathcal{F}(\R,\R)$, that $e^x$ and $e^{2x}$ belong to $S$, and that they are linearly independent.
::: solution
The zero function is in $S$. If $y_1, y_2\in S$ and $a, b\in\R$, then by linearity of differentiation

$$
(ay_1 + by_2)'' - 3(ay_1 + by_2)' + 2(ay_1 + by_2) = a(y_1'' - 3y_1' + 2y_1) + b(y_2'' - 3y_2' + 2y_2) = 0,
$$

so $S$ is a subspace. For $y = e^{rx}$ we get $y'' - 3y' + 2y = (r^2 - 3r + 2)e^{rx} = (r-1)(r-2)e^{rx}$, which vanishes for $r = 1$ and $r = 2$. If $ae^x + be^{2x} = 0$ for all $x$, then putting $x = 0$ gives $a + b = 0$, and differentiating and putting $x = 0$ gives $a + 2b = 0$; hence $a = b = 0$. (Differentiating is allowed because the identity holds for all $x$.)
:::
:::

::: exercise Symmetric plus skew-symmetric {level=2 #exr-sym-skew}
Let $\mathrm{Sym}$ and $\mathrm{Skew}$ be the sets of symmetric and skew-symmetric matrices in $M_n(\R)$. Prove that both are subspaces and that $M_n(\R) = \mathrm{Sym}\oplus\mathrm{Skew}$.
::: solution
Both contain $O$ and are closed under the operations because transposition respects sums and scalar multiples. Every $A$ decomposes as

$$
A = \tfrac12(A + A\T) + \tfrac12(A - A\T),
$$

where the first term is symmetric and the second skew-symmetric (since $(A\T)\T = A$). So $\mathrm{Sym} + \mathrm{Skew} = M_n(\R)$. If $B$ is both symmetric and skew-symmetric then $B = B\T = -B$, so $2B = O$ and $B = O$. By [[#prop-direct-sum]], the sum is direct.
:::
:::

::: exercise One axiom fails {level=2}
On $\R^2$ keep the usual addition but define the scalar multiplication $c\odot(x, y) = (cx, 0)$. Which of the eight axioms of [[#def-vector-space]] fail?
::: solution
Axioms 1–4 concern addition only, which is unchanged, so they hold. Axiom 6: $a\odot(b\odot(x,y)) = a\odot(bx, 0) = (abx, 0) = (ab)\odot(x,y)$, holds. Axiom 7: $a\odot\bigl((x,y) + (x',y')\bigr) = (a(x + x'), 0) = (ax, 0) + (ax', 0)$, holds. Axiom 8: $(a + b)\odot(x,y) = ((a+b)x, 0) = (ax,0) + (bx, 0)$, holds. Axiom 5 fails: $1\odot(x, y) = (x, 0) \neq (x, y)$ whenever $y\neq 0$. So exactly one axiom fails — which shows that axiom 5 cannot be deduced from the others.
:::
:::

::: exercise When is a union a subspace? {level=3 #exr-union}
Let $U$ and $W$ be subspaces of $V$. Prove that $U\cup W$ is a subspace if and only if $U\subseteq W$ or $W\subseteq U$.
::: hint
For the harder direction, suppose neither contains the other, pick $u\in U\setminus W$ and $w \in W\setminus U$, and ask where $u + w$ lies.
:::
::: solution
If $U\subseteq W$ then $U\cup W = W$, a subspace; similarly if $W\subseteq U$. Conversely suppose $U\cup W$ is a subspace but neither of $U, W$ contains the other. Choose $u\in U$ with $u\notin W$ and $w\in W$ with $w \notin U$. Since $U \cup W$ is closed under addition, $u + w\in U\cup W$. If $u + w\in U$, then $w = (u + w) - u\in U$, a contradiction. If $u + w\in W$, then $u = (u + w) - w\in W$, again a contradiction. Hence one of the subspaces contains the other.
:::
:::

::: exercise Extending an independent list {level=3}
Suppose $v_1, \dots, v_k$ are linearly independent in $V$ and $v\notin\Span(v_1,\dots,v_k)$. Prove that $v_1, \dots, v_k, v$ are linearly independent.
::: solution
Suppose $a_1v_1 + \dots + a_kv_k + bv = 0$. If $b\neq 0$, then $v = -\frac{1}{b}(a_1v_1 + \dots + a_kv_k)\in\Span(v_1,\dots,v_k)$, contrary to assumption. So $b = 0$, and then $a_1v_1 + \dots + a_kv_k = 0$ forces $a_1 = \dots = a_k = 0$ by independence. Hence all coefficients vanish. (Equivalently, apply [[#lem-dependence]]: in a dependent list $v_1,\dots,v_k,v$, the vector it produces cannot be among $v_1, \dots, v_k$, which are independent, nor can it be $v$.)
:::
:::

::: exercise Sines are independent {level=3}
Prove that for every $n\ge 1$ the functions $\sin x, \sin 2x, \dots, \sin nx$ are linearly independent in $\mathcal{F}(\R,\R)$.
::: hint
Use $\displaystyle\int_0^{2\pi}\sin jx\,\sin kx\,dx = 0$ for $j\neq k$ and $=\pi$ for $j = k$, which follows from $2\sin A\sin B = \cos(A - B) - \cos(A + B)$.
:::
::: solution
First the integrals: for positive integers $j, k$,

$$
\int_0^{2\pi}\sin jx\,\sin kx\,dx = \frac12\int_0^{2\pi}\bigl(\cos (j-k)x - \cos (j+k)x\bigr)\,dx,
$$

and $\int_0^{2\pi}\cos mx\,dx$ is $0$ for every integer $m\neq 0$ and $2\pi$ for $m = 0$. So the integral is $0$ if $j \neq k$ and $\frac12\cdot 2\pi = \pi$ if $j = k$. Now suppose $a_1\sin x + \dots + a_n\sin nx = 0$ for all $x$. Multiply by $\sin kx$ and integrate over $[0, 2\pi]$: every term except the $k$-th integrates to $0$, so $\pi a_k = 0$ and $a_k = 0$. This holds for each $k$, so the functions are independent. (This is the first glimpse of orthogonality in a function space — the subject of [[linear-algebra/inner-products]] and the basis of Fourier series.)
:::
:::
