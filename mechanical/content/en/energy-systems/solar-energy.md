Solar energy is the most abundant energy resource on Earth: the solar constant delivers 1361 W/m² at the top of the atmosphere, the photovoltaic effect converts sunlight directly into electricity in semiconductor junctions, and the Shockley-Queisser limit caps single-junction solar cell efficiency at 33.7%. **The engineer who designs a solar energy system without calculating the solar irradiance is not designing a solar energy system; they are guessing.** The solar energy calculation is the reason the engineer can size photovoltaic arrays and solar thermal collectors, and the photovoltaic effect is the reason solar energy is the most abundant energy resource on Earth.

The quantitative tools of solar energy are the **solar constant** (the solar irradiance at the top of the atmosphere), the **photovoltaic effect** (the conversion of sunlight into electricity in a semiconductor), the **Shockley-Queisser limit** (the maximum efficiency of a single-junction solar cell), and the **solar thermal collector** (the device that converts sunlight into heat). The tools are the language in which the solar energy analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways solar energy calculation goes wrong
**Not calculating the solar irradiance.** The engineer who designs a solar energy system without calculating the solar irradiance is not designing a solar energy system; they are guessing. **The solar irradiance is the reason solar energy is designed for the irradiance, not the temperature, and the irradiance is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the tilt angle.** The engineer who designs a solar energy system without checking the tilt angle is not designing a solar energy system; they are guessing. **The tilt angle is the reason solar energy is designed for the tilt, not the azimuth, and the tilt is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the solar cell efficiency.** The engineer who designs a solar energy system without checking the solar cell efficiency is not designing a solar energy system; they are guessing. **The solar cell efficiency is the reason solar energy is designed for the cell, not the module, and the cell is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the fill factor.** The engineer who designs a solar energy system without checking the fill factor is not designing a solar energy system; they are guessing. **The fill factor is the reason solar energy is designed for the fill, not the short-circuit, and the fill is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the open-circuit voltage.** The engineer who designs a solar energy system without checking the open-circuit voltage is not designing a solar energy system; they are guessing. **The open-circuit voltage is the reason solar energy is designed for the voltage, not the current, and the voltage is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the temperature coefficient.** The engineer who designs a solar energy system without checking the temperature coefficient is not designing a solar energy system; they are guessing. **The temperature coefficient is the reason solar energy is designed for the temperature, not the irradiance, and the temperature is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the collector efficiency.** The engineer who designs a solar energy system without checking the collector efficiency is not designing a solar energy system; they are guessing. **The collector efficiency is the reason solar energy is designed for the collector, not the absorber, and the collector is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the heat removal factor.** The engineer who designs a solar energy system without checking the heat removal factor is not designing a solar energy system; they are guessing. **The heat removal factor is the reason solar energy is designed for the removal, not the addition, and the removal is the reason solar energy is the most abundant energy resource on Earth.** **Not checking the incidence angle modifier.** The engineer who designs a solar energy system without checking the incidence angle modifier is not designing a solar energy system; they are guessing. **The incidence angle modifier is the reason solar energy is designed for the incidence, not the refraction, and the incidence is the reason solar energy is the most abundant energy resource on Earth.**
:::

## 1. Solar radiation and photovoltaics

