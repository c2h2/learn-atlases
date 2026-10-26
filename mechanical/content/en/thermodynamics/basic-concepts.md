Thermodynamics is the only branch of engineering that gets to ignore what matter is made of. Everything in it follows from four statements that have never been observed to fail, and the whole subject is the art of drawing a **boundary** around a piece of the world and keeping an **account** of what crosses it.

The account is deceptively simple — energy in minus energy out equals the change inside — and the difficulty is entirely in the words **in**, **out** and **inside**, which are not properties of the engine but of the **boundary you chose**. Two engineers given the same turbine will get different answers, and the one who drew the boundary where the heat actually leaves will be right and the one who drew it where it was convenient will be surprised.

::: warning Seven conceptual errors that poison every calculation downstream
**Confusing heat with temperature.** A bathtub at $40\ {}^{\circ}\mathrm{C}$ and a spark at $1{,}200\ {}^{\circ}\mathrm{C}$: the spark is hotter and the bathtub contains roughly **a million times** more transferable energy. Temperature is an **intensity**; heat is an **amount crossing a boundary**. **Confusing heat with stored energy.** A body does not "contain heat"; it contains **internal energy**, and heat is the name given to internal energy **in transit**. A red-hot piece of iron and a cup of tea can hold the same energy and be at wildly different temperatures, and only the iron can run an engine. **Using gauge pressure in a gas-law calculation.** $PV = mRT$ uses **absolute** pressure, and a tyre at $220\ \mathrm{kPa}$ gauge would be credited with $P_{\mathrm{atm}} / P_{\mathrm{abs}} = 101 / 321 = 31\ \%$ less air than it actually holds if the gauge reading were put into the gas law — "the gauge reads $220$" is not, by itself, a thermodynamic datum. **Forgetting that work can cross a boundary without a moving part.** Shaft work, electrical work, spring work and shear work all cross a boundary with no $P\, dV$ at all, and a control volume drawn around a motor with only a wire coming out has **one** energy transfer and it is not heat. **Assuming a process is quasi-equilibrium.** A rapid expansion is not a sequence of equilibrium states, the pressure at the piston face is not the pressure in the cylinder, and $W = \int P\, dV$ computed from a **single** measured pressure is wrong by an amount that can reach $30\ \%$ in an engine. **Setting the sign convention and then forgetting it.** $Q_{\mathrm{in}} - W_{\mathrm{out}} = \Delta E$ and $\Delta E = Q_{\mathrm{net}} + W_{\mathrm{net}}$ are both correct and are **not** the same equation; mixing them produces a sign error that looks like an arithmetic slip. **Applying an ideal-gas relation to a liquid or a two-phase mixture.** $c_p - c_v = R$ is **false** for a liquid, $\Delta u = c_v \Delta T$ is **false** in a saturated mixture, and $PV = mRT$ in the wet region is false by a factor that depends on the quality.
:::

## Systems, properties and state

