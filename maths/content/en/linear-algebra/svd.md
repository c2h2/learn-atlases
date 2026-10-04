Eigenvalues tell us everything about a diagonalisable square matrix, but many matrices are not diagonalisable, and rectangular matrices — a data table with $1000$ rows and $20$ columns, say — have no eigenvalues at all. Yet every matrix has a beautifully simple geometric description. Apply $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$ to the unit circle: the image is an ellipse, with longest semi-axis $3\sqrt5\approx 6.71$ and shortest $\sqrt5\approx 2.24$. Two perpendicular unit vectors $\mathbf{v}_1, \mathbf{v}_2$ are carried to the two axes of the ellipse, $A\mathbf{v}_1 = 3\sqrt5\,\mathbf{u}_1$ and $A\mathbf{v}_2 = \sqrt5\,\mathbf{u}_2$, where $\mathbf{u}_1, \mathbf{u}_2$ are again perpendicular unit vectors.

This holds for every matrix in every dimension: there are orthonormal bases $\mathbf{v}_1, \dots, \mathbf{v}_n$ of the input space and $\mathbf{u}_1, \dots, \mathbf{u}_m$ of the output space with $A\mathbf{v}_i = \sigma_i\mathbf{u}_i$. The numbers $\sigma_i\ge 0$ are the **singular values**, and in matrix form the statement is the **singular value decomposition** $A = U\Sigma V\T$: every linear map is a rotation, followed by a stretch along perpendicular axes, followed by another rotation. The SVD is perhaps the most useful factorisation in applied linear algebra. It reveals the rank and the four fundamental subspaces, measures the size of a matrix and its sensitivity to errors, gives the best low-rank approximations used in data compression and statistics, and solves every least-squares problem through the pseudoinverse.

## Singular values

