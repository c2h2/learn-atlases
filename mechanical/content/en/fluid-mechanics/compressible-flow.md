When a flow's speed becomes a significant fraction of the speed at which a pressure disturbance travels through it, **density stops being a constant and becomes a variable of the problem**, and with it every intuition about pressure, force and information. The dimensionless number that measures the change is the **Mach number**, and the reason it is a ratio of two speeds and not of a speed to a property is that **a Mach number is a statement about how much of the flow's kinetic energy has been converted into pressure**: at $M = 0.3$ the conversion is $4.5\ \%$ and the incompressible approximation is within engineering tolerance; at $M = 1$ it is $100\ \%$ of what the flow can give, and the flow **chokes** — it cannot be accelerated past the throat by lowering the downstream pressure, because the information that the pressure has been lowered travels at the speed of sound and the flow is already running at it.

Compressible flow is where fluid mechanics meets the rocket nozzle, the safety relief valve, the supersonic inlet, the steam-turbine stage, the blow-off line and the transonic airliner's wing, and its two governing facts are **one algebraic relation and one inequality**: the area-velocity relation $dA / A = \left( M^2 - 1 \right) dV / V$, which says that a nozzle must converge subsonically and diverge supersonically, and the second law applied across a shock, which says that a compression through a finite angle must be a discontinuity with a total-pressure loss and that no expansion can be as abrupt as a compression.

::: warning Seven compressible-flow errors that cost a nozzle, a valve or an airframe
**Using incompressible Bernoulli above $M \approx 0.3$.** The dynamic pressure is $q = \tfrac{1}{2} \rho V^2$ only to first order; the exact stagnation pressure is $p_0 = p \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{\gamma / \left( \gamma - 1 \right)}$, whose binomial expansion is $p + \tfrac{1}{2} \rho V^2 \left[ 1 + \frac{\gamma + 1}{12} M^2 + \cdots \right]$. **At $M = 0.3$ the correction is $1.2\ \%$; at $M = 0.5$ it is $3.4\ \%$; at $M = 0.85$ it is $12\ \%$; at $M = 1$ it is $25\ \%$.** The reason a pitot traverse in a wind-test section at $M = 0.85$ reduced to $\tfrac{1}{2} \rho V^2$ gives a velocity error of $6\ \%$ and a Mach error of $3.5\ \%$ is that the error is second order in $M$ and nobody notices until the pressure coefficient is compared with the linear theory. **The reason a subsonic airliner's $V_{MO}$ limit is set by the $M_{MO}$ and not the other way round is that at flight-level altitude the speed of sound is $295\ \mathrm{m / s}$ and $M = 0.82$ is $242\ \mathrm{m / s}$ true, while the dynamic pressure is only $13\ \mathrm{kPa}$ — the airframe is limited by compressibility and not by load.** **Forgetting that a shock loses total pressure.** Across a normal shock at $M_1 = 2.0$ the static pressure rises by $4.5$, the temperature by $1.69$, and the total pressure **falls by $27.9\ \%$**. **A supersonic inlet with three shocks loses $40\ \%$ of its total pressure and a good one loses $10\ \%$**, and the reason a fighter's thrust at Mach 2 is half its sea-level value is that the engine's intake recovered only $60\ \%$ of the ram. **The reason a normal-shock loss cannot be designed away, only distributed, is that the loss scales as $\left( \gamma M_1^2 \sin^2 \beta - 1 \right)^3$ in the shock strength** — so many weak oblique shocks beat one strong normal one, and the reason a mixed-compression inlet has an external ramp and an internal throat is that the ramps do the cheap work and the terminal normal shock does the unavoidable remainder. **Assuming the flow is not choked.** A gas flowing from a reservoir through a convergent nozzle chokes at $p_b / p_0 = 0.528$ for air, and **below that back-pressure ratio the mass flow is fixed and independent of the back pressure**. **The reason a relief valve sized on the upstream-downstream pressure difference is undersized is that it is choked and the difference is irrelevant**, and the reason a blow-off line's relief set pressure is computed from $0.6847\, p_0 / \sqrt{R T_0}$ per unit area is that the maximum mass flux is set by the reservoir and not by the atmosphere it discharges into. **Using the reservoir pressure where the throat pressure belongs.** The choked mass flux uses $p_0$ and $T_0$; the throat's static pressure is $0.528\, p_0$ and its static temperature $0.833\, T_0$. **A factor of $1.9$ on the density and $1.2$ on the temperature**, and the reason a nozzle's thrust coefficient comes out wrong on the first attempt is nearly always a static property used where a stagnation one belongs, or the reverse. **Treating an oblique shock as if it turned the flow through the full deflection in the normal direction.** Only the **normal** component of the velocity is subsonic downstream; the tangential component is unchanged. **The downstream Mach number can be supersonic behind an oblique shock** — at $M_1 = 3$ and $\delta = 10^\circ$ it is $1.85$ — and the reason a supersonic inlet's ramp system keeps the flow supersonic through every oblique shock and accepts one normal shock at the end is that a normal shock at $M = 1.85$ loses $21\ \%$ of the total pressure where one at $M = 3$ loses $67\ \%$. **Confusing the design pressure with the back pressure at a rocket nozzle exit.** A nozzle is optimum when $p_e = p_a$; if $p_e > p_a$ it is **underexpanded** and loses the difference as unused pressure thrust; if $p_e < p_a$ it is **overexpanded** and develops a shock system or, at severe overexpansion, **separates inside the nozzle** with an unpredictable axial force. **The reason a launch vehicle's nozzle is a compromise between sea-level and altitude expansion is that the altitude-optimised extension costs $1.5\ \mathrm{m}$ of boat-tail length and $18\ \%$ of the vehicle's base drag during the first twenty seconds of flight**, and the reason the separation criterion matters more than the loss is that a nozzle that separates asymmetrically yaws the vehicle. **Applying the isentropic relations across a shock.** The isentropic relations are valid **between two points on the same streamline with no shock between them**. Across a shock the flow is adiabatic — $T_0$ is constant — but **not** isentropic, and $p_0$ is not. **The single most common error in compressible-flow calculations is chaining isentropic relations across a shock**, and the reason the Rankine–Hugoniot relations exist as a separate set is that the second law forbids the shortcut.
:::

## The relations

