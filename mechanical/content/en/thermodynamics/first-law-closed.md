The first law is one sentence: **energy is conserved, and the change in what a system contains equals what crossed its boundary.** Everything difficult about it is in the second half of that sentence, because what crossed the boundary is not a property, is not a state function, and depends on the path, the boundary and the clock.

The closed system — a **control mass** — is where the law is learned, because nothing crosses the boundary as matter and the two remaining crossings, heat and work, can be held separately. Get the closed-system balance right and the control-volume version is one extra term; get it wrong and every cycle, every efficiency and every guarantee downstream inherits the error.

::: warning Seven energy-balance errors that survive into the answer
**Applying $\Delta U = Q - W$ to a system with a moving boundary and forgetting that $W$ includes everything.** The $P\,dV$ work, the paddle-wheel work, the shaft work, the spring work, the electrical work and the work of stretching a surface all cross the same boundary and all carry the same sign. A calculation that integrates $P\,dV$ and then adds a $-5\ \mathrm{kJ}$ paddle term with the wrong sign has made one error and produced two. **Using $\Delta U = m c_v \Delta T$ outside its validity.** It is exact for an **ideal gas** and for an **incompressible solid or liquid**; it is **false** for a real gas and **catastrophically false** in the two-phase dome, where $\Delta T = 0$ while $\Delta U$ is $2{,}000\ \mathrm{kJ / kg}$. **Using $\Delta H = m c_p \Delta T$ for a constant-pressure process of a real substance and then also writing $Q = \Delta U$.** For a closed system at constant pressure $Q = \Delta H$ **only if** the only work is $P\,dV$; the two statements are the same statement and writing both is a double count. **Dropping $\Delta KE$ and $\Delta PE$ without checking.** They are negligible for a gas in a cylinder and are **the whole answer** for a turbine, a nozzle or a pumped-storage plant: $100\ \mathrm{m / s}$ is $5\ \mathrm{kJ / kg}$ of kinetic energy, which is $1.25\ \%$ of a steam turbine's enthalpy drop and $100\ \%$ of a nozzle's purpose. **Assuming $W = \int P\,dV$ with the system pressure.** The work is done **against the surroundings**, and the correct integrand is the pressure on the **inner face of the piston**. In a rapid expansion the two differ by $10$ to $30\ \%$, and in a free expansion into a vacuum the system pressure is $200\ \mathrm{kPa}$ and the work is **zero**. **Interpolating a sign convention.** $Q_{\mathrm{in}} - W_{\mathrm{out}} = \Delta E$ and $\Delta E = Q_{\mathrm{net,in}} + W_{\mathrm{net,in}}$ are both correct and differ in the sign of every work term. Pick one, write it on the top of the page, and never mix them in one solution. **Forgetting that a cycle returns to its start.** Over a cycle $\Delta U = \Delta KE = \Delta PE = 0$, so $\oint \delta Q = \oint \delta W$ **exactly** — and a cycle calculation whose net work does not equal its net heat has an arithmetic error, not a physical insight.
:::

## The balance and its terms

