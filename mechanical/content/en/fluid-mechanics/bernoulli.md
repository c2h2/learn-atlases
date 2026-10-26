Bernoulli's equation is a statement of conservation of energy for a fluid that is not allowed to be viscous, unsteady, rotating, compressible or pumped — and it is nevertheless the single most used equation in fluid mechanics, because those five prohibitions are, in a surprising number of engineering places, only mildly broken.

Read it correctly and it is a **bookkeeping identity**: the work done by pressure on a parcel plus the work done by gravity equals the change in its kinetic energy. Read it incorrectly and it becomes a licence to write $p + \tfrac{1}{2}\rho V^2 = $ constant anywhere, which is false on almost every real flow field. The whole of this lesson is the difference between those two readings.

::: warning Seven Bernoulli errors that survive into published reports
**Applying it between two points on different streamlines in a rotational flow.** The Bernoulli constant $p + \tfrac{1}{2}\rho V^2 + \rho g z$ is **the same everywhere** only when the flow is **irrotational**; in general it is constant **along a streamline only**. In a pipe's fully developed profile the pressure is uniform across the section, so the constant differs from the axis to the wall by $\tfrac{1}{2}\rho U_c^2$, which for laminar flow ($U_c = 2 \bar{V}$) is $4$ mean velocity heads. **A pitot tube traversing a laminar pipe reads a parabolic profile and a student who averages the pressures gets the wrong mean velocity** — the mean of $\sqrt{2\Delta p / \rho}$ is not $\sqrt{2\overline{\Delta p}/\rho}$. **Using Bernoulli through a device that adds or removes energy.** A pump, a turbine, a fan, a compressor, a heater and a combustion chamber all break the equation. The generalised form carries $h_p - h_t - h_L$, and the fact that $h_L$ is **not** a property of the fluid but of the geometry and the Reynolds number is the reason a "Bernoulli problem" with a hidden loss coefficient is a different problem from the same geometry at a tenth of the flow. **Forgetting the velocity head at a discharge.** A pipe emptying into a reservoir loses its whole velocity head; a pipe emptying to atmosphere has that head **recovered** as kinetic energy in the jet. The two differ by $\tfrac{1}{2}\rho V^2$ — which for $3\ \mathrm{m / s}$ is $4.5\ \mathrm{kPa}$, or $0.46\ \mathrm{m}$ of water, which is often the whole available head. **Confusing the hydraulic grade line with the energy grade line.** The HGL is $p/\gamma + z$ and the EGL is $p/\gamma + z + V^2 / 2g$; they are separated by the velocity head, which in a fast main can be $5\ \mathrm{m}$ and in a reservoir zero. **A pipe whose HGL falls below its crown is under vacuum there, and one whose HGL falls nearly a barometric head below it is cavitating**, and a reader who plots the EGL instead sees no problem at all. **Using absolute and gauge pressures inconsistently.** Bernoulli is linear in $p$ so either works **provided the same datum is used throughout**; the exception is anywhere the **vapour pressure** enters — cavitation, NPSH, siphons over a high point, and cavitating Venturis — where the difference between $101\ \mathrm{kPa}$ absolute and $0\ \mathrm{kPa}$ gauge is the whole of the answer. **Applying it to a jet after the vena contracta and before the pressure has recovered.** A sharp-edged orifice's jet goes on contracting downstream of the plate to about $0.61$ of the orifice area; Bernoulli applied between the pipe and the vena contracta, with the jet's area, gives the flow almost exactly, while using the orifice's area instead overstates it by about $60\ \%$. Further downstream the jet mixes out and only part of the pressure is recovered, so Bernoulli cannot be applied across that region at all. **The orifice's $C_d$ of about $0.61$ is almost entirely the contraction of the jet, not a friction loss.** **Assuming the flow is steady when the timescale matters.** The unsteady term $\int \partial V / \partial t\, ds$ is the whole of water hammer, the whole of the sloshing of a tank and the whole of the "why does my siphon stop" question. For a $100\ \mathrm{m}$ pipeline accelerated from rest to $2\ \mathrm{m / s}$ in $5\ \mathrm{s}$ the term is $\left( L / g \right) d\bar{V} / dt = 100 \times 0.4 / 9.81 = 4.1\ \mathrm{m}$ of head — **comparable to the static head driving many such flows**.
:::

## The equation and what it costs

