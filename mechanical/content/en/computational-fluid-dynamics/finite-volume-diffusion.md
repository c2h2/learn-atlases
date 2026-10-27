Almost every general-purpose CFD code in industrial use — and the open-source OpenFOAM, and the commercial codes built on the methods of Patankar and Spalding — is a **finite-volume** code. The idea is the one stated at the start of [[computational-fluid-dynamics/governing-equations]]: divide the domain into cells, and for every cell write the integral balance [[computational-fluid-dynamics/governing-equations#eq-integral]] exactly, approximating only the *fluxes* through the faces and the *sources* inside. Because the flux leaving one cell through a face is, by construction, the flux entering its neighbour, the discrete equations conserve heat, mass and momentum exactly, cell by cell and over the whole domain, no matter how coarse the mesh. This property — not formal accuracy — is why engineers trust the method.

This lesson develops the finite volume method for the simplest transport process, **diffusion**, using steady and unsteady heat conduction as the running application ([[heat-transfer/steady-conduction]] and [[heat-transfer/transient-conduction]] give the physics). Convection is added in [[computational-fluid-dynamics/convection-diffusion]], and the solution of the resulting linear systems is the subject of [[computational-fluid-dynamics/linear-solvers]]. The notation — nodes $P$, $W$, $E$, $N$, $S$, faces $w$, $e$, $n$, $s$, and coefficients $a$ — is that of Patankar and of Versteeg and Malalasekera, which most of the CFD literature follows.

## The control-volume grid

Picture a rod, a wall or a plate cut into **control volumes** (cells). Each cell has a **node** $P$ at its centre where the unknown $\phi_P$ is stored; its neighbours to the west and east are $W$ and $E$, and the faces it shares with them are $w$ and $e$. The distances between nodes are $\delta x_{WP}$ and $\delta x_{PE}$, and the cell width is $\Delta x$. In this **cell-centred** arrangement the domain boundary coincides with cell faces, and the first node lies half a cell inside the boundary. (The alternative, **vertex-centred** arrangement puts nodes on the boundary; both are used, and the formulas differ only at boundaries.)

Throughout, the governing equation is steady diffusion with a source,
$$
\nabla\cdot(\Gamma\nabla\phi) + S = 0,
$$ {#eq-diffusion}
which for heat conduction is $\nabla\cdot(k\nabla T) + \dot q = 0$ with $\phi = T$, $\Gamma = k$ (in $\mathrm{W\,m^{-1}\,K^{-1}}$) and $S = \dot q$ (in $\mathrm{W/m^3}$).

## One-dimensional steady diffusion

::: proposition The discretised diffusion equation {#prop-fv-1d}
Integrate $\dfrac{\mathrm{d}}{\mathrm{d}x}\left(\Gamma\,\dfrac{\mathrm{d}\phi}{\mathrm{d}x}\right) + S = 0$ over a control volume of face area $A$ and volume $\Delta V = A\,\Delta x$. Approximating the face gradients by central differences between nodes and the source by a linear function of $\phi_P$, $\bar S\,\Delta V = S_u + S_P\phi_P$, gives
$$
a_P\,\phi_P = a_W\,\phi_W + a_E\,\phi_E + S_u,
$$ {#eq-fv-1d}
$$
a_W = \frac{\Gamma_w A_w}{\delta x_{WP}},\qquad a_E = \frac{\Gamma_e A_e}{\delta x_{PE}},\qquad a_P = a_W + a_E - S_P .
$$ {#eq-fv-coeffs}
:::

::: proof
Integrating over the cell, the divergence theorem (here simply the fundamental theorem of calculus) turns the volume integral of the diffusion term into the difference of the face fluxes:
$$
\left(\Gamma A\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)_e - \left(\Gamma A\frac{\mathrm{d}\phi}{\mathrm{d}x}\right)_w + \int_{\Delta V} S\,\mathrm{d}V = 0 .
$$
This is exact. The approximations are two. (i) Assume $\phi$ varies linearly between neighbouring nodes, so the face gradients are $(\mathrm{d}\phi/\mathrm{d}x)_e \approx (\phi_E - \phi_P)/\delta x_{PE}$ and $(\mathrm{d}\phi/\mathrm{d}x)_w \approx (\phi_P - \phi_W)/\delta x_{WP}$. (ii) Write the cell-averaged source as $S_u + S_P\phi_P$. Substituting,
$$
\Gamma_e A_e\frac{\phi_E - \phi_P}{\delta x_{PE}} - \Gamma_w A_w\frac{\phi_P - \phi_W}{\delta x_{WP}} + S_u + S_P\phi_P = 0,
$$
and collecting the $\phi_P$ terms on the left gives [[#eq-fv-1d]] with the coefficients [[#eq-fv-coeffs]]. On a uniform grid with constant $\Gamma$ and no source, this is $\Gamma A/\Delta x$ times the central second difference of [[computational-fluid-dynamics/finite-differences#eq-basic-fd]]; the two methods differ in derivation, in the treatment of variable properties and boundaries, and in their conservation properties, not in the interior formula.
:::

Each coefficient is a **conductance**: $a_E$ is the heat flow from $E$ to $P$ per kelvin of temperature difference, $\Gamma_e A_e/\delta x_{PE}$, exactly like the thermal resistance network of [[heat-transfer/steady-conduction]]. Equation [[#eq-fv-1d]] then says that $\phi_P$ is a weighted average of its neighbours plus a source contribution — the discrete version of the fact that a diffusion equation has no interior maxima unless there is a source.

### Boundaries

At a boundary face where $\phi_B$ is given (a **Dirichlet** condition), the flux through the face is approximated across the half cell from the boundary to the first node, distance $\Delta x/2$:
$$
\text{flux in at the west boundary} = \Gamma_B A\,\frac{\phi_P - \phi_B}{\Delta x/2}\ \text{(as a gradient)}\quad\Longrightarrow\quad
a_W = 0,\quad S_P \mathrel{-}= \frac{2\Gamma_B A}{\Delta x},\quad S_u \mathrel{+}= \frac{2\Gamma_B A}{\Delta x}\phi_B .
$$
The boundary link is cut ($a_W = 0$) and its effect moved into the source. Where the flux $q_B$ into the domain is given (a **Neumann** condition), $a_W = 0$ and $S_u \mathrel{+}= q_B A$; an insulated boundary simply has $a_W = 0$ and nothing else. A **convective** (Robin) condition, heat transfer coefficient $h$ to a fluid at $T_\infty$, puts the convective resistance $1/(hA)$ in series with the half-cell conduction resistance $\Delta x/(2kA)$:
$$
S_P \mathrel{-}= U A,\qquad S_u \mathrel{+}= U A\,T_\infty,\qquad U = \left(\frac{1}{h} + \frac{\Delta x}{2k}\right)^{-1}.
$$ {#eq-robin}

::: example Conduction in a rod with fixed end temperatures {#ex-rod}
A rod of length $0.50\ \mathrm{m}$ and cross-section $A = 0.010\ \mathrm{m^2}$, conductivity $k = 1000\ \mathrm{W\,m^{-1}\,K^{-1}}$ and insulated sides, has its ends held at $T_A = 100\,^\circ\mathrm{C}$ and $T_B = 500\,^\circ\mathrm{C}$. Using five equal control volumes, set up and solve the discrete equations, and find the heat flow.
::: solution
$\Delta x = 0.10\ \mathrm{m}$, so every interior conductance is $kA/\Delta x = 1000 \times 0.010/0.10 = 100\ \mathrm{W/K}$, and the boundary half-cell conductance is $2kA/\Delta x = 200\ \mathrm{W/K}$. The coefficients:

| node | $a_W$ | $a_E$ | $S_P$ | $S_u$ | $a_P$ |
|---|---|---|---|---|---|
| 1 | 0 | 100 | $-200$ | $200 \times 100 = 20\,000$ | 300 |
| 2, 3, 4 | 100 | 100 | 0 | 0 | 200 |
| 5 | 100 | 0 | $-200$ | $200 \times 500 = 100\,000$ | 300 |

The tridiagonal system $300T_1 - 100T_2 = 20\,000$, $-100T_{i-1} + 200T_i - 100T_{i+1} = 0$, $-100T_4 + 300T_5 = 100\,000$ has the solution
$$
T = (140,\ 220,\ 300,\ 380,\ 460)\ ^\circ\mathrm{C}
$$
at $x = 0.05, 0.15, \dots, 0.45\ \mathrm{m}$ — exactly the linear profile $T = 100 + 800x$. The heat flow through every face is the same, e.g. $100 \times (220 - 140) = 8000\ \mathrm{W}$ between nodes 1 and 2 and $200 \times (140 - 100) = 8000\ \mathrm{W}$ through the left boundary, in agreement with $kA\,\Delta T/L = 1000 \times 0.010 \times 400/0.50 = 8000\ \mathrm{W}$. Sanity check: with no source the exact profile is linear, which the linear-interpolation assumption reproduces exactly, and conservation is exact face by face.
:::
:::

::: example A wall with heat generation {#ex-generation}
A plane wall of thickness $L = 20\ \mathrm{mm}$ and conductivity $k = 0.50\ \mathrm{W\,m^{-1}\,K^{-1}}$ generates heat uniformly at $\dot q = 1.0\times10^{6}\ \mathrm{W/m^3}$; its faces are held at $T_A = 100\,^\circ\mathrm{C}$ and $T_B = 200\,^\circ\mathrm{C}$. Solve with five control volumes (per unit area) and compare with the exact solution $T(x) = T_A + \left[\dfrac{T_B - T_A}{L} + \dfrac{\dot q}{2k}(L - x)\right]x$.
::: solution
$\Delta x = 4.0\ \mathrm{mm}$, $k/\Delta x = 125\ \mathrm{W\,m^{-2}\,K^{-1}}$, boundary conductance $2k/\Delta x = 250$, and the source in every cell is $S_u = \dot q\,\Delta x = 4000\ \mathrm{W/m^2}$. Node 1: $a_P = 125 + 250 = 375$, $S_u = 4000 + 250 \times 100 = 29\,000$; nodes 2–4: $a_P = 250$, $S_u = 4000$; node 5: $a_P = 375$, $S_u = 4000 + 250 \times 200 = 54\,000$. The solution, and the exact values at the nodes:

| $x$ / mm | 2 | 6 | 10 | 14 | 18 |
|---|---|---|---|---|---|
| FV $T$ / °C | 150 | 218 | 254 | 258 | 230 |
| exact $T$ / °C | 146 | 214 | 250 | 254 | 226 |

Every node is exactly $4\,^\circ\mathrm{C}$ too high. The interior equations are exact for a parabola (the central second difference of a quadratic has no error); the error comes entirely from the two boundary half cells, where the profile was assumed linear over distance $\Delta x/2$ but is actually parabolic. Its size is the parabolic sag over the half cell, $\dot q(\Delta x/2)^2/(2k) = 10^6 \times (2\times10^{-3})^2/1.0 = 4\ ^\circ\mathrm{C}$, which falls as $\Delta x^2$: with ten cells the error would be $1\ ^\circ\mathrm{C}$. Sanity check: an energy balance on the FV solution — total generation $\dot q L = 20\,000\ \mathrm{W/m^2}$ must leave through the two faces: $250(150 - 100) + 250(230 - 200) = 12\,500 + 7500 = 20\,000\ \mathrm{W/m^2}$. Exactly conserved, though the temperatures are slightly off.
:::
:::

The last sentence of that example is the finite-volume method in a nutshell: the discrete solution can be inaccurate, but it cannot lose or create heat.

### Interface conductivity in composite materials

When $\Gamma$ varies from cell to cell — a composite wall, a solid–fluid interface, an insulated pipe — the face value $\Gamma_e$ in [[#eq-fv-coeffs]] must be chosen with care. The obvious choice, the arithmetic mean $\tfrac12(\Gamma_P + \Gamma_E)$, is wrong.

::: proposition Harmonic-mean interface conductivity {#prop-harmonic}
Let the face $e$ lie a distance $\delta x_{e^-}$ from $P$ and $\delta x_{e^+}$ from $E$, with uniform conductivities $\Gamma_P$ and $\Gamma_E$ on the two sides. The face value that gives the exact steady flux for a piecewise-linear profile without source is
$$
\frac{\delta x_{PE}}{\Gamma_e} = \frac{\delta x_{e^-}}{\Gamma_P} + \frac{\delta x_{e^+}}{\Gamma_E},
\qquad\text{so for a midway face}\qquad \Gamma_e = \frac{2\Gamma_P\Gamma_E}{\Gamma_P + \Gamma_E}.
$$ {#eq-harmonic}
:::

::: proof
In steady one-dimensional diffusion without source, the flux $q_e$ is the same on both sides of the face. On the $P$ side, $q_e = \Gamma_P(\phi_P - \phi_e)/\delta x_{e^-}$; on the $E$ side, $q_e = \Gamma_E(\phi_e - \phi_E)/\delta x_{e^+}$. Solving each for a temperature difference and adding eliminates the unknown face value:
$$
\phi_P - \phi_E = q_e\left(\frac{\delta x_{e^-}}{\Gamma_P} + \frac{\delta x_{e^+}}{\Gamma_E}\right).
$$
Defining $\Gamma_e$ by $q_e = \Gamma_e(\phi_P - \phi_E)/\delta x_{PE}$ gives [[#eq-harmonic]]. It is the series-resistance law: resistances add, not conductivities.
:::

The harmonic mean has the right limits. If one material is a perfect insulator ($\Gamma_E \to 0$), $\Gamma_e \to 0$ and no heat crosses, as it should; the arithmetic mean would give $\tfrac12\Gamma_P$ and let heat stream through the insulation. If $\Gamma_E \to \infty$, $\Gamma_e \to 2\Gamma_P$: all the resistance lies in the half cell on the $P$ side, which has half the length of $\delta x_{PE}$.

::: example Steel against insulation {#ex-composite}
Two adjacent cells with nodes $10\ \mathrm{mm}$ apart and the interface midway contain steel ($k = 50\ \mathrm{W\,m^{-1}\,K^{-1}}$) and mineral-wool insulation ($k = 0.050\ \mathrm{W\,m^{-1}\,K^{-1}}$). The node temperatures are $200\,^\circ\mathrm{C}$ and $100\,^\circ\mathrm{C}$. Compute the face heat flux with harmonic and arithmetic interface conductivities, and the exact flux.
::: solution
Harmonic: $k_e = 2 \times 50 \times 0.050/50.05 = 0.0999\ \mathrm{W\,m^{-1}\,K^{-1}}$, so $q = 0.0999 \times 100/0.010 = 999\ \mathrm{W/m^2}$. Exact (series resistances of $5\ \mathrm{mm}$ of each material): $R = 0.005/50 + 0.005/0.050 = 1.0\times10^{-4} + 0.100 = 0.1001\ \mathrm{m^2K/W}$, $q = 100/0.1001 = 999\ \mathrm{W/m^2}$ — identical, as the proposition guarantees. Arithmetic: $k_e = 25.03\ \mathrm{W\,m^{-1}\,K^{-1}}$ and $q = 2.50\times10^{5}\ \mathrm{W/m^2}$, $250$ times too large. Sanity check: almost all of the resistance is in the insulation, so the flux should be close to $0.050 \times 100/0.005 = 1000\ \mathrm{W/m^2}$; only the harmonic mean is.
:::
:::

::: widget plot
f: 2*x/(1 + x); (1 + x)/2
x: 0, 1
y: 0, 1.05
labels: \text{harmonic } k_e/k_P; \text{arithmetic } k_e/k_P
caption: Interface conductivity $k_e$, as a fraction of the larger conductivity $k_P$, against the conductivity ratio $k_E/k_P$ for a face midway between nodes. The two means agree when the materials are equal ($k_E/k_P = 1$) and diverge as the contrast grows: at a ratio of $0.01$ the harmonic mean is $0.02$ while the arithmetic mean is still $0.505$, a factor of $25$ too high. Real contrasts (metal against polymer, solid against gas) are often $10^{-3}$ or less, where only the harmonic mean is usable.
:::

### Sources and their linearisation

Many sources depend on the unknown: heat loss from a fin surface, $-hP(T - T_\infty)/A$ per unit volume; radiation, $-\varepsilon\sigma(T^4 - T_\infty^4)$; reaction rates. Writing $\bar S\,\Delta V = S_u + S_P\phi_P$ lets the part proportional to $\phi_P$ join the diagonal coefficient $a_P = a_W + a_E - S_P$. The sign matters.

::: definition Patankar's basic rules {#def-patankar-rules}
A discretisation of the form $a_P\phi_P = \sum_{nb} a_{nb}\phi_{nb} + S_u$ is physically realistic and robust if:
1. **Consistency at faces:** the flux through a face is given by the same expression in the two cells that share it (conservation).
2. **Positive coefficients:** all $a_{nb} \ge 0$ and $a_P > 0$, so that an increase of a neighbour value cannot decrease $\phi_P$.
3. **Negative-slope linearisation of the source:** $S_P \le 0$, so that the source never reduces $a_P$ below $\sum a_{nb}$.
4. **Sum of the neighbour coefficients:** $a_P = \sum a_{nb}$ when there is no source, so that $\phi$ and $\phi + \text{const}$ both satisfy the equation, as they satisfy the differential equation.
:::

Rule 3 is a statement about iteration as much as physics: a source that grows with $\phi$ (positive $S_P$) put on the diagonal can make $a_P$ smaller than $\sum a_{nb}$ or even negative, destroying the diagonal dominance on which the iterative solvers of [[computational-fluid-dynamics/linear-solvers]] rely. A source that genuinely increases with $\phi$ is kept in $S_u$, evaluated at the latest iterate. For a nonlinear decreasing source such as radiation, the tangent at the current iterate $\phi^\ast$ is the best choice:
$$
S(\phi) \approx S(\phi^\ast) + \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}(\phi_P - \phi^\ast)
\quad\Longrightarrow\quad
S_P = \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}\Delta V,\qquad S_u = \left(S^\ast - \left.\frac{\mathrm{d}S}{\mathrm{d}\phi}\right|_{\phi^\ast}\phi^\ast\right)\Delta V .
$$ {#eq-linearise}

::: example A cooling fin with source linearisation {#ex-fin}
A pin fin of length $L = 1.0\ \mathrm{m}$ (long, to keep the numbers simple) obeys $\dfrac{\mathrm{d}^2T}{\mathrm{d}x^2} - n^2(T - T_\infty) = 0$ with $n^2 = hP/(kA) = 25\ \mathrm{m^{-2}}$, base temperature $T_b = 100\,^\circ\mathrm{C}$ at $x = 0$, ambient $T_\infty = 20\,^\circ\mathrm{C}$ and an insulated tip. Solve with five control volumes and compare with the exact solution $\dfrac{T - T_\infty}{T_b - T_\infty} = \dfrac{\cosh n(L - x)}{\cosh nL}$.
::: solution
Divide the equation by $kA$, so the "conductance" is $1/\Delta x = 5\ \mathrm{m^{-1}}$ with $\Delta x = 0.2\ \mathrm{m}$. The convective source per cell, $-n^2(T_P - T_\infty)\Delta x$, splits as $S_P = -n^2\Delta x = -5$ and $S_u = n^2\Delta x\,T_\infty = 100$ — a negative slope, as rule 3 requires. Node 1 also has the base: $S_P \mathrel{-}= 2/\Delta x = 10$, $S_u \mathrel{+}= 10 \times 100 = 1000$. Node 5 has the insulated tip: $a_E = 0$. Hence

| node | $a_W$ | $a_E$ | $a_P$ | $S_u$ |
|---|---|---|---|---|
| 1 | 0 | 5 | 20 | 1100 |
| 2–4 | 5 | 5 | 15 | 100 |
| 5 | 5 | 0 | 10 | 100 |

Solving:

| $x$ / m | 0.1 | 0.3 | 0.5 | 0.7 | 0.9 |
|---|---|---|---|---|---|
| FV $T$ / °C | 64.23 | 36.91 | 26.50 | 22.60 | 21.30 |
| exact $T$ / °C | 68.53 | 37.87 | 26.61 | 22.54 | 21.22 |

The FV excess temperature is $9\,\%$ low at the first node and $7\,\%$ high at the last: five cells are too few for a profile that falls by a factor $e^{-1}$ every $1/n = 0.2\ \mathrm{m}$, i.e. every cell. The heat flow into the fin from the base, per unit $kA$, is $(2/\Delta x)(T_b - T_1) = 10 \times 35.77 = 357.7\ \mathrm{K/m}$ against the exact $n(T_b - T_\infty)\tanh nL = 400.0\ \mathrm{K/m}$, $11\,\%$ low. Sanity check: the energy balance of the discrete solution holds exactly — the base heat flow equals $\sum_i n^2\Delta x(T_i - T_\infty) = 5 \times 71.55 = 357.7$ — and refining to $20$ cells brings the base heat flow to $396.9\ \mathrm{K/m}$, within $0.8\,\%$ — the error falls roughly as $\Delta x^2$ ($3.0\,\%$ at $10$ cells, $0.77\,\%$ at $20$).
:::
:::

::: widget plot
f: 20 + 80*cosh(n*(1 - x))/cosh(n)
x: 0, 1
y: 0, 105
sliders: n=5:0.5:10:0.5
points: 0.1, 64.23; 0.3, 36.91; 0.5, 26.50; 0.7, 22.60; 0.9, 21.30
caption: Exact temperature along the fin of the example (in °C, against $x$ in m), with the fin parameter $n = \sqrt{hP/kA}$ on the slider; the dots are the five-cell finite-volume solution for $n = 5\ \mathrm{m^{-1}}$. At $n = 5$ the dots fall below the curve near the base, where the curvature is greatest. Raise $n$ (better convection, thinner fin) and the profile collapses into a thin layer near the base — the same grid would be hopeless. Resolution must follow the length scale $1/n$, not the size of the object.
:::

::: algorithm Assembling a finite-volume diffusion model {#alg-fv-assembly}
1. **Mesh.** Divide the domain into cells with faces on every material interface and boundary; record each cell's volume, face areas and node-to-node distances.
2. **Face conductances.** For every interior face compute $a = \Gamma_fA_f/\delta$, with $\Gamma_f$ from the series-resistance rule [[#eq-harmonic]]; store it once and use it for both cells.
3. **Sources.** Linearise each cell's source as $S_u + S_P\phi_P$ with $S_P \le 0$, using [[#eq-linearise]] for nonlinear sources.
4. **Boundaries.** Cut each boundary link and add its effect to $S_u$ and $S_P$: half-cell conductance $2\Gamma A/\Delta x$ for a fixed value, the given flux for a Neumann face, $UA$ from [[#eq-robin]] for a convective face.
5. **Assemble** $a_P = \sum a_{nb} - S_P$ (plus $a_P^0$ for a transient) and check that every coefficient is positive.
6. **Solve** the linear system ([[computational-fluid-dynamics/linear-solvers]]); if the sources are nonlinear, update the linearisation and repeat until the change in $\phi$ is negligible.
7. **Check** the global balance: total source equals net boundary outflow to round-off.
:::

## Two and three dimensions

On a rectangular grid in two dimensions, integrating [[#eq-diffusion]] over a cell of size $\Delta x \times \Delta y$ (unit depth) adds a north and a south flux:
$$
a_P\phi_P = a_W\phi_W + a_E\phi_E + a_S\phi_S + a_N\phi_N + S_u,\qquad
a_N = \frac{\Gamma_n\Delta x}{\delta y_{PN}},\quad a_S = \frac{\Gamma_s\Delta x}{\delta y_{SP}},
$$ {#eq-fv-2d}
with $a_W = \Gamma_w\Delta y/\delta x_{WP}$, $a_E = \Gamma_e\Delta y/\delta x_{PE}$ and $a_P = a_W + a_E + a_S + a_N - S_P$. Three dimensions add top and bottom neighbours: seven-point stencils. The matrix is no longer tridiagonal but **pentadiagonal** (2D) or **heptadiagonal** (3D) on a structured grid, and simply sparse on an unstructured one.

On an unstructured mesh the same integral is a sum over the faces $f$ of the cell, $\sum_f \Gamma_f(\nabla\phi)_f\cdot\mathbf{S}_f + \bar S\,\Delta V = 0$, where $\mathbf{S}_f$ is the outward face-area vector. The two-point approximation $(\nabla\phi)_f\cdot\mathbf{S}_f \approx \lvert\mathbf{S}_f\rvert(\phi_N - \phi_P)/\lvert\mathbf{d}_{PN}\rvert$ is exact only when the line $\mathbf{d}_{PN}$ joining the two cell centres is parallel to $\mathbf{S}_f$ (an **orthogonal** mesh). Otherwise a **non-orthogonal correction**, computed explicitly from reconstructed cell gradients, must be added; it does not enter the matrix, keeps the coefficients positive, and is converged by iteration. Mesh non-orthogonality is one of the quality measures discussed in [[computational-fluid-dynamics/meshing-verification]].

## Unsteady diffusion

For transient conduction, $\rho c\,\partial T/\partial t = \nabla\cdot(k\nabla T) + \dot q$, integrate also over a time step from $t$ to $t + \Delta t$. The storage term becomes $\rho c(T_P - T_P^0)\Delta V$, where the superscript $0$ marks the old time level; the fluxes must be evaluated at some time within the step. With a weight $\theta$ between old and new values ($\theta = 0$ explicit, $\tfrac12$ Crank–Nicolson, $1$ fully implicit), in one dimension:
$$
a_P T_P = a_W\left[\theta T_W + (1 - \theta)T_W^0\right] + a_E\left[\theta T_E + (1 - \theta)T_E^0\right] + \left[a_P^0 - (1 - \theta)(a_W + a_E)\right]T_P^0 + b,
$$ {#eq-fv-transient}
$$
a_P^0 = \frac{\rho c\,\Delta x}{\Delta t},\qquad a_P = \theta(a_W + a_E) + a_P^0 .
$$
The coefficient of $T_P^0$ in the explicit case ($\theta = 0$) is $a_P^0 - a_W - a_E$. Patankar's rule 2 requires it to be non-negative: $\rho c\Delta x/\Delta t \ge 2k/\Delta x$, i.e. $\Delta t \le \rho c\,\Delta x^2/(2k)$ — the FTCS limit $d \le \tfrac12$ of [[computational-fluid-dynamics/stability-accuracy#prop-heat-stability]], now derived from positivity. Crank–Nicolson ($\theta = \tfrac12$) has coefficient $a_P^0 - \tfrac12(a_W + a_E)$, positive only for $d \le 1$; for larger steps it remains stable but can oscillate. The fully implicit scheme has all coefficients positive for every $\Delta t$, which is why it is the default in most commercial codes despite being only first-order accurate in time.

::: example One implicit step for a cooling plate {#ex-transient}
A plate $20\ \mathrm{mm}$ thick ($k = 10\ \mathrm{W\,m^{-1}\,K^{-1}}$, $\rho c = 1.0\times10^{7}\ \mathrm{J\,m^{-3}\,K^{-1}}$) is uniformly at $200\,^\circ\mathrm{C}$. At $t = 0$ its east face is suddenly held at $0\,^\circ\mathrm{C}$; the west face is insulated. With five control volumes, find (a) the largest stable explicit time step, and (b) the temperatures after one fully implicit step of $\Delta t = 2\ \mathrm{s}$.
::: solution
$\Delta x = 4.0\ \mathrm{mm}$, $a_W = a_E = k/\Delta x = 2500\ \mathrm{W\,m^{-2}\,K^{-1}}$, boundary conductance at the east face $2k/\Delta x = 5000$, and $a_P^0 = \rho c\Delta x/\Delta t$.

(a) Explicit: interior cells need $a_P^0 \ge 2 \times 2500$, i.e. $\Delta t \le \rho c\Delta x^2/(2k) = 10^7 \times 1.6\times10^{-5}/20 = 8.0\ \mathrm{s}$. The east cell is tighter: it needs $a_P^0 \ge 2500 + 5000$, so $\Delta t \le \rho c\Delta x/7500 = 4\times10^{4}/7500 = 5.33\ \mathrm{s}$, because its node lies only half a cell from the cold boundary.

(b) Implicit with $\Delta t = 2\ \mathrm{s}$: $a_P^0 = 10^7 \times 0.004/2 = 2.0\times10^{4}$. Node 1 (insulated west): $a_P = 2500 + 20\,000 = 22\,500$; nodes 2–4: $a_P = 25\,000$; node 5: $a_P = 2500 + 5000 + 20\,000 = 27\,500$ with the boundary term $5000 \times 0 = 0$. Every right-hand side is $a_P^0 T^0 = 4.0\times10^{6}$. Solving the tridiagonal system,
$$
T = (199.996,\ 199.962,\ 199.625,\ 196.292,\ 163.299)\ ^\circ\mathrm{C}.
$$
Sanity check: the cooling has reached every node (an implicit method propagates information through the whole domain in one step), most strongly near the cold face, and no value exceeds $200\,^\circ\mathrm{C}$ or falls below $0\,^\circ\mathrm{C}$. The heat lost in the step, $\rho c\Delta x\sum(T^0 - T) = 4\times10^4 \times 40.83 = 1.633\times10^{6}\ \mathrm{J/m^2}$, equals $\Delta t \times 5000 \times 163.299 = 1.633\times10^{6}\ \mathrm{J/m^2}$ through the east face: exact conservation again.
:::
:::

::: warning Half-cell boundaries and the wrong distance
The most common hand-coding error in finite-volume conduction is to use the full cell width $\Delta x$, instead of $\Delta x/2$, as the distance from a boundary face to the first node of a cell-centred grid. The coefficient is then half what it should be, the boundary resistance doubles, and heat fluxes through Dirichlet boundaries come out too small — by a margin that does *not* vanish with refinement when expressed as a boundary resistance per cell. Equally common: using the boundary *node* temperature in a convective condition as if it were the surface temperature, ignoring the $\Delta x/(2k)$ term of [[#eq-robin]]. Always check the overall energy balance of the converged solution: sources must equal the net boundary heat flow to round-off.
:::

::: quiz
In a finite-volume conduction model, a cell of copper ($k = 400\ \mathrm{W\,m^{-1}\,K^{-1}}$) borders a cell of air ($k = 0.026\ \mathrm{W\,m^{-1}\,K^{-1}}$), face midway. Which interface conductivity should the code use, approximately?
- [ ] $200\ \mathrm{W\,m^{-1}\,K^{-1}}$
- [ ] $103\ \mathrm{W\,m^{-1}\,K^{-1}}$ (the geometric mean)
- [x] $0.052\ \mathrm{W\,m^{-1}\,K^{-1}}$
- [ ] $0.026\ \mathrm{W\,m^{-1}\,K^{-1}}$
::: solution
The harmonic mean $2k_Pk_E/(k_P + k_E) = 2 \times 400 \times 0.026/400.026 = 0.052\ \mathrm{W\,m^{-1}\,K^{-1}}$. Almost all of the resistance lies in the air half cell, whose conductance is $k_{\text{air}}/(\Delta x/2)$; written with the full node spacing that is $2k_{\text{air}}/\Delta x$, hence twice the air value.
:::
:::

::: history
The control-volume formulation grew out of the Imperial College group of D. Brian Spalding in the late 1960s. The book *Heat and Mass Transfer in Recirculating Flows* by A. D. Gosman, W. M. Pun, A. K. Runchal, D. B. Spalding and M. Wolfshtein (Academic Press, 1969) presented a finite-difference method derived from control-volume balances for recirculating flows. Suhas V. Patankar, who had worked with Spalding, set out the method in its now-standard form — the coefficient notation, the four basic rules, the harmonic mean for interface conductivity and source linearisation — in *Numerical Heat Transfer and Fluid Flow* (Hemisphere/McGraw-Hill, 1980), which remains one of the most widely read books on CFD. The method was later extended to unstructured meshes of arbitrary polyhedra, the form used by most current general-purpose codes.
:::

::: summary
- The finite volume method integrates the conservation law over each cell exactly and approximates only face fluxes and cell sources, so it conserves to round-off on any mesh.
- 1D diffusion: $a_P\phi_P = a_W\phi_W + a_E\phi_E + S_u$ with conductances $a_{nb} = \Gamma_f A_f/\delta x$ and $a_P = \sum a_{nb} - S_P$.
- Dirichlet boundaries use a half-cell conductance $2\Gamma A/\Delta x$ moved into the source; Neumann boundaries add a flux; convective boundaries combine $1/h$ and $\Delta x/(2k)$ in series.
- Interface conductivity between different materials is the harmonic mean (series resistances), never the arithmetic mean.
- Linearise sources as $S_u + S_P\phi_P$ with $S_P \le 0$; keep all coefficients positive (Patankar's four rules).
- Unsteady terms add $a_P^0 = \rho c\Delta x/\Delta t$; explicit schemes need $a_P^0 \ge \sum a_{nb}$ (the stability limit as a positivity condition, tightest at boundary cells); fully implicit is positive for all $\Delta t$.
- Interior errors are small; boundary half cells and steep gradients ($1/n$ for fins) govern the accuracy.
:::

## Exercises

::: exercise A neighbour coefficient {level=1 check="20"}
An aluminium-alloy bar ($k = 200\ \mathrm{W\,m^{-1}\,K^{-1}}$) with cross-section $A = 1.0\times10^{-3}\ \mathrm{m^2}$ is divided into cells $10\ \mathrm{mm}$ long. Find the interior neighbour coefficient $a_E$. (Enter it in W/K.)
::: solution
$a_E = kA/\delta x = 200 \times 10^{-3}/0.010 = 20\ \mathrm{W/K}$: a temperature difference of $1\ \mathrm{K}$ between adjacent nodes drives $20\ \mathrm{W}$ along the bar.
:::
:::

::: exercise Interface conductivity {level=1 check="0.8"}
Two cells of equal width contain materials with $k = 0.50$ and $k = 2.0\ \mathrm{W\,m^{-1}\,K^{-1}}$. Find the interface conductivity to use with the node spacing. (Enter it in $\mathrm{W\,m^{-1}\,K^{-1}}$.)
::: solution
$k_e = 2 \times 0.50 \times 2.0/(0.50 + 2.0) = 2.0/2.5 = 0.80\ \mathrm{W\,m^{-1}\,K^{-1}}$, compared with an arithmetic mean of $1.25$.
:::
:::

::: exercise A convective boundary conductance {level=1 check="20"}
A cell-centred mesh has $\Delta x = 20\ \mathrm{mm}$ next to a wall of conductivity $k = 1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$ cooled by air with $h = 25\ \mathrm{W\,m^{-2}\,K^{-1}}$. Find the overall boundary conductance $U$ of [[#eq-robin]]. (Enter $U$ in $\mathrm{W\,m^{-2}\,K^{-1}}$.)
::: solution
$U = 1/(1/h + \Delta x/2k) = 1/(0.040 + 0.010) = 20\ \mathrm{W\,m^{-2}\,K^{-1}}$. The half-cell conduction resistance is a fifth of the total here; ignoring it would overestimate the heat loss by $25\,\%$.
:::
:::

::: exercise Three cells with generation {level=2 check="1.25"}
A slab $0.30\ \mathrm{m}$ thick with $k = 10\ \mathrm{W\,m^{-1}\,K^{-1}}$ and uniform generation $\dot q = 1000\ \mathrm{W/m^3}$ has both faces at $0\,^\circ\mathrm{C}$. Solve with three equal control volumes and compare the centre temperature with the exact value $\dot qL^2/(8k)$. (Enter the finite-volume centre temperature in °C.)
::: solution
$\Delta x = 0.10\ \mathrm{m}$, $k/\Delta x = 100$, boundary conductance $200$, source $S_u = 1000 \times 0.10 = 100$ per cell. Equations: $300T_1 - 100T_2 = 100$, $-100T_1 + 200T_2 - 100T_3 = 100$, $-100T_2 + 300T_3 = 100$. By symmetry $T_1 = T_3$: $300T_1 - 100T_2 = 100$ and $-200T_1 + 200T_2 = 100$ give $T_1 = 0.75$, $T_2 = 1.25\,^\circ\mathrm{C}$. Exact: $1000 \times 0.09/80 = 1.125\,^\circ\mathrm{C}$ at the centre and $0.625\,^\circ\mathrm{C}$ at $x = 0.05\ \mathrm{m}$. Each node is too high by $\dot q(\Delta x/2)^2/(2k) = 0.125\,^\circ\mathrm{C}$, the boundary half-cell error found in [[#ex-generation]].
:::
:::

::: exercise Linearising a radiation source {level=2 check="-22.68"}
A surface cell loses heat by radiation, $S = -\varepsilon\sigma(T^4 - T_\infty^4)$ per unit area, with $\varepsilon = 0.80$, $\sigma = 5.67\times10^{-8}\ \mathrm{W\,m^{-2}\,K^{-4}}$ and $T_\infty = 300\ \mathrm{K}$. Linearise about the current iterate $T^\ast = 500\ \mathrm{K}$ using [[#eq-linearise]]. (Enter $S_P$ per unit area in $\mathrm{W\,m^{-2}\,K^{-1}}$.)
::: solution
$\mathrm{d}S/\mathrm{d}T = -4\varepsilon\sigma T^{\ast3} = -4 \times 0.80 \times 5.67\times10^{-8} \times 1.25\times10^{8} = -22.68\ \mathrm{W\,m^{-2}\,K^{-1}}$, so $S_P = -22.68$ (negative, as rule 3 requires) and $S_u = S^\ast - S_P T^\ast = \varepsilon\sigma(3T^{\ast4} + T_\infty^4) = 0.8 \times 5.67\times10^{-8} \times (1.875\times10^{11} + 8.1\times10^{9}) = 8872\ \mathrm{W/m^2}$. Check: at $T = T^\ast$, $S_u + S_PT^\ast = 8872 - 11\,340 = -2468\ \mathrm{W/m^2}$, equal to $-0.8 \times 5.67\times10^{-8}(500^4 - 300^4)$.
:::
:::

::: exercise Explicit limit with a convective boundary {level=2 check="80"}
A 1D explicit finite-volume model of a wall ($k = 1.0\ \mathrm{W\,m^{-1}\,K^{-1}}$, $\rho c = 2.0\times10^{6}\ \mathrm{J\,m^{-3}\,K^{-1}}$, $\Delta x = 10\ \mathrm{mm}$) has a boundary cell with one interior neighbour and a convective face with $h = 600\ \mathrm{W\,m^{-2}\,K^{-1}}$. Using the positivity condition on the coefficient of $T_P^0$, find the largest time step for this cell, and compare it with the limit for an interior cell. (Enter the boundary-cell $\Delta t$ in seconds.)
::: solution
Boundary conductance $U = 1/(1/600 + 0.005/1.0) = 1/0.006667 = 150\ \mathrm{W\,m^{-2}\,K^{-1}}$; interior conductance $k/\Delta x = 100\ \mathrm{W\,m^{-2}\,K^{-1}}$. Positivity: $\rho c\Delta x/\Delta t \ge 100 + 150 = 250$, so $\Delta t \le 2.0\times10^{6} \times 0.010/250 = 80\ \mathrm{s}$. An interior cell needs $\rho c\Delta x/\Delta t \ge 200$, i.e. $\Delta t \le 100\ \mathrm{s}$. The boundary cell governs; as $h \to \infty$ its conductance tends to $2k/\Delta x = 200$ and the limit to $66.7\ \mathrm{s}$.
:::
:::

::: exercise Conservation by telescoping {level=2}
Show that, for any steady 1D finite-volume solution of [[#eq-fv-1d]] with the boundary treatment of this lesson, the sum of all cell equations reduces to "total source $=$ net heat flow out through the two boundaries", whatever the number of cells and whatever the accuracy of the profile.
::: solution
Write each cell equation as $F_e - F_w + S_u + S_P\phi_P = 0$, with $F_e = a_E(\phi_E - \phi_P)$ the approximated flux into the cell through face $e$ and $F_w = a_W(\phi_P - \phi_W)$ the flux leaving through $w$ in the $+x$ direction (with boundary faces using their half-cell expressions). For interior face $i + \tfrac12$, the flux appears as $F_e$ in cell $i$ and, with the identical expression, as $F_w$ in cell $i + 1$; summing over cells, every interior face contributes $F - F = 0$. What remains is $F_{\text{east boundary}} - F_{\text{west boundary}} + \sum_i(S_u + S_P\phi_i) = 0$: the total source equals the net boundary outflow. This is why [[#ex-generation]] satisfied the energy balance exactly, and it is the discrete counterpart of [[computational-fluid-dynamics/governing-equations#prop-integral-to-differential]] read backwards.
:::
:::

::: exercise Meshing a heat-sink base {level=3}
A $5\ \mathrm{mm}$ thick aluminium heat-sink base ($k = 200\ \mathrm{W\,m^{-1}\,K^{-1}}$) is bonded through a $0.10\ \mathrm{mm}$ thermal-interface layer ($k = 3.0\ \mathrm{W\,m^{-1}\,K^{-1}}$) to a $10\ \mathrm{mm} \times 10\ \mathrm{mm}$ chip dissipating $50\ \mathrm{W}$; the base is $40\ \mathrm{mm}$ square. Propose a finite-volume mesh for a steady 3D conduction model, explaining how you would represent the thin interface layer, where you would refine, how you would treat the material interfaces, and how you would check the result.
::: solution
A good answer covers: (i) The interface layer is $0.1\ \mathrm{mm}$ thick but its resistance, $0.1\times10^{-3}/3.0 = 3.3\times10^{-5}\ \mathrm{m^2K/W}$, over the chip area $10^{-4}\ \mathrm{m^2}$ gives $0.33\ \mathrm{K/W}$, about $17\ \mathrm{K}$ at $50\ \mathrm{W}$ — significant. It can be meshed with one or two very thin cells (high aspect ratio is harmless for pure conduction across the layer) or represented as a "thin wall" contact resistance on the interface faces, adding $t/k$ in series exactly as in [[#eq-harmonic]]. (ii) Refine in the base around the chip footprint, where heat spreads laterally and gradients are steepest (spreading resistance), with cell sizes of the order of $0.5\ \mathrm{mm}$ there, coarsening towards the edges with expansion ratios below about $1.2$. (iii) Use harmonic-mean (series-resistance) face conductivities at all material interfaces; place mesh faces on the interfaces. (iv) Check the overall energy balance ($50\ \mathrm{W}$ in equals the heat leaving through the cooled surface), compare the 1D resistance estimate with the computed chip-to-base temperature difference, and repeat on a mesh refined by a factor $1.5$–$2$ in each direction to estimate the discretisation error ([[computational-fluid-dynamics/meshing-verification]]).
:::
:::
