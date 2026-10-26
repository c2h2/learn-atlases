Thin-airfoil theory ([[aerodynamics/thin-airfoil-theory]]) gives lift slope, zero-lift angle and pitching moment from the camber line alone, but it says nothing reliable about the *pressure distribution* of a real section — the suction peak at the nose, the pressure recovery over the rear, the effect of thickness — and those are what decide where the boundary layer separates and how much drag the section has. Exact analytic solutions exist only for special shapes (the cylinder, Joukowski's airfoils). A **panel method** solves the potential-flow problem numerically for *any* shape: the surface is cut into straight panels, each panel carries a sheet of sources or vortices of unknown strength, and the condition of no flow through the surface at one point per panel produces a set of linear equations. Solved by computer, they give the surface velocity and pressure everywhere. Panel methods were the first computational aerodynamics to be used routinely in industry, and in coupled form with a boundary-layer calculation they remain the everyday tool of airfoil design.

This chapter builds the method from its pieces: source and vortex sheets, the velocity induced by one panel, the assembly of the linear system, the Kutta condition in discrete form, and the checks that tell you whether a panel solution can be trusted. The prerequisites are the elementary flows of [[aerodynamics/potential-flow]] and the Kutta condition of [[aerodynamics/thin-airfoil-theory]]; the linear algebra is Gaussian elimination.

## Source and vortex sheets

A point source of strength $\Lambda$ produces a radial velocity $\Lambda/(2\pi r)$. Spread sources continuously along a curve with strength $\lambda(s)$ per unit length ($\mathrm{m/s}$) and you have a **source sheet**; spread vortices with strength $\gamma(s)$ and you have a **vortex sheet**. The element $ds$ of a source sheet is a point source of strength $\lambda\,ds$, so at a point $P$ at distance $r$ from it the sheet induces the velocity potential
$$
\phi(P) = \int \frac{\lambda(s)}{2\pi}\ln r\,ds ,
$$
and similarly a vortex sheet induces $\phi(P) = -\int \frac{\gamma(s)}{2\pi}\theta\,ds$, with $\theta$ the polar angle of $P$ seen from the element. Each element satisfies Laplace's equation, so the sheet does too, and superposed on a uniform stream the result is again a potential flow.

::: proposition Velocity jumps across sheets {#prop-jumps}
Across a source sheet of local strength $\lambda$ the **normal** velocity jumps by $\lambda$: just on either side of the sheet the normal components induced by the sheet are $+\lambda/2$ and $-\lambda/2$ (pointing away from the sheet), while the tangential velocity is continuous. Across a vortex sheet of strength $\gamma$ the **tangential** velocity jumps by $\gamma$, the normal velocity being continuous.
:::

::: proof
Consider a short straight stretch of the sheet of length $2a$ with locally constant strength, and a point at height $y$ above its centre. The normal velocity induced by the stretch is
$$
v = \int_{-a}^{a}\frac{\lambda}{2\pi}\,\frac{y\,d\xi}{\xi^2 + y^2} = \frac{\lambda}{\pi}\arctan\frac{a}{y} \;\longrightarrow\; \frac{\lambda}{2}\quad (y \to 0^+),
$$
and by symmetry $-\lambda/2$ as $y \to 0^-$. The rest of the sheet, at finite distance from the point, induces a velocity that is continuous across the stretch, so the jump is entirely due to the local contribution: $\Delta v_n = \lambda$. The tangential contribution of the local stretch is $\int \frac{\lambda}{2\pi}\frac{-\xi\,d\xi}{\xi^2 + y^2} = 0$ by symmetry, so the tangential velocity is continuous. For a vortex sheet, a vortex element's velocity is that of a source element rotated through $90^\circ$, so the roles of the normal and tangential components are exchanged: $\Delta v_t = \gamma$. (This is also the result used in [[aerodynamics/thin-airfoil-theory]], derived there from the circulation round a small rectangle straddling the sheet.) Assumptions: the sheet is smooth and its strength continuous at the point considered.
:::

The physical meaning: a source sheet *pushes the flow away from itself*, so a closed source sheet in a stream can make the stream flow around a body; a vortex sheet produces a *slip* in tangential velocity, which is exactly what is needed to give the upper surface of an airfoil a higher speed than the lower — i.e. circulation and lift. A source distribution alone has zero net circulation and can never produce lift.

## One panel

Discretise the body surface into $N$ straight **panels**. On each, take the strength constant (the simplest choice; linear and higher-order variations are used in better codes). We need the velocity that one panel of unit strength induces anywhere.

::: proposition Velocity induced by a constant-strength source panel {#prop-panel-velocity}
A panel lying on the $x$-axis from $x = -a$ to $x = a$ (in its own local coordinates) with constant source strength $\lambda$ induces at the point $(x, y)$
$$
u = \frac{\lambda}{4\pi}\ln\frac{(x + a)^2 + y^2}{(x - a)^2 + y^2}, \qquad
v = \frac{\lambda}{2\pi}\left(\theta_2 - \theta_1\right),
$$ {#eq-panel-uv}
where $\theta_1$ and $\theta_2$ are the polar angles of the point seen from the start $(-a, 0)$ and the end $(a, 0)$ of the panel, so that $\theta_2 - \theta_1$ is the angle the panel subtends at the point. On the panel itself, $v = \pm\lambda/2$ and $u$ is finite except at the end points. The same panel carrying a vortex sheet of strength $\gamma$ (clockwise positive) induces $u = \frac{\gamma}{2\pi}(\theta_2 - \theta_1)$, $v = -\frac{\gamma}{4\pi}\ln\frac{(x + a)^2 + y^2}{(x - a)^2 + y^2}$.
:::

::: proof
The element $d\xi$ at $(\xi, 0)$ induces a radial velocity $\lambda\,d\xi/(2\pi r)$ with $r^2 = (x - \xi)^2 + y^2$, whose components are
$$
du = \frac{\lambda}{2\pi}\frac{(x - \xi)\,d\xi}{(x - \xi)^2 + y^2}, \qquad dv = \frac{\lambda}{2\pi}\frac{y\,d\xi}{(x - \xi)^2 + y^2}.
$$
Integrating $du$ from $\xi = -a$ to $a$: with $w = (x - \xi)^2 + y^2$, $dw = -2(x - \xi)\,d\xi$, so $u = -\frac{\lambda}{4\pi}\left[\ln w\right]_{-a}^{a} = \frac{\lambda}{4\pi}\ln\frac{(x + a)^2 + y^2}{(x - a)^2 + y^2}$. Integrating $dv$ for $y > 0$: $v = \frac{\lambda}{2\pi}\left[-\arctan\frac{x - \xi}{y}\right]_{-a}^{a} = \frac{\lambda}{2\pi}\left[\arctan\frac{x + a}{y} - \arctan\frac{x - a}{y}\right]$, and the bracket equals $\theta_2 - \theta_1$ because $\arctan(X/y) = \pi/2 - \theta$ for the angle $\theta$ of the vector $(X, y)$; the same form holds for $y < 0$ with angles measured consistently, giving the sign change. On the panel ($y \to 0^+$, $|x| < a$) the subtended angle tends to $\pi$, so $v \to \lambda/2$, as in [[#prop-jumps]]. A clockwise vortex element induces $(V_r, V_\theta) = (0, -\gamma\,d\xi/2\pi r)$, which is the source element's velocity rotated clockwise by $90^\circ$: $(du, dv)_\text{vortex} = (dv, -du)_\text{source}$ with $\lambda$ replaced by $\gamma$, giving the stated vortex-panel formulas.
:::

::: example Near field and far field of one panel {#ex-one-panel}
A source panel of unit strength, $\lambda = 1\,\mathrm{m/s}$, lies from $x = -1\,\mathrm{m}$ to $x = 1\,\mathrm{m}$. Find the velocity it induces at $(2, 0.5)\,\mathrm{m}$ and compare it with the velocity of a point source of the same total strength at the origin.
::: solution
From the start of the panel the point is seen at $\theta_1 = \arctan(0.5/3) = 9.46^\circ$, from its end at $\theta_2 = \arctan(0.5/1) = 26.57^\circ$; the panel subtends $17.10^\circ = 0.2985\,\mathrm{rad}$. By [[#eq-panel-uv]],
$$
u = \frac{1}{4\pi}\ln\frac{3^2 + 0.5^2}{1^2 + 0.5^2} = \frac{1}{4\pi}\ln 7.4 = 0.159\,\mathrm{m/s}, \qquad v = \frac{0.2985}{2\pi} = 0.0475\,\mathrm{m/s}.
$$
A point source of strength $2a\lambda = 2\,\mathrm{m^2/s}$ at the origin gives, at distance $r = \sqrt{4.25} = 2.062\,\mathrm{m}$, a speed $2/(2\pi \times 2.062) = 0.154\,\mathrm{m/s}$ along $\mathbf{r}$: $u = 0.150$, $v = 0.037\,\mathrm{m/s}$. *Sanity check:* at a distance of only one panel length from the panel end the point-source approximation is already within about 6 per cent in $u$, but 21 per cent out in $v$; at larger distances the two agree ever more closely, which is why fast panel codes replace distant panels by point singularities (multipole expansions) and evaluate the exact formulas only for near neighbours.
:::
:::

::: widget plot
f: (1/(2*pi))*(atan((x + 1)/h) - atan((x - 1)/h)); (1/(4*pi))*ln(((x + 1)^2 + h^2)/((x - 1)^2 + h^2))
x: -3, 3
y: -0.6, 0.6
sliders: h=0.3:0.01:2:0.01
labels: v\ \text{(normal)}; u\ \text{(tangential)}
hlines: 0.5
caption: Velocity induced along the line $y = h$ by a unit-strength source panel from $x = -1$ to $x = 1$, from [[#eq-panel-uv]]. Drag $h$ towards zero: the normal component $v$ approaches a top-hat of height $\tfrac12$ over the panel (the self-induced value $\lambda/2$ used on the diagonal of the influence matrix), while the tangential component $u$ develops logarithmic spikes at the panel ends. Increase $h$ and the panel looks more and more like a point source of strength $2a\lambda = 2$: $v$ becomes a smooth bell and $u$ a smooth odd function.
:::

## The source-panel method

::: algorithm Source-panel method for non-lifting flow {#alg-source-panel}
1. **Geometry.** Place $N + 1$ points on the body surface, ordered **clockwise**, and join them into $N$ straight panels. For panel $j$ record its length $S_j$, its unit tangent $\mathbf{t}_j$ (in the direction of travel), its outward unit normal $\mathbf{n}_j$, and its **control point** $\mathbf{x}_j$ at the panel midpoint. Let $\beta_j$ be the angle between $\mathbf{V}_\infty$ and $\mathbf{n}_j$.
2. **Influence coefficients.** For each control point $i$ and each panel $j \ne i$, compute with [[#eq-panel-uv]] (after rotating into panel $j$'s local coordinates) the velocity induced at $\mathbf{x}_i$ by a unit-strength source on panel $j$, and take its normal component $I_{ij}$ and its tangential component $J_{ij}$ along $\mathbf{n}_i$ and $\mathbf{t}_i$. The self-influence is $I_{ii} = \tfrac12$, $J_{ii} = 0$.
3. **Flow-tangency equations.** Require zero normal velocity at every control point:
$$
\sum_{j=1}^{N} I_{ij}\,\lambda_j + V_\infty\cos\beta_i = 0, \qquad i = 1, \dots, N .
$$ {#eq-tangency}
4. **Solve** the $N \times N$ linear system for the $\lambda_j$ (Gaussian elimination; the matrix is full and diagonally dominant for reasonable panelling).
5. **Surface velocity and pressure.** At each control point $V_i = V_\infty\,\mathbf{e}_\infty\cdot\mathbf{t}_i + \sum_{j} J_{ij}\lambda_j$ and $C_{p,i} = 1 - (V_i/V_\infty)^2$.
6. **Checks.** For a closed body, $\sum_j \lambda_j S_j = 0$ (no net source); the pressure drag $\sum_j C_{p,j}\,S_j\,\mathbf{n}_j\cdot\mathbf{e}_\infty$ should be near zero; and results should converge as $N$ is doubled.
:::

The equations are a *discrete* version of the boundary condition: the surface is a streamline only at the control points, and between them a small leakage is tolerated. Convergence with panel number is therefore the first thing to check, and panels should be concentrated where the curvature and the velocity gradients are large — at the leading edge and trailing edge of an airfoil, usually by **cosine spacing**, $x_k = \tfrac c2\left(1 - \cos\tfrac{k\pi}{n}\right)$.

::: example Eight panels on a circular cylinder {#ex-cylinder-8}
Apply the source-panel method to a circular cylinder of radius $R$ in a stream $V_\infty$, using eight equal panels arranged so that one panel faces the stream squarely (control points at $0^\circ, 45^\circ, \dots, 315^\circ$ round the cylinder). Report the source strengths and the surface pressure coefficients, and compare with the exact $C_p = 1 - 4\sin^2\theta$.
::: solution
The panel vertices sit at $\theta = 22.5^\circ \pm 45^\circ k$ on the circle, so each panel has length $S = 2R\sin22.5^\circ = 0.765R$ and its midpoint lies at radius $R\cos22.5^\circ = 0.924R$. Building the $8 \times 8$ influence matrix and solving [[#eq-tangency]] (a short program does this; by symmetry only three strengths are distinct) gives, with $\theta$ measured from the front of the cylinder,

| control point | front ($0^\circ$) | $\pm45^\circ$ | $\pm90^\circ$ | $\pm135^\circ$ | rear ($180^\circ$) |
|---|---|---|---|---|---|
| $\lambda_j/(2\pi V_\infty)$ | $0.3765$ | $0.2662$ | $0$ | $-0.2662$ | $-0.3765$ |
| $V_j/V_\infty$ | $0$ | $1.414$ | $2.000$ | $1.414$ | $0$ |
| $C_p$ (panels) | $1.000$ | $-1.000$ | $-3.000$ | $-1.000$ | $1.000$ |
| $C_p$ exact | $1$ | $-1$ | $-3$ | $-1$ | $1$ |

Sources on the front push the oncoming flow aside, sinks at the rear draw it back in, and the strengths on the top and bottom panels, which are parallel to the stream, are zero. *Checks:* $\sum\lambda_jS_j = 2\pi V_\infty S\,(0.3765 + 2 \times 0.2662 + 0 - 2 \times 0.2662 - 0.3765) = 0$ (the body is closed), and the pressures at the control points agree with the exact solution to the four figures shown. Such agreement on a circle with only eight panels is partly luck of symmetry; on an airfoil, with its rapidly varying curvature at the nose, many more panels are needed.
:::
:::

::: widget plot
f: 1 - 4*sin(x*pi/180)^2
x: 0, 360
y: -3.3, 1.3
points: 0,1; 45,-1; 90,-3; 135,-1; 180,1; 225,-1; 270,-3; 315,-1
labels: C_p = 1 - 4\sin^2\theta\ \text{(exact)}
caption: Exact surface pressure on a circular cylinder against $\theta$ in degrees (measured from the front stagnation point), with the eight control-point values of example [[#ex-cylinder-8]] marked. The panel solution is exact at the control points; *between* them, on the flat panels, it is not defined in the same way, which is why panel results are reported at control points only.
:::

## Lift: vortex panels and the Kutta condition

A source distribution cannot give circulation, so a lifting body needs vortices. There are two classical arrangements.

- **Vortex panels** (each panel with its own vortex strength $\gamma_j$, and no sources). The tangency condition gives $N$ equations for $N$ unknowns — but the solution for a closed body with a sharp trailing edge is then *not* unique in the limit of fine panelling, just as the continuous problem is not (any circulation is allowed). The Kutta condition must be added: in discrete form, $\gamma$ at the trailing edge is zero, implemented with linearly varying strengths as $\gamma_1 + \gamma_{N+1} = 0$ at the two trailing-edge nodes, or with constant strengths as $\gamma_1 = -\gamma_N$ for the two panels adjacent to the trailing edge. With one more equation than unknowns, one tangency equation (usually at a control point far from the trailing edge) is dropped.
- **Sources plus one vortex strength** (the Hess–Smith lifting method). Each panel carries its own source strength $\lambda_j$ *and* a vortex strength $\gamma$ that is the same on all panels. That gives $N + 1$ unknowns: $N$ tangency equations plus one Kutta equation that the tangential velocities on the two panels adjacent to the trailing edge are equal in magnitude, $V_1 = -V_N$ (with the panel tangents pointing in opposite directions there). The circulation is $\Gamma = \gamma\sum_j S_j$, and the lift follows from the pressures or from Kutta–Joukowski.

::: algorithm Hess–Smith lifting panel method {#alg-hess-smith}
1. Panel the airfoil clockwise from the trailing edge along the lower surface to the leading edge and back along the upper surface to the trailing edge, with cosine spacing.
2. For each control point $i$ and panel $j$, compute normal and tangential influence coefficients of a unit source ($I_{ij}$, $J_{ij}$) and of a unit vortex ($I^\gamma_{ij}$, $J^\gamma_{ij}$) on panel $j$; sum the vortex coefficients over $j$, since $\gamma$ is common: $B_i = \sum_j I^\gamma_{ij}$, $C_i = \sum_j J^\gamma_{ij}$ (self-terms: source normal $\tfrac12$, vortex tangential $\tfrac12$).
3. Tangency at each control point: $\sum_j I_{ij}\lambda_j + B_i\gamma = -V_\infty\cos\beta_i$.
4. Kutta condition: $\left(\sum_j J_{1j}\lambda_j + C_1\gamma + V_{\infty,t1}\right) + \left(\sum_j J_{Nj}\lambda_j + C_N\gamma + V_{\infty,tN}\right) = 0$.
5. Solve the $(N+1) \times (N+1)$ system; compute $V_i$, $C_{p,i}$, and integrate $c_l$, $c_m$ and the pressure drag $c_{d,p}$ (which should tend to zero).
:::

::: example The lumped-vortex method on two panels {#ex-lumped}
The simplest lifting panel method treats a thin airfoil as its camber line, divided into $N$ panels. Each panel carries a single point vortex $\Gamma_j$ at its quarter-chord point, and the tangency condition is imposed at its three-quarter-chord point. (The quarter/three-quarter placement is chosen because, for one panel, it reproduces thin-airfoil theory exactly: a vortex at $c/4$ induces at $3c/4$ a downwash $\Gamma/(2\pi\cdot c/2) = \Gamma/(\pi c)$, and equating this to $V_\infty\alpha$ gives $\Gamma = \pi\alpha cV_\infty$, i.e. $c_l = 2\pi\alpha$.) Solve a flat plate of unit chord with two panels at angle of attack $\alpha$ by hand.
::: solution
The vortices are at $x = 0.125$ and $0.625$, the control points at $0.375$ and $0.875$. A clockwise vortex at $x_v$ induces at $x$ a downward velocity $\Gamma/(2\pi(x - x_v))$ (upward if $x < x_v$), and tangency requires the total to equal $V_\infty\alpha$ at each control point:
$$
\begin{aligned}
\frac{\Gamma_1}{2\pi(0.25)} + \frac{\Gamma_2}{2\pi(-0.25)} &= V_\infty\alpha, \\
\frac{\Gamma_1}{2\pi(0.75)} + \frac{\Gamma_2}{2\pi(0.25)} &= V_\infty\alpha,
\end{aligned}
\qquad\text{i.e.}\qquad
\begin{aligned}
0.6366\,\Gamma_1 - 0.6366\,\Gamma_2 &= V_\infty\alpha, \\
0.2122\,\Gamma_1 + 0.6366\,\Gamma_2 &= V_\infty\alpha .
\end{aligned}
$$
Adding: $0.8488\,\Gamma_1 = 2V_\infty\alpha$, so $\Gamma_1 = 2.356\,V_\infty\alpha = \tfrac{3\pi}{4}V_\infty\alpha$, and $\Gamma_2 = \Gamma_1 - V_\infty\alpha/0.6366 = \tfrac{\pi}{4}V_\infty\alpha$. The total is $\Gamma = \pi V_\infty\alpha$, so $c_l = 2\Gamma/V_\infty = 2\pi\alpha$ — exact. The moment about the leading edge is $c_{m,LE} = -2(0.125\,\Gamma_1 + 0.625\,\Gamma_2)/V_\infty = -2\alpha(0.2945 + 0.4909) = -\tfrac{\pi}{2}\alpha = -c_l/4$, also exact. *Sanity check:* three-quarters of the lift is on the front panel, as the singular leading-edge loading of thin-airfoil theory demands. The discrete method does not resolve *where* within a panel the load sits, but it gets the integrated results right. For the NACA 2412 camber line, the same method gives $\alpha_{L=0} = -2.18^\circ$ with 2 panels, $-2.10^\circ$ with 4 and $-2.078^\circ$ with 8, converging to the thin-airfoil value $-2.077^\circ$; the moment $c_{m,c/4}$ converges more slowly ($-0.035$, $-0.049$, $-0.052$, then $-0.053$ with 32 panels).
:::
:::

::: example NACA 0012 and 2412 with the Hess–Smith method {#ex-naca-panels}
A Hess–Smith code (algorithm [[#alg-hess-smith]], cosine spacing, NACA thickness distribution with the closed-trailing-edge coefficient $-0.1036$) is run for the NACA 0012 at $\alpha = 5^\circ$ with $N = 20$, $40$, $80$ and $160$ panels, and for the NACA 2412 at $0^\circ$ and $4^\circ$. Interpret the results.

| airfoil, $\alpha$ | $N$ | $c_l$ (from $C_p$) | $c_{d,p}$ (from $C_p$) |
|---|---|---|---|
| 0012, $5^\circ$ | 20 | $0.604$ | $0.0054$ |
| 0012, $5^\circ$ | 40 | $0.601$ | $0.0017$ |
| 0012, $5^\circ$ | 80 | $0.602$ | $0.0006$ |
| 0012, $5^\circ$ | 160 | $0.602$ | $0.0002$ |
| 2412, $0^\circ$ | 160 | $0.255$ | $0.0001$ |
| 2412, $4^\circ$ | 160 | $0.737$ | $-0.0002$ |
::: solution
*Convergence.* The lift is converged to three figures by $40$ panels; the pressure drag, which should be exactly zero in potential flow, falls roughly in proportion to $1/N^{1.5}$ and is a direct measure of the discretisation error. A drag of $0.005$ at $N = 20$ would be comparable to the whole viscous drag of the section — never read drag from a pure panel method.

*Thickness.* Thin-airfoil theory gives $c_l = 2\pi(0.0873) = 0.548$ at $5^\circ$ for any symmetric section; the panel method gives $0.602$, about 10 per cent more. In inviscid flow thickness *raises* the lift slope: for Joukowski sections the exact slope is about $2\pi(1 + 0.77\,t/c)$, a factor $1.09$ for 12 per cent thickness, and the panel result here ($0.602/0.548 = 1.10$) is consistent with that.

*Camber.* For the 2412, thin-airfoil theory gives $c_l = 0.228$ at $0^\circ$ and $0.666$ at $4^\circ$; the panel method $0.255$ and $0.737$. Measured values at $\mathrm{Re} \approx 6\times10^6$ are close to the thin-airfoil figures, because the boundary layer, thickening towards the trailing edge on the upper surface, reduces the effective camber and the circulation by about the same amount as thickness increases them. That cancellation is fortunate but not reliable; a viscous–inviscid method (below) predicts it properly. *Sanity check:* the lift slope of the 0012 from the table, $0.602/5 = 0.120$ per degree, is above $2\pi$ per radian ($0.110$ per degree), as expected for a thick section in inviscid flow.
:::
:::

::: quiz
A source-panel solution for a closed body gives $\sum_j\lambda_jS_j = 0.08V_\infty c$, clearly not zero. What does that indicate?
- [ ] The body is producing lift
- [x] The discretisation or the influence coefficients are in error (too few panels, a sign mistake, or a wrongly oriented normal)
- [ ] The flow is compressible
- [ ] Nothing: the sum is only zero for symmetric bodies
::: solution
For any closed body in a uniform stream, the total source strength must vanish, because no net fluid can be created inside a closed surface. A large non-zero sum means something is wrong — commonly a panel ordered anticlockwise among clockwise ones (an inward normal), an error in the self-influence term, or panels too coarse where the surface curves sharply. Lift is produced by vortices, not sources.
:::
:::

::: warning Getting a panel code wrong without noticing
The most common errors are geometric. **Orientation:** with clockwise ordering the outward normal is the *left* normal of the direction of travel; one reversed panel turns a source into a sink at that point and the solution is quietly wrong. **Self-influence:** the diagonal term is $+\tfrac12$ (normal velocity just *outside* the panel); using $-\tfrac12$ solves the problem for the flow inside the body. **Trailing edge:** a NACA section with its standard open trailing edge leaves a gap; either close it (as in example [[#ex-naca-panels]]) or add a panel across it. **Panel density:** too few panels near a sharp leading edge under-resolves the suction peak, which then appears too low and too far aft — and the predicted separation and maximum lift are wrong with it. Always check $\sum\lambda_jS_j \approx 0$, $c_{d,p} \approx 0$ and convergence with $N$, and compare with a known exact case (the cylinder, a Joukowski airfoil) before trusting a new code.
:::

## From inviscid to viscous: the viscous–inviscid interaction

A panel method on its own knows nothing of viscosity: no friction drag, no separation, no stall, a lift slope a little too high. The practical design codes combine it with a **boundary-layer** calculation. The inviscid surface velocity drives an integral boundary-layer solution (laminar, transition, turbulent — the subject of [[aerodynamics/viscous-aerodynamics]]); the boundary layer's **displacement thickness** $\delta^*$ is fed back to the inviscid solution, either by thickening the body or by adding a "transpiration" source strength $\lambda = d(V\delta^*)/ds$ on each panel; the two are iterated (or, better, solved simultaneously) until they agree. The wake behind the trailing edge is modelled the same way. The result gives realistic pressure distributions, the drag polar including laminar-bubble effects, and the onset of trailing-edge stall, for attached or mildly separated flow.

::: application XFOIL and three-dimensional panel codes
The best-known two-dimensional code of this kind is Mark Drela's **XFOIL** (1989), which uses a linear-vorticity panel method coupled to an integral boundary-layer formulation with an $e^N$ transition criterion, all solved simultaneously by a Newton method. It is widely used for low-Reynolds-number airfoils (sailplanes, wind turbines, drones), and its predictions of lift and moment in the attached-flow range and of drag at moderate $\mathrm{Re}$ are usually within a few per cent of good wind-tunnel data. In three dimensions, panel codes (source–doublet methods on surface panels covering a whole aircraft, with a wake surface trailing from the wing) were the workhorse of aircraft configuration aerodynamics from the 1970s and are still used for low-speed loads and preliminary design because they need only a surface mesh. They are limited by the same assumptions as all potential flow: subcritical, attached flow.
:::

::: history
Panel methods were born at the Douglas Aircraft Company, where John **Hess** and A. M. O. **Smith** developed the surface-source method for non-lifting potential flow about arbitrary three-dimensional bodies (Douglas Report ES 40622, 1962; *Journal of Ship Research*, 1964) and surveyed the whole approach, including the lifting extension of algorithm [[#alg-hess-smith]], in *Calculation of potential flow about arbitrary bodies* (*Progress in Aeronautical Sciences*, volume 8, 1967). The method was practical only because digital computers had become able to solve dense linear systems of a few hundred unknowns. Two-dimensional panel codes coupled with boundary-layer calculations became standard airfoil-design tools in the following decades, with Drela's XFOIL (1989) as the best-known example.
:::

## Summary

::: summary
- A source sheet produces a jump $\lambda$ in normal velocity; a vortex sheet a jump $\gamma$ in tangential velocity. Sources shape the flow round a body; vortices give circulation and lift.
- A constant-strength panel induces $u = \frac{\lambda}{4\pi}\ln(r_1^2/r_2^2)$ and $v = \frac{\lambda}{2\pi}(\theta_2 - \theta_1)$ in its own coordinates; the self-induced normal velocity is $\lambda/2$.
- The source-panel method imposes zero normal velocity at each control point, giving an $N \times N$ linear system; then $V_i$ and $C_{p,i} = 1 - (V_i/V_\infty)^2$.
- Lifting methods add vortices (vortex panels, or one common vortex strength in the Hess–Smith method) and one equation for the Kutta condition.
- Check $\sum\lambda_jS_j = 0$, $c_{d,p} \to 0$ and convergence with $N$; cluster panels at the leading and trailing edges.
- Inviscid panel methods over-predict the lift slope of real sections; coupling with a boundary-layer calculation (as in XFOIL) gives drag and realistic lift up to mild separation.
:::

## Exercises

::: exercise Normal velocity at a source sheet {level=1 check="1.5"}
A source sheet has local strength $\lambda = 3\,\mathrm{m/s}$. What normal velocity does it induce just on either side of itself (magnitude)? (Enter it in m/s.)
::: solution
$\lambda/2 = 1.5\,\mathrm{m/s}$, directed away from the sheet on both sides, by [[#prop-jumps]].
:::
:::

::: exercise Closing the source sum {level=1 check="-0.3"}
A closed body is panelled with four panels of equal length. Three of the source strengths are $2.0$, $-0.5$ and $-1.2\,\mathrm{m/s}$. What must the fourth be for the solution to be consistent? (Enter it in m/s.)
::: solution
$\sum\lambda_jS_j = 0$ with equal $S_j$ requires $\lambda_4 = -(2.0 - 0.5 - 1.2) = -0.3\,\mathrm{m/s}$.
:::
:::

::: exercise One lumped vortex {level=1 check="0.329"}
A thin flat plate at $3^\circ$ is modelled by one lumped vortex at its quarter-chord with the tangency condition at its three-quarter-chord. What lift coefficient results? (Enter $c_l$.)
::: solution
As shown in example [[#ex-lumped]], $\Gamma = \pi\alpha cV_\infty$ and $c_l = 2\pi\alpha = 2\pi(0.05236) = 0.329$.
:::
:::

::: exercise Velocity from one panel {level=2 check="0.5"}
A source panel of constant strength $\lambda = 2\,\mathrm{m/s}$ lies on the $x$-axis from $x = -1\,\mathrm{m}$ to $x = 1\,\mathrm{m}$. Find the velocity components it induces at $(0, 1)\,\mathrm{m}$. (Enter $v$ in m/s.)
::: solution
By symmetry $u = \frac{\lambda}{4\pi}\ln(2/2) = 0$. The panel subtends $\theta_2 - \theta_1 = 135^\circ - 45^\circ = 90^\circ = \pi/2$, so $v = \frac{2}{2\pi}\cdot\frac\pi2 = 0.5\,\mathrm{m/s}$, upward.
:::
:::

::: exercise Pressure at a control point {level=2 check="-2.42"}
A panel solution gives a tangential velocity of $1.85V_\infty$ at a control point near the nose of an airfoil. Find $C_p$ there, and say whether the flow is compressible enough to matter if $M_\infty = 0.25$. (Enter $C_p$.)
::: solution
$C_p = 1 - 1.85^2 = -2.42$. The local Mach number is roughly $1.85 \times 0.25 = 0.46$ (a little more, since the local temperature is lower), well above $0.3$; the incompressible panel result should be corrected for compressibility (see [[aerodynamics/compressible-airfoils]]).
:::
:::

::: exercise Ratio of lumped-vortex strengths {level=2 check="3"}
In the two-panel lumped-vortex solution of a flat plate (example [[#ex-lumped]]), what is the ratio $\Gamma_1/\Gamma_2$ of the front to the rear vortex? Would the ratio change with the angle of attack? (Enter the ratio.)
::: solution
$\Gamma_1 = \tfrac{3\pi}{4}V_\infty\alpha$ and $\Gamma_2 = \tfrac\pi4V_\infty\alpha$, so the ratio is $3$, independent of $\alpha$: the problem is linear, so every strength is proportional to $\alpha$. The ratio reflects the front-loaded flat-plate distribution $\gamma \propto \sqrt{(c - x)/x}$; integrating that over each half of the chord gives $\left(\tfrac\pi4 + \tfrac12\right)/\left(\tfrac\pi4 - \tfrac12\right) = 4.5$ for the exact distribution, so the discrete method redistributes the load between panels while getting the total right.
:::
:::

::: exercise The vortex panel from the source panel {level=3}
Starting from the element velocities in the proof of [[#prop-panel-velocity]], show that a constant-strength *vortex* panel of strength $\gamma$ (clockwise positive) induces $u = \frac{\gamma}{2\pi}(\theta_2 - \theta_1)$ and $v = -\frac{\gamma}{4\pi}\ln\frac{(x + a)^2 + y^2}{(x - a)^2 + y^2}$, and deduce the self-induced tangential velocity just above the panel. Explain why the tangency condition at the control points cannot by itself fix the circulation of a lifting body panelled with vortex panels.
::: solution
A clockwise point vortex of strength $\gamma\,d\xi$ at $(\xi, 0)$ induces $V_\theta = -\gamma\,d\xi/(2\pi r)$ at distance $r$. With $\mathbf{r} = (x - \xi, y)$, the clockwise tangential direction is $(y, -(x - \xi))/r$, so $du = \frac{\gamma}{2\pi}\frac{y\,d\xi}{r^2}$ and $dv = -\frac{\gamma}{2\pi}\frac{(x - \xi)\,d\xi}{r^2}$ — the source element's $(dv, -du)$. Integrating exactly as in the proof gives the stated formulas. Just above the panel the subtended angle is $\pi$, so $u = \gamma/2$; just below, $-\gamma/2$: a jump $\gamma$ in tangential velocity, as [[#prop-jumps]] says. For the circulation: the continuous problem for a body with a hole admits a one-parameter family of solutions (one for each circulation), so the discrete tangency equations become nearly singular as $N$ grows, or give a circulation that depends on arbitrary details of the panelling. The physics that fixes it — the Kutta condition — must be added as an equation.
:::
:::

::: exercise Plan a panel study {level=3}
You are asked to compute the pressure distribution of a new 15 per cent thick sailplane airfoil at $\mathrm{Re} = 1.5\times10^6$ for $-2^\circ \le \alpha \le 10^\circ$, in order to choose between two candidate nose shapes. Plan the study: panel numbers and distribution, the checks you would run, what you would and would not believe in the results, and how you would bring in viscous effects. Give at least one quantitative check you would apply.
::: solution
A good answer covers: (1) **Panelling** — 160–250 panels with cosine spacing, refined further at the leading edge where the two nose shapes differ; run each case at $N$ and $2N$ and accept only results that change by less than, say, $0.005$ in $c_l$ and $0.05$ in the minimum $C_p$. (2) **Validation** — run a NACA four-digit section of similar thickness and compare with published data or with an independent code; run a Joukowski or circle case for which exact results exist. (3) **Checks** on every run: $\sum\lambda_jS_j \approx 0$, $c_{d,p}$ from pressure integration small compared with the expected viscous drag (about $0.006$), smooth $C_p$ near the trailing edge with equal upper and lower values there (Kutta condition satisfied). (4) **What to believe** — inviscid suction-peak heights and positions, pressure gradients (the main discriminator between nose shapes), and trends with $\alpha$; not the drag, not maximum lift, and not the lift slope to better than about 10 per cent. (5) **Viscous effects** — use a coupled viscous–inviscid code (XFOIL-type) for transition location, laminar separation bubbles (likely at this Reynolds number), drag polars and trailing-edge separation near the top of the range, and confirm the final choice with wind-tunnel data if the decision matters.
:::
:::
