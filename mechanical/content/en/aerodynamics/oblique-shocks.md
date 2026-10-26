In subsonic flow the air "knows" a body is coming: pressure disturbances travel upstream at the speed of sound and the streamlines bend smoothly long before they reach it. In supersonic flow they cannot, and the flow must change direction abruptly. Where a supersonic stream is turned *into* itself — at the nose of a wedge, on a compression ramp, at a concave corner — it does so through a thin **oblique shock wave**, across which pressure, density and temperature jump and the Mach number falls. Where it is turned *away* from itself — round a convex corner — it does so smoothly through a fan of Mach waves, an **expansion**, across which the pressure falls and the Mach number rises. These two building blocks are enough to compute the pressures, and hence the lift and wave drag, on any two-dimensional supersonic shape made of straight segments: that is **shock–expansion theory**, the subject of the last part of this chapter.

The prerequisites are the one-dimensional compressible flow and normal-shock relations of [[fluid-mechanics/compressible-flow]]. Air is a calorically perfect gas with ratio of specific heats $\gamma = 1.4$ throughout; subscript $1$ denotes conditions ahead of a wave, $2$ behind it, and $p_0$ the stagnation (total) pressure.

## Mach waves

A small disturbance — a slight bump on a wall, a pressure tap — sends out sound waves in all directions. In a stream moving at $V > a$, each wave is swept downstream faster than it spreads, and the envelope of the waves emitted over time is a cone (in two dimensions, a pair of lines) whose half-angle is the **Mach angle**.

