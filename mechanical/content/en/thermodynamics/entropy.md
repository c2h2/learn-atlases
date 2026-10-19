Entropy is the only property in engineering that is defined by an **inequality**, is measured in the same units as heat capacity, has no mechanical analogue, and is conserved by exactly one class of process — the one that never happens.

Its definition is short: $ds = \delta q_{\mathrm{rev}} / T$. Everything else is bookkeeping. The reason the definition uses a **reversible** heat transfer is that $\delta q / T$ for an irreversible path is not a property difference, and the reason a property difference is what we want is that it lets the second law be **counted** instead of merely asserted: $\Delta S_{\mathrm{universe}} \ge 0$ is an arithmetic statement, and the arithmetic is what this lesson is about.

::: warning Seven entropy errors that pass a first-law check
**Computing $\Delta S$ along the actual path.** Entropy is a property, so $\Delta S$ is the same for every path between two states — but it must be **computed** along a reversible one, because $\delta q / T$ is only integrable there. For an irreversible adiabatic expansion from state 1 to state 2, $\Delta S \ne 0$ even though $q = 0$, and the calculation must go $1 \to 2$ by a reversible path, for instance an isotherm plus an isochore. **Writing $\Delta S = \int \delta Q / T$ for a closed system and calling it the entropy change.** That integral is the **entropy transfer with heat**, and the entropy change is that **plus** the generation: $\Delta S = \int \delta Q / T + S_{\mathrm{gen}}$. Confusing the two is the single most common error in the subject, and it makes every real process look like it destroys entropy. **Applying the ideal-gas isentropic relations to a real gas.** $P v^k = $ constant is exact only for an ideal gas with **constant** specific heats, and steam at $10\ \mathrm{MPa}$ and $400\ {}^{\circ}\mathrm{C}$ departs from it by enough to misplace a turbine's exit quality by $0.05$ — which is $5\ \%$ of the last stage's life. **Use the tables.** **Dropping the $- R \ln \left( P_2 / P_1 \right)$ term.** $\Delta s = c_p \ln \left( T_2 / T_1 \right) - R \ln \left( P_2 / P_1 \right)$ has two terms that are often of **opposite sign and similar size**, and dropping the second turns a $\Delta s$ of $- 0.02$ into $+ 0.30$ and reports a process as generating entropy when it is generating none. **Dividing by the system temperature instead of the boundary temperature.** The entropy transfer is $\delta Q / T_{\mathrm{boundary}}$, and when a gas at $800\ \mathrm{K}$ gives heat to a wall at $500\ \mathrm{K}$ the two choices differ by $60\ \%$ and the difference **is** the generation. **Treating entropy as "disorder".** The word does no work, misleads on mixtures, and fails on the case that matters most: a **perfect crystal at $0\ \mathrm{K}$** has zero entropy and a **rubber band under tension** has less entropy than a slack one. Entropy is a count of **accessible microstates**, and the count is what the thermometers measure. **Assuming $\Delta S_{\mathrm{system}} \ge 0$.** A refrigerator's inside, a freezing tray of water and every crystallising melt have **negative** entropy changes, and the second law is satisfied by a larger positive change somewhere else. The inequality applies to the **universe**, or to a system plus the named surroundings, and to nothing else.
:::

## The property and its bookkeeping

::: definition The definition and the balance {#def-entropy}
**The definition.**
$$
d S \equiv \left( \frac{\delta Q}{T} \right)_{\mathrm{rev}}, \qquad
\Delta S_{12} = \int_1^2 \left( \frac{\delta Q}{T} \right)_{\mathrm{rev}}
$$
**The Clausius inequality**, valid for every cycle:
$$
\oint \frac{\delta Q}{T} \le 0, \qquad \text{equality if and only if reversible}
$$
**The entropy balance for a closed system.**
$$
\boxed{ \Delta S_{\mathrm{sys}} = \underbrace{\int \frac{\delta Q}{T_{\mathrm{boundary}}}}_{\text{transfer with heat}} + \underbrace{S_{\mathrm{gen}}}_{\ge 0} }
$$
**The entropy balance for a control volume.**
$$
\frac{d S_{\mathrm{CV}}}{d t} = \sum \frac{\dot{Q}_j}{T_j} + \sum_{\mathrm{in}} \dot{m} s - \sum_{\mathrm{out}} \dot{m} s + \dot{S}_{\mathrm{gen}}
$$
**The steady-flow form, which is the one that gets used.**
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{out}} \dot{m} s - \sum_{\mathrm{in}} \dot{m} s - \sum \frac{\dot{Q}_j}{T_j} \ \ge 0
$$
**The universe.** $\Delta S_{\mathrm{sys}} + \Delta S_{\mathrm{surr}} = S_{\mathrm{gen}} \ge 0$, and the **surroundings** must be named: for a reservoir at $T_0$ receiving $Q_0$, $\Delta S_{\mathrm{surr}} = Q_0 / T_0$.
**The units, and why they bother people.** $\mathrm{kJ / kg \cdot K}$, the same as a specific heat, because $d s = c\, d T / T$ integrates a heat capacity over a logarithm of temperature. **An entropy difference is a heat capacity times a logarithm**, and that is the whole of what the number means.
:::

