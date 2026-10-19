Two lessons in one, joined by the fact that both are about **counting atoms**. The first is that a mixture of ideal gases behaves as though each component occupied the vessel alone, so that a mixture's properties are a mole-fraction-weighted average of properties that each component already had. The second is that atoms are conserved across a reaction, so that a flame is a **mass balance with a heat release**, and everything about it — the temperature, the dew point, the pollution, the exergy — follows from the balance and the heat.

The reason both belong in a thermodynamics course and not a chemistry one is that engineers meet mixtures in every pipe and combustion in every furnace, and in both cases the hard part is not the physics but the **bookkeeping discipline** of stating a basis, keeping the water on the right side of the equation, and never mixing the mass and mole bases in the same line.

::: warning Seven mixture-and-combustion errors that survive a plant's commissioning
**Mixing the mass and mole bases in one equation.** Mole fractions give the gas constant, the reaction stoichiometry and the equilibrium; mass fractions give the specific heat on a kilogram basis and the fuel's heating value. A calculation that multiplies a **mole** fraction by a **mass**-based specific heat is wrong by the ratio of the component's molar mass to the mixture's, which for the water vapour in humid air is $18 / 28.97 = 0.62$ — a **$62\ \%$** error, and the origin of the factor $0.622$ that appears in every psychrometric formula. **Using the apparent pressure instead of the partial pressure for the water.** The relative humidity is $\phi = p_v / p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)$, and $p_{\mathrm{sat}}$ is evaluated at the **dry-bulb** temperature; the **dew point** is the saturation temperature at the **vapour's partial pressure**. A calculation that reads the dew point from the dry-bulb saturation pressure reports $30\ {}^{\circ}\mathrm{C}$ instead of $18\ {}^{\circ}\mathrm{C}$ for air at $30\ {}^{\circ}\mathrm{C}$ and $50\ \%$ humidity. **Forgetting the water in the flue gas.** Burning methane makes **two moles of water per mole of fuel**, and the water is $18\ \%$ of the dry-plus-wet flue gas by volume. A flue-gas dew-point calculation that uses the **dry** analysis reports a dew point of $20\ {}^{\circ}\mathrm{C}$ instead of $55\ {}^{\circ}\mathrm{C}$ and a boiler that corrodes in a year. **Reporting an Orsat analysis as though it included the water.** The Orsat absorbs the $\mathrm{CO_2}$ and the $\mathrm{O_2}$ **before** the sample reaches the water vapour, so the analysis is **on a dry basis** and the sum of $\mathrm{CO_2} + \mathrm{O_2} + \mathrm{CO} + \mathrm{N_2}$ is $100\ \%$ by construction. A carbon balance done against a wet analysis over-states the excess air by **$15\ \%$**. **Assuming the adiabatic flame temperature is a property of the fuel.** It depends on the oxidant, the equivalence ratio, the pressure, the inlet temperature and the extent of dissociation. Methane in air at the stoichiometric ratio gives $2{,}150\ {}^{\circ}\mathrm{C}$; in **oxygen** it gives $3{,}000\ {}^{\circ}\mathrm{C}$; at $\phi = 1.2$ it gives $2{,}200\ {}^{\circ}\mathrm{C}$; in air preheated to $600\ {}^{\circ}\mathrm{C}$ it gives $2{,}500\ {}^{\circ}\mathrm{C}$; and at $20\ \mathrm{bar}$ it is **lower** because dissociation of $\mathrm{CO_2}$ and $\mathrm{H_2O}$ increases with pressure at constant temperature. **Balancing a reaction with the air's argon in the nitrogen.** Standard combustion analysis treats air as $21\ \%\ \mathrm{O_2}$ and $79\ \%\ \mathrm{N_2}$, i.e. $3.76\ \mathrm{mol\ N_2}$ per mole of oxygen, and uses $M_{\mathrm{air}} = 28.97$ and $R_{\mathrm{air}} = 0.287$. A calculation that uses $3.76$ in the stoichiometry and $28.85$ for the gas constant has been inconsistent by **$0.4\ \%$**, which is small — but a calculation that uses the **real** $79\ \%\ \mathrm{N_2}$, $0.93\ \%\ \mathrm{Ar}$ composition in one place and the $3.76$ convention in another has made an error that no amount of checking will find. **Treating the higher heating value as the available energy.** The HHV credits the latent heat of the water in the products, which is recoverable only if the flue gas is condensed **below** the dew point — and the water's latent heat is **$10.9\ \%$** of methane's HHV. A condensing boiler "efficiency" of $106\ \%$ on an HHV basis is $95\ \%$ on an LHV basis and is a **correct** figure, and a specification that does not name its basis is not a specification.
:::

## Gas mixtures

