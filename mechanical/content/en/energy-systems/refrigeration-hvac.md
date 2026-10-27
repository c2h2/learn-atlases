A refrigerator does something that no heat flow does by itself: it takes heat out of a cold space and dumps it into a warmer one. The second law says this costs work, and the art of refrigeration is to pay as little work as possible for each kilojoule moved. The same machine, looked at from its hot side, is a heat pump — a way of heating a building with two to four times more heat than the electricity it consumes. And once the cold coil of such a machine is placed in a stream of air, it not only cools the air but also condenses water out of it, which is why air conditioning is half thermodynamics of refrigerants and half thermodynamics of moist air.

This chapter treats both halves. It starts with the reversed Carnot cycle, which sets the ceiling on the coefficient of performance, then builds the vapour-compression cycle that almost every refrigerator, air conditioner and heat pump uses — first ideal, then with superheat, subcooling and a real compressor — and discusses how refrigerants are chosen now that ozone depletion and global warming constrain the choice. A short section covers absorption machines, which are driven by heat instead of work. The second half develops psychrometrics — humidity ratio, relative humidity, dew point, wet-bulb temperature and the enthalpy of moist air — and applies mass and energy balances to the processes of an air-conditioning system, ending with a cooling-load estimate for an office. It assumes the entropy and cycle analysis of [[thermodynamics/entropy]] and [[thermodynamics/power-cycles]] and the ideal-gas mixtures of [[thermodynamics/mixtures-combustion]].

**Property data.** Refrigerant properties in this chapter are computed from the reference equations of state implemented in CoolProp (for R-134a, the Tillner-Roth–Baehr equation), with the **IIR enthalpy reference**: $h = 200\,\mathrm{kJ/kg}$ and $s = 1\,\mathrm{kJ/(kg\,K)}$ for saturated liquid at $0\,^\circ\mathrm{C}$. Çengel & Boles's R-134a tables use the ASHRAE reference ($h = s = 0$ for saturated liquid at $-40\,^\circ\mathrm{C}$), so their absolute values differ from ours by a constant, but every enthalpy *difference* — which is all a cycle analysis uses — agrees. Never mix the two references in one calculation. Water vapour pressures are from IAPWS-95.

## The reversed Carnot cycle and the coefficient of performance {#sec-carnot}

A refrigerator and a heat pump are the same device used for different purposes. Both absorb heat $Q_L$ from a low-temperature region at $T_L$, receive work $W$, and reject heat $Q_H = Q_L + W$ to a high-temperature region at $T_H$. For a refrigerator the useful output is $Q_L$; for a heat pump it is $Q_H$.

