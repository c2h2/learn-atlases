Every conservation law in mechanics is written for a **system** — a fixed, identifiable lump of matter. Almost every engineering device is a **control volume** — a fixed region of space through which matter streams. The Reynolds transport theorem is the translation device between the two, and once you can use it, the forces on pipe bends, the thrust of a rocket, the power of a wind turbine and the head a pump generates all become one calculation done four times.

The reason the theorem is worth the abstraction is that it lets you get an answer **without solving the flow**. The force on a pipe bend does not require the pressure field inside the bend, the thrust of a rocket does not require the combustion chemistry, and the Betz limit of a wind turbine does not require a blade. **You need only what crosses the boundary** — and the boundary is where you get to choose what you know.

::: warning Seven control-volume errors that give confident wrong answers
**Forgetting the pressure forces.** The momentum equation's left-hand side is the **sum of all forces on the fluid in the control volume**, and the pressure acting on every cut face is one of them. A nozzle's anchoring force is dominated by $p_1 A_1$, not by the momentum flux: for a $100\ \mathrm{mm}$ to $25\ \mathrm{mm}$ nozzle at $0.02\ \mathrm{m^{3} / s}$ the pressure term is $6{,}490\ \mathrm{N}$ and the momentum term $760\ \mathrm{N}$, and a calculation that keeps only the second is wrong by a factor of eight and in the **wrong direction**. **Always draw the pressure on the cut faces, always in gauge terms.** **Using absolute velocity in a moving control volume.** For a control volume moving at $\mathbf{V}_{cv}$ the flux term carries the **relative** velocity $\mathbf{W} = \mathbf{V} - \mathbf{V}_{cv}$ in $\rho\, \mathbf{V} \cdot \mathbf{n}$ and in the momentum carried, and every turbine, compressor, water jet and rocket problem turns on this. A Pelton bucket's force is $\dot{m} \left( W_1 - W_2 \cos \beta \right)$ with $\dot{m} = \rho A \left( V - u \right)$, and using $V$ instead of $V - u$ overstates the force by $V / \left( V - u \right)$ — at $u = 0.45\ V$ that is a factor of $1.8$. **Applying the equation to a control volume whose contents are accelerating.** The form $\sum \mathbf{F} = \oint \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) dA$ holds only for an **inertial** control volume. For an accelerating one the correct right-hand side is $\sum \mathbf{F} - \int_{CV} \rho \mathbf{a}_{cv}\, dV$, and a water-tank on a braking lorry analysed without the correction gives a surge force wrong by the whole of $m a$. **Using a uniform-profile momentum flux when the profile is not uniform.** The flux is $\int \rho u^{2} dA$ and **not** $\rho V_{\mathrm{mean}}^{2} A$; the ratio is the momentum-flux correction factor $\beta$, which is $1.005$ to $1.05$ for turbulent pipe flow and **exactly $4 / 3$ for laminar flow**. A laminar-duct momentum balance done with $\beta = 1$ is wrong by $33\ \%$, and the same factor appears as the kinetic-energy correction $\alpha$ — $2.0$ for laminar flow. **Mixing up the force on the fluid with the force on the structure.** Newton's third law is the whole difference, and the sign convention must be stated once and kept. The standard practice is to write the equation for the **fluid**, obtain $\mathbf{F}_{\mathrm{on\ fluid}}$, and reverse it — and a calculation that reverses twice reports a bend pushing itself. **Choosing a control volume that cuts a surface you cannot evaluate.** If the control surface cuts a jet of unknown pressure, that pressure is atmospheric and the term vanishes; if it cuts a pipe, the pressure is unknown and must come from Bernoulli or continuity; if it cuts a **wake**, the pressure is nearly atmospheric but the velocity profile must be integrated. **The choice of control surface is the whole of the skill**, and the classic mistake is to cut a region where the pressure is neither known nor measurable and then discover the answer depends on it. **Treating a variable-mass body as a system.** A rocket loses mass, and $\sum \mathbf{F} = m \mathbf{a}$ is **wrong** for it; the correct statement is $m\, d\mathbf{V} / dt = \dot{m} \mathbf{V}_e + \sum \mathbf{F}_{\mathrm{ext}}$ with $\dot{m} < 0$, and the classic error — differentiating $m \mathbf{V}$ and getting a spurious $\mathbf{V}\, dm / dt$ — is the reason the rocket equation is derived from a control volume and not from Newton's second law.
:::

## The Reynolds transport theorem

::: definition The theorem {#def-rtt}
**For any extensive property** $N$ with intensive counterpart $\eta = d N / d m$:
$$
\boxed{ \left( \frac{d N}{d t} \right)_{\mathrm{sys}}
= \frac{\partial}{\partial t} \int_{CV} \eta \rho\, dV
+ \oint_{CS} \eta \rho \left( \mathbf{V} \cdot \mathbf{n} \right) d A }
$$
**The two terms** are the **unsteady accumulation** inside the control volume and the **net efflux** across its surface, with $\mathbf{n}$ the outward normal. The theorem says: *the rate at which the system's property changes equals the rate at which it accumulates in the region plus the rate at which it leaves the region* — and the system and the control volume coincide at the instant considered.
**The three specialisations.**
$$
\begin{array}{l c l}
N = m,\ \eta = 1 & 0 = \partial_t \int \rho dV + \oint \rho \mathbf{V} \cdot \mathbf{n}\, dA & \text{mass conservation} \\
N = m \mathbf{V},\ \eta = \mathbf{V} & \sum \mathbf{F} = \partial_t \int \rho \mathbf{V} dV + \oint \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) dA & \text{linear momentum} \\
N = m \left( \mathbf{r} \times \mathbf{V} \right),\ \eta = \mathbf{r} \times \mathbf{V} & \sum \mathbf{M} = \partial_t \int \rho \left( \mathbf{r} \times \mathbf{V} \right) dV + \oint \rho \left( \mathbf{r} \times \mathbf{V} \right) \left( \mathbf{V} \cdot \mathbf{n} \right) dA & \text{angular momentum}
\end{array}
$$
**The moving control volume.** With $\mathbf{W} = \mathbf{V} - \mathbf{V}_{cv}$ the velocity **relative to the surface**, every occurrence of $\mathbf{V} \cdot \mathbf{n}$ in a flux becomes $\mathbf{W} \cdot \mathbf{n}$:
$$
0 = \partial_t \int_{CV} \rho\, dV + \oint_{CS} \rho\, \mathbf{W} \cdot \mathbf{n}\, dA
$$
**but the momentum carried across is still $\mathbf{V} \left( \rho\, \mathbf{W} \cdot \mathbf{n} \right)$ — absolute velocity in the numerator, relative in the flux.** **This single asymmetry is the most common error in turbomachinery**, and it is the reason a compressor's Euler work is written $\Delta \left( U V_{\theta} \right)$ and not $\Delta \left( W_{\theta}^{2} / 2 \right)$.
**The fixed, non-deforming control volume at steady state** reduces everything to
$$
\sum \mathbf{F} = \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
\quad \text{with} \quad
\oint \rho\, \mathbf{V} \cdot \mathbf{n}\, dA = 0
$$
and at a one-dimensional inlet or outlet $\oint \rho u^{2} dA = \beta \rho \bar{u}^{2} A$, where
$$
\beta = \frac{1}{A \bar{u}^{2}} \int_A u^{2} dA, \qquad
\alpha = \frac{1}{A \bar{u}^{3}} \int_A u^{3} dA
$$
**The values that must be memorised.**
$$
\begin{array}{l c c}
\text{Profile} & \beta & \alpha \\
\text{Uniform} & 1.000 & 1.000 \\
\text{Turbulent pipe, } u / U_c = \left( 1 - r / R \right)^{1 / 7} & 1.020 & 1.063 \\
\text{Fully rough, } u / u_* = 2.5 \ln \left( y / y_0 \right) & 1.03 \text{ to } 1.05 & 1.08 \text{ to } 1.12 \\
\text{Laminar pipe, } u = U_{\max} \left( 1 - r^{2} / R^{2} \right) & 4 / 3 = 1.333 & 2.000
\end{array}
$$
**The number that makes the factor worth knowing.** In a laminar microchannel's momentum balance the $\beta = 4 / 3$ correction is **larger than most of the pressure drops being added up**, and in a fully developed turbulent pipe it is $2\ \%$ — which is smaller than the uncertainty in $\rho$, which is why every pipe-flow textbook sets $\beta = 1$ and every microfluidics one does not.
:::