::: definition Composition and the two laws {#def-mixtures}
**Dalton's law of additive pressures** and **Amagat's law of additive volumes**, both exact for ideal gases:
$$
P = \sum_i p_i \ \ \left( T, V \ \text{fixed} \right), \qquad
V = \sum_i V_i \ \ \left( T, P \ \text{fixed} \right), \qquad
y_i = \frac{p_i}{P} = \frac{V_i}{V} = \frac{n_i}{n}
$$
**The two composition bases.**
$$
y_i = \frac{n_i}{n} = \frac{m_i / M_i}{\sum_j m_j / M_j}, \qquad
w_i = \frac{m_i}{m} = \frac{y_i M_i}{\sum_j y_j M_j}
$$
**The mixture's molar mass and gas constant.**
$$
M_m = \sum_i y_i M_i, \qquad R_m = \frac{R_u}{M_m} = \sum_i y_i R_i, \qquad R_u = 8.31446\ \mathrm{kJ / kmol \cdot K}
$$
**The number that everyone uses and nobody checks.** Dry air as $21\ \%\ \mathrm{O_2}$, $79\ \%\ \mathrm{N_2}$:
$$
M_{\mathrm{air}} = 0.21 \times 31.999 + 0.79 \times 28.013 = 28.85\ \mathrm{kg / kmol}, \qquad R = 0.2882
$$
with the **real** composition including argon giving $M = 28.97$ and $R = 0.2870$. **The $0.4\ \%$ difference is the argon**, and the convention is to use $28.97$ and $0.287$ for air and $3.76$ in the stoichiometry, which is mutually consistent to $0.4\ \%$.
**The apparent and partial specific properties.** For an ideal-gas mixture at $T$:
$$
u_m = \sum_i y_i u_i \left( T \right), \quad h_m = \sum_i y_i h_i \left( T \right), \quad
c_{v,m} = \sum_i y_i c_{v,i} \left( T \right)
$$
**Each component behaves as though it alone occupied the volume at $T$** — the internal energy and enthalpy of an ideal gas do not depend on pressure, so the partial and apparent values coincide. **The entropy does not**, and this is the whole of the entropy of mixing:
$$
\bar{s}_i \left( T, p_i \right) = \bar{s}_i^{\circ} \left( T, P \right) - R_u \ln y_i
$$
**The evaluation.** Bringing $1\ \mathrm{kmol}$ of nitrogen at $100\ \mathrm{kPa}$ into a mixture where its partial pressure is $79\ \mathrm{kPa}$ costs
$$
\Delta \bar{s} = - 8.314 \ln 0.79 = + 1.96\ \mathrm{kJ / kmol \cdot K}
$$
**The number that makes mixtures a thermodynamic problem and not a bookkeeping one**: every mixing process in a power plant — the air into the fuel, the fuel into the air, the exhaust into the atmosphere — carries an entropy generation of this order, and **combustion's irreversibility is half mixing and half reaction**.
:::

::: definition Psychrometrics: air and water vapour {#def-psych}
**The humidity ratio.**
$$
\omega = \frac{m_v}{m_a} = 0.622\, \frac{p_v}{P - p_v}, \qquad 0.622 = \frac{R_a}{R_v} = \frac{0.2870}{0.4615}
$$
**The relative humidity and the dew point.**
$$
\phi = \frac{p_v}{p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)}, \qquad
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( p_v \right)
$$
**The specific enthalpy per kilogram of dry air.**
$$
h = 1.005\, T_{\mathrm{db}} + \omega \left( 2{,}501 + 1.86\, T_{\mathrm{db}} \right) \quad \left[ \mathrm{kJ / kg\ da} \right]
$$
**The number that makes the wet-bulb thermometer work.** The thermodynamic wet-bulb (adiabatic saturation) temperature satisfies
$$
\omega_{\mathrm{sat}} \left( T_{\mathrm{wb}} \right) - \omega
= \frac{ \left( 1.005 + 1.86\, \omega \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right) }{ 2{,}501 + 1.86\, T_{\mathrm{wb}} - 4.19\, T_{\mathrm{wb}} }
$$
which is solved by iteration or read from the chart, and for **moist air at ordinary temperatures the wet-bulb depression is about $0.25$ to $0.30$ times the dry-bulb depression below saturation** — a rule accurate to $0.5\ \mathrm{K}$ between $- 10$ and $40\ {}^{\circ}\mathrm{C}$.
**The worked state: $30\ {}^{\circ}\mathrm{C}$ dry bulb, $50\ \%$ relative humidity, $101.325\ \mathrm{kPa}$.**
$$
p_{\mathrm{sat}} \left( 30 \right) = 4.247\ \mathrm{kPa}, \qquad p_v = 0.50 \times 4.247 = 2.124\ \mathrm{kPa}
$$
$$
\omega = 0.622 \times \frac{2.124}{101.325 - 2.124} = 0.01336\ \mathrm{kg / kg\ da}
$$
$$
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( 2.124 \right) = 18.3\ {}^{\circ}\mathrm{C}, \qquad
h = 1.005 \times 30 + 0.01336 \left( 2{,}501 + 55.8 \right) = 30.15 + 34.14 = 64.3\ \mathrm{kJ / kg\ da}
$$
**The wet-bulb temperature is $22.0\ {}^{\circ}\mathrm{C}$**, and the three temperatures — $30.0$, $22.0$, $18.3$ — are the three numbers that describe the state, and **only two of them are independent**.
**The number that sizes a cooling coil.** Cooling $1\ \mathrm{kg / s}$ of this air to $12\ {}^{\circ}\mathrm{C}$ at $101.325\ \mathrm{kPa}$, where $\omega_{\mathrm{sat}} \left( 12 \right) = 0.00873$:
$$
\dot{Q} = 1 \times \left[ \left( 64.3 - h_2 \right) \right], \qquad
h_2 = 1.005 \times 12 + 0.00873 \left( 2{,}501 + 22.3 \right) = 12.06 + 22.01 = 34.1
$$
$$
\dot{Q} = 30.2\ \mathrm{kW}, \qquad
\dot{m}_{\mathrm{cond}} = 1 \times \left( 0.01336 - 0.00873 \right) = 4.63\ \mathrm{g / s} = 16.7\ \mathrm{kg / h}
$$
**The sensible/latent split.** The sensible part is $1.005 \times \left( 1 + 1.86 \times 0.01336 \right) \times 18 = 18.6\ \mathrm{kW}$ and the latent is $11.6\ \mathrm{kW}$ — **$38\ \%$ latent**, which is the number that makes a cooling coil's **surface temperature** and not its area the design constraint, and the reason a data centre cooled to $24\ {}^{\circ}\mathrm{C}$ dry bulb needs a smaller coil than one cooled to $24\ {}^{\circ}\mathrm{C}$ **and** dehumidified.
:::

::: definition Air-conditioning processes and evaporative cooling {#def-ac}
$$
\begin{array}{l l l}
\text{Process} & \text{Constant} & \text{On the chart} \\
\text{Sensible heating} & \omega & \text{horizontal right} \\
\text{Sensible cooling, above dew point} & \omega & \text{horizontal left} \\
\text{Cooling and dehumidifying} & - & \text{down and left, to the saturation curve, then along it} \\
\text{Humidifying with water} & h\ \text{(adiabatic)} & \text{along a constant-wet-bulb line} \\
\text{Humidifying with steam} & T_{\mathrm{db}}\ \text{(nearly)} & \text{vertical up} \\
\text{Mixing two streams} & - & \text{on the line joining them, in inverse proportion to the dry-air flows}
\end{array}
$$
**The mixing rule, which is the most-used line on the chart.**
$$
\frac{\dot{m}_{a,1}}{\dot{m}_{a,2}} = \frac{\text{distance from 2 to 3}}{\text{distance from 1 to 3}}
\quad \Longleftrightarrow \quad
\dot{m}_{a,3} \omega_3 = \dot{m}_{a,1} \omega_1 + \dot{m}_{a,2} \omega_2, \quad
\dot{m}_{a,3} h_3 = \dot{m}_{a,1} h_1 + \dot{m}_{a,2} h_2
$$
**The number that makes evaporative cooling a design decision and not a trick.** Direct evaporative cooling follows a **constant-wet-bulb** line, so air at $35\ {}^{\circ}\mathrm{C}$ and $20\ \%$ humidity ($\omega = 0.00775$, $T_{\mathrm{wb}} = 20.3\ {}^{\circ}\mathrm{C}$) can be cooled to
$$
T_{\mathrm{out}} = 20.3 + \left( 1 - \eta_{\mathrm{evap}} \right) \left( 35 - 20.3 \right)
$$
At an evaporative efficiency of $85\ \%$ this is $22.5\ {}^{\circ}\mathrm{C}$ — **a $12.5\ \mathrm{K}$ drop for the power of a fan**, which is $1 / 25$ of the compressor power a vapour-cycle plant would need. **The catch is the water**: $1\ \mathrm{kg / s}$ of air evaporating $0.0055\ \mathrm{kg / s}$ of water uses **$20\ \mathrm{m^{3}}$ of water per day per $\mathrm{MW}$** of cooling, which is why evaporative cooling is standard in Arizona and Saudi Arabia and unknown in Singapore.
**The two-stage arrangement that reaches the dew point.** A **direct** stage followed by an **indirect** stage (a heat exchanger between the incoming air and the cooled, saturated air) brings the supply below the incoming air's dew point without adding water, and reaches a **wet-depression-limited** temperature of
$$
T_{\mathrm{supply}} = T_{\mathrm{wb}} + \left( 1 - \eta_{\mathrm{IE}} \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right)
$$
At $\eta_{\mathrm{IE}} = 0.75$ and a $14.7\ \mathrm{K}$ wet-bulb depression this is $23.9\ {}^{\circ}\mathrm{C}$ at $\omega = 0.00775$ — **dry** cool air, which is the whole of the reason a two-stage evaporative cooler is worth twice the first stage's cost in a dry climate.
**The number that indicts a cooling tower.** A cooling tower is an evaporative cooler whose **purpose is the water and not the air**: rejecting $1\ \mathrm{MW}$ of heat at a $7\ \mathrm{K}$ range and a $4\ \mathrm{K}$ approach evaporates
$$
\dot{m}_{\mathrm{evap}} = \frac{1{,}000}{2{,}400} = 0.417\ \mathrm{kg / s} = 36\ \mathrm{m^{3} / day\ per\ MW}
$$
plus $2$ to $5\ \%$ for drift and blowdown. **A $1{,}000\ \mathrm{MW}$ power station consumes $2{,}500\ \mathrm{m^{3}}$ of water per hour** — more than a town of $50{,}000$ people — and the reason dry cooling is being installed in the American southwest, Spain and China is **water**, not carbon.
:::

::: widget plot
f: 0.622*(0.5*0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.5*0.61094*exp(17.27*x/(237.3+x))); 0.622*(0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.61094*exp(17.27*x/(237.3+x)))
x: -10, 45
y: 0, 0.07
labels: humidity ratio at 50 per cent RH; humidity ratio at saturation
caption: The humidity ratio of moist air at $101.325\ \mathrm{kPa}$ against dry-bulb temperature, at $50\ \%$ relative humidity and at saturation, from the Magnus-form saturation-pressure correlation $p_{\mathrm{sat}} = 0.61094 \exp \left[ 17.27\, T / \left( 237.3 + T \right) \right]$ kilopascals with $T$ in degrees Celsius. The two curves **diverge exponentially**, and the divergence is the whole of the reason a cooling coil's latent load rises so steeply with the outside air's humidity: between $20$ and $35\ {}^{\circ}\mathrm{C}$ the saturation humidity ratio rises from $0.0148$ to $0.0368$, a factor of **$2.5$**, while the dry-bulb difference rises by only $1.75$ times. **Every air-conditioning energy figure in a hot-humid climate is a statement about this curve.**
:::

## Combustion

::: definition Stoichiometry and the air-fuel ratio {#def-stoich}
**The reaction, on a molar basis, with the air's nitrogen carried through.**
$$
\mathrm{C_x H_y} + a_{\mathrm{th}} \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\longrightarrow x\, \mathrm{CO_2} + \frac{y}{2}\, \mathrm{H_2O} + 3.76\, a_{\mathrm{th}}\, \mathrm{N_2}
$$
$$
a_{\mathrm{th}} = x + \frac{y}{4} \quad \text{for a hydrocarbon}, \qquad
a_{\mathrm{th}} = x + \frac{y}{4} - \frac{z}{2} \quad \text{for } \mathrm{C_x H_y O_z}
$$
**The three ratios.**
$$
\left( A / F \right)_{\mathrm{mass}} = \frac{a_{\mathrm{th}} \times 4.76 \times 28.97}{M_f}, \qquad
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}}, \qquad
\lambda = \frac{1}{\phi}
$$
**The stoichiometric air-fuel ratios, which are the numbers every engine calibration is built on.**
$$
\begin{array}{l c c c c}
\text{Fuel} & M & a_{\mathrm{th}} & \left( A / F \right)_{\mathrm{mass}} & \text{Notes} \\
\text{Hydrogen} & 2.016 & 0.50 & 34.3 & \text{no carbon, no } \mathrm{CO_2} \\
\text{Methane} & 16.04 & 2.00 & 17.19 & 19\ \%\ \text{by volume in air is stoichiometric} \\
\text{Propane} & 44.09 & 5.00 & 15.67 & \\
\text{Octane} & 114.23 & 12.50 & 15.08 & \text{the spark-ignition reference} \\
\text{Diesel, } \mathrm{C_{12}H_{23}} & 167.3 & 17.75 & 14.58 & \\
\text{Ethanol} & 46.07 & 3.00 & 9.00 & \text{needs } 2.7\times\ \text{the volume of gasoline} \\
\text{Methanol} & 32.04 & 1.50 & 6.45 & \text{the reason a flex-fuel injector is oversized} \\
\text{Anthracite, } \mathrm{C} & 12.01 & 1.00 & 11.5 & \text{plus the moisture and ash} \\
\text{Carbon monoxide} & 28.01 & 0.50 & 1.16 & \text{a fuel gas, not a pollutant, when it is the fuel}
\end{array}
$$
**The number that makes hydrogen's $34.3$ misleading.** On a **volumetric** basis hydrogen needs only $2.39\ \mathrm{m^{3}}$ of air per $\mathrm{m^{3}}$ of fuel against methane's $9.52$, so a **port-fuel-injected** hydrogen engine is limited by the **displacement** of the injector and not by the chemistry — and the reason hydrogen direct injection exists.
**The excess-air and equivalence conventions.**
$$
\%\ \text{excess air} = \left( \lambda - 1 \right) \times 100, \qquad
\phi = 1.0\ \text{stoichiometric}, \quad \phi > 1\ \text{rich}, \quad \phi < 1\ \text{lean}
$$
**The number that sets a spark-ignition engine's window.** The three-way catalyst works within $\phi = 0.995$ to $1.005$, a **$1\ \%$** window, and the oxygen sensor's step is the only thing that holds it there. A diesel runs at $\phi = 0.2$ to $0.4$ at part load, an industrial gas turbine at $\phi = 0.3$ to $0.5$ to keep the flame temperature below the $\mathrm{NO_x}$ threshold, and a furnace at $\lambda = 1.15$ to $1.30$ because any less gives incomplete combustion and any more gives stack loss.
:::

::: definition Flue-gas analysis and the excess-air calculation {#def-flue}
**The dry-basis (Orsat) analysis, and the carbon balance that goes with it.** For a hydrocarbon burned with $\lambda$ times stoichiometric air, with **no** dissociation and **complete** combustion:
$$
\mathrm{C_x H_y} + \lambda a_{\mathrm{th}} \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\to x\, \mathrm{CO_2} + \frac{y}{2}\, \mathrm{H_2O} + \left( \lambda - 1 \right) a_{\mathrm{th}}\, \mathrm{O_2} + 3.76 \lambda a_{\mathrm{th}}\, \mathrm{N_2}
$$
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100\, x}{x + \left( \lambda - 1 \right) a_{\mathrm{th}} + 3.76 \lambda a_{\mathrm{th}}}, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{100 \left( \lambda - 1 \right) a_{\mathrm{th}}}{x + \left( \lambda - 1 \right) a_{\mathrm{th}} + 3.76 \lambda a_{\mathrm{th}}}
$$
**The evaluation for methane, $\lambda = 1.20$.**
$$
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.2 \times 2 + 3.76 \times 1.2 \times 2} = \frac{100}{10.816} = 9.25\ \%, \qquad
\%\, \mathrm{O_2} = \frac{0.4}{10.816} = 3.70\ \%
$$
**The maximum $\mathrm{CO_2}$**, at $\lambda = 1$, is $100 / \left( 1 + 7.52 \right) = 11.7\ \%$ — and **that number is the whole of the flue-gas monitor's calibration**: a $\mathrm{CO_2}$ reading of $9.25\ \%$ on a gas-fired boiler means $\lambda = 1.20$, and a reading of $11.0\ \%$ means $\lambda = 1.06$.
**The number that makes the $\mathrm{O_2}$ reading the useful one.** Because the maximum $\mathrm{CO_2}$ differs by fuel ($11.7\ \%$ for methane, $15.4\ \%$ for carbon, $14.7\ \%$ for octane), a $\mathrm{CO_2}$-based excess-air figure must know the fuel; the **$\mathrm{O_2}$** figure does not, to first order, and this is why every modern burner controls on $\mathrm{O_2}$ and computes the $\mathrm{CO_2}$.
**The correction that is always forgotten.** A zirconia or paramagnetic $\mathrm{O_2}$ analyser reads on a **wet** or **dry** basis depending on whether it is heated above the dew point, and the difference for a gas-fired boiler at $\lambda = 1.2$ is
$$
\%\, \mathrm{O_{2,\mathrm{wet}}} = \%\, \mathrm{O_{2,\mathrm{dry}}} \times \frac{10.816}{10.816 + 2} = 3.70 \times 0.844 = 3.12\ \%
$$
**A $0.58$-point error on a $3.7\ \%$ reading is $16\ \%$**, and it is the most common single error in a boiler's combustion-control loop.
**The excess air that a boiler should run at, and what it costs.**
$$
\begin{array}{l c c c c}
\lambda & \%\, \mathrm{O_2} & \text{Stack loss}\ \left( 150\ {}^{\circ}\mathrm{C}\ \text{net} \right) & \text{Unburnt loss} & \text{Total} \\
1.05 & 2.1 & 6.4\ \% & 1.2\ \% & 7.6\ \% \\
1.10 & 3.4 & 6.7\ \% & 0.6\ \% & 7.3\ \% \\
1.15 & 4.6 & 7.0\ \% & 0.3\ \% & 7.3\ \% \\
1.20 & 3.7\ \text{(wet } 3.1\text{)} & 7.3\ \% & 0.2\ \% & 7.5\ \% \\
1.30 & 6.0 & 8.0\ \% & 0.15\ \% & 8.2\ \% \\
1.50 & 8.6 & 9.6\ \% & 0.1\ \% & 9.7\ \%
\end{array}
$$
**The optimum is $\lambda = 1.12$ to $1.18$**, and the curve is **flat** between $1.10$ and $1.25$ — which is why a burner tuned from $1.30$ to $1.15$ saves **$0.9\ \%$** of the fuel and a burner tuned from $1.15$ to $1.05$ **loses** $0.3\ \%$ and gains a corroding chimney.
:::

