A finite element program always returns an answer. Whether the answer is any good depends on decisions the program cannot make for you: which elements, how many, where. The previous chapters showed the symptoms — stresses that are exact only at element midpoints in [[finite-element-method/weak-forms]], quadrilaterals that are three times too stiff in bending in [[finite-element-method/plane-elements]], spurious modes from too few integration points in [[finite-element-method/isoparametric-elements]]. This chapter turns them into a working theory of accuracy. We define how error is measured, state and prove how fast it falls as the mesh is refined, show how to *measure* the rate from a sequence of meshes and extrapolate to the converged answer, identify the two situations in which the usual rates fail — locking and singularities — and end with the practical tools of stress recovery, error estimation and adaptive meshing. The aim is the habit that separates analysis from colouring-in: never report a finite element number without some evidence of how close it is to the answer of the mathematical model.

## Where errors come from

It helps to separate four kinds of error, because they have different cures.

1. **Modelling error**: the mathematical model differs from the physical object — idealised supports, linear material where the steel yields, a plate model of a thick part, a missing contact. Mesh refinement does nothing for it. It is assessed by *validation* against tests, discussed in [[finite-element-method/nonlinear-analysis]].
2. **Discretisation error**: the difference between the exact solution of the mathematical model and the finite element solution, caused by representing the field with a finite number of shape functions. This chapter is about it.
3. **Quadrature and geometric error**: from numerical integration of distorted elements and from approximating curved boundaries by element edges. These normally converge along with the discretisation error if the element formulation is sound.
4. **Round-off error**: from finite-precision arithmetic. In double precision it is negligible unless the stiffness matrix is badly conditioned (huge stiffness contrasts, penalty numbers, nearly singular models).

