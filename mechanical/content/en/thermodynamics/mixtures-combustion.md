Two lessons in one, joined by the fact that both are about **counting atoms**. The first is that a mixture of ideal gases behaves as though each component occupied the vessel alone, so that a mixture's properties are a mole-fraction-weighted average of properties that each component already had. The second is that atoms are conserved across a reaction, so that a flame is a **mass balance with a heat release**, and everything about it — the temperature, the dew point, the pollution, the exergy — follows from the balance and the heat.

The reason both belong in a thermodynamics course and not a chemistry one is that engineers meet mixtures in every pipe and combustion in every furnace, and in both cases the hard part is not the physics but the **bookkeeping discipline** of stating a basis, keeping the water on the right side of the equation, and never mixing the mass and mole bases in the same line.

::: warning Seven mixture-and-combustion errors that survive a plant's commissioning
**Mixing the mass and mole bases in one equation.** Mole fractions give the gas constant, the reaction stoichiometry and the equilibrium; mass fractions give the specific heat on a kilogram basis and the fuel's heating value. A calculation that multiplies a **mole** fraction by a **mass**-based specific heat is wrong by the ratio of the component's molar mass to the mixture's, which for the water vapour in humid air is $18.015 / 28.97 = 0.622$ — a **$38\ \%$** error, and the same ratio is the factor $0.622$ that appears in every psychrometric formula. **Using the apparent pressure instead of the partial pressure for the water.** The relative humidity is $\phi = p_v / p_{\mathrm{sat}} \left( T_{\mathrm{db}} \right)$, and $p_{\mathrm{sat}}$ is evaluated at the **dry-bulb** temperature; the **dew point** is the saturation temperature at the **vapour's partial pressure**. A calculation that reads the dew point from the dry-bulb saturation pressure reports $30\ {}^{\circ}\mathrm{C}$ instead of $18\ {}^{\circ}\mathrm{C}$ for air at $30\ {}^{\circ}\mathrm{C}$ and $50\ \%$ humidity. **Forgetting the water in the flue gas.** Burning methane makes **two moles of water per mole of fuel**, and the water is $19\ \%$ of the wet flue gas by volume at the stoichiometric ratio and $17\ \%$ at $15\ \%$ excess air. A flue-gas dew-point calculation that forgets it — or uses a dry analysis — misses a dew point of about $56\ {}^{\circ}\mathrm{C}$, and with it the condensation that corrodes an unprotected flue. **Reporting an Orsat analysis as though it included the water.** The Orsat sample is collected and measured at room temperature over water, so the water vapour has condensed out and the analysis is **on a dry basis**: the sum of $\mathrm{CO_2} + \mathrm{O_2} + \mathrm{CO} + \mathrm{N_2}$ is $100\ \%$ by construction. A balance that treats a dry analysis as wet, or the reverse, gets the excess air wrong. **Assuming the adiabatic flame temperature is a property of the fuel.** It depends on the oxidant, the equivalence ratio, the pressure, the inlet temperature and the extent of dissociation. Methane in air at the stoichiometric ratio gives about $2{,}225\ \mathrm{K}$ ($1{,}950\ {}^{\circ}\mathrm{C}$); in **oxygen** about $3{,}050\ \mathrm{K}$; at $\phi = 1.2$ about $2{,}135\ \mathrm{K}$; with the reactants preheated to $600\ {}^{\circ}\mathrm{C}$ about $2{,}490\ \mathrm{K}$; and at $20\ \mathrm{bar}$ it is about $50\ \mathrm{K}$ **higher**, because pressure suppresses the dissociation of $\mathrm{CO_2}$ and $\mathrm{H_2O}$. **Balancing a reaction with the air's argon in the nitrogen.** Standard combustion analysis treats air as $21\ \%\ \mathrm{O_2}$ and $79\ \%\ \mathrm{N_2}$, i.e. $3.76\ \mathrm{mol\ N_2}$ per mole of oxygen, and uses $M_{\mathrm{air}} = 28.97$ and $R_{\mathrm{air}} = 0.287$. A calculation that uses $3.76$ in the stoichiometry and $28.97$ for the gas constant has been inconsistent by **$0.4\ \%$**, which is small — but a calculation that uses the **real** $79\ \%\ \mathrm{N_2}$, $0.93\ \%\ \mathrm{Ar}$ composition in one place and the $3.76$ convention in another has made an error that no amount of checking will find. **Treating the higher heating value as the available energy.** The HHV credits the latent heat of the water in the products, which is recoverable only if the flue gas is condensed **below** the dew point — and the water's latent heat is **$9.9\ \%$** of methane's HHV ($11\ \%$ of its LHV). A condensing boiler "efficiency" of $106\ \%$ on an LHV basis is $95.5\ \%$ on an HHV basis and is a **correct** figure, and a specification that does not name its basis is not a specification.
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
**The number that makes mixtures a thermodynamic problem and not a bookkeeping one**: every mixing process in a power plant — the air into the fuel, the fuel into the air, the exhaust into the atmosphere — carries an entropy generation of this order, although in a flame the mixing term is small beside the entropy generated by the reaction and the heat transfer within the gas.
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
which is solved by iteration or read from the chart; a rough rule for ordinary room conditions is that **the wet bulb lies about one third of the way from the dew point to the dry bulb**.
**The worked state: $30\ {}^{\circ}\mathrm{C}$ dry bulb, $50\ \%$ relative humidity, $101.325\ \mathrm{kPa}$.**
$$
p_{\mathrm{sat}} \left( 30 \right) = 4.247\ \mathrm{kPa}, \qquad p_v = 0.50 \times 4.247 = 2.124\ \mathrm{kPa}
$$
$$
\omega = 0.622 \times \frac{2.124}{101.325 - 2.124} = 0.01331\ \mathrm{kg / kg\ da}
$$
$$
T_{\mathrm{dp}} = T_{\mathrm{sat}} \left( 2.124 \right) = 18.4\ {}^{\circ}\mathrm{C}, \qquad
h = 1.005 \times 30 + 0.01331 \left( 2{,}501 + 55.8 \right) = 30.15 + 34.03 = 64.2\ \mathrm{kJ / kg\ da}
$$
**The wet-bulb temperature is $22.0\ {}^{\circ}\mathrm{C}$**, and the three temperatures — $30.0$, $22.0$, $18.4$ — are the three numbers that describe the state, and **only two of them are independent**.
**The number that sizes a cooling coil.** Cooling $1\ \mathrm{kg / s}$ of this air to $12\ {}^{\circ}\mathrm{C}$ at $101.325\ \mathrm{kPa}$, where $\omega_{\mathrm{sat}} \left( 12 \right) = 0.00873$:
$$
\dot{Q} = 1 \times \left( 64.2 - h_2 \right), \qquad
h_2 = 1.005 \times 12 + 0.00873 \left( 2{,}501 + 22.3 \right) = 12.06 + 22.01 = 34.1
$$
$$
\dot{Q} = 30.1\ \mathrm{kW}, \qquad
\dot{m}_{\mathrm{cond}} = 1 \times \left( 0.01331 - 0.00873 \right) = 4.58\ \mathrm{g / s} = 16.5\ \mathrm{kg / h}
$$
**The sensible/latent split.** The sensible part is $\left( 1.005 + 1.86 \times 0.01331 \right) \times 18 = 18.5\ \mathrm{kW}$ and the latent is $11.6\ \mathrm{kW}$ — **$38\ \%$ latent**, which is the number that makes a cooling coil's **surface temperature** and not only its area a design constraint, and the reason a data centre cooled to $24\ {}^{\circ}\mathrm{C}$ dry bulb needs a smaller coil than one cooled to $24\ {}^{\circ}\mathrm{C}$ **and** dehumidified.
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
**The number that makes evaporative cooling a design decision and not a trick.** Direct evaporative cooling follows a **constant-wet-bulb** line, so air at $35\ {}^{\circ}\mathrm{C}$ and $20\ \%$ humidity ($\omega = 0.00699$, $T_{\mathrm{wb}} = 18.9\ {}^{\circ}\mathrm{C}$) can be cooled to
$$
T_{\mathrm{out}} = 18.9 + \left( 1 - \eta_{\mathrm{evap}} \right) \left( 35 - 18.9 \right)
$$
At an evaporative efficiency of $85\ \%$ this is $21.3\ {}^{\circ}\mathrm{C}$ — **a $13.7\ \mathrm{K}$ drop for the power of a fan and a water pump**, a small fraction of the compressor power a vapour-compression plant would need. **The catch is the water**: $1\ \mathrm{kg / s}$ of air evaporates about $0.0057\ \mathrm{kg / s}$ of water, which is about **$36\ \mathrm{m^{3}}$ of water per day per $\mathrm{MW}$** of cooling, and the method works only where the air is dry — which is why evaporative cooling is common in Arizona and the Gulf and useless in Singapore.
**The indirect stage, which cools without adding water.** An **indirect** evaporative cooler passes the supply air through a heat exchanger whose other side is cooled by evaporation into a secondary airstream, so the supply is cooled at **constant $\omega$**, to
$$
T_{\mathrm{supply}} = T_{\mathrm{wb}} + \left( 1 - \eta_{\mathrm{IE}} \right) \left( T_{\mathrm{db}} - T_{\mathrm{wb}} \right)
$$
At $\eta_{\mathrm{IE}} = 0.75$ and a $16.1\ \mathrm{K}$ wet-bulb depression this is $22.9\ {}^{\circ}\mathrm{C}$ at $\omega = 0.00699$ — **dry** cool air; a direct stage after it can then cool the air further, below the original wet bulb.
**The number that indicts a cooling tower.** A cooling tower is an evaporative cooler whose **purpose is the water and not the air**: rejecting $1\ \mathrm{MW}$ of heat at a $7\ \mathrm{K}$ range and a $4\ \mathrm{K}$ approach evaporates
$$
\dot{m}_{\mathrm{evap}} = \frac{1{,}000}{2{,}400} = 0.417\ \mathrm{kg / s} = 36\ \mathrm{m^{3} / day\ per\ MW}
$$
plus blowdown and drift. **A $1{,}000\ \mathrm{MW_e}$ steam power station rejecting about $1{,}700\ \mathrm{MW}$ of heat evaporates about $2{,}500\ \mathrm{m^{3}}$ of water per hour** — the domestic consumption of a city of several hundred thousand people — and the reason dry cooling is installed in water-scarce regions is **water**, not carbon.
:::