::: definition Enthalpy of formation, heating values and the adiabatic flame temperature {#def-heat}
**The steady-flow combustion balance, on a per-kmol-of-fuel basis.**
$$
Q = \sum_{\mathrm{prod}} N_i \left( \bar{h}_f^{\circ} + \bar{\Delta h} \right)_i
- \sum_{\mathrm{react}} N_i \left( \bar{h}_f^{\circ} + \bar{\Delta h} \right)_i
$$
**The enthalpies of formation at $25\ {}^{\circ}\mathrm{C}$, $1\ \mathrm{atm}$, in kilojoules per kilomole.**
$$
\begin{array}{l c l c}
\mathrm{CO_2} & - 393{,}520 & \mathrm{H_2O\ (l)} & - 285{,}830 \\
\mathrm{CO} & - 110{,}530 & \mathrm{H_2O\ (g)} & - 241{,}820 \\
\mathrm{CH_4} & - 74{,}850 & \mathrm{NO} & + 90{,}290 \\
\mathrm{C_8 H_{18}\ (l)} & - 249{,}950 & \mathrm{SO_2} & - 296{,}830 \\
\mathrm{CO_2}\ \text{etc.},\ \mathrm{O_2},\ \mathrm{N_2},\ \mathrm{H_2} & 0 & \mathrm{OH} & + 38{,}990
\end{array}
$$
**The heating values, and the $10.9\ \%$ that separates them.** For methane, $M = 16.04$:
$$
\mathrm{HHV} = \frac{285{,}830 \times 2 + 393{,}520 - 74{,}850}{16.04} = 55{,}530\ \mathrm{kJ / kg}
$$
$$
\mathrm{LHV} = \mathrm{HHV} - \frac{y}{2} \times \frac{44{,}010}{M}
= 55{,}530 - \frac{2 \times 44{,}010}{16.04} = 55{,}530 - 5{,}490 = 50{,}040\ \mathrm{kJ / kg}
$$
**The ratio $\mathrm{HHV} / \mathrm{LHV}$, which is the number a boiler specification turns on.**
$$
\begin{array}{l c c c}
\text{Methane} & 1.110 & \text{Octane} & 1.075 \\
\text{Hydrogen} & 1.186 & \text{Bituminous coal} & 1.045 \\
\text{Propane} & 1.085 & \text{Wood, dry} & 1.065 \\
\text{Ethanol} & 1.091 & \text{Heavy fuel oil} & 1.062
\end{array}
$$
**The rule.** The ratio rises with the fuel's **hydrogen content**, and hydrogen's $1.186$ is why a hydrogen-fired boiler's "efficiency" on an HHV basis looks $19\ \%$ better than the same boiler on an LHV basis.
**The adiabatic flame temperature, from the balance with $Q = 0$.**
$$
\sum_{\mathrm{react}} N_i \bar{h}_{f,i}^{\circ} = \sum_{\mathrm{prod}} N_i \left( \bar{h}_{f,i}^{\circ} + \bar{\Delta h}_i \right)
$$
**The evaluation for methane, stoichiometric air, $25\ {}^{\circ}\mathrm{C}$ inlet, constant-pressure, no dissociation.**
$$
802{,}310 = 1 \times 393{,}520 + 2 \times \Delta \bar{h}_{\mathrm{H_2O}} + 3{,}760 \times \Delta \bar{h}_{\mathrm{N_2}} + 2 \times 241{,}820 - 2 \times 285{,}830
$$
which reduces to
$$
\sum N_i\, \Delta \bar{h}_i = 802{,}310\ \mathrm{kJ\ per\ kmol\ of\ CH_4}
$$
and solving by trial on the ideal-gas tables gives
$$
T_{\mathrm{ad}} \approx 2{,}400\ \mathrm{K}\ \text{without dissociation}, \qquad
T_{\mathrm{ad}} \approx 2{,}150\ \mathrm{K}\ \text{with equilibrium}
$$
**The $250\ \mathrm{K}$ is dissociation**, and it is not a refinement: at $2{,}150\ \mathrm{K}$ the equilibrium $\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2}$ leaves about **$0.6\ \%$** of the carbon as CO and the $\mathrm{H_2O}$ about **$1.5\ \%$** dissociated, and the enthalpy tied up in those species is exactly the $250\ \mathrm{K}$.
**The number that makes the flame temperature a design constraint and not a curiosity.**
$$
\begin{array}{l c}
\text{Methane in air, stoichiometric} & 2{,}150\ \mathrm{K} \\
\text{Methane in oxygen} & 3{,}030\ \mathrm{K} \\
\text{Methane at } \phi = 1.2\ \text{in air} & 2{,}230\ \mathrm{K} \\
\text{Methane at } \phi = 0.8\ \text{in air} & 2{,}020\ \mathrm{K} \\
\text{Methane in air, inlet preheated to } 600\ \mathrm{K} & 2{,}480\ \mathrm{K} \\
\text{Methane at } 20\ \mathrm{bar}\text{, stoichiometric air} & 2{,}090\ \mathrm{K} \\
\text{Hydrogen in air, stoichiometric} & 2{,}380\ \mathrm{K} \\
\text{Diesel in air, } \phi = 0.35 & 1{,}500\ \mathrm{K}
\end{array}
$$
**The reading.** **The peak is at $\phi \approx 1.1$, not at $\phi = 1$**, because a slightly rich mixture still burns fully while the excess nitrogen is smaller; **preheating raises the flame temperature by about $0.55\ \mathrm{K}$ per kelvin of preheat**, which is why a regenerative burner reaches $1{,}100\ {}^{\circ}\mathrm{C}$ preheat and a $2{,}500\ \mathrm{K}$ flame; and **pressure lowers it**, which is why a high-compression engine's peak-cycle temperature is lower than the air-standard analysis predicts.
:::

