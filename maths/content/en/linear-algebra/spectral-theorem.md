The matrix $A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$ has eigenvalues $4$ and $2$, with eigenvectors $(1,1)$ and $(1,-1)$. These eigenvectors are perpendicular — and that is no accident. $A$ is **symmetric**, $A\T = A$, and symmetric matrices are the best-behaved matrices in linear algebra: their eigenvalues are always real, their eigenvectors can always be chosen orthonormal, and so they can always be diagonalised by a rotation (or reflection) of the coordinate axes. This is the **spectral theorem**.

Symmetric matrices are also among the most common in applications. The matrix $A\T A$ of least squares is symmetric; so are covariance matrices in statistics, Hessian matrices of second derivatives in optimisation, inertia tensors in mechanics, stiffness matrices in engineering and the adjacency matrices of undirected networks. Each of them describes a **quadratic form** — a function such as $3x^2 + 2xy + 3y^2$ — and the spectral theorem says that a rotation of coordinates removes the cross term $xy$, revealing the form's true shape. In this chapter we prove the theorem, use it to classify quadratic forms and conic sections, characterise positive definite matrices, and solve the problem of maximising a quadratic form on the unit sphere.

## Eigenvalues and eigenvectors of symmetric matrices

The key property of a symmetric matrix is that it can be moved from one side of a dot product to the other:

$$
(A\mathbf{x})\cdot\mathbf{y} = (A\mathbf{x})\T\mathbf{y} = \mathbf{x}\T A\T\mathbf{y} = \mathbf{x}\T A\mathbf{y} = \mathbf{x}\cdot(A\mathbf{y}) \qquad\text{for all }\mathbf{x}, \mathbf{y}\in\R^n.
$$ {#eq-self-adjoint}

(Conversely, a matrix with this property is symmetric: take $\mathbf{x} = \mathbf{e}_i$, $\mathbf{y} = \mathbf{e}_j$ to get $a_{ji} = a_{ij}$.) Operators with property [[#eq-self-adjoint]] on a general inner product space are called **self-adjoint**.

::: theorem Real eigenvalues {#thm-real-eigenvalues}
Every eigenvalue of a real symmetric matrix is real, and has a real eigenvector.
:::

::: proof
Let $A$ be real symmetric and $A\mathbf{z} = \lambda\mathbf{z}$ with $\lambda\in\C$ and $\mathbf{z}\in\C^n$, $\mathbf{z}\neq\mathbf{0}$. Write $\bar{\mathbf{z}}$ for the entrywise complex conjugate and consider the number $q = \bar{\mathbf{z}}\T A\mathbf{z}$. Since $A$ is real and symmetric, and a $1\times 1$ matrix equals its transpose,

$$
\bar q = \mathbf{z}\T A\bar{\mathbf{z}} = (\mathbf{z}\T A\bar{\mathbf{z}})\T = \bar{\mathbf{z}}\T A\T\mathbf{z} = \bar{\mathbf{z}}\T A\mathbf{z} = q,
$$

so $q$ is real. Also $q = \bar{\mathbf{z}}\T(\lambda\mathbf{z}) = \lambda\,\bar{\mathbf{z}}\T\mathbf{z} = \lambda\sum_i\abs{z_i}^2$, and $\sum\abs{z_i}^2 > 0$. Hence $\lambda = q/\sum\abs{z_i}^2$ is real. Then $A - \lambda I$ is a real singular matrix, so it has a non-zero real null vector, which is a real eigenvector.
:::

::: theorem Orthogonal eigenvectors {#thm-orthogonal-eigenvectors}
If $A$ is symmetric and $\mathbf{v}_1, \mathbf{v}_2$ are eigenvectors with different eigenvalues $\lambda_1\neq\lambda_2$, then $\mathbf{v}_1\perp\mathbf{v}_2$.
:::

::: proof
Using [[#eq-self-adjoint]], $\lambda_1(\mathbf{v}_1\cdot\mathbf{v}_2) = (A\mathbf{v}_1)\cdot\mathbf{v}_2 = \mathbf{v}_1\cdot(A\mathbf{v}_2) = \lambda_2(\mathbf{v}_1\cdot\mathbf{v}_2)$. So $(\lambda_1 - \lambda_2)(\mathbf{v}_1\cdot\mathbf{v}_2) = 0$, and since $\lambda_1\neq\lambda_2$, $\mathbf{v}_1\cdot\mathbf{v}_2 = 0$.
:::

Both theorems fail without symmetry: the rotation $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$ has eigenvalues $\pm i$, and $\begin{pmatrix}1&1\\0&2\end{pmatrix}$ has eigenvectors $(1,0)$ and $(1,1)$, which are not perpendicular.

## The spectral theorem

::: definition Orthogonally diagonalisable {#def-orth-diag}
A real square matrix $A$ is **orthogonally diagonalisable** if $A = QDQ\T$ for an orthogonal matrix $Q$ ($Q\T Q = I$, so $Q^{-1} = Q\T$) and a diagonal matrix $D$. Equivalently, $\R^n$ has an orthonormal basis consisting of eigenvectors of $A$ — the columns of $Q$.
:::

::: theorem Spectral theorem for real symmetric matrices {#thm-spectral}
A real $n\times n$ matrix is orthogonally diagonalisable if and only if it is symmetric.
:::

::: proof
If $A = QDQ\T$, then $A\T = (Q\T)\T D\T Q\T = QDQ\T = A$, because a diagonal matrix is symmetric. So orthogonally diagonalisable matrices are symmetric.

For the converse we use induction on $n$; for $n = 1$ every matrix is diagonal. Let $A$ be symmetric of size $n\ge 2$. By [[#thm-real-eigenvalues]] it has a real eigenvalue $\lambda_1$ with a real eigenvector, which we normalise to a unit vector $\mathbf{q}_1$. Extend $\mathbf{q}_1$ to an orthonormal basis $\mathbf{q}_1, \mathbf{u}_2, \dots, \mathbf{u}_n$ of $\R^n$ (extend to any basis, then apply Gram–Schmidt, [[linear-algebra/inner-products#thm-gram-schmidt]]), and let $Q_1$ be the orthogonal matrix with these columns. The first column of $Q_1\T AQ_1$ is $Q_1\T A\mathbf{q}_1 = \lambda_1Q_1\T\mathbf{q}_1 = \lambda_1\mathbf{e}_1$. But $Q_1\T AQ_1$ is symmetric (its transpose is $Q_1\T A\T Q_1$), so its first row is $\lambda_1\mathbf{e}_1\T$ as well:

$$
Q_1\T AQ_1 = \begin{pmatrix}\lambda_1 & \mathbf{0}\T\\ \mathbf{0} & B\end{pmatrix},
$$

where $B$ is a symmetric $(n-1)\times(n-1)$ matrix. By the induction hypothesis, $B = Q_2D_2Q_2\T$ with $Q_2$ orthogonal and $D_2$ diagonal. Put

$$
Q = Q_1\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\end{pmatrix}, \qquad D = \begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&D_2\end{pmatrix}.
$$

$Q$ is a product of orthogonal matrices, hence orthogonal, and $Q\T AQ = \begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\T\end{pmatrix}\begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&B\end{pmatrix}\begin{pmatrix}1&\mathbf{0}\T\\\mathbf{0}&Q_2\end{pmatrix} = \begin{pmatrix}\lambda_1&\mathbf{0}\T\\\mathbf{0}&Q_2\T BQ_2\end{pmatrix} = D$. So $A = QDQ\T$.
:::

The proof shows that the obstacle met in [[linear-algebra/eigenvalues#ex-defective]] — too few eigenvectors — can never occur for a symmetric matrix. Collecting what we now know about a real symmetric $n\times n$ matrix $A$:

- it has $n$ real eigenvalues, counted with multiplicity;
- for each eigenvalue, the dimension of the eigenspace equals the algebraic multiplicity;
- eigenspaces for different eigenvalues are mutually orthogonal, and together they fill $\R^n$.

To orthogonally diagonalise $A$ in practice: find the eigenvalues; for each eigenvalue find a basis of its eigenspace and make it orthonormal (with Gram–Schmidt if the eigenspace has dimension $2$ or more); put all these vectors into the columns of $Q$. Writing $A = QDQ\T$ column by column gives the **spectral decomposition**

$$
A = \lambda_1\mathbf{q}_1\mathbf{q}_1\T + \lambda_2\mathbf{q}_2\mathbf{q}_2\T + \dots + \lambda_n\mathbf{q}_n\mathbf{q}_n\T.
$$ {#eq-spectral-decomposition}

Each $\mathbf{q}_i\mathbf{q}_i\T$ is the matrix of orthogonal projection onto the line through $\mathbf{q}_i$ ([[linear-algebra/least-squares#eq-proj-matrix]]): a symmetric matrix is a weighted sum of projections onto perpendicular directions, the weights being the eigenvalues. (The set of eigenvalues is called the **spectrum** of $A$, which gives the theorem its name.)

::: example A 2×2 symmetric matrix {#ex-spectral-2}
Orthogonally diagonalise $A = \begin{pmatrix}3&1\\1&3\end{pmatrix}$ and write down its spectral decomposition.
::: solution
$p(\lambda) = \lambda^2 - 6\lambda + 8 = (\lambda - 4)(\lambda - 2)$. For $\lambda = 4$, $A - 4I = \begin{pmatrix}-1&1\\1&-1\end{pmatrix}$ gives $(1,1)$; for $\lambda = 2$, $A - 2I = \begin{pmatrix}1&1\\1&1\end{pmatrix}$ gives $(1,-1)$. These are orthogonal, as [[#thm-orthogonal-eigenvectors]] promises; normalising,

$$
Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}, \qquad D = \begin{pmatrix}4&0\\0&2\end{pmatrix}, \qquad A = QDQ\T.
$$

The spectral decomposition is

$$
A = 4\cdot\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix} + 2\cdot\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix} = \begin{pmatrix}2&2\\2&2\end{pmatrix} + \begin{pmatrix}1&-1\\-1&1\end{pmatrix} = \begin{pmatrix}3&1\\1&3\end{pmatrix}.
$$

Geometrically, $A$ stretches by $4$ along the line $y = x$ and by $2$ along the perpendicular line $y = -x$.
:::
:::

::: widget transform2d
matrix: 3,1; 1,3
eigen: true
caption: The symmetric matrix of [[#ex-spectral-2]]. Its two eigenvector lines are perpendicular, so the unit square aligned with them would be mapped to a rectangle: $A$ is a pure stretch along perpendicular axes, by $4$ along $y = x$ and by $2$ along $y = -x$. Now make the matrix non-symmetric (change $a_{12}$ to $2$, say) and watch the eigenvector lines stop being perpendicular.
:::

::: example A repeated eigenvalue {#ex-spectral-3}
Orthogonally diagonalise $A = \begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}$.
::: solution
$A = I + J$, where $J$ is the all-ones matrix. Since $J(1,1,1) = 3(1,1,1)$ and $J\mathbf{x} = \mathbf{0}$ whenever $x_1 + x_2 + x_3 = 0$, the eigenvalues of $A$ are $4$ (eigenvector $(1,1,1)$) and $1$, whose eigenspace is the plane $x_1 + x_2 + x_3 = 0$, of dimension $2$. (Check: $\tr A = 6 = 4 + 1 + 1$.)

A basis of the plane is $\mathbf{x}_1 = (1,-1,0)$, $\mathbf{x}_2 = (1,0,-1)$, but these are not orthogonal. Gram–Schmidt within the eigenspace: $\mathbf{v}_2 = \mathbf{x}_2 - \frac{\mathbf{x}_2\cdot\mathbf{x}_1}{\mathbf{x}_1\cdot\mathbf{x}_1}\mathbf{x}_1 = (1,0,-1) - \frac12(1,-1,0) = \left(\frac12, \frac12, -1\right)$, which we scale to $(1, 1, -2)$. It is still an eigenvector for $1$, because it lies in the eigenspace. Both are automatically orthogonal to $(1,1,1)$. Normalising,

$$
Q = \begin{pmatrix}\frac{1}{\sqrt3}&\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt3}&-\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt3}&0&-\frac{2}{\sqrt6}\end{pmatrix}, \qquad D = \begin{pmatrix}4&0&0\\0&1&0\\0&0&1\end{pmatrix}.
$$

Inside the $2$-dimensional eigenspace *any* orthonormal basis would do: with a repeated eigenvalue, $Q$ is not unique.
:::
:::

::: warning Diagonalisable is not orthogonally diagonalisable
A non-symmetric matrix can be diagonalisable — $\begin{pmatrix}1&1\\0&2\end{pmatrix}$ has distinct eigenvalues $1$ and $2$ — but its eigenvectors $(1,0)$ and $(1,1)$ are not perpendicular, so no *orthogonal* $Q$ diagonalises it. And for a symmetric matrix with a repeated eigenvalue, the eigenvectors produced by elimination are generally not orthogonal within the eigenspace; remember to apply Gram–Schmidt there, as in [[#ex-spectral-3]], before normalising.
:::

::: remark Complex matrices
For complex matrices the role of the transpose is played by the **conjugate transpose** $A^* = \bar A\T$. A matrix with $A^* = A$ is **Hermitian**; the proof of [[#thm-real-eigenvalues]] shows that its eigenvalues are real, and the spectral theorem holds with a **unitary** $U$ ($U^*U = I$) in place of $Q$: $A = UDU^*$. More generally, a complex matrix is unitarily diagonalisable if and only if it is **normal**, $AA^* = A^*A$; this includes unitary and skew-Hermitian matrices. In quantum mechanics, observable quantities are Hermitian operators and their possible measured values are the eigenvalues. See Axler's *Linear Algebra Done Right* for the full complex and real spectral theorems.
:::

::: quiz
Which of these matrices are orthogonally diagonalisable over $\R$? (Select all that apply.)
- [x] $\begin{pmatrix}1&2\\2&1\end{pmatrix}$
- [ ] $\begin{pmatrix}1&2\\0&3\end{pmatrix}$
- [ ] $\begin{pmatrix}0&-1\\1&0\end{pmatrix}$
- [x] $\begin{pmatrix}5&0&0\\0&-1&0\\0&0&2\end{pmatrix}$
::: solution
By [[#thm-spectral]], exactly the symmetric ones: the first and the last (a diagonal matrix is already diagonal, with $Q = I$). The second is diagonalisable (distinct eigenvalues $1$ and $3$) but not orthogonally, since its eigenvectors $(1,0)$ and $(1,1)$ are not perpendicular. The rotation has no real eigenvalues at all.
:::
:::

## Quadratic forms

::: definition Quadratic form {#def-quadratic-form}
A **quadratic form** on $\R^n$ is a function $Q(\mathbf{x}) = \mathbf{x}\T A\mathbf{x} = \sum_{i,j}a_{ij}x_ix_j$, where $A$ is a symmetric $n\times n$ matrix, the **matrix of the form**.
:::

Every homogeneous quadratic polynomial is a quadratic form with a unique symmetric matrix: put the coefficient of $x_i^2$ on the diagonal and *split* the coefficient of each cross term $x_ix_j$ equally between the entries $a_{ij}$ and $a_{ji}$. For example

$$
5x_1^2 - 4x_1x_2 + 8x_2^2 = \begin{pmatrix}x_1&x_2\end{pmatrix}\begin{pmatrix}5&-2\\-2&8\end{pmatrix}\begin{pmatrix}x_1\\x_2\end{pmatrix}.
$$

Cross terms make a quadratic form hard to understand. The spectral theorem removes them.

::: theorem Principal axes theorem {#thm-principal-axes}
Let $A = QDQ\T$ be an orthogonal diagonalisation of the symmetric matrix $A$, with $D = \diag(\lambda_1, \dots, \lambda_n)$. The change of variables $\mathbf{x} = Q\mathbf{y}$ transforms the quadratic form into one without cross terms:

$$
\mathbf{x}\T A\mathbf{x} = \lambda_1y_1^2 + \lambda_2y_2^2 + \dots + \lambda_ny_n^2.
$$

The new coordinate axes — the columns of $Q$ — are called the **principal axes** of the form.
:::

::: proof
$\mathbf{x}\T A\mathbf{x} = (Q\mathbf{y})\T QDQ\T(Q\mathbf{y}) = \mathbf{y}\T(Q\T Q)D(Q\T Q)\mathbf{y} = \mathbf{y}\T D\mathbf{y} = \sum_i\lambda_iy_i^2$.
:::

Since $Q$ is orthogonal, the change of variables is a rotation (possibly combined with a reflection): it preserves lengths and angles, so the *shape* of the level sets $\mathbf{x}\T A\mathbf{x} = c$ is revealed undistorted. In two variables, $\lambda_1y_1^2 + \lambda_2y_2^2 = c$ (with $c > 0$) is an ellipse if both eigenvalues are positive and a hyperbola if they have opposite signs.

::: example The axes of an ellipse {#ex-ellipse}
Identify the curve $5x_1^2 - 4x_1x_2 + 8x_2^2 = 36$ and find its axes.
::: solution
The matrix $A = \begin{pmatrix}5&-2\\-2&8\end{pmatrix}$ has $\tr A = 13$ and $\det A = 36$, so $p(\lambda) = \lambda^2 - 13\lambda + 36 = (\lambda - 4)(\lambda - 9)$. For $\lambda = 4$: $A - 4I = \begin{pmatrix}1&-2\\-2&4\end{pmatrix}$, eigenvector $(2, 1)$. For $\lambda = 9$: $A - 9I = \begin{pmatrix}-4&-2\\-2&-1\end{pmatrix}$, eigenvector $(1, -2)$. With $Q = \frac{1}{\sqrt5}\begin{pmatrix}2&1\\1&-2\end{pmatrix}$ and $\mathbf{x} = Q\mathbf{y}$ the equation becomes

$$
4y_1^2 + 9y_2^2 = 36, \qquad\text{that is}\qquad \frac{y_1^2}{9} + \frac{y_2^2}{4} = 1.
$$

The curve is an ellipse with semi-axes $3$ along the direction $(2,1)$ and $2$ along the direction $(1, -2)$. The longer axis belongs to the smaller eigenvalue: where the form grows slowly, one must go further to reach the level $36$.
:::
:::

::: widget contour
f: 5x^2 - 4x*y + 8y^2
x: -4, 4
y: -4, 4
levels: 10
gradient: true
point: 1.2, 0.6
caption: Level curves of the quadratic form of [[#ex-ellipse]]. They are concentric ellipses whose axes point along the eigenvectors $(2,1)$ and $(1,-2)$ of the matrix. Drag the point: the gradient $2A\mathbf{x}$ is perpendicular to the level curve, and it points straight at or away from the origin exactly when $\mathbf{x}$ lies on a principal axis — that is, when $A\mathbf{x}$ is parallel to $\mathbf{x}$.
:::

### Definiteness

The signs of the eigenvalues determine the qualitative behaviour of a quadratic form.

::: definition Positive definite {#def-pos-def}
A symmetric matrix $A$ (or its quadratic form) is **positive definite** if $\mathbf{x}\T A\mathbf{x} > 0$ for every $\mathbf{x}\neq\mathbf{0}$, and **positive semidefinite** if $\mathbf{x}\T A\mathbf{x}\ge 0$ for every $\mathbf{x}$. It is **negative (semi)definite** if $-A$ is positive (semi)definite, and **indefinite** if the form takes both positive and negative values.
:::

::: theorem Tests for positive definiteness {#thm-pos-def}
For a real symmetric $n\times n$ matrix $A$ the following are equivalent:

1. $A$ is positive definite;
2. all eigenvalues of $A$ are positive;
3. $A = R\T R$ for some matrix $R$ with linearly independent columns;
4. all **leading principal minors** are positive: $\det A_k > 0$ for $k = 1, \dots, n$, where $A_k$ is the upper left $k\times k$ submatrix of $A$.
:::

::: proof
(1$\Leftrightarrow$2) By [[#thm-principal-axes]], $\mathbf{x}\T A\mathbf{x} = \sum\lambda_iy_i^2$ with $\mathbf{y} = Q\T\mathbf{x}$, and $\mathbf{y}$ runs through all non-zero vectors as $\mathbf{x}$ does. If every $\lambda_i > 0$, the sum is positive for $\mathbf{y}\neq\mathbf{0}$. Conversely, taking $\mathbf{x} = \mathbf{q}_i$ gives $\mathbf{x}\T A\mathbf{x} = \lambda_i$, which must be positive.

(2$\Rightarrow$3) Let $D^{1/2} = \diag(\sqrt{\lambda_1}, \dots, \sqrt{\lambda_n})$ and $R = D^{1/2}Q\T$. Then $R\T R = QD^{1/2}D^{1/2}Q\T = A$, and $R$ is invertible, so its columns are independent.

(3$\Rightarrow$1) $\mathbf{x}\T R\T R\mathbf{x} = \norm{R\mathbf{x}}^2\ge 0$, with equality only if $R\mathbf{x} = \mathbf{0}$, i.e. $\mathbf{x} = \mathbf{0}$, since the columns of $R$ are independent.

(1$\Rightarrow$4) For $\mathbf{x} = (\mathbf{x}', \mathbf{0})$ with $\mathbf{x}'\in\R^k$, $\mathbf{x}\T A\mathbf{x} = \mathbf{x}'^{\mathsf T}A_k\mathbf{x}'$; so $A_k$ is positive definite, its eigenvalues are positive by (1$\Rightarrow$2), and $\det A_k$, their product, is positive.

(4$\Rightarrow$1) Induction on $n$; for $n = 1$, $A = (a_{11})$ with $a_{11} > 0$. For $n\ge 2$ write $A = \begin{pmatrix}A_{n-1}&\mathbf{b}\\\mathbf{b}\T&c\end{pmatrix}$. The leading minors of $A_{n-1}$ are among those of $A$, so by induction $A_{n-1}$ is positive definite, in particular invertible. Put $s = c - \mathbf{b}\T A_{n-1}^{-1}\mathbf{b}$ and $E = \begin{pmatrix}I&A_{n-1}^{-1}\mathbf{b}\\\mathbf{0}\T&1\end{pmatrix}$. Multiplying out (using the symmetry of $A_{n-1}^{-1}$) verifies

$$
A = E\T\begin{pmatrix}A_{n-1}&\mathbf{0}\\\mathbf{0}\T&s\end{pmatrix}E.
$$

Taking determinants, $\det A = \det A_{n-1}\cdot s$ (since $\det E = 1$), so $s > 0$. Now for $\mathbf{x}\neq\mathbf{0}$ let $\mathbf{y} = E\mathbf{x} = (\mathbf{y}', y_n)\neq\mathbf{0}$ ($E$ is invertible); then $\mathbf{x}\T A\mathbf{x} = \mathbf{y}'^{\mathsf T}A_{n-1}\mathbf{y}' + sy_n^2 > 0$.
:::

Test 4 (**Sylvester's criterion**) is convenient for small matrices because it needs no eigenvalues. A closely related test: $A$ is positive definite if and only if Gaussian elimination without row interchanges produces only positive pivots, since the $k$-th pivot is $\det A_k/\det A_{k-1}$. Elimination then gives the **Cholesky factorisation** $A = R\T R$ with $R$ upper triangular — the standard way to solve systems with positive definite matrices, at half the cost of $LU$.

::: example Testing definiteness {#ex-definite}
Show that $A = \begin{pmatrix}2&-1&0\\-1&2&-1\\0&-1&2\end{pmatrix}$ is positive definite in three different ways.
::: solution
*Minors:* $\det A_1 = 2$, $\det A_2 = 4 - 1 = 3$, $\det A_3 = 2(4 - 1) - (-1)(-2 - 0) = 6 - 2 = 4$. All positive, so $A$ is positive definite by [[#thm-pos-def]]. The pivots are $2$, $\frac32$, $\frac43$ — the ratios $\frac21, \frac32, \frac43$ of successive minors.

*Eigenvalues:* they are $2 - \sqrt2$, $2$, $2 + \sqrt2$, all positive. (Check: their sum is $6 = \tr A$ and their product is $(4 - 2)\cdot 2 = 4 = \det A$.)

*Sum of squares:* the form is

$$
2x_1^2 + 2x_2^2 + 2x_3^2 - 2x_1x_2 - 2x_2x_3 = x_1^2 + (x_1 - x_2)^2 + (x_2 - x_3)^2 + x_3^2,
$$

which is positive unless $x_1 = x_1 - x_2 = x_2 - x_3 = x_3 = 0$, i.e. $\mathbf{x} = \mathbf{0}$. This matrix (the "second difference" matrix) appears whenever $-u''$ is discretised, for example in the heat equation ([[pde/heat-equation]]).
:::
:::

::: widget surface
f: a*x^2 + 2*b*x*y + c*y^2
x: -2, 2
y: -2, 2
sliders: a=1:-2:3:0.1; b=0:-2:2:0.1; c=1:-2:3:0.1
contours: true
caption: The graph of the quadratic form with matrix $\begin{pmatrix}a&b\\b&c\end{pmatrix}$. With $a > 0$ and $ac - b^2 > 0$ (both minors positive) it is an upward bowl: positive definite. Increase $b$ until $b^2 > ac$: the bowl turns into a saddle, the form is indefinite, and one eigenvalue has become negative. At $b^2 = ac$ exactly the surface is a trough — positive semidefinite, with a line of zeros along an eigenvector for the eigenvalue $0$.
:::

::: quiz
What kind of quadratic form is $Q(x, y) = x^2 + 6xy + y^2$?
- [ ] Positive definite
- [ ] Positive semidefinite but not definite
- [x] Indefinite
- [ ] Negative definite
::: solution
Its matrix is $\begin{pmatrix}1&3\\3&1\end{pmatrix}$, with $\det = 1 - 9 = -8 < 0$, so the eigenvalues ($4$ and $-2$) have opposite signs. For instance $Q(1,1) = 8 > 0$ but $Q(1,-1) = -4 < 0$. Note that both diagonal entries are positive: positive diagonal entries do not imply positive definiteness.
:::
:::

## Maximising a quadratic form

On the unit sphere the eigenvalues are exactly the extreme values of the form.

::: theorem Rayleigh's principle {#thm-rayleigh}
Let $A$ be symmetric with eigenvalues $\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n$ and corresponding orthonormal eigenvectors $\mathbf{q}_1, \dots, \mathbf{q}_n$. Then

$$
\max_{\norm{\mathbf{x}} = 1}\mathbf{x}\T A\mathbf{x} = \lambda_1, \qquad \min_{\norm{\mathbf{x}} = 1}\mathbf{x}\T A\mathbf{x} = \lambda_n,
$$

attained at $\mathbf{x} = \mathbf{q}_1$ and $\mathbf{x} = \mathbf{q}_n$ respectively. Equivalently, the **Rayleigh quotient** $\dfrac{\mathbf{x}\T A\mathbf{x}}{\mathbf{x}\T\mathbf{x}}$ ($\mathbf{x}\neq\mathbf{0}$) lies between $\lambda_n$ and $\lambda_1$.
:::

::: proof
Put $\mathbf{y} = Q\T\mathbf{x}$; since $Q$ is orthogonal, $\norm{\mathbf{y}} = \norm{\mathbf{x}} = 1$. By the principal axes theorem,

$$
\mathbf{x}\T A\mathbf{x} = \sum_i\lambda_iy_i^2\le\lambda_1\sum_iy_i^2 = \lambda_1,
$$

and similarly $\sum\lambda_iy_i^2\ge\lambda_n$. The value $\lambda_1$ is attained at $\mathbf{x} = \mathbf{q}_1$, since $\mathbf{q}_1\T A\mathbf{q}_1 = \lambda_1\mathbf{q}_1\T\mathbf{q}_1 = \lambda_1$, and $\lambda_n$ at $\mathbf{q}_n$.
:::

For example, on the unit circle $3x^2 + 2xy + 3y^2$ (the form of [[#ex-spectral-2]]) has maximum $4$, at $\pm\frac{1}{\sqrt2}(1,1)$, and minimum $2$, at $\pm\frac{1}{\sqrt2}(1,-1)$. Restricting $\mathbf{x}$ to be orthogonal to $\mathbf{q}_1$ gives $\lambda_2$ as the next maximum, and so on: the eigenvalues of a symmetric matrix are a sequence of constrained maxima. In [[multivariable/extrema]] the same conclusion is reached with Lagrange multipliers: the condition $\nabla(\mathbf{x}\T A\mathbf{x}) = \mu\nabla(\mathbf{x}\T\mathbf{x})$ reads $2A\mathbf{x} = 2\mu\mathbf{x}$, an eigenvalue equation.

::: application Principal component analysis
A data set of $N$ points in $\R^n$, centred so that their mean is $\mathbf{0}$, has **covariance matrix** $C = \frac{1}{N-1}\sum_k\mathbf{x}_k\mathbf{x}_k\T$, which is symmetric and positive semidefinite. The variance of the data in the direction of a unit vector $\mathbf{u}$ is $\mathbf{u}\T C\mathbf{u}$, so by [[#thm-rayleigh]] the direction of greatest variance — the **first principal component** — is the eigenvector of $C$ for the largest eigenvalue, the next is the eigenvector for the second eigenvalue, and so on. Projecting the data onto the first few principal components is the standard way of reducing the dimension of data while keeping as much of its variation as possible. In practice it is computed with the singular value decomposition ([[linear-algebra/svd]]).
:::

::: application The second derivative test
Near a critical point $\mathbf{a}$ of a smooth function $f\colon\R^n\to\R$, Taylor's theorem gives $f(\mathbf{a} + \mathbf{h})\approx f(\mathbf{a}) + \frac12\mathbf{h}\T H\mathbf{h}$, where $H$ is the symmetric **Hessian** matrix of second partial derivatives. If $H$ is positive definite, $f$ has a local minimum at $\mathbf{a}$; if negative definite, a local maximum; if indefinite, a saddle point. For $n = 2$ the test "$f_{xx} > 0$ and $f_{xx}f_{yy} - f_{xy}^2 > 0$" is exactly Sylvester's criterion. See [[multivariable/extrema]].
:::

::: history
Symmetric matrices first appeared as quadratic forms: in Euler's and Lagrange's mechanics (principal axes of rotation and inertia), and in the classification of conics and quadric surfaces by rotating to principal axes. Augustin-Louis Cauchy proved in 1829 that the characteristic roots of a symmetric matrix are real, and showed that the principal-axes transformation works in any number of dimensions. James Joseph Sylvester published the "law of inertia" in 1852: however a quadratic form is reduced to a sum of squares by an invertible change of variables, the numbers of positive and negative squares are always the same. The word *spectrum* was introduced by David Hilbert in the early 1900s for the eigenvalues of integral operators; that it also describes the spectral lines of atoms — which quantum mechanics showed in the 1920s to be eigenvalues of self-adjoint operators — was a happy coincidence.
:::

## Where this leads

The spectral theorem is the gateway to the singular value decomposition: applied to the symmetric positive semidefinite matrix $A\T A$, it produces orthonormal bases adapted to *any* matrix $A$ ([[linear-algebra/svd]]). Positive definite matrices are exactly the matrices of inner products on $\R^n$ ([[#exr-inner-product]]), and they underlie optimisation ([[multivariable/extrema]]), statistics (covariance matrices), and numerical methods such as Cholesky factorisation and conjugate gradients ([[numerical-analysis/iterative-methods]]). In infinite dimensions, the spectral theorem for self-adjoint operators underlies Fourier series and the Sturm–Liouville theory of [[pde/sturm-liouville]], where eigenfunctions of a differential operator form an orthonormal basis of a function space. The curvature of a surface is governed by a symmetric matrix too — the shape operator, whose eigenvalues are the principal curvatures ([[differential-geometry/surface-curvature]]).

::: summary
- For a symmetric matrix, $(A\mathbf{x})\cdot\mathbf{y} = \mathbf{x}\cdot(A\mathbf{y})$; hence its eigenvalues are real ([[#thm-real-eigenvalues]]) and eigenvectors for different eigenvalues are orthogonal ([[#thm-orthogonal-eigenvectors]]).
- Spectral theorem: $A$ is symmetric iff $A = QDQ\T$ with $Q$ orthogonal and $D$ diagonal ([[#thm-spectral]]); use Gram–Schmidt inside repeated eigenspaces.
- Spectral decomposition: $A = \sum\lambda_i\mathbf{q}_i\mathbf{q}_i\T$, a weighted sum of projections onto perpendicular lines.
- A quadratic form $\mathbf{x}\T A\mathbf{x}$ becomes $\sum\lambda_iy_i^2$ in the principal axes $\mathbf{x} = Q\mathbf{y}$ ([[#thm-principal-axes]]); conics are classified by the signs of the eigenvalues.
- Positive definite $\iff$ all eigenvalues positive $\iff A = R\T R$ with independent columns $\iff$ all leading principal minors positive ([[#thm-pos-def]]).
- On the unit sphere, $\mathbf{x}\T A\mathbf{x}$ ranges exactly between the smallest and largest eigenvalues, attained at the eigenvectors ([[#thm-rayleigh]]).
:::

## Exercises

::: exercise Orthogonal diagonalisation {level=1}
Orthogonally diagonalise $A = \begin{pmatrix}1&2\\2&1\end{pmatrix}$ and write its spectral decomposition.
::: solution
$p(\lambda) = \lambda^2 - 2\lambda - 3 = (\lambda - 3)(\lambda + 1)$; eigenvectors $(1,1)$ for $3$ and $(1,-1)$ for $-1$. So $Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$, $D = \diag(3, -1)$, and

$$
A = 3\cdot\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix} - 1\cdot\frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}.
$$
:::
:::

::: exercise The matrix of a form {level=1}
Write $Q(\mathbf{x}) = 3x_1^2 + 2x_2^2 - x_3^2 + 4x_1x_2 - 6x_2x_3$ as $\mathbf{x}\T A\mathbf{x}$ with $A$ symmetric, and compute $Q(1, 1, 1)$ both ways.
::: solution
Split each cross coefficient in half: $A = \begin{pmatrix}3&2&0\\2&2&-3\\0&-3&-1\end{pmatrix}$. Directly, $Q(1,1,1) = 3 + 2 - 1 + 4 - 6 = 2$; and $A(1,1,1) = (5, 1, -4)$, so $\mathbf{x}\T A\mathbf{x} = 5 + 1 - 4 = 2$.
:::
:::

::: exercise Smallest value on the circle {level=1 check="1"}
Show that $2x^2 + 4xy + 5y^2$ is positive definite and find its minimum value on the unit circle $x^2 + y^2 = 1$.
::: solution
The matrix $\begin{pmatrix}2&2\\2&5\end{pmatrix}$ has leading minors $2 > 0$ and $10 - 4 = 6 > 0$, so it is positive definite. Its eigenvalues satisfy $\lambda^2 - 7\lambda + 6 = 0$, so they are $1$ and $6$. By [[#thm-rayleigh]] the minimum on the unit circle is $1$, attained at $\pm\frac{1}{\sqrt5}(2,-1)$ (the eigenvector for $1$).
:::
:::

::: exercise A hyperbola {level=2 check="1"}
Identify the curve $x^2 + 4xy + y^2 = 3$, find its principal axes, and find the smallest distance from the origin to a point of the curve.
::: solution
The matrix $\begin{pmatrix}1&2\\2&1\end{pmatrix}$ has eigenvalues $3$ (eigenvector $(1,1)$) and $-1$ (eigenvector $(1,-1)$). In the coordinates $\mathbf{x} = Q\mathbf{y}$ with $Q = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ the curve is $3y_1^2 - y_2^2 = 3$, i.e. $y_1^2 - \frac{y_2^2}{3} = 1$: a hyperbola with principal axes along $y = x$ and $y = -x$. Since $Q$ preserves lengths, the distance from the origin is $\sqrt{y_1^2 + y_2^2} = \sqrt{1 + \frac43y_2^2}$, smallest when $y_2 = 0$: the minimum distance is $1$, at the vertices $\pm\frac{1}{\sqrt2}(1,1)$.
:::
:::

::: exercise A family of matrices {level=2 check="1/sqrt(2)"}
For which real $k$ is $\begin{pmatrix}1&k&0\\k&1&k\\0&k&1\end{pmatrix}$ positive definite? Give the largest $c$ such that it is positive definite for all $\abs{k} < c$.
::: solution
The leading minors are $1$, $1 - k^2$ and $\det A = 1\cdot(1 - k^2) - k\cdot(k - 0) = 1 - 2k^2$. All are positive iff $k^2 < \frac12$ (which also gives $1 - k^2 > 0$). So $A$ is positive definite exactly for $\abs{k} < \frac{1}{\sqrt2}$, and $c = \frac{1}{\sqrt2}$.
:::
:::

::: exercise A matrix square root {level=2}
Find a symmetric positive definite matrix $B$ with $B^2 = \begin{pmatrix}5&4\\4&5\end{pmatrix}$.
::: hint
Take square roots of the eigenvalues in the spectral decomposition.
:::
::: solution
$A = \begin{pmatrix}5&4\\4&5\end{pmatrix}$ has eigenvalues $9$ (eigenvector $(1,1)$) and $1$ (eigenvector $(1,-1)$), so $A = 9P_1 + 1P_2$ with $P_1 = \frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$, $P_2 = \frac12\begin{pmatrix}1&-1\\-1&1\end{pmatrix}$. Since $P_1^2 = P_1$, $P_2^2 = P_2$ and $P_1P_2 = P_2P_1 = O$, the matrix $B = 3P_1 + 1P_2 = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ satisfies $B^2 = 9P_1 + P_2 = A$. It is symmetric with eigenvalues $3, 1 > 0$. Check: $\begin{pmatrix}2&1\\1&2\end{pmatrix}^2 = \begin{pmatrix}5&4\\4&5\end{pmatrix}$.
:::
:::

::: exercise Largest value of a form {level=2 check="3"}
Find the maximum of $x_1^2 + x_2^2 + x_3^2 + 2x_1x_2 + 2x_1x_3 + 2x_2x_3$ subject to $x_1^2 + x_2^2 + x_3^2 = 1$, and a point where it is attained.
::: solution
The form is $(x_1 + x_2 + x_3)^2$, with matrix $J$, the all-ones $3\times 3$ matrix. $J$ has eigenvalue $3$ with eigenvector $(1,1,1)$ and eigenvalue $0$ on the plane $x_1 + x_2 + x_3 = 0$. By [[#thm-rayleigh]] the maximum is $3$, attained at $\pm\frac{1}{\sqrt3}(1,1,1)$; the minimum is $0$. (Cauchy–Schwarz gives the same: $(x_1 + x_2 + x_3)^2\le 3(x_1^2 + x_2^2 + x_3^2)$.)
:::
:::

::: exercise Symmetric and nilpotent {level=3}
Prove that if $A$ is a real symmetric matrix with $A^k = O$ for some $k\ge 1$, then $A = O$.
::: solution
Write $A = QDQ\T$. Then $A^k = QD^kQ\T = O$ forces $D^k = O$, so each eigenvalue satisfies $\lambda_i^k = 0$, i.e. $\lambda_i = 0$. Hence $D = O$ and $A = QOQ\T = O$. (Without the spectral theorem, for $k = 2$: $\norm{A\mathbf{x}}^2 = \mathbf{x}\T A\T A\mathbf{x} = \mathbf{x}\T A^2\mathbf{x} = 0$ for every $\mathbf{x}$.) The symmetry is essential: $\begin{pmatrix}0&1\\0&0\end{pmatrix}$ squares to $O$.
:::
:::

::: exercise Gram matrices {level=3}
Let $A$ be any real $m\times n$ matrix. Prove that $A\T A$ is positive semidefinite, that it is positive definite if and only if the columns of $A$ are independent, and that all its eigenvalues are $\ge 0$.
::: solution
$A\T A$ is symmetric, and $\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2\ge 0$, so it is positive semidefinite. It is positive definite iff $A\mathbf{x}\neq\mathbf{0}$ for every $\mathbf{x}\neq\mathbf{0}$, i.e. iff $\operatorname{Nul}(A) = \{\mathbf{0}\}$, i.e. iff the columns are independent. If $A\T A\mathbf{v} = \lambda\mathbf{v}$ with $\norm{\mathbf{v}} = 1$, then $\lambda = \mathbf{v}\T A\T A\mathbf{v} = \norm{A\mathbf{v}}^2\ge 0$. The square roots of these eigenvalues are the singular values of $A$ ([[linear-algebra/svd]]).
:::
:::

::: exercise Inner products are positive definite matrices {level=3 #exr-inner-product}
Prove that if $A$ is a symmetric positive definite $n\times n$ matrix, then $\inner{\mathbf{x}}{\mathbf{y}}_A = \mathbf{x}\T A\mathbf{y}$ is an inner product on $\R^n$, and that every inner product on $\R^n$ is of this form for exactly one such $A$.
::: solution
Linearity in $\mathbf{x}$ is clear; symmetry: $\mathbf{y}\T A\mathbf{x} = (\mathbf{y}\T A\mathbf{x})\T = \mathbf{x}\T A\T\mathbf{y} = \mathbf{x}\T A\mathbf{y}$; positivity is the definition of positive definiteness. Conversely, given an inner product, put $a_{ij} = \inner{\mathbf{e}_i}{\mathbf{e}_j}$. Then $A$ is symmetric, and by bilinearity $\inner{\mathbf{x}}{\mathbf{y}} = \sum_{i,j}x_iy_j\inner{\mathbf{e}_i}{\mathbf{e}_j} = \mathbf{x}\T A\mathbf{y}$; positivity of the inner product says $\mathbf{x}\T A\mathbf{x} > 0$ for $\mathbf{x}\neq\mathbf{0}$, so $A$ is positive definite. $A$ is unique because its entries are forced: $a_{ij} = \mathbf{e}_i\T A\mathbf{e}_j = \inner{\mathbf{e}_i}{\mathbf{e}_j}$.
:::
:::
