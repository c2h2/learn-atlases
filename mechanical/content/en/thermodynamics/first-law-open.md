A control volume is a piece of space with things flowing through it, and the first law applied to it acquires one new term and one new subtlety. The term is the energy carried across the boundary by the flowing matter; the subtlety is that the flowing matter must **push itself in**, and the work of pushing appears inside a property nobody defined until the accounting required it.

That property is **enthalpy**, $h = u + P v$, and the fact that it is a property and not a form of energy is the most quietly misunderstood sentence in the subject. $P v$ is the **flow work**, the work a unit mass does on the mass behind it, and it is only present while the mass is flowing — which is why a closed system never uses $h$ for its heat transfer and a pipe always does.

::: warning Seven control-volume errors that look like arithmetic
**Using $u$ where $h$ belongs.** Every stream crossing a control-volume boundary carries $u$ **plus** the flow work $P v$, and the sum is $h$. A steady-flow energy balance written with $u$ is wrong by $P v$, which for steam at $3\ \mathrm{MPa}$ and $300\ {}^{\circ}\mathrm{C}$ is $P v = 3000 \times 0.08114 = 243\ \mathrm{kJ / kg}$ — **$8\ \%$** of the enthalpy and larger than most heat transfers in the problem. **Dropping the kinetic term in a nozzle.** $5\ \mathrm{kJ / kg}$ is $1\ \%$ of a turbine stage's enthalpy drop and **$100\ \%$** of a nozzle's purpose, and the rule is: **keep $V^{2} / 2$ wherever the velocity changes by more than about $70\ \mathrm{m / s}$**, which is every nozzle, diffuser, ejector, venturi and orifice meter. **Assuming $h$ is constant across a device that is not a throttle.** $h_1 = h_2$ holds for a **valve, an orifice, a porous plug or a capillary** — a device with no work, no significant heat and no purposeful velocity change. It is **false** across a turbine, a compressor, a pump, a nozzle and, surprisingly to beginners, across a well-insulated but long pipe where friction does real work on the fluid. **Forgetting that a pump's temperature rise is real.** $6\ \mathrm{kJ / kg}$ of work into water with $c = 4.18$ is $1.4\ \mathrm{K}$, and in a $500\ \mathrm{MW}$ boiler feed pump it is $1.4\ \mathrm{K}$ of **irreversible** heating that the cycle calculation must charge to the pump and not to the economiser. **Using steady-flow equations for a filling problem.** A filling tank is **unsteady**: the mass inside changes, and the correct equation is $m_2 u_2 - m_1 u_1 = m_i h_i - m_e h_e + Q - W$, in which the incoming stream brings **enthalpy** and the gas in the tank stores **internal energy**. The consequence is that an evacuated tank filled from a main ends at $\gamma T_i$, not $T_i$. **Setting the exit enthalpy from the inlet pressure.** In an isentropic turbine or compressor the exit state is found from $s_2 = s_1$ at the exit **pressure**, and the efficiency is applied to the **enthalpy difference** and not to the pressure. A calculation that reduces the pressure ratio by the efficiency has made a category error. **Balancing energy and forgetting mass.** Every steady-flow problem is **two** equations, and the mass balance $\sum \dot{m}_{\mathrm{in}} = \sum \dot{m}_{\mathrm{out}}$ with $\dot{m} = A V / v$ is the one that fixes the velocity, the pipe size and the number of unknowns. A solution with one equation and two unknowns has not found an approximation, it has forgotten a balance.
:::

## The steady-flow energy equation

