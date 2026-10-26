The first law says you cannot lose. The second law says you cannot even break even, and it says so with a single inequality that has never been observed to fail and has never been derived from anything deeper.

Everything in this lesson follows from one fact about **direction**: heat goes from hot to cold of its own accord and never the reverse, and a quantity of heat at a temperature $T$ in an environment at $T_0$ can be converted to work only to the extent that a **temperature difference** exists to spend. The engineering content of the second law is that this is not a limitation of materials or of machining but a limitation of **arithmetic**, and that the number which expresses it, $1 - T_0 / T$, is the most quoted and most misused fraction in the subject.

::: warning Seven second-law errors that survive peer review
**Claiming an efficiency above the Carnot limit and not noticing.** A heat engine between $800\ \mathrm{K}$ and $300\ \mathrm{K}$ has a Carnot limit of $1 - 300 / 800 = 62.5\ \%$; a paper claiming $68\ \%$ has not made a discovery, it has broken the second law, and the error is always in the **heat input**, which has been taken as a fuel's heating value when part of it left at a temperature the engine could not have used. **Using a temperature ratio with the wrong scale.** $1 - T_L / T_H$ requires **absolute** temperature, and a calculation with $1 - 25 / 300 = 0.917$ in Celsius has found a $92\ \%$ heat engine where the truth is $48\ \%$. **Confusing a heat engine's efficiency with a heat pump's coefficient of performance.** A heat pump with $\mathrm{COP} = 3.5$ is **not** $350\ \%$ efficient and is not comparable to a furnace at $92\ \%$; the two numbers have different numerators, and the correct comparison is on **exergy** (or primary energy), where, with the electricity generated at $42\ \%$, the heat pump wins by a factor of about $1.6$. **Applying the Carnot efficiency to a device that is not a heat engine between two reservoirs.** A fuel cell, a thermoelectric module, a concentration cell and a muscle are **not** heat engines and are not limited by $1 - T_0 / T$; a fuel cell's limit is $\Delta G / \Delta H$, which for hydrogen is $83\ \%$ at $25\ {}^{\circ}\mathrm{C}$ (higher heating value), and a real cell approaches it as the current falls. **Treating the surroundings as a work reservoir.** The atmosphere at $288\ \mathrm{K}$ contains about $1 \times 10^{18}\ \mathrm{MJ}$ of internal energy and can supply **none** of it as work, because there is nothing colder to reject to. A statement that "the ocean holds more energy than all the oil" is thermodynamically true and engineeringly worthless, and the second law is the reason. **Assuming a reversible device is a slow device.** Reversibility requires **no** dissipative effect — no friction, no unrestrained expansion, no heat transfer across a finite difference, no mixing, no hysteresis, no electrical resistance — and **not** slowness. A superconducting circuit is reversible at full current; a turbine running at its design point is within $8\ \%$ of reversible while the gas moves at $400\ \mathrm{m / s}$. **Adding efficiencies.** $\eta_{\mathrm{total}} \ne \eta_1 + \eta_2 - 1$ and $\eta_{\mathrm{cycle}} \ne \eta_{\mathrm{turbine}} \eta_{\mathrm{generator}}$ if the second already includes the first. The rule is that **efficiencies multiply along a chain of energy transfers and never add**, and that a chain's overall efficiency is always less than its worst link's.
:::

## Heat engines and their limits