::: definition Mach angle and Mach wave {#def-mach-angle}
In a uniform stream of Mach number $M > 1$, an infinitesimally weak disturbance is felt only inside a wedge (or cone) bounded by **Mach waves** inclined to the flow direction at the **Mach angle**
$$
\mu = \arcsin\frac{1}{M}.
$$
The component of the flow velocity normal to a Mach wave is exactly the speed of sound, $V\sin\mu = a$. Upstream of the Mach waves from a point lies its **zone of silence**.
:::

At $M = 1$ the Mach angle is $90^\circ$ (the wave stands normal to the flow); at $M = 2$ it is $30^\circ$; at $M = 5$ it is $11.5^\circ$. The geometry also shows why a supersonic disturbance is confined: information travels along Mach waves, which lean downstream. A finite compression is a shock — a wave steeper than the Mach angle — and a finite expansion is a fan of Mach waves.

## The oblique shock relations

Consider a straight oblique shock inclined at the **wave angle** $\beta$ to the upstream flow, which turns the flow through the **deflection angle** $\theta$. Resolve the velocity on each side into a component $u$ normal to the shock and a component $w$ parallel to it.

::: proposition An oblique shock is a normal shock plus a tangential velocity {#prop-oblique}
Across a steady oblique shock in a perfect gas:
1. the tangential velocity component is unchanged, $w_1 = w_2$;
2. the jumps in pressure, density and temperature are those of a **normal shock** at the upstream **normal Mach number**
$$
M_{n1} = M_1\sin\beta ,
$$
namely
$$
\frac{p_2}{p_1} = 1 + \frac{2\gamma}{\gamma + 1}\left(M_{n1}^2 - 1\right), \qquad
\frac{\rho_2}{\rho_1} = \frac{(\gamma + 1)M_{n1}^2}{2 + (\gamma - 1)M_{n1}^2}, \qquad
M_{n2}^2 = \frac{1 + \tfrac{\gamma - 1}{2}M_{n1}^2}{\gamma M_{n1}^2 - \tfrac{\gamma - 1}{2}},
$$ {#eq-normal}
with $T_2/T_1 = (p_2/p_1)(\rho_1/\rho_2)$;
3. the downstream Mach number is $M_2 = M_{n2}/\sin(\beta - \theta)$;
4. the stagnation temperature is unchanged and the stagnation pressure falls, by the same ratio $p_{02}/p_{01}$ as for a normal shock at $M_{n1}$. A shock exists only if $M_{n1} > 1$, i.e. $\beta \ge \mu_1$.
:::

::: proof
Take a control volume that is a thin box straddling a unit area of the shock, with faces parallel to it. Steady continuity gives $\rho_1u_1 = \rho_2u_2$. The momentum equation resolved *along* the shock has no pressure contribution (pressure acts normal to the faces, and the side faces' contributions cancel), so $\rho_1u_1w_1 = \rho_2u_2w_2$; dividing by the continuity equation, $w_1 = w_2$. Momentum normal to the shock gives $p_1 + \rho_1u_1^2 = p_2 + \rho_2u_2^2$, and the steady adiabatic energy equation gives $h_1 + \tfrac12(u_1^2 + w_1^2) = h_2 + \tfrac12(u_2^2 + w_2^2)$, which with $w_1 = w_2$ becomes $h_1 + \tfrac12u_1^2 = h_2 + \tfrac12u_2^2$. These three equations in the normal components are *identical* to the normal-shock equations with $u$ in place of $V$, so their solution is the normal-shock solution of [[fluid-mechanics/compressible-flow]] at the normal Mach number $u_1/a_1 = M_1\sin\beta$, giving [[#eq-normal]]. Behind the shock the velocity makes the angle $\beta - \theta$ with the shock, so its normal component is $V_2\sin(\beta - \theta)$, giving $M_2 = M_{n2}/\sin(\beta - \theta)$. Stagnation temperature is conserved because $h + \tfrac12V^2$ is; the entropy rise is that of the normal shock (it depends only on the normal jump), and since $p_{02}/p_{01} = e^{-\Delta s/R}$ at constant $T_0$, the stagnation-pressure ratio is the normal-shock value. The second law requires $\Delta s \ge 0$, which holds only for $M_{n1} \ge 1$. Assumptions: steady, adiabatic, inviscid flow outside the shock; perfect gas with constant $\gamma$; a thin shock (its thickness is a few mean free paths).
:::

The geometry still has to be connected to the deflection. Since $\tan\beta = u_1/w$ and $\tan(\beta - \theta) = u_2/w$ with the same $w$, the ratio of the two is the velocity ratio, i.e. the inverse density ratio:

::: theorem The θ–β–M relation {#thm-theta-beta-m}
The deflection $\theta$ produced by an oblique shock of wave angle $\beta$ in a stream of Mach number $M_1$ is given by
$$
\tan\theta = 2\cot\beta\,\frac{M_1^2\sin^2\beta - 1}{M_1^2\left(\gamma + \cos2\beta\right) + 2} .
$$ {#eq-tbm}
For each $M_1$ the deflection is zero at $\beta = \mu_1$ (a Mach wave) and at $\beta = 90^\circ$ (a normal shock), and has a maximum $\theta_{\max}(M_1)$ in between. For $\theta < \theta_{\max}$ there are two solutions: a **weak** shock (smaller $\beta$, usually supersonic downstream) and a **strong** shock (larger $\beta$, always subsonic downstream).
:::

::: proof
From $\tan(\beta - \theta)/\tan\beta = u_2/u_1 = \rho_1/\rho_2 = r$ and $\tan(\beta - \theta) = (\tan\beta - \tan\theta)/(1 + \tan\beta\tan\theta)$, solve for $\tan\theta$:
$$
\tan\theta = \frac{(1 - r)\tan\beta}{1 + r\tan^2\beta}.
$$
With $s = \sin\beta$ and $r = \left[2 + (\gamma - 1)M_1^2s^2\right]/\left[(\gamma + 1)M_1^2s^2\right]$ from [[#eq-normal]], $1 - r = 2(M_1^2s^2 - 1)/\left[(\gamma + 1)M_1^2s^2\right]$, so
$$
\tan\theta = \frac{2\tan\beta\left(M_1^2s^2 - 1\right)}{(\gamma + 1)M_1^2s^2 + \left[2 + (\gamma - 1)M_1^2s^2\right]\tan^2\beta}.
$$
Divide numerator and denominator by $\tan^2\beta$ and use $s^2\cot^2\beta = \cos^2\beta$: the denominator becomes $M_1^2\left[(\gamma + 1)\cos^2\beta + (\gamma - 1)\sin^2\beta\right] + 2 = M_1^2(\gamma + \cos2\beta) + 2$, which gives [[#eq-tbm]]. The numerator vanishes at $M_1\sin\beta = 1$ ($\beta = \mu_1$) and $\cot\beta$ vanishes at $\beta = 90^\circ$; $\theta$ is positive and continuous in between, so it has a maximum, and every smaller positive $\theta$ is reached twice. At the strong solution $\beta$ is close to $90^\circ$, so $M_{n1}$ is close to $M_1$ and the normal-shock relations make $M_{n2}$ — and with it $M_2$ — subsonic.
:::

::: widget plot
f: atan(2/tan(x*pi/180)*(M^2*sin(x*pi/180)^2 - 1)/(M^2*(1.4 + cos(2*x*pi/180)) + 2))*180/pi; atan(2/tan(x*pi/180)*(4*sin(x*pi/180)^2 - 1)/(4*(1.4 + cos(2*x*pi/180)) + 2))*180/pi; atan(2/tan(x*pi/180)*(25*sin(x*pi/180)^2 - 1)/(25*(1.4 + cos(2*x*pi/180)) + 2))*180/pi
x: 0, 90
y: 0, 46
sliders: M=3:1.05:20:0.05
labels: \theta(\beta)\ \text{at}\ M; M = 2; M = 5
caption: The $\theta$–$\beta$–$M$ relation [[#eq-tbm]] for $\gamma = 1.4$, with the wave angle $\beta$ in degrees along the horizontal axis and the deflection $\theta$ in degrees up the vertical (curves are drawn only where $\theta > 0$, i.e. $\beta$ above the Mach angle). For $M = 2$ the maximum deflection is $23.0^\circ$ at $\beta = 64.7^\circ$; a $10^\circ$ wedge sits on the rising (weak) branch at $\beta = 39.3^\circ$ and on the falling (strong) branch at $83.7^\circ$. Move the slider: as $M$ grows the curve's left foot (the Mach angle) moves left and $\theta_{\max}$ approaches $45.6^\circ$; near $M = 1$ even small wedges exceed $\theta_{\max}$ and the shock detaches.
:::

::: algorithm Solving an oblique shock {#alg-oblique}
Given $M_1$ and the deflection $\theta$ (a wedge half-angle or a ramp angle):
1. Check attachment: find $\theta_{\max}(M_1)$ (maximise [[#eq-tbm]] over $\beta$, or read a chart). If $\theta > \theta_{\max}$, the shock **detaches** and stands curved ahead of the body; stop.
2. Find the weak-shock wave angle $\beta$ between $\mu_1 = \arcsin(1/M_1)$ and the $\beta$ of $\theta_{\max}$, by bisection or Newton iteration on [[#eq-tbm]] (or from a $\theta$–$\beta$–$M$ chart). Use the weak solution unless a high downstream back-pressure forces the strong one.
3. Compute $M_{n1} = M_1\sin\beta$, then $p_2/p_1$, $\rho_2/\rho_1$, $T_2/T_1$, $M_{n2}$ and $p_{02}/p_{01}$ from the normal-shock relations [[#eq-normal]].
4. Compute $M_2 = M_{n2}/\sin(\beta - \theta)$.
5. Check: $M_2 < M_1$, $p_2 > p_1$, and $p_{02}/p_{01} < 1$ but close to $1$ for weak shocks.
:::

::: example A 10° wedge at Mach 2 {#ex-wedge}
A symmetric wedge of half-angle $10^\circ$ flies at $M_1 = 2$ at zero incidence in air at $p_1 = 26.5\,\mathrm{kPa}$, $T_1 = 223\,\mathrm{K}$ (about $10\,\mathrm{km}$). Find the shock angle, the surface pressure and temperature, the Mach number on the wedge surface and the loss of stagnation pressure.
::: solution
$\theta_{\max}(2) = 23.0^\circ > 10^\circ$, so the shock is attached. Solving [[#eq-tbm]] on the weak branch gives $\beta = 39.3^\circ$ (above the Mach angle $30^\circ$, as it must be). Then $M_{n1} = 2\sin39.3^\circ = 1.267$, and
$$
\frac{p_2}{p_1} = 1 + \frac{2.8}{2.4}\left(1.267^2 - 1\right) = 1.707, \qquad \frac{\rho_2}{\rho_1} = 1.458, \qquad \frac{T_2}{T_1} = \frac{1.707}{1.458} = 1.170,
$$
so $p_2 = 45.2\,\mathrm{kPa}$ and $T_2 = 261\,\mathrm{K}$. The normal component behind the shock is $M_{n2} = 0.806$, and $M_2 = 0.806/\sin(39.3^\circ - 10^\circ) = 1.64$. The stagnation-pressure ratio is $p_{02}/p_{01} = 0.985$. *Sanity checks:* $M_2$ is still supersonic (weak branch); only $1.5$ per cent of the stagnation pressure is lost, against $28$ per cent for a normal shock at $M = 2$ ($p_{02}/p_{01} = 0.721$) — turning the flow with an oblique shock is far more efficient than stopping it with a normal one, which is the principle of supersonic intakes. The strong solution for the same wedge would have $\beta = 83.7^\circ$, $M_2 = 0.60$ and $p_2/p_1 = 4.44$.
:::
:::

## Detachment, reflection and intersection

If the wedge angle exceeds $\theta_{\max}(M_1)$, no straight attached shock can turn the flow. The shock then stands off ahead of the body as a curved **detached** (bow) shock: normal to the flow on the stagnation streamline, becoming more oblique and weaker away from the axis until it approaches a Mach wave far away. Every blunt body in supersonic flow has such a bow shock, with a pocket of subsonic flow between the shock and the nose. Since $\theta_{\max}$ never exceeds $45.6^\circ$ in air, a wedge sharper than that has an attached shock at a high enough Mach number, while a blunt nose never does.

When an oblique shock meets a solid wall, the flow behind it has been turned *towards* the wall and must be turned back parallel to it. A second shock — the **reflected shock** — does this, turning the flow through the same angle $\theta$ but now starting from the lower Mach number $M_2$. Because $M_2 < M_1$ the reflected shock is not a mirror image: its angle to the wall differs from the incident shock's. If $\theta > \theta_{\max}(M_2)$ regular reflection is impossible, and a **Mach reflection** forms, with a near-normal stem at the wall. Shock reflections are what make the flow in supersonic wind-tunnel test sections, intakes and nozzles complicated.

::: example Regular reflection from a wall {#ex-reflection}
A Mach $2.8$ stream is turned through $10^\circ$ by a ramp, and the resulting shock strikes a straight wall parallel to the original flow. Find the incident and reflected shock angles and the Mach number and pressure behind the reflected shock.
::: solution
*Incident shock* ($M_1 = 2.8$, $\theta = 10^\circ$): $\beta_1 = 28.9^\circ$, $M_{n1} = 1.355$, $p_2/p_1 = 1.975$, $M_2 = 2.34$.
*Reflected shock* ($M_2 = 2.34$, $\theta = 10^\circ$; $\theta_{\max}(2.34) \approx 28^\circ$, so regular reflection is possible): $\beta_2 = 33.8^\circ$ relative to the flow in region 2, $p_3/p_2 = 1.809$, $M_3 = 1.95$.
Region 2 flows at $10^\circ$ to the wall, so the reflected shock makes an angle $\beta_2 - \theta = 23.8^\circ$ with the wall, whereas the incident shock made $28.9^\circ$ with it: the reflection is flatter than the incidence. The pressure behind the reflection is $p_3/p_1 = 1.975 \times 1.809 = 3.57$.
*Sanity check:* two $10^\circ$ turns of weak shocks give a larger total pressure rise than one $10^\circ$ turn ($3.57$ against $1.98$), as they must since the flow has been compressed twice; and the reflected shock is slightly weaker in pressure ratio ($1.81$ against $1.98$) even though it turns the flow by the same angle, because it acts on a lower Mach number. The non-mirror geometry is a reminder that shock patterns cannot be drawn by symmetry arguments alone.
:::
:::

::: warning Choosing the solution branch, and degrees versus radians
For a given $M_1$ and $\theta$ there are two shock solutions, and a calculator or iteration started in the wrong place converges on the wrong one. Attached shocks on wedges, ramps and airfoils in external flow are **weak**; the strong solution occurs only when the downstream pressure is forced up (for example by a constriction in an internal flow) and as the central part of a detached bow shock. A second error is to put $\theta$ in degrees into a small-angle formula that needs radians (such as the weak-shock and Ackeret approximations), or to use a $\beta$ below the Mach angle — which gives $M_{n1} < 1$ and an "expansion shock" that the second law forbids.
:::

## Prandtl–Meyer expansion

At a convex corner of angle $\theta$, a supersonic flow turns *away* from itself. Nothing forces a sudden jump: the turn is made through a centred fan of Mach waves radiating from the corner, each of which turns the flow by an infinitesimal angle. Across each wave the flow is isentropic, so the whole expansion is.

::: proposition The Prandtl–Meyer function {#prop-prandtl-meyer}
In a steady, isentropic, two-dimensional expansion, the flow direction and Mach number are related by
$$
\theta_2 - \theta_1 = \nu(M_2) - \nu(M_1), \qquad
\nu(M) = \sqrt{\frac{\gamma + 1}{\gamma - 1}}\arctan\sqrt{\frac{\gamma - 1}{\gamma + 1}\left(M^2 - 1\right)} - \arctan\sqrt{M^2 - 1},
$$ {#eq-prandtl-meyer}
where $\theta_2 - \theta_1$ is the angle through which the flow turns away from itself. The pressure, temperature and density follow from the isentropic relations at constant stagnation conditions, e.g.
$$
\frac{p_2}{p_1} = \left[\frac{1 + \tfrac{\gamma - 1}{2}M_1^2}{1 + \tfrac{\gamma - 1}{2}M_2^2}\right]^{\gamma/(\gamma - 1)} .
$$ {#eq-isentropic-p}
The function $\nu(M)$ is zero at $M = 1$ and tends to $\nu_{\max} = \tfrac\pi2\left(\sqrt{(\gamma + 1)/(\gamma - 1)} - 1\right) = 130.5^\circ$ as $M \to \infty$.
:::

::: proof
Consider a single Mach wave turning the flow through a small angle $d\theta$ away from itself, with the speed changing from $V$ to $V + dV$. Across a weak wave the tangential velocity is conserved (as for any shock, [[#prop-oblique]]); the wave is inclined at $\mu$ to the incoming flow and at $\mu + d\theta$ to the outgoing one, so $V\cos\mu = (V + dV)\cos(\mu + d\theta)$. Expanding to first order, $V\cos\mu = V\cos\mu - V\sin\mu\,d\theta + dV\cos\mu$, so
$$
d\theta = \cot\mu\,\frac{dV}{V} = \sqrt{M^2 - 1}\,\frac{dV}{V},
$$
since $\sin\mu = 1/M$. From $V = Ma$ and the adiabatic relation $a^2 = a_0^2/\left(1 + \tfrac{\gamma - 1}{2}M^2\right)$, $dV/V = dM/M + da/a = \dfrac{dM}{M\left(1 + \tfrac{\gamma - 1}{2}M^2\right)}$. Hence
$$
d\theta = \frac{\sqrt{M^2 - 1}}{1 + \tfrac{\gamma - 1}{2}M^2}\,\frac{dM}{M},
$$
and integrating from $M = 1$ (with the standard substitutions $t = \sqrt{M^2 - 1}$) gives $\nu(M)$ as stated; the turning angle between two states is the difference of the $\nu$ values. As $M \to \infty$ both arctangents tend to $\pi/2$, giving $\nu_{\max}$. Each wave is isentropic to first order (the entropy change across a weak compression or expansion is of third order in its strength), so a fan of infinitesimal waves is isentropic, and [[#eq-isentropic-p]] applies. Assumptions: steady, two-dimensional, inviscid flow of a perfect gas; simple-wave region (waves of one family only).
:::

The same function describes a gradual (isentropic) *compression* along a smooth concave wall, as long as the Mach waves have not yet merged into a shock. Values to remember: $\nu(1.5) = 11.91^\circ$, $\nu(2) = 26.38^\circ$, $\nu(3) = 49.76^\circ$.

::: example Expansion round a corner {#ex-expansion}
A Mach $1.5$ stream at $p_1 = 100\,\mathrm{kPa}$ turns round a convex corner of $15^\circ$. Find the downstream Mach number and pressure, and the angles of the leading and trailing Mach waves of the fan.
::: solution
$\nu(1.5) = 11.91^\circ$, so $\nu(M_2) = 26.91^\circ$, which gives $M_2 = 2.02$ (by inverting [[#eq-prandtl-meyer]] numerically). From [[#eq-isentropic-p]],
$$
\frac{p_2}{p_1} = \left[\frac{1 + 0.2(1.5)^2}{1 + 0.2(2.02)^2}\right]^{3.5} = 0.455, \qquad p_2 = 45.5\,\mathrm{kPa}.
$$
The leading Mach wave of the fan makes $\mu_1 = \arcsin(1/1.5) = 41.8^\circ$ with the upstream flow; the trailing wave makes $\mu_2 = \arcsin(1/2.02) = 29.7^\circ$ with the downstream flow, which has been turned $15^\circ$ away, so measured from the *upstream* direction it lies at $29.7^\circ - 15^\circ = 14.7^\circ$. The fan therefore occupies the wedge between $41.8^\circ$ and $14.7^\circ$ from the upstream direction, centred on the corner. *Sanity check:* a $15^\circ$ expansion more than halves the pressure at this Mach number, and the stagnation pressure is unchanged — expansions are loss-free.
:::
:::

::: widget plot
f: (sqrt(6)*atan(sqrt((x^2 - 1)/6)) - atan(sqrt(x^2 - 1)))*180/pi; asin(1/x)*180/pi
x: 1, 6
y: 0, 95
labels: \nu(M)\ \text{(degrees)}; \mu(M) = \arcsin(1/M)\ \text{(degrees)}
caption: The Prandtl–Meyer function $\nu(M)$ for $\gamma = 1.4$ (so $\sqrt{(\gamma+1)/(\gamma-1)} = \sqrt6$) and the Mach angle $\mu(M)$. To find the Mach number after an expansion through $\Delta\theta$, read $\nu(M_1)$, add $\Delta\theta$, and read back the Mach number: from $M = 2$ ($26.4^\circ$) a $20^\circ$ expansion reaches $\nu = 46.4^\circ$, $M = 2.83$. The curve flattens as $M$ grows, so at high Mach number each degree of turning changes the Mach number a lot, approaching the limit $130.5^\circ$ (an expansion to vacuum).
:::

## Shock–expansion theory

A two-dimensional body made of straight segments in supersonic flow can now be analysed exactly (for inviscid flow): an oblique shock wherever the surface turns into the flow, a Prandtl–Meyer expansion wherever it turns away, and uniform flow along each straight segment. Integrating the piecewise-constant pressures gives lift and **wave drag** — a drag that exists in inviscid supersonic flow because the shocks carry entropy, and the pressure no longer cancels front to back. (Interactions between waves leaving the body, such as an expansion fan catching up with a shock, are neglected in the simplest form; they affect the flow field away from the surface but not the surface pressures of a body with straight surfaces.)

::: quiz
In shock–expansion theory, a flat plate at a small positive angle of attack in a supersonic stream has
- [ ] an expansion on the lower surface and a shock on the upper surface at the leading edge
- [x] a shock on the lower surface and an expansion on the upper surface at the leading edge
- [ ] shocks on both surfaces, and no expansions anywhere
- [ ] no waves at all, because a flat plate has zero thickness
::: solution
At positive incidence the lower surface turns the oncoming flow into itself (a compression: shock) and the upper surface turns it away (an expansion fan). At the trailing edge the roles reverse, so that the two streams leave with the same pressure and nearly the same direction. The pressure difference between the surfaces gives a normal force perpendicular to the plate, which has a drag component $N\sin\alpha$ even without friction: wave drag due to lift.
:::
:::

::: example A flat plate at Mach 3 {#ex-flat-plate}
A flat plate is at $\alpha = 5^\circ$ in a Mach $3$ stream. Use shock–expansion theory to find the pressure coefficients on the two surfaces and the lift and wave-drag coefficients.
::: solution
The pressure coefficient in terms of a pressure ratio is $C_p = \dfrac{2}{\gamma M_1^2}\left(\dfrac{p}{p_1} - 1\right)$, since $q_1 = \tfrac12\gamma p_1M_1^2$.
*Lower surface:* oblique shock with $\theta = 5^\circ$: $\beta = 23.1^\circ$, $p_l/p_1 = 1.454$, $M_l = 2.75$, so $C_{p,l} = \tfrac{2}{1.4 \times 9}(0.454) = 0.0721$.
*Upper surface:* expansion through $5^\circ$: $\nu(3) = 49.76^\circ \to 54.76^\circ$, $M_u = 3.27$, and by [[#eq-isentropic-p]] $p_u/p_1 = 0.668$, so $C_{p,u} = -0.0528$.
The normal-force coefficient is $c_n = C_{p,l} - C_{p,u} = 0.1249$, perpendicular to the plate, so
$$
c_l = c_n\cos\alpha = 0.1243, \qquad c_d = c_n\sin\alpha = 0.0109 .
$$
*Sanity check:* the lift-to-drag ratio is $\cot5^\circ = 11.4$, as it must be for a pressure force normal to a flat plate. The linearised theory of [[aerodynamics/supersonic-hypersonic]] gives $c_l = 4\alpha/\sqrt{M^2 - 1} = 0.1234$ and $c_d = 4\alpha^2/\sqrt{M^2 - 1} = 0.0108$, within 1 per cent. Note also the asymmetry: the compression side contributes more ($0.072$) than the expansion side ($0.053$), a nonlinear effect that grows with $\alpha$ and $M$.
:::
:::

::: example A diamond airfoil at zero incidence {#ex-diamond}
A symmetric diamond (double-wedge) section with half-angle $\varepsilon = 5^\circ$ (maximum thickness at mid-chord, $t/c = \tan5^\circ = 0.0875$) flies at $M_1 = 2$ at zero incidence. Find its wave-drag coefficient.
::: solution
By symmetry consider the upper surface. *Front face:* shock with $\theta = 5^\circ$: $\beta = 34.3^\circ$, $p_2/p_1 = 1.315$, $M_2 = 1.82$. *Shoulder:* expansion through $2\varepsilon = 10^\circ$: $\nu(1.82) = 21.3^\circ \to 31.3^\circ$, $M_3 = 2.18$, and $p_3/p_2 = 0.568$, so $p_3/p_1 = 0.748$. In coefficients, $C_{p2} = \tfrac{2}{1.4 \times 4}(0.315) = 0.1126$ and $C_{p3} = -0.0901$. The front face (projected height $t/2$) pushes back with $C_{p2}$ and the rear face pulls back with $-C_{p3}$, on each surface; per unit chord
$$
c_d = 2\left(C_{p2} - C_{p3}\right)\frac{t/2}{c} = 2(0.2027)(0.04374) = 0.0177 .
$$
*Sanity check:* linearised theory gives $c_d = 4(t/c)^2/\sqrt{M^2 - 1} = 4(0.0875)^2/\sqrt3 = 0.0177$ for a diamond — the same to three figures. A wave drag of $0.018$ is three times the friction drag of a comparable subsonic section, which is why supersonic wings are thin: the wave drag grows as the square of the thickness ratio.
:::
:::

::: application Supersonic intakes
A jet engine's compressor needs subsonic air, so a supersonic aircraft must slow its intake air from flight Mach number to about $M = 0.5$ with as little loss of stagnation pressure as possible. A single normal shock at $M = 2.5$ keeps only $p_{02}/p_{01} = 0.499$ of the stagnation pressure. A $10^\circ$ ramp first produces an oblique shock ($p_0$ ratio $0.976$, $M = 2.09$), after which a normal shock keeps $0.681$: overall $0.664$. Two $8^\circ$ ramps ($M = 2.17$, then $1.87$) followed by a normal shock give $0.764$. Each added oblique shock buys recovery at the price of length, weight, boundary-layer bleed and, for an aircraft that must work over a range of Mach numbers, variable geometry. Civil supersonic transports used variable-ramp rectangular intakes of this kind.
:::

::: history
William **Rankine** (1870) and Pierre-Henri **Hugoniot** (1887–1889) derived the jump conditions across a normal shock. Ludwig **Prandtl** (1907) and his student Theodor **Meyer**, in a Göttingen dissertation of 1908, gave the theory of oblique shocks and of the centred expansion fan that bears their names. In the 1920s and 1930s Jakob **Ackeret** in Zurich and Adolf **Busemann** in Germany applied these results to supersonic airfoils and built supersonic wind tunnels; Busemann's *shock polar* gave a graphical solution of [[#eq-tbm]], and his paper at the 1935 Volta Conference in Rome extended supersonic airfoil theory to second order in the deflection angle and introduced the idea of the swept wing. The NACA's *Equations, tables, and charts for compressible flow* (NACA Report 1135, 1953) collected the oblique-shock and Prandtl–Meyer relations into the charts that engineers used for decades.
:::

## Summary

::: summary
- Infinitesimal disturbances in supersonic flow travel along Mach waves at $\mu = \arcsin(1/M)$ to the flow.
- An oblique shock is a normal shock in the normal component $M_{n1} = M_1\sin\beta$ plus an unchanged tangential velocity; $M_2 = M_{n2}/\sin(\beta - \theta)$.
- $\theta$–$\beta$–$M$: $\tan\theta = 2\cot\beta\,(M_1^2\sin^2\beta - 1)/\left[M_1^2(\gamma + \cos2\beta) + 2\right]$, with weak and strong branches and a maximum deflection ($23.0^\circ$ at $M = 2$, $45.6^\circ$ as $M \to \infty$); beyond it the shock detaches.
- Reflections from walls are not mirror images: the reflected shock acts at the lower Mach number behind the incident one.
- Expansions are isentropic: $\Delta\theta = \nu(M_2) - \nu(M_1)$ with the Prandtl–Meyer function; $\nu(2) = 26.38^\circ$.
- Shock–expansion theory gives exact inviscid pressures on straight-sided bodies: a flat plate at $5^\circ$ and $M = 3$ has $c_l = 0.124$, $c_d = 0.011$; a 5° diamond at $M = 2$ has $c_d = 0.018$.
:::

## Exercises

::: exercise Mach angle {level=1 check="33.7"}
Find the Mach angle of a stream at $M = 1.8$. (Enter $\mu$ in degrees.)
::: solution
$\mu = \arcsin(1/1.8) = 33.7^\circ$.
:::
:::

::: exercise Pressure ratio across an oblique shock {level=1 check="2.458"}
A shock inclined at $30^\circ$ to a Mach $3$ stream: find the normal Mach number and the static-pressure ratio across it. (Enter $p_2/p_1$.)
::: solution
$M_{n1} = 3\sin30^\circ = 1.5$, and $p_2/p_1 = 1 + \tfrac{2.8}{2.4}(1.5^2 - 1) = 2.458$. (The deflection is then $\theta = 12.8^\circ$, from [[#eq-tbm]].)
:::
:::

::: exercise A Prandtl–Meyer value {level=1 check="26.38"}
Evaluate the Prandtl–Meyer function at $M = 2$ for $\gamma = 1.4$. (Enter $\nu$ in degrees.)
::: solution
$\nu(2) = \sqrt6\arctan\sqrt{3/6} - \arctan\sqrt3 = 2.4495 \times 0.6155 - 1.0472 = 0.4604\,\mathrm{rad} = 26.38^\circ$.
:::
:::

::: exercise A 15° ramp at Mach 3 {level=2 check="2.82"}
A Mach $3$ stream meets a $15^\circ$ compression ramp. Find the shock angle, the downstream Mach number and the pressure ratio. (Enter $p_2/p_1$.)
::: solution
$\theta_{\max}(3) = 34.1^\circ$, so the shock is attached. The weak solution of [[#eq-tbm]] is $\beta = 32.2^\circ$; $M_{n1} = 3\sin32.2^\circ = 1.600$, $p_2/p_1 = 1 + \tfrac{2.8}{2.4}(1.6^2 - 1) = 2.82$, $M_{n2} = 0.668$, $M_2 = 0.668/\sin17.2^\circ = 2.25$, and $p_{02}/p_{01} = 0.895$.
:::
:::

::: exercise A 10° expansion at Mach 2 {level=2 check="0.548"}
A Mach $2$ stream expands round a $10^\circ$ convex corner. Find $M_2$ and $p_2/p_1$. (Enter $p_2/p_1$.)
::: solution
$\nu(M_2) = 26.38^\circ + 10^\circ = 36.38^\circ$, so $M_2 = 2.38$; $p_2/p_1 = \left[(1 + 0.2 \times 4)/(1 + 0.2 \times 2.385^2)\right]^{3.5} = 0.548$.
:::
:::

::: exercise Will the shock attach? {level=2 check="22.97"}
What is the largest wedge half-angle for which a Mach $2$ stream can have an attached shock? Will a wedge of half-angle $25^\circ$ have one? (Enter $\theta_{\max}$ in degrees.)
::: solution
Maximising [[#eq-tbm]] over $\beta$ at $M_1 = 2$ gives $\theta_{\max} = 22.97^\circ$ at $\beta = 64.7^\circ$. A $25^\circ$ wedge exceeds it, so its shock detaches and stands ahead of the nose as a curved bow shock, with subsonic flow at the nose.
:::
:::

::: exercise The weak-shock approximation {level=3}
Show that for a small deflection $\theta$ (in radians) the pressure rise across a weak oblique shock is
$$
\frac{p_2 - p_1}{p_1} \approx \frac{\gamma M_1^2}{\sqrt{M_1^2 - 1}}\,\theta ,
$$
i.e. $C_p \approx 2\theta/\sqrt{M_1^2 - 1}$, and that a weak expansion gives the same with $\theta$ negative. Check it against the exact value at $M_1 = 2$ for $\theta = 2^\circ$ and $\theta = 10^\circ$.
::: solution
For a weak wave $\beta \approx \mu$. Write $M_1^2\sin^2\beta - 1 = \epsilon$, small. From [[#eq-tbm]] with $\beta \approx \mu$, $\tan\mu = 1/\sqrt{M_1^2 - 1}$ and $\cos2\mu = 1 - 2/M_1^2$: $\theta \approx 2\sqrt{M_1^2 - 1}\,\epsilon/\left[M_1^2(\gamma + 1) - 2 + 2\right] = 2\sqrt{M_1^2 - 1}\,\epsilon/\left[(\gamma + 1)M_1^2\right]$. The pressure jump is $(p_2 - p_1)/p_1 = 2\gamma\epsilon/(\gamma + 1)$. Eliminating $\epsilon$ gives the result. For an expansion, the Prandtl–Meyer relation $d\theta = \sqrt{M^2 - 1}\,dV/V$ with the momentum relation $dp = -\rho V\,dV$ gives $dp/p = -\gamma M^2\,dV/V = -\gamma M^2\,d\theta/\sqrt{M^2 - 1}$ for a turn $d\theta$ away from the flow — the same formula with the sign of the turn reversed. Check at $M_1 = 2$ ($\gamma M^2/\sqrt{M^2 - 1} = 3.233$): for $2^\circ$ the approximation gives $0.113$ against the exact $0.118$; for $10^\circ$ it gives $0.564$ against $0.707$. The linear approximation underestimates compressions by an amount that grows with the deflection — the basis of the linearised supersonic theory of [[aerodynamics/supersonic-hypersonic]] and of its limits.
:::
:::

::: exercise Designing an external-compression intake {level=3 check="0.764"}
For a civil supersonic aircraft cruising at $M = 2.5$, compare the stagnation-pressure recovery of (a) a pitot intake with a single normal shock, (b) a single $10^\circ$ ramp followed by a normal shock, and (c) two $8^\circ$ ramps followed by a normal shock. Then discuss what limits the number of ramps in practice and what happens at off-design Mach numbers. (Enter the recovery $p_{0,\text{final}}/p_{01}$ of case (c).)
::: solution
(a) Normal shock at $2.5$: $p_{02}/p_{01} = 0.499$. (b) Ramp: $\beta = 31.9^\circ$, $M_{n1} = 1.32$, $p_0$ ratio $0.976$, $M = 2.09$; normal shock at $2.09$: $0.681$; product $0.664$. (c) First ramp: $M = 2.17$, $p_0$ ratio $0.987$; second ramp from $2.17$: $M = 1.87$, $p_0$ ratio $0.990$; normal shock at $1.87$: $0.781$; product $0.764$. Each oblique shock is weaker and the final normal shock occurs at a lower Mach number. In the limit of many small ramps (an isentropic compression surface) recovery approaches $1$, but the intake becomes long and heavy, the boundary layer on the ramps grows and must be bled off to prevent separation where the shocks hit it, and the oblique shocks must focus on the cowl lip only at one Mach number. At other Mach numbers the shocks miss the lip (spilling air and adding drag) or enter the intake; variable ramps, bleed and bypass doors are used to keep the shock system positioned, and an unstable shock position ("unstart" or "buzz") must be avoided.
:::
:::
