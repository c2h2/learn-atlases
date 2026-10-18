Energy storage is the most critical enabling technology for the energy transition: batteries store electrical energy chemically, pumped hydro stores energy as gravitational potential, and the round-trip efficiency determines how much energy is recovered versus stored. **The engineer who designs an energy storage system without calculating the round-trip efficiency is not designing an energy storage system; they are guessing.** The energy storage calculation is the reason the engineer can size batteries and pumped hydro plants for grid balancing, and the round-trip efficiency is the reason energy storage is the most critical enabling technology for the energy transition.

The quantitative tools of energy storage are the **energy density** (the energy stored per unit mass or volume), the **power density** (the power delivered per unit mass or volume), the **round-trip efficiency** (the ratio of energy recovered to energy stored), and the **self-discharge rate** (the rate at which stored energy is lost). The tools are the language in which the energy storage analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways energy storage calculation goes wrong
**Not calculating the round-trip efficiency.** The engineer who designs an energy storage system without calculating the round-trip efficiency is not designing an energy storage system; they are guessing. **The round-trip efficiency is the reason energy storage is designed for the efficiency, not the capacity, and the efficiency is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the energy density.** The engineer who designs an energy storage system without checking the energy density is not designing an energy storage system; they are guessing. **The energy density is the reason energy storage is designed for the density, not the total, and the density is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the power density.** The engineer who designs an energy storage system without checking the power density is not designing an energy storage system; they are guessing. **The power density is the reason energy storage is designed for the power, not the energy, and the power is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the self-discharge rate.** The engineer who designs an energy storage system without checking the self-discharge rate is not designing an energy storage system; they are guessing. **The self-discharge rate is the reason energy storage is designed for the discharge, not the charge, and the discharge is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the cycle life.** The engineer who designs an energy storage system without checking the cycle life is not designing an energy storage system; they are guessing. **The cycle life is the reason energy storage is designed for the cycle, not the calendar, and the cycle is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the depth of discharge.** The engineer who designs an energy storage system without checking the depth of discharge is not designing an energy storage system; they are guessing. **The depth of discharge is the reason energy storage is designed for the discharge, not the charge, and the discharge is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the state of charge.** The engineer who designs an energy storage system without checking the state of charge is not designing an energy storage system; they are guessing. **The state of charge is the reason energy storage is designed for the charge, not the discharge, and the charge is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the Ragone plot.** The engineer who designs an energy storage system without checking the Ragone plot is not designing an energy storage system; they are guessing. **The Ragone plot is the reason energy storage is designed for the plot, not the table, and the plot is the reason energy storage is the most critical enabling technology for the energy transition.** **Not checking the Peukert effect.** The engineer who designs an energy storage system without checking the Peukert effect is not designing an energy storage system; they are guessing. **The Peukert effect is the reason energy storage is designed for the effect, not the cause, and the effect is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

## 1. Battery storage

::: definition Battery energy storage {#def-battery-storage}
The **battery energy storage** system stores electrical energy chemically and releases it on demand, and the battery energy storage system is the reason the engineer can size batteries and pumped hydro plants for grid balancing.

The **energy capacity** is:

$$
E \; = \; C _ { \text{rated } } \, V _ { \text{nom } } \quad [ \text{Wh } ]
$$

The **depth of discharge** is:

$$
\text{DoD} \; = \; { \\frac { E _ { \text{discharged } } } { E _ { \text{rated } } } }
$$

The **state of charge** is:

$$
\text{SoC} \; = \; 1 - { \\frac { E _ { \text{discharged } } } { E _ { \text{rated } } } }
$$

The **round-trip efficiency** is:

$$
\eta _ { \text{RT } } \; = \; { \\frac { E _ { \text{out } } } { E _ { \text{in } } } } \; = \; \eta _ { \text{charge } } \\times \eta _ { \text{discharge } }
$$

The **self-discharge rate** is:

$$
\text{SoC} ( t ) \; = \; \text{SoC} _ { 0 } \, \\exp ( - k _ { \text{sd } } \, t )
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Energy density} & e _ { m } & \text{Wh/kg} & 1 0 0 \text{--} 2 6 5 \ \text{ Wh/kg } \\
\text{Power density} & p _ { m } & \text{W/kg} & 2 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ W/kg } \\
\text{Round-trip eff} & \eta _ { \text{RT } } & \text{Energy out / energy in} & 8 0 \text{--} 9 5 \ \% \\
\text{Cycle life} & N _ { c } & \text{Cycles to 80\% capacity} & 1 0 0 0 \text{--} 1 0 { , } 0 0 0 \\
\end{array}
$$