::: definition Equilibrium, dissociation and the pollutants {#def-eq}
**The equilibrium constant.** For a reaction $\sum \nu_i \mathrm{A}_i = 0$ at temperature $T$,
$$
\ln K_p = - \frac{\Delta G^{\circ} \left( T \right)}{R_u T}
= - \sum_i \nu_i \frac{\bar{g}_f^{\circ} \left( T \right)}{R_u T}, \qquad
K_p = \prod_i \left( \frac{p_i}{P_{\mathrm{ref}}} \right)^{\nu_i}
$$
**The number that decides whether a species survives.**
$$
\begin{array}{l c c}
\text{Reaction} & \ln K_p\ \text{at}\ 2{,}000\ \mathrm{K} & \text{Meaning} \\
\mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{CO_2} & + 14.0 & \text{essentially complete} \\
\mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{H_2O} & + 13.7 & \text{essentially complete} \\
\tfrac{1}{2} \mathrm{N_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{NO} & - 4.3 & 1.2\ \%\ \text{of the available NO at equilibrium} \\
\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} & - 14.0 & 0.6\ \%\ \text{dissociated} \\
\mathrm{H_2O} \rightleftharpoons \mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} & - 13.7 & 1.5\ \%\ \text{dissociated}
\end{array}
$$
**The number that makes $\mathrm{NO_x}$ a kinetics problem and not an equilibrium one.** The equilibrium $\mathrm{NO}$ fraction at $2{,}150\ \mathrm{K}$ is about **$1.5$ mole per million**, and a gas-turbine combustor leaves with **$15$ to $30$ ppm** — the same order — while a diesel leaves with **$500\ \mathrm{ppm}$** at a flame temperature of $1{,}500\ \mathrm{K}$, where the equilibrium figure is **below $0.01\ \mathrm{ppm}$**. **The Zeldovich mechanism is rate-limited, not equilibrium-limited**, and the reason is that the $\mathrm{N \equiv N}$ bond's $945\ \mathrm{kJ / mol}$ makes the **rate**, not the equilibrium, the constraint:
$$
\frac{d \left[ \mathrm{NO} \right]}{d t} = 2 \times 10^{16} \frac{1}{T^{\circ}\!} \exp \left( - \frac{69{,}300}{R_u T} \right) \left[ \mathrm{O} \right] \left[ \mathrm{N_2} \right] \ \mathrm{ppm / s}
$$
**The exponential's bite.** A $100\ \mathrm{K}$ reduction in flame temperature from $2{,}150$ to $2{,}050\ \mathrm{K}$ cuts the thermal-$\mathrm{NO_x}$ formation rate by a factor of
$$
\exp \left[ \frac{69{,}300}{8.314} \left( \frac{1}{2{,}050} - \frac{1}{2{,}150} \right) \right]
= \exp \left[ 8{,}335 \times 2.279 \times 10^{- 5} \right] = 1.21
$$
— **only $21\ \%$**, which is why **lean premixed combustion** attacks the **residence time and the peak temperature** and not the average, and why a $10\ \mathrm{K}$ reduction in the **peak** is worth more than $100\ \mathrm{K}$ in the mean.
**The flue-gas dew points, which are the numbers that decide a boiler's materials.**
$$
\begin{array}{l c c}
\text{Fuel and excess air} & \text{Water partial pressure} & \text{Dew point} \\
\text{Methane, } \lambda = 1.0 & 9.2\ \mathrm{kPa} & 44.2\ {}^{\circ}\mathrm{C} \\
\text{Methane, } \lambda = 1.2 & 7.4\ \mathrm{kPa} & 39.9\ {}^{\circ}\mathrm{C} \\
\text{Methane, } \lambda = 2.0 & 5.1\ \mathrm{kPa} & 33.4\ {}^{\circ}\mathrm{C} \\
\text{Natural gas, } \lambda = 1.15 & 7.9\ \mathrm{kPa} & 41.4\ {}^{\circ}\mathrm{C} \\
\text{Heavy fuel oil, } \lambda = 1.15 & 9.6\ \mathrm{kPa} & 45.0\ {}^{\circ}\mathrm{C} \\
\text{Coal, } \lambda = 1.2 & 11.4\ \mathrm{kPa} & 48.4\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The acid dew point, which is a different and much higher number.** With $1\ \%$ sulfur in the fuel the $\mathrm{SO_3}$ formed gives a sulphuric-acid mist whose dew point is
$$
T_{\mathrm{acid}} \approx 120\text{–}155\ {}^{\circ}\mathrm{C}\ \text{for coal and heavy oil}
$$
**and it is the reason a coal boiler's air preheater metal is never run below $150\ {}^{\circ}\mathrm{C}$** and the reason a heavy-oil marine engine's cylinder-lube base number is $70$ and not $40$.
**The number that makes condensing boilers a $25\ \%$ of the market and not $100\ \%$.** A condensing boiler recovers the latent heat **and** cools the flue to $45\ {}^{\circ}\mathrm{C}$, but it can only do so if the **return water is below $55\ {}^{\circ}\mathrm{C}$** — and a radiator-designed existing building returns at $70\ {}^{\circ}\mathrm{C}$, so the boiler condenses for **$20\ \%$** of the heating season and its $106\ \%$ becomes $96\ \%$. **The retrofit that matters is the radiator area, not the boiler.**
:::

::: widget plot
f: 2230-900*pow(x-1.1,2)+100*(x-1.1); 1980-900*pow(x-1.1,2)+100*(x-1.1)
x: 0.8, 2.0
y: 1400, 2500
labels: adiabatic flame temperature K, no dissociation; with equilibrium dissociation
caption: The constant-pressure adiabatic flame temperature of methane burned in air, in kilokelvin-scale units reduced to a peak near $\phi = 1.1$, against the equivalence ratio $\phi$. The curve is **asymmetric**: it falls steeply on the lean side, where the excess nitrogen absorbs the heat, and less steeply on the rich side, where the unburnt fuel carries the heat away instead. **The peak is at $\phi \approx 1.1$ and not at $\phi = 1$**, and the $80\ \mathrm{K}$ difference between the two is the reason a lean-premixed gas-turbine combustor runs at $\phi \approx 0.6$ — accepting a **$600\ \mathrm{K}$** lower flame temperature to buy a **tenfold** reduction in thermal $\mathrm{NO_x}$.
:::

## Worked cases

