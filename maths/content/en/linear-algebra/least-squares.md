An experiment produces the data points $(0, 1)$, $(1, 3)$, $(2, 4)$ and $(3, 4)$, and theory says that the relationship should be a straight line $y = c + mx$. A line through all four points would need

$$
\begin{aligned} c + 0m &= 1,\\ c + 1m &= 3,\\ c + 2m &= 4,\\ c + 3m &= 4, \end{aligned}
\qquad\text{that is}\qquad
\begin{pmatrix}1&0\\1&1\\1&2\\1&3\end{pmatrix}\begin{pmatrix}c\\m\end{pmatrix} = \begin{pmatrix}1\\3\\4\\4\end{pmatrix}.
$$

Four equations, two unknowns, and no solution: the points are not collinear, as real measurements never are. Yet there is clearly a line that fits the data well. The method of **least squares** makes this precise: choose the unknowns that make the sum of the squared errors as small as possible. Geometrically this is a closest-point problem — the vector $A\mathbf{x}$ should be as close as possible to $\mathbf{b}$ — and the previous chapter solved closest-point problems by orthogonal projection.

This chapter turns that observation into the **normal equations** $A\T A\hat{\mathbf{x}} = A\T\mathbf{b}$, studies projection matrices, and applies the method to fitting lines, polynomials and other curves to data. It ends with the computational side: why the QR factorisation is preferred to the normal equations in practice. Least squares is the most widely used technique in the whole of applied mathematics, from astronomy, where it was invented, to statistics, econometrics, signal processing and machine learning.

## Least-squares solutions and the normal equations

::: definition Least-squares solution {#def-least-squares}
Let $A$ be an $m\times n$ matrix and $\mathbf{b}\in\R^m$. A **least-squares solution** of $A\mathbf{x} = \mathbf{b}$ is a vector $\hat{\mathbf{x}}\in\R^n$ such that

$$
\norm{\mathbf{b} - A\hat{\mathbf{x}}}\le\norm{\mathbf{b} - A\mathbf{x}} \qquad\text{for all } \mathbf{x}\in\R^n.
$$

The vector $\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}}$ is the **residual**, and $\norm{\mathbf{r}}$ is the **least-squares error**.
:::

The name comes from writing out the squared norm: $\norm{\mathbf{b} - A\mathbf{x}}^2 = \sum_{i=1}^m\bigl(b_i - (A\mathbf{x})_i\bigr)^2$ is the sum of the squares of the errors in the $m$ equations. If the system is consistent, its exact solutions are the least-squares solutions, with error $0$.

