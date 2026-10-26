When a flow's speed becomes a significant fraction of the speed at which a pressure disturbance travels through it, **density stops being a constant and becomes a variable of the problem**, and with it every intuition about pressure, force and information. The dimensionless number that measures the change is the **Mach number**, and it is a ratio of two speeds because $M^2 = V^2 / \left( \gamma R T \right)$ **compares the flow's kinetic energy with its thermal energy**, which is what sets how much the density must change when the flow is brought to rest: at $M = 0.3$ the density rises by $4.6\ \%$ between the stream and a stagnation point and the incompressible approximation is within engineering tolerance; at $M = 1$ the flow **chokes** — it cannot be accelerated past the throat by lowering the downstream pressure, because the information that the pressure has been lowered travels at the speed of sound and the flow is already running at it.

Compressible flow is where fluid mechanics meets the rocket nozzle, the safety relief valve, the supersonic inlet, the steam-turbine stage, the blow-off line and the transonic airliner's wing, and its two governing facts are **one algebraic relation and one inequality**: the area-velocity relation $dA / A = \left( M^2 - 1 \right) dV / V$, which says that a nozzle must converge subsonically and diverge supersonically, and the second law applied across a shock, which says that a compression through a finite angle must be a discontinuity with a total-pressure loss and that no expansion can be as abrupt as a compression.

::: warning Seven compressible-flow errors that cost a nozzle, a valve or an airframe
**Using incompressible Bernoulli above $M \approx 0.3$.** The dynamic pressure is $q = \tfrac{1}{2} \rho V^2$ only to first order; the exact stagnation pressure is $p_0 = p \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{\gamma / \left( \gamma - 1 \right)}$, whose binomial expansion is $p_0 - p = \tfrac{1}{2} \rho V^2 \left[ 1 + \frac{M^2}{4} + \frac{2 - \gamma}{24} M^4 + \cdots \right]$. **The compressibility correction to $p_0 - p$ is $2.3\ \%$ at $M = 0.3$, $6.4\ \%$ at $M = 0.5$, $19\ \%$ at $M = 0.85$ and $28\ \%$ at $M = 1$.** A pitot traverse at $M = 0.85$ reduced with $p_0 - p = \tfrac{1}{2} \rho V^2$ therefore overestimates the velocity by about $9\ \%$. **At cruise altitude an airliner's speed limit is its maximum operating Mach number, not its maximum indicated airspeed:** at $11{,}000\ \mathrm{m}$ the speed of sound is $295\ \mathrm{m / s}$, so $M = 0.82$ is $242\ \mathrm{m / s}$ true airspeed, yet with $p \approx 22.6\ \mathrm{kPa}$ the dynamic pressure is only about $10.6\ \mathrm{kPa}$ — the airframe up there is limited by compressibility, not by load. **Forgetting that a shock loses total pressure.** Across a normal shock at $M_1 = 2.0$ the static pressure rises by a factor of $4.5$, the temperature by $1.69$, and the total pressure **falls by $27.9\ \%$**. **The loss cannot be designed away, only distributed:** near $M = 1$ the entropy rise across a shock scales as $\left( M_{1n}^2 - 1 \right)^3$ in the normal Mach number, so several weak oblique shocks lose far less than one strong normal one — which is why a mixed-compression inlet does most of its compression with ramps and leaves only a weak terminal normal shock. **Assuming the flow is not choked.** A gas flowing from a reservoir through a convergent nozzle chokes at $p_b / p_0 = 0.528$ for air, and **below that back-pressure ratio the mass flow is fixed and independent of the back pressure**. A relief valve sized on the upstream–downstream pressure difference is wrong because it is choked and the difference is irrelevant; its capacity per unit area is $0.6847\, p_0 / \sqrt{R T_0}$, set by the reservoir and not by the atmosphere it discharges into. **Using the reservoir state where the throat state belongs.** The choked mass flux uses $p_0$ and $T_0$; the throat's static pressure is $0.528\, p_0$, its density $0.634\, \rho_0$ and its static temperature $0.833\, T_0$ — **factors of $1.89$, $1.58$ and $1.2$** — and a nozzle calculation that comes out wrong on the first attempt has nearly always used a static property where a stagnation one belongs, or the reverse. **Treating an oblique shock as if it turned the flow through the full deflection in the normal direction.** Only the **normal** component of the velocity is subsonic downstream; the tangential component is unchanged. **The downstream Mach number can be supersonic behind an oblique shock** — at $M_1 = 3$ and $\delta = 10^\circ$ it is $2.51$ — and a supersonic inlet keeps the flow supersonic through its ramp shocks and accepts one normal shock at the end because that shock is then weak: a normal shock at $M = 1.5$ loses $7\ \%$ of the total pressure, where one at $M = 3$ loses $67\ \%$. **Confusing the design pressure with the back pressure at a rocket nozzle exit.** A nozzle is optimum when $p_e = p_a$; if $p_e > p_a$ it is **underexpanded** and loses some of the thrust that further expansion would have given; if $p_e < p_a$ it is **overexpanded** and develops a shock system or, at severe overexpansion, **separates inside the nozzle**, possibly asymmetrically, producing side loads. A first-stage nozzle is therefore a compromise between sea-level and altitude expansion. **Applying the isentropic relations across a shock.** The isentropic relations are valid **between two points on the same streamline with no shock between them**. Across a shock the flow is adiabatic — $T_0$ is constant — but **not** isentropic, and $p_0$ is not constant. **The single most common error in compressible-flow calculations is chaining isentropic relations across a shock**, and the Rankine–Hugoniot relations exist as a separate set because the second law forbids the shortcut.
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
\text{Steam (low-pressure vapour)} & 1.310 & 461.5 & 421\ \mathrm{m / s} \\
\text{Carbon dioxide} & 1.289 & 188.9 & 267\ \mathrm{m / s} \\
\text{Helium} & 1.667 & 2{,}077 & 1{,}007\ \mathrm{m / s} \\
\text{Water (liquid)} & - & - & 1{,}482\ \mathrm{m / s}
\end{array}
$$
**The reading of the table.** For an ideal gas $a$ depends on **temperature alone**, so at the same Mach number an aircraft's true airspeed at $223\ \mathrm{K}$ is $\sqrt{223 / 288} = 0.88$ times its value at $288\ \mathrm{K}$ — $12\ \%$ lower. **Because $R$ is inversely proportional to the molar mass, $a \propto \sqrt{\gamma T / M_{\mathrm{mol}}}$**: helium's sound speed is about three times air's, so a helium jet stays subsonic up to about three times the velocity of an air jet.
**The stagnation relations, for an isentropic deceleration to rest:**
$$
\boxed{ \frac{T_0}{T} = 1 + \frac{\gamma - 1}{2} M^2 }, \qquad
\boxed{ \frac{p_0}{p} = \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{\gamma / \left( \gamma - 1 \right)} }, \qquad
\frac{\rho_0}{\rho} = \left( 1 + \frac{\gamma - 1}{2} M^2 \right)^{1 / \left( \gamma - 1 \right)}
$$
$$
\begin{array}{c c c c c c}
M & T_0 / T & p_0 / p & \rho_0 / \rho & q / p_0 & \text{incompressible error in } p_0 - p \\
0.1 & 1.002 & 1.007 & 1.005 & 0.0070 & 0.25\ \% \\
0.3 & 1.018 & 1.064 & 1.046 & 0.0592 & 2.3\ \% \\
0.5 & 1.050 & 1.186 & 1.130 & 0.1475 & 6.4\ \% \\
0.7 & 1.098 & 1.387 & 1.263 & 0.2473 & 12.9\ \% \\
0.85 & 1.145 & 1.604 & 1.401 & 0.3153 & 19.4\ \% \\
1.0 & 1.200 & 1.893 & 1.577 & 0.3698 & 27.6\ \%
\end{array}
$$
**The number that sets the $M = 0.3$ rule.** The incompressible error in $p_0 - p$ is approximately $M^2 / 4$, so $2.3\ \%$ at $M = 0.3$ and $6.4\ \%$ at $M = 0.5$. Because $V \propto \sqrt{p_0 - p}$, a $2.3\ \%$ error in the pressure difference is about a $1.1\ \%$ error in velocity — the usual reason $M \approx 0.3$ is quoted as the limit of incompressible treatment.
**The maximum mass flux.** Differentiating $\dot{m} / A = \rho V$ with the stagnation relations gives the maximum at $M = 1$:
$$
\boxed{ \left( \frac{\dot m}{A} \right)_{\max} = 0.6847\, \frac{p_0}{\sqrt{R T_0}} }\ \text{for } \gamma = 1.4
$$
**The number that sizes every relief valve, safety valve and blow-off line in the plant.** For air at $p_0 = 10\ \mathrm{bar}$ and $T_0 = 300\ \mathrm{K}$ the choked flux is $0.6847 \times 10^6 / \sqrt{287 \times 300} = 2{,}333\ \mathrm{kg / s \cdot m^2}$, or $2.33\ \mathrm{g / s}$ per square millimetre of throat — **and the reason the flux is independent of the back pressure is that the throat is already running at the fastest the reservoir can feed it.**
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
A / A^* & 2.964 & 1.590 & 1.188 & 1.038 & 1.000 & 1.176 & 1.687 & 4.235 & 10.72
\end{array}
$$
**The number that makes high-Mach nozzles large.** At $M = 3$ the area ratio is $4.235$, so the exit diameter is $\sqrt{4.235} = 2.06$ times the throat diameter; at $M = 5$ the area ratio is $25.0$ and the exit diameter five times the throat, because for large $M$ the ratio $A / A^*$ grows as $M^{- 1} \left( M^2 / 6 \right)^3 \propto M^5$ (for $\gamma = 1.4$).
**The isentropic nozzle solution.** Given $p_0$, $T_0$ and the area ratio, the exit Mach number follows from $A / A^*$ and then
$$
V_e = M_e \sqrt{\gamma R T_e}, \qquad
\dot m = \rho_e V_e A_e, \qquad
u_e = \sqrt{2 c_p \left( T_0 - T_e \right)} = \sqrt{\frac{2 \gamma}{\gamma - 1} \frac{p_0}{\rho_0} \left[ 1 - \left( \frac{p_e}{p_0} \right)^{\left( \gamma - 1 \right) / \gamma} \right]}
$$
**The number that makes a cold-gas thruster weak.** The exit velocity is $\sqrt{2 c_p T_0}$ times a pressure-ratio function, so it scales as $\sqrt{T_0}$: **nitrogen at $300\ \mathrm{K}$ expanded through a pressure ratio of $100$ gives about $680\ \mathrm{m / s}$ (the limit for infinite expansion is $\sqrt{2 c_p T_0} = 790\ \mathrm{m / s}$), while rocket combustion gases at $3{,}000$–$3{,}500\ \mathrm{K}$ reach $3{,}000$–$4{,}500\ \mathrm{m / s}$** — and chemical propulsion's specific impulse is a temperature-and-molecular-weight statement because $c_p \propto 1 / M_{\mathrm{mol}}$, so $u_e \propto \sqrt{T_c / M_{\mathrm{mol}}}$.
:::