::: example An air-conditioning load {#ex-ac}
An office needs $120\ \mathrm{kW}$ of sensible cooling and $40\ \mathrm{kW}$ of latent cooling. Outside air is $35\ {}^{\circ}\mathrm{C}$, $60\ \%$ relative humidity; the room is held at $24\ {}^{\circ}\mathrm{C}$, $50\ \%$; the supply air leaves the coil at $13\ {}^{\circ}\mathrm{C}$; and $25\ \%$ of the supply air is fresh outside air, the rest recirculated. Find the airflow, the coil duty and the chiller plant's electrical demand.
::: solution
**The states.**
$$
\begin{array}{l c c c c}
& T_{\mathrm{db}} & \phi & \omega & h \\
\text{O (outside)} & 35 & 0.60 & 0.02135 & 91.1 \\
\text{R (room)} & 24 & 0.50 & 0.00930 & 47.5 \\
\text{C (coil leaving, sat.)} & 13 & 1.00 & 0.00940^{*} & 36.4 \\
\text{M (mixed)} & 26.75 & - & 0.01231 & 58.4
\end{array}
$$
**The supply airflow, from the sensible load.**
$$
\dot{m}_a = \frac{\dot{Q}_s}{c_{p,m} \left( T_R - T_C \right)}
= \frac{120}{1.005 \times \left( 1 + 1.86 \times 0.0093 \right) \times \left( 24 - 13 \right)}
= \frac{120}{11.23} = 10.69\ \mathrm{kg\ da / s}
$$
**The check against the latent load.**
$$
\dot{Q}_l = 10.69 \times \left( 0.00930 - 0.00940 \right) \times 2{,}501 = - 2.7\ \mathrm{kW}
$$
**The coil leaving humidity ratio of $0.00940$ is above the room's**, so the coil cannot deliver the latent load — and the correct coil leaving condition is found from the latent requirement:
$$
\omega_C = \omega_R - \frac{\dot{Q}_l}{\dot{m}_a \times 2{,}501}
= 0.00930 - \frac{40}{10.69 \times 2{,}501} = 0.00930 - 0.00149 = 0.00781
$$
**The coil leaving temperature** is the saturation temperature at $\omega = 0.00781$, which is $T_{\mathrm{sat}} \left( 1.257\ \mathrm{kPa} \right) = 10.2\ {}^{\circ}\mathrm{C}$.
**The reconciliation.** A $13\ {}^{\circ}\mathrm{C}$ coil leaves saturated at $\omega = 0.00940$, which is **above** the room's $0.00930$, so no airflow whatever absorbs a latent load of $40\ \mathrm{kW}$ at that coil temperature; the **supply temperature must be $10.2\ {}^{\circ}\mathrm{C}$**.
**The design decision this forces.** Either the coil leaves at $10.2\ {}^{\circ}\mathrm{C}$, which needs a **$5\ {}^{\circ}\mathrm{C}$** chilled-water supply and costs **$25\ \%$** more chiller energy, or the airflow rises by **$35\ \%$**, which costs **$50\ \%$** more fan power and a bigger duct. **The sensible heat ratio of $0.75$ is the constraint, and it is set by the building and not by the plant.**
**The coil duty, at the corrected state.**
$$
\dot{Q}_{\mathrm{coil}} = 10.69 \times \left( h_M - h_C \right)
= 10.69 \times \left( 58.4 - 29.6 \right) = 307.7\ \mathrm{kW}
$$
**The water condensed.**
$$
\dot{m}_w = 10.69 \times \left( 0.01231 - 0.00781 \right) = 0.0481\ \mathrm{kg / s} = 173\ \mathrm{kg / h}
$$
**The chiller's electrical demand.** At a water-cooled chiller's $\mathrm{COP}$ of $5.4$, with the pumps and fans added separately:
$$
\dot{W}_{\mathrm{chiller}} = \frac{307.7}{5.4} = 57.0\ \mathrm{kW}
$$
**The pumps.** The chilled-water flow at a $6\ \mathrm{K}$ rise is $307.7 / \left( 4.19 \times 6 \right) = 12.25\ \mathrm{kg / s} = 0.0123\ \mathrm{m^{3} / s}$, and at the industry's $0.05\ \mathrm{kW}$ per litre per second for a primary-loop with a control valve:
$$
\dot{W}_{\mathrm{pumps}} = 12.25 \times 0.05 = 0.61\ \mathrm{kW}
$$
**The fans.** The supply volume is $10.69 / 1.18 = 9.06\ \mathrm{m^{3} / s}$, and at a $550\ \mathrm{Pa}$ total pressure across the coil, filter, ductwork and the outside-air inlet, with a $0.65$ fan and motor efficiency:
$$
\dot{W}_{\mathrm{fans}} = \frac{9.06 \times 550}{0.65 \times 1000} = 7.7\ \mathrm{kW}
$$
$$
\dot{W}_{\mathrm{total}} = 57.0 + 0.6 + 7.7 = 65.3\ \mathrm{kW}, \qquad
\mathrm{COP}_{\mathrm{plant}} = \frac{120 + 40}{65.3} = 2.45
$$
**The reading.** **The plant delivers $160\ \mathrm{kW}$ of cooling for $65.3\ \mathrm{kW}$ of electricity — a plant COP of $2.45$ against the chiller's $5.4$** — and the $2.2$-fold difference is the pumps, the fans and the coil's approach. **The number that appears on the chiller's nameplate is $5.4$ and the number the building pays is $2.45$**, and the gap is the whole of an HVAC engineer's professional value.
*Sanity.* The reason the outside air's load is so large is that $2.67\ \mathrm{kg / s}$ of outside air at $h = 91.1$ against the room's $47.5$ carries
$$
2.67 \times \left( 91.1 - 47.5 \right) = 116.4\ \mathrm{kW}
$$
**$73\ \%$ of the total cooling for $25\ \%$ of the air** — which is why every serious office HVAC specification includes **energy recovery** on the outside air, and why a $75\ \%$-effective enthalpy wheel is worth **$87\ \mathrm{kW}$** of coil duty and about **$16\ \mathrm{kW}$** of fan power.
:::
:::

::: example A gas boiler's efficiency {#ex-boiler}
A boiler burns natural gas (methane) with $15\ \%$ excess air. The flue gas leaves at $160\ {}^{\circ}\mathrm{C}$ and the combustion air enters at $20\ {}^{\circ}\mathrm{C}$. Compute the stack loss and the efficiency on both heating-value bases, and the efficiency if the flue gas is condensed to $40\ {}^{\circ}\mathrm{C}$.
::: solution
**The reaction.**
$$
\mathrm{CH_4} + 1.15 \times 2 \left( \mathrm{O_2} + 3.76\, \mathrm{N_2} \right)
\to \mathrm{CO_2} + 2\, \mathrm{H_2O} + 0.3\, \mathrm{O_2} + 8.648\, \mathrm{N_2}
$$
**The flue gas.** $12.148\ \mathrm{kmol}$ wet per kmol of fuel, $10.148\ \mathrm{kmol}$ dry.
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100}{10.148} = 9.85\ \%, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{0.3}{10.148} = 2.96\ \%
$$
**The stack loss, on an LHV basis.** With the mean specific heats over $20$ to $160\ {}^{\circ}\mathrm{C}$:
$$
\begin{array}{l c c c}
\mathrm{CO_2} & 1\ \mathrm{kmol} & 41.6\ \mathrm{kJ / kmol \cdot K} & 5{,}824\ \mathrm{kJ} \\
\mathrm{H_2O} & 2\ \mathrm{kmol} & 34.4 & 9{,}632 \\
\mathrm{O_2} & 0.3\ \mathrm{kmol} & 29.6 & 1{,}243 \\
\mathrm{N_2} & 8.648\ \mathrm{kmol} & 29.3 & 3{,}599 \\
\hline
& & & 20{,}298\ \mathrm{kJ\ per\ kmol\ fuel}
\end{array}
$$
$$
\eta_{\mathrm{stack}} = \frac{20{,}298}{802{,}310} = 2.53\ \%
$$
**The efficiency, gross.**
$$
\eta_{\mathrm{LHV}} = 100 - 2.53 - 0.4\ \left( \text{unburnt and radiation} \right) = 97.1\ \%
$$
**against an HHV-basis figure of**
$$
\eta_{\mathrm{HHV}} = 97.1 \times \frac{50{,}040}{55{,}530} = 87.5\ \%
$$
**The $9.6$-point difference is the water's latent heat**, and both figures describe the same boiler.
**The condensed case.** Cooling the flue gas to $40\ {}^{\circ}\mathrm{C}$ and condensing $1.6\ \mathrm{kmol}$ of the $2\ \mathrm{kmol}$ of water (the rest leaves as vapour at the $40\ {}^{\circ}\mathrm{C}$ dew point):
$$
\text{sensible: } 20{,}298 \times \frac{160 - 40}{140} = 17{,}398 \to \text{recompute at } 20 \to 40\ {}^{\circ}\mathrm{C}: 2{,}900\ \mathrm{kJ}
$$
$$
\text{latent: } 1.6 \times 44{,}010 = 70{,}416\ \mathrm{kJ}
$$
$$
\text{total recovered} = 2{,}900 + 70{,}416 = 73{,}316\ \mathrm{kJ}
$$
**The remaining loss**, taken as the dry gas, the residual vapour and the radiation, all at a $40\ {}^{\circ}\mathrm{C}$ flue:
$$
\text{dry gas: } 10.148 \times 29.4 \times 20 = 5{,}967\ \mathrm{kJ}, \qquad
\text{vapour: } 0.4 \times \left( 44{,}010 + 34 \times 20 \right) = 18{,}284\ \mathrm{kJ}
$$
$$
\text{radiation and unburnt: } 0.004 \times 802{,}310 = 3{,}209\ \mathrm{kJ}, \qquad
\text{total loss} = 27{,}460\ \mathrm{kJ}
$$
**The efficiency must be quoted against a fixed denominator**, and on the **HHV** basis, where the water's latent heat sits inside the fuel figure:
$$
\eta_{\mathrm{HHV}} = 1 - \frac{27{,}460}{802{,}310 \times 55{,}530 / 50{,}040} = 1 - \frac{27{,}460}{890{,}300} = 96.9\ \%
$$
**The condensing boiler is $96.9\ \%$ on HHV and $107.5\ \%$ on LHV**, and the $107.5\ \%$ is legitimate because the LHV does not count the $70.4\ \mathrm{MJ}$ of latent heat the boiler has recovered.
**The number that decides the retrofit.** The extra recovery is $70.4\ \mathrm{MJ}$ per kmol of fuel, or **$4{,}390\ \mathrm{kJ / kg}$** of gas — worth **$8.8\ \%$** of the fuel's LHV. At $8{,}000$ hours a year on a $10\ \mathrm{MW}$ boiler that is **$700{,}000$ currency units**, against a condensing heat exchanger costing **$250{,}000$**. **The payback is five months and the constraint is the return temperature**, which must be below $55\ {}^{\circ}\mathrm{C}$ for the heat exchanger to see $45\ {}^{\circ}\mathrm{C}$ flue gas.
*Sanity.* The reason the non-condensing efficiency is $97.1\ \%$ on LHV and $87.5\ \%$ on HHV is the $11\ \%$ latent heat, and the reason the condensing boiler's LHV figure exceeds $100\ \%$ is that the LHV is a **smaller denominator** and not a smaller quantity of energy. **Every efficiency figure in this example is correct and three of the four would be reported wrongly by a manufacturer choosing the flattering basis** — which is why the European ErP directive mandates the **GCV/HHV** basis and the American ASHRAE convention uses the **NCV/LHV**.
:::
:::

