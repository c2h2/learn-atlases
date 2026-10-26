Discretisation turns a differential equation into a set of algebraic equations, one per cell: $a_P\phi_P = \sum a_{nb}\phi_{nb} + S_u$ ([[computational-fluid-dynamics/finite-volume-diffusion]]). A modest industrial mesh has ten million cells; with several variables per cell, a steady calculation means solving systems with tens of millions of unknowns, not once but hundreds of times as the nonlinear outer iterations proceed, and an unsteady calculation repeats that at every time step. In a typical incompressible CFD run most of the computing time is spent in one place: the linear solver for the pressure equation. Choosing and monitoring that solver is therefore not a detail.

This lesson studies the systems CFD produces and the methods used to solve them: direct elimination (in its cheap tridiagonal form, the Thomas algorithm), the classical iterative methods (Jacobi, Gauss–Seidel, successive over-relaxation), the reason those methods slow down on fine grids, and the two ideas that cure it — **multigrid** and **Krylov** methods such as conjugate gradients. It ends with how to tell when an iteration has converged, which is not as obvious as it sounds. Background linear algebra is in Maths Atlas ([direct methods](/learn/maths/lesson.php?c=numerical-analysis&l=direct-methods) and [iterative methods](/learn/maths/lesson.php?c=numerical-analysis&l=iterative-methods)).

## The structure of CFD matrices

Collect the discrete equations as $\mathbf{A}\boldsymbol{\phi} = \mathbf{b}$, with row $P$ holding $a_P$ on the diagonal and $-a_{nb}$ in the columns of the neighbours. Three properties of this matrix matter.

- **Sparsity.** Each row has only as many nonzeros as the cell has neighbours plus one: $3$ in 1D, $5$ in 2D, $7$ in 3D on a structured grid; typically $5$–$15$ on an unstructured mesh. A matrix with $N = 10^7$ rows has about $10^8$ nonzeros instead of $10^{14}$ entries. Only the nonzeros are stored.
- **Diagonal dominance.** Patankar's rules (positive coefficients, $a_P = \sum a_{nb} - S_P$ with $S_P \le 0$) give $\lvert a_P\rvert \ge \sum\lvert a_{nb}\rvert$ in every row, with strict inequality in rows touching a Dirichlet boundary or with a negative-slope source.
- **Symmetry.** Pure diffusion with the two-point flux gives a symmetric matrix ($a_E$ of cell $P$ equals $a_W$ of cell $E$, both being the same face conductance); it is then also positive definite. Convection makes the matrix non-symmetric ([[computational-fluid-dynamics/convection-diffusion]]); the pressure equation of incompressible flow is symmetric ([[computational-fluid-dynamics/pressure-velocity]]).

