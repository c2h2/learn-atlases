A plane through the origin in $\R^3$ can be spanned by two vectors. It can also be spanned by three or four, but then some of them are redundant; and it can never be spanned by one. The number two is a property of the plane itself, not of the vectors we happened to choose — it is the plane's **dimension**. Making this precise requires a genuine theorem: in any vector space, every *minimal* spanning list (a **basis**) has the same length. Once it is proved, a basis turns every vector into a list of coordinates, every finite-dimensional space becomes a copy of $\F^n$, and we can count: the dimension of a solution space, of a column space, of an intersection of subspaces.

This chapter proves the invariance of dimension and its main consequences, and then applies them to the matrix $A$ of a linear system. There the counting becomes very concrete — the **rank** of $A$, the number of pivots, controls the dimensions of all four subspaces attached to $A$ — and it explains, once and for all, the patterns we saw in Gaussian elimination.

## Bases and coordinates

::: definition Basis {#def-basis}
A **basis** of a vector space $V$ is a list of vectors $v_1, \dots, v_n$ in $V$ that is linearly independent and spans $V$.
:::

The standard examples:

- The **standard basis** $\mathbf{e}_1, \dots, \mathbf{e}_n$ of $\F^n$: since $(x_1, \dots, x_n) = x_1\mathbf{e}_1 + \dots + x_n\mathbf{e}_n$, the list spans, and this combination is $\mathbf{0}$ only if every $x_j = 0$.
- The monomials $1, x, x^2, \dots, x^n$ form a basis of $\mathcal{P}_n(\F)$: every polynomial of degree at most $n$ is a combination of them, and a polynomial is the zero polynomial only if all its coefficients vanish.
- The matrices $E_{ij}$, with a single $1$ in position $(i,j)$ and $0$ elsewhere, form a basis of $M_{m\times n}(\F)$.
- The vectors $(1,1)$ and $(1,-1)$ form a basis of $\R^2$, and more generally the columns of any invertible $n\times n$ matrix form a basis of $\F^n$: by [[linear-algebra/matrices#thm-imt]] they are independent ($A\mathbf{x} = \mathbf{0}$ only for $\mathbf{x} = \mathbf{0}$) and span ($A\mathbf{x} = \mathbf{b}$ is solvable for every $\mathbf{b}$).

A basis is exactly a list that represents every vector, without redundancy.

::: theorem Coordinates {#thm-coordinates}
A list $v_1, \dots, v_n$ in $V$ is a basis if and only if every $v\in V$ can be written in exactly one way as

$$
v = a_1v_1 + a_2v_2 + \dots + a_nv_n \qquad (a_1, \dots, a_n\in\F).
$$
:::

::: proof
"Every $v$ can be written in at least one way" means the list spans $V$, and "in at most one way" is equivalent to linear independence by [[linear-algebra/vector-spaces#prop-unique-coeffs]].
:::

The unique numbers $a_1, \dots, a_n$ are the **coordinates** of $v$ relative to the basis $\mathcal{B} = (v_1, \dots, v_n)$, and the column

$$
[v]_{\mathcal{B}} = \begin{pmatrix}a_1\\ \vdots\\ a_n\end{pmatrix}\in\F^n
$$

is the **coordinate vector** of $v$. The order of the basis vectors matters, which is why a basis is a *list* rather than a set. Coordinates respect the operations: if $v = \sum a_jv_j$ and $w = \sum b_jv_j$ then $v + w = \sum(a_j + b_j)v_j$ and $cv = \sum (ca_j)v_j$, so

$$
[v + w]_{\mathcal{B}} = [v]_{\mathcal{B}} + [w]_{\mathcal{B}}, \qquad [cv]_{\mathcal{B}} = c\,[v]_{\mathcal{B}}.
$$ {#eq-coord-linear}

Thus a basis translates any question about $V$ into a question about columns in $\F^n$ — which elimination can answer.

::: example Coordinates of a polynomial {#ex-coords}
Show that $\mathcal{B} = \bigl(1,\ 1 + x,\ (1 + x)^2\bigr)$ is a basis of $\mathcal{P}_2(\R)$ and find the coordinate vector of $p(x) = 3 + 2x + x^2$.
::: solution
Write $t = 1 + x$. Every polynomial of degree at most $2$ in $x$ is a polynomial of degree at most $2$ in $t$ (substitute $x = t - 1$ and expand), and that polynomial in $t$ is unique, because $1, t, t^2$ are independent. So every $p$ is uniquely a combination $a_1 + a_2t + a_3t^2$, and $\mathcal{B}$ is a basis by [[#thm-coordinates]].

For the given $p$, substitute $x = t - 1$:

$$
3 + 2(t - 1) + (t - 1)^2 = 3 + 2t - 2 + t^2 - 2t + 1 = 2 + t^2.
$$

So $p(x) = 2\cdot 1 + 0\cdot(1 + x) + 1\cdot(1+x)^2$ and $[p]_{\mathcal{B}} = (2, 0, 1)$. *Check:* $2 + (1 + 2x + x^2) = 3 + 2x + x^2$. (These are the Taylor coefficients of $p$ at $x = -1$ — see [[calculus-2/taylor-series]].)
:::
:::

When does a basis exist? Call $V$ **finite-dimensional** if it is spanned by some finite list. All our examples except $\mathcal{P}(\F)$ and the spaces $\mathcal{F}(X, \F)$ of all functions on an infinite set $X$ are finite-dimensional.

::: theorem Every spanning list contains a basis {#thm-reduce}
If $v_1, \dots, v_k$ span $V$, then some sublist of $v_1, \dots, v_k$ is a basis of $V$. In particular every finite-dimensional vector space has a basis.
:::

::: proof
If the list is independent, it is already a basis. Otherwise, by the linear dependence lemma ([[linear-algebra/vector-spaces#lem-dependence]]) some $v_j$ lies in the span of the vectors before it, and removing it leaves a shorter list with the same span, $V$. Repeat. The list gets shorter each time, so the process stops, and it can only stop at an independent spanning list — a basis. (If every vector gets removed, $V = \{0\}$ and the empty list is its basis.)
:::

## Dimension

The heart of the matter is a comparison between independent lists and spanning lists.

::: theorem Exchange lemma {#thm-exchange}
Let $V$ be a vector space. If $u_1, \dots, u_m$ are linearly independent in $V$ and $w_1, \dots, w_n$ span $V$, then $m\le n$.
:::

::: proof
We feed the $u$'s into the spanning list one at a time, each time throwing out one of the $w$'s, while keeping a spanning list. 

*Step 1.* Since $w_1, \dots, w_n$ span $V$, the vector $u_1$ is a combination of them, so the list $u_1, w_1, \dots, w_n$ is linearly dependent. By the linear dependence lemma, some vector in this list lies in the span of the vectors before it, and it can be removed without changing the span. That vector is not $u_1$, because $u_1\neq 0$ (an independent list contains no zero vector). So it is one of the $w$'s. Removing it leaves a spanning list consisting of $u_1$ and $n - 1$ of the $w$'s.

*Step $k$* ($2 \le k\le m$). Suppose after step $k-1$ we have a spanning list consisting of $u_1, \dots, u_{k-1}$ followed by $n - (k-1)$ of the $w$'s. Insert $u_k$ after $u_{k-1}$. The new list is dependent, since $u_k$ is in the span of the old one. By the linear dependence lemma, some vector of the new list lies in the span of the vectors before it. It cannot be one of $u_1, \dots, u_k$, because these are independent and so no $u_j$ lies in the span of $u_1, \dots, u_{j-1}$. So it is one of the $w$'s, and removing it leaves a spanning list consisting of $u_1, \dots, u_k$ and $n - k$ of the $w$'s.

At each of the $m$ steps a $w$ was available to be removed. Hence there were at least $m$ of them: $m\le n$.
:::

::: corollary Invariance of dimension {#cor-invariance}
Any two bases of a finite-dimensional vector space have the same length.
:::

::: proof
Let $v_1, \dots, v_m$ and $w_1, \dots, w_n$ be bases. The first list is independent and the second spans, so $m\le n$ by [[#thm-exchange]]. Exchanging their roles, $n\le m$.
:::

::: definition Dimension {#def-dimension}
The **dimension** $\dim V$ of a finite-dimensional vector space $V$ is the length of any basis of $V$. A vector space that is not finite-dimensional is **infinite-dimensional**.
:::

From the standard bases: $\dim\F^n = n$, $\dim\mathcal{P}_n(\F) = n + 1$, $\dim M_{m\times n}(\F) = mn$ and $\dim\{0\} = 0$. The dimension depends on the field: $\C$ has dimension $1$ as a complex vector space (basis: $1$) but dimension $2$ as a real vector space (basis: $1, i$). The space $\mathcal{P}(\F)$ of all polynomials is infinite-dimensional: if finitely many polynomials spanned it, and $d$ were the largest of their degrees, then $x^{d+1}$ would not be in their span.

::: theorem Bases in a space of known dimension {#thm-dim-facts}
Let $V$ be finite-dimensional with $\dim V = n$.

1. Every linearly independent list in $V$ can be extended to a basis of $V$; in particular it has length at most $n$.
2. A list of exactly $n$ vectors in $V$ is a basis as soon as it is linearly independent, and also as soon as it spans $V$.
3. Every subspace $U$ of $V$ is finite-dimensional, with $\dim U\le n$; and $\dim U = n$ only if $U = V$.
:::

::: proof
1. Let $u_1, \dots, u_k$ be independent. By [[#thm-exchange]] (with a basis of $V$ as spanning list), every independent list in $V$ has length at most $n$. If $u_1, \dots, u_k$ do not span $V$, choose $v\in V$ outside their span; then $u_1, \dots, u_k, v$ is still independent: in a relation $a_1u_1 + \dots + a_ku_k + bv = 0$ we must have $b = 0$ (otherwise $v$ would lie in the span of the $u_i$), and then all $a_i = 0$ by independence of the $u_i$. Repeat. Since independent lists have length at most $n$, the process stops, and it stops only when the list spans: it is then a basis.
2. If the $n$ vectors are independent, extend them to a basis by part 1; a basis has length $n$, so nothing was added. If they span, reduce them to a basis by [[#thm-reduce]]; a basis has length $n$, so nothing was removed.
3. Apply the procedure of part 1 inside $U$, starting from the empty list: as long as the current independent list does not span $U$, add a vector of $U$ outside its span. The lists are independent in $V$, so the procedure stops after at most $n$ steps with a basis of $U$; hence $\dim U\le n$. If $\dim U = n$, a basis of $U$ is an independent list of $n$ vectors in $V$, hence by part 2 a basis of $V$, and $U = V$.
:::

::: quiz
$V$ is a vector space of dimension $4$. Which statements are true? (Select all that apply.)
- [x] Any $5$ vectors in $V$ are linearly dependent.
- [ ] Any $3$ vectors in $V$ are linearly independent.
- [x] Any $4$ linearly independent vectors in $V$ span $V$.
- [ ] Some list of $3$ vectors spans $V$.
::: solution
A basis of $V$ is a spanning list of length $4$, so by [[#thm-exchange]] independent lists have length at most $4$: five vectors are dependent. Four independent vectors form a basis by part 2 of [[#thm-dim-facts]], so they span. Three vectors can be dependent (for example if one is $0$), and they can never span, since a spanning list of length $3$ would force independent lists to have length at most $3$.
:::
:::

Part 3 classifies subspaces by dimension. The subspaces of $\R^2$ have dimension $0$, $1$ or $2$: they are $\{\mathbf{0}\}$, the lines through the origin (spans of one non-zero vector), and $\R^2$. Likewise the subspaces of $\R^3$ are $\{\mathbf{0}\}$, lines and planes through the origin, and $\R^3$.

::: example Extending to a basis {#ex-extend}
Extend the independent list $\mathbf{u}_1 = (1, 0, 1, 0)$, $\mathbf{u}_2 = (0, 1, 0, 1)$ to a basis of $\R^4$.
::: solution
The standard basis spans $\R^4$, so $\mathbf{u}_1, \mathbf{u}_2, \mathbf{e}_1, \mathbf{e}_2, \mathbf{e}_3, \mathbf{e}_4$ spans $\R^4$, and by [[#thm-reduce]] some sublist is a basis. Row reduce the matrix with these six columns; its pivot columns will be a basis of the column space (this is [[#thm-four-bases]] below, and the pivot columns include the first two because $\mathbf{u}_1, \mathbf{u}_2$ are independent):

$$
\begin{pmatrix}1&0&1&0&0&0\\0&1&0&1&0&0\\1&0&0&0&1&0\\0&1&0&0&0&1\end{pmatrix}
\xrightarrow[R_4 - R_2]{R_3 - R_1}
\begin{pmatrix}1&0&1&0&0&0\\0&1&0&1&0&0\\0&0&-1&0&1&0\\0&0&0&-1&0&1\end{pmatrix}.
$$

This is already an echelon form, with pivots in columns $1, 2, 3, 4$. So $\mathbf{u}_1, \mathbf{u}_2, \mathbf{e}_1, \mathbf{e}_2$ is a basis of $\R^4$. (By part 2 of [[#thm-dim-facts]] it would also suffice to check that these four vectors are independent.)
:::
:::

::: quiz
What is the dimension of the space of all $3\times 3$ real symmetric matrices?
- [ ] $3$
- [ ] $5$
- [x] $6$
- [ ] $9$
::: solution
A symmetric $3\times 3$ matrix is determined by its entries on and above the diagonal: $3$ diagonal entries and $3$ above, which can be chosen freely. A basis is $E_{11}, E_{22}, E_{33}, E_{12} + E_{21}, E_{13} + E_{31}, E_{23} + E_{32}$, so the dimension is $6$. In general symmetric $n\times n$ matrices form a space of dimension $n(n+1)/2$.
:::
:::

Dimension also controls how subspaces meet.

::: theorem Dimension of a sum {#thm-sum-dim}
If $U$ and $W$ are subspaces of a finite-dimensional vector space, then

$$
\dim(U + W) = \dim U + \dim W - \dim(U\cap W).
$$
:::

::: proof
Let $z_1, \dots, z_k$ be a basis of $U\cap W$. By [[#thm-dim-facts]] it extends to a basis $z_1,\dots,z_k, u_1, \dots, u_p$ of $U$ and to a basis $z_1, \dots, z_k, w_1, \dots, w_q$ of $W$. We claim that $z_1, \dots, z_k, u_1, \dots, u_p, w_1, \dots, w_q$ is a basis of $U + W$; then $\dim(U + W) = k + p + q = (k + p) + (k + q) - k$, as required.

The list spans $U + W$, since every element $u + w$ of $U + W$ is a combination of the bases of $U$ and $W$. For independence, suppose

$$
\textstyle\sum_i a_iz_i + \sum_j b_ju_j + \sum_l c_lw_l = 0.
$$

Then $\sum_l c_lw_l = -\sum_i a_iz_i - \sum_j b_ju_j$ lies in $W$ (left side) and in $U$ (right side), so in $U\cap W$, and therefore $\sum_l c_lw_l = \sum_i d_iz_i$ for some scalars $d_i$. Since $z_1, \dots, z_k, w_1, \dots, w_q$ is independent, all $c_l$ (and $d_i$) are zero. The original relation becomes $\sum a_iz_i + \sum b_ju_j = 0$, and independence of the basis of $U$ gives $a_i = b_j = 0$.
:::

For example, two different planes $U, W$ through the origin in $\R^3$ satisfy $U + W = \R^3$ (a subspace properly containing a plane has dimension $3$), so $\dim(U\cap W) = 2 + 2 - 3 = 1$: two distinct planes through the origin meet in a line — the linear-algebra proof of a fact you know from geometry.

## The four fundamental subspaces of a matrix

Let $A$ be an $m\times n$ matrix with entries in $\F$. Four subspaces are attached to it:

| subspace | definition | lives in |
|---|---|---|
| column space $\operatorname{Col}(A)$ | span of the columns $=\set{A\mathbf{x}}$ | $\F^m$ |
| null space $\operatorname{Nul}(A)$ | solutions of $A\mathbf{x} = \mathbf{0}$ | $\F^n$ |
| row space $\operatorname{Row}(A)$ | span of the rows $= \operatorname{Col}(A\T)$ | $\F^n$ |
| left null space $\operatorname{Nul}(A\T)$ | solutions of $A\T\mathbf{y} = \mathbf{0}$ | $\F^m$ |

(Strang writes $C(A)$, $N(A)$, $C(A\T)$ and $N(A\T)$.) The column space answers the existence question for $A\mathbf{x} = \mathbf{b}$ — a solution exists iff $\mathbf{b}\in\operatorname{Col}(A)$ — and the null space answers the uniqueness question, since by [[linear-algebra/linear-systems#thm-structure]] the solutions form a translate of $\operatorname{Nul}(A)$. Three of the four can be read off from one elimination of $A$; the fourth is the null space of $A\T$, found in the same way.

::: theorem Bases for the fundamental subspaces {#thm-four-bases}
Let $R$ be the reduced row echelon form of $A$.

1. The **pivot columns of $A$** (the original columns, not those of $R$) form a basis of $\operatorname{Col}(A)$.
2. The non-zero rows of $R$ form a basis of $\operatorname{Row}(A)$.
3. For each free variable $x_f$, let $\mathbf{s}_f$ be the solution of $A\mathbf{x} = \mathbf{0}$ with $x_f = 1$ and all other free variables $0$ (a **special solution**). The special solutions form a basis of $\operatorname{Nul}(A)$.
:::

::: proof
1. Row operations do not change the solutions of the homogeneous system ([[linear-algebra/linear-systems#thm-row-ops]]), so $A\mathbf{x} = \mathbf{0}$ if and only if $R\mathbf{x} = \mathbf{0}$. Since $A\mathbf{x} = \sum x_j\mathbf{a}_j$, this says: *the columns of $A$ satisfy exactly the same linear relations as the columns of $R$.* In $R$ the pivot columns are distinct standard basis vectors $\mathbf{e}_1, \dots, \mathbf{e}_r$, hence independent; and each non-pivot column of $R$ has zeros below row $r$, so it is a combination of $\mathbf{e}_1, \dots, \mathbf{e}_r$. Both facts are statements about linear relations among columns, so they transfer to $A$: the pivot columns of $A$ are independent, and every other column of $A$ is a combination of them. Hence the pivot columns of $A$ span $\operatorname{Col}(A)$ and form a basis.
2. Each elementary row operation replaces the rows by combinations of the old rows, so it cannot enlarge the row space; and it is reversible, so it cannot shrink it. Hence $\operatorname{Row}(A) = \operatorname{Row}(R)$, which is spanned by the non-zero rows of $R$. These are independent: each has a $1$ in its pivot column, where all the other rows of $R$ have $0$, so in any vanishing combination the coefficient of each row must be $0$.
3. By [[linear-algebra/linear-systems#thm-exist-unique]], a solution of $A\mathbf{x} = \mathbf{0}$ is determined by the values of its free variables, and the solution with free values $(t_f)$ is $\sum_f t_f\mathbf{s}_f$ (both sides solve the system and have the same free variables). So the special solutions span $\operatorname{Nul}(A)$. They are independent because in the coordinate of the free variable $x_f$, the vector $\mathbf{s}_f$ has a $1$ and every other special solution has a $0$.
:::

::: warning Take the columns from A, not from R
Row operations change the column space: $\begin{pmatrix}1&2\\2&4\end{pmatrix}$ has column space spanned by $(1,2)$, but its RREF $\begin{pmatrix}1&2\\0&0\end{pmatrix}$ has column space spanned by $(1, 0)$. The RREF tells you *which* columns are pivot columns; the basis of $\operatorname{Col}(A)$ consists of the corresponding columns of the original matrix. For the row space it is the other way round: the non-zero rows of $R$ are a basis, while the rows of $A$ in the same positions may not be (row interchanges can move them).
:::

Counting the basis vectors in [[#thm-four-bases]] gives the dimensions.

::: definition Rank and nullity {#def-rank}
The **rank** of a matrix is $\rank A = \dim\operatorname{Col}(A)$, and its **nullity** is $\dim\operatorname{Nul}(A)$.
:::

::: theorem The rank theorem {#thm-rank}
Let $A$ be an $m\times n$ matrix with $r$ pivots. Then

$$
\dim\operatorname{Col}(A) = \dim\operatorname{Row}(A) = r, \qquad \dim\operatorname{Nul}(A) = n - r, \qquad \dim\operatorname{Nul}(A\T) = m - r.
$$

In particular **row rank equals column rank**, $\rank A = \rank A\T$, and

$$
\rank A + \dim\operatorname{Nul}(A) = n.
$$ {#eq-rank-nullity}
:::

::: proof
By [[#thm-four-bases]], $\operatorname{Col}(A)$ has a basis of $r$ pivot columns, $\operatorname{Row}(A)$ has a basis of $r$ non-zero rows of $R$ (each pivot lies in a different non-zero row, and every non-zero row contains a pivot), and $\operatorname{Nul}(A)$ has a basis of one special solution for each of the $n - r$ free variables. Since $\operatorname{Col}(A\T) = \operatorname{Row}(A)$, the matrix $A\T$ has rank $r$; it has $m$ columns, so applying $\dim\operatorname{Nul} = (\text{number of columns}) - \text{rank}$ to $A\T$ gives $\dim\operatorname{Nul}(A\T) = m - r$.
:::

That the column rank equals the row rank is far from obvious: for a $3\times 100$ matrix it says that the span of $100$ columns in $\R^3$ has the same dimension as the span of $3$ rows in $\R^{100}$. The identity [[#eq-rank-nullity]] is the matrix form of the **rank–nullity theorem**, which [[linear-algebra/linear-maps]] proves for arbitrary linear maps.

::: example All four subspaces {#ex-four}
Find bases and dimensions of the four fundamental subspaces of

$$
A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\3&6&1&4\end{pmatrix}.
$$
::: solution
Row reduce:

$$
A \xrightarrow[R_3 - 3R_1]{R_2 - 2R_1} \begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&1&1\end{pmatrix} \xrightarrow{R_3 - R_2} \begin{pmatrix}1&2&0&1\\0&0&1&1\\0&0&0&0\end{pmatrix} = R.
$$

The pivot columns are $1$ and $3$, so $r = 2$.

- $\operatorname{Col}(A)$: basis $(1,2,3)$, $(0,1,1)$ — columns 1 and 3 **of $A$**. Dimension $2$: a plane in $\R^3$.
- $\operatorname{Row}(A)$: basis $(1,2,0,1)$, $(0,0,1,1)$ — the non-zero rows of $R$. Dimension $2$.
- $\operatorname{Nul}(A)$: $x_2, x_4$ are free, and $R\mathbf{x} = \mathbf{0}$ says $x_1 = -2x_2 - x_4$, $x_3 = -x_4$. The special solutions are $(-2, 1, 0, 0)$ (from $x_2 = 1$, $x_4 = 0$) and $(-1, 0, -1, 1)$ (from $x_2 = 0$, $x_4 = 1$). Dimension $4 - 2 = 2$.
- $\operatorname{Nul}(A\T)$: dimension $3 - 2 = 1$. Since row 3 of $A$ is the sum of rows 1 and 2, the relation $(\text{row }1) + (\text{row }2) - (\text{row }3) = \mathbf{0}$ says $A\T(1, 1, -1) = \mathbf{0}$; so $(1, 1, -1)$ is a basis.

Notice two orthogonality relations: each basis vector of $\operatorname{Row}(A)$ has dot product $0$ with each basis vector of $\operatorname{Nul}(A)$ (for instance $(1,2,0,1)\cdot(-1,0,-1,1) = -1 + 0 + 0 + 1 = 0$), and $(1,1,-1)$ is perpendicular to both basis vectors of $\operatorname{Col}(A)$. This is no accident: $A\mathbf{x} = \mathbf{0}$ says precisely that $\mathbf{x}$ is perpendicular to every row of $A$. The full story is told in [[linear-algebra/inner-products]].
:::
:::

::: widget rowreduce
matrix: 1,2,0,1; 2,4,1,3; 3,6,1,4
augmented: false
caption: The elimination behind [[#ex-four]]. Pivots land in columns 1 and 3, so the rank is $2$. Read off three of the four fundamental subspaces from the final matrix: pivot columns of the *original* matrix for $\operatorname{Col}(A)$, non-zero rows for $\operatorname{Row}(A)$, and one special solution per free column ($x_2$ and $x_4$) for $\operatorname{Nul}(A)$.
:::

::: widget transform2d
matrix: 1,2; 2,4
vector: 2,-1
caption: A rank-one map of the plane. Every vector lands on the line $\operatorname{Col}(A) = \Span\bigl((1,2)\bigr)$, so the grid collapses to a line. The highlighted vector $(2,-1)$ spans $\operatorname{Nul}(A)$ and is sent to $\mathbf{0}$. Drag it off that line and its image moves along the column space. Here $\rank A + \dim\operatorname{Nul}(A) = 1 + 1 = 2$.
:::

::: quiz
$A$ is a $5\times 7$ matrix of rank $3$. Which statements are true? (Select all that apply.)
- [x] $\dim\operatorname{Nul}(A) = 4$
- [x] $\dim\operatorname{Nul}(A\T) = 2$
- [ ] $\operatorname{Col}(A) = \R^5$
- [x] $\dim\operatorname{Row}(A) = 3$
::: solution
By [[#thm-rank]] with $m = 5$, $n = 7$, $r = 3$: $\dim\operatorname{Nul}(A) = 7 - 3 = 4$, $\dim\operatorname{Nul}(A\T) = 5 - 3 = 2$ and $\dim\operatorname{Row}(A) = 3$. The column space is a $3$-dimensional subspace of $\R^5$, so it is not all of $\R^5$: some systems $A\mathbf{x} = \mathbf{b}$ are inconsistent.
:::
:::

For square matrices, rank adds four more conditions to the invertible matrix theorem.

::: corollary The invertible matrix theorem, continued {#cor-imt-rank}
For an $n\times n$ matrix $A$ the following are equivalent to the conditions of [[linear-algebra/matrices#thm-imt]]: (a) the columns of $A$ form a basis of $\F^n$; (b) $\rank A = n$; (c) $\dim\operatorname{Nul}(A) = 0$; (d) the rows of $A$ are linearly independent.
:::

::: proof
$A$ is invertible iff it has $n$ pivots, i.e. $\rank A = n$, which is (b). By [[#eq-rank-nullity]], (b) is equivalent to (c). By [[#thm-dim-facts]], $n$ columns in $\F^n$ form a basis iff they span, i.e. iff $\operatorname{Col}(A) = \F^n$, i.e. iff $\rank A = n$: so (a) is equivalent to (b). Finally, the rows are $n$ vectors spanning $\operatorname{Row}(A)$, which has dimension $\rank A$; they are independent iff they form a basis of $\operatorname{Row}(A)$ iff $\rank A = n$.
:::

::: example Testing a basis of polynomials {#ex-poly-basis}
Is $1 + x,\ 1 - x + x^2,\ 2 + x^2$ a basis of $\mathcal{P}_2(\R)$?
::: solution
Use coordinates relative to the standard basis $1, x, x^2$: the three polynomials have coordinate vectors $(1,1,0)$, $(1,-1,1)$, $(2,0,1)$. By [[#eq-coord-linear]], a linear relation among the polynomials is the same as a linear relation among their coordinate vectors. Row reduce:

$$
\begin{pmatrix}1&1&2\\1&-1&0\\0&1&1\end{pmatrix}\xrightarrow{R_2 - R_1}\begin{pmatrix}1&1&2\\0&-2&-2\\0&1&1\end{pmatrix}\xrightarrow{R_3 + \frac12R_2}\begin{pmatrix}1&1&2\\0&-2&-2\\0&0&0\end{pmatrix}.
$$

Only two pivots: the vectors are dependent, so this is **not** a basis. Solving for the relation gives $(1 + x) + (1 - x + x^2) - (2 + x^2) = 0$, which you can confirm directly. The span is only $2$-dimensional.
:::
:::

::: history
The words come from different eras. Hermann Grassmann already worked with independence and dimension in 1844, and Giuseppe Peano's axioms of 1888 included a definition of dimension as the maximum number of independent elements. The term *rank* of a matrix was introduced by Ferdinand Georg Frobenius in 1879, and James Joseph Sylvester coined *nullity* in 1884. The exchange argument of [[#thm-exchange]] is traditionally named after Ernst Steinitz (1913). The organisation of the theory around the four subspaces $\operatorname{Col}(A)$, $\operatorname{Nul}(A)$, $\operatorname{Row}(A)$ and $\operatorname{Nul}(A\T)$ was popularised by Gilbert Strang, notably in his 1993 *American Mathematical Monthly* article "The fundamental theorem of linear algebra".
:::

## Where this leads

Dimension counting is one of the most powerful tools in mathematics. In [[linear-algebra/linear-maps]], the rank theorem becomes the rank–nullity theorem for linear maps, and coordinates become the bridge that represents every linear map by a matrix. In [[linear-algebra/inner-products]] we will see that for a real matrix $\operatorname{Row}(A)$ and $\operatorname{Nul}(A)$ are orthogonal complements in $\R^n$, as are $\operatorname{Col}(A)$ and $\operatorname{Nul}(A\T)$ in $\R^m$, and in [[linear-algebra/svd]] the singular value decomposition supplies especially good bases for all four subspaces at once. Dimension arguments also prove that the solution space of an $n$-th order linear differential equation is $n$-dimensional ([[ode/second-order-linear]], [[ode/linear-systems]]) and drive the theory of field extensions ([[abstract-algebra/fields-galois]]), where the degree of an extension is a dimension.

::: summary
- A basis is an independent spanning list; equivalently, every vector has unique coordinates relative to it ([[#thm-coordinates]]). Coordinates turn a space with a basis of length $n$ into $\F^n$.
- Every spanning list shrinks to a basis, and every independent list extends to one.
- In any vector space, an independent list is never longer than a spanning list ([[#thm-exchange]]); hence all bases have the same length, the dimension.
- In a space of dimension $n$, $n$ vectors form a basis as soon as they are independent *or* span; subspaces have dimension at most $n$.
- $\dim(U + W) = \dim U + \dim W - \dim(U\cap W)$ ([[#thm-sum-dim]]).
- From the RREF: pivot columns of $A$ are a basis of $\operatorname{Col}(A)$, non-zero rows of $R$ a basis of $\operatorname{Row}(A)$, special solutions a basis of $\operatorname{Nul}(A)$ ([[#thm-four-bases]]).
- If $A$ is $m\times n$ of rank $r$: $\dim\operatorname{Col}A = \dim\operatorname{Row}A = r$, $\dim\operatorname{Nul}A = n - r$, $\dim\operatorname{Nul}A\T = m - r$ ([[#thm-rank]]).
:::

## Exercises

::: exercise Dimension of a solution space {level=1 check="2"}
Find a basis for the subspace of $\R^4$ consisting of all $(x, y, z, w)$ with $x + y - z = 0$ and $y + w = 0$. What is its dimension?
::: solution
The coefficient matrix $\begin{pmatrix}1&1&-1&0\\0&1&0&1\end{pmatrix}$ is in echelon form; $R_1\to R_1 - R_2$ gives the RREF $\begin{pmatrix}1&0&-1&-1\\0&1&0&1\end{pmatrix}$. The free variables are $z, w$, and $x = z + w$, $y = -w$. The special solutions $(1, 0, 1, 0)$ (from $z = 1, w = 0$) and $(1, -1, 0, 1)$ (from $z = 0$, $w = 1$) form a basis, so the dimension is $2 = 4 - 2$.
:::
:::

::: exercise Coordinates in the plane {level=1}
Show that $\mathcal{B} = \bigl((1,1), (1,-1)\bigr)$ is a basis of $\R^2$ and find $[\mathbf{v}]_{\mathcal{B}}$ for $\mathbf{v} = (3, 1)$ and for a general $\mathbf{v} = (x, y)$.
::: solution
Two vectors in $\R^2$, not multiples of each other, are independent, hence a basis by [[#thm-dim-facts]]. Solving $a(1,1) + b(1,-1) = (x,y)$ gives $a + b = x$, $a - b = y$, so $a = \frac{x + y}{2}$, $b = \frac{x - y}{2}$. For $(3, 1)$: $[\mathbf{v}]_{\mathcal{B}} = (2, 1)$; check $2(1,1) + (1, -1) = (3, 1)$.
:::
:::

::: exercise Polynomials with two roots {level=1 check="3"}
What is the dimension of the subspace $U = \set{p\in\mathcal{P}_4(\R) : p(1) = p(-1) = 0}$? Give a basis.
::: solution
Every $p\in U$ is divisible by $(x - 1)(x + 1) = x^2 - 1$, so $p = (x^2 - 1)q$ with $q\in\mathcal{P}_2(\R)$; conversely every such product lies in $U$. Since $1, x, x^2$ is a basis of $\mathcal{P}_2$, the polynomials $x^2 - 1$, $x(x^2-1)$, $x^2(x^2-1)$ span $U$, and they are independent (their degrees $2, 3, 4$ are different, so no non-trivial combination can vanish — look at the highest-degree term). So $\dim U = 3$. Alternatively: the map $p\mapsto(p(1), p(-1))$ has rank $2$, and $5 - 2 = 3$ by rank–nullity ([[linear-algebra/linear-maps]]).
:::
:::

::: exercise A basis of polynomials {level=2}
Show that $1 + x$, $x + x^2$, $1 + x^2$ is a basis of $\mathcal{P}_2(\R)$, and find the coordinates of $2 + 2x + 2x^2$ relative to it.
::: solution
The coordinate vectors relative to $1, x, x^2$ are $(1,1,0)$, $(0,1,1)$, $(1,0,1)$. Row reduce the matrix with these columns:

$$
\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}\xrightarrow{R_2 - R_1}\begin{pmatrix}1&0&1\\0&1&-1\\0&1&1\end{pmatrix}\xrightarrow{R_3 - R_2}\begin{pmatrix}1&0&1\\0&1&-1\\0&0&2\end{pmatrix}.
$$

Three pivots, so the three polynomials are independent, and by [[#thm-dim-facts]] three independent vectors in the $3$-dimensional space $\mathcal{P}_2$ form a basis. Since $(1 + x) + (x + x^2) + (1 + x^2) = 2 + 2x + 2x^2$, the coordinates are $(1, 1, 1)$.
:::
:::

::: exercise Four subspaces {level=2}
Find bases for the four fundamental subspaces of $B = \begin{pmatrix}1&3&1\\2&6&3\\-1&-3&1\end{pmatrix}$, and check [[#thm-rank]].
::: solution
$R_2 - 2R_1$ gives $(0,0,1)$ and $R_3 + R_1$ gives $(0,0,2)$; then $R_3 - 2R_2$ and $R_1 - R_2$ give $R = \begin{pmatrix}1&3&0\\0&0&1\\0&0&0\end{pmatrix}$. Pivot columns $1, 3$, so $r = 2$.
$\operatorname{Col}(B)$: $(1, 2, -1)$, $(1, 3, 1)$. $\operatorname{Row}(B)$: $(1, 3, 0)$, $(0, 0, 1)$. $\operatorname{Nul}(B)$: $x_2$ free, $x_1 = -3x_2$, $x_3 = 0$: basis $(-3, 1, 0)$. $\operatorname{Nul}(B\T)$: solve $B\T\mathbf{y} = \mathbf{0}$, i.e. $y_1 + 2y_2 - y_3 = 0$, $3y_1 + 6y_2 - 3y_3 = 0$, $y_1 + 3y_2 + y_3 = 0$; subtracting the first from the third gives $y_2 + 2y_3 = 0$, so $y_3 = t$, $y_2 = -2t$, $y_1 = 5t$: basis $(5, -2, 1)$. Dimensions $2, 2, 1, 1$, matching $r = 2$, $n - r = 1$, $m - r = 1$. Check: $5(1,3,1) - 2(2,6,3) + (-1,-3,1) = (0,0,0)$.
:::
:::

::: exercise Intersecting subspaces {level=2 check="1"}
In $\R^4$ let $U = \Span\bigl((1,0,0,1), (0,1,0,1)\bigr)$ and $W = \Span\bigl((1,1,0,2), (0,0,1,0)\bigr)$. Find $\dim(U + W)$ and $\dim(U\cap W)$, and describe $U\cap W$. (Enter $\dim(U\cap W)$.)
::: solution
Both spanning pairs are independent, so $\dim U = \dim W = 2$. Since $(1,1,0,2) = (1,0,0,1) + (0,1,0,1)\in U$, the space $U + W$ is spanned by $(1,0,0,1), (0,1,0,1), (0,0,1,0)$, which are independent (look at coordinates 1, 2, 3); so $\dim(U + W) = 3$. By [[#thm-sum-dim]], $\dim(U\cap W) = 2 + 2 - 3 = 1$. The vector $(1,1,0,2)$ lies in both, so $U\cap W = \Span\bigl((1,1,0,2)\bigr)$.
:::
:::

::: exercise Rank of a product {level=3}
Let $A$ be $m\times n$ and $B$ be $n\times p$. Prove that $\rank(AB)\le\rank A$ and $\rank(AB)\le\rank B$.
::: hint
For the first inequality compare column spaces; for the second compare null spaces and use [[#eq-rank-nullity]].
:::
::: solution
Every column of $AB$ is $A\mathbf{b}_j\in\operatorname{Col}(A)$, so $\operatorname{Col}(AB)\subseteq\operatorname{Col}(A)$ and, by [[#thm-dim-facts]], $\rank(AB)\le\rank A$. Next, if $B\mathbf{x} = \mathbf{0}$ then $AB\mathbf{x} = \mathbf{0}$, so $\operatorname{Nul}(B)\subseteq\operatorname{Nul}(AB)$ and $\dim\operatorname{Nul}(B)\le\dim\operatorname{Nul}(AB)$. Both $B$ and $AB$ have $p$ columns, so by [[#eq-rank-nullity]]

$$
\rank(AB) = p - \dim\operatorname{Nul}(AB) \le p - \dim\operatorname{Nul}(B) = \rank B.
$$

(Alternatively, $\rank(AB) = \rank\bigl((AB)\T\bigr) = \rank(B\T A\T)\le\rank B\T = \rank B$ by the first part.)
:::
:::

::: exercise Subspaces must meet {level=3}
Let $U$ and $W$ be $4$-dimensional subspaces of $\R^7$. Prove that $U\cap W$ contains a non-zero vector. More generally, show that subspaces of dimensions $p$ and $q$ in an $n$-dimensional space intersect non-trivially whenever $p + q > n$.
::: solution
$U + W$ is a subspace of the $n$-dimensional space, so $\dim(U + W)\le n$ by [[#thm-dim-facts]]. By [[#thm-sum-dim]],

$$
\dim(U\cap W) = p + q - \dim(U + W)\ge p + q - n > 0,
$$

so $U\cap W\neq\{0\}$. With $p = q = 4$ and $n = 7$ this gives $\dim(U\cap W)\ge 1$.
:::
:::

::: exercise Every subspace has a complement {level=3}
Let $U$ be a subspace of a finite-dimensional space $V$. Prove that there is a subspace $W$ with $V = U\oplus W$. Is $W$ unique?
::: solution
Choose a basis $u_1, \dots, u_k$ of $U$ and extend it to a basis $u_1, \dots, u_k, w_1, \dots, w_l$ of $V$ ([[#thm-dim-facts]]). Put $W = \Span(w_1, \dots, w_l)$. Every $v\in V$ is a combination of the whole basis, hence of the form $u + w$, so $U + W = V$. If $v\in U\cap W$, write $v = \sum a_iu_i = \sum b_jw_j$; then $\sum a_iu_i - \sum b_jw_j = 0$, and independence of the basis forces all coefficients to vanish, so $v = 0$. By [[linear-algebra/vector-spaces#prop-direct-sum]], $V = U\oplus W$. The complement is not unique: in $\R^2$ with $U$ the $x$-axis, *every* line through the origin other than $U$ is a complement.
:::
:::

::: exercise Bases of a function space {level=3}
Let $V = \Span(\cos^2 x, \sin^2 x, \cos 2x, 1)$, a subspace of $\mathcal{F}(\R, \R)$. Find $\dim V$ and a basis.
::: solution
The identities $\cos^2x + \sin^2 x = 1$ and $\cos^2 x - \sin^2 x = \cos 2x$ show that $1$ and $\cos 2x$ lie in $\Span(\cos^2 x, \sin^2 x)$, so $V = \Span(\cos^2 x, \sin^2x)$ by [[linear-algebra/vector-spaces#lem-dependence]]. These two functions are independent: if $a\cos^2 x + b\sin^2 x = 0$ for all $x$, then $x = 0$ gives $a = 0$ and $x = \pi/2$ gives $b = 0$. So $\dim V = 2$, with basis $\cos^2 x, \sin^2 x$ (another basis is $1, \cos 2x$).
:::
:::
