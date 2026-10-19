Bernoulli's equation is a statement of conservation of energy for a fluid that is not allowed to be viscous, unsteady, rotating, compressible or pumped — and it is nevertheless the single most used equation in fluid mechanics, because those five prohibitions are, in a surprising number of engineering places, only mildly broken.

Read it correctly and it is a **bookkeeping identity**: the work done by pressure on a parcel plus the work done by gravity equals the change in its kinetic energy. Read it incorrectly and it becomes a licence to write $p + \tfrac{1}{2}\rho V^2 = $ constant anywhere, which is false on almost every real flow field. The whole of this lesson is the difference between those two readings.

::: warning Seven Bernoulli errors that survive into published reports
**Applying it between two points on different streamlines in a rotational flow.** The Bernoulli constant $p + \tfrac{1}{2}\rho V^2 + \rho g z$ is **the same everywhere** only when the flow is **irrotational**; in general it is constant **along a streamline only**. In a pipe's fully developed profile the constant differs from the axis to the wall by $\tfrac{1}{2}\rho (U_c^2 - \bar{V}^2)$, which for laminar flow is $\tfrac{1}{2}\rho \bar{V}^2 (4 - 1) = 1.5$ velocity heads. **A pitot tube traversing a laminar pipe reads a parabolic profile and a student who averages the pressures gets the wrong mean velocity** — the mean of $\sqrt{2\Delta p / \rho}$ is not $\sqrt{2\overline{\Delta p}/\rho}$. **Using Bernoulli through a device that adds or removes energy.** A pump, a turbine, a fan, a compressor, a heater and a combustion chamber all break the equation. The generalised form carries $h_p - h_t - h_L$, and the fact that $h_L$ is **not** a property of the fluid but of the geometry and the Reynolds number is the reason a "Bernoulli problem" with a hidden loss coefficient is a different problem from the same geometry at a tenth of the flow. **Forgetting the velocity head at a discharge.** A pipe emptying into a reservoir loses its whole velocity head; a pipe emptying to atmosphere has that head **recovered** as kinetic energy in the jet. The two differ by $\tfrac{1}{2}\rho V^2$ — which for $3\ \mathrm{m / s}$ is $4.5\ \mathrm{kPa}$, or $0.46\ \mathrm{m}$ of water, which is often the whole available head. **Confusing the hydraulic grade line with the energy grade line.** The HGL is $p/\gamma + z$ and the EGL is $p/\gamma + z + V^2 / 2g$; they are separated by the velocity head, which in a fast main can be $5\ \mathrm{m}$ and in a reservoir zero. **A pipe whose HGL falls below its crown is cavitating**, and a reader who plots the EGL instead sees no problem at all. **Using absolute and gauge pressures inconsistently.** Bernoulli is linear in $p$ so either works **provided the same datum is used throughout**; the exception is anywhere the **vapour pressure** enters — cavitation, NPSH, siphons over a high point, and cavitating Venturis — where the difference between $101\ \mathrm{kPa}$ absolute and $0\ \mathrm{kPa}$ gauge is the whole of the answer. **Applying it to a jet after the vena contracta and before the pressure has recovered.** A sharp-edged orifice's jet contracts to $0.61$ of the orifice area and its pressure in the contraction is **below** the downstream pressure; applying Bernoulli between the pipe and the vena contracta gives the correct $0.61$ and applying it between the pipe and a section two diameters downstream gives a discharge coefficient of $0.98$ and a $20\%$ flow error. **The orifice's $C_d$ of $0.61$ is not a loss of sharpness; it is the pressure recovery that has not happened yet.** **Assuming the flow is steady when the timescale matters.** The unsteady term $\int \partial V / \partial t\, ds$ is the whole of water hammer, the whole of the sloshing of a tank and the whole of the "why does my siphon stop" question. For a $100\ \mathrm{m}$ pipeline filling in $5\ \mathrm{s}$ the term is $L\, \bar{V} / t = 100 \times 2 / 5 = 40\ \mathrm{m}$ of head — **larger than the static head driving the flow**.
:::

## The equation and what it costs