::: definition The two $T ds$ equations {#def-tds}
Combining the first and second laws for an internally reversible process of a simple compressible substance:
$$
\boxed{ T\, ds = du + P\, dv }, \qquad
\boxed{ T\, ds = dh - v\, dP }
$$
**Why they are the most useful equations in the subject.** They contain **no** assumption of process, path, or ideal-gas behaviour — they relate **properties**, so they hold for any two neighbouring equilibrium states of any substance, reached by any process, reversible or not.
**The ideal-gas integrations.**
$$
s_2 - s_1 = c_v^{\mathrm{avg}} \ln \frac{T_2}{T_1} + R \ln \frac{v_2}{v_1}
= c_p^{\mathrm{avg}} \ln \frac{T_2}{T_1} - R \ln \frac{P_2}{P_1}
$$
**The number that shows why the second term matters.** Air from $100\ \mathrm{kPa}$, $300\ \mathrm{K}$ to $800\ \mathrm{kPa}$, $543\ \mathrm{K}$ isentropically:
$$
\Delta s = 1.005 \ln \frac{543}{300} - 0.287 \ln 8 = 0.5953 - 0.5953 = 0
$$
**Dropping the pressure term gives $+ 0.595\ \mathrm{kJ / kg \cdot K}$** and reports an isentropic compression as generating $0.595\ \mathrm{kJ / kg \cdot K}$ of entropy — an error of **infinite relative size**.
**The incompressible-substance integration.**
$$
s_2 - s_1 = c \ln \frac{T_2}{T_1}
$$
**The evaluation.** $100\ \mathrm{kg}$ of water from $20$ to $80\ {}^{\circ}\mathrm{C}$:
$$
\Delta S = 100 \times 4.18 \times \ln \frac{353.15}{293.15} = 418 \times 0.1863 = 77.9\ \mathrm{kJ / K}
$$
**The phase change.** At constant $T$ and $P$,
$$
s_{fg} = \frac{h_{fg}}{T_{\mathrm{sat}}}, \qquad s = s_f + x\, s_{fg}
$$
**The number that makes the dome a diagram.** For water at $100\ {}^{\circ}\mathrm{C}$: $s_{fg} = 2{,}256.5 / 373.15 = 6.047\ \mathrm{kJ / kg \cdot K}$, and at $10\ \mathrm{kPa}$: $s_{fg} = 2{,}392.1 / 318.93 = 7.499$. **The dome is taller at low pressure**, which is why a condenser's isotherm is a long horizontal line and a high-pressure boiler's is short — and why the **wet-steam region of a $T$–$s$ diagram is a triangle and not a semicircle**.
:::

::: definition Isentropic processes and the $T$–$s$ diagram {#def-isentropic}
**Ideal gas, constant specific heats, $s_2 = s_1$:**
$$
\frac{T_2}{T_1} = \left( \frac{v_1}{v_2} \right)^{k - 1} = \left( \frac{P_2}{P_1} \right)^{\left( k - 1 \right) / k}, \qquad
P v^{k} = \text{constant}
$$
**The four polytropes on one $T$–$s$ diagram, in order of steepness.**
$$
\begin{array}{l l l}
s = \text{const}\ \left(n = k \right) & \text{vertical line} & \text{isentropic} \\
P v = \text{const}\ \left(n = 1 \right) & \text{less steep} & \text{isothermal for an ideal gas} \\
v = \text{const}\ \left(n \to \infty \right) & \text{steeper than isentropic} & \text{isochoric} \\
P = \text{const}\ \left(n = 0 \right) & \text{flattest} & \text{isobaric}
\end{array}
$$
**The ordering, which is a good examination question.** On a $T$–$s$ diagram the **isochore is steeper than the isentrope is steeper than the isobar**, and the slopes are
$$
\left( \frac{\partial T}{\partial s} \right)_v = \frac{T}{c_v}, \qquad
\left( \frac{\partial T}{\partial s} \right)_P = \frac{T}{c_p}, \qquad
\left( \frac{\partial T}{\partial s} \right)_{\mathrm{rev, adiab}} \to \infty
$$
**The number that makes the slopes useful.** At $300\ \mathrm{K}$ for air, $\left( \partial T / \partial s \right)_v = 300 / 0.718 = 418\ \mathrm{K}$ per $\mathrm{kJ / kg \cdot K}$ and $\left( \partial T / \partial s \right)_P = 300 / 1.005 = 299$. **A $1\ \mathrm{kJ / kg \cdot K}$ entropy rise at constant volume costs $418\ \mathrm{K}$; at constant pressure only $299\ \mathrm{K}$** — and the difference is exactly the $P v$ work the fluid does in the isobaric case.
**The area rule, which is the reason the diagram is drawn.** On a $T$–$s$ diagram:
$$
q_{\mathrm{rev}} = \int T\, ds = \text{area under the path}, \qquad
w_{\mathrm{rev, adiab}} = - \int v\, dP = \text{area to the left of the path on a } P \text{–} v \text{ diagram}
$$
**The consequence for cycle design.** A cycle's **net work** equals its **net heat**, which equals the **area enclosed on a $T$–$s$ diagram** — so making a cycle better means **enclosing more area**, which is done by raising the top of the loop, lowering its bottom, or pushing its sides apart. Every cycle improvement in the history of power generation is one of those three moves, and the $T$–$s$ diagram is the only place where they are visible before the machine is built.
:::

::: definition Where entropy is generated, and how much {#def-gen}
$$
\begin{array}{l l l}
\text{Process} & S_{\mathrm{gen}} & \text{Per unit} \\
\text{Heat } Q \text{ across } \Delta T & Q \left( 1 / T_c - 1 / T_h \right) & \text{always positive} \\
\text{Throttling, ideal gas} & m R \ln \left( P_1 / P_2 \right) & \text{isothermal, so } \Delta T = 0 \\
\text{Free expansion to } n \times \text{volume} & m R \ln n & \text{no heat, no work, } \Delta U = 0 \\
\text{Mixing two ideal gases} & - m R \sum y_i \ln y_i & \text{the entropy of mixing} \\
\text{Mixing like fluids at } T_1, T_2 & m c \ln \left[ \frac{T_1 + T_2}{2 \sqrt{T_1 T_2}} \right] & \text{zero only if } T_1 = T_2 \\
\text{Electrical work } W \text{ into a body at } T & W / T & \text{all of it destroyed} \\
\text{Friction work } W \text{ at } T & W / T & \text{all of it destroyed} \\
\text{Combustion} & \text{large}\ \left( \sim 1.5\ \mathrm{kJ / kg \cdot K} \right) & \text{the largest single loss in any engine}
\end{array}
$$
**The heat-transfer case, evaluated.** $100\ \mathrm{kJ}$ from $800\ \mathrm{K}$ to $400\ \mathrm{K}$:
$$
S_{\mathrm{gen}} = 100 \left( \frac{1}{400} - \frac{1}{800} \right) = 100 \times 0.00125 = 0.125\ \mathrm{kJ / K}, \qquad
W_{\mathrm{dest}} = 300 \times 0.125 = 37.5\ \mathrm{kJ}
$$
**$37.5\ \%$ of the heat's potential work destroyed by the transfer alone**, before any machine sees it. Halving the difference — $800$ to $600\ \mathrm{K}$ — gives $100 \times \left( 1 / 600 - 1 / 800 \right) = 0.0417\ \mathrm{kJ / K}$ and $12.5\ \mathrm{kJ}$ destroyed, **one third** as much.
**The mixing case, evaluated.** Two streams of air, $2\ \mathrm{kg / s}$ at $400\ \mathrm{K}$ and $1\ \mathrm{kg / s}$ at $300\ \mathrm{K}$, same pressure, adiabatic:
$$
T_f = \frac{2 \times 400 + 1 \times 300}{3} = 366.7\ \mathrm{K}
$$
$$
\dot{S}_{\mathrm{gen}} = 2 c_p \ln \frac{366.7}{400} + 1 \times c_p \ln \frac{366.7}{300}
= 2 \times 1.005 \times \left( - 0.0870 \right) + 1.005 \times 0.2027 = 0.0314\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{dest}} = 293.15 \times 0.0314 = 0.98\ \mathrm{kW}
$$
**$1\ \mathrm{kW}$ destroyed in a pipe tee** that mixes $3\ \mathrm{kg / s}$ of air. The equivalent is a $1\ \mathrm{kW}$ heater running continuously, and the reason no one notices is that the alternative — a **stratified** duct — costs more than $1\ \mathrm{kW}$ of electricity.
**The number that ends the "free cooling" argument.** Mixing $1\ \mathrm{kg / s}$ of $35\ {}^{\circ}\mathrm{C}$ outside air into $4\ \mathrm{kg / s}$ of $24\ {}^{\circ}\mathrm{C}$ supply air destroys
$$
T_f = \frac{1 \times 308.15 + 4 \times 297.15}{5} = 299.35\ \mathrm{K}
$$
$$
\dot{S}_{\mathrm{gen}} = 1 \times 1.005 \ln \frac{299.35}{308.15} + 4 \times 1.005 \ln \frac{299.35}{297.15}
= - 0.0290 + 0.0296 = 0.0006\ \mathrm{kW / K}
$$
and the destroyed work is $293.15 \times 0.0006 = 0.18\ \mathrm{W}$ — **negligible**, which is why mixing is the right answer for economiser cycles and the wrong answer for a $400\ \mathrm{K}$ and a $300\ \mathrm{K}$ stream. **The rule is that mixing destroys work in proportion to the square of the temperature difference**: $\dot{S}_{\mathrm{gen}} \approx \dot{m} c_p \left( \Delta T \right)^{2} / \left( 8 T^{2} \right)$ for small differences, which is $0.0004$ of the value at $100\ \mathrm{K}$ and $0.04$ at $10\ \mathrm{K}$.
:::

::: definition Entropy, information and the third law {#def-third}
**The statistical definition.**
$$
S = k_B \ln \Omega, \qquad k_B = 1.380\,649 \times 10^{- 23}\ \mathrm{J / K}
$$
**The number that makes the two definitions agree.** One mole of an ideal gas occupying twice the volume multiplies its accessible microstates by $2^{N_A}$, so
$$
\Delta S = k_B N_A \ln 2 = R \ln 2 = 5.763\ \mathrm{J / mol \cdot K}
$$
which is **exactly** the thermodynamic result $\Delta S = R \ln \left( V_2 / V_1 \right)$ for an isothermal expansion. The agreement is the deepest quantitative result in the subject and it was obtained by Boltzmann in **1877** and by Gibbs in **1902** from entirely different directions.
**The third law.** The entropy of a **perfect crystalline element or compound** is zero at $0\ \mathrm{K}$, so absolute entropies exist and are tabulated:
$$
s \left( T, P \right) = \int_0^{T} \frac{c_P}{T}\, d T - \int_{P_0}^{P} \left( \frac{\partial v}{\partial T} \right)_P d P
$$
**The number that shows the third law is not a curiosity.** The standard molar entropy of $\mathrm{O_2}$ at $298.15\ \mathrm{K}$ is $205.15\ \mathrm{J / mol \cdot K}$, and every combustion calculation in [[thermodynamics/mixtures-combustion]] uses it. Without the third law only entropy **differences** would exist and the **absolute** entropies needed for chemical equilibrium would be unavailable — which is why **Nernst**'s heat theorem of **1906** was as important to chemistry as the second law itself.
**The residual entropy that qualifies the law.** Ice, carbon monoxide and nitrous oxide retain a **configurational** entropy at $0\ \mathrm{K}$ because their molecules can be arranged in more than one way with the same energy:
$$
S_{\mathrm{res}} = R \ln 2 = 5.76\ \mathrm{J / mol \cdot K}\ \text{for CO}
$$
**The number that is measured and agrees.** For ice the residual entropy is $R \ln \left( 3 / 2 \right) = 3.37\ \mathrm{J / mol \cdot K}$, computed by **Linus Pauling** in **1935** from the count of hydrogen-bond arrangements, and confirmed calorimetrically within a few per cent. **The third law survives because a perfect crystal is an idealisation and the law is about the idealisation.**
**The information link.** $S = k_B \ln \Omega$ makes entropy a logarithm of missing information, and **Landauer's principle** of **1961** makes the link operational: erasing one bit at temperature $T$ dissipates at least
$$
k_B T \ln 2 = 2.87 \times 10^{- 21}\ \mathrm{J} \quad \text{at } 300\ \mathrm{K}
$$
**The number that makes it an engineering question.** A $100\ \mathrm{TFLOP}$ processor at $300\ \mathrm{K}$ performing $10^{14}$ irreversible bit operations per second has a **Landauer floor** of
$$
10^{14} \times 2.87 \times 10^{- 21} = 0.29\ \mathrm{\mu W}
$$
against an actual dissipation of **$10^{5}\ \mathrm{W}$** — a factor of **$3 \times 10^{11}$**. **The second law is not the limit on computing; device physics is**, and the gap is the most quoted and least useful number in the physics of information.
:::

::: widget plot
f: 1/x - 1; 0.3*(1/x - 1)
x: 0.40, 0.99
y: 0, 1.6
labels: entropy generated per kJ of heat; destroyed work per kJ at T0 over Th = 0.3
caption: Entropy generated per kilojoule of heat transferred from a hot reservoir down to a cold one whose temperature is the fraction $x$ of the hot reservoir's, from $S_{\mathrm{gen}} / Q = 1 / T_c - 1 / T_h$ in reduced units, with the lower curve showing the same quantity multiplied by $T_0 / T_h = 0.3$ to give the **fraction of the heat's potential work that the transfer destroys**. The curve diverges as the cold reservoir falls away: at $x = 0.5$ the generation is $1.0$ per unit of heat and $30\ \%$ of the potential work is destroyed, at $x = 0.9$ it is $0.11$ and $3.3\ \%$, and at $x = 0.99$ it is $0.0101$ and $0.3\ \%$. **Every heat exchanger in the world is a point on this curve**, and its position is the design decision — the cost of moving left being exchanger area and the cost of moving right being fuel.
:::

## Worked cases

::: example Entropy generation in a heat exchanger {#ex-hx}
$2\ \mathrm{kg / s}$ of oil with $c_p = 2.1\ \mathrm{kJ / kg \cdot K}$ is cooled from $150\ {}^{\circ}\mathrm{C}$ to $60\ {}^{\circ}\mathrm{C}$ by $1.5\ \mathrm{kg / s}$ of water entering at $15\ {}^{\circ}\mathrm{C}$ in a counter-flow exchanger. Find the water outlet temperature, the entropy generation and the destroyed work.
::: solution
**The energy balance.**
$$
\dot{Q} = 2 \times 2.1 \times \left( 150 - 60 \right) = 378\ \mathrm{kW}
$$
$$
\Delta T_w = \frac{378}{1.5 \times 4.18} = 60.3\ \mathrm{K}, \qquad T_{w,\mathrm{out}} = 75.3\ {}^{\circ}\mathrm{C}
$$
**The check that the exchanger is physically possible.** In counter-flow the terminal differences are $150 - 75.3 = 74.7\ \mathrm{K}$ at the hot-inlet end and $60 - 15 = 45\ \mathrm{K}$ at the hot-outlet end, so the **minimum difference is $45\ \mathrm{K}$** and the exchanger is nowhere near pinched. Note that the hot outlet at $60\ {}^{\circ}\mathrm{C}$ sits **below** the cold outlet at $75.3\ {}^{\circ}\mathrm{C}$, which counter-flow permits and parallel-flow does not.
**The entropy changes.**
$$
\dot{S}_{\mathrm{oil}} = 2 \times 2.1 \times \ln \frac{333.15}{423.15} = 4.2 \times \left( - 0.2339 \right) = - 0.982\ \mathrm{kW / K}
$$
$$
\dot{S}_{\mathrm{water}} = 1.5 \times 4.18 \times \ln \frac{348.45}{288.15} = 6.27 \times 0.1890 = 1.185\ \mathrm{kW / K}
$$
**The generation.**
$$
\dot{S}_{\mathrm{gen}} = 1.185 - 0.982 = 0.203\ \mathrm{kW / K}
$$
$$
\dot{W}_{\mathrm{dest}} = 293.15 \times 0.203 = 59.5\ \mathrm{kW}
$$
**The verdict.** The exchanger transfers $378\ \mathrm{kW}$ and destroys $59.5\ \mathrm{kW}$ of work-capable energy — **$15.7\ \%$** of the hot stream's exergy input, which for the oil is
$$
\dot{X}_{\mathrm{oil}} = \dot{m} c_p \left[ \Delta T - T_0 \ln \frac{T_1}{T_2} \right]
= 4.2 \times \left[ 90 - 293.15 \times 0.2339 \right] = 4.2 \times 21.4 = 89.9\ \mathrm{kW}
$$
so the exchanger destroys $59.5 / 89.9 = 66\ \%$ of the available exergy and delivers $34\ \%$ of it to the water. **A heat exchanger is a $66\ \%$-efficient exergy destroyer**, and that is a **good** number for a $45\ \mathrm{K}$ difference.
**The improvement, priced.** Halving the temperature differences by **doubling the area** would roughly halve the generation to $0.10\ \mathrm{kW / K}$ and recover $29\ \mathrm{kW}$, worth about **$80{,}000$ currency units per year** of fuel at $25\ \mathrm{currency\ units / MWh}$ — against an extra exchanger costing perhaps $120{,}000$. **The payback is eighteen months and the exchanger is still not pinched**, which is the correct order of design care.
*Sanity.* The reason the oil's entropy falls and the water's rises by more is that the same heat is removed at a **high** temperature from the oil and delivered at a **low** temperature to the water, and $Q / T$ is larger at the low temperature. The whole of the generation is in that mismatch, and the whole of the design is in reducing it.
:::
:::

::: example Throttling versus expansion {#ex-throttle-exp}
Steam at $4\ \mathrm{MPa}$ and $400\ {}^{\circ}\mathrm{C}$ is expanded to $0.4\ \mathrm{MPa}$, first in a throttle and then in an isentropic turbine. Compare the exit states, the work and the destroyed work.
::: solution
**The inlet.** $h_1 = 3{,}213.6\ \mathrm{kJ / kg}$, $s_1 = 6.7690\ \mathrm{kJ / kg \cdot K}$.
**Case 1: the throttle.** $h_2 = h_1 = 3{,}213.6\ \mathrm{kJ / kg}$. At $0.4\ \mathrm{MPa}$, $h_g = 2{,}738.1$, so the steam is **superheated**, and interpolating:
$$
T_2 \approx 200\ {}^{\circ}\mathrm{C}, \qquad s_2 \approx 7.9028\ \mathrm{kJ / kg \cdot K}
$$
$$
s_{\mathrm{gen}} = 7.9028 - 6.7690 = 1.1338\ \mathrm{kJ / kg \cdot K}, \qquad
w_{\mathrm{dest}} = 293.15 \times 1.1338 = 332\ \mathrm{kJ / kg}
$$
**Case 2: the isentropic turbine.** $s_2 = s_1 = 6.7690$. At $0.4\ \mathrm{MPa}$, $s_g = 6.8958$, so the exit is **wet**:
$$
x_2 = \frac{6.7690 - 1.7765}{5.1191} = 0.9751, \qquad
h_2 = 604.72 + 0.9751 \times 2{,}133.4 = 2{,}685.1\ \mathrm{kJ / kg}
$$
$$
w_T = 3{,}213.6 - 2{,}685.1 = 528.5\ \mathrm{kJ / kg}, \qquad s_{\mathrm{gen}} = 0
$$
**The comparison.**
$$
\begin{array}{l c c c}
& h_2 & T_2 & w \text{ obtained} \\
\text{Throttle} & 3{,}213.6 & 200\ {}^{\circ}\mathrm{C} & 0 \\
\text{Isentropic turbine} & 2{,}685.1 & 143.6\ {}^{\circ}\mathrm{C} & 528.5\ \mathrm{kJ / kg}
\end{array}
$$
**The throttle leaves the steam $56\ {}^{\circ}\mathrm{C}$ hotter and $528.5\ \mathrm{kJ / kg}$ richer in enthalpy** — and destroys $332\ \mathrm{kJ / kg}$ of work-capable energy doing it.
**The reconciliation, which is the point of the example.** The destroyed work is $332\ \mathrm{kJ / kg}$ and the obtainable work is $528.5\ \mathrm{kJ / kg}$, and they are **not equal**. The difference is that the turbine's work is measured against an exit at $0.4\ \mathrm{MPa}$, while the throttle's destruction is measured against the **environment** at $100\ \mathrm{kPa}$:
$$
\psi_1 - \psi_2 = \left( h_1 - h_2 \right) - T_0 \left( s_1 - s_2 \right) = 0 - 293.15 \times \left( - 1.1338 \right) = 332\ \mathrm{kJ / kg}
$$
**The number that decides whether to install the turbine.** $528.5\ \mathrm{kJ / kg}$ at, say, $20\ \mathrm{kg / s}$ of steam is **$10.6\ \mathrm{MW}$** of shaft power, and a small back-pressure turbine for that duty costs about $1.5\ \mathrm{MW}$ and takes eighteen months to install. **The throttle is free and destroys $6.6\ \mathrm{MW}$ continuously**, which at $60\ \mathrm{currency\ units / MWh}$ is **$5.5\ \mathrm{million}$ currency units a year** — and the reason so many plants throttle is that the destruction is invisible on a heat-and-mass balance, because the **energy** is perfectly conserved.
*Sanity.* The reason the throttled steam ends **hotter** than the expanded steam is that the throttle keeps the enthalpy and the turbine removes it, and in the superheated region enthalpy and temperature go together. The reason the throttle's exit is superheated while the turbine's is wet is the same fact read on the $h$–$s$ diagram: a horizontal line from a superheated state stays superheated and a vertical line drops into the dome.
:::
:::

::: example Entropy and the second law of a mixing process {#ex-mix}
A rigid insulated $0.5\ \mathrm{m^{3}}$ tank is divided into two equal halves by a membrane, one side containing air at $500\ \mathrm{K}$ and $200\ \mathrm{kPa}$ and the other at $300\ \mathrm{K}$ and $100\ \mathrm{kPa}$. The membrane bursts. Find the final state, the entropy generation and the destroyed work.
::: solution
**The masses.**
$$
m_A = \frac{200 \times 0.25}{0.287 \times 500} = 0.3484\ \mathrm{kg}, \qquad
m_B = \frac{100 \times 0.25}{0.287 \times 300} = 0.2892\ \mathrm{kg}
$$
**The final temperature.** Rigid and insulated, so $\Delta U = 0$:
$$
T_f = \frac{m_A T_A + m_B T_B}{m_A + m_B}
= \frac{0.3484 \times 500 + 0.2892 \times 300}{0.6376} = 409.4\ \mathrm{K}
$$
**The final pressure.**
$$
P_f = \frac{\left( m_A + m_B \right) R T_f}{V} = \frac{0.6376 \times 0.287 \times 409.4}{0.5} = 149.9\ \mathrm{kPa}
$$
**The entropy change, computed along a reversible path for each mass.** Each portion goes from its own initial $\left( T, V \right)$ to the final $\left( T_f, V_{\mathrm{each}} \right)$ where each now occupies the **whole** $0.5\ \mathrm{m^{3}}$:
$$
\Delta S_A = m_A \left[ c_v \ln \frac{T_f}{T_A} + R \ln \frac{V_f}{V_A} \right]
= 0.3484 \left[ 0.718 \ln \frac{409.4}{500} + 0.287 \ln 2 \right]
$$
$$
= 0.3484 \left[ - 0.1404 + 0.1990 \right] = 0.3484 \times 0.0586 = 0.0204\ \mathrm{kJ / K}
$$
$$
\Delta S_B = 0.2892 \left[ 0.718 \ln \frac{409.4}{300} + 0.287 \ln 2 \right]
= 0.2892 \left[ 0.2266 + 0.1990 \right] = 0.1233\ \mathrm{kJ / K}
$$
$$
S_{\mathrm{gen}} = 0.0204 + 0.1233 = 0.1437\ \mathrm{kJ / K}
$$
**The destroyed work.**
$$
W_{\mathrm{dest}} = 293.15 \times 0.1437 = 42.1\ \mathrm{kJ}
$$
**The check by an independent path.** The same final state reached from a hypothetical state in which the two portions have been brought separately and reversibly to $T_f$ and then mixed at constant temperature and total pressure gives the same $0.1437\ \mathrm{kJ / K}$ — the calculation is path-independent, which is the point.
**The reading.** **Two contributions of comparable size**: the temperature-equalising part and the pressure-equalising (mixing) part. Separating them:
$$
\text{thermal mixing only} = m_A c_p \ln \frac{T_f}{T_A} + m_B c_p \ln \frac{T_f}{T_B} = 0.3484 \times 1.005 \times \left( - 0.1960 \right) + 0.2892 \times 1.005 \times 0.3165 = 0.0599
$$
$$
\text{pressure and composition} = 0.1437 - 0.0599 = 0.0838\ \mathrm{kJ / K}
$$
**$58\ \%$ of the generation is the pressure equalisation and $42\ \%$ the temperature equalisation** — and the reason this matters is that a designer who "just mixes the streams" pays for both, while a designer who runs the hot stream through a heat engine first pays for one.
*Sanity.* The reason $S_{\mathrm{gen}}$ is positive although the tank is insulated is that insulation prevents **transfer** and not **generation**, and the whole of the entropy here is generated inside the control volume by two unrestrained equalisations. The reason the calculation uses $\ln \left( V_f / V_A \right) = \ln 2$ for **both** portions is that each ideal gas expands to fill the whole tank as though the other were not there — **Dalton's law applied to entropy**, and the fact that it works is the reason the entropy of mixing of **like** gases is not a paradox.
:::
:::

::: example An isentropic efficiency from entropy {#ex-isen}
Air in a compressor goes from $100\ \mathrm{kPa}$, $293\ \mathrm{K}$ to $700\ \mathrm{kPa}$, $560\ \mathrm{K}$. Find the isentropic efficiency, the entropy generation and the second-law efficiency.
::: solution
**The entropy change.**
$$
\Delta s = 1.005 \ln \frac{560}{293} - 0.287 \ln 7
= 1.005 \times 0.6490 - 0.287 \times 1.9459 = 0.6522 - 0.5585 = 0.0937\ \mathrm{kJ / kg \cdot K}
$$
**The entropy generation.** Adiabatic, so $s_{\mathrm{gen}} = \Delta s = 0.0937\ \mathrm{kJ / kg \cdot K}$ and
$$
w_{\mathrm{dest}} = 293.15 \times 0.0937 = 27.5\ \mathrm{kJ / kg}
$$
**The isentropic exit temperature.**
$$
T_{2s} = 293 \times 7^{0.2857} = 293 \times 1.7160 = 502.8\ \mathrm{K}
$$
**The efficiency.**
$$
\eta_C = \frac{h_{2s} - h_1}{h_2 - h_1} = \frac{1.005 \times \left( 502.8 - 293 \right)}{1.005 \times \left( 560 - 293 \right)} = \frac{210.7}{268.3} = 78.5\ \%
$$
**The second-law efficiency.** The exergy of the work input is the work itself, and the exergy **recovered** in the stream is the exergy increase:
$$
\Delta \psi = \Delta h - T_0 \Delta s = 268.3 - 293.15 \times 0.0937 = 268.3 - 27.5 = 240.8\ \mathrm{kJ / kg}
$$
$$
\eta_{\mathrm{II}} = \frac{\Delta \psi}{w_{\mathrm{in}}} = \frac{240.8}{268.3} = 89.7\ \%
$$
**The two efficiencies side by side, which is the lesson.** $\eta_C = 78.5\ \%$ and $\eta_{\mathrm{II}} = 89.7\ \%$, and **the second-law efficiency is higher**. The reason is that the isentropic efficiency measures the compressor against a **reversible machine that ends at a different state** — the isentropic exit at $502.8\ \mathrm{K}$ — while the second-law efficiency measures it against the **same** exit state reached reversibly. The isentropic efficiency therefore **penalises the compressor for the heating it could not avoid**, and the second-law efficiency does not.
**The number that shows the difference matters.** For a **turbine** the two efficiencies move the other way: an $88\ \%$ isentropic efficiency on a steam turbine expanding into the dome corresponds to a second-law efficiency of about $93\ \%$, and the $5$-point gap is the reason a turbine's performance guarantee and its exergy audit disagree by an amount that must be explained to a customer.
*Sanity.* The reason $s_{\mathrm{gen}} = \Delta s$ exactly is that the compressor is adiabatic, so there is no entropy transfer with heat and the balance has only two terms. The reason the entropy change is **positive but small** — $0.094$ against a $\Delta s$ of $0.65$ from the temperature rise alone — is that the two terms in $\Delta s$ almost cancel, and the near-cancellation is exactly what an efficient compression looks like on an $h$–$s$ diagram.
:::
:::

::: history
**Rudolf Clausius** wrote $d S = \delta Q / T$ in **1865** and chose the word *Entropie* from the Greek *τροπή*, a turning, so that it "should resemble the word *Energie*" — a deliberate near-homonym that has caused a century of confusion and that he admitted in the same paragraph was a fault. **The statistical reading** came from **Boltzmann** in **1877**, whose tomb at the Zentralfriedhof in Vienna carries $S = k \log W$ — carved, at his request, with the constant written $k$ and not $k_B$, and with $W$ and not $\Omega$, which is why the symbol in every textbook is the one on the gravestone. **Gibbs** published the ensemble form in **1902** and **Planck** inscribed the constant on Boltzmann's tomb in **1933**, fifty-six years after it was derived. **The third law** is **Walther Nernst**'s of **1906**, arrived at from the observation that chemical reactions at low temperature do no work and that free energy and enthalpy converge; **Max Planck** gave it the entropy formulation in **1911** and **G. N. Lewis**, measuring the entropies of imperfect crystals in the **1930s**, found discrepancies that **Linus Pauling** resolved in **1935** by counting the hydrogen-bond arrangements in ice and predicting a residual entropy of $R \ln (3/2)$ — one of the few occasions on which a **combinatorial argument about molecules** anticipated a calorimetric measurement. **Josiah Willard Gibbs** had already noticed in **1875** that the entropy of mixing of two **identical** gases must vanish, and the resulting **Gibbs paradox** — why does the entropy jump discontinuously when the two gases become merely *very similar* rather than identical — was resolved only by **quantum indistinguishability**, which is why the third law and the counting of states are both waiting on the same physics. **Landauer's principle** of **1961** and **Bennett's** demonstrations of **1982** completed the circle back to **Szilárd's** engine of **1929**, which was the first machine in which a **bit** did thermodynamic work.
:::

## Where this leads

Entropy is the machinery behind [[thermodynamics/exergy]], the vertical axis of every cycle in [[thermodynamics/power-cycles]], the property tabulated in [[thermodynamics/pure-substances]], and the absolute scale that makes the equilibria of [[thermodynamics/mixtures-combustion]] computable.

::: summary
- $ds = \delta q_{\mathrm{rev}} / T$ defines a property; the change must be **computed** along a reversible path even when the real path is not.
- $\Delta S = \int \delta Q / T_{\mathrm{boundary}} + S_{\mathrm{gen}}$, and the two terms are the transfer and the generation — confusing them makes real processes appear to destroy entropy.
- The two $T ds$ equations hold between neighbouring equilibrium states of any substance by any path, which is why they are the most-used equations in the subject.
- $\Delta s = c_p \ln (T_2 / T_1) - R \ln (P_2 / P_1)$ has two terms of opposite sign, and dropping the second turns an isentrope into an entropy generator.
- Heat transfer across a finite difference, throttling, mixing, free expansion, friction and resistance are the six sources of generation, and combustion is the largest of all.
- A $45\ \mathrm{K}$-difference heat exchanger destroys two thirds of the exergy it moves, and that is a good number.
- $S = k_B \ln \Omega$ and the third law give absolute entropies, without which chemical equilibrium could not be computed.
:::

::: quiz
A gas expands adiabatically from state 1 to state 2 along an irreversible path. Which statement is correct?
- [ ] $\Delta s = 0$ because no heat crosses the boundary
- [x] $\Delta s = s_{\mathrm{gen}} > 0$, and it must be computed along a reversible path between the same two states
- [ ] $\Delta s < 0$ because the process is irreversible
- [ ] $\Delta s$ cannot be determined because $\delta q / T$ is not integrable
::: solution
The entropy balance is $\Delta s = \int \delta q / T_{\mathrm{boundary}} + s_{\mathrm{gen}} = 0 + s_{\mathrm{gen}}$, and since the process is irreversible $s_{\mathrm{gen}} > 0$. Entropy is a **property**, so the difference is obtained by evaluating $c_p \ln (T_2 / T_1) - R \ln (P_2 / P_1)$ between the two end states — a reversible-path calculation — and the result is the generation. This is the single most-tested idea in the chapter, and the trap answer is the one that confuses **entropy transfer** with **entropy change**.
:::
:::

## Exercises

::: exercise Units {level=1 check="6.047"}
Give the entropy of vaporisation of water at $100\ \mathrm{C}$ in kilojoules per kilogram-kelvin, using $h_{fg} = 2256.5\ \mathrm{kJ / kg}$.
::: solution
$s_{fg} = 2256.5 / 373.15 = 6.047\ \mathrm{kJ / kg \cdot K}$.
:::
:::

::: exercise Slope {level=1 check="299"}
Give the slope $(\partial T / \partial s)_P$ in kelvin per kilojoule per kilogram-kelvin for air at $300\ \mathrm{K}$ with $c_p = 1.005$.
::: solution
$T / c_p = 300 / 1.005 = 299\ \mathrm{K}$.
:::
:::

::: exercise Free expansion {level=1 check="0.199"}
Give the specific entropy generated when an ideal gas with $R = 0.287$ expands freely to twice its volume, in kilojoules per kilogram-kelvin.
::: solution
$s_{\mathrm{gen}} = R \ln 2 = 0.287 \times 0.6931 = 0.199\ \mathrm{kJ / kg \cdot K}$.
:::
:::

::: exercise Third law {level=1 check="0"}
Give the entropy in joules per mole-kelvin of a perfect crystalline element at absolute zero.
::: solution
$0$ — the third law, which is why absolute entropies exist.
:::
:::

::: exercise Heat transfer {level=1 check="37.5"}
Give the destroyed work in kilojoules when $100\ \mathrm{kJ}$ flows from $800\ \mathrm{K}$ to $400\ \mathrm{K}$ with an environment at $300\ \mathrm{K}$.
::: solution
$S_{\mathrm{gen}} = 100 (1 / 400 - 1 / 800) = 0.125\ \mathrm{kJ / K}$, and $W_{\mathrm{dest}} = 300 \times 0.125 = 37.5\ \mathrm{kJ}$.
:::
:::

::: exercise Heating {level=2}
Give the entropy change in kilojoules per kilogram-kelvin when liquid water with $c = 4.18$ is heated from $20\ {}^{\circ}\mathrm{C}$ to $90\ {}^{\circ}\mathrm{C}$.
::: solution
$$
\Delta s = 4.18 \ln \frac{363.15}{293.15} = 4.18 \times 0.2144 = 0.896\ \mathrm{kJ / kg \cdot K}
$$
*Sanity.* The number is **less than** $c \ln \left( 90 / 20 \right) = 6.53$, which is the error of using Celsius in a logarithm — a factor of **$7.3$**, and one of the most common slips in student work. **Every logarithm of a temperature in thermodynamics takes an absolute temperature**, and the reason is that the integral is $\int c\, dT / T$ and not $\int c\, d\theta / \left( \theta + \text{something} \right)$.
:::
:::

::: exercise Isentropic {level=2}
Air at $100\ \mathrm{kPa}$ and $300\ \mathrm{K}$ is compressed isentropically to $900\ \mathrm{kPa}$. Give the exit temperature and, for $k = 1.4$, the exit pressure–volume ratio $v_1 / v_2$.
::: solution
$$
T_2 = 300 \times 9^{0.2857} = 300 \times 1.8729 = 561.9\ \mathrm{K}
$$
$$
\frac{v_1}{v_2} = \left( \frac{P_2}{P_1} \right)^{1 / k} = 9^{1 / 1.4} = 4.888
$$
*Sanity.* The check is $T_2 = 300 \times \left( v_1 / v_2 \right)^{k - 1} = 300 \times 4.888^{0.4} = 300 \times 1.873 = 561.9\ \mathrm{K}$, which agrees. **The two isentropic relations must give the same answer**, and if they do not, the exponent has been written wrongly — a $1 / k$ written as $k$ gives $v_1 / v_2 = 2.17$ and a $T_2$ of $466\ \mathrm{K}$.
:::
:::

::: exercise Derivation {level=3}
Derive the two $T ds$ equations from the first and second laws, then obtain the entropy of mixing of two ideal gases at the same temperature and pressure and show that it vanishes as the gases become identical.
::: solution
**The first $T ds$ equation.** A closed system, a simple compressible substance, an internally reversible process:
$$
\delta q_{\mathrm{rev}} = du + P\, dv \quad \text{(first law)}, \qquad
\delta q_{\mathrm{rev}} = T\, ds \quad \text{(definition)}
$$
$$
\boxed{ T\, ds = du + P\, dv }
$$
**The second.** With $h = u + P v$, so $dh = du + P\, dv + v\, dP$:
$$
T\, ds = dh - v\, dP
$$
**Why they are general.** Both relate **properties only**, so although they were derived along a reversible path they hold between any two neighbouring equilibrium states, whatever the process. This is the same logic that makes $\Delta U = m c_v \Delta T$ valid for an ideal gas in any process.
**The entropy of mixing.** Two ideal gases, $n_1$ and $n_2$ moles, both at $T$ and $P$, mixed to a final mixture at $T$ and $P$ with mole fractions $y_i$:
$$
\Delta S = - \left( n_1 + n_2 \right) R \sum_i y_i \ln y_i
$$
**The derivation.** Each gas expands isothermally from its own volume $V_i = y_i V$ to the whole $V$, so
$$
\Delta S_i = n_i R \ln \frac{V}{V_i} = - n_i R \ln y_i
$$
and summing gives the result.
**The evaluation.** Equimolar air treated as two gases: $\Delta S / \left( nR \right) = - \left( 0.5 \ln 0.5 + 0.5 \ln 0.5 \right) = 0.693$, so
$$
\Delta s = 0.693 \times 8.314 = 5.76\ \mathrm{J / mol \cdot K}, \qquad
w_{\mathrm{dest}} = 298.15 \times 5.76 = 1.72\ \mathrm{kJ / mol}
$$
**The limit as the gases become identical.** The formula gives a **finite** value at $y_1 = y_2 = 0.5$ for **any** two distinguishable gases, and **zero** the instant they are the same gas. The discontinuity is **Gibbs' paradox**, and it is resolved by noting that the entropy of mixing is a statement about **distinguishability**: if no measurement can tell the two gases apart, no **thermodynamic** path exists that separates them, and the $\ln y_i$ terms are not available.
**The number that makes the paradox physical.** For two isotopes differing in mass by $1\ \%$, the entropy of mixing is still $R \ln 2$ per mole of mixture and the separation work is still $1.72\ \mathrm{kJ / mol}$ — which is why **isotope separation is a thermodynamic problem and not a chemical one**, and why heavy water costs about **$300\ \mathrm{currency\ units\ per\ kilogram}$** while ordinary water costs less than one cent.
*Sanity.* The reason $\Delta S$ is positive and the reason it is **not** a continuous function of chemical similarity are the same reason: entropy counts **distinguishable** arrangements, and distinguishability is a yes-or-no question. The quantum-mechanical resolution — that identical particles have symmetrised wavefunctions and the $N !$ factor in the partition function — is the **Gibbs correction**, and without it the entropy of an ideal gas is not extensive.
:::
:::

::: exercise Design {level=3}
Specify the entropy and exergy accounting, the instrumentation and the reporting requirements for a second-law audit of a $120\ \mathrm{MW_e}$ combined-heat-and-power plant.
::: solution
**The boundaries and the accounting.**
$$
\begin{array}{l c c c c}
\text{Component} & \dot{E}_{\mathrm{in}} & \dot{E}_{\mathrm{out}} & \dot{X}_{\mathrm{dest}} & \eta_{\mathrm{II}} \\
\text{Combustor} & 210.0 & 205.4 & 42.0 & - \\
\text{Gas turbine} & 205.4 & 168.0 & 12.6 & 89\ \% \\
\text{HRSG} & 118.0 & 96.0 & 21.0 & 81\ \% \\
\text{Steam turbine} & 96.0 & 78.0 & 6.4 & 88\ \% \\
\text{Heat network} & 34.0 & 22.0 & 3.0 & 65\ \% \\
\text{Stack} & 50.4 & - & 50.4 & - \\
\hline
\text{Plant} & 210.0\ \left( \mathrm{LHV} \right) & 120\ \mathrm{MW_e} + 34\ \mathrm{MW_{th}} & 135.4 & 57\ \%
\end{array}
$$
**The reading.** **The combustor and the stack together destroy $92\ \mathrm{MW}$ of the plant's $135\ \mathrm{MW}$ of destruction — $68\ \%$** — and neither has a moving part. Every hour spent on the steam cycle's efficiency is spent on $6.4\ \mathrm{MW}$ while $92\ \mathrm{MW}$ sits in a flame and a flue.
**The four instruments the audit turns on.**
$$
\begin{array}{l l l}
\text{Fuel flow and composition} & \text{Coriolis plus an online chromatograph} & \text{the LHV enters every figure} \\
\text{Flue-gas composition} & 0.2\ \%\ \mathrm{CO_2},\ 0.05\ \%\ \mathrm{O_2} & \text{the stack's exergy is } 60\ \%\ \text{water vapour} \\
\text{Steam and water flow} & \text{orifice with IF97 density, } \pm 0.8\ \% & \\
\text{All temperatures} & \text{four-wire PT100, } \pm 0.15\ \mathrm{K}\ \text{calibrated in situ} & \text{a } 1\ \mathrm{K}\ \text{error is } 0.4\ \mathrm{MW}\ \text{of exergy}
\end{array}
$$
**The three reporting rules.**
$$
\begin{array}{l l}
1 & \text{Every } \dot{X}_{\mathrm{dest}} \text{ located at a named component, with the table summing to the plant total within } 2\ \% \\
2 & \text{The dead state stated and its sensitivity reported, because a } 10\ \mathrm{K}\ \text{change moves the stack term by } 6\ \% \\
3 & \text{The latent exergy of the water vapour in the flue gas reported separately, since it is } 40\ \%\ \text{of the stack's exergy}
\end{array}
$$
**The five improvements, ranked by destroyed exergy.**
$$
\begin{array}{l c c}
\text{Raise the turbine entry temperature by } 50\ \mathrm{K} & & 6.0\ \mathrm{MW} \\
\text{Lower the stack temperature by } 25\ \mathrm{K}\ \text{ with a condensing economiser} & & 4.5\ \mathrm{MW} \\
\text{Reduce the HRSG's pinch from } 12\ \text{to } 8\ \mathrm{K} & & 3.2\ \mathrm{MW} \\
\text{Lower the condenser pressure by } 1\ \mathrm{kPa} & & 1.4\ \mathrm{MW} \\
\text{Reduce the heat network's supply temperature by } 5\ \mathrm{K} & & 1.1\ \mathrm{MW}
\end{array}
$$
**The clause that protects the buyer.** **"THE AUDIT SHALL REPORT DESTROYED EXERGY BY COMPONENT WITH A TABLE CLOSING TO WITHIN $2\ \%$ OF THE PLANT TOTAL, SHALL STATE THE DEAD STATE AND ITS SENSITIVITY, AND SHALL RANK IMPROVEMENTS BY DESTROYED EXERGY AND NOT BY ENERGY SAVING."**
*Design comment.* The general rule is that **a first-law audit tells you where the energy goes and a second-law audit tells you where the money is**, and that the two answers differ by an order of magnitude in a plant whose heat balance is already considered good.
:::
:::
