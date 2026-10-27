A $4096\times4096$ weight matrix holds almost seventeen million numbers. Does it really need all of them? Fine-tuning a language model changes every weight a little, yet in practice the change can often be captured by a matrix built from a few thousand numbers; and a cloud of a million embedding vectors in $768$ dimensions can often be described, to good accuracy, by a few dozen directions. Both observations are statements about **rank**, and the tool that measures and exploits rank is the **singular value decomposition**.

This chapter develops the two decompositions that machine learning uses most. The eigendecomposition describes a square matrix by the directions it only stretches; for symmetric matrices — covariance matrices, Hessians, Gram matrices — those directions are perpendicular and the picture is especially clean. The singular value decomposition extends the idea to every matrix, rectangular or not, and yields the best low-rank approximation of a matrix, the result behind principal component analysis, model compression and low-rank adapters such as LoRA. The Maths Atlas lessons on [eigenvalues](/learn/maths/lesson.php?c=linear-algebra&l=eigenvalues), the [spectral theorem](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem) and the [SVD](/learn/maths/lesson.php?c=linear-algebra&l=svd) give the full theory; here the emphasis is on what the decompositions say about data and weights.

## Eigenvalues and eigenvectors {#sec-eigen}

::: definition Eigenvalue and eigenvector {#def-eigen}
Let $A\in\R^{n\times n}$. A nonzero vector $\mathbf{v}$ is an **eigenvector** of $A$ with **eigenvalue** $\lambda$ if

$$
A\mathbf{v} = \lambda\mathbf{v}.
$$

The eigenvalues are the roots of the **characteristic polynomial** $\det(A - \lambda I)$, a polynomial of degree $n$. If $A$ has $n$ linearly independent eigenvectors, collected as the columns of $V$, then $A = V\Lambda V^{-1}$ with $\Lambda = \diag(\lambda_1, \dots, \lambda_n)$: an **eigendecomposition**.
:::

An eigenvector is a direction that the map does not turn: it is only stretched by the factor $\lambda$ (and reversed if $\lambda < 0$). In the basis of eigenvectors the matrix acts coordinate by coordinate, which makes powers easy: $A^k = V\Lambda^kV^{-1}$, so repeated application of $A$ multiplies the $i$-th eigen-coordinate by $\lambda_i^k$. Components along eigenvalues with $\lvert\lambda\rvert > 1$ blow up and those with $\lvert\lambda\rvert < 1$ die out — the linear-algebra core of exploding and vanishing signals in deep and recurrent networks.

::: example Eigenvalues of a symmetric $2\times2$ matrix {#ex-eigen22}
Find the eigenvalues and eigenvectors of $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ and compute $A^{10}(1, 0)^\top$ without multiplying ten matrices.
::: solution
$\det(A - \lambda I) = (2-\lambda)^2 - 1 = (\lambda - 3)(\lambda - 1)$, so $\lambda_1 = 3$ and $\lambda_2 = 1$. For $\lambda = 3$: $(A - 3I)\mathbf{v} = \mathbf{0}$ gives $-v_1 + v_2 = 0$, so $\mathbf{v}_1 = (1, 1)/\sqrt2$. For $\lambda = 1$: $v_1 + v_2 = 0$, so $\mathbf{v}_2 = (1, -1)/\sqrt2$. The two are perpendicular.

Write $(1, 0) = \frac1{\sqrt2}\mathbf{v}_1 + \frac1{\sqrt2}\mathbf{v}_2$. Then

$$
A^{10}\begin{pmatrix}1\\0\end{pmatrix} = \frac{3^{10}}{\sqrt2}\mathbf{v}_1 + \frac{1}{\sqrt2}\mathbf{v}_2 = \frac12\begin{pmatrix}3^{10} + 1\\3^{10} - 1\end{pmatrix} = \begin{pmatrix}29525\\29524\end{pmatrix}.
$$

After ten steps the vector points almost exactly along $\mathbf{v}_1$, the direction of the largest eigenvalue.
:::
:::

::: widget transform2d
matrix: 2,1; 1,2
eigen: true
caption: The map of [[#ex-eigen22]]. The eigenvector lines are drawn: vectors along $(1,1)$ are stretched by $3$, vectors along $(1,-1)$ are left alone, and every other vector is turned towards the $(1,1)$ direction. Try a shear such as $\begin{pmatrix}1&1\\0&1\end{pmatrix}$, which has only one eigenvector direction, or a rotation, which has none in the real plane.
:::

Not every matrix is so well behaved. A rotation of the plane by $90^\circ$ has no real eigenvectors at all (its eigenvalues are $\pm i$), and the shear $\begin{pmatrix}1&1\\0&1\end{pmatrix}$ has the single eigenvalue $1$ with only one eigenvector direction, so it has no eigendecomposition. Symmetric matrices never cause such trouble.

### Symmetric matrices {#sec-symmetric}

::: theorem Spectral theorem {#thm-spectral}
If $A\in\R^{n\times n}$ is symmetric ($A^\top = A$), then all its eigenvalues are real and there is an orthogonal matrix $Q$ (with $Q^\top Q = I$) whose columns are eigenvectors of $A$:

$$
A = Q\Lambda Q^\top = \sum_{i=1}^n\lambda_i\mathbf{q}_i\mathbf{q}_i^\top.
$$ {#eq-spectral}
:::

The proof is in the [Maths Atlas](/learn/maths/lesson.php?c=linear-algebra&l=spectral-theorem). One part is short enough to give here: eigenvectors of a symmetric matrix for different eigenvalues are perpendicular, because if $A\mathbf{u} = \lambda\mathbf{u}$ and $A\mathbf{v} = \mu\mathbf{v}$ then $\lambda\,\mathbf{u}\cdot\mathbf{v} = (A\mathbf{u})\cdot\mathbf{v} = \mathbf{u}\cdot(A\mathbf{v}) = \mu\,\mathbf{u}\cdot\mathbf{v}$, and $\lambda\ne\mu$ forces $\mathbf{u}\cdot\mathbf{v} = 0$.

Equation [[#eq-spectral]] writes a symmetric matrix as a sum of rank-one projections onto perpendicular directions, each weighted by its eigenvalue. Symmetric matrices are everywhere in machine learning: the covariance of a data set, the Gram matrix $XX^\top$ of pairwise dot products, the Hessian of a loss (the matrix of second derivatives, [[math-for-ml/optimisation]]). Most of them have a further property.

::: definition Positive semidefinite {#def-psd}
A symmetric matrix $A$ is **positive semidefinite** (PSD) if $\mathbf{x}^\top A\mathbf{x}\ge0$ for all $\mathbf{x}$, and **positive definite** if $\mathbf{x}^\top A\mathbf{x} > 0$ for all $\mathbf{x}\ne\mathbf{0}$. Equivalently, by [[#thm-spectral]], all eigenvalues are $\ge0$ (respectively $> 0$).
:::

::: proposition Covariance and Gram matrices are PSD {#prop-psd}
For any $X\in\R^{N\times d}$ the matrices $X^\top X$ and $XX^\top$ are positive semidefinite. In particular the covariance matrix $C = \frac1N\tilde X^\top\tilde X$ of a centred data matrix $\tilde X$ is PSD, and $\mathbf{u}^\top C\mathbf{u}$ is the variance of the data projected onto a unit vector $\mathbf{u}$.
:::

::: proof
$\mathbf{x}^\top X^\top X\mathbf{x} = (X\mathbf{x})\cdot(X\mathbf{x}) = \lVert X\mathbf{x}\rVert^2\ge0$, and the same argument with $X^\top$ handles $XX^\top$. For the covariance, the projection of the $n$-th centred data point $\tilde{\mathbf{x}}_n$ onto $\mathbf{u}$ is the number $\tilde{\mathbf{x}}_n\cdot\mathbf{u}$, the $n$-th entry of $\tilde X\mathbf{u}$. These numbers have mean $0$, so their variance is $\frac1N\sum_n(\tilde{\mathbf{x}}_n\cdot\mathbf{u})^2 = \frac1N\lVert\tilde X\mathbf{u}\rVert^2 = \mathbf{u}^\top C\mathbf{u}$.
:::

The quadratic form $\mathbf{x}^\top A\mathbf{x}$ has a clean extremal description, which is the mathematical heart of principal component analysis.

::: proposition Rayleigh quotient {#prop-rayleigh}
Let $A$ be symmetric with eigenvalues $\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n$ and orthonormal eigenvectors $\mathbf{q}_1, \dots, \mathbf{q}_n$. Then

$$
\max_{\lVert\mathbf{u}\rVert = 1}\mathbf{u}^\top A\mathbf{u} = \lambda_1,
$$

attained at $\mathbf{u} = \mathbf{q}_1$; and the maximum over unit vectors perpendicular to $\mathbf{q}_1, \dots, \mathbf{q}_{k-1}$ is $\lambda_k$, attained at $\mathbf{q}_k$.
:::

::: proof
Expand $\mathbf{u} = \sum_ic_i\mathbf{q}_i$; since $Q$ is orthogonal, $\lVert\mathbf{u}\rVert^2 = \sum_ic_i^2 = 1$. By [[#eq-spectral]], $\mathbf{u}^\top A\mathbf{u} = \sum_i\lambda_ic_i^2$, a weighted average of the eigenvalues with weights $c_i^2$ summing to $1$. It is at most $\lambda_1$, with equality when all the weight is on $i = 1$ (or on eigenvalues equal to $\lambda_1$). If $\mathbf{u}$ is perpendicular to $\mathbf{q}_1, \dots, \mathbf{q}_{k-1}$ then $c_1 = \dots = c_{k-1} = 0$ and the average is at most $\lambda_k$.
:::

### Power iteration {#sec-power}

[[#ex-eigen22]] already contains an algorithm: multiply any starting vector by $A$ again and again, and it lines up with the eigenvector of the largest eigenvalue.

::: algorithm Power iteration {#alg-power}
Input: a symmetric matrix $A$ whose largest eigenvalue in absolute value, $\lambda_1$, is strictly larger than the others in absolute value; a starting vector $\mathbf{v}_0$ with $\mathbf{v}_0\cdot\mathbf{q}_1\ne0$.

1. For $k = 1, 2, \dots$: set $\mathbf{w} = A\mathbf{v}_{k-1}$ and $\mathbf{v}_k = \mathbf{w}/\lVert\mathbf{w}\rVert$.
2. Estimate the eigenvalue by the Rayleigh quotient $\lambda^{(k)} = \mathbf{v}_k^\top A\mathbf{v}_k$.
3. Stop when $\lambda^{(k)}$ stops changing.

The component of $\mathbf{v}_k$ along each other eigenvector, relative to the component along $\mathbf{q}_1$, shrinks by the factor $\lvert\lambda_i/\lambda_1\rvert$ per step.
:::

Each step costs one matrix–vector product, so power iteration works for enormous matrices that are never stored explicitly — only the product $A\mathbf{v}$ is needed. That is how the largest eigenvalue of the Hessian of a neural-network loss is estimated in practice: a Hessian–vector product can be computed by automatic differentiation without forming the Hessian. Here is the algorithm in plain Python on the covariance matrix that appears in [[#ex-pca]] below:

```python
import math

def power_iteration(A, steps):
    # A: (n, n) symmetric, as a list of rows; returns (eigenvalue, eigenvector)
    n = len(A)
    v = [1.0] * n                                    # (n,) starting vector
    for k in range(1, steps + 1):
        w = [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]  # A v
        norm = math.sqrt(sum(x * x for x in w))
        v = [x / norm for x in w]                    # normalise to length 1
        Av = [sum(A[i][j] * v[j] for j in range(n)) for i in range(n)]
        lam = sum(v[i] * Av[i] for i in range(n))    # Rayleigh quotient v.Av
        print(k, round(lam, 6), [round(x, 6) for x in v])
    return lam, v

C = [[2.0, 2.4],
     [2.4, 3.2]]                                     # covariance matrix (2, 2)
power_iteration(C, 4)
```

```text
1 5.073817 [0.617822, 0.786318]
2 5.073863 [0.615472, 0.788159]
3 5.073863 [0.615414, 0.788204]
4 5.073863 [0.615412, 0.788205]
```

The eigenvalue ratio here is $\lambda_2/\lambda_1 = 0.126/5.074 = 0.025$, so each step gains well over one correct digit in the vector.

## The singular value decomposition {#sec-svd}

Eigenvectors require a square matrix and may not exist; a weight matrix $W\in\R^{d_{\text{out}}\times d_{\text{in}}}$ is usually rectangular. The singular value decomposition asks a different question: which perpendicular input directions are mapped to perpendicular output directions?

::: definition Singular value decomposition {#def-svd}
A **singular value decomposition** of $A\in\R^{m\times n}$ is a factorisation

$$
A = U\Sigma V^\top = \sum_{i=1}^r\sigma_i\mathbf{u}_i\mathbf{v}_i^\top,
$$ {#eq-svd}

where $U\in\R^{m\times m}$ and $V\in\R^{n\times n}$ are orthogonal, $\Sigma\in\R^{m\times n}$ is zero except for the **singular values** $\sigma_1\ge\sigma_2\ge\dots\ge\sigma_r > 0$ on its diagonal, and $r$ is the rank of $A$. The columns $\mathbf{v}_i$ and $\mathbf{u}_i$ are the right and left **singular vectors**: $A\mathbf{v}_i = \sigma_i\mathbf{u}_i$.
:::

Read from right to left, [[#eq-svd]] says that *every* linear map is a rotation (or reflection) $V^\top$, followed by a stretch of each coordinate axis by $\sigma_i$ (and a change of dimension), followed by another rotation $U$. The unit sphere is mapped to an ellipsoid whose semi-axes have lengths $\sigma_i$ and point along $\mathbf{u}_i$.

::: theorem Existence of the SVD {#thm-svd}
Every real matrix has a singular value decomposition. The $\sigma_i^2$ are the nonzero eigenvalues of $A^\top A$ (and of $AA^\top$), the $\mathbf{v}_i$ are corresponding orthonormal eigenvectors of $A^\top A$, and $\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$.
:::

::: proof
$A^\top A$ is symmetric and PSD ([[#prop-psd]]), so by [[#thm-spectral]] it has orthonormal eigenvectors $\mathbf{v}_1, \dots, \mathbf{v}_n$ with eigenvalues $\mu_1\ge\dots\ge\mu_n\ge0$. Let $r$ be the number of positive $\mu_i$, put $\sigma_i = \sqrt{\mu_i}$ and $\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$ for $i\le r$. These are orthonormal: $\mathbf{u}_i\cdot\mathbf{u}_j = \mathbf{v}_i^\top A^\top A\mathbf{v}_j/(\sigma_i\sigma_j) = \mu_j\,\mathbf{v}_i\cdot\mathbf{v}_j/(\sigma_i\sigma_j)$, which is $1$ if $i = j$ and $0$ otherwise. For $i > r$, $\lVert A\mathbf{v}_i\rVert^2 = \mu_i = 0$, so $A\mathbf{v}_i = \mathbf{0}$. Hence $A\mathbf{v}_i = \sigma_i\mathbf{u}_i$ for $i\le r$ and $A\mathbf{v}_i = \mathbf{0}$ otherwise, which says $AV = U\Sigma$ once $\mathbf{u}_1, \dots, \mathbf{u}_r$ are extended to an orthonormal basis of $\R^m$. Multiply on the right by $V^\top$. The rank is $r$ because the image of $A$ is spanned by $\mathbf{u}_1, \dots, \mathbf{u}_r$.
:::

::: example An SVD by hand {#ex-svd}
Find the SVD of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$.
::: solution
$A^\top A = \begin{pmatrix}3&4\\0&5\end{pmatrix}\begin{pmatrix}3&0\\4&5\end{pmatrix} = \begin{pmatrix}25&20\\20&25\end{pmatrix}$, with eigenvalues $45$ and $5$ (trace $50$, determinant $625 - 400 = 225$) and eigenvectors $\mathbf{v}_1 = (1, 1)/\sqrt2$, $\mathbf{v}_2 = (-1, 1)/\sqrt2$. So $\sigma_1 = \sqrt{45} = 3\sqrt5\approx6.708$ and $\sigma_2 = \sqrt5\approx2.236$. Then

$$
\mathbf{u}_1 = \frac{A\mathbf{v}_1}{\sigma_1} = \frac{(3, 9)/\sqrt2}{3\sqrt5} = \frac{(1, 3)}{\sqrt{10}},\qquad \mathbf{u}_2 = \frac{A\mathbf{v}_2}{\sigma_2} = \frac{(-3, 1)/\sqrt2}{\sqrt5} = \frac{(-3, 1)}{\sqrt{10}}.
$$

Check: $\sigma_1\sigma_2 = 3\sqrt5\cdot\sqrt5 = 15 = \lvert\det A\rvert$, as it must be, since rotations do not change area.
:::
:::

::: widget svd
matrix: 3,0; 4,5
caption: The SVD of [[#ex-svd]] as three steps: the unit circle is rotated by $V^\top$, stretched into an ellipse with semi-axes $\sigma_1 = 6.71$ and $\sigma_2 = 2.24$, and rotated by $U$. Edit the matrix and watch the singular values; make the two rows proportional and the ellipse collapses to a segment ($\sigma_2 = 0$, rank one).
:::

::: warning Eigenvalues are not singular values
For a symmetric PSD matrix the two coincide, but in general they differ, and for non-symmetric matrices they can tell very different stories. The matrix $\begin{pmatrix}0&100\\0&0\end{pmatrix}$ has both eigenvalues equal to $0$ — its powers vanish from $A^2$ on — yet its largest singular value is $100$: it can stretch a vector by a factor of a hundred in one step. The size of $A\mathbf{x}$ is governed by singular values ($\lVert A\mathbf{x}\rVert\le\sigma_1\lVert\mathbf{x}\rVert$); the long-run behaviour of $A^k$ is governed by eigenvalues. Also note that singular vectors are determined only up to sign (and up to rotation within a repeated singular value), so two libraries can return different but equally correct $U$ and $V$.
:::

The largest singular value is the **spectral norm** $\lVert A\rVert_2 = \max_{\lVert\mathbf{x}\rVert = 1}\lVert A\mathbf{x}\rVert = \sigma_1$, the most a map can stretch any vector. The **Frobenius norm** $\lVert A\rVert_F = \sqrt{\sum_{ij}A_{ij}^2}$ measures the total size of the entries; since orthogonal matrices do not change it, $\lVert A\rVert_F^2 = \lVert\Sigma\rVert_F^2 = \sum_i\sigma_i^2$. The ratio $\kappa = \sigma_1/\sigma_r$ of a square invertible matrix is its **condition number**: it measures how much the map distorts shapes, and [[math-for-ml/optimisation]] shows that it governs how fast gradient descent converges on a quadratic.

## The best low-rank approximation {#sec-eckart-young}

Truncating the sum [[#eq-svd]] after $k$ terms gives a matrix of rank $k$,

$$
A_k = \sum_{i=1}^k\sigma_i\mathbf{u}_i\mathbf{v}_i^\top.
$$ {#eq-truncated}

It keeps the $k$ directions along which $A$ stretches most and discards the rest. Nothing of rank $k$ does better.

::: theorem Eckart–Young {#thm-eckart-young}
Let $A$ have singular values $\sigma_1\ge\sigma_2\ge\dots$ and let $A_k$ be the truncation [[#eq-truncated]]. For every matrix $B$ of rank at most $k$,

$$
\lVert A - B\rVert_2\ge\lVert A - A_k\rVert_2 = \sigma_{k+1}\qquad\text{and}\qquad\lVert A - B\rVert_F\ge\lVert A - A_k\rVert_F = \Big(\sum_{i>k}\sigma_i^2\Big)^{1/2}.
$$
:::

::: proof
The errors of the truncation follow from $A - A_k = \sum_{i>k}\sigma_i\mathbf{u}_i\mathbf{v}_i^\top$, which is itself in SVD form with singular values $\sigma_{k+1}, \sigma_{k+2}, \dots$; its spectral norm is the largest, $\sigma_{k+1}$, and its Frobenius norm is the root of the sum of squares.

Optimality in the spectral norm: let $B$ have rank at most $k$. Its null space has dimension at least $n - k$, and the span of $\mathbf{v}_1, \dots, \mathbf{v}_{k+1}$ has dimension $k + 1$; two subspaces of $\R^n$ whose dimensions add up to more than $n$ share a nonzero vector, so there is a unit vector $\mathbf{w} = \sum_{i\le k+1}c_i\mathbf{v}_i$ with $B\mathbf{w} = \mathbf{0}$ and $\sum_ic_i^2 = 1$. Then

$$
\lVert(A - B)\mathbf{w}\rVert^2 = \lVert A\mathbf{w}\rVert^2 = \Big\lVert\sum_{i\le k+1}c_i\sigma_i\mathbf{u}_i\Big\rVert^2 = \sum_{i\le k+1}c_i^2\sigma_i^2\ge\sigma_{k+1}^2,
$$

so $\lVert A - B\rVert_2\ge\sigma_{k+1}$. The Frobenius case uses the same idea applied to each singular value in turn (Mirsky, 1960); we omit it.
:::

The theorem turns "how compressible is this matrix?" into "how fast do its singular values decay?". The fraction of the squared Frobenius norm kept by $A_k$ is $\sum_{i\le k}\sigma_i^2/\sum_i\sigma_i^2$, and if a few singular values dominate, a low-rank approximation loses little.

::: example The best rank-one approximation {#ex-rank-one}
Using [[#ex-svd]], find the best rank-one approximation of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$ and its error.
::: solution
$A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1^\top = 3\sqrt5\cdot\frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}\cdot\frac{1}{\sqrt2}(1, 1) = \frac{3\sqrt5}{\sqrt{20}}\begin{pmatrix}1&1\\3&3\end{pmatrix} = \begin{pmatrix}1.5&1.5\\4.5&4.5\end{pmatrix}$.

The error is $A - A_1 = \begin{pmatrix}1.5&-1.5\\-0.5&0.5\end{pmatrix}$, with $\lVert A - A_1\rVert_F^2 = 2.25 + 2.25 + 0.25 + 0.25 = 5 = \sigma_2^2$, as the theorem predicts. Since $\lVert A\rVert_F^2 = 9 + 16 + 25 = 50 = \sigma_1^2 + \sigma_2^2$, the rank-one matrix keeps $90\%$ of the squared norm.
:::
:::

## Principal component analysis {#sec-pca}

Principal component analysis (PCA) applies the Rayleigh quotient to a data set: find the directions along which the data vary most.

::: definition Principal components {#def-pca}
Let $\mathbf{x}_1, \dots, \mathbf{x}_N\in\R^d$ have mean $\bar{\mathbf{x}}$, let $\tilde X\in\R^{N\times d}$ hold the centred points $\mathbf{x}_n - \bar{\mathbf{x}}$ as rows and let $C = \frac1N\tilde X^\top\tilde X$ be the covariance matrix with eigenvalues $\lambda_1\ge\dots\ge\lambda_d\ge0$ and orthonormal eigenvectors $\mathbf{q}_1, \dots, \mathbf{q}_d$. The $\mathbf{q}_i$ are the **principal directions**, the projections $\tilde{\mathbf{x}}_n\cdot\mathbf{q}_i$ the **principal components** (scores), and $\lambda_i/\sum_j\lambda_j$ the **fraction of variance explained** by component $i$.
:::

By [[#prop-psd]] the variance of the data along a unit vector $\mathbf{u}$ is $\mathbf{u}^\top C\mathbf{u}$, and by [[#prop-rayleigh]] it is largest along $\mathbf{q}_1$, with value $\lambda_1$; the second principal direction is the best direction perpendicular to the first, and so on. Equivalently, if $\tilde X = U\Sigma V^\top$ then $C = V(\Sigma^\top\Sigma/N)V^\top$, so the principal directions are the right singular vectors of the centred data and $\lambda_i = \sigma_i^2/N$. Libraries compute PCA through this SVD, which is more accurate than forming $C$. By [[#thm-eckart-young]], projecting onto the first $k$ principal directions gives the rank-$k$ approximation of the centred data with the smallest total squared error: PCA is both "maximise the variance kept" and "minimise the reconstruction error".

::: example PCA of five points {#ex-pca}
Find the first principal direction of the points $(1, 2)$, $(2, 3)$, $(3, 3)$, $(4, 5)$, $(5, 7)$ and the fraction of variance it explains.
::: solution
The mean is $(3, 4)$ and the centred points are $(-2,-2)$, $(-1,-1)$, $(0,-1)$, $(1,1)$, $(2,3)$. Dividing sums by $N = 5$:

$$
C = \frac15\begin{pmatrix}4+1+0+1+4 & 4+1+0+1+6\\ 4+1+0+1+6 & 4+1+1+1+9\end{pmatrix} = \begin{pmatrix}2&2.4\\2.4&3.2\end{pmatrix}.
$$

Its trace is $5.2$ and determinant $6.4 - 5.76 = 0.64$, so $\lambda = 2.6\pm\sqrt{2.6^2 - 0.64} = 2.6\pm2.474$: $\lambda_1 = 5.074$, $\lambda_2 = 0.126$. The eigenvector for $\lambda_1$ is proportional to $(2.4, \lambda_1 - 2) = (2.4, 3.074)$, that is $\mathbf{q}_1 = (0.615, 0.788)$ after normalising — as the power iteration above found. The first component explains $5.074/5.2 = 97.6\%$ of the variance: the points lie close to a line through $(3, 4)$ in the direction $\mathbf{q}_1$, and their one-dimensional scores are $-2.81, -1.40, -0.79, 1.40, 3.60$.
:::
:::

::: warning Centre the data first
PCA finds directions of largest variance *around the mean*. Running an SVD on uncentred data finds instead the direction of largest second moment, which for data far from the origin is mostly the direction of the mean itself — a "first component" that just points at the data cloud. Scale matters too: PCA on features measured in different units is dominated by the feature with the largest numbers, so features are often standardised first. And PCA is linear: it finds the best flat subspace, which may be a poor summary of data that lie on a curved surface.
:::

::: application Visualising embeddings
Language models represent tokens, sentences and internal states as vectors of hundreds or thousands of dimensions. Projecting them onto their first two or three principal components is the simplest way to look at them, and it often reveals structure — clusters of related words, a direction that tracks a feature such as sentiment or tense. Interpretability research uses such linear projections, and their limitations, routinely; nonlinear maps (t-SNE, UMAP) show local neighbourhoods better but distort global distances.
:::

::: quiz
A centred data set in $\R^{100}$ has covariance eigenvalues $50, 30, 10, 4$ and then $96$ eigenvalues of $0.0625$ each. What fraction of the variance do the first two principal components explain?
- [ ] $50\%$
- [x] $80\%$
- [ ] $84\%$
- [ ] $2\%$, because two directions out of $100$ is $2\%$
::: solution
The total variance is the sum of the eigenvalues (the trace of $C$): $50 + 30 + 10 + 4 + 96\cdot0.0625 = 94 + 6 = 100$. The first two components carry $50 + 30 = 80$ of it, that is $80\%$. Variance is distributed by eigenvalue, not by counting dimensions, so a handful of directions can carry most of it.
:::
:::

## Low rank in language models {#sec-lowrank}

Storing a rank-$r$ matrix $W\in\R^{m\times n}$ as a product $W = BA$ with $B\in\R^{m\times r}$ and $A\in\R^{r\times n}$ costs $r(m + n)$ numbers instead of $mn$, and multiplying it by a vector costs $2r(m + n)$ FLOPs instead of $2mn$. When $r$ is much smaller than $m$ and $n$ this is a large saving, which machine learning exploits in two ways.

**Compressing trained weights.** Replace a trained $W$ by its truncated SVD $W_k$. By [[#thm-eckart-young]] this is the best possible rank-$k$ replacement in the Frobenius and spectral norms, though not necessarily for the network's loss. Early work on compressing networks (Denil et al., 2013; Denton et al., 2014) found that many weight matrices could be factorised this way with little loss of accuracy. In large language models the singular values of the pretrained weight matrices are often found to decay too slowly for aggressive truncation without retraining; the low-rank idea has instead proved most useful for the *updates* to weights.

**Low-rank adaptation.** Fine-tuning adjusts a pretrained matrix $W_0$ to $W_0 + \Delta W$. Hu et al. (2021) proposed **LoRA**: freeze $W_0$ and learn the update in factored form.

::: definition Low-rank adapter (LoRA) {#def-lora}
For a frozen weight $W_0\in\R^{d_{\text{out}}\times d_{\text{in}}}$ and a rank $r\ll\min(d_{\text{in}}, d_{\text{out}})$, a **LoRA** layer computes

$$
\mathbf{y} = W_0\mathbf{x} + \frac{\alpha}{r}BA\mathbf{x},\qquad B\in\R^{d_{\text{out}}\times r},\ A\in\R^{r\times d_{\text{in}}},
$$

training only $A$ and $B$ ($r(d_{\text{in}} + d_{\text{out}})$ parameters). $B$ is initialised to zero, so training starts exactly at the pretrained model; $\alpha$ is a fixed scale.
:::

The method rests on an **empirical** observation, not a theorem: the weight changes needed to adapt a large pretrained model to a task appear to have low "intrinsic dimension" (Aghajanyan, Zettlemoyer and Gupta, 2020), and Hu et al. reported that ranks as small as $r = 1$ to $8$ matched full fine-tuning on the tasks they studied. Whether a low rank suffices depends on how far the task is from what the model already does; LoRA can fall short of full fine-tuning when large amounts of new knowledge must be learned.

::: example A LoRA adapter's size {#ex-lora}
Apply LoRA with $r = 8$ to one $4096\times4096$ projection. How many trainable parameters does the adapter have, as a fraction of the full matrix? After training, how can the adapter be removed from the inference cost entirely?
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 8\cdot(4096 + 4096) = 65{,}536$ parameters, against $4096^2 = 16{,}777{,}216$ for the full matrix: $0.39\%$. The update $\frac{\alpha}{r}BA$ is an ordinary $4096\times4096$ matrix of rank at most $8$, so after training it can be added into the weight, $W = W_0 + \frac{\alpha}{r}BA$, and the model runs at exactly its original cost. Keeping $A$ and $B$ separate instead allows many adapters for different tasks to share one copy of $W_0$.
:::
:::

The same arithmetic explains other designs in the atlas: multi-query and grouped-query attention share key and value projections across heads, and some models factor the embedding matrix through a narrow bottleneck. In each case a large matrix is replaced by a product of thin ones, trading expressiveness for memory and compute.

::: history
Eigenvalues arose from mechanics and quadratic forms: Cauchy proved in 1829 that the eigenvalues of a symmetric matrix are real. The singular value decomposition was discovered independently by Eugenio Beltrami (1873) and Camille Jordan (1874), and rediscovered by Sylvester (1889). Erhard Schmidt (1907) proved the best-approximation property for integral operators, and Carl Eckart and Gale Young (1936) proved it for matrices, motivated by factor analysis in psychology; Leon Mirsky (1960) extended it to every unitarily invariant norm. Principal component analysis goes back to Karl Pearson's *On lines and planes of closest fit* (1901) and Harold Hotelling (1933). Richard von Mises and Hilda Pollaczek-Geiringer described power iteration in 1929, and Gene Golub and William Kahan (1965) gave the stable method for computing the SVD on which today's libraries are built. In deep learning, Hu et al. introduced LoRA in 2021, and it became one of the most widely used methods of parameter-efficient fine-tuning.
:::

::: summary
- An eigenvector is a direction a square matrix only stretches; powers $A^k$ act on eigen-coordinates by $\lambda_i^k$. Symmetric matrices have real eigenvalues and an orthonormal eigenbasis, $A = Q\Lambda Q^\top$.
- Covariance, Gram and Hessian matrices are symmetric; the first two are always positive semidefinite. The maximum of $\mathbf{u}^\top A\mathbf{u}$ over unit vectors is $\lambda_1$, and power iteration finds it with matrix–vector products alone.
- Every matrix has an SVD $A = U\Sigma V^\top$: rotate, stretch by the singular values, rotate. $\sigma_1$ is the spectral norm, $\sum\sigma_i^2$ the squared Frobenius norm.
- By Eckart–Young, truncating the SVD gives the best rank-$k$ approximation, with error $\sigma_{k+1}$ (spectral) or $\big(\sum_{i>k}\sigma_i^2\big)^{1/2}$ (Frobenius).
- PCA is the SVD of centred data: principal directions maximise variance and minimise reconstruction error. LoRA learns weight updates as a product of two thin matrices, on the empirical finding that such updates have low intrinsic rank.
:::

## Exercises

::: exercise Eigenvalues by hand {level=1 check="5"}
Find the eigenvalues of $\begin{pmatrix}4&1\\2&3\end{pmatrix}$ and an eigenvector for the larger one. What is the larger eigenvalue?
::: solution
$\det\begin{pmatrix}4-\lambda&1\\2&3-\lambda\end{pmatrix} = \lambda^2 - 7\lambda + 10 = (\lambda - 5)(\lambda - 2)$. For $\lambda = 5$: $-v_1 + v_2 = 0$, so $(1, 1)$ is an eigenvector; check $(4 + 1, 2 + 3) = 5(1, 1)$. The larger eigenvalue is $5$. (The eigenvector for $2$ is $(1, -2)$, which is not perpendicular to $(1,1)$ — the matrix is not symmetric.)
:::
:::

::: exercise Zero eigenvalues, nonzero singular value {level=1 check="2"}
Find the eigenvalues and the singular values of $N = \begin{pmatrix}0&2\\0&0\end{pmatrix}$. What is its largest singular value?
::: solution
$N$ is triangular with zeros on the diagonal, so both eigenvalues are $0$. $N^\top N = \begin{pmatrix}0&0\\0&4\end{pmatrix}$ has eigenvalues $4$ and $0$, so the singular values are $2$ and $0$. Indeed $N(0, 1)^\top = (2, 0)^\top$ doubles the length of a unit vector, although $N^2 = 0$.
:::
:::

::: exercise LoRA on a rectangular matrix {level=1 check="241664"}
How many trainable parameters does a LoRA adapter of rank $r = 16$ add to a projection $W_0\in\R^{11008\times4096}$?
::: solution
$r(d_{\text{in}} + d_{\text{out}}) = 16\cdot(4096 + 11008) = 241{,}664$, about $0.54\%$ of the $45{,}088{,}768$ entries of $W_0$.
:::
:::

::: exercise When does factorising pay? {level=1 check="2048"}
Storing a rank-$r$ matrix $W\in\R^{m\times n}$ as $BA$ costs $r(m + n)$ numbers. Below which rank $r$ does this save memory for a $4096\times4096$ matrix?
::: solution
The factorisation is smaller when $r(m + n) < mn$, that is $r < mn/(m + n) = 4096^2/8192 = 2048$. Below rank $2048$ the factored form is smaller; at rank $8$ it is $256$ times smaller.
:::
:::

::: exercise Truncation error {level=2 check="sqrt(5)"}
A matrix has singular values $10, 5, 2, 1$. What is the Frobenius error of its best rank-two approximation, and what fraction of the squared Frobenius norm does that approximation keep?
::: solution
By [[#thm-eckart-young]] the error is $\sqrt{2^2 + 1^2} = \sqrt5\approx2.236$ (and the spectral error is $\sigma_3 = 2$). The squared norm is $100 + 25 + 4 + 1 = 130$, of which the approximation keeps $125/130\approx96.2\%$.
:::
:::

::: exercise PCA of a symmetric cloud {level=2 check="0.6"}
Find the principal directions of the six points $(2, 0)$, $(0, 2)$, $(-2, 0)$, $(0, -2)$, $(1, 1)$, $(-1, -1)$ and the fraction of variance explained by the first component.
::: solution
The mean is $(0, 0)$. With $N = 6$: $C_{11} = (4 + 0 + 4 + 0 + 1 + 1)/6 = 10/6$, $C_{22} = 10/6$ and $C_{12} = (0 + 0 + 0 + 0 + 1 + 1)/6 = 2/6$. For a matrix $\begin{pmatrix}a&b\\b&a\end{pmatrix}$ the eigenvectors are $(1, 1)/\sqrt2$ and $(1, -1)/\sqrt2$ with eigenvalues $a\pm b$: here $12/6 = 2$ and $8/6 = 4/3$. The first principal direction is the diagonal $(1, 1)/\sqrt2$, which the last two points favour, and it explains $2/(2 + 4/3) = 0.6$ of the variance.
:::
:::

::: exercise The trace and determinant {level=2}
Let $A$ be symmetric with eigenvalues $\lambda_1, \dots, \lambda_n$. Using [[#thm-spectral]], show that $\tr A = \sum_i\lambda_i$ and $\det A = \prod_i\lambda_i$, and deduce that the total variance $\sum_iC_{ii}$ of a data set equals the sum of the covariance eigenvalues. (You may use $\tr(XY) = \tr(YX)$.)
::: solution
$\tr A = \tr(Q\Lambda Q^\top) = \tr(\Lambda Q^\top Q) = \tr\Lambda = \sum_i\lambda_i$, and $\det A = \det Q\det\Lambda\det Q^\top = \det\Lambda\,(\det Q)^2 = \prod_i\lambda_i$ since $(\det Q)^2 = 1$. For a covariance matrix $C_{ii}$ is the variance of feature $i$, so the sum of the feature variances equals $\sum_i\lambda_i$: rotating to principal directions redistributes the total variance among the components without changing it. This is why "fraction of variance explained" divides by the trace.
:::
:::

::: exercise Speed of power iteration {level=3 check="132"}
In [[#alg-power]], suppose the ratio of the two largest eigenvalues is $\lvert\lambda_2/\lambda_1\rvert = 0.9$ and the starting vector has equal components along $\mathbf{q}_1$ and $\mathbf{q}_2$. Show that after $k$ steps the ratio of the $\mathbf{q}_2$-component to the $\mathbf{q}_1$-component is at most $0.9^k$ (ignoring the other eigenvectors), and find the smallest $k$ for which it is below $10^{-6}$.
::: solution
Normalisation rescales both components by the same factor, so it does not change their ratio. Without it, $A^k\mathbf{v}_0 = c_1\lambda_1^k\mathbf{q}_1 + c_2\lambda_2^k\mathbf{q}_2 + \dots$, and with $c_1 = c_2$ the ratio of the second component to the first is $\lvert\lambda_2/\lambda_1\rvert^k = 0.9^k$. We need $0.9^k < 10^{-6}$, that is $k > \ln10^{-6}/\ln0.9 = 131.1$, so $k = 132$. Compare the ratio $0.025$ of the example in [[#sec-power]], which needs only $4$ steps: power iteration is fast when the top eigenvalue is well separated and slow when it is not.
:::
:::

::: exercise Rank-one approximation in code {level=3}
Write a plain-Python function that computes the best rank-one approximation of a matrix $A\in\R^{m\times n}$ by power iteration on $A^\top A$, and test it on the matrix of [[#ex-svd]]. Why does iterating with $A^\top A$ give $\mathbf{v}_1$, and how are $\sigma_1$ and $\mathbf{u}_1$ recovered?
::: solution
```python
import math

def matvec(A, v):
    return [sum(a * x for a, x in zip(row, v)) for row in A]

def rank_one(A, steps=50):
    # best rank-1 approximation of A (m, n) via power iteration on A^T A (n, n)
    At = [list(c) for c in zip(*A)]                  # (n, m)
    v = [1.0] * len(At)                              # (n,)
    for _ in range(steps):
        w = matvec(At, matvec(A, v))                 # A^T A v
        nw = math.sqrt(sum(x * x for x in w))
        v = [x / nw for x in w]
    Av = matvec(A, v)                                # (m,) equals sigma_1 u_1
    sigma = math.sqrt(sum(x * x for x in Av))
    u = [x / sigma for x in Av]
    A1 = [[sigma * ui * vj for vj in v] for ui in u] # (m, n)
    return sigma, A1

sigma, A1 = rank_one([[3.0, 0.0], [4.0, 5.0]])
print(round(sigma, 6), [[round(x, 6) for x in row] for row in A1])
```

```text
6.708204 [[1.5, 1.5], [4.5, 4.5]]
```

By [[#thm-svd]] the eigenvectors of the symmetric PSD matrix $A^\top A$ are the right singular vectors, with eigenvalues $\sigma_i^2$, so power iteration converges to $\mathbf{v}_1$ (at rate $(\sigma_2/\sigma_1)^2$ per step). Then $A\mathbf{v}_1 = \sigma_1\mathbf{u}_1$, so $\sigma_1 = \lVert A\mathbf{v}_1\rVert$ and $\mathbf{u}_1 = A\mathbf{v}_1/\sigma_1$. The output matches [[#ex-rank-one]]. Note that the code multiplies by $A$ and $A^\top$ in turn and never forms $A^\top A$.
:::
:::

::: exercise The spectral norm bounds every stretch {level=3}
Show from the SVD that $\lVert A\mathbf{x}\rVert\le\sigma_1\lVert\mathbf{x}\rVert$ for all $\mathbf{x}$, with equality at $\mathbf{x} = \mathbf{v}_1$, and that $\lVert AB\rVert_2\le\lVert A\rVert_2\lVert B\rVert_2$. A network applies $L = 24$ linear layers, each with spectral norm $1.1$, and no other operations. Bound the factor by which it can stretch an input, and explain the connection with exploding signals.
::: solution
Write $\mathbf{x} = \sum_ic_i\mathbf{v}_i$ with $\sum_ic_i^2 = \lVert\mathbf{x}\rVert^2$. Then $A\mathbf{x} = \sum_ic_i\sigma_i\mathbf{u}_i$ and $\lVert A\mathbf{x}\rVert^2 = \sum_ic_i^2\sigma_i^2\le\sigma_1^2\sum_ic_i^2$, with equality when all the weight is on $\mathbf{v}_1$. Hence $\lVert AB\mathbf{x}\rVert\le\lVert A\rVert_2\lVert B\mathbf{x}\rVert\le\lVert A\rVert_2\lVert B\rVert_2\lVert\mathbf{x}\rVert$. For the network the stretch is at most $1.1^{24}\approx9.85$; with norm $1.5$ it would be up to $1.5^{24}\approx16{,}834$, and with $0.9$ the signal could shrink by $0.9^{24}\approx0.08$. Products of many matrices amplify small deviations from norm $1$ geometrically, which is why initialisation schemes, normalisation layers and residual connections aim to keep the per-layer gain near one.
:::
:::