::: widget plot
f: (1/x)*pow((2+0.4*x*x)/2.4, 3)
x: 0.1, 3.0
y: 1.0, 4.5
caption: The area ratio $A / A^*$ required to reach a given Mach number in an isentropic duct of $\gamma = 1.4$. **The curve has its minimum of exactly $1.0$ at $M = 1$** — the throat — and is steeply double-valued: $A / A^* = 1.687$ corresponds to $M = 0.37$ subsonically and $M = 2.0$ supersonically, so **the same geometry gives either solution and the pressure ratio decides which**. A nozzle designed for $M = 2.0$ has a normal shock standing in its divergent part until the pressure ratio rises above $p_0 / p_b = 7.824 / 4.500 = 1.74$, at which point the shock reaches the exit plane and the flow inside the nozzle is fully supersonic.
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
1.1 & 0.912 & 1.245 & 1.169 & 1.065 & 0.9989 & 0.1\ \% \\
1.5 & 0.701 & 2.458 & 1.862 & 1.320 & 0.9298 & 7.0\ \% \\
2.0 & 0.577 & 4.500 & 2.667 & 1.688 & 0.7209 & 27.9\ \% \\
3.0 & 0.475 & 10.33 & 3.857 & 2.679 & 0.3283 & 67.2\ \% \\
5.0 & 0.415 & 29.00 & 5.000 & 5.800 & 0.0617 & 93.8\ \% \\
\infty & 0.378 & \propto M_1^2 & 6.000 & \propto M_1^2 & \to 0 &
\end{array}
$$
**The three limits that make the shock a physical object and not a mathematical curiosity.** The density ratio tends to $\left( \gamma + 1 \right) / \left( \gamma - 1 \right) = 6$ for air — **the compression is bounded**, which is why the shock layer around a hypersonic body stays thin but finite. The downstream Mach number tends to $\sqrt{\left( \gamma - 1 \right) / \left( 2 \gamma \right)} = 0.378$ — **a strong shock always leaves a subsonic flow at the same Mach number**, and the reason a detached bow shock ahead of a blunt body is treated as a normal shock of $M_1 \to \infty$ is that the subsonic region behind it is at $M \approx 0.38$ whatever the flight speed. And $p_{02} / p_{01} \to 0$ — **the total pressure is destroyed without limit**, which is the reason a hypersonic inlet's pressure recovery is the central design problem of the configuration.
**The second law.** $p_{02} / p_{01} < 1$ for every $M_1 > 1$, and the entropy rise is
$$
\frac{\Delta s}{c_v} = \ln \frac{p_2}{p_1} - \gamma \ln \frac{\rho_2}{\rho_1} \approx \frac{2 \gamma \left( \gamma - 1 \right)}{3 \left( \gamma + 1 \right)^2} \cdot \frac{\left( M_1^2 - 1 \right)^3}{M_1^2} \quad \text{for } M_1 \to 1
$$
**The cube is the reason weak shocks are nearly isentropic and a distributed compression pays** — at $M_1 = 1.1$ the total-pressure loss is $0.1\ \%$, at $M_1 = 1.5$ it is $7\ \%$ and at $M_1 = 2$ it is $28\ \%$.
**The Fanno and Rayleigh lines.** The states on either side of a normal shock have the same mass flux, the same stagnation enthalpy and the same momentum flux, so they lie on both the **Fanno line** (constant mass flux and stagnation enthalpy) and the **Rayleigh line** (constant mass flux and momentum); the two lines intersect at two points, and **only the jump with an entropy increase is physical** — which is why a shock going from subsonic to supersonic does not exist.
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
**and an infinitesimal disturbance — a Mach wave — is the $\delta \to 0$ limit of an oblique shock, across which the process is isentropic.** This is why a thin supersonic airfoil at small incidence can be analysed with Mach waves (linear theory): its shocks are weak, and the entropy rise across them is third order in the deflection.
**The $\theta$–$\beta$–$M$ solution structure.** For each $M_1$ and $\delta$ below a maximum $\delta_{\max}$ there are **two** solutions, a **weak** shock (downstream supersonic or barely subsonic, the one that occurs) and a **strong** shock (subsonic, occurring only when the downstream pressure forces it, as at an inlet). Above $\delta_{\max}$ the shock **detaches**.
$$
\begin{array}{c c c c c}
M_1 & \mu & \delta_{\max} & \beta_{\mathrm{weak}} \text{ at } \delta = 10^\circ & M_2 \\
1.5 & 41.8^\circ & 12.1^\circ & 56.7^\circ & 1.11 \\
2.0 & 30.0^\circ & 23.0^\circ & 39.3^\circ & 1.64 \\
3.0 & 19.5^\circ & 34.1^\circ & 27.4^\circ & 2.51 \\
5.0 & 11.5^\circ & 41.1^\circ & 19.4^\circ & 4.00
\end{array}
$$
**The number that makes a supersonic inlet's ramp angles a compromise.** At $M = 3$ a single $30^\circ$ turn is possible (below $\delta_{\max} = 34^\circ$), **but the total-pressure recovery of that single oblique shock is $0.56$, while three successive $10^\circ$ shocks ($M = 3 \to 2.51 \to 2.09 \to 1.72$) recover $0.963 \times 0.976 \times 0.983 = 0.92$** — which is why real inlets use several ramps and accept the mechanical complexity.
**The Prandtl–Meyer expansion.** A supersonic flow turning **through** itself expands isentropically through a fan of Mach waves, and the total turn available is
$$
\boxed{ \nu \left( M \right) = \sqrt{\frac{\gamma + 1}{\gamma - 1}} \arctan \sqrt{\frac{\gamma - 1}{\gamma + 1} \left( M^2 - 1 \right)} - \arctan \sqrt{M^2 - 1} }, \qquad
\Delta \theta = \nu \left( M_2 \right) - \nu \left( M_1 \right)
$$
$$
\begin{array}{c c c c c c c c}
M & 1.0 & 1.5 & 2.0 & 2.5 & 3.0 & 4.0 & 5.0 \\
\nu \left( M \right),\ {}^\circ & 0 & 11.9 & 26.4 & 39.1 & 49.8 & 65.8 & 76.9 \\
\nu_{\max} = 130.5^\circ \text{ at } M \to \infty &&&&&&&
\end{array}
$$
**The number that makes an expansion fan finite.** A supersonic flow starting at $M = 1$ can turn through at most $\nu_{\max} = 130.5^\circ$ for air, the turn at which it has expanded to zero pressure and temperature; around a sharper convex corner the flow leaves a vacuum region next to the wall. **An expansion is isentropic and a compression is not because in an expansion the Mach waves diverge and never coalesce, while in a compression they converge and merge into a shock.**
:::