::: example A gas turbine's combustor {#ex-gtcomb}
A gas turbine combustor receives air at $728\ \mathrm{K}$ and $1.35\ \mathrm{MPa}$ and delivers combustion gas at $1{,}690\ \mathrm{K}$ using methane. Find the fuel flow per kilogram of air, the equivalence ratio, the exit $\mathrm{NO_x}$ tendency and the combustor's exergy destruction.
::: solution
**The energy balance per kilogram of air.**
$$
\dot{m}_f \times \mathrm{LHV} = \left( 1 + \dot{m}_f \right) c_{p,g} \left( T_3 - T_2 \right)
$$
With $c_{p,g} = 1.10\ \mathrm{kJ / kg \cdot K}$ and $\mathrm{LHV} = 50{,}040\ \mathrm{kJ / kg}$:
$$
\dot{m}_f \times 50{,}040 = \left( 1 + \dot{m}_f \right) \times 1.10 \times 962
\quad \Rightarrow \quad
\dot{m}_f = \frac{1{,}058}{48{,}982} = 0.0216\ \mathrm{kg\ fuel / kg\ air}
$$
**The equivalence ratio.** The stoichiometric air-fuel ratio for methane is $17.19$, so
$$
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}} = \frac{0.0216}{1 / 17.19} = 0.0216 \times 17.19 = 0.371
$$
**The combustor runs at $\phi = 0.37$, which is $169\ \%$ excess air** — and the reason is that the turbine blades cannot tolerate more than $1{,}690\ \mathrm{K}$, so the combustor is deliberately run far too lean and the flame is held in a **rich primary zone** with **dilution holes** downstream.
**The number that makes the dilution holes a design problem.** The primary zone at $\phi \approx 1.1$ reaches $2{,}300\ \mathrm{K}$ and forms $\mathrm{NO}$ at the Zeldovich rate; the dilution air, which is **$60\ \%$** of the total, must mix with the primary gases within **$30\ \mathrm{ms}$** to quench the $\mathrm{NO}$ formation before the gases reach the nozzle. **A poor dilution hole pattern costs a factor of three in $\mathrm{NO_x}$ and costs nothing in efficiency** — which is why combustor development is an optical and acoustic exercise and not a thermodynamic one.
**The exit composition.** At $\phi = 0.37$ and $1{,}690\ \mathrm{K}$:
$$
\%\, \mathrm{CO_2} = 3.1, \quad \%\, \mathrm{O_2} = 11.9, \quad \%\, \mathrm{H_2O} = 3.6, \quad \%\, \mathrm{N_2} = 81.4
$$
**The equilibrium $\mathrm{NO}$** at $1{,}690\ \mathrm{K}$ is $0.05\ \mathrm{ppm}$ and a real can combustor leaves with **$9\ \mathrm{ppm}$** corrected to $15\ \%\ \mathrm{O_2}$, and a lean-premixed one with **$3\ \mathrm{ppm}$** — the difference being the **primary-zone peak temperature** and not the average.
**The exergy destruction.** The combustor's irreversibility is dominated by the reaction and the mixing:
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{prod}} N \bar{s} - \sum_{\mathrm{react}} N \bar{s} - \frac{\dot{Q}}{T_b} \quad \left( \dot{Q} = 0,\ \text{adiabatic} \right)
$$
For methane burning with stoichiometric air at $298\ \mathrm{K}$ the standard entropy generation is $388\ \mathrm{kJ / kmol \cdot K}$, and at $728\ \mathrm{K}$ inlet and $\phi = 0.37$ it is about **$520\ \mathrm{kJ / kmol \cdot K}$**:
$$
\dot{X}_{\mathrm{dest}} = 298.15 \times 520 = 155{,}000\ \mathrm{kJ\ per\ kmol\ fuel}
$$
against a fuel exergy of $831{,}650\ \mathrm{kJ / kmol}$ — **$18.6\ \%$ of the fuel's exergy destroyed in the combustor alone**, before any turbine has seen it.
**The reading.** **The combustor is the largest single exergy destroyer in a gas turbine**, and the way to reduce it is not a better liner but a **lower combustion temperature with a higher pressure-ratio compressor** — which is exactly the direction the $\mathrm{H}$- and $\mathrm{J}$-class machines have taken, and the reason their second-law efficiency rose from $65\ \%$ to $71\ \%$ while their first-law efficiency rose from $58\ \%$ to $63\ \%$.
*Sanity.* The reason the combustor destroys $18.6\ \%$ of the fuel's exergy is that it converts a **room-temperature, low-entropy** reactant stream into a **$1{,}690\ \mathrm{K}$** product stream by an **unrestrained chemical reaction**, and any unrestrained reaction is as irreversible as a free expansion. **The fuel cell is the alternative**, and it is at $55\ \%$ electrical and $15\ \%$ destroyed-in-the-stack rather than $18.6\ \%$ destroyed before the machine starts.
:::
:::

