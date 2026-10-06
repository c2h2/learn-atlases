The temperature in a heated metal plate, the pressure in an oil reservoir, the electric potential around a circuit board: discretising such problems on a $1000\times1000$ grid gives a linear system with a million unknowns, in which each equation involves only a handful of neighbouring unknowns. The matrix is **sparse**: of its $10^{12}$ entries only about $5\times10^6$ are non-zero. Gaussian elimination ([[numerical-analysis/direct-methods]]) destroys this sparsity — the factors fill in — and even exploiting the band structure costs around $10^{12}$ flops and billions of numbers of storage.

**Iterative methods** take a different route: start from a guess and improve it repeatedly, using the matrix only through cheap products with vectors. Each iteration costs a few times the number of non-zeros, and if the iteration converges fast, the total is far below the cost of factorising. The first half of this chapter studies the classical iterations of Jacobi, Gauss–Seidel and SOR and proves exactly when they converge: the answer is controlled by the **spectral radius** of an iteration matrix. The second half turns to the eigenvalue problem $A\mathbf v = \lambda\mathbf v$, which is solved by iteration out of necessity — there is no finite formula for the roots of a characteristic polynomial of degree five or more. We meet the **power method**, which underlies Google's PageRank, and the **QR algorithm**, which computes all the eigenvalues of a matrix and is one of the great algorithms of the twentieth century.

## Splitting methods

Write the matrix as a difference $A = M - N$, where $M$ is invertible and systems with $M$ are easy to solve. Then $A\mathbf x = \mathbf b$ is equivalent to $M\mathbf x = N\mathbf x + \mathbf b$, which suggests the iteration

