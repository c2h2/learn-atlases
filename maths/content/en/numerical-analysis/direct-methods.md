Linear systems $A\mathbf x = \mathbf b$ are the workhorse of scientific computing. Discretising a differential equation, fitting a model to data, computing a spline ([[numerical-analysis/interpolation]]), taking a step of Newton's method in several variables, analysing an electrical network or a bridge — all end in a linear system, often with thousands or millions of unknowns. How should a computer solve them?

Not by Cramer's rule. Evaluating determinants by cofactor expansion costs about $n!$ operations, so a system of $20$ equations would need roughly $20! \approx 2.4\times10^{18}$ operations — decades on a fast processor. **Gaussian elimination**, which you met in [[linear-algebra/linear-systems]], needs about $\frac23n^3$: for $n = 1000$ that is under a billion operations, a fraction of a second. This chapter recasts elimination as a **factorisation** $A = LU$, counts its cost, shows why it must be combined with **pivoting** to be reliable, and introduces the **condition number**, which tells us how many digits of the computed solution we can trust. For symmetric positive definite matrices, the **Cholesky factorisation** does the job at half the cost.

Throughout, $A$ is a real $n\times n$ matrix and *flop* means one floating-point operation ($+$, $-$, $\times$ or $/$).

## Gaussian elimination as a factorisation

Gaussian elimination subtracts multiples of the pivot row from the rows below it, column by column, until the matrix is upper triangular; back substitution then finds the solution. In step $k$, with current entries $a_{ij}^{(k)}$, the **multipliers** are

$$
\ell_{ik} = \frac{a_{ik}^{(k)}}{a_{kk}^{(k)}}, \qquad i = k+1, \dots, n,
$$

and row $i$ is replaced by row $i$ minus $\ell_{ik}$ times row $k$. The number $a_{kk}^{(k)}$ is the $k$th **pivot**. Recording the multipliers turns elimination into a matrix factorisation.