::: example Flue-gas dew point and a condensing retrofit {#ex-dewpoint}
A $5\ \mathrm{MW}$ gas boiler currently exhausting at $180\ {}^{\circ}\mathrm{C}$ is to be retrofitted with a condensing economiser. The network return is $58\ {}^{\circ}\mathrm{C}$. Evaluate the recovery, the materials and the risk.
::: solution
**The flue gas.** Methane at $\lambda = 1.15$: $11.65\ \mathrm{kmol}$ wet per kmol of fuel, with $2\ \mathrm{kmol}$ of water.
$$
p_{\mathrm{H_2O}} = \frac{2}{11.65} \times 101.325 = 17.39\ \mathrm{kPa} \quad \Rightarrow \quad
T_{\mathrm{dp}} = 56.8\ {}^{\circ}\mathrm{C}
$$
**The reading.** **The return water at $58\ {}^{\circ}\mathrm{C}$ is above the dew point of $56.8\ {}^{\circ}\mathrm{C}$** — the economiser will barely condense at all, and the recovery will be sensible only.
**The recovery at $58\ {}^{\circ}\mathrm{C}$ return.** Cooling the flue gas to $65\ {}^{\circ}\mathrm{C}$:
$$
\dot{Q} = \frac{5{,}000}{0.971} \times \frac{180 - 65}{1{,}400} \times 0.90 = 401\ \mathrm{kW}
$$
**The recovery if the return is lowered to $40\ {}^{\circ}\mathrm{C}$.** Cooling the flue gas to $45\ {}^{\circ}\mathrm{C}$ and condensing $1.45\ \mathrm{kmol}$ of the $2\ \mathrm{kmol}$ of water:
$$
\dot{Q} = 401 + 5{,}150 \times \frac{1.45}{2} \times \frac{44{,}010 / 16.04}{1{,}400} \approx 401 + 715 = 1{,}116\ \mathrm{kW}
$$
**The $715\ \mathrm{kW}$ of extra recovery is worth $250{,}000$ currency units a year** and requires the return temperature to fall by **$18\ \mathrm{K}$**, which requires **more emitter area in every building on the network**.
**The materials.** Condensate from a gas flue has a pH of **$3.5$ to $4.5$** (carbonic acid, plus nitric acid from the $\mathrm{NO_x}$) and is **aggressive to carbon steel and to brick**. The options:
$$
\begin{array}{l l c}
\text{Stainless 316L} & \text{standard, but pitting if the chloride exceeds } 200\ \mathrm{mg / l} & 1.0 \\
\text{Aluminium (cast or welded)} & \text{standard in European boilers, good to pH } 5 & 0.8 \\
\text{PPSU / fluoropolymer} & \text{for the small units, limited to } 110\ {}^{\circ}\mathrm{C} & 1.4 \\
\text{Glass} & \text{the Siemens/Schmöckwitz design, immune and fragile} & 2.2
\end{array}
$$
**The condensate must be neutralised** — a $5\ \mathrm{MW}$ boiler produces **$1.4\ \mathrm{m^{3}}$ per day** of condensate at $\mathrm{pH}\ 4$, and discharging it to a copper drain will destroy it in three years. **A neutralisation cartridge costs $600$ a year and is omitted from $80\ \%$ of installations.**
**The risk that is never in the brochure.** A condensing economiser **cools the flue gas below the acid dew point of any sulfur in the fuel**. Natural gas has less than $5\ \mathrm{mg / m^{3}}$ of sulfur and is safe; **a boiler converted from gas to biogas, landfill gas or a hydrogen blend with a variable sulfur content can deposit sulphuric acid at $60\ {}^{\circ}\mathrm{C}$** and corrode a stainless heat exchanger in eighteen months. **The specification must state the fuel's sulfur limit and the fuel supplier must be contractually bound to it.**
**The number that decides the project.** The economiser's recovery is worth **$0.9\ \%$** of the boiler's fuel at the current return temperature and **$14\ \%$** at a $40\ {}^{\circ}\mathrm{C}$ return. **The project is a network-temperature project wearing a heat-exchanger purchase order**, and the party who approves it without the emitter survey has bought a $400\ \mathrm{kW}$ heat exchanger instead of a $1{,}100\ \mathrm{kW}$ one.
*Sanity.* Excess air **dilutes** the water and **lowers** the dew point, so $56.8\ {}^{\circ}\mathrm{C}$ at $\lambda = 1.15$ sits between the $44.2\ {}^{\circ}\mathrm{C}$ of the stoichiometric case and the $39.9\ {}^{\circ}\mathrm{C}$ of the $\lambda = 1.2$ row of the definition table — and the reason that row is lower is that it referred the water to the **dry** analysis. **The dew point must be computed from the wet analysis**, and the $17\ \mathrm{K}$ spread between the two conventions is exactly the error the warning at the head of this lesson describes.
:::
:::

::: history
**The first quantitative study of a mixture** is **Dalton**'s of **1801–1803**, written while he was measuring the pressure of water vapour over snow and discovering that the atmosphere always contains some, and his law of partial pressures was published in the same memoir in which he discovered that **the dew point is a property of the air and not of the surface it wets**. **Gay-Lussac**'s combining volumes of **1808** and **Avogadro**'s hypothesis of **1811** supplied the mole, and **Cannizzaro**'s **1858** pamphlet finally persuaded the chemistry that Avogadro had been right for forty-seven years. **The psychrometric chart** is **Carrier**'s of **1911** — the paper that founded the air-conditioning industry and that Carrier, who was an engineer at Buffalo Forge and not an academic, presented to the American Society of Mechanical Engineers as a chart and not a theory; **the wet-bulb depression tables he printed were computed by hand and are correct to $0.1\ {}^{\circ}\mathrm{F}$**. **Lavoisier and Laplace** measured the first enthalpy of combustion in **1780**, and **the convention of the standard enthalpy of formation** was fixed by **G. N. Lewis and Merle Randall** in their **1923** *Thermodynamics*, the book that also introduced the word *activity* and the fugacity. **The adiabatic flame temperature** was computed by **Büringaer** in **1889** and by **Mahle** in **1915**, and **the equilibrium constants that make dissociation computable** came from **Nernst**'s third law of **1906** — the chain that runs from a low-temperature calorimetry experiment in Berlin to the $\mathrm{NO_x}$ in a car exhaust. **The Zeldovich mechanism** for thermal nitric oxide is due to **Yakov Zeldovich and co-workers in 1946–1947**, worked out in the context of **the Soviet nuclear programme's detonation physics** and published in a journal no Western combustion engineer read until it was translated in **1970**; **the fact that the mechanism had been known for twenty-four years before the clean-air regulations needed it** is one of the more awkward facts in the history of applied thermodynamics.
:::

## Where this leads

Mixtures and combustion are the chemistry layer under [[thermodynamics/power-cycles]]'s Brayton and Rankine figures and under [[thermodynamics/exergy]]'s chemical-exergy numbers, the boundary condition for every [[heat-transfer]] furnace problem, the inlet gas for [[propulsion]]'s nozzles and [[aerodynamics]]'s high-temperature test sections, and the source of the flue-gas and humidity data that [[manufacturing]]'s dryers and [[energy-systems]]'s boilers are sized on.

::: summary
- A mixture's properties are mole-fraction averages, its gas constant is $R_u / \sum y_i M_i$, and the entropy of each component carries a $-R_u \ln y_i$ term that no other property does.
- $\omega = 0.622\, p_v / (P - p_v)$, the relative humidity uses $p_{\mathrm{sat}}$ at the dry-bulb, and the dew point is $T_{\mathrm{sat}}$ at the vapour's partial pressure — three different temperatures and only two independent properties.
- A cooling coil's latent load sets its leaving temperature, and a $3:1$ sensible-to-latent ratio at $13\ {}^{\circ}\mathrm{C}$ coil leaving is not achievable.
- Orsat analyses are dry, the maximum $\mathrm{CO_2}$ is $11.7\ \%$ for methane, and a wet/dry oxygen analyser difference is $16\ \%$ of the reading.
- HHV and LHV differ by $11\ \%$ for methane and $19\ \%$ for hydrogen, and every efficiency figure must name its basis.
- The adiabatic flame temperature peaks at $\phi \approx 1.1$, is $250\ \mathrm{K}$ lower than the no-dissociation value, and is a constraint on $\mathrm{NO_x}$ and not on efficiency.
- A gas turbine combustor at $\phi = 0.37$ destroys $18.6\ \%$ of the fuel's exergy before the turbine starts, and it is the largest destroyer in the plant.
- A condensing economiser's value is set by the network's return temperature and not by the heat exchanger.
:::

::: quiz
A gas boiler's dry flue-gas analysis reads a carbon-dioxide fraction very close to the $11.7\ \%$ maximum for methane. What follows?
- [ ] The excess air is large and the stack loss is high
- [x] The excess air is nearly zero, so carbon monoxide and unburnt hydrocarbons are high and the chimney is at risk of acid attack
- [ ] The boiler is at its optimum efficiency
- [ ] The combustion air is preheated
::: solution
The $11.7\ \%$ figure is the **stoichiometric** maximum, so a reading near it means $\lambda \approx 1.0$. Real boilers are run at $\lambda = 1.12$ to $1.18$, where the dry $\mathrm{CO_2}$ is $9.3$ to $10.1\ \%$, because at the stoichiometric ratio the mixing is never perfect and **$1$ to $2\ \%$ of the fuel leaves as carbon monoxide and unburnt hydrocarbon** — a loss larger than the stack saving — while the flue-gas dew point rises to $44\ {}^{\circ}\mathrm{C}$ for a gas-fired unit and the acid dew point rises with it. **The optimum is a compromise between a stack loss that rises with excess air and an unburnt loss that falls with it**, and the two curves cross in a flat minimum between $\lambda = 1.12$ and $1.18$.
:::
:::

## Exercises

::: exercise Mixture {level=1 check="0.287"}
Give the gas constant in kilojoules per kilogram-kelvin of dry air with $M = 28.97$.
::: solution
$R = 8.31446 / 28.97 = 0.287\ \mathrm{kJ / kg \cdot K}$.
:::
:::

::: exercise Humidity {level=1 check="0.01336"}
Give the humidity ratio of air at $30\ {}^{\circ}\mathrm{C}$ and $50\ \%$ relative humidity at $101.325\ \mathrm{kPa}$, with $p_{\mathrm{sat}} = 4.247\ \mathrm{kPa}$.
::: solution
$\omega = 0.622 \times 2.1235 / 99.20 = 0.01336\ \mathrm{kg / kg\ da}$.
:::
:::

::: exercise Air-fuel {level=1 check="17.19"}
Give the stoichiometric mass air-fuel ratio for methane.
::: solution
$2 \times 4.76 \times 28.97 / 16.04 = 17.19$.
:::
:::

::: exercise Heating value {level=1 check="1.110"}
Give the ratio of methane's higher to lower heating value.
::: solution
$55{,}530 / 50{,}040 = 1.110$.
:::
:::

::: exercise Carbon dioxide {level=1 check="11.7"}
Give the maximum dry carbon-dioxide percentage in the flue gas of methane.
::: solution
$100 / (1 + 7.52) = 11.7\ \%$, at the stoichiometric ratio.
:::
:::

::: exercise Mixed air {level=2}
$3\ \mathrm{kg / s}$ of outside air at $\omega = 0.02135$ is mixed with $9\ \mathrm{kg / s}$ of recirculated air at $\omega = 0.00930$. Give the mixture's humidity ratio.
::: solution
$$
\omega_M = \frac{3 \times 0.02135 + 9 \times 0.00930}{12} = \frac{0.06405 + 0.08370}{12} = 0.01231\ \mathrm{kg / kg\ da}
$$
*Sanity.* The mixture lies on the straight line joining the two states on the psychrometric chart, **one quarter of the way from the recirculated air to the outside air**, and that geometric statement is the whole of the mixing rule — which is why the chart is drawn with straight constant-$\omega$ lines and why an engineer can size a mixing box with a ruler.
:::
:::

::: exercise Flue gas {level=2}
A boiler's dry flue-gas analysis reads $10.2\ \%\ \mathrm{CO_2}$ and $2.1\ \%\ \mathrm{O_2}$ on methane. Give the excess-air ratio and say whether the analysis is self-consistent.
::: solution
For methane, $\mathrm{C_x H_y}$ with $x = 1$, $a_{\mathrm{th}} = 2$:
$$
\frac{\%\, \mathrm{CO_2}}{\%\, \mathrm{O_2}} = \frac{x}{\left( \lambda - 1 \right) a_{\mathrm{th}}} = \frac{1}{2 \left( \lambda - 1 \right)} = \frac{10.2}{2.1} = 4.857
$$
$$
\lambda - 1 = \frac{1}{2 \times 4.857} = 0.103 \quad \Rightarrow \quad \lambda = 1.103
$$
**The check.** At $\lambda = 1.103$ the dry analysis should be
$$
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.103 \times 2 + 3.76 \times 1.103 \times 2} = \frac{100}{10.32} = 9.69\ \%
$$
against the $10.2\ \%$ read. **The analysis is not self-consistent** — the $\mathrm{CO_2}$ is too high for the $\mathrm{O_2}$ — and the usual causes are an air leak in the flue (which adds $\mathrm{O_2}$ and dilutes the $\mathrm{CO_2}$, moving the reading the **other** way), a mis-calibrated $\mathrm{CO_2}$ cell, or a fuel that is **not** pure methane.
*Sanity.* A natural gas is $85$ to $97\ \%$ methane with ethane and propane, whose maximum $\mathrm{CO_2}$ is higher ($15.4\ \%$ for carbon), so a real gas gives a $\mathrm{CO_2}$ slightly **above** the pure-methane figure at the same $\mathrm{O_2}$ — which is the direction of this discrepancy and the reason a boiler's combustion controller should be fed the gas's **Wobbe index and composition** and not an assumed methane.
:::
:::