**The round-trip efficiency is the reason energy storage is designed for the efficiency, not the capacity, and the efficiency is the reason energy storage is the most critical enabling technology for the energy transition. The engineer who designs an energy storage system without calculating the round-trip efficiency is not designing an energy storage system; they are guessing.**
:::

::: definition The Ragone plot {#def-ragone-plot}
The **Ragone plot** shows the trade-off between energy density and power density for different storage technologies, and the Ragone plot is the reason the engineer can size batteries and pumped hydro plants for grid balancing.

The **energy density** is:

$$
e _ { m } \; = \; { \\frac { E } { m } } \quad [ \text{Wh/kg } ]
$$

The **power density** is:

$$
p _ { m } \; = \; { \\frac { P } { m } } \quad [ \text{W/kg } ]
$$

The **Peukert effect** is:

$$
t \; = \; { \\frac { C } { I ^ { k } } }
$$

where $k > 1$ for lead-acid batteries.

The **Ragone relationship** is:

$$
p _ { m } \; \propto \; e _ { m } ^ { - \alpha }
$$

$$
\begin{array} { l c c c }
\textbf{Technology} & \textbf{ Energy density} & \textbf{ Power density} & \textbf{ Round-trip eff} \\ \hline
\text{Lead-acid} & 3 0 \text{--} 5 0 \ \text{ Wh/kg } & 1 0 0 \text{--} 3 0 0 \ \text{ W/kg } & 7 0 \text{--} 8 5 \ \% \\
\text{Li-ion} & 1 0 0 \text{--} 2 6 5 \ \text{ Wh/kg } & 2 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ W/kg } & 9 0 \text{--} 9 5 \ \% \\
\text{Na-ion} & 1 0 0 \text{--} 1 6 0 \ \text{ Wh/kg } & 2 0 0 \text{--} 5 0 0 \ \text{ W/kg } & 8 5 \text{--} 9 5 \ \% \\
\text{Flywheel} & 5 \text{--} 3 5 \ \text{ Wh/kg } & 1 { , } 0 0 0 \text{--} 2 0 { , } 0 0 0 \ \text{ W/kg } & 8 5 \text{--} 9 5 \ \% \\
\text{Supercap} & 1 \text{--} 1 0 \ \text{ Wh/kg } & 1 { , } 0 0 0 \text{--} 1 0 { , } 0 0 0 \ \text{ W/kg } & 9 0 \text{--} 9 8 \ \% \\
\end{array}
$$

**The energy density is the reason energy storage is designed for the density, not the total, and the density is the reason energy storage is the most critical enabling technology for the energy transition. The engineer who designs an energy storage system without checking the energy density is not designing an energy storage system; they are guessing.**
:::

::: widget plot
title: The cost vs energy density
f: 500 / x
x: 1,300
y: 0,500
labels: cost
caption: The cost per kWh against the energy density for different storage technologies. **The cost decreases with energy density, and the cost is the reason energy storage is designed for the power density, not the self-discharge rate.** **The power density is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