## Shocks in ducts, nozzles and pipes

::: definition Shock and expansion patterns in nozzles {#def-nozzle-patterns}
**The regimes of a convergent–divergent nozzle**, set by the back-pressure ratio $p_b / p_0$. Three critical ratios divide them, all fixed by the area ratio; for a nozzle designed for $M_e = 2.0$ ($A_e / A^* = 1.687$) they are $0.909$ (the throat just reaches $M = 1$ with subsonic flow downstream, $M_e = 0.37$), $0.575$ (a normal shock stands exactly at the exit, $p_b = 4.5\, p_e$) and $0.128$ (the design ratio, $p_e = p_b$):
$$
\begin{array}{l l l}
p_b / p_0 > 0.909 & \text{subsonic throughout (a venturi)} & \text{not choked} \\
0.575 < p_b / p_0 < 0.909 & \text{choked; normal shock standing in the divergent part} & \text{subsonic exit} \\
0.128 < p_b / p_0 < 0.575 & \text{overexpanded: shock-free inside, oblique shocks outside} & \text{severe cases separate inside} \\
p_b / p_0 = 0.128 & \text{isentropic supersonic, } p_e = p_b & \text{design condition} \\
p_b / p_0 < 0.128 & \text{underexpanded: expansion waves outside} & \text{diamond pattern in the jet}
\end{array}
$$
**The number that makes a launch vehicle's nozzle a structural problem as well as an aerodynamic one.** In a large first-stage nozzle running overexpanded at sea level, the wall pressure near the exit is below ambient, and a difference of only $0.2\ \mathrm{bar}$ acting over a $2\ \mathrm{m}$ exit gives $0.2 \times 10^5 \times \frac{\pi}{4} \times 2^2 = 63{,}000\ \mathrm{N}$ — a load of order six tonnes-force pressing inward on a thin shell; if the flow separates asymmetrically the resulting side load can be larger still.
**The thrust coefficient.**
$$
C_F = \frac{F}{p_0 A_t} = \frac{\dot m u_e}{p_0 A_t} + \frac{\left( p_e - p_a \right) A_e}{p_0 A_t}
\qquad \left[ C_F = 1.65 \text{ for } \gamma = 1.4,\ \varepsilon = A_e / A_t = 10,\ p_a = 0 \right]
$$
**The split between the two terms.** For $\gamma = 1.4$ and $\varepsilon = 10$ the exit Mach number is $3.92$ and $p_e / p_0 = 0.0073$; the momentum term is $1.574$ and the pressure term in vacuum is $0.0073 \times 10 = 0.073$, so $C_F = 1.647$ and the pressure term is about $4\ \%$ of the thrust. Thrust is maximised for a given ambient pressure when $p_e = p_a$: expanding further than that adds less momentum thrust than it loses in the (then negative) pressure term.
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
**The two numbers that make a ramjet combustor a Rayleigh problem.** On the subsonic Rayleigh line the **static** temperature reaches its maximum at $M = 1 / \sqrt{\gamma} = 0.845$ and the **stagnation** temperature its maximum at $M = 1$. **Between $M = 0.845$ and $M = 1$ adding heat cools the gas** — the static temperature falls even as enthalpy is poured in, because the kinetic-energy term grows faster than the static enthalpy — and at $M = 1$ the duct **chokes** and no further heat can be added without reducing the mass flow. **A ramjet's combustor is entered at a low subsonic Mach number because heat addition drives the flow toward $M = 1$: the higher the entry Mach number, the less heat can be added before the duct chokes thermally** — the limit is read from the Rayleigh $T_0 / T_0^*$ curve, not from the heat balance alone.
**The Rayleigh line's other use.** A **detonation** is a shock followed by heat release, and in a frame moving with the front its end state lies on a Rayleigh line; the **Chapman–Jouguet** condition selects the end state at which the burned gas leaves at sonic speed relative to the front.
:::

## Worked cases

::: example A wind-tunnel nozzle {#ex-nozzle}
A supersonic wind tunnel is to run at $M = 2.0$ in a test section of $0.40 \times 0.40\ \mathrm{m}$. The reservoir is at $p_0 = 5\ \mathrm{bar}$ and $T_0 = 300\ \mathrm{K}$. Find the throat area, the mass flow, the exit velocity and density, and the pressure ratio needed to push the normal shock out of the nozzle.
::: solution
**The test section and the throat.** $A_e = 0.16\ \mathrm{m^2}$. From the area–Mach relation at $M = 2.0$, $A / A^* = 1.687$:
$$
A^* = \frac{0.16}{1.687} = 0.0948\ \mathrm{m^2} \qquad \left( 308 \times 308\ \mathrm{mm} \right)
$$
**The mass flow.** The flow is choked, so the maximum-flux formula applies at the throat:
$$
\frac{\dot m}{A^*} = 0.6847 \times \frac{5 \times 10^5}{\sqrt{287 \times 300}}
= 0.6847 \times 1{,}704 = 1{,}166\ \mathrm{kg / s \cdot m^2}
\qquad \Rightarrow \qquad \dot m = 110.6\ \mathrm{kg / s}
$$
**The exit conditions.** At $M = 2.0$ the stagnation ratios are $T_0 / T = 1 + 0.2 \times 4 = 1.800$, $p_0 / p = 1.800^{3.5} = 7.824$ and $\rho_0 / \rho = 1.800^{2.5} = 4.347$:
$$
T_e = \frac{300}{1.800} = 166.7\ \mathrm{K}, \qquad
a_e = \sqrt{1.4 \times 287 \times 166.7} = 258.7\ \mathrm{m / s}, \qquad
V_e = 517.6\ \mathrm{m / s}
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
\dot m = \rho_e V_e A_e = 1.336 \times 517.6 \times 0.16 = 110.6\ \mathrm{kg / s} \quad \checkmark
$$
and finally the throat, using $\rho^* = \rho_0 \left( 2 / (\gamma + 1) \right)^{1 / (\gamma - 1)} = 5.808 \times 0.6339 = 3.682\ \mathrm{kg / m^3}$ and $a^* = \sqrt{1.4 \times 287 \times 250} = 316.9\ \mathrm{m / s}$:
$$
\dot m = \rho^* a^* A^* = 3.682 \times 316.9 \times 0.0948 = 110.6\ \mathrm{kg / s} \quad \checkmark
$$
**The number that makes the three-way check the whole point of the exercise.** $T_0 / T$ at $M = 2$ is $1.800$ and **not** the $1.200$ that applies at $M = 1$; **using the sonic ratios $1.200$, $1.893$ and $1.577$ at the exit gives $T_e = 250\ \mathrm{K}$, $V_e = 2 \times 316.9 = 634\ \mathrm{m / s}$ and $\rho_e = 3.68\ \mathrm{kg / m^3}$, and the continuity check returns $\rho_e V_e A_e = 373\ \mathrm{kg / s}$ instead of $110.6$ — an error that survives every intermediate step and is caught only by the check.** The reason the mistake is so common is that the $M = 1$ values $0.833$, $0.528$ and $1.200$ are memorised as "the throat numbers" and reused as if they belonged to the exit.
**The pressure ratio to clear the shock.** For the nozzle alone to be shock-free and perfectly expanded it needs $p_0 / p_b = 7.82$. But to push the normal shock out of the divergent part it needs only enough ratio to hold a normal shock at the exit plane, where the subsonic pressure behind the shock is $4.50$ times the supersonic pressure in front:
$$
\left( \frac{p_0}{p_b} \right)_{\mathrm{exit\ shock}} = \frac{7.824}{4.500} = 1.74
$$
With $p_0 = 5\ \mathrm{bar}$ exhausting to $1.013\ \mathrm{bar}$ the ratio is $4.94$, comfortably above $1.74$, so the test section runs supersonic (a real tunnel recovers part of the pressure in a diffuser after the test section, which lowers the required ratio further).
**The number that makes a supersonic wind tunnel expensive.** Compressing $110.6\ \mathrm{kg / s}$ of air isentropically from $1$ to $5\ \mathrm{bar}$ at $300\ \mathrm{K}$ takes $\dot m c_p T \left[ 5^{0.2857} - 1 \right] \approx 19.5\ \mathrm{MW}$ before any compressor inefficiency — **which is why most supersonic tunnels of this size are blow-down tunnels**, filling a storage vessel slowly with a small compressor and discharging it through the nozzle for a short run. The run time follows from the usable stored mass; a $300\ \mathrm{m^3}$ store charged to $30\ \mathrm{bar}$ and regulated down to $p_0 = 5\ \mathrm{bar}$ gives, on an isothermal estimate,
$$
t_{\mathrm{run}} \approx \frac{\left( p_{\mathrm{store}} - p_0 \right) V}{\dot m R T_0} = \frac{\left( 30 - 5 \right) \times 10^5 \times 300}{110.6 \times 287 \times 300} = 79\ \mathrm{s}
$$
(less in practice, because the stored air cools as it expands). **A store at only $5\ \mathrm{bar}$ would be useless**: $100\ \mathrm{m^3}$ at $5\ \mathrm{bar}$ holds $p_0 V / R T_0 = 581\ \mathrm{kg}$, about five seconds of flow even if it could all be used. During a blow-down run the stored air cools and the regulator works ever harder, so the Reynolds number drifts and the data must be logged against time.
*Sanity.* The reason the exit Mach number is set by the area ratio and not by the pressure ratio is that once the flow is choked the throat decouples the reservoir from the back pressure; **the back pressure decides only whether the design Mach number is reached cleanly, with a shock inside, or with a shock outside.** The reason a tunnel's operating chart is drawn as Mach number against reservoir pressure and not against back pressure is that the area ratio is fixed by the geometry and the pressure ratio is the operator's only control.
:::
:::

::: example A supersonic intake {#ex-inlet}
A supersonic transport cruises at $M_0 = 2.2$ at $13{,}700\ \mathrm{m}$ where $p = 22.8\ \mathrm{kPa}$ and $T = 216.7\ \mathrm{K}$. Compare the total-pressure recovery of (a) an intake with a blunt lip, so that a normal shock stands ahead of it, (b) an intake with one $12^\circ$ external ramp, and (c) an intake with ramps of $12^\circ$ and $10^\circ$.
::: solution
**The freestream stagnation pressure.**
$$
p_{00} = 22.8 \left( 1 + 0.2 \times 4.84 \right)^{3.5} = 22.8 \times 1.968^{3.5} = 22.8 \times 10.69 = 243.8\ \mathrm{kPa}
$$
**(a) A normal shock at the face.** $M_1 = 2.2$, $M_1^2 = 4.84$:
$$
\frac{p_2}{p_1} = 1 + \frac{2.8}{2.4} \times 3.84 = 5.480, \qquad
M_2^2 = \frac{0.4 \times 4.84 + 2}{2.8 \times 4.84 - 0.4} = \frac{3.936}{13.152} = 0.2993, \quad M_2 = 0.547
$$
$$
\frac{p_{02}}{p_{01}} = 5.480 \times \frac{\left( 1 + 0.2 \times 0.2993 \right)^{3.5}}{10.70}
= 5.480 \times \frac{1.2257}{10.69} = \mathbf{0.628}
$$
**(b) One $12^\circ$ ramp.** The $\theta$–$\beta$–$M$ relation gives $\beta = 37.9^\circ$ for the weak solution:
$$
M_{1n} = 2.2 \sin 37.9^\circ = 1.351, \qquad M_{1n}^2 = 1.826
$$
$$
\frac{p_2}{p_1} = 1 + 1.1667 \times 0.826 = 1.964, \qquad
M_{2n}^2 = \frac{0.4 \times 1.826 + 2}{2.8 \times 1.826 - 0.4} = 0.579, \quad M_{2n} = 0.761
$$
$$
M_2 = \frac{M_{2n}}{\sin \left( \beta - \delta \right)} = \frac{0.761}{\sin 25.9^\circ} = \mathbf{1.74} \quad \text{— still supersonic}
$$
$$
\frac{p_{02}}{p_{01}} = 1.964 \times \frac{\left( 1 + 0.2 \times 0.579 \right)^{3.5}}{\left( 1 + 0.2 \times 1.826 \right)^{3.5}}
= 1.964 \times \frac{1.468}{2.973} = \mathbf{0.969}
$$
**The terminal normal shock** at $M = 1.74$ costs a further factor of $0.838$, so
$$
\frac{p_{0,\mathrm{face}}}{p_{00}} = 0.969 \times 0.838 = \mathbf{0.812}
$$
**(c) Two ramps, $12^\circ$ then $10^\circ$.** The second ramp runs at $M_1 = 1.74$ and $\delta = 10^\circ$, for which $\beta = 45.7^\circ$ and $M_{1n} = 1.247$:
$$
\frac{p_{03}}{p_{02}} = 0.987, \qquad M_3 = \frac{0.814}{\sin 35.7^\circ} = 1.40
$$
**and the terminal normal shock at $M = 1.40$ costs only $0.959$:**
$$
\frac{p_{0,\mathrm{face}}}{p_{00}} = 0.969 \times 0.987 \times 0.959 = \mathbf{0.918}
$$
$$
\begin{array}{l c c c}
\text{Intake} & \text{ramp losses} & \text{terminal normal shock} & \text{recovery} \\
\text{(a) blunt lip} & - & M = 2.2 & 0.628 \\
\text{(b) one } 12^\circ \text{ ramp} & 0.969 & M = 1.74 \to 0.838 & 0.812 \\
\text{(c) } 12^\circ + 10^\circ & 0.957 & M = 1.40 \to 0.959 & 0.918
\end{array}
$$
**The reading, which is the whole of intake design.** **The second ramp costs only $1.3\ \%$ itself and raises the recovery by $13\ \%$ (from $0.812$ to $0.918$) by lowering the Mach number entering the terminal shock.** The terminal shock's loss falls steeply with its Mach number: from $37\ \%$ at $M = 2.2$ to $4\ \%$ at $M = 1.40$. **An intake is therefore a cascade of weak oblique shocks ending in one deliberately weak normal shock**: the normal shock cannot be eliminated — the engine needs subsonic flow — but its strength can be chosen, and the choice is made by the ramp angles.
**The thrust consequence.** At fixed engine operating conditions the mass flow the engine can swallow is roughly proportional to the total pressure at its face, so to a first approximation
$$
\frac{F_{(c)}}{F_{(a)}} \approx \frac{0.918}{0.628} = 1.46
$$
**about $46\ \%$ more thrust for two ramps** (a crude estimate, since ram drag and nozzle conditions change too). Because the best ramp angles depend on flight Mach number, intakes for aircraft that cruise at $M \approx 2$ use variable geometry.
*Sanity.* Total-pressure recovery, not static-pressure rise, is the right figure of merit because the engine's mass flow and the pressure available to its nozzle are set by the total pressure and total temperature at the face.
:::
:::

::: example A relief valve {#ex-relief}
A vessel of $5\ \mathrm{m^3}$ contains air at $10\ \mathrm{bar}$ and $300\ \mathrm{K}$. A safety valve of throat area $250\ \mathrm{mm^2}$ opens to atmosphere at $1\ \mathrm{bar}$. Find the initial mass flow, the initial rate of fall of the vessel pressure, and the time for the pressure to fall to $2\ \mathrm{bar}$.
::: solution
**The choking check.** The critical back-pressure ratio for air is $0.528$; here $p_b / p_0 = 0.1 < 0.528$, so **the valve is choked** and the flow is independent of the atmospheric pressure.
**The initial mass flow.**
$$
\dot m_0 = 0.6847 \times \frac{10 \times 10^5}{\sqrt{287 \times 300}} \times 250 \times 10^{- 6}
= 0.6847 \times 3{,}408 \times 2.5 \times 10^{- 4} = 0.584\ \mathrm{kg / s}
$$
**The initial depressurisation rate.** With $m = p V / R T$ and an isentropic blowdown $T = T_0 \left( p / p_0 \right)^{\left( \gamma - 1 \right) / \gamma}$:
$$
m = \frac{V p_0}{R T_0} \left( \frac{p}{p_0} \right)^{1 / \gamma}
\qquad \Rightarrow \qquad
\frac{d m}{d p} = \frac{V}{\gamma R T_0} \left( \frac{p_0}{p} \right)^{\left( \gamma - 1 \right) / \gamma}
= 4.148 \times 10^{- 5} \left( \frac{p_0}{p} \right)^{0.2857}\ \mathrm{kg / Pa}
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
**The number that makes the valve's response time matter.** A spring safety valve opens in a fraction of a second and the vessel blows down in $129\ \mathrm{s}$, so the quasi-steady assumption is excellent — **but the blowdown time scales with volume, and a $0.05\ \mathrm{m^3}$ receiver with the same valve takes only $1.3\ \mathrm{s}$**, comparable with the valve's own dynamics; a valve much larger than the relieving duty requires tends to open, drop the pressure, reseat and open again — chatter — which damages its seat.
**The temperature at the throat.** $T^* = 300 \times 0.833 = 250\ \mathrm{K}$ at the start, and the vessel's gas cools to $T = 300 \times 0.2^{0.2857} = 189\ \mathrm{K}$ at $2\ \mathrm{bar}$. **The number that makes a blowdown a materials problem:** $189\ \mathrm{K}$ is $-84\ {}^{\circ}\mathrm{C}$, colder than the ductile–brittle transition of many carbon steels. The wall cools more slowly than the gas, but a vessel that can be depressurised rapidly must have its minimum design metal temperature checked against this case.
*Sanity.* The reason the flow is independent of the back pressure once choked is that the throat is sonic and a pressure disturbance downstream cannot travel upstream past it. **A safety valve's capacity is quoted at an overpressure (typically $10\ \%$ above set) because the valve is not fully open at the set pressure, and its certified capacity is the theoretical choked flow multiplied by a measured discharge coefficient below $1$.**
:::
:::

::: example Wave drag and the area rule {#ex-wavedrag}
A biconvex airfoil of thickness ratio $t / c = 0.10$ flies at $M = 1.6$ and zero incidence. Find the wave-drag coefficient from linear theory, and compare it with the same section at $M = 1.2$.
::: solution
**Ackeret's linear theory.** For a thin profile at supersonic speed the wave-drag coefficient is
$$
\boxed{ c_d = \frac{4}{\sqrt{M^2 - 1}} \left[ \alpha^2 + \overline{\left( \frac{d y_c}{d x} \right)^2} + \overline{\left( \frac{d y_t}{d x} \right)^2} \right] }
\qquad \left[ \text{incidence, camber and thickness contributions} \right]
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
**The number that makes a $10\ \%$-thick section at $M = 1.2$ a bad idea.** **Linear theory gives $804$ counts of wave drag for a section that a subsonic aircraft would carry without comment.** Close to $M = 1$ linear theory fails — it predicts infinite drag at $M = 1$ — because the small-perturbation equation changes type there and the flow is transonic, with mixed subsonic and supersonic regions; in that range experiment or nonlinear computation is the only arbiter, which is why drag divergence is defined empirically (for example, the Mach number at which the drag has risen by $20$ counts).
**The two scalings that govern supersonic shape.** $c_d \propto \tau^2$: **halving the thickness quarters the wave drag.** And $c_d \propto 1 / \sqrt{M^2 - 1}$: **in linear theory the wave-drag coefficient falls as the Mach number rises**, so the same section has $\sqrt{3} / 0.663 = 2.6$ times less wave-drag coefficient at $M = 2$ than at $M = 1.2$ — the low supersonic and transonic range, not the high supersonic one, is the expensive one.
**The area rule.** For a whole aircraft near $M = 1$ the wave drag depends mainly on how the **total cross-sectional area** varies along the length, and it is lowest when that distribution is smooth. For a slender body of length $\ell$ and maximum cross-section $S_{\max}$ the minimum possible wave drag (the Sears–Haack body) is
$$
\frac{D_w}{q} = \frac{9 \pi}{2} \frac{S_{\max}^2}{\ell^2}
$$
so a long, slender, smoothly varying area distribution is what the designer aims at. **Area-ruling** — narrowing the fuselage where the wing adds cross-section, the "Coke bottle" shape — was what allowed the Convair F-102 to exceed $M = 1$ in level flight. Sweep is the other tool: a swept wing feels approximately the component $M \cos \Lambda$ of the flight Mach number normal to its leading edge, which delays the transonic drag rise.
*Sanity.* $c_d \propto \left( t / c \right)^2$ because the drag is proportional to the square of the surface slope: **halving the thickness ratio quarters the wave drag**, which is why supersonic aircraft have wings only about $3$ to $5\ \%$ thick and accept the structural cost.
:::
:::

::: history
**Newton** calculated the speed of sound in the *Principia* (**1687**) assuming an isothermal process and obtained a value about $15\ \%$ below measurement; **Laplace** traced the discrepancy to the adiabatic nature of sound waves, publishing the corrected formula $a = \sqrt{\gamma p / \rho}$ in **1816**, and **Clément** and **Desormes**'s experiment of **1819** gave a direct measurement of the ratio of specific heats it requires. **Rankine** (**1870**) and **Hugoniot** (**1887**) derived the jump conditions across a shock from the conservation laws; that only compression shocks are physically possible — the entropy condition — was shown by **Zemplén** (**1905**) and **Rayleigh** (**1910**). **Gustaf de Laval** used the convergent–divergent nozzle in his steam turbines from the late **1880s**, and **Aurel Stodola**'s experiments of **1903** showed shocks standing inside such nozzles. **Theodor Meyer**'s **1908** Göttingen dissertation under **Prandtl** gave the theory of the expansion fan and of the oblique shock; **Gino Fanno**'s **1904** diploma thesis at Zürich treated adiabatic flow with friction in a duct; and **Jakob Ackeret**'s **1925** linear theory gave the lift and wave drag of thin supersonic airfoils. **Richard Whitcomb**'s transonic area rule, established in wind-tunnel tests at NACA Langley and reported in **1952**, was applied to the Convair F-102, whose original design had been unable to exceed the speed of sound in level flight; the area-ruled YF-102A did so in **1954**.
:::

::: quiz
A convergent–divergent nozzle designed for $M_e = 2.0$ is fed from a reservoir, and the back pressure is raised above the design value until a normal shock stands exactly at the exit plane, where the Mach number ahead of it is $2.0$. Immediately downstream of the shock:

- [ ] The flow is supersonic but at a lower Mach number
- [x] The flow is subsonic and about $28\ \%$ of the total pressure has been destroyed
- [ ] The Mach number is unchanged and only the static pressure rises
- [ ] The throat unchokes and the mass flow falls

::: solution
**Subsonic, at $M_2 = 0.577$, with $p_{0 2 } / p_{0 1 } = 0.7209$.** Across a normal shock at $M_1 = 2.0$ the static pressure rises by a factor of $4.5$, the temperature by $1.688$, and the total pressure falls by $27.9\ \%$ — an irreversible loss of the reservoir's ability to do work, produced in a layer only a few mean free paths thick. **The mass flow does not change, because the throat is still choked and the mass flow depends only on the reservoir state and the throat area.** Raising the back pressure further moves the shock upstream into the divergent section, to the station where the shock's pressure rise, followed by subsonic diffusion to the exit, matches the back pressure; lowering it below $p_b / p_0 = 0.575$ moves the shock out of the nozzle. **The $28\ \%$ is the number to remember**, because it is the price of decelerating a $M = 2$ stream with a single normal shock — the reason supersonic intakes, such as the movable inlet spikes of the SR-71, use oblique shocks first.
:::
:::

## Where this leads

The stagnation and choking relations are the whole of [[fluid-mechanics/pipe-flow]]'s compressible extension and of relief-valve sizing; the shock relations are the input to [[aerodynamics]]' supersonic theory and [[propulsion]]'s inlets and nozzles; the transonic drag rise is the reason [[flight-mechanics]] finds airliners cruising at about $M = 0.78$–$0.85$; and the wave-drag law is the reason [[aerodynamics]]' high-speed wings are thin and swept.

::: summary
- Compressibility is a statement about energy: the incompressible error in $p_0 - p$ is about $M^2/4$ — $2.3\%$ at $M=0.3$ and $28\%$ at $M=1$.
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

::: exercise Maximum mass flux {level=2 check="1.81"}
Air at $p_0 = 20\ \mathrm{bar}$ and $T_0 = 500\ \mathrm{K}$ discharges through a throat of $500\ \mathrm{mm^2}$. Give the choked mass flow in kilograms per second.
::: solution
$$
\dot m = 0.6847 \times \frac{20 \times 10^5}{\sqrt{287 \times 500}} \times 500 \times 10^{- 6}
= 0.6847 \times 5{,}280 \times 5 \times 10^{- 4} = 1.81\ \mathrm{kg / s}
$$
**The reason the answer is independent of the receiver pressure downstream is that the throat is sonic**, and the reason a $500\ \mathrm{mm^2}$ throat passes $1.81\ \mathrm{kg / s}$ of air at these conditions and only $0.117\ \mathrm{kg / s}$ at $1\ \mathrm{bar}$ and $300\ \mathrm{K}$ is that the flux is proportional to $p_0 / \sqrt{T_0}$ — a factor of $20$ from the pressure and $\sqrt{300 / 500} = 0.775$ from the temperature.
:::
:::

::: exercise Prandtl–Meyer {level=2 check="2.83"}
A supersonic flow at $M_1 = 2.0$ expands around a convex corner of $20^\circ$. Give the downstream Mach number.
::: solution
$$
\nu \left( M_2 \right) = \nu \left( 2.0 \right) + 20^\circ = 26.4 + 20 = 46.4^\circ
$$
**Solving the Prandtl–Meyer function** (or interpolating the table), $\nu = 46.4^\circ$ corresponds to $M_2 = 2.83$. **The reason the expansion is computed by adding angles and not Mach numbers is that $\nu$ is the variable that is conserved across the fan**, and a $20^\circ$ turn is a large one: it takes the flow from $M = 2$ to $M = 2.83$ and drops the static pressure by a factor of $28.4 / 7.82 = 3.6$ (the ratio of the two values of $p_0 / p$).
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
**Divide by the same expression at the sonic throat** (denoted by $*$), where the mass flow is the same, and use the isentropic relations $p / p_0 = \left( T / T_0 \right)^{\gamma / \left( \gamma - 1 \right)}$ and $T / T_0 = 2 / \left( 2 + \left( \gamma - 1 \right) M^2 \right)$:
$$
\frac{A}{A^*} = \frac{p^*}{p} \frac{M^*}{M} \sqrt{\frac{T}{T^*}}
$$
**with** $M^* = 1$, $T / T^* = \left( \gamma + 1 \right) / \left( 2 + \left( \gamma - 1 \right) M^2 \right)$ **and** $p^* / p = \left( T^* / T \right)^{\gamma / \left( \gamma - 1 \right)}$, so $A / A^* = \left( 1 / M \right) \left( T^* / T \right)^{\gamma / \left( \gamma - 1 \right) - 1 / 2}$. **Since** $\gamma / \left( \gamma - 1 \right) - 1/2 = \left( \gamma + 1 \right) / \left[ 2 \left( \gamma - 1 \right) \right]$:
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
**The duty.** The relief case is **loss of the main steam stop valve with the burner still firing** — the full $40\ \mathrm{kg / s}$ must leave through the valves, and the drum pressure must not exceed the code accumulation limit — taken here as $110\ \%$ of the set pressure, the usual pressure-vessel figure (boiler codes such as ASME Section I are stricter, at about $6\ \%$).
**The fluid.** At $60\ \mathrm{bar}$ saturated steam: $T_s = 275.6\ {}^{\circ}\mathrm{C} = 548.8\ \mathrm{K}$, $v_g = 0.03244\ \mathrm{m^3 / kg}$, $\rho_g = 30.8\ \mathrm{kg / m^3}$, $h_{fg} = 1{,}571\ \mathrm{kJ / kg}$; at the relieving pressure of $66\ \mathrm{bar}$, $\rho_g \approx 34.0\ \mathrm{kg / m^3}$. The isentropic exponent of dry saturated steam is conventionally taken as $\gamma = 1.135$ for nozzle-flow estimates.
**The choked mass flux.** The general coefficient is
$$
\left( \frac{\dot m}{A} \right)_{\max} = C \left( \gamma \right) \frac{p_0}{\sqrt{Z R T_0}} = C \left( \gamma \right) \sqrt{p_0 \rho_0}, \qquad
C \left( \gamma \right) = \sqrt{ \gamma \left( \frac{2}{\gamma + 1} \right)^{\left( \gamma + 1 \right) / \left( \gamma - 1 \right)} }
$$
$$
\begin{array}{c c c c c}
\gamma & 1.135 & 1.200 & 1.300 & 1.400 \\
C \left( \gamma \right) & 0.6356 & 0.6485 & 0.6673 & 0.6847
\end{array}
$$
**The number that makes steam a special case.** With $\gamma = 1.135$, $C = 0.6356$ — **$7\ \%$ below the air value** — so a steam valve sized with the air coefficient overestimates its capacity by $7\ \%$ and is undersized; superheat lowers the flux further, because the density falls as $T_0$ rises.
**The required area.** At the relieving pressure $p_0 = 1.1 \times 60 = 66\ \mathrm{bar}$, with a certified discharge coefficient $K_d = 0.975$:
$$
\frac{\dot m}{A} = 0.975 \times 0.6356 \times \sqrt{66 \times 10^5 \times 34.0} = 0.975 \times 0.6356 \times 14{,}980 = 9{,}280\ \mathrm{kg / s \cdot m^2}
$$
$$
A = \frac{40}{9{,}280} = 4.31 \times 10^{- 3}\ \mathrm{m^2} = 4{,}310\ \mathrm{mm^2} \qquad \left( d = 74\ \mathrm{mm} \right)
$$
**The check against the standard steam formula.** The API 520 sizing equation for saturated steam, $A = 190.5\, W / \left( p_1 K_d \right)$ with $A$ in $\mathrm{mm^2}$, $W$ in $\mathrm{kg / h}$ and $p_1$ in $\mathrm{kPa}$ absolute (the Napier formula), gives $A = 190.5 \times 144{,}000 / \left( 6{,}600 \times 0.975 \right) = 4{,}260\ \mathrm{mm^2}$ — within $1\ \%$ of the first-principles value.
**The number that makes the installation a two-valve installation.** Boiler codes require at least two safety valves on a drum of this size, and splitting the duty also gives redundancy against a valve that sticks: two valves of about $2{,}200\ \mathrm{mm^2}$ each ($d \approx 53\ \mathrm{mm}$), set a few per cent apart so that a small upset lifts only one.
**The dynamics — the reason sizing is not the end of it.** The drum contains $12\ \mathrm{m^3}$ of water and steam; **the water inventory's thermal inertia sets the pressure-rise rate** at loss of the steam outlet:
$$
\frac{d p}{d t} = \frac{\dot Q}{m_w c_p \left( \partial T / \partial p \right)_{\mathrm{sat}}}
\qquad \text{with } m_w = 9{,}000\ \mathrm{kg},\ \dot Q = 40 \times 1{,}571 = 62.8\ \mathrm{MW}
$$
**The saturation curve's slope is the safety margin:** $d T_s / d p \approx 1.09\ \mathrm{K / bar}$ at $60\ \mathrm{bar}$, so a $6$-bar overpressure needs about $6.5\ \mathrm{K}$ of extra sensible heat in the water ($c_p \approx 5.0\ \mathrm{kJ / kg \cdot K}$), which with all $62.8\ \mathrm{MW}$ going into the inventory takes
$$
\Delta t = \frac{9{,}000 \times 5{,}000 \times 6.5}{62.8 \times 10^6} = 4.7\ \mathrm{s}
$$
**The number that makes the valve's opening time a safety item.** A spring-loaded safety valve opens fully in a fraction of a second and has a blowdown (reseat pressure below set) of a few per cent, so **the $4.7\ \mathrm{s}$ is many opening times and the installation is safe — but a drum with a tenth of the water would give under half a second, comparable with the valve's response, and a boiler with a small water inventory needs its relief and its burner trip to act much faster.** (This estimate ignores the steam generated into the steam space, which makes the real pressure rise faster; it is an order-of-magnitude check, not a substitute for a transient model.)
**The failure modes.**
$$
\begin{array}{l l}
\text{Chatter} & \text{over-capacity or long inlet line; destroys the seat in minutes} \\
\text{Seat leakage at } 90\ \% \text{ of set} & \text{steam cutting, then a full-bore failure in months} \\
\text{Inlet-line blockage} & \text{a scale flake or a closed stop valve; the code forbids a stop valve} \\
\text{Outlet back-pressure} & \text{a common header above } 10\ \% \text{ set lifts the valve early} \\
\text{Reaction force} & \text{the } 40\ \mathrm{kg / s} \text{ discharge gives tens of kN of thrust; the tailpipe must be anchored} \\
\text{Freeze or corrosion seizure} & \text{an outdoor valve must be drained and its spring protected}
\end{array}
$$
**The acceptance tests.**
$$
\begin{array}{l l}
\text{Capacity test} & \text{each valve tested on a certified steam rig at } 110\ \% \text{ set, capacity within } \pm 3\ \% \\
\text{Set-pressure test} & \text{cold differential set pressure corrected to temperature, within } \pm 1\ \% \\
\text{Blowdown test} & \text{reseat within the specified } 3 \text{ to } 5\ \% \\
\text{Pressure-rise check} & \text{the calculated } dp / dt \text{ verified against the measured value on a trip test} \\
\text{Tailpipe} & \text{reaction force and noise measured; } < 85\ \mathrm{dB} \text{ at the platform} \\
\text{Periodic} & \text{on-line lift test every } 12\ \text{months, bench test every } 4\ \text{years}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE RELIEF CAPACITY SHALL BE CERTIFIED ON A STEAM FLOW TEST RIG AT THE ACCUMULATION PRESSURE SPECIFIED, AND THE CERTIFIED CAPACITY SHALL BE STAMPED ON THE VALVE."** **"NO STOP VALVE OF ANY DESCRIPTION SHALL BE FITTED BETWEEN THE DRUM AND THE SAFETY VALVE, AND THE INLET SHALL BE SELF-DRAINING WITH A MINIMUM BORE EQUAL TO THE VALVE INLET."** **"THE INSTALLATION SHALL BE DEMONSTRATED TO LIMIT THE PRESSURE EXCURSION TO THE CODE ACCUMULATION FOR THE WORST CREDIBLE CASE, INCLUDING A CLOSED STEAM STOP WITH THE BURNER AT FULL FIRING."** **"THE OUTLET SHALL DISCHARGE TO A SAFE LOCATION, AND THE REACTION LOAD AND NOISE SHALL BE CALCULATED AND THE SUPPORTS DESIGNED FOR THE MEASURED VALUES."**
*Design comment.* The general rule is that **a relief valve is a dynamic device sized by a steady calculation, and the calculation is only half the job** — which is why the code specifies the inlet length, the tailpipe arrangement and the periodic test interval and not only the area, and why the most common cause of a boiler's relief failure in service is not an undersized area but a blocked inlet or a seized disc.
:::
:::
