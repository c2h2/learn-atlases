Take an equilateral triangle cut out of card and lay it in its outline on the table. In how many ways can you pick it up and put it back so that it fits the outline exactly? You can leave it alone; rotate it by $120^\circ$ or $240^\circ$; or flip it over about one of its three axes of symmetry. That makes six **symmetries**. They have three striking features. Doing one symmetry and then another is again a symmetry. "Leave it alone" is a symmetry that changes nothing. And every symmetry can be undone by another one.

Exactly the same three features turn up in places that have nothing to do with triangles: adding integers (adding $0$ changes nothing, adding $-a$ undoes adding $a$), multiplying non-zero real numbers, composing invertible matrices, shuffling a deck of cards, turning the faces of a Rubik's cube. A **group** is what all of these have in common. By proving theorems about groups in general we prove them, once and for all, about every one of these examples.

In this chapter we make the definition precise, build a stock of examples that we will use throughout the course, derive the first consequences of the axioms, learn to read and write Cayley tables, and meet the idea of an isomorphism — the precise sense in which two groups that look different can be "the same group".

## Symmetries of a triangle

Label the corners of the outline $1, 2, 3$ anticlockwise; a symmetry moves the card, and we record where the corner sitting at each labelled position ends up. Let $r$ be the anticlockwise rotation by $120^\circ$, so $r$ moves position $1$ to $2$, $2$ to $3$ and $3$ to $1$. Let $s_i$ be the reflection in the axis through corner $i$; for example $s_1$ fixes position $1$ and swaps $2$ and $3$. Together with the identity $e$ ("do nothing") and $r^2 = $ "rotate twice" (by $240^\circ$) we have all six symmetries:

$$
e,\quad r,\quad r^2,\quad s_1,\quad s_2,\quad s_3 .
$$

We combine symmetries by doing one after the other. Following the convention for composing functions, $ab$ means "**first do $b$, then do $a$**", just as $(f\circ g)(x) = f(g(x))$ applies $g$ first.