::: definition Stagnation and the speed of sound {#def-stagnation}
**The speed of sound** is the propagation speed of an infinitesimal pressure disturbance, obtained by applying mass and momentum to a moving sound wave:
$$
\boxed{ a = \sqrt{\gamma R T} = \sqrt{\gamma \frac{p}{\rho}} }, \qquad
\mathrm{Ma} = \frac{V}{a}
$$
$$
\begin{array}{l c c c}
& \gamma & R\ \left( \mathrm{J / kg \cdot K} \right) & a\ \text{at } 20\ {}^{\circ}\mathrm{C} \\
\text{Air} & 1.400 & 287.0 & 343.2\ \mathrm{m / s} \\
\text{Steam} & 1.310 & 461.5 & 472\ \mathrm{m / s} \\
\text{Carbon dioxide} & 1.289 & 188.9 & 269\ \mathrm{m / s} \\
\text{Helium} & 1.667 & 2{,}077 & 1{,}007\ \mathrm{m / s} \\
\text{Water} & - & 4{,}084\ \left( c_p \right) & 1{,}481\ \mathrm{m / s}
\end{array}
$$
**The reading of the table.** $a$ depends on **temperature alone** for a given gas, and the reason a jet's true airspeed at flight-level altitude is $22\ \%$ lower than its indicated airspeed at the same Mach number is that $T$ is $223\ \mathrm{K}$ and not $288\ \mathrm{K}$. **The number that makes helium a bad choice for a wind tunnel and a good one for a leak detector is that $a \propto \sqrt{\gamma / M}$**: helium's sound speed is three times air's, so a helium jet is subsonic at three times the velocity — and its low molecular weight makes it diffuse through leaks forty times faster than air.
**The stagnation relations, for an isentropic deceleration to rest:**
$$
\boxed{ \frac{T_0}{T} = 1 + \frac{\gamma - 1}{2} M^2 }, \qquad
\boxed{ \frac{p_0}{p} = \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{\gamma / \left( \gamma - 1 \right)} }, \qquad
\frac{\rho_0}{\rho} = \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{1 / \left( \gamma - 1 \right)}
$$
$$
\begin{array}{c c c c c c}
M & T_0 / T & p_0 / p & \rho_0 / \rho & q / p_0 & \text{incompressible error in } p_0 \\
0.1 & 1.002 & 1.007 & 1.005 & 0.0050 & 0.05\ \% \\
0.3 & 1.018 & 1.064 & 1.046 & 0.0443 & 1.2\ \% \\
0.5 & 1.050 & 1.186 & 1.130 & 0.1250 & 3.4\ \% \\
0.7 & 1.098 & 1.381 & 1.258 & 0.2443 & 7.0\ \% \\
0.85 & 1.145 & 1.616 & 1.412 & 0.3606 & 12.0\ \% \\
1.0 & 1.200 & 1.893 & 1.581 & 0.4783 & 25.0\ \%
\end{array}
$$
**The number that sets the $M = 0.3$ rule.** The incompressible error in $p_0$ is $\frac{\gamma + 1}{12} M^2 = 0.2\, M^2$, so $1.8\ \%$ at $M = 0.3$ and $5\ \%$ at $M = 0.5$. **The reason the rule is quoted as $0.3$ and not $0.5$ is that a $2\ \%$ error in $p_0$ becomes a $1\ \%$ error in velocity, and a wind tunnel's calibration tolerance is $0.5\ \%$.**
**The maximum mass flux.** Differentiating $\dot{m} / A = \rho V$ with the stagnation relations gives the maximum at $M = 1$:
$$
\boxed{ \left( \frac{\dot m}{A} \right)_{\max} = 0.6847\, \frac{p_0}{\sqrt{R T_0}} }\ \text{for } \gamma = 1.4
$$
**The number that sizes every relief valve, safety valve and blow-off line in the plant.** For air at $p_0 = 10\ \mathrm{bar}$ and $T_0 = 300\ \mathrm{K}$ the choked flux is $0.6847 \times 10^6 / \sqrt{287 \times 300} = 22.9\ \mathrm{kg / s \cdot m^2}$ — **and the reason the flux is independent of the back pressure is that the throat is already running at the fastest the reservoir can feed it.**
:::

::: definition The area-velocity relation and the de Laval nozzle {#def-area-velocity}
**Differentiating the one-dimensional isentropic relations** with continuity gives the relation on which all nozzle design rests:
$$
\boxed{ \frac{dA}{A} = \left( M^2 - 1 \right) \frac{dV}{V} }
$$
**The three readings.** Subsonic: $dA < 0$ accelerates, so a **convergent** duct is a nozzle. Supersonic: $dA > 0$ accelerates, so a **divergent** duct is a nozzle — **the opposite of every subsonic intuition**. Subsonic-to-supersonic: $dA = 0$ at $M = 1$, so **a throat is required, and the throat is sonic**.
**The area–Mach number relation:**
$$
\boxed{ \frac{A}{A^{*}} = \frac{1}{M} \left[ \frac{2 + \left( \gamma - 1 \right) M^2}{\gamma + 1} \right]^{\left( \gamma + 1 \right) / \left[ 2 \left( \gamma - 1 \right) \right]} }
$$
$$
\begin{array}{c c c c c c c c c c}
M & 0.2 & 0.4 & 0.6 & 0.8 & 1.0 & 1.5 & 2.0 & 3.0 & 4.0 \\
A / A^* & 2.856 & 1.590 & 1.188 & 1.025 & 1.000 & 1.176 & 1.687 & 4.235 & 10.28
\end{array}
$$
**The number that makes a rocket nozzle short.** At $M = 3$ the area ratio is $4.235$, and the reason a $3{,}000\ \mathrm{m / s}$-vacuum engine has an exit diameter $2.06$ times its throat diameter is that $\sqrt{4.235} = 2.06$ — and the reason a nozzle for $M = 5$ is $3.2$ times the throat diameter and enormous is that $A / A^*$ grows as $M^{- 1} \left( 0.2 M^2 \right)^3 \propto M^5$.
**The isentropic nozzle solution.** Given $p_0$, $T_0$ and the area ratio, the exit Mach number follows from $A / A^*$ and then
$$
V_e = M_e \sqrt{\gamma R T_e}, \qquad
\dot m = \rho_e V_e A_e, \qquad
u_e = \sqrt{2 c_p \left( T_0 - T_e \right)} = \sqrt{\frac{2 \gamma}{\gamma - 1} \frac{p_0}{\rho_0} \left[ 1 - \left( \frac{p_e}{p_0} \right)^{\left( \gamma - 1 \right) / \gamma} \right]}
$$
**The number that makes a cold gas thruster weak.** The exit velocity is $\sqrt{2 c_p T_0}$ times a pressure-ratio function, so it scales as $\sqrt{T_0}$: **nitrogen at $300\ \mathrm{K}$ gives $450\ \mathrm{m / s}$; hydrogen at $3{,}000\ \mathrm{K}$ gives $3{,}400\ \mathrm{m / s}$** — and the reason chemical propulsion's specific impulse is a temperature-and-molecular-weight statement is that $u_e \propto \sqrt{T_c / M_{\mathrm{mol}}}$.
:::

::: widget plot
f: (1/x)*pow((2+0.4*x*x)/2.4, 3)
x: 0.1, 3.0
y: 1.0, 4.5
caption: The area ratio $A / A^*$ required to reach a given Mach number in an isentropic duct of $\gamma = 1.4$. **The curve has its minimum of exactly $1.0$ at $M = 1$** — the throat — and is steeply double-valued: $A / A^* = 1.687$ corresponds to $M = 0.37$ subsonically and $M = 2.0$ supersonically, so **the same geometry gives either solution and the pressure ratio decides which**. **The number that makes a de Laval nozzle's starting problem a real problem is that a nozzle designed for $M = 2.0$ has a normal shock standing in its divergent part until the pressure ratio falls below $p_0 / p_b = 7.824 / 4.500 = 1.74$**, at which point the shock is swallowed and the tunnel "starts"; and the reason a supersonic wind tunnel is started at low density and then run up is that the shock has to be swallowed against the friction of the boundary layer it drags along the wall.
:::

::: definition The normal shock {#def-normal-shock}
**The Rankine–Hugoniot relations**, from mass, momentum and energy across a discontinuity in a constant-area duct:
$$
\boxed{ M_2^2 = \frac{\left( \gamma - 1 \right) M_1^2 + 2}{2 \gamma M_1^2 - \left( \gamma - 1 \right)} }, \qquad
\frac{p_2}{p_1} = 1 + \frac{2 \gamma}{\gamma + 1} \left( M_1^2 - 1 \right), \qquad
\frac{\rho_2}{\rho_1} = \frac{\left( \gamma + 1 \right) M_1^2}{\left( \gamma - 1 \right) M_1^2 + 2}
$$
$$
\frac{T_2}{T_1} = \frac{\left[ 2 \gamma M_1^2 - \left( \gamma - 1 \right) \right] \left[ \left( \gamma - 1 \right) M_1^2 + 2 \right]}{\left( \gamma + 1 \right)^2 M_1^2}, \qquad
T_{01} = T_{02}, \qquad
\boxed{ \frac{p_{02}}{p_{01}} = \frac{p_2}{p_1} \left( \frac{p_{01}}{p_1} \right)^{- 1} \left( \frac{p_{02}}{p_2} \right) }
$$
**The warning about the shortcut.** A single closed expression for $p_{02} / p_{01}$ in terms of $M_1$ exists, and every practitioner misremembers an exponent in it; **the reliable route is the three-step one above**, in which $p_2 / p_1$ comes from the shock relation and each stagnation-to-static ratio from the isentropic relation at its own local Mach number. **Worked at $M_1 = 2.0$:** $p_2 / p_1 = 4.500$, $p_{01} / p_1 = 7.824$, $p_{02} / p_2 = 1.2536$ at $M_2 = 0.577$, giving $p_{02} / p_{01} = 4.500 \times 1.2536 / 7.824 = 0.721$.
$$
\begin{array}{c c c c c c c}
M_1 & M_2 & p_2 / p_1 & \rho_2 / \rho_1 & T_2 / T_1 & p_{02} / p_{01} & \text{total-pressure loss} \\
1.1 & 0.912 & 1.245 & 1.167 & 1.067 & 0.9989 & 0.1\ \% \\
1.5 & 0.701 & 2.458 & 1.862 & 1.320 & 0.9298 & 7.0\ \% \\
2.0 & 0.577 & 4.500 & 2.667 & 1.688 & 0.7209 & 27.9\ \% \\
3.0 & 0.475 & 10.33 & 3.857 & 2.677 & 0.3283 & 67.2\ \% \\
5.0 & 0.416 & 29.00 & 5.000 & 5.800 & 0.0615 & 93.9\ \% \\
\infty & 0.378 & \propto M_1^2 & 6.000 & \propto M_1^2 & \to 0 &
\end{array}
$$
**The three limits that make the shock a physical object and not a mathematical curiosity.** The density ratio tends to $\left( \gamma + 1 \right) / \left( \gamma - 1 \right) = 6$ for air — **the compression is bounded**, which is the reason a shock cannot be squeezed indefinitely and the reason a hypersonic shock layer has a finite thickness. The downstream Mach number tends to $\sqrt{\left( \gamma - 1 \right) / \left( 2 \gamma \right)} = 0.378$ — **a strong shock always leaves a subsonic flow at the same Mach number**, and the reason a detached bow shock ahead of a blunt body is treated as a normal shock of $M_1 \to \infty$ is that the subsonic region behind it is at $M \approx 0.38$ whatever the flight speed. And $p_{02} / p_{01} \to 0$ — **the total pressure is destroyed without limit**, which is the reason a hypersonic inlet's pressure recovery is the central design problem of the configuration.
**The second law.** $p_{02} / p_{01} < 1$ for every $M_1 > 1$, and the entropy rise is
$$
\frac{\Delta s}{c_v} = \ln \frac{p_2}{p_1} - \gamma \ln \frac{\rho_2}{\rho_1} \approx \frac{2 \gamma \left( \gamma - 1 \right)}{3 \left( \gamma + 1 \right)^2} \cdot \frac{\left( M_1^2 - 1 \right)^3}{M_1^2} \quad \text{for } M_1 \to 1
$$
**The cube is the reason weak shocks are nearly isentropic and the reason a distributed compression is worth $30\ \%$ in thrust** — at $M_1 = 1.1$ the loss is $0.1\ \%$ and at $M_1 = 2$ it is $28\ \%$, a factor of $280$ for a doubling of the shock strength.
**The Hugoniot and the Fanno line.** The shock must connect two states that lie on both the **Fanno line** (constant stagnation enthalpy, varying momentum) and the **Hugoniot** (constant mass flux and area); the intersection gives two branches, and **only the branch with an entropy increase is physical** — which is why a shock going from subsonic to supersonic does not exist.
:::

::: definition Oblique shocks and expansions {#def-oblique}
**The geometry.** A supersonic flow deflected through $\delta$ by a wedge or corner turns through a straight **oblique shock** at wave angle $\beta$, across which only the **normal** velocity component is discontinuous:
$$
\boxed{ \tan \delta = 2 \cot \beta\, \frac{M_1^2 \sin^2 \beta - 1}{M_1^2 \left( \gamma + \cos 2 \beta \right) + 2} }
\qquad \left[ \text{the } \theta\text{–}\beta\text{–}M \text{ relation} \right]
$$
with $M_{1n} = M_1 \sin \beta$ and every normal-shock relation applied to $M_{1n}$.
**The Mach angle.** A disturbance propagates on a cone of half-angle
$$
\boxed{ \mu = \arcsin \frac{1}{M} }
$$
**and an infinitesimal disturbance — a Mach wave — is the $\delta \to 0$ limit of an oblique shock, across which the process is isentropic.** The reason a supersonic airfoil at small incidence is analysed with Mach waves and not shocks is that the drag of a thin profile at $M = 1.4$ is $80\ \%$ wave drag from the shocks and $20\ \%$ from the friction, and the shocks are weak enough that linear theory is within $10\ \%$.
**The $\theta$–$\beta$–$M$ solution structure.** For each $M_1$ and $\delta$ below a maximum $\delta_{\max}$ there are **two** solutions, a **weak** shock (downstream supersonic or barely subsonic, the one that occurs) and a **strong** shock (subsonic, occurring only when the downstream pressure forces it, as at an inlet). Above $\delta_{\max}$ the shock **detaches**.
$$
\begin{array}{c c c c c}
M_1 & \mu & \delta_{\max} & \beta_{\mathrm{weak}} \text{ at } \delta = 10^\circ & M_2 \\
1.5 & 41.8^\circ & 12.0^\circ & 47.7^\circ & 1.19 \text{ (subsonic)} \\
2.0 & 30.0^\circ & 22.9^\circ & 39.3^\circ & 1.64 \\
3.0 & 19.5^\circ & 34.1^\circ & 25.9^\circ & 1.85 \\
5.0 & 11.5^\circ & 41.7^\circ & 18.5^\circ & 2.99
\end{array}
$$
**The number that makes a supersonic inlet's ramp angles a compromise.** At $M = 3$ the maximum deflection per ramp is $34^\circ$, so a $30^\circ$ total turn needs at least one ramp; **but the total-pressure recovery of a $30^\circ$ single shock is $0.72$ while that of three $10^\circ$ shocks is $0.97^3 = 0.91$** — and the reason real inlets use three or four ramps and accept the mechanical complexity is that factor of $0.26$ in pressure recovery, which is a $26\ \%$ loss in thrust.
**The Prandtl–Meyer expansion.** A supersonic flow turning **through** itself expands isentropically through a fan of Mach waves, and the total turn available is
$$
\boxed{ \nu \left( M \right) = \sqrt{\frac{\gamma + 1}{\gamma - 1}} \arctan \sqrt{\frac{\gamma - 1}{\gamma + 1} \left( M^2 - 1 \right)} - \arctan \sqrt{M^2 - 1} }, \qquad
\Delta \theta = \nu \left( M_2 \right) - \nu \left( M_1 \right)
$$
$$
\begin{array}{c c c c c c c c}
M & 1.0 & 1.5 & 2.0 & 2.5 & 3.0 & 4.0 & 5.0 \\
\nu \left( M \right),\ {}^\circ & 0 & 11.9 & 26.4 & 39.1 & 49.8 & 65.8 & 78.5 \\
\nu_{\max} = 130.5^\circ \text{ at } M \to \infty &&&&&&&
\end{array}
$$
**The number that makes an expansion fan finite.** A supersonic flow can turn through at most $\nu_{\max} = 130.5^\circ$ for air, and the reason a convex corner of more than that is impossible is not a limitation of the theory but a statement that **the flow cannot expand into a vacuum faster than the molecules can move**. **The reason an expansion is lossless and a compression is not is that in an expansion the Mach waves diverge and never coalesce, while in a compression they converge and merge into a shock** — and the reason a supersonic airfoil's lower surface is a smooth expansion and its upper surface has a shock at $40\ \%$ chord is that the pressure recovery on the aft half must be done by compression and every compression at supersonic speed costs wave drag.
:::

## Shocks in ducts, nozzles and pipes

::: definition Shock and expansion patterns in nozzles {#def-nozzle-patterns}
**The six regimes of a convergent–divergent nozzle**, set by the back-pressure ratio $p_b / p_0$ against the design ratio $p_e / p_0 = \left( 1 + \frac{\gamma - 1}{2} M_e^2 \right)^{- \gamma / \left( \gamma - 1 \right)} / \left( A / A^* \right)$-consistent value:
$$
\begin{array}{l l l}
p_b / p_0 > 0.528 & \text{subsonic throughout, no shock} & \text{convergent-nozzle behaviour} \\
p_b / p_0 = p_{\mathrm{design}} & \text{isentropic supersonic, } p_e = p_b & \text{design condition} \\
p_{\mathrm{design}} < p_b / p_0 & \text{overexpanded: oblique shocks in, normal shock in} & \text{thrust loss, possible separation} \\
p_b / p_0 \ll p_{\mathrm{design}} & \text{underexpanded: expansion waves out} & \text{thrust loss, diamond pattern} \\
\text{off-design, mild} & \text{normal shock standing in the divergent part} & \text{thrust nearly design} \\
\text{severe overexpansion} & \text{shock-induced separation inside the nozzle} & \text{side load, unpredictable}
\end{array}
$$
**The number that makes a launch vehicle's nozzle a structural and not an aerodynamic problem.** A $2\ \mathrm{m}$-diameter rocket nozzle operating at $20\ \%$ overexpansion at sea level carries a net inward load of
$$
\Delta p \cdot A_e = 0.2 \times 10^5 \times \frac{\pi}{4} \times 2^2 = 63{,}000\ \mathrm{N}
$$
**six tonnes of collapsing load on a shell a few millimetres thick**, and the reason a nozzle's wall is stiffened by external stringers and not made thicker is that the mass of the extra wall costs more $\Delta v$ than the stringers' drag.
**The thrust coefficient.**
$$
C_F = \frac{F}{p_0 A_t} = \frac{\dot m u_e}{p_0 A_t} + \frac{\left( p_e - p_a \right) A_e}{p_0 A_t}
\qquad \left[ C_{F,\max} \approx 1.2 \text{ for air at } \varepsilon = 10,\ p_a = 0 \right]
$$
**The number that makes the pressure term worth $30\ \%$.** For a $\varepsilon = 10$ nozzle the momentum term is $0.94$ and the pressure term at optimum expansion is $0.26$ — **a $22\ \%$ contribution**, and the reason an underexpanded nozzle loses it is that the exit pressure is above ambient and the difference is never converted to momentum.
:::

::: definition Fanno and Rayleigh flow {#def-fanno-rayleigh}
**Fanno flow** — steady, adiabatic, constant area, **with friction**. Stagnation temperature is constant, stagnation pressure falls, and the flow moves along a **Fanno line** toward $M = 1$:
$$
\boxed{ \frac{4 f L^{*}}{D} = \frac{1 - M^2}{\gamma M^2} + \frac{\gamma + 1}{2 \gamma} \ln \left[ \frac{\left( \gamma + 1 \right) M^2}{2 + \left( \gamma - 1 \right) M^2} \right] }
$$
**Rayleigh flow** — steady, **with heat addition**, constant area, no friction. Stagnation temperature rises, stagnation pressure falls, and heat addition drives the flow toward $M = 1$ from either branch:
$$
\frac{T_0}{T_0^{*}} = \frac{2 \left( \gamma + 1 \right) M^2 \left[ 1 + \frac{\gamma - 1}{2} M^2 \right]}{\left( 1 + \gamma M^2 \right)^2}, \qquad
\frac{p_0}{p_0^{*}} = \frac{\gamma + 1}{1 + \gamma M^2} \left[ \frac{2 \left( 1 + \frac{\gamma - 1}{2} M^2 \right)}{\gamma + 1} \right]^{\gamma / \left( \gamma - 1 \right)}
$$
**The two numbers that make a ramjet and a boiler-chimney both Rayleigh problems.** On the subsonic Rayleigh line the **static** temperature reaches its maximum at $M = 1 / \sqrt{\gamma} = 0.845$ and the **stagnation** temperature its maximum at $M = 1$. **Between $M = 0.845$ and $M = 1$ adding heat cools the gas** — the static temperature falls even as enthalpy is poured in, because the kinetic-energy term grows faster than the static enthalpy — and at $M = 1$ the duct **chokes** and no further heat can be added without reducing the mass flow. **The reason a ramjet's combustor is entered at $M \approx 0.5$ and not $0.9$ is that the $M = 0.845$ maximum-heat-flux point is also a thermal-choking hazard, and the reason a fired reheater's duct is sized on the Rayleigh $T_0 / T_0^*$ chart and not on the heat balance is that the duct chokes before the gas reaches the design temperature.**
**The Rayleigh line's other use.** A **detonation** is a Rayleigh shock — heat addition in a frame moving with the front — and the reason the Chapman–Jouguet condition picks the point of minimum entropy production on the Rayleigh line is the same variational statement that picks the Fanno-line end state.
**The number that makes a de Laval nozzle's starting problem a real problem is that a nozzle designed for $M = 2.0$ has a normal shock standing in its divergent part until the pressure ratio falls below $p_0 / p_b = 7.824 / 4.500 = 1.74$**, at which point the shock is swallowed and the tunnel "starts"; and the reason a supersonic wind tunnel is started at low density and then run up is that the shock has to be swallowed against the friction of the boundary layer it drags along the wall.
:::

## Worked cases

::: example A wind-tunnel nozzle {#ex-nozzle}
A supersonic wind tunnel is to run at $M = 2.0$ in a test section of $0.40 \times 0.40\ \mathrm{m}$. The reservoir is at $p_0 = 5\ \mathrm{bar}$ and $T_0 = 300\ \mathrm{K}$. Find the throat area, the mass flow, the exit velocity and density, and the pressure ratio needed to start the tunnel.
::: solution
**The test section and the throat.** $A_e = 0.16\ \mathrm{m^2}$. From the area–Mach relation at $M = 2.0$, $A / A^* = 1.687$:
$$
A^* = \frac{0.16}{1.687} = 0.0948\ \mathrm{m^2} \qquad \left( 308 \times 308\ \mathrm{mm} \right)
$$
**The mass flow.** The flow is choked, so the maximum-flux formula applies at the throat:
$$
\frac{\dot m}{A^*} = 0.6847 \times \frac{5 \times 10^5}{\sqrt{287 \times 300}}
= 0.6847 \times 1{,}704 = 1{,}166\ \mathrm{kg / s \cdot m^2}
\qquad \Rightarrow \qquad \dot m = 110.5\ \mathrm{kg / s}
$$
**The exit conditions.** At $M = 2.0$ the stagnation ratios are $T_0 / T = 1 + 0.2 \times 4 = 1.800$, $p_0 / p = 1.800^{3.5} = 7.824$ and $\rho_0 / \rho = 1.800^{2.5} = 4.347$:
$$
T_e = \frac{300}{1.800} = 166.7\ \mathrm{K}, \qquad
a_e = \sqrt{1.4 \times 287 \times 166.7} = 258.7\ \mathrm{m / s}, \qquad
V_e = 517.4\ \mathrm{m / s}
$$
$$
p_e = \frac{5}{7.824} = 0.639\ \mathrm{bar}, \qquad
\rho_0 = \frac{5 \times 10^5}{287 \times 300} = 5.808\ \mathrm{kg / m^3}, \qquad
\rho_e = \frac{5.808}{4.347} = 1.336\ \mathrm{kg / m^3}
$$
**The check, which is the part worth doing.** First the equation of state:
$$
\frac{p_e}{R T_e} = \frac{63{,}900}{287 \times 166.7} = 1.335\ \mathrm{kg / m^3} \quad \checkmark
$$
then continuity at the exit:
$$
\dot m = \rho_e V_e A_e = 1.336 \times 517.4 \times 0.16 = 110.6\ \mathrm{kg / s} \quad \checkmark
$$
and finally the throat, using $\rho^* = \rho_0 \left( 2 / (\gamma + 1) \right)^{1 / (\gamma - 1)} = 5.808 \times 0.6339 = 3.682\ \mathrm{kg / m^3}$ and $a^* = \sqrt{1.4 \times 287 \times 250} = 316.9\ \mathrm{m / s}$:
$$
\dot m = \rho^* a^* A^* = 3.682 \times 316.9 \times 0.0948 = 110.7\ \mathrm{kg / s} \quad \checkmark
$$
**The number that makes the three-way check the whole point of the exercise.** $T_0 / T$ at $M = 2$ is $1.800$ and **not** the $1.200$ that applies at $M = 1$; **using $1.200$ gives $T_e = 250\ \mathrm{K}$, $\rho_e = 0.891\ \mathrm{kg / m^3}$ and $\dot m = 90.4\ \mathrm{kg / s}$ — a $22\ \%$ error that survives every intermediate step and is caught only by the continuity check.** The reason the mistake is so common is that the $M = 1$ values $0.833$, $0.528$ and $1.200$ are memorised as "the throat numbers" and reused as if they belonged to the exit.
**The starting pressure ratio.** To run shock-free the tunnel needs $p_0 / p_b > 7.82$. But to **start** it — to swallow the normal shock that sits in the divergent part — it needs only enough ratio to hold a normal shock at the exit plane, where the subsonic pressure behind the shock is $4.50$ times the supersonic pressure in front:
$$
\left( \frac{p_0}{p_b} \right)_{\mathrm{start}} = \frac{7.824}{4.500} = 1.74
$$
**The number that makes a supersonic wind tunnel expensive.** Once running, the tunnel must hold $p_0 / p_b > 7.82$, which for atmospheric exhaust means a reservoir at $7.8$ bar **and** a $110\ \mathrm{kg / s}$ throughput — $57\ \mathrm{MW}$ of compressor power. **The reason a continuous supersonic tunnel of this size is rare and a blow-down tunnel of the same section is common is that the blow-down stores the $5\ \mathrm{bar}$, $300\ \mathrm{K}$ air in a $100\ \mathrm{m^3}$ vessel and runs for $90\ \mathrm{s}$, which is enough for a model survey and costs a hundredth of the compressor.**
$$
t_{\mathrm{run}} = \frac{p_0 V}{\dot m R T_0} = \frac{5 \times 10^5 \times 100}{110.5 \times 287 \times 300} = 59\ \mathrm{s}
$$
**The number that makes the run time a design variable.** A $100\ \mathrm{m^3}$ reservoir gives $59\ \mathrm{s}$; **a $15\ \mathrm{K}$ temperature rise from an upstream heater doubles it to $118\ \mathrm{s}$** — and the reason a blow-down tunnel's data quality is poor at the end of the run is that the reservoir pressure and temperature are both falling, so the Reynolds number drifts by $30\ \%$ and the run must be logged against time.
*Sanity.* The reason the exit Mach number is set by the area ratio and not by the pressure ratio is that once the flow is choked the throat decouples the reservoir from the back pressure; **the back pressure decides only whether the design Mach number is reached cleanly, with a shock inside, or with a shock outside.** The reason a tunnel's operating chart is drawn as Mach number against reservoir pressure and not against back pressure is that the area ratio is fixed by the geometry and the pressure ratio is the operator's only control.
:::
:::

::: example A supersonic intake {#ex-inlet}
A supersonic transport cruises at $M_0 = 2.2$ at $13{,}700\ \mathrm{m}$ where $p = 22.8\ \mathrm{kPa}$ and $T = 216.7\ \mathrm{K}$. Compare the total-pressure recovery of (a) an intake with a blunt lip, so that a normal shock stands ahead of it, (b) an intake with one $12^\circ$ external ramp, and (c) an intake with ramps of $12^\circ$ and $10^\circ$.
::: solution
**The freestream stagnation pressure.**
$$
p_{00} = 22.8 \left( 1 + 0.2 \times 4.84 \right)^{3.5} = 22.8 \times 1.968^{3.5} = 22.8 \times 10.70 = 244.0\ \mathrm{kPa}
$$
**(a) A normal shock at the face.** $M_1 = 2.2$, $M_1^2 = 4.84$:
$$
\frac{p_2}{p_1} = 1 + \frac{2.8}{2.4} \times 3.84 = 5.480, \qquad
M_2^2 = \frac{0.4 \times 4.84 + 2}{2.8 \times 4.84 - 0.4} = \frac{3.936}{13.152} = 0.2993, \quad M_2 = 0.547
$$
$$
\frac{p_{02}}{p_{01}} = 5.480 \times \frac{\left( 1 + 0.2 \times 0.2993 \right)^{3.5}}{10.70}
= 5.480 \times \frac{1.2257}{10.70} = \mathbf{0.628}
$$
**(b) One $12^\circ$ ramp.** The $\theta$–$\beta$–$M$ relation gives $\beta = 38.0^\circ$ for the weak solution:
$$
M_{1n} = 2.2 \sin 38.0^\circ = 1.355, \qquad M_{1n}^2 = 1.835
$$
$$
\frac{p_2}{p_1} = 1 + 1.1667 \times 0.835 = 1.974, \qquad
M_{2n}^2 = \frac{0.4 \times 1.835 + 2}{2.8 \times 1.835 - 0.4} = 0.577, \quad M_{2n} = 0.760
$$
$$
M_2 = \frac{M_{2n}}{\sin \left( \beta - \delta \right)} = \frac{0.760}{\sin 24.0^\circ} = \mathbf{1.73} \quad \text{— still supersonic}
$$
$$
\frac{p_{02}}{p_{01}} = 1.974 \times \frac{\left( 1 + 0.2 \times 0.577 \right)^{3.5}}{\left( 1 + 0.2 \times 1.835 \right)^{3.5}}
= 1.974 \times \frac{1.4657}{2.987} = \mathbf{0.969}
$$
**The terminal normal shock** at $M = 1.73$ costs a further factor of $0.842$, so
$$
\frac{p_{0,\mathrm{face}}}{p_{00}} = 0.969 \times 0.842 = \mathbf{0.816}
$$
**(c) Two ramps, $12^\circ$ then $10^\circ$.** The second ramp runs at $M_1 = 1.73$ and $\delta = 10^\circ$, for which $\beta = 46.1^\circ$ and $M_{1n} = 1.249$:
$$
\frac{p_{03}}{p_{02}} = 0.987, \qquad M_3 = \frac{0.813}{\sin 36.1^\circ} = 1.38
$$
**and the terminal normal shock at $M = 1.38$ costs only $0.963$:**
$$
\frac{p_{0,\mathrm{face}}}{p_{00}} = 0.969 \times 0.987 \times 0.963 = \mathbf{0.921}
$$
$$
\begin{array}{l c c c}
\text{Intake} & \text{ramp losses} & \text{terminal normal shock} & \text{recovery} \\
\text{(a) blunt lip} & - & M = 2.2 & 0.628 \\
\text{(b) one } 12^\circ \text{ ramp} & 0.969 & M = 1.73 \to 0.842 & 0.816 \\
\text{(c) } 12^\circ + 10^\circ & 0.957 & M = 1.38 \to 0.963 & 0.921
\end{array}
$$
**The reading, which is the whole of intake design.** **The second ramp costs almost nothing — $1.3\ \%$ — and buys back $14\ \%$ by lowering the Mach number entering the terminal shock.** The reason is the cube law: the loss across a shock goes as $\left( M^2 - 1 \right)^3 / M^2$ near $M = 1$, so dropping the terminal shock from $M = 2.2$ to $M = 1.38$ cuts its loss from $37\ \%$ to $3.7\ \%$. **The reason an intake is therefore a cascade of weak oblique shocks ending in one deliberately weak normal shock is that the normal shock cannot be eliminated — the engine needs subsonic flow — but its strength can be chosen, and the choice is made by the ramp angles.**
**The thrust consequence.** Net thrust is roughly proportional to the mass flux at the engine face, which is proportional to the total pressure there:
$$
\frac{F_{(c)}}{F_{(a)}} \approx \frac{0.921}{0.628} = 1.47
$$
**a $47\ \%$ more thrust for two ramps and a variable-geometry actuator** — and the reason a Mach $2.2$ transport's intake is a variable-geometry item is that the optimum ramp angle scales with the flight Mach number, so a fixed $12^\circ$ ramp that is right at cruise is a $30\ \%$ loss at take-off, where the intake must be re-set to $4^\circ$ or opened to a secondary throat.
**The number that makes the Concorde's intake a control problem.** At take-off the intake contributed only $35\ \%$ of the installed thrust and at cruise $70\ \%$; **its compression ratio at Mach $2$ was $7.1:1$**, and the reason the engine's high-pressure compressor could be smaller than a subsonic transport's at the same thrust is that the intake had already done $7:1$ of the compression. **The reason the intake had to be bled and dumped at low speed is that a $7:1$ intake at zero flight speed is a $7:1$ restriction that chokes the engine and stalls the compressor**, and the reason the intake's throat area was scheduled against Mach number to within $2\ \%$ is that a mismatch of $10\ \%$ in throat area costs $2\ \%$ in thrust-specific fuel consumption.
*Sanity.* The reason the total-pressure recovery is the right figure of merit and not the static-pressure rise is that the engine's mass flow is set by the total pressure and total temperature at the face. **A recovery of $0.92$ against $0.63$ is a $47\ \%$ difference in thrust and about $15\ \%$ in fuel burn at cruise**, and the reason a military intake designed for $M = 2.2$ accepts $0.75$ where a transport demands $0.90$ is that the military intake must also work at $15^\circ$ incidence and the transport need not.
:::
:::

::: example A relief valve {#ex-relief}
A vessel of $5\ \mathrm{m^3}$ contains air at $10\ \mathrm{bar}$ and $300\ \mathrm{K}$. A safety valve of throat area $250\ \mathrm{mm^2}$ opens to atmosphere at $1\ \mathrm{bar}$. Find the initial mass flow, the initial deceleration of the vessel pressure, and the time for the pressure to fall to $2\ \mathrm{bar}$.
::: solution
**The choking check.** The critical back-pressure ratio for air is $0.528$; here $p_b / p_0 = 0.1 < 0.528$, so **the valve is choked** and the flow is independent of the atmospheric pressure.
**The initial mass flow.**
$$
\dot m_0 = 0.6847 \times \frac{10 \times 10^5}{\sqrt{287 \times 300}} \times 250 \times 10^{- 6}
= 0.6847 \times 3{,}408 \times 2.5 \times 10^{- 4} = 0.584\ \mathrm{kg / s}
$$
**The initial depressurisation rate.** With $m = p V / R T$ and an isentropic blowdown $T = T_0 \left( p / p_0 \right)^{\left( \gamma - 1 \right) / \gamma}$:
$$
m = \frac{V p_0^{1 / \gamma}}{R T_0} p^{1 - 1 / \gamma}
\qquad \Rightarrow \qquad
\frac{d m}{d p} = \frac{V p_0^{1 / \gamma}}{\gamma R T_0} p^{- 1 / \gamma}
= 2.149 \times 10^{- 3} p^{- 0.2857}
$$
At $p = p_0 = 10\ \mathrm{bar}$ this is $4.15 \times 10^{- 5}\ \mathrm{kg / Pa}$, so
$$
\left| \frac{d p}{d t} \right|_0 = \frac{0.584}{4.15 \times 10^{- 5}} = 14.1\ \mathrm{kPa / s}
$$
**The blowdown time.** Because the gas cools as it expands, the mass flux is not proportional to $p$ but to
$$
\dot m = 0.6847\, A\, \frac{p}{\sqrt{R T_0}} \left( \frac{p}{p_0} \right)^{- \left( \gamma - 1 \right) / 2 \gamma}
\qquad \Rightarrow \qquad \dot m \propto p^{0.857}
$$
**and integrating $dt = - \left( d m / d p \right) dp / \dot m$ from $10$ to $2\ \mathrm{bar}$ gives**
$$
t = 511.6 \times 7 \left[ \left( 2 \times 10^5 \right)^{- 0.1429} - \left( 10^6 \right)^{- 0.1429} \right]
= 3{,}581 \times \left( 0.1749 - 0.1389 \right) = \mathbf{129\ s}
$$
**The check that makes the integral trustworthy.** The vessel holds $m_0 = p_0 V / R T_0 = 58.1\ \mathrm{kg}$ initially and $m = 18.4\ \mathrm{kg}$ at $2\ \mathrm{bar}$, so $39.7\ \mathrm{kg}$ must leave; **the mean discharge over the $129\ \mathrm{s}$ is $0.31\ \mathrm{kg / s}$, which is $53\ \%$ of the initial rate — exactly what a $p^{0.857}$ law integrated over a five-fold pressure drop should give.**
**The number that makes the valve's response time a sizing item.** The valve opens in $60$ to $120\ \mathrm{ms}$ and the vessel blows down in $129\ \mathrm{s}$, so the quasi-steady assumption is excellent — **but a small receiver, say $0.05\ \mathrm{m^3}$, blows down in $1.3\ \mathrm{s}$, which is ten valve-response times, and the reason a compressed-air system's relief sizing must include the receiver volume is that a small receiver with a large valve chatters and a chattering valve loses its set pressure.**
**The temperature at the throat.** $T^* = 300 \times 0.833 = 250\ \mathrm{K}$ at the start, and the vessel's gas cools to $T = 300 \times 0.2^{0.2857} = 189\ \mathrm{K}$ at $2\ \mathrm{bar}$. **The number that makes a blowdown a materials problem is that $189\ \mathrm{K}$ is below the ductile–brittle transition of a carbon-steel vessel**, and the reason a compressed-air receiver's blowdown valve is specified with a minimum wall temperature is that a vessel that can be depressurised to atmosphere must be tested for the resulting metal temperature.
*Sanity.* The reason the flow is independent of the back pressure once choked is that the throat is sonic and a pressure disturbance downstream cannot travel upstream past it. **The reason a choked valve's capacity is quoted at a $10\ \%$ overpressure and not at the set pressure is that a valve lifts only partially, and the certified capacity of a safety valve is $0.9 \times$ the theoretical choked flow** — the $0.9$ being the discharge coefficient, and the reason it is $0.9$ and not $0.7$ is that a well-rounded nozzle approaches the ideal.
:::
:::

::: example Wave drag and the area rule {#ex-wavedrag}
A biconvex airfoil of thickness ratio $t / c = 0.10$ flies at $M = 1.6$ and zero incidence. Find the wave-drag coefficient from linear theory, and compare it with the same section at $M = 1.2$.
::: solution
**Ackeret's linear theory.** For a thin profile at supersonic speed the wave-drag coefficient is
$$
\boxed{ c_d = \frac{2}{\sqrt{M^2 - 1}} \overline{\left( \frac{dy}{dx} \right)^2} }
\qquad \left[ \text{both surfaces, per unit span, referred to } c \right]
$$
**The Ackeret drag integral.** The pressure coefficient on a slender surface inclined at $\theta$ to the stream is $C_p = 2 \theta / \sqrt{M^2 - 1}$ in compression and $- 2 \theta / \sqrt{M^2 - 1}$ in expansion, and integrating the streamwise component of the surface pressure over both faces gives
$$
c_d = \frac{2}{\sqrt{M^2 - 1}} \cdot \frac{1}{c} \int_0^c \left[ \left( \frac{d y_u}{d x} \right)^2 + \left( \frac{d y_l}{d x} \right)^2 \right] dx
$$
**The Ackeret drag integral.** The pressure coefficient on a slender surface inclined at $\theta$ to the stream is $C_p = 2 \theta / \sqrt{M^2 - 1}$ in compression and $- 2 \theta / \sqrt{M^2 - 1}$ in expansion, and integrating the streamwise component of the surface pressure over both faces gives
$$
c_d = \frac{2}{\sqrt{M^2 - 1}} \cdot \frac{1}{c} \int_0^c \left[ \left( \frac{d y_u}{d x} \right)^2 + \left( \frac{d y_l}{d x} \right)^2 \right] dx
$$
**The mean square slope.** For a symmetric biconvex section $y_u = \left( t / 2 \right) \left[ 1 - \left( 2 x / c - 1 \right)^2 \right]$, so $d y_u / d x = - \left( 2 t / c \right) \left( 2 x / c - 1 \right)$ and, writing $\tau = t / c$,
$$
\frac{1}{c} \int_0^c \left[ \left( y_u^\prime \right)^2 + \left( y_l^\prime \right)^2 \right] dx
= 2 \times 4 \tau^2 \int_0^1 \left( 2 \xi - 1 \right)^2 d \xi = \frac{8 \tau^2}{3} = \frac{8 \times 0.01}{3} = 0.02667
$$
$$
\boxed{ c_d = \frac{16 \tau^2}{3 \sqrt{M^2 - 1}} }
$$
**At** $M = 1.6$, $\sqrt{M^2 - 1} = 1.249$:
$$
c_d = \frac{16 \times 0.01}{3 \times 1.249} = 4.27 \times 10^{- 2} \qquad \left( 427 \text{ drag counts} \right)
$$
**At** $M = 1.2$, $\sqrt{M^2 - 1} = 0.663$:
$$
c_d = \frac{0.16}{3 \times 0.663} = 8.04 \times 10^{- 2} \qquad \left( 804 \text{ counts} \right)
$$
**The number that makes a $10\ \%$-thick section at $M = 1.2$ an impossibility.** **Linear theory gives $804$ counts of wave drag for a section that a subsonic aircraft would carry without comment** — and the reason the real measured value is lower is that linear theory overpredicts the drag within about $\left| M - 1 \right| < 0.15$, where the perturbation potential equation changes type, the shocks strengthen beyond the linear value and then the theory breaks down altogether. **The reason an airliner's drag-divergence Mach number is defined at a $10$-count drag rise rather than at the theoretical singularity is that the theory is useless in the last $0.1$ of Mach number and the experiment is the only arbiter.**
**The two scalings that govern supersonic shape.** $c_d \propto \tau^2$: **halving the thickness quarters the wave drag**, and the reason a supersonic aircraft's wing is $3$ to $5\ \%$ thick and its structure a torsion box of near-constant depth is that the drag saving of a thin wing is worth the structural weight of a deep spar. And $c_d \propto 1 / \sqrt{M^2 - 1}$: **the drag falls as the Mach number rises above $1.4$**, and the reason a Mach $2$ reconnaissance aircraft is easier to fly than a Mach $1.2$ one is that its wave drag per unit thickness is $2.4$ times lower — the transonic region, not the supersonic region, is the expensive one.
**The area rule.** The same $1 / \sqrt{M^2 - 1}$ factor applies to the whole aircraft's volume distribution, and the wave drag is minimised when the **cross-sectional area distribution** along the fuselage is as smooth as possible:
$$
C_{D, w} \propto \frac{S_{\max}^2}{\ell^2} \cdot \frac{1}{\sqrt{M^2 - 1}} \cdot K \left( \text{area-law shape} \right)
$$
**The number that makes the area rule the most valuable single idea in transonic design.** A fighter with a **cylinder** fuselage and a wing of $10\ \%$ thickness has a $50\ \%$ drag rise at $M = 1.05$; **area-ruling the same airframe — narrowing the fuselage where the wing joins, the "Coke bottle" — reduces the peak by $25\ \%$** and moves the drag-divergence Mach number from $0.95$ to $1.05$. **The reason a modern airliner's centre fuselage is visibly pinched and the reason a business jet's wing glove is a carefully faired shoulder is that the area rule is enforced to within $1\ \%$ of the cross-sectional area at every station**, and the reason a wing's sweep is chosen at the same time is that sweep reduces the **effective** Mach number by $\cos \Lambda$ and buys $0.15$ of Mach number for nothing but a structural penalty.
*Sanity.* The reason $c_d \propto \left( t / c \right)^2$ is that the drag is proportional to the square of the disturbance slope, and the reason thickness is the dominant wave-drag variable is that the slope enters squared: **halving the thickness ratio quarters the wave drag**, and the reason a supersonic aircraft's wing is therefore $3$ to $5\ \%$ thick and its structure is a torsion box of near-constant depth is that the drag saving of a thin wing is worth the structural weight of a deep spar.
:::
:::

::: history
**Stokes** derived the speed of sound in 1849 from the wrong thermodynamics — Newton's 1687 isothermal value was $15\ \%$ low — and **Laplace**'s 1816 correction to an adiabatic process, which required the ratio of specific heats nobody had measured, was vindicated only when **Clement and Désormes** measured $\gamma = 1.41$ for air in **1819**. **Rankine** (1870), **Hugoniot** (1887) and **Fanning** (1888) derived the shock relations independently, and **Hugoniot**'s version was obtained from the energy equation alone; **the entropy condition that selects the physical solution was not stated until the 1940s.** **Prandtl**'s 1904 note, **Ackeret**'s 1925 supersonic-drag formula and **Jakob Ackeret**'s 1928 wind-tunnel nozzle design came out of the same Göttingen–Zürich school; **the de Laval nozzle is of 1888, and its throat was understood as a flow-measuring device for thirty years before its supersonic function was explained.** **The oblique-shock theory is due to Prandtl (1922) and to Ackeret; the Prandtl–Meyer expansion function was published by Meyer in 1908 and interpreted physically by Prandtl in 1922, and the theory was first used to design a supersonic nozzle by Puckert in 1921.** **The one-dimensional duct flows are Fanno's 1904 thesis and Rayleigh's 1910 note**, and **the reason the two are still taught side by side is that they are the only two exactly solvable compressible duct flows and every real duct is a perturbation of one or the other.** **The transonic small-disturbance equation and the area rule are Whitcomb's 1952 NACA report at Langley, and the reason the discovery was made on a fighter programme and published as a research note is that the F-102's first flight had been a public embarrassment — the aircraft was eleven per cent short of its design speed — and the area-rule fix, applied in fourteen months, gained the missing speed.**
:::

::: quiz
A convergent–divergent nozzle designed for $M_e = 2.0$ is fed from a reservoir and discharges into an ambient that gives exactly the design pressure ratio, until a normal shock stands in the divergent section. Downstream of the shock:

- [ ] The flow is supersonic but at a lower Mach number
- [x] The flow is subsonic, the remainder of the nozzle acts as a diffuser, and about $28\ \%$ of the total pressure has been destroyed
- [ ] The Mach number is unchanged and only the static pressure rises
- [ ] The throat re-chokes and the mass flow falls

::: solution
**Subsonic, at $M_2 = 0.577$, with $p_{0 2 } / p_{0 1 } = 0.7209$.** Across a normal shock at $M_1 = 2.0$ the static pressure quadruples, the temperature rises by a factor of $1.688$, and the total pressure falls by $27.9\ \%$ — an irreversible loss of the reservoir's ability to do work, produced by a discontinuity a few mean free paths thick that no equation of state was needed to describe. **The mass flow does not change, because the throat is still choked and the mass flow depends only on the reservoir state and the throat area; what changes is that the nozzle now expands to the shock and then diffuses, so the exit pressure is far above the design value and the thrust is that of a much poorer nozzle.** This is why "start" is a real verb in rocket and wind-tunnel practice: a supersonic nozzle must be run at a pressure ratio *better* than its design value to sweep the shock out of the throat region, and once a shock is swallowed the nozzle will keep a shock inside even after the ratio is restored. **The $28\ \%$ is the number to remember, because it reappears as the difference between a supersonic inlet with a ramp and one with a single blunt normal shock, and it is the whole reason the SR-71's intake cones moved.**
:::
:::

## Where this leads

The stagnation and choking relations are the whole of [[fluid-mechanics/pipe-flow]]'s compressible extension and of relief-valve sizing; the shock relations are the input to [[aerodynamics]]' supersonic theory and [[propulsion]]'s inlets and nozzles; the area rule is the reason [[flight-mechanics]]' transonic drag rise sets an airliner's cruise Mach at $0.78$ and not $0.92$; and the wave-drag law is the reason [[aerodynamics]]' wings are swept and [[propulsion]]'s fan blades are lean.

::: summary
- Compressibility is a statement about energy: at $M=0.3$ the incompressible error in $p_0$ is $1.8\%$, at $M=1$ it is $25\%$.
- $a=\sqrt{\gamma RT}$ depends on temperature alone; choking fixes the mass flux at $0.6847\,p_0/\sqrt{RT_0}$ per unit throat area for air.
- $dA/A=(M^2-1)\,dV/V$: accelerate subsonically in a convergent duct and supersonically in a divergent one, with a sonic throat between.
- A normal shock is adiabatic but not isentropic: $T_0$ constant, $p_0$ down $27.9\%$ at $M_1=2$, density ratio bounded at $6$.
- Only the normal velocity component crosses an oblique shock; the downstream flow can be supersonic, and many weak shocks beat one strong one.
- An expansion is isentropic and bounded: $\nu_{\max}=130.5^\circ$ for air.
- Fanno flow moves toward $M=1$ with friction; Rayleigh flow moves toward $M=1$ with heat, and heat addition at subsonic $M>0.845$ cools the gas.
- Wave drag scales as $(t/c)^2/\sqrt{M^2-1}$: thickness and Mach number are the two design variables, and the area rule attacks the first.
:::

## Exercises

::: exercise Speed of sound {level=1 check="343.2"}
Give the speed of sound in air at $20\ {}^{\circ}\mathrm{C}$ in metres per second.
::: solution
$a=\sqrt{1.4\times287\times293.2}=343.2\ \mathrm{m/s}$.
:::
:::

::: exercise Stagnation temperature {level=1 check="319.1"}
Air at $288\ \mathrm{K}$ flows at $250\ \mathrm{m/s}$. Give the stagnation temperature in kelvin.
::: solution
$a=\sqrt{1.4\times287\times288}=340.2\ \mathrm{m/s}$, so $M=250/340.2=0.735$ and $T_0=288(1+0.2\times0.540)=288\times1.108=319.1\ \mathrm{K}$.
:::
:::

::: exercise Critical pressure ratio {level=1 check="0.528"}
Give the back-pressure ratio at which a convergent air nozzle first chokes.
::: solution
$p^*/p_0=(2/(\gamma+1))^{\gamma/(\gamma-1)}=0.528$.
:::
:::

::: exercise Area ratio {level=1 check="1.687"}
Give $A/A^*$ for a supersonic air nozzle at $M=2.0$.
::: solution
$A/A^*=(1/2)[(2+0.4\times4)/2.4]^3=0.5\times1.5^3=1.687$.
:::
:::

::: exercise Normal-shock pressure ratio {level=1 check="4.50"}
Give $p_2 / p_1$ across a normal shock at $M_1 = 2.0$.
::: solution
$p_2/p_1 = 1+\frac{2\times1.4}{2.4}(4-1)=1+3.5=4.50$.
:::
:::

::: exercise Total-pressure loss {level=1 check="27.9"}
Give the total-pressure loss in per cent across a normal shock at $M_1 = 2.0$.
::: solution
$p_{02}/p_{01}=0.7209$, a loss of $27.9\%$.
:::
:::

::: exercise Mach angle {level=1 check="30.0"}
Give the Mach angle in degrees for $M = 2.0$.
::: solution
$\mu=\arcsin(1/2)=30.0^\circ$.
:::
:::

::: exercise Downstream Mach number {level=1 check="0.378"}
Give the limiting downstream Mach number behind a very strong normal shock in air.
::: solution
$M_2\to\sqrt{(\gamma-1)/(2\gamma)}=\sqrt{0.4/2.8}=0.378$.
:::
:::

::: exercise Maximum mass flux {level=2}
Air at $p_0 = 20\ \mathrm{bar}$ and $T_0 = 500\ \mathrm{K}$ discharges through a throat of $500\ \mathrm{mm^2}$. Give the choked mass flow.
::: solution
$$
\dot m = 0.6847 \times \frac{20 \times 10^5}{\sqrt{287 \times 500}} \times 500 \times 10^{- 6}
= 0.6847 \times 5{,}280 \times 5 \times 10^{- 4} = 1.81\ \mathrm{kg / s}
$$
**The reason the answer is independent of the receiver pressure downstream is that the throat is sonic**, and the reason a $500\ \mathrm{mm^2}$ throat passes $1.81\ \mathrm{kg / s}$ of air at these conditions and only $0.117\ \mathrm{kg / s}$ at atmospheric stagnation conditions and $300\ \mathrm{K}$ is that the flux is proportional to $p_0 / \sqrt{T_0}$ — a factor of $20$ from the pressure and $0.775$ from the temperature.
:::
:::

::: exercise Prandtl–Meyer {level=2}
A supersonic flow at $M_1 = 2.0$ expands around a convex corner of $20^\circ$. Give the downstream Mach number.
::: solution
$$
\nu \left( M_2 \right) = \nu \left( 2.0 \right) + 20^\circ = 26.4 + 20 = 46.4^\circ
$$
**Interpolating the Prandtl–Meyer table**, $\nu = 46.4^\circ$ corresponds to $M_2 \approx 2.82$. **The reason the expansion is computed by adding angles and not Mach numbers is that $\nu$ is the variable that is conserved across the fan**, and the reason a $20^\circ$ turn is a large one is that it takes the flow from $M = 2$ to $M = 2.8$ and drops the static pressure by a factor of $5.4$.
:::
:::

::: exercise Derivation {level=3}
Derive the area–Mach number relation from continuity, the momentum equation and the isentropic relations, and show that the minimum area occurs at $M = 1$.
::: solution
**Continuity in logarithmic form.** $\rho V A = $ constant gives
$$
\frac{d \rho}{\rho} + \frac{d V}{V} + \frac{d A}{A} = 0
$$
**The momentum equation** for an inviscid steady streamtube is $d p = - \rho V\, d V$, and with $a^2 = d p / d \rho$ for an isentropic process:
$$
\frac{d p}{\rho a^2} = - \frac{V\, d V}{a^2}
\qquad \Rightarrow \qquad
\frac{d \rho}{\rho} = \frac{d p}{\rho a^2} = - M^2 \frac{d V}{V}
$$
**Substitute into continuity:**
$$
- M^2 \frac{d V}{V} + \frac{d V}{V} + \frac{d A}{A} = 0
\qquad \Rightarrow \qquad
\boxed{ \frac{d A}{A} = \left( M^2 - 1 \right) \frac{d V}{V} }
$$
**The minimum-area condition.** At a minimum or maximum of area $d A = 0$, so either $M = 1$ or $d V = 0$. **A smooth duct with $d V = 0$ at an area extremum is a trivial solution**; the non-trivial one is $M = 1$, so **a duct that passes from subsonic to supersonic flow must have a sonic throat, and a duct whose area has a minimum at a point where the flow is not sonic cannot change regime there.**
**The integration.** Continuity with $V = M a = M \sqrt{\gamma R T}$ and $\rho = p / R T$:
$$
\dot m = \frac{p}{R T} M \sqrt{\gamma R T}\, A = \frac{p M A}{\sqrt{R T / \gamma}}
$$
**Divide by the same expression at the sonic throat** (denoted by $*$) and use the isentropic relations $p / p_0 = \left( T / T_0 \right)^{\gamma / \left( \gamma - 1 \right)} \left( \cdot \right)$ and $T / T_0 = 2 / \left( 2 + \left( \gamma - 1 \right) M^2 \right)$:
$$
\frac{A}{A^*} = \frac{p_0}{p} \frac{p}{p^*} \frac{M^*}{M} \sqrt{\frac{T}{T^*}}
$$
**with** $M^* = 1$, $p^* / p_0 = \left( 2 / \left( \gamma + 1 \right) \right)^{\gamma / \left( \gamma - 1 \right)}$ **and** $T / T^* = \left( \gamma + 1 \right) / \left( 2 + \left( \gamma - 1 \right) M^2 \right)$. **Collecting the powers of** $\left( 1 + \frac{\gamma - 1}{2} M^2 \right)$:
$$
\boxed{ \frac{A}{A^*} = \frac{1}{M} \left[ \frac{2 + \left( \gamma - 1 \right) M^2}{\gamma + 1} \right]^{\left( \gamma + 1 \right) / \left[ 2 \left( \gamma - 1 \right) \right]} }
$$
**The check.** At $M = 1$ the bracket is $\left( \gamma + 1 \right) / \left( \gamma + 1 \right) = 1$ and $A / A^* = 1$; and $d \left( A / A^* \right) / dM = 0$ at $M = 1$, confirming the minimum.
*Sanity.* The reason the relation is double-valued is that the derivation used only the isentropic relations and continuity, which do not distinguish the two branches; **the branch is selected by the pressure ratio**, and the reason a convergent–divergent nozzle can be subsonic throughout at a high back pressure and supersonic after a shock at a low one is that both solutions satisfy the same algebraic equation.
:::
:::

::: exercise Design {level=3}
Design the **blow-off and relief system for a steam drum** of $12\ \mathrm{m^3}$ water inventory operating at $60\ \mathrm{bar}$ and $275\ {}^{\circ}\mathrm{C}$, with a maximum steam generation of $40\ \mathrm{kg / s}$, and state the sizing, the dynamics, the failure modes and the acceptance tests.
::: solution
**The duty.** The relief case is **loss of the main steam stop valve with the burner still firing** — the full $40\ \mathrm{kg / s}$ must leave through the valves, and the drum pressure must not exceed $110\ \%$ of the maximum allowable working pressure.
**The fluid.** At $60\ \mathrm{bar}$ saturated steam: $T_s = 275.6\ {}^{\circ}\mathrm{C} = 548.8\ \mathrm{K}$, $v_g = 0.03244\ \mathrm{m^3 / kg}$, $\rho_g = 30.8\ \mathrm{kg / m^3}$, $h_{fg} = 1{,}668\ \mathrm{kJ / kg}$, and $\gamma$ for wet steam is taken as $1.135$ by convention for sizing.
**The choked mass flux.** The general coefficient is
$$
\left( \frac{\dot m}{A} \right)_{\max} = C \left( \gamma \right) \frac{p_0}{\sqrt{R T_0}}, \qquad
C \left( \gamma \right) = \sqrt{ \gamma \left( \frac{2}{\gamma + 1} \right)^{\left( \gamma + 1 \right) / \left( \gamma - 1 \right)} }
$$
$$
\begin{array}{c c c c c}
\gamma & 1.135 & 1.200 & 1.300 & 1.400 \\
C \left( \gamma \right) & 0.6246 & 0.6363 & 0.6578 & 0.6847
\end{array}
$$
**The number that makes wet steam a special case.** For saturated steam the code convention is $\gamma = 1.135$, which gives $C = 0.6246$ — **$9\ \%$ below the air value** — and the reason a superheater's safety valve sized with $\gamma = 1.4$ is undersized is that the coefficient is $9\ \%$ low and the superheat raises $T_0$, and the flux goes as $1 / \sqrt{T_0}$.
**The ASME-certified form**, with $p_0$ in bar absolute, $A$ in $\mathrm{mm^2}$, $W$ in $\mathrm{kg / h}$, $M = 18.02$, $Z = 0.85$ and $K_d = 0.975$:
$$
W = 51.4\ C\ K_d\ A\ p_0 \sqrt{ \frac{M}{Z T_0} }
= 51.4 \times 0.6246 \times 0.975 \times 66 \times \sqrt{ \frac{18.02}{0.85 \times 548.8} }\ A
= 51.4 \times 0.6246 \times 0.975 \times 66 \times 0.1966\ A = 408\ A
$$
**The required area.** $W = 40\ \mathrm{kg / s} = 144{,}000\ \mathrm{kg / h}$ at $110\ \%$ accumulation:
$$
A = \frac{144{,}000}{408} = 353\ \mathrm{mm^2} \qquad \left( d = 21.2\ \mathrm{mm} \right)
$$
**The number that makes the installation a two-valve installation.** A single $353\ \mathrm{mm^2}$ valve is a $2$-inch inlet, $3$-inch outlet safety valve; **the code requires that the total relief area be carried by not more than two valves set within $3\ \%$, and that no valve be smaller than a DN25** — and the reason a boiler's relief is duplicated is that a valve can stick shut on a weld spatter and a single-valve installation has no redundancy against the one failure mode that matters.
**The dynamics — the reason sizing is not the end of it.** The drum contains $12\ \mathrm{m^3}$ of water and steam; **the water inventory's thermal inertia sets the pressure-rise rate** at loss of the steam outlet:
$$
\frac{d p}{d t} = \frac{\dot Q}{m_w c_p \left( \partial T / \partial p \right)_{\mathrm{sat}}}
\qquad \text{with } m_w = 9{,}000\ \mathrm{kg},\ \dot Q = 67\ \mathrm{MW}
$$
**The saturation curve's steepness is the safety margin:** $d T_s / d p = 0.93\ \mathrm{K / bar}$ at $60\ \mathrm{bar}$, so a $6$-bar overpressure needs $5.6\ \mathrm{K}$ of extra sensible heat, which at $67\ \mathrm{MW}$ takes
$$
\Delta t = \frac{9{,}000 \times 5.0 \times 5.6}{67 \times 10^6} = 3.8\ \mathrm{s}
$$
**The number that makes the valve's opening time a safety item.** A spring-loaded safety valve takes $0.2$ to $0.5\ \mathrm{s}$ to open fully and has a $3$ to $5\ \%$ blowdown, so **the $3.8\ \mathrm{s}$ is ten opening times and the installation is safe — but a drum with $1.2\ \mathrm{m^3}$ of water has $0.38\ \mathrm{s}$, which is one opening time, and the reason a once-through boiler cannot be protected by a safety valve at all is that its water inventory is a tube bundle and not a drum**.
**The failure modes.**
$$
\begin{array}{l l}
\text{Chatter} & \text{over-capacity or long inlet line; destroys the seat in minutes} \\
\text{Seat leakage at } 90\ \% \text{ of set} & \text{steam cutting, then a full-bore failure in months} \\
\text{Inlet-line blockage} & \text{a scale flake or a closed stop valve; the code forbids a stop valve} \\
\text{Outlet back-pressure} & \text{a common header above } 10\ \% \text{ set lifts the valve early} \\
\text{Reaction force} & \text{the } 40\ \mathrm{kg / s} \text{ discharge gives } 12\ \mathrm{kN} \text{ of thrust; the tailpipe must be anchored} \\
\text{Freeze or corrosion seizure} & \text{an outdoor valve must be drained and its spring protected}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Capacity test} & \text{each valve tested on a certified steam rig at } 110\ \% \text{ set, capacity within } \pm 3\ \% \\
\text{Set-pressure test} & \text{cold differential set pressure corrected to temperature, within } \pm 1\ \% \\
\text{Blowdown test} & \text{reseat within the specified } 3 \text{ to } 5\ \% \\
\text{Residence-time check} & \text{the calculated } 3.8\ \mathrm{s} \text{ verified against the measured } dp / dt \text{ on a trip test} \\
\text{Tailpipe} & \text{reaction force and noise measured; } < 85\ \mathrm{dB} \text{ at the platform} \\
\text{Periodic} & \text{on-line lift test every } 12\ \text{months, bench test every } 4\ \text{years}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE RELIEF CAPACITY SHALL BE CERTIFIED ON A STEAM FLOW TEST RIG AT THE ACCUMULATION PRESSURE SPECIFIED, AND THE CERTIFIED CAPACITY SHALL BE STAMPED ON THE VALVE."** **"NO STOP VALVE OF ANY DESCRIPTION SHALL BE FITTED BETWEEN THE DRUM AND THE SAFETY VALVE, AND THE INLET SHALL BE SELF-DRAINING WITH A MINIMUM BORE EQUAL TO THE VALVE INLET."** **"THE INSTALLATION SHALL BE DEMONSTRATED TO LIMIT THE PRESSURE EXCURSION TO $110\ \%$ OF MAWP FOR THE WORST CREDIBLE CASE INCLUDING A STUCK-OPEN DRAIN VALVE AND A CLOSED STEAM STOP."** **"THE OUTLET SHALL DISCHARGE TO A SAFE LOCATION, AND THE REACTION LOAD AND NOISE SHALL BE CALCULATED AND THE SUPPORTS DESIGNED FOR THE MEASURED VALUES."**
*Design comment.* The general rule is that **a relief valve is a dynamic device sized by a steady calculation, and the calculation is only half the job** — which is why the code specifies the inlet length, the tailpipe arrangement and the periodic test interval and not only the area, and why the most common cause of a boiler's relief failure in service is not an undersized area but a blocked inlet or a seized disc.
:::
:::