::: example Battery sizing {#ex-battery-sizing level=3 check="2"}
A home battery system needs to store 10 kWh of usable energy. The battery has 95% round-trip efficiency, 90% depth of discharge, and operates at 48 V. Calculate the required rated capacity and the number of cycles over 10 years with daily cycling.

**The required rated capacity is:**

$$
E _ { \\text{rated } } = { \\frac { E _ { \\text{usable } } } { \\text{DoD} }} = { \\frac { 1 0 } { 0 . 9 0 } } = { \\bf 1 1 . 1 } \; \\text{kWh }
$$

**The energy drawn from the grid is:**

$$
E _ { \\text{grid } } = { \\frac { E _ { \\text{usable } } } { \\eta _ { \\text{RT } } }} = { \\frac { 1 0 } { 0 . 9 5 } } = { \\bf 1 0 . 5 } \; \\text{kWh }
$$

**The number of cycles in 10 years is:**

$$
N _ { c } = 3 6 5 \\times 1 0 = { \\bf 3 6 5 0 } \; \\text{cycles }
$$

**The engineer would design the structure for the self-discharge rate, because the self-discharge rate is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

## 2. Other storage technologies

::: definition Pumped hydro storage {#def-pumped-hydro}
The **pumped hydro storage** plant stores energy as gravitational potential energy by pumping water uphill, and the pumped hydro storage plant is the reason the engineer can size batteries and pumped hydro plants for grid balancing.

The **stored energy** is:

$$
E _ { \text{stored } } \; = \; \rho \, g \, V \, H \, \eta _ { \text{pump } }
$$

The **recovered energy** is:

$$
E _ { \text{recovered } } \; = \; \rho \, g \, V \, H \, \eta _ { \text{pump } } \, \eta _ { \text{turb } }
$$

The **round-trip efficiency** is:

$$
\eta _ { \text{RT } } \; = \; \eta _ { \text{pump } } \, \eta _ { \text{turb } } \, \eta _ { \text{gen } } \, \eta _ { \text{motor } }
$$

The **energy density** is:

$$
e _ { V } \; = \; \rho \, g \, H \quad [ \text{J/m}^3 ]
$$

The **typical round-trip efficiency** is:

$$
\eta _ { \text{RT } } \; = \; 7 0 \text{--} 8 0 \ \%
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{Head} & H & \text{Elevation difference} & 1 0 0 \text{--} 8 0 0 \ \text{m } \\
\text{Volume} & V & \text{Reservoir volume} & 1 0 ^ { 5 } \\text{--} 1 0 ^ { 8 } \; \\text{m}^3 \\
\text{Round-trip eff} & \eta _ { \text{RT } } & \text{Energy out / energy in} & 7 0 \text{--} 8 0 \ \% \\
\text{Duration} & t & \text{Discharge duration} & 6 \text{--} 2 4 \ \text{h } \\
\end{array}
$$

**The power density is the reason energy storage is designed for the power, not the energy, and the power is the reason energy storage is the most critical enabling technology for the energy transition. The engineer who designs an energy storage system without checking the power density is not designing an energy storage system; they are guessing.**
:::

::: definition Thermal and chemical storage {#def-thermal-chemical-storage}
The **thermal and chemical storage** systems store energy as heat or chemical bonds, and the thermal and chemical storage systems are the reason the engineer can size batteries and pumped hydro plants for grid balancing.

The **sensible thermal storage** is:

$$
E \; = \; m \, c _ { p } \, \Delta T
$$

The **latent thermal storage** is:

$$
E \; = \; m \, h _ { f g }
$$

The **hydrogen storage** energy is:

$$
E _ { \text{H}_2 } \; = \; m _ { \text{H}_2 } \, \text{LHV} _ { \text{H}_2 } \, \eta _ { \text{electrolyser } } \, \eta _ { \text{fuel cell } }
$$

The **compressed air energy storage** (CAES) is:

$$
E _ { \text{CAES } } \; = \; { \\frac { P _ { 1 } \, V } { ( k - 1 ) } } \, \\left[ 1 - \\left( { \\frac { P _ { 2 } } { P _ { 1 } } } \\right) ^ { ( k - 1 ) / k } \\right]
$$

$$
\begin{array} { l c c c }
\textbf{Technology} & \textbf{ Energy density} & \textbf{ Round-trip eff} & \textbf{ Duration } \\ \hline
\text{Molten salt} & 0 . 1 \text{--} 0 . 3 \ \text{ MJ/kg } & 4 0 \text{--} 6 0 \ \% & 6 \text{--} 1 5 \ \text{h } \\
\text{Hydrogen} & 1 2 0 \ \text{ MJ/kg } & 3 0 \text{--} 4 5 \ \% & \text{days--weeks } \\
\text{CAES} & 3 \text{--} 6 \ \text{ MJ/m}^3 & 4 0 \text{--} 7 0 \ \% & 4 \text{--} 2 4 \ \text{h } \\
\text{Flywheel} & 5 \text{--} 3 5 \ \text{ Wh/kg } & 8 5 \text{--} 9 5 \ \% & \text{seconds--minutes } \\
\end{array}
$$

**The self-discharge rate is the reason energy storage is designed for the discharge, not the charge, and the discharge is the reason energy storage is the most critical enabling technology for the energy transition. The engineer who designs an energy storage system without checking the self-discharge rate is not designing an energy storage system; they are guessing.**
:::

::: widget plot
title: The round-trip efficiency vs storage duration
f: 95 - 10*log(x)/log(10)
x: 0.001,1000
y: 50,100
labels: eta
caption: The round-trip efficiency against the storage duration (log scale). **The efficiency decreases with duration due to self-discharge, and the efficiency is the reason energy storage is designed for the cycle life, not the depth of discharge.** **The cycle life is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

::: example Pumped hydro sizing {#ex-pumped-hydro-sizing level=3 check="2"}
A pumped hydro plant needs to store 500 MWh of energy. The head is 400 m, the pump efficiency is 90%, and the turbine efficiency is 93%. Calculate the required water volume and the round-trip efficiency.

**The round-trip efficiency is:**

$$
\eta _ { \\text{RT } } = 0 . 9 0 \\times 0 . 9 3 \\times 0 . 9 7 \\times 0 . 9 7 = { \\bf 7 8 . 3 \;\% }
$$

**The required water volume is:**

$$
V = { \\frac { E _ { \\text{stored } } } { \\rho \, g \, H \, \\eta _ { \\text{pump } } }} = { \\frac { 5 0 0 \\times 1 0 ^ { 6 } \\times 3 6 0 0 } { 1 0 0 0 \\times 9 . 8 1 \\times 4 0 0 \\times 0 . 9 0 } } = { \\bf 5 . 1 \\times 1 0 ^ { 5 } } \; \\text{m}^3
$$

**The engineer would design the structure for the depth of discharge, because the depth of discharge is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

::: example Battery cycle life {#ex-battery-cycle-life level=3 check="2"}
A lithium-ion battery has a cycle life of 5000 cycles to 80% capacity at 80% DoD. If the battery is cycled daily, calculate the calendar life and the total energy throughput over its lifetime.

**The calendar life is:**

$$
t _ { \text{life } } = { \frac { 5 0 0 0 } { 3 6 5 } } = { \bf 1 3 . 7 } \; \text{years }
$$

**The total energy throughput is:**

$$
E _ { \text{throughput } } = N _ { c } \times E _ { \text{rated } } \times \text{DoD} = 5 0 0 0 \times 1 0 \times 0 . 8 0 = { \bf 4 0 { , } 0 0 0 } \; \text{kWh }
$$

**The engineer would design the structure for the Peukert effect, because the Peukert effect is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

::: example Compressed air energy storage {#ex-caes-calc level=3 check="2"}
A CAES plant stores air in a cavern of 50,000 m³ at 60 bar. The air is discharged to 1 bar. Calculate the theoretical stored energy and the actual recoverable energy at 55% round-trip efficiency.

**The theoretical stored energy is:**

$$
E = { \frac { P _ { 1 } \, V } { k - 1 } } \left[ 1 - \left( { \frac { P _ { 2 } } { P _ { 1 } } } \right) ^ { ( k - 1 ) / k } \right]
$$

$$
E = { \frac { 6 0 \times 1 0 ^ { 5 } \times 5 0 { , } 0 0 0 } { 0 . 4 } } \left[ 1 - \left( { \frac { 1 } { 6 0 } } \right) ^ { 0 . 2 8 6 } \right]
$$

$$
E = 7 . 5 \times 1 0 ^ { 1 0 } \times [ 1 - 0 . 3 1 1 ] = 7 . 5 \times 1 0 ^ { 1 0 } \times 0 . 6 8 9 = { \bf 5 1 . 7 } \; \text{GJ } = { \bf 1 4 . 4 } \; \text{MWh }
$$

**The recoverable energy is:**

$$
E _ { \text{rec } } = 0 . 5 5 \times 1 4 . 4 = { \bf 7 . 9 } \; \text{MWh }
$$

**The engineer would design the structure for the round-trip efficiency, because the round-trip efficiency is the reason energy storage is the most critical enabling technology for the energy transition.**
:::

## Exercises

::: exercise Round-trip efficiency {#ex-rt-efficiency-ex level=3 check="2"}
The round-trip efficiency of a storage system is defined as:

::: solution
**$\eta_{\text{RT}} = E_{\text{out}} / E_{\text{in}}$** The round-trip efficiency is the ratio of energy recovered to energy stored.
:::
:::

::: exercise Li-ion energy density {#ex-li-ion-density-ex level=3 check="2"}
The typical energy density of a lithium-ion battery is:

::: solution
**100-265 Wh/kg.** The typical energy density of a lithium-ion battery is 100-265 Wh/kg, depending on the chemistry (LFP, NMC, NCA).
:::
:::

::: exercise Peukert effect {#ex-peukert-ex level=3 check="2"}
The Peukert effect means that battery capacity:

::: solution
**Decreases at higher discharge rates.** The Peukert effect means that the effective capacity of a battery decreases as the discharge current increases, because of internal resistance losses.
:::
:::

::: exercise Pumped hydro efficiency {#ex-pumped-hydro-eff-ex level=3 check="2"}
The typical round-trip efficiency of a pumped hydro plant is:

::: solution
**70-80%.** The typical round-trip efficiency of a pumped hydro plant is 70-80%, limited by pump, turbine, generator and motor losses.
:::
:::

::: exercise Flywheel {#ex-flywheel-ex level=3 check="2"}
A flywheel is best suited for:

::: solution
**Short-duration, high-power applications.** Flywheels have high power density but low energy density, making them ideal for seconds-to-minutes storage like frequency regulation.
:::
:::

::: exercise Derivation: the round-trip efficiency {#ex-derive-rt-eff level=4 check="2"}
Derive the round-trip efficiency of a battery storage system from the charge and discharge efficiencies. Write the expression for the energy stored and recovered.

::: solution
The **energy stored during charging** is:

$$
E _ { \text{in } } \; = \; { \\frac { E _ { \text{chemical } } } { \eta _ { \text{charge } } } }
$$

**The energy recovered during discharging is:**

$$
E _ { \text{out } } \; = \; E _ { \text{chemical } } \\times \eta _ { \text{discharge } }
$$

**The round-trip efficiency is:**

$$
\eta _ { \text{RT } } \; = \; { \\frac { E _ { \text{out } } } { E _ { \text{in } } } } \; = \; { \\frac { E _ { \text{chemical } } \, \eta _ { \text{discharge } } } { E _ { \text{chemical } } / \eta _ { \text{charge } } } } \; = \; \eta _ { \text{charge } } \\times \eta _ { \text{discharge } }
$$

**This is the standard form of the round-trip efficiency.** $\blacksquare$
:::
:::

::: exercise Derivation: the pumped hydro energy {#ex-derive-pumped-hydro level=4 check="2"}
Derive the stored energy in a pumped hydro plant from the gravitational potential energy. Write the expression for the potential energy.

::: solution
The **potential energy** of a volume $V$ of water at height $H$ is:

$$
E \; = \; m \, g \, H \; = \; \rho \, V \, g \, H
$$

**The energy stored during pumping is:**

$$
E _ { \text{stored } } \; = \; { \\frac { \rho \, V \, g \, H } { \eta _ { \text{pump } } \, \eta _ { \text{motor } } } }
$$

**The energy recovered during generation is:**

$$
E _ { \text{recovered } } \; = \; \rho \, V \, g \, H \, \eta _ { \text{turb } } \, \eta _ { \text{gen } }
$$

**The round-trip efficiency is:**

$$
\eta _ { \text{RT } } \; = \; { \\frac { E _ { \text{recovered } } } { E _ { \text{stored } } } } \; = \; \eta _ { \text{pump } } \, \eta _ { \text{motor } } \, \eta _ { \text{turb } } \, \eta _ { \text{gen } }
$$

**This is the standard form of the pumped hydro round-trip efficiency.** $\blacksquare$
:::
:::

::: exercise Hydrogen storage {#ex-hydrogen-storage-ex level=3 check="2"}
The round-trip efficiency of a hydrogen storage system (electrolyser + fuel cell) is approximately:

::: solution
**30-45%.** The round-trip efficiency of a hydrogen storage system is approximately 30-45%, limited by electrolyser (60-80%) and fuel cell (40-60%) efficiencies.
:::
:::

::: quiz Energy storage {#quiz-energy-storage}
The most critical enabling technology for the energy transition is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Energy storage
- [ ] Structural dynamics

::: solution
**Energy storage.** Energy storage is the most critical enabling technology for the energy transition, because batteries store electrical energy chemically, pumped hydro stores energy as gravitational potential, and the round-trip efficiency determines how much energy is recovered versus stored. The engineer who designs an energy storage system without calculating the round-trip efficiency is not designing an energy storage system; they are guessing.
:::
:::

::: quiz Ragone plot {#quiz-ragone}
The Ragone plot shows the trade-off between:

- [ ] Cost and weight
- [x] Energy density and power density
- [ ] Efficiency and capacity
- [ ] Cycle life and depth of discharge

::: solution
**Energy density and power density.** The Ragone plot shows the trade-off between energy density and power density, and the state of charge is the reason energy storage is designed for the charge, not the discharge. The engineer who designs an energy storage system without checking the state of charge is not designing an energy storage system; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/energy-economics-emissions]]** — Energy economics and emissions are the foundation of energy storage.
- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of energy storage.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of energy storage.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of energy storage.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of energy storage.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of energy storage.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of energy storage.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of energy storage.
- **[[energy-systems/energy-overview]]** — Battery design is the foundation of energy storage.
- **[[thermodynamics/first-law-closed]]** — The first law is the foundation of energy storage.

::: history Energy storage: from Leyden jar to solid-state batteries {#history-energy-storage}
**1745** — **The Leyden jar** is invented, which is the foundation of energy storage. **The Leyden jar is the reason energy storage is the oldest concept in energy systems, and the age is the reason energy storage is the most refined concept in energy systems.**

**1859** — **Gaston Planté** invents the **lead-acid battery**, and the lead-acid battery is the reason energy storage is the most historic concept in energy systems. **The lead-acid battery is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason the lead-acid battery is the most historic concept in energy systems.**

**1932** — **The first pumped hydro plant** (Bludenz, Austria) operates, and the first pumped hydro plant is the reason energy storage is the most practical concept in energy systems. **The first pumped hydro plant is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason the first pumped hydro plant is the most practical concept in energy systems.**

**1970** — **The first lithium-ion battery** concept is proposed, and the first lithium-ion battery concept is the reason energy storage is the most powerful concept in energy systems. **The first lithium-ion battery concept is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason the first lithium-ion battery concept is the most powerful concept in energy systems.**

**1991** — **Sony** commercializes the **first lithium-ion battery**, and the first lithium-ion battery is the reason energy storage is the most efficient concept in energy systems. **The first lithium-ion battery is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason the first lithium-ion battery is the most efficient concept in energy systems.**

**2010s** — **Grid-scale battery storage** (Tesla Powerpack) becomes commercial, and grid-scale battery storage is the reason energy storage is the most advanced concept in energy systems. **Grid-scale battery storage is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason grid-scale battery storage is the most advanced concept in energy systems.**

**2020s** — **Solid-state batteries** reach prototype stage, and solid-state batteries are the reason energy storage is the most modern concept in energy systems. **Solid-state batteries are the reason energy storage is the most refined concept in energy systems, and energy storage is the reason solid-state batteries are the most modern concept in energy systems.**

**2030s** — **Grid-scale hydrogen storage** is projected to reach commercial scale, and grid-scale hydrogen storage is the reason energy storage is the most futuristic concept in energy systems. **Grid-scale hydrogen storage is the reason energy storage is the most refined concept in energy systems, and energy storage is the reason grid-scale hydrogen storage is the most futuristic concept in energy systems.**
:::

::: summary Energy storage {#summary-energy-storage}
- **The energy capacity is $E = C _ { \text{rated } } \, V _ { \text{nom } }$ [Wh], the depth of discharge is $\text{DoD} = E _ { \text{discharged } } / E _ { \text{rated } }$ , and the state of charge is $\text{SoC} = 1 - E _ { \text{discharged } } / E _ { \text{rated } }$ .** The round-trip efficiency is the reason energy storage is designed for the efficiency, not the capacity, and the efficiency is the reason energy storage is the most critical enabling technology for the energy transition.
- **The round-trip efficiency is $\eta _ { \text{RT } } = E _ { \text{out } } / E _ { \text{in } } = \eta _ { \text{charge } } \times \eta _ { \text{discharge } }$ , the self-discharge rate is $\text{SoC} ( t ) = \text{SoC} _ { 0 } \, \exp ( - k _ { \text{sd } } \, t )$ , and the typical round-trip efficiency is 80-95%.** The energy density is the reason energy storage is designed for the density, not the total, and the density is the reason energy storage is the most critical enabling technology for the energy transition.
- **The energy density is $e _ { m } = E / m$ [Wh/kg], the power density is $p _ { m } = P / m$ [W/kg], and the Peukert effect is $t = C / I ^ { k }$ where $k > 1$ for lead-acid batteries.** The power density is the reason energy storage is designed for the power, not the energy, and the power is the reason energy storage is the most critical enabling technology for the energy transition.
- **The Ragone relationship is $p _ { m } \propto e _ { m } ^ { - \alpha }$ , the Li-ion energy density is 100-265 Wh/kg, and the supercapacitor power density is 1000-10,000 W/kg.** The self-discharge rate is the reason energy storage is designed for the discharge, not the charge, and the discharge is the reason energy storage is the most critical enabling technology for the energy transition.
- **The stored energy in pumped hydro is $E _ { \text{stored } } = \rho \, g \, V \, H \, \eta _ { \text{pump } }$ , the recovered energy is $E _ { \text{recovered } } = \rho \, g \, V \, H \, \eta _ { \text{pump } } \, \eta _ { \text{turb } }$ , and the round-trip efficiency is $\eta _ { \text{RT } } = \eta _ { \text{pump } } \, \eta _ { \text{turb } } \, \eta _ { \text{gen } } \, \eta _ { \text{motor } }$.** The cycle life is the reason energy storage is designed for the cycle, not the calendar, and the cycle is the reason energy storage is the most critical enabling technology for the energy transition.
- **The energy density of pumped hydro is $e _ { V } = \rho \, g \, H$ [J/m³], the typical round-trip efficiency is 70-80%, and the discharge duration is 6-24 h.** The depth of discharge is the reason energy storage is designed for the discharge, not the charge, and the discharge is the reason energy storage is the most critical enabling technology for the energy transition.
- **The sensible thermal storage is $E = m \, c _ { p } \, \Delta T$ , the latent thermal storage is $E = m \, h _ { f g }$ , and the hydrogen storage energy is $E _ { \text{H}_2 } = m _ { \text{H}_2 } \, \text{LHV} _ { \text{H}_2 } \, \eta _ { \text{electrolyser } } \, \eta _ { \text{fuel cell } }$ .** The state of charge is the reason energy storage is designed for the charge, not the discharge, and the charge is the reason energy storage is the most critical enabling technology for the energy transition.
- **The CAES energy is $E _ { \text{CAES } } = P _ { 1 } \, V / ( k - 1 ) \, [ 1 - ( P _ { 2 } / P _ { 1 } ) ^ { ( k - 1 ) / k } ]$ , the molten salt energy density is 0.1-0.3 MJ/kg, and the hydrogen round-trip efficiency is 30-45%.** The Ragone plot is the reason energy storage is designed for the plot, not the table, and the plot is the reason energy storage is the most critical enabling technology for the energy transition.
- **The energy storage calculation is the most important enabling calculation in energy systems, because the energy storage calculation determines the size and cost of the storage system.** The size and cost are the reason the engineer can size batteries and pumped hydro plants for grid balancing.
- **Energy storage is the most critical enabling technology for the energy transition, because batteries store electrical energy chemically, pumped hydro stores energy as gravitational potential, and the round-trip efficiency determines how much energy is recovered versus stored.** The energy systems is the reason the engineer can size batteries and pumped hydro plants for grid balancing.
:::

## Further reading

- **A. J. Bard and L. R. Faulkner (2001)** — *Electrochemical Methods: Fundamentals and Applications*, 2nd ed. Wiley. The round-trip efficiency, the energy density, and the Peukert effect.
- **M. Winter and R. J. Brodd (2004)** — "What Are Batteries, Fuel Cells, and Supercapacitors?" *Chemical Reviews*, 104(10), 4245-4270. The round-trip efficiency and the Ragone plot.
- **P. Novak (1991)** — *Hydropower Engineering*. Taylor & Francis. The round-trip efficiency and the pumped hydro storage.
- **H. A. Dries (2010)** — *Energy Storage: A Handbook*. Wiley-VCH. The round-trip efficiency and the thermal storage.
- **R. A. Waller and R. E. White (2013)** — *Energy Storage*. Springer. The round-trip efficiency and the hydrogen storage.
- **IEA (2022)** — *Battery Technology and Supply Chains*. International Energy Agency. The round-trip efficiency and the energy transition.
- **IRENA (2022)** — *Electricity Storage and Renewables*. International Renewable Energy Agency. The round-trip efficiency and the LCOE.
- **EPRI (2021)** — *Energy Storage Handbook*. Electric Power Research Institute. The round-trip efficiency and the CAES.
