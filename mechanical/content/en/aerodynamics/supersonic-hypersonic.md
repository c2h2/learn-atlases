Above Mach 1 the aerodynamics of a wing changes character. Disturbances can no longer travel upstream, so the flow over each surface is decided locally by the surface's inclination; there is no Kutta condition and no circulation in the subsonic sense; and even an inviscid flow has a drag — **wave drag** — because the waves a body sends out carry momentum and energy away to infinity. For thin wings at moderate supersonic Mach numbers, a linear theory due to Ackeret captures all of this in a few lines and explains why supersonic wings are thin, sharp-edged and swept behind the Mach cone. At hypersonic speeds — roughly $M > 5$ — the linear theory fails: shocks lie close to the body, temperatures behind them are high enough to dissociate the air, and very different approximations (Newtonian flow, blunt bodies, heating correlations) take over.

This chapter follows on directly from [[aerodynamics/oblique-shocks]] (oblique shocks, Prandtl–Meyer expansions, shock–expansion theory) and uses the linearised potential equation derived in [[aerodynamics/compressible-airfoils]]. Air is a perfect gas with $\gamma = 1.4$ unless stated; $\lambda = \sqrt{M_\infty^2 - 1}$ throughout; $q_\infty = \tfrac12\rho_\infty V_\infty^2 = \tfrac12\gamma p_\infty M_\infty^2$.

## Linearised supersonic flow