::: widget plot
f: 0.622*(0.5*0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.5*0.61094*exp(17.27*x/(237.3+x))); 0.622*(0.61094*exp(17.27*x/(237.3+x)))/(101.325-0.61094*exp(17.27*x/(237.3+x)))
x: -10, 45
y: 0, 0.07
labels: humidity ratio at 50 per cent RH; humidity ratio at saturation
caption: The humidity ratio of moist air at $101.325\ \mathrm{kPa}$ against dry-bulb temperature, at $50\ \%$ relative humidity and at saturation, from the Magnus-form saturation-pressure correlation $p_{\mathrm{sat}} = 0.61094 \exp \left[ 17.27\, T / \left( 237.3 + T \right) \right]$ kilopascals with $T$ in degrees Celsius. The two curves **diverge exponentially**, and the divergence is the whole of the reason a cooling coil's latent load rises so steeply with the outside air's humidity: between $20$ and $35\ {}^{\circ}\mathrm{C}$ the saturation humidity ratio rises from $0.0147$ to $0.0366$, a factor of **$2.5$** for a $15\ \mathrm{K}$ rise in temperature. **Every air-conditioning energy figure in a hot-humid climate is a statement about this curve.**
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
\text{Hydrogen} & 2.016 & 0.50 & 34.2 & \text{no carbon, no } \mathrm{CO_2} \\
\text{Methane} & 16.04 & 2.00 & 17.19 & 9.5\ \%\ \text{by volume in air is stoichiometric} \\
\text{Propane} & 44.09 & 5.00 & 15.64 & \\
\text{Octane} & 114.23 & 12.50 & 15.09 & \text{the spark-ignition reference} \\
\text{Diesel, } \mathrm{C_{12}H_{23}} & 167.3 & 17.75 & 14.63 & \\
\text{Ethanol} & 46.07 & 3.00 & 8.98 & \text{about } 1.6\times\ \text{the fuel volume of gasoline per kg of air} \\
\text{Methanol} & 32.04 & 1.50 & 6.46 & \text{the reason a flex-fuel injector is oversized} \\
\text{Carbon, } \mathrm{C} & 12.01 & 1.00 & 11.5 & \text{a coal adds moisture, ash and hydrogen} \\
\text{Carbon monoxide} & 28.01 & 0.50 & 2.46 & \text{a fuel gas, not a pollutant, when it is the fuel}
\end{array}
$$
**The number that makes hydrogen's $34.2$ misleading.** On a **volumetric** basis hydrogen needs only $2.38\ \mathrm{m^{3}}$ of air per $\mathrm{m^{3}}$ of fuel against methane's $9.52$, so in a stoichiometric mixture hydrogen occupies $1 / 3.38 = 30\ \%$ of the volume: a **port-injected** hydrogen engine displaces almost a third of its intake air with fuel, which costs power density — one reason hydrogen direct injection exists.
**The excess-air and equivalence conventions.**
$$
\%\ \text{excess air} = \left( \lambda - 1 \right) \times 100, \qquad
\phi = 1.0\ \text{stoichiometric}, \quad \phi > 1\ \text{rich}, \quad \phi < 1\ \text{lean}
$$
**The number that sets a spark-ignition engine's window.** The three-way catalyst works only in a window of roughly $\pm 0.5\ \%$ around $\phi = 1$, and the oxygen sensor's step is the only thing that holds it there. A diesel runs at $\phi = 0.2$ to $0.4$ at part load, an industrial gas turbine at $\phi = 0.3$ to $0.5$ to keep the flame temperature below the $\mathrm{NO_x}$ threshold, and a furnace at $\lambda = 1.15$ to $1.30$ because any less gives incomplete combustion and any more gives stack loss.
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
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.2 \times 2 + 3.76 \times 1.2 \times 2} = \frac{100}{10.424} = 9.59\ \%, \qquad
\%\, \mathrm{O_2} = \frac{40}{10.424} = 3.84\ \%
$$
**The maximum $\mathrm{CO_2}$**, at $\lambda = 1$, is $100 / \left( 1 + 7.52 \right) = 11.7\ \%$ — and **that number is the whole of the flue-gas monitor's calibration**: a $\mathrm{CO_2}$ reading of $9.59\ \%$ on a methane-fired boiler means $\lambda = 1.20$, and a reading of $11.0\ \%$ means $\lambda = 1.06$.
**The number that makes the $\mathrm{O_2}$ reading the useful one.** Because the maximum $\mathrm{CO_2}$ differs by fuel ($11.7\ \%$ for methane, $14.5\ \%$ for octane, $21.0\ \%$ for carbon), a $\mathrm{CO_2}$-based excess-air figure must know the fuel; the **$\mathrm{O_2}$** figure does not, to first order, and this is why every modern burner controls on $\mathrm{O_2}$ and computes the $\mathrm{CO_2}$.
**The correction that is always forgotten.** A zirconia or paramagnetic $\mathrm{O_2}$ analyser reads on a **wet** or **dry** basis depending on whether it is heated above the dew point, and the difference for a gas-fired boiler at $\lambda = 1.2$ is
$$
\%\, \mathrm{O_{2,\mathrm{wet}}} = \%\, \mathrm{O_{2,\mathrm{dry}}} \times \frac{10.424}{10.424 + 2} = 3.84 \times 0.839 = 3.22\ \%
$$
**A $0.62$-point error on a $3.8\ \%$ reading is $16\ \%$**, and confusing the two bases is a common error in a boiler's combustion-control loop.
**The excess air that a boiler should run at, and what it costs.**
$$
\begin{array}{l c c c c}
\lambda & \%\, \mathrm{O_{2,dry}} & \text{Stack loss}\ \left( 150\ \mathrm{K}\ \text{above air} \right) & \text{Unburnt loss (illustrative)} & \text{Total} \\
1.05 & 1.1 & 6.4\ \% & 1.2\ \% & 7.6\ \% \\
1.10 & 2.1 & 6.7\ \% & 0.6\ \% & 7.3\ \% \\
1.15 & 3.0 & 6.9\ \% & 0.3\ \% & 7.2\ \% \\
1.20 & 3.8\ \text{(wet } 3.2\text{)} & 7.2\ \% & 0.2\ \% & 7.4\ \% \\
1.30 & 5.3 & 7.7\ \% & 0.15\ \% & 7.9\ \% \\
1.50 & 7.6 & 8.8\ \% & 0.1\ \% & 8.9\ \%
\end{array}
$$
**The optimum is $\lambda = 1.10$ to $1.15$**, and the curve is **flat** between about $1.05$ and $1.25$ — which is why a burner tuned from $1.30$ to $1.15$ saves about **$0.7\ \%$** of the fuel, while one tuned from $1.15$ to $1.05$ **loses** about $0.4\ \%$ to unburnt fuel.
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
\mathrm{O_2},\ \mathrm{N_2},\ \mathrm{H_2},\ \mathrm{C\ (s)} & 0 & \mathrm{OH} & + 38{,}990
\end{array}
$$
**The heating values, and the $11\ \%$ that separates them.** For methane, $M = 16.04$:
$$
\mathrm{HHV} = \frac{285{,}830 \times 2 + 393{,}520 - 74{,}850}{16.04} = \frac{890{,}330}{16.04} = 55{,}510\ \mathrm{kJ / kg}
$$
$$
\mathrm{LHV} = \mathrm{HHV} - \frac{y}{2} \times \frac{44{,}010}{M}
= 55{,}510 - \frac{2 \times 44{,}010}{16.04} = 55{,}510 - 5{,}490 = 50{,}020\ \mathrm{kJ / kg}
$$
**The ratio $\mathrm{HHV} / \mathrm{LHV}$, which is the number a boiler specification turns on.**
$$
\begin{array}{l c c c}
\text{Methane} & 1.110 & \text{Octane} & 1.075 \\
\text{Hydrogen} & 1.183 & \text{Bituminous coal} & \approx 1.04 \\
\text{Propane} & 1.086 & \text{Wood, dry} & \approx 1.08 \\
\text{Ethanol} & 1.107 & \text{Heavy fuel oil} & \approx 1.06
\end{array}
$$
**The rule.** The ratio rises with the fuel's **hydrogen content**, and hydrogen's $1.183$ is why a hydrogen-fired boiler's "efficiency" on an LHV basis looks $18\ \%$ better than the same boiler on an HHV basis.
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
T_{\mathrm{ad}} \approx 2{,}330\ \mathrm{K}\ \text{without dissociation}, \qquad
T_{\mathrm{ad}} \approx 2{,}225\ \mathrm{K}\ \text{with equilibrium}
$$
**The $100\ \mathrm{K}$ is dissociation**, and it is not a refinement: at $2{,}225\ \mathrm{K}$ equilibrium leaves about **$9\ \%$** of the carbon as CO, about **$2\ \%$** of the hydrogen as $\mathrm{H_2}$, and some OH, O, H and NO, and the enthalpy tied up in those species is the $100\ \mathrm{K}$.
**The number that makes the flame temperature a design constraint and not a curiosity.**
$$
\begin{array}{l c}
\text{Methane in air, stoichiometric} & 2{,}225\ \mathrm{K} \\
\text{Methane in oxygen} & 3{,}050\ \mathrm{K} \\
\text{Methane at } \phi = 1.2\ \text{in air} & 2{,}135\ \mathrm{K} \\
\text{Methane at } \phi = 0.8\ \text{in air} & 2{,}000\ \mathrm{K} \\
\text{Methane in air, inlet preheated to } 600\ \mathrm{K} & 2{,}370\ \mathrm{K} \\
\text{Methane at } 20\ \mathrm{bar}\text{, stoichiometric air} & 2{,}280\ \mathrm{K} \\
\text{Hydrogen in air, stoichiometric} & 2{,}380\ \mathrm{K} \\
\text{Methane in air, } \phi = 0.35 & 1{,}170\ \mathrm{K}
\end{array}
$$
(Equilibrium values from $298\ \mathrm{K}$ reactants at $1\ \mathrm{atm}$ unless stated.) **The reading.** **The peak is at $\phi \approx 1.05$, not at $\phi = 1$**, because in a slightly rich mixture the products have a lower heat capacity and less dissociation; **preheating raises the flame temperature by about $0.5\ \mathrm{K}$ per kelvin of preheat**, which is why a regenerative burner with $1{,}100\ {}^{\circ}\mathrm{C}$ air preheat reaches a flame near $2{,}700\ \mathrm{K}$; and **pressure raises it slightly** by suppressing dissociation.
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
\mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{CO_2} & + 6.63 & \text{mostly complete} \\
\mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{H_2O} & + 8.15 & \text{mostly complete} \\
\tfrac{1}{2} \mathrm{N_2} + \tfrac{1}{2} \mathrm{O_2} \rightleftharpoons \mathrm{NO} & - 3.97 & \text{about } 650\ \mathrm{ppm\ NO} \\
\mathrm{CO_2} \rightleftharpoons \mathrm{CO} + \tfrac{1}{2} \mathrm{O_2} & - 6.63 & 3\ \%\ \text{dissociated} \\
\mathrm{H_2O} \rightleftharpoons \mathrm{H_2} + \tfrac{1}{2} \mathrm{O_2} & - 8.15 & 0.7\ \%\ \text{dissociated}
\end{array}
$$
(Values of $\ln K_p$ at $2{,}000\ \mathrm{K}$; the meanings refer to stoichiometric methane–air products held at $2{,}000\ \mathrm{K}$ and $1\ \mathrm{atm}$.)
**The number that makes $\mathrm{NO_x}$ a kinetics problem and not an equilibrium one.** The equilibrium $\mathrm{NO}$ fraction in stoichiometric methane–air products at the $2{,}225\ \mathrm{K}$ flame temperature is about **$1{,}900\ \mathrm{ppm}$**, and about $3{,}000\ \mathrm{ppm}$ at $\phi = 0.8$ — yet a lean-premixed gas-turbine combustor leaves with **$10$ to $25\ \mathrm{ppm}$** and a diesel with a few hundred. **The Zeldovich mechanism is rate-limited, not equilibrium-limited**: the $\mathrm{N \equiv N}$ bond's $945\ \mathrm{kJ / mol}$ makes the first step, $\mathrm{O} + \mathrm{N_2} \to \mathrm{NO} + \mathrm{N}$, so slow that NO never approaches equilibrium in the few milliseconds the gas spends at flame temperature, and once the gas cools what has formed is frozen. The initial rate is approximately
$$
\frac{d \left[ \mathrm{NO} \right]}{d t} = \frac{6 \times 10^{16}}{T^{1/2}} \exp \left( - \frac{69{,}090}{T} \right) \left[ \mathrm{O_2} \right]_e^{1/2} \left[ \mathrm{N_2} \right]_e \quad \mathrm{mol / cm^{3} \cdot s}
$$
with $T$ in kelvin and the concentrations in $\mathrm{mol / cm^{3}}$.
**The exponential's bite.** A $100\ \mathrm{K}$ reduction in flame temperature from $2{,}150$ to $2{,}050\ \mathrm{K}$ cuts this rate, at fixed concentrations, by a factor of
$$
\sqrt{\frac{2{,}150}{2{,}050}}\, \exp \left[ 69{,}090 \left( \frac{1}{2{,}050} - \frac{1}{2{,}150} \right) \right]
= 1.024 \times \exp \left( 1.568 \right) = 4.9
$$
— **about fivefold**, which is why **lean premixed combustion** attacks the **peak temperature** and the time spent near it, and why a few tens of kelvin off the **peak** are worth more than a larger reduction in the mean.
**The flue-gas dew points, which are the numbers that decide a boiler's materials.**
$$
\begin{array}{l c c}
\text{Fuel and excess air} & \text{Water partial pressure} & \text{Dew point} \\
\text{Methane, } \lambda = 1.0 & 19.3\ \mathrm{kPa} & 59.2\ {}^{\circ}\mathrm{C} \\
\text{Methane, } \lambda = 1.2 & 16.3\ \mathrm{kPa} & 55.7\ {}^{\circ}\mathrm{C} \\
\text{Methane, } \lambda = 2.0 & 10.1\ \mathrm{kPa} & 46.0\ {}^{\circ}\mathrm{C} \\
\text{Natural gas, } \lambda = 1.15 & 16.7\ \mathrm{kPa} & 56.2\ {}^{\circ}\mathrm{C} \\
\text{Heavy fuel oil, } \lambda = 1.15 & 10.0\ \mathrm{kPa} & 45.8\ {}^{\circ}\mathrm{C} \\
\text{Bituminous coal (8\ \% moisture), } \lambda = 1.2 & 6.7\ \mathrm{kPa} & 38.2\ {}^{\circ}\mathrm{C}
\end{array}
$$
**The acid dew point, which is a different and much higher number.** With $1\ \%$ sulfur in the fuel the $\mathrm{SO_3}$ formed gives a sulphuric-acid mist whose dew point is
$$
T_{\mathrm{acid}} \approx 120\text{–}155\ {}^{\circ}\mathrm{C}\ \text{for coal and heavy oil}
$$
**and it is the reason a coal or oil boiler's flue gas is not cooled below roughly $130$ to $150\ {}^{\circ}\mathrm{C}$**, and the reason a high-sulfur heavy-oil marine engine needs a cylinder lubricant of high base number to neutralise the acid.
**The number that limits a condensing boiler.** A condensing boiler recovers the latent heat **and** cools the flue to $45\ {}^{\circ}\mathrm{C}$, but it can only do so if the **return water is below the dew point of about $55\ {}^{\circ}\mathrm{C}$** — and an existing building designed for $80 / 70\ {}^{\circ}\mathrm{C}$ radiators returns above that for much of the season, so the boiler condenses only part of the time and its seasonal efficiency falls several points below the $106\ \%$ (LHV) of its datasheet. **The retrofit that matters is the radiator area, not the boiler.**
:::

