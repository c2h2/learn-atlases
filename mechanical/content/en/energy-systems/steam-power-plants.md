A steam power plant is a Rankine cycle made large and made real. The idealised cycle of [[thermodynamics/power-cycles]] — pump, boiler, turbine, condenser — is still the skeleton, but a working station wraps it in a furnace that burns a million tonnes of coal a year (or a reactor, or a biomass grate), a turbine with a dozen extraction points, a condenser the size of a house fed by a river or a cooling tower, a chain of feedwater heaters, pumps, fans, mills and scrubbers that themselves eat several per cent of the output, and a control system that must follow the grid's demand. About three-fifths of the fuel energy still leaves as waste heat, and most of that leaves through the condenser.

This chapter takes the plant view. We first build the **efficiency chain** — boiler, cycle, generator, auxiliaries — and the **heat rate**, the number on which plants are bought, sold and dispatched. We then look at the turbine as it really behaves (isentropic efficiency, wet exhaust), derive the mass and energy balances of **open and closed feedwater heaters**, and see why raising steam pressure into the **supercritical** range and adding **reheat** pays. The cold end — **condenser vacuum, cooling-water flow, cooling towers** — gets its own section because it decides how much of the cycle you can actually use. We close with how a **pressurised-water reactor** plant and a **biomass** plant differ from a coal plant, and how plants behave at part load.

Throughout, water properties are from the IAPWS-95 formulation (the source of the steam tables in Çengel & Boles and most other textbooks), evaluated with CoolProp and rounded to the digits shown; enthalpies are in $\mathrm{kJ/kg}$ and entropies in $\mathrm{kJ/(kg\,K)}$. We use the Çengel & Boles sign convention: all heat and work quantities are positive magnitudes, with subscripts *in* and *out* giving the direction.

## The plant and its efficiency chain

Follow one kilogram of water around a coal-fired unit. Condensate leaves the condenser hotwell at about $35$–$45\,^\circ\mathrm{C}$ and a few kilopascals. The **condensate pump** lifts it through several **low-pressure feedwater heaters** into the **deaerator**, an open heater in which it mixes with extraction steam and sheds dissolved oxygen. The **boiler feed pump** then raises it to full pressure — $17\ \mathrm{MPa}$ in a subcritical unit, $25$–$30\ \mathrm{MPa}$ in a supercritical one — and pushes it through **high-pressure heaters**, the **economiser** (flue-gas heated tubes at the back of the boiler), the furnace **water walls** where it boils (or, above the critical pressure, simply heats up without boiling), and the **superheater**. Main steam at $540$–$620\,^\circ\mathrm{C}$ expands through the high-pressure (HP) turbine, returns to the boiler's **reheater**, and expands again through the intermediate- and low-pressure (IP, LP) turbines into the condenser. Along the way, a fifth to a third of the steam is bled off at intermediate pressures to heat the feedwater.

On the gas side, pulverised coal burns with preheated air; the flue gas gives up heat to the water walls, superheater, reheater, economiser and finally the **air preheater**, and leaves through dust collectors and desulphurisation scrubbers at about $120$–$150\,^\circ\mathrm{C}$. Every one of these stages appears in the efficiency.

