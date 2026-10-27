A CFD result is a number produced by a chain of choices: the governing equations and models, the geometry and its simplifications, the mesh, the boundary conditions, the discretisation schemes, the iterative convergence. Every link can introduce error, and the colourful contour plot at the end of the chain looks equally convincing whether the error is $1\,\%$ or $100\,\%$. This final lesson is about the links that are most directly under the analyst's control — the **mesh** and the **boundary conditions** — and about the discipline of **verification and validation** (V&V) that turns a CFD result into an engineering statement with an uncertainty attached.

The tools here are not optional extras for researchers. Design codes and regulators increasingly ask for documented mesh-convergence studies; the ASME V&V 20 standard prescribes how to compare simulation with experiment; and the most common causes of wrong CFD results in industry are a mesh that is too coarse where it matters, boundary conditions placed or chosen badly, and models used outside the range in which they were validated. The ideas build on everything before: truncation error and order of accuracy from [[computational-fluid-dynamics/finite-differences]], iterative convergence from [[computational-fluid-dynamics/linear-solvers]], and near-wall mesh requirements from [[computational-fluid-dynamics/turbulence-modelling]].

## Meshes

A mesh is a partition of the flow domain into cells. Its two main families have different strengths.

- **Structured meshes** have cells arranged in a regular $i, j, k$ index pattern, so that neighbours are found by arithmetic. Around complex geometry a single block is impossible, and the domain is divided into **multiblock** structured regions, often with H-, C- or O-shaped topologies around aerofoils, blades and cylinders. They give high accuracy per cell, cells aligned with the flow, and efficient solvers; they are laborious to generate for complex shapes.
- **Unstructured meshes** have cells of arbitrary connectivity: tetrahedra, hexahedra, prisms, pyramids or general polyhedra, with neighbour lists stored explicitly. Tetrahedral meshing is largely automatic (Delaunay triangulation and advancing-front methods), so complex geometry is meshed in hours rather than weeks. Near walls, layers of **prismatic** (or hexahedral) cells are extruded from the surface to resolve the boundary layer; **polyhedral** meshes, formed by agglomerating tetrahedra, have more neighbours per cell and are less sensitive to cell distortion. **Cut-cell** and **overset** (Chimera) meshes are further options for moving bodies and very complex shapes.