$$
M\mathbf x^{(k+1)} = N\mathbf x^{(k)} + \mathbf b, \qquad\text{i.e.}\qquad \mathbf x^{(k+1)} = G\mathbf x^{(k)} + M^{-1}\mathbf b, \quad G = M^{-1}N = I - M^{-1}A .
$$ {#eq-splitting}

$G$ is the **iteration matrix**. Equivalently $\mathbf x^{(k+1)} = \mathbf x^{(k)} + M^{-1}\mathbf r^{(k)}$ with the residual $\mathbf r^{(k)} = \mathbf b - A\mathbf x^{(k)}$: each step corrects the current guess by an approximate solution of the residual equation. Split $A = D + L + U$ into its diagonal, strictly lower and strictly upper triangular parts.

::: definition Jacobi, Gauss–Seidel and SOR {#def-jacobi-gs}
Assume all $a_{ii} \ne 0$. The **Jacobi method** takes $M = D$: each component is updated using only old values,

$$
x_i^{(k+1)} = \frac{1}{a_{ii}}\Bigl(b_i - \sum_{j\ne i}a_{ij}x_j^{(k)}\Bigr).
$$

The **Gauss–Seidel method** takes $M = D + L$: components are updated in order, each using the newest available values,

$$
x_i^{(k+1)} = \frac{1}{a_{ii}}\Bigl(b_i - \sum_{j<i}a_{ij}x_j^{(k+1)} - \sum_{j>i}a_{ij}x_j^{(k)}\Bigr).
$$

**Successive over-relaxation** (SOR) with parameter $\omega$ moves further in the Gauss–Seidel direction: $x_i^{(k+1)} = (1 - \omega)x_i^{(k)} + \omega\,\tilde x_i$, where $\tilde x_i$ is the Gauss–Seidel value; this corresponds to $M = \frac1\omega D + L$. For $\omega = 1$ it is Gauss–Seidel.
:::

```python
import numpy as np

def gauss_seidel(A, b, x, tol=1e-10, maxit=10_000, omega=1.0):
    """SOR (Gauss-Seidel when omega = 1); stops on a small relative residual."""
    n = len(b)
    for k in range(maxit):
        for i in range(n):
            s = A[i, :i] @ x[:i] + A[i, i+1:] @ x[i+1:]
            x[i] = (1 - omega) * x[i] + omega * (b[i] - s) / A[i, i]
        if np.linalg.norm(b - A @ x) <= tol * np.linalg.norm(b):
            return x, k + 1
    return x, maxit
```

For a sparse matrix the inner sums run only over the non-zero entries of each row, so one sweep costs about twice the number of non-zeros.

::: example Jacobi and Gauss–Seidel side by side {#ex-jacobi-gs}
Solve $\begin{pmatrix}4 & -1 & 0\\ -1 & 4 & -1\\ 0 & -1 & 4\end{pmatrix}\mathbf x = \begin{pmatrix}2\\ 4\\ 10\end{pmatrix}$, whose solution is $\mathbf x = (1, 2, 3)\T$, starting from $\mathbf x^{(0)} = \mathbf 0$.
::: solution
The Jacobi step is $x_1 \leftarrow \frac{2 + x_2}{4}$, $x_2 \leftarrow \frac{4 + x_1 + x_3}{4}$, $x_3 \leftarrow \frac{10 + x_2}{4}$, all with old values. The first step gives $(0.5, 1, 2.5)$, the second $(0.75, 1.75, 2.75)$. Gauss–Seidel uses the new $x_1 = 0.5$ at once when updating $x_2 = \frac{4 + 0.5 + 0}{4} = 1.125$, and then $x_3 = \frac{10 + 1.125}{4} = 2.781\,25$. The maximum errors:

| $k$ | $1$ | $2$ | $3$ | $4$ | $6$ | $8$ | $10$ |
|---|---|---|---|---|---|---|---|
| Jacobi | $1.0$ | $0.25$ | $0.13$ | $0.031$ | $3.9\times10^{-3}$ | $4.9\times10^{-4}$ | $6.1\times10^{-5}$ |
| Gauss–Seidel | $0.88$ | $0.22$ | $0.027$ | $3.4\times10^{-3}$ | $5.3\times10^{-5}$ | $8.3\times10^{-7}$ | $1.3\times10^{-8}$ |

Both converge linearly. Jacobi's error shrinks by a factor $\frac{1}{2\sqrt2} \approx 0.354$ per step on average (a factor $\frac18$ every two steps) and Gauss–Seidel's by $\frac18$ per step: Gauss–Seidel is twice as fast here. The next section explains these numbers.
:::
:::

::: widget iterative
matrix: 4,1; 2,3
b: 1,2
method: jacobi
start: 0,0
caption: Jacobi iterates for $4x + y = 1$, $2x + 3y = 2$ (solution $(0.1, 0.6)$), drawn on the two lines. Each Jacobi step moves both coordinates at once, using old values: the dashed guides run horizontally to the first line and vertically to the second, and the new point combines the two moves, so the path zigzags in towards the intersection. The residual history on the right falls on average by the factor $\rho = 1/\sqrt6 \approx 0.41$ per step. Switch to Gauss–Seidel: the path now alternates between the two lines and the residual falls by $\rho^2 = \frac16$ per step.
:::

## Convergence of stationary iterations

Let $\mathbf x^*$ be the solution. Subtracting $\mathbf x^* = G\mathbf x^* + M^{-1}\mathbf b$ from [[#eq-splitting]], the error $\mathbf e^{(k)} = \mathbf x^{(k)} - \mathbf x^*$ satisfies $\mathbf e^{(k+1)} = G\mathbf e^{(k)}$, so

$$
\mathbf e^{(k)} = G^k\mathbf e^{(0)} .
$$

Everything depends on whether, and how fast, the powers $G^k$ tend to zero.

::: definition Spectral radius {#def-spectral-radius}
The **spectral radius** of a square matrix $G$ is $\rho(G) = \max\set{\abs\lambda : \lambda \text{ an eigenvalue of } G}$, the largest absolute value of its (possibly complex) eigenvalues.
:::

::: theorem Convergence criterion {#thm-spectral}
The iteration $\mathbf x^{(k+1)} = G\mathbf x^{(k)} + \mathbf c$ converges to the solution of $\mathbf x = G\mathbf x + \mathbf c$ for every starting vector if and only if $\rho(G) < 1$. Moreover, if $\norm G < 1$ for some induced matrix norm, then $\norm{\mathbf e^{(k)}} \le \norm G^k\norm{\mathbf e^{(0)}}$.
:::

::: proof
*Norm bound.* $\norm{\mathbf e^{(k)}} = \norm{G\mathbf e^{(k-1)}} \le \norm G\norm{\mathbf e^{(k-1)}}$, and induction gives the bound, which tends to $0$ if $\norm G < 1$. (This is the contraction mapping theorem of [[numerical-analysis/root-finding#thm-contraction]] in $\R^n$.)

*Necessity.* Suppose $G$ has an eigenvalue $\lambda$ with $\abs\lambda \ge 1$ and eigenvector $\mathbf v$. If $\lambda$ is real, start with $\mathbf e^{(0)} = \mathbf v$: then $\mathbf e^{(k)} = \lambda^k\mathbf v \not\to\mathbf 0$. If $\lambda$ is complex, $\mathbf v = \mathbf p + i\mathbf q$ with real $\mathbf p, \mathbf q$; since $G^k\mathbf v = \lambda^k\mathbf v \not\to \mathbf 0$, at least one of $G^k\mathbf p$ and $G^k\mathbf q$ does not tend to $\mathbf 0$, and that real vector is a starting error for which the iteration fails.

*Sufficiency* when $G$ is diagonalisable, $G = V\Lambda V^{-1}$: then $G^k = V\Lambda^kV^{-1}$ and $\Lambda^k \to 0$ because every $\abs{\lambda_i} < 1$. For a general $G$ use the Jordan form $G = VJV^{-1}$ ([[linear-algebra/jordan-form]]): the powers of a Jordan block with eigenvalue $\lambda$ have entries $\binom{k}{j}\lambda^{k-j}$, which tend to $0$ when $\abs\lambda < 1$ because the geometric factor beats the polynomial factor $\binom kj \le k^j$ ([[calculus-2/sequences#thm-ratio-seq]]). So $G^k \to 0$ in every case.
:::

The proof also gives the **rate**: asymptotically the error shrinks by a factor $\rho(G)$ per iteration, so reducing it by a factor $10^{-d}$ takes about $\frac{d}{-\log_{10}\rho(G)}$ iterations. A spectral radius of $0.9$ costs $22$ iterations per digit; $0.999$ costs $2300$.

Computing $\rho(G)$ is as hard as the original problem, so we want conditions on $A$ that guarantee convergence. The most useful is diagonal dominance.

::: theorem Diagonally dominant matrices {#thm-diag-dominant}
If $A$ is **strictly diagonally dominant**, that is $\abs{a_{ii}} > \sum_{j\ne i}\abs{a_{ij}}$ for every $i$, then both the Jacobi and the Gauss–Seidel iteration converge for every starting vector.
:::

::: proof
*Jacobi.* $G_J = -D^{-1}(L + U)$ has entries $-a_{ij}/a_{ii}$ off the diagonal and zeros on it, so its largest absolute row sum is $\norm{G_J}_\infty = \max_i\sum_{j\ne i}\frac{\abs{a_{ij}}}{\abs{a_{ii}}} < 1$. By [[#thm-spectral]] the iteration converges.

*Gauss–Seidel.* Let $\lambda$ be an eigenvalue of $G_{GS} = -(D + L)^{-1}U$ with eigenvector $\mathbf v$, scaled so that $\max_j\abs{v_j} = \abs{v_i} = 1$. From $-U\mathbf v = \lambda(D + L)\mathbf v$, row $i$ reads $-\sum_{j>i}a_{ij}v_j = \lambda\bigl(a_{ii}v_i + \sum_{j<i}a_{ij}v_j\bigr)$. Taking absolute values and using $\abs{v_j} \le 1 = \abs{v_i}$,

$$
\abs\lambda\Bigl(\abs{a_{ii}} - \sum_{j<i}\abs{a_{ij}}\Bigr) \le \sum_{j>i}\abs{a_{ij}} .
$$

By strict dominance the bracket is positive and larger than the right-hand side, so $\abs\lambda < 1$. Hence $\rho(G_{GS}) < 1$.
:::

The matrix of [[#ex-jacobi-gs]] is strictly diagonally dominant ($4 > 1 + 1$). A second classical result covers the other important class: if $A$ is **symmetric positive definite**, Gauss–Seidel converges, and so does SOR for every $0 < \omega < 2$ (the Ostrowski–Reich theorem; see Golub and Van Loan, *Matrix Computations*, Section 11.2). The interval $0 < \omega < 2$ cannot be enlarged, for any matrix:

::: proposition Kahan's bound for SOR {#prop-kahan}
For every matrix with non-zero diagonal, the SOR iteration matrix $G_\omega$ satisfies $\rho(G_\omega) \ge \abs{\omega - 1}$. Hence SOR can converge for all starting vectors only if $0 < \omega < 2$.
:::

::: proof
With $M = \frac1\omega D + L$ and $N = M - A = \left(\frac1\omega - 1\right)D - U$, we have $G_\omega = (D + \omega L)^{-1}\bigl((1 - \omega)D - \omega U\bigr)$. Both factors are triangular, so their determinants are the products of their diagonals: $\det G_\omega = \frac{(1-\omega)^n\det D}{\det D} = (1 - \omega)^n$. The determinant is the product of the $n$ eigenvalues, so at least one eigenvalue has $\abs\lambda \ge \abs{1 - \omega}$.
:::

::: example Predicting convergence from the matrix {#ex-predict}
For $A = \begin{pmatrix}4 & 1\\ 2 & 3\end{pmatrix}$ (the system in the figure above), verify that Jacobi and Gauss–Seidel converge and compute their exact rates.
::: solution
$A$ is strictly diagonally dominant ($4 > 1$ and $3 > 2$), so both methods converge by [[#thm-diag-dominant]]. The Jacobi matrix is $G_J = -D^{-1}(L + U) = \begin{pmatrix}0 & -\frac14\\ -\frac23 & 0\end{pmatrix}$, with characteristic polynomial $\lambda^2 - \frac16$, so $\rho(G_J) = \frac{1}{\sqrt6} \approx 0.408$; its row-sum norm $\norm{G_J}_\infty = \frac23$ is a cruder bound. For Gauss–Seidel, $G_{GS} = -(D + L)^{-1}U = \begin{pmatrix}0 & -\frac14\\ 0 & \frac16\end{pmatrix}$, with eigenvalues $0$ and $\frac16$. So each Gauss–Seidel step reduces the error by a factor $\frac16$, exactly the square of the Jacobi factor: about $0.8$ correct digits per step against $0.4$.
:::
:::

::: quiz
An iteration matrix has eigenvalues $0.5$, $-0.9$ and $0.3 \pm 0.4i$. Which statement is correct?
- [ ] The iteration diverges, because there is a negative eigenvalue.
- [x] It converges, with the error shrinking asymptotically by about $0.9$ per step.
- [ ] It converges, with the error shrinking by about $0.5$ per step.
- [ ] It diverges, because complex eigenvalues produce oscillations.
::: solution
The spectral radius is $\max(0.5, 0.9, \abs{0.3 \pm 0.4i}) = \max(0.5, 0.9, 0.5) = 0.9 < 1$, so the iteration converges by [[#thm-spectral]], at the rate set by the largest eigenvalue in absolute value: about $22$ iterations per decimal digit. Signs and complex values only make the error oscillate as it decays.
:::
:::

### The model problem

The rates for the standard test problem show both the strengths and the limits of the classical methods.

::: example The one-dimensional model problem {#ex-model}
Discretising $-u'' = f$ on $(0, 1)$ with $n$ interior grid points gives the tridiagonal matrix with $2$ on the diagonal and $-1$ beside it. How many iterations do Jacobi, Gauss–Seidel and optimally relaxed SOR need to reduce the error by a factor $10^{-6}$?
::: solution
The Jacobi iteration matrix has eigenvalues $\cos\frac{k\pi}{n+1}$, $k = 1, \dots, n$ ([[#exr-model-eigen]]), so

$$
\rho_J = \cos\frac{\pi}{n+1} \approx 1 - \frac{\pi^2}{2(n+1)^2}, \qquad \rho_{GS} = \rho_J^2, \qquad \rho_{\mathrm{SOR}} = \omega_* - 1 \ \text{ with } \ \omega_* = \frac{2}{1 + \sqrt{1 - \rho_J^2}} ,
$$

the last two by Young's theory of consistently ordered matrices. The number of iterations needed to reduce the error by $10^{-6}$:

| $n$ | $\rho_J$ | Jacobi | Gauss–Seidel | optimal $\omega_*$ | SOR |
|---|---|---|---|---|---|
| $10$ | $0.9595$ | $335$ | $168$ | $1.560$ | $24$ |
| $100$ | $0.999\,516$ | $28\,555$ | $14\,278$ | $1.940$ | $223$ |
| $1000$ | $0.999\,995$ | $2\,805\,206$ | $1\,402\,603$ | $1.994$ | $2\,202$ |

Gauss–Seidel is exactly twice as fast as Jacobi, and well-tuned SOR is faster by a factor proportional to $n$. But all three slow down as the grid is refined, because $\rho \to 1$: the error components that vary slowly across the grid are hardly reduced by local updates.
:::
:::

Modern solvers do far better. The conjugate gradient method needs a number of iterations growing only like $\sqrt{\kappa(A)}$ (like $n$ here), which a good preconditioner reduces further, and multigrid methods, which smooth the error with a few Gauss–Seidel sweeps and correct the slowly varying part on coarser grids, need a number of iterations nearly independent of $n$.

::: widget iterative
matrix: 4,1; 2,3
b: 1,2
method: sor
omega: 1.2
start: 0,0
caption: SOR with $\omega = 1.2$ on the same system. Over-relaxation pushes each Gauss–Seidel update a little further than the line it is aimed at. For this small, strongly diagonally dominant system Gauss–Seidel is already fast and the best $\omega$ is close to $1$; try $\omega = 1.9$ and $\omega = 0.5$ and compare the residual histories. Values $\omega \ge 2$ always fail, by [[#prop-kahan]].
:::

::: warning Convergence of the iterates is not the same as accuracy
Iterative solvers are stopped by a test such as $\norm{\mathbf r^{(k)}} \le \text{tol}\cdot\norm{\mathbf b}$. By the residual bound of [[numerical-analysis/direct-methods]], the relative error can then still be as large as $\kappa(A)\cdot\text{tol}$. Likewise, a small change $\norm{\mathbf x^{(k+1)} - \mathbf x^{(k)}}$ does not mean a small error when $\rho(G)$ is close to $1$: the error can be about $\frac{\rho}{1-\rho}$ times the last step, which is $2000$ times for $\rho = 0.9995$.
:::

## The power method

Eigenvalues determine the vibration frequencies of structures, the stability of equilibria ([[ode/linear-systems]]), the long-run behaviour of Markov chains ([[probability/markov-chains]]) and the principal components of data. Computing them via the characteristic polynomial is hopeless numerically: the roots of a polynomial are extremely sensitive to its coefficients. Instead we iterate with the matrix itself. The simplest idea is to multiply a vector by $A$ again and again.

::: algorithm Power method {#alg-power}
Choose $\mathbf x^{(0)} \ne \mathbf 0$. For $k = 0, 1, 2, \dots$: set $\mathbf y = A\mathbf x^{(k)}$, $\mathbf x^{(k+1)} = \mathbf y/\norm{\mathbf y}$, and estimate the eigenvalue by the **Rayleigh quotient** $\mu_{k+1} = \dfrac{(\mathbf x^{(k+1)})\T A\mathbf x^{(k+1)}}{(\mathbf x^{(k+1)})\T\mathbf x^{(k+1)}}$.
:::

::: theorem Convergence of the power method {#thm-power}
Let $A$ be diagonalisable with eigenvalues $\abs{\lambda_1} > \abs{\lambda_2} \ge \cdots \ge \abs{\lambda_n}$ and corresponding eigenvectors $\mathbf v_1, \dots, \mathbf v_n$, and suppose $\mathbf x^{(0)} = \sum_ic_i\mathbf v_i$ with $c_1 \ne 0$. Then the direction of $\mathbf x^{(k)}$ converges to that of $\mathbf v_1$, with

$$
\mathbf x^{(k)} = \pm\frac{\mathbf v_1 + O\bigl(\abs{\lambda_2/\lambda_1}^k\bigr)}{\norm{\mathbf v_1 + O(\abs{\lambda_2/\lambda_1}^k)}}, \qquad \mu_k = \lambda_1 + O\left(\abs{\frac{\lambda_2}{\lambda_1}}^k\right),
$$

and if $A$ is symmetric, $\mu_k = \lambda_1 + O\left(\abs{\lambda_2/\lambda_1}^{2k}\right)$.
:::

::: proof
The normalisations only rescale, so $\mathbf x^{(k)}$ is a multiple of

$$
A^k\mathbf x^{(0)} = \sum_ic_i\lambda_i^k\mathbf v_i = c_1\lambda_1^k\Bigl(\mathbf v_1 + \sum_{i\ge2}\frac{c_i}{c_1}\Bigl(\frac{\lambda_i}{\lambda_1}\Bigr)^k\mathbf v_i\Bigr) .
$$

Every ratio satisfies $\abs{\lambda_i/\lambda_1} \le \abs{\lambda_2/\lambda_1} < 1$, so the bracket is $\mathbf v_1 + O(\abs{\lambda_2/\lambda_1}^k)$, which gives the first statement; the Rayleigh quotient is a continuous function of the direction, with $\mu = \lambda_1$ at $\mathbf v_1$, and differentiable, so it inherits the rate. If $A$ is symmetric we may take the $\mathbf v_i$ orthonormal ([[linear-algebra/spectral-theorem]]). Writing $\mathbf x^{(k)} \propto \sum_ia_i\mathbf v_i$ with $a_1 = 1$ and $a_i = O(\abs{\lambda_2/\lambda_1}^k)$,

$$
\mu_k = \frac{\sum_i\lambda_ia_i^2}{\sum_ia_i^2} = \lambda_1 + \frac{\sum_{i\ge2}(\lambda_i - \lambda_1)a_i^2}{\sum_ia_i^2} = \lambda_1 + O\Bigl(\abs{\frac{\lambda_2}{\lambda_1}}^{2k}\Bigr).
$$
:::

::: example The power method by hand {#ex-power}
Apply the power method to $A = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$, starting from $\mathbf x^{(0)} = (1, 0)\T$.
::: solution
The eigenvalues are $\frac{5 \pm\sqrt5}{2}$: $\lambda_1 = 3.618\,034$ and $\lambda_2 = 1.381\,966$, with ratio $0.382$. The first products are $A(1, 0)\T = (2, 1)\T$, then $A(2, 1)\T = (5, 5)\T$, then $(15, 20)\T \propto (3, 4)\T$, and so on. The Rayleigh quotients and their errors $\lambda_1 - \mu_k$:

| $k$ | $0$ | $1$ | $2$ | $3$ | $4$ | $5$ | $8$ | $10$ |
|---|---|---|---|---|---|---|---|---|
| $\mu_k$ | $2$ | $3$ | $3.5$ | $3.6$ | $3.615\,385$ | $3.617\,647$ | $3.618\,032\,79$ | $3.618\,033\,963$ |
| error | $1.6$ | $0.62$ | $0.12$ | $0.018$ | $2.6\times10^{-3}$ | $3.9\times10^{-4}$ | $1.2\times10^{-6}$ | $2.6\times10^{-8}$ |

The error shrinks by about $0.146 = (0.382)^2$ per step, the squared ratio predicted for symmetric matrices, and the direction approaches the eigenvector $(0.5257, 0.8507)\T$.
:::
:::

::: widget transform2d
matrix: 2, 1; 1, 3
eigen: true
vector: 1, 0
caption: The matrix $\begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$ with its eigenvectors. Applying $A$ stretches the direction of $\mathbf v_1$ by $3.618$ and that of $\mathbf v_2$ only by $1.382$. Drag the vector and imagine applying $A$ repeatedly: whatever its starting direction (unless it lies exactly along $\mathbf v_2$), the $\mathbf v_1$ component grows fastest and the vector swings towards $\mathbf v_1$. That is the power method.
:::

Two simple modifications greatly extend the method. **Inverse iteration** applies the power method to $(A - \sigma I)^{-1}$, whose eigenvalues are $\frac{1}{\lambda_i - \sigma}$; the dominant one corresponds to the eigenvalue $\lambda_i$ *closest to the shift* $\sigma$, and the convergence factor is $\frac{\abs{\lambda_i - \sigma}}{\abs{\lambda_j - \sigma}}$ with $\lambda_j$ the next closest. Each step solves a linear system with the same matrix, so one LU factorisation suffices. Updating the shift at every step with the current Rayleigh quotient gives **Rayleigh quotient iteration**, which for symmetric matrices converges *cubically*.

::: application PageRank
Google's original ranking of web pages modelled a random surfer who follows links at random and occasionally jumps to a random page. The importance of a page is its long-run probability of being visited: the dominant eigenvector, with eigenvalue $1$, of the huge stochastic matrix of this Markov chain ([[probability/markov-chains]]). With billions of pages no factorisation is possible, but the power method needs only sparse matrix–vector products, and the random jumps (with probability $0.15$ in the original 1998 paper of Brin and Page) guarantee that $\abs{\lambda_2} \le 0.85$, so a few dozen iterations suffice.
:::

## The QR algorithm

The power method finds one eigenvalue. To find them all, apply it to many vectors at once and keep them orthonormal — and then reorganise the computation in a strikingly simple form. Recall that every square matrix has a **QR factorisation** $A = QR$ with $Q$ orthogonal ($Q\T Q = I$) and $R$ upper triangular, computed stably by Householder reflections (Gram–Schmidt orthogonalisation, [[linear-algebra/inner-products]], gives the same factors up to signs in exact arithmetic, but in floating point its computed $Q$ loses orthogonality when $A$ is ill-conditioned — less severely in the modified form, but still in proportion to $\kappa(A)$).

::: algorithm The QR algorithm {#alg-qr}
Set $A_0 = A$. For $k = 0, 1, 2, \dots$: factorise $A_k = Q_kR_k$ and set $A_{k+1} = R_kQ_k$.
:::

Reversing the order of the factors looks like an arbitrary trick, but it preserves the eigenvalues and gradually reveals them.

::: theorem Properties of the QR iteration {#thm-qr}
1. Each $A_{k+1} = Q_k\T A_kQ_k$ is orthogonally similar to $A_k$, so all $A_k$ have the same eigenvalues as $A$; if $A$ is symmetric, so is every $A_k$.
2. With $\mathcal Q_k = Q_0Q_1\cdots Q_{k-1}$ and $\mathcal R_k = R_{k-1}\cdots R_1R_0$, we have $A^k = \mathcal Q_k\mathcal R_k$ and $A_k = \mathcal Q_k\T A\,\mathcal Q_k$.
3. If $A$ is real with eigenvalues of distinct absolute values $\abs{\lambda_1} > \abs{\lambda_2} > \cdots > \abs{\lambda_n} > 0$ (and a mild condition on the eigenvectors holds), then $A_k$ tends to upper triangular form: its diagonal converges to $\lambda_1, \dots, \lambda_n$, and its entries below the diagonal tend to $0$, the entry $(A_k)_{i+1,i}$ like $\abs{\lambda_{i+1}/\lambda_i}^k$. (The entries above the diagonal need not converge; they may change sign at every step.)
:::

::: proof
1. From $A_k = Q_kR_k$, $R_k = Q_k\T A_k$, so $A_{k+1} = R_kQ_k = Q_k\T A_kQ_k$, a similarity transformation with $Q_k^{-1} = Q_k\T$. Similar matrices have the same eigenvalues, and $(Q\T SQ)\T = Q\T S\T Q$ preserves symmetry.

2. Iterating 1 gives $A_k = \mathcal Q_k\T A\,\mathcal Q_k$, i.e. $\mathcal Q_kA_k = A\mathcal Q_k$. For the first identity use induction: $A^1 = Q_0R_0$, and if $A^k = \mathcal Q_k\mathcal R_k$ then

$$
A^{k+1} = A\,\mathcal Q_k\mathcal R_k = \mathcal Q_kA_k\mathcal R_k = \mathcal Q_kQ_kR_k\mathcal R_k = \mathcal Q_{k+1}\mathcal R_{k+1}.
$$

3. *Proof sketch.* By 2, $\mathcal Q_k\mathcal R_k$ is a QR factorisation of $A^k$; in particular the first $j$ columns of $\mathcal Q_k$ are an orthonormal basis of the span of the first $j$ columns of $A^k$, which is $A^k$ applied to the span of $\mathbf e_1, \dots, \mathbf e_j$. By the argument of [[#thm-power]], applied to subspaces ("simultaneous iteration"), this span converges to the span of the eigenvectors for $\lambda_1, \dots, \lambda_j$ at the rate $\abs{\lambda_{j+1}/\lambda_j}^k$. Then $A_k = \mathcal Q_k\T A\mathcal Q_k$ tends to block upper triangular form for every $j$, i.e. to upper triangular form. See Trefethen and Bau, *Numerical Linear Algebra*, Lectures 28–29, for the details.
:::

::: example The QR algorithm on a symmetric matrix {#ex-qr}
Run the QR algorithm on $A = \begin{pmatrix}2 & 1 & 0\\ 1 & 3 & 1\\ 0 & 1 & 4\end{pmatrix}$, whose eigenvalues are $3 + \sqrt3 = 4.732\,051$, $3$ and $3 - \sqrt3 = 1.267\,949$.
::: solution
The iterates stay symmetric and tridiagonal. Their diagonals and the sizes of the subdiagonal entries:

| $k$ | diagonal of $A_k$ | $\abs{(A_k)_{21}}$ | $\abs{(A_k)_{32}}$ |
|---|---|---|---|
| $0$ | $2,\ 3,\ 4$ | $1$ | $1$ |
| $1$ | $3,\ 3,\ 3$ | $1.10$ | $1.34$ |
| $3$ | $4.157,\ 3.488,\ 1.355$ | $0.83$ | $0.42$ |
| $5$ | $4.606,\ 3.123,\ 1.270$ | $0.45$ | $0.066$ |
| $8$ | $4.723\,3,\ 3.008\,7,\ 1.267\,96$ | $0.12$ | $4.8\times10^{-3}$ |
| $12$ | $4.731\,82,\ 3.000\,23,\ 1.267\,949$ | $0.020$ | $1.5\times10^{-4}$ |

The diagonal converges to the eigenvalues in decreasing order. The entry $(A_k)_{32}$ decays by about $\frac{\lambda_3}{\lambda_2} = 0.42$ per step and $(A_k)_{21}$ by about $\frac{\lambda_2}{\lambda_1} = 0.63$, exactly as [[#thm-qr]] predicts. Once $(A_k)_{32}$ is negligible, $\lambda_3$ can be read off and the problem **deflated** to the leading $2\times2$ block.
:::
:::

The basic algorithm is slow when eigenvalues are close in size, and each step costs $O(n^3)$. The practical algorithm adds three ingredients. First, $A$ is reduced once, by orthogonal similarity transformations, to **Hessenberg form** (zero below the first subdiagonal; tridiagonal if $A$ is symmetric); the QR iteration preserves this form, and a step then costs only $O(n^2)$ flops ($O(n)$ in the symmetric case). Second, **shifts**: one factorises $A_k - \sigma_kI = Q_kR_k$ and sets $A_{k+1} = R_kQ_k + \sigma_kI$, which is still similar to $A_k$; with $\sigma_k$ close to an eigenvalue — for instance the Wilkinson shift computed from the trailing $2\times2$ block — the last subdiagonal entry converges quadratically, or cubically in the symmetric case. Third, **deflation** splits off converged eigenvalues. With these, all eigenvalues of an $n\times n$ matrix are found in $O(n^3)$ flops, typically with two or three iterations per eigenvalue; this is what `numpy.linalg.eig` and `eigvalsh` do through LAPACK.

::: quiz
Inverse iteration with shift $\sigma = 2.5$ is applied to a matrix with eigenvalues $1$, $2$ and $4$. Which eigenvalue is found, and what is the convergence factor per step?
- [ ] $4$, with factor $\frac12$
- [x] $2$, with factor $\frac13$
- [ ] $1$, with factor $\frac23$
- [ ] $2$, with factor $\frac12$
::: solution
The eigenvalues of $(A - 2.5I)^{-1}$ are $\frac{1}{-1.5}$, $\frac{1}{-0.5}$ and $\frac{1}{1.5}$, with absolute values $0.667$, $2$ and $0.667$. The dominant one, $-2$, corresponds to $\lambda = 2$, the eigenvalue closest to the shift. The convergence factor is the ratio of the second-largest to the largest: $\frac{0.667}{2} = \frac13$, i.e. $\frac{\abs{2 - 2.5}}{\abs{1 - 2.5}} = \frac{0.5}{1.5}$.
:::
:::

::: history
Carl Friedrich Gauss described an iterative method for the normal equations of least squares in an 1823 letter to Christian Ludwig Gerling, remarking that it could be carried out "half asleep"; Carl Gustav Jacobi published his method in 1845, and Philipp Ludwig von Seidel his in 1874. David Young's 1950 thesis created the theory of SOR, independently of Stanley Frankel. The power method was set out by Richard von Mises and Hilda Pollaczek-Geiringer in 1929. Heinz Rutishauser's LR algorithm (1958) led to the QR algorithm, found independently by John Francis and Vera Kublanovskaya in 1961; with the improvements described above it became the standard method for eigenvalue problems and is often listed among the most important algorithms of the twentieth century.
:::

## Where this leads

Modern iterative solvers for symmetric positive definite systems are **Krylov subspace methods**, above all the conjugate gradient method of Hestenes and Stiefel (1952), which builds the best approximation from the span of $\mathbf b, A\mathbf b, A^2\mathbf b, \dots$ and whose speed depends on $\sqrt{\kappa(A)}$; together with preconditioning (which uses an approximate factorisation or a few multigrid cycles as $M$) they solve the large systems of partial differential equations ([[pde/laplace-equation]]). For eigenvalues, the symmetric QR algorithm and the singular value decomposition ([[linear-algebra/svd]]) are close relatives, and Krylov methods (Lanczos, Arnoldi) find a few eigenvalues of huge sparse matrices. The spectral radius also governs the stability of time-stepping methods for differential equations in [[numerical-analysis/numerical-odes]].

::: summary
- Splitting $A = M - N$ gives $\mathbf x^{(k+1)} = M^{-1}(N\mathbf x^{(k)} + \mathbf b)$; Jacobi uses $M = D$, Gauss–Seidel $M = D + L$, SOR $M = \frac1\omega D + L$. Each sweep costs $O(\text{non-zeros})$.
- The error satisfies $\mathbf e^{(k)} = G^k\mathbf e^{(0)}$; the iteration converges for every start if and only if $\rho(G) < 1$, and $\rho(G)$ is the asymptotic error reduction per step.
- Strict diagonal dominance guarantees convergence of Jacobi and Gauss–Seidel; for SPD matrices Gauss–Seidel and SOR with $0 < \omega < 2$ converge; SOR needs $0 < \omega < 2$ in any case.
- On model problems $\rho \to 1$ as the grid is refined; optimal SOR, conjugate gradients and multigrid are far faster than Jacobi and Gauss–Seidel.
- The power method converges to the dominant eigenvector at rate $\abs{\lambda_2/\lambda_1}$ (squared for the Rayleigh quotient of a symmetric matrix); inverse iteration with a shift finds the eigenvalue nearest the shift.
- The QR algorithm $A_k = Q_kR_k$, $A_{k+1} = R_kQ_k$ produces orthogonally similar matrices converging to triangular form; with Hessenberg reduction, shifts and deflation it computes all eigenvalues in $O(n^3)$ flops.
:::

## Exercises

::: exercise One Jacobi step {level=1 check="5/2"}
For the system of [[#ex-jacobi-gs]], compute the first Jacobi iterate from $\mathbf x^{(0)} = \mathbf 0$. What is $x_3^{(1)}$?
::: solution
With all old values zero, $x_i^{(1)} = b_i/a_{ii}$: $\mathbf x^{(1)} = \left(\frac24, \frac44, \frac{10}{4}\right) = (0.5, 1, 2.5)$, so $x_3^{(1)} = \frac52$.
:::
:::

::: exercise A Jacobi spectral radius {level=1 check="1/sqrt(6)"}
Find the spectral radius of the Jacobi iteration matrix for $A = \begin{pmatrix}3 & 1\\ 1 & 2\end{pmatrix}$.
::: solution
$G_J = -D^{-1}(L + U) = \begin{pmatrix}0 & -\frac13\\ -\frac12 & 0\end{pmatrix}$, whose characteristic polynomial is $\lambda^2 - \frac16$. So $\lambda = \pm\frac{1}{\sqrt6}$ and $\rho(G_J) = \frac{1}{\sqrt6} \approx 0.408$.
:::
:::

::: exercise A Rayleigh quotient {level=1 check="7/2"}
Compute the Rayleigh quotient of $\mathbf x = (1, 1)\T$ for $A = \begin{pmatrix}2 & 1\\ 1 & 3\end{pmatrix}$.
::: solution
$\mathbf x\T A\mathbf x = 2 + 1 + 1 + 3 = 7$ and $\mathbf x\T\mathbf x = 2$, so $\mu = \frac72 = 3.5$ — the value $\mu_2$ in [[#ex-power]], since $(1, 1)\T \propto (5, 5)\T$.
:::
:::

::: exercise A Gauss–Seidel spectral radius {level=2 check="1/6"}
For the matrix of the previous exercise but one, $A = \begin{pmatrix}3 & 1\\ 1 & 2\end{pmatrix}$, compute $\rho(G_{GS})$ and compare with $\rho(G_J)^2$.
::: solution
$G_{GS} = -(D + L)^{-1}U$ with $D + L = \begin{pmatrix}3 & 0\\ 1 & 2\end{pmatrix}$ and $U = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$. Then $(D + L)^{-1} = \begin{pmatrix}\frac13 & 0\\ -\frac16 & \frac12\end{pmatrix}$ and $G_{GS} = -\begin{pmatrix}0 & \frac13\\ 0 & -\frac16\end{pmatrix} = \begin{pmatrix}0 & -\frac13\\ 0 & \frac16\end{pmatrix}$. Its eigenvalues are $0$ and $\frac16$, so $\rho(G_{GS}) = \frac16 = \rho(G_J)^2$: one Gauss–Seidel step is worth two Jacobi steps.
:::
:::

::: exercise Counting iterations {level=2 check="132"}
An iteration has $\rho(G) = 0.9$. Approximately how many iterations reduce the error by a factor $10^{-6}$? (Use the asymptotic rate.)
::: solution
We need $0.9^k \le 10^{-6}$, i.e. $k \ge \frac{6}{-\log_{10}0.9} = \frac{6}{0.045\,76} = 131.1$, so $k = 132$.
:::
:::

::: exercise Shifted inverse iteration {level=2 check="1/3"}
A symmetric matrix has eigenvalues $1$, $2$ and $4$. What is the asymptotic convergence factor of inverse iteration with shift $\sigma = 2.5$? Which shift in $[1, 4]$ would make inverse iteration converge to the eigenvalue $4$ with factor $\frac{1}{10}$? (Enter the convergence factor for $\sigma = 2.5$.)
::: solution
As in the quick check, the factor is $\frac{\abs{2 - 2.5}}{\abs{1 - 2.5}} = \frac13$. For convergence to $4$ with factor $\frac1{10}$ we need $\frac{\abs{4 - \sigma}}{\min(\abs{2 - \sigma}, \abs{1 - \sigma})} = \frac{1}{10}$. For $\sigma$ between $2$ and $4$ the nearest other eigenvalue is $2$, so $\frac{4 - \sigma}{\sigma - 2} = \frac{1}{10}$, giving $\sigma = \frac{42}{11} \approx 3.818$.
:::
:::

::: exercise The QR iteration preserves structure {level=2}
Show that if $A_k$ is symmetric, then $A_{k+1} = R_kQ_k$ is symmetric, and that if $A_k$ is invertible, $A_{k+1} = R_kA_kR_k^{-1}$. Why does the QR algorithm not simply compute the eigenvalues in one step?
::: solution
$A_{k+1} = Q_k\T A_kQ_k$ by [[#thm-qr]], and $(Q_k\T A_kQ_k)\T = Q_k\T A_k\T Q_k = A_{k+1}$ if $A_k$ is symmetric. Also $Q_k = A_kR_k^{-1}$ when $R_k$ is invertible (which holds when $A_k$ is), so $A_{k+1} = R_kQ_k = R_kA_kR_k^{-1}$, another similarity. No finite sequence of such steps can produce the eigenvalues exactly in general: that would give a formula for the roots of polynomials of any degree in terms of arithmetic operations and square roots, which the Abel–Ruffini theorem rules out for degree $5$ and higher ([[abstract-algebra/fields-galois]]). Eigenvalue algorithms must be iterative.
:::
:::

::: exercise Eigenvalues of the model problem {level=3 #exr-model-eigen}
Let $T$ be the $n\times n$ tridiagonal matrix with $2$ on the diagonal and $-1$ on the sub- and superdiagonals. Show that $\mathbf v_k$ with components $(\mathbf v_k)_j = \sin\frac{jk\pi}{n+1}$, $j = 1, \dots, n$, is an eigenvector of $T$ with eigenvalue $2 - 2\cos\frac{k\pi}{n+1}$, for $k = 1, \dots, n$, and deduce that the Jacobi iteration matrix $G_J = I - \frac12T$ has spectral radius $\cos\frac{\pi}{n+1}$.
::: solution
Let $\theta = \frac{k\pi}{n+1}$ and $s_j = \sin(j\theta)$; note $s_0 = 0$ and $s_{n+1} = \sin(k\pi) = 0$. Row $j$ of $T\mathbf v_k$ is $-s_{j-1} + 2s_j - s_{j+1}$ (valid also for $j = 1$ and $j = n$ thanks to $s_0 = s_{n+1} = 0$). By the identity $\sin((j-1)\theta) + \sin((j+1)\theta) = 2\sin(j\theta)\cos\theta$, this equals $(2 - 2\cos\theta)s_j$. The vectors are non-zero (for example $s_1 = \sin\theta \ne 0$), so they are eigenvectors, with $n$ distinct eigenvalues $2 - 2\cos\frac{k\pi}{n+1}$. Since $D = 2I$, $G_J = I - D^{-1}T = I - \frac12T$ has eigenvalues $1 - (1 - \cos\frac{k\pi}{n+1}) = \cos\frac{k\pi}{n+1}$, $k = 1, \dots, n$, of which the largest in absolute value is $\cos\frac{\pi}{n+1}$ (attained also, with a minus sign, at $k = n$).
:::
:::

::: exercise A norm criterion with an a posteriori bound {level=3}
Suppose $\norm G < 1$ in some induced norm, and $\mathbf x^{(k)}$ are the iterates of $\mathbf x^{(k+1)} = G\mathbf x^{(k)} + \mathbf c$ with limit $\mathbf x^*$. Prove that $\norm{\mathbf x^{(k)} - \mathbf x^*} \le \frac{\norm G}{1 - \norm G}\norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}}$. Evaluate the factor for the Jacobi iteration of [[#ex-jacobi-gs]] in the $\infty$-norm.
::: solution
As in the scalar case ([[numerical-analysis/root-finding#thm-contraction]]): $\mathbf x^{(k)} - \mathbf x^* = G(\mathbf x^{(k-1)} - \mathbf x^*)$, and $\mathbf x^{(k-1)} - \mathbf x^* = (\mathbf x^{(k-1)} - \mathbf x^{(k)}) + (\mathbf x^{(k)} - \mathbf x^*)$. Hence $\norm{\mathbf x^{(k-1)} - \mathbf x^*} \le \norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}} + \norm G\norm{\mathbf x^{(k-1)} - \mathbf x^*}$, so $\norm{\mathbf x^{(k-1)} - \mathbf x^*} \le \frac{1}{1 - \norm G}\norm{\mathbf x^{(k)} - \mathbf x^{(k-1)}}$, and multiplying by $\norm G$ gives the claim. For the Jacobi matrix of [[#ex-jacobi-gs]], the absolute row sums of $G_J$ are $\frac14$, $\frac12$, $\frac14$, so $\norm{G_J}_\infty = \frac12$ and the factor is $\frac{1/2}{1/2} = 1$: the error is at most the size of the last step.
:::
:::