::: example Order matters {#ex-triangle}
Compute $rs_1$ and $s_1r$.
::: solution
Track each position. For $rs_1$ we apply $s_1$ first and then $r$:

$$
1 \xrightarrow{s_1} 1 \xrightarrow{r} 2,\qquad 2 \xrightarrow{s_1} 3 \xrightarrow{r} 1,\qquad 3 \xrightarrow{s_1} 2 \xrightarrow{r} 3 .
$$

So $rs_1$ fixes $3$ and swaps $1$ and $2$: it is the reflection $s_3$. For $s_1 r$ we apply $r$ first:

$$
1 \xrightarrow{r} 2 \xrightarrow{s_1} 3,\qquad 2 \xrightarrow{r} 3 \xrightarrow{s_1} 2,\qquad 3 \xrightarrow{r} 1 \xrightarrow{s_1} 1,
$$

which fixes $2$ and swaps $1$ and $3$: it is $s_2$. Hence $rs_1 = s_3 \neq s_2 = s_1 r$. Combining symmetries is **not commutative**: the order in which we do them matters.
:::
:::

Doing all such calculations gives the complete "multiplication table" of the six symmetries. The entry in row $a$ and column $b$ is $ab$ (column first, then row):

$$
\begin{array}{c|cccccc}
 & e & r & r^2 & s_1 & s_2 & s_3 \\ \hline
e & e & r & r^2 & s_1 & s_2 & s_3 \\
r & r & r^2 & e & s_3 & s_1 & s_2 \\
r^2 & r^2 & e & r & s_2 & s_3 & s_1 \\
s_1 & s_1 & s_2 & s_3 & e & r & r^2 \\
s_2 & s_2 & s_3 & s_1 & r^2 & e & r \\
s_3 & s_3 & s_1 & s_2 & r & r^2 & e
\end{array}
$$ {#eq-d3-table}

Several patterns are visible. Two rotations compose to a rotation, two reflections to a rotation, and a rotation and a reflection to a reflection. Every row and every column contains each symmetry exactly once. And the table is not symmetric about its main diagonal, which is another way of saying that $ab \neq ba$ in general. We will see that the second pattern holds for every group, while the third singles out the non-commutative ones.

::: widget cayley
group: D
n: 3
highlight: r
mode: table
caption: The six symmetries of the triangle (the dihedral group $D_3$; the widget may label the reflections differently from $s_1, s_2, s_3$). The rotations $e, r, r^2$ are highlighted: composing two rotations never produces a reflection, so they form a closed block. Check that every element appears exactly once in each row and column, and find a pair of cells mirrored in the diagonal that hold different entries — evidence that the group is not abelian.
:::

## The group axioms

To extract what the examples have in common we first need the idea of an operation.

::: definition Binary operation {#def-binary-operation}
A **binary operation** on a set $G$ is a function $G \times G \to G$. We usually write the value at $(a, b)$ as $a * b$, $a \cdot b$, $ab$ or $a + b$.
:::

The definition contains a requirement that is easy to overlook: the result $a * b$ must again lie in $G$. We say $G$ is **closed** under $*$. Subtraction is a binary operation on $\Z$ but not on $\N = \set{1, 2, 3, \dots}$ (since $1 - 2 \notin \N$), and division is not a binary operation on $\R$ (since $1/0$ is undefined), although it is one on $\R \setminus \set{0}$.

::: definition Group {#def-group}
A **group** is a set $G$ together with a binary operation $(a, b) \mapsto ab$ on $G$ such that:

1. (**associativity**) $(ab)c = a(bc)$ for all $a, b, c \in G$;
2. (**identity**) there is an element $e \in G$ with $ea = ae = a$ for all $a \in G$;
3. (**inverses**) for each $a \in G$ there is an element $b \in G$ with $ab = ba = e$.

The **order** of $G$, written $\abs{G}$, is the number of elements of $G$ (possibly infinite).
:::

::: definition Abelian group {#def-abelian}
A group $G$ is **abelian** (or commutative) if $ab = ba$ for all $a, b \in G$. Otherwise it is **non-abelian**.
:::

So the triangle symmetries form a non-abelian group of order $6$, with identity $e$; the inverse of $r$ is $r^2$ and each reflection is its own inverse. Associativity holds because composition of functions is always associative: both $(f\circ g)\circ h$ and $f \circ (g \circ h)$ send $x$ to $f(g(h(x)))$.

::: remark Notation
Two notations are in common use. In **multiplicative notation** we write $ab$, call the identity $e$ (or $1$) and write $a^{-1}$ for the inverse. In **additive notation** we write $a + b$, call the identity $0$ and write $-a$ for the inverse; by convention additive notation is used only for abelian groups. When the operation is clear we simply say "the group $G$".
:::

::: intuition What the axioms say
Associativity says that a sequence of operations can be grouped however we like, so expressions such as $abcd$ make sense without brackets. The identity is a "do nothing" element. Inverses say every operation can be undone. Commutativity is *not* an axiom: many of the most important groups — symmetries, permutations, matrices — are non-abelian, and much of the interest of the subject lies there.
:::

## A gallery of groups

Abstract algebra is learnt through examples. The following groups will appear again and again in this course; it is worth checking each axiom for each of them.

**Numbers under addition.** $\Z$, $\Q$, $\R$ and $\C$ are abelian groups under $+$, with identity $0$ and inverse $-a$. So is $n\Z = \set{nk : k \in \Z}$, the multiples of $n$. The natural numbers $\N$ are not a group under addition: there is no identity in $\N$, and even in $\set{0, 1, 2, \dots}$ the element $1$ has no inverse.

**Numbers under multiplication.** $\Q^\times = \Q \setminus \set{0}$, $\R^\times$ and $\C^\times$ are abelian groups under multiplication, with identity $1$ and inverse $1/a$. So are the positive reals $\R_{>0}$, the two-element set $\set{1, -1}$ and the unit circle $\set{z \in \C : \abs{z} = 1}$. On the other hand $\Z \setminus \set{0}$ is not a group under multiplication: $2$ has no inverse in it.

**Roots of unity.** For $n \ge 1$ the $n$-th roots of unity

$$
\mu_n = \set{z \in \C : z^n = 1} = \set{1, \omega, \omega^2, \dots, \omega^{n-1}}, \qquad \omega = e^{2\pi i/n},
$$

form a group of order $n$ under multiplication: if $z^n = w^n = 1$ then $(zw)^n = z^n w^n = 1$ and $(1/z)^n = 1$. Geometrically (see [[complex-analysis/complex-numbers]]) they are the vertices of a regular $n$-gon inscribed in the unit circle, and multiplying by $\omega$ rotates the polygon by $2\pi/n$.

::: widget complexplane
mode: roots
n: 6
z: 1,0
caption: The six sixth roots of unity $\omega^k = e^{2\pi i k/6}$ sit at the corners of a regular hexagon. Multiplying complex numbers adds their arguments, so the product of two sixth roots of unity is again one of them (closure), $1$ is the identity and $\omega^{-k} = \omega^{6-k}$ is the inverse of $\omega^k$. For other $n$ the roots of unity form a regular $n$-gon in the same way.
:::

**Integers modulo $n$.** Let $n \ge 1$ and $\Z_n = \set{0, 1, \dots, n-1}$. For $a, b \in \Z_n$ define $a +_n b$ to be the remainder when $a + b$ is divided by $n$. For example in $\Z_5$, $3 + 4 = 2$, and in $\Z_{12}$, $9 + 5 = 2$ — "clock arithmetic". Then $\Z_n$ is an abelian group of order $n$: the identity is $0$, the inverse of $a \neq 0$ is $n - a$, and associativity holds because both $(a +_n b) +_n c$ and $a +_n (b +_n c)$ equal the remainder of the ordinary integer $a + b + c$ on division by $n$. Congruences, the systematic language for this arithmetic, are developed in [[number-theory/congruences]].

**Units modulo $n$.** Multiplication modulo $n$ does *not* make $\Z_n$ a group: $0$ has no inverse, and in $\Z_6$ neither does $2$, because $2b$ is always even and so never leaves remainder $1$ on division by $6$. The fix is to keep only the elements that can be inverted.

::: theorem The group $U(n)$ {#thm-un-group}
Let $n \ge 2$ and $U(n) = \set{a \in \set{1, 2, \dots, n-1} : \gcd(a, n) = 1}$. Then $U(n)$ is an abelian group under multiplication modulo $n$.
:::

::: proof
We use Bézout's identity ([[number-theory/divisibility#thm-bezout]]): $\gcd(a, n) = 1$ if and only if $ax + ny = 1$ for some integers $x, y$.

*Closure.* Let $a, b \in U(n)$, with $ax + ny = 1$ and $bu + nv = 1$. Multiplying,

$$
1 = (ax + ny)(bu + nv) = ab(xu) + n(axv + ybu + nyv),
$$

so $\gcd(ab, n) = 1$. If $ab = qn + c$ with $0 \le c < n$, then any common divisor of $c$ and $n$ also divides $ab = qn + c$, hence divides $1$; so $\gcd(c, n) = 1$, and $c \neq 0$ because $\gcd(0, n) = n \ge 2$. Thus the product $c$ of $a$ and $b$ modulo $n$ lies in $U(n)$.

*Associativity and commutativity* follow from the corresponding properties of integer multiplication, exactly as for $\Z_n$: both ways of bracketing $abc$ give the remainder of the integer $abc$.

*Identity.* $1 \in U(n)$ and $1 \cdot a = a$.

*Inverses.* If $ax + ny = 1$, let $x'$ be the remainder of $x$ on division by $n$, say $x' = x - kn$. Then $ax' = ax - akn = 1 - n(y + ak)$, so $ax'$ leaves remainder $1$ on division by $n$ (for $n \ge 2$). Moreover $x' \neq 0$, and $\gcd(x', n) = 1$ because $ax' + n(y + ak) = 1$. So $x' \in U(n)$ is an inverse of $a$.
:::

For example $U(10) = \set{1, 3, 7, 9}$, with $3 \cdot 7 = 21 \equiv 1$ and $9 \cdot 9 = 81 \equiv 1$, so $3^{-1} = 7$ and $9^{-1} = 9$. When $p$ is prime, $U(p) = \set{1, 2, \dots, p-1}$ has order $p - 1$. In general $\abs{U(n)}$ is Euler's totient $\varphi(n)$, studied in [[number-theory/fermat-euler]].

::: example Inverses in $U(15)$ {#ex-u15}
List the elements of $U(15)$ and find the inverse of each.
::: solution
The integers from $1$ to $14$ sharing no factor with $15 = 3\cdot 5$ are

$$
U(15) = \set{1, 2, 4, 7, 8, 11, 13, 14},
$$

so $\abs{U(15)} = 8$. Inverses can be found by inspection or with Euclid's algorithm: $2 \cdot 8 = 16 \equiv 1$, $4 \cdot 4 = 16 \equiv 1$, $7 \cdot 13 = 91 = 6\cdot 15 + 1$, $11 \cdot 11 = 121 = 8 \cdot 15 + 1$, $14 \cdot 14 = 196 = 13 \cdot 15 + 1$. Hence

$$
1^{-1} = 1,\ 2^{-1} = 8,\ 4^{-1} = 4,\ 7^{-1} = 13,\ 8^{-1} = 2,\ 11^{-1} = 11,\ 13^{-1} = 7,\ 14^{-1} = 14 .
$$

Notice that $14 \equiv -1$, so $14^{-1} = 14$ just says $(-1)(-1) = 1$.
:::
:::

**Matrix groups.** The **general linear group** $\mathrm{GL}_n(\R)$ is the set of invertible $n \times n$ real matrices under matrix multiplication. Closure holds because $\det(AB) = \det A \det B \neq 0$ (see [[linear-algebra/determinants]]), matrix multiplication is associative, the identity is $I_n$ and the inverse is the inverse matrix. The matrices with determinant $1$ form the **special linear group** $\mathrm{SL}_n(\R)$, which is a group for the same reasons. For $n \ge 2$ these groups are non-abelian: with

$$
A = \begin{pmatrix} 1 & 1 \\ 0 & 1 \end{pmatrix},\quad B = \begin{pmatrix} 1 & 0 \\ 1 & 1 \end{pmatrix}:\qquad AB = \begin{pmatrix} 2 & 1 \\ 1 & 1 \end{pmatrix} \neq \begin{pmatrix} 1 & 1 \\ 1 & 2 \end{pmatrix} = BA .
$$

The same definitions work with entries from $\Q$, $\C$ or $\Z_p$ ($p$ prime), giving groups such as $\mathrm{GL}_2(\Z_2)$, which has just six elements ([[#exr-1-5]]).

**Symmetry and permutation groups.** The symmetries of a regular $n$-gon form the **dihedral group** $D_n$ of order $2n$; the triangle gave $D_3$. The bijections from a set $X$ to itself form a group under composition, the **symmetric group** $\operatorname{Sym}(X)$; for $X = \set{1, \dots, n}$ it is written $S_n$ and has $n!$ elements. Both are studied in detail in [[abstract-algebra/permutation-groups]].

::: quiz
Which of the following are groups? (Select all that apply.)
- [ ] $\Z$ under subtraction
- [x] $\R_{>0}$ under multiplication
- [x] $\set{1, 2, 3, 4}$ under multiplication modulo $5$
- [ ] $\set{0, 1, 2, 3}$ under multiplication modulo $4$
- [x] The $2\times 2$ real matrices under addition
::: solution
Subtraction is not associative: $(1 - 1) - 1 = -1$ but $1 - (1 - 1) = 1$. The positive reals are closed under multiplication, $1$ is the identity and $1/a$ is positive. $\set{1,2,3,4}$ modulo $5$ is $U(5)$. Modulo $4$, the element $0$ (and also $2$) has no multiplicative inverse. Matrices under addition form an abelian group with identity the zero matrix — invertibility is only needed for *multiplication*.
:::
:::

## First consequences of the axioms

Everything we prove now uses only the three axioms, so it holds in every group at once. Notice how each step is justified by an axiom; habits from ordinary arithmetic, such as swapping factors, are not available.

::: theorem Uniqueness of identity and inverses {#thm-group-basics}
In a group $G$:

1. there is exactly one identity element;
2. each $a \in G$ has exactly one inverse.
:::

::: proof
1. Suppose $e$ and $e'$ are both identities. Since $e$ is an identity, $ee' = e'$; since $e'$ is an identity, $ee' = e$. Hence $e = e'$.

2. Suppose $b$ and $c$ are both inverses of $a$, so $ab = ba = e$ and $ac = ca = e$. Then, using associativity,

$$
b = be = b(ac) = (ba)c = ec = c . \qquad
$$
:::

Because the inverse is unique we may give it a name: $a^{-1}$ (or $-a$ in additive notation).

::: theorem Cancellation laws {#thm-cancellation}
Let $a, b, c$ be elements of a group $G$.

1. If $ab = ac$ then $b = c$ (left cancellation); if $ba = ca$ then $b = c$ (right cancellation).
2. The equations $ax = b$ and $ya = b$ have the unique solutions $x = a^{-1}b$ and $y = ba^{-1}$.
:::

::: proof
1. Multiply $ab = ac$ on the left by $a^{-1}$: $a^{-1}(ab) = a^{-1}(ac)$, so by associativity $(a^{-1}a)b = (a^{-1}a)c$, that is $eb = ec$, so $b = c$. Right cancellation is the mirror image.

2. $x = a^{-1}b$ is a solution because $a(a^{-1}b) = (aa^{-1})b = eb = b$. If $x$ and $x'$ are both solutions, then $ax = b = ax'$ and left cancellation gives $x = x'$. The equation $ya = b$ is handled in the same way, multiplying on the right.
:::

::: warning Cancel on the same side
In a non-abelian group, $ab = ca$ does **not** imply $b = c$. In the triangle group, $rs_1 = s_3 = s_2 r$ (read both products off [[#eq-d3-table]]), yet $s_1 \neq s_2$. Cancellation is only allowed when the common factor is on the same side of both products. Similarly, "dividing" is ambiguous: the solution of $ax = b$ is $a^{-1}b$, which in general differs from $ba^{-1}$, so never write $b/a$ in a non-abelian group.
:::

::: proposition Inverses of products {#prop-inverse-product}
For all $a, b$ in a group, $(a^{-1})^{-1} = a$ and $(ab)^{-1} = b^{-1}a^{-1}$.
:::

::: proof
Since $a^{-1}a = aa^{-1} = e$, the element $a$ satisfies the definition of an inverse of $a^{-1}$; by uniqueness ([[#thm-group-basics]]) $(a^{-1})^{-1} = a$. Next,

$$
(ab)(b^{-1}a^{-1}) = a(bb^{-1})a^{-1} = aea^{-1} = aa^{-1} = e,
$$

and similarly $(b^{-1}a^{-1})(ab) = e$. So $b^{-1}a^{-1}$ is the inverse of $ab$.
:::

The reversal of order is familiar from everyday life: to undo "put on socks, then shoes" you take off the shoes first. It is also familiar from matrices, where $(AB)^{-1} = B^{-1}A^{-1}$.

**Powers.** For $a \in G$ and $n \ge 1$ define $a^n = aa\cdots a$ ($n$ factors), $a^0 = e$ and $a^{-n} = (a^{-1})^n$. A routine induction on $m$ and $n$ (treating the signs separately) proves the **exponent laws**

$$
a^m a^n = a^{m+n}, \qquad (a^m)^n = a^{mn} \qquad (m, n \in \Z).
$$ {#eq-exponent-laws}

In additive notation $a^n$ becomes the multiple $na$, and the laws read $ma + na = (m+n)a$ and $n(ma) = (mn)a$.

::: warning $(ab)^n$ is not $a^n b^n$
In general $(ab)^2 = abab$, and we cannot rearrange this to $aabb = a^2b^2$. In the triangle group, $(rs_1)^2 = s_3^2 = e$ while $r^2 s_1^2 = r^2 \neq e$. The identity $(ab)^n = a^n b^n$ is a property of abelian groups, as the next example shows.
:::

::: example Squares and commutativity {#ex-squares}
Prove that a group $G$ is abelian if and only if $(ab)^2 = a^2b^2$ for all $a, b \in G$.
::: solution
If $G$ is abelian then $(ab)^2 = abab = a(ba)b = a(ab)b = a^2b^2$.

Conversely, suppose $(ab)^2 = a^2 b^2$ for all $a, b$. Then $abab = aabb$. Cancelling $a$ on the left and $b$ on the right ([[#thm-cancellation]]) gives $ba = ab$. Since $a$ and $b$ were arbitrary, $G$ is abelian.
:::
:::

::: example Groups in which every element is its own inverse {#ex-exponent-two}
Suppose $x^2 = e$ for every $x$ in a group $G$. Show that $G$ is abelian.
::: solution
The condition says $x^{-1} = x$ for every $x$. For $a, b \in G$, apply this to $a$, $b$ and $ab$, together with [[#prop-inverse-product]]:

$$
ab = (ab)^{-1} = b^{-1}a^{-1} = ba .
$$

Examples are $U(8) = \set{1, 3, 5, 7}$, where $3^2 = 9$, $5^2 = 25$ and $7^2 = 49$ are all $\equiv 1 \pmod 8$, and the group of subsets of a set under symmetric difference.
:::
:::

::: remark Generalised associativity
Associativity is stated for three elements, but it implies that *any* bracketing of a product $a_1a_2\cdots a_n$ gives the same result (a proof by strong induction on $n$ shows every bracketing equals $a_1(a_2(\cdots(a_{n-1}a_n)))$). This is why we may drop brackets altogether. The *order* of the factors, of course, still matters.
:::

## Cayley tables

A finite group is completely described by its **Cayley table**: list the elements $g_1, \dots, g_n$ along the top and down the side, and put $g_ig_j$ in row $i$, column $j$. Table [[#eq-d3-table]] is the Cayley table of $D_3$. For small groups the table is the quickest way to see everything at once.

::: theorem Latin square property {#thm-latin}
In the Cayley table of a finite group, every element appears exactly once in each row and exactly once in each column.
:::

::: proof
Fix a row, labelled $a$; its entries are $ag_1, \dots, ag_n$. These are distinct: $ag_i = ag_j$ implies $g_i = g_j$ by cancellation. So the row contains $n$ distinct elements of the $n$-element set $G$, hence each element exactly once. (Alternatively: $b$ appears in the column labelled $a^{-1}b$, and only there, by [[#thm-cancellation]].) Columns are handled by right cancellation.
:::

The Latin square property is a useful check on a computed table, and it is strong enough to pin down the smallest groups completely.

::: example Groups of order 3 and 4 {#ex-small-groups}
Show that there is essentially only one possible Cayley table for a group of order $3$, and exactly two for a group of order $4$.
::: solution
*Order 3.* Let $G = \set{e, a, b}$. The product $ab$ cannot be $a$ (that would force $b = e$) or $b$ (forcing $a = e$), so $ab = e$ and $b = a^{-1}$. Next $a^2 \neq a$ (else $a = e$), and $a^2 \neq e$ (else $a^2 = e = ab$ and cancellation gives $a = b$). So $a^2 = b$, and the whole table is forced: $G = \set{e, a, a^2}$ with $a^3 = e$. This is the table of $\Z_3$, writing $a = 1$, $a^2 = 2$.

*Order 4.* **Case 1:** some element $a$ has $a^2 \neq e$. Then $e, a, a^2$ are distinct. Let $b$ be the fourth element. If $a^3 = e$, consider $ab$: it is not $a$ or $b$ (cancellation), not $e$ (else $b = a^{-1} = a^2$), and not $a^2$ (else $b = a$) — impossible. So $a^3 \neq e$; also $a^3 \neq a$ (as $a^2 \neq e$) and $a^3 \neq a^2$ (as $a \neq e$), so $a^3 = b$ and $G = \set{e, a, a^2, a^3}$. The same reasoning shows $a^4 = e$. This is the table of $\Z_4$ with $a = 1$.

**Case 2:** every element satisfies $x^2 = e$. Write $G = \set{e, a, b, c}$. Then $ab \notin \set{a, b}$ by cancellation and $ab \neq e$ (else $b = a^{-1} = a$), so $ab = c$; likewise the product of any two distinct non-identity elements is the third. This is the **Klein four-group** $V_4$:

$$
\begin{array}{c|cccc}
 & e & a & b & c \\ \hline
e & e & a & b & c \\
a & a & e & c & b \\
b & b & c & e & a \\
c & c & b & a & e
\end{array}
$$

Both tables really are groups ($\Z_4$ obviously; for $V_4$, see $U(8)$ below). So up to renaming the elements there are exactly two groups of order $4$, and both are abelian.
:::
:::

::: widget cayley
group: U
n: 10
mode: table
caption: The Cayley table of $U(10) = \set{1, 3, 7, 9}$ under multiplication modulo $10$. Follow the powers of $3$: $3, 9, 27 \equiv 7, 81 \equiv 1$. Every element is a power of $3$, so this table is the table of $\Z_4$ in disguise. For $U(8) = \set{1,3,5,7}$, by contrast, every diagonal entry would be $1$: that table is the Klein four-group $V_4$ of [[#ex-small-groups]].
:::

## Isomorphism

The groups $\Z_4$ and $U(10)$ have different elements and different operations, yet their tables have the same pattern. Abstract algebra regards them as the same group.

::: definition Isomorphism {#def-isomorphism}
An **isomorphism** from a group $G$ to a group $H$ is a bijection $\varphi\colon G \to H$ such that

$$
\varphi(ab) = \varphi(a)\varphi(b) \qquad \text{for all } a, b \in G .
$$

(The product $ab$ is computed in $G$, the product $\varphi(a)\varphi(b)$ in $H$.) If an isomorphism exists, $G$ and $H$ are **isomorphic**, written $G \cong H$.
:::

An isomorphism is a renaming of elements that carries the Cayley table of $G$ exactly onto that of $H$. Properties defined purely in terms of the operation therefore transfer.

::: proposition Isomorphisms preserve structure {#prop-iso-props}
Let $\varphi\colon G \to H$ be an isomorphism. Then $\varphi(e_G) = e_H$; $\varphi(a^{-1}) = \varphi(a)^{-1}$ and $\varphi(a^n) = \varphi(a)^n$ for all $a \in G$ and $n \in \Z$; the inverse map $\varphi^{-1}\colon H \to G$ is an isomorphism; and $G$ is abelian if and only if $H$ is.
:::

::: proof
From $\varphi(e_G)\varphi(e_G) = \varphi(e_G e_G) = \varphi(e_G) = \varphi(e_G)\, e_H$, cancellation in $H$ gives $\varphi(e_G) = e_H$. Then $\varphi(a)\varphi(a^{-1}) = \varphi(aa^{-1}) = e_H$, and similarly in the other order, so $\varphi(a^{-1}) = \varphi(a)^{-1}$. The statement for positive powers follows by induction from $\varphi(a^{n+1}) = \varphi(a^n)\varphi(a)$, and for negative powers by combining with the previous sentence.

For $\varphi^{-1}$: given $x, y \in H$, write $x = \varphi(a)$, $y = \varphi(b)$. Then $\varphi(ab) = xy$, so $\varphi^{-1}(xy) = ab = \varphi^{-1}(x)\varphi^{-1}(y)$. Finally, if $G$ is abelian and $x = \varphi(a)$, $y = \varphi(b)$ are in $H$, then $xy = \varphi(ab) = \varphi(ba) = yx$; the converse uses $\varphi^{-1}$.
:::

::: example Three isomorphisms {#ex-isomorphisms}
(a) Show that $U(5) \cong \Z_4$. (b) Show that $(\R, +) \cong (\R_{>0}, \times)$. (c) Show that $\Z_2 \times \Z_3$ (defined below) is isomorphic to $\Z_6$.
::: solution
(a) The powers of $2$ modulo $5$ are $2^0 = 1$, $2^1 = 2$, $2^2 = 4$, $2^3 = 8 \equiv 3$ and $2^4 = 16 \equiv 1$. So every element of $U(5)$ is $2^k$ for exactly one $k \in \set{0,1,2,3}$, and $2^j 2^k = 2^{j+k}$ depends only on $j + k$ modulo $4$ because $2^4 = 1$. Hence $\varphi\colon \Z_4 \to U(5)$, $\varphi(k) = 2^k \bmod 5$, is a bijection with $\varphi(j +_4 k) = \varphi(j)\varphi(k)$: an isomorphism.

(b) Let $\varphi(x) = e^x$. It is a bijection $\R \to \R_{>0}$ (its inverse is $\ln$), and $\varphi(x + y) = e^{x+y} = e^x e^y = \varphi(x)\varphi(y)$. This isomorphism is why logarithm tables could turn multiplication into addition.

(c) In $\Z_2 \times \Z_3$ the multiples of $(1, 1)$ are

$$
(0,0),\ (1,1),\ (0,2),\ (1,0),\ (0,1),\ (1,2),
$$

all six elements, in that order, with $6(1,1) = (0,0)$. The map $k \mapsto k(1,1) = (k \bmod 2, k \bmod 3)$ is therefore a bijection $\Z_6 \to \Z_2 \times \Z_3$, and it turns addition modulo $6$ into componentwise addition. So $\Z_2 \times \Z_3 \cong \Z_6$.
:::
:::

To prove that two groups are **not** isomorphic, find a property preserved by isomorphisms that one group has and the other lacks. Useful invariants are: the order; being abelian; the number of solutions of $x^2 = e$ (or of $x^n = e$); the existence of an element whose powers give the whole group. For instance $\Z_4 \not\cong V_4$, because $1 + 1 = 2 \neq 0$ in $\Z_4$, while every element $x$ of $V_4$ satisfies $x^2 = e$; and $\Z_6 \not\cong D_3$, because one is abelian and the other is not.

::: quiz
Which of these groups are isomorphic to $\Z_4$? (Select all that apply.)
- [x] $U(5)$
- [ ] $U(8)$
- [x] $U(10)$
- [x] $\mu_4 = \set{1, i, -1, -i}$
- [ ] $V_4$
::: solution
$U(5)$ is generated by $2$ and $U(10)$ by $3$ (each element is a power of the generator, exactly as in $\Z_4$), and $\mu_4$ consists of the powers of $i$. In $U(8)$ and $V_4$ every element squares to the identity, while in $\Z_4$ the element $1$ does not ($1 + 1 = 2 \ne 0$), so they are not isomorphic to $\Z_4$; they are isomorphic to each other.
:::
:::

::: warning Same order, same group?
Groups of the same order need not be isomorphic: $\Z_4 \not\cong V_4$, and $\Z_6 \not\cong D_3$. Conversely, deciding that two groups *are* isomorphic requires an explicit bijection that respects the operation (or a theorem that produces one); matching up orders, or even matching up the numbers of elements of each order, is evidence but not proof.
:::

## Direct products

There is a simple way to build new groups from old ones.

::: definition Direct product {#def-direct-product}
The **direct product** of groups $G$ and $H$ is the set $G \times H = \set{(g, h) : g \in G,\ h \in H}$ with the componentwise operation

$$
(g, h)(g', h') = (gg', hh') .
$$
:::

Each axiom holds because it holds in each coordinate: the identity is $(e_G, e_H)$, the inverse of $(g, h)$ is $(g^{-1}, h^{-1})$, and associativity is checked componentwise. The order is $\abs{G \times H} = \abs{G}\,\abs{H}$, and $G \times H$ is abelian exactly when both $G$ and $H$ are. The plane $\R^2$ under vector addition is $\R \times \R$.

Direct products immediately explain two of our examples. In $\Z_2 \times \Z_2$ every element satisfies $x + x = (0,0)$, and the sum of any two distinct non-zero elements is the third — this is the table of $V_4$, so $\Z_2 \times \Z_2 \cong V_4$. On the other hand [[#ex-isomorphisms]] showed $\Z_2 \times \Z_3 \cong \Z_6$. When exactly is $\Z_m \times \Z_n \cong \Z_{mn}$? The answer — precisely when $\gcd(m, n) = 1$ — is proved in [[abstract-algebra/subgroups]], and it is the group-theoretic heart of the Chinese remainder theorem ([[number-theory/congruences]]).

::: application Symmetry in science
Groups measure symmetry wherever it occurs. Chemists classify molecules by their **point groups** (the water molecule has a symmetry group of order $4$ isomorphic to $V_4$), crystallographers classify crystals by the $230$ space groups, and in physics conservation laws correspond to symmetries of the laws of motion. In computing, the arithmetic of $\Z_n$ and $U(n)$ underlies hashing, checksums and the public-key cryptography of [[number-theory/cryptography]].
:::

::: history
The word *groupe* was introduced by Évariste Galois around 1830 for sets of permutations of the roots of an equation that are closed under composition; his work, published posthumously in 1846, made such groups the key to solving equations by radicals. Arthur Cayley's paper of 1854 was the first to define a group abstractly, as a set of symbols with an associative multiplication, and to write down multiplication tables like those in this chapter. Felix Klein's Erlangen programme (1872) proposed classifying geometries by their groups of symmetries. The modern axioms, covering infinite groups as well as finite ones, were formulated in the 1880s and 1890s in the work of Walther von Dyck and Heinrich Weber, among others.
:::

## Where this leads

The next chapter, [[abstract-algebra/subgroups]], studies groups sitting inside other groups and the simplest groups of all, the **cyclic groups**. [[abstract-algebra/permutation-groups]] examines symmetric and dihedral groups in detail; [[abstract-algebra/lagrange]] proves the first deep theorem, that the order of a subgroup divides the order of the group; and [[abstract-algebra/homomorphisms]] generalises isomorphisms to structure-preserving maps that need not be bijective. The groups $U(n)$ are the setting for the theorems of Fermat and Euler in [[number-theory/fermat-euler]], and groups reappear in topology as the fundamental group ([[topology/fundamental-group]]).

::: summary
- A **group** is a set with an associative binary operation, an identity element and inverses ([[#def-group]]); it is **abelian** if the operation is commutative. Closure is part of being a binary operation.
- Key examples: $\Z, \Q, \R, \C$ under $+$; non-zero numbers under $\times$; roots of unity $\mu_n$; $\Z_n$ under addition mod $n$; $U(n)$ under multiplication mod $n$ ([[#thm-un-group]]); $\mathrm{GL}_n(\R)$; symmetry groups such as $D_3$.
- Identities and inverses are unique, cancellation holds on each side, and $(ab)^{-1} = b^{-1}a^{-1}$. In non-abelian groups you may not swap factors: $(ab)^n \neq a^nb^n$ in general.
- In a Cayley table every element appears exactly once in each row and column; the table is symmetric about the diagonal exactly when the group is abelian.
- An **isomorphism** is a bijection preserving the operation; isomorphic groups share every structural property, which is how non-isomorphism is proved.
- Up to isomorphism there is one group of order $3$ ($\Z_3$) and two of order $4$ ($\Z_4$ and $V_4$).
- The **direct product** $G \times H$ multiplies componentwise; $\Z_2 \times \Z_2 \cong V_4$ and $\Z_2 \times \Z_3 \cong \Z_6$.
:::

## Exercises

::: exercise Odd integers {level=1}
Is the set of odd integers a group under addition? Is $3\Z = \set{3k : k \in \Z}$?
::: solution
The odd integers are not: $1 + 1 = 2$ is even, so addition is not even a binary operation on them (and $0$, the only candidate for an identity, is not odd). The multiples of $3$ do form a group: $3j + 3k = 3(j+k)$ (closure), addition of integers is associative, $0 = 3\cdot 0$ is the identity, and $-(3k) = 3(-k)$ is the inverse.
:::
:::

::: exercise An inverse in U(20) {level=1 check="3"}
Find the inverse of $7$ in $U(20)$.
::: solution
We need $7x \equiv 1 \pmod{20}$ with $x \in U(20)$. Trying small values: $7 \cdot 3 = 21 = 20 + 1$. So $7^{-1} = 3$.
:::
:::

::: exercise The order of U(15) {level=1 check="8"}
What is $\abs{U(15)}$? Which elements of $U(15)$ are their own inverses?
::: solution
From [[#ex-u15]], $U(15) = \set{1,2,4,7,8,11,13,14}$, so $\abs{U(15)} = 8$. The self-inverse elements are those with $x^2 \equiv 1$: $1$, $4$ ($16 \equiv 1$), $11$ ($121 \equiv 1$) and $14$ ($196 \equiv 1$).
:::
:::

::: exercise Solving an equation {level=2}
Let $a, b, c$ be elements of a group. Show that the equation $axb = c$ has exactly one solution $x$, and find it. Give an example showing that it need not equal $ca^{-1}b^{-1}$.
::: solution
Multiply on the left by $a^{-1}$ and on the right by $b^{-1}$: if $axb = c$ then $x = a^{-1}(axb)b^{-1} = a^{-1}cb^{-1}$. Conversely $a(a^{-1}cb^{-1})b = c$, so this $x$ is a solution, and it is the only one. In the triangle group take $a = r$, $b = e$, $c = s_1$: the solution is $x = r^{-1}s_1 = r^2 s_1 = s_2$ (from [[#eq-d3-table]]), whereas $ca^{-1}b^{-1} = s_1 r^2 = s_3$.
:::
:::

::: exercise A group of matrices over Z₂ {level=2 check="6"}
Let $\mathrm{GL}_2(\Z_2)$ be the set of $2\times2$ matrices with entries in $\Z_2 = \set{0,1}$ and non-zero determinant (computed modulo $2$), under matrix multiplication modulo $2$. How many elements does it have? Show that it is non-abelian.
::: hint
A matrix over $\Z_2$ is invertible exactly when its columns are non-zero and different.
:::
::: solution
There are $2^4 = 16$ matrices. The determinant $ad - bc$ is $1$ modulo $2$ exactly when the columns are linearly independent over $\Z_2$: the first column can be any of the $3$ non-zero vectors and the second any of the $2$ non-zero vectors different from the first, giving $3 \cdot 2 = 6$ elements. With $X = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ and $Y = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ we get, modulo $2$,

$$
XY = \begin{pmatrix}1&1\\1&0\end{pmatrix}, \qquad YX = \begin{pmatrix}0&1\\1&1\end{pmatrix},
$$

so $XY \neq YX$. (In fact $\mathrm{GL}_2(\Z_2) \cong D_3$: it permutes the three non-zero vectors of $\Z_2^2$ in all six possible ways.)
:::
:::

::: exercise Inverses and commutativity {level=2}
Prove that a group $G$ is abelian if and only if $(ab)^{-1} = a^{-1}b^{-1}$ for all $a, b \in G$.
::: solution
By [[#prop-inverse-product]], $(ab)^{-1} = b^{-1}a^{-1}$. If $G$ is abelian this equals $a^{-1}b^{-1}$. Conversely, suppose $(ab)^{-1} = a^{-1}b^{-1}$ for all $a, b$. Then $b^{-1}a^{-1} = a^{-1}b^{-1}$ for all $a, b$; applying this to $a^{-1}$ and $b^{-1}$ in place of $a$ and $b$ gives $ba = ab$.
:::
:::

::: exercise A strange operation {level=2}
On $G = \R \setminus \set{-1}$ define $x * y = x + y + xy$. Show that $(G, *)$ is a group, and that $x \mapsto 1 + x$ is an isomorphism from $(G, *)$ to $(\R^\times, \times)$.
::: hint
Notice that $1 + x * y = (1 + x)(1 + y)$.
:::
::: solution
The key identity is $1 + (x * y) = 1 + x + y + xy = (1 + x)(1 + y)$. *Closure:* if $x, y \neq -1$ then $(1+x)(1+y) \neq 0$, so $x * y \neq -1$. *Associativity:* $1 + (x*y)*z = (1+x)(1+y)(1+z) = 1 + x*(y*z)$. *Identity:* $x * 0 = x + 0 + 0 = x = 0 * x$. *Inverse:* we need $(1+x)(1+y) = 1$, that is $y = \frac{1}{1+x} - 1 = \frac{-x}{1+x}$, which is defined and not equal to $-1$. So $G$ is a group. The map $\varphi(x) = 1 + x$ is a bijection $G \to \R^\times$ (inverse $u \mapsto u - 1$) and $\varphi(x * y) = (1+x)(1+y) = \varphi(x)\varphi(y)$ by the key identity, so it is an isomorphism.
:::
:::

::: exercise Elements of order two {level=3}
Let $G$ be a finite group of even order. Prove that $G$ contains an element $a \neq e$ with $a^2 = e$.
::: hint
Pair each element with its inverse.
:::
::: solution
Pair each element $g$ with $g^{-1}$. Since $(g^{-1})^{-1} = g$, this splits $G$ into pairs $\set{g, g^{-1}}$ with $g \neq g^{-1}$ and singletons $\set{g}$ with $g = g^{-1}$, that is $g^2 = e$. The pairs account for an even number of elements, and $\abs{G}$ is even, so the number of singletons is even. The identity is a singleton, so there is at least one other singleton $a \ne e$, and it satisfies $a^2 = e$.
:::
:::

::: exercise Rationals under addition and multiplication {level=3}
Prove that $(\Q, +)$ is not isomorphic to $(\Q_{>0}, \times)$, although $(\R, +) \cong (\R_{>0}, \times)$.
::: hint
In $(\Q, +)$ every element is "twice" some element. What is the corresponding statement in $(\Q_{>0}, \times)$?
:::
::: solution
Suppose $\varphi\colon \Q \to \Q_{>0}$ is an isomorphism. Let $x = \varphi^{-1}(2)$ and $y = \varphi(x/2) \in \Q_{>0}$. Then

$$
y^2 = \varphi(x/2)\varphi(x/2) = \varphi(x/2 + x/2) = \varphi(x) = 2,
$$

so $y$ is a positive rational number with $y^2 = 2$. But $\sqrt 2$ is irrational ([[number-theory/primes]]), a contradiction. Over $\R$ the same argument causes no trouble, since $\sqrt 2 \in \R_{>0}$, and $e^x$ is an isomorphism ([[#ex-isomorphisms]]).
:::
:::

::: exercise Cancellation is enough for finite sets {level=3}
Let $G$ be a non-empty finite set with an associative binary operation in which both cancellation laws hold ($ab = ac \Rightarrow b = c$ and $ba = ca \Rightarrow b = c$). Prove that $G$ is a group. Show by an example that finiteness is needed.
::: hint
For fixed $a$, the map $x \mapsto ax$ is injective, hence surjective.
:::
::: solution
Fix $a \in G$. The map $L_a\colon G \to G$, $x \mapsto ax$, is injective by left cancellation, hence surjective because $G$ is finite. So there is $e \in G$ with $ae = a$.

*$e$ is a left identity.* For any $b \in G$, $a(eb) = (ae)b = ab$, so $eb = b$ by left cancellation.

*$e$ is a right identity.* For any $c, b \in G$, $(ce)b = c(eb) = cb$, so $ce = c$ by right cancellation.

*Inverses.* For $b \in G$ the map $L_b$ is surjective, so $bx = e$ for some $x \in G$. Then $b(xb) = (bx)b = eb = b = be$, and left cancellation gives $xb = e$. Hence $x$ is an inverse of $b$, and $G$ is a group. Finiteness is needed: the positive integers under addition are associative and satisfy both cancellation laws, but have no identity.
:::
:::