::: definition The closed-system energy balance {#def-balance}
$$
E_2 - E_1 = Q - W, \qquad
E = U + \mathrm{KE} + \mathrm{PE} = m \left( u + \frac{V^{2}}{2} + g z \right)
$$
with the convention **$Q$ positive into the system** and **$W$ positive out of it**. In rate form,
$$
\frac{d E}{d t} = \dot{Q} - \dot{W}
$$
**The three terms and when each is dropped.**
$$
\begin{array}{l l l}
\Delta U & \text{thermal, chemical, nuclear} & \text{never dropped for a closed system} \\
\Delta \mathrm{KE} = \tfrac{1}{2} m \left( V_2^2 - V_1^2 \right) & \text{bulk motion} & \text{dropped when the system starts and ends at rest} \\
\Delta \mathrm{PE} = m g \left( z_2 - z_1 \right) & \text{elevation} & \text{dropped when } \Delta z < 100\ \mathrm{m} \text{ for a gas}
\end{array}
$$
**The number that justifies the drop.** For $1\ \mathrm{kg}$ of gas, raising it $10\ \mathrm{m}$ costs $0.098\ \mathrm{kJ}$ against a typical $\Delta U$ of $100\ \mathrm{kJ}$ — a **$0.1\ \%$** effect. For $1\ \mathrm{kg}$ of **water** in a pumped-storage plant, $100\ \mathrm{m}$ is $0.98\ \mathrm{kJ}$ against a $\Delta U$ of essentially zero, so the potential energy is **everything** and the internal energy is nothing. **The drop is a statement about the application and not about the term.**
**The cyclic form.** For a cycle, $\Delta E = 0$ over each round trip:
$$
\oint \delta Q = \oint \delta W \qquad \text{(energy is conserved; the second law will say this is not enough)}
$$
**The exact-differential statement.** $\delta Q$ and $\delta W$ are inexact; $dU$, $dV$, $dS$ are exact. The mathematical signature is that $\oint \delta Q \ne 0$ for a heat engine while $\oint dU = 0$ always, and this is the reason a **property** can be tabulated and a **transfer** cannot.
:::

::: definition Work modes {#def-work}
$$
\begin{array}{l l l}
\text{Boundary} & W_b = \displaystyle\int_{1}^{2} P_{\mathrm{int}}\, dV & \text{quasi-equilibrium only} \\
\text{Polytropic} & W_b = \dfrac{P_2 V_2 - P_1 V_1}{1 - n} = \dfrac{m R \left( T_2 - T_1 \right)}{1 - n},\ n \ne 1 & \\
\text{Isothermal ideal gas} & W_b = m R T \ln \left( V_2 / V_1 \right) = m R T \ln \left( P_1 / P_2 \right) & \\
\text{Isobaric} & W_b = P \left( V_2 - V_1 \right) & \\
\text{Isochoric} & W_b = 0 & \\
\text{Spring-loaded piston} & W_b = P_0 \left( V_2 - V_1 \right) + \tfrac{1}{2} k x^{2},\ x = \Delta V / A & \\
\text{Shaft} & W = 2 \pi N T = \omega T & \\
\text{Electrical} & W = \displaystyle\int V I\, dt; \text{ a resistance heater gives } W = - V I \Delta t & \text{work in, so } W \text{ is negative} \\
\text{Elastic bar} & W = \displaystyle\int F\, dx = \tfrac{1}{2} \frac{F^{2} L}{A E} & \\
\text{Surface film} & W = \sigma_s \Delta \mathcal{A} & \\
\text{Paddle wheel} & W = 2 \pi N T & \text{all of it ends up as internal energy}
\end{array}
$$
**The spring-loaded piston, which is the work of a real relief valve.** With a piston of area $A$, a preload pressure $P_0$ (atmosphere plus the piston's weight) and a spring of stiffness $k$,
$$
P \left( x \right) = P_0 + \frac{k x}{A}, \qquad V = A x, \qquad
W_b = \int_0^x \left( P_0 + \frac{k x'}{A} \right) A\, d x' = P_0 \Delta V + \frac{1}{2} k x^{2}
$$
and the pressure at the end of the stroke is $P_0 + k x / A$. **The spring stores $\tfrac{1}{2} k x^{2}$ and gives it back**; the $P_0 \Delta V$ part is done against the atmosphere and is gone.
**The free expansion.** A gas at $P_1$ expands into an evacuated, insulated rigid vessel. $V$ is fixed, so $W = 0$; insulated, so $Q = 0$; rigid, so $\Delta KE = \Delta PE = 0$. Therefore
$$
\Delta U = 0, \qquad T_2 = T_1\ \text{(ideal gas)}, \qquad P_2 = P_1 \frac{V_1}{V_1 + V_{\mathrm{vac}}}
$$
**and the process is irreversible**, which the first law cannot see and the second law will price at $T_0 S_{\mathrm{gen}} = m R T_0 \ln \left[ \left( V_1 + V_{\mathrm{vac}} \right) / V_1 \right]$ of destroyed work.
:::

::: definition Specific heats and the two energy differences {#def-cv}
$$
c_v \equiv \left( \frac{\partial u}{\partial T} \right)_v, \qquad c_p \equiv \left( \frac{\partial h}{\partial T} \right)_P, \qquad h \equiv u + P v
$$
**Joule's insight, and why it is a law and not an approximation.** For an **ideal gas** $u$ is a function of $T$ alone — established experimentally by Joule's free-expansion measurement of $1843$, in which the temperature of a gas expanding into a vacuum changed by less than his thermometer could resolve, and established theoretically by $\left( \partial u / \partial v \right)_T = T \left( \partial P / \partial T \right)_v - P = 0$ for $P = R T / v$. Therefore
$$
\boxed{ \Delta u = \int_{1}^{2} c_v \left( T \right) d T \quad \text{and} \quad \Delta h = \int_{1}^{2} c_p \left( T \right) d T \quad \text{for an ideal gas, along ANY process} }
$$
and the subscripts $v$ and $P$ on $c_v$ and $c_p$ are **historical accidents**: they name the conditions under which the heat capacity was measured and not the process for which the formula is valid.
**For an incompressible substance** $c_v = c_p \equiv c$ and
$$
\Delta u \approx c \Delta T, \qquad \Delta h \approx c \Delta T + v \Delta P
$$
**For a real substance** neither holds, and $\Delta u$ and $\Delta h$ come from tables.
**The three levels of accuracy for air.**
$$
\begin{array}{l c c c}
\text{Method} & \Delta h \left[ 300 \to 1{,}200\ \mathrm{K} \right] & \text{Error} & \text{Use} \\
\text{Constant } c_p = 1.005 & 904.5\ \mathrm{kJ / kg} & - 7.5\ \% & T \text{ within } \pm 100\ \mathrm{K} \\
\text{Average } c_p = 1.057 & 951.3\ \mathrm{kJ / kg} & - 2.7\ \% & T \text{ within } \pm 400\ \mathrm{K} \\
\text{Air tables} & 977.6\ \mathrm{kJ / kg} & - & \text{anything above a } 500\ \mathrm{K} \text{ range}
\end{array}
$$
**The kinetic-theory values, which explain the table.**
$$
\begin{array}{l c c c c}
\text{Molecular model} & c_v / R & c_p / R & \gamma & \text{Examples} \\
\text{Monatomic} & 3 / 2 & 5 / 2 & 1.667 & \text{He, Ar, Ne} \\
\text{Diatomic, cold} & 5 / 2 & 7 / 2 & 1.400 & \text{air at } 300\ \mathrm{K} \\
\text{Diatomic, hot} & \to 7 / 2 & \to 9 / 2 & \to 1.29 & \text{air above } 2{,}000\ \mathrm{K} \\
\text{Non-linear polyatomic} & 3 & 4 & 1.33 & \text{H}_2\text{O, CO}_2 \text{ at moderate } T
\end{array}
$$
**The number that shows why $\gamma$ falls with temperature.** Air's $\gamma$ is $1.400$ at $300\ \mathrm{K}$, $1.377$ at $600\ \mathrm{K}$, $1.337$ at $1{,}000\ \mathrm{K}$, $1.289$ at $1{,}500\ \mathrm{K}$ and $1.230$ at $2{,}500\ \mathrm{K}$, because rotational and then vibrational modes unlock and each one soaks up energy without raising the temperature. An Otto-cycle calculation with $\gamma = 1.40$ at a $2{,}400\ \mathrm{K}$ combustion temperature over-predicts the expansion work by **$12\ \%$**, and the standard remedy is the **air-standard with variable specific heats**, which is the tables and not the constant $\gamma$.
:::

::: definition Constant-volume and constant-pressure heat {#def-qp}
**Constant volume, closed system, no work:**
$$
Q_v = \Delta U = m \left( u_2 - u_1 \right)
$$
**Constant pressure, closed system, only $P\,dV$ work:**
$$
Q_P = \Delta U + P \Delta V = \Delta H = m \left( h_2 - h_1 \right)
$$
**The two are not alternatives.** $Q_v$ and $Q_P$ are the **same** $\Delta U$ plus or minus the work, and the difference $Q_P - Q_v = P \Delta V = m R \Delta T$ for an ideal gas is exactly the definition of $c_p - c_v = R$.
**The number that makes a bomb calorimeter read low.** A coal burnt at constant volume gives $Q_v$; the same coal burnt in a furnace gives $Q_P$, and the difference is $\Delta n_g R T$ per mole of fuel — for carbon to carbon dioxide $\Delta n_g = 0$ and there is no difference, but for hydrogen to water vapour $\Delta n_g = - 0.5$ and $Q_P$ is $120\ \mathrm{kJ / kmol}$ below $Q_v$, about **$1\ \%$** of the heating value. A bomb-calorimeter result must be corrected for the **water produced condensing** in the bomb, which is a $2{,}442\ \mathrm{kJ / kg}$ effect on the hydrogen fraction and worth **$15\ \%$** on a hydrocarbon's higher heating value.
**The phase-change case, where $\Delta T = 0$.** Evaporating $2\ \mathrm{kg}$ of saturated water at $400\ \mathrm{kPa}$ from $x = 0.3$ to $x = 1$:
$$
Q = m \left( h_2 - h_1 \right) = 2 \times \left( 2{,}738.1 - 1{,}244.7 \right) = 2{,}987\ \mathrm{kJ}
$$
$$
W = P \Delta V = 400 \times 2 \times \left( 0.46242 - 0.13949 \right) = 258\ \mathrm{kJ}
$$
$$
\Delta U = m \left( u_2 - u_1 \right) = 2 \times \left( 2{,}553.1 - 1{,}188.9 \right) = 2{,}728\ \mathrm{kJ} = Q - W\ \checkmark
$$
**$91\ \%$ of the heat leaves as work of expansion** — and the temperature never changed, which is the fact that kills the $c \Delta T$ model stone dead.
:::

::: widget plot
f: ln(x); (1-pow(x,-0.4))/0.4
x: 1, 8
y: 0, 2.4
labels: isothermal W/mRT1; adiabatic W/mRT1
caption: Reversible boundary work of an expansion of an ideal gas, normalised by $m R T_1$, against the volume ratio $V_2 / V_1$. The isothermal curve is $\\ln \\left( V_2 / V_1 \\right)$ and the adiabatic curve is $\\left[ 1 - r^{1 - \\gamma} \\right] / \\left( \\gamma - 1 \\right)$ with $\\gamma = 1.4$. At a ratio of $8$ the isothermal expansion gives **$47\ \\%$ more work** than the adiabatic one, because the heat supplied keeps the pressure up. The same gas, the same endpoints in volume, and a factor of $1.47$ in the work — which is why the phrase "the work of expansion" is meaningless until the path is stated.
:::


## Worked cases

::: example A spring-loaded piston {#ex-spring}
A piston of area $A = 0.010\ \mathrm{m^{2}}$ and mass $100\ \mathrm{kg}$ carries a linear spring of stiffness $k = 10\ \mathrm{kN / m}$, initially just touching. The gas beneath is at $100\ \mathrm{kPa}$ and $0.005\ \mathrm{m^{3}}$; heat is added until the volume reaches $0.015\ \mathrm{m^{3}}$. Find the final pressure, the boundary work and the fraction done against the atmosphere.
::: solution
**The preload pressure.** The pressure needed to float the piston against the atmosphere is
$$
P_0 = P_{\mathrm{atm}} + \frac{m g}{A} = 101.325 + \frac{100 \times 9.81}{0.010 \times 1000} = 101.325 + 98.1 = 199.4\ \mathrm{kPa}
$$
**The initial state is not at $P_0$.** The gas is at $100\ \mathrm{kPa}$, so the piston is **on its stops** and the volume cannot change until the pressure reaches $199.4\ \mathrm{kPa}$.
**Stage 1, constant volume.** $100 \to 199.4\ \mathrm{kPa}$ at $V = 0.005\ \mathrm{m^{3}}$:
$$
W_1 = 0
$$
**Stage 2, the spring compresses.** The displacement is
$$
x = \frac{\Delta V}{A} = \frac{0.010}{0.010} = 1.00\ \mathrm{m}
$$
and the final pressure is
$$
P_3 = P_0 + \frac{k x}{A} = 199.4 + \frac{10 \times 1.00}{0.010} = 199.4 + 1{,}000 = 1{,}199.4\ \mathrm{kPa}
$$
**The work of stage 2.**
$$
W_2 = P_0 \Delta V + \frac{1}{2} k x^{2} = 199.4 \times 10 + 0.5 \times 10 \times 1.00^{2} = 1{,}994 + 5{,}000 = 6{,}994\ \mathrm{J} = 6.99\ \mathrm{kJ}
$$
**The check, by the trapezoid.**
$$
W_2 = \frac{P_2 + P_3}{2} \Delta V = \frac{199.4 + 1{,}199.4}{2} \times 0.010 = 6.99\ \mathrm{kJ}\ \checkmark
$$
**The split.**
$$
\frac{P_0 \Delta V}{W_2} = \frac{1{,}994}{6{,}994} = 28.5\ \%\ \text{against the atmosphere}, \qquad
68.5\ \%\ \text{stored in the spring}
$$
**The interpretation.** Two thirds of the work is **recoverable** — the spring will give it back on the return stroke — and $28.5\ \%$ is **gone**, spent lifting the atmosphere. This is the whole thermodynamics of a **relief valve**, a **hydraulic accumulator** and a **car suspension**: the gas spring is lossy in the sense that its work is not returned, and the steel spring is not.
**The temperature, if the gas is air.** With $m = P_1 V_1 / \left( R T_1 \right) = 100 \times 0.005 / \left( 0.287 \times 300 \right) = 5.808\ \mathrm{g}$:
$$
T_3 = \frac{P_3 V_3}{m R} = \frac{1{,}199.4 \times 0.015}{0.005808 \times 0.287} = 1{,}077\ \mathrm{K} = 804\ {}^{\circ}\mathrm{C}
$$
and $\Delta U = m c_v \Delta T = 0.005808 \times 0.718 \times 777 = 3.24\ \mathrm{kJ}$, so
$$
Q = \Delta U + W = 3.24 + 6.99 = 10.23\ \mathrm{kJ}
$$
**The efficiency of the arrangement.** Only $3.24 / 10.23 = 32\ \%$ of the heat supplied stays in the gas; $68\ \%$ leaves as work, of which $49\ \%$ is recoverable from the spring.
*Sanity.* The reason the initial pressure of $100\ \mathrm{kPa}$ is below $P_0$ is that the piston must be **on its stops** at the start, and a solution that integrates $\int P\,dV$ from $100\ \mathrm{kPa}$ has assumed the piston floats at a pressure at which it cannot — and gets $6.99\ \mathrm{kJ}$ instead of the correct $6.99\ \mathrm{kJ}$ **by luck**, because the volume change in stage 1 is zero. The luck does not survive a problem in which stage 1 has a volume change.
:::
:::

::: example A piston with stops {#ex-stops}
A cylinder with stops at $0.15\ \mathrm{m^{3}}$ contains $0.5\ \mathrm{kg}$ of air at $200\ \mathrm{kPa}$ and $0.10\ \mathrm{m^{3}}$. The stops require $400\ \mathrm{kPa}$ to lift. Heat is added until the pressure reaches $600\ \mathrm{kPa}$. Find the work, the heat and the total temperature rise.
::: solution
**The three stages.** Constant volume to $400\ \mathrm{kPa}$; constant pressure to $0.15\ \mathrm{m^{3}}$; constant volume to $600\ \mathrm{kPa}$.
**The temperatures.** $T_1 = P_1 V_1 / \left( m R \right) = 200 \times 0.10 / \left( 0.5 \times 0.287 \right) = 139.4\ \mathrm{K}$.
$$
T_2 = T_1 \frac{P_2}{P_1} = 278.7\ \mathrm{K}, \qquad
T_3 = T_2 \frac{V_3}{V_2} = 278.7 \times 1.5 = 418.1\ \mathrm{K}, \qquad
T_4 = T_3 \frac{P_4}{P_3} = 627.2\ \mathrm{K}
$$
**The work.** Only stage 2 does boundary work:
$$
W = P \left( V_3 - V_2 \right) = 400 \times \left( 0.15 - 0.10 \right) = 20.0\ \mathrm{kJ}
$$
**The heat.** With $c_v = 0.718$ and $c_p = 1.005$:
$$
Q_{1 2} = m c_v \left( T_2 - T_1 \right) = 0.5 \times 0.718 \times 139.3 = 50.0\ \mathrm{kJ}
$$
$$
Q_{2 3} = m c_p \left( T_3 - T_2 \right) = 0.5 \times 1.005 \times 139.4 = 70.1\ \mathrm{kJ}
$$
$$
Q_{3 4} = m c_v \left( T_4 - T_3 \right) = 0.5 \times 0.718 \times 209.1 = 75.1\ \mathrm{kJ}
$$
$$
Q_{\mathrm{total}} = 195.2\ \mathrm{kJ}
$$
**The check by the first law.**
$$
\Delta U = m c_v \left( T_4 - T_1 \right) = 0.5 \times 0.718 \times 487.8 = 175.1\ \mathrm{kJ}, \qquad
Q - W = 195.2 - 20.0 = 175.2\ \mathrm{kJ}\ \checkmark
$$
**The number that matters.** The work is **$10\ \%$** of the heat, and it is all done in the **middle** stage. A process that was stopped at the stops instead of being allowed to lift them would have needed the same $175.1\ \mathrm{kJ}$ of internal-energy change and delivered **no** work — which is the difference between an **Otto** cycle's constant-volume combustion and a **Diesel** cycle's constant-pressure combustion, compressed into one cylinder.
**The $P$–V diagram's lesson.** The area under the path is $20.0\ \mathrm{kJ}$, and the area under the **straight line** from state 1 to state 4 would be $\tfrac{1}{2} \left( 200 + 600 \right) \times 0.05 = 20.0\ \mathrm{kJ}$ — the same, by coincidence, because the trapezoid and the rectangle happen to agree here. **Do not use that as a check.**
*Sanity.* The reason $c_p$ appears in stage 2 and $c_v$ in stages 1 and 3 is not that the process is constant pressure or volume but that $\Delta H = m c_p \Delta T$ is the convenient bookkeeping for a constant-pressure leg, where $Q = \Delta H$; the internal-energy change of stage 2 is still $m c_v \Delta T = 50.0\ \mathrm{kJ}$ and the remaining $20.1\ \mathrm{kJ}$ is the work.
:::
:::

::: example A paddle wheel in an insulated tank {#ex-paddle}
An insulated rigid $2\ \mathrm{m^{3}}$ tank contains air at $200\ \mathrm{kPa}$ and $300\ \mathrm{K}$. A paddle wheel driven by an external motor delivers $100\ \mathrm{W}$ for $30$ minutes. Find the final temperature and pressure, and the exergy destroyed.
::: solution
**The mass.**
$$
m = \frac{P_1 V}{R T_1} = \frac{200 \times 2}{0.287 \times 300} = 4.643\ \mathrm{kg}
$$
**The energy input.** Insulated, rigid, so $Q = 0$ and $W_b = 0$; the only transfer is the shaft work, **into** the system:
$$
W_{\mathrm{sh}} = - \dot{W} \Delta t = - 0.100 \times 1{,}800 = - 180\ \mathrm{kJ}
$$
**The balance.** $\Delta U = Q - W = 0 - \left( - 180 \right) = + 180\ \mathrm{kJ}$.
$$
\Delta T = \frac{180}{m c_v} = \frac{180}{4.643 \times 0.718} = 54.0\ \mathrm{K}
$$
$$
T_2 = 354.0\ \mathrm{K} = 80.9\ {}^{\circ}\mathrm{C}, \qquad
P_2 = P_1 \frac{T_2}{T_1} = 200 \times 1.180 = 236.0\ \mathrm{kPa}
$$
**The exergy destroyed.** The work has been converted entirely into internal energy at a temperature that rises from $300$ to $354\ \mathrm{K}$, and the entropy generated is
$$
S_{\mathrm{gen}} = m \left( s_2 - s_1 \right) = m \left[ c_v \ln \frac{T_2}{T_1} + R \ln \frac{v_2}{v_1} \right] = 4.643 \times 0.718 \times \ln 1.180 = 0.549\ \mathrm{kJ / K}
$$
$$
X_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 293.15 \times 0.549 = 161\ \mathrm{kJ}
$$
**The verdict.** Of the $180\ \mathrm{kJ}$ of **pure work** put in, **$161\ \mathrm{kJ}$ — $89\ \%$ — has been destroyed**, and only $19\ \mathrm{kJ}$ remains recoverable. The recoverable part is the work a reversible engine could extract while cooling the air back to $300\ \mathrm{K}$, and it is small because the temperature rise is small.
**The general rule this illustrates.** **Work dissipated into internal energy at a temperature $T$ retains an exergy fraction of about $1 - T_0 / \bar{T}$**, which for a $54\ \mathrm{K}$ rise is $1 - 293 / 327 = 10\ \%$. The same $180\ \mathrm{kJ}$ delivered as electricity to a battery retains $100\ \%$, and delivered as heat at $900\ \mathrm{K}$ retains $67\ \%$.
**The number that sizes a real machine.** A **brake dynamometer** absorbs a motor's output as exactly this: shaft work into internal energy of air, water or oil. Its whole design problem is the $89\ \%$ of the input that has become low-grade heat and must be carried away, and its whole rating is the **cooling-water flow** and not the torque.
*Sanity.* The reason the answer is not "$180\ \mathrm{kJ}$ of heat was added" is that **no heat was added** — the tank is insulated — and yet the temperature rose. Temperature change and heat transfer are not the same phenomenon, and this example is the cleanest demonstration in the subject that $\Delta T$ tells you nothing about $Q$.
:::
:::

::: example Two tanks, one evacuated {#ex-free}
A $3\ \mathrm{m^{3}}$ tank contains air at $500\ \mathrm{kPa}$ and $350\ \mathrm{K}$; it is connected through a valve to an evacuated, insulated $5\ \mathrm{m^{3}}$ tank. The valve is opened. Find the final temperature, the final pressure and the work that could have been obtained.
::: solution
**The system.** Both tanks. Rigid, so $W = 0$; insulated, so $Q = 0$; no mass crosses, so it is closed.
$$
\Delta U = 0 \quad \Rightarrow \quad T_2 = T_1 = 350\ \mathrm{K}\ \text{(ideal gas)}
$$
**The final pressure.**
$$
m = \frac{500 \times 3}{0.287 \times 350} = 14.95\ \mathrm{kg}, \qquad
P_2 = \frac{m R T_2}{V_{\mathrm{tot}}} = \frac{500 \times 3}{8} = 187.5\ \mathrm{kPa}
$$
**The work that could have been obtained.** A reversible **isothermal** expansion between the same end states:
$$
W_{\mathrm{rev}} = m R T \ln \frac{V_2}{V_1} = 14.95 \times 0.287 \times 350 \times \ln \frac{8}{3} = 1{,}500.9 \times 0.9808 = 1{,}472\ \mathrm{kJ}
$$
**The entropy generation and the check.**
$$
S_{\mathrm{gen}} = m R \ln \frac{V_2}{V_1} = 14.95 \times 0.287 \times 0.9808 = 4.207\ \mathrm{kJ / K}
$$
$$
X_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 293.15 \times 4.207 = 1{,}233\ \mathrm{kJ}
$$
**The two numbers differ, and the reason is instructive.** $W_{\mathrm{rev}} = 1{,}472\ \mathrm{kJ}$ is the work of a reversible **isothermal** expansion, which requires heat from a reservoir at $350\ \mathrm{K}$; $X_{\mathrm{dest}} = 1{,}233\ \mathrm{kJ}$ is the work destroyed relative to an environment at $293\ \mathrm{K}$ with **no** reservoir. The difference, $239\ \mathrm{kJ}$, is the exergy of the $1{,}472\ \mathrm{kJ}$ of heat drawn at $350\ \mathrm{K}$:
$$
1{,}472 \times \left( 1 - \frac{293.15}{350} \right) = 239\ \mathrm{kJ}\ \checkmark
$$
**The verdict.** **$1.23\ \mathrm{MJ}$ of work was thrown away by opening a valve** — enough to run a $1\ \mathrm{kW}$ heater for fourteen months. The first law records $\Delta U = 0$ and calls it a non-event.
**The rule.** **Any pressure equalisation, any throttling, any mixing and any unrestrained expansion destroys work in proportion to $m R \ln \left( P_1 / P_2 \right)$**, and a plant that vents steam, blows down a receiver or leaks a flange is destroying exactly this. A $10\ \mathrm{mm}$ hole in an $8\ \mathrm{bar}$ airline leaks $0.04\ \mathrm{kg / s}$ and destroys $14\ \mathrm{kW}$ of work, which is **$120{,}000\ \mathrm{kWh}$ a year** and is the reason a compressed-air leak survey pays for itself in a fortnight.
*Sanity.* The reason $T$ is unchanged is that an ideal gas's internal energy depends only on temperature and $\Delta U = 0$; a **real** gas would cool slightly, by $2$ to $3\ \mathrm{K}$ at these pressures, and that cooling is the **Joule–Thomson effect** and the operating principle of every gas liquefier.
:::
:::

::: history
The **first law** was not discovered so much as converged on from four directions in the space of fifteen years. **Julius Robert Mayer**, a ship's doctor in Java, noticed in **1840** that the venous blood of his European patients was redder in the tropics than at home — less oxygen consumed for the same work — and inferred a mechanical equivalent of heat from the specific-heat ratio of gases, publishing in **1842** a value of $3.65\ \mathrm{J / cal}$ that was within $15\ \%$ and was ignored. **James Prescott Joule** began his paddle-wheel measurements in **1843** with a fall-weight drive, a thermometer readable to $0.01\ {}^{\circ}\mathrm{F}$ and a value of $819\ \mathrm{J / cal}$, and refined it for **thirty-five years** to $818.6$, deliberately over-shooting the true value because he suspected his own bearing friction. **Hermann von Helmholtz** stated the general conservation of energy in **1847** and gave it the name *Kraft* — energy — and it was his formulation, not Joule's, that the German-speaking world adopted. **The name "first law"** and the modern $\Delta U = Q - W$ are **Rankine**'s and **Clausius**'s of the **1850s**; **the distinction between $U$ and $H$** is **Kamerlingh Onnes**'s and **B. Massau**'s of **1875**, the latter introducing the enthalpy to simplify a steady-flow energy balance that Gibbs had written the long way. **The paddle-wheel experiment** in this lesson is Joule's own, and its modern descendant is the **electrical calibration** of a calorimeter, in which the "paddle" is a $10\ \Omega$ resistor and the "work" is $V I \Delta t$ measured against a Josephson standard — the same experiment, a hundred and eighty years and six orders of magnitude of precision later.
:::

## Where this leads

The closed-system balance becomes the steady-flow balance in [[thermodynamics/first-law-open]]; the property values it consumes come from [[thermodynamics/pure-substances]]; the restriction the first law does not impose is imposed in [[thermodynamics/second-law]], and the work destroyed in the last two examples is quantified in [[thermodynamics/exergy]].

::: summary
- Energy in minus energy out equals the change inside; the terms are the crossings of the boundary you drew, and every mode of work counts.
- $\Delta u = c_v \Delta T$ and $\Delta h = c_p \Delta T$ are valid for an ideal gas along **any** process — the subscripts name the measurement and not the path.
- Boundary work is $\int P_{\text{inner face}}\,dV$, and in a free expansion the pressure is $500\ \mathrm{kPa}$ and the work is zero.
- A spring-loaded piston returns two thirds of its work; a gas spring returns none of it, which is the difference between a suspension and a damper.
- A closed system at constant pressure exchanges $Q = \Delta H$, and evaporating water at $400\ \mathrm{kPa}$ turns $91\ \%$ of the heat into expansion work with no temperature change at all.
- Dissipating $180\ \mathrm{kJ}$ of shaft work into internal energy at $354\ \mathrm{K}$ destroys $89\ \%$ of it.
- Opening a valve between a charged tank and an evacuated one destroys $1.2\ \mathrm{MJ}$ of work and leaves the first law entirely satisfied.
:::

::: quiz
A gas in a rigid, insulated tank is stirred by a paddle wheel and its temperature rises. Which statement is true?
- [ ] Heat was transferred to the gas
- [x] Work crossed the boundary; no heat did, and $\Delta T$ says nothing about $Q$
- [ ] $\Delta U = 0$ because the tank is rigid
- [ ] The temperature rise proves the process was reversible
::: solution
The tank is insulated, so $Q = 0$ by definition, and rigid, so $W_b = 0$; the only crossing is the shaft work, and $\Delta U = -W_{\mathrm{shaft}} = +180\ \mathrm{kJ}$ in the worked example. **A temperature change is a change of state and a heat transfer is a path quantity**, and the paddle-wheel tank is the cleanest demonstration in the subject that the first tells you nothing about the second.
:::
:::

## Exercises

::: exercise Units {level=1 check="0"}
A gas in a rigid tank is stirred by a paddle wheel while being cooled so that its temperature stays constant. Give the boundary work in kilojoules.
::: solution
$0$ — a rigid boundary does no $P\,dV$ work. The paddle work and the heat transfer are equal and opposite.
:::
:::

::: exercise Mayer {level=1 check="0.287"}
Give $c_p - c_v$ for air in kilojoules per kilogram kelvin.
::: solution
$0.287\ \mathrm{kJ / kg \cdot K}$ — the gas constant.
:::
:::

::: exercise Gamma {level=1 check="1.667"}
Give the specific heat ratio of a monatomic ideal gas.
::: solution
$\gamma = (5/2)R/(3/2)R = 5/3 = 1.667$.
:::
:::

::: exercise Cyclic {level=1 check="0"}
Over a complete thermodynamic cycle, what is $\Delta U$?
::: solution
$0$ — internal energy is a point function and the cycle returns to its start, so $\oint \delta Q = \oint \delta W$.
:::
:::

::: exercise Free expansion {level=1 check="187.5"}
$3\ \mathrm{m^{3}}$ of air at $500\ \mathrm{kPa}$ expands into an evacuated $5\ \mathrm{m^{3}}$. Give the final pressure in kilopascals.
::: solution
$P_2 = 500 \times 3 / 8 = 187.5\ \mathrm{kPa}$.
:::
:::

::: exercise Constant pressure {level=2}
$0.3\ \mathrm{m^{3}}$ of air at $200\ \mathrm{kPa}$ is heated at constant pressure to $0.5\ \mathrm{m^{3}}$. If the air starts at $300\ \mathrm{K}$, give the boundary work and the heat transfer.
::: solution
$$
W = P \Delta V = 200 \times \left( 0.5 - 0.3 \right) = 40.0\ \mathrm{kJ}
$$
$$
T_2 = T_1 \frac{V_2}{V_1} = 300 \times \frac{5}{3} = 500\ \mathrm{K}, \qquad
m = \frac{P_1 V_1}{R T_1} = \frac{200 \times 0.3}{0.287 \times 300} = 0.6969\ \mathrm{kg}
$$
$$
Q = m c_p \Delta T = 0.6969 \times 1.005 \times 200 = 140.1\ \mathrm{kJ}
$$
*Sanity.* $\Delta U = m c_v \Delta T = 0.6969 \times 0.718 \times 200 = 100.0\ \mathrm{kJ}$ and $Q - W = 140.1 - 40.0 = 100.1\ \mathrm{kJ}$ — the balance closes. A second check is $Q / \Delta U = c_p / c_v = \gamma = 1.40$, and $140.1 / 100.0 = 1.401$. $\checkmark$
:::
:::

::: exercise Real gas {level=2}
Carbon dioxide at $5\ \mathrm{MPa}$ and $320\ \mathrm{K}$ is heated at constant volume to $400\ \mathrm{K}$. Explain why $\Delta u = m c_v \Delta T$ with $c_v = 0.846$ is wrong, and give the correct procedure.
::: solution
**Why it is wrong.** $c_v = 0.846\ \mathrm{kJ / kg \cdot K}$ is the **ideal-gas** value, and for an ideal gas $u$ depends on $T$ alone. At $5\ \mathrm{MPa}$ and $320\ \mathrm{K}$ the carbon dioxide is at $T_r = 1.05$ and $P_r = 0.68$, where $Z \approx 0.35$ and $\left( \partial u / \partial v \right)_T = T \left( \partial P / \partial T \right)_v - P$ is **large and positive**: the internal energy depends on volume as well as temperature.
**The correct procedure.** Take $u$ from a real-gas table or an equation of state at both states:
$$
\Delta u = u \left( v, T_2 \right) - u \left( v, T_1 \right), \qquad v = v_1 = \frac{Z_1 R T_1}{P} = \frac{0.35 \times 0.1889 \times 320}{5000} = 0.00424\ \mathrm{m^{3} / kg}
$$
**The size of the error.** The ideal-gas estimate gives $0.846 \times 80 = 67.7\ \mathrm{kJ / kg}$. The real value, from a reference equation of state at the same specific volume, is about **$92\ \mathrm{kJ / kg}$** — the ideal-gas calculation is **$27\ \%$** low, because part of the heat goes into pulling the molecules apart against their mutual attraction and not into their motion.
*Sanity.* The sign is the tell: in a dense gas the **attractive** forces hold the molecules back, so energy added at constant volume does extra work against them and $\Delta u$ **exceeds** the ideal-gas value. In a repulsive-dominated state — the same fluid at $20\ \mathrm{MPa}$ — the correction reverses sign.
:::
:::

::: exercise Derivation {level=3}
Show that for an ideal gas with constant specific heats the boundary work of a reversible adiabatic compression between two given pressures is $w = c_p T_1 \left[ \left( P_2 / P_1 \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right]$, and derive the corresponding expression for a reversible **isothermal** compression. Evaluate both for air from $100\ \mathrm{kPa}$, $300\ \mathrm{K}$ to $900\ \mathrm{kPa}$, and find the saving from a two-stage adiabatic compression with perfect intercooling.
::: solution
**The adiabatic case.** $P v^{\gamma} = C$, so
$$
w = \int_{1}^{2} P\, dv = \frac{P_2 v_2 - P_1 v_1}{1 - \gamma} = \frac{R \left( T_2 - T_1 \right)}{1 - \gamma} = \frac{c_p \left( T_2 - T_1 \right)}{\gamma - 1} \times \frac{\gamma - 1}{\gamma - 1}
$$
and with $c_p = \gamma R / \left( \gamma - 1 \right)$ and $T_2 = T_1 \left( P_2 / P_1 \right)^{\left( \gamma - 1 \right) / \gamma}$,
$$
\boxed{ w_{\mathrm{ad}} = c_p T_1 \left[ \left( \frac{P_2}{P_1} \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right] }
$$
**The isothermal case.**
$$
w_{\mathrm{iso}} = \int_{1}^{2} P\, dv = R T \ln \frac{v_1}{v_2} = R T_1 \ln \frac{P_2}{P_1}
$$
**The evaluation.** $r = 9$, $T_1 = 300\ \mathrm{K}$, $c_p = 1.005$, $R = 0.287$, $\left( \gamma - 1 \right) / \gamma = 0.2857$:
$$
w_{\mathrm{ad}} = 1.005 \times 300 \times \left( 9^{0.2857} - 1 \right) = 301.5 \times 0.8717 = 262.9\ \mathrm{kJ / kg}
$$
$$
w_{\mathrm{iso}} = 0.287 \times 300 \times \ln 9 = 86.1 \times 2.1972 = 189.2\ \mathrm{kJ / kg}
$$
**The two-stage machine.** With perfect intercooling back to $300\ \mathrm{K}$ and equal stage pressure ratios $\sqrt{9} = 3$:
$$
w_{2\mathrm{st}} = 2 \times 301.5 \times \left( 3^{0.2857} - 1 \right) = 2 \times 301.5 \times 0.3684 = 222.2\ \mathrm{kJ / kg}
$$
**The summary.**
$$
\begin{array}{l c c}
\text{Arrangement} & w\ (\mathrm{kJ / kg}) & \text{Against isothermal} \\
\text{Single-stage adiabatic} & 262.9 & 39\ \%\ \text{over} \\
\text{Two-stage with intercooling} & 222.2 & 17\ \%\ \text{over} \\
\text{Isothermal (the ideal)} & 189.2 & -
\end{array}
$$
**The limit.** With $N$ stages the ratio is $N \left( r^{\left( \gamma - 1 \right) / \gamma N} - 1 \right) / \ln r \to 1$ as $N \to \infty$, so **an infinite number of perfectly intercooled stages is an isothermal compressor** — and the reason nobody builds one is that the intercoolers cost more than the $17\ \%$ of saved work between two and infinity.
**The number that decides it.** A real two-stage machine at $75\ \%$ adiabatic efficiency draws $262.9 / 0.75 = 350\ \mathrm{kJ / kg}$ single-stage and $222.2 / 0.75 = 296\ \mathrm{kJ / kg}$ two-stage; the $54\ \mathrm{kJ / kg}$ saving at $1\ \mathrm{kg / s}$ is **$54\ \mathrm{kW}$**, which is worth about **$350{,}000$ a year** and buys a great deal of intercooler.
*Sanity.* The reason the intercooler's heat is not a free lunch is that it is rejected at $300$ to $320\ \mathrm{K}$, where its exergy content is $1 - 293 / 313 \approx 6\ \%$ — so $54\ \mathrm{kJ / kg}$ of work is bought by $54\ \mathrm{kJ / kg}$ of essentially worthless heat, and the trade is excellent.
:::
:::

::: exercise Design {level=3}
Specify the energy balance, the instrumentation and the uncertainty budget for a performance test of a $250\ \mathrm{kW}$ closed-loop organic Rankine cycle test rig whose evaporator, condenser, turbine and generator are all separately accessible.
::: solution
**The four boundaries and the four balances.**
$$
\begin{array}{l l l}
\text{Evaporator} & \dot{Q}_E = \dot{m} \left( h_2 - h_1 \right) & \text{brine side cross-check: } \dot{m}_b c_{p,b} \Delta T_b \\
\text{Turbine} & \dot{W}_T = \dot{m} \left( h_3 - h_4 \right) & \text{shaft brake, then generator loss} \\
\text{Condenser} & \dot{Q}_C = \dot{m} \left( h_4 - h_1 \right) & \text{cooling-water cross-check} \\
\text{Cycle} & \dot{W}_{\mathrm{net}} = \dot{Q}_E - \dot{Q}_C & \text{the closure test}
\end{array}
$$
**The closure criterion.** The residual
$$
\varepsilon = \frac{\left| \dot{Q}_E - \dot{Q}_C - \dot{W}_{\mathrm{net}} \right|}{\dot{Q}_E}
$$
must be **below $1.5\ \%$** for an ORC test of this size, and a residual above $3\ \%$ means an uninstrumented loss — usually the turbine casing, the generator's cooling fan or the pump seal.
**The instrumentation and its cost.**
$$
\begin{array}{l l c l}
\text{Working-fluid flow} & \text{Coriolis mass meter} & \pm 0.15\ \% & \text{the dominant term; a vortex meter gives } \pm 1\ \% \\
\text{Evaporator } P, T & 0.1\ \%\ \mathrm{FS},\ \mathrm{Pt100}\ \pm 0.1\ \mathrm{K} & \pm 0.4\ \%\ \text{of } \Delta h & \text{the } h \text{ difference is only } 120\ \mathrm{kJ / kg} \\
\text{Turbine shaft} & \text{in-line torque transducer, class } 0.05 & \pm 0.05\ \% & \text{or a calibrated generator, } \pm 0.3\ \% \\
\text{Cooling water} & \text{ultrasonic, } \pm 0.5\ \%,\ 4\text{-wire RTDs} & \pm 0.6\ \%\ \text{of } \dot{Q}_C & \text{the } \Delta T \text{ is } 6\ \mathrm{K} \text{ and its error is } 3\ \% \\
\text{Heat losses} & \text{lagged to } U < 0.05\ \mathrm{W / m^{2} K},\ \text{measured by cooldown} & \pm 1\ \mathrm{kW} & \text{measured once, then subtracted}
\end{array}
$$
**The uncertainty budget.** With the working-fluid enthalpy differences at $\pm 0.4\ \%$ and the flow at $\pm 0.15\ \%$,
$$
u_{\dot{Q}_E} = \sqrt{0.15^{2} + 0.4^{2} + 0.4^{2}} = 0.58\ \%, \qquad
u_{\dot{W}} = 0.05\ \%
$$
and the thermal efficiency's uncertainty is
$$
u_\eta = \sqrt{0.58^{2} + 0.05^{2}} = 0.58\ \%\ \text{relative}
$$
which on a $12\ \%$ efficiency machine is $\pm 0.07$ percentage points — **good enough to certify a guarantee and to detect a $1\ \%$ degradation.**
**The three things that are always forgotten.** **The pump's power**, which is $2$ to $4\ \%$ of the turbine's and is drawn from the same bus as the generator's output. **The turbine's windage** at part load, which is a $1$ to $2\ \mathrm{kW}$ loss at zero flow and makes the mechanical-efficiency curve look non-physical at the origin. **The working-fluid property package**, which for a siloxane or a pentane is a **correlation** with a $1$ to $2\ \%$ enthalpy uncertainty and dominates the whole budget unless the fluid is characterised.
**The one note that saves the test.** **"THE TEST ARTICLE SHALL BE INSTRUMENTED WITH A MINIMUM OF TWO INDEPENDENT ENERGY PATHS AND THE RESIDUAL SHALL BE REPORTED WITH EVERY DATA POINT."** A test that reports only the efficiency is a test that cannot be audited, and a test that reports the residual can be audited and therefore believed.
*Design comment.* The general rule is that **a performance test is an uncertainty budget with a machine attached**, and that the party who chooses the instrumentation class chooses the answer — which is why an acceptance test specification names the instrument classes, the closure criterion and the residual reporting before the rig is built.
:::
:::