::: definition Error measures {#def-error}
Let $u$ be the exact solution of the mathematical model and $u_h$ the finite element solution on a mesh of characteristic element size $h$. The error $e = u - u_h$ is measured by
- the **energy norm** $\|e\|_E = \left(\int_V \boldsymbol{\varepsilon}(e)^{\mathsf T}\mathbf{D}\,\boldsymbol{\varepsilon}(e)\,dV\right)^{1/2}$, twice the square root of the strain energy of the error field — the natural measure for stresses and strains;
- the **$L^2$ norm** $\|e\|_{L^2} = \left(\int_V e^2\,dV\right)^{1/2}$, an average measure for displacements;
- **pointwise errors** in quantities of interest, such as the tip deflection or the peak stress at a fillet.

The **relative** energy-norm error is $\eta = \|e\|_E/\|u\|_E$. A method **converges** if the error tends to zero as $h \to 0$; it converges **at rate** $p$ in a given norm if the error behaves like $Ch^p$.
:::

## Conditions for convergence

Before asking how fast a method converges, we must know that it converges at all. For displacement-based elements the classical sufficient conditions are:

- **Completeness**: the element can represent every rigid-body motion and every state of constant strain (so that, as elements shrink and strains become nearly constant over each, the true field can be approached). For isoparametric elements this was proved in [[finite-element-method/isoparametric-elements]].
- **Compatibility (conformity)**: displacements are continuous between elements (for beams and plates, slopes too), so that the finite element field is an admissible trial function of the weak form.
- **Stability**: the element stiffness has no spurious zero-energy modes, and the assembled matrix stays well conditioned as the mesh is refined.

Compatibility can be relaxed — successful non-conforming and incompatible-mode elements exist — but then convergence is no longer automatic and must be checked by a numerical experiment devised by Bruce Irons: the patch test.

::: algorithm The patch test {#alg-patch}
1. Build a small **patch** of elements in which at least one node is fully interior, with deliberately distorted element shapes (not rectangles).
2. Choose a displacement field that is linear in the coordinates, $u = a_0 + a_1x + a_2y$, $v = b_0 + b_1x + b_2y$, corresponding to a constant strain state.
3. Prescribe this field at all *boundary* nodes of the patch; apply no other loads. (In a second version, prescribe only enough to stop rigid motion and apply the boundary tractions of the constant stress state as consistent nodal loads.)
4. Solve for the interior nodes.
5. **Pass** if the interior displacements equal the linear field and every element shows the exact constant strain and stress, to round-off precision, at every integration point. Any discrepancy, however small, is a **fail**.
:::

An element that passes the patch test, and is stable, converges as the mesh is refined. Elements that fail can give convincing-looking results on regular meshes and converge to the wrong answer on irregular ones.

::: example A patch test for the Q4 element {#ex-patch}
Four Q4 elements fill the square $0 \le x, y \le 20\,\mathrm{mm}$; the interior node is moved from the centre $(10, 10)$ to $(13, 8)\,\mathrm{mm}$ so that all four elements are distorted. Plane stress, $E = 200\,\mathrm{GPa}$, $\nu = 0.3$. The eight boundary nodes are given the displacements of the field $u = 10^{-3}x + 0.5\times10^{-3}y$, $v = 0.5\times10^{-3}x + 0.2\times10^{-3}y$ (in mm). Carry out the test.
::: solution
The field has constant strains $\varepsilon_x = 1.0\times10^{-3}$, $\varepsilon_y = 0.2\times10^{-3}$, $\gamma_{xy} = 0.5\times10^{-3} + 0.5\times10^{-3} = 1.0\times10^{-3}$, and with the plane-stress $\mathbf{D}$ the exact stresses are
$$
\sigma_x = 219\,780(1.0 + 0.3 \times 0.2)\times10^{-3} = 232.97\,\mathrm{MPa}, \quad \sigma_y = 219\,780(0.3 + 0.2)\times10^{-3} = 109.89\,\mathrm{MPa}, \quad \tau_{xy} = 76.92\,\mathrm{MPa}.
$$
Assembling the four $2 \times 2$-integrated element matrices and solving for the two interior DOFs gives $u = 0.01700\,\mathrm{mm}$, $v = 0.00810\,\mathrm{mm}$; the field evaluated at $(13, 8)$ gives $u = 0.013 + 0.004 = 0.0170$ and $v = 0.0065 + 0.0016 = 0.0081\,\mathrm{mm}$ — identical. The stresses at all sixteen Gauss points equal $(232.97, 109.89, 76.92)\,\mathrm{MPa}$ to the printed precision.

*Conclusion.* The isoparametric Q4 passes, as [[finite-element-method/isoparametric-elements]] guarantees. The test is cheap, and it is the first thing to run on any new element or new code: it catches errors in $\mathbf{B}$, in the Jacobian, in quadrature and in assembly.
:::
:::

## Rates of convergence

Galerkin's method gives the best approximation in the energy norm (see [[finite-element-method/weak-forms]]), so the error of the finite element solution is no larger than the error of *any* function in the finite element space — in particular, of the interpolant of the exact solution. Estimating the interpolation error therefore estimates the finite element error. In one dimension the argument is short.

::: theorem Energy error of linear elements in one dimension {#thm-rate}
For the bar problem $-(EAu')' = b$ with constant $EA$, solved with linear elements of maximum length $h$, if $u''$ is square integrable then
$$
\|u - u_h\|_E \le \frac{h}{\pi}\sqrt{EA}\,\|u''\|_{L^2}.
$$
The energy-norm error, and hence the error in stress, is $O(h)$.
:::

::: proof
By the best-approximation theorem, $\|u - u_h\|_E \le \|u - \mathcal{I}u\|_E$, where $\mathcal{I}u$ is the piecewise-linear interpolant of $u$ at the nodes. On one element $[x_i, x_{i+1}]$ of length $h_i$, the interpolation error $e = u - \mathcal{I}u$ vanishes at both ends, so its derivative $e'$ has zero mean over the element. Wirtinger's inequality states that a function $g$ with zero mean on an interval of length $h_i$ satisfies $\int g^2 \le (h_i/\pi)^2\int(g')^2$. Applying it to $g = e'$, with $e'' = u''$ (because $\mathcal{I}u$ is linear),
$$
\int_{x_i}^{x_{i+1}}(e')^2\,dx \le \frac{h_i^2}{\pi^2}\int_{x_i}^{x_{i+1}}(u'')^2\,dx.
$$
Summing over elements, multiplying by $EA$ and using $h_i \le h$ gives $\|e\|_E^2 \le (h/\pi)^2EA\,\|u''\|^2_{L^2}$. Assumptions: exact integration, constant $EA$, $u''$ square integrable (the solution is "smooth enough").
:::

The same reasoning, with polynomial interpolation theory in place of Wirtinger's inequality, gives the general a priori estimate (Strang and Fix, 1973): for elements that contain complete polynomials of degree $p$, and a solution smooth enough,
$$
\|u - u_h\|_E \le C\,h^{p}, \qquad \|u - u_h\|_{L^2} \le C'\,h^{p+1},
$$ {#eq-apriori}
where the constants depend on the solution's derivatives and on element shape (they grow for badly distorted elements) but not on $h$. Linear elements ($p = 1$: CST, Q4, 4-node tetrahedra) give stresses that converge like $h$ and displacements like $h^2$; quadratic elements ($p = 2$: T6, Q8, 10-node tetrahedra) give $h^2$ and $h^3$. Pointwise values at special points often converge faster (**superconvergence**: we saw linear bar elements exact at the nodes and their stresses exact at element midpoints for uniform load).

::: example Measured rates in one dimension {#ex-rates}
For the bar with linearly increasing load of [[finite-element-method/weak-forms]] in dimensionless form ($EA = 1$, $L = 1$, $b = x$, exact $u = (x - x^3/3)/2$), compute the energy-norm and $L^2$ errors of the linear finite element solution with $n = 2, 4, 8, 16$ elements and the observed rates.
::: solution
Because the FE solution is the nodal interpolant, the errors can be computed by integrating $u - \mathcal{I}u$ element by element (8-point Gauss is exact here):

| $n$ | $\|e\|_E$ | rate | $\|e\|_{L^2}$ | rate |
|---|---|---|---|---|
| 2 | 0.08122 | — | 0.012778 | — |
| 4 | 0.04141 | 0.97 | 0.003269 | 1.97 |
| 8 | 0.02080 | 0.99 | 0.000822 | 1.99 |
| 16 | 0.01041 | 1.00 | 0.000206 | 2.00 |

The rate is $\log_2$ of the ratio of successive errors. Energy (stress) error: rate 1; displacement error: rate 2, as [[#eq-apriori]] predicts for $p = 1$.

*Check against [[#thm-rate]].* $u'' = -x$, $\|u''\|_{L^2} = 1/\sqrt3 = 0.5774$; for $n = 2$ the bound is $(0.5/\pi)(0.5774) = 0.0919 \ge 0.0812$, and for $n = 4$ it is $0.0459 \ge 0.0414$. The exact energy norm is $0.3651$, so the relative errors are $22\,\%$ with two elements and $2.9\,\%$ with sixteen — a lesson in how slowly linear elements converge in stress.
:::
:::

## Measuring convergence from a sequence of meshes

In practice the exact solution is unknown. But if the error behaves like $Ch^p$, three solutions on systematically refined meshes determine $C$, $p$ and the limit.

::: proposition Observed order and Richardson extrapolation {#prop-richardson}
Let $f_1, f_2, f_3$ be values of a quantity computed on meshes of size $h$, $h/r$ and $h/r^2$ (refinement ratio $r > 1$), and suppose $f(h) = f_\infty + Ch^p$ with higher-order terms negligible. Then
$$
p = \frac{\ln\left[(f_2 - f_1)/(f_3 - f_2)\right]}{\ln r}, \qquad f_\infty \approx f_3 + \frac{f_3 - f_2}{r^p - 1}.
$$ {#eq-richardson}
The **estimated error** of the finest solution is $\lvert f_\infty - f_3\rvert = \lvert f_3 - f_2\rvert/(r^p - 1)$.
:::

::: proof
$f_1 - f_2 = Ch^p(1 - r^{-p})$ and $f_2 - f_3 = Ch^pr^{-p}(1 - r^{-p})$, so $(f_2 - f_1)/(f_3 - f_2) = r^p$, which gives $p$. Then $f_3 - f_\infty = Ch^pr^{-2p}$ and $f_2 - f_3 = Ch^pr^{-2p}(r^p - 1)$, so $f_3 - f_\infty = (f_2 - f_3)/(r^p - 1)$, which rearranges to the stated $f_\infty$. The estimate is meaningful only in the **asymptotic range**, where the leading term dominates: the observed $p$ should be close to the theoretical value and the three results should change monotonically. Oscillating or erratic results mean the meshes are too coarse, or a singularity is present.
:::

::: example Extrapolating a cantilever deflection {#ex-richardson}
The Q4 cantilever of [[finite-element-method/plane-elements]] gave tip deflections $17.9053$, $19.5041$ and $19.9585\,\mathrm{mm}$ on meshes of $20 \times 2$, $40 \times 4$ and $80 \times 8$ square elements. Estimate the order of convergence, the converged deflection and the error of the finest mesh.
::: solution
With $r = 2$:
$$
p = \frac{\ln(1.5988/0.4544)}{\ln 2} = \frac{\ln 3.518}{0.6931} = 1.81, \qquad f_\infty = 19.9585 + \frac{0.4544}{2^{1.81} - 1} = 19.9585 + \frac{0.4544}{2.518} = 20.139\,\mathrm{mm}.
$$
Estimated error of the finest mesh: $0.180\,\mathrm{mm}$, i.e. $0.9\,\%$.

*Check.* The theoretical order for displacements of linear elements is 2; the observed 1.81 says the meshes are close to, but not fully in, the asymptotic range — the coarse mesh is still affected by shear locking. The extrapolated value lies within $0.1\,\%$ of the beam-theory estimate with shear correction ($20.16\,\mathrm{mm}$), the small difference being consistent with the fully fixed root edge of the FE model, which beam theory does not represent. Extrapolation turned a 1 % error into one of about 0.1 % at no cost.
:::
:::

::: widget plot
f: -x; -2*x; -0.5445*x; -a*x
x: 0, 3
y: -6, 0
sliders: a=1.5:0.2:4:0.1
labels: p = 1; p = 2; \lambda = 0.5445; \text{your rate } a
caption: Error against mesh size on logarithmic axes: the horizontal axis is $\log_{10}(1/h)$ (each unit is a tenfold refinement), the vertical axis $\log_{10}$ of the relative error. A rate $p$ is a straight line of slope $-p$. Linear elements in a smooth problem follow $p = 1$ in stress, quadratic elements $p = 2$; with a re-entrant corner both are dragged down to the singular rate $\lambda = 0.5445$. Use the slider to see how many decades of refinement your rate needs to gain a factor of 100 in accuracy.
:::

## When the rates fail: singularities and locking

### Singularities

The estimate [[#eq-apriori]] needs a smooth solution. Linear elasticity has non-smooth solutions wherever the geometry or loading has a sharp feature: a re-entrant corner, a crack, a point load, a point support, the edge of a bonded joint between dissimilar materials. Near a re-entrant corner of interior angle $\alpha > 180°$ the stresses vary as $r^{\lambda - 1}$, where $r$ is the distance from the corner and $\lambda < 1$ depends on the angle (M. L. Williams, 1952). For a $270°$ corner (an L-shaped bracket without a fillet) the dominant symmetric mode has $\lambda = 0.5445$, so stresses grow like $r^{-0.4555}$; for a crack ($360°$), $\lambda = 0.5$ and stresses grow like $r^{-1/2}$.

::: proposition Convergence near a singularity {#prop-singular}
If the exact solution has a singularity with exponent $\lambda < p$, uniform refinement gives an energy-norm error $O(h^{\lambda})$, whatever the element order $p$. The computed stress at the singular point does not converge: it grows like $h^{\lambda - 1}$ as the mesh is refined.
:::

::: proof
(Outline.) The interpolation error in the energy norm is dominated by the elements touching the singular point. A field behaving like $r^\lambda$ cannot be approximated by polynomials on an element of size $h$ at the corner better than $O(h^\lambda)$ in the energy norm, because the strain energy of the error in that element scales as $\int_0^h (r^{\lambda - 1})^2\,r\,dr \sim h^{2\lambda}$; elements away from the corner contribute the smooth rate $h^p$, which is smaller. For the stress at the corner, the element there sees an average of $r^{\lambda - 1}$ over a region of size $h$, which is of order $h^{\lambda - 1}$ and increases without limit as $h \to 0$.
:::

A peak stress at a sharp re-entrant corner is therefore not a property of the structure but of the mesh. The cure is to model the real geometry (every manufactured corner has a fillet radius, and with the fillet the stress is finite and converges), to use graded meshes towards a genuine singularity (which restore the optimal rate in the energy norm), or, for cracks, to compute a stress intensity factor rather than a stress.

::: widget interpolation
f: sqrt(x)
n: 7
nodes: equispaced
method: linear
x: 0, 1
caption: Piecewise-linear interpolation of $\sqrt{x}$, whose derivative $1/(2\sqrt{x})$ is infinite at $x = 0$ — a one-dimensional caricature of a stress singularity. Increase the number of points: the error away from the origin vanishes quickly, but the first interval always carries the largest error, and the slope of the first segment (the "stress" there) keeps growing. Uniform refinement wastes points where the function is smooth; a graded mesh would put them near the origin.
:::

### Locking

**Locking** is the opposite failure: the solution converges, but so slowly that practical meshes are useless, because the element cannot satisfy a constraint that the physics imposes without also suppressing legitimate deformation. Two kinds matter in solid mechanics.

- **Shear locking** in bending of thin members: the exact solution has (nearly) zero transverse shear strain; linear elements cannot bend without generating parasitic shear, as computed in [[finite-element-method/plane-elements]], and are far too stiff. The constant in [[#eq-apriori]] grows with the slenderness of the element.
- **Volumetric locking** for nearly incompressible materials (rubber, plastic flow of metals, saturated soils): as $\nu \to \tfrac12$ the bulk modulus $K = E/[3(1 - 2\nu)]$ becomes much larger than the shear modulus $G$, and the material resists any change of volume. Low-order elements have too few deformation modes that preserve volume at all integration points; enforcing $\varepsilon_v \approx 0$ everywhere freezes them. Displacements come out far too small and the pressure field shows checkerboard oscillations.

Remedies are reduced or selective integration (evaluating the constrained terms at fewer points), incompatible-mode and assumed-strain elements, mixed displacement–pressure (u/p) formulations, and quadratic elements, which lock far less. The decisive test is again a convergence study: a locking element shows very slow convergence from a too-stiff side.

::: warning A refined mesh can hide a wrong model
Convergence studies measure discretisation error only. A model that is converged to $0.1\,\%$ can be wrong by $50\,\%$ because the support is idealised as rigid, a weld is modelled as a sharp corner, the load is applied at a single node, or the material yields. Worse, refining a mesh around a singularity "converges" to an infinite stress. Before any refinement study ask whether the quantity you are converging exists in the mathematical model — a stress at a sharp corner or under a point load does not — and judge modelling error separately, by comparing with tests, with simpler models and with physical limits.
:::

## Stress recovery and error estimation

The displacements of a finite element model are its primary, best-converging output; stresses are derivatives and are worse — discontinuous between elements and least accurate at nodes, exactly where designers look. Practical codes therefore *recover* improved stresses.

**Sampling at Gauss points.** For many elements the stresses at the reduced (one order lower) Gauss points are more accurate than elsewhere — the **superconvergent** or optimal sampling points (Barlow, 1976). For the linear bar these are the element midpoints; for the Q8 element the $2 \times 2$ Gauss points.

**Nodal averaging.** Extrapolate stresses from the Gauss points to the nodes and average the contributions of all elements meeting at a node. This produces the smooth contour plots of commercial codes; it is simple, but at boundaries and material interfaces it can be poor, and averaging across a material interface or a sharp change of thickness is plainly wrong.

**Superconvergent patch recovery (SPR).** Zienkiewicz and Zhu (1992) fit, for each node, a polynomial of the same degree as the displacement field to the Gauss-point stresses of the patch of elements surrounding the node, by least squares, and evaluate the polynomial at the node. The recovered field $\boldsymbol{\sigma}^*$ is continuous and often converges one order faster than the raw stresses.

::: proposition The Zienkiewicz–Zhu error estimator {#prop-zz}
If $\boldsymbol{\sigma}^*$ is a recovered stress field that is significantly more accurate than the finite element stress $\boldsymbol{\sigma}_h$, the energy-norm error can be estimated element by element as
$$
\|e\|_{E,\text{est}}^2 = \sum_e \int_{V_e}(\boldsymbol{\sigma}^* - \boldsymbol{\sigma}_h)^{\mathsf T}\mathbf{D}^{-1}(\boldsymbol{\sigma}^* - \boldsymbol{\sigma}_h)\,dV,
$$
and the estimate is asymptotically exact as $h \to 0$ when $\boldsymbol{\sigma}^*$ superconverges.
:::

::: proof
(Sketch.) The exact error in energy is $\int(\boldsymbol{\sigma} - \boldsymbol{\sigma}_h)^{\mathsf T}\mathbf{D}^{-1}(\boldsymbol{\sigma} - \boldsymbol{\sigma}_h)\,dV$. Write $\boldsymbol{\sigma} - \boldsymbol{\sigma}_h = (\boldsymbol{\sigma}^* - \boldsymbol{\sigma}_h) + (\boldsymbol{\sigma} - \boldsymbol{\sigma}^*)$. By the triangle inequality in the energy norm, the true error differs from the estimate by at most $\|\boldsymbol{\sigma} - \boldsymbol{\sigma}^*\|$. If the recovered stress converges faster than the FE stress, $\|\boldsymbol{\sigma} - \boldsymbol{\sigma}^*\| = o(\|\boldsymbol{\sigma} - \boldsymbol{\sigma}_h\|)$, and the ratio of estimate to true error (the *effectivity index*) tends to 1.
:::

The element contributions of the estimator are the basis of **adaptive meshing**: elements whose estimated error exceeds their share of a target are subdivided (or the mesh is regenerated with a size field derived from the predicted rate), and the process is repeated until the global estimate meets the target. Three refinement strategies exist: **h-refinement** (smaller elements, same order), **p-refinement** (higher polynomial order on the same mesh) and **hp-refinement** (both, with small elements near singularities and high orders where the solution is smooth), which can achieve exponential convergence.

::: example Mesh size for a target accuracy {#ex-target}
A stress analysis of a fillet with linear elements gives a peak stress whose error, estimated by a refinement study, is $3.2\,\%$ with a local element size of $25\,\mathrm{mm}$; the observed rate for this quantity is $p = 2$. What element size is needed for $0.5\,\%$? What if the observed rate had been 1?
::: solution
With error $\propto h^p$: $h_\text{new} = h\,(\eta_\text{target}/\eta)^{1/p}$. For $p = 2$: $25 \times (0.5/3.2)^{1/2} = 25 \times 0.3953 = 9.9\,\mathrm{mm}$, so about $10\,\mathrm{mm}$. For $p = 1$: $25 \times 0.5/3.2 = 3.9\,\mathrm{mm}$.

*Check.* In two dimensions the number of elements in the refined region scales as $h^{-2}$: the $p = 2$ case needs about $6.4$ times as many elements there, the $p = 1$ case about $41$ times. The rate is worth more than any amount of computer power; that is why quadratic elements and well-placed refinement are the norm for stress concentrations.
:::
:::

## Mesh quality

Element shape enters the constant $C$ of [[#eq-apriori]]. The quantities reported by mesh generators are:
- **aspect ratio** (longest to shortest dimension): values up to about 3 are harmless in stress gradients; long thin elements are acceptable only where the gradient across their short side is large and along their long side small (boundary layers, through-thickness meshes);
- **skew and interior angles**: quadrilateral angles far from $90°$ (say outside $45°$–$135°$) and triangle angles near $0°$ or $180°$ degrade accuracy; an angle of $180°$ makes $\det\mathbf{J}$ zero;
- **Jacobian ratio** (minimum to maximum $\det\mathbf{J}$ in an element) and midside-node position for quadratic elements;
- **size transition**: neighbouring elements should not differ in size by more than a factor of about two.

These limits are rules of thumb, not theorems; they vary between codes and element types. The only reliable test of a mesh is a convergence study on the quantity of interest — mesh quality metrics only tell you where to look first. The loss of the Sleipner A platform in 1991 (see the course history) is the standard reminder: the global model's elements in the tricell walls were poorly shaped, the shear forces there were underestimated by about 45 %, and nobody checked the number by refining the mesh or by an independent hand calculation.

::: quiz
A designer refines the mesh at the sharp inside corner of an L-shaped plate three times. The peak stress reads 210, 285 and 390 MPa. What should be concluded?
- [ ] The stress has converged to about 400 MPa; use Richardson extrapolation to get the value.
- [x] The stress is singular at the sharp corner and will grow without limit; the corner must be modelled with its real fillet radius, or the stress evaluated away from the corner.
- [ ] The mesh is too coarse; one or two more refinements will show convergence.
- [ ] The element type is locking.
::: solution
The ratios $285/210 = 1.36$ and $390/285 = 1.37$ are almost constant — the signature of $h^{\lambda - 1}$ growth, here close to $2^{0.4555} = 1.37$ for a $270°$ corner refined by factors of two. Richardson extrapolation assumes the error *decreases*; applied here it is meaningless. The physical stress depends on the actual fillet radius, which must be included in the model.
:::
:::

::: history
Convergence of the finite element method was first argued from the energy principle by engineers in the early 1960s, and Bruce Irons introduced the patch test in the mid-1960s (it was set out with Bazeley, Cheung and Zienkiewicz in a 1965 conference paper on plate elements and analysed by Irons and Razzaque in 1972). Mathematicians then took the method over: Gilbert Strang and George Fix's *An Analysis of the Finite Element Method* (1973) proved the rates of [[#eq-apriori]] and explained when the patch test is and is not sufficient. Practical error estimation followed in 1987, when Olgierd Zienkiewicz and Jian Zhu proposed comparing finite element stresses with smoothed ones, and their superconvergent patch recovery of 1992 made the estimator reliable enough for automatic adaptive meshing, now standard in commercial codes. The hp-version, with exponential convergence, was developed from the early 1980s by Ivo Babuška, Barna Szabó and co-workers.
:::

::: summary
- Separate modelling, discretisation, quadrature and round-off error; refinement only reduces discretisation error.
- Convergence needs completeness (rigid motion and constant strain), compatibility or a passed patch test, and stability (no spurious modes).
- For smooth solutions and elements of degree $p$: energy (stress) error $O(h^p)$, displacement error $O(h^{p+1})$. In 1-D, linear elements satisfy $\|e\|_E \le (h/\pi)\sqrt{EA}\|u''\|$.
- From three systematically refined meshes, $p = \ln[(f_2 - f_1)/(f_3 - f_2)]/\ln r$ and $f_\infty \approx f_3 + (f_3 - f_2)/(r^p - 1)$, valid only in the asymptotic range.
- Singularities (sharp re-entrant corners, cracks, point loads) reduce the rate to $h^\lambda$ and make local stresses diverge; locking (shear, volumetric) makes convergence impractically slow from the stiff side.
- Recovered stresses (Gauss-point sampling, SPR) are better than raw ones, and their difference gives the Zienkiewicz–Zhu error estimate that drives adaptive h-, p- and hp-refinement.
- Mesh-quality metrics are warnings; a convergence study on the quantity of interest is the test.
:::

## Exercises

::: exercise Observed order from two errors {level=1 check="2"}
With the exact solution known, the error in a displacement is $0.080\,\mathrm{mm}$ on a mesh of size $h$ and $0.020\,\mathrm{mm}$ on a mesh of size $h/2$. What is the observed order of convergence? (Enter $p$.)
::: solution
$p = \log_2(0.080/0.020) = \log_2 4 = 2$.
:::
:::

::: exercise Two-mesh extrapolation {level=1 check="10.8"}
A deflection is $10.0\,\mathrm{mm}$ on a mesh of size $h$ and $10.6\,\mathrm{mm}$ on a mesh of size $h/2$. Assuming the theoretical order $p = 2$, estimate the converged value. (Enter it in mm.)
::: solution
$f_\infty = 10.6 + (10.6 - 10.0)/(2^2 - 1) = 10.6 + 0.2 = 10.8\,\mathrm{mm}$. With only two meshes the order must be assumed; a third mesh would check it.
:::
:::

::: exercise Halving the element size {level=1 check="4"}
For a smooth problem solved with quadratic elements, by what factor does the energy-norm error fall when the element size is halved? (Enter the factor.)
::: solution
$p = 2$ in the energy norm, so the factor is $2^2 = 4$ (and $2^3 = 8$ for the $L^2$ displacement error).
:::
:::

::: exercise Three-mesh study of a peak stress {level=2 check="202.45"}
A peak stress at a fillet is $182$, $197$ and $201\,\mathrm{MPa}$ on meshes refined by a factor of 2 each time. Find the observed order and the extrapolated stress. (Enter the extrapolated stress in MPa.)
::: solution
$p = \ln(15/4)/\ln 2 = 1.907$; $f_\infty = 201 + 4/(2^{1.907} - 1) = 201 + 4/2.750 = 202.45\,\mathrm{MPa}$. The finest mesh is about $0.7\,\%$ low. The monotonic sequence and an order close to 2 (quadratic elements at a smooth fillet) suggest the asymptotic range has been reached.
:::
:::

::: exercise Element size for a target stress error {level=2 check="1.667"}
Linear elements of size $10\,\mathrm{mm}$ give a $6\,\%$ error in a stress that converges at rate $p = 1$. What element size is needed for a $1\,\%$ error? (Enter it in mm.)
::: solution
$h = 10 \times (1/6)^{1/1} = 1.667\,\mathrm{mm}$. Switching to quadratic elements ($p = 2$) would need only about $10 \times (1/6)^{1/2} = 4.1\,\mathrm{mm}$, with far fewer elements.
:::
:::

::: exercise Growth of a singular stress {level=2 check="2^0.4555"}
At a sharp $270°$ re-entrant corner the stress field varies as $r^{\lambda - 1}$ with $\lambda = 0.5445$. By what factor does the computed corner stress increase each time the mesh there is refined by a factor of two? (Enter the factor.)
::: solution
The corner stress scales as $h^{\lambda - 1}$, so halving $h$ multiplies it by $2^{1 - \lambda} = 2^{0.4555} = 1.371$. This is the ratio seen in the quiz; a constant growth ratio is how a singularity announces itself.
:::
:::

::: exercise Volumetric locking in numbers {level=3 check="499.67"}
For a material with $\nu = 0.499$, compute the ratio of the bulk modulus to the shear modulus, $K/G$. Explain, with reference to the number of volume-preserving deformation modes available to a mesh of Q4 elements with full integration, why such a material locks. (Enter $K/G$.)
::: solution
$K/G = \dfrac{E/[3(1 - 2\nu)]}{E/[2(1 + \nu)]} = \dfrac{2(1 + \nu)}{3(1 - 2\nu)} = \dfrac{2.998}{0.006} = 499.67$. Any volume change costs about 500 times more energy than a shear of the same size, so the solution is effectively constrained to $\varepsilon_v = 0$ at every integration point. A mesh of $n \times n$ fully integrated Q4 elements has about $2n^2$ free DOFs but $4n^2$ volumetric constraints (one per Gauss point): there are more constraints than unknowns, and the only displacement field that satisfies them all is (nearly) zero. Selective reduced integration of the volumetric term (one constraint per element, $n^2$ in total) leaves about $n^2$ free modes, and mixed u/p formulations treat the pressure as a separate unknown.
:::
:::

::: exercise A priori estimate for the hanging rod {level=3}
For a vertical bar hanging under its own weight ($b$ constant, $EA$ constant, fixed at the top, free at the bottom), use [[#thm-rate]] to bound the energy-norm error of a mesh of $n$ equal linear elements, and compare with the exact error, which you can compute because the FE solution is the nodal interpolant. Show that the ratio of bound to actual error tends to a constant, and find it.
::: solution
$u'' = -b/EA$, so $\|u''\|_{L^2} = bL^{1/2}/EA$ and the bound is $\frac{L}{n\pi}\sqrt{EA}\,\frac{b\sqrt L}{EA} = \frac{bL^{3/2}}{n\pi\sqrt{EA}}$. On each element the interpolation error of a quadratic is $e = \frac{b}{2EA}(x - x_i)(x_{i+1} - x)$, with $e' = \frac{b}{2EA}(x_i + x_{i+1} - 2x)$, so $\int(e')^2dx = \frac{b^2}{4EA^2}\cdot\frac{h^3}{3}$ per element. Summing over $n$ elements of length $h = L/n$ and multiplying by $EA$: $\|e\|_E^2 = \frac{b^2}{12EA}\,nh^3 = \frac{b^2L^3}{12EA\,n^2}$, so $\|e\|_E = \frac{bL^{3/2}}{2\sqrt3\,n\sqrt{EA}}$. The ratio bound/actual is $2\sqrt3/\pi = 1.103$ for every $n$: the estimate is sharp to 10 %, and both decrease like $1/n$.
:::
:::

::: exercise Planning a mesh study {level=3}
You must report the maximum von Mises stress in a steel bracket with a $4\,\mathrm{mm}$ fillet and a bolt hole, modelled with 10-node tetrahedra in a commercial code. Write a short plan: which quantities you will monitor, how many meshes and with what refinement ratio, how you will treat the bolt-hole contact and the load application to avoid artificial singularities, what results would make you distrust the analysis, and what you will report.
::: solution
Monitor the peak stress at the fillet (the quantity of interest), the strain energy (global, smooth convergence) and a displacement. Use at least three meshes with a local refinement ratio of about 1.5–2 at the fillet, keeping element quality reasonable; quadratic tetrahedra should give monotonic convergence with an observed order near 2 for the fillet stress. Apply loads as distributed pressures or through a coupling over a realistic area, not at single nodes; model the bolt as contact or a distributed constraint over the hole surface, and ignore stresses within about one element of any remaining point constraint. Distrust signs: a peak located exactly at a constraint, load point or sharp edge; stress growing by a constant ratio on refinement; observed order far below expectation; large differences between averaged and unaveraged stresses at the peak; reactions that do not balance the loads. Report the finest-mesh value, the extrapolated value with the estimated discretisation error, the observed order, the mesh sizes, and the modelling assumptions — and state that the result informs, but does not replace, a check against the applicable design code.
:::
:::
