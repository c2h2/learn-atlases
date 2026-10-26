The quadrilateral of [[finite-element-method/plane-elements]] was a rectangle aligned with the axes, because only then are its shape functions simple functions of $x$ and $y$. Real meshes are made of distorted quadrilaterals, curved-edged elements that follow fillets and holes, and bricks and tetrahedra in three dimensions. One idea handles all of them: define every element on a fixed **parent** shape — a square, a triangle, a cube — in natural coordinates $(\xi, \eta, \zeta)$, and use the *same* shape functions to map the parent to the real element and to interpolate the displacements. Such elements are called **isoparametric**. The price is that the integrals for $\mathbf{k}^{(e)}$ can no longer be done in closed form, because the mapping puts a Jacobian determinant in the denominator; they are computed by **Gauss quadrature**, which is so efficient that it decides how elements behave as much as the shape functions do. This chapter develops the mapping, the Jacobian, Gauss quadrature and the consequences of choosing too few integration points, and surveys the higher-order and three-dimensional elements used in practice.

## The isoparametric mapping

::: definition Isoparametric element {#def-iso}
Let $N_i(\xi, \eta)$, $i = 1, \dots, n$, be shape functions on a parent domain (for quadrilaterals the square $-1 \le \xi, \eta \le 1$), with $N_i = 1$ at parent node $i$ and $0$ at the others. An element with physical node coordinates $(x_i, y_i)$ is **isoparametric** if both its geometry and its displacement field are interpolated with these functions:
$$
x = \sum_{i=1}^n N_i(\xi, \eta)\,x_i, \quad y = \sum_{i=1}^n N_i(\xi, \eta)\,y_i, \qquad u = \sum_{i=1}^n N_i(\xi, \eta)\,u_i, \quad v = \sum_{i=1}^n N_i(\xi, \eta)\,v_i.
$$ {#eq-iso}
If the geometry uses lower-order functions than the displacements the element is **subparametric**, and if higher-order, **superparametric**.
:::

For the four-node quadrilateral (Q4) the $N_i = \tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta)$ map the parent square onto any convex quadrilateral with straight sides; for the eight-node element (Q8) the mapping is quadratic and the sides can be parabolic arcs, which approximate circles well. Because each side of the parent maps to a side of the physical element through the nodes of that side only, neighbouring isoparametric elements that share side nodes share the whole side and the displacement along it: compatibility is automatic.

The mapping also guarantees the two properties that any element needs in order to converge.

::: proposition Isoparametric elements represent rigid motion and constant strain {#prop-complete}
If the shape functions satisfy $\sum_i N_i \equiv 1$, an isoparametric element reproduces exactly every displacement field that is linear in $x$ and $y$, $u = a_0 + a_1x + a_2y$, $v = b_0 + b_1x + b_2y$. In particular it can move rigidly without strain and it can represent any state of constant strain.
:::

::: proof
Give the nodes the values of the linear field: $u_i = a_0 + a_1x_i + a_2y_i$. The interpolated field is $u = \sum N_iu_i = a_0\sum N_i + a_1\sum N_ix_i + a_2\sum N_iy_i = a_0 + a_1x + a_2y$, using $\sum N_i = 1$ and the geometric mapping [[#eq-iso]]. So the element's displacement *is* the linear field, at every point, however distorted the element. The same argument fails for subparametric elements unless the geometric functions are a subset of the displacement functions, and fails for superparametric elements in general — which is why isoparametric elements are the standard.
:::

## The Jacobian

Strains need derivatives with respect to $x$ and $y$, but the shape functions are given in $\xi$ and $\eta$. By the chain rule,
$$
\begin{bmatrix} \partial N_i/\partial\xi \\ \partial N_i/\partial\eta \end{bmatrix} = \underbrace{\begin{bmatrix} \partial x/\partial\xi & \partial y/\partial\xi \\ \partial x/\partial\eta & \partial y/\partial\eta \end{bmatrix}}_{\mathbf{J}}\begin{bmatrix} \partial N_i/\partial x \\ \partial N_i/\partial y \end{bmatrix}, \qquad \mathbf{J} = \begin{bmatrix} \sum \dfrac{\partial N_i}{\partial\xi}x_i & \sum \dfrac{\partial N_i}{\partial\xi}y_i \\ \sum \dfrac{\partial N_i}{\partial\eta}x_i & \sum \dfrac{\partial N_i}{\partial\eta}y_i \end{bmatrix}.
$$ {#eq-jacobian}

::: proposition Derivatives and area in an isoparametric element {#prop-jacobian}
At any point where $\det\mathbf{J} \neq 0$,
$$
\begin{bmatrix} \partial N_i/\partial x \\ \partial N_i/\partial y \end{bmatrix} = \mathbf{J}^{-1}\begin{bmatrix} \partial N_i/\partial\xi \\ \partial N_i/\partial\eta \end{bmatrix}, \qquad dA = dx\,dy = \det\mathbf{J}\;d\xi\,d\eta,
$$
so that the element stiffness of [[finite-element-method/plane-elements]] becomes an integral over the parent square:
$$
\mathbf{k}^{(e)} = \int_{-1}^{1}\int_{-1}^{1}\mathbf{B}^{\mathsf T}(\xi, \eta)\,\mathbf{D}\,\mathbf{B}(\xi, \eta)\;t\,\det\mathbf{J}(\xi, \eta)\;d\xi\,d\eta.
$$ {#eq-kiso}
:::

::: proof
$N_i$ depends on $(x, y)$ through $(\xi, \eta)$; regarded as a function of $(\xi, \eta)$, $\partial N_i/\partial\xi = (\partial N_i/\partial x)(\partial x/\partial\xi) + (\partial N_i/\partial y)(\partial y/\partial\xi)$ and likewise for $\eta$, which is [[#eq-jacobian]]. Inverting the $2 \times 2$ matrix requires $\det\mathbf{J} \neq 0$. The area element is the standard change of variables for double integrals ([multivariable calculus](/learn/maths/lesson.php?c=multivariable)): the parent rectangle $d\xi \times d\eta$ maps to a parallelogram spanned by $(\partial x/\partial\xi, \partial y/\partial\xi)\,d\xi$ and $(\partial x/\partial\eta, \partial y/\partial\eta)\,d\eta$, whose area is $\lvert\det\mathbf{J}\rvert\,d\xi\,d\eta$; with anticlockwise node numbering $\det\mathbf{J} > 0$.
:::

The entries of $\mathbf{B}$ are now ratios — derivatives in $\xi, \eta$ multiplied by the inverse Jacobian, which carries $1/\det\mathbf{J}$ — so for a general quadrilateral the integrand of [[#eq-kiso]] is a rational function, not a polynomial. Only for parallelograms is $\mathbf{J}$ constant and the integrand polynomial.

::: example The Jacobian of a distorted quadrilateral {#ex-jacobian}
A Q4 element has nodes 1 $(0, 0)$, 2 $(40, 0)$, 3 $(50, 30)$, 4 $(10, 20)\,\mathrm{mm}$. Find $\mathbf{J}$ and $\det\mathbf{J}$ at the centre and at the four corners, the element area, and the physical position of the parent point $(\xi, \eta) = (0.5, 0.5)$.
::: solution
The derivatives of the shape functions are $\partial N_i/\partial\xi = \tfrac14\xi_i(1 + \eta_i\eta)$ and $\partial N_i/\partial\eta = \tfrac14\eta_i(1 + \xi_i\xi)$. At the centre, $\partial N/\partial\xi = \tfrac14[-1, 1, 1, -1]$ and $\partial N/\partial\eta = \tfrac14[-1, -1, 1, 1]$, so
$$
\frac{\partial x}{\partial\xi} = \tfrac14(-0 + 40 + 50 - 10) = 20, \quad \frac{\partial y}{\partial\xi} = \tfrac14(0 + 0 + 30 - 20) = 2.5, \quad \frac{\partial x}{\partial\eta} = \tfrac14(-0 - 40 + 50 + 10) = 5, \quad \frac{\partial y}{\partial\eta} = \tfrac14(30 + 20) = 12.5,
$$
$\mathbf{J}(0, 0) = [20, 2.5; 5, 12.5]\,\mathrm{mm}$ and $\det\mathbf{J} = 250 - 12.5 = 237.5\,\mathrm{mm^2}$. Repeating at the corners gives $\det\mathbf{J} = 200, 300, 275, 175\,\mathrm{mm^2}$ at nodes 1, 2, 3, 4. All are positive, so the mapping is valid.

Area: $\int\!\!\int\det\mathbf{J}\,d\xi\,d\eta$. For a Q4, $\det\mathbf{J}$ is linear in $\xi$ and $\eta$ (the $\xi\eta$ terms cancel), so its integral over the square is $4\det\mathbf{J}(0, 0) = 950\,\mathrm{mm^2}$. The shoelace formula gives $\tfrac12\lvert 0 \cdot 0 - 40 \cdot 0 + 40 \cdot 30 - 50 \cdot 0 + 50 \cdot 20 - 10 \cdot 30 + 10 \cdot 0 - 0 \cdot 20\rvert = \tfrac12(1200 + 1000 - 300) = 950\,\mathrm{mm^2}$.

Mapping of $(0.5, 0.5)$: $N = [0.0625, 0.1875, 0.5625, 0.1875]$, so $x = 0.1875 \times 40 + 0.5625 \times 50 + 0.1875 \times 10 = 37.5\,\mathrm{mm}$ and $y = 0.5625 \times 30 + 0.1875 \times 20 = 20.625\,\mathrm{mm}$.

*Check.* The corner values of $\det\mathbf{J}$ are one quarter of the area of the parallelogram formed by the two edges meeting at each corner: at node 2, edges $(−40, 0)$ and $(10, 30)$ give $\lvert -40 \times 30\rvert/4 = 300$. ✓.
:::
:::

### Distortion and the sign of $\det\mathbf{J}$

The mapping is valid only if $\det\mathbf{J} > 0$ everywhere in the element. For a Q4 this holds exactly when the quadrilateral is convex: if an interior angle approaches $180°$, $\det\mathbf{J}$ approaches zero at that corner, and a re-entrant (arrow-head) quadrilateral has negative $\det\mathbf{J}$ there — the mapping folds over itself. Codes report such elements as errors. Elements that are valid but strongly distorted (interior angles far from $90°$, large aspect ratio, midside nodes far from the middle of their side) are accepted but lose accuracy, because the rational integrand is hard to integrate and because a distorted element can no longer represent the quadratic and higher fields that give good convergence. Mesh generators report the **Jacobian ratio** — the ratio of the smallest to the largest $\det\mathbf{J}$ over the element — as a quality measure; for the element above it is $175/300 = 0.58$, acceptable.

## Gauss quadrature

An integral over the parent square is computed as a weighted sum of integrand values at chosen points:
$$
\int_{-1}^{1}\int_{-1}^{1}g(\xi, \eta)\,d\xi\,d\eta \approx \sum_{i=1}^{n}\sum_{j=1}^{n}w_iw_j\,g(\xi_i, \eta_j).
$$
The one-dimensional rule is chosen to be as accurate as possible for a given number of points.

::: theorem Gauss–Legendre quadrature {#thm-gauss}
Let $\xi_1, \dots, \xi_n$ be the roots of the Legendre polynomial $P_n$ of degree $n$, and $w_i = \int_{-1}^{1}\ell_i(\xi)\,d\xi$ the integrals of the Lagrange polynomials $\ell_i$ through these points. Then
$$
\int_{-1}^{1}p(\xi)\,d\xi = \sum_{i=1}^n w_i\,p(\xi_i)
$$
for every polynomial $p$ of degree at most $2n - 1$. No rule with $n$ points is exact for all polynomials of degree $2n$.
:::

::: proof
The Legendre polynomials are orthogonal on $[-1, 1]$: $\int_{-1}^{1}P_nq\,d\xi = 0$ for every polynomial $q$ of degree less than $n$. Divide $p$ (degree $\le 2n - 1$) by $P_n$: $p = qP_n + r$ with $q$ and $r$ of degree $\le n - 1$. Then $\int p = \int qP_n + \int r = \int r$. On the other side, $\sum w_ip(\xi_i) = \sum w_iq(\xi_i)P_n(\xi_i) + \sum w_ir(\xi_i) = \sum w_ir(\xi_i)$ because the $\xi_i$ are roots of $P_n$. Finally, $r$ has degree $\le n - 1$, so it equals its Lagrange interpolant through the $n$ points, $r = \sum r(\xi_i)\ell_i$, and integrating gives $\int r = \sum w_ir(\xi_i)$. Hence the rule is exact for $p$. For the negative statement take $p = \prod_i(\xi - \xi_i)^2$, of degree $2n$, built on any $n$ points: $\int p > 0$ but the rule gives $0$.
:::

For $n = 1$: $\xi_1 = 0$, $w_1 = 2$ (the midpoint rule, exact for linear functions). For $n = 2$: $P_2 = \tfrac12(3\xi^2 - 1)$, so $\xi = \pm1/\sqrt3 = \pm0.57735$, $w = 1$ (exact for cubics). For $n = 3$: $\xi = 0, \pm\sqrt{3/5} = \pm0.77460$, $w = 8/9, 5/9, 5/9$ (exact for quintics). The same values follow directly by demanding exactness for $1, \xi, \xi^2, \dots$: for two points, symmetry gives $\xi = \pm a$, $w_1 = w_2 = 1$ from $\int 1 = 2$, and $\int\xi^2 = 2/3 = 2a^2$ gives $a = 1/\sqrt3$. Compared with the trapezoidal or Simpson rules, Gauss quadrature roughly halves the number of function evaluations for the same polynomial accuracy — and in a finite element code, each evaluation means forming $\mathbf{B}$ and computing $\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$.

::: example Gauss rules on two integrals {#ex-gauss}
Evaluate $\int_{-1}^{1}(\xi^3 + \xi^2)\,d\xi$ and $\int_{-1}^{1}e^\xi\,d\xi$ with one-, two- and three-point Gauss rules.
::: solution
*Polynomial.* Exact value $0 + 2/3 = 0.6667$. One point: $2(0 + 0) = 0$ (the rule is exact only to degree 1). Two points: $(\tfrac{1}{3\sqrt3} + \tfrac13) + (-\tfrac{1}{3\sqrt3} + \tfrac13) = 0.6667$, exact as the theorem promises for degree 3; the odd term cancels by symmetry, as it does for every symmetric rule. Three points: exact.

*Exponential.* Exact $e - e^{-1} = 2.350402$. One point: $2e^0 = 2.000000$ (error $15\,\%$). Two points: $e^{0.57735} + e^{-0.57735} = 2.342696$ (error $0.33\,\%$). Three points: $\tfrac59(e^{0.77460} + e^{-0.77460}) + \tfrac89 = 2.350337$ (error $0.0028\,\%$).

*Check.* Each extra point improves the smooth integrand by about two orders of magnitude, because the error of an $n$-point rule is proportional to the $2n$-th derivative divided by roughly $(2n)!$. For the rational integrands of distorted elements, convergence is similar but not exact at any finite $n$.
:::
:::

::: widget quadrature
f: exp(x)
a: -1
b: 1
methods: trap; simpson; gauss; gauss3
caption: Error of composite rules for $\int_{-1}^{1}e^x\,dx$ against the number of subintervals $n$, on log–log axes. The slopes are the orders: 2 for the trapezoidal rule, 4 for Simpson's rule and for two-point Gauss, 6 for three-point Gauss. At equal cost (function evaluations), Gauss wins; inside one finite element there is no subdivision at all, and the order of the single rule is what matters.
:::

::: algorithm Element stiffness by numerical integration {#alg-stiffness}
For an isoparametric plane element with an $n_G \times n_G$ Gauss rule:
1. Set $\mathbf{k}^{(e)} = \mathbf{0}$.
2. For each Gauss point $(\xi_i, \eta_j)$ with weight $w_iw_j$:
   1. evaluate $\partial N_a/\partial\xi$, $\partial N_a/\partial\eta$ for all nodes $a$;
   2. form $\mathbf{J}$ from [[#eq-jacobian]] and $\det\mathbf{J}$; stop with an error if $\det\mathbf{J} \le 0$;
   3. compute $\partial N_a/\partial x$, $\partial N_a/\partial y$ with $\mathbf{J}^{-1}$ and assemble $\mathbf{B}$;
   4. add $w_iw_j\,t\,\det\mathbf{J}\;\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$ to $\mathbf{k}^{(e)}$.
3. Load vectors are integrated in the same loop with $\mathbf{N}^{\mathsf T}\mathbf{b}$; stresses are later evaluated at the same Gauss points, where they are usually most accurate.
:::

## How many integration points?

Too many points waste time; too few produce an element that is either inaccurate or, worse, singular. Two guiding rules come from the integrands.

**Full integration** is the rule that integrates $\mathbf{k}^{(e)}$ exactly for an undistorted element. For the Q4 rectangle, $\mathbf{B}$ contains terms linear in one coordinate, so $\mathbf{B}^{\mathsf T}\mathbf{D}\mathbf{B}$ is at most quadratic in each of $\xi$ and $\eta$: the $2\times2$ rule is full. For the eight-node Q8 it is $3\times3$; for the nine-node Q9, $3\times3$.

**Reduced integration** uses one order less: $1 \times 1$ for Q4, $2 \times 2$ for Q8. It is cheaper and, remarkably, often *more* accurate, because the stiffening caused by parasitic shear in [[finite-element-method/plane-elements]] comes from terms that vanish at the reduced points — at the centre of a Q4 the parasitic shear strain $\gamma = \alpha\xi/b$ is zero. The danger is rank deficiency.

::: proposition Spurious zero-energy modes {#prop-hourglass}
An element stiffness matrix computed with $n_p$ integration points and a strain vector of $n_s$ components has rank at most $n_pn_s$. If the element has $n_d$ DOFs and $n_r$ rigid-body modes, it has at least $n_d - n_r - n_pn_s$ **spurious zero-energy modes** whenever this number is positive.
:::

::: proof
$\mathbf{k}^{(e)} = \sum_p w_p t\det\mathbf{J}_p\,\mathbf{B}_p^{\mathsf T}\mathbf{D}\mathbf{B}_p$ is a sum of $n_p$ matrices, each of rank at most $n_s$ (the number of rows of $\mathbf{B}_p$). The rank of a sum is at most the sum of the ranks, so $\operatorname{rank}\mathbf{k}^{(e)} \le n_pn_s$ and the null space has dimension at least $n_d - n_pn_s$. Of these null vectors $n_r$ are the legitimate rigid-body modes; the rest are deformation patterns that produce no strain at any integration point and therefore cost no energy.
:::

For the Q4 with one point: $n_d = 8$, $n_r = 3$, $n_pn_s = 3$, so there are at least $8 - 3 - 3 = 2$ spurious modes. They are the two **hourglass modes** $u = \xi\eta$, $v = 0$ and $u = 0$, $v = \xi\eta$, the bending modes themselves: each element can deform in an hourglass shape without resistance, and in a mesh these modes can combine into a zig-zag pattern that swamps the solution. For the Q8 with $2 \times 2$ points: $16 - 3 - 12 = 1$ spurious mode, which, unlike the Q4 modes, cannot propagate through a mesh of several elements (it is "non-communicable"), so reduced-integration Q8 elements are widely used. Codes that use one-point Q4 elements — common in explicit dynamics for speed — add a small artificial **hourglass control** stiffness, and the analyst must check that the artificial hourglass energy remains a small fraction (a few per cent) of the strain energy.

::: example Full and reduced integration of a distorted element {#ex-integration}
For the element of [[#ex-jacobian]] (steel, $E = 200\,\mathrm{GPa}$, $\nu = 0.3$, plane stress, $t = 10\,\mathrm{mm}$), compute the entry $k_{11}$ with $1 \times 1$, $2 \times 2$, $3 \times 3$ and $10 \times 10$ Gauss rules, and count the zero eigenvalues of $\mathbf{k}^{(e)}$ in each case.
::: solution
Using [[#alg-stiffness]] (a short program):

| rule | $k_{11}$ (kN/mm) | zero eigenvalues |
|---|---|---|
| $1 \times 1$ | 413.5 | 5 |
| $2 \times 2$ | 741.5 | 3 |
| $3 \times 3$ | 743.60 | 3 |
| $10 \times 10$ | 743.63 | 3 |

The $10 \times 10$ value is converged to five figures and is taken as exact. The $2 \times 2$ rule is within $0.28\,\%$ even though the integrand is rational; the one-point rule misses almost half of $k_{11}$ and leaves five zero eigenvalues — the three rigid-body modes plus the two hourglass modes of [[#prop-hourglass]].

*Check.* For an undistorted rectangle $2\times2$ would be exact; here the error comes only from the distortion. The count of zero eigenvalues is the practical test for spurious modes, and every element implementation should pass it.
:::
:::

::: warning Integration order is part of the element
"Q4" in one program and "Q4" in another can be different elements: full integration, selective reduced integration (shear terms at one point, normal terms at $2\times2$), one-point integration with hourglass control, or incompatible-mode formulations. They give noticeably different answers on coarse meshes, especially in bending and for nearly incompressible materials. Read the element documentation, know which formulation you are using, and never switch an element to reduced integration to "make it softer" without checking for hourglass modes — a deformed shape with zig-zag patterns or a large hourglass energy means the results are meaningless.
:::

## Higher-order and three-dimensional elements

Linear elements need many elements wherever stresses vary. Quadratic elements represent linear strain variation inside each element and curved boundaries, and in smooth problems they reach a given accuracy with far fewer DOFs.

- **Eight-node serendipity quadrilateral (Q8):** corner and midside nodes; complete quadratic plus $\xi^2\eta$, $\xi\eta^2$ terms. Corner functions $N_i = \tfrac14(1 + \xi_i\xi)(1 + \eta_i\eta)(\xi_i\xi + \eta_i\eta - 1)$, midside functions such as $\tfrac12(1 - \xi^2)(1 + \eta_i\eta)$. Excellent in bending: a single layer of rectangular Q8 elements represents pure bending exactly.
- **Nine-node Lagrange quadrilateral (Q9):** adds a centre node, complete biquadratic field; more robust when distorted.
- **Six-node triangle (T6, linear-strain triangle):** complete quadratic, the triangular counterpart of Q8; used with automatic triangular meshers.
- **Three-dimensional solids:** the 8-node hexahedron (trilinear, brick) and its 20-node serendipity version, the 4-node tetrahedron (constant strain, very stiff in bending) and the 10-node tetrahedron. Automatic meshers fill complex solids with tetrahedra, so in practice three-dimensional stress analysis relies on the **10-node quadratic tetrahedron**; the 4-node tetrahedron should be used for stress only with very fine meshes.

The one-dimensional three-node bar shows the essential new feature of quadratic elements: the midside node controls the mapping. With nodes at $\xi = -1, 0, 1$ the shape functions are $N_1 = \tfrac12\xi(\xi - 1)$, $N_3 = 1 - \xi^2$ (midside) and $N_2 = \tfrac12\xi(\xi + 1)$.

::: example The quarter-point element {#ex-quarter}
A three-node bar element runs from $x = 0$ (node 1) to $x = L$ (node 2) with its midside node 3 at $x = sL$. Find the Jacobian $dx/d\xi$, show that it is positive throughout the element only if $\tfrac14 < s < \tfrac34$, and show that for $s = \tfrac14$ the strain varies like $1/\sqrt{x}$ near node 1.
::: solution
$x(\xi) = N_2L + N_3sL = L\left[\tfrac12\xi(\xi + 1) + s(1 - \xi^2)\right]$, so
$$
J = \frac{dx}{d\xi} = L\left[\xi + \tfrac12 - 2s\xi\right] = L\left[\tfrac12 + (1 - 2s)\xi\right].
$$
$J$ is linear in $\xi$, so it is positive on $[-1, 1]$ if it is positive at both ends: $J(-1) = L(2s - \tfrac12) > 0$ requires $s > \tfrac14$, and $J(1) = L(\tfrac32 - 2s) > 0$ requires $s < \tfrac34$. For $s = \tfrac12$ (midside node in the middle) $J = L/2$ is constant and the mapping is linear.

For $s = \tfrac14$: $x = \tfrac{L}{4}(1 + \xi)^2$, so $1 + \xi = 2\sqrt{x/L}$, and $J = \tfrac{L}{2}(1 + \xi) = \sqrt{xL}$, which vanishes at node 1. A displacement field quadratic in $\xi$ is, in terms of $x$, a combination of $1$, $\sqrt{x}$ and $x$; its strain $du/dx = (du/d\xi)/J$ contains a term proportional to $1/\sqrt{x}$.

*Interpretation.* With a midside node at a quarter of the side, the element contains exactly the $1/\sqrt{r}$ strain singularity of linear elastic fracture mechanics at a crack tip. **Quarter-point elements** — eight-node quadrilaterals collapsed into triangles at the crack tip with the adjacent midside nodes moved to the quarter points — are the standard way to compute stress intensity factors with ordinary finite element codes (see [[solid-mechanics/fracture-mechanics]]). The same shift, made by accident in a mesh away from a crack, creates a spurious singularity: midside nodes must stay near the middle of their sides.
:::
:::

::: widget plot
f: (x + 0.5)/(x + 0.5 - 2*s*x)
x: -1, 1
y: -8, 4
sliders: s=0.5:0.26:0.74:0.01
labels: L\,dN_2/dx
caption: The strain produced in the three-node bar of [[#ex-quarter]] by a unit displacement of end node 2, $dN_2/dx = (dN_2/d\xi)/J$, plotted against $\xi$ (horizontal axis) and multiplied by $L$. With the midside node in the middle ($s = 0.5$) the strain is linear, as it should be. Move the midside node towards a quarter-point ($s \to 0.26$): the Jacobian at $\xi = -1$ tends to zero and the (negative) strain near node 1 grows without bound in magnitude — the quarter-point singularity, useful at a crack tip and a disaster anywhere else.
:::

::: quiz
A mesh of Q4 elements with one-point integration gives a deformed shape with a regular zig-zag pattern of displacements superposed on a smooth deformation, while the stresses at the element centres look reasonable. What is happening?
- [ ] The mesh is too fine, and round-off error dominates.
- [x] Hourglass modes: one-point integration leaves the bilinear $\xi\eta$ modes without stiffness, and they have been excited by the loads or supports.
- [ ] The elements are locking in shear.
- [ ] The Jacobian is negative in some elements.
::: solution
The centre-point stresses are blind to the $\xi\eta$ modes because those modes produce no strain at $\xi = \eta = 0$; that is why the stresses look fine while the displacements are polluted. Remedies: hourglass control, full or selective integration, or a finer mesh with loads spread over several nodes. Locking would make the model too stiff, not wavy, and a negative Jacobian is reported as an error.
:::
:::

::: history
The idea of mapping elements from a parent shape appeared in the early 1960s in a report by I. C. Taig on quadrilateral elements, written at English Electric for aircraft structures. Bruce Irons generalised it and in 1966 published a note on numerical integration in stiffness methods in the *AIAA Journal*; in 1968 Ergatoudis, Irons and Zienkiewicz described curved isoparametric quadrilaterals integrated by Gauss quadrature in the *International Journal of Solids and Structures*, the paper that gave the elements their name. The quadrature itself goes back to Carl Friedrich Gauss's 1814 paper on approximate integration. In the 1970s reduced and selective integration were found to cure locking, and the hourglass modes they introduce, analysed by Flanagan and Belytschko in 1981 among others, made hourglass control a standard feature of explicit crash and impact codes.
:::

::: summary
- An isoparametric element interpolates geometry and displacements with the same shape functions on a parent domain; with $\sum N_i = 1$ it represents rigid motion and constant strain however it is distorted.
- The Jacobian $\mathbf{J}$ converts $\xi, \eta$ derivatives into $x, y$ derivatives and $dA = \det\mathbf{J}\,d\xi\,d\eta$; $\det\mathbf{J}$ must be positive everywhere (convex quadrilaterals, midside nodes near mid-side).
- $n$-point Gauss–Legendre quadrature is exact for polynomials of degree $2n - 1$; the points are the roots of $P_n$ ($\pm1/\sqrt3$ for $n = 2$).
- Full integration ($2\times2$ for Q4, $3\times3$ for Q8) is exact for undistorted elements; reduced integration cures locking but can leave spurious zero-energy (hourglass) modes, at least $n_d - n_r - n_pn_s$ of them.
- Quadratic elements (Q8, Q9, T6, 10-node tetrahedra) are far more accurate per DOF in bending and on curved boundaries; quarter-point midside nodes build in the $1/\sqrt r$ crack-tip singularity.
:::

## Exercises

::: exercise Two-point Gauss on a quartic {level=1 check="2/9"}
Apply the two-point Gauss rule to $\int_{-1}^{1}\xi^4\,d\xi$. (Enter the value the rule gives.) What is the exact value, and why does the rule fail?
::: solution
$\xi^4$ at $\pm1/\sqrt3$ equals $1/9$, so the rule gives $2/9 = 0.2222$, while the exact value is $2/5 = 0.4$. The two-point rule is exact only up to degree $2n - 1 = 3$.
:::
:::

::: exercise Jacobian of a rectangle {level=1 check="600"}
A Q4 element is a rectangle $60\,\mathrm{mm}$ wide and $40\,\mathrm{mm}$ high, aligned with the axes. What is $\det\mathbf{J}$? (Enter it in mm².)
::: solution
$\partial x/\partial\xi = a = 30\,\mathrm{mm}$, $\partial y/\partial\eta = b = 20\,\mathrm{mm}$, off-diagonal terms zero: $\det\mathbf{J} = ab = 600\,\mathrm{mm^2}$, one quarter of the area, since the parent square has area 4.
:::
:::

::: exercise Choosing the number of points {level=1 check="3"}
In a one-dimensional element the integrand of the stiffness matrix is a polynomial of degree 5. What is the smallest number of Gauss points that integrates it exactly? (Enter the number of points.)
::: solution
Need $2n - 1 \ge 5$, so $n = 3$.
:::
:::

::: exercise Mapping a point {level=2 check="37.5"}
For the element of [[#ex-jacobian]], compute the $x$ coordinate of the parent point $(\xi, \eta) = (0.5, 0.5)$ from the shape functions. (Enter $x$ in mm.)
::: solution
$N_1 = \tfrac14(0.5)(0.5) = 0.0625$, $N_2 = \tfrac14(1.5)(0.5) = 0.1875$, $N_3 = \tfrac14(1.5)(1.5) = 0.5625$, $N_4 = 0.1875$. $x = 0.0625 \times 0 + 0.1875 \times 40 + 0.5625 \times 50 + 0.1875 \times 10 = 37.5\,\mathrm{mm}$.
:::
:::

::: exercise Three-point Gauss on the exponential {level=2 check="2.350337"}
Evaluate $\int_{-1}^{1}e^\xi\,d\xi$ with the three-point Gauss rule. (Enter the result to six decimal places.)
::: solution
With $\sqrt{0.6} = 0.7745967$: $e^{0.7745967} = 2.1697168$ and $e^{-0.7745967} = 0.4608896$, whose sum is $2.6306065$. The rule gives $\tfrac59 \times 2.6306065 + \tfrac89 = 1.4614480 + 0.8888889 = 2.350337$, against the exact $e - e^{-1} = 2.350402$ (error $2.8\times10^{-5}$ relative). Keep at least seven significant figures in the points and weights: rounding $\sqrt{0.6}$ to $0.775$ already changes the fifth decimal.
:::
:::

::: exercise Spurious modes of the eight-node element {level=2 check="1"}
Using [[#prop-hourglass]], how many spurious zero-energy modes does an eight-node plane quadrilateral have when integrated with a $2 \times 2$ rule? (Enter the number.)
::: solution
$n_d = 16$, $n_r = 3$, $n_pn_s = 4 \times 3 = 12$, so at least $16 - 3 - 12 = 1$. It is a single mode that cannot spread through a mesh of several elements, which is why reduced-integration Q8 elements are safe in practice when more than one element is used.
:::
:::

::: exercise Area by Gauss quadrature {level=2 check="950"}
Show that for a Q4 element $\det\mathbf{J}$ is a linear function of $\xi$ and $\eta$ (no $\xi\eta$ term), and hence that the one-point rule gives the area exactly. Verify for the element of [[#ex-jacobian]]. (Enter the area in mm².)
::: solution
$\partial x/\partial\xi = A_1 + A_2\eta$, $\partial y/\partial\eta = B_1 + B_2\xi$, $\partial x/\partial\eta = C_1 + A_2\xi$, $\partial y/\partial\xi = D_1 + B_2\eta$ for constants determined by the nodes (the same $A_2$ and $B_2$ appear twice because both come from the $\xi\eta$ term of the mapping). Then $\det\mathbf{J} = (A_1 + A_2\eta)(B_1 + B_2\xi) - (C_1 + A_2\xi)(D_1 + B_2\eta)$, in which the $\xi\eta$ terms $A_2B_2\xi\eta$ cancel. A linear function is integrated exactly by the one-point rule: area $= 4\det\mathbf{J}(0, 0) = 4 \times 237.5 = 950\,\mathrm{mm^2}$.
:::
:::

::: exercise Deriving the two-point rule {level=3}
Derive the two-point Gauss rule from scratch by requiring exactness for $1, \xi, \xi^2, \xi^3$ with unknown points $\xi_1, \xi_2$ and weights $w_1, w_2$ (four nonlinear equations), without assuming symmetry. Then show that no choice of two points and weights can integrate $\xi^4$ exactly together with the lower powers.
::: solution
Equations: $w_1 + w_2 = 2$, $w_1\xi_1 + w_2\xi_2 = 0$, $w_1\xi_1^2 + w_2\xi_2^2 = 2/3$, $w_1\xi_1^3 + w_2\xi_2^3 = 0$. From the second and fourth, $w_1\xi_1(\xi_1^2 - \xi_2^2) = 0$. $w_1 = 0$ or $\xi_1 = 0$ lead to contradictions with the other equations (e.g. $\xi_1 = 0$ forces $w_2\xi_2 = 0$, then $w_2\xi_2^2 = 0 \neq 2/3$), so $\xi_1^2 = \xi_2^2$ and, the points being distinct, $\xi_2 = -\xi_1$. Then $w_1 = w_2 = 1$ and $2\xi_1^2 = 2/3$, $\xi_1 = 1/\sqrt3$. A fifth condition $\xi_1^4 + \xi_2^4 = 2/5$ would require $2/9 = 2/5$, impossible — in agreement with [[#thm-gauss]].
:::
:::

::: exercise Strain singularity of a quarter-point element {level=3}
For the three-node bar with $s = \tfrac14$ in [[#ex-quarter]], let the nodal displacements be $u_1 = 0$, $u_2 = U$ and $u_3 = U_3$. Express the strain $du/dx$ as a function of $x$, and find the value of $U_3$ for which the strain is finite at $x = 0$. Interpret the result: which nodal displacements make the singular term vanish?
::: solution
$u = N_2U + N_3U_3 = \tfrac12\xi(\xi + 1)U + (1 - \xi^2)U_3$ with $1 + \xi = 2\sqrt{x/L}$, i.e. $\xi = 2\rho - 1$ where $\rho = \sqrt{x/L}$. Then $\tfrac12\xi(\xi + 1) = \rho(2\rho - 1) = 2\rho^2 - \rho$ and $1 - \xi^2 = (1 - \xi)(1 + \xi) = (2 - 2\rho)(2\rho) = 4\rho - 4\rho^2$. So $u = U(2x/L - \rho) + U_3(4\rho - 4x/L) = (2U - 4U_3)x/L + (4U_3 - U)\sqrt{x/L}$. The strain is $du/dx = (2U - 4U_3)/L + (4U_3 - U)/(2\sqrt{xL})$. It is finite at $x = 0$ only if $U_3 = U/4$, i.e. the quarter-point node displaces in proportion to its position, as in a uniform strain field; any other value introduces a $1/\sqrt{x}$ strain. The element can therefore represent both a uniform strain and a square-root singular strain, which is exactly what a crack-tip element needs.
:::
:::
