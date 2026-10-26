Nothing in the derivation of [[finite-element-method/weak-forms]] depended on the unknown being a displacement. Any boundary-value problem with a weak form can be discretised in the same way, and a large family of physical problems shares a single, simple equation: steady heat conduction, the torsion of prismatic shafts, groundwater seepage, electrostatics, magnetostatics and irrotational flow are all governed by a **quasi-harmonic** (Poisson-type) equation for one scalar field. This chapter applies the finite element method to that family, using heat conduction — the commonest case in mechanical engineering — as the running example. With one unknown per node instead of two or three, the element matrices are smaller and the physics is easy to check against [[heat-transfer/steady-conduction]] and [[heat-transfer/fins]]. Two new features appear: convection boundary conditions, which add both a "stiffness" and a "load", and time dependence, which turns the algebraic system into a set of ordinary differential equations that must be integrated step by step, with a stability limit that every analyst of transients needs to understand.

## The quasi-harmonic equation

::: definition The steady field problem {#def-field}
Find a scalar field $\phi(x, y)$ in a region $\Omega$ such that
$$
\frac{\partial}{\partial x}\left(k_x\frac{\partial\phi}{\partial x}\right) + \frac{\partial}{\partial y}\left(k_y\frac{\partial\phi}{\partial y}\right) + Q = 0 \quad\text{in } \Omega,
$$ {#eq-field}
with three kinds of boundary condition on parts of the boundary $\Gamma$, $\mathbf{n}$ being the outward normal:
- **Dirichlet (essential):** $\phi = \bar\phi$ on $\Gamma_\phi$ — a prescribed temperature;
- **Neumann (natural):** $-k\,\partial\phi/\partial n = \bar q$ on $\Gamma_q$ — a prescribed outward flux ($\bar q = 0$: insulated or symmetry boundary);
- **Robin (mixed):** $-k\,\partial\phi/\partial n = h(\phi - \phi_\infty)$ on $\Gamma_h$ — convection to a fluid at $\phi_\infty$ with heat-transfer coefficient $h$.
:::

For heat conduction $\phi = T$ is temperature (K or °C), $k$ the thermal conductivity (W/m K), $Q$ the internal heat generation (W/m³), and the flux vector is Fourier's law $\mathbf{q} = -k\nabla T$. The same mathematics describes the other problems in the table.

| problem | field $\phi$ | "conductivity" $k$ | source $Q$ | flux $-k\nabla\phi$ |
|---|---|---|---|---|
| heat conduction | temperature $T$ | conductivity | heat generation | heat flux |
| torsion of a prismatic shaft | Prandtl stress function | $1$ (or $1/G$) | $2G\theta'$ ($\theta'$ = twist per length) | shear stresses (rotated) |
| groundwater seepage | hydraulic head | permeability | pumping | Darcy velocity |
| electrostatics | electric potential | permittivity | charge density | $-$ electric displacement |
| irrotational ideal flow | velocity potential | $1$ | $0$ | $-$ velocity |

(In the torsion analogy the shear stresses are $\tau_{xz} = \partial\phi/\partial y$, $\tau_{yz} = -\partial\phi/\partial x$ and the torque is $2\int\phi\,dA$; see [[solid-mechanics/linear-elasticity]].)

## The weak form and the element matrices

Multiply [[#eq-field]] by a test function $w$ that vanishes on $\Gamma_\phi$, integrate over $\Omega$ (thickness $t$ for a plane region) and apply the divergence theorem — the two-dimensional integration by parts:

::: proposition Weak form and finite element equations {#prop-weak-field}
The weak form of the field problem is: find $\phi$ with $\phi = \bar\phi$ on $\Gamma_\phi$ such that, for every $w$ vanishing on $\Gamma_\phi$,
$$
\int_\Omega \nabla w^{\mathsf T}\mathbf{k}\,\nabla\phi\;t\,dA + \int_{\Gamma_h}h\,w\,\phi\;t\,ds = \int_\Omega w\,Q\;t\,dA - \int_{\Gamma_q}w\,\bar q\;t\,ds + \int_{\Gamma_h}h\,w\,\phi_\infty\;t\,ds,
$$
where $\mathbf{k} = \operatorname{diag}(k_x, k_y)$. With $\phi = \mathbf{N}\mathbf{T}^{(e)}$ in each element and $\mathbf{B} = [\partial\mathbf{N}/\partial x;\ \partial\mathbf{N}/\partial y]$, Galerkin's method gives $\mathbf{K}\mathbf{T} = \mathbf{F}$ assembled from
$$
\mathbf{k}^{(e)} = \underbrace{\int_{A_e}\mathbf{B}^{\mathsf T}\mathbf{k}\,\mathbf{B}\,t\,dA}_{\text{conduction}} + \underbrace{\int_{\Gamma_h^e}h\,\mathbf{N}^{\mathsf T}\mathbf{N}\,t\,ds}_{\text{convection}}, \qquad \mathbf{f}^{(e)} = \int_{A_e}\mathbf{N}^{\mathsf T}Q\,t\,dA - \int_{\Gamma_q^e}\mathbf{N}^{\mathsf T}\bar q\,t\,ds + \int_{\Gamma_h^e}h\,\phi_\infty\mathbf{N}^{\mathsf T}\,t\,ds.
$$ {#eq-field-k}
:::

::: proof
$\int_\Omega w\,\nabla\cdot(\mathbf{k}\nabla\phi)\,dA = \oint_\Gamma w\,(\mathbf{k}\nabla\phi)\cdot\mathbf{n}\,ds - \int_\Omega\nabla w^{\mathsf T}\mathbf{k}\nabla\phi\,dA$ (divergence theorem applied to $w\,\mathbf{k}\nabla\phi$). On $\Gamma_\phi$ the test function is zero; on $\Gamma_q$ the normal flux $(\mathbf{k}\nabla\phi)\cdot\mathbf{n} = -\bar q$; on $\Gamma_h$ it is $-h(\phi - \phi_\infty)$. Substituting into $\int w[\nabla\cdot(\mathbf{k}\nabla\phi) + Q] = 0$ and moving the unknown convection term to the left gives the weak form. Inserting $\phi = \sum N_jT_j$ and $w = N_i$ produces row $i$ of the matrix equations. Assumptions: steady state, linear material ($k$ independent of $T$), $h$ and $\phi_\infty$ known.
:::

Two observations organise everything that follows. First, the conduction matrix has exactly the structure of a stiffness matrix: symmetric, positive semidefinite, with rows summing to zero (a uniform temperature produces no flux, the analogue of a rigid-body mode). A model with no Dirichlet or convection boundary is singular, just as an unsupported structure is. Second, a convective boundary contributes to **both sides**: a term $h\int\mathbf{N}^{\mathsf T}\mathbf{N}$ on the matrix side (convection is like a distributed spring to the ambient temperature) and $h\phi_\infty\int\mathbf{N}^{\mathsf T}$ on the load side. It makes the matrix non-singular even without prescribed temperatures.

### One-dimensional elements

For conduction along a bar, wall or fin with cross-section $A$, the two-node linear element ($N_1 = 1 - x/L$, $N_2 = x/L$) gives the **conductance** matrix $\frac{kA}{L}[1, -1; -1, 1]$ (W/K) — the bar element with $EA$ replaced by $kA$. If the lateral surface (perimeter $P$) convects to $T_\infty$, the convection integrals become
$$
\mathbf{k}_h^{(e)} = \frac{hPL}{6}\begin{bmatrix} 2 & 1 \\ 1 & 2 \end{bmatrix}, \qquad \mathbf{f}_h^{(e)} = \frac{hPLT_\infty}{2}\begin{bmatrix} 1 \\ 1 \end{bmatrix},
$$ {#eq-fin}
and a convecting end face of area $A$ simply adds $hA$ to the diagonal and $hAT_\infty$ to the load of that node. For a plane wall per unit area, $A = 1\,\mathrm{m^2}$.

::: example A composite wall {#ex-wall}
An external wall consists, from inside to outside, of $20\,\mathrm{mm}$ of plaster ($k = 0.5\,\mathrm{W/m\,K}$), $50\,\mathrm{mm}$ of insulation ($k = 0.04$) and $200\,\mathrm{mm}$ of brick ($k = 0.7$). The inner surface is held at $20\,^\circ\mathrm{C}$; the outer surface convects to air at $-5\,^\circ\mathrm{C}$ with $h = 25\,\mathrm{W/m^2\,K}$. Use one element per layer and find the interface temperatures and the heat loss per square metre.
::: solution
Per unit area the element conductances $k/L$ are $25$, $0.8$ and $3.5\,\mathrm{W/m^2\,K}$. Nodes 1 (inner surface) to 4 (outer surface). Assembling and adding the convection term $h = 25$ to node 4 and $hT_\infty = -125\,\mathrm{W/m^2}$ to its load:
$$
\begin{bmatrix} 25 & -25 & 0 & 0 \\ -25 & 25.8 & -0.8 & 0 \\ 0 & -0.8 & 4.3 & -3.5 \\ 0 & 0 & -3.5 & 3.5 + 25 \end{bmatrix}\begin{bmatrix} T_1 \\ T_2 \\ T_3 \\ T_4 \end{bmatrix} = \begin{bmatrix} F_1 \\ 0 \\ 0 \\ -125 \end{bmatrix}.
$$
With $T_1 = 20\,^\circ\mathrm{C}$ prescribed, rows 2–4 give $T_2 = 19.38\,^\circ\mathrm{C}$, $T_3 = 0.04\,^\circ\mathrm{C}$, $T_4 = -4.38\,^\circ\mathrm{C}$. Heat flux through the plaster: $25(20 - 19.38) = 15.47\,\mathrm{W/m^2}$; row 1 gives the same value as the "reaction" $F_1$, the heat supplied at the inner surface.

*Check.* Thermal resistances in series: $0.04 + 1.25 + 0.2857 + 0.04 = 1.6157\,\mathrm{m^2\,K/W}$ (plaster, insulation, brick, outside film), and $25/1.6157 = 15.47\,\mathrm{W/m^2}$. The insulation, a sixth of the thickness, takes $77\,\%$ of the temperature drop. Linear elements are exact here, because the exact temperature is linear in each layer.
:::
:::

::: example A pin fin {#ex-fin}
An aluminium pin fin ($k = 200\,\mathrm{W/m\,K}$) of diameter $5\,\mathrm{mm}$ and length $50\,\mathrm{mm}$ has its base at $100\,^\circ\mathrm{C}$ and convects to air at $25\,^\circ\mathrm{C}$ with $h = 25\,\mathrm{W/m^2\,K}$; the tip is taken as insulated. Compute the tip temperature and the heat rate with 1, 2 and 4 elements and compare with the exact solution.
::: solution
$A = \pi D^2/4 = 1.963\times10^{-5}\,\mathrm{m^2}$, $P = \pi D = 0.01571\,\mathrm{m}$, $m = \sqrt{hP/kA} = \sqrt{4h/kD} = 10.0\,\mathrm{m^{-1}}$, $mL = 0.5$.

*Exact* ([[heat-transfer/fins]]): $T_\text{tip} = T_\infty + (T_b - T_\infty)/\cosh mL = 25 + 75/1.1276 = 91.51\,^\circ\mathrm{C}$ and $\dot Q = \sqrt{hPkA}\,(T_b - T_\infty)\tanh mL = 1.3610\,\mathrm{W}$.

*One element.* $kA/L = 0.07854\,\mathrm{W/K}$, $hPL/6 = 0.003272\,\mathrm{W/K}$, so $\mathbf{k}^{(e)} = [0.08508, -0.07527; -0.07527, 0.08508]$ and $\mathbf{f}^{(e)} = 0.2454\,[1, 1]^{\mathsf T}\,\mathrm{W}$. With $T_1 = 100$: $0.08508\,T_2 = 0.2454 + 0.07527 \times 100$, $T_2 = 91.35\,^\circ\mathrm{C}$. The heat entering at the base is the "reaction" of row 1: $\dot Q = 0.08508 \times 100 - 0.07527 \times 91.35 - 0.2454 = 1.388\,\mathrm{W}$.

*More elements:*

| elements | $T_\text{tip}$ (°C) | $\dot Q$ (W) | error in $\dot Q$ |
|---|---|---|---|
| 1 | 91.35 | 1.3877 | $+1.96\,\%$ |
| 2 | 91.47 | 1.3676 | $+0.48\,\%$ |
| 4 | 91.50 | 1.3627 | $+0.12\,\%$ |
| exact | 91.51 | 1.3610 | — |

*Check.* The error falls by a factor of 4 per halving ($h^2$); the FE heat rate is too high, as expected of a model that is "too conductive" in the same way that displacement models are too stiff. Computing $\dot Q$ from the reaction (the consistent nodal flux) gives this $h^2$ accuracy; computing it from the temperature gradient of the first element, $-kA(T_2 - T_1)/L_e$, is much worse. Fin efficiency $\tanh(mL)/mL = 0.924$.
:::
:::

### The linear triangle

For a three-node triangle with the shape functions of [[finite-element-method/plane-elements]], $\mathbf{B} = \frac{1}{2A}[b_1, b_2, b_3;\ c_1, c_2, c_3]$ is constant, and for isotropic $k$
$$
\mathbf{k}^{(e)} = \frac{k\,t}{4A}\left(\mathbf{b}\mathbf{b}^{\mathsf T} + \mathbf{c}\mathbf{c}^{\mathsf T}\right), \qquad (\mathbf{k}^{(e)})_{ij} = \frac{kt}{4A}(b_ib_j + c_ic_j).
$$ {#eq-tri}
A convecting edge of length $\ell$ between two of its nodes adds $\frac{ht\ell}{6}[2, 1; 1, 2]$ to those nodes and $\frac{ht\ell T_\infty}{2}[1, 1]$ to their loads; a uniform source adds $QtA/3$ to each node.

::: example Conductance of a triangle {#ex-tri}
A triangle with nodes 1 $(0, 0)$, 2 $(0.04, 0)$, 3 $(0, 0.03)\,\mathrm{m}$ in a steel plate ($k = 50\,\mathrm{W/m\,K}$) $10\,\mathrm{mm}$ thick. Compute $\mathbf{k}^{(e)}$, and the convection matrix of edge 1–2 for $h = 100\,\mathrm{W/m^2\,K}$.
::: solution
$A = 6\times10^{-4}\,\mathrm{m^2}$; $\mathbf{b} = [-0.03, 0.03, 0]$, $\mathbf{c} = [-0.04, 0, 0.04]\,\mathrm{m}$; $kt/(4A) = 50 \times 0.01/(2.4\times10^{-3}) = 208.33\,\mathrm{W/(K\,m^2)}$. Then
$$
\mathbf{k}^{(e)} = 208.33\begin{bmatrix} 0.0025 & -0.0009 & -0.0016 \\ -0.0009 & 0.0009 & 0 \\ -0.0016 & 0 & 0.0016 \end{bmatrix} = \begin{bmatrix} 0.5208 & -0.1875 & -0.3333 \\ -0.1875 & 0.1875 & 0 \\ -0.3333 & 0 & 0.3333 \end{bmatrix}\ \mathrm{W/K}.
$$
Edge 1–2 has $\ell = 0.04\,\mathrm{m}$: $\frac{ht\ell}{6} = 6.667\times10^{-3}$, giving $[0.01333, 0.00667; 0.00667, 0.01333]\,\mathrm{W/K}$ on nodes 1 and 2.

*Check.* Rows of the conduction matrix sum to zero (no flux for uniform temperature). $k_{23} = 0$ because edges 1–2 and 1–3 are perpendicular: for a right-angled triangle, the off-diagonal term between the two nodes on either side of the right angle vanishes. The convection matrix sums to $ht\ell = 0.04\,\mathrm{W/K}$, the conductance to the fluid of the whole edge.
:::
:::

## Transient conduction

When the temperature changes in time, the energy balance of [[heat-transfer/transient-conduction]] adds a storage term:
$$
\rho c\,\frac{\partial T}{\partial t} = \nabla\cdot(k\nabla T) + Q,
$$
with density $\rho$ and specific heat capacity $c$. Treating the time derivative as part of the "source" in the weak form, and interpolating $T(x, y, t) = \mathbf{N}(x, y)\,\mathbf{T}(t)$ — shape functions in space, nodal values that vary in time — gives a system of ordinary differential equations, the **semi-discrete** equations.

::: proposition Semi-discrete heat equation {#prop-semidiscrete}
$$
\mathbf{C}\,\dot{\mathbf{T}} + \mathbf{K}\,\mathbf{T} = \mathbf{F}(t), \qquad \mathbf{C} = \sum_e\int_{V_e}\rho c\,\mathbf{N}^{\mathsf T}\mathbf{N}\,dV,
$$ {#eq-semidiscrete}
where $\mathbf{K}$ and $\mathbf{F}$ are as in the steady problem and $\mathbf{C}$ is the **capacity matrix** (J/K). For a two-node linear element of length $L$ and area $A$, the **consistent** capacity matrix is $\frac{\rho cAL}{6}[2, 1; 1, 2]$; the **lumped** (diagonal) version puts half the element's heat capacity at each node, $\frac{\rho cAL}{2}[1, 0; 0, 1]$.
:::

::: proof
The weak form of the transient equation is the steady weak form plus the term $\int w\,\rho c\,\partial T/\partial t\,dV$ on the left. With $w = N_i$ and $T = \sum_j N_jT_j(t)$, this term is $\sum_j\left(\int\rho cN_iN_j\,dV\right)\dot T_j$, which is row $i$ of $\mathbf{C}\dot{\mathbf{T}}$. For the linear element $\int_0^L N_1^2\,dx = L/3$ and $\int_0^L N_1N_2\,dx = L/6$. The lumped matrix is obtained by adding each row of the consistent matrix onto its diagonal, which conserves the total heat capacity $\rho cAL$.
:::

The semi-discrete system is a set of coupled first-order ODEs — in modal terms, a set of uncoupled decays $\dot y_i = -\lambda_iy_i$, where $\lambda_i$ are the eigenvalues of $\mathbf{C}^{-1}\mathbf{K}$ (s⁻¹), the inverse time constants of the mesh. The largest $\lambda$ belongs to the shortest-wavelength pattern the mesh can represent and scales as $k/(\rho c\,h^2)$; it decides the stability of explicit integration.

::: algorithm The generalised trapezoidal (θ) method {#alg-theta}
Here $\theta$ is a time-integration parameter between 0 and 1, not a temperature. With time step $\Delta t$, approximate $\dot{\mathbf{T}} \approx (\mathbf{T}_{n+1} - \mathbf{T}_n)/\Delta t$ and evaluate the remaining terms at a weighted average of the two ends of the step:
$$
\left(\frac{1}{\Delta t}\mathbf{C} + \theta\mathbf{K}\right)\mathbf{T}_{n+1} = \left(\frac{1}{\Delta t}\mathbf{C} - (1 - \theta)\mathbf{K}\right)\mathbf{T}_n + \theta\mathbf{F}_{n+1} + (1 - \theta)\mathbf{F}_n.
$$
1. Assemble $\mathbf{C}$, $\mathbf{K}$; form and factorise the left-hand matrix once (it is constant if $\Delta t$ and the properties are).
2. For each step, form the right-hand side, impose prescribed temperatures at $t_{n+1}$, and solve.

$\theta = 0$: **forward Euler** (explicit; with lumped $\mathbf{C}$ no equation solving at all). $\theta = \tfrac12$: **Crank–Nicolson** (second-order accurate). $\theta = 1$: **backward Euler** (first order, very robust).
:::

::: proposition Stability of the θ-method {#prop-stability}
Applied to the modal equation $\dot y = -\lambda y$ ($\lambda > 0$), the θ-method gives $y_{n+1} = G\,y_n$ with amplification factor
$$
G(\lambda\Delta t) = \frac{1 - (1 - \theta)\lambda\Delta t}{1 + \theta\lambda\Delta t}.
$$
For $\theta \ge \tfrac12$ the method is **unconditionally stable** ($\lvert G\rvert \le 1$ for every $\Delta t$). For $\theta < \tfrac12$ it is stable only if $\Delta t \le \dfrac{2}{(1 - 2\theta)\lambda_{\max}}$; for forward Euler, $\Delta t_{\text{cr}} = 2/\lambda_{\max}$.
:::

::: proof
Substituting $\mathbf{T} = y\boldsymbol{\psi}$ for a mode with $\mathbf{K}\boldsymbol{\psi} = \lambda\mathbf{C}\boldsymbol{\psi}$ (and no load) into the scheme gives $(1/\Delta t + \theta\lambda)y_{n+1} = (1/\Delta t - (1 - \theta)\lambda)y_n$, i.e. the stated $G$ with $z = \lambda\Delta t > 0$. $G < 1$ always. $G \ge -1$ requires $1 - (1 - \theta)z \ge -1 - \theta z$, i.e. $(1 - 2\theta)z \le 2$, which holds for all $z$ when $\theta \ge \tfrac12$ and gives $z \le 2/(1 - 2\theta)$ otherwise. Since the scheme applied to the coupled system is the scheme applied to each mode, the whole solution is stable if and only if the condition holds for the largest $\lambda$.
:::

Stability is not accuracy. Crank–Nicolson has $G \to -1$ as $\lambda\Delta t \to \infty$: the high-frequency content of a sudden change (a step in surface temperature) is not damped but flips sign every step, producing persistent spurious oscillations near the surface. Backward Euler has $G \to 0$ and damps them; it is the safe choice for problems with sudden changes, at the cost of first-order accuracy. The exact decay $G = e^{-\lambda\Delta t}$ is always between 0 and 1.

::: widget plot
f: exp(-x); 1 - x; (1 - x/2)/(1 + x/2); 1/(1 + x)
x: 0, 5
y: -2, 1.1
labels: e^{-\lambda\Delta t}\ \text{exact}; \theta = 0; \theta = 1/2; \theta = 1
hlines: -1
caption: Amplification factor $G$ per time step against $\lambda\Delta t$ for the exact decay and for forward Euler ($\theta = 0$), Crank–Nicolson ($\theta = \tfrac12$) and backward Euler ($\theta = 1$). Forward Euler falls below $-1$ — instability — once $\lambda\Delta t > 2$. Crank–Nicolson stays within $\pm1$ but tends to $-1$: stiff modes oscillate instead of decaying. Backward Euler is always between 0 and 1, damped but less accurate for small $\lambda\Delta t$.
:::

::: example A suddenly heated steel plate {#ex-transient}
A steel plate ($k = 50\,\mathrm{W/m\,K}$, $\rho = 7850\,\mathrm{kg/m^3}$, $c = 460\,\mathrm{J/kg\,K}$) $20\,\mathrm{mm}$ thick, initially at $20\,^\circ\mathrm{C}$, has one face suddenly raised to $220\,^\circ\mathrm{C}$ and the other insulated. Model the thickness with two linear elements and a lumped capacity matrix (per $\mathrm{m^2}$). (a) Find the critical time step for forward Euler. (b) Take one backward-Euler step of $1\,\mathrm{s}$. (c) Compare backward-Euler temperatures at $t = 60\,\mathrm{s}$ for $\Delta t = 1, 20, 60\,\mathrm{s}$ with the exact solution.
::: solution
$\rho c = 3.611\times10^{6}\,\mathrm{J/m^3\,K}$, $L_e = 0.01\,\mathrm{m}$, $k/L_e = 5000\,\mathrm{W/m^2\,K}$. Nodes 1 (heated face, prescribed), 2 (middle), 3 (insulated face). Lumped capacities: node 2 $\rho cL_e = 36\,110$, node 3 $\rho cL_e/2 = 18\,055\,\mathrm{J/m^2\,K}$.

(a) Free-DOF matrices: $\mathbf{K}_{ff} = 5000[2, -1; -1, 1]$, $\mathbf{C}_{ff} = \operatorname{diag}(36\,110, 18\,055)$. The eigenvalues of $\mathbf{C}_{ff}^{-1}\mathbf{K}_{ff}$ are $0.4728$ and $0.0811\,\mathrm{s^{-1}}$, so $\Delta t_\text{cr} = 2/0.4728 = 4.23\,\mathrm{s}$.

(b) With $\Delta t = 1\,\mathrm{s}$, the backward-Euler system for nodes 2 and 3, with $T_1 = 220$ moved to the right, is
$$
\begin{bmatrix} 36\,110 + 10\,000 & -5000 \\ -5000 & 18\,055 + 5000 \end{bmatrix}\begin{bmatrix} T_2 \\ T_3 \end{bmatrix} = \begin{bmatrix} 36\,110 \times 20 + 5000 \times 220 \\ 18\,055 \times 20 \end{bmatrix},
$$
giving $T_2 = 42.21\,^\circ\mathrm{C}$, $T_3 = 24.82\,^\circ\mathrm{C}$. (One forward-Euler step of the same size gives $T_2 = 47.69$, $T_3 = 20.00$: the explicit method cannot feel the insulated face until the second step.)

(c) Temperatures at $t = 60\,\mathrm{s}$ (mid-plane, insulated face): $\Delta t = 1\,\mathrm{s}$: $218.4$, $217.8$; $\Delta t = 20\,\mathrm{s}$: $210.5$, $206.6$; $\Delta t = 60\,\mathrm{s}$ (a single step): $189.9$, $180.3\,^\circ\mathrm{C}$. The exact series solution for the slab gives $218.9$ and $218.5\,^\circ\mathrm{C}$.

*Check.* The characteristic time $L^2/\alpha$, with $\alpha = k/\rho c = 1.38\times10^{-5}\,\mathrm{m^2/s}$, is $29\,\mathrm{s}$, so after a minute the plate is nearly uniform, as all solutions show. With $\Delta t = 1\,\mathrm{s}$ the remaining error ($0.5\,^\circ\mathrm{C}$ at mid-plane) is spatial — only two elements — while large steps add a time-integration lag. Backward Euler is stable at $60\,\mathrm{s}$, fourteen times the explicit limit, but stability did not make it accurate.
:::
:::

::: widget heat
equation: heat
f: 1
L: 1
k: 1
boundary: dirichlet
terms: 60
caption: The exact (Fourier-series) solution of transient conduction in a slab initially at uniform temperature whose two faces are suddenly held at zero, in dimensionless units. Watch the sharp corners at the faces round off almost instantly while the centre is still untouched: the short-wavelength components decay fastest, at rates proportional to the square of their wavenumber. Those are exactly the modes with the largest $\lambda$ in a finite element mesh, which set the explicit stability limit and which Crank–Nicolson fails to damp.
:::

::: warning Heat rates from gradients, and time steps from intuition
Two habits cause most errors in thermal models. **Heat flow from element gradients**: in linear elements the gradient is constant and only $O(h)$ accurate; the heat through a boundary should be taken from the nodal reactions (the "flux" on the Dirichlet nodes), which are consistent with the energy balance and converge like $h^2$. A global energy check — heat in through prescribed temperatures equals heat out by convection plus heat stored — catches errors in boundary conditions at once. **Time steps**: an explicit scheme above $\Delta t_\text{cr}$ explodes; an implicit scheme with a step longer than the times of interest is stable but wrong. Resolve the fastest phenomenon you care about (a thermal shock at a surface needs small elements *and* small steps there), and check by halving $\Delta t$.
:::

::: quiz
A Crank–Nicolson analysis of a suddenly quenched plate shows the surface-node temperature oscillating above and below its expected value for the first few steps, while the interior looks smooth. What is the best remedy?
- [ ] Switch to forward Euler with the same time step.
- [ ] Use a consistent instead of a lumped capacity matrix.
- [x] Use backward Euler (or start with a few backward-Euler steps), or reduce the time step so that $\lambda_{\max}\Delta t$ is not large.
- [ ] Coarsen the mesh near the surface.
::: solution
The oscillation is the $G \to -1$ behaviour of Crank–Nicolson for the stiff, short-wavelength modes excited by the sudden change. Backward Euler damps them ($G \to 0$). Forward Euler with a step that large would be unstable. Coarsening the mesh reduces $\lambda_{\max}$ and therefore the oscillation, but at the cost of resolution exactly where the gradients are steepest — the wrong trade.
:::
:::

::: history
Zienkiewicz and Cheung's 1965 paper "Finite elements in the solution of field problems" (in *The Engineer*) showed that the elements developed for elasticity could be applied unchanged to heat conduction, seepage and other quasi-harmonic problems, and their 1967 textbook presented the method as a general tool for continuum problems, not only for structures. The time-stepping schemes are older: the implicit scheme that bears their names was published by John Crank and Phyllis Nicolson in 1947 for heat-conduction problems in a finite-difference setting, and the stability analysis by amplification factors goes back to John von Neumann's work of the 1940s. Thermal analysis is now among the commonest uses of finite elements in mechanical design — of turbine blades and discs, brakes, electronic packages and welds — usually coupled with a stress analysis that uses the computed temperatures as thermal loads.
:::

::: summary
- Heat conduction, torsion, seepage, electrostatics and potential flow share the quasi-harmonic equation $\nabla\cdot(k\nabla\phi) + Q = 0$ and the same finite elements.
- The conduction matrix $\int\mathbf{B}^{\mathsf T}\mathbf{k}\mathbf{B}\,dV$ is a stiffness matrix with rows summing to zero; prescribed temperatures are essential, fluxes natural, and convection adds $h\int\mathbf{N}^{\mathsf T}\mathbf{N}$ to the matrix and $h\phi_\infty\int\mathbf{N}^{\mathsf T}$ to the load.
- One-dimensional elements: $\frac{kA}{L}[1, -1; -1, 1]$, plus $\frac{hPL}{6}[2, 1; 1, 2]$ for a convecting surface. Heat rates are best taken from nodal reactions.
- Transient problems give $\mathbf{C}\dot{\mathbf{T}} + \mathbf{K}\mathbf{T} = \mathbf{F}$, with consistent or lumped capacity matrices.
- The θ-method has $G = [1 - (1 - \theta)\lambda\Delta t]/(1 + \theta\lambda\Delta t)$: $\theta \ge \tfrac12$ is unconditionally stable; forward Euler needs $\Delta t \le 2/\lambda_{\max}$, with $\lambda_{\max} \sim k/(\rho c h^2)$.
- Crank–Nicolson is second-order but oscillates for stiff modes; backward Euler damps them. Stability is not accuracy: check by halving $\Delta t$.
:::

## Exercises

::: exercise Conductance of a copper rod {level=1 check="0.8"}
A copper rod ($k = 400\,\mathrm{W/m\,K}$) of cross-section $1.0\times10^{-4}\,\mathrm{m^2}$ is modelled with elements $50\,\mathrm{mm}$ long. What is the element conductance $kA/L$? (Enter it in W/K.)
::: solution
$400 \times 10^{-4}/0.05 = 0.8\,\mathrm{W/K}$.
:::
:::

::: exercise Heat flux in an element {level=1 check="100"}
A linear element $10\,\mathrm{mm}$ long in steel ($k = 50\,\mathrm{W/m\,K}$) has nodal temperatures $100\,^\circ\mathrm{C}$ at $x = 0$ and $80\,^\circ\mathrm{C}$ at $x = 10\,\mathrm{mm}$. What is the heat flux $q_x$ in the element? (Enter it in kW/m².)
::: solution
$q_x = -k\,dT/dx = -50 \times (80 - 100)/0.01 = 1.0\times10^{5}\,\mathrm{W/m^2} = 100\,\mathrm{kW/m^2}$, positive in $+x$, from hot to cold.
:::
:::

::: exercise An explicit time step {level=1 check="5"}
The largest eigenvalue of $\mathbf{C}^{-1}\mathbf{K}$ for a thermal mesh with lumped capacity is $0.4\,\mathrm{s^{-1}}$. What is the largest stable time step for forward Euler? (Enter it in s.)
::: solution
$\Delta t_\text{cr} = 2/\lambda_{\max} = 2/0.4 = 5\,\mathrm{s}$.
:::
:::

::: exercise Surface temperature of a wall {level=2 check="6.667"}
A wall $0.2\,\mathrm{m}$ thick with $k = 1.0\,\mathrm{W/m\,K}$ has its inner face at $20\,^\circ\mathrm{C}$ and its outer face convecting to air at $0\,^\circ\mathrm{C}$ with $h = 10\,\mathrm{W/m^2\,K}$. Using one element, find the outer-surface temperature. (Enter it in °C.)
::: solution
Per unit area, node 2 equation: $(k/L + h)T_2 = (k/L)T_1 + hT_\infty$, i.e. $(5 + 10)T_2 = 5 \times 20$, $T_2 = 6.667\,^\circ\mathrm{C}$. Check: resistance $0.2 + 0.1 = 0.3\,\mathrm{m^2K/W}$, flux $66.7\,\mathrm{W/m^2}$, surface temperature $66.7/10 = 6.67\,^\circ\mathrm{C}$ above ambient.
:::
:::

::: exercise A one-element fin {level=2 check="91.346"}
Verify the one-element result of [[#ex-fin]]: assemble the $2 \times 2$ matrix with conduction and lateral convection, impose the base temperature and find the tip temperature. (Enter $T_\text{tip}$ in °C.)
::: solution
Row 2: $(kA/L + 2hPL/6)T_2 + (-kA/L + hPL/6)T_1 = hPLT_\infty/2$. With $kA/L = 0.078540$, $hPL/6 = 0.0032725$: $0.085085\,T_2 = 0.24544 + 0.075267 \times 100 = 7.77214$, so $T_2 = 91.346\,^\circ\mathrm{C}$ (exact $91.511$).
:::
:::

::: exercise One Crank–Nicolson step {level=2 check="0.6"}
For the scalar equation $\dot y = -0.5\,y$, $y(0) = 1$, take one Crank–Nicolson step with $\Delta t = 1$. (Enter $y_1$.) Compare with backward Euler and with the exact value.
::: solution
$G = (1 - 0.25)/(1 + 0.25) = 0.6$, so $y_1 = 0.6$. Backward Euler: $1/1.5 = 0.6667$. Exact: $e^{-0.5} = 0.6065$. Crank–Nicolson is much more accurate here, where $\lambda\Delta t$ is small.
:::
:::

::: exercise The explicit limit for a uniform mesh {level=3 check="3.611"}
For a long uniform mesh of linear elements of length $h$ with lumped capacity, show that the highest mode is the "zig-zag" $T_j = (-1)^j$ and derive $\Delta t_\text{cr} = \rho c\,h^2/(2k)$ for forward Euler. Evaluate it for steel ($k = 50\,\mathrm{W/m\,K}$, $\rho c = 3.611\times10^{6}\,\mathrm{J/m^3\,K}$) with $h = 10\,\mathrm{mm}$. (Enter $\Delta t_\text{cr}$ in s.)
::: solution
At an interior node, per unit area, lumped capacity $\rho ch$ and conductance row $\frac{k}{h}[-1, 2, -1]$. For $T_j = (-1)^j$ the conduction term is $\frac{k}{h}(2 + 1 + 1)(-1)^j = \frac{4k}{h}T_j$, so $\lambda = 4k/(\rho ch^2)$; no mode has larger $\lambda$ (Gershgorin's theorem bounds every eigenvalue by $4k/\rho ch^2$). Hence $\Delta t_\text{cr} = 2/\lambda = \rho ch^2/(2k)$, i.e. a mesh Fourier number $\alpha\Delta t/h^2 \le \tfrac12$. For steel: $3.611\times10^6 \times 10^{-4}/100 = 3.611\,\mathrm{s}$. (The two-element plate of [[#ex-transient]] has a slightly larger limit, $4.23\,\mathrm{s}$, because it is too short to contain the full zig-zag.) Halving $h$ divides $\Delta t_\text{cr}$ by four — the price of explicit methods on fine meshes.
:::
:::

::: exercise The torsion problem as a field problem {level=3}
For Saint-Venant torsion, the Prandtl stress function $\phi$ satisfies $\nabla^2\phi = -2G\theta'$ in the cross-section, with $\phi = 0$ on the outer boundary, and the torque is $T = 2\int_A\phi\,dA$. Write the weak form and the finite element equations using linear triangles, identify $k$, $Q$ and the boundary conditions in the analogy of [[#def-field]], and explain how you would compute the torsion constant $J = T/(G\theta')$ and the maximum shear stress from the nodal values.
::: solution
Analogy: $k = 1$, $Q = 2G\theta'$, Dirichlet $\phi = 0$ on the boundary (no Neumann conditions for a solid section). Weak form: $\int_A\nabla w\cdot\nabla\phi\,dA = \int_A 2G\theta'\,w\,dA$ for $w = 0$ on the boundary. With triangles: $\mathbf{k}^{(e)} = \frac{1}{4A}(\mathbf{b}\mathbf{b}^{\mathsf T} + \mathbf{c}\mathbf{c}^{\mathsf T})$ and $\mathbf{f}^{(e)} = \frac{2G\theta'A}{3}[1, 1, 1]^{\mathsf T}$. It is convenient to solve with $G\theta' = 1$. Then $T/(G\theta') = 2\sum_e\int_{A_e}\phi\,dA = 2\sum_eA_e(\phi_1 + \phi_2 + \phi_3)/3$ gives $J$. The shear stresses $\tau_{xz} = \partial\phi/\partial y$, $\tau_{yz} = -\partial\phi/\partial x$ are constant in each triangle (scaled by the actual $G\theta'$); the maximum, which occurs on the boundary at the point nearest the centre, is under-estimated by coarse meshes, so refine there. For a circular section of radius $R$ the exact $J = \pi R^4/2$ is a useful check of the code.
:::
:::

::: exercise A thermal model of a heat sink {level=3}
An extruded aluminium heat sink with twelve rectangular fins cools an electronic component dissipating $40\,\mathrm{W}$ through a thermal pad. Propose a finite element model to estimate the component's case temperature: the idealisation (2-D cross-section or 3-D), the boundary conditions and how you would obtain the convection coefficients, the mesh near the base and fins, and the checks you would make. Discuss what the model can and cannot tell you.
::: solution
A 2-D cross-section of the extrusion is appropriate if the heat input is uniform along the length; a local component on a long sink needs 3-D. Model the base and fins with quadrilateral elements, at least two or three through each fin thickness and enough along the fin to capture the exponential decay ($mL$ of order 1); the pad as a thin layer with its conductance (or a contact conductance), and the heat input as a flux over the component footprint. Convection coefficients are the main uncertainty: take them from correlations for natural or forced convection between fins ([[heat-transfer/external-convection]], [[heat-transfer/natural-convection]]) or from a coupled CFD or a test; radiation may add a significant fraction in natural convection. Checks: energy balance (40 W in equals convected out); comparison with a fin-efficiency hand calculation; mesh refinement of the base spreading region; sensitivity of the case temperature to $h$ (often the dominant uncertainty). The model predicts temperatures *given* $h$; it cannot predict $h$ itself, and its accuracy is limited by the convection data and the pad conductance, not by the mesh.
:::
:::