::: definition Solar radiation {#def-solar-radiation}
The **solar radiation** is the electromagnetic energy emitted by the sun, and the solar radiation is the reason the engineer can size photovoltaic arrays and solar thermal collectors.

The **solar constant** is:

$$
G _ { \text{sc } } \; = \; 1 3 6 1 \; \text{W/m}^2
$$

The **extraterrestrial irradiance** on a horizontal surface is:

$$
G _ { 0 } \; = \; G _ { \text{sc } } \, \\left[ 1 + 0 . 0 3 3 \\cos \\left( { \\frac { 3 6 0 n } { 3 6 5 } } \\right) \\right]
$$

where $n$ is the day of the year.

The **declination angle** is:

$$
\delta \; = \; 2 3 . 4 5 ^ { \circ } \, \\sin \\left( { \\frac { 3 6 0 ( 2 8 4 + n ) } { 3 6 5 } } \\right)
$$

The **solar altitude angle** is:

$$
\alpha _ { s } \; = \; \\arcsin ( \\sin \phi \, \\sin \delta + \\cos \phi \, \\cos \delta \, \\cos \omega )
$$

where $\phi$ is the latitude and $\omega$ is the hour angle.

The **clear-sky irradiance** on a tilted surface is:

$$
G _ { T } \; = \; G _ { b } \, \\cos \theta + G _ { d } \, { \\frac { 1 + \\cos \beta } { 2 } } + G _ { 0 } \, \\rho \, { \\frac { 1 - \\cos \beta } { 2 } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Solar constant} & G _ { \text{sc } } & \text{Top-of-atmosphere irradiance} & 1 3 6 1 \ \text{ W/m}^2 \\
\text{Peak sun hours} & \text{PSH} & \text{Equivalent full-power hours} & 3 \text{--} 7 \ \text{ h/day } \\
\text{Declination} & \delta & \text{Sun angle from equator} & - 2 3 . 4 5 \\text{--} + 2 3 . 4 5 \ ^ { \\circ } \\
\text{Optical mass} & \text{AM} & \text{Atmospheric path length} & 1 . 5 \ (\text{standard}) \\
\end{array}
$$

**The solar irradiance is the reason solar energy is designed for the irradiance, not the temperature, and the irradiance is the reason solar energy is the most abundant energy resource on Earth. The engineer who designs a solar energy system without calculating the solar irradiance is not designing a solar energy system; they are guessing.**
:::

::: definition The photovoltaic effect {#def-photovoltaic-effect}
The **photovoltaic effect** is the conversion of sunlight into electricity in a semiconductor p-n junction, and the photovoltaic effect is the reason the engineer can size photovoltaic arrays and solar thermal collectors.

The **short-circuit current** is:

$$
I _ { \text{sc } } \; = \; I _ { L } \; \propto \; G
$$

The **open-circuit voltage** is:

$$
V _ { \text{oc } } \; = \; { \\frac { n k T } { q } } \, \\ln \\left( { \\frac { I _ { L } } { I _ { 0 } } } + 1 \\right)
$$

The **fill factor** is:

$$
\text{FF} \; = \; { \\frac { P _ { \max } } { V _ { \text{oc } } \, I _ { \text{sc } } } } \; = \; { \\frac { V _ { m } \, I _ { m } } { V _ { \text{oc } } \, I _ { \text{sc } } } }
$$

The **solar cell efficiency** is:

$$
\eta _ { \text{cell } } \; = \; { \\frac { P _ { \max } } { G \, A } } \; = \; { \\frac { V _ { \text{oc } } \, I _ { \text{sc } } \, \text{FF} } { G \, A } }
$$

The **Shockley-Queisser limit** is:

$$
\eta _ { \text{SQ } } \; = \; 3 3 . 7 \ \% \quad ( \text{single junction, AM1.5 } )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Short-circuit current} & I _ { \text{sc } } & \text{Current at zero voltage} & \text{Proportional to } G \\
\text{Open-circuit voltage} & V _ { \text{oc } } & \text{Voltage at zero current} & 0 . 6 \text{--} 0 . 7 \ \text{ V (Si } ) \\
\text{Fill factor} & \text{FF} & \text{Maximum power ratio} & 0 . 7 0 \text{--} 0 . 8 5 \\
\text{Cell efficiency} & \eta _ { \text{cell } } & \text{Conversion efficiency} & 1 5 \text{--} 2 7 \ \% \\
\end{array}
$$

**The tilt angle is the reason solar energy is designed for the tilt, not the azimuth, and the tilt is the reason solar energy is the most abundant energy resource on Earth. The engineer who designs a solar energy system without checking the tilt angle is not designing a solar energy system; they are guessing.**
:::

::: widget plot
title: The cell efficiency vs irradiance
f: 20 * (1 - 0.004 * (x - 1000))
x: 200,1200
y: 15,25
labels: eta
caption: The solar cell efficiency against the irradiance with a temperature coefficient of -0.4%/K. **The efficiency decreases with irradiance due to heating, and the efficiency is the reason solar energy is designed for the solar cell efficiency, not the fill factor.** **The solar cell efficiency is the reason solar energy is the most abundant energy resource on Earth.**
:::

::: example PV array sizing {#ex-pv-array-sizing level=3 check="2"}
A building requires 10 kWh/day of electricity. Calculate the PV array size needed in a location with 5 peak sun hours, assuming 15% module efficiency and 80% system losses.

**The required array area is:**

$$
A \; = \; { \\frac { E _ { \text{daily } } } { \eta _ { \text{module } } \\times \eta _ { \text{system } } \\times G _ { \text{peak } } \\times \text{PSH} } }
$$

$$
A \; = \; { \\frac { 1 0 \\times 1 0 0 0 } { 0 . 1 5 \\times 0 . 8 0 \\times 1 0 0 0 \\times 5 } } \; = \; { \\frac { 1 0 { , } 0 0 0 } { 6 0 0 } } \; = \; { \\bf 1 6 . 7 } \; \text{m}^2
$$

**The peak array power is:**

$$
P _ { \text{peak } } \; = \; \eta _ { \text{module } } \\times A \\times G _ { \text{peak } } \; = \; 0 . 1 5 \\times 1 6 . 7 \\times 1 0 0 0 \; = \; { \\bf 2 . 5 } \; \text{kWp }
$$

**The engineer would design the structure for the fill factor, because the fill factor is the reason solar energy is the most abundant energy resource on Earth.**
:::

## 2. Solar thermal systems

::: definition The solar thermal collector {#def-solar-thermal-collector}
The **solar thermal collector** is the device that converts sunlight into heat, and the solar thermal collector is the reason the engineer can size photovoltaic arrays and solar thermal collectors.

The **collector efficiency** is:

$$
\eta _ { \text{collector } } \; = \; F _ { R } \, ( \\tau \\alpha ) \; - \; F _ { R } \, U _ { L } \, { \\frac { T _ { i } - T _ { a } } { G _ { T } } }
$$

where $F _ { R }$ is the heat removal factor, $( \tau \alpha )$ is the transmittance-absorptance product, and $U _ { L }$ is the overall heat loss coefficient.

The **useful heat gain** is:

$$
\dot { Q } _ { u } \; = \; A _ { c } \, [ F _ { R } \, ( \\tau \\alpha ) \, G _ { T } \; - \; F _ { R } \, U _ { L } \, ( T _ { i } - T _ { a } ) ]
$$

The **stagnation temperature** is:

$$
T _ { \text{stag } } \; = \; T _ { a } + { \\frac { ( \\tau \\alpha ) \, G _ { T } } { U _ { L } } }
$$

The **incidence angle modifier** is:

$$
K _ { \theta } \; = \; { \\frac { ( \\tau \\alpha ) _ { \theta } } { ( \\tau \\alpha ) _ { 0 } } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Heat removal factor} & F _ { R } & \text{Collector efficiency factor} & 0 . 7 \text{--} 0 . 9 \\
(\tau \alpha) & (\tau \alpha ) & \text{Transmittance-absorptance} & 0 . 7 \text{--} 0 . 9 \\
\text{Heat loss coeff} & U _ { L } & \text{Overall heat loss} & 3 \text{--} 8 \ \text{ W/(m}^2 \text{K)} \\
\text{Stagnation temp} & T _ { \text{stag } } & \text{Maximum collector temp} & 1 5 0 \text{--} 2 5 0 \ ^ { \circ } \text{C } \\
\end{array}
$$

**The solar cell efficiency is the reason solar energy is designed for the cell, not the module, and the cell is the reason solar energy is the most abundant energy resource on Earth. The engineer who designs a solar energy system without checking the solar cell efficiency is not designing a solar energy system; they are guessing.**
:::

::: definition Solar thermal power plants {#def-solar-thermal-power}
The **solar thermal power plant** concentrates sunlight to produce high-temperature heat for electricity generation, and the solar thermal power plant is the reason the engineer can size photovoltaic arrays and solar thermal collectors.

The **concentration ratio** is:

$$
C \; = \; { \\frac { G _ { \text{concentrated } } } { G _ { \text{direct } } } }
$$

The **Carnot efficiency at concentrated temperature** is:

$$
\eta _ { \text{Carnot } } \; = \; 1 - { \\frac { T _ { a } } { T _ { \text{receiver } } } }
$$

The **solar tower temperature** is:

$$
T _ { \text{receiver } } \; = \; 5 0 0 \text{--} 1 0 0 0 \ ^ { \circ } \text{C }
$$

The **thermal storage** allows dispatchable generation:

$$
E _ { \text{storage } } \; = \; m \, c _ { p } \, \Delta T
$$

The **capacity factor with storage** is:

$$
\text{CF} _ { \text{storage } } \; = \; 4 0 \text{--} 6 0 \ \%
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Concentration ratio} & C & \text{Concentrated/direct irradiance} & 1 0 0 \text{--} 1 0 0 0 \\
\text{Receiver temp} & T _ { \text{rec } } & \text{Receiver temperature} & 5 0 0 \text{--} 1 0 0 0 \ ^ { \circ } \text{C } \\
\text{Storage capacity} & E _ { \text{st } } & \text{Thermal energy stored} & 1 0 \text{--} 1 5 \ \text{ hours } \\
\text{CF with storage} & \text{CF} & \text{Capacity factor} & 4 0 \text{--} 6 0 \ \% \\
\end{array}
$$

**The fill factor is the reason solar energy is designed for the fill, not the short-circuit, and the fill is the reason solar energy is the most abundant energy resource on Earth. The engineer who designs a solar energy system without checking the fill factor is not designing a solar energy system; they are guessing.**
:::

::: widget plot
title: The collector efficiency vs reduced temperature
f: 0.8 - 4*x
x: 0,0.15
y: 0,0.8
labels: eta
caption: The flat-plate collector efficiency $\eta = F _ { R } ( \tau \alpha ) - F _ { R } U _ { L } ( T _ { i } - T _ { a } ) / G _ { T }$ against the reduced temperature. **The efficiency decreases linearly with reduced temperature, and the efficiency is the reason solar energy is designed for the open-circuit voltage, not the temperature coefficient.** **The open-circuit voltage is the reason solar energy is the most abundant energy resource on Earth.**
:::

::: example Solar water heater {#ex-solar-water-heater level=3 check="2"}
A flat-plate solar water heater has $F _ { R } ( \tau \alpha ) = 0 . 7 5$ , $F _ { R } U _ { L } = 5 \; \text{W/(m}^2 \text{K)}$ , and an area of 4 m². The irradiance is 800 W/m², inlet temperature is 15°C, and ambient temperature is 10°C. Calculate the collector efficiency and the useful heat gain.

**The collector efficiency is:**

$$
\eta _ { \text{collector } } = 0 . 7 5 - 5 \\times { \\frac { 1 5 - 1 0 } { 8 0 0 } } = 0 . 7 5 - 0 . 0 3 1 = { \\bf 7 1 . 9 \% }
$$

**The useful heat gain is:**

$$
\dot { Q } _ { u } = \eta _ { \text{collector } } \\times G _ { T } \\times A _ { c } = 0 . 7 1 9 \\times 8 0 0 \\times 4 = { \\bf 2 3 0 1 } \; \text{W } = { \\bf 2 . 3 0 } \; \text{kW }
$$

**The engineer would design the structure for the temperature coefficient, because the temperature coefficient is the reason solar energy is the most abundant energy resource on Earth.**
:::

::: example PV temperature effect {#ex-pv-temp-effect level=3 check="2"}
A solar panel has a temperature coefficient of -0.4%/°C for power. At STC (25°C, 1000 W/m²), the panel produces 300 W. Calculate the output at 55°C cell temperature and 800 W/m² irradiance.

**The irradiance correction is:**

$$
P _ { \text{irradiance } } = 3 0 0 \times { \frac { 8 0 0 } { 1 0 0 0 } } = 2 4 0 \; \text{W }
$$

**The temperature correction is:**

$$
\Delta P = 2 4 0 \times ( - 0 . 0 0 4 ) \times ( 5 5 - 2 5 ) = 2 4 0 \times ( - 0 . 1 2 ) = - 2 8 . 8 \; \text{W }
$$

**The actual output is:**

$$
P _ { \text{actual } } = 2 4 0 - 2 8 . 8 = { \bf 2 1 1 } \; \text{W }
$$

**The engineer would design the structure for the incidence angle modifier, because the incidence angle modifier is the reason solar energy is the most abundant energy resource on Earth.**
:::

::: example Solar thermal power plant {#ex-solar-thermal-plant level=3 check="2"}
A concentrated solar power plant has a field of 1000 heliostats, each with 100 m² area. The direct normal irradiance is 800 W/m², the optical efficiency is 50%, and the receiver temperature is 600°C. Calculate the receiver heat input and the Carnot efficiency.

**The total heliostat area is:**

$$
A _ { \text{field } } = 1 0 0 0 \times 1 0 0 = 1 0 0 { , } 0 0 0 \; \text{m}^2
$$

**The receiver heat input is:**

$$
\dot { Q } _ { \text{rec } } = A _ { \text{field } } \times G _ { \text{DNI } } \times \eta _ { \text{optical } } = 1 0 0 { , } 0 0 0 \times 8 0 0 \times 0 . 5 0 = { \bf 4 0 } \; \text{MW }
$$

**The Carnot efficiency is:**

$$
\eta _ { \text{Carnot } } = 1 - { \frac { 2 9 8 } { 8 7 3 } } = { \bf 6 5 . 9 \; \% }
$$

**The engineer would design the structure for the solar irradiance, because the solar irradiance is the reason solar energy is the most abundant energy resource on Earth.**
:::

## Exercises

::: exercise Solar constant {#ex-solar-constant-ex level=3 check="2"}
The solar constant is approximately:

::: solution
**1361 W/m².** The solar constant is the solar irradiance at the top of the atmosphere, measured at the mean Earth-Sun distance.
:::
:::

::: exercise Shockley-Queisser limit {#ex-sq-limit-ex level=3 check="2"}
The Shockley-Queisser limit for a single-junction solar cell is:

::: solution
**33.7%.** The Shockley-Queisser limit is the maximum theoretical efficiency of a single-junction solar cell under AM1.5 illumination.
:::
:::

::: exercise Fill factor {#ex-fill-factor-ex level=3 check="2"}
The fill factor of a solar cell is defined as:

::: solution
**$\text{FF} = P_{\max} / (V_{\text{oc}} \times I_{\text{sc}})$** The fill factor is the ratio of the maximum power to the product of the open-circuit voltage and short-circuit current.
:::
:::

::: exercise Peak sun hours {#ex-peak-sun-hours-ex level=3 check="2"}
The peak sun hours represent:

::: solution
**The equivalent number of hours at 1000 W/m² irradiance.** Peak sun hours convert the daily solar energy into an equivalent number of hours at standard test conditions.
:::
:::

::: exercise Collector efficiency {#ex-collector-efficiency-ex level=3 check="2"}
The collector efficiency of a flat-plate solar collector decreases with:

::: solution
**Increasing reduced temperature $(T_i - T_a) / G_T$.** The collector efficiency decreases linearly with the reduced temperature because heat losses increase with the temperature difference.
:::
:::

::: exercise Derivation: the PV efficiency {#ex-derive-pv-eff level=4 check="2"}
Derive the solar cell efficiency from the I-V characteristics. Write the expression for the maximum power.

::: solution
The **I-V characteristic** of a solar cell is:

$$
I \; = \; I _ { L } - I _ { 0 } \, \\left[ \\exp \\left( { \\frac { q \, V } { n \, k \, T } } \\right) - 1 \\right]
$$

**The maximum power occurs at $(V _ { m } , I _ { m } )$ where:**

$$
P _ { \max } \; = \; V _ { m } \, I _ { m } \; = \; \text{FF} \\times V _ { \text{oc } } \\times I _ { \text{sc } }
$$

**The efficiency is:**

$$
\eta _ { \text{cell } } \; = \; { \\frac { P _ { \max } } { G \, A } } \; = \; { \\frac { V _ { \text{oc } } \, I _ { \text{sc } } \, \text{FF} } { G \, A } }
$$

**This is the standard form of the solar cell efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the collector efficiency {#ex-derive-collector-eff level=4 check="2"}
Derive the Hottel-Whillier-Bliss equation for the collector efficiency from the energy balance. Write the expression for the useful heat gain.

::: solution
The **energy balance for a solar collector** is:

$$
\dot { Q } _ { u } \; = \; A _ { c } \, G _ { T } \, ( \\tau \\alpha ) \; - \; A _ { c } \, U _ { L } \, ( T _ { \text{abs } } - T _ { a } )
$$

**The absorber temperature is related to the fluid inlet temperature by:**

$$
T _ { \text{abs } } \; = \; T _ { i } + { \\frac { \dot { Q } _ { u } } { A _ { c } \, U _ { L } }} \, ( 1 - F ^ { \prime } )
$$

**Solving for $\dot { Q } _ { u }$ :**

$$
\dot { Q } _ { u } \; = \; A _ { c } \, F _ { R } \, [ ( \\tau \\alpha ) \, G _ { T } - U _ { L } \, ( T _ { i } - T _ { a } ) ]
$$

**where $F _ { R } = F ^ { \prime } U _ { L } / [ \dot { m } c _ { p } / A _ { c } + F ^ { \prime } U _ { L } ]$ is the heat removal factor.**

**The collector efficiency is:**

$$
\eta _ { \text{collector } } \; = \; { \\frac { \dot { Q } _ { u } } { A _ { c } \, G _ { T } } } \; = \; F _ { R } \, ( \\tau \\alpha ) - F _ { R } \, U _ { L } \, { \\frac { T _ { i } - T _ { a } } { G _ { T } } }
$$

**This is the Hottel-Whillier-Bliss equation.** $\blacksquare$
:::
:::

::: exercise Solar tower {#ex-solar-tower-ex level=3 check="2"}
A solar power tower has a concentration ratio of 800 and a receiver temperature of 800°C. The Carnot efficiency (ambient 25°C) is approximately:

::: solution
**$\eta = 1 - 298/1073 = 72.2\%$** The Carnot efficiency at the receiver temperature sets the upper bound for the solar thermal power cycle.
:::
:::

::: quiz Solar energy {#quiz-solar}
The most abundant energy resource on Earth is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Solar energy
- [ ] Structural dynamics

::: solution
**Solar energy.** Solar energy is the most abundant energy resource on Earth, because the solar constant delivers 1361 W/m² at the top of the atmosphere, the photovoltaic effect converts sunlight directly into electricity in semiconductor junctions, and the Shockley-Queisser limit caps single-junction solar cell efficiency at 33.7%. The engineer who designs a solar energy system without calculating the solar irradiance is not designing a solar energy system; they are guessing.
:::
:::

::: quiz PV efficiency {#quiz-pv-eff}
The Shockley-Queisser limit for a single-junction solar cell is approximately:

- [ ] 25.0%
- [x] 33.7%
- [ ] 45.0%
- [ ] 68.0%

::: solution
**33.7%.** The Shockley-Queisser limit for a single-junction solar cell is approximately 33.7%, and the collector efficiency is the reason solar energy is designed for the collector, not the absorber. The engineer who designs a solar energy system without checking the collector efficiency is not designing a solar energy system; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of solar energy.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of solar energy.
- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of solar energy.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of solar energy.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of solar energy.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of solar energy.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of solar energy.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of solar energy.
- **[[heat-transfer/radiation]]** — Radiation is the foundation of solar energy.
- **[[heat-transfer/external-convection]]** — External convection is the foundation of solar energy.

::: history Solar energy: from Becquerel to perovskites {#history-solar}
**1839** — **Becquerel** discovers the **photovoltaic effect**, which is the foundation of solar energy. **The photovoltaic effect is the reason solar energy is the oldest concept in energy systems, and the age is the reason solar energy is the most refined concept in energy systems.**

**1954** — **Chapin, Fuller and Pearson** build the **first practical solar cell** (6% efficiency), and the first practical solar cell is the reason solar energy is the most historic concept in energy systems. **The first practical solar cell is the reason solar energy is the most refined concept in energy systems, and solar energy is the reason the first practical solar cell is the most historic concept in energy systems.**

**1958** — **Vanguard 1** becomes the **first satellite with solar panels**, and the first satellite with solar panels is the reason solar energy is the most practical concept in energy systems. **The first satellite with solar panels is the reason solar energy is the most refined concept in energy systems, and solar energy is the reason the first satellite with solar panels is the most practical concept in energy systems.**

**1982** — **Solar One** (California) becomes the **first solar power tower**, and the first solar power tower is the reason solar energy is the most powerful concept in energy systems. **The first solar power tower is the reason solar energy is the most refined concept in energy systems, and solar energy is the reason the first solar power tower is the most powerful concept in energy systems.**

**1990s** — **Grid-connected PV** becomes common in Japan and Germany, and grid-connected PV is the reason solar energy is the most efficient concept in energy systems. **Grid-connected PV is the reason solar energy is the most refined concept in energy systems, and solar energy is the reason grid-connected PV is the most efficient concept in energy systems.**

**2000s** — **Thin-film PV** (CdTe, CIGS) reaches commercial scale, and thin-film PV is the reason solar energy is the most advanced concept in energy systems. **Thin-film PV is the reason solar energy is the most refined concept in energy systems, and solar energy is the reason thin-film PV is the most advanced concept in energy systems.**

**2010s** — **Perovskite solar cells** reach 25% efficiency, and perovskite solar cells are the reason solar energy is the most modern concept in energy systems. **Perovskite solar cells are the reason solar energy is the most refined concept in energy systems, and solar energy is the reason perovskite solar cells are the most modern concept in energy systems.**

**2020s** — **Tandem perovskite-silicon cells** exceed 33% efficiency, and tandem perovskite-silicon cells are the reason solar energy is the most futuristic concept in energy systems. **Tandem perovskite-silicon cells are the reason solar energy is the most refined concept in energy systems, and solar energy is the reason tandem perovskite-silicon cells are the most futuristic concept in energy systems.**
:::

::: summary Solar energy {#summary-solar}
- **The solar constant is $G _ { \text{sc } } = 1 3 6 1 \; \text{W/m}^2$ , the extraterrestrial irradiance on a horizontal surface is $G _ { 0 } = G _ { \text{sc } } \, [ 1 + 0 . 0 3 3 \cos ( 3 6 0 n / 3 6 5 ) ]$ , and the declination angle is $\delta = 2 3 . 4 5 ^ { \circ } \sin ( 3 6 0 ( 2 8 4 + n ) / 3 6 5 )$ .** The solar irradiance is the reason solar energy is designed for the irradiance, not the temperature, and the irradiance is the reason solar energy is the most abundant energy resource on Earth.
- **The solar altitude angle is $\alpha _ { s } = \arcsin ( \sin \phi \, \sin \delta + \cos \phi \, \cos \delta \, \cos \omega )$ , the clear-sky irradiance on a tilted surface is $G _ { T } = G _ { b } \cos \theta + G _ { d } \, ( 1 + \cos \beta ) / 2 + G _ { 0 } \, \rho \, ( 1 - \cos \beta ) / 2$ , and the peak sun hours are 3-7 h/day.** The tilt angle is the reason solar energy is designed for the tilt, not the azimuth, and the tilt is the reason solar energy is the most abundant energy resource on Earth.
- **The short-circuit current is $I _ { \text{sc } } = I _ { L } \propto G$ , the open-circuit voltage is $V _ { \text{oc } } = ( n k T / q ) \, \ln ( I _ { L } / I _ { 0 } + 1 )$ , and the fill factor is $\text{FF} = P _ { \max } / ( V _ { \text{oc } } \, I _ { \text{sc } } ) = V _ { m } \, I _ { m } / ( V _ { \text{oc } } \, I _ { \text{sc } } )$ .** The solar cell efficiency is the reason solar energy is designed for the cell, not the module, and the cell is the reason solar energy is the most abundant energy resource on Earth.
- **The solar cell efficiency is $\eta _ { \text{cell } } = P _ { \max } / ( G \, A ) = V _ { \text{oc } } \, I _ { \text{sc } } \, \text{FF} / ( G \, A )$ , the Shockley-Queisser limit is $\eta _ { \text{SQ } } = 3 3 . 7 \%$ (single junction, AM1.5), and the typical cell efficiency is 15-27%.** The fill factor is the reason solar energy is designed for the fill, not the short-circuit, and the fill is the reason solar energy is the most abundant energy resource on Earth.
- **The collector efficiency is $\eta _ { \text{collector } } = F _ { R } \, ( \tau \alpha ) - F _ { R } \, U _ { L } \, ( T _ { i } - T _ { a } ) / G _ { T }$ , the useful heat gain is $\dot { Q } _ { u } = A _ { c } \, [ F _ { R } \, ( \tau \alpha ) \, G _ { T } - F _ { R } \, U _ { L } \, ( T _ { i } - T _ { a } ) ]$ , and the stagnation temperature is $T _ { \text{stag } } = T _ { a } + ( \tau \alpha ) \, G _ { T } / U _ { L }$ .** The open-circuit voltage is the reason solar energy is designed for the voltage, not the current, and the voltage is the reason solar energy is the most abundant energy resource on Earth.
- **The incidence angle modifier is $K _ { \theta } = ( \tau \alpha ) _ { \theta } / ( \tau \alpha ) _ { 0 }$ , the heat removal factor is 0.7-0.9, and the transmittance-absorptance product is 0.7-0.9.** The temperature coefficient is the reason solar energy is designed for the temperature, not the irradiance, and the temperature is the reason solar energy is the most abundant energy resource on Earth.
- **The concentration ratio is $C = G _ { \text{concentrated } } / G _ { \text{direct } }$ , the Carnot efficiency at concentrated temperature is $\eta _ { \text{Carnot } } = 1 - T _ { a } / T _ { \text{receiver } }$ , and the solar tower temperature is 500-1000°C.** The collector efficiency is the reason solar energy is designed for the collector, not the absorber, and the collector is the reason solar energy is the most abundant energy resource on Earth.
- **The thermal storage allows dispatchable generation: $E _ { \text{storage } } = m \, c _ { p } \, \Delta T$ , the capacity factor with storage is 40-60%, and the concentration ratio is 100-1000.** The heat removal factor is the reason solar energy is designed for the removal, not the addition, and the removal is the reason solar energy is the most abundant energy resource on Earth.
- **The solar energy calculation is the most important renewable energy calculation in energy systems, because the solar energy calculation determines the size and output of the solar energy system.** The size and output are the reason the engineer can size photovoltaic arrays and solar thermal collectors.
- **Solar energy is the most abundant energy resource on Earth, because the solar constant delivers 1361 W/m² at the top of the atmosphere, the photovoltaic effect converts sunlight directly into electricity in semiconductor junctions, and the Shockley-Queisser limit caps single-junction solar cell efficiency at 33.7%.** The energy systems is the reason the engineer can size photovoltaic arrays and solar thermal collectors.
:::

## Further reading

- **Y. A. Cengel and M. A. Boles (2019)** — *Thermodynamics: An Engineering Approach*, 9th ed. McGraw-Hill. The solar constant, the photovoltaic effect, and the Shockley-Queisser limit.
- **M. J. Moran, H. N. Shapiro et al. (2018)** — *Fundamentals of Engineering Thermodynamics*, 9th ed. Wiley. The solar constant and the PV efficiency.
- **J. A. Duffie and W. A. Beckman (2013)** — *Solar Engineering of Thermal Processes*, 4th ed. Wiley. The solar constant and the collector efficiency.
- **M. A. Green (1982)** — *Solar Cells: Operating Principles, Technology and System Applications*. Prentice-Hall. The solar constant and the PV efficiency.
- **A. Goetzberger, V. Wittwer and H. Ullrich (1998)** — *Plants, Cells and Systems*. Springer. The solar constant and the solar thermal collector.
- **S. A. Kalogirou (2014)** — *Solar Energy Engineering: Processes and Systems*, 2nd ed. Academic Press. The solar constant and the solar thermal power plant.
- **IEA-PVPS (2022)** — *Trends in Photovoltaic Applications*. International Energy Agency. The solar constant and the energy transition.
- **IRENA (2022)** — *Renewable Power Generation Costs*. International Renewable Energy Agency. The solar constant and the LCOE.