For a thin body in a supersonic stream, the perturbation potential satisfies the linearised equation of [[aerodynamics/compressible-airfoils]],
$$
\lambda^2\phi'_{xx} - \phi'_{yy} = 0, \qquad \lambda = \sqrt{M_\infty^2 - 1},
$$ {#eq-wave}
valid for $M_\infty$ neither close to $1$ nor hypersonic. It is the one-dimensional **wave equation**, with $x$ playing the role of time.

::: proposition Supersonic surface pressure (linear theory) {#prop-ackeret-cp}
In linearised supersonic flow over a thin two-dimensional surface whose local inclination to the free stream is $\theta$ (in radians, positive when the surface faces into the flow, i.e. compresses it), the pressure coefficient is
$$
C_p = \frac{2\theta}{\sqrt{M_\infty^2 - 1}} .
$$ {#eq-ackeret-cp}
Each surface is independent of the other, and the pressure at a point depends only on the local slope there.
:::

::: proof
The general solution of [[#eq-wave]] is $\phi' = f(x - \lambda y) + g(x + \lambda y)$, waves travelling along the two families of Mach lines $x \mp \lambda y = \text{const}$, inclined at the Mach angle ($\tan\mu = 1/\lambda$). Above a body ($y > 0$) disturbances can only travel downstream and outwards, so only the family $x - \lambda y = \text{const}$ appears: $\phi' = f(x - \lambda y)$. Then $u' = f'$ and $v' = -\lambda f'$, so $u' = -v'/\lambda$. The linearised boundary condition on the upper surface $y_u(x)$ is $v' = V_\infty\,dy_u/dx$, so $u' = -(V_\infty/\lambda)\,dy_u/dx$ and $C_p = -2u'/V_\infty = (2/\lambda)\,dy_u/dx$. For the upper surface a positive slope $dy_u/dx$ faces the oncoming flow, so $\theta = dy_u/dx$. Below the body $\phi' = g(x + \lambda y)$, $u' = +v'/\lambda$, and with $v' = V_\infty\,dy_l/dx$ we get $C_p = -(2/\lambda)\,dy_l/dx$; on the lower surface a *negative* slope faces the flow, so again $\theta = -dy_l/dx$ and $C_p = 2\theta/\lambda$. Assumptions: those of the linearised equation (thin body, small $\theta$, $M_\infty$ not near 1 or hypersonic); waves reflected from other surfaces or interacting with each other are ignored. This is the small-angle limit of the oblique-shock and Prandtl–Meyer results (see the weak-shock exercise in [[aerodynamics/oblique-shocks]]).
:::

## Ackeret's thin-airfoil theory

Describe a thin airfoil of chord $c$ at angle of attack $\alpha$ by a camber line $h_c(x)$ and a half-thickness distribution $h_t(x)$, both measured from the chord line, so that the surfaces relative to the free-stream direction are
$$
y_u = h_c + h_t - \alpha x, \qquad y_l = h_c - h_t - \alpha x .
$$
Write $\langle f\rangle = \tfrac1c\int_0^c f\,dx$ for a chordwise average.

::: theorem Ackeret's linearised supersonic airfoil theory {#thm-ackeret}
For a thin airfoil in a supersonic stream, to first order in the slopes,
$$
c_l = \frac{4\alpha}{\sqrt{M_\infty^2 - 1}}, \qquad
c_d = \frac{4}{\sqrt{M_\infty^2 - 1}}\left[\alpha^2 + \left\langle\left(\frac{dh_c}{dx}\right)^2\right\rangle + \left\langle\left(\frac{dh_t}{dx}\right)^2\right\rangle\right].
$$ {#eq-ackeret}
The lift depends on the angle of attack only (not on camber or thickness); the wave drag is the sum of three non-negative parts, due to lift, camber and thickness. For a flat plate the load is uniform along the chord, so the centre of pressure and the aerodynamic centre are at **mid-chord**.
:::

::: proof
By [[#prop-ackeret-cp]], $C_{p,u} = (2/\lambda)\,dy_u/dx$ and $C_{p,l} = -(2/\lambda)\,dy_l/dx$. *Lift.* To first order the lift is the integral of the pressure difference along the chord:
$$
c_l = \frac1c\int_0^c\left(C_{p,l} - C_{p,u}\right)dx = -\frac{2}{\lambda c}\int_0^c\left(\frac{dy_l}{dx} + \frac{dy_u}{dx}\right)dx = -\frac{2}{\lambda c}\int_0^c\left(2\frac{dh_c}{dx} - 2\alpha\right)dx = \frac{4\alpha}{\lambda},
$$
since $h_c = 0$ at both ends of the chord. *Drag.* The pressure on a surface element of slope $dy/dx$ (relative to the stream) has a streamwise component: on the upper surface $(p_u - p_\infty)\,dy_u/dx\,dx$ and on the lower $-(p_l - p_\infty)\,dy_l/dx\,dx$ (cf. the axial-force integral of [[aerodynamics/aerodynamic-forces]], here in wind axes). Hence
$$
c_d = \frac1c\int_0^c\left(C_{p,u}\frac{dy_u}{dx} - C_{p,l}\frac{dy_l}{dx}\right)dx = \frac{2}{\lambda}\left\langle\left(\frac{dy_u}{dx}\right)^2 + \left(\frac{dy_l}{dx}\right)^2\right\rangle .
$$
With $dy_{u,l}/dx = h_c' \pm h_t' - \alpha$, the sum of squares is $2(h_c' - \alpha)^2 + 2h_t'^2$, and $\langle h_c'\rangle = 0$ removes the cross term in $\alpha$, giving [[#eq-ackeret]]. *Moment.* For a flat plate $C_{p,l} - C_{p,u} = 4\alpha/\lambda$ is uniform, so the resultant acts at mid-chord for all $\alpha$; camber adds a lift-independent moment, so mid-chord is the aerodynamic centre. Assumptions: those of [[#prop-ackeret-cp]]; skin friction is not included.
:::

The thickness term depends on the shape. For a **diamond** (double wedge) of thickness ratio $t/c$, $|h_t'| = t/c$ everywhere, so $\langle h_t'^2\rangle = (t/c)^2$ and $c_{d,t} = 4(t/c)^2/\lambda$; for a **biconvex** section made of two parabolic arcs, $h_t = 2t\,\tfrac xc\left(1 - \tfrac xc\right)$, $\langle h_t'^2\rangle = \tfrac43(t/c)^2$, and $c_{d,t} = \tfrac{16}{3}(t/c)^2/\lambda$. For a given thickness, the diamond — with its slopes as small as possible everywhere — has the least wave drag; in practice the sharp ridge is structurally awkward, and biconvex or hexagonal sections are used.

Three conclusions follow, and they shape every supersonic aircraft. First, the lift-curve slope $4/\lambda$ falls with Mach number: $2.31$ per radian at $M = 2$, against $2\pi$ subsonically. Second, wave drag due to thickness grows as $(t/c)^2$, so supersonic sections are thin — 3 to 5 per cent rather than 10 to 15. Third, camber adds drag and no lift in two-dimensional linear theory, so supersonic sections are nearly symmetric (camber is still used on real three-dimensional wings to shape the span loading and to trim).

::: example A biconvex section at Mach 2.5 {#ex-biconvex}
A 5 per cent thick biconvex section flies at $M_\infty = 2.5$ and $\alpha = 3^\circ$. Using Ackeret's theory, find $c_l$, the wave-drag coefficient and its split, and the lift-to-drag ratio with and without a skin-friction drag coefficient of $0.005$.
::: solution
$\lambda = \sqrt{6.25 - 1} = 2.291$ and $\alpha = 0.05236\,\mathrm{rad}$. Then $c_l = 4(0.05236)/2.291 = 0.0914$. The wave drag due to lift is $4\alpha^2/\lambda = 0.00479$ and due to thickness $\tfrac{16}{3}(0.05)^2/2.291 = 0.00582$, total $0.0106$; so $L/D = 8.6$ inviscid, and $0.0914/0.0156 = 5.9$ with friction. *Sanity check:* lift-to-drag ratios of $5$–$8$ for isolated supersonic sections, against $50$–$100$ for subsonic ones, are why supersonic cruise is so expensive in fuel. The thickness drag, which does not depend on lift, is more than the lift-dependent wave drag at this incidence — making the section thinner pays twice, since it also allows a smaller optimum angle.
:::
:::

::: example Ackeret against shock–expansion theory {#ex-compare}
Compare the linear theory with the shock–expansion results of [[aerodynamics/oblique-shocks]] for (a) a flat plate at $\alpha = 5^\circ$, $M_\infty = 3$, and (b) a single surface inclined at $10^\circ$ into a Mach 2 stream.
::: solution
(a) Linear: $c_l = 4(0.0873)/\sqrt8 = 0.1234$, $c_d = 4(0.0873)^2/\sqrt8 = 0.0108$. Shock–expansion gave $0.1243$ and $0.0109$: agreement within 1 per cent.
(b) Linear: $C_p = 2(0.1745)/\sqrt3 = 0.2015$. The exact oblique-shock value is $C_p = \tfrac{2}{1.4 \times 4}(1.707 - 1) = 0.2523$: the linear theory is 20 per cent low. *Sanity check:* the error grows with the turning angle and with Mach number, because the shock pressure rise is nonlinear; on the expansion side the linear theory overestimates the suction slightly. For a flat plate the two errors partly cancel in the lift, which is why (a) agrees so well. The linear theory is reliable for slopes of a few degrees at moderate supersonic Mach numbers — exactly the conditions of a well-designed supersonic wing.
:::
:::

::: widget plot
f: 4*x/sqrt(M^2 - 1); 4*x^2/sqrt(M^2 - 1) + 16/3*t^2/sqrt(M^2 - 1); 2*sin(x)^2*cos(x)
x: 0, 0.35
y: 0, 0.5
sliders: M=2:1.2:5:0.05, t=0.05:0:0.1:0.005
labels: c_l\ \text{Ackeret}; c_d\ \text{Ackeret (biconvex,}\ t/c = t); c_l\ \text{Newtonian flat plate}
caption: Lift and wave drag of a thin biconvex section against angle of attack in radians (horizontal axis up to $20^\circ$), from Ackeret's theory [[#eq-ackeret]] with Mach number $M$ and thickness ratio $t$ on the sliders; for comparison, the hypersonic Newtonian lift of a flat plate [[#eq-newtonian-plate]], which does not depend on $M$. Raise $M$: the linear lift slope falls as $1/\sqrt{M^2 - 1}$, and by about $M = 5$ the curvature of the Newtonian curve (lift growing as $\alpha^2$ at small angles) shows how differently a hypersonic surface behaves. Raise $t$: the drag curve moves up rigidly by the thickness drag.
:::

## Supersonic wings: the Mach cone and sweep

On a three-dimensional wing a point influences only the region inside the **Mach cone** downstream of it (half-angle $\mu = \arcsin(1/M_\infty)$). Two kinds of leading edge result:

- a **supersonic leading edge** lies *ahead* of the Mach cone from the apex — the component of the free-stream Mach number normal to the edge, $M_\infty\cos\Lambda_{LE}$, exceeds $1$. Each section near the edge behaves like a two-dimensional supersonic airfoil, with an attached shock and Ackeret-type pressures; the edge must be sharp to avoid a detached bow shock and its drag.
- a **subsonic leading edge** lies *inside* the Mach cone — $M_\infty\cos\Lambda_{LE} < 1$. The flow near the edge "knows" about the wing ahead of time, as in subsonic flow, so the edge can be rounded, it can carry leading-edge suction, and the wave drag due to lift is lower. At $M_\infty = 2$ the Mach angle is $30^\circ$, so a leading edge swept more than $60^\circ$ is subsonic.

That is why slender delta and ogival wings with highly swept leading edges were chosen for supersonic transports: they keep the leading edges subsonic at cruise, distribute the lift over a long chord (reducing wave drag due to lift, which in three dimensions depends on the length over which lift is spread as well as on span), and give a large volume for fuel at small thickness ratio. At low speed the same wings generate lift partly through stable **leading-edge vortices** that form over the upper surface at moderate incidence, adding "vortex lift" — but at high angles of attack and high drag, which makes take-off and landing attitudes steep.

::: example Best lift-to-drag ratio of a supersonic section {#ex-ldmax}
For the section of example [[#ex-biconvex]] (5 per cent biconvex, $M_\infty = 2.5$, friction $c_{d,f} = 0.005$), find the angle of attack for maximum $L/D$ and its value.
::: solution
Write $c_d = c_{d,0} + 4\alpha^2/\lambda$ with $c_{d,0} = 0.005 + 0.00582 = 0.01082$. Then $L/D = (4\alpha/\lambda)/(c_{d,0} + 4\alpha^2/\lambda)$ is greatest when the two drag terms are equal, $4\alpha^2/\lambda = c_{d,0}$, i.e. $\alpha^* = \sqrt{c_{d,0}\lambda/4} = \sqrt{0.01082 \times 2.291/4} = 0.0787\,\mathrm{rad} = 4.5^\circ$, where
$$
\left(\frac LD\right)_{\max} = \frac{1}{\sqrt{\lambda\,c_{d,0}}} = \frac{1}{\sqrt{2.291 \times 0.01082}} = 6.35 .
$$
*Sanity check:* the same "equal drag terms" result as the subsonic parabolic polar of [[aerodynamics/finite-wings]]. Whole supersonic aircraft, with fuselage and finite-span effects, achieve $L/D$ of about $7$–$8$ at $M = 2$ using the three-dimensional advantages of sweep and slender planforms; a 2D section is a pessimistic guide.
:::
:::

::: warning Linear theory near Mach 1 and at hypersonic speeds
The factor $1/\sqrt{M_\infty^2 - 1}$ makes linear supersonic theory predict infinite lift slope and wave drag as $M_\infty \to 1$; in reality transonic flow is nonlinear and the coefficients peak at finite values just above $M = 1$. Do not use Ackeret below about $M_\infty = 1.2$–$1.3$. At the other end, linear theory assumes $M_\infty\theta \ll 1$; at $M_\infty = 10$ even a $5^\circ$ surface has $M_\infty\theta = 0.87$, and the linear pressures are badly wrong (example [[#ex-newton-wedge]]). The governing parameter at high Mach number is the **hypersonic similarity parameter** $K = M_\infty\theta$.
:::

## Hypersonic flow

There is no sharp boundary, but above about $M_\infty = 5$ several features, negligible at lower speeds, become important together:

- **Thin shock layers.** Oblique shock angles approach the deflection angle: at $M_\infty = 10$ a $15^\circ$ wedge has $\beta = 19.9^\circ$. The region between shock and body is thin and the shock interacts strongly with the boundary layer.
- **Entropy layer.** A blunt nose has a strong, curved bow shock; streamlines passing through its nearly normal part acquire a large entropy rise and form a hot, low-density layer that wets the body downstream.
- **Viscous interaction.** Boundary layers grow as $M_\infty^2/\sqrt{\mathrm{Re}}$ and can become thick enough to change the effective shape of the body and the pressure distribution on it.
- **High-temperature effects.** Kinetic energy converted to internal energy behind shocks and in boundary layers raises the temperature enough to excite molecular vibration (above about $800\,\mathrm{K}$), dissociate oxygen (from about $2000$–$2500\,\mathrm{K}$) and nitrogen (from about $4000\,\mathrm{K}$), and ionise the gas (above about $9000\,\mathrm{K}$). $\gamma$ is no longer constant; the gas is no longer calorically perfect.
- **Low density** at high altitude, where continuum assumptions begin to fail.

### Newtonian flow

As $M_\infty \to \infty$ with the shock lying on the surface, the flow approaching a surface element loses its normal momentum on hitting it and then slides along it. That is precisely Newton's (1687) model of fluid resistance — wrong for the low-speed flows he applied it to, but a useful limit at hypersonic speeds.

::: proposition Newtonian and modified Newtonian pressure {#prop-newtonian}
In Newtonian flow a surface inclined at angle $\theta$ to the free stream, facing the flow, has
$$
C_p = 2\sin^2\theta ,
$$ {#eq-newtonian}
and a surface facing away from the flow ("shadowed") has $C_p = 0$. Lees's **modified Newtonian** theory replaces the factor $2$ by the stagnation-point value,
$$
C_p = C_{p,\max}\sin^2\theta, \qquad C_{p,\max} = \frac{2}{\gamma M_\infty^2}\left(\frac{p_{02}}{p_\infty} - 1\right),
$$ {#eq-mod-newtonian}
where $p_{02}$ is the stagnation pressure behind a normal shock (the Rayleigh pitot formula). For $\gamma = 1.4$, $C_{p,\max} = 1.66$ at $M_\infty = 2$, $1.81$ at $5$, $1.83$ at $10$, and tends to $1.839$ as $M_\infty \to \infty$.
:::

::: proof
A stream tube of cross-section $A$ meeting a flat surface element inclined at $\theta$ to the free stream strikes an area $A/\sin\theta$ of it. The mass flow is $\rho_\infty V_\infty A$, and the momentum normal to the surface, $V_\infty\sin\theta$ per unit mass, is destroyed; the tangential momentum is kept. The rate of destruction of normal momentum, $\rho_\infty V_\infty A \cdot V_\infty\sin\theta$, is the normal force on the element; spread over the area $A/\sin\theta$ it gives a pressure rise $p - p_\infty = \rho_\infty V_\infty^2\sin^2\theta$ and $C_p = 2\sin^2\theta$. A shadowed surface receives no particles, so $p = p_\infty$, $C_p = 0$ (strictly $p \to 0$ at very high Mach number, giving $C_p = -2/(\gamma M_\infty^2)$, small). At a stagnation point, $\theta = 90^\circ$ gives $C_p = 2$; but the true stagnation pressure behind a normal shock is $p_{02}$, so Lees scaled the formula to match it, giving [[#eq-mod-newtonian]]. The Rayleigh pitot formula, $p_{02}/p_\infty = \left[\tfrac{(\gamma + 1)^2M_\infty^2}{4\gamma M_\infty^2 - 2(\gamma - 1)}\right]^{\gamma/(\gamma - 1)}\tfrac{1 - \gamma + 2\gamma M_\infty^2}{\gamma + 1}$, gives the values quoted; as $M_\infty \to \infty$, $C_{p,\max} \to \left[\tfrac{(\gamma + 1)^2}{4\gamma}\right]^{\gamma/(\gamma - 1)}\tfrac{4}{\gamma + 1} = 1.839$. Assumptions: the shock lies on the body (strictly, $M_\infty \to \infty$ and $\gamma \to 1$), the particles do not interact, and centrifugal effects on curved surfaces are ignored.
:::

For a flat plate at angle of attack $\alpha$ only the lower surface is wetted, so $c_n = 2\sin^2\alpha$ and
$$
c_l = 2\sin^2\alpha\cos\alpha, \qquad c_d = 2\sin^3\alpha, \qquad \frac LD = \cot\alpha .
$$ {#eq-newtonian-plate}
The lift grows as $\alpha^2$ at small angles — very different from the linear supersonic and subsonic theories — and it is largest at $\alpha = 54.7^\circ$.

Modified Newtonian theory works well for blunt bodies, cones and the windward sides of re-entry vehicles at high Mach number, where it is the basis of quick estimates of pressure and of the aerodynamic coefficients of capsules. It is less accurate for two-dimensional wedges, where the shock stands well off the surface even at high Mach number. A related result, **Mach-number independence** (Oswatitsch, 1951), says that at high enough Mach number the pressure *coefficients* and the shock shape around a given body stop changing with $M_\infty$ — visible in the values of $C_{p,\max}$ above.

::: example A wedge at Mach 10: three theories {#ex-newton-wedge}
A $15^\circ$ wedge surface faces a Mach $10$ stream ($\gamma = 1.4$). Compare $C_p$ from exact oblique-shock theory, Newtonian theory, modified Newtonian theory and Ackeret's linear theory. Then find $c_l$ and $c_d$ of a flat plate at $15^\circ$ by Newtonian and by shock–expansion theory.
::: solution
*Exact:* the weak oblique shock has $\beta = 19.9^\circ$, $M_{n1} = 3.41$, $p_2/p_\infty = 13.40$, so $C_p = \tfrac{2}{1.4 \times 100}(12.40) = 0.177$.
*Newtonian:* $2\sin^215^\circ = 0.134$. *Modified Newtonian:* $1.832\sin^215^\circ = 0.123$. *Ackeret:* $2(0.2618)/\sqrt{99} = 0.0526$.
For the plate, shock–expansion theory gives $C_{p,l} = 0.177$, $C_{p,u} = -0.014$ (the upper surface is close to vacuum, $-2/(\gamma M_\infty^2) = -0.0143$), so $c_l = 0.185$ and $c_d = 0.050$; Newtonian theory gives $c_l = 2\sin^215^\circ\cos15^\circ = 0.129$ and $c_d = 2\sin^315^\circ = 0.035$.
*Sanity check:* the linear theory is useless here ($M_\infty\theta = 2.6$); the Newtonian theories capture the order of magnitude but are 25–30 per cent low for this two-dimensional wedge, whose shock is far from the surface ($19.9^\circ$ against $15^\circ$). For blunt bodies and for the windward surfaces of slender three-dimensional bodies, modified Newtonian theory is considerably better. The shadowed upper surface contributes little at Mach 10: hypersonic lift comes almost entirely from the lower surface.
:::
:::

::: quiz
According to Newtonian theory, what is the lift-to-drag ratio of a flat plate at $10^\circ$ angle of attack in hypersonic flow, and what limits it in reality?
- [x] $\cot10^\circ = 5.7$; skin friction lowers it
- [ ] $\tan10^\circ = 0.18$; the shock raises it
- [ ] $2\pi$; viscosity lowers it
- [ ] Infinite, since the upper surface is in vacuum
::: solution
The pressure force on a flat plate acts normal to it, so $L/D = \cot\alpha = 5.67$ at $10^\circ$. Friction, which acts along the plate, adds drag and no lift, and at hypersonic speed it is relatively large because the lift coefficients are small; practical hypersonic vehicles have $L/D$ of about $1$–$4$ (re-entry vehicles at the low end, waveriders and lifting bodies at the high end).
:::
:::

### High temperatures and heating

The stagnation temperature of a perfect gas is $T_0 = T_\infty\left(1 + \tfrac{\gamma - 1}{2}M_\infty^2\right)$. At $M_\infty = 7$ in the stratosphere ($T_\infty = 226.5\,\mathrm{K}$ at $30\,\mathrm{km}$) this gives $T_0 = 2450\,\mathrm{K}$ — already enough to begin dissociating oxygen. For re-entry from low Earth orbit at $7.5\,\mathrm{km/s}$ the stagnation enthalpy is $\tfrac12V_\infty^2 = 28\,\mathrm{MJ/kg}$; a calorically perfect gas would reach about $28\,000\,\mathrm{K}$, but in reality most of the energy goes into dissociating (and partly ionising) the air, and the shock-layer temperature is roughly $6000$–$10\,000\,\mathrm{K}$. The perfect-gas relations of [[aerodynamics/oblique-shocks]] then fail: density ratios across strong shocks exceed the perfect-gas limit $(\gamma + 1)/(\gamma - 1) = 6$, shock layers become thinner, and surface catalysis and radiation join convection as heat-transfer mechanisms.

The decisive design insight came from H. Julian Allen and Alfred Eggers at NACA Ames (1953): to survive entry heating, a vehicle should be **blunt**, not sharp. A blunt body creates a strong, detached bow shock that converts much of the kinetic energy into heat in the gas *away from* the surface, most of which is carried off in the flow, while the convective heating at the stagnation point falls as the nose radius grows. A widely used engineering correlation for the convective stagnation-point heat flux, due to Sutton and Graves (NASA TR R-376, 1971), is
$$
\dot q_s \approx k\sqrt{\frac{\rho_\infty}{R_n}}\,V_\infty^3, \qquad k \approx 1.74\times10^{-4}\ \text{(SI units, Earth air)},
$$ {#eq-sutton-graves}
with $\dot q_s$ in $\mathrm{W/m^2}$, $\rho_\infty$ in $\mathrm{kg/m^3}$, the nose radius $R_n$ in metres and $V_\infty$ in $\mathrm{m/s}$; it applies to a cold, fully catalytic wall in chemical equilibrium and is accurate to perhaps 10–20 per cent within its range. The $1/\sqrt{R_n}$ dependence is the quantitative form of Allen and Eggers's argument.

::: example Stagnation heating of a capsule {#ex-heating}
A re-entry capsule with a nose (heat-shield) radius of $1\,\mathrm{m}$ passes through $60\,\mathrm{km}$ altitude ($\rho_\infty \approx 3.1\times10^{-4}\,\mathrm{kg/m^3}$) at $7.0\,\mathrm{km/s}$. Estimate the convective stagnation-point heat flux, and the flux for a sharp nose of radius $0.1\,\mathrm{m}$ under the same conditions.
::: solution
By [[#eq-sutton-graves]], $\dot q_s = 1.74\times10^{-4}\sqrt{3.1\times10^{-4}/1}\,(7000)^3 = 1.74\times10^{-4} \times 0.01761 \times 3.43\times10^{11} = 1.05\times10^6\,\mathrm{W/m^2}$, about $1.1\,\mathrm{MW/m^2}$. With $R_n = 0.1\,\mathrm{m}$ the flux is larger by $\sqrt{10} = 3.16$: $3.3\,\mathrm{MW/m^2}$. *Sanity check:* peak convective heat fluxes of order $1\,\mathrm{MW/m^2}$ are typical of orbital-entry capsules, and they are why capsule heat shields are broad and gently curved and use ablative or high-temperature reusable materials. The heating rate depends on $V^3$, so it peaks earlier in the trajectory than the deceleration does.
:::
:::

::: application Supersonic and hypersonic civil flight
Two supersonic transports entered airline service: the Tupolev Tu-144 and the Anglo-French Concorde (first flight 2 March 1969; scheduled service 1976–2003), which cruised at about $M = 2.0$ on a slender ogival delta wing with subsonic leading edges, variable intakes of the kind analysed in [[aerodynamics/oblique-shocks]], and kinetic heating that limited its structure to aluminium alloy and its cruise Mach number to about $2$. The X-15 research aircraft reached $M = 6.7$ in 1967 and explored hypersonic heating, control and pilot interfaces. Current civil interest centres on quieter supersonic designs, in which the airframe is shaped to weaken the sonic boom heard on the ground, and on re-entry vehicles for crew and cargo — which apply exactly the blunt-body principles above.
:::

::: history
Jakob **Ackeret** published the linearised theory of thin supersonic airfoils in 1925 ("Luftkräfte auf Flügel, die mit größerer als Schallgeschwindigkeit bewegt werden", *Zeitschrift für Flugtechnik und Motorluftschiffahrt*). Adolf **Busemann** carried the theory to second order and proposed swept wings for supersonic flight at the 1935 Volta Conference in Rome. Captain Charles **Yeager** flew the Bell X-1 faster than sound on 14 October 1947. H. Julian **Allen** and Alfred **Eggers** of NACA Ames showed in 1953 (NACA RM A53D28, later Report 1381) that blunt shapes greatly reduce entry heating, the principle behind every crewed re-entry capsule. Lester **Lees** introduced the modified Newtonian pressure law in 1955. Newton's sine-squared law itself appears in the *Principia* (1687).
:::

## Summary

::: summary
- Linear supersonic theory: $C_p = 2\theta/\sqrt{M_\infty^2 - 1}$ on each surface independently.
- Ackeret: $c_l = 4\alpha/\lambda$ and $c_d = (4/\lambda)\left[\alpha^2 + \langle h_c'^2\rangle + \langle h_t'^2\rangle\right]$; aerodynamic centre at mid-chord. Thickness drag $4(t/c)^2/\lambda$ (diamond), $\tfrac{16}{3}(t/c)^2/\lambda$ (biconvex). Supersonic sections are thin and nearly symmetric.
- Linear theory is accurate to a few per cent for small slopes at moderate $M$; it fails near $M = 1$ and when $M_\infty\theta$ is not small.
- Leading edges inside the Mach cone ($M_\infty\cos\Lambda_{LE} < 1$) are subsonic and can be rounded; slender deltas exploit this.
- Hypersonic flow: thin shock layers, entropy layers, viscous interaction, real-gas effects. Newtonian $C_p = 2\sin^2\theta$; modified Newtonian $C_{p,\max}\sin^2\theta$ with $C_{p,\max} \to 1.839$.
- Stagnation temperature and heating rise steeply with speed; blunt bodies (Allen and Eggers) and $\dot q_s \propto \sqrt{\rho_\infty/R_n}V_\infty^3$ guide heat-shield design.
:::

## Exercises

::: exercise Supersonic lift coefficient {level=1 check="0.0806"}
Find the lift coefficient of a thin flat plate at $\alpha = 2^\circ$ in a Mach $2$ stream by linear theory. (Enter $c_l$.)
::: solution
$c_l = 4\alpha/\sqrt{M^2 - 1} = 4(0.03491)/\sqrt3 = 0.0806$.
:::
:::

::: exercise Thickness wave drag {level=1 check="0.00226"}
A diamond section with $t/c = 0.04$ flies at zero incidence at $M_\infty = 3$. Find its wave-drag coefficient by linear theory. (Enter $c_d$.)
::: solution
$c_d = 4(t/c)^2/\sqrt{M^2 - 1} = 4(0.0016)/\sqrt8 = 0.00226$.
:::
:::

::: exercise Newtonian pressure {level=1 check="0.5"}
What pressure coefficient does Newtonian theory give on a surface inclined at $30^\circ$ to a hypersonic stream? (Enter $C_p$.)
::: solution
$C_p = 2\sin^230^\circ = 2 \times 0.25 = 0.5$.
:::
:::

::: exercise Incidence for a given lift {level=2 check="1.79"}
A supersonic aircraft flies at $M_\infty = 1.6$. What angle of attack does a thin wing section need for $c_l = 0.1$, according to linear theory? (Enter $\alpha$ in degrees.)
::: solution
$\alpha = c_l\sqrt{M^2 - 1}/4 = 0.1 \times 1.249/4 = 0.0312\,\mathrm{rad} = 1.79^\circ$.
:::
:::

::: exercise Sonic leading edge {level=2 check="60"}
At $M_\infty = 2$, what leading-edge sweep angle makes the leading edge sonic (neither subsonic nor supersonic)? (Enter $\Lambda_{LE}$ in degrees.)
::: solution
The edge is sonic when $M_\infty\cos\Lambda_{LE} = 1$, i.e. $\cos\Lambda_{LE} = 0.5$, $\Lambda_{LE} = 60^\circ$ — equivalently, when the edge lies along the Mach cone, whose half-angle is $\mu = 30^\circ$ from the flight direction. More sweep gives a subsonic leading edge.
:::
:::

::: exercise Stagnation temperature {level=2 check="1320"}
Find the perfect-gas stagnation temperature for flight at $M_\infty = 5$ in air at $220\,\mathrm{K}$. Is the perfect-gas assumption reasonable? (Enter $T_0$ in K.)
::: solution
$T_0 = 220(1 + 0.2 \times 25) = 1320\,\mathrm{K}$. Vibrational excitation is significant at this temperature (so $c_p$ and $\gamma$ change by a few per cent), but dissociation is not yet important: the perfect-gas value is a fair first estimate, a little too high.
:::
:::

::: exercise Deriving the thickness drag of a biconvex section {level=3}
For a symmetric biconvex section made of two parabolic arcs, with half-thickness $h_t = 2t\,\tfrac xc\left(1 - \tfrac xc\right)$, show that $\langle(dh_t/dx)^2\rangle = \tfrac43(t/c)^2$ and hence that $c_{d,t} = \tfrac{16}{3}(t/c)^2/\sqrt{M_\infty^2 - 1}$. Show also that, among all thickness distributions with the same maximum thickness at mid-chord and zero thickness at the ends, the diamond has the least linear-theory wave drag.
::: solution
$dh_t/dx = (2t/c)(1 - 2x/c)$, so with $\xi = x/c$, $\langle(dh_t/dx)^2\rangle = 4(t/c)^2\int_0^1(1 - 2\xi)^2\,d\xi = 4(t/c)^2 \cdot \tfrac13$, and [[#eq-ackeret]] gives $\tfrac{16}{3}(t/c)^2/\lambda$. For the minimum: on the front half, $\int_0^{c/2}h_t'\,dx = t/2$ is fixed. By the Cauchy–Schwarz inequality, $\left(\int_0^{c/2}h_t'\,dx\right)^2 \le \tfrac c2\int_0^{c/2}h_t'^2\,dx$, so $\int_0^{c/2}h_t'^2\,dx \ge t^2/(2c)$, with equality only when $h_t'$ is constant; the same holds for the rear half. Hence $\langle h_t'^2\rangle \ge (t/c)^2$, attained by the diamond (constant slopes $\pm t/c$). The biconvex section has $\tfrac43$ times that.
:::
:::

::: exercise Sizing a heat shield by nose radius {level=3 check="1.73"}
A cargo-return capsule must keep its peak convective stagnation-point heat flux below $0.8\,\mathrm{MW/m^2}$ for a trajectory whose worst point is $V_\infty = 7.0\,\mathrm{km/s}$ at $\rho_\infty = 3.1\times10^{-4}\,\mathrm{kg/m^3}$. Using the Sutton–Graves correlation, what is the minimum nose radius? Discuss what else a heat-shield designer must consider (total heat load, radiative heating, deceleration, stability, packaging). (Enter $R_n$ in metres.)
::: solution
From [[#eq-sutton-graves]], $R_n = \rho_\infty\left(kV_\infty^3/\dot q_s\right)^2 = 3.1\times10^{-4}\left(1.74\times10^{-4} \times 3.43\times10^{11}/8\times10^5\right)^2 = 3.1\times10^{-4} \times (74.6)^2 = 1.73\,\mathrm{m}$ (and, given the correlation's 10–20 per cent uncertainty, a designer would add margin). A larger, blunter shield also raises the drag and lowers the ballistic coefficient $m/(C_DA)$, so the capsule decelerates higher in the atmosphere where the density is lower — reducing the peak heat flux further but lengthening the heating pulse. Other considerations: the *integrated* heat load (which sets ablator thickness), radiative heating from the shock layer at higher entry speeds, peak deceleration (crew or cargo limits), aerodynamic stability (centre of mass forward of the centre of pressure; an offset centre of mass gives the trim angle and the lift used to steer the entry), launch-vehicle fairing size, and margins for uncertainty in the correlation, which are large. Real designs are checked with computational simulation and arc-jet tests.
:::
:::
