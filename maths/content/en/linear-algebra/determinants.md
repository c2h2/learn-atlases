A $2\times 2$ matrix $\begin{pmatrix}a&b\\c&d\end{pmatrix}$ is invertible exactly when $ad - bc\neq 0$ ([[linear-algebra/matrices#thm-inverse-2x2]]). Is there a single number that decides invertibility for an $n\times n$ matrix in the same way? There is: the **determinant** $\det A$. It has a striking geometric meaning — $\abs{\det A}$ is the factor by which the map $\mathbf{x}\mapsto A\mathbf{x}$ multiplies areas and volumes, and the sign of $\det A$ records whether the map preserves or reverses orientation. A matrix is singular exactly when it squashes space flat, which is exactly when the volume factor is zero.

Determinants can be introduced through a formidable formula with $n!$ terms. We take a more illuminating route: we list three simple properties that any notion of "signed volume" must have, prove that exactly one function has them, and derive everything else — the effect of row operations, the product rule $\det(AB) = \det A\det B$, cofactor expansion, Cramer's rule and the volume interpretation — from those properties.

## Signed area in the plane

Let the columns $\mathbf{v} = (a, c)$ and $\mathbf{w} = (b, d)$ of a $2\times 2$ matrix span a parallelogram. Its area is $\abs{ad - bc}$, and it is worth seeing why from properties alone. Write $D(\mathbf{v}, \mathbf{w})$ for the **signed area**: the area, with a plus sign if turning from $\mathbf{v}$ to $\mathbf{w}$ is anticlockwise and a minus sign if it is clockwise. Then:

1. $D$ is **linear in each argument**. With $\mathbf{w}$ fixed as the base, the signed area is the base length times the signed height of $\mathbf{v}$ above the line of $\mathbf{w}$, and the signed height is a linear function of $\mathbf{v}$. Similarly in $\mathbf{w}$.
2. $D(\mathbf{v}, \mathbf{v}) = 0$: a parallelogram with two equal sides is flat.
3. $D(\mathbf{e}_1, \mathbf{e}_2) = 1$: the unit square has area $1$.

From (1) and (2), $0 = D(\mathbf{v} + \mathbf{w}, \mathbf{v} + \mathbf{w}) = D(\mathbf{v},\mathbf{w}) + D(\mathbf{w},\mathbf{v})$, so $D$ changes sign when its arguments are swapped. Now expand:

$$
D(a\mathbf{e}_1 + c\mathbf{e}_2,\ b\mathbf{e}_1 + d\mathbf{e}_2) = ab\,D(\mathbf{e}_1, \mathbf{e}_1) + ad\,D(\mathbf{e}_1,\mathbf{e}_2) + cb\,D(\mathbf{e}_2,\mathbf{e}_1) + cd\,D(\mathbf{e}_2,\mathbf{e}_2) = ad - bc.
$$

So the three properties *force* the formula $ad - bc$. The same idea works in every dimension.

::: widget transform2d
matrix: 2,1; 1,3
caption: The unit square (area $1$) is mapped to the parallelogram spanned by the columns $(2,1)$ and $(1,3)$, whose area is $\det A = 2\cdot 3 - 1\cdot 1 = 5$. Every region is magnified by the same factor $5$. Edit the entries: when the columns become parallel (try $\begin{pmatrix}2&4\\1&2\end{pmatrix}$) the parallelogram collapses and the determinant is $0$; when the columns swap order, the square is flipped over and the determinant becomes negative.
:::

## The determinant: definition, existence and uniqueness

We regard a function of an $n\times n$ matrix as a function of its rows $\mathbf{r}_1, \dots, \mathbf{r}_n$ (working with rows matches elimination; we shall see that columns work equally well).

::: definition Determinant function {#def-det}
A function $D\colon M_n(\F)\to\F$ is a **determinant function** if

1. **(multilinear)** it is linear in each row when the other rows are held fixed: for each $i$,
   $D(\dots, a\mathbf{r} + b\mathbf{s}, \dots) = a\,D(\dots,\mathbf{r},\dots) + b\,D(\dots,\mathbf{s},\dots)$, where the displayed argument is row $i$;
2. **(alternating)** $D(A) = 0$ whenever two rows of $A$ are equal;
3. **(normalised)** $D(I) = 1$.
:::

Before showing that such a function exists, we derive what it must do under row operations.

::: lemma Row operations and determinant functions {#lem-row-ops}
Let $D$ satisfy conditions 1 and 2 of [[#def-det]]. Then

1. interchanging two rows multiplies $D(A)$ by $-1$;
2. adding a multiple of one row to another row leaves $D(A)$ unchanged;
3. multiplying one row by $c$ multiplies $D(A)$ by $c$;
4. if $A$ has a zero row, then $D(A) = 0$.
:::

::: proof
1. Put $\mathbf{r}_i + \mathbf{r}_j$ in both positions $i$ and $j$ and expand by multilinearity:
   $$
   0 = D(\dots,\mathbf{r}_i + \mathbf{r}_j,\dots,\mathbf{r}_i + \mathbf{r}_j,\dots) = D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_i,\dots) + D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_j,\dots) + D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_i,\dots) + D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_j,\dots).
   $$
   The first and last terms vanish by the alternating property, so the middle two are negatives of each other.
2. $D(\dots,\mathbf{r}_i + c\mathbf{r}_j,\dots,\mathbf{r}_j,\dots) = D(\dots,\mathbf{r}_i,\dots,\mathbf{r}_j,\dots) + c\,D(\dots,\mathbf{r}_j,\dots,\mathbf{r}_j,\dots)$, and the last term is $0$.
3. This is linearity in one row.
4. A zero row equals $0$ times itself, so by part 3, $D(A) = 0\cdot D(A) = 0$.
:::

To state the formula we need permutations. A **permutation** of $\{1, \dots, n\}$ is a bijection $\sigma$ of this set to itself; there are $n!$ of them, and they form the set $S_n$. Each permutation has a **sign** $\sgn\sigma\in\{1, -1\}$, equal to $(-1)^k$ if $\sigma$ can be written as a composition of $k$ transpositions (swaps of two elements). We use three standard facts, proved in [[abstract-algebra/permutation-groups]]: the sign is well defined (all ways of writing $\sigma$ as a product of transpositions have the same parity); $\sgn(\sigma\tau) = \sgn\sigma\,\sgn\tau$; and consequently $\sgn(\sigma^{-1}) = \sgn\sigma$ and composing with a transposition changes the sign.

::: theorem Existence and uniqueness of the determinant {#thm-det-unique}
There is exactly one determinant function on $M_n(\F)$. It is called the **determinant**, written $\det A$ or $\abs{A}$, and it is given by the **Leibniz formula**

$$
\det A = \sum_{\sigma\in S_n}\sgn(\sigma)\,a_{1\sigma(1)}\,a_{2\sigma(2)}\cdots a_{n\sigma(n)}.
$$ {#eq-leibniz}
:::

::: proof
*Uniqueness.* Let $D$ be a determinant function. Row $i$ of $A$ is $\mathbf{r}_i = \sum_{j} a_{ij}\mathbf{e}_j\T$. Expanding every row by multilinearity,

$$
D(A) = \sum_{j_1 = 1}^n\cdots\sum_{j_n = 1}^n a_{1j_1}a_{2j_2}\cdots a_{nj_n}\,D(\mathbf{e}_{j_1}\T, \dots, \mathbf{e}_{j_n}\T).
$$

If two of the indices $j_1, \dots, j_n$ coincide, the matrix with rows $\mathbf{e}_{j_1}\T, \dots, \mathbf{e}_{j_n}\T$ has two equal rows and the term vanishes. The surviving terms are those in which $(j_1, \dots, j_n) = (\sigma(1), \dots, \sigma(n))$ for a permutation $\sigma$. The matrix $P_\sigma$ with rows $\mathbf{e}_{\sigma(1)}\T, \dots, \mathbf{e}_{\sigma(n)}\T$ is the identity with its rows permuted; writing $\sigma$ as a product of $k$ transpositions, $P_\sigma$ can be turned into $I$ by $k$ row interchanges, so by [[#lem-row-ops]] $D(P_\sigma) = (-1)^kD(I) = \sgn\sigma$. Hence $D(A)$ equals the right-hand side of [[#eq-leibniz]]: there is at most one determinant function.

*Existence.* Define $\det A$ by [[#eq-leibniz]] and check the three conditions. *Normalised:* for $A = I$, the product $a_{1\sigma(1)}\cdots a_{n\sigma(n)}$ is non-zero only when $\sigma(i) = i$ for all $i$, so $\det I = \sgn(\mathrm{id}) = 1$. *Multilinear:* each term contains exactly one entry from row $i$, as a factor, so each term — and hence the sum — is linear in row $i$. *Alternating:* suppose rows $k$ and $l$ ($k\neq l$) are equal and let $\tau$ be the transposition swapping $k$ and $l$. The map $\sigma\mapsto\sigma\tau$ pairs up the permutations of $S_n$ ($\sigma\tau\neq\sigma$, and $(\sigma\tau)\tau = \sigma$). In the term for $\sigma\tau$, the factors from rows $k$ and $l$ are $a_{k\sigma(l)}a_{l\sigma(k)}$, which equals $a_{l\sigma(l)}a_{k\sigma(k)}$ because the two rows are equal; all other factors agree with those of the $\sigma$-term. So the two terms have the same product but opposite signs ($\sgn(\sigma\tau) = -\sgn\sigma$), and the whole sum cancels in pairs to $0$.
:::

For $n = 2$ the formula has $2$ terms, $a_{11}a_{22} - a_{12}a_{21}$; for $n = 3$ it has $6$:

$$
\begin{vmatrix}a_{11}&a_{12}&a_{13}\\a_{21}&a_{22}&a_{23}\\a_{31}&a_{32}&a_{33}\end{vmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}.
$$ {#eq-det3}

For $n = 10$ it has $3\,628\,800$ terms, so the formula is a theoretical tool rather than a method of computation. Here is the first consequence.

::: theorem Triangular matrices {#thm-triangular}
The determinant of a triangular matrix is the product of its diagonal entries.
:::

::: proof
Let $A$ be upper triangular. In [[#eq-leibniz]], the term for $\sigma$ is non-zero only if $a_{i\sigma(i)}\neq 0$ for all $i$, which requires $\sigma(i)\ge i$ for every $i$. Then $\sigma(n) = n$, hence $\sigma(n-1) = n - 1$ (the value $n$ is taken), and so on down: $\sigma$ is the identity. So only the diagonal term $a_{11}a_{22}\cdots a_{nn}$ survives. The lower triangular case is the same with $\sigma(i)\le i$.
:::

## Computing determinants by elimination

[[#lem-row-ops]] and [[#thm-triangular]] give the practical method. Row reduce $A$ to an echelon form $U$ using replacements and interchanges only. Replacements do not change the determinant and each interchange changes its sign, so

$$
\det A = (-1)^{s}\,u_{11}u_{22}\cdots u_{nn},
$$ {#eq-det-pivots}

where $s$ is the number of interchanges: **up to sign, the determinant is the product of the pivots**. This costs about $\tfrac23n^3$ operations, like elimination itself.

::: example A 4×4 determinant by elimination {#ex-det4}
Compute $\det A$ for $A = \begin{pmatrix}1&2&0&1\\2&4&1&3\\-1&0&2&1\\3&5&1&0\end{pmatrix}$.
::: solution
Clear the first column with replacements (no change to the determinant):

$$
\det A = \begin{vmatrix}1&2&0&1\\0&0&1&1\\0&2&2&2\\0&-1&1&-3\end{vmatrix} \quad(R_2 - 2R_1,\ R_3 + R_1,\ R_4 - 3R_1).
$$

The $(2,2)$ entry is $0$, so interchange rows 2 and 3, which changes the sign:

$$
\det A = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&-1&1&-3\end{vmatrix} = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&0&2&-2\end{vmatrix} = -\begin{vmatrix}1&2&0&1\\0&2&2&2\\0&0&1&1\\0&0&0&-4\end{vmatrix},
$$

using $R_4 + \tfrac12R_2$ and then $R_4 - 2R_3$. The last matrix is triangular, so $\det A = -(1\cdot 2\cdot 1\cdot(-4)) = 8$.
:::
:::

::: widget rowreduce
matrix: 1,2,0,1; 2,4,1,3; -1,0,2,1; 3,5,1,0
augmented: false
caption: The matrix of [[#ex-det4]]. As you step through the elimination, keep a running record: each interchange multiplies the determinant by $-1$, each scaling $R_i\to cR_i$ multiplies it by $c$, and replacements change nothing. Since the reduced form is $I$ (determinant $1$), the record lets you recover $\det A = 8$.
:::

The elimination method also proves the most important properties of the determinant.

::: theorem Determinants detect invertibility {#thm-det-invertible}
A square matrix $A$ is invertible if and only if $\det A\neq 0$.
:::

::: proof
Row reduce $A$ to its reduced echelon form $R$. By [[#lem-row-ops]], each elementary row operation multiplies the determinant by a non-zero number ($-1$, $1$ or $c\neq 0$), so $\det A = k\det R$ for some $k\neq 0$. If $A$ is invertible, $R = I$ and $\det A = k\neq 0$. If not, $R$ has fewer than $n$ pivots, so its last row is zero and $\det R = 0$, giving $\det A = 0$.
:::

::: theorem Product rule {#thm-product}
For all $n\times n$ matrices $A$ and $B$, $\det(AB) = \det A\,\det B$.
:::

::: proof
If $\det B = 0$, then $B$ is singular, so $B\mathbf{x} = \mathbf{0}$ for some $\mathbf{x}\neq\mathbf{0}$; then $AB\mathbf{x} = \mathbf{0}$, so $AB$ is singular and both sides are $0$.

If $\det B\neq 0$, define $D(A) = \det(AB)/\det B$. Row $i$ of $AB$ is (row $i$ of $A$)$\,B$, which depends linearly on row $i$ of $A$; so $D$ is multilinear in the rows of $A$. If $A$ has two equal rows, so does $AB$, and $D(A) = 0$. Finally $D(I) = \det B/\det B = 1$. By the uniqueness in [[#thm-det-unique]], $D = \det$, that is, $\det(AB)/\det B = \det A$.
:::

Some consequences, each a line long: if $A$ is invertible then $\det(A^{-1}) = 1/\det A$ (since $\det A\det A^{-1} = \det I = 1$); $\det(A^k) = (\det A)^k$; and similar matrices have the same determinant,

$$
\det(P^{-1}AP) = \det(P^{-1})\det A\det P = \det A.
$$

So the determinant of a linear operator $T$ on a finite-dimensional space is well defined: it is the determinant of $[T]_{\mathcal{B}}$ for any basis $\mathcal{B}$ (see [[linear-algebra/linear-maps#thm-change-basis]]). Note that there is **no** such rule for sums: $\det(A + B)\neq\det A + \det B$ in general.

::: theorem Transpose {#thm-det-transpose}
For every square matrix, $\det A\T = \det A$.
:::

::: proof
By [[#eq-leibniz]] applied to $A\T$, whose $(i,j)$ entry is $a_{ji}$,

$$
\det A\T = \sum_{\sigma\in S_n}\sgn(\sigma)\,a_{\sigma(1)1}\cdots a_{\sigma(n)n}.
$$

Reorder each product by row index: as $i$ runs over $1, \dots, n$, so does $j = \sigma(i)$, and $a_{\sigma(i)i} = a_{j\sigma^{-1}(j)}$. So the term for $\sigma$ equals $\sgn(\sigma)\,a_{1\sigma^{-1}(1)}\cdots a_{n\sigma^{-1}(n)}$, which is the term for $\sigma^{-1}$ in the formula for $\det A$ (recall $\sgn\sigma^{-1} = \sgn\sigma$). As $\sigma$ runs through $S_n$, so does $\sigma^{-1}$, so the two sums agree.
:::

Consequently every statement about rows is also true for columns: the determinant is multilinear and alternating in the columns, column interchanges change its sign, and adding a multiple of one column to another changes nothing.

::: quiz
$A$ is a $3\times 3$ matrix with $\det A = 5$. What is $\det(2A)$?
- [ ] $10$
- [ ] $30$
- [x] $40$
- [ ] $25$
::: solution
$2A$ is obtained from $A$ by multiplying each of the $3$ rows by $2$, and each multiplication doubles the determinant ([[#lem-row-ops]]). So $\det(2A) = 2^3\det A = 40$. In general $\det(cA) = c^n\det A$ for an $n\times n$ matrix — a common source of errors.
:::
:::

## Cofactor expansion

For hand computation of small determinants, and for theory, it is useful to expand along a row or column.

::: definition Minors and cofactors {#def-cofactor}
For an $n\times n$ matrix $A$ and indices $i, j$, let $A_{ij}$ be the $(n-1)\times(n-1)$ matrix obtained by deleting row $i$ and column $j$ of $A$. The number $\det A_{ij}$ is a **minor** of $A$, and

$$
C_{ij} = (-1)^{i+j}\det A_{ij}
$$

is the $(i,j)$ **cofactor**. The signs $(-1)^{i+j}$ form a chessboard pattern starting with $+$ in the top left corner.
:::

::: theorem Cofactor (Laplace) expansion {#thm-laplace}
For each fixed row $i$ and each fixed column $j$,

$$
\det A = \sum_{k=1}^n a_{ik}C_{ik} \qquad\text{and}\qquad \det A = \sum_{k=1}^n a_{kj}C_{kj}.
$$
:::

::: proof
Row $i$ of $A$ is $\sum_k a_{ik}\mathbf{e}_k\T$, so by linearity in row $i$, $\det A = \sum_k a_{ik}\det B_k$, where $B_k$ is $A$ with row $i$ replaced by $\mathbf{e}_k\T$. It remains to show $\det B_k = C_{ik}$.

Move row $i$ of $B_k$ to the top by $i - 1$ interchanges of adjacent rows, and then move column $k$ to the far left by $k - 1$ interchanges of adjacent columns; each interchange changes the sign (for columns, by [[#thm-det-transpose]]), and the relative order of the other rows and columns is preserved. The result is a matrix whose first row is $\mathbf{e}_1\T$ and whose lower right $(n-1)\times(n-1)$ block is $A_{ik}$. Subtracting multiples of the first row clears the rest of the first column without changing the determinant, giving $\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&A_{ik}\end{pmatrix}$. The function $M\mapsto\det\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&M\end{pmatrix}$ on $(n-1)\times(n-1)$ matrices is multilinear and alternating in the rows of $M$ and equals $1$ at $M = I$, so by [[#thm-det-unique]] it is $\det M$. Altogether $\det B_k = (-1)^{(i-1)+(k-1)}\det A_{ik} = C_{ik}$. The column expansion follows by applying the row expansion to $A\T$.
:::

Expansion is efficient when a row or column contains many zeros — choose that one.

::: example Expanding along a row with a zero {#ex-cofactor}
Compute $\det\begin{pmatrix}2&0&1\\1&3&-1\\0&5&4\end{pmatrix}$ by cofactor expansion, and check with [[#eq-det3]].
::: solution
Expand along the first row (signs $+, -, +$); the middle term vanishes:

$$
\det A = 2\begin{vmatrix}3&-1\\5&4\end{vmatrix} - 0 + 1\begin{vmatrix}1&3\\0&5\end{vmatrix} = 2(12 + 5) + (5 - 0) = 39.
$$

Check with the six-term formula: $2\cdot3\cdot4 + 0\cdot(-1)\cdot0 + 1\cdot1\cdot5 - 1\cdot3\cdot0 - 2\cdot(-1)\cdot5 - 0\cdot1\cdot4 = 24 + 0 + 5 - 0 + 10 - 0 = 39$.
:::
:::

::: example The Vandermonde determinant {#ex-vandermonde}
Show that $\begin{vmatrix}1&a&a^2\\1&b&b^2\\1&c&c^2\end{vmatrix} = (b - a)(c - a)(c - b)$.
::: solution
Subtract row 1 from rows 2 and 3 (no change), then expand along the first column:

$$
\begin{vmatrix}1&a&a^2\\0&b - a&b^2 - a^2\\0&c-a&c^2 - a^2\end{vmatrix} = \begin{vmatrix}b - a&(b-a)(b+a)\\c - a&(c - a)(c + a)\end{vmatrix}.
$$

Take the factor $b - a$ out of the first row and $c - a$ out of the second (linearity in each row):

$$
(b - a)(c - a)\begin{vmatrix}1&b + a\\1&c + a\end{vmatrix} = (b-a)(c-a)\bigl((c + a) - (b + a)\bigr) = (b-a)(c-a)(c-b).
$$

So the determinant is non-zero exactly when $a, b, c$ are distinct. This matrix is the coefficient matrix of the problem of fitting a parabola through three points with $x$-coordinates $a, b, c$ (compare [[linear-algebra/linear-systems#ex-parabola]], where $a, b, c = 1, 2, 3$ and the determinant is $1\cdot2\cdot1 = 2$), which confirms that such a parabola always exists and is unique. The general $n\times n$ version is [[#exr-vandermonde]].
:::
:::

## Cramer's rule and the inverse

Determinants give explicit formulas for the solution of a square system and for an inverse. For a vector $\mathbf{b}$, let $A_i(\mathbf{b})$ denote $A$ with its $i$-th column replaced by $\mathbf{b}$.

::: theorem Cramer's rule {#thm-cramer}
If $A$ is an invertible $n\times n$ matrix, the unique solution of $A\mathbf{x} = \mathbf{b}$ is given by

$$
x_i = \frac{\det A_i(\mathbf{b})}{\det A}, \qquad i = 1, \dots, n.
$$
:::

::: proof
Let $I_i(\mathbf{x})$ be the identity matrix with column $i$ replaced by $\mathbf{x}$. Then $A\,I_i(\mathbf{x})$ has columns $A\mathbf{e}_1, \dots, A\mathbf{x}, \dots, A\mathbf{e}_n$, that is, $A\,I_i(\mathbf{x}) = A_i(\mathbf{b})$. Expanding $\det I_i(\mathbf{x})$ along row $i$, whose only non-zero entry is $x_i$ in position $(i,i)$, gives $\det I_i(\mathbf{x}) = x_i\det I_{n-1} = x_i$. By the product rule, $\det A\cdot x_i = \det A_i(\mathbf{b})$; divide by $\det A\neq 0$.
:::

::: theorem The adjugate formula {#thm-adjugate}
Let $\operatorname{adj}A$, the **adjugate** of $A$, be the transpose of the matrix of cofactors: $(\operatorname{adj}A)_{ij} = C_{ji}$. Then

$$
A\,\operatorname{adj}(A) = \operatorname{adj}(A)\,A = (\det A)\,I,
$$

so if $\det A\neq 0$, then $A^{-1} = \dfrac{1}{\det A}\operatorname{adj}A$.
:::

::: proof
The $(i,k)$ entry of $A\operatorname{adj}(A)$ is $\sum_j a_{ij}C_{kj}$. For $k = i$ this is the expansion of $\det A$ along row $i$. For $k\neq i$, it is the expansion along row $k$ of the matrix obtained from $A$ by replacing row $k$ with a copy of row $i$ (the cofactors $C_{kj}$ do not involve row $k$); that matrix has two equal rows, so the sum is $0$. Hence $A\operatorname{adj}(A) = (\det A)I$. The other product is handled with column expansions.
:::

For a $2\times 2$ matrix the adjugate is $\begin{pmatrix}d&-b\\-c&a\end{pmatrix}$, recovering [[linear-algebra/matrices#eq-inv2]].

::: example Cramer's rule in action {#ex-cramer}
Solve $x_1 + 2x_2 + x_3 = 1$, $x_2 + 3x_3 = 5$, $2x_1 + x_2 = 1$ by Cramer's rule.
::: solution
The coefficient matrix has determinant, expanding along the first column,

$$
\det A = \begin{vmatrix}1&2&1\\0&1&3\\2&1&0\end{vmatrix} = 1\begin{vmatrix}1&3\\1&0\end{vmatrix} - 0 + 2\begin{vmatrix}2&1\\1&3\end{vmatrix} = (0 - 3) + 2(6 - 1) = 7.
$$

Replacing each column in turn by $\mathbf{b} = (1, 5, 1)$:

$$
\det A_1(\mathbf{b}) = \begin{vmatrix}1&2&1\\5&1&3\\1&1&0\end{vmatrix} = 7,\qquad
\det A_2(\mathbf{b}) = \begin{vmatrix}1&1&1\\0&5&3\\2&1&0\end{vmatrix} = -7,\qquad
\det A_3(\mathbf{b}) = \begin{vmatrix}1&2&1\\0&1&5\\2&1&1\end{vmatrix} = 14.
$$

(For instance, expanding the first along row 1: $1(0 - 3) - 2(0 - 3) + 1(5 - 1) = -3 + 6 + 4 = 7$.) Hence $\mathbf{x} = (7, -7, 14)/7 = (1, -1, 2)$. *Check:* $1 - 2 + 2 = 1$, $-1 + 6 = 5$, $2 - 1 = 1$.
:::
:::

::: warning Formulas are not algorithms
Cramer's rule and the adjugate formula are valuable in theory — they show, for example, that the entries of $A^{-1}$ are rational functions of the entries of $A$, hence continuous wherever $\det A\neq 0$. But they are hopeless for computation beyond $3\times 3$: Cramer's rule needs $n + 1$ determinants, and evaluating a determinant by cofactor expansion takes about $n!$ operations — for $n = 20$, more than $2\times 10^{18}$. Elimination does the whole job in about $\tfrac23n^3$ operations, a few thousand for $n = 20$.
:::

::: quiz
Which of these operations on a square matrix can change the value of its determinant? (Select all that apply.)
- [x] Interchanging two rows
- [ ] Adding $5$ times row $1$ to row $3$
- [x] Multiplying a row by $5$
- [ ] Transposing the matrix
::: solution
An interchange multiplies the determinant by $-1$ (it changes the value unless the determinant is $0$), and scaling a row by $5$ multiplies it by $5$. Replacements and transposition never change it ([[#lem-row-ops]] and [[#thm-det-transpose]]).
:::
:::

## Determinants as volume

We return to geometry. For vectors $\mathbf{a}_1, \dots, \mathbf{a}_n\in\R^n$, the **parallelepiped** they span is

$$
\mathcal{P}(\mathbf{a}_1, \dots, \mathbf{a}_n) = \set{t_1\mathbf{a}_1 + \dots + t_n\mathbf{a}_n : 0\le t_i\le 1}.
$$

For $n = 2$ it is a parallelogram and for $n = 3$ a slanted box.

::: theorem Volume {#thm-volume}
If $A$ is a real $n\times n$ matrix with columns $\mathbf{a}_1, \dots, \mathbf{a}_n$, then $\abs{\det A}$ is the $n$-dimensional volume of $\mathcal{P}(\mathbf{a}_1, \dots, \mathbf{a}_n)$. More generally, the linear map $\mathbf{x}\mapsto A\mathbf{x}$ multiplies the volume of every region by $\abs{\det A}$.
:::

::: proof
(Sketch.) Write $V(\mathbf{a}_1, \dots, \mathbf{a}_n)$ for the volume of the parallelepiped. Elementary geometry shows that (i) adding a multiple of one spanning vector to another does not change the volume — this is a shear, which slides slices of the solid parallel to a face without changing their size (Cavalieri's principle); (ii) multiplying one vector by $c$ multiplies the volume by $\abs{c}$; (iii) reordering the vectors changes nothing; and (iv) the unit cube has volume $1$. By [[#lem-row-ops]] applied to columns, $\abs{\det A}$ responds to the corresponding column operations in exactly the same way. Column-reduce $A$: if $A$ is singular, the columns are dependent, the parallelepiped is flat (it lies in a hyperplane) and both quantities are $0$; otherwise $A$ reduces to $I$, where both quantities are $1$, and running the reduction backwards shows they agree for $A$. For a general region, approximate it by small cubes: each cube is mapped to a parallelepiped whose volume is $\abs{\det A}$ times its own. Making this approximation rigorous is part of the theory of multiple integrals; see [[multivariable/change-of-variables]].
:::

The sign of $\det A$ also has a meaning: it is positive when the map preserves **orientation** (an anticlockwise turn from $\mathbf{e}_1$ to $\mathbf{e}_2$ stays anticlockwise, a right hand stays a right hand) and negative when it reverses orientation, like a mirror. Rotations have determinant $1$; reflections have determinant $-1$.

::: widget transform2d
matrix: 1,2; 2,1
caption: Here $\det A = 1 - 4 = -3$. The image of the unit square has area $3$, but it has been turned over: going from the image of $\mathbf{e}_1$ to the image of $\mathbf{e}_2$ is now a clockwise turn. Make the off-diagonal entries smaller and watch the determinant pass through $0$ — the moment the square collapses to a segment — on its way to positive values.
:::

::: example Areas and volumes {#ex-volume}
(a) Find the area of the triangle with vertices $(1,1)$, $(4,2)$, $(2,5)$. (b) Find the volume of the parallelepiped spanned by $(1,0,1)$, $(2,1,0)$, $(0,3,1)$.
::: solution
(a) Two sides from $(1,1)$ are $(3, 1)$ and $(1, 4)$. They span a parallelogram of area $\abs{\det\begin{pmatrix}3&1\\1&4\end{pmatrix}} = \abs{12 - 1} = 11$, and the triangle is half of it: area $\tfrac{11}{2}$.

(b) Put the vectors in the columns and expand along the first row:

$$
\begin{vmatrix}1&2&0\\0&1&3\\1&0&1\end{vmatrix} = 1(1 - 0) - 2(0 - 3) + 0 = 7.
$$

The volume is $7$. Since the determinant is positive, the three vectors (in this order) form a right-handed system.
:::
:::

::: application Change of variables in integrals
A differentiable map $\mathbf{u}\mapsto\mathbf{x}(\mathbf{u})$ looks, near each point, like its derivative — a linear map, whose matrix is the **Jacobian matrix**. By [[#thm-volume]], small regions have their areas multiplied by the absolute value of its determinant, which is why $dx\,dy = \abs{\det J}\,du\,dv$ in the change of variables formula. For polar coordinates $x = r\cos\theta$, $y = r\sin\theta$, the Jacobian determinant is $\cos\theta\cdot r\cos\theta - (-r\sin\theta)\sin\theta = r$, giving the familiar $dx\,dy = r\,dr\,d\theta$. See [[multivariable/change-of-variables]].
:::

::: history
Determinants are older than matrices. Seki Takakazu in Japan (1683) and Gottfried Wilhelm Leibniz in Germany (in a letter of 1693) introduced them independently while eliminating unknowns from systems of equations. Gabriel Cramer published his rule in 1750. In the 1770s Alexandre-Théophile Vandermonde treated determinants as functions in their own right, and Pierre-Simon Laplace introduced the expansion by minors (1772). Augustin-Louis Cauchy's memoir of 1812 gave the first systematic theory, fixed the modern meaning of the word *determinant* and proved the product rule, found at the same time by Jacques Binet. Carl Jacobi made determinants of derivatives — Jacobians — a standard tool in 1841. The characterisation by multilinearity, the alternating property and normalisation, used as our definition, goes back to the lectures of Karl Weierstrass and Leopold Kronecker and was published in 1903.
:::

## Where this leads

The determinant gives the characteristic polynomial $\det(A - \lambda I)$, whose roots are the eigenvalues of $A$ ([[linear-algebra/eigenvalues]]); the product rule shows that similar matrices share it. Volume scaling underlies the change of variables formula for multiple integrals ([[multivariable/change-of-variables]]), and the sign of the determinant gives the notion of orientation used for surfaces and in [[multivariable/stokes-divergence]]. Numerically, determinants are computed from the $LU$ factorisation by [[#eq-det-pivots]], but they are rarely the right tool for deciding near-singularity; the singular values of [[linear-algebra/svd]] are. The multiplicativity $\det(AB) = \det A\det B$ says that $\det$ is a homomorphism from the group of invertible matrices to the non-zero scalars, whose kernel is the special linear group ([[abstract-algebra/homomorphisms]]).

::: summary
- The determinant is the unique function of the rows that is multilinear, alternating and equal to $1$ at $I$ ([[#thm-det-unique]]); it is given by the Leibniz formula with $n!$ terms.
- Row interchanges change the sign, scaling a row by $c$ multiplies by $c$, replacements change nothing; so $\det A = \pm$ the product of the pivots ([[#eq-det-pivots]]).
- $A$ is invertible iff $\det A\neq 0$; $\det(AB) = \det A\det B$; $\det A\T = \det A$; $\det(cA) = c^n\det A$.
- Similar matrices have equal determinants, so the determinant of a linear operator is well defined.
- Cofactor expansion along any row or column ([[#thm-laplace]]); it is efficient only for small or sparse matrices.
- Cramer's rule and $A^{-1} = \operatorname{adj}(A)/\det A$ are explicit but computationally expensive.
- $\abs{\det A}$ is the volume of the parallelepiped spanned by the columns, and the factor by which $A$ scales volumes; the sign records orientation ([[#thm-volume]]).
:::

## Exercises

::: exercise A 3×3 determinant {level=1 check="-3"}
Compute $\det\begin{pmatrix}1&2&3\\4&5&6\\7&8&10\end{pmatrix}$.
::: solution
Expanding along the first row: $1(5\cdot10 - 6\cdot8) - 2(4\cdot10 - 6\cdot7) + 3(4\cdot8 - 5\cdot7) = 1\cdot2 - 2\cdot(-2) + 3\cdot(-3) = 2 + 4 - 9 = -3$. (With $10$ replaced by $9$ the determinant would be $0$: the rows of that famous matrix are dependent.)
:::
:::

::: exercise Triangular {level=1 check="-3"}
Find $\det\begin{pmatrix}2&5&1&7\\0&-1&4&2\\0&0&3&9\\0&0&0&\frac12\end{pmatrix}$.
::: solution
The matrix is upper triangular, so by [[#thm-triangular]] the determinant is $2\cdot(-1)\cdot 3\cdot\tfrac12 = -3$.
:::
:::

::: exercise Using the rules {level=1 check="-4/3"}
$A$ and $B$ are $3\times 3$ matrices with $\det A = 2$ and $\det B = -3$. Find $\det(AB^{-1}A\T)$.
::: solution
By the product rule and [[#thm-det-transpose]], $\det(AB^{-1}A\T) = \det A\cdot\frac{1}{\det B}\cdot\det A = 2\cdot\left(-\tfrac13\right)\cdot 2 = -\tfrac43$.
:::
:::

::: exercise When is it singular? {level=2 check="sqrt(2)"}
Find the positive value of $k$ for which $\begin{pmatrix}k&1&0\\1&k&1\\0&1&k\end{pmatrix}$ is singular.
::: solution
Expanding along the first row: $\det = k(k^2 - 1) - 1(k - 0) = k^3 - 2k = k(k^2 - 2)$. This vanishes for $k = 0$ and $k = \pm\sqrt2$; the positive value is $k = \sqrt2$.
:::
:::

::: exercise One unknown by Cramer's rule {level=2 check="-1/2"}
Use Cramer's rule to find $x_2$ only, for the system $2x_1 + x_2 = 1$, $x_1 + 3x_2 + x_3 = 0$, $x_2 + 2x_3 = 1$.
::: solution
$\det A = \begin{vmatrix}2&1&0\\1&3&1\\0&1&2\end{vmatrix} = 2(6 - 1) - 1(2 - 0) + 0 = 8$, and

$$
\det A_2(\mathbf{b}) = \begin{vmatrix}2&1&0\\1&0&1\\0&1&2\end{vmatrix} = 2(0 - 1) - 1(2 - 0) + 0 = -4.
$$

So $x_2 = -4/8 = -\tfrac12$. (The full solution is $(\tfrac34, -\tfrac12, \tfrac34)$.)
:::
:::

::: exercise Area of a triangle {level=2 check="11/2"}
Find the area of the triangle with vertices $(1,2)$, $(4,3)$ and $(2,6)$.
::: solution
The sides from $(1,2)$ are $(3,1)$ and $(1,4)$, so the area is $\tfrac12\abs{\det\begin{pmatrix}3&1\\1&4\end{pmatrix}} = \tfrac12\cdot 11 = \tfrac{11}{2}$.
:::
:::

::: exercise Volume of a tetrahedron {level=2 check="13/6"}
The tetrahedron with vertices $\mathbf{0}$, $\mathbf{a}$, $\mathbf{b}$, $\mathbf{c}$ has volume $\tfrac16\abs{\det(\mathbf{a}\ \mathbf{b}\ \mathbf{c})}$. Find the volume when $\mathbf{a} = (1,2,0)$, $\mathbf{b} = (0,1,3)$, $\mathbf{c} = (2,0,1)$.
::: solution
$\det\begin{pmatrix}1&0&2\\2&1&0\\0&3&1\end{pmatrix} = 1(1 - 0) - 0 + 2(6 - 0) = 13$, so the volume is $\tfrac{13}{6}$. (The factor $\tfrac16$ comes from slicing the parallelepiped: a cube splits into six tetrahedra of equal volume.)
:::
:::

::: exercise Odd skew-symmetric matrices {level=3}
Prove that every real skew-symmetric $n\times n$ matrix ($A\T = -A$) with $n$ odd is singular. Give an example showing that this can fail for $n$ even.
::: solution
Using [[#thm-det-transpose]] and $\det(cA) = c^n\det A$,

$$
\det A = \det A\T = \det(-A) = (-1)^n\det A = -\det A
$$

for odd $n$, so $2\det A = 0$ and $\det A = 0$. For $n = 2$, the skew-symmetric matrix $\begin{pmatrix}0&1\\-1&0\end{pmatrix}$ has determinant $1$.
:::
:::

::: exercise The Vandermonde determinant {level=3 #exr-vandermonde}
Prove by induction on $n$ that

$$
\det\begin{pmatrix}1&x_1&x_1^2&\cdots&x_1^{n-1}\\1&x_2&x_2^2&\cdots&x_2^{n-1}\\\vdots&&&&\vdots\\1&x_n&x_n^2&\cdots&x_n^{n-1}\end{pmatrix} = \prod_{1\le i<j\le n}(x_j - x_i).
$$
::: hint
Working from the last column to the second, subtract $x_1$ times each column from the column to its right.
:::
::: solution
For $n = 1$ both sides equal $1$ (an empty product). Suppose the formula holds for $n - 1$. Apply the column operations $C_k\to C_k - x_1C_{k-1}$ for $k = n, n-1, \dots, 2$ (in that order, so that each uses the original column $k-1$); these do not change the determinant. Row $i$ becomes

$$
\bigl(1,\ x_i - x_1,\ x_i(x_i - x_1),\ \dots,\ x_i^{n-2}(x_i - x_1)\bigr),
$$

so the first row is $(1, 0, \dots, 0)$. Expanding along it, the determinant equals the $(n-1)\times(n-1)$ determinant with rows $(x_i - x_1)(1, x_i, \dots, x_i^{n-2})$ for $i = 2, \dots, n$. Taking the factor $x_i - x_1$ out of each row (multilinearity) leaves the Vandermonde determinant of $x_2, \dots, x_n$, which by the induction hypothesis is $\prod_{2\le i<j\le n}(x_j - x_i)$. Altogether the determinant is $\prod_{j=2}^n(x_j - x_1)\cdot\prod_{2\le i<j\le n}(x_j - x_i) = \prod_{1\le i<j\le n}(x_j - x_i)$.
:::
:::

::: exercise Integer inverses {level=3}
Prove that if $A$ has integer entries, then $A^{-1}$ exists and has integer entries if and only if $\det A = \pm1$. Illustrate with $A = \begin{pmatrix}2&1&3\\1&0&1\\1&2&4\end{pmatrix}$.
::: solution
If $A$ and $A^{-1}$ both have integer entries, their determinants are integers (the Leibniz formula uses only sums and products of entries), and $\det A\det A^{-1} = \det I = 1$; the only integers whose product is $1$ are $\pm1$, so $\det A = \pm1$. Conversely, if $\det A = \pm1$, then by [[#thm-adjugate]] $A^{-1} = \pm\operatorname{adj}A$, and the cofactors are determinants of integer matrices, hence integers.

For the example, expanding along row 2: $\det A = -1\cdot\begin{vmatrix}1&3\\2&4\end{vmatrix} + 0 - 1\cdot\begin{vmatrix}2&1\\1&2\end{vmatrix} = -1\cdot(-2) - 3 = -1$. The cofactors give $\operatorname{adj}A = \begin{pmatrix}-2&2&1\\-3&5&1\\2&-3&-1\end{pmatrix}$, so $A^{-1} = -\operatorname{adj}A = \begin{pmatrix}2&-2&-1\\3&-5&-1\\-2&3&1\end{pmatrix}$, which has integer entries. (Check: row 1 of $A$ times column 1 of $A^{-1}$ is $4 + 3 - 6 = 1$.)
:::
:::
