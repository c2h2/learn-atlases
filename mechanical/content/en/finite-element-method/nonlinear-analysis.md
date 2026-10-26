Every analysis in this course so far has been linear: stiffness independent of displacement, so that doubling the load doubles every response and a single solution of $\mathbf{K}\mathbf{d} = \mathbf{F}$ is the whole job. Real components leave that comfortable world in three ways. Their **material** yields, creeps or is rubbery ([[solid-mechanics/plasticity]]); their **geometry** changes enough that equilibrium must be written in the deformed shape — a slender column that buckles, a shallow arch that snaps through, a cable that stiffens as it stretches; and their **boundary conditions** change as parts come into or out of contact. All three make the internal forces a nonlinear function of the displacements, and the equations must be solved iteratively. This chapter develops the standard machinery — Newton–Raphson iteration within load increments — on problems small enough to follow every number, shows how it fails at limit points and what to do about it, and then turns to the other half of the chapter title: the practice of building, checking, verifying and validating finite element models, linear or not, so that their results can be trusted.

## Nonlinear equilibrium

::: definition Residual and tangent stiffness {#def-residual}
For a discretised structure with nodal displacements $\mathbf{d}$, let $\mathbf{F}_\text{int}(\mathbf{d})$ be the vector of **internal forces** — the nodal forces that the deformed, stressed elements exert, assembled from $\int\mathbf{B}^{\mathsf T}\boldsymbol\sigma\,dV$ — and $\mathbf{F}_\text{ext} = \lambda\mathbf{F}_0$ the external loads, scaled by a **load factor** $\lambda$. Equilibrium is the vanishing of the **residual**
$$
\mathbf{r}(\mathbf{d}, \lambda) = \lambda\mathbf{F}_0 - \mathbf{F}_\text{int}(\mathbf{d}) = \mathbf{0}.
$$ {#eq-residual}
The **tangent stiffness** is the Jacobian $\mathbf{K}_T(\mathbf{d}) = \partial\mathbf{F}_\text{int}/\partial\mathbf{d}$. In a linear problem $\mathbf{F}_\text{int} = \mathbf{K}\mathbf{d}$ and $\mathbf{K}_T = \mathbf{K}$.
:::

Writing the problem as "internal forces balance external forces" rather than "$\mathbf{K}\mathbf{d} = \mathbf{F}$" is the key change of viewpoint. Internal forces can always be *evaluated* for a given displacement — loop over elements, compute strains from the current geometry, stresses from the material law, and assemble — even when no stiffness matrix exists in the linear sense. The question is how to find the displacement that makes the residual vanish.

## Newton–Raphson iteration

Expand the residual about the current estimate $\mathbf{d}_i$: $\mathbf{r}(\mathbf{d}_i + \Delta\mathbf{d}) \approx \mathbf{r}(\mathbf{d}_i) - \mathbf{K}_T(\mathbf{d}_i)\,\Delta\mathbf{d}$. Setting the linearisation to zero gives the correction.

::: algorithm Incremental Newton–Raphson {#alg-nr}
Divide the load into increments $\lambda_1 < \lambda_2 < \dots < \lambda_N = 1$. Starting from the converged state $\mathbf{d}$ of the previous increment:
1. Set $\lambda = \lambda_{n+1}$ and compute the residual $\mathbf{r} = \lambda\mathbf{F}_0 - \mathbf{F}_\text{int}(\mathbf{d})$.
2. Assemble the tangent stiffness $\mathbf{K}_T(\mathbf{d})$ and impose the supports.
3. Solve $\mathbf{K}_T\,\Delta\mathbf{d} = \mathbf{r}$ and update $\mathbf{d} \leftarrow \mathbf{d} + \Delta\mathbf{d}$.
4. Evaluate the new residual and test convergence, e.g. $\lVert\mathbf{r}\rVert \le \epsilon_r\lVert\lambda\mathbf{F}_0\rVert$ (force), $\lVert\Delta\mathbf{d}\rVert \le \epsilon_d\lVert\mathbf{d}\rVert$ (displacement), or $\lvert\Delta\mathbf{d}^{\mathsf T}\mathbf{r}\rvert \le \epsilon_E$ times its first value (energy), with tolerances typically $10^{-3}$ to $10^{-6}$.
5. If not converged, return to step 2; if the iteration count exceeds a limit or the residual grows, cut the increment (bisect $\lambda_{n+1} - \lambda_n$) and restart from the last converged state.
6. When converged, store the state (stresses, plastic strains) and proceed to the next increment.

**Modified Newton–Raphson** keeps the tangent from the start of the increment (or even the initial elastic stiffness) and skips step 2 in later iterations: each iteration is cheaper (no new factorisation), but convergence is only linear.
:::

::: proposition Quadratic convergence of Newton's method {#prop-quadratic}
Suppose $\mathbf{r}$ is twice continuously differentiable near a solution $\mathbf{d}^*$ at which $\mathbf{K}_T(\mathbf{d}^*)$ is non-singular. Then for $\mathbf{d}_0$ close enough to $\mathbf{d}^*$, the Newton iterates converge and the errors $\mathbf{e}_i = \mathbf{d}_i - \mathbf{d}^*$ satisfy $\lVert\mathbf{e}_{i+1}\rVert \le C\lVert\mathbf{e}_i\rVert^2$.
:::

::: proof
(One-dimensional version; the multidimensional proof replaces derivatives by Jacobians.) Write $g(d) = F_\text{int}(d) - \lambda F_0$, so $g' = K_T$ and $g(d^*) = 0$. Taylor's theorem about $d_i$ gives $0 = g(d^*) = g(d_i) - g'(d_i)e_i + \tfrac12 g''(\xi)e_i^2$ for some $\xi$ between $d_i$ and $d^*$. The Newton update is $d_{i+1} = d_i - g(d_i)/g'(d_i)$, so $e_{i+1} = e_i - g(d_i)/g'(d_i) = \frac{g''(\xi)}{2g'(d_i)}e_i^2$. Near $d^*$, $g'$ is bounded away from zero and $g''$ is bounded, so $\lvert e_{i+1}\rvert \le C e_i^2$. If $\lvert e_0\rvert < 1/C$ the errors decrease and the number of correct digits roughly doubles each iteration. The assumptions fail at a **limit point** ($K_T$ singular), where convergence slows or breaks down, and for non-smooth material laws (yield), where $g''$ does not exist at the kink.
:::

::: example A hardening spring {#ex-spring}
A spring has the internal force $F_\text{int}(u) = k_0(u + a\,u^3)$ with $k_0 = 1000\,\mathrm{N/mm}$ and $a = 0.5\,\mathrm{mm^{-2}}$ (a stiffening support, like a rubber mount or a cable that tightens). Find the displacement under $F = 3000\,\mathrm{N}$ by Newton–Raphson, (a) in one increment from $u = 0$, (b) in two equal increments; and try (c) modified Newton–Raphson with the initial stiffness $k_0$.
::: solution
Tangent stiffness $K_T(u) = k_0(1 + 3au^2)$. The exact root of $u + 0.5u^3 = 3$ is $u^* = 1.45616\,\mathrm{mm}$.

(a) One increment:

| $i$ | $u_i$ (mm) | residual $F - F_\text{int}$ (N) | $K_T$ (N/mm) | error $u_i - u^*$ |
|---|---|---|---|---|
| 0 | 0 | 3000 | 1000 | $-1.456$ |
| 1 | 3.000 | $-13\,500$ | 14 500 | $+1.544$ |
| 2 | 2.0690 | $-3497$ | 7421 | $+0.613$ |
| 3 | 1.5977 | $-636.9$ | 4829 | $+0.142$ |
| 4 | 1.46581 | $-40.54$ | 4223 | $9.6\times10^{-3}$ |
| 5 | 1.456213 | $-0.202$ | 4181 | $4.8\times10^{-5}$ |
| 6 | 1.4561642 | $\approx 0$ | 4181 | $1.2\times10^{-9}$ |

The first step uses the soft initial tangent and overshoots badly; once close, the error is squared at each step ($9.6\times10^{-3} \to 4.8\times10^{-5} \to 1.2\times10^{-9}$), the signature of [[#prop-quadratic]].

(b) Two increments: at $F = 1500\,\mathrm{N}$ the iterates are $0 \to 1.5 \to 1.1143 \to 1.00737 \to 1.000032 \to 1.000000$ (the exact root is $u = 1$); from there, at $F = 3000\,\mathrm{N}$, $1 \to 1.6 \to 1.46612 \to 1.456216 \to 1.456164$. Nine iterations in total instead of six, but each increment starts closer and the path is followed, which matters when the response is history-dependent (plasticity) or has several branches.

(c) Modified NR with $k_0$: $u_1 = 3.0$, residual $-13\,500\,\mathrm{N}$, $u_2 = 3.0 - 13.5 = -10.5\,\mathrm{mm}$, and the iterates diverge. With a stiffening response, the initial stiffness is too soft and every correction overshoots; with the tangent frozen at $u = 1.5$ ($K = 4375\,\mathrm{N/mm}$), modified NR converges, but linearly — eight iterations for the same accuracy.

*Check.* $F_\text{int}(1.456164) = 1000(1.456164 + 0.5 \times 3.08772) = 3000.0\,\mathrm{N}$.
:::
:::

::: widget newton
f: 1000*(x + 0.5*x^3) - 3000
method: newton
x0: 0
steps: 6
x: -0.5, 3.5
caption: Newton–Raphson for the hardening spring of [[#ex-spring]], shown as root finding for $g(u) = F_\text{int}(u) - F$. Each tangent line is the tangent stiffness; where it meets the axis is the next iterate. Starting from $u = 0$ the first tangent is the soft initial stiffness and overshoots to $u = 3$; from there the tangents close in rapidly. Drag the start to $u = 1$ (the converged state of a previous load increment) and count how many fewer iterations are needed.
:::

## Geometric nonlinearity and limit points

When displacements are large enough to change the geometry, equilibrium must be written in the deformed configuration. The classical illustration is a shallow two-bar truss — the von Mises truss — a model of a shallow arch or a snap-through switch.

::: proposition The shallow two-bar truss {#prop-vonmises}
Two identical bars (axial stiffness $EA$) run from pinned supports at $(\pm a, 0)$ to an apex at height $h \ll a$; a downward load $P$ acts at the apex, which moves down by $w$. With small strains but finite rotations, equilibrium in the deformed position gives, to leading order in $h/a$,
$$
P(w) = \frac{EA}{L_0^3}\,w\,(2h - w)(h - w), \qquad L_0 = \sqrt{a^2 + h^2}.
$$ {#eq-vonmises}
The load reaches a maximum, the **limit load** $P_\text{max} = \dfrac{2}{3\sqrt3}\dfrac{EAh^3}{L_0^3}$, at $w = h(1 - 1/\sqrt3)$; the tangent stiffness $dP/dw$ is zero there and negative beyond.
:::

::: proof
The deformed bar length is $L = \sqrt{a^2 + (h - w)^2}$, so the axial strain is $\varepsilon = (L - L_0)/L_0 \approx \dfrac{(h - w)^2 - h^2}{2L_0^2} = -\dfrac{w(2h - w)}{2L_0^2}$ for $h, w \ll a$ (expand the square roots). The compressive bar force is $N = -EA\varepsilon$, and its vertical component in the *deformed* position is $N(h - w)/L \approx N(h - w)/L_0$. Vertical equilibrium of the apex with two bars: $P = 2N(h - w)/L_0 = \dfrac{EA}{L_0^3}w(2h - w)(h - w)$. Setting $dP/dw = 0$: $\frac{d}{dw}[w(2h - w)(h - w)] = 2h^2 - 6hw + 3w^2 = 0$, so $w = h(1 \pm 1/\sqrt3)$; the smaller root gives the maximum $P = \frac{EAh^3}{L_0^3}\cdot\frac{2}{3\sqrt3}$. A linear analysis would use the undeformed geometry and predict $P = (2EAh^2/L_0^3)\,w$ forever.
:::

Between $w = h(1 - 1/\sqrt3)$ and $w = h(1 + 1/\sqrt3)$ the structure has a negative tangent stiffness: under a dead load it is unstable, and once $P$ reaches $P_\text{max}$ the apex **snaps through** dynamically to the inverted configuration on the far branch where $P(w)$ rises again ($w$ slightly above $2h$). This is the mechanism of oil-can buckling of thin panels and of snap-through of shallow domes and arches.

::: example Limit load of a shallow truss {#ex-vonmises}
Two steel bars with $EA = 2\times10^{7}\,\mathrm{N}$ (for example $A = 100\,\mathrm{mm^2}$, $E = 200\,\mathrm{GPa}$) run from supports at $(\pm 1.0, 0)\,\mathrm{m}$ to an apex at height $h = 0.1\,\mathrm{m}$. Find the limit load and the apex deflection at which it occurs, and compare with the exact large-rotation solution. Where does the apex land after snap-through?
::: solution
$L_0 = \sqrt{1 + 0.01} = 1.00499\,\mathrm{m}$, $L_0^3 = 1.0151\,\mathrm{m^3}$. From [[#prop-vonmises]]:
$$
P_\text{max} = 0.3849 \times \frac{2\times10^7 \times 10^{-3}}{1.0151} = 7584\,\mathrm{N}, \qquad w = 0.1(1 - 0.5774) = 0.0423\,\mathrm{m}.
$$
Solving the equilibrium exactly, with $L = \sqrt{a^2 + (h - w)^2}$, $N = EA(L_0 - L)/L_0$ and $P = 2N(h - w)/L$, numerically gives $P_\text{max} = 7622\,\mathrm{N}$ at $w = 0.0424\,\mathrm{m}$: the shallow formula is within $0.5\,\%$. After the snap, the load $P_\text{max}$ is carried again on the rising branch beyond $w = 2h$; by [[#eq-vonmises]] that happens at $w = 0.2155\,\mathrm{m}$, with the apex $0.115\,\mathrm{m}$ *below* the supports.

*Check.* The limit load is tiny compared with the bars' yield capacity (about $25\,\mathrm{kN}$ each for $250\,\mathrm{MPa}$ steel) — this is an instability of geometry, not of material, and a linear analysis would never detect it. The bar compressive strain at the limit point is $w(2h - w)/(2L_0^2) = 3.3\times10^{-3}$; in practice the bars might buckle first, which this model ignores.
:::
:::

::: widget plot
f: x*(2 - x)*(1 - x); 0.3849
x: 0, 2.4
y: -0.5, 0.5
labels: P L_0^3/(EAh^3); P_\text{max}
points: 0.4226,0.3849; 2.1547,0.3849
caption: Load against apex deflection for the shallow two-bar truss, in dimensionless form ($x = w/h$). Under increasing load the structure climbs to the limit point at $w/h = 0.423$; there the tangent stiffness is zero, Newton's method under load control fails, and the real structure snaps through to $w/h = 2.155$ (the second marked point). The descending branch between can be traced only by controlling displacement or arc length, not load.
:::

### Passing limit points

Under **load control** ([[#alg-nr]] with prescribed $\lambda$) Newton's method breaks down as the limit point is approached: $\mathbf{K}_T$ becomes singular, corrections become huge, and no equilibrium state exists for $\lambda$ beyond the limit. Two remedies are used.

- **Displacement control**: prescribe one displacement component (the apex deflection) and treat $\lambda$ as an unknown. Works when a single displacement increases monotonically along the path, as for the truss above, but fails at "snap-back" points where the controlled displacement itself reverses.
- **Arc-length methods** (Riks, 1979; Crisfield, 1981): add the constraint that each increment has a prescribed length in the combined displacement–load space, $\Delta\mathbf{d}^{\mathsf T}\Delta\mathbf{d} + \psi^2\Delta\lambda^2\,\mathbf{F}_0^{\mathsf T}\mathbf{F}_0 = \Delta s^2$, and solve for $\Delta\mathbf{d}$ and $\Delta\lambda$ together. The load factor may then decrease, and the iteration follows the equilibrium path through limit points and snap-backs. Arc-length methods are the standard tool for post-buckling and collapse analysis.

A singular tangent stiffness also occurs at **bifurcation** points, where a second equilibrium path branches off (Euler buckling of a perfect column). There the analyst normally introduces a small imperfection — often shaped like the first buckling mode from a linear eigenvalue analysis — so that the bifurcation becomes a limit point that the arc-length method can follow.

## Material nonlinearity

In an elastoplastic material the stress depends on the strain history, so internal forces are evaluated by integrating the material law over each load increment at every integration point. In one dimension with linear isotropic hardening this is short enough to write out.

::: algorithm Return mapping for a one-dimensional elastoplastic bar {#alg-return}
Material: Young's modulus $E$, initial yield stress $\sigma_Y$, plastic modulus $H$ (hardening; $H = 0$ for perfect plasticity). Stored at each point: stress $\sigma_n$, plastic strain $\varepsilon^p_n$, accumulated plastic strain $\alpha_n$. Given the total strain $\varepsilon_{n+1}$ at the end of the increment:
1. **Elastic trial:** $\sigma^\text{tr} = E(\varepsilon_{n+1} - \varepsilon^p_n)$; trial yield function $f^\text{tr} = \lvert\sigma^\text{tr}\rvert - (\sigma_Y + H\alpha_n)$.
2. If $f^\text{tr} \le 0$: the step is elastic; $\sigma_{n+1} = \sigma^\text{tr}$, history unchanged, tangent modulus $E$.
3. Otherwise **return** to the yield surface: $\Delta\gamma = f^\text{tr}/(E + H)$, $\sigma_{n+1} = \sigma^\text{tr} - E\Delta\gamma\,\operatorname{sign}(\sigma^\text{tr})$, $\varepsilon^p_{n+1} = \varepsilon^p_n + \Delta\gamma\,\operatorname{sign}(\sigma^\text{tr})$, $\alpha_{n+1} = \alpha_n + \Delta\gamma$; the **consistent tangent** modulus is $EH/(E + H)$.
:::

The tangent modulus returned by the material routine is what goes into $\mathbf{K}_T$. Using the *consistent* tangent (the exact derivative of the algorithm's stress with respect to strain) preserves the quadratic convergence of Newton's method; using the elastic modulus throughout gives modified NR and slow convergence. In two and three dimensions the same structure — elastic predictor, plastic corrector, consistent tangent — applies to von Mises plasticity with the radial-return algorithm.

::: example Two bars in parallel {#ex-plastic}
A rigid plate is supported by two steel bars in parallel, of lengths $L_1 = 1.0\,\mathrm{m}$ and $L_2 = 1.5\,\mathrm{m}$, both with $A = 100\,\mathrm{mm^2}$, $E = 200\,\mathrm{GPa}$ and elastic–perfectly plastic behaviour with $\sigma_Y = 250\,\mathrm{MPa}$. Both bars elongate by the plate displacement $\delta$. Find the load at first yield, the collapse load, the displacement under $P = 45\,\mathrm{kN}$ by Newton–Raphson, and the residual state after the load is removed.
::: solution
Stiffnesses $k_1 = EA/L_1 = 20\,000\,\mathrm{N/mm}$, $k_2 = 13\,333\,\mathrm{N/mm}$; yield force of each bar $F_Y = 250 \times 100 = 25\,\mathrm{kN}$.

*First yield.* The shorter, stiffer bar yields first, at $\delta = 25\,000/20\,000 = 1.25\,\mathrm{mm}$; then $P = 25 + 13.333 \times 1.25 = 41.67\,\mathrm{kN}$. *Collapse.* Bar 2 yields at $\delta = 25\,000/13\,333 = 1.875\,\mathrm{mm}$; with both bars at $F_Y$ the load cannot exceed $50\,\mathrm{kN}$.

*Newton–Raphson for $P = 45\,\mathrm{kN}$* (one increment, $\delta_0 = 0$): iteration 1 uses $K_T = k_1 + k_2 = 33\,333\,\mathrm{N/mm}$, giving $\delta = 1.35\,\mathrm{mm}$. The return mapping caps bar 1 at $25\,\mathrm{kN}$; bar 2 carries $18\,\mathrm{kN}$; residual $45 - 43 = 2\,\mathrm{kN}$. Iteration 2 uses the tangent $K_T = k_2 = 13\,333\,\mathrm{N/mm}$ (bar 1 now contributes zero): $\Delta\delta = 0.15\,\mathrm{mm}$, $\delta = 1.50\,\mathrm{mm}$, residual zero. Bar forces $25$ and $20\,\mathrm{kN}$.

*Unloading* is elastic in both bars (stiffness $33\,333\,\mathrm{N/mm}$): $\Delta\delta = -45\,000/33\,333 = -1.35\,\mathrm{mm}$, leaving a permanent set $\delta_\text{res} = 0.15\,\mathrm{mm}$, with bar 1 at $25 - 20 \times 1.35 = -2.0\,\mathrm{kN}$ (compression) and bar 2 at $20 - 13.333 \times 1.35 = +2.0\,\mathrm{kN}$ (tension).

*Check.* The residual forces are self-equilibrated (they sum to zero with no load), as they must be. On reloading to $45\,\mathrm{kN}$ the response is elastic — the structure has **shaken down** for this load. Newton converged in two iterations because the material law is piecewise linear: once the correct set of yielded bars is identified, the problem is linear.
:::
:::

## Modelling practice: building models that can be trusted

Every chapter of this course has ended with checks. They are worth collecting, because most finite element errors in industry are not numerical but human: wrong units, wrong supports, wrong loads, wrong materials, and results read without scepticism.

**Verification and validation.** *Verification* asks whether the equations are solved correctly: code verification (the software gives known answers on benchmark problems — patch tests, manufactured solutions, the NAFEMS benchmarks) and solution verification (the discretisation error of *this* model is estimated, by mesh refinement as in [[finite-element-method/convergence-meshing]]). *Validation* asks whether the right equations are being solved: model predictions are compared with physical tests designed for the purpose, with the uncertainties of both quantified. The distinction, and a framework for planning both, is set out for solid mechanics in ASME V&V 10 (issued as a guide in 2006 and as a standard in 2019). A model can be perfectly verified and still invalid.

::: algorithm Checking a finite element model {#alg-checks}
Before trusting results:
1. **Units.** Write down the unit system (e.g. N, mm, t, s, MPa) and check every input against it — Young's modulus, density, loads, pressures. A steel modulus of 200 in an N–mm model (instead of 200 000) makes everything 1000 times too flexible.
2. **Free–free check.** Run a modal analysis without supports: there must be exactly six (3-D) or three (2-D) zero-frequency rigid-body modes. More indicates a mechanism or disconnected parts; fewer indicates spurious grounding.
3. **Reactions.** The sum of reactions must balance the applied loads in every direction, and its value must match a hand calculation of the total load (pressure × area, weight).
4. **Deformed shape.** Animate it at an exaggerated scale. It should look physically sensible: supports where intended, symmetric if the problem is, no isolated nodes flying off, no zig-zag (hourglass) patterns.
5. **Order of magnitude.** Compare a key displacement and stress with a hand estimate (beam, plate or pressure-vessel formulas). Agreement within tens of per cent is a pass; a factor of 1000 is a units error, a factor of 2 or 3 is usually a support or load error.
6. **Mesh.** Refine where results are needed and check convergence; check that peak stresses are not at point loads, point supports or sharp re-entrant corners.
7. **Nonlinear runs.** Check the load–displacement curve (smooth, no unexplained jumps), the convergence history (number of iterations per increment, any cut-backs), and the energy balance.
8. **Documentation.** Record assumptions, inputs, checks and their outcomes, so that an independent reviewer can repeat them.
:::

::: example A units error found by a hand check {#ex-units}
A steel cantilever bracket, $300\,\mathrm{mm}$ long, of rectangular section $20\,\mathrm{mm}$ wide and $40\,\mathrm{mm}$ deep, carries $2\,\mathrm{kN}$ at its tip. A model built in N and mm reports a tip deflection of $844\,\mathrm{mm}$ and a root bending stress of $112\,\mathrm{MPa}$. Diagnose.
::: solution
Hand estimate: $I = 20 \times 40^3/12 = 1.067\times10^{5}\,\mathrm{mm^4}$. Tip deflection $PL^3/(3EI) = 2000 \times 2.7\times10^{7}/(3 \times 200\,000 \times 1.067\times10^{5}) = 0.844\,\mathrm{mm}$. Root stress $Mc/I = 2000 \times 300 \times 20/1.067\times10^{5} = 112.5\,\mathrm{MPa}$.

The stress agrees with the hand value, so the load, the geometry and the supports are right: in a statically determinate member the stress does not depend on $E$. The deflection is exactly $1000$ times too large, and deflection scales as $1/E$. Conclusion: Young's modulus was entered as $200$ (GPa, the number from the data sheet) in a model whose stress unit is the MPa, where it should be $200\,000$. Correcting it gives $0.844\,\mathrm{mm}$.

*Check of the method.* Compare stresses first: a disagreement there points to loads, geometry or supports. Then compare the ratio of deflection to stress: a disagreement there points to stiffness — modulus, section properties or support flexibility. A clean factor of 1000 is almost always a unit; a factor of 2 to 4 is usually a support or load-application error. Note also that a $844\,\mathrm{mm}$ deflection of a $300\,\mathrm{mm}$ bracket violates the small-displacement assumption of the analysis itself — the result was not even self-consistent.
:::
:::

::: warning The model is not the structure
The loss of the Sleipner A gravity-base platform in a Norwegian fjord in August 1991 is the standard cautionary tale. During a controlled ballasting test a cell wall of the concrete structure failed and the whole base sank. The investigation found that the global finite element analysis, made with a linear elastic general-purpose code, had underestimated the shear forces in the tricell walls by about 45 %, largely because of unfavourably shaped elements in that region, and that the reinforcement detailing there was inadequate. A hand check of the shear, or a finer local model, would have exposed the error. No software can replace an engineer who asks whether the numbers make sense — and finite element results inform a design; they do not certify it. Safety-critical structures are designed to the applicable codes and independently checked.
:::

::: quiz
A geometrically nonlinear analysis of a shallow arch under increasing load stops at 63 % of the target load with "solution failed to converge — too many bisections". What is the most likely explanation and remedy?
- [ ] The mesh is too fine; coarsen it.
- [x] The structure has reached a limit point, where the tangent stiffness becomes singular and no equilibrium exists at higher load under load control; switch to an arc-length (Riks) method or displacement control and inspect the load–displacement path.
- [ ] The tolerance is too strict; relax it to 10 %.
- [ ] Newton–Raphson cannot handle geometric nonlinearity; use a linear analysis.
::: solution
Repeated bisection near a fixed load level with growing corrections is the classic symptom of a limit point. The structure's actual capacity may be 63 % of the target — a real and important result — and the arc-length method will show whether the path continues (snap-through to another configuration) or collapses. Relaxing the tolerance only hides the problem, and a linear analysis cannot see the limit point at all.
:::
:::

::: history
Iterative solution of nonlinear structural equations followed soon after the linear method: incremental "tangent stiffness" approaches for plasticity and large deflection were in use by the mid-1960s, and the 1970s produced the general nonlinear codes and the continuum-mechanics formulations (total and updated Lagrangian) still in use. Passing limit points was the remaining obstacle. G. A. Wempner (1971) and E. Riks (1979) proposed constraining the length of each increment in load–displacement space, and M. A. Crisfield (1981) gave the cylindrical arc-length method in the form now built into most commercial programs; his two-volume *Non-Linear Finite Element Analysis of Solids and Structures* (1991, 1997) remains a standard text. The discipline of verification and validation grew from the 1990s, driven by nuclear, aerospace and defence agencies that needed to rely on simulation where tests were impossible, and was codified for solid mechanics by ASME in 2006.
:::

::: summary
- Nonlinear problems are written as a residual $\mathbf{r} = \lambda\mathbf{F}_0 - \mathbf{F}_\text{int}(\mathbf{d}) = \mathbf{0}$; internal forces are evaluated element by element from the current geometry and material state.
- Newton–Raphson solves $\mathbf{K}_T\Delta\mathbf{d} = \mathbf{r}$ repeatedly within load increments and converges quadratically near a solution if the tangent is exact; modified NR is cheaper per iteration but linear, and can diverge for stiffening response.
- Geometric nonlinearity can produce limit points (zero tangent stiffness) and snap-through, as in the shallow truss $P = \frac{EA}{L_0^3}w(2h - w)(h - w)$; load control fails there, displacement control or arc-length methods continue.
- Material nonlinearity is handled by a return-mapping integration of the constitutive law at each integration point; the consistent tangent preserves quadratic convergence. Plastic deformation leaves permanent set and self-equilibrated residual stresses.
- Verification (are the equations solved correctly?) and validation (are they the right equations?) are distinct; check units, rigid-body modes, reactions, deformed shape, hand estimates and mesh convergence before trusting any result.
:::

## Exercises

::: exercise The first Newton step {level=1 check="3"}
For the hardening spring of [[#ex-spring]] under $3000\,\mathrm{N}$, what is the displacement after the first Newton–Raphson iteration from $u = 0$? (Enter it in mm.)
::: solution
$K_T(0) = k_0 = 1000\,\mathrm{N/mm}$ and $r = 3000\,\mathrm{N}$, so $u_1 = 3000/1000 = 3.0\,\mathrm{mm}$ — the linear solution.
:::
:::

::: exercise A residual {level=1 check="-3000"}
For the same spring and load, evaluate the residual $r = F - F_\text{int}(u)$ at $u = 2\,\mathrm{mm}$. (Enter it in N, with sign.)
::: solution
$F_\text{int}(2) = 1000(2 + 0.5 \times 8) = 6000\,\mathrm{N}$, so $r = 3000 - 6000 = -3000\,\mathrm{N}$: the spring at $u = 2\,\mathrm{mm}$ pushes back harder than the load, and the next correction is negative.
:::
:::

::: exercise Limit load of a flatter truss {level=1 check="958.65"}
Repeat the limit-load calculation of [[#ex-vonmises]] with the apex height reduced to $h = 0.05\,\mathrm{m}$ (all else equal). (Enter $P_\text{max}$ in N.)
::: solution
$L_0 = \sqrt{1.0025} = 1.00125\,\mathrm{m}$, $L_0^3 = 1.003756$. $P_\text{max} = 0.38490 \times 2\times10^7 \times 1.25\times10^{-4}/1.003756 = 958.65\,\mathrm{N}$. Halving the rise divides the limit load by about 8 ($h^3$): shallow arches are extremely sensitive to their rise, and to imperfections that reduce it.
:::
:::

::: exercise First yield in a parallel system {level=2 check="41.667"}
In [[#ex-plastic]], at what applied load does the first bar yield? (Enter $P$ in kN.)
::: solution
Elastically the load splits in proportion to stiffness; bar 1 reaches $25\,\mathrm{kN}$ at $\delta = 1.25\,\mathrm{mm}$, when bar 2 carries $13.333 \times 1.25 = 16.667\,\mathrm{kN}$. Total $41.667\,\mathrm{kN}$.
:::
:::

::: exercise Permanent set {level=2 check="0.15"}
In [[#ex-plastic]] the load is raised to $45\,\mathrm{kN}$ and removed. What is the permanent displacement of the plate? (Enter it in mm.)
::: solution
Loaded: $\delta = 1.50\,\mathrm{mm}$. Unloading is elastic with stiffness $k_1 + k_2 = 33\,333\,\mathrm{N/mm}$: recovery $45\,000/33\,333 = 1.35\,\mathrm{mm}$. Permanent set $0.15\,\mathrm{mm}$, with residual forces $\mp 2\,\mathrm{kN}$ in the two bars.
:::
:::

::: exercise The converged spring displacement {level=2 check="1.45616"}
Solve $1000(u + 0.5u^3) = 3000$ by Newton's method to six significant figures, starting from $u = 1.5$. (Enter $u$ in mm.)
::: solution
$g(u) = u + 0.5u^3 - 3$, $g'(u) = 1 + 1.5u^2$. From $1.5$: $g = 0.1875$, $g' = 4.375$, $u = 1.457143$; $g = 0.004094$, $g' = 4.18490$, $u = 1.456165$; next correction $\sim 10^{-6}$. $u = 1.45616\,\mathrm{mm}$.
:::
:::

::: exercise Snap-through displacement {level=3}
For the shallow truss of [[#prop-vonmises]], show that after snap-through at $P_\text{max}$ the apex comes to rest (statically) at $w = h(1 + 2/\sqrt3)$, and explain why a load-controlled Newton–Raphson analysis cannot find this state by continuing from the limit point. What is the tangent stiffness at the new state?
::: solution
Write $x = w/h$ and $p(x) = x(2 - x)(1 - x)$; $p_\text{max} = 2/(3\sqrt3)$ at $x = 1 - 1/\sqrt3$. Substitute $x = 1 + y$: $p = (1 + y)(1 - y)(-y) = y^3 - y$. The equation $y^3 - y = 2/(3\sqrt3)$ has the double root $y = -1/\sqrt3$ (the limit point) and, since the roots sum to zero, a third root $y = 2/\sqrt3$. So $x = 1 + 2/\sqrt3 = 2.155$, i.e. $w = 2.155h$. Load-controlled Newton from the limit point faces a singular $K_T$ and no nearby equilibrium state at higher load; the jump to $x = 2.155$ is a dynamic event that a static path-following method can only reach by tracing the unstable branch (arc length). Tangent stiffness at the new state: $dp/dx = 3y^2 - 1 = 3(4/3) - 1 = 3$, i.e. $K_T = 3EAh^2/L_0^3$ — positive and stable, 1.5 times the initial stiffness $2EAh^2/L_0^3$.
:::
:::

::: exercise Why Newton fails at yield {level=3}
For a single elastic–perfectly plastic bar (stiffness $k$, yield force $F_Y$) loaded by $P > F_Y$, show that the static problem has no solution, and describe what a Newton–Raphson code does when asked to apply this load. Then explain why a displacement-controlled analysis of the same bar does converge, and what it reports.
::: solution
With perfect plasticity the internal force is $\min(k\delta, F_Y)$, never larger than $F_Y$; the residual $P - F_\text{int}$ is at least $P - F_Y > 0$ for every $\delta$, so equilibrium is impossible. Newton: the first iteration overshoots into the plastic range, where the consistent tangent is zero; the solver meets a singular matrix (or, with a small numerical stiffness, enormous corrections), the increment is bisected repeatedly, and the run stops below $P$ — the "failure to converge" is the correct physical answer that the bar has collapsed. Under displacement control, every prescribed $\delta$ has a unique force $\min(k\delta, F_Y)$; the analysis converges and traces a plateau at $F_Y$, the collapse load. This is why limit (collapse) loads are best computed by displacement or arc-length control.
:::
:::

::: exercise A verification and validation plan {level=3}
Your company will use a nonlinear finite element model to predict the collapse load of a thin-walled aluminium crash box, a part that is tested on a drop tower. Draft a verification and validation plan: list code-verification problems, solution-verification steps, the validation experiments and measured quantities, how you would compare predictions with tests (including scatter), and what would make you reject the model.
::: solution
*Code verification:* reproduce analytical or benchmark solutions with the same element type and options — elastic buckling of a thin plate or cylinder (compare with the classical formulas), an elastoplastic bar or thick cylinder under internal pressure, and a published crushing benchmark; patch tests for the shell elements. *Solution verification:* mesh refinement of the crash box (at least three meshes, the fold wavelength must be resolved by several elements), time-step and mass-scaling sensitivity in the explicit run, hourglass energy below a few per cent of internal energy, energy balance closed. *Validation:* quasi-static compression tests and drop-tower tests on several specimens, measuring force–displacement curves, peak load, mean crushing force, fold pattern, and material tests (tensile curves at relevant strain rates) on the same batch. *Comparison:* report predictions with discretisation uncertainty against test means with scatter (e.g. ±2 standard deviations); agree beforehand on acceptance criteria (for instance peak force and mean force within the combined uncertainty, fold pattern matching). *Rejection:* systematic disagreement outside the uncertainty band, a different fold mode, sensitivity to numerical parameters larger than the test scatter, or agreement obtained only by tuning parameters that have no physical basis. The validated model is then valid for the conditions tested, not beyond them.
:::
:::