::: definition Heating value, boiler efficiency and plant efficiency {#def-efficiencies}
The **heating value** of a fuel is the heat released when unit mass burns completely and the products are cooled back to the reactant temperature. It is the **higher heating value** (HHV) when the water in the products is condensed and the **lower heating value** (LHV) when it leaves as vapour; for coal the ratio HHV/LHV is about $1.03$–$1.06$, for natural gas about $1.11$.

The **boiler efficiency** is the fraction of the fuel's heating value that reaches the working fluid:
$$
\eta_\mathrm{b} = \frac{\dot Q_\mathrm{in}}{\dot m_\mathrm{f}\,\mathrm{HV}},
$$
where $\dot Q_\mathrm{in}$ is the heat absorbed by the water and steam (main steam plus reheat) and $\dot m_\mathrm{f}$ is the fuel mass flow.

The **cycle efficiency** is $\eta_\mathrm{c} = \dot W_\mathrm{t,shaft} / \dot Q_\mathrm{in}$, the **generator efficiency** $\eta_\mathrm{g} = \dot W_\mathrm{gross} / \dot W_\mathrm{t,shaft}$ ($\dot W_\mathrm{gross}$ is the electrical output at the generator terminals) and the **auxiliary fraction** $a = \dot W_\mathrm{aux} / \dot W_\mathrm{gross}$ is the share of the gross output consumed by the plant's own pumps, fans, mills and scrubbers. The **net plant efficiency** is
$$
\eta_\mathrm{net} = \frac{\dot W_\mathrm{net}}{\dot m_\mathrm{f}\,\mathrm{HV}},\qquad \dot W_\mathrm{net} = \dot W_\mathrm{gross} - \dot W_\mathrm{aux}.
$$
Every efficiency must say whether it is based on HHV or LHV. European and Asian data are usually LHV; North American utility data (and the US Energy Information Administration) use HHV.
:::

In this chapter the feed-pump work is counted inside the cycle (it is a few per cent of turbine work), so $\eta_\mathrm{c}$ is the net cycle efficiency of [[thermodynamics/power-cycles]] and $a$ covers everything else.

::: proposition The efficiency chain {#prop-chain}
With the definitions of [[#def-efficiencies]],
$$
\eta_\mathrm{net} = \eta_\mathrm{b}\,\eta_\mathrm{c}\,\eta_\mathrm{g}\,(1 - a).
$$ {#eq-chain}
:::

::: proof
The plant is a chain of energy conversions in series, each defined as an output over the input of the same stage. Multiply the definitions:
$$
\eta_\mathrm{b}\,\eta_\mathrm{c}\,\eta_\mathrm{g}\,(1-a) = \frac{\dot Q_\mathrm{in}}{\dot m_\mathrm{f}\mathrm{HV}}\cdot\frac{\dot W_\mathrm{t,shaft}}{\dot Q_\mathrm{in}}\cdot\frac{\dot W_\mathrm{gross}}{\dot W_\mathrm{t,shaft}}\cdot\frac{\dot W_\mathrm{gross}-\dot W_\mathrm{aux}}{\dot W_\mathrm{gross}} = \frac{\dot W_\mathrm{net}}{\dot m_\mathrm{f}\mathrm{HV}}.
$$
The intermediate quantities cancel. The assumptions are steady operation and that each stage's input is exactly the previous stage's output — true by construction if all streams are counted (for example, heat from the auxiliary steam supply or from a separately fired reheater must be included in $\dot Q_\mathrm{in}$, and any electrical aux supplied from outside must be charged against $\dot W_\mathrm{net}$).
:::

The product form explains why plant engineers fight over fractions of a per cent everywhere: a point gained in the boiler is worth as much as a point gained in the turbine. Typical values for a modern coal unit are $\eta_\mathrm{b} \approx 0.88$–$0.94$ (LHV), $\eta_\mathrm{c} \approx 0.45$–$0.50$, $\eta_\mathrm{g} \approx 0.985$–$0.99$, $a \approx 0.04$–$0.08$ (more with flue-gas desulphurisation and carbon capture).

The boiler losses are, in decreasing order: **dry flue-gas loss** (sensible heat of the stack gas — the reason for the economiser and air preheater, and for keeping excess air low), **moisture loss** (latent heat of water from the fuel's hydrogen and moisture, the HHV–LHV difference, plus the heat to evaporate wet fuel), **unburnt carbon** in the ash, and **radiation and convection** from the casing. The stack temperature cannot be pushed much below about $120\,^\circ\mathrm{C}$ in coal plants because sulphuric acid condenses on cold surfaces below its dew point and corrodes the air heater.

::: definition Heat rate {#def-heat-rate}
The **heat rate** is the fuel energy supplied per unit of net electrical energy produced:
$$
\mathrm{HR} = \frac{\dot m_\mathrm{f}\,\mathrm{HV}}{\dot W_\mathrm{net}} = \frac{3600\ \mathrm{kJ/kWh}}{\eta_\mathrm{net}}.
$$ {#eq-hr}
Lower is better. In US practice it is quoted in $\mathrm{Btu/kWh}$ (HHV), with $1\ \mathrm{kWh} = 3412.14\ \mathrm{Btu}$, so $\eta_\mathrm{net} = 3412.14 / \mathrm{HR}_\mathrm{Btu}$.
:::

The heat rate is the natural unit for a plant operator because fuel is bought by energy and electricity sold by the kilowatt-hour: multiply the heat rate by the fuel price per gigajoule and you have the fuel cost per kilowatt-hour; multiply it by the fuel's emission factor (kg of CO₂ per GJ) and you have the carbon intensity. For scale: the US Energy Information Administration's *Electric Power Annual* gives the average operating heat rate of the US coal fleet as $10\,777\ \mathrm{Btu/kWh}$ in 2024 (HHV), that is $\eta_\mathrm{net} = 3412.14/10\,777 = 31.7\,\%$, and $10\,443\ \mathrm{Btu/kWh}$ for nuclear units. The fleet average is dragged down by old subcritical units and by part-load operation; new ultra-supercritical units do markedly better.

::: example A coal unit's efficiency, heat rate and fuel flow {#ex-chain}
A coal unit has boiler efficiency $0.90$, net cycle efficiency $0.45$, generator efficiency $0.985$ and auxiliary consumption $6\,\%$ of gross output, all on an LHV basis. It sends out $600\ \mathrm{MW}$ net. The coal has LHV $25\ \mathrm{MJ/kg}$ and a CO₂ emission factor of $94.6\ \mathrm{kg/GJ}$ (the IPCC 2006 default for bituminous coal on a net-calorific-value basis). Find the net efficiency, the heat rate, the gross output, the coal flow and the CO₂ intensity.
::: solution
By [[#eq-chain]],
$$
\eta_\mathrm{net} = 0.90 \times 0.45 \times 0.985 \times (1 - 0.06) = 0.375 .
$$
Heat rate by [[#eq-hr]]: $\mathrm{HR} = 3600 / 0.375 = 9600\ \mathrm{kJ/kWh}$.

Gross output: $\dot W_\mathrm{gross} = \dot W_\mathrm{net}/(1-a) = 600/0.94 = 638\ \mathrm{MW}$, so the auxiliaries take $38\ \mathrm{MW}$ — the output of a small power station.

Fuel energy rate: $\dot m_\mathrm{f}\,\mathrm{LHV} = 600/0.375 = 1600\ \mathrm{MW}$, so
$$
\dot m_\mathrm{f} = \frac{1600\times10^{3}\ \mathrm{kJ/s}}{25\times10^{3}\ \mathrm{kJ/kg}} = 64.0\ \mathrm{kg/s} = 230\ \mathrm{t/h} \approx 5530\ \mathrm{t/day}.
$$
CO₂ intensity: $9.60\ \mathrm{MJ/kWh} \times 94.6\ \mathrm{g/MJ} = 908\ \mathrm{g/kWh}$.

*Sanity check.* A train of about 55 wagons of 100 t a day for a 600 MW plant is the right order (large coal stations receive several trains a day). The CO₂ intensity of roughly $0.9\ \mathrm{kg/kWh}$ is the familiar figure for coal; a gas combined cycle is about $0.35\ \mathrm{kg/kWh}$, see [[energy-systems/gas-turbines-combined-cycles]].
:::
:::

::: widget plot
f: 3600/((eb/100)*(x/100)*(eg/100)*(1-a/100))
x: 30, 52
y: 6000, 16000
sliders: eb=90:80:95:0.5; eg=98.5:97:99.5:0.1; a=6:2:12:0.5
labels: \mathrm{HR}\ \mathrm{(kJ/kWh)}
hlines: 9600; 11370
title: Net heat rate against cycle efficiency
caption: Net heat rate (kJ/kWh) as a function of the cycle efficiency $\eta_\mathrm{c}$ in per cent, from [[#eq-chain]] and [[#eq-hr]]. The horizontal lines mark $9600\ \mathrm{kJ/kWh}$ ([[#ex-chain]]) and $11\,370\ \mathrm{kJ/kWh}$, the 2024 US coal-fleet average (HHV basis, so not strictly comparable). Move the auxiliary-power slider from 6 to 12 per cent — roughly what adding post-combustion carbon capture does to the electrical aux alone — and see how far right along the curve you must move to recover the heat rate. Notice also that the curve flattens: one point of cycle efficiency is worth about 350 kJ/kWh at $\eta_\mathrm{c}=0.35$ but only about 210 kJ/kWh at $0.45$ (default sliders).
:::

## The turbine as it really behaves

A large steam turbine is a series of stages, each a ring of fixed nozzles followed by a ring of moving blades. The loss mechanisms — friction in the blade passages, leakage over blade tips and through shaft seals, the kinetic energy carried away in the exhaust (the **leaving loss**), and the **wetness loss** in the last LP stages — are lumped into an isentropic efficiency, exactly as in [[thermodynamics/entropy]]:
$$
\eta_\mathrm{t} = \frac{h_\mathrm{in} - h_\mathrm{out}}{h_\mathrm{in} - h_{\mathrm{out},s}},
$$
where $h_{\mathrm{out},s}$ is the enthalpy at the exit pressure and the inlet entropy. Modern large HP and IP sections reach about $0.90$–$0.92$; LP sections, with their wet steam and enormous exhaust volume flows, are lower.

The LP exhaust is wet. Water droplets formed by condensation are dragged along much more slowly than the vapour; the moving blades strike them at nearly the blade speed and are eroded at the leading edge of the last-stage blades, whose tips move at over $500\ \mathrm{m/s}$. A widely used rule of thumb is that each per cent of moisture costs roughly one per cent of stage efficiency (the **Baumann rule**), and designers keep the exhaust wetness below roughly $10$–$12\,\%$ (quality above $0.88$–$0.90$). Wetness is the main reason for reheat in fossil plants and for moisture separators in nuclear plants.

::: example Turbine efficiency and exhaust quality {#ex-turbine}
Steam at $10\ \mathrm{MPa}$, $550\,^\circ\mathrm{C}$ expands to a condenser at $10\ \mathrm{kPa}$. Find the specific work and exit quality for an isentropic turbine and for a turbine with $\eta_\mathrm{t} = 0.87$.
::: solution
Inlet (superheated tables): $h_1 = 3502.0\ \mathrm{kJ/kg}$, $s_1 = 6.7585\ \mathrm{kJ/(kg\,K)}$. At $10\ \mathrm{kPa}$: $T_\mathrm{sat} = 45.81\,^\circ\mathrm{C}$, $h_f = 191.81$, $h_g = 2583.9\ \mathrm{kJ/kg}$, $s_f = 0.6492$, $s_g = 8.1488\ \mathrm{kJ/(kg\,K)}$.

Isentropic exit:
$$
x_{2s} = \frac{s_1 - s_f}{s_g - s_f} = \frac{6.7585 - 0.6492}{8.1488 - 0.6492} = 0.8146, \qquad h_{2s} = 191.81 + 0.8146\times2392.1 = 2140.4\ \mathrm{kJ/kg}.
$$
Isentropic work $w_s = 3502.0 - 2140.4 = 1361.6\ \mathrm{kJ/kg}$, with $18.5\,\%$ moisture.

Real turbine: $w = 0.87 \times 1361.6 = 1184.6\ \mathrm{kJ/kg}$, so $h_2 = 3502.0 - 1184.6 = 2317.4\ \mathrm{kJ/kg}$ and
$$
x_2 = \frac{2317.4 - 191.81}{2392.1} = 0.889 .
$$
*Sanity check.* Irreversibility both lowers the work and *dries* the exhaust: the lost work stays in the steam as enthalpy, so the real exhaust lies to the right of the isentropic point on the $T$–$s$ diagram. The $11\,\%$ moisture of the real expansion is just acceptable; the isentropic estimate would have suggested an unacceptable $18.5\,\%$. Never judge erosion risk from the ideal expansion.
:::
:::

**Reheat** cures wetness at the source: after the HP section the steam returns to the boiler and is reheated to about the main-steam temperature at a fifth to a quarter of the main pressure. The LP expansion then starts from a state of much higher entropy and ends much drier. Reheat also raises the mean temperature of heat addition slightly, and so the efficiency, by a couple of points. Large plants use single reheat; a few use double reheat.

## Feedwater heating

In the simple Rankine cycle the feedwater enters the boiler at condenser temperature, and the first few hundred kilojoules per kilogram are added at a low temperature — the least valuable heat, from the second-law point of view. Regeneration replaces that low-temperature heat with steam bled from the turbine: steam that has already done part of its work gives up its latent heat to the feedwater instead of to the condenser. The mean temperature of external heat addition rises, and the heat rejected at the condenser falls. Every large steam plant has between five and nine feedwater heaters.

There are two kinds.

- An **open** (direct-contact) feedwater heater mixes the bled steam with the feedwater. The outlet is saturated liquid at the heater pressure. Each open heater needs its own pump downstream. In practice one open heater is used, the **deaerator**, which also strips dissolved gases.
- A **closed** feedwater heater is a shell-and-tube heat exchanger ([[heat-transfer/heat-exchangers]]): feedwater at full pump pressure in the tubes, bled steam condensing on the shell side. The two streams never mix, so the feedwater stays at high pressure. The condensed bleed steam (the **drain**) is either **cascaded backward** through a trap or valve to the next lower-pressure heater or the condenser, or **pumped forward** into the feedwater line. The feedwater leaves a few kelvin below the saturation temperature of the bleed steam; this **terminal temperature difference** (TTD) is a design parameter of the heater.

::: proposition Bleed fractions of feedwater heaters {#prop-fwh}
Take steady flow, adiabatic heaters and negligible kinetic and potential energy changes.

(a) **Open heater.** Bled steam of enthalpy $h_b$ and feedwater of enthalpy $h_\mathrm{in}$ mix to give saturated liquid of enthalpy $h_\mathrm{out}$ at the heater pressure. Per unit mass leaving the heater, the bleed fraction is
$$
y = \frac{h_\mathrm{out} - h_\mathrm{in}}{h_b - h_\mathrm{in}} .
$$ {#eq-open}
(b) **Closed heater with drains cascaded backward.** Bled steam of enthalpy $h_b$ leaves as a drain of enthalpy $h_d$ (usually saturated liquid at the heater pressure); the feedwater flow is heated from $h_\mathrm{in}$ to $h_\mathrm{out}$. Per unit mass of feedwater,
$$
y = \frac{h_\mathrm{out} - h_\mathrm{in}}{h_b - h_d} .
$$ {#eq-closed}
:::

::: proof
(a) Control volume around the open heater, outflow $1$ kg. Mass: the inflows are $y$ (bleed steam) and $1-y$ (feedwater). Energy, with no heat or work crossing the boundary:
$$
y\,h_b + (1-y)\,h_\mathrm{in} = 1\cdot h_\mathrm{out} \quad\Longrightarrow\quad y\,(h_b - h_\mathrm{in}) = h_\mathrm{out} - h_\mathrm{in},
$$
which is [[#eq-open]]. Since $h_\mathrm{in} < h_\mathrm{out} < h_b$, $0 < y < 1$.

(b) The closed heater has two separate streams. Feedwater: mass $1$, in at $h_\mathrm{in}$, out at $h_\mathrm{out}$. Steam side: mass $y$, in at $h_b$, out at $h_d$. With no heat loss to the surroundings, the heat lost by the steam equals the heat gained by the feedwater:
$$
y\,(h_b - h_d) = h_\mathrm{out} - h_\mathrm{in},
$$
which is [[#eq-closed]]. If a drain from a higher heater (mass $y'$, enthalpy $h_d'$) also flashes into this shell, its energy $y'(h_d' - h_d)$ is added on the left before solving for $y$.

The compressed feedwater in (b) is not saturated, so $h_\mathrm{in}$ and $h_\mathrm{out}$ come from the compressed-liquid table at the feed pressure (or, to within about $1\,\%$, from $h \approx h_f(T)$ at the same temperature).
:::

The heaters change the mass flow in each part of the turbine, so the energy balance of the whole cycle has to be written with fractions. The bookkeeping is systematic.

::: algorithm Analysing a regenerative steam cycle {#alg-regen}
1. Number every state around the cycle and list the known pressures, temperatures and component efficiencies.
2. Fix the turbine states: inlet $h$, $s$; for each section exit pressure find $h_s$ at the section-inlet entropy, then $h$ from $\eta_\mathrm{t}$. Each section starts from the *actual* state at the end of the previous one.
3. Fix the liquid states: saturated liquid at the condenser and at each open heater, and pump outlets from $w_p = v\,\Delta p/\eta_p$.
4. Choose a basis — usually $1$ kg through the boiler — and solve the heater balances [[#eq-open]] and [[#eq-closed]] in turn, starting from the highest-pressure heater, so that each bleed fraction is known before the heater below it needs it.
5. Turbine work: sum over sections of (mass fraction flowing through that section) × (enthalpy drop). Pump work: sum of (mass fraction pumped) × $w_p$.
6. $q_\mathrm{in}$ = boiler and reheater enthalpy rises for the flows passing through them; $\eta_\mathrm{c} = (w_t - w_p)/q_\mathrm{in}$.
7. Check: the condenser heat $q_\mathrm{out}$ computed directly must equal $q_\mathrm{in} - w_t + w_p$.
:::

::: example One open feedwater heater {#ex-open-fwh}
A plant operates with steam at $15\ \mathrm{MPa}$, $600\,^\circ\mathrm{C}$ and a condenser at $10\ \mathrm{kPa}$. Steam is bled at $1.0\ \mathrm{MPa}$ to an open feedwater heater. Both turbine sections have $\eta_\mathrm{t} = 0.88$ and both pumps $\eta_p = 0.85$. Find the bleed fraction, the cycle efficiency and the steam flow for $300\ \mathrm{MW}$ net cycle output, and compare with the same plant without the heater.
::: solution
States: 1 condenser outlet, 2 after condensate pump, 3 heater outlet, 4 after feed pump, 5 turbine inlet, 6 bleed, 7 turbine exhaust.

*Turbine.* $h_5 = 3583.1\ \mathrm{kJ/kg}$, $s_5 = 6.6796$. At $1.0\ \mathrm{MPa}$ and $s_5$: $h_{6s} = 2820.7$, so $h_6 = 3583.1 - 0.88(3583.1 - 2820.7) = 2912.2\ \mathrm{kJ/kg}$ (slightly superheated, $s_6 = 6.8666$). From state 6 to $10\ \mathrm{kPa}$: $h_{7s} = 2174.9$, so $h_7 = 2912.2 - 0.88(2912.2 - 2174.9) = 2263.4\ \mathrm{kJ/kg}$, $x_7 = 0.866$.

*Liquid side.* $h_1 = h_f(10\ \mathrm{kPa}) = 191.81$, $v_1 = 0.001010\ \mathrm{m^3/kg}$; $w_{p1} = 0.001010(1000-10)/0.85 = 1.18\ \mathrm{kJ/kg}$, $h_2 = 192.98$. $h_3 = h_f(1.0\ \mathrm{MPa}) = 762.5\ \mathrm{kJ/kg}$ ($179.9\,^\circ\mathrm{C}$), $v_3 = 0.001127$; $w_{p2} = 0.001127(15\,000-1000)/0.85 = 18.57\ \mathrm{kJ/kg}$, $h_4 = 781.1\ \mathrm{kJ/kg}$.

*Heater* ([[#eq-open]]):
$$
y = \frac{762.5 - 193.0}{2912.2 - 193.0} = 0.2094 .
$$
*Work and heat* per kg through the boiler:
$$
\begin{aligned}
w_t &= (3583.1 - 2912.2) + (1 - 0.2094)(2912.2 - 2263.4) = 670.9 + 513.0 = 1183.9\ \mathrm{kJ/kg},\\
w_p &= (1-0.2094)(1.18) + 18.57 = 19.5\ \mathrm{kJ/kg},\\
q_\mathrm{in} &= 3583.1 - 781.1 = 2802.1\ \mathrm{kJ/kg},\\
\eta_\mathrm{c} &= \frac{1183.9 - 19.5}{2802.1} = 0.416 .
\end{aligned}
$$
Check: $q_\mathrm{out} = (1-0.2094)(2263.4 - 191.8) = 1637.7$, and $q_\mathrm{in} - w_\mathrm{net} = 2802.1 - 1164.4 = 1637.7\ \mathrm{kJ/kg}$. ✓

Steam flow for $300\ \mathrm{MW}$: $\dot m = 300\,000/1164.4 = 258\ \mathrm{kg/s}$.

*Without the heater* (one pump, $w_p = 0.001010\times14\,990/0.85 = 17.8\ \mathrm{kJ/kg}$, single expansion to $h_7 = 2291.4$): $w_\mathrm{net} = 1273.9\ \mathrm{kJ/kg}$, $q_\mathrm{in} = 3373.5\ \mathrm{kJ/kg}$, $\eta_\mathrm{c} = 0.378$, $\dot m = 235\ \mathrm{kg/s}$.

*Sanity check.* One heater lifts the efficiency by almost four points ($37.8\,\% \to 41.6\,\%$) although the work per kilogram *falls*: the plant needs $10\,\%$ more steam, but the condenser load drops from $235\times2099.6 = 494\ \mathrm{MW}$ to $258\times1637.7 = 422\ \mathrm{MW}$. That is the point of regeneration — less heat thrown away at $46\,^\circ\mathrm{C}$.
:::
:::

How many heaters, and where? With $n$ heaters the efficiency gain grows roughly like $n/(n+1)$ of the gain from ideal infinite regeneration, so the first few heaters give most of the benefit, and the optimum number is set by cost. A classical design rule spaces the heaters for roughly equal feedwater enthalpy rise per heater, with the final feedwater temperature (typically $250$–$300\,^\circ\mathrm{C}$ in large units) chosen in an economic trade against economiser size and stack temperature.

::: warning The bleed fraction is not a fraction of the turbine flow everywhere
After a bleed point, only $1-y$ (or $1 - y_1 - y_2 - \dots$) of the boiler flow continues through the turbine. The most common error is multiplying the LP enthalpy drop by the full boiler flow — which overstates the work and the efficiency — or charging the condensate pump with the full flow. Write the mass fraction next to every section of the turbine and every pump before you add anything up, and close the energy balance (step 7 of [[#alg-regen]]) to catch the slip.
:::

## Higher steam conditions: supercritical and ultra-supercritical

Above the critical point of water ($22.064\ \mathrm{MPa}$, $373.95\,^\circ\mathrm{C}$) there is no boiling: the water in the furnace tubes passes continuously from liquid-like to vapour-like density. A **supercritical** boiler is therefore a once-through boiler with no steam drum, and its feedwater chemistry must be very clean because there is no drum to blow down impurities. The gain is a higher mean temperature of heat addition. The industry labels are rough: **subcritical** (about $16$–$18\ \mathrm{MPa}$, $540\,^\circ\mathrm{C}$), **supercritical** ($24\ \mathrm{MPa}$, $540$–$565\,^\circ\mathrm{C}$) and **ultra-supercritical** (USC, $25$–$30\ \mathrm{MPa}$ with $600\,^\circ\mathrm{C}$ or more); "advanced USC" designs aim at $700\,^\circ\mathrm{C}$ and need nickel-based alloys for the hottest tubes, pipes and rotors. The limit is metallurgical — creep strength and steam-side oxidation of the superheater tubes and main-steam pipe — not thermodynamic.

::: example A supercritical reheat cycle and its heat rate {#ex-usc}
An ultra-supercritical unit takes steam at $25\ \mathrm{MPa}$, $600\,^\circ\mathrm{C}$, expands it in the HP turbine to $4\ \mathrm{MPa}$, reheats it to $600\,^\circ\mathrm{C}$ and expands to $5\ \mathrm{kPa}$. Turbine sections have $\eta_\mathrm{t} = 0.90$, the pump $\eta_p = 0.85$. Ignore feedwater heating. (a) Find the cycle efficiency and the exhaust quality, with and without reheat. (b) With boiler efficiency $0.94$, generator $0.985$ and auxiliaries $5\,\%$, find the net heat rate.
::: solution
(a) $h_1 = 3493.5$, $s_1 = 6.3637$. To $4\ \mathrm{MPa}$: $h_{2s} = 2961.6$, $h_2 = 3493.5 - 0.90(531.9) = 3014.7\ \mathrm{kJ/kg}$ (the "cold reheat" at $319\,^\circ\mathrm{C}$). Reheat: $h_3 = 3674.9$, $s_3 = 7.3705$. To $5\ \mathrm{kPa}$ ($T_\mathrm{sat} = 32.9\,^\circ\mathrm{C}$, $h_f = 137.75$, $h_{fg} = 2423.0$): $h_{4s} = 2247.6$, $h_4 = 3674.9 - 0.90(1427.3) = 2390.3\ \mathrm{kJ/kg}$, $x_4 = 0.930$.

Pump: $w_p = 0.001005\times(25\,000 - 5)/0.85 = 29.6\ \mathrm{kJ/kg}$, $h_6 = 167.3$.
$$
\begin{aligned}
w_t &= (3493.5 - 3014.7) + (3674.9 - 2390.3) = 478.8 + 1284.6 = 1763.3\ \mathrm{kJ/kg},\\
q_\mathrm{in} &= (3493.5 - 167.3) + (3674.9 - 3014.7) = 3326.2 + 660.1 = 3986.3\ \mathrm{kJ/kg},\\
\eta_\mathrm{c} &= \frac{1763.3 - 29.6}{3986.3} = 0.435 .
\end{aligned}
$$
Without reheat (one expansion from state 1 to $5\ \mathrm{kPa}$) the same calculation gives $\eta_\mathrm{c} = 0.412$ and $x = 0.808$: $19\,\%$ moisture, which no LP blade could survive. Reheat is here more about the exhaust than about the efficiency.

(b) $\eta_\mathrm{net} = 0.94\times0.435\times0.985\times0.95 = 0.383$, so $\mathrm{HR} = 3600/0.383 = 9410\ \mathrm{kJ/kWh}$.

*Sanity check.* The single open heater of [[#ex-open-fwh]] added almost four points at lower steam conditions; a full train of eight heaters on this cycle would add more, which is how real USC units reach the mid-forties per cent (LHV) — compared with $31.7\,\%$ (HHV) for the 2024 US coal-fleet average. Both bases and the age of the fleet must be remembered before comparing such numbers.
:::
:::

## The cold end: condenser and cooling

The condenser sets the lower temperature of the cycle and therefore its exhaust pressure. Because the exhaust is a wet mixture, its pressure is the saturation pressure at the condensing temperature, which is fixed by the cooling water: a few kelvin of extra cooling-water temperature become kilopascals of back pressure and megawatts of lost output. A surface condenser is a shell-and-tube exchanger with thousands of titanium or stainless tubes carrying cooling water; exhaust steam condenses on the outside and drains to the hotwell. Air leaking in through the vacuum glands is removed by ejectors or vacuum pumps, because a little non-condensable gas blankets the tubes and ruins heat transfer.

::: proposition Condenser pressure and cooling-water flow {#prop-condenser}
Let cooling water of specific heat $c_p$ enter at $T_\mathrm{cw,in}$ and rise by $\Delta T_\mathrm{cw}$, and let the condensing temperature exceed the cooling-water outlet temperature by the terminal temperature difference $\mathrm{TTD}$. Then for a condenser duty $\dot Q_\mathrm{c}$
$$
\dot m_\mathrm{cw} = \frac{\dot Q_\mathrm{c}}{c_p\,\Delta T_\mathrm{cw}}, \qquad T_\mathrm{c} = T_\mathrm{cw,in} + \Delta T_\mathrm{cw} + \mathrm{TTD}, \qquad p_\mathrm{c} = p_\mathrm{sat}(T_\mathrm{c}),
$$ {#eq-condenser}
and the required surface area is $A = \dot Q_\mathrm{c}/(U\,\Delta T_\mathrm{lm})$ with
$$
\Delta T_\mathrm{lm} = \frac{\Delta T_\mathrm{cw}}{\ln\left[(\Delta T_\mathrm{cw} + \mathrm{TTD})/\mathrm{TTD}\right]}.
$$
:::

::: proof
Steady flow energy equation for the cooling water (no work, negligible kinetic and potential energy changes, incompressible liquid of constant $c_p$): $\dot Q_\mathrm{c} = \dot m_\mathrm{cw}c_p\Delta T_\mathrm{cw}$. On the steam side the exhaust condenses at constant temperature $T_\mathrm{c}$ (pressure drop and subcooling neglected), so the hot-side temperature is uniform; the definition of TTD gives $T_\mathrm{c}$, and a two-phase mixture at $T_\mathrm{c}$ has pressure $p_\mathrm{sat}(T_\mathrm{c})$. For the area, the log-mean temperature difference of [[heat-transfer/heat-exchangers]] uses the end differences $T_\mathrm{c} - T_\mathrm{cw,in} = \Delta T_\mathrm{cw} + \mathrm{TTD}$ and $T_\mathrm{c} - T_\mathrm{cw,out} = \mathrm{TTD}$; with one stream at constant temperature it is the same for any flow arrangement. Assumptions: uniform overall coefficient $U$, no air blanketing, no heat loss.
:::

The condenser duty is not a small correction. In [[#ex-chain]], $1600\ \mathrm{MW}$ of fuel energy gave $\dot Q_\mathrm{in} = 0.90\times1600 = 1440\ \mathrm{MW}$ to the steam and $0.45\times1440 = 648\ \mathrm{MW}$ of shaft work, so the condenser had to reject $1440 - 648 = 792\ \mathrm{MW}$ — more than the net electrical output.

::: example Sizing the condenser and cooling-water system {#ex-condenser}
A $600\ \mathrm{MW}$ unit rejects $750\ \mathrm{MW}$ in its condenser. Cooling water enters at $20\,^\circ\mathrm{C}$ and is allowed a $10\ \mathrm{K}$ rise; the TTD is $5\ \mathrm{K}$ and $U = 3.0\ \mathrm{kW/(m^2\,K)}$. Find the cooling-water flow, the condenser pressure, the surface area and, if instead the water is cooled in a wet cooling tower, the evaporation rate.
::: solution
Flow, with $c_p = 4.18\ \mathrm{kJ/(kg\,K)}$:
$$
\dot m_\mathrm{cw} = \frac{750\,000}{4.18\times10} = 17\,900\ \mathrm{kg/s} \approx 18\ \mathrm{m^3/s},
$$
a medium-sized river. Condensing temperature $T_\mathrm{c} = 20 + 10 + 5 = 35\,^\circ\mathrm{C}$, so $p_\mathrm{c} = p_\mathrm{sat}(35\,^\circ\mathrm{C}) = 5.63\ \mathrm{kPa}$ — about one-eighteenth of an atmosphere.

Area: $\Delta T_\mathrm{lm} = 10/\ln(15/5) = 9.10\ \mathrm{K}$, so $A = 750\,000/(3.0\times9.10) = 27\,500\ \mathrm{m^2}$, roughly four football pitches of tube surface.

Cooling tower: if all the heat left as latent heat of evaporation at about $30\,^\circ\mathrm{C}$ ($h_{fg} = 2430\ \mathrm{kJ/kg}$), the evaporation would be $750\,000/2430 = 309\ \mathrm{kg/s}$. In practice $10$–$25\,\%$ of the heat leaves as sensible heat of the air, so the loss is somewhat less, about $0.25\ \mathrm{m^3/s}$.

*Sanity check.* Evaporative cooling needs about one sixtieth of the flow that once-through cooling needs ($309$ against $17\,900\ \mathrm{kg/s}$), because a kilogram of water evaporated carries away about $58$ times as much heat as a kilogram warmed by $10\ \mathrm{K}$ ($2430/41.8$). That ratio is why inland plants use towers.
:::
:::

::: widget plot
f: 0.133322*10^(8.07131 - 1730.63/(233.426 + x + dT + ttd))
x: 0, 35
y: 0, 15
sliders: dT=10:5:15:0.5; ttd=5:2:10:0.5
labels: p_\mathrm{c}\ \mathrm{(kPa)}
title: Condenser pressure against cooling-water inlet temperature
caption: Condenser pressure (kPa) from [[#eq-condenser]] as a function of the cooling-water inlet temperature (°C), with the saturation pressure from an Antoine fit (constants from Lange's *Handbook of Chemistry*, valid 1–100 °C, within 1 % of IAPWS-95). Move the inlet temperature from a winter 10 °C to a summer 30 °C with the default 10 K rise and 5 K TTD: the back pressure more than doubles. Then cut the TTD (a bigger, cleaner condenser) or the rise (more pumping) and watch how much each buys. The curve steepens with temperature because $p_\mathrm{sat}$ is nearly exponential in $T$.
:::

How much does back pressure cost? For the wet exhaust, the Gibbs relation $\mathrm{d}h = T\,\mathrm{d}s + v\,\mathrm{d}p$ along an isentrope gives $\mathrm{d}h = v\,\mathrm{d}p$, and the specific volume of the exhaust is huge — about $25\ \mathrm{m^3/kg}$ at $5\ \mathrm{kPa}$. So a rise of the condenser pressure from $5$ to $10\ \mathrm{kPa}$ removes nearly $90\ \mathrm{kJ/kg}$ of isentropic work from the last stages ([[#exr-backpressure]]), several per cent of the plant output. The same huge volume is why LP turbines have several double-flow exhausts and last-stage blades over a metre long.

Where water is scarce, plants use **dry cooling**: air-cooled condensers in which steam condenses inside finned tubes cooled by fans. The air-side coefficient is low and the air temperature rise must be large, so the condensing temperature is typically 15–25 K higher than with a wet tower on a hot day; the plant pays in efficiency what it saves in water. Once-through cooling, in turn, is constrained by the permitted temperature rise of the river or sea and by fish protection at the intake.

::: quiz
On a hot summer afternoon a coal unit's output falls although the boiler is firing at full rate. Which explanation is right?
- [ ] The boiler efficiency falls because the combustion air is warmer.
- [x] Warmer cooling water raises the condensing temperature and hence the exhaust pressure, which removes work from the last LP stages.
- [ ] The feedwater heaters bleed more steam on hot days.
- [ ] Hot air reduces the generator efficiency by more than a few per cent.
::: solution
The exhaust pressure is the saturation pressure at the condensing temperature, $T_\mathrm{c} = T_\mathrm{cw,in} + \Delta T_\mathrm{cw} + \mathrm{TTD}$. A $10\ \mathrm{K}$ rise in cooling-water temperature roughly doubles the back pressure at these temperatures, and since $\mathrm{d}h = v\,\mathrm{d}p$ along the expansion with $v \approx 15$–$25\ \mathrm{m^3/kg}$, the LP turbine loses tens of kJ per kilogram. Warmer combustion air actually helps the boiler slightly; the feedwater heaters and the generator are not the main effect.
:::
:::

## Nuclear and biomass plants

A **pressurised-water reactor** (PWR) keeps its primary coolant liquid at about $15.5\ \mathrm{MPa}$ and roughly $290$–$325\,^\circ\mathrm{C}$. That water heats the secondary circuit in **steam generators**, which can only produce steam below the primary temperature: nearly **saturated steam at about $6$–$7\ \mathrm{MPa}$** ($275$–$285\,^\circ\mathrm{C}$). The low steam temperature has three consequences. The cycle efficiency is lower than in a fossil plant. The expansion enters the wet region almost at once, so the HP turbine itself runs wet. And the volume flow is enormous for the power, so nuclear turbines are among the largest machines built, and many run at half speed (1500 or 1800 rpm) to keep the LP blades within their stress limits. To control wetness, the steam leaving the HP turbine passes through a **moisture separator reheater** (MSR): chevron separators drain the liquid, and tube bundles heated by live steam superheat the remaining vapour before it enters the LP turbines. A **boiling-water reactor** (BWR) boils water in the core and sends saturated steam at about $7\ \mathrm{MPa}$ directly to the turbine, with similar thermodynamics.

::: example A PWR secondary cycle and its moisture problem {#ex-pwr}
Saturated steam at $6.9\ \mathrm{MPa}$ feeds a turbine exhausting to $7\ \mathrm{kPa}$; turbine sections $\eta_\mathrm{t} = 0.85$, pump $\eta_p = 0.85$, no feedwater heating. (a) Find the efficiency and exhaust quality for a single expansion. (b) Now expand in the HP turbine to $1.0\ \mathrm{MPa}$, separate the liquid (drain it to the condenser), reheat the vapour to $250\,^\circ\mathrm{C}$ with live steam, and expand to $7\ \mathrm{kPa}$. Find the efficiency and exhaust quality, per kilogram of steam generated.
::: solution
At $6.9\ \mathrm{MPa}$: $T_\mathrm{sat} = 284.9\,^\circ\mathrm{C}$, $h_1 = h_g = 2773.9$, $s_1 = 5.8220$. At $7\ \mathrm{kPa}$: $T_\mathrm{sat} = 39.0\,^\circ\mathrm{C}$, $h_f = 163.35$, $h_{fg} = 2408.4$. Pump: $w_p = 0.001008\times(6900 - 7)/0.85 = 8.2\ \mathrm{kJ/kg}$; $h_\mathrm{fw} = 171.5$.

(a) $h_{2s} = 1806.2$, $h_2 = 2773.9 - 0.85(967.7) = 1951.3\ \mathrm{kJ/kg}$, $x_2 = (1951.3 - 163.35)/2408.4 = 0.742$.
$$
\eta = \frac{(2773.9 - 1951.3) - 8.2}{2773.9 - 171.5} = \frac{814.4}{2602.4} = 0.313 .
$$
$26\,\%$ moisture in the exhaust: impossible in practice.

(b) HP: $h_{ms} = 2482.8$ at $1.0\ \mathrm{MPa}$, $x = 0.854$. The separator keeps $0.854$ kg of vapour ($h_g = 2777.1$). Reheat to $250\,^\circ\mathrm{C}$: $h_r = 2943.1$, $s_r = 6.9265$; heat supplied $0.854\times(2943.1 - 2777.1) = 141.8\ \mathrm{kJ}$. LP: $h_{Ls} = 2151.0$, so $h_L = 2943.1 - 0.85(2943.1 - 2151.0) = 2269.8\ \mathrm{kJ/kg}$, $x_L = 0.875$.
$$
\begin{aligned}
w_t &= 291.1 + 0.854\times(2943.1 - 2269.8) = 291.1 + 575.0 = 866.1\ \mathrm{kJ},\\
q_\mathrm{in} &= 2602.4 + 141.8 = 2744.2\ \mathrm{kJ},\qquad \eta = \frac{866.1 - 8.2}{2744.2} = 0.313 .
\end{aligned}
$$
*Sanity check.* The efficiency is unchanged to three figures — reheating with live steam at $285\,^\circ\mathrm{C}$ adds heat at a temperature no higher than the cycle already uses — but the exhaust moisture falls from $26\,\%$ to $12.5\,\%$. The MSR is a blade-protection device, not an efficiency device. With feedwater heating, real PWR units reach net efficiencies of about $33$–$37\,\%$, against $40$–$47\,\%$ for modern coal units.
:::
:::

**Biomass** plants burn wood chips, pellets, straw or residues on grates or in fluidised beds. The thermodynamics is the same as for coal, but the fuel sets the limits: wet fuel lowers the boiler efficiency (moisture loss), units are small (tens of megawatts, where every percentage point of auxiliary power matters more), and alkali chlorides from straw and some woods cause fouling and severe corrosion of superheater tubes above roughly $500$–$540\,^\circ\mathrm{C}$. Biomass steam conditions are therefore modest and efficiencies lower than in a large coal unit; many biomass plants instead run as combined heat and power, where the low-temperature heat is sold rather than rejected. Large coal units converted to burn wood pellets keep most of their efficiency but lose some output.

## Operation at part load

A plant designed for full load spends much of its life below it. The main control strategies are **throttling** (constant boiler pressure, steam throttled at the turbine inlet valves — fast response but a loss of available work across the valves), **nozzle-group (partial-arc) admission** (only some inlet nozzle arcs open) and **sliding pressure** (valves wide open and the boiler pressure reduced with load — the turbine inlet temperature stays near design and feed-pump power falls, but the response is slower because the boiler's stored energy must change). Modern once-through units usually combine sliding pressure with a small throttle reserve for frequency response. Part-load heat rate rises because pressure ratios fall, auxiliary power is a larger fraction of output, and stack losses rise; a unit at half load may need several per cent more fuel per kWh than at full load. The fleet averages quoted earlier include this effect, which is one reason why operating heat rates exceed the full-load test values.

::: remark Safety
Steam plants contain fluids at up to $30\ \mathrm{MPa}$ and $600\,^\circ\mathrm{C}$, rotating machinery with blade tips at supersonic speeds and furnaces full of combustible dust. Boilers, steam piping and pressure parts are designed, inspected and operated to codes such as the ASME Boiler and Pressure Vessel Code (Section I) or EN 12952, by qualified people. This chapter teaches the principles behind such designs; none of its examples is a design.
:::

::: history
Thomas Edison's Pearl Street Station in New York began supplying electricity in September 1882, with reciprocating steam engines driving dynamos. In 1884 Charles Parsons, then a junior partner at Clarke, Chapman and Co. in Gateshead, built the first steam turbine-generator, an experimental multi-stage reaction machine running at $18\,000\ \mathrm{rpm}$ and producing about $7.5\ \mathrm{kW}$; it is preserved by the Science Museum Group in London. The steam turbine soon displaced reciprocating engines in central stations because it could be built far larger. In 1957 American Electric Power's Philo Unit 6 near Zanesville, Ohio — 120–125 MW, $31\ \mathrm{MPa}$ (4500 psi) and $621\,^\circ\mathrm{C}$ (1150 °F) — became the first supercritical-pressure unit in commercial service; Philadelphia Electric's Eddystone Unit 1 followed in 1960 at $34.5\ \mathrm{MPa}$ and $650\,^\circ\mathrm{C}$ with two reheats, steam conditions that were not routinely matched for decades because of materials problems. Both are ASME Historic Mechanical Engineering Landmarks (nos. 228 and 226). The Shippingport Atomic Power Station in Pennsylvania, the first full-scale pressurised-water-reactor power plant, delivered its first power to the grid in December 1957.
:::

::: summary
- Net plant efficiency is the product of boiler, cycle, generator and auxiliary factors, [[#eq-chain]]; the heat rate $3600/\eta_\mathrm{net}$ in kJ/kWh is the industry's measure. Always state HHV or LHV.
- The turbine's isentropic efficiency lowers the work but dries the exhaust; LP exhaust wetness must be kept below about 10–12 %, which is what reheat (fossil) and moisture separator reheaters (nuclear) are for.
- Feedwater heaters raise the mean temperature of heat addition. Bleed fractions follow from adiabatic mass and energy balances, [[#eq-open]] and [[#eq-closed]]; account for the reduced flow after each bleed.
- Supercritical and ultra-supercritical units (25–30 MPa, 600 °C and above) gain efficiency through higher mean heat-addition temperature; the limit is materials.
- The condenser pressure is $p_\mathrm{sat}$ at the cooling-water inlet temperature plus its rise plus the TTD, [[#eq-condenser]]; back pressure costs work because the exhaust volume is enormous. Wet cooling towers evaporate about one-sixtieth of the once-through flow.
- PWR plants raise saturated steam at about 6–7 MPa and are less efficient (33–37 %) than modern coal units; biomass plants are limited by fuel moisture and corrosion.
:::

## Exercises

::: exercise Heat rate to efficiency {#exr-hr level=1 check="40"}
A plant's net heat rate is $9000\ \mathrm{kJ/kWh}$. What is its net efficiency? (Enter the efficiency in per cent, to the nearest whole number.)
::: solution
$\eta_\mathrm{net} = 3600/9000 = 0.400$, i.e. $40.0\,\%$ on whatever heating-value basis the heat rate was quoted.
:::
:::

::: exercise Coal consumption {#exr-coal level=1 check="46.3"}
A $400\ \mathrm{MW}$ (net) unit has net efficiency $36\,\%$ (LHV) and burns coal with LHV $24\ \mathrm{MJ/kg}$. Find the coal mass flow. (Enter the flow in kg/s, to one decimal place.)
::: solution
Fuel energy rate $400/0.36 = 1111\ \mathrm{MW}$; $\dot m_\mathrm{f} = 1111\times10^{3}/24\times10^{3} = 46.3\ \mathrm{kg/s}$ ($167\ \mathrm{t/h}$).
:::
:::

::: exercise Condenser pressure {#exr-pc level=1 check="28"}
Cooling water enters a condenser at $15\,^\circ\mathrm{C}$ and rises by $9\ \mathrm{K}$; the TTD is $4\ \mathrm{K}$. What is the condensing temperature, and what condenser pressure does it imply? (Enter the condensing temperature in °C.)
::: solution
$T_\mathrm{c} = 15 + 9 + 4 = 28\,^\circ\mathrm{C}$, so $p_\mathrm{c} = p_\mathrm{sat}(28\,^\circ\mathrm{C}) = 3.78\ \mathrm{kPa}$ (IAPWS-95; linear interpolation between the $25$ and $30\,^\circ\mathrm{C}$ entries of a 5-K table gives $3.70\ \mathrm{kPa}$ — the saturation curve is strongly convex, so interpolate in $\ln p$ or use a finer table).
:::
:::

::: exercise Exhaust quality of a real turbine {#exr-quality level=2 check="0.884"}
Steam at $12.5\ \mathrm{MPa}$, $550\,^\circ\mathrm{C}$ expands to $10\ \mathrm{kPa}$ in a turbine with isentropic efficiency $0.85$. Find the exhaust quality. (Enter $x$ as a fraction, to three decimal places.)
::: solution
Inlet: $h_1 = 3476.5\ \mathrm{kJ/kg}$, $s_1 = 6.6317$. Isentropic exit at $10\ \mathrm{kPa}$: $x_{2s} = (6.6317 - 0.6492)/7.4996 = 0.7977$, $h_{2s} = 191.81 + 0.7977\times2392.1 = 2100.0\ \mathrm{kJ/kg}$. Actual: $h_2 = 3476.5 - 0.85(3476.5 - 2100.0) = 2306.4\ \mathrm{kJ/kg}$, so
$$
x_2 = \frac{2306.4 - 191.81}{2392.1} = 0.884 .
$$
$11.6\,\%$ moisture: at the limit, which is why such a plant would use reheat.
:::
:::

::: exercise A closed feedwater heater {#exr-closed level=2 check="0.114"}
Steam bled at $2\ \mathrm{MPa}$ with $h_b = 3010\ \mathrm{kJ/kg}$ enters a closed feedwater heater and leaves as saturated liquid at $2\ \mathrm{MPa}$, the drain being cascaded backward. Feedwater at $15\ \mathrm{MPa}$ enters at $150\,^\circ\mathrm{C}$ and leaves at $205\,^\circ\mathrm{C}$. Find the bleed mass per kilogram of feedwater, and the heater's TTD. Use compressed-liquid enthalpies for the feedwater. (Enter the bleed fraction, to three decimal places.)
::: solution
Compressed liquid at $15\ \mathrm{MPa}$: $h_\mathrm{in} = 641.3\ \mathrm{kJ/kg}$ ($150\,^\circ\mathrm{C}$), $h_\mathrm{out} = 880.2\ \mathrm{kJ/kg}$ ($205\,^\circ\mathrm{C}$). Drain: $h_d = h_f(2\ \mathrm{MPa}) = 908.5\ \mathrm{kJ/kg}$, $T_\mathrm{sat} = 212.4\,^\circ\mathrm{C}$. By [[#eq-closed]],
$$
y = \frac{880.2 - 641.3}{3010 - 908.5} = \frac{238.9}{2101.5} = 0.114 .
$$
TTD $= 212.4 - 205 = 7.4\ \mathrm{K}$. (Using $h_f$ at $150$ and $205\,^\circ\mathrm{C}$ instead of compressed-liquid values gives $y = 0.113$ — the approximation is good.)
:::
:::

::: exercise Cooling-tower make-up {#exr-tower level=2 check="527"}
A plant rejects $1200\ \mathrm{MW}$ through a wet cooling tower. Assume $80\,\%$ of the heat leaves by evaporation with $h_{fg} = 2430\ \mathrm{kJ/kg}$. To limit the build-up of dissolved salts, the tower is operated at 4 **cycles of concentration**, which means the blowdown $B$ is related to the evaporation $E$ by $B = E/(C - 1)$ with $C = 4$ (drift neglected). Find the make-up water flow $E + B$. (Enter the flow in kg/s, to the nearest whole number.)
::: solution
$E = 0.8\times1\,200\,000/2430 = 395\ \mathrm{kg/s}$; $B = 395/3 = 132\ \mathrm{kg/s}$; make-up $= 527\ \mathrm{kg/s}$, about $0.53\ \mathrm{m^3/s}$ or $45\,000\ \mathrm{m^3}$ a day. The salt balance behind the formula: make-up brings salts at concentration $c_0$, only blowdown removes them at $C c_0$, so $(E + B)c_0 = B\,C c_0$.
:::
:::

::: exercise The cost of back pressure {#exr-backpressure level=3 check="88.5"}
(a) Show from $\mathrm{d}h = T\,\mathrm{d}s + v\,\mathrm{d}p$ that the isentropic work lost in the last stages when the condenser pressure rises from $p_1$ to $p_2$ is $\Delta w_s = \int_{p_1}^{p_2} v\,\mathrm{d}p$ along the isentrope. (b) For wet steam at low pressure, $pv$ is nearly constant along an isentrope. Show that then $\Delta w_s \approx (pv)\ln(p_2/p_1)$. (c) On the isentrope $s = 7.4\ \mathrm{kJ/(kg\,K)}$ the steam tables give $v = 24.65\ \mathrm{m^3/kg}$ at $5\ \mathrm{kPa}$ and $v = 13.21\ \mathrm{m^3/kg}$ at $10\ \mathrm{kPa}$. Using the mean of the two $pv$ products, estimate the lost work for a rise from $5$ to $10\ \mathrm{kPa}$. (Enter $\Delta w_s$ in kJ/kg, to one decimal place.)
::: solution
(a) On an isentrope $\mathrm{d}s = 0$, so $\mathrm{d}h = v\,\mathrm{d}p$. The exit enthalpy rises by $\int v\,\mathrm{d}p$ when the exit pressure rises, and the inlet state is unchanged, so the isentropic work falls by the same amount.

(b) With $v = (pv)/p$ and $pv$ constant, $\int_{p_1}^{p_2} (pv)\,\mathrm{d}p/p = (pv)\ln(p_2/p_1)$.

(c) $p v = 5\times24.65 = 123.25\ \mathrm{kJ/kg}$ and $10\times13.21 = 132.10\ \mathrm{kJ/kg}$ (kPa × m³/kg = kJ/kg); mean $127.68\ \mathrm{kJ/kg}$. Then $\Delta w_s \approx 127.68\ln 2 = 88.5\ \mathrm{kJ/kg}$. The exact difference of table enthalpies is $2345.0 - 2256.6 = 88.4\ \mathrm{kJ/kg}$. (The trapezoidal rule on $v$ itself gives $94.6$: $v$ is far from linear in $p$.) For a turbine of $0.88$ efficiency and $250\ \mathrm{kg/s}$ of exhaust that is about $19\ \mathrm{MW}$.
:::
:::

::: exercise Bleed fraction from the energy balance of the whole plant {#exr-derive level=3}
For the cycle of [[#ex-open-fwh]], show that the efficiency can be written $\eta_\mathrm{c} = 1 - (1-y)(h_7 - h_1)/(h_5 - h_4)$, and use it to explain, without numbers, why bleeding steam always lowers the condenser heat per kilogram of boiler flow but raises the condenser heat per kilogram of *condensate* not at all.
::: solution
Energy balance of the whole cycle (steady, adiabatic except boiler and condenser): $w_\mathrm{net} = q_\mathrm{in} - q_\mathrm{out}$, with $q_\mathrm{in} = h_5 - h_4$ per kg of boiler flow and $q_\mathrm{out} = (1-y)(h_7 - h_1)$ because only $1-y$ reaches the condenser. Dividing, $\eta_\mathrm{c} = 1 - (1-y)(h_7 - h_1)/(h_5 - h_4)$. Per kilogram of condensate the rejected heat is $h_7 - h_1$, fixed by the exhaust state and the condenser pressure, regardless of $y$. Bleeding reduces the fraction $1-y$ that is condensed and raises $h_4$ (less heat to add), and the gain in efficiency comes from the ratio of these two effects: the bled steam returns its latent heat to the cycle instead of to the condenser.
:::
:::

::: exercise Choosing the cooling system for an inland site {#exr-design level=3}
A $500\ \mathrm{MW}$ (net) biomass-and-coal co-firing unit is planned at an inland site where the river can supply at most $0.5\ \mathrm{m^3/s}$ in a dry summer and the summer air reaches $35\,^\circ\mathrm{C}$ (wet-bulb $24\,^\circ\mathrm{C}$). Compare once-through cooling, a wet cooling tower and an air-cooled condenser. Estimate the water need of each and the likely summer condenser pressure, and recommend a scheme. State your assumptions.
::: solution
One reasonable answer. Take $\eta_\mathrm{net} = 0.38$ and assume that about $85\,\%$ of the losses other than stack and boiler losses go to the condenser, giving a condenser duty of roughly $650\ \mathrm{MW}$.

*Once-through* with a $10\ \mathrm{K}$ rise: $650\,000/(4.18\times10) \approx 15\,600\ \mathrm{kg/s}$, thirty times the available flow. Excluded.

*Wet tower*: the cold-water temperature is set by the wet bulb plus the tower's approach, about $24 + 6 = 30\,^\circ\mathrm{C}$; with a $10\ \mathrm{K}$ range and $5\ \mathrm{K}$ TTD, $T_\mathrm{c} = 45\,^\circ\mathrm{C}$ and $p_\mathrm{c} \approx 9.6\ \mathrm{kPa}$. Evaporation $\approx 0.8\times650\,000/2420 \approx 215\ \mathrm{kg/s}$; with 4 cycles of concentration the make-up is about $290\ \mathrm{kg/s} = 0.29\ \mathrm{m^3/s}$, within the river limit but taking most of it in a drought.

*Air-cooled condenser*: initial temperature difference (condensing minus dry-bulb) of about $20$–$25\ \mathrm{K}$ gives $T_\mathrm{c} \approx 55$–$60\,^\circ\mathrm{C}$, $p_\mathrm{c} \approx 16$–$20\ \mathrm{kPa}$, essentially no water, but perhaps $5$–$8\,\%$ less summer output (use the $\int v\,\mathrm{d}p$ estimate of [[#exr-backpressure]]), a much larger and costlier condenser, and fan power of about $1\,\%$ of output.

*Recommendation*: a hybrid (parallel wet–dry) system, or a wet tower with permission to switch partly to dry operation in drought, balances the water constraint against summer output. A full answer would quantify the lost energy per year with the site's temperature distribution and compare it with the capital costs.
:::
:::

::: exercise CO₂ intensity from the heat rate {#exr-co2 level=1 check="908"}
A coal unit has a net heat rate of $9600\ \mathrm{kJ/kWh}$ (LHV). Its coal emits $94.6\ \mathrm{kg}$ of CO₂ per GJ of LHV. Find the CO₂ emitted per kWh sent out. (Enter the intensity in g/kWh, to the nearest whole number.)
::: solution
$9600\ \mathrm{kJ/kWh} = 9.6\ \mathrm{MJ/kWh}$; $9.6\times94.6\ \mathrm{g/MJ} = 908\ \mathrm{g/kWh}$. Halving the CO₂ per kWh would need either a heat rate of $4800\ \mathrm{kJ/kWh}$ ($75\,\%$ efficiency, impossible for a steam cycle) or a lower-carbon fuel.
:::
:::