::: definition Systems, boundaries and control volumes {#def-system}
$$
\begin{array}{l l l l}
\text{System} & \text{Mass} & \text{Boundary} & \text{Also called} \\
\text{Closed} & \text{fixed} & \text{no mass crosses} & \text{a control mass} \\
\text{Open} & \text{varies} & \text{mass crosses} & \text{a control volume} \\
\text{Isolated} & \text{fixed} & \text{nothing crosses} & \text{the universe, or a very good flask}
\end{array}
$$
**The boundary is a choice and it is the whole design decision.** It may be **real** (a piston crown) or **imaginary** (a plane across a pipe mouth), **fixed** or **moving**, **diathermal** (heat passes) or **adiabatic** (it does not). A boundary drawn **inside** a pipe wall rather than at its inner surface silently moves the heat transfer into the system and out of the surroundings, and the energy balance is then correct and the **entropy** balance is a lie, because the entropy is generated in the wall you have claimed is your system.
**The three rules of boundary placement.** **Put the boundary where you know the transfer**, at the outer surface of the lagging where the temperature and the heat flux are measurable, and not where the physics is interesting. **Include every crossing in the balance**, including the cable, the lubricant, the compressed-air line and the thermocouple, which is not nothing at $1\ \mathrm{mW}$. **Draw the boundary before you write the equation**, because the terms in the equation are the crossings of the boundary and not the parts of the machine.
**Extensive and intensive.** Mass $m$, volume $V$, energy $E$, entropy $S$ are **extensive** (they add); temperature, pressure, density, and every **specific** quantity (lower-case: $v = V / m$, $u = U / m$) are **intensive** (they do not). The test is: **cut the system in half — does the quantity halve?** If yes it is extensive, if no it is intensive, and if it becomes meaningless it is neither and you should not have cut it.
:::

::: definition State, equilibrium and process {#def-state}
**State** is the set of properties that fixes everything else, and for a **simple compressible substance** two independent intensive properties fix the state. The word **independent** is load-bearing: in the **saturated** region, pressure and temperature are **not** independent — $P_{\mathrm{sat}}$ is a function of $T$ alone — and you need $P$ and the **quality** $x$, or $T$ and $v$.
**The four equilibria.** A system is in thermodynamic equilibrium only when all four hold:
$$
\begin{array}{l l l}
\text{Thermal} & T \text{ uniform} & \text{no heat would flow if a diathermal path were opened} \\
\text{Mechanical} & P \text{ uniform (bar gravity)} & \text{no unbalanced force, no accelerating boundary} \\
\text{Phase} & \mu_i \text{ equal across phases} & \text{no net evaporation, dissolution or crystallisation} \\
\text{Chemical} & \sum \nu_i \mu_i = 0 & \text{no net reaction progress}
\end{array}
$$
**A process is quasi-equilibrium (quasi-static) if the system is never further from equilibrium than an infinitesimal amount.** The practical criterion is a **rate** comparison:
$$
\frac{U_{\mathrm{piston}}}{c} \ll 1 \quad \text{and} \quad \frac{L}{c} \ll t_{\mathrm{process}}
$$
where $c$ is the speed of sound. In a cylinder at $3{,}000\ \mathrm{rpm}$ with a $90\ \mathrm{mm}$ stroke the mean piston speed is
$$
\bar{c}_p = 2 L N = 2 \times 0.090 \times 50 = 9.0\ \mathrm{m / s}, \qquad \frac{\bar{c}_p}{c} = \frac{9.0}{600} = 0.015
$$
so the compression is **nearly** quasi-equilibrium: the pressure non-uniformity scales with the square of this Mach number, $\left( \bar{c}_p / c \right)^{2} \approx 2 \times 10^{- 4}$, and the piston-face pressure differs from the mean cylinder pressure by a few hundredths of a per cent.
**Path function and point function.** $Q$ and $W$ are **path** functions — they depend on how you got there and are written with inexact differentials $\delta Q$, $\delta W$. $U$, $V$, $T$, $P$, $S$ are **point** functions with exact differentials. The sentence that matters is: **there is no such thing as the heat in a body, only the heat a body has exchanged.**
:::

::: definition Temperature and the zeroth law {#def-temp}
**The zeroth law** says that if $A$ is in thermal equilibrium with $C$ and $B$ is in thermal equilibrium with $C$, then $A$ and $B$ are in equilibrium with each other — which licenses the existence of **temperature** as a property and of a **thermometer** as an instrument.
$$
\begin{array}{l c c c}
\text{Scale} & \text{Unit} & \text{Ice point} & \text{Steam point} \\
\text{Celsius} & ^{\circ}\mathrm{C} & 0.00 & 100.00\ (\text{at } 101.325\ \mathrm{kPa}) \\
\text{Kelvin} & \mathrm{K} & 273.15 & 373.15 \\
\text{Fahrenheit} & ^{\circ}\mathrm{F} & 32.00 & 212.00 \\
\text{Rankine} & \mathrm{R} & 491.67 & 671.67
\end{array}
$$
$$
T \left[ \mathrm{K} \right] = T \left[ ^{\circ}\mathrm{C} \right] + 273.15, \qquad
T \left[ ^{\circ}\mathrm{F} \right] = 1.8\, T \left[ ^{\circ}\mathrm{C} \right] + 32, \qquad
T \left[ \mathrm{R} \right] = T \left[ \mathrm{K} \right] \times 1.8
$$
**The two numbers that are not conventions.** The **triple point of water** was, until 2019, the definition of the kelvin at exactly $273.16\ \mathrm{K} = 0.01\ {}^{\circ}\mathrm{C}$, and the **ice point at one atmosphere** is $0.00\ {}^{\circ}\mathrm{C}$ — they differ by $0.01\ \mathrm{K}$ and by the fact that one is a point and the other is a pressure-dependent equilibrium. About $0.0075\ \mathrm{K}$ of that $0.01\ \mathrm{K}$ is the effect of the higher pressure ($101\ \mathrm{kPa}$ against $0.6\ \mathrm{kPa}$) on the melting point, and about $0.0024\ \mathrm{K}$ is the depression caused by dissolved air.
**A temperature difference is not a temperature.** $\Delta T = 10\ \mathrm{K} = 10\ {}^{\circ}\mathrm{C} = 18\ {}^{\circ}\mathrm{F} = 18\ \mathrm{R}$, and the most common arithmetic error in the subject is converting a **difference** with the offset formula. The rule: **convert a difference by the ratio only, never by the offset.**
:::

::: definition Pressure and manometry {#def-pres}
$$
P_{\mathrm{abs}} = P_{\mathrm{atm}} + P_{\mathrm{gauge}}, \qquad
P_{\mathrm{vac}} = P_{\mathrm{atm}} - P_{\mathrm{abs}}, \qquad
P_{\mathrm{atm}} = 101.325\ \mathrm{kPa}\ \text{(standard, sea level, } 15\ {}^{\circ}\mathrm{C} \text{)}
$$
**The hydrostatic equation.** In a fluid at rest, $dP = \rho g\, dz$, so across a layer of constant density
$$
\Delta P = \rho g h
$$
**The manometer rule, which is one sentence and saves an hour.** **Start at the free surface, go down adding $\rho g h$, go up subtracting $\rho g h$, and jump across any continuous stretch of the same fluid at no cost.**
**The evaluation.** A three-fluid manometer: a $300\ \mathrm{mm}$ column of oil $\left( \rho = 850 \right)$ above $120\ \mathrm{mm}$ of mercury $\left( \rho = 13{,}600 \right)$ above water, reading the gauge pressure of air in a tank:
$$
P_{\mathrm{gas}} = \rho_{\mathrm{Hg}} g h_{\mathrm{Hg}} - \rho_{\mathrm{oil}} g h_{\mathrm{oil}}
= 9.81 \left( 13{,}600 \times 0.120 - 850 \times 0.300 \right)
$$
$$
= 9.81 \left( 1{,}632 - 255 \right) = 9.81 \times 1{,}377 = 13.5\ \mathrm{kPa} .
$$
**The two numbers that give scale.** A **mercury barometer** stands $760\ \mathrm{mm}$; a **water barometer** would stand $13.6 \times 0.760 = 10.3\ \mathrm{m}$, which is why Torricelli used mercury and why a **siphon** cannot lift water more than about $7\ \mathrm{m}$ in practice and $10.3\ \mathrm{m}$ in principle. A **tyre** at $220\ \mathrm{kPa}$ gauge supports a $1{,}500\ \mathrm{kg}$ car on four contact patches of
$$
A = \frac{mg / 4}{P_{\mathrm{gauge}}} = \frac{3{,}680}{220{,}000} = 0.0167\ \mathrm{m^{2}} = 167\ \mathrm{cm^{2}} \ \text{each} \quad \text{(and note: gauge, not absolute)} .
$$
:::

::: definition Energy and its two transfer modes {#def-energy}
$$
E = U + \mathrm{KE} + \mathrm{PE} = m \left( u + \frac{V^{2}}{2} + g z \right)
$$
**Heat** is energy crossing a boundary **because of a temperature difference alone**. **Work** is energy crossing a boundary **by any other mechanism**. Both are boundary phenomena, both are path functions, and neither is a property.
$$
\begin{array}{l l l}
\text{Mode} & \text{Expression} & \text{Note} \\
\text{Boundary (expansion)} & W_b = \displaystyle\int_{1}^{2} P\, dV & \text{quasi-equilibrium only} \\
\text{Polytropic} \left( PV^{n} = C \right) & W_b = \displaystyle\frac{P_2 V_2 - P_1 V_1}{1 - n} = \frac{m R \left( T_2 - T_1 \right)}{1 - n},\ n \ne 1 & \\
\text{Isothermal ideal gas} & W_b = m R T \ln \left( V_2 / V_1 \right) & \\
\text{Isochoric} & W_b = 0 & \text{a rigid tank does no boundary work} \\
\text{Isobaric} & W_b = P \left( V_2 - V_1 \right) = m R \left( T_2 - T_1 \right) & \\
\text{Spring} & W = \tfrac{1}{2} k \left( x_2^{2} - x_1^{2} \right) & \\
\text{Shaft} & W = 2 \pi N T & \\
\text{Electrical} & W = V I\, \Delta t = \int V I\, dt & \\
\text{Elastic solid} & W = \int \sigma\, d\varepsilon \times \mathcal{V} & \\
\text{Surface} & W = \sigma_s\, d\mathcal{A} & \text{a soap film}
\end{array}
$$
**The polytropic exponent is a fit and not a property.** $n = 0$ is isobaric, $n = 1$ is isothermal (for an ideal gas), $n = \gamma$ is **reversible adiabatic**, $n = \infty$ is isochoric. A real engine's compression runs at $n \approx 1.30$ to $1.35$ against a $\gamma$ of $1.40$, and the $5\ \%$ gap **is the heat loss** — the polytropic exponent is a measurement of how non-adiabatic the process was.
**The quality of energy.** $1\ \mathrm{kWh} = 3.6\ \mathrm{MJ}$, and the comparison that organises the subject:
$$
\begin{array}{l c l}
\text{Gasoline} & 44\ \mathrm{MJ / kg} & \text{chemical, } 100\ \%\ \text{convertible in principle} \\
\text{Hydrogen} & 120\ \mathrm{MJ / kg} & \\
\text{Lithium-ion cell} & 0.7\ \mathrm{MJ / kg} & \text{electrical, } 100\ \%\ \text{convertible} \\
\text{Steam at } 300\ {}^{\circ}\mathrm{C} & \text{any amount} & \text{only } 1 - T_0 / T \text{ is convertible} \\
\text{Sea water at } 20\ {}^{\circ}\mathrm{C} & 80\ \mathrm{MJ / t}\ \text{above } 0\ {}^{\circ}\mathrm{C} & \text{essentially none is convertible}
\end{array}
$$
**The tonne of sea water contains more thermal energy than a litre of gasoline** (about $32\ \mathrm{MJ}$) and can give up none of it, because the surroundings are at $20\ {}^{\circ}\mathrm{C}$ too. This is the whole content of the second law, stated as an energy accountant's embarrassment.
:::

::: widget plot
f: 101.325*exp(-x/8.43); 101.325*(1-0.022558*x)^5.2559
x: 0, 11
y: 0, 110
labels: isothermal at 15 degC; ISA troposphere (6.5 K/km lapse)
caption: Atmospheric absolute pressure in kilopascals against altitude in kilometres: the isothermal model $P = P_0 \exp \left( - g z / R T \right)$ at $15\ {}^{\circ}\mathrm{C}$ (scale height $R T / g = 8.43\ \mathrm{km}$), and the International Standard Atmosphere with its lapse rate of $6.5\ \mathrm{K / km}$. At $5.5\ \mathrm{km}$ (about the height of Everest base camp) the pressure is $51$ to $53\ \mathrm{kPa}$, roughly **half** sea level: an air compressor's mass flow and a naturally aspirated engine's power fall by roughly that factor, and water boils at about $82\ {}^{\circ}\mathrm{C}$. A pressure **gauge** reads the same $220\ \mathrm{kPa}$ in Denver and at sea level; the **absolute** pressure inside, and therefore the mass of air, does not.
:::

## Worked cases

::: example A multi-fluid manometer {#ex-manometer}
A tank of oil $\left( \rho = 850\ \mathrm{kg / m^{3}} \right)$ is connected through a U-tube containing mercury $\left( \rho = 13{,}600 \right)$ to a second U-tube open to atmosphere containing water. The oil leg stands $0.60\ \mathrm{m}$ above the top mercury meniscus, the mercury is $0.20\ \mathrm{m}$ higher in the closed leg than in the open one, and the water column in the open leg stands $0.35\ \mathrm{m}$ above the mercury. Find the gauge pressure of the air space above the oil, and the absolute pressure if the barometer reads $750\ \mathrm{mm}$ of mercury.
::: solution
**The path, walked from the open end.** Start at the open water surface, where the pressure is $P_{\mathrm{atm}}$. Go **down** $0.35\ \mathrm{m}$ of water, **jump** across the mercury at the same level, go **up** $0.20\ \mathrm{m}$ of mercury, **jump** across, go **up** $0.60\ \mathrm{m}$ of oil, and arrive at the air space.
$$
P_{\mathrm{air}} = P_{\mathrm{atm}} + \rho_w g h_w - \rho_{Hg} g h_{Hg} - \rho_o g h_o
$$
$$
= P_{\mathrm{atm}} + 9.81 \left( 1000 \times 0.35 - 13{,}600 \times 0.20 - 850 \times 0.60 \right)
$$
$$
= P_{\mathrm{atm}} + 9.81 \left( 350 - 2{,}720 - 510 \right) = P_{\mathrm{atm}} - 9.81 \times 2{,}880 = P_{\mathrm{atm}} - 28.3\ \mathrm{kPa}
$$
**The gauge pressure.** $P_{\mathrm{air, gauge}} = - 28.3\ \mathrm{kPa}$, i.e. a **vacuum** of $28.3\ \mathrm{kPa}$.
**The absolute pressure.** The barometer reads $750\ \mathrm{mm}$ of mercury, so
$$
P_{\mathrm{atm}} = 13{,}600 \times 9.81 \times 0.750 = 100.1\ \mathrm{kPa}, \qquad
P_{\mathrm{air, abs}} = 100.1 - 28.3 = 71.8\ \mathrm{kPa} .
$$
**The sanity check.** A vacuum of $28.3\ \mathrm{kPa}$ is $212\ \mathrm{mm}$ of mercury, and the manometer's net reading is $2{,}880\ \mathrm{mm}$ of water $= 212\ \mathrm{mm}$ of mercury. $\checkmark$
**The trap.** The $0.60\ \mathrm{m}$ of oil is on the **low-pressure** side and therefore **subtracts**; a sign error here gives $- 18.2\ \mathrm{kPa}$ instead of $- 28.3\ \mathrm{kPa}$, an error of $10\ \mathrm{kPa}$, and the calculation still looks like a manometer calculation.
*Sanity.* The "jump across the same fluid at the same level" step rests on the hydrostatic equation: two points at the same elevation in a **continuous** fluid at rest are at the same pressure. The word **continuous** is the whole condition — if the mercury is discontinuous, the jump is invalid and the manometer is broken.
:::
:::

::: example Polytropic compression in a piston-cylinder {#ex-poly}
$0.015\ \mathrm{m^{3}}$ of air at $100\ \mathrm{kPa}$ and $20\ {}^{\circ}\mathrm{C}$ is compressed to $700\ \mathrm{kPa}$ following $PV^{1.30} = C$. Find the final volume and temperature, the boundary work, and the heat transfer. $R = 0.287\ \mathrm{kJ / kg \cdot K}$, $c_v = 0.718$.
::: solution
**The mass.**
$$
m = \frac{P_1 V_1}{R T_1} = \frac{100 \times 0.015}{0.287 \times 293.15} = 0.01783\ \mathrm{kg} = 17.8\ \mathrm{g} .
$$
**The final volume.**
$$
V_2 = V_1 \left( \frac{P_1}{P_2} \right)^{1 / n} = 0.015 \times \left( \frac{100}{700} \right)^{1 / 1.30} = 0.015 \times 0.2238 = 3.357 \times 10^{- 3}\ \mathrm{m^{3}} .
$$
**The final temperature.**
$$
T_2 = T_1 \left( \frac{P_2}{P_1} \right)^{\left( n - 1 \right) / n} = 293.15 \times 7^{0.2308} = 293.15 \times 1.567 = 459.3\ \mathrm{K} = 186.2\ {}^{\circ}\mathrm{C} .
$$
**The boundary work.**
$$
W_b = \frac{P_2 V_2 - P_1 V_1}{1 - n} = \frac{700 \times 0.003357 - 100 \times 0.015}{- 0.30} = \frac{2.350 - 1.500}{- 0.30} = - 2.834\ \mathrm{kJ}
$$
so **$2.83\ \mathrm{kJ}$ of work is done on the gas**.
**The heat transfer.** The first law for a closed system, $Q - W_b = \Delta U$ with $W_b$ positive **out**:
$$
\Delta U = m c_v \left( T_2 - T_1 \right) = 0.01783 \times 0.718 \times \left( 459.3 - 293.15 \right) = 2.127\ \mathrm{kJ}
$$
$$
Q = \Delta U + W_b = 2.127 + \left( - 2.834 \right) = - 0.707\ \mathrm{kJ} .
$$
**The interpretation.** Of the $2.83\ \mathrm{kJ}$ of work put in, $2.13\ \mathrm{kJ}$ stays as internal energy and **$0.71\ \mathrm{kJ}$ — $25\ \%$ — leaves as heat.** An exponent only $0.10$ below $\gamma$ already means a quarter of the work is rejected.
**The comparison with a reversible adiabatic compression.** At $n = \gamma = 1.40$:
$$
T_2 = 293.15 \times 7^{0.2857} = 511.1\ \mathrm{K}, \qquad W_b = \frac{m R \left( T_2 - T_1 \right)}{1 - \gamma} = - 2.789\ \mathrm{kJ}, \qquad Q = 0 .
$$
The real compression ends **$52\ \mathrm{K}$ cooler** and, perhaps surprisingly, takes **$0.045\ \mathrm{kJ}$ ($1.6\ \%$) more** boundary work: because heat leaves, the gas must be squeezed to a smaller volume ($3.36$ against $3.74\ \mathrm{L}$) before it reaches $700\ \mathrm{kPa}$.
**The number that matters for a designer.** The **polytropic exponent is the heat loss**, expressed as a number. In a closed, non-flow compression to a fixed pressure it hardly changes the work; what it changes is the final temperature. The saving from cooling appears in a **steady-flow** compressor, whose work is $\int v\, dP = \frac{n}{n - 1} m R \left( T_2 - T_1 \right)$: $3.69\ \mathrm{kJ}$ at $n = 1.30$ against $3.90\ \mathrm{kJ}$ at $n = 1.40$, about $6\ \%$ less ([[thermodynamics/first-law-open]]).
*Sanity.* For a compression to a fixed final pressure the $P \text{–} V$ curve with $n = 1.30$ lies between the isothermal and the adiabatic, so the work must lie between $W_{\mathrm{ad}} = - 2.79\ \mathrm{kJ}$ and $W_{\mathrm{iso}} = m R T_1 \ln \left( P_1 / P_2 \right) = - 2.92\ \mathrm{kJ}$. It does. $\checkmark$
:::
:::

::: example Is a process quasi-equilibrium? {#ex-quasi}
A gas in a cylinder with a $100\ \mathrm{mm}$-bore piston is compressed at $0.5\ \mathrm{m / s}$ from $100\ \mathrm{kPa}$ to $1\ \mathrm{MPa}$ at $300\ \mathrm{K}$. Estimate the pressure non-uniformity and decide whether $W = \int P\, dV$ at the piston face is the thermodynamic work.
::: solution
**The criterion.** The gas equilibrates by **sound**, at $c = \sqrt{\gamma R T} = \sqrt{1.4 \times 287 \times 300} = 347\ \mathrm{m / s}$. The relevant time is the **residence** time of a sound wave across the cylinder, and the relevant length is the **instantaneous** height $L$.
**At the start**, with $L = 0.100\ \mathrm{m}$:
$$
t_{\mathrm{sound}} = \frac{L}{c} = \frac{0.100}{347} = 0.29\ \mathrm{ms}, \qquad
t_{\mathrm{process}} = \frac{L}{U_p} = \frac{0.100}{0.5} = 200\ \mathrm{ms}
$$
so the ratio is $t_{\mathrm{sound}} / t_{\mathrm{process}} = 1.4 \times 10^{- 3}$ and the gas makes **about $700$ sound crossings** per unit of compression time. It is **extremely** close to equilibrium.
**The non-uniformity.** The dynamic pressure of the inflow is
$$
\Delta P \sim \rho U_p^{2} = \frac{P}{R T} U_p^{2} = \frac{100{,}000}{287 \times 300} \times 0.25 = 0.29\ \mathrm{Pa}
$$
against $100\ \mathrm{kPa}$ — **three parts per million**. At the end, at $1\ \mathrm{MPa}$, $\rho$ is ten times higher and $\Delta P$ is $2.9\ \mathrm{Pa}$ against $1\ \mathrm{MPa}$ — still three parts per million.
**The verdict.** The process is quasi-equilibrium to one part in $10^{5}$ and $\int P\, dV$ at the piston face **is** the thermodynamic work.
**The counter-example that is the real question.** In a **diesel engine** at $2{,}000\ \mathrm{rpm}$ with an $86\ \mathrm{mm}$ bore and stroke, the peak piston speed is
$$
U_p \approx \frac{2 \pi N}{60} \frac{S}{2} = 209.4 \times 0.043 = 9.0\ \mathrm{m / s} \ \text{(mean } 2 S N = 5.7 \text{)}
$$
which is still slow against a sound speed of several hundred metres per second — but the **combustion** pressure rise lasts only about a millisecond, a handful of sound-crossing times of about $0.1\ \mathrm{ms}$ across the bore, so pressure waves are present and a single flush-mounted transducer records them. This is why cylinder-pressure traces are filtered before the indicated mean effective pressure is computed from them.
**The rule.** **A slow process is quasi-equilibrium and a fast one is not, but "fast" is measured against the sound-crossing time and not against the stopwatch.** A compression that takes $200\ \mathrm{ms}$ in a $10\ \mathrm{m}$ cylinder is not quasi-equilibrium; the same compression in a $10\ \mathrm{mm}$ cylinder is.
*Sanity.* The quasi-equilibrium assumption is worth testing because $\int P\, dV$ computed from a **non-equilibrium** state is not the work — the work is $\int P_{\mathrm{piston}}\, dV$, and the difference is dissipated **inside** the gas and appears as extra internal energy. A turbine stage, a shock tube and a detonation are all cases where the difference is not $10^{- 6}$ but $10^{0}$.
:::
:::

::: example Energy accounting for a house {#ex-house}
A house uses $12{,}000\ \mathrm{kWh}$ of electricity and $900\ \mathrm{L}$ of heating oil a year. Its heating system is a gas furnace at $88\ \%$ efficiency using $1{,}400\ \mathrm{m^{3}}$ of natural gas. Account for the energy and the exergy.
::: solution
**The energy, converted to a common unit.**
$$
\begin{array}{l c r c}
\text{Fuel} & \text{Quantity} & \text{Energy} & \text{Share} \\
\text{Electricity} & 12{,}000\ \mathrm{kWh} & 43.2\ \mathrm{GJ} & 33\ \% \\
\text{Heating oil} & 900\ \mathrm{L} \times 37.2\ \mathrm{MJ / L} & 33.5\ \mathrm{GJ} & 26\ \% \\
\text{Natural gas} & 1{,}400\ \mathrm{m^{3}} \times 38.8\ \mathrm{MJ / m^{3}} & 54.3\ \mathrm{GJ} & 41\ \% \\
\hline
\text{Total purchased} & & 131.0\ \mathrm{GJ} &
\end{array}
$$
**The exergy — the part that could have been work.**
$$
\begin{array}{l c c r}
\text{Form} & \text{Carnot factor to } 273\ \mathrm{K} & \zeta & \text{Exergy} \\
\text{Electricity} & 1.00 & 1.00 & 43.2\ \mathrm{GJ} \\
\text{Oil, flame at } 2{,}000\ \mathrm{K} & 1 - 273 / 2000 & 0.86 & 28.9\ \mathrm{GJ} \\
\text{Gas, flame at } 1{,}900\ \mathrm{K} & 1 - 273 / 1900 & 0.86 & 46.5\ \mathrm{GJ} \\
\hline
\text{Total exergy purchased} & & & 118.6\ \mathrm{GJ}
\end{array}
$$
**The two accounts side by side.**
$$
\text{Energy purchased } 131.0\ \mathrm{GJ}, \qquad \text{exergy purchased } 118.6\ \mathrm{GJ}, \qquad
\frac{\text{exergy}}{\text{energy}} = 0.91
$$
**The point.** **$91\ \%$ of the energy the household buys is **work-capable**, and if about $95\ \%$ of it ends as **heat at $20\ {}^{\circ}\mathrm{C}$**, that is a service whose exergy content, against a $273\ \mathrm{K}$ winter outdoors, is only $1 - 273 / 293 \approx 7\ \%$.** The house destroys exergy at a rate of roughly
$$
\frac{0.95 \times 118.6\ \mathrm{GJ} - 0.95 \times 131.0\ \mathrm{GJ} \times 0.068}{3.15 \times 10^{7}\ \mathrm{s}} \approx 3.3\ \mathrm{kW}
$$
continuously, which is the thermodynamic statement of why a **heat pump** with a coefficient of performance of $3.5$ is not a magic machine but a **restoration of sanity**: it moves heat instead of making it, and its exergy efficiency is $3.5 \times 0.068 \approx 24\ \%$ against the furnace's $0.88 \times 0.068 / 0.86 \approx 7\ \%$.
*Sanity.* Electricity's exergy equals its energy because a motor converts it to work with no second-law limit. The factor $0.86$ for the fuels is a simplification: it treats the heating value as heat released at the flame temperature. A fuel's chemical exergy is in fact close to its heating value, and an adiabatic flame destroys roughly a quarter to a third of it before any heat reaches a surface, so the table is an upper bound on the exergy of the heat the fuels can deliver.
:::
:::

::: example The energy and exergy of a compressed-air receiver {#ex-air}
A $2.0\ \mathrm{m^{3}}$ receiver is charged to $800\ \mathrm{kPa}$ absolute and cools to $25\ {}^{\circ}\mathrm{C}$. Give the stored energy, the stored exergy, and the equivalent mass of gasoline.
::: solution
**The mass of air.**
$$
m = \frac{P V}{R T} = \frac{800 \times 2.0}{0.287 \times 298.15} = 18.70\ \mathrm{kg} .
$$
**The "stored energy" — and why the question is wrong.** The air's **internal** energy above $0\ \mathrm{K}$ is $m c_v T = 18.70 \times 0.718 \times 298.15 = 4{,}003\ \mathrm{kJ}$, and **none of it is available**, because the surroundings are at the same temperature. The energy that matters is the energy **of compression**, and even that is only available if the air can expand back to atmosphere.
**The exergy of the compressed air.** For a closed mass of ideal gas at $T_0$,
$$
\phi = m \left[ \left( u - u_0 \right) - T_0 \left( s - s_0 \right) + P_0 \left( v - v_0 \right) \right]
$$
with $T = T_0$ this reduces to
$$
\phi = m R T_0 \left[ \ln \frac{v_0}{v} + \frac{v}{v_0} - 1 \right]
$$
Here $v = V / m = 0.1070\ \mathrm{m^{3} / kg}$ and $v_0 = R T_0 / P_0 = 0.287 \times 298.15 / 101.325 = 0.8445\ \mathrm{m^{3} / kg}$, so
$$
\phi = 18.70 \times 0.287 \times 298.15 \left[ \ln 7.895 + 0.1267 - 1 \right] = 1{,}600 \times \left[ 2.066 - 0.873 \right] = 1{,}600 \times 1.193 = 1{,}909\ \mathrm{kJ} .
$$
**The comparison.**
$$
\frac{1{,}909\ \mathrm{kJ}}{3{,}600\ \mathrm{kJ / kWh}} = 0.530\ \mathrm{kWh}, \qquad
\frac{1{,}909}{44{,}000} = 0.0434\ \mathrm{kg\ of\ gasoline} = 0.059\ \mathrm{L}
$$
**The two numbers that end the argument.** A $2\ \mathrm{m^{3}}$ receiver at $8\ \mathrm{bar}$ stores **$0.53\ \mathrm{kWh}$**. Its own mass is about $180\ \mathrm{kg}$ of steel plus $19\ \mathrm{kg}$ of air, so its specific exergy is
$$
\frac{530\ \mathrm{Wh}}{199\ \mathrm{kg}} = 2.7\ \mathrm{Wh / kg}
$$
against a lithium cell's $200\ \mathrm{Wh / kg}$ and gasoline's $12{,}200\ \mathrm{Wh / kg}$ — a **seventy-fold** deficit against the battery and a more than **four-thousand-fold** one against the fuel.
**The second number, which is the compressor's bill.** The **minimum (reversible, isothermal) work of charging** the receiver from atmosphere is exactly this exergy, $1.91\ \mathrm{MJ}$. A real compressor delivers each kilogram at the receiver pressure; at the final $800\ \mathrm{kPa}$, an ideal **single-stage adiabatic** machine needs
$$
w_{\mathrm{ad}} = c_p T_0 \left[ \left( \frac{P}{P_0} \right)^{\left( \gamma - 1 \right) / \gamma} - 1 \right] = 1.005 \times 298.15 \times 0.805 = 241\ \mathrm{kJ / kg}
$$
against the isothermal
$$
w_{\mathrm{iso}} = R T_0 \ln \frac{P}{P_0} = 0.287 \times 298.15 \times 2.066 = 177\ \mathrm{kJ / kg}
$$
— a **$36\ \%$** penalty — and the $64\ \mathrm{kJ / kg}$ of difference is thrown away as aftercooler heat at $40\ {}^{\circ}\mathrm{C}$, a temperature at which its exergy content is $1 - 298 / 313 = 5\ \%$.
*Sanity.* Convert the duty to a mass flow: $1\ \mathrm{m^{3} / min}$ of **free** air is
$$
\dot{m} = \frac{P_0 \dot{V}_0}{R T_0} = \frac{101.325 \times \left( 1 / 60 \right)}{0.287 \times 298.15} = 0.01974\ \mathrm{kg / s}
$$
so the **isothermal ideal** power is $0.01974 \times 177 = 3.49\ \mathrm{kW}$ and the **single-stage adiabatic ideal** is $0.01974 \times 241 = 4.76\ \mathrm{kW}$. A $7.5\ \mathrm{kW}$ motor driving this duty is therefore at **$47\ \%$** of the isothermal ideal and **$63\ \%$** of the adiabatic one — and the $63\ \%$ is the number a compressor vendor will quote, because it is the larger and the more flattering denominator. The $2.7\ \mathrm{kW}$ that is neither ideal leaves as jacket, oil and aftercooler heat, and in winter it is a **heat source worth more than the air**.
:::
:::

::: history
The discipline of drawing a boundary and keeping an account of what crosses it goes back to **Sadi Carnot**'s *Réflexions* of **1824**, which considered a fixed quantity of air confined in a cylinder with a movable piston and asked only what work it could do — a **closed system** in everything but the name. **Joule**'s measurements of the mechanical equivalent of heat, from **1843** to **1878** (the paddle wheel from 1845), moved from $838\ \mathrm{ft \cdot lbf}$ per British thermal unit (about $4.5\ \mathrm{J / cal}$) in 1843 to $772\ \mathrm{ft \cdot lbf}$ (about $4.16\ \mathrm{J / cal}$) in 1850, against today's $4.186\ \mathrm{J / cal}$, and established that work and heat are interconvertible in a fixed ratio. **The zeroth law** was named only in the **1930s**, by **R. H. Fowler**, who noticed that the logical priority of the definition of temperature had been recognised by nobody since the subject was built; the numbering is an apology. **The absolute temperature scale** is **Lord Kelvin**'s of **1848**, derived from Carnot's engine and deliberately independent of any substance, and the kelvin scale was fixed to the water triple point by the **10th CGPM in 1954** and redefined through the Boltzmann constant by the **26th CGPM** (decided 2018, in force from 2019). **The mercury barometer** is **Torricelli**'s of **1643–44** and the **barometric formula** **Laplace**'s; **Blaise Pascal**'s 1648 Puy-de-Dôme experiment, in which his brother-in-law **Florin Périer** carried a mercury barometer up the mountain and saw the column fall by about three inches, is the first quantitative demonstration that the atmosphere has weight. **The polytropic equation** $PV^{n} = C$ is a **fitting** device of the mid-nineteenth century — the name "polytropic" is **Gustav Zeuner**'s — and its survival as the standard engineering description of a real, non-adiabatic expansion is a rare case of a formula that is honest about being a fit.
:::

## Where this leads

The properties introduced here are tabulated for real substances in [[thermodynamics/pure-substances]]; the energy account opened here is closed for closed systems in [[thermodynamics/first-law-closed]] and for control volumes in [[thermodynamics/first-law-open]], and the second half of the account — the part about **quality** — is [[thermodynamics/second-law]].

::: summary
- Thermodynamics is an account of energy across a boundary you chose; the terms in the equation are the crossings of the boundary and not the parts of the machine.
- Heat and temperature are an amount and an intensity; a body contains internal energy and never heat.
- Two independent intensive properties fix the state — and in the saturated region pressure and temperature are not independent.
- A process is quasi-equilibrium when the sound-crossing time is short against the process time, and $\int P\,dV$ is the work only then.
- Absolute pressure, always, in a gas law: gauge pressure is a difference and the gas does not know about the atmosphere.
- The polytropic exponent is a measurement of how non-adiabatic a real process was.
- $91\ \%$ of the energy a house buys is work-capable and it spends nearly all of it on heat at $20\ {}^{\circ}\mathrm{C}$, which is the second law stated as an accountant's embarrassment.
:::

::: quiz
A gas is compressed in a piston–cylinder and its temperature rises. Which statement is correct?
- [ ] Heat flowed into the gas, raising its temperature
- [x] Work crossed the boundary; whether heat also crossed cannot be said from the temperature alone
- [ ] The gas contains more heat than it did before
- [ ] The process must be adiabatic
::: solution
A temperature rise tells you about the **end state**, not about the **path**. The compression could be adiabatic (all the temperature rise from work), heavily cooled (work in, more heat out, temperature still rising), or even heated while doing work. **Heat and work are path functions and temperature is a point function**, and no amount of information about the endpoints fixes the transfers — which is the single reason a calorimeter must measure a heat and not infer one.
:::
:::

## Exercises

::: exercise Units {level=1 check="3.6"}
Give the number of megajoules in one kilowatt-hour.
::: solution
$3.6\ \mathrm{MJ}$ — a kilowatt for $3{,}600$ seconds.
:::
:::

::: exercise Scales {level=1 check="1.8"}
Give the number of Fahrenheit degrees in one kelvin of temperature difference.
::: solution
$1.8$ — a difference converts by the ratio and never by the offset.
:::
:::

::: exercise Absolute {level=1 check="71.8"}
A vacuum gauge reads $28.3\ \mathrm{kPa}$ where the barometer reads $750\ \mathrm{mm}$ of mercury. Give the absolute pressure in kilopascals.
::: solution
$P_{\mathrm{abs}} = 100.1 - 28.3 = 71.8\ \mathrm{kPa}$.
:::
:::

::: exercise State {level=1 check="2"}
How many independent intensive properties fix the state of a simple compressible substance?
::: solution
Two — the state postulate.
:::
:::

::: exercise Work {level=1 check="0"}
A gas in a rigid $0.5\ \mathrm{m^{3}}$ tank is heated from $300\ \mathrm{K}$ to $600\ \mathrm{K}$. Give the boundary work in kilojoules.
::: solution
$0$ — a rigid boundary does no $P\,dV$ work, whatever the pressure does.
:::
:::

::: exercise Manometer {level=2}
A U-tube manometer with mercury $ \left( \rho = 13{,}600 \right)$ reads $240\ \mathrm{mm}$ across a horizontal orifice. Give the pressure drop in kilopascals, and the water flow rate it implies through a $20\ \mathrm{mm}$-bore orifice of coefficient $0.61$.
::: solution
$$
\Delta P = \left( \rho_{Hg} - \rho_w \right) g h = \left( 13{,}600 - 1{,}000 \right) \times 9.81 \times 0.240 = 29.7\ \mathrm{kPa} .
$$
$$
\dot{m} = C_d A \sqrt{2 \rho \Delta P} = 0.61 \times 3.142 \times 10^{- 4} \sqrt{2 \times 1000 \times 29{,}700} = 0.61 \times 3.142 \times 10^{- 4} \times 244 = 0.0467\ \mathrm{kg / s}
$$
*Sanity.* The $\rho_{Hg} - \rho_w$ correction is $7\ \%$ and is the term a student omits; a manometer reading a **liquid** differential measures the **difference of the two column weights** and not the mercury's alone.
:::
:::

::: exercise Polytropic {level=2}
$0.5\ \mathrm{kg}$ of air at $500\ \mathrm{kPa}$ and $400\ \mathrm{K}$ expands polytropically with $n = 1.25$ to $200\ \mathrm{kPa}$. Give the work done and the heat transfer. $R = 0.287$, $c_v = 0.718$.
::: solution
$$
T_2 = 400 \times \left( \frac{200}{500} \right)^{0.25 / 1.25} = 400 \times 0.4^{0.20} = 400 \times 0.8326 = 333.0\ \mathrm{K}
$$
$$
W_b = \frac{m R \left( T_2 - T_1 \right)}{1 - n} = \frac{0.5 \times 0.287 \times \left( - 67.0 \right)}{- 0.25} = 38.4\ \mathrm{kJ}
$$
$$
\Delta U = 0.5 \times 0.718 \times \left( - 67.0 \right) = - 24.0\ \mathrm{kJ}, \qquad
Q = \Delta U + W_b = - 24.0 + 38.4 = 14.4\ \mathrm{kJ} .
$$
*Sanity.* The gas **cools** and yet **absorbs** heat: it does more work than its internal energy supplies, which is possible because $n < \gamma$. A polytropic expansion with $1 < n < \gamma$ always has $Q$ and $\Delta T$ of **opposite** sign, and that is the fact that surprises most readers of a $PV$ diagram.
:::
:::

::: exercise Derivation {level=3}
Derive the polytropic boundary-work formula for an ideal gas, obtain the isothermal and isochoric limits, and show that the work of a polytropic process between two given volumes is a monotonic function of $n$.
::: solution
**The integral.** For a quasi-equilibrium process with $PV^{n} = C$,
$$
W_b = \int_{1}^{2} P\, dV = C \int_{V_1}^{V_2} V^{- n}\, dV = \frac{C}{1 - n} \left( V_2^{1 - n} - V_1^{1 - n} \right) = \frac{P_2 V_2 - P_1 V_1}{1 - n} , \qquad n \ne 1
$$
and with $PV = mRT$ for an ideal gas,
$$
\boxed{ W_b = \frac{m R \left( T_2 - T_1 \right)}{1 - n} } .
$$
**The isothermal limit.** As $n \to 1$, $T_2 \to T_1$ and the expression becomes $0 / 0$; l'Hôpital on $n$ gives
$$
W_b \big|_{n = 1} = \int_{V_1}^{V_2} \frac{C}{V}\, dV = m R T \ln \frac{V_2}{V_1} .
$$
**The isochoric limit.** As $n \to \infty$, $V_2 \to V_1$ and $W_b \to 0$, which the formula gives directly since $P_2 V_2 - P_1 V_1 \to 0$.
**Monotonicity in $n$ at fixed end volumes.** Fix $V_1$, $V_2$ and the initial pressure $P_1$, and let $n$ vary. Every curve leaves the same point and $P = P_1 \left( V_1 / V \right)^n$ is **pointwise smaller** at every $V > V_1$ when $n$ is larger, so
$$
\frac{\partial W_b}{\partial n} = \int_{V_1}^{V_2} P_1 V_1^{n} \left( - \ln \frac{V}{V_1} \right) V^{- n - 1}\, dV < 0 \quad \text{for an expansion} .
$$
**The larger the exponent, the less work an expansion between two fixed volumes gives**, because a larger $n$ means a steeper fall in pressure and a smaller area under the curve.
**The consequence, at a fixed volume ratio $r_v = V_2 / V_1 > 1$.**
$$
W_{\mathrm{iso}} \left( n = 1 \right) > W_{\mathrm{ad}} \left( n = \gamma \right) > W_{n > \gamma} > 0
$$
and the ordering **reverses for a compression**, where a steeper curve means a **larger** area and therefore more work in.
**The number.** With $r_v = 6$ and $P_1 = 100\ \mathrm{kPa}$, $V_1 = 1\ \mathrm{m^{3}}$:
$$
W_{\mathrm{iso}} = 100 \ln 6 = 179\ \mathrm{kJ}, \qquad
W_{\mathrm{ad}} = \frac{100 \left( 6^{1 - 1.4} - 1 \right)}{- 0.4} = 128\ \mathrm{kJ}
$$
a **$29\ \%$** difference between the isothermal and the adiabatic expansion of the same gas through the same volume ratio — which is why adding heat during expansion (the idea behind the Stirling and Ericsson cycles) is attractive in principle, and why doing it fast enough in a real machine is hard.
*Sanity.* A real engine's expansion is modelled with $n < \gamma$ and its compression with $n > \gamma$ because in the expansion heat **enters** from the hot walls and flattens the curve, and in the compression heat **leaves** and steepens it — and the polytropic exponent is the number that records which way the heat went.
:::
:::

::: exercise Design {level=3}
Specify the thermodynamic boundaries and the energy accounts for a $500\ \mathrm{kW}$ industrial air compressor package: motor, airend, oil circuit, aftercooler and control. State what crosses each boundary and how you would measure it.
::: solution
**The boundaries, from the outside in.**
$$
\begin{array}{l l l}
\text{B1 Package} & \text{one cable, one air outlet, one cooling-water pair} & \text{the customer's metering boundary} \\
\text{B2 Motor} & \text{cable in, shaft out, jacket water, fan loss} & \text{the motor's own efficiency} \\
\text{B3 Airend} & \text{shaft in, air in, air out, oil in, oil out, casing loss} & \text{the isothermal and adiabatic efficiencies} \\
\text{B4 Aftercooler} & \text{hot air in, cold air out, water in, water out, condensate} & \text{the approach and the condensate}
\end{array}
$$
**The account at the package boundary, which is the only one the customer pays.**
$$
\dot{W}_{\mathrm{in}} = 500 / \eta_{\mathrm{motor}} \eta_{\mathrm{mech}} + \dot{W}_{\mathrm{aux}}, \qquad
\dot{Q}_{\mathrm{out}} = \dot{W}_{\mathrm{in}} - \dot{m} \Delta h_{\mathrm{air}}
$$
**The five measurements that close it.**
$$
\begin{array}{l l l}
\text{Electrical} & 3\text{-phase } 4\text{-wire, } 0.5\ \%\ \text{class, true RMS} & \text{a VFD's harmonics defeat an average-responding meter} \\
\text{Air flow} & \text{ultrasonic or thermal, at the outlet} & \text{an orifice at } 8\ \text{bar gauge needs the absolute pressure} \\
\text{Air temperature} & \text{two RTDs, inlet and outlet, } \pm 0.1\ \mathrm{K} & \text{the } \Delta T \text{ is } 8\ \mathrm{K} \text{ and its error is } 2.5\ \% \\
\text{Cooling water} & \text{magnetic flow meter and two RTDs} & \text{the water carries } 85\ \%\ \text{of the input energy} \\
\text{Condensate} & \text{measured over an hour} & \text{the proof that the aftercooler works}
\end{array}
$$
**The three things the boundary must include and usually does not.** **The fan's parasitic power**, which is $3$ to $5\ \%$ of the motor's rating and is drawn by a cable the meter measures. **The oil cooler's heat**, which leaves by the cooling water and not by the air. **The blow-off and the unload cycle**, which is $10$ to $25\ \%$ of a compressor's annual energy and is invisible in a nameplate calculation.
**The exergy account.**
$$
\text{Exergy in} = \dot{W}_{\mathrm{in}}, \qquad
\text{Exergy out} = \dot{m} \left[ \Delta h - T_0 \Delta s \right]_{\mathrm{air}}, \qquad
\eta_{\mathrm{II}} = \frac{\dot{m} \left( \Delta h - T_0 \Delta s \right)}{\dot{W}_{\mathrm{in}}}
$$
For $8\ \mathrm{bar}$ gauge air at $40\ {}^{\circ}\mathrm{C}$ the specific flow exergy is about $187\ \mathrm{kJ / kg}$, essentially the ideal isothermal work of $187\ \mathrm{kJ / kg}$, against an ideal adiabatic $260\ \mathrm{kJ / kg}$ — so a **single-stage adiabatic** compressor has a second-law efficiency of about **$55\ \%$**, and the **two-stage with intercooling** reaches $70\ \%$.
**The one note that saves the most money.** **"THE AFTERCOOLER APPROACH TEMPERATURE SHALL NOT EXCEED $10\ \mathrm{K}$ AND THE CONDENSATE DRAIN SHALL BE VISIBLE."** A hot air main is a **water** main, and $85\ \%$ of a compressor's input energy leaves through the aftercooler and the casing and is, in winter, a **heat source** worth more than the compressed air.
*Design comment.* The general rule is that **a compressor's energy account is a heat-recovery project wearing a mechanical specification**, and that the boundary must be drawn to include the cooling water, because the largest output of the machine is not the air.
:::
:::
