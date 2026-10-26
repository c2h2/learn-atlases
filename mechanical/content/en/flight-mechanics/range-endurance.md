An airliner on a long flight carries a quarter or more of its take-off mass as fuel, and a light aircraft's tanks decide whether a cross-country trip needs a stop. Two questions follow: how far can the aircraft fly on a given amount of fuel (its **range**), and how long can it stay airborne (its **endurance**)? Because the aircraft gets lighter as it burns fuel, both answers come from integrating the fuel flow over the flight, and the result — the **Breguet range equation** — is one of the most used formulas in aircraft design. It shows that range depends on three numbers that belong to three different disciplines: the aerodynamic efficiency $L/D$, the engine's fuel consumption, and the structural efficiency, expressed through the ratio of take-off to landing weight.

This lesson builds on the drag polar, the minimum-drag and minimum-power conditions and the two example aircraft of [[flight-mechanics/steady-flight-performance]]. How engines produce thrust and why their fuel consumption is what it is belongs to [[propulsion/thrust-efficiency]] and [[propulsion/gas-turbine-cycles]].

## Fuel consumption {#sec-fuel}

A jet engine produces thrust, and its fuel consumption scales with the thrust; a piston engine (or turboprop) produces shaft power, and its fuel consumption scales with the power. It is convenient to measure the fuel flow by its **weight** rate, so that it can be subtracted directly from the aircraft weight.