::: widget plot
f: 4833.7*pow(x,6) - 40361.2*pow(x,5) + 135994.6*pow(x,4) - 234504.2*pow(x,3) + 215024.2*pow(x,2) - 97439.2*x + 18664.9
x: 0.6, 2.0
y: 1400, 2400
labels: adiabatic flame temperature K, with equilibrium dissociation
caption: The constant-pressure adiabatic flame temperature of methane burned in air from $298\ \mathrm{K}$ and $1\ \mathrm{atm}$, with equilibrium dissociation, against the equivalence ratio $\phi$ (a polynomial fit, within about $15\ \mathrm{K}$, to equilibrium calculations). The curve rises steeply on the lean side, where the excess air absorbs the heat, peaks near $2{,}230\ \mathrm{K}$ at $\phi \approx 1.05$, and falls on the rich side, where part of the fuel's energy leaves unreleased as CO and $\mathrm{H_2}$. **A lean-premixed gas-turbine combustor runs near $\phi \approx 0.6$** — accepting a flame about **$550\ \mathrm{K}$** cooler than the peak to cut thermal $\mathrm{NO_x}$ by orders of magnitude.
:::

## Worked cases

::: example An air-conditioning load {#ex-ac}
An office needs $120\ \mathrm{kW}$ of sensible cooling and $40\ \mathrm{kW}$ of latent cooling. Outside air is $35\ {}^{\circ}\mathrm{C}$, $60\ \%$ relative humidity; the room is held at $24\ {}^{\circ}\mathrm{C}$, $50\ \%$; the supply air leaves the coil at $13\ {}^{\circ}\mathrm{C}$; and $25\ \%$ of the supply air is fresh outside air, the rest recirculated. Find the airflow, the coil duty and the chiller plant's electrical demand.
::: solution
**The states.**
$$
\begin{array}{l c c c c}
& T_{\mathrm{db}} & \phi & \omega & h \\
\text{O (outside)} & 35 & 0.60 & 0.02145 & 90.2 \\
\text{R (room)} & 24 & 0.50 & 0.00930 & 47.8 \\
\text{C (coil leaving, sat.)} & 13 & 1.00 & 0.00933 & 36.6 \\
\text{M (mixed)} & 26.75 & - & 0.01234 & 58.4
\end{array}
$$
**The supply airflow, from the sensible load.**
$$
\dot{m}_a = \frac{\dot{Q}_s}{c_{p,m} \left( T_R - T_C \right)}
= \frac{120}{\left( 1.005 + 1.86 \times 0.0093 \right) \times \left( 24 - 13 \right)}
= \frac{120}{11.25} = 10.67\ \mathrm{kg\ da / s}
$$
**The check against the latent load.**
$$
\dot{Q}_l = 10.67 \times \left( 0.00930 - 0.00933 \right) \times 2{,}501 = - 0.9\ \mathrm{kW}
$$
**The coil leaving humidity ratio of $0.00933$ is above the room's**, so a coil leaving saturated at $13\ {}^{\circ}\mathrm{C}$ cannot absorb the latent load at any airflow — and the required supply humidity is found from the latent requirement:
$$
\omega_C = \omega_R - \frac{\dot{Q}_l}{\dot{m}_a \times 2{,}501}
= 0.00930 - \frac{40}{10.67 \times 2{,}501} = 0.00930 - 0.00150 = 0.00780
$$
**The coil leaving temperature** is the saturation temperature at $\omega = 0.00780$, which is $T_{\mathrm{sat}} \left( 1.255\ \mathrm{kPa} \right) = 10.3\ {}^{\circ}\mathrm{C}$.
**The design decision this forces.** The coil must cool the air to $10.3\ {}^{\circ}\mathrm{C}$ to dehumidify it, which needs a chilled-water supply of about $5\ {}^{\circ}\mathrm{C}$; the air is then either supplied at $10.3\ {}^{\circ}\mathrm{C}$ with a correspondingly smaller airflow, or reheated to $13\ {}^{\circ}\mathrm{C}$ — about $29\ \mathrm{kW}$, which should come from recovered condenser heat and not from new energy. **The sensible heat ratio of $0.75$ is the constraint, and it is set by the building and not by the plant.** The rest of this example keeps the $10.67\ \mathrm{kg / s}$ supply with reheat.
**The coil duty, at the corrected state** ($h_C = 30.0$ at $10.3\ {}^{\circ}\mathrm{C}$ saturated).
$$
\dot{Q}_{\mathrm{coil}} = 10.67 \times \left( h_M - h_C \right)
= 10.67 \times \left( 58.4 - 30.0 \right) = 302.6\ \mathrm{kW}
$$
**The water condensed.**
$$
\dot{m}_w = 10.67 \times \left( 0.01234 - 0.00780 \right) = 0.0484\ \mathrm{kg / s} = 174\ \mathrm{kg / h}
$$
**The chiller's electrical demand.** At a water-cooled chiller's $\mathrm{COP}$ of $5.4$, with the pumps and fans added separately:
$$
\dot{W}_{\mathrm{chiller}} = \frac{302.6}{5.4} = 56.0\ \mathrm{kW}
$$
**The pumps.** The chilled-water flow at a $6\ \mathrm{K}$ rise is $302.6 / \left( 4.19 \times 6 \right) = 12.04\ \mathrm{kg / s} = 0.0120\ \mathrm{m^{3} / s}$, and at a $250\ \mathrm{kPa}$ pump head with a $0.70$ pump-and-motor efficiency:
$$
\dot{W}_{\mathrm{pumps}} = \frac{0.0120 \times 250}{0.70} = 4.3\ \mathrm{kW}
$$
**The fans.** The supply volume is $10.67 / 1.18 = 9.04\ \mathrm{m^{3} / s}$, and at a $550\ \mathrm{Pa}$ total pressure across the coil, filter, ductwork and the outside-air inlet, with a $0.65$ fan and motor efficiency:
$$
\dot{W}_{\mathrm{fans}} = \frac{9.04 \times 550}{0.65 \times 1000} = 7.7\ \mathrm{kW}
$$
$$
\dot{W}_{\mathrm{total}} = 56.0 + 4.3 + 7.7 = 68.0\ \mathrm{kW}, \qquad
\mathrm{COP}_{\mathrm{plant}} = \frac{120 + 40}{68.0} = 2.35
$$
**The reading.** **The plant delivers $160\ \mathrm{kW}$ of room cooling for $68.0\ \mathrm{kW}$ of electricity — a plant COP of $2.35$ against the chiller's $5.4$** — and most of the $2.3$-fold difference is that the coil must remove $303\ \mathrm{kW}$ to deliver $160\ \mathrm{kW}$ to the room, the rest being the pumps and fans. **The number that appears on the chiller's nameplate is $5.4$ and the number the building pays is $2.35$.**
*Sanity.* The outside air's load is large because $2.67\ \mathrm{kg / s}$ of outside air at $h = 90.2$ against the room's $47.8$ carries
$$
2.67 \times \left( 90.2 - 47.8 \right) = 113.2\ \mathrm{kW}
$$
**$37\ \%$ of the coil duty for $25\ \%$ of the air** — which is why office HVAC specifications commonly include **energy recovery** on the outside air: a $75\ \%$-effective enthalpy wheel is worth about **$85\ \mathrm{kW}$** of coil duty, at the cost of some extra fan pressure.
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
**The flue gas.** $11.948\ \mathrm{kmol}$ wet per kmol of fuel, $9.948\ \mathrm{kmol}$ dry.
$$
\%\, \mathrm{CO_{2,\mathrm{dry}}} = \frac{100}{9.948} = 10.05\ \%, \qquad
\%\, \mathrm{O_{2,\mathrm{dry}}} = \frac{30}{9.948} = 3.02\ \%
$$
**The stack loss, on an LHV basis.** With the mean specific heats over $20$ to $160\ {}^{\circ}\mathrm{C}$:
$$
\begin{array}{l c c c}
\mathrm{CO_2} & 1\ \mathrm{kmol} & 39.8\ \mathrm{kJ / kmol \cdot K} & 5{,}573\ \mathrm{kJ} \\
\mathrm{H_2O} & 2\ \mathrm{kmol} & 34.0 & 9{,}522 \\
\mathrm{O_2} & 0.3\ \mathrm{kmol} & 29.8 & 1{,}253 \\
\mathrm{N_2} & 8.648\ \mathrm{kmol} & 29.2 & 35{,}388 \\
\hline
& & & 51{,}737\ \mathrm{kJ\ per\ kmol\ fuel}
\end{array}
$$
$$
\eta_{\mathrm{stack}} = \frac{51{,}737}{802{,}310} = 6.45\ \%
$$
**The efficiency, gross.**
$$
\eta_{\mathrm{LHV}} = 100 - 6.45 - 0.4\ \left( \text{unburnt and radiation} \right) = 93.2\ \%
$$
**against an HHV-basis figure of**
$$
\eta_{\mathrm{HHV}} = 93.2 \times \frac{50{,}020}{55{,}510} = 83.9\ \%
$$
**The $9.3$-point difference is the water's latent heat**, and both figures describe the same boiler.
**The condensed case.** At $40\ {}^{\circ}\mathrm{C}$ the flue gas can hold only $p_{\mathrm{sat}} = 7.38\ \mathrm{kPa}$ of water vapour, so with $9.948\ \mathrm{kmol}$ of dry gas the vapour left is
$$
n_v = 9.948 \times \frac{7.38}{101.325 - 7.38} = 0.78\ \mathrm{kmol}, \qquad
\text{condensed} = 2 - 0.78 = 1.22\ \mathrm{kmol}
$$
**The losses at a $40\ {}^{\circ}\mathrm{C}$ flue**, on the LHV basis (water vapour as the reference), against the $20\ {}^{\circ}\mathrm{C}$ air:
$$
\text{sensible, dry gas and all the water as vapour, } 20 \to 40\ {}^{\circ}\mathrm{C}: 7{,}298\ \mathrm{kJ}, \qquad
\text{radiation and unburnt: } 0.004 \times 802{,}310 = 3{,}209\ \mathrm{kJ}
$$
$$
\text{latent heat recovered: } 1.22 \times 44{,}010 = 53{,}602\ \mathrm{kJ}
$$
$$
\eta_{\mathrm{LHV}} = 1 - \frac{7{,}298 + 3{,}209 - 53{,}602}{802{,}310} = 1 + \frac{43{,}095}{802{,}310} = 105.4\ \%
$$
**and on the HHV basis**, where the water's latent heat sits inside the fuel figure:
$$
\eta_{\mathrm{HHV}} = 105.4 \times \frac{50{,}020}{55{,}510} = 95.0\ \%
$$
**The condensing boiler is $95.0\ \%$ on HHV and $105.4\ \%$ on LHV**, and the $105.4\ \%$ is legitimate because the LHV does not count the $53.6\ \mathrm{MJ}$ of latent heat the boiler has recovered.
**The number that decides the retrofit.** The extra recovery is $105.4 - 93.2 = 12.2$ points of LHV, or about **$6{,}100\ \mathrm{kJ / kg}$** of gas, and it cuts the fuel for the same heat by $1 - 93.2 / 105.4 = 11.6\ \%$. On a $10\ \mathrm{MW}$ boiler running $8{,}000$ hours a year that is about **$10{,}000\ \mathrm{MWh}$** of gas a year. **The constraint is the return temperature**, which must be well below the $56\ {}^{\circ}\mathrm{C}$ dew point for the heat exchanger to condense much of the water.
*Sanity.* The non-condensing efficiency is $93.2\ \%$ on LHV and $83.9\ \%$ on HHV because of the $11\ \%$ latent heat, and the condensing boiler's LHV figure exceeds $100\ \%$ because the LHV is a **smaller denominator**, not because energy is created. **Every efficiency figure in this example is correct, and a figure without its basis is meaningless** — European ecodesign rules and US AFUE ratings use the gross (HHV) basis, while many European catalogues quote net (LHV).
:::
:::

::: example A gas turbine's combustor {#ex-gtcomb}
A gas turbine combustor receives air at $728\ \mathrm{K}$ and $1.35\ \mathrm{MPa}$ and delivers combustion gas at $1{,}690\ \mathrm{K}$ using methane. Find the fuel flow per kilogram of air, the equivalence ratio, the exit $\mathrm{NO_x}$ tendency and the combustor's exergy destruction.
::: solution
**The energy balance per kilogram of air.**
$$
\dot{m}_f \times \mathrm{LHV} = \left( 1 + \dot{m}_f \right) c_{p,g} \left( T_3 - T_2 \right)
$$
With a mean $c_{p,g} = 1.26\ \mathrm{kJ / kg \cdot K}$ for the combustion gas over $728$ to $1{,}690\ \mathrm{K}$ and $\mathrm{LHV} = 50{,}020\ \mathrm{kJ / kg}$:
$$
\dot{m}_f \times 50{,}020 = \left( 1 + \dot{m}_f \right) \times 1.26 \times 962
\quad \Rightarrow \quad
\dot{m}_f = \frac{1{,}212}{48{,}808} = 0.0248\ \mathrm{kg\ fuel / kg\ air}
$$
(an equilibrium calculation with fuel entering at $298\ \mathrm{K}$ gives $0.0250$).
**The equivalence ratio.** The stoichiometric air-fuel ratio for methane is $17.19$, so
$$
\phi = \frac{\left( F / A \right)}{\left( F / A \right)_{\mathrm{th}}} = \frac{0.0248}{1 / 17.19} = 0.0248 \times 17.19 = 0.43
$$
**The combustor runs overall at $\phi = 0.43$, which is $133\ \%$ excess air** — because the turbine cannot tolerate a hotter gas, so the combustor is run lean overall: in a conventional combustor the flame burns near stoichiometric in a **primary zone** and **dilution air** is added downstream; in a dry-low-$\mathrm{NO_x}$ combustor most of the air is premixed with the fuel and burned lean.
**The number that makes the dilution zone a design problem.** A near-stoichiometric primary zone reaches about $2{,}500\ \mathrm{K}$ with this preheat and forms $\mathrm{NO}$ at the Zeldovich rate, so the dilution air must mix in quickly — within milliseconds — to stop the formation. **The mixing pattern can change the $\mathrm{NO_x}$ several-fold at almost no cost in efficiency**, which is why combustor development is largely a matter of aerodynamics, mixing and acoustics rather than thermodynamics.
**The exit composition.** At $\phi = 0.43$, per kmol of methane the products are $1\ \mathrm{CO_2} + 2\ \mathrm{H_2O} + 2.67\ \mathrm{O_2} + 17.5\ \mathrm{N_2}$, i.e.
$$
\%\, \mathrm{CO_2} = 4.3, \quad \%\, \mathrm{O_2} = 11.4, \quad \%\, \mathrm{H_2O} = 8.6, \quad \%\, \mathrm{N_2} = 75.6
$$
**The equilibrium $\mathrm{NO}$** at $1{,}690\ \mathrm{K}$ in this oxygen-rich gas is about $2{,}000\ \mathrm{ppm}$, yet a modern dry-low-$\mathrm{NO_x}$ combustor leaves with about **$9$ to $25\ \mathrm{ppm}$** corrected to $15\ \%\ \mathrm{O_2}$ — kinetics, not equilibrium, sets the figure, and the **peak flame temperature** and residence time decide it.
**The exergy destruction.** The combustor's irreversibility is dominated by the reaction and the mixing:
$$
\dot{S}_{\mathrm{gen}} = \sum_{\mathrm{prod}} N \bar{s} - \sum_{\mathrm{react}} N \bar{s} - \frac{\dot{Q}}{T_b} \quad \left( \dot{Q} = 0,\ \text{adiabatic} \right)
$$
For methane burning adiabatically with stoichiometric air from $298\ \mathrm{K}$ the entropy generation is about $790\ \mathrm{kJ / K}$ per kmol of fuel, and with air at $728\ \mathrm{K}$, $1.35\ \mathrm{MPa}$ and $\phi = 0.43$ it is about **$780\ \mathrm{kJ / K}$** per kmol (equilibrium calculation):
$$
\dot{X}_{\mathrm{dest}} = 298.15 \times 782 = 233{,}000\ \mathrm{kJ\ per\ kmol\ fuel}
$$
against a fuel exergy of $831{,}650\ \mathrm{kJ / kmol}$ — **$28\ \%$ of the fuel's exergy destroyed in the combustor alone**, before any turbine has seen it.
**The reading.** **The combustor is the largest single exergy destroyer in a gas turbine**, and the way to reduce it is not a better liner but **hotter reactants and a hotter product gas** — higher compressor delivery temperature and higher firing temperature, which is the direction successive gas-turbine generations have taken — or not to burn the fuel at all.
*Sanity.* The combustor destroys over a quarter of the fuel's exergy because it releases chemical energy by an **unrestrained chemical reaction** and degrades it into heat at under $1{,}700\ \mathrm{K}$, and any unrestrained process is as irreversible as a free expansion. **The fuel cell is the alternative**: it converts part of the chemical energy to electricity directly, and high-temperature fuel cells reach about $60\ \%$ electrical efficiency.
:::
:::

::: example Flue-gas dew point and a condensing retrofit {#ex-dewpoint}
A $5\ \mathrm{MW}$ gas boiler currently exhausting at $180\ {}^{\circ}\mathrm{C}$ is to be retrofitted with a condensing economiser. The network return is $58\ {}^{\circ}\mathrm{C}$. Evaluate the recovery, the materials and the risk.
::: solution
**The flue gas.** Methane at $\lambda = 1.15$: $11.948\ \mathrm{kmol}$ wet per kmol of fuel, with $2\ \mathrm{kmol}$ of water.
$$
p_{\mathrm{H_2O}} = \frac{2}{11.948} \times 101.325 = 16.96\ \mathrm{kPa} \quad \Rightarrow \quad
T_{\mathrm{dp}} = 56.5\ {}^{\circ}\mathrm{C}
$$
**The reading.** **The return water at $58\ {}^{\circ}\mathrm{C}$ is above the dew point of $56.5\ {}^{\circ}\mathrm{C}$** — the economiser will barely condense at all, and the recovery will be sensible only.
**The recovery at $58\ {}^{\circ}\mathrm{C}$ return.** The boiler, at $93.2\ \%$ (LHV), burns $5{,}000 / 0.932 = 5{,}370\ \mathrm{kW}$ of fuel, i.e. $5{,}370 / 802{,}310 = 0.00669\ \mathrm{kmol / s}$ of methane. Cooling the flue gas (the products of the boiler example, with about $370\ \mathrm{kJ / K}$ per kmol of fuel) from $180$ to $65\ {}^{\circ}\mathrm{C}$:
$$
\dot{Q} = 0.00669 \times 42{,}790 = 286\ \mathrm{kW}
$$
**The recovery if the return is lowered to $40\ {}^{\circ}\mathrm{C}$.** Cooling the flue gas further to $45\ {}^{\circ}\mathrm{C}$, where it can hold only $1.04\ \mathrm{kmol}$ of vapour, condenses $0.96\ \mathrm{kmol}$ of the $2\ \mathrm{kmol}$ of water:
$$
\dot{Q} = 286 + 0.00669 \times \left( 7{,}340 + 0.96 \times 44{,}010 \right) = 286 + 332 = 618\ \mathrm{kW}
$$
**The $332\ \mathrm{kW}$ of extra recovery more than doubles the economiser's value** and requires the return temperature to fall by **$18\ \mathrm{K}$**, which requires **more emitter area in the buildings on the network**.
**The materials.** Condensate from a gas flue has a pH of **$3.5$ to $4.5$** (carbonic acid, plus nitric acid from the $\mathrm{NO_x}$) and is **aggressive to carbon steel and to brick**. The options:
$$
\begin{array}{l l c}
\text{Stainless 316L} & \text{standard, but pitting if the chloride exceeds } 200\ \mathrm{mg / l} & 1.0 \\
\text{Aluminium-silicon (cast)} & \text{common in domestic condensing boilers; needs condensate pH above about } 4 & 0.8 \\
\text{Polymer (PP, PPSU, fluoropolymer)} & \text{for flue parts and small units, temperature-limited} & 1.4 \\
\text{Glass or enamelled tubes} & \text{immune to the acid and fragile} & 2.2
\end{array}
$$
**The condensate must be neutralised** — at a $40\ {}^{\circ}\mathrm{C}$ return this $5\ \mathrm{MW}$ boiler condenses $0.00669 \times 0.96 \times 18.0 = 0.116\ \mathrm{kg / s}$, about **$10\ \mathrm{m^{3}}$ per day** of acidic condensate, which must not be discharged untreated to a copper or cast-iron drain.
**The risk that is never in the brochure.** A condensing economiser **cools the flue gas below the acid dew point of any sulfur in the fuel**. Pipeline natural gas carries only a few milligrams of sulfur per cubic metre, mostly the odorant; **a boiler converted to biogas or landfill gas with a variable sulfur content can deposit sulphuric acid** and corrode even a stainless heat exchanger quickly. **The specification must state the fuel's sulfur limit and the fuel supplier must be contractually bound to it.**
**The number that decides the project.** The economiser's recovery is worth about **$5\ \%$** of the boiler's fuel at the current return temperature ($286 / 5{,}370$) and about **$11.5\ \%$** at a $40\ {}^{\circ}\mathrm{C}$ return ($618 / 5{,}370$). **The project is a network-temperature project wearing a heat-exchanger purchase order**, and the party who approves it without the emitter survey has bought a $290\ \mathrm{kW}$ heat exchanger instead of a $620\ \mathrm{kW}$ one.
*Sanity.* Excess air **dilutes** the water and **lowers** the dew point, so $56.5\ {}^{\circ}\mathrm{C}$ at $\lambda = 1.15$ sits between the $59.2\ {}^{\circ}\mathrm{C}$ of the stoichiometric case and the $55.7\ {}^{\circ}\mathrm{C}$ of the $\lambda = 1.2$ row of the definition table. **The dew point must be computed from the wet analysis**: a dry analysis contains no water at all.
:::
:::

::: history
**The law of partial pressures** is **John Dalton**'s, stated in **1801** in the course of his studies of water vapour and the atmosphere, and his essays of the same years on evaporation and the force of steam also treated the dew point. **Gay-Lussac**'s combining volumes of **1808** and **Avogadro**'s hypothesis of **1811** supplied the mole, and **Cannizzaro**'s **1858** pamphlet finally persuaded chemists that Avogadro had been right for forty-seven years. **Psychrometrics** as engineers use it begins with **Willis Carrier**'s paper *Rational Psychrometric Formulae*, presented to the American Society of Mechanical Engineers in **1911** while he worked for the Buffalo Forge Company; the psychrometric chart grew out of it. **Lavoisier and Laplace** measured heats of combustion and of respiration with their ice calorimeter in **1782–1783**, and the systematic use of **standard enthalpies and free energies of formation** owes much to **G. N. Lewis and Merle Randall**'s **1923** *Thermodynamics and the Free Energy of Chemical Substances*, which also popularised Lewis's **fugacity** (1901) and **activity** (1907). **High flame temperatures and dissociation** were studied experimentally by **Mallard and Le Chatelier** in the **1880s**, and **Nernst**'s heat theorem of **1906** made equilibrium constants computable from thermal data alone. **The Zeldovich mechanism** for thermal nitric oxide is due to **Yakov Zeldovich**, published in **1946** from his work on the oxidation of nitrogen in combustion and explosions; the "extended" mechanism with the $\mathrm{N} + \mathrm{OH}$ step was set out by **Lavoie, Heywood and Keck** in **1970**, just as engine-emission regulation began.
:::

## Where this leads

Mixtures and combustion are the chemistry layer under [[thermodynamics/power-cycles]]'s Brayton and Rankine figures and under [[thermodynamics/exergy]]'s chemical-exergy numbers, the boundary condition for every [[heat-transfer]] furnace problem, the inlet gas for [[propulsion]]'s nozzles and [[aerodynamics]]'s high-temperature test sections, and the source of the flue-gas and humidity data that [[manufacturing]]'s dryers and [[energy-systems]]'s boilers are sized on.

::: summary
- A mixture's properties are mole-fraction averages, its gas constant is $R_u / \sum y_i M_i$, and the entropy of each component carries a $-R_u \ln y_i$ term that no other property does.
- $\omega = 0.622\, p_v / (P - p_v)$, the relative humidity uses $p_{\mathrm{sat}}$ at the dry-bulb, and the dew point is $T_{\mathrm{sat}}$ at the vapour's partial pressure — three different temperatures and only two independent properties.
- A cooling coil's latent load sets its leaving temperature: a $3:1$ sensible-to-latent room load at $24\ {}^{\circ}\mathrm{C}$, $50\ \%$ needs a coil leaving at about $10\ {}^{\circ}\mathrm{C}$, not $13\ {}^{\circ}\mathrm{C}$.
- Orsat analyses are dry, the maximum $\mathrm{CO_2}$ is $11.7\ \%$ for methane, and a wet/dry oxygen analyser difference is $16\ \%$ of the reading.
- The HHV exceeds the LHV by $11\ \%$ for methane and $18\ \%$ for hydrogen, and every efficiency figure must name its basis.
- Methane's adiabatic flame temperature in air peaks near $2{,}230\ \mathrm{K}$ at $\phi \approx 1.05$, about $100\ \mathrm{K}$ below the no-dissociation value, and it is a constraint on $\mathrm{NO_x}$ through kinetics.
- A gas turbine combustor at $\phi \approx 0.43$ destroys roughly $28\ \%$ of the fuel's exergy before the turbine starts, and it is the largest destroyer in the plant.
- A condensing economiser's value is set by the network's return temperature and not by the heat exchanger.
:::

::: quiz
A gas boiler's dry flue-gas analysis reads a carbon-dioxide fraction very close to the $11.7\ \%$ maximum for methane. What follows?
- [ ] The excess air is large and the stack loss is high
- [x] The excess air is nearly zero, so carbon monoxide and unburnt hydrocarbons are high and the chimney is at risk of acid attack
- [ ] The boiler is at its optimum efficiency
- [ ] The combustion air is preheated
::: solution
The $11.7\ \%$ figure is the **stoichiometric** maximum, so a reading near it means $\lambda \approx 1.0$. Real gas boilers are run at about $\lambda = 1.10$ to $1.20$, where the dry $\mathrm{CO_2}$ is $9.6$ to $10.6\ \%$, because at the stoichiometric ratio the mixing is never perfect and **part of the fuel leaves as carbon monoxide and unburnt hydrocarbon** — a loss larger than the stack saving — while the flue-gas dew point rises to about $59\ {}^{\circ}\mathrm{C}$. **The optimum is a compromise between a stack loss that rises with excess air and an unburnt loss that falls with it**, and the two curves meet in a flat minimum.
:::
:::

## Exercises

::: exercise Mixture {level=1 check="0.287"}
Give the gas constant in kilojoules per kilogram-kelvin of dry air with $M = 28.97$.
::: solution
$R = 8.31446 / 28.97 = 0.287\ \mathrm{kJ / kg \cdot K}$.
:::
:::

::: exercise Humidity {level=1 check="0.01331"}
Give the humidity ratio of air at $30\ {}^{\circ}\mathrm{C}$ and $50\ \%$ relative humidity at $101.325\ \mathrm{kPa}$, with $p_{\mathrm{sat}} = 4.247\ \mathrm{kPa}$.
::: solution
$\omega = 0.622 \times 2.1235 / 99.20 = 0.01331\ \mathrm{kg / kg\ da}$.
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
$55{,}510 / 50{,}020 = 1.110$.
:::
:::

::: exercise Carbon dioxide {level=1 check="11.7"}
Give the maximum dry carbon-dioxide percentage in the flue gas of methane.
::: solution
$100 / (1 + 7.52) = 11.7\ \%$, at the stoichiometric ratio.
:::
:::

::: exercise Mixed air {level=2}
$3\ \mathrm{kg / s}$ of outside air at $\omega = 0.02145$ is mixed with $9\ \mathrm{kg / s}$ of recirculated air at $\omega = 0.00930$. Give the mixture's humidity ratio.
::: solution
$$
\omega_M = \frac{3 \times 0.02145 + 9 \times 0.00930}{12} = \frac{0.06435 + 0.08370}{12} = 0.01234\ \mathrm{kg / kg\ da}
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
\%\, \mathrm{CO_2} = \frac{100}{1 + 0.103 \times 2 + 3.76 \times 1.103 \times 2} = \frac{100}{9.50} = 10.5\ \%, \qquad
\%\, \mathrm{O_2} = \frac{20.6}{9.50} = 2.2\ \%
$$
against the $10.2\ \%$ and $2.1\ \%$ read. **The analysis is only roughly self-consistent** — the $\mathrm{CO_2}$ is about $0.3$ points low for the $\mathrm{O_2}$. An air leak cannot explain it (diluting with air moves both readings along the same pure-methane line); the usual causes are a mis-calibrated $\mathrm{CO_2}$ cell, incomplete combustion (unmeasured CO), or a fuel that is **not** pure methane.
*Sanity.* A natural gas is typically $85$ to $97\ \%$ methane with ethane, propane and some inerts; the heavier hydrocarbons raise the maximum $\mathrm{CO_2}$ (about $12\ \%$ for a typical gas against $11.7\ \%$ for methane) while nitrogen in the gas lowers it — which is why a boiler's combustion controller should be fed the gas's **Wobbe index and composition** and not an assumed methane.
:::
:::

::: exercise Derivation {level=3}
Derive the wet-bulb relation from the adiabatic saturation energy balance, show why the wet-bulb and thermodynamic wet-bulb temperatures nearly coincide for air-water, and obtain the Lewis relation.
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
\frac{h_c}{h_D \rho c_p} = \left( \frac{\mathrm{Sc}}{\mathrm{Pr}} \right)^{2 / 3} = \left( \frac{0.61}{0.71} \right)^{2 / 3} = 0.859^{2 / 3} = 0.90
$$
(with $h_D$ here a mass-transfer coefficient in $\mathrm{m / s}$; the left side is the psychrometric ratio, and $\mathrm{Sc} / \mathrm{Pr}$ is the Lewis number),
so $h_c / \left( h_D c_{p,m} \right) \approx 1$ and the wet-bulb line is a line of constant **enthalpy-like** quantity,
$$
\omega_1 = \omega_w - \frac{c_{p,m}}{h_{fg} \left( T_w \right)} \left( T_1 - T_w \right)
$$
**which is identical in form to the adiabatic-saturation result.** The comparison of the two gives the coincidence: **the psychrometric ratio is close to unity for air-water** (about $0.9$ from the analogy above, and close to $1$ in measurements on well-ventilated thermometers), so the wet-bulb and adiabatic-saturation temperatures differ by only a few tenths of a kelvin at ordinary conditions.
**The evaluation.** For the $30\ {}^{\circ}\mathrm{C}$, $50\ \%$ state, with $c_{p,m} = 1.005 + 1.86 \times 0.01331 = 1.030$ and $h_{fg} \approx 2{,}449\ \mathrm{kJ / kg}$ near $22\ {}^{\circ}\mathrm{C}$, solve
$$
\omega_{\mathrm{sat}} \left( T_w \right) = 0.01331 + \frac{1.030}{2{,}449} \left( 30 - T_w \right)
$$
by trial: $T_w = 22\ {}^{\circ}\mathrm{C}$ gives $\omega_{\mathrm{sat}} = 0.01667$ against a required $0.01331 + 1.030 \times 8 / 2{,}449 = 0.01668$; $T_w = 21.5$ gives $0.01616$ against $0.01689$, and $T_w = 22.5$ gives $0.01720$ against $0.01647$. **The solution is $T_w = 22.0\ {}^{\circ}\mathrm{C}$**, the value the psychrometric chart gives for the same state.
*Sanity.* The psychrometric ratio is near unity for air-water because the thermal diffusivity of air and the mass diffusivity of water vapour in air are within about $15\ \%$ of each other, and this is a piece of **luck**: the wet-bulb thermometer, the most-used humidity instrument in the world, depends on it. **For the vapours of organic solvents in air the psychrometric ratio is well above unity** (roughly $1.5$ to $2$), and the wet-bulb temperature is then noticeably different from the adiabatic-saturation temperature.
:::
:::

::: exercise Design {level=3}
Specify the combustion, emissions, heat-recovery and instrumentation basis for a $60\ \mathrm{MW_{th}}$ industrial steam boiler firing a variable mixture of natural gas, biogas and hydrogen, with a permit limit of $30\ \mathrm{mg / Nm^{3}}\ \mathrm{NO_x}$ at $3\ \%\ \mathrm{O_2}$.
::: solution
**The fuel and its consequences.**
$$
\begin{array}{l c c c c}
\text{Fuel} & \mathrm{LHV}\ (\mathrm{MJ / Nm^{3}}) & \left( A / F \right)_{\mathrm{vol}} & \text{Max } \mathrm{CO_2}\ \% & T_{\mathrm{flame}} \\
\text{Natural gas (as methane)} & 35.9 & 9.52 & 11.7 & 2{,}225\ \mathrm{K} \\
\text{Biogas, } 65\ \%\ \mathrm{CH_4},\ 35\ \%\ \mathrm{CO_2} & 23.3 & 6.19 & 17.0 & 2{,}125\ \mathrm{K} \\
\text{Hydrogen} & 10.8 & 2.38 & - & 2{,}380\ \mathrm{K} \\
\text{Blend, } 70\ \%\ \text{NG} + 20\ \%\ \text{biogas} + 10\ \%\ \mathrm{H_2} & 30.9 & 8.14 & 12.3 & 2{,}215\ \mathrm{K}
\end{array}
$$
(Stoichiometric adiabatic flame temperatures in air from $298\ \mathrm{K}$.) **The reading.** **The gas volume needed for the same heat varies more than $3 : 1$ across the fuel range** ($35.9 / 10.8$), while the air needed per unit of heat varies by about $17\ \%$, so the burner's air register must hold $\lambda = 1.15$ over a large change in volumetric gas flow — which no fixed-orifice gas train can do and which a **mass-flow-controlled, density-compensated** gas train can.
**The four consequences of hydrogen.**
$$
\begin{array}{l l}
\text{Flame speed} & \text{rises steeply, so a premixed burner can flash back; the burner must be rated for the } \mathrm{H_2}\ \text{fraction} \\
\text{Flame radiance} & \text{a } \mathrm{H_2}\ \text{flame is faint and blue, so the flame scanner's UV element must be backed by a thermocouple} \\
\text{Water in the flue gas} & \text{rises, so the dew point rises and the economiser's material must be reviewed} \\
\text{Thermal } \mathrm{NO_x} & \text{rises with the flame temperature, and the permit limit is the binding constraint}
\end{array}
$$
**The $\mathrm{NO_x}$ basis.** $30\ \mathrm{mg / Nm^{3}}$ at $3\ \%\ \mathrm{O_2}$, expressed as $\mathrm{NO_2}$ ($2.05\ \mathrm{mg / Nm^{3}}$ per ppm), is $14.6\ \mathrm{ppm}$, and a conventional lean-premixed gas burner achieves **$20$ to $30\ \mathrm{ppm}$** — so the limit requires
$$
\begin{array}{l c}
\text{Ultra-lean premixing with staged air} & 12\text{–}18\ \mathrm{ppm} \\
\text{Flue-gas recirculation at } 15\ \% & 8\text{–}12\ \mathrm{ppm} \\
\text{Selective catalytic reduction, secondary} & 3\text{–}5\ \mathrm{ppm}
\end{array}
$$
**The recommendation is premixing plus $15\ \%$ FGR**, which reaches about $10\ \mathrm{ppm}$ at the cost of a recirculation fan's power and a small loss of efficiency.
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
**The four clauses that protect the buyer.** **"THE BURNER SHALL BE FUEL-FLEXIBLE AND GUARANTEED OVER THE FULL WOBBE RANGE OF THE SPECIFIED FUELS, FROM BIOGAS TO NATURAL GAS, WITH UP TO $20\ \%$ HYDROGEN BY VOLUME."** **"THE $\mathrm{NO_x}$ GUARANTEE SHALL BE STATED AT $3\ \%\ \mathrm{O_2}$ AND SHALL BE VERIFIED AT THE MINIMUM AND MAXIMUM WOBBE."** **"THE CONDENSING ECONOMISER MATERIAL SHALL BE SPECIFIED FOR A FLUE-GAS SULFUR CONTENT OF UP TO $30\ \mathrm{mg / Nm^{3}}$ AND A CONDENSATE pH OF $3.5$, AND A NEUTRALISATION UNIT SHALL BE INCLUDED."** **"THE CONTROL SYSTEM SHALL COMPUTE THE AIR SETPOINT FROM THE MEASURED GAS DENSITY AND COMPOSITION AND NOT FROM A FIXED RATIO."**
*Design comment.* The general rule is that **a multi-fuel boiler is a measurement and control project with a pressure vessel attached**, and that a boiler bought on its heat output and tested on pure methane will fail its permit in its second year on a variable biogas supply.
:::
:::
