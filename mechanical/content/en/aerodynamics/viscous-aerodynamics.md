Everything so far has been inviscid, and inviscid theory has done well: it predicts the lift slope, zero-lift angle and pitching moment of a wing section to within a few per cent. But it predicts zero drag in two dimensions, and it cannot predict stall. Both come from a layer of air, typically a millimetre to a few centimetres thick, in which the velocity falls from its potential-flow value to zero at the surface — the **boundary layer**. This chapter studies the boundary layer on airfoils: how thick it is and how much friction it exerts, laminar and turbulent; how it responds to pressure gradients, and why it separates; how transition from laminar to turbulent flow happens; how skin friction and pressure ("form") drag add up to the profile drag of a section; how separation sets the maximum lift; and how flaps and slats raise that maximum.

The prerequisites are [[fluid-mechanics/boundary-layers-drag]], where the flat-plate boundary layer and its basic correlations are introduced, and the inviscid airfoil theory of [[aerodynamics/thin-airfoil-theory]] and [[aerodynamics/panel-methods]]. Sea-level air in the examples has $\rho_\infty = 1.225\,\mathrm{kg/m^3}$, $\mu_\infty = 1.789\times10^{-5}\,\mathrm{Pa\,s}$ and kinematic viscosity $\nu = \mu/\rho = 1.460\times10^{-5}\,\mathrm{m^2/s}$.

## The boundary layer on an airfoil

Ludwig Prandtl's insight of 1904 was that at high Reynolds number the effects of viscosity are confined to a thin layer next to the surface and to the wake. Outside it the flow is inviscid; inside it, the velocity gradient $\partial u/\partial y$ is so large that viscous stresses are as important as inertia, however small $\mu$ is. Because the layer is thin, the pressure does not vary across it: the pressure at the wall equals the pressure that the inviscid flow imposes at its edge. So the inviscid solution fixes the pressure and the edge velocity $u_e(x)$; the boundary layer responds to them.

On an airfoil at moderate incidence the boundary layer begins at the forward stagnation point, where it is thinnest. Along the upper surface the flow first accelerates to the suction peak (a **favourable** pressure gradient, $dp/dx < 0$, which keeps the layer thin and laminar) and then decelerates towards the trailing edge (an **adverse** gradient, $dp/dx > 0$). Somewhere, usually near or after the suction peak, the layer becomes turbulent. At the trailing edge the upper and lower layers merge into the wake.