::: definition Coefficient of performance {#def-cop}
For a cyclic device absorbing heat $Q_L$ at low temperature, rejecting $Q_H$ at high temperature and consuming net work $W_\text{in} = Q_H - Q_L$,
$$
\mathrm{COP}_R = \frac{Q_L}{W_\text{in}}, \qquad \mathrm{COP}_{HP} = \frac{Q_H}{W_\text{in}} .
$$
The same ratios hold for rates ($\dot Q_L$, $\dot Q_H$, $\dot W_\text{in}$). Refrigeration capacity is quoted in kilowatts; in North American practice also in **tons of refrigeration**, $1\,\text{ton} = 12\,000\,\mathrm{Btu/h} = 3.517\,\mathrm{kW}$ (the rate of heat absorption that melts a short ton of ice in a day). The COP is not an efficiency: it is usually greater than one, because the device moves heat rather than converting it.
:::

::: proposition Carnot limits on the COP {#prop-carnot-cop}
For any refrigerator or heat pump operating between reservoirs at absolute temperatures $T_L < T_H$,
$$
\mathrm{COP}_R \le \frac{T_L}{T_H - T_L}, \qquad \mathrm{COP}_{HP} \le \frac{T_H}{T_H - T_L},
$$ {#eq-carnot-cop}
with equality for a reversible device, and for every device (reversible or not) $\mathrm{COP}_{HP} = \mathrm{COP}_R + 1$.
:::

::: proof
The first law over a cycle gives $W_\text{in} = Q_H - Q_L$, so $\mathrm{COP}_{HP} = Q_H/W_\text{in} = (Q_L + W_\text{in})/W_\text{in} = \mathrm{COP}_R + 1$ for any device. The second law, as the entropy balance over one cycle with heat exchanged only with the two reservoirs, reads
$$
S_\text{gen} = \frac{Q_H}{T_H} - \frac{Q_L}{T_L} \ge 0 ,
$$
because the working fluid returns to its initial state (no net entropy change) while the hot reservoir gains $Q_H/T_H$ and the cold one loses $Q_L/T_L$. Hence $Q_H/Q_L \ge T_H/T_L$ and
$$
\mathrm{COP}_R = \frac{Q_L}{Q_H - Q_L} = \frac{1}{Q_H/Q_L - 1} \le \frac{1}{T_H/T_L - 1} = \frac{T_L}{T_H - T_L},
$$
with equality when $S_\text{gen} = 0$. Adding one gives the heat-pump bound. The assumptions: steady cyclic operation, heat exchanged only at the two reservoir temperatures (so in a real machine $T_L$ and $T_H$ should be the temperatures of the spaces, not of the refrigerant), and temperatures in kelvin.
:::

Two consequences shape everything that follows. First, the COP depends on the **temperature lift** $T_H - T_L$, not on the temperatures themselves: a freezer working across $45\,\mathrm{K}$ is intrinsically worse than an air conditioner working across $20\,\mathrm{K}$. Second, every kelvin of extra lift costs a few per cent of COP — so every kelvin of temperature difference in the evaporator and condenser, which the refrigerant needs to exchange heat at a finite rate, is paid for in compressor power.

::: example Carnot limits for a domestic freezer and heat pump {#ex-carnot}
(a) A freezer holds $-18\,^\circ\mathrm{C}$ in a kitchen at $25\,^\circ\mathrm{C}$. What is the highest possible COP? (b) A heat pump delivers heat to a house at $25\,^\circ\mathrm{C}$ from outdoor air at $-18\,^\circ\mathrm{C}$. What is its highest possible COP?
::: solution
(a) $T_L = 255.15\,\mathrm{K}$, $T_H = 298.15\,\mathrm{K}$, lift $43\,\mathrm{K}$. By [[#eq-carnot-cop]],
$$
\mathrm{COP}_{R,\max} = \frac{255.15}{43} = 5.93 .
$$
(b) Same temperatures, so $\mathrm{COP}_{HP,\max} = 298.15/43 = 6.93 = 5.93 + 1$.

Sanity check: real freezers manage a COP of about 1.5–2 at these conditions, a "Carnot fraction" of roughly 0.3; the refrigerant must be several kelvin colder than the freezer and several kelvin warmer than the kitchen, which alone raises the lift to $60\,\mathrm{K}$ or more. Using degrees Celsius, $-18/43$, would give a negative COP — the formula needs kelvin.
:::
:::

## The vapour-compression cycle {#sec-vcr}

A Carnot refrigerator using a vapour inside the two-phase dome would need a compressor handling wet vapour and an expansion turbine producing a trickle of work from a liquid. Practical machines make two changes. The compressor takes **dry vapour**, so the compression ends in the superheated region; and the expansion is done by a **throttling valve** (or capillary tube), which wastes the small expansion work but is cheap and controllable. The result is the vapour-compression cycle:

1. → 2: the compressor raises saturated (or slightly superheated) vapour from the evaporator pressure to the condenser pressure;
2. → 3: the condenser rejects heat to the surroundings; the vapour desuperheats, condenses and leaves as saturated (or subcooled) liquid;
3. → 4: the expansion valve throttles the liquid to the evaporator pressure, at constant enthalpy, producing a cold mixture of liquid and vapour;
4. → 1: the evaporator absorbs heat from the cold space as the liquid boils.

On a $p$–$h$ diagram, which refrigeration engineers use rather than $T$–$s$, the cycle is a near-rectangle: two horizontal lines (evaporation and condensation at constant pressure), a vertical line (throttling at constant $h$) and a steep compression line.

::: proposition Energy balance of the vapour-compression cycle {#prop-vcr}
For steady flow of refrigerant at mass flow rate $\dot m$, with negligible kinetic and potential energy changes, no heat loss from the compressor and an adiabatic expansion valve,
$$
\dot Q_L = \dot m\,(h_1 - h_4), \quad \dot W_\text{in} = \dot m\,(h_2 - h_1), \quad \dot Q_H = \dot m\,(h_2 - h_3), \quad h_4 = h_3,
$$
so that
$$
\mathrm{COP}_R = \frac{h_1 - h_3}{h_2 - h_1}, \qquad \mathrm{COP}_{HP} = \frac{h_2 - h_3}{h_2 - h_1}.
$$ {#eq-vcr-cop}
With compressor isentropic efficiency $\eta_c = (h_{2s} - h_1)/(h_2 - h_1)$, the actual outlet enthalpy is $h_2 = h_1 + (h_{2s} - h_1)/\eta_c$, where $h_{2s}$ is evaluated at the condenser pressure and $s_{2s} = s_1$.
:::

::: proof
Apply the steady-flow energy equation $\dot Q - \dot W = \dot m\,(h_\text{out} - h_\text{in})$ ([[thermodynamics/first-law-open]]) to each component with one inlet and one outlet. Evaporator: no work, $\dot Q_L = \dot m(h_1 - h_4)$. Compressor: adiabatic by assumption, $-\dot W = \dot m(h_2 - h_1)$, so $\dot W_\text{in} = \dot m(h_2 - h_1)$. Condenser: no work, heat leaves, $\dot Q_H = \dot m(h_2 - h_3)$. Valve: no heat, no work, so $h_4 = h_3$ — the throttling process is isenthalpic but irreversible (entropy rises). Substituting $h_4 = h_3$ in the ratio $\dot Q_L/\dot W_\text{in}$ gives [[#eq-vcr-cop]], and the overall balance $\dot Q_H = \dot Q_L + \dot W_\text{in}$ is satisfied identically. The isentropic-efficiency relation is the definition of $\eta_c$ solved for $h_2$.
:::

::: algorithm Analysing a vapour-compression cycle {#alg-vcr}
1. Fix the evaporating temperature (a few kelvin below the cold-space temperature) and the condensing temperature (a few kelvin above the heat-sink temperature); read the saturation pressures $p_L$, $p_H$.
2. State 1 (compressor inlet): at $p_L$, saturated vapour or with the stated superheat; find $h_1$, $s_1$.
3. State $2s$: at $p_H$ with $s = s_1$; find $h_{2s}$. Then $h_2 = h_1 + (h_{2s} - h_1)/\eta_c$, and from $(p_H, h_2)$ the discharge temperature.
4. State 3 (condenser exit): at $p_H$, saturated liquid or with the stated subcooling; find $h_3$. State 4: $h_4 = h_3$.
5. Refrigerating effect $q_L = h_1 - h_4$; mass flow $\dot m = \dot Q_L/q_L$; power $\dot W = \dot m(h_2 - h_1)$; COP by [[#eq-vcr-cop]].
6. Sanity checks: $\mathrm{COP} <$ Carnot value at the refrigerant temperatures; discharge temperature acceptable for the compressor oil (typically below about $100$–$120\,^\circ\mathrm{C}$); $\dot Q_H = \dot Q_L + \dot W$.
:::

::: example Ideal cycle with R-134a {#ex-ideal-vcr}
An ideal vapour-compression refrigerator using R-134a evaporates at $-10\,^\circ\mathrm{C}$ and condenses at $40\,^\circ\mathrm{C}$. The refrigerant leaves the evaporator as saturated vapour and the condenser as saturated liquid; compression is isentropic. For a refrigerating capacity of $10\,\mathrm{kW}$, find the COP, the mass flow, the compressor power and the heat rejected.
::: solution
Following [[#alg-vcr]] with R-134a properties (IIR reference):

- $p_L = p_\text{sat}(-10\,^\circ\mathrm{C}) = 200.6\,\mathrm{kPa}$; $p_H = p_\text{sat}(40\,^\circ\mathrm{C}) = 1016.6\,\mathrm{kPa}$.
- State 1, saturated vapour at $-10\,^\circ\mathrm{C}$: $h_1 = 392.66\,\mathrm{kJ/kg}$, $s_1 = 1.7334\,\mathrm{kJ/(kg\,K)}$.
- State 2s, $1016.6\,\mathrm{kPa}$ and $s = 1.7334$: $h_2 = 426.48\,\mathrm{kJ/kg}$, $T_2 = 46.3\,^\circ\mathrm{C}$.
- State 3, saturated liquid at $40\,^\circ\mathrm{C}$: $h_3 = 256.41\,\mathrm{kJ/kg} = h_4$.

Refrigerating effect $q_L = 392.66 - 256.41 = 136.26\,\mathrm{kJ/kg}$; compressor work $w = 426.48 - 392.66 = 33.81\,\mathrm{kJ/kg}$.
$$
\mathrm{COP}_R = \frac{136.26}{33.81} = 4.03, \qquad \dot m = \frac{10\,\mathrm{kW}}{136.26\,\mathrm{kJ/kg}} = 0.0734\,\mathrm{kg/s},
$$
$\dot W_\text{in} = 0.0734 \times 33.81 = 2.48\,\mathrm{kW}$ and $\dot Q_H = 10 + 2.48 = 12.48\,\mathrm{kW}$.

Sanity check: the Carnot COP between the refrigerant temperatures is $263.15/50 = 5.26$; the ideal vapour-compression cycle reaches $77\,\%$ of it, the shortfall being the throttling loss and the superheated "horn" of the compression above the condensing temperature. With the ASHRAE-reference tables of Çengel & Boles the enthalpies are all lower by about $148\,\mathrm{kJ/kg}$, but $q_L$, $w$ and the COP are the same.
:::
:::

### Superheat, subcooling and the real compressor

Real cycles differ from the ideal one in three deliberate or unavoidable ways. A few kelvin of **superheat** at the evaporator exit protects the compressor from liquid droplets (a thermostatic expansion valve controls precisely this superheat). A few kelvin of **subcooling** at the condenser exit makes sure the valve receives pure liquid, and it increases the refrigerating effect, since $h_3$ falls. And the compressor is not isentropic: small hermetic compressors have isentropic efficiencies of about 0.6–0.75, large screw and centrifugal machines 0.75–0.85. Pressure drops in the heat exchangers and pipes add further losses.

::: example A real R-134a cycle {#ex-real-vcr}
Repeat [[#ex-ideal-vcr]] with $5\,\mathrm{K}$ of superheat at the compressor inlet (so $T_1 = -5\,^\circ\mathrm{C}$ at $200.6\,\mathrm{kPa}$), $5\,\mathrm{K}$ of subcooling at the condenser exit ($T_3 = 35\,^\circ\mathrm{C}$ at $1016.6\,\mathrm{kPa}$) and a compressor isentropic efficiency of $0.75$. Ignore pressure drops.
::: solution
- State 1: $200.6\,\mathrm{kPa}$, $-5\,^\circ\mathrm{C}$: $h_1 = 396.93\,\mathrm{kJ/kg}$, $s_1 = 1.7494\,\mathrm{kJ/(kg\,K)}$.
- State 2s: $1016.6\,\mathrm{kPa}$, $s = 1.7494$: $h_{2s} = 431.64\,\mathrm{kJ/kg}$.
- Actual: $h_2 = 396.93 + (431.64 - 396.93)/0.75 = 443.21\,\mathrm{kJ/kg}$, and the discharge temperature is $61.9\,^\circ\mathrm{C}$.
- State 3: compressed liquid at $35\,^\circ\mathrm{C}$ (taken as saturated liquid at $35\,^\circ\mathrm{C}$): $h_3 = 248.99\,\mathrm{kJ/kg} = h_4$.

$q_L = 396.93 - 248.99 = 147.93\,\mathrm{kJ/kg}$, $w = 443.21 - 396.93 = 46.29\,\mathrm{kJ/kg}$,
$$
\mathrm{COP}_R = \frac{147.93}{46.29} = 3.20 .
$$
For $10\,\mathrm{kW}$: $\dot m = 10/147.93 = 0.0676\,\mathrm{kg/s}$ and $\dot W_\text{in} = 0.0676 \times 46.29 = 3.13\,\mathrm{kW}$.

Sanity check: subcooling and superheat raised the refrigerating effect by $8.6\,\%$ (here the superheat is assumed to be useful cooling, taken inside the evaporator), but the compressor inefficiency raised the work by $37\,\%$, so the COP falls from $4.03$ to $3.20$ — a Carnot fraction of $3.20/5.26 = 0.61$, typical of a good commercial unit.
:::
:::

::: widget plot
f: (x+273.15)/(Tk-x); q*(x+273.15)/(Tk-x)
x: -40, 15
y: 0, 20
sliders: Tk=40:20:60:1; q=0.5:0.3:0.7:0.05
labels: \mathrm{COP}_{R,\mathrm{Carnot}}; q \times \mathrm{COP}_{R,\mathrm{Carnot}}
caption: Carnot COP of a refrigerator, and a realistic estimate equal to a "Carnot fraction" $q$ times it, against the evaporating temperature (°C) for a condensing temperature $T_k$ (°C) set by the slider. Read off the air-conditioning case (evaporating at $5\,^\circ\mathrm{C}$, condensing at $45\,^\circ\mathrm{C}$) and the freezer case ($-30\,^\circ\mathrm{C}$): the freezer's COP is less than half the air conditioner's. Raise $T_k$ by $10\,\mathrm{K}$ — a dirty condenser, or a hot roof — and watch every COP drop by roughly a fifth. The steepness near the right-hand edge shows why small lifts (chilled ceilings, ground-source heat pumps) pay.
:::

## Refrigerants {#sec-refrigerants}

A refrigerant must evaporate at a convenient pressure at the evaporator temperature (preferably above atmospheric, so that leaks go outwards and air does not get in), have a large latent heat per unit volume of suction vapour (so the compressor is small), be chemically stable, compatible with oil and materials, and be safe. Since the 1980s two environmental criteria have dominated.

- **Ozone depletion potential (ODP)**: the ozone destroyed per kilogram released, relative to CFC-11. Chlorine-containing CFCs (R-12, ODP 1) and HCFCs (R-22, ODP 0.055) are being or have been phased out under the **Montreal Protocol**.
- **Global warming potential (GWP)**: the time-integrated radiative forcing over 100 years of a kilogram released, relative to a kilogram of CO₂. Hydrofluorocarbons (HFCs) have zero ODP but high GWP, and are being phased down under the **Kigali Amendment** (2016), whose schedules use the 100-year GWPs of the IPCC Fourth Assessment Report (AR4).

| refrigerant | type | GWP (100-yr) | safety class | typical use |
|---|---|---|---|---|
| R-134a | HFC | 1430 (AR4) | A1 | car air conditioning (older), chillers, domestic (older) |
| R-410A | HFC blend | 2088 (AR4) | A1 | split air conditioners (being replaced) |
| R-32 | HFC | 675 (AR4) | A2L | split air conditioners, heat pumps |
| R-1234yf | HFO | below 1 (IPCC AR5) | A2L | car air conditioning |
| R-290 (propane) | hydrocarbon | 3 | A3 | domestic and commercial units, heat pumps |
| R-717 (ammonia) | natural | 0 | B2L | industrial refrigeration, cold stores |
| R-744 (CO₂) | natural | 1 | A1 | supermarkets, heat-pump water heaters |

The safety class (ISO 817 / ASHRAE 34) combines toxicity (A lower, B higher) with flammability (1 none, 2L mildly flammable, 2, 3 highly flammable). The trend is from synthetic high-GWP fluids towards ammonia, CO₂, hydrocarbons and HFOs, each bringing an engineering problem: ammonia's toxicity, CO₂'s high pressures (its critical temperature is $31\,^\circ\mathrm{C}$, so heat rejection is often supercritical), propane's flammability (which limits charge size) and the cost of HFOs.

::: warning Leaks and the "direct" emissions of a refrigeration system
The climate effect of a refrigerant is its GWP times the mass that escapes, and real systems leak: charges of commercial systems are lost at several per cent a year, and the whole charge escapes at end of life unless it is recovered. A supermarket with $200\,\mathrm{kg}$ of R-404A (AR4 GWP 3922) losing $15\,\%$ a year emits $200 \times 0.15 \times 3922 = 118\,\mathrm{t}$ CO₂-equivalent annually — comparable with the emissions from the electricity the plant uses. When comparing refrigerants, do not compare COPs alone. And work with refrigerants is regulated: handling, recovery and leak checks require trained, certified technicians, and ammonia and hydrocarbons require specific safety measures.
:::

## Heat pumps {#sec-heat-pumps}

A heat pump is a vapour-compression machine whose condenser heats a building or hot water and whose evaporator draws heat from outdoor air, the ground or a water source. The figure of merit is $\mathrm{COP}_{HP}$ and, over a heating season with changing outdoor temperature, the **seasonal COP** (SCOP), the ratio of heat delivered to electricity used over the season. Because the lift matters so much, heat pumps work best with low-temperature emitters (underfloor heating or large radiators at $35$–$45\,^\circ\mathrm{C}$) and with a warm source (the ground at depth stays near the annual mean air temperature).

::: example An air-to-water heat pump with propane {#ex-heat-pump}
An air-to-water heat pump using R-290 evaporates at $-5\,^\circ\mathrm{C}$ (outdoor air about $+2\,^\circ\mathrm{C}$) and condenses at $45\,^\circ\mathrm{C}$ (water to radiators at about $40\,^\circ\mathrm{C}$). The refrigerant leaves the evaporator as saturated vapour and the condenser as saturated liquid; $\eta_c = 0.70$. Find $\mathrm{COP}_{HP}$, its Carnot fraction, and the compressor discharge temperature. Compare with R-32 at the same conditions, whose COP comes out at $3.76$ with a discharge temperature of $103\,^\circ\mathrm{C}$.
::: solution
R-290 properties: $p_L = 406.0\,\mathrm{kPa}$, $p_H = 1534\,\mathrm{kPa}$; $h_1 = 569.30\,\mathrm{kJ/kg}$, $s_1 = 2.3781\,\mathrm{kJ/(kg\,K)}$; $h_{2s} = 631.64\,\mathrm{kJ/kg}$; $h_3 = 321.79\,\mathrm{kJ/kg}$.

$h_2 = 569.30 + (631.64 - 569.30)/0.70 = 658.35\,\mathrm{kJ/kg}$, so
$$
\mathrm{COP}_{HP} = \frac{h_2 - h_3}{h_2 - h_1} = \frac{658.35 - 321.79}{658.35 - 569.30} = \frac{336.56}{89.05} = 3.78 .
$$
Carnot between the refrigerant temperatures: $318.15/50 = 6.36$; Carnot fraction $3.78/6.36 = 0.59$. Discharge temperature, from $p_H$ and $h_2$: $62.6\,^\circ\mathrm{C}$.

Comparison: R-32 gives almost the same COP but a discharge temperature of about $103\,^\circ\mathrm{C}$, because its vapour has a higher ratio of specific heats; that limits R-32 at high lifts (cold climates, hot water), while propane's limitation is its flammability. Sanity check: $3.78$ is a typical rated COP for an air-to-water heat pump at $+2/35$–$45\,^\circ\mathrm{C}$; each unit of electricity delivers $3.78$ units of heat, $2.78$ of them drawn from the outdoor air.
:::
:::

## Absorption refrigeration {#sec-absorption}

An absorption machine replaces the compressor with a "thermal compressor". Low-pressure refrigerant vapour from the evaporator is **absorbed** into a liquid solution (water vapour into lithium bromide solution, or ammonia into water), the solution is **pumped** to high pressure — pumping a liquid costs very little work — and in the **generator** heat drives the refrigerant back out of solution as high-pressure vapour, which then condenses, throttles and evaporates as in a vapour-compression cycle. The machine therefore takes heat at three temperatures: it receives driving heat $Q_G$ at a high temperature $T_G$ (steam, hot water, waste heat, solar heat), absorbs $Q_L$ at $T_L$, and rejects $Q_G + Q_L$ at the ambient temperature $T_0$ (in the absorber and condenser).

::: proposition Maximum COP of a heat-driven refrigerator {#prop-absorption}
A device that receives heat $Q_G$ at $T_G$, extracts $Q_L$ at $T_L$, rejects heat only at $T_0$ ($T_L < T_0 < T_G$) and consumes negligible work has
$$
\mathrm{COP}_\text{abs} = \frac{Q_L}{Q_G} \le \left(1 - \frac{T_0}{T_G}\right)\frac{T_L}{T_0 - T_L} .
$$ {#eq-abs-cop}
:::

::: proof
First law over a cycle: heat rejected $Q_0 = Q_G + Q_L$. Entropy balance over a cycle, with the three reservoirs:
$$
S_\text{gen} = \frac{Q_0}{T_0} - \frac{Q_G}{T_G} - \frac{Q_L}{T_L} \ge 0 .
$$
Substitute $Q_0 = Q_G + Q_L$:
$$
Q_G\left(\frac{1}{T_0} - \frac{1}{T_G}\right) \ge Q_L\left(\frac{1}{T_L} - \frac{1}{T_0}\right)
\quad\Longrightarrow\quad
\frac{Q_L}{Q_G} \le \frac{(T_G - T_0)/(T_0 T_G)}{(T_0 - T_L)/(T_0 T_L)} = \frac{T_G - T_0}{T_G}\cdot\frac{T_L}{T_0 - T_L}.
$$
The bound is the product of a Carnot engine efficiency between $T_G$ and $T_0$ and a Carnot refrigerator COP between $T_L$ and $T_0$ — exactly what one would get by using a reversible engine to drive a reversible refrigerator, which shows the bound is attainable in principle. The assumptions: steady cyclic operation, pump work neglected, heat exchanged at the three reservoir temperatures.
:::

With driving heat at $120\,^\circ\mathrm{C}$, rejection at $30\,^\circ\mathrm{C}$ and chilled water at $5\,^\circ\mathrm{C}$, the bound is $(1 - 303.15/393.15)(278.15/25) = 2.55$. Real single-effect lithium-bromide chillers achieve about $0.7$, double-effect machines driven at $150$–$180\,^\circ\mathrm{C}$ about $1.2$. A COP below one is not a failure: the input is heat, often waste heat that would otherwise be thrown away, and an absorption chiller driven by the exhaust of a gas engine or turbine is a standard component of trigeneration plants (see [[energy-systems/gas-turbines-combined-cycles]]).

## Moist air: psychrometrics {#sec-psychro}

Air conditioning controls both the temperature and the humidity of air. Atmospheric air is a mixture of dry air and water vapour, and at the low partial pressures involved (a few kilopascals) both behave as ideal gases. The water vapour content is small — about a percent by mass — but its latent heat makes it a large part of the energy in an air-conditioning process.

::: definition Psychrometric properties {#def-psychro}
For moist air at total pressure $p$ and dry-bulb temperature $T$, with water-vapour partial pressure $p_v$ and dry-air partial pressure $p_a = p - p_v$:

- **humidity ratio** (specific humidity) $\omega = m_v/m_a$, the mass of vapour per unit mass of *dry air*;
- **relative humidity** $\phi = p_v/p_g(T)$, where $p_g(T)$ is the saturation pressure of water at $T$;
- **dew-point temperature** $T_{dp}$: the saturation temperature at $p_v$, i.e. the temperature at which the air becomes saturated when cooled at constant pressure and constant $\omega$;
- **adiabatic-saturation temperature**, approximately equal (for air–water at ordinary conditions) to the **wet-bulb temperature** $T_{wb}$ read by a thermometer with a wetted wick in a moving air stream: the temperature reached when air is saturated by evaporating water into it adiabatically.

All specific quantities in air conditioning — enthalpy, volume — are per kilogram of dry air, because the dry-air mass flow is conserved through every process while the vapour mass is not.
:::

::: proposition Humidity ratio and enthalpy of moist air {#prop-moist-air}
Treating dry air and water vapour as ideal gases,
$$
\omega = 0.622\,\frac{p_v}{p - p_v} = 0.622\,\frac{\phi\,p_g}{p - \phi\,p_g},
$$ {#eq-omega}
and the enthalpy per kilogram of dry air, with reference states of dry air at $0\,^\circ\mathrm{C}$ and saturated liquid water at $0\,^\circ\mathrm{C}$, is
$$
h = c_{pa}\,T + \omega\,(h_{g0} + c_{pv}\,T) \approx 1.005\,T + \omega\,(2501 + 1.82\,T)\quad \mathrm{kJ/kg\ dry\ air},
$$ {#eq-moist-h}
with $T$ in $^\circ\mathrm{C}$.
:::

::: proof
Each component occupies the whole volume $V$ at its own partial pressure (Dalton), so $p_v V = m_v R_v T$ and $p_a V = m_a R_a T$ with $T$ absolute. Dividing,
$$
\omega = \frac{m_v}{m_a} = \frac{R_a}{R_v}\,\frac{p_v}{p_a} = \frac{0.2870}{0.4615}\,\frac{p_v}{p - p_v} = 0.622\,\frac{p_v}{p - p_v},
$$
the ratio $R_a/R_v = M_v/M_a = 18.015/28.97 = 0.622$. Substituting $p_v = \phi p_g$ gives the second form.

Enthalpy of a mixture of ideal gases is the sum of the component enthalpies, each depending only on temperature: $H = m_a h_a + m_v h_v$, and per unit mass of dry air $h = h_a + \omega h_v$. For dry air with constant $c_{pa} = 1.005\,\mathrm{kJ/(kg\,K)}$ and zero enthalpy at $0\,^\circ\mathrm{C}$, $h_a = 1.005\,T$. The vapour at low partial pressure has an enthalpy that is nearly independent of pressure; taking it from the saturated vapour at $0\,^\circ\mathrm{C}$, $h_{g0} = 2501\,\mathrm{kJ/kg}$ (relative to liquid at $0\,^\circ\mathrm{C}$), and heating as an ideal gas with $c_{pv} = 1.82\,\mathrm{kJ/(kg\,K)}$, $h_v = 2501 + 1.82\,T$. Compared with a real-gas moist-air model, the error of this approximation is below about $0.5\,\%$ between $0$ and $50\,^\circ\mathrm{C}$ at atmospheric pressure.
:::

The **psychrometric chart** plots $\omega$ against $T$ at a fixed total pressure (usually $101.325\,\mathrm{kPa}$), with curves of constant $\phi$ (the top one, $\phi = 1$, is the saturation curve), lines of constant wet-bulb temperature and of constant enthalpy (nearly parallel, sloping down to the right), and lines of constant specific volume. Each air-conditioning process is a line or a point on it.

::: widget plot
f: 622*0.61094*exp(17.625*x/(x+243.04))/(101.325-0.61094*exp(17.625*x/(x+243.04))); 622*phi*0.61094*exp(17.625*x/(x+243.04))/(101.325-phi*0.61094*exp(17.625*x/(x+243.04))); 1000*(hh-1.005*x)/(2501+1.82*x)
x: 0, 45
y: 0, 40
sliders: phi=0.5:0.1:1:0.05; hh=60:10:110:1
labels: \phi = 1\ (\text{saturation}); \phi\ (\text{slider}); h = \text{const}
caption: A psychrometric chart at $101.325\,\mathrm{kPa}$: humidity ratio $\omega$ in g per kg of dry air against dry-bulb temperature in °C. The saturation curve uses the Magnus approximation $p_g = 0.61094\,e^{17.625T/(T+243.04)}\,\mathrm{kPa}$ (within about $0.3\,\%$ of IAPWS-95 from 0 to 45 °C). Set $\phi = 0.6$ and $h = 71$: the two curves cross near $30\,^\circ\mathrm{C}$, $16\,\mathrm{g/kg}$ — the state of [[#ex-psychro]]. Moving horizontally to the left from that point (cooling at constant $\omega$) meets the saturation curve at the dew point, about $21\,^\circ\mathrm{C}$. Following the constant-enthalpy line up to saturation shows evaporative cooling: the air cools while gaining moisture, ending near the wet-bulb temperature.
:::

::: example Properties of a hot, humid day {#ex-psychro}
Outdoor air is at $30\,^\circ\mathrm{C}$, $\phi = 60\,\%$, $p = 101.325\,\mathrm{kPa}$. With $p_g(30\,^\circ\mathrm{C}) = 4.247\,\mathrm{kPa}$, find the vapour pressure, humidity ratio, dew point, enthalpy and specific volume per kilogram of dry air.
::: solution
$p_v = 0.60 \times 4.247 = 2.548\,\mathrm{kPa}$. By [[#eq-omega]],
$$
\omega = 0.622 \times \frac{2.548}{101.325 - 2.548} = 0.01605\,\mathrm{kg/kg\ dry\ air} = 16.0\,\mathrm{g/kg}.
$$
Dew point: the saturation temperature at $2.548\,\mathrm{kPa}$ is $T_{dp} = 21.4\,^\circ\mathrm{C}$; any surface colder than this (a cooling coil, a cold-water pipe) will collect condensation. Enthalpy by [[#eq-moist-h]]:
$$
h = 1.005(30) + 0.01605\,(2501 + 1.82 \times 30) = 30.15 + 41.01 = 71.2\,\mathrm{kJ/kg\ dry\ air}.
$$
Specific volume (dry air at its partial pressure): $v = R_a T/p_a = 0.2870 \times 303.15/(101.325 - 2.548) = 0.881\,\mathrm{m^3/kg\ dry\ air}$.

Sanity check: more than half the enthalpy ($41$ of $71\,\mathrm{kJ/kg}$) is carried by the 1.6 % of the mass that is water vapour — the latent part. CoolProp's real-gas moist-air model gives $\omega = 16.1\,\mathrm{g/kg}$ and $h = 71.4\,\mathrm{kJ/kg}$, so the ideal-gas formulas are accurate to well under 1 %; the wet-bulb temperature from the same model is $23.8\,^\circ\mathrm{C}$.
:::
:::

## Air-conditioning processes {#sec-processes}

Every air-conditioning process — heating, cooling, humidifying, dehumidifying, mixing — is analysed with three balances for a steady-flow device: dry-air mass, water mass and energy. The water balance includes any liquid water added (humidifier) or removed (condensate), and the energy balance includes its enthalpy $h_w$ (that of liquid water, $\approx 4.18\,T$ kJ/kg).

- **Sensible heating or cooling** (no moisture added or removed): $\omega$ constant, $\dot Q = \dot m_a(h_2 - h_1)$; relative humidity falls on heating and rises on cooling.
- **Cooling with dehumidification**: the air is cooled below its dew point on a cold coil; water condenses and drains. $\dot m_w = \dot m_a(\omega_1 - \omega_2)$, $\dot Q_\text{out} = \dot m_a(h_1 - h_2) - \dot m_w h_w$. The air leaves nearly saturated and is often too cold and too humid in relative terms, so it may be reheated.
- **Evaporative cooling**: hot dry air passes through wetted pads; water evaporates using the air's own sensible heat. The process is adiabatic, so $h$ (and the wet-bulb temperature) stays nearly constant while $\omega$ rises and $T$ falls — effective in hot, dry climates.
- **Adiabatic mixing** of two streams: $\dot m_{a3} = \dot m_{a1} + \dot m_{a2}$, $\omega_3$ and $h_3$ are the dry-air-mass-weighted averages, so on the chart the mixed state lies on the straight line joining the two inlet states.

::: example Cooling coil with dehumidification and reheat {#ex-coil}
$1.2\,\mathrm{kg/s}$ of dry air (with its moisture) at $30\,^\circ\mathrm{C}$, $\phi = 60\,\%$ — the state of [[#ex-psychro]] — passes over a cooling coil and leaves saturated at $12\,^\circ\mathrm{C}$; it is then reheated to $20\,^\circ\mathrm{C}$. With $p_g(12\,^\circ\mathrm{C}) = 1.403\,\mathrm{kPa}$, $p_g(20\,^\circ\mathrm{C}) = 2.339\,\mathrm{kPa}$, and condensate leaving at $12\,^\circ\mathrm{C}$ ($h_w = 50.4\,\mathrm{kJ/kg}$), find the coil load, the condensate flow, the reheat and the final relative humidity.
::: solution
State 1: $\omega_1 = 0.01605$, $h_1 = 71.16\,\mathrm{kJ/kg}$ (from [[#ex-psychro]]).

State 2, saturated at $12\,^\circ\mathrm{C}$:
$$
\omega_2 = 0.622\times\frac{1.403}{101.325 - 1.403} = 0.008733, \qquad h_2 = 1.005(12) + 0.008733\,(2501 + 21.8) = 34.09\,\mathrm{kJ/kg}.
$$
Water balance: $\dot m_w = 1.2\,(0.01605 - 0.008733) = 0.00878\,\mathrm{kg/s}$, i.e. $31.6\,\mathrm{kg}$ of condensate an hour.

Energy balance on the coil:
$$
\dot Q_\text{coil} = \dot m_a(h_1 - h_2) - \dot m_w h_w = 1.2\,(71.16 - 34.09) - 0.00878 \times 50.4 = 44.48 - 0.44 = 44.0\,\mathrm{kW}.
$$
Of this, the sensible part is about $1.2 \times 1.005 \times 18 = 21.7\,\mathrm{kW}$; the rest, about half, is latent — condensing water.

Reheat at constant $\omega_3 = \omega_2$: $h_3 = 1.005(20) + 0.008733\,(2501 + 36.4) = 42.26\,\mathrm{kJ/kg}$, $\dot Q_\text{reheat} = 1.2\,(42.26 - 34.09) = 9.80\,\mathrm{kW}$. Final relative humidity:
$$
\phi_3 = \frac{\omega_3\,p}{(0.622 + \omega_3)\,p_g(20\,^\circ\mathrm{C})} = \frac{0.008733 \times 101.325}{0.6307 \times 2.339} = 0.600 = 60\,\%.
$$
Sanity check: $44\,\mathrm{kW}$ is $12.5$ tons of refrigeration for $1.06\,\mathrm{m^3/s}$ of air ($v_1 = 0.881\,\mathrm{m^3/kg}$), a common rule-of-thumb ratio. Reheating air just cooled is wasteful; modern systems avoid it with heat recovery or by controlling humidity in other ways.
:::
:::

## Cooling loads {#sec-loads}

To size equipment one must estimate the rate at which heat and moisture enter the conditioned space at design conditions — the **cooling load**. It has **sensible** components (conduction through walls, roof and glazing; solar radiation through windows; heat from people, lights and equipment; outdoor air for ventilation) and **latent** components (moisture from people and processes, and from ventilation air when the outdoor air is more humid than indoors). The ratio of sensible to total load, the **sensible heat ratio**, decides how far below the dew point the coil must work. Professional calculations (the ASHRAE heat-balance and radiant-time-series methods) account for the thermal mass of the building, which delays and smooths the peaks; the steady estimate below is the first step.

::: example Cooling load of a small office {#ex-load}
A $100\,\mathrm{m^2}$ office at $24\,^\circ\mathrm{C}$, $50\,\%$ (humidity ratio $0.0093$) on a design day with outdoor air at $32\,^\circ\mathrm{C}$, humidity ratio $0.0160$. Estimate the total cooling load from: envelope conduction with $UA = 150\,\mathrm{W/K}$; $12\,\mathrm{m^2}$ of glazing receiving $250\,\mathrm{W/m^2}$ of solar radiation with a solar heat-gain coefficient of $0.4$; ten people doing office work ($75\,\mathrm{W}$ sensible and $55\,\mathrm{W}$ latent each, typical tabulated values); lighting $10\,\mathrm{W/m^2}$; ten computers at $100\,\mathrm{W}$; and ventilation of $10\,\mathrm{L/s}$ of outdoor air per person ($\rho = 1.16\,\mathrm{kg/m^3}$, $h_{fg} \approx 2450\,\mathrm{kJ/kg}$).
::: solution
Sensible gains:

| source | calculation | W |
|---|---|---|
| conduction | $150 \times (32 - 24)$ | 1200 |
| solar through glazing | $12 \times 250 \times 0.4$ | 1200 |
| people, sensible | $10 \times 75$ | 750 |
| lighting | $100 \times 10$ | 1000 |
| equipment | $10 \times 100$ | 1000 |
| ventilation, sensible | $0.116 \times 1.005 \times 8 \times 1000$ | 933 |

The ventilation mass flow is $0.1\,\mathrm{m^3/s} \times 1.16 = 0.116\,\mathrm{kg/s}$. Total sensible: $6083\,\mathrm{W}$.

Latent gains: people $10 \times 55 = 550\,\mathrm{W}$; ventilation $0.116 \times (0.0160 - 0.0093) \times 2450 \times 1000 = 1904\,\mathrm{W}$. Total latent $2454\,\mathrm{W}$.

Total load $= 6083 + 2454 = 8537\,\mathrm{W} \approx 8.5\,\mathrm{kW}$ ($2.4$ tons), sensible heat ratio $6083/8537 = 0.71$.

Sanity check: $85\,\mathrm{W/m^2}$ of floor area is in the usual range for offices in warm climates. Ventilation air contributes a third of the load — which is why large buildings recover energy from exhaust air. With a heat pump of COP 3.5 the electrical demand would be about $2.4\,\mathrm{kW}$.
:::
:::

::: quiz
A room air conditioner's evaporator coil runs at $8\,^\circ\mathrm{C}$. Room air is at $26\,^\circ\mathrm{C}$ with a dew point of $16\,^\circ\mathrm{C}$. Which statement is correct?
- [ ] The coil only cools the air sensibly, because the coil temperature is above the room temperature's wet-bulb value.
- [x] The coil dehumidifies the air, because its surface is below the air's dew point, so part of the coil load is latent.
- [ ] Relative humidity of the air leaving the coil is lower than that of the room air, since the air has been dried.
- [ ] Lowering the evaporating temperature to $2\,^\circ\mathrm{C}$ would raise the COP.
::: solution
Water condenses wherever the surface is below the dew point ($16\,^\circ\mathrm{C}$); the coil at $8\,^\circ\mathrm{C}$ therefore removes moisture and some of its capacity goes into latent heat. The leaving air is close to saturation — its *relative* humidity is higher even though its humidity ratio is lower. Lowering the evaporating temperature increases the lift and lowers the COP ([[#prop-carnot-cop]]), though it increases dehumidification.
:::
:::

::: history
Jacob **Perkins**, an American working in London, obtained British patent No. 6662 in 1834 for a vapour-compression machine using ether, with compressor, condenser, expansion valve and evaporator — every element of the modern cycle — but it was not a commercial success. Ferdinand **Carré** patented the ammonia–water absorption machine in France in 1859, the first absorption machine to reach industrial use. In 1902 Willis **Carrier** designed a system to control the humidity in the Sackett-Wilhelms printing works in Brooklyn, where changes in humidity distorted paper between colour passes; his US patent 808,897, "Apparatus for Treating Air", was granted in 1906, and his 1911 paper on "Rational psychrometric formulae" put psychrometrics on its modern footing. In 1930 Thomas **Midgley** Jr. presented dichlorodifluoromethane (R-12), a non-toxic, non-flammable refrigerant that made domestic refrigeration safe. In 1974 Mario **Molina** and F. Sherwood **Rowland** showed in *Nature* that chlorofluorocarbons would release chlorine in the stratosphere and destroy ozone; the **Montreal Protocol** of 1987 phased out CFCs, and Molina, Rowland and Paul Crutzen shared the 1995 Nobel Prize in Chemistry. The **Kigali Amendment** to the Montreal Protocol, agreed in October 2016 and in force from 1 January 2019, extended the treaty to phase down HFCs, measured in CO₂-equivalent with IPCC AR4 GWPs.
:::

::: summary
- $\mathrm{COP}_R = Q_L/W$, $\mathrm{COP}_{HP} = Q_H/W = \mathrm{COP}_R + 1$; the Carnot limits $T_L/(T_H - T_L)$ and $T_H/(T_H - T_L)$ depend on the temperature lift, in kelvin.
- The vapour-compression cycle (compress, condense, throttle, evaporate) gives $\mathrm{COP}_R = (h_1 - h_3)/(h_2 - h_1)$ with $h_4 = h_3$; with $\eta_c$, $h_2 = h_1 + (h_{2s} - h_1)/\eta_c$.
- Real units achieve roughly 0.5–0.65 of the Carnot COP at the refrigerant temperatures; every extra kelvin of lift costs about $1/(T_H - T_L)$ of the COP.
- Refrigerant choice balances thermodynamics against ODP, GWP (Kigali, AR4 values), toxicity and flammability; leaks can dominate the climate impact.
- Absorption chillers use heat: $\mathrm{COP} \le (1 - T_0/T_G)\,T_L/(T_0 - T_L)$; real values 0.7 (single effect) to 1.2 (double effect).
- Moist air: $\omega = 0.622\,p_v/(p - p_v)$, $\phi = p_v/p_g$, $h = 1.005T + \omega(2501 + 1.82T)$ per kg of dry air.
- Air-conditioning processes follow from dry-air, water and energy balances; cooling below the dew point dehumidifies, and the condensate carries away the latent load.
- Cooling loads are sensible plus latent; ventilation air is often a third of the total.
:::

## Exercises {#sec-exercises}

::: exercise Carnot COP of an air conditioner {#exr-carnot-ac level=1 check="8.09"}
An air conditioner's refrigerant evaporates at $10\,^\circ\mathrm{C}$ and condenses at $45\,^\circ\mathrm{C}$. What is the Carnot COP between these temperatures? (Enter the COP to two decimal places.)
::: solution
$T_L = 283.15\,\mathrm{K}$, $T_H - T_L = 35\,\mathrm{K}$:
$$
\mathrm{COP}_{R,\max} = \frac{283.15}{35} = 8.09 .
$$
A real unit at these conditions has a COP of about 4–5, a Carnot fraction near 0.55.
:::
:::

::: exercise Chiller COP from tons {#exr-tons level=1 check="5.60"}
A chiller rated at $350$ tons of refrigeration draws $220\,\mathrm{kW}$ of electricity at that capacity. What is its COP? (Use $1\,\text{ton} = 3.517\,\mathrm{kW}$; enter the COP to two decimal places.)
::: solution
Capacity $= 350 \times 3.517 = 1231\,\mathrm{kW}$. $\mathrm{COP} = 1231/220 = 5.595 \approx 5.60$. US data sheets often give the inverse in kW per ton: $220/350 = 0.63\,\mathrm{kW/ton}$.
:::
:::

::: exercise Humidity ratio {#exr-omega level=1 check="9.9"}
Room air is at $25\,^\circ\mathrm{C}$ and $50\,\%$ relative humidity at $101.325\,\mathrm{kPa}$; $p_g(25\,^\circ\mathrm{C}) = 3.170\,\mathrm{kPa}$. Find the humidity ratio. (Enter $\omega$ in grams per kilogram of dry air, to one decimal place.)
::: solution
$p_v = 0.5 \times 3.170 = 1.585\,\mathrm{kPa}$; by [[#eq-omega]],
$$
\omega = 0.622\times\frac{1.585}{101.325 - 1.585} = 0.00988\,\mathrm{kg/kg} = 9.9\,\mathrm{g/kg}.
$$
:::
:::

::: exercise COP of a real cycle {#exr-real-cop level=2 check="3.41"}
In an R-134a refrigerator (IIR reference), the compressor inlet enthalpy is $h_1 = 396.93\,\mathrm{kJ/kg}$, the isentropic outlet enthalpy is $h_{2s} = 431.64\,\mathrm{kJ/kg}$, and the condenser exit enthalpy is $h_3 = 248.99\,\mathrm{kJ/kg}$. The compressor isentropic efficiency is $0.80$. Find the COP. (Enter the COP to two decimal places.)
::: solution
$h_2 = 396.93 + (431.64 - 396.93)/0.80 = 440.32\,\mathrm{kJ/kg}$. By [[#eq-vcr-cop]],
$$
\mathrm{COP}_R = \frac{396.93 - 248.99}{440.32 - 396.93} = \frac{147.94}{43.39} = 3.41 .
$$
Compared with [[#ex-real-vcr]] ($\eta_c = 0.75$, COP $3.20$), five points of compressor efficiency are worth $6.6\,\%$ of COP.
:::
:::

::: exercise Electricity for a heat pump {#exr-scop level=2 check="4000"}
A house needs $12\,000\,\mathrm{kWh}$ of heat a year. A heat pump with a seasonal COP of $3.0$ supplies all of it. How much electricity does it use? Compare with a gas boiler of seasonal efficiency $0.90$. (Enter the electricity in kWh.)
::: solution
$E = 12\,000/3.0 = 4000\,\mathrm{kWh}$. The boiler would burn $12\,000/0.90 = 13\,333\,\mathrm{kWh}$ of gas. Whether the heat pump saves primary energy and carbon depends on how the electricity is generated ([[energy-systems/energy-overview]]); with grid electricity from a $50\,\%$-efficient gas plant, it would take $8000\,\mathrm{kWh}$ of gas — still $40\,\%$ less.
:::
:::

::: exercise Evaporative cooler {#exr-evap level=2 check="74"}
Air at $35\,^\circ\mathrm{C}$, $\phi = 20\,\%$, $101.325\,\mathrm{kPa}$ passes through an evaporative cooler and leaves at $22\,^\circ\mathrm{C}$. Treat the process as adiabatic with constant enthalpy per kg of dry air (neglect the enthalpy of the water added). Use $p_g(35\,^\circ\mathrm{C}) = 5.629\,\mathrm{kPa}$, $p_g(22\,^\circ\mathrm{C}) = 2.645\,\mathrm{kPa}$. Find the exit relative humidity. (Enter $\phi$ in per cent, rounded to the nearest whole number.)
::: solution
Inlet: $p_v = 0.2 \times 5.629 = 1.126\,\mathrm{kPa}$, $\omega_1 = 0.622 \times 1.126/100.199 = 0.006989$, $h_1 = 1.005(35) + 0.006989\,(2501 + 63.7) = 53.10\,\mathrm{kJ/kg}$.

Exit at $22\,^\circ\mathrm{C}$ with $h_2 = h_1$:
$$
\omega_2 = \frac{53.10 - 1.005 \times 22}{2501 + 1.82 \times 22} = \frac{30.99}{2541.0} = 0.012195 .
$$
Then $p_v = \omega_2 p/(0.622 + \omega_2) = 0.012195 \times 101.325/0.634195 = 1.948\,\mathrm{kPa}$ and $\phi_2 = 1.948/2.645 = 0.737$, i.e. $74\,\%$. The air cooled by $13\,\mathrm{K}$ with no compressor, at the price of $5.2\,\mathrm{g}$ of water evaporated per kg of air.
:::
:::

::: exercise Mixing outdoor and return air {#exr-mixing level=2 check="12.00"}
In an air-handling unit, $2.0\,\mathrm{kg/s}$ of outdoor air (dry-air basis) at $30\,^\circ\mathrm{C}$, $\omega = 0.016046$ mixes adiabatically with $3.0\,\mathrm{kg/s}$ of return air at $24\,^\circ\mathrm{C}$, $\omega = 0.009299$. Find the humidity ratio of the mixture, and its temperature from the mixture enthalpy. (Enter the mixed humidity ratio in g/kg of dry air to two decimal places.)
::: solution
Water balance: $\omega_3 = (2.0 \times 0.016046 + 3.0 \times 0.009299)/5.0 = 0.011998 = 12.00\,\mathrm{g/kg}$.
Enthalpies by [[#eq-moist-h]]: $h_1 = 71.16$, $h_2 = 1.005(24) + 0.009299\,(2544.7) = 47.78\,\mathrm{kJ/kg}$; $h_3 = (2 \times 71.16 + 3 \times 47.78)/5 = 57.13\,\mathrm{kJ/kg}$. Temperature: $T_3 = (h_3 - 2501\,\omega_3)/(1.005 + 1.82\,\omega_3) = (57.13 - 30.01)/1.0268 = 26.4\,^\circ\mathrm{C}$, close to the mass-weighted average $26.4\,^\circ\mathrm{C}$, as it must be for a nearly linear $h(T, \omega)$.
:::
:::

::: exercise Derivation: the limit of an absorption chiller {#exr-abs level=3 check="1.52"}
(a) Show that the bound [[#eq-abs-cop]] equals the COP of a system in which a reversible heat engine running between $T_G$ and $T_0$ drives a reversible refrigerator running between $T_L$ and $T_0$. (b) Evaluate it for a solar-driven chiller with driving heat at $90\,^\circ\mathrm{C}$, heat rejection at $35\,^\circ\mathrm{C}$ and chilled water at $7\,^\circ\mathrm{C}$. (Enter the maximum COP to two decimal places.)
::: solution
(a) The engine converts $Q_G$ into $W = (1 - T_0/T_G)Q_G$ and rejects the rest at $T_0$; the refrigerator uses $W$ to extract $Q_L = W\,T_L/(T_0 - T_L)$, rejecting at $T_0$. Then $Q_L/Q_G = (1 - T_0/T_G)\,T_L/(T_0 - T_L)$, the bound. Since the combination is reversible ($S_\text{gen} = 0$) and has the same three heat interactions, no device can do better: one that did could be combined with the reversed pair to violate the second law.

(b) $T_G = 363.15\,\mathrm{K}$, $T_0 = 308.15\,\mathrm{K}$, $T_L = 280.15\,\mathrm{K}$:
$$
\mathrm{COP}_{\max} = \left(1 - \frac{308.15}{363.15}\right)\frac{280.15}{28} = 0.15145 \times 10.005 = 1.52 .
$$
A real single-effect LiBr chiller at these conditions would achieve about $0.6$–$0.7$.
:::
:::

::: exercise Derivation: the cost of a kelvin of lift {#exr-lift level=3 check="2"}
For a refrigerator whose COP is a constant fraction $q$ of the Carnot COP between $T_L$ and $T_H$, show that raising the condensing temperature by $\Delta T_H$ (small) changes the COP by the fraction $-\Delta T_H/(T_H - T_L)$, and that lowering $T_L$ by $\Delta T$ changes it by $-\Delta T\,T_H/[T_L(T_H - T_L)]$. Evaluate the first for $T_L = -5\,^\circ\mathrm{C}$, $T_H = 45\,^\circ\mathrm{C}$. (Enter the percentage fall in COP per kelvin rise of condensing temperature.)
::: solution
$\mathrm{COP} = q\,T_L/(T_H - T_L)$, so $\ln \mathrm{COP} = \ln q + \ln T_L - \ln(T_H - T_L)$. Differentiating,
$$
\frac{d\,\mathrm{COP}}{\mathrm{COP}} = \frac{dT_L}{T_L} - \frac{dT_H - dT_L}{T_H - T_L}.
$$
With $dT_L = 0$: $d\mathrm{COP}/\mathrm{COP} = -dT_H/(T_H - T_L)$. With $dT_H = 0$ and $dT_L = -\Delta T$: $d\mathrm{COP}/\mathrm{COP} = -\Delta T\,[1/T_L + 1/(T_H - T_L)] = -\Delta T\,T_H/[T_L(T_H - T_L)]$.

Numbers: $T_H - T_L = 50\,\mathrm{K}$, so each kelvin of condensing temperature costs $1/50 = 2\,\%$ of COP; each kelvin of evaporating temperature costs $318.15/(268.15 \times 50) = 2.4\,\%$. This is why heat-exchanger area — which narrows the temperature differences — is usually the cheapest way to raise a COP.
:::
:::

::: exercise Design: a heat pump for an old house {#exr-design level=3}
An older house has a design heat loss of $10\,\mathrm{kW}$ at an outdoor temperature of $-5\,^\circ\mathrm{C}$ with indoor $20\,^\circ\mathrm{C}$, and radiators sized for $70\,^\circ\mathrm{C}$ flow from a gas boiler. Propose a heat-pump solution. Decide: air or ground source; whether to replace radiators or improve insulation so that a flow temperature of $45$–$50\,^\circ\mathrm{C}$ suffices; the refrigerant; the capacity at design conditions; and estimate the COP at design and the annual electricity using a Carnot fraction of about $0.5$ and a seasonal heat demand of $15\,000\,\mathrm{kWh}$. There is no single answer.
::: solution
One reasoned answer. *Flow temperature first*: at $70\,^\circ\mathrm{C}$ flow and $-5\,^\circ\mathrm{C}$ outdoor, an air-source unit would condense at about $75\,^\circ\mathrm{C}$ and evaporate at about $-12\,^\circ\mathrm{C}$: Carnot COP $348/87 = 4.0$, real about $2.0$. Radiator output scales roughly as $(\Delta T_\text{mean})^{1.3}$; halving the radiator-to-room temperature difference cuts the output to about $0.5^{1.3} = 0.41$ of its former value, so upsizing some radiators and cutting the heat loss by insulation and draught-proofing (say to $8\,\mathrm{kW}$) allows $50\,^\circ\mathrm{C}$ flow.

*Then the COP*: condensing at $55\,^\circ\mathrm{C}$, evaporating at $-12\,^\circ\mathrm{C}$: Carnot $328/67 = 4.9$, real about $2.4$ at design. Over the season the average outdoor temperature is near $5\,^\circ\mathrm{C}$ and the flow temperature can be weather-compensated down to $35$–$40\,^\circ\mathrm{C}$, so a seasonal COP near $3$ is realistic; ground-source (evaporating near $-3\,^\circ\mathrm{C}$ all winter) would reach about $3.5$–$4$ at higher installation cost.

*Electricity*: $15\,000/3 = 5000\,\mathrm{kWh}$ a year (air source) or about $4000\,\mathrm{kWh}$ (ground source). *Refrigerant*: R-290 suits the higher flow temperatures (modest discharge temperature, GWP 3) in a monobloc unit outdoors, which keeps the flammable charge outside; R-32 is the common alternative. *Capacity*: about $8\,\mathrm{kW}$ at $-5\,^\circ\mathrm{C}$, checking the manufacturer's capacity at that temperature (air-source capacity falls in the cold), with a small electric backup or the old boiler for rare extremes. Discuss noise, space for a hot-water cylinder and running cost with the local electricity-to-gas price ratio.
:::
:::