::: definition The derivations {#def-derivations}
**From Euler's equation along a streamline.** For steady, inviscid flow the momentum equation resolved along a streamline $s$ is
$$
- \frac{1}{\rho} \frac{d p}{d s} - g \frac{d z}{d s} = V \frac{d V}{d s}
$$
For a barotropic fluid, $\rho = \rho(p)$, the pressure term integrates to a function of $p$ alone, $\int d p / \rho$; for constant density it is simply $p / \rho$, and integration gives
$$
\boxed{ \frac{p}{\rho} + \frac{V^{2}}{2} + g z = \text{constant along a streamline} }
$$
**For constant density** the familiar head form, obtained by dividing by $g$:
$$
\boxed{ \frac{p}{\gamma} + \frac{V^{2}}{2 g} + z = h = \text{constant} }
\qquad \left[ \mathrm{m} \right]
$$
**From the energy equation.** Steady, adiabatic, no shaft work, no friction: the energy equation reduces to $h + V^2 / 2 = h_0$, and for an incompressible fluid $h = u + p / \rho$ with $du = 0$, giving the same result. **This is the derivation that shows what the assumptions are**, and it is the reason Bernoulli's equation for a gas is $c_p T + V^2 / 2 = c_p T_0$ — the same identity with enthalpy in place of $p / \rho$.
**From the work–energy theorem.** The pressure force on a parcel of length $d s$ does work $- A\, dp \times V$, gravity does $- \rho g A V\, dz$, and the change in kinetic energy is $\rho A V\, d\left( V^{2} / 2 \right)$. Divide by $\rho A V\, ds$.
**The three heads and their names.**
$$
\begin{array}{l l l}
p / \gamma & \text{pressure head} & \text{the piezometer's rise} \\
V^{2} / 2 g & \text{velocity head} & \text{the pitot tube's rise above the piezometer} \\
z & \text{elevation head} & \text{the height above datum} \\
p / \gamma + z & \text{hydraulic grade line (HGL)} & \\
p / \gamma + z + V^{2} / 2 g & \text{energy grade line (EGL)} & \\
p + \tfrac{1}{2} \rho V^{2} & \text{stagnation (total) pressure} & p_0 \\
\tfrac{1}{2} \rho V^{2} & \text{dynamic pressure} & q
\end{array}
$$
**The generalised energy equation** between sections 1 and 2 of a real, steady, incompressible flow:
$$
\boxed{ \frac{p_1}{\gamma} + \alpha_1 \frac{V_1^{2}}{2 g} + z_1 + h_p = \frac{p_2}{\gamma} + \alpha_2 \frac{V_2^{2}}{2 g} + z_2 + h_t + h_L }
$$
with $\alpha$ the kinetic-energy correction factor ($1.06$ turbulent, $2.0$ laminar), $h_p$ the pump head **added**, $h_t$ the turbine head **removed** and $h_L$ the loss. **Every pipe-flow problem in the next two lessons is this one equation.**
:::

::: definition Measuring velocity: the Pitot family {#def-pitot}
**The Pitot tube** brings the flow to rest isentropically and measures
$$
V = \sqrt{\frac{2 \left( p_0 - p \right)}{\rho}}
$$
**The Pitot-static tube** combines the stagnation probe and a ring of static holes in one probe. A few degrees of misalignment cost little, but the errors — chiefly in the static reading — grow quickly beyond about $10^{\circ}$ to $15^{\circ}$ of yaw, so the probe is aligned with the flow.
**The worked case.** A Pitot-static tube in air at $1.225\ \mathrm{kg / m^3}$ reads a differential of $1.20\ \mathrm{kPa}$:
$$
V = \sqrt{\frac{2 \times 1{,}200}{1.225}} = 44.3\ \mathrm{m / s} = 86.0\ \mathrm{kt}
$$
**The number that makes a Pitot tube a pressure measurement and not a velocity measurement.** The error propagates as $dV / V = \tfrac{1}{2}\, d\left( \Delta p \right) / \Delta p$, and at low speed $\Delta p$ is small: at $1\ \mathrm{m / s}$ in air $\Delta p = 0.61\ \mathrm{Pa}$, and a $0.1\ \mathrm{Pa}$ zero-drift is an $8\ \%$ velocity error. **Pitot tubes are good above $10\ \mathrm{m / s}$ in air and above $0.3\ \mathrm{m / s}$ in water**, and the reason hot-wire anemometry and laser Doppler velocimetry exist is the low end of that range.
**The compressible correction.** For a gas the isentropic relation must be used:
$$
\frac{p_0}{p} = \left( 1 + \frac{\gamma - 1}{2} M^{2} \right)^{\gamma / \left( \gamma - 1 \right)}
\quad \Rightarrow \quad
V = \sqrt{\frac{2}{\rho} \cdot \frac{\gamma}{\gamma - 1} p \left[ \left( \frac{p_0}{p} \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right]}
$$
**The incompressible formula, used with the static density, overstates the velocity** because it ignores the compression of the gas brought to rest. The error is $0.13\ \%$ at $M = 0.1$, $1.1\ \%$ at $M = 0.3$ and $8\ \%$ at $M = 0.8$ — **which is why airspeed indicators are calibrated with the compressible formula**, and why the difference between calibrated and equivalent airspeed is called the *compressibility correction* and tabulated for pilots.
**The four airspeeds.**
$$
\begin{array}{l l l}
\text{IAS} & \text{indicated} & \text{what the dial reads, instrument error included} \\
\text{CAS} & \text{calibrated} & \text{IAS corrected for probe position error} \\
\text{EAS} & \text{equivalent} & \text{CAS corrected for compressibility} \\
\text{TAS} & \text{true} & \text{EAS} \times \sqrt{\rho_0 / \rho} = \text{EAS} / \sqrt{\sigma}
\end{array}
$$
**The number that makes a high-altitude aircraft fast.** At $10{,}000\ \mathrm{m}$ in the standard atmosphere, $\rho = 0.413\ \mathrm{kg / m^3}$ and $\sigma = \rho / \rho_0 = 0.337$, so $\mathrm{TAS} = \mathrm{EAS} / 0.580 = 1.72\ \mathrm{EAS}$. **An airliner cruising at $250\ \mathrm{kt}$ EAS is doing $430\ \mathrm{kt}$ true**, and its wings carry the same dynamic pressure as at $250\ \mathrm{kt}$ at sea level because lift depends on $\tfrac{1}{2}\rho V^2$ and not on $V$.
:::

::: widget plot
f: 0.5961 + 0.0261*pow(x,2) - 0.216*pow(x,8); 1/sqrt(1-pow(x,4))
x: 0.1, 0.75
y: 0.5, 1.6
labels: Cd (corner taps, high Re); approach-velocity factor 1/sqrt(1-beta^4)
caption: Two properties of a concentric orifice plate against the diameter ratio $\beta = d / D$. The lower curve is the discharge coefficient for corner pressure taps at high Reynolds number, $C_d = 0.5961 + 0.0261 \beta^2 - 0.216 \beta^8$, the leading terms of the **Reader-Harris/Gallagher** equation used in **ISO 5167-2**; it stays close to $0.60$ up to $\beta \approx 0.6$ and falls only to $0.59$ at $\beta = 0.75$. The upper curve is the **approach-velocity factor** $E = 1 / \sqrt{1 - \beta^4}$, which multiplies the simple orifice formula and blows up as $\beta \to 1$ — at $\beta = 0.75$ it is $1.21$, and a $1\ \%$ error in $\beta$ there becomes a $0.9\ \%$ error in $E$ on top of the $2\ \%$ error in the bore area. **This is why moderate diameter ratios are preferred**, even though the standard allows $0.1 \le \beta \le 0.75$.
:::

## The classical devices

::: definition The Venturi, the orifice and the nozzle {#def-meters}
**All three are applications of continuity plus the energy equation.** For a horizontal meter with a throat area $A_t$ and a pipe area $A_1$:
$$
Q_{\mathrm{ideal}} = \frac{A_t}{\sqrt{1 - \left( A_t / A_1 \right)^{2}}} \sqrt{\frac{2 \Delta p}{\rho}}
\qquad
\boxed{ Q = \frac{C_d A_t}{\sqrt{1 - \beta^{4}}} \sqrt{\frac{2 \Delta p}{\rho}} }
$$
**The three devices compared.**
$$
\begin{array}{l c c c l}
\text{Device} & C_d & \beta\text{ range} & \text{Permanent loss} & \text{Comment} \\
\text{Classical Venturi, as cast} & 0.984 & 0.3 \text{ to } 0.75 & 10\ \%\ \text{ of } \Delta p & 21^{\circ} \text{ convergent, } 7^{\circ} \text{ to } 15^{\circ} \text{ diffuser} \\
\text{Classical Venturi, fabricated} & 0.985 & 0.4 \text{ to } 0.7 & 12\ \% & \\
\text{Flow nozzle (ISA 1932)} & 0.96 \text{ to } 0.99 & 0.2 \text{ to } 0.8 & 20 \text{ to } 30\ \% & \\
\text{Long-radius nozzle} & 0.99 & 0.2 \text{ to } 0.67 & 25\ \% & \\
\text{Orifice, corner taps} & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.75 & 40 \text{ to } 60\ \% & \text{cheapest, worst loss} \\
\text{Orifice, flange taps} & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.75 & 40 \text{ to } 60\ \% & \\
\text{Orifice, } D \text{ and } D / 2 & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.75 & 40 \text{ to } 60\ \%
\end{array}
$$
**The number that decides between them.** A $300\ \mathrm{mm}$ main carrying $0.10\ \mathrm{m^3 / s}$, metered by a device sized for a $\Delta p$ of $20\ \mathrm{kPa}$ at that flow: the **permanent** loss is about $2\ \mathrm{kPa}$ for a Venturi and, by the ISO 5167-2 estimate for an orifice of $\beta = 0.6$, about $12.5\ \mathrm{kPa}$ for an orifice. At $0.10$ per kilowatt-hour and a $60\ \%$ pump efficiency the extra $10.5\ \mathrm{kPa}$ costs the orifice
$$
P = \frac{Q \Delta p}{\eta} = \frac{0.10 \times 10{,}500}{0.6} = 1{,}750\ \mathrm{W}, \qquad
1{,}750 \times 8{,}760 \times 0.10 = 1{,}530\ \text{per year}
$$
**against a capital difference of perhaps $6{,}000$ in the orifice's favour.** **The orifice is cheaper to buy and dearer to run, and on continuous duty the Venturi pays back in about four years** — which is why orifice plates dominate where the metering is intermittent and Venturis dominate where it is continuous.
**The worked Venturi.** A cast Venturi with $D = 150\ \mathrm{mm}$, $d = 75\ \mathrm{mm}$, $C_d = 0.984$, and a mercury manometer reading $h_m = 250\ \mathrm{mm}$:
$$
\Delta p = \left( 13.55 - 1 \right) \times 9{,}810 \times 0.250 = 30{,}800\ \mathrm{Pa}
\quad \Rightarrow \quad \sqrt{2\Delta p / \rho} = 7.85\ \mathrm{m / s}
$$
$$
A_t = 4.418 \times 10^{- 3}\ \mathrm{m^2}, \qquad \frac{1}{\sqrt{1 - 0.5^4}} = 1.033
$$
$$
Q = 0.984 \times 4.418 \times 10^{- 3} \times 1.033 \times 7.85 = 0.0352\ \mathrm{m^3 / s} = 127\ \mathrm{m^3 / h}
$$
**The number that makes the manometer's fluid a design choice.** The same $\Delta p$ on an inverted **air–water** manometer would read $3.14\ \mathrm{m}$, and on an inverted **oil–water** manometer with $S = 0.8$ it would read $15.7\ \mathrm{m}$. **A manometer's reading per unit of differential goes as $1 / \left| S_m - S_f \right|$**, so a manometric fluid close in density to the flowing one buys sensitivity at the cost of a taller board — and here mercury is the sensible choice.
**The expansibility factor for gases.** For a compressible fluid the density falls through the meter and the incompressible formula **overstates** the mass flow. For orifice plates **ISO 5167-2** gives
$$
\varepsilon = 1 - \left( 0.351 + 0.256 \beta^{4} + 0.93 \beta^{8} \right) \left[ 1 - \left( \frac{p_2}{p_1} \right)^{1 / \kappa} \right]
$$
**The number that makes gas metering a pressure problem.** For air ($\kappa = 1.4$) at $\beta = 0.6$ and a $100\ \mathrm{kPa}$ drop from $700\ \mathrm{kPa}$ absolute, $p_2 / p_1 = 0.857$, $1 - 0.857^{1 / 1.4} = 0.104$ and $\varepsilon = 1 - 0.400 \times 0.104 = 0.958$ — a $4.2\ \%$ correction. **At a $300\ \mathrm{kPa}$ drop it is $13\ \%$**, and a gas custody-transfer meter specifies its pressure measurement as tightly as its differential because the mass flow goes as $\sqrt{\rho_1 \Delta p}$ with $\rho_1 \propto p_1$: **a $1\ \%$ error in the absolute pressure is a half per cent error in the mass flow.**
:::

::: definition Free efflux, Torricelli and the vena contracta {#def-efflux}
**Torricelli's theorem.** A large tank with a small orifice at a depth $h$ below the surface discharges
$$
V = \sqrt{2 g h}, \qquad Q = C_d A_o \sqrt{2 g h}
$$
**The coefficients.**
$$
\begin{array}{l c c c}
\text{Orifice type} & C_c = A_j / A_o & C_v = V / \sqrt{2 g h} & C_d = C_c C_v \\
\text{Sharp-edged, concentric} & 0.611 & 0.98 & 0.60 \text{ to } 0.62 \\
\text{Borda mouthpiece (re-entrant)} & 0.50 & 0.98 & 0.49 \\
\text{Rounded (radius} = d / 4 \text{)} & 1.00 & 0.98 & 0.98 \\
\text{Short external tube } \left( L \approx 2 \text{ to } 3\, d \right) & 1.00 & 0.82 & 0.82 \\
\text{Converging cone} & 0.92 & 0.97 & 0.89
\end{array}
$$
**The Borda mouthpiece** is the one case whose contraction can be derived from momentum alone: the fluid near the walls around a re-entrant tube is almost still, so the wall pressure is hydrostatic everywhere except opposite the tube, and the unbalanced force is $\gamma h$ over the opening's area $A$. With the jet area $C_c A$ and the jet speed $V = \sqrt{2 g h}$ from Bernoulli,
$$
\gamma h A = \rho Q V = \rho C_c A V^2 = 2 \gamma h\, C_c A \quad \Rightarrow \quad C_c = \tfrac{1}{2}
$$
**The momentum balance fixes the contraction, not the speed**, which is why the Borda mouthpiece discharges about half as much as a rounded orifice of the same bore.
**The unsteady drain.** A tank of area $A_t$ draining through an orifice $A_o$:
$$
A_t \frac{d h}{d t} = - C_d A_o \sqrt{2 g h}
\quad \Rightarrow \quad
t = \frac{2 A_t}{C_d A_o \sqrt{2 g}} \left( \sqrt{h_1} - \sqrt{h_2} \right)
$$
**The worked case.** A cylindrical tank $3.0\ \mathrm{m}$ in diameter draining from $2.0\ \mathrm{m}$ to $0.2\ \mathrm{m}$ through a $50\ \mathrm{mm}$ sharp orifice with $C_d = 0.61$:
$$
t = \frac{2 \times 7.069}{0.61 \times 1.963 \times 10^{- 3} \times 4.429} \left( 1.414 - 0.447 \right)
= 2{,}666 \times 0.967 = 2{,}578\ \mathrm{s} = 43.0\ \mathrm{min}
$$
**The number that makes the last tenth of the drain slow.** The time from $0.2\ \mathrm{m}$ to dry is $2{,}666 \times 0.447 = 1{,}192\ \mathrm{s}$, and the total from $2.0\ \mathrm{m}$ to dry is $3{,}770\ \mathrm{s}$ — **thirty-two per cent of the time for the last ten per cent of the depth**, because $t \propto \sqrt{h}$. **A tank is never fully drained on the design schedule**, and the reason a batch reactor's residence-time calculation includes a heel volume is this square root.
**The siphon.** A tube with a high point at an elevation $z_s$ above the upper reservoir's surface, discharging to a level $H$ below it (with $\sum K$ including the exit):
$$
V = \sqrt{\frac{2 g H}{1 + \sum K}}
$$
and the pressure at the summit, taking the reservoir surface as datum and $p_a$ as the local atmospheric head:
$$
\frac{p_s}{\gamma} = - z_s - \left( 1 + K_{\mathrm{entry}} \right) \frac{V^2}{2 g} - h_{L, 1 \to s}
$$
**The worked case.** $z_s = 4.0\ \mathrm{m}$, $H = 3.0\ \mathrm{m}$, $\sum K = 1.5$ in all, of which a re-entrant entry $K_{\mathrm{entry}} = 1.0$ and $0.4\ \mathrm{m}$ of friction lie upstream of the summit, water at $20\ {}^{\circ}\mathrm{C}$ with $p_a / \gamma = 10.33\ \mathrm{m}$ and $p_v / \gamma = 0.24\ \mathrm{m}$:
$$
V = \sqrt{\frac{2 \times 9.81 \times 3.0}{2.5}} = 4.85\ \mathrm{m / s}, \qquad \frac{V^2}{2 g} = 1.20\ \mathrm{m}
$$
$$
\frac{p_s}{\gamma} = - 4.0 - 2.0 \times 1.20 - 0.4 = - 6.8\ \mathrm{m}
\quad \Rightarrow \quad \frac{p_s - p_v}{\gamma} = 10.33 - 0.24 - 6.8 = 3.29\ \mathrm{m}
$$
**The siphon works, with $3.3\ \mathrm{m}$ of margin.** **Raise the summit to about $7.3\ \mathrm{m}$ and the margin is zero** — the siphon cavitates and stops, and the limit is well short of the $10.3\ \mathrm{m}$ of a barometer because of the velocity head, the entry loss and the dissolved air that comes out of solution before the vapour pressure is reached. **A siphon that has run for a week and suddenly stops has usually not cavitated but de-gassed**: air coming out of solution at nearly $7\ \mathrm{m}$ of vacuum collects at the crown until it blocks the bend, which is why a siphon's crown is fitted with an air-release point.
:::

::: definition Cavitation and NPSH {#def-npsh}
**The cavitation number.** For a body or a blade section,
$$
\sigma = \frac{p_{\mathrm{ref}} - p_v}{\tfrac{1}{2} \rho V_{\mathrm{ref}}^2}
$$
and, ignoring dissolved gas and nucleation delays, cavitation begins when $\sigma \leq - C_{p,\min}$, the **local** minimum pressure coefficient. For a hydrofoil with $C_{p,\min} = - 4.0$, incipience is at $\sigma = 4.0$.
**The net positive suction head available** at a pump's inlet, from the generalised energy equation between the suction reservoir and the impeller eye:
$$
\boxed{ \mathrm{NPSH}_A = \frac{p_a - p_v}{\gamma} \pm z_s - h_{L, s} }
$$
with $z_s$ **positive for a flooded suction** and negative for a lift, and $h_{L,s}$ the suction-line loss **including the velocity head at the flange**.
**The worked case.** Water at $60\ {}^{\circ}\mathrm{C}$ ($\gamma = 9.65\ \mathrm{kN / m^3}$, $p_v = 19.9\ \mathrm{kPa}$) drawn from an open sump through a $3\ \mathrm{m}$ lift with $0.6\ \mathrm{m}$ of friction:
$$
\mathrm{NPSH}_A = \frac{101.3 - 19.9}{9.65} - 3.0 - 0.6 = 8.44 - 3.6 = 4.84\ \mathrm{m}
$$
**against a pump whose $\mathrm{NPSH}_R$ is $2.5\ \mathrm{m}$ at the design flow** — a margin of $2.34\ \mathrm{m}$, and the installation is acceptable by the common rule of thumb that $\mathrm{NPSH}_A$ exceed $\mathrm{NPSH}_R$ by **$0.5$ to $1.0\ \mathrm{m}$ or $1.35$ times, whichever is greater**.
**The number that makes a hot-water pump fail.** At $90\ {}^{\circ}\mathrm{C}$, $p_v = 70.1\ \mathrm{kPa}$, $\gamma = 9.47\ \mathrm{kN / m^3}$ and $\left( p_a - p_v \right) / \gamma = 3.29\ \mathrm{m}$ — **less than the $3.6\ \mathrm{m}$ of lift and friction already committed**. The same installation that would have $\left( p_a - p_v \right) / \gamma = 10.1\ \mathrm{m}$ at $20\ {}^{\circ}\mathrm{C}$ cannot lift at all at $90\ {}^{\circ}\mathrm{C}$. **That is why hot-water and condensate pumps are installed with a flooded suction.**
**The specific speed and suction specific speed.**
$$
N_s = \frac{N \sqrt{Q}}{H^{3 / 4}}, \qquad
N_{ss} = \frac{N \sqrt{Q}}{\mathrm{NPSH}_R^{3 / 4}}
$$
with $N$ in rpm, $Q$ in $\mathrm{m^3 / s}$ per eye and $H$ in metres per stage. **$N_{ss}$ above about $210$ in these units (about $11{,}000$ in US customary units of rpm, gpm and feet) is usually avoided**, because an impeller with an eye enlarged far enough to reach it tends to suffer suction recirculation and a narrow range of stable operation.
:::

## Worked cases

::: example A siphon over a cofferdam {#ex-siphon}
A $200\ \mathrm{mm}$ siphon discharges a cofferdam's bilge over a $3.5\ \mathrm{m}$ crest into a river whose surface is $5.0\ \mathrm{m}$ below the cofferdam's. The total length is $28\ \mathrm{m}$, $\lambda = 0.022$, with a re-entrant entry $K = 0.8$, two $90^{\circ}$ bends $K = 0.35$ each and an exit $K = 1.0$. Find the discharge, the summit pressure and whether the siphon primes and stays primed at $25\ {}^{\circ}\mathrm{C}$.
::: solution
**The energy equation** from the cofferdam surface (1) to the outlet (2), both at atmospheric pressure, with the outlet as datum:
$$
z_1 = z_2 + \left( \lambda \frac{L}{D} + \sum K \right) \frac{V^2}{2 g}
\quad \Rightarrow \quad 5.0 = \left( 0.022 \times \frac{28}{0.2} + 0.8 + 0.7 + 1.0 \right) \frac{V^2}{2 g}
\quad \Rightarrow \quad 5.0 = 5.58\, \frac{V^2}{2 g}
\quad \Rightarrow \quad \frac{V^2}{2 g} = 0.896\ \mathrm{m}, \qquad V = 4.19\ \mathrm{m / s}
$$
$$
Q = \frac{\pi}{4} \times 0.2^2 \times 4.19 = 0.132\ \mathrm{m^3 / s} = 474\ \mathrm{m^3 / h}
$$
**The summit pressure.** Taking the cofferdam surface as datum and writing the energy equation to the summit (s), $z_s = 3.5\ \mathrm{m}$, with $10\ \mathrm{m}$ of pipe and one bend between:
$$
0 = \frac{p_s}{\gamma} + 3.5 + \left( 1 + 0.022 \times \frac{10}{0.2} + 0.8 + 0.35 \right) \frac{V^2}{2 g}
= \frac{p_s}{\gamma} + 3.5 + 3.25 \times 0.896
$$
$$
\frac{p_s}{\gamma} = - 6.41\ \mathrm{m}
\quad \Rightarrow \quad p_s = 101.3 - 6.41 \times 9.78 = 38.6\ \mathrm{kPa\ absolute}
$$
**The check against vapour and against air.** At $25\ {}^{\circ}\mathrm{C}$, $p_v = 3.17\ \mathrm{kPa}$, so the margin is $35.4\ \mathrm{kPa} = 3.62\ \mathrm{m}$ — **no cavitation**. But water in equilibrium with the atmosphere at $25\ {}^{\circ}\mathrm{C}$ holds about $17\ \mathrm{cm^3}$ of dissolved air per litre (measured at atmospheric pressure), and by **Henry's law** the amount that could come out of solution at $38.6\ \mathrm{kPa}$ is
$$
\frac{101.3 - 38.6}{101.3} \times 17 = 10.5\ \mathrm{cm^3 / L}
$$
**At $474\ \mathrm{m^3 / h}$ that is up to $5\ \mathrm{m^3}$ of air an hour.** Only a fraction actually comes out in the second or two the water spends near the summit, but what does come out collects at the crown, and that — not cavitation — is why a siphon on a construction site needs an air-release valve at its crown.
**The priming.** To prime the siphon, the water must be drawn up $3.5\ \mathrm{m}$ from the cofferdam surface to the crest, a vacuum of $3.5 \times 9.78 = 34\ \mathrm{kPa}$; a hand priming pump that can pull $85\ \mathrm{kPa}$ of vacuum does it with room to spare. An air pocket left at the crown narrows the flow passage and adds a loss, so a siphon that is re-primed without venting the crown runs below its design flow.
**The number that makes the siphon's diameter the wrong choice.** $4.19\ \mathrm{m / s}$ is a fast pipe; the friction term is $55\ \%$ of the total head. **A $250\ \mathrm{mm}$ siphon would run at $4.45\ \mathrm{m / s}$, with the friction term at $50\ \%$ and the discharge at $0.218\ \mathrm{m^3 / s}$ — a $66\ \%$ increase for a $25\ \%$ increase in diameter.** **A siphon is friction-limited, and its diameter is bought in the same currency as a pump's.**
*Sanity.* The reason the exit loss $K = 1.0$ must be included and is **not** a "loss" in the usual sense is that the jet leaves with its velocity head intact; the energy equation written to the **jet** rather than to the reservoir includes it as $V^2 / 2g$ on the right-hand side, and the two statements are identical. **A reader who omits $K = 1.0$ gets $V = 4.63\ \mathrm{m / s}$, a $10\ \%$ overestimate, and a reader who omits it **and** the entry loss gets $5.10\ \mathrm{m / s}$, a $22\ \%$ overestimate** — which is the arithmetic of every siphon that has ever been specified from a textbook example.
:::
:::

::: example A Venturi in a water main {#ex-venturi}
A fabricated Venturi with $\beta = 0.6$ is installed in a $400\ \mathrm{mm}$ main to meter $0.35\ \mathrm{m^3 / s}$. Find the differential pressure needed, the permanent pressure loss, the head the pump must add because of the meter, and the throat pressure at which cavitation begins if the main is at $250\ \mathrm{kPa}$ gauge and $20\ {}^{\circ}\mathrm{C}$.
::: solution
**The areas and the ideal velocity.**
$$
A_t = \frac{\pi}{4} \left( 0.6 \times 0.4 \right)^2 = 0.04524\ \mathrm{m^2}, \qquad
\frac{1}{\sqrt{1 - 0.6^4}} = 1.070
$$
$$
V_t = \frac{Q}{A_t} = \frac{0.35}{0.04524} = 7.74\ \mathrm{m / s}
$$
**The differential.** Inverting the meter equation, $\Delta p = \tfrac{1}{2} \rho V_t^2 \left( 1 - \beta^4 \right) / C_d^2$:
$$
\Delta p = 0.5 \times 998 \times 59.9 \times \frac{0.8704}{0.985^2} = 26{,}800\ \mathrm{Pa} = 2.74\ \mathrm{m\ of\ water}
$$
**A reasonable differential** — a $0$ to $5\ \mathrm{m}$ water-column manometer or a $0$ to $40\ \mathrm{kPa}$ differential transmitter both read it well, and a meter is sized for a $\Delta p$ of a few metres at maximum flow because $\Delta p \propto Q^2$: a $2.74\ \mathrm{m}$ meter reads $0.68\ \mathrm{m}$ at half flow and $0.17\ \mathrm{m}$ at a quarter, and the **turndown** is limited by how small a differential the transmitter can resolve.
**The permanent loss.** For a fabricated Venturi the loss is $12\ \%$ of the differential:
$$
\Delta p_{\mathrm{perm}} = 0.12 \times 26.8 = 3.22\ \mathrm{kPa} = 0.33\ \mathrm{m}
$$
**The pumping cost.**
$$
P = \frac{Q \Delta p_{\mathrm{perm}}}{\eta} = \frac{0.35 \times 3{,}220}{0.7} = 1{,}610\ \mathrm{W}
$$
**$14{,}100\ \mathrm{kWh}$ a year, about $1{,}700$ of electricity at $0.12$ per kilowatt-hour.** An orifice plate producing the same differential would lose about $50\ \%$ of it instead of $12\ \%$, that is $13.4\ \mathrm{kPa}$ rather than $3.2\ \mathrm{kPa}$, and would cost $6{,}700\ \mathrm{W}$ and $58{,}700\ \mathrm{kWh}$ a year, about $7{,}000$. **The $5{,}300$ a year is the reason a continuously metered main carries a Venturi.**
**The throat pressure and cavitation.** With the main at $250\ \mathrm{kPa}$ gauge and the Venturi horizontal,
$$
p_t = p_1 - \Delta p = 250 - 26.8 = 223.2\ \mathrm{kPa\ gauge} = 324.5\ \mathrm{kPa\ absolute}
$$
**against a vapour pressure of $2.34\ \mathrm{kPa}$ absolute at $20\ {}^{\circ}\mathrm{C}$** — a margin of $322\ \mathrm{kPa}$, and cavitation is impossible. **The cavitation number is**
$$
\sigma = \frac{p_t - p_v}{\tfrac{1}{2} \rho V_t^2} = \frac{322{,}200}{29{,}900} = 10.8
$$
**The number that makes a Venturi cavitate.** The same Venturi with the main at **$- 45\ \mathrm{kPa}$ gauge** (a suction main below a tailrace) gives $p_t = - 72\ \mathrm{kPa}$ gauge $= 29.5\ \mathrm{kPa}$ absolute and $\sigma = 0.91$ — the throat is within $27\ \mathrm{kPa}$ of boiling and the local pressure dips at the throat entry could reach it, so the meter is marginal. A suction-side Venturi is made with a **larger** $\beta$ to keep the throat velocity — and therefore the throat depression — down.
*Sanity.* The throat pressure is $26.8\ \mathrm{kPa}$ below the main pressure and not $\tfrac{1}{2}\rho V_t^2 = 29.9\ \mathrm{kPa}$ because of the approach velocity: the main's own velocity head is $0.5 \times 998 \times 2.79^2 = 3{,}870\ \mathrm{Pa}$, and $29.9 - 3.9 = 26.0\ \mathrm{kPa}$, the remaining $3\ \%$ being the $1 / C_d^2$ allowance for friction in the convergent. **At high $\beta$ the approach velocity head is a large fraction of the differential and the $\sqrt{1 - \beta^4}$ correction is not optional.**
:::
:::

::: example Bernoulli with a pump and a turbine {#ex-hydro}
A micro-hydro site has a $42\ \mathrm{m}$ gross head, a $180\ \mathrm{m}$ long $350\ \mathrm{mm}$ diameter penstock of $\lambda = 0.018$, and a Pelton turbine of $88\ \%$ efficiency. Find the design flow, the turbine head, the power, and the penstock diameter that maximises the annual energy if the flow is available continuously.
::: solution
**The energy equation** from the reservoir surface (1) to the nozzle outlet (2), the latter at atmospheric pressure and elevation $z_2 = 0$:
$$
H_g = \left( 1 + \lambda \frac{L}{D} \right) \frac{V^2}{2 g} + h_t
\qquad \text{with} \qquad h_L = \lambda \frac{L}{D} \frac{V^2}{2 g}
$$
**At the design flow**, taking $Q = 0.20\ \mathrm{m^3 / s}$:
$$
V = \frac{0.20}{0.09621} = 2.079\ \mathrm{m / s}, \qquad \frac{V^2}{2 g} = 0.220\ \mathrm{m}, \qquad
h_L = 0.018 \times \frac{180}{0.35} \times 0.220 = 2.04\ \mathrm{m}
$$
$$
h_t = 42 - 2.04 - 0.22 = 39.7\ \mathrm{m}
\qquad
P = \eta \rho g Q h_t = 0.88 \times 9{,}810 \times 0.20 \times 39.7 = 68.6\ \mathrm{kW}
$$
**The loss is $4.9\ \%$ of the gross head** and the nozzle's velocity head a further $0.5\ \%$.
**The optimum diameter.** The energy available for sale is $P = \eta \rho g Q \left( H_g - h_L \right)$ with
$$
h_L = \frac{\lambda L}{D} \frac{Q^2}{2 g A^2} = \frac{8 \lambda L Q^2}{\pi^2 g D^5}
$$
**The classic economic rule** — the *economic diameter* criterion — is that the diameter should be chosen so the **annual saving in pumping energy equals the annual cost of the extra metal**, which for steel penstock at typical prices gives a velocity of
$$
V_{\mathrm{econ}} \approx 1.5 \text{ to } 2.5\ \mathrm{m / s} \quad \text{for a continuously-run plant}, \qquad
V_{\mathrm{econ}} \approx 3 \text{ to } 4\ \mathrm{m / s} \quad \text{for a peaking plant}
$$
**The number that makes the answer a financial one.** At $V = 2.08\ \mathrm{m / s}$ the design is within the continuous-run range. **Doubling the diameter to $700\ \mathrm{mm}$ cuts $h_L$ by $32$ (from $D^{-5}$) to $0.06\ \mathrm{m}$ and gains $1.98\ \mathrm{m}$ of head, or $3.4\ \mathrm{kW}$ — $30{,}000\ \mathrm{kWh}$ a year, about $3{,}600$ at $0.12$ per kilowatt-hour.** With an $8\ \mathrm{mm}$ wall the extra steel alone is $\pi \times \left( 0.70 - 0.35 \right) \times 0.008 \times 7{,}850 \times 180 = 12.4\ \mathrm{t}$, about $31{,}000$ at $2{,}500 / \mathrm{t}$ installed — a nine-year payback before the wider trench, larger anchor blocks and bigger valves are counted, **which is why the smaller penstock is kept unless money is cheap and the plant's life long.**
**The surge check.** Closing the nozzle in $6\ \mathrm{s}$ against a $2.08\ \mathrm{m / s}$ flow in $180\ \mathrm{m}$ of pipe gives a rigid-column water hammer of
$$
\Delta h = \frac{L V}{g t} = \frac{180 \times 2.079}{9.81 \times 6} = 6.36\ \mathrm{m}
$$
**against a $42\ \mathrm{m}$ head — $15\ \%$**, whereas the elastic **Joukowsky** pressure rise, $\Delta p = \rho c \Delta V$ with $c \approx 1{,}100\ \mathrm{m / s}$ for a steel pipe, would be $2.3\ \mathrm{MPa}$ ($233\ \mathrm{m}$) for an instantaneous closure. **The closing time must exceed $2 L / c = 0.33\ \mathrm{s}$ for the rigid-column formula to apply, and $6\ \mathrm{s}$ is comfortably longer.**
*Sanity.* The head loss goes as $D^{-5}$ because at fixed flow $V \propto D^{-2}$, so the velocity head goes as $D^{-4}$, and the friction term carries a further $L / D$: $h_L \propto V^2 / D \propto Q^2 / D^5$. **A ten per cent increase in diameter buys a thirty-eight per cent reduction in friction**, and the reason penstocks are as large as they look is this exponent and not conservatism.
:::
:::

::: example A free vortex and a bathtub {#ex-vortex}
Water is drained from a circular tank through a central outlet, forming a free vortex of surface depression $z(r)$. Find the shape of the surface, and find the depression at the wall of a $1.2\ \mathrm{m}$ diameter tank discharging $0.05\ \mathrm{m^3 / s}$ through a $150\ \mathrm{mm}$ outlet, with a vortex strength set by the tank's rotation rate of $0.8\ \mathrm{rad / s}$ at $r = 0.3\ \mathrm{m}$.
::: solution
**The free vortex.** $V_{\theta} = C / r$, and with the tangential velocity varying as $1 / r$ the flow is irrotational everywhere except at the origin. The radial momentum balance is
$$
\frac{1}{\rho} \frac{d p}{d r} = \frac{V_{\theta}^2}{r} = \frac{C^2}{r^3}
$$
and with a free surface at $p = p_a$, $p = p_a - \rho g \left( z - z_0 \right)$:
$$
- g \frac{d z}{d r} = \frac{C^2}{r^3}
\quad \Rightarrow \quad
z \left( r \right) = z_{\infty} - \frac{C^2}{2 g r^2}
$$
**not a paraboloid but a surface that falls as $1 / r^2$** — and the reason a whirlpool's surface is a funnel and not a cone is the $r^{-2}$.
**The strength.** $C = r V_{\theta} = r^2 \Omega$ at a radius where the rotation is known: $C = 0.3^2 \times 0.8 = 0.072\ \mathrm{m^2 / s}$.
**The depression at the wall.** $r_w = 0.6\ \mathrm{m}$:
$$
\Delta z = \frac{C^2}{2 g r_w^2} = \frac{5.18 \times 10^{- 3}}{19.62 \times 0.36} = 0.73\ \mathrm{mm}
$$
**A fraction of a millimetre — invisible.** At $r = 0.15\ \mathrm{m}$ (the outlet's radius) the depression is $0.73 \times \left( 0.6 / 0.15 \right)^2 = 11.7\ \mathrm{mm}$, and at $r = 0.05\ \mathrm{m}$ it is $106\ \mathrm{mm}$ — **the funnel appears only in the last tenth of the tank's radius**, and the reason a vortex is a sudden, local phenomenon rather than a general tilt of the surface is the $r^{-2}$.
**The number that makes a vortex a design problem.** The depression at the outlet must be compared with the submergence $S$ of the intake: **a vortex forms and draws air when $\Delta z$ at the outlet exceeds $S$**, and the **ANSI/HI 9.8** recommendation for the minimum submergence of an intake is
$$
S \geq D \left( 1 + 2.3\, \mathrm{Fr}_D \right), \qquad \mathrm{Fr}_D = \frac{V}{\sqrt{g D}}
$$
With $D = 0.15\ \mathrm{m}$, $Q = 0.05\ \mathrm{m^3 / s}$: $V = 0.05 / 0.01767 = 2.83\ \mathrm{m / s}$, $\mathrm{Fr}_D = 2.83 / \sqrt{9.81 \times 0.15} = 2.33$, so
$$
S \geq 0.15 \times \left( 1 + 2.3 \times 2.33 \right) = 0.95\ \mathrm{m}
$$
**About a metre of submergence for a $150\ \mathrm{mm}$ outlet — more than six diameters** — and a pump sump is often deeper than NPSH alone would require because of this formula. **Even a few per cent of entrained air by volume measurably reduces a centrifugal pump's head and efficiency**, and much more can make it lose its prime.
*Sanity.* The reason the free-vortex surface is a **depression** and a **forced** vortex's ($V_\theta = \Omega r$) is a **rise** is that the forced vortex's paraboloid, $z = \Omega^2 r^2 / 2g$, increases outward from the axis, while the free vortex's $- C^2 / \left( 2 g r^2 \right)$ decreases toward it. **A stirred tank has a forced vortex in its core and a free vortex outside**, and the transition radius is where the two match — which is why a stirrer's surface looks like a flat-bottomed funnel with a steep wall.
:::
:::

::: history
**The equation in its modern form is not quite Bernoulli's.** **Torricelli** had $V = \sqrt{2gh}$ in his *Opera geometrica* of **1644**, as a consequence of Galileo's law of fall. **Daniel Bernoulli**'s *Hydrodynamica* of **1738** gave the first systematic treatment of the trade-off between pressure and speed — argued from the conservation of *vis viva* (kinetic energy), and with an early kinetic theory of gases in the same book — and his father **Johann** produced *Hydraulica*, published in **1742–43** but dated **1732** so as to appear to come first. **Euler** wrote the equations of motion of an ideal fluid in the **1750s** (published **1757**) and obtained the relation in essentially its present form. **The Pitot tube** was described by **Henri Pitot** to the Paris Academy in **1732**, after he used it to measure the flow of the Seine; **Henry Darcy** improved it in **1858**, and the combined Pitot-static tube in its familiar form is associated with **Ludwig Prandtl** at Göttingen in the early twentieth century. **The Venturi meter** is named after **Giovanni Battista Venturi**, whose experiments on flow through conical tubes were published in **1797**; **Clemens Herschel** developed it into a flow meter at **Holyoke**, Massachusetts, describing it in **1887** and naming it after Venturi. **Orifice-plate coefficients** were established by large calibration programmes in the **1920s and 1930s**, notably for the American Gas Association and ASME, and the equation now in **ISO 5167** (the Reader-Harris/Gallagher equation) rests on a much larger database collected later.
:::

::: quiz
A Venturi meter and a sharp-edged orifice plate of the same throat diameter pass the same flow in the same pipe. Which has the larger *permanent* pressure loss, and why?

- [ ] The Venturi, because its converging cone accelerates the flow harder
- [x] The orifice, because the flow separates at the sharp edge, contracts to a vena contracta of about $0.62$ of the orifice area, and then decelerates in a turbulent free expansion that recovers almost none of the kinetic energy the throat created
- [ ] Neither, because Bernoulli's equation is lossless and both recover the same fraction
- [ ] The orifice, because its discharge coefficient is less than one

::: solution
**The orifice, by roughly a factor of five.** A well-made Venturi returns $85$–$95\ \%$ of the differential it creates; a sharp orifice recovers only $25$–$35\ \%$, so of a $50\ \mathrm{kPa}$ differential some $35\ \mathrm{kPa}$ is gone for ever as heat and noise. **The fourth option is the trap: a discharge coefficient below unity is a correction to the *ideal flow rate* — it accounts for the streamline curvature and the vena contracta — and it is not a statement about losses, though the two have the same origin.** The practical consequence is a genuine economic one: an orifice is a tenth the price of a Venturi, and the pumping power it wastes over twenty years is worth many Venturis, which is why orifice plates are used where the metering is occasional and Venturis where it is continuous. **The vena contracta is also the reason an orifice's pressure tap locations matter: at $D$ and $0.5 D$ you measure one coefficient, at the flanges another, and at the throat itself a third, and quoting a table against the wrong tap arrangement is an error of up to a few per cent that nobody can see.**
:::
:::

## Where this leads

Bernoulli with a loss term and a shaft-work term is the generalised energy equation that organises [[fluid-mechanics/pipe-flow]]; Bernoulli along a streamline plus the tangential momentum equation is [[fluid-mechanics/boundary-layers-drag]]'s pressure-gradient input and the reason a boundary layer separates; Bernoulli's incompressibility is what [[fluid-mechanics/compressible-flow]] removes; and Bernoulli's assumption of zero viscosity is exactly what [[fluid-mechanics/navier-stokes]] puts back.

::: summary
- Bernoulli is energy bookkeeping for an inviscid, steady, incompressible, shaft-work-free flow, and its constant holds along a streamline — everywhere only if the flow is irrotational.
- The HGL is $p/\gamma + z$; the EGL adds the velocity head. Cavitation is an HGL question.
- A Pitot tube measures a pressure and infers a velocity; the error grows at low speed, and above $M \approx 0.3$ the compressible formula is needed.
- Meters are continuity plus Bernoulli with a $C_d$: Venturi $0.985$, nozzle $0.96$ to $0.99$, orifice $0.61$ — and the orifice's low $C_d$ is mostly the contraction of the jet, not friction.
- Torricelli's $t \propto \sqrt{h}$ means the last tenth of a drain takes a third of the time.
- A siphon's limit is set by dissolved air coming out of solution as well as by the vapour pressure.
- NPSH is a pressure-head arithmetic, and hot water is what makes it fail.
- The $D^{-5}$ in a penstock's head loss makes pipe diameter a trade between operating cost and capital.
:::

## Exercises

::: exercise Torricelli {level=1 check="8.86"}
Give the efflux velocity in metres per second from an orifice $4\ \mathrm{m}$ below a water surface.
::: solution
$V = \sqrt{2 g h} = \sqrt{2 \times 9.81 \times 4} = \sqrt{78.48} = 8.86\ \mathrm{m/s}$.
:::
:::

::: exercise Pitot {level=1 check="44.3"}
Give the air speed in metres per second for a Pitot differential of $1.20\ \mathrm{kPa}$ at $\rho = 1.225\ \mathrm{kg/m^3}$.
::: solution
$V = \sqrt{2 \times 1200 / 1.225} = 44.3\ \mathrm{m/s}$.
:::
:::

::: exercise Dynamic pressure {level=1 check="980"}
Give the dynamic pressure in pascals of air at $1.225\ \mathrm{kg/m^3}$ moving at $40\ \mathrm{m/s}$.
::: solution
$q = \tfrac{1}{2} \times 1.225 \times 40^2 = 0.5 \times 1.225 \times 1600 = 980\ \mathrm{Pa}$.
:::
:::

::: exercise Velocity head {level=1 check="0.90"}
Give the velocity head in metres of the siphon flow of $4.19\ \mathrm{m/s}$.
::: solution
$V^2 / 2g = 17.56 / 19.62 = 0.895\ \mathrm{m}$.
:::
:::

::: exercise NPSH {level=1 check="4.84"}
Give the NPSH available in metres for water at $60\ {}^{\circ}\mathrm{C}$, an atmospheric head of $10.5\ \mathrm{m}$, a vapour head of $2.06\ \mathrm{m}$, a $3.0\ \mathrm{m}$ lift and $0.6\ \mathrm{m}$ of friction.
::: solution
$\mathrm{NPSH}_A = 10.5 - 2.06 - 3.0 - 0.6 = 4.84\ \mathrm{m}$.
:::
:::

::: exercise Approach factor {level=1 check="1.072"}
Give the approach-velocity factor $1 / \sqrt{1 - \beta^4}$ for $\beta = 0.6$.
::: solution
$1 / \sqrt{1 - 0.1296} = 1 / 0.9325 = 1.072$.
:::
:::

::: exercise Vortex {level=1 check="0.072"}
Give the strength $C$ of a free vortex whose rotation rate is $0.8\ \mathrm{rad/s}$ at a radius of $0.3\ \mathrm{m}$.
::: solution
$C = r^2 \Omega = 0.09 \times 0.8 = 0.072\ \mathrm{m^2 / s}$.
:::
:::

::: exercise Orifice {level=2}
A $25\ \mathrm{mm}$ sharp-edged orifice with $C_d = 0.61$ is set in the vertical side of a tank whose surface is $2.2\ \mathrm{m}$ above the orifice centre. Give the discharge.
::: solution
$$
Q = C_d A \sqrt{2 g h} = 0.61 \times 4.909 \times 10^{-4} \times \sqrt{19.62 \times 2.2}
= 0.61 \times 4.909 \times 10^{-4} \times 6.567 = 1.965 \times 10^{-3}\ \mathrm{m^3 / s}
$$
**$7.1\ \mathrm{m^3 / h}$**, and the jet's range from an orifice at depth $h$ below the surface and height $y$ above the floor is $2\sqrt{h y}$ (neglecting $C_v$).
:::
:::

::: exercise Manometer and Bernoulli {level=2}
A horizontal Venturi with $\beta = 0.5$ carries water and is connected to an inverted U-tube filled with oil of specific gravity $0.82$. If the reading is $600\ \mathrm{mm}$, give the throat velocity.
::: solution
$$
\Delta p = \left( 1 - 0.82 \right) \rho_w g h_m = 0.18 \times 9{,}810 \times 0.600 = 1{,}059\ \mathrm{Pa}
$$
$$
V_t = \frac{1}{\sqrt{1 - 0.5^4}} \sqrt{\frac{2 \Delta p}{\rho}} = 1.033 \times \sqrt{2.12} = 1.033 \times 1.456 = 1.50\ \mathrm{m / s}
$$
**The reading.** An inverted manometer is used on liquids when the differential is **small**, because its sensitivity goes as $1 / \left( 1 - S_o \right)$ — an oil of $S = 0.95$ would multiply the reading by twenty relative to an air-filled inverted U-tube and turn a $30\ \mathrm{mm}$ deflection into a $600\ \mathrm{mm}$ one. **The closer the manometric fluid's density to the water's, the better the resolution**, but the more easily the interface is disturbed.
:::
:::

::: exercise Derivation {level=3}
Derive the discharge coefficient of a sharp-edged orifice from the momentum equation and the definition of $C_c$, and show why it is $0.61$ and not $1.0$.
::: solution
**The control volume** around the orifice, from the undisturbed pipe (1) to the vena contracta (j), with the pressure at the jet equal to the ambient. The $x$-momentum equation, with $p_1$ the pressure just upstream of the plate:
$$
p_1 A_j + F_{\text{plate on fluid}} = \rho Q V_j - \rho Q V_1
$$
**The plate's force is not known**, so take the control volume out to the **full pipe area** and use the fact that the pressure on the annular face of the plate is nearly $p_1$:
$$
p_1 A_1 - p_1 \left( A_1 - A_o \right) = p_1 A_o \quad \text{(the unbalanced force on the orifice opening)}
$$
so
$$
p_1 A_o - \rho Q \left( V_j - V_1 \right) = 0
\quad \text{(neglecting the wall shear and } V_1 \text{)}
\quad \Rightarrow \quad p_1 A_o = \rho Q V_j
$$
**Bernoulli from 1 to j** with $p_j = 0$ gauge and $V_1 \ll V_j$:
$$
p_1 = \tfrac{1}{2} \rho V_j^2
$$
**Combining:**
$$
\tfrac{1}{2} \rho V_j^2 A_o = \rho \left( C_c A_o V_j \right) V_j
\quad \Rightarrow \quad C_c = \tfrac{1}{2}
$$
**which is the Borda result and not the orifice's $0.61$.** **The difference is the pressure on the annular face**, which is **not** $p_1$: the streamlines curve around the orifice's edge and the pressure on the plate's upstream face near the opening falls well below $p_1$, so the plate experiences a **suction** toward the opening that widens the jet. The rigorous value comes from the **Kirchhoff free-streamline solution of 1869**, in which the jet is bounded by a surface of constant pressure and constant speed:
$$
\boxed{ C_c = \frac{\pi}{\pi + 2} = 0.611 \quad \text{(two-dimensional slot, Kirchhoff 1869)} }
$$
The axisymmetric value for a small round orifice is close to it, about $0.6$. **With $C_v = 0.98$, $C_d = 0.60$.**
*Sanity.* The reason the naive momentum argument gives $0.5$ is that it assumes the pressure on the plate's face is undisturbed, and the reason the true value is $0.611$ and not $0.5$ is that the pressure deficit on the annular face **pushes the jet outward**, widening the contraction. **The Borda mouthpiece really is $0.50$ because its re-entrant lip forces the flow to turn through $180^{\circ}$ and restores the pressure to $p_1$ on that face** — which is the check that the momentum analysis is right and that the orifice's extra $0.11$ is a pressure field and not a measurement error.
:::
:::

::: exercise Design {level=3}
Specify the complete suction arrangement of a cooling-water pump taking $0.9\ \mathrm{m^3 / s}$ of water at $35\ {}^{\circ}\mathrm{C}$ from an open sump whose level swings $\pm 1.2\ \mathrm{m}$, and state the acceptance tests.
::: solution
**The duty.**
$$
Q = 0.9\ \mathrm{m^3 / s}, \qquad H = 32\ \mathrm{m}, \qquad N = 735\ \mathrm{rpm}, \qquad \text{split-case, double-suction}
$$
**The NPSH available**, at the **lowest** sump level with the pump's centreline $2.0\ \mathrm{m}$ above the normal level:
$$
\mathrm{NPSH}_A = \frac{p_a - p_v}{\gamma} - z_s - h_{L,s}
$$
At $35\ {}^{\circ}\mathrm{C}$, $p_v = 5.63\ \mathrm{kPa}$, $\gamma = 9.75\ \mathrm{kN / m^3}$, and at the site altitude $p_a = 99.2\ \mathrm{kPa}$:
$$
\frac{p_a - p_v}{\gamma} = \frac{99.2 - 5.63}{9.75} = 9.60\ \mathrm{m}
$$
**The suction pipe.** A single $600\ \mathrm{mm}$ line would run at $3.18\ \mathrm{m / s}$, too fast for a suction line, so
$$
D = 700\ \mathrm{mm}, \qquad V = 2.34\ \mathrm{m / s}, \qquad \frac{V^2}{2 g} = 0.279\ \mathrm{m}
$$
$$
h_{L, s} = \left( \lambda \frac{L}{D} + K_{\mathrm{entry}} + K_{\mathrm{bend}} + K_{\mathrm{valve}} + 1.0 \right) \frac{V^2}{2 g}
= \left( 0.016 \times \frac{12}{0.7} + 0.5 + 0.3 + 0.2 + 1.0 \right) \times 0.279
$$
$$
= 2.274 \times 0.279 = 0.63\ \mathrm{m}
$$
**The worst-case NPSH available**, with the sump at its low level $\left( z_s = 3.2\ \mathrm{m} \right)$:
$$
\mathrm{NPSH}_A = 9.60 - 3.2 - 0.63 = 5.77\ \mathrm{m}
$$
**The pump's requirement.** A double-suction split-case at $N_s = 735 \sqrt{0.45} / 32^{3 / 4} = 37$ (per eye) has $\mathrm{NPSH}_R = 3.2\ \mathrm{m}$ at $0.9\ \mathrm{m^3 / s}$, and the **run-out** requirement at $1.3 \times Q$ is $5.1\ \mathrm{m}$.
$$
\text{Margin at run-out} = 5.77 - 5.1 = 0.67\ \mathrm{m}
$$
**The number that decides the design.** The margin is $0.67\ \mathrm{m}$ against the customary $1.35 \times$ rule, which would require $5.1 \times 1.35 = 6.9\ \mathrm{m}$ — **the design fails**. The remedies, in order of cost: **lower the pump centreline by $1.2\ \mathrm{m}$** (gains $1.2\ \mathrm{m}$, giving $6.97\ \mathrm{m}$, just enough; requires a deeper pump house), **enlarge the suction to $800\ \mathrm{mm}$** (gains $0.28\ \mathrm{m}$), or **cap the impeller's run-out** with a casing wear limit (gains $1.4\ \mathrm{m}$ of requirement but costs turndown). **The first is chosen; since its margin is thin, many designers go further and set the pump below the low sump level, with a flooded suction.**
**The vortex and air-entrainment check.** With $D = 0.7\ \mathrm{m}$ and $Q = 0.9\ \mathrm{m^3 / s}$:
$$
\mathrm{Fr}_D = \frac{2.34}{\sqrt{9.81 \times 0.7}} = 0.89
\qquad
S \geq D \left( 1 + 2.3\, \mathrm{Fr}_D \right) = 0.7 \times \left( 1 + 2.3 \times 0.89 \right) = 2.14\ \mathrm{m}
$$
(strictly $D$ is the bell-mouth diameter, which is larger than the pipe's; using the pipe's here is a first estimate). **The intake must be at least $2.2\ \mathrm{m}$ below the lowest operating level**, with the bell mouth's clearance above the floor $0.3 D$ to $0.5 D$, so the sump floor is about $2.5\ \mathrm{m}$ below the low level. **The reason a cooling-water sump is deep and not wide is this formula**, and its approach channel is kept straight and unobstructed so that the velocity at the bell mouth is uniform to within about $\pm 10\ \%$.
**The acceptance tests.**
$$
\begin{array}{l l}
\text{NPSH}_R & \text{tested to HI 14.6 at } 100 \text{ and } 130\ \% \text{ of duty, } 3\ \% \text{ head-drop criterion} \\
\text{Sump model} & \text{Froude-scaled, no air-entraining surface vortex at the intake} \\
\text{Air entrainment} & \leq 0.5\ \% \text{ by volume at the pump flange} \\
\text{Velocity approach} & \pm 10\ \% \text{ over the bell mouth's projected area} \\
\text{Pressure fluctuation} & \leq 5\ \% \text{ of the velocity head at the suction flange}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE PUMP SHALL BE TESTED FOR NPSH AT THE RUN-OUT FLOW AND NOT AT THE RATED FLOW."** **"THE SUMP SHALL BE MODEL-TESTED AT FULL FROUDE SIMILITUDE OVER THE ACTUAL RANGE OF SUMP LEVELS AND WITH THE ACTUAL APPROACH CHANNEL."** **"THE NPSH MARGIN SHALL BE STATED AS AN ABSOLUTE VALUE AND AS A RATIO, AND THE GREATER OF THE TWO SHALL GOVERN."** **"THE SUCTION LINE SHALL HAVE NO HIGH POINT AND NO REDUCER OTHER THAN AN ECCENTRIC ONE WITH THE FLAT SIDE UP."**
*Design comment.* The general rule is that **a pump does not cavitate because of the pump but because of the pipe, the sump and the water temperature**, and that a suction arrangement is verified by a model test and a NPSH test and never by a calculation — which is why the calculation is done first, so that the model test is a confirmation and not a diagnosis.
:::
:::