Whatever the type, the local truncation error of [[computational-fluid-dynamics/finite-differences#def-truncation]] depends not only on the cell size but on its shape and on how sizes change from one cell to the next.

::: definition Mesh quality measures {#def-mesh-quality}
- **Aspect ratio**: the ratio of the longest to the shortest dimension of a cell. Large aspect ratios ($10^2$–$10^3$) are harmless in boundary layers where gradients normal to the wall dominate, but harmful in regions where the flow has no preferred direction.
- **Expansion (growth) ratio**: the ratio of the sizes of adjacent cells. A sudden change of size introduces a first-order error term even into a nominally second-order scheme; keep it below about $1.2$–$1.3$.
- **Non-orthogonality**: the angle between the face normal $\mathbf{n}_f$ and the line $\mathbf{d}_{PN}$ joining the centres of the two cells sharing the face. It degrades the two-point gradient used for diffusion fluxes ([[computational-fluid-dynamics/finite-volume-diffusion]]); corrections are needed above about $10^\circ$–$20^\circ$, and most codes struggle above about $70^\circ$.
- **Skewness**: a measure of how far a cell departs from the ideal (equilateral or square) shape, or of how far the face centre lies from the point where $\mathbf{d}_{PN}$ crosses the face. It degrades face interpolation; highly skewed cells (equiangle skewness above about $0.9$) should be avoided.
:::

### Near-wall layers and stretching

Boundary layers need fine cells normal to the wall, but only there. The standard device is **geometric stretching**: the first cell has height $h_1$ (set from the $y^+$ estimate of [[computational-fluid-dynamics/turbulence-modelling#alg-wall-mesh]]) and each subsequent layer is larger by a constant ratio $q$.

::: proposition Thickness of a geometrically stretched layer {#prop-stretching}
If the first cell has height $h_1$ and each layer is $q > 1$ times thicker than the one below, $n$ layers have total thickness and last-layer height
$$
T_n = h_1\frac{q^n - 1}{q - 1},\qquad h_n = h_1q^{n-1},
$$ {#eq-stretching}
and the number of layers needed to reach a thickness $T$ is $n = \left\lceil\ln\!\left(1 + T(q-1)/h_1\right)/\ln q\right\rceil$.
:::

::: proof
The layer heights $h_1, h_1q, \dots, h_1q^{n-1}$ form a geometric series with sum $h_1(1 + q + \dots + q^{n-1}) = h_1(q^n - 1)/(q - 1)$. Setting $T_n \ge T$ and solving, $q^n \ge 1 + T(q - 1)/h_1$; taking logarithms (with $\ln q > 0$) gives the stated bound, rounded up to a whole number of layers.
:::

::: example Prism layers for a wall-resolved boundary layer {#ex-prism-layers}
A wall-resolved SST calculation needs a first cell of height $h_1 = 10\ \mu\mathrm{m}$ on a surface where the boundary layer is $5.0\ \mathrm{mm}$ thick. With growth ratio $q = 1.2$, how many prism layers cover the boundary layer, and how large is the last layer?
::: solution
$n \ge \ln(1 + 5.0\times10^{-3} \times 0.2/10^{-5})/\ln 1.2 = \ln 101/\ln 1.2 = 4.615/0.1823 = 25.3$, so $26$ layers, with total thickness $10^{-5}(1.2^{26} - 1)/0.2 = 5.67\ \mathrm{mm}$. The last layer is $h_{26} = 10^{-5} \times 1.2^{25} = 0.95\ \mathrm{mm}$. Sanity check: the outer prism layer should be similar in size to the adjacent core-mesh cells (here about $1\ \mathrm{mm}$) so that the expansion ratio at the junction stays near $q$; if the core cells were $5\ \mathrm{mm}$, the jump from $0.95$ to $5\ \mathrm{mm}$ would be a poor transition and more layers or a larger $q$ would be needed.
:::
:::

::: widget plot
f: 0.01*(q^x - 1)/(q - 1)
x: 0, 45
y: 0, 10
sliders: q=1.2:1.05:1.4:0.01
hlines: 5
caption: Total thickness in mm of a stretched wall layer against the number of layers $n$, for a first cell of $10\ \mu\mathrm{m}$, with the growth ratio $q$ on the slider; the horizontal line is a $5\ \mathrm{mm}$ boundary layer. At $q = 1.2$ the curve crosses it at about $25$ layers. At $q = 1.1$ it needs about $42$ — accurate but expensive; at $q = 1.4$ only about $16$, but the jump between successive cells now costs accuracy. Geometric growth means that most of the layers sit very close to the wall, where the gradients are.
:::

## Boundary conditions

The boundaries of a CFD domain are of two kinds: physical surfaces (walls) and artificial cuts through the fluid (inlets, outlets, far fields, symmetry planes). Their conditions must be consistent with the mathematical type of the equations ([[computational-fluid-dynamics/governing-equations]]): the right number of quantities on each boundary, specified where information enters.

| boundary | typical specification | cautions |
|---|---|---|
| **velocity inlet** | velocity vector (profile if known), temperature, turbulence quantities | a uniform profile needs a development length; for compressible flow it fixes mass flow and can over-specify |
| **mass-flow or total-pressure inlet** | mass flow rate, or total pressure and flow direction; total temperature | total pressure suits subsonic compressible inlets from a plenum |
| **pressure outlet** | static pressure (the other variables extrapolated from inside) | place it where the flow is nearly uniform and leaving; recirculation through an outlet makes the problem ill-posed |
| **wall** | no slip ($\mathbf{u} = \mathbf{u}_{\text{wall}}$); temperature, heat flux or convective condition; roughness | near-wall mesh must match the wall treatment |
| **symmetry** | zero normal velocity and zero normal gradients of everything else | only if the flow (not just the geometry) is symmetric; shedding wakes are not |
| **periodic** | values on one face equal those on a matched face (with rotation or a pressure jump if needed) | for repeating geometry: blade rows, heat-exchanger channels |
| **far field** | free-stream conditions, preferably with characteristic (non-reflecting) treatment | must be far away for elliptic subsonic flows (tens of chords for aerofoils) |

Two rules prevent most problems. First, put artificial boundaries where you *know* what the flow does — well upstream of an obstacle, and downstream where any wake has had room to develop (a common guideline is at least $5$–$10$ characteristic lengths downstream of a bluff body, more for accurate wakes) — and check by moving them: if a result changes when the outlet is moved, the outlet was too close. Second, never impose more information than the physics allows: specifying both velocity and pressure at an incompressible inlet, or fixing a velocity at a subsonic compressible outlet, over-determines the problem and produces reflections or no convergence.

::: warning A domain that ends in a recirculation zone
If an outlet boundary cuts through a separated region, fluid re-enters the domain through it. The code must then invent inflow values for temperature, turbulence and species at that boundary — usually its "backflow" settings, which nobody chose carefully — and the converged result depends on them. Warnings about reversed flow at an outlet are not cosmetic: extend the domain until the outlet flow leaves everywhere, or move the outlet to a place where the flow is known.
:::

## Verification and validation

Two different questions must be answered before a CFD prediction is trusted. Roache summarised them as "solving the equations right" and "solving the right equations".

::: definition Verification and validation {#def-vv}
- **Verification** asks whether the equations of the chosen model are being solved correctly and accurately. It has two parts: **code verification**, which checks that the software implements the intended discretisation without mistakes and achieves its theoretical order of accuracy; and **solution verification**, which estimates the numerical error (discretisation, iterative and round-off) of a particular calculation.
- **Validation** asks whether the model — equations, turbulence model, boundary conditions, properties — represents the real physical system accurately enough for the intended use. It is done by comparison with experimental data and quantifies the **model error** within the stated uncertainties.

Verification is a mathematical activity; validation is a physical one. Verification must come first: comparing an unconverged or under-resolved solution with experiment says nothing about the model.
:::

### Code verification: manufactured solutions

The cleanest code-verification test is the **method of manufactured solutions** (MMS). Instead of searching for a problem with a known exact solution, one *chooses* a smooth solution, substitutes it into the governing equations, and adds whatever source term is needed to make it exact.

::: algorithm Method of manufactured solutions {#alg-mms}
1. Choose a smooth analytic field $\phi_m(\mathbf{x}, t)$ that exercises every term of the equations (non-zero derivatives of all orders involved, non-trivial in all directions).
2. Apply the continuous operator to it: $S_m = \mathcal{L}(\phi_m)$, where the equation is $\mathcal{L}(\phi) = 0$. Then $\phi_m$ exactly solves $\mathcal{L}(\phi) = S_m$.
3. Run the code with the extra source $S_m$ and boundary conditions taken from $\phi_m$, on a sequence of systematically refined meshes.
4. Compute the error norm $\lVert\phi_h - \phi_m\rVert$ on each mesh and the observed order of accuracy from successive meshes; it must approach the formal order of the scheme.
:::

::: example A manufactured source for convection–diffusion {#ex-mms}
For steady 1D convection–diffusion $\dfrac{\mathrm{d}(\rho u\phi)}{\mathrm{d}x} - \dfrac{\mathrm{d}}{\mathrm{d}x}\!\left(\Gamma\dfrac{\mathrm{d}\phi}{\mathrm{d}x}\right) = S$ with constant $\rho u = 1.0\ \mathrm{kg\,m^{-2}\,s^{-1}}$ and $\Gamma = 0.10\ \mathrm{kg\,m^{-1}\,s^{-1}}$ on $0 \le x \le 1\ \mathrm{m}$, manufacture the solution $\phi_m = \sin(\pi x)$. Find the source term and its value at $x = 0.25\ \mathrm{m}$, and state the boundary conditions.
::: solution
$\mathrm{d}\phi_m/\mathrm{d}x = \pi\cos(\pi x)$ and $\mathrm{d}^2\phi_m/\mathrm{d}x^2 = -\pi^2\sin(\pi x)$, so
$$
S_m = \rho u\,\pi\cos(\pi x) + \Gamma\pi^2\sin(\pi x) = \pi\cos(\pi x) + 0.1\pi^2\sin(\pi x).
$$
At $x = 0.25$: $S_m = \pi(0.7071) + 0.9870(0.7071) = 2.221 + 0.698 = 2.919$ (in $\mathrm{kg\,m^{-3}\,s^{-1}}$ times the units of $\phi$). Boundary conditions: $\phi(0) = \phi(1) = 0$. A second-order code run on $20$, $40$ and $80$ cells must show the error falling by a factor approaching $4$ per refinement. Sanity check: both terms of the operator are exercised (convection through the cosine, diffusion through the sine), so an error in either would show up as a wrong order.
:::
:::

### Solution verification: grid convergence

For a real problem the exact solution is unknown, but its *behaviour* under refinement is known: for a scheme of order $p$ in the asymptotic range, the discretisation error of any quantity $f$ is approximately $Ch^p$, where $h$ is a representative cell size. Three results on systematically refined meshes are enough to estimate $p$, the extrapolated value and the error.

::: proposition Observed order and Richardson extrapolation {#prop-richardson}
Let $f_1$, $f_2$, $f_3$ be the values of a quantity on fine, medium and coarse meshes with cell sizes $h_1 < h_2 = rh_1 < h_3 = r^2h_1$ (constant refinement ratio $r > 1$), and suppose $f_i = f_0 + Ch_i^p$ exactly. Then
$$
p = \frac{\ln\!\left[(f_3 - f_2)/(f_2 - f_1)\right]}{\ln r},\qquad
f_0 = f_1 + \frac{f_1 - f_2}{r^p - 1}.
$$ {#eq-richardson}
:::

::: proof
Subtracting, $f_2 - f_1 = Ch_1^p(r^p - 1)$ and $f_3 - f_2 = Ch_1^p r^p(r^p - 1)$. Their ratio is $r^p$, which gives $p$. From the first difference, $Ch_1^p = (f_2 - f_1)/(r^p - 1)$, and $f_0 = f_1 - Ch_1^p$ gives the extrapolated value. The assumption $f_i = f_0 + Ch_i^p$ holds only approximately and only for $h$ small enough that the leading error term dominates — the **asymptotic range**. The procedure requires the three differences to have the same sign (**monotone convergence**); oscillatory convergence makes the logarithm undefined and signals that the meshes are not in the asymptotic range.
:::

Richardson extrapolation estimates the error, but the extrapolated value itself is less reliable than its derivation suggests, because $p$ estimated from noisy data can be far from the formal order. Roache's **grid convergence index** (GCI) converts the estimate into a conservative uncertainty band.

::: definition Grid convergence index {#def-gci}
With the relative change $\varepsilon_{12} = (f_2 - f_1)/f_1$ between the two finest meshes, the fine-grid GCI is
$$
\mathrm{GCI}_{12} = \frac{F_s\,\lvert\varepsilon_{12}\rvert}{r^p - 1},
$$ {#eq-gci}
where $F_s$ is a **factor of safety**: $1.25$ when $p$ is observed from three or more meshes, $3$ when only two meshes are available and the formal order is assumed. The GCI is an estimate of the relative discretisation uncertainty of $f_1$ at roughly $95\,\%$ confidence. The meshes are in the asymptotic range if $\mathrm{GCI}_{23}/(r^p\,\mathrm{GCI}_{12}) \approx 1$.
:::

For unstructured meshes, which cannot be refined by exactly halving cells, a representative cell size $h = (V/N)^{1/3}$ (in 3D, for total volume $V$ and $N$ cells) defines an effective refinement ratio $r = (N_1/N_2)^{1/3}$. Roache recommends $r \ge 1.3$ so that the differences between meshes exceed the iterative and round-off noise.

::: example A three-grid study of a drag coefficient {#ex-gci}
A drag coefficient is computed on three meshes refined by $r = 1.5$ in each direction (about $4.0\times10^{6}$, $1.19\times10^{6}$ and $3.5\times10^{5}$ cells): $C_{D,1} = 0.3120$ (fine), $C_{D,2} = 0.3165$, $C_{D,3} = 0.3266$ (coarse). The iterative error is negligible. Find the observed order, the extrapolated value, the fine-grid GCI, and check the asymptotic range. (The values are illustrative.)
::: solution
The differences are $f_3 - f_2 = 0.0101$ and $f_2 - f_1 = 0.0045$, both positive: monotone convergence.
$$
p = \frac{\ln(0.0101/0.0045)}{\ln 1.5} = \frac{0.8085}{0.4055} = 1.99,\qquad r^p = 2.244,
$$
close to the formal second order. Extrapolated: $C_{D,0} = 0.3120 + (0.3120 - 0.3165)/(2.244 - 1) = 0.3120 - 0.0036 = 0.3084$. With $\lvert\varepsilon_{12}\rvert = 0.0045/0.3120 = 0.0144$,
$$
\mathrm{GCI}_{12} = \frac{1.25 \times 0.0144}{1.244} = 0.0145 = 1.45\,\%,
$$
i.e. $C_D = 0.3120 \pm 0.0045$ from discretisation. Similarly $\lvert\varepsilon_{23}\rvert = 0.0101/0.3165 = 0.0319$ and $\mathrm{GCI}_{23} = 3.21\,\%$; the ratio $\mathrm{GCI}_{23}/(r^p\,\mathrm{GCI}_{12}) = 0.0321/(2.244 \times 0.0145) = 0.99$, so the meshes are in the asymptotic range. Sanity check: the fine-mesh error estimate ($0.0036$) is a little under the GCI band ($0.0045$), as the safety factor intends, and the fine result lies between the extrapolated value and the coarser results.
:::
:::

::: widget plot
f: f0 + C*x^p
x: 0, 2.5
y: 0.30, 0.34
sliders: p=2:0.5:3:0.05; C=0.0036:0:0.01:0.0001; f0=0.3084:0.30:0.32:0.0001
points: 1, 0.3120; 1.5, 0.3165; 2.25, 0.3266
caption: The three drag coefficients of the example plotted against relative cell size $h/h_1$ (fine $= 1$, medium $= 1.5$, coarse $= 2.25$), with the model $f = f_0 + Ch^p$. The sliders start near the fitted values ($p = 2$, $C = 0.0036$, $f_0 = 0.3084$; the fit gives $p = 1.99$): the curve passes through all three points, and its intercept at $h = 0$ is the Richardson-extrapolated value. Change $p$ to $1$ and try to refit — no choice of $C$ and $f_0$ passes through all three points: the data themselves determine the order. A quantity whose three points cannot be fitted by any monotone curve is not in the asymptotic range.
:::

### Iterative and other numerical errors

Discretisation is not the only numerical error. The **iterative error** must be made much smaller than the discretisation error before a grid study means anything — by monitoring the quantities themselves, as in [[computational-fluid-dynamics/linear-solvers#prop-error-estimate]], not only the residuals. For unsteady problems, the **time-step error** is estimated in the same way as the grid error, by systematic refinement of $\Delta t$, and periodic or statistically stationary quantities must be averaged over long enough to make the **sampling error** small. Round-off error is normally negligible in double precision, but can matter in single precision or with very large differences in cell size.

## Validation

Validation compares a verified simulation with experimental data, accounting for the uncertainties of both. The ASME V&V 20 standard formalises the comparison for a scalar quantity.

::: proposition The validation comparison of ASME V&V 20 {#prop-vv20}
Let $S$ be the simulation result, $D$ the experimental value and $T$ the (unknown) true value. Define the **comparison error** $E = S - D$. Writing $S = T + \delta_{\text{model}} + \delta_{\text{num}} + \delta_{\text{input}}$ and $D = T + \delta_D$,
$$
E = \delta_{\text{model}} + \delta_{\text{num}} + \delta_{\text{input}} - \delta_D ,
$$
so the model error satisfies $\delta_{\text{model}} = E - (\delta_{\text{num}} + \delta_{\text{input}} - \delta_D)$. If the three error sources are independent with standard uncertainties $u_{\text{num}}$, $u_{\text{input}}$ and $u_D$, the **validation uncertainty** is
$$
u_{\text{val}} = \sqrt{u_{\text{num}}^2 + u_{\text{input}}^2 + u_D^2},
$$ {#eq-uval}
and $\delta_{\text{model}}$ lies in the interval $E \pm k\,u_{\text{val}}$ with a coverage factor $k$ chosen for the desired confidence.
:::

::: proof
The expression for $E$ follows by subtraction: $T$ cancels. The uncertainty of a sum of independent random errors is the root-sum-square of their standard uncertainties (the law of propagation of uncertainty for a linear combination with coefficients $\pm1$), which gives [[#eq-uval]]. The sign of $\delta_D$ does not matter for the variance. Independence is an assumption: if, for example, the same measured inlet profile enters both $S$ and $D$, the errors are correlated and covariance terms must be added.
:::

Interpretation follows directly. If $\lvert E\rvert \gg u_{\text{val}}$, the model error is approximately $E$, and the model needs improvement (or a correction) for this use. If $\lvert E\rvert \lesssim u_{\text{val}}$, the model error is within the "noise" of the validation exercise — one cannot do better without reducing $u_{\text{val}}$, by better experiments, better-known inputs or finer meshes. Validation is always specific: a model validated for the pressure drop of attached pipe flow is not thereby validated for heat transfer in a separated diffuser.

::: example Validating a pressure-drop prediction {#ex-validation}
A CFD model of a valve predicts a pressure drop $S = 1250\ \mathrm{Pa}$; a test gives $D = 1200\ \mathrm{Pa}$ with standard uncertainty $u_D = 30\ \mathrm{Pa}$. A grid study gives $u_{\text{num}} = 20\ \mathrm{Pa}$, and uncertainty in the inlet flow rate and roughness propagated through the model gives $u_{\text{input}} = 25\ \mathrm{Pa}$. What can be said about the model error?
::: solution
$E = 1250 - 1200 = 50\ \mathrm{Pa}$ and $u_{\text{val}} = \sqrt{20^2 + 25^2 + 30^2} = \sqrt{1925} = 43.9\ \mathrm{Pa}$. With $k = 2$ (roughly $95\,\%$ coverage), $\delta_{\text{model}} \in 50 \pm 88\ \mathrm{Pa}$, i.e. between $-38$ and $+138\ \mathrm{Pa}$. The comparison error is about one validation uncertainty: there is no clear evidence of model error, but the model could be off by up to about $11\,\%$ of the pressure drop. To tighten the statement, the largest contribution ($u_D$, the experiment) must be reduced first. Sanity check: the relative uncertainties ($2.5\,\%$ for the experiment, $1.6\,\%$ numerical) are typical of careful work; claims of agreement "within $1\,\%$" without such a budget are not meaningful.
:::
:::

::: algorithm A minimal V&V workflow for an engineering CFD study {#alg-vv-workflow}
1. **Define** the quantities of interest and the accuracy needed for the decision they support.
2. **Code verification:** use a code with documented verification (MMS or exact-solution tests) for the models used; for in-house code, run MMS.
3. **Iterative convergence:** converge until the quantities of interest change by much less than the target accuracy.
4. **Grid (and time-step) convergence:** three systematically refined meshes, observed order, Richardson estimate, GCI; check the asymptotic range; report $u_{\text{num}}$.
5. **Input uncertainty:** vary uncertain inputs (inlet conditions, properties, roughness, geometry tolerances) and propagate.
6. **Validation:** compare with experiments for the same or a closely similar configuration; compute $E$ and $u_{\text{val}}$.
7. **Report** the result with its uncertainty and the range of conditions for which the validation applies.
:::

::: quiz
On three meshes ($r = 2$) a computed heat-transfer coefficient is $152$, $148$ and $151\ \mathrm{W\,m^{-2}\,K^{-1}}$ (fine to coarse). What should you conclude?
- [ ] The observed order is $\ln(3/4)/\ln 2$, and Richardson extrapolation gives the exact value.
- [x] Convergence is oscillatory: the meshes are not in the asymptotic range (or the iterative error is too large), so Richardson extrapolation and the GCI cannot be applied; refine further and check iterative convergence.
- [ ] The fine-mesh value is converged because the three values differ by less than $3\,\%$.
- [ ] The model is validated.
::: solution
$f_3 - f_2 = 151 - 148 = +3$ but $f_2 - f_1 = 148 - 152 = -4$: the differences change sign, so the ratio in [[#eq-richardson]] is negative and its logarithm undefined. Small differences between meshes are not evidence of convergence when they oscillate. Validation is a separate question and needs experimental data.
:::
:::

::: history
Lewis Fry Richardson proposed in 1911 that results on two grids could be combined to cancel the leading error term, and with J. Arthur Gaunt developed the idea as "the deferred approach to the limit" in 1927 (*Philosophical Transactions of the Royal Society A*). Elliptic grid generation for body-fitted structured meshes was introduced by Joe F. Thompson, Frank C. Thames and C. Wayne Mastin in 1974 (*Journal of Computational Physics*). Patrick Roache proposed the grid convergence index in 1994 ("Perspective: a method for uniform reporting of grid refinement studies", *Journal of Fluids Engineering*), and his 1998 book set out the verification framework used here; the method of manufactured solutions was advocated by Roache and Stanly Steinberg in 1984. The AIAA *Guide for the Verification and Validation of Computational Fluid Dynamics Simulations* (G-077) appeared in 1998, the ASME *Standard for Verification and Validation in Computational Fluid Dynamics and Heat Transfer* (V&V 20) in 2009, and the *Journal of Fluids Engineering* published a widely used step-by-step procedure for estimating discretisation uncertainty by I. B. Celik and co-authors in 2008.
:::

::: summary
- Structured meshes give accuracy and efficiency per cell; unstructured meshes give automation for complex geometry; prism layers resolve walls.
- Watch aspect ratio (fine in boundary layers), expansion ratio ($\lesssim 1.2$), non-orthogonality and skewness.
- A stretched layer of $n$ cells has thickness $h_1(q^n - 1)/(q - 1)$; match the outer layer to the core mesh.
- Boundary conditions must match the equation type: specify only what enters, place artificial boundaries where the flow is known, avoid backflow at outlets.
- Verification (solving the equations right) precedes validation (solving the right equations); MMS verifies codes, grid studies verify solutions.
- Three meshes give the observed order $p = \ln[(f_3 - f_2)/(f_2 - f_1)]/\ln r$, the Richardson estimate and the GCI $= F_s\lvert\varepsilon_{12}\rvert/(r^p - 1)$; oscillatory convergence means the asymptotic range has not been reached.
- Validation compares $E = S - D$ with $u_{\text{val}} = \sqrt{u_{\text{num}}^2 + u_{\text{input}}^2 + u_D^2}$; model error lies in $E \pm k\,u_{\text{val}}$ and is specific to the validated use.
:::

## Exercises

::: exercise Observed order of accuracy {level=1 check="1.585"}
Three meshes with $r = 2$ give $f_1 = 1.000$, $f_2 = 1.004$ and $f_3 = 1.016$ (fine to coarse). Compute the observed order. (Enter $p$ to three decimal places.)
::: solution
$p = \ln[(1.016 - 1.004)/(1.004 - 1.000)]/\ln 2 = \ln 3/\ln 2 = 1.585$. A non-integer observed order between $1$ and $2$ is common when a nominally second-order scheme switches locally to first order (limiters, wall functions, mesh irregularity).
:::
:::

::: exercise Richardson extrapolation {level=1 check="0.9827"}
A second-order scheme ($p = 2$) gives $f_1 = 0.9800$ on a fine mesh and $f_2 = 0.9720$ on a mesh twice as coarse. Estimate the exact value. (Enter it to four decimal places.)
::: solution
$f_0 = f_1 + (f_1 - f_2)/(r^p - 1) = 0.9800 + 0.0080/3 = 0.98267$, i.e. $0.9827$.
:::
:::

::: exercise A two-grid GCI {level=1 check="0.34"}
For the data of the previous exercise, compute the fine-grid GCI with $p = 2$ and $F_s = 1.25$, and then with the two-grid safety factor $F_s = 3$. (Enter the GCI with $F_s = 1.25$, in per cent, to two decimal places.)
::: solution
$\lvert\varepsilon_{12}\rvert = 0.0080/0.9800 = 0.00816$; $\mathrm{GCI} = 1.25 \times 0.00816/(4 - 1) = 0.00340 = 0.34\,\%$. With the two-grid safety factor $F_s = 3$ it would be $0.82\,\%$ — the price of not knowing the observed order.
:::
:::

::: exercise Number of prism layers {level=2 check="31"}
A first cell of $20\ \mu\mathrm{m}$ and growth ratio $1.15$ must cover a $10\ \mathrm{mm}$ boundary layer. How many layers are needed? (Enter the whole number of layers.)
::: solution
$n \ge \ln(1 + 0.010 \times 0.15/2\times10^{-5})/\ln 1.15 = \ln 76/\ln 1.15 = 4.331/0.1398 = 30.99$, so $31$ layers. The last layer is $2\times10^{-5} \times 1.15^{30} = 1.3\ \mathrm{mm}$.
:::
:::

::: exercise Effective refinement ratio {level=2 check="1.494"}
Two unstructured 3D meshes of the same domain have $1.0\times10^{6}$ and $3.0\times10^{5}$ cells. Compute the effective refinement ratio. (Enter $r$ to three decimal places.)
::: solution
$r = (N_1/N_2)^{1/3} = (10/3)^{1/3} = 1.494$, above Roache's recommended minimum of $1.3$.
:::
:::

::: exercise Non-orthogonality {level=2 check="11.31"}
In a 2D mesh the vector between the centres of two cells sharing a face is $\mathbf{d} = (1.0, 0.20)$ (in units of a cell size), and the face normal is $\mathbf{n} = (1, 0)$. Compute the non-orthogonality angle. (Enter it in degrees to two decimal places.)
::: solution
$\cos\alpha = \mathbf{d}\cdot\mathbf{n}/\lvert\mathbf{d}\rvert = 1.0/\sqrt{1.04} = 0.9806$, so $\alpha = 11.31^\circ$ (equivalently $\arctan 0.2$). Moderate: a non-orthogonal correction to the diffusion flux is advisable.
:::
:::

::: exercise A validation uncertainty {level=2 check="43.87"}
Compute $u_{\text{val}}$ for $u_{\text{num}} = 20\ \mathrm{Pa}$, $u_{\text{input}} = 25\ \mathrm{Pa}$ and $u_D = 30\ \mathrm{Pa}$. (Enter $u_{\text{val}}$ in Pa to two decimal places.)
::: solution
$u_{\text{val}} = \sqrt{400 + 625 + 900} = \sqrt{1925} = 43.87\ \mathrm{Pa}$. Note that the largest component dominates: halving $u_{\text{num}}$ alone would only reduce $u_{\text{val}}$ to $40.31\ \mathrm{Pa}$.
:::
:::

::: exercise Manufactured solution in two dimensions {level=3}
For steady 2D incompressible momentum and continuity with constant $\rho$ and $\nu$, propose a manufactured velocity field that satisfies continuity exactly, and derive the source term required in the $x$-momentum equation if the manufactured pressure is $p_m = \cos x\cos y$ (with $\rho = 1$). Explain why the manufactured velocity should satisfy continuity exactly.
::: solution
Take a stream function, e.g. $\psi = \sin x\sin y$, giving $u = \partial\psi/\partial y = \sin x\cos y$ and $v = -\partial\psi/\partial x = -\cos x\sin y$, divergence-free by construction. The $x$-momentum source is $S_x = u\,\partial_xu + v\,\partial_yu + \partial_xp - \nu\nabla^2u$. Here $\partial_xu = \cos x\cos y$, $\partial_yu = -\sin x\sin y$, so $u\partial_xu + v\partial_yu = \sin x\cos x\cos^2y + \cos x\sin x\sin^2y = \sin x\cos x$; $\partial_xp = -\sin x\cos y$; $\nabla^2u = -2\sin x\cos y$. Hence $S_x = \sin x\cos x - \sin x\cos y + 2\nu\sin x\cos y$. If the manufactured velocity did not satisfy continuity, the continuity equation would need a mass source; many pressure-based codes cannot accept one, and the pressure–velocity algorithm would then be tested under conditions it never meets in practice.
:::
:::

::: exercise Planning V&V for a design decision {level=3}
A CFD study must decide whether a redesigned heat-exchanger inlet header reduces the maldistribution of flow among $40$ tubes enough to meet a requirement that no tube carries more than $110\,\%$ of the mean flow. Plan the verification and validation: which quantities to monitor, how many meshes and how refined, how to handle turbulence-model uncertainty, what experimental data you would seek, and how you would state the conclusion.
::: solution
A good plan: the quantity of interest is the maximum tube flow ratio (and the full distribution). Converge iteratively until it changes by less than $0.1\,\%$. Use at least three meshes with $r \ge 1.3$ (refining the header, the tube entries and the wall layers consistently), compute $p$, the extrapolated ratio and the GCI for the maximum ratio and a few individual tubes; check the asymptotic range. Assess model-form uncertainty by repeating with a second turbulence model (e.g. $k$–$\varepsilon$ and SST) and with inlet-profile variations; propagate inlet flow-rate and geometry tolerances. For validation, seek tube-by-tube flow measurements on the existing header (or a scaled rig), validate the baseline, and compute $E$ and $u_{\text{val}}$. State the conclusion as, for example, "maximum tube flow $106\,\% \pm 2\,\%$ (numerical) with model error bounded by $\pm 3\,\%$ from validation of the baseline design; the requirement is met with margin", and note that the validation applies to the Reynolds-number range tested.
:::
:::
