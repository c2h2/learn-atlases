Diffusion is easy to discretise because it is easy-going physics: it spreads things out evenly in all directions, and the central difference, which also looks in all directions equally, mirrors it perfectly. Convection is different. A flowing fluid carries heat, momentum and species *downstream*; what happens at a point depends overwhelmingly on what is upstream of it. A scheme that weighs upstream and downstream neighbours equally — the natural central difference — ignores that asymmetry, and when convection dominates diffusion on the scale of a cell it produces wild, unphysical oscillations. The opposite cure, looking only upstream, is robust but smears every sharp feature with numerical diffusion, as found in [[computational-fluid-dynamics/stability-accuracy#prop-modified]]. The search for schemes that are both accurate and bounded has occupied CFD for fifty years and is the subject of this lesson.

We extend the finite-volume method of [[computational-fluid-dynamics/finite-volume-diffusion]] to the steady **convection–diffusion equation**, identify the cell Péclet number as the controlling parameter, analyse the central and upwind schemes and their failure modes, and then build the higher-order schemes used in practice: QUICK, and the TVD schemes with flux limiters that are the default in modern codes. Throughout, the velocity field is taken as known; how it is found is the subject of [[computational-fluid-dynamics/pressure-velocity]].

## The model problem and its exact solution

Steady one-dimensional convection and diffusion of a scalar $\phi$ in a flow of constant density $\rho$ and velocity $u$ obeys
$$
\frac{\mathrm{d}}{\mathrm{d}x}(\rho u\phi) = \frac{\mathrm{d}}{\mathrm{d}x}\left(\Gamma\frac{\mathrm{d}\phi}{\mathrm{d}x}\right),
\qquad \frac{\mathrm{d}(\rho u)}{\mathrm{d}x} = 0 .
$$ {#eq-cd-1d}
The second equation is continuity: in 1D steady flow the mass flux $\rho u$ is constant.

::: proposition Exact solution of steady 1D convection–diffusion {#prop-exact-cd}
With $\phi(0) = \phi_0$, $\phi(L) = \phi_L$ and constant $\rho u$ and $\Gamma$, the solution of [[#eq-cd-1d]] is
$$
\frac{\phi(x) - \phi_0}{\phi_L - \phi_0} = \frac{\exp(\mathrm{Pe}\,x/L) - 1}{\exp(\mathrm{Pe}) - 1},
\qquad \mathrm{Pe} = \frac{\rho u L}{\Gamma}.
$$ {#eq-exact-cd}
:::

::: proof
With constant coefficients the equation is $\rho u\,\phi' = \Gamma\phi''$. Integrating once gives $\Gamma\phi' - \rho u\phi = \text{const}$: the total flux (diffusive plus convective) is uniform, as it must be in a steady 1D problem without sources. The homogeneous linear ODE $\phi'' - (\mathrm{Pe}/L)\phi' = 0$ has the solutions $1$ and $\exp(\mathrm{Pe}\,x/L)$, so $\phi = A + B\exp(\mathrm{Pe}\,x/L)$. Fitting the two boundary values gives [[#eq-exact-cd]]. As $\mathrm{Pe} \to 0$, expanding the exponentials gives $\phi \to \phi_0 + (\phi_L - \phi_0)x/L$, the linear conduction profile.
:::

For large positive $\mathrm{Pe}$ the profile stays at the upstream value $\phi_0$ almost all the way and then drops to $\phi_L$ in a thin layer at the outflow, of thickness about $L/\mathrm{Pe} = \Gamma/(\rho u)$. That thin layer is what a scheme must cope with.

::: widget plot
f: 1 - (exp(P*x) - 1)/(exp(P) - 1)
x: 0, 1
y: 0, 1.1
sliders: P=1:0.1:50:0.1
caption: Exact solution of steady convection–diffusion between $\phi = 1$ at the inlet ($x/L = 0$) and $\phi = 0$ at the outlet ($x/L = 1$), with the global Péclet number $\mathrm{Pe} = \rho uL/\Gamma$ on the slider. At small $\mathrm{Pe}$ diffusion wins and the profile is nearly the straight line of pure conduction. As $\mathrm{Pe}$ grows, convection sweeps the inlet value downstream and the change is squeezed into an outlet layer of thickness about $L/\mathrm{Pe}$. With five cells of width $0.2L$, how large can $\mathrm{Pe}$ be before that layer is thinner than one cell?
:::

## Finite-volume discretisation

Integrate [[#eq-cd-1d]] over the control volume around $P$. With face mass fluxes per unit area $F = \rho u$ and diffusion conductances $D = \Gamma/\delta x$ (per unit area),
$$
F_e\phi_e - F_w\phi_w = D_e(\phi_E - \phi_P) - D_w(\phi_P - \phi_W).
$$ {#eq-cd-integrated}
The diffusion side is exactly as before. The convection side needs the scalar *on the faces*, $\phi_e$ and $\phi_w$, but the unknowns live at nodes. The **convection scheme** is the rule that supplies face values from nodal values, and it is the whole subject of this lesson.

::: definition Cell Péclet number {#def-cell-peclet}
The **cell Péclet number** at a face is the ratio of convective to diffusive strength over one node spacing:
$$
P_\Delta = \frac{F}{D} = \frac{\rho u\,\delta x}{\Gamma}.
$$
For heat transfer $\Gamma = k/c_p$ and $P_\Delta = u\,\delta x/\alpha$; for momentum $\Gamma = \mu$ and $P_\Delta$ is the cell Reynolds number $u\,\delta x/\nu$.
:::

Before analysing schemes, here are the properties a good one should have (Versteeg and Malalasekera's list).

::: definition Conservativeness, boundedness and transportiveness {#def-scheme-properties}
- A scheme is **conservative** if the flux through each face is computed by one expression shared by the two cells, so that the sum over all cells telescopes.
- A scheme is **bounded** if, without sources, every computed $\phi$ lies between the boundary values; a sufficient condition (Scarborough's criterion together with positivity) is that all coefficients $a_{nb}$ are positive and $\sum\lvert a_{nb}\rvert/\lvert a_P\rvert \le 1$ at all nodes, with strict inequality at one or more.
- A scheme is **transportive** if it recognises the direction of the flow: at large $P_\Delta$ a node should be influenced mainly by its upstream neighbour.
:::

## Central differencing and the wiggles

The natural choice on a uniform grid is the average of the two neighbouring nodes, $\phi_e = \tfrac12(\phi_P + \phi_E)$, $\phi_w = \tfrac12(\phi_W + \phi_P)$. Substituting into [[#eq-cd-integrated]] and using continuity ($F_e = F_w = F$),
$$
a_P\phi_P = a_W\phi_W + a_E\phi_E,\qquad a_W = D + \frac{F}{2},\quad a_E = D - \frac{F}{2},\quad a_P = a_W + a_E .
$$ {#eq-central}
The scheme is second-order accurate and conservative. But look at $a_E$: it is negative whenever $F > 2D$, i.e. $P_\Delta > 2$.

::: proposition The central scheme oscillates for $P_\Delta > 2$ {#prop-central-wiggles}
On a uniform grid with constant $F$ and $D$, every solution of the central-difference equations [[#eq-central]] at interior nodes has the form
$$
\phi_i = A + B\,r^i,\qquad r = \frac{1 + P_\Delta/2}{1 - P_\Delta/2}.
$$
For $P_\Delta < 2$, $r > 1$ and the discrete solution is monotone, mimicking the exponential of [[#eq-exact-cd]]; for $P_\Delta > 2$, $r < 0$ and the solution alternates in sign from node to node.
:::

::: proof
Try $\phi_i = r^i$ in $(a_W + a_E)\phi_i = a_W\phi_{i-1} + a_E\phi_{i+1}$ and divide by $r^{i-1}$: $a_E r^2 - (a_W + a_E)r + a_W = 0$, which factorises as $(r - 1)(a_E r - a_W) = 0$. The roots are $r = 1$ and $r = a_W/a_E = (D + F/2)/(D - F/2) = (1 + P_\Delta/2)/(1 - P_\Delta/2)$. The general solution of the linear recurrence is the combination $A + Br^i$. If $P_\Delta > 2$ the denominator is negative and $r < 0$, so $r^i$ alternates in sign. (The exact solution sampled at the nodes is $A + B\left(e^{P_\Delta}\right)^i$; since $e^{P_\Delta} = 1 + P_\Delta + \dots$, the central scheme's $r$ agrees with it to $O(P_\Delta^3)$ for small $P_\Delta$.)
:::

The oscillations are not an instability in time — there is no time here — but a failure of boundedness: a node's value is pushed *away* from its downstream neighbour by the negative coefficient. Physically, central differencing lets downstream information influence a node as strongly as upstream information, which is wrong when convection dominates.

::: example Central and upwind on five cells {#ex-five-cells}
A scalar is carried along a duct of length $L = 1.0\ \mathrm{m}$ with $\rho = 1.0\ \mathrm{kg/m^3}$ and $\Gamma = 0.10\ \mathrm{kg\,m^{-1}\,s^{-1}}$, between $\phi = 1$ at $x = 0$ and $\phi = 0$ at $x = L$. Using five control volumes ($\delta x = 0.20\ \mathrm{m}$), solve with central differencing for (a) $u = 0.2\ \mathrm{m/s}$ and (b) $u = 3.0\ \mathrm{m/s}$, and compare with the exact solution.
::: solution
$D = \Gamma/\delta x = 0.50\ \mathrm{kg\,m^{-2}\,s^{-1}}$. Boundary faces are half a cell from the nodes, so they carry diffusion conductance $2D$ and the face value equals the boundary value. Interior coefficients follow [[#eq-central]]; at node 1, $a_W = 0$ and the boundary contributes $S_P = -(2D + F)$, $S_u = (2D + F)\phi_0$; at node 5, $a_E = 0$ and $S_P = -(2D - F)$, $S_u = (2D - F)\phi_L$.

(a) $F = 0.2$, $P_\Delta = 0.4$: $a_W = 0.6$, $a_E = 0.4$, all positive. Solution and exact values ($\mathrm{Pe} = 2$):

| $x$ / m | 0.1 | 0.3 | 0.5 | 0.7 | 0.9 |
|---|---|---|---|---|---|
| central | 0.9697 | 0.8787 | 0.7422 | 0.5374 | 0.2303 |
| exact | 0.9653 | 0.8713 | 0.7311 | 0.5218 | 0.2096 |

Good agreement (maximum error $0.021$).

(b) $F = 3.0$, $P_\Delta = 6$: $a_W = 2.0$, $a_E = 0.5 - 1.5 = -1.0$. The solution is
$$
\phi = (1.091,\ 0.727,\ 1.455,\ 0.000,\ 2.909),
$$
against the exact $(1.000, 1.000, 1.000, 0.9999, 0.950)$ ($\mathrm{Pe} = 30$). The values overshoot both boundary values and alternate — exactly the behaviour predicted by $r = (1 + 3)/(1 - 3) = -2$. Sanity check: the outlet layer has thickness $\Gamma/(\rho u) = 0.033\ \mathrm{m}$, a sixth of a cell; no scheme can resolve it on this grid, but a good scheme should at least not invent values outside $[0, 1]$.
:::
:::

The obvious cure is refinement until $P_\Delta < 2$ everywhere. For the example that means $\delta x < 2\Gamma/(\rho u) = 0.067\ \mathrm{m}$, i.e. more than $15$ cells. For real flows it is usually impossible: air at $10\ \mathrm{m/s}$ ($\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$) would need cells smaller than $3\ \mu\mathrm{m}$ throughout the domain.

## Upwind differencing

The **first-order upwind** scheme takes the face value from the node on the upstream side: $\phi_e = \phi_P$ if $F_e > 0$ and $\phi_e = \phi_E$ if $F_e < 0$. In compact form valid for either flow direction,
$$
a_W = D_w + \max(F_w, 0),\qquad a_E = D_e + \max(-F_e, 0),\qquad a_P = a_W + a_E + (F_e - F_w).
$$ {#eq-upwind}
Every coefficient is positive for every $P_\Delta$, and with continuity $F_e = F_w$, $a_P = a_W + a_E$: the scheme is unconditionally bounded and transportive. Its price is accuracy: the face value is a first-order approximation, and the modified-equation analysis of the previous lesson applies — upwinding adds a **false (numerical) diffusion** $\Gamma_{\text{num}} = \tfrac12\rho u\,\delta x$ in steady 1D flow, so the effective diffusivity is $\Gamma(1 + P_\Delta/2)$.

::: example Upwinding and grid refinement {#ex-upwind-refine}
Solve case (b) of [[#ex-five-cells]] ($u = 3.0\ \mathrm{m/s}$, five cells) with the upwind scheme, then compare the maximum nodal errors of central and upwind differencing on $10$, $20$, $40$ and $80$ cells.
::: solution
With $F = 3.0$ and $D = 0.5$: interior $a_W = D + F = 3.5$, $a_E = D = 0.5$, $a_P = 4.0$; node 1 has $a_W = 0$, $S_P = -(2D + F) = -4$, $S_u = 4\phi_0$; node 5 has $a_E = 0$, $S_P = -2D = -1$, $S_u = 2D\phi_L = 0$. All coefficients are positive. The solution is
$$
\phi = (0.9999,\ 0.9993,\ 0.9949,\ 0.9643,\ 0.7500),
$$
bounded and qualitatively right, but the outlet layer is spread over two cells: the effective diffusivity is $\Gamma(1 + P_\Delta/2) = 4\Gamma$. Under refinement the maximum nodal errors are

| cells | 10 | 20 | 40 | 80 |
|---|---|---|---|---|
| $P_\Delta$ | 3 | 1.5 | 0.75 | 0.375 |
| central | 0.72 (oscillating) | 0.22 | 0.062 | 0.017 |
| upwind | 0.18 | 0.12 | 0.091 | 0.055 |

Once $P_\Delta < 2$, the central error falls by about $3.6$ per halving of the cell size (second order, approaching the asymptotic factor $4$), while the upwind error falls by less than $2$: first order with a large constant. Sanity check: at $10$ cells upwind is the better answer, at $40$ and beyond central is — which scheme is "better" depends on the grid, and the bounded high-order schemes below aim to get the best of both.
:::
:::

::: warning False diffusion is worst across the flow
In two and three dimensions upwinding is far more damaging than in 1D, because the scheme applies its one-dimensional upwind rule along each grid direction separately. When the flow crosses the grid lines obliquely, a sharp front parallel to the flow is smeared sideways by a **cross-stream false diffusion** that does not exist in 1D. De Vahl Davis and Mallinson (1976) estimated it for uniform flow at angle $\theta$ to the $x$-axis on a grid $\Delta x \times \Delta y$ as
$$
\Gamma_{\text{false}} = \frac{\rho U\,\Delta x\,\Delta y\,\sin 2\theta}{4\left(\Delta y\sin^3\theta + \Delta x\cos^3\theta\right)},
$$
largest near $\theta = 45^\circ$ and zero for flow aligned with the grid. It explains why hexahedral meshes aligned with the main flow direction give much sharper results than tetrahedral meshes of the same cell size, and why "first-order upwind" results should never be reported as final.
:::

### Hybrid, power-law and exponential schemes

Because the exact 1D solution [[#eq-exact-cd]] is known, one can build a scheme that is exact for steady 1D problems: the **exponential scheme**, with $a_E = F/(\exp(P_\Delta) - 1)$ and $a_W = a_E\exp(P_\Delta)$ (for constant coefficients). Exponentials are expensive, so Spalding's **hybrid scheme** (1972) approximates it piecewise: central differencing for $\lvert P_\Delta\rvert < 2$ and upwinding with diffusion switched off for $\lvert P_\Delta\rvert \ge 2$:
$$
a_E = \max\!\left[-F_e,\ D_e - \frac{F_e}{2},\ 0\right],\qquad a_W = \max\!\left[F_w,\ D_w + \frac{F_w}{2},\ 0\right].
$$
Patankar's **power-law scheme** (1980) fits the exponential curve more closely with a fifth-power polynomial and drops diffusion only for $\lvert P_\Delta\rvert > 10$. These schemes are bounded and better than plain upwind for 1D-like flows, but in multidimensional flows at high $P_\Delta$ they reduce to first-order upwinding with all its false diffusion.

## Higher-order schemes: QUICK

To gain accuracy while keeping the upstream bias, use more upstream information. Leonard's **QUICK** (Quadratic Upstream Interpolation for Convective Kinetics) scheme fits a parabola through two upstream nodes and one downstream node and evaluates it at the face.

::: proposition The QUICK face value {#prop-quick}
On a uniform grid with flow in the $+x$ direction, the parabola through $\phi_W$, $\phi_P$, $\phi_E$ evaluated at the face $e$ midway between $P$ and $E$ gives
$$
\phi_e = \frac{6}{8}\phi_P + \frac{3}{8}\phi_E - \frac{1}{8}\phi_W .
$$ {#eq-quick}
:::

::: proof
Place $P$ at $\xi = 0$ with $W$ at $\xi = -1$ and $E$ at $\xi = 1$ (in units of $\delta x$), and write the parabola $\phi(\xi) = \phi_P + b\xi + c\xi^2$. Matching $W$ and $E$: $\phi_E = \phi_P + b + c$ and $\phi_W = \phi_P - b + c$, so $b = \tfrac12(\phi_E - \phi_W)$ and $c = \tfrac12(\phi_E + \phi_W) - \phi_P$. At the face, $\xi = \tfrac12$:
$$
\phi_e = \phi_P + \tfrac14(\phi_E - \phi_W) + \tfrac18(\phi_E + \phi_W) - \tfrac14\phi_P = \tfrac34\phi_P + \tfrac38\phi_E - \tfrac18\phi_W .
$$
For the opposite flow direction the stencil shifts one node downstream ($P$, $E$, $EE$).
:::

The face interpolation is third-order accurate; the resulting finite-volume scheme for the convective flux is formally of third order on uniform grids (second order overall once the diffusion term and the midpoint flux integration are included in multi-dimensions). It has much less numerical diffusion than upwind. But the coefficient of $\phi_W$ in [[#eq-quick]] is negative, so QUICK is not unconditionally bounded: it produces small overshoots and undershoots near steep gradients, smaller than central differencing but enough to make a turbulence quantity or a mass fraction negative. In practice it is implemented by **deferred correction**: the upwind part goes into the matrix (keeping the coefficients positive and the linear solver happy) and the difference between the QUICK and upwind face values is added explicitly to the source, using the latest iterate.

::: example A QUICK face value and its overshoot {#ex-quick}
Flow is in the $+x$ direction. (a) With $\phi_W = 1$, $\phi_P = 2$, $\phi_E = 4$, compute $\phi_e$ by upwind, central and QUICK. (b) Repeat for a step, $\phi_W = 0$, $\phi_P = 0$, $\phi_E = 1$, and for $\phi_W = 0$, $\phi_P = 1$, $\phi_E = 1$.
::: solution
(a) Upwind: $\phi_e = \phi_P = 2$. Central: $(2 + 4)/2 = 3$. QUICK: $\tfrac68(2) + \tfrac38(4) - \tfrac18(1) = 1.5 + 1.5 - 0.125 = 2.875$. For this smoothly curving data QUICK sits between the two, closer to central, with a correction for curvature.

(b) For $(0, 0, 1)$: QUICK gives $\tfrac38 = 0.375$ — between $0$ and $1$, acceptable. For $(0, 1, 1)$: QUICK gives $\tfrac68 + \tfrac38 = 1.125$, *above* both neighbouring values: an overshoot of $12.5\,\%$ of the jump, created at the top of the step. Sanity check: a parabola through $(0, 1, 1)$ must rise above $1$ between the last two points, so the overshoot is a property of quadratic interpolation, not a bug.
:::
:::

## Bounded high-order schemes: TVD and flux limiters

Is there a linear scheme that is both bounded (monotonicity-preserving) and better than first order? Godunov's theorem says no.

::: theorem Godunov's order barrier {#thm-godunov}
A linear numerical scheme for the convection equation that preserves monotonicity — that never creates new extrema from monotone data — can be at most first-order accurate.
:::

The proof, which examines the coefficients a linear monotone scheme must have and shows they cannot satisfy the second-order consistency conditions, is given in Hirsch's and in LeVeque's books. The way out is to make the scheme **nonlinear**: let the scheme itself depend on the solution, adding high-order corrections where the solution is smooth and switching them off near extrema and steep gradients. Harten's **total variation diminishing** (TVD) framework makes this precise: a scheme is TVD if the total variation $\sum_i\lvert\phi_{i+1} - \phi_i\rvert$ never increases, which rules out new wiggles.

::: definition Flux limiter {#def-limiter}
For flow in the $+x$ direction, write the face value as the upwind value plus a limited correction,
$$
\phi_e = \phi_P + \frac{1}{2}\,\psi(r)\,(\phi_E - \phi_P),\qquad r = \frac{\phi_P - \phi_W}{\phi_E - \phi_P},
$$ {#eq-limiter}
where $r$ is the ratio of the upstream to the downstream gradient and $\psi(r) \ge 0$ is the **limiter function**. $\psi = 0$ gives upwind, $\psi = 1$ gives central differencing, and $\psi = r$ gives the second-order linear upwind scheme. Common limiters:

| limiter | $\psi(r)$ for $r > 0$ (all are $0$ for $r \le 0$) |
|---|---|
| minmod | $\min(r, 1)$ |
| van Leer | $\dfrac{r + \lvert r\rvert}{1 + r}$ |
| van Albada | $\dfrac{r + r^2}{1 + r^2}$ |
| superbee | $\max\left[\min(2r, 1),\ \min(r, 2)\right]$ |
:::

The ratio $r$ is a smoothness sensor. In smooth monotone regions $r \approx 1$ and every limiter gives $\psi(1) = 1$, i.e. second-order accuracy. At a local extremum the two gradients have opposite signs, $r < 0$, and $\psi = 0$: the scheme drops to upwind exactly where a wiggle could start. Sweby (1984) showed that a limited scheme of this kind is TVD if $\psi(r)$ lies in the region $0 \le \psi \le \min(2r, 2)$, and second order if in addition $\psi(1) = 1$ with $\psi$ between $r$ and $1$ — minmod forms the lower boundary of that second-order region and superbee the upper one. Minmod is the most diffusive of the TVD limiters, superbee the most compressive (it sharpens fronts but tends to square off smooth peaks); van Leer and van Albada are smooth compromises, and differentiable limiters help the convergence of steady iterations.

::: widget plot
f: max(0, min(x, 1)); (x + abs(x))/(1 + abs(x)); max(0, (x + x^2)/(1 + x^2)); max(0, max(min(2*x, 1), min(x, 2)))
x: -0.5, 3
y: 0, 2.2
labels: \text{minmod}; \text{van Leer}; \text{van Albada}; \text{superbee}
points: 1, 1
caption: Limiter functions $\psi(r)$ against the gradient ratio $r$. All pass through $(1, 1)$, the point of second-order accuracy, and all are zero for $r \le 0$, where the solution has a local extremum and the scheme falls back to upwind. Minmod and superbee bound Sweby's second-order TVD region from below and above. Compare $\psi$ at $r = 3$ (a steepening gradient): minmod keeps the central weight $1$, superbee doubles it to $2$, which is why superbee sharpens fronts and can make smooth peaks look square.
:::

::: example A limited face value {#ex-limiter}
Flow is in the $+x$ direction with $\phi_W = 1$, $\phi_P = 2$, $\phi_E = 4$ (as in [[#ex-quick]]). Compute $r$ and the face value $\phi_e$ with the minmod and van Leer limiters. Repeat for $\phi_W = 3$, $\phi_P = 2$, $\phi_E = 4$.
::: solution
First case: $r = (2 - 1)/(4 - 2) = 0.5$. Minmod: $\psi = 0.5$, $\phi_e = 2 + \tfrac12(0.5)(2) = 2.5$. Van Leer: $\psi = (0.5 + 0.5)/1.5 = 0.667$, $\phi_e = 2 + \tfrac12(0.667)(2) = 2.667$. Both lie between the upwind ($2$) and central ($3$) values, and both are below the QUICK value $2.875$ — limiters are cautious where the gradient changes.

Second case: $\phi_P = 2$ is a local minimum ($r = (2 - 3)/(4 - 2) = -0.5 < 0$), so $\psi = 0$ for both limiters and $\phi_e = \phi_P = 2$: pure upwind, which cannot push the minimum lower. Sanity check: a scheme that interpolated across a minimum with a fixed positive weight on $\phi_E - \phi_P$ would carry the higher value $\phi_E$ into the cell's outflow and the cell would get still lower — the mechanism of a wiggle.
:::
:::

In a code, the limited scheme is implemented, like QUICK, by deferred correction: upwind coefficients in the matrix, the limited correction $\tfrac12\psi(r)(\phi_E - \phi_P)F_e$ in the source, updated each outer iteration. On unstructured meshes the "far upstream" node $W$ does not exist, and $r$ is formed from the reconstructed cell gradient: $r = 2\,(\nabla\phi)_P\cdot\mathbf{d}_{PE}/(\phi_E - \phi_P) - 1$, with $\mathbf{d}_{PE}$ the vector between cell centres. Commercial codes label such options "second-order upwind" (linear reconstruction, often with a gradient limiter), "bounded central" or "TVD/NVD" schemes.

::: application Which scheme in practice?
For steady RANS calculations of industrial flows, a common and defensible practice is: start with first-order upwind for robustness, switch to a second-order bounded scheme (linear upwind with limiting, or a TVD scheme) for momentum, energy and species, and use a bounded scheme also for turbulence quantities, which must stay positive. For large-eddy simulation, where numerical diffusion would swamp the resolved turbulence, central or low-dissipation schemes are used for momentum, with fine meshes keeping $P_\Delta$ moderate. The default "first-order" setting is only for getting started.
:::

::: quiz
A 2D steady calculation of a hot jet entering cold surroundings at $30^\circ$ to the grid lines uses first-order upwind. The predicted jet spreads twice as fast as in the experiment. What is the most likely explanation?
- [ ] Central differencing would have been bounded and accurate.
- [x] Cross-stream numerical diffusion from upwinding on a grid not aligned with the flow; use a bounded second-order scheme and refine.
- [ ] The cell Péclet number is too small.
- [ ] The linear solver has not converged.
::: solution
Upwinding on an oblique grid adds false diffusion across the flow direction, of order $\rho U\Delta x$, which spreads the jet. A bounded higher-order scheme (TVD or limited linear upwind) and a mesh refined or aligned with the jet reduce it. Central differencing would oscillate at high $P_\Delta$; a small $P_\Delta$ would actually help.
:::
:::

::: history
The upwind idea was introduced by Richard Courant, Eugene Isaacson and Mina Rees in 1952 (*Communications on Pure and Applied Mathematics*) for hyperbolic systems. D. Brian Spalding proposed the hybrid scheme in 1972 (*International Journal for Numerical Methods in Engineering*), and Suhas Patankar the power-law scheme in his 1980 book. G. de Vahl Davis and G. D. Mallinson quantified the false diffusion of upwinding in multidimensional flow in 1976 (*Computers & Fluids*). Brian P. Leonard published QUICK in 1979 (*Computer Methods in Applied Mechanics and Engineering*, vol. 19). The order barrier for linear monotone schemes is due to Sergei Godunov (1959). Bram van Leer's five-part series "Towards the ultimate conservative difference scheme" (1973–1979, parts II to V in the *Journal of Computational Physics*) introduced limited high-resolution schemes; Ami Harten defined total variation diminishing schemes in 1983 (*Journal of Computational Physics*); and P. K. Sweby's 1984 paper (*SIAM Journal on Numerical Analysis*) gave the limiter diagram used to compare them.
:::

::: summary
- Steady 1D convection–diffusion has the exact solution [[#eq-exact-cd]]: for large $\mathrm{Pe}$ the change is squeezed into a layer of thickness $\Gamma/(\rho u)$.
- The convection scheme supplies face values; its behaviour is governed by the cell Péclet number $P_\Delta = \rho u\,\delta x/\Gamma$.
- Central differencing is second order but has $a_E < 0$ for $P_\Delta > 2$, giving node-to-node oscillations ($r = (1 + P_\Delta/2)/(1 - P_\Delta/2) < 0$).
- Upwind differencing is bounded and transportive for all $P_\Delta$ but first order, with false diffusion $\tfrac12\rho u\,\delta x$ in 1D and cross-stream false diffusion in 2D/3D.
- Hybrid and power-law schemes mimic the exact exponential scheme in 1D but revert to upwind at high $P_\Delta$.
- QUICK, $\phi_e = \tfrac68\phi_P + \tfrac38\phi_E - \tfrac18\phi_W$, is third order at the face but can overshoot.
- Godunov: linear monotone schemes are at most first order; TVD schemes with limiters $\psi(r)$ are nonlinear, second order in smooth regions and bounded at extrema. Implement them by deferred correction.
:::

## Exercises

::: exercise Cell Péclet number for heat transfer {level=1 check="3571"}
Water ($\alpha = 1.4\times10^{-7}\ \mathrm{m^2/s}$) flows at $u = 0.50\ \mathrm{m/s}$ through cells of length $\delta x = 1.0\ \mathrm{mm}$. Compute the cell Péclet number for the temperature equation. (Enter $P_\Delta$ to the nearest whole number.)
::: solution
$P_\Delta = u\,\delta x/\alpha = 0.50 \times 10^{-3}/1.4\times10^{-7} = 3571$. Central differencing for temperature would need cells about $1800$ times smaller to stay bounded; a bounded scheme is essential.
:::
:::

::: exercise Largest cell for central differencing {level=1 check="0.01"}
A scalar with $\Gamma/\rho = 1.0\times10^{-3}\ \mathrm{m^2/s}$ is convected at $u = 0.20\ \mathrm{m/s}$. Find the largest cell size for which central differencing remains bounded. (Enter $\delta x$ in metres.)
::: solution
$P_\Delta \le 2$ requires $\delta x \le 2(\Gamma/\rho)/u = 2 \times 10^{-3}/0.20 = 0.010\ \mathrm{m}$.
:::
:::

::: exercise A QUICK face value {level=1 check="2.875"}
With flow in the $+x$ direction and $\phi_W = 1$, $\phi_P = 2$, $\phi_E = 4$, compute the QUICK face value at $e$. (Enter $\phi_e$.)
::: solution
$\phi_e = \tfrac68(2) + \tfrac38(4) - \tfrac18(1) = 1.5 + 1.5 - 0.125 = 2.875$.
:::
:::

::: exercise The oscillation ratio {level=2 check="-3"}
For central differencing at $P_\Delta = 4$, find the ratio $r$ in the discrete solution $\phi_i = A + Br^i$ of [[#prop-central-wiggles]]. (Enter $r$.)
::: solution
$r = (1 + 2)/(1 - 2) = -3$: the oscillating part triples in magnitude and flips sign from node to node, so it is dominated by the downstream boundary condition and contaminates the solution backwards from there.
:::
:::

::: exercise A van Leer face value {level=2 check="2.6667"}
With flow in the $+x$ direction and $\phi_W = 1$, $\phi_P = 2$, $\phi_E = 4$, compute the face value from the van Leer limiter. (Enter $\phi_e$ to four decimal places.)
::: solution
$r = 0.5$, $\psi = (0.5 + 0.5)/(1 + 0.5) = 0.6667$, $\phi_e = 2 + \tfrac12(0.6667)(4 - 2) = 2.6667$.
:::
:::

::: exercise False diffusion on an oblique grid {level=2 check="0.00707"}
Uniform flow of a fluid with $\rho = 1.0\ \mathrm{kg/m^3}$ at $U = 2.0\ \mathrm{m/s}$ crosses a square grid ($\Delta x = \Delta y = 10\ \mathrm{mm}$) at $45^\circ$. Use the de Vahl Davis–Mallinson estimate to find the false diffusion coefficient of first-order upwinding. (Enter $\Gamma_{\text{false}}$ in $\mathrm{kg\,m^{-1}\,s^{-1}}$ to three significant figures.)
::: solution
At $\theta = 45^\circ$, $\sin 2\theta = 1$ and $\sin^3\theta = \cos^3\theta = 0.3536$, so $\Gamma_{\text{false}} = \rho U\Delta x^2/(4 \times 2 \times 0.3536\,\Delta x) = \rho U\Delta x/2.828 = 1.0 \times 2.0 \times 0.010/2.828 = 7.07\times10^{-3}\ \mathrm{kg\,m^{-1}\,s^{-1}}$. For air ($\mu = 1.8\times10^{-5}$) this is $390$ times the molecular viscosity.
:::
:::

::: exercise The exponential scheme {level=3}
(a) Show that the exponential scheme, $a_E = F/(e^{P_\Delta} - 1)$, $a_W = a_E e^{P_\Delta}$ with $a_P = a_W + a_E$, reproduces the exact solution [[#eq-exact-cd]] at the nodes of a uniform grid for constant $F$ and $D$. (b) Show that $a_E \to D - F/2$ as $P_\Delta \to 0$ and $a_E \to 0$, $a_W \to F$ as $P_\Delta \to \infty$, and interpret the limits.
::: solution
(a) Try $\phi_i = A + Bs^i$ in $(a_W + a_E)\phi_i = a_W\phi_{i-1} + a_E\phi_{i+1}$: as in [[#prop-central-wiggles]] the roots are $s = 1$ and $s = a_W/a_E = e^{P_\Delta}$. The exact solution at nodes $x_i = i\,\delta x$ is $A' + B'e^{\rho u x_i/\Gamma} = A' + B'(e^{P_\Delta})^i$ since $\rho u\,\delta x/\Gamma = P_\Delta$. The two families coincide; matching boundary values fixes the same constants. (b) $a_E = F/(e^{P} - 1)$ with $F = PD$: $e^P - 1 = P(1 + P/2 + P^2/6 + \dots)$, so $a_E = D(1 - P/2 + P^2/12 - \dots) \to D - F/2$ — central differencing. As $P \to \infty$, $a_E \to 0$ and $a_W = F e^P/(e^P - 1) \to F$ — pure upwinding with diffusion switched off. The hybrid scheme is a three-line approximation to this curve.
:::
:::

::: exercise Scheme selection for a pollutant plume {level=3}
A steady 3D RANS calculation must predict the concentration of a pollutant released from a stack $200\ \mathrm{m}$ upwind of a building, with a concentration limit to be checked at an air intake. The mesh is unstructured with cells of $0.5$–$2\ \mathrm{m}$. Discuss the choice of convection scheme for the concentration equation, the expected errors of first-order upwinding, how you would verify that the prediction is not dominated by numerical diffusion, and the risk of negative concentrations with high-order schemes.
::: solution
A good answer notes: the cell Péclet number based on turbulent diffusivity (perhaps $\nu_t \sim 1\ \mathrm{m^2/s}$ in the atmospheric boundary layer, $u \sim 5\ \mathrm{m/s}$, $\delta x \sim 1\ \mathrm{m}$) is of order $5$ — central differencing is unsafe and upwinding adds false diffusion $\sim\tfrac12 u\,\delta x \approx 2.5\ \mathrm{m^2/s}$, comparable to or larger than the physical turbulent diffusion, so the plume would be spread and its peak concentration underpredicted (non-conservatively for a safety check). Use a bounded second-order scheme (TVD/limited linear upwind); refine the mesh along the plume path and near the intake; compare first- and second-order results and at least two mesh levels — if the intake concentration changes substantially, numerical diffusion is significant. Limiters keep the concentration non-negative; unbounded schemes (QUICK, central) can produce negative concentrations at the plume edges, which must not be clipped silently, since clipping destroys conservation. Validation against wind-tunnel or field data for a similar configuration is advisable.
:::
:::