::: theorem The LU factorisation {#thm-lu}
Suppose Gaussian elimination on $A$ without row exchanges produces non-zero pivots $u_{11}, \dots, u_{nn}$ (only $u_{11}, \dots, u_{n-1,n-1}$ are needed to complete the elimination). Then $A = LU$, where $U$ is the resulting upper triangular matrix and $L$ is the **unit lower triangular** matrix (ones on the diagonal) whose entries below the diagonal are the multipliers $\ell_{ik}$.
:::

::: proof
Step $k$ of elimination multiplies $A^{(k)}$ on the left by $M_k = I - \mathbf m_k\mathbf e_k\T$, where $\mathbf m_k = (0, \dots, 0, \ell_{k+1,k}, \dots, \ell_{nk})\T$ and $\mathbf e_k$ is the $k$th unit vector. Since $\mathbf e_k\T\mathbf m_k = 0$, we have $(I - \mathbf m_k\mathbf e_k\T)(I + \mathbf m_k\mathbf e_k\T) = I - \mathbf m_k(\mathbf e_k\T\mathbf m_k)\mathbf e_k\T = I$, so $M_k^{-1} = I + \mathbf m_k\mathbf e_k\T$. Elimination gives $M_{n-1}\cdots M_1A = U$, hence

$$
A = M_1^{-1}M_2^{-1}\cdots M_{n-1}^{-1}U = \left(I + \mathbf m_1\mathbf e_1\T\right)\cdots\left(I + \mathbf m_{n-1}\mathbf e_{n-1}\T\right)U .
$$

Expanding the product, every term containing two or more factors $\mathbf m_j\mathbf e_j\T\mathbf m_k\mathbf e_k\T$ with $j < k$ vanishes because $\mathbf e_j\T\mathbf m_k = 0$ (the vector $\mathbf m_k$ has zeros in positions $1, \dots, k$). So the product is $I + \sum_k\mathbf m_k\mathbf e_k\T = L$: the multipliers simply drop into place below the diagonal.
:::

Once $A = LU$ is known, $A\mathbf x = \mathbf b$ is solved in two triangular steps: **forward substitution** for $L\mathbf y = \mathbf b$, then **back substitution** for $U\mathbf x = \mathbf y$.

::: example An LU factorisation by hand {#ex-lu}
Factorise $A = \begin{pmatrix}2 & 1 & 1\\ 4 & -6 & 0\\ -2 & 7 & 2\end{pmatrix}$ and solve $A\mathbf x = (5, -2, 9)\T$.
::: solution
*Column 1.* The pivot is $2$; the multipliers are $\ell_{21} = \frac42 = 2$ and $\ell_{31} = \frac{-2}{2} = -1$. Subtracting $2\times$ row 1 from row 2 and $-1\times$ row 1 from row 3 gives rows $(0, -8, -2)$ and $(0, 8, 3)$.

*Column 2.* The pivot is $-8$; $\ell_{32} = \frac{8}{-8} = -1$, and row 3 becomes $(0, 0, 1)$. Hence

$$
L = \begin{pmatrix}1 & 0 & 0\\ 2 & 1 & 0\\ -1 & -1 & 1\end{pmatrix}, \qquad U = \begin{pmatrix}2 & 1 & 1\\ 0 & -8 & -2\\ 0 & 0 & 1\end{pmatrix},
$$

and multiplying out confirms $LU = A$.

*Forward substitution* $L\mathbf y = \mathbf b$: $y_1 = 5$, $y_2 = -2 - 2\cdot5 = -12$, $y_3 = 9 + 5 + (-12) = 2$.

*Back substitution* $U\mathbf x = \mathbf y$: $x_3 = 2$; $-8x_2 - 2\cdot2 = -12$ gives $x_2 = 1$; $2x_1 + 1 + 2 = 5$ gives $x_1 = 1$. So $\mathbf x = (1, 1, 2)\T$, and indeed $A\mathbf x = (5, -2, 9)\T$.
:::
:::

::: widget rowreduce
matrix: 2,1,1,5; 4,-6,0,-2; -2,7,2,9
augmented: true
caption: Gaussian elimination on the augmented matrix of [[#ex-lu]], one row operation at a time with exact fractions. The multipliers used in the downward sweep ($2$, $-1$, then $-1$) are exactly the entries of $L$; the triangular matrix reached at that point is $U$. The figure continues to the reduced row echelon form, which a numerical code never computes — back substitution is cheaper.
:::

When does the factorisation exist? Since the leading $k\times k$ block of $A = LU$ equals the product of the leading $k\times k$ blocks of $L$ and $U$, its determinant is $u_{11}u_{22}\cdots u_{kk}$. Hence all pivots are non-zero exactly when all **leading principal minors** $\det A_k$ ($k = 1, \dots, n$) are non-zero, and then the factorisation is unique ([[#exr-lu-unique]]).

### The cost

::: theorem Operation count {#thm-flops}
Computing the LU factorisation of an $n\times n$ matrix costs $\frac23n^3 + O(n^2)$ flops. Forward and back substitution cost $n^2 + O(n)$ flops each.
:::

::: proof
At step $k$ there are $n - k$ rows below the pivot. For each, one division forms the multiplier and the update of the $n - k$ remaining entries costs one multiplication and one subtraction per entry. The step costs $(n - k) + 2(n - k)^2$ flops, and summing over $k = 1, \dots, n-1$ with $j = n - k$,

$$
\sum_{j=1}^{n-1}\left(2j^2 + j\right) = \frac{(n-1)n(2n-1)}{3} + \frac{(n-1)n}{2} = \frac23n^3 + O(n^2).
$$

Back substitution computes $x_i = \left(y_i - \sum_{j > i}u_{ij}x_j\right)/u_{ii}$, which takes $2(n - i) + 1$ flops; summing over $i$ gives $n^2$. Forward substitution is the same without the divisions.
:::

The factorisation dominates the cost, and it is done once: further right-hand sides cost only $2n^2$ flops each. Doubling $n$ multiplies the time by $8$. A dense system with $n = 10\,000$ needs about $7\times10^{11}$ flops, seconds on a modern laptop.

::: warning Do not compute the inverse
To solve $A\mathbf x = \mathbf b$, never form $A^{-1}$ and multiply. Computing $A^{-1}$ costs about $2n^3$ flops, three times as much as the LU factorisation, and the result $A^{-1}\mathbf b$ is usually *less* accurate. The expression $A^{-1}\mathbf b$ in a formula should be read as "solve a linear system"; in code, use `numpy.linalg.solve(A, b)` or `scipy.linalg.lu_factor` and `lu_solve`. The same goes for $A^{-1}B$: factorise $A$ once and solve for each column of $B$.
:::

Structure reduces the cost dramatically. For a **tridiagonal** matrix, such as the spline system of [[numerical-analysis/interpolation#thm-spline]], elimination touches only the three diagonals and costs $O(n)$ flops (the *Thomas algorithm*); for a band of width $p$ it costs $O(np^2)$. Sparse matrices from differential equations are handled with sparse factorisations or with the iterative methods of [[numerical-analysis/iterative-methods]].

## Pivoting

Elimination without row exchanges can fail even when $A$ is invertible: $\begin{pmatrix}0 & 1\\ 1 & 1\end{pmatrix}$ has a zero first pivot. Far worse, a *small* pivot can destroy the accuracy of a computation without any warning.

::: example A tiny pivot {#ex-tiny-pivot}
Solve $\begin{pmatrix}10^{-20} & 1\\ 1 & 1\end{pmatrix}\begin{pmatrix}x_1\\ x_2\end{pmatrix} = \begin{pmatrix}1\\ 2\end{pmatrix}$ in double precision, with and without exchanging the rows.
::: solution
The exact solution is $x_1 = \frac{1}{1 - 10^{-20}} \approx 1$, $x_2 = \frac{1 - 2\cdot10^{-20}}{1 - 10^{-20}} \approx 1$, and the matrix is very well conditioned.

*Without exchange.* The multiplier is $\ell_{21} = 10^{20}$. Then $u_{22} = 1 - 10^{20}$ rounds to $-10^{20}$, and the right-hand side becomes $2 - 10^{20}$, which also rounds to $-10^{20}$. Back substitution gives $x_2 = 1$ and then $x_1 = \frac{1 - x_2}{10^{-20}} = 0$. The answer $x_1 = 0$ is completely wrong. The information in the entry $a_{22} = 1$ was swamped by the huge multiple of row $1$.

*With exchange.* Swapping the rows makes the pivot $1$ and the multiplier $10^{-20}$. Then $u_{22} = 1 - 10^{-20}$ rounds to $1$, the right-hand side $1 - 2\cdot10^{-20}$ rounds to $1$, so $x_2 = 1$ and $x_1 = 2 - x_2 = 1$: correct to full precision.
:::
:::

The cure is **partial pivoting**: at step $k$, before eliminating, swap row $k$ with the row $i \ge k$ that has the largest $\abs{a_{ik}^{(k)}}$. All multipliers then satisfy $\abs{\ell_{ik}} \le 1$.

```python
import numpy as np

def lu_partial_pivoting(A):
    """Return perm, L, U with A[perm] = L @ U (Doolittle form, partial pivoting)."""
    U = np.array(A, dtype=float)
    n = U.shape[0]
    L = np.eye(n)
    perm = np.arange(n)
    for k in range(n - 1):
        p = k + np.argmax(np.abs(U[k:, k]))          # pivot row
        if p != k:                                   # swap rows k and p
            U[[k, p], k:] = U[[p, k], k:]
            L[[k, p], :k] = L[[p, k], :k]
            perm[[k, p]] = perm[[p, k]]
        L[k+1:, k] = U[k+1:, k] / U[k, k]            # multipliers, |l| <= 1
        U[k+1:, k:] -= np.outer(L[k+1:, k], U[k, k:])
    return perm, L, np.triu(U)
```

::: theorem LU with partial pivoting {#thm-plu}
For every invertible matrix $A$ there is a permutation matrix $P$, a unit lower triangular $L$ with all entries $\abs{\ell_{ij}} \le 1$, and an invertible upper triangular $U$ such that $PA = LU$.
:::

::: proof {collapsed}
*Proof sketch.* At step $k$ the current matrix has the block form $\begin{pmatrix}U_{11} & *\\ 0 & S\end{pmatrix}$ with $U_{11}$ upper triangular and invertible, obtained from $A$ by invertible row operations. If the first column of $S$ were zero, this matrix — and hence $A$ — would be singular. So the first column of $S$ has a non-zero entry, the largest one in absolute value is chosen as pivot, and all multipliers have absolute value at most $1$. Each step is $M_kP_k$ with $P_k$ a row swap of rows $\ge k$. One checks that $P_jM_k = \tilde M_kP_j$ for $j > k$, where $\tilde M_k$ is $M_k$ with two multipliers swapped, so all permutations can be moved to the right: $\tilde M_{n-1}\cdots\tilde M_1P_{n-1}\cdots P_1A = U$. Setting $P = P_{n-1}\cdots P_1$ and $L = (\tilde M_{n-1}\cdots\tilde M_1)^{-1}$ gives $PA = LU$ as in [[#thm-lu]]. The details are in Trefethen and Bau, Lecture 21.
:::

For the matrix of [[#ex-lu]], partial pivoting first swaps rows $1$ and $2$ (pivot $4$ instead of $2$), giving $L = \begin{pmatrix}1 & 0 & 0\\ 0.5 & 1 & 0\\ -0.5 & 1 & 1\end{pmatrix}$ and $U = \begin{pmatrix}4 & -6 & 0\\ 0 & 4 & 1\\ 0 & 0 & 1\end{pmatrix}$. This is what `scipy.linalg.lu` returns, and LAPACK's routine `getrf`, called by `numpy.linalg.solve`, does the same.

How good is the result? Wilkinson's analysis shows that Gaussian elimination with partial pivoting is backward stable in practice, with one caveat: the **growth factor** $\rho_n = \max\abs{u_{ij}}/\max\abs{a_{ij}}$.

::: theorem Backward stability of Gaussian elimination {#thm-ge-backward}
The solution $\hat{\mathbf x}$ of $A\mathbf x = \mathbf b$ computed in floating-point arithmetic by Gaussian elimination with partial pivoting satisfies $(A + \Delta A)\hat{\mathbf x} = \mathbf b$ with

$$
\frac{\norm{\Delta A}_\infty}{\norm{A}_\infty} \le c\,n^3\rho_n\,u,
$$

where $c$ is a modest constant and $u$ the unit roundoff.
:::

::: proof {collapsed}
*Proof sketch.* Using the standard model $\operatorname{fl}(x\circ y) = (x\circ y)(1 + \delta)$ ([[numerical-analysis/floating-point#ax-standard-model]]) at every step, one shows that the computed factors satisfy $\hat L\hat U = PA + E$ with $\abs{E} \le \gamma_n\abs{\hat L}\abs{\hat U}$ entrywise, and that the triangular solves are backward stable in the same componentwise sense, as for the inner products in the exercises of [[numerical-analysis/floating-point]]. Combining these gives $(A + \Delta A)\hat{\mathbf x} = \mathbf b$ with $\abs{\Delta A} \le \gamma_{3n}\abs{\hat L}\abs{\hat U}$ (up to the permutation). With partial pivoting $\abs{\hat\ell_{ij}} \le 1$, and the entries of $\hat U$ are bounded by $\rho_n\max\abs{a_{ij}}$, which yields the norm bound. See Higham, *Accuracy and Stability of Numerical Algorithms*, Chapter 9.
:::

With partial pivoting $\rho_n \le 2^{n-1}$, and this bound is attained: for the $10\times10$ matrix with ones on the diagonal and in the last column and $-1$ everywhere below the diagonal, the growth factor is exactly $2^9 = 512$. Such matrices are extremely rare in practice, and growth factors of real problems are almost always small. Partial pivoting is therefore the universal default, and the computed solution is the exact solution of a system whose matrix differs from $A$ in about the sixteenth digit. Whether that is good enough depends on the problem itself — which brings us to conditioning.

::: quiz
Why does partial pivoting choose the entry of *largest* absolute value as pivot?
- [ ] To make the determinant as large as possible
- [x] To keep all multipliers at most $1$ in absolute value, so that large multiples of rows do not swamp other entries
- [ ] Because the largest entry is the most accurate
- [ ] To make the matrix $U$ symmetric
::: solution
Dividing by the largest available entry makes $\abs{\ell_{ik}} \le 1$. Large multipliers add huge multiples of one row to another, and the original information in the other row is lost to rounding, as in [[#ex-tiny-pivot]]. Pivoting does not change the determinant except possibly its sign, and $U$ is not symmetric.
:::
:::

## Norms and condition numbers

To measure errors in vectors and matrices we use norms. For $\mathbf x \in \R^n$ the common **vector norms** are $\norm{\mathbf x}_1 = \sum\abs{x_i}$, $\norm{\mathbf x}_2 = \sqrt{\sum x_i^2}$ and $\norm{\mathbf x}_\infty = \max\abs{x_i}$.

::: definition Matrix norm and condition number {#def-cond}
For a vector norm $\norm\cdot$, the **induced matrix norm** is

$$
\norm A = \max_{\mathbf x \ne \mathbf 0}\frac{\norm{A\mathbf x}}{\norm{\mathbf x}},
$$

the largest factor by which $A$ stretches a vector. The **condition number** of an invertible matrix is $\kappa(A) = \norm A\,\norm{A^{-1}}$.
:::

Induced norms satisfy $\norm{A\mathbf x} \le \norm A\norm{\mathbf x}$ and $\norm{AB} \le \norm A\norm B$. They are easy to compute for $p = 1$ and $p = \infty$: $\norm A_\infty$ is the largest **row** sum of absolute values and $\norm A_1$ the largest **column** sum ([[#exr-inf-norm]]); $\norm A_2$ is the largest singular value ([[linear-algebra/svd]]). Since $1 = \norm I = \norm{AA^{-1}} \le \norm A\norm{A^{-1}}$, every condition number is at least $1$.

::: theorem Sensitivity of linear systems {#thm-perturbation}
Let $A$ be invertible and $A\mathbf x = \mathbf b$ with $\mathbf b \ne \mathbf 0$.

1. If $A(\mathbf x + \delta\mathbf x) = \mathbf b + \delta\mathbf b$, then $\dfrac{\norm{\delta\mathbf x}}{\norm{\mathbf x}} \le \kappa(A)\dfrac{\norm{\delta\mathbf b}}{\norm{\mathbf b}}$.
2. If $(A + \delta A)(\mathbf x + \delta\mathbf x) = \mathbf b$, then $\dfrac{\norm{\delta\mathbf x}}{\norm{\mathbf x + \delta\mathbf x}} \le \kappa(A)\dfrac{\norm{\delta A}}{\norm A}$.
:::

::: proof
1. Subtracting $A\mathbf x = \mathbf b$ gives $A\,\delta\mathbf x = \delta\mathbf b$, so $\norm{\delta\mathbf x} = \norm{A^{-1}\delta\mathbf b} \le \norm{A^{-1}}\norm{\delta\mathbf b}$. Also $\norm{\mathbf b} = \norm{A\mathbf x} \le \norm A\norm{\mathbf x}$, i.e. $\frac{1}{\norm{\mathbf x}} \le \frac{\norm A}{\norm{\mathbf b}}$. Multiplying the two inequalities gives the result.

2. Expanding, $A\mathbf x + A\,\delta\mathbf x + \delta A(\mathbf x + \delta\mathbf x) = \mathbf b = A\mathbf x$, so $\delta\mathbf x = -A^{-1}\delta A\,(\mathbf x + \delta\mathbf x)$ and $\norm{\delta\mathbf x} \le \norm{A^{-1}}\norm{\delta A}\norm{\mathbf x + \delta\mathbf x} = \kappa(A)\frac{\norm{\delta A}}{\norm A}\norm{\mathbf x + \delta\mathbf x}$.
:::

Both bounds can be attained, so $\kappa(A)$ is exactly the worst-case amplification of relative errors. Combining part 2 with [[#thm-ge-backward]] gives the fundamental rule of thumb of numerical linear algebra:

$$
\frac{\norm{\hat{\mathbf x} - \mathbf x}}{\norm{\mathbf x}} \lesssim \kappa(A)\,u .
$$

In double precision ($u \approx 10^{-16}$), expect to lose about $\log_{10}\kappa(A)$ of the sixteen digits.

::: example A nearly singular system {#ex-nearly-singular}
Let $A = \begin{pmatrix}1 & 1\\ 1 & 1.0001\end{pmatrix}$. Compute $\kappa_\infty(A)$ and compare the solutions for $\mathbf b = (2, 2.0001)\T$ and $\mathbf b = (2, 2.0002)\T$.
::: solution
$\det A = 0.0001$ and $A^{-1} = 10^4\begin{pmatrix}1.0001 & -1\\ -1 & 1\end{pmatrix}$. The largest row sums are $\norm A_\infty = 2.0001$ and $\norm{A^{-1}}_\infty = 20\,001$, so $\kappa_\infty(A) = 2.0001\times20\,001 \approx 40\,004$.

For $\mathbf b = (2, 2.0001)\T$ the solution is $\mathbf x = (1, 1)\T$; for $\mathbf b = (2, 2.0002)\T$ it is $(0, 2)\T$. A relative change of $5\times10^{-5}$ in $\mathbf b$ changed the solution by $100\%$, an amplification of $2\times10^4$, within the bound $4\times10^4$. Geometrically, the two equations describe almost parallel lines, and a tiny shift of one line moves their intersection a long way.
:::
:::

::: widget transform2d
matrix: 1, 1; 1, 1.05
editable: true
eigen: false
caption: The nearly singular matrix $\begin{pmatrix}1 & 1\\ 1 & 1.05\end{pmatrix}$ squashes the unit square into a thin parallelogram (area $= \det A = 0.05$): it stretches one direction by about $2$ and shrinks another by a factor of about $40$, so $\kappa_2 \approx 80$. Solving $A\mathbf x = \mathbf b$ means undoing this, which stretches small errors in the squashed direction enormously. Edit the entries to make the columns more or less parallel and watch the area.
:::

::: example The Hilbert matrix {#ex-hilbert}
The **Hilbert matrix** $H_n$ has entries $h_{ij} = \frac{1}{i + j - 1}$. Solve $H_n\mathbf x = H_n\mathbf 1$ (exact solution $\mathbf 1 = (1, \dots, 1)\T$) in double precision for several $n$.
::: solution
Using `numpy.linalg.solve` (LU with partial pivoting):

| $n$ | $4$ | $6$ | $8$ | $10$ | $12$ | $14$ |
|---|---|---|---|---|---|---|
| $\kappa_2(H_n)$ | $1.6\times10^4$ | $1.5\times10^7$ | $1.5\times10^{10}$ | $1.6\times10^{13}$ | $1.7\times10^{16}$ | $6\times10^{17}$ |
| relative error $\norm{\hat{\mathbf x} - \mathbf 1}_\infty$ | $6.6\times10^{-14}$ | $2.4\times10^{-10}$ | $1.2\times10^{-7}$ | $1.7\times10^{-4}$ | $0.70$ | $8.9$ |
| relative residual | $0$ | $1.8\times10^{-16}$ | $8.2\times10^{-17}$ | $1.5\times10^{-16}$ | $1.4\times10^{-16}$ | $1.4\times10^{-16}$ |

The errors track $\kappa_2(H_n)\,u$ remarkably well, and for $n \ge 12$ no digit is correct. Yet the residual $\norm{\mathbf b - H_n\hat{\mathbf x}}/\norm{\mathbf b}$ is always at rounding level: the algorithm is backward stable and has done its job perfectly. The problem itself is hopeless in double precision.
:::
:::

::: warning A small residual does not mean a small error
The residual $\mathbf r = \mathbf b - A\hat{\mathbf x}$ is computable; the error $\mathbf x - \hat{\mathbf x}$ is not. Since $\mathbf x - \hat{\mathbf x} = A^{-1}\mathbf r$, part 1 of [[#thm-perturbation]] gives $\frac{\norm{\mathbf x - \hat{\mathbf x}}}{\norm{\mathbf x}} \le \kappa(A)\frac{\norm{\mathbf r}}{\norm{\mathbf b}}$, and the Hilbert example shows that the factor $\kappa(A)$ is real. Always estimate the condition number (LAPACK and `numpy.linalg.cond` do this) before trusting a solution with a small residual. Similarly, a small determinant does not mean ill-conditioning: $10^{-1}I_{100}$ has determinant $10^{-100}$ and condition number $1$.
:::

## The Cholesky factorisation

Many matrices in applications are **symmetric positive definite** (SPD): $A = A\T$ and $\mathbf x\T A\mathbf x > 0$ for all $\mathbf x \ne \mathbf 0$. Covariance matrices, the normal equations $A\T A$ of least squares, stiffness matrices in structural mechanics and discretised diffusion operators are all SPD. For them a symmetric version of LU exists, needs no pivoting and costs half as much.

::: theorem Cholesky factorisation {#thm-cholesky}
A real symmetric matrix $A$ is positive definite if and only if it can be written as $A = LL\T$ with $L$ lower triangular with positive diagonal entries. This factorisation is unique.
:::

::: proof
If $A = LL\T$ with $L$ invertible, then $\mathbf x\T A\mathbf x = \norm{L\T\mathbf x}_2^2 > 0$ for $\mathbf x \ne \mathbf 0$, so $A$ is SPD.

Conversely, let $A$ be SPD; we use induction on $n$. For $n = 1$, $A = (a_{11})$ with $a_{11} > 0$ and $L = (\sqrt{a_{11}})$. For $n > 1$ write

$$
A = \begin{pmatrix}a_{11} & \mathbf w\T\\ \mathbf w & B\end{pmatrix}, \qquad a_{11} = \mathbf e_1\T A\mathbf e_1 > 0 .
$$

Put $\alpha = \sqrt{a_{11}}$ and $S = B - \frac{1}{a_{11}}\mathbf w\mathbf w\T$. A direct multiplication shows

$$
A = \begin{pmatrix}\alpha & \mathbf 0\T\\ \mathbf w/\alpha & I\end{pmatrix}\begin{pmatrix}1 & \mathbf 0\T\\ \mathbf 0 & S\end{pmatrix}\begin{pmatrix}\alpha & \mathbf w\T/\alpha\\ \mathbf 0 & I\end{pmatrix}.
$$

$S$ is symmetric, and it is positive definite: for $\mathbf y \ne \mathbf 0$, take $\mathbf x = \left(-\frac{\mathbf w\T\mathbf y}{a_{11}}, \mathbf y\right)$; then a short computation gives $\mathbf x\T A\mathbf x = \mathbf y\T S\mathbf y$, which is positive. By induction $S = L_1L_1\T$ with $L_1$ lower triangular with positive diagonal, and then $L = \begin{pmatrix}\alpha & \mathbf 0\T\\ \mathbf w/\alpha & L_1\end{pmatrix}$ satisfies $A = LL\T$.

Uniqueness: if $L_1L_1\T = L_2L_2\T$, then $L_2^{-1}L_1 = L_2\T L_1^{-\mathsf T}$ is both lower and upper triangular, hence diagonal, say $D$, with $D = D^{-\mathsf T} = D^{-1}$; so $D^2 = I$, and positive diagonals force $D = I$.
:::

Equating entries of $A = LL\T$ column by column gives the algorithm: for $j = 1, \dots, n$,

$$
\ell_{jj} = \sqrt{a_{jj} - \sum_{k<j}\ell_{jk}^2}, \qquad \ell_{ij} = \frac{1}{\ell_{jj}}\left(a_{ij} - \sum_{k<j}\ell_{ik}\ell_{jk}\right) \quad (i > j).
$$

It costs $\frac13n^3 + O(n^2)$ flops, half of LU, because symmetry halves the work; it needs no pivoting, because $\sum_k\ell_{ik}^2 = a_{ii}$ bounds every entry of $L$ by $\sqrt{\max a_{ii}}$, so no growth can occur; and it is backward stable. If a square root of a non-positive number is encountered, the matrix was not positive definite — in practice this is the cheapest test of positive definiteness.

::: example A Cholesky factorisation {#ex-cholesky}
Find the Cholesky factor of $A = \begin{pmatrix}4 & 2 & -2\\ 2 & 10 & 2\\ -2 & 2 & 6\end{pmatrix}$.
::: solution
Column 1: $\ell_{11} = \sqrt4 = 2$, $\ell_{21} = \frac22 = 1$, $\ell_{31} = \frac{-2}{2} = -1$. Column 2: $\ell_{22} = \sqrt{10 - 1^2} = 3$, $\ell_{32} = \frac{2 - (-1)(1)}{3} = 1$. Column 3: $\ell_{33} = \sqrt{6 - (-1)^2 - 1^2} = 2$. So

$$
L = \begin{pmatrix}2 & 0 & 0\\ 1 & 3 & 0\\ -1 & 1 & 2\end{pmatrix},
$$

and multiplying out confirms $LL\T = A$. All square roots were of positive numbers, which proves that $A$ is positive definite.
:::
:::

::: quiz
Which statement about solving $A\mathbf x = \mathbf b$ with $\kappa(A) = 10^{12}$ in double precision is correct?
- [ ] Gaussian elimination with partial pivoting will typically give about $16$ correct digits.
- [x] One should expect only about $4$ correct digits, even though the residual will be tiny.
- [ ] The computed solution will have a large residual.
- [ ] Using Cholesky instead of LU would fix the problem.
::: solution
The rule of thumb gives relative error about $\kappa u \approx 10^{12}\times10^{-16} = 10^{-4}$: about four correct digits. The algorithm is backward stable, so the residual is at rounding level, as in the Hilbert example. No factorisation can overcome the conditioning of the problem (and Cholesky only applies to SPD matrices anyway).
:::
:::

::: application Simulating correlated random variables
To simulate a random vector with mean $\mathbf 0$ and covariance matrix $\Sigma$ (symmetric positive definite), compute the Cholesky factor $\Sigma = LL\T$ once, generate a vector $\mathbf z$ of independent standard normal variables, and set $\mathbf x = L\mathbf z$. Then $\Cov(\mathbf x) = L\,\Cov(\mathbf z)\,L\T = LL\T = \Sigma$. This is how correlated asset prices are simulated in finance and how Gaussian processes are sampled in statistics ([[probability/joint-distributions]]).
:::

::: history
Elimination appears in the Chinese classic *The Nine Chapters on the Mathematical Art* (compiled around the first centuries BC and AD), whose eighth chapter solves systems of several linear equations by operations on columns of counting rods. Carl Friedrich Gauss used elimination systematically in his least-squares computations of planetary orbits (1809–1810). André-Louis Cholesky, a French military geodesist, devised his factorisation around 1910; it was published after his death in the First World War by Commandant Benoît in 1924. With the arrival of computers, John von Neumann and Herman Goldstine (1947) and Alan Turing (1948) analysed rounding errors in elimination; Turing introduced both the LU formulation and the term "condition number". James Wilkinson's backward error analysis (1961) explained why elimination with partial pivoting works so well, and the LAPACK library (1992) made stable implementations universally available.
:::

## Where this leads

For large sparse systems, factorisations fill in zeros and become too expensive; the iterative methods of [[numerical-analysis/iterative-methods]] then take over. The QR factorisation, built from orthogonal transformations, is the stable tool for least-squares problems ([[linear-algebra/least-squares]]) and the basis of the QR algorithm for eigenvalues. The condition number $\kappa_2(A) = \sigma_{\max}/\sigma_{\min}$ is explained by the singular value decomposition ([[linear-algebra/svd]]). Implicit methods for stiff differential equations solve a linear system at every step, usually by LU factorisation of a Jacobian ([[numerical-analysis/numerical-odes]]).

::: summary
- Gaussian elimination is the factorisation $A = LU$, with the multipliers stored in the unit lower triangular $L$; then $A\mathbf x = \mathbf b$ is solved by forward and back substitution.
- The factorisation costs $\frac23n^3$ flops, each solve $2n^2$; never form $A^{-1}$. Banded and tridiagonal systems cost $O(n)$.
- Small pivots destroy accuracy; partial pivoting ($PA = LU$, $\abs{\ell_{ij}} \le 1$) makes elimination backward stable in practice (growth factor permitting).
- The condition number $\kappa(A) = \norm A\norm{A^{-1}}$ bounds the amplification of relative errors in $\mathbf b$ and $A$; expect relative errors of order $\kappa(A)u$.
- A small residual guarantees a small error only when $\kappa(A)$ is moderate; the Hilbert matrix is the classic counterexample.
- Symmetric positive definite matrices have a unique Cholesky factorisation $A = LL\T$, computed stably without pivoting in $\frac13n^3$ flops.
:::

## Exercises

::: exercise A 2×2 factorisation {level=1 check="1"}
Find the LU factorisation (without pivoting) of $\begin{pmatrix}2 & 3\\ 4 & 7\end{pmatrix}$. What is $u_{22}$?
::: solution
The multiplier is $\ell_{21} = 2$, and $u_{22} = 7 - 2\cdot3 = 1$. So $L = \begin{pmatrix}1 & 0\\ 2 & 1\end{pmatrix}$ and $U = \begin{pmatrix}2 & 3\\ 0 & 1\end{pmatrix}$.
:::
:::

::: exercise An infinity norm {level=1 check="7"}
Compute $\norm A_\infty$ and $\norm A_1$ for $A = \begin{pmatrix}1 & -2\\ 3 & 4\end{pmatrix}$.
::: solution
Row sums of absolute values: $1 + 2 = 3$ and $3 + 4 = 7$, so $\norm A_\infty = 7$. Column sums: $1 + 3 = 4$ and $2 + 4 = 6$, so $\norm A_1 = 6$.
:::
:::

::: exercise Scaling up {level=1 check="8"}
Factorising a dense $1000\times1000$ matrix takes $0.05$ seconds on some computer. By roughly what factor does the time grow for a $2000\times2000$ matrix?
::: solution
The cost is $\frac23n^3$ flops, so doubling $n$ multiplies it by $2^3 = 8$ (about $0.4$ seconds), assuming the computer runs at the same speed for both sizes.
:::
:::

::: exercise Pivoting by hand {level=2 check="2/3"}
Compute the factorisation $PA = LU$ with partial pivoting of $A = \begin{pmatrix}1 & 2\\ 3 & 4\end{pmatrix}$. What is $u_{22}$?
::: solution
The largest entry of the first column is $3$, so swap the rows: $PA = \begin{pmatrix}3 & 4\\ 1 & 2\end{pmatrix}$. Then $\ell_{21} = \frac13$ and $u_{22} = 2 - \frac13\cdot4 = \frac23$. So $L = \begin{pmatrix}1 & 0\\ \frac13 & 1\end{pmatrix}$, $U = \begin{pmatrix}3 & 4\\ 0 & \frac23\end{pmatrix}$, $P = \begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$.
:::
:::

::: exercise A condition number {level=2 check="2.0001*20001"}
Compute $\kappa_\infty(A)$ exactly for $A = \begin{pmatrix}1 & 1\\ 1 & 1.0001\end{pmatrix}$.
::: solution
As in [[#ex-nearly-singular]], $\norm A_\infty = 2.0001$ and $\norm{A^{-1}}_\infty = \frac{2.0001}{0.0001} = 20\,001$, so $\kappa_\infty(A) = 2.0001\times20\,001 = 40\,004.0001$.
:::
:::

::: exercise A 2×2 Cholesky factor {level=2 check="2"}
Find the Cholesky factor of $\begin{pmatrix}4 & 2\\ 2 & 5\end{pmatrix}$. What is $\ell_{22}$?
::: solution
$\ell_{11} = 2$, $\ell_{21} = \frac22 = 1$, $\ell_{22} = \sqrt{5 - 1} = 2$. So $L = \begin{pmatrix}2 & 0\\ 1 & 2\end{pmatrix}$, and $LL\T = \begin{pmatrix}4 & 2\\ 2 & 5\end{pmatrix}$.
:::
:::

::: exercise Uniqueness of LU {level=2 #exr-lu-unique}
Show that if $A$ is invertible and $A = L_1U_1 = L_2U_2$ with $L_1, L_2$ unit lower triangular and $U_1, U_2$ upper triangular, then $L_1 = L_2$ and $U_1 = U_2$.
::: solution
All four factors are invertible ($\det L_i = 1$ and $\det U_i \ne 0$ since $\det A \ne 0$). From $L_1U_1 = L_2U_2$ we get $L_2^{-1}L_1 = U_2U_1^{-1}$. The left side is unit lower triangular (inverses and products of unit lower triangular matrices are unit lower triangular), and the right side is upper triangular. A matrix that is both is the identity: it is diagonal with unit diagonal. So $L_1 = L_2$, and then $U_1 = L_1^{-1}A = U_2$.
:::
:::

::: exercise The infinity norm is the maximum row sum {level=3 #exr-inf-norm}
Prove that the matrix norm induced by $\norm\cdot_\infty$ is $\norm A_\infty = \max_i\sum_j\abs{a_{ij}}$.
::: solution
Let $R = \max_i\sum_j\abs{a_{ij}}$. For any $\mathbf x$, $\abs{(A\mathbf x)_i} = \abs{\sum_ja_{ij}x_j} \le \sum_j\abs{a_{ij}}\norm{\mathbf x}_\infty \le R\norm{\mathbf x}_\infty$, so $\norm A_\infty \le R$. For the reverse inequality, choose a row $k$ attaining the maximum and let $x_j = \sgn(a_{kj})$ (with $x_j = 1$ if $a_{kj} = 0$). Then $\norm{\mathbf x}_\infty = 1$ (assuming $A \ne 0$) and $(A\mathbf x)_k = \sum_j\abs{a_{kj}} = R$, so $\norm{A\mathbf x}_\infty \ge R$. Hence $\norm A_\infty = R$.
:::
:::

::: exercise Pivots of a positive definite matrix {level=3}
Let $A$ be symmetric positive definite. Show that Gaussian elimination without pivoting never meets a zero pivot, that all pivots are positive, and that $A = LDL\T$ with $D$ the diagonal matrix of pivots and $L$ unit lower triangular. How is this related to the Cholesky factor?
::: hint
The leading principal submatrices $A_k$ of an SPD matrix are SPD.
:::
::: solution
For $\mathbf y \in \R^k$, $\mathbf y \ne \mathbf 0$, extend by zeros to $\mathbf x \in \R^n$; then $\mathbf y\T A_k\mathbf y = \mathbf x\T A\mathbf x > 0$, so each $A_k$ is SPD and in particular $\det A_k > 0$ (its eigenvalues are positive). Since $\det A_k = u_{11}\cdots u_{kk}$ (see the discussion after [[#ex-lu]]), induction shows $u_{kk} = \det A_k/\det A_{k-1} > 0$: no zero pivots, all positive. So $A = LU$, and writing $U = D\tilde U$ with $D = \diag(u_{11}, \dots, u_{nn})$ and $\tilde U$ unit upper triangular, $A = LD\tilde U$. Transposing, $A = A\T = \tilde U\T DL\T$, and by uniqueness of the LU factorisation ($\tilde U\T$ is unit lower triangular and $DL\T$ upper triangular) $L = \tilde U\T$. Hence $A = LDL\T$, and the Cholesky factor is $LD^{1/2}$, whose diagonal entries are $\sqrt{u_{kk}}$.
:::
:::

::: exercise Error bound from the residual {level=3}
A computed solution $\hat{\mathbf x}$ of $A\mathbf x = \mathbf b$ has residual $\mathbf r = \mathbf b - A\hat{\mathbf x}$. Prove that $\dfrac{1}{\kappa(A)}\dfrac{\norm{\mathbf r}}{\norm{\mathbf b}} \le \dfrac{\norm{\mathbf x - \hat{\mathbf x}}}{\norm{\mathbf x}} \le \kappa(A)\dfrac{\norm{\mathbf r}}{\norm{\mathbf b}}$, and explain what the two inequalities say in practice.
::: solution
We have $\mathbf e = \mathbf x - \hat{\mathbf x} = A^{-1}\mathbf r$. Upper bound: $\norm{\mathbf e} \le \norm{A^{-1}}\norm{\mathbf r}$ and $\norm{\mathbf b} \le \norm A\norm{\mathbf x}$; multiply. Lower bound: $\norm{\mathbf r} = \norm{A\mathbf e} \le \norm A\norm{\mathbf e}$ and $\norm{\mathbf x} = \norm{A^{-1}\mathbf b} \le \norm{A^{-1}}\norm{\mathbf b}$, so $\frac{\norm{\mathbf r}}{\norm{\mathbf b}} \le \norm A\norm{A^{-1}}\frac{\norm{\mathbf e}}{\norm{\mathbf x}}$. In practice: for a well-conditioned matrix ($\kappa \approx 1$), the relative residual is a reliable estimate of the relative error; for an ill-conditioned one, the true error can be anywhere in a range of width $\kappa^2$ around the residual, and a small residual proves little.
:::
:::
