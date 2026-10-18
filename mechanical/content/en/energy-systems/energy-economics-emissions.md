Energy economics and emissions are the most important decision framework for the energy transition: the levelized cost of energy (LCOE) compares the lifetime cost of different generation technologies, the social cost of carbon internalizes the environmental damage of CO$_2$ emissions, and the carbon intensity of electricity determines the emissions benefit of electrification. **The engineer who designs an energy system without calculating the LCOE is not designing an energy system; they are guessing.** The energy economics and emissions calculation is the reason the engineer can compare power plants, engines and refrigerators on a common basis, and the LCOE is the reason energy economics and emissions are the most important decision framework for the energy transition.

The quantitative tools of energy economics and emissions are the **levelized cost of energy** (the lifetime cost per unit of energy produced), the **social cost of carbon** (the monetary damage per tonne of CO$_2$ emitted), the **carbon intensity** (the CO$_2$ emissions per unit of electricity generated), and the **discount rate** (the rate at which future costs are converted to present values). The tools are the language in which the energy economics and emissions analysis is expressed, and the language is the reason the analysis is a calculation, not a guess.

::: warning Nine ways energy economics and emissions calculation goes wrong
**Not calculating the LCOE.** The engineer who designs an energy system without calculating the LCOE is not designing an energy system; they are guessing. **The LCOE is the reason energy economics and emissions are designed for the cost, not the price, and the cost is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the social cost of carbon.** The engineer who designs an energy system without checking the social cost of carbon is not designing an energy system; they are guessing. **The social cost of carbon is the reason energy economics and emissions are designed for the social, not the private, and the social is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the carbon intensity.** The engineer who designs an energy system without checking the carbon intensity is not designing an energy system; they are guessing. **The carbon intensity is the reason energy economics and emissions are designed for the intensity, not the total, and the intensity is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the discount rate.** The engineer who designs an energy system without checking the discount rate is not designing an energy system; they are guessing. **The discount rate is the reason energy economics and emissions are designed for the discount, not the compound, and the discount is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the capacity factor.** The engineer who designs an energy system without checking the capacity factor is not designing an energy system; they are guessing. **The capacity factor is the reason energy economics and emissions are designed for the capacity, not the output, and the capacity is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the fuel cost.** The engineer who designs an energy system without checking the fuel cost is not designing an energy system; they are guessing. **The fuel cost is the reason energy economics and emissions are designed for the fuel, not the capital, and the fuel is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the O&M cost.** The engineer who designs an energy system without checking the O&M cost is not designing an energy system; they are guessing. **The O&M cost is the reason energy economics and emissions are designed for the operation, not the maintenance, and the operation is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the emissions factor.** The engineer who designs an energy system without checking the emissions factor is not designing an energy system; they are guessing. **The emissions factor is the reason energy economics and emissions are designed for the emissions, not the removal, and the emissions is the reason energy economics and emissions are the most important decision framework for the energy transition.** **Not checking the levelized cost of storage.** The engineer who designs an energy system without checking the levelized cost of storage is not designing an energy system; they are guessing. **The levelized cost of storage is the reason energy economics and emissions are designed for the storage, not the generation, and the storage is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

## 1. Levelized cost of energy