::: definition Boundary-layer thicknesses and shape factor {#def-thicknesses}
For a boundary layer with velocity profile $u(y)$ and edge velocity $u_e$:

- the **thickness** $\delta$ (or $\delta_{99}$) is the distance from the wall at which $u = 0.99\,u_e$;
- the **displacement thickness** $\delta^* = \int_0^\infty\left(1 - \dfrac{u}{u_e}\right)dy$ is the distance by which the wall would have to be moved out to give the same mass flow in an inviscid flow — it is how far the boundary layer pushes the outer flow away from the body;
- the **momentum thickness** $\theta = \int_0^\infty\dfrac{u}{u_e}\left(1 - \dfrac{u}{u_e}\right)dy$ measures the momentum deficit, and hence the drag;
- the **shape factor** is $H = \delta^*/\theta$: about $2.59$ for the laminar flat plate, about $1.3$–$1.4$ for a turbulent flat plate, and rising to roughly $3.5$ (laminar) or $2.5$–$3$ (turbulent) at separation.

The local **skin-friction coefficient** is $c_f = \tau_w/\left(\tfrac12\rho u_e^2\right)$, and the average over a length $L$ is $C_f$.
:::

For the zero-pressure-gradient flat plate the classical results are (with $\mathrm{Re}_x = u_ex/\nu$):

| | laminar (Blasius, exact) | turbulent (1/7-power law, empirical) |
|---|---|---|
| thickness | $\delta = 5.0\,x/\sqrt{\mathrm{Re}_x}$ | $\delta = 0.37\,x/\mathrm{Re}_x^{1/5}$ |
| displacement thickness | $\delta^* = 1.721\,x/\sqrt{\mathrm{Re}_x}$ | $\delta^* \approx \delta/8$ |
| momentum thickness | $\theta = 0.664\,x/\sqrt{\mathrm{Re}_x}$ | $\theta \approx 7\delta/72$ |
| local friction | $c_f = 0.664/\sqrt{\mathrm{Re}_x}$ | $c_f = 0.0592/\mathrm{Re}_x^{1/5}$ |
| average friction | $C_f = 1.328/\sqrt{\mathrm{Re}_L}$ | $C_f = 0.074/\mathrm{Re}_L^{1/5}$ |

The laminar column is an exact solution of the boundary-layer equations. The turbulent column is a correlation from Prandtl's one-seventh-power velocity profile with an empirical wall-shear law; it fits measurements for $5\times10^5 \lesssim \mathrm{Re}_L \lesssim 10^7$. At higher Reynolds numbers the **Schlichting** correlation
$$
C_f = \frac{0.455}{\left(\log_{10}\mathrm{Re}_L\right)^{2.58}}
$$ {#eq-schlichting}
is used (valid to about $10^9$, accurate to a few per cent). When the layer is laminar up to a transition Reynolds number $\mathrm{Re}_{x,tr}$ and turbulent after it, a standard estimate of the average friction subtracts the turbulent friction that the laminar part does not have and adds the laminar friction it does:
$$
C_f = \frac{0.074}{\mathrm{Re}_L^{1/5}} - \frac{A}{\mathrm{Re}_L}, \qquad A = \mathrm{Re}_{x,tr}\left(\frac{0.074}{\mathrm{Re}_{x,tr}^{1/5}} - \frac{1.328}{\mathrm{Re}_{x,tr}^{1/2}}\right),
$$ {#eq-mixed-cf}
with $A = 1742$ for the commonly assumed $\mathrm{Re}_{x,tr} = 5\times10^5$. It assumes the turbulent layer behaves as though it had started at the leading edge, which is an approximation that errs slightly on the high side.

::: widget plot
f: 1.328/sqrt(pow(10, x)); 0.074/pow(10, 0.2*x); 0.074/pow(10, 0.2*x) - A/pow(10, x); 0.455/pow(x, 2.58)
x: 5, 9
y: 0, 0.008
sliders: A=1742:0:20000:10
labels: \text{laminar}\ 1.328/\sqrt{Re}; \text{turbulent}\ 0.074/Re^{0.2}; \text{transitional, eq. constant}\ A; \text{Schlichting}
caption: Average skin-friction coefficient of a flat plate against $\log_{10}\mathrm{Re}_L$ (so $x = 7$ means $\mathrm{Re}_L = 10^7$). At $\mathrm{Re}_L = 10^7$ the turbulent value is about seven times the laminar one — the prize of laminar flow. The transitional curve [[#eq-mixed-cf]] uses the constant $A$ on the slider: $1742$ for transition at $\mathrm{Re}_{x,tr} = 5\times10^5$; try about $5700$ for $\mathrm{Re}_{x,tr} = 1.8\times10^6$ (laminar flow over 30 per cent of the chord at $\mathrm{Re} = 6\times10^6$) and watch the curve drop towards the laminar line at low $\mathrm{Re}_L$. Beyond $\mathrm{Re}_L \approx 10^7$ the power law and Schlichting's formula begin to separate.
:::

::: example Skin friction on a wing section {#ex-friction}
A wing of chord $2\,\mathrm{m}$ flies at $60\,\mathrm{m/s}$ at sea level. Treating each surface as a flat plate, estimate the friction drag per metre of span if the boundary layer is (a) entirely laminar, (b) entirely turbulent, (c) laminar up to $\mathrm{Re}_{x,tr} = 5\times10^5$. Where does transition occur in (c), and how thick is the boundary layer at the trailing edge in (a) and (b)?
::: solution
$\mathrm{Re}_c = 60 \times 2/(1.460\times10^{-5}) = 8.22\times10^6$ and $q_\infty = \tfrac12(1.225)(60)^2 = 2205\,\mathrm{Pa}$.
(a) $C_f = 1.328/\sqrt{8.22\times10^6} = 0.000463$; both surfaces: $D' = 2C_fq_\infty c = 2(0.000463)(2205)(2) = 4.1\,\mathrm{N/m}$.
(b) $C_f = 0.074/(8.22\times10^6)^{0.2} = 0.00306$; $D' = 27.0\,\mathrm{N/m}$. (Schlichting's [[#eq-schlichting]] gives $0.00310$, 1 per cent more.)
(c) $C_f = 0.00306 - 1742/8.22\times10^6 = 0.00285$; $D' = 25.2\,\mathrm{N/m}$. Transition is at $x_{tr} = 5\times10^5 \times 1.460\times10^{-5}/60 = 0.122\,\mathrm{m}$, 6 per cent of the chord.
Trailing-edge thicknesses: laminar $\delta = 5.0 \times 2/\sqrt{8.22\times10^6} = 3.5\,\mathrm{mm}$, turbulent $\delta = 0.37 \times 2/(8.22\times10^6)^{0.2} = 31\,\mathrm{mm}$.
*Sanity check:* the turbulent layer is $1.5$ per cent of the chord thick at the trailing edge — thin, as Prandtl's theory requires — and the 6:1 friction ratio between laminar and turbulent flow is why designers fight for laminar flow. Even the "natural" transition at $5\times10^5$ leaves only a few per cent of the chord laminar at this Reynolds number; to do better the pressure gradient must be kept favourable over a long distance, which is the idea behind laminar-flow sections.
:::
:::

## Pressure gradients and separation

The boundary layer's fate is decided by the pressure gradient. In a favourable gradient the outer flow accelerates and pulls the slow fluid near the wall along with it. In an adverse gradient the pressure force *opposes* the motion of every particle in the layer; the fast outer fluid has the momentum to push through, but the slow fluid near the wall does not. It decelerates, stops, and reverses: the wall shear falls to zero and the boundary layer leaves the surface. This is **separation**. Downstream of it there is a region of recirculating, low-energy fluid, the inviscid pressure distribution no longer applies, and the pressure recovery that the inviscid flow promised over the rear of the body does not happen.

The tool that connects the boundary layer to the pressure distribution without solving the full boundary-layer equations is the momentum integral.

::: proposition Von Kármán's momentum integral equation {#prop-momentum-integral}
For a steady, two-dimensional, incompressible boundary layer with edge velocity $u_e(x)$,
$$
\frac{d\theta}{dx} + \left(2 + H\right)\frac{\theta}{u_e}\frac{du_e}{dx} = \frac{c_f}{2} .
$$ {#eq-momentum-integral}
:::

::: proof
Start from the boundary-layer equations, $u\,u_x + v\,u_y = u_e u_e' + \nu u_{yy}$ and $u_x + v_y = 0$, where the pressure gradient has been written $-\tfrac1\rho\,dp/dx = u_eu_e'$ (Bernoulli at the edge). Expanding the left-hand side of
$$
\partial_x\left[u(u_e - u)\right] + \partial_y\left[v(u_e - u)\right] + u_e'(u_e - u) = -\nu u_{yy}
$$
and using continuity ($v_y = -u_x$) reduces it to $-(u\,u_x + v\,u_y - u_eu_e')$, so this is the momentum equation rewritten in terms of the velocity defect. Integrate from $y = 0$ to a height beyond the layer, where $u = u_e$ and $u_y = 0$. The $\partial_y$ term vanishes at both limits ($v = 0$ at the wall, $u_e - u = 0$ outside), and $-\nu\int u_{yy}\,dy = \nu u_y(0) = \tau_w/\rho$. With $\int u(u_e - u)\,dy = u_e^2\theta$ and $\int(u_e - u)\,dy = u_e\delta^*$:
$$
\frac{d}{dx}\left(u_e^2\theta\right) + u_e u_e'\,\delta^* = \frac{\tau_w}{\rho}.
$$
Expanding the derivative and dividing by $u_e^2$ gives $\theta' + 2\theta u_e'/u_e + \delta^*u_e'/u_e = \tau_w/(\rho u_e^2) = c_f/2$, which is [[#eq-momentum-integral]] with $\delta^* = H\theta$. Assumptions: steady, two-dimensional, incompressible boundary-layer flow (thin layer, pressure constant across it); it holds for laminar and, with mean quantities, turbulent layers alike.
:::

On its own the equation has three unknowns ($\theta$, $H$, $c_f$), so it is closed with correlations. For laminar layers the simplest closure is Thwaites's method.

::: algorithm Thwaites's method for laminar boundary layers {#alg-thwaites}
Given $u_e(x)$ from an inviscid solution, with $x$ measured from the stagnation point (or leading edge):
1. Compute the momentum thickness from
$$
\theta^2(x) = \frac{0.45\,\nu}{u_e^6(x)}\int_0^x u_e^5\,dx .
$$ {#eq-thwaites}
2. Form the pressure-gradient parameter $\lambda = \dfrac{\theta^2}{\nu}\dfrac{du_e}{dx}$.
3. Read $H(\lambda)$ and the friction $c_f = 2\nu\,\ell(\lambda)/(u_e\theta)$ from Thwaites's correlation functions (tabulated; for $\lambda = 0$, $H = 2.61$ and $\ell = 0.22$).
4. **Separation** is predicted where $\lambda$ falls to about $-0.09$.
:::

The method rests on an empirical observation of Thwaites (1949): for many exact laminar solutions the combination $u_e\,d(\theta^2)/dx/\nu$ is very nearly the linear function $0.45 - 6\lambda$ of $\lambda$, which turns the momentum integral equation into the integrable form [[#eq-thwaites]]. Its accuracy is typically 5–10 per cent for $\theta$ in favourable and mild adverse gradients, poorer near separation. For a flat plate ($u_e$ constant) it gives $\theta = \sqrt{0.45\nu x/u_e} = 0.671\,x/\sqrt{\mathrm{Re}_x}$, within 1 per cent of the exact Blasius value $0.664\,x/\sqrt{\mathrm{Re}_x}$.

::: example Laminar separation in a linearly decelerating flow {#ex-thwaites}
A laminar boundary layer starts at $x = 0$ under an edge velocity that decreases linearly, $u_e = U(1 - x/L)$. Where does Thwaites's method predict separation? (This is Howarth's classical test case; the exact numerical solution separates at $x/L = 0.120$.)
::: solution
With $\xi = x/L$, $\int_0^x u_e^5\,dx = U^5L\left[1 - (1 - \xi)^6\right]/6$, so
$$
\theta^2 = \frac{0.45\,\nu L}{6U}\cdot\frac{1 - (1 - \xi)^6}{(1 - \xi)^6} = \frac{0.075\,\nu L}{U}\left[(1 - \xi)^{-6} - 1\right],
$$
and with $du_e/dx = -U/L$,
$$
\lambda = \frac{\theta^2}{\nu}\left(-\frac UL\right) = -0.075\left[(1 - \xi)^{-6} - 1\right].
$$
Setting $\lambda = -0.09$: $(1 - \xi)^{-6} = 2.2$, so $\xi = 1 - 2.2^{-1/6} = 0.123$. *Sanity check:* the method is within 3 per cent of the exact $0.120$. Note what the result says: a laminar layer tolerates only a 12 per cent drop in edge velocity — a pressure rise of about $0.23\,q$ — before it separates, regardless of the Reynolds number (which has dropped out). A turbulent layer, with its much fuller velocity profile, tolerates far more.
:::
:::

::: widget plot
f: 2*x - 2*x^3 + x^4; pow(x, 1/7); 2*x - 2*x^3 + x^4 + (L/6)*x*(1 - x)^3
x: 0, 1
y: 0, 1.15
sliders: L=-12:-12:12:0.5
labels: \text{laminar (Pohlhausen quartic,}\ \Lambda = 0); \text{turbulent}\ (y/\delta)^{1/7}; \text{laminar with pressure gradient}\ \Lambda
caption: Boundary-layer velocity profiles $u/u_e$ against $y/\delta$ (note the axes: distance from the wall is horizontal). The turbulent one-seventh-power profile is much fuller near the wall than the laminar one, so it has higher wall shear (more friction) but carries more momentum close to the surface (more resistance to separation). The third curve is Pohlhausen's quartic family with pressure-gradient parameter $\Lambda = (\delta^2/\nu)\,du_e/dx$ on the slider: positive (favourable) values make the profile fuller; at $\Lambda = -12$ the slope at the wall falls to zero — the separation profile of this family.
:::

::: warning Separation is decided by the pressure gradient, not by the speed
Students often expect separation to occur where the flow is slowest, or where the pressure is highest. It occurs where the boundary layer has been made to climb too much *adverse* gradient for its momentum. A laminar layer separates after a small velocity drop, as example [[#ex-thwaites]] showed, almost independently of the Reynolds number; a turbulent layer can climb a much larger one. That is why a tripped (turbulent) boundary layer reduces the drag of a sphere or cylinder at the critical Reynolds number, and why an airfoil's stall depends so strongly on where transition happens. A second trap: the inviscid pressure distribution is only valid up to the separation point. Downstream of it you cannot use Bernoulli on the potential-flow velocities.
:::

## Transition

A laminar boundary layer is unstable above a critical Reynolds number: small disturbances — free-stream turbulence, sound, surface roughness, vibration — grow as travelling waves (**Tollmien–Schlichting waves**) in two-dimensional layers, then break down into turbulent spots that merge into fully turbulent flow. On a flat plate in a quiet stream the instability begins near $\mathrm{Re}_x \approx 5\times10^5$ in terms of the momentum-thickness Reynolds number $\mathrm{Re}_\theta \approx 200$, but transition itself takes place farther downstream, from $\mathrm{Re}_x \approx 5\times10^5$ in an ordinary wind tunnel to $3\times10^6$ or more in a very quiet one. Favourable pressure gradients stabilise the layer (which is why the leading-edge region of an airfoil is usually laminar); adverse gradients destabilise it strongly.

On airfoils at the moderate Reynolds numbers of sailplanes, wind turbines and small aircraft ($10^5$–$2\times10^6$), a laminar layer often separates in the adverse gradient behind the suction peak *before* it has become turbulent; the separated shear layer then becomes turbulent and reattaches, enclosing a **laminar separation bubble**. Short bubbles are harmless or even useful; long ones add drag, and "bursting" of a short bubble at high incidence is one route to sudden leading-edge stall. Engineering prediction uses the $e^N$ **method**: linear stability theory computes the amplification of the most unstable disturbance along the surface, and transition is assumed where it has grown by a factor $e^N$, with $N \approx 9$ for a quiet free-air environment (lower in a noisier wind tunnel). That is the transition criterion of XFOIL.

## Profile drag

The **profile drag** of a section is the sum of skin-friction drag (the integral of wall shear) and pressure drag (the integral of the pressure, which no longer cancels because the boundary layer has displaced the outer flow and the rear pressure recovery is incomplete). For a streamlined section at low incidence, friction is typically 70–90 per cent of the total; for a bluff body, pressure drag dominates. Both appear together as a momentum deficit in the wake, which is how profile drag is measured: a rake of total-pressure probes behind the model measures the wake, and the drag is $D' = \rho\int u(V_\infty - u)\,dy$, i.e. $c_d = 2\theta_\infty/c$, where $\theta_\infty$ is the momentum thickness of the wake far downstream.

::: proposition The Squire–Young formula {#prop-squire-young}
If the boundary layers at the trailing edge have total momentum thickness $\theta_{TE}$ (upper plus lower surfaces), shape factor $H_{TE}$ and edge velocity $u_{TE}$, the section profile drag coefficient is approximately
$$
c_d = \frac{2\theta_{TE}}{c}\left(\frac{u_{TE}}{V_\infty}\right)^{(H_{TE} + 5)/2}.
$$ {#eq-squire-young}
:::

::: proof
In the wake there is no wall, so [[#eq-momentum-integral]] with $c_f = 0$ gives $d\theta/dx = -(2 + H)(\theta/u_e)\,du_e/dx$, i.e. $d(\ln\theta)/d(\ln u_e) = -(2 + H)$. As the wake moves downstream its edge velocity recovers from $u_{TE}$ to $V_\infty$ and its shape factor relaxes from $H_{TE}$ towards $1$. Squire and Young (1937) assumed, from measurements, that $H$ varies linearly with $\ln(u_e)$ between those end states, so that the average of $(2 + H)$ over the integration is $2 + \tfrac12(H_{TE} + 1) = (H_{TE} + 5)/2$. Integrating, $\ln(\theta_\infty/\theta_{TE}) = \tfrac{H_{TE} + 5}{2}\ln(u_{TE}/V_\infty)$, and $c_d = 2\theta_\infty/c$ gives [[#eq-squire-young]]. Assumptions: two-dimensional incompressible wake, the empirical $H$–$u_e$ relation, and attached flow at the trailing edge; the formula is used in most viscous–inviscid airfoil codes to convert trailing-edge boundary-layer data into drag.
:::

For quick estimates, the profile drag of a section with attached flow is often written as twice the flat-plate friction (two surfaces) times a **form factor** that accounts for the higher velocities and the pressure drag of a thick section. A widely used correlation from conceptual aircraft design (Raymer, *Aircraft Design: A Conceptual Approach*) is
$$
c_{d,\min} \approx 2C_f\left[1 + \frac{0.6}{(x/c)_m}\left(\frac tc\right) + 100\left(\frac tc\right)^4\right],
$$ {#eq-form-factor}
where $(x/c)_m$ is the chordwise position of maximum thickness; Raymer multiplies it by a further factor $1.34M^{0.18}$ (times a sweep term), which is close to $1$ at $M \approx 0.2$ and is omitted here. It is accurate to perhaps 10 per cent for conventional sections near their minimum-drag lift coefficient; it does not apply to laminar-flow sections in their low-drag range or to separated flow.

::: example Minimum drag of the NACA 0012 {#ex-profile-drag}
Estimate the minimum profile drag of a smooth NACA 0012 section at $\mathrm{Re} = 6\times10^6$ (a) assuming fully turbulent flow and (b) assuming laminar flow up to 30 per cent chord on both surfaces. The measured value for a smooth model in a low-turbulence tunnel is about $0.0058$ (Abbott and von Doenhoff).
::: solution
Maximum thickness is at 30 per cent chord, so the form factor is $1 + (0.6/0.3)(0.12) + 100(0.12)^4 = 1 + 0.24 + 0.0207 = 1.261$.
(a) $C_f = 0.074/(6\times10^6)^{0.2} = 0.00326$, so $c_d = 2(0.00326)(1.261) = 0.0082$.
(b) With $\mathrm{Re}_{x,tr} = 0.3 \times 6\times10^6 = 1.8\times10^6$, [[#eq-mixed-cf]] gives $A = 1.8\times10^6(0.074/17.79 - 1.328/1342) = 5690$ and $C_f = 0.00326 - 5690/6\times10^6 = 0.00231$, so $c_d = 2(0.00231)(1.261) = 0.0058$.
*Sanity check:* the estimate with some laminar flow matches the smooth-model measurement; the fully turbulent figure is close to what the same section gives with standard leading-edge roughness (Abbott and von Doenhoff quote values near $0.008$–$0.009$ with roughness at this Reynolds number). The comparison shows how much of a section's drag depends on where transition happens — a matter of surface finish, insects and rain as much as of shape.
:::
:::

::: example Drag from trailing-edge boundary-layer data {#ex-squire-young}
A boundary-layer calculation for a section at its design lift gives, at the trailing edge, a total momentum thickness (both surfaces) of $\theta_{TE} = 0.0036\,c$, a shape factor of $1.5$ and an edge velocity $0.95\,V_\infty$. Estimate the profile drag coefficient.
::: solution
By [[#eq-squire-young]], $c_d = 2(0.0036)(0.95)^{(1.5 + 5)/2} = 0.0072 \times 0.95^{3.25} = 0.0072 \times 0.8464 = 0.0061$. *Sanity check:* the wake far downstream has $\theta_\infty = 0.0030\,c$, smaller than at the trailing edge because the wake is accelerating back to $V_\infty$; ignoring that recovery (using $2\theta_{TE}/c$ directly) would overestimate the drag by 18 per cent. The value $0.006$ is typical of a conventional section near minimum drag.
:::
:::

## Stall

As the angle of attack rises, the suction peak grows and the adverse gradient behind it steepens. Eventually the boundary layer separates, the lift stops rising and falls, and drag and pitching moment change abruptly: the section has **stalled**. Measured lift curves show three characteristic types, classified by McCullough and Gault (NACA TN 2502, 1951):

- **trailing-edge stall** — turbulent separation starts at the trailing edge and creeps forward as $\alpha$ increases; the lift curve rounds over gently and falls slowly. Typical of thick sections (more than about 12–15 per cent).
- **leading-edge stall** — a short laminar separation bubble near the nose bursts, and the flow separates abruptly from the leading edge with no reattachment; lift drops suddenly and substantially. Typical of moderately thin sections (about 9–12 per cent) with sharp suction peaks.
- **thin-airfoil stall** — on very thin sections, a leading-edge bubble forms at small angles and lengthens steadily with incidence; the lift curve bends over early and the maximum lift is low.

The maximum lift coefficient of a section depends on its thickness, camber, nose radius and surface condition, and strongly on the Reynolds number, because $\mathrm{Re}$ governs transition and the boundary layer's momentum. For conventional sections at $\mathrm{Re} = 6\times10^6$, $c_{l,\max}$ is typically $1.4$–$1.7$; at $\mathrm{Re} \approx 3\times10^5$ it may be $1.0$–$1.2$. The wing's $C_{L,\max}$ is lower than its sections' because the spanwise lift distribution brings some section to its maximum first (usually 0.85–0.95 of the section value for unswept wings, less for swept ones), and designers arrange twist and planform so that the first stall is inboard, leaving the ailerons effective.

::: quiz
Two otherwise identical smooth airfoil models are tested at chord Reynolds numbers of $3\times10^5$ and $6\times10^6$. Which statement is most likely true?
- [ ] The lift-curve slope is very different, but $c_{l,\max}$ is the same
- [x] The lift-curve slope is nearly the same, but $c_{l,\max}$ and the minimum drag differ substantially
- [ ] Both are identical, since the geometry is the same
- [ ] The low-$\mathrm{Re}$ model has the higher $c_{l,\max}$, because its boundary layer is thinner
::: solution
The attached-flow lift slope is set mainly by inviscid physics and changes little with $\mathrm{Re}$. Maximum lift and minimum drag are boundary-layer phenomena: at $3\times10^5$ the layer stays laminar longer, separates more easily (laminar bubbles) and is relatively thicker, so $c_{l,\max}$ is lower and $c_{d,\min}$ higher. Matching the Reynolds number matters most for exactly these quantities ([[aerodynamics/aerodynamic-forces]]).
:::
:::

## High-lift devices

An aircraft needs its maximum lift at take-off and landing, when it flies slowest, and its least drag in cruise, so the wing changes shape: **high-lift devices** increase $C_{L,\max}$ for low-speed flight and retract for cruise.

- **Trailing-edge flaps** add camber (thin-airfoil theory, [[aerodynamics/thin-airfoil-theory]], gives the lift increment at small deflection) and, in the slotted and Fowler types, chord. A **plain** flap simply hinges the rear of the section; a **split** flap deflects only the lower surface; a **slotted** flap leaves a gap through which high-pressure air from below energises the boundary layer on the flap's upper surface, delaying flap separation and allowing larger deflections; a **Fowler** flap moves aft as it deflects, increasing wing area and chord as well as camber. Double- and triple-slotted flaps are used on transports.
- **Leading-edge devices** — slats, Krueger flaps, drooped noses — do not increase the lift at a given incidence much; they reduce the suction peak at the nose and so delay leading-edge separation to a higher angle of attack, raising $c_{l,\max}$. A **slat** works by the "slot effect": the slat's own circulation reduces the suction peak on the main wing, and its trailing edge discharges a fresh boundary layer into a region of high velocity.

Typical increments of section maximum lift coefficient from preliminary-design data (Raymer) are about $0.9$ for a plain or split flap, $1.3$ for a single-slotted flap and $1.6$ for a double-slotted flap (Fowler-type flaps additionally multiplied by the chord extension), and about $0.3$–$0.4$ for slats; wing increments are smaller in proportion to the flapped span and the sweep. Real transports reach landing $C_{L,\max}$ values of about $2.4$–$3$ against about $1.4$–$1.6$ clean.

::: example Landing speed with flaps {#ex-high-lift}
A transport of mass $70\,\mathrm{t}$ and wing area $120\,\mathrm{m^2}$ has $C_{L,\max} = 1.5$ clean and $2.6$ with slats and double-slotted flaps fully deployed. Find the sea-level stall speeds and an approach speed of $1.23$ times the landing-configuration stall speed.
::: solution
$W = 70\,000 \times 9.81 = 686.7\,\mathrm{kN}$. $V_s = \sqrt{2W/(\rho_\infty SC_{L,\max})}$: clean, $\sqrt{2 \times 686\,700/(1.225 \times 120 \times 1.5)} = 78.9\,\mathrm{m/s}$; landing configuration, $\sqrt{2 \times 686\,700/(1.225 \times 120 \times 2.6)} = 59.9\,\mathrm{m/s}$. The approach speed is $1.23 \times 59.9 = 73.7\,\mathrm{m/s}$ (143 knots). *Sanity check:* the stall speed falls in the ratio $\sqrt{1.5/2.6} = 0.76$, so the kinetic energy to be absorbed on landing falls to $0.58$ of the clean-wing value, with a corresponding reduction in landing distance. An approach speed near 140 knots is typical of this class of aircraft; without high-lift devices it would be about 190 knots and the landing distance would be roughly doubled.
:::
:::

::: application Laminar-flow sections
Because laminar friction is so much lower than turbulent, sections have been shaped since the late 1930s to keep the boundary layer laminar over a large fraction of the chord: the NACA six-series moves the minimum pressure aft (to 40–60 per cent chord), so that the favourable gradient — and with it laminar flow — extends that far. The result is a "drag bucket": a range of lift coefficients over which the drag is very low, outside which the suction peak moves forward, transition jumps forward, and the drag rises sharply. The benefit is realised only if the surface is smooth and clean enough; insects, rain and manufacturing steps trigger transition. Modern composite sailplanes keep laminar flow over half or more of the wing chord; on swept transport wings, crossflow instability makes natural laminar flow much harder, and that remains a research and development topic.
:::

::: history
Ludwig **Prandtl** introduced the boundary layer in a short paper to the International Congress of Mathematicians at Heidelberg in 1904, explaining separation and the failure of inviscid theory near walls. His student Heinrich **Blasius** solved the flat-plate laminar layer in 1908. Theodore **von Kármán** published the momentum integral equation in 1921, opening the way to approximate methods such as Pohlhausen's (1921) and Bryan Thwaites's (1949). Walter **Tollmien** (1929) and Hermann **Schlichting** (1933) computed the growth of the instability waves that bear their names, and Galen **Schubauer** and Harold **Skramstad** at the US National Bureau of Standards confirmed them experimentally in a very-low-turbulence tunnel (*Journal of Research of the NBS*, 1947). H. B. Squire and A. D. Young gave their drag formula in 1937, and George **McCullough** and Donald **Gault** of NACA Ames classified the three types of airfoil stall in 1951.
:::

## Summary

::: summary
- The boundary layer is thin at high $\mathrm{Re}$; the pressure across it is imposed by the outer inviscid flow. Its integral measures are $\delta^*$ (displacement), $\theta$ (momentum, drag) and $H = \delta^*/\theta$.
- Flat-plate friction: laminar $C_f = 1.328/\sqrt{\mathrm{Re}_L}$ (exact), turbulent $0.074/\mathrm{Re}_L^{0.2}$ or $0.455/(\log_{10}\mathrm{Re}_L)^{2.58}$ (empirical); transitional $0.074/\mathrm{Re}_L^{0.2} - A/\mathrm{Re}_L$. Turbulent friction is several times laminar.
- Von Kármán's momentum integral $\theta' + (2 + H)(\theta/u_e)u_e' = c_f/2$ links the boundary layer to the pressure distribution; Thwaites's method closes it for laminar flow and predicts separation at $\lambda \approx -0.09$ — after only about a 12 per cent velocity drop in a linear deceleration.
- Transition happens through amplified instability waves; $e^N$ ($N \approx 9$) is the engineering criterion; laminar separation bubbles occur at moderate $\mathrm{Re}$.
- Profile drag = friction + pressure drag, measured as a wake momentum deficit; Squire–Young: $c_d = (2\theta_{TE}/c)(u_{TE}/V_\infty)^{(H_{TE}+5)/2}$.
- Stall types: trailing-edge, leading-edge, thin-airfoil. $c_{l,\max}$ depends strongly on $\mathrm{Re}$. Flaps add camber (and chord); slats delay leading-edge separation; transports reach $C_{L,\max} \approx 2.5$–$3$.
:::

## Exercises

::: exercise Reynolds number of a wing {level=1 check="5.14e6"}
Find the chord Reynolds number of a wing of chord $1.5\,\mathrm{m}$ at $50\,\mathrm{m/s}$ in sea-level air. (Enter $\mathrm{Re}$.)
::: solution
$\mathrm{Re} = V_\infty c/\nu = 50 \times 1.5/(1.460\times10^{-5}) = 5.14\times10^6$.
:::
:::

::: exercise Transition position {level=1 check="0.146"}
A wing flies at $50\,\mathrm{m/s}$ at sea level. If transition occurs at $\mathrm{Re}_x = 5\times10^5$, how far behind the leading edge is it (flat-plate estimate)? (Enter the distance in metres.)
::: solution
$x_{tr} = \mathrm{Re}_{x,tr}\,\nu/V_\infty = 5\times10^5 \times 1.460\times10^{-5}/50 = 0.146\,\mathrm{m}$.
:::
:::

::: exercise Displacement thickness {level=1 check="0.81"}
Find the laminar displacement thickness $0.3\,\mathrm{m}$ from the leading edge of a flat plate in a sea-level stream at $20\,\mathrm{m/s}$. (Enter $\delta^*$ in mm.)
::: solution
$\mathrm{Re}_x = 20 \times 0.3/(1.460\times10^{-5}) = 4.11\times10^5$ (still laminar). $\delta^* = 1.721 \times 0.3/\sqrt{4.11\times10^5} = 0.81\,\mathrm{mm}$; $\delta = 2.3\,\mathrm{mm}$ and $\theta = 0.31\,\mathrm{mm}$, so $H = 2.59$.
:::
:::

::: exercise Laminar friction coefficient {level=2 check="0.00297"}
A flat plate in a model test has a fully laminar boundary layer at $\mathrm{Re}_L = 2\times10^5$. Find its average skin-friction coefficient, and the ratio to the turbulent value at the same $\mathrm{Re}_L$. (Enter $C_f$.)
::: solution
$C_f = 1.328/\sqrt{2\times10^5} = 0.00297$. The turbulent formula gives $0.074/(2\times10^5)^{0.2} = 0.00646$, so the ratio is $0.46$. The gap is smaller at low $\mathrm{Re}$; model tests at low $\mathrm{Re}$ with long laminar runs therefore under-predict the friction of the full-scale (turbulent) aircraft, which is why models are often tripped.
:::
:::

::: exercise Thwaites on a flat plate {level=2 check="0.671"}
Use Thwaites's formula [[#eq-thwaites]] for a flat plate ($u_e = U$ constant) to find $\theta\sqrt{\mathrm{Re}_x}/x$, and compare with the Blasius value. (Enter the coefficient.)
::: solution
$\theta^2 = (0.45\nu/U^6)U^5x = 0.45\nu x/U$, so $\theta = \sqrt{0.45}\,x/\sqrt{\mathrm{Re}_x} = 0.671\,x/\sqrt{\mathrm{Re}_x}$, against the exact $0.664$ — 1 per cent high.
:::
:::

::: exercise Stall-speed reduction {level=2 check="0.760"}
By what factor do slats and flaps that raise $C_{L,\max}$ from $1.5$ to $2.6$ reduce the stall speed at a given weight? (Enter the ratio of the new to the old stall speed.)
::: solution
$V_s \propto 1/\sqrt{C_{L,\max}}$, so the ratio is $\sqrt{1.5/2.6} = 0.760$, as in example [[#ex-high-lift]].
:::
:::

::: exercise Pressure rise to laminar separation {level=3 check="0.234"}
In example [[#ex-thwaites]], laminar separation occurred where $u_e/U = 1 - 0.123$. Express the pressure rise from the start of the deceleration to the separation point as a fraction of the initial dynamic pressure $\tfrac12\rho U^2$. Then explain, using the momentum integral equation, why a turbulent boundary layer can tolerate a much larger pressure rise, and what this implies for the design of the pressure recovery on the upper surface of an airfoil.
::: solution
By Bernoulli at the edge, $(p - p_0)/(\tfrac12\rho U^2) = 1 - (u_e/U)^2 = 1 - 0.877^2 = 0.234$. A turbulent layer has a fuller profile (smaller $H$, larger momentum near the wall) and continuous turbulent mixing that brings high-momentum fluid down to the wall; in momentum-integral terms its $c_f$ stays positive while $\theta$ grows much more, and separation only occurs at $H \approx 2.5$–$3$, which in practice allows pressure rises of $0.6\,q$ or more over a recovery. Design consequences: keep the recovery region turbulent (let transition occur at or before the start of the adverse gradient, or force it with a trip); shape the recovery so that the turbulent layer is kept just short of separation (the idea behind "Stratford" recoveries used in some high-lift and sailplane sections); and accept that a laminar-flow section must end its laminar run before the steep part of its recovery.
:::
:::

::: exercise Choosing high-lift devices {level=3}
A regional aircraft design needs to reduce its landing stall speed from $62\,\mathrm{m/s}$ (clean wing, $C_{L,\max} = 1.5$) to $50\,\mathrm{m/s}$ at the same weight. What landing $C_{L,\max}$ is required? Propose a combination of devices that could give it, discuss the penalties (weight, complexity, pitching moment, take-off drag) and explain why take-off and landing settings differ.
::: solution
$C_{L,\max} \propto 1/V_s^2$, so the requirement is $1.5 \times (62/50)^2 = 2.31$. A single-slotted flap over about 60–70 per cent of the span might add roughly $0.6$–$0.8$ to the wing $C_{L,\max}$ — marginal; a Fowler-type single-slotted flap with chord extension, or a double-slotted flap, gives about $1.0$, reaching $2.4$–$2.5$ without leading-edge devices on a straight wing; slats would add margin and improve stall behaviour but cost weight, maintenance and a larger nose-up pitch attitude at stall. Penalties: flap tracks and actuators add weight and fairing drag; large flap deflections produce a nose-down pitching moment (thin-airfoil theory, $\Delta c_{m,c/4} < 0$) that the tailplane must trim, needing a larger tail download and more tail area; deployed devices add profile and induced drag. At take-off the drag matters for climb gradient, so a smaller flap setting is used (more lift than clean, much less drag than landing); at landing the drag is welcome, so the flaps are fully deflected. The final choice should be checked with test data or validated CFD, since $C_{L,\max}$ is not predictable from inviscid theory.
:::
:::