For any real $m\times n$ matrix $A$, the $n\times n$ matrix $A\T A$ is symmetric and positive semidefinite: $\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2\ge 0$. By the spectral theorem ([[linear-algebra/spectral-theorem#thm-spectral]]) it has an orthonormal basis of eigenvectors, and its eigenvalues are non-negative.

::: definition Singular values {#def-singular-values}
Let $A$ be a real $m\times n$ matrix, and let $\lambda_1\ge\lambda_2\ge\dots\ge\lambda_n\ge 0$ be the eigenvalues of $A\T A$. The **singular values** of $A$ are $\sigma_i = \sqrt{\lambda_i}$, so that $\sigma_1\ge\sigma_2\ge\dots\ge\sigma_n\ge 0$.
:::

If $\mathbf{v}_i$ is a unit eigenvector of $A\T A$ for $\lambda_i$, then $\norm{A\mathbf{v}_i}^2 = \mathbf{v}_i\T A\T A\mathbf{v}_i = \lambda_i$: **the singular value $\sigma_i$ is the length of $A\mathbf{v}_i$**. More is true.

::: lemma Images of the eigenvectors {#lem-svd}
Let $\mathbf{v}_1, \dots, \mathbf{v}_n$ be an orthonormal basis of $\R^n$ consisting of eigenvectors of $A\T A$, ordered so that the eigenvalues decrease, and suppose $\sigma_1, \dots, \sigma_r > 0$ while $\sigma_{r+1} = \dots = \sigma_n = 0$. Then $A\mathbf{v}_1, \dots, A\mathbf{v}_n$ are mutually orthogonal, $A\mathbf{v}_i = \mathbf{0}$ for $i > r$, and

$$
\mathbf{u}_i = \frac{1}{\sigma_i}A\mathbf{v}_i \qquad (i = 1, \dots, r)
$$

form an orthonormal basis of $\operatorname{Col}(A)$. In particular $r = \rank A$: the rank is the number of non-zero singular values.
:::

::: proof
For $i\neq j$, $(A\mathbf{v}_i)\cdot(A\mathbf{v}_j) = \mathbf{v}_i\T A\T A\mathbf{v}_j = \lambda_j\,\mathbf{v}_i\cdot\mathbf{v}_j = 0$, and $\norm{A\mathbf{v}_i}^2 = \lambda_i = \sigma_i^2$. Hence $A\mathbf{v}_i = \mathbf{0}$ when $\sigma_i = 0$, and $\mathbf{u}_1, \dots, \mathbf{u}_r$ are orthonormal. Every vector of $\operatorname{Col}(A)$ is $A\mathbf{x}$ with $\mathbf{x} = \sum c_i\mathbf{v}_i$, so $A\mathbf{x} = \sum_{i\le r}c_i\sigma_i\mathbf{u}_i$: the $\mathbf{u}_i$ span $\operatorname{Col}(A)$, and being orthonormal they are independent ([[linear-algebra/inner-products#thm-orthogonal-coords]]). So they form a basis and $\rank A = \dim\operatorname{Col}(A) = r$.
:::

## The singular value decomposition

::: theorem Singular value decomposition {#thm-svd}
Let $A$ be a real $m\times n$ matrix of rank $r$, with non-zero singular values $\sigma_1\ge\dots\ge\sigma_r > 0$. Then

$$
A = U\Sigma V\T,
$$

where $U$ is an $m\times m$ orthogonal matrix, $V$ is an $n\times n$ orthogonal matrix, and $\Sigma$ is the $m\times n$ matrix whose first $r$ diagonal entries are $\sigma_1, \dots, \sigma_r$ and whose other entries are all $0$.
:::

::: proof
Take $\mathbf{v}_1, \dots, \mathbf{v}_n$ and $\mathbf{u}_1, \dots, \mathbf{u}_r$ as in [[#lem-svd]], and extend $\mathbf{u}_1, \dots, \mathbf{u}_r$ to an orthonormal basis $\mathbf{u}_1, \dots, \mathbf{u}_m$ of $\R^m$ (extend to a basis and apply Gram–Schmidt, [[linear-algebra/inner-products#thm-gram-schmidt]]). Let $V$ and $U$ be the orthogonal matrices with these columns. Then

$$
AV = \begin{pmatrix}A\mathbf{v}_1 & \cdots & A\mathbf{v}_r & A\mathbf{v}_{r+1} & \cdots & A\mathbf{v}_n\end{pmatrix} = \begin{pmatrix}\sigma_1\mathbf{u}_1 & \cdots & \sigma_r\mathbf{u}_r & \mathbf{0} & \cdots & \mathbf{0}\end{pmatrix} = U\Sigma,
$$

because column $j$ of $U\Sigma$ is $\sigma_j\mathbf{u}_j$ for $j\le r$ and $\mathbf{0}$ otherwise. Multiplying on the right by $V^{-1} = V\T$ gives $A = U\Sigma V\T$.
:::

The columns $\mathbf{u}_i$ of $U$ are the **left singular vectors** and the columns $\mathbf{v}_i$ of $V$ the **right singular vectors**. The singular values are uniquely determined by $A$ (they are the square roots of the eigenvalues of $A\T A$), but the singular vectors are not: one can change the signs of $\mathbf{v}_i$ and $\mathbf{u}_i$ together, and choose freely within an eigenspace when singular values repeat. Since $A\T = V\Sigma\T U\T$, the matrix $A\T$ has the same non-zero singular values, and $AA\T = U\Sigma\Sigma\T U\T$ shows that the $\mathbf{u}_i$ are eigenvectors of $AA\T$.

Discarding the columns that multiply zeros gives two compact forms that are used constantly:

$$
A = U_r\Sigma_rV_r\T = \sigma_1\mathbf{u}_1\mathbf{v}_1\T + \sigma_2\mathbf{u}_2\mathbf{v}_2\T + \dots + \sigma_r\mathbf{u}_r\mathbf{v}_r\T,
$$ {#eq-svd-sum}

where $U_r$ and $V_r$ consist of the first $r$ columns and $\Sigma_r = \diag(\sigma_1, \dots, \sigma_r)$. The second form writes $A$ as a sum of $r$ matrices of rank one, in decreasing order of importance.

::: intuition Rotate, stretch, rotate
Read $A\mathbf{x} = U\Sigma V\T\mathbf{x}$ from right to left. First $V\T$, an orthogonal matrix, rotates (or reflects) $\mathbf{x}$, turning the right singular vectors $\mathbf{v}_i$ into the coordinate axes. Then $\Sigma$ stretches the $i$-th axis by $\sigma_i$ (and, if $m\neq n$, adds or deletes coordinates). Finally $U$ rotates the axes onto the left singular vectors $\mathbf{u}_i$. So the unit sphere in $\R^n$ is mapped to an ellipsoid in $\operatorname{Col}(A)$ whose semi-axes are $\sigma_1\mathbf{u}_1, \dots, \sigma_r\mathbf{u}_r$ — flattened completely in the directions where $\sigma_i = 0$.
:::

::: widget svd
matrix: 3,0; 4,5
caption: The SVD of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$ from [[#ex-svd-2x2]], one factor at a time. $V\T$ rotates the circle so that the right singular vectors lie along the axes, $\Sigma$ stretches by $\sigma_1 = 3\sqrt5$ and $\sigma_2 = \sqrt5$, and $U$ rotates the result into place. Edit the entries and watch the ellipse — its semi-axes are always the singular values, while the eigenvalues of $A$ (here $3$ and $5$) are something else entirely.
:::

::: example SVD of a 2×2 matrix {#ex-svd-2x2}
Find the SVD of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$.
::: solution
$A\T A = \begin{pmatrix}3&4\\0&5\end{pmatrix}\begin{pmatrix}3&0\\4&5\end{pmatrix} = \begin{pmatrix}25&20\\20&25\end{pmatrix}$, with eigenvalues $45$ and $5$ and unit eigenvectors $\mathbf{v}_1 = \frac{1}{\sqrt2}(1, 1)$, $\mathbf{v}_2 = \frac{1}{\sqrt2}(1,-1)$. So $\sigma_1 = \sqrt{45} = 3\sqrt5$ and $\sigma_2 = \sqrt5$. Next,

$$
\mathbf{u}_1 = \frac{1}{\sigma_1}A\mathbf{v}_1 = \frac{1}{3\sqrt5}\cdot\frac{1}{\sqrt2}\begin{pmatrix}3\\9\end{pmatrix} = \frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}, \qquad \mathbf{u}_2 = \frac{1}{\sigma_2}A\mathbf{v}_2 = \frac{1}{\sqrt5}\cdot\frac{1}{\sqrt2}\begin{pmatrix}3\\-1\end{pmatrix} = \frac{1}{\sqrt{10}}\begin{pmatrix}3\\-1\end{pmatrix}.
$$

These are orthogonal, as the lemma promises. Therefore

$$
A = U\Sigma V\T = \frac{1}{\sqrt{10}}\begin{pmatrix}1&3\\3&-1\end{pmatrix}\begin{pmatrix}3\sqrt5&0\\0&\sqrt5\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

*Checks:* $\sigma_1\sigma_2 = 15 = \abs{\det A}$ (the area scaling factor), and $\sigma_1^2 + \sigma_2^2 = 50 = 9 + 0 + 16 + 25$, the sum of the squares of the entries; both identities hold in general ([[#exr-det-sv]] and [[#thm-norms]]).
:::
:::

::: example SVD of a rectangular matrix {#ex-svd-rect}
Find the SVD of $A = \begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$.
::: solution
Here $A\T A$ is $3\times 3$ but $AA\T = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ is only $2\times 2$, and it has the same non-zero eigenvalues ($AA\T = U\Sigma\Sigma\T U\T$). So work with $AA\T$: its eigenvalues are $3$ and $1$, with unit eigenvectors $\mathbf{u}_1 = \frac{1}{\sqrt2}(1,1)$, $\mathbf{u}_2 = \frac{1}{\sqrt2}(1,-1)$. Thus $\sigma_1 = \sqrt3$, $\sigma_2 = 1$, and the right singular vectors follow from $\mathbf{v}_i = \frac{1}{\sigma_i}A\T\mathbf{u}_i$ (apply $A\T$ to $A\mathbf{v}_i = \sigma_i\mathbf{u}_i$):

$$
\mathbf{v}_1 = \frac{1}{\sqrt3}\cdot\frac{1}{\sqrt2}\begin{pmatrix}1\\2\\1\end{pmatrix} = \frac{1}{\sqrt6}\begin{pmatrix}1\\2\\1\end{pmatrix}, \qquad \mathbf{v}_2 = \frac{1}{\sqrt2}\begin{pmatrix}1\\0\\-1\end{pmatrix}.
$$

The third right singular vector spans $\operatorname{Nul}(A)$: solving $x_1 + x_2 = 0$, $x_2 + x_3 = 0$ gives $\mathbf{v}_3 = \frac{1}{\sqrt3}(1,-1,1)$. So

$$
A = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}\begin{pmatrix}\sqrt3&0&0\\0&1&0\end{pmatrix}\begin{pmatrix}\frac{1}{\sqrt6}&\frac{2}{\sqrt6}&\frac{1}{\sqrt6}\\[5pt] \frac{1}{\sqrt2}&0&-\frac{1}{\sqrt2}\\[5pt] \frac{1}{\sqrt3}&-\frac{1}{\sqrt3}&\frac{1}{\sqrt3}\end{pmatrix}.
$$

The unit sphere in $\R^3$ is flattened along $\mathbf{v}_3$ and mapped onto the whole ellipse in $\R^2$ with semi-axes $\sqrt3\,\mathbf{u}_1$ and $\mathbf{u}_2$ (including its interior).
:::
:::

::: warning Do not compute U and V independently
It is tempting to take the $\mathbf{v}_i$ as unit eigenvectors of $A\T A$ and, separately, the $\mathbf{u}_i$ as unit eigenvectors of $AA\T$. Each eigenvector is only determined up to sign (and up to rotation within a repeated eigenspace), so the two choices need not match, and then $U\Sigma V\T\neq A$. In [[#ex-svd-2x2]], the vector $-\frac{1}{\sqrt{10}}(3,-1)$ is just as good a unit eigenvector of $AA\T$ as $\mathbf{u}_2$, but using it would produce $\begin{pmatrix}0&3\\5&4\end{pmatrix}$ instead of $A$. Compute one set from the other — $\mathbf{u}_i = A\mathbf{v}_i/\sigma_i$ or $\mathbf{v}_i = A\T\mathbf{u}_i/\sigma_i$ — as in the examples, and check the result by multiplying out.
:::

The SVD exhibits orthonormal bases for all four fundamental subspaces at once — a refined form of the rank theorem.

::: corollary The four subspaces from the SVD {#cor-four-subspaces}
If $A = U\Sigma V\T$ has rank $r$, then $\mathbf{v}_1, \dots, \mathbf{v}_r$ is an orthonormal basis of $\operatorname{Row}(A)$, $\mathbf{v}_{r+1}, \dots, \mathbf{v}_n$ of $\operatorname{Nul}(A)$, $\mathbf{u}_1, \dots, \mathbf{u}_r$ of $\operatorname{Col}(A)$, and $\mathbf{u}_{r+1}, \dots, \mathbf{u}_m$ of $\operatorname{Nul}(A\T)$.
:::

::: proof
By [[#lem-svd]], $\mathbf{u}_1, \dots, \mathbf{u}_r$ is a basis of $\operatorname{Col}(A)$ and $A\mathbf{v}_i = \mathbf{0}$ for $i > r$. The $n - r$ vectors $\mathbf{v}_{r+1}, \dots, \mathbf{v}_n$ are independent and lie in $\operatorname{Nul}(A)$, which has dimension $n - r$; so they are a basis. Their orthogonal complement, spanned by $\mathbf{v}_1, \dots, \mathbf{v}_r$, is $\operatorname{Nul}(A)^\perp = \operatorname{Row}(A)$ ([[linear-algebra/inner-products#thm-fundamental]] and [[linear-algebra/inner-products#cor-complement]]). Similarly $\mathbf{u}_{r+1}, \dots, \mathbf{u}_m$ span $\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$.
:::

So $A$ maps the orthonormal basis $\mathbf{v}_1, \dots, \mathbf{v}_r$ of the row space to the orthogonal basis $\sigma_1\mathbf{u}_1, \dots, \sigma_r\mathbf{u}_r$ of the column space, and kills the null space: between the row space and the column space, every matrix is just a diagonal matrix in disguise.

::: quiz
What are the singular values of $A = \begin{pmatrix}0&-2\\1&0\end{pmatrix}$?
- [ ] $\pm i\sqrt2$
- [x] $2$ and $1$
- [ ] $\sqrt2$ and $\sqrt2$
- [ ] $2$ and $0$
::: solution
$A\T A = \begin{pmatrix}0&1\\-2&0\end{pmatrix}\begin{pmatrix}0&-2\\1&0\end{pmatrix} = \begin{pmatrix}1&0\\0&4\end{pmatrix}$, so the singular values are $\sqrt4 = 2$ and $\sqrt1 = 1$. The eigenvalues of $A$ are $\pm i\sqrt2$ (from $\lambda^2 + 2 = 0$), but singular values are always real and non-negative. Geometrically $A$ stretches the $y$-direction by $2$ and then rotates by $90^\circ$; the unit circle becomes an ellipse with semi-axes $2$ and $1$.
:::
:::

::: remark Singular values versus eigenvalues
For a symmetric matrix $A = QDQ\T$, we have $A\T A = QD^2Q\T$, so the singular values are the absolute values of the eigenvalues; for a positive semidefinite matrix they are the eigenvalues. In general the two are different, but they are related: if $A\mathbf{v} = \lambda\mathbf{v}$ with $\norm{\mathbf{v}} = 1$, then $\abs{\lambda} = \norm{A\mathbf{v}}$ lies between the smallest and largest stretching factors, $\sigma_n\le\abs\lambda\le\sigma_1$. For $\begin{pmatrix}3&0\\4&5\end{pmatrix}$ the eigenvalues $3$ and $5$ lie between $\sigma_2\approx 2.24$ and $\sigma_1\approx 6.71$. Eigenvalues describe what happens under *repeated* application of $A$ (powers, dynamics); singular values describe the size and shape of a *single* application.
:::

## Norms and the best low-rank approximation

How large is a matrix? Two measures are standard. The **operator norm** (or spectral norm) is the largest factor by which $A$ stretches a vector, and the **Frobenius norm** treats $A$ as a long vector of entries:

$$
\norm{A} = \max_{\norm{\mathbf{x}} = 1}\norm{A\mathbf{x}}, \qquad \norm{A}_F = \Bigl(\sum_{i,j}a_{ij}^2\Bigr)^{1/2} = \sqrt{\tr(A\T A)}.
$$

::: theorem Norms from singular values {#thm-norms}
For every matrix, $\norm{A} = \sigma_1$ and $\norm{A}_F^2 = \sigma_1^2 + \sigma_2^2 + \dots + \sigma_r^2$.
:::

::: proof
$\norm{A\mathbf{x}}^2 = \mathbf{x}\T(A\T A)\mathbf{x}$, whose maximum over unit vectors is the largest eigenvalue $\lambda_1 = \sigma_1^2$ of $A\T A$, by Rayleigh's principle ([[linear-algebra/spectral-theorem#thm-rayleigh]]); it is attained at $\mathbf{v}_1$. For the Frobenius norm, $\tr(A\T A)$ is the sum of the eigenvalues of $A\T A$ ([[linear-algebra/eigenvalues#prop-trace-det]]), which is $\sum\sigma_i^2$.
:::

Now the central application. Truncating the sum [[#eq-svd-sum]] after $k$ terms gives a matrix of rank $k$,

$$
A_k = \sigma_1\mathbf{u}_1\mathbf{v}_1\T + \dots + \sigma_k\mathbf{u}_k\mathbf{v}_k\T,
$$

and it is the best possible approximation of that rank.

::: theorem Eckart–Young theorem {#thm-eckart-young}
Let $A$ have rank $r$ and $k < r$. Then $\norm{A - A_k} = \sigma_{k+1}$, and for every matrix $B$ of rank at most $k$,

$$
\norm{A - B}\ge\sigma_{k+1}.
$$

The same matrix $A_k$ is also the best rank-$k$ approximation in the Frobenius norm, with error $\norm{A - A_k}_F = \sqrt{\sigma_{k+1}^2 + \dots + \sigma_r^2}$.
:::

::: proof
$A - A_k = \sum_{i=k+1}^r\sigma_i\mathbf{u}_i\mathbf{v}_i\T$ is already in SVD form, with largest singular value $\sigma_{k+1}$; so $\norm{A - A_k} = \sigma_{k+1}$ by [[#thm-norms]].

Now let $\rank B\le k$. By rank–nullity $\dim\operatorname{Nul}(B)\ge n - k$, while $W = \Span(\mathbf{v}_1, \dots, \mathbf{v}_{k+1})$ has dimension $k + 1$. Since $(n - k) + (k + 1) > n$, the two subspaces share a unit vector $\mathbf{x}$ ([[linear-algebra/basis-dimension#thm-sum-dim]]). Write $\mathbf{x} = \sum_{i\le k+1}c_i\mathbf{v}_i$ with $\sum c_i^2 = 1$. Then $B\mathbf{x} = \mathbf{0}$ and

$$
\norm{(A - B)\mathbf{x}}^2 = \norm{A\mathbf{x}}^2 = \Bigl\lVert\sum_{i\le k+1}c_i\sigma_i\mathbf{u}_i\Bigr\rVert^2 = \sum_{i\le k+1}c_i^2\sigma_i^2\ge\sigma_{k+1}^2\sum_{i\le k+1}c_i^2 = \sigma_{k+1}^2.
$$

So $\norm{A - B}\ge\sigma_{k+1}$. The Frobenius statement is proved by a similar but longer argument (Mirsky 1960); see Horn and Johnson, *Matrix Analysis*.
:::

::: example The best rank-one approximation {#ex-rank-one}
Find the best rank-one approximation $A_1$ of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$ and the error.
::: solution
From [[#ex-svd-2x2]],

$$
A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1\T = 3\sqrt5\cdot\frac{1}{\sqrt{10}}\begin{pmatrix}1\\3\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\end{pmatrix} = \frac{3\sqrt5}{\sqrt{20}}\begin{pmatrix}1&1\\3&3\end{pmatrix} = \begin{pmatrix}\frac32&\frac32\\ \frac92&\frac92\end{pmatrix}.
$$

The error is $A - A_1 = \begin{pmatrix}\frac32&-\frac32\\-\frac12&\frac12\end{pmatrix} = \sigma_2\mathbf{u}_2\mathbf{v}_2\T$, with $\norm{A - A_1} = \sigma_2 = \sqrt5$ and $\norm{A - A_1}_F = \sqrt{\frac94 + \frac94 + \frac14 + \frac14} = \sqrt5$ too (it has rank one). By [[#thm-eckart-young]], no matrix of rank one comes closer to $A$.
:::
:::

::: application Image compression and data reduction
A greyscale image is an $m\times n$ matrix of pixel intensities. Storing the rank-$k$ approximation $A_k$ requires only the $k$ vectors $\mathbf{u}_i$, $\mathbf{v}_i$ and numbers $\sigma_i$: $k(m + n + 1)$ numbers instead of $mn$. For a $1000\times 1000$ image and $k = 50$ that is about $100\,000$ numbers instead of a million, and because the singular values of real images decay quickly, the picture is usually still very recognisable. The same idea, applied to a data matrix whose rows are observations, is **principal component analysis**: after centring the columns, the right singular vectors are the principal components and $\sigma_i^2/(N-1)$ are the variances along them ([[linear-algebra/spectral-theorem]]). Low-rank matrix factorisations of this kind were also central to the winning entries of the Netflix Prize (2006–2009) for predicting film ratings.
:::

::: example Principal components of five points {#ex-pca}
The points $(-2,-1)$, $(-1,-1)$, $(0,0)$, $(1,1)$, $(2,1)$ have mean $(0,0)$. Find the line through the origin that minimises the sum of the squared *perpendicular* distances from the points, and compare it with the least-squares regression line of $y$ on $x$.
::: solution
Let $X$ be the $5\times 2$ matrix with the points as rows, and let $\mathbf{u}$ be a unit vector along a candidate line. The squared perpendicular distance from a point $\mathbf{x}_k$ to the line is $\norm{\mathbf{x}_k}^2 - (\mathbf{x}_k\cdot\mathbf{u})^2$ (Pythagoras), so the total is $\norm{X}_F^2 - \norm{X\mathbf{u}}^2$. Minimising it means maximising $\norm{X\mathbf{u}}^2 = \mathbf{u}\T X\T X\mathbf{u}$, and by Rayleigh's principle the answer is the first right singular vector $\mathbf{v}_1$ of $X$. Here

$$
X\T X = \begin{pmatrix}10&6\\6&4\end{pmatrix}, \qquad \lambda = 7\pm3\sqrt5\approx 13.71,\ 0.29.
$$

For $\lambda_1 = 7 + 3\sqrt5$ the first row of $X\T X - \lambda_1I$ is $(3 - 3\sqrt5,\ 6)$, so $\mathbf{v}_1$ is parallel to $(6,\ 3\sqrt5 - 3)$, i.e. to $(2, \sqrt5 - 1)$. The best line has slope $\frac{\sqrt5 - 1}{2}\approx 0.618$ — the reciprocal of the golden ratio — and the minimal sum of squared perpendicular distances is $\sigma_2^2 = 7 - 3\sqrt5\approx 0.29$. The regression line instead has slope $S_{xy}/S_{xx} = \frac{6}{10} = 0.6$ ([[linear-algebra/least-squares#eq-slope]]): it minimises *vertical* distances, treating the $x$-values as exact, whereas the principal component treats both coordinates alike (this is also called **total least squares**). The first principal component carries $\sigma_1^2/(\sigma_1^2 + \sigma_2^2) = 13.71/14\approx 98\%$ of the total variation of the data.
:::
:::

::: widget regression
points: -2,-1; -1,-1; 0,0; 1,1; 2,1
degree: 1
residuals: true
x: -3, 3
y: -2.5, 2.5
caption: The points of [[#ex-pca]] with their least-squares line $y = 0.6x$; the residuals are vertical. The first principal direction found from the SVD is slightly steeper, slope $0.618$, because it measures distance perpendicular to the line. Drag the outer points vertically: the regression slope changes linearly with the data, while the principal direction always follows the long axis of the cloud.
:::

## The pseudoinverse and least squares

The SVD solves every least-squares problem, including those where the columns of $A$ are dependent and the normal equations have infinitely many solutions.

::: definition Pseudoinverse {#def-pseudoinverse}
If $A = U\Sigma V\T$ has rank $r$, its **(Moore–Penrose) pseudoinverse** is the $n\times m$ matrix

$$
A^+ = V\Sigma^+U\T = \frac{1}{\sigma_1}\mathbf{v}_1\mathbf{u}_1\T + \dots + \frac{1}{\sigma_r}\mathbf{v}_r\mathbf{u}_r\T,
$$

where $\Sigma^+$ is the $n\times m$ matrix with diagonal entries $1/\sigma_1, \dots, 1/\sigma_r$ and zeros elsewhere.
:::

The pseudoinverse reverses what $A$ does where it can — it maps $\mathbf{u}_i$ back to $\mathbf{v}_i/\sigma_i$ — and sends $\operatorname{Nul}(A\T)$, which $A$ never reaches, to $\mathbf{0}$. If $A$ is invertible, $A^+ = A^{-1}$; if $A$ has independent columns, $A^+ = (A\T A)^{-1}A\T$ (see [[#exr-pinv-formula]]).

::: theorem Minimum-norm least squares {#thm-pinv}
For every $\mathbf{b}\in\R^m$, the vector $\mathbf{x}^+ = A^+\mathbf{b}$ is a least-squares solution of $A\mathbf{x} = \mathbf{b}$, and it has smaller length than every other least-squares solution.
:::

::: proof
Change coordinates with the orthogonal matrices: put $\mathbf{y} = V\T\mathbf{x}$ and $\mathbf{c} = U\T\mathbf{b}$. Orthogonal matrices preserve lengths, so

$$
\norm{\mathbf{b} - A\mathbf{x}}^2 = \norm{U\T(\mathbf{b} - U\Sigma V\T\mathbf{x})}^2 = \norm{\mathbf{c} - \Sigma\mathbf{y}}^2 = \sum_{i=1}^r(c_i - \sigma_iy_i)^2 + \sum_{i=r+1}^m c_i^2.
$$

This is smallest exactly when $y_i = c_i/\sigma_i$ for $i\le r$, the coordinates $y_{r+1}, \dots, y_n$ being arbitrary: those $\mathbf{x} = V\mathbf{y}$ are the least-squares solutions. Since $\norm{\mathbf{x}} = \norm{\mathbf{y}}$, the shortest of them has $y_{r+1} = \dots = y_n = 0$, that is, $\mathbf{y} = \Sigma^+\mathbf{c}$ and $\mathbf{x} = V\Sigma^+U\T\mathbf{b} = A^+\mathbf{b}$.
:::

::: example The shortest solution of one equation {#ex-pinv}
Use the pseudoinverse to find the shortest solution of $x_1 + x_2 + x_3 = 3$.
::: solution
$A = (1\ \ 1\ \ 1)$ has $AA\T = (3)$, so $\sigma_1 = \sqrt3$, $\mathbf{u}_1 = (1)$ and $\mathbf{v}_1 = \frac{1}{\sqrt3}A\T\mathbf{u}_1 = \frac{1}{\sqrt3}(1,1,1)$. Hence

$$
A^+ = \frac{1}{\sigma_1}\mathbf{v}_1\mathbf{u}_1\T = \frac{1}{\sqrt3}\cdot\frac{1}{\sqrt3}\begin{pmatrix}1\\1\\1\end{pmatrix} = \frac13\begin{pmatrix}1\\1\\1\end{pmatrix}, \qquad \mathbf{x}^+ = A^+(3) = \begin{pmatrix}1\\1\\1\end{pmatrix}.
$$

Every solution of the equation lies on a plane, and $(1,1,1)$ is the point of that plane closest to the origin — the foot of the perpendicular, in the row space, as predicted by [[linear-algebra/least-squares#exr-shortest]].
:::
:::

### Sensitivity and the condition number

If $A$ is invertible and the data $\mathbf{b}$ contain errors, how wrong can the solution of $A\mathbf{x} = \mathbf{b}$ be? The SVD answers this precisely.

::: proposition Condition number {#prop-condition}
Let $A$ be invertible, $A\mathbf{x} = \mathbf{b}\neq\mathbf{0}$ and $A(\mathbf{x} + \delta\mathbf{x}) = \mathbf{b} + \delta\mathbf{b}$. Then

$$
\frac{\norm{\delta\mathbf{x}}}{\norm{\mathbf{x}}}\le\kappa(A)\,\frac{\norm{\delta\mathbf{b}}}{\norm{\mathbf{b}}}, \qquad \kappa(A) = \frac{\sigma_1}{\sigma_n},
$$

and the bound is attained for suitable $\mathbf{b}$ and $\delta\mathbf{b}$. The number $\kappa(A)$ is the **condition number** of $A$.
:::

::: proof
$\delta\mathbf{x} = A^{-1}\delta\mathbf{b}$, and $A^{-1} = V\Sigma^{-1}U\T$ has largest singular value $1/\sigma_n$, so $\norm{\delta\mathbf{x}}\le\norm{\delta\mathbf{b}}/\sigma_n$. Also $\norm{\mathbf{b}} = \norm{A\mathbf{x}}\le\sigma_1\norm{\mathbf{x}}$, i.e. $1/\norm{\mathbf{x}}\le\sigma_1/\norm{\mathbf{b}}$. Multiplying the two inequalities gives the result. Equality holds when $\mathbf{x} = \mathbf{v}_1$ (so $\mathbf{b} = \sigma_1\mathbf{u}_1$) and $\delta\mathbf{b}$ is a multiple of $\mathbf{u}_n$.
:::

A condition number of $10^k$ means that up to $k$ significant digits can be lost in solving the system. Since the singular values of $A\T A$ are $\sigma_i^2$, its condition number is $\kappa(A)^2$ — the precise reason why the normal equations lose twice as many digits as the QR method ([[linear-algebra/least-squares#ex-lauchli]]). The determinant, by contrast, is a poor measure of near-singularity: $\frac{1}{10}I$ ($100\times 100$) has determinant $10^{-100}$ but condition number $1$.

::: widget svd
matrix: 2,1.9; 1,1
caption: A nearly singular matrix. Its columns are almost parallel, so the unit circle is squashed into a long thin ellipse: $\sigma_1\approx 3.10$ but $\sigma_2\approx 0.032$, a condition number of about $96$. Small changes in the entries can move $\sigma_2$ dramatically — try changing $1.9$ to $2$, which makes the matrix singular and $\sigma_2 = 0$. The tiny singular value, not the determinant, is the honest measure of how close a matrix is to singular: by [[#thm-eckart-young]], $\sigma_2$ is exactly the distance to the nearest singular matrix.
:::

::: remark Computing the SVD
Forming $A\T A$ and finding its eigenvectors is fine for hand calculation but, as with the normal equations, squares the condition number. Library routines instead reduce $A$ by orthogonal (Householder) transformations to a bidiagonal matrix and then apply a variant of the QR eigenvalue algorithm — the Golub–Kahan–Reinsch method — at a cost of order $mn^2$ operations for an $m\times n$ matrix with $m\ge n$. For huge matrices, iterative and randomised methods compute just the few largest singular values and vectors, which is all that low-rank approximation needs.
:::

::: quiz
A $5\times 3$ matrix $A$ has singular values $4$, $2$, $0$. Which statements are true? (Select all that apply.)
- [x] $\rank A = 2$
- [x] $\norm{A} = 4$
- [x] $\dim\operatorname{Nul}(A) = 1$
- [ ] $\norm{A}_F = 6$
::: solution
The rank is the number of non-zero singular values, $2$ ([[#lem-svd]]); the operator norm is $\sigma_1 = 4$ ([[#thm-norms]]); rank–nullity gives $\dim\operatorname{Nul}(A) = 3 - 2 = 1$ (spanned by $\mathbf{v}_3$). The Frobenius norm is $\sqrt{16 + 4 + 0} = \sqrt{20}$, not $4 + 2$.
:::
:::

::: history
The SVD was discovered independently by Eugenio Beltrami (1873) and Camille Jordan (1874), who showed that a real bilinear form can be reduced to diagonal form by two orthogonal changes of variables; James Joseph Sylvester found it again for real square matrices in 1889. Erhard Schmidt (1907) developed the analogous theory for integral operators, including the low-rank approximation property, and Émile Picard (1910) introduced the name *singular values*. The psychometricians Carl Eckart and Gale Young (1936) treated general rectangular matrices and proved the matrix approximation theorem that bears their names; the pseudoinverse is due to E. H. Moore (1920) and Roger Penrose (1955). The SVD became a practical tool only with the stable algorithm of Gene Golub and William Kahan (1965), refined by Golub and Christian Reinsch (1970), which computes it without ever forming $A\T A$.
:::

## Where this leads

The SVD is the workhorse of numerical linear algebra, statistics and data science: it computes ranks and null spaces reliably, solves rank-deficient least-squares problems, measures conditioning ([[numerical-analysis/direct-methods]]), and underlies principal component analysis, latent semantic indexing and recommender systems. In infinite dimensions the same structure appears for compact operators, where it is the starting point of the theory of integral equations. Combining the SVD factors differently gives the **polar decomposition** $A = (UV\T)(V\Sigma V\T)$, an orthogonal matrix times a positive semidefinite one ([[#exr-polar]]) — the matrix analogue of writing a complex number as $re^{i\theta}$. For square matrices that are not diagonalisable, the eigenvalue-based counterpart of these results is the Jordan form ([[linear-algebra/jordan-form]]).

::: summary
- The singular values $\sigma_1\ge\dots\ge\sigma_n\ge 0$ of $A$ are the square roots of the eigenvalues of $A\T A$; $\sigma_i = \norm{A\mathbf{v}_i}$, and the number of non-zero ones is the rank ([[#lem-svd]]).
- Every matrix has an SVD $A = U\Sigma V\T$ with $U, V$ orthogonal: $A\mathbf{v}_i = \sigma_i\mathbf{u}_i$ ([[#thm-svd]]). Geometrically: rotate, stretch along axes, rotate; the unit sphere becomes an ellipsoid with semi-axes $\sigma_i$.
- $A = \sum_{i\le r}\sigma_i\mathbf{u}_i\mathbf{v}_i\T$; the singular vectors give orthonormal bases of all four fundamental subspaces.
- $\norm{A} = \sigma_1$ and $\norm{A}_F^2 = \sum\sigma_i^2$ ([[#thm-norms]]).
- Eckart–Young: truncating the SVD after $k$ terms gives the best rank-$k$ approximation, with error $\sigma_{k+1}$ ([[#thm-eckart-young]]).
- The pseudoinverse $A^+ = V\Sigma^+U\T$ gives the shortest least-squares solution $A^+\mathbf{b}$ ([[#thm-pinv]]).
- The condition number $\sigma_1/\sigma_n$ bounds the amplification of relative errors; $A\T A$ has condition number $\kappa(A)^2$.
:::

## Exercises

::: exercise A diagonal example {level=1 check="3"}
Find the singular values and an SVD of $A = \begin{pmatrix}2&0\\0&-3\end{pmatrix}$. What is $\sigma_1$?
::: solution
$A\T A = \diag(4, 9)$, so $\sigma_1 = 3$ and $\sigma_2 = 2$. With $\mathbf{v}_1 = \mathbf{e}_2$, $\mathbf{v}_2 = \mathbf{e}_1$ we get $\mathbf{u}_1 = A\mathbf{e}_2/3 = -\mathbf{e}_2$ and $\mathbf{u}_2 = A\mathbf{e}_1/2 = \mathbf{e}_1$, so

$$
A = \begin{pmatrix}0&1\\-1&0\end{pmatrix}\begin{pmatrix}3&0\\0&2\end{pmatrix}\begin{pmatrix}0&1\\1&0\end{pmatrix}.
$$

The singular values are the absolute values of the diagonal entries, sorted; the minus sign is absorbed into $U$.
:::
:::

::: exercise An operator norm {level=1 check="sqrt(2)"}
Find $\norm{A}$ for $A = \begin{pmatrix}1&1\\0&0\end{pmatrix}$ and a unit vector at which it is attained.
::: solution
$A\T A = \begin{pmatrix}1&1\\1&1\end{pmatrix}$ has eigenvalues $2$ and $0$, so $\sigma_1 = \sqrt2$ and $\norm{A} = \sqrt2$, attained at $\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1)$: indeed $A\mathbf{v}_1 = (\sqrt2, 0)$.
:::
:::

::: exercise Frobenius norm two ways {level=1 check="5"}
A $3\times 2$ matrix has singular values $3$ and $4$. What is its Frobenius norm? Check the formula $\norm{A}_F^2 = \sum\sigma_i^2$ on $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$.
::: solution
By [[#thm-norms]], $\norm{A}_F = \sqrt{9 + 16} = 5$. For the given $2\times 2$ matrix, the sum of squares of the entries is $9 + 0 + 16 + 25 = 50$, and $\sigma_1^2 + \sigma_2^2 = 45 + 5 = 50$.
:::
:::

::: exercise A full SVD {level=2}
Find a full SVD of $A = \begin{pmatrix}1&1\\1&1\\0&0\end{pmatrix}$ and its pseudoinverse.
::: solution
$A\T A = \begin{pmatrix}2&2\\2&2\end{pmatrix}$ has eigenvalues $4$ and $0$, with $\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1)$, $\mathbf{v}_2 = \frac{1}{\sqrt2}(1,-1)$. So $\sigma_1 = 2$, $r = 1$, and $\mathbf{u}_1 = \frac12A\mathbf{v}_1 = \frac{1}{\sqrt2}(1,1,0)$. Extend to an orthonormal basis of $\R^3$ with $\mathbf{u}_2 = \frac{1}{\sqrt2}(1,-1,0)$ and $\mathbf{u}_3 = (0,0,1)$:

$$
A = \begin{pmatrix}\frac{1}{\sqrt2}&\frac{1}{\sqrt2}&0\\[5pt] \frac{1}{\sqrt2}&-\frac{1}{\sqrt2}&0\\[5pt]0&0&1\end{pmatrix}\begin{pmatrix}2&0\\0&0\\0&0\end{pmatrix}\frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}.
$$

Then $A^+ = \frac12\mathbf{v}_1\mathbf{u}_1\T = \frac12\cdot\frac12\begin{pmatrix}1\\1\end{pmatrix}\begin{pmatrix}1&1&0\end{pmatrix} = \frac14\begin{pmatrix}1&1&0\\1&1&0\end{pmatrix}$.
:::
:::

::: exercise A rank-one pseudoinverse {level=2 check="1/25"}
Let $A = \begin{pmatrix}1&2\\2&4\end{pmatrix}$. Find $A^+$ and the shortest least-squares solution of $A\mathbf{x} = (1, 0)$. What is the $(1,1)$ entry of $A^+$?
::: solution
$A = \mathbf{w}\mathbf{w}\T$ with $\mathbf{w} = (1, 2)$, so $A = 5\,\mathbf{u}\mathbf{u}\T$ with the unit vector $\mathbf{u} = \frac{1}{\sqrt5}(1,2)$: this is an SVD with $\sigma_1 = 5$ and $\mathbf{u}_1 = \mathbf{v}_1 = \mathbf{u}$. Hence $A^+ = \frac15\mathbf{u}\mathbf{u}\T = \frac{1}{25}\begin{pmatrix}1&2\\2&4\end{pmatrix}$, whose $(1,1)$ entry is $\frac1{25}$. The shortest least-squares solution is $A^+(1,0) = \frac{1}{25}(1, 2)$. Check: it lies in $\operatorname{Row}(A) = \Span\bigl((1,2)\bigr)$, and $A\mathbf{x}^+ = \frac15(1,2)$ is the projection of $(1,0)$ onto $\operatorname{Col}(A) = \Span\bigl((1,2)\bigr)$.
:::
:::

::: exercise A condition number {level=2 check="3"}
Find the condition number of $A = \begin{pmatrix}3&0\\4&5\end{pmatrix}$ and of $A\T A$.
::: solution
From [[#ex-svd-2x2]], $\kappa(A) = \sigma_1/\sigma_2 = 3\sqrt5/\sqrt5 = 3$. The matrix $A\T A = \begin{pmatrix}25&20\\20&25\end{pmatrix}$ is symmetric positive definite with eigenvalues $45$ and $5$, which are also its singular values, so $\kappa(A\T A) = 9 = \kappa(A)^2$.
:::
:::

::: exercise Truncating a rectangular SVD {level=2 check="1"}
Find the best rank-one approximation $A_1$ of $A = \begin{pmatrix}1&1&0\\0&1&1\end{pmatrix}$ (see [[#ex-svd-rect]]) and the error $\norm{A - A_1}$.
::: solution
$A_1 = \sigma_1\mathbf{u}_1\mathbf{v}_1\T = \sqrt3\cdot\frac{1}{\sqrt2}\begin{pmatrix}1\\1\end{pmatrix}\frac{1}{\sqrt6}\begin{pmatrix}1&2&1\end{pmatrix} = \frac12\begin{pmatrix}1&2&1\\1&2&1\end{pmatrix}$. By [[#thm-eckart-young]] the error is $\norm{A - A_1} = \sigma_2 = 1$; indeed $A - A_1 = \frac12\begin{pmatrix}1&0&-1\\-1&0&1\end{pmatrix} = \sigma_2\mathbf{u}_2\mathbf{v}_2\T$.
:::
:::

::: exercise Determinant and singular values {level=2 #exr-det-sv}
Prove that for every square matrix, $\abs{\det A} = \sigma_1\sigma_2\cdots\sigma_n$, and that $A$ is invertible if and only if $\sigma_n > 0$. Give an example of a matrix with tiny determinant whose singular values are all equal.
::: solution
$\det A = \det U\det\Sigma\det V\T = (\pm1)(\sigma_1\cdots\sigma_n)(\pm1)$ since orthogonal matrices have determinant $\pm1$. So $\abs{\det A} = \prod\sigma_i$, which is non-zero iff every $\sigma_i > 0$ iff $\sigma_n > 0$. (Geometrically: the ellipsoid has volume $\prod\sigma_i$ times that of the unit ball.) Example: $A = 0.1\,I_{10}$ has $\det A = 10^{-10}$ but all singular values equal $0.1$ and $\kappa(A) = 1$ — perfectly conditioned.
:::
:::

::: exercise Pseudoinverse with independent columns {level=3 #exr-pinv-formula}
Prove that if $A$ has linearly independent columns, then $A^+ = (A\T A)^{-1}A\T$; and if $A$ is invertible, then $A^+ = A^{-1}$.
::: solution
Independent columns mean $r = n$, so $\Sigma = \begin{pmatrix}\Sigma_n\\O\end{pmatrix}$ with $\Sigma_n = \diag(\sigma_1, \dots, \sigma_n)$ invertible. Then $A\T A = V\Sigma\T\Sigma V\T = V\Sigma_n^2V\T$ and $(A\T A)^{-1} = V\Sigma_n^{-2}V\T$, so

$$
(A\T A)^{-1}A\T = V\Sigma_n^{-2}V\T V\Sigma\T U\T = V\Sigma_n^{-2}\Sigma\T U\T = V\Sigma^+U\T = A^+,
$$

because $\Sigma_n^{-2}\Sigma\T = (\Sigma_n^{-1}\ \ O) = \Sigma^+$. If $A$ is square and invertible, $(A\T A)^{-1}A\T = A^{-1}(A\T)^{-1}A\T = A^{-1}$.
:::
:::

::: exercise The polar decomposition {level=3 #exr-polar}
Prove that every real square matrix can be written $A = QS$ with $Q$ orthogonal and $S$ symmetric positive semidefinite, and that $S = \sqrt{A\T A}$ (the unique positive semidefinite square root). Find the polar decomposition of $\begin{pmatrix}3&0\\4&5\end{pmatrix}$.
::: solution
With $A = U\Sigma V\T$ (square, so $\Sigma$ is diagonal), write $A = (UV\T)(V\Sigma V\T)$. $Q = UV\T$ is orthogonal, and $S = V\Sigma V\T$ is symmetric with non-negative eigenvalues $\sigma_i$; also $S^2 = V\Sigma^2V\T = A\T A$. For the example, with $V = \frac{1}{\sqrt2}\begin{pmatrix}1&1\\1&-1\end{pmatrix}$ and $\Sigma = \diag(3\sqrt5, \sqrt5)$:

$$
S = V\Sigma V\T = \frac{\sqrt5}{2}\begin{pmatrix}4&2\\2&4\end{pmatrix} = \sqrt5\begin{pmatrix}2&1\\1&2\end{pmatrix}, \qquad Q = AS^{-1} = \frac{1}{\sqrt5}\begin{pmatrix}2&-1\\1&2\end{pmatrix}.
$$

$Q$ is a rotation (by $\arctan\frac12$), and indeed $QS = \begin{pmatrix}2&-1\\1&2\end{pmatrix}\begin{pmatrix}2&1\\1&2\end{pmatrix} = \begin{pmatrix}3&0\\4&5\end{pmatrix}$. (Uniqueness of the positive semidefinite square root follows from the spectral theorem: such a root must act as $\sqrt{\lambda}$ on each eigenspace of $A\T A$.)
:::
:::