As $\mathbf{x}$ ranges over $\R^n$, the vector $A\mathbf{x}$ ranges over the column space $\operatorname{Col}(A)$. So we are looking for the point of $\operatorname{Col}(A)$ closest to $\mathbf{b}$, which by [[linear-algebra/inner-products#thm-best-approx]] is the orthogonal projection $\hat{\mathbf{b}} = \proj_{\operatorname{Col}(A)}\mathbf{b}$. The least-squares solutions are exactly the solutions of $A\mathbf{x} = \hat{\mathbf{b}}$. Since we usually do not have an orthogonal basis of $\operatorname{Col}(A)$ to compute $\hat{\mathbf{b}}$, we characterise the solutions differently.

::: theorem The normal equations {#thm-normal}
The least-squares solutions of $A\mathbf{x} = \mathbf{b}$ are exactly the solutions of the **normal equations**

$$
A\T A\,\hat{\mathbf{x}} = A\T\mathbf{b}.
$$ {#eq-normal}

In particular, least-squares solutions always exist, and $\hat{\mathbf{x}}$ is one if and only if the residual $\mathbf{b} - A\hat{\mathbf{x}}$ is orthogonal to $\operatorname{Col}(A)$.
:::

::: proof
By [[linear-algebra/inner-products#thm-decomposition]] and [[linear-algebra/inner-products#thm-best-approx]], $\norm{\mathbf{b} - A\mathbf{x}}$ is minimal exactly when $A\mathbf{x} = \hat{\mathbf{b}}$, and $\hat{\mathbf{b}}$ is characterised as the unique vector of $\operatorname{Col}(A)$ with $\mathbf{b} - \hat{\mathbf{b}}\perp\operatorname{Col}(A)$. Since $A\mathbf{x}$ is always in $\operatorname{Col}(A)$, the vector $\hat{\mathbf{x}}$ is a least-squares solution if and only if $\mathbf{b} - A\hat{\mathbf{x}}\in\operatorname{Col}(A)^\perp$. By [[linear-algebra/inner-products#thm-fundamental]], $\operatorname{Col}(A)^\perp = \operatorname{Nul}(A\T)$, so this means $A\T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{0}$, which is [[#eq-normal]]. Least-squares solutions exist because $\hat{\mathbf{b}}\in\operatorname{Col}(A)$, so $A\mathbf{x} = \hat{\mathbf{b}}$ is consistent.
:::

The name "normal" refers to this orthogonality: the residual is normal (perpendicular) to the column space. Notice the pleasant mechanics: multiplying the inconsistent system $A\mathbf{x} = \mathbf{b}$ on the left by $A\T$ turns it into a square $n\times n$ system that is always consistent.

::: theorem Uniqueness {#thm-unique-ls}
For any matrix $A$, $\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$. Consequently $A\T A$ is invertible if and only if the columns of $A$ are linearly independent, and in that case the least-squares solution is unique:

$$
\hat{\mathbf{x}} = (A\T A)^{-1}A\T\mathbf{b}.
$$
:::

::: proof
If $A\mathbf{x} = \mathbf{0}$ then $A\T A\mathbf{x} = \mathbf{0}$. Conversely, if $A\T A\mathbf{x} = \mathbf{0}$, then

$$
0 = \mathbf{x}\T A\T A\mathbf{x} = (A\mathbf{x})\T(A\mathbf{x}) = \norm{A\mathbf{x}}^2,
$$

so $A\mathbf{x} = \mathbf{0}$. The square matrix $A\T A$ is invertible iff its null space is $\{\mathbf{0}\}$ ([[linear-algebra/matrices#thm-imt]]), i.e. iff $\operatorname{Nul}(A) = \{\mathbf{0}\}$, i.e. iff the columns of $A$ are independent. Then [[#eq-normal]] has exactly one solution.
:::

When the columns of $A$ are dependent there are infinitely many least-squares solutions — all with the same $A\hat{\mathbf{x}} = \hat{\mathbf{b}}$, differing by vectors of $\operatorname{Nul}(A)$. Among them is a unique one of smallest length, which the pseudoinverse of [[linear-algebra/svd]] picks out.

::: intuition A calculus derivation
The normal equations can also be found by setting a derivative to zero. Expanding the squared error as a function of $\mathbf{x}$,

$$
f(\mathbf{x}) = \norm{\mathbf{b} - A\mathbf{x}}^2 = \mathbf{b}\T\mathbf{b} - 2\mathbf{x}\T A\T\mathbf{b} + \mathbf{x}\T A\T A\mathbf{x},
$$

a quadratic function of the $n$ variables $x_1, \dots, x_n$. Its gradient is $\nabla f = 2A\T A\mathbf{x} - 2A\T\mathbf{b}$, which vanishes exactly when $\mathbf{x}$ solves the normal equations. The matrix of second derivatives is $2A\T A$, and $\mathbf{v}\T(2A\T A)\mathbf{v} = 2\norm{A\mathbf{v}}^2\ge 0$, so the critical points are minima — the bowl-shaped graph of a positive semidefinite quadratic form, studied in [[linear-algebra/spectral-theorem]] (compare the second derivative test of [[multivariable/extrema]]). The geometric argument via projection reaches the same conclusion without any calculus, and shows directly that the minimum is attained.
:::

::: example The best line through four points {#ex-line}
Find the least-squares line $y = c + mx$ for the data $(0,1)$, $(1,3)$, $(2,4)$, $(3,4)$ of the introduction.
::: solution
With $A$ and $\mathbf{b}$ as in the introduction,

$$
A\T A = \begin{pmatrix}1&1&1&1\\0&1&2&3\end{pmatrix}\begin{pmatrix}1&0\\1&1\\1&2\\1&3\end{pmatrix} = \begin{pmatrix}4&6\\6&14\end{pmatrix}, \qquad A\T\mathbf{b} = \begin{pmatrix}1 + 3 + 4 + 4\\ 0 + 3 + 8 + 12\end{pmatrix} = \begin{pmatrix}12\\23\end{pmatrix}.
$$

The normal equations $4c + 6m = 12$, $6c + 14m = 23$ have determinant $56 - 36 = 20$ and solution

$$
c = \frac{14\cdot 12 - 6\cdot 23}{20} = \frac32, \qquad m = \frac{4\cdot 23 - 6\cdot 12}{20} = 1.
$$

The least-squares line is $y = \frac32 + x$. Its residuals are $\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}} = (1 - \frac32,\ 3 - \frac52,\ 4 - \frac72,\ 4 - \frac92) = \left(-\frac12, \frac12, \frac12, -\frac12\right)$, so the sum of squared errors is $1$. As [[#thm-normal]] predicts, $\mathbf{r}$ is orthogonal to both columns: $-\frac12 + \frac12 + \frac12 - \frac12 = 0$ and $0 + \frac12 + 1 - \frac32 = 0$.
:::
:::

::: widget regression
points: 0,1; 1,3; 2,4; 3,4
degree: 1
residuals: true
x: -1, 5
y: -1, 6
caption: The data of [[#ex-line]] with the least-squares line $y = \tfrac32 + x$ and its residuals. Drag a point and watch the line respond: it minimises the total area of the squares built on the vertical residuals (switch on *Squares* to see them). Notice that the line always passes through the centroid $(\bar x, \bar y)$ of the data, and that moving one point far away (an outlier) drags the whole line with it — squaring makes large errors very expensive.
:::

::: example A system with no solution {#ex-inconsistent}
Find the least-squares solution of $A\mathbf{x} = \mathbf{b}$ for $A = \begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}$ and $\mathbf{b} = (1, 1, 0)$, and interpret the error geometrically.
::: solution
The system $x_1 = 1$, $x_2 = 1$, $x_1 + x_2 = 0$ is clearly inconsistent. The normal equations are

$$
A\T A = \begin{pmatrix}2&1\\1&2\end{pmatrix}, \quad A\T\mathbf{b} = \begin{pmatrix}1\\1\end{pmatrix}, \qquad \begin{pmatrix}2&1\\1&2\end{pmatrix}\hat{\mathbf{x}} = \begin{pmatrix}1\\1\end{pmatrix}\ \Longrightarrow\ \hat{\mathbf{x}} = \begin{pmatrix}\frac13\\\frac13\end{pmatrix}.
$$

So $A\hat{\mathbf{x}} = (\frac13, \frac13, \frac23)$, the residual is $\mathbf{r} = (\frac23, \frac23, -\frac23)$, and the least-squares error is $\norm{\mathbf{r}} = \frac{2}{\sqrt3}$. Geometrically, $\operatorname{Col}(A)$ is the plane $x + y - z = 0$ with normal $\mathbf{n} = (1,1,-1)$, the residual is a multiple of $\mathbf{n}$, and $\frac{2}{\sqrt3} = \frac{\abs{\mathbf{b}\cdot\mathbf{n}}}{\norm{\mathbf{n}}}$ is the distance from $\mathbf{b}$ to that plane.
:::
:::

::: warning Least squares is not "solve and hope"
Two tempting shortcuts give wrong answers. Deleting equations until the system becomes square and solvable ignores the discarded data. Row reducing $A\mathbf{x} = \mathbf{b}$ only reveals that it is inconsistent; row operations do not preserve the least-squares solution, because they change lengths. The correct procedure is to form the normal equations (or use the QR method below) *before* solving.
:::

::: quiz
$A$ has linearly independent columns, $\mathbf{b}\notin\operatorname{Col}(A)$, and $\hat{\mathbf{x}}$ is the least-squares solution of $A\mathbf{x} = \mathbf{b}$. Which statements are true? (Select all that apply.)
- [x] $\hat{\mathbf{x}}$ is unique.
- [x] $\mathbf{b} - A\hat{\mathbf{x}}$ is orthogonal to every column of $A$.
- [ ] $A\hat{\mathbf{x}} = \mathbf{b}$.
- [x] $A\hat{\mathbf{x}}$ is the orthogonal projection of $\mathbf{b}$ onto $\operatorname{Col}(A)$.
::: solution
Independence of the columns gives uniqueness ([[#thm-unique-ls]]); the residual is perpendicular to $\operatorname{Col}(A)$ and $A\hat{\mathbf{x}} = \proj_{\operatorname{Col}(A)}\mathbf{b}$ ([[#thm-normal]]). But $A\hat{\mathbf{x}}\neq\mathbf{b}$, since $\mathbf{b}$ is not in the column space — otherwise the system would be consistent.
:::
:::

## Projection matrices

When the columns of $A$ are independent, combining [[#thm-unique-ls]] with $\hat{\mathbf{b}} = A\hat{\mathbf{x}}$ gives the projection of any $\mathbf{b}$ onto $\operatorname{Col}(A)$ as a matrix times $\mathbf{b}$:

$$
\proj_{\operatorname{Col}(A)}\mathbf{b} = P\mathbf{b}, \qquad P = A(A\T A)^{-1}A\T.
$$ {#eq-proj-matrix}

When $A$ has a single column $\mathbf{a}$, this is $P = \dfrac{\mathbf{a}\mathbf{a}\T}{\mathbf{a}\T\mathbf{a}}$, the projection onto a line. If the columns of $A$ are orthonormal ($A = Q$ with $Q\T Q = I$), it reduces to $P = QQ\T$, as found in [[linear-algebra/inner-products]].

::: theorem Characterising orthogonal projections {#thm-projection}
A square matrix $P$ is the matrix of the orthogonal projection onto its column space if and only if

$$
P^2 = P \qquad\text{and}\qquad P\T = P.
$$

The matrix [[#eq-proj-matrix]] has both properties, and $I - P$ is then the orthogonal projection onto $\operatorname{Col}(P)^\perp$.
:::

::: proof
Suppose $P^2 = P = P\T$. For any $\mathbf{v}$, write $\mathbf{v} = P\mathbf{v} + (\mathbf{v} - P\mathbf{v})$. The first part lies in $\operatorname{Col}(P)$. The second is orthogonal to $\operatorname{Col}(P)$: for every vector $P\mathbf{w}$ of the column space,

$$
(\mathbf{v} - P\mathbf{v})\T P\mathbf{w} = \mathbf{v}\T P\mathbf{w} - \mathbf{v}\T P\T P\mathbf{w} = \mathbf{v}\T P\mathbf{w} - \mathbf{v}\T P^2\mathbf{w} = 0.
$$

By the uniqueness in [[linear-algebra/inner-products#thm-decomposition]], $P\mathbf{v}$ is the orthogonal projection of $\mathbf{v}$ onto $\operatorname{Col}(P)$. Conversely, an orthogonal projection $P$ satisfies $P^2 = P$ (projecting twice changes nothing); and for all $\mathbf{v}, \mathbf{w}$, since $\mathbf{w} - P\mathbf{w}\perp P\mathbf{v}$ and $\mathbf{v} - P\mathbf{v}\perp P\mathbf{w}$,

$$
(P\mathbf{v})\cdot\mathbf{w} = (P\mathbf{v})\cdot(P\mathbf{w}) = \mathbf{v}\cdot(P\mathbf{w}),
$$

which says $P\T = P$. For [[#eq-proj-matrix]], $P\T = A\bigl((A\T A)^{-1}\bigr)\T A\T = A(A\T A)^{-1}A\T = P$ since $A\T A$ is symmetric, and $P^2 = A(A\T A)^{-1}(A\T A)(A\T A)^{-1}A\T = P$. Finally, $I - P$ is symmetric and $(I - P)^2 = I - 2P + P^2 = I - P$; it sends $\mathbf{v}$ to the component $\mathbf{v} - P\mathbf{v}$, which lies in $\operatorname{Col}(P)^\perp$.
:::

::: example A projection matrix in three dimensions {#ex-proj-matrix}
Find the matrix of the orthogonal projection onto the plane spanned by $(1,0,1)$ and $(0,1,1)$, and use it to recover $A\hat{\mathbf{x}}$ in [[#ex-inconsistent]].
::: solution
With $A$ as in [[#ex-inconsistent]], $(A\T A)^{-1} = \frac13\begin{pmatrix}2&-1\\-1&2\end{pmatrix}$, so

$$
P = A(A\T A)^{-1}A\T = \frac13\begin{pmatrix}1&0\\0&1\\1&1\end{pmatrix}\begin{pmatrix}2&-1\\-1&2\end{pmatrix}\begin{pmatrix}1&0&1\\0&1&1\end{pmatrix} = \frac13\begin{pmatrix}2&-1&1\\-1&2&1\\1&1&2\end{pmatrix}.
$$

It is symmetric, and its trace is $2 = \dim\operatorname{Col}(A)$ (always true for a projection: [[#exr-proj-trace]]). Applying it to $\mathbf{b} = (1,1,0)$ gives $\frac13(1, 1, 2)$, which matches $A\hat{\mathbf{x}}$. Also $I - P = \frac13\begin{pmatrix}1&1&-1\\1&1&-1\\-1&-1&1\end{pmatrix} = \frac{\mathbf{n}\mathbf{n}\T}{\mathbf{n}\T\mathbf{n}}$ with $\mathbf{n} = (1,1,-1)$: the projection onto the normal line.
:::
:::

::: quiz
Which of these matrices are orthogonal projections (onto their column space)? (Select all that apply.)
- [x] $\frac12\begin{pmatrix}1&1\\1&1\end{pmatrix}$
- [ ] $\begin{pmatrix}1&1\\0&0\end{pmatrix}$
- [x] $\begin{pmatrix}1&0\\0&0\end{pmatrix}$
- [ ] $\begin{pmatrix}0&1\\1&0\end{pmatrix}$
::: solution
By [[#thm-projection]] we need $P^2 = P = P\T$. The first (projection onto the line $y = x$) and third (onto the $x$-axis) qualify. The second satisfies $P^2 = P$ but is not symmetric: it is an *oblique* projection, sending $(0,1)$ to $(1,0)$ along a non-perpendicular direction. The fourth is symmetric but $P^2 = I\neq P$: it is the reflection in $y = x$.
:::
:::

## Fitting curves to data

The method fits any model in which the unknown parameters enter **linearly**, even if the model is a non-linear function of $x$.

### Straight lines

For data $(x_1, y_1), \dots, (x_m, y_m)$ and the model $y = \beta_0 + \beta_1x$, the **design matrix** $X$ has rows $(1, x_i)$, and the normal equations $X\T X\boldsymbol\beta = X\T\mathbf{y}$ read

$$
\begin{aligned} m\beta_0 + \Bigl(\sum x_i\Bigr)\beta_1 &= \sum y_i,\\ \Bigl(\sum x_i\Bigr)\beta_0 + \Bigl(\sum x_i^2\Bigr)\beta_1 &= \sum x_iy_i. \end{aligned}
$$

Dividing the first by $m$ gives $\beta_0 = \bar y - \beta_1\bar x$, where $\bar x$, $\bar y$ are the means: **the least-squares line passes through the centroid $(\bar x, \bar y)$**. Substituting into the second equation and simplifying,

$$
\beta_1 = \frac{S_{xy}}{S_{xx}}, \qquad S_{xy} = \sum_{i=1}^m(x_i - \bar x)(y_i - \bar y), \quad S_{xx} = \sum_{i=1}^m(x_i - \bar x)^2.
$$ {#eq-slope}

In [[#ex-line]]: $\bar x = \frac32$, $\bar y = 3$, $S_{xx} = \frac94 + \frac14 + \frac14 + \frac94 = 5$ and $S_{xy} = (-\frac32)(-2) + (-\frac12)(0) + \frac12(1) + \frac32(1) = 5$, so $\beta_1 = 1$ and $\beta_0 = 3 - \frac32 = \frac32$, as before. Because the column of ones is orthogonal to the residual, **the residuals always sum to zero** when the model has a constant term.

### Polynomials and other linear models

To fit $y = \beta_0 + \beta_1x + \dots + \beta_dx^d$, use the design matrix with rows $(1, x_i, x_i^2, \dots, x_i^d)$. Models such as $y = \beta_0 + \beta_1\cos t + \beta_2\sin t$ (seasonal data) or $y = \beta_1x + \beta_2\ln x$ are handled in the same way: each basis function contributes one column of the design matrix.

::: remark Why squares?
Why minimise the sum of the *squares* of the errors rather than, say, the sum of their absolute values? Squares give the Euclidean distance $\norm{\mathbf{b} - A\mathbf{x}}$, so the problem has the geometry of projections; the answer comes from a *linear* system; the solution is unique when the columns are independent; and, as Gauss showed, it is the most probable answer when the errors are normally distributed. The price is sensitivity to outliers, because one large error, squared, can dominate the sum. Minimising $\sum\abs{b_i - (A\mathbf{x})_i}$ instead ("least absolute deviations") is more robust, but it has no formula and must be solved by linear programming.
:::

::: example Fitting a parabola with an orthogonal basis {#ex-parabola-fit}
Fit $y = \beta_0 + \beta_1x + \beta_2x^2$ to the data $(1, 1)$, $(2, 2)$, $(3, 4)$, $(4, 9)$.
::: solution
The design matrix is the matrix $A$ of [[linear-algebra/inner-products#ex-qr]], whose columns we orthogonalised there: $\operatorname{Col}(A)$ has the orthogonal basis $\mathbf{v}_1 = (1,1,1,1)$, $\mathbf{v}_2 = (-3,-1,1,3)$, $\mathbf{v}_3 = (1,-1,-1,1)$, which are the values at $x = 1, 2, 3, 4$ of the polynomials $1$, $2x - 5$ and $x^2 - 5x + 5$. With an orthogonal basis the projection needs no system of equations ([[linear-algebra/inner-products#eq-projection]]): for $\mathbf{y} = (1, 2, 4, 9)$,

$$
\frac{\mathbf{y}\cdot\mathbf{v}_1}{\mathbf{v}_1\cdot\mathbf{v}_1} = \frac{16}{4} = 4, \qquad \frac{\mathbf{y}\cdot\mathbf{v}_2}{\mathbf{v}_2\cdot\mathbf{v}_2} = \frac{26}{20} = \frac{13}{10}, \qquad \frac{\mathbf{y}\cdot\mathbf{v}_3}{\mathbf{v}_3\cdot\mathbf{v}_3} = \frac44 = 1.
$$

So the fitted polynomial is

$$
4 + \tfrac{13}{10}(2x - 5) + (x^2 - 5x + 5) = x^2 - \tfrac{12}{5}x + \tfrac52,
$$

with fitted values $(1.1, 1.7, 4.3, 8.9)$ and residuals $(-0.1, 0.3, -0.3, 0.1)$. The residuals are orthogonal to all three columns, as they must be. (Solving the normal equations directly gives the same coefficients $\beta = (\frac52, -\frac{12}{5}, 1)$, with more arithmetic.)
:::
:::

::: widget regression
points: 1,1; 2,2; 3,4; 4,9
degree: 2
residuals: true
x: 0, 5
y: -1, 11
caption: The least-squares parabola of [[#ex-parabola-fit]], $y = x^2 - 2.4x + 2.5$. Drag the points: with four points and three parameters the fit is usually not exact, and the residuals always balance out so that their sum (and their sums weighted by $x_i$ and by $x_i^2$) is zero. Drag a point to make the data lie on a parabola and the residuals vanish.
:::

::: example Exponential growth {#ex-exponential}
A bacterial culture is measured at times $t = 0, 1, 2$ hours, with counts (in thousands) $1$, $3$ and $8$. Fit a model $y = Ce^{kt}$.
::: solution
The model is not linear in $C$ and $k$, but its logarithm is: $\ln y = \ln C + kt$. So fit a line to the points $(t_i, \ln y_i) = (0, 0)$, $(1, \ln 3)$, $(2, \ln 8)$. Here $\bar t = 1$ and $S_{tt} = 2$, and by [[#eq-slope]]

$$
k = \frac{(-1)(0 - \bar z) + 0 + (1)(\ln 8 - \bar z)}{2} = \frac{\ln 8}{2} = \tfrac32\ln 2\approx 1.04,
$$

where $\bar z = \frac13(\ln 3 + \ln 8)$ cancels. Then $\ln C = \bar z - k\bar t = \frac13\ln 24 - \frac32\ln 2\approx 0.020$, so $C\approx 1.02$ and $y\approx 1.02\,e^{1.04t}$. Note that this minimises the squared errors of $\ln y$, not of $y$, which gives relatively more weight to the small counts — often appropriate for growth data, whose errors tend to be proportional to the size of the measurement.
:::
:::

::: application Least squares in statistics
In the statistical model $\mathbf{y} = X\boldsymbol\beta + \boldsymbol\eps$, with errors $\eps_i$ that are independent with mean $0$ and equal variance, the least-squares estimate $\hat{\boldsymbol\beta} = (X\T X)^{-1}X\T\mathbf{y}$ is the best linear unbiased estimator of $\boldsymbol\beta$ (the Gauss–Markov theorem); if the errors are moreover normally distributed, it is also the maximum-likelihood estimate. The orthogonal decomposition $\mathbf{y} = \hat{\mathbf{y}} + \mathbf{r}$ with $\hat{\mathbf{y}}\perp\mathbf{r}$ gives, by Pythagoras, the analysis-of-variance identity behind the coefficient of determination $R^2$. See [[statistics/regression]].
:::

## Computing least-squares solutions: the QR method

The normal equations are the natural way to *think* about least squares and the natural way to solve small problems by hand. On a computer they have a weakness: forming $A\T A$ squares the "condition number" of the problem ([[linear-algebra/svd]] makes this precise), so roughly twice as many significant digits are lost to rounding. If the columns of $A$ are nearly dependent — as with polynomial fits of high degree, where the columns $x^k$ and $x^{k+1}$ look alike — this can destroy the answer.

The cure is the QR factorisation of [[linear-algebra/inner-products#thm-qr]].


::: theorem Least squares via QR {#thm-ls-qr}
If $A$ has linearly independent columns and $A = QR$ is its QR factorisation, then the least-squares solution of $A\mathbf{x} = \mathbf{b}$ is the unique solution of the triangular system

$$
R\hat{\mathbf{x}} = Q\T\mathbf{b}.
$$
:::

::: proof
Substitute $A = QR$ into the normal equations and use $Q\T Q = I$: $A\T A = R\T Q\T QR = R\T R$ and $A\T\mathbf{b} = R\T Q\T\mathbf{b}$. So the normal equations read $R\T R\hat{\mathbf{x}} = R\T Q\T\mathbf{b}$. The matrix $R\T$ is invertible (triangular with positive diagonal), so this is equivalent to $R\hat{\mathbf{x}} = Q\T\mathbf{b}$.
:::

::: example The parabola fit by QR {#ex-ls-qr}
Redo [[#ex-parabola-fit]] using the factorisation $A = QR$ found in [[linear-algebra/inner-products#ex-qr]].
::: solution
There, $R = \begin{pmatrix}2&5&15\\0&\sqrt5&5\sqrt5\\0&0&2\end{pmatrix}$ and the columns of $Q$ are $\frac12(1,1,1,1)$, $\frac{1}{2\sqrt5}(-3,-1,1,3)$, $\frac12(1,-1,-1,1)$. For $\mathbf{y} = (1,2,4,9)$:

$$
Q\T\mathbf{y} = \left(\tfrac{16}{2},\ \tfrac{26}{2\sqrt5},\ \tfrac42\right) = \left(8,\ \tfrac{13}{\sqrt5},\ 2\right).
$$

Back substitution in $R\boldsymbol\beta = Q\T\mathbf{y}$: $2\beta_2 = 2$ gives $\beta_2 = 1$; $\sqrt5\beta_1 + 5\sqrt5\beta_2 = \frac{13}{\sqrt5}$ gives $\beta_1 = \frac{13}{5} - 5 = -\frac{12}{5}$; $2\beta_0 + 5\beta_1 + 15\beta_2 = 8$ gives $2\beta_0 = 8 + 12 - 15 = 5$, so $\beta_0 = \frac52$. The same coefficients as before, obtained without ever forming $A\T A$.
:::
:::

::: example When the normal equations fail {#ex-lauchli}
Let $\delta = 10^{-8}$ and $A = \begin{pmatrix}1&1\\\delta&0\\0&\delta\end{pmatrix}$, $\mathbf{b} = (2, \delta, \delta)$. Show that the system is consistent with solution $(1,1)$, and explain why a computer working with about $16$ significant digits cannot find it from the normal equations.
::: solution
$A(1,1) = (2, \delta, \delta) = \mathbf{b}$, so $\hat{\mathbf{x}} = (1,1)$, with zero error; the columns of $A$ are independent, so it is the unique least-squares solution. But

$$
A\T A = \begin{pmatrix}1 + \delta^2 & 1\\ 1 & 1 + \delta^2\end{pmatrix}, \qquad \delta^2 = 10^{-16}.
$$

In double-precision arithmetic, the number $1 + 10^{-16}$ is rounded to exactly $1$ (the gap between $1$ and the next representable number is about $2.2\times10^{-16}$). The computed $A\T A$ is therefore $\begin{pmatrix}1&1\\1&1\end{pmatrix}$, which is singular: the information that distinguished the columns has been rounded away before the solution even starts. The QR factorisation works with $A$ itself. Householder reflections (see the next remark) give, up to signs, $R\approx\begin{pmatrix}1&1\\0&\sqrt2\,\delta\end{pmatrix}$, which is perfectly invertible, and $R\hat{\mathbf{x}} = Q\T\mathbf{b}$ returns $(1, 1)$ to full accuracy. Plain Gram–Schmidt finds the same $R$, but here its computed $\mathbf{q}_2$ is not accurately orthogonal to $\mathbf{q}_1$, and the computed $Q\T\mathbf{b}$ leads to $(2, 0)$ instead — one reason why libraries prefer Householder reflections. (In the language of [[linear-algebra/svd]]: the condition number of $A$ is about $1.4\times 10^8$, harmless, while that of $A\T A$ is its square, about $2\times10^{16}$, beyond the precision of the arithmetic.)
:::
:::

::: remark How it is done in practice
Library routines compute the QR factorisation not by Gram–Schmidt but by **Householder reflections**, which are numerically more stable (MATLAB's backslash does this for a rectangular system), or use the singular value decomposition, which also copes with nearly dependent columns (as `numpy.linalg.lstsq` does). Very large sparse problems are solved iteratively. See [[numerical-analysis/direct-methods]] and [[numerical-analysis/iterative-methods]].
:::

::: history
The method of least squares was published by Adrien-Marie Legendre in 1805, in an appendix to a memoir on the orbits of comets, where he presented it as a convenient way to balance the errors of many inconsistent equations. Carl Friedrich Gauss published his account in 1809, in *Theoria motus corporum coelestium*, claiming to have used the method since 1795 — a claim that led to a bitter priority dispute. Gauss gave a probabilistic justification (with normally distributed errors) and solved the normal equations by systematic elimination; the method is often associated with his celebrated prediction of the position of the dwarf planet Ceres in 1801. In 1821–1823 he proved what is now called the Gauss–Markov theorem. The word *regression* came later, from Francis Galton's studies of heredity in the 1880s, in which the children of unusually tall parents tended to be less extreme: their heights "regressed" towards the mean.
:::

## Where this leads

Least squares is a projection, and the subsequent chapters refine the picture. The spectral theorem ([[linear-algebra/spectral-theorem]]) studies symmetric matrices such as $A\T A$, whose quadratic form $\mathbf{x}\T A\T A\mathbf{x} = \norm{A\mathbf{x}}^2$ is never negative. The singular value decomposition ([[linear-algebra/svd]]) solves least-squares problems even when the columns of $A$ are dependent, through the pseudoinverse, and explains numerical sensitivity through the condition number. In statistics, least squares is the foundation of linear regression, analysis of variance and much of machine learning ([[statistics/regression]]); in numerical analysis, it underlies data fitting and the approximation of functions ([[numerical-analysis/interpolation]]).

::: summary
- A least-squares solution minimises $\norm{\mathbf{b} - A\mathbf{x}}$, the root of the sum of squared errors; $A\hat{\mathbf{x}}$ is the projection of $\mathbf{b}$ onto $\operatorname{Col}(A)$.
- $\hat{\mathbf{x}}$ is a least-squares solution iff the residual is orthogonal to $\operatorname{Col}(A)$ iff it solves the normal equations $A\T A\hat{\mathbf{x}} = A\T\mathbf{b}$, which are always consistent ([[#thm-normal]]).
- $\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$; with independent columns, $\hat{\mathbf{x}} = (A\T A)^{-1}A\T\mathbf{b}$ is unique ([[#thm-unique-ls]]).
- The projection onto $\operatorname{Col}(A)$ has matrix $P = A(A\T A)^{-1}A\T$; a matrix is an orthogonal projection iff $P^2 = P = P\T$ ([[#thm-projection]]).
- Any model linear in its parameters can be fitted: lines ($\beta_1 = S_{xy}/S_{xx}$, through $(\bar x, \bar y)$), polynomials, trigonometric and transformed models.
- Orthogonal columns make fitting trivial; in general the QR method $R\hat{\mathbf{x}} = Q\T\mathbf{b}$ avoids the loss of accuracy caused by forming $A\T A$ ([[#thm-ls-qr]]).
:::

## Exercises

::: exercise Normal equations {level=1}
Find the least-squares solution of $2x_1 = 1$, $x_2 = 0$, $x_1 + x_2 = 3$, and the residual vector.
::: solution
$A = \begin{pmatrix}2&0\\0&1\\1&1\end{pmatrix}$, $\mathbf{b} = (1, 0, 3)$, $A\T A = \begin{pmatrix}5&1\\1&2\end{pmatrix}$, $A\T\mathbf{b} = (5, 3)$. The determinant is $9$, so $\hat{\mathbf{x}} = \frac19\begin{pmatrix}2&-1\\-1&5\end{pmatrix}\begin{pmatrix}5\\3\end{pmatrix} = \left(\frac79, \frac{10}{9}\right)$. Then $A\hat{\mathbf{x}} = \left(\frac{14}{9}, \frac{10}{9}, \frac{17}{9}\right)$ and $\mathbf{r} = \left(-\frac59, -\frac{10}{9}, \frac{10}{9}\right)$. Check: $\mathbf{r}\cdot(2,0,1) = -\frac{10}{9} + \frac{10}{9} = 0$ and $\mathbf{r}\cdot(0,1,1) = 0$.
:::
:::

::: exercise A least-squares line {level=1 check="3/2"}
Find the least-squares line $y = \beta_0 + \beta_1x$ for the points $(1,2)$, $(2,3)$, $(3,5)$. What is the slope?
::: solution
$\bar x = 2$, $\bar y = \frac{10}{3}$, $S_{xx} = 1 + 0 + 1 = 2$, $S_{xy} = (-1)(2 - \frac{10}{3}) + 0 + (1)(5 - \frac{10}{3}) = \frac43 + \frac53 = 3$. So $\beta_1 = \frac32$ and $\beta_0 = \frac{10}{3} - 3 = \frac13$: the line is $y = \frac13 + \frac32x$.
:::
:::

::: exercise Projection onto a line {level=1 check="1"}
Find the matrix $P$ of the orthogonal projection of $\R^3$ onto the line spanned by $(1,2,2)$, and its trace.
::: solution
$P = \dfrac{\mathbf{a}\mathbf{a}\T}{\mathbf{a}\T\mathbf{a}} = \dfrac19\begin{pmatrix}1&2&2\\2&4&4\\2&4&4\end{pmatrix}$, with trace $\frac{1 + 4 + 4}{9} = 1$, the dimension of the line.
:::
:::

::: exercise A parabola through four points {level=2 check="3/4"}
Fit $y = \beta_0 + \beta_1x + \beta_2x^2$ by least squares to $(-1, 1)$, $(0, 0)$, $(1, 1)$, $(2, 3)$. What is $\beta_2$?
::: solution
The design matrix has rows $(1, x, x^2)$ for $x = -1, 0, 1, 2$, and

$$
X\T X = \begin{pmatrix}4&2&6\\2&6&8\\6&8&18\end{pmatrix}, \qquad X\T\mathbf{y} = \begin{pmatrix}5\\6\\14\end{pmatrix}.
$$

(For instance $\sum x_i^2 = 1 + 0 + 1 + 4 = 6$ and $\sum x_i^2y_i = 1 + 0 + 1 + 12 = 14$.) Solving by elimination gives $\boldsymbol\beta = \left(\frac{3}{20}, -\frac{1}{20}, \frac34\right)$, so $y = 0.15 - 0.05x + 0.75x^2$ and $\beta_2 = \frac34$. Check the first normal equation: $4(0.15) + 2(-0.05) + 6(0.75) = 0.6 - 0.1 + 4.5 = 5$.
:::
:::

::: exercise A growth rate {level=2 check="3*ln(2)/2"}
In [[#ex-exponential]], verify the value of $k$ by forming and solving the normal equations for the line $z = \ln C + kt$ through $(0, 0)$, $(1, \ln 3)$, $(2, \ln 8)$.
::: solution
The design matrix has rows $(1, 0)$, $(1, 1)$, $(1, 2)$, so $X\T X = \begin{pmatrix}3&3\\3&5\end{pmatrix}$ and $X\T\mathbf{z} = (\ln 3 + \ln 8,\ \ln 3 + 2\ln 8)$. Subtracting the first normal equation from the second gives $2k = \ln 8$, so $k = \frac12\ln 8 = \frac32\ln 2\approx 1.040$. Then $3\ln C = \ln 3 + \ln 8 - 3k = \ln 3 - \frac32\ln 2$, i.e. $\ln C = \frac13\ln 3 - \frac12\ln 2$.
:::
:::

::: exercise Pythagoras for data {level=2}
Let $\hat{\mathbf{x}}$ be a least-squares solution of $A\mathbf{x} = \mathbf{b}$ and $\mathbf{r} = \mathbf{b} - A\hat{\mathbf{x}}$. Prove that $\norm{\mathbf{b}}^2 = \norm{A\hat{\mathbf{x}}}^2 + \norm{\mathbf{r}}^2$ and that $\norm{\mathbf{r}}^2 = \mathbf{b}\T\mathbf{b} - \mathbf{b}\T A\hat{\mathbf{x}}$.
::: solution
$A\hat{\mathbf{x}}\in\operatorname{Col}(A)$ and $\mathbf{r}\perp\operatorname{Col}(A)$ by [[#thm-normal]], so Pythagoras applied to $\mathbf{b} = A\hat{\mathbf{x}} + \mathbf{r}$ gives the first identity. For the second, $\norm{\mathbf{r}}^2 = \mathbf{r}\T(\mathbf{b} - A\hat{\mathbf{x}}) = \mathbf{r}\T\mathbf{b} - \mathbf{r}\T A\hat{\mathbf{x}} = \mathbf{r}\T\mathbf{b}$, since $\mathbf{r}\perp A\hat{\mathbf{x}}$; and $\mathbf{r}\T\mathbf{b} = \mathbf{b}\T\mathbf{b} - \hat{\mathbf{x}}\T A\T\mathbf{b} = \mathbf{b}\T\mathbf{b} - \mathbf{b}\T A\hat{\mathbf{x}}$. (In [[#ex-line]]: $\mathbf{b}\T\mathbf{b} = 42$, $\mathbf{b}\T A\hat{\mathbf{x}} = 1\cdot\frac32 + 3\cdot\frac52 + 4\cdot\frac72 + 4\cdot\frac92 = 41$, and indeed $\norm{\mathbf{r}}^2 = 1$.)
:::
:::

::: exercise Weighted least squares {level=2}
Given weights $w_1, \dots, w_m > 0$, show that the vectors $\mathbf{x}$ minimising $\sum_{i=1}^m w_i\bigl(b_i - (A\mathbf{x})_i\bigr)^2$ are the solutions of $A\T WA\mathbf{x} = A\T W\mathbf{b}$, where $W = \diag(w_1, \dots, w_m)$.
::: solution
Let $W^{1/2} = \diag(\sqrt{w_1}, \dots, \sqrt{w_m})$. Then $\sum w_i(b_i - (A\mathbf{x})_i)^2 = \norm{W^{1/2}\mathbf{b} - W^{1/2}A\mathbf{x}}^2$, an ordinary least-squares problem for the matrix $W^{1/2}A$ and vector $W^{1/2}\mathbf{b}$. By [[#thm-normal]] its solutions are those of $(W^{1/2}A)\T(W^{1/2}A)\mathbf{x} = (W^{1/2}A)\T W^{1/2}\mathbf{b}$, that is, $A\T WA\mathbf{x} = A\T W\mathbf{b}$, since $(W^{1/2})\T W^{1/2} = W$. (Equivalently: we are using the weighted inner product of [[linear-algebra/inner-products]].)
:::
:::

::: exercise Trace of a projection {level=3 #exr-proj-trace}
Let $P$ be the matrix of the orthogonal projection of $\R^m$ onto a $k$-dimensional subspace $W$. Prove that $\tr P = \rank P = k$.
::: solution
Choose an orthonormal basis $\mathbf{q}_1, \dots, \mathbf{q}_k$ of $W$ and let $Q = (\mathbf{q}_1\ \cdots\ \mathbf{q}_k)$, so that $P = QQ\T$. Using $\tr(XY) = \tr(YX)$ ([[linear-algebra/matrices#exr-trace]], which holds for rectangular $X, Y$ by the same proof), $\tr P = \tr(QQ\T) = \tr(Q\T Q) = \tr I_k = k$. The column space of $P$ is $W$ (every $P\mathbf{v}$ lies in $W$, and $P\mathbf{w} = \mathbf{w}$ for $\mathbf{w}\in W$), so $\rank P = \dim W = k$.
:::
:::

::: exercise The shortest solution {level=3 #exr-shortest}
Suppose $A\mathbf{x} = \mathbf{b}$ is consistent. Prove that it has exactly one solution $\mathbf{x}^+$ lying in $\operatorname{Row}(A)$, and that $\mathbf{x}^+$ is the solution of smallest length. Find it for the single equation $x_1 + x_2 + x_3 = 3$.
::: hint
Decompose any solution as $\mathbf{x} = \mathbf{x}_r + \mathbf{x}_n$ with $\mathbf{x}_r\in\operatorname{Row}(A)$ and $\mathbf{x}_n\in\operatorname{Nul}(A) = \operatorname{Row}(A)^\perp$.
:::
::: solution
Let $\mathbf{x}$ be any solution and decompose $\mathbf{x} = \mathbf{x}_r + \mathbf{x}_n$ as in the hint ([[linear-algebra/inner-products#thm-fundamental]] and [[linear-algebra/inner-products#thm-decomposition]]). Since $A\mathbf{x}_n = \mathbf{0}$, $A\mathbf{x}_r = \mathbf{b}$, so $\mathbf{x}_r$ is a solution in $\operatorname{Row}(A)$. If $\mathbf{x}', \mathbf{x}''$ are two solutions in $\operatorname{Row}(A)$, their difference is in $\operatorname{Row}(A)\cap\operatorname{Nul}(A) = \{\mathbf{0}\}$; so $\mathbf{x}^+ = \mathbf{x}_r$ is unique. Every solution has the form $\mathbf{x}^+ + \mathbf{h}$ with $\mathbf{h}\in\operatorname{Nul}(A)\perp\mathbf{x}^+$, so $\norm{\mathbf{x}^+ + \mathbf{h}}^2 = \norm{\mathbf{x}^+}^2 + \norm{\mathbf{h}}^2\ge\norm{\mathbf{x}^+}^2$, with equality only for $\mathbf{h} = \mathbf{0}$. For $x_1 + x_2 + x_3 = 3$, $\operatorname{Row}(A)$ is spanned by $(1,1,1)$; the solution $t(1,1,1)$ needs $3t = 3$, so $\mathbf{x}^+ = (1,1,1)$, of length $\sqrt3$.
:::
:::

::: exercise Rank of AᵀA {level=3}
Prove that $\rank(A\T A) = \rank A$ and $\operatorname{Col}(A\T A) = \operatorname{Col}(A\T)$. Deduce, without using projections, that the normal equations are always consistent.
::: solution
By [[#thm-unique-ls]], $\operatorname{Nul}(A\T A) = \operatorname{Nul}(A)$; both matrices have $n$ columns, so by rank–nullity $\rank(A\T A) = n - \dim\operatorname{Nul}(A) = \rank A$. Next, $\operatorname{Col}(A\T A)\subseteq\operatorname{Col}(A\T)$ because $A\T A\mathbf{x} = A\T(A\mathbf{x})$, and both spaces have dimension $\rank A = \rank A\T$; so they are equal. Since $A\T\mathbf{b}\in\operatorname{Col}(A\T) = \operatorname{Col}(A\T A)$, the system $A\T A\mathbf{x} = A\T\mathbf{b}$ is consistent.
:::
:::
