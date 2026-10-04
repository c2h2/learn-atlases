Two tanks of brine are connected by pipes, so that salt flows from each into the other; two masses are joined by springs, so that each pulls on the other; a predator and its prey, near equilibrium, each affect the other's growth rate. In all of these, several quantities change at once and the rate of change of each depends on all of them. Writing $\mathbf{x}(t) = (x_1(t), \dots, x_n(t))$ for the state, the simplest such models are **linear systems**

$$
\mathbf{x}' = A\,\mathbf{x},
$$ {#eq-system}

where $A$ is an $n\times n$ matrix. For $n = 1$ this is $x' = ax$ with solution $x = e^{at}x_0$. It is natural to hope that [[#eq-system]] is solved by "$\mathbf{x} = e^{At}\mathbf{x}_0$" — and it is, once we have made sense of the exponential of a matrix.

This chapter brings linear algebra and differential equations together. We first show that the solutions of [[#eq-system]] form an $n$-dimensional vector space and generalise the Wronskian. Then we find explicit solutions from the eigenvalues and eigenvectors of $A$ ([[linear-algebra/eigenvalues]]), including the complex and defective cases, define the matrix exponential and prove its properties, and finally classify the possible phase portraits of planar systems. The classification will be the foundation for the study of nonlinear systems in [[ode/nonlinear-systems]].

## Linear systems in matrix form

::: definition Linear system {#def-system}
A **linear system** of first-order equations is

$$
\mathbf{x}'(t) = A(t)\,\mathbf{x}(t) + \mathbf{f}(t),
$$ {#eq-linear-system}

where $A(t)$ is an $n\times n$ matrix and $\mathbf{f}(t)$ a vector, with entries continuous on an interval $I$. It is **homogeneous** if $\mathbf{f}\equiv\mathbf{0}$ and has **constant coefficients** if $A$ does not depend on $t$. An initial value problem adds $\mathbf{x}(t_0) = \mathbf{x}_0$.
:::

Systems include all linear equations of higher order. Given $y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_1y' + a_0y = g$, put $x_1 = y$, $x_2 = y'$, …, $x_n = y^{(n-1)}$. Then $x_k' = x_{k+1}$ for $k < n$, and the equation itself gives $x_n'$, so

$$
\mathbf{x}' = \begin{pmatrix} 0 & 1 & & \\ & \ddots & \ddots & \\ & & 0 & 1 \\ -a_0 & -a_1 & \cdots & -a_{n-1}\end{pmatrix}\mathbf{x} + \begin{pmatrix}0\\ \vdots\\ 0 \\ g\end{pmatrix}.
$$

The matrix is the **companion matrix** of the equation, and its characteristic polynomial is (up to sign) the characteristic polynomial of the equation. For example $y'' + 3y' + 2y = 0$ becomes $\mathbf{x}' = \begin{pmatrix}0 & 1\\ -2 & -3\end{pmatrix}\mathbf{x}$, whose eigenvalues $-1$ and $-2$ are the roots of $r^2 + 3r + 2$. Conversely, many systems — though not all — can be reduced to a single higher-order equation by elimination, but the system viewpoint is usually clearer.

::: theorem Existence and uniqueness for linear systems {#thm-eu-system}
If $A(t)$ and $\mathbf{f}(t)$ are continuous on an open interval $I$, then for every $t_0\in I$ and $\mathbf{x}_0\in\R^n$ the IVP $\mathbf{x}' = A(t)\mathbf{x} + \mathbf{f}(t)$, $\mathbf{x}(t_0) = \mathbf{x}_0$ has exactly one solution, and it is defined on all of $I$.
:::

::: proof
Fix a closed interval $J = [\alpha,\beta]\subseteq I$ containing $t_0$ and use the Euclidean norm on $\R^n$ with the corresponding operator norm on matrices. Let $L = \max_J\norm{A(t)}$ and $K = \max_J\norm{A(t)\mathbf{x}_0 + \mathbf{f}(t)}$, both finite by continuity. Define Picard iterates $\mathbf{x}_0(t)\equiv\mathbf{x}_0$ and

$$
\mathbf{x}_{k+1}(t) = \mathbf{x}_0 + \int_{t_0}^t\bigl(A(s)\mathbf{x}_k(s) + \mathbf{f}(s)\bigr)\,ds .
$$

Using $\norm{\int\mathbf{v}}\le\lvert\int\norm{\mathbf{v}}\rvert$ and $\norm{A(s)(\mathbf{x}_{k} - \mathbf{x}_{k-1})}\le L\norm{\mathbf{x}_k - \mathbf{x}_{k-1}}$, the induction of [[ode/existence-uniqueness#thm-picard]] gives $\norm{\mathbf{x}_{k+1}(t) - \mathbf{x}_k(t)}\le KL^k\lvert t - t_0\rvert^{k+1}/(k+1)!$ on $J$. The Weierstrass M-test gives uniform convergence on $J$ to a continuous $\mathbf{x}$, which satisfies the integral equation and hence the IVP; Gronwall's inequality ([[ode/existence-uniqueness#lem-gronwall]]) applied to $\norm{\mathbf{x} - \mathbf{z}}$ gives uniqueness. This is exactly [[ode/existence-uniqueness#thm-global]] with absolute values replaced by norms. Since $J$ was arbitrary, the solution exists on all of $I$.
:::

## The structure of the solution space

From now on we study the homogeneous system $\mathbf{x}' = A(t)\mathbf{x}$. By linearity, any linear combination of solutions is a solution; the solutions form a vector space. Its dimension is the number of equations.

::: theorem Dimension of the solution space {#thm-dimension}
The solutions of $\mathbf{x}' = A(t)\mathbf{x}$ on $I$ form a vector space $S$ of dimension $n$. For any $t_0\in I$, the evaluation map $E\colon S\to\R^n$, $E(\mathbf{x}) = \mathbf{x}(t_0)$, is a linear isomorphism. Consequently, solutions $\mathbf{x}^{(1)},\dots,\mathbf{x}^{(n)}$ form a basis of $S$ if and only if the vectors $\mathbf{x}^{(1)}(t_0),\dots,\mathbf{x}^{(n)}(t_0)$ are linearly independent for some (equivalently, every) $t_0$.
:::

::: proof
$E$ is linear. It is surjective because for every $\mathbf{x}_0$ the IVP with $\mathbf{x}(t_0) = \mathbf{x}_0$ has a solution, and injective because the only solution with $\mathbf{x}(t_0) = \mathbf{0}$ is the zero solution, by uniqueness ([[#thm-eu-system]]). An isomorphism maps bases to bases, which gives the remaining statements; and since $t_0$ was arbitrary, independence at one $t_0$ implies independence at every $t$.
:::

::: definition Fundamental matrix {#def-fundamental}
A **fundamental matrix** for $\mathbf{x}' = A(t)\mathbf{x}$ is an $n\times n$ matrix function $\Phi(t)$ whose columns are $n$ linearly independent solutions. Then $\Phi' = A\Phi$, $\Phi(t)$ is invertible for every $t$, every solution is $\mathbf{x}(t) = \Phi(t)\mathbf{c}$ for a constant vector $\mathbf{c}$, and the solution with $\mathbf{x}(t_0) = \mathbf{x}_0$ is

$$
\mathbf{x}(t) = \Phi(t)\,\Phi(t_0)^{-1}\,\mathbf{x}_0 .
$$
:::

The determinant $\det\Phi(t)$ is the **Wronskian** of the $n$ solutions. For the system obtained from a second-order equation it is exactly the Wronskian of [[ode/second-order-linear#def-wronskian]], and Abel's identity generalises as follows.

::: theorem Liouville's formula {#thm-liouville}
If $\Phi$ is a fundamental matrix (or any matrix solution of $\Phi' = A(t)\Phi$), then

$$
\det\Phi(t) = \det\Phi(t_0)\,\exp\left(\int_{t_0}^t\tr A(s)\,ds\right).
$$ {#eq-liouville}
:::

::: proof
Let $\boldsymbol{\varphi}_1,\dots,\boldsymbol{\varphi}_n$ be the **rows** of $\Phi$. The determinant is linear in each row separately, so by the product rule

$$
(\det\Phi)' = \sum_{i=1}^n\det\bigl(\Phi\text{ with row } i \text{ replaced by } \boldsymbol{\varphi}_i'\bigr).
$$

Since $\Phi' = A\Phi$, row $i$ of $\Phi'$ is $\boldsymbol{\varphi}_i' = \sum_ja_{ij}\boldsymbol{\varphi}_j$. Expanding the $i$th determinant by linearity in row $i$, every term with $j\neq i$ has two equal rows and vanishes, leaving $a_{ii}\det\Phi$. Hence $(\det\Phi)' = \bigl(\sum_ia_{ii}\bigr)\det\Phi = \tr A(t)\,\det\Phi$, a scalar linear equation whose solution is [[#eq-liouville]].
:::

In particular, the Wronskian of $n$ solutions is either never zero or identically zero, as for second-order equations. For a second-order equation $y'' + py' + qy = 0$ the companion matrix has trace $-p$, and [[#eq-liouville]] reduces to Abel's identity [[ode/second-order-linear#thm-abel]].

## The eigenvalue method

For constant $A$ we can find solutions explicitly. Try $\mathbf{x}(t) = e^{\lambda t}\mathbf{v}$ with a constant vector $\mathbf{v}\neq\mathbf{0}$. Then $\mathbf{x}' = \lambda e^{\lambda t}\mathbf{v}$ and $A\mathbf{x} = e^{\lambda t}A\mathbf{v}$, so

$$
e^{\lambda t}\mathbf{v}\text{ is a solution} \iff A\mathbf{v} = \lambda\mathbf{v}.
$$

**Straight-line solutions are eigenvectors.** Geometrically, $e^{\lambda t}\mathbf{v}$ moves along the line through $\mathbf{v}$, towards the origin if $\lambda < 0$ and away from it if $\lambda > 0$.

::: theorem The eigenvalue method {#thm-eigen}
If the constant matrix $A$ has $n$ linearly independent eigenvectors $\mathbf{v}_1,\dots,\mathbf{v}_n$ with eigenvalues $\lambda_1,\dots,\lambda_n$ (not necessarily distinct), then the general solution of $\mathbf{x}' = A\mathbf{x}$ is

$$
\mathbf{x}(t) = c_1e^{\lambda_1t}\mathbf{v}_1 + c_2e^{\lambda_2t}\mathbf{v}_2 + \dots + c_ne^{\lambda_nt}\mathbf{v}_n .
$$
:::

::: proof
Each $e^{\lambda_it}\mathbf{v}_i$ is a solution, and at $t = 0$ their values $\mathbf{v}_1,\dots,\mathbf{v}_n$ are independent, so by [[#thm-dimension]] they form a basis of the solution space.
:::

This applies in particular when $A$ has $n$ distinct eigenvalues, since eigenvectors for distinct eigenvalues are independent, and when $A$ is symmetric, by the spectral theorem ([[linear-algebra/spectral-theorem]]).

::: example A saddle {#ex-saddle}
Solve $\mathbf{x}' = \begin{pmatrix}1 & 1\\ 4 & 1\end{pmatrix}\mathbf{x}$, $\mathbf{x}(0) = \begin{pmatrix}2\\0\end{pmatrix}$.
::: solution
The characteristic polynomial is $(1 - \lambda)^2 - 4 = (\lambda - 3)(\lambda + 1)$. For $\lambda = 3$, $(A - 3I)\mathbf{v} = \mathbf{0}$ reads $-2v_1 + v_2 = 0$, so $\mathbf{v}_1 = (1, 2)$. For $\lambda = -1$, $2v_1 + v_2 = 0$ gives $\mathbf{v}_2 = (1,-2)$. The general solution is

$$
\mathbf{x}(t) = c_1e^{3t}\begin{pmatrix}1\\2\end{pmatrix} + c_2e^{-t}\begin{pmatrix}1\\-2\end{pmatrix},
$$

and $\mathbf{x}(0) = (2,0)$ gives $c_1 + c_2 = 2$, $2c_1 - 2c_2 = 0$, so $c_1 = c_2 = 1$. Solutions starting on the line through $(1,-2)$ approach the origin; all others are eventually swept out along the direction $(1,2)$. The origin is a **saddle**: it attracts along one line and repels along another.
:::
:::

::: widget phaseplane
matrix: 1, 1; 4, 1
x: -3, 3
y: -3, 3
points: 2, 0; 0.5, -1; -0.5, 1; -2, 0.2
caption: The saddle of [[#ex-saddle]]. The two straight-line solutions lie along the eigenvectors $(1,2)$ (unstable, $\lambda = 3$) and $(1,-2)$ (stable, $\lambda = -1$). Click to start new trajectories: only those starting exactly on the stable line reach the origin. Try making the bottom-left entry negative and watch the saddle turn into a spiral.
:::

### Complex eigenvalues

A real matrix may have complex eigenvalues, which come in conjugate pairs. The complex solutions $e^{\lambda t}\mathbf{v}$ are still solutions, and real solutions are hidden inside them.

::: proposition Real solutions from complex eigenvalues {#prop-complex}
Let $A$ be real, and let $A\mathbf{v} = \lambda\mathbf{v}$ with $\lambda = \alpha + i\beta$, $\beta\neq0$, and $\mathbf{v} = \mathbf{a} + i\mathbf{b}$ with $\mathbf{a},\mathbf{b}\in\R^n$. Then

$$
\mathbf{x}_1(t) = e^{\alpha t}\bigl(\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t\bigr), \qquad \mathbf{x}_2(t) = e^{\alpha t}\bigl(\mathbf{a}\sin\beta t + \mathbf{b}\cos\beta t\bigr)
$$

are linearly independent real solutions of $\mathbf{x}' = A\mathbf{x}$.
:::

::: proof
By Euler's formula, $e^{\lambda t}\mathbf{v} = e^{\alpha t}(\cos\beta t + i\sin\beta t)(\mathbf{a} + i\mathbf{b}) = \mathbf{x}_1 + i\,\mathbf{x}_2$. Since $A$ is real, the real and imaginary parts of the complex solution $\mathbf{z} = e^{\lambda t}\mathbf{v}$ satisfy $\mathbf{x}_1' + i\mathbf{x}_2' = A\mathbf{x}_1 + iA\mathbf{x}_2$ separately. At $t = 0$ their values are $\mathbf{a}$ and $\mathbf{b}$. These are independent: $\bar{\mathbf{v}} = \mathbf{a} - i\mathbf{b}$ is an eigenvector for $\bar\lambda\neq\lambda$, so $\mathbf{v},\bar{\mathbf{v}}$ are independent over $\C$, and $\mathbf{a} = \frac12(\mathbf{v} + \bar{\mathbf{v}})$, $\mathbf{b} = \frac{1}{2i}(\mathbf{v} - \bar{\mathbf{v}})$ span the same two-dimensional space. By [[#thm-dimension]] the solutions are independent.
:::

::: example A spiral {#ex-spiral}
Find the general solution of $\mathbf{x}' = \begin{pmatrix}-1 & 2\\ -2 & -1\end{pmatrix}\mathbf{x}$ and describe the trajectories.
::: solution
The characteristic polynomial $(\lambda + 1)^2 + 4$ has roots $\lambda = -1\pm2i$. For $\lambda = -1 + 2i$, $(A - \lambda I)\mathbf{v} = \begin{pmatrix}-2i & 2\\ -2 & -2i\end{pmatrix}\mathbf{v} = \mathbf{0}$ gives $\mathbf{v} = (1, i)$, so $\mathbf{a} = (1,0)$, $\mathbf{b} = (0,1)$. By [[#prop-complex]],

$$
\mathbf{x}(t) = c_1e^{-t}\begin{pmatrix}\cos 2t\\ -\sin 2t\end{pmatrix} + c_2e^{-t}\begin{pmatrix}\sin 2t\\ \cos 2t\end{pmatrix}.
$$

Each solution is a rotation at angular speed $2$ combined with the decay factor $e^{-t}$: the trajectories are spirals into the origin, a **stable spiral** (or spiral sink). The direction of rotation can be read off from one vector of the field: at $(1,0)$, $\mathbf{x}' = (-1,-2)$ points downward, so the spirals turn clockwise.
:::
:::

### Repeated eigenvalues

If an eigenvalue $\lambda$ of algebraic multiplicity $m$ has fewer than $m$ independent eigenvectors, [[#thm-eigen]] does not supply enough solutions. The missing ones involve powers of $t$, as for repeated characteristic roots in [[ode/second-order-linear#thm-constant]], and **generalised eigenvectors** ([[linear-algebra/jordan-form]]).

::: proposition A solution from a generalised eigenvector {#prop-generalised}
If $(A - \lambda I)\mathbf{v} = \mathbf{0}$ and $(A - \lambda I)\mathbf{w} = \mathbf{v}$, then $\mathbf{x}(t) = e^{\lambda t}(t\,\mathbf{v} + \mathbf{w})$ is a solution of $\mathbf{x}' = A\mathbf{x}$, independent of $e^{\lambda t}\mathbf{v}$ when $\mathbf{v}\neq\mathbf{0}$.
:::

::: proof
$\mathbf{x}' = \lambda e^{\lambda t}(t\mathbf{v} + \mathbf{w}) + e^{\lambda t}\mathbf{v}$, while $A\mathbf{x} = e^{\lambda t}(tA\mathbf{v} + A\mathbf{w}) = e^{\lambda t}\bigl(t\lambda\mathbf{v} + \lambda\mathbf{w} + \mathbf{v}\bigr)$. These agree. At $t = 0$ the two solutions take the values $\mathbf{w}$ and $\mathbf{v}$, which are independent: if $\mathbf{w} = c\mathbf{v}$ then $(A - \lambda I)\mathbf{w} = \mathbf{0}\neq\mathbf{v}$.
:::

::: example A defective matrix {#ex-defective}
Solve $\mathbf{x}' = \begin{pmatrix}1 & -1\\ 1 & 3\end{pmatrix}\mathbf{x}$.
::: solution
The characteristic polynomial is $(1-\lambda)(3 - \lambda) + 1 = (\lambda - 2)^2$, so $\lambda = 2$ is a double eigenvalue. Now $A - 2I = \begin{pmatrix}-1 & -1\\ 1 & 1\end{pmatrix}$ has rank one, so there is only one independent eigenvector, $\mathbf{v} = (1,-1)$. Solve $(A - 2I)\mathbf{w} = \mathbf{v}$: $-w_1 - w_2 = 1$, so we may take $\mathbf{w} = (-1, 0)$. By [[#prop-generalised]] the general solution is

$$
\mathbf{x}(t) = c_1e^{2t}\begin{pmatrix}1\\-1\end{pmatrix} + c_2e^{2t}\begin{pmatrix}t - 1\\ -t\end{pmatrix}.
$$

All solutions leave the origin, and as $t\to\pm\infty$ each becomes tangent to the single eigendirection $(1,-1)$: an **improper (degenerate) node**.
:::
:::

::: widget phaseplane
matrix: 1, -1; 1, 3
x: -3, 3
y: -3, 3
points: 0.1, 0.1; -0.1, 0.2; 0.2, -0.05; -0.2, -0.1
caption: The improper node of [[#ex-defective]]. There is only one straight-line solution, along $(1,-1)$; every other trajectory leaves the origin tangent to it and turns to become parallel to it far away. Move the diagonal entries further apart and the double eigenvalue splits into two real ones with a second eigendirection (a node); move them closer together and the eigenvalues become complex (a spiral).
:::

## The matrix exponential

The eigenvalue method requires case distinctions. The matrix exponential gives one formula that covers every case, and it is the right object for theory.

::: definition Matrix exponential {#def-expm}
For a square matrix $M$, the **matrix exponential** is

$$
e^{M} = \sum_{k=0}^\infty\frac{M^k}{k!} = I + M + \frac{M^2}{2!} + \frac{M^3}{3!} + \cdots .
$$
:::

::: theorem The exponential solves the system {#thm-expm}
Let $A$ be an $n\times n$ matrix.

1. The series for $e^{At}$ converges absolutely for every $t$, uniformly on bounded intervals.
2. $\dfrac{d}{dt}e^{At} = Ae^{At} = e^{At}A$, and $e^{A\cdot0} = I$.
3. For every $\mathbf{x}_0$, the unique solution of $\mathbf{x}' = A\mathbf{x}$, $\mathbf{x}(0) = \mathbf{x}_0$ is $\mathbf{x}(t) = e^{At}\mathbf{x}_0$. Thus $e^{At}$ is the fundamental matrix with $\Phi(0) = I$.
:::

::: proof
1. With an operator norm, $\norm{M^k}\le\norm M^k$, so for $\lvert t\rvert\le T$ the $k$th term satisfies $\norm{A^kt^k/k!}\le(\norm AT)^k/k!$. Since $\sum(\norm AT)^k/k! = e^{\norm AT} < \infty$, the Weierstrass M-test (applied entry by entry, each entry being bounded by the norm) gives absolute and uniform convergence on $[-T,T]$.

2. Differentiating term by term, $\frac{d}{dt}\frac{A^kt^k}{k!} = A\,\frac{A^{k-1}t^{k-1}}{(k-1)!}$, and the differentiated series is $A$ times the original series, which converges uniformly on bounded intervals by part 1. A series of differentiable functions that converges, and whose series of derivatives converges uniformly, may be differentiated term by term ([[real-analysis/uniform-convergence]]). Hence $\frac{d}{dt}e^{At} = Ae^{At}$; the same computation with $A$ factored on the right gives $e^{At}A$.

3. By part 2, $\mathbf{x}(t) = e^{At}\mathbf{x}_0$ satisfies $\mathbf{x}' = Ae^{At}\mathbf{x}_0 = A\mathbf{x}$ and $\mathbf{x}(0) = \mathbf{x}_0$; uniqueness is [[#thm-eu-system]].
:::

::: proposition Properties of the matrix exponential {#prop-expm}
For square matrices $A$, $B$ and an invertible $P$:

1. $e^{A(t+s)} = e^{At}e^{As}$ for all $s, t$; in particular $e^{At}$ is invertible with inverse $e^{-At}$.
2. If $AB = BA$, then $e^{(A+B)t} = e^{At}e^{Bt}$.
3. $e^{PDP^{-1}t} = P\,e^{Dt}\,P^{-1}$, and $e^{Dt} = \diag(e^{d_1t},\dots,e^{d_nt})$ for $D = \diag(d_1,\dots,d_n)$.
:::

::: proof
1. Fix $s$. Both $X(t) = e^{A(t+s)}$ and $Y(t) = e^{At}e^{As}$ satisfy $X' = AX$ with $X(0) = e^{As}$, so they agree column by column by uniqueness. With $s = -t$, $e^{At}e^{-At} = e^{0} = I$.

2. If $B$ commutes with $A$, it commutes with every partial sum of the series for $e^{At}$, hence with $e^{At}$. Let $Y(t) = e^{At}e^{Bt}$. Then $Y' = Ae^{At}e^{Bt} + e^{At}Be^{Bt} = (A + B)Y$ and $Y(0) = I$, which are also the defining properties of $e^{(A+B)t}$; uniqueness gives equality.

3. $(PDP^{-1})^k = PD^kP^{-1}$ (the inner factors cancel), so each partial sum of $e^{PDP^{-1}t}$ equals $P(\text{partial sum of } e^{Dt})P^{-1}$; let the number of terms tend to infinity. For diagonal $D$, $D^k = \diag(d_i^k)$ and the series sums entrywise to $\diag(e^{d_it})$.
:::

::: warning Exponentials of non-commuting matrices
For numbers $e^{a+b} = e^ae^b$, but for matrices this can fail when $AB\neq BA$. With $A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$ and $B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$, $e^Ae^B = \begin{pmatrix}2&1\\1&1\end{pmatrix}$ while $e^{A+B} = \begin{pmatrix}\cosh1&\sinh1\\ \sinh1&\cosh1\end{pmatrix}$ ([[#exr-6-7]]). Always check commutativity before splitting an exponential.
:::

Three ways to compute $e^{At}$ in practice:

- **Diagonalisable $A$**: if $A = PDP^{-1}$, then $e^{At} = Pe^{Dt}P^{-1}$ — the eigenvalue method in matrix form.
- **Nilpotent parts**: if $A = \lambda I + N$ with $N^m = 0$, then $\lambda I$ commutes with $N$ and $e^{At} = e^{\lambda t}\bigl(I + Nt + \dots + N^{m-1}t^{m-1}/(m-1)!\bigr)$, a *finite* sum. Every matrix is similar to a block-diagonal matrix of such blocks (the Jordan form).
- **Special structure**: use the series directly, as in the next example.

::: example Exponential by diagonalisation {#ex-expm-diag}
Compute $e^{At}$ for the saddle matrix $A = \begin{pmatrix}1&1\\4&1\end{pmatrix}$ of [[#ex-saddle]].
::: solution
From [[#ex-saddle]], $A = PDP^{-1}$ with $P = \begin{pmatrix}1&1\\2&-2\end{pmatrix}$ (eigenvectors as columns) and $D = \diag(3,-1)$. Then $P^{-1} = \begin{pmatrix}1/2&1/4\\1/2&-1/4\end{pmatrix}$ and

$$
e^{At} = P\begin{pmatrix}e^{3t}&0\\0&e^{-t}\end{pmatrix}P^{-1} = \begin{pmatrix}\tfrac12\bigl(e^{3t} + e^{-t}\bigr) & \tfrac14\bigl(e^{3t} - e^{-t}\bigr)\\ e^{3t} - e^{-t} & \tfrac12\bigl(e^{3t} + e^{-t}\bigr)\end{pmatrix}.
$$

Check: at $t = 0$ this is $I$, and its first column $e^{At}(1,0)$ is the solution starting at $(1,0)$, half of the solution found in [[#ex-saddle]], as it should be by linearity.
:::
:::

::: example Two exponentials {#ex-expm}
Compute $e^{At}$ for (a) $A = \begin{pmatrix}2&1\\0&2\end{pmatrix}$ and (b) $A = \begin{pmatrix}0&-\omega\\ \omega&0\end{pmatrix}$.
::: solution
(a) $A = 2I + N$ with $N = \begin{pmatrix}0&1\\0&0\end{pmatrix}$, $N^2 = 0$, and $2I$ commutes with $N$. By [[#prop-expm]], $e^{At} = e^{2t}e^{Nt} = e^{2t}(I + Nt)$:

$$
e^{At} = e^{2t}\begin{pmatrix}1 & t\\ 0 & 1\end{pmatrix}.
$$

(b) Here $A^2 = -\omega^2I$, so $A^{2k} = (-1)^k\omega^{2k}I$ and $A^{2k+1} = (-1)^k\omega^{2k}A$. Splitting the series into even and odd terms,

$$
e^{At} = \sum_k\frac{(-1)^k(\omega t)^{2k}}{(2k)!}I + \frac{1}{\omega}\sum_k\frac{(-1)^k(\omega t)^{2k+1}}{(2k+1)!}A = \cos\omega t\,I + \frac{\sin\omega t}{\omega}A = \begin{pmatrix}\cos\omega t & -\sin\omega t\\ \sin\omega t & \cos\omega t\end{pmatrix}.
$$

The exponential of an infinitesimal rotation is a rotation: the solutions of $\mathbf{x}' = A\mathbf{x}$ go round circles at angular speed $\omega$.
:::
:::

::: quiz
What is $e^{At}$ for $A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$?
- [ ] $\begin{pmatrix}1&e^t\\0&1\end{pmatrix}$
- [x] $\begin{pmatrix}1&t\\0&1\end{pmatrix}$
- [ ] $\begin{pmatrix}e^t&e^t\\0&e^t\end{pmatrix}$
- [ ] $\begin{pmatrix}1&0\\0&1\end{pmatrix}$, because $A^2 = 0$
::: solution
$A^2 = 0$, so the series stops after two terms: $e^{At} = I + At = \begin{pmatrix}1&t\\0&1\end{pmatrix}$. This is the system $x_1' = x_2$, $x_2' = 0$: constant velocity, linearly growing position. Exponentiating entry by entry (the first and third options) is a common mistake.
:::
:::

The exponential also solves the non-homogeneous system, by the same integrating-factor trick as in [[ode/first-order#thm-linear]].

::: theorem Variation of parameters for systems {#thm-vop-system}
If $\mathbf{f}$ is continuous, the solution of $\mathbf{x}' = A\mathbf{x} + \mathbf{f}(t)$, $\mathbf{x}(0) = \mathbf{x}_0$ is

$$
\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\,\mathbf{f}(s)\,ds .
$$ {#eq-vop-system}
:::

::: proof
Multiply by the "integrating factor" $e^{-At}$. By [[#thm-expm]] and the product rule, $\bigl(e^{-At}\mathbf{x}\bigr)' = e^{-At}\mathbf{x}' - e^{-At}A\mathbf{x} = e^{-At}\mathbf{f}(t)$ for any solution. Integrating from $0$ to $t$, $e^{-At}\mathbf{x}(t) - \mathbf{x}_0 = \int_0^te^{-As}\mathbf{f}(s)\,ds$, and multiplying by $e^{At}$ (using [[#prop-expm]], $e^{At}e^{-As} = e^{A(t-s)}$) gives [[#eq-vop-system]]. Conversely, differentiating [[#eq-vop-system]] shows that it is a solution.
:::

The integral is a convolution of the forcing with the matrix "impulse response" $e^{At}$, exactly as in [[ode/laplace-transform#thm-convolution]]; indeed $\mathcal{L}\{e^{At}\} = (sI - A)^{-1}$.

::: example A forced rotation {#ex-forced-system}
Solve $\mathbf{x}' = \begin{pmatrix}0&1\\-1&0\end{pmatrix}\mathbf{x} + \begin{pmatrix}0\\1\end{pmatrix}$, $\mathbf{x}(0) = \mathbf{0}$.
::: solution
By [[#ex-expm]] (b) with $\omega = -1$, $e^{At} = \begin{pmatrix}\cos t&\sin t\\-\sin t&\cos t\end{pmatrix}$. By [[#eq-vop-system]],

$$
\mathbf{x}(t) = \int_0^t\begin{pmatrix}\cos(t-s)&\sin(t-s)\\-\sin(t-s)&\cos(t-s)\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}ds = \int_0^t\begin{pmatrix}\sin(t-s)\\ \cos(t-s)\end{pmatrix}ds = \begin{pmatrix}1 - \cos t\\ \sin t\end{pmatrix}.
$$

The system is $x_1'' + x_1 = 1$ in disguise ($x_2 = x_1'$), and the answer is the familiar response $1 - \cos t$ of an undamped oscillator to a constant force: a circle of radius $1$ around the new equilibrium $(1,0)$.
:::
:::

## Phase portraits in the plane

For a $2\times2$ real matrix $A$ with $\det A\neq0$, the origin is the only equilibrium of $\mathbf{x}' = A\mathbf{x}$, and the picture of all trajectories in the plane — the **phase portrait** — is determined by the eigenvalues. Writing $\tau = \tr A$ and $\Delta = \det A$, the characteristic polynomial is $\lambda^2 - \tau\lambda + \Delta$, so

$$
\lambda_{1,2} = \frac{\tau\pm\sqrt{\tau^2 - 4\Delta}}{2}, \qquad \lambda_1 + \lambda_2 = \tau, \qquad \lambda_1\lambda_2 = \Delta .
$$

| condition | eigenvalues | origin |
|---|---|---|
| $\Delta < 0$ | real, opposite signs | saddle (unstable) |
| $\Delta > 0$, $\tau^2 > 4\Delta$, $\tau < 0$ | real, both negative | stable node |
| $\Delta > 0$, $\tau^2 > 4\Delta$, $\tau > 0$ | real, both positive | unstable node |
| $\Delta > 0$, $\tau^2 = 4\Delta$ | real, repeated | degenerate or star node |
| $\Delta > 0$, $\tau^2 < 4\Delta$, $\tau < 0$ | complex, $\operatorname{Re} < 0$ | stable spiral |
| $\Delta > 0$, $\tau^2 < 4\Delta$, $\tau > 0$ | complex, $\operatorname{Re} > 0$ | unstable spiral |
| $\Delta > 0$, $\tau = 0$ | purely imaginary | centre (stable, not asymptotically) |

In the **trace–determinant plane** these regions are separated by the axis $\Delta = 0$, the half-axis $\tau = 0$ above it, and the parabola $\tau^2 = 4\Delta$. Saddles, nodes and spirals fill open regions and are robust: a small change in $A$ does not change the type. Centres and degenerate nodes lie on curves, and the slightest perturbation turns them into something else.

::: widget phaseplane
matrix: -1, 2; -2, -1
x: -3, 3
y: -3, 3
points: 2.5, 0; -2.5, 1; 0, 2.5
caption: The stable spiral of [[#ex-spiral]]. Use the entry sliders to tour the trace–determinant plane: set both diagonal entries to $0$ to get a centre (closed ellipses); make the diagonal positive to reverse the spiral; make the off-diagonal entries equal in sign to obtain real eigenvalues — a node, or a saddle once $\det A < 0$. The panel reports the eigenvalues and type at each step.
:::

For an $n\times n$ system the same question — do all solutions decay? — is answered by the signs of the real parts of the eigenvalues.

::: theorem Stability of linear systems {#thm-linear-stability}
Let $A$ be a real $n\times n$ matrix.

1. If every eigenvalue of $A$ has negative real part, there are constants $C\ge1$ and $\alpha > 0$ with $\norm{e^{At}}\le Ce^{-\alpha t}$ for $t\ge0$. Hence every solution of $\mathbf{x}' = A\mathbf{x}$ tends to $\mathbf{0}$ exponentially fast, and the origin is **asymptotically stable**.
2. If some eigenvalue has positive real part, there are solutions starting arbitrarily close to $\mathbf{0}$ with $\norm{\mathbf{x}(t)}\to\infty$; the origin is **unstable**.
:::

::: proof
1. By the Jordan canonical form ([[linear-algebra/jordan-form]]) there is an invertible complex matrix $P$ with $A = PJP^{-1}$, where $J$ is block diagonal with blocks $\lambda I + N$, $N$ nilpotent. By [[#prop-expm]] and the computation in [[#ex-expm]], every entry of $e^{Jt}$ has the form $t^ke^{\lambda t}/k!$ for an eigenvalue $\lambda$ and some $k < n$, and $e^{At} = Pe^{Jt}P^{-1}$. Choose $\alpha > 0$ smaller than $\lvert\operatorname{Re}\lambda\rvert$ for every eigenvalue. Then $\lvert t^ke^{\lambda t}\rvert e^{\alpha t} = t^ke^{(\operatorname{Re}\lambda + \alpha)t}\to0$, so each such term is bounded by a constant times $e^{-\alpha t}$ on $[0,\infty)$, and hence so is $\norm{e^{At}}$. Then $\norm{\mathbf{x}(t)}\le\norm{e^{At}}\norm{\mathbf{x}_0}\le Ce^{-\alpha t}\norm{\mathbf{x}_0}$.

2. Let $A\mathbf{v} = \lambda\mathbf{v}$ with $\operatorname{Re}\lambda = \mu > 0$. If $\lambda$ is real, $\mathbf{x}(t) = \eps e^{\lambda t}\mathbf{v}$ is a solution starting at $\eps\mathbf{v}$, as close to $\mathbf{0}$ as we like, and $\norm{\mathbf{x}(t)}\to\infty$. If $\lambda = \mu + i\beta$ with $\beta\ne0$, use $\mathbf{x}_1$ of [[#prop-complex]]: $\norm{\mathbf{x}_1(t)}\ge e^{\mu t}m$ with $m = \min_\theta\norm{\mathbf{a}\cos\theta - \mathbf{b}\sin\theta} > 0$, since $\mathbf{a}, \mathbf{b}$ are independent; scale by $\eps$ as before.
:::

::: quiz
Classify the origin for $\mathbf{x}' = \begin{pmatrix}2&3\\-1&-2\end{pmatrix}\mathbf{x}$.
- [x] Saddle
- [ ] Centre, because the trace is zero
- [ ] Stable spiral
- [ ] Unstable node
::: solution
$\tau = 0$ but $\Delta = -4 + 3 = -1 < 0$, so the eigenvalues are real with opposite signs ($\pm1$): a saddle. A zero trace gives a centre only when $\Delta > 0$.
:::
:::

::: application Coupled oscillators and normal modes
Two equal masses joined to walls and to each other by identical springs satisfy $x_1'' = -2x_1 + x_2$, $x_2'' = x_1 - 2x_2$ (in suitable units), that is $\mathbf{x}'' = K\mathbf{x}$ with $K = \begin{pmatrix}-2&1\\1&-2\end{pmatrix}$. Trying $\mathbf{x} = \cos(\omega t)\mathbf{v}$ gives $K\mathbf{v} = -\omega^2\mathbf{v}$: the eigenvectors of $K$ are the **normal modes** $(1,1)$ (masses moving together, $\omega = 1$) and $(1,-1)$ (moving oppositely, $\omega = \sqrt3$), and every motion is a superposition of the two. The same analysis, with thousands of masses, gives the vibration modes of molecules, bridges and aircraft wings, and in the limit of infinitely many masses leads to the wave equation of [[pde/wave-equation]].
:::

::: history
Systems of linear differential equations arose in the eighteenth century in celestial mechanics and the study of small oscillations, where Lagrange (in his *Mécanique analytique* of 1788) reduced the motion of a mechanical system near equilibrium to independent normal modes. The characteristic equation of a system — the "secular equation", so called because it governed the long-term (secular) perturbations of planetary orbits — was studied by Lagrange and Laplace, and Cauchy proved in 1829 that the eigenvalues of a symmetric matrix are real. Liouville's formula for the Wronskian of a system dates from 1838. The modern matrix language, including the exponential $e^{At}$ and the Jordan form (Camille Jordan, 1870), became standard in the twentieth century, especially through control theory.
:::

## Where this leads

The classification of planar phase portraits is the starting point of [[ode/nonlinear-systems]], where a nonlinear system near an equilibrium is approximated by its linearisation $\mathbf{x}' = J\mathbf{x}$, with $J$ the Jacobian matrix, and [[#thm-linear-stability]] decides stability in most cases. Computing $e^{At}$ reliably for large matrices is a classic problem of numerical linear algebra ([[numerical-analysis/iterative-methods]]), and stiff systems, whose eigenvalues have widely different sizes, demand special methods ([[numerical-analysis/numerical-odes]]). Discretising a partial differential equation such as the heat equation in space produces a huge linear system $\mathbf{u}' = A\mathbf{u}$ whose eigenvectors approximate the Fourier modes of [[pde/heat-equation]].

::: summary
- An $n$th-order linear equation is equivalent to a first-order system with the companion matrix; linear systems have unique global solutions ([[#thm-eu-system]]).
- The solutions of $\mathbf{x}' = A(t)\mathbf{x}$ form an $n$-dimensional space; $n$ solutions form a basis iff their values at one time are independent ([[#thm-dimension]]); $\det\Phi$ obeys Liouville's formula $\det\Phi(t) = \det\Phi(t_0)e^{\int\tr A}$.
- For constant $A$: eigenpairs give solutions $e^{\lambda t}\mathbf{v}$; complex pairs give $e^{\alpha t}(\mathbf{a}\cos\beta t - \mathbf{b}\sin\beta t)$, …; defective eigenvalues give $e^{\lambda t}(t\mathbf{v} + \mathbf{w})$.
- $e^{At} = \sum A^kt^k/k!$ is the fundamental matrix with $\Phi(0) = I$; $e^{(A+B)t} = e^{At}e^{Bt}$ only if $AB = BA$; $e^{PDP^{-1}t} = Pe^{Dt}P^{-1}$.
- Forced systems: $\mathbf{x}(t) = e^{At}\mathbf{x}_0 + \int_0^te^{A(t-s)}\mathbf{f}(s)\,ds$.
- Planar portraits are classified by $\tau = \tr A$ and $\Delta = \det A$: saddles ($\Delta < 0$), nodes, spirals, centres; all solutions decay iff every eigenvalue has negative real part ([[#thm-linear-stability]]).
:::

## Exercises

::: exercise A companion matrix {level=1}
Write $y''' - 2y'' - y' + 2y = 0$ as a first-order system and find the eigenvalues of its matrix. What is the general solution of the original equation?
::: solution
With $x_1 = y$, $x_2 = y'$, $x_3 = y''$:

$$
\mathbf{x}' = \begin{pmatrix}0&1&0\\0&0&1\\-2&1&2\end{pmatrix}\mathbf{x}.
$$

The eigenvalues are the roots of $r^3 - 2r^2 - r + 2 = (r-1)(r+1)(r-2)$, namely $1, -1, 2$. Hence $y = c_1e^t + c_2e^{-t} + c_3e^{2t}$.
:::
:::

::: exercise A symmetric system {level=1 check="5"}
Solve $\mathbf{x}' = \begin{pmatrix}2&1\\1&2\end{pmatrix}\mathbf{x}$, $\mathbf{x}(0) = \begin{pmatrix}1\\0\end{pmatrix}$, and evaluate $x_1(\ln 2)$.
::: solution
The eigenvalues are $3$ (eigenvector $(1,1)$) and $1$ (eigenvector $(1,-1)$). Writing $(1,0) = \frac12(1,1) + \frac12(1,-1)$,

$$
\mathbf{x}(t) = \tfrac12e^{3t}\begin{pmatrix}1\\1\end{pmatrix} + \tfrac12e^{t}\begin{pmatrix}1\\-1\end{pmatrix}.
$$

So $x_1(t) = \frac12(e^{3t} + e^t)$ and $x_1(\ln2) = \frac12(8 + 2) = 5$.
:::
:::

::: exercise Classification {level=1}
Classify the origin for $\mathbf{x}' = A\mathbf{x}$ with (a) $A = \begin{pmatrix}1&2\\3&-4\end{pmatrix}$, (b) $A = \begin{pmatrix}-3&1\\-1&-1\end{pmatrix}$, (c) $A = \begin{pmatrix}1&-5\\1&-1\end{pmatrix}$.
::: solution
(a) $\Delta = -4 - 6 = -10 < 0$: saddle (eigenvalues $2$ and $-5$).
(b) $\tau = -4$, $\Delta = 3 + 1 = 4$, $\tau^2 = 16 = 4\Delta$: a repeated eigenvalue $-2$ with only one eigenvector $(1,1)$, a stable degenerate node.
(c) $\tau = 0$, $\Delta = -1 + 5 = 4 > 0$: eigenvalues $\pm2i$, a centre.
:::
:::

::: exercise Complex eigenvalues {level=2 check="exp(-pi)"}
Solve $\mathbf{x}' = \begin{pmatrix}0&1\\-5&-2\end{pmatrix}\mathbf{x}$, $\mathbf{x}(0) = \begin{pmatrix}1\\0\end{pmatrix}$, and evaluate $x_1(\pi)$.
::: solution
$\lambda^2 + 2\lambda + 5 = 0$ gives $\lambda = -1\pm2i$. For $\lambda = -1 + 2i$, the first row of $(A - \lambda I)\mathbf{v} = \mathbf{0}$ is $(1 - 2i)v_1 + v_2 = 0$, so $\mathbf{v} = (1, -1 + 2i)$, with $\mathbf{a} = (1,-1)$ and $\mathbf{b} = (0, 2)$. The real solutions are

$$
\mathbf{x}_1 = e^{-t}\begin{pmatrix}\cos2t\\ -\cos 2t - 2\sin 2t\end{pmatrix}, \qquad \mathbf{x}_2 = e^{-t}\begin{pmatrix}\sin 2t\\ -\sin 2t + 2\cos 2t\end{pmatrix}.
$$

At $t = 0$: $c_1(1,-1) + c_2(0,2) = (1,0)$ gives $c_1 = 1$, $c_2 = \frac12$. Hence $x_1(t) = e^{-t}\bigl(\cos 2t + \frac12\sin 2t\bigr)$ and $x_1(\pi) = e^{-\pi}$. (This system is the companion form of $y'' + 2y' + 5y = 0$, and $x_1 = y$.)
:::
:::

::: exercise A forced system {level=2 check="2"}
For $A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$, use [[#eq-vop-system]] to solve $\mathbf{x}' = A\mathbf{x} + \begin{pmatrix}0\\1\end{pmatrix}$, $\mathbf{x}(0) = \mathbf{0}$, and evaluate $x_1(2)$.
::: solution
$e^{A(t-s)} = \begin{pmatrix}1 & t - s\\ 0 & 1\end{pmatrix}$, so

$$
\mathbf{x}(t) = \int_0^t\begin{pmatrix}1&t-s\\0&1\end{pmatrix}\begin{pmatrix}0\\1\end{pmatrix}ds = \int_0^t\begin{pmatrix}t - s\\1\end{pmatrix}ds = \begin{pmatrix}t^2/2\\ t\end{pmatrix}.
$$

This is uniform acceleration from rest. $x_1(2) = 2$.
:::
:::

::: exercise Liouville's formula {level=2 check="e"}
Let $\Phi$ be a fundamental matrix of $\mathbf{x}' = A(t)\mathbf{x}$ with $A(t) = \begin{pmatrix}1 & t\\ \sin t & -\frac{1}{1+t}\end{pmatrix}$ on $t > -1$, and suppose $\det\Phi(0) = 2$. Find $\det\Phi(1)$.
::: solution
$\tr A(t) = 1 - \frac{1}{1+t}$, so by [[#thm-liouville]]

$$
\det\Phi(1) = 2\exp\int_0^1\left(1 - \frac{1}{1+t}\right)dt = 2e^{1 - \ln 2} = 2\cdot\frac e2 = e .
$$
:::
:::

::: exercise Non-commuting exponentials {level=3}
Let $A = \begin{pmatrix}0&1\\0&0\end{pmatrix}$ and $B = \begin{pmatrix}0&0\\1&0\end{pmatrix}$. Compute $e^A$, $e^B$, $e^Ae^B$ and $e^{A+B}$, and conclude that $e^{A+B}\neq e^Ae^B$. Why does [[#prop-expm]] not apply?
::: solution
$A^2 = B^2 = 0$, so $e^A = I + A = \begin{pmatrix}1&1\\0&1\end{pmatrix}$ and $e^B = \begin{pmatrix}1&0\\1&1\end{pmatrix}$, giving $e^Ae^B = \begin{pmatrix}2&1\\1&1\end{pmatrix}$. Next $C = A + B = \begin{pmatrix}0&1\\1&0\end{pmatrix}$ has $C^2 = I$, so splitting the series into even and odd terms,

$$
e^{C} = \Bigl(\sum_k\frac{1}{(2k)!}\Bigr)I + \Bigl(\sum_k\frac{1}{(2k+1)!}\Bigr)C = \begin{pmatrix}\cosh 1&\sinh1\\ \sinh1&\cosh1\end{pmatrix}.
$$

Since $\cosh 1\approx1.543\neq2$, the two differ. [[#prop-expm]] requires $AB = BA$, but $AB = \begin{pmatrix}1&0\\0&0\end{pmatrix}\neq\begin{pmatrix}0&0\\0&1\end{pmatrix} = BA$.
:::
:::

::: exercise Determinant of an exponential {level=3}
Prove that $\det e^{A} = e^{\tr A}$ for every square matrix $A$, and deduce that $e^A$ is always invertible.
::: solution
$\Phi(t) = e^{At}$ satisfies $\Phi' = A\Phi$ with $\Phi(0) = I$ ([[#thm-expm]]). By Liouville's formula [[#thm-liouville]] with constant $A$,

$$
\det e^{At} = \det I\cdot\exp\left(\int_0^t\tr A\,ds\right) = e^{t\tr A}.
$$

Setting $t = 1$ gives $\det e^A = e^{\tr A}$, which is never zero, so $e^A$ is invertible (with inverse $e^{-A}$).
:::
:::

::: exercise A planar stability criterion {level=3}
Let $A$ be a real $2\times2$ matrix. Prove that every solution of $\mathbf{x}' = A\mathbf{x}$ tends to $\mathbf{0}$ as $t\to\infty$ if and only if $\tr A < 0$ and $\det A > 0$.
::: solution
Let $\lambda_1,\lambda_2$ be the eigenvalues, with $\lambda_1 + \lambda_2 = \tau = \tr A$ and $\lambda_1\lambda_2 = \Delta = \det A$.

($\Leftarrow$) If the eigenvalues are complex, they are $\frac\tau2\pm i\beta$ with real part $\frac\tau2 < 0$. If they are real, $\lambda_1\lambda_2 = \Delta > 0$ means they have the same sign, and $\lambda_1 + \lambda_2 = \tau < 0$ means that sign is negative. Either way both real parts are negative, and [[#thm-linear-stability]] shows every solution tends to $\mathbf{0}$.

($\Rightarrow$) If every solution tends to $\mathbf{0}$, no eigenvalue can have positive real part ([[#thm-linear-stability]], part 2) and no eigenvalue can have zero real part: an eigenvalue $0$ gives constant solutions $\mathbf{v}$, and $\pm i\beta$ gives the non-decaying solutions of [[#prop-complex]] with $\alpha = 0$. So both real parts are negative, hence $\tau = \lambda_1 + \lambda_2 < 0$ (real parts add) and $\Delta = \lambda_1\lambda_2 > 0$ (a product of two negative numbers, or $\lvert\lambda\rvert^2$ for a complex pair).
:::
:::

::: exercise Normal modes {level=2 check="sqrt(3)"}
For the coupled masses $x_1'' = -2x_1 + x_2$, $x_2'' = x_1 - 2x_2$ of the application above, find the solution with $x_1(0) = 1$, $x_2(0) = 0$, $x_1'(0) = x_2'(0) = 0$. What is the higher normal-mode frequency?
::: solution
The eigenvalues of $K = \begin{pmatrix}-2&1\\1&-2\end{pmatrix}$ are $-1$ (eigenvector $(1,1)$) and $-3$ (eigenvector $(1,-1)$), so with zero initial velocities $\mathbf{x}(t) = c_1\cos t\,(1,1) + c_2\cos\sqrt3t\,(1,-1)$. From $\mathbf{x}(0) = (1,0)$, $c_1 = c_2 = \frac12$:

$$
x_1 = \tfrac12\bigl(\cos t + \cos\sqrt3t\bigr), \qquad x_2 = \tfrac12\bigl(\cos t - \cos\sqrt3t\bigr).
$$

The normal-mode frequencies are $1$ and $\sqrt3$; the higher one is $\sqrt3$. Since $\sqrt3$ is irrational, the motion is never exactly periodic: energy sloshes back and forth between the masses forever.
:::
:::
