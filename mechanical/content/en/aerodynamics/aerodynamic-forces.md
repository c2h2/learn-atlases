A wing, a car body, a wind-turbine blade and a cooling-tower shell all feel the same two things from the air flowing past them: a **pressure** pushing normal to every element of the surface, and a **shear stress** dragging tangentially along it. Nothing else. Every aerodynamic force and moment — the lift that holds up a $500\,\mathrm{t}$ airliner, the drag that sets its fuel burn, the pitching moment its tailplane must balance — is the integral of those two distributions over the body. This chapter sets up the bookkeeping that the rest of the course depends on: how the integrated force is split into lift and drag, how forces and moments are made dimensionless as coefficients, where the resultant acts (the centre of pressure, and the more useful aerodynamic centre), and which dimensionless groups a coefficient can depend on — which is also the theory of the wind tunnel.

The prerequisites are the control-volume and Bernoulli material of [[fluid-mechanics/bernoulli]], dimensional analysis from [[fluid-mechanics/dimensional-analysis]] and the boundary-layer and drag ideas of [[fluid-mechanics/boundary-layers-drag]].

## Pressure and shear: the only two sources

Picture a two-dimensional airfoil section, of chord $c$, in a uniform stream of speed $V_\infty$, density $\rho_\infty$ and pressure $p_\infty$ far upstream. The **angle of attack** $\alpha$ is the angle between the chord line (leading edge to trailing edge) and the direction of $V_\infty$. On the upper surface the air accelerates and the pressure falls below $p_\infty$; on most of the lower surface it is near or above $p_\infty$. That pressure difference, summed over the chord, is overwhelmingly where the lift comes from. The shear stress $\tau_w$ of the thin boundary layer is small in comparison — typically a few pascals where the pressure differences are a few kilopascals — but it acts along the surface, nearly parallel to the stream, and so it is a major part of the drag.

Two reference frames are used to resolve the resultant force $\mathbf{R}$:

::: definition Lift, drag, normal and axial force {#def-lift-drag}
For a body in a stream of velocity $V_\infty$, the resultant aerodynamic force $\mathbf{R}$ is resolved either

- **relative to the free stream**: the **drag** $D$ is the component parallel to $V_\infty$ (positive downstream) and the **lift** $L$ the component perpendicular to $V_\infty$ (positive "up", in the plane of symmetry); or
- **relative to the body**: the **axial force** $A$ is the component along the chord (positive towards the trailing edge) and the **normal force** $N$ the component perpendicular to the chord.

For a two-dimensional section the forces are per unit span and are written with a prime: $L'$, $D'$, $N'$, $A'$ in $\mathrm{N/m}$. With the angle of attack $\alpha$ between chord and free stream, the two resolutions are related by a rotation through $\alpha$:
$$
L = N\cos\alpha - A\sin\alpha, \qquad D = N\sin\alpha + A\cos\alpha.
$$ {#eq-rotate}
:::

The rotation is worth drawing once. Put the chord along the $x$-axis and the free stream at angle $\alpha$ below it, approaching from the left. $N$ points along $+y$ (perpendicular to the chord), $A$ along $+x$. The lift direction is $N$'s direction rotated back by $\alpha$, the drag direction is $A$'s direction rotated by $\alpha$; projecting each of $N$ and $A$ onto the new axes gives [[#eq-rotate]]. Note the *minus* sign in the lift: a positive axial force (pointing aft along a chord inclined nose-up) has a component *against* the lift direction.

::: proposition Forces from the surface distributions {#prop-surface-integrals}
Let a two-dimensional section have upper and lower surfaces $y_u(x)$, $y_l(x)$ for $0 \le x \le c$, with surface pressures $p_u$, $p_l$ and wall shear stresses $\tau_u$, $\tau_l$ (each positive when it drags the surface downstream, towards the trailing edge). Then per unit span
$$
\begin{aligned}
N' &= \int_0^c \left(p_l - p_u\right)dx + \int_0^c\left(\tau_u\,\frac{dy_u}{dx} + \tau_l\,\frac{dy_l}{dx}\right)dx, \\
A' &= \int_0^c \left(p_u\,\frac{dy_u}{dx} - p_l\,\frac{dy_l}{dx}\right)dx + \int_0^c \left(\tau_u + \tau_l\right)dx,
\end{aligned}
$$ {#eq-NA}
and the pitching moment about the leading edge, positive **nose-up**, is
$$
M'_{LE} = \int_0^c \left(p_u - p_l\right)x\,dx + (\text{small terms in } \tau \text{ and in } y\,dp),
$$ {#eq-mle}
where the small terms vanish for a thin section with negligible shear.
:::

::: proof
Take an element of the upper surface of length $ds$, inclined at angle $\theta$ to the chord, so that $dx = ds\cos\theta$ and $dy_u = ds\sin\theta$. The pressure acts *into* the surface, along the inward normal, which on the upper surface points down and slightly forward: its components are $(+\sin\theta, -\cos\theta)\,p_u\,ds$ in $(x, y)$, i.e. a normal-force contribution $-p_u\,dx$ and an axial contribution $+p_u\,dy_u$. The shear acts along the surface towards the trailing edge, $(\cos\theta, \sin\theta)\,\tau_u\,ds$: normal contribution $\tau_u\,dy_u$, axial contribution $\tau_u\,dx$. On the lower surface the inward normal points up, so the pressure gives $+p_l\,dx$ to $N'$ and $-p_l\,dy_l$ to $A'$, while the shear again gives $\tau_l\,dy_l$ and $\tau_l\,dx$. Adding the four contributions and integrating from leading to trailing edge gives [[#eq-NA]].

For the moment, a normal-force element $dN' = (p_l - p_u)\,dx$ acting at distance $x$ aft of the leading edge produces a moment $-x\,dN'$ about the leading edge with the nose-up-positive convention (an upward force aft of the nose pitches it *down*). Integrating gives $M'_{LE} = -\int_0^c (p_l - p_u)\,x\,dx$, which is [[#eq-mle]]; the axial-force elements act with moment arms $y$, and for a thin section these arms are small.

A constant pressure added everywhere contributes $\oint p_\infty\,\mathbf{n}\,ds = \mathbf{0}$ round a closed contour, so $p$ may be replaced by the gauge value $p - p_\infty$ throughout without changing any result. Assumptions: steady flow, a closed two-dimensional contour, and the sign conventions above.
:::

The proposition says something about the *physics* as well as the arithmetic. Lift is (almost entirely) the chordwise integral of the pressure *difference* between the surfaces. Drag has a pressure part — the axial component of pressure on surfaces inclined to the chord, plus the $N\sin\alpha$ tilt — and a friction part. Neither part can be wished away: a perfectly streamlined body in a real fluid still has skin-friction drag, and a flat plate normal to the flow has almost nothing *but* pressure drag.

## Dimensionless coefficients

Forces on similar bodies grow with the size of the body and with the **dynamic pressure** of the stream,
$$
q_\infty = \tfrac{1}{2}\rho_\infty V_\infty^2,
$$
which is the pressure rise that would be obtained by bringing the free stream to rest isentropically in incompressible flow — the natural pressure scale of the problem. Dividing by $q_\infty$ times a reference area (or length) removes both.

::: definition Force, moment and pressure coefficients {#def-coefficients}
For a three-dimensional body with reference area $S$ (for a wing, its planform area) and reference length $\ell$ (for a wing, the mean aerodynamic chord $\bar c$):
$$
C_L = \frac{L}{q_\infty S}, \qquad C_D = \frac{D}{q_\infty S}, \qquad C_M = \frac{M}{q_\infty S \ell}.
$$
For a two-dimensional section, per unit span, with the chord $c$ as both reference length and (times unit span) reference area, the **section coefficients** are written in lower case:
$$
c_l = \frac{L'}{q_\infty c}, \qquad c_d = \frac{D'}{q_\infty c}, \qquad c_m = \frac{M'}{q_\infty c^2},
$$
and likewise $c_n$, $c_a$ for the normal and axial forces. The **pressure coefficient** and **skin-friction coefficient** at a surface point are
$$
C_p = \frac{p - p_\infty}{q_\infty}, \qquad c_f = \frac{\tau_w}{q_\infty}.
$$
:::

The reference area is a *convention*, not a physical area that the force acts on. Wings use the planform area including the part buried in the fuselage; airships use (volume)$^{2/3}$; cars and cyclists use the frontal area. A drag coefficient is meaningless without its reference area, and two coefficients can be compared only if they share one.

::: proposition Pressure coefficient in incompressible flow {#prop-cp-bernoulli}
In steady, incompressible flow that is irrotational (or along a streamline from the free stream), the pressure coefficient at a point where the local speed is $V$ is
$$
C_p = 1 - \left(\frac{V}{V_\infty}\right)^2.
$$ {#eq-cp-incomp}
Hence $C_p = 1$ at a stagnation point, $C_p = 0$ wherever $V = V_\infty$, and $C_p < 0$ wherever the flow is faster than the free stream; there is no lower bound in principle.
:::

::: proof
Bernoulli's equation between the free stream and the point, with constant density and negligible gravity differences, gives $p + \tfrac{1}{2}\rho_\infty V^2 = p_\infty + \tfrac{1}{2}\rho_\infty V_\infty^2$. Hence $p - p_\infty = \tfrac{1}{2}\rho_\infty\left(V_\infty^2 - V^2\right)$ and dividing by $q_\infty$ gives [[#eq-cp-incomp]]. At a stagnation point $V = 0$, so $C_p = 1$. Assumptions: steady, inviscid, incompressible flow along a streamline from the free stream (or irrotational flow everywhere, so that the Bernoulli constant is the same on all streamlines).
:::

With $p - p_\infty = q_\infty C_p$ and $x$ measured in chords ($\xi = x/c$), [[#eq-NA]] and [[#eq-mle]] become, for a thin section with friction neglected in the normal force,
$$
c_n = \int_0^1 \left(C_{p,l} - C_{p,u}\right)d\xi, \qquad
c_{m,LE} = -\int_0^1 \left(C_{p,l} - C_{p,u}\right)\xi\,d\xi.
$$ {#eq-cn-cm}
A measured pressure distribution — from a row of pressure taps in a wind-tunnel model, or from a panel code — is turned into forces exactly this way. The plot of $-C_p$ against $\xi$ for both surfaces is the standard picture: the area enclosed between the two curves is $c_n$.

::: example A light aircraft in cruise {#ex-cessna}
A light aircraft of mass $1100\,\mathrm{kg}$ and wing area $S = 16.2\,\mathrm{m^2}$ cruises level at $V_\infty = 55\,\mathrm{m/s}$ at sea level ($\rho_\infty = 1.225\,\mathrm{kg/m^3}$, ISA). Find the lift coefficient. If $C_{L,\max} = 1.6$, what is the stall speed at this weight?
::: solution
In steady level flight the lift equals the weight (the tailplane load and thrust inclination are neglected): $L = mg = 1100 \times 9.81 = 10\,791\,\mathrm{N}$. The dynamic pressure is
$$
q_\infty = \tfrac{1}{2}\rho_\infty V_\infty^2 = \tfrac{1}{2}(1.225)(55)^2 = 1853\,\mathrm{Pa},
$$
so
$$
C_L = \frac{L}{q_\infty S} = \frac{10\,791}{1853 \times 16.2} = 0.360.
$$
At stall $L = W$ with $C_L = C_{L,\max}$, so
$$
V_s = \sqrt{\frac{2W}{\rho_\infty S\,C_{L,\max}}} = \sqrt{\frac{2 \times 10\,791}{1.225 \times 16.2 \times 1.6}} = 26.1\,\mathrm{m/s}\ (50.7\ \text{knots}).
$$
*Sanity check:* cruise lift coefficients of $0.2$–$0.6$ and stall speeds of $45$–$55$ knots are typical of four-seat light aircraft, and the ratio of the speeds is $\sqrt{1.6/0.360} = 2.11 = 55/26.1$, as it must be at constant weight.
:::
:::

::: example From normal and axial force to lift and drag {#ex-rotate}
A wind-tunnel balance aligned with the chord of a two-dimensional model measures $N' = 1200\,\mathrm{N/m}$ and $A' = 40\,\mathrm{N/m}$ at $\alpha = 6^\circ$. Find $L'$, $D'$ and the lift-to-drag ratio.
::: solution
With $\cos 6^\circ = 0.99452$ and $\sin 6^\circ = 0.10453$, [[#eq-rotate]] gives
$$
\begin{aligned}
L' &= 1200(0.99452) - 40(0.10453) = 1193.4 - 4.2 = 1189\,\mathrm{N/m}, \\
D' &= 1200(0.10453) + 40(0.99452) = 125.4 + 39.8 = 165\,\mathrm{N/m},
\end{aligned}
$$
so $L'/D' = 7.2$. *Sanity check:* almost all of the drag here, $125\,\mathrm{N/m}$, is the tilt of the large normal force, not the axial force. That is why drag is so sensitive to small errors in the measured angle: an error of only $0.1^\circ$ in $\alpha$ shifts $D'$ by $1200 \times 0.00175 = 2.1\,\mathrm{N/m}$, more than one per cent. Balances are therefore calibrated for flow angularity before drag is quoted.
:::
:::

::: warning Lift is not "the force upwards", and drag is not "the axial force"
Lift and drag are defined relative to the **free-stream direction**, not to the chord and not to the ground. In a climb, lift is tilted back from the vertical; in a banked turn it is tilted sideways; and for a wind-turbine blade it points largely *along* the rotor plane, which is why it drives the rotor. Equally, an airfoil at high angle of attack can have a *negative* axial force (the leading-edge suction pulling the section forwards) while its drag is still positive — the tilt term $N\sin\alpha$ dominates. Always draw the free-stream direction first, and use [[#eq-rotate]] with $\alpha$ in the correct sense.
:::

## Where the force acts: centre of pressure and aerodynamic centre

A distributed load is equivalent to a single resultant force acting at some point, or to the same force at any *other* point together with a couple. Both descriptions are used in aerodynamics, and the second turns out to be the more useful.

::: definition Centre of pressure {#def-cp}
The **centre of pressure** of a section is the point on the chord about which the aerodynamic moment is zero, i.e. the line of action of the resultant force crosses the chord there. Its distance from the leading edge is
$$
x_{cp} = -\frac{M'_{LE}}{N'} \approx -\frac{M'_{LE}}{L'},
$$
the approximation holding at small angles of attack, where $N' \approx L'$.
:::

For a cambered section the centre of pressure moves with angle of attack, and as the lift goes to zero it runs off to infinity: a cambered section at zero lift still has a nose-down couple, and a pure couple has no line of action. The early aeronautical writers, who thought in terms of the centre of pressure, found this awkward. The cure is to choose a reference point about which the *moment* does not change.

::: proposition Moment transfer and the aerodynamic centre {#prop-ac}
Let $c_{m,x}$ be the section moment coefficient about a point a fraction $x/c$ of the chord behind the leading edge, nose-up positive, and suppose that over the linear part of the lift curve the quarter-chord moment coefficient varies linearly with lift:
$$
c_{m,c/4} = c_{m,0} + m_0\,c_l .
$$
Then at small angles of attack
$$
c_{m,x} = c_{m,c/4} + \left(\frac{x}{c} - \frac{1}{4}\right)c_l ,
$$ {#eq-transfer}
and there is a unique point, the **aerodynamic centre**, about which the moment coefficient is independent of $c_l$. It lies at
$$
\frac{x_{ac}}{c} = \frac{1}{4} - m_0 ,
$$ {#eq-xac}
and the moment coefficient about it equals the zero-lift moment coefficient, $c_{m,ac} = c_{m,0}$. The centre of pressure is related to it by
$$
\frac{x_{cp}}{c} = \frac{x_{ac}}{c} - \frac{c_{m,ac}}{c_l}.
$$ {#eq-xcp-xac}
:::

::: proof
At small angles the resultant is, to first order, the lift $L'$ acting perpendicular to the chord. The moment of a force about a point $P$ depends on $P$: moving the reference point aft by $\Delta x$ adds the moment of the lift acting a distance $\Delta x$ *ahead* of the new point, which is nose-up, $+L'\,\Delta x$. Hence $M'_x = M'_{c/4} + \left(x - c/4\right)L'$, and dividing by $q_\infty c^2$ gives [[#eq-transfer]]. Substituting the linear model, $c_{m,x} = c_{m,0} + \left(m_0 + x/c - 1/4\right)c_l$, which is independent of $c_l$ exactly when $x/c = 1/4 - m_0$, giving [[#eq-xac]]; the remaining constant is $c_{m,0}$, the value at zero lift. Finally the centre of pressure is the point where $c_{m,x} = 0$: $0 = c_{m,ac} + \left(x_{cp}/c - x_{ac}/c\right)c_l$, which rearranges to [[#eq-xcp-xac]]. Assumptions: small angles ($N' \approx L'$, axial-force moment arms negligible) and a linear $c_m$–$c_l$ relation.
:::

The aerodynamic centre is a property of the section shape — for thin airfoils in incompressible flow it lies at the quarter-chord ($m_0 = 0$, as [[aerodynamics/thin-airfoil-theory]] will prove), and for real sections at low speed it is within one or two per cent of chord of it. In supersonic flow it moves back to about mid-chord. Representing the aerodynamics as *lift at the aerodynamic centre plus a constant couple* $c_{m,ac}$ is what makes the longitudinal stability analysis of [[flight-mechanics/longitudinal-static-stability]] tractable.

::: widget plot
f: 0.25 - m/x
x: 0.05, 1.6
y: -0.5, 2
sliders: m=-0.05:-0.15:0.05:0.005
labels: x_{cp}/c\ \text{for}\ x_{ac}/c = 0.25
hlines: 0.25; 0; 1
caption: Centre of pressure against lift coefficient, $x_{cp}/c = 1/4 - c_{m,ac}/c_l$ from [[#eq-xcp-xac]] with the aerodynamic centre at the quarter-chord. Move the slider $m = c_{m,ac}$. For a typical positively cambered section ($c_{m,ac} \approx -0.05$) the centre of pressure lies **behind** the quarter-chord and runs aft — off the trailing edge (the line at 1) when $c_l < 0.067$ — as the lift falls. Set $m = 0$ (a symmetric section) and the centre of pressure stays fixed at the aerodynamic centre; make $m$ positive (reflexed camber) and it lies ahead. The moving centre of pressure is why designers quote $c_{m,ac}$ instead.
:::

::: example Pressure distribution to forces {#ex-cp-integrate}
On a thin section at $\alpha = 4^\circ$ the measured pressure difference is well fitted by $C_{p,l} - C_{p,u} = 1.6\,(1 - \xi)$, $\xi = x/c$, and the balance gives $c_a = 0.012$. Find $c_n$, $c_{m,LE}$, $c_{m,c/4}$, the centre of pressure, and $c_l$, $c_d$.
::: solution
From [[#eq-cn-cm]],
$$
c_n = \int_0^1 1.6\,(1 - \xi)\,d\xi = 0.800, \qquad
c_{m,LE} = -\int_0^1 1.6\,(1 - \xi)\,\xi\,d\xi = -1.6\left(\tfrac12 - \tfrac13\right) = -0.267 .
$$
The centre of pressure is at $x_{cp}/c = -c_{m,LE}/c_n = 0.267/0.800 = 0.333$, the centroid of the triangular load, as it must be. Transferring the moment to the quarter-chord, $c_{m,c/4} = c_{m,LE} + \tfrac14 c_n = -0.267 + 0.200 = -0.067$. Rotating through $\alpha = 4^\circ$,
$$
c_l = 0.800\cos 4^\circ - 0.012\sin 4^\circ = 0.797, \qquad
c_d = 0.800\sin 4^\circ + 0.012\cos 4^\circ = 0.068 .
$$
*Sanity check:* that drag coefficient is far too large for a real section at $c_l \approx 0.8$ (about $0.008$ is typical). The pressure distribution as given has no **leading-edge suction peak** — a real airfoil's upper-surface $C_p$ falls sharply to large negative values at the nose, and the forward-facing nose area turns that suction into a large *negative* axial force that cancels most of $N\sin\alpha$. The example shows why the leading-edge region must be resolved finely in any pressure-tap or panel calculation of drag: miss the suction peak and you get the drag of a flat plate in separated flow.
:::
:::

::: example Locating the aerodynamic centre from test data {#ex-ac}
Wind-tunnel tests of a section give, in the linear range, $c_{m,c/4} = -0.040$ at $c_l = 0.2$ and $c_{m,c/4} = -0.032$ at $c_l = 1.0$. Find the aerodynamic centre and $c_{m,ac}$.
::: solution
The slope is $m_0 = dc_{m,c/4}/dc_l = (-0.032 + 0.040)/(1.0 - 0.2) = 0.010$. By [[#eq-xac]],
$$
\frac{x_{ac}}{c} = 0.25 - 0.010 = 0.240 ,
$$
and by [[#eq-transfer]] at either data point, $c_{m,ac} = -0.040 + (0.240 - 0.250)(0.2) = -0.042$ (the other point gives $-0.032 - 0.010 = -0.042$ too). *Sanity check:* a moment that becomes *less* nose-down as lift rises means the lift is acting ahead of the quarter-chord, so the aerodynamic centre must lie ahead of $c/4$ — as found. A shift of one per cent of chord is typical of real sections at low speed.
:::
:::

::: quiz
A symmetric airfoil at a small positive angle of attack has its aerodynamic centre at the quarter-chord. Where is its centre of pressure?
- [ ] Ahead of the quarter-chord, moving forward as $\alpha$ increases
- [x] At the quarter-chord, for every small $\alpha$
- [ ] Behind the quarter-chord, moving aft as $\alpha$ decreases
- [ ] At mid-chord
::: solution
By symmetry a symmetric section has zero moment at zero lift, so $c_{m,ac} = 0$, and [[#eq-xcp-xac]] gives $x_{cp} = x_{ac}$ for every $c_l \neq 0$. The centre of pressure moves only for cambered sections ($c_{m,ac} \neq 0$).
:::
:::

## What a coefficient can depend on: similarity

Why are coefficients worth tabulating at all? Because, for geometrically similar bodies, the coefficients depend on only a handful of dimensionless numbers — and that is what makes it legitimate to test a model in a wind tunnel and fly the full-size aircraft.

::: theorem Dimensionless form of the aerodynamic force {#thm-similarity}
Suppose the lift $L$ on a body of given shape depends only on its size $\ell$, its attitude $\alpha$, and the free-stream speed $V_\infty$, density $\rho_\infty$, viscosity $\mu_\infty$ and speed of sound $a_\infty$. Then
$$
C_L = \frac{L}{q_\infty \ell^2} = f\!\left(\alpha,\ \mathrm{Re},\ M_\infty\right), \qquad
\mathrm{Re} = \frac{\rho_\infty V_\infty \ell}{\mu_\infty}, \qquad M_\infty = \frac{V_\infty}{a_\infty},
$$
and the same holds for $C_D$ and $C_M$. Two geometrically similar bodies at the same $\alpha$, $\mathrm{Re}$ and $M_\infty$ have the same coefficients (**dynamic similarity**).
:::

::: proof
This is the Buckingham $\Pi$ theorem of [[fluid-mechanics/dimensional-analysis]]. The relation $L = \phi(\ell, \alpha, V_\infty, \rho_\infty, \mu_\infty, a_\infty)$ involves seven quantities, one of them ($\alpha$) already dimensionless. The six dimensional ones involve the three base dimensions $\mathsf{M}$, $\mathsf{L}$, $\mathsf{T}$, and $\rho_\infty$, $V_\infty$, $\ell$ are dimensionally independent (no product of powers of them is dimensionless), so they serve as repeating variables. The remaining three dimensional quantities give one group each: $L/(\rho_\infty V_\infty^2 \ell^2)$, $\mu_\infty/(\rho_\infty V_\infty \ell) = 1/\mathrm{Re}$ and $a_\infty/V_\infty = 1/M_\infty$. The theorem then says that the dimensionless groups are related by a function of the others, $L/(\rho_\infty V_\infty^2\ell^2) = g(\alpha, \mathrm{Re}, M_\infty)$; absorbing the factor $\tfrac{1}{2}$ and using $\ell^2$ or $S$ as reference area gives the statement. Assumptions: the listed variables are the only ones that matter — no free surface (else the Froude number enters), no heat transfer from the body, a smooth surface (else the relative roughness $k/\ell$ enters), low free-stream turbulence, and a perfect gas with fixed $\gamma$ (for air, the ratio of specific heats $\gamma = 1.4$; at high temperature $\gamma$ itself becomes a parameter).
:::

The Reynolds number measures inertial against viscous forces and controls the boundary layer: where it becomes turbulent, whether and where it separates, and hence the drag and the maximum lift. The Mach number measures the importance of compressibility; below about $M_\infty = 0.3$ density changes are under about 5 per cent and the flow is treated as incompressible, which is the assumption of the first half of this course.

::: example Why model testing is hard {#ex-tunnel}
A wing of chord $c = 1.5\,\mathrm{m}$ flies at $V_\infty = 70\,\mathrm{m/s}$ at sea level ($\rho_\infty = 1.225\,\mathrm{kg/m^3}$, $\mu_\infty = 1.789\times10^{-5}\,\mathrm{Pa\,s}$, $a_\infty = 340.3\,\mathrm{m/s}$). A one-tenth-scale model is to be tested. (a) Find the full-scale $\mathrm{Re}$ and $M_\infty$. (b) What speed would an atmospheric tunnel need to match $\mathrm{Re}$, and is that acceptable? (c) What is the remedy?
::: solution
(a) $\mathrm{Re} = \rho_\infty V_\infty c/\mu_\infty = 1.225 \times 70 \times 1.5/1.789\times10^{-5} = 7.19\times10^6$ and $M_\infty = 70/340.3 = 0.206$.

(b) With the same air, $\mathrm{Re} \propto V_\infty c$, so a model with $c$ ten times smaller needs $V_\infty = 700\,\mathrm{m/s}$ — Mach $2.06$. The flow would contain shock waves that the real aircraft never meets: matching $\mathrm{Re}$ has destroyed $M_\infty$ similarity. The coefficients would be useless.

(c) Change the *gas state*, not the speed. Run at $V_\infty = 70\,\mathrm{m/s}$ and the same temperature (so $a_\infty$ and $M_\infty$ are unchanged) but at ten times the pressure: by the perfect-gas law $\rho_\infty$ is ten times larger, while viscosity of a gas is essentially independent of pressure, so
$$
\mathrm{Re}_\text{model} = \frac{(12.25)(70)(0.15)}{1.789\times10^{-5}} = 7.19\times10^6 .
$$
Both groups now match. Pressurised tunnels do exactly this; the alternative, used in cryogenic tunnels, is to cool the gas, which raises $\rho$ and lowers $\mu$ at once. *Sanity check:* the dynamic pressure on the model is ten times the full-scale value, so the model loads per unit area are ten times larger — one reason pressurised-tunnel models are machined from high-strength steel.
:::
:::

::: application Reading an airfoil data sheet
A catalogue of section data such as Abbott and von Doenhoff's *Theory of Wing Sections* gives, for each airfoil and several Reynolds numbers, the lift curve $c_l(\alpha)$, the moment curve $c_{m,ac}(c_l)$, and the drag polar $c_d(c_l)$, measured on two-dimensional models in a low-turbulence tunnel at low Mach number. The useful numbers are read off in a fixed order: the zero-lift angle $\alpha_{L=0}$ (negative for positive camber), the lift-curve slope $a_0 = dc_l/d\alpha$ (close to $2\pi$ per radian, $0.11$ per degree), the maximum lift coefficient and the stall behaviour (strongly $\mathrm{Re}$-dependent), $c_{m,ac}$ (nearly constant), and the minimum drag with the extent of any low-drag "bucket" (strongly $\mathrm{Re}$- and roughness-dependent). The first two come from inviscid theory ([[aerodynamics/thin-airfoil-theory]]); the last two need the boundary layer ([[aerodynamics/viscous-aerodynamics]]).
:::

::: history
Systematic measurement of aerodynamic forces is older than powered flight. Otto **Lilienthal** measured the forces on cambered surfaces with whirling arms and in the natural wind, and in 1889 published *Der Vogelflug als Grundlage der Fliegekunst* (*Bird flight as the basis of aviation*), whose tables and polar diagrams showed that cambered surfaces lift far better than flat plates. Wilbur and Orville **Wright** found in 1900–01 that their gliders produced much less lift than Lilienthal's tables and the customary "Smeaton coefficient" (about $0.005$ in their units) predicted; from their glider and kite tests they concluded that the coefficient should be nearer $0.0033$ (the modern value is about $0.00326$). That did not explain all the shortfall, so in the autumn of 1901 they built a small wind tunnel in Dayton with balances that measured lift and drag *ratios*, and tested some two hundred model surfaces. The data designed the successful 1902 glider and the 1903 Flyer. Reynolds's pipe-flow experiments of 1883 supplied the similarity parameter that later explained why small-model tests misjudged maximum lift and drag, and pressurised tunnels — the NACA's Variable Density Tunnel at Langley, advocated by Max Munk and first operated in 1922 — were the first to attack that problem as in example [[#ex-tunnel]].
:::

## Summary

::: summary
- Every aerodynamic force and moment is the integral of surface **pressure** (normal) and **shear stress** (tangential). Lift and drag are defined relative to the free stream, normal and axial force relative to the chord; they are related by a rotation through $\alpha$, [[#eq-rotate]].
- Coefficients divide by $q_\infty = \tfrac12\rho_\infty V_\infty^2$ and a stated reference area (and length for moments). Section coefficients are lower case per unit span. $C_p = (p - p_\infty)/q_\infty = 1 - (V/V_\infty)^2$ in incompressible flow.
- $c_n$ is the area between the lower- and upper-surface $C_p$ curves; $c_{m,LE}$ is its first moment, [[#eq-cn-cm]]. The leading-edge suction peak must be resolved to obtain the drag.
- The **centre of pressure** moves with lift and is undefined at zero lift for a cambered section. The **aerodynamic centre** is the point about which $c_m$ is independent of $c_l$; it is near the quarter-chord at low speed, and $x_{cp}/c = x_{ac}/c - c_{m,ac}/c_l$.
- For a given shape, coefficients depend only on $\alpha$, $\mathrm{Re}$ and $M_\infty$ (Buckingham $\Pi$). Matching both $\mathrm{Re}$ and $M_\infty$ in a small model needs a denser (pressurised or cryogenic) gas.
:::

## Exercises

::: exercise Dynamic pressure {level=1 check="3.00"}
Find the dynamic pressure of a sea-level stream ($\rho_\infty = 1.225\,\mathrm{kg/m^3}$) at $V_\infty = 70\,\mathrm{m/s}$. (Enter $q_\infty$ in kPa.)
::: solution
$q_\infty = \tfrac12(1.225)(70)^2 = 3001\,\mathrm{Pa} = 3.00\,\mathrm{kPa}$. A useful reference: $70\,\mathrm{m/s}$ is about $136$ knots, a typical light-twin approach speed, and $3\,\mathrm{kPa}$ is only 3 per cent of atmospheric pressure — aerodynamic pressures are small differences on top of a large ambient value.
:::
:::

::: exercise Lift coefficient of a glider {level=1 check="0.741"}
A glider of mass $500\,\mathrm{kg}$ and wing area $12\,\mathrm{m^2}$ flies level at $30\,\mathrm{m/s}$ at sea level. Find its lift coefficient (take $g = 9.81\,\mathrm{m/s^2}$). (Enter $C_L$.)
::: solution
$C_L = mg/(q_\infty S) = 500 \times 9.81 / \left(\tfrac12 \times 1.225 \times 30^2 \times 12\right) = 4905/6615 = 0.741$. This is a typical thermalling lift coefficient: gliders circle slowly at fairly high $C_L$.
:::
:::

::: exercise Pressure coefficient from local speed {level=1 check="-0.96"}
At a point on the upper surface of a wing in low-speed flow the local speed is $1.4$ times the free-stream speed. Find the pressure coefficient there. (Enter $C_p$.)
::: solution
By [[#eq-cp-incomp]], $C_p = 1 - 1.4^2 = 1 - 1.96 = -0.96$. The local pressure is $0.96\,q_\infty$ below ambient.
:::
:::

::: exercise Lift and drag from a body-axis balance {level=2 check="136"}
A two-dimensional model at $\alpha = 10^\circ$ has $N' = 850\,\mathrm{N/m}$ and $A' = -12\,\mathrm{N/m}$ (the axial force points towards the leading edge). Find $L'$ and $D'$. (Enter $D'$ in N/m.)
::: solution
$L' = 850\cos 10^\circ - (-12)\sin 10^\circ = 837.1 + 2.1 = 839\,\mathrm{N/m}$; $D' = 850\sin 10^\circ + (-12)\cos 10^\circ = 147.6 - 11.8 = 136\,\mathrm{N/m}$. The negative axial force is the leading-edge suction; it *reduces* the drag, but the drag is still positive, as it must be for a body in steady two-dimensional flow.
:::
:::

::: exercise Centre of pressure of a cambered section {level=2 check="0.35"}
A section has its aerodynamic centre at the quarter-chord and $c_{m,ac} = -0.05$. Where is the centre of pressure when $c_l = 0.5$? (Enter $x_{cp}/c$.)
::: solution
By [[#eq-xcp-xac]], $x_{cp}/c = 0.25 - (-0.05)/0.5 = 0.25 + 0.10 = 0.35$. At $c_l = 0.25$ it would be at $0.45$, and at $c_l = 0.05$ at the trailing edge: the nose-down couple of positive camber pushes the centre of pressure aft as lift falls.
:::
:::

::: exercise Aerodynamic centre from two points {level=2 check="0.27"}
Tests of a section give $c_{m,c/4} = -0.050$ at $c_l = 0$ and $c_{m,c/4} = -0.066$ at $c_l = 0.8$. Locate the aerodynamic centre. (Enter $x_{ac}/c$.)
::: solution
$m_0 = (-0.066 + 0.050)/0.8 = -0.020$, so $x_{ac}/c = 0.25 - (-0.020) = 0.27$ by [[#eq-xac]], and $c_{m,ac} = c_{m,0} = -0.050$. The moment becomes more nose-down with lift, so the lift acts behind the quarter-chord and so does the aerodynamic centre.
:::
:::

::: exercise Stall speed and Reynolds number {level=2 check="2.91e6"}
An aircraft of mass $1200\,\mathrm{kg}$ has $S = 16\,\mathrm{m^2}$, mean chord $1.5\,\mathrm{m}$ and $C_{L,\max} = 1.5$. Find the sea-level stall speed and the chord Reynolds number at that speed ($\mu_\infty = 1.789\times10^{-5}\,\mathrm{Pa\,s}$). (Enter $\mathrm{Re}$.)
::: solution
$V_s = \sqrt{2 \times 1200 \times 9.81/(1.225 \times 16 \times 1.5)} = \sqrt{800.8} = 28.3\,\mathrm{m/s}$, and $\mathrm{Re} = 1.225 \times 28.3 \times 1.5/1.789\times10^{-5} = 2.91\times10^6$. Maximum lift depends strongly on $\mathrm{Re}$ in this range, so $C_{L,\max}$ data should be taken from tests near $3\times10^6$, not from small-tunnel tests at $5\times10^5$.
:::
:::

::: exercise Moment from a pressure distribution {level=3 check="-0.25"}
A thin section has $C_{p,l} - C_{p,u} = 3\,(1 - \xi)^2$, $\xi = x/c$. Find $c_n$ and $c_{m,LE}$, and locate the centre of pressure. (Enter $c_{m,LE}$.)
::: solution
$c_n = \int_0^1 3(1-\xi)^2\,d\xi = 1$. $c_{m,LE} = -\int_0^1 3\xi(1-\xi)^2\,d\xi = -3\left(\tfrac12 - \tfrac23 + \tfrac14\right) = -3 \times \tfrac{1}{12} = -0.25$. Then $x_{cp}/c = 0.25/1 = 0.25$: the load is concentrated near the nose, as on a real airfoil at incidence, and its centroid sits at the quarter-chord. This distribution has the same first two moments as the flat-plate loading of thin-airfoil theory, which is concentrated even more strongly at the leading edge.
:::
:::

::: exercise The aerodynamic centre in terms of angle-of-attack slopes {level=3}
Wind-tunnel data are often given as functions of $\alpha$ rather than $c_l$. Suppose that in the linear range $c_l = a_0(\alpha - \alpha_{L=0})$ and $c_{m,c/4} = c_{m,0} + b_0(\alpha - \alpha_{L=0})$ with constant slopes $a_0$ and $b_0$. Derive the location of the aerodynamic centre in terms of $a_0$ and $b_0$, and show that it lies at the quarter-chord for any section whose quarter-chord moment does not change with incidence.
::: solution
By [[#eq-transfer]], $c_{m,x} = c_{m,0} + b_0(\alpha - \alpha_{L=0}) + (x/c - 1/4)a_0(\alpha - \alpha_{L=0})$. This is independent of $\alpha$ when $b_0 + (x/c - 1/4)a_0 = 0$, i.e.
$$
\frac{x_{ac}}{c} = \frac14 - \frac{b_0}{a_0},
$$
which is [[#eq-xac]] with $m_0 = b_0/a_0$ (by the chain rule, $dc_m/dc_l = (dc_m/d\alpha)/(dc_l/d\alpha)$). If $b_0 = 0$ the aerodynamic centre is at $c/4$. Both slopes must be in the same angle unit; the ratio is then unit-free.
:::
:::

::: exercise Planning a pressurised-tunnel test {level=3 check="8"}
A one-eighth-scale model of a wing is to be tested in a closed-circuit tunnel at the same Mach number and Reynolds number as the full-size wing at sea level. The tunnel air is at the same temperature as the sea-level atmosphere. (a) What static pressure (as a multiple of $101.3\,\mathrm{kPa}$) is required? (b) Discuss two practical problems this creates and one alternative. (Enter the pressure ratio for part (a).)
::: solution
(a) Same temperature means the same $a_\infty$ and $\mu_\infty$; same $M_\infty$ then means the same $V_\infty$. With $\mathrm{Re} = \rho_\infty V_\infty \ell/\mu_\infty$ and $\ell$ divided by $8$, $\rho_\infty$ must be multiplied by $8$, and at fixed temperature $p \propto \rho$: the tunnel must run at $8$ atmospheres.

(b) The dynamic pressure on the model is eight times the full-scale value, so the model and its supports carry eight times the loads per unit area and deflect — the model must be stiff steel, and its aeroelastic shape may still differ from flight. The tunnel shell is a large pressure vessel, designed and inspected to the applicable pressure-vessel code, and every model change means depressurising it, so productivity is low. The drive power for the same Mach number also rises in proportion to the density. The main alternative is a **cryogenic** tunnel using nitrogen near $100\,\mathrm{K}$: cooling raises the density and lowers the viscosity and the speed of sound, so the Reynolds number rises sharply at a moderate pressure and modest power — at the cost of thermal-insulation, frost and model-material problems. The trade between them is a genuine engineering choice with no single right answer.
:::
:::