::: definition The linear momentum equation in practice {#def-linear}
**The recipe, in the order it must be done.**
$$
\begin{array}{l l}
1 & \text{Draw the control volume; cut every inlet and outlet normal to the flow} \\
2 & \text{Get the velocities from continuity, and the pressures from Bernoulli where possible} \\
3 & \text{Draw ALL forces: pressure on every cut face (in gauge), the anchoring force, weight} \\
4 & \text{Write the flux term with the correct sign: } \rho \left( \mathbf{V} \cdot \mathbf{n} \right) \mathbf{V}, \text{ outward normal} \\
5 & \text{Solve; reverse the sign to get the force on the structure}
\end{array}
$$
**The one-dimensional $x$-component:**
$$
\sum F_x = \sum_{\mathrm{out}} \beta \rho \dot{Q} u - \sum_{\mathrm{in}} \beta \rho \dot{Q} u
$$
**The worked case: a $180^{\circ}$ return bend.** A bend of constant diameter $D = 100\ \mathrm{mm}$ carrying $V = 6\ \mathrm{m / s}$ of water at a gauge pressure of $200\ \mathrm{kPa}$, with the two legs $h = 0.4\ \mathrm{m}$ apart:
$$
A = \frac{\pi}{4} \times 0.1^{2} = 7.854 \times 10^{- 3}\ \mathrm{m^{2}}, \qquad
\dot{Q} = 0.04712\ \mathrm{m^{3} / s}
$$
By Bernoulli the pressure is the same at both ends (same elevation, same speed), so
$$
F_x = - \left( \rho \dot{Q} \left( - V \right) - \rho \dot{Q} \left( + V \right) \right) = 2 \rho \dot{Q} V = 2 \times 1{,}000 \times 0.04712 \times 6 = 565\ \mathrm{N}
$$
and the pressure pushes on **both** cut faces in the same direction:
$$
F_{p} = 2 p A = 2 \times 200{,}000 \times 7.854 \times 10^{- 3} = 3{,}142\ \mathrm{N}
$$
$$
\boxed{ F_{\mathrm{anchor}} = F_p + F_{\mathrm{mom}} = 3{,}142 + 565 = 3{,}707\ \mathrm{N}\ \text{in the direction of the inlet flow} }
$$
**The pressure term is $85\ \%$ of the load**, and the fact that it vanishes if the system is depressurised is the reason a pipe bend's thrust block is designed for the **hydrostatic** test pressure and not for the operating flow.
**The worked case: a reducing bend in a horizontal plane.** Water enters a $45^{\circ}$ reducing bend at section 1 with $D_1 = 200\ \mathrm{mm}$, $p_1 = 300\ \mathrm{kPa}$, $V_1 = 3\ \mathrm{m / s}$ and leaves at section 2 with $D_2 = 100\ \mathrm{mm}$:
$$
\dot{Q} = \frac{\pi}{4} \times 0.2^{2} \times 3 = 0.09425\ \mathrm{m^{3} / s}, \qquad
V_2 = \frac{0.09425}{7.854 \times 10^{- 3}} = 12.0\ \mathrm{m / s}
$$
$$
p_2 = p_1 - \tfrac{1}{2} \rho \left( V_2^{2} - V_1^{2} \right) = 300{,}000 - 500 \times \left( 144 - 9 \right) = 232.5\ \mathrm{kPa}
$$
With $x$ along the inlet and $y$ across, $u_1 = 3$, $u_2 = 12 \cos 45^{\circ} = 8.485$, $v_2 = 8.485$:
$$
F_x = \rho \dot{Q} \left( u_2 - u_1 \right) - p_1 A_1 + p_2 A_2 \cos 45^{\circ}
= 1{,}000 \times 0.09425 \times 5.485 - 300{,}000 \times 0.03142 + 232{,}500 \times 0.007854 \times 0.707
$$
$$
F_x = 517 - 9{,}425 + 1{,}292 = - 7{,}616\ \mathrm{N}
$$
$$
F_y = \rho \dot{Q} v_2 - p_2 A_2 \sin 45^{\circ} = 800 - 1{,}292 = - 492\ \mathrm{N}
$$
$$
F = \sqrt{7{,}616^{2} + 492^{2}} = 7{,}632\ \mathrm{N}, \qquad
\theta = 180^{\circ} + 3.7^{\circ}
$$
**The pressure terms contribute $- 8{,}133\ \mathrm{N}$ and the momentum flux $+ 517\ \mathrm{N}$** — the anchor is a **pressure** problem with a momentum correction, and the fact that $F_y$ is dominated by the outlet pressure's component is why a bend's thrust block is placed at the **mitre**.
:::

::: widget plot
f: 4*x*(1-x)^2; 2*(1-x)/3
x: 0, 1
y: 0, 0.85
labels: Cp = 4a(1-a)^2; CT/3 = 2(1-a)/3
caption: The actuator-disk power coefficient $C_P = 4 a \left( 1 - a \right)^2$ against the axial induction factor $a$, where the disk slows the flow from $V$ to $V(1-a)$ and the wake ultimately reaches $V(1-2a)$. The maximum is at $a = 1 / 3$ with $C_P = 16 / 27 = 0.593$ — the **Betz limit** of **1920**, derived from one-dimensional momentum and continuity alone and independent of the number, shape or material of the blades. The straight line is one third of the **thrust** coefficient, $C_T / 3 = 2 \left( 1 - a \right) / 3$, plotted so that the two curves share an axis; at the Betz optimum $C_T = 4 / 3$, and the fact that a turbine running at that point carries **one and a third times the gross dynamic-pressure load on its entire swept area** — $222\ \mathrm{kN}$ on a $60\ \mathrm{m}$ rotor at $12\ \mathrm{m / s}$ — is the reason a three-blade rotor's root bending moment is set by thrust and not by power. **Above $a > 0.5$ the momentum theory breaks down** because the wake becomes turbulent and the simple pressure recovery no longer holds; the measured curve falls away and the empirical correction of **Glauert** is needed.
:::

## Moving control volumes

::: definition Jets on vanes and blades {#def-vanes}
**A jet of area $A$ and speed $V$ striking a flat plate normal to its axis.** With the plate **fixed**:
$$
F = \rho A V^{2} = \dot{m} V
$$
**With the plate moving away at speed $u$**, the mass actually intercepted is $\rho A \left( V - u \right)$ and the jet's velocity relative to the plate is brought from $V - u$ to zero:
$$
F = \rho A \left( V - u \right)^{2}, \qquad P = F u = \rho A u \left( V - u \right)^{2}
$$
**The maximum power** is at $u = V / 3$ with $P_{\max} = 4 \rho A V^{3} / 27 = 0.148\ \rho A V^{3}$ — **$29.6\%$ of the jet's own power $\tfrac{1}{2}\rho A V^{3}$**, because the plate's wake still carries most of the kinetic energy away.
**A jet on a curved vane that turns it through an angle $\theta$** (measuring the exit relative velocity's component against the direction of motion):
$$
\boxed{ F_x = \rho A \left( V - u \right)^{2} \left( 1 - \cos \theta \right) }
\qquad
\eta = \frac{F_x u}{\tfrac{1}{2} \rho A V^{3}} = \left( 1 - \cos \theta \right) \frac{u}{V} \left( 1 - \frac{u}{V} \right)^{2} \Big/ \tfrac{1}{2}
$$
**The optimum speed ratio.** Writing $\beta_2$ for the angle of the **relative** exit velocity measured from the direction of motion, so that a flat plate has $\beta_2 = 90^{\circ}$ and a semicircular bucket $\beta_2 = 180^{\circ}$, the efficiency against the **jet's** power is
$$
\eta = 2 \frac{u}{V} \left( 1 - \frac{u}{V} \right)^{2} \left( 1 - \cos \beta_2 \right)
$$
which is maximised at $u / V = 1 / 3$ for **any** $\beta_2$, with
$$
\eta_{\max} = \frac{8}{27} \left( 1 - \cos \beta_2 \right)
= 0.296 \quad \left( \text{flat plate} \right), \qquad
0.593 \quad \left( \text{semicircular bucket} \right)
$$
**The number that is usually quoted and usually misquoted.** Pelton-wheel texts quote $\eta_{\max} \approx 0.98$ because they divide by the **intercepted** jet power $\tfrac{1}{2} \rho A \left( V - u \right) V^{2}$ and not by the jet's own power $\tfrac{1}{2} \rho A V^{3}$, which removes one factor of $\left( 1 - u / V \right)$ and turns $2 x \left( 1 - x \right)^{2}$ into $2 x \left( 1 - x \right)$ — a parabola whose maximum is at $x = 1 / 2$ with
$$
\eta_{\mathrm{intercepted}, \max} = \tfrac{1}{2} \left( 1 - \cos \beta_2 \right) = 0.983 \quad \text{for} \quad \beta_2 = 165^{\circ}
$$
**Both conventions are in the literature, they differ by $44\%$ at the design point, and neither is wrong; state which one you are using.** The practical consequence is that a runner quoted at "$92\%$ efficiency" on the intercepted basis is at $0.92 \times \left( 1 - 0.46 \right) = 0.50$ on the jet basis, and a hydraulic-efficiency guarantee written without the definition is unenforceable.
**The worked Pelton case.** A jet of $d = 100\ \mathrm{mm}$ at $V = 100\ \mathrm{m / s}$ on buckets with $\beta_2 = 165^{\circ}$ running at $u = 45\ \mathrm{m / s}$:
$$
\dot{m} = \rho A \left( V - u \right) = 1{,}000 \times 7.854 \times 10^{- 3} \times 55 = 432\ \mathrm{kg / s}
$$
$$
F = 432 \times 55 \times \left( 1 - \cos 165^{\circ} \right) = 432 \times 55 \times 1.966 = 46{,}700\ \mathrm{N}
$$
$$
P = F u = 46{,}700 \times 45 = 2.10\ \mathrm{MW}, \qquad
\eta = \frac{2.10 \times 10^{6}}{\tfrac{1}{2} \times 1{,}000 \times 7.854 \times 10^{- 3} \times 100^{3}} = \frac{2.10 \times 10^{6}}{3.927 \times 10^{6}} = 0.535
$$
**against the $\eta_{\max} = \left( 1 + \cos 165^{\circ} \right) / 2 = 0.983$** — the shortfall is entirely because $u / V = 0.45$ and not $0.50$, and the reason real Pelton wheels run at $u / V = 0.46$ and reach $\eta = 0.90$ is that the jet must be **cut** by the following bucket's splitter, which costs a little of the ideal.
**The number that makes a Pelton wheel's bearing design hard.** The force $46.7\ \mathrm{kN}$ is applied at the **pitch-circle radius** and the shaft carries it as a **radial** load that reverses as each bucket passes the jet — a $2\ \mathrm{Hz}$ alternating load on a $300\ \mathrm{rpm}$ shaft, and the reason Pelton bearings are sized on fatigue and not on the mean.
:::

::: definition Rockets and variable mass {#def-rocket}
**The thrust of a rocket**, from a control volume around the engine:
$$
\boxed{ T = \dot{m} V_e + \left( p_e - p_a \right) A_e }
$$
**The two terms** are the **momentum thrust** and the **pressure thrust**. At the **optimum altitude** $p_e = p_a$ and the second vanishes; below it the nozzle is **underexpanded** and the second term is positive; above it **overexpanded** and negative, until separation makes it unpredictable.
**The worked case.** $\dot{m} = 2{,}500\ \mathrm{kg / s}$, $V_e = 2{,}500\ \mathrm{m / s}$, $p_e = 0.70\ \mathrm{MPa}$, $p_a = 0.025\ \mathrm{MPa}$, $A_e = 1.5\ \mathrm{m^{2}}$:
$$
T = 2{,}500 \times 2{,}500 + \left( 0.70 - 0.025 \right) \times 10^{6} \times 1.5
= 6.25 \times 10^{6} + 1.013 \times 10^{6} = 7.26\ \mathrm{MN}
$$
**The pressure term is $14\ \%$ of the thrust**, and the fact that it grows with altitude until $p_e = p_a$ is the whole of the reason a nozzle's exit area is chosen for the **middle** of the trajectory and not the end.
**The effective exhaust velocity and the specific impulse.**
$$
c \equiv \frac{T}{\dot{m}} = V_e + \frac{\left( p_e - p_a \right) A_e}{\dot{m}}
\qquad
I_{sp} = \frac{c}{g_0}
$$
For the case above $c = 2{,}904\ \mathrm{m / s}$ and $I_{sp} = 296\ \mathrm{s}$ — a solid booster. A hydrogen–oxygen engine reaches $c = 4{,}420\ \mathrm{m / s}$, $I_{sp} = 451\ \mathrm{s}$.
**The equation of motion.** With no external force, $m\, dV = - c\, dm$:
$$
\boxed{ \Delta V = c \ln \frac{m_0}{m_1} } \qquad \text{(Tsiolkovsky, 1903)}
$$
**The mass ratio that a single stage can carry.** For $\Delta V = 9{,}400\ \mathrm{m / s}$ to orbit and $c = 3{,}000\ \mathrm{m / s}$:
$$
\frac{m_0}{m_1} = e^{9{,}400 / 3{,}000} = 23.1
$$
**which requires a structural fraction below $4\ \%$ and is impossible**, which is the whole of the reason rockets are staged. With two stages each at a mass ratio of $\sqrt{23.1} = 4.8$ and a $6\ \%$ structure, the payload fraction is $4\ \%$ — the number that makes a launch vehicle's economics.
**The number that makes the pressure term a design driver.** At sea level a vacuum-optimised nozzle is **overexpanded** and its pressure term is **negative**; the Space Shuttle's solid boosters lost $12\ \%$ of their vacuum thrust at sea level to it, and the reason a nozzle's expansion ratio is $25$ and not $80$ is the $12\ \%$, not the mass of the extension.
:::

::: definition Angular momentum and the turbomachine equation {#def-angular}
**The moment-of-momentum equation** for a steady control volume:
$$
\sum \mathbf{M} = \oint_{CS} \rho \left( \mathbf{r} \times \mathbf{V} \right) \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**For a machine with axial inflow and outflow**, only the tangential velocity $V_{\theta}$ carries moment of momentum, and the **shaft torque** is
$$
T_{\mathrm{shaft}} = \dot{m} \left( r_2 V_{\theta 2} - r_1 V_{\theta 1} \right)
$$
**The Euler turbomachine equation.** The **specific work** is
$$
\boxed{ w = U_2 V_{\theta 2} - U_1 V_{\theta 1} }
\qquad \text{and for a pump,} \qquad
H_{\mathrm{Euler}} = \frac{U_2 V_{\theta 2} - U_1 V_{\theta 1}}{g}
$$
**The velocity triangle.** With the blade speed $U = \Omega r$, the relative velocity $W$ and the absolute velocity $\mathbf{V} = \mathbf{W} + \mathbf{U}$:
$$
V_{\theta} = U - W_{\theta} = U - \frac{V_r}{\tan \beta}
$$
**The worked radial pump.** $D_2 = 0.30\ \mathrm{m}$, $N = 1{,}450\ \mathrm{rpm}$, exit width $b_2 = 20\ \mathrm{mm}$, blade angle $\beta_2 = 25^{\circ}$ from the tangential direction, $\dot{Q} = 0.05\ \mathrm{m^{3} / s}$, no inlet whirl:
$$
U_2 = \frac{\pi \times 0.30 \times 1450}{60} = 22.78\ \mathrm{m / s}, \qquad
A_2 = \pi D_2 b_2 = 0.01885\ \mathrm{m^{2}}
$$
$$
V_{r 2} = \frac{\dot{Q}}{A_2} = \frac{0.05}{0.01885} = 2.653\ \mathrm{m / s}, \qquad
V_{\theta 2} = U_2 - \frac{V_{r 2}}{\tan \beta_2} = 22.78 - \frac{2.653}{0.4663} = 17.09\ \mathrm{m / s}
$$
$$
\boxed{ H_{\mathrm{Euler}} = \frac{U_2 V_{\theta 2}}{g} = \frac{22.78 \times 17.09}{9.81} = 39.7\ \mathrm{m} }
\qquad
P = \rho g \dot{Q} H = 1{,}000 \times 9.81 \times 0.05 \times 39.7 = 19.5\ \mathrm{kW}
$$
**The number that makes the Euler equation only half the story.** The **slip factor** $\sigma$ accounts for the fact that the fluid does not quite follow the blade's exit angle — a finite number of blades leaves the flow **slipped back** — and the **Stodala** estimate
$$
\sigma = 1 - \frac{\pi \sin \beta_2}{Z}
$$
with $Z = 7$ blades gives $\sigma = 1 - \pi \times 0.4226 / 7 = 0.810$, so the **actual** head is $0.810 \times 39.7 = 32.2\ \mathrm{m}$. **A nineteen per cent loss from a purely kinematic cause**, and the reason a pump's blade count is seven or five and never twelve: more blades raise $\sigma$ but increase the blockage and the friction, and the optimum is a genuine compromise.
**The reaction.** The fraction of the head developed by **diffusion** in the rotor rather than by centrifugal action:
$$
R = 1 - \frac{V_{\theta 2}}{2 U_2} = 1 - \frac{17.09}{45.56} = 0.625
$$
**so $62.5\ \%$ of the pressure rise happens inside the impeller** — which is why a radial pump's thrust balance and its wear-ring clearances are as important as its hydraulics.
:::

## Worked cases

::: example Anchoring a nozzle {#ex-nozzle}
A fire-hose nozzle reduces from $100\ \mathrm{mm}$ to $25\ \mathrm{mm}$ and delivers $0.020\ \mathrm{m^{3} / s}$ of water. Find the pressure at the flange and the force the threads must carry.
::: solution
**The velocities.**
$$
A_1 = 7.854 \times 10^{- 3}\ \mathrm{m^{2}}, \quad A_2 = 4.909 \times 10^{- 4}\ \mathrm{m^{2}}, \qquad
V_1 = 2.546, \quad V_2 = 40.74\ \mathrm{m / s}
$$
**The flange pressure**, from Bernoulli between the flange and the free jet (where $p_2 = 0$ gauge):
$$
p_1 = \tfrac{1}{2} \rho \left( V_2^{2} - V_1^{2} \right) = 500 \times \left( 1{,}659.7 - 6.5 \right) = 826.6\ \mathrm{kPa}
$$
**The momentum equation** in the flow direction, with $F_x$ the force of the **bolts and hose** on the fluid:
$$
F_x + p_1 A_1 - p_2 A_2 = \rho \dot{Q} \left( V_2 - V_1 \right)
$$
$$
F_x = 1{,}000 \times 0.020 \times \left( 40.74 - 2.546 \right) - 826{,}600 \times 7.854 \times 10^{- 3} + 0
$$
$$
F_x = 763.9 - 6{,}492 = - 5{,}728\ \mathrm{N}
$$
$$
\boxed{ F_{\mathrm{threads}} = 5{,}728\ \mathrm{N}\ \text{tending to pull the nozzle off the hose} }
$$
**The reading.** The momentum flux contributes $+ 764\ \mathrm{N}$ and the flange pressure $- 6{,}492\ \mathrm{N}$, so **the nozzle is pushed backwards by the pressure inside it** and the threads carry $5.7\ \mathrm{kN}$ — the reason a fireman braces against the nozzle and not with it, and the reason a $2\ \mathrm{bar}$ hose with a $25\ \mathrm{mm}$ branch is a two-handed tool.
**The number that makes a fire monitor need a swivel restraint.** A $5{,}728\ \mathrm{N}$ reaction at the end of a $0.6\ \mathrm{m}$ monitor gives a $3.4\ \mathrm{kN\, m}$ overturning moment, and the reason a monitor's pedestal is designed for the **worst-case** angle rather than the horizontal one is that the reaction is **always along the jet**, so the moment is maximum when the jet is horizontal and the pedestal is only checked in that position.
**The check against the jet's own momentum.** The jet carries $\rho \dot{Q} V_2 = 1{,}000 \times 0.020 \times 40.74 = 815\ \mathrm{N}$, and the reaction is **seven times** that. **The difference is the pressure force on the converging wall**, and the fact that a nozzle's reaction exceeds its jet momentum flux by a factor of several is the single most counter-intuitive result in hydraulics — and the reason a **free** jet hitting a wall exerts $\rho Q V$ while the **nozzle that produced it** is pushed the other way by $\rho Q (V_2 - V_1) + p_1 A_1$.
*Sanity.* The reason $p_2 = 0$ is legitimate is that the jet discharges to atmosphere and its streamlines are straight at the exit; if the exit were **submerged** the pressure there would be the hydrostatic value and the whole calculation would shift by $p_2 A_2 = 4.9 \times 10^{- 4} p_2$, which at $10\ \mathrm{m}$ depth is $4.9\ \mathrm{kN}$ — comparable to the answer. **Submerged nozzles must be computed with the ambient pressure included, and the difference is not a correction.**
:::
:::

::: example A wind turbine's Betz limit {#ex-betz}
A horizontal-axis wind turbine of $60\ \mathrm{m}$ rotor diameter operates in a $12\ \mathrm{m / s}$ wind at $1.225\ \mathrm{kg / m^{3}}$. Find the available power, the Betz-limit power, the thrust at the optimum, the axial induction factor at which the momentum theory ceases to be valid, and the rotor's solidity requirement.
::: solution
**The available power in the stream.**
$$
A = \frac{\pi}{4} \times 60^{2} = 2{,}827\ \mathrm{m^{2}}, \qquad
P_{\mathrm{avail}} = \tfrac{1}{2} \rho A V^{3} = 0.5 \times 1.225 \times 2{,}827 \times 1{,}728 = 2.99\ \mathrm{MW}
$$
**The Betz-limit power.**
$$
P_{\max} = \frac{16}{27} P_{\mathrm{avail}} = 0.5926 \times 2.99 = 1.77\ \mathrm{MW}
$$
**The optimum induction and the wake.** At $a = 1 / 3$ the rotor's speed is $8\ \mathrm{m / s}$ and the far wake $4\ \mathrm{m / s}$, and the **mass flow through the rotor** is
$$
\dot{m} = \rho A V \left( 1 - a \right) = 1.225 \times 2{,}827 \times 12 \times 0.667 = 27{,}700\ \mathrm{kg / s}
$$
**The thrust.**
$$
T = \dot{m} \times 2 a V = 27{,}700 \times 8 = 221{,}600\ \mathrm{N} = 222\ \mathrm{kN}
$$
**against $1.77\ \mathrm{MW}$ of power** — a thrust-to-power ratio of $125\ \mathrm{N / kW}$, and the reason a turbine's tower and yaw drive are sized on **thrust and gravity** and not on torque.
**The thrust coefficient check.**
$$
C_T = \frac{T}{\tfrac{1}{2} \rho A V^{2}} = \frac{221{,}600}{0.5 \times 1.225 \times 2{,}827 \times 144} = 0.889 \approx \frac{8}{9} \quad \checkmark
$$
**The number that makes the Betz limit unreachable in practice.** The momentum theory assumes the pressure just downstream of the disk recovers to the **ambient** value in the wake, which requires the wake to remain **axisymmetric and steady**. For $a > 0.4$ the wake becomes turbulent and the flow separates from the rotor, and the measured $C_P$ falls below $4 a \left( 1 - a \right)^{2}$ — the **turbulent-wake state** of **Glauert**'s **1935** correction. A practical large rotor achieves $C_P = 0.45$ to $0.50$, so
$$
P_{\mathrm{actual}} \approx 0.47 \times 2.99 = 1.41\ \mathrm{MW}
$$
**and the $20\ \%$ shortfall is not a loss that can be engineered away** — it is the tip loss, the wake rotation and the drag penalty of a finite number of blades.
**The solidity requirement.** Momentum theory gives the **axial** induction but nothing about the rotor; blade-element theory supplies the missing relation, and the requirement that the rotor be able to **turn the flow** without the blades interfering gives
$$
\sigma = \frac{Z c}{\pi R} \approx 0.05 \text{ to } 0.10 \quad \text{for a modern three-blade machine}
$$
For $Z = 3$, $R = 30\ \mathrm{m}$: $c_{\mathrm{mean}} = 0.08 \times \pi \times 30 / 3 = 2.5\ \mathrm{m}$. **A two-and-a-half-metre chord at the mean radius**, and the reason a modern blade's root must carry a $2.5\ \mathrm{m}$ chord **and** a $70\ \mathrm{m}$ spar — the structural and the aerodynamic requirement are in direct conflict at the root, and the resolution is the elliptical tapered planform every modern blade has.
*Sanity.* The reason the Betz limit is $16 / 27$ and not $1$ is that a turbine that **stopped** the flow would pass no flow, and one that extracted **nothing** would extract nothing; the product has an interior maximum. The general rule $P \propto V^{3}$ is the most important number in wind energy: **a site whose mean wind speed is $10\ \%$ higher yields $33\ \%$ more energy**, and the reason a $100\ \mathrm{m}$ taller tower is worth $800{,}000$ of steel is that it buys $8\ \%$ more wind speed and $26\ \%$ more energy.
:::
:::

::: example Drag from a wake survey {#ex-wake}
A flat plate $2.0\ \mathrm{m}$ long and $1.0\ \mathrm{m}$ wide is towed at $2\ \mathrm{m / s}$ in fresh water. A wake survey $200\ \mathrm{mm}$ downstream of the trailing edge finds a velocity defect of the form $U_{\infty} - u = \Delta U_0 \exp \left[ - \left( y / \delta \right)^{2} \right]$ with $\Delta U_0 = 0.42\ \mathrm{m / s}$ and $\delta = 25\ \mathrm{mm}$. Find the drag and compare it with a boundary-layer estimate.
::: solution
**The momentum theorem applied to a stream-tube.** With the control volume bounded by two streamlines a distance $h$ apart and by the upstream and downstream stations, and with $p$ uniform,
$$
D = \int_{- h}^{h} \rho u \left( U_{\infty} - u \right) d y
= \rho \int \frac{u}{U_{\infty}} \left( 1 - \frac{u}{U_{\infty}} \right) U_{\infty}^{2} d y
= \rho U_{\infty}^{2} \theta
$$
where $\theta$ is the **momentum thickness** of the defect.
**The evaluation.** With $u / U_{\infty} = 1 - f$ and $f = \left( \Delta U_0 / U_{\infty} \right) e^{- \eta^{2}}$, $\eta = y / \delta$:
$$
\theta = \int f \left( 1 - f \right) d y
= \delta \int_{- \infty}^{\infty} \left( f_0 e^{- \eta^{2}} - f_0^{2} e^{- 2 \eta^{2}} \right) d \eta
= \delta \left( f_0 \sqrt{\pi} - f_0^{2} \sqrt{\frac{\pi}{2}} \right)
$$
With $f_0 = 0.42 / 2.0 = 0.21$:
$$
\theta = 0.025 \times \left( 0.21 \times 1.7725 - 0.0441 \times 1.2533 \right)
= 0.025 \times \left( 0.3722 - 0.0553 \right) = 7.92 \times 10^{- 3}\ \mathrm{m}
$$
$$
\boxed{ D = 1{,}000 \times 4 \times 7.92 \times 10^{- 3} \times 1.0 = 31.7\ \mathrm{N} }
$$
**The comparison with the boundary-layer estimate.** For a **turbulent** boundary layer over a $2.0\ \mathrm{m}$ plate at $\mathrm{Re}_L = 2 \times 2 \times 10^{6} / 10^{- 6} = 4 \times 10^{6}$:
$$
C_f = \frac{0.074}{\mathrm{Re}_L^{1 / 5}} = \frac{0.074}{24.3} = 0.00305, \qquad
D = C_f \times \tfrac{1}{2} \rho U^{2} \times 2 A_w = 0.00305 \times 2{,}000 \times 4 = 24.4\ \mathrm{N}
$$
**The wake survey gives $30\ \%$ more**, and the difference is the **pressure drag** associated with the finite pressure gradient in the near wake plus the fact that the survey plane is only $200\ \mathrm{mm}$ downstream where the defect has not yet diffused. **A wake survey must be taken far enough downstream that the profile is self-preserving and the pressure is atmospheric**, and the reason the technique is used on wind-tunnel models despite this is that it needs no force balance and no support interference.
**The number that makes the momentum thickness the right variable.** $\theta$ is **independent of the stream-tube's height $h$** provided $h > \delta$, so the drag is obtained from a **local** measurement and does not require the whole field — which is the reason a single hot-wire traverse across a wake gives a drag to $\pm 5\ \%$ while a pressure-integration on the model needs a hundred taps and a support correction.
*Sanity.* The reason the drag is $\rho U_{\infty}^{2} \theta$ and not $\tfrac{1}{2} \rho U_{\infty}^{2} \theta$ is that the momentum flux $\int \rho u (U - u) dy$ contains the **full** $U^2$ and not the dynamic pressure; the $\tfrac{1}{2}$ reappears when the result is written as $C_D = 2 \theta / L$ for a flat plate, and the factor of two is the most common slip in wake-survey work.
:::
:::

::: example A sluice gate and a hydraulic jump {#ex-sluice}
A sluice gate in a horizontal rectangular channel $5\ \mathrm{m}$ wide discharges $12\ \mathrm{m^{3} / s}$ with an upstream depth of $2.0\ \mathrm{m}$. Find the depth and velocity under the gate, the thrust on the gate, and the downstream conjugate depth if a hydraulic jump forms.
::: solution
**The upstream state.**
$$
q = \frac{12}{5} = 2.4\ \mathrm{m^{2} / s}, \qquad
V_1 = \frac{2.4}{2.0} = 1.2\ \mathrm{m / s}, \qquad
\mathrm{Fr}_1 = \frac{1.2}{\sqrt{9.81 \times 2.0}} = 0.086
$$
**The depth under the gate**, taking the specific energy as conserved ($E_1 = 2.0 + 1.2^{2} / 19.62 = 2.073\ \mathrm{m}$) and solving the cubic for the **shallow** root:
$$
E = y_2 + \frac{q^{2}}{2 g y_2^{2}}
\quad \Rightarrow \quad y_2 = 0.246\ \mathrm{m}, \qquad
V_2 = 9.76\ \mathrm{m / s}, \qquad
\mathrm{Fr}_2 = 6.32
$$
**The thrust on the gate**, from the momentum equation between 1 and 2 with the bed friction neglected:
$$
F_{\mathrm{gate}} = \left( \tfrac{1}{2} \rho g y_1^{2} + \rho q V_1 \right) - \left( \tfrac{1}{2} \rho g y_2^{2} + \rho q V_2 \right)
$$
$$
= \left( 19{,}620 + 1{,}440 \right) - \left( 296 + 23{,}420 \right) = 21{,}060 - 23{,}716
$$
$$
\boxed{ F_{\mathrm{gate}} = - 2{,}656\ \mathrm{N\ per\ metre\ width} \times 5\ \mathrm{m} = 13.3\ \mathrm{kN}\ \text{downstream} }
$$
**The number that makes the gate's haul gear oversized.** The **hydrostatic** force on the upstream face alone is $19{,}620 \times 5 / 2 \times 2 = 98\ \mathrm{kN}$ at the gate's full height, and the net $13.3\ \mathrm{kN}$ is the **difference** between two large numbers. **A gate's structure is designed for the static head with the tailwater dry, and its hoist for the dynamic case with the tailwater at the vena contracta** — and the reason a gate that has been lowered into a fast flow cannot be lifted is that the differential is $98\ \mathrm{kN}$ and not $13$.
**The conjugate depth of the jump.** With $\mathrm{Fr}_2 = 6.32$:
$$
\frac{y_3}{y_2} = \frac{1}{2} \left( \sqrt{1 + 8 \mathrm{Fr}_2^{2}} - 1 \right)
= \frac{1}{2} \left( \sqrt{320} - 1 \right) = 8.37
\quad \Rightarrow \quad y_3 = 2.06\ \mathrm{m}
$$
**The head loss across the jump.**
$$
h_L = \frac{\left( y_3 - y_2 \right)^{3}}{4 y_2 y_3} = \frac{1.814^{3}}{4 \times 0.246 \times 2.06} = 2.95\ \mathrm{m}
$$
**against a total head of $2.07\ \mathrm{m}$** — the jump dissipates **more energy than the flow possesses relative to the critical depth**, and the reason this is not a contradiction is that $h_L$ is measured against the **specific energy**, of which only $E - E_c = 2.073 - 0.83 = 1.24\ \mathrm{m}$ is available. **The correct statement is that the jump destroys $1.24\ \mathrm{m}$ of specific energy and leaves the flow with $0.83\ \mathrm{m}$**, and the reason a stilling basin must be $30\ \mathrm{m}$ long is that $1.24\ \mathrm{m} \times 12\ \mathrm{m^{3} / s} \times 9.81 = 146\ \mathrm{kW}$ of turbulence has to go somewhere.
*Sanity.* The reason the momentum function $M = y^{2} / 2 + q^{2} / \left( g y \right)$ is the right tool is that in a horizontal rectangular channel the pressure force per unit weight is exactly $y^{2} / 2$, so $M$ is conserved across anything that has no external force — a jump, a sluice gate's contraction, or a bridge opening. **The conjugate-depth formula is the momentum equation and nothing else**, and the reason it works to a per cent despite the jump being a violently turbulent three-dimensional roller is that the momentum theorem does not care what happens inside the control volume.
:::
:::

::: history
**The transport theorem** is **Reynolds**'s of **1903**, in the *Memoirs of the Manchester Literary and Philosophical Society* — the same paper in which he wrote the decomposition $u = \bar{u} + u'$ that bears his name, and the same journal in which **Dalton** had communicated the atomic theory a century earlier. **Osborne Reynolds** was **32** when he read the paper, and the theorem was a footnote to a discussion of the flow in straight and curved pipes; it took **von Kármán** and **Burgess** in **1916** to notice that the footnote was the foundation of the whole subject. **The rocket equation** is **Tsiolkovsky**'s of **1903**, published in Moscow in a paper titled *The Exploration of Cosmic Space by Means of Reaction Devices*, in which he derived $\Delta V = c \ln \left( m_0 / m_1 \right)$, designed a multistage vehicle, and proposed a space station with a rotating rim — all in **Kaluga**, a provincial town where he was a schoolteacher of mathematics and **blind in one eye from a childhood accident**. **Robert Goddard** independently derived it in **1919** and flew the first liquid rocket at **Auburn, Massachusetts, on 16 March 1926**. **The Betz limit** was derived by **Albert Betz** in **1920** in a three-page note to the *Zeitschrift für das gesamte Maschinenwesen*; the same result had been obtained independently by **Zabrowsky** in **1919** in Russia and by **Schelhaneiko** in **1916**, and the reason Betz's name is attached is that he was the only one who published in a journal an engineer would read. **The actuator disk** itself is **Rankine**'s **1865** application of momentum to a screw propeller, and **Froude**'s **1889** momentum theory of the propeller disc is the same calculation with the slipstream's rotation included. **The Euler turbomachine equation** is **Euler**'s of **1754**, written for a water wheel, and it remains the only equation in turbomachinery that is exactly true.
:::

::: quiz
A rocket in vacuum expels gas at speed $c$ relative to the nozzle at mass flow $\dot m$. That the thrust is $\dot m c$ independently of the rocket's own speed follows from:

- [ ] The exhaust speed being fixed by the nozzle geometry
- [x] Applying the Reynolds transport theorem to a control volume moving with the rocket, on which the velocity crossing the control surface is the *relative* velocity, so the rocket's own speed never enters the momentum flux
- [ ] There being no air to push against
- [ ] The pressure terms cancelling at the exit plane

::: solution
**The control volume moves with the rocket.** In the theorem $\sum \mathbf{F} = \frac{ \partial }{ \partial t } \int_{\mathrm{CV} } \rho \mathbf{V } \, d \mathcal{V } + \int_{\mathrm{CS} } \mathbf{V } \, \rho ( \mathbf{V }_{\mathrm{rel} } \cdot \hat{ \mathbf{n} } ) \, d A$ for an inertial CV, and for an accelerating CV a fictitious-force term appears; either way the flux is carried by the velocity *relative to the surface*, and the uniform translation of the whole assembly contributes nothing to a net flux. **The folk explanation — that a rocket pushes against its exhaust, or against the ground, or against the air — is wrong in every version, and the standard demonstration that a rocket works better in vacuum is not quite true either: the thrust is actually $\dot m c + ( p_e - p_a ) A_e$, so a rocket at sea level produces slightly *more* thrust than in vacuum and is less efficient only because $c$ is lower when the nozzle is not expanded.** The lesson is that the control volume is not a description of what is happening; it is a bookkeeping choice, and getting the choice right is the whole of the analysis.
:::
:::

## Where this leads

The momentum equation with a pressure gradient and a viscous wall stress becomes [[fluid-mechanics/navier-stokes]]; the same equation integrated across a boundary layer becomes [[fluid-mechanics/boundary-layers-drag]]'s momentum-integral method; the energy equation that accompanies it is [[fluid-mechanics/bernoulli]] and [[thermodynamics/first-law-open]]; the angular-momentum form is the whole of [[aerodynamics]]'s propeller theory and [[propulsion]]'s turbomachinery; and the control-volume discretisation of these three integrals is the definition of a finite-volume cell in [[computational-fluid-dynamics]].

::: summary
- The Reynolds transport theorem converts a system law into a control-volume law: accumulation plus net efflux.
- For a moving control volume the **flux** uses the relative velocity and the **carried momentum** uses the absolute one.
- Pressure forces on the cut faces are usually the dominant term in an anchoring force, and they must be written in gauge form.
- The momentum-flux correction factor is $1.02$ for turbulent pipe flow and $4/3$ for laminar.
- A jet on a vane gives $F = \rho A (V-u)^2 (1-\cos\theta)$; a Pelton bucket's optimum is $u/V = 1/2$.
- Thrust is $\dot m V_e + (p_e - p_a) A_e$, and the rocket equation $\Delta V = c \ln(m_0/m_1)$ follows from a control volume and not from $F = ma$.
- $w = U_2 V_{\theta 2} - U_1 V_{\theta 1}$ is exactly true for any turbomachine; everything else — slip, reaction, losses — is a correction to it.
- A wake survey gives drag from $\rho U_\infty^2 \theta$ without a force balance, because the momentum theorem does not care what happens inside the control volume.
:::

## Exercises

::: exercise Return bend {level=1 check="3707"}
Give the anchoring force in newtons for a $180^{\circ}$ return bend of $100\ \mathrm{mm}$ diameter carrying water at $6\ \mathrm{m/s}$ and $200\ \mathrm{kPa}$ gauge.
::: solution
$F = 2pA + 2\rho \dot Q V = 2 \times 200{,}000 \times 7.854 \times 10^{-3} + 2 \times 1{,}000 \times 0.04712 \times 6 = 3{,}142 + 565 = 3{,}707\ \mathrm{N}$.
:::
:::

::: exercise Nozzle reaction {level=1 check="5728"}
Give the force in newtons that the threads of the $100\ \mathrm{mm}$ to $25\ \mathrm{mm}$ fire nozzle must carry at $0.020\ \mathrm{m^{3}/s}$.
::: solution
$F = p_1 A_1 - \rho \dot Q (V_2 - V_1) = 6{,}492 - 764 = 5{,}728\ \mathrm{N}$.
:::
:::

::: exercise Momentum flux factor {level=1 check="1.333"}
Give the momentum-flux correction factor $\beta$ for fully developed laminar pipe flow.
::: solution
$\beta = \frac{1}{A \bar u^2} \int u^2 dA = 4/3 = 1.333$.
:::
:::

::: exercise Pelton optimum {level=1 check="0.5"}
Give the ratio $u/V$ at which a Pelton bucket of $180^{\circ}$ turn delivers maximum power.
::: solution
$\eta = 2 (u/V)(1 - u/V)$ for a semicircular bucket, whose maximum is at $u/V = 1/2$.
:::
:::

::: exercise Rocket thrust {level=1 check="7.26"}
Give the thrust in meganewtons for $\dot m = 2{,}500\ \mathrm{kg/s}$, $V_e = 2{,}500\ \mathrm{m/s}$, $p_e = 0.70\ \mathrm{MPa}$, $p_a = 0.025\ \mathrm{MPa}$, $A_e = 1.5\ \mathrm{m^{2}}$.
::: solution
$T = 6.25 + 1.013 = 7.26\ \mathrm{MN}$.
:::
:::

::: exercise Betz {level=1 check="0.593"}
Give the maximum power coefficient of an actuator disk.
::: solution
$C_P = 4a(1-a)^2$ is maximised at $a = 1/3$ with $C_P = 16/27 = 0.593$.
:::
:::

::: exercise Euler head {level=1 check="39.7"}
Give the Euler head in metres for a radial pump with $U_2 = 22.78\ \mathrm{m/s}$, $V_{\theta 2} = 17.09\ \mathrm{m/s}$ and no inlet whirl.
::: solution
$H = U_2 V_{\theta 2} / g = 22.78 \times 17.09 / 9.81 = 39.7\ \mathrm{m}$.
:::
:::

::: exercise Slip factor {level=2}
A radial pump has seven blades and an exit blade angle of $25^{\circ}$. Give the Stodala slip factor and the resulting head if the Euler head is $39.7\ \mathrm{m}$.
::: solution
$$
\sigma = 1 - \frac{\pi \sin \beta_2}{Z} = 1 - \frac{\pi \times 0.4226}{7} = 0.810, \qquad
H = 0.810 \times 39.7 = 32.2\ \mathrm{m}
$$
**The reading.** A nineteen per cent loss from a purely kinematic cause, and the reason a pump's blade count is a compromise between slip and blockage. With $Z = 12$, $\sigma = 0.889$ and $H = 35.3\ \mathrm{m}$ — better — but the twelve blades leave less room for the boundary layers on their suction sides and the pump's efficiency falls.
:::
:::

::: exercise Moving plate {level=2}
A jet of $30\ \mathrm{m / s}$ and $50\ \mathrm{mm}$ diameter strikes a flat plate moving away at $10\ \mathrm{m / s}$. Give the force and the power delivered.
::: solution
$$
F = \rho A \left( V - u \right)^{2} = 1{,}000 \times 1.963 \times 10^{- 3} \times 400 = 785\ \mathrm{N}, \qquad
P = F u = 7{,}850\ \mathrm{W}
$$
**The jet's own power is** $\tfrac{1}{2} \rho A V^{3} = 26.5\ \mathrm{kW}$, so the efficiency on the jet basis is $7.85 / 26.5 = 0.296$. **The power actually intercepted by the plate** is $\tfrac{1}{2} \rho A \left( V - u \right) V^{2} = 17.7\ \mathrm{kW}$, giving $7.85 / 17.7 = 0.444$ on the intercepted basis — against a theoretical maximum of $0.500$ for a flat plate at $u / V = 1 / 2$. **The two definitions differ by $1/(1 - u/V) = 1.5$ here and both appear in the literature; state which you are using.**
:::
:::

::: exercise Derivation {level=3}
Derive the linear momentum equation for a fixed control volume from the Reynolds transport theorem, and show explicitly why the pressure must be written in gauge form.
::: solution
**The transport theorem with** $N = m \mathbf{V}$, $\eta = \mathbf{V}$:
$$
\left( \frac{d \left( m \mathbf{V} \right)}{d t} \right)_{\mathrm{sys}}
= \frac{\partial}{\partial t} \int_{CV} \rho \mathbf{V}\, dV
+ \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**The left-hand side is Newton's second law for the system**, and at the instant the system coincides with the control volume it equals $\sum \mathbf{F}$, so
$$
\sum \mathbf{F} = \frac{\partial}{\partial t} \int_{CV} \rho \mathbf{V}\, dV
+ \oint_{CS} \rho \mathbf{V} \left( \mathbf{V} \cdot \mathbf{n} \right) d A
$$
**The forces split into surface and body forces**, $\sum \mathbf{F} = \oint_{CS} \boldsymbol{\tau} \cdot \mathbf{n}\, dA + \int_{CV} \rho \mathbf{g}\, dV$, and with $\boldsymbol{\tau} = - p \mathbf{I} + \boldsymbol{\tau}'$:
$$
\oint_{CS} \left( - p \mathbf{I} + \boldsymbol{\tau}' \right) \cdot \mathbf{n}\, dA
= - \oint_{CS} p\, \mathbf{n}\, dA + \oint_{CS} \boldsymbol{\tau}' \cdot \mathbf{n}\, dA
$$
**Why the gauge form.** Write $p = p_a + p_g$. Then
$$
- \oint_{CS} p\, \mathbf{n}\, dA = - \oint_{CS} p_a\, \mathbf{n}\, dA - \oint_{CS} p_g\, \mathbf{n}\, dA
$$
and for a **closed** surface $\oint \mathbf{n}\, dA = 0$, so if $p_a$ is **uniform** the first integral vanishes identically:
$$
\oint_{CS} p_a\, \mathbf{n}\, dA = p_a \oint_{CS} \mathbf{n}\, dA = 0
$$
**which is the whole of the reason gauge pressures may be used.** The corollary is the trap: if the control volume is **not closed** — if part of its boundary is a solid wall whose outer face is exposed to the atmosphere and is not included in the surface integral — the cancellation fails, and the atmospheric force on the outside of the wall must be added by hand. **A balloon, a flexible duct and a thin-walled pipe bend are the three cases where the shortcut gives the wrong answer**, and in all three the error is $p_a$ times the projected area, which for a $100\ \mathrm{mm}$ pipe is $785\ \mathrm{N}$.
**The steady, one-dimensional reduction.** With uniform profiles and $\beta$ absorbed:
$$
\sum F_x = \sum_{\mathrm{out}} \beta \rho \dot Q u - \sum_{\mathrm{in}} \beta \rho \dot Q u
$$
*Sanity.* The reason the derivation must be done from the transport theorem and not from $\sum \mathbf{F} = d \left( m \mathbf{V} \right) / dt$ applied to the contents of the control volume is that the contents are **not the same matter** from one instant to the next, and $d \left( m_{CV} \mathbf{V}_{CV} \right) / dt$ is not a force. **The transport theorem is the only legitimate route**, and the fact that it gives the right answer for a rocket — where $m_{CV}$ is changing — is the check that it is right.
:::
:::

::: exercise Design {level=3}
Specify the hydraulic and structural design of a stilling basin below a sluice gate discharging $40\ \mathrm{m^{3} / s}$ under a $4\ \mathrm{m}$ head in a $10\ \mathrm{m}$ wide channel, and state the acceptance criteria.
::: solution
**The design flow states.**
$$
q = 4.0\ \mathrm{m^{2} / s}, \qquad y_1 = 4.0\ \mathrm{m}, \quad V_1 = 1.0\ \mathrm{m / s}, \quad \mathrm{Fr}_1 = 0.050
$$
Taking a discharge coefficient of $0.61$ and a vena-contracta coefficient of $0.61$, the depth under the gate is
$$
y_2 = \frac{C_c q^{2 / 3}}{\left( g E_0 \right)^{1 / 3}} \approx 0.55\ \mathrm{m}, \qquad
V_2 = 7.27\ \mathrm{m / s}, \qquad \mathrm{Fr}_2 = 9.92
$$
**The conjugate depth.**
$$
\frac{y_3}{y_2} = \tfrac{1}{2} \left( \sqrt{1 + 8 \times 98.4} - 1 \right) = 13.5
\quad \Rightarrow \quad y_3 = 7.45\ \mathrm{m}
$$
**against a tailwater of $3.2\ \mathrm{m}$ over the natural bed.** The conjugate depth is $2.3$ times the tailwater, so **a hydraulic jump cannot be held in a basin at this head** — the USBR classification puts the design in the "silled basin or deflector" range, and the correct answer is a **ski-jump**: turn the jet up and let it fly, and dissipate its energy in a **roller bucket** where it impacts itself.
**The ski-jump.** With a $30^{\circ}$ lip at the invert, the jet's centreline leaves at $7.27\ \mathrm{m / s}$ at $30^{\circ}$ and lands, neglecting air and aeration, at a distance
$$
x \approx \frac{2 V^{2} \sin \theta \cos \theta}{g} = \frac{2 \times 52.9 \times 0.5 \times 0.866}{9.81} = 4.7\ \mathrm{m}
$$
**from the lip** — a short jump, because the velocity is low for the head. **The reason a ski-jump is used at high-head dams and not here is that its value is in throwing a fast jet away from the toe**, and at $7\ \mathrm{m / s}$ the jet has no reach; the correct device at this Froude number and this tailwater deficiency is a **safety (deflector) basin** with a central block that splits the jet and a raised end sill that holds a roller.
**The deflector basin.** A central block $2.4\ \mathrm{m}$ high and $1.2\ \mathrm{m}$ wide, with a $45^{\circ}$ upper face, splits the nappe into two lateral jets; a raised end sill $1.5\ \mathrm{m}$ high at the basin's downstream end creates a standing roller. The basin's dimensions follow from the **USBR** proportions for a deflector basin:
$$
\begin{array}{l c l}
\text{Basin length} & 2.7\, y_3 = 20\ \mathrm{m} & \text{to the end sill} \\
\text{Basin width} & 10\ \mathrm{m} & \text{channel width} \\
\text{Block height above floor} & 2.4\ \mathrm{m} & 0.32\, y_3 \\
\text{End-sill height} & 1.5\ \mathrm{m} & 0.20\, y_3 \\
\text{Floor thickness} & 1.2\ \mathrm{m} & \text{reinforced, keyed into cut-off walls} \\
\text{Floor drop below natural bed} & 2.0\ \mathrm{m} & \text{reduces the required sill height}
\end{array}
$$
**The energy dissipation.** With the floor lowered $2.0\ \mathrm{m}$ the tailwater over the floor is $5.2\ \mathrm{m}$ and the conjugate depth of $7.45\ \mathrm{m}$ is only $1.43$ times it, which a raised sill can supply. The head destroyed across the jump is
$$
h_L = \frac{\left( 7.45 - 0.55 \right)^{3}}{4 \times 0.55 \times 7.45} = 20.0\ \mathrm{m}, \qquad
P_{\mathrm{diss}} = \rho g Q h_L = 1{,}000 \times 9.81 \times 40 \times 20.0 = 7.9\ \mathrm{MW}
$$
**The number that makes the basin a civil-engineering problem.** $7.9\ \mathrm{MW}$ destroyed in a $20 \times 10 \times 4\ \mathrm{m}$ volume is $10\ \mathrm{kW / m^{3}}$ of turbulence, and the **scour** that would follow if any of it reached the natural bed is the reason the floor is $1.2\ \mathrm{m}$ of reinforced concrete keyed into cut-off walls $6\ \mathrm{m}$ deep. **A stilling basin is designed against uplift, not against impact**: the uplift under the floor with the jump standing is $85\ \%$ of the $4\ \mathrm{m}$ head, and the drainage gallery and relief wells must reduce it below $20\ \%$ or the slab floats in a single event.
**The impact loads.** The stagnation pressure on the deflector block's face at the design flow is
$$
\tfrac{1}{2} \rho V_2^{2} = 0.5 \times 1{,}000 \times 7.27^{2} = 26.4\ \mathrm{kPa}
$$
**with a fluctuating component whose rms is $0.4$ of the mean and whose peak is $2.5$ times it**, and the reason the block is designed for $66\ \mathrm{kPa}$ and not $26\ \mathrm{kPa}$ is that the peak is what spalls the concrete. **Impact pressures in a stilling basin are measured with flush-mounted transducers in the model and never taken as the mean velocity head.**
**The acceptance criteria.**
$$
\begin{array}{l l}
\text{Roller position} & \text{stationary within } \pm 3\ \mathrm{m}\ \text{for } 10 \text{ to } 100\ \%\ \text{ of design flow} \\
\text{Exit velocity} & \le 2.5\ \mathrm{m / s}\ \text{uniformly, no jets} \\
\text{Bed protection} & \text{no movement for a } 100\text{-year flood} \\
\text{Uplift under floor} & \le 20\ \%\ \text{of the design head} \\
\text{Aeration} & \text{air admitted at the jump's toe; no cavitation on the gate lip}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE HYDRAULIC MODEL SHALL BE TESTED AT SCALE WITH THE ACTUAL TAILWATER CURVE AND NOT AT A SINGLE ASSUMED TAILWATER."** **"THE IMPACT PRESSURES ON THE DEFLECTOR BLOCK AND END SILL SHALL BE MEASURED WITH FLUCTUATING PRESSURE TRANSDUCERS IN THE MODEL AND THE CONCRETE DESIGNED FOR THE PEAK AND NOT THE MEAN."** **"THE UPLIFT PRESSURES UNDER THE FLOOR SHALL BE MEASURED IN THE MODEL AND THE DRAINAGE SYSTEM SIZED FROM THE MEASUREMENT."** **"THE AIR-ADMISSION FACILITY UNDER THE NAPPE SHALL BE SIZED FOR THE FULL GATE OPENING AND NOT FOR THE DESIGN FLOW."**
*Design comment.* The general rule is that **a stilling basin is a machine for destroying energy that will destroy anything else that cannot destroy it**, and that its design is a hydraulic, structural and geotechnical problem solved simultaneously — which is why the model test is not a verification but the primary design document.
:::
:::
