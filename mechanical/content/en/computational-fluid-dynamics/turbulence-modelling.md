Nearly every flow an engineer computes is turbulent: the air over a car or a wing, the water in a pump, the gas in a combustor, the coolant in a heat exchanger. Turbulence is not a separate physics — the Navier–Stokes equations of [[computational-fluid-dynamics/governing-equations]] describe it completely — but it is a regime of those equations in which the solution is chaotic, three-dimensional and unsteady, with eddies spanning a vast range of sizes. The largest eddies are as big as the flow itself; the smallest, where the kinetic energy is finally dissipated into heat, can be a fraction of a millimetre. Resolving all of them on a grid is possible only at modest Reynolds numbers and enormous cost. Engineering CFD therefore *models* turbulence: it computes an averaged flow and represents the effect of the fluctuations on it by additional equations whose form is partly derived and partly calibrated against experiments. This lesson explains why that is necessary, how the averaged equations are obtained, how the classical models work, how walls are treated, and what large-eddy simulation offers in between.

A model is only as good as the flows it was calibrated for. The aim here is not to memorise constants but to understand what each model assumes, so that you can choose one sensibly and judge its results critically. The boundary-layer physics behind this lesson is in [[fluid-mechanics/boundary-layers-drag]].

## Why turbulence must be modelled

Kolmogorov's 1941 theory pictures turbulence as an **energy cascade**: the mean flow feeds energy into large eddies of size $\ell$ and velocity $u'$ at a rate $\varepsilon \sim u'^3/\ell$ per unit mass; large eddies break into smaller ones, passing the energy down without loss, until eddies are small enough for viscosity to dissipate it. The dissipating eddies can depend only on the rate at which energy arrives, $\varepsilon$, and on the viscosity $\nu$.