::: exercise Derivation {level=3}
Derive the wet-bulb relation from the adiabatic saturation energy balance, show that the wet-bulb and thermodynamic wet-bulb temperatures coincide for air-water to within $0.5\ \mathrm{K}$, and obtain the Lewis relation.
::: solution
**The adiabatic saturator.** Air with $\omega_1$ and $T_1$ flows over a make-up-water sump at $T_2$; the stream leaves saturated at $\omega_2$ and $T_2$, and make-up water at $T_2$ is added at rate $\dot{m}_w = \dot{m}_a \left( \omega_2 - \omega_1 \right)$. With no heat transfer and no work, per kilogram of dry air:
$$
h_1 + \left( \omega_2 - \omega_1 \right) h_f \left( T_2 \right) = h_2
$$
$$
c_p \left( T_1 - T_2 \right) + \omega_1 c_{p,v} \left( T_1 - T_2 \right) = \left( \omega_2 - \omega_1 \right) \left[ h_g \left( T_2 \right) - h_f \left( T_2 \right) \right]
$$
$$
\boxed{ \omega_2 - \omega_1 = \frac{ \left( c_p + \omega_1 c_{p,v} \right) \left( T_1 - T_2 \right) }{ h_{fg} \left( T_2 \right) } }
$$
**The wet-bulb thermometer.** A thermometer in a ventilated stream reaches $T_w$ where the convective heat gain equals the evaporative loss:
$$
h_c \left( T_1 - T_w \right) = h_D \left( \omega_w - \omega_1 \right) h_{fg} \left( T_w \right)
\quad \Rightarrow \quad
\omega_1 = \omega_w - \frac{h_c}{h_D h_{fg}} \left( T_1 - T_w \right)
$$
**The Lewis relation.** For air-water vapour the ratio of the heat and mass transfer coefficients is
$$
\mathrm{Le} = \frac{h_c}{h_D \rho c_p} = \left( \frac{\mathrm{Sc}}{\mathrm{Pr}} \right)^{2 / 3} = \left( \frac{0.61}{0.71} \right)^{2 / 3} = 0.90^{2 / 3} = 0.934
$$
so $h_c / \left( h_D c_{p,m} \right) \approx 1$ and the wet-bulb line is a line of constant **enthalpy-like** quantity,
$$
\omega_1 = \omega_w - \frac{c_{p,m}}{h_{fg} \left( T_w \right)} \left( T_1 - T_w \right)
$$
**which is identical in form to the adiabatic-saturation result.** The comparison of the two gives the coincidence: **the psychrometric ratio $h_c / \left( h_D c_{p,m} \right)$ differs from unity by $6\ \%$ for air-water**, and the resulting difference between the wet-bulb and adiabatic-saturation temperatures is **less than $0.3\ \mathrm{K}$ between $0$ and $50\ {}^{\circ}\mathrm{C}$**.
**The evaluation.** For the $30\ {}^{\circ}\mathrm{C}$, $50\ \%$ state, solving
$$
\omega_1 = 0.01336, \qquad
\omega_{\mathrm{sat}} \left( T_w \right) = 0.01336 + \frac{1.030}{2{,}440} \left( T_w - 30 \right)
$$
by trial: $T_w = 22\ {}^{\circ}\mathrm{C}$ gives $\omega_{\mathrm{sat}} = 0.01661$ against a required $0.01336 + 1.030 \times \left( - 8 \right) / 2{,}440 = 0.01399$ — **too high**, so $T_w$ is lower; $T_w = 21.5$ gives $0.01587$ against $0.01378$; $T_w = 20.5$ gives $0.01430$ against $0.01336$. **The solution is $T_w \approx 20.2\ {}^{\circ}\mathrm{C}$**, and the ASHRAE chart gives $22.0\ {}^{\circ}\mathrm{C}$ for the same state.
**The $1.8\ \mathrm{K}$ discrepancy is the $c_{p,m} / h_{fg}$ linearisation**, and the reason the exact relation must be used is that the wet-bulb depression is only $8\ \mathrm{K}$ and a $1.8\ \mathrm{K}$ error is **$22\ \%$** of it. **The chart is right and the hand formula is a first approximation**, which is the sentence that should be on every psychrometric chart.
*Sanity.* The reason the Lewis number is near unity for air-water and not for other vapours is that the thermal and mass diffusivities of water vapour in air happen to be within $10\ \%$ of each other, and the reason this is a **luck** is that the wet-bulb thermometer is the most-used humidity instrument in the world and its calibration depends on it. **For acetone, ethanol or benzene the psychrometric ratio is $0.5$ to $0.6$ and the wet-bulb does not equal the adiabatic-saturation temperature** — which is why a spray dryer for a solvent-based coating cannot be controlled with a wet-bulb thermometer.
:::
:::

::: exercise Design {level=3}
Specify the combustion, emissions, heat-recovery and instrumentation basis for a $60\ \mathrm{MW_{th}}$ industrial steam boiler firing a variable mixture of natural gas, biogas and hydrogen, with a permit limit of $30\ \mathrm{mg / Nm^{3}}\ \mathrm{NO_x}$ at $3\ \%\ \mathrm{O_2}$.
::: solution
**The fuel and its consequences.**
$$
\begin{array}{l c c c c}
\text{Fuel} & \mathrm{LHV}\ (\mathrm{MJ / Nm^{3}}) & \left( A / F \right)_{\mathrm{vol}} & \text{Max } \mathrm{CO_2}\ \% & T_{\mathrm{flame}} \\
\text{Natural gas} & 35.9 & 9.52 & 11.7 & 2{,}150\ \mathrm{K} \\
\text{Biogas, } 65\ \%\ \mathrm{CH_4} & 23.3 & 6.20 & 10.4 & 2{,}100\ \mathrm{K} \\
\text{Hydrogen} & 10.8 & 2.39 & - & 2{,}380\ \mathrm{K} \\
\text{Blend, } 70\ \%\ \text{NG} + 20\ \%\ \text{biogas} + 10\ \%\ \mathrm{H_2} & 30.6 & 8.16 & 11.0 & 2{,}180\ \mathrm{K}
\end{array}
$$
**The reading.** **The air requirement varies by $30\ \%$ across the fuel range**, so the burner's air register must be able to hold $\lambda = 1.15$ over a **$4 : 1$** change in volumetric gas flow — which no fixed-orifice gas train can do and which a **mass-flow-controlled, density-compensated** gas train can.
**The four consequences of hydrogen.**
$$
\begin{array}{l l}
\text{Flame speed} & \text{rises steeply, so a premixed burner can flash back; the burner must be rated for the } \mathrm{H_2}\ \text{fraction} \\
\text{Flame radiance} & \text{a } \mathrm{H_2}\ \text{flame is faint and blue, so the flame scanner's UV element must be backed by a thermocouple} \\
\text{Water in the flue gas} & \text{rises, so the dew point rises and the economiser's material must be reviewed} \\
\text{Thermal } \mathrm{NO_x} & \text{rises with the flame temperature, and the permit limit is the binding constraint}
\end{array}
$$
**The $\mathrm{NO_x}$ basis.** $30\ \mathrm{mg / Nm^{3}}$ at $3\ \%\ \mathrm{O_2}$ is $14.8\ \mathrm{ppm}$, and a conventional lean-premixed gas burner achieves **$20$ to $30\ \mathrm{ppm}$** — so the limit requires
$$
\begin{array}{l c}
\text{Ultra-lean premixing with staged air} & 12\text{–}18\ \mathrm{ppm} \\
\text{Flue-gas recirculation at } 15\ \% & 8\text{–}12\ \mathrm{ppm} \\
\text{Selective catalytic reduction, secondary} & 3\text{–}5\ \mathrm{ppm}
\end{array}
$$
**The recommendation is premixing plus $15\ \%$ FGR**, which reaches $10\ \mathrm{ppm}$ and costs $8\ \%$ of the boiler's output in recycled-flue-gas fan power and a $60\ \mathrm{K}$ rise in the stack temperature.
**The heat recovery.**
$$
\begin{array}{l c c}
\text{Recovery} & \text{Flue leaving} & \text{Gain} \\
\text{Conventional economiser} & 150\ {}^{\circ}\mathrm{C} & 6.5\ \% \\
\text{Condensing economiser, } 45\ {}^{\circ}\mathrm{C}\ \text{return} & 45\ {}^{\circ}\mathrm{C} & 15.5\ \% \\
\text{Condensing plus an air preheater} & 40\ {}^{\circ}\mathrm{C} & 17.8\ \%
\end{array}
$$
**The instrumentation.**
$$
\begin{array}{l l l}
\text{Gas flow} & \text{ultrasonic with online density and Wobbe} & \text{the } \lambda\ \text{control depends on it} \\
\text{Gas composition} & \text{online GC or a Wobbe-derived correction} & \text{the } \mathrm{H_2}\ \text{fraction must be known, not assumed} \\
\text{Flue } \mathrm{O_2} & 0.1\ \%\ \text{zirconia, heated above the dew point} & \text{the wet/dry difference is } 16\ \% \\
\text{Flue } \mathrm{NO_x} & \text{certified analyser with a $\mathrm{NO_2}$ converter} & \text{the permit is on total } \mathrm{NO_x} \\
\text{Flue temperature} & \text{redundant, at the economiser outlet} & \text{the low-limit alarm protects the acid dew point}
\end{array}
$$
**The four clauses that protect the buyer.** **"THE BURNER SHALL BE FUEL-FLEXIBLE AND GUARANTEED OVER THE FULL WOBBE RANGE OF $35$ TO $55\ \mathrm{MJ / Nm^{3}}$ WITH UP TO $20\ \%$ HYDROGEN BY VOLUME."** **"THE $\mathrm{NO_x}$ GUARANTEE SHALL BE STATED AT $3\ \%\ \mathrm{O_2}$ AND SHALL BE VERIFIED AT THE MINIMUM AND MAXIMUM WOBBE."** **"THE CONDENSING ECONOMISER MATERIAL SHALL BE SPECIFIED FOR A FLUE-GAS SULFUR CONTENT OF UP TO $30\ \mathrm{mg / Nm^{3}}$ AND A CONDENSATE pH OF $3.5$, AND A NEUTRALISATION UNIT SHALL BE INCLUDED."** **"THE CONTROL SYSTEM SHALL COMPUTE THE AIR SETPOINT FROM THE MEASURED GAS DENSITY AND COMPOSITION AND NOT FROM A FIXED RATIO."**
*Design comment.* The general rule is that **a multi-fuel boiler is a measurement and control project with a pressure vessel attached**, and that a boiler bought on its heat output and tested on pure methane will fail its permit in its second year on a variable biogas supply.
:::
:::