::: definition The derivations {#def-derivations}
**From Euler's equation along a streamline.** For steady, inviscid flow the momentum equation resolved along a streamline $s$ is
$$
- \frac{1}{\rho} \frac{d p}{d s} - g \frac{d z}{d s} = V \frac{d V}{d s}
$$
and for a barotropic fluid $\int d p / \rho = \int d p / \rho$, so integration gives
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
**The Pitot-static tube** combines the stagnation probe and a static wall tap in one probe, and its calibration is the reason it must be **aligned within $\pm 4^{\circ}$** of the flow: at $8^{\circ}$ off the flow the indicated velocity is low by $0.5\ \%$ and the static pressure is in error by $- 1.5\ \%$, and at $15^{\circ}$ the errors are $3$ and $10\ \%$.
**The worked case.** A Pitot-static tube in air at $1.225\ \mathrm{kg / m^3}$ reads a differential of $1.20\ \mathrm{kPa}$:
$$
V = \sqrt{\frac{2 \times 1{,}200}{1.225}} = 44.3\ \mathrm{m / s} = 86.1\ \mathrm{kt}
$$
**The number that makes a Pitot tube a pressure measurement and not a velocity measurement.** The error propagates as $dV / V = \tfrac{1}{2}\, d\left( \Delta p \right) / \Delta p$, and at low speed $\Delta p$ is small: at $1\ \mathrm{m / s}$ in air $\Delta p = 0.61\ \mathrm{Pa}$, and a $0.1\ \mathrm{Pa}$ zero-drift is a $9\ \%$ velocity error. **Pitot tubes are good above $10\ \mathrm{m / s}$ in air and above $0.3\ \mathrm{m / s}$ in water**, and the reason hot-wire anemometry and laser Doppler velocimetry exist is the low end of that range.
**The compressible correction.** For a gas the isentropic relation must be used:
$$
\frac{p_0}{p} = \left( 1 + \frac{\gamma - 1}{2} M^{2} \right)^{\gamma / \left( \gamma - 1 \right)}
\quad \Rightarrow \quad
V = \sqrt{\frac{2}{\rho} \cdot \frac{\gamma}{\gamma - 1} p \left[ \left( \frac{p_0}{p} \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right]}
$$
**The incompressible formula overstates the velocity** because it ignores the density drop. The error is $0.25\ \%$ at $M = 0.1$, $2.5\ \%$ at $M = 0.3$ and $23\ \%$ at $M = 0.8$ — **which is why an airspeed indicator is only correct below about $100\ \mathrm{kt}$** and why the correction is called *compressibility error* and tabulated in every pilot's manual.
**The four airspeeds.**
$$
\begin{array}{l l l}
\text{IAS} & \text{indicated} & \text{what the dial reads, instrument error included} \\
\text{CAS} & \text{calibrated} & \text{IAS corrected for probe position error} \\
\text{EAS} & \text{equivalent} & \text{CAS corrected for compressibility} \\
\text{TAS} & \text{true} & \text{EAS} \times \sqrt{\rho_0 / \rho} = \text{EAS} \times \sqrt{\sigma}^{- 1}
\end{array}
$$
**The number that makes a high-altitude aircraft fast.** At $10{,}000\ \mathrm{m}$, $\rho / \rho_0 = 0.413$, so $\mathrm{TAS} = \mathrm{EAS} / 0.643 = 1.56\ \mathrm{EAS}$. **An airliner cruising at $250\ \mathrm{kt}$ EAS is doing $390\ \mathrm{kt}$ true**, and the reason its wings are loaded at the same dynamic pressure as at sea level is that lift depends on $\tfrac{1}{2}\rho V^2$ and not on $V$.
:::

::: widget plot
f: 0.5961 + 0.0261*pow(x,2) - 0.216*pow(x,8); 1/sqrt(1-pow(x,4))
x: 0.1, 0.75
y: 0.5, 1.6
labels: Cd (corner taps, high Re); approach-velocity factor 1/sqrt(1-beta^4)
caption: Two properties of a concentric orifice plate against the diameter ratio $\beta = d / D$. The lower curve is the discharge coefficient for corner pressure taps at high Reynolds number, $C_d = 0.5961 + 0.0261 \beta^2 - 0.216 \beta^8$ from the **Reader-Harris and Haller** correlation used in **ISO 5167-2**; it is flat near $0.605$ for $\beta < 0.4$ and falls to $0.51$ at $\beta = 0.75$ as the jet's contraction is suppressed by the pipe wall. The upper curve is the **approach-velocity factor** $1 / \sqrt{1 - \beta^4}$, which multiplies the simple orifice formula and blows up as $\beta \to 1$ — at $\beta = 0.75$ it is $1.22$, so a $1\ \%$ error in $\beta$ becomes a $4\ \%$ error in $C_d E$ and a $4\ \%$ error in the flow. **This is the whole of the reason an orifice plate is specified with $0.2 < \beta < 0.6$**, and the reason a metering run that has been re-bored to a larger orifice is recalibrated and not merely re-coefficiented.
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
\text{Classical Venturi, cast} & 0.984 & 0.25 \text{ to } 0.75 & 10\ \%\ \text{ of } \Delta p & \text{machined convergent, } 21^{\circ} \text{ diffuser} \\
\text{Classical Venturi, fabricated} & 0.985 & 0.4 \text{ to } 0.7 & 12\ \% & \\
\text{Flow nozzle (ISA 1932)} & 0.96 \text{ to } 0.99 & 0.2 \text{ to } 0.8 & 20 \text{ to } 30\ \% & \\
\text{Long-radius nozzle} & 0.99 & 0.2 \text{ to } 0.67 & 25\ \% & \\
\text{Orifice, corner taps} & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.75 & 40 \text{ to } 60\ \% & \text{cheapest, worst loss} \\
\text{Orifice, flange taps} & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.75 & 40 \text{ to } 60\ \% & \\
\text{Orifice, } D \text{ and } D / 2 & 0.60 \text{ to } 0.61 & 0.1 \text{ to } 0.5 & 40 \text{ to } 60\ \%
\end{array}
$$
**The number that decides between them.** A $300\ \mathrm{mm}$ main carrying $0.25\ \mathrm{m^3 / s}$ with a $\beta = 0.6$ meter and a $\Delta p$ of $20\ \mathrm{kPa}$: the **permanent** loss is $2\ \mathrm{kPa}$ for a Venturi and $11\ \mathrm{kPa}$ for an orifice, and at $0.10$ per kilowatt-hour and a $60\ \%$ pump efficiency the extra $9\ \mathrm{kPa}$ costs the orifice
$$
P = \frac{Q \Delta p}{\eta} = \frac{0.25 \times 9{,}000}{0.6} = 3{,}750\ \mathrm{W}, \qquad
3{,}750 \times 8{,}760 \times 0.10 = 3{,}280\ \text{per year}
$$
**against a capital difference of perhaps $6{,}000$ in the Venturi's favour.** **The orifice is cheaper to buy and dearer to run, and the payback is eight weeks** — which is why orifice plates dominate where the metering is intermittent and Venturis dominate where it is continuous.
**The worked Venturi.** A cast Venturi with $D = 150\ \mathrm{mm}$, $d = 75\ \mathrm{mm}$, $C_d = 0.984$, and a mercury manometer reading $h_m = 250\ \mathrm{mm}$:
$$
\Delta p = \left( 13.55 - 1 \right) \times 9{,}810 \times 0.250 = 30{,}800\ \mathrm{Pa}
\quad \Rightarrow \quad \sqrt{2\Delta p / \rho} = 7.85\ \mathrm{m / s}
$$
$$
A_t = 4.418 \times 10^{- 3}\ \mathrm{m^2}, \qquad \frac{1}{\sqrt{1 - 0.5^4}} = 1.033
$$
$$
Q = 0.984 \times 4.418 \times 10^{- 3} \times 1.033 \times 7.85 = 0.0353\ \mathrm{m^3 / s} = 127\ \mathrm{m^3 / h}
$$
**The number that makes the manometer's fluid a design choice.** The same $\Delta p$ on a **water–water** manometer would read $3.14\ \mathrm{m}$, and on an **oil–water** manometer with $S = 0.8$ it would read $15.7\ \mathrm{m}$. **A manometer's sensitivity is $1 / \left( S_m - S_f \right)$ and its resolution is $0.5\ \mathrm{mm}$ of scale**, so a low-density manometric fluid buys sensitivity at the cost of a taller board and a bigger reading error.
**The expansibility factor for gases.** For a compressible fluid the density falls through the meter and the incompressible formula **overstates** the mass flow. For orifice plates **ISO 5167-2** gives
$$
\varepsilon = 1 - \left( 0.351 + 0.256 \beta^{4} + 0.93 \beta^{8} \right) \left[ 1 - \left( \frac{p_2}{p_1} \right)^{1 / \kappa} \right]
$$
**The number that makes gas metering a pressure problem.** For air at $\beta = 0.6$ and a $100\ \mathrm{kPa}$ drop from $700\ \mathrm{kPa}$ absolute, $p_2 / p_1 = 0.857$ and $\varepsilon = 1 - 0.408 \times 0.0373 = 0.985$ — a $1.5\ \%$ correction. **At a $300\ \mathrm{kPa}$ drop it is $4.4\ \%$**, and the reason a gas custody-transfer meter specifies a pressure range as tightly as a flow range is that $Q \propto \sqrt{\Delta p / p_1}$: **a $1\ \%$ error in the absolute pressure is a half per cent error in the flow.**
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
\text{Borda mouthpiece (re-entrant)} & 0.50 & 1.00 & 0.50 \\
\text{Rounded (radius} = d / 4 \text{)} & 1.00 & 0.98 & 0.98 \\
\text{External (Cippoletti) nozzle} & 0.95 & 0.98 & 0.94 \\
\text{Converging cone} & 0.92 & 0.97 & 0.89
\end{array}
$$
**The Borda mouthpiece** is the one case that can be derived from momentum alone: the pressure on the re-entrant face is the static head $\gamma h$ acting over the orifice area, and
$$
\gamma h A = \rho Q V = \rho A V^2 \quad \Rightarrow \quad V = \sqrt{g h}, \qquad C_v = \frac{1}{\sqrt{2}} = 0.707
$$
**with $C_c = 0.5$ from continuity, giving $C_d = 0.50$.** **The mouthpiece recovers half the jet's kinetic energy as pressure on the re-entrant lip**, which is why it discharges half as much as a rounded orifice and why it is used only when a precisely known, Reynolds-number-independent coefficient is worth the loss.
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
**The siphon.** A tube with a high point at an elevation $z_s$ above the upper reservoir's surface, discharging to a level $H$ below it:
$$
V = \sqrt{\frac{2 g H}{1 + \sum K}}
$$
and the pressure at the summit, taking the reservoir surface as datum and $p_a$ as the local atmospheric head:
$$
\frac{p_s}{\gamma} = - z_s - \left( 1 + K_{\mathrm{entry}} \right) \frac{V^2}{2 g} - h_{L, 1 \to s}
$$
**The worked case.** $z_s = 4.0\ \mathrm{m}$, $H = 3.0\ \mathrm{m}$, $\sum K = 1.5$, water at $20\ {}^{\circ}\mathrm{C}$ with $p_a / \gamma = 10.33\ \mathrm{m}$ and $p_v / \gamma = 0.24\ \mathrm{m}$:
$$
V = \sqrt{\frac{2 \times 9.81 \times 3.0}{2.5}} = 4.85\ \mathrm{m / s}, \qquad \frac{V^2}{2 g} = 1.20\ \mathrm{m}
$$
$$
\frac{p_s}{\gamma} = - 4.0 - 2.0 \times 1.20 - 0.4 = - 6.8\ \mathrm{m}
\quad \Rightarrow \quad \frac{p_s - p_v}{\gamma} = 10.33 - 0.24 - 6.8 = 3.29\ \mathrm{m}
$$
**The siphon works, with $3.3\ \mathrm{m}$ of margin.** **Raise the summit to $7.5\ \mathrm{m}$ and the margin is zero** — the siphon cavitates and stops, and the reason the practical limit is $7.5\ \mathrm{m}$ and not the $10.3\ \mathrm{m}$ of a barometer is the velocity head, the entry loss and the dissolved air that comes out of solution well before the vapour pressure is reached. **A siphon that has run for a week and suddenly stops has usually not cavitated but de-gassed**, and the reason a siphon's crown is fitted with an air vent is that the nitrogen coming out of solution at $4\ \mathrm{m}$ of vacuum accumulates until it blocks the bend.
:::

::: definition Cavitation and NPSH {#def-npsh}
**The cavitation number.** For a body or a blade section,
$$
\sigma = \frac{p_{\mathrm{ref}} - p_v}{\tfrac{1}{2} \rho V_{\mathrm{ref}}^2}
$$
and cavitation begins when the **local** $C_{p,\min}$ satisfies $\sigma \leq - 1 / C_{p,\min}$. For a hydrofoil with $C_{p,\min} = - 4.0$, incipience is at $\sigma = 0.25$.
**The net positive suction head available** at a pump's inlet, from the generalised energy equation between the suction reservoir and the impeller eye:
$$
\boxed{ \mathrm{NPSH}_A = \frac{p_a - p_v}{\gamma} \pm z_s - h_{L, s} }
$$
with $z_s$ **positive for a flooded suction** and negative for a lift, and $h_{L,s}$ the suction-line loss **including the velocity head at the flange**.
**The worked case.** Water at $60\ {}^{\circ}\mathrm{C}$ ($\gamma = 9.65\ \mathrm{kN / m^3}$, $p_v = 19.9\ \mathrm{kPa}$) drawn from an open sump through a $3\ \mathrm{m}$ lift with $0.6\ \mathrm{m}$ of friction:
$$
\mathrm{NPSH}_A = \frac{101.3 - 19.9}{9.65} - 3.0 - 0.6 = 8.44 - 3.6 = 4.84\ \mathrm{m}
$$
**against a pump whose $\mathrm{NPSH}_R$ is $2.5\ \mathrm{m}$ at the design flow** — a margin of $2.34\ \mathrm{m}$, and the reason the installation is acceptable is the customary rule that $\mathrm{NPSH}_A$ exceed $\mathrm{NPSH}_R$ by **$0.5$ to $1.0\ \mathrm{m}$ or $1.35$ times, whichever is greater**.
**The number that makes a hot-water pump fail in August.** At $90\ {}^{\circ}\mathrm{C}$, $p_v = 70.1\ \mathrm{kPa}$ and $\left( p_a - p_v \right) / \gamma = 3.24\ \mathrm{m}$ — **less than the $3.6\ \mathrm{m}$ of lift and friction already committed**. The same pump that worked at $20\ {}^{\circ}\mathrm{C}$, where $\left( p_a - p_v \right) / \gamma = 10.3\ \mathrm{m}$, cannot lift at all at $90\ {}^{\circ}\mathrm{C}$. **Every hot-water, condensate and cooling-water pump is flooded, and the reason is this one number and not the vapour's drama.**
**The specific speed and suction specific speed.**
$$
N_s = \frac{N \sqrt{Q}}{H^{3 / 4}}, \qquad
N_{ss} = \frac{N \sqrt{Q}}{\mathrm{NPSH}_R^{3 / 4}}
$$
with $N$ in rpm, $Q$ in $\mathrm{m^3 / s}$ per eye and $H$ in metres per stage. **$N_{ss}$ above $11{,}000$ (in those units) means the pump will cavitate over a wide range and the impeller eye must be enlarged**, and the reason an axial-flow pump's eye is enormous is that its $N_s$ is high and its $\mathrm{NPSH}_R$ is otherwise hopeless.
:::

## Worked cases

::: example A siphon over a cofferdam {#ex-siphon}
A $200\ \mathrm{mm}$ siphon discharges a cofferdam's bilge over a $3.5\ \mathrm{m}$ crest into a river whose surface is $5.0\ \mathrm{m}$ below the cofferdam's. The total length is $28\ \mathrm{m}$, $\lambda = 0.022$, with a re-entrant entry $K = 0.8$, two $90^{\circ}$ bends $K = 0.35$ each and an exit $K = 1.0$. Find the discharge, the summit pressure and whether the siphon primes and stays primed at $25\ {}^{\circ}\mathrm{C}$.
::: solution
**The energy equation** from the cofferdam surface (1) to the outlet (2), both at atmospheric pressure, with the outlet as datum:
$$
z_1 = z_2 + \left( 1 + \lambda \frac{L}{D} + \sum K \right) \frac{V^2}{2 g}
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
\quad \Rightarrow \quad p_s = 101.3 - 6.41 \times 9.79 = 38.3\ \mathrm{kPa\ absolute}
$$
**The check against vapour and against air.** At $25\ {}^{\circ}\mathrm{C}$, $p_v = 3.17\ \mathrm{kPa}$, so the margin is $35.1\ \mathrm{kPa} = 3.59\ \mathrm{m}$ — **no cavitation**. But water at equilibrium with the atmosphere holds about $2.4\ \mathrm{cm^3}$ of dissolved air per litre, and by **Henry's law** the amount that comes out of solution at $38\ \mathrm{kPa}$ is
$$
\frac{101.3 - 38.3}{101.3} \times 2.4 = 1.49\ \mathrm{cm^3 / L}
$$
**At $474\ \mathrm{m^3 / h}$ that is $0.71\ \mathrm{m^3}$ of air an hour** collecting at the summit. **The siphon will run for about twenty minutes and then break**, and the reason a siphon's crown on a construction site needs an air-release valve the size of a fist is not cavitation but Henry's law.
**The priming.** The siphon must be evacuated to below $38\ \mathrm{kPa}$ absolute to run full; a hand priming pump that can pull $85\ \mathrm{kPa}$ of vacuum will do it, and the reason a siphon that has been broken and re-started many times runs poorly is that the crown's air pocket has grown to a volume at which it acts as a **surge chamber**, throttling the flow by
$$
Q \propto \frac{1}{\sqrt{1 + V_{\mathrm{air}} / \left( A L_{\mathrm{eff}} \right)}}
$$
**The number that makes the siphon's diameter the wrong choice.** $4.19\ \mathrm{m / s}$ is a fast pipe; the friction term is $55\ \%$ of the total head. **A $250\ \mathrm{mm}$ siphon would run at $4.45\ \mathrm{m / s}$, with the friction term at $50\ \%$ and the discharge at $0.218\ \mathrm{m^3 / s}$ — a $66\ \%$ increase for a $25\ \%$ increase in pipe.** **A siphon is friction-limited, and its diameter is bought in the same currency as a pump's.**
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
V_t = \frac{Q}{C_d A_t} \sqrt{1 - \beta^4} = \frac{0.35}{0.985 \times 0.04524} \times 0.9274 = 7.29\ \mathrm{m / s}
$$
**The differential.** $\Delta p = \tfrac{1}{2} \rho V_t^2 \left( 1 - \beta^4 \right)$:
$$
\Delta p = 0.5 \times 998 \times 53.1 \times 0.8704 = 23{,}060\ \mathrm{Pa} = 2.36\ \mathrm{m\ of\ water}
$$
**A reasonable differential** — a $0$ to $5\ \mathrm{m}$ water-column manometer or a $0$ to $40\ \mathrm{kPa}$ differential transmitter both read it well, and the reason a meter is sized for a $\Delta p$ of $2$ to $3\ \mathrm{m}$ at maximum flow is that the **turndown** is $\sqrt{\Delta p}$, so a $2.36\ \mathrm{m}$ meter reads $1.18\ \mathrm{m}$ at half flow and $0.59\ \mathrm{m}$ at a quarter, still far above the transmitter's $0.1\ \%$ dead-band.
**The permanent loss.** For a fabricated Venturi the loss is $12\ \%$ of the differential:
$$
\Delta p_{\mathrm{perm}} = 0.12 \times 23.06 = 2.77\ \mathrm{kPa} = 0.28\ \mathrm{m}
$$
**The pumping cost.**
$$
P = \frac{Q \Delta p_{\mathrm{perm}}}{\eta} = \frac{0.35 \times 2{,}770}{0.7} = 1{,}385\ \mathrm{W}
$$
**$12{,}100\ \mathrm{kWh}$ a year, about $1{,}500$ of electricity.** The same metering on an orifice plate would lose $50\ \%$ of the differential instead of $12\ \%$, that is $11.5\ \mathrm{kPa}$ rather than $2.8\ \mathrm{kPa}$, and would cost $5{,}050\ \mathrm{W}$ and $44{,}000\ \mathrm{kWh}$ a year, about $5{,}500$. **The $4{,}000$ a year is the reason a continuously metered main carries a Venturi.**
**The throat pressure and cavitation.** With the main at $250\ \mathrm{kPa}$ gauge and the Venturi horizontal,
$$
p_t = p_1 - \tfrac{1}{2} \rho V_t^2 \left( 1 - \beta^4 \right) \times \frac{1}{C_v^2} \approx 250 - 23.1 = 226.9\ \mathrm{kPa\ gauge} = 328\ \mathrm{kPa\ absolute}
$$
**against a vapour pressure of $2.34\ \mathrm{kPa}$ absolute at $20\ {}^{\circ}\mathrm{C}$** — a margin of $326\ \mathrm{kPa}$, and cavitation is impossible. **The cavitation number is**
$$
\sigma = \frac{p_t - p_v}{\tfrac{1}{2} \rho V_t^2} = \frac{325{,}700}{26{,}500} = 12.3
$$
**The number that makes a Venturi cavitate.** The same Venturi with the main at **$- 45\ \mathrm{kPa}$ gauge** (a suction main below a tailrace) gives $p_t = - 68\ \mathrm{kPa}$ gauge $= 33\ \mathrm{kPa}$ absolute and $\sigma = 1.16$. **Cavitation begins around $\sigma = 1.0$ for a Venturi's diverging cone**, so the meter is marginal, and the reason a suction-side Venturi is made with a **shorter** diffuser angle and a **larger** $\beta$ is to keep the throat velocity — and therefore the throat depression — down.
*Sanity.* The reason the throat pressure is only $23\ \mathrm{kPa}$ below the main pressure and not $\tfrac{1}{2}\rho V_t^2 = 26.5\ \mathrm{kPa}$ is the approach-velocity factor: the main's own velocity head is $0.5 \times 998 \times 2.79^2 = 3{,}890\ \mathrm{Pa}$, and $26.5 - 3.9 = 22.6\ \mathrm{kPa}$, within $2\ \%$ of the answer. **At high $\beta$ the approach velocity head is a large fraction of the differential and the $\sqrt{1 - \beta^4}$ correction is not optional.**
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
**The number that makes the answer a financial one.** At $V = 2.08\ \mathrm{m / s}$ the design is on the continuous-run optimum. **Doubling the diameter to $700\ \mathrm{mm}$ cuts $h_L$ by $32$ (from $D^{-5}$) to $0.06\ \mathrm{m}$ and gains $1.98\ \mathrm{m}$ of head, or $3.4\ \mathrm{kW}$ — $30{,}000\ \mathrm{kWh}$ a year, about $3{,}600$.** The extra steel is $180\ \mathrm{m}$ of $700\ \mathrm{mm}$ versus $350\ \mathrm{mm}$ plate, roughly $34\ \mathrm{t}$ more at $2{,}500 / \mathrm{t}$ installed, or $85{,}000$ — **a twenty-four year payback, and the reason the $350\ \mathrm{mm}$ penstock is right.**
**The surge check.** Closing the nozzle in $6\ \mathrm{s}$ against a $2.08\ \mathrm{m / s}$ flow in $180\ \mathrm{m}$ of pipe gives a rigid-column water hammer of
$$
\Delta h = \frac{L V}{g t} = \frac{180 \times 2.079}{9.81 \times 6} = 6.36\ \mathrm{m}
$$
**against a $42\ \mathrm{m}$ head — $15\ \%$**, and the reason the penstock is designed for $1.5$ times the static head plus the surge is that the elastic **Joukowsky** pressure rise, $\Delta p = \rho c \Delta V$ with $c \approx 1{,}100\ \mathrm{m / s}$ for a steel-anchored pipe, would be $2.3\ \mathrm{MPa}$ for an instantaneous closure. **The closing time must exceed $2 L / c = 0.33\ \mathrm{s}$ for the rigid-column formula to apply, and $6\ \mathrm{s}$ is comfortably longer.**
*Sanity.* The reason the head loss goes as $D^{-5}$ and not $D^{-4}$ is that the area goes as $D^2$ and the velocity head as $V^4$, so $h_L \propto V^2 / D \propto Q^2 / D^5$. **A ten per cent increase in diameter buys a thirty-six per cent reduction in friction**, and the reason penstocks are as large as they look is this exponent and not conservatism.
:::
:::

::: example A free vortex and a bathtub {#ex-vortex}
Water is drained from a circular tank through a central outlet, forming a free vortex of surface depression $z(r)$. Show that the surface is a paraboloid of revolution, and find the depression at the wall of a $1.2\ \mathrm{m}$ diameter tank discharging $0.05\ \mathrm{m^3 / s}$ through a $150\ \mathrm{mm}$ outlet, with a vortex strength set by the tank's rotation rate of $0.8\ \mathrm{rad / s}$ at $r = 0.3\ \mathrm{m}$.
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
**a paraboloid of revolution in $1 / r$** — and the reason a whirlpool's surface is a funnel and not a cone is the $r^{-2}$.
**The strength.** $C = r V_{\theta} = r^2 \Omega$ at a radius where the rotation is known: $C = 0.3^2 \times 0.8 = 0.072\ \mathrm{m^2 / s}$.
**The depression at the wall.** $r_w = 0.6\ \mathrm{m}$:
$$
\Delta z = \frac{C^2}{2 g r_w^2} = \frac{5.18 \times 10^{- 3}}{19.62 \times 0.36} = 0.73\ \mathrm{mm}
$$
**A fraction of a millimetre — invisible.** At $r = 0.15\ \mathrm{m}$ (the outlet's radius) the depression is $0.73 \times \left( 0.6 / 0.15 \right)^2 = 11.8\ \mathrm{mm}$, and at $r = 0.05\ \mathrm{m}$ it is $105\ \mathrm{mm}$ — **the funnel appears only in the last tenth of the tank's radius**, and the reason a vortex is a sudden, local phenomenon rather than a general tilt of the surface is the $r^{-2}$.
**The number that makes a vortex a design problem.** The depression at the outlet must be compared with the submergence $S$ of the intake: **a vortex forms and draws air when $\Delta z$ at the outlet exceeds $S$**, and the classic **ANS / HI** criterion for a no-air-intake submergence is
$$
S \geq D + 2.3\, \mathrm{Fr} \sqrt{g D}, \qquad \mathrm{Fr} = \frac{Q}{\sqrt{g D^5}}
$$
With $D = 0.15\ \mathrm{m}$, $Q = 0.05\ \mathrm{m^3 / s}$: $\mathrm{Fr} = 0.05 / \sqrt{9.81 \times 7.59 \times 10^{- 5}} = 0.05 / 0.0273 = 1.83$, so
$$
S \geq 0.15 + 2.3 \times 1.83 \times \sqrt{1.47} = 0.15 + 5.11 = 5.26\ \mathrm{m}
$$
**Five metres of submergence for a $150\ \mathrm{mm}$ outlet** — and the reason a pump sump is $6\ \mathrm{m}$ deep for a pump that needs none of it for NPSH is this formula. **Air entrainment costs $3\ \%$ of a pump's head per per cent of air by volume**, and a vortex that admits $10\ \%$ air destroys the pump's curve.
*Sanity.* The reason the free-vortex surface is a **depression** and a **forced** vortex's ($V_\theta = \Omega r$) is a **rise** is that the forced vortex's paraboloid, $z = \Omega^2 r^2 / 2g$, increases outward from the axis, while the free vortex's $- C^2 / \left( 2 g r^2 \right)$ decreases toward it. **A stirred tank has a forced vortex in its core and a free vortex outside**, and the transition radius is where the two match — which is why a stirrer's surface looks like a flat-bottomed funnel with a steep wall.
:::
:::

::: history
**The theorem is not Bernoulli's** in the sense of priority: **Torricelli** had $V = \sqrt{2gh}$ in **1644** as a corollary of Galileo's fall, and **Reyneau** stated the pressure–velocity trade-off in **1615** in *L'force de l'eau courante*, a book **Bernoulli** almost certainly knew. **Daniel Bernoulli**'s *Hydrodynamica* of **1738** is the first systematic derivation — from a **vis-viva** conservation argument over a column of many pistons, and with the kinetic-theory of gases in the same book — and it was his father **Johann** who, in **1743**, published the differential form in *Hydraulica* with a preface accusing Daniel of stealing it. **The father and son were on bad terms for the rest of their lives over the priority of a single algebraic identity.** **Euler**'s equation along a streamline is of **1755**, and the modern statement that the constant holds along a streamline and everywhere only if the flow is irrotational is **Stokes**'s of **1845**. **The Pitot tube** is **Pitot**'s of **1732**, built for the French navy's river barges and abandoned for a century; **the Pitot-static tube** is **Ludwig Prandtl**'s Göttingen design of about **1905**, developed for airships and and it became standard on aircraft after the National Physical Laboratory's airspeed-indicator calibration work of the **1920s** had traced the remaining errors to the probe's position on the fuselage rather than to its design. **The Venturi meter** is **Giovanni Battista Venturi**'s posthumous **1797** manuscript on the *acqua a spirale*, applied to metering by **Clemens Herschel** at the **Holyoke Water Power Company in 1887**, who calibrated the first one against a weir and gave the device the name by which it is known. **The orifice plate** is older than any of them — **Poleni** used one in **1690** at the rivers of the Veneto — and its discharge coefficient was settled only in **1931** by the **United States Bureau of Standards** programme of calibrations that produced the $0.60$ to $0.61$ now written into **ISO 5167**.
:::

::: quiz
A Venturi meter and a sharp-edged orifice plate of the same throat diameter pass the same flow in the same pipe. Which has the larger *permanent* pressure loss, and why?

- [ ] The Venturi, because its converging cone accelerates the flow harder
- [x] The orifice, because the flow separates at the sharp edge, contracts to a vena contracta of about $0.62$ of the orifice area, and then decelerates in a turbulent free expansion that recovers almost none of the kinetic energy the throat created
- [ ] Neither, because Bernoulli's equation is lossless and both recover the same fraction
- [ ] The orifice, because its discharge coefficient is less than one

::: solution
**The orifice, by roughly a factor of five.** A well-made Venturi returns $85$–$95\ \%$ of the differential it creates; a sharp orifice recovers only $25$–$35\ \%$, so of a $50\ \mathrm{kPa}$ differential some $35\ \mathrm{kPa}$ is gone for ever as heat and noise. **The fourth option is the trap: a discharge coefficient below unity is a correction to the *ideal flow rate* — it accounts for the streamline curvature and the vena contracta — and it is not a statement about losses, though the two have the same origin.** The practical consequence is a genuine economic one: an orifice is a tenth the price of a Venturi, and the pumping power it wastes over twenty years is worth many Venturis, which is why orifice plates are used where the metering is occasional and Venturis where it is continuous. **The vena contracta is also the reason an orifice's pressure tap locations matter: at $D$ and $0.5 D$ you measure one coefficient, at the flanges another, and at the throat itself a third, and quoting a table against the wrong tap arrangement is a $10\ \%$ error nobody can see.**
:::
:::

## Where this leads

Bernoulli with a loss term and a shaft-work term is the generalised energy equation that organises [[fluid-mechanics/pipe-flow]]; Bernoulli along a streamline plus the tangential momentum equation is [[fluid-mechanics/boundary-layers-drag]]'s pressure-gradient input and the reason a boundary layer separates; Bernoulli's incompressibility is what [[fluid-mechanics/compressible-flow]] removes; and Bernoulli's assumption of zero viscosity is exactly what [[fluid-mechanics/navier-stokes]] puts back.

::: summary
- Bernoulli is energy bookkeeping for an inviscid, steady, incompressible, shaft-work-free flow, and its constant holds along a streamline — everywhere only if the flow is irrotational.
- The HGL is $p/\gamma + z$; the EGL adds the velocity head. Cavitation is an HGL question.
- A Pitot tube measures a pressure and infers a velocity; the error grows at low speed and above $M \approx 0.3$.
- Meters are continuity plus Bernoulli with a $C_d$: Venturi $0.985$, nozzle $0.96$ to $0.99$, orifice $0.61$ — and the orifice's low $C_d$ is an unrecovered pressure, not a loss of sharpness.
- Torricelli's $t \propto \sqrt{h}$ means the last tenth of a drain takes a third of the time.
- A siphon's limit is set by Henry's law as much as by the vapour pressure.
- NPSH is a pressure-head arithmetic, and hot water is what makes it fail.
- The $D^{-5}$ in a penstock's head loss is why pipe diameter is bought with operating cost and not with capital.
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
**$7.1\ \mathrm{m^3 / h}$**, and the jet's range from a horizontal orifice at height $y$ above the floor is $2\sqrt{y \left( h + y \right)}$ — the reason a tank's overflow is placed where it is.
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
**The reading.** An inverted manometer is used on liquids when the differential is **small**, because its sensitivity goes as $1 / \left( 1 - S_o \right)$ — an oil of $S = 0.95$ would multiply the reading by twenty and turn a $30\ \mathrm{mm}$ deflection into a $600\ \mathrm{mm}$ one. **The cheaper the manometric fluid, the better the resolution and the worse the stability**, and the reason a low-$S$ fluid is never used below $S = 0.75$ is that it mixes with water and the interface blurs within an hour.
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
**which is the Borda result and not the orifice's $0.61$.** **The difference is the pressure on the annular face**, which is **not** $p_1$: the streamlines curve around the orifice's edge and the pressure on the plate's downstream face near the opening falls well below $p_1$, so the plate experiences a **suction** toward the opening that widens the jet. The rigorous value comes from the **Kirchhoff free-streamline solution of 1868**, in which the jet is bounded by a surface of constant pressure and constant speed:
$$
\boxed{ C_c = \frac{\pi}{\pi + 2} = 0.611 \quad \text{(two-dimensional slot, Kirchhoff 1868)} }
$$
and the axisymmetric value is $0.611$ to $0.627$ depending on $\beta$.
$$
C_c = \frac{\pi}{\pi + 2} = 0.611
$$
**and with $C_v = 0.98$, $C_d = 0.60$.**
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
At $35\ {}^{\circ}\mathrm{C}$, $p_v = 5.63\ \mathrm{kPa}$, $\gamma = 9.74\ \mathrm{kN / m^3}$, and at the site altitude $p_a = 99.2\ \mathrm{kPa}$:
$$
\frac{p_a - p_v}{\gamma} = \frac{99.2 - 5.63}{9.74} = 9.61\ \mathrm{m}
$$
**The suction pipe.** Two parallel $500\ \mathrm{mm}$ lines (one duty, one standby would be $600\ \mathrm{mm}$ each for a duty/standby pair; here a single $600\ \mathrm{mm}$ line at $3.18\ \mathrm{m / s}$ is too fast, so)
$$
D = 700\ \mathrm{mm}, \qquad V = 2.33\ \mathrm{m / s}, \qquad \frac{V^2}{2 g} = 0.277\ \mathrm{m}
$$
$$
h_{L, s} = \left( \lambda \frac{L}{D} + K_{\mathrm{entry}} + K_{\mathrm{bend}} + K_{\mathrm{valve}} + 1.0 \right) \frac{V^2}{2 g}
= \left( 0.016 \times \frac{12}{0.7} + 0.5 + 0.3 + 0.2 + 1.0 \right) \times 0.277
$$
$$
= 2.274 \times 0.277 = 0.63\ \mathrm{m}
$$
**The worst-case NPSH available**, with the sump at its low level $\left( z_s = 3.2\ \mathrm{m} \right)$:
$$
\mathrm{NPSH}_A = 9.61 - 3.2 - 0.63 = 5.78\ \mathrm{m}
$$
**The pump's requirement.** A double-suction split-case at $N_s = 150$ has $\mathrm{NPSH}_R = 3.2\ \mathrm{m}$ at $0.9\ \mathrm{m^3 / s}$, and the **run-out** requirement at $1.3 \times Q$ is $5.1\ \mathrm{m}$.
$$
\text{Margin at run-out} = 5.78 - 5.1 = 0.68\ \mathrm{m}
$$
**The number that decides the design.** The margin is $0.68\ \mathrm{m}$ against the customary $1.35 \times$ rule, which would require $5.1 \times 1.35 = 6.9\ \mathrm{m}$ — **the design fails**. The remedies, in order of cost: **lower the pump centreline by $1.2\ \mathrm{m}$** (gains $1.2\ \mathrm{m}$, requires a wet well and a flooded suction), **enlarge the suction to $800\ \mathrm{mm}$** (gains $0.28\ \mathrm{m}$), or **cap the impeller's run-out** with a casing wear limit (gains $1.4\ \mathrm{m}$ of requirement but costs turndown). **The first is chosen, and the pump is placed below the low sump level.**
**The vortex and air-entrainment check.** With $D = 0.7\ \mathrm{m}$ and $Q = 0.9\ \mathrm{m^3 / s}$:
$$
\mathrm{Fr} = \frac{0.9}{\sqrt{9.81 \times 0.7^5}} = \frac{0.9}{1.284} = 0.70
\qquad
S \geq D + 2.3\, \mathrm{Fr} \sqrt{g D} = 0.7 + 2.3 \times 0.70 \times 2.62 = 4.93\ \mathrm{m}
$$
**The sump floor must be $5.0\ \mathrm{m}$ below the lowest operating level** and the bell-mouth's clearance above the floor $0.75 D = 0.53\ \mathrm{m}$. **The reason a cooling-water sump is deep and not wide is this formula**, and the reason its approach channel is straight for $5 D$ is the mirror-image requirement that the velocity approach be uniform to $\pm 15\ \%$ at the bell mouth.
**The acceptance tests.**
$$
\begin{array}{l l}
\text{NPSH}_R & \text{tested to HI 14.6 at } 100 \text{ and } 130\ \% \text{ of duty, } 3\ \% \text{ head-drop criterion} \\
\text{Sump model} & \text{Froude-scaled, no surface vortex to the intake for a } 10\text{-minute run} \\
\text{Air entrainment} & \leq 0.5\ \% \text{ by volume at the pump flange} \\
\text{Velocity approach} & \pm 15\ \% \text{ over the bell mouth's projected area} \\
\text{Pressure fluctuation} & \leq 5\ \% \text{ of the velocity head at the suction flange}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE PUMP SHALL BE TESTED FOR NPSH AT THE RUN-OUT FLOW AND NOT AT THE RATED FLOW."** **"THE SUMP SHALL BE MODEL-TESTED AT FULL FROUDE SIMILITUDE WITH THE ACTUAL TAILWATER AND THE ACTUAL APPROACH CHANNEL."** **"THE NPSH MARGIN SHALL BE STATED AS AN ABSOLUTE VALUE AND AS A RATIO, AND THE GREATER OF THE TWO SHALL GOVERN."** **"THE SUCTION LINE SHALL HAVE NO HIGH POINT AND NO REDUCER OTHER THAN AN ECCENTRIC ONE WITH THE FLAT SIDE UP."**
*Design comment.* The general rule is that **a pump does not cavitate because of the pump but because of the pipe, the sump and the water temperature**, and that a suction arrangement is verified by a model test and a NPSH test and never by a calculation — which is why the calculation is done first, so that the model test is a confirmation and not a diagnosis.
:::
:::