::: definition Residual, error and convergence rate {#def-residual}
For an approximation $\boldsymbol{\phi}^{(k)}$ to the solution $\boldsymbol{\phi}$ of $\mathbf{A}\boldsymbol{\phi} = \mathbf{b}$:
- the **error** is $\mathbf{e}^{(k)} = \boldsymbol{\phi} - \boldsymbol{\phi}^{(k)}$ (unknown in practice);
- the **residual** is $\mathbf{r}^{(k)} = \mathbf{b} - \mathbf{A}\boldsymbol{\phi}^{(k)}$ (computable), and $\mathbf{A}\mathbf{e}^{(k)} = \mathbf{r}^{(k)}$;
- an iteration has **asymptotic convergence factor** $\rho$ if the error eventually shrinks by a factor of about $\rho$ per iteration; reducing it by a factor $\epsilon$ then takes about $\ln\epsilon/\ln\rho$ iterations.
:::

## Direct solution: elimination and the Thomas algorithm

Gaussian elimination solves any nonsingular system in a finite number of operations — about $\tfrac23N^3$ for a dense matrix, which for $N = 10^4$ is already $7\times10^{11}$ and for $N = 10^7$ is unthinkable. For a **banded** matrix of half-bandwidth $b$ (no nonzeros further than $b$ from the diagonal) elimination creates no entries outside the band, and the cost falls to about $2Nb^2$. A 2D structured grid of $n \times n$ cells numbered row by row has $b = n$ and costs $O(n^4) = O(N^2)$; in 3D the band fills in badly. Modern sparse direct solvers (with reordering to limit fill-in) are excellent for 2D problems and moderate 3D ones, and are used inside coupled solvers and on coarse multigrid levels, but for the large 3D systems of CFD iterative methods win.

The exception, and a workhorse, is the 1D case. A **tridiagonal** system has $b = 1$, and elimination costs $O(N)$.

::: algorithm The Thomas algorithm (TDMA) {#alg-tdma}
For $N$ equations $a_i\phi_i = b_i\phi_{i+1} + c_i\phi_{i-1} + d_i$, $i = 1, \dots, N$, with $c_1 = 0$ and $b_N = 0$:
1. **Forward sweep.** Set $P_1 = b_1/a_1$, $Q_1 = d_1/a_1$, and for $i = 2, \dots, N$:
$$
P_i = \frac{b_i}{a_i - c_iP_{i-1}},\qquad Q_i = \frac{d_i + c_iQ_{i-1}}{a_i - c_iP_{i-1}} .
$$
2. **Back substitution.** Set $\phi_N = Q_N$ and for $i = N-1, \dots, 1$: $\phi_i = P_i\phi_{i+1} + Q_i$.

Cost: about $8N$ operations and $2N$ stored numbers. The recursion is stable (no growth of rounding errors) when $\lvert a_i\rvert \ge \lvert b_i\rvert + \lvert c_i\rvert$ with strict inequality in at least one row — exactly what Patankar's rules guarantee.
:::

The forward sweep expresses each unknown in terms of the next one, $\phi_i = P_i\phi_{i+1} + Q_i$: substitute $\phi_{i-1} = P_{i-1}\phi_i + Q_{i-1}$ into equation $i$ and solve for $\phi_i$ to obtain the formulas above.

::: example The Thomas algorithm on the conducting rod {#ex-tdma}
Solve the five equations of [[computational-fluid-dynamics/finite-volume-diffusion#ex-rod]] — $a_P = (300, 200, 200, 200, 300)$, all neighbour coefficients $100$, $S_u = (20\,000, 0, 0, 0, 100\,000)$ — by the Thomas algorithm.
::: solution
In the notation of the algorithm, $a_i = a_P$, $b_i = a_E$, $c_i = a_W$, $d_i = S_u$.

| $i$ | $a_i - c_iP_{i-1}$ | $P_i$ | $Q_i$ |
|---|---|---|---|
| 1 | $300$ | $100/300 = 0.3333$ | $20\,000/300 = 66.667$ |
| 2 | $200 - 100(0.3333) = 166.67$ | $0.6000$ | $(0 + 100 \times 66.667)/166.67 = 40.000$ |
| 3 | $200 - 60 = 140$ | $0.7143$ | $4000/140 = 28.571$ |
| 4 | $200 - 71.43 = 128.57$ | $0.7778$ | $2857.1/128.57 = 22.222$ |
| 5 | $300 - 77.78 = 222.22$ | $0$ | $(100\,000 + 2222.2)/222.22 = 460.00$ |

Back substitution: $\phi_5 = 460$, $\phi_4 = 0.7778 \times 460 + 22.222 = 380$, $\phi_3 = 0.7143 \times 380 + 28.571 = 300$, $\phi_2 = 0.6 \times 300 + 40 = 220$, $\phi_1 = 0.3333 \times 220 + 66.667 = 140\,^\circ\mathrm{C}$ — the solution found before. Sanity check: every pivot $a_i - c_iP_{i-1}$ is positive and every $P_i$ lies between $0$ and $1$, the signs of a stable recursion for a diagonally dominant system.
:::
:::

In two and three dimensions the Thomas algorithm is still useful as a building block: **line-by-line TDMA** solves for all the unknowns along one grid line at once, treating the values on neighbouring lines as known, then sweeps line by line across the domain and alternates direction. It transmits boundary information along a whole line in one sweep, which makes it much faster than point-by-point iteration for problems with strong coupling in one direction.

## Classical iterative methods

An iterative method starts from a guess and improves it. All the classical methods come from splitting the matrix, $\mathbf{A} = \mathbf{M} - \mathbf{N}$, with $\mathbf{M}$ easy to invert, and iterating
$$
\mathbf{M}\boldsymbol{\phi}^{(k+1)} = \mathbf{N}\boldsymbol{\phi}^{(k)} + \mathbf{b} .
$$ {#eq-splitting}
Write $\mathbf{A} = \mathbf{D} - \mathbf{L} - \mathbf{U}$ with $\mathbf{D}$ the diagonal and $-\mathbf{L}$, $-\mathbf{U}$ the strictly lower and upper parts.

- **Jacobi**, $\mathbf{M} = \mathbf{D}$: every node is updated from the *old* values of its neighbours, $\phi_P^{(k+1)} = \left(\sum a_{nb}\phi_{nb}^{(k)} + S_u\right)/a_P$.
- **Gauss–Seidel**, $\mathbf{M} = \mathbf{D} - \mathbf{L}$: nodes are updated in order, each using the *newest* available neighbour values. It needs only one copy of the solution vector and usually converges about twice as fast as Jacobi.
- **Successive over-relaxation (SOR)**: compute the Gauss–Seidel value $\tilde\phi_P$ and move past it, $\phi_P^{(k+1)} = \phi_P^{(k)} + \omega(\tilde\phi_P - \phi_P^{(k)})$ with $1 < \omega < 2$.

::: theorem Convergence of stationary iterations {#thm-spectral-radius}
The iteration [[#eq-splitting]] converges for every starting vector and every $\mathbf{b}$ if and only if the spectral radius of the **iteration matrix** $\mathbf{G} = \mathbf{M}^{-1}\mathbf{N}$ satisfies $\rho(\mathbf{G}) < 1$. The error obeys $\mathbf{e}^{(k)} = \mathbf{G}^k\mathbf{e}^{(0)}$, and asymptotically shrinks by the factor $\rho(\mathbf{G})$ per iteration.
:::

::: proof
The exact solution satisfies $\mathbf{M}\boldsymbol{\phi} = \mathbf{N}\boldsymbol{\phi} + \mathbf{b}$. Subtracting [[#eq-splitting]] gives $\mathbf{M}\mathbf{e}^{(k+1)} = \mathbf{N}\mathbf{e}^{(k)}$, so $\mathbf{e}^{(k+1)} = \mathbf{G}\mathbf{e}^{(k)}$ and $\mathbf{e}^{(k)} = \mathbf{G}^k\mathbf{e}^{(0)}$. If $\mathbf{G}$ has a full set of eigenvectors $\mathbf{v}_j$ with eigenvalues $\lambda_j$, expand $\mathbf{e}^{(0)} = \sum c_j\mathbf{v}_j$; then $\mathbf{e}^{(k)} = \sum c_j\lambda_j^k\mathbf{v}_j$, which tends to zero for every choice of the $c_j$ if and only if all $\lvert\lambda_j\rvert < 1$, and the slowest-decaying term shrinks like $\rho^k$. (For a defective $\mathbf{G}$ the Jordan form gives the same conclusion, with polynomial factors $k^m\rho^k$ that do not change the limit.) If some $\lvert\lambda_j\rvert \ge 1$, the starting error $\mathbf{e}^{(0)} = \mathbf{v}_j$ does not decay.
:::

::: proposition Diagonal dominance is sufficient for Jacobi {#prop-dd-jacobi}
If $\mathbf{A}$ is strictly diagonally dominant by rows, $\lvert a_{ii}\rvert > \sum_{j\ne i}\lvert a_{ij}\rvert$ for every $i$, the Jacobi iteration converges.
:::

::: proof
The Jacobi iteration matrix $\mathbf{G}_J = \mathbf{D}^{-1}(\mathbf{L} + \mathbf{U})$ has entries $-a_{ij}/a_{ii}$ off the diagonal and zero on it. Its maximum absolute row sum is $\lVert\mathbf{G}_J\rVert_\infty = \max_i\sum_{j\ne i}\lvert a_{ij}\rvert/\lvert a_{ii}\rvert < 1$. Every eigenvalue satisfies $\lvert\lambda\rvert \le \lVert\mathbf{G}_J\rVert$ for any induced norm (if $\mathbf{G}\mathbf{v} = \lambda\mathbf{v}$, then $\lvert\lambda\rvert\lVert\mathbf{v}\rVert = \lVert\mathbf{G}\mathbf{v}\rVert \le \lVert\mathbf{G}\rVert\lVert\mathbf{v}\rVert$), so $\rho(\mathbf{G}_J) < 1$ and [[#thm-spectral-radius]] applies. With weak dominance (equality in some rows) plus irreducibility and strict inequality in at least one row — the typical CFD case, with Dirichlet boundaries supplying the strict rows — the same conclusion holds by a slightly longer argument.
:::

::: example Jacobi and Gauss–Seidel by hand {#ex-jacobi-gs}
Apply three iterations of Jacobi and of Gauss–Seidel, starting from zero, to the implicit conduction system of [[computational-fluid-dynamics/finite-differences#ex-btcs]],
$$
3T_1 - T_2 = 100,\qquad -T_1 + 3T_2 - T_3 = 100,\qquad -T_2 + 3T_3 = 100,
$$
whose solution is $(57.14, 71.43, 57.14)$. Compare the maximum residuals.
::: solution
Jacobi uses only old values: $T_1 = (100 + T_2)/3$, $T_2 = (100 + T_1 + T_3)/3$, $T_3 = (100 + T_2)/3$.

| iteration | $T_1$ | $T_2$ | $T_3$ | max residual |
|---|---|---|---|---|
| 1 | 33.33 | 33.33 | 33.33 | 66.67 |
| 2 | 44.44 | 55.56 | 44.44 | 22.22 |
| 3 | 51.85 | 62.96 | 51.85 | 14.81 |

Gauss–Seidel uses each new value at once (in the order $T_1, T_2, T_3$):

| iteration | $T_1$ | $T_2$ | $T_3$ | max residual |
|---|---|---|---|---|
| 1 | 33.33 | 44.44 | 48.15 | 48.15 |
| 2 | 48.15 | 65.43 | 55.14 | 20.99 |
| 3 | 55.14 | 70.10 | 56.70 | 4.66 |

The spectral radii are $\rho_J = \sqrt2/3 = 0.471$ and $\rho_{GS} = \rho_J^2 = 0.222$ (for this kind of matrix Gauss–Seidel's rate is the square of Jacobi's): Gauss–Seidel gains as much in one iteration as Jacobi in two. Sanity check: both sequences approach the solution from below without overshoot, as expected for a diagonally dominant M-matrix and a zero start.
:::
:::

::: widget iterative
matrix: 3,-1; -1,3
b: 2,2
method: jacobi
start: 0,0
caption: Jacobi iterates for a two-node conduction system $3x - y = 2$, $-x + 3y = 2$ (solution $x = y = 1$), drawn on the two lines whose intersection is the solution. Each Jacobi step moves both unknowns at once using old values; switch the method to Gauss–Seidel and the path becomes a staircase that reaches the solution in fewer steps. Try SOR with $\omega$ between $1$ and $1.2$: a modest over-relaxation helps here; $\omega$ near $2$ overshoots and oscillates. The convergence is fast because the matrix is strongly diagonally dominant ($3$ against $1$); change the diagonal to $1.1$ and watch it slow to a crawl.
:::

## Why classical iterations stall on fine grids

For the model problem, the 1D Poisson equation with $N$ interior nodes ($-\phi_{i-1} + 2\phi_i - \phi_{i+1} = h^2 f_i$), the eigenvectors of the Jacobi matrix are the sine modes $\sin(j\pi x_i)$, with eigenvalues $\cos\theta_j$, $\theta_j = j\pi/(N+1)$. The spectral radius is
$$
\rho_J = \cos\frac{\pi}{N+1} \approx 1 - \frac{\pi^2}{2(N+1)^2},\qquad \rho_{GS} = \rho_J^2 \approx 1 - \frac{\pi^2}{(N+1)^2} .
$$ {#eq-rho-poisson}
The same values hold for the 2D Poisson equation on an $N \times N$ grid. As the grid is refined, $\rho \to 1$, and the number of iterations to reduce the error by a fixed factor grows like $N^2$ — while the work per iteration grows like the number of unknowns. On a fine grid the classical methods become hopeless.

::: example Iteration counts for a refined grid {#ex-iteration-count}
For the Poisson problem with $N = 99$ interior points per direction, how many iterations do Jacobi, Gauss–Seidel and optimal SOR need to reduce the error by a factor $10^{6}$?
::: solution
$\rho_J = \cos(\pi/100) = 0.999507$, so Jacobi needs $\ln 10^{-6}/\ln 0.999507 = 27\,991$ iterations and Gauss–Seidel, with $\rho_{GS} = 0.999013$, half that: $13\,996$. For SOR, the optimal factor (Young's theory, for this class of matrices) is
$$
\omega_{\text{opt}} = \frac{2}{1 + \sqrt{1 - \rho_J^2}} = \frac{2}{1 + \sin(\pi/100)} = 1.9391,\qquad \rho_{\text{SOR}} = \omega_{\text{opt}} - 1 = 0.9391,
$$
needing $\ln 10^{-6}/\ln 0.9391 = 220$ iterations. Sanity check: SOR's iteration count grows like $N$ rather than $N^2$ — a large gain — but $\omega_{\text{opt}}$ must be known accurately, and in CFD, where the matrix changes from one outer iteration to the next, it rarely is.
:::
:::

The deeper reason for the slowness is visible in the eigenvalues. The error component with wavenumber $\theta_j$ is multiplied by $\cos\theta_j$ per Jacobi iteration. For the *smooth* modes ($\theta$ near $0$) this is close to $1$: these modes are almost untouched. For the oscillatory modes ($\theta$ near $\pi$), $\cos\theta \approx -1$, also poorly damped — but that is easily fixed by under-relaxation. **Weighted Jacobi**, $\boldsymbol{\phi}^{(k+1)} = \boldsymbol{\phi}^{(k)} + \omega\mathbf{D}^{-1}\mathbf{r}^{(k)}$, has amplification factor
$$
G(\theta) = 1 - \omega + \omega\cos\theta = 1 - 2\omega\sin^2(\theta/2),
$$ {#eq-weighted-jacobi}
and with $\omega = \tfrac23$ every mode with $\pi/2 \le \theta \le \pi$ is reduced by a factor of at least $3$ per iteration. Classical iterations are excellent **smoothers**: they kill the rough part of the error in a few sweeps. What they cannot do is remove the smooth part, because a local update cannot move information across a large domain quickly — in one Jacobi sweep information moves only one cell.

::: widget plot
f: 1 - 2*w*sin(x/2)^2; abs(1 - 2*w*sin(x/2)^2)
x: 0, pi
y: -1, 1
sliders: w=0.667:0.1:1:0.01
labels: G(\theta)\ \text{weighted Jacobi}; |G(\theta)|
vlines: 1.5708
hlines: 0.3333; -0.3333
caption: Amplification factor of weighted Jacobi for the Poisson equation against the error wavenumber $\theta = k\Delta x$, with the weight $\omega$ on the slider. Left of the dashed line are the smooth modes (wavelength longer than four cells); right are the rough ones. At $\omega = 2/3$ every rough mode is damped by at least a factor of three per sweep — the smoothing property — while the smooth modes near $\theta = 0$ have $|G|$ close to $1$ whatever $\omega$ is. At $\omega = 1$ (plain Jacobi) the roughest mode, $\theta = \pi$, is not damped at all.
:::

## Multigrid

The multigrid idea turns that weakness into a strategy. A mode that is smooth on a fine grid looks rough on a coarser grid, where it can be smoothed efficiently — and the coarse grid has far fewer unknowns. So: smooth on the fine grid, transfer the remaining (smooth) error problem to a coarse grid, solve it there, and bring the correction back.

::: algorithm Two-grid correction scheme {#alg-multigrid}
To solve $\mathbf{A}_h\boldsymbol{\phi}_h = \mathbf{b}_h$ on a fine grid $h$ with a coarse grid $2h$:
1. **Pre-smooth:** apply $\nu_1$ (typically $1$–$3$) sweeps of a smoother (weighted Jacobi, Gauss–Seidel, ILU) to $\boldsymbol{\phi}_h$.
2. **Residual:** $\mathbf{r}_h = \mathbf{b}_h - \mathbf{A}_h\boldsymbol{\phi}_h$; the error satisfies $\mathbf{A}_h\mathbf{e}_h = \mathbf{r}_h$ and is now smooth.
3. **Restrict:** $\mathbf{r}_{2h} = \mathbf{R}\,\mathbf{r}_h$ (for example, sum or average the residuals of the fine cells making up each coarse cell).
4. **Coarse solve:** solve $\mathbf{A}_{2h}\mathbf{e}_{2h} = \mathbf{r}_{2h}$, where $\mathbf{A}_{2h}$ is the same equation discretised on the coarse grid (geometric multigrid) or formed algebraically as $\mathbf{R}\mathbf{A}_h\mathbf{P}$ (algebraic multigrid).
5. **Prolong and correct:** $\boldsymbol{\phi}_h \leftarrow \boldsymbol{\phi}_h + \mathbf{P}\,\mathbf{e}_{2h}$ (interpolation from coarse to fine).
6. **Post-smooth:** $\nu_2$ further sweeps to remove the roughness introduced by interpolation.

Applying the scheme recursively to the coarse solve, down to a grid small enough to solve directly, gives the **V-cycle**.
:::

Because each grid level has a fixed fraction of the unknowns of the one above ($\tfrac18$ in 3D), the total work of a V-cycle is a bounded multiple of one fine-grid sweep, and for elliptic problems a V-cycle reduces the error by a factor (often around $0.1$) that does *not* depend on the grid size. The cost of solving to a fixed accuracy is therefore $O(N)$ — the best possible, since merely writing down the answer costs $O(N)$. Practically every pressure-based CFD code uses **algebraic multigrid** (AMG) for its pressure equation, because AMG builds the coarse levels from the matrix itself and so works on unstructured meshes without a hierarchy of geometric grids.

## Krylov methods and preconditioning

The other modern family builds the approximation from the **Krylov subspace** $\operatorname{span}\{\mathbf{r}^{(0)}, \mathbf{A}\mathbf{r}^{(0)}, \mathbf{A}^2\mathbf{r}^{(0)}, \dots\}$, choosing the best combination at each step rather than applying a fixed update.

::: algorithm Conjugate gradients {#alg-cg}
For symmetric positive definite $\mathbf{A}$, from $\boldsymbol{\phi}^{(0)}$ set $\mathbf{r}^{(0)} = \mathbf{b} - \mathbf{A}\boldsymbol{\phi}^{(0)}$, $\mathbf{p}^{(0)} = \mathbf{r}^{(0)}$, and for $k = 0, 1, \dots$:
$$
\alpha_k = \frac{\mathbf{r}^{(k)\mathsf{T}}\mathbf{r}^{(k)}}{\mathbf{p}^{(k)\mathsf{T}}\mathbf{A}\mathbf{p}^{(k)}},\quad
\boldsymbol{\phi}^{(k+1)} = \boldsymbol{\phi}^{(k)} + \alpha_k\mathbf{p}^{(k)},\quad
\mathbf{r}^{(k+1)} = \mathbf{r}^{(k)} - \alpha_k\mathbf{A}\mathbf{p}^{(k)},
$$
$$
\beta_k = \frac{\mathbf{r}^{(k+1)\mathsf{T}}\mathbf{r}^{(k+1)}}{\mathbf{r}^{(k)\mathsf{T}}\mathbf{r}^{(k)}},\quad
\mathbf{p}^{(k+1)} = \mathbf{r}^{(k+1)} + \beta_k\mathbf{p}^{(k)} .
$$
Stop when $\lVert\mathbf{r}^{(k+1)}\rVert$ is small enough. Each iteration costs one matrix–vector product and a few vector operations.
:::

Conjugate gradients minimises the energy norm of the error over the Krylov subspace, so in exact arithmetic it terminates in at most $N$ steps; more usefully, its error after $k$ steps is bounded by
$$
\lVert\mathbf{e}^{(k)}\rVert_{\mathbf{A}} \le 2\left(\frac{\sqrt\kappa - 1}{\sqrt\kappa + 1}\right)^k\lVert\mathbf{e}^{(0)}\rVert_{\mathbf{A}},
$$ {#eq-cg-bound}
where $\kappa = \lambda_{\max}/\lambda_{\min}$ is the condition number. For Poisson problems $\kappa \sim N^2$ (per direction), so the iteration count grows like $N$, as for optimal SOR, but without any parameter to tune. **Preconditioning** — solving $\mathbf{M}^{-1}\mathbf{A}\boldsymbol{\phi} = \mathbf{M}^{-1}\mathbf{b}$ with an $\mathbf{M}$ that approximates $\mathbf{A}$ and is cheap to invert, such as an incomplete Cholesky or incomplete LU factorisation (ILU), or one multigrid V-cycle — reduces the effective condition number and the iteration count dramatically. For the non-symmetric matrices of convection–diffusion, the analogues are **BiCGSTAB** and **GMRES**, again with ILU or multigrid preconditioning.

::: example How many conjugate-gradient iterations? {#ex-cg}
For the 1D Poisson matrix with $N = 99$ (eigenvalues $4\sin^2\!\big(j\pi/(2(N+1))\big)$), estimate $\kappa$ and the number of CG iterations that the bound [[#eq-cg-bound]] requires for a reduction of $10^{6}$.
::: solution
$\lambda_{\min} = 4\sin^2(\pi/200) = 9.87\times10^{-4}$, $\lambda_{\max} = 4\sin^2(99\pi/200) = 3.999$, so $\kappa = 4052$ and $\sqrt\kappa = 63.66$. The factor is $(63.66 - 1)/(63.66 + 1) = 0.9691$, and $2(0.9691)^k \le 10^{-6}$ needs $k \ge \ln(5\times10^{-7})/\ln 0.9691 = 462$. But CG terminates in at most $N = 99$ steps in exact arithmetic, and in practice reaches $10^{-6}$ in fewer still: the bound is pessimistic. Sanity check: $\kappa \approx 4(N+1)^2/\pi^2 = 4053$, matching the exact value, and the bound's iteration count is about twice that of optimal SOR — the same $O(N)$ scaling, without needing $\omega$.
:::
:::

## Monitoring convergence

A CFD solver iterates at two levels: an **inner** iteration of the linear solver on each linearised system, and an **outer** iteration that updates coefficients (nonlinear convection, turbulence properties, the pressure–velocity coupling of [[computational-fluid-dynamics/pressure-velocity]]). The inner solver need not be converged tightly — typically a residual reduction of $0.1$ to $0.01$ per outer iteration suffices — because the coefficients will change anyway. The outer iteration must be converged properly before any result is used.

Codes report **scaled residuals**, for example $R_\phi = \sum_P\lvert a_P\phi_P - \sum a_{nb}\phi_{nb} - S_u\rvert / \sum_P\lvert a_P\phi_P\rvert$, or residuals normalised by their value after the first few iterations. A fall of four or five orders of magnitude is often quoted as "converged". This is a convention, not a guarantee: the residual is not the error, $\mathbf{e} = \mathbf{A}^{-1}\mathbf{r}$, and $\lVert\mathbf{e}\rVert$ can be large when $\mathbf{A}$ is ill-conditioned, even though $\lVert\mathbf{r}\rVert$ is small.

::: proposition Error estimate from the convergence rate {#prop-error-estimate}
For a linear stationary iteration converging with factor $\rho < 1$ per iteration, the remaining error is approximately
$$
\lVert\mathbf{e}^{(k)}\rVert \approx \frac{\rho}{1 - \rho}\,\lVert\boldsymbol{\phi}^{(k)} - \boldsymbol{\phi}^{(k-1)}\rVert .
$$ {#eq-error-estimate}
:::

::: proof
In the asymptotic regime the error is dominated by the slowest mode, $\mathbf{e}^{(k)} \approx \rho\,\mathbf{e}^{(k-1)}$. The change between iterations is $\boldsymbol{\phi}^{(k)} - \boldsymbol{\phi}^{(k-1)} = \mathbf{e}^{(k-1)} - \mathbf{e}^{(k)} \approx (1/\rho - 1)\mathbf{e}^{(k)}$. Solving for $\mathbf{e}^{(k)}$ gives [[#eq-error-estimate]]. The rate $\rho$ itself can be estimated from the ratio of successive changes, $\lVert\Delta^{(k)}\rVert/\lVert\Delta^{(k-1)}\rVert$.
:::

::: example A misleadingly small change {#ex-small-change}
A monitored temperature changes by $2.0\times10^{-5}\ \mathrm{K}$ per iteration, and the ratio of successive changes is $0.995$. Estimate how far the current value is from the converged value.
::: solution
$\rho = 0.995$, so $\lVert\mathbf{e}\rVert \approx \tfrac{0.995}{0.005} \times 2.0\times10^{-5} = 4.0\times10^{-3}\ \mathrm{K}$ — two hundred times the change per iteration. Here that is harmless, but the same reasoning applied to a drag coefficient changing by $10^{-5}$ per iteration with $\rho = 0.9995$ gives a remaining error of $0.02$ — possibly larger than the effect being studied. Sanity check: as $\rho \to 1$ the factor $\rho/(1 - \rho)$ grows without bound; a slowly converging iteration is exactly the case in which a small change per iteration means least.
:::
:::

::: warning "The residuals have dropped by four orders" is not a convergence criterion
Residual plots are a necessary check, not a sufficient one. Normalised residuals depend on the initial guess (a good initial guess makes the normalising value small and the drop less impressive; a bad one makes any drop look good), on the normalisation chosen by the code, and on the conditioning of the system. Monitor the quantities you will report — forces, pressure drops, heat fluxes, temperatures at key points — and continue until they have stopped changing to the precision you need; check that global balances (mass in $=$ mass out, energy) close; and for unsteady runs, check convergence within each time step.
:::

::: quiz
On a 3D mesh refined by a factor of $2$ in each direction, approximately how does the cost of solving the pressure equation to a fixed tolerance change with (a) Gauss–Seidel and (b) algebraic multigrid?
- [ ] Both by a factor of $8$
- [x] (a) about $32$ (eight times the unknowns, four times the iterations); (b) about $8$
- [ ] (a) about $16$; (b) about $16$
- [ ] (a) about $8$; (b) about $1$
::: solution
Gauss–Seidel's iteration count grows like $N^2$ per direction: doubling $N$ quadruples the iterations, each of which costs eight times as much — $32$ times in all. Multigrid's iteration count is independent of grid size, so the cost scales with the number of unknowns: $8$ times.
:::
:::

::: history
Iterative solution of linear systems goes back to Gauss, who described an iterative method in letters of the 1820s, and to Philipp Ludwig von Seidel's 1874 paper on the method now named after both. David M. Young's 1950 Harvard thesis created the theory of successive over-relaxation, including the optimal relaxation factor, at the moment electronic computers made large systems routine. Magnus Hestenes and Eduard Stiefel published the conjugate gradient method in 1952 (*Journal of Research of the National Bureau of Standards*); it became practical for large sparse problems only with preconditioning in the 1970s. R. P. Fedorenko described a two-grid relaxation method in 1961 in the USSR, and Achi Brandt's 1977 paper "Multi-level adaptive solutions to boundary-value problems" (*Mathematics of Computation*) showed that multigrid could solve elliptic problems in $O(N)$ work and established it as a general technique.
:::

::: summary
- CFD matrices are sparse, diagonally dominant (with Patankar's rules) and, for diffusion and pressure, symmetric positive definite.
- Dense elimination costs $\tfrac23N^3$; the Thomas algorithm solves tridiagonal systems in $O(N)$ and, line by line, accelerates 2D and 3D iteration.
- Jacobi, Gauss–Seidel and SOR come from splittings $\mathbf{A} = \mathbf{M} - \mathbf{N}$; they converge iff $\rho(\mathbf{M}^{-1}\mathbf{N}) < 1$, guaranteed by diagonal dominance.
- For Poisson problems $\rho_J = \cos(\pi/(N+1))$: iteration counts grow like $N^2$ (Jacobi, Gauss–Seidel) or $N$ (optimal SOR, CG).
- Classical iterations smooth rough errors fast but leave smooth errors; multigrid removes smooth errors on coarse grids, giving $O(N)$ cost; AMG is the standard pressure solver.
- CG (symmetric) and BiCGSTAB/GMRES (non-symmetric), with ILU or multigrid preconditioning, converge in $O(\sqrt\kappa)$ iterations.
- Residuals are not errors: estimate the remaining error as $\rho/(1-\rho)$ times the change per iteration, and monitor the engineering quantities themselves.
:::

## Exercises

::: exercise Spectral radius of a small Jacobi iteration {level=1 check="0.408"}
For $\mathbf{A} = \begin{pmatrix} 4 & 1 \\ 2 & 3 \end{pmatrix}$, form the Jacobi iteration matrix and find its spectral radius. (Enter $\rho_J$ to three decimal places.)
::: solution
$\mathbf{G}_J = -\mathbf{D}^{-1}(\mathbf{A} - \mathbf{D}) = \begin{pmatrix} 0 & -1/4 \\ -2/3 & 0 \end{pmatrix}$, with eigenvalues $\lambda^2 = (1/4)(2/3) = 1/6$, so $\rho_J = 1/\sqrt6 = 0.408$. For Gauss–Seidel, $\rho_{GS} = \rho_J^2 = 0.167$.
:::
:::

::: exercise Iterations needed {level=1 check="88"}
An iteration converges with factor $\rho = 0.90$. How many iterations reduce the error by a factor $10^{4}$? (Enter the smallest whole number.)
::: solution
$k \ge \ln(10^{-4})/\ln(0.90) = 87.4$, so $88$ iterations.
:::
:::

::: exercise Optimal over-relaxation {level=1 check="1.753"}
Jacobi has $\rho_J = 0.99$ for a Poisson-type problem. Find the optimal SOR factor. (Enter $\omega_{\text{opt}}$ to three decimal places.)
::: solution
$\omega_{\text{opt}} = 2/(1 + \sqrt{1 - 0.99^2}) = 2/(1 + 0.1411) = 1.753$, with $\rho_{\text{SOR}} = 0.753$ against $\rho_{GS} = 0.980$: $\ln 0.980/\ln 0.753 \approx 0.07$, so SOR needs about one-fourteenth as many iterations.
:::
:::

::: exercise Thomas algorithm by hand {level=2 check="2.5"}
Solve $2\phi_1 - \phi_2 = 1$, $-\phi_1 + 2\phi_2 - \phi_3 = 0$, $-\phi_2 + 2\phi_3 = 3$ with the Thomas algorithm, showing the $P_i$ and $Q_i$. (Enter $\phi_3$.)
::: solution
With $a_i = 2$, $b_i = c_i = 1$: $P_1 = 1/2$, $Q_1 = 1/2$; $P_2 = 1/(2 - 0.5) = 2/3$, $Q_2 = (0 + 0.5)/1.5 = 1/3$; $P_3 = 0$, $Q_3 = (3 + 1/3)/(2 - 2/3) = (10/3)/(4/3) = 2.5$. Back substitution: $\phi_3 = 2.5$, $\phi_2 = \tfrac23(2.5) + \tfrac13 = 2$, $\phi_1 = \tfrac12(2) + \tfrac12 = 1.5$. Check row 2: $-1.5 + 4 - 2.5 = 0$.
:::
:::

::: exercise Remaining iteration error {level=2 check="0.00398"}
A monitored outlet temperature changes by $2.0\times10^{-5}\ \mathrm{K}$ between iterations and successive changes shrink by the factor $0.995$. Estimate the remaining iteration error. (Enter it in K to three significant figures.)
::: solution
By [[#eq-error-estimate]], $e \approx \rho\Delta/(1 - \rho) = 0.995 \times 2.0\times10^{-5}/0.005 = 3.98\times10^{-3}\ \mathrm{K}$.
:::
:::

::: exercise Cost of direct solution {level=2 check="2e8"}
A 2D structured grid has $100 \times 100$ cells numbered row by row. Estimate the operation count of banded Gaussian elimination, $2Nb^2$, and compare it with dense elimination, $\tfrac23N^3$. (Enter the banded operation count.)
::: solution
$N = 10^4$ and the half-bandwidth is $b = 100$ (a cell's north neighbour is $100$ places away in the numbering), so $2Nb^2 = 2 \times 10^4 \times 10^4 = 2\times10^{8}$ operations, against $\tfrac23 \times 10^{12} = 6.7\times10^{11}$ for dense elimination — over $3000$ times more. The price is fill-in: the band must be stored in full, $2Nb = 2\times10^{6}$ numbers instead of about $5\times10^{4}$ nonzeros.
:::
:::

::: exercise Gauss–Seidel under diagonal dominance {level=3}
Prove that Gauss–Seidel converges for a strictly row-diagonally-dominant matrix. (Hint: suppose $\mathbf{G}_{GS}\mathbf{v} = \lambda\mathbf{v}$ with $\lvert\lambda\rvert \ge 1$, write $(\mathbf{D} - \mathbf{L})^{-1}\mathbf{U}\mathbf{v} = \lambda\mathbf{v}$ as $\lambda(\mathbf{D} - \mathbf{L})\mathbf{v} = \mathbf{U}\mathbf{v}$, and look at the row where $\lvert v_i\rvert$ is largest.)
::: solution
From $\lambda(\mathbf{D} - \mathbf{L})\mathbf{v} = \mathbf{U}\mathbf{v}$, row $i$ reads $\lambda a_{ii}v_i = -\lambda\sum_{j<i}a_{ij}v_j - \sum_{j>i}a_{ij}v_j$. Choose $i$ with $\lvert v_i\rvert = \max_j\lvert v_j\rvert > 0$ and divide by $\lvert v_i\rvert$:
$$
\lvert\lambda\rvert\lvert a_{ii}\rvert \le \lvert\lambda\rvert\sum_{j<i}\lvert a_{ij}\rvert + \sum_{j>i}\lvert a_{ij}\rvert \le \lvert\lambda\rvert\sum_{j\ne i}\lvert a_{ij}\rvert ,
$$
using $\lvert\lambda\rvert \ge 1$ in the last step. Dividing by $\lvert\lambda\rvert$ gives $\lvert a_{ii}\rvert \le \sum_{j\ne i}\lvert a_{ij}\rvert$, contradicting strict diagonal dominance. Hence every eigenvalue has $\lvert\lambda\rvert < 1$ and the iteration converges by [[#thm-spectral-radius]].
:::
:::

::: exercise Choosing a pressure solver {level=3}
You are setting up an unsteady incompressible simulation on an unstructured mesh of $2\times10^{7}$ cells running on $256$ processor cores. Choose a linear solver for the pressure equation and for the momentum equations, justify the choices, and say how tightly you would converge each per time step and what you would monitor.
::: solution
A good answer: the pressure equation is symmetric positive definite, elliptic and the most expensive part; use algebraic multigrid (as a solver, or as a preconditioner for CG), whose cost per unit accuracy is independent of mesh size and which works on unstructured meshes; parallel AMG needs care with coarse levels (agglomeration onto fewer cores). The momentum (and turbulence) equations are non-symmetric but strongly diagonally dominant at small time steps (the $a_P^0$ term), so a few sweeps of Gauss–Seidel or BiCGSTAB with ILU are enough. Per time step: pressure residual reduced by perhaps two orders (or to an absolute tolerance consistent with the required continuity error), momentum by one to two orders, with enough outer iterations (PISO correctors or SIMPLE-type iterations, [[computational-fluid-dynamics/pressure-velocity]]) that the monitored quantities stop changing within the step. Monitor the continuity error, forces or pressure drops, and the inner-iteration counts (a sudden rise signals a problem: poor mesh, time step too large).
:::
:::