::: definition Kolmogorov scales {#def-kolmogorov}
The **Kolmogorov length, time and velocity scales** are the unique combinations of $\varepsilon$ (in $\mathrm{m^2/s^3}$, i.e. W/kg) and $\nu$ (in $\mathrm{m^2/s}$) with those dimensions:
$$
\eta = \left(\frac{\nu^3}{\varepsilon}\right)^{1/4},\qquad \tau_\eta = \left(\frac{\nu}{\varepsilon}\right)^{1/2},\qquad u_\eta = (\nu\varepsilon)^{1/4}.
$$ {#eq-kolmogorov}
Using $\varepsilon \sim u'^3/\ell$, the ratio of the largest to the smallest scales is $\ell/\eta \sim \mathrm{Re}_\ell^{3/4}$ with $\mathrm{Re}_\ell = u'\ell/\nu$.
:::

A **direct numerical simulation** (DNS) must resolve both ends of the range in all three directions, so it needs about $(\ell/\eta)^3 \sim \mathrm{Re}^{9/4}$ grid points, and — because the time step must resolve the smallest eddies while the run must last several large-eddy turnover times — about $\mathrm{Re}^{3/4}$ time steps: total cost growing like $\mathrm{Re}^3$.

::: example How small are the smallest eddies? {#ex-kolmogorov}
Water ($\nu = 1.0\times10^{-6}\ \mathrm{m^2/s}$) flows at $U = 1.0\ \mathrm{m/s}$ through a pipe of diameter $D = 0.10\ \mathrm{m}$. Estimate the mean dissipation rate from the pressure drop, the Kolmogorov length and time scales, and the number of grid points a DNS of a pipe section ten diameters long would need with a grid spacing equal to $\eta$.
::: solution
$\mathrm{Re}_D = UD/\nu = 1.0\times10^{5}$. The Blasius friction factor is $f = 0.316\,\mathrm{Re}^{-1/4} = 0.0178$. The power dissipated per unit mass equals the pressure drop times the flow rate divided by the mass: $\varepsilon = (\Delta p/L)\,U/\rho = f U^3/(2D) = 0.0178 \times 1.0/0.20 = 0.089\ \mathrm{W/kg}$ (averaged over the cross-section; near the wall it is much higher). Then
$$
\eta = \left(\frac{(10^{-6})^3}{0.089}\right)^{1/4} = 5.8\times10^{-5}\ \mathrm{m},\qquad \tau_\eta = \left(\frac{10^{-6}}{0.089}\right)^{1/2} = 3.4\times10^{-3}\ \mathrm{s}.
$$
A cylinder $1.0\ \mathrm{m}$ long and $0.10\ \mathrm{m}$ in diameter divided into cubes of side $\eta$ needs $(1.0/\eta)(\pi/4)(0.10/\eta)^2 \approx 4\times10^{10}$ points — consistent in order of magnitude with the scaling $\mathrm{Re}^{9/4} = 1.8\times10^{11}$. Sanity check: DNS in practice can use spacings of a few $\eta$ with spectral accuracy, which lowers the count by an order of magnitude; still, a single DNS of this modest pipe flow is a large supercomputer job, while an engineer needs hundreds of design variants on a workstation.
:::
:::

## Reynolds averaging

Osborne Reynolds's idea (1895) was to split every variable into a mean and a fluctuation, $u_i = U_i + u_i'$, $p = P + p'$, where the mean $U_i = \overline{u_i}$ is a time average (for statistically steady flow) or an ensemble average. By definition $\overline{u_i'} = 0$, but averages of *products* of fluctuations are not zero: $\overline{u_i'u_j'} \ne 0$ in general.

::: proposition The Reynolds-averaged Navier–Stokes equations {#prop-rans}
For incompressible flow with constant $\rho$ and $\mu$, the mean velocity and pressure satisfy
$$
\frac{\partial U_i}{\partial x_i} = 0,\qquad
\rho\left(\frac{\partial U_i}{\partial t} + U_j\frac{\partial U_i}{\partial x_j}\right) = -\frac{\partial P}{\partial x_i} + \frac{\partial}{\partial x_j}\left(\mu\frac{\partial U_i}{\partial x_j} - \rho\,\overline{u_i'u_j'}\right).
$$ {#eq-rans}
The new term $-\rho\,\overline{u_i'u_j'}$ is the **Reynolds stress tensor**.
:::

::: proof
Averaging is linear and commutes with derivatives in space and time. Average continuity: $\overline{\partial u_i/\partial x_i} = \partial U_i/\partial x_i = 0$, and subtracting this from the instantaneous equation shows $\partial u_i'/\partial x_i = 0$ too. Write the convective term in conservative form, $\partial(u_iu_j)/\partial x_j$, valid because $\nabla\cdot\mathbf{u} = 0$, and average the product:
$$
\overline{u_iu_j} = \overline{(U_i + u_i')(U_j + u_j')} = U_iU_j + U_i\overline{u_j'} + U_j\overline{u_i'} + \overline{u_i'u_j'} = U_iU_j + \overline{u_i'u_j'} ,
$$
since a mean times the mean of a fluctuation vanishes. All other terms are linear and simply become their mean values. Hence $\rho\,\partial U_i/\partial t + \rho\,\partial(U_iU_j)/\partial x_j + \rho\,\partial\overline{u_i'u_j'}/\partial x_j = -\partial P/\partial x_i + \mu\nabla^2U_i$; moving the fluctuation term to the right and using mean continuity to write $\partial(U_iU_j)/\partial x_j = U_j\partial U_i/\partial x_j$ gives [[#eq-rans]].
:::

The averaged equations look like the laminar ones with an extra stress, and this is the whole difficulty: the six independent components of $\overline{u_i'u_j'}$ are new unknowns, while the number of equations (four) has not changed. Deriving equations for $\overline{u_i'u_j'}$ from the Navier–Stokes equations is possible, but they contain triple correlations $\overline{u_i'u_j'u_k'}$, whose equations contain fourth-order correlations, and so on without end. This is the **closure problem**. Every RANS model is a closure assumption: a recipe for the Reynolds stresses in terms of mean quantities.

The trace of the Reynolds stress tensor gives the **turbulence kinetic energy** per unit mass,
$$
k = \tfrac12\,\overline{u_i'u_i'} = \tfrac12\left(\overline{u'^2} + \overline{v'^2} + \overline{w'^2}\right),
$$ {#eq-tke}
which appears in every two-equation model.

## Eddy viscosity

Joseph Boussinesq (1877) proposed that turbulent momentum transfer behaves like an enhanced viscosity: the Reynolds stresses are proportional to the mean strain rate.

::: definition The Boussinesq eddy-viscosity hypothesis {#def-boussinesq}
$$
-\rho\,\overline{u_i'u_j'} = \mu_t\left(\frac{\partial U_i}{\partial x_j} + \frac{\partial U_j}{\partial x_i}\right) - \frac{2}{3}\rho k\,\delta_{ij},
$$ {#eq-boussinesq}
where $\mu_t$ (or $\nu_t = \mu_t/\rho$) is the **eddy viscosity**, a property of the flow, not of the fluid. The isotropic term $-\tfrac23\rho k\delta_{ij}$ makes the trace of both sides agree (the strain-rate tensor is traceless in incompressible flow); it is usually absorbed into a modified pressure.
:::

With [[#eq-boussinesq]], the RANS equations become the laminar equations with $\mu$ replaced by $\mu + \mu_t$, and all the machinery of the previous lessons applies unchanged. The modelling task shrinks to finding one scalar field, $\mu_t$. Dimensionally, $\nu_t$ is a velocity times a length, $\nu_t \sim u'\ell$; models differ in how they obtain those two scales.

The hypothesis has known weaknesses. It aligns the principal axes of the Reynolds stress with those of the mean strain, which is wrong in strongly three-dimensional, swirling or rapidly distorted flows; it gives equal normal stresses in simple shear, where experiments show $\overline{u'^2} > \overline{w'^2} > \overline{v'^2}$, so secondary flows in square ducts are missed; and it cannot represent effects of streamline curvature and rotation without ad hoc corrections. **Reynolds-stress models**, which solve transport equations for all six stresses, avoid the hypothesis at greater cost and with poorer robustness.

### Prandtl's mixing length and the log law

Prandtl (1925) estimated the eddy viscosity in a shear flow by analogy with molecular motion: a fluid lump moved a distance $\ell_m$ across the mean gradient carries a velocity excess $u' \sim \ell_m\,\lvert\mathrm{d}U/\mathrm{d}y\rvert$, so $\nu_t = \ell_m^2\,\lvert\mathrm{d}U/\mathrm{d}y\rvert$. Near a wall the eddies are limited in size by the distance to the wall, suggesting $\ell_m = \kappa y$.

::: proposition The logarithmic law of the wall {#prop-log-law}
Assume that in a region near a wall, far enough from it that viscous stress is negligible but close enough that the total shear stress has its wall value $\tau_w$, the Reynolds stress is given by the mixing length $\ell_m = \kappa y$. Then the mean velocity satisfies
$$
U^+ = \frac{1}{\kappa}\ln y^+ + B,\qquad U^+ = \frac{U}{u_\tau},\quad y^+ = \frac{y\,u_\tau}{\nu},\quad u_\tau = \sqrt{\frac{\tau_w}{\rho}},
$$ {#eq-log-law}
with $\kappa \approx 0.41$ (the von Kármán constant) and $B \approx 5.0$ determined by experiment. Closer to the wall, where viscous stress dominates, $U^+ = y^+$.
:::

::: proof
In the region considered, $\tau = \rho\nu_t\,\mathrm{d}U/\mathrm{d}y = \rho\kappa^2y^2(\mathrm{d}U/\mathrm{d}y)^2 = \tau_w$, so $\kappa y\,\mathrm{d}U/\mathrm{d}y = u_\tau$, i.e. $\mathrm{d}U/\mathrm{d}y = u_\tau/(\kappa y)$. Integrating, $U = (u_\tau/\kappa)\ln y + C$. The constant cannot be found from this region alone, because the log diverges at $y = 0$; it is fixed by matching to the viscous layer. Dimensional consistency requires the argument of the logarithm to be dimensionless, and near a smooth wall the only length available is $\nu/u_\tau$; writing $C = (u_\tau/\kappa)\ln(u_\tau/\nu) + Bu_\tau$ gives [[#eq-log-law]]. In the **viscous sublayer** the Reynolds stress vanishes at the wall and $\tau = \mu\,\mathrm{d}U/\mathrm{d}y = \tau_w$, so $U = \tau_wy/\mu$, i.e. $U^+ = y^+$. (The same law follows from dimensional analysis and overlap matching without any mixing-length assumption, which is why it is so robust.)
:::

The resulting structure — **viscous sublayer** $y^+ \lesssim 5$, **buffer layer** $5 \lesssim y^+ \lesssim 30$, **log layer** from $y^+ \approx 30$ out to about $0.1$–$0.2$ of the boundary-layer thickness — holds with remarkable universality in attached boundary layers, pipes and channels. Spalding (1961) gave a single formula covering all three regions:
$$
y^+ = U^+ + e^{-\kappa B}\left[e^{\kappa U^+} - 1 - \kappa U^+ - \frac{(\kappa U^+)^2}{2} - \frac{(\kappa U^+)^3}{6}\right].
$$ {#eq-spalding}

::: widget plot
f: 10^x; 5.616*x + 5.0
x: -1, 3.5
y: 0, 30
labels: U^+ = y^+; U^+ = \tfrac{1}{0.41}\ln y^+ + 5.0
vlines: 0.699; 1.477
caption: The law of the wall with $\log_{10} y^+$ on the horizontal axis ($-1$ to $3.5$ means $y^+ = 0.1$ to about $3000$). The viscous-sublayer line $U^+ = y^+$ and the log law are both exact asymptotes of the measured profile; the dashed lines mark $y^+ = 5$ and $y^+ = 30$, the edges of the buffer layer, where neither holds and the true profile (Spalding's formula, next figure) bends from one to the other. Wall functions assume the first grid node lies to the right of $y^+ \approx 30$; low-Reynolds-number wall treatments put it at $y^+ \approx 1$, deep in the sublayer.
:::

::: widget parametric
fx: log10(t + exp(-2.05)*(exp(0.41*t) - 1 - 0.41*t - (0.41*t)^2/2 - (0.41*t)^3/6))
fy: t
t: 0.1, 26
x: -1, 3.5
y: 0, 28
equal: false
caption: Spalding's composite law of the wall [[#eq-spalding]] with $\kappa = 0.41$ and $B = 5.0$ ($e^{-\kappa B} = e^{-2.05}$), traced as $U^+$ rises: horizontal axis $\log_{10}y^+$, vertical axis $U^+$. Compare with the two asymptotes in the previous figure: the curve follows $U^+ = y^+$ up to $y^+ \approx 5$, bends through the buffer layer, and joins the logarithmic straight line by $y^+ \approx 30$–$50$. It is used to evaluate wall shear stress when the first cell falls in the buffer layer, where neither asymptote is valid.
:::

## Two-equation models

The mixing length must be prescribed flow by flow. Two-equation models instead compute the velocity and length scales from two transport equations, so that the history and transport of turbulence are represented. The first is always for $k$; the second for a quantity that supplies the length scale.

::: definition The standard $k$–$\varepsilon$ model {#def-k-epsilon}
With the dissipation rate $\varepsilon$ and the production $P_k = \mu_t S^2$, $S = \sqrt{2S_{ij}S_{ij}}$, $S_{ij} = \tfrac12(\partial U_i/\partial x_j + \partial U_j/\partial x_i)$:
$$
\frac{\partial(\rho k)}{\partial t} + \nabla\cdot(\rho\mathbf{U}k) = \nabla\cdot\left[\left(\mu + \frac{\mu_t}{\sigma_k}\right)\nabla k\right] + P_k - \rho\varepsilon,
$$
$$
\frac{\partial(\rho\varepsilon)}{\partial t} + \nabla\cdot(\rho\mathbf{U}\varepsilon) = \nabla\cdot\left[\left(\mu + \frac{\mu_t}{\sigma_\varepsilon}\right)\nabla\varepsilon\right] + C_{1\varepsilon}\frac{\varepsilon}{k}P_k - C_{2\varepsilon}\rho\frac{\varepsilon^2}{k},
$$
$$
\mu_t = \rho C_\mu\frac{k^2}{\varepsilon},
$$ {#eq-k-epsilon}
with the constants of Launder and Sharma (1974): $C_\mu = 0.09$, $C_{1\varepsilon} = 1.44$, $C_{2\varepsilon} = 1.92$, $\sigma_k = 1.0$, $\sigma_\varepsilon = 1.3$.
:::

Each equation is a convection–diffusion–source equation of the kind treated in [[computational-fluid-dynamics/convection-diffusion]]. The $k$ equation is derived exactly from the Navier–Stokes equations, apart from the gradient-diffusion model of its transport terms; the $\varepsilon$ equation is essentially an empirical construction with the same structure. The eddy viscosity follows from dimensions: with velocity scale $\sqrt k$ and length scale $k^{3/2}/\varepsilon$, $\nu_t \propto k^2/\varepsilon$. The constants are calibrated: $C_{2\varepsilon}$ from the decay of grid turbulence, $C_\mu$ from the ratio $-\overline{u'v'}/k \approx 0.3$ measured in equilibrium shear layers ($C_\mu = 0.3^2$), and $C_{1\varepsilon}$ to reproduce the spreading rates of free shear flows and the log law.

The $k$–$\varepsilon$ model is robust and good for free shear flows and attached boundary layers in mild pressure gradients. It overpredicts $k$ in regions of strong strain, such as stagnation points (the "stagnation-point anomaly"), and it predicts separation too late under adverse pressure gradients. Its $\varepsilon$ equation is also badly behaved at a wall, which is why it is used with wall functions or modified with damping functions.

**The $k$–$\omega$ model** (Wilcox, 1988) uses the specific dissipation rate $\omega \sim \varepsilon/k$ (units $\mathrm{s^{-1}}$) and $\mu_t = \rho k/\omega$. Its $\omega$ equation can be integrated through the viscous sublayer to the wall without damping functions, and it performs better in adverse pressure gradients, but its results in free-stream regions are sensitive to the (arbitrary) free-stream value of $\omega$.

**Menter's SST model** (1994) combines the two: a blending function switches from $k$–$\omega$ near walls to a $k$–$\varepsilon$ formulation (rewritten in terms of $\omega$) away from them, removing the free-stream sensitivity; and the eddy viscosity is limited,
$$
\nu_t = \frac{a_1 k}{\max(a_1\omega,\ S F_2)},\qquad a_1 = 0.31,
$$
so that in an adverse pressure gradient the shear stress obeys Bradshaw's observation that $-\overline{u'v'} \approx a_1k$, instead of growing with the strain rate. This **shear-stress transport** limiter is what improves separation prediction. SST is the default choice in much of aerospace and turbomachinery CFD. The one-equation **Spalart–Allmaras** model (1992), with a transport equation for a modified eddy viscosity, was designed for external aerodynamics and is widely used for wings and aircraft.

::: example Turbulence quantities at an inlet {#ex-inlet}
Air ($\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$) enters a duct of diameter $D = 0.10\ \mathrm{m}$ at $U = 5.0\ \mathrm{m/s}$ with turbulence intensity $I = 5\,\%$. Estimate $k$ and $\varepsilon$ for a $k$–$\varepsilon$ inlet boundary condition, using the common length-scale estimate $\ell = 0.07D$, and the ratio $\nu_t/\nu$.
::: solution
For isotropic fluctuations with $u' = IU$ in each direction, $k = \tfrac32(IU)^2 = 1.5 \times (0.25)^2 = 0.0938\ \mathrm{m^2/s^2}$. With the convention $\varepsilon = C_\mu^{3/4}k^{3/2}/\ell$ (which makes $\ell$ a mixing length consistent with the log law) and $\ell = 0.0070\ \mathrm{m}$:
$$
\varepsilon = \frac{0.09^{3/4} \times 0.0938^{3/2}}{0.0070} = \frac{0.1643 \times 0.02871}{0.0070} = 0.674\ \mathrm{m^2/s^3}.
$$
Then $\nu_t = C_\mu k^2/\varepsilon = 0.09 \times 0.00879/0.674 = 1.17\times10^{-3}\ \mathrm{m^2/s}$, about $78$ times the molecular viscosity. Sanity check: eddy-viscosity ratios of $10$–$100$ are typical of moderately turbulent internal flows; the exact inlet values matter little if the inlet is far upstream of the region of interest, because $k$ and $\varepsilon$ adjust to the local production within a few diameters — but they matter a great deal for free-stream turbulence over a short body.
:::
:::

## Near-wall treatment

The steepest gradients of a turbulent flow lie in the thin wall layer, and the near-wall mesh determines how they are handled.

::: algorithm Choosing and sizing the near-wall mesh {#alg-wall-mesh}
1. Decide the wall treatment: **wall functions** (first node in the log layer, $30 \lesssim y^+ \lesssim 300$; the law of the wall supplies $\tau_w$ and the near-wall $k$ and $\varepsilon$) or **wall-resolved** (low-Reynolds-number) modelling (first node at $y^+ \approx 1$, with $10$–$20$ cells inside $y^+ < 30$). Use wall functions for attached flows where cost matters; resolve the wall for heat transfer, separation, transition and strong pressure gradients.
2. Estimate the skin-friction coefficient from a correlation, e.g. for a turbulent flat plate $C_f \approx 0.0576\,\mathrm{Re}_x^{-1/5}$ ($5\times10^{5} < \mathrm{Re}_x < 10^{7}$), or $C_f = f/4$ in a pipe.
3. Compute $\tau_w = \tfrac12\rho U^2C_f$ and $u_\tau = U\sqrt{C_f/2}$.
4. The wall distance of the first node is $y_P = y^+\nu/u_\tau$; on a cell-centred mesh the first cell height is $2y_P$.
5. After the run, check the computed $y^+$ distribution on all walls, and refine or coarsen locally.
:::

::: example First-cell height on a flat plate {#ex-first-cell}
Air ($\rho = 1.2\ \mathrm{kg/m^3}$, $\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$) flows at $U = 20\ \mathrm{m/s}$ over a flat plate. At $x = 1.0\ \mathrm{m}$, estimate the wall shear stress and the first-node distance for (a) a wall-resolved model with $y^+ = 1$ and (b) wall functions with $y^+ = 30$.
::: solution
$\mathrm{Re}_x = 20 \times 1.0/1.5\times10^{-5} = 1.33\times10^{6}$, so $C_f = 0.0576 \times (1.33\times10^{6})^{-0.2} = 3.43\times10^{-3}$. Then $\tau_w = 0.5 \times 1.2 \times 20^2 \times 3.43\times10^{-3} = 0.823\ \mathrm{Pa}$ and $u_\tau = 20\sqrt{3.43\times10^{-3}/2} = 0.828\ \mathrm{m/s}$, so $\nu/u_\tau = 1.81\times10^{-5}\ \mathrm{m}$.

(a) $y_P = 1 \times 1.81\times10^{-5} = 18\ \mu\mathrm{m}$, first cell height about $36\ \mu\mathrm{m}$.
(b) $y_P = 30 \times 1.81\times10^{-5} = 0.54\ \mathrm{mm}$, first cell height about $1.1\ \mathrm{mm}$.

The boundary-layer thickness there is about $0.37x\,\mathrm{Re}_x^{-1/5} = 22\ \mathrm{mm}$, so wall functions need a handful of cells across it, while wall resolution needs perhaps $30$ stretched cells. Sanity check: $u_\tau/U \approx 0.04$ is typical, and the viscous length $\nu/u_\tau$ of tens of micrometres explains why wall-resolved meshes have cells with aspect ratios of $1000$ or more along the wall.
:::
:::

::: example Friction velocity from one velocity reading {#ex-utau}
A velocity of $U = 10.0\ \mathrm{m/s}$ is computed at the first node, $y = 5.0\ \mathrm{mm}$ from a smooth wall, in air with $\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$. Find $u_\tau$ and $\tau_w$ from the log law with $\kappa = 0.41$, $B = 5.0$, as a wall function does, and confirm that the node is in the log layer.
::: solution
The log law is implicit in $u_\tau$: solve
$$
g(u_\tau) = u_\tau\left[\frac{1}{0.41}\ln\frac{0.005\,u_\tau}{1.5\times10^{-5}} + 5.0\right] - 10.0 = 0 .
$$
Newton's method from $u_\tau = 0.5\ \mathrm{m/s}$ converges in a few steps to $u_\tau = 0.563\ \mathrm{m/s}$. Then $y^+ = 0.005 \times 0.563/1.5\times10^{-5} = 188$ — inside the log layer, so the use of the law is consistent — and $\tau_w = \rho u_\tau^2 = 1.2 \times 0.563^2 = 0.380\ \mathrm{Pa}$ for $\rho = 1.2\ \mathrm{kg/m^3}$. Check: $U^+ = 10.0/0.563 = 17.8$ and $2.439\ln 188 + 5.0 = 17.8$.
:::
:::

::: widget newton
f: x*(ln(0.005*x/1.5e-5)/0.41 + 5.0) - 10
x0: 0.5
x: 0.1, 1.2
caption: Newton's method solving the log law for the friction velocity in the example above ($U = 10\ \mathrm{m/s}$ at $y = 5\ \mathrm{mm}$). The function is smooth and nearly linear near the root $u_\tau = 0.563\ \mathrm{m/s}$, so convergence is quadratic after a couple of steps — which is why wall-function codes can afford to do this at every wall face in every iteration. Try a poor start such as $x_0 = 0.12$: the first step overshoots, but the iteration recovers.
:::

::: warning Wall functions in the wrong place
Wall functions assume the first node is in the log layer of an attached, equilibrium boundary layer. Three common misuses: placing the first node in the viscous sublayer or buffer layer ($y^+ < 15$) with standard wall functions — the log law then gives a wildly wrong $\tau_w$ and $\varepsilon$ (many codes now offer "scalable" or "enhanced" wall treatments that blend, but not all do); using wall functions in separated or reattaching flows, where $\tau_w \to 0$ and the log law has no basis; and refining a wall-function mesh to "improve accuracy", which pushes $y^+$ below the valid range and makes the result *worse*. Always plot $y^+$ on every wall after the run, and match the mesh to the wall treatment.
:::

## Large-eddy simulation

Between RANS, which models all turbulent scales, and DNS, which models none, **large-eddy simulation** (LES) resolves the large, energy-containing eddies — which depend on the geometry and carry most of the transport — and models only the small ones, which are more nearly universal. The equations are spatially **filtered** with a filter width $\Delta$ comparable to the grid spacing; the filtered equations contain a **subgrid-scale stress** that must be modelled. The classical model, Smagorinsky's (1963), is an eddy viscosity built from the filter width and the resolved strain rate:
$$
\nu_{sgs} = (C_s\Delta)^2\,\lvert\bar S\rvert,\qquad \lvert\bar S\rvert = \sqrt{2\bar S_{ij}\bar S_{ij}},
$$ {#eq-smagorinsky}
with $C_s \approx 0.1$–$0.2$ depending on the flow. Germano and co-workers' dynamic procedure (1991) computes $C_s$ locally from the resolved field itself. For example, with $\Delta = 1.0\ \mathrm{mm}$, $C_s = 0.10$ and $\lvert\bar S\rvert = 500\ \mathrm{s^{-1}}$, $\nu_{sgs} = (10^{-4})^2 \times 500 = 5.0\times10^{-6}\ \mathrm{m^2/s}$ — a third of the molecular viscosity of air; most of the transport is carried by resolved eddies.

LES is always unsteady and three-dimensional, needs low-dissipation numerics ([[computational-fluid-dynamics/convection-diffusion]]) and long averaging times, and becomes very expensive near walls, where the important eddies scale with $\nu/u_\tau$. **Hybrid RANS–LES** methods, such as detached-eddy simulation (DES), use RANS in attached boundary layers and LES in separated regions, and are the practical choice for massively separated flows such as bluff-body wakes.

| approach | resolves | cost scaling (approx.) | typical use |
|---|---|---|---|
| RANS ($k$–$\varepsilon$, SST, S–A) | mean flow only | weak dependence on Re (wall-function meshes) | design, steady and slow unsteady flows |
| hybrid RANS–LES (DES) | large eddies away from walls | moderate | bluff bodies, massive separation |
| wall-modelled LES | large eddies, walls modelled | grows roughly like Re | jets, combustors, aeroacoustics |
| wall-resolved LES | large eddies incl. near-wall streaks | grows like $\mathrm{Re}^{13/7}$ (Choi and Moin estimate) | research, model development |
| DNS | all scales | $\sim\mathrm{Re}^3$ | research at moderate Re |

::: quiz
A steady RANS calculation with the standard $k$–$\varepsilon$ model and wall functions predicts that flow in a diffuser with a $10^\circ$ half-angle stays attached, while experiments show separation. Which change is most likely to improve the prediction?
- [ ] Refine the mesh at the walls to $y^+ \approx 1$ while keeping standard wall functions.
- [x] Switch to the SST $k$–$\omega$ model with a wall-resolved mesh ($y^+ \approx 1$), whose shear-stress limiter and near-wall formulation respond better to adverse pressure gradients.
- [ ] Use first-order upwinding to make the solution more robust.
- [ ] Increase the turbulence intensity at the inlet.
::: solution
Standard $k$–$\varepsilon$ overpredicts the shear stress under adverse pressure gradients and resists separation, and wall functions assume an equilibrium log layer that does not exist near separation. SST with wall resolution was designed for this case. Refining with standard wall functions violates their range of validity; upwinding adds numerical diffusion that delays separation further; more inlet turbulence also delays separation.
:::
:::

::: history
Joseph Boussinesq introduced the eddy-viscosity concept in 1877, and Osborne Reynolds the decomposition into mean and fluctuating motion in his 1895 paper in the *Philosophical Transactions of the Royal Society*. Ludwig Prandtl proposed the mixing length in 1925 (*Zeitschrift für angewandte Mathematik und Mechanik*), and Andrei Kolmogorov published his theory of the small scales in 1941. Joseph Smagorinsky's 1963 subgrid model was developed for atmospheric general-circulation calculations. The standard two-equation model was formulated by W. P. Jones and Brian Launder (1972, *International Journal of Heat and Mass Transfer*), with the constants of Launder and B. I. Sharma (1974) and the wall functions of Launder and D. B. Spalding (1974, *Computer Methods in Applied Mechanics and Engineering*). David Wilcox's $k$–$\omega$ model appeared in 1988 (*AIAA Journal*), Philippe Spalart and Steven Allmaras's one-equation model in 1992 (AIAA paper 92-0439), and Florian Menter's SST model in 1994 (*AIAA Journal*). The first DNS of turbulent channel flow, by John Kim, Parviz Moin and Robert Moser (1987, *Journal of Fluid Mechanics*), provided the near-wall data against which many of these models have since been tested.
:::

::: summary
- Turbulent scales span $\ell/\eta \sim \mathrm{Re}^{3/4}$; DNS needs $\sim\mathrm{Re}^{9/4}$ points and $\sim\mathrm{Re}^3$ work, so engineering CFD models turbulence.
- Reynolds averaging gives the RANS equations with the unknown Reynolds stress $-\rho\overline{u_i'u_j'}$: the closure problem.
- Boussinesq: Reynolds stress $= \mu_t \times$ mean strain $- \tfrac23\rho k\delta_{ij}$; the RANS equations then look laminar with $\mu + \mu_t$.
- Near walls: $U^+ = y^+$ for $y^+ \lesssim 5$, $U^+ = \kappa^{-1}\ln y^+ + B$ ($\kappa = 0.41$, $B \approx 5.0$) for $y^+ \gtrsim 30$; Spalding's formula covers both.
- $k$–$\varepsilon$: $\mu_t = \rho C_\mu k^2/\varepsilon$, robust for free shear flows; $k$–$\omega$ handles walls and adverse gradients better; SST blends them and limits $\nu_t$; S–A is a one-equation aerodynamic model.
- Size the near-wall mesh from $C_f$ correlations: $y_P = y^+\nu/u_\tau$; $y^+ \approx 1$ for wall-resolved models, $30$–$300$ for wall functions; always check $y^+$ afterwards.
- LES resolves large eddies and models small ones ($\nu_{sgs} = (C_s\Delta)^2\lvert\bar S\rvert$); hybrid RANS–LES serves massively separated flows.
:::

## Exercises

::: exercise The Kolmogorov length {level=1 check="2.41e-4"}
In a turbulent air flow ($\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$) the dissipation rate is $\varepsilon = 1.0\ \mathrm{W/kg}$. Compute the Kolmogorov length. (Enter $\eta$ in metres to three significant figures.)
::: solution
$\eta = (\nu^3/\varepsilon)^{1/4} = (3.375\times10^{-15})^{1/4} = 2.41\times10^{-4}\ \mathrm{m}$, about a quarter of a millimetre.
:::
:::

::: exercise A wall unit {level=1 check="3.333"}
The friction velocity on a wall is $u_\tau = 0.50\ \mathrm{m/s}$ in air ($\nu = 1.5\times10^{-5}\ \mathrm{m^2/s}$). What is $y^+$ at $y = 0.10\ \mathrm{mm}$, and in which layer does the point lie? (Enter $y^+$ to three decimal places.)
::: solution
$y^+ = yu_\tau/\nu = 10^{-4} \times 0.50/1.5\times10^{-5} = 3.33$: in the viscous sublayer, where $U^+ \approx y^+$, so $U \approx 3.33 \times 0.50 = 1.7\ \mathrm{m/s}$.
:::
:::

::: exercise Eddy viscosity from $k$ and $\varepsilon$ {level=1 check="0.009"}
At a point in a $k$–$\varepsilon$ solution, $k = 1.0\ \mathrm{m^2/s^2}$ and $\varepsilon = 10\ \mathrm{m^2/s^3}$. Compute the kinematic eddy viscosity. (Enter $\nu_t$ in $\mathrm{m^2/s}$.)
::: solution
$\nu_t = C_\mu k^2/\varepsilon = 0.09 \times 1.0/10 = 9.0\times10^{-3}\ \mathrm{m^2/s}$, $600$ times the molecular viscosity of air.
:::
:::

::: exercise Velocity in the log layer {level=1 check="16.23"}
Using $\kappa = 0.41$ and $B = 5.0$, find $U^+$ at $y^+ = 100$. (Enter $U^+$ to two decimal places.)
::: solution
$U^+ = \ln(100)/0.41 + 5.0 = 4.605/0.41 + 5.0 = 11.23 + 5.0 = 16.23$.
:::
:::

::: exercise Inlet turbulence kinetic energy {level=2 check="0.06"}
A wind-tunnel stream of $U = 20\ \mathrm{m/s}$ has a turbulence intensity of $1.0\,\%$. Assuming isotropic fluctuations, compute $k$. (Enter $k$ in $\mathrm{m^2/s^2}$.)
::: solution
$u' = 0.01 \times 20 = 0.20\ \mathrm{m/s}$ in each direction, so $k = \tfrac32 u'^2 = 1.5 \times 0.04 = 0.060\ \mathrm{m^2/s^2}$.
:::
:::

::: exercise DNS cost growth {level=2 check="4.757"}
By what factor does the number of DNS grid points grow when the Reynolds number is doubled, according to the $\mathrm{Re}^{9/4}$ estimate? By roughly what factor does the total cost grow? (Enter the grid-point factor to three decimal places.)
::: solution
$2^{9/4} = 4.76$ times as many points. The number of time steps grows like $\mathrm{Re}^{3/4}$, $2^{3/4} = 1.68$, so total cost grows like $2^3 = 8$.
:::
:::

::: exercise Mixing length in a channel {level=3}
In fully developed channel flow of half-height $h$, the total shear stress varies linearly, $\tau = \tau_w(1 - y/h)$. (a) Using $\ell_m = \kappa y$ and neglecting viscous stress, derive $\mathrm{d}U/\mathrm{d}y$ and show that it reduces to the log law near the wall. (b) Explain why the mixing length must be limited away from the wall (a common choice is $\ell_m = \min(\kappa y, 0.09\,h)$), and what happens to $\mathrm{d}U/\mathrm{d}y$ at the centreline.
::: solution
(a) $\rho\ell_m^2(\mathrm{d}U/\mathrm{d}y)^2 = \tau_w(1 - y/h)$ gives $\mathrm{d}U/\mathrm{d}y = \dfrac{u_\tau\sqrt{1 - y/h}}{\kappa y}$. For $y \ll h$, $\sqrt{1 - y/h} \approx 1$ and $\mathrm{d}U/\mathrm{d}y = u_\tau/(\kappa y)$, which integrates to the log law. (b) Away from the wall eddy size is set by the channel, not by $y$; without a limit $\ell_m = \kappa y$ would exceed the half-height. With the limit, $\mathrm{d}U/\mathrm{d}y = u_\tau\sqrt{1 - y/h}/\ell_{\max}$, which falls to zero at the centreline, $y = h$, where the shear stress vanishes — giving a flat-topped profile, as observed. The mixing-length model must also predict $\nu_t \to 0$ at the centreline, which is unphysical (turbulence is still present there), one of the reasons transport-equation models replaced it.
:::
:::

::: exercise Choosing a turbulence approach {level=3}
For each case, recommend a turbulence modelling approach and near-wall treatment, and say what you would check: (a) pressure drop in a long straight pipe for a piping design; (b) heat transfer from a turbine blade with film-cooling holes; (c) the unsteady wake and vortex shedding behind a tall building for wind loading; (d) the separation point on a high-lift wing near maximum lift.
::: solution
(a) Steady RANS ($k$–$\varepsilon$ or SST) with wall functions, or even a correlation; check the predicted friction factor against the Moody chart and $y^+$ in the wall-function range. (b) Wall-resolved RANS (SST or a $k$–$\omega$ variant, $y^+ \approx 1$) at minimum, since heat transfer depends on the sublayer; eddy-viscosity models struggle with jets in crossflow, so LES is used for detailed design; check grid sensitivity of the Nusselt number and compare with measured film effectiveness. (c) Unsteady: DES or LES, since RANS cannot represent broadband shedding and peak loads; check the Strouhal number and the spectra, time step and averaging duration. (d) SST or Spalart–Allmaras with $y^+ \approx 1$, possibly with transition modelling; RANS predictions of maximum lift are uncertain, so compare models, refine the mesh, and validate against wind-tunnel data for similar sections.
:::
:::
