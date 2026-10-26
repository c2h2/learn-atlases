The lessons so far solved for a scalar carried by a *known* velocity field. Now the velocity itself is the unknown, and with it a peculiar partner: the pressure. In incompressible flow the equations [[computational-fluid-dynamics/governing-equations#eq-incompressible]] contain three momentum equations, each a transport equation for a velocity component that can be discretised exactly as in [[computational-fluid-dynamics/convection-diffusion]], and one continuity equation, $\nabla\cdot\mathbf{u} = 0$. There is no equation *for* the pressure. Pressure appears only through its gradient in the momentum equations, and its job is to take whatever value makes the velocity field satisfy continuity — it is, in mathematical terms, the Lagrange multiplier of the incompressibility constraint. Turning that statement into an algorithm, without letting the pressure field develop nonsense on the grid, is the problem of **pressure–velocity coupling**.

This lesson first shows the trap — the checkerboard pressure field that a naive discretisation cannot see — and the two ways out: the **staggered grid** and **momentum interpolation** (Rhie–Chow) on a collocated grid. It then derives the **SIMPLE** family of segregated algorithms that dominate steady industrial CFD, its variants SIMPLEC and PISO, and the **projection** (fractional-step) method that dominates unsteady and research codes. The linear systems that result are solved by the methods of [[computational-fluid-dynamics/linear-solvers]].

## The checkerboard problem

Take the simplest arrangement: all variables ($u$, $v$, $p$) stored at the same nodes — a **collocated** grid — and central differences everywhere. In 1D, the pressure force on control volume $P$ is $-(p_e - p_w)A$, and with linear interpolation $p_e = \tfrac12(p_P + p_E)$, $p_w = \tfrac12(p_W + p_P)$,
$$
-(p_e - p_w)A = -\frac{p_E - p_W}{2}A .
$$
The pressure at $P$ itself has dropped out; the momentum equation at $P$ sees only the pressures two cells apart. Likewise, continuity for cell $P$ with interpolated face velocities $u_e = \tfrac12(u_P + u_E)$, $u_w = \tfrac12(u_W + u_P)$ becomes $\tfrac12(u_E - u_W) = 0$, which again skips $u_P$.

::: proposition The checkerboard mode is invisible {#prop-checkerboard}
On a uniform collocated grid with linear interpolation of pressure and velocity to faces, adding the oscillating field $p'_i = \varepsilon(-1)^i$ (in 2D, $\varepsilon(-1)^{i+j}$) to any solution leaves every discrete momentum and continuity equation unchanged. The discrete pressure is therefore not unique, and nothing in the equations damps such a mode.
:::

::: proof
The pressure enters the discrete momentum equation at node $i$ only through $p_{i+1} - p_{i-1}$. For $p'_i = \varepsilon(-1)^i$, $p'_{i+1} - p'_{i-1} = \varepsilon(-1)^{i-1}\left[(-1)^2 - 1\right] = 0$. So the added field exerts no force on any node; the velocities are unchanged, and continuity (which involves only velocities) is still satisfied. In 2D the same holds in each direction separately, since $(-1)^{i+1+j} - (-1)^{i-1+j} = 0$. A Fourier view says the same: the symbol of the "wide" Laplacian obtained by applying a central gradient to a central gradient is $-\sin^2\theta/\Delta x^2$, which vanishes at $\theta = \pi$, the checkerboard wavenumber.
:::

::: example A checkerboard pressure the solver cannot see {#ex-checkerboard}
On a 1D collocated grid with $\Delta x = 0.10\ \mathrm{m}$, the pressures at five consecutive nodes are $p = (100, 50, 100, 50, 100)\ \mathrm{Pa}$. Compute the pressure gradient used in the momentum equations at nodes 2–4 with central differencing, and the gradient between adjacent nodes.
::: solution
$(\partial p/\partial x)_2 = (p_3 - p_1)/(2\Delta x) = (100 - 100)/0.20 = 0$; likewise $(p_4 - p_2)/0.20 = 0$ at node 3 and $(p_5 - p_3)/0.20 = 0$ at node 4. The momentum equations feel no force at all. Yet between adjacent nodes the gradient is $\pm(100 - 50)/0.10 = \pm 500\ \mathrm{Pa/m}$ — large enough to accelerate water ($\rho = 1000\ \mathrm{kg/m^3}$) at $0.5\ \mathrm{m/s^2}$. Sanity check: the field is physically absurd (pressure alternating cell by cell in a uniform flow) but the discrete equations cannot reject it. Added to a true solution, it produces a converged-looking pressure field with a superimposed zig-zag — the classic symptom of decoupling.
:::
:::

::: widget plot
f: 4*sin(x/2)^2; sin(x)^2; x^2
x: 0, pi
y: 0, 4.5
labels: \text{compact } 4\sin^2(\theta/2); \text{wide } \sin^2\theta; \text{exact } \theta^2
caption: How the discrete pressure Laplacian treats a pressure wave of wavenumber $\theta = k\Delta x$ (all three curves times $1/\Delta x^2$, sign removed). The compact three-point Laplacian, obtained when the pressure gradient is taken across a face between adjacent nodes, responds strongly to all short waves. The wide Laplacian, obtained by applying the central gradient twice on a collocated grid, rises and then falls back to *zero* at $\theta = \pi$: the shortest wave, the checkerboard, produces no response and is therefore never corrected. Staggered grids and Rhie–Chow interpolation both work by restoring the compact behaviour.
:::

## Staggered grids

Harlow and Welch's cure (1965) is to store the velocity components not at the pressure nodes but on the faces of the pressure cells: $u$ at the east and west faces, $v$ at the north and south faces. Each velocity has its own control volume, centred on a face of the pressure cell.

- The pressure force on a $u$-control volume is $(p_P - p_E)A_e$: the difference between **adjacent** pressure nodes. A checkerboard now produces a large force.
- Continuity for a pressure cell uses the face velocities directly, $(\rho uA)_e - (\rho uA)_w + (\rho vA)_n - (\rho vA)_s = 0$, without interpolation.

The checkerboard disappears and the discretisation is clean and conservative. The price is bookkeeping: three (in 3D, four) interleaved grids, separate geometric data for each, awkward treatment of non-orthogonal and unstructured meshes. Staggered grids remain standard in Cartesian research codes and in many direct and large-eddy simulation codes; general-purpose unstructured codes use collocated grids with momentum interpolation.

## The SIMPLE algorithm

Let us derive the segregated algorithm that made industrial CFD possible. Work on a staggered grid (the collocated version differs only in how face velocities are formed). The discretised $u$-momentum equation for the velocity at face $e$ is
$$
a_e u_e = \sum a_{nb}u_{nb} + (p_P - p_E)A_e + b_e ,
$$ {#eq-u-momentum}
with coefficients from the convection–diffusion discretisation of the previous lesson and $b_e$ holding other sources.

The idea is a predictor–corrector. Guess a pressure field $p^\ast$ and solve [[#eq-u-momentum]] (and its $v$, $w$ counterparts) for velocities $u^\ast$, $v^\ast$:
$$
a_e u_e^\ast = \sum a_{nb}u_{nb}^\ast + (p_P^\ast - p_E^\ast)A_e + b_e .
$$
These satisfy momentum with the guessed pressure but not, in general, continuity. Seek corrections $p = p^\ast + p'$, $u = u^\ast + u'$ that fix that. Subtracting the two momentum equations,
$$
a_e u_e' = \sum a_{nb}u_{nb}' + (p_P' - p_E')A_e .
$$ {#eq-u-correction}

::: proposition The pressure-correction equation of SIMPLE {#prop-simple}
If the neighbour term $\sum a_{nb}u'_{nb}$ in [[#eq-u-correction]] is neglected, the velocity corrections are
$$
u_e' = d_e(p_P' - p_E'),\qquad d_e = \frac{A_e}{a_e},
$$ {#eq-velocity-correction}
and requiring the corrected velocities to satisfy continuity for each pressure cell gives, in 2D,
$$
a_P p_P' = a_W p_W' + a_E p_E' + a_S p_S' + a_N p_N' + b',\qquad a_E = \rho_e d_e A_e\ (\text{etc.}),\qquad a_P = \textstyle\sum a_{nb},
$$ {#eq-pressure-correction}
$$
b' = (\rho u^\ast A)_w - (\rho u^\ast A)_e + (\rho v^\ast A)_s - (\rho v^\ast A)_n ,
$$
the mass imbalance of the starred field.
:::

::: proof
With the neighbour term dropped, [[#eq-u-correction]] gives [[#eq-velocity-correction]] directly; similarly $u_w' = d_w(p_W' - p_P')$, $v_n' = d_n(p_P' - p_N')$, $v_s' = d_s(p_S' - p_P')$. Continuity for the pressure cell is
$$
(\rho A)_e(u_e^\ast + u_e') - (\rho A)_w(u_w^\ast + u_w') + (\rho A)_n(v_n^\ast + v_n') - (\rho A)_s(v_s^\ast + v_s') = 0 .
$$
Substitute the corrections and collect the $p'$ terms: the coefficient of $p_P'$ is $(\rho dA)_e + (\rho dA)_w + (\rho dA)_n + (\rho dA)_s$, each neighbour $p'$ has coefficient $(\rho dA)_{nb}$, and the starred mass fluxes form $b'$. Moving the neighbour terms to the right gives [[#eq-pressure-correction]]. The coefficients are all positive and $a_P = \sum a_{nb}$: the equation is a discrete Poisson equation for $p'$ — elliptic, as [[computational-fluid-dynamics/governing-equations#prop-ppe]] said it must be.
:::

Dropping $\sum a_{nb}u_{nb}'$ is the "semi-implicit" approximation in the algorithm's name (Semi-Implicit Method for Pressure-Linked Equations). It does not affect the converged solution — at convergence $p' = 0$ and $u' = 0$, and the equations solved are the exact discrete momentum and continuity equations — but it makes $p'$ too large, because the whole velocity correction is attributed to the local pressure difference. That is why SIMPLE needs **under-relaxation**.

::: algorithm SIMPLE {#alg-simple}
1. Guess the pressure field $p^\ast$ (and start from the current velocities).
2. Solve the momentum equations, under-relaxed, for $u^\ast$, $v^\ast$, $w^\ast$.
3. Compute $d$ coefficients and the mass imbalances $b'$; solve the pressure-correction equation [[#eq-pressure-correction]] for $p'$.
4. Correct the velocities with the full $p'$ via [[#eq-velocity-correction]] — the corrected face velocities now satisfy continuity — and correct the pressure with under-relaxation: $p = p^\ast + \alpha_p p'$.
5. Solve the other transport equations (energy, turbulence quantities, species).
6. Set $p^\ast = p$ and return to step 2 until the residuals and monitored quantities have converged.

Typical under-relaxation factors are $\alpha_u \approx 0.7$ for momentum (applied implicitly, $a_P/\alpha_u$ on the diagonal) and $\alpha_p \approx 0.3$ for pressure; a common rule of thumb is $\alpha_u + \alpha_p \approx 1$.
:::

::: example One pressure correction for one cell {#ex-simple-cell}
A 2D pressure cell, $\Delta x = \Delta y = 0.10\ \mathrm{m}$ (unit depth), contains water ($\rho = 1000\ \mathrm{kg/m^3}$). After the momentum step the face velocities are $u_w^\ast = 1.00$, $u_e^\ast = 1.05$, $v_s^\ast = 0$, $v_n^\ast = 0.020\ \mathrm{m/s}$, and all four faces have momentum coefficient $a = 50\ \mathrm{kg/s}$. Assuming the neighbouring pressure corrections are zero (as for the first cell of a Gauss–Seidel sweep), compute $p'_P$, the corrected face velocities, and the pressure update with $\alpha_p = 0.3$.
::: solution
Face areas are $0.10\ \mathrm{m^2}$, so $d = A/a = 0.10/50 = 2.0\times10^{-3}\ \mathrm{m^2\,s\,kg^{-1}}$ for every face and each $p'$ coefficient is $\rho dA = 1000 \times 0.002 \times 0.10 = 0.20\ \mathrm{m\,s}$; $a_P = 0.80\ \mathrm{m\,s}$. The mass imbalance (inflow minus outflow) is
$$
b' = 1000\left[(1.00 - 1.05)(0.10) + (0 - 0.020)(0.10)\right] = -7.0\ \mathrm{kg/s}.
$$
More mass leaves than enters, so $p'_P = b'/a_P = -7.0/0.80 = -8.75\ \mathrm{Pa}$: the pressure in the cell must fall to draw fluid in and hold it back. Corrections:
$$
u_e = 1.05 + d(p'_P - 0) = 1.05 - 0.0175 = 1.0325,\quad u_w = 1.00 + d(0 - p'_P) = 1.0175,
$$
$$
v_n = 0.020 - 0.0175 = 0.0025,\quad v_s = 0 + 0.0175 = 0.0175\ \mathrm{m/s}.
$$
Check continuity: $(1.0325 - 1.0175)(0.10) + (0.0025 - 0.0175)(0.10) = 0.0015 - 0.0015 = 0$. The pressure is updated by only $\alpha_p p' = -2.63\ \mathrm{Pa}$. Sanity check: the units of $b'/a_P$ are $(\mathrm{kg/s})/(\mathrm{m\,s}) = \mathrm{kg\,m^{-1}\,s^{-2}} = \mathrm{Pa}$; and in a real sweep the neighbours' corrections would share the adjustment, so this single-cell value overestimates the needed change — another reason for under-relaxation.
:::
:::

### SIMPLEC and PISO

The neglected neighbour term can be approximated instead of dropped. **SIMPLEC** (SIMPLE-Consistent, Van Doormaal and Raithby, 1984) subtracts $\sum a_{nb}u_e'$ from both sides of [[#eq-u-correction]], assumes the neighbour corrections are similar to $u_e'$, and neglects only $\sum a_{nb}(u_{nb}' - u_e')$, giving
$$
d_e = \frac{A_e}{a_e - \sum a_{nb}} .
$$ {#eq-simplec}
Because the approximation is consistent, the pressure correction needs little or no under-relaxation ($\alpha_p \approx 1$), and convergence is often considerably faster. **PISO** (Pressure-Implicit with Splitting of Operators, Issa, 1986) keeps the SIMPLE $d$ but adds a *second* (and possibly third) pressure-correction step within the same iteration, in which the neighbour term is evaluated from the first corrections. It was designed for unsteady calculations: with a small time step and two correctors, one PISO pass per time step gives time-accurate results without outer iterations. Many codes combine the two ideas (the "PIMPLE" scheme of OpenFOAM uses PISO correctors inside SIMPLE-like outer iterations).

## Collocated grids and Rhie–Chow interpolation

On a collocated grid the momentum equations are solved for cell-centre velocities $\mathbf{u}_P$, but continuity needs face velocities. Rhie and Chow's idea (1983) is to construct the face velocity not by interpolating the cell velocities but by interpolating the *momentum equation* to the face, so that the face velocity responds to the pressure difference across that face, between adjacent nodes.

Write the cell-centre momentum equation as $u_P = \hat u_P - D_P(\partial p/\partial x)_P$, where $\hat u_P = (\sum a_{nb}u_{nb} + b)/a_P$ collects everything except pressure and $D_P = \Delta V_P/a_P$. Interpolating $\hat u$ and $D$ to the face but evaluating the pressure gradient *directly at the face* gives
$$
u_e = \overline{u}_e - \overline{D}_e\left[\frac{p_E - p_P}{\delta x_{PE}} - \overline{\left(\frac{\partial p}{\partial x}\right)}_e\right],
$$ {#eq-rhie-chow}
where overbars denote linear interpolation of cell values. The bracket is the difference between the compact face gradient and the interpolated cell-centre gradients. For a smooth pressure field it is of order $\Delta x^2\,\partial^3p/\partial x^3$ and vanishes as the grid is refined, so the face velocity is consistent; for a checkerboard it is large, and it drives exactly the mass imbalance that the pressure equation will remove.

::: example Rhie–Chow detects the checkerboard {#ex-rhie-chow}
A collocated grid with $\Delta x = 0.10\ \mathrm{m}$ carries uniform velocity $u = 1.0\ \mathrm{m/s}$ at every node and the checkerboard pressures $p_W = 100$, $p_P = 50$, $p_E = 100$, $p_{EE} = 50\ \mathrm{Pa}$ (and $p_{WW} = 50$). With $\overline{D} = 1.0\times10^{-4}\ \mathrm{m^2\,s\,kg^{-1}}$ on every face, compute $u_e$ and $u_w$ for cell $P$ from linear interpolation and from [[#eq-rhie-chow]], and the resulting continuity imbalance.
::: solution
Linear interpolation gives $u_e = u_w = 1.0\ \mathrm{m/s}$: perfect continuity, and the checkerboard is invisible.

Rhie–Chow: the central cell gradients are $(\partial p/\partial x)_P = (p_E - p_W)/(2\Delta x) = 0$ and $(\partial p/\partial x)_E = (p_{EE} - p_P)/(2\Delta x) = 0$, so their interpolated face value is $0$. The compact face gradient is $(p_E - p_P)/\Delta x = 50/0.10 = 500\ \mathrm{Pa/m}$ at $e$ and $(p_P - p_W)/\Delta x = -500\ \mathrm{Pa/m}$ at $w$. Hence
$$
u_e = 1.0 - 10^{-4}(500 - 0) = 0.95\ \mathrm{m/s},\qquad u_w = 1.0 - 10^{-4}(-500 - 0) = 1.05\ \mathrm{m/s}.
$$
Cell $P$ now has $u_e - u_w = -0.10\ \mathrm{m/s}$: fluid is accumulating, so the pressure correction equation will raise $p_P$ — towards its neighbours. The checkerboard is seen and damped. Sanity check: for a linear pressure field, say $p = 100 + 500x$, the compact and interpolated gradients would both be $500\ \mathrm{Pa/m}$, the bracket would vanish, and $u_e$ would be the plain interpolated value.
:::
:::

::: warning Rhie–Chow details matter in practice
Several well-known artefacts come from careless momentum interpolation. If the face velocity depends on the under-relaxation factor (because $a_P$ includes $1/\alpha_u$), the converged solution changes when $\alpha_u$ is changed — a result that should be impossible. If the face velocity in an unsteady run depends on the time step, very small time steps produce pressure wiggles again. Body forces (gravity in buoyant flows, porous-media resistance) that are balanced by a pressure gradient must be interpolated in the same way as the pressure gradient, or spurious velocities appear in fluid at rest. Production codes contain corrections for each of these; when a simple test — fluid at rest under gravity, uniform flow in a channel — fails to give the obvious answer, suspect the face-velocity interpolation.
:::

## Projection (fractional-step) methods

For unsteady flow the most widely used approach in research codes is Chorin's **projection method** (1968). It splits each time step into two parts: first advance the momentum equation *ignoring* the incompressibility constraint, then project the result onto the space of divergence-free fields.

::: algorithm Chorin's projection method {#alg-projection}
For each time step from $\mathbf{u}^n$ to $\mathbf{u}^{n+1}$:
1. **Predictor:** compute an intermediate velocity without (or with an old) pressure gradient,
$$
\frac{\mathbf{u}^\ast - \mathbf{u}^n}{\Delta t} = -(\mathbf{u}\cdot\nabla)\mathbf{u} + \nu\nabla^2\mathbf{u}\quad(\text{explicit or semi-implicit}).
$$
2. **Pressure Poisson equation:** solve
$$
\nabla^2 p^{n+1} = \frac{\rho}{\Delta t}\nabla\cdot\mathbf{u}^\ast
$$ {#eq-projection-poisson}
with $\partial p/\partial n$ consistent with the boundary velocities.
3. **Corrector:** $\mathbf{u}^{n+1} = \mathbf{u}^\ast - \dfrac{\Delta t}{\rho}\nabla p^{n+1}$.
:::

::: proposition The projection produces a divergence-free field {#prop-projection}
If $p^{n+1}$ satisfies [[#eq-projection-poisson]] and the same discrete divergence and gradient operators are used in steps 2 and 3 (with the discrete Laplacian defined as their product), then $\nabla\cdot\mathbf{u}^{n+1} = 0$.
:::

::: proof
Take the divergence of the corrector: $\nabla\cdot\mathbf{u}^{n+1} = \nabla\cdot\mathbf{u}^\ast - \tfrac{\Delta t}{\rho}\nabla\cdot\nabla p^{n+1} = \nabla\cdot\mathbf{u}^\ast - \tfrac{\Delta t}{\rho}\cdot\tfrac{\rho}{\Delta t}\nabla\cdot\mathbf{u}^\ast = 0$. The argument works in the discrete setting only if "$\nabla\cdot\nabla$" in the Poisson equation is literally the discrete divergence applied to the discrete gradient used in the corrector. On a staggered grid that product is the compact Laplacian; on a collocated grid with cell-centre gradients it is the wide Laplacian of [[#prop-checkerboard]], which brings back the checkerboard — and Rhie–Chow-type face velocities are needed again. Geometrically, the step is the **Helmholtz–Hodge decomposition**: any smooth field splits uniquely (given boundary conditions) into a divergence-free part and a gradient, $\mathbf{u}^\ast = \mathbf{u}^{n+1} + \nabla q$, and the projection removes the gradient part.
:::

::: example Projecting a polluted Taylor–Green field {#ex-projection}
The Taylor–Green vortex field $u = \sin x\cos y$, $v = -\cos x\sin y$ is divergence-free. Suppose a predictor step has contaminated it with a gradient: $\mathbf{u}^\ast = \mathbf{u}_{TG} + a\nabla\varphi$ with $\varphi = \cos x\cos y$ and $a = 0.10\ \mathrm{m^2/s}$ (lengths in metres, $\rho = 1.0\ \mathrm{kg/m^3}$, $\Delta t = 0.010\ \mathrm{s}$). Compute $\nabla\cdot\mathbf{u}^\ast$, solve the pressure equation, and confirm that the corrector recovers $\mathbf{u}_{TG}$.
::: solution
$\nabla\cdot\mathbf{u}_{TG} = \cos x\cos y - \cos x\cos y = 0$, and $\nabla\cdot(a\nabla\varphi) = a\nabla^2\varphi = -2a\cos x\cos y$. So
$$
\nabla^2 p = \frac{\rho}{\Delta t}(-2a\cos x\cos y).
$$
Since $\nabla^2(\cos x\cos y) = -2\cos x\cos y$, the solution (periodic, zero mean) is $p = \dfrac{\rho a}{\Delta t}\cos x\cos y = \dfrac{1.0 \times 0.10}{0.010}\cos x\cos y = 10\cos x\cos y\ \mathrm{Pa}$. The corrector subtracts $\tfrac{\Delta t}{\rho}\nabla p = a\nabla\varphi$, leaving exactly $\mathbf{u}_{TG}$. Sanity check: the pressure amplitude scales as $1/\Delta t$ — a fixed divergence error removed in a shorter time needs a larger impulsive pressure, which is why the pressure from a projection method is best interpreted with the time step in mind.
:::
:::

::: widget vectorfield
P: sin(x)*cos(y) - a*sin(x)*cos(y)
Q: -cos(x)*sin(y) - a*cos(x)*sin(y)
x: -3.1416, 3.1416
y: -3.1416, 3.1416
sliders: a=0.5:0:1:0.05
streamlines: true
shade: divergence
caption: The field $\mathbf{u}^\ast = \mathbf{u}_{TG} + a\nabla(\cos x\cos y)$ of the example, with the gradient contamination $a$ on the slider and divergence shaded. At $a = 0$ it is the Taylor–Green vortex array: closed streamlines and zero divergence everywhere. Raise $a$ and sources and sinks appear at the vortex centres — fluid is created or destroyed, which an incompressible fluid cannot do. The projection step solves one Poisson equation to find exactly this gradient part and subtracts it, returning the slider to zero.
:::

Explicit projection methods have the usual time-step limits ([[computational-fluid-dynamics/stability-accuracy]]): a convective Courant condition $\lvert u\rvert\Delta t/\Delta x \lesssim 1$ and, for explicit viscous terms, $\nu\Delta t/\Delta x^2 \le \tfrac14$ in 2D. Semi-implicit variants (viscous terms implicit, convection explicit with a multi-step method) remove the viscous limit. Higher-order versions use the old pressure gradient in the predictor and solve for an increment — the incremental pressure-correction scheme — which improves the time accuracy of the pressure.

## Coupled solvers and compressible flow

Segregated methods (SIMPLE, PISO, projection) solve momentum and pressure in sequence, and the coupling is enforced only through iteration. **Coupled** pressure-based solvers instead assemble momentum and continuity (with Rhie–Chow fluxes) into one large block system per cell and solve it with algebraic multigrid; they need more memory but converge in far fewer outer iterations for strongly coupled flows. For compressible flows, **density-based** solvers march the conservation equations in (pseudo-)time with the density from continuity and pressure from the equation of state, using upwind schemes based on the characteristic speeds $u$, $u \pm c$. At low Mach numbers the acoustic stiffness of [[computational-fluid-dynamics/stability-accuracy#ex-cfl-dt]] makes density-based methods inefficient, and **preconditioning** is used to rescale the acoustic speeds; conversely, pressure-based methods have been extended to compressible flow by letting density respond to the pressure correction.

::: quiz
A steady collocated-grid simulation converges, but its pressure field shows a fine zig-zag pattern superimposed on a smooth solution, while the velocity field looks smooth. What is the most likely cause?
- [ ] The momentum under-relaxation factor is too large.
- [x] Pressure–velocity decoupling: the face velocities used in continuity are not formed by momentum (Rhie–Chow) interpolation, or the interpolation is inconsistent, so the checkerboard mode is not suppressed.
- [ ] The convection scheme is first order.
- [ ] The pressure-correction equation was solved too accurately.
::: solution
A cell-to-cell oscillation in pressure with smooth velocities is the signature of the checkerboard mode of [[#prop-checkerboard]]. It is invisible to the central pressure gradient, so velocities are unaffected; only a compact face-based pressure difference in the continuity fluxes (staggering or momentum interpolation) can see and remove it.
:::
:::

::: history
Francis H. Harlow and J. Eddie Welch of Los Alamos introduced the staggered grid in their 1965 Marker-and-Cell (MAC) method for free-surface flows (*Physics of Fluids*). Alexandre Chorin published the projection method in 1968 (*Mathematics of Computation*). Suhas Patankar and D. Brian Spalding presented SIMPLE in 1972 (*International Journal of Heat and Mass Transfer*), in a paper on three-dimensional parabolic flows, and Patankar's 1980 book made it the standard. C. M. Rhie and W. L. Chow's 1983 paper on airfoil flows with trailing-edge separation (*AIAA Journal*) introduced momentum interpolation on collocated grids, opening the way to non-orthogonal and unstructured meshes. J. P. Van Doormaal and G. D. Raithby published SIMPLEC in 1984 (*Numerical Heat Transfer*), and Raad Issa the PISO algorithm in 1986 (*Journal of Computational Physics*).
:::

::: summary
- In incompressible flow pressure has no equation of its own; it is whatever makes the velocity field divergence-free, and its equation is elliptic.
- On a collocated grid with linear interpolation, the checkerboard pressure $(-1)^i$ exerts no force and violates no equation: pressure and velocity decouple.
- Staggered grids (velocities on pressure-cell faces) use adjacent-node pressure differences and remove the problem; collocated grids use Rhie–Chow momentum interpolation [[#eq-rhie-chow]].
- SIMPLE: guess $p^\ast$, solve momentum, solve a Poisson equation for $p'$ from the mass imbalance, correct $u$ fully and $p$ with $\alpha_p \approx 0.3$, iterate. The neglected neighbour term does not affect the converged answer.
- SIMPLEC ($d = A/(a - \sum a_{nb})$) needs little pressure under-relaxation; PISO adds correctors for time-accurate unsteady flow.
- Projection: predict without the constraint, solve $\nabla^2p = (\rho/\Delta t)\nabla\cdot\mathbf{u}^\ast$, subtract the gradient — exactly divergence-free if the discrete operators are consistent.
:::

## Exercises

::: exercise The compact gradient of a checkerboard {level=1 check="1000"}
Adjacent collocated nodes $0.050\ \mathrm{m}$ apart carry pressures $100$ and $50\ \mathrm{Pa}$ alternately. Find the magnitude of the pressure gradient between adjacent nodes, and the central-difference gradient at a node. (Enter the adjacent-node gradient in $\mathrm{Pa/m}$.)
::: solution
$(100 - 50)/0.050 = 1000\ \mathrm{Pa/m}$ between adjacent nodes; the central gradient at any node is $(100 - 100)/0.10 = 0$.
:::
:::

::: exercise A velocity-correction coefficient {level=1 check="0.005"}
A face of area $A_e = 0.010\ \mathrm{m^2}$ has momentum coefficient $a_e = 2.0\ \mathrm{kg/s}$. Compute the SIMPLE coefficient $d_e$. (Enter it in $\mathrm{m^2\,s\,kg^{-1}}$.)
::: solution
$d_e = A_e/a_e = 0.010/2.0 = 5.0\times10^{-3}\ \mathrm{m^2\,s\,kg^{-1}}$: a pressure-correction difference of $1\ \mathrm{Pa}$ changes the face velocity by $5\ \mathrm{mm/s}$.
:::
:::

::: exercise Under-relaxed pressure update {level=1 check="-2.625"}
In [[#ex-simple-cell]], what pressure change is applied to the cell when $\alpha_p = 0.3$? (Enter it in Pa.)
::: solution
$\alpha_p p'_P = 0.3 \times (-8.75) = -2.625\ \mathrm{Pa}$.
:::
:::

::: exercise A mass imbalance {level=2 check="-0.24"}
A 2D cell with $\Delta x = 0.20\ \mathrm{m}$, $\Delta y = 0.10\ \mathrm{m}$ (unit depth) contains air ($\rho = 1.2\ \mathrm{kg/m^3}$). The starred face velocities are $u_w^\ast = 5.0$, $u_e^\ast = 6.0$, $v_s^\ast = 1.0$, $v_n^\ast = 1.5\ \mathrm{m/s}$. Compute the mass source $b'$ of the pressure-correction equation. (Enter $b'$ in kg/s.)
::: solution
East and west faces have area $\Delta y \times 1 = 0.10\ \mathrm{m^2}$; north and south faces $\Delta x \times 1 = 0.20\ \mathrm{m^2}$. $b' = 1.2\left[(5.0 - 6.0)(0.10) + (1.0 - 1.5)(0.20)\right] = 1.2(-0.10 - 0.10) = -0.24\ \mathrm{kg/s}$: a net outflow, so $p'_P$ will be negative.
:::
:::

::: exercise SIMPLE versus SIMPLEC {level=2 check="5"}
A face has $A_e = 0.010\ \mathrm{m^2}$, $a_e = 10\ \mathrm{kg/s}$ and $\sum a_{nb} = 8.0\ \mathrm{kg/s}$. By what factor is the SIMPLEC $d_e$ larger than the SIMPLE $d_e$? (Enter the factor.)
::: solution
SIMPLE: $d_e = 0.010/10 = 1.0\times10^{-3}$. SIMPLEC: $d_e = 0.010/(10 - 8) = 5.0\times10^{-3}$. Factor $5$. SIMPLE's smaller $d$ gives larger $p'$ for the same imbalance — the overestimate that pressure under-relaxation compensates.
:::
:::

::: exercise A Rhie–Chow face velocity {level=2 check="2.02"}
Cell-centre velocities are $u_P = u_E = 2.0\ \mathrm{m/s}$; cell-centre pressure gradients are $(\partial p/\partial x)_P = -100$ and $(\partial p/\partial x)_E = -300\ \mathrm{Pa/m}$; $p_P = 400$ and $p_E = 360\ \mathrm{Pa}$ with $\delta x_{PE} = 0.10\ \mathrm{m}$; and $\overline{D}_e = 1.0\times10^{-4}\ \mathrm{m^2\,s\,kg^{-1}}$. Compute $u_e$ from [[#eq-rhie-chow]]. (Enter $u_e$ in m/s.)
::: solution
Compact face gradient: $(360 - 400)/0.10 = -400\ \mathrm{Pa/m}$. Interpolated cell gradient: $\tfrac12(-100 - 300) = -200\ \mathrm{Pa/m}$. Then
$$
u_e = 2.0 - 1.0\times10^{-4}\left[-400 - (-200)\right] = 2.0 + 0.020 = 2.02\ \mathrm{m/s}.
$$
The pressure falls more steeply across the face than the cell gradients suggest, so the face velocity is a little higher than the interpolated $2.0\ \mathrm{m/s}$. The correction is proportional to the third derivative of pressure times $\Delta x^2$ and vanishes under refinement for smooth fields.
:::
:::

::: exercise Deriving the 1D pressure-correction equation {level=3}
For steady incompressible flow in a 1D duct of varying area $A(x)$ on a staggered grid, write the momentum equation for the velocity at face $e$, derive the SIMPLE pressure-correction equation for pressure node $P$, and show that for constant density and a uniform duct its coefficients reduce to $a_E = \rho A^2/a_e$ and $a_W = \rho A^2/a_w$. Explain why the converged solution does not depend on the approximation $\sum a_{nb}u'_{nb} \approx 0$.
::: solution
Momentum at face $e$: $a_eu_e = \sum a_{nb}u_{nb} + (p_P - p_E)A_e + b_e$. With $p = p^\ast + p'$, $u = u^\ast + u'$ and the neighbour corrections dropped, $u'_e = d_e(p'_P - p'_E)$ with $d_e = A_e/a_e$, and $u'_w = d_w(p'_W - p'_P)$. Continuity for pressure cell $P$: $\rho A_eu_e - \rho A_wu_w = 0$. Substituting, $(\rho A_ed_e + \rho A_wd_w)p'_P = \rho A_wd_wp'_W + \rho A_ed_ep'_E + (\rho A_wu_w^\ast - \rho A_eu_e^\ast)$, so $a_E = \rho A_ed_e = \rho A_e^2/a_e$ and $a_W = \rho A_w^2/a_w$; for a uniform duct $A_e = A_w = A$. At convergence the mass imbalance $b'$ is zero, so $p' = 0$ everywhere and $u' = 0$; the equations then satisfied by $p^\ast$, $u^\ast$ are the exact discrete momentum and continuity equations, independent of how $p'$ was computed. The approximation affects only the path (rate of convergence), not the destination.
:::
:::

::: exercise Choosing a coupling algorithm {level=3}
Recommend a pressure–velocity algorithm, with reasons, for: (a) a steady RANS calculation of flow through a centrifugal pump on $5\times10^{6}$ cells; (b) a large-eddy simulation of flow past a cylinder at $\mathrm{Re} = 3900$; (c) natural convection in a tall cavity where buoyancy drives a slow flow; (d) transonic flow over a wing. For each, state what you would watch for during the run.
::: solution
(a) SIMPLEC or a coupled pressure-based solver with AMG; coupled solvers converge in far fewer iterations for rotating machinery with strong pressure–velocity coupling. Watch the head and torque histories, mass imbalance between inlet and outlet, and residuals. (b) A projection or PISO method with second-order time stepping and low-dissipation spatial schemes, time step chosen for Courant number below about $1$; watch the Courant number, the continuity error per step and the statistical convergence of averaged quantities. (c) SIMPLE-family or coupled pressure-based solver with the body force interpolated consistently with the pressure gradient (otherwise spurious currents appear); watch the energy balance and the Nusselt number; under-relaxation may need to be lower because buoyancy coupling is strong. (d) A density-based solver (or pressure-based compressible formulation) with upwind fluxes that respect the characteristic speeds; shocks require conservative, bounded schemes; watch lift and drag convergence, shock position under grid refinement, and the entropy behaviour.
:::
:::