::: definition Specific fuel consumption {#def-sfc}
- The **thrust-specific fuel consumption** $c_T$ of a jet engine is the weight of fuel burned per unit time per unit thrust:
$$
\dot W_f = c_T\,T,\qquad [c_T] = \mathrm{N\,s^{-1}/N} = \mathrm{s^{-1}} .
$$
- The **power-specific fuel consumption** $c_P$ of a piston or turboprop engine is the weight of fuel burned per unit of shaft energy:
$$
\dot W_f = c_P\,P_{\text{shaft}},\qquad [c_P] = \mathrm{N/J} = \mathrm{m^{-1}} .
$$
The mass-based figures used in engine data sheets are $c_T/g$ (in $\mathrm{mg\,N^{-1}\,s^{-1}}$) and $c_P/g$ (the **brake specific fuel consumption**, BSFC, in $\mathrm{kg/(kW\,h)}$).
:::

Industry still quotes $c_T$ in "pounds of fuel per pound of thrust per hour", which is simply $c_T$ in $\mathrm{h^{-1}}$. Current high-bypass turbofans in cruise have $c_T \approx 0.5$–$0.6\ \mathrm{h^{-1}}$ (as of 2026); $0.55\ \mathrm{h^{-1}} = 1.528\times10^{-4}\ \mathrm{s^{-1}}$, or $15.6\ \mathrm{mg\,N^{-1}\,s^{-1}}$. A light-aircraft piston engine at lean cruise has a BSFC of about $0.25\ \mathrm{kg/(kW\,h)}$, i.e. $c_P = 0.25 \times 9.80665/(3.6\times10^{6}) = 6.81\times10^{-7}\ \mathrm{m^{-1}}$. A propeller converts shaft power into thrust power with efficiency $\eta_p$: $TV = \eta_pP_{\text{shaft}}$.

::: warning Mass, weight and hours
Specific fuel consumptions appear in at least four unit systems, and an error of $g = 9.81$ or $3600$ is the most common mistake in range calculations. Convert $c_T$ to $\mathrm{s^{-1}}$ (weight basis) and $c_P$ to $\mathrm{m^{-1}}$ (weight basis) before substituting, and check the units of the final answer: Breguet's range must come out in metres and the endurance in seconds. A sanity check that catches most slips: a narrow-body airliner flies about $5000\ \mathrm{km}$ on about $12$–$15\ \mathrm{t}$ of fuel; a light aircraft about $1000\ \mathrm{km}$ on $100\ \mathrm{kg}$.
:::

## The Breguet range equation for jets {#sec-jet-range}

During cruise the aircraft is in steady level flight at each instant, so $L = W$ and $T = D$. The weight falls at the rate the fuel is burned:
$$
\frac{\mathrm{d}W}{\mathrm{d}t} = -\dot W_f = -c_TT = -c_TD = -c_T\frac{W}{L/D}.
$$ {#eq-dwdt}
The distance flown in time $\mathrm{d}t$ is $\mathrm{d}x = V\,\mathrm{d}t$, so
$$
\mathrm{d}x = -\frac{V}{c_T}\,\frac{L}{D}\,\frac{\mathrm{d}W}{W} .
$$ {#eq-dx}
The **specific air range** $-\mathrm{d}x/\mathrm{d}W = V(L/D)/(c_TW)$ is the distance per unit weight of fuel at the current weight; the range is its integral from the initial weight $W_0$ to the final weight $W_1$. How the integral comes out depends on what the pilot holds constant as the weight falls.

::: proposition Breguet range and endurance for jet aircraft {#prop-breguet-jet}
If the true airspeed $V$, the lift-to-drag ratio $L/D$ and the thrust-specific fuel consumption $c_T$ are constant during cruise, the range and endurance are
$$
R = \frac{V}{c_T}\,\frac{L}{D}\,\ln\frac{W_0}{W_1},\qquad
E = \frac{1}{c_T}\,\frac{L}{D}\,\ln\frac{W_0}{W_1} .
$$ {#eq-breguet-jet}
Constant $V$ and constant $L/D$ (that is, constant $C_L$) require the density to fall in proportion to the weight, so the aircraft drifts upward as it burns fuel: the **cruise-climb**.
:::

::: proof
Integrate [[#eq-dx]] from $W_0$ to $W_1$ with $V$, $L/D$ and $c_T$ outside the integral: $R = (V/c_T)(L/D)\int_{W_1}^{W_0}\mathrm{d}W/W = (V/c_T)(L/D)\ln(W_0/W_1)$. For endurance, $\mathrm{d}t = \mathrm{d}x/V$, so the factor $V$ drops out. For the flight condition: constant $L/D$ on a fixed polar means constant $C_L$; $W = \tfrac12\rho V^2SC_L$ with $V$ and $C_L$ constant requires $\rho \propto W$. Assumptions: quasi-steady level flight ($L = W$, $T = D$, the climb angle of the cruise-climb being negligible), fuel is the only weight lost, $c_T$ independent of thrust setting and altitude, no wind.
:::

The equation separates the three disciplines exactly: $V(L/D)$ (more precisely $M(L/D)$, since at a fixed Mach number the $c_T$ of a turbofan varies roughly as the square root of the ambient temperature, as the speed of sound does) for the aerodynamicist, $1/c_T$ for the engine designer, and $\ln(W_0/W_1)$ for the structures designer, since every kilogram of structure saved can be fuel instead.

::: example Range of the jet transport {#ex-jet-range}
The jet transport of [[flight-mechanics/steady-flight-performance]] starts cruise at $70\,000\ \mathrm{kg}$ at $11\ \mathrm{km}$ and Mach $0.78$ with $12\,000\ \mathrm{kg}$ of usable cruise fuel, and $c_T = 0.55\ \mathrm{h^{-1}}$. Find the cruise-climb range and endurance, and the altitude at the end of cruise.
::: solution
From [[flight-mechanics/steady-flight-performance#ex-jet-md]]: $V = 230.15\ \mathrm{m/s}$, $C_L = 0.5809$ and $L/D = 17.02$ at the start of cruise; the cruise-climb holds these values. With $c_T = 0.55/3600 = 1.528\times10^{-4}\ \mathrm{s^{-1}}$ and $\ln(70/58) = 0.18805$:
$$
R = \frac{230.15}{1.528\times10^{-4}} \times 17.02 \times 0.18805 = 4.821\times10^{6}\ \mathrm{m} = 4821\ \mathrm{km},
$$
$$
E = \frac{R}{V} = \frac{4.821\times10^{6}}{230.15} = 20\,950\ \mathrm{s} = 5.82\ \mathrm{h}.
$$
At the end the density must be $0.3639 \times 58/70 = 0.3015\ \mathrm{kg/m^3}$, which in the isothermal layer is at $12.19\ \mathrm{km}$: the aircraft has drifted up about $1200\ \mathrm{m}$. Sanity check: about $4800\ \mathrm{km}$ on $12\ \mathrm{t}$ of fuel matches the warning above; and the fuel burned per hour, $12\,000/5.82 = 2060\ \mathrm{kg/h}$, equals $c_TD/g$ averaged over the flight ($c_T D/g$ at the start is $1.528\times10^{-4} \times 40\,340/9.807 \times 3600 = 2263\ \mathrm{kg/h}$, falling in proportion to weight to $1875\ \mathrm{kg/h}$).
:::
:::

### Other cruise programmes

Air traffic control rarely allows a continuous cruise-climb; airliners cruise at constant flight levels and climb in steps of $600\ \mathrm{m}$ ($2000\ \mathrm{ft}$) as they get lighter. Two constant-altitude programmes can be integrated in closed form.

**Constant altitude, constant $C_L$.** Then $L/D$ is constant but the speed must fall as $V = \sqrt{2W/(\rho SC_L)}$. Substituting into [[#eq-dx]] and integrating $W^{-1/2}\,\mathrm{d}W$:
$$
R = \frac{2}{c_T}\sqrt{\frac{2}{\rho S}}\,\frac{\sqrt{C_L}}{C_D}\left(\sqrt{W_0} - \sqrt{W_1}\right).
$$ {#eq-range-const-h}
**Constant altitude, constant speed.** Then $C_L$ falls with weight, $L/D$ changes, and the integral gives an arctangent formula ([[#exr-const-speed]] derives it). Both constant-altitude programmes give slightly less range than the cruise-climb, because they move the aircraft away from its best $C_L$ or speed as weight falls.

::: example Comparing cruise programmes {#ex-programmes}
Repeat [[#ex-jet-range]] for the two constant-altitude programmes at $11\ \mathrm{km}$, starting at the same condition.
::: solution
*Constant altitude and $C_L$:* with $\rho = 0.3639$, $S = 122.6$, $C_L = 0.5809$, $C_D = 0.03413$, $\sqrt{W_0} = \sqrt{686\,466} = 828.53$ and $\sqrt{W_1} = \sqrt{568\,786} = 754.18\ \mathrm{N^{1/2}}$:
$$
R = \frac{2}{1.528\times10^{-4}}\sqrt{\frac{2}{0.3639 \times 122.6}}\;\frac{\sqrt{0.5809}}{0.03413}\;(828.53 - 754.18) = 4.602\times10^{6}\ \mathrm{m}.
$$
The speed falls from $230$ to $\sqrt{58/70} \times 230.15 = 209.5\ \mathrm{m/s}$.

*Constant altitude and speed:* now $q = 9639\ \mathrm{Pa}$ is fixed and $D = qSC_{D0} + KW^2/(qS)$ falls with the weight. Integrating $\mathrm{d}x = -V\,\mathrm{d}W/(c_TD)$ (in closed form, [[#exr-const-speed]], or numerically) gives $R = 4718\ \mathrm{km}$. The lift coefficient falls from $0.581$ to $0.481$, moving *away* from $C_L^\ast = 0.691$, so $L/D$ drops from $17.02$ to $16.20$ during the cruise.

| programme | range / km |
|---|---|
| cruise-climb (Breguet) | 4821 |
| constant altitude, constant speed | 4718 |
| constant altitude, constant $C_L$ | 4602 |

Sanity check: the three agree within $5\,\%$, the cruise-climb is best, and the constant-$C_L$ programme is worst here because it gives away speed. Step climbs recover most of the difference.
:::
:::

## Best speeds for range and endurance {#sec-best-speeds}

[[#eq-breguet-jet]] suggests flying at $(L/D)_{\max}$, but for a jet the range contains $V(L/D)$, and a faster speed at slightly lower $L/D$ wins.

::: proposition Best lift coefficients for range and endurance {#prop-best-cl}
For a parabolic polar $C_D = C_{D0} + KC_L^2$ at a given weight and altitude:

| aircraft | maximum endurance | maximum range |
|---|---|---|
| jet ($c_T$ constant) | max $C_L/C_D$: $C_L = \sqrt{C_{D0}/K}$, at $V_{md}$ | max $\sqrt{C_L}/C_D$: $C_L = \sqrt{C_{D0}/(3K)}$, at $3^{1/4}V_{md} = 1.316\,V_{md}$ |
| propeller ($c_P$, $\eta_p$ constant) | max $C_L^{3/2}/C_D$: $C_L = \sqrt{3C_{D0}/K}$, at $V_{mp} = 0.760\,V_{md}$ | max $C_L/C_D$: $C_L = \sqrt{C_{D0}/K}$, at $V_{md}$ |

At the jet best-range condition $C_D = \tfrac43C_{D0}$ and $L/D = \tfrac{\sqrt3}{2}(L/D)_{\max} = 0.866\,(L/D)_{\max}$.
:::

::: proof
*Jet endurance:* the fuel flow is $c_TD$, least at minimum drag. *Jet range:* the specific air range is $V/(c_TD)$; with $V = \sqrt{2W/(\rho SC_L)}$ and $D = WC_D/C_L$, $V/D \propto C_L^{-1/2}C_L/C_D = \sqrt{C_L}/C_D$. Maximise $\tfrac12\ln C_L - \ln(C_{D0} + KC_L^2)$: $\dfrac{1}{2C_L} = \dfrac{2KC_L}{C_{D0} + KC_L^2}$, so $C_{D0} = 3KC_L^2$, $C_L = \sqrt{C_{D0}/(3K)}$ and $C_D = C_{D0} + C_{D0}/3$. Then $L/D = \sqrt{C_{D0}/(3K)}/(\tfrac43C_{D0}) = \tfrac{\sqrt3}{4}\cdot\tfrac{1}{\sqrt{KC_{D0}}} = \tfrac{\sqrt3}{2}(L/D)_{\max}$, and the speed ratio is $(C_L^\ast/C_L)^{1/2} = 3^{1/4}$.

*Propeller:* the fuel flow is $c_PP_{\text{shaft}} = c_PDV/\eta_p$. Endurance requires least power $DV$, which is [[flight-mechanics/steady-flight-performance#prop-min-power]]: $C_L = \sqrt{3C_{D0}/K}$. Range requires least fuel per unit distance, $c_PD/\eta_p$, i.e. least drag: $(L/D)_{\max}$.
:::

The roles are "shifted" between the two engine types because a propeller aircraft's fuel flow follows power and a jet's follows thrust. For the light aircraft the best-range speed at mid-cruise mass ($1040\ \mathrm{kg}$) is $V_{md} = 37.0\ \mathrm{m/s}$ at sea level — so slow that nobody flies it; real light aircraft cruise at $55$–$65\ \mathrm{m/s}$, accepting an $L/D$ of about $11$ instead of $12.5$ for a much shorter trip. For the jet transport at $11\ \mathrm{km}$, $1.316\,V_{md} = 277.7\ \mathrm{m/s}$, Mach $0.94$: beyond the drag rise, so the parabolic polar is not valid there, and the real best-range Mach number of a transport (about $0.76$–$0.80$) is set by the onset of wave drag. Put the other way round: at Mach $0.78$ the parabolic polar would place the best-range lift coefficient $0.399$ at a much lower altitude ([[#exr-altitude]]), where the engines are less efficient.

::: widget plot
f: sqrt(x)/(0.02 + 0.04188*x^2)/17.28/1.37; x/(0.02 + 0.04188*x^2)/17.28; x^1.5/(0.02 + 0.04188*x^2)/17.28/0.9
x: 0.05, 1.6
y: 0, 1.1
vlines: 0.399; 0.691; 1.197
labels: \sqrt{C_L}/C_D\ \text{(jet range)}; C_L/C_D\ \text{(jet endurance, prop range)}; C_L^{3/2}/C_D\ \text{(prop endurance)}
caption: The three efficiency measures for the jet transport's polar, each scaled so that its peak is near 1, against $C_L$. The dashed lines mark the peaks at $C_L = 0.399$, $0.691$ and $1.197$, in the ratio $1 : \sqrt3 : 3$. Each curve is flat near its peak: flying $10\,\%$ off the optimum lift coefficient costs well under $1\,\%$ — which is why airlines can fly faster than the best-range speed for a small fuel penalty.
:::

## Propeller aircraft {#sec-prop}

::: proposition Breguet range and endurance for propeller aircraft {#prop-breguet-prop}
With $\eta_p$, $c_P$ and $L/D$ constant, the range is
$$
R = \frac{\eta_p}{c_P}\,\frac{L}{D}\,\ln\frac{W_0}{W_1},
$$ {#eq-breguet-prop}
independent of the speed and altitude at which the chosen $C_L$ is flown. At constant altitude and constant $C_L$ the endurance is
$$
E = \frac{\eta_p}{c_P}\,\frac{C_L^{3/2}}{C_D}\,\sqrt{2\rho S}\,\left(W_1^{-1/2} - W_0^{-1/2}\right),
$$ {#eq-endurance-prop}
which is greatest at sea level and at the minimum-power condition.
:::

::: proof
The weight falls as $\mathrm{d}W/\mathrm{d}t = -c_PP_{\text{shaft}} = -c_PDV/\eta_p$, so $\mathrm{d}x = V\,\mathrm{d}t = -\eta_p\,\mathrm{d}W/(c_PD) = -(\eta_p/c_P)(L/D)\,\mathrm{d}W/W$, which integrates to [[#eq-breguet-prop]]. The speed has cancelled: a propeller aircraft's range depends on $L/D$, not $V(L/D)$. For endurance, $\mathrm{d}t = -\eta_p\,\mathrm{d}W/(c_PDV)$ with $DV = W(C_D/C_L)\sqrt{2W/(\rho SC_L)}$:
$$
\mathrm{d}t = -\frac{\eta_p}{c_P}\,\frac{C_L^{3/2}}{C_D}\,\sqrt{\frac{\rho S}{2}}\,W^{-3/2}\,\mathrm{d}W,
$$
and $\int_{W_1}^{W_0}W^{-3/2}\,\mathrm{d}W = 2(W_1^{-1/2} - W_0^{-1/2})$, which gives [[#eq-endurance-prop]]. Assumptions: as for the jet, plus constant propeller efficiency, which is optimistic at the low speeds of maximum endurance.
:::

::: example Range and endurance of the light aircraft {#ex-la-range}
The light aircraft carries $120\ \mathrm{kg}$ of usable fuel at a take-off mass of $1100\ \mathrm{kg}$. With BSFC $= 0.25\ \mathrm{kg/(kW\,h)}$ and $\eta_p = 0.75$, find its maximum still-air range and its maximum endurance at sea level and at $2000\ \mathrm{m}$.
::: solution
$c_P = 6.810\times10^{-7}\ \mathrm{m^{-1}}$, $(L/D)_{\max} = 12.53$, $\ln(1100/980) = 0.11551$:
$$
R_{\max} = \frac{0.75}{6.810\times10^{-7}} \times 12.53 \times 0.11551 = 1.594\times10^{6}\ \mathrm{m} = 1594\ \mathrm{km}.
$$
For endurance, $(C_L^{3/2}/C_D)_{\max}$ at $C_L = \sqrt{3 \times 0.030/0.05305} = 1.3025$: $1.3025^{1.5}/0.120 = 12.39$. With $W_1 = 980g = 9610\ \mathrm{N}$ and $W_0 = 10\,787\ \mathrm{N}$, $W_1^{-1/2} - W_0^{-1/2} = 0.010201 - 0.009628 = 5.725\times10^{-4}\ \mathrm{N^{-1/2}}$. At sea level, $\sqrt{2 \times 1.225 \times 16.2} = 6.300$:
$$
E = \frac{0.75}{6.810\times10^{-7}} \times 12.39 \times 6.300 \times 5.725\times10^{-4} = 4.92\times10^{4}\ \mathrm{s} = 13.7\ \mathrm{h},
$$
and at $2000\ \mathrm{m}$ it is smaller by $\sqrt{0.8216}$: $12.4\ \mathrm{h}$. Sanity check: at minimum power ($28.7\ \mathrm{kW}$ thrust power, $38.3\ \mathrm{kW}$ shaft) the fuel flow is $0.25 \times 38.3 = 9.6\ \mathrm{kg/h}$, and $120/9.6 = 12.5\ \mathrm{h}$ at the initial weight — consistent. Real light aircraft do far worse (about $5$–$6\ \mathrm{h}$ and $1000$–$1200\ \mathrm{km}$), because they cruise at $60\,\%$–$75\,\%$ power, keep a fuel reserve, and their engines and propellers are less efficient at the very low power and speed of the ideal.
:::
:::

## Wind, reserves and the mission {#sec-wind}

In a wind, what matters is distance over the ground per unit of fuel. With a headwind component $V_w$ the ground speed is $V - V_w$, and the specific ground range is $(V - V_w)/\dot W_f$. The best speed is no longer the still-air value: into a headwind it increases (less time is spent fighting the wind), and with a tailwind it decreases. A common rule of thumb is to add about a quarter to a half of the headwind component to the still-air best-range speed.

::: example Best-range speed into a headwind {#ex-wind}
The light aircraft at a mass of $1040\ \mathrm{kg}$ flies at sea level into a $10\ \mathrm{m/s}$ headwind. Find the speed that maximises the ground distance per kilogram of fuel, and compare with flying the still-air best-range speed.
::: solution
The fuel mass flow is $\dot m_f = c_P\,DV/(\eta_p g)$ with $D(V)$ from the polar, $W = 10\,199\ \mathrm{N}$. The specific ground range $(V - 10)/\dot m_f$, maximised numerically, peaks at $V = 40.2\ \mathrm{m/s}$ with $9.83\ \mathrm{km/kg}$. At the still-air optimum $V_{md} = 37.0\ \mathrm{m/s}$ it gives $9.68\ \mathrm{km/kg}$, and in still air at $37.0\ \mathrm{m/s}$ the figure is $13.27\ \mathrm{km/kg}$. With a $10\ \mathrm{m/s}$ tailwind the optimum moves down to $35.0\ \mathrm{m/s}$ ($16.96\ \mathrm{km/kg}$). Sanity check: the speed correction is $+3.2\ \mathrm{m/s}$ for $10\ \mathrm{m/s}$ of headwind, within the rule of thumb, and the gain from correcting the speed ($1.5\,\%$) is small compared with the loss to the wind itself ($26\,\%$).
:::
:::

::: widget plot
f: (x - w)/(6.81e-7*x*(0.5*1.225*x^2*16.2*0.030 + 0.05305*10199^2/(0.5*1.225*x^2*16.2))/0.75/9.80665)/1000
x: 25, 80
y: 0, 20
sliders: w=0:-20:20:1
labels: \text{km per kg of fuel}
caption: Specific ground range of the light aircraft (km per kg of fuel) at sea level and $1040\ \mathrm{kg}$ against true airspeed (m/s), for a headwind component $w$ (m/s; negative for a tailwind). With $w = 0$ the peak is at $V_{md} = 37\ \mathrm{m/s}$. Increase the headwind and the peak moves to higher speed and drops; with a tailwind it moves lower. Notice how flat the curve is at its top in still air.
:::

A real mission adds taxi, take-off, climb, descent and landing fuel, and regulations require reserves — for example, for airline flights, contingency fuel, fuel to fly to an alternate aerodrome, and final reserve fuel for a period of holding (under EU rules, 30 minutes of holding for turbine-engined aeroplanes). In conceptual design (Raymer, Anderson) each segment is given a weight fraction $W_{i+1}/W_i$, with the cruise and loiter fractions from the Breguet equations and the others from historical data, and the product of the fractions gives the total fuel fraction. Inverting [[#eq-breguet-jet]] gives the cruise fraction for a required range:
$$
\frac{W_1}{W_0} = \exp\left(-\frac{R\,c_T}{V\,(L/D)}\right).
$$ {#eq-fuel-fraction}

::: example Fuel for a 5000 km cruise {#ex-fuel}
How much fuel does the jet transport need for a cruise-climb of $5000\ \mathrm{km}$ at the conditions of [[#ex-jet-range]], starting at $70\,000\ \mathrm{kg}$?
::: solution
$Rc_T/(V\,L/D) = 5.0\times10^{6} \times 1.528\times10^{-4}/(230.15 \times 17.02) = 0.19501$, so $W_1/W_0 = e^{-0.19501} = 0.8228$ and the cruise fuel is $70\,000 \times (1 - 0.8228) = 12\,400\ \mathrm{kg}$. Sanity check: $4821\ \mathrm{km}$ needed $12\,000\ \mathrm{kg}$, an average of $2.49\ \mathrm{kg/km}$. The extra $179\ \mathrm{km}$ costs only $403\ \mathrm{kg}$, $2.25\ \mathrm{kg/km}$, because both flights start at $70\ \mathrm{t}$ and the extra distance is flown at the end, when the aircraft weighs about $57.6\ \mathrm{t}$ and burns $c_TW/(g\,V\,L/D) = 1.528\times10^{-4} \times 57\,600/(230.15 \times 17.02) = 2.25\ \mathrm{kg/km}$.
:::
:::

### The payload–range diagram {#sec-payload-range}

An airline does not ask "how far can the aircraft fly?" but "how far can it fly *with this payload*?". Three weight limits answer the question: the **maximum take-off weight** (MTOW, set by structure and performance), the **maximum zero-fuel weight** (MZFW, set by wing bending — fuel in the wing relieves the root bending moment, payload in the fuselage does not) and the **fuel capacity** of the tanks. With the **operating empty weight** (OEW: structure, engines, systems, crew, catering) fixed, the take-off weight is OEW + payload + fuel, and the **payload–range diagram** plots the payload against the range available with it.

::: algorithm Constructing the payload–range diagram {#alg-payload-range}
1. **Maximum payload** $= \text{MZFW} - \text{OEW}$. Fill fuel until take-off weight reaches MTOW: fuel $= \text{MTOW} - \text{MZFW}$. Compute the range with [[#eq-breguet-jet]] from $W_0 = \text{MTOW}$ to $W_1 = \text{MTOW} - \text{cruise fuel}$. This is point A; below it the payload line is horizontal.
2. **Tanks full at MTOW.** Trade payload for fuel at constant MTOW until the tanks are full: payload $= \text{MTOW} - \text{OEW} - \text{fuel capacity}$. Point B; between A and B the range grows only through the logarithm.
3. **Ferry range.** Remove the remaining payload with tanks full: take-off weight falls below MTOW, $W_1$ falls with it, and the range grows again. Point C, zero payload.
4. In every case subtract the reserve and the take-off, climb and descent allowances from the fuel before applying Breguet to the cruise.
:::

For the jet transport with MTOW $78\ \mathrm{t}$, MZFW $60\ \mathrm{t}$, OEW $42\ \mathrm{t}$, fuel capacity $21\ \mathrm{t}$, a combined reserve and allowance of $3\ \mathrm{t}$, and the cruise of [[#ex-jet-range]] ($V(L/D)/c_T = 25\,640\ \mathrm{km}$, assumed constant):

| point | payload / t | fuel / t | $W_0$ / t | $W_1$ / t | range / km |
|---|---|---|---|---|---|
| A (max payload) | 18 | 18 | 78 | 63 | $25\,640\ln(78/63) = 5476$ |
| B (full tanks at MTOW) | 15 | 21 | 78 | 60 | $25\,640\ln(78/60) = 6727$ |
| C (ferry) | 0 | 21 | 63 | 45 | $25\,640\ln(63/45) = 8626$ |

The diagram shows why a fuel-efficient engine or a lighter structure is worth so much: one tonne less OEW is one tonne more payload at every range up to point A, and beyond A it buys range at the rate given by the slope of segment AB: $(6727 - 5476)/3 = 417\ \mathrm{km}$, or about $8\,\%$ of the range at A, per tonne of payload given up.

::: quiz
A turboprop and a turbofan aircraft both have $(L/D)_{\max} = 16$. Which statement is correct for still-air cruise at a fixed altitude?
- [ ] Both should fly at $(L/D)_{\max}$ for best range.
- [x] The turboprop should fly at $(L/D)_{\max}$; the turbofan at a higher speed, where $L/D \approx 13.9$.
- [ ] The turbofan should fly at $(L/D)_{\max}$; the turboprop at the minimum-power speed.
- [ ] Both should fly at the minimum-power speed.
::: solution
For the propeller aircraft the fuel flow follows power and the range is $(\eta_p/c_P)(L/D)\ln(W_0/W_1)$, so $(L/D)_{\max}$ is best. For the jet the range contains $V(L/D)$; the optimum is $\sqrt{C_L}/C_D$ maximum, at $3^{1/4}V_{md}$ with $L/D = 0.866 \times 16 = 13.9$.
:::
:::

::: history
The range equation carries the name of the French aircraft builder Louis Breguet, but the earliest published derivation usually cited is J. G. Coffin's "A study of airplane ranges and useful loads", NACA Report No. 69, issued with the NACA's fifth annual report (for 1919); how Breguet's name became attached to it is not clearly documented. The equation's split of range into aerodynamic ($L/D$), propulsive ($\eta_p/c_P$ or $V/c_T$) and structural ($\ln W_0/W_1$) factors has guided design ever since, from the long-distance record flights of the 1920s and 1930s to the sizing of every modern airliner, in which the improvement of each factor — supercritical wings and winglets, high-bypass turbofans, composite structures — can be read directly as a percentage gain in range or fuel burn.
:::

::: summary
- Jet fuel flow $= c_TT$ (weight basis, $c_T$ in $\mathrm{s^{-1}}$); propeller fuel flow $= c_PP_{\text{shaft}}$ ($c_P$ in $\mathrm{m^{-1}}$), with $TV = \eta_pP_{\text{shaft}}$.
- Jet: $R = (V/c_T)(L/D)\ln(W_0/W_1)$, $E = (1/c_T)(L/D)\ln(W_0/W_1)$ (cruise-climb at constant $V$, $C_L$).
- Propeller: $R = (\eta_p/c_P)(L/D)\ln(W_0/W_1)$; endurance $\propto (C_L^{3/2}/C_D)\sqrt\rho$, best at low altitude.
- Best $C_L$: jet range $\sqrt{C_{D0}/3K}$ (speed $1.316V_{md}$, $L/D = 0.866(L/D)_{\max}$); jet endurance and propeller range $\sqrt{C_{D0}/K}$; propeller endurance $\sqrt{3C_{D0}/K}$.
- Constant-altitude programmes give a few per cent less range than the cruise-climb; step climbs recover most of it.
- Into a headwind fly faster than the still-air best-range speed; transport cruise speed is in practice set by the drag rise.
:::

## Exercises

::: exercise Converting a fuel consumption {level=1 check="16.4"}
An engine data sheet gives $c_T = 0.58\ \mathrm{lb/(lbf\,h)}$. Express it as a mass flow per unit thrust in $\mathrm{mg\,N^{-1}\,s^{-1}}$. (Enter the value rounded to one decimal place.)
::: solution
Pounds of fuel per pound-force of thrust per hour is weight per weight per hour: $c_T = 0.58\ \mathrm{h^{-1}} = 1.611\times10^{-4}\ \mathrm{s^{-1}}$. The mass basis divides by $g$: $1.611\times10^{-4}/9.80665 = 1.643\times10^{-5}\ \mathrm{kg\,N^{-1}\,s^{-1}} = 16.4\ \mathrm{mg\,N^{-1}\,s^{-1}}$.
:::
:::

::: exercise Jet range {level=1 check="6941"}
A long-range jet cruises at $V = 240\ \mathrm{m/s}$ with $L/D = 18$ and $c_T = 0.50\ \mathrm{h^{-1}}$, burning $20\,\%$ of its initial weight. Find the cruise-climb range. (Enter it in km, rounded to the nearest kilometre.)
::: solution
$c_T = 1.389\times10^{-4}\ \mathrm{s^{-1}}$, $\ln(1/0.8) = 0.22314$: $R = (240/1.389\times10^{-4}) \times 18 \times 0.22314 = 6.941\times10^{6}\ \mathrm{m} = 6941\ \mathrm{km}$.
:::
:::

::: exercise Propeller range {level=1 check="3113"}
A turboprop has $\eta_p = 0.80$, BSFC $= 0.23\ \mathrm{kg/(kW\,h)}$ and cruises at $L/D = 15$, burning $15\,\%$ of its initial weight. Find the range. (Enter it in km, rounded to the nearest kilometre.)
::: solution
$c_P = 0.23 \times 9.80665/3.6\times10^{6} = 6.265\times10^{-7}\ \mathrm{m^{-1}}$; $\ln(1/0.85) = 0.16252$; $R = (0.80/6.265\times10^{-7}) \times 15 \times 0.16252 = 3.113\times10^{6}\ \mathrm{m} = 3113\ \mathrm{km}$.
:::
:::

::: exercise Fuel fraction for a mission {level=2 check="0.111"}
A jet with $L/D = 17$ at $V = 230\ \mathrm{m/s}$ and $c_T = 0.55\ \mathrm{h^{-1}}$ must cruise $3000\ \mathrm{km}$. What fraction of the weight at the start of cruise is burned in the cruise? (Enter the fraction rounded to three decimal places.)
::: solution
$Rc_T/(V\,L/D) = 3.0\times10^{6} \times 1.528\times10^{-4}/(230 \times 17) = 0.11720$; $W_1/W_0 = e^{-0.11720} = 0.8894$, so $1 - 0.8894 = 0.111$ of the initial weight.
:::
:::

::: exercise Holding endurance {level=2 check="1.85"}
The jet transport arrives at $70\,000\ \mathrm{kg}$ and must hold until it has burned down to $66\,000\ \mathrm{kg}$, flying at $(L/D)_{\max} = 17.28$ with $c_T = 0.55\ \mathrm{h^{-1}}$. How long can it hold? (Enter the time in hours, rounded to two decimal places.)
::: solution
$E = (1/c_T)(L/D)\ln(W_0/W_1) = (17.28/0.55\ \mathrm{h^{-1}}) \times \ln(70/66) = 31.42 \times 0.05884 = 1.85\ \mathrm{h}$. Holding at $V_{md}$ is independent of altitude in this model; in practice jets hold high, where $c_T$ is lower.
:::
:::

::: exercise Lift-to-drag ratio at jet best range {level=2 check="0.866"}
Find the ratio of the lift-to-drag ratio at the jet best-range condition to $(L/D)_{\max}$. (Enter the ratio rounded to three decimal places.)
::: solution
At $C_L = \sqrt{C_{D0}/(3K)}$, $KC_L^2 = C_{D0}/3$ and $C_D = \tfrac43C_{D0}$; $L/D = \sqrt{C_{D0}/(3K)}/(\tfrac43C_{D0}) = \tfrac{3}{4\sqrt3}/\sqrt{KC_{D0}}$. Dividing by $(L/D)_{\max} = 1/(2\sqrt{KC_{D0}})$ gives $\tfrac{3}{2\sqrt3} = \tfrac{\sqrt3}{2} = 0.866$.
:::
:::

::: exercise Cruise-climb altitude change {level=2}
Show that in a cruise-climb in the isothermal stratosphere the altitude gained while the weight falls from $W_0$ to $W_1$ is $\Delta h = (RT_{11}/g_0)\ln(W_0/W_1)$, and evaluate it for [[#ex-jet-range]].
::: solution
The cruise-climb holds $\rho \propto W$. In the isothermal layer $\rho = \rho_{11}\exp[-g_0(h - h_{11})/(RT_{11})]$ ([[flight-mechanics/steady-flight-performance#eq-stratosphere]]), so $\rho_0'/\rho_1' = \exp[g_0\Delta h/(RT_{11})] = W_0/W_1$ and $\Delta h = (RT_{11}/g_0)\ln(W_0/W_1)$. With $RT_{11}/g_0 = 287.05 \times 216.65/9.80665 = 6342\ \mathrm{m}$ (the scale height) and $\ln(70/58) = 0.18805$: $\Delta h = 1193\ \mathrm{m}$, in agreement with the $12.19\ \mathrm{km}$ found in the example.
:::
:::

::: exercise Constant-speed cruise {#exr-const-speed level=3}
For a jet at constant altitude and constant true airspeed (so constant $q$), derive the closed-form range by integrating $\mathrm{d}x = -V\,\mathrm{d}W/(c_TD(W))$ with the parabolic polar, and evaluate it for the jet transport at $11\ \mathrm{km}$ and Mach $0.78$ from $70\,000$ to $58\,000\ \mathrm{kg}$ to confirm the $4718\ \mathrm{km}$ of [[#ex-programmes]].
::: solution
With $D = qSC_{D0} + KW^2/(qS)$ and $q$ constant, $\mathrm{d}x = -\dfrac{V}{c_T}\dfrac{\mathrm{d}W}{qSC_{D0} + KW^2/(qS)}$. Put $u = W\sqrt{K/C_{D0}}/(qS)$, so $\mathrm{d}W = qS\sqrt{C_{D0}/K}\,\mathrm{d}u$ and the denominator is $qSC_{D0}(1 + u^2)$:
$$
R = \frac{V}{c_T\sqrt{KC_{D0}}}\left[\tan^{-1}u_0 - \tan^{-1}u_1\right],\qquad u = \frac{W}{qS}\sqrt{\frac{K}{C_{D0}}} = \frac{C_L}{C_L^\ast}.
$$
Numbers: $qS = 9639 \times 122.6 = 1.1817\times10^{6}\ \mathrm{N}$; $u_0 = 0.5809/0.6910 = 0.8407$, $u_1 = 0.4813/0.6910 = 0.6965$; $\tan^{-1}0.8407 - \tan^{-1}0.6965 = 0.69904 - 0.60840 = 0.09064$; $V/(c_T\sqrt{KC_{D0}}) = 230.15/(1.528\times10^{-4} \times 0.028942) = 5.205\times10^{7}\ \mathrm{m}$; $R = 4718\ \mathrm{km}$. A numerical integration (for example the trapezoidal rule on 100 weight steps) gives the same value.
:::
:::

::: exercise Choosing a cruise altitude {#exr-altitude level=3 check="8530"}
At what ISA altitude would the jet transport, at $70\,000\ \mathrm{kg}$ and Mach $0.78$, fly at its parabolic-polar best-range lift coefficient $C_L = 0.399$? Discuss whether it should cruise there. (Enter the altitude in m, rounded to the nearest 10 m.)
::: solution
Require $W = \tfrac12\rho(0.78a)^2SC_L$, i.e. $\rho a^2 = 2W/(0.78^2SC_L)$. Since $\rho a^2 = \gamma p$, this is a condition on pressure alone: $p = 2 \times 686\,466/(1.4 \times 0.6084 \times 122.6 \times 0.39897) = 32\,950\ \mathrm{Pa}$, reached at $h = 8530\ \mathrm{m}$. Discussion: at a fixed Mach number, lower altitude raises $q$ and reduces $C_L$ towards the range optimum, but it also raises the speed of sound (true airspeed $+3.6\,\%$) and, more importantly, $c_T$ of a turbofan rises in warmer, denser air and at lower thrust settings, and the fuel penalty usually outweighs the small aerodynamic gain. Airlines cruise at $10$–$12\ \mathrm{km}$, near where $C_L$ is close to the value that maximises $M(L/D)$ for the real polar with compressibility, which is higher than the parabolic $0.399$. A full answer would compute the specific air range with engine data at several altitudes.
:::
:::