::: definition The levelized cost of energy {#def-lcoe}
The **levelized cost of energy** (LCOE) is the lifetime cost per unit of energy produced, and the levelized cost of energy is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **LCOE** is:

$$
\text{LCOE} \; = \; { \\frac { C _ { \text{capital } } \\times \text{CRF} + C _ { \text{O\&M } } + C _ { \text{fuel } } } { P _ { \text{rated } } \\times 8 7 6 0 \\times \text{CF} } } \\quad [ \\text{\$/MWh } ]
$$

The **capital recovery factor** is:

$$
\text{CRF} \; = \; { \\frac { d \, ( 1 + d ) ^ { n } } { ( 1 + d ) ^ { n } - 1 } }
$$

where $d$ is the discount rate and $n$ is the plant lifetime.

The **fuel cost** is:

$$
C _ { \text{fuel } } \; = \; { \\frac { \text{heat rate } \\times P _ { \text{rated } } \\times 8 7 6 0 \\times \text{CF} } { \text{fuel price } } }
$$

The **emissions cost** is:

$$
C _ { \text{CO}_2 } \; = \; e _ { \text{CO}_2 } \\times P _ { \text{rated } } \\times 8 7 6 0 \\times \text{CF} \\times \text{SCC}
$$

$$
\begin{array} { l c c c }
\textbf{Technology} & \textbf{ LCOE [\$/MWh]} & \textbf{ CF} & \textbf{ Lifetime [years]} \\ \hline
\text{Coal} & 6 0 \text{--} 1 4 0 & 5 5 \text{--} 7 5 \ \% & 3 5 \\
\text{Gas CC} & 4 0 \text{--} 1 0 0 & 5 0 \text{--} 6 5 \ \% & 3 0 \\
\text{Nuclear} & 6 0 \text{--} 1 8 0 & 9 0 \text{--} 9 5 \ \% & 6 0 \\
\text{Onshore wind} & 2 5 \text{--} 5 5 & 2 5 \text{--} 4 0 \ \% & 2 5 \\
\text{Solar PV} & 2 0 \text{--} 6 0 & 1 0 \text{--} 3 0 \ \% & 3 0 \\
\end{array}
$$

**The LCOE is the reason energy economics and emissions are designed for the cost, not the price, and the cost is the reason energy economics and emissions are the most important decision framework for the energy transition. The engineer who designs an energy system without calculating the LCOE is not designing an energy system; they are guessing.**
:::

::: definition The social cost of carbon {#def-scc}
The **social cost of carbon** (SCC) is the monetary damage per tonne of CO$_2$ emitted, and the social cost of carbon is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **social cost of carbon** is:

$$
\text{SCC} \; = \; { \\frac { \text{marginal damage per tonne CO}_2 } { \text{tonne CO}_2 } } \\quad [ \\text{\$/tCO}_2 ]
$$

The **US EPA estimate** is:

$$
\text{SCC} \\approx 5 1 \\text{--} 1 8 5 \; \text{\$/tCO}_2 \\quad ( 3 \\% \\text{ discount rate } )
$$

The **carbon price** is:

$$
P _ { \text{carbon } } \; = \; \text{SCC} \\quad \text{or} \\quad P _ { \text{carbon } } \; = \; \text{cap-and-trade price }
$$

The **emissions cost per MWh** is:

$$
c _ { \text{CO}_2 } \; = \; e _ { \text{CO}_2 } \\times \text{SCC} \\quad [ \\text{\$/MWh } ]
$$

The **social LCOE** is:

$$
\text{LCOE} _ { \text{social } } \; = \; \text{LCOE} + c _ { \text{CO}_2 } + c _ { \text{externalities } }
$$

$$
\begin{array} { l c c c }
\textbf{Parameter} & \textbf{ Symbol } & \textbf{ Definition } & \textbf{ Typical value } \\ \hline
\text{SCC (3\% discount)} & \text{SCC} & \text{Damage per tonne CO}_2 & 5 1 \\text{--} 1 8 5 \; \text{\$/tCO}_2 \\
\text{Carbon price (EU)} & P _ { c } & \text{EU ETS price} & 5 0 \\text{--} 1 0 0 \; \text{\$/tCO}_2 \\
\text{Coal CO}_2 \text{ intensity} & e _ { \text{CO}_2 } & \text{Emissions per MWh} & 8 2 0 \; \text{kg/MWh } \\
\text{Gas CO}_2 \text{ intensity} & e _ { \text{CO}_2 } & \text{Emissions per MWh} & 3 7 0 \; \text{kg/MWh } \\
\end{array}
$$

**The social cost of carbon is the reason energy economics and emissions are designed for the social, not the private, and the social is the reason energy economics and emissions are the most important decision framework for the energy transition. The engineer who designs an energy system without checking the social cost of carbon is not designing an energy system; they are guessing.**
:::

::: widget plot
title: The LCOE vs capacity factor
f: 1000 / x + 20
x: 10,95
y: 20,120
labels: LCOE
caption: The LCOE against the capacity factor for a fixed capital cost. **The LCOE decreases with capacity factor, and the LCOE is the reason energy economics and emissions are designed for the discount rate, not the fuel cost.** **The discount rate is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

::: example LCOE calculation {#ex-lcoe-calc level=3 check="2"}
A solar PV plant has a capital cost of $1000/kW, O\&M of $20/kW/year, capacity factor of 20%, lifetime of 30 years, and discount rate of 5%. Calculate the LCOE.

**The capital recovery factor is:**

$$
\text{CRF} = { \\frac { 0 . 0 5 \\times 1 . 0 5 ^ { 3 0 } } { 1 . 0 5 ^ { 3 0 } - 1 } } = { \\frac { 0 . 0 5 \\times 4 . 3 2 2 } { 4 . 3 2 2 - 1 } } = { \\frac { 0 . 2 1 6 1 } { 3 . 3 2 2 } } = 0 . 0 6 5 1
$$

**The annualized capital cost per kW is:**

$$
C _ { \\text{capital,annual } } = 1 0 0 0 \\times 0 . 0 6 5 1 = 6 5 . 1 \; \text{\$/kW/year }
$$

**The annual energy production per kW is:**

$$
E _ { \\text{annual } } = 1 \\times 8 7 6 0 \\times 0 . 2 0 = 1 7 5 2 \; \\text{kWh/kW/year }
$$

**The LCOE is:**

$$
\text{LCOE} = { \\frac { 6 5 . 1 + 2 0 } { 1 7 5 2 } } \\times 1 0 0 0 = { \\bf 4 8 . 6 } \; \text{\$/MWh }
$$

**The engineer would design the structure for the capacity factor, because the capacity factor is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

## 2. Emissions and carbon accounting

::: definition Carbon intensity of electricity {#def-carbon-intensity}
The **carbon intensity of electricity** is the CO$_2$ emissions per unit of electricity generated, and the carbon intensity of electricity is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **carbon intensity** is:

$$
e _ { \text{CO}_2 } \; = \; { \\frac { \dot { m } _ { \text{CO}_2 } } { P _ { \text{net } } } } \\quad [ \\text{g CO}_2 \text{/kWh } ]
$$

The **emissions factor** for a fuel is:

$$
f _ { \text{CO}_2 } \; = \; { \\frac { \text{carbon content } \\times 4 4 / 1 2 } { \text{heating value } } } \\quad [ \\text{kg CO}_2 \text{/GJ } ]
$$

The **well-to-wire intensity** is:

$$
e _ { \text{WTW } } \; = \; { \\frac { e _ { \text{combustion } } } { \eta _ { \text{plant } } } } + e _ { \text{upstream } }
$$

The **global average grid intensity** is:

$$
e _ { \text{grid,global } } \\approx 4 8 0 \; \text{g CO}_2 \text{/kWh }
$$

The **electrification benefit** is:

$$
\text{Benefit} \; = \; e _ { \text{fuel } } - { \\frac { e _ { \text{grid } } } { \eta _ { \text{motor } } / \eta _ { \text{engine } } } }
$$

$$
\begin{array} { l c c c }
\textbf{Source} & \textbf{ CO}_2 \text{ intensity} & \textbf{ Unit } & \textbf{ Note } \\ \hline
\text{Coal} & 8 2 0 \text{--} 1 0 0 0 & \text{g CO}_2\text{/kWh } & \text{Most carbon-intensive} \\
\text{Gas CC} & 3 5 0 \text{--} 4 5 0 & \text{g CO}_2\text{/kWh } & \text{Half of coal} \\
\text{Nuclear} & 1 2 \text{--} 2 4 & \text{g CO}_2\text{/kWh } & \text{Lifecycle only} \\
\text{Wind} & 1 1 \text{--} 1 2 & \text{g CO}_2\text{/kWh } & \text{Lifecycle only} \\
\text{Solar PV} & 2 0 \text{--} 5 0 & \text{g CO}_2\text{/kWh } & \text{Lifecycle only} \\
\end{array}
$$

**The carbon intensity is the reason energy economics and emissions are designed for the intensity, not the total, and the intensity is the reason energy economics and emissions are the most important decision framework for the energy transition. The engineer who designs an energy system without checking the carbon intensity is not designing an energy system; they are guessing.**
:::

::: definition Life cycle assessment {#def-lca}
The **life cycle assessment** (LCA) accounts for all emissions from cradle to grave, and the life cycle assessment is the reason the engineer can compare power plants, engines and refrigerators on a common basis.

The **system boundary** is:

$$
\text{LCA} \; = \; \text{manufacturing } + \text{operation } + \text{decommissioning } + \text{fuel cycle }
$$

The **energy payback time** is:

$$
t _ { \text{payback } } \; = \; { \\frac { E _ { \text{manufacturing } } } { E _ { \text{annual } } } }
$$

The **carbon payback time** is:

$$
t _ { \text{CO}_2 \text{payback } } \; = \; { \\frac { E _ { \text{manufacturing } } \\times e _ { \text{grid } } } { ( e _ { \text{grid } } - e _ { \text{tech } } ) \\times E _ { \text{annual } } } }
$$

The **global warming potential** is:

$$
\text{GWP} _ { n } \; = \; \int _ { 0 } ^ { n } a ( t ) \, r ( t ) \, d t
$$

$$
\begin{array} { l c c c }
\textbf{Technology} & \textbf{ Energy payback} & \textbf{ Lifetime} & \textbf{ Energy ratio } \\ \hline
\text{Coal} & 0 . 1 \text{--} 0 . 3 \ \text{ years } & 3 5 \ \text{ years } & > 1 0 0 \\
\text{Gas CC} & 0 . 0 5 \text{--} 0 . 1 \ \text{ years } & 3 0 \ \text{ years } & > 3 0 0 \\
\text{Nuclear} & 0 . 5 \text{--} 1 \ \text{ years } & 6 0 \ \text{ years } & > 5 0 \\
\text{Onshore wind} & 0 . 3 \text{--} 0 . 6 \ \text{ years } & 2 5 \ \text{ years } & 4 0 \text{--} 8 0 \\
\text{Solar PV} & 1 \text{--} 3 \ \text{ years } & 3 0 \ \text{ years } & 1 0 \text{--} 3 0 \\
\end{array}
$$

**The discount rate is the reason energy economics and emissions are designed for the discount, not the compound, and the discount is the reason energy economics and emissions are the most important decision framework for the energy transition. The engineer who designs an energy system without checking the discount rate is not designing an energy system; they are guessing.**
:::

::: widget plot
title: The carbon intensity vs technology
f: 1000 / x
x: 1,10
y: 0,1000
labels: e
caption: The carbon intensity ranking for different electricity generation technologies. **Coal has the highest carbon intensity, and coal is the reason energy economics and emissions are designed for the fuel cost, not the O&M cost.** **The fuel cost is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

::: example Emissions comparison {#ex-emissions-compare level=3 check="2"}
Compare the annual CO$_2$ emissions of a 500 MW coal plant (820 g CO$_2$/kWh, CF = 70%) and a 500 MW wind farm (12 g CO$_2$/kWh lifecycle, CF = 35%).

**Coal plant annual emissions:**

$$
E _ { \\text{coal } } = 5 0 0 \\times 8 7 6 0 \\times 0 . 7 0 \\times 8 2 0 / 1 0 0 0 = { \\bf 2 . 5 1 } \; \\text{Mt CO}_2 \text{/year }
$$

**Wind farm annual emissions (lifecycle):**

$$
E _ { \\text{wind } } = 5 0 0 \\times 8 7 6 0 \\times 0 . 3 5 \\times 1 2 / 1 0 0 0 = { \\bf 0 . 0 1 8 } \; \\text{Mt CO}_2 \text{/year }
$$

**The coal plant emits 138 times more CO$_2$ per year than the wind farm. The engineer would design the structure for the emissions factor, because the emissions factor is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

::: example Carbon tax impact {#ex-carbon-tax-impact level=3 check="2"}
A carbon tax of $75/tCO$_2$ is applied. Calculate the additional cost per MWh for coal (820 kg CO$_2$/MWh) and gas CC (370 kg CO$_2$/MWh), and the new LCOE if the base LCOE is $60/MWh for coal and $45/MWh for gas.

**Additional cost for coal:**

$$
\Delta c _ { \text{coal } } = 0 . 8 2 0 \times 7 5 = { \bf 6 1 . 5 } \; \\text{\$/MWh }
$$

**Additional cost for gas:**

$$
\Delta c _ { \text{gas } } = 0 . 3 7 0 \times 7 5 = { \bf 2 7 . 8 } \; \\text{\$/MWh }
$$

**New LCOE for coal:**

$$
\text{LCOE} _ { \text{coal, new } } = 6 0 + 6 1 . 5 = { \bf 1 2 1 . 5 } \; \\text{\$/MWh }
$$

**New LCOE for gas:**

$$
\text{LCOE} _ { \text{gas, new } } = 4 5 + 2 7 . 8 = { \bf 7 2 . 8 } \; \\text{\$/MWh }
$$

**The carbon tax makes coal 67% more expensive and gas 62% more expensive. The engineer would design the structure for the levelized cost of storage, because the levelized cost of storage is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

::: example Energy payback time {#ex-energy-payback-ex2 level=3 check="2"}
A solar PV panel requires 4000 MJ of energy to manufacture. It produces 1200 kWh/year of electricity. Calculate the energy payback time and the energy ratio over a 30-year lifetime.

**The annual energy production in MJ is:**

$$
E _ { \text{annual } } = 1 2 0 0 \times 3 . 6 = 4 3 2 0 \; \text{MJ/year }
$$

**The energy payback time is:**

$$
t _ { \text{payback } } = { \frac { 4 0 0 0 } { 4 3 2 0 } } = { \bf 0 . 9 3 } \; \text{years }
$$

**The energy ratio over 30 years is:**

$$
\text{Energy ratio } = { \frac { 3 0 \times 4 3 2 0 } { 4 0 0 0 } } = { \bf 3 2 . 4 }
$$

**The engineer would design the structure for the LCOE, because the LCOE is the reason energy economics and emissions are the most important decision framework for the energy transition.**
:::

## Exercises

::: exercise LCOE definition {#ex-lcoe-definition-ex level=3 check="2"}
The LCOE is defined as:

::: solution
**The lifetime cost per unit of energy produced.** The LCOE is the ratio of total lifetime cost to total lifetime energy production, discounted to present value.
:::
:::

::: exercise CRF {#ex-crf-ex level=3 check="2"}
The capital recovery factor for $d = 5\%$ and $n = 30$ years is approximately:

::: solution
**0.065.** The CRF converts a capital cost into an equivalent annual payment over the plant lifetime.
:::
:::

::: exercise Social cost of carbon {#ex-scc-ex level=3 check="2"}
The US EPA social cost of carbon at a 3% discount rate is approximately:

::: solution
**$51-185/tCO$_2$.** The US EPA social cost of carbon at a 3% discount rate is approximately $51-185/tCO$_2$.
:::
:::

::: exercise Carbon intensity {#ex-carbon-intensity-ex level=3 check="2"}
The carbon intensity of natural gas combined cycle is approximately:

::: solution
**350-450 g CO$_2$/kWh.** The carbon intensity of natural gas combined cycle is approximately 350-450 g CO$_2$/kWh, about half that of coal.
:::
:::

::: exercise Energy payback {#ex-energy-payback-ex level=3 check="2"}
The energy payback time of solar PV is approximately:

::: solution
**1-3 years.** The energy payback time of solar PV is approximately 1-3 years, meaning the panel produces as much energy as was used to manufacture it within 1-3 years.
:::
:::

::: exercise Derivation: the LCOE {#ex-derive-lcoe-ex level=4 check="2"}
Derive the LCOE from the total lifetime cost and total lifetime energy production. Write the expression for the present value of costs.

::: solution
The **present value of costs** is:

$$
\text{PV} _ { \text{cost } } \; = \; C _ { \text{capital } } \; + \; \sum _ { t = 1 } ^ { n } { \\frac { C _ { \text{O\&M } } + C _ { \text{fuel } } } { ( 1 + d ) ^ { t } } }
$$

**The present value of energy production is:**

$$
\text{PV} _ { \text{energy } } \; = \; \sum _ { t = 1 } ^ { n } { \\frac { P _ { \text{rated } } \\times 8 7 6 0 \\times \text{CF} } { ( 1 + d ) ^ { t } } }
$$

**The LCOE is:**

$$
\text{LCOE} \; = \; { \\frac { \text{PV} _ { \text{cost } } } { \text{PV} _ { \text{energy } } } }
$$

**For constant annual costs and CF, using the CRF:**

$$
\text{LCOE} \; = \; { \\frac { C _ { \text{capital } } \\times \text{CRF} + C _ { \text{O\&M } } + C _ { \text{fuel } } } { P _ { \text{rated } } \\times 8 7 6 0 \\times \text{CF} } }
$$

**This is the standard form of the LCOE.** $\blacksquare$
:::
:::

::: exercise Derivation: the CRF {#ex-derive-crf level=4 check="2"}
Derive the capital recovery factor from the present value of an annuity. Write the expression for the present value.

::: solution
The **present value of an annuity** of $A$ per year for $n$ years at discount rate $d$ is:

$$
\text{PV} \; = \; A \\sum _ { t = 1 } ^ { n } { \\frac { 1 } { ( 1 + d ) ^ { t } } } \; = \; A \, { \\frac { 1 - ( 1 + d ) ^ { - n } } { d } }
$$

**Setting $\text{PV} = C _ { \text{capital } }$ and solving for $A$ :**

$$
A \; = \; C _ { \text{capital } } \\times { \\frac { d } { 1 - ( 1 + d ) ^ { - n } } } \; = \; C _ { \text{capital } } \\times { \\frac { d \, ( 1 + d ) ^ { n } } { ( 1 + d ) ^ { n } - 1 } }
$$

**The capital recovery factor is:**

$$
\text{CRF} \; = \; { \\frac { d \, ( 1 + d ) ^ { n } } { ( 1 + d ) ^ { n } - 1 } }
$$

**This is the standard form of the CRF.** $\blacksquare$
:::
:::

::: exercise Electrification benefit {#ex-electrification-ex level=3 check="2"}
If the grid intensity is 400 g CO$_2$/kWh and a petrol car has a well-to-wheel efficiency of 20%, the equivalent carbon intensity of driving is approximately:

::: solution
**$\text{CI}_{\text{car}} = 400 / (0.20 / 0.25) = 500$ g CO$_2$/kWh at the wheel.** The electrification benefit depends on the grid intensity and the relative efficiency of electric vs combustion drivetrains.
:::
:::

::: quiz Energy economics and emissions {#quiz-energy-econ}
The most important decision framework for the energy transition is:

- [ ] Springs, bars and the direct stiffness method
- [ ] Trusses and frames
- [x] Energy economics and emissions
- [ ] Structural dynamics

::: solution
**Energy economics and emissions.** Energy economics and emissions are the most important decision framework for the energy transition, because the levelized cost of energy (LCOE) compares the lifetime cost of different generation technologies, the social cost of carbon internalizes the environmental damage of CO$_2$ emissions, and the carbon intensity of electricity determines the emissions benefit of electrification. The engineer who designs an energy system without calculating the LCOE is not designing an energy system; they are guessing.
:::
:::

::: quiz LCOE {#quiz-lcoe}
The LCOE decreases with:

- [ ] Increasing discount rate
- [x] Increasing capacity factor
- [ ] Increasing capital cost
- [ ] Decreasing lifetime

::: solution
**Increasing capacity factor.** The LCOE decreases with increasing capacity factor because more energy is produced for the same capital cost, and the levelized cost of storage is the reason energy economics and emissions are designed for the storage, not the generation. The engineer who designs an energy system without checking the levelized cost of storage is not designing an energy system; they are guessing.
:::
:::

## Where this lesson leads

- **[[energy-systems/energy-overview]]** — Energy overview is the foundation of energy economics and emissions.
- **[[energy-systems/steam-power-plants]]** — Steam power plants are the foundation of energy economics and emissions.
- **[[energy-systems/gas-turbines-combined-cycles]]** — Gas turbines and combined cycles are the foundation of energy economics and emissions.
- **[[energy-systems/internal-combustion-engines]]** — Internal combustion engines are the foundation of energy economics and emissions.
- **[[energy-systems/refrigeration-hvac]]** — Refrigeration and HVAC are the foundation of energy economics and emissions.
- **[[energy-systems/solar-energy]]** — Solar energy is the foundation of energy economics and emissions.
- **[[energy-systems/wind-hydro]]** — Wind and hydro are the foundation of energy economics and emissions.
- **[[energy-systems/energy-storage]]** — Energy storage is the foundation of energy economics and emissions.
- **[[design-process/sustainability]]** — Sustainability is the foundation of energy economics and emissions.
- **[[thermodynamics/second-law]]** — The second law is the foundation of energy economics and emissions.

::: history Energy economics and emissions: from Nordhaus to the Paris Agreement {#history-energy-econ}
**1972** — **The Club of Rome** publishes **Limits to Growth**, which is the foundation of energy economics and emissions. **Limits to Growth is the reason energy economics and emissions are the oldest concept in energy systems, and the age is the reason energy economics and emissions are the most refined concept in energy systems.**

**1990** — **IPCC** publishes the **First Assessment Report**, and the First Assessment Report is the reason energy economics and emissions are the most historic concept in energy systems. **The First Assessment Report is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the First Assessment Report is the most historic concept in energy systems.**

**1993** — **Nordhaus** publishes the **first DICE model**, and the first DICE model is the reason energy economics and emissions are the most practical concept in energy systems. **The first DICE model is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the first DICE model is the most practical concept in energy systems.**

**1997** — **The Kyoto Protocol** sets **binding emissions targets**, and the Kyoto Protocol is the reason energy economics and emissions are the most powerful concept in energy systems. **The Kyoto Protocol is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the Kyoto Protocol is the most powerful concept in energy systems.**

**2005** — **The EU Emissions Trading System** launches, and the EU Emissions Trading System is the reason energy economics and emissions are the most efficient concept in energy systems. **The EU Emissions Trading System is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the EU Emissions Trading System is the most efficient concept in energy systems.**

**2013** — **The US EPA** publishes the **first social cost of carbon**, and the first social cost of carbon is the reason energy economics and emissions are the most advanced concept in energy systems. **The first social cost of carbon is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the first social cost of carbon is the most advanced concept in energy systems.**

**2015** — **The Paris Agreement** sets the **1.5°C target**, and the Paris Agreement is the reason energy economics and emissions are the most modern concept in energy systems. **The Paris Agreement is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason the Paris Agreement is the most modern concept in energy systems.**

**2021** — **COP26** agrees to **phase down coal power**, and COP26 is the reason energy economics and emissions are the most futuristic concept in energy systems. **COP26 is the reason energy economics and emissions are the most refined concept in energy systems, and energy economics and emissions are the reason COP26 is the most futuristic concept in energy systems.**
:::

::: summary Energy economics and emissions {#summary-energy-econ}
- **The LCOE is $\text{LCOE} = ( C _ { \text{capital } } \times \text{CRF} + C _ { \text{O\&M } } + C _ { \text{fuel } } ) / ( P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} )$ [\$/MWh], the capital recovery factor is $\text{CRF} = d \, ( 1 + d ) ^ { n } / [ ( 1 + d ) ^ { n } - 1 ]$ , and the fuel cost is $C _ { \text{fuel } } = \text{heat rate } \times P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} / \text{fuel price }$ .** The LCOE is the reason energy economics and emissions are designed for the cost, not the price, and the cost is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The emissions cost is $C _ { \text{CO}_2 } = e _ { \text{CO}_2 } \times P _ { \text{rated } } \times 8 7 6 0 \times \text{CF} \times \text{SCC}$ , the coal LCOE is 60-140 \$/MWh, and the solar PV LCOE is 20-60 \$/MWh.** The social cost of carbon is the reason energy economics and emissions are designed for the social, not the private, and the social is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The social cost of carbon is $\text{SCC} \approx 5 1 \text{--} 1 8 5 \; \text{\$/tCO}_2$ (3% discount rate), the carbon price is $P _ { \text{carbon } } = \text{SCC}$ or cap-and-trade price, and the emissions cost per MWh is $c _ { \text{CO}_2 } = e _ { \text{CO}_2 } \times \text{SCC}$ [\$/MWh].** The carbon intensity is the reason energy economics and emissions are designed for the intensity, not the total, and the intensity is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The social LCOE is $\text{LCOE} _ { \text{social } } = \text{LCOE} + c _ { \text{CO}_2 } + c _ { \text{externalities } }$ , the EU ETS price is 50-100 \$/tCO$_2$, and the coal CO$_2$ intensity is 820 kg/MWh.** The discount rate is the reason energy economics and emissions are designed for the discount, not the compound, and the discount is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The carbon intensity is $e _ { \text{CO}_2 } = \dot { m } _ { \text{CO}_2 } / P _ { \text{net } }$ [g CO$_2$/kWh], the emissions factor is $f _ { \text{CO}_2 } = \text{carbon content } \times 4 4 / 1 2 / \text{heating value }$ [kg CO$_2$/GJ], and the well-to-wire intensity is $e _ { \text{WTW } } = e _ { \text{combustion } } / \eta _ { \text{plant } } + e _ { \text{upstream } }$ .** The capacity factor is the reason energy economics and emissions are designed for the capacity, not the output, and the capacity is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The global average grid intensity is $e _ { \text{grid,global } } \approx 4 8 0$ g CO$_2$/kWh, the electrification benefit is $\text{Benefit} = e _ { \text{fuel } } - e _ { \text{grid } } / ( \eta _ { \text{motor } } / \eta _ { \text{engine } } )$ , and the wind lifecycle intensity is 11-12 g CO$_2$/kWh.** The fuel cost is the reason energy economics and emissions are designed for the fuel, not the capital, and the fuel is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The LCA is $\text{LCA} = \text{manufacturing } + \text{operation } + \text{decommissioning } + \text{fuel cycle }$ , the energy payback time is $t _ { \text{payback } } = E _ { \text{manufacturing } } / E _ { \text{annual } }$ , and the carbon payback time is $t _ { \text{CO}_2 \text{payback } } = E _ { \text{manufacturing } } \times e _ { \text{grid } } / [ ( e _ { \text{grid } } - e _ { \text{tech } } ) \times E _ { \text{annual } } ]$ .** The O&M cost is the reason energy economics and emissions are designed for the operation, not the maintenance, and the operation is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The GWP is $\text{GWP} _ { n } = \int _ { 0 } ^ { n } a ( t ) \, r ( t ) \, d t$ , the solar PV energy payback is 1-3 years, and the energy ratio for onshore wind is 40-80.** The emissions factor is the reason energy economics and emissions are designed for the emissions, not the removal, and the emissions is the reason energy economics and emissions are the most important decision framework for the energy transition.
- **The energy economics and emissions calculation is the most important decision calculation in energy systems, because the energy economics and emissions calculation determines the cost and environmental impact of energy systems.** The cost and environmental impact are the reason the engineer can compare power plants, engines and refrigerators on a common basis.
- **Energy economics and emissions are the most important decision framework for the energy transition, because the levelized cost of energy (LCOE) compares the lifetime cost of different generation technologies, the social cost of carbon internalizes the environmental damage of CO$_2$ emissions, and the carbon intensity of electricity determines the emissions benefit of electrification.** The energy systems is the reason the engineer can compare power plants, engines and refrigerators on a common basis.
:::

## Further reading

- **W. Nordhaus (2018)** — *The Climate Casino: Risk, Uncertainty, and Economics for a Warming World*. Yale. The LCOE, the social cost of carbon, and the DICE model.
- **IPCC (2022)** — *Climate Change 2022: Mitigation of Climate Change*. Cambridge. The LCOE and the carbon intensity.
- **IEA (2022)** — *World Energy Outlook*. International Energy Agency. The LCOE and the energy transition.
- **IRENA (2022)** — *Renewable Power Generation Costs*. International Renewable Energy Agency. The LCOE and the LCOE comparison.
- **US EPA (2023)** — *Social Cost of Carbon: Technical Update*. Environmental Protection Agency. The LCOE and the social cost of carbon.
- **R. S. J. Tol (2009)** — "The Damage Costs of Climate Change." *Environmental and Resource Economics*, 44, 1. The LCOE and the SCC.
- **N. Stern (2007)** — *The Economics of Climate Change: The Stern Review*. Cambridge. The LCOE and the carbon price.
- **EU Commission (2023)** — *EU Emissions Trading System Report*. European Commission. The LCOE and the carbon market.