::: definition Heat engines, refrigerators and heat pumps {#def-engines}
$$
\begin{array}{l l l l}
\text{Device} & \text{Purpose} & \text{Wanted} & \text{Performance} \\
\text{Heat engine} & \text{produce work} & W_{\mathrm{net}} & \eta = \dfrac{W_{\mathrm{net}}}{Q_H} = 1 - \dfrac{Q_L}{Q_H} \\
\text{Refrigerator} & \text{remove heat from cold} & Q_L & \mathrm{COP}_R = \dfrac{Q_L}{W_{\mathrm{net}}} = \dfrac{Q_L}{Q_H - Q_L} \\
\text{Heat pump} & \text{deliver heat to hot} & Q_H & \mathrm{COP}_{HP} = \dfrac{Q_H}{W_{\mathrm{net}}} = \mathrm{COP}_R + 1
\end{array}
$$
**The one diagram and the four arrows.** Every device exchanges $Q_H$ with a hot reservoir, $Q_L$ with a cold one and $W$ with a work reservoir; the **direction** of the arrow on $W$ distinguishes an engine from a refrigerator, and the **choice of which $Q$ is wanted** distinguishes a refrigerator from a heat pump.
**The consequence of the first law alone.** $Q_H = Q_L + W_{\mathrm{net}}$ for an engine, so $\eta < 1$ **if and only if** $Q_L > 0$. The second law is precisely the statement that $Q_L > 0$ — that **no** cyclic device can convert heat from a single reservoir entirely into work.
**The two statements, and why there are two.**
$$
\begin{array}{l l}
\textbf{Kelvin–Planck} & \text{No cyclic device can exchange heat with a single reservoir and produce a net amount of work.} \\
\textbf{Clausius} & \text{No cyclic device can operate whose sole effect is to transfer heat from a colder to a hotter body.}
\end{array}
$$
**They are equivalent.** A device violating Clausius, bolted to an ordinary engine, makes a device violating Kelvin–Planck; and a Kelvin–Planck violator driving an ordinary refrigerator makes a Clausius violator. **Neither is more fundamental**, and the reason both are taught is that they are the two ways of falsifying the same proposition.
**The two perpetual motions.** A **perpetual-motion machine of the first kind** violates the first law (creates energy) and is impossible for that reason. A **perpetual-motion machine of the second kind** obeys the first law perfectly and violates the second (extracts work from a single reservoir), and it is the one that has bankrupted more investors, because it can be built to balance its books.
:::

::: definition Reversibility and the Carnot principles {#def-rev}
A process is **reversible** if the system **and its surroundings** can both be restored to their initial states. The **surroundings** clause is the whole difficulty: a frictionless pendulum is reversible, and a frictionless pendulum that drives a generator is not, because the generator's surroundings have been warmed.
**The five sources of irreversibility, which are exhaustive in practice.**
$$
\begin{array}{l l l}
\text{Friction} & \text{solid, fluid, internal} & \text{always dissipative, always heats the body} \\
\text{Unrestrained expansion} & \text{free expansion, a valve, a leak} & X_{\mathrm{dest}} = m R T_0 \ln \left( P_1 / P_2 \right) \\
\text{Heat transfer across } \Delta T & \text{every heat exchanger ever built} & S_{\mathrm{gen}} = Q \left( 1 / T_c - 1 / T_h \right) \\
\text{Mixing} & \text{of like or unlike fluids} & \text{unlike fluids: also an entropy of diffusion} \\
\text{Hysteresis and resistance} & \text{magnetic, inelastic, electrical} & \text{a current through a resistor is fully irreversible}
\end{array}
$$
**Carnot principle 1.** No engine operating between two reservoirs can be more efficient than a reversible engine operating between the same two.
**Carnot principle 2.** All reversible engines operating between the same two reservoirs have the same efficiency.
**The proof of principle 1, which is four lines and worth memorising.** Let $A$ be reversible with $\eta_A$ and $B$ any engine with $\eta_B > \eta_A$, both sized to the same $Q_H$. Run $B$ forward and $A$ backward; the pair exchanges **no** heat with the hot reservoir (its $Q_H$ in equals $A$'s $Q_H$ out) and delivers net work $W_B - W_A > 0$ to the surroundings while taking that work **entirely from the cold reservoir**. That is a Kelvin–Planck violator, so $\eta_B \le \eta_A$. $\blacksquare$
**The consequence.** The efficiency of a reversible engine is a function of the two reservoir temperatures **alone** and of no property of no working fluid:
$$
\eta_{\mathrm{rev}} = f \left( T_H, T_L \right)
$$
and the argument that extracts the **thermodynamic temperature scale** from this is the subject of the next definition.
:::

::: definition The Carnot cycle and the temperature scale {#def-carnot}
**The cycle, in the order it is drawn on a $T$–s diagram.**
$$
\begin{array}{l l l}
1 \to 2 & \text{reversible isothermal heat addition at } T_H & Q_H = T_H \left( s_2 - s_1 \right) \\
2 \to 3 & \text{reversible adiabatic (isentropic) expansion} & s_3 = s_2 \\
3 \to 4 & \text{reversible isothermal heat rejection at } T_L & Q_L = T_L \left( s_2 - s_1 \right) \\
4 \to 1 & \text{reversible adiabatic compression} & s_1 = s_4
\end{array}
$$
**The efficiency, in one line.**
$$
\eta_{\mathrm{Carnot}} = 1 - \frac{Q_L}{Q_H} = 1 - \frac{T_L \left( s_2 - s_1 \right)}{T_H \left( s_2 - s_1 \right)} = 1 - \frac{T_L}{T_H}
$$
**The reversed Carnot cycle** is the ideal refrigerator and heat pump:
$$
\mathrm{COP}_{R,\mathrm{rev}} = \frac{T_L}{T_H - T_L}, \qquad
\mathrm{COP}_{HP,\mathrm{rev}} = \frac{T_H}{T_H - T_L}
$$
**The thermodynamic temperature scale.** Because $Q_H / Q_L$ is the same for every reversible engine between the same two reservoirs, the ratio defines a temperature ratio independent of any substance:
$$
\frac{Q_H}{Q_L} = \frac{g \left( T_H \right)}{g \left( T_L \right)}
$$
and fixing one point — historically the water triple point at $273.16\ \mathrm{K}$, since 2019 the Boltzmann constant — fixes the scale. **This is why the kelvin is not a measurement of anything and why it agrees with the ideal-gas scale to within the experimental uncertainty of the gas thermometers.**
**The number that makes the scale real.** A reversible engine between the steam point and the ice point has $\eta = 1 - 273.15 / 373.12 = 26.8\ \%$, and the same engine between the ice point and the triple point has $\eta = 0.01 / 273.16 = 0.0037\ \%$ — a number so small that no engine can measure it, which is why the scale is fixed by definition and not by experiment.
:::

::: definition What the limit says numerically {#def-numbers}
$$
\eta_{\mathrm{Carnot}} = 1 - \frac{T_L}{T_H}, \qquad
\mathrm{COP}_{HP} = \frac{T_H}{T_H - T_L}, \qquad
\mathrm{COP}_R = \frac{T_L}{T_H - T_L}
$$
$$
\begin{array}{l c c c c}
\text{Machine} & T_H & T_L & \eta_{\mathrm{Carnot}}\ \text{or COP} & \text{Typical real} \\
\text{Steam Rankine, subcritical} & 811 & 303 & 62.6\ \% & 36\ \% \\
\text{Steam ultra-supercritical} & 898 & 303 & 66.3\ \% & 45\ \% \\
\text{Gas turbine, simple} & 1{,}650 & 288 & 82.5\ \% & 38\ \% \\
\text{Combined cycle} & 1{,}650\ \text{eff.} & 288 & 82.5\ \% & 63\ \% \\
\text{Spark-ignition engine} & 2{,}400\ \text{peak} & 300 & 87.5\ \% & 33\ \% \\
\text{Diesel engine} & 2{,}600\ \text{peak} & 300 & 88.5\ \% & 46\ \% \\
\text{Steam locomotive} & 465 & 300 & 35.5\ \% & 6\ \% \\
\text{OTEC, ocean thermal} & 298 & 278 & 6.7\ \% & 2\ \% \\
\text{Domestic refrigerator} & 303\ \left( 30\ {}^{\circ}\mathrm{C} \right) & 258\ \left( - 15\ {}^{\circ}\mathrm{C} \right) & \mathrm{COP}\ 5.7 & 2.2 \\
\text{Air-source heat pump, } 0\ {}^{\circ}\mathrm{C} & 318 & 273 & \mathrm{COP}\ 7.1 & 3.1 \\
\text{Air-source heat pump, } - 20\ {}^{\circ}\mathrm{C} & 318 & 253 & \mathrm{COP}\ 4.9 & 2.0 \\
\text{Ground-source heat pump} & 318 & 281 & \mathrm{COP}\ 8.6 & 4.4
\end{array}
$$
**The three readings of this table.** **The gap between Carnot and real is largest where the cycle is simplest** — a gas turbine reaches $46\ \%$ of a Carnot limit of $82.5\ \%$, because its exhaust leaves at $550\ {}^{\circ}\mathrm{C}$ and that heat is not rejected reversibly at $T_L$ but dumped at a high temperature. **The heat pump's COP falls as the outside temperature falls, and it falls faster than the Carnot figure** because the evaporator needs a temperature difference to work, so the real machine loses $35\ \%$ of its COP (from $3.1$ to $2.0$) where Carnot loses $31\ \%$ (from $7.1$ to $4.9$). **The steam locomotive's $6\ \%$ against a Carnot limit of $35\ \%$ is not incompetence** but the price of a single-expansion engine with no condenser, and the reason a **compound** engine and a **condensing** engine each recovered a third of the difference.
**The number that ends the ocean-energy argument.** An OTEC plant between $25\ {}^{\circ}\mathrm{C}$ surface water and $5\ {}^{\circ}\mathrm{C}$ deep water has a Carnot limit of $6.7\ \%$ and a real efficiency of about $2\ \%$, so a $10\ \mathrm{MW}$ plant must collect
$$
\dot{Q}_H = \frac{\dot{W}}{\eta} = \frac{10\ \mathrm{MW}}{0.02} = 500\ \mathrm{MW}, \qquad
\dot{m}_{\text{warm water}} = \frac{\dot{Q}_H}{c_p \, \Delta T} = \frac{500 \times 10^{6}}{4{,}000 \times 3} \approx 42{,}000\ \mathrm{kg / s}
$$
if the warm seawater is cooled by $3\ \mathrm{K}$ — about $40\ \mathrm{m^{3} / s}$ of surface water and a similar flow pumped up from $1{,}000\ \mathrm{m}$ depth, with **heat exchangers of the order of a hectare** — and the second law, not the engineering, is why OTEC demonstration plants have stayed at a few hundred kilowatts or less.
:::

::: definition Maximising and minimising the difference {#def-maxmin}
**The two rules that follow from $1 - T_L / T_H$ and are the whole of cycle improvement.**
$$
\textbf{Raise } T_H \textbf{ and lower } T_L, \textbf{ and stop when the materials or the environment object.}
$$
**The history of power generation is a history of $T_H$.**
$$
\begin{array}{l c c c}
\text{Era} & T_H\ ({}^{\circ}\mathrm{C}) & \eta_{\mathrm{plant}} & \text{The constraint that moved} \\
1920 & 230 & 8\ \% & \text{boiler steel} \\
1950 & 510 & 22\ \% & \text{creep-resistant ferritic steel} \\
1970 & 565 & 36\ \% & \text{low-alloy Cr–Mo steels} \\
1990 & 580 & 42\ \% & 9 \% \mathrm{Cr}\ \text{martensitic steel (P91)} \\
2010 & 600\text{–}620\ \left( \text{ultra-supercritical} \right) & 45\ \% & \text{P92 and austenitic superheater tubes} \\
\text{Research (A-USC)} & 700 & 48\ \% & \text{nickel 617 and 740H, at } 35\ \mathrm{MPa} \\
\text{Gas turbine} & 1{,}500\ \text{turbine entry} & 40\ \% & \text{single-crystal blades and film cooling} \\
\text{Combined cycle} & \text{same} & 63\ \% & \text{the steam cycle recovers the exhaust}
\end{array}
$$
**The number that shows the return on the last $100\ \mathrm{K}$.** Going from $600$ to $700\ {}^{\circ}\mathrm{C}$ main steam at $30\ \mathrm{MPa}$ raises a supercritical plant's efficiency from $45.4\ \%$ to $48.1\ \%$ — **$2.7$ percentage points**, worth about **$5.6\ \%$** of the fuel bill — and costs a **doubling** of the boiler's material cost and a nickel alloy whose supply is a strategic question.
**The lower bound is not free either.** A condenser at $5\ {}^{\circ}\mathrm{C}$ instead of $30\ {}^{\circ}\mathrm{C}$ raises a steam cycle's efficiency by **about $3$ percentage points**, and the plant cannot do it because the cooling water is at $15\ {}^{\circ}\mathrm{C}$ and the river's consent limits its rise to $10\ \mathrm{K}$. **The cold-end temperature is set by geography and by environmental law, and it is the single largest reason a real plant sits $20$ points below its Carnot limit.**
**The number that sizes a cooling tower.** A $1{,}000\ \mathrm{MW}$ plant at $38\ \%$ efficiency rejects
$$
\dot{Q}_L = 1{,}000 \times \left( \frac{1}{0.38} - 1 \right) = 1{,}632\ \mathrm{MW}
$$
**$1.63\ \mathrm{GW}$ of heat — $62\ \%$ of the fuel** — and if a river is used at $1{,}000\ \mathrm{m^{3} / s}$ the rise is
$$
\Delta T = \frac{1{,}632 \times 10^{3}}{1000 \times 1000 \times 4.18} = 0.39\ \mathrm{K}
$$
which is acceptable, while a $100\ \mathrm{m^{3} / s}$ abstraction would give $3.9\ \mathrm{K}$ and would kill the reach of river below the outfall. **The second law is the reason a thermal power station is a heating project with an electricity by-product**, and the reason the cooling tower, not the boiler, is the largest structure on the site.
:::

::: widget plot
f: 1 - 288/(288+100*x); 0.42*1
x: 0, 12
y: 0, 0.75
labels: Carnot limit for TH = 288+100x K; a real steam plant held at 42 per cent
caption: The Carnot efficiency of a heat engine whose hot reservoir rises from $288\ \mathrm{K}$ in $100\ \mathrm{K}$ steps, against a real steam plant's efficiency held flat at $42\ \%$ for comparison. The Carnot curve rises **steeply at first and then flattens**: the first $300\ \mathrm{K}$ of temperature lift buys $51$ points of limit and the next $300\ \mathrm{K}$ only $17$. This is why the historical record of power generation is a story of the **first** few hundred kelvin of $T_H$ and why the last hundred kelvin costs a nickel-alloy supply chain.
:::

## Worked cases

::: example Testing a claim {#ex-claim}
An inventor presents an engine taking $1{,}000\ \mathrm{kJ}$ from a reservoir at $900\ \mathrm{K}$, delivering $600\ \mathrm{kJ}$ of work and rejecting $400\ \mathrm{kJ}$ to a reservoir at $300\ \mathrm{K}$. Is it possible? What if the work is $450\ \mathrm{kJ}$?
::: solution
**The first-law check.** $Q_H = W + Q_L$: $1{,}000 = 600 + 400$. $\checkmark$ The books balance, so the first law is satisfied and says nothing more.
**The second-law check.** The claimed efficiency is
$$
\eta = \frac{600}{1{,}000} = 60.0\ \%
$$
against the Carnot limit
$$
\eta_{\mathrm{Carnot}} = 1 - \frac{300}{900} = 66.7\ \% .
$$
**The claim is possible.** $60 < 66.7$, and the engine is at $60 / 66.7 = 90\ \%$ of the second-law limit, which is an **extraordinary** but not an impossible figure — real steam turbines reach $60\ \%$ of Carnot and the best combined cycles reach $76\ \%$.
**The Clausius test, which is the rigorous version.** For a cyclic device,
$$
\oint \frac{\delta Q}{T} = \frac{1{,}000}{900} - \frac{400}{300} = 1.111 - 1.333 = - 0.222\ \mathrm{kJ / K} \le 0\ \checkmark
$$
The inequality is satisfied **strictly**, so the cycle is irreversible but possible.
**The $450\ \mathrm{kJ}$ case.**
$$
\eta = 45.0\ \%, \qquad
\oint \frac{\delta Q}{T} = 1.111 - \frac{550}{300} = 1.111 - 1.833 = - 0.722\ \mathrm{kJ / K} \ \checkmark
$$
also possible, and **more irreversible** — the entropy generation is $0.722\ \mathrm{kJ / K}$ against $0.222$, and the destroyed work is
$$
W_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 300 \times 0.722 = 217\ \mathrm{kJ}
$$
against $300 \times 0.222 = 67\ \mathrm{kJ}$ for the first engine.
**The boundary case.** The **reversible** engine would deliver
$$
W_{\mathrm{rev}} = 1{,}000 \times 0.6667 = 666.7\ \mathrm{kJ}, \qquad
\oint \frac{\delta Q}{T} = 1.111 - \frac{333.3}{300} = 1.111 - 1.111 = 0
$$
and any claim **above** $666.7\ \mathrm{kJ}$ is impossible.
**The number that catches a fraud.** A claim of $700\ \mathrm{kJ}$ gives
$$
\oint \frac{\delta Q}{T} = 1.111 - \frac{300}{300} = + 0.111\ \mathrm{kJ / K} > 0 \quad \times
$$
and the test is **one line and needs no knowledge of the machine**. This is the whole of the referee's job when a "breakthrough" engine is announced, and it has never once been passed.
*Sanity.* The reason the Clausius test is preferred to the efficiency test is that it works when the engine exchanges heat with **more than two** reservoirs, where no single Carnot figure exists — and it identifies **where** the irreversibility is, because $\delta Q / T$ is evaluated at each reservoir's temperature.
:::
:::

::: example A heat pump versus a furnace {#ex-hp}
A house needs $12\ \mathrm{kW}$ of heat on a $- 5\ {}^{\circ}\mathrm{C}$ day. Compare a gas furnace at $92\ \%$ with an air-source heat pump at $\mathrm{COP} = 2.8$, on energy, on cost and on exergy.
::: solution
**The energy.**
$$
\text{Furnace: } \dot{Q}_{\mathrm{fuel}} = \frac{12}{0.92} = 13.04\ \mathrm{kW_{th}} \quad \Rightarrow \quad \frac{13.04 \times 3.6}{39} = 1.20\ \mathrm{m^{3} / h\ of\ gas}
$$
$$
\text{Heat pump: } \dot{W} = \frac{12}{2.8} = 4.29\ \mathrm{kW_{el}}
$$
**The primary energy, with the grid at $42\ \%$ efficiency.**
$$
\text{Furnace: } 13.04\ \mathrm{kW} \text{ primary}, \qquad
\text{Heat pump: } \frac{4.29}{0.42} = 10.21\ \mathrm{kW} \text{ primary}
$$
**The heat pump uses $22\ \%$ less primary energy** — and the win is smaller than the $3.0$-fold difference at the meter, because the electricity was made at $42\ \%$.
**The cost, at European 2024 prices.**
$$
\text{Furnace: } 13.04 \times 0.075 = 0.98\ \text{currency units / h}, \qquad
\text{Heat pump: } 4.29 \times 0.22 = 0.94\ \text{currency units / h}
$$
**A $4\ \%$ saving, which is why the argument is never about money at these prices** and is always about carbon, about the $92\ \%$ being a **gross** calorific value that already credits the flue's latent heat, and about the fact that the heat pump's COP falls to $1.9$ at $- 20\ {}^{\circ}\mathrm{C}$ while the furnace's efficiency does not move.
**The exergy comparison, which is the honest one.** The **service wanted** is $12\ \mathrm{kW}$ of heat at $20\ {}^{\circ}\mathrm{C}$ in an environment at $- 5\ {}^{\circ}\mathrm{C}$, whose exergy content is
$$
\dot{X}_{\mathrm{service}} = \dot{Q} \left( 1 - \frac{T_0}{T} \right) = 12 \times \left( 1 - \frac{268.15}{293.15} \right) = 12 \times 0.0853 = 1.02\ \mathrm{kW}
$$
**The service is worth $1.0\ \mathrm{kW}$ of work and the house is paying for $13.0\ \mathrm{kW}$ of fuel exergy or $4.3\ \mathrm{kW}$ of electricity exergy.**
$$
\eta_{\mathrm{II, furnace}} = \frac{1.02}{13.04 \times 1.04} = 7.5\ \%, \qquad
\eta_{\mathrm{II, HP}} = \frac{1.02}{4.29} = 23.8\ \%
$$
**The heat pump is $3.2$ times as exergetically efficient as the furnace** and both are terrible, because **heating a house with work-capable energy is thermodynamically obscene** and the only reason it is done is that work-capable energy is cheap and heat is not.
**The number that shows the real opportunity.** A **district** heat pump lifting a sewage-treatment outfall from $14\ {}^{\circ}\mathrm{C}$ to $60\ {}^{\circ}\mathrm{C}$ has a Carnot COP of $333 / 46 = 7.2$ and a real COP of $3.8$, and it delivers heat whose exergy is $1 - 268 / 333 = 0.195$ of its energy — so its second-law efficiency is $3.8 \times 0.195 = 74\ \%$. **The same machine, at a higher delivery temperature and a warmer source, is three times as exergetically efficient as the house heat pump** — and this is why every serious decarbonisation plan puts large heat pumps on **waste** heat and not on outside air.
*Sanity.* The reason the furnace's $92\ \%$ is not comparable to a heat pump's $280\ \%$ is that the two numerators are different quantities: the furnace's is the fuel's heating value and the heat pump's is the electricity meter. Put both on exergy and the comparison is $7.5\ \%$ against $23.8\ \%$, which is unambiguous and which no marketing department has ever printed.
:::
:::

::: example A refrigerator's real coefficient of performance {#ex-fridge}
A domestic refrigerator removes $120\ \mathrm{W}$ from a compartment at $- 15\ {}^{\circ}\mathrm{C}$ and rejects it to a kitchen at $30\ {}^{\circ}\mathrm{C}$. Its compressor draws $105\ \mathrm{W}$. Find the COP, the Carnot COP, the second-law efficiency, the entropy generation and the heat it adds to the kitchen.
::: solution
**The COP.**
$$
\mathrm{COP}_R = \frac{\dot{Q}_L}{\dot{W}} = \frac{120}{105} = 1.143
$$
**The Carnot COP.**
$$
\mathrm{COP}_{R,\mathrm{rev}} = \frac{T_L}{T_H - T_L} = \frac{258.15}{303.15 - 258.15} = \frac{258.15}{45.0} = 5.74
$$
**The second-law efficiency.**
$$
\eta_{\mathrm{II}} = \frac{1.143}{5.74} = 19.9\ \%
$$
**The heat rejected.**
$$
\dot{Q}_H = 120 + 105 = 225\ \mathrm{W}
$$
**The kitchen's heat load.** The refrigerator adds **$225\ \mathrm{W}$** to the kitchen while removing $120\ \mathrm{W}$ from its compartment, so **an open refrigerator door warms the room** — and the warming is $105\ \mathrm{W}$, exactly the compressor's input, which is the answer the first law gives without any second law at all.
**The entropy generation.**
$$
\dot{S}_{\mathrm{gen}} = - \frac{\dot{Q}_L}{T_L} + \frac{\dot{Q}_H}{T_H} = - \frac{120}{258.15} + \frac{225}{303.15} = - 0.4648 + 0.7422 = 0.277\ \mathrm{W / K}
$$
**The destroyed work.**
$$
\dot{W}_{\mathrm{dest}} = T_0 \dot{S}_{\mathrm{gen}} = 303.15 \times 0.277 = 84\ \mathrm{W}
$$
**The check.** The minimum power is $\dot{W}_{\mathrm{rev}} = \dot{Q}_L / \mathrm{COP}_{\mathrm{rev}} = 120 / 5.74 = 20.9\ \mathrm{W}$, and $20.9 + 84 = 105\ \mathrm{W}$ — the actual input. $\checkmark$
**The verdict.** **$84\ \mathrm{W}$ of the $105\ \mathrm{W}$ drawn is destroyed**, and the machine uses **five times** the minimum power. Where it goes:
$$
\begin{array}{l c}
\text{Compressor motor inefficiency and the suction-gas superheat} & \approx 25\ \mathrm{W} \\
\text{Condenser approach temperature (a } 10\ \mathrm{K}\ \text{difference costs about } 20\ \mathrm{W)} & \approx 20\ \mathrm{W} \\
\text{Evaporator approach temperature} & \approx 15\ \mathrm{W} \\
\text{Capillary-tube throttling} & \approx 12\ \mathrm{W} \\
\text{Fan, defrost, control, heat leak through the door gasket} & \approx 12\ \mathrm{W}
\end{array}
$$
**The number that drives the whole industry.** A **$10\ \mathrm{K}$** condenser approach costs about **$20\ \mathrm{W}$** out of $105$, which is **$19\ \%$** of the machine's electricity — and the whole of a refrigerator's condenser design, its fin spacing, its fan and its dust filter, is the pursuit of those $20\ \mathrm{W}$.
**The rule.** **Every heat exchanger's temperature difference is a power bill.** A $1\ \mathrm{K}$ reduction in the condenser approach on this machine is worth $2\ \mathrm{W}$ and $1.9\ \%$, and the exchanger area that buys it costs more than the electricity — which is why the optimum approach is $8$ to $12\ \mathrm{K}$ and not zero.
*Sanity.* The reason the Carnot COP is $5.74$ and the real one $1.14$ is not that the compressor is bad — a modern hermetic compressor is $70\ \%$ efficient — but that the **heat exchangers** run on $10\ \mathrm{K}$ differences and the **capillary tube** destroys $12\ \mathrm{W}$ of work in throttling. A refrigerator with an **expander** instead of a capillary, a $3\ \mathrm{K}$ approach and a variable-speed compressor reaches a COP of $2.6$ and costs three times as much, which is the second law priced.
:::
:::

::: example Two engines in series {#ex-series}
A heat engine takes heat from a reservoir at $1{,}000\ \mathrm{K}$ and rejects to one at $400\ \mathrm{K}$ at $80\ \%$ of Carnot. A second engine takes the first's reject heat and rejects to $300\ \mathrm{K}$, also at $80\ \%$ of Carnot. Find each efficiency, the overall efficiency and the entropy generation per kilojoule of heat input.
::: solution
**Engine 1.**
$$
\eta_{1,\mathrm{C}} = 1 - \frac{400}{1000} = 60.0\ \%, \qquad
\eta_1 = 0.80 \times 0.600 = 48.0\ \%
$$
$$
W_1 = 480\ \mathrm{kJ}, \qquad Q_{L1} = 520\ \mathrm{kJ}
$$
**Engine 2.**
$$
\eta_{2,\mathrm{C}} = 1 - \frac{300}{400} = 25.0\ \%, \qquad
\eta_2 = 0.80 \times 0.250 = 20.0\ \%
$$
$$
W_2 = 0.200 \times 520 = 104\ \mathrm{kJ}, \qquad Q_{L2} = 416\ \mathrm{kJ}
$$
**The overall.**
$$
W_{\mathrm{total}} = 584\ \mathrm{kJ}, \qquad
\eta_{\mathrm{overall}} = 58.4\ \%
$$
**The comparison with a single engine at the same second-law quality.**
$$
\eta_{\mathrm{C,overall}} = 1 - \frac{300}{1000} = 70.0\ \%, \qquad
0.80 \times 0.700 = 56.0\ \%
$$
**The two-in-series arrangement is $2.4$ points better** than a single engine at the same $80\ \%$ of Carnot, because **splitting the temperature lift into two stages reduces the average temperature difference across which heat is supplied and rejected** — which is the whole thermodynamic argument for a **reheat**, a **regeneration** and a **combined cycle**, expressed in one arithmetic example.
**The entropy generation.**
$$
\dot{S}_{\mathrm{gen}} = - \frac{1000}{1000} + \frac{416}{300} = - 1.000 + 1.387 = 0.387\ \mathrm{kJ / K}
$$
$$
W_{\mathrm{dest}} = T_0 S_{\mathrm{gen}} = 300 \times 0.387 = 116\ \mathrm{kJ}
$$
**The check.** $W_{\mathrm{rev}} = 1000 \times 0.700 = 700\ \mathrm{kJ}$ and $700 - 584 = 116\ \mathrm{kJ}$. $\checkmark$
**The number that generalises.** The destroyed work is **$11.6\ \%$** of the heat input and **$16.6\ \%$** of the reversible work, and it splits
$$
\begin{array}{l c}
\text{Engine 1: } T_0 \left( - 1000 / 1000 + 520 / 400 \right) = 300 \times 0.300 & 90\ \mathrm{kJ} \\
\text{Engine 2: } T_0 \left( - 520 / 400 + 416 / 300 \right) = 300 \times 0.0867 & 26\ \mathrm{kJ} \\
\text{The transfer across a finite difference between them} & \text{none, because engine 1 rejects at } 400\ \mathrm{K} \text{ and engine 2 receives at } 400\ \mathrm{K}
\end{array}
$$
and $90 + 26 = 116\ \mathrm{kJ}$. $\checkmark$ Engine 1 falls $0.20 \times 600 = 120\ \mathrm{kJ}$ short of its own Carnot work, but that shortfall leaves as extra heat at $400\ \mathrm{K}$, a quarter of which is still convertible to work below it; measured against the environment it destroys $120 \times 0.75 = 90\ \mathrm{kJ}$. **Destroyed work must be summed as $T_0 S_{\mathrm{gen}}$ at one reference temperature**, never as shortfalls against each engine's own limit.
*Sanity.* The reason the second engine contributes so little is that its Carnot limit is only $25\ \%$: **the value of heat is set by the temperature at which it is available, and $520\ \mathrm{kJ}$ of heat at $400\ \mathrm{K}$ is worth at most $130\ \mathrm{kJ}$ of work**. This is the whole of the case against "waste heat recovery" as a phrase — the heat is not waste, it is **low-grade**, and the recovery is worth doing only when the grade is high enough to buy something.
:::
:::

::: history
The second law was invented to explain a **number**: Watt's engines used about **a quarter** of the coal Newcomen's had for the same work, and nobody could say what set the ceiling. **Sadi Carnot**, twenty-eight years old and an army engineer officer, wrote the **1824** *Réflexions* on the caloric theory — heat as an imperishable fluid falling from a hot to a cold body as water falls over a wheel — and derived from it the proposition that the efficiency depends **only on the two temperatures** and on nothing else, including the working substance. **The theory was wrong and the theorem was right**, and Carnot's own notes, published only in 1878, show that he later abandoned caloric and estimated the mechanical equivalent of heat. **Benoît Paul Émile Clapeyron** restated it graphically in **1834**, and it was **reading Clapeyron's diagram** that told **Kelvin** in **1848** that the efficiency implied an absolute temperature scale "derived from the principle of Carnot's engine, independent of the properties of any substance" — the scale this lesson uses. **Clausius** in **1850** reconciled Carnot with Joule by allowing caloric to be destroyed, and in **1854** wrote the inequality that bears his name; **the word entropy** followed in **1865**, chosen from the Greek *τροπή*, transformation, and deliberately made to resemble *energy* so that the two concepts would be hard to keep apart. **Kelvin**'s **1851** paper *On the Dynamical Theory of Heat* gave his single-reservoir axiom and showed it equivalent to Clausius's statement, and **Planck** gave the perpetual-motion form in his **1897** *Vorlesungen über Thermodynamik* — hence the joint name **Kelvin–Planck**. **The proof that no engine beats a reversible one** — the argument by coupling two engines that this lesson reproduces — is **Carnot**'s own, made on the caloric theory and re-made on the energy basis by **Clausius** in **1850** and **Kelvin** in **1851**.
:::

## Where this leads

The limit derived here is the ceiling that [[thermodynamics/power-cycles]] spends the rest of the course approaching; the entropy that quantifies it is defined in [[thermodynamics/entropy]], the destroyed work in [[thermodynamics/exergy]], and the temperature scale is used unchanged in [[thermodynamics/mixtures-combustion]] and in every property table in [[thermodynamics/pure-substances]].

::: summary
- No cyclic device can turn heat from a single reservoir entirely into work, and no cyclic device can move heat from cold to hot with no other effect — the two statements are the same statement.
- The Carnot limit is $1 - T_L/T_H$ in absolute temperature, and it is a property of the two reservoirs and of no working fluid.
- A claim is impossible if and only if $\oint \delta Q / T > 0$, and that test is one line and needs no knowledge of the machine.
- A heat pump's COP and a furnace's efficiency have different numerators; compared on exergy the heat pump wins by about three to one and both are poor.
- A refrigerator that removes $120\ \mathrm{W}$ adds $225\ \mathrm{W}$ to the room, and $84\ \mathrm{W}$ of its $105\ \mathrm{W}$ input is destroyed.
- Two engines in series at $80\ \%$ of Carnot each beat one engine at $80\ \%$ of Carnot, which is the whole argument for reheat, regeneration and combined cycles.
- The cold-end temperature is set by geography and environmental law, and it is the largest single reason a real plant sits twenty points below its Carnot limit.
:::

::: quiz
A device is claimed to take $500\ \mathrm{kJ}$ from a $600\ \mathrm{K}$ reservoir, deliver $250\ \mathrm{kJ}$ of work and reject $250\ \mathrm{kJ}$ to a $300\ \mathrm{K}$ reservoir. What does the second law say?
- [ ] It is impossible, because its efficiency equals the Carnot limit
- [x] It is possible, and it is a reversible engine
- [ ] It is impossible, because the first law is not satisfied
- [ ] Nothing can be said without knowing the working fluid
::: solution
$\eta = 250 / 500 = 50\ \%$ against $\eta_C = 1 - 300 / 600 = 50\ \%$: the claim **attains** the Carnot limit, and $\oint \delta Q / T = 500 / 600 - 250 / 300 = 0.833 - 0.833 = 0$ exactly. A zero Clausius integral means **reversible**, so the device is not impossible — it is a **Carnot engine**, which is to say an idealisation no real machine reaches. Claims that *meet* the limit are as suspicious as claims that exceed it, and the difference is that meeting it is only unreachable rather than contradictory.
:::
:::

## Exercises

::: exercise Scale {level=1 check="0.5"}
Give the Carnot efficiency of an engine between $500\ \mathrm{K}$ and $250\ \mathrm{K}$.
::: solution
$1 - 250 / 500 = 0.5$, i.e. $50\ \%$.
:::
:::

::: exercise COP relation {level=1 check="1"}
Give $\mathrm{COP}_{HP} - \mathrm{COP}_R$.
::: solution
$1$ — the delivered heat equals the extracted heat plus the work.
:::
:::

::: exercise Clausius {level=1 check="0"}
For a reversible cyclic device, what is $\oint \delta Q / T$?
::: solution
$0$ — and it is negative for an irreversible one and never positive.
:::
:::

::: exercise Reversed Carnot {level=1 check="7.1"}
Give the Carnot COP of a heat pump that lifts heat from $273\ \mathrm{K}$ to $318\ \mathrm{K}$.
::: solution
$\mathrm{COP}_{HP} = T_H / (T_H - T_L) = 318 / 45 = 7.1$.
:::
:::

::: exercise Perpetual motion {level=1 check="2"}
A machine produces no energy and no mass flow and converts $100\ \mathrm{kJ}$ of heat from a single $400\ \mathrm{K}$ reservoir entirely into work. Which law does it violate? (Enter the number of the law.)
::: solution
The **second** law only — the first is perfectly satisfied. This is a perpetual-motion machine of the second kind.
:::
:::

::: exercise Claim {level=2}
An engine takes $800\ \mathrm{kJ}$ from a $1{,}200\ \mathrm{K}$ reservoir, delivers $500\ \mathrm{kJ}$ of work and rejects the rest to a $300\ \mathrm{K}$ reservoir. Test the claim.
::: solution
$$
Q_L = 800 - 500 = 300\ \mathrm{kJ}
$$
$$
\eta = \frac{500}{800} = 62.5\ \%, \qquad \eta_{\mathrm{Carnot}} = 1 - \frac{300}{1200} = 75.0\ \%
$$
The efficiency test passes. The Clausius test:
$$
\oint \frac{\delta Q}{T} = \frac{800}{1200} - \frac{300}{300} = 0.667 - 1.000 = - 0.333\ \mathrm{kJ / K} \le 0\ \checkmark
$$
**The engine is possible** and is at $62.5 / 75.0 = 83\ \%$ of the second-law limit — high but not absurd.
*Sanity.* The destroyed work is $T_0 S_{\mathrm{gen}} = 300 \times 0.333 = 100\ \mathrm{kJ}$, and the reversible engine would deliver $800 \times 0.75 = 600\ \mathrm{kJ}$, of which $600 - 500 = 100\ \mathrm{kJ}$ is exactly the destroyed amount. The two checks agree, and the agreement is the Gouy–Stodola theorem.
:::
:::

::: exercise Heat pump {level=2}
A heat pump must deliver $20\ \mathrm{kW}$ of heat at $50\ {}^{\circ}\mathrm{C}$ when the outside air is at $-12\ {}^{\circ}\mathrm{C}$. Give the Carnot COP, the power at a real COP of $2.4$, and the second-law efficiency.
::: solution
$$
\mathrm{COP}_{\mathrm{C}} = \frac{323.15}{323.15 - 261.15} = \frac{323.15}{62.0} = 5.21
$$
$$
\dot{W} = \frac{20}{2.4} = 8.33\ \mathrm{kW}, \qquad
\eta_{\mathrm{II}} = \frac{2.4}{5.21} = 46.1\ \%
$$
**The heat extracted from the outside air** is $20 - 8.33 = 11.67\ \mathrm{kW}$, and the evaporator must therefore be cold enough to pull heat from $- 12\ {}^{\circ}\mathrm{C}$ air, which means an evaporating temperature of about $- 20\ {}^{\circ}\mathrm{C}$ and an **air-side** temperature difference of $8\ \mathrm{K}$.
*Sanity.* The $46\ \%$ second-law efficiency is **good** for an air-source machine — the best reach $55\ \%$ — and the reason it is not higher is the two temperature differences the exchangers need. If the same machine drew from a $10\ {}^{\circ}\mathrm{C}$ ground loop instead, the Carnot COP would be $323 / 40 = 8.1$ and the real COP about $3.6$: **the source temperature is worth more than the machine.**
:::
:::

::: exercise Derivation {level=3}
Prove Carnot's two principles by the coupled-engine argument, then show that the thermodynamic temperature scale defined by $Q_H / Q_L = g(T_H) / g(T_L)$ agrees with the ideal-gas scale $T = PV / (mR)$.
::: solution
**Principle 1.** Let $A$ be reversible and $B$ arbitrary with $\eta_B > \eta_A$, both adjusted to absorb the same $Q_H$. Then
$$
W_A = \eta_A Q_H, \qquad W_B = \eta_B Q_H, \qquad W_B - W_A > 0
$$
Run $B$ forward and $A$ **reversed**. The reversed $A$ rejects $Q_H$ to the hot reservoir, exactly cancelling $B$'s $Q_H$, so the **hot reservoir is untouched**. The composite device delivers $W_B - W_A > 0$ while exchanging heat with the **cold reservoir alone** — a Kelvin–Planck violator. Hence $\eta_B \le \eta_A$. $\blacksquare$
**Principle 2.** If two reversible engines $A$ and $B$ between the same reservoirs had $\eta_A > \eta_B$, the argument above with the roles reversed would show $\eta_A \le \eta_B$. Hence $\eta_A = \eta_B$. $\blacksquare$
**The temperature scale.** Since $\eta_{\mathrm{rev}}$ depends on $T_H$ and $T_L$ alone,
$$
\frac{Q_L}{Q_H} = F \left( T_L, T_H \right)
$$
Consider three reservoirs and a chain of reversible engines:
$$
\frac{Q_3}{Q_1} = \frac{Q_2}{Q_1} \cdot \frac{Q_3}{Q_2} \quad \Rightarrow \quad
F \left( T_3, T_1 \right) = F \left( T_2, T_1 \right) F \left( T_3, T_2 \right)
$$
The middle temperature $T_2$ has cancelled from the left-hand side, so it must cancel from the right, which forces the **multiplicative** form
$$
F \left( T_L, T_H \right) = \frac{g \left( T_L \right)}{g \left( T_H \right)}
$$
**The identification with the gas scale.** For a **reversible isothermal** process of an ideal gas the heat absorbed is
$$
Q = \int T \, d s = m R T \ln \left( V_2 / V_1 \right)
$$
and for a Carnot cycle between $T_H$ and $T_L$ with the same volume ratios,
$$
\frac{Q_H}{Q_L} = \frac{T_H}{T_L} \quad \text{(ideal gas)}
$$
Comparing with $Q_H / Q_L = g \left( T_H \right) / g \left( T_L \right)$ gives $g \left( T \right) \propto T$, so **the thermodynamic scale and the ideal-gas scale differ at most by a constant factor**, which is fixed by assigning $273.16\ \mathrm{K}$ to the water triple point. $\blacksquare$
**The evaluation that makes it non-vacuous.** A reversible engine between the zinc ($692.677\ \mathrm{K}$) and silver ($1{,}234.93\ \mathrm{K}$) freezing points must give $Q_H / Q_L = 1.7828$. Primary thermometers built on unrelated physics — gas thermometry, acoustic thermometry and radiometry — agree with these values to **better than $1$ part in $10^{4}$**, which is the experimental content of the second law: it has never been observed to fail, and the agreement is not a tautology because the two scales are built from entirely different phenomena.
*Sanity.* The reason the multiplicative form is forced and not assumed is the **cancellation of the intermediate reservoir**, and the reason that step is worth checking is that it fails for an **irreversible** engine — for which $Q_3 / Q_1 \ne \left( Q_2 / Q_1 \right) \left( Q_3 / Q_2 \right)$ because the intermediate heat quantities are not defined by the reservoirs alone. The whole construction of the temperature scale rests on reversibility, and if the second law were ever found to fail the scale would go with it.
:::
:::

::: exercise Design {level=3}
Specify the second-law performance basis, the exergy accounting and the reporting requirements for a $200\ \mathrm{MW_{th}}$ industrial waste-heat recovery project with three candidate source streams.
::: solution
**The three streams and their exergy.**
$$
\begin{array}{l c c c c}
\text{Stream} & \dot{Q}\ (\mathrm{MW}) & \bar{T}\ ({}^{\circ}\mathrm{C}) & \zeta = 1 - T_0 / \bar{T} & \dot{X}\ (\mathrm{MW}) \\
\text{A: kiln flue gas} & 60 & 620 & 0.666 & 40.0 \\
\text{B: dryer exhaust} & 90 & 140 & 0.278 & 25.0 \\
\text{C: cooling-water return} & 50 & 38 & 0.042 & 2.1 \\
\hline
\text{Total heat} & 200 & & & \text{Total exergy } 67.1
\end{array}
$$
**The reading.** With $T_0 = 298.15\ \mathrm{K}$ and $\bar{T}$ taken as each stream's temperature of heat release (a simplification: a stream that cools as it gives up heat has a lower mean temperature and less exergy), **$200\ \mathrm{MW_{th}}$ contains $67.1\ \mathrm{MW}$ of work-capable energy — $34\ \%$ — and stream C, which is a quarter of the heat, carries $3\ \%$ of the exergy.** A project that recovers all three streams "because the heat is there" has mis-stated the resource by a factor of three.
**The candidate conversions.**
$$
\begin{array}{l l c c}
\text{Stream} & \text{Conversion} & \text{Output} & \eta_{\mathrm{II}} \\
\text{A} & \text{unfired ORC, } 8\ \mathrm{MW_e} & 8\ \mathrm{MW_e} & 8 / 40.0 = 20\ \% \\
\text{A} & \text{boiler + steam turbine, } 11\ \mathrm{MW_e} & 11\ \mathrm{MW_e} & 11 / 40.0 = 28\ \% \\
\text{B} & \text{hot water for district heat at } 90\ {}^{\circ}\mathrm{C} & 85\ \mathrm{MW_{th}} & 85 \times 0.179 / 25.0 = 61\ \% \\
\text{B} & \text{absorption chiller, COP } 0.7,\ 7\ {}^{\circ}\mathrm{C} & 60\ \mathrm{MW_c} & 60 \times 0.064 / 25.0 = 15\ \% \\
\text{C} & \text{heat pump lift to } 65\ {}^{\circ}\mathrm{C},\ \mathrm{COP}\ 3.4 & 50\ \mathrm{MW_{th}} & 50 \times 0.118 / \left( 14.7 + 35.3 \times 0.042 \right) = 37\ \% \\
\text{C} & \text{dry cooling tower} & - & 0
\end{array}
$$
**The ranking, which the energy figures do not give.** On **energy**, stream B is the prize at $90\ \mathrm{MW}$. On **exergy**, stream A is the prize at $40\ \mathrm{MW}$, stream B is best used as district heat (the highest second-law efficiency on the list), and stream C, at $2\ \mathrm{MW}$ of exergy, is worth recovering **only** as a heat-pump source — and then mainly for the $14.7\ \mathrm{MW}$ of electricity the heat pump turns into heat.
**The four reporting requirements.**
$$
\begin{array}{l l}
1 & \text{Every stream's exergy at a stated dead state } \left( T_0, P_0 \right),\ \text{with the reference named} \\
2 & \text{The second-law efficiency of every conversion, not only the first-law one} \\
3 & \text{The destroyed exergy located by component, in a table that sums to the total} \\
4 & \text{The sensitivity of every figure to } T_0,\ \text{because a } 10\ \mathrm{K}\ \text{change moves } \zeta \text{ by } 10 / \bar{T}\text{: three points for stream C, whose } \zeta \text{ is only four}
\end{array}
$$
**The three clauses that decide the project.** **"THE DEAD STATE SHALL BE $25\ {}^{\circ}\mathrm{C}$, $101.325\ \mathrm{kPa}$, DRY AIR, AND ALL EXERGY FIGURES SHALL BE STATED ON THAT BASIS."** **"A STREAM SHALL BE RECOVERED ONLY IF ITS EXERGY EXCEEDS THE EXERGY OF THE UTILITIES THE RECOVERY CONSUMES."** **"THE HEAT-PUMP, ORC AND STEAM-TURBINE OPTIONS SHALL BE COMPARED ON DESTROYED EXERGY AND NOT ON ENERGY."**
**The number that kills the marginal case.** Stream C's dry-cooling-tower option destroys $2.1\ \mathrm{MW}$ of exergy for nothing; its heat-pump option takes in $14.7 + 1.5 = 16.2\ \mathrm{MW}$ of exergy (electricity plus the part of stream C it uses), delivers $50 \times 0.118 = 5.9\ \mathrm{MW}$ and destroys $10.3\ \mathrm{MW}$. **Both figures must be reported**, because a project appraised on energy sees a $50\ \mathrm{MW}$ "loss" from cooling water and a $50\ \mathrm{MW}$ "gain" from the heat pump, and the second law sees a $2\ \mathrm{MW}$ resource turned into a $6\ \mathrm{MW}$ product with $14.7\ \mathrm{MW}$ of electricity.
*Design comment.* The general rule is that **a waste-heat project is an exergy resource assessment wearing an energy balance**, and that the party who reports only the energy has, without intending to, recommended the wrong three of the four options.
:::
:::