::: definition Mass flow and the continuity equation {#def-mass}
$$
\dot{m} = \rho A V = \frac{A V}{v}, \qquad
\sum \dot{m}_{\mathrm{in}} = \sum \dot{m}_{\mathrm{out}}\ \text{(steady state)}
$$
**The one-line form that makes pipe sizing instant.** For a single stream,
$$
A = \frac{\dot{m} v}{V} \qquad \Longleftrightarrow \qquad D = \sqrt{\frac{4 \dot{m} v}{\pi V}}
$$
**The velocities that the trade uses, and what they cost.**
$$
\begin{array}{l c l}
\text{Saturated steam, } 10\ \mathrm{bar} & 30\text{--}50\ \mathrm{m / s} & v = 0.194\ \mathrm{m^{3} / kg},\ \text{a huge pipe} \\
\text{Superheated steam, } 100\ \mathrm{bar}\ 500\ {}^{\circ}\mathrm{C} & 40\text{--}60\ \mathrm{m / s} & v = 0.033,\ \text{a third of the pipe} \\
\text{Compressed air, } 8\ \mathrm{bar} & 6\text{--}15\ \mathrm{m / s} & \text{velocity sets the } 3\ \%\ \text{pressure-drop rule} \\
\text{Cooling water} & 1.5\text{--}3\ \mathrm{m / s} & \text{above } 3\ \mathrm{m / s}\ \text{the tube erosion begins} \\
\text{Condensate, saturated} & 0.6\text{--}1.2\ \mathrm{m / s} & \text{cavitation and water hammer} \\
\text{Gas-turbine exhaust} & 150\text{--}200\ \mathrm{m / s} & \text{the duct is sized by pressure loss, not cost}
\end{array}
$$
**The number that sizes a steam main.** $60\ \mathrm{kg / s}$ of steam at $10\ \mathrm{bar}$ and $300\ {}^{\circ}\mathrm{C}$ $\left( v = 0.2579 \right)$ at $40\ \mathrm{m / s}$:
$$
A = \frac{60 \times 0.2579}{40} = 0.3869\ \mathrm{m^{2}}, \qquad D = 702\ \mathrm{mm}
$$
and at $25\ \mathrm{m / s}$ the same duty needs $D = 886\ \mathrm{mm}$ — a **$26\ \%$** larger diameter, which is roughly **$40\ \%$** more steel in the pipe and its insulation. The velocity is therefore a **capital-cost decision made by a thermodynamicist**.
:::

::: definition Flow work and the steady-flow energy equation {#def-sfee}
**The flow work.** Pushing a slug of volume $\mathcal{V}$ across a boundary at pressure $P$ costs
$$
w_{\mathrm{flow}} = P \mathcal{V} = P v \quad \left[ \mathrm{kJ / kg} \right]
$$
**The energy of a flowing stream.**
$$
\theta \equiv h + \frac{V^{2}}{2} + g z = u + P v + \frac{V^{2}}{2} + g z
$$
**The steady-flow energy equation.**
$$
\boxed{ \dot{Q} - \dot{W} = \sum_{\mathrm{out}} \dot{m} \left( h + \frac{V^{2}}{2} + g z \right) - \sum_{\mathrm{in}} \dot{m} \left( h + \frac{V^{2}}{2} + g z \right) }
$$
**The four simplifications, in the order they are usually justified.**
$$
\begin{array}{l l l}
\text{Adiabatic} & \dot{Q} = 0 & \text{turbines, compressors, nozzles, pumps, well-lagged exchangers} \\
\text{No shaft work} & \dot{W} = 0 & \text{throttles, pipes, heat exchangers, mixing chambers} \\
\text{Negligible kinetic} & \Delta \left( V^{2} / 2 \right) \approx 0 & \text{exchangers, vessels, short pipes of constant area} \\
\text{Negligible potential} & g \Delta z \approx 0 & g \Delta z = 0.098\ \mathrm{kJ / kg}\ \text{per } 10\ \mathrm{m},\ \text{always negligible for gases}
\end{array}
$$
**The number that justifies dropping $g \Delta z$.** $g \Delta z = 9.81 \times 10 = 98\ \mathrm{J / kg} = 0.098\ \mathrm{kJ / kg}$ per $10\ \mathrm{m}$ of rise, against a steam enthalpy drop of $1{,}200\ \mathrm{kJ / kg}$ — **$0.008\ \%$**. The exception is a **hydropower penstock**, a **chimney** and a **distillation column**, where the elevation **is** the machine.
**The exception that catches everyone.** A **$100\ \mathrm{m}$** tall natural-draught cooling tower or flue relies on the **density difference** and not on the potential energy of the gas, and the draught is $\Delta \rho g H$, which for $1.2$ against $0.95\ \mathrm{kg / m^{3}}$ over $100\ \mathrm{m}$ is $245\ \mathrm{Pa}$ — enough to drive a boiler's flue gas and nothing else.
:::

::: definition The six devices {#def-devices}
$$
\begin{array}{l l l l}
\text{Device} & \text{Assumptions} & \text{Balance} & \text{Purpose} \\
\text{Nozzle} & \dot{Q} = \dot{W} = 0,\ \Delta z = 0 & V_2 = \sqrt{V_1^{2} + 2 \left( h_1 - h_2 \right)} & \text{enthalpy to kinetic energy} \\
\text{Diffuser} & \text{as above, reversed} & V_2 < V_1,\ P_2 > P_1 & \text{kinetic to pressure} \\
\text{Throttle} & \dot{Q} = \dot{W} = \Delta ke = 0 & h_1 = h_2 & \text{pressure reduction, no work} \\
\text{Turbine} & \dot{Q} \approx 0 & \dot{W} = \dot{m} \left( h_1 - h_2 \right) & \text{extract work} \\
\text{Compressor} & \dot{Q} \approx 0 & \dot{W} = \dot{m} \left( h_2 - h_1 \right) & \text{supply work} \\
\text{Pump} & \text{incompressible} & w = v \Delta P & \text{raise a liquid's pressure} \\
\text{Heat exchanger} & \dot{W} = \Delta ke = \Delta z = 0 & \dot{m}_c \Delta h_c = - \dot{m}_h \Delta h_h & \text{transfer heat} \\
\text{Mixing chamber} & \dot{Q} = \dot{W} = 0 & \sum \dot{m}_{\mathrm{in}} h_{\mathrm{in}} = \dot{m}_{\mathrm{out}} h_{\mathrm{out}} & \text{combine streams}
\end{array}
$$
**The nozzle velocity, with the inlet term kept.**
$$
V_2 = \sqrt{V_1^{2} + 2 \left( h_1 - h_2 \right)} \qquad \left[ \mathrm{m / s} \right]\ \text{with } h \text{ in } \mathrm{J / kg}
$$
**The number that shows why the inlet term is kept.** A steam turbine's first-stage nozzle with $h_1 - h_2 = 200\ \mathrm{kJ / kg}$ and $V_1 = 150\ \mathrm{m / s}$:
$$
V_2 = \sqrt{150^{2} + 2 \times 200{,}000} = \sqrt{22{,}500 + 400{,}000} = 650\ \mathrm{m / s}
$$
against $\sqrt{400{,}000} = 632\ \mathrm{m / s}$ — a **$2.8\ \%$** error if $V_1$ is dropped, and the same $2.8\ \%$ in the blade speed and the stage's specific work.
**The nozzle efficiency.**
$$
\eta_N = \frac{h_1 - h_2}{h_1 - h_{2s}}, \qquad V_{2,\mathrm{actual}} = \sqrt{2 \eta_N \left( h_1 - h_{2s} \right)}
$$
**The pump work, exact and approximate.** For an incompressible liquid,
$$
w_{\mathrm{rev}} = \int v\, dP = v \Delta P, \qquad
\Delta T_{\mathrm{pump}} = \frac{w \left( 1 - \eta_p \right)}{c} \ \text{(the irreversible part)}
$$
**The evaluation for a boiler feed pump:** $v = 0.001010\ \mathrm{m^{3} / kg}$, $\Delta P = 6\ \mathrm{MPa}$, $\eta_p = 0.80$:
$$
w = \frac{0.001010 \times 5990}{0.80} = 7.56\ \mathrm{kJ / kg}, \qquad
\Delta T = \frac{7.56 \times 0.20}{4.18} = 0.36\ \mathrm{K}
$$
**The $0.36\ \mathrm{K}$ is not a rounding error.** In a $1{,}000\ \mathrm{MW}$ plant the feedwater pump absorbs $25\ \mathrm{MW}$ and delivers $25\ \mathrm{MW}$ of **heat** to the feedwater, which is $2.5\ \%$ of the plant's output and is worth **$500\ \mathrm{kW}$ of fuel** in the cycle calculation. A feedwater heater's duty is wrong by that much if the pump's heat is charged to it.
:::

::: definition Turbomachinery efficiencies {#def-eff}
$$
\eta_T = \frac{\text{actual work}}{\text{isentropic work}} = \frac{h_1 - h_2}{h_1 - h_{2s}}, \qquad
\eta_C = \frac{\text{isentropic work}}{\text{actual work}} = \frac{h_{2s} - h_1}{h_2 - h_1}
$$
**The direction of the inequality is the whole difference between the two.** A turbine's actual work is **less** than the isentropic, so $\eta_T$ is actual over ideal; a compressor's actual work is **more**, so $\eta_C$ is ideal over actual. **Both are less than one and neither is a ratio of the same two numbers.**
**The number that shows why the efficiency is applied to enthalpy and not to pressure.** Air from $100\ \mathrm{kPa}$, $300\ \mathrm{K}$ to $800\ \mathrm{kPa}$ at $\eta_C = 0.82$:
$$
T_{2s} = 300 \times 8^{0.2857} = 543.4\ \mathrm{K}, \qquad
\Delta h_s = 1.005 \times 243.4 = 244.6\ \mathrm{kJ / kg}
$$
$$
\Delta h = \frac{244.6}{0.82} = 298.3\ \mathrm{kJ / kg}, \qquad
T_2 = 300 + \frac{298.3}{1.005} = 596.8\ \mathrm{K}
$$
**The wrong method** — reducing the pressure ratio to $1 + 0.82 \times 7 = 6.74$ — gives $T_2 = 300 \times 6.74^{0.2857} = 521\ \mathrm{K}$, an error of **$76\ \mathrm{K}$** and $76\ \mathrm{kJ / kg}$.
**The efficiencies you will meet, and what they mean.**
$$
\begin{array}{l c l}
\text{Large steam turbine, whole machine} & 0.85\text{--}0.92 & \text{the last stages are the worst} \\
\text{Turbine stage, optimum pressure ratio} & 0.88\text{--}0.93 & \text{off-design falls steeply} \\
\text{Centrifugal compressor} & 0.70\text{--}0.80 & \text{robust, wide operating range} \\
\text{Axial compressor, modern} & 0.88\text{--}0.92 & \text{eight to ten stages in a jet engine} \\
\text{Reciprocating compressor, multi-stage} & 0.75\text{--}0.88 & \text{clearance and valve losses} \\
\text{Centrifugal pump} & 0.60\text{--}0.80 & \text{best at the design flow} \\
\text{Boiler feed pump} & 0.78\text{--}0.86 & \text{the } 0.36\ \mathrm{K} \text{ above} \\
\text{Nozzle} & 0.92\text{--}0.97 & \text{convergent; the divergent part is the risk}
\end{array}
$$
**The mechanical and generator efficiencies multiply.**
$$
\eta_{\mathrm{overall}} = \eta_{\mathrm{isentropic}} \times \eta_{\mathrm{mech}} \times \eta_{\mathrm{generator}}, \qquad
0.90 \times 0.985 \times 0.985 = 0.874
$$
**The number that decides a specification.** A turbine vendor quoting $90\ \%$ **isentropic** and a buyer who reads it as **shaft** efficiency has mis-stated the machine's output by **$2.6\ \%$**, which on a $100\ \mathrm{MW}$ set is **$2.6\ \mathrm{MW}$** and about **$2\ \%$** of the machine's price every year.
:::

::: definition Unsteady flow: filling and emptying {#def-unsteady}
**The general uniform-flow balance.** For a control volume whose contents are spatially uniform at each instant and whose streams are steady:
$$
\underbrace{\left( m_2 u_2 - m_1 u_1 \right)}_{\text{stored}} = Q - W + \sum m_i h_i - \sum m_e h_e
$$
**The term that surprises.** The incoming mass brings **enthalpy** $h_i = u_i + P_i v_i$ and the tank stores **internal energy** $u_2$, because the incoming mass had to be **pushed** into the control volume by the mass behind it.
**The evacuated tank.** $m_1 = 0$, $Q = 0$, $W = 0$, rigid so no boundary work:
$$
m_2 u_2 = m_2 h_i \quad \Rightarrow \quad u_2 = h_i \quad \Rightarrow \quad c_v T_2 = c_p T_i
$$
$$
\boxed{ T_2 = \gamma T_i }
$$
**Air from a $300\ \mathrm{K}$ main fills an evacuated insulated tank to $420\ \mathrm{K}$ — $147\ {}^{\circ}\mathrm{C}$.** It then cools to $300\ \mathrm{K}$ at constant volume and its pressure falls by a factor of $\gamma$:
$$
\frac{P_{\mathrm{final}}}{P_{\mathrm{supply}}} = \frac{T_0}{\gamma T_0} = \frac{1}{1.4} = 0.714
$$
**The number that makes this a real engineering problem.** A $200\ \mathrm{L}$ air bottle charged to $200\ \mathrm{bar}$ from a $200\ \mathrm{bar}$ main and left overnight reads **$143\ \mathrm{bar}$** in the morning. The compressor is not broken and there is no leak: **the gas was hot when it was charged.** A filling station that does not correct for this under-delivers by **$29\ \%$**, and every scuba, dive and breathing-air specification has a **soak** clause because of it.
**The tank charged from a non-evacuated state.** Rigid, adiabatic, supply at $T_i$:
$$
m_2 c_v T_2 = m_1 c_v T_1 + \left( m_2 - m_1 \right) c_p T_i
\quad \Rightarrow \quad
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2} \ \ \left( T_1 = T_i \right)
$$
**The evaluation.** From $100$ to $800\ \mathrm{kPa}$ with $T_i = 300\ \mathrm{K}$:
$$
T_2 = 300 \times \frac{100 + 1.4 \times 700}{800} = 300 \times 1.350 = 405\ \mathrm{K}, \qquad
P_{\mathrm{after\ soak}} = 800 \times \frac{300}{405} = 593\ \mathrm{kPa}
$$
**The emptying case.** A tank discharging to atmosphere does **work on the leaving gas**, and if the discharge is fast enough to be adiabatic the gas remaining **expands reversibly** and cools:
$$
T_2 = T_1 \left( \frac{P_2}{P_1} \right)^{\left( \gamma - 1 \right) / \gamma}, \qquad
m_2 = m_1 \left( \frac{P_2}{P_1} \right)^{1 / \gamma}
$$
**The number that matters for a receiver's usable content.** A $1\ \mathrm{m^{3}}$ receiver at $800\ \mathrm{kPa}$ and $300\ \mathrm{K}$ holds $m_1 = 9.35\ \mathrm{kg}$. Draining it to $100\ \mathrm{kPa}$ **isothermally** yields $8.18\ \mathrm{kg}$; draining it **adiabatically and reversibly** leaves
$$
m_2 = 9.35 \times \left( \frac{100}{800} \right)^{1 / 1.4} = 9.35 \times 0.2176 = 2.03\ \mathrm{kg}
$$
so **$7.32\ \mathrm{kg}$** is delivered against $8.18\ \mathrm{kg}$ — **$11\ \%$ less**, because the gas left cold and the receiver's stored mass did not all come out. **The practical rule is that a receiver's usable air is the isothermal figure less $10$ to $15\ \%$**, and every compressed-air system sizing that ignores this under-sized the receiver.
:::

::: widget plot
f: 420-12000/x; 300
x: 100, 900
y: 250, 450
labels: fill temperature K; supply temperature K
caption: Final temperature of air in an insulated rigid tank after adiabatic filling from a $300\ \mathrm{K}$ main, against the final absolute pressure, from $T_2 = T_i \left[ P_1 + \gamma \left( P_2 - P_1 \right) \right] / P_2$ with $P_1 = 100\ \mathrm{kPa}$. The tank starts at atmospheric pressure, so the first gas in is heated most and the last least; the temperature asymptotes to $\gamma T_i = 420\ \mathrm{K}$ as the initial pressure becomes negligible. **Every point on this curve is a tank that will read low in the morning**, and the ratio $T_2 / T_i$ is the fraction by which an uncorrected fill gauge over-states the delivered mass.
:::

## Worked cases

::: example A steam turbine {#ex-turbine}
Steam enters an adiabatic turbine at $6\ \mathrm{MPa}$ and $600\ {}^{\circ}\mathrm{C}$ with a velocity of $60\ \mathrm{m / s}$ at an elevation of $60\ \mathrm{m}$, and leaves at $10\ \mathrm{kPa}$ with a quality of $0.90$, a velocity of $120\ \mathrm{m / s}$ and an elevation of $0\ \mathrm{m}$. The mass flow is $5\ \mathrm{kg / s}$. Find the power and the isentropic efficiency.
::: solution
**The states.** Inlet, $6\ \mathrm{MPa}$, $600\ {}^{\circ}\mathrm{C}$:
$$
h_1 = 3{,}658.8\ \mathrm{kJ / kg}, \qquad s_1 = 7.1677\ \mathrm{kJ / kg \cdot K}
$$
Exit, $10\ \mathrm{kPa}$, $x = 0.90$:
$$
h_2 = h_f + x h_{fg} = 191.81 + 0.90 \times 2{,}392.1 = 2{,}344.7\ \mathrm{kJ / kg}
$$
**The energy balance, with every term.**
$$
\dot{W} = \dot{Q} - \dot{m} \left[ \left( h_2 - h_1 \right) + \frac{V_2^{2} - V_1^{2}}{2} + g \left( z_2 - z_1 \right) \right]
$$
$$
\Delta h = 2{,}344.7 - 3{,}658.8 = - 1{,}314.1\ \mathrm{kJ / kg}
$$
$$
\Delta ke = \frac{120^{2} - 60^{2}}{2 \times 1000} = \frac{14{,}400 - 3{,}600}{2000} = 5.4\ \mathrm{kJ / kg}
$$
$$
g \Delta z = 9.81 \times \left( - 60 \right) = - 588.6\ \mathrm{J / kg} = - 0.59\ \mathrm{kJ / kg}
$$
$$
\dot{W} = - 5 \times \left( - 1{,}314.1 + 5.4 - 0.59 \right) = - 5 \times \left( - 1{,}309.3 \right) = 6{,}546\ \mathrm{kW}
$$
**The corrections' size.** The kinetic term is $5.4 / 1{,}314 = 0.41\ \%$ and the potential term $0.04\ \%$ — together **$0.45\ \%$**, or **$29\ \mathrm{kW}$**. They are dropped in a feasibility study and kept in a performance test.
**The isentropic efficiency.** At $10\ \mathrm{kPa}$: $s_f = 0.6492$, $s_{fg} = 7.4996$.
$$
x_{2s} = \frac{7.1677 - 0.6492}{7.4996} = 0.8689, \qquad
h_{2s} = 191.81 + 0.8689 \times 2{,}392.1 = 2{,}269.7\ \mathrm{kJ / kg}
$$
$$
\eta_T = \frac{h_1 - h_2}{h_1 - h_{2s}} = \frac{1{,}314.1}{1{,}389.1} = 0.946
$$
**The wetness.** The actual exit quality is $0.90$ against the isentropic $0.869$ — the irreversibilities have **evaporated** $3\ \%$ of the water, which is counter-intuitive and correct: entropy generation at a saturation temperature adds enthalpy at constant pressure, and in the dome that means drier steam.
**The last-stage problem.** A $10\ \%$ liquid content at the last-stage trailing edge is at the **accepted limit**; above $12\ \%$ the droplet erosion of the blade tips becomes the life-limiting mechanism, and the design response is a **reheat** that lifts the exit quality to $0.95$ at the cost of one extra boiler pass.
**The check.** The entropy generation:
$$
s_2 = 0.6492 + 0.90 \times 7.4996 = 7.3988\ \mathrm{kJ / kg \cdot K}, \qquad
\dot{S}_{\mathrm{gen}} = 5 \times \left( 7.3988 - 7.1677 \right) = 1.156\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = T_0 \dot{S}_{\mathrm{gen}} = 293.15 \times 1.156 = 339\ \mathrm{kW}
$$
against the $1{,}389.1 - 1{,}314.1 = 75.0\ \mathrm{kJ / kg} \times 5 = 375\ \mathrm{kW}$ of work not produced. The $10\ \%$ discrepancy is the difference between $T_0 S_{\mathrm{gen}}$ and the lost work measured against the **actual** exit state, and it is the Gouy–Stodola theorem applied at a state that is not dead — a subtlety the exergy chapter resolves.
*Sanity.* The reason the exit is at $x = 0.90$ and not $x = 1$ is that the expansion has crossed the saturation line, and the reason a turbine's isentropic efficiency of $94.6\ \%$ looks high is that it is a **large** machine: a $5\ \mathrm{kg / s}$ turbine is a $6\ \mathrm{MW}$ set, and efficiency rises with size because the profile and leakage losses scale with the blade height while the work scales with the annulus area.
:::
:::

::: example A throttling calorimeter {#ex-throttle}
Wet steam at $4\ \mathrm{MPa}$ is throttled to $20\ \mathrm{kPa}$, where the temperature reads $120\ {}^{\circ}\mathrm{C}$. Find the upstream quality, and explain why the device does not work on very wet steam.
::: solution
**The model.** A throttle is adiabatic, does no work, and its inlet and outlet kinetic terms are equal at equal pipe sizes:
$$
h_1 = h_2
$$
**The downstream state.** At $20\ \mathrm{kPa}$, $T_{\mathrm{sat}} = 60.06\ {}^{\circ}\mathrm{C}$ and $120\ {}^{\circ}\mathrm{C}$ is $60\ \mathrm{K}$ of superheat, so the state is measurable with an ordinary thermometer. Interpolating the superheated table between $100$ and $150\ {}^{\circ}\mathrm{C}$:
$$
h_2 \approx 2{,}676.2 + \frac{120 - 100}{150 - 100} \times \left( 2{,}772.7 - 2{,}676.2 \right) = 2{,}676.2 + 38.6 = 2{,}714.8\ \mathrm{kJ / kg}
$$
**The upstream quality.** At $4\ \mathrm{MPa}$: $h_f = 1{,}087.31$, $h_{fg} = 1{,}713.5$.
$$
x_1 = \frac{h_1 - h_f}{h_{fg}} = \frac{2{,}714.8 - 1{,}087.31}{1{,}713.5} = 0.9498
$$
**Why it fails on wet steam.** The throttling must land the state in the **superheated** region for the temperature to mean anything. The most upstream quality that still reaches $20\ \mathrm{kPa}$ superheated is $x = h_{g} \left( 20\ \mathrm{kPa} \right)$ mapped back:
$$
x_{\min} = \frac{h_{g, 20\ \mathrm{kPa}} - h_{f, 4\ \mathrm{MPa}}}{h_{fg, 4\ \mathrm{MPa}}} = \frac{2{,}608.9 - 1{,}087.3}{1{,}713.5} = 0.888
$$
**so a throttling calorimeter cannot read a quality below $0.89$ at $4\ \mathrm{MPa}$.** Below that the steam leaves the valve **still wet**, its temperature is $T_{\mathrm{sat}} (20\ \mathrm{kPa}) = 60\ {}^{\circ}\mathrm{C}$ whatever the quality, and the instrument reads nothing.
**The remedy, and its cost.** A **superheating calorimeter** puts a small electric heater between the valve and the thermometer and supplies enough to guarantee $20\ \mathrm{K}$ of superheat:
$$
\dot{Q}_{\mathrm{heater}} = \dot{m} \left( h_{g, 20\ \mathrm{kPa}} + c_p \times 20 - h_2 \right)
$$
For $0.02\ \mathrm{kg / s}$ of sample and $x_1 = 0.70$, the duty is $0.02 \times \left( 2{,}608.9 + 48 - 2{,}286 \right) = 7.4\ \mathrm{kW}$ — a **$7.4\ \mathrm{kW}$** heater to measure a $10\ \mathrm{MW}$ flow, which is a **$0.07\ \%$** intrusion and the reason the instrument works.
**The number that shows why throttling is chosen at all.** The pressure drop is $3{,}980\ \mathrm{kPa}$ and the work destroyed is
$$
s_1 = 1{,}087.3 \Rightarrow s_1 = 2.7964 + 0.9498 \times 3.2733 = 5.906\ \mathrm{kJ / kg \cdot K}, \qquad
s_2 = 8.0933\ \mathrm{kJ / kg \cdot K}
$$
$$
s_{\mathrm{gen}} = 2.187\ \mathrm{kJ / kg \cdot K}, \qquad
x_{\mathrm{dest}} = 293.15 \times 2.187 = 641\ \mathrm{kJ / kg}
$$
**$641\ \mathrm{kJ / kg}$ of work destroyed to measure a quality** — which is why a calorimeter's sample line is $2\ \mathrm{mm}$ bore and the destruction is $641\ \mathrm{W}$ per $1\ \mathrm{g / s}$ and nobody minds.
*Sanity.* The reason $h$ is constant and not $u$ is that the fluid does flow work at both ends, and the reason the temperature of wet steam **falls** on throttling while that of an ideal gas does not change is that in the dome the enthalpy is fixed while the pressure falls, so the temperature must fall with the saturation line. A throttled wet steam at $4\ \mathrm{MPa}$ leaves at $60\ {}^{\circ}\mathrm{C}$, not at $250\ {}^{\circ}\mathrm{C}$, and a technician who expects the reverse is the reason every throttling-valve specification carries a note about the downstream temperature.
:::
:::

::: example A mixing chamber {#ex-mix}
$2\ \mathrm{kg / s}$ of steam at $1\ \mathrm{MPa}$ and $300\ {}^{\circ}\mathrm{C}$ is mixed adiabatically with liquid water at $1\ \mathrm{MPa}$ and $20\ {}^{\circ}\mathrm{C}$ to produce saturated vapour at $1\ \mathrm{MPa}$. Find the water flow rate and the entropy generation.
::: solution
**The states.**
$$
\begin{array}{l l c c}
1 & \text{superheated steam, } 1\ \mathrm{MPa},\ 300\ {}^{\circ}\mathrm{C} & h_1 = 3{,}051.6 & s_1 = 7.1246 \\
2 & \text{liquid water, } 1\ \mathrm{MPa},\ 20\ {}^{\circ}\mathrm{C} & h_2 \approx h_f @ 20 + v_f \Delta P = 83.91 + 1.0 = 84.9 & s_2 \approx 0.2965 \\
3 & \text{saturated vapour, } 1\ \mathrm{MPa} & h_3 = 2{,}777.1 & s_3 = 6.5850
\end{array}
$$
**The mass balance.** $\dot{m}_3 = \dot{m}_1 + \dot{m}_2$.
**The energy balance.** Adiabatic, no work, negligible kinetic:
$$
\dot{m}_1 h_1 + \dot{m}_2 h_2 = \left( \dot{m}_1 + \dot{m}_2 \right) h_3
$$
$$
\dot{m}_2 = \dot{m}_1 \, \frac{h_1 - h_3}{h_3 - h_2} = 2 \times \frac{3{,}051.6 - 2{,}777.1}{2{,}777.1 - 84.9} = 2 \times \frac{274.5}{2{,}692.2} = 0.204\ \mathrm{kg / s}
$$
**The interpretation.** Only **$10\ \%$** as much water as steam is needed, because the water's job is to condense the superheat and the superheat is only $274\ \mathrm{kJ / kg}$ against the water's $2{,}692\ \mathrm{kJ / kg}$ of evaporation capacity.
**The entropy generation.**
$$
\dot{S}_{\mathrm{gen}} = \dot{m}_3 s_3 - \dot{m}_1 s_1 - \dot{m}_2 s_2
= 2.204 \times 6.5850 - 2 \times 7.1246 - 0.204 \times 0.2965
$$
$$
= 14.513 - 14.249 - 0.060 = 0.204\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = 293.15 \times 0.204 = 59.7\ \mathrm{kW}
$$
**The verdict.** The mixing destroys **$60\ \mathrm{kW}$** of work in a device that has no moving parts and produces a product the plant wanted. The **useful** output — the desuperheated steam — is worth more than $60\ \mathrm{kW}$ of lost work, so the device is not wasteful; but the $60\ \mathrm{kW}$ is the price of a process that could not be done reversibly.
**The design rule this teaches.** **Desuperheating is the cheapest thermodynamics in a plant and the most destroyed.** A $274\ \mathrm{kJ / kg}$ superheat is removed for the cost of a spray valve and $0.2\ \mathrm{kg / s}$ of water, and it destroys $60\ \mathrm{kW}$; a **steam-raising** desuperheater that generated the difference would be a $60\ \mathrm{kW}$ machine costing six figures. The trade is not close.
**The atomiser requirement.** The water must be **atomised to below $100\ \mu\mathrm{m}$** and given **at least $30$ pipe diameters** of straight run to the temperature probe, or the droplets hit the wall, the probe reads the saturation temperature of the wall film, and the control loop hunts. This is the whole of a desuperheater's mechanical design and it appears in no thermodynamics textbook.
*Sanity.* The reason $h_2$ carries a $v_f \Delta P$ correction is that the water is at $1\ \mathrm{MPa}$ and the table's $h_f$ is at $20\ {}^{\circ}\mathrm{C}$ saturation, $2.34\ \mathrm{kPa}$; the correction is $1.0\ \mathrm{kJ / kg}$ and it changes $\dot{m}_2$ by $0.04\ \%$. It is included here and not in a feasibility estimate, which is the correct order of care.
:::
:::

::: example Filling a scuba cylinder {#ex-fill}
A $12\ \mathrm{L}$ insulated cylinder is charged from a large reservoir of air at $300\ \mathrm{K}$ until the gauge reads $200\ \mathrm{bar}$. Find the final temperature and pressure, and the mass delivered against the gauge's indication.
::: solution
**The model.** Rigid, adiabatic, no work, uniform flow. The cylinder starts at $1\ \mathrm{bar}$ and $300\ \mathrm{K}$.
$$
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2}
= 300 \times \frac{1 + 1.4 \times 199}{200} = 300 \times 1.3935 = 418\ \mathrm{K} = 145\ {}^{\circ}\mathrm{C}
$$
**The mass the gauge implies.** A gauge reading $200\ \mathrm{bar}$ at $300\ \mathrm{K}$ would mean
$$
m_{\mathrm{implied}} = \frac{20{,}000 \times 0.012}{0.287 \times 300} = 2.787\ \mathrm{kg}
$$
**The mass actually there, while hot.**
$$
m_{\mathrm{actual}} = \frac{20{,}000 \times 0.012}{0.287 \times 418} = 2.000\ \mathrm{kg}
$$
**After the soak.** At $300\ \mathrm{K}$ the pressure falls to
$$
P_3 = 200 \times \frac{300}{418} = 143.5\ \mathrm{bar}
$$
and the mass is then $2.787\ \mathrm{kg}$ — so **the gas is all there, but the gauge lied at the moment of reading.**
**The delivered mass against the customer's expectation.** A diver who buys "$200\ \mathrm{bar}$ in a $12\ \mathrm{L}$ cylinder" expects $2.787\ \mathrm{kg}$ and, if the fill station reads the gauge hot and stops, gets $2.000\ \mathrm{kg}$ — **$28\ \%$ short**.
**The three remedies, all of which are in the standards.**
$$
\begin{array}{l l l}
\text{Slow fill} & \text{limit the fill to } \Delta P < 10\ \mathrm{bar / min} & \text{the gas stays near } 300\ \mathrm{K} \text{ by heat transfer} \\
\text{Water bath} & \text{immerse the cylinder during filling} & \text{the fill is nearly isothermal} \\
\text{Soak and top up} & \text{fill, wait } 30\ \mathrm{min},\ \text{top up} & \text{the standard dive-station procedure}
\end{array}
$$
**The number that makes the slow-fill rule quantitative.** The cylinder's Biot number with a natural-convection coefficient of $10\ \mathrm{W / m^{2} K}$ over $0.15\ \mathrm{m^{2}}$ and a gas heat capacity of $m c_v \approx 2 \times 718\ \mathrm{J / K}$ gives a time constant of
$$
\tau = \frac{m c_v}{h A} = \frac{1{,}436}{10 \times 0.15} = 957\ \mathrm{s} = 16\ \mathrm{min}
$$
so a fill faster than **$20\ \mathrm{min}$** is essentially adiabatic and a fill slower than an hour is essentially isothermal. A $12\ \mathrm{L}$ cylinder filled in $90$ seconds is at $418\ \mathrm{K}$; the same cylinder filled in an hour is at $305\ \mathrm{K}$.
**The safety clause this is really about.** A cylinder filled hot to $200\ \mathrm{bar}$ and left in the sun at $50\ {}^{\circ}\mathrm{C}$ reaches
$$
P = 200 \times \frac{323}{418} = 155\ \mathrm{bar}\ \text{(cooling from the fill)} \quad \text{then} \quad P = 143.5 \times \frac{323}{300} = 154\ \mathrm{bar}
$$
so the sun is not the hazard; **the hazard is a fast fill to $230\ \mathrm{bar}$ in a cylinder rated at $232$, which the hot fill has already reached and the cold check will not see.** Every hydrostatic test specification and every fill-station procedure in the world exists because of this $29\ \%$.
*Sanity.* The reason the temperature rise is $\gamma$ and not $c_p / c_v$ applied twice is that the incoming gas brings enthalpy and the stored gas holds internal energy, and the ratio of the two is $\gamma$. The same $\gamma$ appears in the speed of sound, in the isentropic exponent and here, and the reason it recurs is that all four are statements about the same two heat capacities.
:::
:::

::: history
The **control volume** as a working object is not in Carnot, who held a fixed mass of air in a cylinder; it enters with the **steam and gas turbine** engineers of the **1880s and 1890s**, who had to balance a machine through which matter was continuously passing and for which no closed-system bookkeeping existed. **The enthalpy** was named by **B. Massau** in **1875** as *la fonction calorifique* and by **Heike Kamerlingh Onnes** in **1894** as the quantity that makes a steady-flow balance read $\Delta H$; **Rankine** had used the combination $u + P v$ in **1859** without naming it, and **Gibbs** wrote it out in full in **1873** and never abbreviated it. **The name "enthalpy"** is **Keenan**'s of **1928**, coined on the model of *energy* from the Greek *thalpein*, to heat, and it took two decades to displace "heat function" and "total heat" in the English-language literature — a victory Keenan fought in the transactions of the **ASME** and won largely because his **steam tables** used it. **The nozzle and the steam turbine** are **Parsons**'s and **de Laval**'s of **1884** and **1889**, and the $V = \sqrt{2 \Delta h}$ relation is the **de Laval** nozzle's design equation, arrived at empirically a decade before anyone wrote the energy balance that justifies it. **The unsteady filling problem** and its $T_2 = \gamma T_i$ result were worked by **Zeuner** in the **1860s** in the context of **compressed-air locomotives**, whose cylinders froze and whose receivers under-delivered for exactly the reason this lesson's scuba example gives; the **$1904$ Porter steam automobile** and the **$1920$s** compressed-air railway trials were both defeated by the same $29\ \%$. **The Reynolds transport theorem**, which is the general statement from which all of this descends, was published by **Osborne Reynolds** in **1903** in a paper on the kinetic theory of gases and was adopted into fluid mechanics only in the **1940s**, thirty years after it was written.
:::

## Where this leads

The steady-flow balance is the workhorse of [[thermodynamics/power-cycles]] and of every device in [[machine-design]] and [[manufacturing]]; the enthalpy it consumes is tabulated in [[thermodynamics/pure-substances]]; the isentropic efficiencies introduced here are re-derived from entropy in [[thermodynamics/entropy]], and the destroyed work in the last three examples is the subject of [[thermodynamics/exergy]].

::: summary
- A flowing stream carries $h + V^2/2 + gz$; the $Pv$ inside $h$ is the flow work, and a steady-flow balance written with $u$ is wrong by $Pv$.
- Keep the kinetic term wherever the velocity changes by more than about $70\ \mathrm{m/s}$, and drop $g \Delta z$ unless the elevation is the machine.
- $h_1 = h_2$ is a throttle's model and not a pipe's, and a throttling calorimeter cannot read a quality below $0.89$ at $4\ \mathrm{MPa}$.
- A turbine's efficiency is actual work over isentropic work and a compressor's is the reciprocal; both are applied to the enthalpy difference and never to the pressure ratio.
- A pump's $0.36\ \mathrm{K}$ of irreversible heating is $2.5\ \%$ of a large plant's output and belongs to the pump and not to the economiser.
- An evacuated insulated tank fills to $\gamma T_i$; a partly charged one fills to $T_i [P_1 + \gamma (P_2 - P_1)] / P_2$, and every uncorrected fill gauge over-states the mass by up to $29\ \%$.
- A mixing chamber with no moving parts can destroy $60\ \mathrm{kW}$ of work while doing exactly what the plant asked for.
:::

::: quiz
An insulated rigid tank is filled from a steady main until the pressures equalise. Why does the gas inside end hotter than the supply?
- [ ] Compression heating from the incoming jet's momentum
- [x] The incoming mass arrives carrying flow work $Pv$ that is converted to internal energy inside the tank
- [ ] Heat is generated by friction in the valve
- [ ] It does not; the temperatures equalise
::: solution
The uniform-flow balance stores **internal** energy while the incoming stream brings **enthalpy**, and the difference $Pv$ has to go somewhere. For an evacuated tank it all stays: $u_2 = h_i$, so $T_2 = \gamma T_i$. In a real valve some of the work is also dissipated in the valve itself, but that is a second-order effect — the $120\ \mathrm{K}$ rise is the flow work, and it is why a fill-station gauge read hot over-states the delivered mass by up to $29\ \%$.
:::
:::

## Exercises

::: exercise Flow work {level=1 check="243"}
Give the flow work in kilojoules per kilogram of steam at $3\ \mathrm{MPa}$ with $v = 0.08114\ \mathrm{m^{3} / kg}$.
::: solution
$P v = 3000 \times 0.08114 = 243\ \mathrm{kJ / kg}$.
:::
:::

::: exercise Potential {level=1 check="0.098"}
Give the change in specific potential energy, in kilojoules per kilogram, for a $10\ \mathrm{m}$ rise.
::: solution
$g \Delta z = 9.81 \times 10 = 98\ \mathrm{J / kg} = 0.098\ \mathrm{kJ / kg}$.
:::
:::

::: exercise Kinetic {level=1 check="5"}
Give the kinetic energy in kilojoules per kilogram of a stream moving at $100\ \mathrm{m / s}$.
::: solution
$V^2 / 2 = 10{,}000 / 2 = 5{,}000\ \mathrm{J / kg} = 5\ \mathrm{kJ / kg}$.
:::
:::

::: exercise Evacuated tank {level=1 check="420"}
Air at $300\ \mathrm{K}$ fills an evacuated insulated tank. Give the final temperature in kelvin.
::: solution
$T_2 = \gamma T_i = 1.4 \times 300 = 420\ \mathrm{K}$.
:::
:::

::: exercise Throttle {level=1 check="0"}
Across an adiabatic throttle with no work and equal pipe sizes, give $h_2 - h_1$ in kilojoules per kilogram.
::: solution
$0$ — a throttle conserves enthalpy.
:::
:::

::: exercise Nozzle {level=2}
Steam enters a nozzle at $2\ \mathrm{MPa}$ and $350\ {}^{\circ}\mathrm{C}$ with $V_1 = 55\ \mathrm{m / s}$ and leaves at $0.4\ \mathrm{MPa}$ where $h_{2s} = 2{,}900\ \mathrm{kJ / kg}$; $h_1 = 3{,}159.9\ \mathrm{kJ / kg}$ and $\eta_N = 0.94$. Give the exit velocity and, for $\dot{m} = 3\ \mathrm{kg / s}$, the exit area if $v_2 = 0.4284\ \mathrm{m^{3} / kg}$.
::: solution
$$
V_2 = \sqrt{V_1^2 + 2 \eta_N \left( h_1 - h_{2s} \right)} = \sqrt{55^2 + 2 \times 0.94 \times 259{,}900} = \sqrt{3{,}025 + 488{,}612} = 701\ \mathrm{m / s}
$$
$$
A_2 = \frac{\dot{m} v_2}{V_2} = \frac{3 \times 0.4284}{701} = 1.834 \times 10^{- 3}\ \mathrm{m^{2}} = 18.3\ \mathrm{cm^{2}}, \qquad D_2 = 48\ \mathrm{mm}
$$
*Sanity.* A $48\ \mathrm{mm}$ throat for $3\ \mathrm{kg / s}$ of steam is small, and the reason is the velocity: at the $40\ \mathrm{m / s}$ of a main the same flow would need a $480\ \mathrm{mm}$ pipe. **The nozzle's job is to make the density-velocity product large**, and a Mach number of $0.9$ at the exit is what the $701\ \mathrm{m / s}$ means in a vapour where $c \approx 640\ \mathrm{m / s}$ — so this nozzle is **choked**, and its mass flow is set by the throat and not by the downstream pressure.
:::
:::

::: exercise Compressor {level=2}
Air is compressed adiabatically from $100\ \mathrm{kPa}$, $293\ \mathrm{K}$ to $600\ \mathrm{kPa}$ at $0.4\ \mathrm{kg / s}$ with an isentropic efficiency of $0.80$. Give the delivery temperature, the power and the entropy generation.
::: solution
$$
T_{2s} = 293 \times 6^{0.2857} = 293 \times 1.6685 = 488.9\ \mathrm{K}, \qquad
\Delta h_s = 1.005 \times 195.9 = 196.9\ \mathrm{kJ / kg}
$$
$$
\Delta h = \frac{196.9}{0.80} = 246.1\ \mathrm{kJ / kg}, \qquad
T_2 = 293 + \frac{246.1}{1.005} = 537.8\ \mathrm{K} = 264.8\ {}^{\circ}\mathrm{C}
$$
$$
\dot{W} = 0.4 \times 246.1 = 98.4\ \mathrm{kW}
$$
$$
\dot{S}_{\mathrm{gen}} = \dot{m} \left( c_p \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1} \right)
= 0.4 \times \left( 1.005 \ln 1.835 - 0.287 \ln 6 \right) = 0.4 \times \left( 0.6064 - 0.5154 \right) = 0.0364\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{lost}} = 293.15 \times 0.0364 = 10.7\ \mathrm{kW}
$$
*Sanity.* The energy balance closes exactly: all $98.4\ \mathrm{kW}$ of shaft power appears as enthalpy rise, since $\Delta \dot H = 0.4 \times 246.1 = 98.4\ \mathrm{kW}$ and there is nowhere else for it to go. The $10.7\ \mathrm{kW}$ is therefore **not a separate loss** but the part of the delivered exergy that has been destroyed — the check being that $\dot W_{\mathrm{in}} - \Delta \dot H = 0$ while $T_0 \dot S_{\mathrm{gen}} = 10.7\ \mathrm{kW}$ of the $98.4\ \mathrm{kW}$ supplied is no longer work-capable.
:::
:::

::: exercise Derivation {level=3}
Derive $T_2 = \gamma T_i$ for an evacuated insulated tank and the general filling relation $m_2 c_v T_2 = m_1 c_v T_1 + \left( m_2 - m_1 \right) c_p T_i$, then obtain the usable-air fraction of a receiver drained adiabatically and show it approaches the isothermal value only as the receiver's mass becomes large.
::: solution
**The uniform-flow balance.** A rigid, adiabatic control volume with no shaft work:
$$
\frac{d \left( m u \right)}{d t} = \dot{m}_i h_i
$$
Integrating from state 1 to state 2 with $h_i$ constant:
$$
\boxed{ m_2 u_2 - m_1 u_1 = \left( m_2 - m_1 \right) h_i }
$$
**The evacuated case.** $m_1 = 0$, so $u_2 = h_i$, and with $u = c_v T$, $h = c_p T$:
$$
c_v T_2 = c_p T_i \quad \Rightarrow \quad T_2 = \gamma T_i .
$$
**The general case.** With $m = P V / \left( R T \right)$ and $T_1 = T_i$:
$$
\frac{P_2 V}{R} c_v T_2 \cdot \frac{1}{T_2} T_2 = \frac{P_1 V}{R} c_v T_i + \left( \frac{P_2 V}{R T_2} - \frac{P_1 V}{R T_i} \right) c_p T_i
$$
which on collecting gives
$$
T_2 = T_i\, \frac{P_1 + \gamma \left( P_2 - P_1 \right)}{P_2} .
$$
**The limits.** $P_1 \to 0$ gives $T_2 \to \gamma T_i$; $P_1 \to P_2$ gives $T_2 \to T_i$, as it must.
**The adiabatic discharge.** Now the gas remaining expands reversibly, so $T \propto P^{\left( \gamma - 1 \right) / \gamma}$ and
$$
m \left( P \right) = \frac{P V}{R T} = \frac{P V}{R T_1} \left( \frac{P}{P_1} \right)^{- \left( \gamma - 1 \right) / \gamma}
= m_1 \left( \frac{P}{P_1} \right)^{1 / \gamma}
$$
**The usable fraction.** Draining from $P_1$ to $P_0$:
$$
f_{\mathrm{ad}} = 1 - \left( \frac{P_0}{P_1} \right)^{1 / \gamma}, \qquad
f_{\mathrm{iso}} = 1 - \frac{P_0}{P_1}
$$
**The evaluation.** $P_1 = 800\ \mathrm{kPa}$, $P_0 = 101.3\ \mathrm{kPa}$:
$$
f_{\mathrm{ad}} = 1 - 0.1266^{0.714} = 1 - 0.2216 = 0.778, \qquad
f_{\mathrm{iso}} = 1 - 0.1266 = 0.873
$$
**The ratio, and why the receiver's own mass matters.** The ratio is $0.778 / 0.873 = 0.891$, so the adiabatic receiver gives **$11\ \%$ less**. But a real receiver is **steel**, and the steel is a thermal reservoir: with a mass ratio of steel to air of $180 / 9.35 = 19.3$ and a steel heat capacity of $0.46$ against air's $0.718$, the steel's heat capacity is $19.3 \times 0.46 / 0.718 = 12.4$ times the air's, so the gas stays close to isothermal and
$$
n_{\mathrm{eff}} \approx \frac{\gamma + 12.4}{1 + 12.4} = \frac{13.8}{13.4} = 1.030, \qquad
f = 1 - 0.1266^{1 / 1.030} = 0.866
$$
which is **$99\ \%$** of the isothermal value.
**The design conclusion.** **A steel receiver is isothermal; a composite or a lightly-lagged one is not.** A carbon-fibre air bottle, whose mass ratio to the air is $3$ instead of $19$ and whose specific heat is comparable, behaves far closer to adiabatic and delivers **$10\ \%$ less usable air** than the same volume in steel — which is a fact about a pressure vessel's material selection that appears in no materials textbook and in every compressed-air vehicle's range figure.
*Sanity.* The reason the two limits differ at all is that the gas left in the receiver has done work on the gas leaving, and in an adiabatic drain that work comes out of the gas's own internal energy and leaves it cold and dense. The steel gives the energy back, and the whole of the effect is a heat-transfer question wearing a thermodynamics problem.
:::
:::

::: exercise Design {level=3}
Specify the energy and mass balances, the instrumentation and the closure test for a $40\ \mathrm{MW}$ industrial combined-heat-and-power plant with a gas turbine, a heat-recovery steam generator and a district-heating water circuit.
::: solution
**The boundaries and the balances.**
$$
\begin{array}{l l l}
\text{Gas turbine} & \dot{W} = \dot{m}_{\mathrm{air}} \left( h_3 - h_4 \right) - \dot{m}_{\mathrm{fuel}} \mathrm{LHV} \left( 1 - \eta \right) & \text{shaft power, exhaust enthalpy} \\
\text{HRSG} & \dot{m}_g \left( h_4 - h_5 \right) = \dot{m}_{\mathrm{steam}} \Delta h_{\mathrm{water}} & \text{the pinch, the approach, the stack} \\
\text{Heat circuit} & \dot{Q}_H = \dot{m}_w c_p \Delta T_w & \text{the return temperature sets the efficiency} \\
\text{Plant} & \eta_{\mathrm{total}} = \frac{\dot{W} + \dot{Q}_H}{\dot{m}_{\mathrm{fuel}} \mathrm{LHV}} & \text{the only number the customer reads}
\end{array}
$$
**The evaluation at the guarantee point.**
$$
\begin{array}{l c r}
\text{Fuel} & 2.95\ \mathrm{kg / s}\ \text{of natural gas, LHV } 49.8\ \mathrm{MJ / kg} & 146.9\ \mathrm{MW} \\
\text{Shaft power} & & 40.0\ \mathrm{MW}\ \left( 27.2\ \% \right) \\
\text{Exhaust gas} & 48\ \mathrm{kg / s}\ \text{from } 540\ {}^{\circ}\mathrm{C}\ \text{to } 120\ {}^{\circ}\mathrm{C} & 51.6\ \mathrm{MW} \\
\text{Steam, } 12\ \mathrm{bar},\ 188\ {}^{\circ}\mathrm{C} & 14\ \mathrm{kg / s} & 27.0\ \mathrm{MW} \\
\text{Hot water} & 320\ \mathrm{kg / s}\ \text{from } 70\ {}^{\circ}\mathrm{C}\ \text{to } 95\ {}^{\circ}\mathrm{C} & 33.6\ \mathrm{MW} \\
\text{Stack and losses} & & 14.7\ \mathrm{MW}\ \left( 10\ \% \right) \\
\hline
\text{Total utilisation} & & 93.2\ \%
\end{array}
$$
**The five instruments that the guarantee turns on.**
$$
\begin{array}{l l l}
\text{Fuel flow} & \text{ultrasonic or Coriolis, } \pm 0.5\ \%,\ \text{with a gas chromatograph for the LHV} & \text{the LHV's } \pm 0.5\ \%\ \text{is the largest single uncertainty} \\
\text{Exhaust flow} & \text{an orifice or a traverse, } \pm 1.5\ \% & \text{the HRSG duty's dominant term} \\
\text{Exhaust temperature} & 4\text{-point redundant thermocouples, } \pm 2\ \mathrm{K} & \text{a } 10\ \mathrm{K}\ \text{error is } 1.4\ \mathrm{MW} \text{ of duty} \\
\text{Steam flow} & \text{orifice with density from IF97, } \pm 1\ \% & \\
\text{Water flow and } \Delta T & \text{ultrasonic } \pm 0.5\ \%,\ \text{matched PT100s } \pm 0.1\ \mathrm{K} & \text{a } 25\ \mathrm{K}\ \Delta T\ \text{at } \pm 0.15\ \mathrm{K}\ \text{is } \pm 0.6\ \%
\end{array}
$$
**The closure test.** The residual
$$
\varepsilon = \frac{\left| \dot{m}_{\mathrm{fuel}} \mathrm{LHV} - \dot{W} - \dot{Q}_{\mathrm{steam}} - \dot{Q}_{\mathrm{water}} - \dot{Q}_{\mathrm{stack}} \right|}{\dot{m}_{\mathrm{fuel}} \mathrm{LHV}}
$$
must be **below $2\ \%$**, and the stack term is computed from a **flue-gas analysis** ($\mathrm{CO_2}$, $\mathrm{O_2}$, $\mathrm{CO}$, moisture) and a measured stack temperature, not from an assumed excess air.
**The three things that are always wrong.** **The return water temperature**, which the district network controls and not the plant: a return at $55\ {}^{\circ}\mathrm{C}$ instead of $70\ {}^{\circ}\mathrm{C}$ costs $4\ \mathrm{MW}$ of recovered heat and $1.5\ \mathrm{MW}$ of power, because the HRSG's pinch moves. **The auxiliary power**, which is $1.5$ to $2.5\ \%$ of the output and is drawn from the same bus. **The gas composition**, whose Wobbe index and LHV vary by $2\ \%$ across a gas year and which must be sampled continuously and not assumed.
**The one note that protects the buyer.** **"THE GUARANTEE SHALL BE STATED AT THE NET ELECTRICAL TERMINALS AFTER DEDUCTION OF ALL AUXILIARY POWER, AT A RETURN WATER TEMPERATURE OF $70\ {}^{\circ}\mathrm{C}$, AND THE TEST SHALL REPORT THE ENERGY BALANCE RESIDUAL WITH EVERY LOAD POINT."** A gross-output guarantee and an assumed return temperature are worth **$3\ \mathrm{MW}$** on a $40\ \mathrm{MW}$ plant, and they are the two clauses a buyer's engineer must read first.
*Design comment.* The general rule is that **a CHP guarantee is a boundary definition wearing a performance figure**, and that the party who fixes the return temperature and the auxiliary-power deduction has fixed the result before the machine is built.
:::
:::
